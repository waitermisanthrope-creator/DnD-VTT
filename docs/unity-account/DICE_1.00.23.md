# Unity 1.00.23 — procedural dice

Owner authorized both-platform update with a first playable 3D dice table. Settings category changes from caec16da are included. No Supabase migration is needed for dice.

## Implemented

- Home → 3D Дайсы, available offline without an account or character. Sheet → Дайсы uses the same table.
- Procedural d4 tetrahedron, d6 cube, d8 octahedron, d10 pentagonal trapezohedron, d12 dodecahedron and d20 icosahedron. Faces retain their planar topology rather than relying on triangle indices. Opposite faces on d6/d8/d12/d20 sum to sides+1.
- d100 is two physical d10: tens and units; 00+0 means100.
- Flat-shaded blue/gold body and readable face numerals. d4 has corner numbers pointing to its top vertex and is resolved from its bottom face. 6/9 have a distinguishing dot.
- Actual Rigidbody/convex MeshCollider throws in a separate local PhysicsScene. No collision with or simulation of user maps. Result comes from settled world-space face normals, never a preselected random result. No extra modifiers are applied to this manual table.
- Cocked dice are retried up to3 times. Bounded timeout returns an explicit failure instead of inventing a result. A throw is disabled while another throw is active.
- One or two bodies, one bounded render texture, procedural geometry/materials only; resources and local scene released on exit. No downloaded art or heavy model bundle added to baseline.
- Existing lightweight character checks/saves still use their current roll implementation. New table is for manual dice, with sheet result text updated after a completed physical roll.

## Verification

Local preflight:4039+4 existing C# checks (4043),12 Python unit tests, branding/update-settings/content-registry contracts. Geometry evaluated from the actual C# source with System.Numerics-backed math shim: all six shapes have unique face numbers, watertight edges/Euler topology and equal face areas. This shim is not Unity/PhysX or device testing.

Native build gate `DiceValidation.Run`: all60 face orientations; equal areas, convexity, planarity, watertight topology and cocked-edge rejection;56 actual local-PhysX throws including percentiles; rendered PNG checks; resource/scene cleanup. Android and Windows builds must pass this gate before publication. First native run39759223168/source227954d6 compiled but stopped correctly because SceneManager.CreateScene requires Play Mode. DiceBuildGate now enters real Play Mode for physics validation, waits for asynchronous scene cleanup, returns to Edit Mode and only then builds the player. Second run39760613972 was canceled after an internal UnityEditor.Search.SearchDatabase startup exception interrupted delayed callbacks. Source62afcce6/run39762407109 drives validation through EditorApplication.update, with explicit Play Mode/cleanup timeouts and phase logs. That run passed60 native face checks,56 real PhysX throws, PNG rendering, asynchronous scene cleanup, all old native integration checks and Android player compilation; it was superseded/canceled before signing/paired publication. Final source6cf382a0/run39764158596 disables Editor domain reload only during the Play Mode test (restoring settings before build), requires blue body pixels above the background and gold numeral pixels above wood highlights, and bounds engine steps to25 minutes. Run39764158596 Android passed signed packaging (42,368,920 bytes; SHA117dea16bcc28319e5daf5afb9a13c5f68c5b1d6ccad8758cd8b6711d27a9aa6), but Windows correctly failed the d100 preview body-pixel check. Rigidbody poses could update before render Transforms in the unsimulated preview, causing overlap. Current source55646b73/run39766470836 explicitly applies the preview render pose and checks agreement before every capture. Final39766470836/source55646b735a10ce5490b5e80237666c62cdcf5ad8 SUCCESS on all three jobs. Both targets passed60 face checks/56 actual throws, strict raster and pose agreement; Windows actual install-upgrade-reinstall passed. Superseded6cf APK remains unpublished.

## Limits / device QA

First version has one generated material, no imported owner texture skins, no custom irrational solids, no multiplayer verification or cheat-resistant dice protocol. A physical simulation is not a certified uniform random-number generator. Production Supabase tests are unrelated and not performed here.

On Android update over1.00.22, retain local heroes; launch each die on Home and Sheet, confirm digits and upper/bottom-face results, change orientation/navigation, repeat rolls, put app in background and return. Physical touchscreen/GPU behavior is not verified by this runner.

## Publication

Only use existing paired candidate/promote workflows, version1.00.23/code10023, original Android package/certificate and existing Windows profile identity. All gates succeeded; owner-authorized publisher39769236621 activated public feed1.00.23 in1232e122. Both public files were independently downloaded, matched size/SHA, and the actual public APK v2/v3 signature/original certificate/package/code verified. See dice-1.00.23-metrics.json and unity/PUBLIC_DELIVERY.json.

Public release: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.23
