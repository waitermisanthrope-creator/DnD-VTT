# [ВЫПОЛНЕНО] Unity1.00.24 — icon-linked physical dice and mixed requests

Published Android/Windows update: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.24
Source d3efae76a4c8a0d7daf0052c621b48066870273d, candidate39810382192 SUCCESS,
publisher39814696908 SUCCESS, feed activationec040aa9/code10024. Both public
binaries independently downloaded/size/SHA verified. Public APK independently
verified v2/v3/original certificate, package com.dndvtt.unity, ARM64/code10024.
See dice-1.00.24-metrics.json for exact hashes/jobs/evidence.

## Result

Continued existing DiceGeometry/DiceTable; no parallel dice engine, content
manager, authentication, save format or publication system. Owner's16.94s
phone recording inspected across frames; its audio track is silent. All31
original owner icon packages visually reviewed. New owner documentation through
daefa4ed preserved, future MMO remains WAIT_TEAM.

31 independently downloadable complete sets correspond to30 dice icons plus
the standard icon. Each supplies d4/d6/d8/d10/d12/d20/d100 (two physical d10).
Assets recipe commit8ac6fa6,31 JSON recipes15,143 bytes total, original image
packages/license retained. New client reads Assets v5; v4 remains for23/older,
Content v3 unchanged. minClientVersionCode10024 protects old clients.

Spikes, curling tentacles, fangs, beveled smooth bodies, vines, crystals and
raised filigree use actual geometry. Each closed convex piece has the identical
render/collision mesh; compound colliders preserve spaces between curled arms.
Meshes are reused across batches in a bounded per-theme cache (<=366), protected
from unused-asset cleanup and explicitly destroyed on theme change/dispose.
Materials use reviewed palettes/procedural veining; original artwork is not an
exact sculpt/UV transfer. Irregular collisions can bias outcomes; no certified
uniformity or multiplayer-authoritative result is claimed.

Expressions such as7d20+3d6+1d8, Cyrillic д, repeated types and d100 are supported.
BigInteger quantities/totals and seven counters avoid count-sized allocations or
a fixed logical count cap. At most8 classic/4 themed physical bodies are active;
large requests proceed in bounded batches under one request with progress,
per-type/overall totals, last-batch values and cancellation. Partial failure or
cancellation is explicitly incomplete and never edits hero stats/inventory.
Only unresolved bodies retry, up to3 times; ambiguous terminal rests are explicit.

Classic reading stays alignment>=.985/dominance>.025. Actual tentacle supports
can hold a stopped die tilted: native diagnostics showed zero velocities,
quiet.6s and alignments.9240,.9345,.9347,.8888 rejected by the initial.94 rule.
Irregular sets now read the stable, uniquely most upward numbered face
(alignment>=.70, within45.6degrees; dominance>.04). d4 uses the most downward
face. No result is preselected. Actual support-pose regression reads face8;
two-face edge and five-face d20 vertex ties still reject.

## Tests performed

-4154 C# checks,12 Python tests and update/branding/registry source contracts PASS.
-133 PostgreSQL WASM checks PASS; no live Supabase testing or migration required.
-Per target:60 face orientations/topology/equal areas;129 actual Unity local-PhysX
 throws, plus classic and tentacle mixed11-die requests; huge count/cancellation.
-31 set profiles in native tests; all seven die types for each physical family.
 Enabled attached convex colliders share render meshes; welded watertight topology,
 outward planes, positive volume, cache bounds/reuse and async scene cleanup PASS.
-Strict native PNG body/numeral rendering, preview pose agreement and existing
 touch, resume branding, PNG/JPEG library, map/save/character/commerce checks PASS.
-Actual ARM64 IL2CPP compilation/signing and Windows x64 Mono build PASS.
-Real Windows1.00.00→candidate→reinstall preserves exact payload/profile/backup
 hashes and runs actual installed-player smoke PASS.
-Independent mathematical check of actual C# generator with System.Numerics shim:
186 core variants/4786 convex closed pieces PASS. This is not a substitute for
 the separate native tests above.
-Existing preview workflow39815906775 SUCCESS;31 schematic projections of actual
 C# meshes (220,272 bytes) independently fetched/SHA/decoded.75 previous previews
 remain byte-identical. These are geometry schematics, not Unity screenshots.

First native39806710564/bf077a23 and diagnostic39808700062/79b38e8a failed on
sleeping tentacle d10 reading. Corrected in final source; no failed APK published.
First preflight39802677786 failed on unmatched online/bundled changelog, fixed
using existing testing status. Superseded intermediate native runs were canceled.
Publication spent time queued in GitHub, then succeeded. An initial plain public
feed read was cached23 during CDN propagation; final plain/cache-busted reads24.

## Installation and remaining manual QA

Update through Settings → Updates. In Workshop refresh catalogs. Install the
linked icon first (Оформление → Иконки), then its set (Оформление → 3D Дайсы).
The existing manager disables installation while a dependency is missing;
cards now show the human-readable icon name. Home/Sheet → 3D Дайсы → Выбрать набор.
First selection can match the current icon; an explicit saved set takes priority.
A removed set falls back to classic; icon uninstall retains dependency protection.

Physical phone/PC visual and input verification remains for the owner: inspect
all dice/readable labels, mixed requests/cancel, keyboard, touch scrolling,
orientation, lock/unlock, offline restart and uninstall fallback. Linux Editor
rendering/native compilation is not physical Android/Windows GPU validation.
Original APK identity/signing/company/product/save paths are unchanged. The APK
is42,405,784 bytes, only+36,864 bytes (36KiB) over23; Windows29,220,298 bytes.
No extra optional image/model binaries entered the baseline APK. The previously
reported workshop page-reset after installation remains deliberately deferred.
