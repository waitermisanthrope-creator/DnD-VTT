"""Offline structural contract for the two independent public content registries.

Run from repo root: python3 unity/ci/test_content_registry_contract.py
No network or Unity editor required.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = (ROOT / "unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs").read_text(encoding="utf-8")


def run():
    assert "DnD-VTT-Content/main/catalog/v3/index.json" in SOURCE
    assert "DnD-VTT-Assets/main/catalog/v6/index.json" in SOURCE
    store = (ROOT / "unity/Assets/Vtt/Runtime/WorkshopStore.cs").read_text(encoding="utf-8")
    assert "DnD-VTT-Content/main/packages/" in store
    assert "DnD-VTT-Assets/main/packages/" in store
    assert "WorkshopStore.MaxCatalogBytes" in SOURCE
    assert "WorkshopDownload" in SOURCE and "workshopStore.Install" in SOURCE
    assert "DigestFile(path)" in store and "File.Replace(part, path" in store
    assert 'kind == "content" ? "packages" : "packs"' in SOURCE
    assert "workshopStore.Installed()" in SOURCE
    assert 'VisibleContentPage()' in SOURCE and 'DrawContentTree()' in SOURCE
    previews=(ROOT/'unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentPreviews.cs').read_text(encoding='utf-8')
    assert 'PreviewCacheLimit=8*1024*1024' in previews and 'WorkshopStore.PreviewBytes' in previews
    assert 'CloseWorkshopPreviews()' in previews and 'Directory.Delete(contentPreviewRoot,true)' in previews
    print("UNITY_CONTENT_REGISTRY_CONTRACT_PASS: separate registries and verified installation")


if __name__ == "__main__":
    run()
