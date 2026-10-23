# [ВЫПОЛНЕНО] Поставка Unity1.00.34 — collision decay, independent arms and readable results

Current source `cd7035a9b54750eeeff3155650f4cc9996d7319a`, candidate `39950834653`, Android job `120404589859` building. No34 APK/release/feed claim yet. Feed remains32. Public candidate33 is preserved and NOT activated.

## Owner correction

The owner observed repeated Abyss faces and slime restarting jumps after losing momentum. Source33 removes shared/index-phased arm motion and first-vertex contact priority: per-arm rest curls, frames, phases and incommensurate spatial frequencies are independently sampled; reservoir sampling chooses uniformly among contacting arms. Contact forces remain bounded and stop before result acceptance. There is still no full soft-body/self-collision solver or mathematical fairness certification.

Slime now uses initial launch energy, restitution and damping. Repeated upward VelocityChange/torque, fixed7.2second jump gating and post-result body bob are removed. Jelly deformation decays after rest. Ordinary launch increased2.2→5 world units and towers increased1.5; camera/containment follow. Shape and other collisions affect bounce count; exactly ten jumps are not forced.

## Why33 was rejected at public image review

Candidate33/run39946388195 passed Android120390954232, Windows120396289823 and actual Windows upgrade/reinstall120399922464. First publisher39949621437/job120400609047 staged immutable files and91native PNGs. Independent public verification confirmed31550191render bytes, both installers and original APK certificate v2/v3/aapt10033. Exact33 index `5af77132d28b385e28c11c0c0e7f6b04c904520cc8a4b7befc8c212b79bd7031` must NOT be approved: front wall hid lower half of a settled slime at the tray edge. See actual images in `/workspace/verification/dice-public-1.00.33/`.

34 fixes rendering only: an obstructing tray-wall renderer is hidden in the result closeup and restored for overview/next launch. Its collider stays enabled. Neither die positions nor accepted results are changed. Native deterministic edge controls cover d4/d6/d8/d10/d12/d20/d100, collider invariance, pose invariance and restoration. Real throw images are not replaced by synthetic edge-control poses.

## Existing33 evidence, not a claim of completed34 validation

Each native target:972actual logical PhysX throw cases,60face/topology,420exterior UV,32glyph and6opaque-shell controls;20body, four trays, tower landing and cleanup checks PASS.600seeded Abyss d20 bins:28,38,33,44,23,34,27,29,33,24,29,34,25,24,33,24,35,26,27,30. Chi-squared18.8666666666667. The two native runs repeated the same seeded cases; this is not1200independent samples or proof of perfect fairness.

20Abyss60real contact impulses.20slime157actual collision bounces. Isolated slime13natural impacts, initial/max energy7.208248, numerical recovery.01227355; accepted body remains still. No timed energy injection or hidden relaunch in the isolated energy control. Original1.2.1 recipe/texture payloads remain unchanged.

Local34:4398C# checks,3structural contracts and2render-approval boundary tests PASS. Full native/Android/Windows/install QA and exact public review must repeat under34. Physical phone/GPU/sensor/performance/touch/install-over and interactive Windows GPU remain unavailable here. No new live Supabase claim or production changes. MMO WAIT_TEAM; workshop page reset remains owner-deferred.

## First34 native trial — FAILED, unpublished

Trial39950834653/job120404589859 failed on the d8 camera-edge control after600Abyss/13natural slime/energy checks passed unchanged. The synthetic fixture used a commony.55/z-4.4 for different bounding extents; some solids overlapped wall/floor and did not guarantee the asserted occlusion. Correct placement derives minY=.02/minZ=-4.95 from each actual renderer bounding box. Strict visibility/collider/pose/restore requirements remain. Runtime probes also include face centers/interior (27samples), since8corner rays alone can miss an occluder covering a face interior. No34 APK was created or published. Retry the same unpublished34; feed remains32.

## Corrected34 Android native checkpoint

Actual source24b2a4773e3951ea9192d9663596f26338936254/candidate39952385083. Android120409754850 SUCCESS:4398C#/12Python+2review/3contracts/133SQLWASM (not live Supabase), all972actual logical PhysX throws/60topology/420UV/32glyph/6opaque controls and all seven edge-visibility/collider/pose/restore checks PASS.600Abyss histogram,13natural slime impacts and energy trace repeat33 exactly; not additional independent random samples. Signed APK42520566bytes(+4096vs32) CI SHAbdae0690a48da627e6294edc67514622e2855c78c82bd3facf9bb16447b89464. Windows120415371535 building. Public images, APK independent signature check, actual Windows upgrade/reinstall and feed activation still pending.


