using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;

internal static class ResourceEngineChecks
{
    private static int checks;
    private static void Check(bool ok, string message)
    {
        if (!ok) throw new Exception("Resource engine: " + message);
        checks++;
    }

    internal static int Run()
    {
        checks = 0;
        var hero = new JObject();
        CharacterResourceEngine.EnsureTurnResources(hero);
        Check((int)hero["resourceState"]["turn.action"]["current"] == 1, "initial action");
        Check(CharacterResourceEngine.TrySpend(hero, new Dictionary<string,int> { ["turn.action"] = 1 }), "spend action");
        Check((int)hero["resourceState"]["turn.action"]["current"] == 0, "action consumed");
        string before = hero.ToString();
        Check(!CharacterResourceEngine.TrySpend(hero, new Dictionary<string,int> {
            ["turn.action"] = 1, ["turn.bonus"] = 1 }), "insufficient action rejected");
        Check(hero.ToString() == before, "failed payment is atomic");
        Check(!CharacterResourceEngine.TrySpend(hero, new Dictionary<string,int> {
            ["unknown"] = 0 }), "unknown zero-cost resource rejected");
        Check(CharacterResourceEngine.EndTurn(hero), "turn refresh");
        Check((int)hero["resourceState"]["turn.action"]["current"] == 1, "action restored");
        Check((int)hero["turnNumber"] == 1, "turn counter");
        var definitions = (JArray)hero["resourceDefinitions"];
        definitions.Add(new JObject {
            ["id"] = "hb.mana", ["name"] = "Мана", ["max"] = 5,
            ["restoreOn"] = new JArray("long")
        });
        CharacterResourceEngine.Synchronize(hero);
        Check(CharacterResourceEngine.TrySpend(hero, new Dictionary<string,int> {
            ["hb.mana"] = 3 }), "homebrew spend");
        Check(!CharacterResourceEngine.Restore(hero, "short"), "short rest does not restore long resource");
        Check((int)hero["resourceState"]["hb.mana"]["current"] == 2, "mana retained");
        Check(CharacterResourceEngine.Restore(hero, "long"), "long rest restores mana");
        Check((int)hero["resourceState"]["hb.mana"]["current"] == 5, "mana full");
        before = hero.ToString();
        definitions.Add(new JObject { ["id"] = "hb.mana", ["max"] = 5 });
        bool rejected = false;
        try { CharacterResourceEngine.Synchronize(hero); } catch (FormatException) { rejected = true; }
        Check(rejected, "duplicate resource rejected");
        return checks;
    }
}
