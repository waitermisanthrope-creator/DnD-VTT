# [НЕ ВЫПОЛНЕНО] Unity1.00.31 — contact-driven dice and workshop trays

Owner request2026-10-23. Baseline delivered30/source da5a40354c6854ebf57b6f35f823080d9fd42b47 unchanged in public feed until a verified newer candidate passes existing native render-review gate.

## Implementation in source (native validation pending)

- New numbered Abyss only: one compliant skinned arm at every geometric vertex (4/8/6/12/20/12 for d4/d6/d8/d10/d12/d20; d100=two d10). Reuses existing texture/cup geometry, bends skin to queried static support. Per-die batched dynamic mesh,30Hz skin updates; no rigid convex cage for arms. Bounded contact muscle impulses use actual Rigidbody.AddForceAtPosition, only while unresolved and within0.5–4.2s after first landing. Up to3pushes/die; lower arms yield so the solid can rest. This is an efficient compliant contact approximation, not full soft-body self/cross-arm collision.
- Slime keeps jelly squash and receives actual upward/torque impulses upon floor proximity during first6.5s after landing; earliest result7.2s after landing. Accepted result stays immutable, cancellation stops result animation. Decorative idle motion still separate.
- Live budget20 physical bodies, shared shape meshes; d100 costs2. BigInteger streaming keeps total quantity unlimited.20 is a simultaneous mobile safety budget, not a claim that unlimited bodies fit in memory. Device performance still requires QA.
- Existing appearance workshop schema extended additively with diceTrays/imageKind=dice-tray. Four allowlisted native profiles spiral/pit/hexagon/octagon, print/color only. No downloaded code/SQL/paths/forces. Existing WorkshopStore hash verification/atomic install/restart/removal remains in charge. New v9 copies all107v8 entries byte-for-byte plus four tiny min10031 packages; v8 and six1.2.1 texture payloads unchanged.
- Spiral: actual overlapping sloping collision treads/outer rails. Pit: open-front shaft, alternating sloped baffles and recessed landing. Hexagon/octagon: polygon wall boundaries and unique prints. Existing local PhysicsScene isolates all bodies from maps.
- Explicit opt-in InputSystem accelerometer. Gravity estimate/threshold/quiet-release/cooldown filter; strength scales bounded throw impulse. Shake during unresolved roll applies real impulses; accepted dice are ignored. Sensor ownership retained, released on exit/pause/focus loss; unavailable sensor is labelled. Sensor simulation is not a real phone test.

## Required validation / delivery

Run pure C# metadata/store/filter tests, existing Python/contracts, actual Unity topology/old material regression/new per-vertex/compliant motion/hop/20-body/tray tests on both targets, Android build/signature and actual Windows install/upgrade/reinstall. Publish public candidate images/installers first; manually inspect exact native render index before activating existing experimental update feed. Physical accelerometer/GPU/touch/install-over QA unavailable in this environment and remains owner testing. No production Supabase/main stable channel changes. Workshop page-reset remains owner-deferred. MMO WAIT_TEAM.

## Evidence so far

Local4395C# checks PASS initially with exact locally generated fixtures, then repeated with actual public downloaded fixtures.12 existing Python tests+2render-review tests and registry/update/branding source contracts PASS. Assets producer source6243d50e9959e2e32ea480b2b367ca263438ec0d/run39927522385 SUCCESS. Four actual public recipe files1041bytes independently size/SHA verified; v9 active. Repeated4395C# checks against actual public fixtures PASS; installation test copies inputs before store consumes downloads. Native tests/APK/Windows build for31 not run yet.

## Native trial1

Native trial bf236ea4/candidate39928298122 Android120330183427 FAILED at tray preview helper: required ivory numeral pixels in a wide classic/tower overview (0ivory,900blue), before tray physics stage. Compilation and actual native old regressions/six42types/all-vertex arms/opaque shells/20Abyss(60contact pushes)/20slime(253physical hops)/immutable accepted results passed. No APK/release claim. Fix gives tower overview its own real GPU texture/visible-geometry controls; existing close-up numeral controls unchanged. Added synthetic InputSystem pause/focus/ownership cleanup tests and readable procedural prints for context recovery. Retrying same unpublished31; feed remains30.

## Native trial2

Native trial2 source5618b2b0/candidate39929687416 Android120334591712 FAILED genuine20-body spiral traversal: several dice settle on sloped treads, strict classic face read remains ambiguous through3 retries. Previous feature regressions/material20 checks and synthetic sensor lifecycle PASS. Fix: delay completion on raised static supports, bounded real downhill/up release for stuck tower bodies, ambiguous rerolls into landing tray rather than the tower entry. Added real landing-height checks and20Abyss/20slime traversal for both towers. Retrying unpublished31; no feed change.

## Native trial3

Native trial3 source8869b5ac/candidate39931386111 Android120340709094 FAILED spiral20: two ambiguous dice remain after retries while18 are resolved. Strict face alignment retained; added furthest-clear landing-grid search excluding tower footprint and low lateral retry velocity to avoid frozen-body obstruction. Runtime phases now start after landing. Local4397C# checks PASS including repeated-shake detection, gravity/gradual orientation and single pickup-jolt rejection; latest source pending native rebuild. No APK publication or feed change.
