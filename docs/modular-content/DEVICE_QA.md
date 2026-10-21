##1.00.10 unlock regression — NOT STARTED physical retest
https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39588198771/artifacts/12340958713
Install over current app. Check Home and Settings: lock/unlock screen five times, Home/background/return; button/card colours and borders persist, current screen/fields preserved. Repeat after opening downloaded map/library (resource unload path). Editor five-cycle test PASS; actual Android graphics-context recreation remains a device check.

##1.00.09 — NOT STARTED device QA
https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39585827400/artifacts/12340015913
Install over1.00.08/1.00.07; verify same splash/menu/wallpaper, offline base creation, workshop, existing saves. Changes only Editor packaging of non-rendering splash metadata. Source pixels and signed APK images checked; same key/package and code10009.

## 1.00.08 manual QA — NOT STARTED
APK: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39518732474/artifacts/12310252576
Install over1.00.07, without deleting app data. Confirm15 PHB race variants/12 PHB classes/SRD Grappler offline; refresh workshop catalog, install Tortle/Blood Hunter/Athlete, create and save hero; download house map and map-surfaces, open actual map and observe texture; restart, remove optional packs and verify saved hero/map survive. Fresh install has no ready maps; previously saved user maps remain. Original-model runtime bundle remains pending, so map objects without models show placeholders.

## Owner device confirmation — 2026-10-21
DONE:1.00.07 Lanternfolk downloaded and appeared in character creation.1.00.08 baseline, optional classes/feats/maps and upgrade QA still pending.

## Android download hotfix1.00.07 — DONE build / PARTIAL device QA
Source746c1435, run39512342453 SUCCESS. [Signed test APK](https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/39512342453/artifacts/12306458856), artifact12306458856. Version1.00.07/code10007/com.dndvtt.unity ARM64, previous signing key retained.51825922 bytes, SHA256 c20079a977280580481d5579d527f6776bbe951785b608407cd3cb3d151da743.93 C# checks,10 Python CI tests and native VTT_WORKSHOP_EDITOR_PASS (real object/material/map persistence integration) PASS; original branding verified. Android uses StatFs, unsupported probes no longer block bounded downloads; lowMemory no longer overwrites operation result. User screenshots confirm old1.00.06 failure;1.00.07 physical-device download/install/restart still requires retest. Install over1.00.06; no uninstall/save deletion required. Main/stable feeds/signing unchanged. See hotfix-1.00.07-metrics.json.

## 2026-10-20 — Android workshop download hotfix (PARTIAL)
User device screenshots demonstrate1.00.06 cannot download: Android IL2CPP does not support DriveInfo.GetDriveFormat. Replaced Android probe with android.os.StatFs on actual workshop path; unavailable probe permits bounded streaming with existing IO/SHA checks. Low-RAM event releases bundle cache without overwriting download errors/results.93 C# and10 Python CI checks PASS. Candidate1.00.07/code10007 pending native build and device retest; no stable feed/save/signing change.

# Ручная Android-проверка — NOT STARTED

Автоматические проверки и сборка не подтверждают отрисовку/управление на телефоне. Публичная лента обновлений не переключается на тестовый APK автоматически.

Перед удалением приложения скопируйте текущий JSON-архив персонажей из штатного «Импорт / экспорт» **во внешний файл вне приложения**. Внутренний .bak и буфер обмена не являются надёжной копией после удаления Android-приложения. Обновление поверх Unity1.00.05 предпочтительно для сохранения локальных данных; WebView имеет другой package name и переносится через JSON.

| Сценарий | Ожидаемый результат | Статус |
|---|---|---|
| Установка поверх Unity1.00.05 | тот же com.dndvtt.unity, прежняя подпись, code10006; персонажи доступны | NOT STARTED |
| Чистый запуск без сети/пакетов | оригинальные обои, логотип, заставка, настройки; базовое создание/лист доступны | NOT STARTED |
| Главное меню/настройки | прежнее оформление; портретное меню и доступ к мастерской/обновлениям | NOT STARTED |
| Обновление каталогов | записи из двух отдельных репозиториев; поиск и категории работают | NOT STARTED |
| Lanternfolk JSON | пакет установлен; «Фонарник» появляется в создании; при базовой dex10 итог dex11; ID/версия в экспорте | NOT STARTED |
| Удаление расы + перезапуск | новая раса исчезает из выбора; созданный герой, имя, характеристики и экспорт сохраняются | NOT STARTED |
| Повторная установка | раса снова доступна без создания дублей | NOT STARTED |
| Маркеры JSON | цилиндр/ящик доступны в «3D-карта → Карты / этажи → Библиотека»; размещение создаёт настоящий объект | NOT STARTED |
| Позиция объекта | размещение в двух клетках по +X от текущего героя; при необходимости повернуть камеру | NOT STARTED |
| Оформление JSON | выбранный материал меняет пол текущего этажа; исходное меню не меняется | NOT STARTED |
| Карта после перезапуска | объекты/покрытия восстанавливаются из сохранённого JSON | NOT STARTED |
| Удалить/переустановить маркеры | заменитель при отсутствии; исходный объект после повторной установки; сохранение не повреждено | NOT STARTED |
| Ошибка сети/повтор | понятное сообщение, прежние пакеты остаются активными, повторная загрузка доступна | NOT STARTED |
| Нехватка места/памяти | загрузка отклоняется без замены рабочей версии; сохраняются профили/карты | NOT STARTED |
| Android текстуры 1024px | мебель читаема с игрового расстояния; нет розовых/пустых материалов и регрессии управления | NOT STARTED |
| AssetBundle | проверять только после публикации совместимого доверенного Android-пакета; отдельный CI artifact пока не публичный runtime-каталог | NOT STARTED |

Не отмечать эти строки DONE по результатам C# тестов или наличию APK. При обнаружении ошибки приложить версию/source SHA, модель телефона/Android и воспроизводимые шаги; не публиковать личные сохранения без согласия владельца.
