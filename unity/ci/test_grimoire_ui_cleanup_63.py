"""Regression/source contract for Android 1.00.62 screenshot findings.

This test guards the first 1.00.63 cleanup pass. It does not prove the
render on an actual Android device: inspect screenshots and tap every tab.
Run: python3 unity/ci/test_grimoire_ui_cleanup_63.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
R = ROOT / "unity/Assets/Vtt/Runtime"

def read(name):
    return (R / ("LegacySessionPanel." + name + ".cs")).read_text(encoding="utf-8")

def between(source, start, end):
    assert start in source and end in source, (start, end)
    return source.split(start, 1)[1].split(end, 1)[0]

def main():
    inventory = between(read("Commerce"), "private void DrawCommerceInventory(", "private void DrawCharacterFeats(")
    assert inventory.count("if (i == 3)") == 1  # 3 items, then 2
    assert 'SwipePosition("inventory-tabs"' not in inventory
    assert 'RegisterSwipe("inventory-tabs"' not in inventory
    assert 'inventoryTabsScroll=GUILayout.BeginScrollView' not in inventory
    assert "GUILayout.ExpandWidth(true), GUILayout.MinHeight(46)" in inventory
    assert "requestedInventoryCategory = i;" in inventory
    assert "CharacterSheetRules.InventoryCategories[inventoryCategory]" in inventory
    assert "CommerceRules.Equip(hero,item)" in inventory
    assert "CommerceRules.AddItem(hero" in inventory

    styles = read("GrimoireAbilities.Styles")
    assert "padding = new RectOffset(21, 21, 20, 20)" in styles
    assert "padding = new RectOffset(20, 20, 18, 21)" in styles
    assert "uiStyles.AbilityGold.padding = new RectOffset(18, 18, 9, 9);" in styles
    assert "padding = new RectOffset(19, 19, 8, 8)" in styles

    settings = read("BrandSettings")
    assert 'GUILayout.Space(8); // Keep caption clear of the 9-slice corner.' in settings
    assert "GUILayout.Label(description,settingsDescription,GUILayout.MinHeight(34));" in settings
    assert "OpenSettingsCategory(category)" in settings
    assert "settingsDraft.Save(SettingsPath)" in settings

    home = read("Branding")
    assert "GUILayout.BeginHorizontal(uiStyles.AbilityCard, GUILayout.MinHeight(102))" in home
    assert "GUILayout.Label(details, uiStyles.AbilityDescription)" in home
    assert "Navigate(FrontScreen.Sheet)" in home

    migrate = read("InventoryMigration")
    assert "GUILayout.BeginVertical(uiStyles.AbilityPanel)" in migrate
    assert "GrimoireWrappedGold" in migrate
    assert "CharacterSheetStore.TransferContainers(SavePath,archive)" in migrate

    market = read("Market")
    entry = between(market, "private void DrawMarketEntry(", "private void RequestMarketOpen(")
    assert 'MeasuredMenuButton("Рынок",GrimoireWrappedGold' in entry
    assert "RequestMarketOpen(hero,ref changed,ref persist)" in entry

    chat = read("Chat")
    assert 'DrawGrimoireSectionHeading("Глобальный чат",159)' in chat
    assert "GUILayout.BeginVertical(uiStyles.AbilityCard)" in chat
    assert 'GUILayout.Button("Отправить",GrimoireWrappedGold' in chat
    assert "StartCoroutine(ChatRequest(true))" in chat
    assert "StartCoroutine(ChatRequest(false))" in chat

    # Wallet business logic and routing must not be altered.
    sheet = read("Sheet")
    assert "case 3: Wallet(hero,ref changed,ref persistWallet)" in sheet
    assert "case 7: Wallet(hero, ref changed, ref persistWallet)" in sheet
    assert "PrepareUnifiedGrimoireSkin" not in sheet
    print("VTT_GRIMOIRE_UI_CLEANUP_63_SOURCE_PASS: two-row tabs, padding, chat, wallet safety")

if __name__ == "__main__":
    main()
