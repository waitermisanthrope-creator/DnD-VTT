using System;
using System.IO;
using System.Linq;
using DndVtt.UnityPrototype;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

public static class WorkshopEditorValidation
{
    private static void Check(bool condition, string message) { if (!condition) throw new Exception("VTT_WORKSHOP_EDITOR_FAIL: " + message); }
    [MenuItem("DnD VTT/Workshop/Validate published demo integration")]
    public static void Run()
    {
        string fixtures = Path.GetFullPath("WorkshopFixtures~");
        Check(Directory.Exists(fixtures), "Download verified public fixtures to unity/WorkshopFixtures~ first");
        string folder = Path.Combine(Path.GetTempPath(), "vtt-workshop-editor-" + Guid.NewGuid()); Directory.CreateDirectory(folder);
        var originalScene = SceneManager.GetActiveScene();
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Additive); SceneManager.SetActiveScene(scene);
        WorkshopRuntime runtime = null; LegacyMapPresenter world = null; LegacyContentCatalog catalog = null; TextAsset map = null;
        try
        {
            var store = new WorkshopStore(Path.Combine(folder, "packages"));
            var manifests = new JArray();
            foreach (string repo in new[] { "DnD-VTT-Content", "DnD-VTT-Assets" })
            {
                var entries = WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixtures, repo, "catalog/v1/index.json")), repo.EndsWith("Content", StringComparison.Ordinal) ? "packages" : "packs");
                foreach (JObject entry in entries)
                {
                    if ((string)entry["format"] != "json") continue;
                    string stage = Path.Combine(folder, "download"); File.Copy(Path.Combine(fixtures, repo, "packages", Path.GetFileName((string)entry["url"])), stage, true);
                    store.Install(entry, stage, "android-arm64", Application.unityVersion); manifests.Add(entry.DeepClone());
                }
            }
            runtime = new WorkshopRuntime(store); runtime.ActivateData();
            const string modelId = "demo.model.markers.beacon", surfaceId = "demo.appearance.amber.floor";
            Check(runtime.Models.ContainsKey(modelId) && runtime.Surfaces.ContainsKey(surfaceId), "JSON objects/materials activated");
            foreach (var prefab in runtime.Models.Values)
                Check(prefab.GetComponent<Renderer>() && prefab.GetComponent<Collider>(), "primitive renderer and collider exist");
            var tiles = new JObject(); for (int x = 0; x < 4; x++) for (int y = 0; y < 4; y++) tiles[(1000 + x) + "," + (1000 + y)] = "base";
            map = new TextAsset(new JObject { ["version"] = 2, ["schemaVersion"] = 1, ["width"] = 4, ["height"] = 4, ["floors"] = new JArray(new JObject { ["id"] = 0, ["height"] = 3, ["tiles"] = tiles, ["walls"] = new JObject(), ["objects"] = new JArray() }) }.ToString());
            catalog = ScriptableObject.CreateInstance<LegacyContentCatalog>();
            catalog.maps = new[] { new LegacyContentCatalog.MapEntry { key = "workshop-test", json = map } };
            catalog.models = Array.Empty<LegacyContentCatalog.ModelEntry>(); catalog.surfaces = Array.Empty<LegacyContentCatalog.SurfaceEntry>();
            var explorer = new GameObject("Workshop test explorer").AddComponent<ExplorerController>(); explorer.gameObject.layer = 2;
            world = new GameObject("Workshop test map").AddComponent<LegacyMapPresenter>(); world.catalog = catalog; world.explorer = explorer; world.Workshop = runtime;
            world.WorkshopMapStoreOverride = Path.Combine(folder, "map.json");
            Check(world.TryLoad(0), "minimal map loaded: " + world.Error);
            world.PlaceWorkshopObject(modelId); Check(world.ImportedModels == 1 && world.MissingModels == 0, "downloaded object actually instantiated on map");
            world.ApplyWorkshopSurface(surfaceId);
            Check(world.GetComponentsInChildren<Renderer>().Any(r => r.sharedMaterial == runtime.Surfaces[surfaceId]), "downloaded material actually used by renderer");
            string saved = File.ReadAllText(world.WorkshopMapStoreOverride);
            Check(saved.Contains(modelId) && saved.Contains(surfaceId), "stable resource references in saved map");
            world.ClearWorkshopGeometry(); runtime.Dispose(); store.Remove("demo.model.markers");
            runtime = new WorkshopRuntime(new WorkshopStore(store.Root)); runtime.ActivateData(); world.Workshop = runtime; world.RestoreWorkshopMap();
            Check(world.MissingModels == 1 && world.ImportedModels == 0, "missing package restores as placeholder");
            Check(File.ReadAllText(world.WorkshopMapStoreOverride) == saved, "uninstall/restart does not corrupt map save");
            var manifest = manifests.OfType<JObject>().First(m => (string)m["id"] == "demo.model.markers");
            string staged = Path.Combine(folder, "reinstall"); File.Copy(Path.Combine(fixtures, "DnD-VTT-Assets/packages/demo.model.markers.json"), staged);
            store.Install(manifest, staged, "android-arm64", Application.unityVersion);
            world.ClearWorkshopGeometry(); runtime.Dispose(); runtime = new WorkshopRuntime(new WorkshopStore(store.Root)); runtime.ActivateData(); world.Workshop = runtime; world.RestoreWorkshopMap();
            Check(world.ImportedModels == 1 && world.MissingModels == 0, "reinstalled model restores without editing save");
            Check(File.ReadAllText(world.WorkshopMapStoreOverride) == saved, "reinstallation preserves map bytes");
            Debug.Log("VTT_WORKSHOP_EDITOR_PASS: public JSON objects/materials, actual mesh/collider/material use, map placement/save, restart, missing package, reinstallation without save corruption");
        }
        finally
        {
            if (world) world.ClearWorkshopGeometry(); runtime?.Dispose();
            SceneManager.SetActiveScene(originalScene); EditorSceneManager.CloseScene(scene, true);
            if (catalog) UnityEngine.Object.DestroyImmediate(catalog); if (map) UnityEngine.Object.DestroyImmediate(map);
            Directory.Delete(folder, true);
        }
    }
}
