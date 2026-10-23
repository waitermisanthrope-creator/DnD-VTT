# Six-theme test: Unity1.00.30

Status: candidate in progress; public update feed stays1.00.28 until actual native checks, both builds, Windows upgrade QA, public artifacts and exact render review pass. Do not claim delivered until final evidence is appended.

## Scope and install

Only six themes in this owner-requested trial: Abyss01, ice03, blood05, stone06, vine19, new slime. Each contains d4/d6/d8/d10/d12/d20 plus percentile tens/units. New1.2.1 workshop data requires client10030 and lives in catalogv8. Existingv6/1.0/1.1 files and old app compatibility preserved. No launcher icon prerequisite. After delivery: update app, refresh workshop, update desired3D set to1.2.1, open3D table → Мои наборы. Launcher icon is a separate resource; manual choice is saved.

## Atlas and models

Each set has one1920x1728 RGB PNG atlas,10columns×9rows×192px. All forms share body/decor materials. Tile offsets: d4=0, d6=4, d8=10, d10=18, d12=28, d20=40, tens=60, units=70, ornament=80. Face tile index uses actual face value minus1; d4 prints three actual opposite-face vertex values. Numbering is baked into opaque surface, eliminating floating glyph layers for these packs. Old overlay recipes retain backwards compatibility with explicit camera-away culling and no slope depth bias. Render target depth increased16→24bits.

AI-assisted source material sheet uses owner's01/05 reference art, provenance in Assets. Raised outer/inner frames, curved arms/cups, crystals, fangs, stone points and vines remain actual geometry. This is a test adaptation using generated geometry, NOT six exact hand-sculpted replicas; base form/UV machinery is shared. One albedo atlas with shader gloss/emboss response, NOT full authored normal/roughness maps. Atlas composition alone is not a native model preview.

## Behavior

- Abyss: organic ornament vertices visibly deform with independent spatial phases. Rigid simplified collision remains stable; no full soft-body solver.
- Ice: actual low friction/.025dynamic/.035static with minimum combine; low damping allows physical glide before result settles. No endless post-result physics.
- Blood: bounded impact-triggered3D shallow droplets/marks, hidden after10seconds, reset with batch/preview/theme changes.
- Stone: lower bounce/.12 and heavier body/.16kg, bounded small impact dust meshes; disappear after3seconds.
- Vine: five visual root meshes grow after accepted result; no modification to gameplay map or re-evaluation of result.
- Slime: shader squash plus continuous decorative post-result hops. Logical result remains immutable; physical simulation stops on accepted rest.

Live batches remain bounded; requested count uses existing arbitrary-precision streaming protocol. Effect mesh cap48 per batch; resources released with table/batch. No global physics scene, remote code, shader downloads, saves/auth/signing changes. Physical imbalance of ornamental bodies is not certified fair.

## Verification checklist

Local4350 C# checks PASS including six exact public payloads (29 baseline;30 rerun pending), SHA/dimensions/profile allowlist and hostile inputs. Existing10 cloud-release Python plus2 renderer-review-boundary tests PASS; update/brand/registry contracts PASS. Previous186variant math check remains math-shim only, not a claim of new six-profile PhysX.

Native candidate adds42 actual physical type tests for six×seven, including percentile pairs, no separate TextMesh layers; front/rear opaque-shell GPU positive controls for eachd20; ice contact/damping; blood/stone actual impact meshes; growing roots; effect cap/cleanup; immutable results after animation.54 experimental PNGs:42form previews +12post-result frames. Original31-set and classic native tests retained. Publisher requires complete54 experimental images when present and ties all85images to exact reviewed source/run/indexSHA before update feed activation.

Physical-phone GPU/touch/install-over unavailable here; owner checks on actual device remain required. Native Editor rendering is not a phone screenshot. No live Supabase verification or changes needed. Existing owner-deferred workshop page reset not included. Other25themes and exact sculptural fidelity remain separate future work; MMO WAIT_TEAM unchanged.

## Device acceptance for owner

After updating both app and pack, verify the selected set name on the table. For each profile throw d4/d6/d8/d10/d12/d20/d100, then a mixed request. Rotate viewpoint implicitly through different throws: only exterior face digits should be visible, with no back-face soup. Abyss arms should move in idle and after rest. Ice should slide before acceptance; vine roots must wait for the accepted result. Blood/dust should appear on contacts and clear on a new batch or leaving table. Slime should keep decorative movement after a stable result; the reported total must stay unchanged. Check repeated theme switches, cancel, background/resume, leaving table and memory pressure. These device checks have NOT been performed in CI. Report screenshot/app version/pack version/device model if any face is missing or numbers overlap.

## Exterior UV correction

29 trial failed manual native visual acceptance despite opacity tests. Numbered UV horizontal axis now matches Quaternion.LookRotation(-normal,up)*Vector3.right, validated by positive correlation for every face/type. D4 corner positions in atlas are paired with the corrected basis. Other legacy UV stays unchanged. Curved detail V runs continuously along the arm. Accepted-result guard prevents decorative slime animation on cancelled partial throws. Static profiles stop idle rerendering after effects finish.30 native/build/public verification remains pending until appended final evidence.
