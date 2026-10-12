# Взрослая анатомическая база — прогресс

Дата: 2026-10-12. Задача пользователя: взрослые мужские/женские игровые тела, нейтральная наружная паховая анатомия объёмной геометрией, PBR кожи, модульность, расы, морфы, одежда/анимации и LOD. Не выпускать обновление приложения. Старый план расовых bitmap-поверхностей остаётся приостановленным.

## Точка начала
main 482067ef2979b97214fe1557d7eabc1ebd582d59. Отдельная рабочая копия anatomy-stage. Существующие чешуя/мех/перья не переделываются. Файлы прогресса: этот Markdown и ASSET_AUDIT_2026-10-12.json; воспроизводимый аудит tools/audit_adult_body_assets.py.

## Фактический аудит — этап 0
- Два GLB: human-base-rigged.glb (4994640 bytes, SHA256 7135e03b6259e970458deff3e0458610914d7c35164cae12611101361e4a5749) и app/assets/3d/makehuman/human-body-morphs.glb (12671780 bytes, SHA256 3628ff521db93f28a12f7e68bf59961dc48d7a2c1a3d0e82b661dafb9131120b). Editor/races используют второй GLB; первый — исходник.
- В обоих один primitive: 70985 UV-разделённых вершин, 107024 треугольника, Uint32 indices; POSITION/NORMAL/TEXCOORD_0/JOINTS_0/WEIGHTS_0. Сварка координат на 1e-6: 53514 уникальных точек и 17471 UV-дубликат; один связный компонент, 0 открытых рёбер, 0 неманифолдных рёбер, 0 вырожденных треугольников. Это геометрическая проверка, не медицинская сертификация анатомии.
- Все атрибуты конечные, UV находятся в [0,1]; нет zero-weight вершин; максимальная ошибка суммы весов 1.7881393432617188e-7. Общий skin: 53 кости, 55 nodes, сохранены pelvis/spine/limbs/finger bones/inverse bind matrices.
- Женская форма — human-female target на том же меше/UV/весах. В GLB 9 targets: 8 плечи/грудная клетка/талия/бёдра + female; sidecar editor-morphs добавляет 14 sparse targets (руки, ноги, грудные мышцы, длины конечностей, голова, breastSize): всего 23. Hash/topology проверяются при загрузке. Рост/ширина/мышцы/полнота остаются процедурными.
- Только 2 skin diffuse PNG по 2048×2048, CC0 metadata сохранены. В GLB один базовый материал с metallic=0/roughness≈.32, но gltf_loader передаёт лишь baseColor/alpha/sampler. Shader редактора использует упрощённый diffuse и частные декоративные эффекты. Normal/roughness/AO maps, tangents, согласованного skin PBR и SSS нет. Расовые bitmap-карты не заменяют это.
- В GLB 0 анимационных клипов. Pipeline умеет rest CPU skinning и разбирает metadata/sampler, но нет полного оценщика позы/SLERP/STEP/CUBICSPLINE. Редактор не применяет pose.time/animationId к bone matrices. Процедурные расовые части, одежда и мех создаются по уже деформированной поверхности, собственных JOINTS/WEIGHTS у них нет; анимационная совместимость пока не доказана.
- Настройки одежды выполняют fitting/triangle masks на статической текущей форме; это полезная база, не универсальный движущийся cloth/collision rig. Некоторые открытые/кроеные вещи намеренно noHide.
- Body LOD отсутствует. На WebGL1 без uint32 extension редактор разворачивает 321072 индекса в отдельные вершины: рост bandwidth/памяти. Геометрический LOD нельзя имитировать прореживанием triangles с дырками.
- Нейтральный WebGL обзор мужской/женской формы спереди/сзади выполнен: tools/check_adult_base_browser.js, ADULT_BASE_BROWSER_AUDIT_OK. На кадрах наружная паховая анатомия не представлена полноценной объёмной геометрией; детали кожи и сосков сейчас главным образом diffuse.
- Export macro age=.4600000083, gender=1. Female recipe сохраняет ту же age macro. В source recipe есть child/young basis terms, поскольку MPFB интерполирует возраст. Проверена upstream src/mpfb/data/targets/macrodetails/macro.json на pinned commit d0a32e57a7f915cb2f2b95410e2117648c7bbb7e: child→young интервал .1874999… .49998. Название basis не означает самостоятельную детскую модель. Числовой возраст в годах здесь не вычислялся; новый контракт предназначен только для adult-моделей и не вводит детских вариантов/age slider. Перед новым экспортом закрепить adult preset и происхождение.

