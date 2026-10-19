"""Contract for the exact main-branch branding asset subset and Unity-native screens.

Run from the repository root: python3 unity/ci/test_brand_visual_contract.py
This intentionally does NOT compile Unity or approve a public release.
"""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[2]
BRAND = ROOT / "unity/Assets/Vtt/Resources/Branding"
ORIGINAL_BLOBS = {
    "Wallpaper16.jpg": "470102c96db7b943e05d3e3950ade629056a83c4",  # main/wallpapers/16.png is JPEG-encoded
    "Splash19.png": "f29502a54207832e0f4c3500bd19678f7d2ca127",
    "Dragon20.png": "87b24f2daeaa880d9e5aab30a91cc49518288cbb",
}

def read(path):
    return (ROOT / path).read_text(encoding="utf-8")

def main():
    found = {p.name for p in BRAND.iterdir() if p.is_file() and not p.name.endswith(".meta")}
    assert found == set(ORIGINAL_BLOBS), "Only 16, 19, 20 from source wallpapers may be bundled"
    for name, sha in ORIGINAL_BLOBS.items():
        actual = subprocess.check_output(["git", "hash-object", str(BRAND / name)], cwd=ROOT, text=True).strip()
        assert actual == sha, name + " must be bitwise identical to main"
        backup = ROOT / "unity/Assets/StreamingAssets/Branding" / name
        assert backup.is_file(), "APK fallback missing: " + name
        backup_hash = subprocess.check_output(["git", "hash-object", str(backup)], cwd=ROOT, text=True).strip()
        assert backup_hash == sha, "Android fallback must be identical to main: " + name
    home = read("unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs")
    settings = read("unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs")
    frontend = read("unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs")
    client = read("unity/Assets/Vtt/Runtime/ClientPreferences.cs")
    updater = read("unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs")
    assert all(name in home for name in ("Branding/Wallpaper16", "Branding/Splash19", "Branding/Dragon20", "DrawBrandHome", "ReadPackagedArt", "ScaleMode.ScaleAndCrop"))
    assert all(name in frontend for name in ("DrawBrandHome(); return;", "DrawBrandSettings(); return;"))
    assert all(name in settings for name in ("wallpapers/16.png", "DrawTechnicalSettings", "Проверить и обновить", "Save(SettingsPath)"))
    assert all(name in client for name in ("frameStyle", "frameColor", "theme", "autoCheckUpdates"))
    assert all(name in updater for name in ("VerifyFile", "DownloadHandlerFile", "AttemptInstallUpdate"))
    assert "brandTechnicalScreen" in frontend
    assert "VTT_BRANDING_ASSET_PASS" in read("unity/Assets/Vtt/Editor/UnityReleaseBuild.cs")
    assert "ScreenOrientation.LandscapeLeft" in frontend
    assert "defaultScreenOrientation: 1" in read("unity/ProjectSettings/ProjectSettings.asset")
    assert "APPLICATION_DISABLED" not in updater
    print("UNITY_BRAND_VISUAL_CONTRACT_PASS: source assets, splash, native UI, settings and updater retained")

if __name__ == "__main__":
    main()
