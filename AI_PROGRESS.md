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

- Published automation: `e3139a58`, merged atlas-only bot update as `51663fd50dd853a5c701411e1109259ec3cbf8fc`; both on main. Real cloud smoke run **SUCCESS**: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/38889102794 (checkpoint passed; model job disabled). Unified native build run https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/38889102940 was still running when first observed; no artifact success claimed.

## Predictor infrastructure audit / automation hardening
- Added `tests/predictor_progression_test.cjs`: **60 level/subclass cases PASS**, covering all levels 1–20 × three subclasses; hand limits, draw thresholds, gradual Major unlock, resource spending only on application, no action cost for draws, finite-card conservation, short/long rest, idempotency, JSON reload and multiclass isolation. This verifies shared infrastructure, NOT unfinished Oracle/Weaver abilities.
- Corrected stale Trickster description: supported cards are playable; unsupported effects remain blocked. Still 60/78 effects.
- Added an explicit tracked `paid_api_authorized=false` gate: even accidentally pre-existing repository variables/secrets cannot enable paid execution. Added explicit dispatch of existing unified test build after autonomous GITHUB_TOKEN pushes (GitHub does not trigger push workflows for those pushes).

- Final local verification: **23/23 suites PASS** with progression matrix and isolated-Git finalizer integration tests (successful push; protected-path refusal; concurrent main left intact with local commits preserved; failed-model cooldown excludes staged unfinished code). Both workflows pass actionlint; source syntax/diff checks pass.

## Published / observed results
- Gameplay audit + authorization hardening: `d7c92e1977cd0dd6d8abcb7fd620f5ea69f6a3e1` pushed to main. Local shared gate **23/23 PASS**. Real cloud checkpoint for this SHA **SUCCESS**: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/38889496005 ; model execution remains disabled.
- Preserved gameplay source `c34f025bfbc34231ba8deb23a2e7c1f4be228db8`: unified native test build **SUCCESS**, https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/38888249156 ; debug Android + Windows artifacts are on that run. This is not a signed stable release or physical-device QA.
- Subsequent unified builds: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/38889102940 was running; https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/38889496028 was pending at last observation. Do not infer their eventual results. No stable release/version bump performed.
- Next gameplay stage: remaining 18 effects / Oracle and Weaver actual ability implementation per approved specification, with tests; progress matrix already covered, do not repeat it. Continuous model execution remains blocked as documented in AI_BLOCKERS.md; hourly checks themselves are deployed and tested.

## 2026-10-16 — character creation / level-up UI hotfix
- Owner-requested correction from Android screenshots: PR #10 squash-merged to main at `c7b9a4de93b930ce985fac10259026b96ea0ce2d`.
- Builder V2: 27-point standard buy, mutually locked-after-first-roll five 4d6-drop-lowest attempts, and unrestricted manual 1–20 mode; stat-generation metadata saved with new characters.
- Legacy class level-up picker: restored mobile scrolling despite global fantasy frame's `overflow:visible!important`, highlighting of existing classes, shorter stat aliases in multiclass checks, Ghost Extra restrictions.
- Added `tests/character_stat_modes_levelup_test.cjs` to common regression gate. Interactive stat/regression scenario smoke tests passed in isolated JS; real GitHub unified workflow #38890919126 checks job **SUCCESS**. Windows/Android build jobs were still running at last observation: do not claim artifacts or physical-device QA until checked.
- No change to owner Issue #9 class-work order, no stable release flag or paid API authorization changed.

## 2026-10-16 — inventory Tarot / Trickster live rewards
- 64/78 card handlers: added Star (catalogue cost ≤100 gp), Seven Swords (actual one-item transfer), Page Pentacles (existing junk catalogue), Queen Pentacles (600-second item-bound transformation / restoration). All costs commit with the effect; stale inventory selections fail without spending. Nested container moves and consumed items cannot duplicate the original. Existing inventory schema and cloud profile transport retained.
- Trickster: connected reward claim and route-checked free-movement controls. Free movement uses its own saved allowance; terrain and conditions apply. Fixed payout damage context so actual scene/links/ledger are used. Pending passive payout survives self-KO; ordinary sight still correctly fails when unconscious.
- New integration suite: 23 scenarios PASS. Functional DOM tests now click actual inventory/reward controls and verify autosaves. Mock PC→Android→PC verifies generated inventory, temporary gold expiry and partial movement credit across restart. No physical-device QA / stable release claimed.
- Oracle/Weaver exact rules remain open, not silently approved by this stage. Full class and Trickster are still partial; Issue #9 remains unchecked.
- Verification: shared regression gate **25/25 suites PASS** (including latest owner stat-generation/level-up changes); final inventory/reward suite **23 scenarios PASS**, including real wall/hidden-target and source-unconscious wager cases. JS syntax checks and `git diff --check` PASS. Physical Windows/Android and live Supabase were not tested; cloud continuation is mocked.
- Published gameplay commit: `ccee4bfbbe44688dccb47f636aed438993819281` on main. Native/regression CI started: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/38900449214 ; **in progress** at observation, not a completed build or stable release.
