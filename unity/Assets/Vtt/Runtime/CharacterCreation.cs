using System;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Data blueprints come from the real main Builder; no JavaScript runs in Unity.
    public static class CharacterCreation
    {
        public static int PointCost(int score) => score >= 8 && score <= 15 ? new[] { 0, 1, 2, 3, 4, 5, 7, 9 }[score - 8] : throw new FormatException("Point buy: характеристики от 8 до 15");
        public static JObject Create(JObject catalog, string name, JObject race, JObject cls, JObject background, JObject stats, JObject answers, string mode)
        {
            if (string.IsNullOrWhiteSpace(name) || name.Trim().Length > 120) throw new FormatException("Введите имя персонажа (до 120 символов)");
            if (race == null || cls == null || background == null) throw new FormatException("Выберите расу, класс и предысторию");
            if (mode != "manual" && mode != "pointbuy") throw new FormatException("Неизвестный способ характеристик");
            if ((bool?)cls["seed"]?["isExtraClass"] == true) throw new FormatException("Экстра-классы пока доступны через импорт сохранений");
            int cost = 0;
            foreach (string stat in CharacterSheetRules.Stats)
            {
                float n = LegacyJson.Number(stats[stat]);
                if (n != Math.Floor(n) || n < 1 || n > 30) throw new FormatException("Характеристики должны быть целыми от 1 до 30");
                if (mode == "pointbuy") cost += PointCost((int)n);
            }
            if (mode == "pointbuy" && cost > 27) throw new FormatException("Превышен бюджет 27 очков");
            var hero = (JObject)cls["seed"].DeepClone();
            Merge(hero, (JObject)race["seed"]); Merge(hero, (JObject)background["seed"]);
            hero["id"] = Guid.NewGuid().ToString(); hero["schemaVersion"] = 3; hero["name"] = name.Trim();
            hero["class"] = cls["name"].DeepClone(); hero["className"] = cls["name"].DeepClone();
            hero["classId"] = cls["id"].DeepClone();
            if (race["packageId"] != null) hero["contentPackages"] = new JArray(new JObject { ["id"] = race["packageId"].DeepClone(), ["version"] = race["packageVersion"].DeepClone() });
            hero["raceId"] = race["id"].DeepClone(); hero["raceName"] = race["name"].DeepClone();
            hero["background"] = background["nameRu"] ?? background["name"];
            hero["_builderBaseStats"] = stats.DeepClone(); hero["statGenerationMode"] = mode;
            hero["stats"] = stats.DeepClone();
            foreach (string stat in CharacterSheetRules.Stats)
                hero["stats"][stat] = (int)(LegacyJson.Number(stats[stat]) + LegacyJson.Number((race["seed"]?["stats"] as JObject)?[stat], 10) - 10);
            hero["choiceState"] = new JObject(); hero["choiceHistory"] = new JArray(); hero["pendingChoices"] = new JArray();
            foreach (var entry in new[] { race, cls, background })
                foreach (JObject choice in (JArray)entry["choices"])
                {
                    string key = (string)choice["key"]; var answer = answers[key];
                    var options = (JArray)choice["options"];
                    var selected = answer is JArray a ? a.ToArray() : answer != null ? new[] { answer } : System.Array.Empty<JToken>();
                    int required = (string)choice["type"] == "stats2" ? 2 : (int?)choice["count"] ?? 1;
                    if (selected.Length != required || selected.Any(s => string.IsNullOrWhiteSpace(s.ToString())) || selected.Select(t => t.ToString()).Distinct().Count() != required) throw new FormatException("Заполните выбор: " + choice["label"]);
                    if ((string)choice["type"] == "stats2" && selected.Any(s => !CharacterSheetRules.Stats.Contains(s.ToString()))) throw new FormatException("Выберите две характеристики");
                    if (options.Count > 0 && selected.Any(s => !options.Any(o => (o is JObject obj ? obj["id"] ?? obj["name"] : o)?.ToString() == s.ToString()))) throw new FormatException("Недопустимый вариант: " + choice["label"]);
                    CharacterSheetRules.Object(hero, "choiceState")[key] = answer.DeepClone();
                    CharacterSheetRules.Array(hero, "choiceHistory").Add(new JObject { ["key"] = key, ["value"] = answer.DeepClone(), ["label"] = choice["label"]?.DeepClone(), ["source"] = choice["source"]?.DeepClone(), ["level"] = 1, ["className"] = choice["className"]?.DeepClone(), ["raceId"] = choice["raceId"]?.DeepClone() });
                    string id = (string)choice["id"];
                    if (id == "class_skills" || id == "half_elf_skills" || id == "human_skill") foreach (var s in selected) CharacterSheetRules.Object(hero, "skillsData")[s.ToString()] = 1;
                    else if (id == "human_stats") foreach (var s in selected) hero["stats"][s.ToString()] = (int)LegacyJson.Number(hero["stats"][s.ToString()]) + 1;
                    else if (id == "race_languages" || id == "background_languages" || id == "class_tools") foreach (var s in selected)
                    {
                        var p = ((JArray)catalog["proficiencies"]).OfType<JObject>().FirstOrDefault(x => (string)x["id"] == s.ToString());
                        if (p != null && !CharacterSheetRules.Array(hero, "proficiencies").Any(x => (string)x["id"] == (string)p["id"])) CharacterSheetRules.Array(hero, "proficiencies").Add(p.DeepClone());
                    }
                    else if (id == "race_size") hero["size"] = answer.DeepClone();
                    else { var pending = (JObject)choice.DeepClone(); pending["selectedValue"] = answer.DeepClone(); CharacterSheetRules.Array(hero, "pendingChoices").Add(pending); }
                }
            int hp = Math.Max(1, (int)LegacyJson.Number(cls["hitDie"], 8) + CharacterSheetRules.Modifier(hero, "con") + (int)LegacyJson.Number(hero["raceHpBonusPerLevel"]));
            hero["hpMax"] = hp; hero["hpCurrent"] = hp; hero["hpTemp"] = 0; hero["hitDice"] = "1d" + (int)LegacyJson.Number(cls["hitDie"], 8);
            hero["abilities"] = hero["stats"].DeepClone();
            foreach (var feature in (JArray)cls["levelOneFeatures"] ?? new JArray()) if (!CharacterSheetRules.Array(hero, "features").Any(x => JToken.DeepEquals(x, feature))) CharacterSheetRules.Array(hero, "features").Add(feature.DeepClone());
            var saves = CharacterSheetRules.Object(hero, "savesData");
            string[] longNames = { "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma" };
            for (int i = 0; i < 6; i++) if (saves[longNames[i]] != null) saves[CharacterSheetRules.Stats[i]] = saves[longNames[i]].DeepClone();
            CharacterSheetRules.Object(hero, "resources"); CharacterSheetRules.Object(hero, "classFeaturesState");
            CharacterSheetRules.Array(hero, "companions"); CharacterSheetRules.Array(hero, "coinLog");
            if (hero["initiativeTracker"] == null) hero["initiativeTracker"] = new JObject { ["round"] = 1, ["activeIndex"] = 0, ["combatants"] = new JArray() };
            var slots = CharacterSheetRules.Object(hero, "spellSlotsData");
            for (int level = 1; level <= 9; level++) if (slots[level.ToString()] == null) slots[level.ToString()] = new JObject { ["max"] = 0, ["used"] = 0 };
            var inventory = CharacterSheetRules.Object(hero, "inventory"); foreach (string key in CharacterSheetRules.InventoryCategories) CharacterSheetRules.Array(inventory, key);
            var coins = CharacterSheetRules.Object(hero, "coins"); foreach (string key in new[] { "cp", "sp", "ep", "gp", "pp" }) if (coins[key] == null) coins[key] = 0;
            CharacterSheetRules.Recalculate(hero); return new LegacyCharacterArchive(hero.ToString()).Snapshot(0);
        }
        private static void Merge(JObject target, JObject patch)
        {
            foreach (var p in patch.Properties())
            {
                if (p.Name == "stats" || p.Name == "abilities") continue;
                if (p.Value is JObject obj && target[p.Name] is JObject old) Merge(old, obj);
                else if (p.Value is JArray array && target[p.Name] is JArray existing)
                { foreach (var value in array) if (!existing.Any(x => JToken.DeepEquals(x, value))) existing.Add(value.DeepClone()); }
                else target[p.Name] = p.Value.DeepClone();
            }
        }
    }
}
