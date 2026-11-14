# Navigation bugfix 1.00.58

Owner reports that entering Dice or quick Attacks in57 breaks the interface, with no back button and restart needed. No physical-device error log is available; an optional question about the visible symptom is pending. Do not claim the precise phone exception was reproduced from source inspection.

Confirmed defects: both pages lack an explicit hero exit; DrawSheet commits queued tab/scroll/swipe after its caller already opened the outer scroll/body and selected header; Dice creation coroutine and catalog polling can change its control tree outside Layout. Earlier tests opened target tabs through field assignment, missing the actual quick-action path.

Fix the existing partials: commit views at the first Layout boundary in DrawFrontEnd, keep data transactions in DrawSheet; add in-page and fixed-header exits, restore source scroll, close overflow, flush pending hero numeric input before save. Preserve GUI.enabled at the page boundary. Create the dice table/apply catalogs on Layout, keep async status/error/cancel control slots allocated. No save schema/gameplay/key change.

Verification plan:
- Source boundary contract fails on57, then passes corrected code.
- Local input/swipe/menu/save/unknown-field tests; syntax parses default, Windows and Android branches.
- Actual Windows OS-pointer clicks through measured GUI rectangles, bounded scrolling to each quick action, five complete Dice/Attacks/Advancement roundtrips; exit while a roll is actively running immediately before MouseUp. Require unchanged JSON and zero GUI exceptions.
- Capture Dice, Attacks and returned Hero GPU frames before the old unrelated light-paper test. Release Android58 only after new VTT_QUICK_NAVIGATION_PASS, successful original-key Android candidate, review and public download/hash/certificate checks. Windows is not published.

Local observed: source boundary red→green; save/syntax1973, numeric17, menu50, swipe191, lifecycle3 and Grimoire/theme/brand/update contracts pass. Two read-only reviews identified overflow closure, keyboard flushing and robust native test positioning; addressed before candidate. Native/runtime checks and58 delivery are pending.

Final candidate43612557699/source826f2a1d32a3e12531b4d8d65abacaf590b05ea6. Standalone Home → 3D Dice → Main menu is included. Superseded preflight43612389093 is cancelled, not a release candidate.
