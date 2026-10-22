# DnD-VTT — инструкции для Codex и других ИИ

> **ДОЛГОСРОЧНАЯ ИНИЦИАТИВА MMO — WAIT_TEAM (22.10.2026):** владелец утвердил видение двухрежимной платформы VTT + MMORPG, но **запретил начинать реализацию MMO до формирования полноценной команды разных специалистов и отдельной команды владельца на старт**. Источник истины для этого будущего направления: `docs/roadmap/DUAL_MODE_MMO_MASTER_PLAN.md` и три связанные спецификации; краткая памятка — `MMORPG_FUTURE_PLAN.txt`. **Не менять текущую очередь VTT**, SQL, сетевой стек, оплаты, приложения или GitHub Actions лишь на основании этих документов. Самостоятельная публикация модов доверенными администраторами не отменяет этого ограничения на запуск MMO.

> **Для нового разработчика дополнений и его ChatGPT:** начни с `MODDING_START_HERE.md`. В соседних репозиториях `DnD-VTT-Content` и `DnD-VTT-Assets` лежат полные атласы всех файлов (`docs/FILE_ATLAS.md`) и руководство автора (`DnD-VTT-Content/docs/MOD_AUTHOR_GUIDE.md`). Моды живут в каталогах Content v3 / Assets v5 (Unity1.00.24+; v4 сохранён для старых клиентов) и обычно не требуют пересборки Unity. Доверенные администраторы с GitHub write могут публиковать дополнения самостоятельно; не придумывать обязательное согласование. Прежде чем менять Unity-код ради мода, проверить поддерживаемые декларативные форматы.

> Для будущих ограничений Free/Premium, прав Homebrew/DLC, хостинга мастера и публикации RuStore см. `docs/PRODUCT_ACCESS_AND_MONETIZATION.md`. В бета-тесте весь доступ остаётся бесплатным. Эти правила пока не реализованы и не заменяют приоритеты Issue #9.\n\n## Compact session startup (owner instruction 2026-10-16)

Read AI_NEXT_TASK.md, AI_PROGRESS.md and AI_BLOCKERS.md first; inspect status/history and fetch main without reset. Read only relevant atlas/guide sections, not the full historical guides. Issue #9 is the live ordered queue: Tarot class first, then other classes. Owner authorizes ordinary verified commits/pushes to main and gated releases; historical no-push/no-release instructions are superseded. Never force-push, discard unavailable work, or claim recovery/builds/tests without evidence. Update compact state after each stage; preserve old names/state contracts. No paid API execution without explicit owner authorization. Existing unified workflow owns both-platform stable release; keep Android signing key and rollback. Do not mark a partial class complete.

Область действия: весь репозиторий. Прежде чем писать/удалять/переименовывать файл или поле,
открой `PROJECT_ATLAS.md` (полный список всех файлов + статический реестр имён),
`00_AI_PROJECT_GUIDE.md` (технический контекст) и `01_plansforproject.md`
(утверждённый порядок задач, статусы выполнения). План задач не переставлять.

## Порядок работы

1. По атласу найти существующий модуль, затем открыть исходник, импорты,
   места вызова и тесты. Не заводить новый модуль с той же ответственностью.
2. По символьному реестру найти имена, синонимы и их контракты. Реестр создан
   статическим сканером: он НЕ гарантирует полноту runtime-имён и не заменяет grep.
3. Состояние текущего персонажа: `currentChar` (`app/app.js`).
   `window.currentCharacter` — алиас совместимости, а не отдельный store.
4. Предпочтительные новые поля здоровья: `hpCurrent`, `hpMax`, `hpTemp`.
   `hp`, `hp.current`, `hitPoints`, `currentHP`, `maxHp`, `tempHp` могут быть
   унаследованными форматами. Не выполнять слепую глобальную замену.
   Для миграции обеспечить чтение старых сохранений, адаптеры и тесты.
5. Ресурсы и механики классов — `currentChar.resources` и
   `currentChar.classFeaturesState`; боевые данные — `currentChar.encounters`
   и `currentChar.initiativeTracker`. Не создавать параллельных структур.
6. Сохранение/облако: проверить `app/app.js`, `app/cloud_sync.js`,
   `app/cloud_account.js`, Supabase migrations и ключ
   `dnd_multi_characters_v2` до изменения формата/авторизации.
7. Для Android/Windows использовать существующие `android/`, `desktop/`
   и `.github/workflows/unified-release.yml`; не дублировать игру по платформам.
8. После правок запускать подходящие тесты. Если меняется сборка или контракт
   сериализации — проверить оба клиента; не утверждать, что тесты прошли,
   если они не запускались.
9. Индекс обновляется командой `node tools/generate_project_atlas.cjs`.
   Изменения в `PROJECT_ATLAS.md` и `PROJECT_ATLAS.txt` коммитить вместе;
   GitHub Action тоже пересобирает атласы на main.
10. Не удалять похожие ассеты, файлы или поля по одному названию. Проверять
    содержимое, ссылки, обратную совместимость и реальные дубли.

При конфликте между описанием в атласе и исходниками источником истины
является текущий код; исправь атлас генератором и опиши вывод в коммите.
