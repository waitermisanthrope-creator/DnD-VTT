# DnD VTT Unity migration client

Start scene: **`Assets/Vtt/Scenes/ImportedAdventure.unity`** in `C:\Projects\DnD-VTT\unity` (Unity 6000.3.26f1). This scene loads the existing **Таверна «Медный грифон»** map v2, both floors, original floor/wall textures, and 50 instances of the 25 imported furniture models. The old `Exploration.unity` room remains a separate controller regression scene.

In Play Mode: click the world for mouse capture; WASD/mouse, V camera, Space jump, Esc releases cursor, R returns to the current floor entrance. **Карта / лист** opens map/floor selection and character JSON import. On touch devices drag left/right for movement/look; toolbar provides camera/jump. Floor buttons explicitly move to a safe entry on that floor; they do not simulate a stair transition.

Character import accepts an existing single-character export, an array, or a `{characters:[...]}` wrapper. It displays name/current/max/temp HP and retains the **entire original JSON**, including unknown fields, resources, inventory and pending effects. Import is read-only; it does not change web saves, cloud data, source files or schema version. The original JSON can be copied back. Rejecting an import keeps the previous profile. Real cloud sync, combat/class execution and inventory interactions are not ported yet.

Nine existing maps are selectable. Model coverage is complete for the tavern's model references; other maps show explicit placeholders for models outside the current packaged catalog. Walls/floors/diagonals, static open portal state, point lights and stair geometry are projected from map v2. Closed doors/windows are blocking proxies: interaction rules, fog/LOS, loot, token authority and stair routing remain for later stages. One map coordinate unit maps to one Unity unit; no combat-speed/feet conversion is inferred from realtime physics.

Content is copied by `Tools/sync_legacy_content.cjs` from the existing repository. Original glTF files and dependencies are preserved with SHA-256 provenance. The chest has a documented static bind-pose derivative because glTFast 6.14.1 fails to import its multi-primitive skin; the intact animated source is retained as `.gltf.bytes`. This does not port chest animation. License review remains required before any distribution of the migrated client.

Reproduce from PowerShell with Git/Node in PATH (close this project's Editor before batch runs):

```powershell
node unity/Tools/sync_legacy_content.cjs
./unity/verify.ps1 -Stage MigrationSetup
./unity/verify.ps1 -Stage MigrationContracts
./unity/verify.ps1 -Stage MigrationWindows
./unity/verify.ps1 -Stage MigrationSmoke
./unity/verify.ps1 -Stage MigrationAndroid
```

`MigrationSetup` regenerates the imported scene; save/backup hand edits before using it. New development outputs are `Builds/WindowsMigration/DndVtt.exe` (keep the whole folder) and `Builds/AndroidMigration/DndVtt-experiment.apk`. `--vtt-character <path>` can read a local export at player startup. No save or network write occurs. `--vtt-migration-smoke` runs the imported-tavern/runtime/import checks and exits with an explicit PASS marker or failure code. Reports are in ignored `TestResults/`; see `VALIDATION.md` for observed results.

## Original controller room

Open this directory in Unity **6000.3.26f1**. Scene: `Assets/Vtt/Scenes/Exploration.unity`. If missing, use **DnD VTT → Recreate exploration scene**. This command regenerates the prototype room; do not use it to overwrite a hand-edited scene.

Exact project directory: `C:\Projects\DnD-VTT\unity`. In Unity Hub choose **Add project from disk** and select this directory, then open `Assets/Vtt/Scenes/Exploration.unity`. Do not create a new project named `dnd-vtt` inside it: `unity/dnd-vtt` is a separate template project with SampleScene, not this prototype. Its Assets/Packages/ProjectSettings remain visible in Git for review; generated nested caches are ignored.

Play: WASD, mouse look, Space jump, V switches first/third person, Esc releases cursor, click in scene recaptures, R respawns. Android: drag on left to move, right to look, toolbar Camera/Jump. The capsule is a placeholder. This regression room has no character/map import UI; use ImportedAdventure for that.

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
