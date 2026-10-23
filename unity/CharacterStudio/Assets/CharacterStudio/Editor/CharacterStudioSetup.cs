using System;
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace DndVtt.CharacterStudio.Editor
{
    public sealed class CharacterStudioImport : AssetPostprocessor
    {
        void OnPreprocessModel()
        {
            if (!assetPath.EndsWith("/CharacterStudio/HumanBody.fbx", StringComparison.Ordinal)) return;
            var model = (ModelImporter)assetImporter;
            model.animationType = ModelImporterAnimationType.Generic;
            model.importAnimation = false;
            model.importBlendShapes = true;
            model.isReadable = true;
            model.meshCompression = ModelImporterMeshCompression.Off;
            model.importNormals = ModelImporterNormals.Import;
            model.importBlendShapeNormals = ModelImporterNormals.Calculate;
            model.importTangents = ModelImporterTangents.CalculateMikk;
            model.materialImportMode = ModelImporterMaterialImportMode.None;
            model.skinWeights = ModelImporterSkinWeights.Standard;
            model.globalScale = 1;
        }

        void OnPreprocessTexture()
        {
            if (!assetPath.Contains("/CharacterStudio/Resources/CharacterStudio/Skin")) return;
            var texture = (TextureImporter)assetImporter;
            texture.textureType = TextureImporterType.Default;
            texture.sRGBTexture = true;
            texture.maxTextureSize = 2048;
            texture.mipmapEnabled = true;
            texture.wrapMode = TextureWrapMode.Clamp;
        }
    }

    public static class CharacterStudioSetup
    {
        const string Folder = "Assets/CharacterStudio/Generated";
        public const string ScenePath = "Assets/CharacterStudio/Scenes/CharacterStudio.unity";

        [InitializeOnLoadMethod]
        static void OnLoad() { EditorApplication.delayCall += PrepareOnFirstImport; }

        static void PrepareOnFirstImport()
        {
            if (EditorApplication.isPlayingOrWillChangePlaymode || EditorApplication.isCompiling || EditorApplication.isUpdating)
            { EditorApplication.delayCall += PrepareOnFirstImport; return; }
            if (!AssetDatabase.LoadAssetAtPath<UniversalRenderPipelineAsset>(Folder + "/StudioPipeline.asset")) Prepare();
        }

        [MenuItem("DnD VTT/Prepare Character Studio")]
        public static void Prepare()
        {
            Directory.CreateDirectory(Folder);
            AssetDatabase.Refresh();
            // On a fresh checkout the model may have been imported before this
            // postprocessor compiled. Reimport if its required settings are absent.
            var model = AssetImporter.GetAtPath("Assets/CharacterStudio/Resources/CharacterStudio/HumanBody.fbx") as ModelImporter;
            if (model == null) throw new InvalidOperationException("HumanBody.fbx is missing.");
            if (!model.isReadable || !model.importBlendShapes || model.importAnimation || model.animationType != ModelImporterAnimationType.Generic)
            {
                model.isReadable = true;
                model.SaveAndReimport();
            }
            var pipeline = AssetDatabase.LoadAssetAtPath<UniversalRenderPipelineAsset>(Folder + "/StudioPipeline.asset");
            if (!pipeline)
            {
                var renderer = ScriptableObject.CreateInstance<UniversalRendererData>();
                AssetDatabase.CreateAsset(renderer, Folder + "/StudioRenderer.asset");
                pipeline = UniversalRenderPipelineAsset.Create(renderer);
                pipeline.msaaSampleCount = 4;
                AssetDatabase.CreateAsset(pipeline, Folder + "/StudioPipeline.asset");
            }
            GraphicsSettings.defaultRenderPipeline = pipeline;
            QualitySettings.renderPipeline = pipeline;
            PlayerSettings.colorSpace = ColorSpace.Linear;
            // Runtime Shader.Find must also work in a player build.
            var material = AssetDatabase.LoadAssetAtPath<Material>("Assets/CharacterStudio/Resources/CharacterStudio/PreviewLit.mat");
            if (!material)
            {
                material = new Material(Shader.Find("Universal Render Pipeline/Lit"));
                AssetDatabase.CreateAsset(material, "Assets/CharacterStudio/Resources/CharacterStudio/PreviewLit.mat");
            }
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(ScenePath, true) };
            AssetDatabase.SaveAssets();
        }

        [MenuItem("DnD VTT/Open Character Studio")]
        public static void Open()
        {
            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;
            Prepare(); EditorSceneManager.OpenScene(ScenePath);
        }

        [MenuItem("DnD VTT/Validate Character Assets")]
        public static void ValidateAssets()
        {
            var model = Resources.Load<GameObject>("CharacterStudio/HumanBody");
            if (!model) throw new InvalidOperationException("Missing FBX");
            var body = model.GetComponentInChildren<SkinnedMeshRenderer>();
            if (!body || body.bones.Length != 53 || body.sharedMesh.blendShapeCount != 23 || body.sharedMesh.triangles.Length != 107024 * 3)
                throw new InvalidOperationException("Unity import changed the rig, topology or morphs.");
            var instance = new GameObject("Validation");
            try
            {
                var preview = instance.AddComponent<CharacterBodyPreview>(); preview.Initialize();
                preview.Apply(AppearanceDocument.Create(false));
                if (preview.Bounds.size.y < 1.4f || preview.Bounds.size.y > 2) throw new InvalidOperationException("Unexpected male scale");
                preview.Apply(AppearanceDocument.Create(true));
                if (preview.Bounds.size.y < 1.3f || preview.Bounds.size.y > 2) throw new InvalidOperationException("Unexpected female scale");
            }
            finally { UnityEngine.Object.DestroyImmediate(instance); }
            Debug.Log("CHARACTER_STUDIO_UNITY_ASSETS_OK: 53 bones, 23 morphs, 107024 triangles, male/female preview.");
        }
    }
}
