# DnD VTT Unity exploration prototype

Open this directory in Unity **6000.3.26f1**. Scene: `Assets/Vtt/Scenes/Exploration.unity`. If missing, use **DnD VTT → Recreate exploration scene**. This command regenerates the prototype room; do not use it to overwrite a hand-edited scene.

Play: WASD, mouse look, Space jump, V switches first/third person, Esc releases cursor, click in scene recaptures, R respawns. Android: drag on left to move, right to look, toolbar Camera/Jump. The capsule is a placeholder. No character/cloud/map import yet.

Packages: URP 17.3.0 / Input System 1.20.0. Camera sphere cast shortens third-person distance at walls. Player collision is CharacterController; exploration movement does not implement combat movement budgets.

Batch commands (PowerShell; close this project's Editor first):

```powershell
$editor = 'C:\Program Files\Unity\Hub\Editor\6000.3.26f1\Editor\Unity.exe'
& $editor -batchmode -nographics -quit -projectPath C:\Projects\DnD-VTT\unity -executeMethod PrototypeSetup.Create -logFile setup.log
& $editor -batchmode -nographics -quit -projectPath C:\Projects\DnD-VTT\unity -executeMethod PrototypeSetup.BuildWindows -logFile windows.log
& $editor -batchmode -nographics -quit -buildTarget Android -projectPath C:\Projects\DnD-VTT\unity -executeMethod PrototypeSetup.BuildAndroid -logFile android.log
# Run built player with graphics enabled for the screenshot; inspect process exit code and log.
& .\Builds\Windows\DndVtt.exe --vtt-smoke -logFile smoke.log
```

`PrototypeSmoke` only activates with `--vtt-smoke`, drives the same movement/camera code, fails with exit 1 and logs `VTT_SMOKE_FAIL`, or exits 0 with `VTT_SMOKE_PASS`. Input device interaction and physical Android QA still require a person. Build outputs/caches/logs are ignored. Android uses experimental application ID `com.dndvtt.unityexperiment` and development signing; never distribute as a stable update.

Architecture and staged migration: `../docs/UNITY_MIGRATION_PLAN.md`. Evidence: `VALIDATION.md`.

For checked execution use `./verify.ps1 -Stage Setup`, then `Windows`, `Smoke`, or `Android` (Git must be in PATH). It checks the experimental branch, process exit code and PASS marker and keeps logs in `TestResults/`. After the initial input-backend change, restart Editor before building.

`./verify.ps1 -Stage Snapshot` exports `evidence/exploration.png` through an Editor URP render request with Direct3D 11. This is scene rendering without the player's GUI, separately from runtime mechanics verification. The optional screenshot request in the hidden smoke player can fail; see the validation report.
