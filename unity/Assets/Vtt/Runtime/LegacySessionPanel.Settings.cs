using System;
using System.IO;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private ClientPreferences preferences, settingsDraft;
        private string platformQuality;
        private string SettingsPath => profileStoreOverride == null ? Path.Combine(Application.persistentDataPath, "client_settings.json") : SavePath + ".settings.json";
        private void LoadPreferences()
        {
            platformQuality = QualitySettings.names[QualitySettings.GetQualityLevel()];
            preferences = new ClientPreferences { quality = platformQuality };
            if (File.Exists(SettingsPath))
                try { preferences = ClientPreferences.Load(SettingsPath); }
                catch (Exception error) { status = "Настройки не загружены; файл сохранён: " + error.Message; }
            ApplyPreferences();
        }
        private void ApplyPreferences()
        {
            preferences.Validate(); int quality = Array.IndexOf(QualitySettings.names, preferences.quality);
            if (quality >= 0) QualitySettings.SetQualityLevel(quality, true);
            QualitySettings.vSyncCount = preferences.vSync ? 1 : 0; Application.targetFrameRate = preferences.fps;
            world.explorer.lookSensitivity = preferences.sensitivity; world.explorer.invertY = preferences.invertY;
            world.explorer.viewCamera.fieldOfView = preferences.fieldOfView; world.explorer.SetFirstPerson(preferences.firstPerson);
        }
        private void OpenSettings()
        {
            settingsDraft = ClientPreferences.Parse(preferences.Export()); Navigate(FrontScreen.Settings);
        }
        private void DrawSettings()
        {
            GUILayout.Label("Настройки", heading);
            GUILayout.Label("Параметры сохраняются на этом устройстве отдельно от персонажей.", muted);
            GUILayout.Space(14); GUILayout.Label("Качество графики");
            int quality = Mathf.Max(0, Array.IndexOf(QualitySettings.names, settingsDraft.quality));
            quality = GUILayout.SelectionGrid(quality, QualitySettings.names, Mathf.Min(3, QualitySettings.names.Length), GUILayout.MinHeight(60));
            settingsDraft.quality = QualitySettings.names[quality];
            GUILayout.Space(12); GUILayout.Label("Лимит кадров в секунду");
            int[] limits = { 30, 60, 120, -1 }; int fps = Mathf.Max(0, Array.IndexOf(limits, settingsDraft.fps));
            settingsDraft.fps = limits[GUILayout.SelectionGrid(fps, new[] { "30", "60", "120", "Без лимита" }, 4, GUILayout.Height(36))];
            settingsDraft.vSync = GUILayout.Toggle(settingsDraft.vSync, "Вертикальная синхронизация (Windows)", GUILayout.MinHeight(30));
            GUILayout.Label("При включённой синхронизации Windows использует частоту экрана вместо лимита FPS.", muted);
            GUILayout.Space(14); GUILayout.Label("Чувствительность мыши и касания: " + settingsDraft.sensitivity.ToString("0.00") + "×");
            settingsDraft.sensitivity = GUILayout.HorizontalSlider(settingsDraft.sensitivity, .25f, 3);
            settingsDraft.invertY = GUILayout.Toggle(settingsDraft.invertY, "Инвертировать вертикальное движение камеры", GUILayout.MinHeight(32));
            GUILayout.Label("Поле зрения: " + Mathf.RoundToInt(settingsDraft.fieldOfView) + "°");
            settingsDraft.fieldOfView = GUILayout.HorizontalSlider(settingsDraft.fieldOfView, 50, 100);
            settingsDraft.firstPerson = GUILayout.Toggle(settingsDraft.firstPerson, "Камера от первого лица при запуске", GUILayout.MinHeight(32));
            GUILayout.Space(20);
            if (GUILayout.Button("Применить и сохранить", GUILayout.Height(44))) Attempt(() =>
            {
                settingsDraft.Save(SettingsPath); preferences = ClientPreferences.Parse(settingsDraft.Export()); ApplyPreferences(); status = "Настройки применены и сохранены";
            });
            if (GUILayout.Button("Стандартные значения", GUILayout.Height(38))) settingsDraft = new ClientPreferences { quality = platformQuality };
            if (GUILayout.Button("Назад в главное меню", GUILayout.Height(38))) Navigate(FrontScreen.Home);
            DrawUpdates();
        }
    }
}
