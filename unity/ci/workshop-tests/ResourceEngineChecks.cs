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
        var walker = new JObject { ["speed"] = "30 футов" };
        CharacterResourceEngine.EnsureTurnResources(walker);
        Check((int)walker["resourceState"]["turn.movement"]["current"] == 30, "movement initialized");
        Check(CharacterResourceEngine.TrySpend(walker, new Dictionary<string,int> {
            ["turn.movement"] = 5 }), "movement consumed");
        Check((int)walker["resourceState"]["turn.movement"]["current"] == 25, "movement remaining");
        Check(CharacterResourceEngine.EndTurn(walker), "movement turn ended");
        Check((int)walker["resourceState"]["turn.movement"]["current"] == 30, "movement restored");
        var custom = new JObject { ["speed"] = "30 ft, fly 60 ft" };
        CharacterResourceEngine.EnsureTurnResources(custom);
        Check(custom["resourceState"]["turn.movement"] == null, "complex movement not guessed");
        var spell = new JObject { ["level"] = 1, ["castingTime"] = "1 action" };
        walker["spellSlotsData"] = JObject.Parse("{'1':{'max':2,'used':0}}");
        CharacterSpellCasting.Cast(walker, spell, 1);
        Check((int)walker["resourceState"]["turn.action"]["current"] == 0, "spell spends action");
        Check((int)walker["spellSlotsData"]["1"]["used"] == 1, "spell spends slot");
        string saved = walker.ToString();
        bool spellRejected = false;
        try { CharacterSpellCasting.Cast(walker, spell, 1); }
        catch (FormatException) { spellRejected = true; }
        Check(spellRejected && walker.ToString() == saved, "spell failure atomic");
        return checks;
    }
}
