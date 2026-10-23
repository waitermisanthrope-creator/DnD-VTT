using UnityEditor;
using UnityEngine;

public sealed class CharacterPreviewImport : AssetPostprocessor
{
    public const string ModelPath = "Assets/Vtt/Resources/CharacterStudio/HumanBody.fbx";
    void OnPreprocessModel()
    {
        if (assetPath != ModelPath) return;
        var model = (ModelImporter)assetImporter;
        model.animationType = ModelImporterAnimationType.Generic;
        model.importAnimation = false; model.importBlendShapes = true; model.isReadable = true;
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
        if (!assetPath.StartsWith("Assets/Vtt/Resources/CharacterStudio/Skin")) return;
        var texture = (TextureImporter)assetImporter;
        texture.textureType = TextureImporterType.Default; texture.sRGBTexture = true;
        texture.maxTextureSize = 2048; texture.mipmapEnabled = true; texture.wrapMode = TextureWrapMode.Clamp;
    }
}
