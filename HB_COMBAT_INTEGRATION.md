# DnD-VTT Unity — HB combat integration / CONTINUE HERE

**Working branch:** `experiment/unity-vtt`. NEVER commit to `main`. This is a living handoff for future AI sessions and human contributors. Read this file **before** modifying class abilities, resource formulas, combat turns, effects, or Android releases.

## Actual implementation (Unity 6000.3.26f1 URP)

- `unity/Assets/Vtt/Runtime/CharacterResourceEngine.cs`: `resourceDefinitions` (array) and `resourceState` (object); atomic `TrySpend`, `Restore`, `StartTurn`, `EndTurn`, movement, reaction, extra action.
- `unity/Assets/Vtt/Runtime/CharacterAbilityActivation.cs`: `Activate(hero, ability)` atomically consumes action, ability uses and optional class resource. Existing `hero.resources[id]` is authoritative; do **not** mirror the same resource into `resourceState`. `ImportDefinitions` and `RefreshFormulaResources` validate HB definitions and recalculate maxima.
- `unity/Assets/Vtt/Runtime/CharacterSpellCasting.cs`: cast slots/pact, 2014/2024 per-turn restrictions, concentration and concentration saves.
- `unity/Assets/Vtt/Runtime/CharacterTimedEffects.cs`: round-based effect durations and concentration cleanup; does **not** yet apply stat modifiers or resolve dice rolls.
- `unity/Assets/Vtt/Runtime/CharacterSheetRules.Actions.cs`: legacy resource/ability/spell counters and rest.
- `unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireAbilities.cs`, `LegacySessionPanel.GrimoireTurn.cs`: IMGUI cards and action controls.
- `unity/ci/workshop-tests/ResourceEngineChecks.cs`: regression checks. `.github/workflows/unity-resource-checks.yml` runs them on changes.

## HB resource package format

Attach `resourceDefinitions` to a class blueprint; `CharacterCreation.Create` imports after stats are assigned. Example:

```json
{
  "resourceDefinitions": [
    {
      "id": "hb.soulCharges",
      "name": "Заряды души",
      "maxFormula": "max(1, floor(level / 2) + modifier:wis)",
      "minimum": 1,
      "restoreOn": ["short", "long"]
    }
  ]
}
```

Supported expression grammar: nonnegative numeric literals (decimal point allowed), `level`, `proficiency`, `modifier:str`, `modifier:dex`, `modifier:con`, `modifier:int`, `modifier:wis`, `modifier:cha`; operators `+`, `-`, `*`, `/`; parentheses; `min(a,b)`, `max(a,b)`, `floor(x)`, `ceil(x)`. Evaluation is bounded and **never** executes arbitrary code. Maximum range 0–1,000,000; expression <=256 chars; character level 1–20. If `maxFormula` is absent, use integer `max`. An imported definition stores the evaluated `max` and the original formula. Call `RefreshFormulaResources(hero)` after level/stat changes; it preserves current charges (clamped on max decrease), rather than silently refilling.

## HB combat ability contract

```json
{
  "id": "hb.soulStrike",
  "name": "Удар души",
  "actionType": "bonus",
  "resourceId": "hb.soulCharges",
  "resourceCost": 2,
  "maxUses": 3,
  "usedCount": 0,
  "rechargeOn": "long"
}
```

1. Add the ability to `hero.combatAbilities`. **Never** mark purely descriptive `hero.features` as executable automatically.
2. `actionType` supports `action`, `bonus`, `reaction` (and their currently implemented Russian aliases). Unsupported types fail closed.
3. `resourceId` points to either a legacy `hero.resources[id]` entry (authoritative) or a defined `resourceState[id]`. Never use both for the same ID. `resourceCost` is a positive integer.
4. `maxUses`/ `usedCount` are the legacy per-ability counter; do not duplicate them in a resource definition. The activation transaction validates all costs before committing. Any failure must leave the character unchanged.
5. A reaction can occur between turns; action/bonus must not. Class-specific exceptions (haste, action surge, reaction triggers, free activations) need explicit engine rules, not a guessed action type.
6. **Effects**: `CharacterTimedEffects.Apply(hero,id,name,rounds,concentration)` manages expiration only. It does not deal damage, grant advantage, modify AC, or validate target selection. Those require a later typed combat effect resolver.
7. **Persistence**: use the existing `SheetAction` UI change pipeline. Never write a separate temporary counter in the view.

## Test and release gates

Run `dotnet run --project unity/ci/workshop-tests/WorkshopTests.csproj -- --resources`; inspect GitHub Actions status and fix compile errors. Verify Unity C# compile and Android ARM64 candidate separately. Do not claim success from an unexecuted test.

**Android in-app updates are owner-gated**: `.github/workflows/unity-android-update-publish.yml` requires a successful, signed, versioned candidate AND explicit owner approval with `github.actor == waitermisanthrope-creator`. Do not bypass approval, fake a successful build, publish an unverified APK, or modify `updates/unity-experiment.json` manually. Existing public channel must remain intact until owner-authorized promotion.

## Known remaining work

- Tie resource formula refresh to every level/stat edit, not just explicit import/refresh calls.
- Validate cross-package duplicate IDs, schema versions and dependency constraints at content-manager boundaries.
- Add typed effects, targeting, damage/healing, saving throws and class-specific action exceptions.
- Confirm IMGUI button sizes/skins on real Android devices and run actual Unity + .NET tests.
- Existing GitHub cloud candidate may reject reused version **before** Unity compilation. Diagnose version reservation; do not interpret that as a compile failure.

## Resume checklist

1. Fetch this file and the referenced source files from `experiment/unity-vtt`.
2. Check latest GitHub Actions results and commit SHA.
3. Fix failing tests, add regressions, then test Unity candidate.
4. Never state that an Android update is live without checking the signed release and update manifest.
