# DnD-VTT — полный атлас проекта

Снимок кода 4d548ffbb29f. Git содержит 1354 файлов.
Роль неочевидных файлов предварительно определена по пути/имени; перед изменением читай исходник.

## Стандарт для всех ИИ и разработчиков

- Перед созданием файла ищи существующий модуль по назначению и имени.
- Перед созданием переменной ищи её и синонимы в реестре ниже.
- Главный объект персонажа — currentChar в app/app.js; window.currentCharacter — совместимый алиас.
- Канонический формат НОВЫХ полей HP: hpCurrent, hpMax, hpTemp. Унаследованные hp, hp.current, hitPoints, currentHP, maxHp и tempHp не удалять без полной миграции данных.
- Ресурсы/состояния класса: currentChar.resources и currentChar.classFeaturesState; бой — currentChar.encounters, currentChar.initiativeTracker.
- Сохранения: app/app.js; облачный аккаунт: app/cloud_sync.js и app/cloud_account.js; существующий ключ dnd_multi_characters_v2.
- Перед рефакторингом проверять реальные вызовы, загрузку из index.html, сохранения и тесты Android + Windows.
- 00_AI_PROJECT_GUIDE.md и 01_plansforproject.md сохраняются; атлас не заменяет эти документы.
- Имена определены статическим поиском, не JS AST: динамические поля и нестандартная деструктуризация могут быть не найдены. Из похожих имён НЕ следует, что одно можно удалить.

## Каждый файл в репозитории

| Полный путь | Размер | Назначение и роль |
|---|---:|---|
| №0001 .github/ai-control.json | 255 B | данные/конфигурация: ai control |
| №0002 .github/prompts/autonomous-development.md | 1259 B | документация или отчёт: autonomous development |
| №0003 .github/workflows/android-debug.yml | 4175 B | автоматизация GitHub Actions: android debug |
| №0004 .github/workflows/android-release.yml | 8160 B | автоматизация GitHub Actions: android release |
| №0005 .github/workflows/autonomous-development.yml | 4534 B | автоматизация GitHub Actions: autonomous development |
| №0006 .github/workflows/build-windows-desktop.yml | 1449 B | автоматизация GitHub Actions: build windows desktop |
| №0007 .github/workflows/cloud-test-build.yml | 3468 B | автоматизация GitHub Actions: cloud test build |
| №0008 .github/workflows/convert-remaining-furniture.yml | 1964 B | автоматизация GitHub Actions: convert remaining furniture |
| №0009 .github/workflows/deploy-pages.yml | 3633 B | автоматизация GitHub Actions: deploy pages |
| №0010 .github/workflows/human-glb-audit.yml | 931 B | автоматизация GitHub Actions: human glb audit |
| №0011 .github/workflows/import-root-furniture.yml | 3572 B | автоматизация GitHub Actions: import root furniture |
| №0012 .github/workflows/map-ui-stage-qa.yml | 776 B | автоматизация GitHub Actions: map ui stage qa |
| №0013 .github/workflows/project-atlas.yml | 953 B | автоматическое обновление атласа на GitHub |
| №0014 .github/workflows/publish-stress-map-ota.yml | 455 B | автоматизация GitHub Actions: publish stress map ota |
| №0015 .github/workflows/refresh-update-manifest.yml | 540 B | автоматизация GitHub Actions: refresh update manifest |
| №0016 .github/workflows/test-gltf-loader.yml | 717 B | автоматизация GitHub Actions: test gltf loader |
| №0017 .github/workflows/test-stair-navigation.yml | 752 B | автоматизация GitHub Actions: test stair navigation |
| №0018 .github/workflows/unified-release.yml | 14076 B | автоматизация GitHub Actions: unified release |
| №0019 .github/workflows/unpack-project.yml | 2987 B | автоматизация GitHub Actions: unpack project |
| №0020 .github/workflows/validate-imported-glb.yml | 2317 B | автоматизация GitHub Actions: validate imported glb |
| №0021 .gitignore | 352 B | вспомогательный файл: .gitignore |
| №0022 00_AI_PROJECT_GUIDE.md | 1108812 B | существующее руководство ИИ, не перезаписывать |
| №0023 01_plansforproject.md | 62054 B | план целей и критериев выполнения |
| №0024 1790622696215.png | 1202179 B | текстура/изображение: 1790622696215 |
| №0025 1790622844831.png | 104000 B | текстура/изображение: 1790622844831 |
| №0026 1790718758545.png | 1889164 B | текстура/изображение: 1790718758545 |
| №0027 1790788500741.png | 1468216 B | текстура/изображение: 1790788500741 |
| №0028 3D_CHARACTER_CLOTHING_PROGRESS.md | 84856 B | документация или отчёт: 3D CHARACTER CLOTHING PROGRESS |
| №0029 3D_CHARACTER_RACES_PROGRESS.md | 75599 B | документация или отчёт: 3D CHARACTER RACES PROGRESS |
| №0030 AGENTS.md | 4903 B | документация или отчёт: AGENTS |
| №0031 AI_BLOCKERS.md | 3416 B | документация или отчёт: AI BLOCKERS |
| №0032 AI_NEXT_TASK.md | 4602 B | документация или отчёт: AI NEXT TASK |
| №0033 AI_PROGRESS.md | 26524 B | документация или отчёт: AI PROGRESS |
| №0034 android/.gitignore | 44 B | Android компонент: .gitignore |
| №0035 android/app/build.gradle | 4122 B | Android компонент: build |
| №0036 android/app/src/main/AndroidManifest.xml | 12250 B | Android компонент: AndroidManifest |
| №0037 android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java | 34871 B | Android: bridge обновлений |
| №0038 android/app/src/main/java/com/dndvtt/app/MainActivity.java | 7574 B | Android: запуск WebView |
| №0039 android/app/src/main/res/values-v31/styles.xml | 527 B | Android компонент: styles |
| №0040 android/app/src/main/res/values/styles.xml | 407 B | Android компонент: styles |
| №0041 android/build.gradle | 73 B | Android компонент: build |
| №0042 android/gradle.properties | 106 B | Android компонент: gradle |
| №0043 android/README.md | 685 B | документация или отчёт: README |
| №0044 android/settings.gradle | 333 B | Android компонент: settings |
| №0045 app/3dmap/assets/clothing/fantasy-materials.webp | 434234 B | компонент 3D карты/редактора: fantasy materials |
| №0046 app/3dmap/assets/clothing/lingerie-nylon.webp | 289830 B | компонент 3D карты/редактора: lingerie nylon |
| №0047 app/3dmap/character_anatomy_geometry.js | 22797 B | компонент 3D карты/редактора: character anatomy geometry |
| №0048 app/3dmap/character_anatomy.js | 8424 B | компонент 3D карты/редактора: character anatomy |
| №0049 app/3dmap/character_appearance_store.js | 2619 B | компонент 3D карты/редактора: character appearance store |
| №0050 app/3dmap/character_body_geometry.js | 120619 B | компонент 3D карты/редактора: character body geometry |
| №0051 app/3dmap/character_clothing.js | 51618 B | компонент 3D карты/редактора: character clothing |
| №0052 app/3dmap/character_editor_3d.js | 166537 B | компонент 3D карты/редактора: character editor 3d |
| №0053 app/3dmap/character_morph_assets.js | 3322 B | компонент 3D карты/редактора: character morph assets |
| №0054 app/3dmap/character_pose.js | 4749 B | компонент 3D карты/редактора: character pose |
| №0055 app/3dmap/character_system.js | 49923 B | компонент 3D карты/редактора: character system |
| №0056 app/3dmap/gltf_catalog.js | 90502 B | компонент 3D карты/редактора: gltf catalog |
| №0057 app/3dmap/gltf_character_pipeline.js | 7811 B | компонент 3D карты/редактора: gltf character pipeline |
| №0058 app/3dmap/gltf_loader.js | 10027 B | компонент 3D карты/редактора: gltf loader |
| №0059 app/3dmap/map_editor.js | 45829 B | компонент 3D карты/редактора: map editor |
| №0060 app/3dmap/map_model.js | 7783 B | компонент 3D карты/редактора: map model |
| №0061 app/3dmap/map_renderer_2d.js | 7331 B | компонент 3D карты/редактора: map renderer 2d |
| №0062 app/3dmap/map_renderer_3d.js | 23969 B | компонент 3D карты/редактора: map renderer 3d |
| №0063 app/3dmap/map_world.js | 9119 B | компонент 3D карты/редактора: map world |
| №0064 app/3dmap/stair_navigation.js | 932 B | компонент 3D карты/редактора: stair navigation |
| №0065 app/3dmap/stress_map.js | 3272 B | компонент 3D карты/редактора: stress map |
| №0066 app/accursed_oap_v11_runtime.js | 31365 B | логический модуль: accursed oap v11 runtime |
| №0067 app/alchemist_mhp_2024_runtime.js | 140155 B | логический модуль: alchemist mhp 2024 runtime |
| №0068 app/alchemy_engine_v29.js | 40901 B | логический модуль: alchemy engine v29 |
| №0069 app/alchemy_gameplay_v30.js | 17859 B | логический модуль: alchemy gameplay v30 |
| №0070 app/alchemy_gathering_professions_v52.js | 11833 B | логический модуль: alchemy gathering professions v52 |
| №0071 app/Ambiences.js | 14648 B | логический модуль: Ambiences |
| №0072 app/app.js | 37183 B | главный контроллер; currentChar и все персонажи |
| №0073 app/armors.js | 27349 B | логический модуль: armors |
| №0074 app/assets/3d/makehuman/editor-morphs.bin | 2340320 B | ассет графики/3D/интерфейса: editor morphs |
| №0075 app/assets/3d/makehuman/editor-morphs.json | 11573 B | ассет графики/3D/интерфейса: editor morphs |
| №0076 app/assets/3d/makehuman/human-body-morphs.glb | 12671780 B | ассет графики/3D/интерфейса: human body morphs |
| №0077 app/assets/3d/makehuman/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №0078 app/assets/3d/makehuman/materials/skin_color_detail_v1.png | 2922380 B | ассет графики/3D/интерфейса: skin color detail v1 |
| №0079 app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png | 22965 B | ассет графики/3D/интерфейса: skin micro normal roughness |
| №0080 app/assets/3d/makehuman/README.md | 1510 B | документация или отчёт: README |
| №0081 app/assets/3d/makehuman/skins/young_caucasian_female/young_caucasian_female.mhmat | 1464 B | ассет графики/3D/интерфейса: young caucasian female |
| №0082 app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png | 4391156 B | ассет графики/3D/интерфейса: young lightskinned female diffuse |
| №0083 app/assets/3d/makehuman/skins/young_caucasian_male/young_caucasian_male.mhmat | 1462 B | ассет графики/3D/интерфейса: young caucasian male |
| №0084 app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png | 3693828 B | ассет графики/3D/интерфейса: young lightskinned male diffuse |
| №0085 app/assets/3d/quaternius/models/Anvil_Log.bin | 130880 B | ассет графики/3D/интерфейса: Anvil Log |
| №0086 app/assets/3d/quaternius/models/Anvil_Log.gltf | 5580 B | ассет графики/3D/интерфейса: Anvil Log |
| №0087 app/assets/3d/quaternius/models/Anvil.bin | 24020 B | ассет графики/3D/интерфейса: Anvil |
| №0088 app/assets/3d/quaternius/models/Anvil.gltf | 3189 B | ассет графики/3D/интерфейса: Anvil |
| №0089 app/assets/3d/quaternius/models/Axe_Bronze.bin | 31156 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0090 app/assets/3d/quaternius/models/Axe_Bronze.gltf | 2591 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0091 app/assets/3d/quaternius/models/Bag.bin | 27188 B | ассет графики/3D/интерфейса: Bag |
| №0092 app/assets/3d/quaternius/models/Bag.gltf | 4318 B | ассет графики/3D/интерфейса: Bag |
| №0093 app/assets/3d/quaternius/models/Banner_1_Cloth.bin | 6636 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0094 app/assets/3d/quaternius/models/Banner_1_Cloth.gltf | 4670 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0095 app/assets/3d/quaternius/models/Banner_1.bin | 20976 B | ассет графики/3D/интерфейса: Banner 1 |
| №0096 app/assets/3d/quaternius/models/Banner_1.gltf | 6789 B | ассет графики/3D/интерфейса: Banner 1 |
| №0097 app/assets/3d/quaternius/models/Banner_2_Cloth.bin | 4940 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0098 app/assets/3d/quaternius/models/Banner_2_Cloth.gltf | 4671 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0099 app/assets/3d/quaternius/models/Banner_2.bin | 19280 B | ассет графики/3D/интерфейса: Banner 2 |
| №0100 app/assets/3d/quaternius/models/Banner_2.gltf | 6788 B | ассет графики/3D/интерфейса: Banner 2 |
| №0101 app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0102 app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6241 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0103 app/assets/3d/quaternius/models/Barrel_Holder.bin | 161816 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0104 app/assets/3d/quaternius/models/Barrel_Holder.gltf | 4347 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0105 app/assets/3d/quaternius/models/Barrel.bin | 57144 B | ассет графики/3D/интерфейса: Barrel |
| №0106 app/assets/3d/quaternius/models/Barrel.gltf | 4311 B | ассет графики/3D/интерфейса: Barrel |
| №0107 app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0108 app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0109 app/assets/3d/quaternius/models/Bed_Twin2.bin | 76624 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0110 app/assets/3d/quaternius/models/Bed_Twin2.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0111 app/assets/3d/quaternius/models/Bench.bin | 19304 B | ассет графики/3D/интерфейса: Bench |
| №0112 app/assets/3d/quaternius/models/Bench.gltf | 4298 B | ассет графики/3D/интерфейса: Bench |
| №0113 app/assets/3d/quaternius/models/Book_5.bin | 5856 B | ассет графики/3D/интерфейса: Book 5 |
| №0114 app/assets/3d/quaternius/models/Book_5.gltf | 2403 B | ассет графики/3D/интерфейса: Book 5 |
| №0115 app/assets/3d/quaternius/models/Book_7.bin | 32664 B | ассет графики/3D/интерфейса: Book 7 |
| №0116 app/assets/3d/quaternius/models/Book_7.gltf | 4290 B | ассет графики/3D/интерфейса: Book 7 |
| №0117 app/assets/3d/quaternius/models/Book_Simplified_Single.bin | 3192 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0118 app/assets/3d/quaternius/models/Book_Simplified_Single.gltf | 2428 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0119 app/assets/3d/quaternius/models/Book_Stack_1.bin | 12768 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0120 app/assets/3d/quaternius/models/Book_Stack_1.gltf | 2418 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0121 app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0122 app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4309 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0123 app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0124 app/assets/3d/quaternius/models/Bookcase_2.gltf | 4329 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0125 app/assets/3d/quaternius/models/BookGroup_Medium_1.bin | 25536 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0126 app/assets/3d/quaternius/models/BookGroup_Medium_1.gltf | 2429 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0127 app/assets/3d/quaternius/models/BookGroup_Medium_2.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0128 app/assets/3d/quaternius/models/BookGroup_Medium_2.gltf | 2431 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0129 app/assets/3d/quaternius/models/BookGroup_Medium_3.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0130 app/assets/3d/quaternius/models/BookGroup_Medium_3.gltf | 2432 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0131 app/assets/3d/quaternius/models/BookGroup_Small_1.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0132 app/assets/3d/quaternius/models/BookGroup_Small_1.gltf | 2423 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0133 app/assets/3d/quaternius/models/BookGroup_Small_2.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0134 app/assets/3d/quaternius/models/BookGroup_Small_2.gltf | 2426 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0135 app/assets/3d/quaternius/models/BookGroup_Small_3.bin | 7980 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0136 app/assets/3d/quaternius/models/BookGroup_Small_3.gltf | 2424 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0137 app/assets/3d/quaternius/models/BookStand.bin | 62020 B | ассет графики/3D/интерфейса: BookStand |
| №0138 app/assets/3d/quaternius/models/BookStand.gltf | 2223 B | ассет графики/3D/интерфейса: BookStand |
| №0139 app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0140 app/assets/3d/quaternius/models/Bottle_1.gltf | 2413 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0141 app/assets/3d/quaternius/models/Bucket_Metal.bin | 18824 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0142 app/assets/3d/quaternius/models/Bucket_Metal.gltf | 2206 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0143 app/assets/3d/quaternius/models/Bucket_Wooden_1.bin | 32544 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0144 app/assets/3d/quaternius/models/Bucket_Wooden_1.gltf | 3911 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0145 app/assets/3d/quaternius/models/Cabinet.bin | 114768 B | ассет графики/3D/интерфейса: Cabinet |
| №0146 app/assets/3d/quaternius/models/Cabinet.gltf | 4324 B | ассет графики/3D/интерфейса: Cabinet |
| №0147 app/assets/3d/quaternius/models/Cage_Small.bin | 171848 B | ассет графики/3D/интерфейса: Cage Small |
| №0148 app/assets/3d/quaternius/models/Cage_Small.gltf | 2207 B | ассет графики/3D/интерфейса: Cage Small |
| №0149 app/assets/3d/quaternius/models/Candle_1.bin | 6200 B | ассет графики/3D/интерфейса: Candle 1 |
| №0150 app/assets/3d/quaternius/models/Candle_1.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 1 |
| №0151 app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | ассет графики/3D/интерфейса: Candle 2 |
| №0152 app/assets/3d/quaternius/models/Candle_2.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 2 |
| №0153 app/assets/3d/quaternius/models/CandleStick_Stand.bin | 226228 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0154 app/assets/3d/quaternius/models/CandleStick_Stand.gltf | 4347 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0155 app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0156 app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 3900 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0157 app/assets/3d/quaternius/models/CandleStick.bin | 21436 B | ассет графики/3D/интерфейса: CandleStick |
| №0158 app/assets/3d/quaternius/models/CandleStick.gltf | 2199 B | ассет графики/3D/интерфейса: CandleStick |
| №0159 app/assets/3d/quaternius/models/Carrot.bin | 22244 B | ассет графики/3D/интерфейса: Carrot |
| №0160 app/assets/3d/quaternius/models/Carrot.gltf | 2411 B | ассет графики/3D/интерфейса: Carrot |
| №0161 app/assets/3d/quaternius/models/Cauldron.bin | 62712 B | ассет графики/3D/интерфейса: Cauldron |
| №0162 app/assets/3d/quaternius/models/Cauldron.gltf | 2195 B | ассет графики/3D/интерфейса: Cauldron |
| №0163 app/assets/3d/quaternius/models/Chain_Coil.bin | 193664 B | ассет графики/3D/интерфейса: Chain Coil |
| №0164 app/assets/3d/quaternius/models/Chain_Coil.gltf | 2424 B | ассет графики/3D/интерфейса: Chain Coil |
| №0165 app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | ассет графики/3D/интерфейса: Chair 1 |
| №0166 app/assets/3d/quaternius/models/Chair_1.gltf | 4312 B | ассет графики/3D/интерфейса: Chair 1 |
| №0167 app/assets/3d/quaternius/models/Chalice.bin | 15644 B | ассет графики/3D/интерфейса: Chalice |
| №0168 app/assets/3d/quaternius/models/Chalice.gltf | 2197 B | ассет графики/3D/интерфейса: Chalice |
| №0169 app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | ассет графики/3D/интерфейса: Chandelier |
| №0170 app/assets/3d/quaternius/models/Chandelier.gltf | 6259 B | ассет графики/3D/интерфейса: Chandelier |
| №0171 app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | ассет графики/3D/интерфейса: Chest Wood |
| №0172 app/assets/3d/quaternius/models/Chest_Wood.gltf | 21402 B | ассет графики/3D/интерфейса: Chest Wood |
| №0173 app/assets/3d/quaternius/models/Coin_Pile_2.bin | 52612 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0174 app/assets/3d/quaternius/models/Coin_Pile_2.gltf | 2429 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0175 app/assets/3d/quaternius/models/Coin_Pile.bin | 47520 B | ассет графики/3D/интерфейса: Coin Pile |
| №0176 app/assets/3d/quaternius/models/Coin_Pile.gltf | 2424 B | ассет графики/3D/интерфейса: Coin Pile |
| №0177 app/assets/3d/quaternius/models/Coin.bin | 14464 B | ассет графики/3D/интерфейса: Coin |
| №0178 app/assets/3d/quaternius/models/Coin.gltf | 2408 B | ассет графики/3D/интерфейса: Coin |
| №0179 app/assets/3d/quaternius/models/Crate_Metal.bin | 126828 B | ассет графики/3D/интерфейса: Crate Metal |
| №0180 app/assets/3d/quaternius/models/Crate_Metal.gltf | 4335 B | ассет графики/3D/интерфейса: Crate Metal |
| №0181 app/assets/3d/quaternius/models/Crate_Wooden.bin | 66496 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0182 app/assets/3d/quaternius/models/Crate_Wooden.gltf | 4412 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0183 app/assets/3d/quaternius/models/Dummy.bin | 80988 B | ассет графики/3D/интерфейса: Dummy |
| №0184 app/assets/3d/quaternius/models/Dummy.gltf | 5570 B | ассет графики/3D/интерфейса: Dummy |
| №0185 app/assets/3d/quaternius/models/FarmCrate_Apple.bin | 134488 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0186 app/assets/3d/quaternius/models/FarmCrate_Apple.gltf | 6263 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0187 app/assets/3d/quaternius/models/FarmCrate_Carrot.bin | 204292 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0188 app/assets/3d/quaternius/models/FarmCrate_Carrot.gltf | 6273 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0189 app/assets/3d/quaternius/models/FarmCrate_Empty.bin | 54704 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0190 app/assets/3d/quaternius/models/FarmCrate_Empty.gltf | 3915 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0191 app/assets/3d/quaternius/models/Key_Gold.bin | 58636 B | ассет графики/3D/интерфейса: Key Gold |
| №0192 app/assets/3d/quaternius/models/Key_Gold.gltf | 2424 B | ассет графики/3D/интерфейса: Key Gold |
| №0193 app/assets/3d/quaternius/models/Key_Metal.bin | 19340 B | ассет графики/3D/интерфейса: Key Metal |
| №0194 app/assets/3d/quaternius/models/Key_Metal.gltf | 2197 B | ассет графики/3D/интерфейса: Key Metal |
| №0195 app/assets/3d/quaternius/models/Lantern_Wall.bin | 120036 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0196 app/assets/3d/quaternius/models/Lantern_Wall.gltf | 2203 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0197 app/assets/3d/quaternius/models/Mug.bin | 12488 B | ассет графики/3D/интерфейса: Mug |
| №0198 app/assets/3d/quaternius/models/Mug.gltf | 3881 B | ассет графики/3D/интерфейса: Mug |
| №0199 app/assets/3d/quaternius/models/Nightstand_Shelf.bin | 21412 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0200 app/assets/3d/quaternius/models/Nightstand_Shelf.gltf | 2447 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0201 app/assets/3d/quaternius/models/Peg_Rack.bin | 26672 B | ассет графики/3D/интерфейса: Peg Rack |
| №0202 app/assets/3d/quaternius/models/Peg_Rack.gltf | 3879 B | ассет графики/3D/интерфейса: Peg Rack |
| №0203 app/assets/3d/quaternius/models/Pickaxe_Bronze.bin | 30736 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0204 app/assets/3d/quaternius/models/Pickaxe_Bronze.gltf | 2425 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0205 app/assets/3d/quaternius/models/Pot_1_Lid.bin | 46120 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0206 app/assets/3d/quaternius/models/Pot_1_Lid.gltf | 2196 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0207 app/assets/3d/quaternius/models/Pot_1.bin | 37160 B | ассет графики/3D/интерфейса: Pot 1 |
| №0208 app/assets/3d/quaternius/models/Pot_1.gltf | 2185 B | ассет графики/3D/интерфейса: Pot 1 |
| №0209 app/assets/3d/quaternius/models/Potion_1.bin | 18200 B | ассет графики/3D/интерфейса: Potion 1 |
| №0210 app/assets/3d/quaternius/models/Potion_1.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 1 |
| №0211 app/assets/3d/quaternius/models/Potion_2.bin | 19672 B | ассет графики/3D/интерфейса: Potion 2 |
| №0212 app/assets/3d/quaternius/models/Potion_2.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 2 |
| №0213 app/assets/3d/quaternius/models/Potion_4.bin | 22536 B | ассет графики/3D/интерфейса: Potion 4 |
| №0214 app/assets/3d/quaternius/models/Potion_4.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 4 |
| №0215 app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | ассет графики/3D/интерфейса: Pouch Large |
| №0216 app/assets/3d/quaternius/models/Pouch_Large.gltf | 4306 B | ассет графики/3D/интерфейса: Pouch Large |
| №0217 app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | ассет графики/3D/интерфейса: Rope 1 |
| №0218 app/assets/3d/quaternius/models/Rope_1.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 1 |
| №0219 app/assets/3d/quaternius/models/Rope_2.bin | 34904 B | ассет графики/3D/интерфейса: Rope 2 |
| №0220 app/assets/3d/quaternius/models/Rope_2.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 2 |
| №0221 app/assets/3d/quaternius/models/Rope_3.bin | 41624 B | ассет графики/3D/интерфейса: Rope 3 |
| №0222 app/assets/3d/quaternius/models/Rope_3.gltf | 2225 B | ассет графики/3D/интерфейса: Rope 3 |
| №0223 app/assets/3d/quaternius/models/Scroll_1.bin | 20112 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0224 app/assets/3d/quaternius/models/Scroll_1.gltf | 3954 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0225 app/assets/3d/quaternius/models/Scroll_2.bin | 28392 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0226 app/assets/3d/quaternius/models/Scroll_2.gltf | 3968 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0227 app/assets/3d/quaternius/models/Shelf_Arch.bin | 64836 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0228 app/assets/3d/quaternius/models/Shelf_Arch.gltf | 4332 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0229 app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0230 app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2224 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0231 app/assets/3d/quaternius/models/Shelf_Small_Bottles.bin | 229484 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0232 app/assets/3d/quaternius/models/Shelf_Small_Bottles.gltf | 6266 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0233 app/assets/3d/quaternius/models/Shield_Wooden.bin | 64184 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0234 app/assets/3d/quaternius/models/Shield_Wooden.gltf | 6243 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0235 app/assets/3d/quaternius/models/SmallBottle.bin | 5700 B | ассет графики/3D/интерфейса: SmallBottle |
| №0236 app/assets/3d/quaternius/models/SmallBottle.gltf | 2392 B | ассет графики/3D/интерфейса: SmallBottle |
| №0237 app/assets/3d/quaternius/models/SmallBottles_1.bin | 20556 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0238 app/assets/3d/quaternius/models/SmallBottles_1.gltf | 2423 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0239 app/assets/3d/quaternius/models/Stall_Cart_Empty.bin | 237264 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0240 app/assets/3d/quaternius/models/Stall_Cart_Empty.gltf | 6857 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0241 app/assets/3d/quaternius/models/Stall_Empty.bin | 88176 B | ассет графики/3D/интерфейса: Stall Empty |
| №0242 app/assets/3d/quaternius/models/Stall_Empty.gltf | 6804 B | ассет графики/3D/интерфейса: Stall Empty |
| №0243 app/assets/3d/quaternius/models/Stool.bin | 11472 B | ассет графики/3D/интерфейса: Stool |
| №0244 app/assets/3d/quaternius/models/Stool.gltf | 2423 B | ассет графики/3D/интерфейса: Stool |
| №0245 app/assets/3d/quaternius/models/Sword_Bronze.bin | 69920 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0246 app/assets/3d/quaternius/models/Sword_Bronze.gltf | 2436 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0247 app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | ассет графики/3D/интерфейса: Table Fork |
| №0248 app/assets/3d/quaternius/models/Table_Fork.gltf | 2189 B | ассет графики/3D/интерфейса: Table Fork |
| №0249 app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | ассет графики/3D/интерфейса: Table Knife |
| №0250 app/assets/3d/quaternius/models/Table_Knife.gltf | 2186 B | ассет графики/3D/интерфейса: Table Knife |
| №0251 app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | ассет графики/3D/интерфейса: Table Large |
| №0252 app/assets/3d/quaternius/models/Table_Large.gltf | 4316 B | ассет графики/3D/интерфейса: Table Large |
| №0253 app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | ассет графики/3D/интерфейса: Table Plate |
| №0254 app/assets/3d/quaternius/models/Table_Plate.gltf | 2199 B | ассет графики/3D/интерфейса: Table Plate |
| №0255 app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | ассет графики/3D/интерфейса: Table Spoon |
| №0256 app/assets/3d/quaternius/models/Table_Spoon.gltf | 2191 B | ассет графики/3D/интерфейса: Table Spoon |
| №0257 app/assets/3d/quaternius/models/Torch_Metal.bin | 39100 B | ассет графики/3D/интерфейса: Torch Metal |
| №0258 app/assets/3d/quaternius/models/Torch_Metal.gltf | 2203 B | ассет графики/3D/интерфейса: Torch Metal |
| №0259 app/assets/3d/quaternius/models/Vase_2.bin | 21188 B | ассет графики/3D/интерфейса: Vase 2 |
| №0260 app/assets/3d/quaternius/models/Vase_2.gltf | 2407 B | ассет графики/3D/интерфейса: Vase 2 |
| №0261 app/assets/3d/quaternius/models/Vase_4.bin | 22028 B | ассет графики/3D/интерфейса: Vase 4 |
| №0262 app/assets/3d/quaternius/models/Vase_4.gltf | 2412 B | ассет графики/3D/интерфейса: Vase 4 |
| №0263 app/assets/3d/quaternius/models/Vase_Rubble_Medium.bin | 85960 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0264 app/assets/3d/quaternius/models/Vase_Rubble_Medium.gltf | 2453 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0265 app/assets/3d/quaternius/models/WeaponStand.bin | 76312 B | ассет графики/3D/интерфейса: WeaponStand |
| №0266 app/assets/3d/quaternius/models/WeaponStand.gltf | 3903 B | ассет графики/3D/интерфейса: WeaponStand |
| №0267 app/assets/3d/quaternius/models/Whetstone.bin | 59280 B | ассет графики/3D/интерфейса: Whetstone |
| №0268 app/assets/3d/quaternius/models/Whetstone.gltf | 6212 B | ассет графики/3D/интерфейса: Whetstone |
| №0269 app/assets/3d/quaternius/models/Workbench_Drawers.bin | 16824 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0270 app/assets/3d/quaternius/models/Workbench_Drawers.gltf | 4313 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0271 app/assets/3d/quaternius/models/Workbench.bin | 63408 B | ассет графики/3D/интерфейса: Workbench |
| №0272 app/assets/3d/quaternius/models/Workbench.gltf | 4318 B | ассет графики/3D/интерфейса: Workbench |
| №0273 app/assets/3d/quaternius/textures/T_Page_Noise.png | 7486734 B | ассет графики/3D/интерфейса: T Page Noise |
| №0274 app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png | 1936754 B | ассет графики/3D/интерфейса: T Trim Cloth BaseColor |
| №0275 app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png | 3920858 B | ассет графики/3D/интерфейса: T Trim Cloth Normal |
| №0276 app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png | 623426 B | ассет графики/3D/интерфейса: T Trim Cloth ORM |
| №0277 app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png | 2232961 B | ассет графики/3D/интерфейса: T Trim Furniture BaseColor |
| №0278 app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png | 3485710 B | ассет графики/3D/интерфейса: T Trim Furniture Normal |
| №0279 app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png | 2064585 B | ассет графики/3D/интерфейса: T Trim Furniture ORM |
| №0280 app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png | 1361221 B | ассет графики/3D/интерфейса: T Trim Metal BaseColor |
| №0281 app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png | 3625541 B | ассет графики/3D/интерфейса: T Trim Metal Normal |
| №0282 app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png | 1871475 B | ассет графики/3D/интерфейса: T Trim Metal ORM |
| №0283 app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png | 2263132 B | ассет графики/3D/интерфейса: T Trim Props BaseColor |
| №0284 app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png | 4441458 B | ассет графики/3D/интерфейса: T Trim Props Normal |
| №0285 app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png | 3017151 B | ассет графики/3D/интерфейса: T Trim Props ORM |
| №0286 app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp | 510226 B | ассет графики/3D/интерфейса: bird contour feathers v1 |
| №0287 app/assets/3d/race_surfaces/flight-feather-vane-v1.webp | 555662 B | ассет графики/3D/интерфейса: flight feather vane v1 |
| №0288 app/assets/3d/race_surfaces/mammal-underfur-v1.webp | 544064 B | ассет графики/3D/интерфейса: mammal underfur v1 |
| №0289 app/assets/3d/race_surfaces/reptile-scales-v1.webp | 730360 B | ассет графики/3D/интерфейса: reptile scales v1 |
| №0290 app/assets/3d/user_furniture/altar_table.glb | 36228 B | ассет графики/3D/интерфейса: altar table |
| №0291 app/assets/3d/user_furniture/apothecary_jar_shelf.glb | 106668 B | ассет графики/3D/интерфейса: apothecary jar shelf |
| №0292 app/assets/3d/user_furniture/apothecary_shelf.glb | 107148 B | ассет графики/3D/интерфейса: apothecary shelf |
| №0293 app/assets/3d/user_furniture/armour_stand.glb | 16340 B | ассет графики/3D/интерфейса: armour stand |
| №0294 app/assets/3d/user_furniture/banner_pole.glb | 17136 B | ассет графики/3D/интерфейса: banner pole |
| №0295 app/assets/3d/user_furniture/bed.glb | 5718760 B | ассет графики/3D/интерфейса: bed |
| №0296 app/assets/3d/user_furniture/book_chest.glb | 45816 B | ассет графики/3D/интерфейса: book chest |
| №0297 app/assets/3d/user_furniture/book_press.glb | 59492 B | ассет графики/3D/интерфейса: book press |
| №0298 app/assets/3d/user_furniture/bookshelf.glb | 7818348 B | ассет графики/3D/интерфейса: bookshelf |
| №0299 app/assets/3d/user_furniture/bread_oven.glb | 45200 B | ассет графики/3D/интерфейса: bread oven |
| №0300 app/assets/3d/user_furniture/brewhouse_tun.glb | 68616 B | ассет графики/3D/интерфейса: brewhouse tun |
| №0301 app/assets/3d/user_furniture/candle_stand.glb | 21372 B | ассет графики/3D/интерфейса: candle stand |
| №0302 app/assets/3d/user_furniture/chained_library_desk.glb | 190612 B | ассет графики/3D/интерфейса: chained library desk |
| №0303 app/assets/3d/user_furniture/chair.glb | 4643004 B | ассет графики/3D/интерфейса: chair |
| №0304 app/assets/3d/user_furniture/closet.glb | 6550260 B | ассет графики/3D/интерфейса: closet |
| №0305 app/assets/3d/user_furniture/commode.glb | 4845868 B | ассет графики/3D/интерфейса: commode |
| №0306 app/assets/3d/user_furniture/cooking_cauldron.glb | 34300 B | ассет графики/3D/интерфейса: cooking cauldron |
| №0307 app/assets/3d/user_furniture/crate_stack.glb | 39644 B | ассет графики/3D/интерфейса: crate stack |
| №0308 app/assets/3d/user_furniture/dormitory_cot.glb | 70976 B | ассет графики/3D/интерфейса: dormitory cot |
| №0309 app/assets/3d/user_furniture/finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: finished codex |
| №0310 app/assets/3d/user_furniture/gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: gold leaf cushion |
| №0311 app/assets/3d/user_furniture/hand_cart.glb | 75012 B | ассет графики/3D/интерфейса: hand cart |
| №0312 app/assets/3d/user_furniture/hanging_oil_lamp.glb | 50924 B | ассет графики/3D/интерфейса: hanging oil lamp |
| №0313 app/assets/3d/user_furniture/hitching_post.glb | 22232 B | ассет графики/3D/интерфейса: hitching post |
| №0314 app/assets/3d/user_furniture/human-base-rigged.glb | 4994640 B | ассет графики/3D/интерфейса: human base rigged |
| №0315 app/assets/3d/user_furniture/infirmary_cot.glb | 71696 B | ассет графики/3D/интерфейса: infirmary cot |
| №0316 app/assets/3d/user_furniture/kitchen_hearth.glb | 38460 B | ассет графики/3D/интерфейса: kitchen hearth |
| №0317 app/assets/3d/user_furniture/lamp_post.glb | 16960 B | ассет графики/3D/интерфейса: lamp post |
| №0318 app/assets/3d/user_furniture/loom.glb | 46728 B | ассет графики/3D/интерфейса: loom |
| №0319 app/assets/3d/user_furniture/manuscript_in_progress.glb | 153128 B | ассет графики/3D/интерфейса: manuscript in progress |
| №0320 app/assets/3d/user_furniture/monastery_altar_table.glb | 36248 B | ассет графики/3D/интерфейса: monastery altar table |
| №0321 app/assets/3d/user_furniture/monastery_apothecary_jar_shelf.glb | 106620 B | ассет графики/3D/интерфейса: monastery apothecary jar shelf |
| №0322 app/assets/3d/user_furniture/monastery_bell_tower_section.glb | 456868 B | ассет графики/3D/интерфейса: monastery bell tower section |
| №0323 app/assets/3d/user_furniture/monastery_book_chest.glb | 45320 B | ассет графики/3D/интерфейса: monastery book chest |
| №0324 app/assets/3d/user_furniture/monastery_book_press.glb | 59492 B | ассет графики/3D/интерфейса: monastery book press |
| №0325 app/assets/3d/user_furniture/monastery_bread_oven.glb | 45296 B | ассет графики/3D/интерфейса: monastery bread oven |
| №0326 app/assets/3d/user_furniture/monastery_brewhouse_tun.glb | 68216 B | ассет графики/3D/интерфейса: monastery brewhouse tun |
| №0327 app/assets/3d/user_furniture/monastery_candle_stand.glb | 21376 B | ассет графики/3D/интерфейса: monastery candle stand |
| №0328 app/assets/3d/user_furniture/monastery_censer.glb | 49336 B | ассет графики/3D/интерфейса: monastery censer |
| №0329 app/assets/3d/user_furniture/monastery_chained_library_desk.glb | 148408 B | ассет графики/3D/интерфейса: monastery chained library desk |
| №0330 app/assets/3d/user_furniture/monastery_chapel_screen.glb | 333728 B | ассет графики/3D/интерфейса: monastery chapel screen |
| №0331 app/assets/3d/user_furniture/monastery_chapter_house_bay.glb | 151904 B | ассет графики/3D/интерфейса: monastery chapter house bay |
| №0332 app/assets/3d/user_furniture/monastery_cloister_arcade_bay.glb | 130972 B | ассет графики/3D/интерфейса: monastery cloister arcade bay |
| №0333 app/assets/3d/user_furniture/monastery_cloister_arcade_corner.glb | 73924 B | ассет графики/3D/интерфейса: monastery cloister arcade corner |
| №0334 app/assets/3d/user_furniture/monastery_cloister_garth_lawn.glb | 13732 B | ассет графики/3D/интерфейса: monastery cloister garth lawn |
| №0335 app/assets/3d/user_furniture/monastery_cloister_lean_to_roof.glb | 18724 B | ассет графики/3D/интерфейса: monastery cloister lean to roof |
| №0336 app/assets/3d/user_furniture/monastery_cloister_vault_section.glb | 73928 B | ассет графики/3D/интерфейса: monastery cloister vault section |
| №0337 app/assets/3d/user_furniture/monastery_cloister_well.glb | 41568 B | ассет графики/3D/интерфейса: monastery cloister well |
| №0338 app/assets/3d/user_furniture/monastery_compost_bay.glb | 55596 B | ассет графики/3D/интерфейса: monastery compost bay |
| №0339 app/assets/3d/user_furniture/monastery_cooking_cauldron.glb | 33800 B | ассет графики/3D/интерфейса: monastery cooking cauldron |
| №0340 app/assets/3d/user_furniture/monastery_dormitory_cot.glb | 54832 B | ассет графики/3D/интерфейса: monastery dormitory cot |
| №0341 app/assets/3d/user_furniture/monastery_finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: monastery finished codex |
| №0342 app/assets/3d/user_furniture/monastery_flagstone_floor_slab.glb | 9900 B | ассет графики/3D/интерфейса: monastery flagstone floor slab |
| №0343 app/assets/3d/user_furniture/monastery_gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: monastery gold leaf cushion |
| №0344 app/assets/3d/user_furniture/monastery_hand_cart.glb | 86864 B | ассет графики/3D/интерфейса: monastery hand cart |
| №0345 app/assets/3d/user_furniture/monastery_hanging_oil_lamp.glb | 47156 B | ассет графики/3D/интерфейса: monastery hanging oil lamp |
| №0346 app/assets/3d/user_furniture/monastery_herb_garden_bed.glb | 94584 B | ассет графики/3D/интерфейса: monastery herb garden bed |
| №0347 app/assets/3d/user_furniture/monastery_hung_bell.glb | 40368 B | ассет графики/3D/интерфейса: monastery hung bell |
| №0348 app/assets/3d/user_furniture/monastery_infirmary_cot.glb | 71700 B | ассет графики/3D/интерфейса: monastery infirmary cot |
| №0349 app/assets/3d/user_furniture/monastery_kitchen_hearth.glb | 37972 B | ассет графики/3D/интерфейса: monastery kitchen hearth |
| №0350 app/assets/3d/user_furniture/monastery_manuscript_in_progress.glb | 153132 B | ассет графики/3D/интерфейса: monastery manuscript in progress |
| №0351 app/assets/3d/user_furniture/monastery_monastery_buttress.glb | 18440 B | ассет графики/3D/интерфейса: monastery monastery buttress |
| №0352 app/assets/3d/user_furniture/monastery_monastery_door_bay.glb | 87284 B | ассет графики/3D/интерфейса: monastery monastery door bay |
| №0353 app/assets/3d/user_furniture/monastery_monastery_lancet_window_bay.glb | 64048 B | ассет графики/3D/интерфейса: monastery monastery lancet window bay |
| №0354 app/assets/3d/user_furniture/monastery_monastery_wall_bay.glb | 29336 B | ассет графики/3D/интерфейса: monastery monastery wall bay |
| №0355 app/assets/3d/user_furniture/monastery_monks_chest.glb | 30432 B | ассет графики/3D/интерфейса: monastery monks chest |
| №0356 app/assets/3d/user_furniture/monastery_mortar_and_pestle_set.glb | 31476 B | ассет графики/3D/интерфейса: monastery mortar and pestle set |
| №0357 app/assets/3d/user_furniture/monastery_parchment_stretching_frame.glb | 66292 B | ассет графики/3D/интерфейса: monastery parchment stretching frame |
| №0358 app/assets/3d/user_furniture/monastery_physic_bench.glb | 46424 B | ассет графики/3D/интерфейса: monastery physic bench |
| №0359 app/assets/3d/user_furniture/monastery_pigment_tray.glb | 42180 B | ассет графики/3D/интерфейса: monastery pigment tray |
| №0360 app/assets/3d/user_furniture/monastery_quill_and_inkhorn_set.glb | 36912 B | ассет графики/3D/интерфейса: monastery quill and inkhorn set |
| №0361 app/assets/3d/user_furniture/monastery_rain_water_butt.glb | 45160 B | ассет графики/3D/интерфейса: monastery rain water butt |
| №0362 app/assets/3d/user_furniture/monastery_readers_pulpit.glb | 70796 B | ассет графики/3D/интерфейса: monastery readers pulpit |
| №0363 app/assets/3d/user_furniture/monastery_reading_lectern.glb | 48744 B | ассет графики/3D/интерфейса: monastery reading lectern |
| №0364 app/assets/3d/user_furniture/monastery_refectory_bench.glb | 20408 B | ассет графики/3D/интерфейса: monastery refectory bench |
| №0365 app/assets/3d/user_furniture/monastery_refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: monastery refectory long table |
| №0366 app/assets/3d/user_furniture/monastery_reliquary_casket.glb | 59680 B | ассет графики/3D/интерфейса: monastery reliquary casket |
| №0367 app/assets/3d/user_furniture/monastery_ruling_board.glb | 98044 B | ассет графики/3D/интерфейса: monastery ruling board |
| №0368 app/assets/3d/user_furniture/monastery_rush_light_stand.glb | 19044 B | ассет графики/3D/интерфейса: monastery rush light stand |
| №0369 app/assets/3d/user_furniture/monastery_scribes_stool.glb | 19900 B | ассет графики/3D/интерфейса: monastery scribes stool |
| №0370 app/assets/3d/user_furniture/monastery_sloped_writing_desk.glb | 247044 B | ассет графики/3D/интерфейса: monastery sloped writing desk |
| №0371 app/assets/3d/user_furniture/monastery_stone_drain.glb | 12360 B | ассет графики/3D/интерфейса: monastery stone drain |
| №0372 app/assets/3d/user_furniture/monastery_stone_font.glb | 55200 B | ассет графики/3D/интерфейса: monastery stone font |
| №0373 app/assets/3d/user_furniture/monastery_stone_stair_vice.glb | 130164 B | ассет графики/3D/интерфейса: monastery stone stair vice |
| №0374 app/assets/3d/user_furniture/monastery_tomb_slab.glb | 47852 B | ассет графики/3D/интерфейса: monastery tomb slab |
| №0375 app/assets/3d/user_furniture/monastery_trestle_table.glb | 39912 B | ассет графики/3D/интерфейса: monastery trestle table |
| №0376 app/assets/3d/user_furniture/monastery_wall_torch_bracket.glb | 38324 B | ассет графики/3D/интерфейса: monastery wall torch bracket |
| №0377 app/assets/3d/user_furniture/monastery_wood_stack.glb | 71140 B | ассет графики/3D/интерфейса: monastery wood stack |
| №0378 app/assets/3d/user_furniture/monks_chest.glb | 30508 B | ассет графики/3D/интерфейса: monks chest |
| №0379 app/assets/3d/user_furniture/mortar_pestle.glb | 31516 B | ассет графики/3D/интерфейса: mortar pestle |
| №0380 app/assets/3d/user_furniture/nature_birch_leaning.glb | 14804 B | ассет графики/3D/интерфейса: nature birch leaning |
| №0381 app/assets/3d/user_furniture/nature_birch_mature.glb | 15636 B | ассет графики/3D/интерфейса: nature birch mature |
| №0382 app/assets/3d/user_furniture/nature_birch_young.glb | 13980 B | ассет графики/3D/интерфейса: nature birch young |
| №0383 app/assets/3d/user_furniture/nature_boulder_large.glb | 6660 B | ассет графики/3D/интерфейса: nature boulder large |
| №0384 app/assets/3d/user_furniture/nature_boulder_medium.glb | 6192 B | ассет графики/3D/интерфейса: nature boulder medium |
| №0385 app/assets/3d/user_furniture/nature_boulder_mossy.glb | 24232 B | ассет графики/3D/интерфейса: nature boulder mossy |
| №0386 app/assets/3d/user_furniture/nature_boulder_small.glb | 4760 B | ассет графики/3D/интерфейса: nature boulder small |
| №0387 app/assets/3d/user_furniture/nature_bush_berry.glb | 12316 B | ассет графики/3D/интерфейса: nature bush berry |
| №0388 app/assets/3d/user_furniture/nature_bush_flat.glb | 5980 B | ассет графики/3D/интерфейса: nature bush flat |
| №0389 app/assets/3d/user_furniture/nature_bush_flowering.glb | 16248 B | ассет графики/3D/интерфейса: nature bush flowering |
| №0390 app/assets/3d/user_furniture/nature_bush_round.glb | 5152 B | ассет графики/3D/интерфейса: nature bush round |
| №0391 app/assets/3d/user_furniture/nature_bush_tall.glb | 5968 B | ассет графики/3D/интерфейса: nature bush tall |
| №0392 app/assets/3d/user_furniture/nature_cliff_block.glb | 29492 B | ассет графики/3D/интерфейса: nature cliff block |
| №0393 app/assets/3d/user_furniture/nature_dead_snag_short.glb | 8596 B | ассет графики/3D/интерфейса: nature dead snag short |
| №0394 app/assets/3d/user_furniture/nature_dead_snag_tall.glb | 16784 B | ассет графики/3D/интерфейса: nature dead snag tall |
| №0395 app/assets/3d/user_furniture/nature_fern_clump.glb | 29024 B | ассет графики/3D/интерфейса: nature fern clump |
| №0396 app/assets/3d/user_furniture/nature_fern_single.glb | 13176 B | ассет графики/3D/интерфейса: nature fern single |
| №0397 app/assets/3d/user_furniture/nature_flower_red.glb | 12412 B | ассет графики/3D/интерфейса: nature flower red |
| №0398 app/assets/3d/user_furniture/nature_flower_yellow.glb | 12216 B | ассет графики/3D/интерфейса: nature flower yellow |
| №0399 app/assets/3d/user_furniture/nature_grass_tuft_tall.glb | 6628 B | ассет графики/3D/интерфейса: nature grass tuft tall |
| №0400 app/assets/3d/user_furniture/nature_hedge_block.glb | 2444 B | ассет графики/3D/интерфейса: nature hedge block |
| №0401 app/assets/3d/user_furniture/nature_meadow_disc.glb | 8780 B | ассет графики/3D/интерфейса: nature meadow disc |
| №0402 app/assets/3d/user_furniture/nature_mushroom_group.glb | 39600 B | ассет графики/3D/интерфейса: nature mushroom group |
| №0403 app/assets/3d/user_furniture/nature_oak_ancient.glb | 292756 B | ассет графики/3D/интерфейса: nature oak ancient |
| №0404 app/assets/3d/user_furniture/nature_oak_mature.glb | 279624 B | ассет графики/3D/интерфейса: nature oak mature |
| №0405 app/assets/3d/user_furniture/nature_oak_sapling.glb | 266084 B | ассет графики/3D/интерфейса: nature oak sapling |
| №0406 app/assets/3d/user_furniture/nature_oak_young.glb | 266536 B | ассет графики/3D/интерфейса: nature oak young |
| №0407 app/assets/3d/user_furniture/nature_palm_leaning.glb | 50808 B | ассет графики/3D/интерфейса: nature palm leaning |
| №0408 app/assets/3d/user_furniture/nature_palm_mature.glb | 57076 B | ассет графики/3D/интерфейса: nature palm mature |
| №0409 app/assets/3d/user_furniture/nature_palm_young.glb | 37688 B | ассет графики/3D/интерфейса: nature palm young |
| №0410 app/assets/3d/user_furniture/nature_pebble_cluster.glb | 12184 B | ассет графики/3D/интерфейса: nature pebble cluster |
| №0411 app/assets/3d/user_furniture/nature_pine_columnar.glb | 265888 B | ассет графики/3D/интерфейса: nature pine columnar |
| №0412 app/assets/3d/user_furniture/nature_pine_sapling.glb | 264192 B | ассет графики/3D/интерфейса: nature pine sapling |
| №0413 app/assets/3d/user_furniture/nature_pine_spreading.glb | 265024 B | ассет графики/3D/интерфейса: nature pine spreading |
| №0414 app/assets/3d/user_furniture/nature_pine_windswept.glb | 265012 B | ассет графики/3D/интерфейса: nature pine windswept |
| №0415 app/assets/3d/user_furniture/nature_rock_pile.glb | 11840 B | ассет графики/3D/интерфейса: nature rock pile |
| №0416 app/assets/3d/user_furniture/nature_root_cluster.glb | 18436 B | ассет графики/3D/интерфейса: nature root cluster |
| №0417 app/assets/3d/user_furniture/nature_sapling_pair.glb | 267912 B | ассет графики/3D/интерфейса: nature sapling pair |
| №0418 app/assets/3d/user_furniture/nature_slab_flat.glb | 2744 B | ассет графики/3D/интерфейса: nature slab flat |
| №0419 app/assets/3d/user_furniture/nature_slab_upright.glb | 2484 B | ассет графики/3D/интерфейса: nature slab upright |
| №0420 app/assets/3d/user_furniture/nature_stump_mossy.glb | 6616 B | ассет графики/3D/интерфейса: nature stump mossy |
| №0421 app/assets/3d/user_furniture/nature_stump_oak.glb | 273776 B | ассет графики/3D/интерфейса: nature stump oak |
| №0422 app/assets/3d/user_furniture/nature_stump_pine.glb | 261388 B | ассет графики/3D/интерфейса: nature stump pine |
| №0423 app/assets/3d/user_furniture/nature_topiary_cone.glb | 7524 B | ассет графики/3D/интерфейса: nature topiary cone |
| №0424 app/assets/3d/user_furniture/parchment_stretching_frame.glb | 55508 B | ассет графики/3D/интерфейса: parchment stretching frame |
| №0425 app/assets/3d/user_furniture/physic_bench.glb | 60316 B | ассет графики/3D/интерфейса: physic bench |
| №0426 app/assets/3d/user_furniture/pigment_tray.glb | 39864 B | ассет графики/3D/интерфейса: pigment tray |
| №0427 app/assets/3d/user_furniture/quill_inkhorn_set.glb | 36956 B | ассет графики/3D/интерфейса: quill inkhorn set |
| №0428 app/assets/3d/user_furniture/rain_water_butt.glb | 45168 B | ассет графики/3D/интерфейса: rain water butt |
| №0429 app/assets/3d/user_furniture/range_and_oven.glb | 19732 B | ассет графики/3D/интерфейса: range and oven |
| №0430 app/assets/3d/user_furniture/reading_lectern.glb | 48844 B | ассет графики/3D/интерфейса: reading lectern |
| №0431 app/assets/3d/user_furniture/refectory_bench.glb | 20560 B | ассет графики/3D/интерфейса: refectory bench |
| №0432 app/assets/3d/user_furniture/refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: refectory long table |
| №0433 app/assets/3d/user_furniture/reliquary_casket.glb | 59728 B | ассет графики/3D/интерфейса: reliquary casket |
| №0434 app/assets/3d/user_furniture/road_signpost.glb | 8044 B | ассет графики/3D/интерфейса: road signpost |
| №0435 app/assets/3d/user_furniture/rug.glb | 16540 B | ассет графики/3D/интерфейса: rug |
| №0436 app/assets/3d/user_furniture/ruling_board.glb | 98032 B | ассет графики/3D/интерфейса: ruling board |
| №0437 app/assets/3d/user_furniture/rush_light_stand.glb | 19052 B | ассет графики/3D/интерфейса: rush light stand |
| №0438 app/assets/3d/user_furniture/scribes_stool.glb | 20040 B | ассет графики/3D/интерфейса: scribes stool |
| №0439 app/assets/3d/user_furniture/shop_counter.glb | 58488 B | ассет графики/3D/интерфейса: shop counter |
| №0440 app/assets/3d/user_furniture/sloped_writing_desk.glb | 341476 B | ассет графики/3D/интерфейса: sloped writing desk |
| №0441 app/assets/3d/user_furniture/spinning_wheel.glb | 21900 B | ассет графики/3D/интерфейса: spinning wheel |
| №0442 app/assets/3d/user_furniture/stone_stone_stair_vice_0.glb | 130164 B | ассет графики/3D/интерфейса: stone stone stair vice 0 |
| №0443 app/assets/3d/user_furniture/table_and_stools.glb | 34088 B | ассет графики/3D/интерфейса: table and stools |
| №0444 app/assets/3d/user_furniture/table.glb | 6217412 B | ассет графики/3D/интерфейса: table |
| №0445 app/assets/3d/user_furniture/torch_sconce.glb | 8692 B | ассет графики/3D/интерфейса: torch sconce |
| №0446 app/assets/3d/user_furniture/town_allotment_bed.glb | 42940 B | ассет графики/3D/интерфейса: town allotment bed |
| №0447 app/assets/3d/user_furniture/town_altar_with_candles.glb | 28704 B | ассет графики/3D/интерфейса: town altar with candles |
| №0448 app/assets/3d/user_furniture/town_anvil.glb | 7820 B | ассет графики/3D/интерфейса: town anvil |
| №0449 app/assets/3d/user_furniture/town_apple_tree.glb | 21880 B | ассет графики/3D/интерфейса: town apple tree |
| №0450 app/assets/3d/user_furniture/town_armour_stand.glb | 16180 B | ассет графики/3D/интерфейса: town armour stand |
| №0451 app/assets/3d/user_furniture/town_banner_pole.glb | 16800 B | ассет графики/3D/интерфейса: town banner pole |
| №0452 app/assets/3d/user_furniture/town_barrel.glb | 13340 B | ассет графики/3D/интерфейса: town barrel |
| №0453 app/assets/3d/user_furniture/town_bedroll.glb | 8964 B | ассет графики/3D/интерфейса: town bedroll |
| №0454 app/assets/3d/user_furniture/town_bench.glb | 16564 B | ассет графики/3D/интерфейса: town bench |
| №0455 app/assets/3d/user_furniture/town_boulder_large.glb | 9404 B | ассет графики/3D/интерфейса: town boulder large |
| №0456 app/assets/3d/user_furniture/town_boulder_small.glb | 4768 B | ассет графики/3D/интерфейса: town boulder small |
| №0457 app/assets/3d/user_furniture/town_bush.glb | 9188 B | ассет графики/3D/интерфейса: town bush |
| №0458 app/assets/3d/user_furniture/town_campfire_with_spit.glb | 33304 B | ассет графики/3D/интерфейса: town campfire with spit |
| №0459 app/assets/3d/user_furniture/town_canoe.glb | 15568 B | ассет графики/3D/интерфейса: town canoe |
| №0460 app/assets/3d/user_furniture/town_cargo_cart.glb | 70964 B | ассет графики/3D/интерфейса: town cargo cart |
| №0461 app/assets/3d/user_furniture/town_cauldron_on_tripod.glb | 32232 B | ассет графики/3D/интерфейса: town cauldron on tripod |
| №0462 app/assets/3d/user_furniture/town_cave_mouth.glb | 21616 B | ассет графики/3D/интерфейса: town cave mouth |
| №0463 app/assets/3d/user_furniture/town_chandelier.glb | 24996 B | ассет графики/3D/интерфейса: town chandelier |
| №0464 app/assets/3d/user_furniture/town_chicken_coop.glb | 26176 B | ассет графики/3D/интерфейса: town chicken coop |
| №0465 app/assets/3d/user_furniture/town_cobble_road_corner.glb | 18268 B | ассет графики/3D/интерфейса: town cobble road corner |
| №0466 app/assets/3d/user_furniture/town_cobble_road_junction.glb | 26024 B | ассет графики/3D/интерфейса: town cobble road junction |
| №0467 app/assets/3d/user_furniture/town_cobble_road_tile.glb | 20612 B | ассет графики/3D/интерфейса: town cobble road tile |
| №0468 app/assets/3d/user_furniture/town_cooks_kitchen.glb | 96404 B | ассет графики/3D/интерфейса: town cooks kitchen |
| №0469 app/assets/3d/user_furniture/town_cow_pen_fence.glb | 11268 B | ассет графики/3D/интерфейса: town cow pen fence |
| №0470 app/assets/3d/user_furniture/town_crate_stack.glb | 39416 B | ассет графики/3D/интерфейса: town crate stack |
| №0471 app/assets/3d/user_furniture/town_dead_tree.glb | 6196 B | ассет графики/3D/интерфейса: town dead tree |
| №0472 app/assets/3d/user_furniture/town_dirt_path_tile.glb | 9152 B | ассет графики/3D/интерфейса: town dirt path tile |
| №0473 app/assets/3d/user_furniture/town_farmhouse_and_barn.glb | 161272 B | ассет графики/3D/интерфейса: town farmhouse and barn |
| №0474 app/assets/3d/user_furniture/town_fence_gate.glb | 14544 B | ассет графики/3D/интерфейса: town fence gate |
| №0475 app/assets/3d/user_furniture/town_fence_run.glb | 28988 B | ассет графики/3D/интерфейса: town fence run |
| №0476 app/assets/3d/user_furniture/town_fern_clump.glb | 15892 B | ассет графики/3D/интерфейса: town fern clump |
| №0477 app/assets/3d/user_furniture/town_ferry_raft.glb | 31140 B | ассет графики/3D/интерфейса: town ferry raft |
| №0478 app/assets/3d/user_furniture/town_fishing_boat.glb | 25960 B | ассет графики/3D/интерфейса: town fishing boat |
| №0479 app/assets/3d/user_furniture/town_fishing_hut_on_stilts.glb | 110516 B | ассет графики/3D/интерфейса: town fishing hut on stilts |
| №0480 app/assets/3d/user_furniture/town_fletcher_shop.glb | 117300 B | ассет графики/3D/интерфейса: town fletcher shop |
| №0481 app/assets/3d/user_furniture/town_flower_patch.glb | 34768 B | ассет графики/3D/интерфейса: town flower patch |
| №0482 app/assets/3d/user_furniture/town_general_store.glb | 137904 B | ассет графики/3D/интерфейса: town general store |
| №0483 app/assets/3d/user_furniture/town_goblin_tent.glb | 15120 B | ассет графики/3D/интерфейса: town goblin tent |
| №0484 app/assets/3d/user_furniture/town_goblin_totem.glb | 27832 B | ассет графики/3D/интерфейса: town goblin totem |
| №0485 app/assets/3d/user_furniture/town_grass_ground_tile.glb | 8564 B | ассет графики/3D/интерфейса: town grass ground tile |
| №0486 app/assets/3d/user_furniture/town_grass_tuft_cluster.glb | 5080 B | ассет графики/3D/интерфейса: town grass tuft cluster |
| №0487 app/assets/3d/user_furniture/town_gravestone_set.glb | 23812 B | ассет графики/3D/интерфейса: town gravestone set |
| №0488 app/assets/3d/user_furniture/town_guard_barracks.glb | 162732 B | ассет графики/3D/интерфейса: town guard barracks |
| №0489 app/assets/3d/user_furniture/town_hand_cart.glb | 25308 B | ассет графики/3D/интерфейса: town hand cart |
| №0490 app/assets/3d/user_furniture/town_hay_bale.glb | 16340 B | ассет графики/3D/интерфейса: town hay bale |
| №0491 app/assets/3d/user_furniture/town_hitching_post.glb | 22008 B | ассет графики/3D/интерфейса: town hitching post |
| №0492 app/assets/3d/user_furniture/town_hunters_hide.glb | 33880 B | ассет графики/3D/интерфейса: town hunters hide |
| №0493 app/assets/3d/user_furniture/town_lamp_post.glb | 16804 B | ассет графики/3D/интерфейса: town lamp post |
| №0494 app/assets/3d/user_furniture/town_lily_pads.glb | 16632 B | ассет графики/3D/интерфейса: town lily pads |
| №0495 app/assets/3d/user_furniture/town_log_pile.glb | 37732 B | ассет графики/3D/интерфейса: town log pile |
| №0496 app/assets/3d/user_furniture/town_loom.glb | 46480 B | ассет графики/3D/интерфейса: town loom |
| №0497 app/assets/3d/user_furniture/town_loot_sack.glb | 11820 B | ассет графики/3D/интерфейса: town loot sack |
| №0498 app/assets/3d/user_furniture/town_market_stall_blue.glb | 61540 B | ассет графики/3D/интерфейса: town market stall blue |
| №0499 app/assets/3d/user_furniture/town_market_stall_cream.glb | 60756 B | ассет графики/3D/интерфейса: town market stall cream |
| №0500 app/assets/3d/user_furniture/town_market_stall.glb | 61536 B | ассет графики/3D/интерфейса: town market stall |
| №0501 app/assets/3d/user_furniture/town_mine_entrance.glb | 41744 B | ассет графики/3D/интерфейса: town mine entrance |
| №0502 app/assets/3d/user_furniture/town_mushroom_ring.glb | 22884 B | ассет графики/3D/интерфейса: town mushroom ring |
| №0503 app/assets/3d/user_furniture/town_notice_board.glb | 15924 B | ассет графики/3D/интерфейса: town notice board |
| №0504 app/assets/3d/user_furniture/town_oak_tree.glb | 19492 B | ассет графики/3D/интерфейса: town oak tree |
| №0505 app/assets/3d/user_furniture/town_pine_tree.glb | 7096 B | ассет графики/3D/интерфейса: town pine tree |
| №0506 app/assets/3d/user_furniture/town_plaza_paving_tile.glb | 40396 B | ассет графики/3D/интерфейса: town plaza paving tile |
| №0507 app/assets/3d/user_furniture/town_ploughed_field_tile.glb | 24992 B | ассет графики/3D/интерфейса: town ploughed field tile |
| №0508 app/assets/3d/user_furniture/town_range_and_oven.glb | 19440 B | ассет графики/3D/интерфейса: town range and oven |
| №0509 app/assets/3d/user_furniture/town_reed_clump.glb | 8672 B | ассет графики/3D/интерфейса: town reed clump |
| №0510 app/assets/3d/user_furniture/town_river_bank_tile.glb | 17528 B | ассет графики/3D/интерфейса: town river bank tile |
| №0511 app/assets/3d/user_furniture/town_river_bend_tile.glb | 27100 B | ассет графики/3D/интерфейса: town river bend tile |
| №0512 app/assets/3d/user_furniture/town_river_tile_straight.glb | 19108 B | ассет графики/3D/интерфейса: town river tile straight |
| №0513 app/assets/3d/user_furniture/town_road_signpost.glb | 7824 B | ассет графики/3D/интерфейса: town road signpost |
| №0514 app/assets/3d/user_furniture/town_rock_outcrop.glb | 10020 B | ассет графики/3D/интерфейса: town rock outcrop |
| №0515 app/assets/3d/user_furniture/town_rope_bridge.glb | 104548 B | ассет графики/3D/интерфейса: town rope bridge |
| №0516 app/assets/3d/user_furniture/town_rowing_boat.glb | 26056 B | ассет графики/3D/интерфейса: town rowing boat |
| №0517 app/assets/3d/user_furniture/town_rug.glb | 16352 B | ассет графики/3D/интерфейса: town rug |
| №0518 app/assets/3d/user_furniture/town_scarecrow.glb | 22344 B | ассет графики/3D/интерфейса: town scarecrow |
| №0519 app/assets/3d/user_furniture/town_shop_counter.glb | 61556 B | ассет графики/3D/интерфейса: town shop counter |
| №0520 app/assets/3d/user_furniture/town_smithy.glb | 105612 B | ассет графики/3D/интерфейса: town smithy |
| №0521 app/assets/3d/user_furniture/town_spinning_wheel.glb | 21608 B | ассет графики/3D/интерфейса: town spinning wheel |
| №0522 app/assets/3d/user_furniture/town_standing_stone.glb | 13276 B | ассет графики/3D/интерфейса: town standing stone |
| №0523 app/assets/3d/user_furniture/town_stone_arch_bridge.glb | 51536 B | ассет графики/3D/интерфейса: town stone arch bridge |
| №0524 app/assets/3d/user_furniture/town_stone_church.glb | 145052 B | ассет графики/3D/интерфейса: town stone church |
| №0525 app/assets/3d/user_furniture/town_stone_circle_slab.glb | 31656 B | ассет графики/3D/интерфейса: town stone circle slab |
| №0526 app/assets/3d/user_furniture/town_straw_target.glb | 15176 B | ассет графики/3D/интерфейса: town straw target |
| №0527 app/assets/3d/user_furniture/town_stump_with_axe.glb | 11880 B | ассет графики/3D/интерфейса: town stump with axe |
| №0528 app/assets/3d/user_furniture/town_table_and_stools.glb | 33848 B | ассет графики/3D/интерфейса: town table and stools |
| №0529 app/assets/3d/user_furniture/town_thatched_cottage.glb | 106096 B | ассет графики/3D/интерфейса: town thatched cottage |
| №0530 app/assets/3d/user_furniture/town_timber_house_large.glb | 262356 B | ассет графики/3D/интерфейса: town timber house large |
| №0531 app/assets/3d/user_furniture/town_timber_house_medium.glb | 169188 B | ассет графики/3D/интерфейса: town timber house medium |
| №0532 app/assets/3d/user_furniture/town_timber_house_small.glb | 119348 B | ассет графики/3D/интерфейса: town timber house small |
| №0533 app/assets/3d/user_furniture/town_timber_plank_bridge.glb | 60076 B | ассет графики/3D/интерфейса: town timber plank bridge |
| №0534 app/assets/3d/user_furniture/town_torch_sconce.glb | 8460 B | ассет графики/3D/интерфейса: town torch sconce |
| №0535 app/assets/3d/user_furniture/town_town_bank.glb | 116184 B | ассет графики/3D/интерфейса: town town bank |
| №0536 app/assets/3d/user_furniture/town_town_hall.glb | 252584 B | ассет графики/3D/интерфейса: town town hall |
| №0537 app/assets/3d/user_furniture/town_town_wall_segment.glb | 9696 B | ассет графики/3D/интерфейса: town town wall segment |
| №0538 app/assets/3d/user_furniture/town_town_well.glb | 32492 B | ассет графики/3D/интерфейса: town town well |
| №0539 app/assets/3d/user_furniture/town_treasure_chest.glb | 12404 B | ассет графики/3D/интерфейса: town treasure chest |
| №0540 app/assets/3d/user_furniture/town_village_tavern.glb | 220336 B | ассет графики/3D/интерфейса: town village tavern |
| №0541 app/assets/3d/user_furniture/town_wall_corner_tower.glb | 79592 B | ассет графики/3D/интерфейса: town wall corner tower |
| №0542 app/assets/3d/user_furniture/town_wall_gatehouse.glb | 77180 B | ассет графики/3D/интерфейса: town wall gatehouse |
| №0543 app/assets/3d/user_furniture/town_wall_stair.glb | 34040 B | ассет графики/3D/интерфейса: town wall stair |
| №0544 app/assets/3d/user_furniture/town_wall_walk_crenellated.glb | 15296 B | ассет графики/3D/интерфейса: town wall walk crenellated |
| №0545 app/assets/3d/user_furniture/town_watchtower.glb | 109556 B | ассет графики/3D/интерфейса: town watchtower |
| №0546 app/assets/3d/user_furniture/town_water_trough.glb | 18172 B | ассет графики/3D/интерфейса: town water trough |
| №0547 app/assets/3d/user_furniture/town_weapon_rack.glb | 23152 B | ассет графики/3D/интерфейса: town weapon rack |
| №0548 app/assets/3d/user_furniture/town_wheat_field_tile.glb | 55508 B | ассет графики/3D/интерфейса: town wheat field tile |
| №0549 app/assets/3d/user_furniture/town_willow_tree.glb | 26360 B | ассет графики/3D/интерфейса: town willow tree |
| №0550 app/assets/3d/user_furniture/town_windmill.glb | 121768 B | ассет графики/3D/интерфейса: town windmill |
| №0551 app/assets/3d/user_furniture/town_wizard_tower_base.glb | 64292 B | ассет графики/3D/интерфейса: town wizard tower base |
| №0552 app/assets/3d/user_furniture/town_wizard_tower_mid.glb | 70456 B | ассет графики/3D/интерфейса: town wizard tower mid |
| №0553 app/assets/3d/user_furniture/town_wizard_tower_top.glb | 50984 B | ассет графики/3D/интерфейса: town wizard tower top |
| №0554 app/assets/3d/user_furniture/treasure_chest.glb | 12772 B | ассет графики/3D/интерфейса: treasure chest |
| №0555 app/assets/3d/user_furniture/trestle_table.glb | 40424 B | ассет графики/3D/интерфейса: trestle table |
| №0556 app/assets/3d/user_furniture/weapon_rack.glb | 23300 B | ассет графики/3D/интерфейса: weapon rack |
| №0557 app/assets/3d/user_furniture/wood_stack.glb | 71136 B | ассет графики/3D/интерфейса: wood stack |
| №0558 app/assets/dice/.gitkeep | 0 B | ассет графики/3D/интерфейса: .gitkeep |
| №0559 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png | 2349861 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 07 PM |
| №0560 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_30 PM.png | 2088308 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 30 PM |
| №0561 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_13_27 PM.png | 2584925 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 13 27 PM |
| №0562 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_23_00 PM.png | 2274607 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 23 00 PM |
| №0563 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_24_38 PM.png | 2254958 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 24 38 PM |
| №0564 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_27_51 PM.png | 2389543 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 27 51 PM |
| №0565 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_35_50 PM.png | 2486441 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 35 50 PM |
| №0566 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_41_40 PM.png | 2712929 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 41 40 PM |
| №0567 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_49_58 PM.png | 2751322 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 49 58 PM |
| №0568 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_07 PM.png | 2778707 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 07 PM |
| №0569 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_18 PM.png | 2503466 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 18 PM |
| №0570 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_28 PM.png | 2561809 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 28 PM |
| №0571 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_39 PM.png | 2841483 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 39 PM |
| №0572 app/assets/dice/dice1.png | 348916 B | ассет графики/3D/интерфейса: dice1 |
| №0573 app/assets/dice/dice10-1.png | 386558 B | ассет графики/3D/интерфейса: dice10 1 |
| №0574 app/assets/dice/dice10.png | 386558 B | ассет графики/3D/интерфейса: dice10 |
| №0575 app/assets/dice/dice11.png | 307154 B | ассет графики/3D/интерфейса: dice11 |
| №0576 app/assets/dice/dice12.png | 395864 B | ассет графики/3D/интерфейса: dice12 |
| №0577 app/assets/dice/dice13.png | 344758 B | ассет графики/3D/интерфейса: dice13 |
| №0578 app/assets/dice/dice15.png | 388111 B | ассет графики/3D/интерфейса: dice15 |
| №0579 app/assets/dice/dice16.png | 352768 B | ассет графики/3D/интерфейса: dice16 |
| №0580 app/assets/dice/dice17.png | 342548 B | ассет графики/3D/интерфейса: dice17 |
| №0581 app/assets/dice/dice2.png | 246156 B | ассет графики/3D/интерфейса: dice2 |
| №0582 app/assets/dice/dice3.png | 346757 B | ассет графики/3D/интерфейса: dice3 |
| №0583 app/assets/dice/dice4.png | 348331 B | ассет графики/3D/интерфейса: dice4 |
| №0584 app/assets/dice/dice5.png | 299652 B | ассет графики/3D/интерфейса: dice5 |
| №0585 app/assets/dice/dice6.png | 331669 B | ассет графики/3D/интерфейса: dice6 |
| №0586 app/assets/dice/dice7.png | 343178 B | ассет графики/3D/интерфейса: dice7 |
| №0587 app/assets/dice/dice8.png | 370230 B | ассет графики/3D/интерфейса: dice8 |
| №0588 app/assets/dice/dice9.png | 336030 B | ассет графики/3D/интерфейса: dice9 |
| №0589 app/assets/ui/character-creation/1790622252250.png | 908119 B | ассет графики/3D/интерфейса: 1790622252250 |
| №0590 app/assets/ui/dragon_fire_burst_v2_sprite.png | 237749 B | ассет графики/3D/интерфейса: dragon fire burst v2 sprite |
| №0591 app/assets/ui/dragon_fire.png | 267960 B | ассет графики/3D/интерфейса: dragon fire |
| №0592 app/assets/ui/dragon_flight_v2_sprite.png | 573207 B | ассет графики/3D/интерфейса: dragon flight v2 sprite |
| №0593 app/assets/ui/dragon_frame_strip.svg | 858 B | ассет графики/3D/интерфейса: dragon frame strip |
| №0594 app/assets/ui/dragon.png | 274924 B | ассет графики/3D/интерфейса: dragon |
| №0595 app/assets/ui/fire_front.png | 1276760 B | ассет графики/3D/интерфейса: fire front |
| №0596 app/assets/ui/forest_burned.jpg | 211523 B | ассет графики/3D/интерфейса: forest burned |
| №0597 app/assets/ui/forest_green.jpg | 309184 B | ассет графики/3D/интерфейса: forest green |
| №0598 app/assets/ui/loader_dragon_head.svg | 2388 B | ассет графики/3D/интерфейса: loader dragon head |
| №0599 app/assets/ui/loader_fire.svg | 902 B | ассет графики/3D/интерфейса: loader fire |
| №0600 app/assets/ui/loader_forest_burning.svg | 1448 B | ассет графики/3D/интерфейса: loader forest burning |
| №0601 app/assets/ui/loader_forest.svg | 917 B | ассет графики/3D/интерфейса: loader forest |
| №0602 app/assets/ui/loader_sparks.svg | 626 B | ассет графики/3D/интерфейса: loader sparks |
| №0603 app/assets/ui/update_scene_ash.svg | 432 B | ассет графики/3D/интерфейса: update scene ash |
| №0604 app/assets/ui/update_scene_background.svg | 1141 B | ассет графики/3D/интерфейса: update scene background |
| №0605 app/assets/ui/update_scene_dragon_fire.svg | 733 B | ассет графики/3D/интерфейса: update scene dragon fire |
| №0606 app/assets/ui/update_scene_dragon.svg | 1324 B | ассет графики/3D/интерфейса: update scene dragon |
| №0607 app/assets/ui/update_scene_embers.svg | 474 B | ассет графики/3D/интерфейса: update scene embers |
| №0608 app/assets/ui/update_scene_fire_front.svg | 837 B | ассет графики/3D/интерфейса: update scene fire front |
| №0609 app/assets/ui/update_scene_forest_burned.svg | 1417 B | ассет графики/3D/интерфейса: update scene forest burned |
| №0610 app/assets/ui/update_scene_forest_green.svg | 1181 B | ассет графики/3D/интерфейса: update scene forest green |
| №0611 app/assets/ui/update_scene_smoke.svg | 417 B | ассет графики/3D/интерфейса: update scene smoke |
| №0612 app/assets/ui/vine_bone_frame_strip.svg | 943 B | ассет графики/3D/интерфейса: vine bone frame strip |
| №0613 app/Backgrounds.js | 63130 B | логический модуль: Backgrounds |
| №0614 app/battle_action_ui.js | 18386 B | логический модуль: battle action ui |
| №0615 app/battle_board.js | 37591 B | логический модуль: battle board |
| №0616 app/bestiary_2_0_v56.js | 55429 B | логический модуль: bestiary 2 0 v56 |
| №0617 app/bestiary_catalog_v56_1.js | 16222 B | логический модуль: bestiary catalog v56 1 |
| №0618 app/bestiary_catalog_v56_10.js | 10944 B | логический модуль: bestiary catalog v56 10 |
| №0619 app/bestiary_catalog_v56_11.js | 13164 B | логический модуль: bestiary catalog v56 11 |
| №0620 app/bestiary_catalog_v56_12.js | 10118 B | логический модуль: bestiary catalog v56 12 |
| №0621 app/bestiary_catalog_v56_13.js | 12586 B | логический модуль: bestiary catalog v56 13 |
| №0622 app/bestiary_catalog_v56_2.js | 13525 B | логический модуль: bestiary catalog v56 2 |
| №0623 app/bestiary_catalog_v56_3.js | 14383 B | логический модуль: bestiary catalog v56 3 |
| №0624 app/bestiary_catalog_v56_4.js | 11396 B | логический модуль: bestiary catalog v56 4 |
| №0625 app/bestiary_catalog_v56_5.js | 8648 B | логический модуль: bestiary catalog v56 5 |
| №0626 app/bestiary_catalog_v56_6.js | 9066 B | логический модуль: bestiary catalog v56 6 |
| №0627 app/bestiary_catalog_v56_7.js | 9314 B | логический модуль: bestiary catalog v56 7 |
| №0628 app/bestiary_catalog_v56_8.js | 9559 B | логический модуль: bestiary catalog v56 8 |
| №0629 app/bestiary_catalog_v56_9.js | 9861 B | логический модуль: bestiary catalog v56 9 |
| №0630 app/blood_hunter_engine.js | 82133 B | логика класса Кровавый охотник |
| №0631 app/campaign_manager.js | 7195 B | логический модуль: campaign manager |
| №0632 app/character_builder_v2.js | 109543 B | логический модуль: character builder v2 |
| №0633 app/character_creation_pergament.css | 12669 B | оформление интерфейса: character creation pergament |
| №0634 app/character_creation_pergament.js | 39686 B | логический модуль: character creation pergament |
| №0635 app/character_creation.js | 46823 B | логический модуль: character creation |
| №0636 app/character.js | 11133 B | лист персонажа; состояния и оружие |
| №0637 app/class_features_engine.js | 135018 B | логический модуль: class features engine |
| №0638 app/classesRegistry.js | 10857 B | логический модуль: classesRegistry |
| №0639 app/cloud_account.css | 1213 B | оформление интерфейса: cloud account |
| №0640 app/cloud_account.js | 8970 B | интерфейс авторизации и управления версиями |
| №0641 app/cloud_config.js | 450 B | публичная конфигурация облака |
| №0642 app/cloud_sync.js | 24647 B | синхронизация сохранений через Supabase |
| №0643 app/combat_abilities.js | 12824 B | логический модуль: combat abilities |
| №0644 app/combat_engine.js | 95078 B | движок боя и HP; адаптеры legacy значений |
| №0645 app/companion_gameplay_v27.js | 17531 B | логический модуль: companion gameplay v27 |
| №0646 app/companion_packs_v26.js | 4998 B | логический модуль: companion packs v26 |
| №0647 app/companions.js | 8943 B | логический модуль: companions |
| №0648 app/consumables.js | 15638 B | логический модуль: consumables |
| №0649 app/content_catalog.js | 9721 B | логический модуль: content catalog |
| №0650 app/content_framework.js | 9884 B | логический модуль: content framework |
| №0651 app/content_manifest.js | 3755 B | логический модуль: content manifest |
| №0652 app/crafting_character_influence_test_v46.js | 7123 B | логический модуль: crafting character influence test v46 |
| №0653 app/crafting_disassembly_repair_v51.js | 13334 B | логический модуль: crafting disassembly repair v51 |
| №0654 app/crafting_disassembly_v51.js | 11979 B | логический модуль: crafting disassembly v51 |
| №0655 app/crafting_dlc_v50.js | 8373 B | логический модуль: crafting dlc v50 |
| №0656 app/crafting_economy_v49.js | 17129 B | логический модуль: crafting economy v49 |
| №0657 app/crafting_engine_v31.js | 20294 B | логический модуль: crafting engine v31 |
| №0658 app/crafting_profession_progression_test_v47.js | 5609 B | логический модуль: crafting profession progression test v47 |
| №0659 app/crafting_profession_progression_v47.js | 35781 B | логический модуль: crafting profession progression v47 |
| №0660 app/crafting_professions_v33.js | 19300 B | логический модуль: crafting professions v33 |
| №0661 app/crafting_professions_v38.js | 48800 B | логический модуль: crafting professions v38 |
| №0662 app/crafting_resources_v34.js | 35661 B | логический модуль: crafting resources v34 |
| №0663 app/custom_crafting_v32.js | 15989 B | логический модуль: custom crafting v32 |
| №0664 app/data/classes/Accursed.js | 3369 B | логика классов: Accursed |
| №0665 app/data/classes/accursed.png | 2441667 B | логика классов: accursed |
| №0666 app/data/classes/Alchemist.js | 5589 B | логика классов: Alchemist |
| №0667 app/data/classes/alchemist.png | 1945616 B | логика классов: alchemist |
| №0668 app/data/classes/Artificer.js | 2124 B | логика классов: Artificer |
| №0669 app/data/classes/ARTIFICER.png | 891812 B | логика классов: ARTIFICER |
| №0670 app/data/classes/Barbarian.js | 3822 B | логика классов: Barbarian |
| №0671 app/data/classes/BARBARIAN.png | 815028 B | логика классов: BARBARIAN |
| №0672 app/data/classes/Bard.js | 2085 B | логика классов: Bard |
| №0673 app/data/classes/Bard.png | 769261 B | логика классов: Bard |
| №0674 app/data/classes/beasthart.png | 2255040 B | логика классов: beasthart |
| №0675 app/data/classes/Beastheart.js | 28992 B | логика классов: Beastheart |
| №0676 app/data/classes/blood hunter.png | 2210071 B | логика классов: blood hunter |
| №0677 app/data/classes/BloodHunter.js | 5283 B | логика классов: BloodHunter |
| №0678 app/data/classes/Cleric.js | 1987 B | логика классов: Cleric |
| №0679 app/data/classes/CLERIC.png | 914579 B | логика классов: CLERIC |
| №0680 app/data/classes/Druid.js | 1898 B | логика классов: Druid |
| №0681 app/data/classes/DRUID.png | 776880 B | логика классов: DRUID |
| №0682 app/data/classes/extra_class_stubs.js | 4499 B | логика классов: extra class stubs |
| №0683 app/data/classes/Fighter.js | 3771 B | логика классов: Fighter |
| №0684 app/data/classes/FIGHTER.png | 762812 B | логика классов: FIGHTER |
| №0685 app/data/classes/geist.png | 1776006 B | логика классов: geist |
| №0686 app/data/classes/Ghost.js | 295 B | логика классов: Ghost |
| №0687 app/data/classes/Illigger.js | 6058 B | логика классов: Illigger |
| №0688 app/data/classes/Illigger.png | 1716994 B | логика классов: Illigger |
| №0689 app/data/classes/level_up.js | 62903 B | логика классов: level up |
| №0690 app/data/classes/Martyr.js | 884 B | логика классов: Martyr |
| №0691 app/data/classes/martyr.png | 2381724 B | логика классов: martyr |
| №0692 app/data/classes/Monk.js | 2493 B | логика классов: Monk |
| №0693 app/data/classes/Monk.png | 1115382 B | логика классов: Monk |
| №0694 app/data/classes/Necromancer.js | 1013 B | логика классов: Necromancer |
| №0695 app/data/classes/necromancer.png | 2007714 B | логика классов: necromancer |
| №0696 app/data/classes/Occultist.js | 8507 B | логика классов: Occultist |
| №0697 app/data/classes/occultist.png | 1986332 B | логика классов: occultist |
| №0698 app/data/classes/Paladin.js | 2017 B | логика классов: Paladin |
| №0699 app/data/classes/PALADIN.png | 873991 B | логика классов: PALADIN |
| №0700 app/data/classes/Parasite.js | 545 B | логика классов: Parasite |
| №0701 app/data/classes/parasite.png | 2144116 B | логика классов: parasite |
| №0702 app/data/classes/progressionEngine.js | 20610 B | логика классов: progressionEngine |
| №0703 app/data/classes/Psion.js | 9033 B | логика классов: Psion |
| №0704 app/data/classes/psion.png | 1951350 B | логика классов: psion |
| №0705 app/data/classes/Pugilist.js | 11453 B | логика классов: Pugilist |
| №0706 app/data/classes/pugilist.png | 2022336 B | логика классов: pugilist |
| №0707 app/data/classes/Ranger.js | 1938 B | логика классов: Ranger |
| №0708 app/data/classes/RANGER.png | 643335 B | логика классов: RANGER |
| №0709 app/data/classes/Rogue.js | 3244 B | логика классов: Rogue |
| №0710 app/data/classes/Rogue.png | 579962 B | логика классов: Rogue |
| №0711 app/data/classes/rune keeper.png | 2582772 B | логика классов: rune keeper |
| №0712 app/data/classes/RuneKeeper.js | 2366 B | логика классов: RuneKeeper |
| №0713 app/data/classes/Savant.js | 930 B | логика классов: Savant |
| №0714 app/data/classes/savant.png | 1991433 B | логика классов: savant |
| №0715 app/data/classes/Shifter.js | 734 B | логика классов: Shifter |
| №0716 app/data/classes/shifter.png | 2248497 B | логика классов: shifter |
| №0717 app/data/classes/Sorcerer.js | 2098 B | логика классов: Sorcerer |
| №0718 app/data/classes/SORCERER.png | 939797 B | логика классов: SORCERER |
| №0719 app/data/classes/Swarm.js | 198 B | логика классов: Swarm |
| №0720 app/data/classes/the swam.png | 1759593 B | логика классов: the swam |
| №0721 app/data/classes/Vessel.js | 751 B | логика классов: Vessel |
| №0722 app/data/classes/vessel.png | 1943431 B | логика классов: vessel |
| №0723 app/data/classes/WalterParasite.js | 303 B | логика классов: WalterParasite |
| №0724 app/data/classes/Warden.js | 6678 B | логика классов: Warden |
| №0725 app/data/classes/warden.png | 2093561 B | логика классов: warden |
| №0726 app/data/classes/Warlock.js | 2013 B | логика классов: Warlock |
| №0727 app/data/classes/WARLOCK.png | 981038 B | логика классов: WARLOCK |
| №0728 app/data/classes/Warlord.js | 9504 B | логика классов: Warlord |
| №0729 app/data/classes/warlord.png | 2460016 B | логика классов: warlord |
| №0730 app/data/classes/Witch.js | 8032 B | логика классов: Witch |
| №0731 app/data/classes/witch.png | 1931074 B | логика классов: witch |
| №0732 app/data/classes/Wizard.js | 1627 B | логика классов: Wizard |
| №0733 app/data/classes/Wizard.png | 822251 B | логика классов: Wizard |
| №0734 app/data/feats/Feat_widget.js | 25654 B | черты и таланты: Feat widget |
| №0735 app/data/feats/Feats_phb.js | 19377 B | черты и таланты: Feats phb |
| №0736 app/data/feats/Feats_settings.js | 4392 B | черты и таланты: Feats settings |
| №0737 app/data/feats/Feats_tcoe.js | 5779 B | черты и таланты: Feats tcoe |
| №0738 app/data/feats/Feats_ua_homebrew.js | 11770 B | черты и таланты: Feats ua homebrew |
| №0739 app/data/feats/Feats_xgte.js | 6729 B | черты и таланты: Feats xgte |
| №0740 app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №0741 app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №0742 app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №0743 app/data/maps/3d_stress_test_all.json | 165139 B | данные/конфигурация: 3d stress test all |
| №0744 app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №0745 app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №0746 app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №0747 app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №0748 app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №0749 app/data/spells/Focuses.js | 53387 B | данные заклинаний: Focuses |
| №0750 app/data/spells/Spells1lvl.js | 60079 B | данные заклинаний: Spells1lvl |
| №0751 app/data/spells/Spells2lvl.js | 70401 B | данные заклинаний: Spells2lvl |
| №0752 app/data/spells/Spells3lvl.js | 48531 B | данные заклинаний: Spells3lvl |
| №0753 app/data/spells/Spells4lvl.js | 39396 B | данные заклинаний: Spells4lvl |
| №0754 app/data/spells/Spells5lvl.js | 41719 B | данные заклинаний: Spells5lvl |
| №0755 app/data/spells/spells6lvl.js | 37855 B | данные заклинаний: spells6lvl |
| №0756 app/data/spells/Spells7lvl.js | 29194 B | данные заклинаний: Spells7lvl |
| №0757 app/data/spells/Spells8lvl.js | 21355 B | данные заклинаний: Spells8lvl |
| №0758 app/data/spells/Spells9lvl.js | 32625 B | данные заклинаний: Spells9lvl |
| №0759 app/data/subclasses/subclassesRegistry.js | 111805 B | логика подклассов: subclassesRegistry |
| №0760 app/debug.js | 5961 B | логический модуль: debug |
| №0761 app/dice.js | 42492 B | логический модуль: dice |
| №0762 app/dnd_tools.js | 19419 B | логический модуль: dnd tools |
| №0763 app/expanded_bestiary_v39.js | 49383 B | логический модуль: expanded bestiary v39 |
| №0764 app/expanded_class_registry_bridge.js | 5025 B | логический модуль: expanded class registry bridge |
| №0765 app/expanded_classes_v23.js | 30269 B | логический модуль: expanded classes v23 |
| №0766 app/expanded_subclasses_v23.js | 2030 B | логический модуль: expanded subclasses v23 |
| №0767 app/expansion_class_progressions.js | 6719 B | логический модуль: expansion class progressions |
| №0768 app/expansion_classes_pack.js | 352830 B | логический модуль: expansion classes pack |
| №0769 app/Experience.js | 6150 B | логический модуль: Experience |
| №0770 app/extra_class_ui_bridge.js | 645 B | логический модуль: extra class ui bridge |
| №0771 app/feat_engine.js | 11457 B | логический модуль: feat engine |
| №0772 app/gameplay_core_v57.js | 20212 B | логический модуль: gameplay core v57 |
| №0773 app/ghost_extra_runtime.js | 22293 B | логический модуль: ghost extra runtime |
| №0774 app/ghost_extra_ui.js | 2387 B | логический модуль: ghost extra ui |
| №0775 app/Hero-info.js | 12434 B | логический модуль: Hero info |
| №0776 app/icon_settings_v2.js | 10484 B | логический модуль: icon settings v2 |
| №0777 app/icon_settings.js | 11281 B | логический модуль: icon settings |
| №0778 app/inventory_containers_v54.js | 12772 B | логический модуль: inventory containers v54 |
| №0779 app/inventory-coins.js | 23961 B | логический модуль: inventory coins |
| №0780 app/inventory-modal.js | 32494 B | логический модуль: inventory modal |
| №0781 app/Inventory-weight-tracker.js | 15712 B | логический модуль: Inventory weight tracker |
| №0782 app/Inventory.js | 36947 B | логический модуль: Inventory |
| №0783 app/junk.js | 8387 B | логический модуль: junk |
| №0784 app/kibbles_localization_content_v71.js | 32339 B | логический модуль: kibbles localization content v71 |
| №0785 app/library.js | 9314 B | логический модуль: library |
| №0786 app/Logo.js | 5742 B | логический модуль: Logo |
| №0787 app/magic_engine.js | 7570 B | логический модуль: magic engine |
| №0788 app/market_economy_v55.js | 17219 B | логический модуль: market economy v55 |
| №0789 app/market_expansion_v55_1.js | 21531 B | логический модуль: market expansion v55 1 |
| №0790 app/market_social_v55_3.js | 11752 B | логический модуль: market social v55 3 |
| №0791 app/market_trade_v55_2.js | 25582 B | логический модуль: market trade v55 2 |
| №0792 app/martyr_mhp_2024_runtime.js | 33254 B | логический модуль: martyr mhp 2024 runtime |
| №0793 app/materials.js | 11976 B | логический модуль: materials |
| №0794 app/monster_engine.js | 17873 B | логический модуль: monster engine |
| №0795 app/monster_loot_crafting_bridge_v40.js | 31518 B | логический модуль: monster loot crafting bridge v40 |
| №0796 app/monster_loot_engine_v36.js | 13559 B | логический модуль: monster loot engine v36 |
| №0797 app/monster_loot_engine_v37.js | 18554 B | логический модуль: monster loot engine v37 |
| №0798 app/necromancer_mhp_2024_runtime.js | 43556 B | логический модуль: necromancer mhp 2024 runtime |
| №0799 app/network_engine.js | 45962 B | логический модуль: network engine |
| №0800 app/network_gameplay.js | 87259 B | логический модуль: network gameplay |
| №0801 app/notes.js | 4818 B | логический модуль: notes |
| №0802 app/occultist_kibbles_v11_runtime.js | 60686 B | логический модуль: occultist kibbles v11 runtime |
| №0803 app/onboarding_faq_v71.css | 6093 B | оформление интерфейса: onboarding faq v71 |
| №0804 app/onboarding_faq_v71.js | 32373 B | логический модуль: onboarding faq v71 |
| №0805 app/parasite_extra_runtime.js | 30047 B | логический модуль: parasite extra runtime |
| №0806 app/parasite_extra_ui.js | 4710 B | логический модуль: parasite extra ui |
| №0807 app/predictor_cards.js | 145118 B | логический модуль: predictor cards |
| №0808 app/predictor_deck_ui.js | 39502 B | логический модуль: predictor deck ui |
| №0809 app/predictor_movement.js | 6682 B | логический модуль: predictor movement |
| №0810 app/predictor_runtime.js | 31001 B | логический модуль: predictor runtime |
| №0811 app/Proficiencies.js | 31253 B | логический модуль: Proficiencies |
| №0812 app/Proficienciescheck.js | 10367 B | логический модуль: Proficienciescheck |
| №0813 app/races.js | 52239 B | логический модуль: races |
| №0814 app/resource_gathering_v35.js | 12553 B | логический модуль: resource gathering v35 |
| №0815 app/resource_processing_v44.js | 22150 B | логический модуль: resource processing v44 |
| №0816 app/rulesEngine.js | 46039 B | логический модуль: rulesEngine |
| №0817 app/runekeeper_taron_v12_runtime.js | 27697 B | логический модуль: runekeeper taron v12 runtime |
| №0818 app/savant_laserllama_v561_runtime.js | 29860 B | логический модуль: savant laserllama v561 runtime |
| №0819 app/secondary_entities_engine.js | 7342 B | логический модуль: secondary entities engine |
| №0820 app/Settings_debug.js | 7336 B | логический модуль: Settings debug |
| №0821 app/Settings.js | 59645 B | логический модуль: Settings |
| №0822 app/shifter_laserllama_v2_1_runtime.js | 38454 B | логический модуль: shifter laserllama v2 1 runtime |
| №0823 app/skills.js | 6367 B | логический модуль: skills |
| №0824 app/spellblade_kibbles_runtime.js | 14261 B | логический модуль: spellblade kibbles runtime |
| №0825 app/spells.js | 39220 B | логический модуль: spells |
| №0826 app/styles.css | 24174 B | оформление интерфейса: styles |
| №0827 app/summoning_engine.js | 12861 B | логический модуль: summoning engine |
| №0828 app/swarm_extra_runtime.js | 19936 B | логический модуль: swarm extra runtime |
| №0829 app/swipe-lock.js | 1838 B | логический модуль: swipe lock |
| №0830 app/turn_planner.js | 15930 B | логический модуль: turn planner |
| №0831 app/update_manager_v2.js | 19885 B | логический модуль: update manager v2 |
| №0832 app/update_scene_v2.js | 11560 B | логический модуль: update scene v2 |
| №0833 app/vessel_laserllama_v4_runtime.js | 48055 B | логический модуль: vessel laserllama v4 runtime |
| №0834 app/vtt_character_actions_v64.js | 4047 B | логический модуль: vtt character actions v64 |
| №0835 app/vtt_character_sheet_v63.js | 3966 B | логический модуль: vtt character sheet v63 |
| №0836 app/vtt_combat_event_bus_v69.js | 8287 B | логический модуль: vtt combat event bus v69 |
| №0837 app/vtt_combat_log_v66.js | 8113 B | логический модуль: vtt combat log v66 |
| №0838 app/vtt_debug_character_lab_v702.js | 16566 B | логический модуль: vtt debug character lab v702 |
| №0839 app/vtt_debug_dice_lab_v706.js | 9112 B | логический модуль: vtt debug dice lab v706 |
| №0840 app/vtt_debug_error_log_v709.js | 5965 B | логический модуль: vtt debug error log v709 |
| №0841 app/vtt_debug_lab_v703.js | 12151 B | логический модуль: vtt debug lab v703 |
| №0842 app/vtt_debug_panel_v70.js | 17285 B | логический модуль: vtt debug panel v70 |
| №0843 app/vtt_debug_rules_matrix_v707.js | 6881 B | логический модуль: vtt debug rules matrix v707 |
| №0844 app/vtt_debug_sandbox_v701.js | 14634 B | логический модуль: vtt debug sandbox v701 |
| №0845 app/vtt_debug_scenario_editor_v705.js | 10352 B | логический модуль: vtt debug scenario editor v705 |
| №0846 app/vtt_debug_scenarios_v704.js | 8385 B | логический модуль: vtt debug scenarios v704 |
| №0847 app/vtt_debug_tasks_v708.js | 25273 B | логический модуль: vtt debug tasks v708 |
| №0848 app/vtt_dice_resolution_v65.js | 3941 B | логический модуль: vtt dice resolution v65 |
| №0849 app/vtt_encounter_checkpoint_v68.js | 9606 B | логический модуль: vtt encounter checkpoint v68 |
| №0850 app/vtt_encounter_map_v59.js | 9462 B | логический модуль: vtt encounter map v59 |
| №0851 app/vtt_gameplay_ux_v58.js | 8641 B | логический модуль: vtt gameplay ux v58 |
| №0852 app/vtt_mobile_battle_v61.js | 4559 B | логический модуль: vtt mobile battle v61 |
| №0853 app/vtt_mobile_combat_hud_v62.js | 9071 B | логический модуль: vtt mobile combat hud v62 |
| №0854 app/vtt_mobile_session_v67.js | 11143 B | логический модуль: vtt mobile session v67 |
| №0855 app/vtt_project_manifest_v70.js | 44405 B | логический модуль: vtt project manifest v70 |
| №0856 app/vtt_token_interaction_v60.js | 8542 B | логический модуль: vtt token interaction v60 |
| №0857 app/Wallpapers.js | 19943 B | логический модуль: Wallpapers |
| №0858 app/walter_parasite_extra_runtime.js | 33758 B | логический модуль: walter parasite extra runtime |
| №0859 app/walter_parasite_ui.js | 4185 B | логический модуль: walter parasite ui |
| №0860 app/warden_mhp_2024_runtime.js | 41820 B | логический модуль: warden mhp 2024 runtime |
| №0861 app/warlord_laserllama_v330_runtime.js | 15866 B | логический модуль: warlord laserllama v330 runtime |
| №0862 app/weapons.js | 3380 B | логический модуль: weapons |
| №0863 app/weaponsheavy.js | 8328 B | логический модуль: weaponsheavy |
| №0864 app/weaponsmelee.js | 20232 B | логический модуль: weaponsmelee |
| №0865 app/weaponsranged.js | 18195 B | логический модуль: weaponsranged |
| №0866 app/weaponsspecial.js | 5655 B | логический модуль: weaponsspecial |
| №0867 app/world_resource_gathering_v53.js | 17353 B | логический модуль: world resource gathering v53 |
| №0868 arcanacards.png | 1820683 B | текстура/изображение: arcanacards |
| №0869 ash_v2_sprite.png | 442476 B | текстура/изображение: ash v2 sprite |
| №0870 bed.glb | 5718760 B | 3D модель/геометрия: bed |
| №0871 bookshelf.glb | 7818348 B | 3D модель/геометрия: bookshelf |
| №0872 chair.glb | 4643004 B | 3D модель/геометрия: chair |
| №0873 closet.glb | 6550260 B | 3D модель/геометрия: closet |
| №0874 commode.glb | 4845868 B | 3D модель/геометрия: commode |
| №0875 desktop/main.cjs | 8991 B | Electron: создание окна Windows |
| №0876 desktop/preload.cjs | 2239 B | Electron: preload и мост к UI |
| №0877 desktop/prepare.cjs | 3322 B | Electron: подготовка web ресурсов |
| №0878 desktop/update.cjs | 10917 B | Electron: обновление |
| №0879 DND_VTT_FURNITURE_CONVERSION_KIT.zip | 4072 B | архив ассетов: DND VTT FURNITURE CONVERSION KIT |
| №0880 DND_VTT_FURNITURE_READY_02.zip | 65111 B | архив ассетов: DND VTT FURNITURE READY 02 |
| №0881 DND_VTT_FURNITURE_READY_03.zip | 84538 B | архив ассетов: DND VTT FURNITURE READY 03 |
| №0882 DND_VTT_FURNITURE_READY_04.zip | 133763 B | архив ассетов: DND VTT FURNITURE READY 04 |
| №0883 DND_VTT_FURNITURE_READY_05.zip | 54294 B | архив ассетов: DND VTT FURNITURE READY 05 |
| №0884 DND_VTT_FURNITURE_READY_06.zip | 89087 B | архив ассетов: DND VTT FURNITURE READY 06 |
| №0885 DND_VTT_FURNITURE_READY_07.zip | 73932 B | архив ассетов: DND VTT FURNITURE READY 07 |
| №0886 DND_VTT_FURNITURE_READY_08.zip | 67621 B | архив ассетов: DND VTT FURNITURE READY 08 |
| №0887 DND_VTT_FURNITURE_READY_09_20_MODELS.zip | 101933 B | архив ассетов: DND VTT FURNITURE READY 09 20 MODELS |
| №0888 DND_VTT_REMAINING_GLB_BULK.zip | 5302181 B | архив ассетов: DND VTT REMAINING GLB BULK |
| №0889 docs/00_AI_PROJECT_GUIDE.md | 351623 B | документация или отчёт: 00 AI PROJECT GUIDE |
| №0890 docs/00_NEW_CHAT_PROMPT_V56_10.txt | 2658 B | документация или отчёт: 00 NEW CHAT PROMPT V56 10 |
| №0891 docs/00_NEW_CHAT_PROMPT_V56_11.txt | 2118 B | документация или отчёт: 00 NEW CHAT PROMPT V56 11 |
| №0892 docs/00_NEW_CHAT_PROMPT_V56_12.txt | 763 B | документация или отчёт: 00 NEW CHAT PROMPT V56 12 |
| №0893 docs/00_NEW_CHAT_PROMPT_V56_9.txt | 3900 B | документация или отчёт: 00 NEW CHAT PROMPT V56 9 |
| №0894 docs/2026-10-09_ota_v74_00_17_checkpoint.json | 1645 B | документация или отчёт: 2026 10 09 ota v74 00 17 checkpoint |
| №0895 docs/2026-10-09_ota_v74_00_17.md | 6180 B | документация или отчёт: 2026 10 09 ota v74 00 17 |
| №0896 docs/2026-10-11_ota_v74_00_57_checkpoint.json | 469 B | документация или отчёт: 2026 10 11 ota v74 00 57 checkpoint |
| №0897 docs/2026-10-11_ota_v74_00_57.md | 5873 B | документация или отчёт: 2026 10 11 ota v74 00 57 |
| №0898 docs/3D_ASSET_IMPORT_BATCHES.md | 32725 B | документация или отчёт: 3D ASSET IMPORT BATCHES |
| №0899 docs/3d_character_anatomy/ADULT_ANATOMY_PROGRESS.md | 43788 B | документация или отчёт: ADULT ANATOMY PROGRESS |
| №0900 docs/3d_character_anatomy/ASSET_AUDIT_2026-10-12.json | 22458 B | документация или отчёт: ASSET AUDIT 2026 10 12 |
| №0901 docs/3d_character_anatomy/SKIN_MATERIAL_PIPELINE.md | 7470 B | документация или отчёт: SKIN MATERIAL PIPELINE |
| №0902 docs/3d_character_journal/2026-10-09_01_morph_architecture.md | 2418 B | документация или отчёт: 2026 10 09 01 morph architecture |
| №0903 docs/3d_character_journal/2026-10-09_02_morph_bridge.md | 2712 B | документация или отчёт: 2026 10 09 02 morph bridge |
| №0904 docs/3d_character_journal/2026-10-09_03_morph_bridge_diagnostics.md | 1768 B | документация или отчёт: 2026 10 09 03 morph bridge diagnostics |
| №0905 docs/3d_character_journal/2026-10-09_04_skin_textures.md | 4995 B | документация или отчёт: 2026 10 09 04 skin textures |
| №0906 docs/3d_character_journal/2026-10-09_05_named_makehuman_morphs.md | 8679 B | документация или отчёт: 2026 10 09 05 named makehuman morphs |
| №0907 docs/3d_character_journal/2026-10-09_06_female_stage1_checkpoint.json | 5867 B | документация или отчёт: 2026 10 09 06 female stage1 checkpoint |
| №0908 docs/3d_character_journal/2026-10-09_06_female_stage1.md | 8415 B | документация или отчёт: 2026 10 09 06 female stage1 |
| №0909 docs/3d_character_journal/2026-10-09_07_female_stage2_checkpoint.json | 871 B | документация или отчёт: 2026 10 09 07 female stage2 checkpoint |
| №0910 docs/3d_character_journal/2026-10-09_07_female_stage2.md | 7677 B | документация или отчёт: 2026 10 09 07 female stage2 |
| №0911 docs/3d_character_journal/2026-10-09_08_female_release_checkpoint.json | 1725 B | документация или отчёт: 2026 10 09 08 female release checkpoint |
| №0912 docs/3d_character_journal/2026-10-09_08_female_release.md | 7794 B | документация или отчёт: 2026 10 09 08 female release |
| №0913 docs/3d_character_journal/2026-10-10_editor_v74_00_22.md | 6792 B | документация или отчёт: 2026 10 10 editor v74 00 22 |
| №0914 docs/3d_character_journal/2026-10-11_editor_v74_00_32.md | 1158 B | документация или отчёт: 2026 10 11 editor v74 00 32 |
| №0915 docs/3d_character_journal/2026-10-11_editor_v74_00_33.md | 1260 B | документация или отчёт: 2026 10 11 editor v74 00 33 |
| №0916 docs/3d_character_journal/2026-10-11_editor_v74_00_34.md | 3336 B | документация или отчёт: 2026 10 11 editor v74 00 34 |
| №0917 docs/3d_character_journal/2026-10-11_editor_v74_00_35.md | 3249 B | документация или отчёт: 2026 10 11 editor v74 00 35 |
| №0918 docs/3d_character_races/aarakocra.md | 4966 B | документация или отчёт: aarakocra |
| №0919 docs/3d_character_races/aasimar.md | 2398 B | документация или отчёт: aasimar |
| №0920 docs/3d_character_races/ANIMAL_HEADS.md | 5724 B | документация или отчёт: ANIMAL HEADS |
| №0921 docs/3d_character_races/autognome.md | 2759 B | документация или отчёт: autognome |
| №0922 docs/3d_character_races/AVIAN_ELEPHANT_HEADS.md | 5661 B | документация или отчёт: AVIAN ELEPHANT HEADS |
| №0923 docs/3d_character_races/bugbear.md | 4059 B | документация или отчёт: bugbear |
| №0924 docs/3d_character_races/centaur.md | 2896 B | документация или отчёт: centaur |
| №0925 docs/3d_character_races/changeling.md | 2162 B | документация или отчёт: changeling |
| №0926 docs/3d_character_races/dhampir.md | 1557 B | документация или отчёт: dhampir |
| №0927 docs/3d_character_races/dragonborn.md | 5010 B | документация или отчёт: dragonborn |
| №0928 docs/3d_character_races/dwarf_hill.md | 2179 B | документация или отчёт: dwarf hill |
| №0929 docs/3d_character_races/dwarf_mountain.md | 2179 B | документация или отчёт: dwarf mountain |
| №0930 docs/3d_character_races/elf_drow.md | 4152 B | документация или отчёт: elf drow |
| №0931 docs/3d_character_races/elf_high.md | 4150 B | документация или отчёт: elf high |
| №0932 docs/3d_character_races/elf_wood.md | 4135 B | документация или отчёт: elf wood |
| №0933 docs/3d_character_races/EXTRA_FORMS_PLAN.md | 5841 B | документация или отчёт: EXTRA FORMS PLAN |
| №0934 docs/3d_character_races/fairy.md | 2154 B | документация или отчёт: fairy |
| №0935 docs/3d_character_races/firbolg.md | 1211 B | документация или отчёт: firbolg |
| №0936 docs/3d_character_races/full_orc.md | 2994 B | документация или отчёт: full orc |
| №0937 docs/3d_character_races/FUR_PACK.md | 3742 B | документация или отчёт: FUR PACK |
| №0938 docs/3d_character_races/genasi_air.md | 1474 B | документация или отчёт: genasi air |
| №0939 docs/3d_character_races/genasi_earth.md | 1519 B | документация или отчёт: genasi earth |
| №0940 docs/3d_character_races/genasi_fire.md | 1527 B | документация или отчёт: genasi fire |
| №0941 docs/3d_character_races/genasi_water.md | 1464 B | документация или отчёт: genasi water |
| №0942 docs/3d_character_races/ghost.md | 5482 B | документация или отчёт: ghost |
| №0943 docs/3d_character_races/githyanki.md | 1321 B | документация или отчёт: githyanki |
| №0944 docs/3d_character_races/githzerai.md | 1321 B | документация или отчёт: githzerai |
| №0945 docs/3d_character_races/gnome_forest.md | 2175 B | документация или отчёт: gnome forest |
| №0946 docs/3d_character_races/gnome_rock.md | 2177 B | документация или отчёт: gnome rock |
| №0947 docs/3d_character_races/goblin.md | 1278 B | документация или отчёт: goblin |
| №0948 docs/3d_character_races/goliath.md | 1362 B | документация или отчёт: goliath |
| №0949 docs/3d_character_races/hadozee.md | 4245 B | документация или отчёт: hadozee |
| №0950 docs/3d_character_races/HAIR_PACK.md | 4833 B | документация или отчёт: HAIR PACK |
| №0951 docs/3d_character_races/half_elf.md | 4189 B | документация или отчёт: half elf |
| №0952 docs/3d_character_races/half_orc.md | 3002 B | документация или отчёт: half orc |
| №0953 docs/3d_character_races/halfling_lightfoot.md | 3486 B | документация или отчёт: halfling lightfoot |
| №0954 docs/3d_character_races/halfling_stout.md | 3482 B | документация или отчёт: halfling stout |
| №0955 docs/3d_character_races/harengon.md | 5657 B | документация или отчёт: harengon |
| №0956 docs/3d_character_races/hexblood.md | 1643 B | документация или отчёт: hexblood |
| №0957 docs/3d_character_races/hobgoblin.md | 1210 B | документация или отчёт: hobgoblin |
| №0958 docs/3d_character_races/kalashtar.md | 1410 B | документация или отчёт: kalashtar |
| №0959 docs/3d_character_races/kender.md | 1159 B | документация или отчёт: kender |
| №0960 docs/3d_character_races/kenku.md | 5013 B | документация или отчёт: kenku |
| №0961 docs/3d_character_races/kobold.md | 4696 B | документация или отчёт: kobold |
| №0962 docs/3d_character_races/lizardfolk.md | 4944 B | документация или отчёт: lizardfolk |
| №0963 docs/3d_character_races/loxodon.md | 4673 B | документация или отчёт: loxodon |
| №0964 docs/3d_character_races/minotaur.md | 6054 B | документация или отчёт: minotaur |
| №0965 docs/3d_character_races/myconid.md | 1846 B | документация или отчёт: myconid |
| №0966 docs/3d_character_races/NATIVE_LIMBS.md | 6433 B | документация или отчёт: NATIVE LIMBS |
| №0967 docs/3d_character_races/owlin.md | 5120 B | документация или отчёт: owlin |
| №0968 docs/3d_character_races/parasite.md | 3100 B | документация или отчёт: parasite |
| №0969 docs/3d_character_races/plasmoid.md | 1933 B | документация или отчёт: plasmoid |
| №0970 docs/3d_character_races/RACES_3D_REMAINING_AUDIT_2026-10-12.md | 35486 B | документация или отчёт: RACES 3D REMAINING AUDIT 2026 10 12 |
| №0971 docs/3d_character_races/reborn.md | 1619 B | документация или отчёт: reborn |
| №0972 docs/3d_character_races/REMAINING_WORK.md | 23848 B | документация или отчёт: REMAINING WORK |
| №0973 docs/3d_character_races/satyr.md | 5063 B | документация или отчёт: satyr |
| №0974 docs/3d_character_races/shifter.md | 3214 B | документация или отчёт: shifter |
| №0975 docs/3d_character_races/simic_hybrid.md | 2647 B | документация или отчёт: simic hybrid |
| №0976 docs/3d_character_races/swarm_bats.md | 1019 B | документация или отчёт: swarm bats |
| №0977 docs/3d_character_races/swarm_beetles.md | 6967 B | документация или отчёт: swarm beetles |
| №0978 docs/3d_character_races/SWARM_DENSE_REDESIGN.md | 9032 B | документация или отчёт: SWARM DENSE REDESIGN |
| №0979 docs/3d_character_races/swarm_rats.md | 6463 B | документация или отчёт: swarm rats |
| №0980 docs/3d_character_races/tabaxi.md | 6015 B | документация или отчёт: tabaxi |
| №0981 docs/3d_character_races/TEXTURE_PACK_CHECKPOINT.md | 17270 B | документация или отчёт: TEXTURE PACK CHECKPOINT |
| №0982 docs/3d_character_races/TIEFLING_DETAIL_REDESIGN.md | 7294 B | документация или отчёт: TIEFLING DETAIL REDESIGN |
| №0983 docs/3d_character_races/tiefling.md | 2992 B | документация или отчёт: tiefling |
| №0984 docs/3d_character_races/tortle.md | 5805 B | документация или отчёт: tortle |
| №0985 docs/3d_character_races/triton.md | 1588 B | документация или отчёт: triton |
| №0986 docs/3d_character_races/vedalken.md | 1301 B | документация или отчёт: vedalken |
| №0987 docs/3d_character_races/walter_parasite.md | 3278 B | документация или отчёт: walter parasite |
| №0988 docs/3d_character_races/warforged.md | 2731 B | документация или отчёт: warforged |
| №0989 docs/3d_character_races/yuan_ti.md | 1669 B | документация или отчёт: yuan ti |
| №0990 docs/AI_AUTOMATION.md | 4081 B | документация или отчёт: AI AUTOMATION |
| №0991 docs/CLASS_IMPLEMENTATION_PLAN.md | 19250 B | документация или отчёт: CLASS IMPLEMENTATION PLAN |
| №0992 docs/CLASS_MECHANICS_SPEC.md | 38943 B | документация или отчёт: CLASS MECHANICS SPEC |
| №0993 docs/CLOUD_CHARACTER_SYNC.md | 31142 B | документация или отчёт: CLOUD CHARACTER SYNC |
| №0994 docs/CLOUD_SAVE_CALLERS.txt | 1869 B | документация или отчёт: CLOUD SAVE CALLERS |
| №0995 docs/DND_VTT_CLASS_AUDIT_V74_00_17.md | 184356 B | документация или отчёт: DND VTT CLASS AUDIT V74 00 17 |
| №0996 docs/Help.txt | 110717 B | документация или отчёт: Help |
| №0997 docs/KIBBLES_ATTRIBUTION_V71.md | 803 B | документация или отчёт: KIBBLES ATTRIBUTION V71 |
| №0998 docs/map-stage-740019.md | 1675 B | документация или отчёт: map stage 740019 |
| №0999 docs/map-stage-740021.md | 2000 B | документация или отчёт: map stage 740021 |
| №1000 docs/MONETIZATION_ROADMAP.md | 15924 B | документация или отчёт: MONETIZATION ROADMAP |
| №1001 docs/NETWORK_APK_NOTES.md | 7296 B | документация или отчёт: NETWORK APK NOTES |
| №1002 docs/PREDICTOR_APPROVED_CARD_STATUS.md | 52542 B | документация или отчёт: PREDICTOR APPROVED CARD STATUS |
| №1003 docs/PREDICTOR_CLASS_SPEC.md | 94181 B | документация или отчёт: PREDICTOR CLASS SPEC |
| №1004 docs/PRODUCT_ACCESS_AND_MONETIZATION.md | 11580 B | документация или отчёт: PRODUCT ACCESS AND MONETIZATION |
| №1005 docs/ROOT_FURNITURE_IMPORT_REPORT.md | 6882 B | документация или отчёт: ROOT FURNITURE IMPORT REPORT |
| №1006 docs/SIGNATURE_ASSET_FIX_74_00_66.md | 1729 B | документация или отчёт: SIGNATURE ASSET FIX 74 00 66 |
| №1007 docs/SUPABASE_MAIL_SETUP_PROMPT_RU.md | 2853 B | документация или отчёт: SUPABASE MAIL SETUP PROMPT RU |
| №1008 docs/UNIFIED_RELEASE.md | 6136 B | документация или отчёт: UNIFIED RELEASE |
| №1009 docs/WINDOWS_DESKTOP.md | 3756 B | документация или отчёт: WINDOWS DESKTOP |
| №1010 dragon_fire_v2_sprite.png | 1013123 B | текстура/изображение: dragon fire v2 sprite |
| №1011 embers_v2_sprite.png | 698014 B | текстура/изображение: embers v2 sprite |
| №1012 FAQ.md | 38563 B | документация или отчёт: FAQ |
| №1013 fire_front_v2_sprite.png | 2249732 B | текстура/изображение: fire front v2 sprite |
| №1014 fire_spread_mask_v2_sprite.png | 1373284 B | текстура/изображение: fire spread mask v2 sprite |
| №1015 flash_v2_sprite.png | 803264 B | текстура/изображение: flash v2 sprite |
| №1016 floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1017 floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1018 floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1019 floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1020 floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1021 floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1022 floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1023 floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1024 floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1025 floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1026 floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1027 floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1028 floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1029 floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1030 floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1031 floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1032 floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1033 floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1034 GLENMORIL Soundtrack - Music Box.mp3 | 1827664 B | аудиофайл: GLENMORIL Soundtrack   Music Box |
| №1035 gltf_catalog.js | 3197 B | логический модуль: gltf catalog |
| №1036 heat_glow_v2_sprite.png | 836371 B | текстура/изображение: heat glow v2 sprite |
| №1037 human-base-rigged.glb | 4994640 B | 3D модель/геометрия: human base rigged |
| №1038 index.html | 89700 B | HTML-точка входа; интерфейс и порядок JS загрузки |
| №1039 Jalan Jalan - Lotus.mp3 | 9083034 B | аудиофайл: Jalan Jalan   Lotus |
| №1040 lineage_2_16. Shepard's Flute.mp3 | 2997816 B | аудиофайл: lineage 2 16. Shepard's Flute |
| №1041 manifest.json | 488 B | данные/конфигурация: manifest |
| №1042 Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3 | 4020570 B | аудиофайл: Oliver DeRiviere   Prelude to an End (grizzlymusic.ru) |
| №1043 Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3 | 3530381 B | аудиофайл: Oliver Deriviere   Who Am I (grizzlymusic.ru) |
| №1044 package.json | 1608 B | npm и упаковка desktop EXE |
| №1045 PROJECT_ATLAS.md | генерируется | машиночитаемая карта репозитория для ИИ |
| №1046 PROJECT_ATLAS.txt | генерируется | человекочитаемая карта репозитория |
| №1047 README.md | 145 B | документация или отчёт: README |
| №1048 smoke_back_v2_sprite-1.png | 1707378 B | текстура/изображение: smoke back v2 sprite 1 |
| №1049 smoke_back_v2_sprite.png | 1814587 B | текстура/изображение: smoke back v2 sprite |
| №1050 smoke_front_v2_sprite-1.png | 1890480 B | текстура/изображение: smoke front v2 sprite 1 |
| №1051 smoke_front_v2_sprite.png | 2064687 B | текстура/изображение: smoke front v2 sprite |
| №1052 smoke_mid_v2_sprite.png | 1898516 B | текстура/изображение: smoke mid v2 sprite |
| №1053 supabase/migrations/202610130001_characters.sql | 4421 B | SQL миграция Supabase |
| №1054 table.glb | 6217412 B | 3D модель/геометрия: table |
| №1055 tests/ai_automation_test.cjs | 1649 B | автотест: ai automation test |
| №1056 tests/ai_finalize_test.cjs | 3840 B | автотест: ai finalize test |
| №1057 tests/alchemist_combat_test.js | 19298 B | автотест: alchemist combat test |
| №1058 tests/alchemist_runtime_test.js | 41827 B | автотест: alchemist runtime test |
| №1059 tests/character_3d_editor_test.js | 14206 B | автотест: character 3d editor test |
| №1060 tests/character_3d_foundation_test.js | 15396 B | автотест: character 3d foundation test |
| №1061 tests/character_3d_morph_assets_test.js | 5179 B | автотест: character 3d morph assets test |
| №1062 tests/character_3d_skin_assets_test.js | 1827 B | автотест: character 3d skin assets test |
| №1063 tests/character_3d_skin_morph_test.js | 3032 B | автотест: character 3d skin morph test |
| №1064 tests/character_adult_anatomy_test.js | 4704 B | автотест: character adult anatomy test |
| №1065 tests/character_animal_heads_test.js | 4415 B | автотест: character animal heads test |
| №1066 tests/character_appearance_store_test.js | 2308 B | автотест: character appearance store test |
| №1067 tests/character_avian_elephant_heads_test.js | 5125 B | автотест: character avian elephant heads test |
| №1068 tests/character_clothing_customizer_geometry_test.js | 4676 B | автотест: character clothing customizer geometry test |
| №1069 tests/character_clothing_options_test.js | 1922 B | автотест: character clothing options test |
| №1070 tests/character_clothing_test.js | 7286 B | автотест: character clothing test |
| №1071 tests/character_editor_morph_assets_test.js | 4783 B | автотест: character editor morph assets test |
| №1072 tests/character_elf_details_test.js | 2787 B | автотест: character elf details test |
| №1073 tests/character_external_anatomy_test.js | 7930 B | автотест: character external anatomy test |
| №1074 tests/character_fur_test.js | 3520 B | автотест: character fur test |
| №1075 tests/character_ghost_geometry_test.js | 3867 B | автотест: character ghost geometry test |
| №1076 tests/character_hair_pack_test.js | 2838 B | автотест: character hair pack test |
| №1077 tests/character_head_geometry_test.js | 3575 B | автотест: character head geometry test |
| №1078 tests/character_male_anatomy_fix_test.js | 3902 B | автотест: character male anatomy fix test |
| №1079 tests/character_native_limbs_test.js | 4909 B | автотест: character native limbs test |
| №1080 tests/character_parasites_geometry_test.js | 3738 B | автотест: character parasites geometry test |
| №1081 tests/character_races_geometry_test.js | 19702 B | автотест: character races geometry test |
| №1082 tests/character_reptile_heads_test.js | 3734 B | автотест: character reptile heads test |
| №1083 tests/character_skin_material_test.js | 3816 B | автотест: character skin material test |
| №1084 tests/character_stat_modes_levelup_test.cjs | 4864 B | автотест: character stat modes levelup test |
| №1085 tests/character_swarm_geometry_test.js | 3505 B | автотест: character swarm geometry test |
| №1086 tests/character_tiefling_details_test.js | 4451 B | автотест: character tiefling details test |
| №1087 tests/cloud_rls_test.sql | 5342 B | автотест: cloud rls test |
| №1088 tests/cloud_sql_concurrency.cjs | 2072 B | автотест: cloud sql concurrency |
| №1089 tests/cloud_sync_test.cjs | 19921 B | автотест: cloud sync test |
| №1090 tests/crafting_disassembly_v51_test.js | 3052 B | автотест: crafting disassembly v51 test |
| №1091 tests/crafting_dlc_v50_test.js | 2668 B | автотест: crafting dlc v50 test |
| №1092 tests/crafting_economy_v49_test.js | 1974 B | автотест: crafting economy v49 test |
| №1093 tests/creation_signature_asset_test.cjs | 3935 B | автотест: creation signature asset test |
| №1094 tests/desktop_update_contract.cjs | 4025 B | автотест: desktop update contract |
| №1095 tests/fixtures/cloud_auth.sql | 711 B | автотест: cloud auth |
| №1096 tests/fixtures/female_anatomy_74_00_59.json | 251 B | автотест: female anatomy 74 00 59 |
| №1097 tests/generate_makehuman_glb_morph_fixture.js | 4454 B | автотест: generate makehuman glb morph fixture |
| №1098 tests/gltf_loader_smoke.cjs | 3734 B | автотест: gltf loader smoke |
| №1099 tests/helpers/class_runtime_harness.js | 2323 B | автотест: class runtime harness |
| №1100 tests/human_base_glb_audit.js | 2158 B | автотест: human base glb audit |
| №1101 tests/imported_3d_editor_assets.cjs | 2157 B | автотест: imported 3d editor assets |
| №1102 tests/makehuman_gender_fixture_audit.js | 4646 B | автотест: makehuman gender fixture audit |
| №1103 tests/makehuman_gender_recipe_test.js | 5498 B | автотест: makehuman gender recipe test |
| №1104 tests/makehuman_glb_morph_fixture_audit.js | 1703 B | автотест: makehuman glb morph fixture audit |
| №1105 tests/makehuman_morph_bridge.js | 9756 B | автотест: makehuman morph bridge |
| №1106 tests/makehuman_surface_mapping_audit.js | 9447 B | автотест: makehuman surface mapping audit |
| №1107 tests/makehuman_target_reverse_transfer_audit.js | 10959 B | автотест: makehuman target reverse transfer audit |
| №1108 tests/makehuman_target_surface_transfer_audit.js | 12260 B | автотест: makehuman target surface transfer audit |
| №1109 tests/makehuman_topology_audit.js | 5878 B | автотест: makehuman topology audit |
| №1110 tests/makehuman_uv_bridge_test.js | 1465 B | автотест: makehuman uv bridge test |
| №1111 tests/makehuman_vertex_mapping_audit.js | 7410 B | автотест: makehuman vertex mapping audit |
| №1112 tests/map_editor_dom_test.js | 3347 B | автотест: map editor dom test |
| №1113 tests/map_rebuild_world_test.js | 3815 B | автотест: map rebuild world test |
| №1114 tests/predictor_aura_ledger_test.cjs | 12810 B | автотест: predictor aura ledger test |
| №1115 tests/predictor_blind_test.cjs | 4972 B | автотест: predictor blind test |
| №1116 tests/predictor_cards_test.cjs | 10793 B | автотест: predictor cards test |
| №1117 tests/predictor_cloud_sync_test.cjs | 36354 B | автотест: predictor cloud sync test |
| №1118 tests/predictor_coin_ancestor_test.cjs | 6734 B | автотест: predictor coin ancestor test |
| №1119 tests/predictor_deck_ui_test.cjs | 29014 B | автотест: predictor deck ui test |
| №1120 tests/predictor_devil_plan_test.cjs | 4680 B | автотест: predictor devil plan test |
| №1121 tests/predictor_event_reactions_test.cjs | 7259 B | автотест: predictor event reactions test |
| №1122 tests/predictor_exhaustion_test.cjs | 4867 B | автотест: predictor exhaustion test |
| №1123 tests/predictor_healing_reaction_test.cjs | 5049 B | автотест: predictor healing reaction test |
| №1124 tests/predictor_inventory_rewards_test.cjs | 14111 B | автотест: predictor inventory rewards test |
| №1125 tests/predictor_last_stand_test.cjs | 12289 B | автотест: predictor last stand test |
| №1126 tests/predictor_mage_spells_test.cjs | 29988 B | автотест: predictor mage spells test |
| №1127 tests/predictor_motion_cards_test.cjs | 11690 B | автотест: predictor motion cards test |
| №1128 tests/predictor_movement_cards_test.cjs | 7196 B | автотест: predictor movement cards test |
| №1129 tests/predictor_progression_test.cjs | 3750 B | автотест: predictor progression test |
| №1130 tests/predictor_runtime_test.cjs | 10585 B | автотест: predictor runtime test |
| №1131 tests/predictor_seven_cups_test.cjs | 12727 B | автотест: predictor seven cups test |
| №1132 tests/predictor_status_cards_test.cjs | 13936 B | автотест: predictor status cards test |
| №1133 tests/predictor_tactics_cards_test.cjs | 11334 B | автотест: predictor tactics cards test |
| №1134 tests/predictor_trickster_test.cjs | 10554 B | автотест: predictor trickster test |
| №1135 tests/predictor_turn_effects_test.cjs | 13273 B | автотест: predictor turn effects test |
| №1136 tests/predictor_vision_control_test.cjs | 12922 B | автотест: predictor vision control test |
| №1137 tests/predictor_world_truth_search_test.cjs | 5654 B | автотест: predictor world truth search test |
| №1138 tests/pugilist_combat_test.js | 21085 B | автотест: pugilist combat test |
| №1139 tests/pugilist_runtime_test.js | 4834 B | автотест: pugilist runtime test |
| №1140 tests/stair_navigation.cjs | 2520 B | автотест: stair navigation |
| №1141 tests/test_blood_hunter_completion.js | 8673 B | автотест: test blood hunter completion |
| №1142 tests/test_blood_hunter_focus_network.js | 3203 B | автотест: test blood hunter focus network |
| №1143 tests/test_blood_hunter_orders.js | 9810 B | автотест: test blood hunter orders |
| №1144 tests/test_blood_hunter_patron_selection.js | 4699 B | автотест: test blood hunter patron selection |
| №1145 tests/test_blood_hunter_profane_focus.js | 6459 B | автотест: test blood hunter profane focus |
| №1146 tests/test_class_audit_runtime.js | 14611 B | автотест: test class audit runtime |
| №1147 tests/test_class_audit_stage2_runtime.js | 15372 B | автотест: test class audit stage2 runtime |
| №1148 tests/test_class_audit_stage3_runtime.js | 16610 B | автотест: test class audit stage3 runtime |
| №1149 tests/test_class_audit_stage4_runtime.js | 23853 B | автотест: test class audit stage4 runtime |
| №1150 tests/test_v52.js | 2202 B | автотест: test v52 |
| №1151 tests/test_v53.js | 2507 B | автотест: test v53 |
| №1152 tests/test_v54.js | 2148 B | автотест: test v54 |
| №1153 tests/test_v55_2.js | 4154 B | автотест: test v55 2 |
| №1154 tests/test_v55_3.js | 2635 B | автотест: test v55 3 |
| №1155 tests/test_v55.js | 2152 B | автотест: test v55 |
| №1156 tests/test_v56_1.js | 1667 B | автотест: test v56 1 |
| №1157 tests/test_v56_10.js | 2140 B | автотест: test v56 10 |
| №1158 tests/test_v56_11.js | 1791 B | автотест: test v56 11 |
| №1159 tests/test_v56_12.js | 1665 B | автотест: test v56 12 |
| №1160 tests/test_v56_13.js | 2465 B | автотест: test v56 13 |
| №1161 tests/test_v56_2.js | 1697 B | автотест: test v56 2 |
| №1162 tests/test_v56_3.js | 1363 B | автотест: test v56 3 |
| №1163 tests/test_v56_4.js | 1458 B | автотест: test v56 4 |
| №1164 tests/test_v56_5.js | 1745 B | автотест: test v56 5 |
| №1165 tests/test_v56_6.js | 1439 B | автотест: test v56 6 |
| №1166 tests/test_v56_8.js | 1516 B | автотест: test v56 8 |
| №1167 tests/test_v56_9.js | 1734 B | автотест: test v56 9 |
| №1168 tests/test_v56.js | 3572 B | автотест: test v56 |
| №1169 tests/test_v57.js | 2554 B | автотест: test v57 |
| №1170 tests/test_v58.js | 1847 B | автотест: test v58 |
| №1171 tests/test_v59.js | 878 B | автотест: test v59 |
| №1172 tests/test_v60.js | 860 B | автотест: test v60 |
| №1173 tests/test_v61.js | 961 B | автотест: test v61 |
| №1174 tests/test_v62.js | 800 B | автотест: test v62 |
| №1175 tests/test_v63.js | 364 B | автотест: test v63 |
| №1176 tests/test_v64.js | 312 B | автотест: test v64 |
| №1177 tests/test_v65.js | 335 B | автотест: test v65 |
| №1178 tests/test_v66.js | 373 B | автотест: test v66 |
| №1179 tests/test_v67.js | 628 B | автотест: test v67 |
| №1180 tests/test_v68.js | 984 B | автотест: test v68 |
| №1181 tests/test_v69.js | 1713 B | автотест: test v69 |
| №1182 tests/test_v70.js | 2112 B | автотест: test v70 |
| №1183 tests/test_v701.js | 2425 B | автотест: test v701 |
| №1184 tests/test_v702.js | 4409 B | автотест: test v702 |
| №1185 tests/test_v703.js | 2646 B | автотест: test v703 |
| №1186 tests/test_v704.js | 2402 B | автотест: test v704 |
| №1187 tests/test_v705.js | 2717 B | автотест: test v705 |
| №1188 tests/test_v706.js | 1414 B | автотест: test v706 |
| №1189 tests/test_v707.js | 1066 B | автотест: test v707 |
| №1190 tests/test_v708_fixes.js | 2968 B | автотест: test v708 fixes |
| №1191 tests/test_v709_fixes.js | 2128 B | автотест: test v709 fixes |
| №1192 tests/test_v710_fixes.js | 2223 B | автотест: test v710 fixes |
| №1193 tests/test_v711_fixes.js | 1037 B | автотест: test v711 fixes |
| №1194 tests/test_v712_fixes.js | 1675 B | автотест: test v712 fixes |
| №1195 tests/test_v713_fixes.js | 2127 B | автотест: test v713 fixes |
| №1196 tests/test_v714_fixes.js | 1727 B | автотест: test v714 fixes |
| №1197 tests/test_v715_fixes.js | 1817 B | автотест: test v715 fixes |
| №1198 tests/test_v716_fixes.js | 1980 B | автотест: test v716 fixes |
| №1199 tests/test_v717_fixes.js | 2657 B | автотест: test v717 fixes |
| №1200 tests/test_v718_fixes.js | 1001 B | автотест: test v718 fixes |
| №1201 tests/test_v719_fixes.js | 1156 B | автотест: test v719 fixes |
| №1202 tests/test_v720_fixes.js | 1621 B | автотест: test v720 fixes |
| №1203 tests/test_v721_fixes.js | 3536 B | автотест: test v721 fixes |
| №1204 tests/test_v722_fixes.js | 3509 B | автотест: test v722 fixes |
| №1205 tests/test_v723_fixes.js | 4780 B | автотест: test v723 fixes |
| №1206 tests/test_v724_fixes.js | 2330 B | автотест: test v724 fixes |
| №1207 tests/test_v725_fixes.js | 4026 B | автотест: test v725 fixes |
| №1208 tests/test_v726_fixes.js | 3809 B | автотест: test v726 fixes |
| №1209 tests/test_v727_fixes.js | 3061 B | автотест: test v727 fixes |
| №1210 tests/test_v728_fixes.js | 2641 B | автотест: test v728 fixes |
| №1211 tests/test_v729_fixes.js | 1372 B | автотест: test v729 fixes |
| №1212 tests/test_v730_fixes.js | 2190 B | автотест: test v730 fixes |
| №1213 tests/test_v731_fixes.js | 1649 B | автотест: test v731 fixes |
| №1214 tests/test_v732_fixes.js | 2794 B | автотест: test v732 fixes |
| №1215 tests/test_v733_logic_audit.js | 2286 B | автотест: test v733 logic audit |
| №1216 tests/test_v734_network_concentration.js | 1522 B | автотест: test v734 network concentration |
| №1217 tests/test_v735_logic_rules.js | 1885 B | автотест: test v735 logic rules |
| №1218 tests/test_v736_deep_rules.js | 4307 B | автотест: test v736 deep rules |
| №1219 tests/test_v737_spellcasting_transaction.js | 5283 B | автотест: test v737 spellcasting transaction |
| №1220 tests/test_v738_multiclass_spell_sources.js | 5402 B | автотест: test v738 multiclass spell sources |
| №1221 tests/test_v739_prepared_transaction.js | 4317 B | автотест: test v739 prepared transaction |
| №1222 tests/test_v740_concentration_lifecycle.js | 2114 B | автотест: test v740 concentration lifecycle |
| №1223 tests/test_v741_damage_pipeline.js | 2462 B | автотест: test v741 damage pipeline |
| №1224 tests/test_v742_character_combatant_sync.js | 3540 B | автотест: test v742 character combatant sync |
| №1225 tests/test_v743_authority_recharge_events.js | 2228 B | автотест: test v743 authority recharge events |
| №1226 tests/test_v744_sync_authority_save.js | 2516 B | автотест: test v744 sync authority save |
| №1227 tests/test_v745_host_handoff.js | 2112 B | автотест: test v745 host handoff |
| №1228 tests/test_v746_authoritative_save_recharge.js | 3032 B | автотест: test v746 authoritative save recharge |
| №1229 tests/test_v747_event_race_compaction.js | 3064 B | автотест: test v747 event race compaction |
| №1230 tests/test_v748_full_combat_transaction.js | 5181 B | автотест: test v748 full combat transaction |
| №1231 tests/test_v749_monster_authority_reaction_order.js | 2661 B | автотест: test v749 monster authority reaction order |
| №1232 tests/test_v750_resignal_reaction_monster_rpc.js | 1973 B | автотест: test v750 resignal reaction monster rpc |
| №1233 tests/test_v751_authoritative_replay_rollback.js | 1185 B | автотест: test v751 authoritative replay rollback |
| №1234 tests/test_v752_replay_hash_authority.js | 2033 B | автотест: test v752 replay hash authority |
| №1235 tests/test_v753_replay_transaction_rng.js | 1195 B | автотест: test v753 replay transaction rng |
| №1236 tests/test_v754_update_manager.js | 2816 B | автотест: test v754 update manager |
| №1237 tests/test_v755_creation_buckets.js | 3973 B | автотест: test v755 creation buckets |
| №1238 tests/test_v755_update_scene.js | 3625 B | автотест: test v755 update scene |
| №1239 tests/update_ota_flow_test.js | 9661 B | автотест: update ota flow test |
| №1240 tools/ai_automation.cjs | 2383 B | скрипт разработчика: ai automation |
| №1241 tools/ai_checks.cjs | 1118 B | скрипт разработчика: ai checks |
| №1242 tools/ai_finalize.cjs | 2199 B | скрипт разработчика: ai finalize |
| №1243 tools/audit_adult_body_assets.py | 5868 B | скрипт разработчика: audit adult body assets |
| №1244 tools/build_character_editor_morphs.js | 4493 B | скрипт разработчика: build character editor morphs |
| №1245 tools/build_cloud_tests.sh | 1945 B | скрипт разработчика: build cloud tests |
| №1246 tools/build_makehuman_morphs.js | 8803 B | скрипт разработчика: build makehuman morphs |
| №1247 tools/build_skin_microtexture.py | 1254 B | скрипт разработчика: build skin microtexture |
| №1248 tools/build_update_manifest.py | 3881 B | скрипт разработчика: build update manifest |
| №1249 tools/check_adult_anatomy_browser.js | 7862 B | скрипт разработчика: check adult anatomy browser |
| №1250 tools/check_adult_base_browser.js | 4732 B | скрипт разработчика: check adult base browser |
| №1251 tools/check_animal_heads_browser.js | 6045 B | скрипт разработчика: check animal heads browser |
| №1252 tools/check_avian_elephant_heads_browser.js | 6052 B | скрипт разработчика: check avian elephant heads browser |
| №1253 tools/check_avian_races_browser.js | 6195 B | скрипт разработчика: check avian races browser |
| №1254 tools/check_character_clothing_closeups.js | 3941 B | скрипт разработчика: check character clothing closeups |
| №1255 tools/check_character_clothing_customizer.js | 8611 B | скрипт разработчика: check character clothing customizer |
| №1256 tools/check_character_dress_customizer.js | 4892 B | скрипт разработчика: check character dress customizer |
| №1257 tools/check_character_editor_browser.js | 24473 B | скрипт разработчика: check character editor browser |
| №1258 tools/check_character_head_browser.js | 7169 B | скрипт разработчика: check character head browser |
| №1259 tools/check_character_races_browser.js | 14773 B | скрипт разработчика: check character races browser |
| №1260 tools/check_cloud_account_browser.cjs | 7054 B | скрипт разработчика: check cloud account browser |
| №1261 tools/check_dense_swarm_browser.js | 6299 B | скрипт разработчика: check dense swarm browser |
| №1262 tools/check_elf_details_browser.js | 5791 B | скрипт разработчика: check elf details browser |
| №1263 tools/check_external_anatomy_browser.js | 9967 B | скрипт разработчика: check external anatomy browser |
| №1264 tools/check_feather_surface_browser.js | 8888 B | скрипт разработчика: check feather surface browser |
| №1265 tools/check_fur_browser.js | 6062 B | скрипт разработчика: check fur browser |
| №1266 tools/check_fur_surface_browser.js | 8973 B | скрипт разработчика: check fur surface browser |
| №1267 tools/check_ghost_browser.js | 8977 B | скрипт разработчика: check ghost browser |
| №1268 tools/check_hair_pack_browser.js | 5826 B | скрипт разработчика: check hair pack browser |
| №1269 tools/check_kobold_tabaxi_browser.js | 6240 B | скрипт разработчика: check kobold tabaxi browser |
| №1270 tools/check_last_races_browser.js | 7457 B | скрипт разработчика: check last races browser |
| №1271 tools/check_male_anatomy_browser.js | 6082 B | скрипт разработчика: check male anatomy browser |
| №1272 tools/check_map_browser.js | 3805 B | скрипт разработчика: check map browser |
| №1273 tools/check_mechanical_races_browser.js | 6158 B | скрипт разработчика: check mechanical races browser |
| №1274 tools/check_modular_races_browser.js | 5826 B | скрипт разработчика: check modular races browser |
| №1275 tools/check_native_limbs_browser.js | 7153 B | скрипт разработчика: check native limbs browser |
| №1276 tools/check_parasites_browser.js | 6584 B | скрипт разработчика: check parasites browser |
| №1277 tools/check_pose_browser.js | 7090 B | скрипт разработчика: check pose browser |
| №1278 tools/check_quartet_races_browser.js | 6706 B | скрипт разработчика: check quartet races browser |
| №1279 tools/check_reptile_heads_browser.js | 5336 B | скрипт разработчика: check reptile heads browser |
| №1280 tools/check_reptile_races_browser.js | 5781 B | скрипт разработчика: check reptile races browser |
| №1281 tools/check_reptile_surface_browser.js | 7114 B | скрипт разработчика: check reptile surface browser |
| №1282 tools/check_skin_material_browser.js | 11016 B | скрипт разработчика: check skin material browser |
| №1283 tools/check_small_armor_browser.js | 3698 B | скрипт разработчика: check small armor browser |
| №1284 tools/check_swarm_browser.js | 7847 B | скрипт разработчика: check swarm browser |
| №1285 tools/check_tiefling_browser.js | 7273 B | скрипт разработчика: check tiefling browser |
| №1286 tools/check_tiefling_details_browser.js | 6694 B | скрипт разработчика: check tiefling details browser |
| №1287 tools/cloud_test.init.gradle | 781 B | скрипт разработчика: cloud test.init |
| №1288 tools/convert_remaining_furniture.py | 4297 B | скрипт разработчика: convert remaining furniture |
| №1289 tools/finalize_v741.py | 3280 B | скрипт разработчика: finalize v741 |
| №1290 tools/generate_project_atlas.cjs | 12690 B | автоматический генератор этого атласа |
| №1291 tools/install_native_build_tools.sh | 2975 B | скрипт разработчика: install native build tools |
| №1292 tools/makehuman_gender_channels.json | 4749 B | скрипт разработчика: makehuman gender channels |
| №1293 tools/makehuman_morph_channels.json | 448 B | скрипт разработчика: makehuman morph channels |
| №1294 tools/prepare_makehuman_gender.js | 5599 B | скрипт разработчика: prepare makehuman gender |
| №1295 tools/run_tests_v731.js | 5062 B | скрипт разработчика: run tests v731 |
| №1296 tools/sync_manifest.py | 2034 B | скрипт разработчика: sync manifest |
| №1297 tools/test_cloud_sql.sh | 1088 B | скрипт разработчика: test cloud sql |
| №1298 tools/unified_version.py | 3403 B | скрипт разработчика: unified version |
| №1299 updates/beta.json | 211 B | метаданные обновлений: beta |
| №1300 updates/previous-stable.json | 179808 B | метаданные обновлений: previous stable |
| №1301 updates/README.md | 233 B | документация или отчёт: README |
| №1302 updates/stable.json | 179809 B | метаданные обновлений: stable |
| №1303 vignette_v2_sprite.png | 1213593 B | текстура/изображение: vignette v2 sprite |
| №1304 VTT_PROJECT_MANIFEST_V70.json | 44370 B | устаревший список V70, не актуален |
| №1305 wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1306 wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1307 wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1308 wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1309 wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1310 wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1311 wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1312 wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1313 wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1314 wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1315 wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1316 wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1317 wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1318 wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1319 wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1320 wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1321 wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1322 wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1323 wallpapers/1.png | 1460744 B | ассет графики/3D/интерфейса: 1 |
| №1324 wallpapers/10.png | 1667723 B | ассет графики/3D/интерфейса: 10 |
| №1325 wallpapers/11.png | 1815959 B | ассет графики/3D/интерфейса: 11 |
| №1326 wallpapers/12.png | 1548677 B | ассет графики/3D/интерфейса: 12 |
| №1327 wallpapers/13.png | 1599093 B | ассет графики/3D/интерфейса: 13 |
| №1328 wallpapers/14.png | 1596513 B | ассет графики/3D/интерфейса: 14 |
| №1329 wallpapers/15.png | 233043 B | ассет графики/3D/интерфейса: 15 |
| №1330 wallpapers/16.png | 212684 B | ассет графики/3D/интерфейса: 16 |
| №1331 wallpapers/17.png | 1585122 B | ассет графики/3D/интерфейса: 17 |
| №1332 wallpapers/18.png | 2095852 B | ассет графики/3D/интерфейса: 18 |
| №1333 wallpapers/19.png | 8605503 B | ассет графики/3D/интерфейса: 19 |
| №1334 wallpapers/2.png | 1590206 B | ассет графики/3D/интерфейса: 2 |
| №1335 wallpapers/20.png | 1284815 B | ассет графики/3D/интерфейса: 20 |
| №1336 wallpapers/21.png | 179307 B | ассет графики/3D/интерфейса: 21 |
| №1337 wallpapers/22.png | 344279 B | ассет графики/3D/интерфейса: 22 |
| №1338 wallpapers/23.png | 210291 B | ассет графики/3D/интерфейса: 23 |
| №1339 wallpapers/24.png | 141215 B | ассет графики/3D/интерфейса: 24 |
| №1340 wallpapers/25.png | 160892 B | ассет графики/3D/интерфейса: 25 |
| №1341 wallpapers/26.png | 187259 B | ассет графики/3D/интерфейса: 26 |
| №1342 wallpapers/27.png | 213194 B | ассет графики/3D/интерфейса: 27 |
| №1343 wallpapers/28.png | 202417 B | ассет графики/3D/интерфейса: 28 |
| №1344 wallpapers/29.png | 166942 B | ассет графики/3D/интерфейса: 29 |
| №1345 wallpapers/3.png | 1662340 B | ассет графики/3D/интерфейса: 3 |
| №1346 wallpapers/30.png | 237556 B | ассет графики/3D/интерфейса: 30 |
| №1347 wallpapers/31.svg | 1181 B | ассет графики/3D/интерфейса: 31 |
| №1348 wallpapers/32.svg | 1417 B | ассет графики/3D/интерфейса: 32 |
| №1349 wallpapers/4.png | 1816114 B | ассет графики/3D/интерфейса: 4 |
| №1350 wallpapers/5.png | 1742466 B | ассет графики/3D/интерфейса: 5 |
| №1351 wallpapers/6.png | 1591016 B | ассет графики/3D/интерфейса: 6 |
| №1352 wallpapers/7.png | 1815665 B | ассет графики/3D/интерфейса: 7 |
| №1353 wallpapers/8.png | 1492730 B | ассет графики/3D/интерфейса: 8 |
| №1354 wallpapers/9.png | 1715179 B | ассет графики/3D/интерфейса: 9 |

## Реестр имён, переменных и ключей

Имена сгруппированы по роли. Ссылка №NNNN указывает на путь в таблице файлов выше; остальные вхождения ищите в исходниках.
Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.


### JS объявления/параметры (4906)

| Имя | Исходные файлы |
|---|---|
| _ | №0047 (+ 10 других файлов) |
| __ls | №1183 (+ 4 других файлов) |
| __shifterProgression | №0822 |
| __TEST_SRC__ | №1183 (+ 4 других файлов) |
| _event | №0876 |
| _wc | №0875 |
| a | №0048 (+ 142 других файлов) |
| A | №0047 (+ 5 других файлов) |
| a0 | №1106 (+ 1 других файлов) |
| a1 | №1106 (+ 1 других файлов) |
| a2 | №1106 (+ 1 других файлов) |
| aa | №0050 (+ 1 других файлов) |
| ab | №0047 (+ 10 других файлов) |
| abilities | №0773 |
| ability | №0066 (+ 6 других файлов) |
| ABILITY | №0787 |
| abilityMod | №0768 |
| abName | №0643 |
| AbortController | №1089 |
| above | №0050 (+ 2 других файлов) |
| absent | №0657 |
| absorbed | №0644 (+ 1 других файлов) |
| ac | №0050 (+ 25 других файлов) |
| ACADEMIES | №0861 |
| academy | №0765 (+ 1 других файлов) |
| academyEffects | №0768 |
| acBase | №0780 |
| acBaseInp | №0780 |
| acc | №0825 (+ 4 других файлов) |
| acCalcBaseSel | №0780 |
| ACCEPT | №0791 |
| access | №0659 (+ 1 других файлов) |
| accessors | №1105 (+ 4 других файлов) |
| accessory | №0052 |
| accIndex | №1097 |
| account | №0640 |
| ACCURSED_CURSE_FEATURES | №0768 |
| ACCURSED_CURSES | №0768 |
| ACCURSED_METAMORPHOSES | №0768 |
| acidAttack | №1058 |
| acInput | №0072 (+ 1 других файлов) |
| acInputEl | №0782 |
| across | №0050 |
| action | №0066 (+ 20 других файлов) |
| actionBtn | №0781 |
| actionHandler | №0799 |
| actionId | №0814 |
| actionIndex | №0827 |
| actionName | №0800 |
| actionResultsByPeer | №0799 |
| actions | №0067 (+ 6 других файлов) |
| ACTIONS | №0772 |
| actionSpent | №0644 |
| actionStr | №0779 |
| actionTokenId | №0614 |
| active | №0050 (+ 15 других файлов) |
| ACTIVE | №0771 |
| activeBonuses | №0782 |
| activeBtns | №0761 |
| activeCat | №0780 |
| activeCategory | №0782 (+ 1 других файлов) |
| activeClass | №0801 |
| activeColsWallet | №0779 |
| activeEffects | №0067 |
| activeFolder | №0801 |
| activeHero | №0821 (+ 1 других файлов) |
| activeId | №0807 |
| activeLvl | №0821 |
| activeNow | №0762 |
| activeStats | №0782 |
| activeTab | №0052 |
| activeWp | №0857 |
| actor | №0644 (+ 10 других файлов) |
| actorId | №0772 (+ 1 других файлов) |
| actors | №0630 |
| acts | №0622 (+ 7 других файлов) |
| actual | №0772 (+ 5 других файлов) |
| actualMode | №0644 |
| acVal | №0782 |
| ad | №0050 |
| add | №0778 (+ 3 других файлов) |
| addBtn | №0780 |
| added | №0702 (+ 2 других файлов) |
| addedLangs | №0635 |
| addedWeight | №0781 (+ 1 других файлов) |
| addExhaustion | №0814 |
| addGroup | №0662 |
| addToContainer | №0778 |
| addVal | №0769 |
| adj | №0794 |
| adjacent | №0047 |
| adjusted | №0794 |
| adr | №0822 (+ 1 других файлов) |
| adv | №0644 (+ 2 других файлов) |
| advice | №0808 |
| aether | №0630 |
| af | №0050 |
| affected | №0067 |
| affinity | №0637 (+ 1 других файлов) |
| after | №0644 (+ 8 других файлов) |
| afterBounds | №1081 |
| ag | №0768 (+ 1 других файлов) |
| again | №1122 |
| age | №0613 (+ 2 других файлов) |
| ageEl | №0613 (+ 1 других файлов) |
| ageInput | №0613 (+ 1 других файлов) |
| agents | №0621 |
| ah | №0050 (+ 1 других файлов) |
| ai | №0050 (+ 11 других файлов) |
| ailment | №0768 |
| aim | №0059 |
| aimed | №1112 |
| ain | №0050 (+ 1 других файлов) |
| al | №0050 |
| alchemistCombatant | №1057 |
| alchemistDebuffs | №0644 |
| alchemistFormula | №0644 |
| alchemistLevel | №0644 |
| alchemistState | №0644 |
| alchemistVariants | №0067 |
| alias | №0689 (+ 2 других файлов) |
| ALIAS | №0759 |
| aliases | №0067 (+ 7 других файлов) |
| ALIASES | №0661 (+ 1 других файлов) |
| align | №1246 |
| all | №0052 (+ 5 других файлов) |
| ALL_RECIPES | №0661 |
| allBgs | №0613 |
| allCharacters | №0072 |
| allCreatureNames | №0795 |
| allCurses | №0768 |
| allElements | №0779 |
| allFeats | №0734 |
| allItems | №0782 |
| allow | №0809 |
| allowed | №0050 (+ 10 других файлов) |
| allowed2 | №0802 |
| allowMastery | №0768 |
| allPanels | №0811 (+ 1 других файлов) |
| allRaces | №0613 (+ 2 других файлов) |
| allRollsDetails | №0825 |
| allSources | №0734 |
| allSpells | №0825 |
| ally | №0067 (+ 5 других файлов) |
| allyState | №0067 |
| allyWilling | №0808 |
| allyX | №0808 |
| allyY | №0808 |
| alone | №1064 |
| already | №0768 (+ 1 других файлов) |
| alreadyHad | №0734 |
| alreadyHas | №0811 |
| alreadyHasSelectedClass | №0689 |
| alreadyHasSubclass | №0689 |
| alternates | №0070 |
| always | №0798 |
| am | №0062 (+ 3 других файлов) |
| am2 | №1209 |
| amap | №0768 |
| AMBIENCE_STATE_KEY | №0071 |
| ambienceShouldPlay | №0071 |
| ambienceStateLoaded | №0071 |
| AMBIENT_TRACKS | №0071 |
| amorist | №1058 |
| amount | №0050 (+ 23 других файлов) |
| amp | №0768 |
| amphibian | №1058 |
| amphibianMods | №1058 |
| amplified | №1214 |
| anatomy | №1060 |
| anchor | №0047 (+ 1 других файлов) |
| anchors | №0050 (+ 1 других файлов) |
| angle | №0047 (+ 6 других файлов) |
| angularIndex | №0047 |
| animal | №0050 |
| animalCfg | №0050 |
| animalParts | №0050 |
| animalSelect | №0052 |
| ankle | №0050 (+ 1 других файлов) |
| answered | №0800 |
| answers | №1119 |
| ao | №0800 |
| ap | №0637 (+ 7 других файлов) |
| api | №0048 (+ 41 других файлов) |
| API | №0068 (+ 12 других файлов) |
| app | №0875 (+ 3 других файлов) |
| APP_FONTS | №0821 |
| APP_FRAME_COLORS | №0821 |
| APP_FRAME_STYLES | №0821 |
| APP_THEMES | №0821 |
| APP_VERSION | №0831 (+ 1 других файлов) |
| appearance | №0049 (+ 2 других файлов) |
| appearanceSource | №1089 |
| applicable | №0810 |
| applied | №0807 (+ 5 других файлов) |
| appliedBonusText | №0734 |
| applySkin | №0052 |
| approved | №1055 |
| approvedRules | №0810 |
| ar | №0637 (+ 4 других файлов) |
| arc | №0050 |
| arch | №0050 |
| archetypeFeatureIds | №0768 |
| area | №0050 (+ 2 других файлов) |
| arena | №1138 |
| arg | №0760 |
| args | №0760 (+ 5 других файлов) |
| arm | №0050 |
| armLine | №0050 |
| armor | №0655 (+ 4 других файлов) |
| armorCategories | №0780 |
| armored | №0818 |
| armorFields | №0780 |
| armorName | №0644 |
| armorObj | №0644 |
| armorOn | №0050 |
| arr | №0058 (+ 12 других файлов) |
| Array | №0652 (+ 23 других файлов) |
| ArrayBuffer | №1098 |
| arrays | №0661 |
| arrow | №0637 (+ 3 других файлов) |
| ARTIFICER_CLASSES | №0637 |
| ARTIFICER_KEY | №0816 |
| artisan | №1117 |
| artisanBack | №1117 |
| ASI | №0805 (+ 1 других файлов) |
| ASI_LEVELS | №0828 |
| asiContainer | №0689 |
| asiHtml | №0689 |
| asiLevels | №0767 |
| asiPrompt | №0689 |
| asMoney | №0807 |
| aspect | №0052 (+ 1 других файлов) |
| aspects | №0833 |
| ASPECTS | №0833 |
| assert | №1055 (+ 178 других файлов) |
| assertSource | №1094 |
| asset | №0048 (+ 30 других файлов) |
| assetId | №1101 |
| assets | №0065 |
| assetSet | №0060 |
| assigned | №0768 |
| at | №0048 (+ 16 других файлов) |
| atk | №0643 (+ 5 других файлов) |
| atkBonus | №0622 (+ 9 других файлов) |
| atkElem | №0643 (+ 1 других файлов) |
| atlas | №0051 |
| atob | №1061 (+ 21 других файлов) |
| aTok | №0644 |
| attachment | №0051 |
| attack | №0798 (+ 7 других файлов) |
| attacker | №0630 (+ 9 других файлов) |
| attackerBack | №0800 |
| attackerDebuffs | №0644 |
| attackerId | №0644 |
| attackerIdForStudy | №0644 |
| attackerSelect | №1119 |
| attackerState | №0644 |
| attackModifiers | №0798 |
| attackPayload | №0800 |
| attackRolls | №1149 |
| attacks | №0644 (+ 3 других файлов) |
| attempts | №0642 (+ 1 других файлов) |
| attributes | №1147 |
| aura | №0800 (+ 1 других файлов) |
| auraActive | №0637 |
| auraBack | №1117 |
| auraCha | №0637 |
| auraPC | №1117 |
| auraPhone | №1117 |
| auraRoster | №1117 |
| auraServer | №1117 |
| auraSource | №0637 |
| auth | №1088 |
| authoritativeAoe | №0800 |
| auto | №0800 |
| autoCloseTimer | №0786 |
| autoFail | №0644 |
| autoInterval | №0857 |
| automatic | №0630 |
| autoPlay | №0071 |
| autoResults | №0800 |
| autoRotateState | №0857 |
| autoRotateTimer | №0857 |
| autos | №0800 |
| av | №0050 (+ 2 других файлов) |
| avail | №0637 |
| available | №0768 (+ 4 других файлов) |
| availableCharges | №0067 |
| availableWallpapers | №0857 |
| avg | №0689 |
| avianHybrid | №1060 |
| aw | №0050 (+ 1 других файлов) |
| ax | №0050 (+ 2 других файлов) |
| axes | №0050 |
| AXES | №0055 |
| axis | №0050 (+ 10 других файлов) |
| ay | №0051 |
| az | №0050 (+ 1 других файлов) |
| b | №0048 (+ 127 других файлов) |
| B | №0047 (+ 16 других файлов) |
| b1 | №0050 (+ 1 других файлов) |
| back | №0048 (+ 4 других файлов) |
| backAnchor | №0050 |
| backBurden | №1117 |
| backCount | №0050 |
| backDepth | №0051 |
| backdrop | №0052 |
| backgroundName | №0613 (+ 1 других файлов) |
| backgrounds | №1237 |
| backgroundsList | №0613 (+ 1 других файлов) |
| backQueen | №1117 |
| backTop | №0051 |
| backup | №0642 (+ 2 других файлов) |
| backupData | №0821 |
| backups | №0640 |
| bad | №0630 (+ 5 других файлов) |
| badgeTag | №0761 |
| badR | №1214 |
| bag | №1078 |
| bagAnchor | №0047 |
| bagCenter | №0047 |
| bagRings | №0047 |
| balanceAfterBarter | №1153 |
| balanceAfterBuy | №1153 |
| BAM | №0619 |
| band | №0051 |
| bandHi | №0051 |
| bandLo | №0051 |
| bandSection | №0051 |
| bar | №0832 |
| barb | №1210 (+ 1 других файлов) |
| barbarian | №1203 |
| barFill | №0781 |
| barter | №1153 |
| barWrapper | №0781 |
| base | №0050 (+ 67 других файлов) |
| BASE | №0653 (+ 1 других файлов) |
| BASE_HOSTS | №0878 |
| baseAc | №0613 (+ 1 других файлов) |
| baseAC | №0782 |
| baseACInput | №0782 |
| baseActions | №0802 |
| baseConfig | №1294 |
| baseCount | №0661 |
| baseFeatures | №0802 |
| baseGain | №0689 |
| baseH | №0051 (+ 1 других файлов) |
| baseIds | №0861 |
| baseJinx | №0768 |
| baseline | №0052 (+ 2 других файлов) |
| baseMax | №0644 |
| baseMod | №0761 |
| baseMode | №0816 |
| baseNameEng | №0734 |
| baseNameRu | №0734 |
| baseOpenTrade | №0790 |
| baseRate | №0654 |
| baseRender | №0645 |
| BASES | №0663 |
| baseStock | №0791 |
| baseValue | №0656 |
| baseW | №0061 |
| baseX | №0050 |
| baseY | №0050 |
| bat | №0050 (+ 1 других файлов) |
| batch | №0800 |
| batchFail | №1230 |
| batchTarget | №1230 |
| battleGame | №1117 |
| bb | №0050 (+ 4 других файлов) |
| bbu | №0768 |
| bbuDamage | №1138 |
| bbuHero | №1138 |
| bbuLevel9 | №1138 |
| bbuResource | №0644 |
| bbuResult | №0644 |
| bbuTemp | №0768 |
| bc | №0047 (+ 2 других файлов) |
| bCha | №0813 |
| bCon | №0813 |
| bd | №1111 |
| bDex | №0813 |
| beak | №0050 |
| beakKind | №0050 |
| beakL | №0050 |
| beakScale | №0050 |
| beakSelect | №0052 |
| beakStyle | №1081 |
| beakW | №0050 |
| bearer | №0642 |
| bearing | №0807 |
| beast | №0822 |
| beetle | №0050 |
| before | №0642 (+ 63 других файлов) |
| beforeBounds | №1081 |
| beforeBurn | №1057 |
| beforeCup | №1119 |
| beforeCurse | №1214 |
| beforeMoxie | №1138 |
| beforeNormal | №1220 |
| beforePact | №1220 |
| beforeRepeat | №1117 |
| beforeReset | №1059 |
| beforeUnsupported | №1119 |
| beh | №1168 |
| belly | №0050 |
| belt | №0652 |
| bend | №0050 |
| berry | №0807 (+ 1 других файлов) |
| berryOwner | №0808 |
| berryRef | №1117 |
| best | №0050 (+ 11 других файлов) |
| bestD | №1105 |
| bestDist | №0800 |
| bestiary | №0795 |
| bestTrans | №1111 |
| bestTri | №1106 |
| bet | №1116 (+ 1 других файлов) |
| bev | №0800 |
| bf | №0058 (+ 2 других файлов) |
| bg | №0661 (+ 1 других файлов) |
| BG_COLOR_PALETTE | №0857 |
| BG3_POINT_BUY | №0613 (+ 1 других файлов) |
| bgBody | №0857 |
| bgInput | №0072 |
| bgs | №0634 (+ 1 других файлов) |
| bgSelect | №0613 (+ 1 других файлов) |
| bgStyle | №0761 |
| bgVal | №0613 (+ 1 других файлов) |
| bh | №0816 (+ 3 других файлов) |
| bhDamage | №0644 |
| bhPact | №0816 |
| bi | №0800 |
| bIdx | №0613 |
| bin | №0050 (+ 16 других файлов) |
| binary | №1244 |
| binBytes | №1100 |
| binPad | №1097 |
| bins | №0051 |
| bInt | №0813 |
| bird | №0050 |
| bite | №1131 |
| bits | №0047 (+ 1 других файлов) |
| bl | №0675 |
| blackPowder | №1058 |
| blackPowderAttack | №1058 |
| blade | №0050 |
| bladeSpan | №0050 |
| bleed | №0644 |
| blend | №0047 (+ 1 других файлов) |
| blended | №0047 |
| blind | №0807 (+ 2 других файлов) |
| blob | №0821 (+ 7 других файлов) |
| blobs | №1290 |
| block | №0811 (+ 6 других файлов) |
| blocked | №0642 (+ 4 других файлов) |
| bloodAbility | №0067 |
| bloodAgent | №1058 |
| bloodCurseReaction | №0644 |
| bloodHunterPack | №0768 |
| bloodlines | №0822 |
| bloodMax | №0637 |
| bloodMutagenist | №1058 |
| bloodRiteRevival | №0644 |
| bloodShort | №0067 |
| bloodSnapshots | №0067 |
| bm | №0800 (+ 2 других файлов) |
| board | №0800 (+ 2 других файлов) |
| boardBox | №0615 |
| boardCtx | №1191 |
| body | №0047 (+ 22 других файлов) |
| bodyArmor | №0782 |
| bodyBefore | №1059 |
| bodyExtras | №1067 |
| bodyStats | №0773 |
| bomb | №0067 (+ 2 других файлов) |
| bomber | №1058 |
| bomberGuard | №1058 |
| bomberResistanceTarget | №1057 |
| bomberResisted | №1057 |
| bond | №0645 |
| bondBox | №0808 |
| bondConsent | №1119 |
| bondLabel | №0808 |
| bonds | №0675 |
| bondTarget | №1119 |
| bondText | №0808 |
| bondWilling | №0808 |
| bone | №0057 (+ 1 других файлов) |
| bonesChecked | №1286 |
| boneStyle | №0050 |
| boneVertexMap | №0050 |
| bonus | №0063 (+ 24 других файлов) |
| bonusAction | №0800 |
| bonuses | №0780 |
| bonusesText | №0613 (+ 1 других файлов) |
| bonusMultiplier | №0761 |
| bonusText | №0734 |
| Boolean | №0652 (+ 1 других файлов) |
| booted | №0875 |
| borderLeftColor | №0761 |
| bottom | №0047 (+ 4 других файлов) |
| bought | №1153 |
| boundary | №0047 (+ 1 других файлов) |
| boundaryEdges | №0047 |
| boundaryWelds | №0047 |
| bounds | №1068 (+ 1 других файлов) |
| box | №0052 (+ 27 других файлов) |
| boxer | №1138 |
| boxesHtml | №0825 |
| boxIndex | №0825 |
| bp | №0661 (+ 7 других файлов) |
| bParts | №0613 (+ 1 других файлов) |
| br | №1203 |
| brandedHp | №1141 |
| braPanels | №1081 |
| breath | №1058 |
| breathOne | №1058 |
| breathResults | №0067 |
| breathRoll | №0067 |
| breathTargets | №0067 |
| breathTwo | №1058 |
| breathType | №0067 |
| bridge | №1103 (+ 4 других файлов) |
| broken | №0050 (+ 3 других файлов) |
| brokenInputs | №1084 |
| browColor | №0052 |
| browser | №1249 (+ 38 других файлов) |
| BrowserWindow | №0875 |
| bStr | №0813 |
| bt | №0050 (+ 2 других файлов) |
| btn | №0781 (+ 4 других файлов) |
| btnCat | №0782 |
| btnContainer | №0780 |
| btnMode | №0761 |
| btoa | №1061 (+ 2 других файлов) |
| bucket | №0050 (+ 2 других файлов) |
| buckets | №0050 |
| bucketStep | №0050 |
| budget | №0807 (+ 1 других файлов) |
| budgets | №0048 |
| buf | №0058 (+ 2 других файлов) |
| buffers | №0050 (+ 3 других файлов) |
| bufs | №0058 |
| build | №0051 (+ 1 других файлов) |
| built | №1061 (+ 3 других файлов) |
| bulge | №0050 |
| bundled | №1093 (+ 1 других файлов) |
| burden | №1117 |
| burdenAliases | №0792 |
| burdens | №0792 |
| burn | №0768 (+ 1 других файлов) |
| burningOwner | №1057 |
| burningTarget | №1057 |
| bus | №0842 (+ 1 других файлов) |
| busy | №0640 |
| button | №0052 (+ 5 других файлов) |
| buttons | №0052 (+ 2 других файлов) |
| buttonsHtml | №0734 |
| buyFactor | №0789 |
| bv | №0050 (+ 2 других файлов) |
| bvh | №1105 |
| bvIndex | №1097 |
| bWis | №0813 |
| bx | №0051 (+ 1 других файлов) |
| by | №0051 |
| BY_ID | №0810 |
| byFamily | №0617 (+ 12 других файлов) |
| byLevel | №0798 |
| byName | №0653 (+ 1 других файлов) |
| BYPASS_PARCHMENT_ONCE | №0634 |
| bySource | №0617 (+ 2 других файлов) |
| byteOffset | №0058 |
| bytes | №0053 (+ 3 других файлов) |
| bytesWritten | №0878 |
| bz | №0062 |
| c | №0048 (+ 221 других файлов) |
| C | №0070 (+ 13 других файлов) |
| c0 | №0650 |
| c2 | №1234 |
| ca | №0047 (+ 1 других файлов) |
| cache | №0058 |
| CACHE_BUSTER | №0831 |
| cached | №0051 (+ 1 других файлов) |
| calcAtk | №0636 |
| calcDmgBonus | №0636 |
| calcInput | №0769 |
| calcType | №0780 |
| calcWidget | №0779 |
| calf | №0048 |
| call | №0860 |
| callback | №0875 (+ 19 других файлов) |
| callbacks | №1126 |
| called | №1146 |
| calls | №1098 (+ 3 других файлов) |
| cam | №0059 (+ 1 других файлов) |
| campaign | №1170 |
| campaigns | №0631 |
| CAN | №0798 |
| canClose | №0832 |
| candidate | №0878 |
| candidates | №0050 (+ 7 других файлов) |
| canonical | №0759 |
| cantrip | №0067 |
| cantrips | №0749 (+ 1 других файлов) |
| CANTRIPS | №0833 |
| cantripsList | №0825 |
| canvas | №0059 (+ 3 других файлов) |
| cap | №0047 (+ 6 других файлов) |
| capacity | №1129 |
| caps | №1072 |
| capStart | №0047 |
| caption | №0808 |
| card | №0781 (+ 10 других файлов) |
| cardApi | №0808 |
| cardId | №0810 |
| cards | №0644 (+ 5 других файлов) |
| CARDS | №0810 |
| cases | №0652 (+ 3 других файлов) |
| cast | №1125 (+ 1 других файлов) |
| caster | №0800 (+ 3 других файлов) |
| casterLevel | №0816 |
| cat | №0056 (+ 22 других файлов) |
| catalog | №0052 (+ 5 других файлов) |
| CATALOG | №0617 (+ 15 других файлов) |
| catalogContainer | №0811 |
| catalogHtml | №0811 |
| catalogKey | №0808 |
| catalogState | №0649 |
| catalogue | №1257 |
| catalyst | №0070 |
| catalystId | №0068 (+ 1 других файлов) |
| CATALYSTS | №0068 |
| catContainer | №0780 |
| category | №0059 (+ 17 других файлов) |
| CATEGORY | №0649 |
| catLower | №0780 |
| catOk | №0791 |
| cats | №0653 |
| catStr | №0812 |
| catTitle | №0780 |
| cb | №1109 (+ 2 других файлов) |
| cbt | №1118 |
| cc | №0050 (+ 1 других файлов) |
| cd | №0768 |
| ce | №1226 (+ 1 других файлов) |
| ceiling | №0807 |
| cel | №0062 |
| celestial | №1144 |
| cell | №0050 (+ 7 других файлов) |
| CELL_FT | №0615 |
| cellFt | №0645 |
| cells | №0054 (+ 1 других файлов) |
| cellU | №0050 |
| cellV | №0050 |
| center | №0050 (+ 5 других файлов) |
| centre | №0050 |
| centres | №0050 |
| cf | №0768 (+ 1 других файлов) |
| cfg | №0050 (+ 2 других файлов) |
| cg | №0851 |
| ch | №0057 (+ 3 других файлов) |
| cha | №0617 (+ 11 других файлов) |
| chain | №0050 (+ 1 других файлов) |
| chance | №0069 (+ 2 других файлов) |
| change | №1038 |
| changed | №0867 (+ 3 других файлов) |
| CHANGELOG | №0804 |
| changes | №0816 (+ 1 других файлов) |
| channel | №0052 |
| CHANNEL_KEY | №0831 |
| channels | №0055 (+ 6 других файлов) |
| char | №0820 (+ 5 других файлов) |
| character | №0048 (+ 5 других файлов) |
| CHARACTER_CREATION_MODE | №0634 |
| CHARACTER_SAVE_SCHEMA_VERSION | №0072 |
| characters | №0820 |
| characterShape | №0637 (+ 1 других файлов) |
| charClassInputs | №0689 |
| charge | №0768 |
| chargeCount | №0067 |
| chargeDirection | №0808 |
| charges | №1141 (+ 2 других файлов) |
| charId | №0820 |
| charIndex | №0820 |
| charInfo | №0821 |
| chariot | №1117 |
| charLevel | №0820 |
| charm | №1117 |
| charmed | №0067 |
| charmedHero | №1117 |
| charmTarget | №1117 |
| charName | №0820 |
| chars | №0821 (+ 1 других файлов) |
| charTotalCopper | №0779 |
| check | №0637 (+ 11 других файлов) |
| checkbox | №0781 (+ 2 других файлов) |
| checked | №0847 (+ 11 других файлов) |
| checkedAttr | №0613 (+ 1 других файлов) |
| cheek | №0050 |
| chest | №1112 |
| chestUnderwear | №0050 |
| child | №0778 (+ 1 других файлов) |
| childId | №0778 |
| children | №0778 |
| chin | №0050 |
| chk | №0645 (+ 1 других файлов) |
| choice | №0642 (+ 4 других файлов) |
| choiceBlocks | №0689 |
| choices | №0052 (+ 5 других файлов) |
| chosen | №0630 (+ 4 других файлов) |
| chosenD20 | №0636 |
| chosenFeat | №0689 (+ 1 других файлов) |
| chosenMod | №0761 |
| chosenPatron | №0768 |
| chosenResistance | №0067 |
| chosenTrad | №0802 |
| chromium | №1249 (+ 37 других файлов) |
| chunk | №0058 (+ 6 других файлов) |
| chunks | №1244 (+ 1 других файлов) |
| ci | №0050 (+ 1 других файлов) |
| cid | №0067 |
| cId | №0821 |
| cl | №0050 (+ 3 других файлов) |
| claim | №0063 |
| clamp | №0069 |
| class | №0689 |
| CLASS | №0067 (+ 4 других файлов) |
| CLASS_DEFS | №0764 |
| CLASS_I18N | №0784 |
| CLASS_KEYS | №0816 |
| CLASS_NAMES | №0637 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0702 |
| CLASS_TOKEN_ART | №0634 |
| classBonus | №0644 |
| classContext | №0644 |
| classData | №0689 (+ 1 других файлов) |
| classDescriptions | №0652 |
| classEntry | №0689 |
| classes | №0775 (+ 5 других файлов) |
| CLASSIC_BACKGROUND_NAMES | №0634 |
| CLASSIC_CLASS_NAMES | №0634 |
| CLASSIC_RACE_IDS | №0634 |
| classicBgs | №1237 |
| classicClasses | №1237 |
| classLevel | №0689 |
| classMatch | №0825 |
| classMeta | №0775 |
| className | №0613 (+ 7 других файлов) |
| classNameBase | №0635 |
| classNameOnly | №0613 (+ 1 других файлов) |
| classReduction | №0644 |
| classSelect | №0613 (+ 1 других файлов) |
| classStr | №0825 |
| clawLen | №0050 |
| clean | №0622 (+ 10 других файлов) |
| cleanName | №0635 |
| cleanStr | №0761 (+ 1 других файлов) |
| cleanTool | №0635 |
| clear | №0051 (+ 1 других файлов) |
| clearContainer | №0778 |
| clearInterval | №1183 (+ 5 других файлов) |
| clearTimeout | №1183 (+ 28 других файлов) |
| cleft | №0047 (+ 1 других файлов) |
| cleric | №1210 |
| click | №1112 |
| CLIENT_KEY | №0799 |
| clipped | №0050 |
| clone | №1056 (+ 4 других файлов) |
| close | №0804 (+ 1 других файлов) |
| closeBtn | №0689 |
| closedHero | №1119 |
| closedPixels | №1255 |
| cloth | №0052 (+ 3 других файлов) |
| clothBuckets | №0050 |
| clothed | №1086 (+ 1 других файлов) |
| clothes | №1060 (+ 2 других файлов) |
| clothFaces | №0050 |
| clothing | №0048 (+ 2 других файлов) |
| cloud | №1089 |
| cloudStatus | №0821 |
| cls | №0775 (+ 7 других файлов) |
| club | №0765 (+ 1 других файлов) |
| clubFeatures | №0768 |
| clubIds | №1146 |
| cm | №0768 (+ 1 других файлов) |
| cmd | №1056 |
| cmn | №1105 |
| cmx | №1105 |
| cn | №0784 (+ 1 других файлов) |
| cName | №0825 |
| co | №0062 |
| code | №0640 (+ 5 других файлов) |
| coinRef | №1118 |
| coins | №0779 |
| col | №0054 (+ 1 других файлов) |
| cold | №0052 |
| colEP | №0779 |
| collar | №0047 (+ 2 других файлов) |
| collarCount | №0047 |
| collisions | №1111 |
| colno | №0760 |
| color | №0050 (+ 4 других файлов) |
| coloredDrink | №1058 |
| coloredPotionMaker | №1058 |
| colorHex | №0857 |
| colorKey | №0821 |
| colors | №0052 (+ 1 других файлов) |
| colorType | №0067 |
| colour | №1083 |
| colourDetail | №1059 |
| colourIdat | №1083 |
| colourRaw | №1083 |
| colPP | №0779 |
| cols | №0050 (+ 1 других файлов) |
| combat | №0655 (+ 2 других файлов) |
| combatant | №0067 (+ 1 других файлов) |
| combatants | №0067 |
| command | №0819 |
| commit | №0630 |
| committed | №1090 |
| commonSaved | №1255 |
| companion | №1119 (+ 1 других файлов) |
| companionId | №1146 |
| compare | №1094 |
| comparing | №0052 |
| compat | №0831 (+ 2 других файлов) |
| compatFs | №1295 |
| compatRequire | №1295 |
| completed | №0786 |
| completedBytes | №0878 |
| component | №1105 |
| componentBytes | №1109 |
| compositions | №1246 |
| comps | №1106 |
| con | №0617 (+ 15 других файлов) |
| conc | №0816 |
| concentration | №0644 |
| cond | №0636 (+ 2 других файлов) |
| condition | №0644 (+ 3 других файлов) |
| CONDITION_ALIASES | №0816 |
| conditionHero | №1138 |
| conditionMods | №0644 |
| conditionNotes | №0761 |
| conditions | №0644 (+ 4 других файлов) |
| CONDITIONS | №0644 (+ 3 других файлов) |
| CONDITIONS_CONFIG | №0072 |
| conds | №0644 |
| conduit | №0687 |
| config | №0063 (+ 5 других файлов) |
| CONFIG | №0642 |
| confirmed | №0067 |
| conflict | №0642 |
| CONFLICT | №0068 |
| conflicts | №0068 (+ 2 других файлов) |
| conflictSet | №0068 |
| conMod | №0613 (+ 4 других файлов) |
| conModFinal | №0613 (+ 1 других файлов) |
| conScore | №0644 |
| consent | №1119 |
| console | №0652 (+ 29 других файлов) |
| constant | №0800 (+ 1 других файлов) |
| consumed | №0661 |
| consumedJinx | №0644 |
| consumer | №1126 |
| container | №0613 (+ 15 других файлов) |
| containerId | №0811 (+ 3 других файлов) |
| containers | №0772 (+ 3 других файлов) |
| content | №0782 (+ 1 других файлов) |
| contentBox | №0689 |
| contentDiv | №0761 |
| contentsWeight | №0778 |
| context | №0644 (+ 12 других файлов) |
| contextBridge | №0876 |
| contexts | №1059 (+ 1 других файлов) |
| contract | №0768 |
| control | №0052 (+ 1 других файлов) |
| controller | №0642 (+ 2 других файлов) |
| controls | №0052 (+ 1 других файлов) |
| conVal | №0689 |
| converted | №0070 (+ 1 других файлов) |
| cooldown | №1055 |
| cooledAttack | №1058 |
| cooling | №1058 |
| COPPER | №0788 |
| copperPerElectrum | №0779 |
| copperPerGold | №0779 |
| copperPerPlat | №0779 |
| copperPerSilver | №0779 |
| copy | №0049 (+ 8 других файлов) |
| core | №0050 (+ 8 других файлов) |
| CORE | №0637 |
| CORE_CLASSES | №0649 |
| coreOwned | №0637 |
| corePositions | №0050 |
| corner | №1083 |
| corners | №0050 (+ 2 других файлов) |
| corona | №0047 |
| corpse | №0798 (+ 2 других файлов) |
| corrupt | №1071 |
| cost | №0637 (+ 14 других файлов) |
| costDie | №0768 |
| costInp | №0780 |
| count | №0050 (+ 43 других файлов) |
| counter | №0782 (+ 6 других файлов) |
| counterDamage | №0768 (+ 1 других файлов) |
| counterHero | №1138 |
| counterLeft | №0644 |
| counterReduction | №0644 (+ 1 других файлов) |
| counterState | №0644 |
| countInput | №0782 |
| counts | №0047 (+ 3 других файлов) |
| countToRead | №0058 |
| coverBonus | №0644 (+ 1 других файлов) |
| covered | №0051 (+ 1 других файлов) |
| coveredCount | №1285 |
| cp | №0050 (+ 15 других файлов) |
| cPerS | №0779 |
| cpInput | №0779 |
| cpVal | №0779 |
| cr | №0617 (+ 15 других файлов) |
| CR | №0798 |
| CR_BY_MONSTER | №0797 |
| CR_RANK | №0797 |
| craft | №0617 (+ 21 других файлов) |
| craftBase | №0616 |
| craftBonus | №0654 (+ 1 других файлов) |
| crafted | №0653 |
| CRAFTING_BACKGROUND_PROFILES | №0661 |
| CRAFTING_CLASS_PROFILES | №0661 |
| CRAFTING_FEAT_PROFILES | №0661 |
| CRAFTING_RACE_PROFILES | №0661 |
| craftingProfile | №0661 |
| craftModifier | №0661 |
| craftNotes | №0661 |
| createContainer | №0778 |
| created | №0807 |
| creationScreen | №0613 (+ 1 других файлов) |
| creatures | №0675 |
| CREATURES | №0763 |
| crest | №0050 |
| crit | №1138 |
| critical | №0644 (+ 3 других файлов) |
| criticalRange | №0644 |
| critNote | №0761 (+ 1 других файлов) |
| critTarget | №1138 |
| cross | №0051 (+ 1 других файлов) |
| crowd | №0644 (+ 1 других файлов) |
| crowdCondition | №0768 |
| crowdDC | №0768 |
| crowdHero | №1138 |
| crowdResults | №0768 |
| crowdSave | №0644 |
| crowdTarget | №1138 |
| crowdTargets | №0768 |
| crown | №0050 |
| crownDiagnostics | №1259 |
| crownOff | №1259 |
| crypto | №0878 (+ 50 других файлов) |
| cs | №0050 (+ 11 других файлов) |
| csel | №0795 |
| ct | №0050 |
| ctx | №0061 (+ 136 других файлов) |
| ctx2d | №0052 |
| cuff | №0051 |
| cum | №0050 |
| cup | №0051 (+ 1 других файлов) |
| cupChoice | №0808 |
| cupNumber | №1131 |
| cupPC | №1117 |
| cupPhone | №1117 |
| cupProfiles | №1117 |
| cupResult | №0808 |
| cupRoster | №1117 |
| cups | №0051 |
| cupsBack | №1117 |
| cupServer | №1117 |
| cupsPending | №0808 |
| cur | №0069 (+ 4 других файлов) |
| curHp | №0768 |
| curl | №0050 |
| current | №0047 (+ 13 других файлов) |
| currentActiveId | №0820 |
| currentChar | №0072 |
| currentCharacterId | №0072 |
| currentClass | №0689 |
| currentColor | №0857 |
| currentCurrHp | №0813 |
| currentDim | №0857 |
| currentExp | №0769 |
| currentHero | №0821 (+ 1 других файлов) |
| currentHound | №0768 |
| currentHp | №0067 (+ 1 других файлов) |
| currentHP | №0858 |
| currentInventoryCategory | №0782 |
| currentLevelExpReq | №0769 |
| currentLevelInClass | №0702 |
| currentLvl | №0769 (+ 1 других файлов) |
| currentMax | №0689 |
| currentModalColor | №0857 |
| currentModalOpacity | №0857 |
| currentOpacity | №0857 |
| currentPact | №0787 |
| currentProfsIds | №0811 |
| currentProgress | №0832 |
| currentRollMode | №0761 |
| currentRound | №0644 |
| currentSpent | №0613 (+ 1 других файлов) |
| currentStep | №0071 |
| currentTime | №0786 |
| currentTrack | №0071 |
| currentTrackIndex | №0071 |
| currentVal | №0613 (+ 3 других файлов) |
| currentVersion | №0821 (+ 1 других файлов) |
| currentVolume | №0071 |
| currentWallpaperIndex | №0857 |
| currId | №0821 |
| curse | №0768 |
| curseActor | №0644 |
| curseEffect | №0768 |
| curseId | №0768 |
| curseKnown | №0677 |
| curseMax | №0768 |
| curseNames | №0630 |
| curses | №0066 (+ 1 других файлов) |
| curseSaveMods | №0644 |
| curSides | №0636 |
| curStat | №0636 |
| curve | №0050 |
| custom | №0051 (+ 1 других файлов) |
| customBtn | №0782 (+ 1 других файлов) |
| customElem | №0785 |
| customGather | №0814 |
| customRaces | №0813 |
| customSkinCharacter | №1060 |
| customTestSource | №0831 |
| cut | №0050 (+ 1 других файлов) |
| cutFaces | №0047 |
| cv | №0050 (+ 2 других файлов) |
| cw | №1083 |
| cwd | №1056 |
| cx | №0050 (+ 7 других файлов) |
| cy | №0047 (+ 7 других файлов) |
| cycles | №0654 |
| cz | №0050 (+ 5 других файлов) |
| d | №0048 (+ 84 других файлов) |
| D | №0047 (+ 23 других файлов) |
| d00 | №1105 (+ 2 других файлов) |
| d01 | №1105 (+ 2 других файлов) |
| d1 | №1105 (+ 3 других файлов) |
| d11 | №1105 (+ 2 других файлов) |
| d2 | №1105 (+ 3 других файлов) |
| d20 | №0644 (+ 4 других файлов) |
| d20_1 | №0636 |
| d20_2 | №0636 |
| d20Button | №0637 |
| d20Details | №0636 |
| d20Result | №0761 (+ 1 других файлов) |
| d21 | №1105 (+ 2 других файлов) |
| d3 | №1105 (+ 3 других файлов) |
| d4 | №1105 (+ 3 других файлов) |
| d5 | №1105 (+ 3 других файлов) |
| d6 | №1105 (+ 3 других файлов) |
| da | №1083 |
| damage | №0063 (+ 21 других файлов) |
| DAMAGE_TYPES | №0644 |
| damageBeforeWard | №0644 |
| damageButton | №0637 |
| damaged | №0653 |
| damageOpts | №0644 |
| damageParts | №0644 |
| damageResult | №0800 |
| damageStr | №0780 |
| damageString | №0761 (+ 1 других файлов) |
| damageTaken | №0644 |
| dark | №0050 (+ 2 других файлов) |
| data | №0052 (+ 39 других файлов) |
| dataDir | №1246 (+ 1 других файлов) |
| dataStr | №0821 |
| DataView | №1061 (+ 21 других файлов) |
| Date | №0652 (+ 66 других файлов) |
| dateStr | №0821 |
| day | №0788 |
| db | №0702 (+ 3 других файлов) |
| dbg | №1182 (+ 1 других файлов) |
| dbItem | №0781 (+ 1 других файлов) |
| dbNameLower | №0635 |
| dc | №0063 (+ 26 других файлов) |
| dcElem | №0643 (+ 1 других файлов) |
| dcValue | №0805 |
| dd | №0062 (+ 1 других файлов) |
| deadAlly | №1058 |
| dealUses | №0768 |
| deathSaveFailures | №0644 |
| deb | №0067 |
| debuffs | №0644 (+ 1 других файлов) |
| debug | №1038 |
| debugBtn | №0760 |
| debugContainer | №0821 (+ 1 других файлов) |
| debugToggle | №0821 |
| debugWrapper | №0821 |
| deception | №0067 |
| deck | №0808 (+ 5 других файлов) |
| DECLARATIVE_FEATURES | №0637 |
| declared | №1119 |
| decodeURIComponent | №1196 (+ 1 других файлов) |
| deduction | №0630 |
| def | №0055 (+ 6 других файлов) |
| DEFAULT | №0060 |
| DEFAULT_CAPACITY | №0778 |
| DEFAULT_CHANNEL | №0831 |
| DEFAULT_COLS | №0615 |
| DEFAULT_ENABLED | №0655 |
| DEFAULT_ICON | №0821 (+ 2 других файлов) |
| DEFAULT_MANIFEST_URL | №0831 |
| DEFAULT_RACES | №0813 |
| DEFAULT_ROWS | №0615 |
| defaultIcon | №0877 |
| defaultMode | №0780 |
| defaultModel | №0795 |
| defaults | №0055 (+ 2 других файлов) |
| defaultType | №0780 |
| defaultValue | №0780 |
| defender | №1138 (+ 1 других файлов) |
| defenderClasses | №0644 |
| defenses | №0780 (+ 1 других файлов) |
| defensesContainer | №0780 |
| defer | №0800 |
| deflect | №0644 |
| deflected | №1057 |
| defs | №0055 (+ 4 других файлов) |
| DEFS | №0807 |
| delay | №0642 (+ 1 других файлов) |
| delayedBomb | №1058 |
| delBtn | №0782 (+ 1 других файлов) |
| deleteBtn | №0801 |
| deleted | №0642 |
| delta | №0047 (+ 18 других файлов) |
| demolitionOwner | №1058 |
| demolitionResult | №1058 |
| demolitionTarget | №0067 (+ 1 других файлов) |
| den | №0050 (+ 7 других файлов) |
| denied | №1133 |
| denLabel | №0052 |
| denOpacity | №0051 |
| dense | №1266 |
| denValues | №0051 |
| depth | №0050 (+ 4 других файлов) |
| derivedAssets | №0060 |
| desc | №0659 (+ 7 других файлов) |
| descBox | №0613 (+ 2 других файлов) |
| descElem | №0785 |
| descInp | №0780 |
| descInput | №0813 |
| description | №0637 (+ 2 других файлов) |
| descriptor | №1061 (+ 1 других файлов) |
| descText | №0613 (+ 1 других файлов) |
| descVal | №0813 |
| desired | №0047 (+ 2 других файлов) |
| DesktopWebUpdater | №0875 (+ 2 других файлов) |
| dest | №0064 (+ 4 других файлов) |
| destination | №0807 (+ 1 других файлов) |
| destinations | №0807 |
| detail | №0839 (+ 3 других файлов) |
| details | №0052 (+ 4 других файлов) |
| detailsElem | №0785 |
| detailsHtml | №0782 |
| detailText | №0761 (+ 1 других файлов) |
| developmentGate | №1055 |
| device | №1117 |
| devModal | №0821 |
| dex | №0617 (+ 14 других файлов) |
| dexHero | №1138 (+ 1 других файлов) |
| dexInput | №0813 |
| dexMod | №0613 (+ 6 других файлов) |
| dexSave | №1138 |
| dexScore | №0644 (+ 1 других файлов) |
| dexStats | №0644 |
| df | №0768 |
| di | №0644 (+ 1 других файлов) |
| diag | №1071 (+ 9 других файлов) |
| diagnostics | №1246 |
| diagonal | №0809 (+ 1 других файлов) |
| diagonals | №0809 |
| dialectAliases | №0817 |
| DIALECTS | №0817 |
| dice | №0768 (+ 9 других файлов) |
| DICE_ICONS | №0821 (+ 2 других файлов) |
| diceCount | №0761 (+ 3 других файлов) |
| diceCountInp | №0780 |
| diceDir | №0877 |
| diceFiles | №0877 |
| diceMatch | №0761 |
| diceMax | №1084 |
| diceMin | №1084 |
| diceOptions | №0636 |
| diceRegex | №0825 |
| dices | №0780 |
| diceSides | №0761 (+ 1 других файлов) |
| diceSpent | №0067 |
| diceTab | №0761 |
| diceTypes | №0636 |
| die | №0070 (+ 7 других файлов) |
| DIE | №0630 (+ 1 других файлов) |
| dieSides | №0800 |
| diff | №0689 (+ 1 других файлов) |
| dig | №1139 |
| digDeep | №0644 |
| digDeepTypes | №0644 |
| digit | №0050 |
| digits | №0050 |
| dimLayer | №0857 |
| dir | №0050 (+ 10 других файлов) |
| dire | №0768 |
| direct | №0054 |
| directCompatible | №1109 |
| direction | №0807 (+ 2 других файлов) |
| directions | №0807 |
| direMax | №0768 |
| DIRS | №0809 |
| dirty | №0768 (+ 1 других файлов) |
| dirtyApplied | №0768 |
| dirtyDC | №0768 |
| dirtyHero | №1138 |
| dirtyResource | №0768 |
| dirtySave | №0768 |
| dirtyTarget | №1138 |
| dis | №0644 (+ 2 других файлов) |
| disable | №0781 |
| disabled | №0808 |
| disBtn | №0782 |
| disc | №0050 (+ 2 других файлов) |
| discharge | №1057 |
| dischargeTarget | №1057 |
| disciplineAliases | №0818 |
| disciplineByPower | №0768 |
| disciplines | №0818 |
| discover | №0068 |
| discoveries | №0067 |
| discovery | №0067 |
| discoveryLevel | №0067 |
| discoveryName | №0067 |
| discoveryRecipes | №0067 |
| disguise | №1137 |
| displacement | №1102 |
| display | №0689 (+ 1 других файлов) |
| displayedAC | №0816 |
| displayName | №0613 (+ 3 других файлов) |
| displaySpeed | №0772 |
| displayStyle | №0825 |
| dist | №0050 (+ 5 других файлов) |
| distal | №0050 |
| distance | №0050 (+ 4 других файлов) |
| distanceFt | №0807 (+ 1 других файлов) |
| distanceRolled | №0807 |
| distances | №1105 (+ 2 других файлов) |
| div | №0689 |
| dl | №0050 (+ 1 других файлов) |
| dm | №0800 (+ 1 других файлов) |
| dmg | №0067 (+ 7 других файлов) |
| dmgBonus | №0636 |
| dn | №0050 |
| DND_CLASSES_LIST | №0613 (+ 1 других файлов) |
| DND_DAMAGE_TYPES | №0780 |
| DND_SKILLS_LIST | №0780 |
| DND_WEAPON_CATEGORIES | №0780 |
| DND_WEAPON_PROPERTIES | №0780 |
| dndBackgrounds | №0613 |
| dndModal | №0689 |
| doc | №1182 (+ 2 других файлов) |
| document | №1059 |
| dom | №1112 |
| dome | №0050 |
| domReady | №1204 (+ 1 других файлов) |
| done | №0831 (+ 3 других файлов) |
| donor | №0802 |
| dot | №0047 |
| down | №0064 |
| download | №1260 |
| downloadAnchor | №0821 |
| downloads | №1093 |
| dr | №0768 (+ 2 других файлов) |
| draft | №0807 (+ 2 других файлов) |
| DRAFT | №0049 |
| drag | №0852 |
| dragon | №1208 |
| dragonGraft | №0067 |
| draw | №0772 (+ 4 других файлов) |
| drawer | №0782 |
| drawerContainer | №0761 |
| drawerContent | №0761 |
| drawWindow | №0762 |
| dreadAttack | №1138 |
| dreadHandHero | №1138 |
| dreadHero | №1138 |
| dreadTarget | №1138 |
| dress | №1069 |
| drop | №0050 |
| dry | №1092 |
| ds | №0644 (+ 1 других файлов) |
| dst | №0058 (+ 1 других файлов) |
| dt | №0050 (+ 2 других файлов) |
| du | №0047 |
| duplicates | №1290 |
| duplicityMiss | №0644 |
| duplicityTarget | №0644 |
| dupRoll | №0644 |
| durability | №0788 (+ 1 других файлов) |
| duration | №0858 |
| durationMs | №0071 |
| durationSeconds | №0858 |
| dv | №0047 (+ 3 других файлов) |
| dwarf | №0055 |
| dwarfDesc | №0652 |
| dx | №0047 (+ 13 других файлов) |
| dy | №0047 (+ 12 других файлов) |
| dynamicContainer | №0782 |
| dynamoAttack | №1058 |
| dz | №0047 (+ 5 других файлов) |
| dzdt | №0047 |
| e | №0047 (+ 150 других файлов) |
| E | №0798 |
| e0 | №0052 (+ 1 других файлов) |
| each | №0637 |
| ear | №0050 |
| earOuter | №0050 |
| ears | №0050 (+ 1 других файлов) |
| earVertices | №1072 |
| eb | №0050 (+ 1 других файлов) |
| ec | №0768 |
| eco | №1168 |
| econ | №0654 (+ 1 других файлов) |
| ECON | №0653 |
| edge | №0050 |
| edges | №0050 |
| editor | №0876 (+ 1 других файлов) |
| editorWeaponPresets | №0052 |
| ef | №0067 (+ 1 других файлов) |
| eff | №0768 |
| effect | №0067 (+ 3 других файлов) |
| effectApplies | №0644 |
| effectiveD20 | №0644 |
| effectiveDiceCount | №0761 |
| effectiveMode | №0761 |
| effectMap | №0067 |
| effects | №0663 (+ 2 других файлов) |
| EFFECTS | №0069 |
| effectSerial | №0630 |
| eid | №0798 (+ 1 других файлов) |
| eInput | №0779 |
| el | №0059 (+ 28 других файлов) |
| elapsed | №0867 |
| elBar | №0769 |
| elCurExp | №0769 |
| elCurLvl | №0769 |
| elDesc | №0813 |
| electromagneticShield | №0644 |
| elem | №1208 |
| element | №0768 |
| elementId | №0782 |
| elements | №1059 (+ 3 других файлов) |
| elementsToHide | №0857 |
| elId | №0781 |
| eligible | №0810 |
| elInputCur | №0769 |
| ellipse | №0047 |
| elName | №0813 |
| elNextExp | №0769 |
| elSpeed | №0813 |
| email | №0640 (+ 1 других файлов) |
| embedded | №0810 |
| emojis | №0761 |
| empty | №0050 |
| emptyMsg | №0780 |
| enabled | №0048 (+ 3 других файлов) |
| encoded | №0807 |
| encodeURIComponent | №1196 (+ 1 других файлов) |
| encounter | №0794 |
| end | №0050 (+ 4 других файлов) |
| ended | №0807 |
| ends | №0063 |
| endY | №0051 |
| enemies | №0807 |
| enemy | №0861 (+ 4 других файлов) |
| enemyHP | №1148 |
| energyDamage | №0067 |
| energyResult | №0067 |
| energySeamTarget | №1057 |
| engine | №1195 |
| englishName | №0767 |
| engName | №0689 (+ 1 других файлов) |
| enhancedAttack | №1138 |
| enhancedTarget | №1138 |
| entity | №0067 (+ 2 других файлов) |
| entries | №0642 (+ 8 других файлов) |
| entry | №0052 (+ 18 других файлов) |
| entryId | №0785 |
| env | №1113 (+ 1 других файлов) |
| envelope | №0047 |
| ep | №0768 (+ 2 других файлов) |
| epInput | №0779 |
| epoch | №0642 |
| eprof | №0800 |
| eps | №0047 (+ 2 других файлов) |
| epsilon | №0051 |
| epVal | №0779 |
| equipCheckbox | №0782 |
| equipLabel | №0782 |
| equipment | №0055 |
| equippedWeapon | №0761 |
| er | №0050 (+ 1 других файлов) |
| err | №0052 (+ 4 других файлов) |
| error | №0052 (+ 1 других файлов) |
| errorCount | №0760 |
| errors | №0650 (+ 40 других файлов) |
| es | №0069 |
| esc | №0059 (+ 1 других файлов) |
| escape | №1196 (+ 2 других файлов) |
| ev | №0772 (+ 6 других файлов) |
| evasion | №0644 |
| event | №0063 (+ 15 других файлов) |
| EVENT_LIMIT | №0799 |
| eventAttacker | №0644 |
| eventBox | №0808 |
| eventChainHeadHash | №0799 |
| eventLabel | №0808 |
| eventLogBaseHash | №0799 |
| eventLogBaseSeq | №0799 |
| eventPC | №1117 |
| eventPhone | №1117 |
| eventRoster | №1117 |
| events | №0799 (+ 6 других файлов) |
| eventServer | №1117 |
| eventText | №0808 |
| evo | №1208 |
| evt | №1059 |
| ex | №0050 (+ 1 других файлов) |
| exact | №0650 (+ 2 других файлов) |
| excess | №0768 |
| executionScene | №0807 |
| exhaustion | №0814 |
| exhaustionNow | №0644 |
| exhaustionRestKey | №0636 (+ 1 других файлов) |
| exhaustionText | №0814 |
| existing | №0063 (+ 9 других файлов) |
| existingClass | №0775 |
| existingClassEntry | №0689 |
| existingOverlay | №0761 |
| exists | №0635 (+ 1 других файлов) |
| existsL | №0635 |
| exp | №0769 |
| expand | №0051 |
| expanded | №0052 |
| expBasedLevel | №0769 |
| expected | №0067 (+ 4 других файлов) |
| expectedRevision | №0810 |
| expert | №1132 |
| expiration | №1147 |
| expired | №1138 |
| expires | №0822 |
| explicit | №1060 |
| exploitContract | №0768 |
| exploits | №0861 |
| explored | №0063 |
| exposureActor | №0644 |
| expr | №0637 (+ 7 других файлов) |
| expression | №0768 |
| ext | №0062 (+ 4 других файлов) |
| external | №0048 (+ 1 других файлов) |
| externalCalls | №1098 |
| externalJson | №1098 |
| externalPanels | №0761 |
| extra | №0050 (+ 31 других файлов) |
| EXTRA | №0632 |
| EXTRA_RULES | №0068 |
| EXTRA_TRIGGER | №0069 |
| EXTRA_TYPES | №0634 |
| extraACBonus | №0782 |
| extraAtk | №0800 |
| extraClass | №0689 |
| extraClasses | №1237 |
| extraDamages | №0780 |
| extraData | №0782 (+ 1 других файлов) |
| extraDmg | №0800 |
| extraDmgContainer | №0780 |
| extraLine | №0734 |
| extraLocked | №0689 |
| extraName | №0689 (+ 1 других файлов) |
| extrapolated | №1246 |
| extras | №0052 (+ 3 других файлов) |
| extraType | №0689 |
| exts | №0877 |
| ey | №0050 |
| eye | №0050 (+ 1 других файлов) |
| eyeBtn | №0857 |
| eyeIsland | №0050 |
| eyePart | №0050 |
| eyes | №0050 (+ 2 других файлов) |
| eyeSave | №1259 |
| eyesDiag | №1259 |
| eyesOff | №1259 |
| eyeWeight | №0050 |
| eyeX | №0050 |
| eyeY | №0050 |
| eyeZ | №0050 |
| ez | №0050 |
| f | №0048 (+ 115 других файлов) |
| F | №1207 (+ 4 других файлов) |
| fa | №0768 |
| face | №0047 (+ 2 других файлов) |
| faceParts | №0052 |
| faces | №0047 (+ 3 других файлов) |
| facing | №0050 |
| FACTIONS | №0621 |
| factor | №0047 (+ 4 других файлов) |
| factory | №0816 |
| fadeInterval | №0071 |
| fadeTimer | №0786 |
| fail | №1154 (+ 1 других файлов) |
| failed | №1056 (+ 2 других файлов) |
| failedSave | №0822 |
| fall | №1203 |
| fallback | №0050 (+ 7 других файлов) |
| FALLBACK_MANIFEST_URL | №0831 |
| fallbackName | №0702 |
| fallbackText | №0761 |
| false | №0768 (+ 6 других файлов) |
| fam | №0618 (+ 10 других файлов) |
| familiarForms | №0768 |
| FAMILIES | №0617 |
| family | №0617 (+ 1 других файлов) |
| FAMILY_BY_CREATURE | №0763 |
| FAMILY_DEFS | №0763 |
| FAMILY_NAMES | №0618 (+ 11 других файлов) |
| familyId | №0763 |
| familyOpts | №0763 |
| fangs | №0050 |
| fangsOff | №1259 |
| fans | №1081 |
| fantasy | №1257 |
| fantasySaved | №1257 |
| fApplied | №0768 |
| faq | №0804 |
| FAQ | №0804 |
| far | №0062 (+ 1 других файлов) |
| fat | №0050 |
| fatalHit | №1138 |
| fateMax | №0637 |
| fc | №0062 |
| fd | №0067 |
| fdc | №0768 |
| fdmg | №0768 |
| fearSave | №0768 |
| feat | №0637 (+ 2 других файлов) |
| FEAT_STAT_LABELS | №0734 |
| FEAT_VALID_STATS | №0734 |
| featActionHtml | №0734 |
| featDesc | №0734 |
| featherHead | №0052 |
| featherKind | №0052 |
| featherPart | №0052 |
| featName | №0734 |
| featObj | №0689 (+ 1 других файлов) |
| feats | №0614 (+ 2 других файлов) |
| featsOptions | №0689 |
| feature | №0067 (+ 3 других файлов) |
| FEATURE_DEFS | №0637 |
| FEATURE_TARGET_RULES | №0800 |
| featureDescStr | №0613 (+ 1 других файлов) |
| featureHtml | №0613 (+ 2 других файлов) |
| featureIds | №0650 (+ 1 других файлов) |
| featureIndex | №0650 |
| featureLevel | №0650 |
| featureList | №0702 |
| featureLists | №0637 |
| featureMeta | №0637 |
| featureMod | №0644 |
| featureMode | №0644 |
| features | №0067 (+ 9 других файлов) |
| featuresHtml | №0689 |
| featuresList | №0689 |
| featureStr | №0613 (+ 1 других файлов) |
| fecund | №0768 |
| feet | №0050 (+ 3 других файлов) |
| female | №0051 (+ 5 других файлов) |
| femalePositions | №1061 |
| fer | №0645 |
| ferocity | №1146 |
| fetched | №0831 |
| ff | №0062 (+ 1 других файлов) |
| fgm | №1210 |
| fi | №0050 (+ 3 других файлов) |
| fid | №0637 (+ 4 других файлов) |
| field | №0050 (+ 9 других файлов) |
| fieldLengths | №1107 |
| fields | №1126 (+ 3 других файлов) |
| fiend | №1144 |
| fight | №0807 |
| fighter | №1207 (+ 1 других файлов) |
| fighters | №0808 |
| fightingPack | №0644 |
| fightingResource | №0644 |
| fightingResult | №0644 |
| fightingStyleEffects | №0768 |
| file | №0821 (+ 55 других файлов) |
| fileNo | №1290 |
| filePath | №0857 |
| files | №0658 (+ 9 других файлов) |
| fileUrl | №0878 |
| filter | №0070 (+ 3 других файлов) |
| filteredItems | №0825 |
| filters | №0634 (+ 1 других файлов) |
| filterText | №0734 |
| final | №0768 (+ 1 других файлов) |
| finalAC | №0782 |
| finalAttackTotal | №0761 |
| finalCount | №0661 |
| finalData | №0780 |
| finalName | №0780 |
| finalPropsString | №0780 |
| finalSkillModifier | №0761 |
| finalStats | №0613 (+ 1 других файлов) |
| finalTotal | №0761 (+ 1 других файлов) |
| fingerless | №0050 |
| fins | №0050 |
| finsOff | №1259 |
| fire | №0832 |
| fireFront | №0832 |
| fireRoll | №0067 |
| first | №0047 (+ 9 других файлов) |
| firstFace | №1109 |
| firstVertex | №1109 |
| fit | №0052 (+ 5 других файлов) |
| fitted | №0050 (+ 2 других файлов) |
| fixture | №1078 |
| flags | №0645 |
| flare | №0051 |
| flat | №1081 |
| fleeing | №1117 |
| fleePhone | №1117 |
| flexible | №1058 |
| flexibleInstall | №1058 |
| Float32Array | №1059 (+ 23 других файлов) |
| Float64Array | №1064 (+ 2 других файлов) |
| floor | №0050 (+ 3 других файлов) |
| FLOOR | №0061 |
| floorAttack | №1138 |
| floorHero | №1138 |
| floorHpBefore | №1138 |
| floorMod | №1139 |
| floors | №0065 |
| floorTarget | №1138 (+ 1 других файлов) |
| floorTypes | №0065 |
| flush | №1059 |
| flyer | №1138 |
| fm | №0644 (+ 1 других файлов) |
| fm2 | №1210 |
| fn | №0047 (+ 30 других файлов) |
| focus | №0047 (+ 1 других файлов) |
| focusEl | №0804 |
| focusSources | №0825 |
| foe | №1121 (+ 1 других файлов) |
| fog | №1113 |
| fogShade | №0062 |
| fold | №0050 |
| folder | №1244 |
| folderId | №0801 |
| fontKey | №0821 |
| fontObj | №0821 |
| fontSelect | №0821 |
| fontStyleTag | №0821 |
| foot | №0050 (+ 1 других файлов) |
| footH | №0050 |
| force | №0788 (+ 1 других файлов) |
| forceCrit1 | №0761 |
| forced | №0807 |
| forceSlot | №0833 |
| forearmHigh | №0050 |
| forearmLow | №0050 |
| foreign | №1147 |
| fork | №0050 |
| form | №0050 (+ 5 других файлов) |
| formattedText | №0689 |
| formula | №0630 (+ 3 других файлов) |
| formulaDamage | №0067 |
| formulae | №0067 |
| formulaEffects | №0067 |
| formulaHero | №1058 |
| formulaIds | №0768 |
| formulas | №0630 (+ 1 других файлов) |
| fortifying | №0768 |
| fortune | №0816 |
| forward | №0050 (+ 1 других файлов) |
| found | №0051 (+ 16 других файлов) |
| foundIdx | №0857 |
| foundItemData | №0781 |
| foundProf | №0811 |
| foundWeapon | №0812 (+ 1 других файлов) |
| fov | №0062 |
| fr | №0675 (+ 1 других файлов) |
| fR1 | №0761 (+ 1 других файлов) |
| fR2 | №0761 (+ 1 других файлов) |
| fragHighp | №0062 |
| frame | №0050 (+ 25 других файлов) |
| frameColorSelect | №0821 |
| frameKey | №0821 |
| frames | №1076 |
| frameStyleSelect | №0821 |
| framework | №1130 |
| free | №0050 (+ 2 других файлов) |
| freeGather | №0867 |
| fresh | №0050 (+ 3 других файлов) |
| friend | №1117 (+ 2 других файлов) |
| frill | №0050 |
| from | №0621 (+ 4 других файлов) |
| front | №0048 (+ 4 других файлов) |
| frontal | №0050 |
| frontCount | №0050 |
| frontPlate | №0050 |
| frontTop | №0051 |
| fs | №0052 (+ 224 других файлов) |
| fsave | №0768 |
| fsp | №0875 (+ 1 других файлов) |
| ft | №0768 |
| full | №1093 (+ 1 других файлов) |
| FULL | №0787 |
| FULL_CASTER_SLOTS_TABLE | №0825 |
| FULL_CASTERS | №0816 |
| FULL_SLOTS | №0816 |
| fullCoat | №0052 |
| fullData | №0734 |
| fullPath | №0875 |
| fur | №0052 (+ 1 других файлов) |
| furEnabled | №0052 |
| furryAccessory | №0052 |
| furryLimb | №0052 |
| furrySkull | №0052 |
| furSelect | №0052 |
| fuseMinutes | №0067 |
| fuseRounds | №0067 |
| future | №0052 (+ 1 других файлов) |
| fv | №0768 |
| fx | №0050 (+ 2 других файлов) |
| fy | №0050 (+ 1 других файлов) |
| g | №0048 (+ 151 других файлов) |
| G | №0070 |
| g1 | №0061 |
| gain | №0658 (+ 4 других файлов) |
| gained | №0645 (+ 1 других файлов) |
| gainedHp | №0775 |
| gameplay | №1195 |
| gameTool | №0635 |
| gap | №0051 |
| garment | №0051 |
| garments | №0050 |
| GATE_TOWNS | №0621 |
| gather | №0814 |
| GATHERING_ACTIONS | №0814 |
| gb | №1105 (+ 4 других файлов) |
| gdiag | №1106 (+ 1 других файлов) |
| ge | №0768 |
| gem | №0807 |
| gender | №0051 (+ 7 других файлов) |
| generated | №1168 |
| generatedHarvest | №1168 |
| generation | №0642 |
| GENERIC_SPECIALTIES | №0659 |
| geo | №0048 (+ 24 других файлов) |
| geometryKey | №1068 |
| geoTarget | №0800 |
| gesture | №0052 (+ 1 других файлов) |
| getData | №0702 |
| getStat | №0775 |
| getSub | №0702 |
| ghostBounds | №0052 |
| ghostForbiddenSlots | №0052 |
| ghostShellTarget | №0635 |
| ghostWeapon | №0052 |
| gi | №0644 |
| gills | №0050 |
| git | №1240 (+ 2 других файлов) |
| gl | №0050 (+ 23 других файлов) |
| glb | №1105 (+ 7 других файлов) |
| glbPath | №1097 (+ 6 других файлов) |
| glbVertices | №1109 |
| glen | №0050 |
| global | №0821 (+ 84 других файлов) |
| globalAudio | №0071 |
| glove | №0050 |
| gn | №0768 |
| gname | №0768 |
| gnome | №0055 |
| gob | №1170 |
| gold | №0052 |
| goldNeeded | №0654 |
| goldOwner | №0808 |
| goldRef | №0808 |
| golemCraft | №1058 |
| golemEntities | №1058 |
| golemEntity | №1058 |
| golemRestore | №1058 |
| good | №0630 (+ 1 других файлов) |
| got | №0068 (+ 2 других файлов) |
| gp | №0779 (+ 7 других файлов) |
| gPerE | №0779 |
| gpInput | №0779 |
| gpVal | №0779 |
| gradle | №0877 |
| graftAC | №0644 |
| graftArmorAttack | №1057 |
| graftArmorTarget | №1057 |
| graftCriticalAttack | №1057 |
| graftCriticalTarget | №1057 |
| graftDef | №0067 |
| graftInstalled | №1058 |
| graftMissingDonor | №1058 |
| graftName | №0067 |
| graftRemoved | №1058 |
| graftResistant | №0644 |
| grafts | №0067 (+ 1 других файлов) |
| grant | №0662 |
| granted | №0067 (+ 1 других файлов) |
| grantMaterial | №0657 |
| gray | №0052 |
| grid | №0821 (+ 7 других файлов) |
| grip | №0050 (+ 1 других файлов) |
| groom | №0050 |
| groove | №0047 |
| ground | №0050 (+ 1 других файлов) |
| group | №0047 (+ 8 других файлов) |
| grouped | №0637 |
| groupedFeats | №0689 |
| groupFeats | №0689 |
| groupKey | №0734 |
| groupKeys | №0811 |
| groupName | №0811 |
| groupOrder | №0734 |
| groupRolls | №0825 |
| groups | №0050 (+ 4 других файлов) |
| groupsMap | №0811 |
| groupTitle | №0780 |
| growth | №1138 |
| growthAttack | №1138 |
| growthTarget | №1138 |
| gs | №1106 |
| guard | №0772 (+ 2 других файлов) |
| guide | №1171 (+ 3 других файлов) |
| guildDesc | №0652 |
| gw | №1294 |
| h | №0048 (+ 127 других файлов) |
| H | №0048 (+ 10 других файлов) |
| h2 | №1207 |
| h3 | №1130 (+ 1 других файлов) |
| h4 | №1207 |
| hab | №0617 |
| habitat | №0052 (+ 1 других файлов) |
| habitats | №0052 |
| hadSpeedZero | №0772 |
| hair | №0048 (+ 2 других файлов) |
| hairLength | №0050 |
| hairProfiles | №0050 |
| hairs | №0050 (+ 1 других файлов) |
| half | №0050 (+ 2 других файлов) |
| HALF_CASTERS | №0816 |
| hand | №0050 (+ 1 других файлов) |
| handle | №0878 |
| handleAdd | №0780 |
| handleAddClick | №0780 |
| handleArmorCatSelect | №0780 |
| handleCatSelect | №0780 |
| handleDel | №0780 |
| handleDiceSelect | №0780 |
| handlePropToggle | №0780 |
| handler | №0831 (+ 1 других файлов) |
| handlers | №0637 (+ 1 других файлов) |
| HANDLERS | №0807 |
| handleTabClick | №0782 |
| handMax | №1071 |
| handoffCalls | №1230 |
| hands | №0050 |
| harness | №1272 |
| harvest | №1158 (+ 1 других файлов) |
| hasActiveModal | №0829 |
| hasAoe | №0800 |
| hasAutoStarted | №0071 |
| hasDex | №0768 |
| hasDice | №0825 |
| hasFirearmsAll | №0812 |
| hasGraft | №0067 |
| hash | №0831 (+ 4 других файлов) |
| hashes | №1078 (+ 6 других файлов) |
| hasMagic | №0825 |
| hasMartialAll | №0812 |
| hasProf | №0862 |
| hasProficiency | №0782 |
| hasSimpleAll | №0812 |
| hasSpecificProf | №0812 |
| hasTool | №0657 (+ 2 других файлов) |
| hasUV | №0052 |
| hat | №0050 (+ 4 других файлов) |
| have | №0654 (+ 1 других файлов) |
| hay | №0782 (+ 1 других файлов) |
| haymaker | №1138 |
| hayTarget | №1138 |
| hb | №1105 (+ 4 других файлов) |
| hCls | №0825 |
| hctx | №1230 |
| hd | №0802 (+ 1 других файлов) |
| hdiag | №1111 |
| head | №0047 (+ 5 других файлов) |
| HEAD_AXES | №0055 |
| HEAD_FORMS | №0055 |
| HEAD_STYLES | №0055 |
| header | №0816 (+ 1 других файлов) |
| headerAC | №0072 |
| headers | №0642 (+ 2 других файлов) |
| heading | №0761 |
| headMax | №1071 |
| heal | №0768 (+ 2 других файлов) |
| heal2 | №0768 |
| healAmount | №0808 |
| healBatch | №1230 |
| healCaster | №0808 |
| healDeclared | №0808 |
| healed | №0067 (+ 9 других файлов) |
| healer | №0630 |
| healEventId | №0808 |
| healing | №0860 (+ 2 других файлов) |
| healingActors | №0808 |
| healingRedirect | №0644 |
| healingResult | №0644 |
| healMap | №0067 |
| healNoUndead | №0808 |
| healOriginal | №0808 |
| healRange | №0808 |
| healRoll | №0067 |
| healSight | №0808 |
| healTarget | №1230 |
| healv | №0637 |
| heatDamage | №1058 |
| heatMode | №0067 |
| height | №0050 (+ 6 других файлов) |
| heights | №1140 |
| held | №1117 (+ 2 других файлов) |
| heldName | №1119 |
| help | №0804 |
| hem | №0051 |
| hemoragent | №1058 |
| hemoragentNoPool | №1058 |
| hermit | №1117 |
| hermitHero | №1117 |
| hero | №0775 (+ 49 других файлов) |
| heroClassNames | №0825 |
| heroes | №1084 |
| heroFeats | №0734 |
| heroFeatsRef | №0734 |
| heroIsExtra | №0689 |
| heroLevel | №0650 |
| heroLevels | №0794 |
| hex | №0051 (+ 3 других файлов) |
| hi | №0050 (+ 10 других файлов) |
| hidden | №0069 (+ 1 других файлов) |
| hiddenBuckets | №0050 |
| high | №0050 (+ 5 других файлов) |
| highlight | №0052 |
| hint | №0052 |
| hip | №0050 (+ 1 других файлов) |
| hipCenter | №0051 |
| hipMax | №0051 |
| hipMin | №0051 |
| hipRadius | №0051 |
| history | №0052 (+ 4 других файлов) |
| hit | №0644 (+ 14 других файлов) |
| HIT_COST | №0792 |
| hitDie | №0682 (+ 2 других файлов) |
| hitDieMax | №0775 |
| hiX | №0050 |
| hiY | №0050 |
| hm | №1105 (+ 7 других файлов) |
| hole | №0050 |
| holeCounts | №0047 |
| holes | №0050 |
| holeVertices | №0047 |
| hollowHp | №0644 |
| holyAttack | №1058 |
| homebrewClasses | №1237 |
| homunculusCraft | №1058 |
| homunculusEntities | №1058 |
| homunculusOwner | №0644 (+ 1 других файлов) |
| homunculusState | №0644 |
| hood | №0047 (+ 1 других файлов) |
| hoof | №1079 |
| hoofScale | №0050 |
| hoofY | №0050 |
| hook | №0050 |
| hooks | №1057 (+ 3 других файлов) |
| HORN_STYLES | №0055 |
| hornAttack | №1058 |
| hornInstall | №1058 |
| hornPart | №0050 |
| horns | №0050 (+ 1 других файлов) |
| hornSelect | №0052 |
| hornSize | №1086 |
| hornStyle | №0050 (+ 1 других файлов) |
| horror | №0618 (+ 1 других файлов) |
| horseY | №0050 |
| hosiery | №0052 |
| hosieryDen | №1070 |
| host | №0070 (+ 24 других файлов) |
| hostBox | №0799 |
| hostDestroyed | №0805 |
| hostiles | №0645 (+ 1 других файлов) |
| houndHP | №0768 |
| houndTemplate | №0768 |
| howlTargets | №0630 |
| hp | №0067 (+ 22 других файлов) |
| hpAfter | №1204 |
| hpAfterTick | №1057 |
| hpBefore | №1117 |
| hpBeforeShift | №1147 |
| hpCurrentInput | №0689 (+ 1 других файлов) |
| hpDamage | №0644 |
| hpGain | №0689 |
| hpMax | №0636 (+ 1 других файлов) |
| hpMaxInput | №0689 (+ 1 других файлов) |
| hpNow | №0768 |
| hpObj | №0067 |
| hpRes | №0689 |
| hpShape | №1138 |
| hs | №1106 |
| html | №0071 (+ 51 других файлов) |
| http | №1249 (+ 37 других файлов) |
| hud | №1180 (+ 1 других файлов) |
| hugeHands | №1058 |
| human | №1060 (+ 2 других файлов) |
| hunter | №1213 |
| hv | №1168 |
| hx | №0768 |
| hy | №0050 |
| hybrid | №0768 |
| i | №0048 (+ 176 других файлов) |
| ia | №1106 (+ 2 других файлов) |
| ib | №0057 |
| icon | №0781 (+ 3 других файлов) |
| iconEl | №0781 |
| iconId | №0821 (+ 3 других файлов) |
| iconPath | №0875 |
| ICONS | №0821 (+ 2 других файлов) |
| id | №0048 (+ 151 других файлов) |
| ID | №0824 (+ 1 других файлов) |
| idat | №1083 |
| identity | №0062 (+ 1 других файлов) |
| idName | №0734 |
| idOrName | №0661 |
| ids | №0047 (+ 31 других файлов) |
| idv | №0058 (+ 1 других файлов) |
| idx | №0052 (+ 30 других файлов) |
| ignoreTarot | №0816 |
| ignoreWeight | №0778 |
| ii | №1106 (+ 1 других файлов) |
| illIds | №1146 |
| illusion | №0807 (+ 1 других файлов) |
| im | №0058 (+ 3 других файлов) |
| Image | №1059 |
| images | №1059 |
| img | №0052 (+ 3 других файлов) |
| IMG | №0061 |
| imitation | №0067 |
| immune | №0807 (+ 3 других файлов) |
| immuneCharm | №0768 |
| immuneFire | №1057 |
| immuneUntil | №0644 |
| immunity | №0630 |
| imported | №1101 |
| improved | №0792 |
| inCombat | №0630 |
| incoming | №1094 (+ 1 других файлов) |
| incomingType | №0644 |
| incompatible | №0052 |
| indent | №0778 |
| index | №0047 (+ 26 других файлов) |
| indexed | №0782 |
| indices | №0047 (+ 4 других файлов) |
| Infinity | №0050 (+ 8 других файлов) |
| influence | №0047 |
| influences | №0047 |
| info | №0640 (+ 3 других файлов) |
| infoBox | №0813 |
| infoText | №0781 |
| ing | №0068 (+ 2 других файлов) |
| INGREDIENT_SOURCES | №0070 |
| INGREDIENTS | №0068 |
| ings | №0068 (+ 1 других файлов) |
| ini | №0800 |
| initElem | №0613 (+ 1 других файлов) |
| initial | №1059 (+ 2 других файлов) |
| initialAngle | №0051 |
| initialId | №1059 |
| initialProficiencies | №0635 |
| initialSkillsData | №0613 (+ 1 других файлов) |
| initiative | №0762 (+ 1 других файлов) |
| inline | №0058 |
| inner | №0047 (+ 1 других файлов) |
| innerDivs | №0811 |
| innerHtml | №0825 |
| innerList | №0782 |
| inp | №0780 |
| input | №0048 (+ 22 других файлов) |
| inputColEP | №0779 |
| inputColPP | №0779 |
| inputCopper | №0779 |
| inputElem | №0769 (+ 1 других файлов) |
| inputField | №0781 |
| inputGrid | №0779 |
| inputId | №0815 |
| inputs | №1084 |
| inputVal | №0769 |
| ins | №0768 |
| INS | №0817 |
| inside | №0800 |
| insight | №0067 |
| inspect | №0068 |
| inspectOnly | №0807 |
| inspired | №1117 |
| inspiredPhone | №1117 |
| installed | №0649 (+ 1 других файлов) |
| installedGrafts | №0067 |
| instantDeath | №0644 |
| int | №0617 (+ 10 других файлов) |
| Int16Array | №1061 (+ 21 других файлов) |
| Int8Array | №1061 (+ 21 других файлов) |
| internal | №0768 |
| interrupted | №0762 (+ 1 других файлов) |
| intervalVal | №0857 |
| intMod | №0613 (+ 5 других файлов) |
| inv | №0047 (+ 14 других файлов) |
| invalidDead | №1058 |
| inventory | №0812 (+ 1 других файлов) |
| INVENTORY_CATEGORIES | №0807 |
| inventoryPC | №1117 |
| inventoryPhone | №1117 |
| inventoryRoster | №1117 |
| inventorySearchState | №0782 |
| inventoryServer | №1117 |
| inverted | №1117 |
| invertedPhone | №1117 |
| invHeaderACEl | №0782 |
| invis | №1058 |
| invisibleAttacker | №1057 |
| invisUsed | №0644 |
| invokeOptions | №0768 |
| invSrc | №1190 |
| ioff | №0058 |
| ionizer | №1058 |
| ionizerClass | №0644 |
| ionizerEngineer | №1058 |
| ionizerTarget | №1057 |
| ip | №0635 |
| ipcMain | №0875 |
| ipcRenderer | №0876 |
| ir | №0058 (+ 1 других файлов) |
| ironChinAttack | №1138 |
| ironChinTarget | №1138 |
| irregular | №0050 |
| is | №1106 |
| isActionProcessed | №0780 |
| isActive | №0857 (+ 1 других файлов) |
| isAlreadyHas | №0811 |
| isAsiLevel | №0689 |
| isAttackOrCheck | №0761 |
| isAutoOn | №0857 |
| isAvailable | №0825 |
| isBlood | №0800 |
| isBomb | №0067 |
| isChecked | №0613 (+ 4 других файлов) |
| isCrit | №0825 |
| isDead | №0067 |
| isDebug | №0821 |
| isDebugEnabled | №0760 |
| isDestroyed | №0786 |
| isDrawerOpen | №0761 |
| isEnabled | №0821 (+ 1 других файлов) |
| isExpert | №0761 |
| isExtraHero | №0689 |
| isFinesse | №0761 |
| isFinger | №0050 |
| isFinite | №1155 (+ 15 других файлов) |
| isFirearm | №0812 |
| isFree | №0833 |
| isGhost | №0635 (+ 1 других файлов) |
| isGhostExtra | №0635 |
| isGhostHero | №0689 |
| isGrouped | №0780 |
| isHeavyOrExceeds | №0781 |
| isHero | №0762 |
| isHidden | №0782 |
| isInterfaceHidden | №0857 |
| isize | №0058 |
| isLandscape | №0875 |
| isLeft | №0048 |
| isMartial | №0812 |
| isMoreStep | №0804 |
| isNewClass | №0689 (+ 1 других файлов) |
| isolated | №1239 |
| isolatedFound | №1239 |
| isolatedLegacy | №1239 |
| isOverLimit | №0825 |
| isOverweight | №0781 |
| isParasite | №0635 (+ 1 других файлов) |
| isParasiteExtra | №0635 |
| isParasiteHero | №0689 |
| isPhbA | №0825 |
| isPlayingAmbience | №0071 |
| isPOT | №0062 |
| isPrepared | №0825 |
| isProf | №0613 (+ 2 других файлов) |
| isProficient | №0761 |
| isRanged | №0761 |
| isRepeatOneOn | №0071 |
| isRight | №0048 |
| isRite | №0630 |
| isRowActionProcessed | №0780 |
| isSelected | №0071 (+ 1 других файлов) |
| isShield | №0782 |
| isShuffleOn | №0071 |
| isSimple | №0812 |
| isSuccess | №0761 |
| issues | №0661 |
| isSwarm | №0635 (+ 1 других файлов) |
| isSwarmExtra | №0635 |
| isSwarmHero | №0689 |
| isWalterHero | №0689 |
| isWalterParasite | №0635 (+ 1 других файлов) |
| isWalterParasiteExtra | №0635 |
| isWalterParasiteHero | №0689 |
| it | №0654 (+ 4 других файлов) |
| item | №0051 (+ 37 других файлов) |
| itemArray | №0781 |
| itemCards | №0781 |
| itemCategory | №0782 |
| itemData | №0781 (+ 1 других файлов) |
| itemId | №0788 (+ 2 других файлов) |
| itemName | №0782 |
| itemRegistry | №0781 |
| items | №0050 (+ 13 других файлов) |
| iterations | №0809 |
| iv | №0058 (+ 3 других файлов) |
| iw | №0768 (+ 1 других файлов) |
| ix | №0047 (+ 3 других файлов) |
| j | №0047 (+ 24 других файлов) |
| J | №0050 |
| jaw | №0050 |
| jb | №1103 (+ 1 других файлов) |
| jh | №1103 (+ 1 других файлов) |
| ji | №0057 |
| jinx | №0644 |
| job | №0807 |
| joinBox | №0799 |
| jointIds | №1073 |
| joints | №0047 (+ 4 других файлов) |
| journal | №0844 (+ 1 других файлов) |
| JOURNAL | №0642 (+ 1 других файлов) |
| jp | №1103 |
| jpad | №1246 |
| JSDOM | №1112 |
| json | №0058 (+ 12 других файлов) |
| JSON | №0652 (+ 55 других файлов) |
| jsonBytes | №1097 |
| jsonBytes0 | №1097 |
| jsonPad | №1097 |
| k | №0048 (+ 111 других файлов) |
| K | №0057 (+ 1 других файлов) |
| keep | №0050 (+ 4 других файлов) |
| keepConditions | №0067 |
| keepEffects | №0067 |
| keepFaces | №0047 |
| keepResistance | №0067 |
| key | №0050 (+ 62 других файлов) |
| KEY | №0049 (+ 20 других файлов) |
| keyName | №0067 |
| keys | №0050 (+ 6 других файлов) |
| kg | №0780 |
| kgInput | №0780 |
| killer | №0772 |
| kind | №0050 (+ 20 других файлов) |
| kinds | №0807 (+ 1 других файлов) |
| kingAlly | №0808 |
| kingEnemy | №1119 |
| kingSelect | №1119 |
| knee | №0050 |
| kneeHigh | №0050 |
| kneeLine | №0050 |
| kneeLow | №0050 |
| knockout | №1138 |
| knockoutHero | №1138 |
| knockoutTarget | №1138 |
| knot | №0052 |
| known | №0067 (+ 8 других файлов) |
| KNOWN | №0817 (+ 1 других файлов) |
| knownCantrips | №0067 |
| knownFormula | №0768 |
| knownProcessed | №0662 |
| knownSpell | №1149 |
| ko | №0768 |
| koMod | №1139 |
| koRoll | №0768 |
| koTarget | №1139 |
| l | №0050 (+ 44 других файлов) |
| L | №0047 (+ 2 других файлов) |
| la | №0800 |
| label | №0052 (+ 10 других файлов) |
| labels | №0052 (+ 2 других файлов) |
| LABELS | №0860 |
| lamp | №1113 |
| landed | №1117 |
| landscape | №0875 (+ 1 других файлов) |
| langCount | №0635 |
| langs | №0817 |
| LANGS | №0817 |
| langStr | №0635 |
| langText | №0813 |
| larva | №0050 (+ 1 других файлов) |
| larvaBounds | №0052 |
| larval | №0052 |
| last | №0047 (+ 7 других файлов) |
| lastError | №0052 |
| lastFace | №1109 |
| lastResult | №0790 |
| lastRow | №1083 |
| lastTap | №0786 |
| lastVertex | №1109 |
| late | №1059 |
| latitude | №0047 |
| latitudes | №0047 |
| launchTour | №0804 |
| layer | №0050 |
| layout | №1257 (+ 1 других файлов) |
| lazarusOwner | №1058 |
| lbs | №0780 |
| le | №0854 |
| lead | №0765 (+ 1 других файлов) |
| leaf | №0052 |
| leafSize | №1105 |
| lean | №0050 |
| learned | №0659 |
| leather | №0052 |
| leatherQty | №0652 |
| leaving | №1119 |
| leavingReach | №0808 |
| left | №0051 (+ 13 других файлов) |
| leftReaction | №0644 |
| leg | №0050 (+ 1 других файлов) |
| legacy | №0812 (+ 9 других файлов) |
| legacyCount | №1295 |
| legacyCurses | №0066 |
| legacyHuman | №1060 |
| legacyPact | №0787 |
| legacyUrl | №1239 |
| legend | №0052 |
| legPhase | №0050 |
| len | №0050 (+ 12 других файлов) |
| length | №0047 (+ 2 других файлов) |
| lengths | №1108 |
| level | №0047 (+ 38 других файлов) |
| level1 | №0767 |
| levelData | №0689 (+ 1 других файлов) |
| levelDisplays | №0689 |
| levelFilter | №0825 |
| levelFour | №1058 |
| levelInput | №0820 |
| levelInputs | №0689 |
| levelOk | №0825 |
| levelReq | №0768 |
| levels | №0664 (+ 23 других файлов) |
| LEVELS | №0659 |
| levelSources | №0825 |
| levelSpells | №0825 |
| levelUp | №1084 |
| levelUpBtn | №0769 |
| levelUpSrc | №1190 |
| levelVal | №0825 |
| li | №0061 (+ 1 других файлов) |
| lie | №1137 |
| lifecycle | №0782 |
| lift | №0050 |
| light | №0062 |
| lightArmor | №0644 |
| lightFloor | №0062 |
| lightLimitKg | №0781 |
| lightLimitLb | №0781 |
| lights | №0060 |
| lim | №0807 |
| limbRanges | №0050 |
| limbSamples | №0050 |
| limbSelect | №0052 |
| limit | №0050 (+ 3 других файлов) |
| limits | №0052 |
| limitStr | №0781 |
| line | №0050 (+ 8 других файлов) |
| lineno | №0760 |
| lines | №0816 |
| lingerie | №0051 |
| lingerieAtlas | №0051 |
| link | №0786 (+ 1 других файлов) |
| linked | №1117 |
| linkedPhone | №1117 |
| links | №0047 (+ 1 других файлов) |
| lip | №0050 |
| list | №0049 (+ 41 других файлов) |
| listContainer | №0071 (+ 2 других файлов) |
| listContainers | №0778 |
| listener | №0876 |
| listeners | №0642 (+ 1 других файлов) |
| lit | №1113 |
| lItem | №0635 |
| live | №0052 (+ 6 других файлов) |
| LIVE_PROGRESSION_KEYS | №0638 |
| liveFoe | №1121 |
| liveKey | №0638 |
| livePC | №1117 |
| livePhone | №1117 |
| liveRoot | №0875 |
| liveServer | №1117 |
| liveSnake | №1117 |
| lo | №0050 (+ 7 других файлов) |
| LOAD_FILES | №0652 |
| loader | №1098 |
| lobe | №0050 |
| loc | №1059 |
| local | №0050 (+ 5 других файлов) |
| localData | №0821 |
| localId | №0642 |
| localStorage | №1101 |
| location | №0807 |
| lock | №0875 |
| locked | №0658 (+ 1 других файлов) |
| locks | №0050 (+ 1 других файлов) |
| logBox | №0760 |
| logContainer | №0761 |
| logContent | №0779 |
| logDiv | №0779 |
| logItem | №0761 |
| logLine | №0760 |
| logs | №0821 |
| logText | №0761 (+ 1 других файлов) |
| long | №0052 (+ 1 других файлов) |
| longFired | №0852 |
| longitude | №0047 |
| longTimer | №0852 |
| looksLikeModal | №0821 |
| lookup | №0050 |
| loop | №0047 |
| loot | №0616 (+ 18 других файлов) |
| LOOT_MODELS | №0795 |
| los | №0645 (+ 1 других файлов) |
| loss | №0630 (+ 1 других файлов) |
| low | №0050 (+ 6 других файлов) |
| lower | №0048 (+ 4 других файлов) |
| lowerId | №0051 |
| lowerJaw | №0050 |
| lowerLang | №0635 |
| lowerName | №0613 |
| lowerOptions | №0051 |
| lowerTool | №0635 |
| lowest | №0047 |
| loX | №0050 |
| loY | №0050 |
| lr | №0800 (+ 1 других файлов) |
| ls | №0062 (+ 2 других файлов) |
| lv | №0067 (+ 1 других файлов) |
| lvl | №0775 (+ 8 других файлов) |
| lvl1Options | №0635 |
| lvlA | №0825 |
| lvlB | №0825 |
| lvlBadge | №0825 |
| lvlDisplay | №0821 |
| lvlInput | №0821 |
| lx | №0061 |
| Lx | №0061 |
| ly | №0061 |
| Ly | №0061 |
| m | №0048 (+ 101 других файлов) |
| M | №0059 (+ 8 других файлов) |
| m0 | №1059 |
| m1 | №0663 (+ 1 других файлов) |
| m2 | №0663 |
| macro | №1294 |
| macroFile | №1294 |
| macros | №1103 (+ 2 других файлов) |
| madBomber | №0644 |
| mag | №0052 (+ 1 других файлов) |
| MAGE_CATALOG_AUDITED | №0807 |
| MAGE_HANDLERS | №0807 |
| MAGE_LEVEL2 | №0807 |
| mageActors | №0808 |
| mageApi | №0808 |
| mageBack | №1117 |
| mageBerryCount | №0808 |
| mageCon | №1117 |
| mageDarts | №0808 (+ 1 других файлов) |
| mageGround | №0808 |
| magePC | №1117 |
| magePending | №0808 |
| magePhone | №1117 |
| mageRoster | №1117 |
| mageSelect | №1119 |
| mageServer | №1117 |
| mageSpell | №0808 |
| mageStat | №0808 |
| mageTargets | №0808 |
| mageType | №0808 |
| mageWilling | №0808 |
| magic | №1190 |
| magicFistHero | №1138 |
| magicHit | №1138 |
| main | №0051 |
| mainCard | №0761 |
| mainWindow | №0875 |
| major | №1117 |
| MAJOR_ACTIONS | №0807 |
| MAJORS | №0810 |
| male | №1078 |
| malePositions | №1059 |
| maleRef | №1078 |
| malformed | №1064 (+ 3 других файлов) |
| manager | №1238 |
| manifest | №0784 (+ 3 других файлов) |
| manifestPath | №0878 (+ 1 других файлов) |
| manifestUrl | №0831 |
| manual | №1065 (+ 1 других файлов) |
| map | №0050 (+ 24 других файлов) |
| Map | №1099 (+ 5 других файлов) |
| mapped | №0768 |
| mapping | №0050 (+ 1 других файлов) |
| maps | №0860 (+ 1 других файлов) |
| mapToVar | №0823 |
| mark | №0630 (+ 1 других файлов) |
| market | №0789 (+ 2 других файлов) |
| mask | №0048 (+ 2 других файлов) |
| MASS_HARVEST_MATERIALS | №0795 |
| master | №0654 (+ 2 других файлов) |
| mastery | №0800 |
| masteryNames | №0800 |
| mat | №0051 (+ 8 других файлов) |
| match | №0769 (+ 6 других файлов) |
| matches | №0637 (+ 2 других файлов) |
| material | №0051 (+ 2 других файлов) |
| MATERIAL_BRIDGE | №0795 |
| MATERIAL_DEFS | №0661 |
| materialCells | №0051 |
| materialIds | №0661 |
| materials | №0051 (+ 3 других файлов) |
| MATERIALS | №0656 (+ 2 других файлов) |
| math | №1084 (+ 2 других файлов) |
| Math | №1057 (+ 63 других файлов) |
| matrices | №0047 (+ 1 других файлов) |
| matrix | №0047 (+ 1 других файлов) |
| mats | №0653 (+ 6 других файлов) |
| max | №0050 (+ 37 других файлов) |
| MAX | №0792 (+ 3 других файлов) |
| MAX_CR | №0822 |
| MAX_DEPTH | №0778 |
| MAX_ERRORS | №0842 |
| MAX_FILES | №0878 |
| MAX_PLAYERS | №0799 |
| MAX_TOTAL_BYTES | №0878 |
| max2 | №0802 |
| maxAllowedLevel | №0825 |
| maxAt | №1129 |
| maxBuilder | №1084 |
| maxCapacityKg | №0781 (+ 1 других файлов) |
| maxCapacityLb | №0781 |
| maxDisplacement | №1102 |
| maxDistance | №1073 |
| maxFaces | №0047 (+ 1 других файлов) |
| maxHero | №1117 |
| maxHit | №1117 |
| maxHp | №0613 (+ 3 других файлов) |
| maxHP | №0858 |
| maximize | №0644 |
| maximum | №0644 (+ 2 других файлов) |
| maxIndex | №1109 |
| maxLevel | №0825 |
| maxOutside | №1246 |
| maxPrepared | №0825 |
| maxRestore | №0637 |
| maxRoll | №1084 |
| maxSpell | №0824 |
| maxSteps | №0645 |
| maxTargets | №1104 |
| maxTex | №0062 |
| maxUses | №0643 (+ 1 других файлов) |
| maxVal | №0825 |
| maxVertices | №0052 (+ 6 других файлов) |
| maxX | №0060 |
| maxY | №0060 |
| MC1 | №0619 |
| mctx | №1231 (+ 1 других файлов) |
| MCV2 | №0620 |
| md | №0062 (+ 2 других файлов) |
| me | №0058 (+ 1 других файлов) |
| mean | №0047 (+ 6 других файлов) |
| meanUniform | №1083 |
| mechanics | №0822 |
| MECHANICS | №0066 (+ 2 других файлов) |
| medium | №0630 |
| mediumLimitKg | №0781 |
| mediumLimitLb | №0781 |
| members | №0807 |
| memory | №1066 |
| mental | №0773 (+ 1 других файлов) |
| menu | №0804 |
| merged | №0052 (+ 1 других файлов) |
| mesh | №0050 (+ 4 других файлов) |
| meshes | №0058 (+ 2 других файлов) |
| message | №0052 (+ 17 других файлов) |
| messages | №0063 |
| meta | №0053 (+ 7 других файлов) |
| META_COST | №0637 |
| META_NAMES | №0637 |
| METAS | №0066 |
| method | №0642 |
| mettle | №0644 |
| mh | №0050 (+ 5 других файлов) |
| mi | №0058 (+ 2 других файлов) |
| microEntry | №0052 |
| mid | №0050 (+ 1 других файлов) |
| middles | №0047 |
| migrated | №0800 |
| mimeTypes | №0875 |
| min | №0050 (+ 7 других файлов) |
| minBuilder | №1084 |
| mind | №0805 |
| minimumLevel | №0637 |
| minIndex | №1109 |
| minor | №1130 |
| MINOR_ACTIONS | №0807 |
| mins | №0857 |
| minutes | №0857 (+ 1 других файлов) |
| minutesSinceDeath | №0067 |
| minutesVal | №0857 |
| minVal | №0775 |
| minX | №0060 |
| minY | №0060 |
| miss | №1133 |
| missArena | №1138 |
| missedKnockoutHero | №1138 |
| missedKnockoutTarget | №1138 |
| misses | №1105 (+ 3 других файлов) |
| missing | №0653 (+ 10 других файлов) |
| missingReliefRoll | №1058 |
| missingTools | №0661 |
| missTarget | №1138 |
| mix | №0068 (+ 1 других файлов) |
| mixed | №1061 (+ 1 других файлов) |
| mj | №0768 |
| ml | №0050 |
| mm | №0062 (+ 2 других файлов) |
| mn | №0070 (+ 7 других файлов) |
| mo | №0062 |
| mob | №1117 |
| mobile | №1117 |
| mobileArmor | №1117 |
| mobileArmored | №1117 |
| mobileArtisan | №1117 |
| mobileBerry | №1117 |
| mobileBurden | №1117 |
| mobileDarts | №1117 |
| mobileDash | №1117 |
| mobileIllusion | №1117 |
| mobileMage | №1117 |
| mobilePoison | №1117 |
| mobileQueen | №1117 |
| mobileRange | №0062 |
| mobileSnake | №1117 |
| mobileStand | №1117 |
| mod | №0613 (+ 9 других файлов) |
| modal | №0071 (+ 13 других файлов) |
| modalColorOptions | №0857 |
| modalHTML | №0689 |
| modals | №0782 |
| modDisplay | №0761 (+ 1 других файлов) |
| mode | №0059 (+ 21 других файлов) |
| modeButtons | №0761 |
| model | №0795 (+ 1 других файлов) |
| modeRadio | №0636 |
| modes | №1136 (+ 2 других файлов) |
| modeSelect | №0780 |
| modifier | №0643 (+ 1 других файлов) |
| modifierMatch | №0761 |
| modifiers | №1138 |
| MODIFIERS | №0663 |
| modMatches | №0825 |
| modName | №0761 |
| modNum | №0613 (+ 1 других файлов) |
| mods | №0644 (+ 5 других файлов) |
| modSourceLabel | №0761 |
| modStr | №0613 (+ 3 других файлов) |
| modTag | №0613 (+ 1 других файлов) |
| modules | №1038 (+ 37 других файлов) |
| modVal | №0761 (+ 1 других файлов) |
| monk | №1203 (+ 1 других файлов) |
| monster | №0794 (+ 2 других файлов) |
| MONSTER_RECIPES | №0795 |
| monsterCount | №0794 |
| monsterId | №0800 |
| monsterName | №0796 (+ 1 других файлов) |
| monsters | №0616 (+ 13 других файлов) |
| MONSTERS | №0644 |
| monsterSrc | №1211 |
| monstrousGrafts | №0067 |
| morph | №1105 (+ 2 других файлов) |
| morphBytes | №1097 |
| morphed | №1060 |
| morphName | №1097 |
| morphOffset | №1097 |
| morphPrimitives | №1100 (+ 1 других файлов) |
| morphTargets | №1100 |
| motion | №0052 |
| motionBack | №1117 |
| motionPC | №1117 |
| motionPhone | №1117 |
| motionRoster | №1117 |
| motionServer | №1117 |
| mouth | №0050 |
| mouthDistance | №0050 |
| mouthRadius | №0050 |
| mouthRY | №0050 |
| mouthY | №0050 |
| move | №0059 (+ 1 других файлов) |
| moved | №0852 (+ 3 других файлов) |
| moveExtraPanelsIntoDrawer | №0761 |
| moveHero | №1117 |
| moveId | №1124 |
| moveItemToContainer | №0778 |
| movement | №0063 |
| movePC | №1117 |
| movePhone | №1117 |
| moveRoster | №1117 |
| movers | №0807 |
| moveServer | №1117 |
| moving | №0050 |
| moxie | №0768 |
| moxieBeforeMiss | №1138 |
| mp | №0637 (+ 2 других файлов) |
| mr | №0637 (+ 2 других файлов) |
| mrko | №0768 |
| ms | №0058 (+ 2 других файлов) |
| msg | №0821 (+ 11 других файлов) |
| msgEl | №0781 |
| mult | №0613 (+ 4 других файлов) |
| multi2 | №0658 |
| MULTICLASS_PROFICIENCIES_2014 | №0702 |
| MULTICLASS_REQUIREMENTS | №0775 |
| MULTIPLIER | №0794 |
| multiRules | №0689 |
| mults | №0779 |
| muscle | №0050 |
| mutableHit | №1057 |
| mutableTarget | №1057 |
| mutagenAbility | №0067 |
| mutagenAlly | №1058 |
| mutagenHero | №1058 |
| mutagenist | №1058 |
| mutagenNames | №0630 |
| mutagenResult | №1058 |
| mutagens | №0630 |
| mutatedCap | №0067 |
| MUTATION_SLOTS | №0805 (+ 1 других файлов) |
| mutations | №0781 (+ 4 других файлов) |
| mutCreated | №0768 |
| muts | №0828 |
| muzzle | №0050 (+ 3 других файлов) |
| mv | №0645 |
| mw | №0050 |
| mx | №0062 (+ 6 других файлов) |
| my | №0062 (+ 1 других файлов) |
| mysteries | №0802 |
| mythic | №1147 (+ 1 других файлов) |
| n | №0048 (+ 143 других файлов) |
| N | №0047 (+ 3 других файлов) |
| n2 | №1234 |
| nailLen | №0050 |
| name | №0048 (+ 167 других файлов) |
| NAME | №0824 (+ 1 других файлов) |
| NAME_ALIASES | №0791 |
| name2 | №0768 |
| nameA | №0825 |
| nameB | №0825 |
| nameInp | №0780 |
| nameInput | №0613 (+ 2 других файлов) |
| nameLower | №0761 |
| nameRu | №1237 |
| names | №0048 (+ 23 других файлов) |
| NAMES | №0617 (+ 12 других файлов) |
| nameSpan | №0782 (+ 1 других файлов) |
| NaN | №1147 |
| native | №0831 (+ 1 других файлов) |
| nativeBridge | №0799 |
| nativeClear | №0642 |
| nativePacketSeq | №0799 |
| nativeRemove | №0642 |
| nativeSeenSeqByPeer | №0799 |
| nativeSet | №0642 |
| nativeVersion | №0831 |
| natural | №0822 |
| naturalAttack | №1147 |
| naturalGrafts | №0067 |
| naturalTwenty | №0644 |
| nb | №0050 |
| nctx | №1230 |
| ne | №1206 (+ 7 других файлов) |
| near | №0047 (+ 2 других файлов) |
| nearest | №0645 (+ 1 других файлов) |
| nearestAt | №0050 |
| nearestDist | №0645 |
| neck | №0050 |
| neckDrop | №0051 |
| neckFront | №0051 |
| neckIndices | №0050 |
| neckMap | №0050 |
| neckNormals | №0050 |
| neckZ | №0050 |
| necromanticRevival | №0644 |
| necrotic | №0644 |
| needsSave | №0644 |
| needsSubclassChoice | №0689 |
| needsTarget | №0768 |
| net | №0762 (+ 4 других файлов) |
| neutral | №1061 (+ 2 других файлов) |
| newChar | №0613 (+ 1 других файлов) |
| newcomer | №1130 (+ 1 других файлов) |
| newCount | №0782 |
| newCp | №0779 |
| newEntry | №0785 |
| newEp | №0779 |
| newFolder | №0801 |
| newGp | №0779 |
| newId | №0613 (+ 2 других файлов) |
| newLevel | №0820 (+ 1 других файлов) |
| newLvl | №0821 |
| newMax | №0689 |
| newPeer | №1224 |
| newPp | №0779 |
| newRace | №0813 |
| newSp | №0779 |
| newSpell | №0825 |
| newTemp | №0067 |
| newTotalLevel | №0689 |
| newVal | №0613 (+ 2 других файлов) |
| newVol | №0071 |
| next | №0047 (+ 18 других файлов) |
| nextHp | №0067 |
| nextLevel | №0689 |
| nextLevelExpReq | №0769 |
| nextRemaining | №0067 |
| nf | №0062 |
| ng | №1225 (+ 2 других файлов) |
| ni | №0050 (+ 2 других файлов) |
| nk | №0050 (+ 1 других файлов) |
| nl | №0050 |
| nm | №0854 |
| nn | №1105 (+ 3 других файлов) |
| nnx | №0050 |
| nnz | №0050 |
| no | №1153 |
| noChoice | №1058 |
| noClaws | №1079 |
| node | №0821 (+ 5 других файлов) |
| nodes | №0048 (+ 8 других файлов) |
| NODES | №0867 |
| noEars | №1081 |
| noGlow | №1259 |
| none | №0052 (+ 2 других файлов) |
| nonmagicalResistance | №0644 |
| nonmagicalVariants | №0644 |
| nonZero | №1105 (+ 2 других файлов) |
| nonzeroSource | №1108 |
| noRefill | №1117 |
| noReliefTarget | №1058 |
| noRiteDice | №1144 |
| norm | №0047 (+ 2 других файлов) |
| normal | №0050 (+ 5 других файлов) |
| normalAC | №0644 |
| normalizeClassKey | №0689 |
| normalized | №0702 (+ 3 других файлов) |
| normalizedCondition | №0644 |
| normalizedCurrentClass | №0689 |
| normalizedRequested | №0689 |
| normalizeLevelUpClassName | №0689 |
| normalizeYield | №0815 |
| normalRaceLabel | №0635 |
| normals | №0047 (+ 1 других файлов) |
| nose | №0050 |
| noseDepth | №0050 |
| nosePart | №0050 |
| noseTop | №0050 |
| noseWidth | №0050 |
| noseY | №0050 |
| noseZ | №0050 |
| nostril | №0050 |
| nostrils | №0050 |
| note | №0644 (+ 2 других файлов) |
| now | №0050 (+ 5 других файлов) |
| np | №0050 |
| npot | №0062 |
| null | №0821 (+ 14 других файлов) |
| num | №0775 (+ 1 других файлов) |
| Number | №0652 (+ 25 других файлов) |
| numbers | №0051 |
| nums | №0800 |
| nw | №0768 |
| nx | №0050 (+ 1 других файлов) |
| ny | №0047 (+ 1 других файлов) |
| nylon | №0052 |
| nz | №0047 (+ 2 других файлов) |
| o | №0048 (+ 51 других файлов) |
| oa | №0768 |
| obj | №0060 (+ 5 других файлов) |
| Object | №0652 (+ 23 других файлов) |
| objectBomber | №1057 |
| objectId | №0637 (+ 2 других файлов) |
| objectIds | №0817 |
| objPath | №1097 (+ 6 других файлов) |
| objs | №0061 |
| observer | №0781 (+ 3 других файлов) |
| observerTarget | №0781 |
| oc | №1208 |
| oc2 | №1208 |
| occultIds | №1146 |
| occultistPack | №0768 |
| occupied | №0819 |
| od | №0800 |
| odd | №0807 |
| odds | №0808 (+ 4 других файлов) |
| odr | №0800 |
| off | №0052 (+ 6 других файлов) |
| offer | №0790 (+ 3 других файлов) |
| offered | №0791 |
| offers | №0790 (+ 1 других файлов) |
| offHoof | №1079 |
| offset | №0050 (+ 7 других файлов) |
| oh | №0061 (+ 1 других файлов) |
| oi | №0061 (+ 2 других файлов) |
| oid | №0768 |
| oilDamage | №0644 |
| ok | №0061 (+ 10 других файлов) |
| ol | №0062 |
| old | №0054 (+ 47 других файлов) |
| oldAngle | №0054 |
| oldBin | №1097 |
| oldBuffer | №1059 |
| oldChar | №1224 |
| oldCharacter | №1224 |
| oldCombatForDemolition | №1058 |
| oldData | №0821 |
| oldDrawer | №0761 |
| oldEffects | №0067 |
| oldHead | №1060 |
| oldHost | №0761 |
| oldHp | №0067 |
| oldId | №0644 (+ 1 других файлов) |
| oldInitRender | №0816 |
| oldLength | №0047 |
| oldLevel | №0659 |
| oldMax | №0066 (+ 1 других файлов) |
| oldNet | №1224 |
| oldPact | №0816 |
| oldPeer | №0800 |
| oldRAF | №1249 (+ 18 других файлов) |
| oldRandom | №0652 (+ 1 других файлов) |
| oldRandomForBurn | №1057 |
| oldRandomMutable | №1057 |
| oldRandomObject | №1057 |
| oldRandomPoison | №1057 |
| oldRandomSlime | №1057 |
| oldRenderDndTools | №0816 |
| oldRoll | №1215 |
| oldSelect | №0780 |
| oldTemp | №0067 |
| oldTotal | №0689 |
| on | №0052 (+ 6 других файлов) |
| onchange | №0808 |
| one | №1132 |
| oneTwoTarget | №0768 |
| onPhone | №1117 |
| onProgress | №0831 |
| oozeRancher | №0644 |
| oozeRancherAcidResistance | №0644 |
| oozeTarget | №1057 |
| op | №0052 (+ 2 других файлов) |
| opacity | №0857 (+ 1 других файлов) |
| opacityVal | №0857 |
| open | №0637 (+ 2 других файлов) |
| openedHero | №0808 |
| opening | №0761 |
| openPanels | №1081 |
| openSet | №0785 |
| openSky | №0807 |
| operationId | №0810 |
| opportunityAttacker | №0808 |
| opt | №0052 (+ 4 других файлов) |
| option | №0052 |
| options | №0050 (+ 22 других файлов) |
| opts | №0069 (+ 29 других файлов) |
| optsHtml | №0635 |
| orbit | №0050 |
| orc | №1210 |
| order | №0047 (+ 4 других файлов) |
| orderCtx | №1149 |
| origin | №0052 (+ 2 других файлов) |
| original | №0047 (+ 18 других файлов) |
| originalAppearance | №0067 |
| originalAttack | №0655 |
| originalBody | №1060 |
| originalCalculateMods | №0825 |
| originalContext | №1059 |
| originalCraft | №0655 (+ 1 других файлов) |
| originalCrypto | №1119 |
| originalDamage | №0655 |
| originalEnemyHp | №1119 |
| originalError | №0760 |
| originalHealingTarget | №0644 |
| originalIndex | №0782 |
| originalIndices | №1077 |
| originalLog | №0760 |
| originalOpenCharacter | №0825 |
| originalPhysical | №0822 |
| originalRepair | №0655 |
| originalUI | №1239 |
| originalUiCraft | №0655 |
| originLabel | №0052 |
| orphan | №0778 |
| os | №1056 (+ 5 других файлов) |
| ot | №0645 (+ 1 других файлов) |
| other | №0782 (+ 7 других файлов) |
| otherCat | №0782 |
| otherIndex | №0782 |
| otherIsShield | №0782 |
| otherName | №0782 |
| ott | №0768 |
| out | №0048 (+ 69 других файлов) |
| outcome | №0807 (+ 2 других файлов) |
| outer | №0047 (+ 2 других файлов) |
| outerWidth | №0047 |
| outPath | №1097 |
| output | №0052 (+ 3 других файлов) |
| outputId | №0662 (+ 1 других файлов) |
| outputName | №0662 (+ 1 других файлов) |
| outside | №0051 (+ 1 других файлов) |
| outsideBary | №1108 |
| overheated | №0067 |
| overheatedTarget | №1058 |
| overlay | №0786 (+ 3 других файлов) |
| overload | №1058 |
| overloadBefore | №1058 |
| overloadBomber | №1058 |
| overloadCost | №0067 |
| overrides | №0646 |
| ow | №0061 |
| own | №0645 (+ 1 других файлов) |
| owned | №0660 (+ 2 других файлов) |
| owner | №0052 (+ 10 других файлов) |
| ownerActor | №0645 |
| ownerBombHit | №1057 |
| ownerClass | №0067 |
| ownerCopy | №0810 |
| ownerId | №0819 |
| ox | №0057 (+ 2 других файлов) |
| oy | №0057 (+ 2 других файлов) |
| oz | №0057 (+ 1 других файлов) |
| p | №0048 (+ 162 других файлов) |
| P | №0058 (+ 2 других файлов) |
| p0 | №0050 |
| p1 | №0050 |
| pa | №0644 |
| pack | №0059 (+ 22 других файлов) |
| PACK_ID | №0067 (+ 2 других файлов) |
| PACK_MANIFEST | №0651 |
| packId | №0650 |
| packName | №0650 |
| packs | №0765 (+ 1 других файлов) |
| pact | №0637 (+ 3 других файлов) |
| PACT | №0787 |
| PACT_SLOTS | №0816 |
| pactBoxes | №0825 |
| pactLevel | №0816 |
| pactSlots | №0768 |
| pactState | №0816 |
| pad | №0050 |
| pads | №0050 |
| page | №0642 (+ 38 других файлов) |
| paid | №0792 (+ 1 других файлов) |
| paintAttack | №1058 |
| painter | №1058 |
| pair | №0047 (+ 2 других файлов) |
| pal | №1208 (+ 2 других файлов) |
| palette | №0051 (+ 1 других файлов) |
| palettes | №0052 |
| palm | №0050 |
| panel | №0051 (+ 6 других файлов) |
| panelHost | №0816 |
| panelsHidden | №0059 |
| panX | №0852 |
| panY | №0852 |
| parasiteHostTarget | №0635 |
| parent | №0057 (+ 3 других файлов) |
| parentArea | №0782 |
| parentId | №0828 |
| parsed | №0821 (+ 3 других файлов) |
| parsedHtml | №0761 |
| parsedSides | №0761 |
| parseFloat | №1057 (+ 15 других файлов) |
| parseInt | №1057 (+ 13 других файлов) |
| part | №0048 (+ 16 других файлов) |
| partner | №0807 |
| partnerSnapshot | №0807 |
| parts | №0050 (+ 29 других файлов) |
| partySize | №0794 |
| pass | №0047 (+ 3 других файлов) |
| passed | №1089 (+ 2 других файлов) |
| passInsight | №0613 (+ 1 других файлов) |
| passInvestigation | №0613 (+ 1 других файлов) |
| passive | №0768 (+ 2 других файлов) |
| passiveFeatures | №0067 |
| passPerception | №0613 (+ 1 других файлов) |
| password | №0640 (+ 1 других файлов) |
| pat | №0061 |
| patch | №0050 (+ 5 других файлов) |
| patchLootResult | №0815 |
| path | №0050 (+ 110 других файлов) |
| paths | №1093 |
| patient | №0067 (+ 1 других файлов) |
| patronNames | №0630 |
| patrons | №0630 (+ 1 других файлов) |
| paw | №0050 |
| payload | №0072 (+ 11 других файлов) |
| pb | №0066 (+ 7 других файлов) |
| PB | №0066 (+ 10 других файлов) |
| pbBreath | №0067 |
| pc | №0768 (+ 4 других файлов) |
| pcRoster | №1117 |
| pct | №0832 (+ 1 других файлов) |
| pd | №0867 |
| peace | №1117 |
| peacePhone | №1117 |
| peak | №1138 |
| peer | №0800 (+ 2 других файлов) |
| peerId | №0800 |
| peers | №0799 (+ 3 других файлов) |
| pelvisNode | №0047 |
| penalizedAttack | №1057 |
| penalizedSave | №1057 |
| penalty | №0630 |
| pending | №0053 (+ 14 других файлов) |
| pendingBloodAttack | №0644 |
| pendingBomb | №0067 |
| pendingContext | №0614 |
| pendingFeature | №0614 |
| pendingLevelUpData | №0689 |
| pendingReactions | №0800 |
| pendingSavantAttack | №0644 |
| pendingTargetId | №0614 |
| percent | №0052 (+ 2 других файлов) |
| perfumeAttack | №1057 |
| perfumeAttacker | №1057 |
| perfumeClass | №0644 |
| perfumeDC | №0644 |
| perfumeHero | №0644 |
| perfumeOwner | №1057 |
| perfumeOwnerState | №0644 |
| perfumeRound | №0644 |
| perfumeSave | №0644 |
| perfumeSource | №0644 |
| perfumeSourceClass | №0644 |
| perfumeState | №0644 |
| perfumeTargetId | №0644 |
| permission | №0875 |
| perms | №1111 |
| pev | №0800 |
| pf | №0822 |
| ph | №1213 |
| PH | №0061 |
| phase | №0050 (+ 1 других файлов) |
| phases | №1157 |
| pher | №0644 |
| pherDebuffs | №0067 |
| pheromone | №1057 (+ 1 других файлов) |
| pheromoneOwner | №1057 |
| pheromoneSave | №0067 |
| pheromoneTarget | №1057 (+ 1 других файлов) |
| phi | №0047 (+ 2 других файлов) |
| phone | №1089 (+ 2 других файлов) |
| phoneProtected | №1117 |
| phoneTraveller | №1117 |
| physical | №0644 (+ 1 других файлов) |
| physicalKey | №0822 |
| pi | №0057 (+ 5 других файлов) |
| pick | №0050 (+ 9 других файлов) |
| picked | №0630 (+ 1 других файлов) |
| picker | №0052 |
| picks | №0067 |
| pid | №0659 (+ 1 других файлов) |
| pigmentClass | №0067 |
| pigmentist | №1058 |
| pinch | №0852 |
| pink | №0050 |
| PINNED_COMMIT | №1294 |
| pInput | №0779 |
| pipe | №1061 (+ 20 других файлов) |
| pitch | №0052 (+ 3 других файлов) |
| pivot | №0047 |
| pixel | №1267 |
| pixels | №1249 (+ 19 других файлов) |
| pl | №0682 (+ 2 других файлов) |
| plan | №0654 (+ 4 других файлов) |
| plane | №0050 (+ 1 других файлов) |
| PLANES | №0621 |
| plannedMove | №0800 |
| plates | №0050 |
| playable | №0810 |
| playBtn | №0071 |
| played | №1117 |
| plumage | №0050 |
| plume | №0050 |
| plus | №0047 (+ 1 других файлов) |
| pn | №0050 |
| po | №0768 |
| point | №0050 (+ 2 других файлов) |
| pointCostDiff | №0613 (+ 1 других файлов) |
| pointers | №0852 |
| points | №0050 (+ 10 других файлов) |
| pointsLeftEl | №0613 (+ 1 других файлов) |
| poisonBomb | №1058 |
| poisonedAttacker | №1057 |
| poisonedCombatant | №1057 |
| poisonedStrike | №1057 |
| poisonedWeaponAttack | №1058 |
| poisonImmuneTarget | №1057 |
| poisonPreview | №1057 |
| poisonWeapon | №0067 |
| poisonWeaponId | №0067 |
| pole | №0047 |
| policy | №0661 |
| poly | №0050 (+ 1 других файлов) |
| polygon | №0050 |
| pool | №0067 (+ 5 других файлов) |
| poolKind | №0067 |
| pools | №0068 |
| portraitBounds | №0875 |
| pos | №0047 (+ 10 других файлов) |
| pose | №0050 |
| posed | №0054 |
| poses | №0054 |
| position | №0807 |
| positionCounts | №1109 |
| positions | №0047 (+ 5 других файлов) |
| possibleIdElements | №0781 |
| potency | №0068 (+ 1 других файлов) |
| potential | №0050 |
| potion | №0067 (+ 2 других файлов) |
| potionColor | №0067 |
| potionIndex | №1153 |
| potions | №0067 |
| pounds | №0807 |
| power | №0050 (+ 1 других файлов) |
| pp | №0070 (+ 4 других файлов) |
| pPerG | №0779 |
| ppInput | №0779 |
| ppVal | №0779 |
| pr | №0630 (+ 2 других файлов) |
| pre | №0066 |
| predicate | №0050 |
| predict | №1083 |
| predictorTrump | №0644 |
| preFeatSelect | №0689 |
| preferPact | №0637 |
| prefix | №0778 (+ 3 других файлов) |
| preloadPath | №1295 |
| prep | №1208 |
| PREP | №0792 (+ 1 других файлов) |
| prepared | №0630 (+ 3 других файлов) |
| preparedAny | №0800 |
| preparedCount | №0825 |
| preparedFormula | №0067 |
| preparedReaction | №0800 |
| preparedReservation | №0800 |
| prepProfile | №0825 |
| prereq | №0833 |
| preS | №0689 |
| preS1 | №0689 |
| preS2 | №0689 |
| preset | №0051 (+ 3 других файлов) |
| presets | №0055 (+ 1 других файлов) |
| preStats | №0689 |
| prev | №0047 (+ 2 других файлов) |
| preview | №0782 (+ 2 других файлов) |
| previous | №0047 (+ 11 других файлов) |
| previousAC | №0818 |
| previousActive | №0762 |
| previousCount | №1074 |
| previousFetch | №1093 (+ 1 других файлов) |
| previousMageCrypto | №1119 |
| previousRoot | №0762 |
| price | №0656 (+ 1 других файлов) |
| prim | №1097 |
| primary | №0070 (+ 1 других файлов) |
| primaryStat | №0682 |
| prime | №0768 |
| prior | №1142 (+ 2 других файлов) |
| prismaticIndex | №0067 |
| prismaticOptions | №0067 |
| prismAttack | №1058 |
| prismTester | №1058 |
| probe | №0050 (+ 1 других файлов) |
| proceed | №0689 |
| process | №1227 (+ 2 других файлов) |
| processedNames | №0815 |
| processing | №0652 (+ 1 других файлов) |
| PROCESSING | №0661 |
| PROCESSING_DC_BY_RARITY | №0815 |
| PROCESSING_RECIPES | №0662 |
| PROCESSING_TOOL_BY_TYPE | №0815 |
| product | №0069 |
| prof | №0782 (+ 8 других файлов) |
| profBlock | №0734 |
| profBonus | №0613 (+ 4 других файлов) |
| profession | №0662 (+ 2 других файлов) |
| professionBonus | №0069 |
| professionId | №0659 |
| professionLayer | №0661 |
| professions | №0662 |
| PROFESSIONS | №0659 (+ 2 других файлов) |
| PROFICIENCIES_DB | №0811 |
| proficiencyBonus | №0761 |
| proficiencyChoiceHtml | №0689 |
| proficiencyType | №0782 |
| proficient | №0644 (+ 2 других файлов) |
| profId | №0811 (+ 1 других файлов) |
| profIds | №0812 |
| profile | №0047 (+ 10 других файлов) |
| profiles | №0051 (+ 4 других файлов) |
| profInput | №0825 |
| profName | №0812 (+ 1 других файлов) |
| profObj | №0812 (+ 1 других файлов) |
| profOk | №0867 |
| profs | №0782 (+ 3 других файлов) |
| prog | №0062 (+ 4 других файлов) |
| progress | №0808 |
| progressFrame | №0832 |
| progressHandler | №0831 |
| progression | №0066 (+ 11 других файлов) |
| progressPercent | №0769 |
| projected | №0778 (+ 1 других файлов) |
| projection | №0050 |
| projectManifest | №0842 |
| Promise | №1098 (+ 2 других файлов) |
| prompts | №1143 |
| prop | №0067 (+ 2 других файлов) |
| propContainer | №0780 |
| PROPERTIES | №0068 |
| proportions | №1294 |
| props | №0051 (+ 1 других файлов) |
| propTitle | №0780 |
| protectedCase | №1056 |
| protectedHero | №1117 |
| protectedKeys | №0821 |
| proto | №0642 |
| protocol | №0875 |
| proxy | №0800 (+ 1 других файлов) |
| ps | №0058 (+ 2 других файлов) |
| psiLimit | №0703 |
| psion | №1213 |
| psionDisciplines | №0768 |
| pt | №0630 |
| pu | №1213 |
| pugilist | №1139 |
| pugilistAC | №0644 |
| pugilistDefender | №0644 |
| pugilistDigDeepResistant | №0644 |
| pugilistLevelEntry | №0644 |
| pugilistPack | №0644 |
| pugilistSchool | №0644 |
| pugilistState | №0644 |
| pugilistStudy | №0644 |
| pupilDiagnostics | №1259 |
| pupilRound | №1259 |
| pupilSelect | №0052 |
| puppet | №1143 |
| puppetTarget | №0630 |
| puppetWeapon | №0630 |
| purity | №0068 (+ 1 других файлов) |
| pursuits | №0818 |
| pw | №1294 |
| PW | №0061 |
| px | №0050 (+ 2 других файлов) |
| PX | №0061 |
| py | №0052 (+ 1 других файлов) |
| PY | №0061 |
| pz | №0052 |
| q | №0047 (+ 37 других файлов) |
| Q | №0047 |
| q0 | №0050 |
| q1 | №0050 |
| qApi | №0782 |
| qd | №0663 |
| qi | №0772 |
| ql | №0047 |
| qn | №0054 |
| qr | №0768 |
| qs | №1117 |
| qty | №0653 (+ 1 других файлов) |
| quality | №0052 (+ 6 других файлов) |
| QUALITY | №0656 (+ 2 других файлов) |
| QUALITY_GRADES | №0653 |
| QUALITY_TIERS | №0654 |
| qualityFactor | №0653 |
| qualityKey | №0797 |
| qualityPenalty | №0653 |
| quantity | №0781 (+ 2 других файлов) |
| queen | №1117 |
| queenReceipt | №1117 |
| query | №0059 (+ 1 других файлов) |
| queue | №0807 (+ 1 других файлов) |
| queued | №0645 |
| quickGather | №0814 |
| quota | №0048 (+ 1 других файлов) |
| r | №0048 (+ 205 других файлов) |
| R | №0050 (+ 11 других файлов) |
| r0 | №0050 |
| r1 | №0050 (+ 2 других файлов) |
| r2 | №0761 (+ 1 других файлов) |
| race | №0052 (+ 11 других файлов) |
| raceDesc | №0635 |
| raceEntry | №0052 |
| raceId | №0055 (+ 7 других файлов) |
| raceImmune | №0644 |
| raceLabel | №0635 |
| raceList | №0661 |
| raceName | №0613 (+ 1 других файлов) |
| raceObj | №0813 |
| raceResistant | №0644 |
| races | №0055 (+ 3 других файлов) |
| raceSelect | №0613 (+ 2 других файлов) |
| rad | №0050 (+ 1 других файлов) |
| radial | №0050 |
| radii | №0050 |
| radius | №0047 (+ 5 других файлов) |
| raf | №0615 |
| raging | №0644 |
| raise | №0050 |
| rampage | №0645 |
| randIdx | №0071 |
| random | №1084 |
| randomSequence | №1138 |
| randomValue | №1138 |
| randomXOffset | №0761 |
| randomYOffset | №0761 |
| range | №0630 (+ 6 других файлов) |
| rangedIncoming | №0644 |
| rangeFt | №0800 |
| ranger | №1210 |
| rangeU | №1078 |
| rangeV | №1078 |
| rank | №0644 (+ 2 других файлов) |
| RANKS | №0810 |
| raphe | №0047 |
| rare | №0797 |
| rarity | №0656 (+ 4 других файлов) |
| RARITY | №0788 |
| RARITY_WEIGHT | №0867 |
| rarityOrder | №0782 |
| rate | №0050 (+ 1 других файлов) |
| ratio | №0062 (+ 3 других файлов) |
| rats | №0050 |
| raw | №0049 (+ 32 других файлов) |
| rawCat | №0791 |
| rawItems | №0825 |
| rawParts | №0644 |
| rawRadial | №0051 |
| rawStats | №0782 |
| rawTotal | №0644 |
| rb | №0788 (+ 1 других файлов) |
| rBottom | №0052 |
| rd | №0768 (+ 1 других файлов) |
| rd0 | №0802 |
| re | №0802 (+ 1 других файлов) |
| reach | №0050 |
| reacted | №1117 |
| reaction | №0644 (+ 5 других файлов) |
| reactionButton | №1206 |
| reactionCtx | №0644 (+ 1 других файлов) |
| reactionReduction | №0644 |
| reactionResult | №0644 |
| reactions | №0800 |
| REACTIONS | №0818 |
| read | №0807 (+ 1 других файлов) |
| Readable | №0875 |
| reader | №0821 (+ 2 других файлов) |
| readGlb | №1061 (+ 5 других файлов) |
| readIndex | №1106 (+ 1 других файлов) |
| ready | №0807 (+ 3 других файлов) |
| reagentCount | №0067 |
| reagentGain | №0067 |
| reagentRoll | №0067 |
| reagentsBefore | №1058 |
| reagentTarget | №1058 |
| real | №1295 |
| realAttack | №1125 |
| realCrypto | №1119 |
| realSave | №1131 |
| realSet | №1089 |
| rear | №0050 |
| reason | №0655 (+ 7 других файлов) |
| rebuildMaterialUsage | №0661 |
| rec | №0734 (+ 4 других файлов) |
| receipt | №0063 (+ 1 других файлов) |
| receiptKey | №1089 |
| received | №0791 (+ 2 других файлов) |
| recharge | №0067 (+ 11 других файлов) |
| recipe | №0067 (+ 7 других файлов) |
| recipeId | №0657 |
| recipes | №0656 |
| RECIPES | №0657 (+ 2 других файлов) |
| recipient | №0630 (+ 1 других файлов) |
| record | №0049 (+ 1 других файлов) |
| recorded | №0807 |
| records | №0050 (+ 3 других файлов) |
| recovered | №0654 (+ 1 других файлов) |
| RECOVERY_BY_DURABILITY | №0653 |
| RECOVERY_BY_QUALITY | №0654 |
| red | №0637 |
| reduce | №0860 |
| reduced | №0630 |
| reduction | №0637 |
| ref | №0050 (+ 26 других файлов) |
| reference | №0050 (+ 1 других файлов) |
| referenceNode | №0779 |
| refresh | №0663 |
| refreshBase | №0663 |
| refreshing | №0642 |
| refs | №0069 (+ 3 других файлов) |
| refunded | №0800 |
| reg | №1207 |
| regeneration | №1058 |
| RegExp | №0652 (+ 6 других файлов) |
| region | №0052 (+ 2 других файлов) |
| REGION_MOD | №0788 |
| regionId | №0867 |
| regions | №0048 (+ 4 других файлов) |
| REGIONS | №0867 |
| registered | №1057 (+ 8 других файлов) |
| registry | №0047 (+ 3 других файлов) |
| reject | №0821 (+ 6 других файлов) |
| rejected | №1094 (+ 1 других файлов) |
| rel | №0790 (+ 6 других файлов) |
| relative | №0875 (+ 1 других файлов) |
| release | №1089 |
| releaseGate | №1055 |
| relief | №0067 |
| reliefCount | №0050 |
| reliefResult | №1058 |
| reliefTarget | №1058 |
| reloaded | №1125 |
| relocateGameplayPanels | №0761 |
| rem | №0779 |
| remaining | №0067 (+ 5 других файлов) |
| remainingReduction | №0644 |
| remote | №0640 (+ 2 других файлов) |
| remoteHead | №1056 |
| remoteStatus | №1117 |
| remove | №0052 |
| removeAt | №0067 |
| removed | №0047 (+ 5 других файлов) |
| removedGraft | №0067 |
| removeFromContainer | №0778 |
| render | №0068 (+ 7 других файлов) |
| renderList | №0657 (+ 1 других файлов) |
| renderRecipes | №0661 |
| renderTabs | №0660 |
| renderTools | №0661 |
| rep | №0050 |
| repair | №1091 |
| REPAIR_COST_PER_10 | №0653 |
| REPAIR_PROFILES | №0654 |
| repairBtn | №0782 |
| repairCount | №0653 |
| repaired | №1090 |
| repairPlan | №1090 |
| repCfg | №0050 |
| repeatBtn | №0071 |
| replace | №0630 (+ 1 других файлов) |
| replacement | №1119 |
| report | №0782 (+ 10 других файлов) |
| repSelect | №0052 |
| reptileCoreCache | №0050 |
| reptilePart | №0052 |
| req | №0637 (+ 52 других файлов) |
| reqHtml | №0734 |
| reqR | №0768 |
| reqs | №0775 |
| reqText | №0659 (+ 1 других файлов) |
| request | №0875 (+ 2 других файлов) |
| requested | №0637 (+ 3 других файлов) |
| requestedAoe | №0800 |
| requestedFeature | №0067 |
| requestedForm | №0768 |
| requestId | №0800 |
| requests | №1142 |
| require | №1227 (+ 1 других файлов) |
| required | №0659 (+ 1 других файлов) |
| requiredEnd | №1111 |
| requiredLevel | №0067 (+ 1 других файлов) |
| requireLevel | №0768 |
| requireTool | №0659 |
| reroll | №0637 (+ 3 других файлов) |
| res | №0637 (+ 45 других файлов) |
| resBox | №0636 (+ 2 других файлов) |
| resDiv | №0780 |
| reservation | №0824 |
| reserved | №0800 |
| reset | №0052 (+ 2 других файлов) |
| resetBuffer | №1059 |
| resist | №0839 |
| resistance | №0067 (+ 1 других файлов) |
| resistanceType | №0067 |
| resistanceTypes | №0067 |
| resistant | №0644 |
| resistantFire | №1057 |
| resistantTarget | №1138 |
| resisted | №1138 |
| resMap | №0637 |
| resolve | №0821 (+ 8 других файлов) |
| resolved | №0057 (+ 1 других файлов) |
| resolvedParts | №0644 |
| resource | №0772 (+ 2 других файлов) |
| RESOURCE_HINTS | №0814 |
| RESOURCE_PROCESSING | №0815 |
| RESOURCE_YIELDS | №0815 |
| resourceBefore | №1138 |
| resourceDefs | №0816 |
| resourceId | №0814 |
| resourceKind | №0800 |
| resources | №0867 (+ 1 других файлов) |
| response | №0831 (+ 3 других файлов) |
| responses | №1088 (+ 1 других файлов) |
| rest | №0768 (+ 2 других файлов) |
| restarted | №1089 |
| rested | №1129 |
| restId | №0810 (+ 1 других файлов) |
| restored | №0637 (+ 13 других файлов) |
| restoredShort | №0636 |
| restoredUse | №1058 |
| restoreFullCheckbox | №0689 |
| restoreUsed | №0067 |
| restStr | №0825 |
| result | №0050 (+ 63 других файлов) |
| resultPending | №0800 |
| results | №0054 (+ 10 других файлов) |
| resultText | №0636 (+ 1 других файлов) |
| resume | №0800 (+ 1 других файлов) |
| resumed | №0807 (+ 1 других файлов) |
| resumedStand | №1117 |
| resumeSpell | №0800 |
| retries | №0810 |
| retry | №0832 |
| returned | №1117 |
| returnedDash | №1117 |
| reused | №0878 |
| rev | №0800 |
| reveal | №0808 |
| reverse | №0051 |
| revision | №0642 (+ 2 других файлов) |
| revival | №1057 |
| revived | №1058 |
| revivedFromZero | №0644 |
| reward | №0659 (+ 4 других файлов) |
| rewardId | №0810 |
| rewards | №0659 |
| rewardX | №0808 |
| rewardY | №0808 |
| rgb | №0052 |
| rht | №0768 |
| ri | №1107 |
| rid | №0860 (+ 2 других файлов) |
| rider | №0827 |
| ridge | №1081 |
| RIDGE_STYLES | №0055 |
| ridges | №0050 |
| ridgeSelect | №0052 |
| ridgeStyle | №1286 |
| right | №0050 (+ 4 других файлов) |
| rigid | №1063 |
| ring | №0047 (+ 1 других файлов) |
| ringCount | №0047 |
| rings | №0051 |
| rise | №0051 (+ 2 других файлов) |
| risk | №0068 (+ 1 других файлов) |
| rite | №0630 (+ 2 других файлов) |
| riteId | №0768 |
| riteKnown | №0802 |
| riteMax | №0768 |
| riteNames | №0630 |
| rites | №0768 (+ 1 других файлов) |
| riteTypes | №0630 |
| rl | №0050 |
| rm | №0644 (+ 1 других файлов) |
| rn | №0802 |
| rn0 | №0802 |
| rn2 | №0802 |
| ro | №1203 |
| robe | №0050 |
| rock | №0052 |
| rogue | №1126 (+ 3 других файлов) |
| role | №0050 (+ 3 других файлов) |
| roleName | №0618 |
| roles | №0662 |
| roll | №0063 (+ 18 других файлов) |
| rolled | №0067 (+ 7 других файлов) |
| rolledRelief | №1058 |
| roller | №0794 (+ 1 других файлов) |
| rollMode | №0636 |
| rollResult | №1138 |
| rolls | №0636 (+ 9 других файлов) |
| rollTypeClass | №0761 (+ 1 других файлов) |
| roofColor | №0052 |
| room | №0805 |
| root | №0050 (+ 97 других файлов) |
| ROOT | №0652 (+ 10 других файлов) |
| rootId | №0842 (+ 1 других файлов) |
| roots | №0050 (+ 4 других файлов) |
| rootSurface | №0047 |
| rootT | №0050 |
| rootY | №0050 |
| rootZ | №0050 |
| roster | №0640 (+ 1 других файлов) |
| rotation | №0052 |
| rough | №0809 (+ 1 других файлов) |
| round | №0794 (+ 1 других файлов) |
| round4 | №1294 |
| rounds | №0822 |
| roundTracker | №0644 |
| roundTrip | №1060 |
| route | №1257 (+ 1 других файлов) |
| routed | №0637 |
| row | №0050 (+ 12 других файлов) |
| rows | №0050 (+ 11 других файлов) |
| ROWS | №0617 |
| rp | №1153 |
| rq | №1204 (+ 1 других файлов) |
| rr | №0050 (+ 8 других файлов) |
| rs | №0630 (+ 2 других файлов) |
| rt | №0637 (+ 1 других файлов) |
| rTop | №0052 |
| rule | №0052 (+ 11 других файлов) |
| rules | №0689 (+ 7 других файлов) |
| RULES | №0810 |
| run | №0062 (+ 2 других файлов) |
| ruName | №0689 (+ 1 других файлов) |
| rune | №0768 (+ 1 других файлов) |
| RUNEKEEPER_INSCRIBED | №0768 |
| runesBefore | №1148 |
| running | №0642 |
| runtime | №0792 (+ 33 других файлов) |
| runtimeFeatures | №0802 |
| runtimes | №0637 |
| runtimeSubclasses | №0802 |
| rw | №1294 |
| rx | №0050 (+ 4 других файлов) |
| rx2 | №0800 |
| ry | №0050 (+ 3 других файлов) |
| rz | №0050 (+ 3 других файлов) |
| rz2 | №0062 |
| s | №0047 (+ 173 других файлов) |
| S | №0061 (+ 1 других файлов) |
| s1 | №0689 |
| s2 | №0689 |
| sa | №0050 |
| safe | №0072 (+ 1 других файлов) |
| SAFE_FILE | №0878 |
| safeFeatureId | №0637 |
| safeGet | №0780 |
| safeName | №0643 |
| safeText | №0761 |
| salty | №1138 |
| saltyDC | №0768 |
| saltyEffect | №0637 |
| saltyHero | №1138 |
| saltyMods | №1138 |
| saltySave | №0768 |
| saltyTarget | №1138 |
| sam | №0057 |
| same | №0654 (+ 8 других файлов) |
| sample | №0050 (+ 4 других файлов) |
| sampleCount | №1111 |
| sampler | №0052 (+ 2 других файлов) |
| samples | №0050 (+ 1 других файлов) |
| sandbox | №1188 (+ 6 других файлов) |
| satin | №0052 |
| savage | №0768 |
| savantFlourish | №0644 |
| savantHP | №1148 |
| save | №0063 (+ 12 других файлов) |
| saveAdv | №0644 |
| saved | №0072 (+ 49 других файлов) |
| savedAlpha | №0821 |
| savedBg | №0857 |
| saveDC | №0630 |
| savedColor | №0857 |
| savedDim | №0857 |
| saveDebuffs | №0644 |
| savedFont | №0821 |
| savedHeritage | №1259 |
| saveDis | №0644 |
| savedOpacity | №0857 |
| savedRetreat | №1117 |
| savedSmall | №1259 |
| savedSurface | №1259 |
| savedTarget | №1145 |
| savedTheme | №0821 |
| savedWander | №1117 |
| saveResult | №0644 |
| saveRoll | №0773 (+ 2 других файлов) |
| saves | №0682 (+ 3 других файлов) |
| savesBeforeRefresh | №1119 |
| saveStat | №0768 |
| sb | №0659 (+ 2 других файлов) |
| sc | №0057 (+ 8 других файлов) |
| scale | №0047 (+ 11 других файлов) |
| scaled | №0052 |
| scalpBuckets | №0050 |
| scalpCache | №0050 |
| scalpSamples | №0050 |
| scene | №0058 (+ 3 других файлов) |
| scenes | №0052 |
| scheduleUpdate | №0781 |
| SCHEMA_VERSION | №0631 (+ 2 других файлов) |
| schoolDamageTarget | №1138 |
| schoolHero | №1138 |
| schoolSave | №1138 |
| schoolText | №0825 |
| scLower | №0825 |
| scoped | №0637 |
| score | №0050 (+ 8 других файлов) |
| scores | №0675 (+ 3 других файлов) |
| scoreSnapshots | №0067 |
| scout | №1113 |
| screen | №0804 (+ 1 других файлов) |
| script | №1056 |
| scripts | №1099 (+ 1 других файлов) |
| sctx | №1228 |
| sd | №0644 (+ 1 других файлов) |
| se | №0854 |
| sealDamage | №0687 |
| sealedHp | №1146 |
| seals | №0687 (+ 2 других файлов) |
| sealTarget | №1146 |
| seam | №0050 (+ 3 других файлов) |
| seamDamage | №1057 |
| seamGroups | №0047 |
| seamMax | №1061 (+ 1 других файлов) |
| seams | №0050 |
| searchInput | №0825 |
| searchVal | №0825 |
| second | №0807 (+ 1 других файлов) |
| secondary | №0050 |
| secondDead | №1058 |
| secondOpts | №0807 |
| seconds | №0807 |
| section | №0051 |
| seed | №0050 (+ 1 других файлов) |
| seekingAttack | №1058 |
| seen | №0063 (+ 6 других файлов) |
| seenEventIds | №0799 |
| seenNames | №0734 |
| seer | №1117 |
| seg | №0050 |
| segments | №0047 (+ 3 других файлов) |
| sel | №0635 (+ 5 других файлов) |
| select | №0052 (+ 6 других файлов) |
| selected | №0047 (+ 25 других файлов) |
| selected0 | №0650 (+ 1 других файлов) |
| selectedArmorCategory | №0780 |
| selectedAsset | №0059 |
| selectedBg | №0613 (+ 1 других файлов) |
| selectedChar | №0820 |
| selectedClass | №0613 (+ 2 других файлов) |
| selectedClassKey | №0689 |
| selectedClassName | №0689 |
| selectedClothes | №1257 |
| selectedFeatSelect | №0689 |
| selectedId | №0813 |
| selectedIds | №0702 |
| selectedNatural | №0067 |
| selectedRace | №0613 (+ 1 других файлов) |
| selectedSub | №0650 |
| selectedTarget | №0808 |
| selectedTrader | №0790 |
| selectedWeaponCategoryType | №0780 |
| selectedWeaponDice | №0780 |
| selectedWeaponProperties | №0780 |
| selectEl | №0780 |
| selectElem | №0785 |
| selector | №0781 |
| selectors | №0829 |
| selectScreen | №0613 (+ 1 других файлов) |
| selectType | №0780 |
| self | №0768 |
| selfActor | №0642 |
| sellFactor | №0789 |
| sellResult | №1153 |
| SEMVER | №0878 |
| send | №0875 |
| sent | №1196 (+ 7 других файлов) |
| sep | №0047 |
| seq | №0772 (+ 4 других файлов) |
| sequence | №1125 |
| serial | №1141 (+ 1 других файлов) |
| server | №1089 (+ 39 других файлов) |
| Server | №1117 (+ 1 других файлов) |
| session | №0049 (+ 4 других файлов) |
| SESSION | №0642 |
| set | №0778 (+ 2 других файлов) |
| Set | №0652 (+ 14 других файлов) |
| setInterval | №1183 (+ 5 других файлов) |
| setTimeout | №1090 (+ 35 других файлов) |
| settings | №0640 (+ 2 других файлов) |
| settingsPanel | №0821 |
| settled | №0809 |
| sf | №0637 (+ 1 других файлов) |
| sh | №0773 |
| sha | №1240 (+ 3 других файлов) |
| shader | №1083 |
| shaft | №0047 |
| shaftSources | №0047 |
| shape | №0047 (+ 2 других файлов) |
| shaped | №1081 |
| shapeInput | №0052 |
| shapes | №0048 (+ 1 других файлов) |
| shared | №0068 (+ 2 других файлов) |
| sharedAbility | №0067 |
| sharedAliases | №0067 |
| sharedMutagen | №1058 |
| sharedSnapshots | №0067 |
| sharp | №0050 |
| shaved | №0052 |
| sheer | №0052 |
| sheetScreen | №0613 (+ 1 других файлов) |
| shell | №0773 (+ 1 других файлов) |
| shellIX | №0050 |
| shellN | №0050 |
| shellP | №0050 |
| shellUV | №0050 |
| shield | №0644 (+ 3 других файлов) |
| shieldAccess | №0658 |
| shieldAvailable | №0637 |
| shieldBonus | №0782 |
| shielded | №0800 (+ 1 других файлов) |
| shieldRoll | №0644 |
| shieldSlot | №0637 |
| shieldSpent | №0637 |
| shipped | №1102 |
| shirt | №1068 |
| short | №0630 (+ 3 других файлов) |
| shortage | №0654 |
| shortKeys | №0775 (+ 1 других файлов) |
| shortToFull | №0689 |
| shot | №1126 (+ 1 других файлов) |
| shoulder | №0050 (+ 1 других файлов) |
| shoulderSpan | №0050 |
| shouldRestoreFull | №0689 |
| shouldUpdate | №0781 |
| showEP | №0779 |
| showPP | №0779 |
| shuffleBtn | №0071 |
| shutdownCalls | №1230 |
| si | №0050 (+ 3 других файлов) |
| side | №0048 (+ 6 других файлов) |
| sideIndex | №0050 |
| sides | №0052 (+ 11 других файлов) |
| sIdx | №0635 |
| sig | №0800 (+ 1 других файлов) |
| sightHero | №1117 |
| sign | №0054 (+ 2 других файлов) |
| signatures | №1065 (+ 5 других файлов) |
| signed | №0050 |
| signup | №0640 |
| sigTarget | №1138 |
| sigUses | №0800 |
| sin | №0047 |
| single | №0825 |
| singleBox | №0799 |
| singleWeightKg | №0781 |
| size | №0050 (+ 10 других файлов) |
| sizes | №0822 (+ 1 других файлов) |
| sk | №0761 |
| sKey | №0613 |
| skill | №0063 (+ 5 других файлов) |
| SKILL_STAT | №0797 |
| SKILL_TO_VAR_MAP | №0761 |
| skilledDesc | №0652 |
| skillId | №0613 (+ 4 других файлов) |
| skillName | №0761 |
| skillNameRu | №0613 |
| skills | №0613 (+ 3 других файлов) |
| SKILLS_CONFIG | №0072 |
| skillsConfig | №0761 |
| skillsDataObj | №0761 |
| skillsList | №0761 |
| skillsListContainer | №0811 |
| skillsPanel | №0811 (+ 1 других файлов) |
| skillsStr | №0613 (+ 1 других файлов) |
| skillStr | №0613 (+ 1 других файлов) |
| skin | №0048 (+ 5 других файлов) |
| skinBaseline | №1259 |
| skinColorEntry | №0052 |
| skinImages | №1059 |
| skinned | №1073 |
| skinnedPrimitives | №1100 (+ 1 других файлов) |
| skins | №0055 (+ 2 других файлов) |
| skip | №0050 (+ 1 других файлов) |
| skipped | №1126 |
| skirt | №1070 |
| skirtDepth | №0051 |
| skull | №0050 (+ 2 других файлов) |
| sky | №0062 |
| sl | №0050 (+ 6 других файлов) |
| sleep | №1117 |
| sleeve | №0051 |
| sleeveMasks | №0051 |
| sleeves | №0051 (+ 1 других файлов) |
| slices | №0050 |
| slider | №0052 |
| slimeAcid | №1057 |
| slimeAttacker | №1057 |
| slimeBombAttack | №1058 |
| slimeBomber | №1058 |
| slimeHit | №1057 |
| slimeResistantTarget | №1057 |
| slimeVictim | №1057 |
| slot | №0048 (+ 15 других файлов) |
| SLOT_LEVEL | №0833 |
| slot2 | №0768 |
| slot3 | №0768 |
| slot4 | №0768 |
| slotBefore | №1146 |
| slotData | №0825 |
| slotHtml | №0825 |
| slotLevel | №0768 |
| slotMax | №0802 |
| slotRowHtml | №0825 |
| slots | №0051 (+ 12 других файлов) |
| SLOTS | №0066 (+ 2 других файлов) |
| slotsBefore | №1148 |
| slotSnapshot | №0800 |
| sm | №0644 (+ 4 других файлов) |
| small | №0800 |
| smitePart | №0644 |
| smoke | №0832 |
| smooth | №0050 |
| sn | №0050 |
| snake | №0807 |
| snakeId | №1117 |
| snap | №0067 (+ 5 других файлов) |
| snapshot | №0049 (+ 6 других файлов) |
| snapshots | №0644 |
| snout | №0050 |
| sorted | №0782 |
| SOTDQ | №0620 |
| source | №0047 (+ 39 других файлов) |
| SOURCE | №0067 (+ 13 других файлов) |
| SOURCE_TAG | №0659 (+ 1 других файлов) |
| sourceArmor | №0782 |
| sourceCache | №0842 |
| sourceCheck | №0800 |
| sourceCount | №0815 |
| sourceGroups | №0689 |
| sourceHashes | №1244 (+ 1 других файлов) |
| sourceHtml | №0825 |
| sourceId | №0645 |
| sourceManifestUrl | №0831 |
| sourceMax | №1108 |
| sourceMean | №1108 |
| sourceMeshCount | №0052 |
| sources | №0630 (+ 10 других файлов) |
| sourceStats | №0805 |
| sourceTag | №0734 |
| sourceToken | №0645 |
| sourceWeapons | №0800 |
| sp | №0058 (+ 9 других файлов) |
| span | №0047 (+ 3 других файлов) |
| spanCurrent | №0769 |
| spanTotal | №0769 |
| sparks | №0832 |
| sparse | №1098 (+ 1 других файлов) |
| sparseJson | №1098 |
| spawn | №1088 |
| spd | №0617 (+ 3 других файлов) |
| spear | №0658 |
| spec | №0646 (+ 7 других файлов) |
| specHtml | №0659 |
| specialBombEffects | №0067 |
| SPECIALIZATIONS | №0659 |
| specId | №0659 |
| species | №0828 |
| specificClass | №0689 |
| specificProf1 | №0812 |
| specificProf2 | №0812 |
| specificProf3 | №0812 |
| specificSources | №0734 |
| specs | №0659 |
| spectral | №0052 |
| speed | №0645 (+ 3 других файлов) |
| speedInput | №0813 |
| speedVal | №0813 |
| spell | №0637 (+ 7 других файлов) |
| spellbladeDeflection | №0644 |
| spellbladeOnly | №0816 |
| SPELLCASTING_CLASSES | №0825 |
| spellcastingCard | №0825 |
| spellClass | №0825 |
| spellDamageMods | №0800 (+ 1 других файлов) |
| spellDesc | №0825 |
| spellId | №0808 |
| spellLevel | №0637 (+ 4 других файлов) |
| spellList | №0066 (+ 1 других файлов) |
| spellName | №0792 (+ 4 других файлов) |
| spellNameEscaped | №0825 |
| spellObj | №0825 |
| spellPayload | №0800 |
| spellReaction | №0800 |
| spells | №0792 (+ 4 других файлов) |
| SPELLS_KNOWN | №0066 |
| spellsByLevel | №0792 |
| spellsHtml | №0825 |
| spellSourcesNow | №0816 |
| spent | №0613 (+ 11 других файлов) |
| spentLevel | №0637 |
| sPerG | №0779 |
| spine | №0050 |
| spInput | №0779 |
| spiritAttacks | №0773 |
| spiritAuto | №1138 |
| spiritHp | №0768 |
| spiritMax | №0768 |
| spiritRestored | №0768 |
| spirits | №0833 |
| splay | №0050 |
| spread | №0050 |
| spVal | №0779 |
| sq | №0050 |
| squares | №1083 |
| squircle | №0050 |
| sr | №0637 (+ 6 других файлов) |
| src | №0048 (+ 34 других файлов) |
| srcA | №0825 |
| srcALower | №0825 |
| srcB | №0825 |
| srcBLower | №0825 |
| ss | №0644 (+ 1 других файлов) |
| st | №0050 (+ 7 других файлов) |
| stability | №0068 (+ 1 других файлов) |
| stableFound | №1239 |
| stableLegacy | №1239 |
| stack | №0653 (+ 1 других файлов) |
| stageCount | №1239 |
| staged | №1093 (+ 2 других файлов) |
| STAGED_KEY | №0831 |
| stageManifestUrl | №0831 |
| stairs | №0065 (+ 1 других файлов) |
| stale | №1226 (+ 2 других файлов) |
| stalker | №1213 |
| stance | №0768 |
| STAND_TURN_FLAGS | №0807 |
| standard | №1084 |
| standardRaceIds | №1237 |
| standing | №1117 |
| standPC | №1117 |
| standPhone | №1117 |
| standRoster | №1117 |
| standServer | №1117 |
| start | №0050 (+ 12 других файлов) |
| started | №0772 (+ 1 других файлов) |
| startI | №1107 (+ 1 других файлов) |
| startingProfession | №0635 |
| startupRun | №0831 |
| startVol | №0071 |
| startY | №0051 |
| stat | №0063 (+ 13 других файлов) |
| STAT_ALIASES | №0816 |
| STAT_META | №0858 |
| STAT_NAMES | №0632 |
| stat2 | №0689 |
| statBonus | №0734 |
| statBonusKeys | №0734 |
| state | №0048 (+ 43 других файлов) |
| statElem | №0825 |
| stateOnly | №1242 |
| states | №0828 |
| statId | №0613 (+ 2 других файлов) |
| statKey | №0613 (+ 6 других файлов) |
| statKeysMap | №0689 |
| statMod | №0636 (+ 2 других файлов) |
| statName | №0761 |
| statNames | №0613 (+ 1 других файлов) |
| statNameShort | №0761 |
| statNamesShort | №0613 (+ 1 других файлов) |
| statOptions | №0636 (+ 1 других файлов) |
| stats | №0775 (+ 11 других файлов) |
| STATS | №0632 |
| STATS_CONFIG | №0072 |
| statsConfig | №0761 |
| statSelect | №0643 |
| statsGrid | №0761 |
| statsList | №0636 |
| status | №0821 (+ 8 других файлов) |
| STATUS | №0649 |
| statusClass | №0649 |
| statusEl | №0071 |
| statusPC | №1117 |
| statusPhone | №1117 |
| statusServer | №1117 |
| statusText | №0761 (+ 1 других файлов) |
| steel | №0052 |
| stem | №0056 (+ 2 других файлов) |
| stems | №1244 |
| stench | №1058 |
| stenchTarget | №1058 |
| step | №0050 (+ 5 других файлов) |
| steps | №0062 (+ 2 других файлов) |
| stepTime | №0071 |
| sternumSpan | №0050 |
| stock | №0789 |
| stone | №0860 |
| stop | №0645 |
| stopped | №0809 |
| storage | №0642 (+ 3 других файлов) |
| STORAGE_KEY | №0655 (+ 2 других файлов) |
| store | №1066 (+ 5 других файлов) |
| stored | №1198 |
| str | №0781 (+ 12 других файлов) |
| strand | №0050 |
| strap | №0051 |
| stream | №0878 |
| strength | №0781 |
| strenuous | №0814 |
| stride | №0051 (+ 9 других файлов) |
| strikeHP | №1147 |
| String | №0652 (+ 23 других файлов) |
| strInput | №0781 |
| stripped | №0800 |
| strMod | №0761 |
| structureBlast | №1057 |
| structureTarget | №1057 |
| studied | №0768 (+ 1 других файлов) |
| style | №0050 (+ 7 других файлов) |
| STYLE_ID | №0832 |
| styleEl | №0782 |
| styles | №0768 (+ 5 других файлов) |
| styleTag | №0821 (+ 1 других файлов) |
| sub | №0063 (+ 9 других файлов) |
| subByName | №0784 |
| subclass | №1099 (+ 3 других файлов) |
| SUBCLASS_FEATURES | №0637 |
| SUBCLASS_MAP | №0637 |
| subclasses | №0630 (+ 6 других файлов) |
| subclassHtml | №0689 |
| subclassLevel | №0767 |
| subclassName | №0702 (+ 1 других файлов) |
| subclassPacks | №0860 |
| subclassResult | №1058 |
| subclassSelect | №0689 |
| subData | №0702 |
| subFeatures | №0784 |
| subId | №0067 |
| subIds | №0861 |
| subject | №0807 |
| subOptionsHtml | №0689 |
| subpacks | №0067 |
| subs | №0067 (+ 2 других файлов) |
| SUBS | №0810 (+ 1 других файлов) |
| subVal | №0769 |
| success | №0063 (+ 6 других файлов) |
| suffix | №0650 |
| suit | №0808 (+ 3 других файлов) |
| suite | №0843 (+ 1 других файлов) |
| SUITS | №0810 |
| sum | №0047 (+ 16 других файлов) |
| summary | №0052 (+ 10 других файлов) |
| summonX | №0808 |
| summonY | №0808 |
| sums | №0050 (+ 2 других файлов) |
| sumSq | №1107 |
| sUp | №0734 |
| supernatural | №0768 |
| supportedSave | №1148 |
| suppressBodyHP | №0636 |
| surface | №0050 (+ 2 других файлов) |
| surfaceDiagnostics | №1259 |
| surfaceKind | №0052 |
| surfaceSelect | №0052 |
| surfaceUrl | №0052 |
| surge | №1136 (+ 1 других файлов) |
| surprised | №0637 |
| sv | №0058 (+ 6 других файлов) |
| sv2 | №0768 |
| swap | №0810 |
| swapped | №1117 |
| swarm | №0052 |
| swarmForm | №0052 |
| swarmLimits | №0055 |
| swarmMotion | №0052 |
| swift | №0768 |
| swiperContainer | №0811 (+ 1 других файлов) |
| sx | №0050 (+ 3 других файлов) |
| sy | №0050 (+ 3 других файлов) |
| synapse | №1058 |
| synapseInstall | №1058 |
| synapseRecord | №0067 |
| sync | №0876 |
| syncRequested | №0799 |
| synergies | №0068 (+ 1 других файлов) |
| SYNERGY | №0068 |
| synergySet | №0068 |
| sys | №0052 (+ 18 других файлов) |
| sz | №0050 (+ 3 других файлов) |
| t | №0047 (+ 103 других файлов) |
| T | №0047 (+ 2 других файлов) |
| t2 | №0802 |
| ta | №0768 |
| tab | №0059 (+ 4 других файлов) |
| tabButtons | №0782 |
| table | №0630 (+ 6 других файлов) |
| tabs | №0660 |
| tabsContainer | №0782 |
| tabsNav | №0857 |
| tabsWrapper | №0782 |
| tacticalBack | №1117 |
| tacticalPC | №1117 |
| tacticalPhone | №1117 |
| tacticalRoster | №1117 |
| tacticalServer | №1117 |
| tactics | №0861 |
| tag | №0050 (+ 15 других файлов) |
| tagOk | №0791 |
| tags | №0050 (+ 9 других файлов) |
| tail | №0050 |
| tailEnd | №0050 |
| tailRoot | №0050 |
| take | №0630 (+ 7 других файлов) |
| takeFromContainer | №0778 |
| taken | №0063 |
| tal | №0768 |
| tampered | №1234 |
| tangent | №0050 |
| taper | №0050 (+ 1 других файлов) |
| tapLength | №0786 |
| target | №0047 (+ 48 других файлов) |
| targetActor | №0807 |
| targetChar | №0820 |
| targetCharId | №0820 |
| targetClass | №0775 (+ 1 других файлов) |
| targetClasses | №0644 |
| targetClassesForSlime | №0644 |
| targetContent | №0782 |
| targetCopy | №0810 |
| targetGrafts | №0644 |
| targetGrappled | №0768 |
| targetH | №0062 |
| targetHasArmor | №0644 |
| targetId | №0645 (+ 6 других файлов) |
| targetIsPugilist | №0644 |
| targetLabels | №1038 |
| targetLevel | №0689 (+ 1 других файлов) |
| targetList | №0645 |
| targetLvl | №0821 |
| targetMeshIndex | №1097 |
| targetName | №0645 |
| targetParent | №0779 |
| targetPath | №1097 (+ 3 других файлов) |
| targetPrim | №1097 |
| targetPrimIndex | №1097 |
| targetProfId | №0812 (+ 1 других файлов) |
| targetProgress | №0832 |
| targetReports | №1109 |
| targetResistances | №0644 |
| targets | №0050 (+ 9 других файлов) |
| targetSnapshot | №0807 |
| targetTok | №0645 |
| targetToken | №0645 |
| targetType | №0802 |
| targetVol | №0071 |
| targetW | №0062 |
| tarot | №0644 (+ 1 других файлов) |
| tarotAC | №0644 |
| tarotActor | №0761 |
| tarotAdv | №0644 |
| tarotCast | №0824 |
| tarotCheck | №0800 |
| tarotDis | №0644 |
| tarotFactor | №0644 |
| tarotForced | №0644 |
| tarotIgnoresResistance | №0644 |
| tarotInitiative | №0762 |
| tarotMod | №0644 |
| tarotOwner | №0762 |
| tarotReroll | №0644 |
| tarotRound | №0772 |
| tarotSave | №0644 |
| tarotScene | №0644 |
| tarotTurnId | №0762 |
| TASKS | №0847 |
| tb | №0797 |
| tc | №0768 (+ 1 других файлов) |
| team | №0800 |
| teeth | №0050 |
| teleportAllyId | №0808 |
| teleportX | №0808 |
| teleportY | №0808 |
| temp | №0644 (+ 6 других файлов) |
| TEMPER | №0790 |
| tempHp | №0768 |
| template | №0644 (+ 1 других файлов) |
| term | №1103 |
| terms | №1103 (+ 2 других файлов) |
| terror | №0050 |
| test | №0832 (+ 2 других файлов) |
| testDir | №1295 |
| testRecipe | №1090 |
| tests | №1241 |
| tets | №0050 |
| tex | №0051 (+ 2 других файлов) |
| text | №0052 (+ 26 других файлов) |
| textColor | №0761 |
| TextDecoder | №1061 (+ 21 других файлов) |
| textSpan | №0761 |
| texture | №0058 (+ 3 других файлов) |
| th | №0062 (+ 1 других файлов) |
| theftRef | №0808 |
| theme | №0821 |
| themed | №0662 |
| themeKey | №0821 |
| themeSelect | №0821 |
| theta | №0047 (+ 1 других файлов) |
| thick | №1257 |
| thickness | №0050 |
| thigh | №0048 |
| thin | №1257 |
| THIRD_CASTERS | №0816 |
| THR | №0798 |
| thresholds | №0794 (+ 1 других файлов) |
| THRESHOLDS | №0794 |
| thumbDir | №0050 |
| thumbEnd | №0050 |
| thumbRoot | №0050 |
| thumbs | №0857 |
| thumbSide | №0050 |
| ti | №0050 (+ 3 других файлов) |
| tick | №0800 |
| tid | №0645 |
| tie | №1060 |
| tier | №0654 |
| tile | №0051 |
| time | №0057 (+ 4 других файлов) |
| timedHero | №1058 |
| timeout | №0642 (+ 1 других файлов) |
| timer | №0642 (+ 3 других файлов) |
| timers | №1089 |
| times | №0057 |
| timeSpan | №0761 |
| timeStr | №0779 |
| timeString | №0761 |
| tint | №0052 |
| tiny | №1147 |
| tip | №0047 (+ 1 других файлов) |
| tipSelect | №0052 |
| title | №0052 (+ 7 других файлов) |
| titleEl | №0781 (+ 1 других файлов) |
| titleElem | №0785 (+ 1 других файлов) |
| titleText | №0825 |
| tl | №0047 (+ 1 других файлов) |
| tm | №0761 (+ 1 других файлов) |
| tmax | №0062 |
| tmin | №0062 |
| tmp | №0878 |
| tn | №1100 (+ 1 других файлов) |
| to | №0621 (+ 3 других файлов) |
| toggle | №0655 |
| toggleContainer | №0778 |
| tok | №0645 (+ 2 других файлов) |
| token | №0642 (+ 3 других файлов) |
| tokens | №0056 (+ 1 других файлов) |
| tool | №0625 (+ 10 других файлов) |
| TOOL_IDS | №0657 |
| TOOL_LABELS | №0657 |
| toolbar | №0778 |
| toolBox | №0808 |
| toolId | №0797 |
| toolLabel | №0808 |
| toolMatrix | №0661 |
| toolOk | №0867 |
| toolProficient | №0808 |
| tools | №0070 (+ 5 других файлов) |
| TOOLS | №0661 |
| toolsStr | №0613 (+ 1 других файлов) |
| toolStat | №0808 |
| toolStr | №0635 |
| toolText | №0808 |
| tooth | №0050 |
| toothColor | №1259 |
| toothPart | №0050 |
| top | №0047 (+ 5 других файлов) |
| topology | №1073 |
| topRow | №0782 |
| torso | №0050 (+ 1 других файлов) |
| total | №0050 (+ 35 других файлов) |
| totalAtk | №0825 |
| totalAttack | №0636 |
| totalAttackBonus | №0761 |
| totalCopper | №0779 |
| totalCurrentLevel | №0689 |
| totalDamage | №0636 |
| totalDiceDamage | №0636 |
| totalGain | №0689 |
| totalLevel | №0689 (+ 1 других файлов) |
| totalMod | №0761 |
| totalObjects | №0060 |
| totals | №0642 (+ 1 других файлов) |
| totalSkillMod | №0823 |
| totalSum | №0761 (+ 1 других файлов) |
| totalWeight | №0778 |
| totalWeightKg | №0781 (+ 1 других файлов) |
| totalWeightLb | №0781 |
| totalZones | №0060 |
| totem | №0637 |
| touched | №0800 |
| touchHp | №0802 |
| toxic | №1058 |
| toxicDC | №0067 |
| toxicSave | №0067 |
| toxicTarget | №0067 (+ 1 других файлов) |
| tp | №0800 |
| tr | №0802 (+ 1 других файлов) |
| track | №0071 |
| tracker | №0067 (+ 5 других файлов) |
| trackNameEl | №0071 |
| TRADE_KEY | №0791 |
| traderId | №0788 (+ 2 других файлов) |
| TRADERS | №0788 |
| traditionActions | №0802 |
| traditions | №0802 |
| trained | №1119 (+ 1 других файлов) |
| transfer | №1097 |
| transformed | №1106 (+ 1 других файлов) |
| transforms | №0054 |
| translated | №0056 (+ 1 других файлов) |
| transported | №1117 |
| transpose | №1059 |
| travelling | №1117 |
| tri | №0047 (+ 3 других файлов) |
| triangleHits | №1108 |
| triangles | №0050 (+ 5 других файлов) |
| trick | №0808 |
| TRICK_FEATURES | №0810 |
| trickster | №1117 |
| triggerCustomCreation | №0780 |
| TRIGGERS | №0807 |
| tris | №0050 |
| true | №0768 (+ 3 других файлов) |
| trunk | №0050 |
| ts | №0800 (+ 1 других файлов) |
| tt | №0062 (+ 2 других файлов) |
| tTok | №0644 |
| tu | №1209 (+ 1 других файлов) |
| tuft | №0050 |
| tufts | №0050 |
| turn | №0768 (+ 2 других файлов) |
| turned | №0637 |
| turnId | №0772 (+ 1 других файлов) |
| turnKey | №0768 |
| turnOne | №1057 |
| turnTwo | №1057 |
| tusks | №0050 |
| tw | №0062 |
| two | №1132 |
| tx | №0058 (+ 4 других файлов) |
| txt | №0811 (+ 2 других файлов) |
| typ | №0768 (+ 1 других файлов) |
| type | №0047 (+ 59 других файлов) |
| typeCount | №1109 |
| typedExtraTotal | №0644 |
| types | №0822 (+ 3 других файлов) |
| TYPES | №0789 |
| typeSelect | №0780 |
| u | №0047 (+ 16 других файлов) |
| U | №0047 |
| ub | №0062 |
| ui | №0831 (+ 1 других файлов) |
| uiColorOptions | №0857 |
| uid | №1088 |
| uiFreeGather | №0814 |
| uiGather | №0814 |
| uiMix | №0068 |
| Uint16Array | №1059 (+ 22 других файлов) |
| Uint32Array | №1059 (+ 27 других файлов) |
| Uint8Array | №1061 (+ 22 других файлов) |
| ul | №0050 |
| unacted | №0637 |
| unarmoredBase | №0644 |
| unbreakable | №1138 |
| unbreakableHero | №1138 |
| uncouthId | №0768 |
| uncouthTargets | №0768 |
| undead | №1209 |
| undeadFocus | №0644 |
| undo | №0637 |
| unescape | №1196 (+ 2 других файлов) |
| unique | №0051 (+ 1 других файлов) |
| uniqueFeatsMap | №0689 |
| uniqueMap | №0825 |
| uniqueSuffix | №0780 |
| unit | №0050 (+ 4 других файлов) |
| units | №0821 |
| unknown | №1081 (+ 2 других файлов) |
| unrelated | №1125 (+ 1 других файлов) |
| untrained | №1132 |
| up | №0050 (+ 1 других файлов) |
| update | №0663 (+ 2 других файлов) |
| updateCloudStatus | №0821 |
| updated | №0734 |
| updateListeners | №0876 |
| updater | №0875 (+ 2 других файлов) |
| updateRun | №0831 |
| updateScheduled | №0781 |
| uploadImage | №0052 |
| uploads | №1059 |
| upper | №0048 (+ 5 других файлов) |
| upperSnout | №0050 |
| upTo | №0702 |
| uri | №0058 |
| url | №0052 (+ 40 других файлов) |
| URL | №1089 |
| urlPath | №0878 |
| usage | №0052 |
| use | №0654 |
| useBtn | №0782 |
| used | №0630 (+ 9 других файлов) |
| usedBy | №0662 |
| usedCombat | №0800 |
| usedCount | №0643 |
| usedVal | №0825 |
| useFeature | №0798 |
| useFur | №0052 |
| useReptile | №0052 |
| userProfsIds | №0782 |
| uses | №0637 (+ 3 других файлов) |
| USES | №0792 |
| usesHtml | №0643 |
| useSkinMicro | №0052 |
| utilityArmor | №1117 |
| utilityBack | №1117 |
| utilityBerry | №1117 |
| utilityDash | №1117 |
| utilityPC | №1117 |
| utilityPhone | №1117 |
| utilityRoster | №1117 |
| utilityServer | №1117 |
| uv | №0047 (+ 6 других файлов) |
| uvAnchor | №0047 |
| uvDet | №0047 |
| uvFit | №0047 |
| ux | №0050 |
| uy | №0050 |
| uz | №0050 |
| v | №0048 (+ 150 других файлов) |
| V | №0047 (+ 1 других файлов) |
| v0 | №1105 (+ 2 других файлов) |
| v1 | №1105 (+ 2 других файлов) |
| v2 | №1105 (+ 2 других файлов) |
| v2Broken | №1084 |
| va | №1105 (+ 4 других файлов) |
| val | №0071 (+ 14 других файлов) |
| valEl | №0613 (+ 1 других файлов) |
| valid | №1115 |
| validate | №0661 |
| validBoons | №0768 |
| validRelative | №1094 |
| validStats | №0734 |
| valInput | №0780 |
| valName | №0613 (+ 1 других файлов) |
| vals | №0057 (+ 2 других файлов) |
| valStr | №0613 (+ 1 других файлов) |
| value | №0048 (+ 34 других файлов) |
| values | №0058 (+ 7 других файлов) |
| variableNameUsed | №0761 |
| variant | №1168 |
| variants | №1070 |
| varName | №0761 (+ 2 других файлов) |
| vary | №1083 |
| vb | №1105 (+ 3 других файлов) |
| vc | №1105 (+ 3 других файлов) |
| vector | №0054 |
| venom | №1058 |
| venomDamage | №1057 |
| venomFeature | №1058 |
| venomHero | №1058 |
| venomsmithPoisonImmune | №0644 |
| venomTarget | №1057 |
| verbal | №0807 |
| verm | №0630 |
| version | №0821 (+ 4 других файлов) |
| VERSION | №0055 (+ 25 других файлов) |
| versionText | №0831 |
| vertex | №0050 (+ 1 других файлов) |
| vertices | №0047 (+ 8 других файлов) |
| verts | №0051 (+ 1 других файлов) |
| vesselHP | №1147 |
| vi | №1105 (+ 2 других файлов) |
| victim | №0807 (+ 4 других файлов) |
| view | №0053 (+ 8 других файлов) |
| viewIndex | №0058 |
| views | №0058 (+ 7 других файлов) |
| viscera | №1138 |
| visceraTarget | №1138 |
| visible | №0050 (+ 8 других файлов) |
| visionBack | №1117 |
| visionPC | №1117 |
| visionPhone | №1117 |
| visionRoster | №1117 |
| visionServer | №1117 |
| vm | №0652 (+ 145 других файлов) |
| voice | №1058 |
| voiceInstall | №1058 |
| volatility | №0068 (+ 1 других файлов) |
| volStep | №0071 |
| volumeRange | №0071 |
| volumes | №0050 |
| vp | №0062 |
| vr | №0800 |
| vs | №0052 |
| vuln | №0839 |
| vulnerable | №0644 (+ 1 других файлов) |
| vx | №0050 (+ 1 других файлов) |
| vy | №0050 |
| vz | №0050 (+ 1 других файлов) |
| w | №0048 (+ 33 других файлов) |
| W | №0050 (+ 2 других файлов) |
| w1 | №0050 |
| w2 | №0050 |
| w3 | №0050 |
| wa | №0644 (+ 1 других файлов) |
| wager | №1117 (+ 1 других файлов) |
| wagerGuard | №0808 |
| waistPoints | №1070 |
| waived | №0792 |
| walk | №0833 |
| wall | №0052 |
| wallCache | №0062 |
| wallet | №0788 |
| walletGrid | №0779 |
| wallpapersGridHtml | №0857 |
| wallTypes | №0065 |
| walter | №0050 |
| walterCorpseTarget | №0635 |
| wandering | №1117 |
| wanderPhone | №1117 |
| want | №0790 (+ 2 других файлов) |
| wanted | №0050 (+ 2 других файлов) |
| wantedClass | №0689 |
| war | №0620 (+ 1 других файлов) |
| WAR_ACADEMIES | №0765 |
| ward | №0644 (+ 1 других файлов) |
| wardAbsorbed | №0644 |
| wardenResistant | №0644 |
| wardenSurvive | №0644 |
| wardReduce | №0644 |
| wardrobeSaved | №1257 |
| wardState | №0644 |
| warlordParry | №0644 |
| warp | №1079 (+ 1 других файлов) |
| wasLastStand | №0772 |
| wasNewClass | №0689 |
| wasStand | №0644 |
| wave | №0050 |
| wb | №1105 (+ 2 других файлов) |
| wc | №1105 (+ 2 других файлов) |
| weapon | №0812 (+ 8 других файлов) |
| weaponAttack | №1135 |
| weaponFields | №0780 |
| weaponId | №0812 (+ 2 других файлов) |
| weaponName | №0812 (+ 2 других файлов) |
| weapons | №0800 |
| weaponsDb | №0812 (+ 1 других файлов) |
| wear | №0654 |
| webbedTarget | №1058 |
| webDebuffs | №0067 |
| webResult | №1058 |
| webRoot | №0875 |
| webSave | №0067 |
| webTarget | №0067 |
| weight | №0050 (+ 5 других файлов) |
| weightInp | №0780 |
| weightRes | №0780 |
| weights | №0047 (+ 6 других файлов) |
| weightStr | №0781 (+ 1 других файлов) |
| weightValue | №1244 |
| weldedBoundary | №0047 |
| weldKey | №0047 |
| wh | №0050 |
| whiskers | №0050 |
| who | №0800 |
| wi | №0065 (+ 1 других файлов) |
| wide | №0050 |
| width | №0050 (+ 7 других файлов) |
| wild | №0619 (+ 1 других файлов) |
| willActivate | №0644 |
| willingTargetIds | №0808 |
| win | №0875 (+ 5 других файлов) |
| wingAngle | №0050 |
| wis | №0617 (+ 11 других файлов) |
| wisMod | №0613 (+ 1 других файлов) |
| WITCH_CRAFT_DATA | №0768 |
| WITCH_CRAFTS | №0768 |
| WITCH_CURSE_EFFECTS | №0768 |
| WITCH_CURSES | №0768 |
| WITCH_GRAND_HEXES | №0768 |
| WITCH_HEXES | №0768 |
| witchAttackPenalty | №0644 |
| witchElemental | №0644 |
| witchImperil | №0644 |
| witchLabels | №0768 |
| witchPack | №0768 |
| withFade | №0857 |
| within1 | №1111 |
| within5 | №1111 |
| wiz | №0800 |
| Wizard | №1084 |
| wk | №1108 |
| wl | №0637 |
| wName | №0636 |
| wolf | №1147 |
| won | №1124 |
| wood | №0052 |
| words | №0056 |
| world | №0047 (+ 2 других файлов) |
| WORLD_STATE | №0867 |
| woven | №0052 |
| wp | №0857 (+ 1 других файлов) |
| wrap | №0614 (+ 4 других файлов) |
| wrapped | №0772 (+ 4 других файлов) |
| wrappedTools | №0816 |
| wrapper | №0761 (+ 1 других файлов) |
| wrapS | №0062 |
| wrapT | №0062 |
| wrist | №0050 |
| wrists | №0050 |
| write | №0807 |
| wrong | №1138 (+ 2 других файлов) |
| ws | №0052 (+ 2 других файлов) |
| wt | №0052 (+ 1 других файлов) |
| ww | №0062 |
| wx | №0061 (+ 1 других файлов) |
| wy | №0061 (+ 1 других файлов) |
| x | №0048 (+ 162 других файлов) |
| X | №0061 |
| x0 | №0050 |
| x1 | №0050 (+ 2 других файлов) |
| x2 | №0060 (+ 1 других файлов) |
| xenoHero | №1057 |
| xenoOwner | №1058 |
| xn | №0070 (+ 1 других файлов) |
| xp | №0617 (+ 11 других файлов) |
| XP_BY_CR | №0794 |
| xs | №1237 |
| xt | №0070 |
| xx | №0050 (+ 3 других файлов) |
| xy | №0062 |
| y | №0047 (+ 55 других файлов) |
| Y | №0050 (+ 1 других файлов) |
| y0 | №0050 (+ 1 других файлов) |
| y1 | №0050 (+ 4 других файлов) |
| y2 | №0060 (+ 2 других файлов) |
| yaw | №0052 (+ 36 других файлов) |
| yd | №0768 |
| yes | №0048 (+ 2 других файлов) |
| yf | №1105 |
| yFile | №1107 |
| ys | №0050 |
| yuan | №1065 (+ 2 других файлов) |
| yy | №0050 (+ 1 других файлов) |
| z | №0047 (+ 19 других файлов) |
| z0 | №0050 (+ 1 других файлов) |
| z1 | №0050 (+ 1 других файлов) |
| zb | №0050 |
| zf | №0050 |
| zFile | №1107 |
| ZH | №0061 |
| zi | №0061 |
| zlib | №1083 (+ 7 других файлов) |
| zoom | №0052 (+ 2 других файлов) |
| zs | №0061 |
| ZW | №0061 |
| ZX | №0061 |
| ZY | №0061 |
| zz | №0050 (+ 1 других файлов) |

### Глобальные JS API (563)

| Имя | Исходные файлы |
|---|---|
| __diceGameplayRelocationObserver | №0761 |
| __diceGameplayRelocationQueued | №0761 |
| __diceTabPanelObserver | №0761 |
| __DND_APP_BOOT_READY | №0072 |
| __dndGameplayV57Waiter | №0772 |
| __dndLootV36 | №0796 |
| __dndLootV37 | №0797 |
| __dndLootV40 | №0795 |
| __dndModalFrameObserverInstalled | №0821 |
| __dndPendingReactionRequest | №0800 |
| __fallbackRollDice | №0761 |
| __map | №1089 |
| __TEST_RESULT__ | №1224 |
| _dndFaqRender | №0804 |
| _dndSave | №0827 (+ 6 других файлов) |
| _dndTourBack | №0804 |
| _dndTourNext | №0804 |
| _dndTourSkip | №0804 |
| _expBeforeLevelUp | №0689 |
| _loadedFeatsMap | №0689 |
| _loadedSubclassOptions | №0689 |
| _originalAddItemToInventory | №0781 |
| AbortController | №0831 |
| ACCURSED_V11 | №0066 |
| accursedAfflictions | №0066 |
| accursedProgression | №0066 (+ 2 других файлов) |
| accursedRuntime | №0066 (+ 1 других файлов) |
| addEventListener | №1119 (+ 4 других файлов) |
| addExperienceValue | №0769 |
| addItemToInventory | №0781 (+ 2 других файлов) |
| ALCHEMIST_MHP_2024 | №0067 |
| alchemistProgression | №0666 |
| alert | №0800 (+ 3 других файлов) |
| allCharacters | №0613 (+ 4 других файлов) |
| appDebugLogs | №0821 (+ 1 других файлов) |
| appendDiceLog | №0637 (+ 3 других файлов) |
| applyClassProgression | №0702 |
| applyConditionsToRoll | №1136 |
| applyDndASI | №0816 |
| applyMulticlassProficiencies | №0689 (+ 1 других файлов) |
| applySubclassProgression | №0637 (+ 1 других файлов) |
| artificerProgression | №0668 |
| autoSaveCurrentCharacter | №0070 (+ 39 других файлов) |
| averageHpIncrease | №0689 |
| barbarianProgression | №0670 |
| bardProgression | №0672 |
| beastheartProgression | №0675 (+ 1 других файлов) |
| BeastheartRuntime | №0675 |
| bloodHunterProgression | №0677 |
| calculateMods | №0816 (+ 1 других файлов) |
| changePointBuyStat | №0613 (+ 1 других файлов) |
| checkMulticlassRequirements | №0775 (+ 1 других файлов) |
| chooseAssassinSubclass | №0637 |
| chooseMetamagic | №0637 |
| chooseSubclass | №0702 |
| chooseSubclassForClass | №0637 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0702 |
| CLASSES_REFERENCE | №0067 (+ 4 других файлов) |
| clericProgression | №0678 |
| closeAddFeatModal | №0734 |
| closeCharacterCreationModal | №0613 (+ 1 других файлов) |
| closeCustomAlert | №0781 |
| closeDndChangelog | №0804 |
| closeDndNetworkModal | №0799 |
| closeExperienceModal | №0769 |
| closeIconSettingsModal | №0821 (+ 2 других файлов) |
| closeLevelUpModal | №0689 |
| closeSettingsModal | №0821 |
| Companions | №0647 |
| confirm | №0052 (+ 2 других файлов) |
| confirmAddFeatManual | №0734 |
| confirmLevelUp | №0689 |
| createNewCharacter | №0613 (+ 1 других файлов) |
| createSwarmAvatar | №0828 |
| crypto | №1114 (+ 19 других файлов) |
| currentChar | №0821 (+ 31 других файлов) |
| currentCharacter | №0821 (+ 10 других файлов) |
| currentCharacterId | №0642 (+ 2 других файлов) |
| currentRollMode | №1132 |
| defaultArmors | №0073 |
| defaultConsumables | №0648 (+ 1 других файлов) |
| defaultJunk | №0783 (+ 2 других файлов) |
| defaultMaterials | №0793 (+ 2 других файлов) |
| defaultWeapons | №0812 (+ 1 других файлов) |
| disableDndDebugRuntime | №0821 (+ 1 других файлов) |
| DND_ALCHEMY_GATHERING_V52 | №0070 |
| DND_APP_ICONS | №0821 (+ 2 других файлов) |
| DND_BESTIARY_V56_1 | №0617 |
| DND_BESTIARY_V56_10 | №0618 |
| DND_BESTIARY_V56_11 | №0619 |
| DND_BESTIARY_V56_12 | №0620 |
| DND_BESTIARY_V56_13 | №0621 |
| DND_BESTIARY_V56_2 | №0622 |
| DND_BESTIARY_V56_3 | №0623 |
| DND_BESTIARY_V56_4 | №0624 |
| DND_BESTIARY_V56_5 | №0625 |
| DND_BESTIARY_V56_6 | №0626 |
| DND_BESTIARY_V56_7 | №0627 |
| DND_BESTIARY_V56_8 | №0628 |
| DND_BESTIARY_V56_9 | №0629 |
| DND_CRAFT_DISASSEMBLY_V51 | №0653 |
| DND_CRAFT_ECONOMY_V49 | №0656 |
| DND_CRAFT_PROFESSION_PROGRESS | №0659 |
| DND_CRAFT_PROFESSIONS_V33 | №0660 |
| DND_CRAFT_PROFESSIONS_V38 | №0661 |
| DND_CRAFT_PROFESSIONS_V47 | №0659 |
| DND_CRAFT_PROFESSIONS_V47_CRAFT | №0659 |
| DND_CRAFT_RESOURCES_V34 | №0662 |
| DND_CRAFT_V51 | №0654 |
| DND_CRAFTING_DLC_V50 | №0655 |
| DND_CRAFTING_V31 | №0657 |
| DND_CUSTOM_CRAFTING_V32 | №0663 |
| DND_EXP_TABLE | №0769 |
| DND_INVENTORY_CONTAINERS_V54 | №0778 |
| DND_MARKET_V55 | №0788 |
| DND_MARKET_V55_1 | №0789 |
| DND_MARKET_V55_3 | №0790 |
| DND_PENDING_CLASS_PACKS | №0066 (+ 8 других файлов) |
| DND_PLANESCAPE_V56_13 | №0621 |
| DND_RESOURCE_GATHERING_V35 | №0814 |
| DND_RESOURCE_PROCESSING_V43 | №0815 |
| DND_UPDATE_MANAGER | №0831 |
| DND_UPDATE_SCENE_V2 | №0832 |
| DND_UPDATE_UI | №0831 |
| DND_WORLD_GATHERING_V53 | №0867 |
| DND3DAssetCatalog | №0056 (+ 1 других файлов) |
| DND3DAssetNames | №0056 (+ 1 других файлов) |
| DND3DMap | №0059 |
| dndAddCompanionAttack | №0816 |
| DNDAdvancedDebugV70 | №0842 |
| DNDAlchemy | №0068 |
| dndBackgrounds | №0613 |
| dndBattleActionClose | №0614 |
| dndBattleActionOpen | №0614 (+ 1 других файлов) |
| dndBattleQuickAttack | №0614 |
| dndBattleQuickMove | №0614 |
| dndBattleQuickReady | №0614 |
| dndBattleQuickSpell | №0614 |
| DNDBloodHunter | №0630 |
| DNDCampaign | №0631 |
| DNDCharacter3D | №0055 |
| DNDCharacterAnatomy | №0048 |
| DNDCharacterAnatomyGeometry | №0047 |
| DNDCharacterAppearanceStore | №0049 |
| DNDCharacterBodyGeometry | №0050 |
| DNDCharacterClothing | №0051 |
| DNDCharacterEditor3D | №0052 |
| dndCharacterEditorLaunchError | №1038 |
| DNDCharacterLabV702 | №0838 |
| DNDCharacterMorphAssets | №0053 |
| DNDCharacterPose | №0054 |
| DNDClassFeatures | №0637 (+ 1 других файлов) |
| DNDCloudAccount | №0640 |
| DNDCloudConfig | №0641 |
| DNDCloudSync | №0642 |
| dndCollectMonsterLootV36 | №0796 |
| dndCollectMonsterLootV37 | №0797 |
| dndCollectMonsterLootV40 | №0795 |
| DNDCombat | №0644 (+ 1 других файлов) |
| DNDCombatEventBusV69 | №0836 |
| dndCombatLog | №0827 |
| DNDCombatLogV66 | №0837 |
| dndCompanionAttack | №0816 |
| dndCompanionDamage | №0816 |
| DNDCompanionGameplayV27 | №0645 |
| dndCompanionHeal | №0816 |
| DNDCompanionPacks | №0646 |
| dndCompanionStat | №0816 |
| dndConcentrationDamagePrompt | №0816 |
| DNDContent | №0650 |
| DNDContentCatalog | №0649 |
| DNDContentManifest | №0651 |
| dndCraft | №0657 |
| dndCraftProfession | №0660 |
| dndCraftProfessionV38 | №0654 (+ 3 других файлов) |
| dndCreateBeastheartCompanion | №0646 |
| dndCreateBeastMasterCompanion | №0646 |
| dndCreateFamiliar | №0646 |
| dndCreateSteed | №0646 |
| dndDebugEnabled | №1038 |
| DNDDebugScenarioEditorV705 | №0845 |
| DNDDebugScenarioManagerV704 | №0846 |
| DNDDiceResolutionV65 | №0848 |
| DNDEncounterCheckpointV68 | №0849 |
| DNDEncounterMapV59 | №0850 |
| DNDExpandedV23 | №0765 |
| DNDExpansionClasses | №0768 |
| DNDFeats | №0771 |
| dndGameplayCoreV57Render | №0772 |
| DNDGameplayV57 | №0772 |
| dndGenerateMonsterLootV36 | №0796 |
| dndGenerateMonsterLootV37 | №0795 (+ 1 других файлов) |
| DNDGLTF | №0058 |
| DNDGLTFCharacterPipeline | №0057 |
| dndInitiativeActive | №0816 |
| dndInitiativeDamageActive | №0816 |
| dndInitiativeHealActive | №0816 |
| dndInitiativeSkipDefeated | №0816 |
| DndInventoryContainersV54 | №0778 |
| DndItemDatabase | №0781 |
| dndLaunchCharacterEditor3D | №1038 |
| DNDMagic | №0787 |
| dndMap3DOpen | №0059 |
| DNDMapModel | №0060 |
| DNDMapRenderer2D | №0061 |
| DNDMapRenderer3D | №0062 (+ 1 других файлов) |
| DndMarketV55 | №0788 |
| DndMarketV55_3 | №0790 |
| DNDMobileBattleV61 | №0852 |
| DNDMobileSessionV67 | №0854 |
| DNDMonsterLoot | №0796 (+ 1 других файлов) |
| DNDMonsterLootV40 | №0795 |
| DNDMonsters | №0794 |
| dndNetwork | №1089 (+ 4 других файлов) |
| dndNetworkAddPlayerToInitiative | №0800 |
| dndNetworkCopyHint | №0799 |
| dndNetworkGameplayBuildProfile | №0800 |
| dndNetworkGameplayEvent | №0800 |
| dndNetworkGameplayMonsterAction | №0800 |
| dndNetworkGameplayMonsterState | №0800 |
| dndNetworkGameplayPeerDisconnect | №0800 |
| dndNetworkGameplayPeerHello | №0800 |
| dndNetworkGameplayPendingReactions | №0800 |
| dndNetworkGameplayPrepareHostHandoff | №0800 |
| dndNetworkGameplayReactionRequest | №0800 |
| dndNetworkGameplayRender | №0772 (+ 2 других файлов) |
| dndNetworkGameplayResult | №0800 |
| dndNetworkGameplayRoomShutdown | №0800 |
| dndNetworkGameplaySnapshot | №0800 |
| dndNetworkHostCreate | №0799 |
| dndNetworkHostFinish | №0799 |
| dndNetworkJoinCreate | №0799 |
| dndNetworkKick | №0799 |
| dndNetworkNewInvite | №0799 |
| dndNetworkSingle | №0799 |
| dndOpenCharacterEditor3D | №0052 |
| DNDPredictor | №0810 |
| DNDPredictorCards | №0807 |
| DNDPredictorMovement | №0809 |
| DNDPredictorUI | №0808 |
| dndProcessResourceV43 | №0815 |
| dndRemoveCompanionAttack | №0816 |
| dndRenderAlchemy | №0068 (+ 1 других файлов) |
| dndRenderCombat | №0630 |
| dndRenderCombatV3 | №0800 (+ 1 других файлов) |
| DNDRules | №0816 (+ 1 других файлов) |
| DNDSecondaryEntities | №0819 |
| dndShowRulesSummary | №0816 |
| DNDSpellPreparation | №0825 |
| dndSplashFinished | №0786 (+ 2 других файлов) |
| DNDStairNavigation | №0064 |
| dndStartConcentrationPrompt | №0816 |
| DNDStressMap | №0065 |
| dndSummonAttack | №0827 |
| dndSummonCommand | №0827 |
| dndSummonHeal | №0827 |
| DNDSummoning | №0827 |
| dndSyncCurrentCharacterFromCombat | №0800 (+ 2 других файлов) |
| dndUseAlchemyProduct | №0069 |
| dndV59CreateEncounter | №0850 |
| dndV61ResetView | №0852 |
| dndV65Close | №0848 |
| dndV65Open | №0848 |
| dndV65Resolve | №0848 |
| dndV66Clear | №0837 |
| dndV66CloseDebug | №0837 |
| dndV66CloseLog | №0837 |
| dndV66Export | №0837 |
| dndV66Filter | №0837 |
| dndV66OpenDebug | №0837 |
| dndV66OpenLog | №0837 |
| dndV66Record | №0836 (+ 1 других файлов) |
| dndV66RefreshDebug | №0837 |
| dndV66SelfTest | №0837 |
| dndV67Close | №0854 |
| dndV67Delete | №0854 |
| dndV67Export | №0854 |
| dndV67FileImport | №0854 |
| dndV67Open | №0854 |
| dndV67Restore | №0854 |
| dndV67Save | №0854 |
| dndV68Close | №0849 |
| dndV68Delete | №0849 |
| dndV68Export | №0849 |
| dndV68FileImport | №0849 |
| dndV68Open | №0849 |
| dndV68Restore | №0849 |
| dndV68Save | №0849 |
| dndV69Clear | №0836 |
| dndV69CloseReplay | №0836 |
| dndV69ExportReplay | №0836 |
| dndV69Filter | №0836 |
| dndV69OpenReplay | №0836 |
| dndV69Play | №0836 |
| dndV69Record | №0836 |
| dndV69Seek | №0836 |
| dndV69Step | №0836 |
| dndV69Stop | №0836 |
| dndV702AddClass | №0838 |
| dndV702AddFeat | №0838 |
| dndV702AddItem | №0838 |
| dndV702AddSpell | №0838 |
| dndV702Close | №0838 |
| dndV702Open | №0838 |
| dndV702Recalc | №0838 |
| dndV702RemoveClass | №0838 |
| dndV702RemoveFeat | №0838 |
| dndV702RemoveItem | №0838 |
| dndV702RemoveSpell | №0838 |
| dndV702SetBackground | №0838 |
| dndV702SetClassLevel | №0838 |
| dndV702SetProfession | №0838 |
| dndV702SetRace | №0838 |
| dndV702SetTotalLevel | №0838 |
| dndV702Tab | №0838 |
| dndV704Close | №0846 |
| dndV704Open | №0846 |
| dndV704Remove | №0846 |
| dndV704Rollback | №0846 |
| dndV704Run | №0846 |
| dndV704SaveCustom | №0846 |
| dndV704Select | №0846 |
| dndV705Close | №0845 |
| dndV705Create | №0845 |
| dndV705Export | №0845 |
| dndV705ImportPrompt | №0845 |
| dndV705Open | №0845 |
| dndV705Rollback | №0845 |
| dndV705Run | №0845 |
| dndV705Select | №0845 |
| dndV708Close | №0847 |
| dndV708Open | №0847 |
| dndV708Reset | №0847 |
| dndV70ApiFilter | №0842 |
| dndV70CallAPI | №0842 |
| dndV70ClearErrors | №0842 |
| dndV70CloseDebug | №0842 |
| dndV70Export | №0842 |
| dndV70InspectSource | №0842 |
| dndV70ModuleFilter | №0842 |
| dndV70OpenDebug | №0842 |
| dndV70RefreshDebug | №0842 |
| dndV70RunHealthCheck | №0842 |
| dndV70SetAPIArgs | №0842 |
| dndV70SetAPIPath | №0842 |
| dndV70Tab | №0842 |
| dndV70UseAPI | №0842 |
| document | №1130 (+ 1 других файлов) |
| druidProgression | №0680 |
| enableDndDebugLogger | №0821 (+ 2 других файлов) |
| enableDndDebugRuntime | №0821 (+ 1 других файлов) |
| ensureDndToolsState | №1121 (+ 5 других файлов) |
| escapeDndHtml | №0615 (+ 3 других файлов) |
| EXTRA_BODY_RUNTIME | №0773 (+ 1 других файлов) |
| FEATS_PHB | №0735 |
| FEATS_SETTING | №0736 |
| FEATS_TCOE | №0737 |
| FEATS_UA_HOMEBREW | №0738 |
| FEATS_XGTE | №0739 |
| fetch | №1089 (+ 2 других файлов) |
| fighterProgression | №0683 |
| filterFeatsList | №0734 |
| geistProgression | №0682 |
| getAllBackgrounds | №0613 |
| getAvailableSubclasses | №0637 (+ 3 других файлов) |
| getCharacterCurrentLevel | №0769 |
| getCharacterLevel | №0769 (+ 3 других файлов) |
| getClassData | №0638 (+ 2 других файлов) |
| getCurrentInventoryWeightData | №0781 (+ 1 других файлов) |
| getDndRules | №0816 |
| getExpandedClassDefinition | №0764 |
| getExpandedClassPack | №0764 |
| getFormattedClassAndLevel | №0689 |
| getKibblesClassDisplayName | №0784 |
| getLevelByExp | №0769 |
| getProfBonusNum | №0637 (+ 2 других файлов) |
| getShifterBloodline | №0822 |
| getShifterBloodlines | №0822 |
| getShifterMaxCR | №0822 |
| getSpellcastingAbilityForClass | №0702 |
| getSpellCastingInfo | №0787 |
| getStatModNum | №0637 (+ 2 других файлов) |
| getSubclassData | №0702 (+ 1 других файлов) |
| getSubclassesForClass | №0638 |
| getSubclassFeaturesForLevel | №0759 |
| getSwarmDevourDamage | №0828 |
| getSwarmDevourDC | №0828 |
| getSwarmMutationSlots | №0828 |
| getSwarmState | №0828 |
| getVesselAspects | №0833 |
| getVesselSpellList | №0833 |
| getVesselSpirit | №0833 |
| GHOST_EXTRA | №0773 |
| ghostProgression | №0686 (+ 2 других файлов) |
| goToTab | №0637 |
| heavyWeapons | №0863 |
| Hero | №0775 |
| illriggerProgression | №0687 (+ 1 других файлов) |
| KIBBLES_CLASS_I18N | №0784 |
| KIBBLES_SOURCE_CATALOG | №0784 |
| KIBBLES_SOURCE_INFO | №0784 |
| kind | №0808 |
| listIntegratedExpandedClasses | №0764 |
| logs | №1132 |
| MARTYR_2024 | №0792 |
| MARTYR_BURDENS | №0792 |
| martyrProgression | №0690 (+ 1 других файлов) |
| martyrRuntime | №0792 |
| maxHpIncrease | №0689 |
| meleeWeapons | №0864 |
| monkProgression | №0692 |
| MULTICLASS_CLASS_REQUIREMENTS | №0764 (+ 2 других файлов) |
| MULTICLASS_PROFICIENCIES_2014 | №0702 (+ 1 других файлов) |
| MULTICLASS_REQUIREMENTS | №0775 |
| NECROMANCER_2024 | №0798 |
| NECROMANCER_SUBCLASSES | №0798 |
| necromancerProgression | №0694 (+ 1 других файлов) |
| necromancerRuntime | №0798 |
| nextInitiativeTurn | №0816 |
| OCCULTIST_KIBBLES_V11 | №0802 |
| occultistProgression | №0696 |
| occultistRuntime | №0802 |
| onerror | №0760 |
| onExpInputChange | №0769 |
| onFeatOrAsiChange | №0689 |
| onSubclassChange | №0689 |
| openAddFeatModal | №0734 |
| openCharacter | №0825 |
| openDndChangelog | №0804 |
| openDndNetworkModal | №0799 |
| openExperienceModal | №0769 |
| openFeatStatChoiceModal | №0734 |
| openIconSettingsModal | №0821 (+ 2 других файлов) |
| openLevelUpModal | №0689 |
| openLevelUpModalFromExp | №0769 |
| openSettingsModal | №0821 |
| paladinProgression | №0698 |
| PARASITE_EXTRA | №0805 |
| parasiteProgression | №0700 (+ 2 других файлов) |
| parasiteRuntime | №0805 |
| parseWeightToKg | №0781 (+ 1 других файлов) |
| pendingLevelUpData | №0689 |
| populateFeatModalList | №0734 |
| Prof_Acr | №0072 |
| Prof_Ani | №0072 |
| Prof_Arc | №0072 |
| Prof_Ath | №0072 (+ 1 других файлов) |
| Prof_Dec | №0072 |
| Prof_His | №0072 |
| Prof_Ins | №0072 |
| Prof_Inv | №0072 |
| Prof_Itm | №0072 |
| Prof_Med | №0072 |
| Prof_Nat | №0072 |
| Prof_Prc | №0072 |
| Prof_Prf | №0072 |
| Prof_Prs | №0072 |
| Prof_Rel | №0072 |
| Prof_Soh | №0072 |
| Prof_Stl | №0072 |
| Prof_Sur | №0072 |
| prompt | №1119 (+ 1 других файлов) |
| psionProgression | №0703 (+ 1 других файлов) |
| pugilistProgression | №0705 (+ 1 других файлов) |
| pugilistRuntime | №0768 |
| rangedWeapons | №0865 |
| rangerProgression | №0707 |
| refreshClassModalLocks | №0689 |
| refreshExtraClassPanels | №0770 |
| removeCharacterFeat | №0734 |
| renderClassFeatures | №0630 (+ 1 других файлов) |
| renderCombatAbilities | №0630 (+ 1 других файлов) |
| renderCompanions | №0816 |
| renderDndTools | №0762 (+ 2 других файлов) |
| renderGhostExtraPanel | №0770 |
| renderInitiativeTracker | №0772 (+ 11 других файлов) |
| renderInventory | №0070 (+ 13 других файлов) |
| renderParasiteExtraPanel | №0770 |
| renderSpellSlots | №0816 (+ 2 других файлов) |
| renderWalterParasitePanel | №0770 |
| renderWeapons | №0816 |
| requestAnimationFrame | №1249 (+ 18 других файлов) |
| resolveMulticlassProficiencyChoice | №0689 (+ 1 других файлов) |
| restorePactMagic | №0762 (+ 2 других файлов) |
| rogueProgression | №0709 |
| rollClassFeatureD20 | №0637 |
| rollClassFeatureDamage | №0637 |
| rollHpIncrease | №0689 |
| rollSingleDice | №0816 |
| RUNEKeeper_V12 | №0817 |
| runeKeeperDialects | №0817 |
| runeKeeperProgression | №0712 (+ 2 других файлов) |
| runeKeeperRuntime | №0768 (+ 1 других файлов) |
| SAVANT_V561 | №0818 |
| savantDisciplines | №0818 |
| savantProgression | №0713 (+ 2 других файлов) |
| savantRuntime | №0818 |
| saveAllCharacters | №1112 (+ 1 других файлов) |
| saveCharacter | №0070 (+ 5 других файлов) |
| saveCurrentCharacter | №0067 |
| saved | №1130 |
| savedDimBeforeHide | №0857 |
| saveNewCreatedCharacter | №0613 (+ 1 других файлов) |
| selectedBaseHp | №0689 |
| selectLauncherIcon | №0821 (+ 2 других файлов) |
| setCharacterLevel | №0821 (+ 2 других файлов) |
| setTimeout | №1119 (+ 1 других файлов) |
| SHIFTER_V21 | №0822 |
| shifterProgression | №0715 (+ 2 других файлов) |
| shifterRuntime | №0822 |
| showCustomAlert | №0781 (+ 1 других файлов) |
| SKILL_TO_VAR_MAP | №1132 |
| SKILLS_CONFIG | №0072 |
| sorcererProgression | №0717 |
| sortInitiativeTracker | №0827 (+ 1 других файлов) |
| specialWeapons | №0866 |
| SPELLBLADE_RUNTIME | №0824 |
| spellbladeProgression | №0824 |
| spells3lvl | №0752 |
| spells4lvl | №0753 |
| spells5lvl | №0754 |
| spells6Lvl | №0755 |
| spells8lvl | №0757 |
| spells9lvl | №0758 |
| spellsLevel1 | №0750 |
| spellsLevel2 | №0751 |
| spellsLevel7 | №0756 |
| startDndOnboarding | №0804 |
| SUBCLASSES_REFERENCE | №0067 (+ 6 других файлов) |
| subtractExperienceValue | №0769 |
| SWARM_EXTRA | №0828 |
| swarmProgression | №0719 (+ 2 других файлов) |
| swarmRuntime | №0828 |
| syncDndNetworkInitiative | №1121 (+ 4 других файлов) |
| syncLevelUI | №0689 |
| toggleClassFeatureDetails | №0637 |
| triggerCritEffect | №1136 |
| updateCharacterArmorClass | №1126 |
| updateCharacterSpellSlots | №0689 (+ 1 других файлов) |
| updateExperienceModalUI | №0769 |
| updateExtraClassCreationUI | №0635 |
| updateMagicData | №0787 |
| updateNetworkModeUI | №0799 |
| useBloodHunterFeature | №0630 |
| useClassFeature | №0637 |
| useFeat | №0771 |
| VESSEL_V4 | №0833 |
| vesselProgression | №0721 (+ 1 других файлов) |
| vesselRuntime | №0833 |
| VTT_PROJECT_MANIFEST_V70 | №0855 |
| WALTER_PARASITE_EXTRA | №0858 |
| walterParasiteProgression | №0723 (+ 2 других файлов) |
| WARDEN_MHP_2024 | №0860 |
| wardenProgression | №0724 (+ 1 других файлов) |
| warlockProgression | №0726 |
| WARLORD_LASERLLAMA_V330 | №0861 |
| warlordProgression | №0728 (+ 1 других файлов) |
| WEAPONS_DB | №0812 (+ 1 других файлов) |
| window | №1089 (+ 7 других файлов) |
| WITCH_MHP_2014 | №0768 |
| witchProgression | №0730 |
| witchRuntime | №0768 |
| wizardProgression | №0732 |

### Поля персонажа (101)

| Имя | Исходные файлы |
|---|---|
| ac | №0782 (+ 4 других файлов) |
| actionSurges | №0816 |
| activeConditions | №0636 (+ 5 других файлов) |
| activeFolderId | №0801 |
| anatomy | №0048 |
| appearance3d | №1066 (+ 1 других файлов) |
| baseAC | №0782 (+ 3 других файлов) |
| class | №0769 (+ 3 других файлов) |
| classes | №0775 (+ 7 других файлов) |
| classFeaturesState | №0762 (+ 1 других файлов) |
| className | №0689 (+ 2 других файлов) |
| clothing | №0048 (+ 1 других файлов) |
| coinLog | №0779 |
| coins | №0779 (+ 2 других файлов) |
| combatAbilities | №0636 (+ 1 других файлов) |
| combatAbilityStat | №0643 |
| companions | №0762 |
| con | №0689 |
| concentration | №0816 (+ 1 других файлов) |
| conditions | №0761 (+ 3 других файлов) |
| constitution | №0689 |
| craftingProfessions | №0658 |
| dead | №0636 (+ 1 других файлов) |
| deathSaves | №0644 (+ 4 других файлов) |
| defeated | №0762 (+ 3 других файлов) |
| encounters | №1038 |
| equipment | №0052 |
| equippedWeapon | №0812 (+ 1 других файлов) |
| exp | №0769 (+ 1 других файлов) |
| extraACBonus | №0816 |
| extraClassType | №0636 (+ 6 других файлов) |
| feats | №0689 (+ 2 других файлов) |
| featStatBonuses | №0734 |
| features | №0689 (+ 3 других файлов) |
| folders | №0801 |
| gender | №0048 (+ 1 других файлов) |
| ghost | №0773 |
| head | №0048 (+ 1 других файлов) |
| heroClass | №0825 |
| hostName | №0773 (+ 2 других файлов) |
| hp | №0636 (+ 4 других файлов) |
| hpCurrent | №0636 (+ 8 других файлов) |
| hpMax | №0636 (+ 5 других файлов) |
| hpTemp | №1119 |
| id | №0762 (+ 3 других файлов) |
| initiativeTracker | №0762 (+ 9 других файлов) |
| inspiration | №1119 |
| inventory | №0781 (+ 14 других файлов) |
| isExtraClass | №0689 (+ 5 других файлов) |
| kiPoints | №0702 (+ 1 других файлов) |
| lastRest | №0636 (+ 1 других файлов) |
| level | №0821 (+ 6 других файлов) |
| library | №0785 |
| libraryData | №0785 |
| morphChannels | №0053 (+ 2 других файлов) |
| multiclassAllowed | №0773 (+ 2 других файлов) |
| name | №0762 (+ 1 других файлов) |
| originRaceId | №0048 |
| pactMagic | №0762 (+ 2 других файлов) |
| pactMagicData | №0762 (+ 3 других файлов) |
| parasite | №0805 |
| pendingProficiencyChoices | №0702 |
| position | №1119 |
| predictorState | №0782 (+ 4 других файлов) |
| profBonus | №0825 |
| proficiencies | №0782 (+ 3 других файлов) |
| race | №0689 (+ 2 других файлов) |
| raceId | №0048 (+ 1 других файлов) |
| raceName | №0773 (+ 2 других файлов) |
| rageDamageBonus | №0702 |
| ragesCount | №0702 (+ 1 других файлов) |
| replacesRace | №0773 (+ 3 других файлов) |
| resistances | №1058 |
| resources | №0816 (+ 1 других файлов) |
| revision | №0642 |
| savesData | №0613 (+ 2 других файлов) |
| secondWindUses | №0816 |
| skills | №0702 (+ 1 других файлов) |
| skillsData | №0613 (+ 5 других файлов) |
| skillValues | №0072 |
| skins | №0048 (+ 5 других файлов) |
| sneakAttackDice | №0702 |
| sorceryPoints | №0702 (+ 1 других файлов) |
| speed | №0773 (+ 3 других файлов) |
| spellcastingSources | №0702 (+ 1 других файлов) |
| spells | №0762 |
| spellsData | №0816 (+ 1 других файлов) |
| spellSlotsData | №0636 (+ 4 других файлов) |
| spellStat | №0702 |
| stats | №0775 (+ 12 других файлов) |
| subclass | №0702 (+ 1 других файлов) |
| swarm | №0689 (+ 1 других файлов) |
| tarotEffects | №1117 (+ 1 других файлов) |
| tarotKnowledge | №1117 |
| tempHp | №1058 |
| turnResources | №0762 (+ 1 других файлов) |
| unsaved | №1089 |
| valueOf | №0825 |
| walterParasite | №0689 (+ 1 других файлов) |
| weaponsData | №0636 |
| worldMatrices | №0048 (+ 3 других файлов) |

### Поля JS объектов (6497)

| Имя | Исходные файлы |
|---|---|
| _ | №1152 (+ 11 других файлов) |
| __base | №0062 |
| __bodyMasks | №1081 |
| __ceHeadFrame | №0047 |
| __ceNormals | №0047 (+ 3 других файлов) |
| __ceShapedPositions | №0047 (+ 3 других файлов) |
| __dirname | №1295 |
| __filename | №1295 |
| __floor | №0062 |
| __tarotChargeDouble | №0807 |
| __tarotShared | №0807 |
| __TEST_ASSERT__ | №1295 |
| _sent | №1229 |
| a | №0050 (+ 17 других файлов) |
| abdomen | №0048 |
| aberration | №0617 (+ 12 других файлов) |
| abilities | №0617 (+ 17 других файлов) |
| ability | №0066 (+ 19 других файлов) |
| abilityBonus | №0067 (+ 1 других файлов) |
| abilityBonuses | №0630 |
| abilityChanges | №0807 |
| abilityCheck | №0644 (+ 1 других файлов) |
| abilityCheckBonus | №0768 |
| abilityCheckHigherSpell | №0768 |
| abilityIncrease | №0765 |
| abilityMax | №0807 |
| abilityMin | №0807 |
| abilityScores | №1057 (+ 3 других файлов) |
| absorbedItems | №0828 |
| absorbedTempHp | №0827 |
| ac | №0613 (+ 69 других файлов) |
| academies | №0728 (+ 1 других файлов) |
| academy | №0765 (+ 1 других файлов) |
| academyFeature | №0765 |
| academyFeatures | №0728 |
| acBase | №0073 (+ 1 других файлов) |
| acBonus | №0765 (+ 7 других файлов) |
| acBonusAgainstTarget | №0768 |
| acBonusDie | №0768 |
| accent | №0821 |
| acceptedCategories | №0791 |
| acceptedTags | №0791 |
| access | №0659 |
| access_token | №0642 (+ 1 других файлов) |
| accessories | №0796 (+ 1 других файлов) |
| accessors | №1098 (+ 1 других файлов) |
| acEqualsSelf | №0768 |
| acFormula | №0073 |
| acid | №0067 (+ 2 других файлов) |
| Acid | №0069 |
| acidBomb | №0768 |
| acidReagent | №0815 |
| acolyteOfArms | №0768 |
| acOverride | №0800 (+ 1 других файлов) |
| acPenalty | №0067 |
| acReduction | №0768 |
| acrobatics | №0761 (+ 1 других файлов) |
| acSaveDamageBonus | №0768 |
| action | №0066 (+ 58 других файлов) |
| actionId | №0794 |
| actionOrBonusAction | №0768 |
| actionRequired | №0644 |
| actions | №0067 (+ 28 других файлов) |
| actionSpent | №0067 (+ 1 других файлов) |
| actionSurge | №0637 |
| actionSurges | №0683 |
| actionType | №0067 |
| activate | №1139 |
| activated | №0807 |
| activateLastStand | №0807 |
| active | №0630 (+ 32 других файлов) |
| ACTIVE | №0771 |
| activeCharacteristics | №0858 |
| activeConditions | №0613 (+ 9 других файлов) |
| activeEncounter | №0851 |
| activeEncounterId | №0850 (+ 1 других файлов) |
| activeId | №0851 |
| activeIndex | №0067 (+ 42 других файлов) |
| activeMutations | №0828 |
| activeOrgans | №0858 |
| activeProperties | №0069 |
| activeRage | №0637 (+ 1 других файлов) |
| activeRite | №0630 |
| activeShape | №1219 |
| activity | №0617 (+ 12 других файлов) |
| actor | №0772 (+ 2 других файлов) |
| actorId | №0808 (+ 4 других файлов) |
| actorName | №1181 |
| actual | №0843 |
| actWithArcaneAnathemaWhileDisabled | №0768 |
| adamantine | №0657 |
| adaptiveMalediction | №0768 |
| addClass | №0838 |
| addCombatantFromTemplate | №0644 |
| addConToEachDie | №0768 |
| addCreature | №0850 |
| addCustomLoot | №0796 (+ 1 других файлов) |
| addD4OnFailure | №0768 |
| addDamage | №0067 |
| addDie | №0768 |
| added | №0617 (+ 26 других файлов) |
| addEventListener | №0876 (+ 25 других файлов) |
| addExhaustion | №0816 |
| addFeat | №0838 |
| addFloor | №0060 |
| addInventory | №0838 |
| additionalFamiliar | №0802 |
| addLexiconRune | №0768 |
| addObject | №0060 |
| addProficiencyBonus | №0768 |
| addProfToAnathema | №0768 |
| addRecipe | №0656 |
| addSelected | №0850 |
| addSpell | №0838 |
| addToRoll | №0768 |
| addXP | №0659 |
| addZone | №0060 |
| adhesive | №0067 |
| adjustedXp | №0794 |
| adjustRiteDamage | №0630 |
| adjustSymbiosis | №0805 |
| adjustWeaponDamage | №0630 |
| adornment | №0659 |
| adrenaline | №0822 |
| adroitAnalysis | №0818 |
| adultAnatomy | №0055 |
| advancedRoguishCharm | №0768 |
| advancedTactics | №0768 |
| advancedTransformation | №0630 |
| advanceTime | №0067 (+ 1 других файлов) |
| advantage | №0067 (+ 14 других файлов) |
| advantageAgainst | №0768 |
| advantageAgainstFrightened | №0768 |
| advantageAgainstGrappled | №0768 |
| advantageAgainstTarget | №0768 |
| advantageAgainstWounded | №0765 |
| advantageAllAttacks | №0630 |
| advantageAllD20 | №0768 |
| advantageAttackRolls | №0768 |
| advantageAttacks | №0768 |
| advantageCharismaChecks | №0768 |
| advantageDexSave | №0768 |
| advantageFirstAttack | №0768 |
| advantageIfSameTarget | №0675 |
| advantageMagicalSaves | №0768 |
| advantageNextAttack | №0765 (+ 1 других файлов) |
| advantageNextSave | №0768 |
| advantageOnChecks | №0765 |
| advantageOnCon | №0765 |
| advantageOneAttackOrSave | №0768 |
| advantageOrDisadvantage | №0768 |
| advantagePerception | №0802 |
| advantageRecallFeyFiendsUndead | №0630 |
| advantageSaves | №0630 (+ 1 других файлов) |
| advantageSavesAgainst | №0768 |
| advantageSavingThrows | №0768 |
| advantageStealth | №0675 |
| advantageStr | №0768 |
| advantageStrength | №0067 |
| advantageTrackFeyFiendsUndead | №0630 |
| advantageVsIntimidation | №0765 |
| adventuringDiscipline | №0768 |
| advice | №0807 (+ 3 других файлов) |
| aether | №0630 |
| Aether | №0768 |
| aetherWalk | №0630 |
| affected | №0067 |
| affinities | №0833 |
| affinity | №1147 |
| afflictedDisadvantageEndSave | №0768 |
| afflictionControl | №0066 |
| african | №1103 |
| afro | №0050 (+ 1 других файлов) |
| after | №0768 (+ 1 других файлов) |
| afterActorAttack | №0630 |
| afterAttack | №0807 |
| afterAttackCost | №0768 |
| afterAttackThreeUnarmed | №0768 |
| afterCarousingAdvantage | №0768 |
| afterDamage | №0630 (+ 1 других файлов) |
| againstInterdicted | №0768 |
| age | №0613 (+ 2 других файлов) |
| ageAppearanceLocked | №0802 |
| ageless | №0768 |
| agePossessionSleepTransformImmunity | №0768 |
| AI_ALLOW_PAID_API | №1055 |
| AI_BASE_SHA | №1056 |
| AI_DEVELOPMENT_ENABLED | №1055 |
| ailment | №0768 |
| ailments | №0066 (+ 1 других файлов) |
| airCore | №0815 |
| airEssence | №0815 |
| alchemical | №0788 |
| alchemicalFat | №0815 |
| alchemicalReagentV49 | №0656 |
| alchemicalSavvy | №0637 |
| alchemist | №0659 (+ 4 других файлов) |
| alchemistActiveEffects | №1057 (+ 1 других файлов) |
| alchemistDebuffs | №1057 |
| alchemistDiscovered | №1058 |
| alchemistExplosionResistanceType | №1057 |
| alchemistGolem | №0067 |
| alchemistGolemOwner | №0067 |
| alchemistGrafts | №1057 |
| alchemistHomunculus | №0067 |
| alchemistHomunculusOwner | №0067 (+ 1 других файлов) |
| alchemistPoisonedWeaponId | №1057 |
| alchemistPreparedFormula | №1058 |
| alchemistSaveDC | №1057 |
| alchemistToxicVengeance | №1057 |
| alchemy | №0657 (+ 1 других файлов) |
| alchemyId | №0069 (+ 1 других файлов) |
| alchemyPoints | №0768 |
| alchemyTools | №0802 |
| alcoholRules | №0067 |
| ale | №0661 |
| alert | №1091 (+ 12 других файлов) |
| alerts | №1119 |
| aliases | №0066 (+ 12 других файлов) |
| all | №0764 (+ 1 других файлов) |
| ALL_RECIPES | №1090 (+ 1 других файлов) |
| allAttacksThisTurn | №0630 |
| allConcentrationSavesDisadvantage | №0630 |
| allDisciplines | №0765 |
| allies | №1168 |
| alliesTempHp | №0768 |
| allLanguages | №0768 |
| allowedForms | №0768 |
| allowFriendly | №0645 |
| allSeeing | №0860 |
| allSkills | №0798 |
| alluring | №0630 |
| Alluring | №0768 |
| ally | №1120 |
| allyACBonus | №0768 |
| allyAdvantage | №0765 |
| allyAdvantageAgainstMarkedPrey | №0768 |
| allyAttackOrDamageCantrip | №0768 |
| allyCharge | №0765 |
| allyCount | №0768 |
| allyDestination | №0808 (+ 2 других файлов) |
| allyFormation | №0765 |
| allyId | №0807 (+ 3 других файлов) |
| allyMoveReactionFt | №0768 |
| allyNextAddD8 | №0768 |
| allyReactionsUpTo | №0768 |
| allyReposition | №0765 |
| allySaveAdvantage | №0768 |
| allySaveAdvantageFt | №0768 |
| allySaveBonus | №0768 |
| allyStrDexSaveBonus | №0768 |
| allyTempHp | №0768 |
| allyWilling | №0808 (+ 2 других файлов) |
| allyWithinAura | №0644 (+ 1 других файлов) |
| allyWithinCourage | №0644 |
| almond | №0052 (+ 1 других файлов) |
| alpha | №0052 (+ 1 других файлов) |
| alphaCutoff | №0058 |
| alphaCutoffLoc | №0062 |
| alphaMode | №0058 |
| alphaModeLoc | №0062 |
| alpine | №0052 |
| alreadyCast | №0808 (+ 1 других файлов) |
| alreadyKnown | №0822 |
| alt | №0768 |
| altar | №0056 |
| alternateNecromancers | №0798 |
| alternateResourceIds | №0070 |
| altMin | №0735 |
| altStat | №0735 |
| alum | №0662 |
| alwaysPrepared | №0792 (+ 2 других файлов) |
| amount | №0070 (+ 35 других файлов) |
| amp | №0630 |
| amphibian | №0763 |
| amplified | №0630 (+ 1 других файлов) |
| amplifiedDamage | №0768 |
| amplifiedEffect | №0768 |
| amplifiedMoveFt | №0768 |
| amplifiedNextAttackAdvantage | №0768 |
| amplifiedRestoreSpellSlot | №0768 |
| amplify | №0630 (+ 4 других файлов) |
| analysisAction | №0818 |
| analyticalDefense | №0818 |
| anatomy | №0050 (+ 1 других файлов) |
| anatomyLevel | №0047 |
| anatomyProfile | №0055 |
| anatomyShape | №0047 |
| anatomySkin | №0047 |
| anatomyType | №0047 |
| anatomyVariant | №0047 |
| anatomyZones | №0047 |
| anchor | №0050 (+ 1 других файлов) |
| anchorPositions | №0050 (+ 1 других файлов) |
| anchors | №0798 |
| ancient_ruins | №0867 |
| ancientMalediction | №0768 |
| angle | №0050 |
| animalFrame | №0050 |
| animalHandling | №0761 (+ 1 других файлов) |
| animalHandlingDC | №0675 |
| animalProfile | №0050 (+ 6 других файлов) |
| animalSkin | №0050 |
| animateDead | №0798 |
| animateThralls | №0768 |
| animation | №0768 |
| animationId | №0054 (+ 1 других файлов) |
| animations | №0057 |
| ankhBlessing | №0798 |
| annotated | №0652 |
| anointedMagic | №0768 |
| antelope | №0055 |
| antialias | №0052 (+ 1 других файлов) |
| Antidote | №0069 |
| antiMagicAdvantage | №0798 |
| anvil | №0056 |
| anxious | №0630 |
| any | №0764 (+ 1 других файлов) |
| aoe | №0800 |
| aoeFt | №0630 |
| aoeLengthFt | №0800 |
| aoeRadiusFt | №0615 (+ 3 других файлов) |
| aoeShape | №0615 (+ 1 других файлов) |
| aoeWidthFt | №0800 |
| apathy | №0807 |
| ape | №0050 |
| apexPredator | №0768 |
| api | №1089 |
| apiArgs | №0842 |
| apiFilter | №0842 |
| apikey | №0642 |
| apiPath | №0842 |
| apis | №0842 |
| apothecary | №0056 (+ 1 других файлов) |
| apothecaryRejectsHammer | №1153 |
| app | №0849 (+ 1 других файлов) |
| appearance | №0049 (+ 3 других файлов) |
| appearance3d | №1089 |
| appearanceAgingStopped | №0802 |
| appearanceOpacity | №0055 |
| appendChild | №1150 (+ 8 других файлов) |
| applications | №0810 |
| applied | №0066 (+ 10 других файлов) |
| appliesCalcifyingStrike | №0768 |
| apply | №0831 |
| applyASI | №0816 |
| applyDamage | №0644 (+ 5 других файлов) |
| applyDamageBatch | №0644 |
| applyFromRound | №0807 |
| applyFullQuality | №0654 |
| applyMorphTargets | №0055 |
| applyOverchannel | №0800 |
| applyPotionEffect | №0067 |
| applyPreset | №0055 |
| applyQuality | №0656 |
| applyStaged | №0831 |
| applyVisibility | №0655 |
| applyWitchTouch | №0768 |
| arcana | №0761 (+ 1 других файлов) |
| arcanaSaveDC | №0768 |
| arcane | №0788 (+ 2 других файлов) |
| arcane_defender | №0771 |
| arcane_recovery_feat | №0771 |
| arcaneAnathema | №0768 |
| arcaneMastery | №0637 |
| arcaneReagentV49 | №0656 |
| arcaneRecovery | №0637 |
| arcaneShard | №0656 (+ 1 других файлов) |
| arcaneWard | №1208 |
| archaeologist | №0818 |
| archdruid | №0637 |
| archery | №0768 |
| archetype | №0768 (+ 1 других файлов) |
| archetypes | №0703 |
| archfey | №0630 |
| architect | №0768 |
| archon | №0833 |
| archonForm | №0833 |
| archons | №0833 |
| area | №0067 (+ 1 других файлов) |
| areaFt | №0067 (+ 1 других файлов) |
| areaRadiusFt | №0768 |
| areaSlime | №0067 |
| areaVulnerability | №0828 |
| arenaRoyale | №0705 |
| args | №1249 (+ 37 других файлов) |
| arm | №0050 |
| armament | №0066 (+ 1 других файлов) |
| armedAndAngry | №0768 |
| armLength | №0052 (+ 1 других файлов) |
| armor | №0050 (+ 64 других файлов) |
| armor_component | №0815 |
| armorBonus | №0654 |
| armorClass | №0663 (+ 1 других файлов) |
| armoredAC | №0768 |
| armorer | №0659 (+ 2 других файлов) |
| armorOfFaith | №0792 |
| armorProficiency | №0802 |
| armorTriangles | №0052 |
| armorWear | №1091 |
| armour | №0056 |
| armpitL | №0048 (+ 1 других файлов) |
| armpitR | №0048 |
| armReaction | №0807 |
| arms | №0052 (+ 3 других файлов) |
| arr | №0791 |
| arrayBuffer | №1062 (+ 5 других файлов) |
| arrestingStrike | №0768 |
| ArrowDown | №0059 |
| arrowheads | №0656 (+ 1 других файлов) |
| ArrowLeft | №0059 |
| ArrowRight | №0059 |
| ArrowUp | №0059 |
| art | №0821 |
| artificer | №0652 (+ 2 других файлов) |
| artOfWar | №0768 |
| ascended | №0833 |
| ascensionLevel | №0703 |
| asi | №0664 (+ 28 других файлов) |
| asian | №1103 |
| asleep | №0807 |
| aspect | №0768 (+ 1 других файлов) |
| assessItem | №0653 |
| asset | №1098 (+ 1 других файлов) |
| assetId | №0052 (+ 3 других файлов) |
| astral | №0052 |
| astralConstruct | №0768 |
| asymmetric | №0055 |
| at | №0050 (+ 17 других файлов) |
| at11 | №0703 |
| at17 | №0703 |
| athletics | №0761 (+ 2 других файлов) |
| atob | №1196 (+ 2 других файлов) |
| atStartOfTurn | №1143 (+ 1 других файлов) |
| attach | №0053 (+ 1 других файлов) |
| attached | №0067 |
| attachment | №0858 |
| attack | №0067 (+ 20 других файлов) |
| attackAbility | №0067 |
| attackAction | №0768 |
| attackAgainstMode | №0816 |
| attackBonus | №0067 (+ 9 других файлов) |
| attackBonusAdjustment | №0630 |
| attackCantripSwap | №0798 |
| attackChain | №0765 |
| attackContext | №0630 (+ 1 других файлов) |
| attackCount | №0644 (+ 3 других файлов) |
| attackCrit | №0798 |
| attackDamageBonus | №0654 |
| attackDisadvantage | №0067 (+ 2 других файлов) |
| attackDisadvantageUnlessTargetsSelf | №0768 |
| attackDistanceFt | №1143 |
| attacker | №0630 (+ 13 других файлов) |
| attackerId | №0067 (+ 9 других файлов) |
| attackerPeerId | №0800 |
| attackKind | №0644 (+ 7 других файлов) |
| attackModifier | №0822 |
| attackModifiers | №0067 (+ 17 других файлов) |
| attackOrSpell | №0768 |
| attackPenalty | №0067 (+ 1 других файлов) |
| attackReplaced | №1149 |
| attackResult | №0630 (+ 5 других файлов) |
| attackRoll | №0768 |
| attacks | №0644 (+ 8 других файлов) |
| attacksAgainst | №0816 |
| attackSequence | №0644 (+ 1 других файлов) |
| attacksHaveAdvantage | №0067 |
| attackSight | №0807 |
| attackTarget | №1143 |
| attackTotal | №0800 (+ 3 других файлов) |
| attackType | №0749 (+ 18 других файлов) |
| attitudeIndifferent | №0768 |
| attitudeShift | №0768 |
| attributeFilter | №0829 (+ 1 других файлов) |
| attributes | №0829 (+ 3 других файлов) |
| attrs | №1059 |
| atWill | №0768 |
| atWillSuppress | №0768 |
| auraDebuff | №0798 |
| auraHoldTheLine | №0768 |
| auraOfCourage | №0637 |
| auraOfProtection | №0637 |
| auraRangeFt | №0798 |
| auraSource | №0644 (+ 1 других файлов) |
| author | №0060 |
| authoritativeSubclasses | №0066 (+ 13 других файлов) |
| authorityEpoch | №0799 (+ 5 других файлов) |
| authorityId | №0799 (+ 3 других файлов) |
| authoritySnapshot | №0854 |
| auto | №0800 |
| autoAnimalHandlingRampage | №0675 |
| autoCheckForUpdates | №0831 |
| autoFailed | №0630 (+ 2 других файлов) |
| autoFailHexSave | №0768 |
| autoFailSaveUses | №0768 |
| autoFailStrDex | №0816 (+ 2 других файлов) |
| autognome | №0661 |
| autoHideMenuBar | №0875 |
| automaticAssembly | №0055 |
| autoPlans | №0800 |
| autoSaveCurrentCharacter | №1150 (+ 2 других файлов) |
| autoTrigger | №0067 |
| available | №0794 (+ 1 других файлов) |
| availableFeatures | №0650 |
| avatars | №0828 |
| avatarStorm | №0798 |
| avian | №0050 (+ 1 других файлов) |
| avoidDeath | №0768 |
| awakened | №0703 (+ 1 других файлов) |
| Awakened | №0784 |
| awakenedRune | №0768 |
| awakening | №0792 |
| axes | №0052 |
| AXES | №0055 |
| azure | №0821 |
| b | №0857 (+ 17 других файлов) |
| back | №0051 (+ 3 других файлов) |
| background | №0613 (+ 5 других файлов) |
| backgroundColor | №0875 |
| backLower | №0048 |
| backslash | №0063 (+ 1 других файлов) |
| backslashTexture | №0065 |
| BackTexture | №1113 |
| backup | №0841 (+ 1 других файлов) |
| backUpper | №0048 |
| bad | №1069 |
| badlands | №0867 |
| badlands_canyon | №0867 |
| badlands_crater | №0867 |
| badlands_glass | №0867 |
| balanceCp | №0788 |
| balanced | №0048 |
| balancePreserved | №1153 |
| balefulInterdict | №0687 |
| balefulPresence | №0768 |
| band | №0653 |
| bandHeight | №0051 |
| bandTile | №0051 |
| bandTogether | №0768 |
| banished | №0768 |
| banner | №0056 |
| bard | №0787 (+ 1 других файлов) |
| bardicInspiration | №0637 (+ 1 других файлов) |
| barrel | №0056 |
| barter | №1153 |
| barycentricOutsideTolerance | №1108 |
| base | №0058 (+ 4 других файлов) |
| baseAc | №0800 (+ 1 других файлов) |
| baseAC | №0613 (+ 2 других файлов) |
| baseAcFormula | №0813 |
| baseColorFactor | №0058 (+ 1 других файлов) |
| baseColorSampler | №0058 |
| baseColorTexture | №0058 |
| baseCp | №0790 |
| baseFeatures | №0860 |
| baseId | №0663 |
| baseModel | №0055 (+ 1 других файлов) |
| baseObj | №1109 (+ 2 других файлов) |
| basePositions | №0051 (+ 2 других файлов) |
| basePositionsSha256 | №1244 |
| baseQualityScore | №0653 |
| baseUrl | №1094 (+ 1 других файлов) |
| basilisk | №0675 |
| bastionOfOrder | №0768 |
| battleBoard | №0837 (+ 1 других файлов) |
| battleBoardView | №0849 |
| battlefield | №1089 (+ 20 других файлов) |
| battlefieldAnalysis | №0765 |
| battlefieldSupport | №0728 |
| Battlemage | №0784 |
| battleMagic | №0637 |
| battleOver | №0772 |
| bboxDiagonalRatio | №1111 |
| beakColor | №0055 (+ 1 других файлов) |
| beakSize | №0055 (+ 3 других файлов) |
| beakStyle | №0052 (+ 3 других файлов) |
| beard | №0052 (+ 3 других файлов) |
| bearingDegrees | №0807 |
| beast | №0618 (+ 2 других файлов) |
| beast_tamer | №0771 |
| beastCommand | №0765 |
| beastCompanion | №0637 |
| beastheart | №0646 |
| beastheartEndTurn | №0645 |
| beastheartLevel | №0675 |
| beastheartStartTurn | №0645 |
| Beasthide | №0784 |
| beastMaster | №0646 |
| beastShape | №0768 |
| beastSpells | №0637 |
| becomeGhost | №0768 |
| bed | №0056 |
| before | №0816 (+ 1 других файлов) |
| beforeAttack | №0807 |
| beforeRoll | №0644 |
| beginBlind | №0810 |
| beginConcentration | №0644 |
| beginInitial | №0810 |
| beginLastStand | №0807 |
| beginOwnTurn | №0810 |
| beginWager | №0810 |
| behavior | №1168 |
| belt | №0051 |
| bench | №0056 |
| benefits | №0768 |
| berserker_rage | №0771 |
| bestAxisPermutation | №1111 |
| bestiaryVersion | №0617 (+ 12 других файлов) |
| bigby | №0617 |
| bin_bytes | №1100 |
| binary | №1244 |
| binarySha256 | №1244 |
| bindHost | №0805 |
| binding | №0630 |
| bindOnCharnelSpend | №0798 |
| bindPositions | №0047 |
| bindShell | №0773 |
| biomass | №0805 |
| biomassGained | №0805 |
| biomassHealing | №0828 |
| black | №0857 |
| Black | №0765 (+ 1 других файлов) |
| blackmarket | №0790 (+ 1 других файлов) |
| blackRider | №0798 |
| blacksmith | №0788 |
| blastCoating | №0666 |
| blastDice | №0067 |
| blastWave | №0768 |
| blend | №0050 |
| blessGuidance | №0768 |
| blessLike | №0067 |
| blind | №0765 |
| blindBeyond | №0807 |
| blinded | №0807 (+ 1 других файлов) |
| blinding | №0768 |
| Blindness | №0069 |
| blindsense | №0637 |
| blindsight | №0858 |
| blindsightFt | №0768 (+ 1 других файлов) |
| bloatedAgony | №0630 |
| Blob | №1181 (+ 5 других файлов) |
| block | №0833 |
| blocked | №0644 (+ 3 других файлов) |
| blocksIncorporealMovement | №0768 |
| blocksMovement | №0063 |
| bloodAscendent | №0798 |
| bloodCost | №0802 |
| bloodCostPerSpellLevel | №0802 |
| bloodCurseActor | №0644 (+ 1 других файлов) |
| bloodCurseAmplify | №0644 (+ 1 других файлов) |
| bloodCurseDistanceFt | №0644 (+ 1 других файлов) |
| bloodCurseExposure | №0644 |
| bloodCurseOfCorrosion | №0630 |
| bloodCurseOfHowl | №0630 |
| bloodCurseOfTheExorcist | №0630 |
| bloodCurses | №0677 |
| bloodCurseTargetsBloodless | №0768 |
| bloodhawk | №0675 |
| bloodhoundBruisers | №0705 |
| bloodHunterPuppet | №0630 (+ 1 других файлов) |
| bloodiedButUnbowed | №0705 (+ 1 других файлов) |
| bloodline | №0822 (+ 1 других файлов) |
| bloodlines | №0822 |
| bloodlustAdvantage | №0768 |
| bloodMaledict | №0630 (+ 1 других файлов) |
| bloodPrice | №0687 |
| bloodPriceAura | №0768 |
| bloodRiteRevival | №0644 |
| bludgeoning | №0860 |
| blue | №0821 |
| blushColor | №0055 |
| blushOpacity | №1258 |
| bob | №0050 (+ 1 других файлов) |
| bodiesCount | №0067 (+ 1 других файлов) |
| bodiesSpent | №0067 |
| body | №0055 (+ 35 других файлов) |
| bodyAccessories | №0050 |
| bodyColor | №0055 (+ 9 других файлов) |
| bodyDefaults | №0055 |
| bodyDestroyed | №0858 |
| bodyH | №0048 (+ 2 других файлов) |
| bodyHorror | №0618 |
| bodyHP | №0858 |
| bodyMaxHP | №0858 |
| bodyName | №0858 |
| bodyPossession | №0798 |
| bodyPreset | №0048 |
| bodyStats | №0805 |
| bodyTint | №0055 (+ 1 других файлов) |
| bolsteringSuppression | №0768 |
| bomb | №0666 (+ 1 других файлов) |
| bombDamage | №0666 |
| bombFormulas | №0666 |
| bombImmunity | №0768 |
| bombs | №0666 |
| bondedTarget | №0768 |
| bondOfBloodthirst | №0768 |
| bondOwnerId | №0807 |
| bondPartnerId | №0807 |
| bonds | №0675 |
| bondWilling | №0808 (+ 2 других файлов) |
| bone | №0656 (+ 1 других файлов) |
| boneAsh | №0662 |
| boneSpurring | №0768 |
| boneStock | №0656 (+ 1 других файлов) |
| boneStockV49 | №0656 |
| bonus | №0067 (+ 66 других файлов) |
| bonusAC | №0768 |
| bonusAction | №0067 (+ 27 других файлов) |
| bonusActionAfflict | №0768 |
| bonusActionAttack | №0765 |
| bonusActionAttackAfterExploit | №0768 |
| bonusActionAttackAfterSpell | №0802 |
| bonusActionAttacks | №0768 |
| bonusActionDash | №0067 |
| bonusActionDisengageOrHide | №0768 |
| bonusActionDisengageOrSearch | №0768 |
| bonusActionExtraWeaponAttack | №0768 |
| bonusActionFear30 | №0768 |
| bonusActionOrder | №0768 |
| bonusActions | №0647 |
| bonusActionSeed | №0798 |
| bonusActionSupport | №0765 |
| bonusActionSupportOrder | №0768 |
| bonusActionUnarmedOrGrapple | №0768 |
| bonusActionWeaponAttack | №0630 |
| bonusAttack | №0630 (+ 3 других файлов) |
| bonusAttackAfterInvoke | №0768 |
| bonusAttackVsFrightened | №0768 |
| bonusCantrip | №0768 |
| bonusCharnelTouchAfterAttack | №0798 |
| bonusDamage | №0067 (+ 9 других файлов) |
| bonusDamageDice | №0768 |
| bonusDamageDie | №0768 |
| bonusDamageOnHit | №0768 |
| bonusDash | №0768 |
| bonusDie | №0802 |
| bonuses | №0073 (+ 6 других файлов) |
| bonusFireDamage | №0675 |
| bonusGrapple | №0768 |
| bonusHealing | №0768 |
| bonusHp | №0768 (+ 1 других файлов) |
| bonusHpDice | №0768 |
| bonusKnownSpells | №0768 |
| bonusMaxHP | №0768 |
| bonusMeleeAttack | №0768 |
| bonusSpell | №0802 |
| bonusSpells | №0802 |
| bonusSteps | №0798 |
| bonusStrDexConRolls | №0768 |
| bonusWeaponAttackAfterCantrip | №0768 |
| book | №0056 |
| bookshelf | №0056 |
| boon | №0768 |
| boots | №0051 (+ 1 других файлов) |
| bottle | №0056 |
| bottom | №0055 (+ 6 других файлов) |
| boundary | №0047 |
| bounds | №0050 (+ 2 других файлов) |
| bountiful_luck | №0771 |
| bovineEarSize | №0055 (+ 1 других файлов) |
| bowDamageBonus | №0768 |
| bowyer | №0659 |
| boxingTechnique | №0765 |
| bra | №0051 |
| braceUp | №0768 |
| braid | №0050 (+ 1 других файлов) |
| brainsOverBrawn | №0768 |
| bramble | №0067 |
| brambleBomb | №0768 |
| brand | №0768 |
| brandAllyDistanceFt | №0644 |
| brandCastigation | №0644 (+ 2 других файлов) |
| brandOfAxiom | №0630 |
| brandOfCastigation | №0630 (+ 1 других файлов) |
| brandOfSundering | №0630 |
| brandOfTethering | №0630 (+ 1 других файлов) |
| brandOfVoracious | №0630 |
| brandSappingScar | №0630 |
| brawling | №0768 |
| breakConcentration | №0644 |
| breastSize | №0052 (+ 2 других файлов) |
| Breathing | №0069 |
| brew | №0802 |
| brewer | №0659 (+ 3 других файлов) |
| brewMinutes | №0798 |
| briefs_female | №0051 |
| briefs_male | №0051 |
| brightLightFt | №0768 |
| brightLightRadiusFt | №0768 |
| broken | №0055 (+ 2 других файлов) |
| browHeight | №0055 |
| browRidge | №0055 |
| browser | №1239 |
| brutalCritical | №0637 |
| bt_a | №1220 |
| bt_ally | №1114 (+ 5 других файлов) |
| bt_b | №1220 |
| bt_enemy | №1114 (+ 6 других файлов) |
| bt_friend | №1119 |
| bt_own | №1133 |
| bt_owner | №1116 (+ 1 других файлов) |
| bt_self | №1114 (+ 4 других файлов) |
| btoa | №1196 (+ 2 других файлов) |
| bubbles | №0689 |
| budgets | №0048 |
| buf | №0062 |
| buff | №0807 |
| buffer | №1097 (+ 3 других файлов) |
| buffers | №0058 (+ 3 других файлов) |
| bufferView | №1097 (+ 3 других файлов) |
| bufferViews | №1098 (+ 1 других файлов) |
| build | №0047 (+ 3 других файлов) |
| buildAnimations | №0057 |
| builder | №0659 |
| buildFeatureSet | №0637 (+ 2 других файлов) |
| bulette | №0675 |
| bull | №0050 |
| bullMuzzleSize | №0055 (+ 1 других файлов) |
| bun | №0050 (+ 1 других файлов) |
| burden | №0792 (+ 1 других файлов) |
| Burned | №0768 |
| burning | №0067 (+ 1 других файлов) |
| burningTicks | №1057 |
| burstDamage | №0768 |
| burstRadiusFt | №0768 |
| buttocks | №0048 |
| buttonColor | №0051 (+ 2 других файлов) |
| buttons | №0051 (+ 3 других файлов) |
| buy | №0788 (+ 2 других файлов) |
| buyFactor | №0788 (+ 1 других файлов) |
| bypassesTempHP | №0792 |
| byteLength | №1097 (+ 3 других файлов) |
| byteOffset | №1097 (+ 3 других файлов) |
| bytes | №0831 (+ 7 других файлов) |
| bytesDone | №0831 (+ 2 других файлов) |
| bytesTotal | №0831 (+ 2 других файлов) |
| c | №0800 (+ 19 других файлов) |
| cabinet | №0056 |
| cache | №0831 (+ 2 других файлов) |
| cackle | №0768 |
| calcifyingStrike | №0768 |
| calculateAC | №0816 |
| calculatedCombustion | №0768 |
| calculatedFlourish | №0818 |
| calculateEncounter | №0794 |
| calculateMaxHP | №0828 |
| call | №1149 |
| callAPI | №0842 |
| callFromBelow | №0768 |
| calligrapher | №0659 (+ 1 других файлов) |
| callOfIron | №0768 |
| calls | №0860 (+ 2 других файлов) |
| callToHavok | №0768 |
| campaign | №0837 |
| campaignEvent | №0772 |
| campaignEvents | №1170 |
| campaigns | №0631 |
| canAncestorAttack | №0807 |
| canApplyNatively | №0831 |
| canBarter | №0790 |
| canBecomeHuge | №0768 |
| canBurnSealForBlind | №0768 |
| canCaptureHost | №0805 |
| canCast | №0807 |
| cancel | №0875 |
| cancelReaction | №0807 |
| canCounter | №0768 |
| canCraftRecipe | №0659 |
| canDisassemble | №0654 |
| candle | №0056 |
| canEnterHost | №0805 |
| canHear | №1143 |
| canid | №0763 |
| canMerge | №0828 |
| canMove | №0807 |
| cannotBecomeRitual | №0802 |
| cannotLie | №0807 |
| cannotSurprise | №0765 |
| CANONICAL_2024_SUBCLASSES | №0067 |
| canopicJars | №0798 |
| canReceiveHealing | №0773 (+ 1 других файлов) |
| canRepair | №0654 |
| canRestHealBody | №0773 (+ 2 других файлов) |
| canSee | №0807 |
| canTarget0Hp | №0768 |
| cantrip | №0067 (+ 3 других файлов) |
| cantrips | №0630 (+ 4 других файлов) |
| cantripsByLevel | №0798 |
| cantripsKnown | №0696 (+ 2 других файлов) |
| canWalk | №0060 |
| cap | №0051 |
| capaciousAnathema | №0768 |
| capacity | №0768 (+ 4 других файлов) |
| capacityByLevel | №0802 |
| capacityFt3 | №0802 |
| capColor | №0055 (+ 1 других файлов) |
| cape | №0051 |
| capeWidth | №0051 |
| capSize | №0055 (+ 1 других файлов) |
| captain | №0728 (+ 1 других файлов) |
| capture | №0852 |
| capturedAt | №0805 |
| captureHost | №0805 |
| caravan | №0788 (+ 2 других файлов) |
| caravan_master | №0790 (+ 1 других файлов) |
| card | №0810 |
| cardId | №0807 |
| cards | №0810 (+ 2 других файлов) |
| careful | №0637 |
| carpenter | №0658 (+ 4 других файлов) |
| carried | №0795 |
| carryCapacity | №0802 |
| carryingCapacityMultiplier | №0768 |
| cart | №0056 |
| cartographer | №0657 (+ 5 других файлов) |
| cartographyQuality | №0660 |
| case | №0637 (+ 2 других файлов) |
| castAsRitual | №0802 |
| caster | №0644 (+ 3 других файлов) |
| casterId | №0808 (+ 1 других файлов) |
| casterLevel | №0787 (+ 2 других файлов) |
| castIllriggerActionSpell | №0768 |
| castingClass | №0800 (+ 5 других файлов) |
| castingStat | №0800 (+ 4 других файлов) |
| castingTime | №0749 (+ 16 других файлов) |
| castLucidSpellFree | №0768 |
| castSpell | №0768 (+ 1 других файлов) |
| castSpellInAttack | №0768 |
| castWish | №0768 |
| cat | №0050 (+ 21 других файлов) |
| cataclysm | №0833 |
| cataclysmicStrike | №0768 |
| catalog | №0617 (+ 27 других файлов) |
| catalogKey | №0808 (+ 2 других файлов) |
| catalyst | №0069 |
| catalystId | №0069 |
| catalystReagent | №0815 |
| catalysts | №0068 |
| catEarSize | №0055 (+ 2 других файлов) |
| categories | №0791 |
| category | №0063 (+ 50 других файлов) |
| catMuzzleSize | №0055 (+ 3 других файлов) |
| caucasian | №1103 |
| cauldron | №0056 (+ 1 других файлов) |
| causal | №0817 |
| ceilingCollision | №0807 |
| celerity | №0630 |
| Celerity | №0768 |
| celestial | №0052 (+ 14 других файлов) |
| celestialDiscourse | №0768 |
| celestialStance | №0768 |
| cell | №0060 (+ 1 других файлов) |
| cellFt | №0850 (+ 20 других файлов) |
| cellPx | №1199 |
| cellSize | №1106 |
| censurePeacemaker | №0768 |
| centaur | №1270 |
| centaurIndices | №0050 |
| centaurSize | №0055 (+ 2 других файлов) |
| center | №0050 (+ 14 других файлов) |
| centerY | №0047 |
| ceramic | №0657 (+ 2 других файлов) |
| cha | №0613 (+ 52 других файлов) |
| chaChecksAdvantage | №0768 |
| chaChecksDisadvantage | №0630 (+ 1 других файлов) |
| chain | №0067 |
| chainReport | №0656 |
| chair | №0056 |
| championCalls | №0724 |
| chance | №0763 (+ 3 других файлов) |
| chandelier | №0056 |
| changedVertices | №1102 |
| changeShape | №0802 |
| channel | №0799 (+ 3 других файлов) |
| channelDivinity | №0637 (+ 3 других файлов) |
| channels | №0057 |
| chant | №0817 |
| character | №0795 (+ 6 других файлов) |
| characterId | №0055 (+ 33 других файлов) |
| characterName | №1196 |
| characters | №0642 (+ 2 других файлов) |
| charcoal | №0657 (+ 3 других файлов) |
| charcoalFine | №0662 |
| charge | №0768 |
| chargeOnDeflect | №0067 |
| charges | №0637 (+ 2 других файлов) |
| chargesMax | №0637 |
| chargesSpent | №0067 (+ 1 других файлов) |
| chargeTempHP | №0768 |
| chargeWeapon | №0067 |
| charisma | №0775 (+ 10 других файлов) |
| charismaChecksAdvantage | №0630 |
| charismaReferencesUse | №0768 |
| charmed | №0807 (+ 2 других файлов) |
| charmedHours | №0768 |
| charmEffect | №0644 |
| charmOrCompel | №0768 |
| charmSourceId | №0807 |
| charnelHitThreshold | №0798 |
| charnelTouch | №0798 |
| charnelTouchMax | №0798 |
| charnelTouchSpendMax | №0798 |
| chaSave | №0768 |
| chaSavesDisadvantage | №0630 (+ 1 других файлов) |
| cheapShot | №0768 |
| check | №0768 (+ 2 других файлов) |
| checkAndStage | №0831 |
| checkBonus | №0659 (+ 1 других файлов) |
| checkBonusAll | №0661 |
| checked | №1122 (+ 1 других файлов) |
| checkMageTrack | №0807 |
| checkModifiers | №0067 (+ 6 других файлов) |
| checkResult | №1149 |
| checks | №0768 (+ 1 других файлов) |
| cheekbones | №0052 (+ 1 других файлов) |
| chef | №0661 |
| chest | №0048 (+ 6 других файлов) |
| chestShape | №1060 |
| Chieftain | №0784 |
| childAppearance | №0807 |
| childList | №0781 (+ 5 других файлов) |
| children | №1063 (+ 2 других файлов) |
| chinLength | №0052 (+ 1 других файлов) |
| chitin | №0815 |
| chitinPlate | №0656 (+ 1 других файлов) |
| choice | №0800 (+ 4 других файлов) |
| choiceMode | №0810 |
| choices | №0630 (+ 2 других файлов) |
| choiceSaved | №0860 (+ 1 других файлов) |
| choose | №0664 (+ 23 других файлов) |
| chooseAnyAilments | №0768 |
| chooseBeforeRoll | №0768 |
| chooseBond | №0675 |
| chooseCompanion | №0675 |
| chooseCraft | №0768 |
| chooseGrandHex | №0768 |
| chooseHex | №0768 |
| chooseKnown | №0630 |
| chooseMovement | №0067 |
| chooseResistance | №0067 |
| chooseSavingThrowProficiency | №0768 |
| chooseSpecialization | №0659 |
| chosenCreatureId | №0066 (+ 1 других файлов) |
| cinzel | №0821 |
| circumcised | №0048 |
| cl | №0062 |
| claimReward | №0807 |
| claimWagerReward | №0810 |
| clairvoyance | №0765 |
| clandestineSource | №0768 |
| class | №0613 (+ 3 других файлов) |
| CLASS | №0630 |
| CLASS_NAMES | №0637 |
| classAbilities | №0768 |
| classBonus | №0644 (+ 1 других файлов) |
| classes | №0775 (+ 46 других файлов) |
| CLASSES_REFERENCE | №1237 |
| classFeatureIds | №0800 (+ 5 других файлов) |
| classFeatureNotes | №0644 (+ 1 других файлов) |
| classFeaturesState | №0067 (+ 21 других файлов) |
| classKey | №0816 |
| classLevel | №0816 |
| classList | №1099 |
| className | №0613 (+ 56 других файлов) |
| clawColor | №0055 |
| clawSize | №0055 (+ 2 других файлов) |
| clay | №0657 (+ 2 других файлов) |
| cleanHead | №0055 |
| cleansed | №0807 |
| cleansingTouch | №0637 |
| clear | №0058 (+ 6 других файлов) |
| clearTimeout | №0652 (+ 5 других файлов) |
| cleric | №0787 (+ 1 других файлов) |
| clientId | №0799 (+ 5 других файлов) |
| clientX | №0852 (+ 1 других файлов) |
| clientY | №0852 (+ 1 других файлов) |
| climb | №0798 |
| climbSpeed | №0067 (+ 1 других файлов) |
| clingingCurse | №0768 |
| clone | №0060 (+ 1 других файлов) |
| close | №0052 (+ 9 других файлов) |
| closed | №0778 |
| closedChains | №0656 |
| closeReplay | №0836 |
| closet | №0056 |
| cloth | №0656 (+ 4 других файлов) |
| clothes | №1284 |
| clothing | №0051 (+ 18 других файлов) |
| clothingBuilds | №0052 |
| clothingId | №0051 |
| clothingTriangles | №0052 |
| cloudId | №0642 |
| cloudScope | №0049 |
| cls | №0637 |
| club | №1146 |
| coast | №0788 (+ 1 других файлов) |
| coast_caves | №0867 |
| coast_cliffs | №0867 |
| coast_grotto | №0867 |
| cobbler | №0659 (+ 3 других файлов) |
| code | №1089 |
| coins | №1155 (+ 3 других файлов) |
| col | №0062 (+ 1 других файлов) |
| cold | №0630 (+ 2 других файлов) |
| Cold | №0069 |
| collar | №0051 |
| collect | №0795 (+ 3 других файлов) |
| collectiveBody | №0828 |
| collectLoot | №0772 |
| color | №0048 (+ 9 других файлов) |
| colors | №0062 (+ 2 других файлов) |
| cols | №0067 (+ 21 других файлов) |
| column | №0840 |
| combat | №0837 (+ 1 других файлов) |
| combatant | №0645 |
| combatantId | №0772 (+ 2 других файлов) |
| combatants | №0067 (+ 51 других файлов) |
| combatEnd | №0807 |
| combatHooks | №0696 |
| combatInsight | №0802 |
| combatInspiration | №0637 |
| combatLog | №0854 |
| combatMasteries | №0687 |
| combatMastery | №0687 (+ 1 других файлов) |
| combatOnly | №0807 |
| combatTurnGate | №0675 |
| combineDisciplines | №0768 |
| combustion | №0768 |
| command | №0645 (+ 3 других файлов) |
| commandable | №0768 |
| Commander | №0784 |
| commandFamiliarAndUndeadTogether | №0768 |
| commandRangeMultiplier | №0765 |
| commands | №0768 |
| commandSpellsWithoutSlot | №0798 |
| commandWithoutFear | №0765 |
| commit | №1244 (+ 1 других файлов) |
| commitHostEvent | №1142 (+ 7 других файлов) |
| committed | №0654 |
| common | №0782 (+ 5 других файлов) |
| commonPeopleBonus | №0768 |
| companion | №0067 (+ 4 других файлов) |
| companionACBonus | №0675 |
| companionAction | №0765 |
| companionActor | №0675 |
| companionAttack | №0765 |
| companionDamage | №0765 |
| companionExtraAttack | №0765 |
| companionMagicAttacks | №0765 |
| companionRampage | №0765 |
| companionResistance | №0675 |
| companions | №0675 |
| companionType | №0067 (+ 2 других файлов) |
| compareVersions | №0831 |
| compatibility | №0831 |
| completeAttack | №0824 |
| components | №0057 (+ 14 других файлов) |
| componentType | №1097 (+ 3 других файлов) |
| compositeTerms | №1294 |
| compositions | №1244 |
| compressionLock | №0768 |
| con | №0613 (+ 55 других файлов) |
| concealPsionics | №0768 |
| concentration | №0644 (+ 31 других файлов) |
| concentrationCheck | №0644 |
| concentrationDC | №0816 |
| concentrationSaveBonus | №0768 |
| concentrationState | №0644 |
| concussion | №0067 |
| concussionBomb | №0768 |
| condition | №0067 (+ 11 других файлов) |
| conditionApplied | №0768 |
| conditionChoice | №0675 |
| conditionImmune | №0630 |
| conditionImmunity | №0768 |
| conditionLabel | №0653 |
| conditionModeApplied | №0644 |
| conditionModifiers | №0816 (+ 2 других файлов) |
| conditionNotes | №1136 |
| conditionRemoved | №0860 |
| conditions | №0644 (+ 17 других файлов) |
| CONDITIONS | №0644 (+ 2 других файлов) |
| conditionsImmune | №0647 |
| coneWisdomSave | №0768 |
| config | №0839 |
| configurable | №0807 |
| configure | №0642 |
| configured | №0642 (+ 1 других файлов) |
| confirm | №1059 (+ 3 других файлов) |
| conflict | №0068 (+ 1 других файлов) |
| conflicts | №0642 |
| connected | №0799 (+ 2 других файлов) |
| conSave | №0768 |
| conscious | №0807 |
| console | №1099 |
| constant | №0644 (+ 7 других файлов) |
| constitution | №0775 (+ 12 других файлов) |
| Constitution | №0069 |
| constitutionHalfDamageFailure | №0768 |
| constitutionHalfDamageSuccess | №0768 |
| constitutionMaxBonus | №0768 |
| construct | №0617 (+ 12 других файлов) |
| constructBody | №0798 |
| constructConcentration | №0768 |
| constructDamageBonus | №0768 |
| constructMode | №0768 |
| consumableFunctional | №1153 |
| consumables | №0782 (+ 31 других файлов) |
| consume | №0661 (+ 1 других файлов) |
| consumed | №0661 (+ 2 других файлов) |
| consumedPotion | №0067 |
| consumeLairAction | №0794 |
| consumeLegendaryAction | №0794 |
| consumeLegendaryResistance | №0794 |
| consumeMageBerry | №0807 |
| consumeMagicMeleeWeapon | №0768 |
| consumeMaximum | №0807 |
| consumeOn | №0807 |
| consumePendingOnHit | №0637 (+ 1 других файлов) |
| consuming | №0703 (+ 1 других файлов) |
| Consuming | №0784 |
| consumption | №0768 |
| container | №0778 |
| containerId | №1124 |
| containerRequired | №0768 |
| containers | №0795 (+ 6 других файлов) |
| containerType | №0778 |
| content | №0060 (+ 1 других файлов) |
| contentPackId | №0067 (+ 6 других файлов) |
| contents | №0778 (+ 6 других файлов) |
| contentType | №1260 |
| context | №0644 (+ 1 других файлов) |
| contextIsolation | №0875 |
| contextRestore | №1257 |
| contingencyPlan | №0768 |
| contracts | №0687 |
| controlMode | №0067 (+ 5 других файлов) |
| controlWithoutAction | №0768 |
| controlWithSameAction | №0768 |
| conversant | №0630 |
| Conversant | №0768 |
| convertDamage | №0802 |
| cook | №0659 (+ 4 других файлов) |
| coordinatedAssault | №0768 |
| copper | №0662 |
| copy | №0647 |
| copyDeleted | №0642 |
| core | №0784 |
| CORE | №0637 |
| core_2014 | №0617 |
| coreLoop | №0696 |
| corpseFlorist | №0798 |
| corpseId | №0798 |
| corpseTypes | №0768 |
| corrosion | №0630 (+ 1 других файлов) |
| corset | №1070 |
| cost | №0067 (+ 36 других файлов) |
| costGp | №0788 (+ 4 других файлов) |
| costs | №0613 (+ 1 других файлов) |
| cot | №0056 |
| cotton | №0051 (+ 1 других файлов) |
| counselorProtege | №0768 |
| count | №0050 (+ 64 других файлов) |
| counter | №0056 |
| counterAttackIfReducedToZero | №0768 |
| countercharm | №0637 |
| countered | №0800 |
| countsAsHit | №0768 |
| courageSource | №0644 |
| coven | №0802 |
| covens | №0696 |
| cover | №0800 (+ 6 других файлов) |
| coverBonus | №0800 (+ 1 других файлов) |
| covered | №0048 |
| coversTop | №0051 |
| cp | №0779 (+ 7 других файлов) |
| cr | №0617 (+ 18 других файлов) |
| craft | №0768 (+ 4 других файлов) |
| craftBonus | №0797 |
| craftCheck | №0660 (+ 1 других файлов) |
| craftDC | №0660 (+ 1 других файлов) |
| crafted | №0069 (+ 5 других файлов) |
| craftedOnly | №0782 |
| craftEffect | №0660 |
| craftFeature | №0768 |
| craftingBonus | №0652 (+ 3 других файлов) |
| craftingMaterial | №0653 |
| craftingProfessions | №0658 (+ 2 других файлов) |
| craftingProfile | №0661 |
| craftingSources | №0661 |
| craftMasterworkBonus | №0654 (+ 2 других файлов) |
| craftMaterialId | №0617 (+ 14 других файлов) |
| craftOutcome | №0661 (+ 1 других файлов) |
| craftProfession | №0660 (+ 1 других файлов) |
| craftQuality | №0654 (+ 6 других файлов) |
| craftQualityLabel | №0663 |
| craftRecipe | №0657 (+ 3 других файлов) |
| craftRoll | №0663 |
| CRAFTS | №0768 |
| craftTags | №0656 |
| craftTime | №0657 (+ 2 других файлов) |
| craftTools | №0657 |
| craftValue | №0660 (+ 1 других файлов) |
| craftValueNote | №0654 |
| crate | №0056 |
| create | №0065 (+ 7 других файлов) |
| createAvatar | №0828 |
| createBodyStatBlock | №0858 |
| createBoneObject | №0768 |
| createCharacter | №0055 |
| created | №0768 (+ 1 других файлов) |
| createdAt | №0060 (+ 8 других файлов) |
| createdAtTurn | №0067 |
| createElement | №1059 (+ 23 других файлов) |
| createFor | №0646 (+ 2 других файлов) |
| createHostStatBlock | №0805 |
| createLarvaStatBlock | №0805 |
| createObjectURL | №1199 |
| createOozeDuplicate | №0067 |
| createProjectedItem | №0768 |
| createRoom | №1196 |
| createShell | №0773 |
| creationOptions | №0807 |
| creator | №0784 |
| creatorMind | №0768 |
| creatures | №0828 |
| creatureType | №0635 (+ 12 других файлов) |
| crescendoOfViolence | №0768 |
| crest | №0050 |
| crestSize | №0055 (+ 1 других файлов) |
| crewLeader | №0768 |
| crewRangeFt | №0768 |
| crewSaveBonus | №0768 |
| crewSize | №0768 |
| crewSupport | №0765 |
| criminalContact | №0768 |
| crimson | №0821 |
| crimsonRite | №0630 |
| crimsonRites | №0677 |
| cripplingJinx | №0768 |
| cripplingStrike | №0768 |
| critFearAoEFt | №0630 |
| critical | №0644 (+ 35 других файлов) |
| critical_failure | №0653 (+ 1 других файлов) |
| criticalDoubles | №0768 (+ 1 других файлов) |
| criticalHit | №0768 |
| criticalOn | №0765 |
| criticalOnHit | №0768 |
| criticalRange | №0637 (+ 2 других файлов) |
| criticalSpellcasting | №0798 |
| critRange | №0630 |
| critWithRiteRestoresBloodMaledict | №0768 |
| crLimit | №0768 |
| crone | №0798 |
| crop | №0050 |
| crow | №0050 |
| crown | №0050 (+ 1 других файлов) |
| crown_braid | №0050 (+ 1 других файлов) |
| crownColor | №0055 (+ 1 других файлов) |
| crownSize | №0055 (+ 3 других файлов) |
| crScale | №0067 |
| crTotal | №0798 |
| cruelty | №0630 |
| Cruelty | №0768 |
| cryo | №0067 |
| cryoBomb | №0768 |
| crypto | №1064 (+ 25 других файлов) |
| crystal | №0657 (+ 3 других файлов) |
| cssText | №1119 |
| ctx | №0062 (+ 1 других файлов) |
| cube | №0675 |
| cunningAction | №0637 |
| cunningInstinct | №0768 |
| cupNumber | №0807 (+ 3 других файлов) |
| cups | №0051 (+ 2 других файлов) |
| cups_05 | №0807 |
| cups_13 | №0807 |
| cupsize | №1103 |
| curl | №0050 |
| curly_long | №0050 (+ 1 других файлов) |
| curly_short | №0050 (+ 1 других файлов) |
| current | №0060 (+ 34 других файлов) |
| currentCampaignId | №0631 |
| currentChar | №1150 (+ 5 других файлов) |
| currentCharacter | №1169 |
| currentFloor | №0060 |
| currentHP | №0773 (+ 3 других файлов) |
| currentId | №0836 |
| currentLevel | №0659 |
| currentVersion | №0831 |
| curse | №0066 (+ 10 других файлов) |
| curseAbility | №0066 |
| curseAbilityCheckDC | №0768 |
| curseBonusDamage | №0630 |
| curseCombination | №0768 |
| curseConcentrationAdvantage | №0802 |
| cursed | №0052 (+ 1 других файлов) |
| cursedAttackPenalty | №0630 |
| cursedCheckModifiers | №0630 |
| curseDetection30 | №0768 |
| cursedSaveModifiers | №0630 |
| curseImmunity | №0768 |
| curseItem | №0802 |
| curseMastery | №0765 |
| curseName | №0768 |
| cursePenalty | №0798 |
| cursePower | №0765 |
| curses | №0630 (+ 4 других файлов) |
| CURSES | №0768 |
| curseSave | №0798 |
| curseSpecialist | №0630 |
| curseSpells | №0768 |
| curseTarget | №0768 |
| custom | №0055 (+ 2 других файлов) |
| customColor | №0050 (+ 2 других файлов) |
| customCrafted | №0663 |
| customDress | №0051 |
| CustomEvent | №1099 (+ 1 других файлов) |
| customizations | №1068 (+ 1 других файлов) |
| customShirt | №0051 |
| customSkirt | №0051 |
| cut | №0051 (+ 2 других файлов) |
| cutoff | №1294 |
| cwd | №1056 (+ 1 других файлов) |
| cx | №0047 (+ 2 других файлов) |
| cycles | №0814 (+ 1 других файлов) |
| cz | №0050 (+ 1 других файлов) |
| d | №0047 (+ 6 других файлов) |
| d2 | №1105 (+ 2 других файлов) |
| d20 | №0644 (+ 2 других файлов) |
| d20Modifiers | №0807 |
| d6 | №0067 |
| damage | №0063 (+ 89 других файлов) |
| DAMAGE_TYPES | №0644 |
| damageAfter | №0768 |
| damageAtTurnStart | №0067 |
| damageBefore | №0768 |
| damageBody | №0805 (+ 1 других файлов) |
| damageBonus | №0768 (+ 1 других файлов) |
| damageBonusMultiplier | №0768 |
| damageBoost | №0765 |
| damageContext | №0800 |
| damageDice | №0067 (+ 14 других файлов) |
| damageDie | №0765 (+ 1 других файлов) |
| damageDoubled | №0644 |
| damageDurability | №0655 |
| damageImmunity | №0768 |
| damageModifiers | №0630 (+ 1 других файлов) |
| damageMult | №0828 |
| damageOnFailedSave | №0768 |
| damageParts | №0630 (+ 6 других файлов) |
| damagePer10Ft | №0768 |
| damagePerTrigger | №0768 |
| damageRedirect | №0802 |
| damageReduction | №0637 (+ 4 других файлов) |
| damageResistance | №0765 (+ 1 других файлов) |
| damageResult | №0644 (+ 1 других файлов) |
| damageRoll | №0067 (+ 4 других файлов) |
| damageRolled | №0807 |
| damageSelf | №0768 |
| damageShell | №0773 |
| damageTaken | №0644 |
| damageType | №0067 (+ 84 других файлов) |
| damageTypeChoice | №0768 |
| damageTypes | №0067 (+ 5 других файлов) |
| danceBonusByCount | №0798 |
| dangerSense | №0637 |
| daringRescue | №0768 |
| dark | №0857 |
| darkArcana | №0798 |
| darkAugmentation | №0630 |
| darkCaptain | №0768 |
| darkDelirium | №0800 |
| darkMagic | №0765 |
| darkness | №0060 (+ 1 других файлов) |
| darknessAroundInterdictedFt | №0768 |
| darkOneDiscourse | №0768 |
| darkOnesBlessing | №0637 |
| darkvision | №0822 |
| darkvision60 | №0768 |
| darkvisionBonusFt | №0630 |
| darkvisionFt | №0630 (+ 1 других файлов) |
| dash | №0765 |
| dashMageRetreat | №0807 |
| dastardlyTalents | №0768 |
| data | №0066 (+ 10 других файлов) |
| dataset | №1084 |
| date | №0631 (+ 1 других файлов) |
| dauntless | №0728 |
| dawn | №0630 |
| day | №0062 |
| dc | №0066 (+ 45 других файлов) |
| dcReduction | №0661 |
| dead | №0067 (+ 6 других файлов) |
| deadMistAcolyte | №0798 |
| deadShell | №0773 |
| deadSpace | №0768 (+ 1 других файлов) |
| deadSpaceSlots | №0798 |
| deafened | №0067 (+ 1 других файлов) |
| deathAfterDuration | №0768 |
| deathCause | №1058 |
| deathExplosion | №0798 |
| deathKnight | №0798 |
| deathPenalty | №0768 |
| deathSave | №0644 |
| deathSaveDisadvantage | №0630 (+ 1 других файлов) |
| deathSaveFailures | №0644 |
| deathSaves | №0644 (+ 6 других файлов) |
| deathWard | №0802 |
| debug | №0837 |
| decayPerHour | №0067 |
| deception | №0761 (+ 1 других файлов) |
| deceptionBlocked | №0807 |
| deceptionIntent | №1137 |
| deceptionTotal | №0067 (+ 1 других файлов) |
| deck | №0810 (+ 1 других файлов) |
| decks | №0810 |
| declaredSourceCommit | №1294 |
| decorateItem | №0659 |
| deepSleeper | №0768 |
| deerHide | №0662 |
| default | №0055 (+ 2 других файлов) |
| DEFAULT | №0060 |
| DEFAULT_ENABLED | №0655 |
| DEFAULT_RACES | №1237 |
| defaultEnabled | №1091 |
| defaultSkinByGender | №0055 |
| defaultSkinId | №0055 |
| defeat | №0827 |
| defeated | №0067 (+ 9 других файлов) |
| defenderAura | №0765 |
| defenderReaction | №0644 (+ 4 других файлов) |
| defensive_duelist | №0771 |
| defensiveStance | №0768 |
| deferDamage | №0800 (+ 1 других файлов) |
| definition | №0807 |
| definitions | №0807 |
| deflected | №0644 |
| deflectMissiles | №0637 |
| deformAsset | №0057 |
| deformedPositions | №1081 |
| deftness | №0630 |
| Deftness | №0768 |
| deinonychus | №0675 |
| deleted | №0642 (+ 1 других файлов) |
| denial | №0768 |
| deniesActions | №0067 |
| denominator | №0810 |
| density | №0048 (+ 2 других файлов) |
| denValues | №0051 |
| denyAttackAdvantage | №0768 |
| denyBonusActions | №0067 |
| denyDashDisengageDodge | №0067 |
| depleted | №1151 |
| depth | №0050 (+ 4 других файлов) |
| desc | №0613 (+ 13 других файлов) |
| describeProfession | №0659 |
| description | №0060 (+ 70 других файлов) |
| descriptor | №0048 |
| deserialize | №0055 |
| desk | №0056 |
| destination | №0807 (+ 7 других файлов) |
| destinationGender | №1294 |
| destroy | №0832 |
| destroyThrallToHeal | №0798 |
| destroyUndead | №0637 |
| detail | №0055 (+ 3 других файлов) |
| details | №0773 (+ 3 других файлов) |
| detectIllusionAndShapeshifter | №0768 |
| detectMagic | №0768 (+ 1 других файлов) |
| dethek | №0768 (+ 1 других файлов) |
| dethekStance | №0768 |
| devicePixelRatio | №1059 (+ 1 других файлов) |
| devices | №0659 |
| deviceScaleFactor | №1272 |
| devilDamageMaximum | №0807 |
| devilPlan | №0807 |
| deviousTactics | №0768 |
| devouring | №0768 (+ 1 других файлов) |
| devTools | №0875 |
| dex | №0613 (+ 56 других файлов) |
| dexBonus | №0630 |
| dexChecksAdvantage | №0630 (+ 1 других файлов) |
| dexIncrease | №0768 |
| dexMaxBonus | №0630 |
| dexMaxIncrease | №0768 |
| dexSave | №0768 |
| dexSavesDisadvantage | №0630 (+ 1 других файлов) |
| dexSaveVisible | №0644 (+ 1 других файлов) |
| dexterity | №0775 (+ 10 других файлов) |
| Dexterity | №0069 |
| dexteritySaveProficiency | №0768 |
| diagnostics | №0052 (+ 1 других файлов) |
| diagonal | №0809 |
| dialect | №0768 (+ 1 других файлов) |
| diamondForm | №0768 |
| diamondPaste | №0662 |
| diamondSoul | №0637 |
| dice | №0066 (+ 9 других файлов) |
| diceCount | №0636 (+ 3 других файлов) |
| diceSides | №0636 (+ 3 других файлов) |
| die | №0070 (+ 6 других файлов) |
| diet | №0617 (+ 12 других файлов) |
| difficultTerrain | №1191 |
| difficulty | №0794 |
| digDeep | №0705 (+ 1 других файлов) |
| digits | №0050 |
| diminutive | №0822 (+ 1 других файлов) |
| dimLightAdditionalFt | №0768 |
| direct | №0807 (+ 2 других файлов) |
| directAttackNearestIfFailed | №0768 |
| directDice | №0067 |
| direction | №0062 (+ 6 других файлов) |
| directionSense | №0768 |
| directShift | №0822 |
| dirty | №0642 |
| dirtyHit | №0768 |
| dirtyStrike | №0765 |
| disabled | №0653 (+ 2 других файлов) |
| disabledBlocked | №1091 |
| disableSense | №0768 |
| disadvantage | №0067 (+ 10 других файлов) |
| disadvantageAgainstOthers | №0768 |
| disadvantageAgainstOthersWithinFt | №0768 |
| disadvantageAgainstSelf | №0768 |
| disadvantageAttacksExceptSelfUntilEndNextTurn | №0768 |
| disadvantageFirstSaveAgainstSpell | №0768 |
| disadvantageInDimLight | №0768 |
| disadvantageNextAttack | №0768 |
| disadvantageOnSaveWhenHidden | №0768 |
| disadvantageSaves | №0768 |
| disadvantageVsBloodHunterSpells | №0768 |
| disarm | №0765 (+ 1 других файлов) |
| disassembleItem | №0653 (+ 1 других файлов) |
| discard | №0810 |
| disciplinaryAdept | №0768 |
| discipline | №0703 (+ 4 других файлов) |
| disciplines | №0703 (+ 2 других файлов) |
| disciplineUsesPerTurn | №0703 |
| discovered | №0068 (+ 1 других файлов) |
| discoveries | №0067 (+ 3 других файлов) |
| discovery | №0067 (+ 1 других файлов) |
| discoveryBonus | №0070 |
| discoveryLevelGating | №0666 |
| discoveryRecipes | №0067 |
| disengageOnHit | №0765 |
| disguise | №0661 |
| disguiseAndHexFocus | №0802 |
| disguiseAppearance | №0067 |
| disguiser | №0659 (+ 1 других файлов) |
| dismissMageArmor | №0807 |
| disoriented | №0768 |
| disorientedDice | №0768 |
| dispellingAnathema | №0768 |
| display | №0788 (+ 1 других файлов) |
| displayName | №0634 (+ 3 других файлов) |
| dispose | №0062 |
| dist | №0800 |
| distance | №0645 (+ 2 других файлов) |
| distanceFt | №0630 (+ 18 других файлов) |
| distant | №0637 |
| divineChannelUses | №0798 |
| divineIntervention | №0637 |
| divineMandate | №0768 |
| divineRespite | №0792 |
| divineSense | №0637 |
| divineSmite | №0637 (+ 2 других файлов) |
| dlc | №0655 |
| DND_CLASSES_LIST | №1237 |
| DND_UPDATE_MANIFEST_URL | №1236 |
| dndBackgrounds | №1237 |
| DNDBattleBoard | №1170 |
| DNDCampaign | №1169 (+ 1 других файлов) |
| DNDCloudConfig | №1089 |
| DNDCombat | №1169 (+ 1 других файлов) |
| DNDContent | №1057 (+ 2 других файлов) |
| DNDGameplayV57 | №1170 |
| DNDGLTF | №1059 |
| DndLanBridge | №1196 |
| DNDMonsterLoot | №1169 |
| dndMorphChannels | №1059 (+ 1 других файлов) |
| dndMorphSource | №1246 |
| dndNetwork | №1169 (+ 1 других файлов) |
| DNDRules | №1231 |
| DNDSummoning | №1169 |
| dock | №0059 |
| document | №1057 (+ 38 других файлов) |
| documentElement | №1099 |
| dodge | №0768 |
| dogAndHound | №0705 |
| dominantCharacteristics | №0858 |
| donorHitDieSpent | №0802 |
| donorType | №0067 (+ 1 других файлов) |
| donorVerified | №1058 |
| door | №0056 |
| doubleBreath | №0768 |
| doubleFoodSleepInterval | №0768 |
| doubleProficiency | №0768 |
| doubleSided | №0058 |
| doubleSpeed | №0798 |
| doublingJinx | №0768 |
| downButNotOut | №0705 (+ 1 других файлов) |
| downButNotOutActive | №0768 |
| downstreamRecipeAvailable | №0652 |
| draconicDiscourse | №0768 |
| draconicElement | №1208 |
| draconicResilience | №0637 |
| draconicStance | №0768 |
| draft | №0850 |
| dragging | №0615 |
| dragon | №0050 (+ 17 других файлов) |
| dragon_fear | №0771 |
| dragonArmyAffinity | №0620 |
| dragonFamily | №1164 |
| dragonlance | №0620 |
| dragonReagent | №0656 (+ 1 других файлов) |
| dragonsAscent | №0768 |
| dragonScale | №0656 (+ 1 других файлов) |
| dragonScaleRed | №0662 |
| draw | №0061 (+ 2 других файлов) |
| draws | №1059 |
| dreadfulGlare | №0768 |
| dreadlord | №0768 |
| dreadPresence | №0768 |
| dress | №0051 (+ 1 других файлов) |
| dressSleeves | №0051 |
| driedHerbBundle | №0661 |
| driedMeat | №0661 (+ 1 других файлов) |
| dropObject | №0768 |
| dropToOneHP | №0675 |
| Drowned | №0768 |
| druid | №0787 (+ 1 других файлов) |
| druidic | №0637 |
| dryRun | №0652 (+ 6 других файлов) |
| duplicate | №0841 |
| duplicateOnPhaseRift | №0768 |
| duplicateTargetCollisions | №1111 |
| dur | №0656 |
| durability | №0654 (+ 4 других файлов) |
| durabilityBonus | №0658 |
| durabilityMax | №1090 (+ 1 других файлов) |
| durabilityMultiplier | №0654 (+ 2 других файлов) |
| duration | №0057 (+ 21 других файлов) |
| durationHours | №0630 (+ 2 других файлов) |
| durationMinutes | №0067 (+ 6 других файлов) |
| durationRounds | №0066 (+ 4 других файлов) |
| durationRule | №0822 |
| durationSeconds | №0807 (+ 1 других файлов) |
| durationTurns | №0798 |
| durationUnit | №0646 (+ 1 других файлов) |
| durationUntilSave | №0798 |
| durationUntilStartOfTurn | №0768 |
| duringShortRest | №1058 |
| dusk | №0062 |
| dwarf | №0652 |
| dwarf_hill | №0661 |
| dwarf_mountain | №0661 |
| dwarven_fortitude | №0771 |
| dwarvishDiscourse | №0768 |
| dyingCurse | №0768 |
| dynamic | №0050 |
| e | №0063 (+ 1 других файлов) |
| earField | №0050 |
| earFrame | №0051 |
| earLength | №0055 (+ 6 других файлов) |
| earPointiness | №0055 (+ 6 других файлов) |
| earth | №0675 |
| Earth | №0069 |
| earthCore | №0815 |
| earthEssence | №0815 |
| earTuftSize | №0055 (+ 2 других файлов) |
| ecology | №0617 (+ 12 других файлов) |
| ectoplasm | №0656 (+ 1 других файлов) |
| edition | №0066 (+ 23 других файлов) |
| effect | №0067 (+ 20 других файлов) |
| effectiveD20 | №0644 |
| effectiveDamage | №0644 |
| effectiveMaxHp | №0816 |
| effectiveMode | №1136 |
| effectiveStats | №0805 |
| effectKey | №0805 |
| effects | №0069 (+ 5 других файлов) |
| elasticHide | №0815 |
| Elderheart | №0784 |
| eldritchBane | №0768 |
| eldritchCannon | №0637 |
| eldritchInvocations | №0637 |
| eldritchMaster | №0637 |
| electricCharge | №0768 |
| elemental | №0052 (+ 14 других файлов) |
| Elemental | №0784 |
| elementalAsh | №0656 (+ 1 других файлов) |
| elementalBlast | №0768 |
| elementalPower | №0768 |
| elephant | №0050 |
| elephantEarSize | №0055 (+ 1 других файлов) |
| elephantTuskSize | №0055 (+ 1 других файлов) |
| elevationFt | №0807 |
| elf_wood | №0661 |
| elfcity | №0052 |
| eligible | №1148 |
| elixirs | №0659 |
| eloquentSpeech | №0768 |
| elven_accuracy | №0771 |
| email | №0642 (+ 1 других файлов) |
| emanationFt | №0768 |
| embers | №0630 |
| Embers | №0768 |
| emerald | №0857 |
| emergencyReanimate | №0858 |
| emissaryPhaseHooks | №1157 |
| empowered | №0637 (+ 1 других файлов) |
| empty | №0808 |
| enableApply | №0832 |
| enabled | №0048 (+ 6 других файлов) |
| enchant | №0659 |
| enclosed | №0048 |
| encoding | №0878 (+ 5 других файлов) |
| encounter | №0849 (+ 1 других файлов) |
| encounterBias | №0621 |
| encounterId | №0807 (+ 2 других файлов) |
| end | №0050 (+ 2 других файлов) |
| endActorTurn | №0630 |
| endAllRites | №0768 |
| endCondition | №0768 |
| endConditions | №0768 |
| endedByZeroHp | №0644 |
| endEffectPsi | №0768 |
| endEncounter | №0675 |
| endExternalPetrificationAfter | №0768 |
| endIllusion | №0768 |
| endInvisibility | №0768 |
| endPossession | №0773 |
| endRampage | №0675 |
| ends | №0833 |
| endsAt | №0768 |
| endsOnAttack | №0067 (+ 1 других файлов) |
| endsOnAttackOrSpell | №0768 |
| endsOnDamage | №0067 |
| endsOnHostile | №0807 |
| endsOnMagicHealing | №0675 |
| endsOnMove | №0768 |
| endsOnRemoveCurse | №0768 |
| endSpellConcentration | №0807 |
| endsWhen | №0768 |
| endTurn | №0772 (+ 3 других файлов) |
| enemiesFrightened | №0768 |
| enemy | №1116 (+ 6 других файлов) |
| enemyDistanceFt | №1149 |
| enemyRead | №0765 |
| enervatingJinx | №0768 |
| enervatingSpell | №0768 |
| eng | №0734 |
| engines | №0837 (+ 1 других файлов) |
| englishName | №0066 (+ 29 других файлов) |
| enhancement | №0768 |
| enhancingSurge | №0768 |
| enlightened | №0768 |
| enliveningOrder | №0768 |
| enshroudingImprecation | №0768 |
| ensure | №0773 (+ 8 других файлов) |
| ensureCharacterProfessions | №0659 |
| ensureMaterial | №0656 |
| ensureResourceState | №0794 |
| ensureTracker | №0772 (+ 1 других файлов) |
| enterSpiritForm | №0773 |
| entities | №0067 (+ 2 других файлов) |
| entity | №0067 (+ 4 других файлов) |
| entityId | №0067 (+ 4 других файлов) |
| entries | №0642 (+ 1 других файлов) |
| entryRoute | №0858 |
| enumerable | №0807 |
| env | №1056 |
| ep | №0779 (+ 5 других файлов) |
| equip | №0055 |
| equipment | №0055 (+ 6 других файлов) |
| equipmentId | №0055 |
| equipMilitia | №0768 |
| equipped | №0063 (+ 6 других файлов) |
| equippedArmor | №1091 |
| error | №0052 (+ 33 других файлов) |
| error_code | №1089 |
| errors | №0650 (+ 1 других файлов) |
| essence | №0815 |
| eTexture | №0065 |
| ethanol | №0662 |
| ethereal | №0768 |
| evasion | №0637 (+ 3 других файлов) |
| evasionMonk | №0637 |
| event | №0807 (+ 3 других файлов) |
| eventCount | №0836 (+ 2 других файлов) |
| eventId | №0808 (+ 1 других файлов) |
| eventLog | №0851 (+ 2 других файлов) |
| eventLogBaseSeq | №1229 |
| events | №0836 (+ 5 других файлов) |
| eventSeq | №0799 (+ 5 других файлов) |
| exact | №1260 |
| exaltedLeader | №0728 |
| exaltedMutation | №0630 |
| exaltedProtege | №0768 |
| excellent | №0797 |
| exceptional | №0653 (+ 1 других файлов) |
| exceptPsychic | №0768 |
| exclude | №0047 |
| excludeUndeadConstructs | №0807 (+ 2 других файлов) |
| executablePath | №1249 (+ 37 других файлов) |
| executeAttack | №0772 |
| executionActor | №0807 |
| exhaustion | №0768 (+ 2 других файлов) |
| exhaustionAfter | №0765 |
| exhaustionApplied | №0768 |
| exhaustionGain | №0765 |
| exhaustionOnFailedSave | №0768 |
| exit | №1094 |
| exorcist | №0630 (+ 1 других файлов) |
| exoskeletonArmor | №0768 |
| exp | №0769 |
| expand | №0649 |
| expanded | №0649 (+ 1 других файлов) |
| expected | №0843 |
| expectedProcessed | №0815 |
| expectedRevision | №0782 (+ 21 других файлов) |
| expendHitDie | №0768 |
| experience | №0775 |
| experimental | №0068 (+ 1 других файлов) |
| experimentalist | №0666 |
| experiments | №0068 (+ 1 других файлов) |
| expertFocus | №0768 |
| expertise | №0768 (+ 1 других файлов) |
| expertiseSkills | №0768 |
| expired | №0067 |
| expires | №0067 (+ 3 других файлов) |
| expires_at | №0642 |
| expires_in | №1089 |
| expiresAt | №0066 (+ 3 других файлов) |
| expiresRounds | №0768 |
| exploded | №0067 |
| explodeRadiusFt | №0067 |
| explodesOncePerTurn | №0768 |
| exploit | №0675 |
| exploitDice | №0728 |
| exploitDie | №0728 (+ 1 других файлов) |
| exploits | №0728 (+ 1 других файлов) |
| exploitsKnown | №0728 |
| explosiveBane | №0768 |
| explosiveCannon | №0800 |
| exportedAt | №0836 |
| exportedMacros | №1294 |
| exportJSON | №0052 (+ 1 других файлов) |
| exportReplay | №0836 |
| exportSession | №0849 (+ 1 других файлов) |
| exposingStrike | №0768 |
| exposure | №0630 |
| expression | №0644 (+ 2 других файлов) |
| extended | №0637 |
| extendedResourceState | №0637 |
| extendedTactics | №0724 |
| extendExistingDarkvisionFt | №0630 |
| extendHex | №0765 |
| extendHexRounds | №0768 |
| external | №0048 (+ 1 других файлов) |
| externalGeometryAvailable | №0048 |
| externalGeometryReady | №0048 |
| externalGeometryStage | №0048 |
| extra | №0068 (+ 2 других файлов) |
| extraAction | №0768 (+ 1 других файлов) |
| extraActionNextTurn | №0807 |
| extraAstralConstruct | №0768 |
| extraAtk | №0636 (+ 1 других файлов) |
| extraAttack | №0630 (+ 7 других файлов) |
| extraAttackDamage | №0630 |
| extraAttacks | №0066 (+ 13 других файлов) |
| extraBloodMaledictUse | №0630 (+ 1 других файлов) |
| extraCantrips | №0802 |
| extraClassType | №0635 |
| extraCurseArmamentAttack | №0768 |
| extraCursedAttunement | №0768 |
| extraDamage | №0067 (+ 2 других файлов) |
| extraDamageByLevel | №0066 |
| extraDamageDice | №0768 |
| extraDamageDie | №0768 |
| extraDice | №0067 (+ 8 других файлов) |
| extraDieVsUndead | №0768 |
| extradimensional | №0802 |
| extraDimLight | №0768 |
| extraDimLightDie | №0768 |
| extraDiscipline | №0768 |
| extraDmg | №0636 (+ 2 других файлов) |
| extraExploitDice | №0768 |
| extraExploitKnown | №0768 |
| extraFamiliarAction | №0802 |
| extraForms | №0768 |
| extraKnowledgeSkill | №0768 |
| extraMovement | №0807 |
| extraNecrotic | №0768 |
| extrapolated | №1246 |
| extraPsiOverMax | №0768 |
| extraPsychicDice | №0768 |
| extraRadiusFt | №0067 |
| extraRampageDie | №0768 |
| extraReaction | №0807 |
| extraReactions | №0807 |
| extraRiteDie | №0768 |
| extras | №1059 (+ 1 других файлов) |
| extraSaveBonus | №0861 |
| extraSkillChoice | №0768 |
| extraSuture | №0798 |
| extraTargetPerSlotAbove1 | №0768 |
| extraTargets | №0768 |
| extraTurns | №0802 |
| extraUnarmedAfterTwoOldOneTwo | №0768 |
| extraUse | №0768 (+ 1 других файлов) |
| eye | №0050 (+ 1 других файлов) |
| eyeColor | №0055 (+ 3 других файлов) |
| eyeGlow | №0055 (+ 2 других файлов) |
| eyeHeight | №0052 (+ 2 других файлов) |
| eyeless | №0630 |
| eyeliner | №1258 |
| eyeShape | №0055 |
| eyeSize | №0055 (+ 1 других файлов) |
| eyeSpacing | №0055 (+ 1 других файлов) |
| eyeTilt | №0052 (+ 1 других файлов) |
| eyeWidth | №0052 (+ 1 других файлов) |
| f | №0050 (+ 2 других файлов) |
| faceColor | №0055 (+ 5 других файлов) |
| faceLength | №0052 (+ 1 других файлов) |
| faceShape | №0055 |
| faceTint | №0055 (+ 2 других файлов) |
| faceWidth | №0052 (+ 2 других файлов) |
| facileSuppression | №0768 |
| factionAgents | №0621 |
| factions | №0621 |
| fail | №0832 (+ 1 других файлов) |
| failChance | №0069 |
| failed | №0052 (+ 4 других файлов) |
| failedSave | №1138 |
| failNextRollDisadvantage | №0768 |
| failure | №0069 (+ 3 других файлов) |
| failures | №0644 (+ 14 других файлов) |
| fair | №0797 |
| fall | №0644 (+ 3 других файлов) |
| fallDamageReduction | №0768 |
| fallen | №0060 (+ 1 других файлов) |
| fallenAttack | №0630 |
| fallenPuppet | №0630 |
| fallingStrike | №0765 |
| familiar | №0646 (+ 2 других файлов) |
| familiarAttack | №0768 |
| familiarHpBonus | №0768 |
| familiarLink | №0802 |
| familiarSettlement | №0768 |
| familiarStealth | №0802 |
| families | №0617 (+ 24 других файлов) |
| family | №0048 (+ 3 других файлов) |
| familyByCreature | №1156 (+ 10 других файлов) |
| familyId | №0617 (+ 10 других файлов) |
| fancyFootwork | №0768 |
| fangSize | №0055 (+ 2 других файлов) |
| fastHands | №0637 |
| fastMovement | №0637 |
| fastTravel | №0768 |
| fat | №0052 (+ 1 других файлов) |
| fathomless | №0630 |
| fatigue | №0768 |
| favoredEnemy | №0637 |
| favoredServant | №0768 |
| fear | №0067 (+ 1 других файлов) |
| Fear | №0069 |
| fearApplied | №0768 |
| fearAura | №0765 |
| fearBomb | №0768 |
| fearImmune | №0807 |
| fearImmunity | №0765 |
| fearPulse | №0618 |
| fearSave | №0768 |
| fearSavePenalty | №0768 |
| fearSourceId | №0807 |
| fearTargets | №1145 |
| fearVisible | №0807 |
| feat | №0736 |
| featherTailSize | №0055 (+ 3 других файлов) |
| featherWingSize | №0055 (+ 3 других файлов) |
| feats | №0775 (+ 3 других файлов) |
| feature | №0613 (+ 1 других файлов) |
| FEATURE_DEFS | №0637 |
| featureAvailableForCurrentBuild | №0637 |
| featureId | №0800 |
| featureLevels | №0792 (+ 4 других файлов) |
| featureName | №0800 (+ 2 других файлов) |
| features | №0775 (+ 57 других файлов) |
| fecundAffliction | №0768 |
| feedOnCorpse | №0805 |
| feet | №0050 (+ 9 других файлов) |
| feint | №0768 |
| female | №0048 (+ 2 других файлов) |
| femaleStackTerms | №1294 |
| feralInstinct | №0637 |
| feralSenses | №0637 (+ 1 других файлов) |
| ferocious | №0675 |
| ferocity | №0645 (+ 3 других файлов) |
| ferocityMax | №0646 (+ 1 других файлов) |
| fetch | №1061 (+ 6 других файлов) |
| fey | №0617 (+ 11 других файлов) |
| fey_touched | №0771 |
| feyFiber | №0815 |
| feyPresence | №0637 (+ 1 других файлов) |
| fiber | №0656 (+ 1 других файлов) |
| field | №0050 (+ 1 других файлов) |
| fiend | №0617 (+ 12 других файлов) |
| fiendish | №0768 (+ 1 других файлов) |
| fiendishStance | №0768 |
| fight | №0807 |
| fightClubs | №0705 |
| fighterRemarkableAthlete | №0637 |
| fighting_initiate | №0771 |
| fightingSpirit | №0705 (+ 1 других файлов) |
| fightingStyle | №0630 (+ 4 других файлов) |
| fightingStyleChoice | №0768 |
| fightingStyles | №0677 (+ 1 других файлов) |
| file | №0857 (+ 1 других файлов) |
| filename | №0652 (+ 68 других файлов) |
| FileReader | №1199 |
| files | №0831 (+ 3 других файлов) |
| filter | №0821 (+ 3 других файлов) |
| filtered | №0836 |
| final | №0839 |
| finalMartyrdom | №0792 |
| finalStrikeExploit | №0768 |
| findRecipeForItem | №0653 |
| fine | №0653 (+ 3 других файлов) |
| finecarver | №0659 |
| fineFiberV49 | №0656 |
| fineLeatherV49 | №0656 |
| finesse | №0802 |
| finesseOrRanged | №1209 |
| finger | №0050 |
| finish | №0050 (+ 2 других файлов) |
| finishLastStand | №0807 |
| finite | №1263 (+ 3 других файлов) |
| finSize | №0055 (+ 2 других файлов) |
| firbolg | №0661 |
| fire | №0630 (+ 3 других файлов) |
| Fire | №0069 |
| fireAffinity | №0802 |
| fireClay | №0662 |
| fireDamage | №0768 (+ 1 других файлов) |
| fireEssence | №0656 (+ 1 других файлов) |
| fireResistance | №0802 |
| firmness | №1103 |
| first | №0816 |
| firstAid | №0768 |
| firstAttackAdvantage | №0768 (+ 1 других файлов) |
| firstHitByEachTargetRestoresMoxie | №0768 |
| firstMate | №0768 |
| fisher | №0790 (+ 1 других файлов) |
| fisticuffs | №0705 |
| fisticuffsDie | №0705 |
| fit | №0051 (+ 8 других файлов) |
| fitFrame | №0051 |
| fitProfile | №0055 |
| fixed | №0702 (+ 1 других файлов) |
| fixtureSha256 | №1102 |
| fizban | №0617 |
| flags | №0807 |
| flame | №0630 |
| flameBurst | №0768 |
| flameReroll12 | №0630 |
| flamesOfHope | №0768 |
| flare | №0051 |
| flashOfGenius | №0637 (+ 1 других файлов) |
| flashOfGeniusAvailable | №0644 |
| flat | №0050 |
| flawed | №0663 |
| flawlessAnalysis | №0818 |
| flax | №0662 |
| fletcher | №0659 (+ 2 других файлов) |
| fletchingStock | №0656 (+ 1 других файлов) |
| fletchingStockV49 | №0656 |
| floatObjectsLb | №0768 |
| floor | №0047 (+ 5 других файлов) |
| FLOOR | №0061 |
| floor_ceramic_tile_dark | №0061 |
| floor_ceramic_tile_light | №0061 |
| floor_checker_tile | №0061 |
| floor_cobblestone | №0061 |
| floor_earth | №0061 |
| floor_grass | №0061 |
| floor_hex_tile | №0061 |
| floor_marble_dark | №0061 |
| floor_marble_light | №0061 |
| floor_parquet_herringbone | №0061 |
| floor_rug_blue | №0061 |
| floor_rug_green | №0061 |
| floor_rug_red | №0061 |
| floor_stone_tile_dark | №0061 |
| floor_stone_tile_light | №0061 |
| floor_tatami | №0061 |
| floor_water | №0061 |
| floor_wood_dark | №0061 |
| floor_wood_light | №0061 |
| floors | №0060 |
| flowers | №0814 |
| flurry | №0637 |
| fly | №0798 |
| flyFt | №0630 (+ 1 других файлов) |
| flyIfSelected | №0675 |
| flyingSpeed | №0802 |
| flySpeed | №0067 (+ 2 других файлов) |
| focus | №0630 (+ 10 других файлов) |
| focusDebuff | №0768 |
| focusDuration | №0818 |
| focusDurationRounds | №0768 |
| focusEndsOn | №0818 |
| focuses | №0637 |
| focusRangeFt | №0818 |
| foe | №1118 (+ 4 других файлов) |
| foeSlayer | №0637 |
| foeSlayerApplied | №1210 |
| foeSlayerMode | №1210 |
| folder | №1103 (+ 2 других файлов) |
| folders | №0613 (+ 1 других файлов) |
| fontOfLife | №0724 |
| fontOfMagic | №0637 |
| food | №0788 |
| foot | №0050 |
| footL | №0048 |
| footprintFeet | №0055 |
| footR | №0048 |
| foraging | №0659 |
| force | №0860 (+ 7 других файлов) |
| forceAttackRedirect | №0768 |
| forceCrit1 | №1136 |
| forceCritical | №0637 (+ 1 других файлов) |
| forced | №0644 (+ 2 других файлов) |
| forceDamage | №0675 (+ 1 других файлов) |
| forceDamageInside | №0768 |
| forcedAttack | №0839 |
| forcedD20 | №0839 |
| forcedDamage | №0839 |
| forcedDice | №0841 |
| forcedFailure | №0807 |
| forcedMeleeReaction | №0768 |
| forcedMoveFt | №0765 (+ 2 других файлов) |
| forcedMovementProtection | №0768 |
| forcedReactionAttack | №0768 |
| forcedSave | №0839 |
| forceOfNature | №0822 |
| forceSlot | №1147 |
| forceSurge | №0768 |
| forceTwenty | №0637 |
| forceUnarmed | №0768 |
| forearmL | №0048 |
| forearmR | №0048 |
| foresight | №0765 |
| forest | №0052 (+ 1 других файлов) |
| forge | №0052 |
| forger | №0659 (+ 1 других файлов) |
| forgery | №0661 |
| forgetAfterCast | №0768 |
| forgottenKnowledge | №0768 |
| forkedTongue | №0687 |
| form | №0050 (+ 3 других файлов) |
| formationRole | №0620 |
| formless | №0833 |
| formula | №0067 (+ 4 других файлов) |
| formulae | №0067 |
| formulas | №0067 (+ 4 других файлов) |
| fortified | №0860 |
| fortifyingDice | №0768 |
| fortunateCompany | №0768 |
| fortuneMode | №0807 |
| fortunePending | №0807 |
| fortuneRevealed | №0807 |
| fortuneTwist | №0768 |
| forward | №0055 |
| found | №0807 |
| fractureBurst | №0768 |
| frame | №0047 |
| free | №0768 (+ 4 других файлов) |
| freeAfflict | №0768 |
| freeAt17 | №0792 |
| freeAtLevel17 | №0768 |
| freeAtUnsealed | №0768 |
| freeCast | №0768 |
| freeDispelCaster | №0768 |
| freedomOfMovement | №0798 |
| freeExploits | №0768 |
| freeHandBonusAction | №0768 |
| freeHitDieChancePercent | №0768 |
| freeHoldTheLine | №0768 |
| freeInsightfulOrder | №0768 |
| freeLawShieldAndHalt | №0768 |
| freeMoveFt | №0768 |
| freePoints | №0703 |
| freePsi | №0768 |
| freePsiLost | №0768 |
| freePsiPerTurn | №0768 |
| freeSpell | №0802 |
| freeSpells | №0768 |
| freeTalent | №0768 |
| freeUse | №0768 |
| freeUses | №0833 |
| frenzy | №0637 |
| friend | №1123 (+ 3 других файлов) |
| frighten | №0802 |
| frightened | №0768 (+ 2 других файлов) |
| frightenedBy | №0807 |
| frightenedEffect | №0630 (+ 3 других файлов) |
| frightenedSaveDisadvantage | №0768 |
| frightenedUntilEndNextTurn | №0768 |
| from | №0621 (+ 25 других файлов) |
| fromFiendOrUndead | №0637 (+ 1 других файлов) |
| fromRound | №0807 |
| fromSpell | №0644 (+ 3 других файлов) |
| front | №0051 (+ 1 других файлов) |
| frontDigits | №0050 |
| FrontTexture | №1113 |
| frozen | №0630 |
| full_orc | №0661 |
| fullMaxNearestDistance | №1111 |
| fullMeanNearestDistance | №1111 |
| fullSpeedDragging | №0768 |
| fulminatingFatigue | №0768 |
| fumble | №0644 (+ 30 других файлов) |
| functionalStatus | №0791 |
| fur | №0050 |
| furAmount | №0048 (+ 3 других файлов) |
| furColor | №0055 (+ 1 других файлов) |
| furDensity | №0048 (+ 4 других файлов) |
| furH | №0050 |
| furLength | №0048 (+ 2 других файлов) |
| furParts | №0050 |
| furProfile | №0048 (+ 4 других файлов) |
| furRoots | №0050 |
| furShell | №0050 |
| furStrands | №0050 |
| furyOfForge | №0768 |
| fuseMinutes | №0067 |
| fuseRounds | №0067 (+ 1 других файлов) |
| g | №0857 |
| gainD4OnFailure | №0768 |
| gained | №0645 (+ 1 других файлов) |
| gainFerocity | №0645 (+ 1 других файлов) |
| gainRelaxationPerTurn | №0768 |
| gallantSpellcasting | №0768 |
| gameActors | №0630 |
| gameOfChance | №0768 |
| gameplay | №0837 (+ 2 других файлов) |
| gameplayEvents | №0851 (+ 1 других файлов) |
| gargantuan | №0805 (+ 1 других файлов) |
| gaseousBody | №0798 |
| gaseousReaction | №0798 |
| gateTowns | №0621 |
| gather | №0070 |
| gatherAction | №0070 |
| gathered | №0867 (+ 1 других файлов) |
| gatherIngredient | №0070 |
| gear | №0654 (+ 2 других файлов) |
| gelid | №0630 |
| Gelid | №0768 |
| gem | №0657 (+ 4 других файлов) |
| gemcutter | №0790 (+ 1 других файлов) |
| gems | №0659 |
| gender | №0049 (+ 18 других файлов) |
| genderMorphs | №0055 |
| general | №0790 (+ 1 других файлов) |
| generate | №0795 (+ 3 других файлов) |
| genie | №0630 |
| geometryBuilds | №0052 |
| geometryState | №0051 |
| geometryUploads | №0052 |
| get | №0647 (+ 5 других файлов) |
| getAC | №0828 |
| getAllBackgrounds | №1237 |
| getAllRaces | №1237 |
| getAttribute | №1182 |
| getAvailableRecipes | №0659 |
| getBiomassFromCorpse | №0828 |
| getBody | №0805 |
| getBodyState | №0055 |
| getCharismaModifier | №0790 |
| getClass | №0650 |
| getClassSummary | №0858 |
| getCreature | №0617 (+ 12 других файлов) |
| getCurrent | №0631 (+ 2 других файлов) |
| getCurse | №0066 |
| getDC | №0818 |
| getDevourDamage | №0828 |
| getDevourDC | №0828 |
| getDialect | №0817 |
| getDie | №0818 |
| getDiscipline | №0818 |
| getDominantAbilityNames | №0858 |
| getDurability | №0656 (+ 1 других файлов) |
| getElementById | №1057 (+ 37 других файлов) |
| getExhaustion | №0814 (+ 1 других файлов) |
| getFeature | №0650 |
| getInscribedRunes | №0817 |
| getItem | №1059 (+ 20 других файлов) |
| getItemQuality | №0656 |
| getLanguages | №0817 |
| getLarva | №0805 |
| getLibraryManifest | №0060 |
| getLockedRecipes | №0659 |
| getMap | №0059 |
| getMaxCharacteristics | №0858 |
| getMaxPreparedSpellsLimit | №0825 |
| getMetamorphoses | №0066 |
| getMorphWeights | №0055 |
| getMutationSlots | №0828 |
| getNativeStorageStats | №0831 |
| getObject | №0060 |
| getPath | №1093 (+ 1 других файлов) |
| getPeer | №1142 (+ 7 других файлов) |
| getPersuasionModifier | №0790 |
| getProfession | №0659 |
| getProfile | №0659 (+ 1 других файлов) |
| getPursuit | №0818 |
| getRace | №0055 |
| getReactions | №0818 |
| getRenderDescriptor | №0055 |
| getRunesKnown | №0817 |
| getRunicDC | №0817 |
| getSaveBonus | №0816 (+ 13 других файлов) |
| getSaveDC | №0066 |
| getSkillBonus | №0816 |
| getSource | №0787 |
| getSpecialization | №0659 |
| getSpellInfo | №0787 |
| getSpellsKnown | №0066 |
| getSpellSlots | №0066 |
| getState | №0052 (+ 1 других файлов) |
| getStats | №0816 |
| getSubclass | №0637 |
| getSummary | №0773 |
| getSymbiosisTier | №0805 |
| getToken | №0819 |
| getTrader | №0788 |
| getVersion | №1093 (+ 1 других файлов) |
| getView | №1199 |
| getZone | №0060 |
| ghost | №0052 |
| ghostChainSize | №0055 (+ 2 других файлов) |
| ghostOnKill | №0798 |
| ghostOpacity | №0055 (+ 2 других файлов) |
| ghostTerror | №0055 (+ 2 других файлов) |
| ghostWeapon | №0052 (+ 3 других файлов) |
| ghukliak | №0768 (+ 1 других файлов) |
| giant | №0620 |
| Gifted | №0784 |
| giftedStrategist | №0768 |
| GITHUB_REPOSITORY | №1056 |
| GITHUB_RUN_ID | №1056 |
| GITHUB_SERVER_URL | №1056 |
| gl | №0062 (+ 4 других файлов) |
| glancingBlow | №0768 |
| glareParalyzeOnFailBy5 | №0768 |
| glass | №0656 (+ 6 других файлов) |
| glassBatch | №0662 |
| glassblower | №0659 (+ 3 других файлов) |
| glasswork | №0657 (+ 2 других файлов) |
| glaze | №0661 (+ 1 других файлов) |
| glazedVessel | №0661 |
| glb | №1109 |
| glbBBox | №1106 (+ 1 других файлов) |
| glbTriangles | №1106 (+ 2 других файлов) |
| glbVertices | №1097 (+ 4 других файлов) |
| gliderMembraneSize | №0055 (+ 1 других файлов) |
| global | №1206 (+ 5 других файлов) |
| globalThis | №1220 (+ 4 других файлов) |
| gloves | №0051 |
| glow | №0055 |
| gltf | №0058 (+ 2 других файлов) |
| gnoll | №0763 |
| gnome_forest | №0661 |
| gnome_rock | №0661 |
| goblin | №0661 |
| goblinDiscourse | №0768 |
| goblinoid | №0763 |
| goblinStance | №0768 |
| gold | №0821 (+ 3 других файлов) |
| goldBillet | №0662 |
| goldenSlumbers | №0768 |
| goldPer10 | №0654 |
| goldReceived | №0807 |
| goldSpent | №0807 |
| good | №0653 (+ 1 других файлов) |
| goodPct | №1111 |
| gooSize | №0055 (+ 1 других файлов) |
| gp | №0779 (+ 10 других файлов) |
| graftAction | №1058 |
| graftName | №1058 |
| grafts | №0067 (+ 1 других файлов) |
| grain | №0661 (+ 1 других файлов) |
| GRAND_HEXES | №0768 |
| grandHex | №0765 (+ 1 других файлов) |
| grandRevolutionary | №0768 |
| grantActionNextStart | №0807 |
| grantAdvantage | №0768 |
| grantIngredient | №0070 |
| grantsAdvantage | №0816 |
| grantTemporaryHitPoints | №0644 |
| grantUndyingToAlly | №0768 |
| grapple | №0765 |
| grappleBonus | №0768 |
| grappleMastery | №0765 |
| grappleSizePlus | №0768 |
| grappleTarget | №0765 |
| gravity | №0807 |
| gravityResisted | №0807 |
| grayColor | №0055 (+ 1 других файлов) |
| grayPercent | №1077 (+ 1 других файлов) |
| great_weapon_master | №0771 |
| greaterDivineIntervention | №0637 |
| greatOldOne | №0630 |
| Green | №0765 (+ 1 других файлов) |
| greenwood | №0867 |
| greenwood_clearing | №0867 |
| greenwood_heart | №0867 |
| greenwood_stream | №0867 |
| grid | №0050 (+ 1 других файлов) |
| grimPsychometry | №0630 |
| grip | №0052 |
| ground | №0050 |
| group | №0050 |
| groupKey | №0863 (+ 3 других файлов) |
| groups | №0644 (+ 7 других файлов) |
| guaranteed | №0617 (+ 14 других файлов) |
| guardCraft | №0655 |
| guardDC | №0807 |
| Guardian | №0784 |
| guardianRangeFt | №0768 |
| guardians | №1168 |
| guardianTactic | №0768 |
| guardianTactics | №0724 |
| guardRepair | №0655 |
| guest | №0642 |
| guidedStrike | №0637 |
| guild | №0652 |
| gumArabic | №0662 |
| h | №0050 (+ 9 других файлов) |
| H | №0047 (+ 1 других файлов) |
| habitat | №0052 |
| habitats | №0617 (+ 13 других файлов) |
| hadMaterial | №0807 |
| hadozee | №1270 |
| haggle | №0790 |
| hair | №0048 (+ 15 других файлов) |
| hairColor | №0055 (+ 3 других файлов) |
| hairParts | №0048 |
| hairRibbonBudget | №0048 |
| half | №0055 (+ 1 других файлов) |
| half_up | №0050 (+ 1 других файлов) |
| halfCover | №0768 |
| halfCoverWhileGrappling | №0768 |
| halfDamageEffect | №0644 (+ 4 других файлов) |
| halfOnSave | №0768 (+ 2 других файлов) |
| halfProficiencySkills | №0768 |
| halfSpeed | №0768 |
| Hallucination | №0069 |
| halt | №0768 |
| haltRestrains | №0768 |
| halveDamage | №0768 |
| halveNecroticReaction | №0630 |
| hand | №0050 (+ 1 других файлов) |
| handL | №0048 |
| handlebar | №0055 |
| handled | №0057 |
| handOfDread | №0705 |
| handoffNeedsSignaling | №0799 |
| handoffPending | №0799 |
| handR | №0048 |
| hands | №0050 (+ 9 других файлов) |
| hardenedSoul | №0630 |
| hardwood | №0656 (+ 4 других файлов) |
| harmonic | №0817 |
| harmonicAttunement | №0768 |
| harvest | №0617 (+ 19 других файлов) |
| harvestMaterial | №1168 |
| has | №0771 |
| has_joints_and_weights | №1100 |
| has_morph_targets | №1100 |
| hasAsi | №0689 (+ 2 других файлов) |
| hasCharacter | №0854 |
| hasDamage | №0800 (+ 1 других файлов) |
| hasInventoryEffects | №0807 |
| hasPreparation | №0825 |
| hasProfession | №0070 |
| haste | №0067 |
| hasToolProficiency | №0797 |
| hatOfDisguise | №0768 |
| have | №0653 (+ 3 других файлов) |
| haveGold | №0654 |
| haveMaterials | №0654 |
| haymaker | №0705 (+ 1 других файлов) |
| head | №0048 (+ 12 других файлов) |
| HEAD_AXES | №0055 |
| HEAD_FORMS | №0055 |
| HEAD_STYLES | №0055 |
| headAccessories | №0050 |
| headAccessory | №0047 (+ 2 других файлов) |
| headBuilds | №0052 |
| headDefaults | №0055 |
| headers | №0642 (+ 1 других файлов) |
| headFrame | №0050 |
| headless | №1249 (+ 37 других файлов) |
| heal | №0630 (+ 4 других файлов) |
| healAfterNecrotic | №0798 |
| healAfterRest | №0798 |
| healAmount | №1058 |
| healBatch | №0644 |
| healBody | №0858 |
| healCompanion | №0675 |
| healed | №0773 (+ 2 других файлов) |
| healHalfMaxHp | №0768 |
| healHitDie | №0765 |
| healHP | №0768 |
| healing | №0067 (+ 6 других файлов) |
| healingAllowed | №0858 |
| healingAmount | №0807 |
| healingBlocked | №0773 |
| healingBonus | №0768 (+ 1 других файлов) |
| healingBoost | №0802 |
| healingCount | №0807 |
| healingGrantsACBonus | №0768 |
| healingPotion | №0802 |
| healingPotionOnLongRest | №0802 |
| healingSpell | №0807 (+ 2 других файлов) |
| healingSpellsCannotHealSelf | №0798 |
| healMod | №0630 |
| healModifier | №0765 |
| healOnCharnelKill | №0798 |
| healOnKill | №0630 |
| healOrDamage | №0802 |
| healPer5Charnel | №0798 |
| healPool | №0768 |
| healRoll | №1058 |
| healSelf | №0768 |
| healShell | №0773 |
| healthCheck | №0842 |
| healWithHitDice | №0768 |
| heart | №0052 (+ 1 других файлов) |
| hearth | №0056 |
| heartPhylactery | №0768 |
| heavyArmor | №0768 |
| heelstomper | №0768 |
| height | №0052 (+ 50 других файлов) |
| heightened | №0637 |
| heightenedSenses | №0630 |
| hellhound | №0675 |
| hellspeaker | №0768 |
| hellspeakerHoneySweetBlades | №0768 |
| hellspeakerTurncoat | №0768 |
| hemMod | №0630 |
| hemocraftAbilities | №0677 |
| hemocraftDie | №0677 |
| hemocraftRerollOncePerTurn | №0630 |
| Hemorrhage | №0069 |
| hemp | №0662 |
| herb | №0657 (+ 2 других файлов) |
| herbalism | №0661 (+ 1 других файлов) |
| herbalist | №0659 (+ 4 других файлов) |
| herbs | №0814 (+ 1 других файлов) |
| herculean | №0705 (+ 1 других файлов) |
| hero | №1117 |
| heroicCharge | №0768 |
| heroicFocus | №0768 |
| heroicFortitude | №0768 |
| heroicOrderExploit | №0768 |
| heroicRush | №0765 |
| hex | №0857 (+ 2 других файлов) |
| hexArmor | №0768 |
| hexAura | №0768 |
| hexblade | №0630 |
| HEXES | №0768 |
| hexesAtWill | №0765 |
| hexmaster | №0768 |
| hexPhalanx | №0768 |
| hexPlate | №0768 |
| hexSaveDisadvantage | №0768 |
| hexShield | №0768 |
| hi | №0050 |
| hidden | №1284 |
| hide | №0656 (+ 1 других файлов) |
| hideBonusAction | №0768 |
| hideInDimDark | №0768 |
| hideInPlainSight | №0637 |
| Hideous | №0768 |
| high | №0048 (+ 1 других файлов) |
| high_ponytail | №0050 (+ 1 других файлов) |
| highAuthority | №0768 |
| highest | №1103 |
| highestId | №0807 |
| highGround | №0807 |
| highJumpBonusFt | №0768 |
| highlands | №0788 (+ 1 других файлов) |
| highlands_mine | №0867 |
| highlands_quarry | №0867 |
| highlands_ridge | №0867 |
| highlightColor | №0055 (+ 2 других файлов) |
| highlightPercent | №1077 (+ 2 других файлов) |
| hills | №0052 |
| hips | №0052 (+ 5 других файлов) |
| history | №0069 (+ 8 других файлов) |
| historyAdvantage | №0768 |
| historyAdvantageOnSinisterObjectOrPlace | №0630 |
| hit | №0644 (+ 9 других файлов) |
| hitCount | №0644 (+ 3 других файлов) |
| hitDice | №0613 (+ 2 других файлов) |
| hitDiceMax | №1138 |
| hitDiceRemaining | №0067 (+ 2 других файлов) |
| hitDiceRestored | №0792 |
| hitDiceSpent | №0067 (+ 4 других файлов) |
| hitDiceUsed | №0775 (+ 1 других файлов) |
| hitDie | №0613 (+ 53 других файлов) |
| hitInfo | №0062 |
| hitPoints | №0768 (+ 2 других файлов) |
| hitPointsAfter | №0792 (+ 1 других файлов) |
| hits | №0768 |
| hitTest | №0061 (+ 1 других файлов) |
| hitTokenId | №0809 |
| hitZone | №0061 |
| hive | №0052 |
| hm08BBox | №1106 (+ 1 других файлов) |
| hm08Triangles | №1106 (+ 1 других файлов) |
| hm08Vertices | №1106 (+ 3 других файлов) |
| hoard | №0795 |
| hobgoblin | №0661 |
| holdBreathIndefinite | №0768 |
| holdTheLine | №0768 |
| Hollow | №0768 |
| holy | №0067 |
| holyBomb | №0768 |
| holyMagic | №0765 |
| holyNexus | №0637 |
| homebrew | №0649 (+ 1 других файлов) |
| honey | №0662 |
| honorDuel | №0768 |
| hoofColor | №0055 (+ 1 других файлов) |
| hoofSize | №0052 (+ 3 других файлов) |
| hooks | №0066 (+ 19 других файлов) |
| hope | №0765 |
| horde | №0052 (+ 5 других файлов) |
| hordeCount | №0055 |
| horn | №0815 |
| HORN_STYLES | №0055 |
| hornColor | №0055 (+ 1 других файлов) |
| hornRidges | №1086 (+ 1 других файлов) |
| hornSize | №0055 (+ 3 других файлов) |
| hornStyle | №0052 (+ 5 других файлов) |
| hornThickness | №1086 (+ 1 других файлов) |
| horror | №0618 |
| horrorEligible | №0618 |
| horseColor | №0055 (+ 1 других файлов) |
| hosiery | №0051 |
| hosieryDen | №1070 |
| host | №0632 (+ 1 других файлов) |
| hostDestroyed | №0805 |
| hostileAction | №0807 |
| hostileBane | №0768 |
| hostilesWithin5 | №1146 |
| hostIsSeparateStatBlock | №0805 |
| hostSurvived | №0805 |
| houndReactionAttack | №0768 |
| howl | №0630 (+ 1 других файлов) |
| hp | №0775 (+ 77 других файлов) |
| hpBonus | №0768 |
| hpBonusPerLevel | №0813 |
| hpCost | №0792 (+ 1 других файлов) |
| hpCostBySlot | №0792 |
| hpCurrent | №0613 (+ 19 других файлов) |
| hpDamage | №0644 (+ 6 других файлов) |
| hpDamageBySlot | №0792 |
| hpFraction | №0765 |
| hpMax | №0613 (+ 13 других файлов) |
| hpMaxBonus | №0675 |
| hpPer100gp | №0768 |
| hpPercent | №1168 |
| hpTemp | №0613 (+ 6 других файлов) |
| href | №1182 |
| huge | №0805 (+ 1 других файлов) |
| humanoid | №0617 (+ 13 других файлов) |
| humanoidTorch | №0768 |
| hunter | №0675 (+ 2 других файлов) |
| hunterCompanion | №0765 |
| huntersBane | №0630 |
| huntersMark | №0637 (+ 1 других файлов) |
| huntersPrey | №0637 (+ 1 других файлов) |
| hurlThroughHell | №0800 |
| hybrid | №0768 |
| hybridAttackAdvantageVsBranded | №0768 |
| hybridRegeneration | №0768 |
| hybridTransformation | №0630 |
| hybridTransformationMastery | №0630 |
| hyena | №0763 |
| i | №0800 |
| ibex | №0055 |
| icon | №0660 (+ 3 других файлов) |
| iconId | №0777 (+ 1 других файлов) |
| id | №0050 (+ 198 других файлов) |
| idempotent | №0854 |
| identifyEffect | №0768 |
| identityDistortion | №0618 |
| ids | №0047 (+ 2 других файлов) |
| idx | №0062 |
| ifReducedToZero | №0768 |
| ifStolenSpark | №0768 |
| ignitingTouch | №0768 |
| ignoreCover | №0067 (+ 1 других файлов) |
| ignored | №0637 |
| ignoreExtremeTemperature | №0768 |
| ignoreHalfCover | №0768 |
| ignoreHalfDamageOnSave | №0768 |
| ignoreImmunity | №0630 (+ 2 других файлов) |
| ignoreInvisibility | №0807 |
| ignoreOneMutagenSideEffect | №0768 |
| ignoreOpportunityAttacksWhileFlying | №0798 |
| ignorePhysicalResistance | №0807 |
| ignoreRequirements | №1151 |
| ignoreResistance | №0067 (+ 6 других файлов) |
| ignoresImmunity | №0792 |
| ignoreSomaticInDimDark | №0768 |
| ignoresResistance | №0792 (+ 1 других файлов) |
| ignoreVerbalInDimDark | №0768 |
| illuminationAt | №0060 |
| illusion | №0807 (+ 1 других файлов) |
| illusoryDuplicate | №0768 |
| illustriousAdmiral | №0768 |
| imitation | №0067 (+ 1 других файлов) |
| immortality | №0768 |
| immortalityAnchor | №0798 |
| immune | №0630 (+ 5 других файлов) |
| immuneAging | №0768 |
| immuneAll | №0807 |
| immuneCondition | №0807 |
| immuneConditions | №0807 (+ 1 других файлов) |
| immuneFrightened | №0637 (+ 1 других файлов) |
| immuneIfBlindedImmune | №0630 |
| immuneNaturalDeath | №0802 |
| immuneSuppression | №0768 |
| immuneSurprise | №0768 |
| immuneToOwnerBombs | №0067 |
| immuneWhenRampageAtLeast | №0768 |
| immunities | №0644 (+ 13 других файлов) |
| immunity | №0630 (+ 3 других файлов) |
| immunity24hOnSave | №0768 |
| immunityBecomesResistance | №0067 (+ 3 других файлов) |
| immunityChosen | №0768 |
| impact | №0067 |
| impactBomb | №0768 |
| impermeable | №0630 |
| Impermeable | №0768 |
| implemented | №0768 |
| importJSON | №0845 |
| importLocal | №0642 |
| importText | №0849 (+ 1 других файлов) |
| imposeDisadvantage | №0768 |
| imposingPresence | №0768 |
| improvedAt11 | №0792 |
| improvedBombs | №0666 |
| improvedDivineSmite | №0637 |
| improvedFamiliar | №0768 |
| improvedResolve | №0724 |
| improvedThralls | №0798 |
| inactiveAfterInvoke | №0817 |
| inAttackAction | №1149 |
| incendiary | №0067 |
| incendiaryBomb | №0768 |
| inciteViolence | №0768 |
| incoming | №0807 |
| incomingAC | №0630 (+ 1 других файлов) |
| incomingAttackModifiers | №0860 |
| incomingDamage | №1138 |
| incomingDisadvantage | №0807 |
| incomparableIntellect | №0818 |
| index | №0782 (+ 8 других файлов) |
| indexType | №0062 |
| indices | №0047 (+ 8 других файлов) |
| individualCount | №0055 |
| individuals | №0050 |
| indomitable | №0637 (+ 1 других файлов) |
| indomitableMight | №0637 |
| infernal | №0675 |
| infernalConduit | №0687 |
| infernalConduitDice | №0687 |
| infernalMajesty | №0687 |
| inferno | №0052 |
| influenceSlots | №0621 |
| informant | №0768 |
| infuseItem | №0637 |
| ingredient | №0069 (+ 1 других файлов) |
| INGREDIENT_SOURCES | №0070 |
| ingredientCategory | №0070 |
| ingredientId | №0070 |
| ingredientName | №0070 |
| ingredients | №0068 (+ 2 других файлов) |
| inheritsOrigin | №0055 |
| init | №0649 |
| initCreatedCharacter | №0659 |
| initialize | №0810 |
| initiative | №0617 (+ 23 других файлов) |
| initiativeBonus | №0765 (+ 2 других файлов) |
| initiativeDash | №0768 |
| initiativeDisadvantage | №0630 (+ 1 других файлов) |
| initiativeExploit | №0768 |
| initiativeFerocity | №0675 |
| initiativeOrPerception | №0768 |
| initiativeReagentsTo | №0768 |
| initiativeRoll | №1149 |
| initiativeSave | №0768 |
| initiativeTempHp | №0768 |
| initiativeTracker | №0849 (+ 20 других файлов) |
| ink | №0657 (+ 2 других файлов) |
| innatePsionics | №0703 |
| inner | №0047 |
| innerHeight | №1182 |
| innerHTML | №1084 (+ 2 других файлов) |
| innerWidth | №1182 |
| inscribe | №0768 |
| inscribedCount | №0768 |
| inscribedGearProficiency | №0768 |
| inscribedRunes | №0817 |
| inscription | №0817 |
| inscrutableMind | №0768 |
| insectoid | №0763 |
| insidiousImprecation | №0768 |
| insidiousSpell | №0768 |
| insight | №0761 (+ 1 других файлов) |
| insightAbility | №0768 |
| insightBonus | №0768 |
| insightfulOrder | №0768 |
| insightTotal | №0067 (+ 1 других файлов) |
| inspect | №0810 (+ 1 других файлов) |
| inspector | №0059 |
| inspectSource | №0842 |
| inspirationalSpeech | №0768 |
| inspirationOnKill | №0807 |
| inspiring_leader | №0771 |
| inspiringShout | №0768 |
| inspiringWord | №0728 |
| inspiringWordMaxHeal | №0765 (+ 1 других файлов) |
| inspiringWordUses | №0728 |
| install | №0057 |
| installed | №0067 (+ 1 других файлов) |
| installedAtLevel | №0067 |
| instant | №0067 |
| instantDeath | №0644 (+ 1 других файлов) |
| instinctualSuppression | №0768 |
| instruments | №0768 |
| int | №0613 (+ 52 других файлов) |
| intBonus | №0630 |
| intChecksAdvantage | №0630 (+ 1 других файлов) |
| intChecksDisadvantage | №0630 (+ 1 других файлов) |
| intellectDie | №0818 |
| intelligence | №0775 (+ 12 других файлов) |
| intelligenceOrWisdomOrCharisma | №0066 (+ 1 других файлов) |
| intelligentExplosion | №0067 |
| intelligentExplosions | №0666 |
| intensity | №0059 (+ 2 других файлов) |
| inter | №0821 |
| interceptAttack | №0807 |
| interceptHealing | №0807 |
| interceptInitiative | №0807 |
| interceptSave | №0807 |
| interdict | №0860 |
| interdictBoons | №0687 |
| interdiction | №0687 |
| interpolation | №0057 |
| interrupt | №0724 |
| interrupted | №0644 (+ 1 других файлов) |
| interruptedId | №0807 |
| interruptOneAttackOrAbility | №0768 |
| interruptUses | №0724 |
| intimidatingCommand | №0768 |
| intimidation | №0761 (+ 1 других файлов) |
| intimidationAdvantage | №0768 |
| intimidationPersuasionBonus | №0768 |
| intIncrease | №0768 |
| intMaxBonus | №0630 |
| intMaxIncrease | №0768 |
| intToAC | №0798 |
| intuition | №0817 |
| intWisChaSavesDisadvantage | №0630 |
| invadeHost | №0805 |
| inventory | №0775 (+ 20 других файлов) |
| inventoryEntries | №0807 |
| inventoryRef | №0782 (+ 4 других файлов) |
| inverseBindMatrices | №0057 (+ 1 других файлов) |
| investigation | №0761 (+ 1 других файлов) |
| investigationExpertise | №0765 |
| investigator | №0818 |
| invHeaderAC | №1126 |
| invigoratingOrders | №0768 |
| Invisibility | №0069 |
| invisibilityAfterCharnel | №0798 |
| invisible | №0675 (+ 2 других файлов) |
| invocation | №0817 |
| invocationSlots | №0768 |
| invoke | №0650 (+ 1 других файлов) |
| invokeCount | №0768 |
| invokeDebuff | №0768 |
| invokeHell | №0687 |
| invoking | №0817 |
| iokharic | №0768 (+ 1 других файлов) |
| iridescentStrike | №0833 |
| iron | №0657 (+ 2 других файлов) |
| Ironbound | №0784 |
| ironChin | №0705 |
| ironCommand | №0768 |
| ironIngot | №0662 |
| isActive | №0771 |
| isAlly | №1058 |
| isAssassin | №0637 |
| isBomb | №0067 (+ 3 других файлов) |
| isDead | №0635 |
| isEnabled | №0650 (+ 1 других файлов) |
| isExtra | №0635 (+ 9 других файлов) |
| isExtraClass | №0635 |
| isIndependentCreature | №0828 |
| isLarval | №0050 |
| isMagical | №1137 |
| isObject | №1057 |
| isRaceClassHybrid | №0638 (+ 6 других файлов) |
| isShirt | №0051 |
| isSkirtDress | №0051 |
| isSolid | №0060 |
| issues | №0661 |
| isSwarm | №0050 |
| item | №0051 (+ 18 других файлов) |
| itemId | №0802 |
| items | №0051 (+ 7 других файлов) |
| itemValue | №0656 (+ 1 других файлов) |
| itsAlive | №0768 |
| ix | №0050 |
| j | №0047 |
| jacket | №0051 |
| jackOfAllTrades | №0637 |
| jade | №0821 |
| jar | №0056 |
| jaw | №0050 |
| jawProjection | №0055 |
| jawWidth | №0052 (+ 2 других файлов) |
| jealousy | №0066 |
| jeweler | №0657 (+ 5 других файлов) |
| jinx | №1148 |
| jinxBonusAction | №0768 |
| jinxExtraDamage | №0768 |
| jinxOptions | №0768 |
| joinRoom | №1196 |
| joints | №0047 (+ 4 других файлов) |
| jotun | №0768 (+ 1 других файлов) |
| jotunbrudJuggernaut | №0768 |
| jotunStance | №0768 |
| journal | №0841 |
| json | №0642 (+ 5 других файлов) |
| jumpDistanceMultiplier | №0765 |
| jumpFt | №0768 |
| jumpMultiplier | №0768 |
| jungle | №0052 |
| junk | №0782 (+ 38 других файлов) |
| justDroppedToZero | №1143 |
| K | №1105 |
| keenAwareness | №0818 |
| keeperOfOrder | №0768 |
| key | №0060 (+ 12 других файлов) |
| KEY | №0060 |
| ki | №1135 (+ 2 других файлов) |
| killInspiration | №0807 |
| kiln | №0659 |
| kind | №0050 (+ 36 других файлов) |
| Kind | №1113 |
| kingdom | №0052 |
| kiPoints | №0692 |
| kitchen | №0056 |
| knighthood | №0768 |
| knockdown | №0765 |
| knockout | №0765 |
| knockoutIfSelfDamageReachesZero | №0768 |
| knockoutRoll | №0768 |
| knockProne | №0768 |
| knockProneSmaller | №0768 |
| knot | №0051 (+ 3 других файлов) |
| known | №0775 (+ 2 других файлов) |
| knownAt | №0687 |
| knownAtLevel | №0066 |
| knownCantrips | №0067 |
| knownClasses | №0825 |
| knownCount | №0768 |
| knownMetamorphoses | №0768 |
| knownReactions | №0069 |
| knowYourEnemy | №0768 |
| kobold | №0050 (+ 1 других файлов) |
| krd | №0784 |
| krynn | №0620 |
| label | №0821 (+ 22 других файлов) |
| laboratory | №0052 |
| labyrinth | №0052 |
| lace | №0051 |
| lairActions | №1231 |
| lairActionState | №0800 |
| lamp | №0056 |
| lampblack | №0662 |
| landscape | №0876 |
| landsStrideRanger | №0637 |
| language | №0768 (+ 1 других файлов) |
| languageChoice | №0768 |
| languages | №0613 (+ 4 других файлов) |
| lantern | №0056 |
| large | №0056 (+ 2 других файлов) |
| larva | №0805 |
| larvaGirth | №0055 (+ 2 других файлов) |
| larvaIsSeparateStatBlock | №0805 |
| larval | №0050 |
| larvaLength | №0055 (+ 2 других файлов) |
| larvalParts | №0050 |
| larvaTendrilSize | №0055 (+ 2 других файлов) |
| larvaToothSize | №0055 (+ 2 других файлов) |
| last | №0050 (+ 1 других файлов) |
| lastAttemptRound | №0794 |
| lastGatheredAt | №0867 |
| lastLifesMemories | №0768 |
| lastRest | №1218 |
| lastRestId | №0810 |
| lastRestock | №0788 (+ 1 других файлов) |
| lastRestoredKey | №0854 |
| lastRoll | №0794 |
| lastRound | №0794 |
| lastRun | №0843 |
| lastStandActive | №0807 |
| lastStandFinished | №0807 |
| lastStandReady | №0807 |
| lastTrump | №0810 |
| lastTrumpAvailable | №0810 |
| lastTrumpUsed | №0810 (+ 1 других файлов) |
| lastX | №0615 (+ 1 других файлов) |
| lastY | №0615 (+ 1 других файлов) |
| latency | №0841 |
| latitude | №0050 |
| laughingGas | №0067 |
| laughingGasBomb | №0768 |
| launch | №0850 |
| lawShield | №0765 |
| lawsShield | №0768 |
| layer | №0051 |
| layered | №0050 (+ 1 других файлов) |
| layers | №0050 |
| layOnHands | №0637 (+ 1 других файлов) |
| leadershipAbility | №0728 (+ 1 других файлов) |
| leadershipBased | №0768 |
| leadershipChoices | №0728 |
| leadershipForCheck | №0768 |
| leadershipForChecks | №0768 |
| leadershipForDeception | №0768 |
| leadershipForHistoryInvestigation | №0768 |
| leadershipForIntimidation | №0768 |
| leadershipForReligion | №0768 |
| leadershipModifier | №0728 |
| leadershipStyles | №0728 |
| leadTheCharge | №0768 |
| leaks | №1264 (+ 2 других файлов) |
| learnAnyCastableSpell | №0768 |
| learnBeastShape | №0768 |
| learnCantrip | №0768 |
| learned | №0867 |
| learnedAt | №0659 |
| learnFromUI | №0659 |
| learning | №0822 |
| learnLanguage | №0768 |
| learnMartialWeapon | №0768 |
| learnProfession | №0659 |
| learnSkill | №0768 |
| learnSpell | №0768 |
| learnTargetStatistic | №0768 |
| learnTool | №0768 |
| leather | №0051 (+ 7 других файлов) |
| leatherSole | №0661 |
| leatherStrapV49 | №0656 |
| leatherwork | №0657 (+ 1 других файлов) |
| leatherworker | №0658 (+ 4 других файлов) |
| leavingReach | №0808 (+ 2 других файлов) |
| lectern | №0056 |
| left | №0052 (+ 2 других файлов) |
| leg | №0050 |
| legacy_expansions | №0617 |
| legendary | №0782 (+ 6 других файлов) |
| legendaryActionCurrent | №0800 |
| legendaryActions | №0794 (+ 1 других файлов) |
| legendaryResistance | №0724 |
| legendaryResistanceCurrent | №0800 |
| legendaryResistances | №0794 (+ 1 других файлов) |
| legendaryTandem | №0768 |
| legLength | №0052 (+ 1 других файлов) |
| legs | №0052 (+ 2 других файлов) |
| length | №0048 (+ 19 других файлов) |
| level | №0769 (+ 82 других файлов) |
| level10 | №0066 |
| level18 | №0066 |
| level2 | №0066 |
| level20 | №0817 |
| level6 | №0066 |
| level9 | №0817 |
| levelData | №0689 |
| leveledUp | №0659 |
| levelName | №0659 |
| levels | №0066 (+ 46 других файлов) |
| LEVELS | №0659 |
| levelsRestored | №0637 |
| library | №0060 (+ 2 других файлов) |
| license | №0060 (+ 11 других файлов) |
| lichdom | №0798 |
| lieDetectionAutoFail | №0768 |
| lighting | №0060 |
| lightIntensity | №1113 |
| lightning | №0067 (+ 3 других файлов) |
| lightningArc | №0798 |
| lightningBomb | №0768 |
| lightRadius | №1113 |
| limb | №0050 |
| limbH | №0050 |
| limbIndices | №0050 |
| limbParts | №0050 |
| limbProfile | №0050 (+ 4 других файлов) |
| limbRecords | №0050 |
| limbState | №0050 |
| limestone | №0662 |
| limit | №0825 |
| limitations | №1244 (+ 1 других файлов) |
| line | №0840 |
| linen | №0051 |
| lineOfSight | №1205 (+ 2 других файлов) |
| lingerie | №0051 |
| link | №0765 |
| linked | №0765 |
| linkedClass | №0647 (+ 1 других файлов) |
| linkedHowl | №0630 |
| lipColor | №0055 (+ 1 других файлов) |
| lipOpacity | №1258 |
| lipVolume | №0055 |
| list | №0049 (+ 7 других файлов) |
| listAllClasses | №0650 |
| listByFamily | №0617 (+ 12 других файлов) |
| listBySource | №0617 (+ 12 других файлов) |
| listClasses | №0650 |
| listEquipment | №0055 |
| listPresets | №0055 |
| listRaces | №0055 |
| listSkins | №0055 |
| listSources | №0070 |
| listSubclasses | №0650 |
| liveBodyAfterReanimation | №0858 |
| liveEpoch | №0854 |
| liveRevision | №0854 |
| living | №0772 |
| livingStatue | №0768 |
| lizard | №0050 |
| lizardfolk | №0661 |
| lo | №0050 |
| load | №0058 (+ 4 других файлов) |
| loaded | №0062 |
| loadFailed | №1261 |
| loading | №0062 (+ 1 других файлов) |
| loadSkin | №0057 |
| local | №0047 (+ 1 других файлов) |
| localBackups | №0642 |
| localId | №0642 |
| localStorage | №1059 (+ 32 других файлов) |
| location | №1099 (+ 3 других файлов) |
| locked | №0063 |
| lockedAt1 | №0658 |
| locks | №0659 |
| log | №0837 |
| login | №0642 |
| logout | №0642 |
| long | №0050 (+ 1 других файлов) |
| longevity | №0067 (+ 1 других файлов) |
| longJumpBonusFt | №0768 |
| longRest | №0067 (+ 1 других файлов) |
| longRestAllHitDice | №0768 |
| longRestClears | №0067 |
| longRestEffects | №0807 |
| longRestExhaustionRecovery | №0768 |
| longRestHealingAllowed | №0858 |
| longRestLimit | №0630 |
| longRestOnRevive | №0768 |
| longRestRedistribute | №0768 |
| longRestTempHp | №0768 |
| longRestUses | №0067 |
| loom | №0056 |
| loot | №0059 (+ 19 других файлов) |
| lootId | №0063 |
| lootModel | №0795 |
| lootModels | №0795 |
| loreRecall | №0768 |
| los | №0645 (+ 1 других файлов) |
| loss | №0841 |
| lossHp | №0630 |
| lost | №0655 |
| Loveless | №0768 |
| low | №0048 |
| lowBlow | №0768 |
| lowest | №0047 (+ 1 других файлов) |
| lowestId | №0807 |
| loxodon | №1278 |
| lucidDreaming | №0768 |
| lucidWaking | №0768 |
| lucky | №0771 |
| lunge | №0768 |
| luxury | №0790 (+ 1 других файлов) |
| lycanthropy | №0066 |
| lyre | №0055 |
| M | №0807 |
| macroConfigSha256 | №1294 |
| macrotargets | №1103 |
| mage_slayer | №0771 |
| mageArmor | №0802 |
| mageArmorAC | №0807 |
| mageBerryCount | №0808 (+ 2 других файлов) |
| mageD20Bonus | №0807 |
| mageDamageType | №0808 (+ 1 других файлов) |
| mageEquipmentChanged | №0807 |
| mageGround | №0808 (+ 1 других файлов) |
| mageInfo | №0807 |
| mageOptions | №0807 |
| mageProgress | №0807 |
| mageSpellId | №0808 (+ 2 других файлов) |
| mageStat | №0808 (+ 1 других файлов) |
| mageTargetIds | №0808 (+ 2 других файлов) |
| mageWilling | №0808 (+ 2 других файлов) |
| magFilter | №0052 (+ 1 других файлов) |
| magic | №0833 (+ 2 других файлов) |
| Magic | №0069 |
| magic_initiate | №0771 |
| magicAdvantage | №0798 |
| magical | №0768 (+ 1 других файлов) |
| magical_beast | №0617 (+ 10 других файлов) |
| magicalAttack | №0630 (+ 4 других файлов) |
| magicalDarkness | №0768 |
| magicalFamiliarAttacks | №0768 |
| magicalSecrets | №0637 |
| magicalTinkering | №0637 |
| magicByAffinity | №0833 |
| magicInteractionSafe | №0768 |
| magicItemAdept | №0637 |
| magicShared | №0833 |
| maintainable | №0768 |
| maintainAction | №0768 |
| majestySplash | №0768 |
| major | №0810 |
| major_00 | №0810 |
| major_01 | №0810 |
| major_02 | №0810 |
| major_03 | №0810 |
| major_04 | №0810 |
| major_05 | №0810 |
| major_06 | №0810 |
| major_07 | №0810 |
| major_08 | №0810 |
| major_09 | №0810 |
| major_10 | №0810 |
| major_11 | №0810 |
| major_12 | №0810 |
| major_13 | №0810 |
| major_14 | №0810 |
| major_15 | №0810 |
| major_16 | №0810 |
| major_17 | №0810 |
| major_18 | №0810 |
| major_19 | №0810 |
| major_20 | №0810 |
| major_21 | №0810 |
| majorCost | №0810 |
| majorCurrent | №0810 |
| majorMax | №0810 |
| majorSpent | №0810 |
| makeWeaponAttack | №0768 |
| male | №0048 (+ 1 других файлов) |
| maleProfile | №0047 |
| malformed | №1109 |
| malformedTargetLines | №1107 (+ 1 других файлов) |
| manifest | №0831 |
| manifestations | №0784 |
| manifested | №0802 |
| manifestUrl | №0831 (+ 2 других файлов) |
| map | №0850 |
| mapId | №0060 |
| mappedDisplacementMax | №1108 |
| mappedDisplacementMean | №1108 |
| mappedDisplacementMedian | №1108 |
| mappedDisplacementP95 | №1108 |
| mappedMaxDisplacement | №1107 |
| mappedMeanDisplacement | №1107 |
| mappedMedianDisplacement | №1107 |
| mappedP95Displacement | №1107 |
| mappedRmsDisplacement | №1107 |
| mappedTargetEntries | №1108 |
| mappedVertices | №1097 |
| mapping | №1246 |
| maps | №0659 |
| marble | №0661 |
| marchUntoDestiny | №0792 |
| margin | №1038 |
| mariner | №0768 |
| mark | №0768 |
| marked | №0630 (+ 2 других файлов) |
| markedForDeath | №0768 |
| marketPriceGp | №0788 (+ 1 других файлов) |
| marketReport | №0788 |
| marketSource | №0788 (+ 1 других файлов) |
| marketValue | №0653 (+ 1 других файлов) |
| markPrey | №0768 |
| maroon | №0857 |
| marsh_moss | №0867 |
| marsh_pool | №0867 |
| marsh_reeds | №0867 |
| marshes | №0867 |
| martial_adept | №0771 |
| martialBane | №0768 |
| martialFocus | №0768 |
| masks | №0050 |
| mason | №0659 (+ 3 других файлов) |
| master | №0659 |
| masterOfHell | №0687 |
| masterSpecialization | №0659 |
| masterTactician | №0768 |
| masterwork | №0654 (+ 1 других файлов) |
| masterworkBonus | №0658 |
| mastery | №0069 (+ 2 других файлов) |
| masteryExpiry | №0768 |
| masterySpent | №0768 |
| MAT2 | №0057 (+ 2 других файлов) |
| MAT3 | №0057 (+ 2 других файлов) |
| MAT4 | №0057 (+ 4 других файлов) |
| matched | №0791 |
| material | №0047 (+ 23 других файлов) |
| materialBridge | №0795 |
| materialCost | №0067 |
| materialCostGP | №0802 |
| materialCostPerLevelGP | №0802 |
| materialCount | №0654 |
| materialId | №0653 (+ 11 других файлов) |
| materialKind | №0051 |
| materialOnly | №0782 |
| materials | №0051 (+ 47 других файлов) |
| MATERIALS | №1090 (+ 13 других файлов) |
| materialsCost | №0067 |
| materialsPaid | №1058 |
| materialsUsed | №0654 |
| Math | №1084 (+ 3 других файлов) |
| maturity | №0048 (+ 1 других файлов) |
| max | №0050 (+ 51 других файлов) |
| max_mm | №1071 |
| max_morph_targets | №1100 |
| maxAbility | №0067 (+ 1 других файлов) |
| maxBloodLevels | №0802 |
| maxBuffer | №1290 |
| maxCR | №0768 (+ 1 других файлов) |
| maxDice | №0768 |
| maxDisplacementMeters | №1102 |
| maxDistanceFt | №0768 |
| maxExtraShredPsi | №0768 |
| maxHeal | №0768 |
| maxHitDice | №0768 |
| maxHitPoints | №1202 |
| maxHp | №0067 (+ 68 других файлов) |
| maxHP | №0773 (+ 3 других файлов) |
| maxHpReduction | №0768 |
| maxHpReductionOnNecrotic | №0768 |
| maximize | №0637 (+ 3 других файлов) |
| maximizeAttack | №0807 |
| maximized | №0644 (+ 1 других файлов) |
| maximizeDamageDice | №0637 (+ 1 других файлов) |
| maximizeElementalSpell | №0768 |
| maximizeNextAttack | №0807 |
| maximizeNextRoll | №0807 |
| maximum | №0067 |
| maxIntelligence | №0818 |
| maxLevels | №0637 (+ 1 других файлов) |
| maxObjects | №0768 |
| maxOutside | №1246 |
| maxPoints | №0613 (+ 1 других файлов) |
| maxPotions | №0067 |
| maxScore | №0768 |
| maxSizeFt | №0768 |
| maxSlots | №0833 |
| maxSpellLevel | №0792 |
| maxSpellLevelByLevel | №0792 |
| maxSpend | №0798 |
| maxSpendTempHp | №0768 |
| maxStages | №0067 |
| maxStrands | №0048 |
| maxStrDexCon | №0768 |
| maxTargets | №0768 |
| maxUses | №0643 |
| maxWeightLb | №0768 |
| me | №1118 (+ 9 других файлов) |
| measureStartId | №0615 |
| mechanics | №0666 (+ 16 других файлов) |
| mechanicsPending | №0860 (+ 1 других файлов) |
| mechanicsSource | №0690 (+ 3 других файлов) |
| mechanicsStatus | №0677 |
| medicine | №0659 (+ 3 других файлов) |
| medium | №0048 (+ 2 других файлов) |
| mediumArmorWisInsteadOfDex | №0768 |
| meleeAttack | №0768 (+ 1 других файлов) |
| meleeDamage | №0802 |
| meleeExtraDamage | №0768 |
| meleeOrThrown | №0645 (+ 1 других файлов) |
| meleeSpellAttack | №0768 |
| meleeWeaponAttack | №0768 |
| members | №0763 |
| menacingShout | №0768 |
| mentalAny | №0861 |
| mentalConstruct | №0768 |
| mentalDefense | №0765 |
| mentalSavesDisadvantage | №0768 |
| mentalSource | №0805 |
| mentalStats | №0773 |
| mentalStatsPersist | №0773 |
| mentor | №0728 (+ 2 других файлов) |
| mercenary | №0768 |
| merciless | №0768 |
| mercy | №0792 |
| mesh | №1098 (+ 1 других файлов) |
| meshes | №0052 (+ 5 других файлов) |
| meshWeights | №0058 (+ 1 других файлов) |
| message | №0066 (+ 33 других файлов) |
| messy | №0050 |
| messy_crop | №0050 (+ 1 других файлов) |
| meta | №0840 |
| META_COST | №0637 |
| META_NAMES | №0637 |
| metadata | №0067 (+ 12 других файлов) |
| metal | №0051 (+ 1 других файлов) |
| metalworker | №0659 |
| metamagic | №0637 |
| metamagic_adept | №0771 |
| metamorphosesKnown | №0637 |
| metamorphosesMax | №0637 |
| metamorphosis | №0066 |
| method | №0642 (+ 3 других файлов) |
| metrics | №0052 |
| mettle | №0644 (+ 2 других файлов) |
| mid | №0852 |
| mimic | №0675 |
| min | №0050 (+ 17 других файлов) |
| minAppVersion | №0831 (+ 1 других файлов) |
| minAt11 | №0768 |
| Mind | №0069 |
| mindLeech | №0768 |
| mindRead | №0765 |
| mindReadingImmunity | №0768 |
| mindsightFt | №0768 |
| mindsightTrackingHours | №0768 |
| mindStats | №0805 |
| mindThrust | №0768 |
| miner | №0790 (+ 1 других файлов) |
| mineral | №0815 |
| minFilter | №0052 (+ 1 других файлов) |
| minHeight | №0875 |
| minimal | №0055 |
| minimum | №0067 (+ 3 других файлов) |
| minimumAC | №0768 |
| minimumD20 | №0768 |
| minIndex | №1109 |
| mining | №0814 (+ 1 других файлов) |
| minion | №0768 |
| minionResistance | №0768 |
| minionRollBonus | №0768 |
| minionTypes | №0768 |
| minLevel | №0661 |
| minor | №0810 |
| minotaur | №1278 |
| minPsi | №0768 |
| minStr | №0073 |
| minusD4AllD20 | №0768 |
| minutesSinceDeath | №1058 |
| minWidth | №0875 |
| miracle | №0802 |
| miraculousHealing | №0792 |
| miserableCompany | №0768 |
| misfortune | №0066 (+ 1 других файлов) |
| miss | №0768 |
| missed | №0824 |
| missedUnarmedExtraAttack | №0768 |
| missing | №0653 (+ 5 других файлов) |
| missingTools | №0657 (+ 2 других файлов) |
| missRecoveryMinutes | №0768 |
| missRefund | №0768 |
| missRefunds | №0798 |
| mistAffinity | №0618 |
| mistStep | №0802 |
| mithral | №0657 |
| mitosis | №0828 |
| mix | №0070 |
| mixBonus | №1150 |
| mixedPotions | №0768 |
| mixPotions | №0067 |
| mobility | №0630 |
| Mobility | №0768 |
| mod | №0816 (+ 1 других файлов) |
| mode | №0048 (+ 17 других файлов) |
| model | №0059 (+ 2 других файлов) |
| modelFamily | №0055 |
| modelLoc | №0062 |
| modes | №0817 |
| modifier | №0790 (+ 5 других файлов) |
| modifierAtLevel20 | №0818 |
| modifierIds | №0663 |
| modifiers | №0768 (+ 1 других файлов) |
| modifyStats | №0807 |
| modules | №0842 |
| mohawk | №0050 (+ 1 других файлов) |
| monastery | №0056 |
| monster | №0795 (+ 3 других файлов) |
| monster_acid_slime | №0815 |
| monster_acolyte_cloth | №0815 |
| monster_air_essence | №0815 |
| monster_air_vortex | №0815 |
| monster_ankheg_acid_gland | №0815 |
| monster_ankheg_shell | №0815 |
| monster_bandit_captain_leather_armor | №0815 |
| monster_bandit_hide | №0815 |
| monster_basilisk_eye | №0815 |
| monster_basilisk_gallstone | №0815 |
| monster_basilisk_scale | №0795 |
| monster_bear_fat | №0815 |
| monster_bear_hide | №0815 |
| monster_blink_dog_pelt | №0815 |
| monster_blink_dog_phase_gland | №0815 |
| monster_boar_hide | №0815 |
| monster_boar_tusk | №0815 |
| monster_bugbear_fang | №0815 |
| monster_bugbear_hide | №0815 |
| monster_carrion_chitin | №0815 |
| monster_carrion_crawler_paralytic | №0815 |
| monster_constrictor_hide | №0815 |
| monster_constrictor_venom | №0815 |
| monster_crocodile_hide | №0815 |
| monster_crocodile_teeth | №0815 |
| monster_cultist_cloth | №0815 |
| monster_deer_antler | №0815 |
| monster_deer_hide | №0815 |
| monster_direwolf_fang | №0815 |
| monster_direwolf_hide | №0795 (+ 1 других файлов) |
| monster_displacer_hide | №0815 |
| monster_displacer_tentacle | №0815 |
| monster_dragon_blood | №0795 |
| monster_dragon_bones | №0795 (+ 1 других файлов) |
| monster_dragon_heart | №0815 |
| monster_dragon_scales | №0795 (+ 1 других файлов) |
| monster_earth_core | №0815 |
| monster_earth_essence | №0815 |
| monster_ectoplasm | №0815 |
| monster_ethereal_shard | №0815 |
| monster_fire_ash | №0815 |
| monster_fire_essence | №0815 |
| monster_frog_gland | №0815 |
| monster_frog_skin | №0815 |
| monster_ghost_thread | №0815 |
| monster_ghoul_claw | №0815 |
| monster_ghoul_tissue | №0815 |
| monster_giant_eagle_claw | №0815 |
| monster_giant_eagle_feather | №0815 |
| monster_giant_owl_eye | №0815 |
| monster_giant_owl_feather | №0815 |
| monster_gnoll_hide | №0815 |
| monster_gnoll_tooth | №0815 |
| monster_goblin_hide | №0815 |
| monster_harpy_vocal_membrane | №0815 |
| monster_hyena_fangs | №0815 |
| monster_hyena_hide | №0815 |
| monster_kobold_horn | №0815 |
| monster_kobold_scalehide | №0815 |
| monster_manticore_hide | №0815 |
| monster_manticore_meat | №0815 |
| monster_manticore_spines | №0795 |
| monster_meat | №0815 |
| monster_mimic_skin | №0815 |
| monster_mimic_slime | №0815 |
| monster_orc_hide | №0815 |
| monster_owlbear_claw | №0815 |
| monster_owlbear_feathers | №0795 |
| monster_owlbear_hide | №0795 (+ 1 других файлов) |
| monster_rat_fangs | №0815 |
| monster_rat_hide | №0815 |
| monster_rust_chitin | №0815 |
| monster_rust_gland | №0815 |
| monster_shadow_clot | №0815 |
| monster_slime_membrane | №0815 |
| monster_spectral_dust | №0815 |
| monster_spider_chitin | №0795 |
| monster_spider_silk | №0795 (+ 1 других файлов) |
| monster_spider_venom | №0815 |
| monster_troll_blood | №0795 (+ 1 других файлов) |
| monster_troll_claw | №0815 |
| monster_troll_hide | №0795 (+ 1 других файлов) |
| monster_veteran_leather_armor | №0815 |
| monster_water_core | №0815 |
| monster_water_essence | №0815 |
| monster_wight_bone | №0815 |
| monster_wight_essence | №0815 |
| monster_wolf_hide | №0795 (+ 1 других файлов) |
| monsterCount | №0794 |
| monsterCR | №0797 |
| monsterId | №0772 (+ 5 других файлов) |
| monsterName | №0800 |
| monsterparts | №0790 (+ 1 других файлов) |
| MONSTERS | №0644 |
| monstrosity | №0617 (+ 13 других файлов) |
| monstrousGrafts | №0067 |
| monstrousMenagerie | №0768 |
| monstrousMinion | №0765 (+ 1 других файлов) |
| moonEffects | №0802 |
| morph_names | №1100 |
| morph_primitives | №1100 |
| morphAccessor | №1097 |
| morphBufferView | №1097 |
| morphChannels | №0057 (+ 1 других файлов) |
| morphNames | №0058 (+ 2 других файлов) |
| morphs | №0055 (+ 3 других файлов) |
| morphSet | №0055 |
| morphTargets | №0058 (+ 1 других файлов) |
| morphWeights | №0055 |
| mount | №0798 |
| mountaineer | №0768 |
| mountainsEndurance | №0768 |
| mountCantripSwap | №0798 |
| mounted | №0802 |
| mountRollBonus | №0768 |
| mountSpeed | №0798 |
| moustache | №0052 (+ 3 других файлов) |
| mouth | №0050 |
| mouthWidth | №0055 (+ 1 других файлов) |
| moveAlliesHalfSpeed | №0768 |
| moveAndAttack | №0768 |
| moveCostFt | №0067 |
| moved | №0852 |
| movedFt | №0807 |
| moveFt | №0675 (+ 4 других файлов) |
| moveHalfSpeed | №0630 |
| movement | №0067 (+ 19 других файлов) |
| movementAllowance | №0807 |
| movementUsed | №0067 (+ 14 других файлов) |
| movementWithoutOpportunityAttacks | №0802 |
| moveReward | №0807 |
| moveStraightFt | №0768 |
| moveThralls | №0798 |
| moveThroughCreatures | №0768 |
| moveThroughProneCreatures | №0768 |
| moveTo | №0800 (+ 1 других файлов) |
| moveToward | №0645 |
| moving | №0050 |
| moxie | №0705 (+ 2 других файлов) |
| moxieFraction | №0765 |
| moxieFueledFists | №0705 |
| moxieOnFail | №0768 |
| moxieRefunded | №0768 |
| moxieRestored | №0768 |
| moxieSpent | №0768 |
| msg | №0838 (+ 1 других файлов) |
| muddledMind | №0630 |
| mufflingImprecation | №0768 |
| mult | №0656 (+ 1 других файлов) |
| multiAttackAction | №0644 (+ 1 других файлов) |
| multiclass | №0067 (+ 7 других файлов) |
| multiclassAllowed | №0635 (+ 7 других файлов) |
| multiclassProficiencies | №0666 (+ 6 других файлов) |
| multiclassRequirement | №0066 (+ 18 других файлов) |
| multiplier | №0794 |
| mummification | №0768 |
| mummyLord | №0768 |
| mummyRot | №0768 |
| muscle | №0052 (+ 5 других файлов) |
| mutagen | №0630 (+ 2 других файлов) |
| mutagenAbility | №0067 |
| mutagencraft | №0630 |
| mutagenMaximum | №0067 |
| mutagenNoDownside | №0067 |
| mutagens | №0630 (+ 1 других файлов) |
| mutations | №0805 (+ 2 других файлов) |
| mutationSlots | №0805 (+ 1 других файлов) |
| muzzle | №0050 |
| muzzleHeight | №0055 (+ 7 других файлов) |
| muzzleLength | №0055 (+ 9 других файлов) |
| muzzleWidth | №0055 (+ 7 других файлов) |
| myconid | №1270 |
| mysteries | №0696 (+ 1 других файлов) |
| mystery | №0802 |
| mysticArcanum | №0637 |
| mysticEmpowerment | №0822 |
| mysticFrenzy | №0630 |
| mythicForms | №0822 |
| mythicVoice | №0768 |
| n | №0047 (+ 4 других файлов) |
| name | №0049 (+ 235 других файлов) |
| NAME | №0655 |
| nameRu | №0613 (+ 8 других файлов) |
| nameRus | №1035 |
| names | №1148 (+ 1 других файлов) |
| narrow | №0050 (+ 2 других файлов) |
| native | №0799 (+ 1 других файлов) |
| nativeHeadH | №0050 |
| natural | №0055 |
| natural20 | №0800 (+ 1 других файлов) |
| naturalArmor | №0822 |
| naturalAttacks | №0805 (+ 1 других файлов) |
| naturalExplorer | №0637 |
| naturalist | №0818 |
| naturalRecovery | №0805 |
| naturalWeapons | №0822 |
| nature | №0761 (+ 2 других файлов) |
| Nausea | №0069 |
| navigation | №0765 |
| navigator | №1089 (+ 9 других файлов) |
| navigatorCrew | №0768 |
| navy | №0857 |
| nearAllyId | №0807 (+ 1 других файлов) |
| neck | №0050 (+ 2 других файлов) |
| neckDepth | №1068 (+ 2 других файлов) |
| neckline | №1068 (+ 1 других файлов) |
| necrodancer | №0798 |
| necromancyDamageBonusPerCharnel | №0798 |
| necromancyUnleashed | №0798 |
| necromanticSpurs | №0768 |
| necromanticSustainment | №0768 |
| necrotic | №0765 (+ 1 других файлов) |
| Necrotic | №0069 |
| necroticAffinity | №0802 |
| necroticBone | №0815 |
| necroticDamage | №0765 (+ 2 других файлов) |
| necroticEssence | №0815 |
| necroticIgnoreImmunity | №0798 |
| necroticIgnoreResistance | №0798 |
| necroticReagent | №0815 |
| need | №0661 |
| needsChoice | №0067 |
| needsConfirmation | №0067 |
| needsDonor | №0067 |
| needsMaterials | №0067 |
| needsRoll | №0067 |
| needsSubclassChoice | №0689 |
| needsTarget | №0067 |
| needsTime | №0067 |
| negatingAnathema | №0768 |
| negative | №1059 (+ 3 других файлов) |
| negotiated | №0790 |
| negotiatedPrice | №0790 |
| negotiatedQuote | №0790 |
| negotiationModifier | №0790 |
| network | №0837 (+ 2 других файлов) |
| neutral | №0054 |
| newDraft | №0850 |
| newJinxOptions | №0768 |
| newTraderIds | №0789 |
| newValue | №0800 |
| next | №0047 (+ 2 других файлов) |
| nextAttackAdvantage | №0630 (+ 1 других файлов) |
| nextAttackBonus | №0768 |
| nextAttackExtraDice | №0067 |
| nextBombOnly | №0067 |
| nextConcentrationSaveDisadvantage | №0630 |
| nextDamageDice | №0768 |
| nextHitCrit | №0768 |
| nextRiteHitExtraDie | №0630 |
| nextRollMaximum | №0807 |
| nextSaveAdvantage | №0768 |
| nextSpellOrWeaponDamageDisadvantage | №0768 |
| nextTick | №0067 (+ 1 других файлов) |
| nextWisSaveDisadvantage | №0630 |
| night | №0062 |
| nighteye | №0630 |
| Nighteye | №0768 |
| nightforest | №0052 |
| nightmareMount | №0798 |
| nightTerrors | №0768 |
| nightTerrorsWhileAsleep | №0768 |
| noAction | №0768 |
| noActions | №0807 |
| noAging | №0768 |
| noAttacks | №0807 (+ 1 других файлов) |
| Noble | №0784 |
| noConcentrationCheck | №0792 |
| noCoverOrInvisibility | №0630 |
| noDamage | №0067 |
| noDash | №0768 |
| node | №0057 (+ 3 других файлов) |
| nodeId | №0867 |
| nodeIntegration | №0875 |
| nodes | №0867 (+ 7 других файлов) |
| noDisadvantage | №0768 |
| noDisengage | №0807 |
| noFallDamage | №0768 |
| noFoodOrDrink | №0768 |
| noForcedMovement | №0807 (+ 1 других файлов) |
| noFreeWill | №0858 |
| noHealing | №0768 |
| noHealingFromOwnSpells | №0792 |
| noHealingUntilStartNextTurn | №0768 |
| noHelp | №0807 |
| noHide | №0051 (+ 1 других файлов) |
| noMainAction | №0807 (+ 1 других файлов) |
| noMaintainAction | №0768 |
| noMovement | №0807 |
| nonAttackAccursedDamageBonus | №0768 |
| nonCombat | №0646 |
| none | №0055 (+ 1 других файлов) |
| nonlethal | №0067 |
| nonmagicalDamageReduction | №0768 |
| nonManifold | №1073 |
| nonZeroMappedGlbVertexPct | №1107 |
| nonZeroMappedGlbVertices | №1107 |
| nonZeroPct | №1097 |
| nonZeroTargetEntries | №1108 |
| nonZeroVertices | №1097 |
| noOldAgeDeath | №0802 |
| noOpportunity | №0765 |
| noOpportunityAttacks | №0067 (+ 3 других файлов) |
| noReaction | №0768 (+ 1 других файлов) |
| noReactions | №0630 (+ 4 других файлов) |
| noReduction | №0768 |
| noRest | №0768 |
| normal | №0816 (+ 1 других файлов) |
| normalForm | №0822 |
| normalize | №0048 (+ 6 других файлов) |
| normalizeCharacter | №0773 (+ 3 других файлов) |
| normalizeClassName | №0825 |
| normalizeConditionName | №0816 (+ 2 других файлов) |
| normalizeHead | №0055 |
| normalPaceStealth | №0768 |
| normals | №0050 (+ 2 других файлов) |
| noseLength | №0055 |
| noseWidth | №0055 (+ 1 других файлов) |
| noShield | №0768 |
| noSpells | №0807 |
| noStandardHealing | №0828 |
| noSurprise | №0768 |
| notation | №0818 |
| note | №0644 (+ 8 других файлов) |
| noteAffect | №0807 |
| noteD20Roll | №0807 |
| noteMove | №0807 |
| notes | №0613 (+ 28 других файлов) |
| noTransfer | №0807 |
| noUnderwaterDrawbacks | №0768 |
| nourishing | №0768 |
| noVerbal | №0807 (+ 1 других файлов) |
| npcs | №1199 |
| nTexture | №0065 |
| nuclearBomb | №0666 |
| nullification | №0768 |
| number | №0810 |
| numerator | №0810 |
| nylon | №0051 |
| oak | №0661 (+ 1 других файлов) |
| objectId | №0768 (+ 2 других файлов) |
| objectIds | №1148 |
| objectMeleeDamageMultiplier | №0768 |
| objects | №0060 (+ 1 других файлов) |
| obscured | №0675 |
| observe | №0630 |
| obstacles | №1114 (+ 10 других файлов) |
| obstinateAnathema | №0768 |
| occultFetish | №0802 |
| occultRitesKnown | №0696 |
| ocean | №0052 |
| odds | №0810 |
| offer | №0810 |
| offeredCp | №0790 (+ 1 других файлов) |
| official | №0649 (+ 1 других файлов) |
| official_expansion | №0617 |
| offline | №0841 (+ 1 других файлов) |
| oil | №0067 |
| oilBomb | №0768 |
| oilCoated | №0067 |
| ok | №0821 (+ 79 других файлов) |
| old | №0800 |
| oldFormat | №1126 |
| oldLevel | №0659 |
| oldOneTwo | №0768 |
| omnipotence | №0768 (+ 1 других файлов) |
| omnipresence | №0768 (+ 1 других файлов) |
| omniscience | №0768 (+ 1 других файлов) |
| onApply | №0832 |
| onAttackResult | №0066 (+ 8 других файлов) |
| once | №0071 (+ 6 других файлов) |
| oncePerLongRest | №0792 |
| oncePerTurn | №0067 (+ 1 других файлов) |
| onChange | №0642 |
| onclick | №1206 |
| onCondition | №0630 (+ 5 других файлов) |
| onDamage | №0630 (+ 4 других файлов) |
| onDefeat | №0772 |
| onePerShortRest | №0798 |
| oneThirdCaster | №0768 |
| onFail | №0763 (+ 1 других файлов) |
| ongoingDamage | №0675 |
| onHitSave | №0807 |
| onLine | №1089 (+ 1 других файлов) |
| onlyDeadBodies | №0858 |
| onlyMisfortuneFeatures | №0768 |
| onNatural1 | №0067 |
| onPreyDeath | №0768 |
| onProgress | №0831 |
| onRetry | №0832 |
| onSave | №0768 |
| onSavingThrow | №0637 (+ 1 других файлов) |
| onTurnEnd | №0066 (+ 10 других файлов) |
| ooze | №0763 |
| opacity | №0050 (+ 1 других файлов) |
| open | №0049 (+ 27 других файлов) |
| OPENAI_API_KEY | №1055 |
| openBoard | №0850 |
| openDebug | №0837 |
| openHandTechnique | №0800 |
| openInfo | №0655 |
| openLog | №0837 |
| openMainMenuUpdate | №0831 |
| openMind | №0768 |
| openReplay | №0836 |
| openTrade | №0790 |
| operationId | №0807 (+ 20 других файлов) |
| opportunityAdvantage | №0807 |
| opportunityAttack | №0807 (+ 3 других файлов) |
| opportunityAttackBecomesGrapple | №0768 |
| optics | №0659 |
| optional | №0784 |
| optionalSlotDice | №0768 |
| options | №0051 (+ 6 других файлов) |
| optionsFor | №0051 |
| opts | №0800 (+ 1 других файлов) |
| oracle | №0630 (+ 2 других файлов) |
| Oracle | №0696 |
| orange | №0821 |
| orcish_fury | №0771 |
| orcsteppe | №0052 |
| order | №0630 (+ 1 других файлов) |
| orders | №0677 (+ 1 других файлов) |
| organ | №0815 |
| organic | №0052 |
| origin | №0062 |
| original | №0067 |
| originalStats | №0805 (+ 1 других файлов) |
| originRaceId | №0055 (+ 1 других файлов) |
| ostorianDiscourse | №0768 |
| other | №1066 (+ 1 других файлов) |
| otherStyleEffectsPending | №0861 |
| otherworldlyPatron | №0630 |
| outcome | №0661 (+ 1 других файлов) |
| outcomeLabel | №0661 |
| outer | №0047 (+ 2 других файлов) |
| outlandsEligible | №0621 |
| outOfOrder | №0841 |
| output | №0656 (+ 7 других файлов) |
| outputBytes | №1097 |
| oval | №0052 (+ 1 других файлов) |
| oven | №0056 |
| overCorset | №0051 |
| overCuirass | №0051 |
| overflow | №1257 |
| overheat | №0768 |
| overheatIgnoresImmunity | №0768 |
| overlay | №0832 |
| overlord | №0798 |
| overpayCp | №0791 |
| owl | №0050 |
| owlbear | №0675 |
| own | №1116 |
| ownedCondition | №0807 |
| owner | №1059 |
| owner_id | №1089 |
| ownerId | №0067 (+ 9 других файлов) |
| ownerPeerId | №1142 (+ 7 других файлов) |
| ownerTokenId | №0067 (+ 4 других файлов) |
| ownerTurns | №0630 |
| ownTurnId | №0810 (+ 1 других файлов) |
| ox | №0061 |
| oy | №0061 |
| p | №0047 (+ 2 других файлов) |
| p_deleted | №0642 |
| p_expected_revision | №0642 |
| p_id | №0642 |
| p_operation_id | №0642 |
| p_profile | №0642 |
| p_schema_version | №0642 |
| p1 | №1205 (+ 3 других файлов) |
| p2 | №1205 |
| pa | №1142 |
| pack | №0052 (+ 7 других файлов) |
| PACK_ID | №0067 (+ 2 других файлов) |
| packId | №0650 |
| packleader | №0768 |
| Packleader | №0784 |
| packs | №0765 (+ 2 других файлов) |
| packTactics | №0768 |
| pact | №0816 (+ 1 других файлов) |
| pactBoon | №0637 |
| pactLevel | №0787 |
| pactMagic | №0630 (+ 3 других файлов) |
| pactMagicData | №0800 (+ 4 других файлов) |
| padding | №0660 |
| paid_api_authorized | №1055 |
| painkiller | №0768 |
| painkillerGrandStrategist | №0768 |
| painkillerPunishment | №0768 |
| paint | №0067 |
| paintBomb | №0768 |
| paintCreatures | №0067 |
| painter | №0659 (+ 3 других файлов) |
| paintV38 | №0661 |
| paladin | №0787 (+ 1 других файлов) |
| paleMaster | №0798 |
| panelScroll | №1257 |
| panelUV | №0051 |
| panX | №0059 (+ 2 других файлов) |
| panY | №0059 (+ 2 других файлов) |
| paper | №0657 (+ 2 других файлов) |
| Paragon | №0784 |
| paragonOfChivalry | №0768 |
| paralyticReagent | №0815 |
| paralyzed | №0768 (+ 1 других файлов) |
| parasiteMind | №0805 |
| parchment | №0657 (+ 2 других файлов) |
| parent | №0809 |
| parentContainerId | №0778 |
| parentId | №0828 |
| parentNode | №1206 |
| parentTriangles | №1263 (+ 3 других файлов) |
| parley | №0768 |
| parleyFree | №0768 |
| parseDice | №0816 (+ 5 других файлов) |
| part | №0054 |
| partial | №0048 |
| participantTurnStart | №0807 |
| partnerId | №0807 |
| parts | №0047 (+ 13 других файлов) |
| pass | №0843 |
| passesThroughCreatures | №0768 |
| passive | №0052 (+ 9 других файлов) |
| password | №0642 |
| patch | №0654 (+ 1 других файлов) |
| path | №0056 (+ 31 других файлов) |
| pathCost | №1219 (+ 1 других файлов) |
| pathFt | №0800 |
| patientDefense | №0637 |
| patron | №0630 (+ 5 других файлов) |
| patrons | №0630 |
| patternScale | №0051 |
| pauldrons | №0051 |
| pawPadColor | №0055 |
| payHitPointCost | №0644 |
| payload | №0800 (+ 16 других файлов) |
| payOwnHPForCharnel | №0798 |
| PB | №0773 (+ 3 других файлов) |
| pc | №0799 |
| pd | №1142 |
| peaceAura | №0807 (+ 2 других файлов) |
| peaceBlocked | №0644 (+ 1 других файлов) |
| peakPhysicalCondition | №0705 (+ 1 других файлов) |
| pectorals | №0052 (+ 1 других файлов) |
| peer | №0800 |
| peerId | №1196 |
| peerName | №0799 |
| penaltyPerFatigue | №0768 |
| pending | №0067 (+ 3 других файлов) |
| pendingAnswer | №0799 |
| pendingAttack | №0644 (+ 1 других файлов) |
| pendingDamage | №0630 (+ 3 других файлов) |
| pendingInitiativeBonus | №0807 |
| pendingOffer | №0799 |
| pendingOnHit | №0067 (+ 3 других файлов) |
| pendingReaction | №0800 |
| pendingReactions | №0800 (+ 1 других файлов) |
| pendingSelection | №0637 |
| penetratesResistance | №0768 |
| penetratingDice | №0768 |
| pentacles | №0807 (+ 1 других файлов) |
| pentacles_14 | №0807 |
| percent | №0810 |
| perception | №0761 (+ 1 других файлов) |
| Perception | №0069 |
| perceptionReagent | №0815 |
| percipient | №0630 |
| Percipient | №0768 |
| perfectSelf | №0637 |
| performance | №0761 (+ 3 других файлов) |
| perilousGambit | №0768 |
| permanentCurse | №0768 |
| persistent | №0768 |
| persistentRage | №0637 |
| persona | №0768 |
| persuasion | №0761 (+ 2 других файлов) |
| persuasionDeceptionIntimidationFloor | №0768 |
| perTargetLongRest | №0768 |
| perTurn | №0798 |
| petrification | №0768 |
| Petrification | №0069 |
| petrificationReagent | №0815 |
| pharaoh | №0798 |
| phase | №0050 (+ 3 других файлов) |
| phaseFiber | №0815 |
| phaseReagent | №0815 |
| phaseRift | №0768 |
| phaseRiftNoStraightLine | №0768 |
| phaseThrough | №0768 |
| phaseWeaponAttack | №0768 |
| philosophersStone | №0666 |
| physicalAndroidQA | №1102 |
| physicalResistance | №0828 |
| physicalStats | №0773 (+ 1 других файлов) |
| physicalStatsFromShell | №0773 |
| physician | №0818 |
| pickFloor | №0062 |
| pickLevel | №0066 (+ 17 других файлов) |
| piercing | №0860 |
| pigment | №0661 |
| pineResin | №0662 |
| pissAndVinegar | №0705 |
| pitch | №0059 (+ 1 других файлов) |
| pixie | №0050 (+ 1 других файлов) |
| pl | №0062 |
| placeToken | №0850 |
| plague | №0828 |
| plagueLord | №0798 |
| plain | №0652 |
| plan | №0800 (+ 1 других файлов) |
| planar | №0621 |
| planarInfluence | №0621 |
| planes | №0621 |
| planescape | №0621 |
| planned | №0649 |
| planPreview | №0615 |
| plant | №0617 (+ 11 других файлов) |
| plasmoid | №1270 |
| plateColor | №0055 (+ 1 других файлов) |
| plates | №0055 |
| plateSize | №0055 (+ 2 других файлов) |
| play | №0807 (+ 1 других файлов) |
| playerAction | №1206 |
| playfair | №0821 |
| playing | №0071 (+ 1 других файлов) |
| playingTheOdds | №0768 |
| pleats | №0051 (+ 3 других файлов) |
| plusDex | №0802 |
| pockets | №0617 (+ 18 других файлов) |
| pocketSand | №0768 |
| point | №0050 (+ 2 других файлов) |
| pointerId | №1059 |
| points | №0050 (+ 1 других файлов) |
| poison | №0637 (+ 3 других файлов) |
| poisonBypass | №0802 |
| poisoned | №0798 (+ 1 других файлов) |
| poisoner | №0661 (+ 3 других файлов) |
| poisonIgnoresImmunity | №0798 |
| poisonIgnoresResistance | №0798 |
| poisonOnCharnel | №0798 |
| poisonResistance | №0765 |
| polearm_master | №0771 |
| polyglot | №0768 (+ 1 других файлов) |
| ponytail | №0050 (+ 1 других файлов) |
| pool | №0798 (+ 1 других файлов) |
| poor | №0654 (+ 1 других файлов) |
| porcelainClay | №0662 |
| portalAffinity | №0621 |
| portalRoute | №0621 |
| pos | №0062 |
| pose | №0055 |
| poseBuilds | №0052 |
| poses | №0054 |
| position | №0050 (+ 10 других файлов) |
| POSITION | №0053 (+ 6 других файлов) |
| positions | №0047 (+ 11 других файлов) |
| positive | №1059 (+ 3 других файлов) |
| Possessed | №0768 |
| possession | №0066 (+ 1 других файлов) |
| possessLiving | №0773 |
| postMessage | №0876 |
| pot | №0056 |
| potash | №0662 |
| potency | №0069 (+ 1 других файлов) |
| Potency | №0768 |
| potentObservation | №0818 |
| potion | №0067 (+ 4 других файлов) |
| potionBrewing | №0666 |
| potionCap | №0798 |
| potionColor | №0067 (+ 1 других файлов) |
| potionMixologist | №0666 |
| potions | №0067 |
| potter | №0659 (+ 3 других файлов) |
| pottery | №0657 (+ 1 других файлов) |
| power | №0050 (+ 2 других файлов) |
| powerOfTwo | №0052 |
| powerPreference | №0062 |
| pp | №0779 (+ 5 других файлов) |
| precedence | №0843 |
| precision | №0630 |
| Precision | №0768 |
| precisionStrike | №0768 |
| precognition | №0768 |
| predatoryInstinct | №0768 |
| predictiveDodge | №0768 |
| predictorCardId | №1134 (+ 1 других файлов) |
| predictorMajor | №1135 |
| predictorState | №1089 |
| preload | №0875 |
| prepare | №0054 (+ 1 других файлов) |
| prepared | №0067 (+ 4 других файлов) |
| preparedActions | №0800 (+ 1 других файлов) |
| preparedByLevel | №0792 (+ 1 других файлов) |
| preparedClasses | №0825 |
| preparedLastStand | №0807 |
| preparedLimit | №0825 |
| preparedReactionAttack | №0637 |
| preparedSpells | №0792 (+ 1 других файлов) |
| prepareForLibrary | №0060 |
| prepareInspiration | №0807 |
| prerequisite | №0677 (+ 6 других файлов) |
| present | №0822 (+ 1 других файлов) |
| preserved | №0768 |
| preserveLife | №0637 (+ 1 других файлов) |
| preset | №0052 (+ 5 других файлов) |
| presetId | №0055 (+ 1 других файлов) |
| presets | №0055 (+ 1 других файлов) |
| press | №0056 |
| preSubclassBase | №0810 |
| pretendToBeVisual | №1112 |
| preventDropToZero | №0768 |
| preventExhaustion | №0768 |
| preventOpportunity | №0807 |
| preventsOpportunity | №0807 |
| preventZero | №0768 |
| preventZeroHp | №0675 |
| preview | №0060 |
| previewDisassembly | №0653 |
| previous | №0772 (+ 1 других файлов) |
| previousHp | №0644 |
| preyDamage | №0768 |
| price | №0617 (+ 20 других файлов) |
| priceImproved | №1154 |
| priceModifier | №0790 |
| primalChampion | №0637 |
| primalResilience | №0822 |
| primary | №0821 |
| primaryAbilities | №0067 (+ 4 других файлов) |
| primaryResourceId | №0070 |
| primaryStat | №0066 (+ 31 других файлов) |
| primeBomb | №0666 |
| primeval | №0768 |
| primevalForm | №0822 |
| primevalResurgence | №0822 |
| primitives | №1098 (+ 1 других файлов) |
| primordial | №0675 |
| priority | №0637 (+ 2 других файлов) |
| prismatic | №0067 |
| prismaticBomb | №0768 |
| prismaticIndex | №1058 |
| pristine | №0653 (+ 1 других файлов) |
| privileges | №0875 |
| processedEach | №0652 |
| processedId | №0815 |
| processedRuns | №0652 |
| processedUnit | №0815 |
| processing | №0661 (+ 1 других файлов) |
| prodigy | №0661 |
| profBonus | №0613 (+ 20 других файлов) |
| profession | №0659 (+ 4 других файлов) |
| professionBonus | №1150 |
| professionIds | №0659 |
| professionProfile | №0070 |
| professionRequirements | №0659 |
| PROFESSIONS | №0659 |
| proficiencies | №0635 (+ 10 других файлов) |
| proficiency | №0735 (+ 4 других файлов) |
| proficiencyBonus | №0647 (+ 13 других файлов) |
| proficiencyIfUntrained | №0807 |
| proficiencyRank | №1132 |
| proficiencyType | №0073 |
| proficient | №0636 (+ 6 других файлов) |
| profile | №0050 (+ 15 других файлов) |
| profileResources | №0800 |
| prog | №0062 |
| progression | №0638 (+ 15 других файлов) |
| progressionSource | №0690 (+ 3 других файлов) |
| project | №1244 (+ 1 других файлов) |
| projectedWeaponBonus | №0768 |
| projectile | №0644 (+ 3 других файлов) |
| projection | №0768 (+ 3 других файлов) |
| projectItem | №0768 |
| projectMobility | №0630 |
| projectPoint | №0062 |
| projectScreen | №0062 |
| projectUrl | №0640 (+ 4 других файлов) |
| projectVariant | №0824 |
| prolificAffliction | №0768 |
| prompt | №1138 (+ 8 других файлов) |
| prone | №0768 (+ 1 других файлов) |
| proneOnHit | №0768 |
| proneOnSuccess | №0768 |
| pronounced | №0048 |
| prop | №0067 |
| properties | №0068 (+ 10 других файлов) |
| propertiesHidden | №0070 |
| property | №0069 |
| proportions | №1103 |
| props | №0663 |
| protectAlly | №0675 |
| protected | №0807 |
| protection | №0765 |
| protector | №0675 |
| protege | №0768 |
| protegeAdvantageAfterExploit | №0768 |
| protegeUpgrade | №0768 |
| provokesNoOpportunity | №0765 |
| provokesOpportunityAttacks | №0807 |
| pseudopodSize | №0055 (+ 1 других файлов) |
| psi | №1146 |
| psiLimit | №0703 (+ 1 других файлов) |
| psiLimitFormula | №0703 |
| Psion | №0784 |
| psionicPredator | №0768 |
| psionSource | №0784 |
| psiPoints | №0703 (+ 2 других файлов) |
| psiPointsMax | №0765 (+ 1 других файлов) |
| psiPointsRest | №0703 |
| psychic | №0860 |
| psychicDamage | №0768 |
| psychicDamagePerTurn | №0768 |
| psychokinetics | №0768 |
| pubic | №0048 (+ 1 других файлов) |
| publishableKey | №0640 (+ 4 других файлов) |
| pulpit | №0056 |
| pupilOpacity | №0055 (+ 2 других файлов) |
| pupilShape | №0052 (+ 2 других файлов) |
| purity | №0069 |
| purple | №0821 (+ 1 других файлов) |
| pursuit | №0818 |
| pushFt | №0067 (+ 2 других файлов) |
| pushProneSaveBonus | №0768 |
| pushRadiusFt | №0768 |
| q | №1108 |
| qty | №0788 (+ 2 других файлов) |
| quality | №0048 (+ 12 других файлов) |
| QUALITY | №0656 |
| QUALITY_GRADES | №0653 |
| QUALITY_TIERS | №0654 |
| qualityBand | №0653 |
| qualityBonus | №0070 (+ 5 других файлов) |
| qualityEffects | №0654 |
| qualityKey | №0653 (+ 1 других файлов) |
| qualityLabel | №0653 |
| qualityMultiplier | №0788 (+ 1 других файлов) |
| qualityOf | №0654 |
| qualityReport | №0653 |
| quantity | №0657 (+ 1 других файлов) |
| quartz | №0662 |
| quartzForm | №0768 |
| query | №0782 |
| querySelector | №1170 |
| querySelectorAll | №1091 (+ 4 других файлов) |
| queued | №0807 |
| queueLastStandAttacks | №0807 |
| quick | №1228 |
| quickBrewing | №0067 (+ 1 других файлов) |
| quickened | №0637 |
| quickPin | №0768 |
| quiet | №0067 |
| quietBomb | №0768 |
| quiveringPalm | №0800 |
| quota_scope | №1240 |
| quote | №0788 |
| r | №0857 (+ 2 других файлов) |
| rabbit | №0050 |
| rabbitEarSize | №0055 (+ 1 других файлов) |
| rabbitTailSize | №0055 (+ 1 других файлов) |
| rabbleRouser | №0768 |
| race | №0775 (+ 7 других файлов) |
| raceId | №0049 (+ 18 других файлов) |
| raceName | №0613 (+ 1 других файлов) |
| raceWarp | №0050 |
| rack | №0056 |
| radial | №0051 |
| radiant | №0860 |
| Radiant | №0069 |
| radiantAttackOrder | №0768 |
| radiantRetaliation | №0798 |
| radiantVsUndead | №0067 |
| radius | №0051 (+ 4 других файлов) |
| radiusBySlot | №0768 |
| radiusFt | №0666 (+ 3 других файлов) |
| radiusIncreaseFt | №0768 |
| radiusMiles | №0067 |
| rage | №0637 (+ 1 других файлов) |
| rageDamageBonus | №0670 |
| ragesCount | №0670 |
| raging | №1203 (+ 1 других файлов) |
| ragingInferno | №0768 |
| ragPulp | №0662 |
| rail | №0059 |
| raisedFt | №0807 |
| raiseThrallOnSeedKill | №0798 |
| rallyCrew | №0768 |
| rallyingCry | №0728 |
| rallyUnlimited | №0765 (+ 1 других файлов) |
| ram | №0055 |
| rampage | №0645 (+ 1 других файлов) |
| rampageDie | №0768 |
| rampagePending | №0675 |
| randomUUID | №1117 (+ 3 других файлов) |
| range | №0067 (+ 17 других файлов) |
| rangedAttack | №0807 (+ 2 других файлов) |
| rangedAttackBonus | №0768 |
| rangeFt | №0066 (+ 31 других файлов) |
| rangeFtByLevel | №0817 |
| rangeMultiplier | №0768 |
| ranger | №0787 (+ 1 других файлов) |
| rangerFightingStyle | №0637 |
| rank | №0810 |
| rankForRecipe | №0659 |
| rapidity | №0630 |
| Rapidity | №0768 |
| raptor | №0050 |
| rare | №0782 (+ 6 других файлов) |
| rareBonus | №0797 |
| rareChance | №0763 |
| rarity | №0782 (+ 27 других файлов) |
| rate | №0654 |
| ratio | №0653 (+ 4 других файлов) |
| rats | №0050 |
| ravenousWeapon | №0768 |
| raw | №0642 (+ 3 других файлов) |
| rawCopper | №0662 |
| rawIron | №0662 |
| rawUnit | №0815 |
| rawXp | №0794 |
| ray | №0809 |
| reach | №0809 |
| reachBonusFt | №0768 |
| reachFt | №0765 (+ 1 других файлов) |
| reaction | №0067 (+ 41 других файлов) |
| reactionAction | №0768 |
| reactionAttack | №0675 (+ 2 других файлов) |
| reactionAttackOrSingleTargetSpell | №0768 |
| reactionCastHexOnDamager | №0768 |
| reactionChoice | №1134 (+ 2 других файлов) |
| reactionCounter | №0765 |
| reactionDamage | №0768 |
| reactionDamageReduction | №0798 |
| reactionDefensiveOrder | №0768 |
| reactionHalveDamage | №0768 |
| reactionId | №0800 (+ 4 других файлов) |
| reactionMode | №0768 |
| reactionMove | №0768 |
| reactionMoveFt | №0768 |
| reactionNegateSpellUpTo5 | №0768 |
| reactionOpportunityAgainstAttacker | №0768 |
| reactionOptions | №0637 (+ 3 других файлов) |
| reactionPending | №0800 |
| reactionRedirectAttack | №0798 |
| reactions | №0637 (+ 2 других файлов) |
| reactionsMax | №0637 |
| reactionSpell | №0802 |
| reactionsRefresh | №0818 |
| reactionSuppressOnInitiative | №0768 |
| reactionUsesByLevel | №0818 |
| reactionWeather | №0675 |
| reactionWindow | №0644 |
| readAllWriting | №0768 |
| readError | №0052 |
| readOnly | №0836 |
| readWriteForkedLanguages | №0768 |
| ready | №0052 (+ 2 других файлов) |
| readyState | №1090 (+ 26 других файлов) |
| reagent | №0815 |
| reagentRoll | №1058 |
| reagents | №0067 (+ 4 других файлов) |
| reagentsRegained | №0067 |
| reagentsSpent | №0067 |
| reagentSynthesis | №0666 |
| reanimateCorpse | №0858 |
| reanimated | №0858 |
| reanimator | №0798 |
| reaper | №0798 |
| rearDigits | №0050 |
| reason | №0066 (+ 29 других файлов) |
| reassembleCorpus | №0768 |
| rebirthInHell | №0768 |
| rebuild | №0787 |
| rebuildMaterialUsage | №1090 (+ 1 других файлов) |
| recalculate | №0838 |
| receipt | №0807 |
| received | №0791 |
| recharge | №0067 (+ 12 других файлов) |
| rechargeActions | №0794 |
| recharged | №0794 |
| rechargeOn | №0643 |
| rechargeState | №0800 |
| recipe | №0654 (+ 5 других файлов) |
| recipeCount | №0661 |
| recipeId | №0653 |
| recipeName | №0653 |
| recipeRequirements | №0659 |
| recipes | №0656 (+ 3 других файлов) |
| RECIPES | №0656 |
| recipesList | №0656 |
| reciprocalRelationship | №0768 |
| reckless | №0637 |
| recommendedSourceCommit | №1294 |
| reconstruction | №0630 |
| Reconstruction | №0768 |
| record | №0836 (+ 6 других файлов) |
| recordApplication | №0810 |
| recordCraftResult | №0659 |
| recordDamage | №0807 |
| recordMutation | №0805 (+ 1 других файлов) |
| recover | №0642 |
| recoverable | №0653 |
| recovered | №0653 (+ 2 других файлов) |
| recoveredFromCrafting | №0654 |
| recoverRatio | №0653 |
| recovery | №0705 (+ 1 других файлов) |
| Recovery | №0069 |
| RECOVERY_BY_DURABILITY | №0653 |
| RECOVERY_BY_QUALITY | №0654 |
| recoveryRate | №1090 |
| recruitInformant | №0768 |
| recruitMercenary | №0768 |
| recursive | №0877 (+ 46 других файлов) |
| red | №0821 |
| Red | №0765 (+ 1 других файлов) |
| redirect | №0768 |
| redirectAttack | №0768 |
| redirectAttackToAlly | №0067 |
| redirectDamage | №0765 |
| redirectDamageToConstruct | №0768 |
| redirectMeleeAttackToFamiliar | №0768 |
| redirectMissedAttackToGrappledTarget | №0768 |
| redirectOrCancel | №0768 |
| redirectTargetId | №0807 |
| redirectURL | №0875 |
| redistributed | №0807 |
| redo | №0052 |
| reduced | №0630 (+ 2 других файлов) |
| reducedBy | №0768 |
| reduceMaxHpByDamage | №0768 |
| reduceNextVisibleAttackBy | №0768 |
| reduction | №0817 (+ 1 других файлов) |
| reEnabled | №1091 |
| ref | №0807 |
| refinedCopper | №0662 |
| reflectPsychicDamage | №0768 |
| refresh | №0808 (+ 2 других файлов) |
| refresh_token | №0642 (+ 1 других файлов) |
| refreshByItsAlive | №0768 |
| refreshMaterial | №0051 |
| refreshOrgans | №0858 |
| refreshStatus | №0653 |
| refundCharnelOnThrallLoss | №0798 |
| refunded | №0800 |
| refundedSpellSlot | №0800 |
| regainOnShortRest | №0765 |
| regainReagentsOnInitiativeUpTo | №0067 |
| regeneration | №0798 |
| Regeneration | №0069 |
| regenerationBlockedBy | №0798 |
| regenPbWhenBloodied | №0630 |
| region | №0051 (+ 3 других файлов) |
| REGION_MOD | №0788 |
| regionalHairSupported | №0048 |
| regionMask | №0048 |
| regionMultiplier | №0788 |
| regions | №0048 (+ 5 других файлов) |
| register | №0617 (+ 12 других файлов) |
| registerActionHandler | №1142 (+ 5 других файлов) |
| registerClass | №0650 (+ 3 других файлов) |
| registerEquipment | №0055 |
| registerPreset | №0055 |
| registerRace | №0055 |
| registerSkin | №0055 |
| registerSummon | №0819 |
| registry | №0650 |
| reinforcedWoodV49 | №0656 |
| reinvokedRune | №0768 |
| reject | №0777 (+ 2 других файлов) |
| rejuvenatingOrder | №0768 |
| relation | №0807 (+ 1 других файлов) |
| relationship | №0790 |
| relationshipChanged | №1154 |
| relaunch | №1094 |
| relaxationLevels | №0768 |
| rele | №0637 |
| release_ready | №1055 |
| release_reason | №1055 |
| release_source_sha | №1055 |
| releaseDeadSpaceOnInitiative | №0798 |
| releaseToLarva | №0805 |
| relentless | №0618 |
| relentlessRage | №0637 |
| reliableTalent | №0637 |
| relic | №0788 (+ 2 других файлов) |
| religion | №0761 (+ 1 других файлов) |
| remaining | №0637 (+ 11 других файлов) |
| remainingAmount | №0630 (+ 3 других файлов) |
| remainingCharges | №0067 |
| remainingHp | №0768 |
| remainingMinutes | №0067 (+ 2 других файлов) |
| remainingOwnerTurns | №0067 |
| remainingTurns | №0067 (+ 1 других файлов) |
| remnant | №0828 |
| remnants | №0052 (+ 4 других файлов) |
| remote | №0642 |
| remoteRoster | №0799 |
| remove | №0647 (+ 7 других файлов) |
| removeAction | №0067 |
| removeAdvantage | №0860 |
| removeAlchemistSlime | №0644 |
| removeClass | №0838 |
| removeCondition | №0765 (+ 1 других файлов) |
| removeConditions | №0630 |
| removed | №0047 (+ 2 других файлов) |
| removeEventListener | №0876 |
| removeFeat | №0838 |
| removeFloor | №0060 |
| removeImmunity | №0630 |
| removeInventory | №0838 |
| removeItem | №1101 (+ 3 других файлов) |
| removeObject | №0060 |
| removePoisonDisease | №0768 |
| removeRampage | №0675 |
| removeResistance | №0630 |
| removeResistanceTo | №0768 |
| removeSpell | №0838 |
| removeZone | №0060 |
| render | №0070 (+ 10 других файлов) |
| renderAppearance | №0050 |
| renderCharacterCreation | №0659 |
| renderControls | №0630 |
| renderFamily | №0055 |
| renderInventory | №1150 (+ 1 других файлов) |
| renderStatus | №0655 |
| rendingStrike | №0768 |
| repairCost | №1092 |
| repairCount | №0653 |
| repaired | №0653 (+ 3 других файлов) |
| repairGold | №1090 |
| repairItem | №0653 (+ 3 других файлов) |
| repairProfile | №0654 |
| repeat | №0071 |
| repeatCondition | №0807 |
| repeatDamageOnFailedSave | №0630 |
| repeatMissedAttack | №0768 |
| repeatRestriction | №0768 |
| repeatRollingBoulderOnSuccessfulProne | №0768 |
| repeatSave | №0067 (+ 3 других файлов) |
| repeatSaveAtTurnEnd | №0768 |
| repeatSaveEndTurn | №0768 |
| repeatSaveOnDamage | №0768 |
| replaceAfterShortRest | №0768 |
| replaceAnyAfterLongRest | №0768 |
| replaceAnyNon18Metamorphoses | №0768 |
| replaceAttackWithSpirit | №0802 |
| replaceAttackWithTouchCantrip | №0768 |
| replaceConsumed | №0768 |
| replaceDropToZeroWithHP | №0067 |
| replaceExploitOnRest | №0768 |
| replaceLowSpellSlotWithInspiringWord | №0768 |
| replaceMetamorphosis | №0768 |
| replaceMutagen | №0768 (+ 1 других файлов) |
| replaceOnRest | №0066 |
| replacePhysicalSaveWith | №0768 |
| replacesRace | №0632 (+ 10 других файлов) |
| replaceStandardOrExoticAfterLongRest | №0768 |
| replaceWolfWithDireWolf | №0768 |
| report | №0653 (+ 1 других файлов) |
| reposition | №0768 |
| reprisal | №0792 |
| reptile | №0763 |
| reptileIndices | №0050 |
| reptileProfile | №0050 (+ 5 других файлов) |
| reptileSkin | №0050 |
| req | №0630 (+ 1 других файлов) |
| requestedExternal | №0048 |
| requestId | №0800 (+ 7 других файлов) |
| require | №1295 |
| required | №0703 (+ 3 других файлов) |
| requiredAssets | №0060 |
| requiredGold | №0654 |
| requiredLevel | №0659 |
| requiredMaterials | №0654 |
| requiredSpecialization | №0659 |
| requiredTools | №0661 |
| requirements | №0621 (+ 1 других файлов) |
| requires | №0663 (+ 4 других файлов) |
| requiresAdvantage | №0768 |
| requiresArmor | №0768 |
| requiresDisengage | №0768 |
| requiresEqualOrHigherExtraSlot | №0768 |
| requiresGrappled | №0768 |
| requiresNearestAttack | №0630 |
| requiresSight | №0807 (+ 3 других файлов) |
| requiresSoleHexTarget | №0768 |
| requiresTarget | №0768 |
| reroll | №0637 |
| rerollAttack | №0067 |
| rerollDamage12 | №0768 |
| rerollFlickerCost | №0768 |
| rerollGrappleEscape | №0768 |
| rerollHemocraftOncePerTurn | №0768 |
| rerollOne | №0637 (+ 3 других файлов) |
| rerollOneDamageDie | №0768 |
| rerollSave | №0765 (+ 1 других файлов) |
| rerollType | №0768 |
| reservationRetained | №0644 |
| reserved | №0792 (+ 3 других файлов) |
| reservedDie | №0802 |
| reset | №0052 |
| resetDeathSaves | №0644 |
| resetLairRound | №0794 |
| resetNegotiation | №0790 |
| resetRestResources | №0858 |
| resetTurn | №0637 |
| resetTurnResources | №0772 |
| resetView | №0852 |
| resignalSeq | №0799 |
| resilientOrder | №0768 |
| resilientOrderAdvanced | №0768 |
| resin | №0656 (+ 3 других файлов) |
| resist | №0807 |
| resistance | №0067 (+ 10 других файлов) |
| resistanceAll | №0067 (+ 2 других файлов) |
| resistanceAllDamage | №0768 |
| resistanceAllExceptPsychic | №0768 |
| resistanceChosen | №0768 |
| resistances | №0644 (+ 14 других файлов) |
| resistanceType | №0067 (+ 2 других файлов) |
| resistanceWhileBloodied | №0768 |
| resistant | №0807 (+ 1 других файлов) |
| resistantSuppression | №0768 |
| resisted | №0839 |
| resize | №0060 |
| resolution | №0848 (+ 1 других файлов) |
| resolve | №0642 (+ 4 других файлов) |
| resolveAction | №0794 |
| resolveAttack | №0644 (+ 1 других файлов) |
| resolveCharacterRace | №0055 |
| resolveEquipment | №0055 |
| resolveFall | №0060 |
| resolveFeature | №0650 |
| resolveHealingEvent | №0807 |
| resolveMorphWeights | №0057 |
| resolveRace | №0055 |
| resolveReaction | №0637 |
| resolveRollMode | №0816 |
| resolveSkin | №0055 |
| resource | №0772 (+ 1 других файлов) |
| resourceBridge | №0675 |
| resourceInput | №0661 |
| resourceName | №0814 |
| resourceProcessing | №0815 |
| resourceRevision | №0800 |
| resources | №0067 (+ 38 других файлов) |
| RESOURCES | №0662 |
| resourceUnit | №0815 |
| resourceYieldMultiplier | №0661 |
| respawn | №0867 |
| rest | №0630 (+ 11 других файлов) |
| restAndRecover | №0768 |
| restHealing | №0773 (+ 1 других файлов) |
| restNormals | №0050 |
| restock | №0788 (+ 1 других файлов) |
| restore | №0637 (+ 4 других файлов) |
| restoreBloodMaledictOnRiteCrit | №0630 |
| restoreBody | №0805 |
| restored | №0067 (+ 3 других файлов) |
| restoredAt | №0854 |
| restoreExhaustion | №0765 (+ 1 других файлов) |
| restoreExploitPerAlly | №0768 |
| restoreGolem | №1058 |
| restoreHitDice | №0765 (+ 1 других файлов) |
| restoreHp | №0675 |
| restoreHP | №0768 |
| restoreInterruptOnInitiative | №0768 |
| restoreLocalCopy | №0642 |
| restoreMoxie | №0768 |
| restoreMoxieOnSuccessfulCrossCounter | №0768 |
| restoreOneSealLongRest | №0768 |
| restoreOnInitiative | №0768 |
| restorePactSlot | №0630 |
| restoreReagents | №0768 |
| restoreResource | №0765 |
| restoreResources | №0816 |
| restoreSnapshot | №0850 (+ 1 других файлов) |
| restoreSpellLevels | №0798 |
| restoreThrall | №0768 |
| restoreWithReagents | №1058 |
| restPositions | №0050 |
| restrainAt0Hp | №0768 |
| restrained | №0768 (+ 1 других файлов) |
| restrainedUntilEndOfNextTurn | №0768 |
| restrictionUntilOwnEnd | №0807 |
| result | №0637 (+ 40 других файлов) |
| resultCp | №0779 |
| resultEp | №0779 |
| resultGp | №0779 |
| resultPp | №0779 |
| results | №0637 (+ 4 других файлов) |
| resultSp | №0779 |
| resumed | №0807 |
| retain | №0822 |
| retainMentalStats | №0768 |
| retains | №0833 |
| retaliationHealing | №0768 |
| retaliatoryDamage | №0768 |
| retaliatoryNecrotic | №0768 |
| retargetMageMark | №0807 |
| retreat | №0809 |
| retreatFrom | №0807 |
| retries | №0810 |
| retry_after | №1055 (+ 1 других файлов) |
| retryIn | №0867 (+ 1 других файлов) |
| returnAfterHour | №0798 |
| returnAttackBonus | №0800 (+ 1 других файлов) |
| returnDamage | №0768 (+ 3 других файлов) |
| returnDamageType | №0800 |
| returnedAttack | №0637 |
| returnTarget | №0644 (+ 3 других файлов) |
| returnToShell | №0773 |
| reveal | №0068 (+ 3 других файлов) |
| revealed | №0063 (+ 2 других файлов) |
| revealedArcana | №0630 |
| revealedSight | №0807 |
| revealsInvisible | №0067 |
| reverseMappedGlbVertices | №1107 |
| revert | №0768 (+ 1 других файлов) |
| revision | №0642 (+ 3 других файлов) |
| revitalizingOrderExploit | №0768 |
| reviveAtDawn | №0768 |
| reviveAtZero | №0765 |
| revived | №0067 |
| revivedFromZero | №0644 |
| reviveHp | №0768 |
| reviveNearHeartAfterHours | №0768 |
| reviveRecentDead | №0798 |
| reviveRite | №0630 |
| reviveTo1 | №0768 |
| revokeObjectURL | №1199 |
| revolution | №0792 |
| rewards | №0659 (+ 2 других файлов) |
| rider | №0858 |
| RIDGE_STYLES | №0055 |
| ridgeColor | №0055 (+ 1 других файлов) |
| ridgeStyle | №0052 |
| right | №1105 |
| ringingStrike | №0768 |
| riposte | №0768 |
| riseFt | №0807 |
| risk | №0069 |
| rite | №0768 (+ 2 других файлов) |
| riteFocus | №0630 |
| riteOfTheDawn | №0630 |
| riteRevival | №0630 |
| rites | №0696 (+ 8 других файлов) |
| riteSwapAtLevel | №0768 |
| riteType | №0630 (+ 7 других файлов) |
| ritual | №0750 (+ 3 других файлов) |
| ritualCasting | №0696 (+ 1 других файлов) |
| ritualComponentReplaced | №0802 |
| ritualDuringShortRest | №0768 |
| ritualizeKnownSpellsUpTo | №0802 |
| ritualMastery | №0768 |
| ritualMaterialSubstitution | №0768 |
| ritualMinutes | №0768 (+ 1 других файлов) |
| ritualSpellLevelMax | №0802 |
| ritualTurnsBySpellLevel | №0802 |
| rmsDisplacementMeters | №1102 |
| roar | №0630 (+ 1 других файлов) |
| roguishCharm | №0768 |
| role | №0048 (+ 31 других файлов) |
| roles | №0617 (+ 18 других файлов) |
| roll | №0063 (+ 25 других файлов) |
| rollback | №0845 (+ 1 других файлов) |
| rollD20 | №0816 (+ 20 других файлов) |
| rollDice | №0644 (+ 4 других файлов) |
| rolled | №0827 |
| rolledDistanceFt | №0807 |
| rollingAvalanche | №0768 |
| rollingBoulder | №0768 |
| rollPockets | №0796 (+ 1 других файлов) |
| rollResolved | №0824 |
| rollResult | №0861 |
| rolls | №0617 (+ 24 других файлов) |
| rollTwiceChoose | №0768 |
| roomId | №0799 (+ 5 других файлов) |
| rope | №0659 (+ 1 других файлов) |
| roster | №1089 (+ 2 других файлов) |
| rotation | №0065 |
| rotFist | №0768 |
| roughness | №0050 (+ 3 других файлов) |
| round | №0052 (+ 51 других файлов) |
| roundEarSize | №0055 (+ 1 других файлов) |
| roundOwnerId | №0807 |
| roundsRemaining | №0768 (+ 1 других файлов) |
| roundStart | №0807 |
| route | №0809 |
| rows | №0067 (+ 21 других файлов) |
| RTCPeerConnection | №1227 |
| ru | №0734 (+ 1 других файлов) |
| rug | №0056 |
| ruined | №0653 (+ 1 других файлов) |
| ruins | №0788 |
| ruins_courtyard | №0867 |
| ruins_vault | №0867 |
| ruins_workshop | №0867 |
| rules | №0810 (+ 2 других файлов) |
| run | №0845 (+ 1 других файлов) |
| rune | №0768 (+ 2 других файлов) |
| runeDoesNotCountAgainstAttunement | №0768 |
| runeInert | №0768 |
| runesKnown | №0637 (+ 1 других файлов) |
| runesPerObject | №0768 |
| runesPersistAfterDeath | №0768 |
| runicCharges | №0817 |
| runicLore | №0817 |
| runSceneTest | №0831 |
| runScripts | №1112 |
| runtime | №0696 (+ 4 других файлов) |
| runtimeCraft | №0768 |
| runtimeId | №0802 |
| runtimeKey | №0759 |
| runtimeStatus | №0696 (+ 1 других файлов) |
| runtimeVersion | №0666 |
| ruthlessCommand | №0768 |
| ruthlessFocus | №0768 |
| rx | №0050 (+ 4 других файлов) |
| ry | №0050 |
| rz | №0050 (+ 1 других файлов) |
| s | №0059 (+ 3 других файлов) |
| sacredWeapon | №0637 |
| sacrifice | №0792 (+ 1 других файлов) |
| sacrificeFoe | №0792 |
| saddler | №0659 |
| safeAlliesMax | №0768 |
| sagacity | №0630 |
| Sagacity | №0768 |
| salt | №0660 (+ 3 других файлов) |
| saltOfEarth | №0768 |
| salvage | №0814 (+ 1 других файлов) |
| sample | №1161 (+ 3 других файлов) |
| sampledBestMaxDistance | №1111 |
| sampledBestMeanDistance | №1111 |
| sampledGoodPct | №1111 |
| sampleSampler | №0057 |
| sand | №0661 |
| sandbox | №0875 |
| sandVortex | №0798 |
| sanguine | №0768 |
| sanguineEmboldenAllies | №0768 |
| sanguineMastery | №0630 |
| sanguineVitalize | №0768 |
| satyr | №1278 |
| savage_attacker | №0771 |
| savageDice | №0768 |
| save | №0049 (+ 26 других файлов) |
| save1 | №0798 |
| save1or2 | №0798 |
| saveAbility | №0666 |
| saveBonus | №0630 (+ 1 других файлов) |
| saveBonuses | №1057 (+ 6 других файлов) |
| saveBottom | №1257 |
| saveCustom | №0846 |
| saved | №0773 (+ 2 других файлов) |
| savedAt | №0849 (+ 2 других файлов) |
| saveDc | №0800 |
| saveDC | №0067 (+ 6 других файлов) |
| savedChannel | №1239 |
| savedDrawCalls | №0052 |
| saveDisadvantage | №0768 (+ 1 других файлов) |
| saveDisadvantageForPugilistFeatures | №0768 |
| savedUrl | №1239 |
| saveEpoch | №0854 |
| saveId | №0854 |
| saveModifiers | №0630 (+ 8 других файлов) |
| saveOnHit | №0067 |
| savePenalty | №0067 |
| saveResult | №0067 (+ 7 других файлов) |
| saveRevision | №0854 |
| saveRoll | №0800 |
| saves | №0768 (+ 1 других файлов) |
| savesData | №0613 (+ 1 других файлов) |
| saveSheet | №0647 |
| saveSucceeds | №0768 |
| saveSuccess | №0067 |
| saveType | №0644 (+ 7 других файлов) |
| savingThrow | №0644 (+ 20 других файлов) |
| savingThrowBonusDice | №0768 |
| savingThrowProficiencies | №1138 |
| savingThrows | №0066 (+ 32 других файлов) |
| SCALAR | №0057 (+ 4 других файлов) |
| scale | №0050 (+ 20 других файлов) |
| scalePlateV49 | №0656 |
| scalesPerLevel | №0768 |
| scaleWithOwner | №0647 (+ 1 других файлов) |
| scan | №0819 |
| scarf | №0051 |
| scenarios | №0845 (+ 1 других файлов) |
| scene | №1063 (+ 2 других файлов) |
| sceneFrom | №0807 |
| sceneOwnerId | №0807 (+ 1 других файлов) |
| scenes | №1063 (+ 2 других файлов) |
| schema | №1244 |
| schema_version | №1089 |
| SCHEMA_VERSION | №0631 (+ 2 других файлов) |
| schemaVersion | №0055 (+ 7 других файлов) |
| scheme | №0875 |
| scholarlyPursuits | №0818 |
| school | №0749 (+ 10 других файлов) |
| schoolOfHardKnocks | №0768 |
| scope | №0768 (+ 1 других файлов) |
| scopeId | №0642 |
| scopes | №0642 |
| score | №0653 (+ 1 других файлов) |
| scourgeAttunement | №0768 |
| scourgePresence | №0768 |
| scourgeSense | №0768 |
| scourgeSpeech | №0768 |
| scourgeVisage | №0768 |
| scribe | №0657 (+ 4 других файлов) |
| scrolls | №0659 (+ 2 других файлов) |
| seafarer | №0768 |
| seal | №0768 |
| sealDamage | №0687 (+ 1 других файлов) |
| sealDamageIgnoresResistance | №0768 |
| sealDiceDoubled | №0768 |
| sealedSpiritFeatureLevels | №0833 |
| seals | №0687 |
| sealSystem | №0687 |
| sealWax | №0661 |
| seamMaxMeters | №1102 |
| seaMobility | №0765 |
| search | №0649 |
| searchAsBonus | №0765 |
| second | №0816 |
| second_chance | №0771 |
| secondaryAbility | №0675 |
| secondaryStat | №0666 (+ 3 других файлов) |
| secondaryStatChoice | №0687 (+ 2 других файлов) |
| secondaryStats | №0715 (+ 5 других файлов) |
| seconds | №0807 (+ 4 других файлов) |
| secondTarget | №0768 |
| secondWind | №0637 |
| secret | №0063 |
| secure | №0875 |
| seeIllusions | №0807 |
| seeing | №0768 |
| seeInvisible | №0807 (+ 1 других файлов) |
| seek | №0836 |
| seeking | №0067 |
| seekingBomb | №0768 |
| select | №0846 |
| selected | №0066 (+ 4 других файлов) |
| selectedFile | №0842 |
| selectedRites | №0802 |
| selectedTexture | №0060 |
| selectedTokenId | №0615 |
| selectedTool | №0060 |
| selectedWallTexture | №0060 |
| selection | №0066 |
| selfAdvantage | №0816 |
| selfDamage | №0637 (+ 4 других файлов) |
| selfDamageType | №0768 |
| selfDisadvantage | №0816 |
| selfFireDamageUpToLevel | №0768 |
| selfHeal | №0768 |
| selfNecrotic | №0768 |
| selfRadiantDamage | №0768 |
| selfSuture | №0798 |
| selfUsesHitDie | №0768 |
| sell | №0788 (+ 2 других файлов) |
| sellable | №0791 |
| sellFactor | №0788 (+ 1 других файлов) |
| sendActionResult | №1142 (+ 5 других файлов) |
| sendMessage | №1196 |
| sendReactionRequest | №1142 (+ 2 других файлов) |
| senseBloodCreatures | №0768 |
| senses | №0647 (+ 4 других файлов) |
| sentinel | №0771 |
| sentinelSoul | №0724 (+ 1 других файлов) |
| sentinelSoulChoices | №0724 |
| sentinelStand | №0724 (+ 1 других файлов) |
| sentinelStandChoices | №0724 |
| sentinelStrike | №0724 (+ 1 других файлов) |
| sentinelStrikeChoices | №0724 |
| seq | №1204 (+ 6 других файлов) |
| serial | №0630 |
| serialize | №0055 |
| session | №0851 (+ 2 других файлов) |
| sessionId | №0851 (+ 1 других файлов) |
| sessions | №1170 (+ 1 других файлов) |
| setArmor | №0052 |
| setAttribute | №1150 (+ 1 других файлов) |
| setAxis | №0052 |
| setBackground | №0838 |
| setBodyHair | №0052 |
| setCeiling | №0807 |
| setClassLevel | №0838 |
| setClothing | №0052 |
| setClothingCustomization | №0052 |
| setElevation | №0807 |
| setEnabled | №0650 (+ 1 других файлов) |
| setExternalAnatomy | №0052 |
| setGender | №0052 (+ 1 других файлов) |
| setHead | №0052 |
| setHosieryDen | №0052 |
| setHp | №0768 |
| setHP | №0768 |
| setIcon | №0876 |
| setItem | №1059 (+ 19 других файлов) |
| setMainMenuAvailability | №0831 |
| setMessageHandler | №1196 |
| setOriginRace | №0055 |
| setPose | №0052 |
| setProfession | №0838 |
| setProgress | №0832 |
| setProgressHandler | №0831 |
| setRace | №0052 (+ 2 других файлов) |
| setRegion | №0788 |
| setResource | №0816 |
| setSkin | №0052 |
| setStance | №0768 |
| setStatus | №0832 |
| setStrength | №0067 |
| setSwarmMoving | №0052 |
| setSymbiosis | №0805 |
| setTile | №0060 |
| setTimeout | №0652 (+ 15 других файлов) |
| settlementIntel | №0768 |
| settlementOnly | №0768 |
| setTotalLevel | №0838 |
| setView | №1199 |
| setWeapon | №0052 |
| sewer | №0052 |
| sha | №1244 |
| sha256 | №0831 (+ 2 других файлов) |
| shadow_dancer | №0771 |
| shadow_touched | №0771 |
| shadowColor | №0055 (+ 1 других файлов) |
| shadowEssence | №0815 |
| shadowForm | №0798 |
| shadowmaster | №0768 |
| shadowMasterOfDisguise | №0768 |
| shadowNoEscape | №0768 |
| shadowOpacity | №1258 |
| shadowStep | №0637 |
| shag | №0050 (+ 1 других файлов) |
| shakeItOff | №0705 (+ 1 других файлов) |
| Shaman | №0696 |
| shape | №0050 (+ 8 других файлов) |
| shapechange | №0768 |
| shapeChangeSave | №0768 |
| shapeFemale | №1073 |
| shapeHead | №0050 |
| shapeMale | №1073 (+ 1 других файлов) |
| shaper | №0703 (+ 1 других файлов) |
| Shaper | №0784 |
| shapes | №0048 (+ 1 других файлов) |
| sharedAdvantage | №0768 |
| shareDamage | №0807 |
| shareDanceBonus | №0798 |
| sharedBonusAction | №0768 (+ 1 других файлов) |
| sharedHp | №0768 |
| sharedImmortality | №0768 |
| sharedInitiative | №0828 |
| sharedProperties | №0068 (+ 1 других файлов) |
| sharedReaction | №0765 (+ 2 других файлов) |
| sharedStealth | №0675 |
| shareSaves | №0802 |
| shareSensesHours | №0768 |
| sharpMind | №0818 |
| sharpshooter | №0771 |
| shaved | №0048 (+ 1 других файлов) |
| shelf | №0056 |
| shell | №0773 |
| shellColor | №0055 (+ 1 других файлов) |
| shellDestroyed | №0773 |
| shellHealing | №0773 |
| shellHP | №0773 |
| shellMaxHP | №0773 |
| shellName | №0773 |
| shells | №1266 |
| shellSize | №0055 (+ 1 других файлов) |
| shield_master | №0771 |
| shieldACBonus | №0768 |
| shieldAllowed | №0768 |
| shieldAttackBonus | №0768 |
| shieldDamage | №0768 |
| shielded | №0630 (+ 1 других файлов) |
| Shielded | №0768 |
| shieldFrame | №0656 (+ 1 других файлов) |
| shieldImpact | №0768 |
| shieldmaker | №0659 |
| shieldMartial | №0768 |
| shieldSlam | №0768 (+ 1 других файлов) |
| shieldWarrior | №0768 |
| shift | №0790 |
| shifter | №0661 (+ 1 других файлов) |
| shifterNaturalWeapon | №0822 |
| shinL | №0048 |
| shinR | №0048 |
| shipchandler | №0790 (+ 1 других файлов) |
| shippedSha256 | №1102 |
| shirt | №0051 |
| shirt_long | №1068 (+ 1 других файлов) |
| shockingStrike | №0768 |
| shockingStrikeDamage | №0768 |
| short | №0050 (+ 1 других файлов) |
| shortRest | №0067 (+ 1 других файлов) |
| shortRestHealing | №0828 |
| shortRestHealingAllowed | №0858 |
| shortRestSlots | №0768 |
| shoulders | №0052 (+ 6 других файлов) |
| shouldSuppressRestHP | №0773 (+ 1 других файлов) |
| shove | №0765 |
| shredding | №0768 |
| shreddingFree | №0768 |
| shuffle | №0071 |
| side | №0050 (+ 2 других файлов) |
| side_part | №0050 (+ 1 других файлов) |
| sideEffect | №0768 |
| sideEffects | №0069 |
| sides | №0644 (+ 8 других файлов) |
| siege | №0659 (+ 2 других файлов) |
| siegeInteraction | №0620 |
| sightBlocked | №0063 |
| sigilEligible | №0621 |
| sigilicGrace | №0768 |
| signal | №0642 (+ 2 других файлов) |
| signature | №0782 (+ 1 других файлов) |
| signatureSpells | №0637 |
| signup | №0642 |
| silent | №0807 |
| silentCheck | №0831 |
| silentStalker | №0768 |
| silk | №0051 |
| silkwormSilk | №0662 |
| silver | №0657 (+ 2 других файлов) |
| silvered | №0644 (+ 1 других файлов) |
| site | №0784 |
| sixthMetamorphosis | №0768 |
| size | №0050 (+ 45 других файлов) |
| size_mb | №1100 |
| sizeBytes | №1104 |
| sizeCategory | №0055 (+ 1 других файлов) |
| sizeChange | №0067 |
| sizeFt | №0067 (+ 1 других файлов) |
| sizeIncrease | №0765 (+ 1 других файлов) |
| skeleton | №0055 (+ 2 других файлов) |
| skill | №0617 (+ 13 других файлов) |
| skillAdvantage | №0630 |
| skillBonus | №0765 (+ 3 других файлов) |
| skillChoices | №0773 (+ 3 других файлов) |
| skilled | №0652 (+ 1 других файлов) |
| skilledRider | №0768 |
| skillId | №0761 (+ 3 других файлов) |
| skillModifiers | №0630 |
| skillProficiency | №0768 |
| skillProficient | №0644 (+ 1 других файлов) |
| skills | №0613 (+ 26 других файлов) |
| skillsChoose | №0067 (+ 1 других файлов) |
| skillsData | №0613 (+ 2 других файлов) |
| skiltKrigga | №0768 |
| skin | №0047 (+ 8 других файлов) |
| skin_names | №1100 |
| skinCompatible | №0055 |
| skinDetail | №0055 (+ 6 других файлов) |
| skinFamily | №0055 |
| skinGlow | №0055 (+ 2 других файлов) |
| skinId | №0055 (+ 1 других файлов) |
| skinMaterial | №0055 |
| skinned_primitives | №1100 |
| skinPositions | №0047 |
| skins | №0057 (+ 4 других файлов) |
| skinSurface | №0052 (+ 5 других файлов) |
| skipDefeated | №0772 |
| skirt | №0051 |
| skirtProfile | №0051 |
| slamDamage | №0768 |
| slamMagical | №0768 |
| slash | №0063 (+ 1 других файлов) |
| slashing | №0860 |
| slashTexture | №0065 |
| slaymateRitual | №0798 |
| sleep | №0768 (+ 1 других файлов) |
| Sleep | №0069 |
| sleepImmune | №0807 |
| sleepUntilStartNextTurnOrDamage | №0768 |
| sleepwalker | №0768 |
| sleeves | №0051 (+ 2 других файлов) |
| sleightBonus | №0768 |
| sleightingImprecation | №0768 |
| sleightOfHand | №0761 (+ 1 других файлов) |
| slick_back | №0050 (+ 1 других файлов) |
| slime | №0052 |
| slimeCovered | №0067 |
| slimeFiber | №0815 |
| slimeReagent | №0815 |
| slipperyMind | №0637 |
| slipTurns | №0810 (+ 1 других файлов) |
| slit | №1068 (+ 2 других файлов) |
| slitHeight | №1068 (+ 1 других файлов) |
| slot | №0051 (+ 9 других файлов) |
| slotKind | №0637 |
| slotLevel | №0630 (+ 12 других файлов) |
| slotLevels | №1209 |
| slots | №0051 (+ 8 других файлов) |
| slotsByLevel | №0798 |
| slotSpent | №0802 |
| slotsRefresh | №0833 |
| slotsUsed | №0775 |
| slowFall | №0637 |
| slowFt | №0630 |
| small | №0056 (+ 2 других файлов) |
| smith | №0657 (+ 7 других файлов) |
| smoke | №0067 |
| smokeBomb | №0768 |
| smokeCloud | №0067 |
| snake | №0808 |
| snapshot | №0642 (+ 10 других файлов) |
| snapshots | №0067 |
| sneakApplied | №0644 (+ 1 других файлов) |
| sneakAttack | №0637 |
| sneakAttackDice | №0775 (+ 1 других файлов) |
| sneakEligible | №1209 |
| sneakStyle | №0843 |
| snout | №0050 |
| social | №0617 (+ 12 других файлов) |
| socialAdvantage | №0765 |
| socialBonus | №0798 |
| socket | №0050 |
| socks | №0051 (+ 3 других файлов) |
| solidified | №0768 |
| soloShieldAC | №0768 |
| solvent | №0067 |
| somatic | №0749 (+ 10 других файлов) |
| somaticMaterialFree | №0768 |
| somnolence | №0768 |
| songOfRest | №0637 |
| songsOfWarPeace | №0768 |
| soothingSpeech | №0768 |
| sorcerer | №0787 (+ 1 других файлов) |
| sorcerousOriginMastery | №0637 |
| sorcerousRestoration | №0637 |
| sorceryPoints | №0637 (+ 2 других файлов) |
| sort | №0782 |
| soulEater | №0630 (+ 1 других файлов) |
| soulOfArtifice | №0637 |
| soulSight | №0802 |
| soulToyConversion | №0798 |
| source | №0047 (+ 111 других файлов) |
| SOURCE | №0655 |
| SOURCE_TAG | №0659 |
| sourceDead | №0858 |
| sourceDisplacementMax | №1108 |
| sourceDisplacementMean | №1108 |
| sourceFor | №0070 |
| sourceGlb | №1097 |
| sourceGlbSha256 | №1294 |
| sourceHashes | №1294 |
| sourceId | №0066 (+ 29 других файлов) |
| sourceIndices | №0050 |
| sourceKey | №0784 |
| sourceLabel | №0617 (+ 10 других файлов) |
| sourceMaxDisplacement | №1107 |
| sourceMeanDisplacement | №1107 |
| sourceMeshes | №0052 |
| sourceName | №0689 (+ 3 других файлов) |
| sourceNonZeroEntries | №1107 |
| sourcePack | №0617 (+ 11 других файлов) |
| sourcePacks | №0619 (+ 2 других файлов) |
| sourceProject | №1294 |
| sourceQuantity | №0653 |
| sourceRule | №0070 |
| sources | №0070 (+ 12 других файлов) |
| sourceSha256 | №1102 |
| sourceStackTerms | №1294 |
| sourceTarget | №1097 |
| sourceType | №0067 (+ 15 других файлов) |
| sourceVersion | №0715 (+ 3 других файлов) |
| sovereignOfFate | №0768 |
| sp | №0779 (+ 5 других файлов) |
| space | №0828 |
| span | №0050 |
| sparse | №1098 |
| spatialManipulation | №0768 |
| speakWithBeastsAndPlants | №0768 |
| special | №0657 |
| specialization | №0659 (+ 2 других файлов) |
| specializationBonus | №0659 |
| specializationList | №0659 |
| specializations | №0659 |
| specialReactionPerOtherCreatureTurn | №0768 |
| specialSightFt | №0807 |
| specialtyTags | №0656 |
| species | №0050 (+ 4 других файлов) |
| spectral | №0050 |
| spectralFiber | №0656 (+ 1 других файлов) |
| spectralIndices | №0050 |
| spectralMounts | №0798 |
| spectralParts | №0050 |
| spectralReagent | №0815 |
| spectralThreadV49 | №0656 |
| speed | №0613 (+ 38 других файлов) |
| Speed | №0069 |
| speedBonus | №0768 |
| speedBonusFt | №0630 (+ 1 других файлов) |
| speedDouble | №0768 |
| speedFt | №0800 |
| speedHalf | №0768 |
| speedMultiplier | №0798 (+ 1 других файлов) |
| speedPenalty | №0630 |
| speedPenaltyFt | №0630 (+ 1 других файлов) |
| speedReductionFt | №0675 |
| speedZeroSave | №0768 |
| spell | №0637 (+ 6 других файлов) |
| spellAttack | №0768 (+ 3 других файлов) |
| spellAttackBonus | №0768 (+ 2 других файлов) |
| spellAttackUsesWisdom | №0768 |
| spellblade | №0768 (+ 1 других файлов) |
| Spellblade | №0784 |
| spellbladeSource | №0784 |
| spellCaster | №0800 (+ 1 других файлов) |
| spellcasting | №0696 (+ 10 других файлов) |
| spellcastingAbility | №0067 |
| spellcastingFocus | №0768 |
| spellDamageModifiers | №0637 (+ 2 других файлов) |
| spellDamageVulnerability | №0768 |
| spellHealingOrDamage | №0802 |
| spellId | №0644 (+ 9 других файлов) |
| spellLevel | №0637 (+ 10 других файлов) |
| spellLevelCap | №0802 |
| spellLevelMax | №0768 |
| spellLevels | №0802 |
| spellList | №0792 |
| spellLists | №0703 |
| spellMastery | №0637 |
| spellName | №0644 (+ 18 других файлов) |
| spells | №0775 (+ 11 других файлов) |
| spellSaveDC | №0768 (+ 2 других файлов) |
| spellsData | №0613 (+ 4 других файлов) |
| spellsDoNotCountAgainstKnown | №0768 |
| Spellshot | №0784 |
| spellsKnown | №0696 (+ 2 других файлов) |
| spellSlotKind | №0637 |
| spellSlotLevel | №0637 |
| spellSlots | №0637 (+ 2 других файлов) |
| spellSlotsData | №0613 (+ 14 других файлов) |
| spellSlotSubstitute | №0798 |
| spellSlotTable | №0816 (+ 1 других файлов) |
| spellSources | №0816 |
| spellStat | №0613 (+ 1 других файлов) |
| spellStats | №0816 |
| spellStoringItem | №0637 |
| spellstrike | №0768 |
| spellTable | №0630 |
| spellUses | №0792 |
| spellUsesByLevel | №0792 |
| Spellweaver | №0784 |
| spend | №0772 |
| spendAction | №0772 |
| spendCharges | №0768 |
| spendCoin | №0807 |
| spendDynamo | №0067 |
| spendExtendedResource | №0637 |
| spendMovement | №0772 |
| spendMovementReward | №0810 |
| spendReaction | №0807 |
| spendResource | №0816 |
| spendSpellSlot | №0768 |
| spent | №0675 (+ 4 других файлов) |
| spices | №0662 |
| spider | №0675 |
| spiderSilk | №0656 (+ 1 других файлов) |
| spines | №0055 |
| spiral | №0055 |
| spirit | №0833 (+ 1 других файлов) |
| spiritAttacks | №0773 |
| spiritCommunication | №0802 |
| spiritDamage | №0802 |
| spiritDamageBonus | №0802 |
| spiritForm | №0773 |
| spiritHP | №0773 |
| spiritMantle | №0833 |
| spiritMaxHP | №0773 |
| spiritRangeFt | №0802 |
| spiritTypes | №0696 |
| spiritualDefense | №0833 |
| splashDice | №0067 |
| split | №0768 |
| splitAmongTargets | №0768 |
| splitDamage | №0768 |
| sporeling | №0675 |
| spread | №0047 |
| springSteel | №0662 |
| spurredArmy | №0768 |
| square | №0052 (+ 1 других файлов) |
| squaredCircle | №0705 |
| src | №0071 (+ 4 других файлов) |
| stability | №0069 (+ 1 других файлов) |
| Stability | №0069 |
| stable | №0790 (+ 2 других файлов) |
| stack | №0056 (+ 1 других файлов) |
| stacks | №0675 |
| stage | №0773 (+ 3 других файлов) |
| stage10 | №0067 |
| staged | №0831 |
| stair | №0056 |
| stairFrom | №0065 |
| stairHeight | №1140 |
| stairs | №0056 |
| stairTo | №0065 |
| stale | №0854 |
| stalkersProwess | №0630 |
| stalwartDefender | №0768 |
| stalwartSpirit | №0860 |
| stance | №0768 (+ 2 других файлов) |
| stanceRadiusFt | №0768 |
| stand | №0056 |
| standard | №0654 (+ 2 других файлов) |
| standingJump | №0768 |
| standTheFallen | №0768 |
| standUp | №0768 |
| start | №0703 |
| startActorTurn | №0630 |
| startedAt | №0851 |
| startedAtTurn | №0067 |
| startedTurn | №0807 |
| startElevation | №0807 |
| startingEquipment | №0067 (+ 3 других файлов) |
| startLevel | №0822 |
| startlingJinx | №0768 |
| startTurn | №0066 (+ 13 других файлов) |
| startTurnDamage | №0768 |
| startTurnHeal | №0768 |
| startTurnHealing | №0768 |
| startTurnNecrotic | №0768 |
| startX | №0807 (+ 1 других файлов) |
| startY | №0807 (+ 1 других файлов) |
| stat | №0066 (+ 21 других файлов) |
| STAT_ALIASES | №0816 |
| STAT_META | №0858 |
| statblock | №0067 |
| statBlock | №0822 (+ 1 других файлов) |
| statBonus | №0735 (+ 4 других файлов) |
| state | №0644 (+ 19 других файлов) |
| stateRevision | №0799 (+ 6 других файлов) |
| states | №0828 |
| stats | №0613 (+ 50 других файлов) |
| status | №0821 (+ 58 других файлов) |
| STATUS | №0067 |
| stdio | №1056 (+ 2 других файлов) |
| steadfastOrder | №0768 |
| steadfastToughness | №0860 |
| stealth | №0761 (+ 1 других файлов) |
| stealthAdvantage | №0768 |
| stealthBonus | №0768 |
| stealthDisadvantage | №0073 |
| steed | №0646 |
| steel | №0657 (+ 3 других файлов) |
| steelBillet | №0662 |
| steelWire | №0662 |
| steelWireV38 | №1090 |
| stencil | №0062 |
| step | №0064 (+ 1 других файлов) |
| stepWind | №0637 |
| stickAndMove | №0768 |
| stillnessOfMind | №0637 |
| stock | №0788 (+ 2 других файлов) |
| stockCount | №0789 |
| stocky | №0055 |
| stolen | №0807 |
| stolenSpark | №0768 |
| stone | №0056 (+ 4 других файлов) |
| Stoneblood | №0784 |
| stonecutter | №0790 (+ 1 других файлов) |
| stoneDust | №0661 |
| stoneForm | №0768 |
| stoneFormToggle | №0768 |
| stoneReductionAppliesToMagic | №0768 |
| stoneToFlesh | №0768 |
| stool | №0056 |
| stop | №0836 |
| stopIntruder | №0765 |
| stopOnDefeat | №0772 (+ 4 других файлов) |
| stopped | №0807 (+ 1 других файлов) |
| storage | №0802 (+ 2 других файлов) |
| STORAGE_KEY | №0655 |
| stored | №0798 |
| storedHealingMax | №0768 |
| storm | №0630 |
| str | №0613 (+ 61 других файлов) |
| straight | №0055 |
| straightLine | №0768 |
| strands | №1249 |
| strangeMetabolism | №0630 |
| strategicAdjustments | №0768 |
| strategist | №0728 (+ 1 других файлов) |
| strBonus | №0630 |
| strChecksDisadvantage | №0630 (+ 1 других файлов) |
| strDexChecksDisadvantage | №0630 (+ 1 других файлов) |
| strDexSaveAdvantage | №0768 |
| stream | №0875 |
| streetSmart | №0705 |
| streetwise | №0768 |
| strength | №0775 (+ 11 других файлов) |
| Strength | №0069 |
| strengthAdvantage | №0807 |
| strengthFloor | №0807 |
| strengthInNumbers | №0768 |
| strengthMaxBonus | №0768 |
| strengthOrDexterity | №0687 (+ 3 других файлов) |
| strenuous | №0070 (+ 1 других файлов) |
| stressPressure | №0618 |
| strikeDice | №0768 |
| strIncrease | №0768 |
| strMaxBonus | №0630 |
| strMaxIncrease | №0768 |
| strokeOfLuck | №0637 |
| strongbow | №0768 |
| strOrDexSave | №0768 |
| strSave | №0768 |
| strSavesDisadvantage | №0630 (+ 1 других файлов) |
| stubble | №0050 (+ 1 других файлов) |
| student | №0765 |
| stun | №0765 |
| stunIfFailedBy5 | №0630 |
| stunned | №0768 (+ 2 других файлов) |
| stunnedUntilEndOfNextTurn | №0768 |
| stunning | №0768 |
| stunningStrike | №0637 (+ 1 других файлов) |
| stunOnFail | №0768 |
| stunOnFailBy5 | №0768 |
| style | №0768 (+ 32 других файлов) |
| styles | №0802 |
| subclass | №0775 (+ 20 других файлов) |
| SUBCLASS_FEATURES | №0637 |
| subclassBonds | №0675 |
| subclassDeepMagic | №0687 |
| subclasses | №0066 (+ 24 других файлов) |
| subclassFeature | №0765 |
| subclassFeatureCatalog | №0705 |
| subclassFeatureIdResolution | №0666 |
| subclassFeatureLevels | №0066 (+ 20 других файлов) |
| subclassId | №0650 (+ 2 других файлов) |
| subclassLevel | №0066 (+ 41 других файлов) |
| subclassSystem | №0666 (+ 4 других файлов) |
| subclassUse | №0768 |
| subjugateThrall | №0768 |
| subtle | №0637 (+ 1 других файлов) |
| subtractD8 | №0768 |
| subtractHemocraftDie | №0630 |
| subtree | №0781 (+ 3 других файлов) |
| success | №0067 (+ 24 других файлов) |
| successes | №0644 (+ 14 других файлов) |
| successorClientId | №1227 |
| successTempHp | №0768 |
| suit | №0810 |
| suite | №0843 |
| summary | №0617 (+ 12 других файлов) |
| summon | №0765 (+ 3 других файлов) |
| summonDevilJurist | №0768 |
| summonedId | №0807 |
| summonFamiliar | №0768 |
| summonFiendAt0HP | №0768 |
| summonOoze | №0067 |
| summonSpellId | №0819 |
| sunAura | №0807 |
| sunlightAttackAndPerceptionDisadvantage | №0768 |
| sunlightAttackAndSightDisadvantage | №0630 |
| sunlightHazard | №0798 |
| Sunwatcher | №0784 |
| superior | №0654 |
| superiorInspiration | №0637 |
| superiorInterdict | №0687 |
| superiorInterdictRestore | №0687 |
| superiorityDice | №0637 |
| supernal | №0768 (+ 1 других файлов) |
| supported | №0047 (+ 1 других файлов) |
| supportFetchAPI | №0875 |
| supportRangeFt | №0768 |
| suppressAilments | №0768 |
| suppressResistanceAndImmunity | №0768 |
| surface | №0055 |
| surfaceMaxDistance | №1106 (+ 1 других файлов) |
| surfaceMeanDistance | №1097 (+ 3 других файлов) |
| surfaceMedianDistance | №1097 (+ 3 других файлов) |
| surfaceP95Distance | №1097 (+ 3 других файлов) |
| surpriseAttack | №0768 |
| surveySettlement | №0768 |
| surveyWilderness | №0768 |
| survival | №0761 (+ 2 других файлов) |
| survive | №0724 |
| survivor | №0637 |
| suspended | №0644 (+ 1 других файлов) |
| sutureCost | №0798 |
| sutureOptions | №0798 |
| swamp | №0052 (+ 2 других файлов) |
| swapCard | №0810 |
| swappedTurns | №0810 (+ 2 других файлов) |
| swapWithThrallRangeFt | №0798 |
| swarm | №0050 (+ 2 других файлов) |
| swarm_bats | №1261 |
| swarm_beetles | №1261 |
| swarm_rats | №1261 |
| swarmCore | №0050 |
| swarmFloor | №0050 |
| swarmForm | №0052 (+ 3 других файлов) |
| swarmParts | №0050 |
| swarmPercent | №0052 (+ 3 других файлов) |
| swarmUnit | №0050 |
| swarmVortex | №0050 |
| sweep | №0050 (+ 1 других файлов) |
| sweepAttack | №0768 |
| sweepingStrike | №0768 |
| sweetDreams | №0768 |
| sweetScience | №0705 |
| swept | №0055 |
| swift | №0768 |
| Swiftblade | №0784 |
| swiftJinx | №0768 |
| swimFt | №0630 |
| swimSpeed | №0768 |
| swimSpeedEqualsWalking | №0768 |
| swine | №0763 |
| switchAlly | №0768 |
| swords | №0807 (+ 1 других файлов) |
| symbiosis | №0805 |
| sync | №0067 (+ 19 других файлов) |
| syncClassResources | №0637 |
| syncFromInitiative | №1170 |
| syncState | №0066 |
| syncTarotEntity | №0807 |
| synergy | №0068 |
| t | №0047 (+ 1 других файлов) |
| tab | №0838 (+ 3 других файлов) |
| table | №0056 (+ 18 других файлов) |
| tacticalExploit | №0728 |
| tacticalReposition | №0768 |
| tacticalSkill | №0728 |
| tacticalSuperiority | №0728 |
| tactician | №0771 (+ 1 других файлов) |
| Tactician | №0784 |
| tag | №0050 (+ 1 других файлов) |
| tagName | №1206 |
| tags | №0050 (+ 28 других файлов) |
| tail | №0050 |
| tailColor | №0055 (+ 3 других файлов) |
| tailCurve | №0055 (+ 1 других файлов) |
| tailLength | №0055 (+ 5 других файлов) |
| tailoring | №0051 |
| tailThickness | №0055 (+ 3 других файлов) |
| tailTip | №0052 (+ 1 других файлов) |
| tailTuftSize | №0055 (+ 1 других файлов) |
| takeAttack | №0824 |
| talent | №0768 |
| talentProgression | №0703 |
| talents | №0703 (+ 1 других файлов) |
| tannin | №0662 |
| target | №0050 (+ 46 других файлов) |
| targetAc | №0800 (+ 3 других файлов) |
| targetCount | №0768 |
| targetDefeated | №0644 (+ 3 других файлов) |
| targetedAllyAdvantage | №0768 |
| targetEntries | №1107 (+ 1 других файлов) |
| targetExtraRadiant | №0792 |
| targetFile | №1107 (+ 1 других файлов) |
| targetId | №0049 (+ 33 других файлов) |
| targetKey | №0066 |
| targetLevel | №0689 |
| targetMode | №0856 |
| targetName | №0773 (+ 2 других файлов) |
| targetOncePerLongRest | №0798 |
| targetPeerId | №0800 |
| targetRadiantDamage | №0768 |
| targetRequired | №0768 |
| targets | №0067 (+ 12 других файлов) |
| targetSelfOrTouch | №0768 |
| targetsFatigueRadiusFt | №0768 |
| targetsUpTo | №0768 |
| targetTurns | №0630 |
| targetType | №0802 |
| tarotActorRef | №0807 |
| tarotCoin | №0807 |
| tarotEffects | №1089 |
| tarotKnowledge | №1089 |
| tarotLastStartedTurn | №1089 |
| tarotModeApplied | №0644 (+ 1 других файлов) |
| tarotOwnerId | №0807 |
| tarotReaction | №0644 |
| tarotScene | №0644 (+ 14 других файлов) |
| taunt | №0765 (+ 1 других файлов) |
| team | №0067 (+ 8 других файлов) |
| teamAttackBonus | №0807 |
| techniques | №0824 |
| telekinesis | №0765 (+ 1 других файлов) |
| telekinesisLiftBonus | №0768 |
| telekinetic | №0771 |
| telekineticForce | №0768 |
| telekineticPush | №0768 |
| telepathic | №0771 |
| telepathicIntrusion | №0768 |
| telepathicIntrusionSave | №0768 |
| telepathy | №0768 |
| telepathyFt | №0765 |
| teleport | №0067 |
| teleportAllyId | №0808 (+ 2 других файлов) |
| teleportBetweenPaint | №0067 |
| teleportDamage | №0768 |
| teleported | №0807 |
| teleportFt | №0675 (+ 3 других файлов) |
| teleportNearTarget | №0768 |
| teleportRangeFt | №0798 |
| teleportSave | №0768 |
| teleportToImpact | №0067 |
| teleportWithFamiliar | №0802 |
| temp | №0775 (+ 3 других файлов) |
| tempAbsorbed | №0644 |
| temperament | №0790 |
| tempHp | №0067 (+ 19 других файлов) |
| tempHP | №0802 (+ 3 других файлов) |
| tempHpAtStartTurn | №0768 |
| tempHpBonus | №0768 |
| tempHpDice | №0768 |
| tempHpEach | №0768 |
| tempHpFromCharnel | №0798 |
| tempHpFromLightningDamage | №0768 |
| tempHpFromSealDamage | №0768 |
| tempHpOnApplause | №0765 |
| tempHpOnEnemyReducedToZero | №0768 |
| tempHpOnWake | №0768 |
| tempHpPerDie | №0768 |
| template | №0050 |
| templateNormals | №0050 |
| templates | №0646 |
| temple | №0790 (+ 1 других файлов) |
| temporary | №0768 |
| temporaryHp | №0771 |
| temporaryHP | №0067 |
| terrain | №0867 |
| terrorAndDecay | №0768 |
| terrorDie | №0768 |
| terrorizingForce | №0687 |
| test | №1060 |
| testMode | №0831 (+ 1 других файлов) |
| tests | №0843 |
| tethered | №0768 |
| TEXCOORD_0 | №1103 |
| texLoc | №0062 |
| text | №0801 (+ 1 других файлов) |
| textContent | №1206 |
| textile | №0659 |
| texture | №0051 (+ 4 других файлов) |
| Texture | №0059 |
| textures | №0062 |
| textureTile | №0051 |
| thaumaturgy | №0768 |
| thaumaturgyEnhanced | №0798 |
| thenResistance | №0630 |
| thievesToolsBonus | №0768 |
| thieving | №0768 |
| thighL | №0048 |
| thighR | №0048 |
| thirdDisciplineLevel | №0703 |
| thirdparty | №0649 |
| thornsDice | №0858 |
| thrallAdvantage | №0798 |
| thrallAura | №0798 |
| thrallDance | №0798 |
| thrallDeathExplosion | №0798 |
| thrallEthereal | №0798 |
| thrallFlight | №0798 |
| thrallInvisible | №0798 |
| thralls | №0798 |
| thrallSlots | №0798 |
| thrallType | №0798 |
| thrallTypes | №0798 |
| thread | №0656 (+ 4 других файлов) |
| thresholds | №0794 |
| thrillOfTheHunt | №0768 |
| thrownRange | №0768 |
| thunder | №0637 |
| tiedMaximumsAllActive | №0858 |
| tier | №0654 |
| tights | №0051 |
| tile | №0051 |
| tiles | №0060 (+ 1 других файлов) |
| time | №0050 (+ 13 других файлов) |
| timeFrozen | №0807 |
| timelessBody | №0637 |
| timeMinutes | №1058 |
| timeout | №1099 (+ 36 других файлов) |
| timer | №0836 |
| times | №0057 |
| timeStop | №0807 |
| tinker | №0659 (+ 3 других файлов) |
| tinkerer | №0660 |
| tinOre | №0662 |
| tiny | №0805 (+ 1 других файлов) |
| tinyServant | №1163 |
| tissue | №0047 (+ 1 других файлов) |
| title | №0631 (+ 5 других файлов) |
| to | №0621 (+ 2 других файлов) |
| toad | №0675 |
| toggle | №0649 (+ 1 других файлов) |
| toggleCondition | №0644 (+ 3 других файлов) |
| toHit | №0863 (+ 3 других файлов) |
| token | №0642 (+ 3 других файлов) |
| tokenList | №1205 (+ 2 других файлов) |
| tokens | №0060 (+ 27 других файлов) |
| tombGuardian | №0768 |
| tool | №0615 (+ 20 других файлов) |
| toolBonus | №0797 |
| toolMastery | №0807 |
| toolName | №1058 |
| toolProficiencies | №0613 (+ 2 других файлов) |
| toolRequired | №0867 |
| tools | №0067 (+ 27 других файлов) |
| toolsAdvantage | №0807 |
| top | №0052 (+ 12 других файлов) |
| top10LargestMapped | №1108 |
| topknot | №0050 (+ 1 других файлов) |
| topY | №0051 |
| torso | №0050 (+ 2 других файлов) |
| torsoRidgeSize | №0055 (+ 4 других файлов) |
| torsoRidgeWidth | №0055 (+ 2 других файлов) |
| tortle | №1278 |
| total | №0617 (+ 53 других файлов) |
| total_length | №1100 |
| totalCp | №0788 |
| totalDomination | №0768 |
| totalGp | №0791 |
| totalLeather | №0652 |
| totalLength | №1109 |
| totalLevel | №0816 |
| totemSpirit | №0637 |
| toTheMat | №0768 |
| touchCurseThreshold | №0798 |
| touchedGlbVertexPct | №1108 |
| touchedGlbVertices | №1108 |
| touchMaxHpCut | №0798 |
| touchParalyzeThreshold | №0798 |
| touchRangeBonusFt | №0798 |
| touchThreshold | №0798 |
| towerShield | №0860 |
| town | №0056 |
| toxins | №0659 |
| toyArmy | №0798 |
| toymaker | №0798 |
| toySoulVault | №0798 |
| track | №0071 |
| trackInscribedRunesAnyPlane | №0768 |
| traderCount | №0789 |
| traderId | №0790 |
| traders | №0788 (+ 1 других файлов) |
| TRADERS | №0788 |
| tradition | №0802 (+ 1 других файлов) |
| traditionAction | №0802 |
| traditionRites | №0696 |
| traditions | №0696 (+ 1 других файлов) |
| trainHumanoids | №0768 |
| traits | №0647 (+ 2 других файлов) |
| transactionRevision | №0800 |
| transcended | №0703 (+ 1 других файлов) |
| Transcended | №0784 |
| transfer | №0805 |
| transferCondition | №0768 |
| transferDamage | №0768 |
| transferringAffliction | №0768 |
| transform | №0798 |
| transformed | №0807 |
| translation | №1063 |
| transport | №0799 |
| transposition | №0768 |
| traps | №0659 |
| treasure | №0056 |
| triangles | №0052 (+ 4 других файлов) |
| trickster | №0810 (+ 2 других файлов) |
| tricksterStatus | №0810 |
| tricksterTurn | №0807 |
| trigger | №0768 (+ 3 других файлов) |
| triggerDamageTypes | №0630 |
| triggerHealing | №0792 |
| triggerId | №0644 (+ 2 других файлов) |
| triggerMiraculousHealing | №0768 |
| triggerOnNearbyKill | №0630 |
| triggerOnPsychicDamage | №0768 |
| triggerSpend | №0798 |
| trough | №0056 |
| trousers | №0051 |
| trueSight | №0802 |
| truesightFt | №0768 |
| trunkSize | №0055 (+ 1 других файлов) |
| truth | №0792 |
| truthful | №0807 |
| truthfulIds | №0807 |
| ts | №0840 |
| turn | №0798 |
| turned | №0637 |
| turnEnd | №0807 |
| turnId | №1146 |
| turnIds | №0810 (+ 1 других файлов) |
| turnResources | №0067 (+ 34 других файлов) |
| turns | №0630 |
| turnStart | №0807 |
| turnUndead | №0637 |
| turtle | №0050 |
| tuskSize | №0055 (+ 2 других файлов) |
| twin_braids | №0050 (+ 1 других файлов) |
| twin_tails | №0050 (+ 1 других файлов) |
| twinFamiliar | №0768 |
| twinned | №0637 |
| twoRevelations | №0802 |
| type | №0059 (+ 113 других файлов) |
| typedDice | №0807 |
| typedExtraDice | №0067 (+ 3 других файлов) |
| typeKey | №0863 (+ 4 других файлов) |
| types | №0663 |
| u | №0050 (+ 1 других файлов) |
| uiGather | №0070 |
| uiRequired | №0703 |
| umbralImprecation | №0768 |
| unarmed | №0768 |
| unarmedAttack | №0630 (+ 3 других файлов) |
| unarmedAttackBonus | №0768 |
| unarmedDamage | №0768 |
| unarmedGraft | №1058 |
| unarmoredAC | №0768 |
| unavailable | №0066 (+ 11 других файлов) |
| unavoidableAccident | №0768 |
| unbreakable | №0630 (+ 2 других файлов) |
| Unbreakable | №0768 |
| unbreakableExploit | №0768 |
| unbridledChaos | №0768 |
| uncannyDodge | №0637 |
| unchanged | №1102 |
| uncommon | №0782 (+ 5 других файлов) |
| unconsciousAtFatigueGteCurrentHp | №0768 |
| unconsciousOrStunnedOnly | №0768 |
| undead | №0617 (+ 15 других файлов) |
| undeadFocusAvailable | №0630 |
| undeadFocusReaction | №0630 |
| undercut | №0050 (+ 1 других файлов) |
| underdark | №0052 |
| underwaterDarkvision | №0822 |
| underwear | №0051 |
| underwearBottom | №0055 (+ 5 других файлов) |
| underwearTop | №0055 (+ 6 других файлов) |
| undo | №0052 |
| undying | №0630 (+ 2 других файлов) |
| undyingServitude | №0798 |
| unequip | №0055 |
| unerringEye | №0768 |
| unfortunateAccident | №0768 |
| ungulate | №0763 |
| uniforms | №1059 |
| uniquePositionVertexCounts | №1109 |
| unit | №0050 (+ 4 других файлов) |
| unitGp | №0791 |
| units | №0788 |
| unknown | №1064 |
| unleashed | №0703 (+ 1 других файлов) |
| unlimitedHybrid | №0768 |
| unlockRank | №0659 |
| unlockSchedule | №0810 |
| unreducedNecrotic | №0768 |
| unreducedSelfDamage | №0768 |
| unreducible | №0768 |
| unrivaledGenius | №0818 |
| unsealed | №0630 |
| unsealedArcana | №0630 |
| unsealedAspectReplacement | №0833 |
| unseen | №1168 |
| unshackledPower | №0768 |
| unstable | №0068 (+ 1 других файлов) |
| unstoppable | №0860 |
| unsupported | №0066 (+ 17 других файлов) |
| until | №0067 (+ 1 других файлов) |
| untilDismissed | №0768 |
| untilOwnEnd | №0807 |
| untilOwnEndAfterNext | №0807 |
| untilOwnerEnd | №0807 (+ 1 других файлов) |
| untilOwnerStart | №0807 |
| untilOwnStart | №0807 (+ 2 других файлов) |
| untilRound | №0807 |
| unwaveringWill | №0728 |
| unyieldingResolve | №0724 |
| unyieldingWill | №0818 |
| update | №0819 (+ 1 других файлов) |
| updateAvailable | №0831 |
| updated | №0822 (+ 1 других файлов) |
| updated_at | №1089 |
| updatedAt | №0060 (+ 1 других файлов) |
| updateSwarm | №0050 |
| upperArmL | №0048 |
| upperArmR | №0048 |
| urbanAdvantage | №0765 |
| uri | №1098 |
| url | №0057 (+ 4 других файлов) |
| URL | №1181 (+ 5 других файлов) |
| urls | №0875 |
| ursine | №0763 |
| use | №0675 (+ 1 других файлов) |
| useCount | №0768 |
| used | №0613 (+ 21 других файлов) |
| usedBloodLevels | №0802 |
| usedBy | №0662 (+ 1 других файлов) |
| usedByV38 | №0661 (+ 1 других файлов) |
| usedCount | №0643 |
| usedLevels | №0802 |
| useDominantOrgan | №0858 |
| usedThisRound | №0794 |
| useFeature | №0067 (+ 16 других файлов) |
| useIntForStr | №0768 |
| useIntForStrengthOrDexOnSurge | №0768 |
| useLeadership | №0768 |
| user | №0642 (+ 1 других файлов) |
| userAgent | №0837 (+ 1 других файлов) |
| useRules | №0772 (+ 23 других файлов) |
| uses | №0687 (+ 5 других файлов) |
| usesAlchemistSupplies | №0800 |
| usesIntForPerception | №0768 |
| usesPerLongRest | №0067 (+ 2 других файлов) |
| usesPerRest | №0798 |
| usesPerTurn | №0768 |
| useSpiritAbility | №0773 |
| usesStrength | №0645 (+ 1 других файлов) |
| useStrength | №0768 |
| useStrengthWithBows | №0768 |
| useSubclassFeature | №0773 (+ 2 других файлов) |
| useTex | №1059 |
| useTexLoc | №0062 |
| uv | №0047 (+ 5 других файлов) |
| uvLoc | №0062 |
| v | №0047 (+ 2 других файлов) |
| V | №1136 |
| V52 | №1150 |
| V53 | №1151 |
| valiantLeader | №0728 |
| validate | №0809 |
| validatePack | №0650 |
| validateTurn | №0772 |
| value | №0049 (+ 25 других файлов) |
| valueGp | №0807 |
| valueMultiplier | №0654 |
| values | №0057 (+ 1 других файлов) |
| vampirism | №0066 |
| vanish | №0637 |
| variant | №0048 (+ 4 других файлов) |
| variantHooks | №0617 (+ 13 других файлов) |
| variants | №0067 (+ 2 других файлов) |
| VEC2 | №0057 (+ 4 других файлов) |
| VEC3 | №0057 (+ 4 других файлов) |
| VEC4 | №0057 (+ 4 других файлов) |
| vedalken | №0661 |
| vengefulBane | №0768 |
| venom | №0656 |
| Venom | №0069 |
| venomConcentrateV49 | №0656 |
| venomReagent | №0656 (+ 1 других файлов) |
| verbal | №0749 (+ 10 других файлов) |
| verbalBlocked | №0807 |
| verbalComponentsBlocked | №0067 |
| verify | №0642 |
| vermillion | №0630 |
| Vermillion | №0768 |
| vermin | №0763 |
| versatileAttackBonus | №0768 |
| versatileFightingAdvanced | №0768 |
| version | №0048 (+ 51 других файлов) |
| VERSION | №0048 (+ 56 других файлов) |
| vertexCount | №0052 (+ 1 других файлов) |
| vertexMask | №0048 |
| vertices | №0052 (+ 6 других файлов) |
| verticesPerRat | №0050 |
| very_rare | №0782 (+ 5 других файлов) |
| vesselMagic | №0833 |
| vessels | №0659 |
| vesselSlots | №0833 |
| vesselStrike | №0833 |
| vials | №0659 |
| victorySurgeExploit | №0768 |
| view | №0060 (+ 1 других файлов) |
| viewport | №1249 (+ 36 других файлов) |
| viewportHeight | №0052 |
| viewportWidth | №0052 |
| vileAffliction | №0768 |
| village | №0788 |
| vine | №0821 |
| vinegar | №0662 |
| violet | №0821 |
| visible | №0630 (+ 9 других файлов) |
| visibleMeleeOnly | №0768 |
| Vitality | №0069 |
| vitalitySplint | №0768 |
| voiceReagent | №0815 |
| volatility | №0069 |
| Volatility | №0069 |
| volume | №0050 (+ 1 других файлов) |
| volumes | №0050 |
| voluntarilyDetach | №0805 |
| voraciousWeapon | №0768 |
| vowOfEnmity | №0637 (+ 1 других файлов) |
| vpLoc | №0062 |
| vulnerabilities | №0644 (+ 9 других файлов) |
| vulnerability | №0630 (+ 2 других файлов) |
| vulnerable | №0839 (+ 1 других файлов) |
| w | №0047 (+ 10 других файлов) |
| wagerCurrent | №0810 |
| wagerMax | №0810 |
| wagerOdds | №0810 |
| wagers | №0810 (+ 1 других файлов) |
| wagerStartCheck | №0807 |
| waist | №0052 (+ 6 других файлов) |
| waiveSacrificeDamage | №0768 |
| wakeMageSleeper | №0807 |
| wall | №0060 |
| WALL | №0061 |
| wall_brick_red | №0061 |
| wall_concrete | №0061 |
| wall_half_timber | №0061 |
| wall_marble_dark | №0061 |
| wall_marble_light | №0061 |
| wall_moss_stone | №0061 |
| wall_old_plaster | №0061 |
| wall_plaster_dark | №0061 |
| wall_plaster_light | №0061 |
| wall_plaster_panel | №0061 |
| wall_slate | №0061 |
| wall_stone_dark | №0061 |
| wall_stone_light | №0061 |
| wall_stone_masonry | №0061 |
| wall_wallpaper | №0061 |
| wall_white_plaster | №0061 |
| wall_wood_dark | №0061 |
| wall_wood_light | №0061 |
| wallClimb | №0798 |
| walls | №0060 (+ 15 других файлов) |
| wallStart | №0615 |
| wandering | №0703 (+ 1 других файлов) |
| wands | №0807 (+ 1 других файлов) |
| wands_02 | №0807 |
| wantedCp | №0790 (+ 1 других файлов) |
| war_caster | №0771 |
| warCry | №0768 |
| ward | №0644 |
| wardAbsorbed | №0644 |
| wardDenied | №0644 |
| Warden | №0784 |
| wardenInterrupt | №0644 |
| wardenSource | №0784 |
| wardenSurvive | №0644 |
| warforged | №0661 |
| warfront | №1159 |
| warfrontEligible | №0620 |
| warlock | №0787 (+ 1 других файлов) |
| warlockLevelEquivalent | №0768 |
| Warlord | №0784 |
| warlordSource | №0784 |
| warning | №0653 |
| warPriest | №0637 |
| warriorPoet | №0768 |
| warsong | №0768 |
| warSongs | №0765 |
| waste | №0815 |
| wasteland | №0788 |
| water | №0661 (+ 1 других файлов) |
| waterBreathing | №0067 (+ 2 других файлов) |
| waterCore | №0815 |
| waterEssence | №0815 |
| wave | №0050 |
| wavy_bob | №0050 (+ 1 других файлов) |
| wavy_long | №0050 (+ 1 других файлов) |
| wax | №0657 (+ 2 других файлов) |
| Weakness | №0069 |
| weapon | №0056 (+ 13 других файлов) |
| weaponAttack | №0644 (+ 22 других файлов) |
| weaponAttackBonus | №0802 |
| weaponBonus | №0802 |
| weaponDamage | №0802 |
| weaponDamageType | №0768 |
| weaponFunctional | №1153 |
| weaponId | №0067 (+ 14 других файлов) |
| weaponMastery | №0724 |
| weaponMasteryLevels | №0724 |
| weaponOnly | №0807 |
| weaponProficiency | №0802 |
| weapons | №0782 (+ 65 других файлов) |
| weaponsData | №0613 (+ 2 других файлов) |
| weaponsmith | №0790 (+ 1 других файлов) |
| weaponTeleportIfDistanceGtFt | №0768 |
| weaponValue | №1153 |
| weaponWear | №1091 |
| wearForArmor | №0655 |
| wearForAttack | №0655 |
| wearRatio | №0654 |
| weasel | №0675 |
| weaver | №0657 (+ 6 других файлов) |
| webgl | №1257 |
| webPreferences | №0875 |
| webSecurity | №0875 |
| weight | №0054 (+ 47 других файлов) |
| weights | №0047 (+ 3 других файлов) |
| weld | №0047 |
| White | №0765 (+ 1 других файлов) |
| whiteHot | №0768 |
| width | №0052 (+ 48 других файлов) |
| wildCharge | №0768 |
| wildernessIntel | №0768 |
| wildMagicSurge | №0637 |
| wildShape | №0637 (+ 1 других файлов) |
| wildspace | №0619 (+ 1 других файлов) |
| wildspaceEligible | №0619 |
| wildwood | №0052 |
| willControlledBy | №0858 |
| willingTargetIds | №0808 (+ 1 других файлов) |
| window | №0056 (+ 77 других файлов) |
| wingColor | №0055 (+ 3 других файлов) |
| wingSize | №0055 (+ 1 других файлов) |
| wis | №0613 (+ 54 других файлов) |
| wisChecksAdvantage | №0630 (+ 1 других файлов) |
| wisChecksDisadvantage | №0630 (+ 1 других файлов) |
| wisdom | №0775 (+ 9 других файлов) |
| wisdomCheckAdvantage | №0802 |
| wisdomSaveAdvantage | №0768 |
| wisSave | №0768 |
| wisSavesDisadvantage | №0630 (+ 1 других файлов) |
| Witch | №0696 |
| witchCurse | №0768 |
| witchItemFlySpeed | №0798 |
| with | №0794 |
| withering | №0067 |
| withFileTypes | №0877 (+ 1 других файлов) |
| within10CellsPct | №1106 |
| within2CellsPct | №1106 |
| within5CellsPct | №1106 |
| within5GridCellsPct | №1111 |
| withinCellPct | №1106 |
| withinGridCellPct | №1111 |
| wizard | №0787 (+ 1 других файлов) |
| won | №0810 |
| wood | №0056 (+ 6 других файлов) |
| woodcarver | №0659 (+ 3 других файлов) |
| wooden | №0056 |
| woodwork | №0657 (+ 1 других файлов) |
| wool | №0051 |
| wordsOfAdamance | №0768 |
| wordsOfBenediction | №0768 |
| wordsOfDamnation | №0768 |
| wordsOfDomination | №0768 |
| wordsOfLegend | №0768 |
| wordsOfMayhem | №0768 |
| wordsOfZeal | №0768 |
| worg | №0675 |
| worldActor | №0063 |
| worldId | №0867 |
| worldMatrices | №0057 |
| worn | №0653 |
| wrapS | №0052 (+ 1 других файлов) |
| wrapT | №0052 (+ 1 других файлов) |
| wretchedCastigation | №0768 |
| writable | №0807 |
| write | №0067 (+ 1 других файлов) |
| x | №0050 (+ 47 других файлов) |
| xanathar | №0617 |
| xenoNecroticReady | №1057 |
| xp | №0617 (+ 16 других файлов) |
| xpFor | №0794 |
| xu | №0047 |
| xv | №0047 |
| xx | №0047 |
| xy | №0047 |
| y | №0050 (+ 44 других файлов) |
| yaw | №0050 (+ 2 других файлов) |
| yeast | №0661 |
| yew | №0662 |
| yieldMult | №0797 |
| yieldMultiplier | №0661 |
| yu | №0047 |
| yuan_ti | №0661 |
| yv | №0047 |
| yy | №0047 |
| z | №0050 (+ 3 других файлов) |
| zealousWords | №0765 |
| zeroHp | №0807 |
| zeroHpReaction | №0644 (+ 4 других файлов) |
| zeroHpSave | №0768 |
| zincOre | №0662 |
| zoneRadiusFt | №0768 |
| zones | №0060 (+ 1 других файлов) |
| zoom | №0059 (+ 3 других файлов) |

### Ключи localStorage (26)

| Имя | Исходные файлы |
|---|---|
| dnd_app_alpha | №0821 |
| dnd_app_font | №0821 |
| dnd_app_frame_color | №0821 |
| dnd_app_frame_style | №0821 |
| dnd_app_theme | №0821 |
| dnd_autorotate_enabled | №0857 |
| dnd_autorotate_interval | №0857 |
| dnd_campaigns_v1 | №0799 (+ 1 других файлов) |
| dnd_character_appearance_draft_v1 | №1257 |
| dnd_characters | №0820 |
| dnd_current_character_id | №0820 (+ 1 других файлов) |
| dnd_custom_races | №0813 |
| dnd_debug_enabled | №0821 (+ 2 других файлов) |
| dnd_launcher_icon | №0821 (+ 2 других файлов) |
| dnd_market_v55_state | №0791 (+ 1 других файлов) |
| dnd_modal_color | №0059 (+ 1 других файлов) |
| dnd_modal_opacity | №0059 (+ 1 других файлов) |
| dnd_multi_characters_v2 | №0613 (+ 44 других файлов) |
| dnd_selected_wallpaper | №0857 |
| dnd_ui_color | №0059 (+ 1 других файлов) |
| dnd_ui_opacity | №0059 (+ 1 других файлов) |
| dnd_v53_world_id | №0867 |
| dnd_v71_onboarding_done | №0804 (+ 1 других файлов) |
| dnd_vtt_mobile_session_v67 | №1228 |
| dnd_wallpaper_dim | №0857 |
| dndContentEnabled | №0650 |

### CSS переменные (16)

| Имя | Исходные файлы |
|---|---|
| --accent-action | №0826 |
| --accent-danger | №0826 |
| --accent-primary | №0826 |
| --accent-success | №0826 |
| --bg-box | №0826 |
| --bg-card | №0826 |
| --bg-input | №0826 |
| --bg-main | №0826 |
| --border-color | №0826 |
| --border-input | №0826 |
| --dnd-frame-art | №0826 |
| --dnd-frame-color | №0826 |
| --dnd-frame-filter | №0826 |
| --text-labels | №0826 |
| --text-main | №0826 |
| --text-muted | №0826 |

### Python/Java идентификаторы (248)

| Имя | Исходные файлы |
|---|---|
| __DND_APP_BOOT_READY | №0038 |
| __name__ | №1243 (+ 2 других файлов) |
| a | №0037 |
| aa | №0037 |
| action | №1288 |
| active | №0037 (+ 1 других файлов) |
| activeFile | №0037 |
| activeRoot | №0038 |
| activeVersion | №0037 |
| activity | №0037 |
| aliases | №0037 |
| android | №1298 |
| animationClips | №1243 |
| ap | №1248 |
| apkBytes | №0037 |
| app | №1298 |
| app_path | №1298 |
| APP_VERSION | №1298 |
| archives | №1288 |
| area | №1243 |
| args | №1243 (+ 2 других файлов) |
| attributes | №1243 |
| av | №0037 |
| axis | №1243 |
| b | №0037 (+ 2 других файлов) |
| baseUrl | №0037 |
| bb | №0037 |
| binary | №1243 |
| bones | №1243 |
| buf | №0037 |
| buffer | №1243 |
| bv | №0037 |
| bytes | №0037 (+ 1 других файлов) |
| c | №0037 (+ 2 других файлов) |
| cache | №0037 |
| cacheBytes | №0037 |
| cacheKey | №0037 |
| candidates | №0037 (+ 1 других файлов) |
| canonical | №0037 |
| catalog | №1288 |
| category | №1296 |
| children | №0037 |
| choices | №1248 |
| chunk | №1243 |
| code | №1298 |
| codeCache | №0037 |
| codeCacheBytes | №0037 |
| component | №0037 |
| connectedComponents | №1243 |
| context | №0037 |
| count | №1243 (+ 1 других файлов) |
| counts | №1243 |
| current | №1298 |
| d | №1247 |
| data | №0037 (+ 1 других файлов) |
| dataBytes | №0037 |
| dataRoot | №0037 |
| default | №1248 |
| defaultFile | №0037 |
| degenerateTriangles | №1243 |
| dest | №1288 |
| detected | №1248 |
| digest | №0037 |
| dirs | №0037 |
| dndvtt_update | №0037 |
| document | №1243 |
| downloadedBytes | №0037 |
| dtype | №1243 |
| edges | №1243 |
| editorMorphs | №1243 |
| embeddedMorphChannels | №1243 |
| enabled | №0037 |
| encoding | №1248 (+ 3 других файлов) |
| ensure_ascii | №1243 (+ 5 других файлов) |
| entries | №1289 (+ 1 других файлов) |
| entry | №0037 (+ 1 других файлов) |
| errors | №1288 |
| EXCLUDE_DIRS | №1296 |
| executor | №0037 |
| exist_ok | №1243 (+ 2 других файлов) |
| expectedBytes | №0037 |
| expectedHash | №0037 |
| export_apply | №1288 |
| export_format | №1288 |
| ext | №1248 (+ 1 других файлов) |
| f | №0037 |
| faces | №1243 |
| file | №0037 (+ 1 других файлов) |
| filepath | №1288 |
| files | №0037 (+ 5 других файлов) |
| filesBytes | №0037 |
| fp | №1289 |
| GENERATED | №1296 |
| goToTab | №0038 |
| gradle | №1298 |
| gradle_path | №1298 |
| gx | №1247 |
| gy | №1247 |
| h | №1248 (+ 1 других файлов) |
| healthy | №0038 |
| height | №1247 |
| help | №1298 |
| i | №0037 (+ 1 других файлов) |
| iconId | №0037 |
| id | №0037 |
| ids | №1243 |
| image | №1247 |
| in | №0037 |
| indent | №1243 (+ 3 других файлов) |
| indexComponentType | №1243 |
| info | №0037 |
| item | №1243 (+ 1 других файлов) |
| k | №1288 |
| keepPrevious | №0037 |
| key | №1288 (+ 2 других файлов) |
| kind | №1243 (+ 1 других файлов) |
| landscapeActive | №0038 |
| len | №0037 |
| length | №0037 (+ 2 других файлов) |
| lines | №1288 |
| link | №1288 |
| loader | №0038 |
| lower | №0037 |
| m | №1248 (+ 3 других файлов) |
| manifest | №0037 (+ 1 других файлов) |
| MANIFEST | №1296 |
| MANIFEST_PATHS | №1296 |
| manifestUrl | №0037 |
| marker | №1288 |
| materials | №1243 |
| meshes | №1288 |
| meshMetadata | №1243 |
| metavar | №1298 |
| missing_ok | №1288 |
| morphNames | №1243 |
| n | №0037 (+ 1 других файлов) |
| N | №1247 |
| name | №0037 |
| nativeSeedValidated | №0037 |
| next | №0037 |
| noBackup | №0037 |
| noBackupBytes | №0037 |
| nonFiniteValues | №1243 |
| o | №0037 |
| objects | №1288 |
| offset | №1243 |
| out | №0037 (+ 4 других файлов) |
| p | №1248 (+ 1 других файлов) |
| package | №1298 |
| packageVersion | №0037 |
| parent | №0037 (+ 1 других файлов) |
| parents | №1243 (+ 2 других файлов) |
| parser | №1243 (+ 1 других файлов) |
| parts | №1243 |
| path | №0037 (+ 1 других файлов) |
| pending | №0037 |
| pixels | №1243 (+ 1 других файлов) |
| pkg | №1298 |
| pkg_path | №1298 |
| pm | №0037 |
| pores | №1247 |
| positions | №1243 |
| prefs | №0037 |
| previewRoot | №0037 |
| previous | №0037 |
| previousDir | №0037 |
| previousRequestedOrientation | №0038 |
| primitives | №1243 |
| raw | №0037 |
| rawBounds | №1243 |
| reach | №1247 |
| received | №0037 |
| records | №1288 |
| rel | №1296 |
| relative | №1288 |
| report | №1243 (+ 1 других файлов) |
| request | №0037 |
| required | №1243 (+ 1 других файлов) |
| restore | №0038 |
| return_counts | №1243 |
| return_inverse | №1243 |
| rng | №1247 |
| root | №0037 (+ 2 других файлов) |
| ROOT | №1243 (+ 4 других файлов) |
| root_url | №1248 |
| rootEntries | №0037 |
| roots | №1243 |
| rough | №1247 |
| RUNTIME_MANIFEST | №1296 |
| s | №0037 (+ 1 других файлов) |
| schema | №1243 |
| seamDuplicates | №1243 |
| seen | №1248 |
| selected | №0037 |
| selectedIndex | №0037 |
| separators | №1289 (+ 1 других файлов) |
| sha256 | №1243 |
| skins | №1243 |
| skipped | №1288 |
| src | №0037 |
| stack | №0037 |
| staged | №0037 |
| stageRoot | №0037 |
| standalone | №1288 |
| state | №0037 |
| strides | №1243 |
| target | №0037 (+ 2 других файлов) |
| temp | №1288 |
| text | №1248 (+ 2 других файлов) |
| ti | №0037 |
| title | №0038 |
| topology | №1243 |
| total | №0037 |
| totalBytes | №0037 |
| totalFiles | №0037 |
| triangles | №1243 |
| type | №0037 (+ 2 других файлов) |
| uniquePositions | №1243 |
| unit | №0037 |
| units | №0037 |
| updateBytes | №0037 |
| updater | №0038 |
| updateRoot | №0037 |
| url | №0037 |
| use_global | №1288 |
| use_selection | №1288 |
| uv | №1243 |
| uvOutsideUnitSquare | №1243 |
| uvRange | №1243 |
| value | №0037 |
| version | №0037 (+ 1 других файлов) |
| VERSION | №1296 |
| versionName | №0037 |
| versions | №0037 |
| versionsBytes | №0037 |
| vertices | №1243 |
| view | №1243 |
| visited | №0037 |
| VTT_PROJECT_MANIFEST_V70 | №1289 (+ 1 других файлов) |
| webView | №0038 |
| weights | №1243 |
| weightSumMaxError | №1243 |
| weldedBoundaryEdges | №1243 |
| weldedNonManifoldEdges | №1243 |
| weldTolerance | №1243 |
| width | №1243 |
| z | №1298 |
| zeroWeightVertices | №1243 |

### JSON поля (297)

| Имя | Исходные файлы |
|---|---|
| action | №0746 |
| african | №0907 |
| age | №0907 |
| allManifestEntriesMatchPhysicalZIP | №0894 (+ 1 других файлов) |
| allowToChangeInstallationDirectory | №1044 |
| allUnpackedSizesAndSHA256 | №0894 (+ 1 других файлов) |
| androidDebug | №0911 |
| androidSignedRelease | №0911 |
| animationClips | №0900 |
| app | №1299 (+ 2 других файлов) |
| appId | №1044 |
| arch | №1044 |
| archiveBytes | №0894 (+ 1 других файлов) |
| armLength | №0075 (+ 1 других файлов) |
| armLength-decr | №0075 (+ 1 других файлов) |
| armLength-incr | №0075 (+ 1 других файлов) |
| arms | №0075 (+ 1 других файлов) |
| artifact | №0894 (+ 1 других файлов) |
| artifactBytes | №0894 (+ 1 других файлов) |
| artifactDigest | №0894 (+ 1 других файлов) |
| artifactName | №1044 |
| asar | №1044 |
| asian | №0907 |
| assetId | №0740 (+ 6 других файлов) |
| attributes | №0900 |
| audit | №0907 |
| author | №0740 (+ 5 других файлов) |
| backslash | №0744 |
| backslashTexture | №0744 |
| balanced | №1096 |
| baseColorFactor | №0900 |
| baseObj | №0075 (+ 1 других файлов) |
| basePositionsSha256 | №0075 (+ 1 других файлов) |
| baseUrl | №1299 (+ 2 других файлов) |
| binary | №0075 (+ 1 других файлов) |
| binarySha256 | №0075 (+ 1 других файлов) |
| binaryTransfer | №0909 |
| blockedVersions | №1299 (+ 2 других файлов) |
| bones | №0900 |
| breast-volume-decr | №0075 (+ 1 других файлов) |
| breast-volume-incr | №0075 (+ 1 других файлов) |
| breastSize | №0075 (+ 1 других файлов) |
| build | №1044 |
| bytes | №1304 (+ 9 других файлов) |
| category | №1304 |
| caucasian | №0907 |
| cell | №0740 (+ 8 других файлов) |
| changedVertices | №0907 (+ 1 других файлов) |
| channel | №1299 (+ 2 других файлов) |
| channels | №0075 (+ 1 других файлов) |
| chest | №0900 (+ 2 других файлов) |
| chromiumQA | №0894 |
| commit | №0075 (+ 1 других файлов) |
| compositeTerms | №0907 |
| compositions | №0075 (+ 1 других файлов) |
| conclusion | №0894 (+ 1 других файлов) |
| connectedComponents | №0900 |
| controlled | №0740 (+ 1 других файлов) |
| count | №0075 (+ 2 других файлов) |
| CRC | №0894 (+ 1 других файлов) |
| createDesktopShortcut | №1044 |
| createStartMenuShortcut | №1044 |
| cupsize | №0907 |
| currentFloor | №0740 (+ 8 других файлов) |
| cutoff | №0907 |
| d | №0740 (+ 8 других файлов) |
| darkness | №0740 (+ 8 других файлов) |
| debug | №0894 |
| declaredSourceCommit | №0907 |
| degenerateTriangles | №0900 |
| description | №0740 (+ 7 других файлов) |
| destinationGender | №0907 |
| devDependencies | №1044 |
| directories | №1044 |
| doubleSided | №0900 |
| e | №0740 (+ 8 других файлов) |
| editorMorphs | №0900 |
| electron | №1044 |
| electron-builder | №1044 |
| embeddedMorphChannels | №0900 |
| emitsLight | №0746 |
| enclosed | №1096 |
| eTexture | №0740 (+ 8 других файлов) |
| exportedMacros | №0907 |
| fail | №0894 (+ 1 других файлов) |
| femaleStackTerms | №0907 |
| fileCount | №1304 |
| files | №1304 (+ 8 других файлов) |
| firmness | №0907 |
| fixtureSha256 | №0907 (+ 1 других файлов) |
| floor | №0740 (+ 1 других файлов) |
| floors | №0740 (+ 8 других файлов) |
| flow | №0894 |
| folder | №0075 (+ 3 других файлов) |
| gender | №0907 |
| generated | №1304 (+ 3 других файлов) |
| gitBlob | №0911 |
| h | №0740 (+ 8 других файлов) |
| head | №0075 (+ 1 других файлов) |
| head-decr | №0075 (+ 1 других файлов) |
| head-incr | №0075 (+ 1 других файлов) |
| height | №0740 (+ 9 других файлов) |
| hips | №0900 (+ 2 других файлов) |
| human-female | №1292 |
| id | №0740 (+ 11 других файлов) |
| indexComponentType | №0900 |
| intensity | №0740 (+ 8 других файлов) |
| interactive | №0746 |
| joints | №0907 (+ 2 других файлов) |
| JOINTS_0 | №0900 |
| kind | №1304 |
| legacy | №0894 (+ 1 других файлов) |
| legLength | №0075 (+ 1 других файлов) |
| legLength-decr | №0075 (+ 1 других файлов) |
| legLength-incr | №0075 (+ 1 других файлов) |
| legs | №0075 (+ 1 других файлов) |
| library | №0740 (+ 6 других файлов) |
| license | №0075 (+ 1 других файлов) |
| lighting | №0740 (+ 8 других файлов) |
| lightIntensity | №0746 |
| lightRadius | №0746 |
| limitations | №0075 (+ 2 других файлов) |
| localRuntimeTests | №0909 |
| loot | №0740 |
| macroConfigSha256 | №0907 |
| main | №1044 |
| manifest | №0894 (+ 1 других файлов) |
| mapId | №0740 (+ 6 других файлов) |
| materials | №0900 |
| maxDisplacementMeters | №0907 (+ 1 других файлов) |
| measure-thigh-circ-decr | №0075 (+ 1 других файлов) |
| measure-thigh-circ-incr | №0075 (+ 1 других файлов) |
| measure-upperarm-circ-decr | №0075 (+ 1 других файлов) |
| measure-upperarm-circ-incr | №0075 (+ 1 других файлов) |
| meshes | №1041 |
| meshMetadata | №0900 |
| metallicFactor | №0900 |
| method | №0075 (+ 1 других файлов) |
| MhObjectType | №0900 |
| MhScaleFactor | №0900 |
| minAppVersion | №1299 (+ 2 других файлов) |
| model | №0740 (+ 9 других файлов) |
| morphNames | №0900 |
| MPFB_GEN_object_type | №0900 |
| MPFB_GEN_scale_factor | №0900 |
| MPFB_HUM_african | №0900 |
| MPFB_HUM_age | №0900 |
| MPFB_HUM_asian | №0900 |
| MPFB_HUM_caucasian | №0900 |
| MPFB_HUM_cupsize | №0900 |
| MPFB_HUM_firmness | №0900 |
| MPFB_HUM_gender | №0900 |
| MPFB_HUM_height | №0900 |
| MPFB_HUM_is_human_project | №0900 |
| MPFB_HUM_material_source | №0900 |
| MPFB_HUM_muscle | №0900 |
| MPFB_HUM_proportions | №0900 |
| MPFB_HUM_weight | №0900 |
| muscle | №0907 |
| n | №0740 (+ 8 других файлов) |
| name | №0075 (+ 12 других файлов) |
| negative | №0075 (+ 3 других файлов) |
| nextAction | №0911 |
| nonFiniteValues | №0900 |
| NORMAL | №0900 |
| nsis | №1044 |
| nTexture | №0740 (+ 8 других файлов) |
| objects | №0740 (+ 8 других файлов) |
| offset | №0075 (+ 1 других файлов) |
| oneClick | №1044 |
| ota_install_contract | №0896 |
| output | №1044 |
| pages | №0911 |
| paid_api_authorized | №0001 |
| pass | №0894 (+ 1 других файлов) |
| path | №1304 (+ 3 других файлов) |
| pbrMetallicRoughness | №0900 |
| pectorals | №0075 (+ 1 других файлов) |
| perMachine | №1044 |
| physical_android_test | №0896 |
| physicalAndroidQA | №0894 (+ 3 других файлов) |
| physicalZIP | №0894 |
| pixels | №0900 |
| portable | №1044 |
| POSITION | №0900 |
| positive | №0075 (+ 3 других файлов) |
| primitives | №0900 |
| private | №1044 |
| productionSyntaxFiles | №0894 (+ 1 других файлов) |
| productName | №1044 |
| project | №0075 (+ 1 других файлов) |
| pronounced | №1096 |
| proportions | №0907 |
| publication | №0894 (+ 1 других файлов) |
| quota_scope | №0001 |
| race | №0907 |
| radius | №0740 (+ 8 других файлов) |
| rawBounds | №0900 |
| recommendedSourceCommit | №0907 |
| regression | №0894 (+ 1 других файлов) |
| release | №0909 |
| release_ready | №0001 |
| release_reason | №0001 |
| release_source_sha | №0001 |
| releaseCommit | №0894 (+ 1 других файлов) |
| required_editor_assets | №0896 |
| requiredAssets | №0740 (+ 6 других файлов) |
| retry_after | №0001 |
| rmsDisplacementMeters | №0907 (+ 1 других файлов) |
| rootCause | №0894 |
| rotation | №0741 (+ 5 других файлов) |
| roughnessFactor | №0900 |
| runtime | №0907 (+ 1 других файлов) |
| runtimeOTARegression | №0894 |
| s | №0740 (+ 7 других файлов) |
| scale | №0075 (+ 10 других файлов) |
| schema | №0075 (+ 4 других файлов) |
| schemaVersion | №0740 (+ 6 других файлов) |
| scripts | №1044 |
| seamDuplicates | №0900 |
| seamMaxMeters | №0907 (+ 1 других файлов) |
| searchable | №0740 (+ 5 других файлов) |
| seconds | №0894 (+ 1 других файлов) |
| selectedTexture | №0740 (+ 8 других файлов) |
| selectedTool | №0740 (+ 8 других файлов) |
| selectedWallTexture | №0740 (+ 8 других файлов) |
| sha256 | №1304 (+ 4 других файлов) |
| shippedSha256 | №0907 (+ 1 других файлов) |
| shoulders | №0900 (+ 2 других файлов) |
| showAbove | №0740 |
| showBelow | №0740 |
| showCeilings | №0740 |
| signedRelease | №0894 |
| skins | №0900 |
| sky | №0741 (+ 4 других файлов) |
| slash | №0744 |
| slashTexture | №0744 |
| source | №0075 (+ 2 других файлов) |
| sourceGlbSha256 | №0907 |
| sourceHashes | №0075 (+ 2 других файлов) |
| sourceProject | №0907 |
| sources | №0907 (+ 1 других файлов) |
| sourceSha256 | №0907 (+ 1 других файлов) |
| sourceStackTerms | №0907 |
| stableVersion | №0894 (+ 1 других файлов) |
| stage | №0909 |
| stairDirection | №0740 (+ 1 других файлов) |
| stairFrom | №0740 (+ 1 других файлов) |
| stairsTo | №0741 (+ 2 других файлов) |
| stairTo | №0740 (+ 1 других файлов) |
| status | №0894 (+ 3 других файлов) |
| steps | №0740 (+ 1 других файлов) |
| sTexture | №0740 (+ 7 других файлов) |
| tags | №0740 (+ 6 других файлов) |
| target | №1044 (+ 1 других файлов) |
| targets | №0075 (+ 4 других файлов) |
| TEXCOORD_0 | №0900 |
| tiles | №0740 (+ 8 других файлов) |
| tokens | №0740 (+ 8 других файлов) |
| topology | №0900 |
| torso-muscle-pectoral-decr | №0075 (+ 1 других файлов) |
| torso-muscle-pectoral-incr | №0075 (+ 1 других файлов) |
| triangles | №0900 |
| type | №0740 (+ 8 других файлов) |
| unchanged | №0907 (+ 1 других файлов) |
| uniquePositions | №0900 |
| url | №1300 (+ 1 других файлов) |
| uvOutsideUnitSquare | №0900 |
| uvRange | №0900 |
| version | №1304 (+ 16 других файлов) |
| versionCode | №0894 (+ 1 других файлов) |
| vertexCount | №0075 (+ 1 других файлов) |
| vertices | №0900 (+ 3 других файлов) |
| view | №0740 (+ 8 других файлов) |
| w | №0740 (+ 8 других файлов) |
| waist | №0900 (+ 2 других файлов) |
| walkable | №0740 (+ 1 других файлов) |
| walls | №0740 (+ 8 других файлов) |
| weight | №0075 (+ 3 других файлов) |
| WEIGHTS_0 | №0900 |
| weightSumMaxError | №0900 |
| weldedBoundaryEdges | №0900 |
| weldedNonManifoldEdges | №0900 |
| weldTolerance | №0900 |
| width | №0740 (+ 8 других файлов) |
| win | №1044 |
| workflows | №0894 (+ 1 других файлов) |
| wTexture | №0740 (+ 7 других файлов) |
| x | №0740 (+ 8 других файлов) |
| y | №0740 (+ 8 других файлов) |
| z | №0740 (+ 8 других файлов) |
| zeroWeightVertices | №0900 |
| zip | №0911 |
| zip_crc_and_all_entry_sha256 | №0896 |
| zip_sha256 | №0896 |
| zipSha256 | №0894 (+ 1 других файлов) |
| zones | №0740 (+ 8 других файлов) |

## Файлы с совпадающим Git SHA

Совпадение содержимого не означает, что путь можно удалить.

- app/assets/3d/user_furniture/bed.glb ; bed.glb
- app/assets/3d/user_furniture/bookshelf.glb ; bookshelf.glb
- app/assets/3d/user_furniture/chair.glb ; chair.glb
- app/assets/3d/user_furniture/closet.glb ; closet.glb
- app/assets/3d/user_furniture/commode.glb ; commode.glb
- app/assets/3d/user_furniture/human-base-rigged.glb ; human-base-rigged.glb
- app/assets/3d/user_furniture/table.glb ; table.glb
- app/assets/dice/dice10-1.png ; app/assets/dice/dice10.png
- app/assets/ui/update_scene_forest_burned.svg ; wallpapers/32.svg
- app/assets/ui/update_scene_forest_green.svg ; wallpapers/31.svg

## Обновление индекса

После изменения проекта выполнить node tools/generate_project_atlas.cjs и коммитить обе версии.

