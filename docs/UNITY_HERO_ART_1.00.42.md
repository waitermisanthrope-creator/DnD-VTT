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
Native candidate40491912046 (source0026e7228467b7890d1a25402dfab0ad9b24d562):
Android122148378789, Windows122155691036, installed Windows upgrade/runtime/UI
122159381122 all SUCCESS. Full registry regression WORKSHOP_STORE_PASS6958;
real Editor Android build, ARM64/signature/package/version checks PASS. Windows
player+installer built; installed1.00.00→42/reinstall and profile/backup hashes PASS.
Native UI smoke includes PNG/JPEG/BMP normalization/EXIF/cache tests and art dialog
cancellation; all25 actual GPU thumbnail frames reviewed, including art desktop,
portrait, actions, explicit3D unavailable and stats. Local native proof folder:
/workspace/work/unity-runtime/native42. This is distinct from earlier Wine QA-copy.
Publisher40495801458/job122160804933 SUCCESS; activation4afcf7fc. Independently
fetched ordinary+cache-busted feed42 and PUBLIC_DELIVERY, checked exact source/run,
downloaded APK55735390bytes and EXE39482052bytes, verified both SHA256, APK ZIP/ARM64
and Windows MZ: INDEPENDENT_DELIVERY42_PASS. Machine proof outside Git:
/workspace/work/unity-runtime/delivery42/verification.json.
Release: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.42
Published42 is immutable; any further runtime release must be newer than10042.
Physical Android gallery/gestures/lifecycle remain unperformed; owner will test.

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
