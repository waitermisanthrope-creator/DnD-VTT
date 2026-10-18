using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEditor.SceneManagement;
using UnityEngine;
using DndVtt.UnityPrototype;

public static class LegacyMigrationSetup
{
    public const string ScenePath = "Assets/Vtt/Scenes/ImportedAdventure.unity";
    private const string Content = "Assets/LegacyContent/";
    private static void Check(bool ok, string message) { if (!ok) throw new Exception("VTT_MIGRATION_CHECK_FAIL: " + message); }
    private static void Reject(Action action, string reason) { try { action(); } catch (FormatException) { return; } catch (Newtonsoft.Json.JsonException) { return; } throw new Exception("Expected rejection: " + reason); }
    [MenuItem("DnD VTT/Migration/Validate data contracts")]
    public static void ValidateContracts()
    {
        CharacterSheetValidation.Validate();
        var previousCulture = System.Globalization.CultureInfo.CurrentCulture;
        try
        {
            foreach (string name in new[] { "ru-RU", "en-US", "fr-FR" })
            {
                System.Globalization.CultureInfo.CurrentCulture = System.Globalization.CultureInfo.GetCultureInfo(name);
                Check(Math.Abs(LegacyJson.Number(JToken.Parse("2.7")) - 2.7f) < .0001f, "culture-independent decimals " + name);
            }
        }
        finally { System.Globalization.CultureInfo.CurrentCulture = previousCulture; }
        var fixture = new LegacyCharacterArchive(LegacyMigrationSmoke.Fixture);
        Check(fixture.CurrentHp(0) == 17 && fixture.MaximumHp(0) == 24 && fixture.TemporaryHp(0) == 0, "canonical HP projection");
        Check(fixture.OriginalJson == LegacyMigrationSmoke.Fixture, "exact input preservation");
        var detached = fixture.Snapshot(0); detached["resources"]["tarot"]["remaining"] = 999;
        Check((int)fixture.Snapshot(0)["resources"]["tarot"]["remaining"] == 3, "snapshot isolation");
        var legacy = new LegacyCharacterArchive("{\"characters\":[{\"id\":1,\"hp\":{\"current\":0,\"max\":19,\"temp\":4},\"unknown\":[1,2]}],\"wrapperUnknown\":true}");
        Check(legacy.CurrentHp(0) == 0 && legacy.MaximumHp(0) == 19 && legacy.TemporaryHp(0) == 4, "legacy HP/wrapper");
        Check(JToken.DeepEquals(LegacyJson.Parse(legacy.OriginalJson), LegacyJson.Parse(new LegacyCharacterArchive(legacy.OriginalJson).OriginalJson)), "unknown fields survive reload");
        var numeric = new LegacyCharacterArchive("[{\"id\":\"n\",\"hp\":8,\"maxHp\":12,\"tempHp\":2},{\"id\":\"p\",\"hpCurrent\":0,\"hp\":9}]");
        Check(numeric.Count == 2 && numeric.CurrentHp(0) == 8 && numeric.MaximumHp(0) == 12 && numeric.TemporaryHp(0) == 2 && numeric.CurrentHp(1) == 0, "legacy numeric HP / canonical zero priority");
        Reject(() => new LegacyCharacterArchive("{\"id\":\"x\",\"schemaVersion\":4}"), "future schema");
        Reject(() => new LegacyCharacterArchive("[{\"id\":\"x\"},{\"id\":\"x\"}]"), "duplicate identity");
        Reject(() => new LegacyCharacterArchive("{\"id\":\"x\",\"id\":\"y\"}"), "duplicate JSON property");
        Reject(() => new LegacyCharacterArchive("[]"), "empty archive");
        Reject(() => new LegacyCharacterArchive("{}"), "missing identity");
        var golden = JArray.Parse(File.ReadAllText(Content + "geometry-contract.json"));
        foreach (JObject expected in golden)
        {
            var map = new LegacyMapDocument(File.ReadAllText(Content + "Source/app/data/maps/" + expected["key"]));
            Check(map.FloorCount == ((JArray)expected["floors"]).Count, "floor count " + expected["key"]);
            for (int i = 0; i < map.FloorCount; i++) Check(Mathf.Abs(map.BaseHeight(i) - (float)expected["floors"][i]["base"]) < .0001f && ((JObject)map.Floors[i]["tiles"]).Count == (int)expected["floors"][i]["tiles"], "JS floor contract " + expected["key"]);
            Check(JToken.DeepEquals(map.Snapshot, LegacyJson.Parse(map.OriginalJson)), "map preservation");
        }
        Reject(() => new LegacyMapDocument("{\"version\":3}"), "future map");
        Reject(() => LegacyMapDocument.Cell("1,NaN"), "invalid coordinate");
        Check(LegacyMapDocument.Cell("-2,-1") == (-2, -1), "signed cells");
        var manifest = JObject.Parse(File.ReadAllText(Content + "provenance.json"));
        using var hash = SHA256.Create();
        foreach (JObject file in (JArray)manifest["files"])
        {
            string copied = Content + "Source/" + file["destination"], source = Path.Combine("..", (string)file["path"]);
            string Digest(string path) => BitConverter.ToString(hash.ComputeHash(File.ReadAllBytes(path))).Replace("-", "").ToLowerInvariant();
            bool text = new[] { ".json", ".gltf", ".txt", ".md" }.Contains(Path.GetExtension(source).ToLowerInvariant());
            bool sameSource = text ? File.ReadAllText(source).Replace("\r\n", "\n") == File.ReadAllText(copied).Replace("\r\n", "\n") : Digest(source) == (string)file["sha256"];
            Check(Digest(copied) == (string)file["sha256"] && sameSource, "content provenance " + file["path"]);
        }
        foreach (JObject file in (JArray)manifest["derived"])
        {
            string path = Content + "Source/" + file["destination"];
            Check(BitConverter.ToString(hash.ComputeHash(File.ReadAllBytes(path))).Replace("-", "").ToLowerInvariant() == (string)file["sha256"], "derived content provenance");
            var model = JObject.Parse(File.ReadAllText(path)); Check(model["skins"] == null && model["animations"] == null, "static furniture derivative");
        }
        Debug.Log("VTT_MIGRATION_CONTRACT_PASS: canonical/legacy HP, unknown fields, rejection/isolation, 9 JS map contracts, signed coordinates, source/copy SHA256");
    }
    private static LegacyContentCatalog Catalog()
    {
        var manifest = JObject.Parse(File.ReadAllText(Content + "provenance.json"));
        var catalog = AssetDatabase.LoadAssetAtPath<LegacyContentCatalog>(Content + "Catalog.asset");
        if (!catalog) { catalog = ScriptableObject.CreateInstance<LegacyContentCatalog>(); AssetDatabase.CreateAsset(catalog, Content + "Catalog.asset"); }
        catalog.maps = ((JArray)manifest["maps"]).Select(p => new LegacyContentCatalog.MapEntry { key = Path.GetFileName((string)p), json = AssetDatabase.LoadAssetAtPath<TextAsset>(Content + "Source/" + p) }).ToArray();
        catalog.models = ((JArray)manifest["models"]).Select(p => new LegacyContentCatalog.ModelEntry { key = (string)p, prefab = AssetDatabase.LoadAssetAtPath<GameObject>(Content + "Source/" + ((string)p).Replace("./", "")) }).ToArray();
        foreach (var model in catalog.models) Check(model.prefab && model.prefab.GetComponentsInChildren<Renderer>().Length > 0, "glTF prefab missing: " + model.key);
        Directory.CreateDirectory(Content + "Materials");
        var surfaces = new List<LegacyContentCatalog.SurfaceEntry>();
        foreach (string key in ((JArray)manifest["textures"]).Values<string>())
        {
            string path = Content + "Materials/" + key + ".mat"; var material = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (!material) { material = new Material(Shader.Find("Universal Render Pipeline/Lit")); AssetDatabase.CreateAsset(material, path); }
            material.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>(Content + "Source/" + key + ".png"); material.SetFloat("_Smoothness", .1f); EditorUtility.SetDirty(material);
            Check(material.mainTexture, "texture missing " + key); surfaces.Add(new LegacyContentCatalog.SurfaceEntry { key = key, material = material });
        }
        catalog.surfaces = surfaces.ToArray(); EditorUtility.SetDirty(catalog); AssetDatabase.SaveAssets(); return catalog;
    }
    [MenuItem("DnD VTT/Migration/Create imported adventure scene")]
    public static void CreateScene()
    {
        if (EditorSceneManager.GetActiveScene().isDirty) throw new InvalidOperationException("Save current scene before creating imported scene");
        ValidateContracts(); var catalog = Catalog();
        var scene = EditorSceneManager.OpenScene("Assets/Vtt/Scenes/Exploration.unity");
        EditorSceneManager.SaveScene(scene, ScenePath, true); scene = EditorSceneManager.OpenScene(ScenePath);
        foreach (var root in scene.GetRootGameObjects()) if (root.name != "Explorer" && root.name != "Explorer Camera" && root.name != "Sun") UnityEngine.Object.DestroyImmediate(root);
        var hero = UnityEngine.Object.FindFirstObjectByType<ExplorerController>(); hero.showHelp = false;
        var world = new GameObject("Legacy map session").AddComponent<LegacyMapPresenter>(); world.catalog = catalog; world.explorer = hero;
        int tavern = Array.FindIndex(catalog.maps, m => m.key == "3d_tavern_v740019.json");
        Check(world.TryLoad(tavern), world.Error); Check(world.MissingModels == 0 && world.ImportedModels > 0 && world.TileCount == 504 && world.WallCount == 164, "tavern geometry/real models");
        world.SetFloor(1); Check(Mathf.Abs(hero.Spawn.y - 3.65f) < .001f, "upper floor spawn"); world.SetFloor(0);
        var panel = world.gameObject.AddComponent<LegacySessionPanel>(); panel.world = world;
        Check(panel.Import(LegacyMigrationSmoke.Fixture) && panel.ExportOriginal() == LegacyMigrationSmoke.Fixture, "session profile import");
        Check(!panel.Import("{}") && panel.CurrentName == "Fixture hero", "transactional import rejection");
        world.gameObject.AddComponent<LegacyMigrationSmoke>();
        EditorSceneManager.SaveScene(scene, ScenePath);
        EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(ScenePath, true), new EditorBuildSettingsScene("Assets/Vtt/Scenes/Exploration.unity", true) };
        AssetDatabase.SaveAssets(); Debug.Log("VTT_MIGRATION_SCENE_PASS: " + ScenePath + "; models=" + world.ImportedModels + "; tiles=" + world.TileCount + "; walls=" + world.WallCount);
    }
    public static void BuildWindows() { Build(BuildTarget.StandaloneWindows64, "Builds/WindowsMigration/DndVtt.exe"); }
    public static void BuildAndroid() { Build(BuildTarget.Android, "Builds/AndroidMigration/DndVtt-experiment.apk"); }
    private static void Build(BuildTarget target, string path)
    {
        ValidateContracts();
        Check(File.Exists(ScenePath), "Create imported adventure scene first"); Directory.CreateDirectory(Path.GetDirectoryName(path));
        var result = BuildPipeline.BuildPlayer(new[] { ScenePath }, path, target, BuildOptions.Development);
        Check(result.summary.result == BuildResult.Succeeded, "build " + target); Debug.Log("VTT_MIGRATION_BUILD_PASS: " + target);
    }
}
