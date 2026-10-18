# Validation — 2026-10-18, experiment/unity-vtt

## Native character-sheet stage (incomplete parity)

- Scope and remaining work: `../docs/UNITY_CHARACTER_SHEET_PARITY.md`. Main source `4d548ffbb29f15288faa24f298858b7eef0448c5`; `git diff main -- app index.html .github/workflows` empty.
- `node unity/Tools/sync_character_sheet.cjs` PASS: executed main app/skills/spells sources in local VM; 402 spells and 60 golden formula cases (levels 1–20 × proficiency 0/1/2, including multiclass). Source SHA256 provenance checked by C# before builds.
- `CharacterSheetValidation.Validate` PASS during Windows builds: all 18 skill/modifier/proficiency comparisons and skill aliases, single/array/wrapped edits, preserved second hero/wrapper/unknown fields/nested inventory/pending class state/legacy HP, future-schema and changed-ID rollback, legacy null stats/skills, actual disk write/reload/atomic replacement/backup. Only synthetic data used. This does not prove every class mechanic or Android filesystem behaviour on a real device.
- Final `./unity/verify.ps1 -Stage MigrationWindows` **PASS, process exit 0**: `TestResults/MigrationWindows.log`, `VTT_SHEET_PASS`, `VTT_MIGRATION_CONTRACT_PASS`, `VTT_MIGRATION_BUILD_PASS: StandaloneWindows64`, clean batch exit. Final managed assembly SHA256 `05ED5701967F7483B13DE6E26083C28D23B80A81EC0D84849E9F4666549B8882`.
- Final built-player `MigrationSmoke` **PASS, process exit 0**: actual floor movement, both cameras/floors/respawn, profile roundtrip and rejection. `TestResults/MigrationSmoke.log`.
- Interactive Windows check: synthetic Russian profile, hero/skills/inventory/notes/dice/spells tabs; edited HP 17→12 reflected in HUD, Arcana expertise +10 at INT18/level5, inventory item and original note text displayed, actual d20 roll, searched/added Магическая стрела from packaged main catalogue. Final styling build also inspected. Logs `Sheet-preview-visible.log`, `Sheet-final-preview.log`; no gameplay exception heads observed. Did not save the synthetic preview into user profile storage. Disk persistence tested separately in disposable test directory.
- `node tests/cloud_sync_test.cjs` **PASS, 17 mocked scenarios**; original clients and cloud code unchanged. This is not live Unity cloud sync or real Windows↔Android device QA.
- First contracts-only run: all assertions reached PASS, but process crashed at exit **-1073741819**. Retained `TestResults/Sheet-contracts-first-exit-crash.log`; that run is **not green**. Subsequent Windows build processes returned 0. Hidden interactive preview startup did not expose a window and its owned process was stopped; visible interactive launch worked. Existing Snapshot exit crash remains an open limitation.
- Final `./unity/verify.ps1 -Stage MigrationAndroid` **PASS, process exit 0**: `TestResults/MigrationAndroid.log`, sheet/legacy contracts PASS, `VTT_MIGRATION_BUILD_PASS: Android` and clean batch exit. ARM64 IL2CPP development APK: **75,423,396 bytes**, SHA256 `07283B0637C2246D7B3030D364F298E553CB7A003B30CA4FF175D5F387D639B3`; `apksigner verify --print-certs` verified Android Debug signing. `adb devices` empty: no installation, touch, performance or Android local-save runtime claim. No stable release/signing workflow changes.

## First real-content migration stage

