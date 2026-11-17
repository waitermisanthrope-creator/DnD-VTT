"""Source contract: first stage of unified gold-grimoire native UI.

Run: python3 unity/ci/test_unified_grimoire_visual_contract.py
Static contract only. It is NOT a substitute for Unity Android/Windows render QA.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def source(name):
    return (ROOT / "unity/Assets/Vtt/Runtime" / name).read_text(encoding="utf-8")

def main():
    frontend = source("LegacySessionPanel.FrontEnd.cs")
    kit = source("LegacySessionPanel.UnifiedGrimoire.cs")
    branding = source("LegacySessionPanel.Branding.cs")
    sheet = source("LegacySessionPanel.Sheet.cs")
    assert 'if (screen != FrontScreen.Sheet) PrepareUnifiedGrimoireSkin();' in frontend
    assert 'PrepareGrimoireAbilityStyles();' in kit
    assert 'new GUIStyle(uiStyles.AbilityPanel)' in kit
    assert 'new GUIStyle(uiStyles.AbilityChip)' in kit
    assert 'new GUIStyle(uiStyles.AbilityInput)' in kit
    assert 'GUI.skin = unifiedGrimoireSkin;' in kit
    assert 'new GUIStyle(uiStyles.AbilityGold)' in frontend
    assert 'GUILayout.BeginVertical(uiStyles.AbilityCard);' in frontend
    assert 'GUILayout.BeginVertical(uiStyles.AbilityPanel);' in frontend
    assert '"rosterSearch", rosterSearch, uiStyles.AbilityInput' in frontend
    assert 'if (unifiedGrimoireSkin)' in branding
    assert 'GUI.skin==sheetSkin||GUI.skin==unifiedGrimoireSkin' in branding
    # Hero, ability and wallet gameplay dispatchers are not replaced by skin code.
    for s in ('case 0: GrimoireHero(hero, ref changed)',
              'case 2: DrawGrimoireAbilities(hero,ref changed)',
              'case 3: Wallet(hero,ref changed,ref persistWallet)',
              'case 7: Wallet(hero, ref changed, ref persistWallet)'):
        assert s in sheet, s
    assert 'PrepareUnifiedGrimoireSkin' not in sheet
    print("VTT_UNIFIED_GRIMOIRE_VISUAL_CONTRACT_PASS")

if __name__ == "__main__":
    main()
