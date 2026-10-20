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