- New scene: `Assets/Vtt/Scenes/ImportedAdventure.unity`, generated from the existing map `app/data/maps/3d_tavern_v740019.json`. Scene/import setup exited **0** (`TestResults/Migration-setup2.log`), `VTT_MIGRATION_SCENE_PASS`: 504 tiles, 164 wall segments, 50 real furniture instances, 2 floors. Original controller room retained.
- Copied 9 map documents, 25 furniture models and 36 surface textures with buffer/image dependencies (107 source files, 37,108,163 source bytes). Provenance records original revision, source path, Unity destination and SHA-256; C# checks compare both packaged bytes and original repository content. JS `map_world.js` generates the independent floor/geometry contract fixture. No original assets/data files edited.
- **C# data contracts PASS** during setup and Windows build: schema/legacy HP, canonical zero priority, unknown fields, exact original JSON preservation, snapshot isolation, array/wrapper/single profiles, duplicate keys/IDs and future schema rejection; decimal conversion under ru-RU/en-US/fr-FR; 9 original map documents/floor heights, signed cell keys and asset SHA-256.
- **Windows migration development build PASS**, process exit 0: `TestResults/MigrationWindows.log`, `VTT_MIGRATION_BUILD_PASS: StandaloneWindows64`. New output `Builds/WindowsMigration/` does not overwrite the first prototype build.
- **Android migration ARM64 IL2CPP development build PASS**, process exit 0: `TestResults/MigrationAndroid.log`, `VTT_MIGRATION_BUILD_PASS: Android`. APK `Builds/AndroidMigration/DndVtt-experiment.apk`, **62,009,242 bytes**, SHA-256 `392D08B25142E1D65F9434C5D61736B6A97A274191BD4170FC090964CDB21070`. `apksigner verify --print-certs` PASS (Android Debug); aapt confirms `com.dndvtt.unityexperiment`, min SDK 26 / target 36, `arm64-v8a`. `adb devices` empty: no physical install/run or touch/FPS claim.
- Windows game assembly `Builds/WindowsMigration/DndVtt_Data/Managed/Assembly-CSharp.dll` SHA-256 `264A8CF59C4111493A33B4AA8A82A49B6278CF576792CEDFDD2ADF0D5A87DFE4`. Git-index SHA-256 check also PASS for all **108** packaged original/dependency/derived files; source assets are stored without automatic line-ending conversion.
- **Built Windows migration player smoke PASS**, process exit 0: `TestResults/MigrationSmoke.log`, `VTT_MIGRATION_SMOKE_PASS`. Tests actual tavern import and model/geometry counts, ground/movement on both floors, first/third camera state, elevated-floor fall recovery, profile import/exact export and rejection retaining the previous profile. This is separate from human touch/mouse feel QA.
- Interactive Windows built-client QA also verified real textured geometry/furniture, opening the map/profile panel, switching to floor 2, and typing/importing a synthetic Cyrillic profile through the actual UI: HUD displayed `Тестовый герой HP 17/24 temp 3`. No runtime exception heads in `TestResults/Migration-preview.log`. This does not validate the old rule engine or physical Android input.
- Original JS world, stair navigation and cloud sync suites PASS; cloud suite **17 scenarios**. These are local/mocked checks, not live Supabase verification. Existing JS/platform/release sources unchanged.
- Initial glTF import failed on the animated chest's multi-primitive bone job in glTFast 6.14.1. Source is preserved byte-for-byte as `.gltf.bytes`; the manifest identifies the static bind-pose derivative used by the Unity importer. Existing JS flattening also does not execute skins/animations. Chest animation remains unported. Initial C# map parse exposed a current-culture numeric conversion bug; fixed with invariant scalar conversion and locale regression checks before passing setup/build.
- Runtime import is read-only, no cloud requests or writes to current saves. Movement is realtime exploration, not D&D action economy. Closed portal proxies, fog/LOS, loot, authoritative tokens, stair routing and rule/class execution are not complete. Other maps use visible placeholders when a model is outside the 25-model catalog. Floor controls perform explicit safe-entry relocation.
- Existing user-created `unity/dnd-vtt` template sources are preserved and excluded from staging; generated caches remain ignored. No main/workflow/release change or paid API execution.

## Follow-up audit: wrong project / nested caches

