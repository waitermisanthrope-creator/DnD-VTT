# [ВЫПОЛНЕНО] Доступ к 3D-персонажу из Unity-приложения — 1.00.37

Выпуск опубликован 24 октября 2026: https://github.com/waitermisanthrope-creator/DnD-VTT/releases/tag/unity-v1.00.37 . Канал экспериментального приложения уже1.00.37/10037. Пользователь обновляется через «Настройки → Обновления → Проверить обновление», затем открывает активную кнопку «3D Персонаж» на главном экране.

Перенесена текущая человеческая база: мужчина/женщина,15 параметров тела, вращение/масштаб/лицо, серый материал и отдельный локальный черновик. Сохранены исходные UV,53 кости,23 морфа,107024 треугольника и две текстуры кожи. Свет предпросмотра независим от карты. Временное бельё использует непересекающиеся части исходной поверхности без дополнительных оболочек; мерцание и окрашивание кистей устранены. Листы/облако/моды/карта не изменялись.

Это завершение первого этапа доступа из приложения. Художественное улучшение до BG3, отдельные глаза, волосы,50+ рас, прежний гардероб и живые анимации пока не перенесены. Физический телефон не проверялся. Просмотрены все шесть реальных GPU thumbnails150x200 из облачной Unity; полные PNG600x800 сохранены в CI artifact12540808828.

Проверенный исходник890453a25233d6d01c17e40c1bc50836edeb7fcb, candidate40044819058. Android120724036968, Windows120728971162 и реальный old1.00.00→37/reinstall/profile/backup/runtime QA120731145471: все SUCCESS. Оба нативных target проходят проверку человеческой геометрии/морфов/масштаба/управления/menu open-close/JSON и972 реальных физических броска кубов; существующие проверки мастерской/данных сохранены. Локально проверены source hashes,44 JS provenance,10 release tests, update/brand/registry contracts и синтаксис59 C# файлов.

Publisher40047215990/job120731593295 SUCCESS; активация каналаaa0a08fb. После публикации независимо скачаны оба публичных установщика, plain/cache-busted feed и PUBLIC_DELIVERY. Проверены версия/source/run, размер/SHA, APK ZIP CRC и ARM64libil2cpp, Windows MZ и прежний APK v2/v3 certificate SHA256c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e. Полная проверка подписи выполнена существующим CI apksigner gate.

- Android:55239586 bytes, SHA256a60e4031bb4e38e27669979234f478e32e58c4c3898399a192aff40b0fc7e4da.
- Windows:39167376 bytes, SHA2565fa76d6fbe7d91edfa6349853fc2b8c4450aecebe856706cc1e9c72244e5a469.
- Локальные доказательства: /workspace/unity37-delivery/verification.json, native-final/review.json и validation-summary.txt.

Версия37 и её бинарники неизменяемы. Следующая runtime-версия должна быть выше10037. WebView/main, MMO, БД и физика кубов не изменялись. Ниже сохранён исторический журнал: слова pending/неуспешно относятся к соответствующим ранним попыткам, а не к опубликованному итоговому кандидату.

## История реализации и неудачных кандидатов до публикации

Владелец попросил открыть подготовленную человеческую базу кнопкой главного
экрана и выпустить обновление установленного экспериментального Unity-клиента.
Предыдущий отдельный проект не был интегрирован в experiment/unity-vtt.

Изменения: активная кнопка «3D Персонаж», нативный RenderTexture-предпросмотр,
мужская/женская формы, 15 параметров тела, камера, серый материал, отдельный
локальный черновик. Листы/облако не изменяются. Волосы, прежний гардероб и другие
расы остаются следующими этапами. Это перенос текущей графической базы, а не
художественная переработка до качества BG3.

Сохранены существующие модели/UV/53 кости/107024 треугольника/23 морфа и две
текстуры кожи. Источник и максимальная ошибка переноса записаны в MorphCatalog.
У модели есть скелет; живые анимации пока не подключены. Отдельный материал с фиксированным студийным освещением; skin/normal/SSS-апгрейд ещё не заявлен.
Предпросмотр изолирован от карты слоем29; ресурсы освобождаются при выходе.
Параметры управляются мышью/касанием; прокрутка меню не забирает drag модели
или ползунков. Новый черновик: character-studio-draft.json, отдельный от профиля.

Локально: исходные44 JS provenance PASS,10 release tests PASS, update/brand/
registry contracts PASS, C# синтаксический разбор PASS. Native Unity-проверки,
Android/Windows-сборки, обновление с1.00.00 и публикация пока ожидаются.

Нативная проверка перед существующей DiceValidation: обе формы, rig/morph/scale,
крайние настройки/конечные координаты, реальные body/face/grey PNG для обоих
полов, отсутствие pink shader, сохранность JSON и открытие/закрытие меню через
реальный контроллер. PNG: Builds/CharacterValidation; CI artifact
Unity-character-previews-<run>. Наличие gate не означает успешный запуск.

