# Проверка прокрутки Unity — 2026-10-25

База: `07b146bd632deed8ca5de32a7ed5cc814363dab6`, ветка `experiment/unity-vtt`.
Прочитаны корневой/Unity AGENTS и UNITY_AGENT_WORKFLOW. Использованы Superpowers
systematic-debugging/test-driven-development и Unity UI/ui-imgui; существующий
partial OnGUI сохранён. Два встроенных субагента: scroll_explorer и scroll_qa,
только чтение, оба отчёта получены до реализации; QA повторно просмотрел diff.

## Что установлено

Roster и длинные панели уже обёрнуты в общий `frontScroll`; settings и technical
settings имеют свои BeginScrollView. Wheel оставлен штатному IMGUI. Ошибка wheel
не воспроизведена и не объявляется подтверждённой.

По исходным потокам выявлены дефекты арбитража:

1. Глобальный swipe начинался поверх scrollbar и sliders чувствительности/FOV.
   После порога Dragging приводил к сбросу GUIUtility.hotControl. Добавлены зоны
   владения нативных контролов: жест с такой точки не захватывается custom swipe,
   в том числе после выхода указателя за границы контрола. Slider rect ограничен
   видимой областью родительского viewport, gutter берётся из текущего GUIStyle.
2. Map-panel обходил suppression MouseUp и очистку областей Repaint. Теперь обе
   ветки проходят общий lifecycle; Toggle очищает жест, закрытая панель не получает
   touch-события меню. Открытая панель по-прежнему отключает Explorer.acceptInput.
3. Clear/End не запрещали последующий Move без Begin. Это воспроизведено реальным
   C# тестом: после Clear старый drag захватывал новую страницу. В MenuGesture
   добавлен active lifecycle; после навигации/release/cancel нужен новый press.

Реальное проявление первых двух дефектов и корректность исправления в IMGUI пока
не проверены на устройстве. Проверка nativeControl в C# подтверждает только
арбитраж custom gesture, а не изменение значения настоящего slider.

В map-panel и character-controls вертикальный scrollbar теперь всегда показан,
как в остальных зарегистрированных вертикальных viewport: защищённая полоса
соответствует существующему контролу даже без overflow. Sheet tabs уже имеют
alwaysShowHorizontal. Дублирующие UI-компоненты/хранилища не созданы.

## Автоматические проверки

В этой среде SDK найден вне PATH: `/workspace/cloud-setup/dnd-vtt/dotnet/dotnet`,
8.0.426. Для настроенного SDK/NuGet окружения:

```bash
source /workspace/cloud-setup/dnd-vtt/env.sh
dotnet run --no-restore --project unity/ci/workshop-tests -- --menu-input
dotnet run --no-restore --project unity/ci/workshop-tests -- --character-delete
```

- Новый целевой режим: `MENU_INPUT_LOGIC_PASS 50` — существующие account/gesture
  contracts плюс навигация без нового press, native ownership, scaled swipe/release.
- Сначала новый navigation test упал с сообщением `navigation ignores the remainder
  of the old drag until a new press`; после исправления прошёл.
- `CHARACTER_DELETE_PASS 119`: сохранения/файлы и Roslyn-синтаксис всех Vtt C#;
  это не компиляция Unity-классов.
- Шесть существующих Python-команд из UNITY_AGENT_WORKFLOW прошли; provenance44,
  launcher aliases2 tests. После финальных UI-правок повторены update/settings,
  branding, preview contracts и оба C# режима.
- `git diff --check` прошёл.

Добавлен независимый Editor entrypoint `WorkshopEditorValidation.RunMenuInput`
и проверки virtual touchscreen: Begin/Move/End, native ownership, Clear/navigation,
Canceled → Move без press → новый Begin, очистка закрытой map-panel.
Они **не запускались**, поскольку Unity Editor отсутствует. Будущая команда:

```powershell
& $editor -batchmode -nographics -quit -projectPath '<repo>\unity' -executeMethod WorkshopEditorValidation.RunMenuInput -logFile menu-input.log
```

Требуются реальный exit0 и `VTT_MENU_INPUT_SYSTEM_PASS`. Даже этот тест подставляет
viewport rectangles и не доказывает реальную геометрию Layout/Repaint/жесты устройства.

## Ручная приёмка — ещё не выполнена

Windows, Unity 6000.3.26f1, отдельный синтетический --vtt-profile-store:

- Настройки всех категорий, длинный changelog, длинный roster, лист/мастерская:
  wheel вверх/вниз над содержимым и scrollbar; достижимость начала и конца.
- Drag thumb scrollbar и sliders чувствительности/FOV больше10px, выход за края,
  частично скрытый slider; непрерывное изменение и нормальный release.
- Swipe с кнопки не активирует её на отпускании; обычный click активирует один раз.
  Горизонтальные tabs и вертикаль над tabs; края при overflow/no-overflow, resize/DPI.
- Открыть map-panel: swipe/scrollbar без выбора карты и без движения/поворота героя.
  Закрыть панель во время взаимодействия; новое управление картой работает.
- Сохранить поведение text selection в chat и orbit/slider в character studio.

Физический Android:

- Portrait settings/roster/длинные панели, vertical и horizontal swipe, края,
  sliders/scrollbar, отпускание за viewport; tap без случайного срабатывания после drag.
- Второй палец, cancel, фон/resume, новый жест после отмены, portrait → landscape
  map → panel → обратно. Открытая панель не двигает героя/камеру; закрытая не хранит
  скрытый swipe. Проверить character orbit/pinch и native chat selection.
- Записать устройство/Android/DPI и фактические результаты. Emulator/Wine/static
  проверки не заменяют физическую приёмку.

Сохранения/формат, сцены, .meta/GUID, packages, секреты и GitHub Actions не изменены.
Unity/платформенные сборки не выполнялись. На этапе реализации push не запускался.
Последующим поручением разрешено сохранить исправление в experiment/unity-vtt
коммитом `fix(unity): improve menu scroll and swipe handling`. Повторены оба C#
режима, шесть Python-проверок и diff check. Релизы, merge и MMO не запускались.
