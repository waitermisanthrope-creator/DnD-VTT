# Expanded workshop inventory — prepared stage, 2026-10-23

Owner requested five independent large collections for Unity, generic creature
parts, equipment and consumable usage. Source branch: experiment/unity-vtt,
not the legacy main WebView client. Content counterpart:
DnD-VTT-Content/catalog/v4/index.json and docs/ITEM_COLLECTIONS_V4.md.

Adds bounded 5000-entry item packs (other resource types still 100), paged
inventory picker, embedded crafting materials/alchemy profiles with stable-ID
deduplication, generic-material aliases for craft/alchemy/research, exclusive
body/shield armor slots, owned-stock consumption and actual healing dice.
Normal consumables can explicitly declare manual usage; no unsupported effect
is represented as automatically implemented. Legacy crafted items gain a
fallback description; alchemy products gain weight/description.

Five versioned data packs contain 3311 records, including many material,
enchantment and cosmetic variants. Original IDs, v3 bytes, 47 recipes and 120
ingredient profiles retained. New general parts are animal/monster/humanoid.
No monster drop tables/harvesting UI added; weapon effects are stored on item,
not connected to a new combat controller. Unknown magical behavior remains
manual. Generic alias material can satisfy legacy crafting and alchemy IDs;
old saves are not rewritten. Device GUI/performance/installation-over QA and
APK/EXE release remain outstanding.

Runtime content URL moves to v4; publish the Content counterpart before shipping
this client. Existing installed 1.00.34 continues reading v3. No updater/version
bump or release workflow is part of this stage. The targeted integration command:

```
dotnet run --project unity/ci/workshop-tests -- --collections-only ../DnD-VTT-Content
```

The normal workshop suite retains its historical v3 regression fixture and
requires actual hash-verified release JSON/images from the Assets repository.

Validation recorded: 34 collection integration checks PASS; existing workshop
suite 4398 checks PASS; Python content-registry contract PASS; Content verifier
190 entries / 3311 records and exact hashes PASS. Native Unity GUI builds were
not run. Content draft PR: https://github.com/waitermisanthrope-creator/DnD-VTT-Content/pull/1 .
