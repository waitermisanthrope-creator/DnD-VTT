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
