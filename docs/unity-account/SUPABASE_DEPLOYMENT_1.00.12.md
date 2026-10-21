# Supabase access migration deployment runbook

Status: BLOCKED for live deployment: no connected privileged Supabase migration credential. Nothing in this run applies production changes. Public publishable configuration is not deployment authority.

1. Trusted operator backs up schema/data and confirms existing `202610130001_characters.sql` contracts, auth users, character policies and `save_character` signatures match main. Inspect applied migration history; do not rerun a partially applied migration blindly. Access migration is transactional but not an idempotent reinstall script.
2. Create isolated staging with the existing character migration, then `202610210001_access_control.sql`. Do not point tests at production. Run `npm ci --prefix supabase/tests --ignore-scripts --no-audit --no-fund` and `node supabase/tests/access-control.mjs` locally first. PGlite executes real PostgreSQL statements with simulated JWT context; it does not verify real Supabase Auth/PostgREST or deployed RLS integration.
3. On staging use real normal-user/anonymous tokens to verify my_access and character CRUD/RLS, conflict and operation retry. Public callers must not read/write app_private tables. Never place service_role in Unity or test fixtures.
4. Verify real MFA enrollment and challenge AMR timestamps against recent_mfa; refreshed old aal2 alone must fail sensitive calls. Test owner/deputy staff request/independent approval/revocation and protected owner. Two administrators cannot approve a change targeting either approver; absent independent approver requires out-of-band trusted recovery, not an app bypass.
5. Explicitly bootstrap the verified owner/deputy auth UUIDs through trusted SQL administration only, after identity and MFA verification. No automatic first-user/email-based bootstrap. Record approvals outside APK. Entitlement grants require verified server receipt workflow; do not grant on client demand.
6. Obtain owner approval before production migration/bootstrap. Apply reviewed exact migration with a migration identity; check RLS, grants, function search_path and smoke-test ordinary account access. Existing saves/characters must remain intact. Stop if policy/schema mismatch is found.
7. Rollback feature exposure first: disable new administration/delivery endpoints, preserve existing characters, audit and receipts. Do not drop data tables to roll back UI. Use reviewed forward correction migrations after backup; never blanket reset the project.

Deployment does not complete moderation, paid delivery, native MFA screens or Admin Center. See ADMIN_CENTER_AND_PRIVATE_WORKSHOP.md for explicit gaps and activation tests. The current publish capability is request eligibility only; a future publication endpoint must add fresh MFA, independent approval, assignment/author checks and trusted-build validation.

## Owner clarification — appointments

Only the verified project owner (account intended: `waiter.misanthrope@gmail.com`) and the single deputy personally designated by that owner may initiate staff appointments. The deputy cannot appoint/replace another deputy or alter the owner. No moderator tier, creator or Premium account can grant roles, including with MFA. Existing independent approval requirements remain in force.

Bind ownership to the verified Supabase auth user UUID through trusted bootstrap; the email is an operator verification hint, not an authorization predicate or a client-side allowlist. Changing metadata/email cannot gain ownership. Live bootstrap is still BLOCKED; no account was appointed in production.