## Final verified delivery —2026-10-23

Android and Windows are delivered in the existing Unity experimental in-app channel. Both ordinary and cache-busted public feeds independently return1.00.34/code10034 and the trusted installer hashes. Release: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.34 . This section supersedes pending checkpoints below/above;33 remained a public test candidate and was NEVER activated.

- Actual runtime source:24b2a4773e3951ea9192d9663596f26338936254; successful candidate39952385083. Android120409754850, Windows120415371535, actual Windows install/upgrade/reinstall120419210554 all SUCCESS. Windows QA installs1.00.00→34→reinstall with exact payload/profile/backup hashes and actual headless runtime smoke; this is not interactive desktop GPU verification.
- First publisher39955478756/job120420141451 staged public34 and held feed32. Final publisher39955945545/job120421689548 SUCCESS. Activation7ea3934398628b4ad5717086e36bb766784f5bc2.
- Exact approved native indexfc8ad8922b789acbde3772e3ae950968eb4b1d0f488526995f77af0483885762. All91actual public PNGs31756736bytes independently downloaded/hash/dimension/source/run checked and viewed via full contact sheets; former edge-slime occlusion directly checked corrected. No generated illustration is used as evidence.
- Public APK42520566bytes(+4096vs32), SHAbdae0690a48da627e6294edc67514622e2855c78c82bd3facf9bb16447b89464. Original certificatec1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e independently verifies v2/v3; com.dndvtt.unity/code10034/minSDK26/target36/ARM64 retained. Android install-over on a physical device is NOT tested here.
- Windows installer29233602bytes, SHAac83895262352c99647f3da1797e6aad8949f2155a0d944ed7fa27614caebca2; actual downloaded bytes match CI. No Authenticode claim.
- Final4398C#/12Python+2render-boundary/3structural contracts/133SQLWASM PASS. SQL is not live Supabase. Each native target repeats972logical PhysX throw cases,60topology/420UV/32glyph/6opaque checks,600Abyss counts23..44/face/chi18.8666666666667, isolated13natural slime impacts with initial/max7.208248 and numerical recovery.01227355,20body/trays/towers, seven camera-edge/collider/pose/restore controls and cleanup PASS. Identical seeded runs are not independent additional samples or a fairness certification.
- Existing Assets preview publisher39956772016/job120424443608 SUCCESS, activationd279bae0a337418f8a086cce9794b99e14bddc1a. All10public native34 JPEGs147551bytes independently checked; plain/cache-busted v9 metadata equals independent regeneration.111payload records and six1.2.1 data/texture bytes unchanged; no recipe re-download required.

### Changes and limits

Changed existing DiceTentacles.cs, DiceTable.cs and DiceTable.Trays.cs; native DiceValidation.cs; candidate version defaults, both changelogs, paired-review request, generated atlases and status/report documents. Assets changes are the existing native source pin/current documentation and ten preview/description metadata entries. No character/save/auth/cloud schema, package/signing identity, production database, payment, main-stable channel or MMO changes. Workshop page-reset fix remains owner-deferred.

Abyss uses bounded compliant skin/contact impulses, not full self/cross-arm soft-body collision. Slime uses passive restitution/damping at the ordinary floor; existing tower anti-stuck guidance remains limited to raised supports. Existing explicit ambiguous-face rerolls are retained. New wall cutaway changes renderer visibility only. Physical phone GPU/touch/sensor/performance/install-over, perceived drama and interactive desktop GPU remain owner QA.

Initial unpublished34trial39950834653 failed a shape-invalid d8 edge fixture; the corrected strict control passed. Public33 failed visual review for wall occlusion despite successful builds; its immutable files remain, its index is never approved. Separately, out-of-scope GLB validator39955604654/job120420562664 FAILED because its extractor treats dynamic JS string '+id.slice(9)+'.glb as a literal model filename (268real files/269extracted references). That validator was not modified and the whole repository CI is not claimed green.

Next owner action: Settings→Updates→Check and update (Настройки→Обновления→Проверить и обновить), then test repeated10d20Abyss and slime throws on the real phone, including an edge landing and20simultaneous bodies. Installed1.2.1 sets remain; no re-download needed.
