using System;
using System.Collections;
using System.IO;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private bool updateBusy, updateDownloading, showChangelog, changelogBusy;
        private string updateMessage = "Нажмите «Проверить обновление», чтобы узнать, доступна ли новая версия.";
        private string changelogMessage = "";
        private float updateProgress;
        private JObject updateFeed;
        private JObject changelog;
        private string downloadedUpdate;
        private UnityWebRequest activeDownload;
        private string UpdatePlatform => Application.platform == RuntimePlatform.Android ? "android" : "windows";

        private void DrawUpdates()
        {
            GUILayout.Label("Обновление приложения", heading);
            GUILayout.Label("Установлено: Unity " + UnityRelease.Version + "  ·  Канал: Unity Android", muted);
            GUILayout.Label("При обновлении файлы персонажей и настройки остаются на устройстве. Для установки Android попросит подтверждение.", muted);
            GUILayout.Space(12);
            GUILayout.BeginVertical(GUI.skin.box);
            GUILayout.Label(updateMessage, muted);
            if (updateDownloading)
            {
                GUILayout.Label("Скачано: " + Mathf.RoundToInt(updateProgress * 100) + "%", muted);
                if (GUILayout.Button("Отменить загрузку", GUILayout.Height(42))) activeDownload?.Abort();
            }
            bool before = GUI.enabled;
            GUI.enabled = !updateBusy;
            if (GUILayout.Button("Проверить обновление", GUILayout.Height(52))) StartCoroutine(CheckForUpdates());
            if (updateFeed != null && (int)updateFeed["versionCode"] > UnityRelease.Code)
            {
                GUILayout.Space(10);
                GUILayout.Label("Доступно: Unity " + (string)updateFeed["version"], heading);
                GUILayout.Label((string)updateFeed["notes"] ?? "", muted);
                string label = downloadedUpdate == null ? "Скачать обновление" : "Обновить — открыть установку Android";
                if (GUILayout.Button(label, GUILayout.Height(54)))
                {
                    if (downloadedUpdate == null) StartCoroutine(DownloadUpdate());
                    else AttemptInstallUpdate();
                }
            }
            GUI.enabled = before;
            GUILayout.EndVertical();
            GUILayout.Space(12);
            if (GUILayout.Button(showChangelog ? "Скрыть список изменений" : "История изменений (чейнджлог)", GUILayout.Height(48)))
            {
                showChangelog = !showChangelog;
                if (showChangelog && !changelogBusy) StartCoroutine(FetchChangelog());
            }
            if (showChangelog) DrawChangelog();
            GUILayout.Space(12);
            GUILayout.Label("Обновления загружаются только из проверенного GitHub-релиза нашего приложения. Сборки из Actions не устанавливаются автоматически.", muted);
        }

        private void DrawChangelog()
        {
            if (changelog == null)
            {
                try
                {
                    TextAsset bundled = Resources.Load<TextAsset>("Changelog");
                    if (bundled != null) changelog = UnityRelease.ParseHistory(bundled.text);
                }
                catch (Exception error) { changelogMessage = "Не удалось открыть встроенную историю: " + error.Message; }
            }
            if (changelogBusy) GUILayout.Label("Проверяю историю изменений…", muted);
            if (!string.IsNullOrEmpty(changelogMessage)) GUILayout.Label(changelogMessage, muted);
            if (changelog?["releases"] is not JArray entries) return;
            foreach (JObject entry in entries)
            {
                string version = (string)entry["version"];
                GUILayout.BeginVertical(GUI.skin.box);
                string date = (string)entry["date"] ?? "";
                string state = (string)entry["status"] == "testing" ? " · тестовая сборка" : "";
                GUILayout.Label("Unity " + version + state, heading);
                GUILayout.Label(date + " · " + ((string)entry["title"] ?? ""), muted);
                foreach (JToken change in (JArray)entry["changes"]) GUILayout.Label("• " + (string)change);
                GUILayout.EndVertical();
                GUILayout.Space(8);
            }
        }

        private IEnumerator FetchChangelog()
        {
            changelogBusy = true;
            changelogMessage = "";
            using var request = UnityWebRequest.Get(UnityRelease.ChangelogFeed + "?check=" + DateTimeOffset.UtcNow.ToUnixTimeSeconds());
            request.timeout = 20;
            yield return request.SendWebRequest();
            try
            {
                if (request.result != UnityWebRequest.Result.Success) throw new IOException(request.error);
                changelog = UnityRelease.ParseHistory(request.downloadHandler.text);
            }
            catch (Exception error)
            {
                changelogMessage = "Свежая история недоступна: " + error.Message + ". Показана встроенная версия, если она есть.";
            }
            finally { changelogBusy = false; }
        }

        private IEnumerator CheckForUpdates()
        {
            if (updateBusy) yield break;
            updateBusy = true;
            updateProgress = 0;
            updateFeed = null;
            downloadedUpdate = null;
            updateMessage = "Проверяю доступную версию…";
            using var request = UnityWebRequest.Get(UnityRelease.Feed + "?check=" + DateTimeOffset.UtcNow.ToUnixTimeSeconds());
            request.timeout = 30;
            yield return request.SendWebRequest();
            try
            {
                if (request.result != UnityWebRequest.Result.Success) throw new IOException("Сервер обновлений недоступен: " + request.error);
                updateFeed = UnityRelease.ParseFeed(request.downloadHandler.text, UpdatePlatform);
                int serverVersion = (int)updateFeed["versionCode"];
                if (serverVersion > UnityRelease.Code)
                {
                    updateMessage = "Доступно новое обновление. Сначала сохраните изменения листа персонажа.";
                    string cached = UpdateFilePath(serverVersion);
                    if (File.Exists(cached))
                    {
                        try
                        {
                            UnityRelease.VerifyFile(cached, (JObject)updateFeed["artifacts"][UpdatePlatform]);
                            downloadedUpdate = cached;
                        }
                        catch (Exception) { File.Delete(cached); }
                    }
                }
                else updateMessage = "Установлена актуальная версия Unity " + UnityRelease.Version + ".";
            }
            catch (Exception error) { updateMessage = error.Message + "\nПопробуйте позже. Персонажи и настройки не изменены."; }
            finally { updateBusy = false; }
        }

        // Android's content provider exposes Context.getCacheDir(), not Unity's
        // (possibly external) temporaryCachePath. Both sides MUST use one path.
        private string UpdateCacheDirectory
        {
            get
            {
#if UNITY_ANDROID && !UNITY_EDITOR
                using var player = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
                using var activity = player.GetStatic<AndroidJavaObject>("currentActivity");
                using var cache = activity.Call<AndroidJavaObject>("getCacheDir");
                return cache.Call<string>("getAbsolutePath");
#else
                return Application.temporaryCachePath;
#endif
            }
        }
        private string UpdateFilePath(int code) =>
            Path.Combine(UpdateCacheDirectory, "updates", "UnityUpdate-" + code +
                (UpdatePlatform == "android" ? ".apk" : ".exe"));

        private IEnumerator DownloadUpdate()
        {
            if (updateBusy || updateFeed == null) yield break;
            updateBusy = true;
            updateDownloading = true;
            updateProgress = 0;
            updateMessage = "Скачиваю пакет обновления…";
            var artifact = (JObject)updateFeed["artifacts"][UpdatePlatform];
            string file = UpdateFilePath((int)updateFeed["versionCode"]);
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(file));
                activeDownload = UnityWebRequest.Get((string)artifact["url"]);
                activeDownload.downloadHandler = new DownloadHandlerFile(file) { removeFileOnAbort = true };
            }
            catch (Exception error)
            {
                activeDownload?.Dispose();
                activeDownload = null;
                updateMessage = "Не удалось начать загрузку: " + error.Message;
                updateBusy = false;
                updateDownloading = false;
                yield break;
            }

            var request = activeDownload;
            request.timeout = 600;
            request.redirectLimit = 5;
            var operation = request.SendWebRequest();
            while (!operation.isDone)
            {
                updateProgress = Mathf.Clamp01(request.downloadProgress);
                if (request.downloadedBytes > (ulong)(long)artifact["bytes"]) request.Abort();
                yield return null;
            }
            try
            {
                if (request.result != UnityWebRequest.Result.Success)
                    throw new IOException("Загрузка прервана: " + request.error);
                UnityRelease.VerifyFile(file, artifact);
                downloadedUpdate = file;
                updateProgress = 1;
                updateMessage = "APK скачан и проверен по SHA-256. Нажмите «Обновить» и подтвердите установку в Android.";
            }
            catch (Exception error)
            {
                downloadedUpdate = null;
                updateMessage = error.Message + "\nНичего не установлено, попробуйте скачать снова.";
                if (File.Exists(file)) { try { File.Delete(file); } catch (IOException) { } }
            }
            finally
            {
                request.Dispose();
                activeDownload = null;
                updateBusy = false;
                updateDownloading = false;
            }
        }

        private void AttemptInstallUpdate()
        {
            if (updateFeed == null || string.IsNullOrEmpty(downloadedUpdate)) return;
            try
            {
                UnityRelease.VerifyFile(downloadedUpdate, (JObject)updateFeed["artifacts"][UpdatePlatform]);
                if (archive != null) SaveSheet();
#if UNITY_ANDROID && !UNITY_EDITOR
                using var player = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
                using var activity = player.GetStatic<AndroidJavaObject>("currentActivity");
                using var bridge = new AndroidJavaClass("com.dndvtt.unityupdater.UpdateProvider");
                string result = bridge.CallStatic<string>("install", activity, downloadedUpdate);
                updateMessage = result == "permission"
                    ? "Разрешите установку для DnD VTT Unity. Вернитесь в приложение и снова нажмите «Обновить»."
                    : "Подтвердите установку в системном окне Android. Данные персонажей сохранятся.";
#elif UNITY_STANDALONE_WIN && !UNITY_EDITOR
                var start = new System.Diagnostics.ProcessStartInfo(downloadedUpdate,
                    "/S /UPDATEPID=" + System.Diagnostics.Process.GetCurrentProcess().Id) { UseShellExecute = true };
                System.Diagnostics.Process.Start(start);
                Application.Quit();
#else
                updateMessage = "Установка доступна только из собранного приложения Android или Windows.";
#endif
            }
            catch (Exception error) { updateMessage = "Установка не началась: " + error.Message; }
        }
    }
}
