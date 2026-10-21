using System;
using System.IO;
using System.Linq;
using DndVtt.UnityPrototype;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.LowLevel;
using System.Reflection;
using UnityEngine.SceneManagement;

public static class WorkshopEditorValidation
{
    private static void Check(bool condition, string message) { if (!condition) throw new Exception("VTT_WORKSHOP_EDITOR_FAIL: " + message); }
    private static void ValidateMenuTouchBackend()
    {
        if(!Application.isBatchMode)return;
        var prior=Touchscreen.current;var device=InputSystem.AddDevice<Touchscreen>();var go=new GameObject("Isolated menu input validation");
        try {
            var panel=go.AddComponent<LegacySessionPanel>();var flags=BindingFlags.Instance|BindingFlags.NonPublic;
            var gesture=(MenuGesture)typeof(LegacySessionPanel).GetField("menuGesture",flags).GetValue(panel);
            gesture.Regions["test"]=new MenuGesture.Region { x=0,y=0,width=400,height=700 };
            var update=typeof(LegacySessionPanel).GetMethod("Update",flags);
            InputSystem.QueueStateEvent(device,new TouchState { touchId=1,phase=UnityEngine.InputSystem.TouchPhase.Began,position=new Vector2(40,Screen.height-200) });InputSystem.Update();update.Invoke(panel,null);
            InputSystem.QueueStateEvent(device,new TouchState { touchId=1,phase=UnityEngine.InputSystem.TouchPhase.Moved,position=new Vector2(40,Screen.height-100),delta=new Vector2(0,100) });InputSystem.Update();update.Invoke(panel,null);
            Check(gesture.Dragging&&gesture.Regions["test"].dy>0,"configured Input System drives actual menu scroll");
            InputSystem.QueueStateEvent(device,new TouchState { touchId=1,phase=UnityEngine.InputSystem.TouchPhase.Ended,position=new Vector2(40,Screen.height-100) });InputSystem.Update();update.Invoke(panel,null);
            Check(!gesture.Dragging&&(float)typeof(LegacySessionPanel).GetField("suppressMenuClickUntil",flags).GetValue(panel)>Time.unscaledTime,"touch release suppresses synthetic click");
            Debug.Log("VTT_MENU_INPUT_SYSTEM_PASS: actual virtual touchscreen begin/move/end reaches menu scroll and cancels click");
        } finally { UnityEngine.Object.DestroyImmediate(go);InputSystem.RemoveDevice(device);if(prior!=null)prior.MakeCurrent(); }
    }
    [MenuItem("DnD VTT/Workshop/Validate published demo integration")]
    public static void Run()
    {
        ValidateMenuTouchBackend();
        string fixtures = Path.GetFullPath("WorkshopFixtures~");
        Check(Directory.Exists(fixtures), "Download verified public fixtures to unity/WorkshopFixtures~ first");
        string folder = Path.Combine(Path.GetTempPath(), "vtt-workshop-editor-" + Guid.NewGuid()); Directory.CreateDirectory(folder);
        var originalScene = SceneManager.GetActiveScene();
        // A headless Editor starts with an unsaved Untitled scene; Unity forbids
        // additive scenes in that state. Open the unchanged saved project scene
        // only in batch CI. Never discard a developer's unsaved interactive work.
        if (Application.isBatchMode && string.IsNullOrEmpty(originalScene.path))
            originalScene = EditorSceneManager.OpenScene(LegacyMigrationSetup.ScenePath, OpenSceneMode.Single);
        Check(!string.IsNullOrEmpty(originalScene.path), "Save the current untitled scene before running additive validation");
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Additive); SceneManager.SetActiveScene(scene);
        var originalRoots = originalScene.GetRootGameObjects().ToDictionary(go => go, go => go.activeSelf);
        foreach (var root in originalRoots.Keys) root.SetActive(false);
        WorkshopRuntime runtime = null; LegacyMapPresenter world = null; LegacyContentCatalog catalog = null; TextAsset map = null;
        try
        {
            var store = new WorkshopStore(Path.Combine(folder, "packages"));
            var manifests = new JArray();int decodedImages=0;
            foreach (string repo in new[] { "DnD-VTT-Content", "DnD-VTT-Assets" })
            {
                var entries = WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixtures, repo, repo.EndsWith("Content") ? "catalog/v3/index.json" : "catalog/v3/index.json")), repo.EndsWith("Content", StringComparison.Ordinal) ? "packages" : "packs");
                foreach (JObject entry in entries)
                {
                    if ((string)entry["format"] != "json") continue;
                    string stage = Path.Combine(folder, "download"); File.Copy(Path.Combine(fixtures, repo, "packages", Path.GetFileName((string)entry["url"])), stage, true);
                    store.Install(entry, stage, "android-arm64", Application.unityVersion); manifests.Add(entry.DeepClone());
                    if(entry["imageKind"]!=null) {
                        var image=(JObject)store.Data(entry)["images"][0];var texture=new Texture2D(2,2);
                        try { Check(texture.LoadImage(WorkshopStore.ImageBytes(image)),"downloaded appearance PNG decodes in Unity");Check(texture.width==(int)image["width"]&&texture.height==(int)image["height"],"downloaded image dimensions");decodedImages++; }
                        finally { UnityEngine.Object.DestroyImmediate(texture); }
                    }
                }
            }
            Debug.Log("VTT_APPEARANCE_PNG_PASS: "+decodedImages+" downloaded images decoded with matching dimensions");
            runtime = new WorkshopRuntime(store); runtime.ActivateData();
            var commerce = runtime.Commerce();
            Check(((JArray)commerce["items"]).Count == 308 && ((JArray)commerce["craft"]["recipes"]).Count == 47, "downloaded inventory and craft activated in native Unity");
            var profiles = JObject.Parse(File.ReadAllText("ContentSources~/workshop-commerce/contracts.json"));
            foreach (JObject contract in (JArray)profiles["profiles"])
            {
                var actual = CommerceRules.Profile((JObject)commerce["alchemy"], ((JArray)contract["ids"]).Values<string>().ToArray(), (string)contract["catalyst"]);
                foreach (var property in ((JObject)contract["expected"]).Properties()) Check(JToken.DeepEquals(actual[property.Name],property.Value), "native Unity / main JS reaction parity: " + property.Name);
            }
            Debug.Log("VTT_COMMERCE_EDITOR_PASS: 308 downloadable item/ingredient records, 47 recipes, nine real JS reaction profiles");
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
            Check(runtime.Maps.Count == 9, "published optional maps activated");
            Check(runtime.Surfaces["floor_wood_light"].mainTexture, "downloaded procedural texture actually generated");
            catalog.maps = Array.Empty<LegacyContentCatalog.MapEntry>();
            Check(world.LoadWorkshopMap("dnd.map.3d-house-v740019"), "downloaded map loaded with no bundled catalog: " + world.Error);
            Check(world.TileCount > 0 && world.FloorCount > 0, "downloaded map creates actual geometry");
            Check(world.GetComponentsInChildren<Renderer>().Any(r => r.sharedMaterial && r.sharedMaterial.mainTexture), "downloaded textures applied to actual map renderers");
            string downloadedSave = File.ReadAllText(world.WorkshopMapStoreOverride);
            Check(downloadedSave.Contains("dnd.map.3d-house-v740019"), "stable map package reference saved");
            world.ClearWorkshopGeometry(); runtime.Dispose(); store.Remove("dnd.map.3d-house-v740019");
            runtime = new WorkshopRuntime(new WorkshopStore(store.Root)); runtime.ActivateData(); world.Workshop = runtime; world.RestoreWorkshopMap();
            Check(world.TileCount > 0 && File.ReadAllText(world.WorkshopMapStoreOverride) == downloadedSave, "downloaded map snapshot survives package removal and restart without bundled map index");
            Check(runtime.Maps.Count == 8, "uninstalled map removed from library only");
            Debug.Log("VTT_WORKSHOP_EDITOR_PASS: public JSON objects/materials, actual mesh/collider/material use, downloaded map/texture application, map placement/save, restart without bundled map catalog, missing package, reinstallation without save corruption");
        }
        finally
        {
            if (world) world.ClearWorkshopGeometry(); runtime?.Dispose();
            SceneManager.SetActiveScene(originalScene); EditorSceneManager.CloseScene(scene, true);
            foreach (var root in originalRoots) if (root.Key) root.Key.SetActive(root.Value);
            if (catalog) UnityEngine.Object.DestroyImmediate(catalog); if (map) UnityEngine.Object.DestroyImmediate(map);
            Directory.Delete(folder, true);
        }
    }
}
