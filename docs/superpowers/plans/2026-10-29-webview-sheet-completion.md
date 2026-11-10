# Remaining WebView sheet parity implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Native implementation; two read-only Explorer/QA reports received before edits.

**Goal:** Restore source race selection/custom modal, compact notes, horizontal inventory categories without new stores or invented controls.
**Architecture:** Extend existing partial OnGUI, CharacterSheetRules.Actions and ClientPreferences. Keep detached archive saves and existing commerce handlers.
**Tech Stack:** Unity IMGUI, Newtonsoft JSON, .NET workshop regressions, existing GPU smoke.
**Spec:** Owner requires literal original WebView UI; index.html518/693/725/893, app/races.js, app/notes.js and styles.css are the reference. Owner delegated execution without repeated design questions.

## Global constraints
Only experiment/unity-vtt. Preserve profiles, unknown fields, wrappers, GUIDs, class data and existing mechanics. No main/MMO/SQL/secrets changes. No fake buttons or claims of physical Android QA.

## Review focus
- Existing/unknown race ID must lock and cannot duplicate bonuses.
- Invalid bonus/HP data must leave input JSON unchanged.
- Custom catalog survives restart without deleting unknown preferences.
- Notes unknown formats remain read-only; active folder and delete signature protected.
- Inventory crafting/alchemy/container access remains after compacting controls.

### Task 1: Race selection
- [x] Add failing pure tests for apply-once, invalid/locked records, original stats/speed/AC/HP, detached save preservation and custom preferences roundtrip.
- [x] Add narrow detached CharacterSheetRules.SelectRace and validated custom definition/catalog access to existing ClientPreferences.
- [x] Render source dropdown + right blue custom button, confirmation/custom form with six bonuses; preserve selection lock, local catalog and source field widths.
- [x] Run targeted tests and runtime compile.

### Task 2: Notes and inventory
- [x] Replace full-width folder buttons/search/settings with wrapping source chips, title/add-note row, direct title+multiline text and small delete action. Reuse existing APIs/signature confirmation.
- [x] Replace inventory mode/grid with AC, horizontal five-category scroller and green source action. Keep weight/containers, move crafting/alchemy into materials section.
- [x] Extend GPU smoke for new screens and interactions; run existing commerce/save regressions, relevant contract checks, Windows/Android runtime compile.

### Task 3: Visual verification and delivery
- [x] Capture actual GPU frames at portrait/narrow/desktop, compare to original WebView and inspect results. Distinguish local override from actual imported asset/native build.
- [x] Review full diff, update compact report and atlas pair, commit reviewable work. Publish only through existing gated process after actual native verification when a candidate is prepared; never call partial full parity complete.

## Execution rulings / evidence

- Native execution in existing isolated experiment checkout; user delegated execution.
- Runtime WebView contradicts static assumptions: wallet is injected first; folders
  are block-width30px. Follow actual browser result. Wallet moved using existing
  backend, not a parallel implementation. Full market/trade remains outside this stage.
- Pure tests observed failing before new API/reset/note/numeric fixes; sheet65,
  numeric17/menu50 pass. Review findings fixed. Local full parity-next10 exit0;
  source contracts and Windows/Android compile pass. Native46 remains gated.
- QA transport now identifies connected painted button components, not one global
  color bounding box (green AC text is separate from picker). Real OS clicks remain.

## Stage delivery

711902f4 source, candidate40790424498 ALL3SUCCESS, all56 actual native frames reviewed;
review fixes pass; publisher40793558358 SUCCESS; public46 APK+EXE independently
re-downloaded and hashed (DELIVERY46_PASS). Diff confined to experiment, scene/meta/
GUID/key/MMO/main untouched. Whole8760; sheet65/menu50/numeric17. Physical Android
and the full remaining market/other-window/class-hook port are NOT complete.
