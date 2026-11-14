"""Source-level contract for compact Grimoire details. Native Unity QA is separate."""
from pathlib import Path
root=Path(__file__).resolve().parents[2]
def file(name): return (root/"unity/Assets/Vtt/Runtime"/name).read_text(encoding="utf-8")
hero=file("LegacySessionPanel.GrimoireHero.cs")
details=file("LegacySessionPanel.GrimoireDetails.cs")
adv=file("LegacySessionPanel.Advancement.cs")
advui=file("LegacySessionPanel.GrimoireAdvancement.cs")
assert "GrimoireHeroDetails(hero, ref changed);" in hero
# Check retained action destinations, not the old row implementation.
for action in ('"К дайсам"', '"К атакам"', 'OpenHeroQuickView(5)', 'OpenHeroQuickView(2)', 'BeginAdvancement(hero, true)'):
    assert action in hero, action
for key in ('"Профиль", "Бой", "Статы", "Данные"', 'GrimoireDetailsProfile(hero, ref changed)', 'GrimoireDetailsCombat(hero, ref changed)', 'GrimoireDetailsStats(hero, ref changed)', 'GrimoireDetailsData()'):
    assert key in details, key
for name in ("ToggleSheetCondition", "RecordRest", "SetDeathTrack", "Recalculate", "PickCharacterFile", "RaceLocked"):
    assert name in details or name in hero, name
assert 'GrimoireAdvancementOverview(hero);' in adv
assert 'GrimoireChooseAdvancementClass(hero,ownedClasses,total,enough);' in adv
assert 'GrimoireAdvancementFeatPicker();' in adv
for key in ("adv-xp-set:", "adv-xp-delta:", "adv-features:"):
    assert key in adv, key
for key in ("advancementClassPage", "advancementFeatPage", "advancementFeatSearch"):
    assert key in advui, key
for token in ("CoinTotal", "CoinMultipliers", "WalletMarket"):
    assert token not in details and token not in advui
print("GRIMOIRE_DETAILS_SOURCE_PASS")
