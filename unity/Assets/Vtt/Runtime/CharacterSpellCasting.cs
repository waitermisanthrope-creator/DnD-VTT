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

        public static bool EndConcentration(JObject hero)
        {
            if (hero == null || hero["concentratingOn"] == null ||
                hero["concentratingOn"].Type == JTokenType.Null) return false;
            hero.Remove("concentratingOn");
            return true;
        }

        // Concentration save DC after taking damage: max(10, half damage).
        // Saving throw itself is performed by the combat engine.
        public static int ConcentrationDifficulty(int damage)
        {
            if (damage < 0) throw new FormatException("Урон не может быть отрицательным");
            return Math.Max(10, damage / 2);
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

            if ((string)hero["turnPhase"] == "ended")
                throw new FormatException("Ход завершён. Начните следующий ход");
            var copy = (JObject)hero.DeepClone();
            CharacterResourceEngine.EnsureTurnResources(copy);
            string rules = ((string)(copy["rulesVersion"] ?? copy["ruleset"]) ?? "2014").Trim();
            if (rules != "2014" && rules != "2024")
                throw new FormatException("Неизвестная редакция правил: " + rules);
            var history = copy["turnSpellcasting"] as JObject ?? new JObject();
            bool bonusCast = action == "turn.bonus";
            bool oneActionCantrip = level == 0 && action == "turn.action";
            if (rules == "2014")
            {
                // A bonus-action spell prohibits other spells except
                // one-action cantrips on that same turn.
                if (bonusCast && (bool?)history["incompatibleWithBonus"] == true ||
                    (bool?)history["bonusCast"] == true && !oneActionCantrip)
                    throw new FormatException("Ограничение бонусного заклинания (2014)");
            }
            else if (level > 0 && (bool?)history["slotCast"] == true)
                throw new FormatException("В этом ходу уже потрачена ячейка на заклинание (2024)");
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

            // Starting a new concentration spell replaces the previous one.
            // The actual duration and concentration saving throws are handled
            // by the future effect/combat engine.
            bool concentration = (bool?)spell["concentration"] == true;
            if (concentration)
                copy["concentratingOn"] = new JObject {
                    ["id"] = spell["id"]?.DeepClone() ?? JValue.CreateNull(),
                    ["name"] = spell["name"]?.DeepClone() ?? JValue.CreateNull()
                };

            if (bonusCast) history["bonusCast"] = true;
            if (!oneActionCantrip) history["incompatibleWithBonus"] = true;
            if (level > 0) history["slotCast"] = true;
            copy["turnSpellcasting"] = history;

            // Commit only after all validations pass.
            hero["turnSpellcasting"] = copy["turnSpellcasting"].DeepClone();
            if (concentration) hero["concentratingOn"] = copy["concentratingOn"].DeepClone();
            hero[CharacterResourceEngine.StateKey] = copy[CharacterResourceEngine.StateKey].DeepClone();
            hero[CharacterResourceEngine.DefinitionsKey] = copy[CharacterResourceEngine.DefinitionsKey].DeepClone();
            if (level > 0 && !pactMagic) hero["spellSlotsData"] = copy["spellSlotsData"].DeepClone();
            if (pactMagic)
                foreach (string key in new[] { "pactMagicData", "pactMagic" })
                    if (copy[key] != null) hero[key] = copy[key].DeepClone();
        }
    }
}
