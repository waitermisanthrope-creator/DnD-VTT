# Unity experience and class advancement implementation plan

> **For agentic workers:** use superpowers:executing-plans; primary agent implements, readonly Explorer/QA reports received before implementation.

**Goal:** Restore the WebView XP button and a working one-level class advancement/multiclass flow in the existing Unity sheet.
**Architecture:** Source-reviewed local JS tables export immutable JSON; C# progression operates on a detached hero; existing CharacterSheetStore publishes only after atomic save. Existing IMGUI panel owns a cancellable draft tied to hero ID and original document signature.
**Tech stack:** Unity IMGUI, Newtonsoft JSON, pure .NET tests, existing Windows/Android pipelines.
**Spec:** Owner request 27 October: class level-up, experience, multiclass gated by required ability scores before later visual/button parity. Owner delegated implementation choices; no further design approval needed.

## Global constraints
- experiment/unity-vtt only; preserve IDs/wrapper/unknown fields/other heroes/art, atomic backup; no main/MMO/secrets/scenes changes.
- XP uses exp (read experience alias if exp absent); XP never silently changes levels. Advance exactly one level; cap20; explicit milestone option.
- Gate incoming multiclass requirements, including aliases, STR-or-DEX Fighter; existing class exempt. Unlike legacy warning override, block missing requirements per owner request. Explicitly document known legacy table deviations.
- Grant HP, class-level features, mandatory subclass/ASI/feat and partial proficiencies; keep consumed spell slots/Pact separate. Unsupported progression must be blocked, not invented.
- Class combat hooks remain outside this advancement task; do not claim full old-client parity.

## Review focus
- Stale/double confirmation or switching hero: refuse source-signature mismatch; cancelling changes nothing.
- Invalid choices or failed disk write: no live change; backup/restart preserves exact earlier roster.
- Zero HP, CON ASI, spent slots, subclass and class levels must not use fallback truthiness/total-level progression.
- Unknown or Extra/custom progression: fail visibly, preserve imported document.
- Phone keyboards and wrapped button heights: reuse owned numeric input; real frames; physical Android remains separate.

### Task 1: Authoritative tables and pure progression
- [ ] Export source tables/provenance plus JS golden XP/eligibility/progression/slots cases with deterministic local Node script, check reproducibility.
- [ ] Add failing pure tests for XP boundaries/invalid input, class vs total level, prerequisites, choices, HP/ASI/subclasses, spell slots, no mutation.
- [ ] Implement CharacterAdvancement in one focused existing-runtime companion, no parallel store.
- [ ] Run targeted pure tests; roundtrip/save/restart/backup/failure tests.

### Task 2: Sheet flow
- [ ] Add XP summary/button, direct/set/add/sub controls; advancement class selection, HP options, choices, preview/confirm/cancel.
- [ ] Replace default manual class editor with working flow; keep technical editor available for legacy unsupported records.
- [ ] Extend installed UI smoke with deterministic synthetic progression interaction/cancel and portrait screenshots.
- [ ] Compile Windows/Android branches; run relevant full regression and local player UI, inspect frames, review actual diff.

### Task 3: Review/delivery evidence
- [ ] Independent readonly review, resolve findings, refresh compact docs with exact verification and remaining limits.
- [ ] Do not overwrite published43; any new delivered runtime version must exceed10043. Release only using existing verified gates if publishing is undertaken.
