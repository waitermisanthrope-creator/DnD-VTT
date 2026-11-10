# WebView → Unity: перенос интерфейса и проверка сборок

Текущее состояние29.10.2026: **1.00.46 опубликована и независимо скачана**. Раса,
заметки, кошелёк и категории инвентаря перенесены очередным проверенным этапом.
Полный рынок, ряд окон/модалок и классовые hooks остаются незавершёнными.

## Следующий этап: рынок47 — локальная проверка, публикация ещё не подтверждена

Перенесены исходные42торговца/320строк ассортимента из market55/55.1/55.2;
экспорт воспроизводим, три SHA256 исходников и504 эталонные цены проверяются.
Кнопка после кошелька перед AC, исходные Playfair/синие кнопки/выбранный коричневый
торговец, окно980px/94vh, поиск, покупка/продажа/обмен с галочками.
Полный каталог функциональных предметов не включён повторно: определения берутся
из установленного CommerceCatalog; отсутствие пакета обозначено data_only.

Сделки работают с detached-копиями исходного героя/глобальных preferences,
сохраняют wrapper/других героев/неизвестные поля. Write-ahead journal согласует два
файла и backups, отказ второго replace откатывается; startup recovery до загрузки
архива. Незавершённая операция блокирует обычную запись. Общие файловые leases
защищают запись архива/настроек и целую сделку от второго писателя.

Ревью readonly QA выявило пять Important: смешивание вариантов предмета, ловушка
неизвестного состояния/региона, потеря последней цифры кошелька, два писателя,
смена GUILayout при восстановлении. Все исправлены. Variant и lease тесты сначала
наблюдались красными, затем зелёными; GUI/keyboard/recovery покрыты runtime smoke.
Исходные баги не копируются: явная цена вместо случайного1gp, дубликаты barter
отклоняются, экипированное не продаётся, unknown-конфликты не перезаписываются.
JS-округление цен сохранено, расчёт кошелька целочисленный в медных монетах.

Локально: MARKET_PASS547; полная регрессия9310; provenance44;
Windows/Android Roslyn compile PASS. Настоящий Windows player под Wine/Mesa:
exit0,68PNG просмотрены, новые окна отдельно; покупка и закрытие через OS-pointer,
списание монет/склада проверено с диска; отказ unknown state/region, последний ввод
кошелька, Layout-переход восстановления, portrait600×960/narrow360×800/desktop1280×900.
Chromium показывает исходный динамический рынок, сеть ограничена localhost.
QA-копия старого player использует явные font/paper/market/advancement overrides:
это НЕ доказательство импорта нового market.json Unity или нативной Android сборки.
Новый candidate47 должен подтвердить оба native build и installed QA до публикации.
Запуск47 пока заблокирован: автоматическое approval review отклонило изменение
версии GitHub Actions из-за прежнего прямого запрета владельца менять Actions.
Workflow возвращён к46, версия/feed/approval46 не изменены. Для18 замен только
литерала версии в существующем workflow требуется отдельное разрешение владельца.

Ограничения: social55.3 торг/отношения не перенесены (в исходнике несогласованные
цены/обёртки), restock-управление отсутствует. Полный визуальный клон и все hooks
не завершены. Физические Android touch/IME/Back, аварийное выключение устройства
и межпроцессная блокировка на физическом Android не проверены.

## Исходный этап28.10.2026

Владелец отверг9c14aad8 как недостаточно компактный и потребовал тот же визуал,
шрифт, цвета, расположение полей и необходимых действий. Этот этап исправляет
самовольный redesign; **полное совпадение всех окон ещё не завершено**.

## Фактический референс

`index.html:469–619`, `app/styles.css`, динамические overrides `app/Settings.js`
и `app/Wallpapers.js`. Два readonly Explorer/QA отчёта получены до реализации.
Playfair Display назначается по умолчанию в Settings.js789, перекрывая базовый sans.
Старое сравнение с заблокированным Google Fonts показывало fallback и было недостаточным.
Теперь настоящий Playfair загружен локально в Chromium; сеть браузера ограничена
localhost, данные синтетические. Одинаковый герой и viewport440×900/1280×900.

