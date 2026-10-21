# Administration center and private workshop — implementation boundary

Status: PARTIAL design; operational services NOT STARTED. This extends the existing Supabase Auth, characters, access migration and WorkshopStore; it is not a second account/content system. No production changes are authorized by this document. Public beta packages remain free.

## Existing mechanisms and gaps

`my_access`, `request_staff_change`, `approve_staff_change` exist in the prepared migration. They are not known to be deployed. `CloudCharacterProtocol` uses the existing main character RPC, not these future APIs. Local tags are display only. A missing endpoint must show “Функция ещё не подключена”, without fabricated counts, successful actions or grant buttons.

Audit caveats: `review.read` is role eligibility, not permission to read every submission; trainee assignment scoping must be enforced by the future review endpoint. `workshop.publish` currently denotes curator eligibility to request publication; it must NEVER directly authorize publication. Rename/extend this capability with explicit request/execute separation before implementing a publisher. Premium eligibility is not ownership of every paid package. Current schema contains no per-package purchase or party-loan ledger. Native MFA enrollment/challenge is absent. These gaps prohibit enabling operational moderation, paid downloads or administrative tools now.

## Module boundaries and API contract

Keep native UI modules under the existing partial LegacySessionPanel architecture; shared request/session handling remains Account.cs. Future administration transport calls one versioned HTTPS gateway; no separate auth/token cache. Gateways verify the Supabase JWT signature/issuer/audience, current user status and live database permissions on EVERY operation. Never trust JWT user_metadata, request role strings or cached badge state. Revocation/expiry is checked in the same transaction as a mutation. Fail closed on missing/malformed capabilities.

| Native section | Proposed gateway operations | Required authority and server behavior |
|---|---|---|
| Overview | GET /admin/v1/overview | Owner/deputy; service status and timestamps, Android/Windows/content versions, CI status; unavailable sources explicitly unknown |
| Users | GET /admin/v1/users?cursor=; GET /users/{id}/access | Owner/deputy, bounded paginated results, no character-body access |
| Staff/security | POST /staff-requests; POST /staff-requests/{id}/approve; GET /audit | Existing SQL RPCs through gateway after deployment; fresh MFA, independent approval; redacted bounded audit view |
| Moderation | GET /reviews; POST /reviews/{id}/comments; POST /reviews/{id}/decision; POST /publication-requests | Tier 0 assigned-only read/comments; tier 1 review/escalation; tier 2 queue/disputes/request; author cannot review own material |
| Workshop | GET /packages; POST /packages/{id}/versions; POST /withdrawal-requests | Author own drafts only; protected publication/withdrawal through checked state transition and independent approval |
| Updates | GET /builds; GET /builds/{id}/checks; POST /release-requests; POST /rollback-requests | Owner/deputy, pinned successful source/artifact and preserved signature; fresh MFA and independent approval; existing publisher remains authority |
| Diagnostics | GET /diagnostics; POST /diagnostics/check-package | Tier 3/administration and fresh MFA; redacted allowlisted queries only, bounded output/time/rate |
| MFA | Existing Supabase factor enrollment/challenge/verify endpoints | Session-bound factor verification; reauthenticate before sensitive changes; never accept client-supplied aal |

All writes carry UUID `operationId`, typed bounded payload and expected revision. Store an idempotency receipt keyed by actor/operation/type plus canonical payload hash: same request returns prior result; changed payload under same UUID is rejected. Responses include correlation ID, revision and audit receipt; log no tokens/passwords/full private character JSON. Use explicit 401/403/409/422/429/503 states; bounded exponential retry only for safe reads or durable idempotent writes. Retain local data when server is unavailable.

Dangerous operations progress draft → validated → independently approved → executed, with expiry, immutable payload hash and approver identity. Recheck requester/approver permissions and fresh MFA at execution; revoke/modify/expiry invalidates approval. Neither requester, target of elevation nor content author can be the independent approver. Owner removal/demotion is unsupported. Bootstrap/emergency recovery remain trusted out-of-band operations.

