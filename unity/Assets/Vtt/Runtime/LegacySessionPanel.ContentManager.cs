using UnityEngine;

namespace DndVtt.UnityPrototype
{
    // First-stage native content browser. No remote packages are installed until
    // manifest verification, atomic storage and dependency resolution exist.
    public sealed partial class LegacySessionPanel
    {
        private int contentCategory;
        private string contentSearch = "";
        private static readonly string[] ContentCategories =
        {
            "Все", "Игровые системы", "Расы", "Классы", "Заклинания",
            "Ремёсла", "Карты", "3D-ресурсы", "Оформление", "Коллекции"
        };

        private void OpenContentManager()
        {
            contentCategory = 0;
            contentSearch = "";
            Navigate(FrontScreen.ContentManager);
        }

        private void DrawContentManager()
        {
            GUILayout.Label("Менеджер контента", heading);
            GUILayout.Label("Единая библиотека игровых систем и дополнений. Первый этап: каталог и навигация. Загрузка из интернета пока не подключена.", muted);
            GUILayout.Space(12);
            contentSearch = GUILayout.TextField(contentSearch, GUILayout.MinHeight(40));
            GUILayout.Label("Поиск по каталогу (подключим к проверенному реестру пакетов)", muted);
            GUILayout.Space(12);
            contentCategory = GUILayout.SelectionGrid(contentCategory, ContentCategories, 2, GUILayout.MinHeight(230));
            GUILayout.Space(16);
            GUILayout.Label(ContentCategories[contentCategory], heading);
            GUILayout.Label("Удалённый каталог пока не настроен. Приложение не будет предлагать фиктивные загрузки или устанавливать непроверенные файлы.", muted);
            if (contentCategory == 1)
                GUILayout.Label("Базовая система существующих персонажей: D&D 5e (наследуемый формат). Переключение правил появится после введения идентификаторов систем.", muted);
            GUILayout.Space(18);
            if (GUILayout.Button("← Вернуться в настройки", GUILayout.Height(52))) OpenSettings();
        }
    }
