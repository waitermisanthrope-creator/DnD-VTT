# Validation — 2026-10-18, experiment/unity-vtt

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

## Scope limits

This is a capsule/primitive test room with realtime exploration and two cameras. Existing map import, character JSON migration, game rules, cloud, multiplayer, character art/animation and stable distribution are not implemented by this slice.

The automated player scenario drives the same public movement and camera functions as input; it does not prove human keyboard/mouse feel, Android touch interaction or sustained FPS. No physical Android install/run, live Supabase or signed stable build has been performed. Android uses the separate experimental package ID; original signing key and release workflows remain untouched.

Logs/builds are local ignored artifacts. Reproduce using `verify.ps1` (Git in PATH) and inspect both exit code and PASS marker. APK/EXE build success alone is not device QA.
