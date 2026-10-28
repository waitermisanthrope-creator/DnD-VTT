# Unity: опыт и повышение уровня — 1.00.44

Поручение владельца: сначала перенос опыта/прокачки/мультикласса из WebView,
затем остальной интерфейс. Ветка experiment/unity-vtt; main не изменяется.

## Сценарий

В листе «Герой» блок «Развитие персонажа»: «Опыт…» и «Повысить уровень…».
Опыт можно установить, начислить, списать до нуля; он сам не меняет классы.
Повышение добавляет ровно один уровень выбранного класса. По умолчанию требуется
опыт следующего общего уровня; отдельно доступно решение мастера для игры по вехам.
«Мои классы» отделены от поиска нового мультикласса. Нехватка характеристики
показывает причину и блокирует новый класс; уже имеющийся класс от этого не блокируется.
Перед сохранением: HP (среднее, бросок, максимум; отдельное полное исцеление),
подкласс, ASI +2/+1+1 с пределом20 либо установленная черта; частичные владения
и обязательные навыки/инструменты нового класса. Подтверждение показывает итог.
Отмена не меняет героя; запись атомарная с .bak, ID/документ защищают от устаревшего
и повторного подтверждения. Переключение героя/экрана закрывает черновик.

## Данные и границы

- Существующие exp/classes/level/features/feats/stats/proficiencies/spellcastingSources,
  spellSlotsData/pactMagicData используются без второго store. exp читает experience
  как fallback, запись идёт в exp как в реальном WebView UI.
- 27 локальных таблиц классов1–20, включая Шифтер; 540 дифференциальных class-level
  случаев из progressionEngine и100 смешанных случаев из DNDRules.spellSlotTable.
  Источники и SHA256 в advancement.json, воспроизводимый export_advancement.cjs --check.
- Это перенос мастера развития/выдачи записей, не всего исполнения боевых эффектов,
  отдыха, заклинаний и уникальных runtime-hooks классов. Не объявлять full parity.
- Некромант, Мученик, Сосуд и другие отсутствующие в каталоге/Extra/custom классы
  пока не повышаются автоматически. Если неизвестен хотя бы один исходный класс,
  операция блокируется, чтобы не обнулить его ячейки/кости хитов.
- Для новых Бистхарта/Аккурсд/Псионика/Рунного хранителя/Саванта в загруженных
  источниках нет проверяемой таблицы требований; добавление блокируется явно.
  Уже взятые классы с таблицей прогрессии можно повышать.
- Требования проверяются для входящего класса (как в legacy); предупреждающий
  override WebView заменён жёсткой блокировкой по прямому пожеланию владельца.
  Таблица частичных владений повторяет проектный WebView (включая heavy armor
  для Воина/Паладина), не выдаётся за заново выверенную редакцию PHB.
- Сохранены неизвестные JSON-поля, wrapper, остальные герои, арт и расход ресурсов.
  Поддержаны старые hp/maxHp/currentHP/hitPoints и длинные имена характеристик.
  CON ASI/черта учитывает ретроактивный прирост HP предыдущих уровней; 0HP не
  подменяется10. Неизвестный подкласс блокируется с объяснением.

## Проверенные результаты выпуска

- Source `8e111121a440157e8a4f9bf5276c27b30a7a229f`; основной feature commit
  `d0f401d7`, дополнительная защита уровня из строки «Воин 3»/формата classes — `8e111121`.
- Candidate [40606924017](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/40606924017):
  Android `122548740548`, Windows build `122556545944`, installed native Windows
  `122559522744` — все SUCCESS; источник и ветка проверены через GitHub API.
- WORKSHOP_STORE_PASS **8690** в CI; pure advancement **1715**; save/syntax **124**.
  Порог XP ±1, prerequisites/aliases, class-level vs total, HP/CON ASI/feat,
  array/object subclasses, legacy string feat duplicates, spell slots/Pact,
  SHA источников, unknown fields/wrapper/ID/other heroes, backup/restart/IO failure.
- Win/Android Roslyn compile PASS против реального player DLL; затем фактические
  Unity Android ARM64 IL2CPP и Windows Mono builds PASS; Unity migration contracts PASS.
- Installed Windows1.00.00→44/reinstall: payload/profile/backup hashes, native file
  dialogs, runtime smoke и UI PASS. Все **38** конечных native GPU thumbnails просмотрены;
  XP, class selection, HP preview/confirm, subclass-step и ASI. В оптическом кадре
  subclass-step видна верхняя часть мастера; выбор/выдача подкласса отдельно проверены
  pure tests, не выдаются за отдельный клик по каждому варианту в native UI.
- Первый локальный QA-copy Wine35frames exit0; расширенный прогон после получения
 38кадров упал в нативном fullscreen roundtrip. Повтор38frames exit0/UI PASS;
  финальный настоящий Windows gate выше также PASS. Wine не выдаётся за Editor/Android.
- Provenance44, brand/readability/update contracts, legacy stat-mode/level-up и
  multiclass spell-source JS tests PASS. Последний JS-тест требует cwd app/;
  первичная попытка из корня получила ENOENT, повтор из app/ PASS.
  Cloud release10, publisher6 и render-review2 checks PASS. Несуществующий путь
  test_promote_candidate.py был ошибочной командой, не выполненным тестом;
  реально выполнены test_cloud_release.py и .github/scripts/test-publish-unity-artifacts.py.
- Два readonly исследования Explorer/QA получены до реализации. Отдельное независимое
  ревью нашло риски HP/stat aliases, array subclasses, Blood Hunter Pact и неизвестного
  исходного класса; исправлены и закреплены тестами. Сессия reviewer закончилась
  лимитом использования, поэтому полного независимого заключения нет; основной
  агент проверил конечные diff, компиляцию, native frames и результаты CI сам.

Publisher [40610549848](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/40610549848)
/job `122560762922` SUCCESS; activation `d2f6d8af`. После публикации основной агент
независимо скачал оба публичных пакета, сверил размеры/SHA256, APK ZIP+ARM64/EXE MZ,
обычный и cache-busted feed44, source/run/artifacts в PUBLIC_DELIVERY.json:
**INDEPENDENT_DELIVERY44_PASS**. Публичный релиз — prerelease, draft=false.

| Пакет | Байт | SHA256 |
|---|---:|---|
| Android ARM64 | 55829692 | e43b1987e5dd8c312e3c8957eae3c4d506e52215ac77e3f99bec3a5ab5b30480 |
| Windows x64 | 39501585 | 886d1eee23bba9125048dc2d0ac4a3c925f350d99ae9f9944f58d19925bfc8b0 |

[Релиз1.00.44](https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.44).
44 опубликована и неизменяема; следующий runtime должен быть новее10044.

## Ручная проверка остаётся

Физический Android **НЕ проверен**. На копии героя после экспорта:
1. NumberPad XP: последняя цифра, подтверждение, начисление/списание, повторное открытие.
2. Мультикласс: требование12 блокирует,13 разрешает; уже взятый класс повышается отдельно.
3. HP/подкласс/ASI: отмена ничего не меняет; подтверждение сохраняется после перезапуска.
4. Свайпы длинного списка, смена героя/экрана при клавиатуре, export/import и backup.

Windows владельца: мышь/колесо/resize, cancel/back, сохранность HP/потраченных ячеек
после повышения. Нативный CI уже проверен, личный ПК владельца — нет. Полный перенос
интерфейса, неподдерживаемых классов и боевых/runtime hooks не объявлен завершённым.
