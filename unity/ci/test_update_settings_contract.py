"""Offline source/feed contract checks for Unity's in-app update center."""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
def read(path):
    return (ROOT / path).read_text(encoding="utf-8")

def code(version):
    assert re.fullmatch(r"[1-9][0-9]{0,3}\.[0-9]{2}\.[0-9]{2}", version), version
    a, b, c = map(int, version.split("."))
    return 10000 * a + 100 * b + c

def run():
    live = json.loads(read("updates/unity-experiment.json"))
    remote = json.loads(read("updates/unity-changelog.json"))
    bundled = json.loads(read("unity/Assets/Vtt/Resources/Changelog.json"))
    assert remote == bundled, "Local and online changelogs differ"
    assert remote["schema"] == 1 and remote["channel"] == "unity-experiment"
    versions = [x["version"] for x in remote["releases"]]
    codes = [code(v) for v in versions]
    assert all(item["versionCode"] == n for item, n in zip(remote["releases"], codes))
    assert len(codes) == len(set(codes)) and codes == sorted(codes, reverse=True)
    assert live["versionCode"] == code(live["version"])
    assert live["version"] in versions, "Public version missing in history"
    assert all(x["changes"] for x in remote["releases"])
    assert all(x["status"] in ("testing", "published") for x in remote["releases"])
    assert any(x["version"] == "1.00.02" and x["status"] == "testing" for x in remote["releases"])
    release = read("unity/Assets/Vtt/Runtime/UnityRelease.cs")
    ui = read("unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs")
    prefs = read("unity/Assets/Vtt/Runtime/ClientPreferences.cs")
    assert "updates/unity-experiment.json" in release and "updates/unity-changelog.json" in release
    assert all(key in ui for key in ("Проверить обновление", "Скачать обновление", "Обновить", "История изменений", "VerifyFile", "AndroidJavaClass", "FetchChangelog"))
    assert "autoCheckUpdates" in prefs and "theme" in prefs
    assert "StartCoroutine(CheckForUpdates())" in read("unity/Assets/Vtt/Runtime/LegacySessionPanel.cs")
    assert "REQUEST_INSTALL_PACKAGES" in read("unity/Assets/Vtt/Editor/UnityReleaseBuild.cs")
    assert "PackageManager.GET_SIGNING_CERTIFICATES" in read("unity/Assets/Plugins/Android/UpdateProvider.java")
    assert '"getCacheDir"' in ui, "Updater must share Java provider cache path"
    assert 'activity.getCacheDir()' in read("unity/Assets/Plugins/Android/UpdateProvider.java")
    assert "UNITY_ANDROID_UPDATE_PUBLISHED" in read("unity/ci/publish_android_update.py")
    assert "github.actor == 'waitermisanthrope-creator'" in read(".github/workflows/unity-android-update-publish.yml")
    print("UNITY_UPDATE_SETTINGS_CONTRACT_PASS: changelog, safe APK updater, theme and startup check")

if __name__ == "__main__":
    run()
