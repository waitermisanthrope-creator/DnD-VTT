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
            if (!CharacterSheetRules.TrySheetCount(definition["max"], out max))
                throw new FormatException("Максимум ресурса должен быть целым неотрицательным числом");
            return max;
        }

        private static int Current(JObject entry)
        {
            int current;
            if (!CharacterSheetRules.TrySheetCount(entry["current"], out current))
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
            Synchronize(hero);
        }

        private static void AddDefault(JArray definitions, string id, string name, int maximum)
        {
            foreach (var token in definitions)
                if (string.Equals((string)(token as JObject)?["id"], id, StringComparison.Ordinal))
                    return;
            definitions.Add(new JObject {
                ["id"] = id, ["name"] = name, ["max"] = maximum,
                ["restoreOn"] = new JArray("turn")
            });
        }

        public static bool EndTurn(JObject hero)
        {
            EnsureTurnResources(hero);
            bool changed = Restore(hero, "turn");
            hero["turnNumber"] = Math.Max(0, (int?)hero["turnNumber"] ?? 0) + 1;
            return changed;
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
