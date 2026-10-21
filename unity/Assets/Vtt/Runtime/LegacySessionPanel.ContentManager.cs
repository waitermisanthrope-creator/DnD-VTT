using System;
using System.Collections;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private const string CatalogUrl = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Content/main/catalog/v2/index.json";
        private const string AssetsCatalogUrl = "https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/catalog/v2/index.json";
        private WorkshopStore workshopStore;
        private WorkshopRuntime workshop;
        private bool contentBusy, installedOnly;
        private float contentProgress;
        private int contentCategory;
        private string contentSearch = "", contentNotice = "Каталоги доступны через интернет; установленные пакеты работают офлайн.";
        private JArray contentPackages = new JArray(), assetPacks = new JArray();
        private JObject contentDetails;
        private static readonly string[] ContentCategories = { "Все", "Игровые системы", "Расы", "Классы", "Черты", "Подклассы", "Заклинания", "Предметы", "Монстры", "3D-модели", "Окружение", "Текстуры", "Анимации", "Карты", "Оформление", "Коллекции" };
        private static readonly string[] ContentTypes = { "", "game-system", "race", "class", "feat", "subclass", "spell", "item", "monster", "model", "environment", "texture", "animation", "map", "appearance", "collection" };
        private string ContentDirectory => Path.Combine(Application.persistentDataPath, "workshop-v1");
        private void InitializeWorkshop()
        {
            if (workshopStore != null) return;
            Application.lowMemory += OnWorkshopLowMemory;
            workshopStore = new WorkshopStore(ContentDirectory); workshop = new WorkshopRuntime(workshopStore); workshop.ActivateData();
            foreach (string pair in new[] { "content", "assets" })
            {
                string path = Path.Combine(ContentDirectory, pair + ".catalog");
                if (!File.Exists(path)) continue;
                try { var entries = WorkshopStore.Catalog(File.ReadAllText(path), pair == "content" ? "packages" : "packs"); if (pair == "content") contentPackages = entries; else assetPacks = entries; }
                catch (Exception e) { contentNotice = "Кеш каталога отклонён: " + e.Message; }
            }
            creationCatalog = null;
        }
        private void OnWorkshopLowMemory() { workshop?.ReleaseBundleCache(); }
        private void OnDestroy() { Application.lowMemory -= OnWorkshopLowMemory; workshop?.Dispose(); }
        private void RefreshWorkshop()
        {
            // Destroy geometry before unloading owned resources, then reconstruct
            // from preserved JSON. Missing resources become visible placeholders.
            world.ClearWorkshopGeometry(); workshop.Dispose(); workshop = new WorkshopRuntime(workshopStore); workshop.ActivateData(); creationCatalog = null;
            world.Workshop = workshop; world.ReloadCurrent();
        }
        private void OpenContentManager() { InitializeWorkshop(); contentCategory = 0; contentDetails = null; Navigate(FrontScreen.ContentManager); }
        private IEnumerator FetchContentCatalog()
        {
            contentBusy = true;
            foreach (string kind in new[] { "content", "assets" })
            {
                string path = Path.Combine(ContentDirectory, kind + ".catalog.part-download");
                WorkshopDownload handler = null; UnityWebRequest request = null;
                try { handler = new WorkshopDownload(path, WorkshopStore.MaxCatalogBytes); request = new UnityWebRequest(kind == "content" ? CatalogUrl : AssetsCatalogUrl, "GET", handler, null); request.timeout = 25; request.redirectLimit = 0; }
                catch (Exception e) { contentNotice = e.Message; }
                if (request == null) { handler?.Close(); continue; }
                using (request)
                {
                    yield return request.SendWebRequest(); handler.Close();
                    try
                    {
                        if (request.result != UnityWebRequest.Result.Success) throw new IOException(handler.Failure ?? request.error);
                        string text = File.ReadAllText(path); var list = WorkshopStore.Catalog(text, kind == "content" ? "packages" : "packs");
                        WorkshopStore.AtomicText(Path.Combine(ContentDirectory, kind + ".catalog"), text);
                        if (kind == "content") contentPackages = list; else assetPacks = list;
                        contentNotice = "Каталог обновлён. Доступно: " + (contentPackages.Count + assetPacks.Count);
                    }
                    catch (Exception e) { contentNotice = "Каталог недоступен; сохранён офлайн-кеш: " + e.Message; }
                    finally { if (File.Exists(path)) File.Delete(path); }
                }
            }
            contentBusy = false;
        }
        private long ReadWorkshopFreeBytes()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            // DriveInfo invokes unsupported IL2CPP icalls on Android. Query the
            // actual app-data filesystem, not the root filesystem or shared storage.
            using (var stat = new AndroidJavaObject("android.os.StatFs", ContentDirectory))
                return stat.Call<long>("getAvailableBytes");
#else
            return new DriveInfo(Path.GetPathRoot(ContentDirectory)).AvailableFreeSpace;