Исходный неизменённый variable TTF из google/fonts/ofl/playfairdisplay, SIL OFL1.1
(с Reserved Font Name); лицензия и copyright включены рядом с ассетом.
SHA256 `c40f2293766a503bc70cce9e512ef844a4ccb7cbcde792fe2ea31d191917d8d6`.
Файл в проекте: `Resources/UI/PlayfairDisplay-Regular.ttf` (имя файла не обозначает
модификацию: байты исходного variable font сохранены). Производные статические
начертания не включены. DejaVu остаётся fallback для символов и прежних данных.
В QA-копии старого установленного player используется opt-in OS-font override;
это **не проверка импорта нового ассета Unity** — для неё нужен новый native build.

## Что исправлено

- Playfair используется и в основных окнах, и в листе; размеры берутся из CSS:
  body16, heading≈19, labels14, inputs/buttons13, nav13; прежние DejaVu17/21 убраны.
- «Герой» снова показывает имя, readonly класс/уровень60px, золотую кнопку опыта
  с чёрным текстом, предысторию, расу и профессию. Убраны summary/thumbnail,
  «Изменить сведения» и постоянная строка портрета. Арт доступен через правую кнопку.
- Карточки идут вертикально и на ПК; характеристики всегда2колонки.
- Инициатива возвращена отдельным действием под3боевыми полями. Убрана придуманная
  строка урона/лечения. HP редактируются непосредственно. Состояния/death saves и
  кнопки отдыха видны на месте, а не спрятаны за большим fold.
- Навыки/спасброски — компактные строки с владением и зелёным итогом без18/6
  дополнительных d20-кнопок. Выбор владения раскрывается только по запросу.
- Параметр характеристики способности — один раскрываемый selector вместо шести
  постоянно видимых кнопок. Исходные handlers/сохранение сохранены.
- Необходимые прежние действия Files/backup/copy/wallet/passport доступны через
  существующий раздел настроек «Данные и устройство». «Меню» ведёт к героям.
- Исправлен полупрозрачный двухпиксельный край общего rounded texture:
  расчёт coverage теперь использует центры пикселей.

## Что ещё НЕ совпадает

Раса пока readonly: исходный dropdown и «+ Своя»/модалка ещё не перенесены;
фальшивой кнопки без механики нет. Всплывающий выбор навыка реализован inline,
часть вкладок/инвентарь/заметки/окна ещё отличаются. Emoji, blur/shadows, точные
начертания после Unity asset import и отдельные интервалы ещё требуют доводки.
Правая кнопка показывает сохранённый арт; это не полный WebView show/hide UI режим.
Не называть это pixel-perfect clone или полной функциональной parity.

## Выполненные проверки

- Full workshop regression:8732 PASS; Windows и Android define Roslyn compile PASS;
  source readability/branding/update contracts PASS; diff --check PASS.
- Короткий опт-ин `--vtt-reference-only --vtt-reference-hero <synthetic.json>`:
  8 настоящих GPU кадров на440×900/1280×900, Win32 mouse+keyboard ввод HP → сохранение
  и reload PASS. Маркер **CAPTURE**, не утверждение автоматического визуального равенства.
- Полный opt-in Wine/Windows-player:47 основных GPU кадров + диагностический HP PNG,
  нативный ввод HP11, открытие XP, создание заметки, idle-render purity, wrapper,
  второй герой, backup/reload, предыдущие art/import/advancement/settings сценарии PASS
  на exact-full2. Последующая правка rounded-пикселей проверена коротким capture;
  новый установленный native CI gate обязателен перед доставкой.
