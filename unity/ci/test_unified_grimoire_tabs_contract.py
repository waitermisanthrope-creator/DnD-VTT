"""Static source-only safety checks for the second gold-grimoire UI pass.

Run: python3 unity/ci/test_unified_grimoire_tabs_contract.py
These assertions DO NOT compile Unity or verify rendering/interaction.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def source(file):
    return (ROOT / "unity/Assets/Vtt/Runtime" / file).read_text(encoding="utf-8")

def between(text, first, last):
    assert first in text and last in text
    return text.split(first, 1)[1].split(last, 1)[0]

def main():
    kit = source("LegacySessionPanel.UnifiedGrimoire.cs")
    brand = source("LegacySessionPanel.Branding.cs")
    classic = source("LegacySessionPanel.ClassicSheet.cs")
    commerce = source("LegacySessionPanel.Commerce.cs")
    crafts = source("LegacySessionPanel.Crafts.cs")
    production = source("LegacySessionPanel.Production.cs")
    sheet = source("LegacySessionPanel.Sheet.cs")

    assert 'ApprovedIconRegistry.GetSprite(iconId)' in kit
    assert 'EventType.Repaint' in kit
    for field in ("grimoireWrappedGold", "grimoireWrappedTab", "grimoireWrappedInput"):
        assert field in kit and field in brand
    assert 'DrawGrimoireAbilityRule();' in kit
    assert 'GUI.skin = unifiedGrimoireSkin;' in kit

    skills = between(classic, "private void ClassicSkills(", "private void ClassicNotes(")
    for title in ('"Бонус мастерства"', '"Пассивные чувства"', '"Навыки (18)"'):
        assert "DrawGrimoireSectionHeading(" + title in skills
    assert "CharacterSheetRules.Recalculate(hero)" in skills
    assert "cloneProf" in skills  # DejaVuSans: skill proficiency glyphs remain supported

    notes = between(classic, "private void ClassicNotes(", "private void ClassicAbilities(")
    assert 'DrawGrimoireSectionHeading("Папки заметок",20)' in notes
    assert "GUILayout.BeginVertical(uiStyles.AbilityCard)" in notes
    for saved_command in ("CharacterSheetRules.CreateFolder", "CharacterSheetRules.CreateNote",
                          "CharacterSheetRules.UpdateNote", "RequestDelete("):
        assert saved_command in notes

    inventory = between(commerce, "private void DrawCommerceInventory(", "private void DrawCharacterFeats(")
    assert "GrimoireWrappedGold" in inventory and "GrimoireWrappedTab" in inventory
    assert 'GUILayout.BeginVertical(uiStyles.AbilityCard)' in inventory
    for operation in ("CommerceRules.AddItem", "CommerceRules.Equip", "CommerceRules.UseProduct",
                      "DrawContainerTransfer(hero)", "RequestDelete("):
        assert operation in inventory

    lore = between(commerce, "private void DrawLore(", "\n    }\n}")
    assert 'DrawGrimoireSectionHeading("Справочник мира",20)' in lore
    assert "GUILayout.BeginVertical(uiStyles.AbilityCard)" in lore
    assert "entries.Add(new JObject" in lore and "RequestDelete(record" in lore

    craft = between(crafts, "private void DrawCrafts(", "private void DrawCrafting(")
    assert "try" in craft and "finally { GUILayout.EndVertical(); }" in craft
    assert "BeginCraftView()" in craft and "DrawProductionProjects(hero)" in craft
    assert 'DrawGrimoireSectionHeading("Ремёсла",33)' in production
    assert "GUILayout.BeginVertical(uiStyles.AbilityCard)" in production

    # Wallet, character serialization, crafting and UI router remain unchanged.
    assert 'case 3: Wallet(hero,ref changed,ref persistWallet)' in sheet
    assert 'case 7: Wallet(hero, ref changed, ref persistWallet)' in sheet
    assert "PrepareUnifiedGrimoireSkin" not in sheet
    assert "PrepareGrimoireAbilityStyles" not in sheet
    print("VTT_UNIFIED_GRIMOIRE_TABS_SOURCE_CONTRACT_PASS: 5 themed view groups, wallet routing unchanged")

if __name__ == "__main__":
    main()
