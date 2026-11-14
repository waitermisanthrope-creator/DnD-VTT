# Navigation hotfix 1.00.58

Dice and the Hero quick action «К атакам» lacked an explicit return, and queued tab/scroll changes were applied after the parent IMGUI layout had already begun. Dice readiness/catalog changes could also change the control tree outside Layout. The owner's phone symptom was reported; no physical Android exception log was supplied.

The fix commits queued views before the outer header/scroll/layout starts, adds «К герою» both inside Dice/Abilities and in the fixed header, restores source scroll, closes overflow, preserves pending numeric input, and restores GUI.enabled at the page boundary. Standalone Home → Dice also has «Главное меню». Dice preparation/catalog application is bounded by Layout, with stable async status/error/cancel control slots.

Actual native clicks found one additional defect: Preview/SetTray rendered a camera from OnGUI, reentering URP (`UniversalCameraData has already been created`). Preview and tray changes now mark the image dirty; Update/Tick renders it. Editor image checks explicitly Tick(0) before reading the result. Read-only review confirmed no remaining runtime Render calls outside Tick.

Final source: `3788aacb05be2598b22c0479f297b83196eb8afd`; [candidate43618632590](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/43618632590).

Verified:
- Signed Android job132519132252 SUCCESS; package `com.dndvtt.unity`, version1.00.58/code10058, original signing certificate, ARM64. APK SHA256 `07f2560c74f70a18488c28f6f131f8c100522d256d7fbb6cb7858c731702cf46`.
- Windows build/package job132524781370 SUCCESS; used only for native UI verification.
- Local navigation contract reproduced both old boundary/render failures, then passed; syntax1973 (default/Windows/Android), numeric17, menu50, swipe191, lifecycle3, Grimoire/theme/brand/updater contracts PASS. Cloud workshop11523 PASS. Native dice972 physical throws, material/tray images and cleanup PASS after deferred rendering.
- [Independent native replay43621087084/job132526704038](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/43621087084) SUCCESS: `VTT_PHYSICAL_NAVIGATION_PASS`. It authenticates the exact encrypted candidate/source and every installed Windows payload hash, then uses external Win32 pointer clicks against visible controls in the unchanged player. Five Dice/back/Attacks/back/Advancement/back cycles in process8392, exit during a visibly active throw, and HomeDice/back all pass. Player log has zero GUI/runtime exceptions. Synthetic JSON and .bak remain byte-identical, including unknown fields and wrapper metadata. [Native verdict](evidence-1.00.58/native-verdict.json).
- Eleven selected actual native captures are saved in [evidence-1.00.58](evidence-1.00.58/): first/fifth Dice and Attacks, active roll, Advancement, initial/returned Hero and standalone/Home return. Reviewed: exits visible, header remains usable during roll, repeated pages render, source Hero scroll restored. JPEGs are the CI capture exports; full PNGs/player log are in the native workflow artifact.

Verification limits: physical Android is left to the owner's phone testing. The embedded Windows smoke job132526650317 still FAILS because its nested-scroll GUI coordinate helper sends «К дайсам» to client(108,516), below the actual button. It is superseded for this scenario by the passing independent native check, not counted as a passing full Windows suite. The Editor also logs an unrelated UnityEditor.Search indexing exception at playmode exit; the installed player log is independently checked and clean.

Superseded candidates43612389093 and43612557699 were not published. Source826's native run43618277357 passed the roundtrips but correctly failed the URP exception gate, leading to the final rendering fix. No main/MMO/save schema/gameplay/signing-key changes. Android-only publication is authorized by the owner's standing request; Windows is not published.

Delivery: final evidence and documentation are recorded before approval. Activate Android58 only from candidate43618632590, then independently verify normal/cache-busted public feed, original public APK hash, certificate/package/version/ARM64/ZIP CRC/16KB alignment. Public delivery verification is pending.
