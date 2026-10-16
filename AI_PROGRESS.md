# AI progress — compact checkpoint

## 2026-10-16 — preserved previous sessions
- Code checkpoint: `73a299ce2f6f61dce66ee65d0098e52fd335b17c`; merged remote atlas/instructions without overwriting: `c34f025bfbc34231ba8deb23a2e7c1f4be228db8`, pushed to main.
- Predictor: two decks, hand/discard/rest/resource accounting, Trickster wagers, 60/78 executable Tarot effects, UI and existing character/cloud serialization preserved. Full class and subclasses NOT complete. See `docs/PREDICTOR_APPROVED_CARD_STATUS.md` and `docs/PREDICTOR_CLASS_SPEC.md` (locate exact spec via atlas if renamed).
- All 19 pre-preservation regression suites passed: 13 predictor suites + cloud sync, creation signature asset, desktop update contract, pugilist, alchemist and class audit stage 4. Cloud/device tests use mocked stores; physical Windows/Android QA not performed.
- Previous stash retained locally and remotely at `rescue/predictor-stash-20261016`, commit `90b2cd3caf185c66108d9c10b977167db5d54628`.
- Local rescue: `/workspace/dnd-vtt-rescue/uncommitted-20261016.tar.gz`, 34 changed/untracked files, SHA256 `fd6525d6ca00cf3dce1f267d705628ef939ba76c82418fd8655b58c7039bb471`; patch/metadata adjacent. This archive is local, not a persistent cloud backup; the commits above ARE on GitHub.
- Other unavailable sessions have not been restored; reopen their original sessions if missing work is identified.
- Issue #9 read from GitHub: finish Tarot class and its 3 subclasses, then official/homebrew classes. Neither top-level task is complete.

## Automation checkpoint
- Hourly GitHub schedule: 06:30–20:30 UTC (09:30–23:30 UTC+3); concurrency serializes developer runs. GitHub schedules are best effort, not an exact-time SLA.
- `node tools/ai_checks.cjs` is the shared gate. Workflow artifacts and exact run conclusions must be checked before reporting successful platform builds.
- Official Codex Action is prepared but model execution is OFF: both `AI_DEVELOPMENT_ENABLED=true` and `AI_ALLOW_PAID_API=true`, plus `OPENAI_API_KEY`, are required. Owner has NOT authorized API billing. No session credentials copied.
- Existing unified release extended with full regression gate and readiness-controlled midday/evening schedule. Readiness remains false; no stable version bump is warranted for this infrastructure stage.
- Build/run evidence and next checkpoint are recorded in subsequent entries, not assumed here.

- Automation implementation verified locally: `node tools/ai_checks.cjs` **21/21 suites PASS**; actionlint v1.7.7 validates both changed workflows; `git diff --check` PASS. Gate tests cover explicit paid authorization, missing credentials, cooldown, weekly/billing separation and release source invalidation. No paid API call performed. Real Actions run status still requires observation after push.
