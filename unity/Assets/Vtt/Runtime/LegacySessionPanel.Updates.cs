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
        private bool updateBusy;
        private string updateMessage = "Обновления выпускаются по команде разработчика. Проверка запускается этой кнопкой.";
        private float updateProgress;
        private JObject updateFeed;
        private string downloadedUpdate;
        private string UpdatePlatform => Application.platform == RuntimePlatform.Android ? "android" : "windows";
        private void DrawUpdates()
        {
            GUILayout.Space(22); GUILayout.Label("Обновление приложения · " + UnityRelease.Version, heading);
            GUILayout.Label(updateMessage, muted);
            if (updateBusy) GUILayout.Label("Загрузка: " + Mathf.RoundToInt(updateProgress * 100) + "%", muted);
            bool enabled = GUI.enabled; GUI.enabled = !updateBusy;
            if (GUILayout.Button("Проверить обновления", GUILayout.Height(40))) StartCoroutine(CheckForUpdates());
            if (updateFeed != null && (int)updateFeed["versionCode"] > UnityRelease.Code)
            {
                GUILayout.Label("Доступна версия " + updateFeed["version"] + "\n" + updateFeed["notes"], muted);
                if (GUILayout.Button(downloadedUpdate == null ? "Скачать обновление" : "Установить обновление", GUILayout.Height(44)))
                {
                    if (downloadedUpdate == null) StartCoroutine(DownloadUpdate()); else AttemptInstallUpdate();
                }
            }
            GUI.enabled = enabled;
        }
        private IEnumerator CheckForUpdates()
        {
            updateBusy = true; updateProgress = 0; updateFeed = null; downloadedUpdate = null; updateMessage = "Проверяю доступную версию…";
            using var request = UnityWebRequest.Get(UnityRelease.Feed + "?check=" + DateTimeOffset.UtcNow.ToUnixTimeSeconds()); request.timeout = 30;
            yield return request.SendWebRequest();
            try
            {
                if (request.result != UnityWebRequest.Result.Success) throw new IOException("Сервер обновлений недоступен: " + request.error);
                updateFeed = UnityRelease.ParseFeed(request.downloadHandler.text, UpdatePlatform);
                updateMessage = (int)updateFeed["versionCode"] > UnityRelease.Code ? "Обновление готово. Перед установкой сохраните изменения листа." : "Установлена актуальная версия " + UnityRelease.Version;
            }
            catch (Exception error) { updateMessage = error.Message + "\nМожно повторить проверку позже. Ваши данные не изменены."; }
            finally { updateBusy = false; }
        }
        private IEnumerator DownloadUpdate()
        {
            updateBusy = true; updateMessage = "Скачиваю пакет обновления…";
            string directory = Path.Combine(Application.temporaryCachePath, "updates");
            string file = Path.Combine(directory, "UnityUpdate-" + updateFeed["versionCode"] + (UpdatePlatform == "android" ? ".apk" : ".exe"));
            var artifact = (JObject)updateFeed["artifacts"][UpdatePlatform];
            UnityWebRequest pending = null;
            try { Directory.CreateDirectory(directory); pending = UnityWebRequest.Get((string)artifact["url"]); pending.downloadHandler = new DownloadHandlerFile(file) { removeFileOnAbort = true }; }
            catch (Exception error) { pending?.Dispose(); pending = null; updateMessage = "Не удалось подготовить загрузку: " + error.Message; }
            if (pending == null) { updateBusy = false; yield break; }
            using var request = pending; request.timeout = 600; request.redirectLimit = 5;
            var operation = request.SendWebRequest();
            while (!operation.isDone) { updateProgress = request.downloadProgress; if (request.downloadedBytes > (ulong)(long)artifact["bytes"]) request.Abort(); yield return null; }
            try
            {
                if (request.result != UnityWebRequest.Result.Success) throw new IOException("Не удалось скачать обновление: " + request.error);
                UnityRelease.VerifyFile(file, artifact); downloadedUpdate = file; updateMessage = "Пакет проверен. Нажмите Установить обновление.";
            }
            catch (Exception error) { updateMessage = error.Message; }
            finally { updateBusy = false; }
        }
        private void AttemptInstallUpdate()
        {
            try
            {
                UnityRelease.VerifyFile(downloadedUpdate, (JObject)updateFeed["artifacts"][UpdatePlatform]);
                // Save current edits before either platform may replace/close this process.
                if (archive != null) SaveSheet();
#if UNITY_ANDROID && !UNITY_EDITOR
                using var player = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
                using var activity = player.GetStatic<AndroidJavaObject>("currentActivity");
                using var bridge = new AndroidJavaClass("com.dndvtt.unityupdater.UpdateProvider");
                string result = bridge.CallStatic<string>("install", activity, downloadedUpdate);
                updateMessage = result == "permission" ? "Разрешите установку обновлений для DnD VTT Unity, вернитесь и снова нажмите Установить." : "Подтвердите обновление в системном окне Android. Персонажи и настройки сохранятся.";
#elif UNITY_STANDALONE_WIN && !UNITY_EDITOR
                var start = new System.Diagnostics.ProcessStartInfo(downloadedUpdate, "/S /UPDATEPID=" + System.Diagnostics.Process.GetCurrentProcess().Id) { UseShellExecute = true };
                System.Diagnostics.Process.Start(start); Application.Quit();
#else
                updateMessage = "Установка доступна в собранном Android/Windows приложении.";
#endif
            }
            catch (Exception error) { updateMessage = "Установка не началась: " + error.Message; }
        }
    }
}