Выпуск только через действующий unity-cloud-candidate → paired promotion.
Feed36 и неизменяемые бинарники36 сохраняются до прохождения gates нового37.
Физическая проверка телефона в этой среде недоступна.

Кандидат: source fe45f8e507f8cdc7081498266287da0f4db7ab2a, run40023487314.
Первая попытка40023369116 отменена последующим исправлением безопасного
вызова навигации вне OnGUI; не считать её проверкой доставки.

Попытка40023487314 НЕУСПЕШНА: Unity автоматически разделил70985-вершинный
FBX на два16-bit mesh parts; нативный gate остановился на проверке23 морфов.
Исправление: ModelImporterIndexFormat.UInt32 + проверка единственного
SkinnedMeshRenderer; повторная сборка37 обязательна. C# действительно
скомпилирован, но APK в этой попытке не создан/не опубликован.

Попытка40025305329/source9a485848 тоже НЕУСПЕШНА: native Unity подтвердил
единую сетку/23 морфа, затем остановился на загрузке SkinMale/SkinFemale.
Файлы были импортированы TextureImporter. Добавлены явные Texture2D shape,
полные texture meta и синхронная проверка AssetDatabase/Resources до Play Mode.
Новая попытка обязательна;37 не опубликована.

Текущая повторная попытка: source8ac5e990f1bb9271b506989f63505f623afa78d0,
run40039088834. Статус пока pending/in progress; не считать выпуском.

Попытка40039088834/source8ac5e990 НЕУСПЕШНА: обе кожи успешно загружены
как Texture2D2048x2048 через AssetDatabase и Resources. Native gate затем
отклонил масштаб male после SkinnedMeshRenderer.BakeMesh. Статический
предпросмотр теперь применяет исходные blendshape-дельты напрямую к сетке,
без зависимости от состояния Animator/BakeMesh; иерархия один раз нормализуется
к физической высоте исходного GLB из MorphCatalog.baseHeight. Риг сохранён,
живые анимации по-прежнему не заявлены. Нужна новая полная проверка.

Текущий источник после нормализации осей/единиц и winding:
6b73b6d405c882ae37c203f110aebad3dbb17db6, candidate40040381189.
Промежуточные40040223298 и40040334377 отменены уточнением той же правки;
они не являются успешными проверками/выпусками.

Попытки40040381189 и40041675831 неуспешны: масштаб/геометрия/текстуры
подтверждены, но изображение слишком тёмное (max48/255,0 ярких пикселей).
Диагностика40041675831: камера и все enabled meshes внутри frustum, shader
URP Lit supported. Для предпросмотра введён отдельный shader с фиксированными
key/fill/rim и мягким ambient, независимый от первого кадра URP/main light
и освещения карты. Проверки видимости и pink shader не ослаблены. PNG теперь
сохраняется до assert; небольшие реальные GPU thumbnails включены в лог
для визуального просмотра при недоступности artifact-download-host.
Нужна новая полная нативная проверка; feed36 пока активен.

Candidate40042713150/sourcec1c837de: Android120717257561 SUCCESS, native
character gate PASS (both bodies/faces/grey, rig/scale/morph/controller/JSON),
972 real dice throws and workshop regressions PASS, original signing certificate
retained. Windows120723535747 started but this candidate is superseded before
publication by visual review: actual GPU thumbnails show z-fighting in temporary
coverage shells and height-based shorts colouring hands. Fix assigns every original
triangle to exactly one skin/cloth submesh, limits shorts by pelvis/thigh weights,
and adds native original-triangle-count/no-overlap coverage checks. Geometry
positions/UV/source files unchanged. Must rerun complete candidate; feed36 stays live.
Real reviewed thumbnails: /workspace/unity37-delivery/native (not product art).

Final candidate source890453a25233d6d01c17e40c1bc50836edeb7fcb,
run40044819058 ALL3 SUCCESS: Android120724036968, Windows120728971162,
real1.00.00→37/reinstall/profile/backup/runtime QA120731145471. Both native
character gates and972 dice throws PASS. All six actual GPU thumbnails reviewed:
solid clothing/no z-fighting, hands skin, both body/face/grey visible. Full PNG
artifact12540808828; review evidence /workspace/unity37-delivery/native-final/.
APK55239586 SHAa60e4031bb4e38e27669979234f478e32e58c4c3898399a192aff40b0fc7e4da;
Windows39167376 SHA5fa76d6fbe7d91edfa6349853fc2b8c4450aecebe856706cc1e9c72244e5a469.
Owner-authorized paired publication selected; actual public delivery still pending.