- Реальный pixel-component замер полей440×900: имя, класс, предыстория и профессия
  отличаются на0–2px по позиции/ширине/высоте внутренней заливки; раса отличается
  по ширине на73px из-за ещё отсутствующей исходной кнопки. Это не измерение glyph/
  shadow/blur и не утверждение равенства всего экрана.

Локальные артефакты: `/workspace/work/unity-webview-exact/` (референс, computed styles,
geometry.json, компиляция/регрессия), `/workspace/work/unity-runtime/evidence/exact-full2/`
и `exact-reference-final/`. При переезде среды могут быть недоступны.

Reviewer дополнительно нашёл потерю доступа после удаления «Ещё» и ложный смысл
старого CAPTURE-маркера: исправлены, прямой HP-ввод проверен настоящими событиями.
Новый font import/IL2CPP/native installer/device Android проверяются отдельно.
Кандидат1.00.45 отмечен testing, опубликованная1.00.44 и feed не меняются этой правкой.

Final reference correction: `Wallpapers.js` default dim is0.4, not0.2;
matched and natural-width condition chips now wrap by text width. Fractional chip
widths are rounded upward to avoid wrapping the last glyph. Opt-in eye target padding
matches its38px height. `exact-reference-dim3` capture8 + native HP input exit0.
HP pointer QA distinguishes three wide inputs from narrower same-color condition chips.
Candidate bcd60a52 is superseded by this final source before any publication.

## Visual veto after successful native builds — 28.10

Source476513c9, run40715967849: Android122914632400, Windows122929199773,
installed QA122935165209 all SUCCESS.47 actual native GPU thumbnails inspected.
**Promotion vetoed**: paper outside cards is black (six measured RGB samples0),
although the asset is present/imported. Local LoadImage paper is visible. Full PNG ZIP
returned by GitHub connector cannot be fetched into this workspace: proxy CONNECT403;
no network bypass attempted. Thumbnails suffice to prove the missing background.

The old fixed400×640/640×400 thumbnail resampled arbitrary viewports and distorted
font proportions. Capture now retains aspect and logs actual width/height and font
metrics; this was a QA defect, not evidence to replace the original Playfair font.

Next controlled import hypothesis: uncompressed paper only (`textureCompression:0`),
same GUID204603f0a61c4362b41baaad2329807c; no scene/other image/GUID changes. Native
success is still REQUIRED, not asserted from this hypothesis. QA now records texture
format/GPU texel, actual-font glyph metrics and frame viewport, and fails if the six
background samples remain black. Measured old native sample is RED; known-good local
ARGB32 paper GPU=.9216,.8784,.7882, rendered mean=.5155, real HP edit PASS. Published44
and paired approval44 remain untouched. No release45 authorised as complete clone.

## Root cause confirmed by native telemetry

Run40725932785/source0ced28ca: Android passed; Windows first failed Unity activation
(exit198), the authorised failed-jobs retry built successfully. Installed QA then
correctly FAILED the new paper guard. Actual runtime reports `Parchment512x1024
format=Alpha8`, GPU RGB0,0,0, screen brightness0. This disproves the simple compression
change: the hand-written old importer metadata selected a single-channel alpha mask.
The fix uses current TextureImporter13/platformSettings4 with explicit RGBA32 format4,
no NPOT distortion/mipmaps, and unchanged GUIDs. The same incomplete metadata was used
by Wallpaper16/Splash19/Dragon20; all four color images now use that correct schema.
Original PNG/JPG bytes are unchanged. Build validates color formats before packaging;
installed runtime validates format, GPU RGB and visible backdrop. Local48-frame UI
run `exact-layout-guard` PASS (explicit raw QA PNG; not a new-asset import proof).

Native telemetry also confirmed actual runner viewport600x768, not requested600x900;
old fixed thumbnail dimensions explained the apparently stretched font. Original
Playfair glyph metrics match the OS reference; font file is not replaced. Capture
now preserves aspect. Full artifact download is blocked by proxy; no bypass attempted.

