# Modular extraction checkpoint — 2026-10-21
Owner confirms1.00.07 Lanternfolk download and creation picker work on Android (DONE for that device path).
Current request: PHB-only race/class/feat baseline, downloadable maps and surfaces, no optional assets inside initial APK.
Published Content9b4a5cf:42 non-PHB race +23 class +117 feat packages; Assets8a256f4:9 maps + original36-pattern surface package.195 total public packages2290954 bytes verified by download/SHA/size, including3 previous demos. V1 registries preserved; new1.00.08 usesv2. Baseline15 PHB race variants (9 families),12 classes, SRD Grappler; owner PHB feat preference question unanswered, used stated SRD default. Full source snapshot retained under unity/ContentSources~ (not imported by Unity), originals deleted0.
2597 C# lifecycle/character checks PASS. Native1.00.08 build pending: minimal scene generation, build dependency exclusion and actual APK inventory must pass before claiming no bundled maps/textures. Same key/package/save identity, stable feeds/main unchanged.
PARTIAL:4 race-replacing extra classes remain import-only; full class progression/combat/feat effects manual as labelled. BLOCKED: exact licenses of legacy third-party PNG/Quaternius models not proven; no binary re-publication. New own patterns are replacements, not original PNG copies. Existing map model refs preserved as placeholders when missing; user saves never deleted.

## Android download hotfix1.00.07 — DONE build / PARTIAL device QA
Source746c1435, run39512342453 SUCCESS. [Signed test APK](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39512342453/artifacts/12306458856), artifact12306458856. Version1.00.07/code10007/com.dndvtt.unity ARM64, previous signing key retained.51825922 bytes, SHA256 c20079a977280580481d5579d527f6776bbe951785b608407cd3cb3d151da743.93 C# checks,10 Python CI tests and native VTT_WORKSHOP_EDITOR_PASS (real object/material/map persistence integration) PASS; original branding verified. Android uses StatFs, unsupported probes no longer block bounded downloads; lowMemory no longer overwrites operation result. User screenshots confirm old1.00.06 failure;1.00.07 physical-device download/install/restart still requires retest. Install over1.00.06; no uninstall/save deletion required. Main/stable feeds/signing unchanged. See hotfix-1.00.07-metrics.json.

## 2026-10-20 — Android workshop download hotfix (PARTIAL)
User device screenshots demonstrate1.00.06 cannot download: Android IL2CPP does not support DriveInfo.GetDriveFormat. Replaced Android probe with android.os.StatFs on actual workshop path; unavailable probe permits bounded streaming with existing IO/SHA checks. Low-RAM event releases bundle cache without overwriting download errors/results.93 C# and10 Python CI checks PASS. Candidate1.00.07/code10007 pending native build and device retest; no stable feed/save/signing change.

# Модульный контент — актуальный checkpoint 2026-10-20

Общий статус PARTIAL. Подробный фактический отчёт: [REPORT.md](REPORT.md).

DONE — облегчённый подписанный Android candidate1.00.06/code10006:51830018 байт против58430834 в1.00.05, минус6600816 байт/11,297%. Source16d56de7, cloud run39508072660 SUCCESS, test APK artifact12305216911. Оригинальное оформление проверено побайтно;12 prop-текстур1024×1024. Stable feed/старые релизы/подпись не изменены.
DONE — три собственных CC0 JSON опубликованы: Lanternfolk, procedural marker objects, amber map materials;2636 байт. Реальные HTTP/SHA и install/restart/remove/reinstall проверены; race stats/save и настоящие Unity map renderers/colliders/materials/save/restore/reinstall проверены.
PARTIAL —6 уникальных исходных MakeHuman файлов/8096382 байта опубликованы и проверены. Source ZIP8091253 байта, CRC/SHA/байты PASS. Четыре малых metadata/license файла11398 байт также в Git. Оригиналов удалено0. Остальное — audit.json; лицензии многих групп не подтверждены.
PARTIAL — Android AssetBundle реально построен:73619 байт, artifact12305781311. Binary bundles ещё не опубликованы в Assets catalog/Releases, device load и Windows build/runtime QA не выполнены; нужны upstream Unity/URP notices перед публикацией.
PARTIAL — все категории видимы, но активация большинства gameplay-категорий пока недоступна. Нельзя объявлять classes/systems/animations/maps/collections завершёнными.
NOT STARTED — физическое Android QA и проверка обновления/переустановки. DEVICE_QA.md содержит сценарии; не отмечать DONE по Editor-тестам.

Проверки:88 C# checks,10 Python CI tests, branding/updater/catalog/schema/provenance PASS; VTT_WORKSHOP_EDITOR_PASS и штатные Unity golden contracts PASS. MAIN приложения сохранён на4d548ffb. Разработка опубликована в experiment/unity-vtt; Content/Assets —main. Не повторять уже выполненную публикацию и не перезаписывать релизы. Не удалять исходники/пользовательские файлы.

Следующее: реальное Android QA; лицензии/provenance remaining assets; Windows bundle и безопасная Assets Release публикация; затем остальные handlers и вынесение реально используемого optional-контента. Подробные коммиты/артефакты/размеры — REPORT.md, данные — final-apk-metrics.json и native-validation.json.
