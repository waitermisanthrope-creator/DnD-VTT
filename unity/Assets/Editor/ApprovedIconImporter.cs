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
        private const string Destination = "Assets/Resources/VttIcons";

        [MenuItem("DnD-VTT/Icons/Import Approved 160 PNG Archive")]
        public static void ImportArchive()
        {
            var zipPath = EditorUtility.OpenFilePanel("Select dnd_vtt_icons_160_complete.zip", "", "zip");
            if (string.IsNullOrEmpty(zipPath)) return;
            if (!Directory.Exists(Destination)) Directory.CreateDirectory(Destination);

            int imported = 0;
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
                    string destination = Destination + "/icon_" + id.ToString("D3") + ".png";
                    using (var input = entry.Open())
                    using (var output = File.Create(destination))
                        input.CopyTo(output);
                    imported++;
                }
            }
            if (imported != 160)
                throw new InvalidDataException("Expected 160 icons, found " + imported +
                    ". Partial import may exist; correct archive and reimport.");
            AssetDatabase.Refresh();
            for (int id = 1; id <= 160; id++)
            {
                string path = Destination + "/icon_" + id.ToString("D3") + ".png";
                var importer = AssetImporter.GetAtPath(path) as TextureImporter;
                if (importer == null) throw new InvalidOperationException("No TextureImporter: " + path);
                importer.textureType = TextureImporterType.Sprite;
                importer.spriteImportMode = SpriteImportMode.Single;
                importer.alphaIsTransparency = true;
                importer.mipmapEnabled = false;
                importer.textureCompression = TextureImporterCompression.Uncompressed;
                importer.SaveAndReimport();
            }
            Debug.Log("DnD-VTT: imported 160 approved icon sprites to " + Destination +
                ". Review artwork and transparency before production release.");
            EditorUtility.DisplayDialog("DnD-VTT icons", "160 sprites imported. Review the artwork before releasing.", "OK");
        }
    }
}
#endif
