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
    private static void ValidateCategoryCollections(WorkshopStore store,JArray manifests)
    {
        var roots=manifests.OfType<JObject>().Where(m=>(string)m["collectionRole"]=="category").ToArray();
        if(roots.Length==0)return;
        Check(roots.Length==15,"all fifteen libraries in actual live catalogs");
        var go=new GameObject("Category collection menu validation");
        try {
            var panel=go.AddComponent<LegacySessionPanel>();var flags=BindingFlags.Instance|BindingFlags.NonPublic;var type=typeof(LegacySessionPanel);
            type.GetField("workshopStore",flags).SetValue(panel,store);
            type.GetField("contentPackages",flags).SetValue(panel,manifests);
            type.GetField("contentCategory",flags).SetValue(panel,0); // dedicated Collections page is the default
            type.GetMethod("RebuildContentView",flags).Invoke(panel,null);
            var view=(System.Collections.Generic.IEnumerable<JObject>)type.GetField("contentView",flags).GetValue(panel);
            Check(view.Count()==15&&view.All(m=>(string)m["collectionRole"]=="category"),"real menu shows all fifteen libraries rather than individual mods");
            Check(view.Take(5).Select(m=>(string)m["inventoryCategory"]).SequenceEqual(new[]{"weapons","armor","materials","consumables","junk"}),"existing item category order retained");
            Check(view.Skip(5).Select(m=>(string)m["collectionCategory"]).SequenceEqual(WorkshopStore.ModCollectionCategories),"all non-item categories follow in predictable order");
            var firstPage=(System.Collections.Generic.IEnumerable<JObject>)type.GetMethod("VisibleContentPage",flags).Invoke(panel,null);
            Check(firstPage.Count()==15,"all fifteen libraries fit on the first collection page");
            type.GetMethod("SwitchContentPage",flags).Invoke(panel,new object[]{false});
            type.GetField("contentShowParts",flags).SetValue(panel,true);type.GetMethod("RebuildContentView",flags).Invoke(panel,null);
            view=(System.Collections.Generic.IEnumerable<JObject>)type.GetField("contentView",flags).GetValue(panel);
            Check(view.Count()>100,"individual tomes remain accessible through toggle");
            foreach(var root in roots) {
                var plan=(JArray)type.GetMethod("ContentInstallPlan",flags).Invoke(panel,new object[]{root});
                Check(plan.Count==0,"actual UI skips all already installed collection modules");
                var routine=(System.Collections.IEnumerator)type.GetMethod("DownloadContentPackage",flags).Invoke(panel,new object[]{root});
                Check(!routine.MoveNext()&&!(bool)type.GetField("contentBusy",flags).GetValue(panel),"actual download controller completes already installed collection without network");
            }
            Debug.Log("VTT_COLLECTIONS_EDITOR_PASS: fifteen actual collection cards, part toggle and real idempotent download controller");
        }finally{UnityEngine.Object.DestroyImmediate(go);}
    }
    private static void ValidateWorkshopPagination(WorkshopStore store)
    {
        var go=new GameObject("Workshop pagination validation");
        try {
            var panel=go.AddComponent<LegacySessionPanel>();var flags=BindingFlags.Instance|BindingFlags.NonPublic;var type=typeof(LegacySessionPanel);
            type.GetField("workshopStore",flags).SetValue(panel,store);
            type.GetField("contentCollectionsPage",flags).SetValue(panel,false);
            var catalog=new JArray();for(int i=0;i<20000;i++)catalog.Add(new JObject { ["id"]="ci."+i,["name"]="Item"+i,["author"]="CI",["type"]="race" });
            type.GetField("contentPackages",flags).SetValue(panel,catalog);
            var ensure=type.GetMethod("EnsureContentView",flags);var page=type.GetMethod("VisibleContentPage",flags);
            ensure.Invoke(panel,null);var firstView=type.GetField("contentView",flags).GetValue(panel);
            for(int i=0;i<100;i++)ensure.Invoke(panel,null);
            Check(ReferenceEquals(firstView,type.GetField("contentView",flags).GetValue(panel)),"100 draw passes reuse catalog snapshot without rebuilding/disk reads");
            var first=((System.Collections.Generic.IEnumerable<JObject>)page.Invoke(panel,null)).ToArray();
            Check(first.Length==12&&(string)first[0]["id"]=="ci.0","large catalog renders only twelve records");
            type.GetField("contentPage",flags).SetValue(panel,1);
            var next=((System.Collections.Generic.IEnumerable<JObject>)page.Invoke(panel,null)).ToArray();
            Check(next.Length==12&&(string)next[0]["id"]=="ci.12","next page has stable nonoverlapping records");
            type.GetField("contentSearch",flags).SetValue(panel,"Item19999");ensure.Invoke(panel,null);
            Check(((System.Collections.Generic.IEnumerable<JObject>)page.Invoke(panel,null)).Count()==1,"search reaches records beyond first page and resets page");
            type.GetField("installedOnly",flags).SetValue(panel,true);ensure.Invoke(panel,null);
            Check(!((System.Collections.Generic.IEnumerable<JObject>)page.Invoke(panel,null)).Any(),"installed-only filter excludes synthetic uninstalled packages");
            type.GetField("installedOnly",flags).SetValue(panel,false);type.GetField("contentSearch",flags).SetValue(panel,"");type.GetField("contentGroupPath",flags).SetValue(panel,"Оформление/Иконки");ensure.Invoke(panel,null);
            Check(((System.Collections.Generic.IEnumerable<JObject>)page.Invoke(panel,null)).All(m=>(string)m["imageKind"]=="icon"),"icon branch contains no wallpapers");
            type.GetField("contentGroupPath",flags).SetValue(panel,"Оформление/Обои");ensure.Invoke(panel,null);
            Check(((System.Collections.Generic.IEnumerable<JObject>)page.Invoke(panel,null)).All(m=>(string)m["imageKind"]=="wallpaper"),"wallpaper branch contains no icons");
            type.GetField("chatBusy",flags).SetValue(panel,true);
            Check(!(bool)type.GetProperty("ChatComposerLocked",flags).GetValue(panel),"background chat reads do not lock draft editor");
            type.GetField("chatSending",flags).SetValue(panel,true);
            Check((bool)type.GetProperty("ChatComposerLocked",flags).GetValue(panel),"pending send locks editor until acknowledgement");
            type.GetField("chatDraft",flags).SetValue(panel,"Текст для отправки");type.GetField("chatPendingId",flags).SetValue(panel,"confirmed-id");
            type.GetMethod("AcknowledgeChatDraft",flags).Invoke(panel,null);
            Check((string)type.GetField("chatDraft",flags).GetValue(panel)==""&&type.GetField("chatPendingId",flags).GetValue(panel)==null,"successful acknowledgement clears composer and pending retry");
            Check(!(bool)type.GetProperty("ChatComposerLocked",flags).GetValue(panel),"acknowledged send unlocks new draft before background read completes");
            string previews=Path.Combine(store.Root,"preview-lifecycle-test");Directory.CreateDirectory(previews);File.WriteAllText(Path.Combine(previews,"cache.jpg"),"temporary");
            type.GetField("contentPreviewRoot",flags).SetValue(panel,previews);var texture=new Texture2D(2,2);
            var images=(System.Collections.IDictionary)type.GetField("contentPreviewImages",flags).GetValue(panel);images.Add("test",texture);
            int installedCount=Directory.GetFiles(store.Root,"*.json").Length;
            type.GetMethod("CloseWorkshopPreviews",flags).Invoke(panel,null);
            Check(!Directory.Exists(previews)&&!texture&&images.Count==0,"workshop exit deletes session thumbnails and destroys owned textures");
            Check(Directory.GetFiles(store.Root,"*.json").Length==installedCount,"preview cleanup preserves installed manifests");
            Debug.Log("VTT_WORKSHOP_PAGINATION_PASS: 20000 entries, 12 cards, cached 100 draws, next page, search and installed-only");
        }finally { UnityEngine.Object.DestroyImmediate(go); }
    }
    private static void ValidateAppearanceLibrary(WorkshopStore store,JArray manifests)
    {
        var go=new GameObject("Appearance library validation");
        try {
            var panel=go.AddComponent<LegacySessionPanel>();var flags=BindingFlags.Instance|BindingFlags.NonPublic;
            typeof(LegacySessionPanel).GetField("workshopStore",flags).SetValue(panel,store);
            var thumb=typeof(LegacySessionPanel).GetMethod("AppearanceThumbnail",flags);
            var preview=typeof(LegacySessionPanel).GetMethod("AppearancePreview",flags);
            var release=typeof(LegacySessionPanel).GetMethod("ReleaseAppearanceImages",flags);
            var entries=manifests.OfType<JObject>().Where(m=>m["imageKind"]!=null).Take(12).ToArray();
            Check(entries.Length==12,"real appearance fixtures available for bounded thumbnail test");
            foreach(var entry in entries) {
                var image=(Texture2D)thumb.Invoke(panel,new object[]{entry});
                Check(image&&image.width<=160&&image.height<=160,"real published thumbnail decoded and bounded");
            }
            var cache=(System.Collections.IDictionary)typeof(LegacySessionPanel).GetField("appearanceThumbnails",flags).GetValue(panel);
            Check(cache.Count<=9,"thumbnail cache remains bounded while browsing pages");
            var full=(Texture2D)preview.Invoke(panel,new object[]{entries[0]});
            var source=(JObject)store.Data(entries[0])["images"][0];
            Check(full&&full.width==(int)source["width"]&&full.height==(int)source["height"],"large preview uses full downloaded image");
            release.Invoke(panel,new object[]{true});Check(cache.Count==0&&!full,"low-memory/uninstall cleanup destroys preview and clears thumbnails");
            Check(typeof(LegacySessionPanel).GetField("appearancePreviewTexture",flags).GetValue(panel)==null,"large preview released");
            var author=typeof(LegacySessionPanel).GetMethod("ChatAuthorLabel",BindingFlags.Static|BindingFlags.NonPublic);
            const string uuid="8e23f5b2-be5d-4805-8009-637685261fba";
            Check((string)author.Invoke(null,new object[]{uuid,uuid})=="Вы","own chat author is friendly label");
            string other=(string)author.Invoke(null,new object[]{uuid,"another-user"});
            Check(other.StartsWith("Игрок ")&&!other.Contains(uuid)&&!other.Contains("@"),"chat hides technical identity and email");
            Check(other==(string)author.Invoke(null,new object[]{uuid,"another-user"}),"chat pseudonym stable between refreshes");
            Debug.Log("VTT_APPEARANCE_LIBRARY_PASS: real bounded thumbnails, full preview, cleanup, private friendly chat labels");
        } finally { UnityEngine.Object.DestroyImmediate(go); }
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
                var entries = WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixtures, repo, repo.EndsWith("Content") ? "catalog/v3/index.json" : "catalog/v9/index.json")), repo.EndsWith("Content", StringComparison.Ordinal) ? "packages" : "packs");
                foreach (JObject entry in entries)
                {
                    if ((string)entry["format"] != "json") continue;
                    string stage = Path.Combine(folder, "download"); File.Copy(Path.Combine(fixtures, repo, "packages", Path.GetFileName((string)entry["url"])), stage, true);
                    store.Install(entry, stage, "android-arm64", Application.unityVersion); manifests.Add(entry.DeepClone());
                    if(new[]{"icon","wallpaper"}.Contains((string)entry["imageKind"])) {
                        var image=(JObject)store.Data(entry)["images"][0];var texture=new Texture2D(2,2);
                        try { Check(texture.LoadImage(WorkshopStore.ImageBytes(image)),"downloaded appearance PNG decodes in Unity");Check(texture.width==(int)image["width"]&&texture.height==(int)image["height"],"downloaded image dimensions");decodedImages++; }
                        finally { UnityEngine.Object.DestroyImmediate(texture); }
                    }
                }
            }
            Check(decodedImages==63,"all63 actual icon and wallpaper images decode; dice and tray recipes use their own validation");
            Debug.Log("VTT_APPEARANCE_PNG_PASS: "+decodedImages+" downloaded images decoded with matching dimensions");
            ValidateAppearanceLibrary(store,manifests);
            ValidateWorkshopPagination(store);
            ValidateCategoryCollections(store,manifests);
            int beforeMarkerRemoval=store.Installed().OfType<JObject>().Count(m=>(string)m["type"]!="collection");
            foreach(var marker in store.Installed().OfType<JObject>().Where(m=>(bool?)m["modCategoryCollection"]==true).OrderBy(m=>(string)m["collectionRole"]=="category"?0:1).ToArray())store.Remove((string)marker["id"]);
            Check(store.Installed().OfType<JObject>().Count(m=>(string)m["type"]!="collection")==beforeMarkerRemoval,"removing generic collection markers preserves every original mod");
            var previewEntries=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixtures,"DnD-VTT-Assets/catalog/v4/index.json")),"packs");int decodedPreviews=0;
            foreach(JObject entry in previewEntries)if(entry["preview"] is JObject preview) {
                var texture=new Texture2D(2,2);try { var b=WorkshopStore.PreviewBytes(preview,File.ReadAllBytes(Path.Combine(fixtures,"DnD-VTT-Assets/previews",Path.GetFileName((string)preview["url"]))));Check(texture.LoadImage(b),"real small preview decodes in Unity");Check(texture.width==320&&texture.height==200,"decoded preview dimensions");decodedPreviews++; }finally { UnityEngine.Object.DestroyImmediate(texture); }
            }
            Check(decodedPreviews==75,"all graphical package previews decode");Debug.Log("VTT_WORKSHOP_PREVIEW_PASS: 75 hash-verified small JPEG previews decoded safely");
            var gradle=Path.Combine(folder,"gradle");Directory.CreateDirectory(Path.Combine(gradle,"src/main"));
            File.WriteAllText(Path.Combine(gradle,"src/main/AndroidManifest.xml"),"<manifest xmlns:android=\"http://schemas.android.com/apk/res/android\"><application><activity android:name=\"com.unity3d.player.UnityPlayerActivity\"><intent-filter><action android:name=\"android.intent.action.MAIN\"/><category android:name=\"android.intent.category.LAUNCHER\"/></intent-filter></activity></application></manifest>");
            var callback=new UnityUpdaterManifest();callback.OnPostGenerateGradleAndroidProject(gradle);callback.OnPostGenerateGradleAndroidProject(gradle);
            var manifestXml=new System.Xml.XmlDocument();manifestXml.Load(Path.Combine(gradle,"src/main/AndroidManifest.xml"));
            Check(manifestXml.SelectNodes("/manifest/application/activity-alias").Count==31,"launcher alias generation idempotent");
            Check(Directory.GetFiles(Path.Combine(gradle,"src/main/res/drawable"),"vtt_icon_*.png").Length==31,"small Android system icon resources prepared");
            Debug.Log("VTT_LAUNCHER_GENERATION_PASS: repeated manifest migration preserves old launcher name, 31 aliases and 31 bounded icons");

            runtime = new WorkshopRuntime(store); runtime.ActivateData();
            var commerce = runtime.Commerce();
            int expectedItems=manifests.OfType<JObject>().Where(m=>new[]{"item","craft"}.Contains((string)m["type"])).Sum(m=>(store.Data(m)["items"] as JArray ?? new JArray()).Count);
            Check(((JArray)commerce["items"]).Count == expectedItems && ((JArray)commerce["craft"]["recipes"]).Count == 47, "downloaded inventory and craft activated in native Unity");
            var profiles = JObject.Parse(File.ReadAllText("ContentSources~/workshop-commerce/contracts.json"));
            foreach (JObject contract in (JArray)profiles["profiles"])
            {
                var actual = CommerceRules.Profile((JObject)commerce["alchemy"], ((JArray)contract["ids"]).Values<string>().ToArray(), (string)contract["catalyst"]);
                foreach (var property in ((JObject)contract["expected"]).Properties()) Check(JToken.DeepEquals(actual[property.Name],property.Value), "native Unity / main JS reaction parity: " + property.Name);
            }
            Debug.Log("VTT_COMMERCE_EDITOR_PASS: "+expectedItems+" downloadable item/ingredient records, 47 recipes, nine real JS reaction profiles");
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
