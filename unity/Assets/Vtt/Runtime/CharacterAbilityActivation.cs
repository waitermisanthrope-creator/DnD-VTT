using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // One transaction across action economy, ability charges and class resources.
    public static class CharacterAbilityActivation
    {
        public static void Activate(JObject hero, JObject ability)
        {
            if (hero == null || ability == null) throw new FormatException("Приём не выбран");
            string id = (string)ability["id"];
            if (string.IsNullOrWhiteSpace(id)) throw new FormatException("Приём без идентификатора");
            if ((string)hero["turnPhase"] == "ended")
                throw new FormatException("Ход завершён. Начните следующий ход");
            var copy = (JObject)hero.DeepClone();
            CharacterResourceEngine.EnsureTurnResources(copy);
            string action = ((string)(ability["actionType"] ?? ability["activation"] ??
                ability["actionEconomy"]) ?? "").Trim().ToLowerInvariant();
            string cost = action == "action" || action == "1 action" ||
                action == "действие" || action == "основное действие" ? "turn.action" :
                action == "bonus" || action == "bonus action" ||
                action == "бонусное" || action == "бонусное действие" ? "turn.bonus" :
                action == "reaction" || action == "реакция" ? "turn.reaction" : null;
            if (cost == null) throw new FormatException("Для приёма не задан поддерживаемый тип действия");
            var costs = new Dictionary<string, int> { [cost] = 1 };
            var resourceId = (string)ability["resourceId"];
            if (!string.IsNullOrWhiteSpace(resourceId))
            {
                if (costs.ContainsKey(resourceId)) throw new FormatException("Ресурс дублирует стоимость действия");
                int amount = 1;
                if (ability["resourceCost"] != null &&
                    (!CharacterSheetRules.TrySheetCount(ability["resourceCost"], out amount) || amount == 0))
                    throw new FormatException("Некорректная стоимость ресурса");
                costs[resourceId] = amount;
            }
            if (ability["maxUses"] != null)
                CharacterSheetRules.ChangeAbilityUse(copy, id, 1);
            // Legacy class counters are authoritative; never spend a shadow copy.
            if (!string.IsNullOrWhiteSpace(resourceId) &&
                (copy["resources"] as JObject)?[resourceId] is JObject legacy)
            {
                if (legacy["max"] == null || legacy["current"] == null ||
                    !CharacterSheetRules.TrySheetCount(legacy["max"], out int max) ||
                    !CharacterSheetRules.TrySheetCount(legacy["current"], out int current) ||
                    current > max || current < costs[resourceId])
                    throw new FormatException("Недостаточно классового ресурса");
                legacy["current"] = current - costs[resourceId];
                costs.Remove(resourceId);
            }
            if (!CharacterResourceEngine.TrySpend(copy, costs))
                throw new FormatException("Недостаточно действий или ресурсов");
            foreach (string key in new[] { "resources", "combatAbilities", CharacterResourceEngine.StateKey,
                CharacterResourceEngine.DefinitionsKey })
                if (copy[key] != null) hero[key] = copy[key].DeepClone();
        }

        // Supported declarative formulas; never execute expressions from packages.
        private static int ResolveMaximum(JObject hero, JObject definition)
        {
            string formula = (string)definition["maxFormula"];
            if (string.IsNullOrWhiteSpace(formula))
            {
                if (definition["max"] == null ||
                    !CharacterSheetRules.TrySheetCount(definition["max"], out int literal))
                    throw new FormatException("HB-ресурс требует целого максимума");
                return literal;
            }
            int level = 1;
            if (hero["level"] != null &&
                (!CharacterSheetRules.TrySheetCount(hero["level"], out level) || level < 1 || level > 20))
                throw new FormatException("Некорректный уровень персонажа");
            int value;
            if (formula == "level") value = level;
            else if (formula == "proficiency") value = 2 + (level - 1) / 4;
            else if (formula.StartsWith("modifier:", StringComparison.Ordinal))
            {
                string stat = formula.Substring("modifier:".Length);
                if (stat != "str" && stat != "dex" && stat != "con" &&
                    stat != "int" && stat != "wis" && stat != "cha")
                    throw new FormatException("Неизвестная характеристика HB-ресурса");
                value = CharacterSheetRules.Modifier(hero, stat);
            }
            else throw new FormatException("Неподдерживаемая формула HB-ресурса");
            int minimum = 0;
            if (definition["minimum"] != null &&
                (!CharacterSheetRules.TrySheetCount(definition["minimum"], out minimum) ||
                 minimum > 1000000))
                throw new FormatException("Некорректный минимум HB-ресурса");
            return Math.Max(minimum, value);
        }

        public static bool RefreshFormulaResources(JObject hero)
        {
            if (hero == null) return false;
            var copy = (JObject)hero.DeepClone();
            var definitions = copy[CharacterResourceEngine.DefinitionsKey] as JArray;
            if (definitions == null) return false;
            bool changed = false;
            foreach (var token in definitions)
            {
                if (!(token is JObject definition) || definition["maxFormula"] == null) continue;
                int maximum = ResolveMaximum(copy, definition);
                if (maximum > 1000000) throw new FormatException("Превышен максимум HB-ресурса");
                if ((int?)definition["max"] != maximum)
                {
                    definition["max"] = maximum;
                    changed = true;
                }
            }
            CharacterResourceEngine.Synchronize(copy);
            hero[CharacterResourceEngine.DefinitionsKey] = copy[CharacterResourceEngine.DefinitionsKey].DeepClone();
            hero[CharacterResourceEngine.StateKey] = copy[CharacterResourceEngine.StateKey].DeepClone();
            return changed;
        }

        // Register explicit HB definitions without overwriting spent charges.
        // Only concrete maxima are accepted; formula evaluation belongs to import.
        public static int ImportDefinitions(JObject hero, JArray incoming)
        {
            if (hero == null || incoming == null) return 0;
            var copy = (JObject)hero.DeepClone();
            var definitions = copy[CharacterResourceEngine.DefinitionsKey] as JArray;
            if (definitions == null)
            {
                definitions = new JArray();
                copy[CharacterResourceEngine.DefinitionsKey] = definitions;
            }
            var ids = new HashSet<string>(StringComparer.Ordinal);
            foreach (var token in definitions)
                if (token is JObject obj && (string)obj["id"] != null)
                    ids.Add((string)obj["id"]);
            int added = 0;
            foreach (var token in incoming)
            {
                if (!(token is JObject definition)) throw new FormatException("Некорректное описание HB-ресурса");
                string id = (string)definition["id"];
                if (string.IsNullOrWhiteSpace(id) || id.StartsWith("turn.", StringComparison.Ordinal))
                    throw new FormatException("Некорректный ID HB-ресурса");
                int max = ResolveMaximum(copy, definition);
                if (max > 1000000)
                    throw new FormatException("Превышен максимум HB-ресурса");
                if (definition["restoreOn"] != null && !(definition["restoreOn"] is JArray))
                    throw new FormatException("Некорректное восстановление HB-ресурса");
                if (!ids.Add(id)) continue;
                var resolved = (JObject)definition.DeepClone();
                resolved["max"] = max;
                definitions.Add(resolved);
                added++;
            }
            CharacterResourceEngine.Synchronize(copy);
            hero[CharacterResourceEngine.DefinitionsKey] = copy[CharacterResourceEngine.DefinitionsKey].DeepClone();
            hero[CharacterResourceEngine.StateKey] = copy[CharacterResourceEngine.StateKey].DeepClone();
            return added;
        }
    }
}
