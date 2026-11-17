"""Scoped regression guard for the 1.00.63 glyph cleanup pass.

This source audit complements, but does not replace, Android visual checks.
Run: python3 unity/ci/test_grimoire_glyph_cleanup_63.py
"""
from pathlib import Path

R = Path(__file__).resolve().parents[2] / "unity/Assets/Vtt/Runtime"

def read(name):
    return (R / f"LegacySessionPanel.{name}.cs").read_text(encoding="utf-8")

def part(content, start, end):
    assert start in content and end in content
    return content.split(start, 1)[1].split(end, 1)[0]

def main():
    classic = part(read("ClassicSheet"), "private void ClassicSkills(", "private void ClassicNotes(")
    assert 'new[]{"-","П","Э"}[owned]+" >"' in classic
    assert 'new[]{"-","П","Э"},3' in classic
    assert "П — владение" in classic and "Э — экспертиза" in classic
    assert "skills[key]=choice" in classic
    assert "CharacterSheetRules.Recalculate(hero)" in classic
    assert "✓" not in classic and "▾" not in classic

    abilities = read("GrimoireAbilities")
    assert 'DrawGrimoireSectionHeading("Ячейки заклинаний",20);' in abilities
    assert 'DrawGrimoireSectionHeading("Ресурсы",16);' in abilities
    assert 'GrimoireAbilityFold("grimoire-ability-stats", "Параметры приёмов и магии")' in abilities
    assert "✦" not in abilities and "⚙" not in abilities
    assert "ApprovedGrimoireButton(label, open ? 9 : 2," in abilities
    assert "ChangeSpellUse(hero, level, filled ? 1 : -1)" in abilities
    assert "CharacterSheetRules.ChangeResource(" in abilities

    inventory = part(read("Commerce"), "private void DrawCommerceInventory(", "private void DrawCharacterFeats(")
    assert '"Экипировано" : "Экипировать"' in inventory
    assert "GrimoireWrappedGold : GrimoireWrappedTab" in inventory
    assert '"✓ Экипировано"' not in inventory
    assert "CommerceRules.Equip(hero,item)" in inventory

    manager = read("ContentManager")
    assert '"Установлено"' in manager and '"✓ Установлено"' not in manager
    assert "item[\"sha256\"]" in manager
    print("VTT_GRIMOIRE_GLYPH_CLEANUP_63_SOURCE_PASS")

if __name__ == "__main__":
    main()
