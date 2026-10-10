# Импорт пользовательских 3D-ассетов — очередь партий

Источник: загруженные пользователем файлы от 2026-10-10. Цель — общий каталог редактора, НЕ размещение на картах.

## Проверенные источники

- `Mini-RPG-Bundle Part2.zip`: 36 FBX и 36 Blender-версий тех же вариантов, плюс 5 PNG-текстур. Это 36 кандидатов, а не 72 независимых предмета.
- `Medieval_Inn_Beds.zip`: 1 FBX.
- `furniture.glb`: 6 геометрических объектов в одной GLB-сцене; требуется разбор семантики.
- `medievaltavern.blend`: сцена Blender, пока не конвертирована.

## Партия 01 (10 кандидатов)

Источник: `Mini-RPG-Bundle Part2.zip`, папка `FBX/` (имена проверены по параллельной папке `Blend/`).

1. Bench_Long_V1
2. Bench_Long_V1_Multicolor
3. Bench_Long_V2
4. Bench_Short_V1
5. Bench_Short_V1_Multicolor
6. Bench_Short_V2
7. Chair_V1
8. Chair_V1_Multicolor
9. Chair_V2
10. Chair_V2_Multicolor

**Статус:** список зафиксирован, бинарные модели ещё НЕ загружены в GitHub и НЕ подключены к каталогу. Требуется FBX→GLB, проверка текстур/лицензий, загрузка файлов и регистрация в `app/3dmap/gltf_catalog.js`.

## План

- 36 вариантов Mini-RPG: 4 партии (10 + 10 + 10 + 6).
- 1 набор кроватей: после проверки структуры FBX.
- 6 мешей furniture.glb: после определения пригодных отдельных объектов.
- Сцена таверны: после анализа Blender.

Не считать импорт завершённым до фактической загрузки бинарных GLB и проверки путей в каталоге.

## Фактическая подготовка: GLB-партия F01 (2026-10-10)

Из пользовательского `furniture.glb` программно выделены и повторно открыты 5 отдельных GLB: `table.glb` (6217412 байт), `chair.glb` (4643004), `bed.glb` (5718760), `closet.glb` (6550260), `commode.glb` (4845868). Шестой объект `bookshelf` остаётся для следующей партии. Исходная сцена содержит узлы `table`, `chair`, `bed`, `closet`, `commode`, `bookshelf`.

**Статус F01:** пять бинарных файлов собраны локально в `furniture_batch_01.zip` и проверены через trimesh. В репозиторий **не загружены**: текущий GitHub-коннектор не принимает локальные бинарные файлы непосредственно. Каталог не изменён. Не считать этот этап завершённым импортом.

**Общий охват:** 13 исходных 3D-файлов: `model.glb`, `model (1).glb`, `model (2).glb`, `model (3).glb`, `furniture.glb`, `Mini-RPG-Bundle Part2.zip`, `Medieval_Inn_Beds.zip`, `medv-cafe.zip`, `3D Retro Medieval Fantasy Kit.zip`, `medievaltavern.blend`, `medievalbenchesexport.blend`, `medievalstonestairs.blend`, `bed.fbx`. `DND_VTT_CLASS_FIXES_STAGE_1.patch` не относится к ассетам.

**Следующее действие:** загрузить пять подготовленных GLB в `app/assets/3d/user_furniture/`, проверить доступность путей, затем добавить их в `app/3dmap/gltf_catalog.js`. Не менять карты и не публиковать обновление до завершения импорта.
