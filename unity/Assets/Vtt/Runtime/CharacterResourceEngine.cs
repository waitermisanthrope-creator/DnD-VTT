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

        public static void Synchronize(JObject hero)
        {
            if (hero == null) throw new ArgumentNullException(nameof(hero));
            var state = hero[StateKey] as JObject;
            if (state == null) { state = new JObject(); hero[StateKey] = state; }
            var definitions = hero[DefinitionsKey] as JArray;
            if (definitions == null) return;
            foreach (var item in definitions)
            {
                var definition = item as JObject;
                string id = (string)definition?["id"];
                if (string.IsNullOrWhiteSpace(id)) continue;
                int maximum = Math.Max(0, (int?)definition["max"] ?? 0);
                if (!(state[id] is JObject entry))
                {
                    entry = new JObject { ["current"] = maximum };
                    state[id] = entry;
                }
                entry["current"] = Math.Min(maximum, Math.Max(0, (int?)entry["current"] ?? maximum));
            }
        }

        // Atomic payment: all costs are validated before any resource is changed.
        public static bool TrySpend(JObject hero, IDictionary<string, int> costs)
        {
            if (hero == null || costs == null) return false;
            Synchronize(hero);
            var state = (JObject)hero[StateKey];
            foreach (var cost in costs)
            {
                if (string.IsNullOrWhiteSpace(cost.Key) || cost.Value < 0 ||
                    !(state[cost.Key] is JObject entry) ||
                    ((int?)entry["current"] ?? 0) < cost.Value) return false;
            }
            foreach (var cost in costs)
            {
                var entry = (JObject)state[cost.Key];
                entry["current"] = (int)entry["current"] - cost.Value;
            }
            return true;
        }

        public static bool Restore(JObject hero, string trigger)
        {
            if (hero == null || string.IsNullOrWhiteSpace(trigger)) return false;
            Synchronize(hero);
            var state = hero[StateKey] as JObject;
            var definitions = hero[DefinitionsKey] as JArray;
            if (state == null || definitions == null) return false;
            bool changed = false;
            foreach (var item in definitions)
            {
                var definition = item as JObject;
                string id = (string)definition?["id"];
                if (string.IsNullOrWhiteSpace(id) || !(state[id] is JObject entry)) continue;
                var restoreOn = definition["restoreOn"] as JArray;
                bool matches = false;
                if (restoreOn != null)
                    foreach (var value in restoreOn)
                        if (string.Equals((string)value, trigger, StringComparison.OrdinalIgnoreCase))
                            matches = true;
                if (!matches) continue;
                int max = Math.Max(0, (int?)definition["max"] ?? 0);
                if ((int?)entry["current"] == max) continue;
                entry["current"] = max;
                changed = true;
            }
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
            Synchronize(hero);
            var state = hero[StateKey] as JObject;
            var definitions = hero[DefinitionsKey] as JArray;
            if (state == null || definitions == null || !(state[id] is JObject entry)) return false;
            foreach (var token in definitions)
            {
                var definition = token as JObject;
                if ((string)definition?["id"] != id) continue;
                int max = Math.Max(0, (int?)definition["max"] ?? 0);
                entry["current"] = Math.Min(max, (int?)entry["current"] + amount ?? amount);
                return true;
            }
            return false;
        }
    }
}
