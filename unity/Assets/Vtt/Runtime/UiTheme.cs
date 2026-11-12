using System;
using System.Globalization;

namespace DndVtt.UnityPrototype
{
    // Shared appearance values; no Unity objects or per-frame work here.
    public static class UiTheme
    {
        public const string PanelHex = "#17171C";
        public const string SecondaryPanelHex = "#242428";
        // Worst-case translucent panel over a white wallpaper after the existing home overlay.
        public const string ContrastSurfaceHex = "#28282D";
        public const string CaptionHex = "#BAB8B5";
        public const int BodyFontSize = 20, CaptionFontSize = 17;
        public const int PanelPadding = 12, SliceBorder = 16;
        public const float TouchHeight = 50;
        private static readonly string[] Names = { "Старое золото", "Бордовый", "Изумрудный", "Стальной синий", "Фиолетовый", "Нейтральный светлый" };
        private static readonly string[] Colors = { "#B89B52", "#882D46", "#287A60", "#4D7394", "#8055A6", "#D0CEC5" };
        public static int PresetCount => Colors.Length;
        public static string PresetName(int index) => Names[index];
        public static string PresetHex(int index) => Colors[index];

        // Opaque RGB only: named colors, shorthand and alpha are deliberately rejected.
        public static bool TryNormalizeHex(string value, out string normalized)
        {
            normalized = "";
            if (value == null || value.Length > 32) return false;
            string digits = value.Trim();
            if (digits.StartsWith("#", StringComparison.Ordinal)) digits = digits.Substring(1);
            if (digits.Length != 6) return false;
            for (int i = 0; i < digits.Length; i++)
                if (!((digits[i] >= '0' && digits[i] <= '9') || (digits[i] >= 'a' && digits[i] <= 'f') || (digits[i] >= 'A' && digits[i] <= 'F'))) return false;
            normalized = "#" + digits.ToUpperInvariant();
            return true;
        }
        public static string LegacyAccent(string theme)
        {
            switch (theme)
            {
                case "purple": return "#A32EC7";
                case "blue": return "#2196F2";
                case "red": return "#E63833";
                default: return "#FF990A";
            }
        }
        public static string ResolveAccent(ClientPreferences preferences) =>
            TryNormalizeHex(preferences?.accentHex, out var hex) ? hex : LegacyAccent(preferences?.theme);
        private static int Rgb(string hex) => int.Parse(hex.Substring(1), NumberStyles.HexNumber, CultureInfo.InvariantCulture);
        private static double Linear(int channel)
        {
            double value = channel / 255d;
            return value <= .04045 ? value / 12.92 : Math.Pow((value + .055) / 1.055, 2.4);
        }
        private static double Luminance(string hex)
        {
            int rgb = Rgb(hex);
            return .2126 * Linear((rgb >> 16) & 255) + .7152 * Linear((rgb >> 8) & 255) + .0722 * Linear(rgb & 255);
        }
        public static double Contrast(string first, string second)
        {
            double a = Luminance(first), b = Luminance(second);
            return (Math.Max(a, b) + .05) / (Math.Min(a, b) + .05);
        }
        public static string TextOn(string background) => Contrast(background, "#FFFFFF") >= Contrast(background, "#000000") ? "#FFFFFF" : "#000000";
        private static string Lighten(string hex, int step)
        {
            int rgb = Rgb(hex);
            int Mix(int channel) => channel + (255 - channel) * step / 100;
            return "#" + ((Mix((rgb >> 16) & 255) << 16) | (Mix((rgb >> 8) & 255) << 8) | Mix(rgb & 255)).ToString("X6", CultureInfo.InvariantCulture);
        }
        public static string Hover(string accent) => Lighten(accent, 12);
        public static string ReadableAccent(string accent)
        {
            for (int i = 0; i <= 100; i += 5)
            {
                string candidate = Lighten(accent, i);
                if (Contrast(candidate, ContrastSurfaceHex) >= 4.5) return candidate;
            }
            return "#FFFFFF";
        }
    }
}
