using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Safe first-pass spell casting. Unsupported timing never silently consumes a turn.
    public static class CharacterSpellCasting
    {
        public static string ActionResource(JObject spell)
        {
            string time = ((string)(spell?["castingTime"] ?? spell?["time"]) ?? "").Trim().ToLowerInvariant();
            if (time == "1 action" || time == "action" || time == "1 действие" ||
                time == "действие") return "turn.action";
            if (time == "1 bonus action" || time == "bonus action" ||
                time == "1 бонусное действие" || time == "бонусное действие") return "turn.bonus";
            if (time == "1 reaction" || time == "reaction" ||
                time == "1 реакция" || time == "реакция") return "turn.reaction";
            return null;
        }

        public static void Cast(JObject hero, JObject spell, int slotLevel)
        {
            Cast(hero, spell, slotLevel, false);
        }

        public static void Cast(JObject hero, JObject spell, int slotLevel, bool pactMagic)
        {
            if (hero == null || spell == null) throw new FormatException("Заклинание не выбрано");
            string action = ActionResource(spell);
            if (action == null) throw new FormatException("Неизвестное время накладывания: требуется ручной режим");
            int level = (int?)spell["level"] ?? -1;
            if (level < 0 || level > 9) throw new FormatException("Неизвестный круг заклинания");
            if (level == 0 && (slotLevel != 0 || pactMagic) || level > 0 && (slotLevel < level || slotLevel > 9))
                throw new FormatException("Неподходящий круг ячейки");

            var copy = (JObject)hero.DeepClone();
            CharacterResourceEngine.EnsureTurnResources(copy);
            if (level > 0)
            {
                if (pactMagic)
                {
                    var pact = copy["pactMagicData"] as JObject ?? copy["pactMagic"] as JObject;
                    if (pact == null || !CharacterSheetRules.TrySheetCount(pact["slotLevel"], out int pactLevel) ||
                        pactLevel != slotLevel)
                        throw new FormatException("Круг ячейки договора не совпадает");
                    CharacterSheetRules.ChangePactUse(copy, 1);
                }
                else
                {
                    var slot = (copy["spellSlotsData"] as JObject)?[slotLevel.ToString()] as JObject;
                    if (slot == null || !CharacterSheetRules.TrySheetCount(slot["max"], out int max) ||
                        !CharacterSheetRules.TrySheetCount(slot["used"], out int used) ||
                        used >= max) throw new FormatException("Нет свободной ячейки выбранного круга");
                    CharacterSheetRules.ChangeSpellUse(copy, slotLevel, 1);
                }
            }
            if (!CharacterResourceEngine.TrySpend(copy,
                new Dictionary<string, int> { [action] = 1 }))
                throw new FormatException("Нет доступного действия для заклинания");

            // Commit only after all validations pass.
            hero[CharacterResourceEngine.StateKey] = copy[CharacterResourceEngine.StateKey].DeepClone();
            hero[CharacterResourceEngine.DefinitionsKey] = copy[CharacterResourceEngine.DefinitionsKey].DeepClone();
            if (level > 0 && !pactMagic) hero["spellSlotsData"] = copy["spellSlotsData"].DeepClone();
            if (pactMagic)
                foreach (string key in new[] { "pactMagicData", "pactMagic" })
                    if (copy[key] != null) hero[key] = copy[key].DeepClone();
        }
    }
}
