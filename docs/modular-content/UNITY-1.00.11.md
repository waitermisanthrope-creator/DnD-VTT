# Unity 1.00.11: native sheet and downloadable commerce

## Implemented

- Screen stays awake by default on mobile while foregrounded. Graphics settings persist a toggle back to the system timer. Background/destroy restores the OS policy. Old preference documents default to awake; unknown fields survive roundtrip.
- Native sheet uses dark cards, red headings, OS serif fallback, portrait vertical labels and horizontally scrolling sheet tabs. Home artwork is preserved. Procedural styles retain CPU backing and rebuild on foreground/focus.
- Inventory has category library/search/custom creation, quantities, equip, weight, container creation/rename/transfer/extraction. Container capacity is stored metadata, not enforced. Existing inventory arrays are preserved read-only pending explicit migration.
- Five optional item collections contain 188 records. Craft package adds 47 recipes and 29 material definitions. Alchemy rules plus three ingredient packages contain 120 ingredients. No downloaded executable code.
- Craft/mix transactions check proficiency and materials before committing; successes persist actual products. Alchemy supports research, shared properties, synergy/conflict/catalyst profiles, failure, history and consumable effects. Nine golden profiles exported from reviewed main JS verify native formula parity.
- Lore supports local category/title/description records; feats support explicit stat selection.

## Audit and transfer

Source main: 4d548ffb; reviewed modules crafting_engine_v31.js, alchemy_engine_v29.js, alchemy_gameplay_v30.js. Exact source hashes/exported data and golden cases are under unity/ContentSources~/workshop-commerce, outside Assets. Original full item snapshot remains outside Assets; originals are not deleted. Original long item descriptions are not republished; packages have newly generated short metadata.

Content commit f2999a0 publishes ten JSON files totaling 263008 bytes, with exact SHA-256/size in catalog/v3 and commerce-transfer.json. v1/v2 catalogs remain unchanged. Assets registry is unchanged at catalog/v2. Runtime URLs point to the public repository, not local staging.

Base Resources catalog retains 402 spells and baseline creation data; all five optional item arrays are empty. Actual signed APK must additionally pass serialized TextAsset inventory counts=0 and no optional map/texture/material assertions. No additional reduction is claimed until measured.

The main craft source overwrites canonical inventory category with human-readable recipe metadata. Export preserves the original canonical category in inventoryCategory; original JS remains unchanged.

## Partial / manual QA

PARTIAL: full visual parity, advanced professions/economy, trading, monster-part crafting, combat automation, campaign/DM tools. Alchemy duration, damage to others and many roleplay effects require manual adjudication; native basic reactions are not a claim of complete Alchemy 2.0 parity. Existing spells remain in the core. Container capacity and nested containers require follow-up. User supplied screenshots only; no attached video was available.

Device checks required: upgrade over installed APK without uninstalling; foreground screen awake/system-toggle; five lock/resume cycles; font readability/scroll tabs; item download/add/remove and save/restart; craft fail/success, ingredient depletion and product use; container transfer quantity/weight; airplane mode/custom inventory. Export characters before any reinstall. Never delete the old app to test an ordinary signed update.

## Verified candidate and status

DONE — signed Android ARM64 IL2CPP 1.00.11 / versionCode 10011, source 384fb58c89df78430e36712a7502ed03fe9da84a, run 39595880251 succeeded. APK is 40085618 bytes (40.086 MB / 38.229 MiB), SHA-256 f9fd18c7a66f939bdf38272cb2ee3ac63382bcbbacaa6666bf85dfc3eeb58210. Original signing certificate, package name and save identity verified. Stable update feeds, signing secrets and old releases are unchanged.

Test APK: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39595880251/artifacts/12343908716 (GitHub artifact ZIP; APK size above refers to extracted APK).

| Version | Exact signed APK bytes |
| --- | ---: |
| 1.00.05 | 58430834 |
| 1.00.08 | 46876786 |
| 1.00.10 | 40020082 |
| 1.00.11 | 40085618 |

New version is **65536 bytes larger than 1.00.10**. Downloadable item tables are absent, but new trusted handlers increase native code. Do not attribute the prior splash optimization to this item split. Current compressed ZIP groups: native libraries 28831698 bytes; Unity data 5146852; raw branding 3248977. Serialized APK inventory has 51 Texture2D / 6 Material / 4 TextAsset / 2 Font, no optional map JSON or floor/wall/prop textures. Pixel/chunk invariants preserve original menu images; only the previously verified non-rendering splash container is omitted during packaging.

DONE — public downloads: 205 packages, 2553962 bytes, exact lengths/SHA-256; all install/restart/uninstall/reinstall lifecycle checks passed. Newly published content: ten packages, 263008 bytes. Data publication is Content main f2999a0; app commits 1fad3849, 7c99a103, c3f686a9, 4b698df4, 384fb58c on experiment/unity-vtt. DnD-VTT main and DnD-VTT-Assets are unchanged in this stage. Original source files remain; no originals were deleted. Baseline creation and 402 spells remain bundled, while optional item collections and crafting/alchemy tables are outside Assets.

DONE — 2861 C# checks, ten Python tests, native Unity commerce activation (308 item/ingredient records, 47 recipes, nine actual JS reaction profiles), existing character/wallet/updater/map tests, five style rebuild cycles, actual APK inventory/branding/signature/version checks. First CI attempt caught nondeterministic test cleanup order with package dependencies; corrected to remove dependent leaves first, final run passed.

PARTIAL — native sheet visual parity and base craft/alchemy. Screen-awake policy and persistence are implemented/tested in code; physical sleep/lock behavior still needs device QA. Full character combat, advanced profession/economy parity, container limits/nesting and old inventory-array migration remain incomplete. Fields without native handlers remain preserved and require manual adjudication.

NOT STARTED in this stage — market/trading UI and advanced profession expansion. BLOCKED for direct verification — Android hardware interaction and video comparison (only JPG screenshots were supplied). Existing third-party asset provenance blockers are unchanged.

Next: install over existing Unity app without uninstalling; exercise sleep toggle, lock/resume styling, new inventory/craft/alchemy pages, downloads and saves/restart; then continue main sheet parity, professions and trading. Export characters before any deliberate reinstall. Exact machine-readable build evidence: UNITY-1.00.11-measured.json.
