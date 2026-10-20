using System;
using System.IO;
using System.Linq;
using DndVtt.UnityPrototype;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;

// Trusted build boundary: generate our own primitives, reject scripts and scenes,
// and never import an arbitrary submitted Unity project or execute its Editor code.
public static class WorkshopBundleBuild
{
    [MenuItem("DnD VTT/Workshop/Build reviewed demo bundles")]
    public static void BuildAll()
    {
        foreach (var target in new[] { BuildTarget.Android, BuildTarget.StandaloneWindows64 }) Build(target);
    }
    public static void BuildAndroid() => Build(BuildTarget.Android);
    public static void BuildWindows() => Build(BuildTarget.StandaloneWindows64);
    private static void Build(BuildTarget target)
    {
        string platform = target == BuildTarget.Android ? "android-arm64" : "windows-x64";
        string source = "Assets/Editor/WorkshopGenerated";
        if (AssetDatabase.IsValidFolder(source)) AssetDatabase.DeleteAsset(source);
        Directory.CreateDirectory(source); AssetDatabase.Refresh();
        var shader = Shader.Find("Universal Render Pipeline/Lit"); if (!shader) throw new Exception("URP shader missing");
        var material = new Material(shader) { color = new Color(.85f, .6f, .25f) };
        AssetDatabase.CreateAsset(material, source + "/amber.mat");
        var go = GameObject.CreatePrimitive(PrimitiveType.Cylinder); go.name = "beacon";
        go.GetComponent<Renderer>().sharedMaterial = material; go.transform.localScale = new Vector3(.5f, 1, .5f);
        PrefabUtility.SaveAsPrefabAsset(go, source + "/beacon.prefab"); UnityEngine.Object.DestroyImmediate(go);
        string prefab = source + "/beacon.prefab";
        var imported = AssetDatabase.LoadAssetAtPath<GameObject>(prefab);
        if (!imported || imported.GetComponentsInChildren<MonoBehaviour>(true).Length != 0) throw new Exception("Only reviewed script-free prefabs are accepted");
        foreach (string dep in AssetDatabase.GetDependencies(prefab, true))
            if (new[] { ".cs", ".dll", ".unity" }.Contains(Path.GetExtension(dep))) throw new Exception("Executable/scene dependency: " + dep);
        string output = Path.GetFullPath("Builds/Workshop/" + platform); Directory.CreateDirectory(output);
        var map = new[] { new AssetBundleBuild { assetBundleName = "demo-markers.bundle", assetNames = new[] { prefab } } };
        var built = BuildPipeline.BuildAssetBundles(output, map, BuildAssetBundleOptions.ChunkBasedCompression | BuildAssetBundleOptions.StrictMode, target);
        if (!built) throw new Exception("Bundle build failed " + platform);
        string path = Path.Combine(output, "demo-markers.bundle");
        var manifest = new JObject {
            ["schemaVersion"] = 1, ["id"] = "demo.bundle.markers." + platform, ["name"] = "Маяк — AssetBundle " + platform,
            ["version"] = "1.0.0", ["author"] = "DnD-VTT contributors", ["license"] = "CC0-1.0", ["type"] = "model", ["format"] = "assetbundle",
            ["platform"] = platform, ["unityVersion"] = Application.unityVersion, ["dependencies"] = new JArray(), ["bytes"] = new FileInfo(path).Length,
            ["sha256"] = WorkshopStore.DigestFile(path), ["url"] = "https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/workshop-demo-v1.0.0/" + platform + "-demo-markers.bundle"
        };
        WorkshopStore.ValidateManifest(manifest); File.WriteAllText(Path.Combine(output, "manifest.json"), manifest.ToString());
        AssetDatabase.DeleteAsset(source); Debug.Log("VTT_WORKSHOP_BUNDLE_BUILD_PASS " + platform);
    }
}
