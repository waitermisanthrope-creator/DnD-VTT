# Расовые текстуры — контрольная точка 2026-10-12

## Подтверждённая база
main e042b69c: собственные кисти/стопы 12 рас. Сохранённая рабочая копия прежнего чата найдена в /workspace/scratch/353dc0162734/project; незакоммиченные изменения относятся к меху, не пакету bitmap-карт. Не переносить их поверх main автоматически.

Предыдущий чат сообщил о 31 карте 1254×1254 и 7 WebGL-проверках. В main, доступных ветках и сохранившихся рабочих файлах эти карты и результаты не обнаружены. Поэтому пакет и исправление масштаба/утечки НЕ считаются завершёнными.

## Последовательные этапы
1. Восстановление: git main и ветки проверены; пакет не найден. DONE.
2. Рептилии: создать карту мелкой чешуи, записать фактическое разрешение/hash; подключить только к коже/новым рептильным частям. IN PROGRESS.
3. Мех/перья: отдельно по группам и обоим полам. TODO.
4. Складчатая кожа/панцирь/металл/особые формы: отдельно по группам. TODO.
5. Регресс: отсутствие расового материала на одежде/оружии/ареале, смена рас, save/reopen, WebGL. TODO.

## Правила продолжения
После каждого этапа: конкретные пути, SHA256 карт, выполненные команды/результаты, ограничения и следующий шаг; commit [skip ci]. Не объявлять 2K/фотореализм/бесшовность без проверки. Не выпускать OTA/APK в рамках восстановления текстур. Не повторять выполненные этапы; не менять классы/карты.

## Исправление изоляции материалов
applySkin теперь исключает headAccessory/customColor, включая editorWeapon/ареал. CHARACTER_3D_EDITOR_TEST_OK; node --check и git diff --check PASS. Визуальная WebGL проверка этого изменения ещё не выполнена. Git push без авторизации; сохранение через GitHub connector.

## Первый новый bitmap — кандидат, не подключён
Imagegen: neutral gray taupe small irregular reptile scales, flat orthographic albedo, uniform diffuse light, seamless edges requested, no text/body/background. Requested 2048², actual 1254×1254. SHA256 d0c33789b73914c8914061dc8c6469d763eb0ec9f0c146230847ba362261eefb. Local candidate: /workspace/scratch/f7120719492c/DnD-VTT/app/assets/3d/race_surfaces/reptile-scales-v1.png; generated original /workspace/scratch/f7120719492c/generated_images/exec-f4190929-06ef-43b2-b27e-beb3f22d8308.png. Image shown in conversation. Bitmap is NOT committed in GitHub and NOT connected to renderer; seam/scale and baked lighting need QA. Keep it a candidate; do not announce 2K/PBR completion. Next step: finalise and persist bitmap, then add independent sampler and skin/native-parts-only triplanar mapping, validate real WebGL.
