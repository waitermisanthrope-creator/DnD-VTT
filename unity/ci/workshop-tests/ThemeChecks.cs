using System;
using System.IO;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;

static class ThemeChecks
{
    public static int Run()
    {
        int count = 0;
        void Check(bool ok, string message) { if (!ok) throw new Exception(message); count++; }
        foreach (string theme in new[] { "orange", "purple", "blue", "red", "midnight", "forest", "ember" })
        {
            var old = ClientPreferences.Parse(new JObject { ["version"] = 1, ["theme"] = theme, ["future"] = new JObject { ["keep"] = 42 } }.ToString());
            Check(old.accentHex == "" && old.theme == theme, "legacy theme unchanged");
            Check((int)JObject.Parse(old.Export())["future"]["keep"] == 42, "unknown fields preserved");
            Check(UiTheme.ResolveAccent(old) == UiTheme.LegacyAccent(theme), "old palette retained");
        }
        Check(UiTheme.PresetCount == 6, "six presets");
        for (int i = 0; i < UiTheme.PresetCount; i++)
        {
            Check(UiTheme.TryNormalizeHex(UiTheme.PresetHex(i), out var normalized), "valid preset");
            Check(UiTheme.PresetName(i).Length > 0, "named preset");
            var p = new ClientPreferences { accentHex = normalized };
            Check(ClientPreferences.Parse(p.Export()).accentHex == normalized, "preset roundtrip");
            Check(UiTheme.Contrast(normalized, UiTheme.TextOn(normalized)) >= 4.5, "preset primary contrast");
            Check(UiTheme.Contrast(UiTheme.ReadableAccent(normalized), UiTheme.ContrastSurfaceHex) >= 4.5, "preset heading contrast");
        }
        foreach (string valid in new[] { "#123aBc", "123ABC", "  #123abc  " })
            Check(UiTheme.TryNormalizeHex(valid, out var hex) && hex == "#123ABC", "canonical HEX");
        foreach (string bad in new[] { null, "", "#123", "#12345678", "purple", "#GG0000", "12 3456", new string('F', 10000) })
            Check(!UiTheme.TryNormalizeHex(bad, out _), "invalid input rejected");
        foreach (JToken bad in new JToken[] { JValue.CreateNull(), new JObject(), new JArray(), new JValue(123), new JValue(true), new JValue("bad") })
        {
            var p = ClientPreferences.Parse(new JObject { ["version"] = 1, ["theme"] = "purple", ["fps"] = 30, ["accentHex"] = bad }.ToString());
            Check(p.accentHex == "" && p.fps == 30 && p.theme == "purple", "malformed optional accent isolated");
        }
        foreach (string color in new[] { "#000000", "#FFFFFF", "#123456", "#FF0000", "#00FF00", "#0000FF" })
        {
            Check(UiTheme.Contrast(color, UiTheme.TextOn(color)) >= 4.5, "primary text contrast");
            Check(UiTheme.Contrast(UiTheme.ReadableAccent(color), UiTheme.ContrastSurfaceHex) >= 4.5, "heading contrast");
            Check(UiTheme.Contrast(UiTheme.TextOn(UiTheme.Hover(color)), UiTheme.Hover(color)) >= 4.5, "hover contrast");
        }
        string path = Path.Combine(Path.GetTempPath(), "vtt-theme-" + Guid.NewGuid(), "settings.json");
        try
        {
            var p = ClientPreferences.Parse("{version:1,theme:'forest',fps:30,frameStyle:'vine',frameColor:'jade',future:42}");
            p.accentHex = "#12ab34"; p.Save(path);
            var loaded = ClientPreferences.Load(path);
            Check(loaded.accentHex == "#12AB34" && loaded.fps == 30 && loaded.frameStyle == "vine" && loaded.frameColor == "jade", "restart preserves accent and device settings");
            Check((int)JObject.Parse(loaded.Export())["future"] == 42, "unknown survives disk");
            loaded.accentHex = ""; loaded.Save(path);
            Check(ClientPreferences.Load(path).accentHex == "" && ClientPreferences.Load(path).theme == "forest", "reset restores legacy theme");
            Check(ClientPreferences.Load(path + ".bak").accentHex == "#12AB34", "atomic backup");
            loaded.accentHex = "broken";
            Check(UiTheme.ResolveAccent(loaded) == UiTheme.LegacyAccent("forest"), "runtime malformed fallback");
        }
        finally { if (Directory.Exists(Path.GetDirectoryName(path))) Directory.Delete(Path.GetDirectoryName(path), true); }
        return count;
    }
}
