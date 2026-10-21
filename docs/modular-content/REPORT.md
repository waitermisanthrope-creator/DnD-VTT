# Minimal modular Android1.00.08 — verified checkpoint 2026-10-21

DONE — source0762b51d/run39518732474 SUCCESS, [signed test APK](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39518732474/artifacts/12310252576), artifact12310252576.46876786 bytes vs1.00.07/51825922 (-4949136 bytes/9.55%); vs1.00.05/58430834 (-19.774%). SHA256 f1b2f98a667f57a7d304d218965b2cd4afb625f12e79cbd0df76c0cd6404e169. Android ARM64/com.dndvtt.unity/code10008/original key and artwork retained. Actual APK serialized catalog:15 PHB race variants/12 PHB classes/1 SRD Grappler feat; no map JSON/old map textures/materials. Texture2D99→51 (all48 old optional textures excluded); Material84→6; TextAsset13→4. BuildReport rejects any Assets/LegacyContent dependency. Original source files deleted0.
DONE —195 public JSON packages2290954 bytes independently downloaded/verified;192 new packages2288318 bytes (42 races/23 classes/117 feats/9 maps/36 procedural surfaces in1pack). Content9b4a5cf, Assets8a256f4. App runtime v2 catalogs; v1 preserved for1.00.07.2597 C# +10 Python checks pass. Native workshop validation confirms downloaded map opens in empty catalog, real generated texture rendering, object placement/save/restart/uninstall/reinstall without save changes. Physical1.00.07 Lanternfolk path owner-confirmed.
DONE — exact Quaternius CC0 provenance matched:25 buffers+12 PNG byte-identical,25 glTF JSON structurally identical. Assets169da75+4da325e published62 original Git-blob files32152059 bytes in source Release quaternius-cc0-map-props-v1. ZIP31255211 bytes/SHA48420d63b20a225825a1167ba90ba459204d1c75a0949169e9b8fdacf3e041d9 downloaded and every file checked. Source-only; no false runtime bundle claim.
PARTIAL/BLOCKED — full runtime Quaternius bundle still pending; old36 floor/wall PNG provenance requested from owner. Published new procedural patterns are replacements, not original PNG copies.4 race-replacing extra classes import-only; full class advancement/combat and non-stat feat effects remain manual as labelled. Windows native build not run. Owner feat preference question unanswered; used SRD Grappler baseline.1.00.08 phone QA NOT STARTED. Next: install over1.00.07, refresh catalogs, verify base/offline creation and optional race/class/feat/map/surface downloads/restart; then original surface licensing and runtime bundles. Main/stable feeds/signing/saves unchanged. See EXTRACTION_STAGE2.md and minimal-1.00.08-metrics.json.

## Android download hotfix1.00.07 — DONE build / PARTIAL device QA
Source746c1435, run39512342453 SUCCESS. [Signed test APK](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39512342453/artifacts/12306458856), artifact12306458856. Version1.00.07/code10007/com.dndvtt.unity ARM64, previous signing key retained.51825922 bytes, SHA256 c20079a977280580481d5579d527f6776bbe951785b608407cd3cb3d151da743.93 C# checks,10 Python CI tests and native VTT_WORKSHOP_EDITOR_PASS (real object/material/map persistence integration) PASS; original branding verified. Android uses StatFs, unsupported probes no longer block bounded downloads; lowMemory no longer overwrites operation result. User screenshots confirm old1.00.06 failure;1.00.07 physical-device download/install/restart still requires retest. Install over1.00.06; no uninstall/save deletion required. Main/stable feeds/signing unchanged. See hotfix-1.00.07-metrics.json.

# DnD-VTT: фактический результат модульного этапа

> **Уточнение после проверки владельцем на Android:**1.00.06 открывает мастерскую и каталог, но установка блокируется неподдерживаемым IL2CPP вызовом `DriveInfo.GetDriveFormat`. Состояние загрузки на устройстве: **PARTIAL / ошибка подтверждена**. Исправление746c1435 использует `android.os.StatFs` для папки приложения, допускает скачивание при недоступной предварительной проверке и сохраняет сообщения результата при сигнале lowMemory.93 C# и10 Python проверок прошли;3 публичных пакета2636 байт повторно скачаны/проверены. Сборка1.00.07: [Actions39512342453](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39512342453), SUCCESS; APK1.00.07 —51825922 байта, SHA256 c20079a977280580481d5579d527f6776bbe951785b608407cd3cb3d151da743. Требуется повторная проверка на телефоне. Прежние метрики1.00.06 ниже остаются историческими измерениями.

