using System;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Explicit turn-based effects. No hidden real-time clocks or arbitrary code.
    public static class CharacterTimedEffects
    {
        public static void Apply(JObject hero, string id, string name, int rounds,
            bool concentration = false)
        {
            if (hero == null || string.IsNullOrWhiteSpace(id) || id.Length > 160 ||
                rounds < 1 || rounds > 100000)
                throw new FormatException("Некорректный временный эффект");
            var copy = (JObject)hero.DeepClone();
            var effects = copy["timedEffects"] as JArray ?? new JArray();
            for (int i = effects.Count - 1; i >= 0; i--)
                if ((string)effects[i]?["id"] == id) effects.RemoveAt(i);
            effects.Add(new JObject {
                ["id"] = id, ["name"] = name ?? id,
                ["roundsRemaining"] = rounds, ["concentration"] = concentration
            });
            copy["timedEffects"] = effects;
            hero["timedEffects"] = effects.DeepClone();
        }

        // Called at the end of this character's own turn.
        public static bool Tick(JObject hero)
        {
            if (hero == null) return false;
            var copy = (JObject)hero.DeepClone();
            var effects = copy["timedEffects"] as JArray;
            if (effects == null || effects.Count == 0) return false;
            bool changed = false;
            for (int i = effects.Count - 1; i >= 0; i--)
            {
                if (!(effects[i] is JObject effect) ||
                    !CharacterSheetRules.TrySheetCount(effect["roundsRemaining"], out int rounds) ||
                    rounds == 0)
                    throw new FormatException("Некорректная длительность эффекта");
                if (rounds == 1) effects.RemoveAt(i);
                else effect["roundsRemaining"] = rounds - 1;
                changed = true;
            }
            if (changed) hero["timedEffects"] = effects.DeepClone();
            return changed;
        }

        public static void ClearConcentrationEffects(JObject hero)
        {
            if (hero == null) return;
            var effects = hero["timedEffects"] as JArray;
            if (effects == null) return;
            var copy = (JArray)effects.DeepClone();
            for (int i = copy.Count - 1; i >= 0; i--)
                if ((bool?)copy[i]?["concentration"] == true) copy.RemoveAt(i);
            hero["timedEffects"] = copy;
        }
    }
}
