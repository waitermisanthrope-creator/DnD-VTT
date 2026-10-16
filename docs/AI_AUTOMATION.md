# Cloud development operations

## What runs without a home PC
- `.github/workflows/autonomous-development.yml`: hourly 09:30–23:30 UTC+3, plus manual dispatch and changes to the automation itself. Current main is checked out every run. Regression checkpoint runs without any OpenAI credential. Runs are serialized with `cancel-in-progress: false`; GitHub may coalesce queued events and delay schedules.
- Model development is a separate gated job using the official pinned `openai/codex-action`. It is **not enabled** by installing the workflow. Existing managed-environment ChatGPT login is not copied to runners; no full-agent Scheduled Tasks tool was available here.
- Existing unified workflow runs regression checks on main and builds Android debug + Windows EXEs for relevant code/build changes. Documentation/atlas/manifest-only pushes run cheap checks instead of duplicate native builds. Test artifacts: workflow run → Artifacts. Stable publish retains the existing signed Android build; missing signing secrets fail the release.
- At 12:30 and 21:30 UTC+3 unified release checks `.github/ai-control.json`. `release_ready=true` must describe a finished stage, with a real 40-character `release_source_sha` ancestor on main and reason. Any subsequent gameplay/test/build change invalidates that readiness. Scheduled release bumps the shared version; automatic retry does not repeatedly bump failed versions. Use manual publish `version=current` to retry a failed build at its existing version.

## Explicitly disabled paid developer option
Only after owner approves separate API billing, configure repository **Settings → Secrets and variables → Actions**:
1. Secret `OPENAI_API_KEY` (enter there directly; never in chat/source).
2. Set `.github/ai-control.json` `paid_api_authorized=true` only after explicit owner authorization.
3. Variables `AI_ALLOW_PAID_API=true` AND `AI_DEVELOPMENT_ENABLED=true`.
4. Run **Autonomous development checkpoint → Run workflow** and inspect both jobs.
Without all these gates, no model call is made. API usage has separate billing/quota from ChatGPT subscription. This repository does not export or reuse the managed ChatGPT session's auth files. A supported subscription-backed runner would need its own authorized provisioning and verification before replacing this gate.

## Quota and recovery
One model session per run, no retries in a loop. Machine control has `retry_after` and `quota_scope`; weekly errors back off seven days, insufficient billing quota requires owner intervention, ordinary rate limits back off one hour. If Codex omits the actual error in its result file, the failure is classified as unknown/hourly; consult run logs to set weekly cooldown rather than claiming automatic diagnosis. A weekly limit remains independent of hourly retries.

Model changes must pass the shared gate before commit. Protected workflow/credential changes are refused by the finalizer. A concurrent main update never causes force-push: local commits, patch and untracked archive are retained in an `autonomous-unpushed-*` artifact for 30 days. Before the next development stage, download/reconcile that artifact; do not assume a failed push reached main. This conflict recovery currently requires a subsequent agent/reviewer; the hourly checker itself does not merge arbitrary failed artifacts.

## Releases and rollback
Both platform artifacts use the same source SHA and shared version. OTA activation happens only after both builds and signed APK verification. `updates/previous-stable.json` preserves the previous working manifest when activating an update; Git history and previous GitHub Releases retain earlier artifacts. Roll back the stable manifest to that previous immutable source, without replacing signing keys or deleting the earlier release. Windows Authenticode signing is not configured in the existing build; EXEs are currently unsigned.

No new stable release is justified merely by this automation change. Do not label Predictor complete while effects/subclasses remain incomplete or device QA is missing.
