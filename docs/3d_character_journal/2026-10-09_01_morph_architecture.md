# 3D Character Journal — 2026-10-09 / 01

## Этап
Переход от проверки одного MakeHuman target к универсальной системе морфов.

## Главное решение
Не делать отдельный ручной пайплайн для каждого ползунка. Один раз строим универсальный мост:

MakeHuman target(s) → декодер target → surface/barycentric mapping → GLB morph target → единый morph registry → UI-ползунки.

После этого новые параметры тела должны подключаться данными (имя target/набор target'ов, диапазон, группа, противоположный target), а не копированием нового renderer/loader/алгоритма.

## Текущая опорная модель
- human-base-rigged.glb: 70 985 вершин, 53 joints, 1 skinned primitive.
- В GLB исходно нет morph targets.
- hm08 MakeHuman base: 19 158 вершин; прямое индексное соответствие отсутствует.
- Reverse surface transfer сопоставил 70 985/70 985 GLB-вершин без misses.
- Тестовый torso-vshape target дал ненулевое поле на 24 896 GLB-вершинах (35,07%).
- Это разрешает переход к тестовому morph fixture, но ещё не доказывает production-качество геометрического переноса.

## Архитектурное правило
Новые body sliders НЕ должны требовать новых JS-renderer'ов, новых GLTF loader'ов или ручного переписывания mesh deformation. Они должны проходить через один общий Morph Bridge/Registry.

## Следующее действие
Создать генератор тестового GLB morph fixture и отдельную проверку accessor/runtime. Исходный human-base-rigged.glb не изменять.

## Контекст для нового чата
Если чат оборвётся, продолжать с этого журнала: сначала проверить последний commit и файлы этого каталога, затем продолжать с тестового morph fixture.