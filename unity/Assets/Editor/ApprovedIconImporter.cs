#if UNITY_EDITOR
using System;
using System.IO;
using System.IO.Compression;
using UnityEditor;
using UnityEngine;

namespace DndVtt.Editor
{
    /// <summary>
    /// Imports the complete approved 160-icon archive as Unity Sprite assets.
    /// This does not generate substitute artwork or alter game logic.
    /// </summary>
    public static class ApprovedIconImporter
    {
        // Use the existing Vtt/Resources folder; generated imports are ignored by git.
        private const string Destination = "Assets/Vtt/Resources/VttIcons";
        private const string ArchiveName = "DnD-VTT_160_icons_complete.zip";

        [MenuItem("DnD-VTT/Icons/Import Approved 160 PNG Archive")]
        public static void ImportArchive()
        {
            var zipPath = EditorUtility.OpenFilePanel("Select dnd_vtt_icons_160_complete.zip", "", "zip");
            if (string.IsNullOrEmpty(zipPath)) return;
            ImportArchivePath(zipPath, true);
        }

        // Called by both release builders, before BuildPipeline.BuildPlayer.
        // Do not depend on anyone clicking a menu on a headless CI runner.
        public static void EnsureImportedApprovedArchive()
        {
            string path = Path.GetFullPath(Path.Combine(Application.dataPath, "..", ArchiveName));
            if (!File.Exists(path))
                throw new FileNotFoundException("Approved DnD-VTT icon pack missing", path);
            ImportArchivePath(path, false);
        }

        private static void ImportArchivePath(string zipPath, bool showDialog)
        {
            // Validate the entire archive BEFORE writing any Unity assets.
            // A broken or partial ZIP must not leave half an imported pack.
            var payloads = new byte[161][];
            var seen = new bool[161];
            using (var archive = ZipFile.OpenRead(zipPath))
            {
                foreach (var entry in archive.Entries)
                {
                    string name = Path.GetFileName(entry.FullName);
                    if (!name.StartsWith("icon_", StringComparison.OrdinalIgnoreCase) ||
                        !name.EndsWith(".png", StringComparison.OrdinalIgnoreCase)) continue;
                    if (name.Length != 12 || !int.TryParse(name.Substring(5, 3), out int id) ||
                        id < 1 || id > 160 || seen[id])
                        throw new InvalidDataException("Invalid or duplicate icon: " + name);
                    seen[id] = true;
                    using (var input = entry.Open())
                    using (var memory = new MemoryStream())
                    {
                        input.CopyTo(memory);
                        payloads[id] = memory.ToArray();
                    }
                    var texture = new Texture2D(2, 2);
                    try
                    {
                        if (!texture.LoadImage(payloads[id]))
                            throw new InvalidDataException("Unreadable PNG: " + name);
                        if (texture.width != 256 || texture.height != 256)
                            throw new InvalidDataException("Expected 256x256 PNG: " + name);
                    }
                    finally { UnityEngine.Object.DestroyImmediate(texture); }
                }
            }
            for (int id = 1; id <= 160; id++)
                if (!seen[id])
                    throw new InvalidDataException("Missing approved icon: " + id.ToString("D3"));

            if (!Directory.Exists(Destination)) Directory.CreateDirectory(Destination);
            bool changed = false;
            for (int id = 1; id <= 160; id++)
            {
                string path = Destination + "/icon_" + id.ToString("D3") + ".png";
                byte[] current = File.Exists(path) ? File.ReadAllBytes(path) : null;
                byte[] approved = payloads[id];
                if (current != null && System.Linq.Enumerable.SequenceEqual(current, approved)) continue;
                File.WriteAllBytes(path, approved);
                changed = true;
            }
            // Synchronous import is required: BuildPipeline starts in this method.
            if (changed) AssetDatabase.Refresh(ImportAssetOptions.ForceSynchronousImport);
            for (int id = 1; id <= 160; id++)
            {
                string name = "icon_" + id.ToString("D3");
                string path = Destination + "/" + name + ".png";
                var importer = AssetImporter.GetAtPath(path) as TextureImporter;
                if (importer == null) throw new InvalidOperationException("No TextureImporter: " + path);
                if (importer.textureType != TextureImporterType.Sprite ||
                    importer.spriteImportMode != SpriteImportMode.Single ||
                    !importer.alphaIsTransparency || importer.mipmapEnabled ||
                    importer.textureCompression != TextureImporterCompression.Uncompressed)
                {
                    importer.textureType = TextureImporterType.Sprite;
                    importer.spriteImportMode = SpriteImportMode.Single;
                    importer.alphaIsTransparency = true;
                    importer.mipmapEnabled = false;
                    importer.textureCompression = TextureImporterCompression.Uncompressed;
                    importer.SaveAndReimport();
                }
                // Build fails if a sprite is not reachable by the same Resources path as runtime.
                Sprite sprite = Resources.Load<Sprite>("VttIcons/" + name);
                if (sprite == null || sprite.texture == null || sprite.texture.width != 256 ||
                    sprite.texture.height != 256)
                    throw new InvalidDataException("Approved icon not loadable by Resources: " + name);
            }
            Debug.Log("VTT_APPROVED_ICON_IMPORT_PASS: 160 sprites from " + zipPath);
            if (showDialog)
                EditorUtility.DisplayDialog("DnD-VTT icons", "160 sprites imported. Review the artwork before releasing.", "OK");
        }
    }
}
#endif
