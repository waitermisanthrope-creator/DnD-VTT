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
        private static readonly Dictionary<int, Texture2D> Textures = new Dictionary<int, Texture2D>();
        private static readonly HashSet<int> Missing = new HashSet<int>();

        public static Texture2D GetTexture(int id)
        {
            if (id < 1 || id > 160) return null;
            if (Textures.TryGetValue(id, out var texture)) return texture;
            if (Missing.Contains(id)) return null;

            // Unity Resources.Load<Sprite> requires Sprite (2D and UI) import settings.
            var sprite = Resources.Load<Sprite>("VttIcons/icon_" + id.ToString("D3"));
            if (sprite == null || sprite.texture == null)
            {
                Missing.Add(id);
                return null;
            }
            Textures[id] = sprite.texture;
            return sprite.texture;
        }

        public static bool DrawButton(Rect bounds, int id, GUIStyle style, string tooltip = "")
        {
            var icon = GetTexture(id);
            if (icon == null)
                return GUI.Button(bounds, new GUIContent(string.Empty, tooltip), style);
            return GUI.Button(bounds, new GUIContent(icon, tooltip), style);
        }

        public static void ClearCache()
        {
            Textures.Clear();
            Missing.Clear();
        }
    }
}
