using System;
using System.Collections;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace DndVtt.UnityPrototype
{
    // Prototype: trusted, pinned catalog location; data-only JSON packages.
    // Installing a package does NOT activate gameplay content.
    public sealed partial class LegacySessionPanel
    {
        private const string CatalogUrl = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/experiment/unity-vtt/docs/content-catalog-v1.json";
        private const string PackageUrlPrefix = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/experiment/unity-vtt/docs/content-packages/";
        private const int MaxCatalogBytes = 1024 * 1024;
        private const int MaxPackageBytes = 5 * 1024 * 1024;
        private int contentCategory;
        private string contentSearch = "";
        private string contentNotice = "Нажмите «Обновить каталог», чтобы получить список.";
        private bool contentBusy;
        private JArray contentPackages = new JArray();
        private static readonly string[] ContentCategories =
        {
            "Все", "Игровые системы", "Расы", "Классы", "Заклинания",
            "Ремёсла", "Карты", "3D-ресурсы", "Оформление", "Коллекции"
        };
        private static readonly string[] ContentTypes =
        {
            "", "game-system", "race", "class", "spell", "craft",
            "map", "model", "appearance", "collection"
        };
        private string ContentDirectory => Path.Combine(Application.persistentDataPath, "content_packages");

        private void OpenContentManager()
        {
            contentCategory = 0;
            contentSearch = "";
            Navigate(FrontScreen.ContentManager);
        }

        private static string PackageId(JObject package) => (string)package["id"] ?? "";
        private static bool ValidId(string id) => !string.IsNullOrEmpty(id)
            && id.Length <= 120 && Regex.IsMatch(id, @"^[a-z0-9][a-z0-9._-]*$");
        private string PackagePath(string id) => Path.Combine(ContentDirectory, id + ".json");
        private bool IsInstalled(JObject package)
        {
            string id = PackageId(package);
            if (!ValidId(id)) return false;
            string path = PackagePath(id);
            if (!File.Exists(path)) return false;
            try
            {
                var file = new FileInfo(path);
                if (file.Length != (long)package["bytes"]) return false;
                return string.Equals(Sha256(File.ReadAllBytes(path)), (string)package["sha256"], StringComparison.OrdinalIgnoreCase);
            }
            catch { return false; }
        }

        private static string Sha256(byte[] data)
        {
            using (var hash = SHA256.Create())
                return BitConverter.ToString(hash.ComputeHash(data)).Replace("-", "").ToLowerInvariant();
        }

        private static void ValidatePackage(JObject item)
        {
            string id = PackageId(item);
            string url = (string)item["url"];
            string hash = (string)item["sha256"];
            long bytes = (long?)item["bytes"] ?? -1;
            if (!ValidId(id) || string.IsNullOrWhiteSpace((string)item["name"])
                || string.IsNullOrWhiteSpace((string)item["version"])
                || !ContentTypes.Skip(1).Contains((string)item["type"])
                || bytes <= 0 || bytes > MaxPackageBytes
                || string.IsNullOrEmpty(hash) || !Regex.IsMatch(hash, @"^[a-fA-F0-9]{64}$")
                || string.IsNullOrEmpty(url) || !url.StartsWith(PackageUrlPrefix, StringComparison.Ordinal)
                || !url.EndsWith(".json", StringComparison.Ordinal))
                throw new FormatException("Неверное описание пакета: " + id);
        }

        private IEnumerator FetchContentCatalog()
        {
            contentBusy = true;
            contentNotice = "Загружаем каталог…";
            using (var request = UnityWebRequest.Get(CatalogUrl))
            {
                request.timeout = 20;
                request.redirectLimit = 0;
                yield return request.SendWebRequest();
                if (request.result != UnityWebRequest.Result.Success)
                    contentNotice = "Ошибка каталога: " + request.error;
                else
                {
                    try
                    {
                        byte[] bytes = request.downloadHandler.data;
                        if (bytes.Length > MaxCatalogBytes) throw new FormatException("Каталог слишком большой");
                        var doc = JObject.Parse(request.downloadHandler.text);
                        if ((int?)doc["schemaVersion"] != 1 || !(doc["packages"] is JArray packages))
                            throw new FormatException("Неизвестный формат каталога");
                        foreach (JToken token in packages)
                        {
                            if (!(token is JObject item)) throw new FormatException("Неверная запись каталога");
                            ValidatePackage(item);
                        }
                        if (packages.OfType<JObject>().Select(PackageId).Distinct().Count() != packages.Count)
                            throw new FormatException("Повторяющиеся ID");
                        contentPackages = (JArray)packages.DeepClone();
                        contentNotice = "Каталог обновлён. Пакетов: " + contentPackages.Count;
                    }
                    catch (Exception e) { contentNotice = "Каталог отклонён: " + e.Message; }
                }
            }
            contentBusy = false;
        }

        private IEnumerator DownloadContentPackage(JObject item)
        {
            contentBusy = true;
            string id = PackageId(item);
            contentNotice = "Скачивание: " + id;
            using (var request = UnityWebRequest.Get((string)item["url"]))
            {
                request.timeout = 40;
                request.redirectLimit = 0;
                yield return request.SendWebRequest();
                if (request.result != UnityWebRequest.Result.Success)
                    contentNotice = "Ошибка загрузки: " + request.error;
                else
                {
                    string temp = null;
                    try
                    {
                        byte[] bytes = request.downloadHandler.data;
                        if (bytes.Length != (long)item["bytes"] || bytes.Length > MaxPackageBytes)
                            throw new FormatException("Неверный размер файла");
                        if (!string.Equals(Sha256(bytes), (string)item["sha256"], StringComparison.OrdinalIgnoreCase))
                            throw new FormatException("Контрольная сумма SHA-256 не совпадает");
                        var json = JObject.Parse(System.Text.Encoding.UTF8.GetString(bytes));
                        if ((string)json["id"] != id || (int?)json["schemaVersion"] != 1)
                            throw new FormatException("ID или схема пакета не совпадает");
                        Directory.CreateDirectory(ContentDirectory);
                        temp = PackagePath(id) + ".part";
                        File.WriteAllBytes(temp, bytes);
                        string target = PackagePath(id);
                        if (File.Exists(target)) File.Delete(target);
                        File.Move(temp, target);
                        contentNotice = "Пакет установлен: " + id + ". Подключение к игре будет добавлено позднее.";
                    }
                    catch (Exception e) { contentNotice = "Установка отклонена: " + e.Message; }
                    finally { if (temp != null && File.Exists(temp)) File.Delete(temp); }
                }
            }
            contentBusy = false;
        }

        private void DrawContentManager()
        {
            GUILayout.Label("Менеджер контента", heading);
            GUILayout.Label("Первый рабочий этап: проверенный каталог и установка JSON-пакетов. Подключение к созданию персонажей — следующий этап.", muted);
            GUILayout.Space(8);
            if (GUILayout.Button(contentBusy ? "Операция выполняется…" : "↻ Обновить каталог", GUILayout.Height(45)) && !contentBusy)
                StartCoroutine(FetchContentCatalog());
            GUILayout.Label(contentNotice, muted);
            GUILayout.Space(8);
            contentSearch = GUILayout.TextField(contentSearch, GUILayout.MinHeight(40));
            contentCategory = GUILayout.SelectionGrid(contentCategory, ContentCategories, 2, GUILayout.MinHeight(225));
            GUILayout.Space(12);
            int shown = 0;
            foreach (JObject item in contentPackages.OfType<JObject>())
            {
                if (contentCategory > 0 && (string)item["type"] != ContentTypes[contentCategory]) continue;
                string title = (string)item["name"] ?? "";
                if ((title + " " + PackageId(item) + " " + (string)item["author"]).IndexOf(contentSearch, StringComparison.OrdinalIgnoreCase) < 0) continue;
                shown++;
                GUILayout.BeginVertical(GUI.skin.box);
                GUILayout.Label(title + " · " + (string)item["version"], heading);
                GUILayout.Label((string)item["description"] ?? "", muted);
                GUILayout.Label("Автор: " + (string)item["author"] + " · " + (long)item["bytes"] + " байт", muted);
                bool installed = IsInstalled(item);
                GUILayout.Label(installed ? "✓ Установлено и проверено" : "Не установлено", muted);
                if (!contentBusy)
                {
                    if (!installed && GUILayout.Button("Скачать и проверить", GUILayout.Height(42)))
                        StartCoroutine(DownloadContentPackage((JObject)item.DeepClone()));
                    if (installed && GUILayout.Button("Удалить пакет", GUILayout.Height(38)))
                    {
                        try { File.Delete(PackagePath(PackageId(item))); contentNotice = "Пакет удалён"; }
                        catch (Exception e) { contentNotice = "Ошибка удаления: " + e.Message; }
                    }
                }
                GUILayout.EndVertical();
            }
            if (shown == 0) GUILayout.Label("В выбранной категории материалов пока нет.", muted);
            GUILayout.Space(16);
            if (GUILayout.Button("← Вернуться в настройки", GUILayout.Height(50))) OpenSettings();
        }
    }
