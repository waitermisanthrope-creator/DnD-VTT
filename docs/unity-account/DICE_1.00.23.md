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

Native build gate `DiceValidation.Run`: all60 face orientations; equal areas, convexity, planarity, watertight topology and cocked-edge rejection;56 actual local-PhysX throws including percentiles; rendered PNG checks; resource/scene cleanup. Android and Windows builds must pass this gate before publication. First native run39759223168/source227954d6 compiled but stopped correctly because SceneManager.CreateScene requires Play Mode. DiceBuildGate now enters real Play Mode for physics validation, waits for asynchronous scene cleanup, returns to Edit Mode and only then builds the player. Next candidate results are not yet claimed.

## Limits / device QA

First version has one generated material, no imported owner texture skins, no custom irrational solids, no multiplayer verification or cheat-resistant dice protocol. A physical simulation is not a certified uniform random-number generator. Production Supabase tests are unrelated and not performed here.

On Android update over1.00.22, retain local heroes; launch each die on Home and Sheet, confirm digits and upper/bottom-face results, change orientation/navigation, repeat rolls, put app in background and return. Physical touchscreen/GPU behavior is not verified by this runner.

## Publication

Only use existing paired candidate/promote workflows, version1.00.23/code10023, original Android package/certificate and existing Windows profile identity. Public feed must stay1.00.22 until both builds, signing and Windows upgrade QA succeed. Owner explicitly authorized publication of the successful paired candidate in this request.
