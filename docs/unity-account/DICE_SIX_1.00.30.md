# Six-theme test: Unity1.00.30

Status: DELIVERED TEST PROTOTYPE. App1.00.30 and packs1.2.1/v8 are live; both public installers and six actual native previews independently verified. Historical checkpoint paragraphs below describe work before final delivery, superseded by final evidence.

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

## Checkpoint: Android30 passed

Source da5a40354c6854ebf57b6f35f823080d9fd42b47; candidate39884231802; Android120188536089 SUCCESS. Native60topology/171PhysX/32legacy numeral controls/6opaque exterior controls/420exterior-U face correlations passed; actual effect meshes, immutable results, partial-slime-cancel regression and cleanup passed. Rear-face removal0changed pixels for all6, front controls27797–46100pixels.4350C#/12existingPython+2review tests/133SQLWASM passed.25additional local filesystem upgrade/restart/corrupt-replacement/selection-ID checks passed using public1.2.0→1.2.1 data; these are not device or cloud checks. Windows120192598251 in progress; real Windows upgrade and visual acceptance/public signature still pending.

## Final delivery —2026-10-23

Both candidate jobs and actual Windows installation/upgrade/reinstallation passed. Candidate39884231802/source da5a40354c6854ebf57b6f35f823080d9fd42b47. Publisher39886825133/job120196826182 activates10030 after exact native index approval; commit2a5eb1817712901c94b2a820592325d71a3d7702. Plain/cache-busted public feed10030 agrees. [Release](https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.30). APK42491894bytes/SHA7a455c4ae20d5d5ab4c6b4f37af20a1027b39d54f293246938c5268be38c1596; Windows29220176bytes/SHA958e20f02ffe9c60332774cf02e76d463d53a68d03cd781ebbba0cc47442274f. APK independently apksigner v2/v3/original certc1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e and aapt original package/code10030 verified. Windows Authenticode not asserted.

85public native PNGs9674414bytes and both actual binaries downloaded/SHA verified. Reviewed full6d20, all42forms and12settled frames; corrected nonmirrored digits visible. After2sec actual image change counts: abyss23226/vine2067/slime42373; ice/blood/stone0 as expected after rest before mark expiry. Blood mark/stone grains visible; roots grow; opaque faces don't show rear digits. Native Editor images are not physical phone screenshots. Render index22bd94b490c5dfd431af6914a57ecb2ccb0ead9201bab810c5dc2450040f33db. Assets39886887017/job120197028869 SUCCESS activates six real native JPEGs133973bytes in6750d77db994c3a9543c11fb79a7454eea5d21e9. Each public JPEG size/SHA/dimensions and plain/cache-busted catalogv8 verified. Other101entries retained; five updated plus slime. All six public1.2.1 files total8620414bytes.

Additional local actual-filesystem regression25checks confirms1.2.0→1.2.1 atomic upgrade, restart, stable selected IDs and corrupt-replacement refusal for each set (verification workspace dice-upgrade30). Not a live cloud/device test. Final source update/branding/registry contracts passed; no need to rerun physics for documentation-only changes.

Separate auto furniture-conversion workflow39886378975/job120195406930 FAILED:8conversion errors,0models; verification says No converted models. Not a dice build or changed module, untouched. Do not describe all repository CI as green. Remaining: owner device acceptance; refine experimental geometry/materials (not exact icon sculptures); full soft-body/PBR maps and remaining25themes later. Next runtime code>10030; do not replace immutable30 binaries or1.2.1 payloads.
