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
vertex caps, vines, crystals and raised edge filigree. Closed convex pieces are
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
shim:186 non-percentile variants,4430 closed convex outward pieces with positive
volume PASS. This is not a substitute for native PhysX. First CI39802677786
correctly failed before Unity on unmatched bundled/online changelog; both now
use the existing testing status and the contract passes locally. Runtime adds
per-type aggregate results and first-use matching to the selected installed icon.