Server modules: identity/permission guard; staff approval service wrapping existing RPCs; moderation assignment and state machine; package/version registry; private entitlement resolver; audit sink; CI broker. These are responsibility boundaries, not claims of implemented endpoints. Add code only as a tested backend becomes available.

## CI broker

Use a server-held GitHub App scoped to required repository Actions read/dispatch and release operations only. Short-lived installation tokens never enter APK. Dispatch only enumerated existing workflow IDs, pinned branch/source SHA and validated version/artifact parameters. No caller-controlled workflow YAML, URL, shell, SQL, branch expression or secrets. Require all test/signature gates and explicit independent approval before invoking the existing publisher; maintain public candidate/stable distinction. Store workflow/run/source/artifact/checksum/approvals in the audit record. Controlled rollback must preserve Android monotonic versionCode: distribute a new higher-code rebuild of a reviewed old source; do not install a lower-code APK over current version.

## Private paid delivery and party use

Maintain server-owned package-version records with existing immutable ID/version/platform/Unity/dependencies/size/SHA-256. Private storage buckets deny anonymous reads/listing. A delivery endpoint resolves each dependency and verifies Premium eligibility AND a verified package purchase/grant, or an explicitly scoped party-session loan. Premium 500 RUB is one-time platform eligibility, not an automatic purchase of all paid resources. Creator page costs another one-time 500 RUB, not a per-submission fee. Staff exceptions must be explicit audited server policy.

Future ledger entities: product/purchase (provider event unique, verified amount/currency/user/product/refund state), package entitlement (user/package/scope/expiry/revocation), game session (GM, active participants, expiry), session asset grant (session/package/version, GM entitlement reference). These extend app_private; do not replace existing premium/creator_page entitlements or public catalogs. No SQL migration for unimplemented payment semantics is claimed here.

POST /delivery-tickets accepts package/version/platform/session context, never arbitrary storage URLs. After live checks, issue short-lived signed HTTPS download URL bound to immutable object and maximum bytes; never cache URL as ownership proof. Client reuses existing size/hash/compatibility/atomic-install pipeline. Refuse executable DLL/JS/native mods. Avoid logging signed URL query secrets. Recheck ownership before renewals; expired links can be retried via a fresh authorized ticket.

A GM's valid purchase permits authenticated active party members to use required map/assets during that session. It does not insert permanent purchase entitlements. Persist package references in saves, never delete characters/maps on expiry; mark assets unavailable outside session and offer reacquisition. Server ends/revokes session grants on participant removal, GM entitlement revocation or expiry. A downloaded unencrypted file cannot technically be made uncopyable: enforcement governs supported use and delivery, not a promise of absolute DRM. Do not confiscate previously free beta content.

## Submission and payment next stages

Creator uploads go to private quarantine using bounded server-authorized uploads. Verify ownership/license/provenance, MIME/extension/decompressed sizes/path traversal/dependencies and malware; reject executable payloads. Compile reviewed AssetBundles with trusted pinned Unity workers separately for Android ARM64/Windows x64, attach hashes/build receipts, then independent publication approval. Untrusted author bundles cannot bypass trusted build.

Payment integration is NOT STARTED: select provider/legal merchant setup, server-held credentials, verified signed webhooks, event deduplication, amount/currency/product checks, refunds/chargebacks and reconciliation tests. Client receipt screenshots and success redirects never grant Premium. No charge, simulated checkout or one-click Premium grant exists.

## Required acceptance tests before activation

Use real Supabase staging: RLS via anon/authenticated JWT, assignment-only trainee reads, all trust boundaries, author-self-review denial, staff revocation between request and execution, old/fresh MFA, expired/tampered/replayed approvals, owner protection, negative cross-user requests. Paid delivery: Premium without purchase denied; valid ownership allowed; wrong platform/hash rejected; expired/refunded ownership denied; party member allowed only during active authorized session; removal denies renewal; no permanent ownership grant. CI broker must reject arbitrary workflows/SHAs/URLs and failed or unsigned artifacts. No operational panel until these server tests pass.
