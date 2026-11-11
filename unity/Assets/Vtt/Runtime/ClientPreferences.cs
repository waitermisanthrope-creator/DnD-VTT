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
        public string theme = "orange";
        public string frameStyle = "dragon", frameColor = "gold";
        public bool autoCheckUpdates = true;
        public bool keepScreenAwake = true;
        private JObject original = new JObject();
        public JObject MarketState=>original["dnd_market_v55_state"]==null?new JObject():original["dnd_market_v55_state"] is JObject state?(JObject)state.DeepClone():throw new FormatException("Неизвестный формат глобального рынка — данные сохранены");
        public ClientPreferences WithMarketState(JObject state)
        {
            var copy=Parse(Export());_ = copy.MarketState;copy.original["dnd_market_v55_state"]=(state??throw new ArgumentNullException(nameof(state))).DeepClone();
            if(System.Text.Encoding.UTF8.GetByteCount(copy.Export())>64*1024)throw new FormatException("Настройки и состояние рынка слишком велики");
            return copy;
        }
        public JArray CustomRaces
        {
            get
            {
                var token=original["dnd_custom_races"];
                if(token==null||token.Type==JTokenType.Null)return new JArray();
                return token is JArray list?(JArray)list.DeepClone():throw new FormatException("Неизвестный формат каталога своих рас — данные сохранены");
            }
        }
        public void AddCustomRace(JObject race)
        {
            if(race==null||race["bonuses"] is not JObject||race["id"]?.Type!=JTokenType.String||!race["id"].ToString().StartsWith("custom_",StringComparison.Ordinal))throw new FormatException("Некорректная своя раса");
            CharacterSheetRules.SelectRace(new JObject{["id"]="validation"},race);
            var list=CustomRaces;if(list.OfType<JObject>().Any(r=>JToken.DeepEquals(r["id"],race["id"])))throw new FormatException("Такая раса уже существует");
            list.Add(race.DeepClone());var draft=Parse(Export());draft.original["dnd_custom_races"]=list;
            if(System.Text.Encoding.UTF8.GetByteCount(draft.Export())>64*1024)throw new FormatException("Каталог своих рас слишком большой");
            original["dnd_custom_races"]=list;
        }
        public ClientPreferences WithDefaults(string platformQuality)
        {
            var retained=JObject.Parse(Export());
            foreach(var field in JObject.Parse(new ClientPreferences{quality=platformQuality}.Export()).Properties())retained[field.Name]=field.Value.DeepClone();
            return Parse(retained.ToString());
        }
        public void Validate()
        {
            if (float.IsNaN(sensitivity) || float.IsInfinity(sensitivity) || sensitivity < .25f || sensitivity > 3 ||
                float.IsNaN(fieldOfView) || float.IsInfinity(fieldOfView) || fieldOfView < 50 || fieldOfView > 100 ||
                !new[] { -1, 30, 60, 120 }.Contains(fps) || quality == null || quality.Length > 100 ||
                (theme != "midnight" && theme != "forest" && theme != "ember" && theme != "orange" && theme != "purple" && theme != "blue" && theme != "red") ||
                (frameStyle != "dragon" && frameStyle != "vine") ||
                (frameColor != "gold" && frameColor != "crimson" && frameColor != "jade" && frameColor != "azure" && frameColor != "violet"))
                throw new FormatException("Некорректные настройки клиента");
        }
        public string Export()
        {
            Validate(); var json = (JObject)original.DeepClone();
            json["version"] = 1; json["sensitivity"] = sensitivity; json["fieldOfView"] = fieldOfView;
            json["invertY"] = invertY; json["firstPerson"] = firstPerson; json["vSync"] = vSync; json["fps"] = fps; json["quality"] = quality; json["theme"] = theme; json["frameStyle"] = frameStyle; json["frameColor"] = frameColor; json["autoCheckUpdates"] = autoCheckUpdates; json["keepScreenAwake"] = keepScreenAwake;
            return json.ToString();
        }
        public static ClientPreferences Parse(string json)
        {
            var doc = LegacyJson.Parse(json, 64 * 1024) as JObject ?? throw new FormatException("Ожидались настройки клиента");
            if (doc["version"]?.Type != JTokenType.Integer || (int?)doc["version"] != 1) throw new FormatException("Неизвестная версия настроек клиента");
            var result = new ClientPreferences { original = doc };
            foreach (string key in new[] { "invertY", "firstPerson", "vSync", "autoCheckUpdates", "keepScreenAwake" }) if (doc[key] != null && doc[key].Type != JTokenType.Boolean) throw new FormatException("Некорректный переключатель: " + key);
            result.sensitivity = LegacyJson.Number(doc["sensitivity"], 1); result.fieldOfView = LegacyJson.Number(doc["fieldOfView"], 60);
            result.invertY = (bool?)doc["invertY"] ?? false; result.firstPerson = (bool?)doc["firstPerson"] ?? false; result.vSync = (bool?)doc["vSync"] ?? false;
            float fps = LegacyJson.Number(doc["fps"], 60); if (fps != Math.Floor(fps)) throw new FormatException("Некорректный лимит FPS");
            result.fps = (int)fps; result.quality = (string)doc["quality"] ?? "";
            result.theme = (string)doc["theme"] ?? "orange";
            result.frameStyle = (string)doc["frameStyle"] ?? "dragon"; result.frameColor = (string)doc["frameColor"] ?? "gold";
            result.autoCheckUpdates = (bool?)doc["autoCheckUpdates"] ?? true;
            result.keepScreenAwake = (bool?)doc["keepScreenAwake"] ?? true;
            result.Validate(); return result;
        }
        public static ClientPreferences Load(string path) => Parse(File.ReadAllText(path));
        public void Save(string path)
        {
            using var lease=CharacterSheetStore.AcquireWriteLease(path);
            string json = Export(); string full = Path.GetFullPath(path); Directory.CreateDirectory(Path.GetDirectoryName(full));
            using (var stream = new FileStream(full + ".pending", FileMode.Create, FileAccess.Write, FileShare.None))
            using (var writer = new StreamWriter(stream, new System.Text.UTF8Encoding(false))) { writer.Write(json); writer.Flush(); stream.Flush(true); }
            if (File.Exists(full)) File.Replace(full + ".pending", full, full + ".bak"); else File.Move(full + ".pending", full);
        }
    }
}