## Техническая архитектура
1. Версионированный character.anatomy отдельно от gender, body axes, head/racial fur и race anatomyProfile. Контракт только adult; сохранение неизвестной будущей версии должно завершаться ошибкой, не потерей данных. Смена пола/расы не сбрасывает пользовательские настройки волос. Старые сохранения мигрируют без визуального изменения.
2. Канонический skinned adult-body + morph channels + semantic regions, фиксированная identity вершин. Общий skeleton contract: named bones + inverse bind signature. Модули получают собственные mesh/UV/JOINTS/WEIGHTS, attachment ring и версии. Точки соединения следуют тем же body targets; никакой плоской текстуры вместо наружной анатомии. Female/male наружные модули должны иметь нейтральную resting форму и естественные варианты; внутреннюю анатомию этим заданием не моделируем.
3. Порядок деформации будущего общего pipeline: rest mesh → body/gender/variant morphs → race adaptation (включая rest skeleton/bind correction) → corrective morphs → skinning позой → normals/tangents. Одежда и модули используют тот же порядок. Текущий post-skin spatial warp нельзя объявлять готовым для анимаций.
4. Skin material: baseColor sRGB, normal/roughness/AO linear, metallic=0; neutral lighting и единые UV для мужского/женского atlas. Fold/detail normal и макрогеометрические складки разделены. Явные masks для переходов цвета. Реалистичное освещение добавляется вместе с чтением материалов/shader, а не объявляется по наличию PNG.
5. Regional hair отдельно от шерсти расы. 20 регионов, левая/правая сторона отдельно, enable/density/length/color и глобальная бритость. Реальные hair ribbons, limits/LOD, размещение по bone masks и текущей форме; отдельная последующая привязка к скелету.
6. Race adapters: humanoid, mammalian, reptilian, avian, construct, gel, fungal, nonHumanoid. Человеческая наружная анатомия не копируется автоматически всем существам: нужны определённые species modules. Призраки/паразиты/рои не используют человеческие наружные модули.
7. Clothing: semantic occlusion + модульные collision envelopes + точные fitting probes на morph surface; открытые вещи требуют геометрических coverage masks. Mask/clipping не должны вырезать открытые участки или создавать hair penetration. В дальнейшем garment skin weights и pose-aware corrective fitting.
8. Body LOD0/1/2 с сохранением UV/сваренных швов, bone weights и переносом всех морфов; ориентиры по бюджету — редактор до 45–60k triangles, игровой LOD до 15–25k, дальний до 5–8k (цели, не достигнутые результаты). Отдельные бюджеты волос/модулей/материалов и проверка Android.

## Последовательные проверяемые этапы
- 0 — аудит/архитектура/контрольная точка: DONE.
- 1 — adult state, persistence/migration, regional hair controls и bounded real hair geometry: DONE: реализация, целевые проверки и регресс одежды завершены. Это не готовая паховая геометрия и не PBR.
- 2 — male/female наружные модули: seams/UV/skin weights/варианты, geometry morph sliders и нейтральная визуальная QA. TODO.
- 3 — согласованные PBR loader/shader и skin maps; проверка освещения/полов/UV/цветовых переходов. TODO.
- 4 — общий pose evaluator, animation skinning модулей/волос/одежды; сгибы таза/коленей/плеч и walking/sitting stress cases. TODO.
- 5 — точное coverage/collision/fitting одежды и corrective морфы. TODO.
- 6 — race modules/adapters (каждая группа отдельно), отличные от human/нечеловеческие скелеты отдельно. TODO.
- 7 — физические Body LOD assets/перенос морфов и Android FPS/память. TODO.
- После каждого этапа записывать реальные файлы, проверки, ограничения, следующий шаг; отдельный commit [skip ci]. Не объявлять весь проект завершённым после этапа 1.


