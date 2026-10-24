# [НЕ ВЫПОЛНЕНО] Текст, режим окна и настройки ПК — Unity1.00.38

Владелец прислал реальный Windows-кадр: все подписи отсутствуют, приложение стартует полноэкранно, настройки узкие. Выпуск37 прошёл headless Windows smoke без графики и не проверял реальную отрисовку UI; предыдущий вывод о достаточности QA был неполным.

Исправления: лицензированный DejaVu Sans включён в Resources и назначается GUI/style/sheet/settings вместо выбора OS font. Windows стартует в изменяемом окне1280×800 с восстановлением после старого fullscreen, естьF11 и кнопки режима окна. Настройки на широком экране1040px/2колонки; мобильная компоновка сохранена. Подписи обновления учитываютWindows.

Новый opt-in DesktopUiSmoke запускается в установленном Windows-player с D3D11WARP без -batchmode/-nographics: реальный GPU/шрифтыCyrillic+Latin+controls, home/all6settings/update-center/resize, разница text-visible/text-hidden кадров, PNG, fullscreen roundtrip. Синтетический профиль/backup хеши должны остаться прежними. Этот verdict обязателен для публикации. Native/old-install/dice/workshop gates сохранены, без ослабления.

Локальные source update/brand/registry contracts и C#syntax PASS. Actual compile/render/upgrade/build/publication PENDING. Не считать исправление доставленным до успешного графического теста и публичной проверки обоих пакетов.37 остаётся неизменной. Встроенный шрифт: Resources/UI/DejaVu-LICENSE.txt. Main/WebView/MMO/DB и арт персонажа не меняются.

Попытка40049434417/sourcef2d4dc22 FAILED до компиляции: Unity6000.3.26f1 не содержит пакетаcom.unity.modules.textrendering. Ошибочная гипотеза об отдельном модуле снята, зависимость удалена. Основная правка — встроенный динамический шрифт, явное назначение всем GUI-стилям и данные шрифта в сборке — сохранена. Нужен новый полный прогон;37 остаётся опубликованной. Ранниеac67e677/3f034655 отменены до полноценной проверки.
