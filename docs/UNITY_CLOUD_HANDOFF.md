# Unity 1.00.00 — продолжение с телефона

Current Personal-path run https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39257584398 (source8b9b213f): cloud signing job SUCCESS; license preflight FAILED because UNITY_EMAIL and UNITY_PASSWORD are still absent in unity-ci. Builds/upgrade QA SKIPPED; activation itself not attempted yet. Owner has been asked to enter these2 Secrets directly in GitHub; no serial or paid license required for the next Personal activation attempt. Never ask for password in chat.

## Коррекция лицензирования Personal — текущая попытка 2026-10-19

Предыдущий preflight ошибочно требовал serial. Проверены **исходники опубликованного GameCI CLI v0.1.72**: `dist/platforms/ubuntu/steps/licensing_method.sh` выбирает `personal`, когда заданы `UNITY_EMAIL` + `UNITY_PASSWORD`, а serial/file/server отсутствуют; `activate.sh` активирует новую Personal seat через Unity Licensing Client непосредственно на runner. Домашний `.ulf`, license XML, managed tokens и покупка Pro для этой попытки не нужны. Источник: https://github.com/game-ci/cli/blob/v0.1.72/dist/platforms/ubuntu/steps/activate.sh . Это возможность актуального кода GameCI, а не доказательство успешной активации конкретного аккаунта.

CI preflight исправлен, CLI закреплён на `v0.1.72` в обеих сборках. Локально9 тестов PASS, включая явный тест Personal без serial/ULF. Docker tags `6000.3.26f1-windows-mono-3` и `6000.3.26f1-android-3` существуют в unityci/editor. Для фактического запуска владелец должен добавить **только** `UNITY_EMAIL` и `UNITY_PASSWORD` в Environment `unity-ci` (значения не передавать в чат). Serial необязателен: если когда-нибудь добавлен, GameCI выберет serial-активацию. Статус ниже про отсутствие всех трёх Secrets описывает прежние неуспешные runs и не является текущим требованием купить лицензию.

На момент этой корректировки новые credentials ещё не подтверждены; успешной новой Unity-сборки пока нет. Не отключать MFA/защиту аккаунта ради headless CI. Если Unity потребует подтверждение устройства, согласие с условиями или не выдаст Personal seat, разбирать точный результат runner и необходимые действия владельца. Не повторять старый serial-only блокер после этой правки.

## 2026-10-19 — облачный CI: частично подготовлен, лицензия блокирует сборку

**Итог фактических проверок:** https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39254885215 (source `fcc88fc1`). Signing job SUCCESS:8 тестов на runner, открытие ключа/пароля из Secrets, скачивание APK1.00.00 с проверкой SHA256/пакета/code/ARM64/API26/36/16KB alignment, одноразовая повторная подпись APK тем же private key и проверка подписи. `CLOUD_SIGNING_KEY_PASS` и `CI_KEY_TEMP_CLEANUP_PASS` присутствуют в логе. Это только signing probe существующего APK, **не новая Unity-сборка**. Закрытый ключ и используемый CI пароль больше не зависят от домашнего ПК. Общий run FAILURE: license preflight FAILED; build и Windows upgrade QA SKIPPED. Ссылок на успешные облачные сборки обоих клиентов пока нет, потому что их не было.

Реальная проверка запрета promotion: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39254642699 — `workflow_dispatch`, `publish=false`, заведомо неуспешный candidate. Проверка корректно отказала до скачивания/расшифровки/публикации. Публичный release остался только `unity-v1.00.00`, feed остался1.00.00/code10000. Текущий полный путь проверен частями; положительный cloud build → Windows upgrade → dry-run promotion пока заблокирован лицензией.

Secrets редактируются владельцем здесь: https://github.com/waitermisanthrope-creator/DnD-VTT/settings/environments/24707489420/edit . После внесения поддерживаемой лицензии запуск candidate с телефона подтверждён доступным CLI/API (веточные workflows зарегистрированы); будущую публикацию выполнять только по новой просьбе владельца. Установщики1.00.01 не созданы и не публиковались.

