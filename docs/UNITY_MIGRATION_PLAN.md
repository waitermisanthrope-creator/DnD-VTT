# Unity experiment — 18 октября 2026

Область: только `experiment/unity-vtt`, изолированный проект `unity/`. Это исследовательская ветка по прямому поручению владельца, а не изменение очереди Issue #9. `main`, `.github/workflows/`, ключ подписи Android и существующий релиз не изменяются. Не переносить экспериментальные изменения в main автоматически.

## Проверенное окружение

- Чистая экспериментальная ветка, исходный HEAD `4d548ffb`. `git fetch origin main` выполнен без reset/checkout main.
- Editor: `C:\Program Files\Unity\Hub\Editor\6000.3.26f1\Editor\Unity.exe`, версия файла `6000.3.26f1_de8167e7440c`. Batch createProject подтвердил entitlement и завершился кодом 0.
- Установлены `AndroidPlayer` и `windowsstandalonesupport`. Наличие модулей само по себе не доказывает сборку и запуск.
- Версии из локального реестра этого Editor: URP 17.3.0, Input System 1.20.0; зависимости закреплены в Packages. Политику обновления пакетов см. [Unity Package Manager](https://docs.unity3d.com/6000.3/Documentation/Manual/upm-ui-quick.html).
- Git и Node доступны в bundled runtime Codex, хотя отсутствовали в PATH shell. Секреты/учётные файлы не копировались.

## Исходная архитектура и последствия переноса

| Область | Существующий источник | Требование к C# |
|---|---|---|
| Лист и состояние | `app/app.js`: `currentChar`, `allCharacters`, schemaVersion=3, alias `window.currentCharacter` | Один CharacterRepository; представление сцены не создаёт второй профиль |
| Хранилище | `dnd_multi_characters_v2`; JSON-массив, облачный reader также понимает обёртку `.characters`; экспорт профиля из UI | Импортировать экспорт, сохранять исходный JSON и все неизвестные поля; не сводить профиль к нескольким полям JsonUtility |
| HP и ресурсы | `hpCurrent/hpMax/hpTemp`, legacy HP; `resources`, `classFeaturesState`, spell slots | Адаптер чтения старых вариантов, явные версии миграций, сравнение семантики; не глобальная замена имён |
| Правила | `rulesEngine.js`, `combat_engine.js`, `combat_abilities.js`, `gameplay_core_v57.js`, class/content packs | Детерминированная C# domain-библиотека без MonoBehaviour; перенос правилами и общими JSON-fixtures; управляемый RNG, транзакционные расходы |
| Бой | `encounters`, `initiativeTracker`, `turnResources`, concentration; `battle_board.js`: `.battlefield`, 5 ft/клетка, диагональ 5/10 | Разделять realtime exploration controller и пошаговое расходование скорости; Unity physics не источник правил дальности |
| Классы | Предсказатель 76/78; Mage/Devil и подклассы остаются частичными по compact checkpoint | Не считать порт завершением исходных механик; сохранять pending/effect/source IDs, ledger, время эффектов |
| Облако | `cloud_sync.js`, `cloud_account.js`, `supabase/migrations/202610130001_characters.sql`: RLS owner, revision, expected revision, operation ID, journal, tombstones/conflicts | Повторить протокол, идемпотентность и account isolation; токен в OS secure storage. Никакого service-role ключа в клиенте |
| Карта | `3dmap/map_model.js`: ключ `dnd_vtt_3dmap_v2`, version=2/schemaVersion=1; floors(id,height,tiles,walls,objects,zones), tokens, library/assets | Отдельный MapDocument и scene presenter; сохранить стабильные IDs, ориентацию/масштаб и этажность |
| Геометрия и gameplay | `map_world.js`: wall segments/doors/windows/secrets, visibility/fog, loot с rollback; `stair_navigation.js`, `map_editor.js`: камеры/джойстик; `map_renderer_3d.js`: собственный WebGL | Physics colliders + проверяемые правила LOS, дверей, лестниц, скрытых данных; не заменять сетевой контроль локальной коллизией |
| Персонаж/ассеты | `character_system.js`, geometry/clothing/pose/editor, `gltf_loader.js`, `gltf_character_pipeline.js`, `gltf_catalog.js`; appearance store привязан к account/character | Сначала лицензии/инвентаризация GLB, затем импорт/URP materials, rig/animation; JS procedural geometry требует отдельного переноса, не копирования скриптов |
| Сеть | `network_gameplay.js` поверх `network_engine.js`: master authoritative intents, turn/action/slot validation, reconnect, eventSeq | Транспорт отделить от command protocol; повторная доставка, права мастера, snapshot/reconnect; не доверять клиентскому transform |
| Платформы | `android/`: WebView с web-assets; `desktop/` и root package.json: Electron | Unity — один общий C# клиент для двух целей. Существующий OTA web-assets не обновляет Unity player |

## Этапы и критерии выхода

1. **Изолированный вертикальный срез (текущий).** Сохранённая URP-сцена, CharacterController, земля/стена/ступени, WASD/мышь, прыжок, камеры первого/третьего лица, защита камеры от стен, touch controls. Компиляция Editor, реальная dev Windows-сборка, runtime smoke. Android dev APK отдельно, затем физический touch/FPS QA. Никаких пользовательских сохранений на этом этапе.
2. **Контракты и импорт только для чтения.** Golden fixtures из существующих tests и обезличенных экспортов, schema v3 + legacy, array/wrapper, IDs/неизвестные поля/внешность/вложенный инвентарь/pending Tarot. Импорт → экспорт без потерь, резервная копия оригинала, отклонение повреждённых/будущих несовместимых версий. Только после этого запись в отдельное experimental persistentDataPath; не трогать WebView/Electron localStorage.
3. **Карта v2.** Импорт одной существующей тестовой карты; клетка/метры/футы через явный адаптер. Проверить направление осей WebGL→Unity, winding, этажи (base height — сумма высот), двери/окна/диагональные стены, лестницы/падение, объекты/свет, loot/fog. Затем GLB, PBR/URP, LOD, instancing. Фиксировать ограничения импортёра, не терять неподдерживаемые поля.
4. **Правила C#.** Сначала HP/dice/resistances/conditions/action economy, затем spells/concentration/inventory/rest, потом классы в утверждённой очереди. Параллельный прогон JS и C# на одинаковых входах/RNG. Pending операции, отказ без расхода, повторная доставка, сериализация/возобновление обязательны. Не переносить DOM UI в domain layer.

   Для каждого перенесённого набора правил фиксировать исходный JS commit SHA и общий набор fixtures: развитие текущей игры продолжается, поэтому совпадение с одним старым снимком не доказывает актуальный паритет. Пока C# не проходит эти сценарии, существующий JS-клиент остаётся рабочей реализацией. Не поддерживать две несовместимые схемы данных под одним номером версии.
5. **Лист + сцена.** UI Toolkit presenters над тем же CharacterRepository; события домена меняют модель/лист/токен. Внешность и экипировка через IDs. Проверить два профиля, переключение аккаунта, смерть/бессознательность, полёт/телепорт/формы.
6. **Облако и партия.** Изолированная тестовая среда, тот же RPC revision/operation-id, offline queue, conflict UI, tombstones. Master authoritative intents, replay/reconnect/permissions и скрытая информация. Живое облако только с тестовыми профилями; мок-тест не объявлять live QA.
7. **Масштаб и выпуск.** Chunk streaming (signed coordinates, floor для отрицательных), AOI/LOD/occlusion, профиль GPU/CPU/памяти. Выбрать минимальный Android-девайс вместе с владельцем, предварительный бюджет 30 FPS Android / 60 FPS Windows с измерением p95 frame time. Android ARM64 IL2CPP, Windows x64. Экспериментальный app ID и отдельный debug APK предотвращают перезапись текущего приложения.

Релизный переход требует отдельного решения владельца: совместимость обновления текущего Android package/signing key, перенос данных из WebView sandbox, backup/rollback, переход с web OTA на Unity player/content versioning. В этой ветке существующий unified-release не меняется и публикации нет.

## Риски и данные от владельца

- Нужны обезличенные экспорты реальных старых профилей/карт для проверки миграции (включая незавершённый бой/Tarot), без токенов доступа.
- Нужны целевой Android-девайс/минимальная производительность, тестирование touch/camera и подтверждение масштаба exploration относительно клетки 5 ft.
- Художественный стандарт, лицензии ассетов, rig/анимация и объём многопользовательского мира требуют самостоятельных acceptance checkpoints.
- Этот срез — капсула в тестовой комнате, не порт всей игры и не импорт существующей карты. Проверки и фактические ограничения см. `unity/VALIDATION.md`.