**Общий статус: PARTIAL. Облегчённый подписанный Android APK собран. Мастерская подключает опубликованные тестовые JSON-пакеты; полное вынесение прежнего контента и проверка на телефоне не завершены.**

[Скачать тестовый APK1.00.06 (GitHub artifact ZIP)](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39508072660/artifacts/12305216911). Требуется вход в GitHub; срок хранения APK —3 дня после сборки20 октября. APK и стабильная лента не публиковались автоматически в Releases.

Старый Unity1.00.05: **58 430 834 байта**. Новый1.00.06: **51 830 018 байт**. Измеренное уменьшение **6 600 816 байт / 11,297%**. Сравниваются APK-файлы, не размер ZIP artifact и не полный BuildReport output.

## Репозитории, ветки и коммиты

**DnD-VTT — `experiment/unity-vtt`**

- [041f8073](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/041f8073) feat(unity): integrate verified modular workshop packages and persistent map library
- [7d6f94f9](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/7d6f94f9) fix(workshop): refresh verified registry cache after external pointer changes
- [8a8b2993](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/8a8b2993) fix(unity): include AssetBundle module and test packages downloaded from public registries
- [31f83794](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/31f83794) feat(workshop): release unused bundle cache and record verified migration evidence
- [8665ab0f](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/8665ab0f) fix(workshop): repair corrupted cache on retry and isolate package removal
- [60a01a19](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/60a01a19) perf(android): reduce prop texture imports and validate workshop objects in Unity Editor
- [16d56de7](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/16d56de7) fix(ci): initialize saved scene before additive workshop validation
- [f98d7f0d](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/f98d7f0d) docs: publish device QA procedure and current verified build checkpoint

**DnD-VTT-Content — `main`**

- [2803eef](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/commit/2803eef) feat: publish CC0 lanternfolk race package with verified manifest
- [8fb953d](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/commit/8fb953d) docs: align published data registry with shared runtime manifest
- [b201ddc](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/commit/b201ddc) docs: record implemented runtime pilot and remaining device checks

**DnD-VTT-Assets — `main`**

- [908899d](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/908899d) feat: publish CC0 object and theme packs and preserve licensed source metadata
- [d91141c](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/d91141c) build: release verified CC0 skin sources without storing binary files in Git
- [faa30dd](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/faa30dd) docs: document verified source release and shared runtime manifest
- [7c4448c](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/7c4448c) docs: distinguish live JSON packages from source archive and pending bundles
- [8d64a35](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/8d64a35) docs: record primary license evidence before migrating remaining third-party assets

Собранный исходный код: `16d56de73925c36b94a69074aa5eeca98c72aa96`. Последующие изменения — документация/аудит; финальный отчётный коммит виден в истории ветки. `DnD-VTT/main` остался на `4d548ffbb29f15288faa24f298858b7eef0448c5`. История не переписана. Старые релизы, ключи и опубликованные update feeds не изменены.

## Статусы всего запроса

| Этап | Статус | Что сделано / что осталось |
|---|---|---|
| 1. Полный аудит | PARTIAL | Проверены три репозитория, две ветки приложения, Gradle, GUID/glTF-зависимости, хеши/дубли; фактический старый APK разобран, новый проверен на runner. Полный динамический call graph WebView/всех Unity runtime-путей не доказан. |
| 2. Перенос | PARTIAL | 6 уникальных существующих файлов опубликованы и побайтно проверены; 0 оригиналов удалено. Большинство старых ресурсов/данных ещё не перенесено; нужны лицензии и потребители runtime. |
| 3. Минимальный клиент | PARTIAL | Реальный APK меньше, оформление и offline-база сохранены, оригиналы не удалены. Все старые optional-ресурсы ещё не выделены; запуск на устройстве не проверен. |
| 4. Мастерская | PARTIAL | Два каталога, 14 категорий, поиск, карточки/детали, автор/версия/размер/лицензия/зависимости, progress, SHA-256, установка/удаление/обновление/повтор, офлайн-кеш и сохранённый реестр. Активация прочих игровых категорий, полноценная mobile UI QA ещё нужны. |
| 5. AssetBundles | PARTIAL | Android bundle реально построен/хеширован, Windows builder реализован. Android/Windows runtime bundles не проверены на устройствах; Windows binary не построен; бинарные bundles не опубликованы в Assets Releases/catalog. |
| 6. Подключение к игре | PARTIAL | Скачанная раса участвует в создании/статах/сохранении; объекты/материалы реально создаются и используются на карте, сохранение восстанавливается. Подтверждено C# и Unity Editor. Классы/системы/остальные механики не активируются; phone QA остаётся. |
| 7. Тестовые пакеты | PARTIAL | 3 собственных CC0 JSON опубликованы и проверены по HTTP/размеру/SHA; 3D-пакет — процедурные примитивы. Есть отдельный построенный binary bundle artifact; публикация и device runtime QA ещё не выполнены. |
| 8. Оптимизация APK | PARTIAL | Уменьшение файла на11,297% измерено. 12 prop-текстур реально1024×1024 в APK, исходные PNG/Windows-параметры/меню сохранены. Проверка качества/запуска на Android ещё нужна. |
| 9. Обновления/CI | PARTIAL | Полный cloud run SUCCESS, версия1.00.06/code10006, ARM64, com.dndvtt.unity, прежний certificate, zipalign. Stable feed не тронут. Установка поверх1.00.05 физически не проверена. |
| 10. Сохранения/безопасность | PARTIAL | Пользовательские файлы не удаляются. Дополнительные IDs/версии не меняют старые поля/schema. Экспорт JSON/резервные копии и предупреждение перед uninstall есть; реальная переустановка и внешний Android backup UX требуют проверки. |
| 11. Отчёт | DONE | Код, коммиты, измерения, артефакты, границы проверок и дальнейший прогресс зафиксированы. |