Removed unreachable old More pane; its actions remain in Data/device settings. Art
view is global across sheet tabs and uses deferred transitions. A real old unsupported-
counter tab→Hero transition emitted `Getting control...when doing repaint` despite
exit0; navigation now commits state at Layout start, and QA fails on those GUI errors.
Added art-from-Skills→return scenario. Final native import/render validation pending.

## Final artifact transport bound

Source d427cac6/run40735177301 ALL3SUCCESS: Android122981675114, Windows122993619126,
installed runtime122998967028. Early editor logs confirm all4actualRGBA32 imports with
original aspect (paper572x1024). Native installed pixel/layout/HP/art guards passed.
However final combined job log download twice failed with MCP `Transport closed`;
full PNG artifact download remains proxy-blocked. Do NOT claim final48frames manually
viewed from that run. To complete the promised review, stdout previews now use JPEG82
at preserved aspect/max640px; full-resolution PNG artifacts and all full-pixel checks
are unchanged. This is an opt-in QA transport change, not altered product rendering.
No publication before the final accessible preview review.

## Final native review — 28.10.2026

Exact source `27087353457a06dcb33c55f5cf3217c6323642c7`, run40742387640:
Android123007122465, Windows123018400943, installed QA123022969453 all SUCCESS.
The final JPEG preview log is accessible (2,500,893 characters),48frames extracted
and actually viewed in four contact sheets; Hero/health/desktop/global-art additionally
viewed individually. All four imported images are RGBA32, original aspect preserved;
actual visible paper brightness0.517211. Original Playfair typography is present.
Real input/save, XP/note/art navigation, layout guard and installed upgrade/reinstall
checks passed. Full-resolution PNG evidence remains in the workflow artifact; stdout
JPEG is only a transport preview. No physical Android gesture/IME test is claimed.

The original black-background release veto is resolved by native evidence, not by
source checks alone. Owner-delegated test publication approval8aa5548f selects this
exact run. This is a partial UI port: see remaining differences above, especially
race selection/modal and other windows. It is not completion of the full visual clone.

## Published and independently downloaded

1.00.45 released by existing gated publisher run40747479455 (SUCCESS), delivery
commit2a580006, source27087353457a06dcb33c55f5cf3217c6323642c7/run40742387640.
Independent public download: Android62,571,990bytes, Windows44,354,049bytes;
SHA256 and byte lengths match feed and PUBLIC_DELIVERY.json; APK contains ARM64 libs,
EXE has MZ header. Plain/cache-busted feed match45/code10045, original Android package.
`INDEPENDENT_DELIVERY45_PASS`, exit0. Public links:
https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.45

Next work is actual remaining WebView parity, not more redesign. Test on physical
Android: update without data deletion, old heroes/art reload, touch scroll/IME/numeric
input, tabs and Back, XP/multiclass eligibility; on Windows check wheel/resize/file
picker and saved data after restart. No claim these physical Android checks ran.

## Continuation 29.10.2026 — race, notes, wallet and inventory

Two read-only Explorer/QA analyses completed before implementation. Primary checked
actual Chromium rendering with original Playfair: dynamic JS places the wallet at
the beginning of Inventory, and folder chips are block-width30px, not a flex row.
These runtime findings supersede the initial static-layout assumptions.

Changes use existing partial OnGUI, CharacterSheetRules, ClientPreferences and
CommerceRules; no new UI framework/store, no scene/meta/GUID/package changes.

- Race dropdown and right blue +Своя, narrow custom form (name, description, speed,
  six bonuses in2columns), confirmation, once-only lock and descriptive data.
  SelectRace returns a detached preview; no class seed merge. Stats/speed/natural
  armor/HP aliases apply atomically. Existing raceId, including unknown IDs, locks.
  Supported simple seed-only package races normalize baseline stats/speed/size;
  complex seed/required choices explicitly reject and direct to character creation.
