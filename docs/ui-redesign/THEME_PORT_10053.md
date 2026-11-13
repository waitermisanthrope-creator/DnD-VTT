# Перенос готовой системы тем на 1.00.53

- Актуальный исходный коммит: `08bdf971da5cfe81927bf6fb5362360c8099bbf0`, получен повторным fetch `experiment/unity-vtt`; `updates/unity-experiment.json` содержит version `1.00.53`, code `10053`.
- Источник функциональности: `6980bfbd3316b39d4171909989a5b340f038f8c6`.
- Рабочая ветка: `experiment/ui-theme-10053`; основана непосредственно на актуальном исходном коммите, без merge старой ветки.

Перенесены существующие шесть пресетов, собственный HEX, безопасная нормализация/контраст, отдельное немедленное сохранение акцента, сброс и роли стилей. Новые возможности и редизайн окон не разрабатывались. Старые общие файлы целиком не переносились.

Интеграция сохраняет актуальные `brandTemplateSkin`, `RequestGuiResourceRestore`, восстановление текстур без разрушения кэшей при resume, генератор `ResetGuiStyleCaches`, текущие размеры/шрифты/срезы. HEX использует обработчик `MenuTextField` версии 1.00.53. Акцент подключён к заголовкам, активным вкладкам, основной кнопке «Лист» и применению HEX. Остальные существующие потребители старого `BrandAccent`, включая вспомогательные действия, оставлены прежними, чтобы произвольный HEX не менял их контраст и поведение. Сохранены `WithDefaults`, состояние рынка, свои расы и блокировка атомарной записи настроек.

## Файлы переноса

В `unity/Assets/Vtt/Runtime/`:
- `ClientPreferences.cs`;
- `LegacySessionPanel.BrandSettings.cs`, `.Branding.cs`, `.Settings.cs`, `.SheetSkin.cs`;
- `LegacySessionPanel.StyleCache.cs` — регенерация только двух новых ссылок на стили;
- новые `UiTheme.cs`, `LegacySessionPanel.Theme.cs` и их исходные `.meta`/GUID.

Проверки: `unity/Assets/Vtt/Editor/BrandingResumeValidation.cs`; в `unity/ci/workshop-tests/` — `ThemeChecks.cs`, `Program.cs`, `WorkshopTests.csproj`; `unity/ci/test_ui_theme_contract.py`.

Исходники кошелька, создания, Homebrew/экстра-классов, свайпов, ремёсел, дайсов, персонажных сохранений, ввод/каретка, сцены, версии, update feed и workflows не менялись относительно исходного коммита. Краткая запись этапа добавлена в три существующих AI-state файла; старые записи не заменены.

## Выполненные проверки

После `source /workspace/cloud-setup/dnd-vtt/env.sh`:
- `dotnet build unity/ci/workshop-tests --no-restore`: SUCCESS, 0 warnings, 0 errors. Это сборка .NET-проверок и включённых независимых C# компонентов, не нативная сборка Unity.
- Режимы существующего `dotnet run --no-build --project unity/ci/workshop-tests -- ...`: `--ui-theme` **95**, `--character-delete` **1777** (включая синтаксис C#), `--creation-picker` **9**, `--text-input` **8**, `--ui-lifecycle` **3**, `--sheet-swipe` **191**, `--numeric-input` **17**, `--wallet-market` **12**, `--market` **553**, `--production` **23**, `--production-packages` **10**, `--production-legacy` **11**, `--dice-loading` **2**, `--container-migration` **13**, `--menu-input` **50** — PASS.
- Тесты темы дополнены только совместимостью переноса с состоянием рынка/своими расами/сбросом версии 1.00.53.
- Python: `test_ui_theme_contract.py`, `test_brand_visual_contract.py`, `test_update_settings_contract.py`, `test_character_preview_contract.py`, `test_content_registry_contract.py`, `test_launcher_aliases.py` (2 tests), `check_sheet_provenance.py` (44 sources) — PASS.
- `git diff --check`, побайтовая сверка ядра темы/метаданных с `6980bfbd` и проверка неизменности защищённых файлов — PASS. Независимое QA-ревью переноса: существенных замечаний нет.

Первый общий workshop-прогон остановился на проверке отсутствующего `dnd.market.fantasy-merchants`: локальный каталог был подготовлен для 1.00.40. Обновлён только внешний тестовый кэш Content v3 (305 записей); JSON-пакеты сверены с размером/SHA-256 каталога, недостающие/изменившиеся скачаны. После обновления `--collections` — **137 PASS**, `--all-collections` — **1026 PASS**. Повторный общий `dotnet run --no-build --project unity/ci/workshop-tests -- /workspace/.cache/dnd-vtt/workshop-registries /workspace/DnD-VTT` — **WORKSHOP_STORE_PASS 11508 checks**, exit 0. Исходники магазина/проверки не менялись.

## Ограничения

Unity Editor локально отсутствует. Попытка доступа к Actions через `gh api repos/waitermisanthrope-creator/DnD-VTT/actions/workflows/unity-experiment-android.yml` завершилась `Forbidden`. Основной candidate workflow разрешает только `experiment/unity-vtt` и требует номер новее активного 10053; изменять workflow/версию или переносить изменения в исходную ветку ради запуска не стали. Нативная компиляция Unity/IL2CPP, расширенный `BrandingResumeValidation.Run`, запуск приложения и физический Android/Windows QA не подтверждены.

Публичного выпуска, изменения main и merge нет. Функциональность восьми вкладок и механики кошелька не переделывались.
