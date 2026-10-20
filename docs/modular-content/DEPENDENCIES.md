# Фактические зависимости и границы упаковки

Аудит выполнен по отслеживаемым файлам двух отдельных checkout. `audit.json` — пофайловый список размеров/SHA-256, граф импортов GUID + внешние URI glTF, входящие ссылки, одинаковые байты внутри каждого дерева и между ветками. Отсутствие статической ссылки не доказывает, что файл не используется динамически.

## WebView/main

`android/app/build.gradle:prepareVttAssets` копирует `index.html`, всё `app/`, корневые PNG/JPG/GLB, MP3 в `ambience/`, PNG/SVG из `wallpapers/`. Эти пути — входы **старого WebView APK**, а не Unity. В текущем checkout `app/assets/3d`: 484 файла / 128 596 140 байт; `app/data`: 96 / 54 736 537 байт; `wallpapers`: 32 / 39 177 394 байта. Сюда входят файлы, которые могут не вызываться интерфейсом, но всё равно копируются Gradle. Для WebView нужно отдельно проверять вычисляемые URL из JavaScript.

Старый package name: `com.dndvtt.pocketvtt`. Unity: `com.dndvtt.unity`. Unity обновляет прежние **Unity** APK с совпадающей подписью, но не устанавливается поверх WebView как обновление того же Android-пакета. Между клиентами нужен штатный JSON экспорт/импорт.

## Unity

`UnityReleaseBuild.Build` явно собирает `Assets/Vtt/Scenes/ImportedAdventure.unity`. Exploration — вспомогательная сцена; наличие в EditorBuildSettings не означает её включение этим конкретным методом.

| Потребитель | Прямые зависимости | Назначение |
|---|---|---|
| ImportedAdventure | LegacyMapPresenter, LegacySessionPanel, ExplorerController, URP | старт, меню, карта, лист |
| Главное меню/заставка/настройки | Resources/Branding/{Wallpaper16,Splash19,Dragon20}, StreamingAssets/Branding/{...} | оригинальное оформление; fallback сохранён после прежнего дефекта Android |
| Создание/лист | Resources/CharacterSheet/catalog.json | офлайн-данные, blueprints, выборы, справочники |
| LegacyMapPresenter | LegacyContent/Catalog.asset | карты, prefab glTF, материалы |
| Catalog.asset → glTF | внешние buffers/images URI | модели + зависимые BIN/PNG; нельзя переносить отдельно только glTF |
| Catalog.asset → материалы | LegacyContent/Materials → Source/*.png | покрытия пола/стен |
| Мастерская | два raw GitHub каталога → проверенные payload | скачивание; офлайн-кеш хранится в persistentDataPath/workshop-v1 |
| Создание с пакетом расы | установленный payload → штатный CharacterCreation | бонусы, описания, raceId, classId, contentPackages версии в JSON героя |
| Библиотека объектов | установленные JSON-примитивы / проверенные AssetBundles | размещение model ID в штатных floor.objects |
| Материалы оформления | установленные color definitions | tile IDs в исходном JSON карты |
| Перезапуск карты | persistentDataPath/workshop-map-v1.json | полный JSON, неизвестные поля не отбрасываются; отсутствующий пакет даёт заменитель |
| Обновление APK | существующий UnityRelease/UpdateProvider + подписанный APK | отдельная опубликованная лента; этим этапом не изменена |

`Resources` и `StreamingAssets` включаются независимо от ссылок сцены; прочие ресурсы включаются по зависимостям сцены/импортера/сборки. Скрипты и сторонние Unity package dependencies не подсчитываются как простая сумма исходных файлов. Корневые `app`, музыка и картинки классов не становятся частью Unity APK автоматически.

Статическое замыкание с внешними glTF URI: 159 файлов / 61 086 974 байта исходных данных на этой контрольной точке. Это **не размер встроенного сжатого контента APK**. Для фактических размеров добавлен `build-report-Android.json` из Unity BuildReport, отдельный CI artifact.

## Дубли и лицензии

Например, Splash19.png совпадает побайтно в main/wallpapers и двух Unity путях (Resources и StreamingAssets). Fallback сейчас необходим для сохранения проверенного механизма оформления; удаление требует отдельной Android-проверки. Копии Quaternius в LegacyContent имеют совпадающие хеши с источниками, однако состав APK определяется только Unity-деревом.

Нельзя считать всю папку Quaternius лицензированной только по имени. Музыка OST/коммерческих авторов, корневые GLB и class artwork не имеют достаточного пофайлового доказательства прав в данном аудите. Их публикация заблокирована лицензиями; они остаются в источнике. В MakeHuman у перенесённых двух skin PNG и двух mhmat есть явное CC0 указание в оригинальных метаданных, сохранены LICENSE/README и авторы. Это не автоматическое разрешение на весь остальной MakeHuman-каталог.

Все шесть уникальных исходных файлов доступны в Assets Release, SHA-256 и ZIP CRC/байты сверены с источником. Их исходные копии оставлены на месте. Исходные текстуры из этого Release ещё не подключены как Unity-пакет; не исключать их аналоги из клиента на основании одной публикации.

Дополнительная непосредственная проверка старого Unity1.00.05 APK: [old-apk-objects.json](old-apk-objects.json) перечисляет сериализованные объекты. Найдены 99 Texture2D, 39 Mesh и 13 TextAsset; AudioClip отсутствуют. Это подтверждает, что корневые MP3 из main не являются звуковыми ресурсами этого Unity APK. Первичная внешняя проверка Quaternius лицензий — [LICENSE_REVIEW.md](LICENSE_REVIEW.md).