- Custom definitions live in existing device preferences under dnd_custom_races,
  preserved by both default-settings actions. Unknown catalog shape is preserved,
  blocks writes and displays a warning without trapping race selection.
- Notes use source-sized folder pills, title/add-note row, direct title/multiline
  text and small delete button; extra search/settings removed. Existing create,
  update, signature-checked delete and autosave used; unknown formats stay readonly.
- Existing wallet moved to Inventory top and compacted: five currencies,2x2rates,
  operation selector, calculate and transaction log. Existing detached coin operation
  and archive save remain. Android wallet input supports exact JS-safe integers
  through9,007,199,254,740,991; custom bonuses use a signed keyboard layout.
- Inventory AC, horizontal five-category swipe row, green source picker action;
  crafting/alchemy remain under Materials; containers and existing handlers remain.
  Removed huge always-present autosave card; routine autosave text is suppressed,
  actionable notices remain as small text. Visibility changes commit at Layout.

Verification: added pure tests RED→GREEN for race apply-once/cancel/invalid input,
HP/Builder aliases/unknown fields, custom catalog/defaults/backup/reload; numeric
wide range and signed bonuses; blank new note matching source. Sheet65, numeric17,
menu50 PASS. Whole regression8760 PASS (final3, exit0). Native candidate results are recorded below
when complete. Windows and Android Roslyn compile PASS (not native builds).
Local full Wine/GPU parity-next10 exit0:56frames, real HP/XP/note/custom-race save,
wallet+1gold operation3350copper/log, currency/action/history render purity, old
profile/other hero/wrapper/backup guards and no GUILayout/label clipping errors.
Local player uses explicit font/raw-paper override; do not call that a new native
asset-import check. Final footer adjustment has a separate10-frame reference capture (exit0), actual HP edit and no GUI/clipping errors; notes frame inspected. All56 full-run frames actually inspected in contact sheets; key new screens inspected individually.
Review caught catalog deletion on defaults, inert seed-only race, trapped malformed
catalog, narrow labels and Android Int32 wallet limit; fixed with relevant checks.

Remaining scope: complete market/trade UI/backend, parts of item picker and other
modals/creation/lore, precise emoji/blur/shadow parity and full class combat/rest
hooks. No fake market button is drawn. Physical Android touch/IME/Back and update
need device QA; no claim of full WebView clone or complete class port.

Candidate1.00.46 remains testing; feed/approval45 are untouched until actual native
build/installed runtime and visual review pass. Only candidate workflow version
literals45→46 changed; workflow logic/permissions/signing are unchanged.

## Native46 verification and review

Exact source711902f4e679324a832452b5edf8c655cb10b931, candidate40790424498:
Android123173999947, Windows123180080494, installed QA123183021883 all SUCCESS.
All56 actual native previews extracted from accessible2,912,954-character job log
and viewed in4contact sheets. Notes, inventory wallet, custom form and locked race
also inspected individually. Actual bundled images allRGBA32, paper brightness
0.517211, original Playfair and control glyphs visible. Real pointer actions and
disk assertions cover note creation, custom-race cancel/save/confirm, catalog reload,
wallet+1gold3350copper/log, HP/XP, profile/backup/other hero preservation, no GUI errors.
Local full8760 PASS, sheet65/menu50/numeric17. No physical Android QA claimed.

Owner-delegated approvalf3a69713 selects this exact run. Existing publisher40793558358
finished SUCCESS. Delivery commitdf0460b7; public APK62,584,278bytes and Windows
EXE44,350,660bytes independently re-downloaded, SHA256 and lengths match feed and
PUBLIC_DELIVERY.json. Plain/cache-busted feed match46/code10046, source711902f4 and
candidate40790424498; APK ARM64 libs and EXE MZ header verified.
`INDEPENDENT_DELIVERY46_PASS`, exit0. Existing original signing/package retained.
https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.46
