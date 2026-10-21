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

    // GameCI validates the output at its -customBuildPath; our normal release
    // pipeline also needs its original unsigned intermediate for pinned signing.
    // Copy only when explicitly running through GameCI, and never change local builds.
    public static void CloudAndroid()
    {
        string[] args = Environment.GetCommandLineArgs();
        string destination = null;
        for (int i = 0; i + 1 < args.Length; i++)
            if (args[i] == "-customBuildPath") { destination = args[i + 1]; break; }
        if (string.IsNullOrWhiteSpace(destination) ||
            !destination.EndsWith(".apk", StringComparison.OrdinalIgnoreCase))
            throw new Exception("GameCI Android APK output path missing");
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
        app.AppendChild(provider); xml.Save(file);
    }
}
