# Unity 1.00.28 — installed 3D dice materials

## Install and select

1. Update from the application to1.00.28.
2. Refresh workshop catalogs. Open Оформление → 3D Дайсы.
3. Install/update the desired3D pack to1.1.0. Installing its icon alone does not install3D materials; icon is no longer a prerequisite.
4. Open3D table → «Мои наборы» and select the installed set. Manual choice persists independently of launcher icon. Explicit icon-follow mode remains available.

## Implemented

Restored installed-set picker; actual validated UV atlases on moving bodies and sculpted details; metallic physical edges; raised hollow tentacle cups; combined meshes; bounded live batches with unlimited logical roll counts. Numerals use world depth, facet fitting and dark outline. Material tint no longer clips light sets.31 workshop thumbnails now derive from actual native Unity renderer images, not icon photographs or schematic stand-ins. Downloads stay outside APK. Legacy1.0 recipes/catalogs remain supported. No save/auth/package/signing migration.

## Art and verification limits

01 Abyss and05 Blood have specifically authored face material from owner reference art. Other29 are tinted engraved adaptations, NOT31 exact individually sculpted icon replicas. Shapes remain procedural; tentacles are rigid. Elasticity, blood trails, ice/wood effects are not implemented. Workshop page-reset remains explicitly deferred. No physical phone was available; touch/GPU/install-over checks remain owner QA. Native images are actual Linux Unity Editor renders targeting Android, not phone screenshots. Windows install/upgrade/reinstall and save preservation were executed; interactive desktop GPU/input were not checked. SQL WASM tests are not live Supabase verification; no database change required.

## Delivery evidence

Runtime source:3e3ded5f05d3de2f896eab48eabc6e26063b132c. [Candidate39862385559](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39862385559): Android, Windows and Windows upgrade jobs SUCCESS. [Final publisher39865745625](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39865745625) SUCCESS after exact render-index approval. [Release1.00.28](https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.28).

4319 C# checks;12 original Python tests;2 review-boundary tests;133 SQL WASM checks passed. Each target:60 topology checks,129 real PhysX throws,32 numeral GPU controls (hidden rear labels0changed pixels; visible fronts positive contrast), textured-vs-untextured rendering, collider/combined-mesh/cache/resource checks passed.31 native PNGs visually reviewed; full01/05/07/23 reviewed for contrast. Version27 candidate failed visual acceptance and was never activated in the update feed.

Both public installers downloaded and SHA/size verified. APK apksigner v2/v3 passes with original certificate; aapt confirms com.dndvtt.unity/versionCode10028. Public plain and cache-busted update feed verified.31 public JPEG previews/686094bytes individually SHA/size/dimension verified.31 separately downloaded material JSONs/108341111bytes verified. Detailed hashes in adjacent metrics JSON.

Next runtime must exceed10028. Do not regenerate immutable1.1 payloads or rebuild published28. Future material publishing must retain/re-publish matching native previews. Next art stage is individually authored geometry/materials for remaining sets, followed by device QA.
