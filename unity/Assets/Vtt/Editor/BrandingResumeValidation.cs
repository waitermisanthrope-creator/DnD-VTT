using System;
using System.Collections.Generic;
using System.Reflection;
using DndVtt.UnityPrototype;
using UnityEngine;

public static class BrandingResumeValidation
{
    public static void Run()
    {
        const BindingFlags flags = BindingFlags.Instance | BindingFlags.NonPublic;
        var type = typeof(LegacySessionPanel);
        var host = new GameObject("Brand resume validation");
        string directory = System.IO.Path.Combine(System.IO.Path.GetTempPath(), "vtt-theme-editor-" + Guid.NewGuid());
        try
        {
            var panel = host.AddComponent<LegacySessionPanel>();
            void EnsureSheet() => type.GetMethod("EnsureSheetSkin", flags).Invoke(panel, null);
            GUISkin Sheet() => (GUISkin)type.GetField("sheetSkin", flags).GetValue(panel);
            var button = new GUIStyle(); var label = new GUIStyle(); var box = new GUIStyle();
            void Ensure() => type.GetMethod("EnsureBrandStyles", flags).Invoke(panel, new object[] { button, label, box });
            List<Texture2D> Textures() => (List<Texture2D>)type.GetField("brandStyleTextures", flags).GetValue(panel);
            GUIStyle Blue() => (GUIStyle)type.GetField("brandBlue", flags).GetValue(panel);
            void Check(bool value, string reason) { if (!value) throw new Exception("VTT_BRANDING_RESUME_FAIL: " + reason); }
            Ensure();
            int count = Textures().Count; Check(count == 18, "owned backgrounds for legacy buttons, accent button and panels");
            Color expectedPixel = Blue().normal.background.GetPixel(24, 24);
            Check(expectedPixel.a > .9f && expectedPixel.b > expectedPixel.r, "initial blue button is opaque and nonblank");
            foreach (var texture in Textures())
            {
                Check(texture.isReadable, "CPU pixels retained for graphics-context restoration");
                Check((texture.hideFlags & HideFlags.DontUnloadUnusedAsset) != 0, "unused-asset unloading protection");
            }
            var wallpaper = type.GetField("brandWallpaper", flags).GetValue(panel);
            for (int i = 0; i < 5; i++)
            {
                var previous = Blue().normal.background;
                Ensure(); Check(ReferenceEquals(previous, Blue().normal.background), "stable style cache without lifecycle event");
                type.GetMethod("OnApplicationPause", flags).Invoke(panel, new object[] { false });
                type.GetMethod("OnApplicationFocus", flags).Invoke(panel, new object[] { true });
                Ensure();
                Check(previous && ReferenceEquals(previous, Blue().normal.background), "pause/focus preserves backgrounds used by dependent cached styles");
                Check(Textures().Count == count, "owned texture count does not grow after repeated resumes");
                Color pixel = Blue().normal.background.GetPixel(24, 24);
                Check(Mathf.Abs(pixel.r - expectedPixel.r) < .005f && Mathf.Abs(pixel.g - expectedPixel.g) < .005f &&
                    Mathf.Abs(pixel.b - expectedPixel.b) < .005f && Mathf.Abs(pixel.a - expectedPixel.a) < .005f,
                    "button pixels match original palette after resume");
                Check(ReferenceEquals(wallpaper, type.GetField("brandWallpaper", flags).GetValue(panel)), "loaded artwork retained across style reset");
            }
            foreach (string accent in new[] { "#000000", "#FFFFFF", "#287A60", "#882D46" })
            {
                type.GetField("preferences", flags).SetValue(panel, new ClientPreferences { accentHex = accent });
                var previous = Blue().normal.background;
                Ensure();
                Check(!ReferenceEquals(previous, Blue().normal.background), "accent change rebuilds once");
                Check(Textures().Count == count, "accent changes retain bounded texture ownership");
                var primary = (GUIStyle)type.GetField("brandPrimary", flags).GetValue(panel);
                var primaryTexture = primary.normal.background;
                Color color = primaryTexture.GetPixel(24, 24);
                Check(ColorUtility.ToHtmlStringRGB(color) == accent.Substring(1), "primary uses custom RGB");
                Check(UiTheme.Contrast(accent, "#" + ColorUtility.ToHtmlStringRGB(primary.normal.textColor)) >= 4.5, "primary text readable");
                Check(Blue().fontSize == 17 && Blue().padding.left == 7 && Blue().border.left == 16, "legacy button dimensions retained");
                Check(Blue().normal.background.GetPixel(24,24) == expectedPixel, "legacy blue buttons retain wallet styling");
                Ensure();
                Check(ReferenceEquals(primaryTexture, ((GUIStyle)type.GetField("brandPrimary", flags).GetValue(panel)).normal.background), "accent styles cached");
            }
            EnsureSheet();
            int sheetCount = Textures().Count;
            Check(sheetCount == count + 2, "sheet owns input and panel backgrounds; tabs keep existing layout");
            for (int i = 0; i < 6; i++)
            {
                var oldSkin = Sheet(); var inputColor = oldSkin.textField.normal.background.GetPixel(24,24);
                EnsureSheet(); Check(ReferenceEquals(oldSkin, Sheet()), "skin cached on ordinary repaint");
                type.GetField("preferences", flags).SetValue(panel, new ClientPreferences { accentHex = UiTheme.PresetHex(i) });
                Ensure(); Check(!oldSkin, "previous generated skin disposed");
                EnsureSheet();
                Check(Textures().Count == sheetCount, "sheet theme changes retain bounded ownership");
                Check(Sheet().textField.normal.background.GetPixel(24,24) == inputColor, "wallet input background unchanged");
                Check(Sheet().button.fontSize == 13 && Sheet().button.padding.left == 12 && Sheet().button.padding.top == 8 && Sheet().button.margin.bottom == 3, "wallet button metrics unchanged");
                Check(Sheet().textField.fontSize == 13 && Sheet().textField.padding.left == 10 && Sheet().box.padding.left == 15, "wallet field and panel metrics unchanged");
                Check((GUISkin)type.GetField("brandTemplateSkin", flags).GetValue(panel) && !ReferenceEquals(type.GetField("brandTemplateSkin", flags).GetValue(panel), Sheet()), "source skin remains alive and independent");
            }
            // Exercise the actual accent-only save transaction without a running world.
            var saved = new ClientPreferences { fps = 30, theme = "purple", frameStyle = "vine" };
            var draft = ClientPreferences.Parse(saved.Export()); draft.fps = 120;
            type.GetField("preferences", flags).SetValue(panel, saved);
            type.GetField("settingsDraft", flags).SetValue(panel, draft);
            type.GetField("profileStoreOverride", flags).SetValue(panel, System.IO.Path.Combine(directory, "profile.json"));
            type.GetField("pendingAccentHex", flags).SetValue(panel, "#287A60");
            type.GetMethod("SavePendingAccent", flags).Invoke(panel, null);
            var loaded = ClientPreferences.Load(System.IO.Path.Combine(directory, "profile.json.settings.json"));
            Check(loaded.accentHex == "#287A60" && loaded.fps == 30 && loaded.frameStyle == "vine", "actual accent-only save preserves applied preferences");
            Check(draft.fps == 120 && draft.accentHex == loaded.accentHex && saved.accentHex == "", "draft preserved and old live object untouched");
            string blocker = System.IO.Path.Combine(directory, "blocker"); System.IO.File.WriteAllText(blocker, "blocked");
            type.GetField("profileStoreOverride", flags).SetValue(panel, System.IO.Path.Combine(blocker, "profile.json"));
            var applied = type.GetField("preferences", flags).GetValue(panel);
            type.GetField("pendingAccentHex", flags).SetValue(panel, "#FFFFFF");
            type.GetMethod("SavePendingAccent", flags).Invoke(panel, null);
            Check(ReferenceEquals(applied, type.GetField("preferences", flags).GetValue(panel)), "failed accent save preserves live appearance");
            Check(draft.accentHex == "#287A60" && ((string)type.GetField("brandNotice", flags).GetValue(panel)).StartsWith("Цвет не сохранён:"), "save failure visible without corrupting draft");
            type.GetMethod("ReleaseBrandStyles", flags).Invoke(panel, null);
            Check(Textures().Count == 0, "owned textures released on teardown");
            Debug.Log("VTT_BRANDING_RESUME_PASS: readable/unload-protected backgrounds; pause/focus preserves shared backgrounds; five lifecycle callbacks with stable ownership and original artwork (not physical Android)");
        }
        finally {
            UnityEngine.Object.DestroyImmediate(host);
            if (System.IO.Directory.Exists(directory)) System.IO.Directory.Delete(directory, true);
        }
    }
}
