"""Grimoire overflow fixes: static UI source contract (not device QA)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
src = (ROOT / "unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireAbilities.cs").read_text(encoding="utf-8")
shared = (ROOT / "unity/Assets/Vtt/Runtime/LegacySessionPanel.UnifiedGrimoire.cs").read_text(encoding="utf-8")

def main():
    assert 'GrimoireWrappedTab, GUILayout.MinHeight(44)' in src
    assert 'feature.name, GrimoireWrappedTab' in src
    assert 'wordWrap = true, fontSize = 13' in shared
    assert 'const int orbsPerRow = 6;' in src
    assert 'const int orbCellWidth = 22;' in src
    assert 'const int orbRowWidth = orbsPerRow * orbCellWidth;' in src
    assert 'GUILayout.Width(orbRowWidth + 6)' in src
    assert 'start += orbsPerRow' in src
    assert 'Math.Min(display, start + orbsPerRow)' in src
    assert 'GUILayout.Width(orbRowWidth)' in src
    assert 'row.x + (index - start) * orbCellWidth' in src
    assert 'SwipePosition("grimoire-ability-slots", abilitySlotsScroll)' in src
    assert 'CharacterSheetRules.ChangePactUse(hero, filled ? 1 : -1)' in src
    assert 'CharacterSheetRules.ChangeSpellUse(hero, level, filled ? 1 : -1)' in src
    print("VTT_GRIMOIRE_OVERFLOW_LAYOUT_SOURCE_PASS")

if __name__ == "__main__":
    main()
