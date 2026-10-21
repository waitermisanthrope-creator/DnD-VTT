# Unity 1.00.12 — touch settings, account and access control

## Implementation checkpoint

DONE in source/local checks: 440-point portrait canvas, rounded readable controls, automatic settings card heights, larger two-column inventory categories, unwrapped horizontal tabs, compact save/export bar. Vertical drag selects the smallest visible viewport on its axis; horizontal tab drag does not steal vertical page scroll. Gesture threshold preserves taps and suppresses synthetic button activation after dragging. Home artwork remains unchanged. Mouse wheels and scrollbars remain available. Device touch/keyboard/font verification is pending. Grid height uses actual wrapped text and number of rows; unmatched horizontal drags cancel action clicks as well. Settings use the current warm accent and rebuild cached styles after saving appearance.

DONE in source/local checks: native Supabase email/password signup/login, confirmation/recovery codes, password reset, own-character cloud list with pagination, explicit upload and separate local-copy download. Uses the same public project configuration, characters table, RLS and save_character RPC as main. Passwords are never written or logged. Android refresh/access tokens are encrypted with a device-bound AES-GCM Android Keystore key, outside character files; actual device Keystore verification is pending. Other platforms keep session only in memory. Cloud journal persists pending operation UUID/payload before upload; a lost response retries the same operation. Stale revisions return a conflict; UI offers a separate cloud copy. Download never silently overwrites a local hero; unknown profile fields and main-compatible combat/effect self-links are preserved. Golden copies are exported from the actual main JS helper. Upload captures the selected character before any network wait and backs up the local archive first. No cloud deletion button is introduced.

PARTIAL: actual account login/cloud round trip and compatibility with existing production deployment require phone testing with the user's own account; no password was requested or used here. Network policy does not expose the live Supabase project to this executor. A local PostgreSQL test executes existing cloud RPC/RLS and the new access migration; this is not a claim of production deployment.

## Roles and trust

| Account/tag | Granted scope |
| --- | --- |
| Авторизован | Own cloud characters only; no gameplay or paid-content advantage |
| Премиум | Paid-material eligibility after server-verified 500 RUB entitlement |
| Премиум создатель | Premium + independently verified 500 RUB creator-page entitlement; submit original packages for review |
| Модератор — стажёр (0) | Premium/creator privileges and review queue metadata; cannot approve or publish |
| Проверяющий (1) | Additionally review decisions; no unilateral publication |
| Куратор (2) | Can request publication; release service still requires independent approval and trusted build |
| Технический специалист (3) | Additionally redacted diagnostics and constrained debug tools, with MFA |
| Администрация — заместитель | Project administration through enumerated server APIs, with MFA for sensitive operations |
| Владелец | Root application administration, owner-protected bootstrap and approval authority |

Prices follow the owner's latest 500 RUB + 500 RUB request as separate one-time entitlements; no payment is collected by this change. Payment provider/refund verification, merchant setup and production billing are NOT STARTED. During the existing free beta, current public packages remain free. A tag never substitutes for a server permission check. User metadata, JWT display labels, local saves and switches cannot assign privileges.

## Server enforcement prepared, not deployed

`supabase/migrations/202610210001_access_control.sql` is additive. It preserves existing character policies/RPCs; private staff/entitlement/audit/request tables have RLS and no direct authenticated/anonymous access. `my_access()` resolves current grants and expiry per call. `require_capability()` must run INSIDE every future privileged operation. Revoked roles are not kept alive by a stale client badge. Only one active owner and one deputy are allowed. Owner cannot be replaced/demoted from the app.

Staff changes require active administrator MFA verified within ten minutes, prohibit self-targeting/self-approval, expire after an hour, require a different active administrator approval, and write audit entries. Initial owner/deputy UUIDs and verified MFA enrollment must be bootstrapped through a trusted Supabase operator; never infer ownership from the screenshot email or let the first registering user become owner. Staff and entitlement tables are not writable with the public publishable key. No service-role, GitHub or payment secret goes into the APK.

BLOCKED for production deployment: no connected Supabase administration/migration credential is available. Until deployed, native UI displays ordinary signed-in identity but does not invent premium/staff tags. Actual moderator/admin tools, native MFA enrollment/challenge screens, account entitlement administration and operational console UI are NOT STARTED. This release does not claim to provide full project administration from the phone.

## Full project administration: subsequent server-backed operations

Add native pages for package queue, authors, publication jobs, role approvals, account support, build status, rollback and redacted diagnostics. Every write has typed input, bounded scope, an operation UUID, server permission check, fresh MFA where applicable, and an audit receipt. Two-person approval also applies to staff elevation, paid-package publication, billing changes and production rollback. Operators cannot approve their own uploads or privilege changes. Support access to private character data is a separate audited workflow; moderation does not grant browsing of other users' saves.

The backend, using a restricted GitHub App and short-lived installation tokens, may dispatch allowlisted workflows against pinned source SHAs. The APK never receives repository signing/payment/master credentials or an arbitrary shell/SQL executor. Owner/deputy access covers supported project operations; emergency infrastructure recovery remains out of band.

## Paid workshop and creator submissions

Public GitHub URLs cannot enforce payment. Keep current free packages public. Future paid packages belong in private storage; issue short-lived URLs only after live entitlement checks, pin platform/version/bytes/SHA-256, and audit access. Handle purchases with provider-signed verified webhooks, idempotent receipt ledger, currency/amount/product checks and refund revocation. Creator submissions go to quarantine; check license, malware, size and format; build platform bundles in a trusted isolated worker. No arbitrary downloaded DLL/JS/code execution. Two-person review before publication; author cannot approve own submission. These delivery/payment services are NOT STARTED.

## Validation

Local tests cover: tap vs drag, DPI scaling, vertical parent vs horizontal child arbitration, off-viewport gestures, stale region clearing, no privilege from user metadata, revision compare-and-swap requests, durable retry UUID, cloud-copy identity/unknown-field preservation. PostgreSQL WASM executes 41 checks for anonymous denial, direct grant denial, Premium/creator combination, entitlement expiry, all four moderator levels, MFA, revoked roles, two-person staff approvals, expiry/replay, immutable owner, own-character RLS and existing save RPC conflict/idempotency.

Android native build and actual APK/resource/signature checks must pass before distribution. Device QA: swipe settings and every long page starting over buttons/inputs/cards; ensure drag does not activate a button; horizontal tabs vs vertical scroll; keyboard; pause/resume; encrypted session restart; login with main account, download a copy, edit/upload, lost-network retry, second-device conflict and logout without save loss. Never test by deleting the app or clearing its data.
