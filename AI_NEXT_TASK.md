# Next checkpoint

1. Read this file, AI_PROGRESS.md, AI_BLOCKERS.md, AGENTS.md; fetch origin/main without resetting local work. Inspect divergence and unpushed artifacts/branches before edits.
2. Read live Issue #9 and last Actions conclusions. Use targeted PROJECT_ATLAS lookup, then actual source. Do not reread megabyte guides wholesale.
3. Highest gameplay priority: complete Предсказатель; canonical subclasses Шулер, Оракул, Ткач Судьбы. Current effect implementation is 60/78, not a complete class. Locate the 18 blocked effects in `docs/PREDICTOR_APPROVED_CARD_STATUS.md`. Implement a small coherent batch with real combat/inventory/UI integrations and transactional/no-double-spend tests. Never substitute a descriptive success for an effect.
4. Verify progression 1–20 and each subclass, hands/decks, long rest, wager resolution while unconscious, cross-profile and cloud serialization. Do not change approved rules to simplify implementation. Separate unresolved rules from approved decisions.
5. Run `node tools/ai_checks.cjs`; update compact state, regenerate BOTH atlases, commit and push a checked stage. A stable release needs a genuinely finished playable stage, readiness source SHA/reason in `.github/ai-control.json`, both builds and unchanged Android signing key. No version-only stable releases.
6. Once Tarot is complete, move to remaining official/homebrew classes per Issue #9 / `01_plansforproject.md`; do not repeat verified work.
