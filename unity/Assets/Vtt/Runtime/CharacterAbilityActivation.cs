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
            if ((string)hero["turnPhase"] == "ended" && cost != "turn.reaction")
                throw new FormatException("Ход завершён. Доступны только реакции");
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

        // Bounded declarative arithmetic; never evaluate C# or scripts from HB.
        // Grammar: numbers, level, proficiency, modifier:wis (etc),
        // + - * /, parentheses, min(a,b), max(a,b), floor(a), ceil(a).
        private sealed class FormulaParser
        {
            private readonly string source;
            private readonly JObject hero;
            private int position;
            private int nodes;
            public FormulaParser(string formula, JObject character)
            {
                source = formula;
                hero = character;
                if (source.Length > 256) throw new FormatException("Слишком длинная HB-формула");
            }
            private void Space()
            {
                while (position < source.Length && char.IsWhiteSpace(source[position])) position++;
            }
            private bool Eat(char c)
            {
                Space();
                if (position < source.Length && source[position] == c)
                { position++; return true; }
                return false;
            }
            private decimal Expression()
            {
                decimal value = Term();
                while (true)
                {
                    if (Eat('+')) value = checked(value + Term());
                    else if (Eat('-')) value = checked(value - Term());
                    else return value;
                }
            }
            private decimal Term()
            {
                decimal value = Atom();
                while (true)
                {
                    if (Eat('*')) value = checked(value * Atom());
                    else if (Eat('/'))
                    {
                        decimal divisor = Atom();
                        if (divisor == 0) throw new FormatException("Деление на ноль в HB-формуле");
                        value /= divisor;
                    }
                    else return value;
                }
            }
            private decimal Atom()
            {
                if (++nodes > 128) throw new FormatException("Слишком сложная HB-формула");
                if (Eat('+')) return Atom();
                if (Eat('-')) return -Atom();
                if (Eat('('))
                {
                    decimal nested = Expression();
                    if (!Eat(')')) throw new FormatException("Не закрыта скобка HB-формулы");
                    return nested;
                }
                Space();
                int start = position;
                while (position < source.Length &&
                    (char.IsLetterOrDigit(source[position]) || source[position] == ':' ||
                     source[position] == '_' || source[position] == '.'))
                    position++;
                if (start == position) throw new FormatException("Неожиданный символ HB-формулы");
                string token = source.Substring(start, position - start).ToLowerInvariant();
                if (decimal.TryParse(token, System.Globalization.NumberStyles.AllowDecimalPoint,
                    System.Globalization.CultureInfo.InvariantCulture, out decimal number))
                    return number;
                if (token == "min" || token == "max")
                {
                    if (!Eat('(')) throw new FormatException("Ожидалась скобка функции");
                    decimal left = Expression();
                    if (!Eat(',')) throw new FormatException("Ожидалась запятая функции");
                    decimal right = Expression();
                    if (!Eat(')')) throw new FormatException("Ожидалась закрывающая скобка");
                    return token == "min" ? Math.Min(left, right) : Math.Max(left, right);
                }
                if (token == "floor" || token == "ceil")
                {
                    if (!Eat('(')) throw new FormatException("Ожидалась скобка функции");
                    decimal arg = Expression();
                    if (!Eat(')')) throw new FormatException("Ожидалась закрывающая скобка");
                    return token == "floor" ? Math.Floor(arg) : Math.Ceiling(arg);
                }
                int level = 1;
                if (hero["level"] != null &&
                    (!CharacterSheetRules.TrySheetCount(hero["level"], out level) ||
                     level < 1 || level > 20))
                    throw new FormatException("Некорректный уровень персонажа");
                if (token == "level") return level;
                if (token == "proficiency") return 2 + (level - 1) / 4;
                if (token.StartsWith("modifier:", StringComparison.Ordinal))
                {
                    string stat = token.Substring("modifier:".Length);
                    if (stat != "str" && stat != "dex" && stat != "con" &&
                        stat != "int" && stat != "wis" && stat != "cha")
                        throw new FormatException("Неизвестная характеристика HB-ресурса");
                    return CharacterSheetRules.Modifier(hero, stat);
                }
                throw new FormatException("Неизвестный токен HB-формулы: " + token);
            }
            public int Evaluate()
            {
                try
                {
                    decimal value = Expression();
                    Space();
                    if (position != source.Length)
                        throw new FormatException("Лишние символы в HB-формуле");
                    if (value < -1000000 || value > 1000000)
                        throw new FormatException("HB-формула вышла за допустимый диапазон");
                    return (int)Math.Floor(value);
                }
                catch (OverflowException)
                {
                    throw new FormatException("Переполнение HB-формулы");
                }
            }
        }

        private static int ResolveMaximum(JObject hero, JObject definition)
        {
            string formula = (string)definition["maxFormula"];
            int value;
            if (string.IsNullOrWhiteSpace(formula))
            {
                if (definition["max"] == null ||
                    !CharacterSheetRules.TrySheetCount(definition["max"], out value))
                    throw new FormatException("HB-ресурс требует целого максимума");
            }
            else value = new FormulaParser(formula, hero).Evaluate();
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
