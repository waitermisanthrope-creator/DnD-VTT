using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        // Cached semantic roles for gradual adoption; never change legacy wallet layout.
        // Backgrounds are owned by brandStyleTextures, including future shared nine-slice art.
        private sealed class UiStyleRoles
        {
            public GUIStyle Panel, SecondaryPanel, Card, ActiveTab, InactiveTab;
            public GUIStyle PrimaryButton, SecondaryButton, Input, Heading, Caption, Indicator;
            public GUIStyle HeroPanel, HeroMetric, HeroName, HeroSubtitle, HeroSection, HeroValue, HeroSmall;
        }
        private UiStyleRoles uiStyles;
        private static Color ThemeColor(string hex)
        {
            ColorUtility.TryParseHtmlString(hex, out var color);
            return color;
        }
    }
}
