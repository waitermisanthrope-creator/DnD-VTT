# V74.00.16 — женская модель, этап 3/3 — 2026-10-09

## Реализация и доставка
- Этап 1: рецепт female-minus-exported-body и общий composite morph builder.
- Этап 2: geometry preset, выбор «Форма тела → Мужчина / Женщина», сохранение
  sliders/ID/кожи, reset без смены выбранной формы, независимые текстуры.
- Этап 3: перенос GLB, версия/cache-busters, полный регресс, физический ZIP и CI.
- Пользователь разрешил автоматическую запись проверенного GLB в тестовую ветку,
  затем поручил третий этап. Workflow run `37940431446` успешно выполнил генерацию,
  SHA256 и профильные тесты; GLB сохранён ботом в коммите
  `6b7fe736218f4b3fef46cfb28355ea8bc2656027` ветки female-model-stage2.
- Этот binary blob без повторной передачи/изменения включён в основной релиз.
  Git blob SHA: `0b1acc2524f2ad81f89e31526c3ba6ff11978645`.
- human-body-morphs.glb: 12 671 780 bytes, 9 targets, 70 985 вершин, 53 joints.
  SHA256: `3628ff521db93f28a12f7e68bf59961dc48d7a2c1a3d0e82b661dafb9131120b`.
  Original human-base-rigged.glb, его атрибуты/rig/UV и восемь прежних targets
  сохранены. Источник MPFB/CC0 и исходные hashes — checkpoints этапа 1.
- Android versionName/versionCode: **74.00.16 / 7400016**.
- Cache-busters всех четырёх character/GLTF scripts обновлены в index.html.
  URL body GLB получил `?v=74.00.16`, чтобы WebView не использовал прежний asset.
  Реальный asset-test корректно отделяет query от пути при локальном чтении.
- Android debug CI дополнен gender-recipe regression; release CI теперь также
  проверяет character foundation, real morph asset, editor, skin/morph и recipe.
- В main перенесён результат задачи, а workflow сборки тестовой ветки остаётся
  в female-model-stage2; новые права автоматизации основной ветке не добавляются.

## Проверки до публикации
- Полный runner: **PASS=85 FAIL=6 LEGACY=12**. Новых падений задачи не найдено.
  Остались прежние pugilist_runtime_test.js, test_v716_fixes.js,
  test_v731_fixes.js, test_v732_fixes.js, test_v733_logic_audit.js,
  test_v754_update_manager.js (старый app/update_manager.js отсутствует).
  Полный регресс НЕ полностью зелёный, эти ошибки не объявлять исправленными.
- Синтаксис всех **217 production JS** — PASS; изменённые workflow YAML и diff-check — PASS.
- Настоящие assets: 9 targets; оба пола; четыре signed axes на -1/0/+1;
  finite coordinates, exact reset, повторное применение, UV seams, неизменность
  base/indices/nodes/skin/восьми старых targets — PASS.
- UI/runtime: переключатель отправляет женскую дельту в WebGL vertex buffer,
  male toggle возвращает исходный buffer, сохраняются body/skin/ID; reset,
  повторное открытие, serialization, missing-target error, texture/UV/context и
  async checks — PASS.
- Skin assets и оригинальный GLB audit — PASS.
- CPU reference raster: front/side обоих полов, нейтральные и совместные крайние
  положения четырёх signed axes (все -1 и все +1). Женская форма и кожа согласованы,
  крупных видимых разрывов/переноса morph в неверную область не найдено.
  Это reference/CPU QA, не физический Android/WebGL QA.
- Физический OTA ZIP: **599 файлов**, 200 901 950 bytes; CRC всех файлов, точный
  набор путей, размеры и SHA256 каждого распакованного файла — PASS.
  SHA256 архива: `ca2ea7663b20a26a312ddb8653e4426f17b5f497272bad68f4d61f58d4e94b14`.
  Этот ZIP — проверочный пакет из кандидата релиза, не обещанный отдельный APK.

## Статус публикации — подтверждено
- Релиз main: `b9f3f1c7cb9559c6c72449b8b832f47e2b4b02b4`.
- Refresh in-app update manifest run `37941444696` — success.
  Live `updates/stable.json`: **74.00.16**, **599 файлов**. Весь массив files
  точно совпадает с проверенным ZIP-манифестом: все пути, bytes и SHA256.
- [Android debug run 37941444704](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/37941444704) — success;
  artifact `dnd-vtt-debug-apk`, 309990926 bytes, не просрочен.
- [Signed release run 37941444999](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/37941444999) — success;
  artifact `dnd-vtt-release-apk`, 309017253 bytes, не просрочен.
  Эти размеры относятся к Actions artifacts, а не к отдельным APK.
- Pages run `37941444663` — success.
- Три этапа реализации/доставки закончены. Физическое Android/WebGL QA ещё
  не выполнено; следующая проверка — на телефоне после OTA V74.00.16.

## Физический тест на телефоне
Обновиться через OTA до **V74.00.16**, открыть «3D-персонаж»:
1. «Форма тела»: Мужчина → Женщина → Мужчина; меняется геометрия, не только кожа.
2. Для женщины выбрать «Женская кожа». Кожа самостоятельна и при смене пола
   автоматически не меняется. Новый createCharacter(gender=female) без skinId
   по умолчанию получает женскую кожу.
3. Проверить плечи/грудь/талию/бёдра по отдельности на -1/0/+1, затем вместе.
4. «Сбросить параметры» возвращает нейтральное телосложение выбранного пола,
   сохраняя ID/пол/кожу; экипировка сбрасывается.
5. Повернуть модель пальцем, закрыть/повторно открыть сохранённое состояние.
6. Если форма не меняется, проверить версию и сообщение «Женская форма недоступна
   в этой модели»; это признак старого/неполного GLB, не успех подключения.

## Оставшееся вне этой задачи
Риг/bind pose пока общие и не перенастроены для женской анатомии. Анимации,
реальная skinned-броня и fitting её skeleton/body channels требуют отдельного QA.
Учебный нагрудник ещё не является настоящей 3D-бронёй. Другие семь body axes
остаются процедурными, не полным MakeHuman macro editor.
