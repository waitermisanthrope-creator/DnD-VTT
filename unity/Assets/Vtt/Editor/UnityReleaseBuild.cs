using System;
using System.IO;
using System.Xml;
using DndVtt.UnityPrototype;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEditor.SceneManagement;
using UnityEngine.SceneManagement;
using UnityEditor.Build;
using UnityEditor.Android;
using UnityEngine;

public static class UnityReleaseBuild
{
    public static void Windows() => Build(BuildTarget.StandaloneWindows64, "windows/DndVtt.exe");
    public static void Android() => Build(BuildTarget.Android, "android-intermediate.apk");
    public static void CloudWindows() => DiceBuildGate.Begin("Windows");
    public static void CloudWindowsAfterDice()
    {
        Windows();
        string[] args=Environment.GetCommandLineArgs();
        for(int i=0;i+1<args.Length;i++)if(args[i]=="-customBuildPath") {
            string destination=args[i+1];
            if(!destination.EndsWith(".exe",StringComparison.OrdinalIgnoreCase))throw new Exception("Windows output path missing");
            Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(destination)));
            File.Copy(Path.Combine("Builds","Unity-"+UnityRelease.Version,"windows","DndVtt.exe"),destination,true);
            break;
        }
    }


    // GameCI validates the output at its -customBuildPath; our normal release
    // pipeline also needs its original unsigned intermediate for pinned signing.
    // Copy only when explicitly running through GameCI, and never change local builds.
    public static void CloudAndroid() => DiceBuildGate.Begin("Android");
    public static void CloudAndroidAfterDice()
    {
        string[] args = Environment.GetCommandLineArgs();
        string destination = null;
        for (int i = 0; i + 1 < args.Length; i++)
            if (args[i] == "-customBuildPath") { destination = args[i + 1]; break; }
        if (string.IsNullOrWhiteSpace(destination) ||
            !destination.EndsWith(".apk", StringComparison.OrdinalIgnoreCase))
            throw new Exception("GameCI Android APK output path missing");
        BrandingResumeValidation.Run();
        WorkshopEditorValidation.Run();
        Android();
        string source = Path.Combine("Builds", "Unity-" + UnityRelease.Version, "android-intermediate.apk");
        if (!File.Exists(source)) throw new FileNotFoundException("Android intermediate was not built", source);
        Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(destination)));
        File.Copy(source, destination, true);
        Debug.Log("VTT_CLOUD_ANDROID_OUTPUT_PASS: " + UnityRelease.Version);
        // A separate reviewed demo artifact; its failure never disguises a player
        // build failure and it is never added to the public catalog automatically.
        try { WorkshopBundleBuild.BuildAndroid(); }
        catch (Exception error) { Debug.LogWarning("VTT_WORKSHOP_BUNDLE_NOT_BUILT: " + error.Message); }
    }
    private static string PrepareMinimalScene()
    {
        const string folder = "Assets/Vtt/GeneratedMinimal";
        Directory.CreateDirectory(folder); AssetDatabase.Refresh();
        var scene = EditorSceneManager.OpenScene(LegacyMigrationSetup.ScenePath, OpenSceneMode.Single);
        var world = UnityEngine.Object.FindFirstObjectByType<LegacyMapPresenter>();
        if (!world || !world.explorer) throw new Exception("Release scene is missing core controllers");
        world.ClearWorkshopGeometry();
        foreach (var smoke in UnityEngine.Object.FindObjectsByType<LegacyMigrationSmoke>(FindObjectsSortMode.None)) UnityEngine.Object.DestroyImmediate(smoke);
        var catalog = ScriptableObject.CreateInstance<LegacyContentCatalog>();
        catalog.maps = Array.Empty<LegacyContentCatalog.MapEntry>(); catalog.models = Array.Empty<LegacyContentCatalog.ModelEntry>(); catalog.surfaces = Array.Empty<LegacyContentCatalog.SurfaceEntry>();
        string catalogPath = folder + "/EmptyCatalog.asset";
        if (AssetDatabase.LoadAssetAtPath<LegacyContentCatalog>(catalogPath)) AssetDatabase.DeleteAsset(catalogPath);
        AssetDatabase.CreateAsset(catalog, catalogPath); world.catalog = catalog; world.mapIndex = -1;
        var explorer = world.explorer; explorer.spawnPosition = new Vector3(0, 2, 0); explorer.acceptInput = false;
        string path = folder + "/MinimalClient.unity";
        // Save a copy: never overwrite the original imported adventure scene.
        if (!EditorSceneManager.SaveScene(scene, path, true)) throw new Exception("Could not save minimal release scene");
        foreach (string dep in AssetDatabase.GetDependencies(path, true))
            if (dep.StartsWith("Assets/LegacyContent/", StringComparison.Ordinal)) throw new Exception("Optional content leaked into minimal scene: " + dep);
        Debug.Log("VTT_MINIMAL_SCENE_PASS: no maps, models, legacy textures/materials or saved adventure geometry");
        return path;
    }
    private static void Build(BuildTarget target, string suffix)
    {
        if (PlayerSettings.companyName != "DnDVttExperiment" || PlayerSettings.productName != "DnD VTT Unity Prototype")
            throw new Exception("Release must preserve existing Windows save identity");
        if (target == BuildTarget.StandaloneWindows64)
        {
            PlayerSettings.fullScreenMode = FullScreenMode.Windowed;
            PlayerSettings.defaultScreenWidth = 1280; PlayerSettings.defaultScreenHeight = 800;
            PlayerSettings.resizableWindow = true; PlayerSettings.allowFullscreenSwitch = true;
        }
        if (!Resources.Load<Font>("UI/DejaVuSans")) throw new Exception("Bundled Cyrillic UI font is missing");
        LegacyMigrationSetup.ValidateContracts();
        // 1.00.04 could compile while images were invisible at runtime.
        // Fail 1.00.05 before packaging if any mandatory source texture is
        // missing or cannot be resolved by the runtime Resources loader.
        if (target == BuildTarget.Android)
        {
            foreach (string resource in new[] { "Branding/Wallpaper16", "Branding/Splash19", "Branding/Dragon20" })
            {
                var texture = Resources.Load<Texture2D>(resource);
                if (!texture || texture.width < 100 || texture.height < 100)
                    throw new Exception("VTT_BRANDING_ASSET_MISSING: " + resource);
                Debug.Log("VTT_BRANDING_ASSET_PASS: " + resource + " / " + texture.width + "x" + texture.height);
            }
            foreach (string file in new[] { "Wallpaper16.jpg", "Splash19.png", "Dragon20.png" })
            {
                string path = Path.Combine(Application.dataPath, "StreamingAssets", "Branding", file);
                if (!File.Exists(path) || new FileInfo(path).Length < 100000)
                    throw new Exception("VTT_BRANDING_FALLBACK_MISSING: " + path);
            }
        }
        PlayerSettings.bundleVersion = UnityRelease.Version;
        PlayerSettings.Android.bundleVersionCode = UnityRelease.Code;
        PlayerSettings.SetApplicationIdentifier(NamedBuildTarget.Android, UnityRelease.Package);
        if (target == BuildTarget.Android)
        {
            // Make the Android launcher/splash portrait by default. The runtime
            // switches to landscape only for the 3D map screen.
            PlayerSettings.defaultInterfaceOrientation = UIOrientation.Portrait;
            PlayerSettings.Android.targetArchitectures = AndroidArchitecture.ARM64;
            PlayerSettings.SetScriptingBackend(NamedBuildTarget.Android, ScriptingImplementation.IL2CPP);
            PlayerSettings.Android.minSdkVersion = AndroidSdkVersions.AndroidApiLevel26;
            PlayerSettings.Android.targetSdkVersion = (AndroidSdkVersions)36;
        }
        string folder = "Builds/Unity-" + UnityRelease.Version; Directory.CreateDirectory(folder);
        using var brandingScope = new BuildBranding.Scope(Path.Combine(Application.dataPath, "StreamingAssets", "Branding"));
        Debug.Log("VTT_BRANDING_LOSSLESS_PACKAGE_PASS: removed non-rendering PNG bytes=" + brandingScope.SavedBytes + "; original source restored on scope exit");
        var result = BuildPipeline.BuildPlayer(new[] { PrepareMinimalScene() }, folder + "/" + suffix, target, BuildOptions.None);
        if (result.summary.result != BuildResult.Succeeded) throw new Exception("Unity release build failed: " + result.summary.result);
        var packed = new JArray();
        foreach (var group in result.packedAssets)
            foreach (var asset in group.contents)
                {
                    if (asset.sourceAssetPath.StartsWith("Assets/LegacyContent/", StringComparison.Ordinal)) throw new Exception("Optional asset in player: " + asset.sourceAssetPath);
                    packed.Add(new JObject { ["source"] = asset.sourceAssetPath, ["packedBytes"] = asset.packedSize });
                }
        File.WriteAllText(folder + "/build-report-" + target + ".json", new JObject {
            ["version"] = UnityRelease.Version, ["platform"] = target.ToString(), ["reportedBuildOutputBytes"] = result.summary.totalSize,
            ["packedAssets"] = packed, ["note"] = "Actual Unity BuildReport including build outputs/symbols; use signed APK metrics for APK file size."
        }.ToString());
        Debug.Log("VTT_RELEASE_BUILD_PASS: " + target + " / " + UnityRelease.Version);
    }
}

