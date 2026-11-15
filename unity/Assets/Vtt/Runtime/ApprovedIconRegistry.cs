using System;
using System.Collections.Generic;
using UnityEngine;

namespace DndVtt
{
    /// <summary>
    /// Loads the approved icon artwork by stable numeric ID. Missing sprites never
    /// silently fall back to a Unicode glyph (which can render as a square).
    /// Import icon_001.png ... icon_160.png as Sprite (2D and UI) under
    /// Assets/Resources/VttIcons/ before using this registry in production.
    /// </summary>
    internal static class ApprovedIconRegistry
    {
        private static readonly Dictionary<int, Sprite> Sprites = new Dictionary<int, Sprite>();
        private static readonly HashSet<int> Missing = new HashSet<int>();

        public static Sprite GetSprite(int id)
        {
            if (id < 1 || id > 160) return null;
            if (Sprites.TryGetValue(id, out var sprite)) return sprite;
            if (Missing.Contains(id)) return null;

            // Unity Resources.Load<Sprite> requires Sprite (2D and UI) import settings.
            var sprite = Resources.Load<Sprite>("VttIcons/icon_" + id.ToString("D3"));
            if (sprite == null || sprite.texture == null)
            {
                Missing.Add(id);
                return null;
            }
            Sprites[id] = sprite;
            return sprite;
        }

        public static bool DrawButton(Rect bounds, int id, GUIStyle style, string tooltip = "")
        {
            var icon = GetSprite(id);
            if (icon == null)
                return GUI.Button(bounds, new GUIContent(string.Empty, tooltip), style);
            // Draw the actual sprite rectangle, not the entire underlying texture atlas.\n            bool clicked = GUI.Button(bounds, new GUIContent(string.Empty, tooltip), style);\n            var tex = icon.texture;\n            var rect = icon.textureRect;\n            float side = Mathf.Min(bounds.width, bounds.height) * 0.67f;\n            var destination = new Rect(bounds.center.x - side / 2f, bounds.center.y - side / 2f, side, side);\n            GUI.DrawTextureWithTexCoords(destination, tex, new Rect(rect.x / tex.width, rect.y / tex.height, rect.width / tex.width, rect.height / tex.height), true);\n            return clicked;
        }

        public static void ClearCache()
        {
            Sprites.Clear();
            Missing.Clear();
        }
    }
}