## Реально опубликованные файлы и размеры

- **6 уникальных оригинальных MakeHuman-файлов / 8 096 382 байта исходных данных**: LICENSE.ASSETS.md, README.md, female/male mhmat и соответствующие два diffuse PNG. Точные пути/хеши — [migration inventory](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/blob/main/migration/verified-copies-v1.json) и [source release plan](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/blob/main/migration/reviewed-source-release.json).
- [Assets source Release](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/tag/makehuman-cc0-skins-v1): ZIP **8 091 253 байта**, SHA-256 `6e20613c2288034f618e63ed2a259cb118e8840577ea049abcfa9891f54c1d3d`. CRC и байты всех исходных файлов проверены. Это source-only архив; его нельзя считать установленным Unity content pack.
- Четыре маленьких файла лицензии/метаданных также хранятся в Git Assets: **11 398 байт**, уже включены в6 уникальных оригиналов и повторно не считаются. Большие PNG не добавлены в новую обычную Git-историю.
- **3 новых JSON / 2 636 байт**: [Фонарники](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/blob/main/packages/demo.race.lanternfolk.json), [3D-маркеры](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/blob/main/packages/demo.model.markers.json), [янтарное оформление](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/blob/main/packages/demo.appearance.amber.json). Их права — собственная CC0-декларация; чужие материалы этой декларацией не лицензируются.
- **Удалено оригинальных файлов:0**. Все оставшиеся отслеживаемые исходники и их SHA-256/размеры перечислены в [audit.json](audit.json), известные зависимости — [DEPENDENCIES.md](DEPENDENCIES.md). Для6 файлов указана проверенная внешняя копия; остальные не объявлены перенесёнными.

## APK, встроенные ресурсы и пакеты

| Измерение | Значение |
|---|---|
| Unity1.00.05 APK, реально скачан и локально проверен | 58 430 834 байта |
| Unity1.00.06 подписанный APK, реально измерен на runner | 51 830 018 байт |
| Уменьшение | 6 600 816 байт /11,297% |
| ZIP-compressed assets/bin/Data, старый → новый | 16 860 311 →10 128 766 байт |
| ZIP-compressed assets/Branding | 10 103 002 байта в обоих APK; каждый файл побайтно сверён с источником |
| ZIP-compressed native libraries, старый → новый | 28 601 271 →28 736 098 байт |
| Три downloadable JSON | 2 636 байт |
| Построенный Android bundle, пока только artifact | 73 619 байт |

ZIP-группы определены путями и содержат также engine/settings/metadata; они не равны чистому объёму игровых текстур. Unity BuildReport `reportedBuildOutputBytes` может учитывать symbols/intermediates, поэтому не используется как размер APK. [Точные APK metrics](final-apk-metrics.json), [старый APK](old-apk-inspection.json), [фактические сериализованные объекты старого APK](old-apk-objects.json).

Новый APK SHA-256: `dc7e0a8cea1b6ac8a05743e93835b43fee0dbbbb6506a893eedbc8d3b4fbdcea`. Certificate SHA-256: `c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e`; совпадает с локально проверенным старым Unity1.00.05. Версия1.00.06/code10006, package `com.dndvtt.unity`, ARM64, SDK26/36.

