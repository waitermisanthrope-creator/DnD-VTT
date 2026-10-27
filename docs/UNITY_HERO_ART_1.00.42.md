# Hero art — Unity1.00.42

Owner requested portable user art and a redesigned Hero tab, then paired release42.
Current implementation: PNG/JPEG/uncompressed24/32bit BMP via existing Windows
Unicode dialog/Android SAF; no storage permission, new Activity or remote URLs.
Input <=16MiB, <=24MP, edge<=8192; preflight before decode. Normalize <=512px/64KiB
JPEG with alpha flattened on dark background; EXIF orientations1–8 honored.
heroArt={version:1,mime:"image/jpeg",data:base64} is part of preserved hero JSON,
not a cache path. Original-ID callback, detached transaction, atomic save/.bak,
corrupt/cancel/oversize leaves previous image/data. One readable texture cache;
low-memory/teardown clears ownership and next draw reconstructs it.

Layout: portrait above details on phone, beside on wide desktop; Art/3D-coming-soon,
replace/remove; identity, health/defence, stat cards; archive actions under Ещё.
All existing fields/rules retained, no real3D functionality claimed.

Archive/file bound raised consistently C#/Java to16MiB; individual cloud-compatible
profile bound remains1MiB with JSONB separator counting. Old clients can reject
archives over1MiB: update receiving client before transferring large multihero archives.
SQL, existing scenes/GUIDs/signing/main/MMO untouched. New scripts have new GUIDs.
Workflow change only candidate default/fallback version41→42, existing gates unchanged.

## Verification

33 pure art/size/save/restart/export/backup/ID/BMP/EXIF checks,121save+syntax,
50menu gesture logic PASS. Existing branding/settings/content/preview/launcher/contrast
contracts PASS; cloud release10/publisher6/render-review2 tests PASS.
Local runtime Roslyn compile against release40 managed DLLs: no errors, six existing
platform/unused-field warnings. Actual QA-copy Unity player in Wine10 exits0,
VTT_HERO_ART_PASS (PNG/JPEG/BMP, restoration/cache,8 EXIF orientations),
VTT_DESKTOP_UI_PASS, daily-character/file-dialog gates. Actual art dialog cancellation
is tested alongside existing JSON open/save. Local artifacts outside Git:
/workspace/work/unity-runtime/evidence/art42-final and art42-final-player.log.
Wine QA-copy is not an Editor or native Windows/Android build.
Native candidate, final installed Windows GPU review, publication/public-download
verification will be recorded after execution; no successful42 release claimed yet.

## Remaining manual checks

Android: SAF PNG/JPEG/BMP, cancel/back/rotation/background, gallery/cloud-provider
files, repeated opening/force-close/restart, swipes vs sliders, multiple heroes,
export/share/import on another updated device, original image deletion.
Windows: same file/import/restart cases, window resize/DPI, wheel and long names.
Try corrupt/oversize input; old portrait and archive must remain.
3D is intentionally unavailable. Very large/unsupported images produce clear errors.
See plan ledger for review and deferred low-impact compatibility cases.

Additional lower-tab visual pass: corrected unused gutter/stat-card width after
actual Телосложение word split; single-line regression RED→GREEN and inspected
portrait stats frame PASS. Final QA-copy log art42-stat-green.log, exit0.
