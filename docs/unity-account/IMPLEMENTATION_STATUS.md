# Corrected active update — 1.00.13

DONE: owner reported 1.00.12 already installed, so reusing 10012 could not deliver the fix. Built and published 1.00.13/versionCode 10013. Candidate source `ccf264ec`, run 39646171342 SUCCESS; publisher 39646215002 SUCCESS; feed commit `8de32b0a`. Public raw feed independently read back as 1.00.13/10013. Original signature/package retained; public download validated before activation. APK 40,130,674 bytes; SHA-256 `2b7c8a06f193c01f1bd0ba615328c10123ff24990090c089d459de3e484b9aef`.

Added pre-build check refusing candidate versionCode <= active feed to prevent recurrence. Existing 1.00.12 release preserved. Runtime touch fixes remain those from 705ab4f2; physical-device verification remains PARTIAL, production role deployment BLOCKED. Historical release checkpoints follow.

# Current release checkpoint — 2026-10-21 17:34 UTC

DONE: owner explicitly authorized publication; 1.00.12/versionCode 10012 is now active in the existing Unity in-app update channel. Previous statements below about withheld publication and old candidate hashes are historical.

Published source: `705ab4f2` (settings swipe routing/layout fixes, pointer fallback, role-scoped staff status panels). Candidate run 39643523821 SUCCESS; publisher run 39644301090 SUCCESS; feed commit `3553063e`. 2,883 C# checks and 57 PostgreSQL checks passed in CI. APK 40,130,674 bytes; SHA-256 `70b58d2d2f105f552dbf4527041dad23cf7fa197e8c1ea177a096fda5a2bc743`. Original package/certificate retained; publisher redownloaded and verified public APK before enabling feed. No main/Windows changes or old-release deletion.

APK: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/download/unity-v1.00.12/DnD-VTT-Unity-1.00.12-arm64.apk

PARTIAL: actual Android swipe behavior, installation over existing version, Keystore and live auth/cloud round trip await owner device testing. Role migration deployment remains BLOCKED; staff panels are honest disconnected status views, not operational administration. Export heroes before installation; do not uninstall or clear storage.

---

# Unity 1.00.12 — checkpoint 2026-10-21

Working branch: `experiment/unity-vtt`. Candidate source: `466393270d325e7727e44ce4a59e2ff002398b4b`. Main and public update channel are unchanged by this checkpoint.

| Work | Status | Evidence / remaining work |
|---|---|---|
| Restore existing architecture | DONE | Existing native UI, Supabase project/characters/save_character, updater and Android signing reused; no parallel accounts or character store |
| Native touch/layout fixes | PARTIAL | Axis arbitration, drag cancellation, scaled portrait canvas, wrapped grid heights, rounded controls and settings cards compiled and tested; physical phone/IME/resolution matrix remains |
| Auth/cloud implementation | PARTIAL | Signup/login/confirmation/recovery/logout, Android Keystore vault, independent imports, main self-reference contracts, revision/idempotency journal implemented; live Supabase round trip not verified |
| Candidate build | DONE | Existing workflow run [39614842269](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39614842269), success; Android ARM64 IL2CPP 1.00.12/versionCode 10012 |
| Device upgrade/sign-in/gestures | BLOCKED | No physical device/emulator or live Supabase access available; static identity/signature checks do not prove installation |
| Role migration and SQL tests | PARTIAL | Additive migration, 41 PostgreSQL checks; no production deployment, moderation assignment scoping/publication backend still absent |
| Production Supabase deployment | BLOCKED | No connected privileged migration access; requires trusted operator and owner-approved production change |
| Administration center | PARTIAL | Server API/module design in ADMIN_CENTER_AND_PRIVATE_WORKSHOP.md; operational backend/UI not connected |
| Paid workshop | PARTIAL | Private-delivery and session-loan design; no provider, product purchase ledger or delivery endpoints deployed |
| Public 1.00.12 publication | NOT STARTED | Owner confirmation required. Feed remains 1.00.11; do not change approval JSON |

## Verified candidate

