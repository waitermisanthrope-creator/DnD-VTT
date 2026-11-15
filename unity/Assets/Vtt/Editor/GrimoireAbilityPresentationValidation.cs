using System;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;

// Pure presentation contracts: filtering must never mutate a character or
// silently assign an unknown imported feature to an action economy category.
public static class GrimoireAbilityPresentationValidation
{
    private static void Check(bool condition, string message)
    {
        if (!condition) throw new Exception("VTT_GRIMOIRE_ABILITIES_FAIL: " + message);
    }

    public static void Validate()
    {
        var action = new JObject { ["name"] = "Удар", ["actionType"] = "action" };
        var bonus = new JObject { ["name"] = "Второе дыхание", ["activation"] = "bonus action" };
        var reaction = new JObject { ["name"] = "Защита", ["actionEconomy"] = "реакция" };
        var unknown = new JObject { ["name"] = "Неизвестная способность" };
        Check(LegacySessionPanel.GrimoireAbilityMatches(action, 0), "all includes actions");
        Check(LegacySessionPanel.GrimoireAbilityMatches(action, 1), "action category");
        Check(!LegacySessionPanel.GrimoireAbilityMatches(action, 2), "action is not bonus");
        Check(LegacySessionPanel.GrimoireAbilityMatches(bonus, 2), "bonus category");
        Check(LegacySessionPanel.GrimoireAbilityMatches(reaction, 3), "reaction category");
        Check(LegacySessionPanel.GrimoireAbilityMatches(unknown, 0), "untyped kept in all");
        Check(!LegacySessionPanel.GrimoireAbilityMatches(unknown, 1) &&
              !LegacySessionPanel.GrimoireAbilityMatches(unknown, 2) &&
              !LegacySessionPanel.GrimoireAbilityMatches(unknown, 3), "untyped not invented");

        var spell = new JObject
        {
            ["name"] = "Огненный шар", ["level"] = 3,
            ["description"] = "Огненная вспышка"
        };
        string original = spell.ToString(Newtonsoft.Json.Formatting.None);
        Check(LegacySessionPanel.GrimoireSpellMatches(spell, "", -1), "empty search");
        Check(LegacySessionPanel.GrimoireSpellMatches(spell, "ШАР", 3), "case insensitive title");
        Check(LegacySessionPanel.GrimoireSpellMatches(spell, "вспышка", 3), "description search");
        Check(!LegacySessionPanel.GrimoireSpellMatches(spell, "шар", 1), "circle filter");
        Check(!LegacySessionPanel.GrimoireSpellMatches(spell, "щит", 3), "not matched");
        Check(!LegacySessionPanel.GrimoireSpellMatches(null, "", -1), "null ignored");
        Check(spell.ToString(Newtonsoft.Json.Formatting.None) == original, "pure presentation no mutation");
        UnityEngine.Debug.Log("VTT_GRIMOIRE_ABILITIES_PRESENTATION_PASS");
    }
}
