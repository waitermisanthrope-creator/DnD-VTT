using System;
using System.IO;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;
using DndVtt.UnityPrototype;

public static class PrototypeSetup
{
    private const string ScenePath = "Assets/Vtt/Scenes/Exploration.unity";
    [MenuItem("DnD VTT/Recreate exploration scene")]
    public static void Create()
    {
        Directory.CreateDirectory("Assets/Vtt/Scenes"); Directory.CreateDirectory("Assets/Vtt/Settings");
        var renderer = AssetDatabase.LoadAssetAtPath<UniversalRendererData>("Assets/Vtt/Settings/ExplorerRenderer.asset");
        if (!renderer) { renderer = ScriptableObject.CreateInstance<UniversalRendererData>(); AssetDatabase.CreateAsset(renderer, "Assets/Vtt/Settings/ExplorerRenderer.asset"); }
        var pipeline = AssetDatabase.LoadAssetAtPath<UniversalRenderPipelineAsset>("Assets/Vtt/Settings/ExplorerURP.asset");
        if (!pipeline) { pipeline = UniversalRenderPipelineAsset.Create(renderer); AssetDatabase.CreateAsset(pipeline, "Assets/Vtt/Settings/ExplorerURP.asset"); }
        pipeline.renderScale = 1; pipeline.msaaSampleCount = 2;
        EditorUtility.SetDirty(pipeline);
        GraphicsSettings.defaultRenderPipeline = pipeline; QualitySettings.renderPipeline = pipeline;
        PlayerSettings.companyName = "DnDVttExperiment"; PlayerSettings.productName = "DnD VTT Unity Prototype";
        PlayerSettings.SetApplicationIdentifier(NamedBuildTarget.Android, "com.dndvtt.unityexperiment");
        PlayerSettings.Android.targetArchitectures = AndroidArchitecture.ARM64;
        PlayerSettings.SetScriptingBackend(NamedBuildTarget.Android, ScriptingImplementation.IL2CPP);
        PlayerSettings.Android.minSdkVersion = AndroidSdkVersions.AndroidApiLevel26;
        PlayerSettings.defaultInterfaceOrientation = UIOrientation.LandscapeLeft;
        PlayerSettings.runInBackground = true;
        var settings = new SerializedObject(AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/ProjectSettings.asset")[0]);
        settings.FindProperty("activeInputHandler").intValue = 1;
        settings.ApplyModifiedPropertiesWithoutUndo();
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
        var stone = Material("Stone", new Color(.22f, .28f, .33f));
        var wall = Material("Wall", new Color(.48f, .40f, .28f));
        var gold = Material("Explorer", new Color(.85f, .52f, .12f));
        Box("Ground", new Vector3(0, -.25f, 0), new Vector3(24, .5f, 24), stone);
        Box("Collision test wall", new Vector3(0, 1.5f, 0), new Vector3(5, 3, .6f), wall);
        Box("West wall", new Vector3(-12, 1.5f, 0), new Vector3(.5f, 3, 24), wall);
        Box("East wall", new Vector3(12, 1.5f, 0), new Vector3(.5f, 3, 24), wall);
        Box("North wall", new Vector3(0, 1.5f, 12), new Vector3(24, 3, .5f), wall);
        for (int i = 0; i < 6; i++) Box("Step " + i, new Vector3(6, .1f * (i + 1), 2 + i * .65f), new Vector3(3, .2f * (i + 1), .65f), wall);
        var sun = new GameObject("Sun").AddComponent<Light>(); sun.type = LightType.Directional; sun.intensity = 2; sun.shadows = LightShadows.Soft; sun.transform.rotation = Quaternion.Euler(45, -30, 0);
        RenderSettings.ambientMode = AmbientMode.Flat; RenderSettings.ambientLight = new Color(.35f, .4f, .5f);
        var hero = new GameObject("Explorer"); hero.layer = 2; hero.transform.position = new Vector3(0, .15f, -6);
        var motor = hero.AddComponent<CharacterController>(); motor.height = 1.8f; motor.center = Vector3.up * .9f; motor.radius = .3f; motor.stepOffset = .3f;
        var body = GameObject.CreatePrimitive(PrimitiveType.Capsule); body.name = "Avatar"; body.layer = 2; body.transform.SetParent(hero.transform, false); body.transform.localPosition = Vector3.up * .9f; body.transform.localScale = new Vector3(.6f, .9f, .6f); UnityEngine.Object.DestroyImmediate(body.GetComponent<Collider>()); body.GetComponent<Renderer>().sharedMaterial = gold;
        var camera = new GameObject("Explorer Camera").AddComponent<Camera>(); camera.tag = "MainCamera"; camera.nearClipPlane = .03f; camera.farClipPlane = 150; camera.fieldOfView = 70; camera.backgroundColor = new Color(.12f, .18f, .25f); camera.clearFlags = CameraClearFlags.SolidColor; camera.gameObject.AddComponent<AudioListener>(); camera.gameObject.AddComponent<UniversalAdditionalCameraData>();
        var controller = hero.AddComponent<ExplorerController>(); controller.viewCamera = camera; controller.avatar = body.GetComponent<Renderer>(); controller.UpdateCamera();
        new GameObject("Runtime verification").AddComponent<PrototypeSmoke>();
        EditorSceneManager.SaveScene(scene, ScenePath); EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(ScenePath, true) };
        AssetDatabase.SaveAssets();
        if (GraphicsSettings.defaultRenderPipeline != pipeline || !File.Exists(ScenePath)) throw new Exception("Scene/URP setup failed");
        Debug.Log("VTT_SETUP_PASS: scene saved with URP and build settings");
    }
    private static Material Material(string name, Color color)
    {
        string path = "Assets/Vtt/Settings/" + name + ".mat";
        var result = AssetDatabase.LoadAssetAtPath<Material>(path);
        if (!result) { result = new Material(Shader.Find("Universal Render Pipeline/Lit")); AssetDatabase.CreateAsset(result, path); }
        result.color = color; return result;
    }
    private static void Box(string name, Vector3 position, Vector3 scale, Material material)
    {
        var go = GameObject.CreatePrimitive(PrimitiveType.Cube); go.name = name; go.transform.position = position; go.transform.localScale = scale; go.GetComponent<Renderer>().sharedMaterial = material;
    }
    public static void BuildWindows() { Build(BuildTarget.StandaloneWindows64, "Builds/Windows/DndVtt.exe"); }
    public static void BuildAndroid() { Build(BuildTarget.Android, "Builds/Android/DndVtt-experiment.apk"); }
    public static void Snapshot()
    {
        EditorSceneManager.OpenScene(ScenePath);
        var explorer = UnityEngine.Object.FindFirstObjectByType<ExplorerController>();
        explorer.UpdateCamera();
        var target = new RenderTexture(1280, 720, 24); target.Create();
        var previous = RenderTexture.active;
        var image = new Texture2D(1280, 720, TextureFormat.RGB24, false);
        try
        {
            RenderPipeline.SubmitRenderRequest(explorer.viewCamera, new UniversalRenderPipeline.SingleCameraRequest { destination = target });
            RenderTexture.active = target;
            image.ReadPixels(new Rect(0, 0, 1280, 720), 0, 0); image.Apply();
            Directory.CreateDirectory("evidence");
            File.WriteAllBytes("evidence/exploration.png", image.EncodeToPNG());
            Debug.Log("VTT_SNAPSHOT_PASS: evidence/exploration.png (Editor URP render, not a player screenshot)");
        }
        finally { RenderTexture.active = previous; target.Release(); UnityEngine.Object.DestroyImmediate(target); UnityEngine.Object.DestroyImmediate(image); }
    }
    private static void Build(BuildTarget target, string path)
    {
        if (!File.Exists(ScenePath)) throw new Exception("Run PrototypeSetup.Create first");
        Directory.CreateDirectory(Path.GetDirectoryName(path));
        var report = BuildPipeline.BuildPlayer(new[] { ScenePath }, path, target, BuildOptions.Development);
        if (report.summary.result != BuildResult.Succeeded) throw new Exception("Build failed: " + report.summary.result);
        Debug.Log("VTT_BUILD_PASS: " + target + " bytes=" + report.summary.totalSize);
    }
}
