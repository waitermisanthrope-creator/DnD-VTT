# [НЕ ВЫПОЛНЕНО] 3D-персонаж в приложении — Unity 1.00.37

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
