"""Static safety contract for system-screen grimoire skin. Not native QA.

Run: python3 unity/ci/test_unified_grimoire_system_contract.py
"""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
RUNTIME = ROOT / "unity/Assets/Vtt/Runtime"

def read(name):
    return (RUNTIME / name).read_text(encoding="utf-8")

def section(text, start, end):
    assert start in text and end in text
    return text.split(start, 1)[1].split(end, 1)[0]

def main():
    home = read("LegacySessionPanel.Branding.cs")
    settings = read("LegacySessionPanel.BrandSettings.cs")
    content = read("LegacySessionPanel.ContentManager.cs")
    dice = read("LegacySessionPanel.Dice.cs")
    studio = read("LegacySessionPanel.CharacterStudio.cs")
    shared = read("LegacySessionPanel.UnifiedGrimoire.cs")
    sheet = read("LegacySessionPanel.Sheet.cs")

    assert "private void PrepareGrimoireSystemStyles()" in shared
    assert "PrepareSheetSkin();" in shared and "PrepareGrimoireAbilityStyles();" in shared
    assert "if (!unifiedGrimoireSkin)" in shared  # no per-frame GUISkin allocation

    home_view = section(home, "private void DrawBrandHome()", "private void DrawBrandMore()")
    for fragment in ("DrawBrandBackdrop(false)", "PrepareGrimoireSystemStyles();",
                     "GUILayout.BeginHorizontal(uiStyles.AbilityCard",
                     'GUILayout.Button("+ Новый персонаж", GrimoireWrappedGold',
                     'GUILayout.Button("Настройки", GrimoireWrappedGold',
                     "BeginCreation()", "OpenContentManager()", "OpenSettings()",
                     "Navigate(FrontScreen.Map)", "Navigate(FrontScreen.Dice)"):
        assert fragment in home_view, fragment
    assert "DrawBrandBackdrop(false)" in home_view  # user wallpaper remains

    for fragment in ("GUILayout.BeginVertical(uiStyles.AbilityCard",
                     'GUILayout.Button("Проверить и обновить",GrimoireWrappedGold',
                     'GUILayout.Button("История изменений",GrimoireWrappedTab',
                     "settingsDraft.Save(SettingsPath)", "SavePendingAccent()",
                     "pendingAccentHex = normalized", "DrawInterfaceColorSettings()",
                     "DrawSettings(true)", "StartCoroutine(FetchChangelog())"):
        assert fragment in settings, fragment
    assert 'GUI.Box(new Rect(x,12,width,UiHeight-24),GUIContent.none,uiStyles.AbilityPanel)' in settings

    manager = section(content, "private void DrawContentManager()", "\n    }\n}")
    for fragment in ("DrawGrimoireSectionHeading(\"Мастерская дополнений\",40)",
                     "GUILayout.BeginVertical(uiStyles.AbilityCard)",
                     'contentSearch = MenuTextField("contentSearch", contentSearch,uiStyles.AbilityInput',
                     "SyncWorkshopPreviewPage()", "DrawContentPagination()",
                     "StartCoroutine(DownloadContentPackage((JObject)item.DeepClone()))",
                     "workshopStore.Remove(id)", "QueueWorkshopPreview()"):
        assert fragment in manager, fragment

    dice_page = section(dice, "private void DrawDiceTable()", "\n    }\n}")
    assert 'DrawGrimoireSectionHeading("Объёмные дайсы",43)' in dice_page
    assert "GUILayout.BeginVertical(uiStyles.AbilityPanel)" in dice_page
    for intact in ("diceTable.Throw(DiceGroupExpression())",
                   "diceMotion.Reset();diceTable.Cancel();",
                   "GUI.DrawTexture(image,diceTable.Image,ScaleMode.ScaleToFit,false)",
                   "StartDiceCatalog();SafePollDiceCatalog()"):
        assert intact in dice_page, intact

    studio_page = section(studio, "private void DrawCharacterStudio()", "void CharacterAction(")
    for frag in ("PrepareGrimoireSystemStyles()", "GUILayout.BeginArea(controls, uiStyles.AbilityPanel)",
                 "GUI.DrawTexture(view, characterStudio.Image, ScaleMode.ScaleToFit, false)",
                 "characterStudio.Render()",  # verified in broader file below
                 "CharacterAction("):
        if frag != "characterStudio.Render()" and frag != "CharacterAction(":
            assert frag in studio_page, frag
    assert "characterStudio.Render()" in studio
    assert "File.WriteAllText(CharacterDraftPath, characterDraft.Serialize())" in studio

    # Shell only: original sheet/wallet and character save flow must not be rerouted.
    assert "case 3: Wallet(hero,ref changed,ref persistWallet)" in sheet
    assert "case 7: Wallet(hero, ref changed, ref persistWallet)" in sheet
    assert "PrepareGrimoireSystemStyles()" not in sheet
    print("VTT_UNIFIED_GRIMOIRE_SYSTEM_SOURCE_PASS")

if __name__ == "__main__":
    main()
