"""Source + ZIP contract for approved 160 PNG icons, no Unity/Pillow required.

Run from repository root: python3 unity/ci/test_approved_icon_pipeline.py
This does NOT prove that Android or Windows render correctly.
"""
from pathlib import Path
import re
import struct
import zipfile

ROOT = Path(__file__).resolve().parents[2]
ZIP = ROOT / "unity/DnD-VTT_160_icons_complete.zip"
ICON_NAMES = {f"icon_{n:03d}.png" for n in range(1, 161)}
PNG = b"\x89PNG\r\n\x1a\n"


def main():
    assert ZIP.is_file(), "Approved ZIP missing"
    with zipfile.ZipFile(ZIP) as archive:
        icons = {}
        for name in archive.namelist():
            basename = name.rsplit("/", 1)[-1]
            if re.fullmatch(r"icon_\d{3}\.png", basename):
                assert basename not in icons, "Duplicate icon: " + basename
                icons[basename] = name
        assert set(icons) == ICON_NAMES, "Icon IDs must be exactly 001..160"
        for basename, name in sorted(icons.items()):
            data = archive.read(name)
            assert len(data) > 1024, "Empty icon: " + basename
            assert data[:8] == PNG and data[12:16] == b"IHDR", "Not PNG: " + basename
            width, height = struct.unpack(">II", data[16:24])
            assert (width, height) == (256, 256), "Not 256x256: " + basename
            assert data[25] == 6, "Expected RGBA: " + basename
            assert data[-12:-8] == b"\x00\x00\x00\x00" and data[-8:-4] == b"IEND", "PNG truncated: " + basename

    def read(path):
        return (ROOT / path).read_text(encoding="utf-8")

    importer = read("unity/Assets/Editor/ApprovedIconImporter.cs")
    release = read("unity/Assets/Vtt/Editor/UnityReleaseBuild.cs")
    registry = read("unity/Assets/Vtt/Runtime/ApprovedIconRegistry.cs")
    assert "EnsureImportedApprovedArchive" in importer
    assert "DnD-VTT_160_icons_complete.zip" in importer
    assert 'Assets/Vtt/Resources/VttIcons' in importer
    assert "ImportAssetOptions.ForceSynchronousImport" in importer
    assert "TextureImporterType.Sprite" in importer
    assert 'Resources.Load<Sprite>("VttIcons/" + name)' in importer
    assert "ApprovedIconImporter.EnsureImportedApprovedArchive();" in release
    assert release.index("ApprovedIconImporter.EnsureImportedApprovedArchive();") < release.index("BuildPipeline.BuildPlayer(")
    assert 'Resources.Load<Sprite>("VttIcons/icon_"' in registry
    assert "\\n" not in registry, "Literal backslash-n broke C# source"
    assert "EventType.Repaint" in registry
    assert "/Assets/Vtt/Resources/VttIcons/" in read("unity/.gitignore")
    print("VTT_APPROVED_ICON_PIPELINE_CONTRACT_PASS: 160 RGBA PNGs, auto import, Resources lookup")


if __name__ == "__main__":
    main()
