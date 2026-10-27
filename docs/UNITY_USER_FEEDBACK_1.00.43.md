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

Verification pending native delivery: pure numeric ownership+class-total tests14,
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
