# WebView-shaped Unity client implementation plan

> Agentic workers: superpowers:executing-plans; primary implements inline. Two readonly Explorer/QA reports received before edits.

**Goal:** Replace the oversized technical sheet with the WebView's compact navigation/cards and real everyday actions.
**Architecture:** Extend existing LegacySessionPanel partials and CharacterSheetRules, same archive/atomic save pipeline; no second UI framework/store. WebView runtime inspected in isolated Chromium at440×900 and1280×900 with synthetic data, external network blocked; actual screenshots in /workspace/work/unity-webview-parity. Existing Unity44 screenshots form before baseline.
**Tech stack:** Existing IMGUI, Newtonsoft, .NET8 tests, real Unity player/CI.
**Spec/authority:** Owner asks visual/functional WebView parity and previously delegates decisions/updates. Source reference index.html/app/styles.css/notes.js/character.js/combat_abilities.js; do not reproduce old defects or pretend every class hook is ported.

## Design / decisions
- Maintain existing IMGUI rather than rewrite in uGUI or embed WebView; reuse working handlers/data and preserve mobile input protections.
- Dark charcoal cards, thin borders, orange section headings, restrained action colors, original WebView parchment by default on sheet (retain chosen wallpaper). Compact persistent header+tabs; remove giant duplicated title/save rows. Seven main tabs; wallet/passport/files remain accessible through More without changing persisted field meanings or existing tab IDs.
- Hero: identity/portrait thumbnail, XP action, combat3-column metrics, HP3-column metrics, stat grid, saves. Full portrait controls/profile edits expand on demand. Desktop two columns; phone one.
- Skills: proficiency/passive cards above list, readable names/modifiers and explicit proficiency selector; existing base rolls preserved.
- Notes: folder selection, create/rename/delete, active-folder note title/text; no raw JSON in normal workflow. Unknown shapes remain intact with technical fallback.
- Abilities/spells/resources: compact expandable records, real usage/slot/resource counters, prepared state; no button promises missing targeting/combat hooks. Existing technical editor remains in More/Data.
- Inventory descriptions/container destinations expand on demand, existing commerce methods retained.
- Base HP/condition/death-save bookkeeping and limited explicit rest restore known slots/recharge metadata; special bodies/dead/exhaustion decline unsafe automatic reset. Full class combat/rest hooks remain separate, stated accurately.

## Review focus
Preserve unknown fields/wrapper/IDs/other heroes/art; failed validation/IO never publishes snapshot. Axis scroll must not change fields. Last typed character survives tab/hero navigation. Compact controls keep44+logical px hit areas and measured wrapping. No mutation from rendering, including notes active-folder fallback.

### Task1 — actions and tests
- [x] Failing .NET tests for HP/temp/zero/caps/aliases, slots/resources/use/rest validation, note selection/create/update/unknown preservation, death/condition tracking.
- [x] Implement CharacterSheetRules.Actions companion (same owner) and test save/restart/backup isolation; run targeted tests.

### Task2 — actual UI
- [x] Shared compact skin/layout/header/tabs, preserve theme/accessibility; WebView background reuse with source provenance.
- [x] Rework Hero/skills/notes/abilities/slots/resources and inventory expansions using existing data/actions; keep file/wallet/passport access.
- [x] Extend player smoke with real actions + no-write rendering checks and phone/desktop/360-width frames. Compile both platform branches, inspect before/after actual frames, refine observed issues.

### Task3 — review and delivery
- [ ] Full relevant regression, independent readonly review and fix material findings; exact limitations in report/compact state.
- [ ] Any next published runtime must exceed10044; only existing both-build/installed-QA/visual-review/public-download gates, experiment branch only. No main/MMO/scenes/old GUID/SQL/secret changes; workflow only next-version literals if delivering.

Ledger: both readonly reports received; real WebView inspected (splash skipped through its actual dblclick handler, onboarding skipped normally); isolated synthetic browser storage only. Worktree is existing clean experiment checkout. Owner's existing delegation opts out of extra design approvals; retain current architecture.

Checkpoint 28.10:40 targeted sheet actions,8732 full regression,menu50,numeric14,
Win/Android Roslyn compile,3 source contracts and diff check PASS. Final existing
Windows player/Wine run parity45-contrast exit0 with47 actual GPU frames and OS-pointer
HP/note actions; final contact sheets and contrast corrections inspected. Three material
readonly reviewer findings fixed (rest whitelist/atomic validation, stale native HP queue,
unsupported counters). Reviewer quota prevented full sign-off. No new native builds,
physical Android, full class combat/rest parity or release claimed. Source report:
docs/UNITY_WEBVIEW_PARITY_STAGE1.md. Owner requests visual clone as the target;
this checkpoint is the first sheet stage, not completion of all windows/features.