## Этап 1 — реализованные файлы и поведение
- app/3dmap/character_anatomy.js: nested version=1/maturity=adult, default legacy hair disabled, bounded normalization, отказ неизвестной версии/не-adult state; external mode/variant пока только данные, descriptor.externalGeometryReady=false. Расы описаны семействами; человеческая региональная волосатость включена только для humanoid/mammalian.
- app/3dmap/character_system.js: миграция/serialize/deserialize anatomy и render descriptor. При смене пола/расы anatomy сохраняется. index.html загружает модуль перед character_system. Отсутствие модуля в legacy harness сохраняет неизвестные данные, не выбрасывает их.
- app/3dmap/character_editor_3d.js: в «Тело → Волосы на теле» 20 отдельных регионов, enabled, density 0–100%, length, color; обе подмышки отдельно. Общая бритость скрывает все региональные волоски с сохранением настроек для восстановления. Есть отдельный reset и три уровня детализации. Сохранение внешности и undo/compare используют общий appearance state.
- app/3dmap/character_body_geometry.js: существующий генератор guard-hair ribbons расширен optional vertexMask/maxStrands для регионов. Это реальные curved meshes, не нарисованные волосы; расовая шерсть работает отдельно. Regional hair не создаёт furShell.
- Бюджеты только дополнительного regional hair: low 300 ribbons (до 3000 triangles), medium 1200 (до 12000), high 2400 (до 24000); распределяются между enabled видимыми регионами. Общий бюджет тела/расового меха пока не решён. Новые parts остаются ниже 65536 vertices.
- Размещение использует skin/bone groups, стороны по world matrix upperarm_l, текущие bounds/нормали; маски кешируются по текущей форме. Подмышки ограничены внутренней/нижней поверхностью, тыльные кисти и верх стоп отделены от ладоней/подошв. Не меняется identity/UV/skin weights исходного GLB.
- Clothing masks и near-cloth margin учитываются генератором. Дополнительные region guards консервативно скрывают волосы под закрывающей регион одеждой: бельё скрывает pubic/buttocks, закрытая верхняя одежда — верхние участки. Для открытых рубашек, вырезов и коротких рукавов пока возможно избыточное скрытие; точная collision/triangle coverage следующего этапа обязательна.
- Найден и исправлен существовавший UI bug: снятие всех вещей очищало DOM customizer, сохраняя box.__item; повторное надевание той же вещи пропускало построение DOM и падало на null.disabled. Теперь empty customizer сбрасывает identity. Проверено надеванием белья обратно на обоих полах после нейтрального обзора.

### Проверки этапа 1
- tests/character_adult_anatomy_test.js: ADULT_ANATOMY_FOUNDATION_OK, 6 gender/extreme body cases; все 20 semantic masks непусты; finite indexed hair; три budgets; обе стороны независимы; shaved/off; underwear coverage; legacy migration/roundtrip/gender/race state preservation; unsupported version/adult guards — PASS.
- tools/check_adult_anatomy_browser.js: ADULT_ANATOMY_BROWSER_OK на финальной маске; оба пола, реальные UI controls, pubic + одна armpit, density/length/color, shaved/restore/reset, underwear hiding, save/reopen, budget, камера не перестраивает geometry/head caches, species guard, реальные WebGL/page errors — PASS.
- character_3d_editor_test.js, character_3d_foundation_test.js, character_appearance_store_test.js — PASS.
- character_fur_test.js: 18 race/forms, прежние shells/cards/feet, saved/legacy/clothing — PASS.
- Финальные syntax/diff-check — PASS. Нейтральные кадры обоих базовых тел и волос просмотрены.

### Незавершённое после этапа 1
Наружные male/female genital modules, новые anatomical volume morphs, PBR normal/roughness/AO, полная pose/animation evaluation и skinning модулей/волос/одежды, точные garment collisions, species-specific anatomy, реальные Body LOD/Android FPS — TODO. Наличие nested anatomy данных не означает готовность этой геометрии. Следующий шаг — skinned male/female attachment patch и нейтральные resting варианты, начиная с проверенных seam anchors на текущих adult morph surfaces. APK/OTA/релиз не выпускались.

### Финальное подтверждение этапа 1
character_clothing_test.js PASS: оба пола, крайние морфы, все fantasy variants, съёмное бельё, fitting waist, DEN/nylon, gloves/capes/dresses/corsets/shirts, save/load и migration. Полный финальный browser проход после уточнения axilla mask PASS; расовый fur regression PASS; state/store/foundation/editor tests и syntax/diff-check PASS. Сохраняются только перечисленные исходники/тесты/прогресс, source GLB и morph binaries не изменены. Этап 2 ещё не начат; не объявлять наличие genital geometry или PBR по этому commit.
