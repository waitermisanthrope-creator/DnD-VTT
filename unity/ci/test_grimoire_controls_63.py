"""DnD-VTT 1.00.63: selection controls, modal and 3D dice glyph fallback.

Source-level contract only. Native Unity/Android/Windows verification remains required.
Run: python3 unity/ci/test_grimoire_controls_63.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "unity/Assets/Vtt/Runtime"

def src(name):
    return (ROOT / f"LegacySessionPanel.{name}.cs").read_text(encoding="utf-8")

def region(text, start, end):
    assert start in text and end in text, (start, end)
    return text.split(start, 1)[1].split(end, 1)[0]

def main():
    market = src("Market")
    modal = region(market, "private void DrawMarketModal()", "private void DrawMarketGoods(")
    assert "marketSurface??=new GUIStyle(uiStyles.AbilityPanel)" in modal
    assert 'MeasuredMenuButton("Закрыть",GrimoireWrappedTab' in modal
    assert 'open?marketSelected:GrimoireWrappedTab' in modal
    assert 'traderOpen?marketSelected:GrimoireWrappedTab' in modal
    assert "marketMode==entry.Item1?marketSelected:GrimoireWrappedTab" in modal
    assert '" (свернуть)" : " (открыть)"' in modal
    assert "▾" not in modal and "▸" not in modal
    assert "SwipePosition(\"market-modal\",marketScroll)" in modal
    assert "marketDepartment=open?\"\":sectionId;marketTrader=\"\"" in modal
    assert "marketTrader=traderOpen?\"\":traderId" in modal
    assert "RequestMarketOpen(hero,ref changed,ref persist)" in market
    assert "CharacterSheetStore.SaveTrade(" in market
    assert "CommerceRules.MarketTrade(" in market

    advancement = src("Advancement")
    assert "PrepareGrimoireAbilityStyles();" in advancement
    assert "GUILayout.BeginVertical(uiStyles.AbilityPanel)" in advancement
    assert "✓" not in advancement
    assert 'advancementMilestone?GrimoireWrappedGold:GrimoireWrappedTab' in advancement
    assert 'selected==stat?GrimoireWrappedGold:GrimoireWrappedTab' in advancement
    assert 'advancementAsiMode==option.Item2?GrimoireWrappedGold:GrimoireWrappedTab' in advancement
    assert "advancementMilestone=!advancementMilestone" in advancement
    assert "advancementAsiMode=option.Item2" in advancement
    assert "CharacterAdvancement.Advance(" in advancement
    assert "PublishAdvancement(hero,preview)" in advancement

    adv_ui = src("GrimoireAdvancement")
    assert "✓" not in adv_ui
    assert "advancementFeat == id ? GrimoireWrappedGold : GrimoireWrappedTab" in adv_ui
    assert "advancementClassPage++" in adv_ui and "advancementFeatPage++" in adv_ui
    assert "SelectAdvancementClass(hero, name)" in adv_ui

    dice = src("Dice")
    assert "✓" not in dice and "⌫" not in dice
    assert '"Очистить","0","Удалить"' in dice
    assert "if(digit==11&&diceQuantity.Length>0)" in dice  # same numerical delete action
    assert "diceQuantity=diceQuantity.Substring(0,diceQuantity.Length-1)" in dice
    assert 'follow?GrimoireWrappedGold:GrimoireWrappedTab' in dice
    assert 'PlayerPrefs.SetString("dndvtt.dice.theme"' in dice

    controls = src("DiceControls")
    assert "✓" not in controls
    assert "active==(selected?.Id??\"\")?GrimoireWrappedGold:GrimoireWrappedTab" in controls
    assert "enabled?GrimoireWrappedGold:GrimoireWrappedTab" in controls
    assert 'PlayerPrefs.SetString("dndvtt.dice.tray"' in controls
    assert 'PlayerPrefs.SetInt("dndvtt.dice.shake",enabled?0:1)' in controls
    assert "StopDiceSensor()" in controls and "diceMotion.Sample(" in controls

    sheet = src("Sheet")
    assert "▾" not in sheet and "▼" not in sheet and "▶" not in sheet and "✓" not in sheet
    assert "themed && circle == spellCircle ? uiStyles.AbilityGold : catalogButton" in sheet
    assert "SetSpellCircle(circle)" in sheet and "SetSpellCircle(-1)" in sheet
    assert "if (!expanded.Add(path)) expanded.Remove(path)" in sheet
    assert "case 3: Wallet(hero,ref changed,ref persistWallet)" in sheet
    assert "case 7: Wallet(hero, ref changed, ref persistWallet)" in sheet
    # The legacy tabs are still reachable. Keep art, fold, race and
    # spell-preparation controls functional while removing unsupported glyphs.
    classic = src("ClassicSheet")
    assert 'ApprovedGrimoireButton("Арт",137,cloneEye' in classic
    assert 'requestedPortraitVisibility=!classicPortraitOpen' in classic
    assert '(open?" (свернуть)":" (открыть)")' in classic
    assert "if(open)expanded.Remove(key);else expanded.Add(key)" in classic
    assert '+" (выбрать)",cloneReadOnly' in classic
    assert "requestedRaceView=1" in classic
    assert 'DrawGrimoireSectionHeading("Способности и приёмы",19)' in classic
    assert 'prepared?GrimoireWrappedGold:GrimoireWrappedTab' in classic
    assert 'spell["prepared"]=!prepared;changed=true;' in classic
    assert all(ch not in classic for ch in ("◉", "▾", "▸", "✓"))
    print("VTT_GRIMOIRE_CONTROLS_63_SOURCE_PASS")

if __name__ == "__main__":
    main()