Старый WebView74.00.68:406 344 896 байт по Release metadata, package `com.dndvtt.pocketvtt`. Это другой клиент; его нельзя подставлять в расчёт текущего уменьшения Unity APK. Между клиентами нужен JSON экспорт/импорт.

## Проверки и ссылки на настоящие артефакты

- [Итоговый cloud run39508072660](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39508072660) — **SUCCESS**, source16d56de7.
- [Подписанный тестовый APK](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39508072660/artifacts/12305216911).
- [Измерения APK + candidate.json + инвентарь](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39508072660/artifacts/12306125695).
- [Unity BuildReport](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39508072660/artifacts/12305082001).
- [Доверенный Android bundle artifact](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39508072660/artifacts/12305781311):73 619 байт, SHA-256 `b0ec35005db7a35792e501a4aaf124a4405555cf3491684f3bf83084490c806b`. Не включён в публичный runtime-каталог; device load не проверен.
- **88 C# checks PASS**: публично скачанные пакеты, фактические install/restart/uninstall/reinstall, ошибки хеша/размера/схемы/платформы/зависимостей/циклов, repair повреждённого кеша, защита соседнего ID, создание героя/бонусы/ID/сохранение после удаления расы. Часть checks — синтаксис; native-компиляция подтверждена отдельной Unity сборкой.
- **10 Python CI tests PASS**; branding/updater/catalog/shared JSON Schema/provenance (44 исходника + CRLF) и git diff --check PASS.
- **VTT_WORKSHOP_EDITOR_PASS**: Unity действительно создал primitive renderers/colliders, использовал материал, разместил объект, сохранил карту, восстановил заменитель без пакета и объект после переустановки; байты сохранения не повреждены.
- Штатные Unity Editor проверки: кошелёк/настройки, updater, 57 races/35 class records/31 backgrounds и три JS-проекции создания,60 sheet golden cases/402 spells/188 items,9 map contracts,3 branding assets — PASS. Это не подтверждает полноценность всех классов/механик.
- Реальные APK проверки: подпись/zipalign/package/version/ARM64;12 текстур1024×1024; три packaged branding-файла побайтно идентичны. [Native evidence](native-validation.json).
- Непосредственно в workspace проверены старый APK, цифровой сертификат, публичные JSON и source ZIP/CRC/байты, C# lifecycle/character tests. Новый APK проверен на GitHub runner: File Service download URLs недоступны из workspace (HTTP403); это не заменялось обходом политики.

## Ограничения, блокеры и следующий шаг

- **BLOCKED** отдельное распространение большинства старых third-party материалов до проверки точного происхождения/лицензии. [Первичные license sources и выводы](LICENSE_REVIEW.md). Не считать всю папку Quaternius автоматически CC0 или автоматически QAL; нужно сопоставление конкретных файлов.
- **NOT STARTED** Android physical QA: холодный offline-запуск, меню/настройки, создание/лист, workshop UI, материал/3D-карта, качество текстур, force-stop/restart и установка поверх старой версии. [Пошаговая проверка](DEVICE_QA.md).
- **PARTIAL** бинарные bundles: Android build и metadata verification есть, но нет device load; Windows binary/runtime QA не выполнены. Перед Assets Release нужны полные upstream Unity/URP license notices и проверка пакета, затем публичные URL/байты/SHA и catalog entry. Не выдавать artifact за опубликованный пакет.
- **PARTIAL** прочие категории: downloaded classes/systems/subclasses/spells/items/monsters/maps/textures/animations/collections пока не имеют завершённой активации. UI показывает недоступность обработчика; не считать их игровыми функциями.
- Большинство старых ресурсов пока остаётся встроенным/в исходнике. Из APK исключать только после проверенной внешней копии **и** работающего потребителя. ИсходныеPNG, обои, логотип, заставка и сцены не удалены.
- Сохранения не удаляются и не переводятся на новый несовместимый формат. Дополнительное поле contentPackages и classId необязательны; старые поля и неизвестные данные сохраняются. Android uninstall может удалить локальные файлы: заранее сохранить экспорт вне приложения. Clipboard/internal .bak не гарантируют восстановление после удаления.
- Базовая историческая неполнота Unity классов/мультиплеера/редактора не объявлена исправленной. Полное production-паритетное VTT этим этапом не завершено.

Первый следующий практический шаг: установить тестовый APK на Android по DEVICE_QA.md, проверить три опубликованных JSON-пакета и сохранения; параллельно построить Windows bundle и завершить безопасную публикацию совместимых бинарных пакетов. Затем переносить оставшийся разрешённый контент по dependency map без массового удаления оригиналов.
