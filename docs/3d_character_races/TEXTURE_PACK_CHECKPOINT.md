# Расовые текстуры — контрольная точка 2026-10-12

## Подтверждённая база
main e042b69c: собственные кисти/стопы 12 рас. Сохранённая рабочая копия прежнего чата найдена в /workspace/scratch/353dc0162734/project; незакоммиченные изменения относятся к меху, не пакету bitmap-карт. Не переносить их поверх main автоматически.

Предыдущий чат сообщил о 31 карте 1254×1254 и 7 WebGL-проверках. В main, доступных ветках и сохранившихся рабочих файлах эти карты и результаты не обнаружены. Поэтому пакет и исправление масштаба/утечки НЕ считаются завершёнными.

## Последовательные этапы
1. Восстановление: git main и ветки проверены; пакет не найден. DONE.
2. Рептилии: bitmap-карта подключена и проверена. DONE (d092cb22).
3. Мех и перья: bitmap-карты подключены, проверки ниже. DONE.
4. Складчатая кожа/панцирь/металл/особые формы: отдельно по группам. TODO.
5. Регресс: отсутствие расового материала на одежде/оружии/ареале, смена рас, save/reopen, WebGL. TODO.

## Правила продолжения
После каждого этапа: конкретные пути, SHA256 карт, выполненные команды/результаты, ограничения и следующий шаг; commit [skip ci]. Не объявлять 2K/фотореализм/бесшовность без проверки. Не выпускать OTA/APK в рамках восстановления текстур. Не повторять выполненные этапы; не менять классы/карты.


## Этап 1 — рептильная bitmap-кожа подключена (2026-10-12)
- Восстановлены сохранённый PNG-кандидат и незакоммиченная интеграция. Новая карта сохраняется в app/assets/3d/race_surfaces/reptile-scales-v1.webp: 1254×1254, 730360 bytes, WebP quality 92. Это albedo/detail; не 2K и не полный PBR.
- Отдельный texture unit 1, трипланарная зеркальная раскладка с 12 повторами на высоту тела; пригодна для NPOT/WebGL1. Старый крупный процедурный рисунок отключается после загрузки bitmap, остаётся fallback до загрузки.
- Карта применяется при skinSurface=reptile только к базовой коже, reptileSkin, рептильным кистям/стопам и хвосту. Каждый draw сбрасывает uniform; одежда, броня, customColor исключены.
- Реальный Chromium/SwiftShader WebGL: 4 расы × 2 пола, загрузка карты, тело/кисти, исключение глаз/зубов/когтей и посторонних материалов, skinDetail=0 и возврат к человеку — PASS. Скриншоты тела и кистей просмотрены; узор уменьшен после визуального QA.
- character_reptile_heads_test, character_native_limbs_test (72 cases), character_3d_editor_test, syntax/diff-check — PASS.
- Проверка WebGL использует tools/check_reptile_surface_browser.js; физический Android не проверен. Релиз/APK/OTA не выпускались.
- Следующий этап: отдельная карта меха и согласование с существующими fur shells; далее перья и особая кожа. Пакет 31 карты не восстановлен и не объявляется готовым.


## Этап 2 — bitmap-подшёрсток меховых рас (2026-10-12)
- app/assets/3d/race_surfaces/mammal-underfur-v1.webp: 1254×1254, 544064 bytes; SHA256 10cfed5753f0b37e23d3b3375fbb1d003b0b3fd372656d35f302215b67f7c295. Imagegen built-in, WebP quality 92 без изменения разрешения. Не 2K, не комплект normal/roughness/PBR.
- Prompt: square orthographic dense short mammalian underfur, fine predominantly vertical fibers, neutral gray taupe monochrome, flat diffuse lighting, edge-to-edge repeat requested, no animal/skin/body/text/shadows. Requested 2048²; actual 1254².
- Подключение: app/3dmap/character_editor_3d.js, прежний отдельный texture unit 1; материал fur/reptile выбирается и обнуляется для каждой части. Для меха зеркальная трипланарная раскладка 3 повтора на высоту, боковая проекция сохраняет вертикальное направление волосков. Цвет задаётся прежними furColor/body/face настройками.
- Подшёрсток работает на существующих furShell; реальные guard-hair ribbons и перфорация оболочек сохранены. Для coat/shaggy с полным покрытием добавлена карта базовой кожи и кошачьих/заячьих/бычьих голов, кошачьих/заячьих кистей/стоп, подходящих ушей/хвоста. Голое лицо хадози, глаза, носы/рот, зубы, когти, подушечки, копыта и рога исключены. Центральное гуманоидное лицо и внутренняя поверхность уха защищены shader mask.
- Шифтер: только готовые участки оболочек, без bitmap на всём торсе. Сатир: только готовые оболочки ног и меховые детали. Полурослики: прежние отдельные волоски на стопах, bitmap на коже не добавлен.
- tools/check_fur_surface_browser.js: реальный Chromium/SwiftShader WebGL — 9 рас × 2 пола (18 случаев): tabaxi, harengon, bugbear, hadozee, minotaur, shifter, satyr, halfling_lightfoot, halfling_stout. PASS. Последние две — регресс сохранения волосков стоп. Проверены active material, отсутствие утечек, GL errors и просмотр кадров.
- Управление: density .2 против .75 меняет число реальных волосков; length .9 и color #eeeeee сохраняются; density=0, amount=0, profile=none, skinDetail=0 выключают bitmap. Save/reopen сохраняет полное состояние и повторно загружает карту. Одежда/кираса/оружие и реально отрисованный ареал — без утечек. Возврат к человеку — чистый.
- character_fur_test.js PASS: 18 race/form cases, density variation, finite indexed shells/cards, feet only, off, hidden skin, boots, saved state/legacy; max vertices per mesh 60000. character_3d_editor_test.js, syntax/diff-check PASS.
- Визуально просмотрены табакси, хадози, сатир и шифтер. Ограничение существующей геометрии: границы меховых участков у шифтера и переходы воротника местами угловатые; bitmap это не исправляет. Бесшовность на всех направлениях и физический Android performance не заявляются. Новых слоёв/вершин не добавлено; bitmap даёт 3 дополнительных texture samples на фрагмент только выбранных частей.
- Следующий этап: отдельная карта перьев и проверка кенку/совлинов/ааракокр. Релиз/APK/OTA не выпускались.

