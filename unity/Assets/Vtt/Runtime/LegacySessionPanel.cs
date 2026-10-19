using System;
using System.IO;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel : MonoBehaviour
    {
        public LegacyMapPresenter world;
        private LegacyCharacterArchive archive;
        private int selected;
        private bool panel;
        private string input = "", status = "Профиль не загружен";
        private Vector2 scroll;
        private string profileStoreOverride;
        public string SavePath => profileStoreOverride ?? Path.Combine(Application.persistentDataPath, "dnd_multi_characters_v2.json");
        private void Start()
        {
            ApplyMobileOrientation(screen);
            BeginBrandSplash(); // Portrait immediately on app launch.
            world.explorer.showHelp = false;
            world.explorer.acceptInput = false;
            Cursor.lockState = CursorLockMode.None; Cursor.visible = true;
            var args = Environment.GetCommandLineArgs(); int store = Array.IndexOf(args, "--vtt-profile-store");
            if (store >= 0 && store + 1 < args.Length) profileStoreOverride = Path.GetFullPath(args[store + 1]);
            LoadPreferences();
            if (preferences.autoCheckUpdates) StartCoroutine(CheckForUpdates());
            if (File.Exists(SavePath))
            {
                try { archive = CharacterSheetStore.Load(SavePath); status = "Загружен локальный лист Unity"; }
                catch (Exception e) { status = "Сохранение не загружено; файл оставлен без изменений: " + e.Message; }
            }
            int index = Array.IndexOf(args, "--vtt-character");
            if (index >= 0 && index + 1 < args.Length)
            {
                try { var info = new FileInfo(args[index + 1]); if (info.Length > 1024 * 1024) throw new FormatException("File too large"); Import(File.ReadAllText(info.FullName)); }
                catch (Exception e) { status = e.Message; }
            }
        }
        // Android may recreate/resume the activity after granting install
        // permissions or returning from the background. Restore the view mode.
        private void OnApplicationFocus(bool hasFocus)
        {
            if (hasFocus) ApplyMobileOrientation(screen);
        }

        public bool Import(string json)
        {
            try { var candidate = new LegacyCharacterArchive(json); archive = candidate; selected = 0; ClearSheetInputs(); status = "Импортировано профилей: " + archive.Count + ". Для записи нажмите Сохранить."; return true; }
            catch (Exception error) { status = "Импорт отклонён: " + error.Message; return false; }
        }
        public string CurrentName => archive == null ? "Исследователь" : archive.Name(selected);
        public string ExportOriginal() => archive?.OriginalJson;
        public string ExportCurrent() => archive?.Export();
        public void SaveSheet() { CharacterSheetStore.Save(SavePath, archive ?? throw new InvalidOperationException("Нет персонажа")); }
        private void Toggle()
        {
            panel = !panel; world.explorer.acceptInput = !panel;
            Cursor.lockState = CursorLockMode.None; Cursor.visible = true;
        }
        private void OnGUI()
        {
            GUI.skin.label.fontSize = 16;
            if (DrawBrandSplash()) return;
            if (screen != FrontScreen.Map) { DrawFrontEnd(); return; }
#if UNITY_ANDROID && !UNITY_EDITOR
            // Screen.orientation changes asynchronously. Don't draw a wide
            // HUD with negative widths during the portrait-to-map transition.
            if (Screen.height > Screen.width)
            {
                GUI.Box(new Rect(10, 10, Mathf.Max(1, Screen.width - 20), 100),
                    "Поворачиваем экран для 3D-карты…");
                return;
            }
#endif
            GUI.Box(new Rect(10, 10, Screen.width - 20, 86), "");
            GUI.Label(new Rect(22, 16, Screen.width - 450, 25), world.MapName + " / этаж " + (world.CurrentFloor + 1));
            GUI.Label(new Rect(22, 43, Screen.width - 450, 25), CurrentName + (archive == null ? "" : "  HP " + archive.CurrentHp(selected) + "/" + archive.MaximumHp(selected) + "  temp " + archive.TemporaryHp(selected)));
            GUI.Label(new Rect(22, 69, Screen.width - 450, 22), "WASD · мышь · V камера · Space прыжок · Esc курсор · R вход");
            if (GUI.Button(new Rect(Screen.width - 425, 20, 95, 52), "Лист / меню")) Navigate(archive == null ? FrontScreen.Home : FrontScreen.Sheet);
            if (GUI.Button(new Rect(Screen.width - 320, 20, 95, 52), "Карты / этажи")) Toggle();
            if (GUI.Button(new Rect(Screen.width - 215, 20, 95, 52), "Камера")) world.explorer.SetFirstPerson(!world.explorer.firstPerson);
            if (GUI.Button(new Rect(Screen.width - 110, 20, 90, 52), "Прыжок")) world.explorer.RequestJump();
            if (!panel) return;
            var area = new Rect(20, 110, Screen.width - 40, Screen.height - 130);
            var oldColor = GUI.color; GUI.color = new Color(.07f, .08f, .1f, .97f);
            GUI.DrawTexture(area, Texture2D.whiteTexture); GUI.color = oldColor;
            GUI.Box(area, "Карты и этажи");
            GUILayout.BeginArea(new Rect(area.x + 15, area.y + 30, area.width - 30, area.height - 40));
            scroll = GUILayout.BeginScrollView(scroll);
            DrawMapSelector();
            GUILayout.Label(status); GUILayout.EndScrollView(); GUILayout.EndArea();
        }
        private void DrawImportAndMap()
        {
            DrawMapSelector();
            GUILayout.Label("Вставьте экспорт JSON персонажа / массива / characters:");
            input = GUILayout.TextArea(input, GUILayout.Height(110));
            if (GUILayout.Button("Прочитать JSON", GUILayout.Height(35))) Import(input);
            if (archive != null)
            {
                for (int i = 0; i < archive.Count; i++) { int index = i; if (GUILayout.Button(archive.Name(i))) { selected = index; ClearSheetInputs(); } }
                if (GUILayout.Button("Копировать исходный JSON без изменений")) GUIUtility.systemCopyBuffer = archive.OriginalJson;
            }
        }
        private void DrawMapSelector()
        {
            GUILayout.Label("Выбор карты (модели полностью подключены для таверны):");
            for (int i = 0; i < world.catalog.maps.Length; i++)
            {
                int index = i; if (GUILayout.Button(world.catalog.maps[i].key, GUILayout.Height(30))) world.TryLoad(index);
            }
            GUILayout.BeginHorizontal();
            for (int i = 0; i < world.FloorCount; i++) { int floor = i; if (GUILayout.Button("Этаж " + (i + 1))) { try { world.SetFloor(floor); } catch (Exception e) { status = e.Message; } } }
            GUILayout.EndHorizontal();
            GUILayout.Label("Моделей: " + world.ImportedModels + "; заменителей: " + world.MissingModels + ". Закрытые двери/окна пока блокируют путь; боевые правила и туман ещё не перенесены.");
            if (!string.IsNullOrEmpty(world.Error)) GUILayout.Label(world.Error);
        }
    }
}
