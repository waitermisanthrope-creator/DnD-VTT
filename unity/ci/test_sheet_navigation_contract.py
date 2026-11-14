"""Guard IMGUI frame boundaries; actual pointer roundtrips run in DesktopUiSmoke."""
from pathlib import Path
root=Path(__file__).resolve().parents[2]/'unity/Assets/Vtt/Runtime'
def read(name):return (root/name).read_text(encoding='utf-8')
front=read('LegacySessionPanel.FrontEnd.cs');sheet=read('LegacySessionPanel.Sheet.cs');dice=read('LegacySessionPanel.Dice.cs');classic=read('LegacySessionPanel.ClassicSheet.cs');session=read('LegacySessionPanel.cs')
body=front[front.index('private void DrawFrontEnd()'):]
assert 'CommitSheetView();' in body, 'queued view must commit before outer layout begins'
assert body.index('CommitSheetView();')<body.index('MarketLayout();')<body.index('GUILayout.BeginArea('), 'navigation cannot mutate an already-open GUI tree'
assert 'if(requestedSheetTab.HasValue)' not in sheet[sheet.index('private void DrawSheet()'):], 'DrawSheet must render the committed tab only'
assert 'DrawSheetHeroBack();' in dice and 'DrawSheetHeroBack();' in classic, 'Dice and attacks need visible in-page exits'
assert 'StartCoroutine(PrepareDiceTable())' not in dice and 'yield return null;' not in dice, 'ready dice tree must not change asynchronously between Layout and Repaint'
assert 'originalEnabled' in session and 'GUI.enabled=originalEnabled;' in session, 'a page must not leave all navigation disabled'

render=sheet[sheet.index('private void DrawSheet()'):]
assert render.index('CommitGrimoireDetailKeyboard(hero, ref changed)')<render.index('if (changed)'), 'pending native number must commit before the old hero is saved'

assert 'SafePollDiceCatalog()' not in dice[dice.index('private void UpdateDiceTable()'):dice.index('// Manual installed-set selection')], 'catalog changes must commit on Layout'
print('SHEET_NAVIGATION_FRAME_BOUNDARY_PASS')