- Fetch confirms `7722cccc` and `926a8ff3` are both on `origin/experiment/unity-vtt`, remote HEAD `926a8ff3`. The push blocker described in the original run below is historical.
- Open Editor/Hub initially targeted `C:\Projects\DnD-VTT\unity\dnd-vtt`, a separate template project with `Assets/Scenes/SampleScene.unity`. Correct prototype is `C:\Projects\DnD-VTT\unity`, scene `C:\Projects\DnD-VTT\unity\Assets\Vtt\Scenes\Exploration.unity`.
- Added the correct existing project to Hub and opened Exploration through the Editor UI. Hierarchy contains Explorer, Explorer Camera, Ground, Collision test wall, steps and Runtime verification. Play Mode rendered the capsule/room; after the check Play Mode was stopped, Exploration left open. No scene regeneration or save overwrite.
- Console showed 0 errors/0 warnings; correct-project Editor.log had no C# error markers or gameplay exception heads. TLS certificate/Curl 35 messages are service networking failures. The nested template had additional licensing entitlement 404/AI service SDK messages; these are not C# compilation failures. No new APK/EXE build performed in this audit.
- At first full enumeration Git showed 53,754 changes, primarily nested Library/Temp caches. Expanded unity/.gitignore to match generated Unity/VS files at nested depths. `git ls-files -ci --exclude-standard` returned 0: caches were untracked, so no index removal/deletion was needed.
- 62 untracked template source/config files are deliberately preserved and remain visible (34 Assets files, 2 Packages manifests, 25 ProjectSettings, 1 .vsconfig). New ignore/docs changes remain uncommitted for review; no bulk commit or release.
- Final GitHub Desktop and CLI count: **71 changes** = 7 modified tracked ignore/documentation/atlas files + 62 preserved untracked nested-template files + 2 newly written root-project settings (`PackageManagerSettings.asset`, `URPProjectSettings.asset`). These two ProjectSettings files remain visible because project configuration should not be hidden with caches. Staged files: 0. Main remains `4d548ffb`; existing workflows have no diff.

Source stage committed locally as `7722cccc`. Git push to `experiment/unity-vtt` waited on Git Credential Manager; the owned push process was stopped, with the commit preserved. Remote publication is not confirmed; user GitHub authentication is required before retrying. No credential configuration was changed.

## Isolation and environment

- Started from clean `experiment/unity-vtt` at `4d548ffbb29f15288faa24f298858b7eef0448c5`; fetched origin/main without reset. Local main and origin/main were both that SHA. No main checkout, main push, workflow edit or release performed.
- Unity Editor `6000.3.26f1 (de8167e7440c)`, AndroidPlayer (SDK/NDK/OpenJDK) and WindowsStandaloneSupport installed. Actual batch project creation exited 0 and resolved licensing entitlement.
- URP 17.3.0 / Input System 1.20.0 resolved into committed package lock. Scene generation verified `activeInputHandler: 1`, URP asset in GraphicsSettings, MSAA 2, and enabled Exploration scene in EditorBuildSettings.

## Checks already completed