// Preserve Unity's own launcher manifest; add only this plugin's permission/provider.
public sealed class UnityUpdaterManifest : IPostGenerateGradleAndroidProject
{
    public int callbackOrder => 100;
    private static void ConfigureLauncherIcons(string path,XmlDocument xml,XmlElement app,string ns)
    {
        string original=null;XmlElement activity=null;
        foreach(XmlElement meta in app.SelectNodes("meta-data"))if(meta.GetAttribute("name",ns)=="dnd.vtt.launcherDefault")original=meta.GetAttribute("value",ns);
        foreach(XmlElement item in app.SelectNodes("activity")) {
            if(item.GetAttribute("name",ns)=="com.dndvtt.unity.LauncherHostActivity")activity=item;
            foreach(XmlElement filter in item.SelectNodes("intent-filter"))foreach(XmlElement category in filter.SelectNodes("category"))
                if(category.GetAttribute("name",ns)=="android.intent.category.LAUNCHER") { activity=item;if(original==null)original=item.GetAttribute("name",ns); }
        }
        if(activity==null||!(original=="com.unity3d.player.UnityPlayerActivity"||original=="com.unity3d.player.UnityPlayerGameActivity"))throw new BuildFailedException("Cannot safely identify Unity launcher activity");
        foreach(XmlElement filter in activity.SelectNodes("intent-filter")) {
            bool launcher=false;foreach(XmlElement category in filter.SelectNodes("category"))if(category.GetAttribute("name",ns)=="android.intent.category.LAUNCHER")launcher=true;
            if(launcher)activity.RemoveChild(filter);
        }
        activity.SetAttribute("name",ns,"com.dndvtt.unity.LauncherHostActivity");
        foreach(XmlElement item in app.SelectNodes("activity-alias"))if(item.GetAttribute("name",ns)==original||item.GetAttribute("name",ns).StartsWith(UnityRelease.Package+".LauncherIcon",StringComparison.Ordinal))app.RemoveChild(item);
        foreach(XmlElement meta in app.SelectNodes("meta-data"))if(meta.GetAttribute("name",ns)=="dnd.vtt.launcherDefault")app.RemoveChild(meta);
        var marker=xml.CreateElement("meta-data");marker.SetAttribute("name",ns,"dnd.vtt.launcherDefault");marker.SetAttribute("value",ns,original);app.AppendChild(marker);
        string javaDir=Path.Combine(path,"src/main/java/com/dndvtt/unity");Directory.CreateDirectory(javaDir);
        File.WriteAllText(Path.Combine(javaDir,"LauncherHostActivity.java"),"package com.dndvtt.unity; public class LauncherHostActivity extends "+original+" {}\n");
        string fixtures=Path.GetFullPath("WorkshopFixtures~/DnD-VTT-Assets");
        var catalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixtures,"catalog/v3/index.json")),"packs");
        string drawable=Path.Combine(path,"src/main/res/drawable");Directory.CreateDirectory(drawable);int count=0;long bytes=0;
        foreach(JObject manifest in catalog) {
            if((string)manifest["imageKind"]!="icon")continue;
            string id=(string)manifest["id"],slot=id.Substring("dnd.appearance.icon.".Length);
            if(id!="dnd.appearance.icon."+slot||!(slot=="default"||System.Text.RegularExpressions.Regex.IsMatch(slot,@"^(0[1-9]|[12][0-9]|30)$")))throw new BuildFailedException("Unknown icon slot");
            var payloadPath=Path.Combine(fixtures,"packages",Path.GetFileName((string)manifest["url"]));WorkshopStore.Verify(manifest,payloadPath);
            var data=WorkshopStore.ValidateData(manifest,File.ReadAllText(payloadPath));var source=new Texture2D(2,2);Texture2D small=null;
            try {
                if(!source.LoadImage(WorkshopStore.ImageBytes((JObject)data["images"][0]),false))throw new BuildFailedException("Invalid launcher image");
                small=new Texture2D(192,192,TextureFormat.RGBA32,false);var pixels=new Color[192*192];
                for(int y=0;y<192;y++)for(int x=0;x<192;x++)pixels[y*192+x]=source.GetPixelBilinear((x+.5f)/192,(y+.5f)/192);
                small.SetPixels(pixels);small.Apply();byte[] png=small.EncodeToPNG();bytes+=png.Length;File.WriteAllBytes(Path.Combine(drawable,"vtt_icon_"+slot+".png"),png);
            }finally { UnityEngine.Object.DestroyImmediate(source);if(small)UnityEngine.Object.DestroyImmediate(small); }
            var alias=xml.CreateElement("activity-alias");alias.SetAttribute("name",ns,slot=="default"?original:UnityRelease.Package+".LauncherIcon"+slot);
            alias.SetAttribute("targetActivity",ns,"com.dndvtt.unity.LauncherHostActivity");alias.SetAttribute("enabled",ns,slot=="default"?"true":"false");alias.SetAttribute("exported",ns,"true");alias.SetAttribute("icon",ns,"@drawable/vtt_icon_"+slot);
            var filter=xml.CreateElement("intent-filter");var action=xml.CreateElement("action");action.SetAttribute("name",ns,"android.intent.action.MAIN");filter.AppendChild(action);var category=xml.CreateElement("category");category.SetAttribute("name",ns,"android.intent.category.LAUNCHER");filter.AppendChild(category);alias.AppendChild(filter);app.AppendChild(alias);count++;
        }
        if(count!=31||bytes>3*1024*1024)throw new BuildFailedException("Unexpected launcher icon count or size");
        Debug.Log("VTT_LAUNCHER_ALIAS_PASS: "+count+" small system icons, "+bytes+" bytes; original launcher identity retained as default alias");
    }
    public void OnPostGenerateGradleAndroidProject(string path)
    {
        string file = Path.Combine(path, "src/main/AndroidManifest.xml"); var xml = new XmlDocument(); xml.Load(file);
        const string ns = "http://schemas.android.com/apk/res/android";
        var manifest = xml.DocumentElement;
        // Unity can reuse this generated manifest for incremental builds.
        foreach (XmlElement existing in manifest.SelectNodes("uses-permission"))
            if (existing.GetAttribute("name", ns) == "android.permission.REQUEST_INSTALL_PACKAGES") manifest.RemoveChild(existing);
        var permission = xml.CreateElement("uses-permission"); permission.SetAttribute("name", ns, "android.permission.REQUEST_INSTALL_PACKAGES"); manifest.AppendChild(permission);
        var app = (XmlElement)manifest.SelectSingleNode("application");
        // The launcher owns android:label; setting it on unityLibrary conflicts during manifest merging.
        // Remove the old callback's literal from reused generated manifests as well.
        if (app.GetAttribute("label", ns) == "DnD VTT Unity") app.RemoveAttribute("label", ns);
        foreach (XmlElement existing in app.SelectNodes("provider"))
            if (existing.GetAttribute("name", ns) == "com.dndvtt.unityupdater.UpdateProvider") app.RemoveChild(existing);
        var provider = xml.CreateElement("provider"); provider.SetAttribute("name", ns, "com.dndvtt.unityupdater.UpdateProvider");
        provider.SetAttribute("authorities", ns, UnityRelease.Package + ".updates"); provider.SetAttribute("exported", ns, "false"); provider.SetAttribute("grantUriPermissions", ns, "true");
        app.AppendChild(provider);ConfigureLauncherIcons(path,xml,app,ns);xml.Save(file);
    }
}
