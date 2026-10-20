# Content Manager — architecture v0.1 (proposal)

Status: foundation UI implemented on feature branch; remote downloads NOT implemented or tested.

## User journey
Settings → Content Manager → category/search → package details → dependency preview → download → verification → atomic installation → enabled. Support single items and collections. Never install executable scripts from untrusted packages.

## Content identities
A package has immutable `id`, semantic `version`, `type`, `authorId`, `systemId` (optional for system-neutral visuals), `minClientVersion`, `dependencies`, `files` with byte length and SHA-256, and `license`. Collection references packages; it does not duplicate their payloads. Dependency graph must be acyclic; required assets block map load, optional visuals may use placeholders.

## Security and lifecycle
Catalog must come from a trusted HTTPS endpoint; validate manifest schema and origin, file lengths and SHA-256, reject path traversal and unsupported types, download into staging and atomically promote only after validation. SHA-256 is integrity checking, not proof of author identity; sign trusted catalog/package metadata. Keep rollback and old versions used by campaign lockfiles. Avoid executing arbitrary C#/JS.

## Game systems
Game system is a package. Global setting only picks a default; each character and campaign pins system id and compatible version. Do not auto-convert legacy saves. First adapter must preserve existing 5e character data. Rules engine is a separate later milestone.

## Multiplayer / licensing
Before joining, compare campaign lockfile with installed packages, present exact bytes and licenses, download required packages, then enter. Guest session grants access to needed play data, not a permanent entitlement. Offline entitlement and publisher rights need a backend design; do not treat cached files as proof of purchase.

## Milestones
1. Native browser shell and Settings entry (this branch).
2. Read-only local manifest, package cards and installed-state registry with tests.
3. Trusted remote catalog and resumable downloads.
4. SHA-256 + schema validation, staging/rollback, dependency resolver.
5. Install actual images/JSON content; add platform-specific Addressables bundles for 3D.
6. Game-system selection, campaign lockfiles, editor/publisher workflows, licensing.

## Non-goals of this first commit
No paid store, uploads, remote catalog, runtime asset installation, game-system switching, or map dependency enforcement. Do not advertise any of these as working.
