"""Offline structural contract for the two independent public content registries.

Run from repo root: python3 unity/ci/test_content_registry_contract.py
No network or Unity editor required.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = (ROOT / "unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs").read_text(encoding="utf-8")


def run():
    assert "DnD-VTT-Content/main/catalog/v1/index.json" in SOURCE
    assert "DnD-VTT-Assets/main/catalog/v1/index.json" in SOURCE
    assert "DnD-VTT-Content/main/packages/" in SOURCE
    assert "MaxCatalogBytes" in SOURCE and "MaxPackageBytes" in SOURCE
    assert "Sha256(bytes)" in SOURCE and "File.Move(temp, target)" in SOURCE
    assert 'assetsDoc["packs"] is JArray packs' in SOURCE
    assert "assetPacks = (JArray)packs.DeepClone()" in SOURCE
    assert "AssetBundles" in SOURCE
    print("UNITY_CONTENT_REGISTRY_CONTRACT_PASS: separate registries and guarded JSON download")


if __name__ == "__main__":
    run()
