using System;
using System.IO;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed class LegacySessionPanel : MonoBehaviour
    {
        public LegacyMapPresenter world;
        private LegacyCharacterArchive archive;
        private int selected;
        private bool panel;
        private string input = "", status = "Профиль не загружен";
        private Vector2 scroll;
        private void Start()
        {
            world.explorer.showHelp = false;
            var args = Environment.GetCommandLineArgs(); int index = Array.IndexOf(args, "--vtt-character");
            if (index >= 0 && index + 1 < args.Length)
            {
                try { var info = new FileInfo(args[index + 1]); if (info.Length > 1024 * 1024) throw new FormatException("File too large"); Import(File.ReadAllText(info.FullName)); }
                catch (Exception e) { status = e.Message; }
            }
        }
        public bool Import(string json)
        {
            try { var candidate = new LegacyCharacterArchive(json); archive = candidate; selected = 0; status = "Прочитано профилей: " + archive.Count + ". Исходные файлы не изменены."; return true; }
            catch (Exception error) { status = "Импорт отклонён: " + error.Message; return false; }
        }
        public string CurrentName => archive == null ? "Исследователь" : archive.Name(selected);
        public string ExportOriginal() => archive?.OriginalJson;
        private void Toggle()
        {
            panel = !panel; world.explorer.acceptInput = !panel;
            Cursor.lockState = CursorLockMode.None; Cursor.visible = true;
        }
        private void OnGUI()
        {
            GUI.skin.label.fontSize = 16;
            GUI.Box(new Rect(10, 10, Screen.width - 20, 86), "");
            GUI.Label(new Rect(22, 16, Screen.width - 350, 25), world.MapName + " / этаж " + (world.CurrentFloor + 1));
            GUI.Label(new Rect(22, 43, Screen.width - 350, 25), CurrentName + (archive == null ? "" : "  HP " + archive.CurrentHp(selected) + "/" + archive.MaximumHp(selected) + "  temp " + archive.TemporaryHp(selected)));
            GUI.Label(new Rect(22, 69, Screen.width - 350, 22), "WASD · мышь · V камера · Space прыжок · Esc курсор · R вход");
            if (GUI.Button(new Rect(Screen.width - 320, 20, 95, 52), "Карта / лист")) Toggle();
            if (GUI.Button(new Rect(Screen.width - 215, 20, 95, 52), "Камера")) world.explorer.SetFirstPerson(!world.explorer.firstPerson);
            if (GUI.Button(new Rect(Screen.width - 110, 20, 90, 52), "Прыжок")) world.explorer.RequestJump();
            if (!panel) return;
            var area = new Rect(20, 110, Mathf.Min(700, Screen.width - 40), Screen.height - 130);
            GUI.Box(area, "Карты и импорт листа персонажа");
            GUILayout.BeginArea(new Rect(area.x + 15, area.y + 30, area.width - 30, area.height - 40));
            scroll = GUILayout.BeginScrollView(scroll);
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
            GUILayout.Label("Вставьте экспорт JSON персонажа / массива / characters. Только чтение:");
            input = GUILayout.TextArea(input, GUILayout.Height(110));
            if (GUILayout.Button("Прочитать JSON", GUILayout.Height(35))) Import(input);
            if (archive != null)
            {
                for (int i = 0; i < archive.Count; i++) { int index = i; if (GUILayout.Button(archive.Name(i))) selected = index; }
                if (GUILayout.Button("Копировать исходный JSON без изменений")) GUIUtility.systemCopyBuffer = archive.OriginalJson;
                GUILayout.Label("Это просмотр листа; ресурсы/инвентарь/эффекты сохранены в JSON, но ещё не исполняются C#-правилами.");
            }
            GUILayout.Label(status); GUILayout.EndScrollView(); GUILayout.EndArea();
        }
    }
}
