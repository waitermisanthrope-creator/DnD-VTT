# Unified Grimoire — Stage 1 Implementation Plan

> For agentic workers: execute this plan task-by-task and verify native Unity screenshots before calling the redesign complete.

**Goal:** Start migrating all DnD-VTT windows to a shared gold-grimoire visual language without altering mechanics or wallet.

**Architecture:** Scoped reusable cached GUISkin for non-Sheet screens, built from existing Ability-style roles. Sheet, Wallet and specialized IMGUI layouts continue unchanged until separate workstreams.

**Tech Stack:** Unity 6000.3.26f1, C# IMGUI, Resources 9-slice textures; Python source contracts.

**Spec:** `docs/ui-redesign/UNIFIED_GRIMOIRE_DESIGN_2026_11_17.md`

## Global Constraints
- Work on `experiment/unity-vtt` only; no publication for this stage.
- Preserve source/binary UI artwork, char JSON, touch input, wallet and all gameplay.
- Recreate skin on theme rebuild, never allocate per OnGUI event.

## Review Focus
- Theme change while non-Sheet skin active must not use destroyed GUISkin.
- Menu/roster text remains legible on narrow Android width.
- Creation keyboard and pickers must remain clickable.
- Sheet/wallet must retain previous styles/handlers.
- Back/forward navigation must not leak cached style state.

### Task 1 — Reusable themed shell
- [x] RED: verify non-Sheet skin hook and cache disposal absent from source.
- [x] GREEN: add `LegacySessionPanel.UnifiedGrimoire.cs`, reuse Ability panel/button/input.
- [x] Route non-Sheet `DrawFrontEnd` through the shared skin and restore theme lifecycle.
- [ ] Native image and device QA.

### Task 2 — First migrated screens
- [x] Use shared selected nav button and compact header.
- [x] Migrate roster cards, search, action buttons.
- [x] Wrap creation and import in gold panels, preserve handlers.
- [ ] Test Android/Windows click geometry and long labels.

### Task 3 — Progression
- [x] Source changes staged: skills, notes, crafting, inventory cards and lore.
- [x] Shared gold panels, two multiline-safe button styles, icon headings with IDs from the 160 PNG registry; style cache invalidation.
- [x] Keep Wallet and market handlers unchanged; inventory visuals are modified **only inside DrawCommerceInventory**.
- [ ] Verify source checks with fresh runner and compile the exact C# in Unity.
- [ ] Test on-device Android/Windows before calling the UI approved.
- [x] Source-only stage 3: Home, Settings, Content Manager, Dice controls and 3D Character Studio visual shells (shared approved Ability 9-slice + icons).
- [ ] Mobile portrait/layout and desktop input verification in native Unity; do not mark visual completion until verified.
- [ ] Native validation on both platforms; then separate owner-approved release.

### Stage 2 note (2026-11-17)

The implementation is **source-only** until compiled/replayed. Reuse `uiStyles.AbilityPanel` for main sections, `uiStyles.AbilityCard` for nested notes, recipe, lore and inventory rows, and `ApprovedIconRegistry.GetSprite` in headings. Do not substitute a global `GUI.skin` inside Sheet: the wallet and shared cached classic fields depend on the original skin. Follow up with visual Android QA and clip/scroll/keyboard regression testing; no build/update should be claimed yet.

### Stage 2 UX regression follow-up (2026-11-17)

- [x] Change the expandable ability/class-feature names to the cached multiline-safe `GrimoireWrappedTab`, without changing their fold handlers.
- [x] Arrange six 22px spell-slot orbs per row (132px inner width, 138px group width), retaining horizontal scrolling on narrow screens and original click actions.
- [ ] Compare screenshot with owner-provided Android screenshots after a real Unity build; visual correctness is not established by source checks.

### Stage 3 system-window scope (2026-11-17)

- [x] Home cards and calls to existing navigation are retained but use the golden shared controls.
- [x] Settings overview/categories/technical updater reuse approved panel graphics and maintain `SavePendingAccent`, `settingsDraft.Save`, `OpenSettings` actions.
- [x] Content Manager search/tabs/cards now follow shared card/active button styling; module download/removal and pagination logic untouched.
- [x] Dice theme/group controls are skinned, but the 3D viewport render, `diceTable.Throw`, motion/cancel and GPU lifecycle are unchanged.
- [x] Character Studio header/buttons/controls panel skinned, without touching 3D preview, touch hitboxes or serialization.
- [ ] **Native compile, Android portrait capture, Windows mouse/touch QA** before app update.

**Ruling:** This phase intentionally keeps the existing wallpaper and real 3D viewport; no fictional screenshot or replacement artwork is introduced. **Ruling:** Keep wallet styling and logic as-is. Changes are only IMGUI presentation and do not alter save schemas.
