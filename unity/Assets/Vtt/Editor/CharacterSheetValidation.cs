using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;
using DndVtt.UnityPrototype;

public static class CharacterSheetValidation
{
    private static void Check(bool condition, string message) { if (!condition) throw new Exception("VTT_SHEET_FAIL: " + message); }
    [MenuItem("DnD VTT/Migration/Validate character sheet")]
    public static void Validate()
    {
        var golden = JObject.Parse(File.ReadAllText("Assets/Vtt/Tests/sheet-contract.json")); int cases = 0;
        var nullable = new LegacyCharacterArchive("{\"id\":\"nullable\",\"stats\":null,\"skillsData\":null}").Snapshot(0);
        Check(CharacterSheetRules.Modifier(nullable, "str") == 0 && CharacterSheetRules.Skill(nullable, 0) == 0, "legacy null collections");
        foreach (JObject test in (JArray)golden["cases"])
        {
            var hero = (JObject)test["hero"].DeepClone();
            Check(CharacterSheetRules.Proficiency(hero) == (int)test["proficiency"], "JS proficiency " + hero["id"]);
            foreach (var stat in CharacterSheetRules.Stats) Check(CharacterSheetRules.Modifier(hero, stat) == (int)test["modifiers"][stat], "JS modifier " + stat);
            CharacterSheetRules.Recalculate(hero);
            for (int i = 0; i < 18; i++)
            {
                Check(CharacterSheetRules.Skill(hero, i) == (int)test["totals"][i], "JS skill " + i);
                Check(JToken.DeepEquals(hero["skills"], test["hero"]["skills"]), "JS proficiency aliases");
                Check((int)hero["skillValues"][CharacterSheetRules.SkillIds[i]] == (int)test["totals"][i], "skill totals persisted");
            }
            cases++;
        }
        const string fixture = "{\"wrapperUnknown\":{\"v\":7},\"characters\":[{\"id\":\"a\",\"schemaVersion\":3,\"name\":\"Герой\",\"hp\":{\"current\":0,\"max\":20,\"temp\":2},\"inventory\":{\"junk\":[{\"name\":\"Сумка\",\"contents\":[{\"name\":\"Ключ\",\"custom\":true}]}]},\"resources\":{\"tarot\":{\"remaining\":3}},\"classFeaturesState\":{\"pending\":{\"sourceId\":\"a\"}},\"spellsData\":[{\"name\":\"Щит\",\"level\":1,\"prepared\":true}],\"folders\":[{\"id\":\"f1\",\"name\":\"Записи\",\"notes\":[{\"id\":1,\"title\":\"Сюжет\",\"text\":\"Исходный текст\"}]}],\"unknown\":[1,true,null]},{\"id\":\"b\",\"name\":\"Другой\"}]}";
        var archive = new LegacyCharacterArchive(fixture); var before = archive.Snapshot(0); var other = archive.Snapshot(1);
        var edit = archive.Snapshot(0); edit["name"] = "Изменено"; edit["hpCurrent"] = 5;
        edit["folders"][0]["notes"][0]["text"] = "Изменённый текст\nВторая строка";
        archive.Replace(0, edit);
        var roundtrip = new LegacyCharacterArchive(archive.Export());
        Check(roundtrip.Name(0) == "Изменено" && roundtrip.CurrentHp(0) == 5 && roundtrip.MaximumHp(0) == 20, "edited canonical HP / legacy maximum");
        foreach (string key in new[] { "inventory", "resources", "classFeaturesState", "spellsData", "unknown", "hp" }) Check(JToken.DeepEquals(before[key], roundtrip.Snapshot(0)[key]), "unknown/legacy/state survival " + key);
        Check(JToken.DeepEquals(other, roundtrip.Snapshot(1)), "other character intact");
        Check((int)JObject.Parse(archive.Export())["wrapperUnknown"]["v"] == 7 && archive.OriginalJson == fixture, "wrapper and source intact");
        string valid = archive.Export(); var invalid = archive.Snapshot(0); invalid["schemaVersion"] = 99;
        bool rejected = false; try { archive.Replace(0, invalid); } catch (FormatException) { rejected = true; }
        Check(rejected && archive.Export() == valid, "transaction rollback");
        invalid = archive.Snapshot(0); invalid["id"] = "changed"; rejected = false;
        try { archive.Replace(0, invalid); } catch (FormatException) { rejected = true; }
        Check(rejected && archive.Export() == valid, "identity protection");
        foreach (string json in new[] { "{\"id\":\"single\",\"unknown\":true}", "[{\"id\":\"array\",\"unknown\":true}]" })
        {
            var a = new LegacyCharacterArchive(json); var c = a.Snapshot(0); c["name"] = "Редактирование"; a.Replace(0, c);
            Check(new LegacyCharacterArchive(a.Export()).Name(0) == "Редактирование" && (bool)a.Snapshot(0)["unknown"], "single/array edit");
        }
        string directory = Path.Combine(Path.GetTempPath(), "vtt-sheet-test-" + Guid.NewGuid()); string path = Path.Combine(directory, "profiles.json");
        try
        {
            CharacterSheetStore.Save(path, archive); Check(CharacterSheetStore.Load(path).Export() == archive.Export(), "disk reload");
            var next = archive.Snapshot(0); next["name"] = "После перезапуска"; archive.Replace(0, next); CharacterSheetStore.Save(path, archive);
            Check(CharacterSheetStore.Load(path).Name(0) == "После перезапуска" && CharacterSheetStore.Load(path + ".bak").Name(0) == "Изменено", "atomic replacement/backup");
        }
        finally { if (Directory.Exists(directory)) Directory.Delete(directory, true); }
        var catalog = JObject.Parse(File.ReadAllText("Assets/Vtt/Resources/CharacterSheet/catalog.json"));
        Check(((JArray)catalog["spells"]).Count == 402, "main spell catalogue");
        Check(((JObject)catalog["items"]).Properties().Sum(p => ((JArray)p.Value).Count) == 188, "main item catalogues");
        foreach (JObject test in (JArray)golden["inventoryCases"])
        {
            var hero = (JObject)test["input"].DeepClone(); string category = (string)test["category"]; var item = (JObject)test["item"];
            CharacterSheetRules.AddInventory(hero, category, (string)item["name"], 1, item);
            CharacterSheetRules.AddInventory(hero, category, (string)item["name"], 2, item);
            Check(JToken.DeepEquals(hero, test["stacked"]), "actual JS add/stack " + category);
            CharacterSheetRules.AddInventory(hero, category, "Кастомный предмет", 1, new JObject { ["weight"] = "1,5 кг", ["unknown"] = 17 });
            var record = hero["inventory"][category][0];
            CharacterSheetRules.RemoveRecord(hero, record.Path, record.ToString(Newtonsoft.Json.Formatting.None));
            Check(JToken.DeepEquals(hero, test["removed"]), "actual JS inventory removal " + category);
            string unchanged = hero.ToString(); bool refused = false;
            try { CharacterSheetRules.AddInventory(hero, "invalid", "Item", 1, null); } catch (FormatException) { refused = true; }
            Check(refused && hero.ToString() == unchanged, "invalid category no mutation");
            var remaining = hero["inventory"][category][0]; string signature = remaining.ToString(Newtonsoft.Json.Formatting.None);
            remaining["unknown"] = 18; unchanged = hero.ToString(); refused = false;
            try { CharacterSheetRules.RemoveRecord(hero, remaining.Path, signature); } catch (InvalidOperationException) { refused = true; }
            Check(refused && hero.ToString() == unchanged, "stale delete confirmation no mutation");
        }
        foreach (JObject test in (JArray)golden["folderCases"])
        {
            var hero = (JObject)test["input"].DeepClone(); var record = hero["folders"][0];
            CharacterSheetRules.RemoveRecord(hero, record.Path, record.ToString(Newtonsoft.Json.Formatting.None));
            Check(JToken.DeepEquals(hero, test["expected"]), "actual JS folder deletion / active selection");
        }
        {
            var hero = (JObject)golden["noteCase"]["input"].DeepClone(); var record = hero["folders"][0]["notes"][0];
            CharacterSheetRules.RemoveRecord(hero, record.Path, record.ToString(Newtonsoft.Json.Formatting.None));
            Check(JToken.DeepEquals(hero, golden["noteCase"]["expected"]), "actual JS note deletion preserves other folders");
        }
        foreach (JObject test in (JArray)golden["weightCases"]) Check(Math.Abs(CharacterSheetRules.WeightKg(test["input"]) - (double)test["expected"]) < 1e-6, "actual JS weight parser " + test["input"]);
        Check(Math.Abs(CharacterSheetRules.InventoryWeightKg((JObject)golden["weightHero"]) - (double)golden["weightTotal"]["totalWeightKg"]) < 1e-6, "actual JS inventory weight including fractional/zero quantity");
        Check(Math.Abs(CharacterSheetRules.CapacityKg((JObject)golden["weightHero"]) - (double)golden["weightTotal"]["maxCapacityKg"]) < 1e-6, "actual JS carrying capacity");
        using var sha = System.Security.Cryptography.SHA256.Create();
        foreach (JObject source in (JArray)golden["sources"])
        {
            var bytes = File.ReadAllBytes(Path.Combine("..", (string)source["file"]));
            string digest = BitConverter.ToString(sha.ComputeHash(bytes)).Replace("-", "").ToLowerInvariant();
            Check(digest == (string)source["sha256"], "JS fixture provenance " + source["file"]);
        }
        Debug.Log("VTT_SHEET_PASS: " + cases + " JS golden cases; 18 skills, modifiers/proficiency, single/array/wrapped editing, rollback, identity/unknown/class-state preservation, atomic save/reload/backup; 402 spells");
        Debug.Log("VTT_SHEET_RECORDS_PASS: 188 items; actual JS 5-category add/stack/remove, folder/note deletion and active selection, stale/invalid mutation rejection, 12 weight parser cases / total / capacity");
    }
}
