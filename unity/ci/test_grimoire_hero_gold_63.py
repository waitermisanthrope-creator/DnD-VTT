"""DnD-VTT gold grimoire Hero screenshot-regression source contract.

Source assertions (not a native Unity compile or visual test).
Execute: python3 unity/ci/test_grimoire_hero_gold_63.py
"""
from pathlib import Path

RUNTIME = Path(__file__).resolve().parents[2] / "unity/Assets/Vtt/Runtime"

def file(short):
    return (RUNTIME / f"LegacySessionPanel.{short}.cs").read_text(encoding="utf-8")

def section(s, first, last):
    assert first in s and last in s
    return s.split(first, 1)[1].split(last, 1)[0]

def main():
    hero = file("GrimoireHero")
    detail = file("GrimoireDetails")
    shared = file("UnifiedGrimoire")
    sheet = file("Sheet")
    gold_hero = section(hero, "private void GrimoireHero(", "private void GrimoireIconHeading(")
    assert "PrepareGrimoireAbilityStyles();" in gold_hero
    assert "GUILayout.BeginVertical(uiStyles.AbilityPanel)" in gold_hero
    assert "DndVtt.ApprovedIconRegistry.GetSprite(13)" in gold_hero

    for title, icon in (
        ('"ЗДОРОВЬЕ" or "ЗДОРОВЬЕ И ОТДЫХ"', 15),
        ('"БОЕВЫЕ ПОКАЗАТЕЛИ" or "БОЕВЫЕ ПАРАМЕТРЫ"', 53),
        ('"ОПЫТ И УРОВЕНЬ"', 18),
        ('"СОСТОЯНИЕ" or "СОСТОЯНИЯ"', 65),
        ('"ЛИЧНЫЕ ДАННЫЕ"', 13),
        ('"ХАРАКТЕРИСТИКИ"', 97),
        ('"УПРАВЛЕНИЕ ДАННЫМИ"', 17),
    ):
        assert title + f" => {icon}" in hero, title
    assert "DrawGrimoireSectionHeading(title, id)" in hero
    assert "legacyIcon, ScaleMode.ScaleToFit" in hero

    for name in ("GrimoireIdentity(", "GrimoireHealth(", "GrimoireMetrics(",
                 "GrimoireExperience(", "GrimoireConditions(", "GrimoireQuickActions("):
        assert name in hero
    assert hero.count("GUILayout.BeginVertical(uiStyles.AbilityPanel)") >= 4
    assert "GUILayout.BeginVertical(uiStyles.AbilityCard, GUILayout.ExpandWidth(true))" in hero
    assert 'MeasuredMenuButton("−1 HP", GrimoireWrappedTab' in hero
    assert 'MeasuredMenuButton("+1 HP", GrimoireWrappedTab' in hero
    assert 'MeasuredMenuButton("Развитие", GrimoireWrappedGold' in hero
    for operation in ("CharacterSheetRules.ChangeHealth(hero, 1, false)",
                      "CharacterSheetRules.ChangeHealth(hero, 1, true)",
                      "BeginAdvancement(hero, true)",
                      "OpenHeroQuickView(5)", "OpenHeroQuickView(2)",
                      "long current = DisplayExperience(hero)"):
        assert operation in hero, operation

    assert "GrimoireWrappedTab" in detail and "GrimoireWrappedGold" in detail
    assert "grimoireDetailsTab == i" in detail
    assert "GUILayout.BeginVertical(uiStyles.AbilityPanel)" in detail
    assert "CommitGrimoireDetailKeyboard(hero, ref changed)" in detail
    for operation in ("CharacterSheetRules.SetDeathTrack(hero",
                      "CharacterSheetRules.RecordRest(hero, full)",
                      "CharacterSheetRules.ToggleSheetCondition(hero, condition)",
                      "CharacterSheetRules.Recalculate(hero)"):
        assert operation in detail, operation
    for old_glyph in ("▾", "▸", "⚄", "✓", "●", "○"):
        assert old_glyph not in detail, old_glyph

    assert "padding = new RectOffset(29, 29, 29, 29)" in shared
    assert "padding = new RectOffset(19, 19, 12, 12)" in shared
    assert "case 3: Wallet(hero,ref changed,ref persistWallet)" in sheet
    assert "case 7: Wallet(hero, ref changed, ref persistWallet)" in sheet
    assert "PrepareUnifiedGrimoireSkin" not in sheet
    print("VTT_GRIMOIRE_HERO_GOLD_63_SOURCE_PASS")

if __name__ == "__main__":
    main()
