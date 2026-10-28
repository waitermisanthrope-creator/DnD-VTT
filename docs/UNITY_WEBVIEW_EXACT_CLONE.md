# WebView → Unity: исправление отвергнутого редизайна, 28.10.2026

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