#endif
        }
        private IEnumerator DownloadContentPackage(JObject item)
        {
            contentBusy = true; contentProgress = 0; contentNotice = "Загрузка " + item["name"];
            string path = Path.Combine(ContentDirectory, "download.part"); WorkshopDownload handler = null; UnityWebRequest request = null;
            try
            {
                WorkshopStore.ValidateManifest(item); WorkshopStore.Compatible(item, WorkshopRuntime.Platform, Application.unityVersion);
                WorkshopStore.CheckDownloadSpace((long)item["bytes"], ReadWorkshopFreeBytes);
                handler = new WorkshopDownload(path, (long)item["bytes"]);
                request = new UnityWebRequest((string)item["url"], "GET", handler, null) { timeout = 120, redirectLimit = (string)item["format"] == "assetbundle" ? 3 : 0 };
            }
            catch (Exception e) { contentNotice = e.Message; }
            if (request != null)
            {
                using (request)
                {
                    var operation = request.SendWebRequest();
                    while (!operation.isDone) { contentProgress = (float)handler.Received / (long)item["bytes"]; yield return null; }
                    handler.Close();
                    try
                    {
                        if (request.result != UnityWebRequest.Result.Success) throw new IOException(handler.Failure ?? request.error);
                        workshopStore.Install(item, path, WorkshopRuntime.Platform, Application.unityVersion); RefreshWorkshop();
                        contentProgress = 1; contentNotice = "Установлено и подключено: " + item["name"];
                    }
                    catch (Exception e) { contentNotice = "Установка отклонена; можно повторить: " + e.Message; }
                }
            }
            else handler?.Close();
            try { if (File.Exists(path)) File.Delete(path); } catch (Exception e) { contentNotice += " · " + e.Message; }
            contentBusy = false;
        }
        private string InstallAvailability(JObject item)
        {
            try
            {
                WorkshopStore.Compatible(item, WorkshopRuntime.Platform, Application.unityVersion);
                if ((int?)item["minClientVersionCode"] > UnityRelease.Code) return "Обновите приложение для этого пакета";
                if ((string)item["format"] == "json" && !new[] { "race", "class", "feat", "map", "model", "environment", "appearance" }.Contains((string)item["type"])) return "Активация этой категории пока недоступна";
                foreach (string dep in ((JArray)item["dependencies"]).Values<string>()) if (workshopStore.Find(dep) == null) return "Сначала установите: " + dep;
                return null;
            }
            catch (Exception e) { return e.Message; }
        }
        private void DrawContentManager()
        {
            InitializeWorkshop(); GUILayout.Label("Мастерская дополнений", heading);
            if (!contentBusy && GUILayout.Button("↻ Обновить каталоги и проверить обновления", GUILayout.Height(45))) StartCoroutine(FetchContentCatalog());
            GUILayout.Label(contentNotice, muted);
            if (contentBusy) GUILayout.HorizontalSlider(contentProgress, 0, 1);
            installedOnly = GUILayout.Toggle(installedOnly, "Только установленные (доступно без интернета)");
            contentSearch = GUILayout.TextField(contentSearch, GUILayout.MinHeight(40));
            contentCategory = GUILayout.SelectionGrid(contentCategory, ContentCategories, 2, GUILayout.MinHeight(300));
            var installed = workshopStore.Installed();
            var all = contentPackages.Concat(assetPacks).OfType<JObject>().ToList();
            foreach (JObject local in installed) if (!all.Any(p => (string)p["id"] == (string)local["id"])) all.Add(local);
            int shown = 0;
            foreach (JObject item in all)
            {
                string id = (string)item["id"]; var local = installed.OfType<JObject>().FirstOrDefault(p => (string)p["id"] == id);
                if (installedOnly && local == null || contentCategory > 0 && (string)item["type"] != ContentTypes[contentCategory]) continue;
                if ((item["name"] + " " + id + " " + item["author"]).IndexOf(contentSearch, StringComparison.OrdinalIgnoreCase) < 0) continue;
                shown++; GUILayout.BeginVertical(GUI.skin.box); GUILayout.Label(item["name"] + " · " + item["version"], heading);
                GUILayout.Label(local == null ? "Не установлено" : (string)local["sha256"] == (string)item["sha256"] ? "✓ Установлено" : "Доступна другая версия · установлена " + local["version"], muted);
                if (GUILayout.Button("Подробнее", GUILayout.Height(36))) contentDetails = contentDetails == item ? null : item;
                if (contentDetails == item)
                {
                    GUILayout.Label((string)item["description"], muted);
                    GUILayout.Label("Автор: " + item["author"] + " · Лицензия: " + item["license"] + " · " + item["bytes"] + " байт", muted);
                    GUILayout.Label("Зависимости: " + string.Join(", ", ((JArray)item["dependencies"]).Values<string>()) + " · Платформа: " + item["platform"] + " · Unity: " + item["unityVersion"], muted);
                    GUILayout.Label("SHA-256: " + item["sha256"], muted);
                }
                string unavailable = InstallAvailability(item); if (unavailable != null) GUILayout.Label(unavailable, muted);
                bool enabled = GUI.enabled; GUI.enabled = enabled && !contentBusy && unavailable == null;
                if (GUILayout.Button(local == null ? "Скачать и установить" : (string)local["sha256"] == (string)item["sha256"] ? "Скачать повторно" : "Установить версию " + item["version"], GUILayout.Height(42))) StartCoroutine(DownloadContentPackage((JObject)item.DeepClone()));
                GUI.enabled = enabled && !contentBusy && local != null;
                if (GUILayout.Button("Удалить пакет (персонажи и карты сохранятся)", GUILayout.Height(38)))
                {
                    try { workshopStore.Remove(id); RefreshWorkshop(); contentNotice = "Пакет удалён. Ссылки сохранений сохранены; ресурсы можно установить повторно."; }
                    catch (Exception e) { contentNotice = e.Message; }
                }
                GUI.enabled = enabled; GUILayout.EndVertical();
            }
            if (shown == 0) GUILayout.Label("Материалы не найдены. Обновите каталог или измените фильтр.", muted);
            if (GUILayout.Button("← Настройки", GUILayout.Height(45))) OpenSettings();
        }
    }
}