| Check | Observed result |
|---|---|
| Existing shared JS gate | `node tools/ai_checks.cjs`: **34/34 PASS**, exit 0, `C:\Projects\DnD-VTT-js-checks.log` |
| Existing map world | `node tests/map_rebuild_world_test.js`: geometry/portals/ceiling/loot rollback, fog, lighting and save/load PASS |
| Existing stair navigation | `node tests/stair_navigation.cjs`: 4 transitions, intermediate heights, reset, 20 delta cases PASS |
| Existing map DOM test | NOT RUN successfully: `jsdom` absent (also absent in bundled NODE_PATH); no dependency change made to existing application |
| Editor setup rerun | `unity/TestResults/Setup.log`: `VTT_SETUP_PASS`, process exit 0 |
| Initial Windows development build | Real BuildPipeline success, process exit 0; `C:\Projects\DnD-VTT-unity-windows.log`, `VTT_BUILD_PASS: StandaloneWindows64 bytes=159679287` |
| Windows build after input setup | `unity/TestResults/Windows.log`: process exit 0 and VTT_BUILD_PASS; player launched with D3D12 on NVIDIA RTX 2070 |
| Final Windows runtime build | `unity/TestResults/Windows.log`: `VTT_BUILD_PASS: StandaloneWindows64 bytes=159682388`, process exit 0 |
| Final built-player smoke | `unity/TestResults/Smoke.log`: **VTT_SMOKE_PASS**, process exit 0; ground, forward motion, wall collision, jump, first/third camera, camera obstruction and fall recovery |
| Android development APK | `unity/TestResults/Android.log`: `VTT_BUILD_PASS: Android bytes=779912875`, process exit 0; actual APK size **39,656,264 bytes** (BuildReport also includes auxiliary build data) |
| APK integrity/identity | `apksigner verify --print-certs` exit 0, **Android Debug** certificate; `aapt dump badging`: `com.dndvtt.unityexperiment`, ARM64 (`arm64-v8a`), min SDK 26 / target SDK 36, versionCode 1 / versionName 1.0 |
| Android device availability | `adb devices`: empty list; no install or on-device QA claimed |
| Editor visual render | `evidence/exploration.png` generated and visually inspected: capsule, collision wall, steps, materials and shadows visible. Export command is **NOT PASS**: Editor crashed on quit (`-1073741819`) with both D3D12 and D3D11; both logs are in TestResults |

APK: `Builds/Android/DndVtt-experiment.apk`, SHA-256 `FABD6DF2B9A9F2B775E4C84874F24FCAF5A9E1FB120CCED13BC11EDCE7CBDD4D`.

Windows launcher: `Builds/Windows/DndVtt.exe`, SHA-256 `B7CCA8B82003185F22644D0EE1C23B3640DE1B996802D4F5D0501E287011AFA6`; keep the entire Windows folder alongside the EXE. The player smoke's optional screen capture failed in the hidden player window (`Failed to capture screen shot`); its PASS marker verifies mechanics only, not a saved image. Visual evidence is generated separately through the Editor URP render request.

`Snapshot` currently reproduces a native Editor exit crash after saving the PNG; switching to D3D11 did not resolve it. The script correctly returns failure despite the render marker. Cause is not established (TLS warnings occur before the crash, which is not proof of causation). Do not use snapshot export as a green CI gate until diagnosed. This did not occur in the recorded successful final build processes or player smoke.

The first JS gate attempt was 33/34 because Python was absent from PATH. Supplying the installed bundled Python made the individual test and full rerun pass. This was an environment failure, not a changed JS implementation.

One setup run saved the scene/settings, then crashed on exit (`-1073741819`) after changing input backend; preserved locally as `TestResults/Setup-first-input-switch-crash.log`. A fresh setup process passed. Unity also emitted TLS certificate warnings; package resolution and successful operations above are evidenced separately, and certificate verification was not disabled.

Initial player smoke reached the last assertion but exited 1: direct Transform teleport was overwritten by CharacterController.Move. The test fixture now disables/re-enables the motor when arranging an out-of-bounds starting point, as the real respawn method does. That failed attempt is not counted as a passing smoke test.

## Original controller-room scope limits (historical)

The original Exploration scene is a capsule/primitive test room with realtime exploration and two cameras. Its baseline did not implement map/profile import. The subsequent real-content stage is described at the top of this report; game rules, cloud, multiplayer, character art/animation and stable distribution remain incomplete.

The automated player scenario drives the same public movement and camera functions as input; it does not prove human keyboard/mouse feel, Android touch interaction or sustained FPS. No physical Android install/run, live Supabase or signed stable build has been performed. Android uses the separate experimental package ID; original signing key and release workflows remain untouched.

Logs/builds are local ignored artifacts. Reproduce using `verify.ps1` (Git in PATH) and inspect both exit code and PASS marker. APK/EXE build success alone is not device QA.