Актуальное состояние этого раздела имеет приоритет над историческими формулировками ниже о ключе «только дома». Владелец отдельно разрешил расшифровку собственного signing-пароля и передачу в защищённые Secrets, запретил копировать Unity authorization files/managed tokens и запретил новый публичный релиз/изменение feed в текущей задаче.

Настроен GitHub Environment **`unity-ci`**, deployment branch policy: только ветка `experiment/unity-vtt`, не tags и не PR. Настроены только эти Secrets (значения нигде не документируются):

- `UNITY_ANDROID_KEYSTORE_BASE64`
- `UNITY_ANDROID_KEYSTORE_PASSWORD`
- `UNITY_CI_ARTIFACT_PASSWORD`

Постоянный RSA signing key сохранён, сертификат локально проверен через ephemeral PKCS12 import: `c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e`. Пароль из DPAPI расшифрован только в памяти и передан `gh secret set` через stdin; незашифрованные временные копии ключа/пароля не создавались, оригиналы `.p12`/`password.dpapi.xml` не удалялись. Скрипт повторной передачи: `unity/ci/transfer-signing-secrets.ps1`; он отказывается генерировать другой ключ. Независимая проверка использования ключа на runner записывается отдельно по фактическому результату, наличие Secrets само по себе её не доказывает.

