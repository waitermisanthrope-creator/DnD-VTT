# 3D Character Journal — 2026-10-09 / 02 — Morph Bridge

## Цель
Перестать делать отдельный код под каждый body slider. Создан единый bridge, который переносит MakeHuman target displacement на вершины реального human-base-rigged.glb и может использоваться генератором любых morphs.

## Изменения
1. tests/makehuman_morph_bridge.js — общий OBJ/target/GLB parser; правильное декодирование MakeHuman target как X, -storedY, Z; reverse surface mapping через ближайшую точку треугольника и barycentric interpolation; выдаёт Float32Array morph field для GLB.
2. tests/generate_makehuman_glb_morph_fixture.js — создаёт отдельный производный GLB; добавляет POSITION morph accessor к существующей primitive; добавляет имя morph в mesh.extras.targetNames; не изменяет исходный human-base-rigged.glb.
3. tests/makehuman_glb_morph_fixture_audit.js — проверяет morph primitive, POSITION accessor, component type, count и границы BIN.

## Почему это масштабируется
Новый параметр тела не требует нового renderer/loader/алгоритма. Для него будет достаточно target или набора targets + записи в registry с именем, диапазоном и весами. UI будет обращаться к registry.

## Важно
Текущий bridge предназначен для технического fixture. Reverse surface audit показал 70,985/70,985 mapped vertices и 35.07% non-zero для torso-vshape, но surfaceMeanDistance этого метода был 0.4125. Поэтому production-качество деформации ещё не объявляется доказанным.

## Следующее действие
На Termux выполнить генератор:

node tests/generate_makehuman_glb_morph_fixture.js /storage/emulated/0/Download/mpfb2-latest/mpfb/data/3dobjs/base.obj ./human-base-rigged.glb /storage/emulated/0/Download/mpfb2-latest/mpfb/data/targets/torso/torso-vshape-incr.target.gz ./human-base-rigged-morph-test.glb torso-vshape-test

Затем:

node tests/makehuman_glb_morph_fixture_audit.js ./human-base-rigged-morph-test.glb

## Коммиты
- Bridge fix: 68b0d15ef0f6a2ce29615a985f4ea278d899326e
- Generator: 3ddac7cbe829ecaf00ef73e4f8bddb0b387aff49
- Fixture audit: c5c61dd9f9edf37e5b8c63a7234ef3ecbf7701b
- Guide: f1058bead87deed70f910454b268b0c1559c7842
