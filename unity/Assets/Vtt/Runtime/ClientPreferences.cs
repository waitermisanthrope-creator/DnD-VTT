using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Device preferences are separate from character archives and cloud contracts.
    public sealed class ClientPreferences
    {
        public float sensitivity = 1, fieldOfView = 60;
        public bool invertY, firstPerson, vSync;
        public int fps = 60;
        public string quality = "";
        private JObject original = new JObject();
        public void Validate()
        {
            if (float.IsNaN(sensitivity) || float.IsInfinity(sensitivity) || sensitivity < .25f || sensitivity > 3 ||
                float.IsNaN(fieldOfView) || float.IsInfinity(fieldOfView) || fieldOfView < 50 || fieldOfView > 100 ||
                !new[] { -1, 30, 60, 120 }.Contains(fps) || quality == null || quality.Length > 100)
                throw new FormatException("Некорректные настройки клиента");
        }
        public string Export()
        {
            Validate(); var json = (JObject)original.DeepClone();
            json["version"] = 1; json["sensitivity"] = sensitivity; json["fieldOfView"] = fieldOfView;
            json["invertY"] = invertY; json["firstPerson"] = firstPerson; json["vSync"] = vSync; json["fps"] = fps; json["quality"] = quality;
            return json.ToString();
        }
        public static ClientPreferences Parse(string json)
        {
            var doc = LegacyJson.Parse(json, 64 * 1024) as JObject ?? throw new FormatException("Ожидались настройки клиента");
            if (doc["version"]?.Type != JTokenType.Integer || (int?)doc["version"] != 1) throw new FormatException("Неизвестная версия настроек клиента");
            var result = new ClientPreferences { original = doc };
            foreach (string key in new[] { "invertY", "firstPerson", "vSync" }) if (doc[key] != null && doc[key].Type != JTokenType.Boolean) throw new FormatException("Некорректный переключатель: " + key);
            result.sensitivity = LegacyJson.Number(doc["sensitivity"], 1); result.fieldOfView = LegacyJson.Number(doc["fieldOfView"], 60);
            result.invertY = (bool?)doc["invertY"] ?? false; result.firstPerson = (bool?)doc["firstPerson"] ?? false; result.vSync = (bool?)doc["vSync"] ?? false;
            float fps = LegacyJson.Number(doc["fps"], 60); if (fps != Math.Floor(fps)) throw new FormatException("Некорректный лимит FPS");
            result.fps = (int)fps; result.quality = (string)doc["quality"] ?? ""; result.Validate(); return result;
        }
        public static ClientPreferences Load(string path) => Parse(File.ReadAllText(path));
        public void Save(string path)
        {
            string json = Export(); string full = Path.GetFullPath(path); Directory.CreateDirectory(Path.GetDirectoryName(full));
            using (var stream = new FileStream(full + ".pending", FileMode.Create, FileAccess.Write, FileShare.None))
            using (var writer = new StreamWriter(stream, new System.Text.UTF8Encoding(false))) { writer.Write(json); writer.Flush(); stream.Flush(true); }
            if (File.Exists(full)) File.Replace(full + ".pending", full, full + ".bak"); else File.Move(full + ".pending", full);
        }
    }
}
