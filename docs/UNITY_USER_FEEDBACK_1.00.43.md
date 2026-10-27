# Feedback43: Android readability and numeric input

Source feedback: owner supplied three VK screenshots. Confirmed clipped wrapped
buttons in settings Data/device and hero name displayed in Strength on wizard step3.
No direct name→stat assignment exists: anonymous text fields +no step focus reset
allow stale editor/IME state; exact Android IME path is not reproduced on desktop.

Implemented through existing partial IMGUI:
- Data/file/backup actions use measured wrapping height, not fixed42/48/52px.
- Android integer controls use explicitly owned NumberPad; no IMGUI TextField reuse
  between name and stats. Valid text stages only to original key; field switch keeps
  final digit; wizard Next flushes before validation; step/tab/navigation teardown
  resets ownership and closes native/builtin editor keyboard. New wizard resets stats.
- Default Data is a compact file/backup panel; full raw editor is opt-in.
- Hero exposes manual class-level controls and computed total. Class-level changes
  synchronize hero.level and existing recalculation without changing unknown fields.
  Full automatic class progression, choices and HP growth remain unported.

Verified delivery: pure numeric ownership+class-total tests14,
art33, saves/syntax122, menu50, contracts; Windows/Android branch compilation;
real Unity QA-copy in Wine with portrait settings/wizard/data frames exit0. Wine and
source tests do not establish physical Android keyboard/gesture behavior.
Independent review fixed loss of valid visible-IME edits and missing tab cleanup.
Phone manual cases: leave name keyboard open→Next→stats; edit STR→DEX and reverse,
edit then Next without closing; Back/cancel/resume; sheet tab/hero switch; numbers
must stay with their fields. Test Gboard and vendor IME. Inspect data/backup buttons
and bottom confirmation at device font/display settings.

Old-client visual/creative parity request is recorded, not closed by cosmetic fixes:
see UNITY_CHARACTER_SHEET_PARITY.md and known UX40-03 progression gap. User scripts,
saves and current class/game rules must be preserved during further porting.

## Native build and public delivery
Source e3edd8f628f6d3250b5e4c4bf3c9aff8307708b8; candidate40553837122:
Android122364435204, Windows122374854787, native installed upgrade/runtime/UI
122381243210 all SUCCESS. Full registry regression6973 passed. All31 actual final
native Windows GPU thumbnails reviewed incl settings Data top/bottom, creation
name/stats/confirmation, compact Data. No text-bound failures. Profiles/backups
preserved through1.00.00→43/reinstall. This still does not exercise Android IME.
Publisher40559240758/job122383472212 SUCCESS; activation48c7b7fb. Independently
fetched ordinary/cache-busted feed43 +PUBLIC_DELIVERY and exact source/run;
downloaded APK55743582bytes/EXE39493257bytes, verified both SHA256, ZIP/ARM64/MZ:
INDEPENDENT_DELIVERY43_PASS. Proof outside Git:
/workspace/work/unity-runtime/delivery43/verification.json;
/workspace/work/unity-runtime/native43 (31final native PNGs).
https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.43
43 immutable; next runtime>10043. Physical Android/vendor keyboard and complete
legacy feature parity remain open. No existing scenes/GUIDs, main, keys or SQL changed.
