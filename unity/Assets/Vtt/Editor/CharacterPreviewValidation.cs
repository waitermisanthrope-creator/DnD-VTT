using System;
using System.IO;
using System.Linq;
using System.Reflection;
using DndVtt.UnityPrototype;
using Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;

public static class CharacterPreviewValidation
{
    static void Check(bool value, string name) { if (!value) throw new Exception("CHARACTER_PREVIEW: " + name); }
    public static void Prepare()
    {
        var importer = (ModelImporter)AssetImporter.GetAtPath(CharacterPreviewImport.ModelPath);
        Check(importer != null, "FBX exists");
        if (!importer.isReadable || !importer.importBlendShapes || importer.importAnimation || importer.indexFormat != ModelImporterIndexFormat.UInt32)
        { importer.isReadable = true; importer.SaveAndReimport(); }
        foreach (string skin in new[] { "SkinMale", "SkinFemale" })
        {
            string path = "Assets/Vtt/Resources/CharacterStudio/" + skin + ".png";
            AssetDatabase.ImportAsset(path, ImportAssetOptions.ForceUpdate | ImportAssetOptions.ForceSynchronousImport);
            var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(path);
            Check(texture && texture.width == 2048 && texture.height == 2048,
                "2D skin import: " + path + "; imported assets: " + string.Join(",", AssetDatabase.LoadAllAssetsAtPath(path).Select(a => a.GetType().Name + ":" + a.name)));
            var runtime = Resources.Load<Texture2D>("CharacterStudio/" + skin);
            Check(runtime, "skin available through runtime Resources: " + skin);
            Debug.Log("VTT_CHARACTER_TEXTURE_PASS: " + skin + " " + texture.GetType().Name + " " + texture.width + "x" + texture.height);
        }
    }
    public static void Run()
    {
        var model = Resources.Load<GameObject>("CharacterStudio/HumanBody");
        Check(model != null, "runtime resource exists");
        var renderer = model.GetComponentInChildren<SkinnedMeshRenderer>();
        Check(model.GetComponentsInChildren<SkinnedMeshRenderer>().Length == 1, "single unsplit body renderer");
        Check(renderer && renderer.bones.Length == 53, "53 bones preserved");
        Check(renderer.sharedMesh.blendShapeCount == 23, "23 morphs preserved");
        Check(renderer.sharedMesh.triangles.Length == 107024 * 3, "107024 triangles preserved");
        string folder = Path.Combine("Builds", "CharacterValidation"); Directory.CreateDirectory(folder);
        using (var studio = new CharacterStudioView())
        {
            foreach (bool female in new[] { false, true })
            {
                string gender = female ? "female" : "male";
                var document = AppearanceDocument.Create(female); studio.Apply(document);
                Check(studio.Body.Bounds.size.y > 1.3f && studio.Body.Bounds.size.y < 2.1f, "human scale: " + gender + " " + studio.Body.Bounds);
                studio.Angle(0); studio.Frame(false); studio.Render(true); Save(studio.Image, Path.Combine(folder, gender + "-body.png"));
                studio.Frame(true); studio.Render(true); Save(studio.Image, Path.Combine(folder, gender + "-face.png"));
                studio.Grey(true); studio.Render(true); Save(studio.Image, Path.Combine(folder, gender + "-grey.png"));
                studio.Grey(false); studio.Orbit(new Vector2(100, 5)); studio.Zoom(.9f); studio.Render(true);
                Check(Mathf.Abs(studio.Yaw) > 1, "orbit changes camera");
                foreach (float sign in new[] { -1f, 1f })
                {
                    foreach (var property in document.Body.Properties().ToArray()) document.Set(property.Name, sign);
                    studio.Apply(document); Check(studio.Body.Bounds.size.y > .5f && studio.Body.Bounds.size.y < 3, "extreme body bounds");
                    foreach (var mesh in studio.Body.GetComponentsInChildren<MeshFilter>())
                    foreach (var point in mesh.sharedMesh.vertices)
                        Check(float.IsFinite(point.x) && float.IsFinite(point.y) && float.IsFinite(point.z), "finite body vertex");
                }
            }
        }
        var root = new JObject { ["id"] = "sheet-test", ["hpCurrent"] = 17, ["unknown"] = new JArray(1, 2), ["appearance3d"] = AppearanceDocument.Create(false).Root };
        var appearance = new AppearanceDocument(root.ToString()); appearance.Set("shoulders", .5f); appearance.SetGender(true);
        var restored = new AppearanceDocument(appearance.Serialize());
        Check((int)restored.Root["hpCurrent"] == 17 && JToken.DeepEquals(restored.Root["unknown"], root["unknown"]), "sheet envelope retained");
        Check(restored.Female && Mathf.Abs(restored.Get("shoulders") - .5f) < .0001f, "draft round trip");
        VerifyMenuController();
        Debug.Log("VTT_CHARACTER_PREVIEW_PASS: native menu open/close, male/female, rig/morphs, body controls, orbit, six real PNGs and JSON preservation");
    }
    static void VerifyMenuController()
    {
        var host = new GameObject("Character menu validation");
        try
        {
            var panel = host.AddComponent<LegacySessionPanel>();
            panel.world = host.AddComponent<LegacyMapPresenter>(); panel.world.explorer = host.AddComponent<ExplorerController>();
            const BindingFlags flags = BindingFlags.Instance | BindingFlags.NonPublic;
            typeof(LegacySessionPanel).GetMethod("OpenCharacterStudio", flags).Invoke(panel, null);
            Check(typeof(LegacySessionPanel).GetField("characterStudio", flags).GetValue(panel) != null, "home button opens actual studio");
            Check(typeof(LegacySessionPanel).GetField("screen", flags).GetValue(panel).ToString() == "CharacterStudio", "native destination selected");
            Check(!panel.world.explorer.acceptInput, "map controls disabled in character view");
            typeof(LegacySessionPanel).GetMethod("CloseCharacterStudio", flags).Invoke(panel, null);
            Check(typeof(LegacySessionPanel).GetField("characterStudio", flags).GetValue(panel) == null, "close disposes preview");
        }
        finally { UnityEngine.Object.DestroyImmediate(host); }
    }
    static void Save(RenderTexture source, string path)
    {
        var previous = RenderTexture.active;
        var image = new Texture2D(source.width, source.height, TextureFormat.RGB24, false);
        try
        {
            RenderTexture.active = source; image.ReadPixels(new Rect(0, 0, image.width, image.height), 0, 0); image.Apply();
            File.WriteAllBytes(path, image.EncodeToPNG());
            var thumbnail = new Texture2D(150, 200, TextureFormat.RGB24, false);
            try
            {
                var samples = new Color[150 * 200];
                for (int y = 0; y < 200; y++) for (int x = 0; x < 150; x++)
                    samples[y * 150 + x] = image.GetPixelBilinear((x + .5f) / 150, (y + .5f) / 200);
                thumbnail.SetPixels(samples); thumbnail.Apply();
                Debug.Log("VTT_CHARACTER_THUMBNAIL:" + Path.GetFileName(path) + ":" + Convert.ToBase64String(thumbnail.EncodeToPNG()));
            }
            finally { UnityEngine.Object.DestroyImmediate(thumbnail); }
            var pixels = image.GetPixels32(); int visible = pixels.Count(c => c.r > 55 || c.g > 55 || c.b > 65);
            Debug.Log("VTT_CHARACTER_PIXELS: " + path + " visible=" + visible + "/" + pixels.Length + " max=" + pixels.Max(c => Mathf.Max(c.r, Mathf.Max(c.g, c.b))));
            Check(visible > pixels.Length / 100, "rendered body is visible: " + path);
            Check(pixels.Count(c => c.r > 220 && c.b > 220 && c.g < 80) < pixels.Length / 20, "no pink missing shader: " + path);
        }
        finally { RenderTexture.active = previous; UnityEngine.Object.DestroyImmediate(image); }
    }
}
