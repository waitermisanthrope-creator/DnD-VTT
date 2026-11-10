# Unity WebView market implementation plan

> **For agentic workers:** Use superpowers:executing-plans. Primary implements; two read-only Explorer/QA reports received. Owner delegated execution without repeated design questions.

**Goal:** Original market entry/modal,42 traders/320 stock rows, functional buy/sell/barter and durable shared stock using existing wallet/inventory/preferences.
**Architecture:** Data-only VM export with source hashes. Extend CommerceRules and CharacterSheetStore with partials, existing LegacySessionPanel UI. Global dnd_market_v55_state remains in device preferences; hero remains in original archive format. A write-ahead paired-save journal prevents partial stock/money transactions and recovers before loading profiles.
**Spec:** index.html353–356 and original market55/55.1/55.2 UI; source55.3 social layer audited separately. Same font/colors/layout; no fake handlers or rebundled functional item databases.

## Constraints / rulings
- Only experiment/unity-vtt; no main/MMO/SQL/secrets/signing changes.
- Preserve profile wrapper, other heroes, unknown data, backups and existing global preferences/custom races.
- Definitions resolve against installed CommerceCatalog, not optional full catalog bundled into player. Missing definitions explicitly data_only.
- Correct explicit catalog price precedence instead of source accidental1gp fallback; reject duplicate barter references, equipped sale and stale confirmations. Document departures from source bugs.
- Social haggling/relationships are not claimed complete by the55.2 trading stage. Do not copy inconsistent price wiring or draw inert controls.

## Tasks / verification
- [x] Export original42traders/320rows, acceptance profiles, aliases and quote golden vectors to JSON; source hashes verified by tests.
- [x] RED→GREEN paired save/recovery tests: success, backups, rollback after second-file failure, interrupted roll-forward, unknown-file conflict blocks without mutation.
- [x] RED→GREEN buy/sell/barter: exact prices/rounding, installed functional fields, limits/unknown data, no mutation on rejection, duplicate/stale offer protection.
- [x] Render original market entry after wallet; modal header/balance/close, wrapping trader buttons, modes/search, rows/offers; use existing menu pointer blocking and deferred Layout transitions.
- [ ] Actual browser reference + GPU interactions/frames; targeted then full tests, Windows+Android compile, actual native builds before publication claims.
- [ ] Review diff, compact state/report/atlas; preserve branch and use existing gated publication only after native evidence.

Local evidence: MARKET547/full9310; actual QA-copy68PNG/OS purchase+close/unknown-state/recovery PASS. Candidate47 native import/build/installed verification and publication remain pending; stable46 unchanged.

Native launch blocked by automatic approval review: changing GitHub Actions violates the owner’s historical prohibition. Restored workflow46; need explicit permission for candidate47 version literals. No dispatch/publication workaround attempted. Code/local verification remain valid.
