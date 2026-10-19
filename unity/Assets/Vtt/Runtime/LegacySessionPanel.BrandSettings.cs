using System;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private static readonly string[] BrandAccentKeys = { "orange", "purple", "blue", "red" };
        private static readonly string[] BrandAccentNames = {
            "D&D Оранжевый", "Некромантский фиолетовый", "Магический синий", "Кроваво-красный"
        };
        private static readonly string[] BrandFrameKeys = { "dragon", "vine" };
        private static readonly string[] BrandFrameNames = { "Восточный дракон", "Лоза и кости" };
        private static readonly string[] BrandFrameColors = { "gold", "crimson", "jade", "azure", "violet" };
        private static readonly string[] BrandFrameLabels = { "Золото", "Багровый", "Нефрит", "Лазурь", "Фиолетовый" };

        private void BrandCardHeader(string name, Color? color = null)
        {
            brandName.normal.textColor = color ?? BrandAccent;
            GUILayout.Label(name, brandName);
        }

        private void BrandSaveAppearance()
        {
            Attempt(() => {
                settingsDraft.Save(SettingsPath);
                preferences = ClientPreferences.Parse(settingsDraft.Export());
                ApplyPreferences();
                brandNotice = "Оформление сохранено на устройстве.";
            });
        }

        private void BrandSettingsCard(Action body, string name, Color? c = null)
        {
            GUILayout.BeginVertical(brandCard);
            BrandCardHeader(name, c);
            GUILayout.Space(5);
            body();
            GUILayout.EndVertical();
        }

        private void DrawBrandSettings()
        {
            DrawBrandBackdrop(true);
            float margin = Mathf.Min(20, Screen.width * .033f);
            float width = Mathf.Min(Screen.width - margin * 2, BrandMaxWidth);
            float x = (Screen.width - width) / 2f;
            Rect outer = new Rect(x, 12, width, Mathf.Max(100, Screen.height - 24));
            Color frame = BrandFrameColor;
            Shade(outer, frame);
            Rect inner = new Rect(outer.x + 2, outer.y + 2, outer.width - 4, outer.height - 4);
            Shade(inner, new Color(.075f, .071f, .07f, .98f));
            // Corner emblems reference the dragon / vine frames of the source UI.
            GUI.Label(new Rect(inner.x + 5, inner.y + 3, 28, 28),
                settingsDraft?.frameStyle == "vine" ? "❧" : "◆");

            GUILayout.BeginArea(new Rect(inner.x + 13, inner.y + 11, inner.width - 26, inner.height - 22));
            GUILayout.BeginHorizontal();
            GUILayout.Label("⚙ Настройки приложения", brandTitle, GUILayout.ExpandWidth(true));
            if (GUILayout.Button("×", brandRed, GUILayout.Width(48), GUILayout.Height(42)))
                Navigate(FrontScreen.Home);
            GUILayout.EndHorizontal();
            GUILayout.Space(9);
            brandSettingsScroll = GUILayout.BeginScrollView(brandSettingsScroll, false, true);

            BrandSettingsCard(() => {
                GUILayout.Label("Герои хранятся на этом устройстве. Облачная синхронизация из WebView-клиента ещё не перенесена.", brandSub);
                GUILayout.Label("Локальных персонажей: " + (archive?.Count ?? 0), brandSub);
                if (GUILayout.Button("Мои персонажи", brandBlue, GUILayout.Height(45)))
                    Navigate(FrontScreen.Characters);
            }, "☁ Аккаунт и облачные персонажи", new Color(.90f,.72f,.40f));

            BrandSettingsCard(() => {
                int idx = Math.Max(0, Array.IndexOf(BrandAccentKeys, settingsDraft.theme));
                idx = GUILayout.SelectionGrid(idx, BrandAccentNames, 2, GUILayout.MinHeight(96));
                settingsDraft.theme = BrandAccentKeys[idx];
                GUILayout.Label("Цвет заголовков и декоративных акцентов.", brandSub);
            }, "🎨 Тема оформления (Акцент)");

            BrandSettingsCard(() => {
                GUILayout.Label("Интер (Строгий и чистый)", brandSub);
                GUILayout.Label("В нативном Unity сейчас используется системный шрифт. Декоративные гарнитуры подключим отдельным UI-пакетом, без подмены содержимого.", brandSub);
            }, "✍ Типографика (Шрифт интерфейса)");

            BrandSettingsCard(() => {
                GUILayout.Label("Иконка Android пока задана при сборке APK. Здесь будет выбор варианта значка после переноса Android launcher aliases.", brandSub);
                bool enabled = GUI.enabled; GUI.enabled = false;
                GUILayout.Button("Параметры иконки · скоро", brandGold, GUILayout.Height(45));
                GUI.enabled = enabled;
            }, "🖼 Иконка приложения", new Color(.90f,.79f,.48f));

            BrandSettingsCard(() => {
                GUILayout.Label("Рамка применяется к окнам Unity и сохраняется отдельно от персонажей.", brandSub);
                int frame = Math.Max(0, Array.IndexOf(BrandFrameKeys, settingsDraft.frameStyle));
                settingsDraft.frameStyle = BrandFrameKeys[GUILayout.SelectionGrid(frame, BrandFrameNames, 2, GUILayout.MinHeight(52))];
                GUILayout.Space(8);
                int tint = Math.Max(0, Array.IndexOf(BrandFrameColors, settingsDraft.frameColor));
                settingsDraft.frameColor = BrandFrameColors[GUILayout.SelectionGrid(tint, BrandFrameLabels, 2, GUILayout.MinHeight(116))];
            }, "🪄 Оформление рамок", new Color(.90f,.79f,.48f));

            BrandSettingsCard(() => {
                GUILayout.Label("Обои по умолчанию: wallpapers/16.png", brandSub);
                GUILayout.Label("Используется оригинал из main. Остальные wallpapers НЕ входят в APK и будут доступны после внедрения загрузочных пакетов контента.", brandSub);
                bool enabled = GUI.enabled; GUI.enabled = false;
                GUILayout.Button("16.png — установлены по умолчанию", brandPurple, GUILayout.Height(45));
                GUI.enabled = enabled;
            }, "🖼 Обои и арты");

            BrandSettingsCard(() => {
                GUILayout.Label("Настройки музыки и эмбиента появятся после подключения аудиопакета. В эту сборку новые треки не добавляем.", brandSub);
            }, "♫ Аудио и Эмбиент");

            BrandSettingsCard(() => {
                GUILayout.Label("Что нового в установленной версии и предыдущих выпусках.", brandSub);
                if (GUILayout.Button(showChangelog ? "Скрыть «Что нового»" : "Открыть «Что нового»",
                    brandGold, GUILayout.Height(48)))
                {
                    showChangelog = !showChangelog;
                    if (showChangelog) StartCoroutine(FetchChangelog());
                }
                if (showChangelog) DrawChangelog();
            }, "📜 История изменений", new Color(.9f,.79f,.48f));

            // Existing verified in-app Android updater stays fully functional.
            BrandSettingsCard(DrawUpdates, "🔄 Обновления приложения", new Color(.31f,.75f,.98f));

            BrandSettingsCard(() => {
                if (GUILayout.Button(brandAdvancedOpen ? "Скрыть технические настройки" : "Графика, управление и данные",
                    brandGold, GUILayout.Height(47))) brandAdvancedOpen = !brandAdvancedOpen;
                if (brandAdvancedOpen) DrawSettings(); // Reuses the real working controls.
            }, "⚙ Дополнительные параметры");

            if (!string.IsNullOrWhiteSpace(brandNotice)) GUILayout.Label(brandNotice, brandSub);
            if (GUILayout.Button("Сохранить оформление", brandGreen, GUILayout.Height(50)))
                BrandSaveAppearance();
            if (GUILayout.Button("Закрыть", brandBrown, GUILayout.Height(46)))
                Navigate(FrontScreen.Home);
            GUILayout.EndScrollView();
            GUILayout.EndArea();
        }
    }
}