- Финальный проход после защиты внутренней поверхности уха: WebGL табакси × 2 пола плюс controls/save/reopen/ареал PASS; регресс рептилий × 4 расы × 2 пола PASS.


## Этап 3 — покровные и маховые перья (2026-10-12)
- app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp — 1254×1254, 510226 bytes, SHA256 1d0c4f0e98a5d45f2b2ed7a39df0c418d9a0f116f78e8aae6fe7bec924e8843d.
- app/assets/3d/race_surfaces/flight-feather-vane-v1.webp — 1254×1254, 555662 bytes, SHA256 6ce6390442d097d264f1d40588a46586a1a654af05dbed54f45f4b1b8b66ec48.
- Обе карты: built-in Imagegen; requested 2048², actual 1254²; WebP quality 92 без изменения разрешения. Это albedo/detail, не 2K и не полный PBR.
- app/3dmap/character_editor_3d.js: материал выбирается отдельно для покровных перьев тела/птичьей головы, маховых перьев крыльев/хвоста, плоских перьев головы/ушей и радиального лицевого диска совлина. Используется прежний texture unit 1, uniform сбрасывается для каждой части.
- Покровная карта: трипланарная раскладка 8 повторов на высоту тела; масштаб уменьшен после просмотра. Маховая карта: UV каждого настоящего пера, ось стержня посередине обеих сторон его окружности. Плоское головное оперение — прямые UV. Лицевой диск совлина — 36 радиальных секторов. Старые процедурные рисунки остаются fallback до загрузки bitmap, после загрузки не наслаиваются на новый рисунок.
- Кенку сохраняет отсутствие крыльев. Совлин/ааракокра сохраняют текущие крылья, хвост, клюв и оперение головы. Клювы, глаза, когти, собственные чешуйчатые птичьи кисти/стопы, одежда, броня, оружие и customColor исключены из карт перьев. Добавлена защита глаз UV основного тела при bitmap-картах.
- tools/check_feather_surface_browser.js: первый реальный Chromium/SwiftShader проход 3 расы × 2 пола (6 случаев) PASS. Проверены покровная/маховая карты, голова/тело/крылья/хвост, отсутствие bitmap на клювах/глазах/птичьих конечностях, изменение цвета/размера крыла с изменением canvas pixels, skinDetail=0 и skinSurface=none, wing/tail size=0, save/reopen полного состояния, реальные одежда/кираса/оружие/ареал, возврат к человеку, отсутствие GL/page errors.
- Финальная раскладка после визуального QA: более мелкое тело и радиальный совиный диск. После паузы браузер восстановлен отдельно; карты и код повторно не генерировались.
- character_avian_elephant_heads_test.js PASS: 4 profiles × 2 forms × 3 muzzle positions, native heads/beaks/disc/plumage, finite indexed geometry, masked human head, legacy migration; max mesh vertices 15401. character_3d_editor_test.js, syntax/diff-check PASS. Регресс WebGL чешуи: 4 расы × 2 пола PASS.
- Просмотрены контрольные кадры совлина, кенку, ааракокры (включая спину и оба крыла). Ограничения: прежние геометрические переходы воротника и отдельные жёсткие края головного оперения требуют отдельной доводки; полёт/анимация крыльев этим этапом не добавлены. Бесшовность на всех направлениях и физический Android performance не заявляются.
- Новые вершины/слои не добавлены. Покровная карта использует три sample на выбранный фрагмент; отдельные перья и лицевой диск — один sample. Общий размер двух WebP 1065888 bytes.
- Следующий этап: складчатая кожа (локсодон), затем панцирь/пластины и особые поверхности. Не повторять чешую, мех и перья. Релиз/APK/OTA не выпускались.

### Промпты генерации перьев
Contour: square orthographic close-up of dense short overlapping contour feathers, neutral mid-gray monochrome, fine barbs and slender shafts, staggered rounded tips, downward growth, flat diffuse lighting, seamless edges requested, edge-to-edge, no animal/body/skin/scene/text/border/watermark, requested 2048².
Vane: full-frame square swatch of ONE flight feather vane, straight central vertical rachis at x=50%, dense symmetric diagonal barbs extending to all edges, neutral mid-gray, flat diffuse light, no outer silhouette/taper/quill/empty background/transparency/bird/text/border, requested 2048². Mapped geometry supplies feather silhouette.

### Финальное подтверждение этапа перьев
После восстановления Chromium 153 выполнен полный повторный WebGL проход финального кода: FEATHER_SURFACE_BROWSER_OK 6 race/form cases, color/size/off/save/reopen, equipment/diorama isolation, human recovery — PASS. FUR_SURFACE_BROWSER_OK 2 tabaxi forms + все controls/save/reopen/isolation — PASS. Регресс рептилий 8 forms ранее выполнен на той же финальной версии shader — PASS. Финальные node syntax/character_3d_editor_test и git diff --check PASS. Код/обе WebP/QA script/журнал сохраняются одним commit [skip ci]. Результаты не означают проверку физического Android или окончательное устранение прежних геометрических переходов.
