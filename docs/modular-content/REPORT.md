# Фактический отчёт: модульный контент DnD-VTT

Общий статус: **PARTIAL**. Полный критерий Android + мастерская + проверка на устройстве ещё не подтверждён. Состояние нативной сборки обновляется ниже; завершение реализации C# не равно прохождению Unity runtime QA.

## Изменённые репозитории, ветки и коммиты

### DnD-VTT — `experiment/unity-vtt`

- [041f8073](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/041f8073) feat(unity): integrate verified modular workshop packages and persistent map library
- [7d6f94f9](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/7d6f94f9) fix(workshop): refresh verified registry cache after external pointer changes
- [8a8b2993](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/8a8b2993) fix(unity): include AssetBundle module and test packages downloaded from public registries
- [8665ab0f](https://github.com/waitermisanthrope-creator/DnD-VTT/commit/8665ab0f) feat(workshop): release unused bundle cache and record verified migration evidence

### DnD-VTT-Content — `main`

- [2803eef](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/commit/2803eef) feat: publish CC0 lanternfolk race package with verified manifest
- [8fb953d](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/commit/8fb953d) docs: align published data registry with shared runtime manifest
- [b201ddc](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/commit/b201ddc) docs: record implemented runtime pilot and remaining device checks

### DnD-VTT-Assets — `main`

- [908899d](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/908899d) feat: publish CC0 object and theme packs and preserve licensed source metadata
- [d91141c](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/d91141c) build: release verified CC0 skin sources without storing binary files in Git
- [faa30dd](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/faa30dd) docs: document verified source release and shared runtime manifest
- [7c4448c](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/commit/7c4448c) docs: distinguish live JSON packages from source archive and pending bundles

DnD-VTT/main не изменён. История не переписана; старые релизы и ключи подписи сохранены.

## Статусы этапов

| Этап | Статус | Проверенный результат и граница |
|---|---|---|
| 1. Аудит | PARTIAL | 3 репозитория, две ветки приложения; пофайловые хеши/размеры, дубли, GUID/glTF граф и Gradle-входы. Runtime-достижимость всех динамических ресурсов не доказана. |
| 2. Перенос | PARTIAL | 6 уникальных оригиналов / 8 096 382 байта доступны в Assets Release; оригиналы сохранены. Остальной контент не перенесён; лицензии многих групп не подтверждены. |
| 3. Минимальный клиент | PARTIAL | Базовый клиент и оформление сохранены, добавлена мастерская. Каталог прежних классов/рас и legacy-карты ещё не выделены из APK. |
| 4. Мастерская | PARTIAL | Реализованы оба каталога, категории/поиск/подробности, установка/удаление/повтор/прогресс, SHA-256, зависимости/обновления, офлайн-реестр и кеш. Категории без обработчиков явно недоступны. Нативное UI требует QA. |
| 5. AssetBundles | PARTIAL | Доверенный builder Android/Windows, платформенный манифест, SHA-256, кеш и загрузка/освобождение. Бинарные bundles не построены/не опубликованы и не проверены на обеих платформах. |
| 6. Интеграция | PARTIAL | Раса реально участвует в C# создании/статах/сохранении; IDs и версия переживают удаление пакета. Добавлена библиотека примитивов/материалов, размещение и сохранение карты. Нативный рендер/карта не проверены; классы и остальные механики не активируются. |
| 7. Тестовые пакеты | PARTIAL | 3 собственных CC0 JSON опубликованы, URL/размер/SHA-256 и C# цикл установки проверены. 3D-пакет содержит декларативные примитивы, не бинарный AssetBundle. Нет завершённой проверки на устройстве. |
| 8. Оптимизация APK | NOT STARTED | Старый Unity APK измерен; доказанного уменьшения нет. Исходные материалы не удалены ради размера. |
| 9. CI/обновления | PARTIAL | Исправлен устаревший тест published/testing и ошибка скобки в ContentManager; CI-кандидат 1.00.06/code10006, package com.dndvtt.unity. Подпись не менялась. Результат actual build см. ниже. |
| 10. Безопасность/сохранения | PARTIAL | Пользовательские файлы не удаляются. Необязательный contentPackages не заменяет старые поля. Штатный экспорт + предупреждение о сохранении JSON вне приложения. Реальная Android-переустановка не проверена. |
| 11. Отчёт | DONE | Код/коммиты/границы и точный дальнейший прогресс зафиксированы. |

## Реально опубликованные данные

- [Content: каталоги и раса](https://github.com/waitermisanthrope-creator/DnD-VTT-Content/tree/main/packages).
- [Assets: объекты и оформление](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/tree/main/packages).
- [Assets source Release](https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/tag/makehuman-cc0-skins-v1). ZIP **8 091 253 байта**, SHA-256 `6e20613c2288034f618e63ed2a259cb118e8840577ea049abcfa9891f54c1d3d`. Source-only, не runtime bundle.
- Четыре малых файла оригинальной лицензии/атрибуции/материалов также лежат в Git Assets: **11 398 байт**. Они уже входят в число 6 уникальных перенесённых оригиналов, повторно не подсчитываются.
- Три новые demo JSON: **2 636 байт**, учитываются отдельно от переноса существующих файлов.
- Удалено оригинальных файлов: **0**. Все оставшиеся исходники перечислены в [audit.json](audit.json). Материалы с неясными правами не перепубликованы.

## Проверки и APK

- **88 C# проверок PASS**: фактические публичные загрузки передаются файловым lifecycle-тестам; установка, удаление, повторная установка, перезапуск, ошибки SHA/платформы/версии/схемы, зависимости/циклы, реальные характеристики и сохранение героя после удаления расы. Часть 88 проверок — синтаксический анализ Unity C#; он не заменяет native-компиляцию.
- **10 Python CI tests PASS**: подпись/версия/кандидат/шифрование/неподходящие события и запрет продвижения непроверенной сборки.
- Branding, updater, catalog, shared JSON Schema, provenance (44 исходника + CRLF) и git diff --check PASS.
- Реально скачанный Unity **1.00.05 APK: 58 430 834 байта**, SHA-256 `0240d7cf48ce7918779696d3624c5c53e813487bd902e0752004826de6761b23`.
- WebView **74.00.68 APK: 406 344 896 байт** по Release metadata. Это другой клиент/пакет; разницу с Unity нельзя приписывать текущей оптимизации.
- Статические входные Unity-зависимости: 159 файлов / 61 086 974 байта исходников. Это не встроенный сжатый размер. Добавлен настоящий BuildReport в CI для дальнейшего анализа.
- Source Release проверен скачиванием, SHA-256, CRC ZIP и побайтовым сравнением всех исходных файлов; публичные JSON URL/размеры/хеши тоже проверены. [Evidence](public-verification.json).

## Сборка Android

- [CI candidate 1.00.06 / source 8665ab0f](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39504415733). На момент подготовки отчёта выполняется. Предыдущие промежуточные runs отменены новыми коммитами; они не считаются успешными сборками.
- Новый APK: **ещё не подтверждён**. Размер и ссылка добавляются только после успешной сборки/подписи. Старые релизы и опубликованная лента не менялись.

## Что требует устройства и что дальше

1. Дождаться нативной сборки, исправить реальные ошибки, скачать APK и BuildReport; измерить новый APK.
2. На Android проверить холодный офлайн-запуск, оригинальное меню/заставку/настройки, создание и лист, скачивание трёх пакетов, библиотеку объектов/оформления, сохранение карты, перезапуск, удаление и повторную установку пакетов.
3. Перед удалением Android-приложения скопировать экспорт персонажей **во внешнее хранилище**; буфер обмена/внутренняя резервная копия не гарантируют сохранность после удаления. Проверить установку поверх Unity1.00.05 с прежней подписью и отдельный JSON-перенос из WebView.
4. Построить/проверить доверенные AssetBundles на Android/Windows и опубликовать их в Assets Releases; добавить манифесты только после проверки URL/размера/SHA-256.
5. Выполнить пофайловый license clearance перед переносом остального main-контента. Из APK исключать только материалы с проверенной внешней копией и работающим runtime-потребителем. Музыка/арты/произвольные GLB сейчас BLOCKED лицензиями.
6. Завершить обработчики классов/правил и остальных категорий; не включать их кнопки как работающие без настоящих механик. Подтвердить уменьшение APK только измерениями и QA.

Известные ограничения: нет проверки GUI/рендера на устройстве, нет опубликованных бинарных bundles, нет подтверждённого уменьшения APK; большинство старых игровых данных остаётся встроенным/в исходниках. Исторические неподтверждённые механики классов Unity не объявлены завершёнными.

## Непосредственная проверка в Unity Editor (промежуточный source31f83794)

В логе отменённого промежуточного run39503593438 до остановки подтверждены C# compilation и PASS: VTT_SETTINGS_WALLET, VTT_UPDATER_CONTRACT, VTT_FRONTEND_CONTRACT (57 races/35 class records/31 backgrounds и три JS-проекции создания), VTT_SHEET (60 golden cases/402 spells), VTT_SHEET_RECORDS (188 items), VTT_MIGRATION_CONTRACT (9 карт/проверка происхождения), все 3 VTT_BRANDING_ASSET. Сцена ImportedAdventure открыта и началась компиляция шейдеров. Это настоящие Editor-проверки, но этот прогон отменён исправлением кеша/удаления; завершённым APK или device QA он не является. Финальный source8665ab0f проверяется отдельной сборкой.

## Состав старого APK проверен непосредственно

[old-apk-objects.json](old-apk-objects.json) получен чтением сериализованных файлов фактически скачанного Unity1.00.05 APK через UnityPy: 99 Texture2D, 39 Mesh, 13 TextAsset, AudioClip 0. Среди текстур — оригинальное оформление, покрытия, четыре Trim-набора; среди TextAsset — 9 карт и catalog. Это не означает, что все объекты активны в игре. Исходные пути и фактические packed bytes нового APK уточняются BuildReport. [Проверка лицензий](LICENSE_REVIEW.md) включает первичные Quaternius страницы: нельзя переносить ограничения QAL на CC0 автоматически, но нужно установить точное происхождение локальных файлов.

## Успешный промежуточный Android candidate

Source8665ab0f / run39504415733 завершён SUCCESS. Подпись, package/version/ARM64 и zipalign проверены. [Тестовый APK artifact](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39504415733/artifacts/12302494807); SHA-256 APK из runner `f01856e12c116a12fafda7f32ecc125f9dae46f218a0899b21a52b8beacd43a9`. Размер ZIP artifact не является размером APK и не используется для сравнения. Workspace не может скачать File Service URL (HTTP403); необходимые новые измерения выполняются непосредственно на runner и пишутся в публичный лог/артефакт.

Подготовлен следующий проверяемый вариант: Android-only max1024 для 12 prop-текстур, оригинальные PNG и Standalone/branding не изменены; link.xml сохраняет компоненты для CreatePrimitive/AssetBundles, которых может не быть в стартовой сцене. Добавлена реальная Editor-проверка создания renderers/colliders, материалов и размещения/сохранения/восстановления карты при удалении и повторной установке пакета; она ещё должна пройти в Unity. После APK сборки независимо готовится маленький доверенный Android bundle artifact без автоматической публикации в каталог.
