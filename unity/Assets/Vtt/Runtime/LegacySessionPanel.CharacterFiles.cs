using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private string characterFileToken, characterFileOperation, characterArtTarget;
        private void DrawCharacterFiles()
        {
            bool enabled = GUI.enabled; GUI.enabled = enabled && characterFileToken == null;
            if (FitMenuButton("Открыть файл персонажей…")) Attempt(() => PickCharacterFile(false));
            GUI.enabled = enabled && characterFileToken == null && archive != null;
            if (FitMenuButton("Сохранить персонажей в файл…")) Attempt(() => PickCharacterFile(true));
#if UNITY_ANDROID && !UNITY_EDITOR
            if (FitMenuButton("Поделиться JSON персонажей…")) Attempt(ShareCharacterFile);
#endif
            GUI.enabled = enabled;
            if (characterFileToken != null) GUILayout.Label("Выберите файл в системном окне или нажмите там Отмена.", muted);
        }
        private void PickCharacterFile(bool save)
        {
            if (characterFileToken != null) throw new InvalidOperationException("Сначала завершите выбор файла");
#if UNITY_ANDROID && !UNITY_EDITOR
            using var player = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
            using var activity = player.GetStatic<AndroidJavaObject>("currentActivity");
            string token = Guid.NewGuid().ToString("N");
            using var cache = activity.Call<AndroidJavaObject>("getCacheDir");
            string directory = Path.Combine(cache.Call<string>("getAbsolutePath"), "character-transfers");
            if (save) CharacterFiles.Write(Path.Combine(directory, token + ".json"), ExportCurrent());
            characterFileToken = token; characterFileOperation = save ? "export" : "import";
            try
            {
                using var bridge = new AndroidJavaClass("com.dndvtt.unityupdater.CharacterDocumentActivity");
                bridge.CallStatic("launch", activity, gameObject.name, token, characterFileOperation);
            }
            catch { characterFileToken = characterFileOperation = null; throw; }
#elif UNITY_STANDALONE_WIN && !UNITY_EDITOR
            string path = CharacterFiles.PickWindows(save);
            if (path == null) { status = "Выбор файла отменён"; return; }
            if (save) { CharacterFiles.Write(path, ExportCurrent()); status = "Персонажи сохранены в файл: " + path; }
            else if (Import(CharacterFiles.Read(path))) Navigate(FrontScreen.Characters);
#else
            throw new PlatformNotSupportedException("Выбор файла доступен в приложении Android и Windows");
#endif
        }
        [UnityEngine.Scripting.Preserve]
        public void OnCharacterFileResult(string message)
        {
            Attempt(() =>
            {
                var result = JObject.Parse(message);
                if (characterFileToken == null || (string)result["token"] != characterFileToken) return;
                string token = characterFileToken, operation = characterFileOperation, artTarget = characterArtTarget;
                characterArtTarget = null;
                characterFileToken = characterFileOperation = null;
                if ((string)result["status"] == "cancel") { status = "Выбор файла отменён"; return; }
                if ((string)result["status"] != "ok") throw new IOException((string)result["error"] ?? "Не удалось обработать файл");
                if (operation == "export") { status = "Файл персонажей сохранён в выбранное место"; return; }
#if UNITY_ANDROID && !UNITY_EDITOR
                using var player = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
                using var activity = player.GetStatic<AndroidJavaObject>("currentActivity");
                using var cache = activity.Call<AndroidJavaObject>("getCacheDir");
                string path = Path.Combine(cache.Call<string>("getAbsolutePath"), "character-transfers", token + (operation == "art" ? ".image" : ".json"));
                try { if (operation == "art") ImportHeroArt(artTarget, CharacterArt.Read(path)); else if (Import(CharacterFiles.Read(path))) Navigate(FrontScreen.Characters); }
                finally { if (File.Exists(path)) File.Delete(path); }
#endif
            });
        }
#if UNITY_ANDROID && !UNITY_EDITOR
        private void ShareCharacterFile()
        {
            string json = CharacterFiles.Validate(ExportCurrent());
            using var player = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
            using var activity = player.GetStatic<AndroidJavaObject>("currentActivity");
            using var cache = activity.Call<AndroidJavaObject>("getCacheDir");
            string digest;
            using (var hash = SHA256.Create()) digest = BitConverter.ToString(hash.ComputeHash(Encoding.UTF8.GetBytes(json))).Replace("-", "").ToLowerInvariant();
            string path = Path.Combine(cache.Call<string>("getAbsolutePath"), "character-exports", "Characters-" + digest + ".json");
            CharacterFiles.Write(path, json);
            using var provider = new AndroidJavaClass("com.dndvtt.unityupdater.UpdateProvider");
            provider.CallStatic("shareCharacters", activity, path);
            status = "Выберите приложение, куда отправить JSON персонажей";
        }
#endif
    }
}
