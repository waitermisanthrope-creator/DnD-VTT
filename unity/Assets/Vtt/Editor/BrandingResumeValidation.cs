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
        try
        {
            var panel = host.AddComponent<LegacySessionPanel>();
            var button = new GUIStyle(); var label = new GUIStyle(); var box = new GUIStyle();
            void Ensure() => type.GetMethod("EnsureBrandStyles", flags).Invoke(panel, new object[] { button, label, box });
            List<Texture2D> Textures() => (List<Texture2D>)type.GetField("brandStyleTextures", flags).GetValue(panel);
            GUIStyle Blue() => (GUIStyle)type.GetField("brandBlue", flags).GetValue(panel);
            void Check(bool value, string reason) { if (!value) throw new Exception("VTT_BRANDING_RESUME_FAIL: " + reason); }
            Ensure();
            int count = Textures().Count; Check(count == 15, "owned backgrounds for seven buttons and card");
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
                Check(!ReferenceEquals(previous, Blue().normal.background), "pause/focus rebuild backgrounds");
                Check(Textures().Count == count, "owned texture count does not grow after repeated resumes");
                Color pixel = Blue().normal.background.GetPixel(24, 24);
                Check(Mathf.Abs(pixel.r - expectedPixel.r) < .005f && Mathf.Abs(pixel.g - expectedPixel.g) < .005f &&
                    Mathf.Abs(pixel.b - expectedPixel.b) < .005f && Mathf.Abs(pixel.a - expectedPixel.a) < .005f,
                    "button pixels match original palette after resume");
                Check(ReferenceEquals(wallpaper, type.GetField("brandWallpaper", flags).GetValue(panel)), "loaded artwork retained across style reset");
            }
            type.GetMethod("ReleaseBrandStyles", flags).Invoke(panel, null);
            Check(Textures().Count == 0, "owned textures released on teardown");
            Debug.Log("VTT_BRANDING_RESUME_PASS: readable/unload-protected backgrounds; pause/focus rebuild; five resumes with stable ownership and original artwork");
        }
        finally { UnityEngine.Object.DestroyImmediate(host); }
    }
}