APK: 40,130,674 bytes; SHA-256 `c745b71bdaee1a6d41d790cd0da3983866cd49832d722afe0e7cda3f5606950f`.
Download signed test artifact: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39614842269/artifacts/12353230851 (GitHub login may be required; extract the APK).
Package remains `com.dndvtt.unity`; expected signing certificate SHA-256 `c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e`. Existing pipeline validates signature, package, version and ZIP alignment before accepting candidate. Encrypted private artifact is not the installable public test artifact.

CI evidence: 2,881 .NET checks, 41 actual PostgreSQL WASM checks, 205 public packages/2,553,962 bytes downloaded and verified, Unity branding/resume validation, migration contracts, native workshop editor integration and Android compilation. APK inspection confirms minimal content, original rendered branding pixels and no optional prop textures. APK has 51 Texture2D, 6 materials and 4 TextAssets (engine/UI included); these counts alone do not identify removable content. Android trusted test bundle built: 73,576 bytes; phone bundle loading remains unverified.

GameCI emits a license-return error after successful Unity output. Workflow subsequently checks real APK output/metadata and signs/measures it; overall workflow succeeds. Preserve this distinction rather than reporting an entirely clean wrapper log.

Previous 1.00.11: 40,085,618 bytes. Candidate is **45,056 bytes larger**. No claim of further reduction. Compared with measured 1.00.05 (58,430,834 bytes), reduction is 18,300,160 bytes (31.319%). No assets were moved/deleted in this checkpoint; previous public package migration is separate work.

## Remaining critical checks, in order

1. Phone QA using exported backups; install over existing app without uninstalling/clearing storage. Swipe every available long page starting on buttons/fields/cards; rotate, open keyboard, verify lower fields reachable, unlock/resume, verify no accidental activation.
2. Main account signup/confirmation/recovery/login; kill/restart encrypted session; list/upload/copy download; verify inventory, spells, effects, initiative, homebrew and unknown fields; offline/lost response/two-device conflict; logout must retain local heroes. Windows currently keeps login in memory only.
3. Validate migrations on a Supabase staging project with real PostgREST/Auth/MFA before production. Bootstrap owner/deputy explicitly; never derive roles from email/first user.
4. Implement remaining server scopes, private paid-package and party-session checks, native MFA and admin endpoints before enabling operational controls. Shop/trading parity and complete WebView visual parity are not asserted.
5. After phone and live-backend checks, obtain owner confirmation for the existing publisher. No new publication pipeline.

## Continuation

Start from this file and ACCESS_AND_TOUCH_1.00.12.md, inspect new remote commits, then targeted source/tests. Do not redo migration/audit or rebuild unchanged runtime merely for documentation. Update this checkpoint after actual evidence changes. Documentation commits after candidate do not alter APK source SHA.

## Owner clarification — appointments

Only the verified project owner (account intended: `waiter.misanthrope@gmail.com`) and the single deputy personally designated by that owner may initiate staff appointments. The deputy cannot appoint/replace another deputy or alter the owner. No moderator tier, creator or Premium account can grant roles, including with MFA. Existing independent approval requirements remain in force.

Bind ownership to the verified Supabase auth user UUID through trusted bootstrap; the email is an operator verification hint, not an authorization predicate or a client-side allowlist. Changing metadata/email cannot gain ownership. Live bootstrap is still BLOCKED; no account was appointed in production.

Appointment restriction regression: DONE locally — 57 PostgreSQL checks passed (previous candidate CI had 41). Added denial checks for every moderator trust tier with fresh MFA and spoofed owner-email metadata. APK/runtime unchanged.

## Follow-up: phone swipe failure and role-specific settings panels

PARTIAL: owner reports swipe still fails on device. Fixed duplicate settings/technical-settings viewport registration (gesture delta went to unused ID), missing EndVertical, and added IMGUI pointer fallback for legacy touch-unavailable devices. Added source regression checks; device verification remains mandatory.

PARTIAL: native settings now have distinct administrator and moderator panel entries. Owner/deputy only see administration; owner/deputy/moderators see moderation, with sections scoped by server role/trust. No local grants, moderation actions or invented backend results. These are honest disconnected status panels until protected server APIs exist; cached role display is never mutation authorization. Refresh server permissions through Account and synchronization.

Previous APK source 46639327 does not contain these follow-up fixes. New candidate build is required; do not distribute old candidate as the swipe fix. Public feed unchanged.
