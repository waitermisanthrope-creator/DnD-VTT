using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Preserve the entire legacy document. Typed values are read-only projections,
    // never a reduced replacement for character resources/effect/inventory state.
    public static class LegacyJson
    {
        public static JToken Parse(string json, int limit = 4 * 1024 * 1024)
        {
            if (string.IsNullOrWhiteSpace(json) || System.Text.Encoding.UTF8.GetByteCount(json) > limit) throw new FormatException("Empty or oversized JSON");
            using var reader = new JsonTextReader(new StringReader(json)) { DateParseHandling = DateParseHandling.None, MaxDepth = 128 };
            var value = JToken.ReadFrom(reader, new JsonLoadSettings { DuplicatePropertyNameHandling = DuplicatePropertyNameHandling.Error });
            if (reader.Read()) throw new FormatException("Trailing JSON content");
            return value;
        }
        public static float Number(JToken token, float fallback = 0)
        {
            if (token == null || token.Type == JTokenType.Null) return fallback;
            string raw = token is JValue value ? Convert.ToString(value.Value, CultureInfo.InvariantCulture) : throw new FormatException("Expected a numeric scalar");
            if (!float.TryParse(raw, NumberStyles.Float, CultureInfo.InvariantCulture, out float number) || float.IsNaN(number) || float.IsInfinity(number)) throw new FormatException("Invalid numeric value: " + raw);
            return number;
        }
    }

    public sealed class LegacyCharacterArchive
    {
        public string OriginalJson { get; private set; }
        private readonly JToken document;
        private readonly List<JObject> characters;
        public int Count => characters.Count;
        public LegacyCharacterArchive(string json)
        {
            document = LegacyJson.Parse(json, 1024 * 1024); OriginalJson = json;
            var array = document as JArray ?? (document as JObject)?["characters"] as JArray;
            characters = array != null ? array.Select(t => t as JObject ?? throw new FormatException("Character must be an object")).ToList()
                : document is JObject single && single["id"] != null ? new List<JObject> { single } : throw new FormatException("Expected a character, character array or characters wrapper");
            if (characters.Count > 1000) throw new FormatException("Invalid character count");
            var ids = new HashSet<string>();
            foreach (var character in characters)
            {
                if (string.IsNullOrWhiteSpace((string)character["id"]) || !ids.Add(character["id"].ToString())) throw new FormatException("Missing or duplicate character id");
                float version = LegacyJson.Number(character["schemaVersion"], 1);
                if (version < 1 || version > 3 || version != Math.Floor(version)) throw new FormatException("Unsupported character schema version");
                Health(character, false); Health(character, true); TempHealth(character);
                CharacterSheetRules.Validate(character);
            }
        }
        public JObject Snapshot(int index) => (JObject)characters[index].DeepClone();
        public string Export() => document.ToString(Formatting.Indented);
        public LegacyCharacterArchive DetachedCopy() => new LegacyCharacterArchive(Export()) { OriginalJson = OriginalJson };
        public LegacyCharacterArchive Append(JObject character)
        {
            var copy = document.DeepClone();
            if (copy is JArray list) list.Add(character.DeepClone());
            else if (copy["characters"] is JArray wrapped) wrapped.Add(character.DeepClone());
            else copy = new JArray(copy, character.DeepClone());
            return new LegacyCharacterArchive(copy.ToString(Formatting.None)) { OriginalJson = OriginalJson };
        }
        public LegacyCharacterArchive WithoutCharacter(string id)
        {
            int index = characters.FindIndex(c => c["id"].ToString() == id);
            if (index < 0) throw new InvalidOperationException("Персонаж больше не найден. Повторите удаление.");
            var copy = document.DeepClone();
            if (copy is JArray list) list.RemoveAt(index);
            else if (copy["characters"] is JArray wrapped) wrapped.RemoveAt(index);
            else copy = new JArray();
            return new LegacyCharacterArchive(copy.ToString(Formatting.None)) { OriginalJson = OriginalJson };
        }
        // Validate a detached candidate before touching the live archive. Wrapper,
        // identity and fields unknown to this client retain their original types.
        public void Replace(int index, JObject candidate)
        {
            if (!JToken.DeepEquals(candidate["id"], characters[index]["id"])) throw new FormatException("Character identity cannot change");
            var checkedCharacter = new LegacyCharacterArchive(candidate.ToString(Formatting.None)).Snapshot(0);
            var old = characters[index];
            if (ReferenceEquals(document, old))
            {
                old.RemoveAll(); foreach (var property in checkedCharacter.Properties().ToList()) old.Add(property.Name, property.Value.DeepClone());
            }
            else { old.Replace(checkedCharacter); characters[index] = checkedCharacter; }
        }
        public string Name(int index) => (string)characters[index]["name"] ?? "Без имени";
        public float CurrentHp(int index) => Health(characters[index], false);
        public float MaximumHp(int index) => Health(characters[index], true);
        public float TemporaryHp(int index) => TempHealth(characters[index]);
        private static float TempHealth(JObject character) => LegacyJson.Number(character["hpTemp"] ?? character["tempHp"] ?? (character["hp"] as JObject)?["temp"] ?? (character["hitPoints"] as JObject)?["temp"], 0);
        private static float Health(JObject c, bool maximum)
        {
            var hpObject = c["hp"] as JObject ?? c["hitPoints"] as JObject;
            JToken hp = maximum ? c["hpMax"] ?? c["maxHp"] ?? hpObject?["max"]
                : c["hpCurrent"] ?? c["currentHP"] ?? hpObject?["current"] ?? (c["hp"]?.Type != JTokenType.Object ? c["hp"] : null) ?? (c["hitPoints"]?.Type != JTokenType.Object ? c["hitPoints"] : null);
            return LegacyJson.Number(hp, 0);
        }
    }

    public sealed class LegacyMapDocument
    {
        public string OriginalJson { get; }
        public JObject Snapshot => (JObject)root.DeepClone();
        private readonly JObject root;
        public string Name => (string)root["name"] ?? "Карта";
        public JArray Floors => (JArray)root["floors"].DeepClone();
        public int FloorCount => ((JArray)root["floors"]).Count;
        public LegacyMapDocument(string json)
        {
            root = LegacyJson.Parse(json) as JObject ?? throw new FormatException("Map must be an object"); OriginalJson = json;
            if (LegacyJson.Number(root["version"], 0) != 2 || LegacyJson.Number(root["schemaVersion"], 1) != 1) throw new FormatException("Unsupported map version");
            foreach (string key in new[] { "width", "height" })
            {
                float n = LegacyJson.Number(root[key]); if (n < 1 || n > 200 || n != Math.Floor(n)) throw new FormatException("Invalid map dimensions");
            }
            if (!(root["floors"] is JArray floors) || floors.Count < 1 || floors.Count > 64) throw new FormatException("Invalid floors");
            var ids = new HashSet<int>(); int tileCount = 0, objectCount = 0;
            foreach (JObject floor in floors)
            {
                float id = LegacyJson.Number(floor["id"]); if (id != Math.Floor(id) || !ids.Add((int)id)) throw new FormatException("Invalid/duplicate floor id");
                if (LegacyJson.Number(floor["height"], 3) < 1 || LegacyJson.Number(floor["height"], 3) > 100) throw new FormatException("Invalid floor height");
                if (!(floor["tiles"] is JObject tiles) || !(floor["walls"] is JObject walls) || !(floor["objects"] is JArray objects)) throw new FormatException("Invalid floor content");
                tileCount += tiles.Count; objectCount += objects.Count;
                foreach (var key in tiles.Properties().Select(p => p.Name).Concat(walls.Properties().Select(p => p.Name))) Cell(key);
                foreach (JObject obj in objects) foreach (string field in new[] { "x", "y", "z", "w", "d", "h", "rotation" }) if (obj[field] != null && Math.Abs(LegacyJson.Number(obj[field])) > 100000) throw new FormatException("Object coordinate exceeds limit");
            }
            if (tileCount > 100000 || objectCount > 10000) throw new FormatException("Map exceeds prototype capacity");
        }
        public float BaseHeight(int index)
        {
            if (index < 0 || index >= FloorCount) throw new ArgumentOutOfRangeException(nameof(index));
            float height = 0; for (int i = 0; i < index; i++) height += LegacyJson.Number(root["floors"][i]["height"], 3); return height;
        }
        public static (int x, int y) Cell(string value)
        {
            string[] parts = value.Split(',');
            if (parts.Length != 2 || !int.TryParse(parts[0], NumberStyles.Integer, CultureInfo.InvariantCulture, out int x) || !int.TryParse(parts[1], NumberStyles.Integer, CultureInfo.InvariantCulture, out int y) || Math.Abs((long)x) > 100000 || Math.Abs((long)y) > 100000) throw new FormatException("Invalid cell key");
            return (x, y);
        }
    }
}
