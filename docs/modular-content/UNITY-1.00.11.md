# Unity 1.00.11: native sheet and downloadable commerce

## Implemented

- Screen stays awake by default on mobile while foregrounded. Graphics settings persist a toggle back to the system timer. Background/destroy restores the OS policy. Old preference documents default to awake; unknown fields survive roundtrip.
- Native sheet uses dark cards, red headings, OS serif fallback, portrait vertical labels and horizontally scrolling sheet tabs. Home artwork is preserved. Procedural styles retain CPU backing and rebuild on foreground/focus.
- Inventory has category library/search/custom creation, quantities, equip, weight, container creation/rename/transfer/extraction. Container capacity is informational, not enforced. Existing inventory arrays are preserved read-only pending explicit migration.
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

Candidate build and exact APK size will be recorded only after gated Android build completes. Stable update feeds and signing secrets are unchanged.
