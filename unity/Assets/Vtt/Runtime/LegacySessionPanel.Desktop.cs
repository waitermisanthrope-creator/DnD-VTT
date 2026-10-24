using System;
using UnityEngine;
using UnityEngine.InputSystem;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        Font menuFont;
        Font MenuFont => menuFont ? menuFont : menuFont = Resources.Load<Font>("UI/DejaVuSans")
            ?? throw new InvalidOperationException("Не найден встроенный шрифт интерфейса.");
        void InitializeDesktopWindow()
        {
#if UNITY_STANDALONE_WIN && !UNITY_EDITOR
            // Replace Unity's persisted old fullscreen launch too; no settings
            // navigation is required to recover the window after upgrading.
            SetDesktopWindow(false);
#endif
        }
        void SetDesktopWindow(bool fullscreen)
        {
            var display = Screen.currentResolution;
            int width = fullscreen ? display.width : Mathf.Min(1280, Mathf.Max(800, display.width - 80));
            int height = fullscreen ? display.height : Mathf.Min(800, Mathf.Max(600, display.height - 80));
            Screen.SetResolution(width, height, fullscreen ? FullScreenMode.FullScreenWindow : FullScreenMode.Windowed);
        }
        void UpdateDesktopWindow()
        {
            if (!Application.isMobilePlatform && Keyboard.current?.f11Key.wasPressedThisFrame == true)
                SetDesktopWindow(!Screen.fullScreen);
        }
        void DrawDesktopWindowControls()
        {
            if (Application.isMobilePlatform) return;
            SettingsSection("Режим окна");
            GUILayout.Label("F11 — переключить полноэкранный режим. Размер окна можно менять мышью.", settingsDescription);
            GUILayout.BeginHorizontal();
            if (GUILayout.Button("Оконный режим", brandBlue, GUILayout.MinHeight(48))) SetDesktopWindow(false);
            if (GUILayout.Button("На весь экран", brandBrown, GUILayout.MinHeight(48))) SetDesktopWindow(true);
            GUILayout.EndHorizontal();
        }
    }
}
