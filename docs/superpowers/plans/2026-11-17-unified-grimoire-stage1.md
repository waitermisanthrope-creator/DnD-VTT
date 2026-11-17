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
- [ ] Specialized tabs excluding wallet: skills, notes, crafting, inventory cards, lore.
- [ ] Global landing/settings/content manager/dice overlays.
- [ ] Native validation on both platforms; then separate owner-approved release.
