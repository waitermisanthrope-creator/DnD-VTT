# [НЕ ВЫПОЛНЕНО] Unity1.00.24 — icon-linked physical sets and mixed throws

Owner's16.94s phone recording inspected, including the d20 in flight. Continued
existing DiceGeometry/DiceTable; no replacement dice engine, content manager,
authentication or save format. New remote documentation commits through daefa4ed
were fast-forwarded and preserved. Future MMO remains WAIT_TEAM.

## Implemented source

-31 independently downloadable declarative sets, linked to all30 authored icons
and the standard icon. Each includes d4/d6/d8/d10/d12/d20/d100. Source images were
visually reviewed. Assets commit8ac6fa6; recipes15,143 bytes total. v5 is selected
only by generator-capable clients; v4 is preserved for existing clients.
- Seven bounded generator families: spikes, curved tentacles, fangs, rounded
beveled bodies, vines, crystals and raised edge filigree. Closed convex pieces are
shared between actual render mesh and compound MeshColliders. Curved arms do
not use a single convex envelope that fills their empty spaces. Palettes and
procedural veining interpret the icons; these are not exact hand-sculpted copies
or original image texture transfers. Package previews clearly identify the icon
as a style reference; the real model preview is on the dice table.
- Installed set selection, persisted preference, safe classic fallback if removed.
The data-only add-ons are checked for schema, complete side list, bounded finite
geometry, color syntax, ID ownership, icon dependency, bytes/SHA and source.
- Mixed expressions e.g.7d20+3d6+1d8, repeated types, Cyrillic д, d100 pairs.
BigInteger logical quantities/totals and seven counters: no fixed dice-count cap,
no count-sized list. At most8 classic/4 themed physical bodies at a time; larger
requests proceed in real-physics batches with cancellation and partial totals.
- Cocked dice alone retry; accepted bodies stay on the table. A terminal ambiguous
rest is an explicit partial failure, never a fabricated full result. Irregular
forms use dominant semantic numbered face alignment>=.94 and margin>.025;
classic remains>=.985. d4 reads its bottom face. Irregular geometry can bias
outcomes; no fairness certification or multiplayer-authoritative claim.

## Validation / delivery

Local C#4154 checks and Python12 PASS before final native source. SQL WASM133
compatibility checks PASS. Public download of all31 recipes passed exact byte/SHA
verification (15,143 bytes). Native builds pending. Native gate extended for actual mixed
throws, huge-request memory/cancel, all31 sets, seven geometry families across
all die types, shared render/collider meshes, screenshots and lifecycle cleanup.
Both targets must pass before APK readiness/publication is claimed.

No physical phone visual/touch validation of these changes yet. Public remains
1.00.23 until a successful paired candidate is confirmed and existing gated
publisher is used. No Supabase change or SQL required for this feature.

Additional mathematical check using the actual generator with a System.Numerics
shim:186 non-percentile variants,4786 closed convex outward pieces (including base solids) with positive
volume PASS. This is not a substitute for native PhysX. First CI39802677786
correctly failed before Unity on unmatched bundled/online changelog; both now
use the existing testing status and the contract passes locally. Runtime adds
per-type aggregate results and first-use matching to the selected installed icon.

Visual geometry review prompted true curling tentacles following incident edges
instead of short horns, and clipped/beveled collision bodies for smooth sets.
Cooked base/ornament meshes are reused across batches; at most366 cached meshes
for one theme, discarded on theme change/dispose. Native gate checks reuse and
the enabled, non-trigger attached physical colliders. Supersedes c876cd5a source;
its native run is not evidence for these further changes.

## Current native candidate

Source bf077a23, run39806710564. Complete native results pending. Earlier
source changes superseded/canceled runs39803644534,39805814450,39805937318
and39806298725; none is release evidence. No superseded APK published.

## Physical device checklist

1. Update over1.00.23 without deleting data; retain every local/cloud hero.
2. Home → Workshop → Оформление → 3D Дайсы. Install Бездна and its linked
   icon dependency, plus an ice and smooth set. Check bytes/SHA and offline restart.
3. Home → 3D Дайсы → Выбрать набор. Inspect every d4/d6/d8/d10/d12/d20/d100.
   Verify curls/crystals protrude and collide, face digits remain readable, d4
   uses the top vertex number and d100 treats00+0 as100.
4. Throw7d20+3d6+1d8. One logical request, bounded batches; complete exactly11
   logical dice, per-type summary and total. Watch a mixed tentacle batch for
   intersections, unexplained impulses, invisible walls or unreadable digits.
5. Start a large request and cancel; partial total must be clearly incomplete,
   with no change to hero stats/inventory. Try malformed input and offline mode.
6. Change orientation, navigate away/back, lock/unlock while rolling. Inspect
   keyboard, touch scroll, image/mesh recovery and persisted installed set.
7. Uninstall selected dice set; re-enter table and confirm classic fallback.
   A linked icon used by an installed set must retain dependency protection.
8. Repeat on Windows; optional data and Android identity/signature remain the
   existing ones. Phone GPU/launcher/touch is not proven by Linux Editor tests.

39806710564/sourcebf077a23 FAIL at native physical d10/theme01: four
retries could not produce a readable result. No APK publication. Added numeric
rest alignment/velocity/timeout diagnostics in Editor only and a reproducible
validation seed10024 to distinguish support angle from settling jitter before
changing geometry or the result rule. Native build remains NOT READY.

Support-plane analysis of actual exported compound vertices (SciPy convex hull,
volume-weighted approximate COM; not PhysX) found stable tentacle d10 contact
planes with a clearly dominant numbered face (alignment about.85-.92, gap
.08-.16) that the current.94 cutoff rejects. This is geometric evidence to
compare with the native rest/velocity diagnostics, not a measured probability
distribution or permission to accept tied faces.