**Лицензия пока блокирует сборку.** На открытой владельцем странице `https://id.unity.com/ru/subscriptions` показано Unity Personal / «Не активирован»; доступная Pro/Enterprise serial-лицензия не показана. Отсутствуют `UNITY_SERIAL`, `UNITY_EMAIL`, `UNITY_PASSWORD`. [GameCI activation](https://game.ci/docs/github/activation/) описывает Personal через `.ulf` и account credentials, либо Professional через serial и credentials. Копировать домашний `.ulf` запрещено владельцем. Не утверждать, что платная лицензия — единственный возможный вариант: альтернативную поддерживаемую активацию Personal нужно подтвердить с Unity/GameCI; в этом запуске она не настроена и не проверена. Покупки и принятия новых условий не выполнялись. Владелец должен либо предоставить действующую поддерживаемую serial-лицензию в этих трёх Environment Secrets, либо согласовать разрешённый способ активации отдельной CI-лицензии. Локальные файлы Unity не читались/не переносились.

Первый фактический GitHub-hosted запуск: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39254039624 . License preflight FAILED с отсутствующими именами Secrets; оба build/Windows QA job SKIPPED. Signing job обнаружил отсутствующий `sdkmanager` в PATH; путь исправлен на SDK cmdline-tools с проверкой уже установленных build-tools36. Это не успешная Unity-сборка.

### Как продолжать с телефона

1. Открыть исходники в подключённой облачной задаче или [Codespaces для этой ветки](https://github.com/codespaces/new?hide_repo_select=true&repo=1391358518&ref=experiment%2Funity-vtt). `.devcontainer/devcontainer.json` готовит Python3.12, Node22 и gh для редактирования/тестов. Codespace в этой задаче не создавался; проверить квоту/биллинг перед созданием. Unity Editor в контейнер не устанавливается: сборка выполняется на GitHub-hosted runners.
2. После решения лицензии открыть Actions → **Unity cloud private candidate**, выбрать `experiment/unity-vtt`, версия `1.00.01` (code10001); либо `gh workflow run unity-cloud-candidate.yml --ref experiment/unity-vtt -f version=1.00.01`. При недоступности ручного запуска веточного workflow push относящегося к задаче изменения `unity/ci/**` запускает тот же candidate pipeline. Не переносить workflow на main ради кнопки запуска.
3. Pipeline сначала проверяет облачный signing key против реально скачанного публичного APK1.00.00 и лицензионную конфигурацию. Затем existing `UnityReleaseBuild.Windows/Android` собирают оба BuildOptions.None пакета Unity6000.3.26f1. Windows — x64 Mono cross-build на Linux; Android — ARM64 IL2CPP, API26/36, `com.dndvtt.unity`, постоянная подпись. `unity/release.ps1 -Stage Package` адаптирован для NSIS на Linux без смены save identity. Эта cross-build ветка пока НЕ прошла настоящий Unity CI из-за лицензии; возможные toolchain/image ошибки устранять по реальному логу.
4. Обычные artifacts публичного репозитория доступны читателям GitHub, поэтому **plaintext installers не загружаются**. Оба пакета, candidate metadata и SHA256SUMS шифруются AES-256-GCM (PBKDF2-SHA256, случайные salt/nonce), Secret доступен только доверенным jobs. Артефакт `Unity-private-candidate-<run_id>` содержит только `candidate.zip.enc`, хранится7 дней; следующий trusted job расшифровывает его на Windows runner. Не передавать ключ шифрования в logs/outputs/artifacts.
5. Windows QA устанавливает проверенную публичную1.00.00 в изолированный RUNNER_TEMP, запускает runtime smoke с отдельным `--vtt-profile-store`, обновляет до candidate, сверяет каждый установленный файл, проверяет JSON/.bak/неизвестный файл и переустанавливает. Маленький публичный verdict содержит только булевы результаты, SHA/run/version, никаких пользовательских сохранений. Физическая Android-установка и touch QA требуют телефона. Пока license job блокирует downstream, этих новых Windows проверок не было.
6. **Только по новой просьбе владельца выпустить обновление:** workflow **Unity cloud promote verified candidate**, `run_id` успешного candidate, точная `version`, сначала `publish=false`. Проверяется conclusion всего run, source SHA, доверенная ветка/repo/workflow, успешные build/upgrade jobs, подпись/metadata APK и хеши обоих файлов. Только затем запуск с `publish=true` разрешает общий publisher: оба пакета → prerelease → реальные public downloads/SHA256 → feed fast-forward. Существующие stable workflows не менялись. В текущей задаче `publish=true` запрещён и не запускался. Успех старого publisher1.00.00 не заменяет облачный Unity build.

Проверки подготовки: локально8 CI-adapter/promotion tests PASS (включая AES-GCM roundtrip/tamper, запрет PR/main/fork, signer pin и cleanup, version/feed isolation, отказ promotion без actual successful build/QA),6 существующих publisher tests PASS; локальный Unity MigrationContracts после изменения build entry point завершился0 со всеми PASS-маркерами. Это не доказательство успешного CI build. Нельзя писать «ПК можно выключать, облачная сборка обоих клиентов проверена» до зелёного полного pipeline.

## Текст для агента в новой среде — начать отсюда

Продолжай работу владельца над переносом DnD-VTT с WebView на нативный Unity/C#. Репозиторий: https://github.com/waitermisanthrope-creator/DnD-VTT . Работай исключительно в `experiment/unity-vtt`; `main` используй только для чтения исходной реализации. Не меняй существующие релизные workflows, не публикуй релиз без новой просьбы владельца, не выполняй платные API-запуски без разрешения. Не сбрасывай чужие изменения, не делай force-push и массовый commit. Общие исторические разрешения на main не отменяют ограничения этой миграции.

Сначала прочитай `AGENTS.md`, `AI_NEXT_TASK.md`, `AI_PROGRESS.md`, `AI_BLOCKERS.md`, проверь git status/history и fetch без reset. Затем нужные разделы `PROJECT_ATLAS.md`, `00_AI_PROJECT_GUIDE.md`, `01_plansforproject.md`, `docs/UNITY_CHARACTER_SHEET_PARITY.md`, `unity/VALIDATION.md` и этот документ. Исторические фразы «публикация ожидается» ниже актуального delivery checkpoint уже устарели. Не переставляй согласованную очередь Issue #9: внутри классов Tarot первым, затем остальные; очередность подтверди по актуальному issue.

Клонируй репозиторий и выбери экспериментальную ветку обычным checkout/switch. Корень Unity-проекта — `<checkout>/unity`, **не** `unity/dnd-vtt`. Рабочая сцена — `unity/Assets/Vtt/Scenes/ImportedAdventure.unity`. Домашний путь: `C:\Projects\DnD-VTT\unity`. Unity Editor **6000.3.26f1**, URP 17.3, Android ARM64 IL2CPP (min API26, target36), Windows x64. Пустая SampleScene вложенного шаблона не является прототипом. Сохраняй также Exploration.unity.

### Доставлено и проверено

- Публичный предварительный релиз: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.00 . Он не заменяет latest старого клиента.
- Android: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/download/unity-v1.00.00/DnD-VTT-Unity-1.00.00-arm64.apk . 48 186 137 байт; SHA256 `21299f36b6a23ee79e41dc754f133c92f51bdf42faf8e41f11a05fbb5796fd2e`.
- Windows: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/download/unity-v1.00.00/DnD-VTT-Unity-Setup-1.00.00-x64.exe . 36 693 230 байт; SHA256 `8df76dbb632cc314b9bd4a2c33f3399ca91b9a3920360693b7f7c8520ba3bccf`.
- Доказательство публикации: `unity/PUBLIC_DELIVERY.json`; успешный серверный запуск https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39246852201 . Сервер проверил восстановление пакетов, SHA256, сертификат APK и скачал все четыре публичных файла обратно. Шесть тестов publisher прошли. Это публикация локально собранных пакетов, а не успешная облачная Unity-сборка.
- Локальные release builds Windows/Android завершились кодом0; контракты, включая updater, прошли. Установленная Windows-копия прошла migration smoke; повторная установка сохранила изолированный профиль. APK: проверены v2/v3 подписи и 16KB zip alignment. Физическая установка/обновление Android и полный цикл обновления между двумя версиями **не проверены**. Windows Setup без Authenticode.
- Значимые коммиты: `8c44b516` — исходники релиза; `51ee9510` — publisher; `adfd1602` — проверенный активный канал; `1fdc86c1` — итоговый checkpoint. Коммиты старого прототипа `7722cccc`, `926a8ff3` ранее подтверждены в удалённой ветке. Сверяй новый HEAD, не откатывайся на эти SHA.

### Реализованное и следующий этап

В Unity есть главное меню, список персонажей, базовое создание первого уровня, лист/паспорт и редактирование полных данных, каталоги 402 заклинаний и 188 предметов, инвентарь/папки/заметки, операции кошелька с обменом и историей, настройки графики/камеры, импортированная 3D-карта и управление с первым/третьим лицом. Каталоги создания: 57 рас, 35 записей классов, 31 предыстория. Это не полная механическая совместимость с веб-клиентом: extra-body классы только импортируются, незавершённые выборы остаются pending.

Продолжай **весь лист персонажа и механику из main**, не ограничивайся картой или формами. Ближайшее: проверить пользовательский запуск APK; затем выполнить оставшиеся race/class creation hooks и выборы, инициализацию классов, повышение уровня, исполнение заклинаний/предметов/отдыха по parity matrix. Для классов соблюдать актуальную очередь Issue #9. Облачная синхронизация Unity-персонажей ещё не реализована; не выдавай GitHub upload за Supabase sync. Сохраняй неизвестные JSON-поля и старые форматы; не создавай параллельный store или вторые структуры ресурсов.

Веб-контракты: `currentChar` в `app/app.js`, `window.currentCharacter` — алиас; `resources`, `classFeaturesState`, `encounters`, `initiativeTracker`. Перед сериализацией/облаком изучи `app/cloud_sync.js`, `app/cloud_account.js`, migrations, ключ `dnd_multi_characters_v2`. Основные C# модули: `unity/Assets/Vtt/Runtime/CharacterCreation.cs`, `CharacterSheetRules.cs`, `LegacyDocuments.cs`, `LegacySessionPanel*.cs`, `ClientPreferences.cs`, `UnityRelease.cs`. Изучи импорты/вызовы/тесты существующего модуля до добавления нового.

### Что не переехало в облако и чего нельзя обещать

Домашний Codex-чат не становится удалённым executor. Нужна новая облачная задача с подключённым репозиторием и выбранной веткой. Исходники и релиз доступны без домашнего ПК, но настоящий Unity CI требует настроенной лицензии и постоянного ключа Android. Существующий `unity-experiment-android.yml` ранее останавливался на license preflight; успешной облачной сборки пока нет. Секреты настраивать через защищённые Secrets, не через чат/коммиты. Не извлекать управляемую авторизацию Codex/Unity.

Оригинальный закрытый ключ сохранён дома, `%USERPROFILE%\.dnd-vtt-unity\signing\unity-release.p12`; оригинальный пароль в `password.dpapi.xml` привязан к Windows DPAPI. Позднее ключ и доступный пароль переданы в Environment Secrets и проверены реальной операцией подписи на GitHub-hosted runner (актуальный CI-раздел выше); подписание теперь не зависит от этих домашних файлов. Публичный сертификат SHA256 `c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e`. Пакет `com.dndvtt.unity`, versionName1.00.00, code10000. Не генерируй замену ключа молча; debug APK с иной подписью не обновляется поверх релиза. Не удаляй приложение/данные без экспорта.

Unity-сохранения пока локальные JSON с атомарной записью и .bak, пользовательские данные в GitHub не выгружались. Не меняй Windows company/product (`DnDVttExperiment` / `DnD VTT Unity Prototype`), иначе сменится путь сохранений. Для QA есть `--vtt-profile-store <isolated-path>`; не тестируй на оригинальных данных владельца.

В домашнем checkout остались **67** посторонних/созданных редактором изменений: 62 файла вложенного `unity/dnd-vtt`, два ProjectSettings asset, Resources.meta и два материала. Они намеренно не закоммичены; их наличие в новой среде не ожидается. Не утверждай, что эти файлы восстановлены/перенесены; не удаляй их на домашнем ПК и не добавляй массово.

Проверки запускать по изменениям: `unity/verify.ps1`, `unity/release.ps1`, Editor validators; на Linux PowerShell/Unity могут отсутствовать. Скрипт publisher можно проверить `python3 .github/scripts/test-publish-unity-artifacts.py` без лицензии. Не объявляй сборку/тест успешным, если среда не позволила запустить. После этапа обновляй компактное состояние, индексируй `node tools/generate_project_atlas.cjs` и коммить оба атласа вместе. Коммит и обычный push — только экспериментальная ветка. Следующую версию выпускать по просьбе владельца, проверяя оба установщика и сохранения; не переключать feed до проверки реальных скачиваний.

### Короткое сообщение владельца для запуска новой задачи

> Продолжай DnD-VTT в ветке experiment/unity-vtt. Сначала прочитай docs/UNITY_CLOUD_HANDOFF.md и указанные там checkpoint-файлы. Переносим весь лист и игровые механики из main в Unity 6/C#, сохраняя совместимость данных. Установщики 1.00.00 уже опубликованы; не пересобирай их без причины. Проверь доступное облачное окружение и продолжи незавершённые задачи по parity matrix и Issue #9. Main и существующие релизные workflow не менять; платные API без моего разрешения не запускать. Сообщай реальные результаты тестов и ограничения облачной сборки.

Рабочая ветка: `experiment/unity-vtt`. Основную `main`, старые Android/Windows клиенты и их релизный workflow не менять.

## Что должно пережить выключение домашнего ПК

- Исходники Unity, настройки проекта, скрипты сборки и этот checkpoint — в GitHub.
- APK и Windows Setup — отдельный предварительный релиз `unity-v1.00.00` (не latest старого WebView).
- Канал обновления — `updates/unity-experiment.json` в экспериментальной ветке. Файл содержит адреса и SHA-256 обоих пакетов. Не переключать канал на следующую версию до загрузки и проверки обоих файлов.
- Секретный ключ APK не коммитить и не прикладывать к публичному релизу. Локальный signing script хранит его в `%USERPROFILE%\.dnd-vtt-unity\signing`; пароль защищён Windows DPAPI. Для будущих подписанных сборок на другом компьютере нужен безопасный перенос ключа и пароля владельцем.

Публикацию и push считать выполненными только после независимой проверки удалённой ветки, страницы релиза и файлов загрузки. Локальная папка Builds не является облачным хранилищем.

Для уже собранных файлов добавлен отдельный `unity-delivery-publish.yml`: небольшой `release-staging/unity-release.json` указывает проверенные транспортные blobs. Сервер восстанавливает оба пакета, проверяет SHA-256 и закреплённую подпись APK, создаёт предварительный GitHub Release, повторно скачивает его файлы и только затем активирует канал. Бинарные файлы не добавляются в дерево исходников, ключ подписи не загружается. Этот publisher не запускает Unity и не требует лицензии Unity; существующий стабильный release workflow не меняется.

После успешной публикации `unity/PUBLIC_DELIVERY.json` содержит ссылку, точные размеры/хеши и SHA исходников. Старый предварительный APK из локального аудита был подписан Android Debug; текущий выпуск использует постоянный ключ Unity. Их нельзя считать взаимозаменяемыми при установке поверх уже установленной debug-сборки; пользовательские данные сначала нужно сохранить экспортом.

## Как выпускать следующую версию по просьбе владельца

1. Проверить рабочую ветку/компактное состояние. Изменить `UnityRelease.Version` и `Code` согласованно (`1.00.01` → `10001`).
2. Собрать обе платформы через `unity/release.ps1 -Stage Windows`, `-Stage Android`, затем `-Stage Package`. Нужен тот же Android signing key.
3. Пройти контракты, проверить запуск установленной Windows-копии, подпись/пакет/код версии APK, сохранение данных при обновлении. Не выдавать компиляцию за физический Android-тест.
4. `-Stage Manifest` формирует контрольные суммы и отдельный канал Unity. Загрузить оба установщика и SHA256SUMS в **prerelease** с соответствующим тегом, проверить скачивание и только затем обновить удалённый manifest.
5. В приложении: Настройки → Проверить обновления → Скачать → Установить. Windows Setup ждёт завершения старого процесса; Android запускает системную установку с проверкой имени пакета и подписи. Сохранения не находятся в каталоге установки.

## Ограничения облачной разработки

GitHub-репозиторий доступен с телефона независимо от домашнего ПК. Однако этот локальный Codex-чат и установленный здесь Unity Editor не становятся облачными от одного push. Для выполнения команд при выключенном ПК нужна отдельная облачная среда с подключённым репозиторием.

Существующий `.github/workflows/unity-experiment-android.yml` изолирован от WebView. Его предыдущий запуск остановился на отсутствии Unity CI license configuration. Для реальных облачных Unity-сборок владелец должен настроить подходящую лицензию/Actions Secrets и постоянную подпись APK; локальные авторизационные файлы Unity автоматически не экспортировать. Не заявлять готовность сборок без домашнего ПК до зелёного запуска CI.

Это также **не облачная синхронизация персонажей**: Unity пока использует отдельный локальный JSON и `.bak`; Supabase/CAS/Auth из прежнего клиента ещё не перенесены. Полная классовая автоматика, повышение уровня и исполнение эффектов остаются незавершёнными.
