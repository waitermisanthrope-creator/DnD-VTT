using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Character-owned resource state; independent of IMGUI and future combat UI.
    // Resources are declared by class/content packages, not hard-coded by class name.
    public static class CharacterResourceEngine
    {
        public const string StateKey = "resourceState";
        public const string DefinitionsKey = "resourceDefinitions";

        private static int Maximum(JObject definition)
        {
            int max;
            if (definition["max"] == null || !CharacterSheetRules.TrySheetCount(definition["max"], out max))
                throw new FormatException("Максимум ресурса должен быть целым неотрицательным числом");
            return max;
        }

        private static int Current(JObject entry)
        {
            int current;
            if (entry["current"] == null || !CharacterSheetRules.TrySheetCount(entry["current"], out current))
                throw new FormatException("Остаток ресурса должен быть целым неотрицательным числом");
            return current;
        }

        public static void Synchronize(JObject hero)
        {
            if (hero == null) throw new ArgumentNullException(nameof(hero));
            var definitions = hero[DefinitionsKey] as JArray;
            var original = hero[StateKey] as JObject;
            var state = original == null ? new JObject() : (JObject)original.DeepClone();
            if (definitions != null)
            {
                var ids = new HashSet<string>(StringComparer.Ordinal);
                foreach (var item in definitions)
                {
                    var definition = item as JObject;
                    string id = (string)definition?["id"];
                    if (string.IsNullOrWhiteSpace(id)) throw new FormatException("У ресурса отсутствует ID");
                    if (!ids.Add(id)) throw new FormatException("Повторяющийся ID ресурса: " + id);
                    int maximum = Maximum(definition);
                    var entry = state[id] as JObject;
                    if (entry == null)
                    {
                        entry = new JObject { ["current"] = maximum };
                        state[id] = entry;
                    }
                    int current = Current(entry);
                    entry["current"] = Math.Min(maximum, current);
                }
            }
            hero[StateKey] = state;
        }

        // Validation and spending happen on a detached copy: failure never
        // creates missing counters or changes an existing character.
        public static bool TrySpend(JObject hero, IDictionary<string, int> costs)
        {
            if (hero == null || costs == null) return false;
            if ((string)hero["turnPhase"] == "ended")
                foreach (var cost in costs)
                    if (cost.Key != "turn.reaction" && cost.Value > 0)
                        return false;
            var copy = (JObject)hero.DeepClone();
            Synchronize(copy);
            var state = (JObject)copy[StateKey];
            var definitions = copy[DefinitionsKey] as JArray;
            var known = new HashSet<string>(StringComparer.Ordinal);
            if (definitions != null)
                foreach (var token in definitions)
                    known.Add((string)((JObject)token)["id"]);
            foreach (var cost in costs)
            {
                if (string.IsNullOrWhiteSpace(cost.Key) || cost.Value < 0 ||
                    !known.Contains(cost.Key) || !(state[cost.Key] is JObject entry) ||
                    Current(entry) < cost.Value) return false;
            }
            foreach (var cost in costs)
            {
                var entry = (JObject)state[cost.Key];
                entry["current"] = Current(entry) - cost.Value;
            }
            hero[StateKey] = copy[StateKey].DeepClone();
            return true;
        }

        public static bool Restore(JObject hero, string trigger)
        {
            if (hero == null || string.IsNullOrWhiteSpace(trigger)) return false;
            var copy = (JObject)hero.DeepClone();
            Synchronize(copy);
            var state = (JObject)copy[StateKey];
            var definitions = copy[DefinitionsKey] as JArray;
            bool changed = false;
            if (definitions != null)
                foreach (var item in definitions)
                {
                    var definition = (JObject)item;
                    string id = (string)definition["id"];
                    var entry = (JObject)state[id];
                    var restoreOn = definition["restoreOn"] as JArray;
                    bool matches = false;
                    if (restoreOn != null)
                        foreach (var value in restoreOn)
                            if (string.Equals((string)value, trigger, StringComparison.OrdinalIgnoreCase))
                                matches = true;
                    if (!matches) continue;
                    int max = Maximum(definition);
                    if (Current(entry) == max) continue;
                    entry["current"] = max;
                    changed = true;
                }
            hero[StateKey] = copy[StateKey].DeepClone();
            return changed;
        }

        // Default turn resources. Existing values are preserved on every render.
        public static void EnsureTurnResources(JObject hero)
        {
            if (hero == null) return;
            var definitions = hero[DefinitionsKey] as JArray;
            if (definitions == null) { definitions = new JArray(); hero[DefinitionsKey] = definitions; }
            AddDefault(definitions, "turn.action", "Действие", 1);
            AddDefault(definitions, "turn.bonus", "Бонусное действие", 1);
            AddDefault(definitions, "turn.reaction", "Реакция", 1);
            AddDefault(definitions, "turn.extra_action", "Дополнительное действие", 0);
            AddMovement(definitions, hero);
            Synchronize(hero);
        }

        // Register movement only for unambiguous speeds measured in feet.
        private static void AddMovement(JArray definitions, JObject hero)
        {
            string raw = hero["speed"]?.ToString() ?? "";
            var match = System.Text.RegularExpressions.Regex.Match(raw,
                @"^\s*(\d+)\s*(?:футов|фута|футы|фут|фт|feet|ft)?\s*$",
                System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            if (!match.Success || !int.TryParse(match.Groups[1].Value, out int feet) ||
                feet > 1000) return;
            foreach (var token in definitions)
                if ((string)(token as JObject)?["id"] == "turn.movement") return;
            AddDefault(definitions, "turn.movement", "Передвижение (фт)", feet);
        }

        private static void AddDefault(JArray definitions, string id, string name, int maximum)
        {
            foreach (var token in definitions)
                if (string.Equals((string)(token as JObject)?["id"], id, StringComparison.Ordinal))
                    return;
            definitions.Add(new JObject {
                ["id"] = id, ["name"] = name, ["max"] = maximum,
                ["restoreOn"] = new JArray("start")
            });
        }

        // A reaction refreshes at the START of the creature's next turn,
        // not when its previous turn ends. Other turn budgets follow suit.
        public static bool StartTurn(JObject hero)
        {
            if (hero == null) return false;
            var copy = (JObject)hero.DeepClone();
            EnsureTurnResources(copy);
            if ((string)copy["turnPhase"] == "active") return false;
            Restore(copy, "start");
            // Migrate older turn definitions without resetting custom resources.
            var definitions = (JArray)copy[DefinitionsKey];
            foreach (var token in definitions)
            {
                var definition = token as JObject;
                string id = (string)definition?["id"];
                if (id == null || !id.StartsWith("turn.", StringComparison.Ordinal) ||
                    id == "turn.extra_action") continue;
                var entry = (copy[StateKey] as JObject)?[id] as JObject;
                if (entry != null) entry["current"] = Maximum(definition);
            }
            copy["turnSpellcasting"] = new JObject();
            copy["turnPhase"] = "active";
            hero[DefinitionsKey] = copy[DefinitionsKey].DeepClone();
            hero[StateKey] = copy[StateKey].DeepClone();
            hero["turnSpellcasting"] = copy["turnSpellcasting"].DeepClone();
            hero["turnPhase"] = "active";
            return true;
        }

        public static bool EndTurn(JObject hero)
        {
            if (hero == null) return false;
            var copy = (JObject)hero.DeepClone();
            EnsureTurnResources(copy);
            if ((string)copy["turnPhase"] == "ended") return false;
            var extra = (copy[StateKey] as JObject)?["turn.extra_action"] as JObject;
            if (extra != null) extra["current"] = 0;
            foreach (var token in (JArray)copy[DefinitionsKey])
                if ((string)(token as JObject)?["id"] == "turn.extra_action")
                    ((JObject)token)["max"] = 0;
            CharacterTimedEffects.Tick(copy);
            int turn = (int?)copy["turnNumber"] ?? 0;
            if (turn == int.MaxValue) throw new FormatException("Счётчик ходов переполнен");
            copy["turnNumber"] = turn + 1;
            copy["turnPhase"] = "ended";
            hero[DefinitionsKey] = copy[DefinitionsKey].DeepClone();
            hero[StateKey] = copy[StateKey].DeepClone();
            hero["turnNumber"] = copy["turnNumber"].DeepClone();
            if (copy["timedEffects"] != null) hero["timedEffects"] = copy["timedEffects"].DeepClone();
            hero["turnPhase"] = "ended";
            return true;
        }

        // Temporary additional actions are separate from the normal action.
        // The caller must enforce restrictions (e.g. Haste).
        public static bool GrantExtraAction(JObject hero, int amount)
        {
            if (hero == null || amount <= 0 || amount > 10) return false;
            var copy = (JObject)hero.DeepClone();
            EnsureTurnResources(copy);
            var definitions = (JArray)copy[DefinitionsKey];
            JObject definition = null;
            foreach (var token in definitions)
                if ((string)(token as JObject)?["id"] == "turn.extra_action")
                { definition = (JObject)token; break; }
            if (definition == null) return false;
            var entry = (JObject)((JObject)copy[StateKey])["turn.extra_action"];
            int current = Current(entry);
            if (current > 10 - amount) return false;
            definition["max"] = Math.Max(Maximum(definition), current + amount);
            entry["current"] = current + amount;
            hero[DefinitionsKey] = copy[DefinitionsKey].DeepClone();
            hero[StateKey] = copy[StateKey].DeepClone();
            return true;
        }

        public static bool Grant(JObject hero, string id, int amount)
        {
            if (hero == null || string.IsNullOrWhiteSpace(id) || amount < 0) return false;
            var copy = (JObject)hero.DeepClone();
            Synchronize(copy);
            var state = (JObject)copy[StateKey];
            var definitions = copy[DefinitionsKey] as JArray;
            if (definitions == null || !(state[id] is JObject entry)) return false;
            foreach (var token in definitions)
            {
                var definition = (JObject)token;
                if ((string)definition["id"] != id) continue;
                int max = Maximum(definition);
                entry["current"] = (int)Math.Min(max, (long)Current(entry) + amount);
                hero[StateKey] = copy[StateKey].DeepClone();
                return true;
            }
            return false;
        }
    }
}
