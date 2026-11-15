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
        Check((int)hero["resourceState"]["turn.action"]["current"] == 0, "action remains spent after end");
        Check(CharacterResourceEngine.StartTurn(hero), "next turn starts");
        Check((int)hero["resourceState"]["turn.action"]["current"] == 1, "action restored at start");
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
        Check((int)walker["resourceState"]["turn.movement"]["current"] == 25, "movement stays spent until start");
        Check(CharacterResourceEngine.StartTurn(walker), "walker starts next turn");
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
        var extraHero = new JObject();
        CharacterResourceEngine.EnsureTurnResources(extraHero);
        Check(CharacterResourceEngine.GrantExtraAction(extraHero, 1), "extra action granted");
        Check((int)extraHero["resourceState"]["turn.extra_action"]["current"] == 1, "extra action available");
        Check(CharacterResourceEngine.TrySpend(extraHero, new Dictionary<string,int> {
            ["turn.extra_action"] = 1 }), "extra action consumed");
        Check((int)extraHero["resourceState"]["turn.action"]["current"] == 1,
            "normal action not consumed");
        Check(CharacterResourceEngine.GrantExtraAction(extraHero, 1), "extra action granted again");
        Check(CharacterResourceEngine.EndTurn(extraHero), "extra action turn transition");
        Check((int)extraHero["resourceState"]["turn.extra_action"]["current"] == 0,
            "extra action expires");
        Check(!CharacterResourceEngine.TrySpend(extraHero, new Dictionary<string,int> {
            ["turn.extra_action"] = 1 }), "expired action cannot be used");
        var reactive = new JObject();
        CharacterResourceEngine.EnsureTurnResources(reactive);
        Check(CharacterResourceEngine.TrySpend(reactive, new Dictionary<string,int> {
            ["turn.reaction"] = 1 }), "reaction spent");
        Check(CharacterResourceEngine.EndTurn(reactive), "reaction turn ended");
        Check((int)reactive["resourceState"]["turn.reaction"]["current"] == 0,
            "reaction does not refresh at end");
        Check(CharacterResourceEngine.StartTurn(reactive), "reaction next turn started");
        Check((int)reactive["resourceState"]["turn.reaction"]["current"] == 1,
            "reaction refreshes at start");
        var concentrationSpell = new JObject {
            ["id"] = "spell.focus", ["name"] = "Focus", ["level"] = 0,
            ["castingTime"] = "1 action", ["concentration"] = true
        };
        CharacterSpellCasting.Cast(reactive, concentrationSpell, 0);
        Check((string)reactive["concentratingOn"]["id"] == "spell.focus",
            "concentration recorded");
        var mage2014 = new JObject {
            ["rulesVersion"] = "2014",
            ["spellSlotsData"] = JObject.Parse("{'1':{'max':3,'used':0}}")
        };
        CharacterResourceEngine.EnsureTurnResources(mage2014);
        var bonusSpell = new JObject { ["level"] = 1, ["castingTime"] = "1 bonus action" };
        CharacterSpellCasting.Cast(mage2014, bonusSpell, 1);
        string afterBonus = mage2014.ToString();
        bool blocked = false;
        try { CharacterSpellCasting.Cast(mage2014, new JObject {
            ["level"] = 1, ["castingTime"] = "1 action"
        }, 1); } catch (FormatException) { blocked = true; }
        Check(blocked && mage2014.ToString() == afterBonus, "2014 bonus spell prevents action leveled spell");
        CharacterSpellCasting.Cast(mage2014, new JObject {
            ["level"] = 0, ["castingTime"] = "1 action"
        }, 0);
        Check((int)mage2014["resourceState"]["turn.action"]["current"] == 0,
            "2014 one-action cantrip permitted after bonus spell");
        var mage2024 = new JObject {
            ["rulesVersion"] = "2024",
            ["spellSlotsData"] = JObject.Parse("{'1':{'max':3,'used':0}}")
        };
        CharacterResourceEngine.EnsureTurnResources(mage2024);
        CharacterSpellCasting.Cast(mage2024, new JObject {
            ["level"] = 1, ["castingTime"] = "1 bonus action"
        }, 1);
        string after2024 = mage2024.ToString();
        blocked = false;
        try { CharacterSpellCasting.Cast(mage2024, new JObject {
            ["level"] = 1, ["castingTime"] = "1 action"
        }, 1); } catch (FormatException) { blocked = true; }
        Check(blocked && mage2024.ToString() == after2024, "2024 second slot spell rejected atomically");
        Check(CharacterResourceEngine.EndTurn(mage2024), "2024 turn ends");
        Check(CharacterResourceEngine.StartTurn(mage2024), "2024 next turn starts");
        Check(mage2024["turnSpellcasting"] is JObject &&
            !((JObject)mage2024["turnSpellcasting"]).HasValues, "spell casting history resets");
        var fighter = new JObject {
            ["combatAbilities"] = new JArray(new JObject {
                ["id"] = "surge", ["actionType"] = "action",
                ["maxUses"] = 1, ["usedCount"] = 0
            })
        };
        CharacterResourceEngine.EnsureTurnResources(fighter);
        var surge = (JObject)((JArray)fighter["combatAbilities"])[0];
        CharacterAbilityActivation.Activate(fighter, surge);
        Check((int)fighter["resourceState"]["turn.action"]["current"] == 0,
            "ability spends action");
        Check((int)fighter["combatAbilities"][0]["usedCount"] == 1,
            "ability spends charge");
        string fighterSaved = fighter.ToString();
        bool fighterRejected = false;
        try { CharacterAbilityActivation.Activate(fighter,
            (JObject)fighter["combatAbilities"][0]); }
        catch (FormatException) { fighterRejected = true; }
        Check(fighterRejected && fighter.ToString() == fighterSaved,
            "ability failure leaves all counters unchanged");
        var hb = new JObject();
        Check(CharacterAbilityActivation.ImportDefinitions(hb, new JArray(new JObject {
            ["id"] = "hb.energy", ["max"] = 3, ["restoreOn"] = new JArray("short")
        })) == 1, "HB resource imported");
        Check(CharacterResourceEngine.TrySpend(hb, new Dictionary<string,int> {
            ["hb.energy"] = 2 }), "HB resource spent");
        Check(CharacterAbilityActivation.ImportDefinitions(hb, new JArray(new JObject {
            ["id"] = "hb.energy", ["max"] = 3
        })) == 0, "HB import idempotent");
        Check((int)hb["resourceState"]["hb.energy"]["current"] == 1,
            "HB reimport preserves spent charges");
        var legacyHero = new JObject {
            ["resources"] = new JObject {
                ["ki"] = new JObject { ["max"] = 3, ["current"] = 2 }
            },
            ["combatAbilities"] = new JArray(new JObject {
                ["id"] = "flurry", ["actionType"] = "bonus",
                ["resourceId"] = "ki", ["resourceCost"] = 1,
                ["maxUses"] = 2, ["usedCount"] = 0
            })
        };
        CharacterResourceEngine.EnsureTurnResources(legacyHero);
        CharacterAbilityActivation.Activate(legacyHero,
            (JObject)legacyHero["combatAbilities"][0]);
        Check((int)legacyHero["resources"]["ki"]["current"] == 1,
            "legacy resource charged exactly once");
        Check(legacyHero["resourceState"]["ki"] == null,
            "no shadow resource counter");
        Check((int)legacyHero["resourceState"]["turn.bonus"]["current"] == 0,
            "legacy ability consumes bonus action");
        string legacySnapshot = legacyHero.ToString();
        bool legacyRejected = false;
        try { CharacterAbilityActivation.Activate(legacyHero,
            (JObject)legacyHero["combatAbilities"][0]); }
        catch (FormatException) { legacyRejected = true; }
        Check(legacyRejected && legacyHero.ToString() == legacySnapshot,
            "failed legacy activation atomic");
        var formulaHero = new JObject {
            ["level"] = 9,
            ["stats"] = new JObject { ["wis"] = 18 }
        };
        Check(CharacterAbilityActivation.ImportDefinitions(formulaHero,
            new JArray(new JObject {
                ["id"] = "hb.proficiency", ["maxFormula"] = "proficiency",
                ["restoreOn"] = new JArray("short")
            }, new JObject {
                ["id"] = "hb.wisdom", ["maxFormula"] = "modifier:wis",
                ["minimum"] = 1, ["restoreOn"] = new JArray("long")
            })) == 2, "HB formula resources imported");
        Check((int)formulaHero["resourceState"]["hb.proficiency"]["current"] == 4,
            "proficiency formula evaluated");
        Check((int)formulaHero["resourceState"]["hb.wisdom"]["current"] == 4,
            "ability modifier formula evaluated");
        Check(CharacterResourceEngine.TrySpend(formulaHero, new Dictionary<string,int> {
            ["hb.proficiency"] = 2 }), "formula resource spent");
        formulaHero["level"] = 13;
        Check(CharacterAbilityActivation.RefreshFormulaResources(formulaHero),
            "level-based maximum refreshed");
        Check((int)formulaHero["resourceState"]["hb.proficiency"]["current"] == 2,
            "level-up does not refill spent charges");
        Check((int)formulaHero["resourceDefinitions"][0]["max"] == 5,
            "proficiency maximum advances");
        var effectHero = new JObject();
        CharacterResourceEngine.EnsureTurnResources(effectHero);
        CharacterTimedEffects.Apply(effectHero, "ward", "Ward", 2);
        Check(CharacterResourceEngine.EndTurn(effectHero), "first effect turn ends");
        Check((int)effectHero["timedEffects"][0]["roundsRemaining"] == 1,
            "effect duration decremented");
        Check(CharacterResourceEngine.StartTurn(effectHero), "effect turn starts");
        Check(CharacterResourceEngine.EndTurn(effectHero), "second effect turn ends");
        Check(((JArray)effectHero["timedEffects"]).Count == 0,
            "expired effect removed");
        CharacterTimedEffects.Apply(effectHero, "focus", "Focus", 3, true);
        effectHero["concentratingOn"] = new JObject { ["id"] = "focus" };
        Check(!CharacterSpellCasting.ResolveConcentrationSave(effectHero, 30, 14),
            "failed concentration save");
        Check(effectHero["concentratingOn"] == null &&
            ((JArray)effectHero["timedEffects"]).Count == 0,
            "failed save removes concentration and associated effects");
        var complexHero = new JObject {
            ["level"] = 9, ["stats"] = new JObject { ["wis"] = 18 }
        };
        Check(CharacterAbilityActivation.ImportDefinitions(complexHero,
            new JArray(new JObject {
                ["id"] = "hb.complex", ["maxFormula"] = "max(1, floor(level / 2) + modifier:wis)",
                ["restoreOn"] = new JArray("short")
            })) == 1, "complex HB formula imports");
        Check((int)complexHero["resourceState"]["hb.complex"]["current"] == 8,
            "nested HB expression evaluates");
        string formulaSnapshot = complexHero.ToString();
        bool unsafeRejected = false;
        try {
            CharacterAbilityActivation.ImportDefinitions(complexHero,
                new JArray(new JObject {
                    ["id"] = "hb.bad", ["maxFormula"] = "max(3, 4 / 0)"
                }));
        } catch (FormatException) { unsafeRejected = true; }
        Check(unsafeRejected && complexHero.ToString() == formulaSnapshot,
            "invalid HB formula rejected atomically");
        return checks;
    }
}
