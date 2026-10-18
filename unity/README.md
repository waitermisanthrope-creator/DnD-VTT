# DnD VTT Unity migration client

**Настройки** in the main menu controls the actual Unity quality level, FPS/vSync, look sensitivity/inversion, camera FOV and initial first-person view. Click **Применить и сохранить**; preferences load at startup from a separate `client_settings.json` (previous copy `.bak`). QA profile overrides also isolate preferences. Settings defaults only reset the draft until applied.

The wallet now supports **Получить монеты** / **Потратить монеты**, automatic change, custom exchange rates, PP/EP switches and a 25-entry transaction history using main's existing fields. An operation immediately saves the archive, including pending sheet edits; insufficient funds leave it unchanged. Direct balance edits still require the ordinary Save button. This is native C# validated against actual main JS, not a complete WebView gameplay port.

The client now opens **Home**. Use **Персонажи** for the searchable roster, **Создать героя** for the four-step level-one wizard, or **Продолжить** for the selected sheet. The sheet includes inventory, wallet (all five coin denominations), notes, skills, magic, passport and editable saved data. Creating a hero appends and atomically saves the archive; subsequent sheet edits need the Save button. The wizard has 57 races / 35 class records / 31 backgrounds from main; extra-body creation and full class/level-up/equipment/spell execution remain incomplete. Unsupported choices stay pending. See the parity matrix for limits.

**3D-карта** enters the existing world; **Лист / меню** returns to the front end. Startup no longer captures the mouse or enters map movement. For isolated QA only, launch with `--vtt-profile-store <absolute-json-path>`; ordinary launches use the existing persistent Unity archive.

Start scene: **`Assets/Vtt/Scenes/ImportedAdventure.unity`** in `C:\Projects\DnD-VTT\unity` (Unity 6000.3.26f1). This scene loads the existing **Таверна «Медный грифон»** map v2, both floors, original floor/wall textures, and 50 instances of the 25 imported furniture models. The old `Exploration.unity` room remains a separate controller regression scene.

In Play Mode, enter **3D-карта**, then click the world for mouse capture; WASD/mouse, V camera, Space jump, Esc releases cursor, R returns to the current floor entrance. Map toolbar selects maps/floors; import/export has its own front-end page. On touch devices drag left/right for movement/look; toolbar provides camera/jump. Floor buttons explicitly move to a safe entry on that floor; they do not simulate a stair transition.

Character import accepts a single export, an array, or a `{characters:[...]}` wrapper. **Продолжить** or roster cards open native C# sheet tabs: hero, skills/saves, abilities/spells, inventory, notes and dice. Edit the base fields, add inventory entries/folders/notes/spells, search the 402-spell main catalogue, roll basic checks and manually track slots. **Сохранить на этом устройстве** writes a separate Unity archive at `Application.persistentDataPath/dnd_multi_characters_v2.json` (previous valid file in `.bak`); it loads at next startup. **Копировать изменённый JSON** exports the entire edited archive with unknown fields/wrapper/other characters preserved. Original import export remains separate. Failed imports/validated edits retain the previous valid document. This is an incomplete sheet port: class/equipment/rest/spell execution, full class creation/level-up hooks, crafting, lore/bestiary and cloud still require migration. Exact parity matrix: `../docs/UNITY_CHARACTER_SHEET_PARITY.md`.

Nine existing maps are selectable. Model coverage is complete for the tavern's model references; other maps show explicit placeholders for models outside the current packaged catalog. Walls/floors/diagonals, static open portal state, point lights and stair geometry are projected from map v2. Closed doors/windows are blocking proxies: interaction rules, fog/LOS, loot, token authority and stair routing remain for later stages. One map coordinate unit maps to one Unity unit; no combat-speed/feet conversion is inferred from realtime physics.

Inventory now also offers the 188-item main catalogue, name/category/ID search, stacking additions and current-main weight/capacity display. Folder/note/item/spell record deletion requires confirmation and rejects a changed record. Folder selection/removal preserves `activeFolderId` behaviour; quantities can be fractional. Weight does not yet apply gameplay penalties, equipment does not yet execute class/AC hooks, and container moves/consumable effects remain unported.

Content is copied by `Tools/sync_legacy_content.cjs` from the existing repository. Original glTF files and dependencies are preserved with SHA-256 provenance. The chest has a documented static bind-pose derivative because glTFast 6.14.1 fails to import its multi-primitive skin; the intact animated source is retained as `.gltf.bytes`. This does not port chest animation. License review remains required before any distribution of the migrated client.

Reproduce from PowerShell with Git/Node in PATH (close this project's Editor before batch runs):

```powershell
node unity/Tools/sync_legacy_content.cjs
node unity/Tools/sync_character_sheet.cjs
./unity/verify.ps1 -Stage MigrationSetup
./unity/verify.ps1 -Stage MigrationContracts
./unity/verify.ps1 -Stage MigrationWindows
./unity/verify.ps1 -Stage MigrationSmoke
./unity/verify.ps1 -Stage MigrationAndroid
```

`MigrationSetup` regenerates the imported scene; save/backup hand edits before using it. New development outputs are `Builds/WindowsMigration/DndVtt.exe` (keep the whole folder) and `Builds/AndroidMigration/DndVtt-experiment.apk`. `--vtt-character <path>` imports a local export at startup; save requires an explicit button. No network write occurs. `--vtt-migration-smoke` runs imported-tavern/runtime/import checks and exits with an explicit PASS marker or failure code. Reports are in ignored `TestResults/`; see `VALIDATION.md` for observed results. Character formula/save tests also run during MigrationContracts and both migration builds.

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
