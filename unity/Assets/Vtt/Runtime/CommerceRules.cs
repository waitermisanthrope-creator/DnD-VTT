using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Data-only packages. All arithmetic/transactions execute in the trusted client.
    public static class CommerceRules
    {
        private static int Round(double value) => (int)Math.Floor(value + .5);
        private static int Clamp(int n, int min, int max) => Math.Max(min, Math.Min(max, n));
        private static double N(JToken token, double fallback = 0) => LegacyJson.Number(token, (float)fallback);
        private static IEnumerable<JObject> Entries(JObject hero) => CharacterSheetRules.InventoryCategories.SelectMany(c => (hero["inventory"]?[c] as JArray ?? new JArray()).OfType<JObject>());
        public static double TotalWeightKg(JObject hero)
        {
            double total = CharacterSheetRules.InventoryWeightKg(hero);
            foreach (JObject container in (hero["inventory"]?["containers"] as JArray ?? new JArray()).OfType<JObject>())
            {
                total += Math.Max(0,CharacterSheetRules.WeightKg(container["weight"]));
                foreach (JObject item in (container["contents"] as JArray ?? new JArray()).OfType<JObject>()) total += Math.Max(0,CharacterSheetRules.WeightKg(item["weight"])) * Math.Max(0,N(item["count"],1));
            }
            return total;
        }
        public static void ValidateCatalog(JObject data)
        {
            string mode = (string)data["mode"];
            if (!new[] { "craft-v31", "alchemy-v30", "alchemy-ingredients" }.Contains(mode)) throw new FormatException("Неизвестный модуль ремесла");
            foreach (string field in new[] { "recipes", "materials", "ingredients", "catalysts" })
                if (data[field] != null && (!(data[field] is JArray a) || a.Count > 200 || a.OfType<JObject>().Count() != a.Count || a.Any(x => string.IsNullOrWhiteSpace((string)x["id"]) || string.IsNullOrWhiteSpace((string)x["name"])) || a.Select(x => (string)x["id"]).Distinct().Count() != a.Count)) throw new FormatException("Неверный справочник " + field);
            if (mode == "craft-v31")
            {
                if (!(data["recipes"] is JArray recipes) || !(data["materials"] is JArray) || !(data["toolAliases"] is JObject)) throw new FormatException("Неполный пакет крафта");
                foreach (JObject recipe in recipes)
                    if (!CharacterSheetRules.InventoryCategories.Contains((string)(recipe["inventoryCategory"] ?? recipe["category"])) || (int?)recipe["dc"] < 1 || (int?)recipe["dc"] > 40 || !(recipe["tools"] is JArray) || !(recipe["materials"] is JObject mats) || mats.Properties().Any(p => N(p.Value) <= 0 || N(p.Value) > 10000)) throw new FormatException("Неверный рецепт");
            }
            if (mode == "alchemy-v30" && (!(data["effects"] is JObject) || !(data["extraTrigger"] is JObject) || !(data["synergy"] is JArray) || !(data["conflict"] is JArray) || !(data["catalysts"] is JArray))) throw new FormatException("Неполные правила алхимии");
            if (mode == "alchemy-ingredients")
            {
                if (!(data["ingredients"] is JArray ingredients) || !(data["items"] is JArray)) throw new FormatException("Нет ингредиентов");
                foreach (JObject ingredient in ingredients)
                    if (!(ingredient["properties"] is JArray props) || props.Count > 10 || new[] { "potency", "stability", "volatility", "purity" }.Any(k => N(ingredient[k], -1) < 0 || N(ingredient[k], -1) > 100)) throw new FormatException("Неверные свойства ингредиента");
            }
        }
        public static void AddItem(JObject hero, JObject item, double count = 1)
        {
            string category = (string)item["inventoryCategory"] ?? (string)item["category"];
            if (!CharacterSheetRules.InventoryCategories.Contains(category) || count <= 0 || double.IsNaN(count) || double.IsInfinity(count)) throw new FormatException("Неверный предмет/количество");
            if (hero["inventory"] != null && hero["inventory"].Type != JTokenType.Null && !(hero["inventory"] is JObject)) throw new FormatException("Унаследованный массив инвентаря сохранён; требуется явная миграция");
            var list = CharacterSheetRules.Array(CharacterSheetRules.Object(hero, "inventory"), category);
            var previous = list.OfType<JObject>().FirstOrDefault(x => (string)x["name"] == (string)item["name"] && JToken.DeepEquals(x["id"], item["id"]) && JToken.DeepEquals(x["craftQuality"], item["craftQuality"]) && JToken.DeepEquals(x["potency"], item["potency"]));
            if (previous != null) previous["count"] = N(previous["count"], 1) + count;
            else { var copy = (JObject)item.DeepClone(); copy["count"] = count; if (copy["equipped"] == null) copy["equipped"] = false; list.Add(copy); }
        }
        public static bool HasTool(JObject hero, string tool, JObject aliases)
        {
            var values = new[] { hero["proficiencies"], hero["toolProficiencies"], hero["proficienciesTools"], hero["tools"] }.Where(x => x != null).Select(x => x.ToString().ToLowerInvariant()).ToArray();
            var known = (aliases?[tool] as JArray ?? new JArray(tool)).Values<string>().ToList();
            known.Add("p_tool_" + new Dictionary<string, string> { { "woodwork", "carpenter" }, { "leatherwork", "leatherworker" }, { "glasswork", "glassblower" }, { "pottery", "potter" }, { "scribe", "calligrapher" }, { "alchemy", "alchemist" } }.Where(x => x.Key == tool).Select(x => x.Value).DefaultIfEmpty(tool).First());
            return known.Any(a => values.Any(v => v.Contains(a.ToLowerInvariant())));
        }
        private static void Consume(JObject hero, IEnumerable<(string id, string name, double count)> requirements, string idField)
        {
            foreach (var requirement in requirements)
            {
                bool Match(JObject item) => (string)item[idField] == requirement.id || (string)item["materialId"] == requirement.id || string.Equals((string)item["name"], requirement.name, StringComparison.OrdinalIgnoreCase);
                var items = Entries(hero).Where(Match).ToArray();
                if (items.Sum(x => N(x["count"], 1)) + .000001 < requirement.count) throw new FormatException("Не хватает: " + requirement.name + " ×" + requirement.count);
                double left = requirement.count;
                foreach (var item in items.Reverse())
                {
                    double take = Math.Min(left, N(item["count"], 1)); left -= take; double remaining = N(item["count"], 1) - take;
                    if (remaining <= .000001) item.Remove(); else item["count"] = remaining;
                    if (left <= .000001) break;
                }
            }
        }
        private static void Commit(JObject target, JObject candidate) { target.RemoveAll(); foreach (var property in candidate.Properties().ToArray()) target[property.Name] = property.Value.DeepClone(); }
        public static JObject Craft(JObject hero, JObject recipe, JObject rules, int roll)
        {
            if (roll < 1 || roll > 20) throw new FormatException("Неверный d20");
            if (((JArray)recipe["tools"]).Values<string>().Any(t => !HasTool(hero, t, (JObject)rules["toolAliases"]))) throw new FormatException("Нужно владение инструментами: " + recipe["tools"]);
            var candidate = (JObject)hero.DeepClone();
            Consume(candidate, ((JObject)recipe["materials"]).Properties().Select(p => (p.Name, ((JArray)rules["materials"]).OfType<JObject>().First(x => (string)x["id"] == p.Name)["name"].ToString(), N(p.Value))), "craftMaterialId");
            int bonus = (int)N(hero["proficiencyBonus"], 2), total = roll + bonus, dc = (int)recipe["dc"]; bool success = total >= dc;
            var outcome = new JObject { ["ok"] = success, ["roll"] = roll, ["bonus"] = bonus, ["total"] = total, ["dc"] = dc };
            if (success)
            {
                var item = new JObject { ["name"] = recipe["name"].DeepClone(), ["inventoryCategory"] = (recipe["inventoryCategory"] ?? recipe["category"]).DeepClone(), ["crafted"] = true, ["craftRecipe"] = recipe["id"].DeepClone(), ["craftQuality"] = total >= dc + 10 ? "exceptional" : total >= dc + 5 ? "fine" : "standard", ["craftTime"] = recipe["time"]?.DeepClone() };
                foreach (string key in new[] { "damage", "damageType", "weight", "cost", "properties", "ac", "rarity", "special" }) if (recipe[key] != null) item[key] = recipe[key].DeepClone();
                AddItem(candidate, item, N(recipe["quantity"], 1)); outcome["item"] = item;
            }
            Commit(hero, candidate); return outcome;
        }
        public static JObject Profile(JObject rules, string[] ids, string catalystId)
        {
            if (ids.Length < 1 || ids.Length > 5) throw new FormatException("Нужно 1–5 ингредиентов");
            var ingredients = ids.Select(id => ((JArray)rules["ingredients"]).OfType<JObject>().FirstOrDefault(x => (string)x["id"] == id) ?? throw new FormatException("Ингредиент не установлен: " + id)).ToArray();
            var all = ingredients.SelectMany(x => ((JArray)x["properties"]).Values<string>()).ToArray();
            var shared = all.Distinct().Where(p => all.Count(x => x == p) >= 2).ToArray();
            string Key(string a, string b) => string.Join("|", new[] { a, b }.OrderBy(x => x, StringComparer.Ordinal));
            string[] Pairs(string field) => ((JArray)rules[field]).OfType<JArray>().Select(p => Key((string)p[0], (string)p[1])).ToArray();
            var synergyKeys = Pairs("synergy"); var conflictKeys = Pairs("conflict"); var synergies = new List<string>(); var conflicts = new List<string>();
            for (int i = 0; i < all.Length; i++) for (int j = i + 1; j < all.Length; j++) { string key = Key(all[i], all[j]); if (synergyKeys.Contains(key) && !synergies.Contains(key)) synergies.Add(key); if (conflictKeys.Contains(key) && !conflicts.Contains(key)) conflicts.Add(key); }
            var extras = ingredients.Select(x => (string)x["extra"]).Where(x => x != null && rules["extraTrigger"]?[x] != null && all.Contains((string)rules["extraTrigger"][x])).Distinct().ToArray();
            var catalyst = ((JArray)rules["catalysts"]).OfType<JObject>().FirstOrDefault(c => (string)c["id"] == catalystId);
            var result = new JObject(); foreach (string key in new[] { "potency", "stability", "volatility", "purity" }) result[key] = Clamp(Round(ingredients.Average(x => N(x[key]))) + (int)N(catalyst?[key]) + (key == "potency" ? synergies.Count * 8 : 0), 1, 100);
            int risk = Clamp(Round((N(result["volatility"]) + 100 - N(result["stability"]) + conflicts.Count * 18 - N(result["purity"])) / 2), 0, 100);
            result["sharedProperties"] = new JArray(shared); result["synergies"] = new JArray(synergies); result["conflicts"] = new JArray(conflicts); result["extras"] = new JArray(extras); result["risk"] = risk; result["unstable"] = risk >= 60;
            result["activeProperties"] = new JArray(shared.Concat(synergies.SelectMany(x => x.Split('|'))).Concat(extras).Distinct()); result["catalystId"] = catalystId == null ? JValue.CreateNull() : new JValue(catalystId); return result;
        }
        public static JObject Mix(JObject hero, JObject rules, string[] ids, string catalystId, int roll)
        {
            if (ids.Length < 2 || ids.Length > 5 || roll < 1 || roll > 100) throw new FormatException("Нужно 2–5 ингредиентов и d100");
            if (!new[] { "alchemy", "herbal", "poison" }.Any(t => HasTool(hero, t, new JObject { ["alchemy"] = new JArray("алхим", "alchem"), ["herbal"] = new JArray("трав", "herbal"), ["poison"] = new JArray("отрав", "poison") }))) throw new FormatException("Нужны инструменты алхимика, травника или отравителя");
            var candidate = (JObject)hero.DeepClone(); var profile = Profile(rules, ids, catalystId);
            Consume(candidate, ids.GroupBy(x => x).Select(g => (g.Key, ((JArray)rules["ingredients"]).OfType<JObject>().First(x => (string)x["id"] == g.Key)["name"].ToString(), (double)g.Count())), "alchemyId");
            var state = CharacterSheetRules.Object(candidate, "alchemyState"); state["experiments"] = N(state["experiments"]) + 1;
            int chance = Clamp(Round(N(profile["risk"]) * .55 - N(profile["purity"]) * .12 - N(profile["stability"]) * .08), 0, 65); bool success = roll > chance;
            var outcome = new JObject { ["ok"] = success, ["profile"] = profile, ["roll"] = roll, ["failChance"] = chance };
            if (success)
            {
                string[] active = ((JArray)profile["activeProperties"]).Values<string>().ToArray(); var effects = new JArray();
                foreach (string key in active) if (rules["effects"]?[key] is JObject effect) { var copy = (JObject)effect.DeepClone(); copy["property"] = key; copy["strength"] = Round(N(profile["potency"]) * (active.Contains("Magic") ? 1.25 : 1)); effects.Add(copy); }
                string kind = active.Intersect(new[] { "Venom", "Hemorrhage", "Weakness", "Nausea" }).Any() ? "poison" : active.Intersect(new[] { "Fire", "Acid", "Cold", "Necrotic", "Radiant" }).Any() ? "bomb" : active.Intersect(new[] { "Recovery", "Vitality", "Regeneration", "Antidote" }).Any() ? "potion" : active.Intersect(new[] { "Invisibility", "Speed", "Breathing", "Mind", "Perception" }).Any() ? "elixir" : "reagent";
                var item = (JObject)profile.DeepClone(); item["name"] = (kind == "poison" ? "Алхимический яд" : kind == "bomb" ? "Алхимическая бомба" : kind == "potion" ? "Зелье" : kind == "elixir" ? "Эликсир" : "Алхимический реагент") + " — " + string.Join(" + ", effects.OfType<JObject>().Take(2).Select(e => (string)e["label"]));
                item["inventoryCategory"] = "consumables"; item["effects"] = effects; item["kind"] = kind; item["crafted"] = true; item["alchemyId"] = "alchemy_" + Guid.NewGuid().ToString("N");
                AddItem(candidate, item); state["mastery"] = N(state["mastery"]) + 1; CharacterSheetRules.Object(state, "knownReactions")[string.Join("|", ids.OrderBy(x => x, StringComparer.Ordinal))] = profile["activeProperties"].DeepClone(); outcome["product"] = item;
            }
            CharacterSheetRules.Array(state, "history").Add(new JObject { ["time"] = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(), ["type"] = success ? "success" : "failure", ["ingredients"] = new JArray(ids), ["risk"] = profile["risk"].DeepClone() });
            Commit(hero, candidate); return outcome;
        }
        public static void Research(JObject hero, JObject rules, string id)
        {
            var ingredient = ((JArray)rules["ingredients"]).OfType<JObject>().FirstOrDefault(x => (string)x["id"] == id) ?? throw new FormatException("Ингредиент не установлен");
            if (!Entries(hero).Any(x => ((string)x["alchemyId"] == id || (string)x["name"] == (string)ingredient["name"]) && N(x["count"],1) >= 1)) throw new FormatException("Нужен образец ингредиента в инвентаре");
            var state = CharacterSheetRules.Object(hero, "alchemyState"); var discoveries = CharacterSheetRules.Object(state, "discovered"); var known = CharacterSheetRules.Array(discoveries, id);
            string property = ((JArray)ingredient["properties"]).Values<string>().FirstOrDefault(x => !known.Values<string>().Contains(x));
            if (property == null) throw new FormatException("Все основные свойства уже изучены");
            known.Add(property); state["discoveries"] = N(state["discoveries"]) + 1;
        }
        public static void UseProduct(JObject hero, JObject item)
        {
            if (!(item["effects"] is JArray effects) || N(item["count"],1) < 1) throw new FormatException("Это не алхимический продукт");
            double potency = N(item["potency"],20), power = Math.Max(1, Round(potency / 20));
            foreach (JObject effect in effects)
            {
                string kind = (string)effect["kind"];
                if (kind == "heal")
                {
                    var hp = hero["hp"] as JObject; var hit = hero["hitPoints"] as JObject;
                    double current = N(hero["hpCurrent"] ?? hero["currentHP"] ?? hp?["current"] ?? hit?["current"] ?? (hero["hitPoints"] is JValue ? hero["hitPoints"] : null) ?? (hero["hp"] is JValue ? hero["hp"] : null));
                    double maximum = N(hero["hpMax"] ?? hero["maxHitPoints"] ?? hero["maxHp"] ?? hp?["max"] ?? hit?["max"]);
                    double healed = Math.Max(0,Math.Min(power + potency / 20,maximum > 0 ? maximum - current : power));
                    hero["hpCurrent"] = current + healed;
                }
                else if (kind == "tempHP") hero["hpTemp"] = Math.Max(N(hero["hpTemp"]),Round(potency / 5));
                else if (kind == "cleanse") { CharacterSheetRules.Object(hero,"conditions").Remove("poisoned"); CharacterSheetRules.Object(hero,"conditions").Remove("Poisoned"); }
                else if (kind == "condition") CharacterSheetRules.Object(hero,"conditions")[(string)effect["condition"]] = true;
                else if (kind == "speed") { var buffs = CharacterSheetRules.Object(hero,"alchemyBuffs"); buffs["speed"] = N(buffs["speed"]) + 10; }
                else if (kind == "ability") { var buffs = CharacterSheetRules.Object(hero,"alchemyBuffs"); string key = (string)effect["property"]; buffs[key] = N(buffs[key]) + 1; }
                else if (kind == "resistance") CharacterSheetRules.Object(hero,"alchemyBuffs")["earthResistance"] = true;
            }
            if (N(item["count"],1) <= 1) item.Remove(); else item["count"] = N(item["count"],1) - 1;
        }
        public static void Equip(JObject hero, JObject item)
        {
            item["equipped"] = !((bool?)item["equipped"] ?? false);
            if ((string)item["inventoryCategory"] == "weapons" || (item.Parent?.Parent as JProperty)?.Name == "weapons") return;
            double dex = CharacterSheetRules.Modifier(hero,"dex");
            double ac = (bool?)hero["raceMechanics"]?["naturalArmor"] == true ? N(hero["baseAC"],10) : N(hero["baseAC"],10) + dex;
            double shield = 0;
            foreach (JObject armor in (hero["inventory"]?["armor"] as JArray ?? new JArray()))
            {
                if ((bool?)armor["equipped"] != true) continue;
                string type = ((string)armor["proficiencyType"] ?? "").ToLowerInvariant(); double basis = N(armor["acBase"],N(armor["ac"]));
                if (((string)armor["category"] ?? "").IndexOf("щит",StringComparison.OrdinalIgnoreCase) >= 0 || type.Contains("shield")) shield = Math.Max(shield,basis);
                else if (basis > 0) ac = Math.Max(ac,basis + (type.Contains("heavy") ? 0 : type.Contains("medium") ? Math.Min(2,dex) : dex));
            }
            hero["ac"] = ac + shield;
        }

    }
}
