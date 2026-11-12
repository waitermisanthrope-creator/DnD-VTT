"""Integration guard; behavioral color/persistence checks live in ThemeChecks.cs."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
def read(name):
    return (ROOT / 'unity/Assets/Vtt/Runtime' / name).read_text()
def main():
    settings = read('LegacySessionPanel.BrandSettings.cs')
    brand = read('LegacySessionPanel.Branding.cs')
    sheet = read('LegacySessionPanel.SheetSkin.cs')
    assert 'DrawInterfaceColorSettings();' in settings
    assert settings.index('GUILayout.EndArea();\n            SavePendingAccent();') > settings.index('RegisterSwipe("settings"')
    assert 'ClientPreferences.Parse(preferences.Export())' in settings
    assert 'candidate.accentHex = pendingAccentHex;' in settings
    assert 'candidate.Save(SettingsPath);' in settings
    assert 'MenuTextField("interface-accent-hex", accentHexInput, 16,' in settings
    assert 'brandTemplateSkin=Instantiate(GUI.skin)' in brand
    assert 'GUI.skin=brandTemplateSkin;' in brand
    assert 'cachedAccentInput!=preferences?.accentHex' in brand
    assert brand.index('cachedAccentInput!=preferences?.accentHex') < brand.index('string accentHex = UiTheme.ResolveAccent')
    assert 'uiStyles = null;' in brand
    assert 'ThemeHeadingAccent' in sheet
    assert 'RequestGuiResourceRestore();else CancelPageSwipe();' in brand
    assert 'sheetSkin = Instantiate(brandTemplateSkin)' in sheet
    print('UI_THEME_CONTRACT_PASS: settings, independent save, keyboard field, skin ownership, cache and tabs')
if __name__ == '__main__':
    main()
