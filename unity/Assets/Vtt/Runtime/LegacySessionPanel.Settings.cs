using System;
using System.IO;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private ClientPreferences preferences, settingsDraft;
        private string platformQuality;
        private int settingsSection;
        private static readonly string[] SettingSections = { "Обновления", "Оформление", "Графика", "Управление", "Данные" };
        private static readonly string[] ThemeKeys = { "orange", "purple", "blue", "red" };
        private static readonly string[] ThemeLabels = { "D&D Оранжевый", "Некромантский", "Магический", "Кровавый" };
        private string SettingsPath => profileStoreOverride == null ? Path.Combine(Application.persistentDataPath, "client_settings.json") : SavePath + ".settings.json";

        private void LoadPreferences()
        {
            string[] qualityNames = QualitySettings.names;
            platformQuality = qualityNames.Length > 0 ? qualityNames[QualitySettings.GetQualityLevel()] : "";
            preferences = new ClientPreferences { quality = platformQuality };
            if (File.Exists(SettingsPath))
                try { preferences = ClientPreferences.Load(SettingsPath); }
                catch (Exception error) { status = "Настройки не загружены; файл сохранён: " + error.Message; }
            ApplyPreferences();
        }
        private void ApplyPreferences()
        {
            preferences.Validate();
            ApplyScreenSleep();
            int quality = Array.IndexOf(QualitySettings.names, preferences.quality);
            if (quality >= 0) QualitySettings.SetQualityLevel(quality, true);
            QualitySettings.vSyncCount = preferences.vSync ? 1 : 0;
            Application.targetFrameRate = preferences.fps;
            world.explorer.lookSensitivity = preferences.sensitivity;
            world.explorer.invertY = preferences.invertY;
            world.explorer.viewCamera.fieldOfView = preferences.fieldOfView;
            world.explorer.SetFirstPerson(preferences.firstPerson);
        }
        private void ApplyScreenSleep(bool active = true)
        {
            if (Application.isMobilePlatform)
                Screen.sleepTimeout = active && (preferences?.keepScreenAwake ?? true) ? SleepTimeout.NeverSleep : SleepTimeout.SystemSetting;
        }
        private void OpenSettings()
        {
            settingsDraft = ClientPreferences.Parse(preferences.Export());
            settingsSection = 0;
            OpenSettingsCategory("");
            brandTechnicalScreen = false;
            Navigate(FrontScreen.Settings);
        }
        private void DrawSettings(bool embedded = false)
        {
            PrepareSettingsSkin();
            if (!embedded)
            {
                GUILayout.Label("Настройки приложения", heading);
                GUILayout.Label("Версия Unity: " + UnityRelease.Version + "  ·  Изменения сохраняются только на этом устройстве.", muted);
                GUILayout.Space(10);
            }
            switch (settingsSection)
            {
                case 0:
                    DrawUpdates();
                    break;
                case 1:
                    GUILayout.Label("Оформление", heading);
                    GUILayout.Label("Цветовая тема меняет фон меню и сохраняется для следующих запусков.", muted);
                    int themeIndex = Math.Max(0, Array.IndexOf(ThemeKeys, settingsDraft.theme));
                    themeIndex = MenuGrid(themeIndex,ThemeLabels,2);
                    settingsDraft.theme = ThemeKeys[themeIndex];
                    GUILayout.Label("Для выбора арт-обоев и иконок потребуется отдельный каталог изображений. Сейчас доступна смена цветовой темы.", muted);
                    break;
                case 2:
                    GUILayout.Label("Графика", heading);
                    if (Application.isMobilePlatform)
                    {
                        settingsDraft.keepScreenAwake = GUILayout.Toggle(settingsDraft.keepScreenAwake, "Не выключать экран, пока приложение открыто", GUILayout.MinHeight(44));
                        GUILayout.Label("Если выключено — используется системный таймер телефона. В фоне всегда действует системный таймер.", muted);
                    }
                    string[] qualityNames = QualitySettings.names;
                    if (qualityNames.Length > 0)
                    {
                        int quality = Mathf.Max(0, Array.IndexOf(qualityNames, settingsDraft.quality));
                        quality = MenuGrid(quality,qualityNames,Mathf.Min(3,qualityNames.Length));
                        settingsDraft.quality = qualityNames[quality];
                    }
                    GUILayout.Space(14);
                    GUILayout.Label("Лимит кадров в секунду");
                    int[] limits = { 30, 60, 120, -1 };
                    int fps = Mathf.Max(0, Array.IndexOf(limits, settingsDraft.fps));
                    settingsDraft.fps = limits[MenuGrid(fps,new[] { "30", "60", "120", "Без лимита" },4)];
#if UNITY_STANDALONE_WIN
                    settingsDraft.vSync = GUILayout.Toggle(settingsDraft.vSync, "Вертикальная синхронизация (Windows)", GUILayout.MinHeight(38));
                    GUILayout.Label("При синхронизации Windows использует частоту экрана вместо лимита FPS.", muted);
#endif
                    break;
                case 3:
                    GUILayout.Label("Камера и управление", heading);
                    GUILayout.Label("Чувствительность мыши и касания: " + settingsDraft.sensitivity.ToString("0.00") + "×");
                    settingsDraft.sensitivity = GUILayout.HorizontalSlider(settingsDraft.sensitivity, .25f, 3, GUILayout.Height(52));
                    settingsDraft.invertY = GUILayout.Toggle(settingsDraft.invertY, "Инвертировать вертикальное движение камеры", GUILayout.MinHeight(42));
                    GUILayout.Label("Поле зрения: " + Mathf.RoundToInt(settingsDraft.fieldOfView) + "°");
                    settingsDraft.fieldOfView = GUILayout.HorizontalSlider(settingsDraft.fieldOfView, 50, 100, GUILayout.Height(52));
                    settingsDraft.firstPerson = GUILayout.Toggle(settingsDraft.firstPerson, "Камера от первого лица при запуске", GUILayout.MinHeight(42));
                    break;
                case 4:
                    GUILayout.Label("Данные и устройство", heading);
                    GUILayout.Label("Персонажи хранятся отдельно от настроек. При обновлении приложения не удаляйте его данные.", muted);
                    GUILayout.Label("Персонажей в архиве: " + (archive?.Count ?? 0), muted);
                    GUILayout.Label("Файл персонажей: " + SavePath, muted);
                    GUILayout.Label("Файл настроек: " + SettingsPath, muted);
                    if (archive != null && GUILayout.Button("Сохранить персонажей сейчас", GUILayout.Height(48)))
                        Attempt(() => { SaveSheet(); status = "Персонажи сохранены"; });
                    if (GUILayout.Button("Скопировать путь к сохранению", GUILayout.Height(42))) GUIUtility.systemCopyBuffer = SavePath;
                    break;
            }
            if(embedded)return;
            GUILayout.Space(22);
            if (settingsSection == 0)
            {
                settingsDraft.autoCheckUpdates = GUILayout.Toggle(settingsDraft.autoCheckUpdates,
                    "Проверять обновления при запуске", GUILayout.MinHeight(42));
            }
            GUILayout.Space(10);
            if (GUILayout.Button("Применить и сохранить настройки", GUILayout.Height(50))) Attempt(() =>
            {
                settingsDraft.Save(SettingsPath);
                preferences = ClientPreferences.Parse(settingsDraft.Export());
                ApplyPreferences();
                status = "Настройки применены и сохранены";
            });
            if (GUILayout.Button("Восстановить значения по умолчанию (без удаления героев)", GUILayout.Height(42)))
            {
                settingsDraft = new ClientPreferences { quality = platformQuality };
                status = "Стандартные параметры выбраны. Нажмите «Применить и сохранить», чтобы записать их.";
            }
            if (GUILayout.Button("Вернуться на главную", GUILayout.Height(42))) Navigate(FrontScreen.Home);
        }
    }
}
