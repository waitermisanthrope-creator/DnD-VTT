using System;
using System.IO;
using System.Linq;
using System.Globalization;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Base sheet formulas from app/app.js, skills.js and spells.js. These are
    // intentionally separate from class-specific combat/equipment execution.
    public static partial class CharacterSheetRules
    {
        public static readonly string[] Stats = { "str", "dex", "con", "int", "wis", "cha" };
        public static readonly string[] StatNames = { "Сила", "Ловкость", "Телосложение", "Интеллект", "Мудрость", "Харизма" };
        public static readonly string[] SkillIds = { "acrobatics", "animalHandling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleightOfHand", "stealth", "survival" };
        public static readonly string[] SkillStats = { "dex", "wis", "int", "str", "cha", "int", "wis", "cha", "int", "wis", "int", "wis", "cha", "cha", "int", "dex", "dex", "wis" };
        public static readonly string[] SkillNames = { "Акробатика", "Уход за животными", "Магия", "Атлетика", "Обман", "История", "Проницательность", "Запугивание", "Анализ", "Медицина", "Природа", "Внимательность", "Выступление", "Убеждение", "Религия", "Ловкость рук", "Скрытность", "Выживание" };
        public static readonly string[] InventoryCategories = { "weapons", "armor", "consumables", "materials", "junk" };
        public static readonly string[] CoinKeys = { "cp", "sp", "ep", "gp", "pp" };
        private static double CoinNumber(JToken token)
        {
            if (token == null || token.Type == JTokenType.Null) return 0;
            if (!(token is JValue value) || !double.TryParse(Convert.ToString(value.Value, CultureInfo.InvariantCulture), NumberStyles.Float, CultureInfo.InvariantCulture, out double number) || double.IsNaN(number) || double.IsInfinity(number) || number < 0 || number > 9007199254740991d)
                throw new FormatException("Некорректное количество монет");
            return number;
        }
        private static JValue CoinToken(double value) => value == Math.Truncate(value) ? new JValue((long)value) : new JValue(value);
        public static double[] CoinMultipliers(JObject rates)
        {
            string[] keys = { "pPerG", "gPerE", "sPerG", "cPerS" }; double[] defaults = { 10, 2, 10, 10 }, values = new double[4];
            for (int i = 0; i < 4; i++) { values[i] = rates?[keys[i]] == null ? defaults[i] : CoinNumber(rates[keys[i]]); if (values[i] < 1 || values[i] > 10000 || values[i] != Math.Floor(values[i])) throw new FormatException("Курс должен быть целым от 1 до 10000"); }
            double gold = values[2] * values[3], electrum = Math.Floor(gold / values[1] + .5);
            if (electrum < 1) throw new FormatException("По этому курсу электрум стоит меньше одной медной монеты");
            return new[] { 1d, values[3], electrum, gold, gold * values[0] };
        }
        public static double CoinTotal(JObject coins, JObject rates)
        {
            var multipliers = CoinMultipliers(rates); double total = 0;
            for (int i = 0; i < CoinKeys.Length; i++) total += CoinNumber(coins?[CoinKeys[i]]) * multipliers[i];
            if (total > 9007199254740991d) throw new FormatException("Сумма монет слишком велика для точного расчёта");
            return total;
        }
        // app/inventory-coins.js applyCoinOperation: total value, greedy change,
        // optional PP/EP, existing coinLog schema (newest first, at most 25).
        public static void ApplyCoinOperation(JObject hero, JObject amount, string action, JObject rates, bool showPp, bool showEp, string time)
        {
            if (action != "add" && action != "sub") throw new FormatException("Неизвестная операция кошелька");
            if (hero["coins"] != null && hero["coins"].Type != JTokenType.Null && !(hero["coins"] is JObject)) throw new FormatException("Неподдерживаемый формат кошелька");
            if (hero["coinLog"] != null && hero["coinLog"].Type != JTokenType.Null && !(hero["coinLog"] is JArray)) throw new FormatException("Неподдерживаемый формат истории кошелька");
            var input = new JObject();
            foreach (string key in CoinKeys)
            {
                double value = (key == "pp" && !showPp) || (key == "ep" && !showEp) ? 0 : CoinNumber(amount?[key]);
                if (value != Math.Floor(value)) throw new FormatException("Введите целое количество монет"); input[key] = CoinToken(value);
            }
            double delta = CoinTotal(input, rates); if (delta <= 0) throw new FormatException("Введите сумму больше нуля");
            double balance = CoinTotal(hero["coins"] as JObject, rates) + (action == "add" ? delta : -delta);
            if (balance < 0) throw new FormatException("Недостаточно средств для списания");
            if (balance > 9007199254740991d) throw new FormatException("Сумма монет слишком велика для точного расчёта");
            var multipliers = CoinMultipliers(rates); var coins = hero["coins"] is JObject old ? (JObject)old.DeepClone() : new JObject();
            double remainder = balance;
            for (int i = 4; i >= 0; i--)
            {
                bool enabled = !(i == 4 && !showPp) && !(i == 2 && !showEp);
                double value = !enabled ? 0 : i == 0 ? remainder : Math.Floor(remainder / multipliers[i]);
                coins[CoinKeys[i]] = CoinToken(value); if (enabled && i > 0) remainder %= multipliers[i];
            }
            var entry = new JObject { ["time"] = time, ["action"] = action };
            foreach (string key in CoinKeys) { entry[key] = input[key].DeepClone(); entry["result" + char.ToUpperInvariant(key[0]) + key.Substring(1)] = coins[key].DeepClone(); }
            var log = hero["coinLog"] is JArray prior ? (JArray)prior.DeepClone() : new JArray(); log.Insert(0, entry); while (log.Count > 25) log.RemoveAt(log.Count - 1);
            hero["coins"] = coins; hero["coinLog"] = log;
        }
        public static int Modifier(JObject hero, string stat)
        {
            int score = (int)LegacyJson.Number((hero["stats"] as JObject)?[stat], 10);
            if (score == 0) score = 10; // app.js parseInt(value) || 10
            return (int)Math.Floor((score - 10) / 2d);
        }
        public static int Level(JObject hero)
        {
            float n = hero["classes"] is JArray classes && classes.Count > 0
                ? classes.Sum(c => LegacyJson.Number((c as JObject)?["level"], 0)) : LegacyJson.Number(hero["level"], 1);
            return Math.Max(1, (int)n);
        }
        public static void SynchronizeClassLevel(JObject hero)
        {
            Validate(hero);
            if(hero["classes"] is JArray classes && classes.Count>0)hero["level"]=Level(hero);
            Validate(hero);Recalculate(hero);
        }
        public static int Proficiency(JObject hero) => (int)Math.Floor((Level(hero) - 1) / 4d) + 2;
        public static int Skill(JObject hero, int index) => Modifier(hero, SkillStats[index]) + Proficiency(hero) * (int)LegacyJson.Number((hero["skillsData"] as JObject)?[SkillIds[index]], 0);
        public static void Validate(JObject hero)
        {
            foreach (string key in new[] { "stats", "skillsData", "savesData", "spellSlotsData" })
                if (hero[key] != null && hero[key].Type != JTokenType.Null && !(hero[key] is JObject)) throw new FormatException(key + " must be an object");
            var stats = hero["stats"] as JObject; var skills = hero["skillsData"] as JObject;
            foreach (string stat in Stats) if (stats?[stat] != null) LegacyJson.Number(stats[stat]);
            foreach (string skill in SkillIds)
            {
                float n = LegacyJson.Number(skills?[skill]);
                if (n < 0 || n > 2 || n != Math.Floor(n)) throw new FormatException("Invalid skill proficiency " + skill);
            }
            float level = LegacyJson.Number(hero["level"], 1);
            if (level < 1 || level > 100 || level != Math.Floor(level)) throw new FormatException("Invalid character level");
            if (hero["classes"] is JArray classes)
                foreach (var c in classes.OfType<JObject>())
                { float n = LegacyJson.Number(c["level"], 0); if (n < 0 || n > 100 || n != Math.Floor(n)) throw new FormatException("Invalid class level"); }
        }
        public static JObject Object(JObject parent, string key)
        {
            if (parent[key] == null || parent[key].Type == JTokenType.Null) parent[key] = new JObject();
            return parent[key] as JObject ?? throw new FormatException(key + " must be an object");
        }
        public static JArray Array(JObject parent, string key)
        {
            if (parent[key] == null || parent[key].Type == JTokenType.Null) parent[key] = new JArray();
            return parent[key] as JArray ?? throw new FormatException(key + " must be an array");
        }
        public static void Recalculate(JObject hero)
        {
            // Builder serializes this compatibility alias as a separate object.
            // Update only recognized Builder profiles; preserve unrelated legacy data.
            if (hero["_builderBaseStats"] is JObject && hero["stats"] is JObject stats && hero["abilities"] is JObject alias && Stats.All(s => alias[s] != null && stats[s] != null))
                foreach (string stat in Stats) alias[stat] = stats[stat].DeepClone();
            hero["profBonus"] = Proficiency(hero);
            var skills = Object(hero, "skills"); var values = Object(hero, "skillValues");
            for (int i = 0; i < SkillIds.Length; i++)
            {
                int mult = (int)LegacyJson.Number((hero["skillsData"] as JObject)?[SkillIds[i]], 0);
                skills[SkillIds[i]] = mult == 2 ? "expert" : mult == 1 ? "proficient" : "none";
                values[SkillIds[i]] = Skill(hero, i);
            }
        }
        public static void AddInventory(JObject hero, string category, string name, double count, JObject extra)
        {
            if (!InventoryCategories.Contains(category) || string.IsNullOrWhiteSpace(name) || double.IsNaN(count) || double.IsInfinity(count) || count <= 0) throw new FormatException("Invalid inventory addition");
            var inventory = hero["inventory"] as JObject;
            if (hero["inventory"] != null && hero["inventory"].Type != JTokenType.Null && inventory == null) throw new FormatException("Legacy inventory needs explicit conversion");
            if (inventory?[category] != null && !(inventory[category] is JArray)) throw new FormatException("Invalid inventory category");
            if (inventory == null)
            {
                inventory = new JObject(); foreach (string key in InventoryCategories) inventory[key] = new JArray(); hero["inventory"] = inventory;
            }
            var list = Array(inventory, category);
            var existing = list.OfType<JObject>().FirstOrDefault(x => (string)x["name"] == name);
            if (existing != null)
            {
                double before = LegacyJson.Number(existing["count"], 1); if (before == 0) before = 1;
                existing["count"] = Quantity(before + count); return;
            }
            var item = new JObject { ["name"] = name, ["count"] = Quantity(count), ["equipped"] = false };
            if (extra != null) foreach (var property in extra.Properties()) item[property.Name] = property.Value.DeepClone();
            list.Add(item);
        }
        private static JValue Quantity(double n) => n == Math.Truncate(n) && n > long.MinValue && n < long.MaxValue ? new JValue((long)n) : new JValue(n);
        // Guard confirmation against selection/reordering/editing between request
        // and acceptance. This is an archive edit, not a combat/class command.
        public static void RemoveRecord(JObject hero, string path, string expectedJson)
        {
            var record = hero.SelectToken(path, false);
            if (!(record?.Parent is JArray list) || record.ToString(Formatting.None) != expectedJson) throw new InvalidOperationException("Запись изменилась. Повторите удаление.");
            bool activeFolder = ReferenceEquals(list, hero["folders"]) && record is JObject folder && JToken.DeepEquals(hero["activeFolderId"], folder["id"]);
            record.Remove();
            if (activeFolder) hero["activeFolderId"] = list.Count > 0 ? list[0]["id"]?.DeepClone() ?? new JValue("") : new JValue("");
        }
        public static double WeightKg(JToken token)
        {
            if (token == null || token.Type == JTokenType.Null) return 0;
            if (token.Type == JTokenType.Integer || token.Type == JTokenType.Float) return token.Value<double>() * .453592;
            var match = Regex.Match(token.ToString().Trim(), @"([\d.,]+)\s*([а-яa-z]*)", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
            if (!match.Success) return 0;
            string raw = match.Groups[1].Value; int comma = raw.IndexOf(','); if (comma >= 0) raw = raw.Substring(0, comma) + "." + raw.Substring(comma + 1);
            var prefix = Regex.Match(raw, @"^(?:\d+\.?\d*|\.\d+)");
            double n = prefix.Success && double.TryParse(prefix.Value, NumberStyles.Float, CultureInfo.InvariantCulture, out double parsed) ? parsed : 0;
            string unit = match.Groups[2].Value.ToLowerInvariant();
            return unit == "" || unit.StartsWith("фунт", StringComparison.Ordinal) || unit.StartsWith("lb", StringComparison.Ordinal) ? n * .453592 : n;
        }
        public static double InventoryWeightKg(JObject hero)
        {
            double total = 0;
            if (!(hero["inventory"] is JObject inventory)) return total;
            foreach (string category in InventoryCategories)
                if (inventory[category] is JArray list)
                    foreach (var item in list.OfType<JObject>())
                    {
                        double weight = WeightKg(item["weight"]); if (weight < 0 || double.IsInfinity(weight) || double.IsNaN(weight)) continue;
                        double count; try { count = LegacyJson.Number(item["count"], 1); } catch (FormatException) { count = 1; }
                        if (count == 0) count = 1; total += weight * Math.Max(0, count);
                    }
            return total;
        }
        public static double CapacityKg(JObject hero)
        {
            int strength = (int)LegacyJson.Number((hero["stats"] as JObject)?["str"], 10); if (strength == 0) strength = 10;
            return strength * 15 * .453592;
        }
    }

    // Experimental local archive only: no writes into browser localStorage or
    // Supabase journals. Replace atomically; retain the preceding valid archive.
    public static class CharacterSheetStore
    {
        public static void Save(string path, LegacyCharacterArchive archive)
        {
            string json = archive.Export(); _ = new LegacyCharacterArchive(json);
            if (File.Exists(path) && File.ReadAllText(path) == json) return;
            Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(path)));
            string temp = path + ".pending";
            using (var stream = new FileStream(temp, FileMode.Create, FileAccess.Write, FileShare.None))
            using (var writer = new StreamWriter(stream, new System.Text.UTF8Encoding(false)))
            { writer.Write(json); writer.Flush(); stream.Flush(true); }
            if (File.Exists(path)) File.Replace(temp, path, path + ".bak"); else File.Move(temp, path);
        }
        public static string Backup(string path, LegacyCharacterArchive archive)
        {
            string target = Path.Combine(Path.GetDirectoryName(Path.GetFullPath(path)), "character-backups", "characters-" + DateTime.UtcNow.ToString("yyyyMMdd-HHmmss") + "-" + Guid.NewGuid().ToString("N") + ".json");
            Save(target, archive);
            return target;
        }
        public static LegacyCharacterArchive RestorePrevious(string path)
        {
            var candidate = Load(path + ".bak");
            Save(path, candidate);
            return candidate;
        }
        public static LegacyCharacterArchive Load(string path) => new LegacyCharacterArchive(File.ReadAllText(path));
    }
}
