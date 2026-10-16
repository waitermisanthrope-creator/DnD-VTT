# DnD-VTT — полный атлас проекта

Снимок кода c34f025bfbc3. Git содержит 1327 файлов.
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
| №0001 .github/workflows/android-debug.yml | 4175 B | автоматизация GitHub Actions: android debug |
| №0002 .github/workflows/android-release.yml | 8160 B | автоматизация GitHub Actions: android release |
| №0003 .github/workflows/build-windows-desktop.yml | 1449 B | автоматизация GitHub Actions: build windows desktop |
| №0004 .github/workflows/cloud-test-build.yml | 3468 B | автоматизация GitHub Actions: cloud test build |
| №0005 .github/workflows/convert-remaining-furniture.yml | 1964 B | автоматизация GitHub Actions: convert remaining furniture |
| №0006 .github/workflows/deploy-pages.yml | 3633 B | автоматизация GitHub Actions: deploy pages |
| №0007 .github/workflows/human-glb-audit.yml | 931 B | автоматизация GitHub Actions: human glb audit |
| №0008 .github/workflows/import-root-furniture.yml | 3572 B | автоматизация GitHub Actions: import root furniture |
| №0009 .github/workflows/map-ui-stage-qa.yml | 776 B | автоматизация GitHub Actions: map ui stage qa |
| №0010 .github/workflows/project-atlas.yml | 953 B | автоматическое обновление атласа на GitHub |
| №0011 .github/workflows/publish-stress-map-ota.yml | 455 B | автоматизация GitHub Actions: publish stress map ota |
| №0012 .github/workflows/refresh-update-manifest.yml | 540 B | автоматизация GitHub Actions: refresh update manifest |
| №0013 .github/workflows/test-gltf-loader.yml | 717 B | автоматизация GitHub Actions: test gltf loader |
| №0014 .github/workflows/test-stair-navigation.yml | 752 B | автоматизация GitHub Actions: test stair navigation |
| №0015 .github/workflows/unified-release.yml | 12255 B | автоматизация GitHub Actions: unified release |
| №0016 .github/workflows/unpack-project.yml | 2987 B | автоматизация GitHub Actions: unpack project |
| №0017 .github/workflows/validate-imported-glb.yml | 2317 B | автоматизация GitHub Actions: validate imported glb |
| №0018 .gitignore | 81 B | вспомогательный файл: .gitignore |
| №0019 00_AI_PROJECT_GUIDE.md | 1108331 B | существующее руководство ИИ, не перезаписывать |
| №0020 01_plansforproject.md | 61472 B | план целей и критериев выполнения |
| №0021 1790622696215.png | 1202179 B | текстура/изображение: 1790622696215 |
| №0022 1790622844831.png | 104000 B | текстура/изображение: 1790622844831 |
| №0023 1790718758545.png | 1889164 B | текстура/изображение: 1790718758545 |
| №0024 1790788500741.png | 1468216 B | текстура/изображение: 1790788500741 |
| №0025 3D_CHARACTER_CLOTHING_PROGRESS.md | 84856 B | документация или отчёт: 3D CHARACTER CLOTHING PROGRESS |
| №0026 3D_CHARACTER_RACES_PROGRESS.md | 75599 B | документация или отчёт: 3D CHARACTER RACES PROGRESS |
| №0027 AGENTS.md | 3677 B | документация или отчёт: AGENTS |
| №0028 android/.gitignore | 44 B | Android компонент: .gitignore |
| №0029 android/app/build.gradle | 4122 B | Android компонент: build |
| №0030 android/app/src/main/AndroidManifest.xml | 12250 B | Android компонент: AndroidManifest |
| №0031 android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java | 34871 B | Android: bridge обновлений |
| №0032 android/app/src/main/java/com/dndvtt/app/MainActivity.java | 7574 B | Android: запуск WebView |
| №0033 android/app/src/main/res/values-v31/styles.xml | 527 B | Android компонент: styles |
| №0034 android/app/src/main/res/values/styles.xml | 407 B | Android компонент: styles |
| №0035 android/build.gradle | 73 B | Android компонент: build |
| №0036 android/gradle.properties | 106 B | Android компонент: gradle |
| №0037 android/README.md | 685 B | документация или отчёт: README |
| №0038 android/settings.gradle | 333 B | Android компонент: settings |
| №0039 app/3dmap/assets/clothing/fantasy-materials.webp | 434234 B | компонент 3D карты/редактора: fantasy materials |
| №0040 app/3dmap/assets/clothing/lingerie-nylon.webp | 289830 B | компонент 3D карты/редактора: lingerie nylon |
| №0041 app/3dmap/character_anatomy_geometry.js | 22797 B | компонент 3D карты/редактора: character anatomy geometry |
| №0042 app/3dmap/character_anatomy.js | 8424 B | компонент 3D карты/редактора: character anatomy |
| №0043 app/3dmap/character_appearance_store.js | 2619 B | компонент 3D карты/редактора: character appearance store |
| №0044 app/3dmap/character_body_geometry.js | 120619 B | компонент 3D карты/редактора: character body geometry |
| №0045 app/3dmap/character_clothing.js | 51618 B | компонент 3D карты/редактора: character clothing |
| №0046 app/3dmap/character_editor_3d.js | 166537 B | компонент 3D карты/редактора: character editor 3d |
| №0047 app/3dmap/character_morph_assets.js | 3322 B | компонент 3D карты/редактора: character morph assets |
| №0048 app/3dmap/character_pose.js | 4749 B | компонент 3D карты/редактора: character pose |
| №0049 app/3dmap/character_system.js | 49923 B | компонент 3D карты/редактора: character system |
| №0050 app/3dmap/gltf_catalog.js | 90502 B | компонент 3D карты/редактора: gltf catalog |
| №0051 app/3dmap/gltf_character_pipeline.js | 7811 B | компонент 3D карты/редактора: gltf character pipeline |
| №0052 app/3dmap/gltf_loader.js | 10027 B | компонент 3D карты/редактора: gltf loader |
| №0053 app/3dmap/map_editor.js | 45829 B | компонент 3D карты/редактора: map editor |
| №0054 app/3dmap/map_model.js | 7783 B | компонент 3D карты/редактора: map model |
| №0055 app/3dmap/map_renderer_2d.js | 7331 B | компонент 3D карты/редактора: map renderer 2d |
| №0056 app/3dmap/map_renderer_3d.js | 23969 B | компонент 3D карты/редактора: map renderer 3d |
| №0057 app/3dmap/map_world.js | 9119 B | компонент 3D карты/редактора: map world |
| №0058 app/3dmap/stair_navigation.js | 932 B | компонент 3D карты/редактора: stair navigation |
| №0059 app/3dmap/stress_map.js | 3272 B | компонент 3D карты/редактора: stress map |
| №0060 app/accursed_oap_v11_runtime.js | 31365 B | логический модуль: accursed oap v11 runtime |
| №0061 app/alchemist_mhp_2024_runtime.js | 140155 B | логический модуль: alchemist mhp 2024 runtime |
| №0062 app/alchemy_engine_v29.js | 40901 B | логический модуль: alchemy engine v29 |
| №0063 app/alchemy_gameplay_v30.js | 17859 B | логический модуль: alchemy gameplay v30 |
| №0064 app/alchemy_gathering_professions_v52.js | 11833 B | логический модуль: alchemy gathering professions v52 |
| №0065 app/Ambiences.js | 14648 B | логический модуль: Ambiences |
| №0066 app/app.js | 37183 B | главный контроллер; currentChar и все персонажи |
| №0067 app/armors.js | 27349 B | логический модуль: armors |
| №0068 app/assets/3d/makehuman/editor-morphs.bin | 2340320 B | ассет графики/3D/интерфейса: editor morphs |
| №0069 app/assets/3d/makehuman/editor-morphs.json | 11573 B | ассет графики/3D/интерфейса: editor morphs |
| №0070 app/assets/3d/makehuman/human-body-morphs.glb | 12671780 B | ассет графики/3D/интерфейса: human body morphs |
| №0071 app/assets/3d/makehuman/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №0072 app/assets/3d/makehuman/materials/skin_color_detail_v1.png | 2922380 B | ассет графики/3D/интерфейса: skin color detail v1 |
| №0073 app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png | 22965 B | ассет графики/3D/интерфейса: skin micro normal roughness |
| №0074 app/assets/3d/makehuman/README.md | 1510 B | документация или отчёт: README |
| №0075 app/assets/3d/makehuman/skins/young_caucasian_female/young_caucasian_female.mhmat | 1464 B | ассет графики/3D/интерфейса: young caucasian female |
| №0076 app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png | 4391156 B | ассет графики/3D/интерфейса: young lightskinned female diffuse |
| №0077 app/assets/3d/makehuman/skins/young_caucasian_male/young_caucasian_male.mhmat | 1462 B | ассет графики/3D/интерфейса: young caucasian male |
| №0078 app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png | 3693828 B | ассет графики/3D/интерфейса: young lightskinned male diffuse |
| №0079 app/assets/3d/quaternius/models/Anvil_Log.bin | 130880 B | ассет графики/3D/интерфейса: Anvil Log |
| №0080 app/assets/3d/quaternius/models/Anvil_Log.gltf | 5580 B | ассет графики/3D/интерфейса: Anvil Log |
| №0081 app/assets/3d/quaternius/models/Anvil.bin | 24020 B | ассет графики/3D/интерфейса: Anvil |
| №0082 app/assets/3d/quaternius/models/Anvil.gltf | 3189 B | ассет графики/3D/интерфейса: Anvil |
| №0083 app/assets/3d/quaternius/models/Axe_Bronze.bin | 31156 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0084 app/assets/3d/quaternius/models/Axe_Bronze.gltf | 2591 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0085 app/assets/3d/quaternius/models/Bag.bin | 27188 B | ассет графики/3D/интерфейса: Bag |
| №0086 app/assets/3d/quaternius/models/Bag.gltf | 4318 B | ассет графики/3D/интерфейса: Bag |
| №0087 app/assets/3d/quaternius/models/Banner_1_Cloth.bin | 6636 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0088 app/assets/3d/quaternius/models/Banner_1_Cloth.gltf | 4670 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0089 app/assets/3d/quaternius/models/Banner_1.bin | 20976 B | ассет графики/3D/интерфейса: Banner 1 |
| №0090 app/assets/3d/quaternius/models/Banner_1.gltf | 6789 B | ассет графики/3D/интерфейса: Banner 1 |
| №0091 app/assets/3d/quaternius/models/Banner_2_Cloth.bin | 4940 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0092 app/assets/3d/quaternius/models/Banner_2_Cloth.gltf | 4671 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0093 app/assets/3d/quaternius/models/Banner_2.bin | 19280 B | ассет графики/3D/интерфейса: Banner 2 |
| №0094 app/assets/3d/quaternius/models/Banner_2.gltf | 6788 B | ассет графики/3D/интерфейса: Banner 2 |
| №0095 app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0096 app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6241 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0097 app/assets/3d/quaternius/models/Barrel_Holder.bin | 161816 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0098 app/assets/3d/quaternius/models/Barrel_Holder.gltf | 4347 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0099 app/assets/3d/quaternius/models/Barrel.bin | 57144 B | ассет графики/3D/интерфейса: Barrel |
| №0100 app/assets/3d/quaternius/models/Barrel.gltf | 4311 B | ассет графики/3D/интерфейса: Barrel |
| №0101 app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0102 app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0103 app/assets/3d/quaternius/models/Bed_Twin2.bin | 76624 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0104 app/assets/3d/quaternius/models/Bed_Twin2.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0105 app/assets/3d/quaternius/models/Bench.bin | 19304 B | ассет графики/3D/интерфейса: Bench |
| №0106 app/assets/3d/quaternius/models/Bench.gltf | 4298 B | ассет графики/3D/интерфейса: Bench |
| №0107 app/assets/3d/quaternius/models/Book_5.bin | 5856 B | ассет графики/3D/интерфейса: Book 5 |
| №0108 app/assets/3d/quaternius/models/Book_5.gltf | 2403 B | ассет графики/3D/интерфейса: Book 5 |
| №0109 app/assets/3d/quaternius/models/Book_7.bin | 32664 B | ассет графики/3D/интерфейса: Book 7 |
| №0110 app/assets/3d/quaternius/models/Book_7.gltf | 4290 B | ассет графики/3D/интерфейса: Book 7 |
| №0111 app/assets/3d/quaternius/models/Book_Simplified_Single.bin | 3192 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0112 app/assets/3d/quaternius/models/Book_Simplified_Single.gltf | 2428 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0113 app/assets/3d/quaternius/models/Book_Stack_1.bin | 12768 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0114 app/assets/3d/quaternius/models/Book_Stack_1.gltf | 2418 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0115 app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0116 app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4309 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0117 app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0118 app/assets/3d/quaternius/models/Bookcase_2.gltf | 4329 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0119 app/assets/3d/quaternius/models/BookGroup_Medium_1.bin | 25536 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0120 app/assets/3d/quaternius/models/BookGroup_Medium_1.gltf | 2429 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0121 app/assets/3d/quaternius/models/BookGroup_Medium_2.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0122 app/assets/3d/quaternius/models/BookGroup_Medium_2.gltf | 2431 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0123 app/assets/3d/quaternius/models/BookGroup_Medium_3.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0124 app/assets/3d/quaternius/models/BookGroup_Medium_3.gltf | 2432 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0125 app/assets/3d/quaternius/models/BookGroup_Small_1.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0126 app/assets/3d/quaternius/models/BookGroup_Small_1.gltf | 2423 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0127 app/assets/3d/quaternius/models/BookGroup_Small_2.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0128 app/assets/3d/quaternius/models/BookGroup_Small_2.gltf | 2426 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0129 app/assets/3d/quaternius/models/BookGroup_Small_3.bin | 7980 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0130 app/assets/3d/quaternius/models/BookGroup_Small_3.gltf | 2424 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0131 app/assets/3d/quaternius/models/BookStand.bin | 62020 B | ассет графики/3D/интерфейса: BookStand |
| №0132 app/assets/3d/quaternius/models/BookStand.gltf | 2223 B | ассет графики/3D/интерфейса: BookStand |
| №0133 app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0134 app/assets/3d/quaternius/models/Bottle_1.gltf | 2413 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0135 app/assets/3d/quaternius/models/Bucket_Metal.bin | 18824 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0136 app/assets/3d/quaternius/models/Bucket_Metal.gltf | 2206 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0137 app/assets/3d/quaternius/models/Bucket_Wooden_1.bin | 32544 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0138 app/assets/3d/quaternius/models/Bucket_Wooden_1.gltf | 3911 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0139 app/assets/3d/quaternius/models/Cabinet.bin | 114768 B | ассет графики/3D/интерфейса: Cabinet |
| №0140 app/assets/3d/quaternius/models/Cabinet.gltf | 4324 B | ассет графики/3D/интерфейса: Cabinet |
| №0141 app/assets/3d/quaternius/models/Cage_Small.bin | 171848 B | ассет графики/3D/интерфейса: Cage Small |
| №0142 app/assets/3d/quaternius/models/Cage_Small.gltf | 2207 B | ассет графики/3D/интерфейса: Cage Small |
| №0143 app/assets/3d/quaternius/models/Candle_1.bin | 6200 B | ассет графики/3D/интерфейса: Candle 1 |
| №0144 app/assets/3d/quaternius/models/Candle_1.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 1 |
| №0145 app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | ассет графики/3D/интерфейса: Candle 2 |
| №0146 app/assets/3d/quaternius/models/Candle_2.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 2 |
| №0147 app/assets/3d/quaternius/models/CandleStick_Stand.bin | 226228 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0148 app/assets/3d/quaternius/models/CandleStick_Stand.gltf | 4347 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0149 app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0150 app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 3900 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0151 app/assets/3d/quaternius/models/CandleStick.bin | 21436 B | ассет графики/3D/интерфейса: CandleStick |
| №0152 app/assets/3d/quaternius/models/CandleStick.gltf | 2199 B | ассет графики/3D/интерфейса: CandleStick |
| №0153 app/assets/3d/quaternius/models/Carrot.bin | 22244 B | ассет графики/3D/интерфейса: Carrot |
| №0154 app/assets/3d/quaternius/models/Carrot.gltf | 2411 B | ассет графики/3D/интерфейса: Carrot |
| №0155 app/assets/3d/quaternius/models/Cauldron.bin | 62712 B | ассет графики/3D/интерфейса: Cauldron |
| №0156 app/assets/3d/quaternius/models/Cauldron.gltf | 2195 B | ассет графики/3D/интерфейса: Cauldron |
| №0157 app/assets/3d/quaternius/models/Chain_Coil.bin | 193664 B | ассет графики/3D/интерфейса: Chain Coil |
| №0158 app/assets/3d/quaternius/models/Chain_Coil.gltf | 2424 B | ассет графики/3D/интерфейса: Chain Coil |
| №0159 app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | ассет графики/3D/интерфейса: Chair 1 |
| №0160 app/assets/3d/quaternius/models/Chair_1.gltf | 4312 B | ассет графики/3D/интерфейса: Chair 1 |
| №0161 app/assets/3d/quaternius/models/Chalice.bin | 15644 B | ассет графики/3D/интерфейса: Chalice |
| №0162 app/assets/3d/quaternius/models/Chalice.gltf | 2197 B | ассет графики/3D/интерфейса: Chalice |
| №0163 app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | ассет графики/3D/интерфейса: Chandelier |
| №0164 app/assets/3d/quaternius/models/Chandelier.gltf | 6259 B | ассет графики/3D/интерфейса: Chandelier |
| №0165 app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | ассет графики/3D/интерфейса: Chest Wood |
| №0166 app/assets/3d/quaternius/models/Chest_Wood.gltf | 21402 B | ассет графики/3D/интерфейса: Chest Wood |
| №0167 app/assets/3d/quaternius/models/Coin_Pile_2.bin | 52612 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0168 app/assets/3d/quaternius/models/Coin_Pile_2.gltf | 2429 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0169 app/assets/3d/quaternius/models/Coin_Pile.bin | 47520 B | ассет графики/3D/интерфейса: Coin Pile |
| №0170 app/assets/3d/quaternius/models/Coin_Pile.gltf | 2424 B | ассет графики/3D/интерфейса: Coin Pile |
| №0171 app/assets/3d/quaternius/models/Coin.bin | 14464 B | ассет графики/3D/интерфейса: Coin |
| №0172 app/assets/3d/quaternius/models/Coin.gltf | 2408 B | ассет графики/3D/интерфейса: Coin |
| №0173 app/assets/3d/quaternius/models/Crate_Metal.bin | 126828 B | ассет графики/3D/интерфейса: Crate Metal |
| №0174 app/assets/3d/quaternius/models/Crate_Metal.gltf | 4335 B | ассет графики/3D/интерфейса: Crate Metal |
| №0175 app/assets/3d/quaternius/models/Crate_Wooden.bin | 66496 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0176 app/assets/3d/quaternius/models/Crate_Wooden.gltf | 4412 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0177 app/assets/3d/quaternius/models/Dummy.bin | 80988 B | ассет графики/3D/интерфейса: Dummy |
| №0178 app/assets/3d/quaternius/models/Dummy.gltf | 5570 B | ассет графики/3D/интерфейса: Dummy |
| №0179 app/assets/3d/quaternius/models/FarmCrate_Apple.bin | 134488 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0180 app/assets/3d/quaternius/models/FarmCrate_Apple.gltf | 6263 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0181 app/assets/3d/quaternius/models/FarmCrate_Carrot.bin | 204292 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0182 app/assets/3d/quaternius/models/FarmCrate_Carrot.gltf | 6273 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0183 app/assets/3d/quaternius/models/FarmCrate_Empty.bin | 54704 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0184 app/assets/3d/quaternius/models/FarmCrate_Empty.gltf | 3915 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0185 app/assets/3d/quaternius/models/Key_Gold.bin | 58636 B | ассет графики/3D/интерфейса: Key Gold |
| №0186 app/assets/3d/quaternius/models/Key_Gold.gltf | 2424 B | ассет графики/3D/интерфейса: Key Gold |
| №0187 app/assets/3d/quaternius/models/Key_Metal.bin | 19340 B | ассет графики/3D/интерфейса: Key Metal |
| №0188 app/assets/3d/quaternius/models/Key_Metal.gltf | 2197 B | ассет графики/3D/интерфейса: Key Metal |
| №0189 app/assets/3d/quaternius/models/Lantern_Wall.bin | 120036 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0190 app/assets/3d/quaternius/models/Lantern_Wall.gltf | 2203 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0191 app/assets/3d/quaternius/models/Mug.bin | 12488 B | ассет графики/3D/интерфейса: Mug |
| №0192 app/assets/3d/quaternius/models/Mug.gltf | 3881 B | ассет графики/3D/интерфейса: Mug |
| №0193 app/assets/3d/quaternius/models/Nightstand_Shelf.bin | 21412 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0194 app/assets/3d/quaternius/models/Nightstand_Shelf.gltf | 2447 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0195 app/assets/3d/quaternius/models/Peg_Rack.bin | 26672 B | ассет графики/3D/интерфейса: Peg Rack |
| №0196 app/assets/3d/quaternius/models/Peg_Rack.gltf | 3879 B | ассет графики/3D/интерфейса: Peg Rack |
| №0197 app/assets/3d/quaternius/models/Pickaxe_Bronze.bin | 30736 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0198 app/assets/3d/quaternius/models/Pickaxe_Bronze.gltf | 2425 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0199 app/assets/3d/quaternius/models/Pot_1_Lid.bin | 46120 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0200 app/assets/3d/quaternius/models/Pot_1_Lid.gltf | 2196 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0201 app/assets/3d/quaternius/models/Pot_1.bin | 37160 B | ассет графики/3D/интерфейса: Pot 1 |
| №0202 app/assets/3d/quaternius/models/Pot_1.gltf | 2185 B | ассет графики/3D/интерфейса: Pot 1 |
| №0203 app/assets/3d/quaternius/models/Potion_1.bin | 18200 B | ассет графики/3D/интерфейса: Potion 1 |
| №0204 app/assets/3d/quaternius/models/Potion_1.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 1 |
| №0205 app/assets/3d/quaternius/models/Potion_2.bin | 19672 B | ассет графики/3D/интерфейса: Potion 2 |
| №0206 app/assets/3d/quaternius/models/Potion_2.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 2 |
| №0207 app/assets/3d/quaternius/models/Potion_4.bin | 22536 B | ассет графики/3D/интерфейса: Potion 4 |
| №0208 app/assets/3d/quaternius/models/Potion_4.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 4 |
| №0209 app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | ассет графики/3D/интерфейса: Pouch Large |
| №0210 app/assets/3d/quaternius/models/Pouch_Large.gltf | 4306 B | ассет графики/3D/интерфейса: Pouch Large |
| №0211 app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | ассет графики/3D/интерфейса: Rope 1 |
| №0212 app/assets/3d/quaternius/models/Rope_1.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 1 |
| №0213 app/assets/3d/quaternius/models/Rope_2.bin | 34904 B | ассет графики/3D/интерфейса: Rope 2 |
| №0214 app/assets/3d/quaternius/models/Rope_2.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 2 |
| №0215 app/assets/3d/quaternius/models/Rope_3.bin | 41624 B | ассет графики/3D/интерфейса: Rope 3 |
| №0216 app/assets/3d/quaternius/models/Rope_3.gltf | 2225 B | ассет графики/3D/интерфейса: Rope 3 |
| №0217 app/assets/3d/quaternius/models/Scroll_1.bin | 20112 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0218 app/assets/3d/quaternius/models/Scroll_1.gltf | 3954 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0219 app/assets/3d/quaternius/models/Scroll_2.bin | 28392 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0220 app/assets/3d/quaternius/models/Scroll_2.gltf | 3968 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0221 app/assets/3d/quaternius/models/Shelf_Arch.bin | 64836 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0222 app/assets/3d/quaternius/models/Shelf_Arch.gltf | 4332 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0223 app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0224 app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2224 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0225 app/assets/3d/quaternius/models/Shelf_Small_Bottles.bin | 229484 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0226 app/assets/3d/quaternius/models/Shelf_Small_Bottles.gltf | 6266 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0227 app/assets/3d/quaternius/models/Shield_Wooden.bin | 64184 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0228 app/assets/3d/quaternius/models/Shield_Wooden.gltf | 6243 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0229 app/assets/3d/quaternius/models/SmallBottle.bin | 5700 B | ассет графики/3D/интерфейса: SmallBottle |
| №0230 app/assets/3d/quaternius/models/SmallBottle.gltf | 2392 B | ассет графики/3D/интерфейса: SmallBottle |
| №0231 app/assets/3d/quaternius/models/SmallBottles_1.bin | 20556 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0232 app/assets/3d/quaternius/models/SmallBottles_1.gltf | 2423 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0233 app/assets/3d/quaternius/models/Stall_Cart_Empty.bin | 237264 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0234 app/assets/3d/quaternius/models/Stall_Cart_Empty.gltf | 6857 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0235 app/assets/3d/quaternius/models/Stall_Empty.bin | 88176 B | ассет графики/3D/интерфейса: Stall Empty |
| №0236 app/assets/3d/quaternius/models/Stall_Empty.gltf | 6804 B | ассет графики/3D/интерфейса: Stall Empty |
| №0237 app/assets/3d/quaternius/models/Stool.bin | 11472 B | ассет графики/3D/интерфейса: Stool |
| №0238 app/assets/3d/quaternius/models/Stool.gltf | 2423 B | ассет графики/3D/интерфейса: Stool |
| №0239 app/assets/3d/quaternius/models/Sword_Bronze.bin | 69920 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0240 app/assets/3d/quaternius/models/Sword_Bronze.gltf | 2436 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0241 app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | ассет графики/3D/интерфейса: Table Fork |
| №0242 app/assets/3d/quaternius/models/Table_Fork.gltf | 2189 B | ассет графики/3D/интерфейса: Table Fork |
| №0243 app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | ассет графики/3D/интерфейса: Table Knife |
| №0244 app/assets/3d/quaternius/models/Table_Knife.gltf | 2186 B | ассет графики/3D/интерфейса: Table Knife |
| №0245 app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | ассет графики/3D/интерфейса: Table Large |
| №0246 app/assets/3d/quaternius/models/Table_Large.gltf | 4316 B | ассет графики/3D/интерфейса: Table Large |
| №0247 app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | ассет графики/3D/интерфейса: Table Plate |
| №0248 app/assets/3d/quaternius/models/Table_Plate.gltf | 2199 B | ассет графики/3D/интерфейса: Table Plate |
| №0249 app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | ассет графики/3D/интерфейса: Table Spoon |
| №0250 app/assets/3d/quaternius/models/Table_Spoon.gltf | 2191 B | ассет графики/3D/интерфейса: Table Spoon |
| №0251 app/assets/3d/quaternius/models/Torch_Metal.bin | 39100 B | ассет графики/3D/интерфейса: Torch Metal |
| №0252 app/assets/3d/quaternius/models/Torch_Metal.gltf | 2203 B | ассет графики/3D/интерфейса: Torch Metal |
| №0253 app/assets/3d/quaternius/models/Vase_2.bin | 21188 B | ассет графики/3D/интерфейса: Vase 2 |
| №0254 app/assets/3d/quaternius/models/Vase_2.gltf | 2407 B | ассет графики/3D/интерфейса: Vase 2 |
| №0255 app/assets/3d/quaternius/models/Vase_4.bin | 22028 B | ассет графики/3D/интерфейса: Vase 4 |
| №0256 app/assets/3d/quaternius/models/Vase_4.gltf | 2412 B | ассет графики/3D/интерфейса: Vase 4 |
| №0257 app/assets/3d/quaternius/models/Vase_Rubble_Medium.bin | 85960 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0258 app/assets/3d/quaternius/models/Vase_Rubble_Medium.gltf | 2453 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0259 app/assets/3d/quaternius/models/WeaponStand.bin | 76312 B | ассет графики/3D/интерфейса: WeaponStand |
| №0260 app/assets/3d/quaternius/models/WeaponStand.gltf | 3903 B | ассет графики/3D/интерфейса: WeaponStand |
| №0261 app/assets/3d/quaternius/models/Whetstone.bin | 59280 B | ассет графики/3D/интерфейса: Whetstone |
| №0262 app/assets/3d/quaternius/models/Whetstone.gltf | 6212 B | ассет графики/3D/интерфейса: Whetstone |
| №0263 app/assets/3d/quaternius/models/Workbench_Drawers.bin | 16824 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0264 app/assets/3d/quaternius/models/Workbench_Drawers.gltf | 4313 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0265 app/assets/3d/quaternius/models/Workbench.bin | 63408 B | ассет графики/3D/интерфейса: Workbench |
| №0266 app/assets/3d/quaternius/models/Workbench.gltf | 4318 B | ассет графики/3D/интерфейса: Workbench |
| №0267 app/assets/3d/quaternius/textures/T_Page_Noise.png | 7486734 B | ассет графики/3D/интерфейса: T Page Noise |
| №0268 app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png | 1936754 B | ассет графики/3D/интерфейса: T Trim Cloth BaseColor |
| №0269 app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png | 3920858 B | ассет графики/3D/интерфейса: T Trim Cloth Normal |
| №0270 app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png | 623426 B | ассет графики/3D/интерфейса: T Trim Cloth ORM |
| №0271 app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png | 2232961 B | ассет графики/3D/интерфейса: T Trim Furniture BaseColor |
| №0272 app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png | 3485710 B | ассет графики/3D/интерфейса: T Trim Furniture Normal |
| №0273 app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png | 2064585 B | ассет графики/3D/интерфейса: T Trim Furniture ORM |
| №0274 app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png | 1361221 B | ассет графики/3D/интерфейса: T Trim Metal BaseColor |
| №0275 app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png | 3625541 B | ассет графики/3D/интерфейса: T Trim Metal Normal |
| №0276 app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png | 1871475 B | ассет графики/3D/интерфейса: T Trim Metal ORM |
| №0277 app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png | 2263132 B | ассет графики/3D/интерфейса: T Trim Props BaseColor |
| №0278 app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png | 4441458 B | ассет графики/3D/интерфейса: T Trim Props Normal |
| №0279 app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png | 3017151 B | ассет графики/3D/интерфейса: T Trim Props ORM |
| №0280 app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp | 510226 B | ассет графики/3D/интерфейса: bird contour feathers v1 |
| №0281 app/assets/3d/race_surfaces/flight-feather-vane-v1.webp | 555662 B | ассет графики/3D/интерфейса: flight feather vane v1 |
| №0282 app/assets/3d/race_surfaces/mammal-underfur-v1.webp | 544064 B | ассет графики/3D/интерфейса: mammal underfur v1 |
| №0283 app/assets/3d/race_surfaces/reptile-scales-v1.webp | 730360 B | ассет графики/3D/интерфейса: reptile scales v1 |
| №0284 app/assets/3d/user_furniture/altar_table.glb | 36228 B | ассет графики/3D/интерфейса: altar table |
| №0285 app/assets/3d/user_furniture/apothecary_jar_shelf.glb | 106668 B | ассет графики/3D/интерфейса: apothecary jar shelf |
| №0286 app/assets/3d/user_furniture/apothecary_shelf.glb | 107148 B | ассет графики/3D/интерфейса: apothecary shelf |
| №0287 app/assets/3d/user_furniture/armour_stand.glb | 16340 B | ассет графики/3D/интерфейса: armour stand |
| №0288 app/assets/3d/user_furniture/banner_pole.glb | 17136 B | ассет графики/3D/интерфейса: banner pole |
| №0289 app/assets/3d/user_furniture/bed.glb | 5718760 B | ассет графики/3D/интерфейса: bed |
| №0290 app/assets/3d/user_furniture/book_chest.glb | 45816 B | ассет графики/3D/интерфейса: book chest |
| №0291 app/assets/3d/user_furniture/book_press.glb | 59492 B | ассет графики/3D/интерфейса: book press |
| №0292 app/assets/3d/user_furniture/bookshelf.glb | 7818348 B | ассет графики/3D/интерфейса: bookshelf |
| №0293 app/assets/3d/user_furniture/bread_oven.glb | 45200 B | ассет графики/3D/интерфейса: bread oven |
| №0294 app/assets/3d/user_furniture/brewhouse_tun.glb | 68616 B | ассет графики/3D/интерфейса: brewhouse tun |
| №0295 app/assets/3d/user_furniture/candle_stand.glb | 21372 B | ассет графики/3D/интерфейса: candle stand |
| №0296 app/assets/3d/user_furniture/chained_library_desk.glb | 190612 B | ассет графики/3D/интерфейса: chained library desk |
| №0297 app/assets/3d/user_furniture/chair.glb | 4643004 B | ассет графики/3D/интерфейса: chair |
| №0298 app/assets/3d/user_furniture/closet.glb | 6550260 B | ассет графики/3D/интерфейса: closet |
| №0299 app/assets/3d/user_furniture/commode.glb | 4845868 B | ассет графики/3D/интерфейса: commode |
| №0300 app/assets/3d/user_furniture/cooking_cauldron.glb | 34300 B | ассет графики/3D/интерфейса: cooking cauldron |
| №0301 app/assets/3d/user_furniture/crate_stack.glb | 39644 B | ассет графики/3D/интерфейса: crate stack |
| №0302 app/assets/3d/user_furniture/dormitory_cot.glb | 70976 B | ассет графики/3D/интерфейса: dormitory cot |
| №0303 app/assets/3d/user_furniture/finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: finished codex |
| №0304 app/assets/3d/user_furniture/gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: gold leaf cushion |
| №0305 app/assets/3d/user_furniture/hand_cart.glb | 75012 B | ассет графики/3D/интерфейса: hand cart |
| №0306 app/assets/3d/user_furniture/hanging_oil_lamp.glb | 50924 B | ассет графики/3D/интерфейса: hanging oil lamp |
| №0307 app/assets/3d/user_furniture/hitching_post.glb | 22232 B | ассет графики/3D/интерфейса: hitching post |
| №0308 app/assets/3d/user_furniture/human-base-rigged.glb | 4994640 B | ассет графики/3D/интерфейса: human base rigged |
| №0309 app/assets/3d/user_furniture/infirmary_cot.glb | 71696 B | ассет графики/3D/интерфейса: infirmary cot |
| №0310 app/assets/3d/user_furniture/kitchen_hearth.glb | 38460 B | ассет графики/3D/интерфейса: kitchen hearth |
| №0311 app/assets/3d/user_furniture/lamp_post.glb | 16960 B | ассет графики/3D/интерфейса: lamp post |
| №0312 app/assets/3d/user_furniture/loom.glb | 46728 B | ассет графики/3D/интерфейса: loom |
| №0313 app/assets/3d/user_furniture/manuscript_in_progress.glb | 153128 B | ассет графики/3D/интерфейса: manuscript in progress |
| №0314 app/assets/3d/user_furniture/monastery_altar_table.glb | 36248 B | ассет графики/3D/интерфейса: monastery altar table |
| №0315 app/assets/3d/user_furniture/monastery_apothecary_jar_shelf.glb | 106620 B | ассет графики/3D/интерфейса: monastery apothecary jar shelf |
| №0316 app/assets/3d/user_furniture/monastery_bell_tower_section.glb | 456868 B | ассет графики/3D/интерфейса: monastery bell tower section |
| №0317 app/assets/3d/user_furniture/monastery_book_chest.glb | 45320 B | ассет графики/3D/интерфейса: monastery book chest |
| №0318 app/assets/3d/user_furniture/monastery_book_press.glb | 59492 B | ассет графики/3D/интерфейса: monastery book press |
| №0319 app/assets/3d/user_furniture/monastery_bread_oven.glb | 45296 B | ассет графики/3D/интерфейса: monastery bread oven |
| №0320 app/assets/3d/user_furniture/monastery_brewhouse_tun.glb | 68216 B | ассет графики/3D/интерфейса: monastery brewhouse tun |
| №0321 app/assets/3d/user_furniture/monastery_candle_stand.glb | 21376 B | ассет графики/3D/интерфейса: monastery candle stand |
| №0322 app/assets/3d/user_furniture/monastery_censer.glb | 49336 B | ассет графики/3D/интерфейса: monastery censer |
| №0323 app/assets/3d/user_furniture/monastery_chained_library_desk.glb | 148408 B | ассет графики/3D/интерфейса: monastery chained library desk |
| №0324 app/assets/3d/user_furniture/monastery_chapel_screen.glb | 333728 B | ассет графики/3D/интерфейса: monastery chapel screen |
| №0325 app/assets/3d/user_furniture/monastery_chapter_house_bay.glb | 151904 B | ассет графики/3D/интерфейса: monastery chapter house bay |
| №0326 app/assets/3d/user_furniture/monastery_cloister_arcade_bay.glb | 130972 B | ассет графики/3D/интерфейса: monastery cloister arcade bay |
| №0327 app/assets/3d/user_furniture/monastery_cloister_arcade_corner.glb | 73924 B | ассет графики/3D/интерфейса: monastery cloister arcade corner |
| №0328 app/assets/3d/user_furniture/monastery_cloister_garth_lawn.glb | 13732 B | ассет графики/3D/интерфейса: monastery cloister garth lawn |
| №0329 app/assets/3d/user_furniture/monastery_cloister_lean_to_roof.glb | 18724 B | ассет графики/3D/интерфейса: monastery cloister lean to roof |
| №0330 app/assets/3d/user_furniture/monastery_cloister_vault_section.glb | 73928 B | ассет графики/3D/интерфейса: monastery cloister vault section |
| №0331 app/assets/3d/user_furniture/monastery_cloister_well.glb | 41568 B | ассет графики/3D/интерфейса: monastery cloister well |
| №0332 app/assets/3d/user_furniture/monastery_compost_bay.glb | 55596 B | ассет графики/3D/интерфейса: monastery compost bay |
| №0333 app/assets/3d/user_furniture/monastery_cooking_cauldron.glb | 33800 B | ассет графики/3D/интерфейса: monastery cooking cauldron |
| №0334 app/assets/3d/user_furniture/monastery_dormitory_cot.glb | 54832 B | ассет графики/3D/интерфейса: monastery dormitory cot |
| №0335 app/assets/3d/user_furniture/monastery_finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: monastery finished codex |
| №0336 app/assets/3d/user_furniture/monastery_flagstone_floor_slab.glb | 9900 B | ассет графики/3D/интерфейса: monastery flagstone floor slab |
| №0337 app/assets/3d/user_furniture/monastery_gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: monastery gold leaf cushion |
| №0338 app/assets/3d/user_furniture/monastery_hand_cart.glb | 86864 B | ассет графики/3D/интерфейса: monastery hand cart |
| №0339 app/assets/3d/user_furniture/monastery_hanging_oil_lamp.glb | 47156 B | ассет графики/3D/интерфейса: monastery hanging oil lamp |
| №0340 app/assets/3d/user_furniture/monastery_herb_garden_bed.glb | 94584 B | ассет графики/3D/интерфейса: monastery herb garden bed |
| №0341 app/assets/3d/user_furniture/monastery_hung_bell.glb | 40368 B | ассет графики/3D/интерфейса: monastery hung bell |
| №0342 app/assets/3d/user_furniture/monastery_infirmary_cot.glb | 71700 B | ассет графики/3D/интерфейса: monastery infirmary cot |
| №0343 app/assets/3d/user_furniture/monastery_kitchen_hearth.glb | 37972 B | ассет графики/3D/интерфейса: monastery kitchen hearth |
| №0344 app/assets/3d/user_furniture/monastery_manuscript_in_progress.glb | 153132 B | ассет графики/3D/интерфейса: monastery manuscript in progress |
| №0345 app/assets/3d/user_furniture/monastery_monastery_buttress.glb | 18440 B | ассет графики/3D/интерфейса: monastery monastery buttress |
| №0346 app/assets/3d/user_furniture/monastery_monastery_door_bay.glb | 87284 B | ассет графики/3D/интерфейса: monastery monastery door bay |
| №0347 app/assets/3d/user_furniture/monastery_monastery_lancet_window_bay.glb | 64048 B | ассет графики/3D/интерфейса: monastery monastery lancet window bay |
| №0348 app/assets/3d/user_furniture/monastery_monastery_wall_bay.glb | 29336 B | ассет графики/3D/интерфейса: monastery monastery wall bay |
| №0349 app/assets/3d/user_furniture/monastery_monks_chest.glb | 30432 B | ассет графики/3D/интерфейса: monastery monks chest |
| №0350 app/assets/3d/user_furniture/monastery_mortar_and_pestle_set.glb | 31476 B | ассет графики/3D/интерфейса: monastery mortar and pestle set |
| №0351 app/assets/3d/user_furniture/monastery_parchment_stretching_frame.glb | 66292 B | ассет графики/3D/интерфейса: monastery parchment stretching frame |
| №0352 app/assets/3d/user_furniture/monastery_physic_bench.glb | 46424 B | ассет графики/3D/интерфейса: monastery physic bench |
| №0353 app/assets/3d/user_furniture/monastery_pigment_tray.glb | 42180 B | ассет графики/3D/интерфейса: monastery pigment tray |
| №0354 app/assets/3d/user_furniture/monastery_quill_and_inkhorn_set.glb | 36912 B | ассет графики/3D/интерфейса: monastery quill and inkhorn set |
| №0355 app/assets/3d/user_furniture/monastery_rain_water_butt.glb | 45160 B | ассет графики/3D/интерфейса: monastery rain water butt |
| №0356 app/assets/3d/user_furniture/monastery_readers_pulpit.glb | 70796 B | ассет графики/3D/интерфейса: monastery readers pulpit |
| №0357 app/assets/3d/user_furniture/monastery_reading_lectern.glb | 48744 B | ассет графики/3D/интерфейса: monastery reading lectern |
| №0358 app/assets/3d/user_furniture/monastery_refectory_bench.glb | 20408 B | ассет графики/3D/интерфейса: monastery refectory bench |
| №0359 app/assets/3d/user_furniture/monastery_refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: monastery refectory long table |
| №0360 app/assets/3d/user_furniture/monastery_reliquary_casket.glb | 59680 B | ассет графики/3D/интерфейса: monastery reliquary casket |
| №0361 app/assets/3d/user_furniture/monastery_ruling_board.glb | 98044 B | ассет графики/3D/интерфейса: monastery ruling board |
| №0362 app/assets/3d/user_furniture/monastery_rush_light_stand.glb | 19044 B | ассет графики/3D/интерфейса: monastery rush light stand |
| №0363 app/assets/3d/user_furniture/monastery_scribes_stool.glb | 19900 B | ассет графики/3D/интерфейса: monastery scribes stool |
| №0364 app/assets/3d/user_furniture/monastery_sloped_writing_desk.glb | 247044 B | ассет графики/3D/интерфейса: monastery sloped writing desk |
| №0365 app/assets/3d/user_furniture/monastery_stone_drain.glb | 12360 B | ассет графики/3D/интерфейса: monastery stone drain |
| №0366 app/assets/3d/user_furniture/monastery_stone_font.glb | 55200 B | ассет графики/3D/интерфейса: monastery stone font |
| №0367 app/assets/3d/user_furniture/monastery_stone_stair_vice.glb | 130164 B | ассет графики/3D/интерфейса: monastery stone stair vice |
| №0368 app/assets/3d/user_furniture/monastery_tomb_slab.glb | 47852 B | ассет графики/3D/интерфейса: monastery tomb slab |
| №0369 app/assets/3d/user_furniture/monastery_trestle_table.glb | 39912 B | ассет графики/3D/интерфейса: monastery trestle table |
| №0370 app/assets/3d/user_furniture/monastery_wall_torch_bracket.glb | 38324 B | ассет графики/3D/интерфейса: monastery wall torch bracket |
| №0371 app/assets/3d/user_furniture/monastery_wood_stack.glb | 71140 B | ассет графики/3D/интерфейса: monastery wood stack |
| №0372 app/assets/3d/user_furniture/monks_chest.glb | 30508 B | ассет графики/3D/интерфейса: monks chest |
| №0373 app/assets/3d/user_furniture/mortar_pestle.glb | 31516 B | ассет графики/3D/интерфейса: mortar pestle |
| №0374 app/assets/3d/user_furniture/nature_birch_leaning.glb | 14804 B | ассет графики/3D/интерфейса: nature birch leaning |
| №0375 app/assets/3d/user_furniture/nature_birch_mature.glb | 15636 B | ассет графики/3D/интерфейса: nature birch mature |
| №0376 app/assets/3d/user_furniture/nature_birch_young.glb | 13980 B | ассет графики/3D/интерфейса: nature birch young |
| №0377 app/assets/3d/user_furniture/nature_boulder_large.glb | 6660 B | ассет графики/3D/интерфейса: nature boulder large |
| №0378 app/assets/3d/user_furniture/nature_boulder_medium.glb | 6192 B | ассет графики/3D/интерфейса: nature boulder medium |
| №0379 app/assets/3d/user_furniture/nature_boulder_mossy.glb | 24232 B | ассет графики/3D/интерфейса: nature boulder mossy |
| №0380 app/assets/3d/user_furniture/nature_boulder_small.glb | 4760 B | ассет графики/3D/интерфейса: nature boulder small |
| №0381 app/assets/3d/user_furniture/nature_bush_berry.glb | 12316 B | ассет графики/3D/интерфейса: nature bush berry |
| №0382 app/assets/3d/user_furniture/nature_bush_flat.glb | 5980 B | ассет графики/3D/интерфейса: nature bush flat |
| №0383 app/assets/3d/user_furniture/nature_bush_flowering.glb | 16248 B | ассет графики/3D/интерфейса: nature bush flowering |
| №0384 app/assets/3d/user_furniture/nature_bush_round.glb | 5152 B | ассет графики/3D/интерфейса: nature bush round |
| №0385 app/assets/3d/user_furniture/nature_bush_tall.glb | 5968 B | ассет графики/3D/интерфейса: nature bush tall |
| №0386 app/assets/3d/user_furniture/nature_cliff_block.glb | 29492 B | ассет графики/3D/интерфейса: nature cliff block |
| №0387 app/assets/3d/user_furniture/nature_dead_snag_short.glb | 8596 B | ассет графики/3D/интерфейса: nature dead snag short |
| №0388 app/assets/3d/user_furniture/nature_dead_snag_tall.glb | 16784 B | ассет графики/3D/интерфейса: nature dead snag tall |
| №0389 app/assets/3d/user_furniture/nature_fern_clump.glb | 29024 B | ассет графики/3D/интерфейса: nature fern clump |
| №0390 app/assets/3d/user_furniture/nature_fern_single.glb | 13176 B | ассет графики/3D/интерфейса: nature fern single |
| №0391 app/assets/3d/user_furniture/nature_flower_red.glb | 12412 B | ассет графики/3D/интерфейса: nature flower red |
| №0392 app/assets/3d/user_furniture/nature_flower_yellow.glb | 12216 B | ассет графики/3D/интерфейса: nature flower yellow |
| №0393 app/assets/3d/user_furniture/nature_grass_tuft_tall.glb | 6628 B | ассет графики/3D/интерфейса: nature grass tuft tall |
| №0394 app/assets/3d/user_furniture/nature_hedge_block.glb | 2444 B | ассет графики/3D/интерфейса: nature hedge block |
| №0395 app/assets/3d/user_furniture/nature_meadow_disc.glb | 8780 B | ассет графики/3D/интерфейса: nature meadow disc |
| №0396 app/assets/3d/user_furniture/nature_mushroom_group.glb | 39600 B | ассет графики/3D/интерфейса: nature mushroom group |
| №0397 app/assets/3d/user_furniture/nature_oak_ancient.glb | 292756 B | ассет графики/3D/интерфейса: nature oak ancient |
| №0398 app/assets/3d/user_furniture/nature_oak_mature.glb | 279624 B | ассет графики/3D/интерфейса: nature oak mature |
| №0399 app/assets/3d/user_furniture/nature_oak_sapling.glb | 266084 B | ассет графики/3D/интерфейса: nature oak sapling |
| №0400 app/assets/3d/user_furniture/nature_oak_young.glb | 266536 B | ассет графики/3D/интерфейса: nature oak young |
| №0401 app/assets/3d/user_furniture/nature_palm_leaning.glb | 50808 B | ассет графики/3D/интерфейса: nature palm leaning |
| №0402 app/assets/3d/user_furniture/nature_palm_mature.glb | 57076 B | ассет графики/3D/интерфейса: nature palm mature |
| №0403 app/assets/3d/user_furniture/nature_palm_young.glb | 37688 B | ассет графики/3D/интерфейса: nature palm young |
| №0404 app/assets/3d/user_furniture/nature_pebble_cluster.glb | 12184 B | ассет графики/3D/интерфейса: nature pebble cluster |
| №0405 app/assets/3d/user_furniture/nature_pine_columnar.glb | 265888 B | ассет графики/3D/интерфейса: nature pine columnar |
| №0406 app/assets/3d/user_furniture/nature_pine_sapling.glb | 264192 B | ассет графики/3D/интерфейса: nature pine sapling |
| №0407 app/assets/3d/user_furniture/nature_pine_spreading.glb | 265024 B | ассет графики/3D/интерфейса: nature pine spreading |
| №0408 app/assets/3d/user_furniture/nature_pine_windswept.glb | 265012 B | ассет графики/3D/интерфейса: nature pine windswept |
| №0409 app/assets/3d/user_furniture/nature_rock_pile.glb | 11840 B | ассет графики/3D/интерфейса: nature rock pile |
| №0410 app/assets/3d/user_furniture/nature_root_cluster.glb | 18436 B | ассет графики/3D/интерфейса: nature root cluster |
| №0411 app/assets/3d/user_furniture/nature_sapling_pair.glb | 267912 B | ассет графики/3D/интерфейса: nature sapling pair |
| №0412 app/assets/3d/user_furniture/nature_slab_flat.glb | 2744 B | ассет графики/3D/интерфейса: nature slab flat |
| №0413 app/assets/3d/user_furniture/nature_slab_upright.glb | 2484 B | ассет графики/3D/интерфейса: nature slab upright |
| №0414 app/assets/3d/user_furniture/nature_stump_mossy.glb | 6616 B | ассет графики/3D/интерфейса: nature stump mossy |
| №0415 app/assets/3d/user_furniture/nature_stump_oak.glb | 273776 B | ассет графики/3D/интерфейса: nature stump oak |
| №0416 app/assets/3d/user_furniture/nature_stump_pine.glb | 261388 B | ассет графики/3D/интерфейса: nature stump pine |
| №0417 app/assets/3d/user_furniture/nature_topiary_cone.glb | 7524 B | ассет графики/3D/интерфейса: nature topiary cone |
| №0418 app/assets/3d/user_furniture/parchment_stretching_frame.glb | 55508 B | ассет графики/3D/интерфейса: parchment stretching frame |
| №0419 app/assets/3d/user_furniture/physic_bench.glb | 60316 B | ассет графики/3D/интерфейса: physic bench |
| №0420 app/assets/3d/user_furniture/pigment_tray.glb | 39864 B | ассет графики/3D/интерфейса: pigment tray |
| №0421 app/assets/3d/user_furniture/quill_inkhorn_set.glb | 36956 B | ассет графики/3D/интерфейса: quill inkhorn set |
| №0422 app/assets/3d/user_furniture/rain_water_butt.glb | 45168 B | ассет графики/3D/интерфейса: rain water butt |
| №0423 app/assets/3d/user_furniture/range_and_oven.glb | 19732 B | ассет графики/3D/интерфейса: range and oven |
| №0424 app/assets/3d/user_furniture/reading_lectern.glb | 48844 B | ассет графики/3D/интерфейса: reading lectern |
| №0425 app/assets/3d/user_furniture/refectory_bench.glb | 20560 B | ассет графики/3D/интерфейса: refectory bench |
| №0426 app/assets/3d/user_furniture/refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: refectory long table |
| №0427 app/assets/3d/user_furniture/reliquary_casket.glb | 59728 B | ассет графики/3D/интерфейса: reliquary casket |
| №0428 app/assets/3d/user_furniture/road_signpost.glb | 8044 B | ассет графики/3D/интерфейса: road signpost |
| №0429 app/assets/3d/user_furniture/rug.glb | 16540 B | ассет графики/3D/интерфейса: rug |
| №0430 app/assets/3d/user_furniture/ruling_board.glb | 98032 B | ассет графики/3D/интерфейса: ruling board |
| №0431 app/assets/3d/user_furniture/rush_light_stand.glb | 19052 B | ассет графики/3D/интерфейса: rush light stand |
| №0432 app/assets/3d/user_furniture/scribes_stool.glb | 20040 B | ассет графики/3D/интерфейса: scribes stool |
| №0433 app/assets/3d/user_furniture/shop_counter.glb | 58488 B | ассет графики/3D/интерфейса: shop counter |
| №0434 app/assets/3d/user_furniture/sloped_writing_desk.glb | 341476 B | ассет графики/3D/интерфейса: sloped writing desk |
| №0435 app/assets/3d/user_furniture/spinning_wheel.glb | 21900 B | ассет графики/3D/интерфейса: spinning wheel |
| №0436 app/assets/3d/user_furniture/stone_stone_stair_vice_0.glb | 130164 B | ассет графики/3D/интерфейса: stone stone stair vice 0 |
| №0437 app/assets/3d/user_furniture/table_and_stools.glb | 34088 B | ассет графики/3D/интерфейса: table and stools |
| №0438 app/assets/3d/user_furniture/table.glb | 6217412 B | ассет графики/3D/интерфейса: table |
| №0439 app/assets/3d/user_furniture/torch_sconce.glb | 8692 B | ассет графики/3D/интерфейса: torch sconce |
| №0440 app/assets/3d/user_furniture/town_allotment_bed.glb | 42940 B | ассет графики/3D/интерфейса: town allotment bed |
| №0441 app/assets/3d/user_furniture/town_altar_with_candles.glb | 28704 B | ассет графики/3D/интерфейса: town altar with candles |
| №0442 app/assets/3d/user_furniture/town_anvil.glb | 7820 B | ассет графики/3D/интерфейса: town anvil |
| №0443 app/assets/3d/user_furniture/town_apple_tree.glb | 21880 B | ассет графики/3D/интерфейса: town apple tree |
| №0444 app/assets/3d/user_furniture/town_armour_stand.glb | 16180 B | ассет графики/3D/интерфейса: town armour stand |
| №0445 app/assets/3d/user_furniture/town_banner_pole.glb | 16800 B | ассет графики/3D/интерфейса: town banner pole |
| №0446 app/assets/3d/user_furniture/town_barrel.glb | 13340 B | ассет графики/3D/интерфейса: town barrel |
| №0447 app/assets/3d/user_furniture/town_bedroll.glb | 8964 B | ассет графики/3D/интерфейса: town bedroll |
| №0448 app/assets/3d/user_furniture/town_bench.glb | 16564 B | ассет графики/3D/интерфейса: town bench |
| №0449 app/assets/3d/user_furniture/town_boulder_large.glb | 9404 B | ассет графики/3D/интерфейса: town boulder large |
| №0450 app/assets/3d/user_furniture/town_boulder_small.glb | 4768 B | ассет графики/3D/интерфейса: town boulder small |
| №0451 app/assets/3d/user_furniture/town_bush.glb | 9188 B | ассет графики/3D/интерфейса: town bush |
| №0452 app/assets/3d/user_furniture/town_campfire_with_spit.glb | 33304 B | ассет графики/3D/интерфейса: town campfire with spit |
| №0453 app/assets/3d/user_furniture/town_canoe.glb | 15568 B | ассет графики/3D/интерфейса: town canoe |
| №0454 app/assets/3d/user_furniture/town_cargo_cart.glb | 70964 B | ассет графики/3D/интерфейса: town cargo cart |
| №0455 app/assets/3d/user_furniture/town_cauldron_on_tripod.glb | 32232 B | ассет графики/3D/интерфейса: town cauldron on tripod |
| №0456 app/assets/3d/user_furniture/town_cave_mouth.glb | 21616 B | ассет графики/3D/интерфейса: town cave mouth |
| №0457 app/assets/3d/user_furniture/town_chandelier.glb | 24996 B | ассет графики/3D/интерфейса: town chandelier |
| №0458 app/assets/3d/user_furniture/town_chicken_coop.glb | 26176 B | ассет графики/3D/интерфейса: town chicken coop |
| №0459 app/assets/3d/user_furniture/town_cobble_road_corner.glb | 18268 B | ассет графики/3D/интерфейса: town cobble road corner |
| №0460 app/assets/3d/user_furniture/town_cobble_road_junction.glb | 26024 B | ассет графики/3D/интерфейса: town cobble road junction |
| №0461 app/assets/3d/user_furniture/town_cobble_road_tile.glb | 20612 B | ассет графики/3D/интерфейса: town cobble road tile |
| №0462 app/assets/3d/user_furniture/town_cooks_kitchen.glb | 96404 B | ассет графики/3D/интерфейса: town cooks kitchen |
| №0463 app/assets/3d/user_furniture/town_cow_pen_fence.glb | 11268 B | ассет графики/3D/интерфейса: town cow pen fence |
| №0464 app/assets/3d/user_furniture/town_crate_stack.glb | 39416 B | ассет графики/3D/интерфейса: town crate stack |
| №0465 app/assets/3d/user_furniture/town_dead_tree.glb | 6196 B | ассет графики/3D/интерфейса: town dead tree |
| №0466 app/assets/3d/user_furniture/town_dirt_path_tile.glb | 9152 B | ассет графики/3D/интерфейса: town dirt path tile |
| №0467 app/assets/3d/user_furniture/town_farmhouse_and_barn.glb | 161272 B | ассет графики/3D/интерфейса: town farmhouse and barn |
| №0468 app/assets/3d/user_furniture/town_fence_gate.glb | 14544 B | ассет графики/3D/интерфейса: town fence gate |
| №0469 app/assets/3d/user_furniture/town_fence_run.glb | 28988 B | ассет графики/3D/интерфейса: town fence run |
| №0470 app/assets/3d/user_furniture/town_fern_clump.glb | 15892 B | ассет графики/3D/интерфейса: town fern clump |
| №0471 app/assets/3d/user_furniture/town_ferry_raft.glb | 31140 B | ассет графики/3D/интерфейса: town ferry raft |
| №0472 app/assets/3d/user_furniture/town_fishing_boat.glb | 25960 B | ассет графики/3D/интерфейса: town fishing boat |
| №0473 app/assets/3d/user_furniture/town_fishing_hut_on_stilts.glb | 110516 B | ассет графики/3D/интерфейса: town fishing hut on stilts |
| №0474 app/assets/3d/user_furniture/town_fletcher_shop.glb | 117300 B | ассет графики/3D/интерфейса: town fletcher shop |
| №0475 app/assets/3d/user_furniture/town_flower_patch.glb | 34768 B | ассет графики/3D/интерфейса: town flower patch |
| №0476 app/assets/3d/user_furniture/town_general_store.glb | 137904 B | ассет графики/3D/интерфейса: town general store |
| №0477 app/assets/3d/user_furniture/town_goblin_tent.glb | 15120 B | ассет графики/3D/интерфейса: town goblin tent |
| №0478 app/assets/3d/user_furniture/town_goblin_totem.glb | 27832 B | ассет графики/3D/интерфейса: town goblin totem |
| №0479 app/assets/3d/user_furniture/town_grass_ground_tile.glb | 8564 B | ассет графики/3D/интерфейса: town grass ground tile |
| №0480 app/assets/3d/user_furniture/town_grass_tuft_cluster.glb | 5080 B | ассет графики/3D/интерфейса: town grass tuft cluster |
| №0481 app/assets/3d/user_furniture/town_gravestone_set.glb | 23812 B | ассет графики/3D/интерфейса: town gravestone set |
| №0482 app/assets/3d/user_furniture/town_guard_barracks.glb | 162732 B | ассет графики/3D/интерфейса: town guard barracks |
| №0483 app/assets/3d/user_furniture/town_hand_cart.glb | 25308 B | ассет графики/3D/интерфейса: town hand cart |
| №0484 app/assets/3d/user_furniture/town_hay_bale.glb | 16340 B | ассет графики/3D/интерфейса: town hay bale |
| №0485 app/assets/3d/user_furniture/town_hitching_post.glb | 22008 B | ассет графики/3D/интерфейса: town hitching post |
| №0486 app/assets/3d/user_furniture/town_hunters_hide.glb | 33880 B | ассет графики/3D/интерфейса: town hunters hide |
| №0487 app/assets/3d/user_furniture/town_lamp_post.glb | 16804 B | ассет графики/3D/интерфейса: town lamp post |
| №0488 app/assets/3d/user_furniture/town_lily_pads.glb | 16632 B | ассет графики/3D/интерфейса: town lily pads |
| №0489 app/assets/3d/user_furniture/town_log_pile.glb | 37732 B | ассет графики/3D/интерфейса: town log pile |
| №0490 app/assets/3d/user_furniture/town_loom.glb | 46480 B | ассет графики/3D/интерфейса: town loom |
| №0491 app/assets/3d/user_furniture/town_loot_sack.glb | 11820 B | ассет графики/3D/интерфейса: town loot sack |
| №0492 app/assets/3d/user_furniture/town_market_stall_blue.glb | 61540 B | ассет графики/3D/интерфейса: town market stall blue |
| №0493 app/assets/3d/user_furniture/town_market_stall_cream.glb | 60756 B | ассет графики/3D/интерфейса: town market stall cream |
| №0494 app/assets/3d/user_furniture/town_market_stall.glb | 61536 B | ассет графики/3D/интерфейса: town market stall |
| №0495 app/assets/3d/user_furniture/town_mine_entrance.glb | 41744 B | ассет графики/3D/интерфейса: town mine entrance |
| №0496 app/assets/3d/user_furniture/town_mushroom_ring.glb | 22884 B | ассет графики/3D/интерфейса: town mushroom ring |
| №0497 app/assets/3d/user_furniture/town_notice_board.glb | 15924 B | ассет графики/3D/интерфейса: town notice board |
| №0498 app/assets/3d/user_furniture/town_oak_tree.glb | 19492 B | ассет графики/3D/интерфейса: town oak tree |
| №0499 app/assets/3d/user_furniture/town_pine_tree.glb | 7096 B | ассет графики/3D/интерфейса: town pine tree |
| №0500 app/assets/3d/user_furniture/town_plaza_paving_tile.glb | 40396 B | ассет графики/3D/интерфейса: town plaza paving tile |
| №0501 app/assets/3d/user_furniture/town_ploughed_field_tile.glb | 24992 B | ассет графики/3D/интерфейса: town ploughed field tile |
| №0502 app/assets/3d/user_furniture/town_range_and_oven.glb | 19440 B | ассет графики/3D/интерфейса: town range and oven |
| №0503 app/assets/3d/user_furniture/town_reed_clump.glb | 8672 B | ассет графики/3D/интерфейса: town reed clump |
| №0504 app/assets/3d/user_furniture/town_river_bank_tile.glb | 17528 B | ассет графики/3D/интерфейса: town river bank tile |
| №0505 app/assets/3d/user_furniture/town_river_bend_tile.glb | 27100 B | ассет графики/3D/интерфейса: town river bend tile |
| №0506 app/assets/3d/user_furniture/town_river_tile_straight.glb | 19108 B | ассет графики/3D/интерфейса: town river tile straight |
| №0507 app/assets/3d/user_furniture/town_road_signpost.glb | 7824 B | ассет графики/3D/интерфейса: town road signpost |
| №0508 app/assets/3d/user_furniture/town_rock_outcrop.glb | 10020 B | ассет графики/3D/интерфейса: town rock outcrop |
| №0509 app/assets/3d/user_furniture/town_rope_bridge.glb | 104548 B | ассет графики/3D/интерфейса: town rope bridge |
| №0510 app/assets/3d/user_furniture/town_rowing_boat.glb | 26056 B | ассет графики/3D/интерфейса: town rowing boat |
| №0511 app/assets/3d/user_furniture/town_rug.glb | 16352 B | ассет графики/3D/интерфейса: town rug |
| №0512 app/assets/3d/user_furniture/town_scarecrow.glb | 22344 B | ассет графики/3D/интерфейса: town scarecrow |
| №0513 app/assets/3d/user_furniture/town_shop_counter.glb | 61556 B | ассет графики/3D/интерфейса: town shop counter |
| №0514 app/assets/3d/user_furniture/town_smithy.glb | 105612 B | ассет графики/3D/интерфейса: town smithy |
| №0515 app/assets/3d/user_furniture/town_spinning_wheel.glb | 21608 B | ассет графики/3D/интерфейса: town spinning wheel |
| №0516 app/assets/3d/user_furniture/town_standing_stone.glb | 13276 B | ассет графики/3D/интерфейса: town standing stone |
| №0517 app/assets/3d/user_furniture/town_stone_arch_bridge.glb | 51536 B | ассет графики/3D/интерфейса: town stone arch bridge |
| №0518 app/assets/3d/user_furniture/town_stone_church.glb | 145052 B | ассет графики/3D/интерфейса: town stone church |
| №0519 app/assets/3d/user_furniture/town_stone_circle_slab.glb | 31656 B | ассет графики/3D/интерфейса: town stone circle slab |
| №0520 app/assets/3d/user_furniture/town_straw_target.glb | 15176 B | ассет графики/3D/интерфейса: town straw target |
| №0521 app/assets/3d/user_furniture/town_stump_with_axe.glb | 11880 B | ассет графики/3D/интерфейса: town stump with axe |
| №0522 app/assets/3d/user_furniture/town_table_and_stools.glb | 33848 B | ассет графики/3D/интерфейса: town table and stools |
| №0523 app/assets/3d/user_furniture/town_thatched_cottage.glb | 106096 B | ассет графики/3D/интерфейса: town thatched cottage |
| №0524 app/assets/3d/user_furniture/town_timber_house_large.glb | 262356 B | ассет графики/3D/интерфейса: town timber house large |
| №0525 app/assets/3d/user_furniture/town_timber_house_medium.glb | 169188 B | ассет графики/3D/интерфейса: town timber house medium |
| №0526 app/assets/3d/user_furniture/town_timber_house_small.glb | 119348 B | ассет графики/3D/интерфейса: town timber house small |
| №0527 app/assets/3d/user_furniture/town_timber_plank_bridge.glb | 60076 B | ассет графики/3D/интерфейса: town timber plank bridge |
| №0528 app/assets/3d/user_furniture/town_torch_sconce.glb | 8460 B | ассет графики/3D/интерфейса: town torch sconce |
| №0529 app/assets/3d/user_furniture/town_town_bank.glb | 116184 B | ассет графики/3D/интерфейса: town town bank |
| №0530 app/assets/3d/user_furniture/town_town_hall.glb | 252584 B | ассет графики/3D/интерфейса: town town hall |
| №0531 app/assets/3d/user_furniture/town_town_wall_segment.glb | 9696 B | ассет графики/3D/интерфейса: town town wall segment |
| №0532 app/assets/3d/user_furniture/town_town_well.glb | 32492 B | ассет графики/3D/интерфейса: town town well |
| №0533 app/assets/3d/user_furniture/town_treasure_chest.glb | 12404 B | ассет графики/3D/интерфейса: town treasure chest |
| №0534 app/assets/3d/user_furniture/town_village_tavern.glb | 220336 B | ассет графики/3D/интерфейса: town village tavern |
| №0535 app/assets/3d/user_furniture/town_wall_corner_tower.glb | 79592 B | ассет графики/3D/интерфейса: town wall corner tower |
| №0536 app/assets/3d/user_furniture/town_wall_gatehouse.glb | 77180 B | ассет графики/3D/интерфейса: town wall gatehouse |
| №0537 app/assets/3d/user_furniture/town_wall_stair.glb | 34040 B | ассет графики/3D/интерфейса: town wall stair |
| №0538 app/assets/3d/user_furniture/town_wall_walk_crenellated.glb | 15296 B | ассет графики/3D/интерфейса: town wall walk crenellated |
| №0539 app/assets/3d/user_furniture/town_watchtower.glb | 109556 B | ассет графики/3D/интерфейса: town watchtower |
| №0540 app/assets/3d/user_furniture/town_water_trough.glb | 18172 B | ассет графики/3D/интерфейса: town water trough |
| №0541 app/assets/3d/user_furniture/town_weapon_rack.glb | 23152 B | ассет графики/3D/интерфейса: town weapon rack |
| №0542 app/assets/3d/user_furniture/town_wheat_field_tile.glb | 55508 B | ассет графики/3D/интерфейса: town wheat field tile |
| №0543 app/assets/3d/user_furniture/town_willow_tree.glb | 26360 B | ассет графики/3D/интерфейса: town willow tree |
| №0544 app/assets/3d/user_furniture/town_windmill.glb | 121768 B | ассет графики/3D/интерфейса: town windmill |
| №0545 app/assets/3d/user_furniture/town_wizard_tower_base.glb | 64292 B | ассет графики/3D/интерфейса: town wizard tower base |
| №0546 app/assets/3d/user_furniture/town_wizard_tower_mid.glb | 70456 B | ассет графики/3D/интерфейса: town wizard tower mid |
| №0547 app/assets/3d/user_furniture/town_wizard_tower_top.glb | 50984 B | ассет графики/3D/интерфейса: town wizard tower top |
| №0548 app/assets/3d/user_furniture/treasure_chest.glb | 12772 B | ассет графики/3D/интерфейса: treasure chest |
| №0549 app/assets/3d/user_furniture/trestle_table.glb | 40424 B | ассет графики/3D/интерфейса: trestle table |
| №0550 app/assets/3d/user_furniture/weapon_rack.glb | 23300 B | ассет графики/3D/интерфейса: weapon rack |
| №0551 app/assets/3d/user_furniture/wood_stack.glb | 71136 B | ассет графики/3D/интерфейса: wood stack |
| №0552 app/assets/dice/.gitkeep | 0 B | ассет графики/3D/интерфейса: .gitkeep |
| №0553 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png | 2349861 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 07 PM |
| №0554 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_30 PM.png | 2088308 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 30 PM |
| №0555 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_13_27 PM.png | 2584925 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 13 27 PM |
| №0556 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_23_00 PM.png | 2274607 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 23 00 PM |
| №0557 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_24_38 PM.png | 2254958 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 24 38 PM |
| №0558 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_27_51 PM.png | 2389543 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 27 51 PM |
| №0559 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_35_50 PM.png | 2486441 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 35 50 PM |
| №0560 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_41_40 PM.png | 2712929 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 41 40 PM |
| №0561 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_49_58 PM.png | 2751322 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 49 58 PM |
| №0562 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_07 PM.png | 2778707 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 07 PM |
| №0563 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_18 PM.png | 2503466 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 18 PM |
| №0564 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_28 PM.png | 2561809 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 28 PM |
| №0565 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_39 PM.png | 2841483 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 39 PM |
| №0566 app/assets/dice/dice1.png | 348916 B | ассет графики/3D/интерфейса: dice1 |
| №0567 app/assets/dice/dice10-1.png | 386558 B | ассет графики/3D/интерфейса: dice10 1 |
| №0568 app/assets/dice/dice10.png | 386558 B | ассет графики/3D/интерфейса: dice10 |
| №0569 app/assets/dice/dice11.png | 307154 B | ассет графики/3D/интерфейса: dice11 |
| №0570 app/assets/dice/dice12.png | 395864 B | ассет графики/3D/интерфейса: dice12 |
| №0571 app/assets/dice/dice13.png | 344758 B | ассет графики/3D/интерфейса: dice13 |
| №0572 app/assets/dice/dice15.png | 388111 B | ассет графики/3D/интерфейса: dice15 |
| №0573 app/assets/dice/dice16.png | 352768 B | ассет графики/3D/интерфейса: dice16 |
| №0574 app/assets/dice/dice17.png | 342548 B | ассет графики/3D/интерфейса: dice17 |
| №0575 app/assets/dice/dice2.png | 246156 B | ассет графики/3D/интерфейса: dice2 |
| №0576 app/assets/dice/dice3.png | 346757 B | ассет графики/3D/интерфейса: dice3 |
| №0577 app/assets/dice/dice4.png | 348331 B | ассет графики/3D/интерфейса: dice4 |
| №0578 app/assets/dice/dice5.png | 299652 B | ассет графики/3D/интерфейса: dice5 |
| №0579 app/assets/dice/dice6.png | 331669 B | ассет графики/3D/интерфейса: dice6 |
| №0580 app/assets/dice/dice7.png | 343178 B | ассет графики/3D/интерфейса: dice7 |
| №0581 app/assets/dice/dice8.png | 370230 B | ассет графики/3D/интерфейса: dice8 |
| №0582 app/assets/dice/dice9.png | 336030 B | ассет графики/3D/интерфейса: dice9 |
| №0583 app/assets/ui/character-creation/1790622252250.png | 908119 B | ассет графики/3D/интерфейса: 1790622252250 |
| №0584 app/assets/ui/dragon_fire_burst_v2_sprite.png | 237749 B | ассет графики/3D/интерфейса: dragon fire burst v2 sprite |
| №0585 app/assets/ui/dragon_fire.png | 267960 B | ассет графики/3D/интерфейса: dragon fire |
| №0586 app/assets/ui/dragon_flight_v2_sprite.png | 573207 B | ассет графики/3D/интерфейса: dragon flight v2 sprite |
| №0587 app/assets/ui/dragon_frame_strip.svg | 858 B | ассет графики/3D/интерфейса: dragon frame strip |
| №0588 app/assets/ui/dragon.png | 274924 B | ассет графики/3D/интерфейса: dragon |
| №0589 app/assets/ui/fire_front.png | 1276760 B | ассет графики/3D/интерфейса: fire front |
| №0590 app/assets/ui/forest_burned.jpg | 211523 B | ассет графики/3D/интерфейса: forest burned |
| №0591 app/assets/ui/forest_green.jpg | 309184 B | ассет графики/3D/интерфейса: forest green |
| №0592 app/assets/ui/loader_dragon_head.svg | 2388 B | ассет графики/3D/интерфейса: loader dragon head |
| №0593 app/assets/ui/loader_fire.svg | 902 B | ассет графики/3D/интерфейса: loader fire |
| №0594 app/assets/ui/loader_forest_burning.svg | 1448 B | ассет графики/3D/интерфейса: loader forest burning |
| №0595 app/assets/ui/loader_forest.svg | 917 B | ассет графики/3D/интерфейса: loader forest |
| №0596 app/assets/ui/loader_sparks.svg | 626 B | ассет графики/3D/интерфейса: loader sparks |
| №0597 app/assets/ui/update_scene_ash.svg | 432 B | ассет графики/3D/интерфейса: update scene ash |
| №0598 app/assets/ui/update_scene_background.svg | 1141 B | ассет графики/3D/интерфейса: update scene background |
| №0599 app/assets/ui/update_scene_dragon_fire.svg | 733 B | ассет графики/3D/интерфейса: update scene dragon fire |
| №0600 app/assets/ui/update_scene_dragon.svg | 1324 B | ассет графики/3D/интерфейса: update scene dragon |
| №0601 app/assets/ui/update_scene_embers.svg | 474 B | ассет графики/3D/интерфейса: update scene embers |
| №0602 app/assets/ui/update_scene_fire_front.svg | 837 B | ассет графики/3D/интерфейса: update scene fire front |
| №0603 app/assets/ui/update_scene_forest_burned.svg | 1417 B | ассет графики/3D/интерфейса: update scene forest burned |
| №0604 app/assets/ui/update_scene_forest_green.svg | 1181 B | ассет графики/3D/интерфейса: update scene forest green |
| №0605 app/assets/ui/update_scene_smoke.svg | 417 B | ассет графики/3D/интерфейса: update scene smoke |
| №0606 app/assets/ui/vine_bone_frame_strip.svg | 943 B | ассет графики/3D/интерфейса: vine bone frame strip |
| №0607 app/Backgrounds.js | 63130 B | логический модуль: Backgrounds |
| №0608 app/battle_action_ui.js | 18386 B | логический модуль: battle action ui |
| №0609 app/battle_board.js | 37380 B | логический модуль: battle board |
| №0610 app/bestiary_2_0_v56.js | 55429 B | логический модуль: bestiary 2 0 v56 |
| №0611 app/bestiary_catalog_v56_1.js | 16222 B | логический модуль: bestiary catalog v56 1 |
| №0612 app/bestiary_catalog_v56_10.js | 10944 B | логический модуль: bestiary catalog v56 10 |
| №0613 app/bestiary_catalog_v56_11.js | 13164 B | логический модуль: bestiary catalog v56 11 |
| №0614 app/bestiary_catalog_v56_12.js | 10118 B | логический модуль: bestiary catalog v56 12 |
| №0615 app/bestiary_catalog_v56_13.js | 12586 B | логический модуль: bestiary catalog v56 13 |
| №0616 app/bestiary_catalog_v56_2.js | 13525 B | логический модуль: bestiary catalog v56 2 |
| №0617 app/bestiary_catalog_v56_3.js | 14383 B | логический модуль: bestiary catalog v56 3 |
| №0618 app/bestiary_catalog_v56_4.js | 11396 B | логический модуль: bestiary catalog v56 4 |
| №0619 app/bestiary_catalog_v56_5.js | 8648 B | логический модуль: bestiary catalog v56 5 |
| №0620 app/bestiary_catalog_v56_6.js | 9066 B | логический модуль: bestiary catalog v56 6 |
| №0621 app/bestiary_catalog_v56_7.js | 9314 B | логический модуль: bestiary catalog v56 7 |
| №0622 app/bestiary_catalog_v56_8.js | 9559 B | логический модуль: bestiary catalog v56 8 |
| №0623 app/bestiary_catalog_v56_9.js | 9861 B | логический модуль: bestiary catalog v56 9 |
| №0624 app/blood_hunter_engine.js | 82133 B | логика класса Кровавый охотник |
| №0625 app/campaign_manager.js | 7195 B | логический модуль: campaign manager |
| №0626 app/character_builder_v2.js | 104907 B | логический модуль: character builder v2 |
| №0627 app/character_creation_pergament.css | 12669 B | оформление интерфейса: character creation pergament |
| №0628 app/character_creation_pergament.js | 39686 B | логический модуль: character creation pergament |
| №0629 app/character_creation.js | 46823 B | логический модуль: character creation |
| №0630 app/character.js | 10357 B | лист персонажа; состояния и оружие |
| №0631 app/class_features_engine.js | 134918 B | логический модуль: class features engine |
| №0632 app/classesRegistry.js | 10857 B | логический модуль: classesRegistry |
| №0633 app/cloud_account.css | 1213 B | оформление интерфейса: cloud account |
| №0634 app/cloud_account.js | 8970 B | интерфейс авторизации и управления версиями |
| №0635 app/cloud_config.js | 450 B | публичная конфигурация облака |
| №0636 app/cloud_sync.js | 24647 B | синхронизация сохранений через Supabase |
| №0637 app/combat_abilities.js | 12824 B | логический модуль: combat abilities |
| №0638 app/combat_engine.js | 88824 B | движок боя и HP; адаптеры legacy значений |
| №0639 app/companion_gameplay_v27.js | 17531 B | логический модуль: companion gameplay v27 |
| №0640 app/companion_packs_v26.js | 4998 B | логический модуль: companion packs v26 |
| №0641 app/companions.js | 8943 B | логический модуль: companions |
| №0642 app/consumables.js | 15638 B | логический модуль: consumables |
| №0643 app/content_catalog.js | 9721 B | логический модуль: content catalog |
| №0644 app/content_framework.js | 9884 B | логический модуль: content framework |
| №0645 app/content_manifest.js | 3755 B | логический модуль: content manifest |
| №0646 app/crafting_character_influence_test_v46.js | 7123 B | логический модуль: crafting character influence test v46 |
| №0647 app/crafting_disassembly_repair_v51.js | 13334 B | логический модуль: crafting disassembly repair v51 |
| №0648 app/crafting_disassembly_v51.js | 11979 B | логический модуль: crafting disassembly v51 |
| №0649 app/crafting_dlc_v50.js | 8373 B | логический модуль: crafting dlc v50 |
| №0650 app/crafting_economy_v49.js | 17129 B | логический модуль: crafting economy v49 |
| №0651 app/crafting_engine_v31.js | 20294 B | логический модуль: crafting engine v31 |
| №0652 app/crafting_profession_progression_test_v47.js | 5609 B | логический модуль: crafting profession progression test v47 |
| №0653 app/crafting_profession_progression_v47.js | 35781 B | логический модуль: crafting profession progression v47 |
| №0654 app/crafting_professions_v33.js | 19300 B | логический модуль: crafting professions v33 |
| №0655 app/crafting_professions_v38.js | 48800 B | логический модуль: crafting professions v38 |
| №0656 app/crafting_resources_v34.js | 35661 B | логический модуль: crafting resources v34 |
| №0657 app/custom_crafting_v32.js | 15989 B | логический модуль: custom crafting v32 |
| №0658 app/data/classes/Accursed.js | 3369 B | логика классов: Accursed |
| №0659 app/data/classes/accursed.png | 2441667 B | логика классов: accursed |
| №0660 app/data/classes/Alchemist.js | 5589 B | логика классов: Alchemist |
| №0661 app/data/classes/alchemist.png | 1945616 B | логика классов: alchemist |
| №0662 app/data/classes/Artificer.js | 2124 B | логика классов: Artificer |
| №0663 app/data/classes/ARTIFICER.png | 891812 B | логика классов: ARTIFICER |
| №0664 app/data/classes/Barbarian.js | 3822 B | логика классов: Barbarian |
| №0665 app/data/classes/BARBARIAN.png | 815028 B | логика классов: BARBARIAN |
| №0666 app/data/classes/Bard.js | 2085 B | логика классов: Bard |
| №0667 app/data/classes/Bard.png | 769261 B | логика классов: Bard |
| №0668 app/data/classes/beasthart.png | 2255040 B | логика классов: beasthart |
| №0669 app/data/classes/Beastheart.js | 28992 B | логика классов: Beastheart |
| №0670 app/data/classes/blood hunter.png | 2210071 B | логика классов: blood hunter |
| №0671 app/data/classes/BloodHunter.js | 5283 B | логика классов: BloodHunter |
| №0672 app/data/classes/Cleric.js | 1987 B | логика классов: Cleric |
| №0673 app/data/classes/CLERIC.png | 914579 B | логика классов: CLERIC |
| №0674 app/data/classes/Druid.js | 1898 B | логика классов: Druid |
| №0675 app/data/classes/DRUID.png | 776880 B | логика классов: DRUID |
| №0676 app/data/classes/extra_class_stubs.js | 4499 B | логика классов: extra class stubs |
| №0677 app/data/classes/Fighter.js | 3771 B | логика классов: Fighter |
| №0678 app/data/classes/FIGHTER.png | 762812 B | логика классов: FIGHTER |
| №0679 app/data/classes/geist.png | 1776006 B | логика классов: geist |
| №0680 app/data/classes/Ghost.js | 295 B | логика классов: Ghost |
| №0681 app/data/classes/Illigger.js | 6058 B | логика классов: Illigger |
| №0682 app/data/classes/Illigger.png | 1716994 B | логика классов: Illigger |
| №0683 app/data/classes/level_up.js | 59525 B | логика классов: level up |
| №0684 app/data/classes/Martyr.js | 884 B | логика классов: Martyr |
| №0685 app/data/classes/martyr.png | 2381724 B | логика классов: martyr |
| №0686 app/data/classes/Monk.js | 2493 B | логика классов: Monk |
| №0687 app/data/classes/Monk.png | 1115382 B | логика классов: Monk |
| №0688 app/data/classes/Necromancer.js | 1013 B | логика классов: Necromancer |
| №0689 app/data/classes/necromancer.png | 2007714 B | логика классов: necromancer |
| №0690 app/data/classes/Occultist.js | 8507 B | логика классов: Occultist |
| №0691 app/data/classes/occultist.png | 1986332 B | логика классов: occultist |
| №0692 app/data/classes/Paladin.js | 2017 B | логика классов: Paladin |
| №0693 app/data/classes/PALADIN.png | 873991 B | логика классов: PALADIN |
| №0694 app/data/classes/Parasite.js | 545 B | логика классов: Parasite |
| №0695 app/data/classes/parasite.png | 2144116 B | логика классов: parasite |
| №0696 app/data/classes/progressionEngine.js | 20610 B | логика классов: progressionEngine |
| №0697 app/data/classes/Psion.js | 9033 B | логика классов: Psion |
| №0698 app/data/classes/psion.png | 1951350 B | логика классов: psion |
| №0699 app/data/classes/Pugilist.js | 11453 B | логика классов: Pugilist |
| №0700 app/data/classes/pugilist.png | 2022336 B | логика классов: pugilist |
| №0701 app/data/classes/Ranger.js | 1938 B | логика классов: Ranger |
| №0702 app/data/classes/RANGER.png | 643335 B | логика классов: RANGER |
| №0703 app/data/classes/Rogue.js | 3244 B | логика классов: Rogue |
| №0704 app/data/classes/Rogue.png | 579962 B | логика классов: Rogue |
| №0705 app/data/classes/rune keeper.png | 2582772 B | логика классов: rune keeper |
| №0706 app/data/classes/RuneKeeper.js | 2366 B | логика классов: RuneKeeper |
| №0707 app/data/classes/Savant.js | 930 B | логика классов: Savant |
| №0708 app/data/classes/savant.png | 1991433 B | логика классов: savant |
| №0709 app/data/classes/Shifter.js | 734 B | логика классов: Shifter |
| №0710 app/data/classes/shifter.png | 2248497 B | логика классов: shifter |
| №0711 app/data/classes/Sorcerer.js | 2098 B | логика классов: Sorcerer |
| №0712 app/data/classes/SORCERER.png | 939797 B | логика классов: SORCERER |
| №0713 app/data/classes/Swarm.js | 198 B | логика классов: Swarm |
| №0714 app/data/classes/the swam.png | 1759593 B | логика классов: the swam |
| №0715 app/data/classes/Vessel.js | 751 B | логика классов: Vessel |
| №0716 app/data/classes/vessel.png | 1943431 B | логика классов: vessel |
| №0717 app/data/classes/WalterParasite.js | 303 B | логика классов: WalterParasite |
| №0718 app/data/classes/Warden.js | 6678 B | логика классов: Warden |
| №0719 app/data/classes/warden.png | 2093561 B | логика классов: warden |
| №0720 app/data/classes/Warlock.js | 2013 B | логика классов: Warlock |
| №0721 app/data/classes/WARLOCK.png | 981038 B | логика классов: WARLOCK |
| №0722 app/data/classes/Warlord.js | 9504 B | логика классов: Warlord |
| №0723 app/data/classes/warlord.png | 2460016 B | логика классов: warlord |
| №0724 app/data/classes/Witch.js | 8032 B | логика классов: Witch |
| №0725 app/data/classes/witch.png | 1931074 B | логика классов: witch |
| №0726 app/data/classes/Wizard.js | 1627 B | логика классов: Wizard |
| №0727 app/data/classes/Wizard.png | 822251 B | логика классов: Wizard |
| №0728 app/data/feats/Feat_widget.js | 25654 B | черты и таланты: Feat widget |
| №0729 app/data/feats/Feats_phb.js | 19377 B | черты и таланты: Feats phb |
| №0730 app/data/feats/Feats_settings.js | 4392 B | черты и таланты: Feats settings |
| №0731 app/data/feats/Feats_tcoe.js | 5779 B | черты и таланты: Feats tcoe |
| №0732 app/data/feats/Feats_ua_homebrew.js | 11770 B | черты и таланты: Feats ua homebrew |
| №0733 app/data/feats/Feats_xgte.js | 6729 B | черты и таланты: Feats xgte |
| №0734 app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №0735 app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №0736 app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №0737 app/data/maps/3d_stress_test_all.json | 165139 B | данные/конфигурация: 3d stress test all |
| №0738 app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №0739 app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №0740 app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №0741 app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №0742 app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №0743 app/data/spells/Focuses.js | 53387 B | данные заклинаний: Focuses |
| №0744 app/data/spells/Spells1lvl.js | 60079 B | данные заклинаний: Spells1lvl |
| №0745 app/data/spells/Spells2lvl.js | 70401 B | данные заклинаний: Spells2lvl |
| №0746 app/data/spells/Spells3lvl.js | 48531 B | данные заклинаний: Spells3lvl |
| №0747 app/data/spells/Spells4lvl.js | 39396 B | данные заклинаний: Spells4lvl |
| №0748 app/data/spells/Spells5lvl.js | 41719 B | данные заклинаний: Spells5lvl |
| №0749 app/data/spells/spells6lvl.js | 37855 B | данные заклинаний: spells6lvl |
| №0750 app/data/spells/Spells7lvl.js | 29194 B | данные заклинаний: Spells7lvl |
| №0751 app/data/spells/Spells8lvl.js | 21355 B | данные заклинаний: Spells8lvl |
| №0752 app/data/spells/Spells9lvl.js | 32625 B | данные заклинаний: Spells9lvl |
| №0753 app/data/subclasses/subclassesRegistry.js | 111805 B | логика подклассов: subclassesRegistry |
| №0754 app/debug.js | 5961 B | логический модуль: debug |
| №0755 app/dice.js | 42135 B | логический модуль: dice |
| №0756 app/dnd_tools.js | 18249 B | логический модуль: dnd tools |
| №0757 app/expanded_bestiary_v39.js | 49383 B | логический модуль: expanded bestiary v39 |
| №0758 app/expanded_class_registry_bridge.js | 5025 B | логический модуль: expanded class registry bridge |
| №0759 app/expanded_classes_v23.js | 30269 B | логический модуль: expanded classes v23 |
| №0760 app/expanded_subclasses_v23.js | 2030 B | логический модуль: expanded subclasses v23 |
| №0761 app/expansion_class_progressions.js | 6719 B | логический модуль: expansion class progressions |
| №0762 app/expansion_classes_pack.js | 352830 B | логический модуль: expansion classes pack |
| №0763 app/Experience.js | 6150 B | логический модуль: Experience |
| №0764 app/extra_class_ui_bridge.js | 645 B | логический модуль: extra class ui bridge |
| №0765 app/feat_engine.js | 11457 B | логический модуль: feat engine |
| №0766 app/gameplay_core_v57.js | 19219 B | логический модуль: gameplay core v57 |
| №0767 app/ghost_extra_runtime.js | 22293 B | логический модуль: ghost extra runtime |
| №0768 app/ghost_extra_ui.js | 2387 B | логический модуль: ghost extra ui |
| №0769 app/Hero-info.js | 11879 B | логический модуль: Hero info |
| №0770 app/icon_settings_v2.js | 10484 B | логический модуль: icon settings v2 |
| №0771 app/icon_settings.js | 11281 B | логический модуль: icon settings |
| №0772 app/inventory_containers_v54.js | 12772 B | логический модуль: inventory containers v54 |
| №0773 app/inventory-coins.js | 23961 B | логический модуль: inventory coins |
| №0774 app/inventory-modal.js | 32494 B | логический модуль: inventory modal |
| №0775 app/Inventory-weight-tracker.js | 15712 B | логический модуль: Inventory weight tracker |
| №0776 app/Inventory.js | 36307 B | логический модуль: Inventory |
| №0777 app/junk.js | 8387 B | логический модуль: junk |
| №0778 app/kibbles_localization_content_v71.js | 32339 B | логический модуль: kibbles localization content v71 |
| №0779 app/library.js | 9314 B | логический модуль: library |
| №0780 app/Logo.js | 5742 B | логический модуль: Logo |
| №0781 app/magic_engine.js | 7570 B | логический модуль: magic engine |
| №0782 app/market_economy_v55.js | 17219 B | логический модуль: market economy v55 |
| №0783 app/market_expansion_v55_1.js | 21531 B | логический модуль: market expansion v55 1 |
| №0784 app/market_social_v55_3.js | 11752 B | логический модуль: market social v55 3 |
| №0785 app/market_trade_v55_2.js | 25582 B | логический модуль: market trade v55 2 |
| №0786 app/martyr_mhp_2024_runtime.js | 33254 B | логический модуль: martyr mhp 2024 runtime |
| №0787 app/materials.js | 11976 B | логический модуль: materials |
| №0788 app/monster_engine.js | 17873 B | логический модуль: monster engine |
| №0789 app/monster_loot_crafting_bridge_v40.js | 31518 B | логический модуль: monster loot crafting bridge v40 |
| №0790 app/monster_loot_engine_v36.js | 13559 B | логический модуль: monster loot engine v36 |
| №0791 app/monster_loot_engine_v37.js | 18554 B | логический модуль: monster loot engine v37 |
| №0792 app/necromancer_mhp_2024_runtime.js | 43556 B | логический модуль: necromancer mhp 2024 runtime |
| №0793 app/network_engine.js | 45962 B | логический модуль: network engine |
| №0794 app/network_gameplay.js | 87259 B | логический модуль: network gameplay |
| №0795 app/notes.js | 4818 B | логический модуль: notes |
| №0796 app/occultist_kibbles_v11_runtime.js | 60686 B | логический модуль: occultist kibbles v11 runtime |
| №0797 app/onboarding_faq_v71.css | 6093 B | оформление интерфейса: onboarding faq v71 |
| №0798 app/onboarding_faq_v71.js | 32373 B | логический модуль: onboarding faq v71 |
| №0799 app/parasite_extra_runtime.js | 30047 B | логический модуль: parasite extra runtime |
| №0800 app/parasite_extra_ui.js | 4710 B | логический модуль: parasite extra ui |
| №0801 app/predictor_cards.js | 64976 B | логический модуль: predictor cards |
| №0802 app/predictor_deck_ui.js | 21847 B | логический модуль: predictor deck ui |
| №0803 app/predictor_movement.js | 5236 B | логический модуль: predictor movement |
| №0804 app/predictor_runtime.js | 30298 B | логический модуль: predictor runtime |
| №0805 app/Proficiencies.js | 31253 B | логический модуль: Proficiencies |
| №0806 app/Proficienciescheck.js | 10367 B | логический модуль: Proficienciescheck |
| №0807 app/races.js | 52239 B | логический модуль: races |
| №0808 app/resource_gathering_v35.js | 12423 B | логический модуль: resource gathering v35 |
| №0809 app/resource_processing_v44.js | 22150 B | логический модуль: resource processing v44 |
| №0810 app/rulesEngine.js | 43719 B | логический модуль: rulesEngine |
| №0811 app/runekeeper_taron_v12_runtime.js | 27697 B | логический модуль: runekeeper taron v12 runtime |
| №0812 app/savant_laserllama_v561_runtime.js | 29860 B | логический модуль: savant laserllama v561 runtime |
| №0813 app/secondary_entities_engine.js | 7144 B | логический модуль: secondary entities engine |
| №0814 app/Settings_debug.js | 7336 B | логический модуль: Settings debug |
| №0815 app/Settings.js | 59645 B | логический модуль: Settings |
| №0816 app/shifter_laserllama_v2_1_runtime.js | 38454 B | логический модуль: shifter laserllama v2 1 runtime |
| №0817 app/skills.js | 6367 B | логический модуль: skills |
| №0818 app/spellblade_kibbles_runtime.js | 14261 B | логический модуль: spellblade kibbles runtime |
| №0819 app/spells.js | 39220 B | логический модуль: spells |
| №0820 app/styles.css | 24174 B | оформление интерфейса: styles |
| №0821 app/summoning_engine.js | 11661 B | логический модуль: summoning engine |
| №0822 app/swarm_extra_runtime.js | 19936 B | логический модуль: swarm extra runtime |
| №0823 app/swipe-lock.js | 1838 B | логический модуль: swipe lock |
| №0824 app/turn_planner.js | 15930 B | логический модуль: turn planner |
| №0825 app/update_manager_v2.js | 19323 B | логический модуль: update manager v2 |
| №0826 app/update_scene_v2.js | 11560 B | логический модуль: update scene v2 |
| №0827 app/vessel_laserllama_v4_runtime.js | 48055 B | логический модуль: vessel laserllama v4 runtime |
| №0828 app/vtt_character_actions_v64.js | 4047 B | логический модуль: vtt character actions v64 |
| №0829 app/vtt_character_sheet_v63.js | 3966 B | логический модуль: vtt character sheet v63 |
| №0830 app/vtt_combat_event_bus_v69.js | 8287 B | логический модуль: vtt combat event bus v69 |
| №0831 app/vtt_combat_log_v66.js | 8113 B | логический модуль: vtt combat log v66 |
| №0832 app/vtt_debug_character_lab_v702.js | 16566 B | логический модуль: vtt debug character lab v702 |
| №0833 app/vtt_debug_dice_lab_v706.js | 9112 B | логический модуль: vtt debug dice lab v706 |
| №0834 app/vtt_debug_error_log_v709.js | 5965 B | логический модуль: vtt debug error log v709 |
| №0835 app/vtt_debug_lab_v703.js | 12151 B | логический модуль: vtt debug lab v703 |
| №0836 app/vtt_debug_panel_v70.js | 17285 B | логический модуль: vtt debug panel v70 |
| №0837 app/vtt_debug_rules_matrix_v707.js | 6881 B | логический модуль: vtt debug rules matrix v707 |
| №0838 app/vtt_debug_sandbox_v701.js | 14634 B | логический модуль: vtt debug sandbox v701 |
| №0839 app/vtt_debug_scenario_editor_v705.js | 10352 B | логический модуль: vtt debug scenario editor v705 |
| №0840 app/vtt_debug_scenarios_v704.js | 8385 B | логический модуль: vtt debug scenarios v704 |
| №0841 app/vtt_debug_tasks_v708.js | 25273 B | логический модуль: vtt debug tasks v708 |
| №0842 app/vtt_dice_resolution_v65.js | 3941 B | логический модуль: vtt dice resolution v65 |
| №0843 app/vtt_encounter_checkpoint_v68.js | 9606 B | логический модуль: vtt encounter checkpoint v68 |
| №0844 app/vtt_encounter_map_v59.js | 9462 B | логический модуль: vtt encounter map v59 |
| №0845 app/vtt_gameplay_ux_v58.js | 8641 B | логический модуль: vtt gameplay ux v58 |
| №0846 app/vtt_mobile_battle_v61.js | 4559 B | логический модуль: vtt mobile battle v61 |
| №0847 app/vtt_mobile_combat_hud_v62.js | 9071 B | логический модуль: vtt mobile combat hud v62 |
| №0848 app/vtt_mobile_session_v67.js | 11143 B | логический модуль: vtt mobile session v67 |
| №0849 app/vtt_project_manifest_v70.js | 44405 B | логический модуль: vtt project manifest v70 |
| №0850 app/vtt_token_interaction_v60.js | 8542 B | логический модуль: vtt token interaction v60 |
| №0851 app/Wallpapers.js | 19943 B | логический модуль: Wallpapers |
| №0852 app/walter_parasite_extra_runtime.js | 33758 B | логический модуль: walter parasite extra runtime |
| №0853 app/walter_parasite_ui.js | 4185 B | логический модуль: walter parasite ui |
| №0854 app/warden_mhp_2024_runtime.js | 41820 B | логический модуль: warden mhp 2024 runtime |
| №0855 app/warlord_laserllama_v330_runtime.js | 15866 B | логический модуль: warlord laserllama v330 runtime |
| №0856 app/weapons.js | 3380 B | логический модуль: weapons |
| №0857 app/weaponsheavy.js | 8328 B | логический модуль: weaponsheavy |
| №0858 app/weaponsmelee.js | 20232 B | логический модуль: weaponsmelee |
| №0859 app/weaponsranged.js | 18195 B | логический модуль: weaponsranged |
| №0860 app/weaponsspecial.js | 5655 B | логический модуль: weaponsspecial |
| №0861 app/world_resource_gathering_v53.js | 17353 B | логический модуль: world resource gathering v53 |
| №0862 arcanacards.png | 1820683 B | текстура/изображение: arcanacards |
| №0863 ash_v2_sprite.png | 442476 B | текстура/изображение: ash v2 sprite |
| №0864 bed.glb | 5718760 B | 3D модель/геометрия: bed |
| №0865 bookshelf.glb | 7818348 B | 3D модель/геометрия: bookshelf |
| №0866 chair.glb | 4643004 B | 3D модель/геометрия: chair |
| №0867 closet.glb | 6550260 B | 3D модель/геометрия: closet |
| №0868 commode.glb | 4845868 B | 3D модель/геометрия: commode |
| №0869 desktop/main.cjs | 8991 B | Electron: создание окна Windows |
| №0870 desktop/preload.cjs | 2239 B | Electron: preload и мост к UI |
| №0871 desktop/prepare.cjs | 3322 B | Electron: подготовка web ресурсов |
| №0872 desktop/update.cjs | 10917 B | Electron: обновление |
| №0873 DND_VTT_FURNITURE_CONVERSION_KIT.zip | 4072 B | архив ассетов: DND VTT FURNITURE CONVERSION KIT |
| №0874 DND_VTT_FURNITURE_READY_02.zip | 65111 B | архив ассетов: DND VTT FURNITURE READY 02 |
| №0875 DND_VTT_FURNITURE_READY_03.zip | 84538 B | архив ассетов: DND VTT FURNITURE READY 03 |
| №0876 DND_VTT_FURNITURE_READY_04.zip | 133763 B | архив ассетов: DND VTT FURNITURE READY 04 |
| №0877 DND_VTT_FURNITURE_READY_05.zip | 54294 B | архив ассетов: DND VTT FURNITURE READY 05 |
| №0878 DND_VTT_FURNITURE_READY_06.zip | 89087 B | архив ассетов: DND VTT FURNITURE READY 06 |
| №0879 DND_VTT_FURNITURE_READY_07.zip | 73932 B | архив ассетов: DND VTT FURNITURE READY 07 |
| №0880 DND_VTT_FURNITURE_READY_08.zip | 67621 B | архив ассетов: DND VTT FURNITURE READY 08 |
| №0881 DND_VTT_FURNITURE_READY_09_20_MODELS.zip | 101933 B | архив ассетов: DND VTT FURNITURE READY 09 20 MODELS |
| №0882 DND_VTT_REMAINING_GLB_BULK.zip | 5302181 B | архив ассетов: DND VTT REMAINING GLB BULK |
| №0883 docs/00_AI_PROJECT_GUIDE.md | 348444 B | документация или отчёт: 00 AI PROJECT GUIDE |
| №0884 docs/00_NEW_CHAT_PROMPT_V56_10.txt | 2658 B | документация или отчёт: 00 NEW CHAT PROMPT V56 10 |
| №0885 docs/00_NEW_CHAT_PROMPT_V56_11.txt | 2118 B | документация или отчёт: 00 NEW CHAT PROMPT V56 11 |
| №0886 docs/00_NEW_CHAT_PROMPT_V56_12.txt | 763 B | документация или отчёт: 00 NEW CHAT PROMPT V56 12 |
| №0887 docs/00_NEW_CHAT_PROMPT_V56_9.txt | 3900 B | документация или отчёт: 00 NEW CHAT PROMPT V56 9 |
| №0888 docs/2026-10-09_ota_v74_00_17_checkpoint.json | 1645 B | документация или отчёт: 2026 10 09 ota v74 00 17 checkpoint |
| №0889 docs/2026-10-09_ota_v74_00_17.md | 6180 B | документация или отчёт: 2026 10 09 ota v74 00 17 |
| №0890 docs/2026-10-11_ota_v74_00_57_checkpoint.json | 469 B | документация или отчёт: 2026 10 11 ota v74 00 57 checkpoint |
| №0891 docs/2026-10-11_ota_v74_00_57.md | 5873 B | документация или отчёт: 2026 10 11 ota v74 00 57 |
| №0892 docs/3D_ASSET_IMPORT_BATCHES.md | 32725 B | документация или отчёт: 3D ASSET IMPORT BATCHES |
| №0893 docs/3d_character_anatomy/ADULT_ANATOMY_PROGRESS.md | 43788 B | документация или отчёт: ADULT ANATOMY PROGRESS |
| №0894 docs/3d_character_anatomy/ASSET_AUDIT_2026-10-12.json | 22458 B | документация или отчёт: ASSET AUDIT 2026 10 12 |
| №0895 docs/3d_character_anatomy/SKIN_MATERIAL_PIPELINE.md | 7470 B | документация или отчёт: SKIN MATERIAL PIPELINE |
| №0896 docs/3d_character_journal/2026-10-09_01_morph_architecture.md | 2418 B | документация или отчёт: 2026 10 09 01 morph architecture |
| №0897 docs/3d_character_journal/2026-10-09_02_morph_bridge.md | 2712 B | документация или отчёт: 2026 10 09 02 morph bridge |
| №0898 docs/3d_character_journal/2026-10-09_03_morph_bridge_diagnostics.md | 1768 B | документация или отчёт: 2026 10 09 03 morph bridge diagnostics |
| №0899 docs/3d_character_journal/2026-10-09_04_skin_textures.md | 4995 B | документация или отчёт: 2026 10 09 04 skin textures |
| №0900 docs/3d_character_journal/2026-10-09_05_named_makehuman_morphs.md | 8679 B | документация или отчёт: 2026 10 09 05 named makehuman morphs |
| №0901 docs/3d_character_journal/2026-10-09_06_female_stage1_checkpoint.json | 5867 B | документация или отчёт: 2026 10 09 06 female stage1 checkpoint |
| №0902 docs/3d_character_journal/2026-10-09_06_female_stage1.md | 8415 B | документация или отчёт: 2026 10 09 06 female stage1 |
| №0903 docs/3d_character_journal/2026-10-09_07_female_stage2_checkpoint.json | 871 B | документация или отчёт: 2026 10 09 07 female stage2 checkpoint |
| №0904 docs/3d_character_journal/2026-10-09_07_female_stage2.md | 7677 B | документация или отчёт: 2026 10 09 07 female stage2 |
| №0905 docs/3d_character_journal/2026-10-09_08_female_release_checkpoint.json | 1725 B | документация или отчёт: 2026 10 09 08 female release checkpoint |
| №0906 docs/3d_character_journal/2026-10-09_08_female_release.md | 7794 B | документация или отчёт: 2026 10 09 08 female release |
| №0907 docs/3d_character_journal/2026-10-10_editor_v74_00_22.md | 6792 B | документация или отчёт: 2026 10 10 editor v74 00 22 |
| №0908 docs/3d_character_journal/2026-10-11_editor_v74_00_32.md | 1158 B | документация или отчёт: 2026 10 11 editor v74 00 32 |
| №0909 docs/3d_character_journal/2026-10-11_editor_v74_00_33.md | 1260 B | документация или отчёт: 2026 10 11 editor v74 00 33 |
| №0910 docs/3d_character_journal/2026-10-11_editor_v74_00_34.md | 3336 B | документация или отчёт: 2026 10 11 editor v74 00 34 |
| №0911 docs/3d_character_journal/2026-10-11_editor_v74_00_35.md | 3249 B | документация или отчёт: 2026 10 11 editor v74 00 35 |
| №0912 docs/3d_character_races/aarakocra.md | 4966 B | документация или отчёт: aarakocra |
| №0913 docs/3d_character_races/aasimar.md | 2398 B | документация или отчёт: aasimar |
| №0914 docs/3d_character_races/ANIMAL_HEADS.md | 5724 B | документация или отчёт: ANIMAL HEADS |
| №0915 docs/3d_character_races/autognome.md | 2759 B | документация или отчёт: autognome |
| №0916 docs/3d_character_races/AVIAN_ELEPHANT_HEADS.md | 5661 B | документация или отчёт: AVIAN ELEPHANT HEADS |
| №0917 docs/3d_character_races/bugbear.md | 4059 B | документация или отчёт: bugbear |
| №0918 docs/3d_character_races/centaur.md | 2896 B | документация или отчёт: centaur |
| №0919 docs/3d_character_races/changeling.md | 2162 B | документация или отчёт: changeling |
| №0920 docs/3d_character_races/dhampir.md | 1557 B | документация или отчёт: dhampir |
| №0921 docs/3d_character_races/dragonborn.md | 5010 B | документация или отчёт: dragonborn |
| №0922 docs/3d_character_races/dwarf_hill.md | 2179 B | документация или отчёт: dwarf hill |
| №0923 docs/3d_character_races/dwarf_mountain.md | 2179 B | документация или отчёт: dwarf mountain |
| №0924 docs/3d_character_races/elf_drow.md | 4152 B | документация или отчёт: elf drow |
| №0925 docs/3d_character_races/elf_high.md | 4150 B | документация или отчёт: elf high |
| №0926 docs/3d_character_races/elf_wood.md | 4135 B | документация или отчёт: elf wood |
| №0927 docs/3d_character_races/EXTRA_FORMS_PLAN.md | 5841 B | документация или отчёт: EXTRA FORMS PLAN |
| №0928 docs/3d_character_races/fairy.md | 2154 B | документация или отчёт: fairy |
| №0929 docs/3d_character_races/firbolg.md | 1211 B | документация или отчёт: firbolg |
| №0930 docs/3d_character_races/full_orc.md | 2994 B | документация или отчёт: full orc |
| №0931 docs/3d_character_races/FUR_PACK.md | 3742 B | документация или отчёт: FUR PACK |
| №0932 docs/3d_character_races/genasi_air.md | 1474 B | документация или отчёт: genasi air |
| №0933 docs/3d_character_races/genasi_earth.md | 1519 B | документация или отчёт: genasi earth |
| №0934 docs/3d_character_races/genasi_fire.md | 1527 B | документация или отчёт: genasi fire |
| №0935 docs/3d_character_races/genasi_water.md | 1464 B | документация или отчёт: genasi water |
| №0936 docs/3d_character_races/ghost.md | 5482 B | документация или отчёт: ghost |
| №0937 docs/3d_character_races/githyanki.md | 1321 B | документация или отчёт: githyanki |
| №0938 docs/3d_character_races/githzerai.md | 1321 B | документация или отчёт: githzerai |
| №0939 docs/3d_character_races/gnome_forest.md | 2175 B | документация или отчёт: gnome forest |
| №0940 docs/3d_character_races/gnome_rock.md | 2177 B | документация или отчёт: gnome rock |
| №0941 docs/3d_character_races/goblin.md | 1278 B | документация или отчёт: goblin |
| №0942 docs/3d_character_races/goliath.md | 1362 B | документация или отчёт: goliath |
| №0943 docs/3d_character_races/hadozee.md | 4245 B | документация или отчёт: hadozee |
| №0944 docs/3d_character_races/HAIR_PACK.md | 4833 B | документация или отчёт: HAIR PACK |
| №0945 docs/3d_character_races/half_elf.md | 4189 B | документация или отчёт: half elf |
| №0946 docs/3d_character_races/half_orc.md | 3002 B | документация или отчёт: half orc |
| №0947 docs/3d_character_races/halfling_lightfoot.md | 3486 B | документация или отчёт: halfling lightfoot |
| №0948 docs/3d_character_races/halfling_stout.md | 3482 B | документация или отчёт: halfling stout |
| №0949 docs/3d_character_races/harengon.md | 5657 B | документация или отчёт: harengon |
| №0950 docs/3d_character_races/hexblood.md | 1643 B | документация или отчёт: hexblood |
| №0951 docs/3d_character_races/hobgoblin.md | 1210 B | документация или отчёт: hobgoblin |
| №0952 docs/3d_character_races/kalashtar.md | 1410 B | документация или отчёт: kalashtar |
| №0953 docs/3d_character_races/kender.md | 1159 B | документация или отчёт: kender |
| №0954 docs/3d_character_races/kenku.md | 5013 B | документация или отчёт: kenku |
| №0955 docs/3d_character_races/kobold.md | 4696 B | документация или отчёт: kobold |
| №0956 docs/3d_character_races/lizardfolk.md | 4944 B | документация или отчёт: lizardfolk |
| №0957 docs/3d_character_races/loxodon.md | 4673 B | документация или отчёт: loxodon |
| №0958 docs/3d_character_races/minotaur.md | 6054 B | документация или отчёт: minotaur |
| №0959 docs/3d_character_races/myconid.md | 1846 B | документация или отчёт: myconid |
| №0960 docs/3d_character_races/NATIVE_LIMBS.md | 6433 B | документация или отчёт: NATIVE LIMBS |
| №0961 docs/3d_character_races/owlin.md | 5120 B | документация или отчёт: owlin |
| №0962 docs/3d_character_races/parasite.md | 3100 B | документация или отчёт: parasite |
| №0963 docs/3d_character_races/plasmoid.md | 1933 B | документация или отчёт: plasmoid |
| №0964 docs/3d_character_races/RACES_3D_REMAINING_AUDIT_2026-10-12.md | 35486 B | документация или отчёт: RACES 3D REMAINING AUDIT 2026 10 12 |
| №0965 docs/3d_character_races/reborn.md | 1619 B | документация или отчёт: reborn |
| №0966 docs/3d_character_races/REMAINING_WORK.md | 23848 B | документация или отчёт: REMAINING WORK |
| №0967 docs/3d_character_races/satyr.md | 5063 B | документация или отчёт: satyr |
| №0968 docs/3d_character_races/shifter.md | 3214 B | документация или отчёт: shifter |
| №0969 docs/3d_character_races/simic_hybrid.md | 2647 B | документация или отчёт: simic hybrid |
| №0970 docs/3d_character_races/swarm_bats.md | 1019 B | документация или отчёт: swarm bats |
| №0971 docs/3d_character_races/swarm_beetles.md | 6967 B | документация или отчёт: swarm beetles |
| №0972 docs/3d_character_races/SWARM_DENSE_REDESIGN.md | 9032 B | документация или отчёт: SWARM DENSE REDESIGN |
| №0973 docs/3d_character_races/swarm_rats.md | 6463 B | документация или отчёт: swarm rats |
| №0974 docs/3d_character_races/tabaxi.md | 6015 B | документация или отчёт: tabaxi |
| №0975 docs/3d_character_races/TEXTURE_PACK_CHECKPOINT.md | 17270 B | документация или отчёт: TEXTURE PACK CHECKPOINT |
| №0976 docs/3d_character_races/TIEFLING_DETAIL_REDESIGN.md | 7294 B | документация или отчёт: TIEFLING DETAIL REDESIGN |
| №0977 docs/3d_character_races/tiefling.md | 2992 B | документация или отчёт: tiefling |
| №0978 docs/3d_character_races/tortle.md | 5805 B | документация или отчёт: tortle |
| №0979 docs/3d_character_races/triton.md | 1588 B | документация или отчёт: triton |
| №0980 docs/3d_character_races/vedalken.md | 1301 B | документация или отчёт: vedalken |
| №0981 docs/3d_character_races/walter_parasite.md | 3278 B | документация или отчёт: walter parasite |
| №0982 docs/3d_character_races/warforged.md | 2731 B | документация или отчёт: warforged |
| №0983 docs/3d_character_races/yuan_ti.md | 1669 B | документация или отчёт: yuan ti |
| №0984 docs/CLASS_IMPLEMENTATION_PLAN.md | 19250 B | документация или отчёт: CLASS IMPLEMENTATION PLAN |
| №0985 docs/CLASS_MECHANICS_SPEC.md | 38943 B | документация или отчёт: CLASS MECHANICS SPEC |
| №0986 docs/CLOUD_CHARACTER_SYNC.md | 31142 B | документация или отчёт: CLOUD CHARACTER SYNC |
| №0987 docs/CLOUD_SAVE_CALLERS.txt | 1869 B | документация или отчёт: CLOUD SAVE CALLERS |
| №0988 docs/DND_VTT_CLASS_AUDIT_V74_00_17.md | 184356 B | документация или отчёт: DND VTT CLASS AUDIT V74 00 17 |
| №0989 docs/Help.txt | 110717 B | документация или отчёт: Help |
| №0990 docs/KIBBLES_ATTRIBUTION_V71.md | 803 B | документация или отчёт: KIBBLES ATTRIBUTION V71 |
| №0991 docs/map-stage-740019.md | 1675 B | документация или отчёт: map stage 740019 |
| №0992 docs/map-stage-740021.md | 2000 B | документация или отчёт: map stage 740021 |
| №0993 docs/NETWORK_APK_NOTES.md | 7296 B | документация или отчёт: NETWORK APK NOTES |
| №0994 docs/PREDICTOR_APPROVED_CARD_STATUS.md | 19972 B | документация или отчёт: PREDICTOR APPROVED CARD STATUS |
| №0995 docs/PREDICTOR_CLASS_SPEC.md | 90126 B | документация или отчёт: PREDICTOR CLASS SPEC |
| №0996 docs/ROOT_FURNITURE_IMPORT_REPORT.md | 6882 B | документация или отчёт: ROOT FURNITURE IMPORT REPORT |
| №0997 docs/SIGNATURE_ASSET_FIX_74_00_66.md | 1729 B | документация или отчёт: SIGNATURE ASSET FIX 74 00 66 |
| №0998 docs/SUPABASE_MAIL_SETUP_PROMPT_RU.md | 2853 B | документация или отчёт: SUPABASE MAIL SETUP PROMPT RU |
| №0999 docs/UNIFIED_RELEASE.md | 6136 B | документация или отчёт: UNIFIED RELEASE |
| №1000 docs/WINDOWS_DESKTOP.md | 3756 B | документация или отчёт: WINDOWS DESKTOP |
| №1001 dragon_fire_v2_sprite.png | 1013123 B | текстура/изображение: dragon fire v2 sprite |
| №1002 embers_v2_sprite.png | 698014 B | текстура/изображение: embers v2 sprite |
| №1003 FAQ.md | 38563 B | документация или отчёт: FAQ |
| №1004 fire_front_v2_sprite.png | 2249732 B | текстура/изображение: fire front v2 sprite |
| №1005 fire_spread_mask_v2_sprite.png | 1373284 B | текстура/изображение: fire spread mask v2 sprite |
| №1006 flash_v2_sprite.png | 803264 B | текстура/изображение: flash v2 sprite |
| №1007 floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1008 floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1009 floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1010 floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1011 floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1012 floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1013 floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1014 floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1015 floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1016 floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1017 floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1018 floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1019 floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1020 floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1021 floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1022 floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1023 floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1024 floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1025 GLENMORIL Soundtrack - Music Box.mp3 | 1827664 B | аудиофайл: GLENMORIL Soundtrack   Music Box |
| №1026 gltf_catalog.js | 3197 B | логический модуль: gltf catalog |
| №1027 heat_glow_v2_sprite.png | 836371 B | текстура/изображение: heat glow v2 sprite |
| №1028 human-base-rigged.glb | 4994640 B | 3D модель/геометрия: human base rigged |
| №1029 index.html | 89700 B | HTML-точка входа; интерфейс и порядок JS загрузки |
| №1030 Jalan Jalan - Lotus.mp3 | 9083034 B | аудиофайл: Jalan Jalan   Lotus |
| №1031 lineage_2_16. Shepard's Flute.mp3 | 2997816 B | аудиофайл: lineage 2 16. Shepard's Flute |
| №1032 manifest.json | 488 B | данные/конфигурация: manifest |
| №1033 Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3 | 4020570 B | аудиофайл: Oliver DeRiviere   Prelude to an End (grizzlymusic.ru) |
| №1034 Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3 | 3530381 B | аудиофайл: Oliver Deriviere   Who Am I (grizzlymusic.ru) |
| №1035 package.json | 1608 B | npm и упаковка desktop EXE |
| №1036 PROJECT_ATLAS.md | генерируется | машиночитаемая карта репозитория для ИИ |
| №1037 PROJECT_ATLAS.txt | генерируется | человекочитаемая карта репозитория |
| №1038 README.md | 145 B | документация или отчёт: README |
| №1039 smoke_back_v2_sprite-1.png | 1707378 B | текстура/изображение: smoke back v2 sprite 1 |
| №1040 smoke_back_v2_sprite.png | 1814587 B | текстура/изображение: smoke back v2 sprite |
| №1041 smoke_front_v2_sprite-1.png | 1890480 B | текстура/изображение: smoke front v2 sprite 1 |
| №1042 smoke_front_v2_sprite.png | 2064687 B | текстура/изображение: smoke front v2 sprite |
| №1043 smoke_mid_v2_sprite.png | 1898516 B | текстура/изображение: smoke mid v2 sprite |
| №1044 supabase/migrations/202610130001_characters.sql | 4421 B | SQL миграция Supabase |
| №1045 table.glb | 6217412 B | 3D модель/геометрия: table |
| №1046 tests/alchemist_combat_test.js | 19298 B | автотест: alchemist combat test |
| №1047 tests/alchemist_runtime_test.js | 41827 B | автотест: alchemist runtime test |
| №1048 tests/character_3d_editor_test.js | 14206 B | автотест: character 3d editor test |
| №1049 tests/character_3d_foundation_test.js | 15396 B | автотест: character 3d foundation test |
| №1050 tests/character_3d_morph_assets_test.js | 5179 B | автотест: character 3d morph assets test |
| №1051 tests/character_3d_skin_assets_test.js | 1827 B | автотест: character 3d skin assets test |
| №1052 tests/character_3d_skin_morph_test.js | 3032 B | автотест: character 3d skin morph test |
| №1053 tests/character_adult_anatomy_test.js | 4704 B | автотест: character adult anatomy test |
| №1054 tests/character_animal_heads_test.js | 4415 B | автотест: character animal heads test |
| №1055 tests/character_appearance_store_test.js | 2308 B | автотест: character appearance store test |
| №1056 tests/character_avian_elephant_heads_test.js | 5125 B | автотест: character avian elephant heads test |
| №1057 tests/character_clothing_customizer_geometry_test.js | 4676 B | автотест: character clothing customizer geometry test |
| №1058 tests/character_clothing_options_test.js | 1922 B | автотест: character clothing options test |
| №1059 tests/character_clothing_test.js | 7286 B | автотест: character clothing test |
| №1060 tests/character_editor_morph_assets_test.js | 4783 B | автотест: character editor morph assets test |
| №1061 tests/character_elf_details_test.js | 2787 B | автотест: character elf details test |
| №1062 tests/character_external_anatomy_test.js | 7930 B | автотест: character external anatomy test |
| №1063 tests/character_fur_test.js | 3520 B | автотест: character fur test |
| №1064 tests/character_ghost_geometry_test.js | 3867 B | автотест: character ghost geometry test |
| №1065 tests/character_hair_pack_test.js | 2838 B | автотест: character hair pack test |
| №1066 tests/character_head_geometry_test.js | 3575 B | автотест: character head geometry test |
| №1067 tests/character_male_anatomy_fix_test.js | 3902 B | автотест: character male anatomy fix test |
| №1068 tests/character_native_limbs_test.js | 4909 B | автотест: character native limbs test |
| №1069 tests/character_parasites_geometry_test.js | 3738 B | автотест: character parasites geometry test |
| №1070 tests/character_races_geometry_test.js | 19702 B | автотест: character races geometry test |
| №1071 tests/character_reptile_heads_test.js | 3734 B | автотест: character reptile heads test |
| №1072 tests/character_skin_material_test.js | 3816 B | автотест: character skin material test |
| №1073 tests/character_swarm_geometry_test.js | 3505 B | автотест: character swarm geometry test |
| №1074 tests/character_tiefling_details_test.js | 4451 B | автотест: character tiefling details test |
| №1075 tests/cloud_rls_test.sql | 5342 B | автотест: cloud rls test |
| №1076 tests/cloud_sql_concurrency.cjs | 2072 B | автотест: cloud sql concurrency |
| №1077 tests/cloud_sync_test.cjs | 19921 B | автотест: cloud sync test |
| №1078 tests/crafting_disassembly_v51_test.js | 3052 B | автотест: crafting disassembly v51 test |
| №1079 tests/crafting_dlc_v50_test.js | 2668 B | автотест: crafting dlc v50 test |
| №1080 tests/crafting_economy_v49_test.js | 1974 B | автотест: crafting economy v49 test |
| №1081 tests/creation_signature_asset_test.cjs | 3935 B | автотест: creation signature asset test |
| №1082 tests/desktop_update_contract.cjs | 4025 B | автотест: desktop update contract |
| №1083 tests/fixtures/cloud_auth.sql | 711 B | автотест: cloud auth |
| №1084 tests/fixtures/female_anatomy_74_00_59.json | 251 B | автотест: female anatomy 74 00 59 |
| №1085 tests/generate_makehuman_glb_morph_fixture.js | 4454 B | автотест: generate makehuman glb morph fixture |
| №1086 tests/gltf_loader_smoke.cjs | 3734 B | автотест: gltf loader smoke |
| №1087 tests/helpers/class_runtime_harness.js | 2323 B | автотест: class runtime harness |
| №1088 tests/human_base_glb_audit.js | 2158 B | автотест: human base glb audit |
| №1089 tests/imported_3d_editor_assets.cjs | 2157 B | автотест: imported 3d editor assets |
| №1090 tests/makehuman_gender_fixture_audit.js | 4646 B | автотест: makehuman gender fixture audit |
| №1091 tests/makehuman_gender_recipe_test.js | 5498 B | автотест: makehuman gender recipe test |
| №1092 tests/makehuman_glb_morph_fixture_audit.js | 1703 B | автотест: makehuman glb morph fixture audit |
| №1093 tests/makehuman_morph_bridge.js | 9756 B | автотест: makehuman morph bridge |
| №1094 tests/makehuman_surface_mapping_audit.js | 9447 B | автотест: makehuman surface mapping audit |
| №1095 tests/makehuman_target_reverse_transfer_audit.js | 10959 B | автотест: makehuman target reverse transfer audit |
| №1096 tests/makehuman_target_surface_transfer_audit.js | 12260 B | автотест: makehuman target surface transfer audit |
| №1097 tests/makehuman_topology_audit.js | 5878 B | автотест: makehuman topology audit |
| №1098 tests/makehuman_uv_bridge_test.js | 1465 B | автотест: makehuman uv bridge test |
| №1099 tests/makehuman_vertex_mapping_audit.js | 7410 B | автотест: makehuman vertex mapping audit |
| №1100 tests/map_editor_dom_test.js | 3347 B | автотест: map editor dom test |
| №1101 tests/map_rebuild_world_test.js | 3815 B | автотест: map rebuild world test |
| №1102 tests/predictor_aura_ledger_test.cjs | 12810 B | автотест: predictor aura ledger test |
| №1103 tests/predictor_blind_test.cjs | 4972 B | автотест: predictor blind test |
| №1104 tests/predictor_cards_test.cjs | 10793 B | автотест: predictor cards test |
| №1105 tests/predictor_cloud_sync_test.cjs | 22401 B | автотест: predictor cloud sync test |
| №1106 tests/predictor_deck_ui_test.cjs | 17088 B | автотест: predictor deck ui test |
| №1107 tests/predictor_motion_cards_test.cjs | 11690 B | автотест: predictor motion cards test |
| №1108 tests/predictor_movement_cards_test.cjs | 7196 B | автотест: predictor movement cards test |
| №1109 tests/predictor_runtime_test.cjs | 10585 B | автотест: predictor runtime test |
| №1110 tests/predictor_status_cards_test.cjs | 13936 B | автотест: predictor status cards test |
| №1111 tests/predictor_tactics_cards_test.cjs | 11334 B | автотест: predictor tactics cards test |
| №1112 tests/predictor_trickster_test.cjs | 10554 B | автотест: predictor trickster test |
| №1113 tests/predictor_turn_effects_test.cjs | 13273 B | автотест: predictor turn effects test |
| №1114 tests/predictor_vision_control_test.cjs | 12922 B | автотест: predictor vision control test |
| №1115 tests/pugilist_combat_test.js | 21085 B | автотест: pugilist combat test |
| №1116 tests/pugilist_runtime_test.js | 4834 B | автотест: pugilist runtime test |
| №1117 tests/stair_navigation.cjs | 2520 B | автотест: stair navigation |
| №1118 tests/test_blood_hunter_completion.js | 8673 B | автотест: test blood hunter completion |
| №1119 tests/test_blood_hunter_focus_network.js | 3203 B | автотест: test blood hunter focus network |
| №1120 tests/test_blood_hunter_orders.js | 9810 B | автотест: test blood hunter orders |
| №1121 tests/test_blood_hunter_patron_selection.js | 4699 B | автотест: test blood hunter patron selection |
| №1122 tests/test_blood_hunter_profane_focus.js | 6459 B | автотест: test blood hunter profane focus |
| №1123 tests/test_class_audit_runtime.js | 14611 B | автотест: test class audit runtime |
| №1124 tests/test_class_audit_stage2_runtime.js | 15372 B | автотест: test class audit stage2 runtime |
| №1125 tests/test_class_audit_stage3_runtime.js | 16610 B | автотест: test class audit stage3 runtime |
| №1126 tests/test_class_audit_stage4_runtime.js | 23853 B | автотест: test class audit stage4 runtime |
| №1127 tests/test_v52.js | 2202 B | автотест: test v52 |
| №1128 tests/test_v53.js | 2507 B | автотест: test v53 |
| №1129 tests/test_v54.js | 2148 B | автотест: test v54 |
| №1130 tests/test_v55_2.js | 4154 B | автотест: test v55 2 |
| №1131 tests/test_v55_3.js | 2635 B | автотест: test v55 3 |
| №1132 tests/test_v55.js | 2152 B | автотест: test v55 |
| №1133 tests/test_v56_1.js | 1667 B | автотест: test v56 1 |
| №1134 tests/test_v56_10.js | 2140 B | автотест: test v56 10 |
| №1135 tests/test_v56_11.js | 1791 B | автотест: test v56 11 |
| №1136 tests/test_v56_12.js | 1665 B | автотест: test v56 12 |
| №1137 tests/test_v56_13.js | 2465 B | автотест: test v56 13 |
| №1138 tests/test_v56_2.js | 1697 B | автотест: test v56 2 |
| №1139 tests/test_v56_3.js | 1363 B | автотест: test v56 3 |
| №1140 tests/test_v56_4.js | 1458 B | автотест: test v56 4 |
| №1141 tests/test_v56_5.js | 1745 B | автотест: test v56 5 |
| №1142 tests/test_v56_6.js | 1439 B | автотест: test v56 6 |
| №1143 tests/test_v56_8.js | 1516 B | автотест: test v56 8 |
| №1144 tests/test_v56_9.js | 1734 B | автотест: test v56 9 |
| №1145 tests/test_v56.js | 3572 B | автотест: test v56 |
| №1146 tests/test_v57.js | 2554 B | автотест: test v57 |
| №1147 tests/test_v58.js | 1847 B | автотест: test v58 |
| №1148 tests/test_v59.js | 878 B | автотест: test v59 |
| №1149 tests/test_v60.js | 860 B | автотест: test v60 |
| №1150 tests/test_v61.js | 961 B | автотест: test v61 |
| №1151 tests/test_v62.js | 800 B | автотест: test v62 |
| №1152 tests/test_v63.js | 364 B | автотест: test v63 |
| №1153 tests/test_v64.js | 312 B | автотест: test v64 |
| №1154 tests/test_v65.js | 335 B | автотест: test v65 |
| №1155 tests/test_v66.js | 373 B | автотест: test v66 |
| №1156 tests/test_v67.js | 628 B | автотест: test v67 |
| №1157 tests/test_v68.js | 984 B | автотест: test v68 |
| №1158 tests/test_v69.js | 1713 B | автотест: test v69 |
| №1159 tests/test_v70.js | 2112 B | автотест: test v70 |
| №1160 tests/test_v701.js | 2425 B | автотест: test v701 |
| №1161 tests/test_v702.js | 4409 B | автотест: test v702 |
| №1162 tests/test_v703.js | 2646 B | автотест: test v703 |
| №1163 tests/test_v704.js | 2402 B | автотест: test v704 |
| №1164 tests/test_v705.js | 2717 B | автотест: test v705 |
| №1165 tests/test_v706.js | 1414 B | автотест: test v706 |
| №1166 tests/test_v707.js | 1066 B | автотест: test v707 |
| №1167 tests/test_v708_fixes.js | 2968 B | автотест: test v708 fixes |
| №1168 tests/test_v709_fixes.js | 2128 B | автотест: test v709 fixes |
| №1169 tests/test_v710_fixes.js | 2223 B | автотест: test v710 fixes |
| №1170 tests/test_v711_fixes.js | 1037 B | автотест: test v711 fixes |
| №1171 tests/test_v712_fixes.js | 1675 B | автотест: test v712 fixes |
| №1172 tests/test_v713_fixes.js | 2127 B | автотест: test v713 fixes |
| №1173 tests/test_v714_fixes.js | 1727 B | автотест: test v714 fixes |
| №1174 tests/test_v715_fixes.js | 1817 B | автотест: test v715 fixes |
| №1175 tests/test_v716_fixes.js | 1980 B | автотест: test v716 fixes |
| №1176 tests/test_v717_fixes.js | 2657 B | автотест: test v717 fixes |
| №1177 tests/test_v718_fixes.js | 1001 B | автотест: test v718 fixes |
| №1178 tests/test_v719_fixes.js | 1156 B | автотест: test v719 fixes |
| №1179 tests/test_v720_fixes.js | 1621 B | автотест: test v720 fixes |
| №1180 tests/test_v721_fixes.js | 3536 B | автотест: test v721 fixes |
| №1181 tests/test_v722_fixes.js | 3509 B | автотест: test v722 fixes |
| №1182 tests/test_v723_fixes.js | 4780 B | автотест: test v723 fixes |
| №1183 tests/test_v724_fixes.js | 2330 B | автотест: test v724 fixes |
| №1184 tests/test_v725_fixes.js | 4026 B | автотест: test v725 fixes |
| №1185 tests/test_v726_fixes.js | 3809 B | автотест: test v726 fixes |
| №1186 tests/test_v727_fixes.js | 3061 B | автотест: test v727 fixes |
| №1187 tests/test_v728_fixes.js | 2641 B | автотест: test v728 fixes |
| №1188 tests/test_v729_fixes.js | 1372 B | автотест: test v729 fixes |
| №1189 tests/test_v730_fixes.js | 2190 B | автотест: test v730 fixes |
| №1190 tests/test_v731_fixes.js | 1649 B | автотест: test v731 fixes |
| №1191 tests/test_v732_fixes.js | 2794 B | автотест: test v732 fixes |
| №1192 tests/test_v733_logic_audit.js | 2286 B | автотест: test v733 logic audit |
| №1193 tests/test_v734_network_concentration.js | 1522 B | автотест: test v734 network concentration |
| №1194 tests/test_v735_logic_rules.js | 1885 B | автотест: test v735 logic rules |
| №1195 tests/test_v736_deep_rules.js | 4307 B | автотест: test v736 deep rules |
| №1196 tests/test_v737_spellcasting_transaction.js | 5283 B | автотест: test v737 spellcasting transaction |
| №1197 tests/test_v738_multiclass_spell_sources.js | 5402 B | автотест: test v738 multiclass spell sources |
| №1198 tests/test_v739_prepared_transaction.js | 4317 B | автотест: test v739 prepared transaction |
| №1199 tests/test_v740_concentration_lifecycle.js | 2114 B | автотест: test v740 concentration lifecycle |
| №1200 tests/test_v741_damage_pipeline.js | 2462 B | автотест: test v741 damage pipeline |
| №1201 tests/test_v742_character_combatant_sync.js | 3540 B | автотест: test v742 character combatant sync |
| №1202 tests/test_v743_authority_recharge_events.js | 2228 B | автотест: test v743 authority recharge events |
| №1203 tests/test_v744_sync_authority_save.js | 2516 B | автотест: test v744 sync authority save |
| №1204 tests/test_v745_host_handoff.js | 2112 B | автотест: test v745 host handoff |
| №1205 tests/test_v746_authoritative_save_recharge.js | 3032 B | автотест: test v746 authoritative save recharge |
| №1206 tests/test_v747_event_race_compaction.js | 3064 B | автотест: test v747 event race compaction |
| №1207 tests/test_v748_full_combat_transaction.js | 5181 B | автотест: test v748 full combat transaction |
| №1208 tests/test_v749_monster_authority_reaction_order.js | 2661 B | автотест: test v749 monster authority reaction order |
| №1209 tests/test_v750_resignal_reaction_monster_rpc.js | 1973 B | автотест: test v750 resignal reaction monster rpc |
| №1210 tests/test_v751_authoritative_replay_rollback.js | 1185 B | автотест: test v751 authoritative replay rollback |
| №1211 tests/test_v752_replay_hash_authority.js | 2033 B | автотест: test v752 replay hash authority |
| №1212 tests/test_v753_replay_transaction_rng.js | 1195 B | автотест: test v753 replay transaction rng |
| №1213 tests/test_v754_update_manager.js | 2816 B | автотест: test v754 update manager |
| №1214 tests/test_v755_creation_buckets.js | 3973 B | автотест: test v755 creation buckets |
| №1215 tests/test_v755_update_scene.js | 3625 B | автотест: test v755 update scene |
| №1216 tests/update_ota_flow_test.js | 8469 B | автотест: update ota flow test |
| №1217 tools/audit_adult_body_assets.py | 5868 B | скрипт разработчика: audit adult body assets |
| №1218 tools/build_character_editor_morphs.js | 4493 B | скрипт разработчика: build character editor morphs |
| №1219 tools/build_cloud_tests.sh | 1945 B | скрипт разработчика: build cloud tests |
| №1220 tools/build_makehuman_morphs.js | 8803 B | скрипт разработчика: build makehuman morphs |
| №1221 tools/build_skin_microtexture.py | 1254 B | скрипт разработчика: build skin microtexture |
| №1222 tools/build_update_manifest.py | 3881 B | скрипт разработчика: build update manifest |
| №1223 tools/check_adult_anatomy_browser.js | 7862 B | скрипт разработчика: check adult anatomy browser |
| №1224 tools/check_adult_base_browser.js | 4732 B | скрипт разработчика: check adult base browser |
| №1225 tools/check_animal_heads_browser.js | 6045 B | скрипт разработчика: check animal heads browser |
| №1226 tools/check_avian_elephant_heads_browser.js | 6052 B | скрипт разработчика: check avian elephant heads browser |
| №1227 tools/check_avian_races_browser.js | 6195 B | скрипт разработчика: check avian races browser |
| №1228 tools/check_character_clothing_closeups.js | 3941 B | скрипт разработчика: check character clothing closeups |
| №1229 tools/check_character_clothing_customizer.js | 8611 B | скрипт разработчика: check character clothing customizer |
| №1230 tools/check_character_dress_customizer.js | 4892 B | скрипт разработчика: check character dress customizer |
| №1231 tools/check_character_editor_browser.js | 24473 B | скрипт разработчика: check character editor browser |
| №1232 tools/check_character_head_browser.js | 7169 B | скрипт разработчика: check character head browser |
| №1233 tools/check_character_races_browser.js | 14773 B | скрипт разработчика: check character races browser |
| №1234 tools/check_cloud_account_browser.cjs | 7054 B | скрипт разработчика: check cloud account browser |
| №1235 tools/check_dense_swarm_browser.js | 6299 B | скрипт разработчика: check dense swarm browser |
| №1236 tools/check_elf_details_browser.js | 5791 B | скрипт разработчика: check elf details browser |
| №1237 tools/check_external_anatomy_browser.js | 9967 B | скрипт разработчика: check external anatomy browser |
| №1238 tools/check_feather_surface_browser.js | 8888 B | скрипт разработчика: check feather surface browser |
| №1239 tools/check_fur_browser.js | 6062 B | скрипт разработчика: check fur browser |
| №1240 tools/check_fur_surface_browser.js | 8973 B | скрипт разработчика: check fur surface browser |
| №1241 tools/check_ghost_browser.js | 8977 B | скрипт разработчика: check ghost browser |
| №1242 tools/check_hair_pack_browser.js | 5826 B | скрипт разработчика: check hair pack browser |
| №1243 tools/check_kobold_tabaxi_browser.js | 6240 B | скрипт разработчика: check kobold tabaxi browser |
| №1244 tools/check_last_races_browser.js | 7457 B | скрипт разработчика: check last races browser |
| №1245 tools/check_male_anatomy_browser.js | 6082 B | скрипт разработчика: check male anatomy browser |
| №1246 tools/check_map_browser.js | 3805 B | скрипт разработчика: check map browser |
| №1247 tools/check_mechanical_races_browser.js | 6158 B | скрипт разработчика: check mechanical races browser |
| №1248 tools/check_modular_races_browser.js | 5826 B | скрипт разработчика: check modular races browser |
| №1249 tools/check_native_limbs_browser.js | 7153 B | скрипт разработчика: check native limbs browser |
| №1250 tools/check_parasites_browser.js | 6584 B | скрипт разработчика: check parasites browser |
| №1251 tools/check_pose_browser.js | 7090 B | скрипт разработчика: check pose browser |
| №1252 tools/check_quartet_races_browser.js | 6706 B | скрипт разработчика: check quartet races browser |
| №1253 tools/check_reptile_heads_browser.js | 5336 B | скрипт разработчика: check reptile heads browser |
| №1254 tools/check_reptile_races_browser.js | 5781 B | скрипт разработчика: check reptile races browser |
| №1255 tools/check_reptile_surface_browser.js | 7114 B | скрипт разработчика: check reptile surface browser |
| №1256 tools/check_skin_material_browser.js | 11016 B | скрипт разработчика: check skin material browser |
| №1257 tools/check_small_armor_browser.js | 3698 B | скрипт разработчика: check small armor browser |
| №1258 tools/check_swarm_browser.js | 7847 B | скрипт разработчика: check swarm browser |
| №1259 tools/check_tiefling_browser.js | 7273 B | скрипт разработчика: check tiefling browser |
| №1260 tools/check_tiefling_details_browser.js | 6694 B | скрипт разработчика: check tiefling details browser |
| №1261 tools/cloud_test.init.gradle | 781 B | скрипт разработчика: cloud test.init |
| №1262 tools/convert_remaining_furniture.py | 4297 B | скрипт разработчика: convert remaining furniture |
| №1263 tools/finalize_v741.py | 3280 B | скрипт разработчика: finalize v741 |
| №1264 tools/generate_project_atlas.cjs | 12690 B | автоматический генератор этого атласа |
| №1265 tools/install_native_build_tools.sh | 2975 B | скрипт разработчика: install native build tools |
| №1266 tools/makehuman_gender_channels.json | 4749 B | скрипт разработчика: makehuman gender channels |
| №1267 tools/makehuman_morph_channels.json | 448 B | скрипт разработчика: makehuman morph channels |
| №1268 tools/prepare_makehuman_gender.js | 5599 B | скрипт разработчика: prepare makehuman gender |
| №1269 tools/run_tests_v731.js | 5062 B | скрипт разработчика: run tests v731 |
| №1270 tools/sync_manifest.py | 2034 B | скрипт разработчика: sync manifest |
| №1271 tools/test_cloud_sql.sh | 1088 B | скрипт разработчика: test cloud sql |
| №1272 tools/unified_version.py | 3403 B | скрипт разработчика: unified version |
| №1273 updates/beta.json | 211 B | метаданные обновлений: beta |
| №1274 updates/README.md | 233 B | документация или отчёт: README |
| №1275 updates/stable.json | 179170 B | метаданные обновлений: stable |
| №1276 vignette_v2_sprite.png | 1213593 B | текстура/изображение: vignette v2 sprite |
| №1277 VTT_PROJECT_MANIFEST_V70.json | 44370 B | устаревший список V70, не актуален |
| №1278 wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1279 wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1280 wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1281 wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1282 wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1283 wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1284 wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1285 wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1286 wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1287 wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1288 wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1289 wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1290 wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1291 wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1292 wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1293 wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1294 wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1295 wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1296 wallpapers/1.png | 1460744 B | ассет графики/3D/интерфейса: 1 |
| №1297 wallpapers/10.png | 1667723 B | ассет графики/3D/интерфейса: 10 |
| №1298 wallpapers/11.png | 1815959 B | ассет графики/3D/интерфейса: 11 |
| №1299 wallpapers/12.png | 1548677 B | ассет графики/3D/интерфейса: 12 |
| №1300 wallpapers/13.png | 1599093 B | ассет графики/3D/интерфейса: 13 |
| №1301 wallpapers/14.png | 1596513 B | ассет графики/3D/интерфейса: 14 |
| №1302 wallpapers/15.png | 233043 B | ассет графики/3D/интерфейса: 15 |
| №1303 wallpapers/16.png | 212684 B | ассет графики/3D/интерфейса: 16 |
| №1304 wallpapers/17.png | 1585122 B | ассет графики/3D/интерфейса: 17 |
| №1305 wallpapers/18.png | 2095852 B | ассет графики/3D/интерфейса: 18 |
| №1306 wallpapers/19.png | 8605503 B | ассет графики/3D/интерфейса: 19 |
| №1307 wallpapers/2.png | 1590206 B | ассет графики/3D/интерфейса: 2 |
| №1308 wallpapers/20.png | 1284815 B | ассет графики/3D/интерфейса: 20 |
| №1309 wallpapers/21.png | 179307 B | ассет графики/3D/интерфейса: 21 |
| №1310 wallpapers/22.png | 344279 B | ассет графики/3D/интерфейса: 22 |
| №1311 wallpapers/23.png | 210291 B | ассет графики/3D/интерфейса: 23 |
| №1312 wallpapers/24.png | 141215 B | ассет графики/3D/интерфейса: 24 |
| №1313 wallpapers/25.png | 160892 B | ассет графики/3D/интерфейса: 25 |
| №1314 wallpapers/26.png | 187259 B | ассет графики/3D/интерфейса: 26 |
| №1315 wallpapers/27.png | 213194 B | ассет графики/3D/интерфейса: 27 |
| №1316 wallpapers/28.png | 202417 B | ассет графики/3D/интерфейса: 28 |
| №1317 wallpapers/29.png | 166942 B | ассет графики/3D/интерфейса: 29 |
| №1318 wallpapers/3.png | 1662340 B | ассет графики/3D/интерфейса: 3 |
| №1319 wallpapers/30.png | 237556 B | ассет графики/3D/интерфейса: 30 |
| №1320 wallpapers/31.svg | 1181 B | ассет графики/3D/интерфейса: 31 |
| №1321 wallpapers/32.svg | 1417 B | ассет графики/3D/интерфейса: 32 |
| №1322 wallpapers/4.png | 1816114 B | ассет графики/3D/интерфейса: 4 |
| №1323 wallpapers/5.png | 1742466 B | ассет графики/3D/интерфейса: 5 |
| №1324 wallpapers/6.png | 1591016 B | ассет графики/3D/интерфейса: 6 |
| №1325 wallpapers/7.png | 1815665 B | ассет графики/3D/интерфейса: 7 |
| №1326 wallpapers/8.png | 1492730 B | ассет графики/3D/интерфейса: 8 |
| №1327 wallpapers/9.png | 1715179 B | ассет графики/3D/интерфейса: 9 |

## Реестр имён, переменных и ключей

Имена сгруппированы по роли. Ссылка №NNNN указывает на путь в таблице файлов выше; остальные вхождения ищите в исходниках.
Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.


### JS объявления/параметры (4711)

| Имя | Исходные файлы |
|---|---|
| _ | №0041 (+ 9 других файлов) |
| __ls | №1160 (+ 4 других файлов) |
| __shifterProgression | №0816 |
| __TEST_SRC__ | №1160 (+ 4 других файлов) |
| _event | №0870 |
| _wc | №0869 |
| a | №0042 (+ 136 других файлов) |
| A | №0041 (+ 5 других файлов) |
| a0 | №1094 (+ 1 других файлов) |
| a1 | №1094 (+ 1 других файлов) |
| a2 | №1094 (+ 1 других файлов) |
| aa | №0044 (+ 1 других файлов) |
| ab | №0041 (+ 10 других файлов) |
| abilities | №0767 |
| ability | №0060 (+ 6 других файлов) |
| ABILITY | №0781 |
| abilityMod | №0762 |
| abName | №0637 |
| AbortController | №1077 |
| above | №0044 (+ 2 других файлов) |
| absent | №0651 |
| absorbed | №0638 (+ 1 других файлов) |
| ac | №0044 (+ 25 других файлов) |
| ACADEMIES | №0855 |
| academy | №0759 (+ 1 других файлов) |
| academyEffects | №0762 |
| acBase | №0774 |
| acBaseInp | №0774 |
| acc | №0819 (+ 4 других файлов) |
| acCalcBaseSel | №0774 |
| ACCEPT | №0785 |
| access | №0653 (+ 1 других файлов) |
| accessors | №1093 (+ 4 других файлов) |
| accessory | №0046 |
| accIndex | №1085 |
| account | №0634 |
| ACCURSED_CURSE_FEATURES | №0762 |
| ACCURSED_CURSES | №0762 |
| ACCURSED_METAMORPHOSES | №0762 |
| acidAttack | №1047 |
| acInput | №0066 (+ 1 других файлов) |
| acInputEl | №0776 |
| across | №0044 |
| action | №0060 (+ 20 других файлов) |
| actionBtn | №0775 |
| actionHandler | №0793 |
| actionId | №0808 |
| actionIndex | №0821 |
| actionName | №0794 |
| actionResultsByPeer | №0793 |
| actions | №0061 (+ 5 других файлов) |
| ACTIONS | №0766 |
| actionSpent | №0638 |
| actionStr | №0773 |
| actionTokenId | №0608 |
| active | №0044 (+ 13 других файлов) |
| ACTIVE | №0765 |
| activeBonuses | №0776 |
| activeBtns | №0755 |
| activeCat | №0774 |
| activeCategory | №0776 (+ 1 других файлов) |
| activeClass | №0795 |
| activeColsWallet | №0773 |
| activeEffects | №0061 |
| activeFolder | №0795 |
| activeHero | №0815 (+ 1 других файлов) |
| activeLvl | №0815 |
| activeNow | №0756 |
| activeStats | №0776 |
| activeTab | №0046 |
| activeWp | №0851 |
| actor | №0638 (+ 10 других файлов) |
| actorId | №0766 (+ 1 других файлов) |
| actors | №0624 |
| acts | №0616 (+ 7 других файлов) |
| actual | №0766 (+ 4 других файлов) |
| actualMode | №0638 |
| acVal | №0776 |
| ad | №0044 |
| add | №0772 (+ 3 других файлов) |
| addBtn | №0774 |
| added | №0696 (+ 2 других файлов) |
| addedLangs | №0629 |
| addedWeight | №0775 (+ 1 других файлов) |
| addExhaustion | №0808 |
| addGroup | №0656 |
| addToContainer | №0772 |
| addVal | №0763 |
| adj | №0788 |
| adjacent | №0041 |
| adjusted | №0788 |
| adr | №0816 (+ 1 других файлов) |
| adv | №0638 (+ 2 других файлов) |
| advice | №0802 |
| aether | №0624 |
| af | №0044 |
| affected | №0061 |
| affinity | №0631 (+ 1 других файлов) |
| after | №0638 (+ 8 других файлов) |
| afterBounds | №1070 |
| ag | №0762 (+ 1 других файлов) |
| age | №0607 (+ 2 других файлов) |
| ageEl | №0607 (+ 1 других файлов) |
| ageInput | №0607 (+ 1 других файлов) |
| agents | №0615 |
| ah | №0044 (+ 1 других файлов) |
| ai | №0044 (+ 11 других файлов) |
| ailment | №0762 |
| aim | №0053 |
| aimed | №1100 |
| ain | №0044 (+ 1 других файлов) |
| al | №0044 |
| alchemistCombatant | №1046 |
| alchemistDebuffs | №0638 |
| alchemistFormula | №0638 |
| alchemistLevel | №0638 |
| alchemistState | №0638 |
| alchemistVariants | №0061 |
| alias | №0683 (+ 2 других файлов) |
| ALIAS | №0753 |
| aliases | №0061 (+ 7 других файлов) |
| ALIASES | №0655 (+ 1 других файлов) |
| align | №1220 |
| all | №0046 (+ 5 других файлов) |
| ALL_RECIPES | №0655 |
| allBgs | №0607 |
| allCharacters | №0066 |
| allCreatureNames | №0789 |
| allCurses | №0762 |
| allElements | №0773 |
| allFeats | №0728 |
| allItems | №0776 |
| allow | №0803 |
| allowed | №0044 (+ 10 других файлов) |
| allowed2 | №0796 |
| allowMastery | №0762 |
| allPanels | №0805 (+ 1 других файлов) |
| allRaces | №0607 (+ 2 других файлов) |
| allRollsDetails | №0819 |
| allSources | №0728 |
| allSpells | №0819 |
| ally | №0061 (+ 4 других файлов) |
| allyState | №0061 |
| allyWilling | №0802 |
| allyX | №0802 |
| allyY | №0802 |
| alone | №1053 |
| already | №0762 (+ 1 других файлов) |
| alreadyHad | №0728 |
| alreadyHas | №0805 |
| alreadyHasSelectedClass | №0683 |
| alreadyHasSubclass | №0683 |
| alternates | №0064 |
| always | №0792 |
| am | №0056 (+ 3 других файлов) |
| am2 | №1186 |
| amap | №0762 |
| AMBIENCE_STATE_KEY | №0065 |
| ambienceShouldPlay | №0065 |
| ambienceStateLoaded | №0065 |
| AMBIENT_TRACKS | №0065 |
| amorist | №1047 |
| amount | №0044 (+ 23 других файлов) |
| amp | №0762 |
| amphibian | №1047 |
| amphibianMods | №1047 |
| amplified | №1191 |
| anatomy | №1049 |
| anchor | №0041 (+ 2 других файлов) |
| anchors | №0044 (+ 1 других файлов) |
| angle | №0041 (+ 6 других файлов) |
| angularIndex | №0041 |
| animal | №0044 |
| animalCfg | №0044 |
| animalParts | №0044 |
| animalSelect | №0046 |
| ankle | №0044 (+ 1 других файлов) |
| answered | №0794 |
| answers | №1106 |
| ao | №0794 |
| ap | №0631 (+ 7 других файлов) |
| api | №0042 (+ 40 других файлов) |
| API | №0062 (+ 12 других файлов) |
| app | №0869 (+ 3 других файлов) |
| APP_FONTS | №0815 |
| APP_FRAME_COLORS | №0815 |
| APP_FRAME_STYLES | №0815 |
| APP_THEMES | №0815 |
| APP_VERSION | №0825 (+ 1 других файлов) |
| appearance | №0043 (+ 2 других файлов) |
| appearanceSource | №1077 |
| applicable | №0804 |
| applied | №0801 (+ 4 других файлов) |
| appliedBonusText | №0728 |
| applySkin | №0046 |
| approvedRules | №0804 |
| ar | №0631 (+ 4 других файлов) |
| arc | №0044 |
| arch | №0044 |
| archetypeFeatureIds | №0762 |
| area | №0044 (+ 2 других файлов) |
| arena | №1115 |
| arg | №0754 |
| args | №0754 (+ 2 других файлов) |
| arm | №0044 |
| armLine | №0044 |
| armor | №0649 (+ 4 других файлов) |
| armorCategories | №0774 |
| armored | №0812 |
| armorFields | №0774 |
| armorName | №0638 |
| armorObj | №0638 |
| armorOn | №0044 |
| arr | №0052 (+ 12 других файлов) |
| Array | №0646 (+ 23 других файлов) |
| ArrayBuffer | №1086 |
| arrays | №0655 |
| arrow | №0631 (+ 3 других файлов) |
| ARTIFICER_CLASSES | №0631 |
| ARTIFICER_KEY | №0810 |
| ASI | №0799 (+ 1 других файлов) |
| ASI_LEVELS | №0822 |
| asiContainer | №0683 |
| asiHtml | №0683 |
| asiLevels | №0761 |
| asiPrompt | №0683 |
| aspect | №0046 (+ 1 других файлов) |
| aspects | №0827 |
| ASPECTS | №0827 |
| assert | №1046 (+ 164 других файлов) |
| assertSource | №1082 |
| asset | №0042 (+ 30 других файлов) |
| assetId | №1089 |
| assets | №0059 |
| assetSet | №0054 |
| assigned | №0762 |
| at | №0042 (+ 14 других файлов) |
| atk | №0637 (+ 5 других файлов) |
| atkBonus | №0616 (+ 9 других файлов) |
| atkElem | №0637 (+ 1 других файлов) |
| atlas | №0045 |
| atob | №1050 (+ 21 других файлов) |
| aTok | №0638 |
| attachment | №0045 |
| attack | №0792 (+ 6 других файлов) |
| attacker | №0624 (+ 9 других файлов) |
| attackerBack | №0794 |
| attackerDebuffs | №0638 |
| attackerId | №0638 |
| attackerIdForStudy | №0638 |
| attackerSelect | №1106 |
| attackerState | №0638 |
| attackModifiers | №0792 |
| attackPayload | №0794 |
| attackRolls | №1126 |
| attacks | №0638 (+ 2 других файлов) |
| attempts | №0636 (+ 1 других файлов) |
| attributes | №1124 |
| aura | №0794 (+ 1 других файлов) |
| auraActive | №0631 |
| auraBack | №1105 |
| auraCha | №0631 |
| auraPC | №1105 |
| auraPhone | №1105 |
| auraRoster | №1105 |
| auraServer | №1105 |
| auraSource | №0631 |
| auth | №1076 |
| authoritativeAoe | №0794 |
| auto | №0794 |
| autoCloseTimer | №0780 |
| autoFail | №0638 |
| autoInterval | №0851 |
| automatic | №0624 |
| autoPlay | №0065 |
| autoResults | №0794 |
| autoRotateState | №0851 |
| autoRotateTimer | №0851 |
| autos | №0794 |
| av | №0044 (+ 2 других файлов) |
| avail | №0631 |
| available | №0762 (+ 4 других файлов) |
| availableCharges | №0061 |
| availableWallpapers | №0851 |
| avg | №0683 |
| avianHybrid | №1049 |
| aw | №0044 (+ 1 других файлов) |
| ax | №0044 (+ 2 других файлов) |
| axes | №0044 |
| AXES | №0049 |
| axis | №0044 (+ 10 других файлов) |
| ay | №0045 |
| az | №0044 (+ 1 других файлов) |
| b | №0042 (+ 118 других файлов) |
| B | №0041 (+ 16 других файлов) |
| b1 | №0044 (+ 1 других файлов) |
| back | №0042 (+ 4 других файлов) |
| backAnchor | №0044 |
| backCount | №0044 |
| backDepth | №0045 |
| backdrop | №0046 |
| backgroundName | №0607 (+ 1 других файлов) |
| backgrounds | №1214 |
| backgroundsList | №0607 (+ 1 других файлов) |
| backTop | №0045 |
| backup | №0636 (+ 2 других файлов) |
| backupData | №0815 |
| backups | №0634 |
| bad | №0624 (+ 5 других файлов) |
| badgeTag | №0755 |
| badR | №1191 |
| bag | №1067 |
| bagAnchor | №0041 |
| bagCenter | №0041 |
| bagRings | №0041 |
| balanceAfterBarter | №1130 |
| balanceAfterBuy | №1130 |
| BAM | №0613 |
| band | №0045 |
| bandHi | №0045 |
| bandLo | №0045 |
| bandSection | №0045 |
| bar | №0826 |
| barb | №1187 (+ 1 других файлов) |
| barbarian | №1180 |
| barFill | №0775 |
| barter | №1130 |
| barWrapper | №0775 |
| base | №0044 (+ 66 других файлов) |
| BASE | №0647 (+ 1 других файлов) |
| BASE_HOSTS | №0872 |
| baseAc | №0607 (+ 1 других файлов) |
| baseAC | №0776 |
| baseACInput | №0776 |
| baseActions | №0796 |
| baseConfig | №1268 |
| baseCount | №0655 |
| baseFeatures | №0796 |
| baseGain | №0683 |
| baseH | №0045 (+ 1 других файлов) |
| baseIds | №0855 |
| baseJinx | №0762 |
| baseline | №0046 (+ 2 других файлов) |
| baseMod | №0755 |
| baseMode | №0810 |
| baseNameEng | №0728 |
| baseNameRu | №0728 |
| baseOpenTrade | №0784 |
| baseRate | №0648 |
| baseRender | №0639 |
| BASES | №0657 |
| baseStock | №0785 |
| baseValue | №0650 |
| baseW | №0055 |
| baseX | №0044 |
| baseY | №0044 |
| bat | №0044 (+ 1 других файлов) |
| batch | №0794 |
| batchFail | №1207 |
| batchTarget | №1207 |
| battleGame | №1105 |
| bb | №0044 (+ 4 других файлов) |
| bbu | №0762 |
| bbuDamage | №1115 |
| bbuHero | №1115 |
| bbuLevel9 | №1115 |
| bbuResource | №0638 |
| bbuResult | №0638 |
| bbuTemp | №0762 |
| bc | №0041 (+ 2 других файлов) |
| bCha | №0807 |
| bCon | №0807 |
| bd | №1099 |
| bDex | №0807 |
| beak | №0044 |
| beakKind | №0044 |
| beakL | №0044 |
| beakScale | №0044 |
| beakSelect | №0046 |
| beakStyle | №1070 |
| beakW | №0044 |
| bearer | №0636 |
| beast | №0816 |
| beetle | №0044 |
| before | №0636 (+ 53 других файлов) |
| beforeBounds | №1070 |
| beforeBurn | №1046 |
| beforeCurse | №1191 |
| beforeMoxie | №1115 |
| beforeNormal | №1197 |
| beforePact | №1197 |
| beforeReset | №1048 |
| beh | №1145 |
| belly | №0044 |
| belt | №0646 |
| bend | №0044 |
| best | №0044 (+ 11 других файлов) |
| bestD | №1093 |
| bestDist | №0794 |
| bestiary | №0789 |
| bestTrans | №1099 |
| bestTri | №1094 |
| bet | №1104 |
| bev | №0794 |
| bf | №0052 (+ 2 других файлов) |
| bg | №0655 (+ 1 других файлов) |
| BG_COLOR_PALETTE | №0851 |
| BG3_POINT_BUY | №0607 (+ 1 других файлов) |
| bgBody | №0851 |
| bgInput | №0066 |
| bgs | №0628 (+ 1 других файлов) |
| bgSelect | №0607 (+ 1 других файлов) |
| bgStyle | №0755 |
| bgVal | №0607 (+ 1 других файлов) |
| bh | №0810 (+ 3 других файлов) |
| bhDamage | №0638 |
| bhPact | №0810 |
| bi | №0794 |
| bIdx | №0607 |
| bin | №0044 (+ 16 других файлов) |
| binary | №1218 |
| binBytes | №1088 |
| binPad | №1085 |
| bins | №0045 |
| bInt | №0807 |
| bird | №0044 |
| bits | №0041 (+ 1 других файлов) |
| bl | №0669 |
| blackPowder | №1047 |
| blackPowderAttack | №1047 |
| blade | №0044 |
| bladeSpan | №0044 |
| bleed | №0638 |
| blend | №0041 (+ 1 других файлов) |
| blended | №0041 |
| blind | №0801 (+ 2 других файлов) |
| blob | №0815 (+ 7 других файлов) |
| blobs | №1264 |
| block | №0805 (+ 6 других файлов) |
| blocked | №0636 (+ 4 других файлов) |
| bloodAbility | №0061 |
| bloodAgent | №1047 |
| bloodCurseReaction | №0638 |
| bloodHunterPack | №0762 |
| bloodlines | №0816 |
| bloodMax | №0631 |
| bloodMutagenist | №1047 |
| bloodRiteRevival | №0638 |
| bloodShort | №0061 |
| bloodSnapshots | №0061 |
| bm | №0794 (+ 2 других файлов) |
| board | №0794 (+ 2 других файлов) |
| boardBox | №0609 |
| boardCtx | №1168 |
| body | №0041 (+ 22 других файлов) |
| bodyArmor | №0776 |
| bodyBefore | №1048 |
| bodyExtras | №1056 |
| bodyStats | №0767 |
| bomb | №0061 (+ 2 других файлов) |
| bomber | №1047 |
| bomberGuard | №1047 |
| bomberResistanceTarget | №1046 |
| bomberResisted | №1046 |
| bond | №0639 |
| bondBox | №0802 |
| bondConsent | №1106 |
| bondLabel | №0802 |
| bonds | №0669 |
| bondTarget | №1106 |
| bondText | №0802 |
| bondWilling | №0802 |
| bone | №0051 (+ 1 других файлов) |
| bonesChecked | №1260 |
| boneStyle | №0044 |
| boneVertexMap | №0044 |
| bonus | №0057 (+ 23 других файлов) |
| bonusAction | №0794 |
| bonuses | №0774 |
| bonusesText | №0607 (+ 1 других файлов) |
| bonusMultiplier | №0755 |
| bonusText | №0728 |
| Boolean | №0646 (+ 1 других файлов) |
| booted | №0869 |
| borderLeftColor | №0755 |
| bottom | №0041 (+ 4 других файлов) |
| bought | №1130 |
| boundary | №0041 (+ 1 других файлов) |
| boundaryEdges | №0041 |
| boundaryWelds | №0041 |
| bounds | №1057 (+ 1 других файлов) |
| box | №0046 (+ 27 других файлов) |
| boxer | №1115 |
| boxesHtml | №0819 |
| boxIndex | №0819 |
| bp | №0655 (+ 7 других файлов) |
| bParts | №0607 (+ 1 других файлов) |
| br | №1180 |
| brandedHp | №1118 |
| braPanels | №1070 |
| breath | №1047 |
| breathOne | №1047 |
| breathResults | №0061 |
| breathRoll | №0061 |
| breathTargets | №0061 |
| breathTwo | №1047 |
| breathType | №0061 |
| bridge | №1091 (+ 4 других файлов) |
| broken | №0044 (+ 2 других файлов) |
| browColor | №0046 |
| browser | №1223 (+ 38 других файлов) |
| BrowserWindow | №0869 |
| bStr | №0807 |
| bt | №0044 (+ 2 других файлов) |
| btn | №0775 (+ 4 других файлов) |
| btnCat | №0776 |
| btnContainer | №0774 |
| btnMode | №0755 |
| btoa | №1050 (+ 2 других файлов) |
| bucket | №0044 (+ 2 других файлов) |
| buckets | №0044 |
| bucketStep | №0044 |
| budget | №0801 (+ 1 других файлов) |
| budgets | №0042 |
| buf | №0052 (+ 2 других файлов) |
| buffers | №0044 (+ 3 других файлов) |
| bufs | №0052 |
| build | №0045 (+ 1 других файлов) |
| built | №1050 (+ 3 других файлов) |
| bulge | №0044 |
| bundled | №1081 (+ 1 других файлов) |
| burdenAliases | №0786 |
| burdens | №0786 |
| burn | №0762 (+ 1 других файлов) |
| burningOwner | №1046 |
| burningTarget | №1046 |
| bus | №0836 (+ 1 других файлов) |
| busy | №0634 |
| button | №0046 (+ 5 других файлов) |
| buttons | №0046 (+ 2 других файлов) |
| buttonsHtml | №0728 |
| buyFactor | №0783 |
| bv | №0044 (+ 2 других файлов) |
| bvh | №1093 |
| bvIndex | №1085 |
| bWis | №0807 |
| bx | №0045 (+ 1 других файлов) |
| by | №0045 |
| BY_ID | №0804 |
| byFamily | №0611 (+ 12 других файлов) |
| byLevel | №0792 |
| byName | №0647 (+ 1 других файлов) |
| BYPASS_PARCHMENT_ONCE | №0628 |
| bySource | №0611 (+ 2 других файлов) |
| byteOffset | №0052 |
| bytes | №0047 (+ 3 других файлов) |
| bytesWritten | №0872 |
| bz | №0056 |
| c | №0042 (+ 211 других файлов) |
| C | №0064 (+ 13 других файлов) |
| c0 | №0644 |
| c2 | №1211 |
| ca | №0041 (+ 1 других файлов) |
| cache | №0052 |
| CACHE_BUSTER | №0825 |
| cached | №0045 (+ 1 других файлов) |
| calcAtk | №0630 |
| calcDmgBonus | №0630 |
| calcInput | №0763 |
| calcType | №0774 |
| calcWidget | №0773 |
| calf | №0042 |
| call | №0854 |
| callback | №0869 (+ 19 других файлов) |
| called | №1123 |
| calls | №1086 (+ 3 других файлов) |
| cam | №0053 (+ 1 других файлов) |
| campaign | №1147 |
| campaigns | №0625 |
| CAN | №0792 |
| canClose | №0826 |
| candidate | №0872 |
| candidates | №0044 (+ 7 других файлов) |
| canonical | №0753 |
| cantrip | №0061 |
| cantrips | №0743 (+ 1 других файлов) |
| CANTRIPS | №0827 |
| cantripsList | №0819 |
| canvas | №0053 (+ 3 других файлов) |
| cap | №0041 (+ 5 других файлов) |
| caps | №1061 |
| capStart | №0041 |
| card | №0775 (+ 10 других файлов) |
| cardId | №0801 (+ 1 других файлов) |
| cards | №0653 (+ 3 других файлов) |
| CARDS | №0804 |
| cases | №0646 (+ 2 других файлов) |
| cast | №1110 |
| caster | №0794 |
| casterLevel | №0810 |
| cat | №0050 (+ 22 других файлов) |
| catalog | №0046 (+ 5 других файлов) |
| CATALOG | №0611 (+ 15 других файлов) |
| catalogContainer | №0805 |
| catalogHtml | №0805 |
| catalogState | №0643 |
| catalogue | №1231 |
| catalyst | №0064 |
| catalystId | №0062 (+ 1 других файлов) |
| CATALYSTS | №0062 |
| catContainer | №0774 |
| category | №0053 (+ 15 других файлов) |
| CATEGORY | №0643 |
| catLower | №0774 |
| catOk | №0785 |
| cats | №0647 |
| catStr | №0806 |
| catTitle | №0774 |
| cb | №1097 (+ 1 других файлов) |
| cc | №0044 (+ 1 других файлов) |
| cd | №0762 |
| ce | №1203 (+ 1 других файлов) |
| ceiling | №0801 |
| cel | №0056 |
| celestial | №1121 |
| cell | №0044 (+ 7 других файлов) |
| CELL_FT | №0609 |
| cellFt | №0639 |
| cells | №0048 (+ 1 других файлов) |
| cellU | №0044 |
| cellV | №0044 |
| center | №0044 (+ 5 других файлов) |
| centre | №0044 |
| centres | №0044 |
| cf | №0762 (+ 1 других файлов) |
| cfg | №0044 (+ 2 других файлов) |
| cg | №0845 |
| ch | №0051 (+ 3 других файлов) |
| cha | №0611 (+ 11 других файлов) |
| chain | №0044 (+ 1 других файлов) |
| chance | №0063 (+ 2 других файлов) |
| change | №1029 |
| changed | №0801 (+ 4 других файлов) |
| CHANGELOG | №0798 |
| changes | №0810 (+ 1 других файлов) |
| channel | №0046 |
| CHANNEL_KEY | №0825 |
| channels | №0049 (+ 6 других файлов) |
| char | №0814 (+ 5 других файлов) |
| character | №0042 (+ 5 других файлов) |
| CHARACTER_CREATION_MODE | №0628 |
| CHARACTER_SAVE_SCHEMA_VERSION | №0066 |
| characters | №0814 |
| characterShape | №0631 (+ 1 других файлов) |
| charClassInputs | №0683 |
| charge | №0762 |
| chargeCount | №0061 |
| chargeDirection | №0802 |
| charges | №1118 (+ 2 других файлов) |
| charId | №0814 |
| charIndex | №0814 |
| charInfo | №0815 |
| chariot | №1105 |
| charLevel | №0814 |
| charm | №1105 |
| charmed | №0061 |
| charmedHero | №1105 |
| charmTarget | №1105 |
| charName | №0814 |
| chars | №0815 (+ 1 других файлов) |
| charTotalCopper | №0773 |
| check | №0631 (+ 10 других файлов) |
| checkbox | №0775 (+ 2 других файлов) |
| checked | №0841 (+ 11 других файлов) |
| checkedAttr | №0607 (+ 1 других файлов) |
| cheek | №0044 |
| chest | №1100 |
| chestUnderwear | №0044 |
| child | №0772 (+ 1 других файлов) |
| childId | №0772 |
| children | №0772 |
| chin | №0044 |
| chk | №0639 (+ 1 других файлов) |
| choice | №0636 (+ 3 других файлов) |
| choiceBlocks | №0683 |
| choices | №0046 (+ 5 других файлов) |
| chosen | №0624 (+ 4 других файлов) |
| chosenD20 | №0630 |
| chosenFeat | №0683 (+ 1 других файлов) |
| chosenMod | №0755 |
| chosenPatron | №0762 |
| chosenResistance | №0061 |
| chosenTrad | №0796 |
| chromium | №1223 (+ 37 других файлов) |
| chunk | №0052 (+ 6 других файлов) |
| chunks | №1218 (+ 1 других файлов) |
| ci | №0044 (+ 1 других файлов) |
| cid | №0061 |
| cId | №0815 |
| cl | №0044 (+ 3 других файлов) |
| claim | №0057 |
| clamp | №0063 |
| class | №0683 |
| CLASS | №0061 (+ 4 других файлов) |
| CLASS_DEFS | №0758 |
| CLASS_I18N | №0778 |
| CLASS_KEYS | №0810 |
| CLASS_NAMES | №0631 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0696 |
| CLASS_TOKEN_ART | №0628 |
| classBonus | №0638 |
| classContext | №0638 |
| classData | №0683 (+ 1 других файлов) |
| classDescriptions | №0646 |
| classEntry | №0683 |
| classes | №0769 (+ 5 других файлов) |
| CLASSIC_BACKGROUND_NAMES | №0628 |
| CLASSIC_CLASS_NAMES | №0628 |
| CLASSIC_RACE_IDS | №0628 |
| classicBgs | №1214 |
| classicClasses | №1214 |
| classLevel | №0683 |
| classMatch | №0819 |
| classMeta | №0769 |
| className | №0607 (+ 7 других файлов) |
| classNameBase | №0629 |
| classNameOnly | №0607 (+ 1 других файлов) |
| classReduction | №0638 |
| classSelect | №0607 (+ 1 других файлов) |
| classStr | №0819 |
| clawLen | №0044 |
| clean | №0616 (+ 10 других файлов) |
| cleanName | №0629 |
| cleanStr | №0755 (+ 1 других файлов) |
| cleanTool | №0629 |
| clear | №0045 (+ 1 других файлов) |
| clearContainer | №0772 |
| clearInterval | №1160 (+ 5 других файлов) |
| clearTimeout | №1160 (+ 28 других файлов) |
| cleft | №0041 (+ 1 других файлов) |
| cleric | №1187 |
| click | №1100 |
| CLIENT_KEY | №0793 |
| clipped | №0044 |
| clone | №1103 (+ 2 других файлов) |
| close | №0798 (+ 1 других файлов) |
| closeBtn | №0683 |
| closedHero | №1106 |
| closedPixels | №1229 |
| closer | №0801 |
| cloth | №0046 (+ 3 других файлов) |
| clothBuckets | №0044 |
| clothed | №1074 (+ 1 других файлов) |
| clothes | №1049 (+ 2 других файлов) |
| clothFaces | №0044 |
| clothing | №0042 (+ 2 других файлов) |
| cloud | №1077 |
| cloudStatus | №0815 |
| cls | №0769 (+ 7 других файлов) |
| club | №0759 (+ 1 других файлов) |
| clubFeatures | №0762 |
| clubIds | №1123 |
| cm | №0762 (+ 2 других файлов) |
| cmn | №1093 |
| cmx | №1093 |
| cn | №0778 (+ 1 других файлов) |
| cName | №0819 |
| co | №0056 |
| code | №0634 (+ 5 других файлов) |
| coins | №0773 |
| col | №0048 (+ 1 других файлов) |
| cold | №0046 |
| colEP | №0773 |
| collar | №0041 (+ 2 других файлов) |
| collarCount | №0041 |
| collisions | №1099 |
| colno | №0754 |
| color | №0044 (+ 4 других файлов) |
| coloredDrink | №1047 |
| coloredPotionMaker | №1047 |
| colorHex | №0851 |
| colorKey | №0815 |
| colors | №0046 (+ 1 других файлов) |
| colorType | №0061 |
| colour | №1072 |
| colourDetail | №1048 |
| colourIdat | №1072 |
| colourRaw | №1072 |
| colPP | №0773 |
| cols | №0044 (+ 1 других файлов) |
| combat | №0649 (+ 2 других файлов) |
| combatant | №0061 (+ 1 других файлов) |
| combatants | №0061 |
| command | №0813 |
| commit | №0624 |
| committed | №1078 |
| commonSaved | №1229 |
| companion | №1106 (+ 1 других файлов) |
| companionId | №1123 |
| compare | №1082 |
| comparing | №0046 |
| compat | №0825 (+ 2 других файлов) |
| compatFs | №1269 |
| compatRequire | №1269 |
| completed | №0780 |
| completedBytes | №0872 |
| component | №1093 |
| componentBytes | №1097 |
| compositions | №1220 |
| comps | №1094 |
| con | №0611 (+ 15 других файлов) |
| conc | №0810 |
| concentration | №0638 |
| cond | №0630 (+ 2 других файлов) |
| condition | №0638 (+ 3 других файлов) |
| CONDITION_ALIASES | №0810 |
| conditionHero | №1115 |
| conditionMods | №0638 |
| conditionNotes | №0755 |
| conditions | №0638 (+ 4 других файлов) |
| CONDITIONS | №0638 (+ 3 других файлов) |
| CONDITIONS_CONFIG | №0066 |
| conds | №0638 |
| conduit | №0681 |
| config | №0057 (+ 5 других файлов) |
| CONFIG | №0636 |
| confirmed | №0061 |
| conflict | №0636 |
| CONFLICT | №0062 |
| conflicts | №0062 (+ 2 других файлов) |
| conflictSet | №0062 |
| conMod | №0607 (+ 4 других файлов) |
| conModFinal | №0607 (+ 1 других файлов) |
| conScore | №0638 |
| consent | №1106 |
| console | №0646 (+ 29 других файлов) |
| constant | №0794 (+ 1 других файлов) |
| consumed | №0655 |
| consumedJinx | №0638 |
| container | №0607 (+ 15 других файлов) |
| containerId | №0805 (+ 3 других файлов) |
| containers | №0766 (+ 3 других файлов) |
| content | №0776 (+ 1 других файлов) |
| contentBox | №0683 |
| contentDiv | №0755 |
| contentsWeight | №0772 |
| context | №0638 (+ 12 других файлов) |
| contextBridge | №0870 |
| contexts | №1048 (+ 1 других файлов) |
| contract | №0762 |
| control | №0046 |
| controller | №0636 (+ 2 других файлов) |
| controls | №0046 (+ 1 других файлов) |
| conVal | №0683 |
| converted | №0064 (+ 1 других файлов) |
| cooledAttack | №1047 |
| cooling | №1047 |
| COPPER | №0782 |
| copperPerElectrum | №0773 |
| copperPerGold | №0773 |
| copperPerPlat | №0773 |
| copperPerSilver | №0773 |
| copy | №0043 (+ 8 других файлов) |
| core | №0044 (+ 7 других файлов) |
| CORE | №0631 |
| CORE_CLASSES | №0643 |
| coreOwned | №0631 |
| corePositions | №0044 |
| corner | №1072 |
| corners | №0044 (+ 2 других файлов) |
| corona | №0041 |
| corpse | №0792 (+ 2 других файлов) |
| corrupt | №1060 |
| cost | №0631 (+ 13 других файлов) |
| costDie | №0762 |
| costInp | №0774 |
| count | №0044 (+ 42 других файлов) |
| counter | №0776 (+ 5 других файлов) |
| counterDamage | №0762 (+ 1 других файлов) |
| counterHero | №1115 |
| counterLeft | №0638 |
| counterReduction | №0638 (+ 1 других файлов) |
| counterState | №0638 |
| countInput | №0776 |
| counts | №0041 (+ 3 других файлов) |
| countToRead | №0052 |
| coverBonus | №0638 (+ 1 других файлов) |
| covered | №0045 (+ 1 других файлов) |
| coveredCount | №1259 |
| cp | №0044 (+ 11 других файлов) |
| cPerS | №0773 |
| cpInput | №0773 |
| cpVal | №0773 |
| cr | №0611 (+ 15 других файлов) |
| CR | №0792 |
| CR_BY_MONSTER | №0791 |
| CR_RANK | №0791 |
| craft | №0611 (+ 21 других файлов) |
| craftBase | №0610 |
| craftBonus | №0648 (+ 1 других файлов) |
| crafted | №0647 |
| CRAFTING_BACKGROUND_PROFILES | №0655 |
| CRAFTING_CLASS_PROFILES | №0655 |
| CRAFTING_FEAT_PROFILES | №0655 |
| CRAFTING_RACE_PROFILES | №0655 |
| craftingProfile | №0655 |
| craftModifier | №0655 |
| craftNotes | №0655 |
| createContainer | №0772 |
| creationScreen | №0607 (+ 1 других файлов) |
| creatures | №0669 |
| CREATURES | №0757 |
| crest | №0044 |
| crit | №1115 |
| critical | №0638 (+ 3 других файлов) |
| criticalRange | №0638 |
| critNote | №0755 (+ 1 других файлов) |
| critTarget | №1115 |
| cross | №0045 (+ 1 других файлов) |
| crowd | №0638 (+ 1 других файлов) |
| crowdCondition | №0762 |
| crowdDC | №0762 |
| crowdHero | №1115 |
| crowdResults | №0762 |
| crowdSave | №0638 |
| crowdTarget | №1115 |
| crowdTargets | №0762 |
| crown | №0044 |
| crownDiagnostics | №1233 |
| crownOff | №1233 |
| crypto | №0872 (+ 40 других файлов) |
| cs | №0044 (+ 11 других файлов) |
| csel | №0789 |
| ct | №0044 |
| ctx | №0055 (+ 136 других файлов) |
| ctx2d | №0046 |
| cuff | №0045 |
| cum | №0044 |
| cup | №0045 (+ 1 других файлов) |
| cups | №0045 |
| cur | №0063 (+ 4 других файлов) |
| curHp | №0762 |
| curl | №0044 |
| current | №0041 (+ 12 других файлов) |
| currentActiveId | №0814 |
| currentChar | №0066 |
| currentCharacterId | №0066 |
| currentClass | №0683 |
| currentColor | №0851 |
| currentCurrHp | №0807 |
| currentDim | №0851 |
| currentExp | №0763 |
| currentHero | №0815 (+ 1 других файлов) |
| currentHound | №0762 |
| currentHp | №0061 (+ 1 других файлов) |
| currentHP | №0852 |
| currentInventoryCategory | №0776 |
| currentLevelExpReq | №0763 |
| currentLevelInClass | №0696 |
| currentLvl | №0763 (+ 1 других файлов) |
| currentMax | №0683 |
| currentModalColor | №0851 |
| currentModalOpacity | №0851 |
| currentOpacity | №0851 |
| currentPact | №0781 |
| currentProfsIds | №0805 |
| currentProgress | №0826 |
| currentRollMode | №0755 |
| currentRound | №0638 |
| currentSpent | №0607 (+ 1 других файлов) |
| currentStep | №0065 |
| currentTime | №0780 |
| currentTrack | №0065 |
| currentTrackIndex | №0065 |
| currentVal | №0607 (+ 3 других файлов) |
| currentVersion | №0815 (+ 1 других файлов) |
| currentVolume | №0065 |
| currentWallpaperIndex | №0851 |
| currId | №0815 |
| curse | №0762 |
| curseActor | №0638 |
| curseEffect | №0762 |
| curseId | №0762 |
| curseKnown | №0671 |
| curseMax | №0762 |
| curseNames | №0624 |
| curses | №0060 (+ 1 других файлов) |
| curseSaveMods | №0638 |
| curSides | №0630 |
| curStat | №0630 |
| curve | №0044 |
| custom | №0045 (+ 1 других файлов) |
| customBtn | №0776 (+ 1 других файлов) |
| customElem | №0779 |
| customGather | №0808 |
| customRaces | №0807 |
| customSkinCharacter | №1049 |
| cut | №0044 (+ 1 других файлов) |
| cutFaces | №0041 |
| cv | №0044 (+ 2 других файлов) |
| cw | №1072 |
| cx | №0044 (+ 7 других файлов) |
| cy | №0041 (+ 7 других файлов) |
| cycles | №0648 |
| cz | №0044 (+ 5 других файлов) |
| d | №0042 (+ 81 других файлов) |
| D | №0041 (+ 23 других файлов) |
| d00 | №1093 (+ 2 других файлов) |
| d01 | №1093 (+ 2 других файлов) |
| d1 | №1093 (+ 3 других файлов) |
| d11 | №1093 (+ 2 других файлов) |
| d2 | №1093 (+ 3 других файлов) |
| d20 | №0638 (+ 4 других файлов) |
| d20_1 | №0630 |
| d20_2 | №0630 |
| d20Button | №0631 |
| d20Details | №0630 |
| d20Result | №0755 (+ 1 других файлов) |
| d21 | №1093 (+ 2 других файлов) |
| d3 | №1093 (+ 3 других файлов) |
| d4 | №1093 (+ 3 других файлов) |
| d5 | №1093 (+ 3 других файлов) |
| d6 | №1093 (+ 3 других файлов) |
| da | №1072 |
| damage | №0057 (+ 21 других файлов) |
| DAMAGE_TYPES | №0638 |
| damageBeforeWard | №0638 |
| damageButton | №0631 |
| damaged | №0647 |
| damageOpts | №0638 |
| damageParts | №0638 |
| damageResult | №0794 |
| damageStr | №0774 |
| damageString | №0755 (+ 1 других файлов) |
| damageTaken | №0638 |
| dark | №0044 (+ 2 других файлов) |
| data | №0046 (+ 39 других файлов) |
| dataDir | №1220 (+ 1 других файлов) |
| dataStr | №0815 |
| DataView | №1050 (+ 21 других файлов) |
| Date | №0646 (+ 66 других файлов) |
| dateStr | №0815 |
| day | №0782 |
| db | №0696 (+ 3 других файлов) |
| dbg | №1159 (+ 1 других файлов) |
| dbItem | №0775 (+ 1 других файлов) |
| dbNameLower | №0629 |
| dc | №0057 (+ 26 других файлов) |
| dcElem | №0637 (+ 1 других файлов) |
| dcValue | №0799 |
| dd | №0056 (+ 1 других файлов) |
| deadAlly | №1047 |
| dealUses | №0762 |
| deathSaveFailures | №0638 |
| deb | №0061 |
| debuffs | №0638 (+ 1 других файлов) |
| debug | №1029 |
| debugBtn | №0754 |
| debugContainer | №0815 (+ 1 других файлов) |
| debugToggle | №0815 |
| debugWrapper | №0815 |
| deception | №0061 |
| deck | №0802 (+ 3 других файлов) |
| DECLARATIVE_FEATURES | №0631 |
| decodeURIComponent | №1173 (+ 1 других файлов) |
| deduction | №0624 |
| def | №0049 (+ 6 других файлов) |
| DEFAULT | №0054 |
| DEFAULT_CAPACITY | №0772 |
| DEFAULT_CHANNEL | №0825 |
| DEFAULT_COLS | №0609 |
| DEFAULT_ENABLED | №0649 |
| DEFAULT_ICON | №0815 (+ 2 других файлов) |
| DEFAULT_MANIFEST_URL | №0825 |
| DEFAULT_RACES | №0807 |
| DEFAULT_ROWS | №0609 |
| defaultIcon | №0871 |
| defaultMode | №0774 |
| defaultModel | №0789 |
| defaults | №0049 (+ 2 других файлов) |
| defaultType | №0774 |
| defaultValue | №0774 |
| defender | №1115 (+ 1 других файлов) |
| defenderClasses | №0638 |
| defenses | №0774 (+ 1 других файлов) |
| defensesContainer | №0774 |
| defer | №0794 |
| deflect | №0638 |
| deflected | №1046 |
| defs | №0049 (+ 4 других файлов) |
| DEFS | №0801 |
| delay | №0636 (+ 1 других файлов) |
| delayedBomb | №1047 |
| delBtn | №0776 (+ 1 других файлов) |
| deleteBtn | №0795 |
| deleted | №0636 |
| delta | №0041 (+ 19 других файлов) |
| demolitionOwner | №1047 |
| demolitionResult | №1047 |
| demolitionTarget | №0061 (+ 1 других файлов) |
| den | №0044 (+ 7 других файлов) |
| denied | №1111 |
| denLabel | №0046 |
| denOpacity | №0045 |
| dense | №1240 |
| denValues | №0045 |
| depth | №0044 (+ 3 других файлов) |
| derivedAssets | №0054 |
| desc | №0653 (+ 7 других файлов) |
| descBox | №0607 (+ 2 других файлов) |
| descElem | №0779 |
| descInp | №0774 |
| descInput | №0807 |
| description | №0631 (+ 2 других файлов) |
| descriptor | №1050 (+ 1 других файлов) |
| descText | №0607 (+ 1 других файлов) |
| descVal | №0807 |
| desired | №0041 (+ 2 других файлов) |
| DesktopWebUpdater | №0869 (+ 2 других файлов) |
| dest | №0058 (+ 3 других файлов) |
| destinations | №0801 |
| detail | №0833 (+ 3 других файлов) |
| details | №0046 (+ 4 других файлов) |
| detailsElem | №0779 |
| detailsHtml | №0776 |
| detailText | №0755 (+ 1 других файлов) |
| device | №1105 |
| devModal | №0815 |
| dex | №0611 (+ 13 других файлов) |
| dexHero | №1115 (+ 1 других файлов) |
| dexInput | №0807 |
| dexMod | №0607 (+ 6 других файлов) |
| dexSave | №1115 |
| dexScore | №0638 (+ 1 других файлов) |
| dexStats | №0638 |
| df | №0762 |
| di | №0638 (+ 1 других файлов) |
| diag | №1060 (+ 9 других файлов) |
| diagnostics | №1220 |
| diagonal | №0803 (+ 1 других файлов) |
| diagonals | №0803 |
| dialectAliases | №0811 |
| DIALECTS | №0811 |
| dice | №0762 (+ 6 других файлов) |
| DICE_ICONS | №0815 (+ 2 других файлов) |
| diceCount | №0755 (+ 3 других файлов) |
| diceCountInp | №0774 |
| diceDir | №0871 |
| diceFiles | №0871 |
| diceMatch | №0755 |
| diceOptions | №0630 |
| diceRegex | №0819 |
| dices | №0774 |
| diceSides | №0755 (+ 1 других файлов) |
| diceSpent | №0061 |
| diceTab | №0755 |
| diceTypes | №0630 |
| die | №0064 (+ 7 других файлов) |
| DIE | №0624 (+ 1 других файлов) |
| dieSides | №0794 |
| diff | №0683 (+ 1 других файлов) |
| dig | №1116 |
| digDeep | №0638 |
| digDeepTypes | №0638 |
| digit | №0044 |
| digits | №0044 |
| dimLayer | №0851 |
| dir | №0044 (+ 9 других файлов) |
| dire | №0762 |
| direct | №0048 |
| directCompatible | №1097 |
| direction | №0801 (+ 2 других файлов) |
| direMax | №0762 |
| DIRS | №0803 |
| dirty | №0762 (+ 1 других файлов) |
| dirtyApplied | №0762 |
| dirtyDC | №0762 |
| dirtyHero | №1115 |
| dirtyResource | №0762 |
| dirtySave | №0762 |
| dirtyTarget | №1115 |
| dis | №0638 (+ 2 других файлов) |
| disable | №0775 |
| disabled | №0802 |
| disBtn | №0776 |
| disc | №0044 (+ 2 других файлов) |
| discharge | №1046 |
| dischargeTarget | №1046 |
| disciplineAliases | №0812 |
| disciplineByPower | №0762 |
| disciplines | №0812 |
| discover | №0062 |
| discoveries | №0061 |
| discovery | №0061 |
| discoveryLevel | №0061 |
| discoveryName | №0061 |
| discoveryRecipes | №0061 |
| displacement | №1090 |
| display | №0683 (+ 1 других файлов) |
| displayName | №0607 (+ 3 других файлов) |
| displaySpeed | №0766 |
| displayStyle | №0819 |
| dist | №0044 (+ 4 других файлов) |
| distal | №0044 |
| distance | №0044 (+ 4 других файлов) |
| distanceFt | №0801 (+ 1 других файлов) |
| distanceRolled | №0801 |
| distances | №1093 (+ 2 других файлов) |
| div | №0683 |
| dl | №0044 (+ 1 других файлов) |
| dm | №0794 (+ 1 других файлов) |
| dmg | №0061 (+ 7 других файлов) |
| dmgBonus | №0630 |
| dn | №0044 |
| DND_CLASSES_LIST | №0607 (+ 1 других файлов) |
| DND_DAMAGE_TYPES | №0774 |
| DND_SKILLS_LIST | №0774 |
| DND_WEAPON_CATEGORIES | №0774 |
| DND_WEAPON_PROPERTIES | №0774 |
| dndBackgrounds | №0607 |
| dndModal | №0683 |
| doc | №1159 (+ 2 других файлов) |
| document | №1048 |
| dom | №1100 |
| dome | №0044 |
| domReady | №1181 (+ 1 других файлов) |
| done | №0825 (+ 3 других файлов) |
| donor | №0796 |
| dot | №0041 |
| down | №0058 |
| download | №1234 |
| downloadAnchor | №0815 |
| downloads | №1081 |
| dr | №0762 (+ 2 других файлов) |
| draft | №0801 (+ 2 других файлов) |
| DRAFT | №0043 |
| drag | №0846 |
| dragon | №1185 |
| dragonGraft | №0061 |
| draw | №0766 (+ 4 других файлов) |
| drawer | №0776 |
| drawerContainer | №0755 |
| drawerContent | №0755 |
| drawWindow | №0756 |
| dreadAttack | №1115 |
| dreadHandHero | №1115 |
| dreadHero | №1115 |
| dreadTarget | №1115 |
| dress | №1058 |
| drop | №0044 |
| dry | №1080 |
| ds | №0638 (+ 1 других файлов) |
| dst | №0052 (+ 1 других файлов) |
| dt | №0044 (+ 2 других файлов) |
| du | №0041 |
| duplicates | №1264 |
| duplicityMiss | №0638 |
| duplicityTarget | №0638 |
| dupRoll | №0638 |
| durability | №0782 (+ 1 других файлов) |
| duration | №0852 |
| durationMs | №0065 |
| durationSeconds | №0852 |
| dv | №0041 (+ 3 других файлов) |
| dwarf | №0049 |
| dwarfDesc | №0646 |
| dx | №0041 (+ 13 других файлов) |
| dy | №0041 (+ 12 других файлов) |
| dynamicContainer | №0776 |
| dynamoAttack | №1047 |
| dz | №0041 (+ 5 других файлов) |
| dzdt | №0041 |
| e | №0041 (+ 143 других файлов) |
| E | №0792 |
| e0 | №0046 (+ 1 других файлов) |
| each | №0631 |
| ear | №0044 |
| earOuter | №0044 |
| ears | №0044 (+ 1 других файлов) |
| earVertices | №1061 |
| eb | №0044 (+ 1 других файлов) |
| ec | №0762 |
| eco | №1145 |
| econ | №0648 (+ 1 других файлов) |
| ECON | №0647 |
| edge | №0044 |
| edges | №0044 |
| editor | №0870 (+ 1 других файлов) |
| editorWeaponPresets | №0046 |
| ef | №0061 (+ 1 других файлов) |
| eff | №0762 |
| effect | №0061 (+ 2 других файлов) |
| effectApplies | №0638 |
| effectiveD20 | №0638 |
| effectiveDiceCount | №0755 |
| effectiveMode | №0755 |
| effectMap | №0061 |
| effects | №0657 (+ 2 других файлов) |
| EFFECTS | №0063 |
| effectSerial | №0624 |
| eid | №0792 (+ 1 других файлов) |
| eInput | №0773 |
| el | №0053 (+ 27 других файлов) |
| elapsed | №0861 |
| elBar | №0763 |
| elCurExp | №0763 |
| elCurLvl | №0763 |
| elDesc | №0807 |
| electromagneticShield | №0638 |
| elem | №1185 |
| element | №0762 |
| elementId | №0776 |
| elements | №1048 (+ 2 других файлов) |
| elementsToHide | №0851 |
| elId | №0775 |
| eligible | №0804 |
| elInputCur | №0763 |
| ellipse | №0041 |
| elName | №0807 |
| elNextExp | №0763 |
| elSpeed | №0807 |
| email | №0634 (+ 1 других файлов) |
| embedded | №0804 |
| emojis | №0755 |
| empty | №0044 |
| emptyMsg | №0774 |
| enabled | №0042 (+ 2 других файлов) |
| encodeURIComponent | №1173 (+ 1 других файлов) |
| encounter | №0788 |
| end | №0044 (+ 4 других файлов) |
| ended | №0801 |
| ends | №0057 |
| endY | №0045 |
| enemies | №0801 |
| enemy | №0855 (+ 1 других файлов) |
| enemyHP | №1125 |
| energyDamage | №0061 |
| energyResult | №0061 |
| energySeamTarget | №1046 |
| engine | №1172 |
| englishName | №0761 |
| engName | №0683 (+ 1 других файлов) |
| enhancedAttack | №1115 |
| enhancedTarget | №1115 |
| entity | №0061 (+ 1 других файлов) |
| entries | №0636 (+ 7 других файлов) |
| entry | №0046 (+ 16 других файлов) |
| entryId | №0779 |
| env | №1101 |
| envelope | №0041 |
| ep | №0762 (+ 2 других файлов) |
| epInput | №0773 |
| epoch | №0636 |
| eprof | №0794 |
| eps | №0041 (+ 2 других файлов) |
| epsilon | №0045 |
| epVal | №0773 |
| equipCheckbox | №0776 |
| equipLabel | №0776 |
| equipment | №0049 |
| equippedWeapon | №0755 |
| er | №0044 (+ 1 других файлов) |
| err | №0046 (+ 4 других файлов) |
| error | №0046 (+ 1 других файлов) |
| errorCount | №0754 |
| errors | №0644 (+ 40 других файлов) |
| es | №0063 |
| esc | №0053 (+ 1 других файлов) |
| escape | №1173 (+ 2 других файлов) |
| ev | №0766 (+ 6 других файлов) |
| evasion | №0638 |
| event | №0057 (+ 15 других файлов) |
| EVENT_LIMIT | №0793 |
| eventAttacker | №0638 |
| eventBox | №0802 |
| eventChainHeadHash | №0793 |
| eventLabel | №0802 |
| eventLogBaseHash | №0793 |
| eventLogBaseSeq | №0793 |
| events | №0793 (+ 5 других файлов) |
| eventText | №0802 |
| evo | №1185 |
| evt | №1048 |
| ex | №0044 (+ 1 других файлов) |
| exact | №0644 (+ 2 других файлов) |
| excess | №0762 |
| exhaustion | №0808 |
| exhaustionNow | №0638 |
| exhaustionText | №0808 |
| existing | №0057 (+ 8 других файлов) |
| existingClass | №0769 |
| existingClassEntry | №0683 |
| existingOverlay | №0755 |
| exists | №0629 (+ 1 других файлов) |
| existsL | №0629 |
| exp | №0763 |
| expand | №0045 |
| expanded | №0046 |
| expBasedLevel | №0763 |
| expected | №0061 (+ 4 других файлов) |
| expectedRevision | №0804 |
| expert | №1110 |
| expiration | №1124 |
| expired | №1115 |
| expires | №0816 |
| explicit | №1049 |
| exploitContract | №0762 |
| exploits | №0855 |
| explored | №0057 |
| exposureActor | №0638 |
| expr | №0631 (+ 7 других файлов) |
| expression | №0762 |
| ext | №0056 (+ 4 других файлов) |
| external | №0042 (+ 1 других файлов) |
| externalCalls | №1086 |
| externalJson | №1086 |
| externalPanels | №0755 |
| extra | №0044 (+ 25 других файлов) |
| EXTRA | №0626 |
| EXTRA_RULES | №0062 |
| EXTRA_TRIGGER | №0063 |
| EXTRA_TYPES | №0628 |
| extraACBonus | №0776 |
| extraActions | №0801 |
| extraAtk | №0794 |
| extraClass | №0683 |
| extraClasses | №1214 |
| extraDamages | №0774 |
| extraData | №0776 (+ 1 других файлов) |
| extraDmg | №0794 |
| extraDmgContainer | №0774 |
| extraLine | №0728 |
| extraLocked | №0683 |
| extraName | №0683 (+ 1 других файлов) |
| extrapolated | №1220 |
| extras | №0046 (+ 3 других файлов) |
| extraType | №0683 |
| exts | №0871 |
| ey | №0044 |
| eye | №0044 (+ 1 других файлов) |
| eyeBtn | №0851 |
| eyeIsland | №0044 |
| eyePart | №0044 |
| eyes | №0044 (+ 2 других файлов) |
| eyeSave | №1233 |
| eyesDiag | №1233 |
| eyesOff | №1233 |
| eyeWeight | №0044 |
| eyeX | №0044 |
| eyeY | №0044 |
| eyeZ | №0044 |
| ez | №0044 |
| f | №0042 (+ 101 других файлов) |
| F | №1184 (+ 4 других файлов) |
| fa | №0762 |
| face | №0041 (+ 2 других файлов) |
| faceParts | №0046 |
| faces | №0041 (+ 3 других файлов) |
| facing | №0044 |
| FACTIONS | №0615 |
| factor | №0041 (+ 3 других файлов) |
| factory | №0810 |
| fadeInterval | №0065 |
| fadeTimer | №0780 |
| fail | №1131 (+ 1 других файлов) |
| failed | №1198 |
| failedSave | №0816 |
| fall | №1180 |
| fallback | №0044 (+ 7 других файлов) |
| FALLBACK_MANIFEST_URL | №0825 |
| fallbackName | №0696 |
| fallbackText | №0755 |
| false | №0762 (+ 6 других файлов) |
| fam | №0612 (+ 10 других файлов) |
| familiarForms | №0762 |
| FAMILIES | №0611 |
| family | №0611 (+ 1 других файлов) |
| FAMILY_BY_CREATURE | №0757 |
| FAMILY_DEFS | №0757 |
| FAMILY_NAMES | №0612 (+ 11 других файлов) |
| familyId | №0757 |
| familyOpts | №0757 |
| fangs | №0044 |
| fangsOff | №1233 |
| fans | №1070 |
| fantasy | №1231 |
| fantasySaved | №1231 |
| fApplied | №0762 |
| faq | №0798 |
| FAQ | №0798 |
| far | №0056 (+ 1 других файлов) |
| fat | №0044 |
| fatalHit | №1115 |
| fateMax | №0631 |
| fc | №0056 |
| fd | №0061 |
| fdc | №0762 |
| fdmg | №0762 |
| fearSave | №0762 |
| feat | №0631 (+ 2 других файлов) |
| FEAT_STAT_LABELS | №0728 |
| FEAT_VALID_STATS | №0728 |
| featActionHtml | №0728 |
| featDesc | №0728 |
| featherHead | №0046 |
| featherKind | №0046 |
| featherPart | №0046 |
| featName | №0728 |
| featObj | №0683 (+ 1 других файлов) |
| feats | №0608 (+ 2 других файлов) |
| featsOptions | №0683 |
| feature | №0061 (+ 3 других файлов) |
| FEATURE_DEFS | №0631 |
| FEATURE_TARGET_RULES | №0794 |
| featureDescStr | №0607 (+ 1 других файлов) |
| featureHtml | №0607 (+ 2 других файлов) |
| featureIds | №0644 (+ 1 других файлов) |
| featureIndex | №0644 |
| featureLevel | №0644 |
| featureList | №0696 |
| featureLists | №0631 |
| featureMeta | №0631 |
| featureMod | №0638 |
| featureMode | №0638 |
| features | №0061 (+ 9 других файлов) |
| featuresHtml | №0683 |
| featuresList | №0683 |
| featureStr | №0607 (+ 1 других файлов) |
| fecund | №0762 |
| feet | №0044 (+ 2 других файлов) |
| female | №0045 (+ 5 других файлов) |
| femalePositions | №1050 |
| fer | №0639 |
| ferocity | №1123 |
| fetched | №0825 |
| ff | №0056 (+ 1 других файлов) |
| fgm | №1187 |
| fi | №0044 (+ 3 других файлов) |
| fid | №0631 (+ 4 других файлов) |
| field | №0044 (+ 8 других файлов) |
| fieldLengths | №1095 |
| fields | №1244 (+ 2 других файлов) |
| fiend | №1121 |
| fight | №0801 |
| fighter | №1184 (+ 1 других файлов) |
| fighters | №0802 |
| fightingPack | №0638 |
| fightingResource | №0638 |
| fightingResult | №0638 |
| fightingStyleEffects | №0762 |
| file | №0815 (+ 55 других файлов) |
| fileNo | №1264 |
| filePath | №0851 |
| files | №0652 (+ 8 других файлов) |
| fileUrl | №0872 |
| filter | №0064 (+ 3 других файлов) |
| filteredItems | №0819 |
| filters | №0628 (+ 1 других файлов) |
| filterText | №0728 |
| final | №0762 (+ 1 других файлов) |
| finalAC | №0776 |
| finalAttackTotal | №0755 |
| finalCount | №0655 |
| finalData | №0774 |
| finalName | №0774 |
| finalPropsString | №0774 |
| finalSkillModifier | №0755 |
| finalStats | №0607 (+ 1 других файлов) |
| finalTotal | №0755 (+ 1 других файлов) |
| fingerless | №0044 |
| fins | №0044 |
| finsOff | №1233 |
| fire | №0826 |
| fireFront | №0826 |
| fireRoll | №0061 |
| first | №0041 (+ 8 других файлов) |
| firstFace | №1097 |
| firstVertex | №1097 |
| fit | №0046 (+ 5 других файлов) |
| fitted | №0044 (+ 2 других файлов) |
| fixture | №1067 |
| flags | №0639 |
| flare | №0045 |
| flat | №1070 |
| fleeing | №1105 |
| fleePhone | №1105 |
| flexible | №1047 |
| flexibleInstall | №1047 |
| Float32Array | №1048 (+ 23 других файлов) |
| Float64Array | №1053 (+ 2 других файлов) |
| floor | №0044 (+ 3 других файлов) |
| FLOOR | №0055 |
| floorAttack | №1115 |
| floorHero | №1115 |
| floorHpBefore | №1115 |
| floorMod | №1116 |
| floors | №0059 |
| floorTarget | №1115 (+ 1 других файлов) |
| floorTypes | №0059 |
| flush | №1048 |
| flyer | №1115 |
| fm | №0638 (+ 1 других файлов) |
| fm2 | №1187 |
| fn | №0041 (+ 28 других файлов) |
| focus | №0041 (+ 1 других файлов) |
| focusEl | №0798 |
| focusSources | №0819 |
| fog | №1101 |
| fogShade | №0056 |
| fold | №0044 |
| folder | №1218 |
| folderId | №0795 |
| fontKey | №0815 |
| fontObj | №0815 |
| fontSelect | №0815 |
| fontStyleTag | №0815 |
| foot | №0044 (+ 1 других файлов) |
| footH | №0044 |
| force | №0782 (+ 1 других файлов) |
| forceCrit1 | №0755 |
| forced | №0801 |
| forceSlot | №0827 |
| forearmHigh | №0044 |
| forearmLow | №0044 |
| foreign | №1124 |
| fork | №0044 |
| form | №0044 (+ 5 других файлов) |
| formattedText | №0683 |
| formula | №0624 (+ 3 других файлов) |
| formulaDamage | №0061 |
| formulae | №0061 |
| formulaEffects | №0061 |
| formulaHero | №1047 |
| formulaIds | №0762 |
| formulas | №0624 (+ 1 других файлов) |
| fortifying | №0762 |
| fortune | №0810 |
| forward | №0044 (+ 1 других файлов) |
| found | №0045 (+ 16 других файлов) |
| foundIdx | №0851 |
| foundItemData | №0775 |
| foundProf | №0805 |
| foundWeapon | №0806 (+ 1 других файлов) |
| fov | №0056 |
| fr | №0669 (+ 1 других файлов) |
| fR1 | №0755 (+ 1 других файлов) |
| fR2 | №0755 (+ 1 других файлов) |
| fragHighp | №0056 |
| frame | №0044 (+ 24 других файлов) |
| frameColorSelect | №0815 |
| frameKey | №0815 |
| frames | №1065 |
| frameStyleSelect | №0815 |
| framework | №1109 |
| free | №0044 (+ 2 других файлов) |
| freeGather | №0861 |
| fresh | №0044 (+ 3 других файлов) |
| friend | №1105 |
| frightened | №0801 |
| frill | №0044 |
| from | №0615 (+ 4 других файлов) |
| front | №0042 (+ 4 других файлов) |
| frontal | №0044 |
| frontCount | №0044 |
| frontPlate | №0044 |
| frontTop | №0045 |
| fs | №0046 (+ 208 других файлов) |
| fsave | №0762 |
| fsp | №0869 (+ 1 других файлов) |
| ft | №0762 |
| full | №1081 |
| FULL | №0781 |
| FULL_CASTER_SLOTS_TABLE | №0819 |
| FULL_CASTERS | №0810 |
| FULL_SLOTS | №0810 |
| fullCoat | №0046 |
| fullData | №0728 |
| fullPath | №0869 |
| fur | №0046 (+ 1 других файлов) |
| furEnabled | №0046 |
| furryAccessory | №0046 |
| furryLimb | №0046 |
| furrySkull | №0046 |
| furSelect | №0046 |
| fuseMinutes | №0061 |
| fuseRounds | №0061 |
| future | №0046 (+ 1 других файлов) |
| fv | №0762 |
| fx | №0044 (+ 2 других файлов) |
| fy | №0044 (+ 1 других файлов) |
| g | №0042 (+ 140 других файлов) |
| G | №0064 |
| g1 | №0055 |
| gain | №0652 (+ 4 других файлов) |
| gained | №0639 (+ 1 других файлов) |
| gainedHp | №0769 |
| gameplay | №1172 |
| gameTool | №0629 |
| gap | №0045 |
| garment | №0045 |
| garments | №0044 |
| GATE_TOWNS | №0615 |
| gather | №0808 |
| GATHERING_ACTIONS | №0808 |
| gb | №1093 (+ 4 других файлов) |
| gdiag | №1094 (+ 1 других файлов) |
| ge | №0762 |
| gender | №0045 (+ 7 других файлов) |
| generated | №1145 |
| generatedHarvest | №1145 |
| generation | №0636 |
| GENERIC_SPECIALTIES | №0653 |
| geo | №0042 (+ 24 других файлов) |
| geometryKey | №1057 |
| geoTarget | №0794 |
| gesture | №0046 (+ 1 других файлов) |
| getData | №0696 |
| getStat | №0769 |
| getSub | №0696 |
| ghostBounds | №0046 |
| ghostForbiddenSlots | №0046 |
| ghostShellTarget | №0629 |
| ghostWeapon | №0046 |
| gi | №0638 |
| gills | №0044 |
| git | №1264 |
| gl | №0044 (+ 23 других файлов) |
| glb | №1093 (+ 7 других файлов) |
| glbPath | №1085 (+ 6 других файлов) |
| glbVertices | №1097 |
| glen | №0044 |
| global | №0815 (+ 84 других файлов) |
| globalAudio | №0065 |
| glove | №0044 |
| gn | №0762 |
| gname | №0762 |
| gnome | №0049 |
| gob | №1147 |
| gold | №0046 |
| goldNeeded | №0648 |
| golemCraft | №1047 |
| golemEntities | №1047 |
| golemEntity | №1047 |
| golemRestore | №1047 |
| good | №0624 (+ 1 других файлов) |
| got | №0062 (+ 2 других файлов) |
| gp | №0773 (+ 6 других файлов) |
| gPerE | №0773 |
| gpInput | №0773 |
| gpVal | №0773 |
| gradle | №0871 |
| graftAC | №0638 |
| graftArmorAttack | №1046 |
| graftArmorTarget | №1046 |
| graftCriticalAttack | №1046 |
| graftCriticalTarget | №1046 |
| graftDef | №0061 |
| graftInstalled | №1047 |
| graftMissingDonor | №1047 |
| graftName | №0061 |
| graftRemoved | №1047 |
| graftResistant | №0638 |
| grafts | №0061 (+ 1 других файлов) |
| grant | №0656 |
| granted | №0061 (+ 1 других файлов) |
| grantMaterial | №0651 |
| gray | №0046 |
| grid | №0815 (+ 7 других файлов) |
| grip | №0044 (+ 1 других файлов) |
| groom | №0044 |
| groove | №0041 |
| ground | №0044 (+ 1 других файлов) |
| group | №0041 (+ 8 других файлов) |
| grouped | №0631 |
| groupedFeats | №0683 |
| groupFeats | №0683 |
| groupKey | №0728 |
| groupKeys | №0805 |
| groupName | №0805 |
| groupOrder | №0728 |
| groupRolls | №0819 |
| groups | №0044 (+ 4 других файлов) |
| groupsMap | №0805 |
| groupTitle | №0774 |
| growth | №1115 |
| growthAttack | №1115 |
| growthTarget | №1115 |
| gs | №1094 |
| guard | №0766 (+ 2 других файлов) |
| guide | №1148 (+ 3 других файлов) |
| guildDesc | №0646 |
| gw | №1268 |
| h | №0042 (+ 116 других файлов) |
| H | №0042 (+ 10 других файлов) |
| h2 | №1184 |
| h3 | №1109 (+ 1 других файлов) |
| h4 | №1184 |
| hab | №0611 |
| habitat | №0046 (+ 1 других файлов) |
| habitats | №0046 |
| hadSpeedZero | №0766 |
| hair | №0042 (+ 2 других файлов) |
| hairLength | №0044 |
| hairProfiles | №0044 |
| hairs | №0044 (+ 1 других файлов) |
| half | №0044 (+ 2 других файлов) |
| HALF_CASTERS | №0810 |
| hand | №0044 (+ 1 других файлов) |
| handle | №0872 |
| handleAdd | №0774 |
| handleAddClick | №0774 |
| handleArmorCatSelect | №0774 |
| handleCatSelect | №0774 |
| handleDel | №0774 |
| handleDiceSelect | №0774 |
| handlePropToggle | №0774 |
| handler | №0825 (+ 1 других файлов) |
| handlers | №0631 (+ 1 других файлов) |
| HANDLERS | №0801 |
| handleTabClick | №0776 |
| handMax | №1060 |
| handoffCalls | №1207 |
| hands | №0044 |
| harness | №1246 |
| harvest | №1135 (+ 1 других файлов) |
| hasActiveModal | №0823 |
| hasAoe | №0794 |
| hasAutoStarted | №0065 |
| hasDex | №0762 |
| hasDice | №0819 |
| hasFirearmsAll | №0806 |
| hasGraft | №0061 |
| hash | №0825 (+ 4 других файлов) |
| hashes | №1067 (+ 6 других файлов) |
| hasMagic | №0819 |
| hasMartialAll | №0806 |
| hasProf | №0856 |
| hasProficiency | №0776 |
| hasSimpleAll | №0806 |
| hasSpecificProf | №0806 |
| hasTool | №0651 (+ 2 других файлов) |
| hasUV | №0046 |
| hat | №0044 (+ 4 других файлов) |
| have | №0648 (+ 1 других файлов) |
| hay | №0776 (+ 1 других файлов) |
| haymaker | №1115 |
| hayTarget | №1115 |
| hb | №1093 (+ 4 других файлов) |
| hCls | №0819 |
| hctx | №1207 |
| hd | №0796 (+ 1 других файлов) |
| hdiag | №1099 |
| head | №0041 (+ 5 других файлов) |
| HEAD_AXES | №0049 |
| HEAD_FORMS | №0049 |
| HEAD_STYLES | №0049 |
| header | №0810 (+ 1 других файлов) |
| headerAC | №0066 |
| headers | №0636 (+ 2 других файлов) |
| heading | №0755 |
| headMax | №1060 |
| heal | №0762 (+ 2 других файлов) |
| heal2 | №0762 |
| healBatch | №1207 |
| healed | №0061 (+ 9 других файлов) |
| healer | №0624 |
| healing | №0854 (+ 2 других файлов) |
| healMap | №0061 |
| healRoll | №0061 |
| healTarget | №1207 |
| healv | №0631 |
| heatDamage | №1047 |
| heatMode | №0061 |
| height | №0044 (+ 6 других файлов) |
| heights | №1117 |
| held | №1105 (+ 2 других файлов) |
| heldName | №1106 |
| help | №0798 |
| hem | №0045 |
| hemoragent | №1047 |
| hemoragentNoPool | №1047 |
| hermit | №1105 |
| hermitHero | №1105 |
| hero | №0769 (+ 39 других файлов) |
| heroClassNames | №0819 |
| heroFeats | №0728 |
| heroFeatsRef | №0728 |
| heroIsExtra | №0683 |
| heroLevel | №0644 |
| heroLevels | №0788 |
| hex | №0045 (+ 3 других файлов) |
| hi | №0044 (+ 10 других файлов) |
| hidden | №0063 (+ 1 других файлов) |
| hiddenBuckets | №0044 |
| high | №0044 (+ 5 других файлов) |
| highlight | №0046 |
| hint | №0046 |
| hip | №0044 (+ 1 других файлов) |
| hipCenter | №0045 |
| hipMax | №0045 |
| hipMin | №0045 |
| hipRadius | №0045 |
| history | №0046 (+ 4 других файлов) |
| hit | №0638 (+ 13 других файлов) |
| HIT_COST | №0786 |
| hitDie | №0676 (+ 2 других файлов) |
| hitDieMax | №0769 |
| hiX | №0044 |
| hiY | №0044 |
| hm | №1093 (+ 7 других файлов) |
| hole | №0044 |
| holeCounts | №0041 |
| holes | №0044 |
| holeVertices | №0041 |
| hollowHp | №0638 |
| holyAttack | №1047 |
| homebrewClasses | №1214 |
| homunculusCraft | №1047 |
| homunculusEntities | №1047 |
| homunculusOwner | №0638 (+ 1 других файлов) |
| homunculusState | №0638 |
| hood | №0041 (+ 1 других файлов) |
| hoof | №1068 |
| hoofScale | №0044 |
| hoofY | №0044 |
| hook | №0044 |
| hooks | №1046 (+ 3 других файлов) |
| HORN_STYLES | №0049 |
| hornAttack | №1047 |
| hornInstall | №1047 |
| hornPart | №0044 |
| horns | №0044 (+ 1 других файлов) |
| hornSelect | №0046 |
| hornSize | №1074 |
| hornStyle | №0044 (+ 1 других файлов) |
| horror | №0612 (+ 1 других файлов) |
| horseY | №0044 |
| hosiery | №0046 |
| hosieryDen | №1059 |
| host | №0064 (+ 24 других файлов) |
| hostBox | №0793 |
| hostDestroyed | №0799 |
| hostiles | №0639 (+ 1 других файлов) |
| houndHP | №0762 |
| houndTemplate | №0762 |
| howlTargets | №0624 |
| hp | №0061 (+ 21 других файлов) |
| hpAfter | №1181 |
| hpAfterTick | №1046 |
| hpBefore | №1105 |
| hpBeforeShift | №1124 |
| hpCurrentInput | №0683 (+ 1 других файлов) |
| hpDamage | №0638 |
| hpGain | №0683 |
| hpMax | №0630 (+ 1 других файлов) |
| hpMaxInput | №0683 (+ 1 других файлов) |
| hpNow | №0762 |
| hpObj | №0061 |
| hpRes | №0683 |
| hpShape | №1115 |
| hs | №1094 |
| html | №0065 (+ 51 других файлов) |
| http | №1223 (+ 37 других файлов) |
| hud | №1157 (+ 1 других файлов) |
| hugeHands | №1047 |
| human | №1049 (+ 2 других файлов) |
| hunter | №1190 |
| hv | №1145 |
| hx | №0762 |
| hy | №0044 |
| hybrid | №0762 |
| i | №0042 (+ 173 других файлов) |
| ia | №1094 (+ 2 других файлов) |
| ib | №0051 |
| icon | №0775 (+ 3 других файлов) |
| iconEl | №0775 |
| iconId | №0815 (+ 3 других файлов) |
| iconPath | №0869 |
| ICONS | №0815 (+ 2 других файлов) |
| id | №0042 (+ 142 других файлов) |
| ID | №0818 (+ 1 других файлов) |
| idat | №1072 |
| identity | №0056 (+ 1 других файлов) |
| idName | №0728 |
| idOrName | №0655 |
| ids | №0041 (+ 30 других файлов) |
| idv | №0052 (+ 1 других файлов) |
| idx | №0046 (+ 30 других файлов) |
| ignoreWeight | №0772 |
| ii | №1094 (+ 1 других файлов) |
| illIds | №1123 |
| im | №0052 (+ 3 других файлов) |
| Image | №1048 |
| images | №1048 |
| img | №0046 (+ 3 других файлов) |
| IMG | №0055 |
| imitation | №0061 |
| immune | №0801 (+ 3 других файлов) |
| immuneCharm | №0762 |
| immuneFire | №1046 |
| immuneUntil | №0638 |
| immunity | №0624 |
| imported | №1089 |
| improved | №0786 |
| inCombat | №0624 |
| incoming | №1082 (+ 1 других файлов) |
| incomingType | №0638 |
| incompatible | №0046 |
| indent | №0772 |
| index | №0041 (+ 24 других файлов) |
| indexed | №0776 |
| indices | №0041 (+ 4 других файлов) |
| Infinity | №0044 (+ 8 других файлов) |
| influence | №0041 |
| influences | №0041 |
| info | №0634 (+ 3 других файлов) |
| infoBox | №0807 |
| infoText | №0775 |
| ing | №0062 (+ 2 других файлов) |
| INGREDIENT_SOURCES | №0064 |
| INGREDIENTS | №0062 |
| ings | №0062 (+ 1 других файлов) |
| ini | №0794 |
| initElem | №0607 (+ 1 других файлов) |
| initial | №1048 (+ 2 других файлов) |
| initialAngle | №0045 |
| initialId | №1048 |
| initialProficiencies | №0629 |
| initialSkillsData | №0607 (+ 1 других файлов) |
| initiative | №0756 (+ 1 других файлов) |
| inline | №0052 |
| inner | №0041 (+ 1 других файлов) |
| innerDivs | №0805 |
| innerHtml | №0819 |
| innerList | №0776 |
| inp | №0774 |
| input | №0042 (+ 22 других файлов) |
| inputColEP | №0773 |
| inputColPP | №0773 |
| inputCopper | №0773 |
| inputElem | №0763 (+ 1 других файлов) |
| inputField | №0775 |
| inputGrid | №0773 |
| inputId | №0809 |
| inputVal | №0763 |
| ins | №0762 |
| INS | №0811 |
| inside | №0794 |
| insight | №0061 |
| inspect | №0062 |
| inspired | №1105 |
| inspiredPhone | №1105 |
| installed | №0643 (+ 1 других файлов) |
| installedGrafts | №0061 |
| instantDeath | №0638 |
| int | №0611 (+ 10 других файлов) |
| Int16Array | №1050 (+ 21 других файлов) |
| Int8Array | №1050 (+ 21 других файлов) |
| internal | №0762 |
| intervalVal | №0851 |
| intMod | №0607 (+ 5 других файлов) |
| inv | №0041 (+ 14 других файлов) |
| invalidDead | №1047 |
| inventory | №0806 (+ 1 других файлов) |
| inventorySearchState | №0776 |
| inverted | №1105 |
| invertedPhone | №1105 |
| invHeaderACEl | №0776 |
| invis | №1047 |
| invisibleAttacker | №1046 |
| invisUsed | №0638 |
| invokeOptions | №0762 |
| invSrc | №1167 |
| ioff | №0052 |
| ionizer | №1047 |
| ionizerClass | №0638 |
| ionizerEngineer | №1047 |
| ionizerTarget | №1046 |
| ip | №0629 |
| ipcMain | №0869 |
| ipcRenderer | №0870 |
| ir | №0052 (+ 1 других файлов) |
| ironChinAttack | №1115 |
| ironChinTarget | №1115 |
| irregular | №0044 |
| is | №1094 |
| isActionProcessed | №0774 |
| isActive | №0851 (+ 1 других файлов) |
| isAlreadyHas | №0805 |
| isAsiLevel | №0683 |
| isAttackOrCheck | №0755 |
| isAutoOn | №0851 |
| isAvailable | №0819 |
| isBlood | №0794 |
| isBomb | №0061 |
| isChecked | №0607 (+ 4 других файлов) |
| isCrit | №0819 |
| isDead | №0061 |
| isDebug | №0815 |
| isDebugEnabled | №0754 |
| isDestroyed | №0780 |
| isDrawerOpen | №0755 |
| isEnabled | №0815 (+ 1 других файлов) |
| isExpert | №0755 |
| isExtraHero | №0683 |
| isFinesse | №0755 |
| isFinger | №0044 |
| isFinite | №1132 (+ 15 других файлов) |
| isFirearm | №0806 |
| isFree | №0827 |
| isGhost | №0629 (+ 1 других файлов) |
| isGhostExtra | №0629 |
| isGhostHero | №0683 |
| isGrouped | №0774 |
| isHeavyOrExceeds | №0775 |
| isHero | №0756 |
| isHidden | №0776 |
| isInterfaceHidden | №0851 |
| isize | №0052 |
| isLandscape | №0869 |
| isLeft | №0042 |
| isMartial | №0806 |
| isMoreStep | №0798 |
| isNewClass | №0683 (+ 1 других файлов) |
| isolated | №1216 |
| isOverLimit | №0819 |
| isOverweight | №0775 |
| isParasite | №0629 (+ 1 других файлов) |
| isParasiteExtra | №0629 |
| isParasiteHero | №0683 |
| isPhbA | №0819 |
| isPlayingAmbience | №0065 |
| isPOT | №0056 |
| isPrepared | №0819 |
| isProf | №0607 (+ 2 других файлов) |
| isProficient | №0755 |
| isRanged | №0755 |
| isRepeatOneOn | №0065 |
| isRight | №0042 |
| isRite | №0624 |
| isRowActionProcessed | №0774 |
| isSelected | №0065 (+ 1 других файлов) |
| isShield | №0776 |
| isShuffleOn | №0065 |
| isSimple | №0806 |
| isSuccess | №0755 |
| issues | №0655 |
| isSwarm | №0629 (+ 1 других файлов) |
| isSwarmExtra | №0629 |
| isSwarmHero | №0683 |
| isWalterHero | №0683 |
| isWalterParasite | №0629 (+ 1 других файлов) |
| isWalterParasiteExtra | №0629 |
| isWalterParasiteHero | №0683 |
| it | №0648 (+ 4 других файлов) |
| item | №0045 (+ 33 других файлов) |
| itemArray | №0775 |
| itemCards | №0775 |
| itemCategory | №0776 |
| itemData | №0775 (+ 1 других файлов) |
| itemId | №0782 (+ 2 других файлов) |
| itemName | №0776 |
| itemRegistry | №0775 |
| items | №0044 (+ 13 других файлов) |
| iterations | №0803 |
| iv | №0052 (+ 3 других файлов) |
| iw | №0762 (+ 1 других файлов) |
| ix | №0041 (+ 3 других файлов) |
| j | №0041 (+ 24 других файлов) |
| J | №0044 |
| jaw | №0044 |
| jb | №1091 (+ 1 других файлов) |
| jh | №1091 (+ 1 других файлов) |
| ji | №0051 |
| jinx | №0638 |
| joinBox | №0793 |
| jointIds | №1062 |
| joints | №0041 (+ 4 других файлов) |
| journal | №0838 (+ 1 других файлов) |
| JOURNAL | №0636 (+ 1 других файлов) |
| jp | №1091 |
| jpad | №1220 |
| JSDOM | №1100 |
| json | №0052 (+ 12 других файлов) |
| JSON | №0646 (+ 55 других файлов) |
| jsonBytes | №1085 |
| jsonBytes0 | №1085 |
| jsonPad | №1085 |
| k | №0042 (+ 111 других файлов) |
| K | №0051 (+ 1 других файлов) |
| keep | №0044 (+ 4 других файлов) |
| keepConditions | №0061 |
| keepEffects | №0061 |
| keepFaces | №0041 |
| keepResistance | №0061 |
| key | №0044 (+ 59 других файлов) |
| KEY | №0043 (+ 20 других файлов) |
| keyName | №0061 |
| keys | №0044 (+ 6 других файлов) |
| kg | №0774 |
| kgInput | №0774 |
| killer | №0766 |
| kind | №0044 (+ 19 других файлов) |
| kingAlly | №0802 |
| kingEnemy | №1106 |
| kingSelect | №1106 |
| knee | №0044 |
| kneeHigh | №0044 |
| kneeLine | №0044 |
| kneeLow | №0044 |
| knockout | №1115 |
| knockoutHero | №1115 |
| knockoutTarget | №1115 |
| knot | №0046 |
| known | №0061 (+ 8 других файлов) |
| KNOWN | №0811 (+ 1 других файлов) |
| knownCantrips | №0061 |
| knownFormula | №0762 |
| knownProcessed | №0656 |
| knownSpell | №1126 |
| ko | №0762 |
| koMod | №1116 |
| koRoll | №0762 |
| koTarget | №1116 |
| l | №0044 (+ 43 других файлов) |
| L | №0041 (+ 2 других файлов) |
| la | №0794 |
| label | №0046 (+ 10 других файлов) |
| labels | №0046 (+ 2 других файлов) |
| LABELS | №0854 |
| lamp | №1101 |
| landed | №1105 |
| landscape | №0869 (+ 1 других файлов) |
| langCount | №0629 |
| langs | №0811 |
| LANGS | №0811 |
| langStr | №0629 |
| langText | №0807 |
| larva | №0044 (+ 1 других файлов) |
| larvaBounds | №0046 |
| larval | №0046 |
| last | №0041 (+ 7 других файлов) |
| lastError | №0046 |
| lastFace | №1097 |
| lastResult | №0784 |
| lastRow | №1072 |
| lastTap | №0780 |
| lastVertex | №1097 |
| late | №1048 |
| latitude | №0041 |
| latitudes | №0041 |
| launchTour | №0798 |
| layer | №0044 |
| layout | №1231 (+ 1 других файлов) |
| lazarusOwner | №1047 |
| lbs | №0774 |
| le | №0848 |
| lead | №0759 (+ 1 других файлов) |
| leaf | №0046 |
| leafSize | №1093 |
| lean | №0044 |
| learned | №0653 |
| leather | №0046 |
| leatherQty | №0646 |
| leaving | №1106 |
| leavingReach | №0802 |
| left | №0045 (+ 13 других файлов) |
| leftReaction | №0638 |
| leg | №0044 (+ 1 других файлов) |
| legacy | №0806 (+ 9 других файлов) |
| legacyCount | №1269 |
| legacyCurses | №0060 |
| legacyHuman | №1049 |
| legacyPact | №0781 |
| legend | №0046 |
| legPhase | №0044 |
| len | №0044 (+ 12 других файлов) |
| length | №0041 (+ 2 других файлов) |
| lengths | №1096 |
| level | №0041 (+ 37 других файлов) |
| level1 | №0761 |
| levelData | №0683 (+ 1 других файлов) |
| levelDisplays | №0683 |
| levelFilter | №0819 |
| levelFour | №1047 |
| levelInput | №0814 |
| levelInputs | №0683 |
| levelOk | №0819 |
| levelReq | №0762 |
| levels | №0658 (+ 23 других файлов) |
| LEVELS | №0653 |
| levelSources | №0819 |
| levelSpells | №0819 |
| levelUpBtn | №0763 |
| levelUpSrc | №1167 |
| levelVal | №0819 |
| li | №0055 (+ 1 других файлов) |
| lifecycle | №0776 |
| lift | №0044 |
| light | №0056 |
| lightArmor | №0638 |
| lightFloor | №0056 |
| lightLimitKg | №0775 |
| lightLimitLb | №0775 |
| lights | №0054 |
| lim | №0801 |
| limbRanges | №0044 |
| limbSamples | №0044 |
| limbSelect | №0046 |
| limit | №0044 (+ 3 других файлов) |
| limits | №0046 |
| limitStr | №0775 |
| line | №0044 (+ 8 других файлов) |
| lineno | №0754 |
| lines | №0810 |
| lingerie | №0045 |
| lingerieAtlas | №0045 |
| link | №0780 (+ 1 других файлов) |
| linked | №1105 |
| linkedPhone | №1105 |
| links | №0041 (+ 1 других файлов) |
| lip | №0044 |
| list | №0043 (+ 40 других файлов) |
| listContainer | №0065 (+ 2 других файлов) |
| listContainers | №0772 |
| listener | №0870 |
| listeners | №0636 (+ 1 других файлов) |
| lit | №1101 |
| lItem | №0629 |
| live | №0046 (+ 5 других файлов) |
| LIVE_PROGRESSION_KEYS | №0632 |
| liveKey | №0632 |
| livePC | №1105 |
| livePhone | №1105 |
| liveRoot | №0869 |
| liveServer | №1105 |
| lo | №0044 (+ 7 других файлов) |
| LOAD_FILES | №0646 |
| loader | №1086 |
| lobe | №0044 |
| loc | №1048 |
| local | №0044 (+ 5 других файлов) |
| localData | №0815 |
| localId | №0636 |
| localStorage | №1089 |
| lock | №0869 |
| locked | №0652 (+ 1 других файлов) |
| locks | №0044 (+ 1 других файлов) |
| logBox | №0754 |
| logContainer | №0755 |
| logContent | №0773 |
| logDiv | №0773 |
| logItem | №0755 |
| logLine | №0754 |
| logs | №0815 |
| logText | №0755 (+ 1 других файлов) |
| long | №0046 (+ 1 других файлов) |
| longFired | №0846 |
| longitude | №0041 |
| longTimer | №0846 |
| looksLikeModal | №0815 |
| lookup | №0044 |
| loop | №0041 |
| loot | №0610 (+ 18 других файлов) |
| LOOT_MODELS | №0789 |
| los | №0639 (+ 1 других файлов) |
| loss | №0624 (+ 1 других файлов) |
| low | №0044 (+ 6 других файлов) |
| lower | №0042 (+ 4 других файлов) |
| lowerId | №0045 |
| lowerJaw | №0044 |
| lowerLang | №0629 |
| lowerName | №0607 |
| lowerOptions | №0045 |
| lowerTool | №0629 |
| lowest | №0041 |
| loX | №0044 |
| loY | №0044 |
| lr | №0794 (+ 1 других файлов) |
| ls | №0056 (+ 2 других файлов) |
| lv | №0061 (+ 1 других файлов) |
| lvl | №0769 (+ 8 других файлов) |
| lvl1Options | №0629 |
| lvlA | №0819 |
| lvlB | №0819 |
| lvlBadge | №0819 |
| lvlDisplay | №0815 |
| lvlInput | №0815 |
| lx | №0055 |
| Lx | №0055 |
| ly | №0055 |
| Ly | №0055 |
| m | №0042 (+ 101 других файлов) |
| M | №0053 (+ 8 других файлов) |
| m0 | №1048 |
| m1 | №0657 (+ 1 других файлов) |
| m2 | №0657 |
| macro | №1268 |
| macroFile | №1268 |
| macros | №1091 (+ 2 других файлов) |
| madBomber | №0638 |
| mag | №0046 (+ 1 других файлов) |
| magic | №1167 |
| magicFistHero | №1115 |
| magicHit | №1115 |
| main | №0045 |
| mainCard | №0755 |
| mainWindow | №0869 |
| major | №1105 |
| MAJOR_ACTIONS | №0801 |
| MAJORS | №0804 |
| male | №1067 |
| malePositions | №1048 |
| maleRef | №1067 |
| malformed | №1053 (+ 3 других файлов) |
| manager | №1215 |
| manifest | №0778 (+ 3 других файлов) |
| manifestPath | №0872 (+ 1 других файлов) |
| manifestUrl | №0825 |
| manual | №1054 (+ 1 других файлов) |
| map | №0044 (+ 24 других файлов) |
| Map | №1087 (+ 5 других файлов) |
| mapped | №0762 |
| mapping | №0044 (+ 1 других файлов) |
| maps | №0854 (+ 1 других файлов) |
| mapToVar | №0817 |
| mark | №0624 |
| market | №0783 (+ 2 других файлов) |
| mask | №0042 (+ 2 других файлов) |
| MASS_HARVEST_MATERIALS | №0789 |
| master | №0648 (+ 2 других файлов) |
| mastery | №0794 |
| masteryNames | №0794 |
| mat | №0045 (+ 8 других файлов) |
| match | №0763 (+ 6 других файлов) |
| matches | №0631 (+ 2 других файлов) |
| material | №0045 (+ 2 других файлов) |
| MATERIAL_BRIDGE | №0789 |
| MATERIAL_DEFS | №0655 |
| materialCells | №0045 |
| materialIds | №0655 |
| materials | №0045 (+ 3 других файлов) |
| MATERIALS | №0650 (+ 2 других файлов) |
| math | №1115 (+ 1 других файлов) |
| Math | №1046 (+ 63 других файлов) |
| matrices | №0041 (+ 1 других файлов) |
| matrix | №0041 (+ 1 других файлов) |
| mats | №0647 (+ 6 других файлов) |
| max | №0044 (+ 37 других файлов) |
| MAX | №0786 (+ 3 других файлов) |
| MAX_CR | №0816 |
| MAX_DEPTH | №0772 |
| MAX_ERRORS | №0836 |
| MAX_FILES | №0872 |
| MAX_PLAYERS | №0793 |
| MAX_TOTAL_BYTES | №0872 |
| max2 | №0796 |
| maxAllowedLevel | №0819 |
| maxCapacityKg | №0775 (+ 1 других файлов) |
| maxCapacityLb | №0775 |
| maxDisplacement | №1090 |
| maxDistance | №1062 |
| maxFaces | №0041 (+ 1 других файлов) |
| maxHero | №1105 |
| maxHp | №0607 (+ 3 других файлов) |
| maxHP | №0852 |
| maximize | №0638 |
| maximum | №0638 (+ 2 других файлов) |
| maxIndex | №1097 |
| maxLevel | №0819 |
| maxOutside | №1220 |
| maxPrepared | №0819 |
| maxRestore | №0631 |
| maxSpell | №0818 |
| maxSteps | №0639 |
| maxTargets | №1092 |
| maxTex | №0056 |
| maxUses | №0637 (+ 1 других файлов) |
| maxVal | №0819 |
| maxVertices | №0046 (+ 6 других файлов) |
| maxX | №0054 |
| maxY | №0054 |
| MC1 | №0613 |
| mctx | №1208 (+ 1 других файлов) |
| MCV2 | №0614 |
| md | №0056 (+ 2 других файлов) |
| me | №0052 (+ 1 других файлов) |
| mean | №0041 (+ 6 других файлов) |
| meanUniform | №1072 |
| mechanics | №0816 |
| MECHANICS | №0060 (+ 2 других файлов) |
| medium | №0624 |
| mediumLimitKg | №0775 |
| mediumLimitLb | №0775 |
| memory | №1055 |
| mental | №0767 (+ 1 других файлов) |
| menu | №0798 |
| merged | №0046 (+ 1 других файлов) |
| mesh | №0044 (+ 4 других файлов) |
| meshes | №0052 (+ 2 других файлов) |
| message | №0046 (+ 16 других файлов) |
| messages | №0057 |
| meta | №0047 (+ 7 других файлов) |
| META_COST | №0631 |
| META_NAMES | №0631 |
| METAS | №0060 |
| method | №0636 |
| mettle | №0638 |
| mh | №0044 (+ 5 других файлов) |
| mi | №0052 (+ 2 других файлов) |
| microEntry | №0046 |
| mid | №0044 (+ 1 других файлов) |
| middles | №0041 |
| migrated | №0794 |
| mimeTypes | №0869 |
| min | №0044 (+ 7 других файлов) |
| mind | №0799 |
| minimumLevel | №0631 |
| minIndex | №1097 |
| minor | №1109 |
| MINOR_ACTIONS | №0801 |
| mins | №0851 |
| minutes | №0851 (+ 1 других файлов) |
| minutesSinceDeath | №0061 |
| minutesVal | №0851 |
| minVal | №0769 |
| minX | №0054 |
| minY | №0054 |
| miss | №1111 |
| missArena | №1115 |
| missedKnockoutHero | №1115 |
| missedKnockoutTarget | №1115 |
| misses | №1093 (+ 3 других файлов) |
| missing | №0647 (+ 10 других файлов) |
| missingReliefRoll | №1047 |
| missingTools | №0655 |
| missTarget | №1115 |
| mix | №0062 (+ 1 других файлов) |
| mixed | №1050 (+ 1 других файлов) |
| mj | №0762 |
| ml | №0044 |
| mm | №0056 (+ 2 других файлов) |
| mn | №0064 (+ 7 других файлов) |
| mo | №0056 |
| mob | №1105 |
| mobile | №1105 |
| mobileRange | №0056 |
| mod | №0607 (+ 9 других файлов) |
| modal | №0065 (+ 13 других файлов) |
| modalColorOptions | №0851 |
| modalHTML | №0683 |
| modals | №0776 |
| modDisplay | №0755 (+ 1 других файлов) |
| mode | №0053 (+ 21 других файлов) |
| modeButtons | №0755 |
| model | №0789 (+ 1 других файлов) |
| modeRadio | №0630 |
| modes | №1114 (+ 2 других файлов) |
| modeSelect | №0774 |
| modifier | №0637 (+ 1 других файлов) |
| modifierMatch | №0755 |
| modifiers | №1115 |
| MODIFIERS | №0657 |
| modMatches | №0819 |
| modName | №0755 |
| modNum | №0607 (+ 1 других файлов) |
| mods | №0638 (+ 5 других файлов) |
| modSourceLabel | №0755 |
| modStr | №0607 (+ 3 других файлов) |
| modTag | №0607 (+ 1 других файлов) |
| modules | №1029 (+ 37 других файлов) |
| modVal | №0755 (+ 1 других файлов) |
| monk | №1180 (+ 1 других файлов) |
| monster | №0788 (+ 2 других файлов) |
| MONSTER_RECIPES | №0789 |
| monsterCount | №0788 |
| monsterId | №0794 |
| monsterName | №0790 (+ 1 других файлов) |
| monsters | №0610 (+ 13 других файлов) |
| MONSTERS | №0638 |
| monsterSrc | №1188 |
| monstrousGrafts | №0061 |
| morph | №1093 (+ 2 других файлов) |
| morphBytes | №1085 |
| morphed | №1049 |
| morphName | №1085 |
| morphOffset | №1085 |
| morphPrimitives | №1088 (+ 1 других файлов) |
| morphTargets | №1088 |
| motion | №0046 |
| motionBack | №1105 |
| motionPC | №1105 |
| motionPhone | №1105 |
| motionRoster | №1105 |
| motionServer | №1105 |
| mouth | №0044 |
| mouthDistance | №0044 |
| mouthRadius | №0044 |
| mouthRY | №0044 |
| mouthY | №0044 |
| move | №0053 (+ 1 других файлов) |
| moved | №0846 (+ 2 других файлов) |
| moveExtraPanelsIntoDrawer | №0755 |
| moveHero | №1105 |
| moveItemToContainer | №0772 |
| movement | №0057 |
| movePC | №1105 |
| movePhone | №1105 |
| moveRoster | №1105 |
| movers | №0801 |
| moveServer | №1105 |
| moving | №0044 |
| moxie | №0762 |
| moxieBeforeMiss | №1115 |
| mp | №0631 (+ 2 других файлов) |
| mr | №0631 (+ 2 других файлов) |
| mrko | №0762 |
| ms | №0052 (+ 2 других файлов) |
| msg | №0815 (+ 11 других файлов) |
| msgEl | №0775 |
| mult | №0607 (+ 4 других файлов) |
| multi2 | №0652 |
| MULTICLASS_PROFICIENCIES_2014 | №0696 |
| MULTICLASS_REQUIREMENTS | №0769 |
| MULTIPLIER | №0788 |
| multiRules | №0683 |
| mults | №0773 |
| muscle | №0044 |
| mutableHit | №1046 |
| mutableTarget | №1046 |
| mutagenAbility | №0061 |
| mutagenAlly | №1047 |
| mutagenHero | №1047 |
| mutagenist | №1047 |
| mutagenNames | №0624 |
| mutagenResult | №1047 |
| mutagens | №0624 |
| mutatedCap | №0061 |
| MUTATION_SLOTS | №0799 (+ 1 других файлов) |
| mutations | №0775 (+ 4 других файлов) |
| mutCreated | №0762 |
| muts | №0822 |
| muzzle | №0044 (+ 3 других файлов) |
| mv | №0639 |
| mw | №0044 |
| mx | №0056 (+ 6 других файлов) |
| my | №0056 (+ 1 других файлов) |
| mysteries | №0796 |
| mythic | №1124 (+ 1 других файлов) |
| n | №0042 (+ 132 других файлов) |
| N | №0041 (+ 3 других файлов) |
| n2 | №1211 |
| nailLen | №0044 |
| name | №0042 (+ 154 других файлов) |
| NAME | №0818 (+ 1 других файлов) |
| NAME_ALIASES | №0785 |
| name2 | №0762 |
| nameA | №0819 |
| nameB | №0819 |
| nameInp | №0774 |
| nameInput | №0607 (+ 2 других файлов) |
| nameLower | №0755 |
| nameRu | №1214 |
| names | №0042 (+ 22 других файлов) |
| NAMES | №0611 (+ 12 других файлов) |
| nameSpan | №0776 (+ 1 других файлов) |
| NaN | №1124 |
| native | №0825 (+ 1 других файлов) |
| nativeBridge | №0793 |
| nativeClear | №0636 |
| nativePacketSeq | №0793 |
| nativeRemove | №0636 |
| nativeSeenSeqByPeer | №0793 |
| nativeSet | №0636 |
| nativeVersion | №0825 |
| natural | №0816 |
| naturalAttack | №1124 |
| naturalGrafts | №0061 |
| naturalTwenty | №0638 |
| nb | №0044 |
| nctx | №1207 |
| ne | №1183 (+ 7 других файлов) |
| near | №0041 (+ 2 других файлов) |
| nearest | №0639 (+ 1 других файлов) |
| nearestAt | №0044 |
| nearestDist | №0639 |
| neck | №0044 |
| neckDrop | №0045 |
| neckFront | №0045 |
| neckIndices | №0044 |
| neckMap | №0044 |
| neckNormals | №0044 |
| neckZ | №0044 |
| necromanticRevival | №0638 |
| necrotic | №0638 |
| needsSave | №0638 |
| needsSubclassChoice | №0683 |
| needsTarget | №0762 |
| net | №0756 (+ 4 других файлов) |
| neutral | №1050 (+ 2 других файлов) |
| newChar | №0607 (+ 1 других файлов) |
| newcomer | №1109 |
| newCount | №0776 |
| newCp | №0773 |
| newEntry | №0779 |
| newEp | №0773 |
| newFolder | №0795 |
| newGp | №0773 |
| newId | №0607 (+ 2 других файлов) |
| newLevel | №0814 (+ 1 других файлов) |
| newLvl | №0815 |
| newMax | №0683 |
| newPeer | №1201 |
| newPp | №0773 |
| newRace | №0807 |
| newSp | №0773 |
| newSpell | №0819 |
| newTemp | №0061 |
| newTotalLevel | №0683 |
| newVal | №0607 (+ 2 других файлов) |
| newVol | №0065 |
| next | №0041 (+ 18 других файлов) |
| nextHp | №0061 |
| nextLevel | №0683 |
| nextLevelExpReq | №0763 |
| nextRemaining | №0061 |
| nf | №0056 |
| ng | №1202 (+ 2 других файлов) |
| ni | №0044 (+ 2 других файлов) |
| nk | №0044 (+ 1 других файлов) |
| nl | №0044 |
| nm | №0848 |
| nn | №1093 (+ 3 других файлов) |
| nnx | №0044 |
| nnz | №0044 |
| no | №1130 |
| noChoice | №1047 |
| noClaws | №1068 |
| node | №0815 (+ 5 других файлов) |
| nodes | №0042 (+ 8 других файлов) |
| NODES | №0861 |
| noEars | №1070 |
| noGlow | №1233 |
| none | №0046 (+ 2 других файлов) |
| nonmagicalResistance | №0638 |
| nonmagicalVariants | №0638 |
| nonZero | №1093 (+ 2 других файлов) |
| nonzeroSource | №1096 |
| noRefill | №1105 |
| noReliefTarget | №1047 |
| noRiteDice | №1121 |
| norm | №0041 (+ 2 других файлов) |
| normal | №0044 (+ 5 других файлов) |
| normalAC | №0638 |
| normalizeClassKey | №0683 |
| normalized | №0696 (+ 3 других файлов) |
| normalizedCondition | №0638 |
| normalizedCurrentClass | №0683 |
| normalizedRequested | №0683 |
| normalizeLevelUpClassName | №0683 |
| normalizeYield | №0809 |
| normalRaceLabel | №0629 |
| normals | №0041 (+ 1 других файлов) |
| nose | №0044 |
| noseDepth | №0044 |
| nosePart | №0044 |
| noseTop | №0044 |
| noseWidth | №0044 |
| noseY | №0044 |
| noseZ | №0044 |
| nostril | №0044 |
| nostrils | №0044 |
| note | №0638 (+ 2 других файлов) |
| now | №0044 (+ 4 других файлов) |
| np | №0044 |
| npot | №0056 |
| null | №0815 (+ 13 других файлов) |
| num | №0851 |
| Number | №0646 (+ 25 других файлов) |
| numbers | №0045 |
| nums | №0794 |
| nw | №0762 |
| nx | №0044 (+ 1 других файлов) |
| ny | №0041 (+ 1 других файлов) |
| nylon | №0046 |
| nz | №0041 (+ 2 других файлов) |
| o | №0042 (+ 51 других файлов) |
| oa | №0762 |
| obj | №0054 (+ 5 других файлов) |
| Object | №0646 (+ 23 других файлов) |
| objectBomber | №1046 |
| objectId | №0631 (+ 2 других файлов) |
| objectIds | №0811 |
| objPath | №1085 (+ 6 других файлов) |
| objs | №0055 |
| observer | №0775 (+ 3 других файлов) |
| observerTarget | №0775 |
| oc | №1185 |
| oc2 | №1185 |
| occultIds | №1123 |
| occultistPack | №0762 |
| occupied | №0813 |
| od | №0794 |
| odd | №0801 |
| odds | №0802 (+ 3 других файлов) |
| odr | №0794 |
| off | №0046 (+ 6 других файлов) |
| offer | №0784 (+ 3 других файлов) |
| offered | №0785 |
| offers | №0784 (+ 1 других файлов) |
| offHoof | №1068 |
| offset | №0044 (+ 7 других файлов) |
| oh | №0055 (+ 1 других файлов) |
| oi | №0055 (+ 2 других файлов) |
| oid | №0762 |
| oilDamage | №0638 |
| ok | №0055 (+ 9 других файлов) |
| ol | №0056 |
| old | №0048 (+ 47 других файлов) |
| oldAngle | №0048 |
| oldBin | №1085 |
| oldBuffer | №1048 |
| oldChar | №1201 |
| oldCharacter | №1201 |
| oldCombatForDemolition | №1047 |
| oldData | №0815 |
| oldDrawer | №0755 |
| oldEffects | №0061 |
| oldHead | №1049 |
| oldHost | №0755 |
| oldHp | №0061 |
| oldId | №0794 |
| oldInitRender | №0810 |
| oldLength | №0041 |
| oldLevel | №0653 |
| oldMax | №0060 (+ 1 других файлов) |
| oldNet | №1201 |
| oldPact | №0810 |
| oldPeer | №0794 |
| oldRAF | №1223 (+ 18 других файлов) |
| oldRandom | №0646 (+ 1 других файлов) |
| oldRandomForBurn | №1046 |
| oldRandomMutable | №1046 |
| oldRandomObject | №1046 |
| oldRandomPoison | №1046 |
| oldRandomSlime | №1046 |
| oldRenderDndTools | №0810 |
| oldRoll | №1192 |
| oldSelect | №0774 |
| oldTemp | №0061 |
| oldTotal | №0683 |
| on | №0046 (+ 7 других файлов) |
| onchange | №0802 |
| one | №1110 |
| oneTwoTarget | №0762 |
| onPhone | №1105 |
| onProgress | №0825 |
| oozeRancher | №0638 |
| oozeRancherAcidResistance | №0638 |
| oozeTarget | №1046 |
| op | №0046 (+ 2 других файлов) |
| opacity | №0851 (+ 1 других файлов) |
| opacityVal | №0851 |
| open | №0631 (+ 2 других файлов) |
| openedHero | №0802 |
| opening | №0755 |
| openPanels | №1070 |
| openSet | №0779 |
| openSky | №0801 |
| operationId | №0804 |
| opportunityAttacker | №0802 |
| opt | №0046 (+ 4 других файлов) |
| option | №0046 |
| options | №0044 (+ 22 других файлов) |
| opts | №0063 (+ 28 других файлов) |
| optsHtml | №0629 |
| orbit | №0044 |
| orc | №1187 |
| order | №0041 (+ 4 других файлов) |
| orderCtx | №1126 |
| origin | №0046 (+ 2 других файлов) |
| original | №0041 (+ 17 других файлов) |
| originalAppearance | №0061 |
| originalAttack | №0649 |
| originalBody | №1049 |
| originalCalculateMods | №0819 |
| originalContext | №1048 |
| originalCraft | №0649 (+ 1 других файлов) |
| originalCrypto | №1106 |
| originalDamage | №0649 |
| originalError | №0754 |
| originalIndex | №0776 |
| originalIndices | №1066 |
| originalLog | №0754 |
| originalOpenCharacter | №0819 |
| originalPhysical | №0816 |
| originalRepair | №0649 |
| originalUI | №1216 |
| originalUiCraft | №0649 |
| originLabel | №0046 |
| orphan | №0772 |
| os | №1081 (+ 4 других файлов) |
| ot | №0639 (+ 1 других файлов) |
| other | №0776 (+ 6 других файлов) |
| otherCat | №0776 |
| otherIndex | №0776 |
| otherIsShield | №0776 |
| otherName | №0776 |
| ott | №0762 |
| out | №0042 (+ 69 других файлов) |
| outer | №0041 (+ 2 других файлов) |
| outerWidth | №0041 |
| outPath | №1085 |
| output | №0046 (+ 3 других файлов) |
| outputId | №0656 (+ 1 других файлов) |
| outputName | №0656 (+ 1 других файлов) |
| outside | №0045 (+ 1 других файлов) |
| outsideBary | №1096 |
| overheated | №0061 |
| overheatedTarget | №1047 |
| overlay | №0780 (+ 3 других файлов) |
| overload | №1047 |
| overloadBefore | №1047 |
| overloadBomber | №1047 |
| overloadCost | №0061 |
| overrides | №0640 |
| ow | №0055 |
| own | №0639 (+ 1 других файлов) |
| owned | №0654 (+ 1 других файлов) |
| owner | №0046 (+ 9 других файлов) |
| ownerActor | №0639 |
| ownerBombHit | №1046 |
| ownerClass | №0061 |
| ownerCopy | №0804 |
| ownerId | №0813 |
| ox | №0051 (+ 2 других файлов) |
| oy | №0051 (+ 2 других файлов) |
| oz | №0051 (+ 1 других файлов) |
| p | №0042 (+ 162 других файлов) |
| P | №0052 (+ 2 других файлов) |
| p0 | №0044 |
| p1 | №0044 |
| pa | №0638 |
| pack | №0053 (+ 22 других файлов) |
| PACK_ID | №0061 (+ 2 других файлов) |
| PACK_MANIFEST | №0645 |
| packId | №0644 |
| packName | №0644 |
| packs | №0759 (+ 1 других файлов) |
| pact | №0631 (+ 3 других файлов) |
| PACT | №0781 |
| PACT_SLOTS | №0810 |
| pactBoxes | №0819 |
| pactLevel | №0810 |
| pactSlots | №0762 |
| pactState | №0810 |
| pad | №0044 |
| pads | №0044 |
| page | №0636 (+ 38 других файлов) |
| paid | №0786 |
| paintAttack | №1047 |
| painter | №1047 |
| pair | №0041 (+ 2 других файлов) |
| pal | №1185 (+ 2 других файлов) |
| palette | №0045 (+ 1 других файлов) |
| palettes | №0046 |
| palm | №0044 |
| panel | №0045 (+ 6 других файлов) |
| panelHost | №0810 |
| panelsHidden | №0053 |
| panX | №0846 |
| panY | №0846 |
| parasiteHostTarget | №0629 |
| parent | №0051 (+ 3 других файлов) |
| parentArea | №0776 |
| parentId | №0822 |
| parsed | №0815 (+ 3 других файлов) |
| parsedHtml | №0755 |
| parsedSides | №0755 |
| parseFloat | №1046 (+ 15 других файлов) |
| parseInt | №1046 (+ 13 других файлов) |
| part | №0042 (+ 16 других файлов) |
| partner | №0801 |
| partnerSnapshot | №0801 |
| parts | №0044 (+ 29 других файлов) |
| partySize | №0788 |
| pass | №0041 (+ 3 других файлов) |
| passed | №1077 (+ 2 других файлов) |
| passInsight | №0607 (+ 1 других файлов) |
| passInvestigation | №0607 (+ 1 других файлов) |
| passive | №0762 (+ 2 других файлов) |
| passiveFeatures | №0061 |
| passPerception | №0607 (+ 1 других файлов) |
| password | №0634 (+ 1 других файлов) |
| pat | №0055 |
| patch | №0044 (+ 5 других файлов) |
| patchLootResult | №0809 |
| path | №0044 (+ 108 других файлов) |
| paths | №1081 |
| patient | №0061 (+ 1 других файлов) |
| patronNames | №0624 |
| patrons | №0624 (+ 1 других файлов) |
| paw | №0044 |
| payload | №0066 (+ 11 других файлов) |
| pb | №0060 (+ 7 других файлов) |
| PB | №0060 (+ 10 других файлов) |
| pbBreath | №0061 |
| pc | №0762 (+ 4 других файлов) |
| pcRoster | №1105 |
| pct | №0826 (+ 1 других файлов) |
| pd | №0861 |
| peace | №1105 |
| peacePhone | №1105 |
| peak | №1115 |
| peer | №0794 (+ 2 других файлов) |
| peerId | №0794 |
| peers | №0793 (+ 3 других файлов) |
| pelvisNode | №0041 |
| penalizedAttack | №1046 |
| penalizedSave | №1046 |
| penalty | №0624 |
| pending | №0047 (+ 11 других файлов) |
| pendingBloodAttack | №0638 |
| pendingBomb | №0061 |
| pendingContext | №0608 |
| pendingFeature | №0608 |
| pendingLevelUpData | №0683 |
| pendingReactions | №0794 |
| pendingSavantAttack | №0638 |
| pendingTargetId | №0608 |
| percent | №0046 (+ 2 других файлов) |
| perfumeAttack | №1046 |
| perfumeAttacker | №1046 |
| perfumeClass | №0638 |
| perfumeDC | №0638 |
| perfumeHero | №0638 |
| perfumeOwner | №1046 |
| perfumeOwnerState | №0638 |
| perfumeRound | №0638 |
| perfumeSave | №0638 |
| perfumeSource | №0638 |
| perfumeSourceClass | №0638 |
| perfumeState | №0638 |
| perfumeTargetId | №0638 |
| permission | №0869 |
| perms | №1099 |
| pev | №0794 |
| pf | №0816 |
| ph | №1190 |
| PH | №0055 |
| phase | №0044 (+ 1 других файлов) |
| phases | №1134 |
| pher | №0638 |
| pherDebuffs | №0061 |
| pheromone | №1046 (+ 1 других файлов) |
| pheromoneOwner | №1046 |
| pheromoneSave | №0061 |
| pheromoneTarget | №1046 (+ 1 других файлов) |
| phi | №0041 (+ 2 других файлов) |
| phone | №1077 (+ 2 других файлов) |
| phoneProtected | №1105 |
| phoneTraveller | №1105 |
| physical | №0638 (+ 1 других файлов) |
| physicalKey | №0816 |
| pi | №0051 (+ 5 других файлов) |
| pick | №0044 (+ 9 других файлов) |
| picked | №0624 |
| picker | №0046 |
| picks | №0061 |
| pid | №0653 (+ 1 других файлов) |
| pigmentClass | №0061 |
| pigmentist | №1047 |
| pinch | №0846 |
| pink | №0044 |
| PINNED_COMMIT | №1268 |
| pInput | №0773 |
| pipe | №1050 (+ 20 других файлов) |
| pitch | №0046 (+ 3 других файлов) |
| pivot | №0041 |
| pixel | №1241 |
| pixels | №1223 (+ 19 других файлов) |
| pl | №0676 (+ 2 других файлов) |
| plan | №0648 (+ 3 других файлов) |
| plane | №0044 (+ 1 других файлов) |
| PLANES | №0615 |
| plannedMove | №0794 |
| plates | №0044 |
| playBtn | №0065 |
| played | №1105 |
| plumage | №0044 |
| plume | №0044 |
| plus | №0041 (+ 1 других файлов) |
| pn | №0044 |
| po | №0762 |
| point | №0044 (+ 2 других файлов) |
| pointCostDiff | №0607 (+ 1 других файлов) |
| pointers | №0846 |
| points | №0044 (+ 10 других файлов) |
| pointsLeftEl | №0607 (+ 1 других файлов) |
| poisonBomb | №1047 |
| poisonedAttacker | №1046 |
| poisonedCombatant | №1046 |
| poisonedStrike | №1046 |
| poisonedWeaponAttack | №1047 |
| poisonImmuneTarget | №1046 |
| poisonPreview | №1046 |
| poisonWeapon | №0061 |
| poisonWeaponId | №0061 |
| pole | №0041 |
| policy | №0655 |
| poly | №0044 (+ 1 других файлов) |
| polygon | №0044 |
| pool | №0061 (+ 5 других файлов) |
| poolKind | №0061 |
| pools | №0062 |
| portraitBounds | №0869 |
| pos | №0041 (+ 10 других файлов) |
| pose | №0044 |
| posed | №0048 |
| poses | №0048 |
| positionCounts | №1097 |
| positions | №0041 (+ 5 других файлов) |
| possibleIdElements | №0775 |
| potency | №0062 (+ 1 других файлов) |
| potential | №0044 |
| potion | №0061 (+ 1 других файлов) |
| potionColor | №0061 |
| potionIndex | №1130 |
| potions | №0061 |
| power | №0044 (+ 1 других файлов) |
| pp | №0064 (+ 4 других файлов) |
| pPerG | №0773 |
| ppInput | №0773 |
| ppVal | №0773 |
| pr | №0624 (+ 2 других файлов) |
| pre | №0060 |
| predicate | №0044 |
| predict | №1072 |
| predictorTrump | №0638 |
| preFeatSelect | №0683 |
| preferPact | №0631 |
| prefix | №0772 (+ 3 других файлов) |
| preloadPath | №1269 |
| prep | №1185 |
| PREP | №0786 (+ 1 других файлов) |
| prepared | №0624 (+ 3 других файлов) |
| preparedAny | №0794 |
| preparedCount | №0819 |
| preparedFormula | №0061 |
| preparedReaction | №0794 |
| preparedReservation | №0794 |
| prepProfile | №0819 |
| prereq | №0827 |
| preS | №0683 |
| preS1 | №0683 |
| preS2 | №0683 |
| preset | №0045 (+ 3 других файлов) |
| presets | №0049 (+ 1 других файлов) |
| preStats | №0683 |
| prev | №0041 (+ 2 других файлов) |
| preview | №0776 (+ 2 других файлов) |
| previous | №0041 (+ 11 других файлов) |
| previousAC | №0812 |
| previousActive | №0756 |
| previousCount | №1063 |
| previousFetch | №1081 (+ 1 других файлов) |
| previousRoot | №0756 |
| price | №0650 (+ 1 других файлов) |
| prim | №1085 |
| primary | №0064 (+ 1 других файлов) |
| primaryStat | №0676 |
| prime | №0762 |
| prior | №1119 (+ 2 других файлов) |
| prismaticIndex | №0061 |
| prismaticOptions | №0061 |
| prismAttack | №1047 |
| prismTester | №1047 |
| probe | №0044 (+ 1 других файлов) |
| proceed | №0683 |
| process | №1204 (+ 2 других файлов) |
| processedNames | №0809 |
| processing | №0646 (+ 1 других файлов) |
| PROCESSING | №0655 |
| PROCESSING_DC_BY_RARITY | №0809 |
| PROCESSING_RECIPES | №0656 |
| PROCESSING_TOOL_BY_TYPE | №0809 |
| product | №0063 |
| prof | №0776 (+ 8 других файлов) |
| profBlock | №0728 |
| profBonus | №0607 (+ 4 других файлов) |
| profession | №0656 (+ 2 других файлов) |
| professionBonus | №0063 |
| professionId | №0653 |
| professionLayer | №0655 |
| professions | №0656 |
| PROFESSIONS | №0653 (+ 2 других файлов) |
| PROFICIENCIES_DB | №0805 |
| proficiencyBonus | №0755 |
| proficiencyChoiceHtml | №0683 |
| proficiencyType | №0776 |
| proficient | №0638 (+ 2 других файлов) |
| profId | №0805 (+ 1 других файлов) |
| profIds | №0806 |
| profile | №0041 (+ 10 других файлов) |
| profiles | №0045 (+ 4 других файлов) |
| profInput | №0819 |
| profName | №0806 (+ 1 других файлов) |
| profObj | №0806 (+ 1 других файлов) |
| profOk | №0861 |
| profs | №0776 (+ 3 других файлов) |
| prog | №0056 (+ 4 других файлов) |
| progressFrame | №0826 |
| progressHandler | №0825 |
| progression | №0060 (+ 11 других файлов) |
| progressPercent | №0763 |
| projected | №0772 (+ 1 других файлов) |
| projection | №0044 |
| projectManifest | №0836 |
| Promise | №1086 (+ 2 других файлов) |
| prompts | №1120 |
| prop | №0061 (+ 2 других файлов) |
| propContainer | №0774 |
| PROPERTIES | №0062 |
| proportions | №1268 |
| props | №0045 (+ 1 других файлов) |
| propTitle | №0774 |
| protectedHero | №1105 |
| protectedKeys | №0815 |
| proto | №0636 |
| protocol | №0869 |
| proxy | №0794 |
| ps | №0052 (+ 2 других файлов) |
| psiLimit | №0697 |
| psion | №1190 |
| psionDisciplines | №0762 |
| pt | №0624 |
| pu | №1190 |
| pugilist | №1116 |
| pugilistAC | №0638 |
| pugilistDefender | №0638 |
| pugilistDigDeepResistant | №0638 |
| pugilistLevelEntry | №0638 |
| pugilistPack | №0638 |
| pugilistSchool | №0638 |
| pugilistState | №0638 |
| pugilistStudy | №0638 |
| pupilDiagnostics | №1233 |
| pupilRound | №1233 |
| pupilSelect | №0046 |
| puppet | №1120 |
| puppetTarget | №0624 |
| puppetWeapon | №0624 |
| purity | №0062 (+ 1 других файлов) |
| pursuits | №0812 |
| pw | №1268 |
| PW | №0055 |
| px | №0044 (+ 2 других файлов) |
| PX | №0055 |
| py | №0046 (+ 1 других файлов) |
| PY | №0055 |
| pz | №0046 |
| q | №0041 (+ 37 других файлов) |
| Q | №0041 |
| q0 | №0044 |
| q1 | №0044 |
| qApi | №0776 |
| qd | №0657 |
| ql | №0041 |
| qn | №0048 |
| qr | №0762 |
| qty | №0647 (+ 1 других файлов) |
| quality | №0046 (+ 6 других файлов) |
| QUALITY | №0650 (+ 2 других файлов) |
| QUALITY_GRADES | №0647 |
| QUALITY_TIERS | №0648 |
| qualityFactor | №0647 |
| qualityKey | №0791 |
| qualityPenalty | №0647 |
| quantity | №0775 (+ 2 других файлов) |
| query | №0053 (+ 1 других файлов) |
| queued | №0639 |
| quickGather | №0808 |
| quota | №0042 (+ 1 других файлов) |
| r | №0042 (+ 195 других файлов) |
| R | №0044 (+ 11 других файлов) |
| r0 | №0044 |
| r1 | №0044 (+ 2 других файлов) |
| r2 | №0755 (+ 1 других файлов) |
| race | №0046 (+ 10 других файлов) |
| raceDesc | №0629 |
| raceEntry | №0046 |
| raceId | №0049 (+ 7 других файлов) |
| raceImmune | №0638 |
| raceLabel | №0629 |
| raceList | №0655 |
| raceName | №0607 (+ 1 других файлов) |
| raceObj | №0807 |
| raceResistant | №0638 |
| races | №0049 (+ 3 других файлов) |
| raceSelect | №0607 (+ 2 других файлов) |
| rad | №0044 (+ 1 других файлов) |
| radial | №0044 |
| radii | №0044 |
| radius | №0041 (+ 5 других файлов) |
| raf | №0609 |
| raging | №0638 |
| raise | №0044 |
| rampage | №0639 |
| randIdx | №0065 |
| randomSequence | №1115 |
| randomValue | №1115 |
| randomXOffset | №0755 |
| randomYOffset | №0755 |
| range | №0624 (+ 6 других файлов) |
| rangedIncoming | №0638 |
| rangeFt | №0794 |
| ranger | №1187 |
| rangeU | №1067 |
| rangeV | №1067 |
| rank | №0638 (+ 2 других файлов) |
| RANKS | №0804 |
| raphe | №0041 |
| rare | №0791 |
| rarity | №0650 (+ 4 других файлов) |
| RARITY | №0782 |
| RARITY_WEIGHT | №0861 |
| rarityOrder | №0776 |
| rate | №0044 (+ 1 других файлов) |
| ratio | №0056 (+ 3 других файлов) |
| rats | №0044 |
| raw | №0043 (+ 32 других файлов) |
| rawCat | №0785 |
| rawItems | №0819 |
| rawParts | №0638 |
| rawRadial | №0045 |
| rawStats | №0776 |
| rawTotal | №0638 |
| rb | №0782 (+ 1 других файлов) |
| rBottom | №0046 |
| rd | №0762 (+ 1 других файлов) |
| rd0 | №0796 |
| re | №0796 (+ 1 других файлов) |
| reach | №0044 |
| reacted | №1105 |
| reaction | №0638 (+ 3 других файлов) |
| reactionButton | №1183 |
| reactionCtx | №0638 (+ 1 других файлов) |
| reactionReduction | №0638 |
| reactionResult | №0638 |
| reactions | №0794 |
| REACTIONS | №0812 |
| read | №0801 (+ 1 других файлов) |
| Readable | №0869 |
| reader | №0815 (+ 2 других файлов) |
| readGlb | №1050 (+ 5 других файлов) |
| readIndex | №1094 (+ 1 других файлов) |
| ready | №0801 (+ 2 других файлов) |
| reagentCount | №0061 |
| reagentGain | №0061 |
| reagentRoll | №0061 |
| reagentsBefore | №1047 |
| reagentTarget | №1047 |
| real | №1269 |
| realSet | №1077 |
| rear | №0044 |
| reason | №0649 (+ 6 других файлов) |
| rebuildMaterialUsage | №0655 |
| rec | №0728 (+ 4 других файлов) |
| receipt | №0057 (+ 1 других файлов) |
| receiptKey | №1077 |
| received | №0785 (+ 2 других файлов) |
| recharge | №0061 (+ 11 других файлов) |
| recipe | №0061 (+ 7 других файлов) |
| recipeId | №0651 |
| recipes | №0650 |
| RECIPES | №0651 (+ 2 других файлов) |
| recipient | №0624 |
| record | №0043 (+ 1 других файлов) |
| recorded | №0801 |
| records | №0044 (+ 3 других файлов) |
| recovered | №0648 (+ 1 других файлов) |
| RECOVERY_BY_DURABILITY | №0647 |
| RECOVERY_BY_QUALITY | №0648 |
| red | №0631 |
| reduce | №0854 |
| reduced | №0624 |
| reduction | №0631 |
| ref | №0044 (+ 21 других файлов) |
| reference | №0044 (+ 1 других файлов) |
| referenceNode | №0773 |
| refresh | №0657 |
| refreshBase | №0657 |
| refreshing | №0636 |
| refs | №0063 (+ 3 других файлов) |
| refunded | №0794 |
| reg | №1184 |
| regeneration | №1047 |
| RegExp | №0646 (+ 6 других файлов) |
| region | №0046 (+ 2 других файлов) |
| REGION_MOD | №0782 |
| regionId | №0861 |
| regions | №0042 (+ 4 других файлов) |
| REGIONS | №0861 |
| registered | №1046 (+ 8 других файлов) |
| registry | №0041 (+ 3 других файлов) |
| reject | №0815 (+ 6 других файлов) |
| rejected | №1082 (+ 1 других файлов) |
| rel | №0784 (+ 6 других файлов) |
| relative | №0869 |
| release | №1077 |
| relief | №0061 |
| reliefCount | №0044 |
| reliefResult | №1047 |
| reliefTarget | №1047 |
| relocateGameplayPanels | №0755 |
| rem | №0773 |
| remaining | №0061 (+ 4 других файлов) |
| remainingReduction | №0638 |
| remote | №0634 (+ 1 других файлов) |
| remoteStatus | №1105 |
| remove | №0046 |
| removeAt | №0061 |
| removed | №0041 (+ 5 других файлов) |
| removedGraft | №0061 |
| removeFromContainer | №0772 |
| render | №0062 (+ 7 других файлов) |
| renderList | №0651 (+ 1 других файлов) |
| renderRecipes | №0655 |
| renderTabs | №0654 |
| renderTools | №0655 |
| rep | №0044 |
| repair | №1079 |
| REPAIR_COST_PER_10 | №0647 |
| REPAIR_PROFILES | №0648 |
| repairBtn | №0776 |
| repairCount | №0647 |
| repaired | №1078 |
| repairPlan | №1078 |
| repCfg | №0044 |
| repeatBtn | №0065 |
| replace | №0624 (+ 1 других файлов) |
| replacement | №1106 |
| report | №0776 (+ 10 других файлов) |
| repSelect | №0046 |
| reptileCoreCache | №0044 |
| reptilePart | №0046 |
| req | №0631 (+ 50 других файлов) |
| reqHtml | №0728 |
| reqR | №0762 |
| reqs | №0769 |
| reqText | №0653 (+ 1 других файлов) |
| request | №0869 (+ 2 других файлов) |
| requested | №0631 (+ 3 других файлов) |
| requestedAoe | №0794 |
| requestedFeature | №0061 |
| requestedForm | №0762 |
| requestId | №0794 |
| requests | №1119 |
| require | №1204 (+ 1 других файлов) |
| required | №0653 (+ 1 других файлов) |
| requiredEnd | №1099 |
| requiredLevel | №0061 (+ 1 других файлов) |
| requireLevel | №0762 |
| requireTool | №0653 |
| reroll | №0631 (+ 2 других файлов) |
| res | №0631 (+ 45 других файлов) |
| resBox | №0630 (+ 2 других файлов) |
| resDiv | №0774 |
| reservation | №0818 |
| reserved | №0794 |
| reset | №0046 (+ 2 других файлов) |
| resetBuffer | №1048 |
| resetResources | №0801 |
| resist | №0833 |
| resistance | №0061 (+ 1 других файлов) |
| resistanceType | №0061 |
| resistanceTypes | №0061 |
| resistant | №0638 |
| resistantFire | №1046 |
| resistantTarget | №1115 |
| resisted | №1115 |
| resMap | №0631 |
| resolve | №0815 (+ 8 других файлов) |
| resolved | №0051 (+ 1 других файлов) |
| resolvedParts | №0638 |
| resource | №0766 (+ 2 других файлов) |
| RESOURCE_HINTS | №0808 |
| RESOURCE_PROCESSING | №0809 |
| RESOURCE_YIELDS | №0809 |
| resourceBefore | №1115 |
| resourceDefs | №0810 |
| resourceId | №0808 |
| resourceKind | №0794 |
| resources | №0861 (+ 1 других файлов) |
| response | №0825 (+ 3 других файлов) |
| responses | №1076 (+ 1 других файлов) |
| rest | №0762 (+ 2 других файлов) |
| restarted | №1077 |
| restId | №0804 |
| restored | №0631 (+ 9 других файлов) |
| restoredShort | №0630 |
| restoredUse | №1047 |
| restoreFullCheckbox | №0683 |
| restoreUsed | №0061 |
| restStr | №0819 |
| result | №0044 (+ 53 других файлов) |
| resultPending | №0794 |
| results | №0048 (+ 10 других файлов) |
| resultText | №0630 (+ 1 других файлов) |
| resume | №0794 |
| resumed | №1105 |
| resumeSpell | №0794 |
| retries | №0804 |
| retry | №0826 |
| reused | №0872 |
| rev | №0794 |
| reveal | №0802 |
| revealed | №0801 |
| reverse | №0045 |
| revision | №0636 (+ 2 других файлов) |
| revival | №1046 |
| revived | №1047 |
| revivedFromZero | №0638 |
| reward | №0653 (+ 2 других файлов) |
| rewardId | №0804 |
| rewards | №0653 |
| rgb | №0046 |
| rht | №0762 |
| ri | №1095 |
| rid | №0854 (+ 2 других файлов) |
| ridge | №1070 |
| RIDGE_STYLES | №0049 |
| ridges | №0044 |
| ridgeSelect | №0046 |
| ridgeStyle | №1260 |
| right | №0044 (+ 4 других файлов) |
| rigid | №1052 |
| ring | №0041 (+ 1 других файлов) |
| ringCount | №0041 |
| rings | №0045 |
| rise | №0045 (+ 2 других файлов) |
| risk | №0062 (+ 1 других файлов) |
| rite | №0624 (+ 2 других файлов) |
| riteId | №0762 |
| riteKnown | №0796 |
| riteMax | №0762 |
| riteNames | №0624 |
| rites | №0762 (+ 1 других файлов) |
| riteTypes | №0624 |
| rl | №0044 |
| rm | №0638 (+ 1 других файлов) |
| rn | №0796 |
| rn0 | №0796 |
| rn2 | №0796 |
| ro | №1180 |
| robe | №0044 |
| rock | №0046 |
| rogue | №1180 (+ 2 других файлов) |
| role | №0044 (+ 3 других файлов) |
| roleName | №0612 |
| roles | №0656 |
| roll | №0057 (+ 18 других файлов) |
| rolled | №0061 (+ 5 других файлов) |
| rolledRelief | №1047 |
| roller | №0788 (+ 1 других файлов) |
| rollMode | №0630 |
| rollResult | №1115 |
| rolls | №0630 (+ 9 других файлов) |
| rollTypeClass | №0755 (+ 1 других файлов) |
| roofColor | №0046 |
| room | №0799 |
| root | №0044 (+ 95 других файлов) |
| ROOT | №0646 (+ 10 других файлов) |
| rootId | №0836 (+ 1 других файлов) |
| roots | №0044 (+ 4 других файлов) |
| rootSurface | №0041 |
| rootT | №0044 |
| rootY | №0044 |
| rootZ | №0044 |
| roster | №0634 (+ 1 других файлов) |
| rotation | №0046 |
| rough | №0803 (+ 1 других файлов) |
| round | №0788 (+ 1 других файлов) |
| round4 | №1268 |
| rounds | №0816 |
| roundTracker | №0638 |
| roundTrip | №1049 |
| route | №0801 (+ 2 других файлов) |
| routed | №0631 |
| row | №0044 (+ 12 других файлов) |
| rows | №0044 (+ 11 других файлов) |
| ROWS | №0611 |
| rp | №1130 |
| rq | №1181 (+ 1 других файлов) |
| rr | №0044 (+ 8 других файлов) |
| rs | №0624 (+ 2 других файлов) |
| rt | №0631 (+ 1 других файлов) |
| rTop | №0046 |
| rule | №0046 (+ 11 других файлов) |
| rules | №0683 (+ 7 других файлов) |
| RULES | №0804 |
| run | №0056 (+ 1 других файлов) |
| ruName | №0683 (+ 1 других файлов) |
| rune | №0762 (+ 1 других файлов) |
| RUNEKEEPER_INSCRIBED | №0762 |
| runesBefore | №1125 |
| running | №0636 |
| runtime | №0786 (+ 23 других файлов) |
| runtimeFeatures | №0796 |
| runtimes | №0631 |
| runtimeSubclasses | №0796 |
| rw | №1268 |
| rx | №0044 (+ 4 других файлов) |
| rx2 | №0794 |
| ry | №0044 (+ 3 других файлов) |
| rz | №0044 (+ 3 других файлов) |
| rz2 | №0056 |
| s | №0041 (+ 163 других файлов) |
| S | №0055 (+ 1 других файлов) |
| s1 | №0683 |
| s2 | №0683 |
| sa | №0044 |
| safe | №0066 (+ 1 других файлов) |
| SAFE_FILE | №0872 |
| safeFeatureId | №0631 |
| safeGet | №0774 |
| safeName | №0637 |
| safeText | №0755 |
| salty | №1115 |
| saltyDC | №0762 |
| saltyEffect | №0631 |
| saltyHero | №1115 |
| saltyMods | №1115 |
| saltySave | №0762 |
| saltyTarget | №1115 |
| sam | №0051 |
| same | №0648 (+ 8 других файлов) |
| sample | №0044 (+ 4 других файлов) |
| sampleCount | №1099 |
| sampler | №0046 (+ 2 других файлов) |
| samples | №0044 (+ 1 других файлов) |
| sandbox | №1165 (+ 6 других файлов) |
| satin | №0046 |
| savage | №0762 |
| savantFlourish | №0638 |
| savantHP | №1125 |
| save | №0057 (+ 12 других файлов) |
| saveAdv | №0638 |
| saved | №0066 (+ 40 других файлов) |
| savedAlpha | №0815 |
| savedBg | №0851 |
| saveDC | №0624 |
| savedColor | №0851 |
| savedDim | №0851 |
| saveDebuffs | №0638 |
| savedFont | №0815 |
| savedHeritage | №1233 |
| saveDis | №0638 |
| savedOpacity | №0851 |
| savedRetreat | №1105 |
| savedSmall | №1233 |
| savedSurface | №1233 |
| savedTarget | №1122 |
| savedTheme | №0815 |
| savedWander | №1105 |
| saveResult | №0638 |
| saveRoll | №0767 (+ 2 других файлов) |
| saves | №0676 (+ 2 других файлов) |
| saveStat | №0762 |
| sb | №0653 (+ 2 других файлов) |
| sc | №0051 (+ 8 других файлов) |
| scale | №0041 (+ 11 других файлов) |
| scaled | №0046 |
| scalpBuckets | №0044 |
| scalpCache | №0044 |
| scalpSamples | №0044 |
| scene | №0052 (+ 2 других файлов) |
| scenes | №0046 |
| scheduleUpdate | №0775 |
| SCHEMA_VERSION | №0625 (+ 2 других файлов) |
| schoolDamageTarget | №1115 |
| schoolHero | №1115 |
| schoolSave | №1115 |
| schoolText | №0819 |
| scLower | №0819 |
| scoped | №0631 |
| score | №0044 (+ 8 других файлов) |
| scores | №0669 (+ 3 других файлов) |
| scoreSnapshots | №0061 |
| scout | №1101 |
| screen | №0798 (+ 1 других файлов) |
| scripts | №1087 (+ 1 других файлов) |
| sctx | №1205 |
| sd | №0638 (+ 1 других файлов) |
| se | №0848 |
| sealDamage | №0681 |
| sealedHp | №1123 |
| seals | №0681 (+ 2 других файлов) |
| sealTarget | №1123 |
| seam | №0044 (+ 3 других файлов) |
| seamDamage | №1046 |
| seamGroups | №0041 |
| seamMax | №1050 (+ 1 других файлов) |
| seams | №0044 |
| searchInput | №0819 |
| searchVal | №0819 |
| second | №0801 (+ 1 других файлов) |
| secondary | №0044 |
| secondDead | №1047 |
| secondOpts | №0801 |
| seconds | №0801 |
| section | №0045 |
| seed | №0044 (+ 1 других файлов) |
| seekingAttack | №1047 |
| seen | №0057 (+ 5 других файлов) |
| seenEventIds | №0793 |
| seenNames | №0728 |
| seer | №1105 |
| sees | №0801 |
| seg | №0044 |
| segments | №0041 (+ 3 других файлов) |
| sel | №0629 (+ 5 других файлов) |
| select | №0046 (+ 6 других файлов) |
| selected | №0041 (+ 24 других файлов) |
| selected0 | №0644 (+ 1 других файлов) |
| selectedArmorCategory | №0774 |
| selectedAsset | №0053 |
| selectedBg | №0607 (+ 1 других файлов) |
| selectedChar | №0814 |
| selectedClass | №0607 (+ 2 других файлов) |
| selectedClassKey | №0683 |
| selectedClassName | №0683 |
| selectedClothes | №1231 |
| selectedFeatSelect | №0683 |
| selectedId | №0807 |
| selectedIds | №0696 |
| selectedNatural | №0061 |
| selectedRace | №0607 (+ 1 других файлов) |
| selectedSub | №0644 |
| selectedTarget | №0802 |
| selectedTrader | №0784 |
| selectedWeaponCategoryType | №0774 |
| selectedWeaponDice | №0774 |
| selectedWeaponProperties | №0774 |
| selectEl | №0774 |
| selectElem | №0779 |
| selector | №0775 |
| selectors | №0823 |
| selectScreen | №0607 (+ 1 других файлов) |
| selectType | №0774 |
| self | №0762 |
| selfActor | №0636 |
| sellFactor | №0783 |
| sellResult | №1130 |
| SEMVER | №0872 |
| send | №0869 |
| sent | №1173 (+ 7 других файлов) |
| sep | №0041 |
| seq | №0766 (+ 4 других файлов) |
| serial | №1118 (+ 1 других файлов) |
| server | №1077 (+ 39 других файлов) |
| Server | №1105 (+ 1 других файлов) |
| session | №0043 (+ 4 других файлов) |
| SESSION | №0636 |
| set | №0772 (+ 2 других файлов) |
| Set | №0646 (+ 15 других файлов) |
| setInterval | №1160 (+ 5 других файлов) |
| setTimeout | №1078 (+ 35 других файлов) |
| settings | №0634 (+ 2 других файлов) |
| settingsPanel | №0815 |
| settled | №0803 |
| sf | №0631 (+ 1 других файлов) |
| sh | №0767 |
| sha | №1218 (+ 1 других файлов) |
| shader | №1072 |
| shaft | №0041 |
| shaftSources | №0041 |
| shape | №0041 (+ 2 других файлов) |
| shaped | №1070 |
| shapeInput | №0046 |
| shapes | №0042 (+ 1 других файлов) |
| shared | №0062 (+ 2 других файлов) |
| sharedAbility | №0061 |
| sharedAliases | №0061 |
| sharedMutagen | №1047 |
| sharedSnapshots | №0061 |
| sharp | №0044 |
| shaved | №0046 |
| sheer | №0046 |
| sheetScreen | №0607 (+ 1 других файлов) |
| shell | №0767 (+ 1 других файлов) |
| shellIX | №0044 |
| shellN | №0044 |
| shellP | №0044 |
| shellUV | №0044 |
| shield | №0638 (+ 3 других файлов) |
| shieldAccess | №0652 |
| shieldAvailable | №0631 |
| shieldBonus | №0776 |
| shielded | №0794 |
| shieldRoll | №0638 |
| shieldSlot | №0631 |
| shieldSpent | №0631 |
| shipped | №1090 |
| shirt | №1057 |
| short | №0624 (+ 3 других файлов) |
| shortage | №0648 |
| shortKeys | №0061 |
| shortToFull | №0683 |
| shot | №1231 |
| shoulder | №0044 (+ 1 других файлов) |
| shoulderSpan | №0044 |
| shouldRestoreFull | №0683 |
| shouldUpdate | №0775 |
| showEP | №0773 |
| showPP | №0773 |
| shuffleBtn | №0065 |
| shutdownCalls | №1207 |
| si | №0044 (+ 3 других файлов) |
| side | №0042 (+ 6 других файлов) |
| sideIndex | №0044 |
| sides | №0046 (+ 11 других файлов) |
| sIdx | №0629 |
| sig | №0794 (+ 1 других файлов) |
| sightHero | №1105 |
| sign | №0048 (+ 2 других файлов) |
| signatures | №1054 (+ 5 других файлов) |
| signed | №0044 |
| signup | №0634 |
| sigTarget | №1115 |
| sigUses | №0794 |
| sin | №0041 |
| single | №0819 |
| singleBox | №0793 |
| singleWeightKg | №0775 |
| size | №0044 (+ 10 других файлов) |
| sizes | №0816 (+ 1 других файлов) |
| sk | №0755 |
| sKey | №0607 |
| skill | №0057 (+ 4 других файлов) |
| SKILL_STAT | №0791 |
| SKILL_TO_VAR_MAP | №0755 |
| skilledDesc | №0646 |
| skillId | №0607 (+ 4 других файлов) |
| skillName | №0755 |
| skillNameRu | №0607 |
| skills | №0607 (+ 3 других файлов) |
| SKILLS_CONFIG | №0066 |
| skillsConfig | №0755 |
| skillsDataObj | №0755 |
| skillsList | №0755 |
| skillsListContainer | №0805 |
| skillsPanel | №0805 (+ 1 других файлов) |
| skillsStr | №0607 (+ 1 других файлов) |
| skillStr | №0607 (+ 1 других файлов) |
| skin | №0042 (+ 5 других файлов) |
| skinBaseline | №1233 |
| skinColorEntry | №0046 |
| skinImages | №1048 |
| skinned | №1062 |
| skinnedPrimitives | №1088 (+ 1 других файлов) |
| skins | №0049 (+ 2 других файлов) |
| skip | №0044 (+ 1 других файлов) |
| skirt | №1059 |
| skirtDepth | №0045 |
| skull | №0044 (+ 2 других файлов) |
| sky | №0056 |
| sl | №0044 (+ 6 других файлов) |
| sleep | №1105 |
| sleeve | №0045 |
| sleeveMasks | №0045 |
| sleeves | №0045 (+ 1 других файлов) |
| slices | №0044 |
| slider | №0046 |
| slimeAcid | №1046 |
| slimeAttacker | №1046 |
| slimeBombAttack | №1047 |
| slimeBomber | №1047 |
| slimeHit | №1046 |
| slimeResistantTarget | №1046 |
| slimeVictim | №1046 |
| slot | №0042 (+ 15 других файлов) |
| SLOT_LEVEL | №0827 |
| slot2 | №0762 |
| slot3 | №0762 |
| slot4 | №0762 |
| slotBefore | №1123 |
| slotData | №0819 |
| slotHtml | №0819 |
| slotLevel | №0762 |
| slotMax | №0796 |
| slotRowHtml | №0819 |
| slots | №0045 (+ 11 других файлов) |
| SLOTS | №0060 (+ 2 других файлов) |
| slotsBefore | №1125 |
| slotSnapshot | №0794 |
| sm | №0638 (+ 4 других файлов) |
| small | №0794 |
| smitePart | №0638 |
| smoke | №0826 |
| smooth | №0044 |
| sn | №0044 |
| snap | №0061 (+ 5 других файлов) |
| snapshot | №0043 (+ 6 других файлов) |
| snapshots | №0638 |
| snout | №0044 |
| sorted | №0776 |
| SOTDQ | №0614 |
| source | №0041 (+ 38 других файлов) |
| SOURCE | №0061 (+ 13 других файлов) |
| SOURCE_TAG | №0653 (+ 1 других файлов) |
| sourceArmor | №0776 |
| sourceCache | №0836 |
| sourceCheck | №0794 |
| sourceCount | №0809 |
| sourceGroups | №0683 |
| sourceHashes | №1218 (+ 1 других файлов) |
| sourceHtml | №0819 |
| sourceId | №0639 |
| sourceManifestUrl | №0825 |
| sourceMax | №1096 |
| sourceMean | №1096 |
| sourceMeshCount | №0046 |
| sources | №0624 (+ 9 других файлов) |
| sourceStats | №0799 |
| sourceTag | №0728 |
| sourceToken | №0639 |
| sourceWeapons | №0794 |
| sp | №0052 (+ 9 других файлов) |
| span | №0041 (+ 3 других файлов) |
| spanCurrent | №0763 |
| spanTotal | №0763 |
| sparks | №0826 |
| sparse | №1086 (+ 1 других файлов) |
| sparseJson | №1086 |
| spawn | №1076 |
| spd | №0611 (+ 3 других файлов) |
| spear | №0652 |
| spec | №0640 (+ 6 других файлов) |
| specHtml | №0653 |
| specialBombEffects | №0061 |
| SPECIALIZATIONS | №0653 |
| specId | №0653 |
| species | №0822 |
| specificClass | №0683 |
| specificProf1 | №0806 |
| specificProf2 | №0806 |
| specificProf3 | №0806 |
| specificSources | №0728 |
| specs | №0653 |
| spectral | №0046 |
| speed | №0639 (+ 3 других файлов) |
| speedInput | №0807 |
| speedVal | №0807 |
| spell | №0631 (+ 7 других файлов) |
| spellbladeDeflection | №0638 |
| spellbladeOnly | №0810 |
| SPELLCASTING_CLASSES | №0819 |
| spellcastingCard | №0819 |
| spellClass | №0819 |
| spellDamageMods | №0794 (+ 1 других файлов) |
| spellDesc | №0819 |
| spellLevel | №0631 (+ 4 других файлов) |
| spellList | №0060 (+ 1 других файлов) |
| spellName | №0786 (+ 4 других файлов) |
| spellNameEscaped | №0819 |
| spellObj | №0819 |
| spellPayload | №0794 |
| spellReaction | №0794 |
| spells | №0786 (+ 4 других файлов) |
| SPELLS_KNOWN | №0060 |
| spellsByLevel | №0786 |
| spellsHtml | №0819 |
| spellSourcesNow | №0810 |
| spent | №0607 (+ 10 других файлов) |
| spentLevel | №0631 |
| sPerG | №0773 |
| spine | №0044 |
| spInput | №0773 |
| spiritAttacks | №0767 |
| spiritAuto | №1115 |
| spiritHp | №0762 |
| spiritMax | №0762 |
| spiritRestored | №0762 |
| spirits | №0827 |
| splay | №0044 |
| spread | №0044 |
| spVal | №0773 |
| sq | №0044 |
| squares | №1072 |
| squircle | №0044 |
| sr | №0631 (+ 6 других файлов) |
| src | №0042 (+ 34 других файлов) |
| srcA | №0819 |
| srcALower | №0819 |
| srcB | №0819 |
| srcBLower | №0819 |
| ss | №0638 (+ 1 других файлов) |
| st | №0044 (+ 7 других файлов) |
| stability | №0062 (+ 1 других файлов) |
| stack | №0647 (+ 1 других файлов) |
| stageCount | №1216 |
| staged | №1081 (+ 2 других файлов) |
| STAGED_KEY | №0825 |
| stageManifestUrl | №0825 |
| stairs | №0059 (+ 1 других файлов) |
| stale | №1203 (+ 2 других файлов) |
| stalker | №1190 |
| stance | №0762 |
| standardRaceIds | №1214 |
| start | №0044 (+ 12 других файлов) |
| started | №0766 (+ 1 других файлов) |
| startI | №1095 (+ 1 других файлов) |
| startingProfession | №0629 |
| startupRun | №0825 |
| startVol | №0065 |
| startY | №0045 |
| stat | №0057 (+ 13 других файлов) |
| STAT_ALIASES | №0810 |
| STAT_META | №0852 |
| STAT_NAMES | №0626 |
| stat2 | №0683 |
| statBonus | №0728 |
| statBonusKeys | №0728 |
| state | №0042 (+ 39 других файлов) |
| statElem | №0819 |
| states | №0822 |
| statId | №0607 (+ 2 других файлов) |
| statKey | №0607 (+ 6 других файлов) |
| statKeysMap | №0683 |
| statMod | №0630 (+ 2 других файлов) |
| statName | №0755 |
| statNames | №0607 (+ 1 других файлов) |
| statNameShort | №0755 |
| statNamesShort | №0607 (+ 1 других файлов) |
| statOptions | №0630 (+ 1 других файлов) |
| stats | №0769 (+ 12 других файлов) |
| STATS | №0626 |
| STATS_CONFIG | №0066 |
| statsConfig | №0755 |
| statSelect | №0637 |
| statsGrid | №0755 |
| statsList | №0630 |
| status | №0815 (+ 7 других файлов) |
| STATUS | №0643 |
| statusClass | №0643 |
| statusEl | №0065 |
| statusPC | №1105 |
| statusPhone | №1105 |
| statusServer | №1105 |
| statusText | №0755 (+ 1 других файлов) |
| steel | №0046 |
| stem | №0050 (+ 2 других файлов) |
| stems | №1218 |
| stench | №1047 |
| stenchTarget | №1047 |
| step | №0044 (+ 5 других файлов) |
| steps | №0056 (+ 3 других файлов) |
| stepTime | №0065 |
| sternumSpan | №0044 |
| stock | №0783 |
| stone | №0854 |
| stop | №0639 |
| stopped | №0803 |
| storage | №0636 (+ 3 других файлов) |
| STORAGE_KEY | №0649 (+ 2 других файлов) |
| store | №1055 (+ 5 других файлов) |
| stored | №1175 |
| str | №0775 (+ 12 других файлов) |
| strand | №0044 |
| strap | №0045 |
| stream | №0872 |
| strength | №0775 |
| strenuous | №0808 |
| stride | №0045 (+ 9 других файлов) |
| strikeHP | №1124 |
| String | №0646 (+ 23 других файлов) |
| strInput | №0775 |
| stripped | №0794 |
| strMod | №0755 |
| structureBlast | №1046 |
| structureTarget | №1046 |
| studied | №0762 (+ 1 других файлов) |
| style | №0044 (+ 7 других файлов) |
| STYLE_ID | №0826 |
| styleEl | №0776 |
| styles | №0762 (+ 5 других файлов) |
| styleTag | №0815 (+ 1 других файлов) |
| sub | №0057 (+ 9 других файлов) |
| subByName | №0778 |
| subclass | №1087 (+ 2 других файлов) |
| SUBCLASS_FEATURES | №0631 |
| SUBCLASS_MAP | №0631 |
| subclasses | №0624 (+ 6 других файлов) |
| subclassHtml | №0683 |
| subclassLevel | №0761 |
| subclassName | №0696 (+ 1 других файлов) |
| subclassPacks | №0854 |
| subclassResult | №1047 |
| subclassSelect | №0683 |
| subData | №0696 |
| subFeatures | №0778 |
| subId | №0061 |
| subIds | №0855 |
| subOptionsHtml | №0683 |
| subpacks | №0061 |
| subs | №0061 (+ 2 других файлов) |
| SUBS | №0804 (+ 1 других файлов) |
| subVal | №0763 |
| success | №0057 (+ 6 других файлов) |
| suffix | №0644 |
| suit | №0802 (+ 3 других файлов) |
| suite | №0837 (+ 1 других файлов) |
| SUITS | №0804 |
| sum | №0041 (+ 15 других файлов) |
| summary | №0046 (+ 10 других файлов) |
| sums | №0044 (+ 2 других файлов) |
| sumSq | №1095 |
| sUp | №0728 |
| supernatural | №0762 |
| supportedSave | №1125 |
| suppressBodyHP | №0630 |
| surface | №0044 (+ 2 других файлов) |
| surfaceDiagnostics | №1233 |
| surfaceKind | №0046 |
| surfaceSelect | №0046 |
| surfaceUrl | №0046 |
| surge | №1114 (+ 1 других файлов) |
| surprised | №0631 |
| sv | №0052 (+ 5 других файлов) |
| sv2 | №0762 |
| swap | №0804 |
| swapped | №1105 |
| swarm | №0046 |
| swarmForm | №0046 |
| swarmLimits | №0049 |
| swarmMotion | №0046 |
| swift | №0762 |
| swiperContainer | №0805 (+ 1 других файлов) |
| sx | №0044 (+ 3 других файлов) |
| sy | №0044 (+ 3 других файлов) |
| synapse | №1047 |
| synapseInstall | №1047 |
| synapseRecord | №0061 |
| sync | №0870 |
| syncRequested | №0793 |
| synergies | №0062 (+ 1 других файлов) |
| SYNERGY | №0062 |
| synergySet | №0062 |
| sys | №0046 (+ 18 других файлов) |
| sz | №0044 (+ 3 других файлов) |
| t | №0041 (+ 100 других файлов) |
| T | №0041 (+ 2 других файлов) |
| t2 | №0796 |
| ta | №0762 |
| tab | №0053 (+ 4 других файлов) |
| tabButtons | №0776 |
| table | №0624 (+ 6 других файлов) |
| tabs | №0654 |
| tabsContainer | №0776 |
| tabsNav | №0851 |
| tabsWrapper | №0776 |
| tacticalBack | №1105 |
| tacticalPC | №1105 |
| tacticalPhone | №1105 |
| tacticalRoster | №1105 |
| tacticalServer | №1105 |
| tactics | №0855 |
| tag | №0044 (+ 15 других файлов) |
| tagOk | №0785 |
| tags | №0044 (+ 9 других файлов) |
| tail | №0044 |
| tailEnd | №0044 |
| tailRoot | №0044 |
| take | №0624 (+ 7 других файлов) |
| takeFromContainer | №0772 |
| taken | №0057 |
| tal | №0762 |
| tampered | №1211 |
| tangent | №0044 |
| taper | №0044 (+ 1 других файлов) |
| tapLength | №0780 |
| target | №0041 (+ 46 других файлов) |
| targetChar | №0814 |
| targetCharId | №0814 |
| targetClass | №0769 (+ 1 других файлов) |
| targetClasses | №0638 |
| targetClassesForSlime | №0638 |
| targetContent | №0776 |
| targetCopy | №0804 |
| targetGrafts | №0638 |
| targetGrappled | №0762 |
| targetH | №0056 |
| targetHasArmor | №0638 |
| targetId | №0639 (+ 3 других файлов) |
| targetIsPugilist | №0638 |
| targetLabels | №1029 |
| targetLevel | №0683 (+ 1 других файлов) |
| targetList | №0639 |
| targetLvl | №0815 |
| targetMeshIndex | №1085 |
| targetName | №0639 |
| targetParent | №0773 |
| targetPath | №1085 (+ 3 других файлов) |
| targetPrim | №1085 |
| targetPrimIndex | №1085 |
| targetProfId | №0806 (+ 1 других файлов) |
| targetProgress | №0826 |
| targetReports | №1097 |
| targetResistances | №0638 |
| targets | №0044 (+ 9 других файлов) |
| targetSnapshot | №0801 |
| targetTok | №0639 |
| targetToken | №0639 |
| targetType | №0796 |
| targetVol | №0065 |
| targetW | №0056 |
| tarot | №0638 (+ 1 других файлов) |
| tarotAC | №0638 |
| tarotActor | №0755 |
| tarotAdv | №0638 |
| tarotCast | №0818 |
| tarotCheck | №0794 |
| tarotDis | №0638 |
| tarotFactor | №0638 |
| tarotIgnoresResistance | №0638 |
| tarotMod | №0638 |
| tarotOwner | №0756 |
| tarotRound | №0766 |
| tarotSave | №0638 |
| tarotScene | №0638 |
| tarotTurnId | №0756 |
| TASKS | №0841 |
| tb | №0791 |
| tc | №0762 (+ 1 других файлов) |
| team | №0794 |
| teeth | №0044 |
| teleportAllyId | №0802 |
| teleportX | №0802 |
| teleportY | №0802 |
| temp | №0638 (+ 6 других файлов) |
| TEMPER | №0784 |
| tempHp | №0762 |
| template | №0638 (+ 1 других файлов) |
| term | №1091 |
| terms | №1091 (+ 2 других файлов) |
| terror | №0044 |
| test | №0826 (+ 2 других файлов) |
| testDir | №1269 |
| testRecipe | №1078 |
| tets | №0044 |
| tex | №0045 (+ 2 других файлов) |
| text | №0046 (+ 26 других файлов) |
| textColor | №0755 |
| TextDecoder | №1050 (+ 21 других файлов) |
| textSpan | №0755 |
| texture | №0052 (+ 3 других файлов) |
| th | №0056 (+ 1 других файлов) |
| theme | №0815 |
| themed | №0656 |
| themeKey | №0815 |
| themeSelect | №0815 |
| theta | №0041 (+ 1 других файлов) |
| thick | №1231 |
| thickness | №0044 |
| thigh | №0042 |
| thin | №1231 |
| THIRD_CASTERS | №0810 |
| THR | №0792 |
| thresholds | №0788 (+ 1 других файлов) |
| THRESHOLDS | №0788 |
| thumbDir | №0044 |
| thumbEnd | №0044 |
| thumbRoot | №0044 |
| thumbs | №0851 |
| thumbSide | №0044 |
| ti | №0044 (+ 3 других файлов) |
| tick | №0794 |
| tid | №0639 |
| tie | №1049 |
| tier | №0648 |
| tile | №0045 |
| time | №0051 (+ 4 других файлов) |
| timedHero | №1047 |
| timeout | №0636 (+ 1 других файлов) |
| timer | №0636 (+ 3 других файлов) |
| timers | №1077 |
| times | №0051 |
| timeSpan | №0755 |
| timeStr | №0773 |
| timeString | №0755 |
| tint | №0046 |
| tiny | №1124 |
| tip | №0041 (+ 1 других файлов) |
| tipSelect | №0046 |
| title | №0046 (+ 7 других файлов) |
| titleEl | №0775 (+ 1 других файлов) |
| titleElem | №0779 (+ 1 других файлов) |
| titleText | №0819 |
| tl | №0041 (+ 1 других файлов) |
| tm | №0755 (+ 1 других файлов) |
| tmax | №0056 |
| tmin | №0056 |
| tmp | №0872 |
| tn | №1088 (+ 1 других файлов) |
| to | №0615 (+ 3 других файлов) |
| toggle | №0649 |
| toggleContainer | №0772 |
| tok | №0639 (+ 2 других файлов) |
| token | №0636 (+ 3 других файлов) |
| tokens | №0050 (+ 1 других файлов) |
| tool | №0619 (+ 10 других файлов) |
| TOOL_IDS | №0651 |
| TOOL_LABELS | №0651 |
| toolbar | №0772 |
| toolBox | №0802 |
| toolId | №0791 |
| toolLabel | №0802 |
| toolMatrix | №0655 |
| toolOk | №0861 |
| toolProficient | №0802 |
| tools | №0064 (+ 5 других файлов) |
| TOOLS | №0655 |
| toolsStr | №0607 (+ 1 других файлов) |
| toolStat | №0802 |
| toolStr | №0629 |
| toolText | №0802 |
| tooth | №0044 |
| toothColor | №1233 |
| toothPart | №0044 |
| top | №0041 (+ 5 других файлов) |
| topology | №1062 |
| topRow | №0776 |
| torso | №0044 (+ 1 других файлов) |
| total | №0044 (+ 35 других файлов) |
| totalAtk | №0819 |
| totalAttack | №0630 |
| totalAttackBonus | №0755 |
| totalCopper | №0773 |
| totalCurrentLevel | №0683 |
| totalDamage | №0630 |
| totalDiceDamage | №0630 |
| totalGain | №0683 |
| totalLevel | №0683 (+ 1 других файлов) |
| totalMod | №0755 |
| totalObjects | №0054 |
| totals | №0636 (+ 1 других файлов) |
| totalSkillMod | №0817 |
| totalSum | №0755 (+ 1 других файлов) |
| totalWeight | №0772 |
| totalWeightKg | №0775 (+ 1 других файлов) |
| totalWeightLb | №0775 |
| totalZones | №0054 |
| totem | №0631 |
| touched | №0794 |
| touchHp | №0796 |
| toxic | №1047 |
| toxicDC | №0061 |
| toxicSave | №0061 |
| toxicTarget | №0061 (+ 1 других файлов) |
| tp | №0794 |
| tr | №0796 |
| track | №0065 |
| tracker | №0061 (+ 2 других файлов) |
| trackNameEl | №0065 |
| TRADE_KEY | №0785 |
| traderId | №0782 (+ 2 других файлов) |
| TRADERS | №0782 |
| traditionActions | №0796 |
| traditions | №0796 |
| trained | №1106 (+ 1 других файлов) |
| transfer | №1085 |
| transformed | №1094 (+ 1 других файлов) |
| transforms | №0048 |
| translated | №0050 (+ 1 других файлов) |
| transported | №1105 |
| transpose | №1048 |
| travelling | №1105 |
| tri | №0041 (+ 3 других файлов) |
| triangleHits | №1096 |
| triangles | №0044 (+ 5 других файлов) |
| trick | №0802 |
| TRICK_FEATURES | №0804 |
| trickster | №1105 |
| triggerCustomCreation | №0774 |
| TRIGGERS | №0801 |
| tris | №0044 |
| true | №0762 (+ 3 других файлов) |
| trunk | №0044 |
| ts | №0794 (+ 1 других файлов) |
| tt | №0056 (+ 2 других файлов) |
| tTok | №0638 |
| tu | №1186 (+ 1 других файлов) |
| tuft | №0044 |
| tufts | №0044 |
| turn | №0762 (+ 2 других файлов) |
| turned | №0631 |
| turnId | №0766 (+ 2 других файлов) |
| turnKey | №0762 |
| turnOne | №1046 |
| turnTwo | №1046 |
| tusks | №0044 |
| tw | №0056 |
| two | №1110 |
| tx | №0052 (+ 4 других файлов) |
| txt | №0805 (+ 2 других файлов) |
| typ | №0762 (+ 1 других файлов) |
| type | №0041 (+ 59 других файлов) |
| typeCount | №1097 |
| typedExtraTotal | №0638 |
| types | №0816 (+ 3 других файлов) |
| TYPES | №0783 |
| typeSelect | №0774 |
| u | №0041 (+ 16 других файлов) |
| U | №0041 |
| ub | №0056 |
| ui | №0825 (+ 1 других файлов) |
| uiColorOptions | №0851 |
| uid | №1076 |
| uiFreeGather | №0808 |
| uiGather | №0808 |
| uiMix | №0062 |
| Uint16Array | №1048 (+ 22 других файлов) |
| Uint32Array | №1048 (+ 27 других файлов) |
| Uint8Array | №1050 (+ 22 других файлов) |
| ul | №0044 |
| unacted | №0631 |
| unarmoredBase | №0638 |
| unbreakable | №1115 |
| unbreakableHero | №1115 |
| uncouthId | №0762 |
| uncouthTargets | №0762 |
| undead | №1186 |
| undeadFocus | №0638 |
| undo | №0631 |
| unescape | №1173 (+ 2 других файлов) |
| unique | №0045 (+ 1 других файлов) |
| uniqueFeatsMap | №0683 |
| uniqueMap | №0819 |
| uniqueSuffix | №0774 |
| unit | №0044 (+ 3 других файлов) |
| units | №0815 |
| unknown | №1070 (+ 2 других файлов) |
| unrelated | №1111 |
| untrained | №1110 |
| up | №0044 (+ 1 других файлов) |
| update | №0657 (+ 2 других файлов) |
| updateCloudStatus | №0815 |
| updated | №0728 |
| updateListeners | №0870 |
| updater | №0869 (+ 2 других файлов) |
| updateRun | №0825 |
| updateScheduled | №0775 |
| uploadImage | №0046 |
| uploads | №1048 |
| upper | №0042 (+ 5 других файлов) |
| upperSnout | №0044 |
| upTo | №0696 |
| uri | №0052 |
| url | №0046 (+ 40 других файлов) |
| URL | №1077 |
| urlPath | №0872 |
| usage | №0046 |
| use | №0648 |
| useBtn | №0776 |
| used | №0624 (+ 9 других файлов) |
| usedBy | №0656 |
| usedCombat | №0794 |
| usedCount | №0637 |
| usedVal | №0819 |
| useFeature | №0792 |
| useFur | №0046 |
| useReptile | №0046 |
| userProfsIds | №0776 |
| uses | №0631 (+ 3 других файлов) |
| USES | №0786 |
| usesHtml | №0637 |
| useSkinMicro | №0046 |
| uv | №0041 (+ 6 других файлов) |
| uvAnchor | №0041 |
| uvDet | №0041 |
| uvFit | №0041 |
| ux | №0044 |
| uy | №0044 |
| uz | №0044 |
| v | №0042 (+ 150 других файлов) |
| V | №0041 (+ 1 других файлов) |
| v0 | №1093 (+ 2 других файлов) |
| v1 | №1093 (+ 2 других файлов) |
| v2 | №1093 (+ 2 других файлов) |
| va | №1093 (+ 4 других файлов) |
| val | №0065 (+ 14 других файлов) |
| valEl | №0607 (+ 1 других файлов) |
| valid | №1103 |
| validate | №0655 |
| validBoons | №0762 |
| validRelative | №1082 |
| validStats | №0728 |
| valInput | №0774 |
| valName | №0607 (+ 1 других файлов) |
| vals | №0051 (+ 2 других файлов) |
| valStr | №0607 (+ 1 других файлов) |
| value | №0042 (+ 33 других файлов) |
| values | №0052 (+ 4 других файлов) |
| variableNameUsed | №0755 |
| variant | №1145 |
| variants | №1059 |
| varName | №0755 (+ 2 других файлов) |
| vary | №1072 |
| vb | №1093 (+ 3 других файлов) |
| vc | №1093 (+ 3 других файлов) |
| vector | №0048 |
| venom | №1047 |
| venomDamage | №1046 |
| venomFeature | №1047 |
| venomHero | №1047 |
| venomsmithPoisonImmune | №0638 |
| venomTarget | №1046 |
| verbal | №0801 |
| verm | №0624 |
| version | №0815 (+ 4 других файлов) |
| VERSION | №0049 (+ 25 других файлов) |
| versionText | №0825 |
| vertex | №0044 (+ 1 других файлов) |
| vertices | №0041 (+ 8 других файлов) |
| verts | №0045 (+ 1 других файлов) |
| vesselHP | №1124 |
| vi | №1093 (+ 2 других файлов) |
| victim | №0801 (+ 2 других файлов) |
| view | №0047 (+ 8 других файлов) |
| viewIndex | №0052 |
| views | №0052 (+ 7 других файлов) |
| viscera | №1115 |
| visceraTarget | №1115 |
| visible | №0044 (+ 8 других файлов) |
| visionBack | №1105 |
| visionPC | №1105 |
| visionPhone | №1105 |
| visionRoster | №1105 |
| visionServer | №1105 |
| vm | №0646 (+ 133 других файлов) |
| voice | №1047 |
| voiceInstall | №1047 |
| volatility | №0062 (+ 1 других файлов) |
| volStep | №0065 |
| volumeRange | №0065 |
| volumes | №0044 |
| vp | №0056 |
| vr | №0794 |
| vs | №0046 |
| vuln | №0833 |
| vulnerable | №0638 (+ 1 других файлов) |
| vx | №0044 (+ 1 других файлов) |
| vy | №0044 |
| vz | №0044 (+ 1 других файлов) |
| w | №0042 (+ 32 других файлов) |
| W | №0044 (+ 2 других файлов) |
| w1 | №0044 |
| w2 | №0044 |
| w3 | №0044 |
| wa | №0638 (+ 1 других файлов) |
| wager | №1105 |
| waistPoints | №1059 |
| waived | №0786 |
| walk | №0827 |
| wall | №0046 |
| wallCache | №0056 |
| wallet | №0782 |
| walletGrid | №0773 |
| wallpapersGridHtml | №0851 |
| wallTypes | №0059 |
| walter | №0044 |
| walterCorpseTarget | №0629 |
| wandering | №1105 |
| wanderPhone | №1105 |
| want | №0784 (+ 2 других файлов) |
| wanted | №0044 (+ 2 других файлов) |
| wantedClass | №0683 |
| war | №0614 (+ 1 других файлов) |
| WAR_ACADEMIES | №0759 |
| ward | №0638 (+ 1 других файлов) |
| wardAbsorbed | №0638 |
| wardenResistant | №0638 |
| wardenSurvive | №0638 |
| wardReduce | №0638 |
| wardrobeSaved | №1231 |
| wards | №0801 |
| wardState | №0638 |
| warlordParry | №0638 |
| warp | №1068 (+ 1 других файлов) |
| wasNewClass | №0683 |
| wave | №0044 |
| wb | №1093 (+ 2 других файлов) |
| wc | №1093 (+ 2 других файлов) |
| weapon | №0806 (+ 8 других файлов) |
| weaponAttack | №1113 |
| weaponFields | №0774 |
| weaponId | №0806 (+ 2 других файлов) |
| weaponName | №0806 (+ 2 других файлов) |
| weapons | №0794 |
| weaponsDb | №0806 (+ 1 других файлов) |
| wear | №0648 |
| webbedTarget | №1047 |
| webDebuffs | №0061 |
| webResult | №1047 |
| webRoot | №0869 |
| webSave | №0061 |
| webTarget | №0061 |
| weight | №0044 (+ 5 других файлов) |
| weightInp | №0774 |
| weightRes | №0774 |
| weights | №0041 (+ 6 других файлов) |
| weightStr | №0775 (+ 1 других файлов) |
| weightValue | №1218 |
| weldedBoundary | №0041 |
| weldKey | №0041 |
| wh | №0044 |
| whiskers | №0044 |
| who | №0794 |
| wi | №0059 (+ 1 других файлов) |
| wide | №0044 |
| width | №0044 (+ 7 других файлов) |
| wild | №0613 (+ 1 других файлов) |
| willActivate | №0638 |
| willingTargetIds | №0802 |
| win | №0869 (+ 5 других файлов) |
| wingAngle | №0044 |
| wis | №0611 (+ 11 других файлов) |
| wisMod | №0607 (+ 1 других файлов) |
| WITCH_CRAFT_DATA | №0762 |
| WITCH_CRAFTS | №0762 |
| WITCH_CURSE_EFFECTS | №0762 |
| WITCH_CURSES | №0762 |
| WITCH_GRAND_HEXES | №0762 |
| WITCH_HEXES | №0762 |
| witchAttackPenalty | №0638 |
| witchElemental | №0638 |
| witchImperil | №0638 |
| witchLabels | №0762 |
| witchPack | №0762 |
| withFade | №0851 |
| within1 | №1099 |
| within5 | №1099 |
| wiz | №0794 |
| wk | №1096 |
| wl | №0631 |
| wName | №0630 |
| wolf | №1124 |
| wood | №0046 |
| words | №0050 |
| world | №0041 (+ 2 других файлов) |
| WORLD_STATE | №0861 |
| woven | №0046 |
| wp | №0851 (+ 1 других файлов) |
| wrap | №0608 (+ 4 других файлов) |
| wrapped | №0766 (+ 4 других файлов) |
| wrappedTools | №0810 |
| wrapper | №0755 (+ 1 других файлов) |
| wrapS | №0056 |
| wrapT | №0056 |
| wrist | №0044 |
| wrists | №0044 |
| write | №0801 |
| wrong | №1115 (+ 2 других файлов) |
| ws | №0046 (+ 2 других файлов) |
| wt | №0046 (+ 1 других файлов) |
| ww | №0056 |
| wx | №0055 (+ 1 других файлов) |
| wy | №0055 (+ 1 других файлов) |
| x | №0042 (+ 157 других файлов) |
| X | №0055 |
| x0 | №0044 |
| x1 | №0044 (+ 2 других файлов) |
| x2 | №0054 (+ 1 других файлов) |
| xenoHero | №1046 |
| xenoOwner | №1047 |
| xn | №0064 (+ 1 других файлов) |
| xp | №0611 (+ 11 других файлов) |
| XP_BY_CR | №0788 |
| xs | №1214 |
| xt | №0064 |
| xx | №0044 (+ 3 других файлов) |
| xy | №0056 |
| y | №0041 (+ 55 других файлов) |
| Y | №0044 (+ 1 других файлов) |
| y0 | №0044 (+ 1 других файлов) |
| y1 | №0044 (+ 4 других файлов) |
| y2 | №0054 (+ 2 других файлов) |
| yaw | №0046 (+ 36 других файлов) |
| yd | №0762 |
| yes | №0042 (+ 2 других файлов) |
| yf | №1093 |
| yFile | №1095 |
| ys | №0044 |
| yuan | №1054 (+ 2 других файлов) |
| yy | №0044 (+ 1 других файлов) |
| z | №0041 (+ 19 других файлов) |
| z0 | №0044 (+ 1 других файлов) |
| z1 | №0044 (+ 1 других файлов) |
| zb | №0044 |
| zf | №0044 |
| zFile | №1095 |
| ZH | №0055 |
| zi | №0055 |
| zlib | №1072 (+ 7 других файлов) |
| zoom | №0046 (+ 2 других файлов) |
| zs | №0055 |
| ZW | №0055 |
| ZX | №0055 |
| ZY | №0055 |
| zz | №0044 (+ 1 других файлов) |

### Глобальные JS API (562)

| Имя | Исходные файлы |
|---|---|
| __diceGameplayRelocationObserver | №0755 |
| __diceGameplayRelocationQueued | №0755 |
| __diceTabPanelObserver | №0755 |
| __DND_APP_BOOT_READY | №0066 |
| __dndGameplayV57Waiter | №0766 |
| __dndLootV36 | №0790 |
| __dndLootV37 | №0791 |
| __dndLootV40 | №0789 |
| __dndModalFrameObserverInstalled | №0815 |
| __dndPendingReactionRequest | №0794 |
| __fallbackRollDice | №0755 |
| __map | №1077 |
| __TEST_RESULT__ | №1201 |
| _dndFaqRender | №0798 |
| _dndSave | №0821 (+ 3 других файлов) |
| _dndTourBack | №0798 |
| _dndTourNext | №0798 |
| _dndTourSkip | №0798 |
| _expBeforeLevelUp | №0683 |
| _loadedFeatsMap | №0683 |
| _loadedSubclassOptions | №0683 |
| _originalAddItemToInventory | №0775 |
| AbortController | №0825 |
| ACCURSED_V11 | №0060 |
| accursedAfflictions | №0060 |
| accursedProgression | №0060 (+ 2 других файлов) |
| accursedRuntime | №0060 (+ 1 других файлов) |
| addEventListener | №1106 (+ 3 других файлов) |
| addExperienceValue | №0763 |
| addItemToInventory | №0775 (+ 2 других файлов) |
| ALCHEMIST_MHP_2024 | №0061 |
| alchemistProgression | №0660 |
| alert | №0794 (+ 2 других файлов) |
| allCharacters | №0607 (+ 4 других файлов) |
| appDebugLogs | №0815 (+ 1 других файлов) |
| appendDiceLog | №0631 (+ 3 других файлов) |
| applyClassProgression | №0696 |
| applyConditionsToRoll | №1114 |
| applyDndASI | №0810 |
| applyMulticlassProficiencies | №0683 (+ 1 других файлов) |
| applySubclassProgression | №0631 (+ 1 других файлов) |
| artificerProgression | №0662 |
| autoSaveCurrentCharacter | №0064 (+ 36 других файлов) |
| averageHpIncrease | №0683 |
| barbarianProgression | №0664 |
| bardProgression | №0666 |
| beastheartProgression | №0669 (+ 1 других файлов) |
| BeastheartRuntime | №0669 |
| bloodHunterProgression | №0671 |
| calculateMods | №0810 (+ 1 других файлов) |
| changePointBuyStat | №0607 (+ 1 других файлов) |
| checkMulticlassRequirements | №0769 (+ 1 других файлов) |
| chooseAssassinSubclass | №0631 |
| chooseMetamagic | №0631 |
| chooseSubclass | №0696 |
| chooseSubclassForClass | №0631 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0696 |
| CLASSES_REFERENCE | №0061 (+ 4 других файлов) |
| clericProgression | №0672 |
| closeAddFeatModal | №0728 |
| closeCharacterCreationModal | №0607 (+ 1 других файлов) |
| closeCustomAlert | №0775 |
| closeDndChangelog | №0798 |
| closeDndNetworkModal | №0793 |
| closeExperienceModal | №0763 |
| closeIconSettingsModal | №0815 (+ 2 других файлов) |
| closeLevelUpModal | №0683 |
| closeSettingsModal | №0815 |
| Companions | №0641 |
| confirm | №0046 (+ 2 других файлов) |
| confirmAddFeatManual | №0728 |
| confirmLevelUp | №0683 |
| createNewCharacter | №0607 (+ 1 других файлов) |
| createSwarmAvatar | №0822 |
| crypto | №1102 (+ 10 других файлов) |
| currentChar | №0815 (+ 22 других файлов) |
| currentCharacter | №0815 (+ 9 других файлов) |
| currentCharacterId | №0636 (+ 2 других файлов) |
| currentRollMode | №1110 |
| defaultArmors | №0067 |
| defaultConsumables | №0642 |
| defaultJunk | №0777 |
| defaultMaterials | №0787 |
| defaultWeapons | №0806 (+ 1 других файлов) |
| disableDndDebugRuntime | №0815 (+ 1 других файлов) |
| DND_ALCHEMY_GATHERING_V52 | №0064 |
| DND_APP_ICONS | №0815 (+ 2 других файлов) |
| DND_BESTIARY_V56_1 | №0611 |
| DND_BESTIARY_V56_10 | №0612 |
| DND_BESTIARY_V56_11 | №0613 |
| DND_BESTIARY_V56_12 | №0614 |
| DND_BESTIARY_V56_13 | №0615 |
| DND_BESTIARY_V56_2 | №0616 |
| DND_BESTIARY_V56_3 | №0617 |
| DND_BESTIARY_V56_4 | №0618 |
| DND_BESTIARY_V56_5 | №0619 |
| DND_BESTIARY_V56_6 | №0620 |
| DND_BESTIARY_V56_7 | №0621 |
| DND_BESTIARY_V56_8 | №0622 |
| DND_BESTIARY_V56_9 | №0623 |
| DND_CRAFT_DISASSEMBLY_V51 | №0647 |
| DND_CRAFT_ECONOMY_V49 | №0650 |
| DND_CRAFT_PROFESSION_PROGRESS | №0653 |
| DND_CRAFT_PROFESSIONS_V33 | №0654 |
| DND_CRAFT_PROFESSIONS_V38 | №0655 |
| DND_CRAFT_PROFESSIONS_V47 | №0653 |
| DND_CRAFT_PROFESSIONS_V47_CRAFT | №0653 |
| DND_CRAFT_RESOURCES_V34 | №0656 |
| DND_CRAFT_V51 | №0648 |
| DND_CRAFTING_DLC_V50 | №0649 |
| DND_CRAFTING_V31 | №0651 |
| DND_CUSTOM_CRAFTING_V32 | №0657 |
| DND_EXP_TABLE | №0763 |
| DND_INVENTORY_CONTAINERS_V54 | №0772 |
| DND_MARKET_V55 | №0782 |
| DND_MARKET_V55_1 | №0783 |
| DND_MARKET_V55_3 | №0784 |
| DND_PENDING_CLASS_PACKS | №0060 (+ 8 других файлов) |
| DND_PLANESCAPE_V56_13 | №0615 |
| DND_RESOURCE_GATHERING_V35 | №0808 |
| DND_RESOURCE_PROCESSING_V43 | №0809 |
| DND_UPDATE_MANAGER | №0825 |
| DND_UPDATE_SCENE_V2 | №0826 |
| DND_UPDATE_UI | №0825 |
| DND_WORLD_GATHERING_V53 | №0861 |
| DND3DAssetCatalog | №0050 (+ 1 других файлов) |
| DND3DAssetNames | №0050 (+ 1 других файлов) |
| DND3DMap | №0053 |
| dndAddCompanionAttack | №0810 |
| DNDAdvancedDebugV70 | №0836 |
| DNDAlchemy | №0062 |
| dndBackgrounds | №0607 |
| dndBattleActionClose | №0608 |
| dndBattleActionOpen | №0608 (+ 1 других файлов) |
| dndBattleQuickAttack | №0608 |
| dndBattleQuickMove | №0608 |
| dndBattleQuickReady | №0608 |
| dndBattleQuickSpell | №0608 |
| DNDBloodHunter | №0624 |
| DNDCampaign | №0625 |
| DNDCharacter3D | №0049 |
| DNDCharacterAnatomy | №0042 |
| DNDCharacterAnatomyGeometry | №0041 |
| DNDCharacterAppearanceStore | №0043 |
| DNDCharacterBodyGeometry | №0044 |
| DNDCharacterClothing | №0045 |
| DNDCharacterEditor3D | №0046 |
| dndCharacterEditorLaunchError | №1029 |
| DNDCharacterLabV702 | №0832 |
| DNDCharacterMorphAssets | №0047 |
| DNDCharacterPose | №0048 |
| DNDClassFeatures | №0631 (+ 1 других файлов) |
| DNDCloudAccount | №0634 |
| DNDCloudConfig | №0635 |
| DNDCloudSync | №0636 |
| dndCollectMonsterLootV36 | №0790 |
| dndCollectMonsterLootV37 | №0791 |
| dndCollectMonsterLootV40 | №0789 |
| DNDCombat | №0638 (+ 1 других файлов) |
| DNDCombatEventBusV69 | №0830 |
| dndCombatLog | №0821 |
| DNDCombatLogV66 | №0831 |
| dndCompanionAttack | №0810 |
| dndCompanionDamage | №0810 |
| DNDCompanionGameplayV27 | №0639 |
| dndCompanionHeal | №0810 |
| DNDCompanionPacks | №0640 |
| dndCompanionStat | №0810 |
| dndConcentrationDamagePrompt | №0810 |
| DNDContent | №0644 |
| DNDContentCatalog | №0643 |
| DNDContentManifest | №0645 |
| dndCraft | №0651 |
| dndCraftProfession | №0654 |
| dndCraftProfessionV38 | №0648 (+ 3 других файлов) |
| dndCreateBeastheartCompanion | №0640 |
| dndCreateBeastMasterCompanion | №0640 |
| dndCreateFamiliar | №0640 |
| dndCreateSteed | №0640 |
| dndDebugEnabled | №1029 |
| DNDDebugScenarioEditorV705 | №0839 |
| DNDDebugScenarioManagerV704 | №0840 |
| DNDDiceResolutionV65 | №0842 |
| DNDEncounterCheckpointV68 | №0843 |
| DNDEncounterMapV59 | №0844 |
| DNDExpandedV23 | №0759 |
| DNDExpansionClasses | №0762 |
| DNDFeats | №0765 |
| dndGameplayCoreV57Render | №0766 |
| DNDGameplayV57 | №0766 |
| dndGenerateMonsterLootV36 | №0790 |
| dndGenerateMonsterLootV37 | №0789 (+ 1 других файлов) |
| DNDGLTF | №0052 |
| DNDGLTFCharacterPipeline | №0051 |
| dndInitiativeActive | №0810 |
| dndInitiativeDamageActive | №0810 |
| dndInitiativeHealActive | №0810 |
| dndInitiativeSkipDefeated | №0810 |
| DndInventoryContainersV54 | №0772 |
| DndItemDatabase | №0775 |
| dndLaunchCharacterEditor3D | №1029 |
| DNDMagic | №0781 |
| dndMap3DOpen | №0053 |
| DNDMapModel | №0054 |
| DNDMapRenderer2D | №0055 |
| DNDMapRenderer3D | №0056 (+ 1 других файлов) |
| DndMarketV55 | №0782 |
| DndMarketV55_3 | №0784 |
| DNDMobileBattleV61 | №0846 |
| DNDMobileSessionV67 | №0848 |
| DNDMonsterLoot | №0790 (+ 1 других файлов) |
| DNDMonsterLootV40 | №0789 |
| DNDMonsters | №0788 |
| dndNetwork | №1077 (+ 3 других файлов) |
| dndNetworkAddPlayerToInitiative | №0794 |
| dndNetworkCopyHint | №0793 |
| dndNetworkGameplayBuildProfile | №0794 |
| dndNetworkGameplayEvent | №0794 |
| dndNetworkGameplayMonsterAction | №0794 |
| dndNetworkGameplayMonsterState | №0794 |
| dndNetworkGameplayPeerDisconnect | №0794 |
| dndNetworkGameplayPeerHello | №0794 |
| dndNetworkGameplayPendingReactions | №0794 |
| dndNetworkGameplayPrepareHostHandoff | №0794 |
| dndNetworkGameplayReactionRequest | №0794 |
| dndNetworkGameplayRender | №0766 (+ 2 других файлов) |
| dndNetworkGameplayResult | №0794 |
| dndNetworkGameplayRoomShutdown | №0794 |
| dndNetworkGameplaySnapshot | №0794 |
| dndNetworkHostCreate | №0793 |
| dndNetworkHostFinish | №0793 |
| dndNetworkJoinCreate | №0793 |
| dndNetworkKick | №0793 |
| dndNetworkNewInvite | №0793 |
| dndNetworkSingle | №0793 |
| dndOpenCharacterEditor3D | №0046 |
| DNDPredictor | №0804 |
| DNDPredictorCards | №0801 |
| DNDPredictorMovement | №0803 |
| DNDPredictorUI | №0802 |
| dndProcessResourceV43 | №0809 |
| dndRemoveCompanionAttack | №0810 |
| dndRenderAlchemy | №0062 (+ 1 других файлов) |
| dndRenderCombat | №0624 |
| dndRenderCombatV3 | №0794 (+ 1 других файлов) |
| DNDRules | №0810 (+ 1 других файлов) |
| DNDSecondaryEntities | №0813 |
| dndShowRulesSummary | №0810 |
| DNDSpellPreparation | №0819 |
| dndSplashFinished | №0780 (+ 2 других файлов) |
| DNDStairNavigation | №0058 |
| dndStartConcentrationPrompt | №0810 |
| DNDStressMap | №0059 |
| dndSummonAttack | №0821 |
| dndSummonCommand | №0821 |
| dndSummonHeal | №0821 |
| DNDSummoning | №0821 |
| dndSyncCurrentCharacterFromCombat | №0794 (+ 2 других файлов) |
| dndUseAlchemyProduct | №0063 |
| dndV59CreateEncounter | №0844 |
| dndV61ResetView | №0846 |
| dndV65Close | №0842 |
| dndV65Open | №0842 |
| dndV65Resolve | №0842 |
| dndV66Clear | №0831 |
| dndV66CloseDebug | №0831 |
| dndV66CloseLog | №0831 |
| dndV66Export | №0831 |
| dndV66Filter | №0831 |
| dndV66OpenDebug | №0831 |
| dndV66OpenLog | №0831 |
| dndV66Record | №0830 (+ 1 других файлов) |
| dndV66RefreshDebug | №0831 |
| dndV66SelfTest | №0831 |
| dndV67Close | №0848 |
| dndV67Delete | №0848 |
| dndV67Export | №0848 |
| dndV67FileImport | №0848 |
| dndV67Open | №0848 |
| dndV67Restore | №0848 |
| dndV67Save | №0848 |
| dndV68Close | №0843 |
| dndV68Delete | №0843 |
| dndV68Export | №0843 |
| dndV68FileImport | №0843 |
| dndV68Open | №0843 |
| dndV68Restore | №0843 |
| dndV68Save | №0843 |
| dndV69Clear | №0830 |
| dndV69CloseReplay | №0830 |
| dndV69ExportReplay | №0830 |
| dndV69Filter | №0830 |
| dndV69OpenReplay | №0830 |
| dndV69Play | №0830 |
| dndV69Record | №0830 |
| dndV69Seek | №0830 |
| dndV69Step | №0830 |
| dndV69Stop | №0830 |
| dndV702AddClass | №0832 |
| dndV702AddFeat | №0832 |
| dndV702AddItem | №0832 |
| dndV702AddSpell | №0832 |
| dndV702Close | №0832 |
| dndV702Open | №0832 |
| dndV702Recalc | №0832 |
| dndV702RemoveClass | №0832 |
| dndV702RemoveFeat | №0832 |
| dndV702RemoveItem | №0832 |
| dndV702RemoveSpell | №0832 |
| dndV702SetBackground | №0832 |
| dndV702SetClassLevel | №0832 |
| dndV702SetProfession | №0832 |
| dndV702SetRace | №0832 |
| dndV702SetTotalLevel | №0832 |
| dndV702Tab | №0832 |
| dndV704Close | №0840 |
| dndV704Open | №0840 |
| dndV704Remove | №0840 |
| dndV704Rollback | №0840 |
| dndV704Run | №0840 |
| dndV704SaveCustom | №0840 |
| dndV704Select | №0840 |
| dndV705Close | №0839 |
| dndV705Create | №0839 |
| dndV705Export | №0839 |
| dndV705ImportPrompt | №0839 |
| dndV705Open | №0839 |
| dndV705Rollback | №0839 |
| dndV705Run | №0839 |
| dndV705Select | №0839 |
| dndV708Close | №0841 |
| dndV708Open | №0841 |
| dndV708Reset | №0841 |
| dndV70ApiFilter | №0836 |
| dndV70CallAPI | №0836 |
| dndV70ClearErrors | №0836 |
| dndV70CloseDebug | №0836 |
| dndV70Export | №0836 |
| dndV70InspectSource | №0836 |
| dndV70ModuleFilter | №0836 |
| dndV70OpenDebug | №0836 |
| dndV70RefreshDebug | №0836 |
| dndV70RunHealthCheck | №0836 |
| dndV70SetAPIArgs | №0836 |
| dndV70SetAPIPath | №0836 |
| dndV70Tab | №0836 |
| dndV70UseAPI | №0836 |
| document | №1109 (+ 1 других файлов) |
| druidProgression | №0674 |
| enableDndDebugLogger | №0815 (+ 2 других файлов) |
| enableDndDebugRuntime | №0815 (+ 1 других файлов) |
| ensureDndToolsState | №1109 (+ 2 других файлов) |
| escapeDndHtml | №0609 (+ 3 других файлов) |
| EXTRA_BODY_RUNTIME | №0767 (+ 1 других файлов) |
| FEATS_PHB | №0729 |
| FEATS_SETTING | №0730 |
| FEATS_TCOE | №0731 |
| FEATS_UA_HOMEBREW | №0732 |
| FEATS_XGTE | №0733 |
| fetch | №1077 (+ 2 других файлов) |
| fighterProgression | №0677 |
| filterFeatsList | №0728 |
| geistProgression | №0676 |
| getAllBackgrounds | №0607 |
| getAvailableSubclasses | №0631 (+ 3 других файлов) |
| getCharacterCurrentLevel | №0763 |
| getCharacterLevel | №0763 (+ 3 других файлов) |
| getClassData | №0632 (+ 2 других файлов) |
| getCurrentInventoryWeightData | №0775 (+ 1 других файлов) |
| getDndRules | №0810 |
| getExpandedClassDefinition | №0758 |
| getExpandedClassPack | №0758 |
| getFormattedClassAndLevel | №0683 |
| getKibblesClassDisplayName | №0778 |
| getLevelByExp | №0763 |
| getProfBonusNum | №0631 (+ 2 других файлов) |
| getShifterBloodline | №0816 |
| getShifterBloodlines | №0816 |
| getShifterMaxCR | №0816 |
| getSpellcastingAbilityForClass | №0696 |
| getSpellCastingInfo | №0781 |
| getStatModNum | №0631 (+ 1 других файлов) |
| getSubclassData | №0696 (+ 1 других файлов) |
| getSubclassesForClass | №0632 |
| getSubclassFeaturesForLevel | №0753 |
| getSwarmDevourDamage | №0822 |
| getSwarmDevourDC | №0822 |
| getSwarmMutationSlots | №0822 |
| getSwarmState | №0822 |
| getVesselAspects | №0827 |
| getVesselSpellList | №0827 |
| getVesselSpirit | №0827 |
| GHOST_EXTRA | №0767 |
| ghostProgression | №0680 (+ 2 других файлов) |
| goToTab | №0631 |
| heavyWeapons | №0857 |
| Hero | №0769 |
| illriggerProgression | №0681 (+ 1 других файлов) |
| KIBBLES_CLASS_I18N | №0778 |
| KIBBLES_SOURCE_CATALOG | №0778 |
| KIBBLES_SOURCE_INFO | №0778 |
| kind | №0802 |
| listIntegratedExpandedClasses | №0758 |
| logs | №1110 |
| MARTYR_2024 | №0786 |
| MARTYR_BURDENS | №0786 |
| martyrProgression | №0684 (+ 1 других файлов) |
| martyrRuntime | №0786 |
| maxHpIncrease | №0683 |
| meleeWeapons | №0858 |
| monkProgression | №0686 |
| MULTICLASS_CLASS_REQUIREMENTS | №0758 (+ 2 других файлов) |
| MULTICLASS_PROFICIENCIES_2014 | №0696 (+ 1 других файлов) |
| MULTICLASS_REQUIREMENTS | №0769 |
| NECROMANCER_2024 | №0792 |
| NECROMANCER_SUBCLASSES | №0792 |
| necromancerProgression | №0688 (+ 1 других файлов) |
| necromancerRuntime | №0792 |
| nextInitiativeTurn | №0810 |
| OCCULTIST_KIBBLES_V11 | №0796 |
| occultistProgression | №0690 |
| occultistRuntime | №0796 |
| onerror | №0754 |
| onExpInputChange | №0763 |
| onFeatOrAsiChange | №0683 |
| onSubclassChange | №0683 |
| openAddFeatModal | №0728 |
| openCharacter | №0819 |
| openDndChangelog | №0798 |
| openDndNetworkModal | №0793 |
| openExperienceModal | №0763 |
| openFeatStatChoiceModal | №0728 |
| openIconSettingsModal | №0815 (+ 2 других файлов) |
| openLevelUpModal | №0683 |
| openLevelUpModalFromExp | №0763 |
| openSettingsModal | №0815 |
| paladinProgression | №0692 |
| PARASITE_EXTRA | №0799 |
| parasiteProgression | №0694 (+ 2 других файлов) |
| parasiteRuntime | №0799 |
| parseWeightToKg | №0775 (+ 1 других файлов) |
| pendingLevelUpData | №0683 |
| populateFeatModalList | №0728 |
| Prof_Acr | №0066 |
| Prof_Ani | №0066 |
| Prof_Arc | №0066 |
| Prof_Ath | №0066 (+ 1 других файлов) |
| Prof_Dec | №0066 |
| Prof_His | №0066 |
| Prof_Ins | №0066 |
| Prof_Inv | №0066 |
| Prof_Itm | №0066 |
| Prof_Med | №0066 |
| Prof_Nat | №0066 |
| Prof_Prc | №0066 |
| Prof_Prf | №0066 |
| Prof_Prs | №0066 |
| Prof_Rel | №0066 |
| Prof_Soh | №0066 |
| Prof_Stl | №0066 |
| Prof_Sur | №0066 |
| prompt | №1106 (+ 1 других файлов) |
| psionProgression | №0697 (+ 1 других файлов) |
| pugilistProgression | №0699 (+ 1 других файлов) |
| pugilistRuntime | №0762 |
| rangedWeapons | №0859 |
| rangerProgression | №0701 |
| refreshClassModalLocks | №0683 |
| refreshExtraClassPanels | №0764 |
| removeCharacterFeat | №0728 |
| renderClassFeatures | №0624 (+ 1 других файлов) |
| renderCombatAbilities | №0624 (+ 1 других файлов) |
| renderCompanions | №0810 |
| renderDndTools | №0756 (+ 2 других файлов) |
| renderGhostExtraPanel | №0764 |
| renderInitiativeTracker | №0766 (+ 9 других файлов) |
| renderInventory | №0064 (+ 11 других файлов) |
| renderParasiteExtraPanel | №0764 |
| renderSpellSlots | №0810 (+ 1 других файлов) |
| renderWalterParasitePanel | №0764 |
| renderWeapons | №0810 |
| requestAnimationFrame | №1223 (+ 18 других файлов) |
| resolveMulticlassProficiencyChoice | №0683 (+ 1 других файлов) |
| restorePactMagic | №0756 (+ 2 других файлов) |
| rogueProgression | №0703 |
| rollClassFeatureD20 | №0631 |
| rollClassFeatureDamage | №0631 |
| rollHpIncrease | №0683 |
| rollSingleDice | №0810 |
| RUNEKeeper_V12 | №0811 |
| runeKeeperDialects | №0811 |
| runeKeeperProgression | №0706 (+ 2 других файлов) |
| runeKeeperRuntime | №0762 (+ 1 других файлов) |
| SAVANT_V561 | №0812 |
| savantDisciplines | №0812 |
| savantProgression | №0707 (+ 2 других файлов) |
| savantRuntime | №0812 |
| saveAllCharacters | №1100 (+ 1 других файлов) |
| saveCharacter | №0064 (+ 5 других файлов) |
| saveCurrentCharacter | №0061 |
| saved | №1109 |
| savedDimBeforeHide | №0851 |
| saveNewCreatedCharacter | №0607 (+ 1 других файлов) |
| selectedBaseHp | №0683 |
| selectLauncherIcon | №0815 (+ 2 других файлов) |
| setCharacterLevel | №0815 (+ 2 других файлов) |
| setTimeout | №1106 (+ 1 других файлов) |
| SHIFTER_V21 | №0816 |
| shifterProgression | №0709 (+ 2 других файлов) |
| shifterRuntime | №0816 |
| showCustomAlert | №0775 (+ 1 других файлов) |
| SKILL_TO_VAR_MAP | №1110 |
| SKILLS_CONFIG | №0066 |
| sorcererProgression | №0711 |
| sortInitiativeTracker | №0821 |
| specialWeapons | №0860 |
| SPELLBLADE_RUNTIME | №0818 |
| spellbladeProgression | №0818 |
| spells3lvl | №0746 |
| spells4lvl | №0747 |
| spells5lvl | №0748 |
| spells6Lvl | №0749 |
| spells8lvl | №0751 |
| spells9lvl | №0752 |
| spellsLevel1 | №0744 |
| spellsLevel2 | №0745 |
| spellsLevel7 | №0750 |
| startDndOnboarding | №0798 |
| SUBCLASSES_REFERENCE | №0061 (+ 6 других файлов) |
| subtractExperienceValue | №0763 |
| SWARM_EXTRA | №0822 |
| swarmProgression | №0713 (+ 2 других файлов) |
| swarmRuntime | №0822 |
| syncDndNetworkInitiative | №1109 (+ 2 других файлов) |
| syncLevelUI | №0683 |
| toggleClassFeatureDetails | №0631 |
| triggerCritEffect | №1114 |
| updateCharacterSpellSlots | №0683 (+ 1 других файлов) |
| updateExperienceModalUI | №0763 |
| updateExtraClassCreationUI | №0629 |
| updateMagicData | №0781 |
| updateNetworkModeUI | №0793 |
| useBloodHunterFeature | №0624 |
| useClassFeature | №0631 |
| useFeat | №0765 |
| VESSEL_V4 | №0827 |
| vesselProgression | №0715 (+ 1 других файлов) |
| vesselRuntime | №0827 |
| VTT_PROJECT_MANIFEST_V70 | №0849 |
| WALTER_PARASITE_EXTRA | №0852 |
| walterParasiteProgression | №0717 (+ 2 других файлов) |
| WARDEN_MHP_2024 | №0854 |
| wardenProgression | №0718 (+ 1 других файлов) |
| warlockProgression | №0720 |
| WARLORD_LASERLLAMA_V330 | №0855 |
| warlordProgression | №0722 (+ 1 других файлов) |
| WEAPONS_DB | №0806 (+ 1 других файлов) |
| window | №1077 (+ 6 других файлов) |
| WITCH_MHP_2014 | №0762 |
| witchProgression | №0724 |
| witchRuntime | №0762 |
| wizardProgression | №0726 |

### Поля персонажа (100)

| Имя | Исходные файлы |
|---|---|
| ac | №0776 (+ 4 других файлов) |
| actionSurges | №0810 |
| activeConditions | №0630 (+ 5 других файлов) |
| activeFolderId | №0795 |
| anatomy | №0042 |
| appearance3d | №1055 (+ 1 других файлов) |
| baseAC | №0776 (+ 3 других файлов) |
| class | №0763 (+ 3 других файлов) |
| classes | №0769 (+ 7 других файлов) |
| classFeaturesState | №1047 |
| className | №0683 (+ 2 других файлов) |
| clothing | №0042 (+ 1 других файлов) |
| coinLog | №0773 |
| coins | №0773 (+ 2 других файлов) |
| combatAbilities | №0630 (+ 1 других файлов) |
| combatAbilityStat | №0637 |
| companions | №0756 |
| con | №0683 |
| concentration | №0810 (+ 1 других файлов) |
| conditions | №0755 (+ 2 других файлов) |
| constitution | №0683 |
| craftingProfessions | №0652 |
| deathSaves | №0638 (+ 4 других файлов) |
| defeated | №0756 (+ 3 других файлов) |
| encounters | №1029 |
| equipment | №0046 |
| equippedWeapon | №0806 (+ 1 других файлов) |
| exp | №0763 (+ 1 других файлов) |
| extraACBonus | №0810 |
| extraClassType | №0630 (+ 6 других файлов) |
| feats | №0683 (+ 2 других файлов) |
| featStatBonuses | №0728 |
| features | №0683 (+ 3 других файлов) |
| folders | №0795 |
| gender | №0042 (+ 1 других файлов) |
| ghost | №0767 |
| head | №0042 (+ 1 других файлов) |
| heroClass | №0819 |
| hostName | №0767 (+ 2 других файлов) |
| hp | №0683 (+ 3 других файлов) |
| hpCurrent | №0683 (+ 7 других файлов) |
| hpMax | №0683 (+ 4 других файлов) |
| hpTemp | №1106 |
| id | №0756 (+ 3 других файлов) |
| initiativeTracker | №0756 (+ 9 других файлов) |
| inspiration | №1106 |
| inventory | №0775 (+ 14 других файлов) |
| isExtraClass | №0683 (+ 5 других файлов) |
| kiPoints | №0696 (+ 1 других файлов) |
| lastRest | №0756 |
| level | №0815 (+ 6 других файлов) |
| library | №0779 |
| libraryData | №0779 |
| morphChannels | №0047 (+ 2 других файлов) |
| multiclassAllowed | №0767 (+ 2 других файлов) |
| name | №0756 (+ 1 других файлов) |
| originRaceId | №0042 |
| pactMagic | №0756 (+ 2 других файлов) |
| pactMagicData | №0756 (+ 3 других файлов) |
| parasite | №0799 |
| pendingProficiencyChoices | №0696 |
| position | №1106 |
| predictorState | №0630 (+ 3 других файлов) |
| profBonus | №0819 |
| proficiencies | №0776 (+ 3 других файлов) |
| race | №0683 (+ 2 других файлов) |
| raceId | №0042 (+ 1 других файлов) |
| raceName | №0767 (+ 2 других файлов) |
| rageDamageBonus | №0696 |
| ragesCount | №0696 (+ 1 других файлов) |
| replacesRace | №0767 (+ 3 других файлов) |
| resistances | №1047 |
| resources | №0810 (+ 1 других файлов) |
| revision | №0636 |
| savesData | №0607 (+ 2 других файлов) |
| secondWindUses | №0810 |
| skills | №0696 (+ 1 других файлов) |
| skillsData | №0607 (+ 5 других файлов) |
| skillValues | №0066 |
| skins | №0042 (+ 5 других файлов) |
| sneakAttackDice | №0696 |
| sorceryPoints | №0696 (+ 1 других файлов) |
| speed | №0767 (+ 2 других файлов) |
| spellcastingSources | №0696 (+ 1 других файлов) |
| spells | №0756 |
| spellsData | №0810 (+ 1 других файлов) |
| spellSlotsData | №0630 (+ 4 других файлов) |
| spellStat | №0696 |
| stats | №0769 (+ 11 других файлов) |
| subclass | №0696 (+ 1 других файлов) |
| swarm | №0683 (+ 1 других файлов) |
| tarotEffects | №1105 (+ 1 других файлов) |
| tarotKnowledge | №1105 |
| tempHp | №1047 |
| turnResources | №0756 (+ 1 других файлов) |
| unsaved | №1077 |
| valueOf | №0819 |
| walterParasite | №0683 (+ 1 других файлов) |
| weaponsData | №0630 |
| worldMatrices | №0042 (+ 3 других файлов) |

### Поля JS объектов (6368)

| Имя | Исходные файлы |
|---|---|
| _ | №1129 (+ 11 других файлов) |
| __base | №0056 |
| __bodyMasks | №1070 |
| __ceHeadFrame | №0041 |
| __ceNormals | №0041 (+ 3 других файлов) |
| __ceShapedPositions | №0041 (+ 3 других файлов) |
| __dirname | №1269 |
| __filename | №1269 |
| __floor | №0056 |
| __tarotChargeDouble | №0801 |
| __tarotShared | №0801 |
| __TEST_ASSERT__ | №1269 |
| _sent | №1206 |
| a | №0044 (+ 8 других файлов) |
| abdomen | №0042 |
| aberration | №0611 (+ 12 других файлов) |
| abilities | №0611 (+ 17 других файлов) |
| ability | №0060 (+ 19 других файлов) |
| abilityBonus | №0061 (+ 1 других файлов) |
| abilityBonuses | №0624 |
| abilityChanges | №0801 |
| abilityCheck | №0638 (+ 1 других файлов) |
| abilityCheckBonus | №0762 |
| abilityCheckHigherSpell | №0762 |
| abilityIncrease | №0759 |
| abilityMax | №0801 |
| abilityMin | №0801 |
| abilityScores | №1046 (+ 3 других файлов) |
| absorbedItems | №0822 |
| absorbedTempHp | №0821 |
| ac | №0607 (+ 62 других файлов) |
| academies | №0722 (+ 1 других файлов) |
| academy | №0759 (+ 1 других файлов) |
| academyFeature | №0759 |
| academyFeatures | №0722 |
| acBase | №0067 (+ 1 других файлов) |
| acBonus | №0759 (+ 7 других файлов) |
| acBonusAgainstTarget | №0762 |
| acBonusDie | №0762 |
| accent | №0815 |
| acceptedCategories | №0785 |
| acceptedTags | №0785 |
| access | №0653 |
| access_token | №0636 (+ 1 других файлов) |
| accessories | №0790 (+ 1 других файлов) |
| accessors | №1086 (+ 1 других файлов) |
| acEqualsSelf | №0762 |
| acFormula | №0067 |
| acid | №0061 (+ 2 других файлов) |
| Acid | №0063 |
| acidBomb | №0762 |
| acidReagent | №0809 |
| acolyteOfArms | №0762 |
| acOverride | №0794 (+ 1 других файлов) |
| acPenalty | №0061 |
| acReduction | №0762 |
| acrobatics | №0755 (+ 1 других файлов) |
| acSaveDamageBonus | №0762 |
| action | №0060 (+ 57 других файлов) |
| actionId | №0788 |
| actionOrBonusAction | №0762 |
| actionRequired | №0638 |
| actions | №0061 (+ 25 других файлов) |
| actionSpent | №0061 (+ 1 других файлов) |
| actionSurge | №0631 |
| actionSurges | №0677 |
| actionType | №0061 |
| activate | №1116 |
| active | №0624 (+ 31 других файлов) |
| ACTIVE | №0765 |
| activeCharacteristics | №0852 |
| activeConditions | №0607 (+ 9 других файлов) |
| activeEncounter | №0845 |
| activeEncounterId | №0844 (+ 1 других файлов) |
| activeId | №0845 |
| activeIndex | №0061 (+ 33 других файлов) |
| activeMutations | №0822 |
| activeOrgans | №0852 |
| activeProperties | №0063 |
| activeRage | №0631 (+ 1 других файлов) |
| activeRite | №0624 |
| activeShape | №1196 |
| activity | №0611 (+ 12 других файлов) |
| actor | №0766 (+ 2 других файлов) |
| actorId | №0813 (+ 2 других файлов) |
| actorName | №1158 |
| actual | №0837 |
| actWithArcaneAnathemaWhileDisabled | №0762 |
| adamantine | №0651 |
| adaptiveMalediction | №0762 |
| addClass | №0832 |
| addCombatantFromTemplate | №0638 |
| addConToEachDie | №0762 |
| addCreature | №0844 |
| addCustomLoot | №0790 (+ 1 других файлов) |
| addD4OnFailure | №0762 |
| addDamage | №0061 |
| addDie | №0762 |
| added | №0611 (+ 26 других файлов) |
| addEventListener | №0870 (+ 25 других файлов) |
| addFeat | №0832 |
| addFloor | №0054 |
| addInventory | №0832 |
| additionalFamiliar | №0796 |
| addLexiconRune | №0762 |
| addObject | №0054 |
| addProficiencyBonus | №0762 |
| addProfToAnathema | №0762 |
| addRecipe | №0650 |
| addSelected | №0844 |
| addSpell | №0832 |
| addToRoll | №0762 |
| addXP | №0653 |
| addZone | №0054 |
| adhesive | №0061 |
| adjustedXp | №0788 |
| adjustRiteDamage | №0624 |
| adjustSymbiosis | №0799 |
| adjustWeaponDamage | №0624 |
| adornment | №0653 |
| adrenaline | №0816 |
| adroitAnalysis | №0812 |
| adultAnatomy | №0049 |
| advancedRoguishCharm | №0762 |
| advancedTactics | №0762 |
| advancedTransformation | №0624 |
| advanceTime | №0061 (+ 1 других файлов) |
| advantage | №0061 (+ 15 других файлов) |
| advantageAgainst | №0762 |
| advantageAgainstFrightened | №0762 |
| advantageAgainstGrappled | №0762 |
| advantageAgainstTarget | №0762 |
| advantageAgainstWounded | №0759 |
| advantageAllAttacks | №0624 |
| advantageAllD20 | №0762 |
| advantageAttackRolls | №0762 |
| advantageAttacks | №0762 |
| advantageCharismaChecks | №0762 |
| advantageDexSave | №0762 |
| advantageFirstAttack | №0762 |
| advantageIfSameTarget | №0669 |
| advantageMagicalSaves | №0762 |
| advantageNextAttack | №0759 (+ 1 других файлов) |
| advantageNextSave | №0762 |
| advantageOnChecks | №0759 |
| advantageOnCon | №0759 |
| advantageOneAttackOrSave | №0762 |
| advantageOrDisadvantage | №0762 |
| advantagePerception | №0796 |
| advantageRecallFeyFiendsUndead | №0624 |
| advantageSaves | №0624 (+ 1 других файлов) |
| advantageSavesAgainst | №0762 |
| advantageSavingThrows | №0762 |
| advantageStealth | №0669 |
| advantageStr | №0762 |
| advantageStrength | №0061 |
| advantageTrackFeyFiendsUndead | №0624 |
| advantageVsIntimidation | №0759 |
| adventuringDiscipline | №0762 |
| advice | №0801 (+ 3 других файлов) |
| aether | №0624 |
| Aether | №0762 |
| aetherWalk | №0624 |
| affected | №0061 |
| affinities | №0827 |
| affinity | №1124 |
| afflictedDisadvantageEndSave | №0762 |
| afflictionControl | №0060 |
| african | №1091 |
| afro | №0044 (+ 1 других файлов) |
| after | №0762 (+ 1 других файлов) |
| afterActorAttack | №0624 |
| afterAttack | №0801 |
| afterAttackCost | №0762 |
| afterAttackThreeUnarmed | №0762 |
| afterCarousingAdvantage | №0762 |
| afterDamage | №0624 (+ 1 других файлов) |
| againstInterdicted | №0762 |
| age | №0607 (+ 2 других файлов) |
| ageAppearanceLocked | №0796 |
| ageless | №0762 |
| agePossessionSleepTransformImmunity | №0762 |
| ailment | №0762 |
| ailments | №0060 (+ 1 других файлов) |
| airCore | №0809 |
| airEssence | №0809 |
| alchemical | №0782 |
| alchemicalFat | №0809 |
| alchemicalReagentV49 | №0650 |
| alchemicalSavvy | №0631 |
| alchemist | №0653 (+ 4 других файлов) |
| alchemistActiveEffects | №1046 (+ 1 других файлов) |
| alchemistDebuffs | №1046 |
| alchemistDiscovered | №1047 |
| alchemistExplosionResistanceType | №1046 |
| alchemistGolem | №0061 |
| alchemistGolemOwner | №0061 |
| alchemistGrafts | №1046 |
| alchemistHomunculus | №0061 |
| alchemistHomunculusOwner | №0061 (+ 1 других файлов) |
| alchemistPoisonedWeaponId | №1046 |
| alchemistPreparedFormula | №1047 |
| alchemistSaveDC | №1046 |
| alchemistToxicVengeance | №1046 |
| alchemy | №0651 (+ 1 других файлов) |
| alchemyId | №0063 (+ 1 других файлов) |
| alchemyPoints | №0762 |
| alchemyTools | №0796 |
| alcoholRules | №0061 |
| ale | №0655 |
| alert | №1079 (+ 12 других файлов) |
| alerts | №1106 |
| aliases | №0060 (+ 12 других файлов) |
| all | №0758 (+ 1 других файлов) |
| ALL_RECIPES | №1078 (+ 1 других файлов) |
| allAttacksThisTurn | №0624 |
| allConcentrationSavesDisadvantage | №0624 |
| allDisciplines | №0759 |
| allies | №1145 |
| alliesTempHp | №0762 |
| allLanguages | №0762 |
| allowed | №0801 |
| allowedForms | №0762 |
| allowFriendly | №0639 |
| allSeeing | №0854 |
| allSkills | №0792 |
| alluring | №0624 |
| Alluring | №0762 |
| allyACBonus | №0762 |
| allyAdvantage | №0759 |
| allyAdvantageAgainstMarkedPrey | №0762 |
| allyAttackOrDamageCantrip | №0762 |
| allyCharge | №0759 |
| allyCount | №0762 |
| allyDestination | №0802 (+ 2 других файлов) |
| allyFormation | №0759 |
| allyId | №0801 (+ 3 других файлов) |
| allyMoveReactionFt | №0762 |
| allyNextAddD8 | №0762 |
| allyReactionsUpTo | №0762 |
| allyReposition | №0759 |
| allySaveAdvantage | №0762 |
| allySaveAdvantageFt | №0762 |
| allySaveBonus | №0762 |
| allyStrDexSaveBonus | №0762 |
| allyTempHp | №0762 |
| allyWilling | №0802 (+ 2 других файлов) |
| allyWithinAura | №0638 (+ 1 других файлов) |
| allyWithinCourage | №0638 |
| almond | №0046 (+ 1 других файлов) |
| alpha | №0046 (+ 1 других файлов) |
| alphaCutoff | №0052 |
| alphaCutoffLoc | №0056 |
| alphaMode | №0052 |
| alphaModeLoc | №0056 |
| alpine | №0046 |
| alreadyKnown | №0816 |
| alt | №0762 |
| altar | №0050 |
| alternateNecromancers | №0792 |
| alternateResourceIds | №0064 |
| altMin | №0729 |
| altStat | №0729 |
| alum | №0656 |
| alwaysPrepared | №0786 (+ 2 других файлов) |
| amount | №0064 (+ 31 других файлов) |
| amp | №0624 |
| amphibian | №0757 |
| amplified | №0624 (+ 1 других файлов) |
| amplifiedDamage | №0762 |
| amplifiedEffect | №0762 |
| amplifiedMoveFt | №0762 |
| amplifiedNextAttackAdvantage | №0762 |
| amplifiedRestoreSpellSlot | №0762 |
| amplify | №0624 (+ 4 других файлов) |
| analysisAction | №0812 |
| analyticalDefense | №0812 |
| anatomy | №0044 (+ 1 других файлов) |
| anatomyLevel | №0041 |
| anatomyProfile | №0049 |
| anatomyShape | №0041 |
| anatomySkin | №0041 |
| anatomyType | №0041 |
| anatomyVariant | №0041 |
| anatomyZones | №0041 |
| anchor | №0044 (+ 1 других файлов) |
| anchorPositions | №0044 (+ 1 других файлов) |
| anchors | №0792 |
| ancient_ruins | №0861 |
| ancientMalediction | №0762 |
| angle | №0044 |
| animalFrame | №0044 |
| animalHandling | №0755 (+ 1 других файлов) |
| animalHandlingDC | №0669 |
| animalProfile | №0044 (+ 6 других файлов) |
| animalSkin | №0044 |
| animateDead | №0792 |
| animateThralls | №0762 |
| animation | №0762 |
| animationId | №0048 (+ 1 других файлов) |
| animations | №0051 |
| ankhBlessing | №0792 |
| annotated | №0646 |
| anointedMagic | №0762 |
| antelope | №0049 |
| antialias | №0046 (+ 1 других файлов) |
| Antidote | №0063 |
| antiMagicAdvantage | №0792 |
| anvil | №0050 |
| anxious | №0624 |
| any | №0758 (+ 1 других файлов) |
| aoe | №0794 |
| aoeFt | №0624 |
| aoeLengthFt | №0794 |
| aoeRadiusFt | №0609 (+ 3 других файлов) |
| aoeShape | №0609 (+ 1 других файлов) |
| aoeWidthFt | №0794 |
| apathy | №0801 |
| ape | №0044 |
| apexPredator | №0762 |
| api | №1077 |
| apiArgs | №0836 |
| apiFilter | №0836 |
| apikey | №0636 |
| apiPath | №0836 |
| apis | №0836 |
| apothecary | №0050 (+ 1 других файлов) |
| apothecaryRejectsHammer | №1130 |
| app | №0843 (+ 1 других файлов) |
| appearance | №0043 (+ 3 других файлов) |
| appearance3d | №1077 |
| appearanceAgingStopped | №0796 |
| appearanceOpacity | №0049 |
| appendChild | №1127 (+ 8 других файлов) |
| applications | №0804 |
| applied | №0060 (+ 10 других файлов) |
| appliesCalcifyingStrike | №0762 |
| apply | №0825 |
| applyASI | №0810 |
| applyDamage | №0638 (+ 5 других файлов) |
| applyDamageBatch | №0638 |
| applyFromRound | №0801 |
| applyFullQuality | №0648 |
| applyMorphTargets | №0049 |
| applyOverchannel | №0794 |
| applyPotionEffect | №0061 |
| applyPreset | №0049 |
| applyQuality | №0650 |
| applyStaged | №0825 |
| applyVisibility | №0649 |
| applyWitchTouch | №0762 |
| arcana | №0755 (+ 1 других файлов) |
| arcanaSaveDC | №0762 |
| arcane | №0782 (+ 2 других файлов) |
| arcane_defender | №0765 |
| arcane_recovery_feat | №0765 |
| arcaneAnathema | №0762 |
| arcaneMastery | №0631 |
| arcaneReagentV49 | №0650 |
| arcaneRecovery | №0631 |
| arcaneShard | №0650 (+ 1 других файлов) |
| arcaneWard | №1185 |
| archaeologist | №0812 |
| archdruid | №0631 |
| archery | №0762 |
| archetype | №0762 (+ 1 других файлов) |
| archetypes | №0697 |
| archfey | №0624 |
| architect | №0762 |
| archon | №0827 |
| archonForm | №0827 |
| archons | №0827 |
| area | №0061 (+ 1 других файлов) |
| areaFt | №0061 (+ 1 других файлов) |
| areaRadiusFt | №0762 |
| areaSlime | №0061 |
| areaVulnerability | №0822 |
| arenaRoyale | №0699 |
| args | №1223 (+ 37 других файлов) |
| arm | №0044 |
| armament | №0060 (+ 1 других файлов) |
| armedAndAngry | №0762 |
| armLength | №0046 (+ 1 других файлов) |
| armor | №0044 (+ 62 других файлов) |
| armor_component | №0809 |
| armorBonus | №0648 |
| armorClass | №0657 (+ 1 других файлов) |
| armoredAC | №0762 |
| armorer | №0653 (+ 2 других файлов) |
| armorOfFaith | №0786 |
| armorProficiency | №0796 |
| armorTriangles | №0046 |
| armorWear | №1079 |
| armour | №0050 |
| armpitL | №0042 (+ 1 других файлов) |
| armpitR | №0042 |
| arms | №0046 (+ 3 других файлов) |
| arr | №0785 |
| arrayBuffer | №1051 (+ 5 других файлов) |
| arrestingStrike | №0762 |
| ArrowDown | №0053 |
| arrowheads | №0650 (+ 1 других файлов) |
| ArrowLeft | №0053 |
| ArrowRight | №0053 |
| ArrowUp | №0053 |
| art | №0815 |
| artificer | №0646 (+ 2 других файлов) |
| artOfWar | №0762 |
| ascended | №0827 |
| ascensionLevel | №0697 |
| asi | №0658 (+ 28 других файлов) |
| asian | №1091 |
| asleep | №0801 |
| aspect | №0762 (+ 1 других файлов) |
| assessItem | №0647 |
| asset | №1086 (+ 1 других файлов) |
| assetId | №0046 (+ 3 других файлов) |
| astral | №0046 |
| astralConstruct | №0762 |
| asymmetric | №0049 |
| at | №0044 (+ 16 других файлов) |
| at11 | №0697 |
| at17 | №0697 |
| athletics | №0755 (+ 2 других файлов) |
| atob | №1173 (+ 2 других файлов) |
| atStartOfTurn | №1120 (+ 1 других файлов) |
| attach | №0047 (+ 1 других файлов) |
| attached | №0061 |
| attachment | №0852 |
| attack | №0061 (+ 20 других файлов) |
| attackAbility | №0061 |
| attackAction | №0762 |
| attackAgainstMode | №0810 |
| attackBonus | №0061 (+ 7 других файлов) |
| attackBonusAdjustment | №0624 |
| attackCantripSwap | №0792 |
| attackChain | №0759 |
| attackContext | №0624 (+ 1 других файлов) |
| attackCount | №0638 (+ 3 других файлов) |
| attackCrit | №0792 |
| attackDamageBonus | №0648 |
| attackDisadvantage | №0061 (+ 2 других файлов) |
| attackDisadvantageUnlessTargetsSelf | №0762 |
| attackDistanceFt | №1120 |
| attacker | №0624 (+ 10 других файлов) |
| attackerId | №0061 (+ 8 других файлов) |
| attackerPeerId | №0794 |
| attackKind | №0638 (+ 7 других файлов) |
| attackModifier | №0816 |
| attackModifiers | №0061 (+ 17 других файлов) |
| attackOrSpell | №0762 |
| attackPenalty | №0061 (+ 1 других файлов) |
| attackReplaced | №1126 |
| attackResult | №0624 (+ 5 других файлов) |
| attackRoll | №0762 |
| attacks | №0638 (+ 6 других файлов) |
| attacksAgainst | №0810 |
| attackSequence | №0638 (+ 1 других файлов) |
| attacksHaveAdvantage | №0061 |
| attackSight | №0801 |
| attackTarget | №1120 |
| attackTotal | №0794 (+ 3 других файлов) |
| attackType | №0743 (+ 18 других файлов) |
| attitudeIndifferent | №0762 |
| attitudeShift | №0762 |
| attributeFilter | №0823 (+ 1 других файлов) |
| attributes | №0823 (+ 3 других файлов) |
| attrs | №1048 |
| atWill | №0762 |
| atWillSuppress | №0762 |
| auraDebuff | №0792 |
| auraHoldTheLine | №0762 |
| auraOfCourage | №0631 |
| auraOfProtection | №0631 |
| auraRangeFt | №0792 |
| auraSource | №0638 (+ 1 других файлов) |
| author | №0054 |
| authoritativeSubclasses | №0060 (+ 13 других файлов) |
| authorityEpoch | №0793 (+ 5 других файлов) |
| authorityId | №0793 (+ 3 других файлов) |
| authoritySnapshot | №0848 |
| auto | №0794 |
| autoAnimalHandlingRampage | №0669 |
| autoCheckForUpdates | №0825 |
| autoFailed | №0624 (+ 2 других файлов) |
| autoFailHexSave | №0762 |
| autoFailSaveUses | №0762 |
| autoFailStrDex | №0810 (+ 2 других файлов) |
| autognome | №0655 |
| autoHideMenuBar | №0869 |
| automaticAssembly | №0049 |
| autoPlans | №0794 |
| autoSaveCurrentCharacter | №1127 (+ 2 других файлов) |
| autoTrigger | №0061 |
| available | №0788 (+ 1 других файлов) |
| availableFeatures | №0644 |
| avatars | №0822 |
| avatarStorm | №0792 |
| avian | №0044 (+ 1 других файлов) |
| avoidDeath | №0762 |
| awakened | №0697 (+ 1 других файлов) |
| Awakened | №0778 |
| awakenedRune | №0762 |
| awakening | №0786 |
| axes | №0046 |
| AXES | №0049 |
| azure | №0815 |
| b | №0851 (+ 9 других файлов) |
| back | №0045 (+ 3 других файлов) |
| background | №0607 (+ 5 других файлов) |
| backgroundColor | №0869 |
| backLower | №0042 |
| backslash | №0057 (+ 1 других файлов) |
| backslashTexture | №0059 |
| BackTexture | №1101 |
| backup | №0835 (+ 1 других файлов) |
| backUpper | №0042 |
| bad | №1058 |
| badlands | №0861 |
| badlands_canyon | №0861 |
| badlands_crater | №0861 |
| badlands_glass | №0861 |
| balanceCp | №0782 |
| balanced | №0042 |
| balancePreserved | №1130 |
| balefulInterdict | №0681 |
| balefulPresence | №0762 |
| band | №0647 |
| bandHeight | №0045 |
| bandTile | №0045 |
| bandTogether | №0762 |
| banished | №0762 |
| banner | №0050 |
| bard | №0781 (+ 1 других файлов) |
| bardicInspiration | №0631 (+ 1 других файлов) |
| barrel | №0050 |
| barter | №1130 |
| barycentricOutsideTolerance | №1096 |
| base | №0052 (+ 3 других файлов) |
| baseAc | №0794 (+ 1 других файлов) |
| baseAC | №0607 (+ 2 других файлов) |
| baseAcFormula | №0807 |
| baseColorFactor | №0052 (+ 1 других файлов) |
| baseColorSampler | №0052 |
| baseColorTexture | №0052 |
| baseCp | №0784 |
| baseFeatures | №0854 |
| baseId | №0657 |
| baseModel | №0049 (+ 1 других файлов) |
| baseObj | №1097 (+ 2 других файлов) |
| basePositions | №0045 (+ 2 других файлов) |
| basePositionsSha256 | №1218 |
| baseQualityScore | №0647 |
| baseUrl | №1082 (+ 1 других файлов) |
| basilisk | №0669 |
| bastionOfOrder | №0762 |
| battleBoard | №0831 (+ 1 других файлов) |
| battleBoardView | №0843 |
| battlefield | №1077 (+ 11 других файлов) |
| battlefieldAnalysis | №0759 |
| battlefieldSupport | №0722 |
| Battlemage | №0778 |
| battleMagic | №0631 |
| battleOver | №0766 |
| bboxDiagonalRatio | №1099 |
| beakColor | №0049 (+ 1 других файлов) |
| beakSize | №0049 (+ 3 других файлов) |
| beakStyle | №0046 (+ 3 других файлов) |
| beard | №0046 (+ 3 других файлов) |
| beast | №0612 (+ 2 других файлов) |
| beast_tamer | №0765 |
| beastCommand | №0759 |
| beastCompanion | №0631 |
| beastheart | №0640 |
| beastheartEndTurn | №0639 |
| beastheartLevel | №0669 |
| beastheartStartTurn | №0639 |
| Beasthide | №0778 |
| beastMaster | №0640 |
| beastShape | №0762 |
| beastSpells | №0631 |
| becomeGhost | №0762 |
| bed | №0050 |
| before | №0810 (+ 1 других файлов) |
| beforeAttack | №0801 |
| beforeRoll | №0638 |
| beginBlind | №0804 |
| beginConcentration | №0638 |
| beginInitial | №0804 |
| beginOwnTurn | №0804 |
| beginWager | №0804 |
| behavior | №1145 |
| belt | №0045 |
| bench | №0050 |
| benefits | №0762 |
| berserker_rage | №0765 |
| bestAxisPermutation | №1099 |
| bestiaryVersion | №0611 (+ 12 других файлов) |
| bigby | №0611 |
| bin_bytes | №1088 |
| binary | №1218 |
| binarySha256 | №1218 |
| bindHost | №0799 |
| binding | №0624 |
| bindOnCharnelSpend | №0792 |
| bindPositions | №0041 |
| bindShell | №0767 |
| biomass | №0799 |
| biomassGained | №0799 |
| biomassHealing | №0822 |
| black | №0851 |
| Black | №0759 (+ 1 других файлов) |
| blackmarket | №0784 (+ 1 других файлов) |
| blackRider | №0792 |
| blacksmith | №0782 |
| blastCoating | №0660 |
| blastDice | №0061 |
| blastWave | №0762 |
| blend | №0044 |
| blessGuidance | №0762 |
| blessLike | №0061 |
| blind | №0759 |
| blindBeyond | №0801 |
| blinded | №0801 (+ 1 других файлов) |
| blinding | №0762 |
| Blindness | №0063 |
| blindsense | №0631 |
| blindsight | №0852 |
| blindsightFt | №0762 (+ 1 других файлов) |
| bloatedAgony | №0624 |
| Blob | №1158 (+ 5 других файлов) |
| block | №0827 |
| blocked | №0638 (+ 3 других файлов) |
| blocksIncorporealMovement | №0762 |
| blocksMovement | №0057 |
| bloodAscendent | №0792 |
| bloodCost | №0796 |
| bloodCostPerSpellLevel | №0796 |
| bloodCurseActor | №0638 (+ 1 других файлов) |
| bloodCurseAmplify | №0638 (+ 1 других файлов) |
| bloodCurseDistanceFt | №0638 (+ 1 других файлов) |
| bloodCurseExposure | №0638 |
| bloodCurseOfCorrosion | №0624 |
| bloodCurseOfHowl | №0624 |
| bloodCurseOfTheExorcist | №0624 |
| bloodCurses | №0671 |
| bloodCurseTargetsBloodless | №0762 |
| bloodhawk | №0669 |
| bloodhoundBruisers | №0699 |
| bloodHunterPuppet | №0624 (+ 1 других файлов) |
| bloodiedButUnbowed | №0699 (+ 1 других файлов) |
| bloodline | №0816 (+ 1 других файлов) |
| bloodlines | №0816 |
| bloodlustAdvantage | №0762 |
| bloodMaledict | №0624 (+ 1 других файлов) |
| bloodPrice | №0681 |
| bloodPriceAura | №0762 |
| bloodRiteRevival | №0638 |
| bludgeoning | №0854 |
| blue | №0815 |
| blushColor | №0049 |
| blushOpacity | №1232 |
| bob | №0044 (+ 1 других файлов) |
| bodiesCount | №0061 (+ 1 других файлов) |
| bodiesSpent | №0061 |
| body | №0049 (+ 35 других файлов) |
| bodyAccessories | №0044 |
| bodyColor | №0049 (+ 9 других файлов) |
| bodyDefaults | №0049 |
| bodyDestroyed | №0852 |
| bodyH | №0042 (+ 2 других файлов) |
| bodyHorror | №0612 |
| bodyHP | №0852 |
| bodyMaxHP | №0852 |
| bodyName | №0852 |
| bodyPossession | №0792 |
| bodyPreset | №0042 |
| bodyStats | №0799 |
| bodyTint | №0049 (+ 1 других файлов) |
| bolsteringSuppression | №0762 |
| bomb | №0660 (+ 1 других файлов) |
| bombDamage | №0660 |
| bombFormulas | №0660 |
| bombImmunity | №0762 |
| bombs | №0660 |
| bondedTarget | №0762 |
| bondOfBloodthirst | №0762 |
| bondOwnerId | №0801 |
| bondPartnerId | №0801 |
| bonds | №0669 |
| bondWilling | №0802 (+ 2 других файлов) |
| bone | №0650 (+ 1 других файлов) |
| boneAsh | №0656 |
| boneSpurring | №0762 |
| boneStock | №0650 (+ 1 других файлов) |
| boneStockV49 | №0650 |
| bonus | №0061 (+ 60 других файлов) |
| bonusAC | №0762 |
| bonusAction | №0061 (+ 25 других файлов) |
| bonusActionAfflict | №0762 |
| bonusActionAttack | №0759 |
| bonusActionAttackAfterExploit | №0762 |
| bonusActionAttackAfterSpell | №0796 |
| bonusActionAttacks | №0762 |
| bonusActionDash | №0061 |
| bonusActionDisengageOrHide | №0762 |
| bonusActionDisengageOrSearch | №0762 |
| bonusActionExtraWeaponAttack | №0762 |
| bonusActionFear30 | №0762 |
| bonusActionOrder | №0762 |
| bonusActions | №0641 |
| bonusActionSeed | №0792 |
| bonusActionSupport | №0759 |
| bonusActionSupportOrder | №0762 |
| bonusActionUnarmedOrGrapple | №0762 |
| bonusActionWeaponAttack | №0624 |
| bonusAttack | №0624 (+ 4 других файлов) |
| bonusAttackAfterInvoke | №0762 |
| bonusAttackVsFrightened | №0762 |
| bonusCantrip | №0762 |
| bonusCharnelTouchAfterAttack | №0792 |
| bonusDamage | №0061 (+ 9 других файлов) |
| bonusDamageDice | №0762 |
| bonusDamageDie | №0762 |
| bonusDamageOnHit | №0762 |
| bonusDash | №0762 |
| bonusDie | №0796 |
| bonuses | №0067 (+ 6 других файлов) |
| bonusFireDamage | №0669 |
| bonusGrapple | №0762 |
| bonusHealing | №0762 |
| bonusHp | №0762 (+ 1 других файлов) |
| bonusHpDice | №0762 |
| bonusKnownSpells | №0762 |
| bonusMaxHP | №0762 |
| bonusMeleeAttack | №0762 |
| bonusSpell | №0796 |
| bonusSpells | №0796 |
| bonusSteps | №0792 |
| bonusStrDexConRolls | №0762 |
| bonusWeaponAttackAfterCantrip | №0762 |
| book | №0050 |
| bookshelf | №0050 |
| boon | №0762 |
| boots | №0045 (+ 1 других файлов) |
| bottle | №0050 |
| bottom | №0049 (+ 6 других файлов) |
| boundary | №0041 |
| bounds | №0044 (+ 2 других файлов) |
| bountiful_luck | №0765 |
| bovineEarSize | №0049 (+ 1 других файлов) |
| bowDamageBonus | №0762 |
| bowyer | №0653 |
| boxingTechnique | №0759 |
| bra | №0045 |
| braceUp | №0762 |
| braid | №0044 (+ 1 других файлов) |
| brainsOverBrawn | №0762 |
| bramble | №0061 |
| brambleBomb | №0762 |
| brand | №0762 |
| brandAllyDistanceFt | №0638 |
| brandCastigation | №0638 (+ 2 других файлов) |
| brandOfAxiom | №0624 |
| brandOfCastigation | №0624 (+ 1 других файлов) |
| brandOfSundering | №0624 |
| brandOfTethering | №0624 (+ 1 других файлов) |
| brandOfVoracious | №0624 |
| brandSappingScar | №0624 |
| brawling | №0762 |
| breakConcentration | №0638 |
| breastSize | №0046 (+ 2 других файлов) |
| Breathing | №0063 |
| brew | №0796 |
| brewer | №0653 (+ 3 других файлов) |
| brewMinutes | №0792 |
| briefs_female | №0045 |
| briefs_male | №0045 |
| brightLightFt | №0762 |
| brightLightRadiusFt | №0762 |
| broken | №0049 (+ 2 других файлов) |
| browHeight | №0049 |
| browRidge | №0049 |
| browser | №1216 |
| brutalCritical | №0631 |
| bt_a | №1197 |
| bt_ally | №1102 (+ 5 других файлов) |
| bt_b | №1197 |
| bt_enemy | №1102 (+ 6 других файлов) |
| bt_friend | №1106 |
| bt_own | №1111 |
| bt_owner | №1104 (+ 1 других файлов) |
| bt_self | №1102 (+ 4 других файлов) |
| btoa | №1173 (+ 2 других файлов) |
| bubbles | №0683 |
| budgets | №0042 |
| buf | №0056 |
| buff | №0801 |
| buffer | №1085 (+ 3 других файлов) |
| buffers | №0052 (+ 3 других файлов) |
| bufferView | №1085 (+ 3 других файлов) |
| bufferViews | №1086 (+ 1 других файлов) |
| build | №0041 (+ 3 других файлов) |
| buildAnimations | №0051 |
| builder | №0653 |
| buildFeatureSet | №0631 (+ 2 других файлов) |
| bulette | №0669 |
| bull | №0044 |
| bullMuzzleSize | №0049 (+ 1 других файлов) |
| bun | №0044 (+ 1 других файлов) |
| burden | №0786 (+ 1 других файлов) |
| Burned | №0762 |
| burning | №0061 (+ 1 других файлов) |
| burningTicks | №1046 |
| burstDamage | №0762 |
| burstRadiusFt | №0762 |
| buttocks | №0042 |
| buttonColor | №0045 (+ 2 других файлов) |
| buttons | №0045 (+ 3 других файлов) |
| buy | №0782 (+ 2 других файлов) |
| buyFactor | №0782 (+ 1 других файлов) |
| bypassesTempHP | №0786 |
| byteLength | №1085 (+ 3 других файлов) |
| byteOffset | №1085 (+ 3 других файлов) |
| bytes | №0825 (+ 7 других файлов) |
| bytesDone | №0825 (+ 2 других файлов) |
| bytesTotal | №0825 (+ 2 других файлов) |
| c | №0794 (+ 9 других файлов) |
| cabinet | №0050 |
| cache | №0825 (+ 2 других файлов) |
| cackle | №0762 |
| calcifyingStrike | №0762 |
| calculateAC | №0810 |
| calculatedCombustion | №0762 |
| calculatedFlourish | №0812 |
| calculateEncounter | №0788 |
| calculateMaxHP | №0822 |
| call | №1126 |
| callAPI | №0836 |
| callFromBelow | №0762 |
| calligrapher | №0653 (+ 1 других файлов) |
| callOfIron | №0762 |
| calls | №0854 (+ 1 других файлов) |
| callToHavok | №0762 |
| campaign | №0831 |
| campaignEvent | №0766 |
| campaignEvents | №1147 |
| campaigns | №0625 |
| canApplyNatively | №0825 |
| canBarter | №0784 |
| canBecomeHuge | №0762 |
| canBurnSealForBlind | №0762 |
| canCaptureHost | №0799 |
| canCast | №0801 |
| cancel | №0869 |
| canCounter | №0762 |
| canCraftRecipe | №0653 |
| canDisassemble | №0648 |
| candle | №0050 |
| canEnterHost | №0799 |
| canHear | №1120 |
| canid | №0757 |
| canMerge | №0822 |
| canMove | №0801 |
| cannotBecomeRitual | №0796 |
| cannotSurprise | №0759 |
| CANONICAL_2024_SUBCLASSES | №0061 |
| canopicJars | №0792 |
| canReceiveHealing | №0767 (+ 1 других файлов) |
| canRepair | №0648 |
| canRestHealBody | №0767 (+ 2 других файлов) |
| canSee | №0801 |
| canTarget0Hp | №0762 |
| cantrip | №0061 (+ 3 других файлов) |
| cantrips | №0624 (+ 4 других файлов) |
| cantripsByLevel | №0792 |
| cantripsKnown | №0690 (+ 2 других файлов) |
| canWalk | №0054 |
| cap | №0045 |
| capaciousAnathema | №0762 |
| capacity | №0762 (+ 4 других файлов) |
| capacityByLevel | №0796 |
| capacityFt3 | №0796 |
| capColor | №0049 (+ 1 других файлов) |
| cape | №0045 |
| capeWidth | №0045 |
| capSize | №0049 (+ 1 других файлов) |
| captain | №0722 (+ 1 других файлов) |
| capture | №0846 |
| capturedAt | №0799 |
| captureHost | №0799 |
| caravan | №0782 (+ 2 других файлов) |
| caravan_master | №0784 (+ 1 других файлов) |
| card | №0804 |
| cardId | №0801 |
| cards | №0804 (+ 2 других файлов) |
| careful | №0631 |
| carpenter | №0652 (+ 4 других файлов) |
| carried | №0789 |
| carryCapacity | №0796 |
| carryingCapacityMultiplier | №0762 |
| cart | №0050 |
| cartographer | №0651 (+ 5 других файлов) |
| cartographyQuality | №0654 |
| case | №0631 (+ 2 других файлов) |
| castAsRitual | №0796 |
| caster | №0794 |
| casterLevel | №0781 (+ 2 других файлов) |
| castIllriggerActionSpell | №0762 |
| castingClass | №0794 (+ 5 других файлов) |
| castingStat | №0794 (+ 4 других файлов) |
| castingTime | №0743 (+ 15 других файлов) |
| castLucidSpellFree | №0762 |
| castSpell | №0762 (+ 1 других файлов) |
| castSpellInAttack | №0762 |
| castWish | №0762 |
| cat | №0044 (+ 21 других файлов) |
| cataclysm | №0827 |
| cataclysmicStrike | №0762 |
| catalog | №0611 (+ 27 других файлов) |
| catalyst | №0063 |
| catalystId | №0063 |
| catalystReagent | №0809 |
| catalysts | №0062 |
| catEarSize | №0049 (+ 2 других файлов) |
| categories | №0785 |
| category | №0057 (+ 47 других файлов) |
| catMuzzleSize | №0049 (+ 3 других файлов) |
| caucasian | №1091 |
| cauldron | №0050 (+ 1 других файлов) |
| causal | №0811 |
| ceilingCollision | №0801 |
| celerity | №0624 |
| Celerity | №0762 |
| celestial | №0046 (+ 14 других файлов) |
| celestialDiscourse | №0762 |
| celestialStance | №0762 |
| cell | №0054 (+ 1 других файлов) |
| cellFt | №0844 (+ 11 других файлов) |
| cellPx | №1176 |
| cellSize | №1094 |
| censurePeacemaker | №0762 |
| centaur | №1244 |
| centaurIndices | №0044 |
| centaurSize | №0049 (+ 2 других файлов) |
| center | №0044 (+ 14 других файлов) |
| centerY | №0041 |
| ceramic | №0651 (+ 2 других файлов) |
| cha | №0607 (+ 51 других файлов) |
| chaChecksAdvantage | №0762 |
| chaChecksDisadvantage | №0624 (+ 1 других файлов) |
| chain | №0061 |
| chainReport | №0650 |
| chair | №0050 |
| championCalls | №0718 |
| chance | №0757 (+ 3 других файлов) |
| chandelier | №0050 |
| changed | №0801 |
| changedVertices | №1090 |
| changeShape | №0796 |
| channel | №0793 (+ 3 других файлов) |
| channelDivinity | №0631 (+ 3 других файлов) |
| channels | №0051 |
| chant | №0811 |
| character | №0789 (+ 6 других файлов) |
| characterId | №0049 (+ 24 других файлов) |
| characterName | №1173 |
| characters | №0636 (+ 2 других файлов) |
| charcoal | №0651 (+ 3 других файлов) |
| charcoalFine | №0656 |
| charge | №0762 |
| chargeOnDeflect | №0061 |
| charges | №0631 (+ 2 других файлов) |
| chargesMax | №0631 |
| chargesSpent | №0061 (+ 1 других файлов) |
| chargeTempHP | №0762 |
| chargeWeapon | №0061 |
| charisma | №0769 (+ 10 других файлов) |
| charismaChecksAdvantage | №0624 |
| charismaReferencesUse | №0762 |
| charmed | №0801 (+ 2 других файлов) |
| charmedHours | №0762 |
| charmEffect | №0638 |
| charmOrCompel | №0762 |
| charmSourceId | №0801 |
| charnelHitThreshold | №0792 |
| charnelTouch | №0792 |
| charnelTouchMax | №0792 |
| charnelTouchSpendMax | №0792 |
| chaSave | №0762 |
| chaSavesDisadvantage | №0624 (+ 1 других файлов) |
| cheapShot | №0762 |
| check | №0762 (+ 2 других файлов) |
| checkAndStage | №0825 |
| checkBonus | №0653 (+ 1 других файлов) |
| checkBonusAll | №0655 |
| checked | №1109 |
| checkModifiers | №0061 (+ 6 других файлов) |
| checkResult | №1126 |
| checks | №0762 (+ 1 других файлов) |
| cheekbones | №0046 (+ 1 других файлов) |
| chef | №0655 |
| chest | №0042 (+ 6 других файлов) |
| chestShape | №1049 |
| Chieftain | №0778 |
| childAppearance | №0801 |
| childList | №0775 (+ 5 других файлов) |
| children | №1052 (+ 2 других файлов) |
| chinLength | №0046 (+ 1 других файлов) |
| chitin | №0809 |
| chitinPlate | №0650 (+ 1 других файлов) |
| choice | №0794 (+ 4 других файлов) |
| choiceMode | №0804 |
| choices | №0624 (+ 2 других файлов) |
| choiceSaved | №0854 (+ 1 других файлов) |
| choose | №0658 (+ 23 других файлов) |
| chooseAnyAilments | №0762 |
| chooseBeforeRoll | №0762 |
| chooseBond | №0669 |
| chooseCompanion | №0669 |
| chooseCraft | №0762 |
| chooseGrandHex | №0762 |
| chooseHex | №0762 |
| chooseKnown | №0624 |
| chooseMovement | №0061 |
| chooseResistance | №0061 |
| chooseSavingThrowProficiency | №0762 |
| chooseSpecialization | №0653 |
| chosenCreatureId | №0060 (+ 1 других файлов) |
| cinzel | №0815 |
| circumcised | №0042 |
| cl | №0056 |
| claimWagerReward | №0804 |
| clairvoyance | №0759 |
| clandestineSource | №0762 |
| class | №0607 (+ 3 других файлов) |
| CLASS | №0624 |
| CLASS_NAMES | №0631 |
| classAbilities | №0762 |
| classBonus | №0638 (+ 1 других файлов) |
| classes | №0769 (+ 43 других файлов) |
| CLASSES_REFERENCE | №1214 |
| classFeatureIds | №0794 (+ 5 других файлов) |
| classFeatureNotes | №0638 (+ 1 других файлов) |
| classFeaturesState | №0061 (+ 20 других файлов) |
| classKey | №0810 |
| classLevel | №0810 |
| classList | №1087 |
| className | №0607 (+ 56 других файлов) |
| clawColor | №0049 |
| clawSize | №0049 (+ 2 других файлов) |
| clay | №0651 (+ 2 других файлов) |
| cleanHead | №0049 |
| cleansed | №0801 |
| cleansingTouch | №0631 |
| clear | №0052 (+ 6 других файлов) |
| clearTimeout | №0646 (+ 5 других файлов) |
| cleric | №0781 (+ 1 других файлов) |
| clientId | №0793 (+ 5 других файлов) |
| clientX | №0846 (+ 1 других файлов) |
| clientY | №0846 (+ 1 других файлов) |
| climb | №0792 |
| climbSpeed | №0061 (+ 1 других файлов) |
| clingingCurse | №0762 |
| clone | №0054 (+ 1 других файлов) |
| close | №0046 (+ 9 других файлов) |
| closed | №0772 |
| closedChains | №0650 |
| closeReplay | №0830 |
| closet | №0050 |
| cloth | №0650 (+ 4 других файлов) |
| clothes | №1258 |
| clothing | №0045 (+ 18 других файлов) |
| clothingBuilds | №0046 |
| clothingId | №0045 |
| clothingTriangles | №0046 |
| cloudId | №0636 |
| cloudScope | №0043 |
| cls | №0631 |
| club | №1123 |
| coast | №0782 (+ 1 других файлов) |
| coast_caves | №0861 |
| coast_cliffs | №0861 |
| coast_grotto | №0861 |
| cobbler | №0653 (+ 3 других файлов) |
| code | №1077 |
| coins | №1132 (+ 3 других файлов) |
| col | №0056 (+ 1 других файлов) |
| cold | №0624 (+ 2 других файлов) |
| Cold | №0063 |
| collar | №0045 |
| collect | №0789 (+ 3 других файлов) |
| collectiveBody | №0822 |
| collectLoot | №0766 |
| color | №0042 (+ 9 других файлов) |
| colors | №0056 (+ 2 других файлов) |
| cols | №0061 (+ 13 других файлов) |
| column | №0834 |
| combat | №0831 (+ 1 других файлов) |
| combatant | №0639 |
| combatantId | №0766 (+ 2 других файлов) |
| combatants | №0061 (+ 42 других файлов) |
| combatEnd | №0801 |
| combatHooks | №0690 |
| combatInsight | №0796 |
| combatInspiration | №0631 |
| combatLog | №0848 |
| combatMasteries | №0681 |
| combatMastery | №0681 (+ 1 других файлов) |
| combatOnly | №0801 |
| combatTurnGate | №0669 |
| combineDisciplines | №0762 |
| combustion | №0762 |
| command | №0639 (+ 3 других файлов) |
| commandable | №0762 |
| Commander | №0778 |
| commandFamiliarAndUndeadTogether | №0762 |
| commandRangeMultiplier | №0759 |
| commands | №0762 |
| commandSpellsWithoutSlot | №0792 |
| commandWithoutFear | №0759 |
| commit | №1218 (+ 1 других файлов) |
| commitHostEvent | №1119 (+ 7 других файлов) |
| committed | №0648 |
| common | №0776 (+ 5 других файлов) |
| commonPeopleBonus | №0762 |
| companion | №0061 (+ 4 других файлов) |
| companionACBonus | №0669 |
| companionAction | №0759 |
| companionActor | №0669 |
| companionAttack | №0759 |
| companionDamage | №0759 |
| companionExtraAttack | №0759 |
| companionMagicAttacks | №0759 |
| companionRampage | №0759 |
| companionResistance | №0669 |
| companions | №0669 |
| companionType | №0061 (+ 2 других файлов) |
| compareVersions | №0825 |
| compatibility | №0825 |
| completeAttack | №0818 |
| components | №0051 (+ 14 других файлов) |
| componentType | №1085 (+ 3 других файлов) |
| compositeTerms | №1268 |
| compositions | №1218 |
| compressionLock | №0762 |
| con | №0607 (+ 54 других файлов) |
| concealPsionics | №0762 |
| concentration | №0638 (+ 29 других файлов) |
| concentrationCheck | №0638 |
| concentrationDC | №0810 |
| concentrationSaveBonus | №0762 |
| concentrationState | №0638 |
| concussion | №0061 |
| concussionBomb | №0762 |
| condition | №0061 (+ 11 других файлов) |
| conditionApplied | №0762 |
| conditionChoice | №0669 |
| conditionImmune | №0624 |
| conditionImmunity | №0762 |
| conditionLabel | №0647 |
| conditionModeApplied | №0638 |
| conditionModifiers | №0810 (+ 2 других файлов) |
| conditionNotes | №1114 |
| conditionRemoved | №0854 |
| conditions | №0638 (+ 17 других файлов) |
| CONDITIONS | №0638 (+ 2 других файлов) |
| conditionsImmune | №0641 |
| coneWisdomSave | №0762 |
| config | №0833 |
| configurable | №0801 |
| configure | №0636 |
| configured | №0636 (+ 1 других файлов) |
| confirm | №1048 (+ 3 других файлов) |
| conflict | №0062 (+ 1 других файлов) |
| conflicts | №0636 |
| connected | №0793 (+ 1 других файлов) |
| conSave | №0762 |
| console | №1087 |
| constant | №0638 (+ 7 других файлов) |
| constitution | №0769 (+ 12 других файлов) |
| Constitution | №0063 |
| constitutionHalfDamageFailure | №0762 |
| constitutionHalfDamageSuccess | №0762 |
| constitutionMaxBonus | №0762 |
| construct | №0611 (+ 12 других файлов) |
| constructBody | №0792 |
| constructConcentration | №0762 |
| constructDamageBonus | №0762 |
| constructMode | №0762 |
| consumableFunctional | №1130 |
| consumables | №0776 (+ 29 других файлов) |
| consume | №0655 (+ 1 других файлов) |
| consumed | №0655 (+ 2 других файлов) |
| consumedPotion | №0061 |
| consumeLairAction | №0788 |
| consumeLegendaryAction | №0788 |
| consumeLegendaryResistance | №0788 |
| consumeMagicMeleeWeapon | №0762 |
| consumeMaximum | №0801 |
| consumeOn | №0801 |
| consumePendingOnHit | №0631 (+ 1 других файлов) |
| consuming | №0697 (+ 1 других файлов) |
| Consuming | №0778 |
| consumption | №0762 |
| container | №0772 |
| containerRequired | №0762 |
| containers | №0789 (+ 4 других файлов) |
| containerType | №0772 |
| content | №0054 (+ 1 других файлов) |
| contentPackId | №0061 (+ 6 других файлов) |
| contents | №0772 (+ 1 других файлов) |
| contentType | №1234 |
| context | №0638 (+ 1 других файлов) |
| contextIsolation | №0869 |
| contextRestore | №1231 |
| contingencyPlan | №0762 |
| contracts | №0681 |
| controlMode | №0061 (+ 4 других файлов) |
| controlWithoutAction | №0762 |
| controlWithSameAction | №0762 |
| conversant | №0624 |
| Conversant | №0762 |
| convertDamage | №0796 |
| cook | №0653 (+ 4 других файлов) |
| coordinatedAssault | №0762 |
| copper | №0656 |
| copy | №0641 |
| copyDeleted | №0636 |
| core | №0778 |
| CORE | №0631 |
| core_2014 | №0611 |
| coreLoop | №0690 |
| corpseFlorist | №0792 |
| corpseId | №0792 |
| corpseTypes | №0762 |
| corrosion | №0624 (+ 1 других файлов) |
| corset | №1059 |
| cost | №0061 (+ 34 других файлов) |
| costGp | №0782 (+ 4 других файлов) |
| costs | №0607 (+ 1 других файлов) |
| cot | №0050 |
| cotton | №0045 (+ 1 других файлов) |
| counselorProtege | №0762 |
| count | №0044 (+ 60 других файлов) |
| counter | №0050 |
| counterAttackIfReducedToZero | №0762 |
| countercharm | №0631 |
| countered | №0794 |
| countsAsHit | №0762 |
| courageSource | №0638 |
| coven | №0796 |
| covens | №0690 |
| cover | №0794 (+ 6 других файлов) |
| coverBonus | №0794 (+ 1 других файлов) |
| covered | №0042 |
| coversTop | №0045 |
| cp | №0773 (+ 7 других файлов) |
| cr | №0611 (+ 18 других файлов) |
| craft | №0762 (+ 4 других файлов) |
| craftBonus | №0791 |
| craftCheck | №0654 (+ 1 других файлов) |
| craftDC | №0654 (+ 1 других файлов) |
| crafted | №0063 (+ 5 других файлов) |
| craftedOnly | №0776 |
| craftEffect | №0654 |
| craftFeature | №0762 |
| craftingBonus | №0646 (+ 3 других файлов) |
| craftingMaterial | №0647 |
| craftingProfessions | №0652 (+ 2 других файлов) |
| craftingProfile | №0655 |
| craftingSources | №0655 |
| craftMasterworkBonus | №0648 (+ 2 других файлов) |
| craftMaterialId | №0611 (+ 14 других файлов) |
| craftOutcome | №0655 (+ 1 других файлов) |
| craftProfession | №0654 (+ 1 других файлов) |
| craftQuality | №0648 (+ 6 других файлов) |
| craftQualityLabel | №0657 |
| craftRecipe | №0651 (+ 3 других файлов) |
| craftRoll | №0657 |
| CRAFTS | №0762 |
| craftTags | №0650 |
| craftTime | №0651 (+ 2 других файлов) |
| craftTools | №0651 |
| craftValue | №0654 (+ 1 других файлов) |
| craftValueNote | №0648 |
| crate | №0050 |
| create | №0059 (+ 7 других файлов) |
| createAvatar | №0822 |
| createBodyStatBlock | №0852 |
| createBoneObject | №0762 |
| createCharacter | №0049 |
| created | №0762 |
| createdAt | №0054 (+ 8 других файлов) |
| createdAtTurn | №0061 |
| createElement | №1048 (+ 23 других файлов) |
| createFor | №0640 (+ 1 других файлов) |
| createHostStatBlock | №0799 |
| createLarvaStatBlock | №0799 |
| createObjectURL | №1176 |
| createOozeDuplicate | №0061 |
| createProjectedItem | №0762 |
| createRoom | №1173 |
| createShell | №0767 |
| creator | №0778 |
| creatorMind | №0762 |
| creatures | №0822 |
| creatureType | №0629 (+ 10 других файлов) |
| crescendoOfViolence | №0762 |
| crest | №0044 |
| crestSize | №0049 (+ 1 других файлов) |
| crewLeader | №0762 |
| crewRangeFt | №0762 |
| crewSaveBonus | №0762 |
| crewSize | №0762 |
| crewSupport | №0759 |
| criminalContact | №0762 |
| crimson | №0815 |
| crimsonRite | №0624 |
| crimsonRites | №0671 |
| cripplingJinx | №0762 |
| cripplingStrike | №0762 |
| critFearAoEFt | №0624 |
| critical | №0638 (+ 34 других файлов) |
| critical_failure | №0647 (+ 1 других файлов) |
| criticalDoubles | №0762 (+ 1 других файлов) |
| criticalHit | №0762 |
| criticalOn | №0759 |
| criticalOnHit | №0762 |
| criticalRange | №0631 (+ 2 других файлов) |
| criticalSpellcasting | №0792 |
| critRange | №0624 |
| critWithRiteRestoresBloodMaledict | №0762 |
| crLimit | №0762 |
| crone | №0792 |
| crop | №0044 |
| crow | №0044 |
| crown | №0044 (+ 1 других файлов) |
| crown_braid | №0044 (+ 1 других файлов) |
| crownColor | №0049 (+ 1 других файлов) |
| crownSize | №0049 (+ 3 других файлов) |
| crScale | №0061 |
| crTotal | №0792 |
| cruelty | №0624 |
| Cruelty | №0762 |
| cryo | №0061 |
| cryoBomb | №0762 |
| crypto | №1053 (+ 24 других файлов) |
| crystal | №0651 (+ 3 других файлов) |
| cssText | №1106 |
| ctx | №0056 (+ 1 других файлов) |
| cube | №0669 |
| cunningAction | №0631 |
| cunningInstinct | №0762 |
| cups | №0045 (+ 2 других файлов) |
| cups_05 | №0801 |
| cups_13 | №0801 |
| cupsize | №1091 |
| curl | №0044 |
| curly_long | №0044 (+ 1 других файлов) |
| curly_short | №0044 (+ 1 других файлов) |
| current | №0054 (+ 34 других файлов) |
| currentCampaignId | №0625 |
| currentChar | №1127 (+ 5 других файлов) |
| currentCharacter | №1146 |
| currentFloor | №0054 |
| currentHP | №0767 (+ 3 других файлов) |
| currentId | №0830 |
| currentLevel | №0653 |
| currentVersion | №0825 |
| curse | №0060 (+ 10 других файлов) |
| curseAbility | №0060 |
| curseAbilityCheckDC | №0762 |
| curseBonusDamage | №0624 |
| curseCombination | №0762 |
| curseConcentrationAdvantage | №0796 |
| cursed | №0046 (+ 1 других файлов) |
| cursedAttackPenalty | №0624 |
| cursedCheckModifiers | №0624 |
| curseDetection30 | №0762 |
| cursedSaveModifiers | №0624 |
| curseImmunity | №0762 |
| curseItem | №0796 |
| curseMastery | №0759 |
| curseName | №0762 |
| cursePenalty | №0792 |
| cursePower | №0759 |
| curses | №0624 (+ 4 других файлов) |
| CURSES | №0762 |
| curseSave | №0792 |
| curseSpecialist | №0624 |
| curseSpells | №0762 |
| curseTarget | №0762 |
| custom | №0049 (+ 2 других файлов) |
| customColor | №0044 (+ 2 других файлов) |
| customCrafted | №0657 |
| customDress | №0045 |
| CustomEvent | №1087 (+ 1 других файлов) |
| customizations | №1057 (+ 1 других файлов) |
| customShirt | №0045 |
| customSkirt | №0045 |
| cut | №0045 (+ 2 других файлов) |
| cutoff | №1268 |
| cwd | №1269 |
| cx | №0041 (+ 2 других файлов) |
| cycles | №0808 (+ 1 других файлов) |
| cz | №0044 (+ 1 других файлов) |
| d | №0041 (+ 6 других файлов) |
| d2 | №1093 (+ 2 других файлов) |
| d20 | №0638 (+ 2 других файлов) |
| d20Modifiers | №0801 |
| d6 | №0061 |
| damage | №0057 (+ 81 других файлов) |
| DAMAGE_TYPES | №0638 |
| damageAfter | №0762 |
| damageAtTurnStart | №0061 |
| damageBefore | №0762 |
| damageBody | №0799 (+ 1 других файлов) |
| damageBonus | №0762 (+ 1 других файлов) |
| damageBonusMultiplier | №0762 |
| damageBoost | №0759 |
| damageContext | №0794 |
| damageDice | №0061 (+ 14 других файлов) |
| damageDie | №0759 (+ 1 других файлов) |
| damageDoubled | №0638 |
| damageDurability | №0649 |
| damageImmunity | №0762 |
| damageModifiers | №0624 (+ 1 других файлов) |
| damageMult | №0822 |
| damageOnFailedSave | №0762 |
| damageParts | №0624 (+ 6 других файлов) |
| damagePer10Ft | №0762 |
| damagePerTrigger | №0762 |
| damageRedirect | №0796 |
| damageReduction | №0631 (+ 4 других файлов) |
| damageResistance | №0759 (+ 1 других файлов) |
| damageResult | №0638 (+ 1 других файлов) |
| damageRoll | №0061 (+ 4 других файлов) |
| damageRolled | №0801 |
| damageSelf | №0762 |
| damageShell | №0767 |
| damageTaken | №0638 |
| damageType | №0061 (+ 79 других файлов) |
| damageTypeChoice | №0762 |
| damageTypes | №0061 (+ 5 других файлов) |
| danceBonusByCount | №0792 |
| dangerSense | №0631 |
| daringRescue | №0762 |
| dark | №0851 |
| darkArcana | №0792 |
| darkAugmentation | №0624 |
| darkCaptain | №0762 |
| darkDelirium | №0794 |
| darkMagic | №0759 |
| darkness | №0054 (+ 1 других файлов) |
| darknessAroundInterdictedFt | №0762 |
| darkOneDiscourse | №0762 |
| darkOnesBlessing | №0631 |
| darkvision | №0816 |
| darkvision60 | №0762 |
| darkvisionBonusFt | №0624 |
| darkvisionFt | №0624 (+ 1 других файлов) |
| dash | №0759 |
| dastardlyTalents | №0762 |
| data | №0060 (+ 10 других файлов) |
| date | №0625 (+ 1 других файлов) |
| dauntless | №0722 |
| dawn | №0624 |
| day | №0056 |
| dc | №0060 (+ 44 других файлов) |
| dcReduction | №0655 |
| dead | №0061 (+ 4 других файлов) |
| deadMistAcolyte | №0792 |
| deadShell | №0767 |
| deadSpace | №0762 (+ 1 других файлов) |
| deadSpaceSlots | №0792 |
| deafened | №0061 (+ 1 других файлов) |
| deathAfterDuration | №0762 |
| deathCause | №1047 |
| deathExplosion | №0792 |
| deathKnight | №0792 |
| deathPenalty | №0762 |
| deathSave | №0638 |
| deathSaveDisadvantage | №0624 (+ 1 других файлов) |
| deathSaveFailures | №0638 |
| deathSaves | №0638 (+ 6 других файлов) |
| deathWard | №0796 |
| debug | №0831 |
| decayPerHour | №0061 |
| deception | №0755 (+ 1 других файлов) |
| deceptionTotal | №0061 (+ 1 других файлов) |
| deck | №0804 (+ 1 других файлов) |
| decks | №0804 |
| declaredSourceCommit | №1268 |
| decorateItem | №0653 |
| deepSleeper | №0762 |
| deerHide | №0656 |
| default | №0049 (+ 2 других файлов) |
| DEFAULT | №0054 |
| DEFAULT_ENABLED | №0649 |
| DEFAULT_RACES | №1214 |
| defaultEnabled | №1079 |
| defaultSkinByGender | №0049 |
| defaultSkinId | №0049 |
| defeat | №0821 |
| defeated | №0061 (+ 9 других файлов) |
| defenderAura | №0759 |
| defenderReaction | №0638 (+ 4 других файлов) |
| defensive_duelist | №0765 |
| defensiveStance | №0762 |
| deferDamage | №0794 (+ 1 других файлов) |
| definition | №0801 |
| definitions | №0801 |
| deflected | №0638 |
| deflectMissiles | №0631 |
| deformAsset | №0051 |
| deformedPositions | №1070 |
| deftness | №0624 |
| Deftness | №0762 |
| deinonychus | №0669 |
| deleted | №0636 (+ 1 других файлов) |
| denial | №0762 |
| deniesActions | №0061 |
| denominator | №0804 |
| density | №0042 (+ 2 других файлов) |
| denValues | №0045 |
| denyAttackAdvantage | №0762 |
| denyBonusActions | №0061 |
| denyDashDisengageDodge | №0061 |
| depleted | №1128 |
| depth | №0044 (+ 4 других файлов) |
| desc | №0607 (+ 13 других файлов) |
| describeProfession | №0653 |
| description | №0054 (+ 70 других файлов) |
| descriptor | №0042 |
| deserialize | №0049 |
| desk | №0050 |
| destination | №0801 (+ 4 других файлов) |
| destinationGender | №1268 |
| destroy | №0826 |
| destroyThrallToHeal | №0792 |
| destroyUndead | №0631 |
| detail | №0049 (+ 3 других файлов) |
| details | №0767 (+ 3 других файлов) |
| detectIllusionAndShapeshifter | №0762 |
| detectMagic | №0762 (+ 1 других файлов) |
| dethek | №0762 (+ 1 других файлов) |
| dethekStance | №0762 |
| devicePixelRatio | №1048 (+ 1 других файлов) |
| devices | №0653 |
| deviceScaleFactor | №1246 |
| deviousTactics | №0762 |
| devouring | №0762 (+ 1 других файлов) |
| devTools | №0869 |
| dex | №0607 (+ 54 других файлов) |
| dexBonus | №0624 |
| dexChecksAdvantage | №0624 (+ 1 других файлов) |
| dexIncrease | №0762 |
| dexMaxBonus | №0624 |
| dexMaxIncrease | №0762 |
| dexSave | №0762 |
| dexSavesDisadvantage | №0624 (+ 1 других файлов) |
| dexSaveVisible | №0638 (+ 1 других файлов) |
| dexterity | №0769 (+ 10 других файлов) |
| Dexterity | №0063 |
| dexteritySaveProficiency | №0762 |
| diagnostics | №0046 (+ 1 других файлов) |
| diagonal | №0803 |
| dialect | №0762 (+ 1 других файлов) |
| diamondForm | №0762 |
| diamondPaste | №0656 |
| diamondSoul | №0631 |
| dice | №0060 (+ 10 других файлов) |
| diceCount | №0630 (+ 3 других файлов) |
| diceSides | №0630 (+ 3 других файлов) |
| die | №0064 (+ 6 других файлов) |
| diet | №0611 (+ 12 других файлов) |
| difficultTerrain | №1168 |
| difficulty | №0788 |
| digDeep | №0699 (+ 1 других файлов) |
| digits | №0044 |
| diminutive | №0816 (+ 1 других файлов) |
| dimLightAdditionalFt | №0762 |
| direct | №0801 (+ 1 других файлов) |
| directAttackNearestIfFailed | №0762 |
| directDice | №0061 |
| direction | №0056 (+ 5 других файлов) |
| directionSense | №0762 |
| directShift | №0816 |
| dirty | №0636 |
| dirtyHit | №0762 |
| dirtyStrike | №0759 |
| disabled | №0647 (+ 2 других файлов) |
| disabledBlocked | №1079 |
| disableSense | №0762 |
| disadvantage | №0061 (+ 11 других файлов) |
| disadvantageAgainstOthers | №0762 |
| disadvantageAgainstOthersWithinFt | №0762 |
| disadvantageAgainstSelf | №0762 |
| disadvantageAttacksExceptSelfUntilEndNextTurn | №0762 |
| disadvantageFirstSaveAgainstSpell | №0762 |
| disadvantageInDimLight | №0762 |
| disadvantageNextAttack | №0762 |
| disadvantageOnSaveWhenHidden | №0762 |
| disadvantageSaves | №0762 |
| disadvantageVsBloodHunterSpells | №0762 |
| disarm | №0759 (+ 1 других файлов) |
| disassembleItem | №0647 (+ 1 других файлов) |
| discard | №0804 |
| disciplinaryAdept | №0762 |
| discipline | №0697 (+ 4 других файлов) |
| disciplines | №0697 (+ 2 других файлов) |
| disciplineUsesPerTurn | №0697 |
| discovered | №0062 (+ 1 других файлов) |
| discoveries | №0061 (+ 3 других файлов) |
| discovery | №0061 (+ 1 других файлов) |
| discoveryBonus | №0064 |
| discoveryLevelGating | №0660 |
| discoveryRecipes | №0061 |
| disengageOnHit | №0759 |
| disguise | №0655 |
| disguiseAndHexFocus | №0796 |
| disguiseAppearance | №0061 |
| disguiser | №0653 (+ 1 других файлов) |
| disoriented | №0762 |
| disorientedDice | №0762 |
| dispellingAnathema | №0762 |
| display | №0782 (+ 1 других файлов) |
| displayName | №0628 (+ 3 других файлов) |
| dispose | №0056 |
| dist | №0794 |
| distance | №0639 (+ 2 других файлов) |
| distanceFt | №0624 (+ 17 других файлов) |
| distant | №0631 |
| divineChannelUses | №0792 |
| divineIntervention | №0631 |
| divineMandate | №0762 |
| divineRespite | №0786 |
| divineSense | №0631 |
| divineSmite | №0631 (+ 2 других файлов) |
| dlc | №0649 |
| DND_CLASSES_LIST | №1214 |
| DND_UPDATE_MANIFEST_URL | №1213 |
| dndBackgrounds | №1214 |
| DNDBattleBoard | №1147 |
| DNDCampaign | №1146 (+ 1 других файлов) |
| DNDCloudConfig | №1077 |
| DNDCombat | №1146 (+ 1 других файлов) |
| DNDContent | №1046 (+ 2 других файлов) |
| DNDGameplayV57 | №1147 |
| DNDGLTF | №1048 |
| DndLanBridge | №1173 |
| DNDMonsterLoot | №1146 |
| dndMorphChannels | №1048 (+ 1 других файлов) |
| dndMorphSource | №1220 |
| dndNetwork | №1146 (+ 1 других файлов) |
| DNDRules | №1208 |
| DNDSummoning | №1146 |
| dock | №0053 |
| document | №1046 (+ 38 других файлов) |
| documentElement | №1087 |
| dodge | №0762 |
| dogAndHound | №0699 |
| dominantCharacteristics | №0852 |
| donorHitDieSpent | №0796 |
| donorType | №0061 (+ 1 других файлов) |
| donorVerified | №1047 |
| door | №0050 |
| doubleBreath | №0762 |
| doubleDamage | №0801 |
| doubleFoodSleepInterval | №0762 |
| doubleProficiency | №0762 |
| doubleSided | №0052 |
| doubleSpeed | №0792 |
| doublingJinx | №0762 |
| downButNotOut | №0699 (+ 1 других файлов) |
| downButNotOutActive | №0762 |
| downstreamRecipeAvailable | №0646 |
| draconicDiscourse | №0762 |
| draconicElement | №1185 |
| draconicResilience | №0631 |
| draconicStance | №0762 |
| draft | №0844 |
| dragging | №0609 |
| dragon | №0044 (+ 17 других файлов) |
| dragon_fear | №0765 |
| dragonArmyAffinity | №0614 |
| dragonFamily | №1141 |
| dragonlance | №0614 |
| dragonReagent | №0650 (+ 1 других файлов) |
| dragonsAscent | №0762 |
| dragonScale | №0650 (+ 1 других файлов) |
| dragonScaleRed | №0656 |
| draw | №0055 (+ 2 других файлов) |
| draws | №1048 |
| dreadfulGlare | №0762 |
| dreadlord | №0762 |
| dreadPresence | №0762 |
| dress | №0045 (+ 1 других файлов) |
| dressSleeves | №0045 |
| driedHerbBundle | №0655 |
| driedMeat | №0655 (+ 1 других файлов) |
| dropObject | №0762 |
| dropToOneHP | №0669 |
| Drowned | №0762 |
| druid | №0781 (+ 1 других файлов) |
| druidic | №0631 |
| dryRun | №0646 (+ 6 других файлов) |
| duplicate | №0835 |
| duplicateOnPhaseRift | №0762 |
| duplicateTargetCollisions | №1099 |
| dur | №0650 |
| durability | №0648 (+ 4 других файлов) |
| durabilityBonus | №0652 |
| durabilityMax | №1078 (+ 1 других файлов) |
| durabilityMultiplier | №0648 (+ 2 других файлов) |
| duration | №0051 (+ 21 других файлов) |
| durationHours | №0624 (+ 2 других файлов) |
| durationMinutes | №0061 (+ 6 других файлов) |
| durationRounds | №0060 (+ 4 других файлов) |
| durationRule | №0816 |
| durationSeconds | №0801 (+ 1 других файлов) |
| durationTurns | №0792 |
| durationUnit | №0640 (+ 1 других файлов) |
| durationUntilSave | №0792 |
| durationUntilStartOfTurn | №0762 |
| duringShortRest | №1047 |
| dusk | №0056 |
| dwarf | №0646 |
| dwarf_hill | №0655 |
| dwarf_mountain | №0655 |
| dwarven_fortitude | №0765 |
| dwarvishDiscourse | №0762 |
| dyingCurse | №0762 |
| dynamic | №0044 |
| e | №0057 (+ 1 других файлов) |
| earField | №0044 |
| earFrame | №0045 |
| earLength | №0049 (+ 6 других файлов) |
| earPointiness | №0049 (+ 6 других файлов) |
| earth | №0669 |
| Earth | №0063 |
| earthCore | №0809 |
| earthEssence | №0809 |
| earTuftSize | №0049 (+ 2 других файлов) |
| ecology | №0611 (+ 12 других файлов) |
| ectoplasm | №0650 (+ 1 других файлов) |
| edition | №0060 (+ 23 других файлов) |
| effect | №0061 (+ 20 других файлов) |
| effectiveD20 | №0638 |
| effectiveDamage | №0638 |
| effectiveMode | №1114 |
| effectiveStats | №0799 |
| effectKey | №0799 |
| effects | №0063 (+ 5 других файлов) |
| elasticHide | №0809 |
| Elderheart | №0778 |
| eldritchBane | №0762 |
| eldritchCannon | №0631 |
| eldritchInvocations | №0631 |
| eldritchMaster | №0631 |
| electricCharge | №0762 |
| elemental | №0046 (+ 14 других файлов) |
| Elemental | №0778 |
| elementalAsh | №0650 (+ 1 других файлов) |
| elementalBlast | №0762 |
| elementalPower | №0762 |
| elephant | №0044 |
| elephantEarSize | №0049 (+ 1 других файлов) |
| elephantTuskSize | №0049 (+ 1 других файлов) |
| elevationFt | №0801 |
| elf_wood | №0655 |
| elfcity | №0046 |
| eligible | №1125 |
| elixirs | №0653 |
| eloquentSpeech | №0762 |
| elven_accuracy | №0765 |
| email | №0636 (+ 1 других файлов) |
| emanationFt | №0762 |
| embers | №0624 |
| Embers | №0762 |
| emerald | №0851 |
| emergencyReanimate | №0852 |
| emissaryPhaseHooks | №1134 |
| empowered | №0631 (+ 1 других файлов) |
| enableApply | №0826 |
| enabled | №0042 (+ 6 других файлов) |
| enchant | №0653 |
| enclosed | №0042 |
| encoding | №0872 (+ 2 других файлов) |
| encounter | №0843 (+ 1 других файлов) |
| encounterBias | №0615 |
| encounterId | №0801 (+ 2 других файлов) |
| end | №0044 (+ 2 других файлов) |
| endActorTurn | №0624 |
| endAllRites | №0762 |
| endCondition | №0762 |
| endConditions | №0762 |
| endedByZeroHp | №0638 |
| endEffectPsi | №0762 |
| endEncounter | №0669 |
| endExternalPetrificationAfter | №0762 |
| endIllusion | №0762 |
| endInvisibility | №0762 |
| endPossession | №0767 |
| endRampage | №0669 |
| ends | №0827 |
| endsAt | №0762 |
| endsOnAttack | №0061 (+ 1 других файлов) |
| endsOnAttackOrSpell | №0762 |
| endsOnDamage | №0061 |
| endsOnHostile | №0801 |
| endsOnMagicHealing | №0669 |
| endsOnMove | №0762 |
| endsOnRemoveCurse | №0762 |
| endsWhen | №0762 |
| endTurn | №0766 (+ 3 других файлов) |
| enemiesFrightened | №0762 |
| enemy | №1104 (+ 2 других файлов) |
| enemyDistanceFt | №1126 |
| enemyRead | №0759 |
| enervatingJinx | №0762 |
| enervatingSpell | №0762 |
| eng | №0728 |
| engines | №0831 (+ 1 других файлов) |
| englishName | №0060 (+ 29 других файлов) |
| enhancement | №0762 |
| enhancingSurge | №0762 |
| enlightened | №0762 |
| enliveningOrder | №0762 |
| enshroudingImprecation | №0762 |
| ensure | №0767 (+ 8 других файлов) |
| ensureCharacterProfessions | №0653 |
| ensureMaterial | №0650 |
| ensureResourceState | №0788 |
| ensureTracker | №0766 (+ 1 других файлов) |
| enterSpiritForm | №0767 |
| entities | №0061 (+ 2 других файлов) |
| entity | №0061 (+ 4 других файлов) |
| entityId | №0061 (+ 3 других файлов) |
| entries | №0636 (+ 1 других файлов) |
| entryRoute | №0852 |
| enumerable | №0801 |
| ep | №0773 (+ 5 других файлов) |
| equip | №0049 |
| equipment | №0049 (+ 6 других файлов) |
| equipmentId | №0049 |
| equipMilitia | №0762 |
| equipped | №0057 (+ 2 других файлов) |
| equippedArmor | №1079 |
| error | №0046 (+ 33 других файлов) |
| error_code | №1077 |
| errors | №0644 (+ 1 других файлов) |
| essence | №0809 |
| eTexture | №0059 |
| ethanol | №0656 |
| ethereal | №0762 |
| evasion | №0631 (+ 3 других файлов) |
| evasionMonk | №0631 |
| event | №0804 (+ 1 других файлов) |
| eventCount | №0830 (+ 2 других файлов) |
| eventLog | №0845 (+ 2 других файлов) |
| eventLogBaseSeq | №1206 |
| events | №0830 (+ 5 других файлов) |
| eventSeq | №0793 (+ 5 других файлов) |
| exact | №1234 |
| exaltedLeader | №0722 |
| exaltedMutation | №0624 |
| exaltedProtege | №0762 |
| excellent | №0791 |
| exceptional | №0647 (+ 1 других файлов) |
| exceptPsychic | №0762 |
| exclude | №0041 |
| executablePath | №1223 (+ 37 других файлов) |
| executeAttack | №0766 |
| exhaustion | №0762 (+ 1 других файлов) |
| exhaustionAfter | №0759 |
| exhaustionApplied | №0762 |
| exhaustionGain | №0759 |
| exhaustionOnFailedSave | №0762 |
| exit | №1082 |
| exorcist | №0624 (+ 1 других файлов) |
| exoskeletonArmor | №0762 |
| exp | №0763 |
| expand | №0643 |
| expanded | №0643 (+ 1 других файлов) |
| expected | №0837 |
| expectedProcessed | №0809 |
| expectedRevision | №0802 (+ 10 других файлов) |
| expendHitDie | №0762 |
| experience | №0769 |
| experimental | №0062 (+ 1 других файлов) |
| experimentalist | №0660 |
| experiments | №0062 (+ 1 других файлов) |
| expertFocus | №0762 |
| expertise | №0762 (+ 1 других файлов) |
| expertiseSkills | №0762 |
| expired | №0061 |
| expires | №0061 (+ 3 других файлов) |
| expires_at | №0636 |
| expires_in | №1077 |
| expiresAt | №0060 (+ 3 других файлов) |
| expiresRounds | №0762 |
| exploded | №0061 |
| explodeRadiusFt | №0061 |
| explodesOncePerTurn | №0762 |
| exploit | №0669 |
| exploitDice | №0722 |
| exploitDie | №0722 (+ 1 других файлов) |
| exploits | №0722 (+ 1 других файлов) |
| exploitsKnown | №0722 |
| explosiveBane | №0762 |
| explosiveCannon | №0794 |
| exportedAt | №0830 |
| exportedMacros | №1268 |
| exportJSON | №0046 (+ 1 других файлов) |
| exportReplay | №0830 |
| exportSession | №0843 (+ 1 других файлов) |
| exposingStrike | №0762 |
| exposure | №0624 |
| expression | №0638 (+ 2 других файлов) |
| extended | №0631 |
| extendedResourceState | №0631 |
| extendedTactics | №0718 |
| extendExistingDarkvisionFt | №0624 |
| extendHex | №0759 |
| extendHexRounds | №0762 |
| external | №0042 (+ 1 других файлов) |
| externalGeometryAvailable | №0042 |
| externalGeometryReady | №0042 |
| externalGeometryStage | №0042 |
| extra | №0062 (+ 2 других файлов) |
| extraAction | №0762 |
| extraActionNextTurn | №0801 |
| extraAstralConstruct | №0762 |
| extraAtk | №0630 (+ 1 других файлов) |
| extraAttack | №0624 (+ 7 других файлов) |
| extraAttackDamage | №0624 |
| extraAttacks | №0060 (+ 13 других файлов) |
| extraBloodMaledictUse | №0624 (+ 1 других файлов) |
| extraCantrips | №0796 |
| extraClassType | №0629 |
| extraCurseArmamentAttack | №0762 |
| extraCursedAttunement | №0762 |
| extraDamage | №0061 (+ 2 других файлов) |
| extraDamageByLevel | №0060 |
| extraDamageDice | №0762 |
| extraDamageDie | №0762 |
| extraDice | №0061 (+ 8 других файлов) |
| extraDieVsUndead | №0762 |
| extradimensional | №0796 |
| extraDimLight | №0762 |
| extraDimLightDie | №0762 |
| extraDiscipline | №0762 |
| extraDmg | №0630 (+ 2 других файлов) |
| extraExploitDice | №0762 |
| extraExploitKnown | №0762 |
| extraFamiliarAction | №0796 |
| extraForms | №0762 |
| extraKnowledgeSkill | №0762 |
| extraNecrotic | №0762 |
| extrapolated | №1220 |
| extraPsiOverMax | №0762 |
| extraPsychicDice | №0762 |
| extraRadiusFt | №0061 |
| extraRampageDie | №0762 |
| extraReaction | №0801 |
| extraReactions | №0801 |
| extraRiteDie | №0762 |
| extras | №1048 (+ 1 других файлов) |
| extraSaveBonus | №0855 |
| extraSkillChoice | №0762 |
| extraSuture | №0792 |
| extraTargetPerSlotAbove1 | №0762 |
| extraTargets | №0762 |
| extraTurns | №0796 |
| extraUnarmedAfterTwoOldOneTwo | №0762 |
| extraUse | №0762 (+ 1 других файлов) |
| eye | №0044 (+ 1 других файлов) |
| eyeColor | №0049 (+ 3 других файлов) |
| eyeGlow | №0049 (+ 2 других файлов) |
| eyeHeight | №0046 (+ 2 других файлов) |
| eyeless | №0624 |
| eyeliner | №1232 |
| eyeShape | №0049 |
| eyeSize | №0049 (+ 1 других файлов) |
| eyeSpacing | №0049 (+ 1 других файлов) |
| eyeTilt | №0046 (+ 1 других файлов) |
| eyeWidth | №0046 (+ 1 других файлов) |
| f | №0044 (+ 2 других файлов) |
| faceColor | №0049 (+ 5 других файлов) |
| faceLength | №0046 (+ 1 других файлов) |
| faceShape | №0049 |
| faceTint | №0049 (+ 2 других файлов) |
| faceWidth | №0046 (+ 2 других файлов) |
| facileSuppression | №0762 |
| factionAgents | №0615 |
| factions | №0615 |
| fail | №0826 (+ 1 других файлов) |
| failChance | №0063 |
| failed | №0046 (+ 4 других файлов) |
| failedSave | №1115 |
| failNextRollDisadvantage | №0762 |
| failure | №0063 (+ 3 других файлов) |
| failures | №0638 (+ 13 других файлов) |
| fair | №0791 |
| fall | №0638 (+ 3 других файлов) |
| fallDamageReduction | №0762 |
| fallen | №0054 (+ 1 других файлов) |
| fallenAttack | №0624 |
| fallenPuppet | №0624 |
| fallingStrike | №0759 |
| familiar | №0640 (+ 2 других файлов) |
| familiarAttack | №0762 |
| familiarHpBonus | №0762 |
| familiarLink | №0796 |
| familiarSettlement | №0762 |
| familiarStealth | №0796 |
| families | №0611 (+ 24 других файлов) |
| family | №0042 (+ 3 других файлов) |
| familyByCreature | №1133 (+ 10 других файлов) |
| familyId | №0611 (+ 10 других файлов) |
| fancyFootwork | №0762 |
| fangSize | №0049 (+ 2 других файлов) |
| fastHands | №0631 |
| fastMovement | №0631 |
| fastTravel | №0762 |
| fat | №0046 (+ 1 других файлов) |
| fathomless | №0624 |
| fatigue | №0762 |
| favoredEnemy | №0631 |
| favoredServant | №0762 |
| fear | №0061 (+ 1 других файлов) |
| Fear | №0063 |
| fearApplied | №0762 |
| fearAura | №0759 |
| fearBomb | №0762 |
| fearImmune | №0801 |
| fearImmunity | №0759 |
| fearPulse | №0612 |
| fearSave | №0762 |
| fearSavePenalty | №0762 |
| fearSourceId | №0801 |
| fearTargets | №1122 |
| feat | №0730 |
| featherTailSize | №0049 (+ 3 других файлов) |
| featherWingSize | №0049 (+ 3 других файлов) |
| feats | №0769 (+ 3 других файлов) |
| feature | №0607 (+ 1 других файлов) |
| FEATURE_DEFS | №0631 |
| featureAvailableForCurrentBuild | №0631 |
| featureId | №0794 |
| featureLevels | №0786 (+ 4 других файлов) |
| featureName | №0794 (+ 2 других файлов) |
| features | №0769 (+ 57 других файлов) |
| fecundAffliction | №0762 |
| feedOnCorpse | №0799 |
| feet | №0044 (+ 9 других файлов) |
| feint | №0762 |
| female | №0042 (+ 2 других файлов) |
| femaleStackTerms | №1268 |
| feralInstinct | №0631 |
| feralSenses | №0631 (+ 1 других файлов) |
| ferocious | №0669 |
| ferocity | №0639 (+ 3 других файлов) |
| ferocityMax | №0640 (+ 1 других файлов) |
| fetch | №1050 (+ 6 других файлов) |
| fey | №0611 (+ 11 других файлов) |
| fey_touched | №0765 |
| feyFiber | №0809 |
| feyPresence | №0631 (+ 1 других файлов) |
| fiber | №0650 (+ 1 других файлов) |
| field | №0044 (+ 1 других файлов) |
| fiend | №0611 (+ 12 других файлов) |
| fiendish | №0762 (+ 1 других файлов) |
| fiendishStance | №0762 |
| fightClubs | №0699 |
| fighterRemarkableAthlete | №0631 |
| fighting_initiate | №0765 |
| fightingSpirit | №0699 (+ 1 других файлов) |
| fightingStyle | №0624 (+ 4 других файлов) |
| fightingStyleChoice | №0762 |
| fightingStyles | №0671 (+ 1 других файлов) |
| file | №0851 (+ 1 других файлов) |
| filename | №0646 (+ 67 других файлов) |
| FileReader | №1176 |
| files | №0825 (+ 3 других файлов) |
| filter | №0815 (+ 3 других файлов) |
| filtered | №0830 |
| final | №0833 |
| finalMartyrdom | №0786 |
| finalStrikeExploit | №0762 |
| findRecipeForItem | №0647 |
| fine | №0647 (+ 3 других файлов) |
| finecarver | №0653 |
| fineFiberV49 | №0650 |
| fineLeatherV49 | №0650 |
| finesse | №0796 |
| finesseOrRanged | №1186 |
| finger | №0044 |
| finish | №0044 (+ 2 других файлов) |
| finite | №1237 (+ 3 других файлов) |
| finSize | №0049 (+ 2 других файлов) |
| firbolg | №0655 |
| fire | №0624 (+ 3 других файлов) |
| Fire | №0063 |
| fireAffinity | №0796 |
| fireClay | №0656 |
| fireDamage | №0762 (+ 1 других файлов) |
| fireEssence | №0650 (+ 1 других файлов) |
| fireResistance | №0796 |
| firmness | №1091 |
| first | №0810 |
| firstAid | №0762 |
| firstAttackAdvantage | №0762 (+ 1 других файлов) |
| firstHitByEachTargetRestoresMoxie | №0762 |
| firstMate | №0762 |
| fisher | №0784 (+ 1 других файлов) |
| fisticuffs | №0699 |
| fisticuffsDie | №0699 |
| fit | №0045 (+ 8 других файлов) |
| fitFrame | №0045 |
| fitProfile | №0049 |
| fixed | №0696 (+ 1 других файлов) |
| fixtureSha256 | №1090 |
| fizban | №0611 |
| flame | №0624 |
| flameBurst | №0762 |
| flameReroll12 | №0624 |
| flamesOfHope | №0762 |
| flare | №0045 |
| flashOfGenius | №0631 (+ 1 других файлов) |
| flashOfGeniusAvailable | №0638 |
| flat | №0044 |
| flawed | №0657 |
| flawlessAnalysis | №0812 |
| flax | №0656 |
| fletcher | №0653 (+ 2 других файлов) |
| fletchingStock | №0650 (+ 1 других файлов) |
| fletchingStockV49 | №0650 |
| floatObjectsLb | №0762 |
| floor | №0041 (+ 5 других файлов) |
| FLOOR | №0055 |
| floor_ceramic_tile_dark | №0055 |
| floor_ceramic_tile_light | №0055 |
| floor_checker_tile | №0055 |
| floor_cobblestone | №0055 |
| floor_earth | №0055 |
| floor_grass | №0055 |
| floor_hex_tile | №0055 |
| floor_marble_dark | №0055 |
| floor_marble_light | №0055 |
| floor_parquet_herringbone | №0055 |
| floor_rug_blue | №0055 |
| floor_rug_green | №0055 |
| floor_rug_red | №0055 |
| floor_stone_tile_dark | №0055 |
| floor_stone_tile_light | №0055 |
| floor_tatami | №0055 |
| floor_water | №0055 |
| floor_wood_dark | №0055 |
| floor_wood_light | №0055 |
| floors | №0054 |
| flowers | №0808 |
| flurry | №0631 |
| fly | №0792 |
| flyFt | №0624 (+ 1 других файлов) |
| flyIfSelected | №0669 |
| flyingSpeed | №0796 |
| flySpeed | №0061 (+ 2 других файлов) |
| focus | №0624 (+ 10 других файлов) |
| focusDebuff | №0762 |
| focusDuration | №0812 |
| focusDurationRounds | №0762 |
| focusEndsOn | №0812 |
| focuses | №0631 |
| focusRangeFt | №0812 |
| foeSlayer | №0631 |
| foeSlayerApplied | №1187 |
| foeSlayerMode | №1187 |
| folder | №1091 (+ 2 других файлов) |
| folders | №0607 (+ 1 других файлов) |
| fontOfLife | №0718 |
| fontOfMagic | №0631 |
| food | №0782 |
| foot | №0044 |
| footL | №0042 |
| footprintFeet | №0049 |
| footR | №0042 |
| foraging | №0653 |
| force | №0854 (+ 6 других файлов) |
| forceAttackRedirect | №0762 |
| forceCrit1 | №1114 |
| forceCritical | №0631 (+ 1 других файлов) |
| forced | №0833 (+ 1 других файлов) |
| forceDamage | №0669 (+ 1 других файлов) |
| forceDamageInside | №0762 |
| forcedAttack | №0833 |
| forcedD20 | №0833 |
| forcedDamage | №0833 |
| forcedDice | №0835 |
| forcedMeleeReaction | №0762 |
| forcedMoveFt | №0759 (+ 2 других файлов) |
| forcedMovementProtection | №0762 |
| forcedReactionAttack | №0762 |
| forcedSave | №0833 |
| forceOfNature | №0816 |
| forceSlot | №1124 |
| forceSurge | №0762 |
| forceTwenty | №0631 |
| forceUnarmed | №0762 |
| forearmL | №0042 |
| forearmR | №0042 |
| foresight | №0759 |
| forest | №0046 (+ 1 других файлов) |
| forge | №0046 |
| forger | №0653 (+ 1 других файлов) |
| forgery | №0655 |
| forgetAfterCast | №0762 |
| forgottenKnowledge | №0762 |
| forkedTongue | №0681 |
| form | №0044 (+ 3 других файлов) |
| formationRole | №0614 |
| formless | №0827 |
| formula | №0061 (+ 4 других файлов) |
| formulae | №0061 |
| formulas | №0061 (+ 4 других файлов) |
| fortified | №0854 |
| fortifyingDice | №0762 |
| fortunateCompany | №0762 |
| fortuneMode | №0801 |
| fortunePending | №0801 |
| fortuneRevealed | №0801 |
| fortuneTwist | №0762 |
| forward | №0049 |
| fractureBurst | №0762 |
| frame | №0041 |
| free | №0762 (+ 4 других файлов) |
| freeAfflict | №0762 |
| freeAt17 | №0786 |
| freeAtLevel17 | №0762 |
| freeAtUnsealed | №0762 |
| freeCast | №0762 |
| freeDispelCaster | №0762 |
| freedomOfMovement | №0792 |
| freeExploits | №0762 |
| freeHandBonusAction | №0762 |
| freeHitDieChancePercent | №0762 |
| freeHoldTheLine | №0762 |
| freeInsightfulOrder | №0762 |
| freeLawShieldAndHalt | №0762 |
| freeMoveFt | №0762 |
| freePoints | №0697 |
| freePsi | №0762 |
| freePsiLost | №0762 |
| freePsiPerTurn | №0762 |
| freeSpell | №0796 |
| freeSpells | №0762 |
| freeTalent | №0762 |
| freeUse | №0762 |
| freeUses | №0827 |
| frenzy | №0631 |
| frighten | №0796 |
| frightened | №0762 (+ 2 других файлов) |
| frightenedBy | №0801 |
| frightenedEffect | №0624 (+ 3 других файлов) |
| frightenedSaveDisadvantage | №0762 |
| frightenedUntilEndNextTurn | №0762 |
| from | №0615 (+ 24 других файлов) |
| fromFiendOrUndead | №0631 (+ 1 других файлов) |
| fromRound | №0801 |
| fromSpell | №0638 (+ 3 других файлов) |
| front | №0045 (+ 1 других файлов) |
| frontDigits | №0044 |
| FrontTexture | №1101 |
| frozen | №0624 |
| full_orc | №0655 |
| fullMaxNearestDistance | №1099 |
| fullMeanNearestDistance | №1099 |
| fullSpeedDragging | №0762 |
| fulminatingFatigue | №0762 |
| fumble | №0638 (+ 30 других файлов) |
| functionalStatus | №0785 |
| fur | №0044 |
| furAmount | №0042 (+ 3 других файлов) |
| furColor | №0049 (+ 1 других файлов) |
| furDensity | №0042 (+ 4 других файлов) |
| furH | №0044 |
| furLength | №0042 (+ 2 других файлов) |
| furParts | №0044 |
| furProfile | №0042 (+ 4 других файлов) |
| furRoots | №0044 |
| furShell | №0044 |
| furStrands | №0044 |
| furyOfForge | №0762 |
| fuseMinutes | №0061 |
| fuseRounds | №0061 (+ 1 других файлов) |
| g | №0851 |
| gainD4OnFailure | №0762 |
| gained | №0639 (+ 1 других файлов) |
| gainFerocity | №0639 (+ 1 других файлов) |
| gainRelaxationPerTurn | №0762 |
| gallantSpellcasting | №0762 |
| gameActors | №0624 |
| gameOfChance | №0762 |
| gameplay | №0831 (+ 2 других файлов) |
| gameplayEvents | №0845 (+ 1 других файлов) |
| gargantuan | №0799 (+ 1 других файлов) |
| gaseousBody | №0792 |
| gaseousReaction | №0792 |
| gateTowns | №0615 |
| gather | №0064 |
| gatherAction | №0064 |
| gathered | №0861 (+ 1 других файлов) |
| gatherIngredient | №0064 |
| gear | №0648 (+ 2 других файлов) |
| gelid | №0624 |
| Gelid | №0762 |
| gem | №0651 (+ 3 других файлов) |
| gemcutter | №0784 (+ 1 других файлов) |
| gems | №0653 |
| gender | №0043 (+ 18 других файлов) |
| genderMorphs | №0049 |
| general | №0784 (+ 1 других файлов) |
| generate | №0789 (+ 3 других файлов) |
| genie | №0624 |
| geometryBuilds | №0046 |
| geometryState | №0045 |
| geometryUploads | №0046 |
| get | №0641 (+ 5 других файлов) |
| getAC | №0822 |
| getAllBackgrounds | №1214 |
| getAllRaces | №1214 |
| getAttribute | №1159 |
| getAvailableRecipes | №0653 |
| getBiomassFromCorpse | №0822 |
| getBody | №0799 |
| getBodyState | №0049 |
| getCharismaModifier | №0784 |
| getClass | №0644 |
| getClassSummary | №0852 |
| getCreature | №0611 (+ 12 других файлов) |
| getCurrent | №0625 (+ 2 других файлов) |
| getCurse | №0060 |
| getDC | №0812 |
| getDevourDamage | №0822 |
| getDevourDC | №0822 |
| getDialect | №0811 |
| getDie | №0812 |
| getDiscipline | №0812 |
| getDominantAbilityNames | №0852 |
| getDurability | №0650 (+ 1 других файлов) |
| getElementById | №1046 (+ 37 других файлов) |
| getExhaustion | №0808 |
| getFeature | №0644 |
| getInscribedRunes | №0811 |
| getItem | №1048 (+ 20 других файлов) |
| getItemQuality | №0650 |
| getLanguages | №0811 |
| getLarva | №0799 |
| getLibraryManifest | №0054 |
| getLockedRecipes | №0653 |
| getMap | №0053 |
| getMaxCharacteristics | №0852 |
| getMaxPreparedSpellsLimit | №0819 |
| getMetamorphoses | №0060 |
| getMorphWeights | №0049 |
| getMutationSlots | №0822 |
| getNativeStorageStats | №0825 |
| getObject | №0054 |
| getPath | №1081 (+ 1 других файлов) |
| getPeer | №1119 (+ 7 других файлов) |
| getPersuasionModifier | №0784 |
| getProfession | №0653 |
| getProfile | №0653 (+ 1 других файлов) |
| getPursuit | №0812 |
| getRace | №0049 |
| getReactions | №0812 |
| getRenderDescriptor | №0049 |
| getRunesKnown | №0811 |
| getRunicDC | №0811 |
| getSaveBonus | №0810 (+ 13 других файлов) |
| getSaveDC | №0060 |
| getSkillBonus | №0810 |
| getSource | №0781 |
| getSpecialization | №0653 |
| getSpellInfo | №0781 |
| getSpellsKnown | №0060 |
| getSpellSlots | №0060 |
| getState | №0046 (+ 1 других файлов) |
| getStats | №0810 |
| getSubclass | №0631 |
| getSummary | №0767 |
| getSymbiosisTier | №0799 |
| getToken | №0813 |
| getTrader | №0782 |
| getVersion | №1081 (+ 1 других файлов) |
| getView | №1176 |
| getZone | №0054 |
| ghost | №0046 |
| ghostChainSize | №0049 (+ 2 других файлов) |
| ghostOnKill | №0792 |
| ghostOpacity | №0049 (+ 2 других файлов) |
| ghostTerror | №0049 (+ 2 других файлов) |
| ghostWeapon | №0046 (+ 3 других файлов) |
| ghukliak | №0762 (+ 1 других файлов) |
| giant | №0614 |
| Gifted | №0778 |
| giftedStrategist | №0762 |
| gl | №0056 (+ 4 других файлов) |
| glancingBlow | №0762 |
| glareParalyzeOnFailBy5 | №0762 |
| glass | №0650 (+ 6 других файлов) |
| glassBatch | №0656 |
| glassblower | №0653 (+ 3 других файлов) |
| glasswork | №0651 (+ 2 других файлов) |
| glaze | №0655 (+ 1 других файлов) |
| glazedVessel | №0655 |
| glb | №1097 |
| glbBBox | №1094 (+ 1 других файлов) |
| glbTriangles | №1094 (+ 2 других файлов) |
| glbVertices | №1085 (+ 4 других файлов) |
| gliderMembraneSize | №0049 (+ 1 других файлов) |
| global | №1183 (+ 5 других файлов) |
| globalThis | №1197 (+ 4 других файлов) |
| gloves | №0045 |
| glow | №0049 |
| gltf | №0052 (+ 2 других файлов) |
| gnoll | №0757 |
| gnome_forest | №0655 |
| gnome_rock | №0655 |
| goblin | №0655 |
| goblinDiscourse | №0762 |
| goblinoid | №0757 |
| goblinStance | №0762 |
| gold | №0815 (+ 2 других файлов) |
| goldBillet | №0656 |
| goldenSlumbers | №0762 |
| goldPer10 | №0648 |
| good | №0647 (+ 1 других файлов) |
| goodPct | №1099 |
| gooSize | №0049 (+ 1 других файлов) |
| gp | №0773 (+ 7 других файлов) |
| graftAction | №1047 |
| graftName | №1047 |
| grafts | №0061 (+ 1 других файлов) |
| grain | №0655 (+ 1 других файлов) |
| GRAND_HEXES | №0762 |
| grandHex | №0759 (+ 1 других файлов) |
| grandRevolutionary | №0762 |
| grantActionNextStart | №0801 |
| grantAdvantage | №0762 |
| grantIngredient | №0064 |
| grantsAdvantage | №0810 |
| grantTemporaryHitPoints | №0638 |
| grantUndyingToAlly | №0762 |
| grapple | №0759 |
| grappleBonus | №0762 |
| grappleMastery | №0759 |
| grappleSizePlus | №0762 |
| grappleTarget | №0759 |
| gravity | №0801 |
| gravityResisted | №0801 |
| grayColor | №0049 (+ 1 других файлов) |
| grayPercent | №1066 (+ 1 других файлов) |
| great_weapon_master | №0765 |
| greaterDivineIntervention | №0631 |
| greatOldOne | №0624 |
| Green | №0759 (+ 1 других файлов) |
| greenwood | №0861 |
| greenwood_clearing | №0861 |
| greenwood_heart | №0861 |
| greenwood_stream | №0861 |
| grid | №0044 (+ 1 других файлов) |
| grimPsychometry | №0624 |
| grip | №0046 |
| ground | №0044 |
| group | №0044 |
| groupKey | №0857 (+ 3 других файлов) |
| groups | №0638 (+ 7 других файлов) |
| guaranteed | №0611 (+ 14 других файлов) |
| guardCraft | №0649 |
| guardDC | №0801 |
| Guardian | №0778 |
| guardianRangeFt | №0762 |
| guardians | №1145 |
| guardianTactic | №0762 |
| guardianTactics | №0718 |
| guardRepair | №0649 |
| guest | №0636 |
| guidedStrike | №0631 |
| guild | №0646 |
| gumArabic | №0656 |
| h | №0044 (+ 6 других файлов) |
| H | №0041 (+ 1 других файлов) |
| habitat | №0046 |
| habitats | №0611 (+ 13 других файлов) |
| hadozee | №1244 |
| haggle | №0784 |
| hair | №0042 (+ 15 других файлов) |
| hairColor | №0049 (+ 3 других файлов) |
| hairParts | №0042 |
| hairRibbonBudget | №0042 |
| half | №0049 |
| half_up | №0044 (+ 1 других файлов) |
| halfCover | №0762 |
| halfCoverWhileGrappling | №0762 |
| halfDamageEffect | №0638 (+ 4 других файлов) |
| halfOnSave | №0762 (+ 2 других файлов) |
| halfProficiencySkills | №0762 |
| halfSpeed | №0762 |
| Hallucination | №0063 |
| halt | №0762 |
| haltRestrains | №0762 |
| halveDamage | №0762 |
| halveNecroticReaction | №0624 |
| hand | №0044 (+ 1 других файлов) |
| handL | №0042 |
| handlebar | №0049 |
| handled | №0051 |
| handOfDread | №0699 |
| handoffNeedsSignaling | №0793 |
| handoffPending | №0793 |
| handR | №0042 |
| hands | №0044 (+ 9 других файлов) |
| hardenedSoul | №0624 |
| hardwood | №0650 (+ 4 других файлов) |
| harmonic | №0811 |
| harmonicAttunement | №0762 |
| harvest | №0611 (+ 19 других файлов) |
| harvestMaterial | №1145 |
| has | №0765 |
| has_joints_and_weights | №1088 |
| has_morph_targets | №1088 |
| hasAsi | №0683 (+ 2 других файлов) |
| hasCharacter | №0848 |
| hasDamage | №0794 (+ 1 других файлов) |
| hasPreparation | №0819 |
| hasProfession | №0064 |
| haste | №0061 |
| hasToolProficiency | №0791 |
| hatOfDisguise | №0762 |
| have | №0647 (+ 3 других файлов) |
| haveGold | №0648 |
| haveMaterials | №0648 |
| haymaker | №0699 (+ 1 других файлов) |
| head | №0042 (+ 12 других файлов) |
| HEAD_AXES | №0049 |
| HEAD_FORMS | №0049 |
| HEAD_STYLES | №0049 |
| headAccessories | №0044 |
| headAccessory | №0041 (+ 2 других файлов) |
| headBuilds | №0046 |
| headDefaults | №0049 |
| headers | №0636 (+ 1 других файлов) |
| headFrame | №0044 |
| headless | №1223 (+ 37 других файлов) |
| heal | №0624 (+ 4 других файлов) |
| healAfterNecrotic | №0792 |
| healAfterRest | №0792 |
| healAmount | №1047 |
| healBatch | №0638 |
| healBody | №0852 |
| healCompanion | №0669 |
| healed | №0767 (+ 2 других файлов) |
| healHalfMaxHp | №0762 |
| healHitDie | №0759 |
| healHP | №0762 |
| healing | №0061 (+ 6 других файлов) |
| healingAllowed | №0852 |
| healingAmount | №0801 |
| healingBlocked | №0767 |
| healingBonus | №0762 (+ 1 других файлов) |
| healingBoost | №0796 |
| healingCount | №0801 |
| healingGrantsACBonus | №0762 |
| healingPotion | №0796 |
| healingPotionOnLongRest | №0796 |
| healingSpellsCannotHealSelf | №0792 |
| healMod | №0624 |
| healModifier | №0759 |
| healOnCharnelKill | №0792 |
| healOnKill | №0624 |
| healOrDamage | №0796 |
| healPer5Charnel | №0792 |
| healPool | №0762 |
| healRoll | №1047 |
| healSelf | №0762 |
| healShell | №0767 |
| healthCheck | №0836 |
| healWithHitDice | №0762 |
| heart | №0046 (+ 1 других файлов) |
| hearth | №0050 |
| heartPhylactery | №0762 |
| heavyArmor | №0762 |
| heelstomper | №0762 |
| height | №0046 (+ 50 других файлов) |
| heightened | №0631 |
| heightenedSenses | №0624 |
| hellhound | №0669 |
| hellspeaker | №0762 |
| hellspeakerHoneySweetBlades | №0762 |
| hellspeakerTurncoat | №0762 |
| hemMod | №0624 |
| hemocraftAbilities | №0671 |
| hemocraftDie | №0671 |
| hemocraftRerollOncePerTurn | №0624 |
| Hemorrhage | №0063 |
| hemp | №0656 |
| herb | №0651 (+ 2 других файлов) |
| herbalism | №0655 (+ 1 других файлов) |
| herbalist | №0653 (+ 4 других файлов) |
| herbs | №0808 (+ 1 других файлов) |
| herculean | №0699 (+ 1 других файлов) |
| hero | №1105 |
| heroicCharge | №0762 |
| heroicFocus | №0762 |
| heroicFortitude | №0762 |
| heroicOrderExploit | №0762 |
| heroicRush | №0759 |
| hex | №0851 (+ 2 других файлов) |
| hexArmor | №0762 |
| hexAura | №0762 |
| hexblade | №0624 |
| HEXES | №0762 |
| hexesAtWill | №0759 |
| hexmaster | №0762 |
| hexPhalanx | №0762 |
| hexPlate | №0762 |
| hexSaveDisadvantage | №0762 |
| hexShield | №0762 |
| hi | №0044 |
| hidden | №1258 |
| hide | №0650 (+ 1 других файлов) |
| hideBonusAction | №0762 |
| hideInDimDark | №0762 |
| hideInPlainSight | №0631 |
| Hideous | №0762 |
| high | №0042 (+ 1 других файлов) |
| high_ponytail | №0044 (+ 1 других файлов) |
| highAuthority | №0762 |
| highest | №1091 |
| highestId | №0801 |
| highGround | №0801 |
| highJumpBonusFt | №0762 |
| highlands | №0782 (+ 1 других файлов) |
| highlands_mine | №0861 |
| highlands_quarry | №0861 |
| highlands_ridge | №0861 |
| highlightColor | №0049 (+ 2 других файлов) |
| highlightPercent | №1066 (+ 2 других файлов) |
| hills | №0046 |
| hips | №0046 (+ 5 других файлов) |
| history | №0063 (+ 8 других файлов) |
| historyAdvantage | №0762 |
| historyAdvantageOnSinisterObjectOrPlace | №0624 |
| hit | №0638 (+ 9 других файлов) |
| hitCount | №0638 (+ 3 других файлов) |
| hitDice | №0607 (+ 2 других файлов) |
| hitDiceMax | №1115 |
| hitDiceRemaining | №0061 (+ 2 других файлов) |
| hitDiceRestored | №0786 |
| hitDiceSpent | №0061 (+ 4 других файлов) |
| hitDiceUsed | №0769 (+ 1 других файлов) |
| hitDie | №0607 (+ 53 других файлов) |
| hitInfo | №0056 |
| hitPoints | №0762 (+ 2 других файлов) |
| hitPointsAfter | №0786 (+ 1 других файлов) |
| hits | №0762 |
| hitTest | №0055 (+ 1 других файлов) |
| hitTokenId | №0803 |
| hitZone | №0055 |
| hive | №0046 |
| hm08BBox | №1094 (+ 1 других файлов) |
| hm08Triangles | №1094 (+ 1 других файлов) |
| hm08Vertices | №1094 (+ 3 других файлов) |
| hoard | №0789 |
| hobgoblin | №0655 |
| holdBreathIndefinite | №0762 |
| holdTheLine | №0762 |
| Hollow | №0762 |
| holy | №0061 |
| holyBomb | №0762 |
| holyMagic | №0759 |
| holyNexus | №0631 |
| homebrew | №0643 (+ 1 других файлов) |
| honey | №0656 |
| honorDuel | №0762 |
| hoofColor | №0049 (+ 1 других файлов) |
| hoofSize | №0046 (+ 3 других файлов) |
| hooks | №0060 (+ 19 других файлов) |
| hope | №0759 |
| horde | №0046 (+ 5 других файлов) |
| hordeCount | №0049 |
| horn | №0809 |
| HORN_STYLES | №0049 |
| hornColor | №0049 (+ 1 других файлов) |
| hornRidges | №1074 (+ 1 других файлов) |
| hornSize | №0049 (+ 3 других файлов) |
| hornStyle | №0046 (+ 5 других файлов) |
| hornThickness | №1074 (+ 1 других файлов) |
| horror | №0612 |
| horrorEligible | №0612 |
| horseColor | №0049 (+ 1 других файлов) |
| hosiery | №0045 |
| hosieryDen | №1059 |
| host | №0626 (+ 1 других файлов) |
| hostDestroyed | №0799 |
| hostileAction | №0801 |
| hostileBane | №0762 |
| hostilesWithin5 | №1123 |
| hostIsSeparateStatBlock | №0799 |
| hostSurvived | №0799 |
| houndReactionAttack | №0762 |
| howl | №0624 (+ 1 других файлов) |
| hp | №0769 (+ 67 других файлов) |
| hpBonus | №0762 |
| hpBonusPerLevel | №0807 |
| hpCost | №0786 (+ 1 других файлов) |
| hpCostBySlot | №0786 |
| hpCurrent | №0607 (+ 17 других файлов) |
| hpDamage | №0638 (+ 6 других файлов) |
| hpDamageBySlot | №0786 |
| hpFraction | №0759 |
| hpMax | №0607 (+ 12 других файлов) |
| hpMaxBonus | №0669 |
| hpPer100gp | №0762 |
| hpPercent | №1145 |
| hpTemp | №0607 (+ 6 других файлов) |
| href | №1159 |
| huge | №0799 (+ 1 других файлов) |
| humanoid | №0611 (+ 13 других файлов) |
| humanoidTorch | №0762 |
| hunter | №0669 (+ 2 других файлов) |
| hunterCompanion | №0759 |
| huntersBane | №0624 |
| huntersMark | №0631 (+ 1 других файлов) |
| huntersPrey | №0631 (+ 1 других файлов) |
| hurlThroughHell | №0794 |
| hybrid | №0762 |
| hybridAttackAdvantageVsBranded | №0762 |
| hybridRegeneration | №0762 |
| hybridTransformation | №0624 |
| hybridTransformationMastery | №0624 |
| hyena | №0757 |
| i | №0794 |
| ibex | №0049 |
| icon | №0654 (+ 3 других файлов) |
| iconId | №0771 (+ 1 других файлов) |
| id | №0044 (+ 187 других файлов) |
| idempotent | №0848 |
| identifyEffect | №0762 |
| identityDistortion | №0612 |
| ids | №0041 (+ 2 других файлов) |
| idx | №0056 |
| ifReducedToZero | №0762 |
| ifStolenSpark | №0762 |
| ignitingTouch | №0762 |
| ignoreCover | №0061 (+ 1 других файлов) |
| ignored | №0631 |
| ignoreExtremeTemperature | №0762 |
| ignoreHalfCover | №0762 |
| ignoreHalfDamageOnSave | №0762 |
| ignoreImmunity | №0624 (+ 2 других файлов) |
| ignoreInvisibility | №0801 |
| ignoreOneMutagenSideEffect | №0762 |
| ignoreOpportunityAttacksWhileFlying | №0792 |
| ignorePhysicalResistance | №0801 |
| ignoreRequirements | №1128 |
| ignoreResistance | №0061 (+ 6 других файлов) |
| ignoresImmunity | №0786 |
| ignoreSomaticInDimDark | №0762 |
| ignoresResistance | №0786 (+ 1 других файлов) |
| ignoreVerbalInDimDark | №0762 |
| illuminationAt | №0054 |
| illusion | №0801 |
| illusoryDuplicate | №0762 |
| illustriousAdmiral | №0762 |
| imitation | №0061 (+ 1 других файлов) |
| immortality | №0762 |
| immortalityAnchor | №0792 |
| immune | №0624 (+ 5 других файлов) |
| immuneAging | №0762 |
| immuneAll | №0801 |
| immuneCondition | №0801 |
| immuneConditions | №0801 |
| immuneFrightened | №0631 (+ 1 других файлов) |
| immuneIfBlindedImmune | №0624 |
| immuneNaturalDeath | №0796 |
| immuneSuppression | №0762 |
| immuneSurprise | №0762 |
| immuneToOwnerBombs | №0061 |
| immuneWhenRampageAtLeast | №0762 |
| immunities | №0638 (+ 13 других файлов) |
| immunity | №0624 (+ 3 других файлов) |
| immunity24hOnSave | №0762 |
| immunityBecomesResistance | №0061 (+ 3 других файлов) |
| immunityChosen | №0762 |
| impact | №0061 |
| impactBomb | №0762 |
| impermeable | №0624 |
| Impermeable | №0762 |
| implemented | №0762 (+ 1 других файлов) |
| importJSON | №0839 |
| importLocal | №0636 |
| importText | №0843 (+ 1 других файлов) |
| imposeDisadvantage | №0762 |
| imposingPresence | №0762 |
| improvedAt11 | №0786 |
| improvedBombs | №0660 |
| improvedDivineSmite | №0631 |
| improvedFamiliar | №0762 |
| improvedResolve | №0718 |
| improvedThralls | №0792 |
| inactiveAfterInvoke | №0811 |
| inAttackAction | №1126 |
| incendiary | №0061 |
| incendiaryBomb | №0762 |
| inciteViolence | №0762 |
| incoming | №0801 |
| incomingAC | №0624 (+ 1 других файлов) |
| incomingAttackModifiers | №0854 |
| incomingDamage | №1115 |
| incomingDisadvantage | №0801 |
| incomparableIntellect | №0812 |
| index | №0636 (+ 6 других файлов) |
| indexType | №0056 |
| indices | №0041 (+ 8 других файлов) |
| individualCount | №0049 |
| individuals | №0044 |
| indomitable | №0631 (+ 1 других файлов) |
| indomitableMight | №0631 |
| infernal | №0669 |
| infernalConduit | №0681 |
| infernalConduitDice | №0681 |
| infernalMajesty | №0681 |
| inferno | №0046 |
| influenceSlots | №0615 |
| informant | №0762 |
| infuseItem | №0631 |
| ingredient | №0063 (+ 1 других файлов) |
| INGREDIENT_SOURCES | №0064 |
| ingredientCategory | №0064 |
| ingredientId | №0064 |
| ingredientName | №0064 |
| ingredients | №0062 (+ 2 других файлов) |
| inheritsOrigin | №0049 |
| init | №0643 |
| initCreatedCharacter | №0653 |
| initialize | №0804 |
| initiative | №0611 (+ 20 других файлов) |
| initiativeBonus | №0759 (+ 2 других файлов) |
| initiativeDash | №0762 |
| initiativeDisadvantage | №0624 (+ 1 других файлов) |
| initiativeExploit | №0762 |
| initiativeFerocity | №0669 |
| initiativeOrPerception | №0762 |
| initiativeReagentsTo | №0762 |
| initiativeRoll | №1126 |
| initiativeSave | №0762 |
| initiativeTempHp | №0762 |
| initiativeTracker | №0843 (+ 19 других файлов) |
| ink | №0651 (+ 2 других файлов) |
| innatePsionics | №0697 |
| inner | №0041 |
| innerHeight | №1159 |
| innerHTML | №1127 (+ 1 других файлов) |
| innerWidth | №1159 |
| inscribe | №0762 |
| inscribedCount | №0762 |
| inscribedGearProficiency | №0762 |
| inscribedRunes | №0811 |
| inscription | №0811 |
| inscrutableMind | №0762 |
| insectoid | №0757 |
| insidiousImprecation | №0762 |
| insidiousSpell | №0762 |
| insight | №0755 (+ 1 других файлов) |
| insightAbility | №0762 |
| insightBonus | №0762 |
| insightfulOrder | №0762 |
| insightTotal | №0061 (+ 1 других файлов) |
| inspect | №0804 (+ 1 других файлов) |
| inspector | №0053 |
| inspectSource | №0836 |
| inspirationalSpeech | №0762 |
| inspirationOnKill | №0801 |
| inspiring_leader | №0765 |
| inspiringShout | №0762 |
| inspiringWord | №0722 |
| inspiringWordMaxHeal | №0759 (+ 1 других файлов) |
| inspiringWordUses | №0722 |
| install | №0051 |
| installed | №0061 (+ 1 других файлов) |
| installedAtLevel | №0061 |
| instant | №0061 |
| instantDeath | №0638 (+ 1 других файлов) |
| instinctualSuppression | №0762 |
| instruments | №0762 |
| int | №0607 (+ 50 других файлов) |
| intBonus | №0624 |
| intChecksAdvantage | №0624 (+ 1 других файлов) |
| intChecksDisadvantage | №0624 (+ 1 других файлов) |
| intellectDie | №0812 |
| intelligence | №0769 (+ 12 других файлов) |
| intelligenceOrWisdomOrCharisma | №0060 (+ 1 других файлов) |
| intelligentExplosion | №0061 |
| intelligentExplosions | №0660 |
| intensity | №0053 (+ 2 других файлов) |
| inter | №0815 |
| interdict | №0854 |
| interdictBoons | №0681 |
| interdiction | №0681 |
| interpolation | №0051 |
| interrupt | №0718 |
| interrupted | №0638 (+ 1 других файлов) |
| interruptOneAttackOrAbility | №0762 |
| interruptUses | №0718 |
| intimidatingCommand | №0762 |
| intimidation | №0755 (+ 1 других файлов) |
| intimidationAdvantage | №0762 |
| intimidationPersuasionBonus | №0762 |
| intIncrease | №0762 |
| intMaxBonus | №0624 |
| intMaxIncrease | №0762 |
| intToAC | №0792 |
| intuition | №0811 |
| intWisChaSavesDisadvantage | №0624 |
| invadeHost | №0799 |
| inventory | №0769 (+ 16 других файлов) |
| inverseBindMatrices | №0051 (+ 1 других файлов) |
| investigation | №0755 (+ 1 других файлов) |
| investigationExpertise | №0759 |
| investigator | №0812 |
| invigoratingOrders | №0762 |
| Invisibility | №0063 |
| invisibilityAfterCharnel | №0792 |
| invisible | №0669 (+ 2 других файлов) |
| invocation | №0811 |
| invocationSlots | №0762 |
| invoke | №0644 (+ 1 других файлов) |
| invokeCount | №0762 |
| invokeDebuff | №0762 |
| invokeHell | №0681 |
| invoking | №0811 |
| iokharic | №0762 (+ 1 других файлов) |
| iridescentStrike | №0827 |
| iron | №0651 (+ 2 других файлов) |
| Ironbound | №0778 |
| ironChin | №0699 |
| ironCommand | №0762 |
| ironIngot | №0656 |
| isActive | №0765 |
| isAlly | №1047 |
| isAssassin | №0631 |
| isBomb | №0061 (+ 3 других файлов) |
| isDead | №0629 |
| isEnabled | №0644 (+ 1 других файлов) |
| isExtra | №0629 (+ 9 других файлов) |
| isExtraClass | №0629 |
| isIndependentCreature | №0822 |
| isLarval | №0044 |
| isObject | №1046 |
| isRaceClassHybrid | №0632 (+ 6 других файлов) |
| isShirt | №0045 |
| isSkirtDress | №0045 |
| isSolid | №0054 |
| issues | №0655 |
| isSwarm | №0044 |
| item | №0045 (+ 16 других файлов) |
| itemId | №0796 |
| items | №0045 (+ 6 других файлов) |
| itemValue | №0650 (+ 1 других файлов) |
| itsAlive | №0762 |
| ix | №0044 |
| j | №0041 |
| jacket | №0045 |
| jackOfAllTrades | №0631 |
| jade | №0815 |
| jar | №0050 |
| jaw | №0044 |
| jawProjection | №0049 |
| jawWidth | №0046 (+ 2 других файлов) |
| jealousy | №0060 |
| jeweler | №0651 (+ 5 других файлов) |
| jinx | №1125 |
| jinxBonusAction | №0762 |
| jinxExtraDamage | №0762 |
| jinxOptions | №0762 |
| joinRoom | №1173 |
| joints | №0041 (+ 4 других файлов) |
| jotun | №0762 (+ 1 других файлов) |
| jotunbrudJuggernaut | №0762 |
| jotunStance | №0762 |
| journal | №0835 |
| json | №0636 (+ 5 других файлов) |
| jumpDistanceMultiplier | №0759 |
| jumpFt | №0762 |
| jumpMultiplier | №0762 |
| jungle | №0046 |
| junk | №0776 (+ 31 других файлов) |
| justDroppedToZero | №1120 |
| K | №1093 |
| keenAwareness | №0812 |
| keeperOfOrder | №0762 |
| key | №0054 (+ 12 других файлов) |
| KEY | №0054 |
| ki | №1113 (+ 2 других файлов) |
| killInspiration | №0801 |
| kiln | №0653 |
| kind | №0044 (+ 34 других файлов) |
| Kind | №1101 |
| kingdom | №0046 |
| kiPoints | №0686 |
| kitchen | №0050 |
| knighthood | №0762 |
| knockdown | №0759 |
| knockout | №0759 |
| knockoutIfSelfDamageReachesZero | №0762 |
| knockoutRoll | №0762 |
| knockProne | №0762 |
| knockProneSmaller | №0762 |
| knot | №0045 (+ 3 других файлов) |
| known | №0769 (+ 2 других файлов) |
| knownAt | №0681 |
| knownAtLevel | №0060 |
| knownCantrips | №0061 |
| knownClasses | №0819 |
| knownCount | №0762 |
| knownMetamorphoses | №0762 |
| knownReactions | №0063 |
| knowYourEnemy | №0762 |
| kobold | №0044 (+ 1 других файлов) |
| krd | №0778 |
| krynn | №0614 |
| label | №0815 (+ 22 других файлов) |
| laboratory | №0046 |
| labyrinth | №0046 |
| lace | №0045 |
| lairActions | №1208 |
| lairActionState | №0794 |
| lamp | №0050 |
| lampblack | №0656 |
| landscape | №0870 |
| landsStrideRanger | №0631 |
| language | №0762 (+ 1 других файлов) |
| languageChoice | №0762 |
| languages | №0607 (+ 4 других файлов) |
| lantern | №0050 |
| large | №0050 (+ 2 других файлов) |
| larva | №0799 |
| larvaGirth | №0049 (+ 2 других файлов) |
| larvaIsSeparateStatBlock | №0799 |
| larval | №0044 |
| larvaLength | №0049 (+ 2 других файлов) |
| larvalParts | №0044 |
| larvaTendrilSize | №0049 (+ 2 других файлов) |
| larvaToothSize | №0049 (+ 2 других файлов) |
| last | №0044 (+ 1 других файлов) |
| lastAttemptRound | №0788 |
| lastGatheredAt | №0861 |
| lastLifesMemories | №0762 |
| lastRest | №1195 |
| lastRestId | №0804 |
| lastRestock | №0782 (+ 1 других файлов) |
| lastRestoredKey | №0848 |
| lastRoll | №0788 |
| lastRound | №0788 |
| lastRun | №0837 |
| lastTrump | №0804 |
| lastTrumpAvailable | №0804 |
| lastTrumpUsed | №0804 |
| lastX | №0609 (+ 1 других файлов) |
| lastY | №0609 (+ 1 других файлов) |
| latency | №0835 |
| latitude | №0044 |
| laughingGas | №0061 |
| laughingGasBomb | №0762 |
| launch | №0844 |
| lawShield | №0759 |
| lawsShield | №0762 |
| layer | №0045 |
| layered | №0044 (+ 1 других файлов) |
| layers | №0044 |
| layOnHands | №0631 (+ 1 других файлов) |
| leadershipAbility | №0722 (+ 1 других файлов) |
| leadershipBased | №0762 |
| leadershipChoices | №0722 |
| leadershipForCheck | №0762 |
| leadershipForChecks | №0762 |
| leadershipForDeception | №0762 |
| leadershipForHistoryInvestigation | №0762 |
| leadershipForIntimidation | №0762 |
| leadershipForReligion | №0762 |
| leadershipModifier | №0722 |
| leadershipStyles | №0722 |
| leadTheCharge | №0762 |
| leaks | №1238 (+ 2 других файлов) |
| learnAnyCastableSpell | №0762 |
| learnBeastShape | №0762 |
| learnCantrip | №0762 |
| learned | №0861 |
| learnedAt | №0653 |
| learnFromUI | №0653 |
| learning | №0816 |
| learnLanguage | №0762 |
| learnMartialWeapon | №0762 |
| learnProfession | №0653 |
| learnSkill | №0762 |
| learnSpell | №0762 |
| learnTargetStatistic | №0762 |
| learnTool | №0762 |
| leather | №0045 (+ 7 других файлов) |
| leatherSole | №0655 |
| leatherStrapV49 | №0650 |
| leatherwork | №0651 (+ 1 других файлов) |
| leatherworker | №0652 (+ 4 других файлов) |
| leavingReach | №0802 (+ 2 других файлов) |
| lectern | №0050 |
| left | №0046 (+ 2 других файлов) |
| leg | №0044 |
| legacy_expansions | №0611 |
| legendary | №0776 (+ 6 других файлов) |
| legendaryActionCurrent | №0794 |
| legendaryActions | №0788 (+ 1 других файлов) |
| legendaryResistance | №0718 |
| legendaryResistanceCurrent | №0794 |
| legendaryResistances | №0788 (+ 1 других файлов) |
| legendaryTandem | №0762 |
| legLength | №0046 (+ 1 других файлов) |
| legs | №0046 (+ 2 других файлов) |
| length | №0042 (+ 18 других файлов) |
| level | №0763 (+ 79 других файлов) |
| level10 | №0060 |
| level18 | №0060 |
| level2 | №0060 |
| level20 | №0811 |
| level6 | №0060 |
| level9 | №0811 |
| levelData | №0683 |
| leveledUp | №0653 |
| levelName | №0653 |
| levels | №0060 (+ 46 других файлов) |
| LEVELS | №0653 |
| levelsRestored | №0631 |
| library | №0054 (+ 2 других файлов) |
| license | №0054 (+ 11 других файлов) |
| lichdom | №0792 |
| lieDetectionAutoFail | №0762 |
| lighting | №0054 |
| lightIntensity | №1101 |
| lightning | №0061 (+ 3 других файлов) |
| lightningArc | №0792 |
| lightningBomb | №0762 |
| lightRadius | №1101 |
| limb | №0044 |
| limbH | №0044 |
| limbIndices | №0044 |
| limbParts | №0044 |
| limbProfile | №0044 (+ 4 других файлов) |
| limbRecords | №0044 |
| limbState | №0044 |
| limestone | №0656 |
| limit | №0819 |
| limitations | №1218 (+ 1 других файлов) |
| line | №0834 |
| linen | №0045 |
| lineOfSight | №1182 (+ 2 других файлов) |
| lingerie | №0045 |
| link | №0759 |
| linked | №0759 |
| linkedClass | №0641 (+ 1 других файлов) |
| linkedHowl | №0624 |
| lipColor | №0049 (+ 1 других файлов) |
| lipOpacity | №1232 |
| lipVolume | №0049 |
| list | №0043 (+ 6 других файлов) |
| listAllClasses | №0644 |
| listByFamily | №0611 (+ 12 других файлов) |
| listBySource | №0611 (+ 12 других файлов) |
| listClasses | №0644 |
| listEquipment | №0049 |
| listPresets | №0049 |
| listRaces | №0049 |
| listSkins | №0049 |
| listSources | №0064 |
| listSubclasses | №0644 |
| liveBodyAfterReanimation | №0852 |
| liveEpoch | №0848 |
| liveRevision | №0848 |
| living | №0766 |
| livingStatue | №0762 |
| lizard | №0044 |
| lizardfolk | №0655 |
| lo | №0044 |
| load | №0052 (+ 4 других файлов) |
| loaded | №0056 |
| loadFailed | №1235 |
| loading | №0056 (+ 1 других файлов) |
| loadSkin | №0051 |
| local | №0041 (+ 1 других файлов) |
| localBackups | №0636 |
| localId | №0636 |
| localStorage | №1048 (+ 31 других файлов) |
| location | №1087 (+ 3 других файлов) |
| locked | №0057 |
| lockedAt1 | №0652 |
| locks | №0653 |
| log | №0831 |
| login | №0636 |
| logout | №0636 |
| long | №0044 (+ 1 других файлов) |
| longevity | №0061 (+ 1 других файлов) |
| longJumpBonusFt | №0762 |
| longRest | №0061 (+ 1 других файлов) |
| longRestAllHitDice | №0762 |
| longRestClears | №0061 |
| longRestEffects | №0801 |
| longRestExhaustionRecovery | №0762 |
| longRestHealingAllowed | №0852 |
| longRestLimit | №0624 |
| longRestOnRevive | №0762 |
| longRestRedistribute | №0762 |
| longRestTempHp | №0762 |
| longRestUses | №0061 |
| loom | №0050 |
| loot | №0053 (+ 19 других файлов) |
| lootId | №0057 |
| lootModel | №0789 |
| lootModels | №0789 |
| loreRecall | №0762 |
| los | №0639 (+ 1 других файлов) |
| loss | №0835 |
| lossHp | №0624 |
| lost | №0649 |
| Loveless | №0762 |
| low | №0042 |
| lowBlow | №0762 |
| lowest | №0041 (+ 1 других файлов) |
| lowestId | №0801 |
| loxodon | №1252 |
| lucidDreaming | №0762 |
| lucidWaking | №0762 |
| lucky | №0765 |
| lunge | №0762 |
| luxury | №0784 (+ 1 других файлов) |
| lycanthropy | №0060 |
| lyre | №0049 |
| M | №0801 |
| macroConfigSha256 | №1268 |
| macrotargets | №1091 |
| mage_slayer | №0765 |
| mageArmor | №0796 |
| magFilter | №0046 (+ 1 других файлов) |
| magic | №0827 (+ 1 других файлов) |
| Magic | №0063 |
| magic_initiate | №0765 |
| magicAdvantage | №0792 |
| magical | №0762 |
| magical_beast | №0611 (+ 10 других файлов) |
| magicalAttack | №0624 (+ 4 других файлов) |
| magicalDarkness | №0762 |
| magicalFamiliarAttacks | №0762 |
| magicalSecrets | №0631 |
| magicalTinkering | №0631 |
| magicByAffinity | №0827 |
| magicInteractionSafe | №0762 |
| magicItemAdept | №0631 |
| magicShared | №0827 |
| maintainable | №0762 |
| maintainAction | №0762 |
| majestySplash | №0762 |
| major | №0804 |
| major_00 | №0804 |
| major_01 | №0804 |
| major_02 | №0804 |
| major_03 | №0804 |
| major_04 | №0804 |
| major_05 | №0804 |
| major_06 | №0804 |
| major_07 | №0804 |
| major_08 | №0804 |
| major_09 | №0804 |
| major_10 | №0804 |
| major_11 | №0804 |
| major_12 | №0804 |
| major_13 | №0804 |
| major_14 | №0804 |
| major_15 | №0804 |
| major_16 | №0804 |
| major_17 | №0804 |
| major_18 | №0804 |
| major_19 | №0804 |
| major_20 | №0804 |
| major_21 | №0804 |
| majorCost | №0804 |
| majorCurrent | №0804 |
| majorMax | №0804 |
| majorSpent | №0804 |
| makeWeaponAttack | №0762 |
| male | №0042 (+ 1 других файлов) |
| maleProfile | №0041 |
| malformed | №1097 |
| malformedTargetLines | №1095 (+ 1 других файлов) |
| manifest | №0825 |
| manifestations | №0778 |
| manifested | №0796 |
| manifestUrl | №0825 (+ 2 других файлов) |
| map | №0844 |
| mapId | №0054 |
| mappedDisplacementMax | №1096 |
| mappedDisplacementMean | №1096 |
| mappedDisplacementMedian | №1096 |
| mappedDisplacementP95 | №1096 |
| mappedMaxDisplacement | №1095 |
| mappedMeanDisplacement | №1095 |
| mappedMedianDisplacement | №1095 |
| mappedP95Displacement | №1095 |
| mappedRmsDisplacement | №1095 |
| mappedTargetEntries | №1096 |
| mappedVertices | №1085 |
| mapping | №1220 |
| maps | №0653 |
| marble | №0655 |
| marchUntoDestiny | №0786 |
| margin | №1029 |
| mariner | №0762 |
| mark | №0762 |
| marked | №0624 (+ 2 других файлов) |
| markedForDeath | №0762 |
| marketPriceGp | №0782 (+ 1 других файлов) |
| marketReport | №0782 |
| marketSource | №0782 (+ 1 других файлов) |
| marketValue | №0647 (+ 1 других файлов) |
| markPrey | №0762 |
| maroon | №0851 |
| marsh_moss | №0861 |
| marsh_pool | №0861 |
| marsh_reeds | №0861 |
| marshes | №0861 |
| martial_adept | №0765 |
| martialBane | №0762 |
| martialFocus | №0762 |
| masks | №0044 |
| mason | №0653 (+ 3 других файлов) |
| master | №0653 |
| masterOfHell | №0681 |
| masterSpecialization | №0653 |
| masterTactician | №0762 |
| masterwork | №0648 (+ 1 других файлов) |
| masterworkBonus | №0652 |
| mastery | №0063 (+ 2 других файлов) |
| masteryExpiry | №0762 |
| masterySpent | №0762 |
| MAT2 | №0051 (+ 2 других файлов) |
| MAT3 | №0051 (+ 2 других файлов) |
| MAT4 | №0051 (+ 4 других файлов) |
| matched | №0785 |
| material | №0041 (+ 20 других файлов) |
| materialBridge | №0789 |
| materialCost | №0061 |
| materialCostGP | №0796 |
| materialCostPerLevelGP | №0796 |
| materialCount | №0648 |
| materialId | №0647 (+ 11 других файлов) |
| materialKind | №0045 |
| materialOnly | №0776 |
| materials | №0045 (+ 46 других файлов) |
| MATERIALS | №1078 (+ 13 других файлов) |
| materialsCost | №0061 |
| materialsPaid | №1047 |
| materialsUsed | №0648 |
| Math | №1087 (+ 2 других файлов) |
| maturity | №0042 (+ 1 других файлов) |
| max | №0044 (+ 51 других файлов) |
| max_mm | №1060 |
| max_morph_targets | №1088 |
| maxAbility | №0061 (+ 1 других файлов) |
| maxBloodLevels | №0796 |
| maxBuffer | №1264 |
| maxCR | №0762 (+ 1 других файлов) |
| maxDice | №0762 |
| maxDisplacementMeters | №1090 |
| maxDistanceFt | №0762 |
| maxExtraShredPsi | №0762 |
| maxHeal | №0762 |
| maxHitDice | №0762 |
| maxHitPoints | №1179 |
| maxHp | №0061 (+ 57 других файлов) |
| maxHP | №0767 (+ 3 других файлов) |
| maxHpReduction | №0762 |
| maxHpReductionOnNecrotic | №0762 |
| maximize | №0631 (+ 3 других файлов) |
| maximized | №0638 (+ 1 других файлов) |
| maximizeDamageDice | №0631 (+ 1 других файлов) |
| maximizeElementalSpell | №0762 |
| maximizeNextRoll | №0801 |
| maximum | №0061 |
| maxIntelligence | №0812 |
| maxLevels | №0631 (+ 1 других файлов) |
| maxObjects | №0762 |
| maxOutside | №1220 |
| maxPoints | №0607 (+ 1 других файлов) |
| maxPotions | №0061 |
| maxScore | №0762 |
| maxSizeFt | №0762 |
| maxSlots | №0827 |
| maxSpellLevel | №0786 |
| maxSpellLevelByLevel | №0786 |
| maxSpend | №0792 |
| maxSpendTempHp | №0762 |
| maxStages | №0061 |
| maxStrands | №0042 |
| maxStrDexCon | №0762 |
| maxTargets | №0762 |
| maxUses | №0637 |
| maxWeightLb | №0762 |
| measureStartId | №0609 |
| mechanics | №0660 (+ 16 других файлов) |
| mechanicsPending | №0854 (+ 1 других файлов) |
| mechanicsSource | №0684 (+ 3 других файлов) |
| mechanicsStatus | №0671 |
| medicine | №0653 (+ 3 других файлов) |
| medium | №0042 (+ 2 других файлов) |
| mediumArmorWisInsteadOfDex | №0762 |
| meleeAttack | №0762 (+ 1 других файлов) |
| meleeDamage | №0796 |
| meleeExtraDamage | №0762 |
| meleeOrThrown | №0639 (+ 1 других файлов) |
| meleeSpellAttack | №0762 |
| meleeWeaponAttack | №0762 |
| members | №0757 |
| menacingShout | №0762 |
| mentalAny | №0855 |
| mentalConstruct | №0762 |
| mentalDefense | №0759 |
| mentalSavesDisadvantage | №0762 |
| mentalSource | №0799 |
| mentalStats | №0767 |
| mentalStatsPersist | №0767 |
| mentor | №0722 (+ 2 других файлов) |
| mercenary | №0762 |
| merciless | №0762 |
| mercy | №0786 |
| mesh | №1086 (+ 1 других файлов) |
| meshes | №0046 (+ 5 других файлов) |
| meshWeights | №0052 (+ 1 других файлов) |
| message | №0060 (+ 33 других файлов) |
| messy | №0044 |
| messy_crop | №0044 (+ 1 других файлов) |
| meta | №0834 |
| META_COST | №0631 |
| META_NAMES | №0631 |
| metadata | №0061 (+ 11 других файлов) |
| metal | №0045 (+ 1 других файлов) |
| metalworker | №0653 |
| metamagic | №0631 |
| metamagic_adept | №0765 |
| metamorphosesKnown | №0631 |
| metamorphosesMax | №0631 |
| metamorphosis | №0060 |
| method | №0636 (+ 3 других файлов) |
| metrics | №0046 |
| mettle | №0638 (+ 2 других файлов) |
| mid | №0846 |
| mimic | №0669 |
| min | №0044 (+ 17 других файлов) |
| minAppVersion | №0825 (+ 1 других файлов) |
| minAt11 | №0762 |
| Mind | №0063 |
| mindLeech | №0762 |
| mindRead | №0759 |
| mindReadingImmunity | №0762 |
| mindsightFt | №0762 |
| mindsightTrackingHours | №0762 |
| mindStats | №0799 |
| mindThrust | №0762 |
| miner | №0784 (+ 1 других файлов) |
| mineral | №0809 |
| minFilter | №0046 (+ 1 других файлов) |
| minHeight | №0869 |
| minimal | №0049 |
| minimum | №0061 (+ 3 других файлов) |
| minimumAC | №0762 |
| minimumD20 | №0762 |
| minIndex | №1097 |
| mining | №0808 (+ 1 других файлов) |
| minion | №0762 |
| minionResistance | №0762 |
| minionRollBonus | №0762 |
| minionTypes | №0762 |
| minLevel | №0655 |
| minor | №0804 |
| minotaur | №1252 |
| minPsi | №0762 |
| minStr | №0067 |
| minusD4AllD20 | №0762 |
| minutesSinceDeath | №1047 |
| minWidth | №0869 |
| miracle | №0796 |
| miraculousHealing | №0786 |
| miserableCompany | №0762 |
| misfortune | №0060 (+ 1 других файлов) |
| miss | №0762 |
| missed | №0818 |
| missedUnarmedExtraAttack | №0762 |
| missing | №0647 (+ 5 других файлов) |
| missingTools | №0651 (+ 2 других файлов) |
| missRecoveryMinutes | №0762 |
| missRefund | №0762 |
| missRefunds | №0792 |
| mistAffinity | №0612 |
| mistStep | №0796 |
| mithral | №0651 |
| mitosis | №0822 |
| mix | №0064 |
| mixBonus | №1127 |
| mixedPotions | №0762 |
| mixPotions | №0061 |
| mobility | №0624 |
| Mobility | №0762 |
| mod | №0810 (+ 1 других файлов) |
| mode | №0042 (+ 14 других файлов) |
| model | №0053 (+ 2 других файлов) |
| modelFamily | №0049 |
| modelLoc | №0056 |
| modes | №0811 |
| modifier | №0784 (+ 5 других файлов) |
| modifierAtLevel20 | №0812 |
| modifierIds | №0657 |
| modifiers | №0762 (+ 1 других файлов) |
| modifyStats | №0801 |
| modules | №0836 |
| mohawk | №0044 (+ 1 других файлов) |
| monastery | №0050 |
| monster | №0789 (+ 3 других файлов) |
| monster_acid_slime | №0809 |
| monster_acolyte_cloth | №0809 |
| monster_air_essence | №0809 |
| monster_air_vortex | №0809 |
| monster_ankheg_acid_gland | №0809 |
| monster_ankheg_shell | №0809 |
| monster_bandit_captain_leather_armor | №0809 |
| monster_bandit_hide | №0809 |
| monster_basilisk_eye | №0809 |
| monster_basilisk_gallstone | №0809 |
| monster_basilisk_scale | №0789 |
| monster_bear_fat | №0809 |
| monster_bear_hide | №0809 |
| monster_blink_dog_pelt | №0809 |
| monster_blink_dog_phase_gland | №0809 |
| monster_boar_hide | №0809 |
| monster_boar_tusk | №0809 |
| monster_bugbear_fang | №0809 |
| monster_bugbear_hide | №0809 |
| monster_carrion_chitin | №0809 |
| monster_carrion_crawler_paralytic | №0809 |
| monster_constrictor_hide | №0809 |
| monster_constrictor_venom | №0809 |
| monster_crocodile_hide | №0809 |
| monster_crocodile_teeth | №0809 |
| monster_cultist_cloth | №0809 |
| monster_deer_antler | №0809 |
| monster_deer_hide | №0809 |
| monster_direwolf_fang | №0809 |
| monster_direwolf_hide | №0789 (+ 1 других файлов) |
| monster_displacer_hide | №0809 |
| monster_displacer_tentacle | №0809 |
| monster_dragon_blood | №0789 |
| monster_dragon_bones | №0789 (+ 1 других файлов) |
| monster_dragon_heart | №0809 |
| monster_dragon_scales | №0789 (+ 1 других файлов) |
| monster_earth_core | №0809 |
| monster_earth_essence | №0809 |
| monster_ectoplasm | №0809 |
| monster_ethereal_shard | №0809 |
| monster_fire_ash | №0809 |
| monster_fire_essence | №0809 |
| monster_frog_gland | №0809 |
| monster_frog_skin | №0809 |
| monster_ghost_thread | №0809 |
| monster_ghoul_claw | №0809 |
| monster_ghoul_tissue | №0809 |
| monster_giant_eagle_claw | №0809 |
| monster_giant_eagle_feather | №0809 |
| monster_giant_owl_eye | №0809 |
| monster_giant_owl_feather | №0809 |
| monster_gnoll_hide | №0809 |
| monster_gnoll_tooth | №0809 |
| monster_goblin_hide | №0809 |
| monster_harpy_vocal_membrane | №0809 |
| monster_hyena_fangs | №0809 |
| monster_hyena_hide | №0809 |
| monster_kobold_horn | №0809 |
| monster_kobold_scalehide | №0809 |
| monster_manticore_hide | №0809 |
| monster_manticore_meat | №0809 |
| monster_manticore_spines | №0789 |
| monster_meat | №0809 |
| monster_mimic_skin | №0809 |
| monster_mimic_slime | №0809 |
| monster_orc_hide | №0809 |
| monster_owlbear_claw | №0809 |
| monster_owlbear_feathers | №0789 |
| monster_owlbear_hide | №0789 (+ 1 других файлов) |
| monster_rat_fangs | №0809 |
| monster_rat_hide | №0809 |
| monster_rust_chitin | №0809 |
| monster_rust_gland | №0809 |
| monster_shadow_clot | №0809 |
| monster_slime_membrane | №0809 |
| monster_spectral_dust | №0809 |
| monster_spider_chitin | №0789 |
| monster_spider_silk | №0789 (+ 1 других файлов) |
| monster_spider_venom | №0809 |
| monster_troll_blood | №0789 (+ 1 других файлов) |
| monster_troll_claw | №0809 |
| monster_troll_hide | №0789 (+ 1 других файлов) |
| monster_veteran_leather_armor | №0809 |
| monster_water_core | №0809 |
| monster_water_essence | №0809 |
| monster_wight_bone | №0809 |
| monster_wight_essence | №0809 |
| monster_wolf_hide | №0789 (+ 1 других файлов) |
| monsterCount | №0788 |
| monsterCR | №0791 |
| monsterId | №0766 (+ 5 других файлов) |
| monsterName | №0794 |
| monsterparts | №0784 (+ 1 других файлов) |
| MONSTERS | №0638 |
| monstrosity | №0611 (+ 13 других файлов) |
| monstrousGrafts | №0061 |
| monstrousMenagerie | №0762 |
| monstrousMinion | №0759 (+ 1 других файлов) |
| moonEffects | №0796 |
| morph_names | №1088 |
| morph_primitives | №1088 |
| morphAccessor | №1085 |
| morphBufferView | №1085 |
| morphChannels | №0051 (+ 1 других файлов) |
| morphNames | №0052 (+ 2 других файлов) |
| morphs | №0049 (+ 3 других файлов) |
| morphSet | №0049 |
| morphTargets | №0052 (+ 1 других файлов) |
| morphWeights | №0049 |
| mount | №0792 |
| mountaineer | №0762 |
| mountainsEndurance | №0762 |
| mountCantripSwap | №0792 |
| mounted | №0796 |
| mountRollBonus | №0762 |
| mountSpeed | №0792 |
| moustache | №0046 (+ 3 других файлов) |
| mouth | №0044 |
| mouthWidth | №0049 (+ 1 других файлов) |
| moveAlliesHalfSpeed | №0762 |
| moveAndAttack | №0762 |
| moveCostFt | №0061 |
| moved | №0846 |
| movedFt | №0801 |
| moveFt | №0669 (+ 4 других файлов) |
| moveHalfSpeed | №0624 |
| movement | №0061 (+ 19 других файлов) |
| movementUsed | №0061 (+ 14 других файлов) |
| movementWithoutOpportunityAttacks | №0796 |
| moveStraightFt | №0762 |
| moveThralls | №0792 |
| moveThroughCreatures | №0762 |
| moveThroughProneCreatures | №0762 |
| moveTo | №0794 (+ 1 других файлов) |
| moveToward | №0639 |
| moving | №0044 |
| moxie | №0699 (+ 2 других файлов) |
| moxieFraction | №0759 |
| moxieFueledFists | №0699 |
| moxieOnFail | №0762 |
| moxieRefunded | №0762 |
| moxieRestored | №0762 |
| moxieSpent | №0762 |
| msg | №0832 (+ 1 других файлов) |
| muddledMind | №0624 |
| mufflingImprecation | №0762 |
| mult | №0650 (+ 1 других файлов) |
| multiAttackAction | №0638 (+ 1 других файлов) |
| multiclass | №0061 (+ 7 других файлов) |
| multiclassAllowed | №0629 (+ 7 других файлов) |
| multiclassProficiencies | №0660 (+ 6 других файлов) |
| multiclassRequirement | №0060 (+ 18 других файлов) |
| multiplier | №0788 |
| mummification | №0762 |
| mummyLord | №0762 |
| mummyRot | №0762 |
| muscle | №0046 (+ 5 других файлов) |
| mutagen | №0624 (+ 2 других файлов) |
| mutagenAbility | №0061 |
| mutagencraft | №0624 |
| mutagenMaximum | №0061 |
| mutagenNoDownside | №0061 |
| mutagens | №0624 (+ 1 других файлов) |
| mutations | №0799 (+ 2 других файлов) |
| mutationSlots | №0799 (+ 1 других файлов) |
| muzzle | №0044 |
| muzzleHeight | №0049 (+ 7 других файлов) |
| muzzleLength | №0049 (+ 9 других файлов) |
| muzzleWidth | №0049 (+ 7 других файлов) |
| myconid | №1244 |
| mysteries | №0690 (+ 1 других файлов) |
| mystery | №0796 |
| mysticArcanum | №0631 |
| mysticEmpowerment | №0816 |
| mysticFrenzy | №0624 |
| mythicForms | №0816 |
| mythicVoice | №0762 |
| n | №0041 (+ 4 других файлов) |
| name | №0043 (+ 227 других файлов) |
| NAME | №0649 |
| nameRu | №0607 (+ 8 других файлов) |
| nameRus | №1026 |
| names | №1125 (+ 1 других файлов) |
| narrow | №0044 (+ 2 других файлов) |
| native | №0793 (+ 1 других файлов) |
| nativeHeadH | №0044 |
| natural | №0049 |
| natural20 | №0794 (+ 1 других файлов) |
| naturalArmor | №0816 |
| naturalAttacks | №0799 (+ 1 других файлов) |
| naturalExplorer | №0631 |
| naturalist | №0812 |
| naturalRecovery | №0799 |
| naturalWeapons | №0816 |
| nature | №0755 (+ 2 других файлов) |
| Nausea | №0063 |
| navigation | №0759 |
| navigator | №1077 (+ 9 других файлов) |
| navigatorCrew | №0762 |
| navy | №0851 |
| nearAllyId | №0801 (+ 1 других файлов) |
| neck | №0044 (+ 2 других файлов) |
| neckDepth | №1057 (+ 2 других файлов) |
| neckline | №1057 (+ 1 других файлов) |
| necrodancer | №0792 |
| necromancyDamageBonusPerCharnel | №0792 |
| necromancyUnleashed | №0792 |
| necromanticSpurs | №0762 |
| necromanticSustainment | №0762 |
| necrotic | №0759 (+ 1 других файлов) |
| Necrotic | №0063 |
| necroticAffinity | №0796 |
| necroticBone | №0809 |
| necroticDamage | №0759 (+ 2 других файлов) |
| necroticEssence | №0809 |
| necroticIgnoreImmunity | №0792 |
| necroticIgnoreResistance | №0792 |
| necroticReagent | №0809 |
| need | №0655 |
| needsChoice | №0061 |
| needsConfirmation | №0061 |
| needsDonor | №0061 |
| needsMaterials | №0061 |
| needsRoll | №0061 |
| needsSubclassChoice | №0683 |
| needsTarget | №0061 |
| needsTime | №0061 |
| negatingAnathema | №0762 |
| negative | №1048 (+ 3 других файлов) |
| negotiated | №0784 |
| negotiatedPrice | №0784 |
| negotiatedQuote | №0784 |
| negotiationModifier | №0784 |
| network | №0831 (+ 2 других файлов) |
| neutral | №0048 |
| newDraft | №0844 |
| newJinxOptions | №0762 |
| newTraderIds | №0783 |
| newValue | №0794 |
| next | №0041 (+ 2 других файлов) |
| nextAttackAdvantage | №0624 (+ 1 других файлов) |
| nextAttackBonus | №0762 |
| nextAttackExtraDice | №0061 |
| nextBombOnly | №0061 |
| nextConcentrationSaveDisadvantage | №0624 |
| nextDamageDice | №0762 |
| nextHitCrit | №0762 |
| nextRiteHitExtraDie | №0624 |
| nextRollMaximum | №0801 |
| nextSaveAdvantage | №0762 |
| nextSpellOrWeaponDamageDisadvantage | №0762 |
| nextTick | №0061 (+ 1 других файлов) |
| nextWisSaveDisadvantage | №0624 |
| night | №0056 |
| nighteye | №0624 |
| Nighteye | №0762 |
| nightforest | №0046 |
| nightmareMount | №0792 |
| nightTerrors | №0762 |
| nightTerrorsWhileAsleep | №0762 |
| noAction | №0762 |
| noActions | №0801 |
| noAging | №0762 |
| noAttacks | №0801 (+ 1 других файлов) |
| Noble | №0778 |
| noConcentrationCheck | №0786 |
| noCoverOrInvisibility | №0624 |
| noDamage | №0061 |
| noDash | №0762 |
| node | №0051 (+ 3 других файлов) |
| nodeId | №0861 |
| nodeIntegration | №0869 |
| nodes | №0861 (+ 7 других файлов) |
| noDisadvantage | №0762 |
| noDisengage | №0801 |
| noFallDamage | №0762 |
| noFoodOrDrink | №0762 |
| noForcedMovement | №0801 (+ 1 других файлов) |
| noFreeWill | №0852 |
| noHealing | №0762 |
| noHealingFromOwnSpells | №0786 |
| noHealingUntilStartNextTurn | №0762 |
| noHelp | №0801 |
| noHide | №0045 (+ 1 других файлов) |
| noMainAction | №0801 (+ 1 других файлов) |
| noMaintainAction | №0762 |
| noMovement | №0801 |
| nonAttackAccursedDamageBonus | №0762 |
| nonCombat | №0640 |
| none | №0049 (+ 1 других файлов) |
| nonlethal | №0061 |
| nonmagicalDamageReduction | №0762 |
| nonManifold | №1062 |
| nonZeroMappedGlbVertexPct | №1095 |
| nonZeroMappedGlbVertices | №1095 |
| nonZeroPct | №1085 |
| nonZeroTargetEntries | №1096 |
| nonZeroVertices | №1085 |
| noOldAgeDeath | №0796 |
| noOpportunity | №0759 |
| noOpportunityAttacks | №0061 (+ 3 других файлов) |
| noReaction | №0762 (+ 1 других файлов) |
| noReactions | №0624 (+ 4 других файлов) |
| noReduction | №0762 |
| noRest | №0762 |
| normal | №0810 (+ 1 других файлов) |
| normalForm | №0816 |
| normalize | №0042 (+ 6 других файлов) |
| normalizeCharacter | №0767 (+ 3 других файлов) |
| normalizeClassName | №0819 |
| normalizeConditionName | №0810 (+ 2 других файлов) |
| normalizeHead | №0049 |
| normalPaceStealth | №0762 |
| normals | №0044 (+ 2 других файлов) |
| noseLength | №0049 |
| noseWidth | №0049 (+ 1 других файлов) |
| noShield | №0762 |
| noSpells | №0801 |
| noStandardHealing | №0822 |
| noSurprise | №0762 |
| notation | №0812 |
| note | №0638 (+ 8 других файлов) |
| noteD20Roll | №0801 |
| noteMove | №0801 |
| notes | №0607 (+ 28 других файлов) |
| noTransfer | №0801 |
| noUnderwaterDrawbacks | №0762 |
| nourishing | №0762 |
| noVerbal | №0801 |
| npcs | №1176 |
| nTexture | №0059 |
| nuclearBomb | №0660 |
| nullification | №0762 |
| number | №0804 |
| numerator | №0804 |
| nylon | №0045 |
| oak | №0655 (+ 1 других файлов) |
| objectId | №0762 (+ 2 других файлов) |
| objectIds | №1125 |
| objectMeleeDamageMultiplier | №0762 |
| objects | №0054 (+ 1 других файлов) |
| obscured | №0669 |
| observe | №0624 |
| obstacles | №1102 (+ 5 других файлов) |
| obstinateAnathema | №0762 |
| occultFetish | №0796 |
| occultRitesKnown | №0690 |
| ocean | №0046 |
| odds | №0804 |
| offer | №0804 |
| offeredCp | №0784 (+ 1 других файлов) |
| official | №0643 (+ 1 других файлов) |
| official_expansion | №0611 |
| offline | №0835 (+ 1 других файлов) |
| oil | №0061 |
| oilBomb | №0762 |
| oilCoated | №0061 |
| ok | №0815 (+ 77 других файлов) |
| old | №0794 |
| oldLevel | №0653 |
| oldOneTwo | №0762 |
| omnipotence | №0762 (+ 1 других файлов) |
| omnipresence | №0762 (+ 1 других файлов) |
| omniscience | №0762 (+ 1 других файлов) |
| onApply | №0826 |
| onAttackResult | №0060 (+ 8 других файлов) |
| once | №0065 (+ 6 других файлов) |
| oncePerLongRest | №0786 |
| oncePerTurn | №0061 (+ 1 других файлов) |
| onChange | №0636 |
| onclick | №1183 |
| onCondition | №0624 (+ 5 других файлов) |
| onDamage | №0624 (+ 4 других файлов) |
| onDefeat | №0766 |
| onePerShortRest | №0792 |
| oneThirdCaster | №0762 |
| onFail | №0757 (+ 1 других файлов) |
| ongoingDamage | №0669 |
| onLine | №1077 (+ 1 других файлов) |
| onlyDeadBodies | №0852 |
| onlyMisfortuneFeatures | №0762 |
| onNatural1 | №0061 |
| onPreyDeath | №0762 |
| onProgress | №0825 |
| onRetry | №0826 |
| onSave | №0762 |
| onSavingThrow | №0631 (+ 1 других файлов) |
| onTurnEnd | №0060 (+ 10 других файлов) |
| ooze | №0757 |
| opacity | №0044 (+ 1 других файлов) |
| open | №0043 (+ 27 других файлов) |
| openBoard | №0844 |
| openDebug | №0831 |
| openHandTechnique | №0794 |
| openInfo | №0649 |
| openLog | №0831 |
| openMainMenuUpdate | №0825 |
| openMind | №0762 |
| openReplay | №0830 |
| openTrade | №0784 |
| operationId | №0802 (+ 10 других файлов) |
| opportunityAdvantage | №0801 |
| opportunityAttack | №0801 (+ 2 других файлов) |
| opportunityAttackBecomesGrapple | №0762 |
| optics | №0653 |
| optional | №0778 |
| optionalSlotDice | №0762 |
| options | №0045 (+ 5 других файлов) |
| optionsFor | №0045 |
| opts | №0794 |
| oracle | №0624 (+ 2 других файлов) |
| Oracle | №0690 |
| orange | №0815 |
| orcish_fury | №0765 |
| orcsteppe | №0046 |
| order | №0624 (+ 1 других файлов) |
| orders | №0671 (+ 1 других файлов) |
| organ | №0809 |
| organic | №0046 |
| origin | №0056 |
| original | №0061 |
| originalStats | №0799 (+ 1 других файлов) |
| originRaceId | №0049 (+ 1 других файлов) |
| ostorianDiscourse | №0762 |
| other | №1055 (+ 1 других файлов) |
| otherStyleEffectsPending | №0855 |
| otherworldlyPatron | №0624 |
| outcome | №0655 |
| outcomeLabel | №0655 |
| outer | №0041 (+ 2 других файлов) |
| outlandsEligible | №0615 |
| outOfOrder | №0835 |
| output | №0650 (+ 7 других файлов) |
| outputBytes | №1085 |
| oval | №0046 (+ 1 других файлов) |
| oven | №0050 |
| overCorset | №0045 |
| overCuirass | №0045 |
| overflow | №1231 |
| overheat | №0762 |
| overheatIgnoresImmunity | №0762 |
| overlay | №0826 |
| overlord | №0792 |
| overpayCp | №0785 |
| owl | №0044 |
| owlbear | №0669 |
| own | №1104 |
| ownedCondition | №0801 |
| owner | №1048 |
| owner_id | №1077 |
| ownerId | №0061 (+ 8 других файлов) |
| ownerPeerId | №1119 (+ 7 других файлов) |
| ownerTokenId | №0061 (+ 4 других файлов) |
| ownerTurns | №0624 |
| ownTurnId | №0801 (+ 2 других файлов) |
| ox | №0055 |
| oy | №0055 |
| p | №0041 (+ 2 других файлов) |
| p_deleted | №0636 |
| p_expected_revision | №0636 |
| p_id | №0636 |
| p_operation_id | №0636 |
| p_profile | №0636 |
| p_schema_version | №0636 |
| p1 | №1182 (+ 3 других файлов) |
| p2 | №1182 |
| pa | №1119 |
| pack | №0046 (+ 7 других файлов) |
| PACK_ID | №0061 (+ 2 других файлов) |
| packId | №0644 |
| packleader | №0762 |
| Packleader | №0778 |
| packs | №0759 (+ 2 других файлов) |
| packTactics | №0762 |
| pact | №0810 (+ 1 других файлов) |
| pactBoon | №0631 |
| pactLevel | №0781 |
| pactMagic | №0624 (+ 3 других файлов) |
| pactMagicData | №0794 (+ 4 других файлов) |
| padding | №0654 |
| painkiller | №0762 |
| painkillerGrandStrategist | №0762 |
| painkillerPunishment | №0762 |
| paint | №0061 |
| paintBomb | №0762 |
| paintCreatures | №0061 |
| painter | №0653 (+ 3 других файлов) |
| paintV38 | №0655 |
| paladin | №0781 (+ 1 других файлов) |
| paleMaster | №0792 |
| panelScroll | №1231 |
| panelUV | №0045 |
| panX | №0053 (+ 2 других файлов) |
| panY | №0053 (+ 2 других файлов) |
| paper | №0651 (+ 2 других файлов) |
| Paragon | №0778 |
| paragonOfChivalry | №0762 |
| paralyticReagent | №0809 |
| paralyzed | №0762 (+ 1 других файлов) |
| parasiteMind | №0799 |
| parchment | №0651 (+ 2 других файлов) |
| parent | №0803 |
| parentContainerId | №0772 |
| parentId | №0822 |
| parentNode | №1183 |
| parentTriangles | №1237 (+ 3 других файлов) |
| parley | №0762 |
| parleyFree | №0762 |
| parseDice | №0810 (+ 5 других файлов) |
| part | №0048 |
| partial | №0042 |
| participantTurnStart | №0801 |
| partnerId | №0801 |
| parts | №0041 (+ 13 других файлов) |
| pass | №0837 |
| passesThroughCreatures | №0762 |
| passive | №0046 (+ 9 других файлов) |
| password | №0636 |
| patch | №0648 (+ 1 других файлов) |
| path | №0050 (+ 31 других файлов) |
| pathCost | №1196 (+ 1 других файлов) |
| pathFt | №0794 |
| patientDefense | №0631 |
| patron | №0624 (+ 5 других файлов) |
| patrons | №0624 |
| patternScale | №0045 |
| pauldrons | №0045 |
| pawPadColor | №0049 |
| payHitPointCost | №0638 |
| payload | №0794 (+ 16 других файлов) |
| payOwnHPForCharnel | №0792 |
| PB | №0767 (+ 3 других файлов) |
| pc | №0793 |
| pd | №1119 |
| peaceAura | №0801 |
| peaceBlocked | №0638 (+ 1 других файлов) |
| peakPhysicalCondition | №0699 (+ 1 других файлов) |
| pectorals | №0046 (+ 1 других файлов) |
| peer | №0794 |
| peerId | №1173 |
| peerName | №0793 |
| penaltyPerFatigue | №0762 |
| pending | №0061 (+ 3 других файлов) |
| pendingAnswer | №0793 |
| pendingAttack | №0638 (+ 1 других файлов) |
| pendingDamage | №0624 (+ 3 других файлов) |
| pendingInitiativeBonus | №0801 |
| pendingOffer | №0793 |
| pendingOnHit | №0061 (+ 3 других файлов) |
| pendingReaction | №0794 |
| pendingReactions | №0794 (+ 1 других файлов) |
| pendingSelection | №0631 |
| penetratesResistance | №0762 |
| penetratingDice | №0762 |
| pentacles | №0801 (+ 1 других файлов) |
| pentacles_14 | №0801 |
| percent | №0804 |
| perception | №0755 (+ 1 других файлов) |
| Perception | №0063 |
| perceptionReagent | №0809 |
| percipient | №0624 |
| Percipient | №0762 |
| perfectSelf | №0631 |
| performance | №0755 (+ 3 других файлов) |
| perilousGambit | №0762 |
| permanentCurse | №0762 |
| persistent | №0762 |
| persistentRage | №0631 |
| persona | №0762 |
| persuasion | №0755 (+ 2 других файлов) |
| persuasionDeceptionIntimidationFloor | №0762 |
| perTargetLongRest | №0762 |
| perTurn | №0792 |
| petrification | №0762 |
| Petrification | №0063 |
| petrificationReagent | №0809 |
| pharaoh | №0792 |
| phase | №0044 (+ 3 других файлов) |
| phaseFiber | №0809 |
| phaseReagent | №0809 |
| phaseRift | №0762 |
| phaseRiftNoStraightLine | №0762 |
| phaseThrough | №0762 |
| phaseWeaponAttack | №0762 |
| philosophersStone | №0660 |
| physicalAndroidQA | №1090 |
| physicalResistance | №0822 |
| physicalStats | №0767 (+ 1 других файлов) |
| physicalStatsFromShell | №0767 |
| physician | №0812 |
| pickFloor | №0056 |
| pickLevel | №0060 (+ 17 других файлов) |
| piercing | №0854 |
| pigment | №0655 |
| pineResin | №0656 |
| pissAndVinegar | №0699 |
| pitch | №0053 (+ 1 других файлов) |
| pixie | №0044 (+ 1 других файлов) |
| pl | №0056 |
| placeToken | №0844 |
| plague | №0822 |
| plagueLord | №0792 |
| plain | №0646 |
| plan | №0794 (+ 1 других файлов) |
| planar | №0615 |
| planarInfluence | №0615 |
| planes | №0615 |
| planescape | №0615 |
| planned | №0643 |
| planPreview | №0609 |
| plant | №0611 (+ 11 других файлов) |
| plasmoid | №1244 |
| plateColor | №0049 (+ 1 других файлов) |
| plates | №0049 |
| plateSize | №0049 (+ 2 других файлов) |
| play | №0801 (+ 1 других файлов) |
| playerAction | №1183 |
| playfair | №0815 |
| playing | №0065 (+ 1 других файлов) |
| playingTheOdds | №0762 |
| pleats | №0045 (+ 3 других файлов) |
| plusDex | №0796 |
| pockets | №0611 (+ 18 других файлов) |
| pocketSand | №0762 |
| point | №0044 (+ 2 других файлов) |
| pointerId | №1048 |
| points | №0044 (+ 1 других файлов) |
| poison | №0631 (+ 2 других файлов) |
| poisonBypass | №0796 |
| poisoned | №0792 (+ 1 других файлов) |
| poisoner | №0655 (+ 3 других файлов) |
| poisonIgnoresImmunity | №0792 |
| poisonIgnoresResistance | №0792 |
| poisonOnCharnel | №0792 |
| poisonResistance | №0759 |
| polearm_master | №0765 |
| polyglot | №0762 (+ 1 других файлов) |
| ponytail | №0044 (+ 1 других файлов) |
| pool | №0792 |
| poor | №0648 (+ 1 других файлов) |
| porcelainClay | №0656 |
| portalAffinity | №0615 |
| portalRoute | №0615 |
| pos | №0056 |
| pose | №0049 |
| poseBuilds | №0046 |
| poses | №0048 |
| position | №0044 (+ 5 других файлов) |
| POSITION | №0047 (+ 6 других файлов) |
| positions | №0041 (+ 11 других файлов) |
| positive | №1048 (+ 3 других файлов) |
| Possessed | №0762 |
| possession | №0060 (+ 1 других файлов) |
| possessLiving | №0767 |
| postMessage | №0870 |
| pot | №0050 |
| potash | №0656 |
| potency | №0063 (+ 1 других файлов) |
| Potency | №0762 |
| potentObservation | №0812 |
| potion | №0061 (+ 3 других файлов) |
| potionBrewing | №0660 |
| potionCap | №0792 |
| potionColor | №0061 (+ 1 других файлов) |
| potionMixologist | №0660 |
| potions | №0061 |
| potter | №0653 (+ 3 других файлов) |
| pottery | №0651 (+ 1 других файлов) |
| power | №0044 (+ 2 других файлов) |
| powerOfTwo | №0046 |
| powerPreference | №0056 |
| pp | №0773 (+ 5 других файлов) |
| precedence | №0837 |
| precision | №0624 |
| Precision | №0762 |
| precisionStrike | №0762 |
| precognition | №0762 |
| predatoryInstinct | №0762 |
| predictiveDodge | №0762 |
| predictorCardId | №1112 (+ 1 других файлов) |
| predictorMajor | №1113 |
| predictorState | №1077 |
| preload | №0869 |
| prepare | №0048 (+ 1 других файлов) |
| prepared | №0061 (+ 4 других файлов) |
| preparedActions | №0794 (+ 1 других файлов) |
| preparedByLevel | №0786 (+ 1 других файлов) |
| preparedClasses | №0819 |
| preparedLimit | №0819 |
| preparedReactionAttack | №0631 |
| preparedSpells | №0786 (+ 1 других файлов) |
| prepareForLibrary | №0054 |
| prepareInspiration | №0801 |
| prerequisite | №0671 (+ 6 других файлов) |
| present | №0816 (+ 1 других файлов) |
| preserved | №0762 |
| preserveLife | №0631 (+ 1 других файлов) |
| preset | №0046 (+ 5 других файлов) |
| presetId | №0049 (+ 1 других файлов) |
| presets | №0049 (+ 1 других файлов) |
| press | №0050 |
| preSubclassBase | №0804 |
| pretendToBeVisual | №1100 |
| preventDropToZero | №0762 |
| preventExhaustion | №0762 |
| preventOpportunity | №0801 |
| preventsOpportunity | №0801 |
| preventZero | №0762 |
| preventZeroHp | №0669 |
| preview | №0054 |
| previewDisassembly | №0647 |
| previous | №0766 (+ 1 других файлов) |
| previousHp | №0638 |
| preyDamage | №0762 |
| price | №0611 (+ 20 других файлов) |
| priceImproved | №1131 |
| priceModifier | №0784 |
| primalChampion | №0631 |
| primalResilience | №0816 |
| primary | №0815 |
| primaryAbilities | №0061 (+ 4 других файлов) |
| primaryResourceId | №0064 |
| primaryStat | №0060 (+ 31 других файлов) |
| primeBomb | №0660 |
| primeval | №0762 |
| primevalForm | №0816 |
| primevalResurgence | №0816 |
| primitives | №1086 (+ 1 других файлов) |
| primordial | №0669 |
| priority | №0631 (+ 2 других файлов) |
| prismatic | №0061 |
| prismaticBomb | №0762 |
| prismaticIndex | №1047 |
| pristine | №0647 (+ 1 других файлов) |
| privileges | №0869 |
| processedEach | №0646 |
| processedId | №0809 |
| processedRuns | №0646 |
| processedUnit | №0809 |
| processing | №0655 (+ 1 других файлов) |
| prodigy | №0655 |
| profBonus | №0607 (+ 20 других файлов) |
| profession | №0653 (+ 4 других файлов) |
| professionBonus | №1127 |
| professionIds | №0653 |
| professionProfile | №0064 |
| professionRequirements | №0653 |
| PROFESSIONS | №0653 |
| proficiencies | №0629 (+ 10 других файлов) |
| proficiency | №0729 (+ 4 других файлов) |
| proficiencyBonus | №0641 (+ 13 других файлов) |
| proficiencyIfUntrained | №0801 |
| proficiencyRank | №1110 |
| proficiencyType | №0067 |
| proficient | №0630 (+ 6 других файлов) |
| profile | №0044 (+ 15 других файлов) |
| profileResources | №0794 |
| prog | №0056 |
| progression | №0632 (+ 15 других файлов) |
| progressionSource | №0684 (+ 3 других файлов) |
| project | №1218 (+ 1 других файлов) |
| projectedWeaponBonus | №0762 |
| projectile | №0638 (+ 3 других файлов) |
| projection | №0762 (+ 3 других файлов) |
| projectItem | №0762 |
| projectMobility | №0624 |
| projectPoint | №0056 |
| projectScreen | №0056 |
| projectUrl | №0634 (+ 4 других файлов) |
| projectVariant | №0818 |
| prolificAffliction | №0762 |
| prompt | №1115 (+ 8 других файлов) |
| prone | №0762 (+ 1 других файлов) |
| proneOnHit | №0762 |
| proneOnSuccess | №0762 |
| pronounced | №0042 |
| prop | №0061 |
| properties | №0062 (+ 9 других файлов) |
| propertiesHidden | №0064 |
| property | №0063 |
| proportions | №1091 |
| props | №0657 |
| protectAlly | №0669 |
| protected | №0801 |
| protection | №0759 |
| protector | №0669 |
| protege | №0762 |
| protegeAdvantageAfterExploit | №0762 |
| protegeUpgrade | №0762 |
| provokesNoOpportunity | №0759 |
| provokesOpportunityAttacks | №0801 |
| pseudopodSize | №0049 (+ 1 других файлов) |
| psi | №1123 |
| psiLimit | №0697 (+ 1 других файлов) |
| psiLimitFormula | №0697 |
| Psion | №0778 |
| psionicPredator | №0762 |
| psionSource | №0778 |
| psiPoints | №0697 (+ 2 других файлов) |
| psiPointsMax | №0759 (+ 1 других файлов) |
| psiPointsRest | №0697 |
| psychic | №0854 |
| psychicDamage | №0762 |
| psychicDamagePerTurn | №0762 |
| psychokinetics | №0762 |
| pubic | №0042 (+ 1 других файлов) |
| publishableKey | №0634 (+ 4 других файлов) |
| pulpit | №0050 |
| pupilOpacity | №0049 (+ 2 других файлов) |
| pupilShape | №0046 (+ 2 других файлов) |
| purity | №0063 |
| purple | №0815 (+ 1 других файлов) |
| pursuit | №0812 |
| pushFt | №0061 (+ 2 других файлов) |
| pushProneSaveBonus | №0762 |
| pushRadiusFt | №0762 |
| q | №1096 |
| qty | №0782 (+ 2 других файлов) |
| quality | №0042 (+ 12 других файлов) |
| QUALITY | №0650 |
| QUALITY_GRADES | №0647 |
| QUALITY_TIERS | №0648 |
| qualityBand | №0647 |
| qualityBonus | №0064 (+ 5 других файлов) |
| qualityEffects | №0648 |
| qualityKey | №0647 (+ 1 других файлов) |
| qualityLabel | №0647 |
| qualityMultiplier | №0782 (+ 1 других файлов) |
| qualityOf | №0648 |
| qualityReport | №0647 |
| quantity | №0651 (+ 1 других файлов) |
| quartz | №0656 |
| quartzForm | №0762 |
| query | №0776 |
| querySelector | №1147 |
| querySelectorAll | №1079 (+ 4 других файлов) |
| quick | №1205 |
| quickBrewing | №0061 (+ 1 других файлов) |
| quickened | №0631 |
| quickPin | №0762 |
| quiet | №0061 |
| quietBomb | №0762 |
| quiveringPalm | №0794 |
| quote | №0782 |
| r | №0851 (+ 1 других файлов) |
| rabbit | №0044 |
| rabbitEarSize | №0049 (+ 1 других файлов) |
| rabbitTailSize | №0049 (+ 1 других файлов) |
| rabbleRouser | №0762 |
| race | №0769 (+ 7 других файлов) |
| raceId | №0043 (+ 18 других файлов) |
| raceName | №0607 (+ 1 других файлов) |
| raceWarp | №0044 |
| rack | №0050 |
| radial | №0045 |
| radiant | №0854 |
| Radiant | №0063 |
| radiantAttackOrder | №0762 |
| radiantRetaliation | №0792 |
| radiantVsUndead | №0061 |
| radius | №0045 (+ 4 других файлов) |
| radiusBySlot | №0762 |
| radiusFt | №0660 (+ 3 других файлов) |
| radiusIncreaseFt | №0762 |
| radiusMiles | №0061 |
| rage | №0631 (+ 1 других файлов) |
| rageDamageBonus | №0664 |
| ragesCount | №0664 |
| raging | №1180 (+ 1 других файлов) |
| ragingInferno | №0762 |
| ragPulp | №0656 |
| rail | №0053 |
| raisedFt | №0801 |
| raiseThrallOnSeedKill | №0792 |
| rallyCrew | №0762 |
| rallyingCry | №0722 |
| rallyUnlimited | №0759 (+ 1 других файлов) |
| ram | №0049 |
| rampage | №0639 (+ 1 других файлов) |
| rampageDie | №0762 |
| rampagePending | №0669 |
| randomUUID | №1106 |
| range | №0061 (+ 17 других файлов) |
| rangedAttack | №1046 (+ 1 других файлов) |
| rangedAttackBonus | №0762 |
| rangeFt | №0060 (+ 26 других файлов) |
| rangeFtByLevel | №0811 |
| rangeMultiplier | №0762 |
| ranger | №0781 (+ 1 других файлов) |
| rangerFightingStyle | №0631 |
| rank | №0804 |
| rankForRecipe | №0653 |
| rapidity | №0624 |
| Rapidity | №0762 |
| raptor | №0044 |
| rare | №0776 (+ 6 других файлов) |
| rareBonus | №0791 |
| rareChance | №0757 |
| rarity | №0776 (+ 26 других файлов) |
| rate | №0648 |
| ratio | №0647 (+ 4 других файлов) |
| rats | №0044 |
| ravenousWeapon | №0762 |
| raw | №0636 (+ 3 других файлов) |
| rawCopper | №0656 |
| rawIron | №0656 |
| rawUnit | №0809 |
| rawXp | №0788 |
| ray | №0803 |
| reach | №0803 |
| reachBonusFt | №0762 |
| reachFt | №0759 (+ 1 других файлов) |
| reaction | №0061 (+ 38 других файлов) |
| reactionAction | №0762 |
| reactionAttack | №0669 (+ 2 других файлов) |
| reactionAttackOrSingleTargetSpell | №0762 |
| reactionCastHexOnDamager | №0762 |
| reactionChoice | №1112 (+ 2 других файлов) |
| reactionCounter | №0759 |
| reactionDamage | №0762 |
| reactionDamageReduction | №0792 |
| reactionDefensiveOrder | №0762 |
| reactionHalveDamage | №0762 |
| reactionId | №0794 (+ 4 других файлов) |
| reactionMode | №0762 |
| reactionMove | №0762 |
| reactionMoveFt | №0762 |
| reactionNegateSpellUpTo5 | №0762 |
| reactionOpportunityAgainstAttacker | №0762 |
| reactionOptions | №0631 (+ 3 других файлов) |
| reactionPending | №0794 |
| reactionRedirectAttack | №0792 |
| reactions | №0631 (+ 2 других файлов) |
| reactionsMax | №0631 |
| reactionSpell | №0796 |
| reactionsRefresh | №0812 |
| reactionSuppressOnInitiative | №0762 |
| reactionUsesByLevel | №0812 |
| reactionWeather | №0669 |
| reactionWindow | №0638 |
| readAllWriting | №0762 |
| readError | №0046 |
| readOnly | №0830 |
| readWriteForkedLanguages | №0762 |
| ready | №0046 (+ 2 других файлов) |
| readyState | №1078 (+ 26 других файлов) |
| reagent | №0809 |
| reagentRoll | №1047 |
| reagents | №0061 (+ 4 других файлов) |
| reagentsRegained | №0061 |
| reagentsSpent | №0061 |
| reagentSynthesis | №0660 |
| reanimateCorpse | №0852 |
| reanimated | №0852 |
| reanimator | №0792 |
| reaper | №0792 |
| rearDigits | №0044 |
| reason | №0060 (+ 28 других файлов) |
| reassembleCorpus | №0762 |
| rebirthInHell | №0762 |
| rebuild | №0781 |
| rebuildMaterialUsage | №1078 (+ 1 других файлов) |
| recalculate | №0832 |
| received | №0785 |
| recharge | №0061 (+ 12 других файлов) |
| rechargeActions | №0788 |
| recharged | №0788 |
| rechargeOn | №0637 |
| rechargeState | №0794 |
| recipe | №0648 (+ 5 других файлов) |
| recipeCount | №0655 |
| recipeId | №0647 |
| recipeName | №0647 |
| recipeRequirements | №0653 |
| recipes | №0650 (+ 3 других файлов) |
| RECIPES | №0650 |
| recipesList | №0650 |
| reciprocalRelationship | №0762 |
| reckless | №0631 |
| recommendedSourceCommit | №1268 |
| reconstruction | №0624 |
| Reconstruction | №0762 |
| record | №0830 (+ 6 других файлов) |
| recordApplication | №0804 |
| recordCraftResult | №0653 |
| recordDamage | №0801 |
| recordMutation | №0799 (+ 1 других файлов) |
| recover | №0636 |
| recoverable | №0647 |
| recovered | №0647 (+ 2 других файлов) |
| recoveredFromCrafting | №0648 |
| recoverRatio | №0647 |
| recovery | №0699 (+ 1 других файлов) |
| Recovery | №0063 |
| RECOVERY_BY_DURABILITY | №0647 |
| RECOVERY_BY_QUALITY | №0648 |
| recoveryRate | №1078 |
| recruitInformant | №0762 |
| recruitMercenary | №0762 |
| recursive | №0871 (+ 45 других файлов) |
| red | №0815 |
| Red | №0759 (+ 1 других файлов) |
| redirect | №0762 |
| redirectAttack | №0762 |
| redirectAttackToAlly | №0061 |
| redirectDamage | №0759 |
| redirectDamageToConstruct | №0762 |
| redirectMeleeAttackToFamiliar | №0762 |
| redirectMissedAttackToGrappledTarget | №0762 |
| redirectOrCancel | №0762 |
| redirectURL | №0869 |
| redistributed | №0801 |
| redo | №0046 |
| reduced | №0624 (+ 2 других файлов) |
| reducedBy | №0762 |
| reduceMaxHpByDamage | №0762 |
| reduceNextVisibleAttackBy | №0762 |
| reduction | №0811 (+ 1 других файлов) |
| reEnabled | №1079 |
| refinedCopper | №0656 |
| reflectPsychicDamage | №0762 |
| refresh | №0802 (+ 2 других файлов) |
| refresh_token | №0636 (+ 1 других файлов) |
| refreshByItsAlive | №0762 |
| refreshMaterial | №0045 |
| refreshOrgans | №0852 |
| refreshStatus | №0647 |
| refundCharnelOnThrallLoss | №0792 |
| refunded | №0794 |
| refundedSpellSlot | №0794 |
| regainOnShortRest | №0759 |
| regainReagentsOnInitiativeUpTo | №0061 |
| regeneration | №0792 |
| Regeneration | №0063 |
| regenerationBlockedBy | №0792 |
| regenPbWhenBloodied | №0624 |
| region | №0045 (+ 3 других файлов) |
| REGION_MOD | №0782 |
| regionalHairSupported | №0042 |
| regionMask | №0042 |
| regionMultiplier | №0782 |
| regions | №0042 (+ 5 других файлов) |
| register | №0611 (+ 12 других файлов) |
| registerActionHandler | №1119 (+ 5 других файлов) |
| registerClass | №0644 (+ 3 других файлов) |
| registerEquipment | №0049 |
| registerPreset | №0049 |
| registerRace | №0049 |
| registerSkin | №0049 |
| registerSummon | №0813 |
| registry | №0644 |
| reinforcedWoodV49 | №0650 |
| reinvokedRune | №0762 |
| reject | №0771 (+ 2 других файлов) |
| rejuvenatingOrder | №0762 |
| relation | №1112 |
| relationship | №0784 |
| relationshipChanged | №1131 |
| relaunch | №1082 |
| relaxationLevels | №0762 |
| rele | №0631 |
| releaseDeadSpaceOnInitiative | №0792 |
| releaseToLarva | №0799 |
| relentless | №0612 |
| relentlessRage | №0631 |
| reliableTalent | №0631 |
| relic | №0782 (+ 2 других файлов) |
| religion | №0755 (+ 1 других файлов) |
| remaining | №0631 (+ 11 других файлов) |
| remainingAmount | №0624 (+ 3 других файлов) |
| remainingCharges | №0061 |
| remainingHp | №0762 |
| remainingMinutes | №0061 (+ 2 других файлов) |
| remainingOwnerTurns | №0061 |
| remainingTurns | №0061 (+ 1 других файлов) |
| remnant | №0822 |
| remnants | №0046 (+ 4 других файлов) |
| remote | №0636 |
| remoteRoster | №0793 |
| remove | №0641 (+ 7 других файлов) |
| removeAction | №0061 |
| removeAdvantage | №0854 |
| removeAlchemistSlime | №0638 |
| removeClass | №0832 |
| removeCondition | №0759 (+ 1 других файлов) |
| removeConditions | №0624 |
| removed | №0041 (+ 2 других файлов) |
| removeEventListener | №0870 |
| removeFeat | №0832 |
| removeFloor | №0054 |
| removeImmunity | №0624 |
| removeInventory | №0832 |
| removeItem | №1089 (+ 3 других файлов) |
| removeObject | №0054 |
| removePoisonDisease | №0762 |
| removeRampage | №0669 |
| removeResistance | №0624 |
| removeResistanceTo | №0762 |
| removeSpell | №0832 |
| removeZone | №0054 |
| render | №0064 (+ 10 других файлов) |
| renderAppearance | №0044 |
| renderCharacterCreation | №0653 |
| renderControls | №0624 |
| renderFamily | №0049 |
| renderInventory | №1127 (+ 1 других файлов) |
| renderStatus | №0649 |
| rendingStrike | №0762 |
| repairCost | №1080 |
| repairCount | №0647 |
| repaired | №0647 (+ 3 других файлов) |
| repairGold | №1078 |
| repairItem | №0647 (+ 3 других файлов) |
| repairProfile | №0648 |
| repeat | №0065 |
| repeatDamageOnFailedSave | №0624 |
| repeatMissedAttack | №0762 |
| repeatRestriction | №0762 |
| repeatRollingBoulderOnSuccessfulProne | №0762 |
| repeatSave | №0061 (+ 3 других файлов) |
| repeatSaveAtTurnEnd | №0762 |
| repeatSaveEndTurn | №0762 |
| repeatSaveOnDamage | №0762 |
| replaceAfterShortRest | №0762 |
| replaceAnyAfterLongRest | №0762 |
| replaceAnyNon18Metamorphoses | №0762 |
| replaceAttackWithSpirit | №0796 |
| replaceAttackWithTouchCantrip | №0762 |
| replaceConsumed | №0762 |
| replaceDropToZeroWithHP | №0061 |
| replaceExploitOnRest | №0762 |
| replaceLowSpellSlotWithInspiringWord | №0762 |
| replaceMetamorphosis | №0762 |
| replaceMutagen | №0762 (+ 1 других файлов) |
| replaceOnRest | №0060 |
| replacePhysicalSaveWith | №0762 |
| replacesRace | №0626 (+ 10 других файлов) |
| replaceStandardOrExoticAfterLongRest | №0762 |
| replaceWolfWithDireWolf | №0762 |
| report | №0647 (+ 1 других файлов) |
| reposition | №0762 |
| reprisal | №0786 |
| reptile | №0757 |
| reptileIndices | №0044 |
| reptileProfile | №0044 (+ 5 других файлов) |
| reptileSkin | №0044 |
| req | №0624 (+ 1 других файлов) |
| requestedExternal | №0042 |
| requestId | №0794 (+ 7 других файлов) |
| require | №1269 |
| required | №0697 (+ 3 других файлов) |
| requiredAssets | №0054 |
| requiredGold | №0648 |
| requiredLevel | №0653 |
| requiredMaterials | №0648 |
| requiredSpecialization | №0653 |
| requiredTools | №0655 |
| requirements | №0615 (+ 1 других файлов) |
| requires | №0657 (+ 4 других файлов) |
| requiresAdvantage | №0762 |
| requiresArmor | №0762 |
| requiresDisengage | №0762 |
| requiresEqualOrHigherExtraSlot | №0762 |
| requiresGrappled | №0762 |
| requiresNearestAttack | №0624 |
| requiresSoleHexTarget | №0762 |
| requiresTarget | №0762 |
| reroll | №0631 |
| rerollAttack | №0061 |
| rerollDamage12 | №0762 |
| rerollFlickerCost | №0762 |
| rerollGrappleEscape | №0762 |
| rerollHemocraftOncePerTurn | №0762 |
| rerollOne | №0631 (+ 3 других файлов) |
| rerollOneDamageDie | №0762 |
| rerollSave | №0759 (+ 1 других файлов) |
| rerollType | №0762 |
| reservationRetained | №0638 |
| reserved | №0786 (+ 3 других файлов) |
| reservedDie | №0796 |
| reset | №0046 |
| resetDeathSaves | №0638 |
| resetLairRound | №0788 |
| resetNegotiation | №0784 |
| resetRestResources | №0852 |
| resetTurn | №0631 |
| resetTurnResources | №0766 |
| resetView | №0846 |
| resignalSeq | №0793 |
| resilientOrder | №0762 |
| resilientOrderAdvanced | №0762 |
| resin | №0650 (+ 3 других файлов) |
| resist | №0801 |
| resistance | №0061 (+ 10 других файлов) |
| resistanceAll | №0061 (+ 2 других файлов) |
| resistanceAllDamage | №0762 |
| resistanceAllExceptPsychic | №0762 |
| resistanceChosen | №0762 |
| resistances | №0638 (+ 14 других файлов) |
| resistanceType | №0061 (+ 2 других файлов) |
| resistanceWhileBloodied | №0762 |
| resistant | №0801 (+ 1 других файлов) |
| resistantSuppression | №0762 |
| resisted | №0833 |
| resize | №0054 |
| resolution | №0842 (+ 1 других файлов) |
| resolve | №0636 (+ 4 других файлов) |
| resolveAction | №0788 |
| resolveAttack | №0638 (+ 1 других файлов) |
| resolveCharacterRace | №0049 |
| resolveEquipment | №0049 |
| resolveFall | №0054 |
| resolveFeature | №0644 |
| resolveMorphWeights | №0051 |
| resolveRace | №0049 |
| resolveReaction | №0631 |
| resolveRollMode | №0810 |
| resolveSkin | №0049 |
| resource | №0766 (+ 1 других файлов) |
| resourceBridge | №0669 |
| resourceInput | №0655 |
| resourceName | №0808 |
| resourceProcessing | №0809 |
| resourceRevision | №0794 |
| resources | №0061 (+ 38 других файлов) |
| RESOURCES | №0656 |
| resourceUnit | №0809 |
| resourceYieldMultiplier | №0655 |
| respawn | №0861 |
| rest | №0624 (+ 11 других файлов) |
| restAndRecover | №0762 |
| restHealing | №0767 (+ 1 других файлов) |
| restNormals | №0044 |
| restock | №0782 (+ 1 других файлов) |
| restore | №0631 (+ 4 других файлов) |
| restoreBloodMaledictOnRiteCrit | №0624 |
| restoreBody | №0799 |
| restored | №0061 (+ 3 других файлов) |
| restoredAt | №0848 |
| restoreExhaustion | №0759 |
| restoreExploitPerAlly | №0762 |
| restoreGolem | №1047 |
| restoreHitDice | №0759 (+ 1 других файлов) |
| restoreHp | №0669 |
| restoreHP | №0762 |
| restoreInterruptOnInitiative | №0762 |
| restoreLocalCopy | №0636 |
| restoreMoxie | №0762 |
| restoreMoxieOnSuccessfulCrossCounter | №0762 |
| restoreOneSealLongRest | №0762 |
| restoreOnInitiative | №0762 |
| restorePactSlot | №0624 |
| restoreReagents | №0762 |
| restoreResource | №0759 |
| restoreResources | №0810 |
| restoreSnapshot | №0844 (+ 1 других файлов) |
| restoreSpellLevels | №0792 |
| restoreThrall | №0762 |
| restoreWithReagents | №1047 |
| restPositions | №0044 |
| restrainAt0Hp | №0762 |
| restrained | №0762 (+ 1 других файлов) |
| restrainedUntilEndOfNextTurn | №0762 |
| restrictionUntilOwnEnd | №0801 |
| result | №0631 (+ 40 других файлов) |
| resultCp | №0773 |
| resultEp | №0773 |
| resultGp | №0773 |
| resultPp | №0773 |
| results | №0631 (+ 4 других файлов) |
| resultSp | №0773 |
| retain | №0816 |
| retainMentalStats | №0762 |
| retains | №0827 |
| retaliationHealing | №0762 |
| retaliatoryDamage | №0762 |
| retaliatoryNecrotic | №0762 |
| retreat | №0803 |
| retreatFrom | №0801 |
| retries | №0804 |
| retryIn | №0861 (+ 1 других файлов) |
| returnAfterHour | №0792 |
| returnAttackBonus | №0794 (+ 1 других файлов) |
| returnDamage | №0762 (+ 3 других файлов) |
| returnDamageType | №0794 |
| returnedAttack | №0631 |
| returnTarget | №0638 (+ 3 других файлов) |
| returnToShell | №0767 |
| reveal | №0062 (+ 3 других файлов) |
| revealed | №0057 (+ 2 других файлов) |
| revealedArcana | №0624 |
| revealedSight | №0801 |
| revealsInvisible | №0061 |
| reverseMappedGlbVertices | №1095 |
| revert | №0762 (+ 1 других файлов) |
| revision | №0636 (+ 4 других файлов) |
| revitalizingOrderExploit | №0762 |
| reviveAtDawn | №0762 |
| reviveAtZero | №0759 |
| revived | №0061 |
| revivedFromZero | №0638 |
| reviveHp | №0762 |
| reviveNearHeartAfterHours | №0762 |
| reviveRecentDead | №0792 |
| reviveRite | №0624 |
| reviveTo1 | №0762 |
| revokeObjectURL | №1176 |
| revolution | №0786 |
| rewards | №0653 (+ 1 других файлов) |
| rider | №0852 |
| RIDGE_STYLES | №0049 |
| ridgeColor | №0049 (+ 1 других файлов) |
| ridgeStyle | №0046 |
| right | №1093 |
| ringingStrike | №0762 |
| riposte | №0762 |
| riseFt | №0801 |
| risk | №0063 |
| rite | №0762 (+ 2 других файлов) |
| riteFocus | №0624 |
| riteOfTheDawn | №0624 |
| riteRevival | №0624 |
| rites | №0690 (+ 8 других файлов) |
| riteSwapAtLevel | №0762 |
| riteType | №0624 (+ 7 других файлов) |
| ritual | №0744 (+ 3 других файлов) |
| ritualCasting | №0690 (+ 1 других файлов) |
| ritualComponentReplaced | №0796 |
| ritualDuringShortRest | №0762 |
| ritualizeKnownSpellsUpTo | №0796 |
| ritualMastery | №0762 |
| ritualMaterialSubstitution | №0762 |
| ritualMinutes | №0762 (+ 1 других файлов) |
| ritualSpellLevelMax | №0796 |
| ritualTurnsBySpellLevel | №0796 |
| rmsDisplacementMeters | №1090 |
| roar | №0624 (+ 1 других файлов) |
| roguishCharm | №0762 |
| role | №0042 (+ 31 других файлов) |
| roles | №0611 (+ 18 других файлов) |
| roll | №0057 (+ 24 других файлов) |
| rollback | №0839 (+ 1 других файлов) |
| rollD20 | №0810 (+ 20 других файлов) |
| rollDice | №0638 (+ 4 других файлов) |
| rolledDistanceFt | №0801 |
| rollingAvalanche | №0762 |
| rollingBoulder | №0762 |
| rollPockets | №0790 (+ 1 других файлов) |
| rollResolved | №0818 |
| rollResult | №0855 |
| rolls | №0611 (+ 24 других файлов) |
| rollTwiceChoose | №0762 |
| roomId | №0793 (+ 5 других файлов) |
| rope | №0653 (+ 1 других файлов) |
| roster | №1077 (+ 2 других файлов) |
| rotation | №0059 |
| rotFist | №0762 |
| roughness | №0044 (+ 3 других файлов) |
| round | №0046 (+ 42 других файлов) |
| roundEarSize | №0049 (+ 1 других файлов) |
| roundOwnerId | №0801 |
| roundsRemaining | №0762 (+ 1 других файлов) |
| roundStart | №0801 |
| rows | №0061 (+ 13 других файлов) |
| RTCPeerConnection | №1204 |
| ru | №0728 (+ 1 других файлов) |
| rug | №0050 |
| ruined | №0647 (+ 1 других файлов) |
| ruins | №0782 |
| ruins_courtyard | №0861 |
| ruins_vault | №0861 |
| ruins_workshop | №0861 |
| rules | №0804 (+ 2 других файлов) |
| run | №0839 (+ 1 других файлов) |
| rune | №0762 (+ 2 других файлов) |
| runeDoesNotCountAgainstAttunement | №0762 |
| runeInert | №0762 |
| runesKnown | №0631 (+ 1 других файлов) |
| runesPerObject | №0762 |
| runesPersistAfterDeath | №0762 |
| runicCharges | №0811 |
| runicLore | №0811 |
| runSceneTest | №0825 |
| runScripts | №1100 |
| runtime | №0690 (+ 4 других файлов) |
| runtimeCraft | №0762 |
| runtimeId | №0796 |
| runtimeKey | №0753 |
| runtimeStatus | №0690 (+ 1 других файлов) |
| runtimeVersion | №0660 |
| ruthlessCommand | №0762 |
| ruthlessFocus | №0762 |
| rx | №0044 (+ 4 других файлов) |
| ry | №0044 |
| rz | №0044 (+ 1 других файлов) |
| s | №0053 (+ 3 других файлов) |
| sacredWeapon | №0631 |
| sacrifice | №0786 (+ 1 других файлов) |
| sacrificeFoe | №0786 |
| saddler | №0653 |
| safeAlliesMax | №0762 |
| sagacity | №0624 |
| Sagacity | №0762 |
| salt | №0654 (+ 3 других файлов) |
| saltOfEarth | №0762 |
| salvage | №0808 (+ 1 других файлов) |
| sample | №1138 (+ 3 других файлов) |
| sampledBestMaxDistance | №1099 |
| sampledBestMeanDistance | №1099 |
| sampledGoodPct | №1099 |
| sampleSampler | №0051 |
| sand | №0655 |
| sandbox | №0869 |
| sandVortex | №0792 |
| sanguine | №0762 |
| sanguineEmboldenAllies | №0762 |
| sanguineMastery | №0624 |
| sanguineVitalize | №0762 |
| satyr | №1252 |
| savage_attacker | №0765 |
| savageDice | №0762 |
| save | №0043 (+ 26 других файлов) |
| save1 | №0792 |
| save1or2 | №0792 |
| saveAbility | №0660 |
| saveBonus | №0624 (+ 1 других файлов) |
| saveBonuses | №1046 (+ 5 других файлов) |
| saveBottom | №1231 |
| saveCustom | №0840 |
| saved | №0767 (+ 2 других файлов) |
| savedAt | №0843 (+ 2 других файлов) |
| saveDc | №0794 |
| saveDC | №0061 (+ 6 других файлов) |
| savedDrawCalls | №0046 |
| saveDisadvantage | №0762 (+ 1 других файлов) |
| saveDisadvantageForPugilistFeatures | №0762 |
| saveEpoch | №0848 |
| saveId | №0848 |
| saveModifiers | №0624 (+ 8 других файлов) |
| saveOnHit | №0061 |
| savePenalty | №0061 |
| saveResult | №0061 (+ 7 других файлов) |
| saveRevision | №0848 |
| saveRoll | №0794 |
| saves | №0762 (+ 1 других файлов) |
| savesData | №0607 (+ 1 других файлов) |
| saveSheet | №0641 |
| saveSucceeds | №0762 |
| saveSuccess | №0061 |
| saveType | №0638 (+ 7 других файлов) |
| savingThrow | №0638 (+ 20 других файлов) |
| savingThrowBonusDice | №0762 |
| savingThrowProficiencies | №1115 |
| savingThrows | №0060 (+ 32 других файлов) |
| SCALAR | №0051 (+ 4 других файлов) |
| scale | №0044 (+ 20 других файлов) |
| scalePlateV49 | №0650 |
| scalesPerLevel | №0762 |
| scaleWithOwner | №0641 (+ 1 других файлов) |
| scarf | №0045 |
| scenarios | №0839 (+ 1 других файлов) |
| scene | №1052 (+ 2 других файлов) |
| sceneFrom | №0801 |
| sceneOwnerId | №0801 (+ 1 других файлов) |
| scenes | №1052 (+ 2 других файлов) |
| schema | №1218 |
| schema_version | №1077 |
| SCHEMA_VERSION | №0625 (+ 2 других файлов) |
| schemaVersion | №0049 (+ 7 других файлов) |
| scheme | №0869 |
| scholarlyPursuits | №0812 |
| school | №0743 (+ 10 других файлов) |
| schoolOfHardKnocks | №0762 |
| scope | №0762 |
| scopeId | №0636 |
| scopes | №0636 |
| score | №0647 (+ 1 других файлов) |
| scourgeAttunement | №0762 |
| scourgePresence | №0762 |
| scourgeSense | №0762 |
| scourgeSpeech | №0762 |
| scourgeVisage | №0762 |
| scribe | №0651 (+ 4 других файлов) |
| scrolls | №0653 (+ 2 других файлов) |
| seafarer | №0762 |
| seal | №0762 |
| sealDamage | №0681 (+ 1 других файлов) |
| sealDamageIgnoresResistance | №0762 |
| sealDiceDoubled | №0762 |
| sealedSpiritFeatureLevels | №0827 |
| seals | №0681 |
| sealSystem | №0681 |
| sealWax | №0655 |
| seamMaxMeters | №1090 |
| seaMobility | №0759 |
| search | №0643 |
| searchAsBonus | №0759 |
| second | №0810 |
| second_chance | №0765 |
| secondaryAbility | №0669 |
| secondaryStat | №0660 (+ 3 других файлов) |
| secondaryStatChoice | №0681 (+ 2 других файлов) |
| secondaryStats | №0709 (+ 5 других файлов) |
| seconds | №0801 (+ 1 других файлов) |
| secondTarget | №0762 |
| secondWind | №0631 |
| secret | №0057 |
| secure | №0869 |
| seeIllusions | №0801 |
| seeing | №0762 |
| seeInvisible | №0801 (+ 1 других файлов) |
| seek | №0830 |
| seeking | №0061 |
| seekingBomb | №0762 |
| select | №0840 |
| selected | №0060 (+ 4 других файлов) |
| selectedFile | №0836 |
| selectedRites | №0796 |
| selectedTexture | №0054 |
| selectedTokenId | №0609 |
| selectedTool | №0054 |
| selectedWallTexture | №0054 |
| selection | №0060 |
| selfAdvantage | №0810 |
| selfDamage | №0631 (+ 3 других файлов) |
| selfDamageType | №0762 |
| selfDisadvantage | №0810 |
| selfFireDamageUpToLevel | №0762 |
| selfHeal | №0762 |
| selfNecrotic | №0762 |
| selfRadiantDamage | №0762 |
| selfSuture | №0792 |
| selfUsesHitDie | №0762 |
| sell | №0782 (+ 2 других файлов) |
| sellable | №0785 |
| sellFactor | №0782 (+ 1 других файлов) |
| sendActionResult | №1119 (+ 5 других файлов) |
| sendMessage | №1173 |
| sendReactionRequest | №1119 (+ 2 других файлов) |
| senseBloodCreatures | №0762 |
| senses | №0641 (+ 4 других файлов) |
| sentinel | №0765 |
| sentinelSoul | №0718 (+ 1 других файлов) |
| sentinelSoulChoices | №0718 |
| sentinelStand | №0718 (+ 1 других файлов) |
| sentinelStandChoices | №0718 |
| sentinelStrike | №0718 (+ 1 других файлов) |
| sentinelStrikeChoices | №0718 |
| seq | №1181 (+ 6 других файлов) |
| serial | №0624 |
| serialize | №0049 |
| session | №0845 (+ 2 других файлов) |
| sessionId | №0845 (+ 1 других файлов) |
| sessions | №1147 (+ 1 других файлов) |
| setArmor | №0046 |
| setAttribute | №1127 (+ 1 других файлов) |
| setAxis | №0046 |
| setBackground | №0832 |
| setBodyHair | №0046 |
| setCeiling | №0801 |
| setClassLevel | №0832 |
| setClothing | №0046 |
| setClothingCustomization | №0046 |
| setElevation | №0801 |
| setEnabled | №0644 (+ 1 других файлов) |
| setExternalAnatomy | №0046 |
| setGender | №0046 (+ 1 других файлов) |
| setHead | №0046 |
| setHosieryDen | №0046 |
| setHp | №0762 |
| setHP | №0762 |
| setIcon | №0870 |
| setItem | №1048 (+ 19 других файлов) |
| setMainMenuAvailability | №0825 |
| setMessageHandler | №1173 |
| setOriginRace | №0049 |
| setPose | №0046 |
| setProfession | №0832 |
| setProgress | №0826 |
| setProgressHandler | №0825 |
| setRace | №0046 (+ 2 других файлов) |
| setRegion | №0782 |
| setResource | №0810 |
| setSkin | №0046 |
| setStance | №0762 |
| setStatus | №0826 |
| setStrength | №0061 |
| setSwarmMoving | №0046 |
| setSymbiosis | №0799 |
| setTile | №0054 |
| setTimeout | №0646 (+ 15 других файлов) |
| settlementIntel | №0762 |
| settlementOnly | №0762 |
| setTotalLevel | №0832 |
| setView | №1176 |
| setWeapon | №0046 |
| sewer | №0046 |
| sha | №1218 |
| sha256 | №0825 (+ 2 других файлов) |
| shadow_dancer | №0765 |
| shadow_touched | №0765 |
| shadowColor | №0049 (+ 1 других файлов) |
| shadowEssence | №0809 |
| shadowForm | №0792 |
| shadowmaster | №0762 |
| shadowMasterOfDisguise | №0762 |
| shadowNoEscape | №0762 |
| shadowOpacity | №1232 |
| shadowStep | №0631 |
| shag | №0044 (+ 1 других файлов) |
| shakeItOff | №0699 (+ 1 других файлов) |
| Shaman | №0690 |
| shape | №0044 (+ 8 других файлов) |
| shapechange | №0762 |
| shapeChangeSave | №0762 |
| shapeFemale | №1062 |
| shapeHead | №0044 |
| shapeMale | №1062 (+ 1 других файлов) |
| shaper | №0697 (+ 1 других файлов) |
| Shaper | №0778 |
| shapes | №0042 (+ 1 других файлов) |
| sharedAdvantage | №0762 |
| shareDamage | №0801 |
| shareDanceBonus | №0792 |
| sharedBonusAction | №0762 (+ 1 других файлов) |
| sharedHp | №0762 |
| sharedImmortality | №0762 |
| sharedInitiative | №0822 |
| sharedProperties | №0062 (+ 1 других файлов) |
| sharedReaction | №0759 (+ 2 других файлов) |
| sharedStealth | №0669 |
| shareSaves | №0796 |
| shareSensesHours | №0762 |
| sharpMind | №0812 |
| sharpshooter | №0765 |
| shaved | №0042 (+ 1 других файлов) |
| shelf | №0050 |
| shell | №0767 |
| shellColor | №0049 (+ 1 других файлов) |
| shellDestroyed | №0767 |
| shellHealing | №0767 |
| shellHP | №0767 |
| shellMaxHP | №0767 |
| shellName | №0767 |
| shells | №1240 |
| shellSize | №0049 (+ 1 других файлов) |
| shield_master | №0765 |
| shieldACBonus | №0762 |
| shieldAllowed | №0762 |
| shieldAttackBonus | №0762 |
| shieldDamage | №0762 |
| shielded | №0624 (+ 1 других файлов) |
| Shielded | №0762 |
| shieldFrame | №0650 (+ 1 других файлов) |
| shieldImpact | №0762 |
| shieldmaker | №0653 |
| shieldMartial | №0762 |
| shieldSlam | №0762 (+ 1 других файлов) |
| shieldWarrior | №0762 |
| shift | №0784 |
| shifter | №0655 (+ 1 других файлов) |
| shifterNaturalWeapon | №0816 |
| shinL | №0042 |
| shinR | №0042 |
| shipchandler | №0784 (+ 1 других файлов) |
| shippedSha256 | №1090 |
| shirt | №0045 |
| shirt_long | №1057 (+ 1 других файлов) |
| shockingStrike | №0762 |
| shockingStrikeDamage | №0762 |
| short | №0044 (+ 1 других файлов) |
| shortRest | №0061 (+ 1 других файлов) |
| shortRestHealing | №0822 |
| shortRestHealingAllowed | №0852 |
| shortRestSlots | №0762 |
| shoulders | №0046 (+ 6 других файлов) |
| shouldSuppressRestHP | №0767 (+ 1 других файлов) |
| shove | №0759 |
| shredding | №0762 |
| shreddingFree | №0762 |
| shuffle | №0065 |
| side | №0044 (+ 2 других файлов) |
| side_part | №0044 (+ 1 других файлов) |
| sideEffect | №0762 |
| sideEffects | №0063 |
| sides | №0638 (+ 8 других файлов) |
| siege | №0653 (+ 2 других файлов) |
| siegeInteraction | №0614 |
| sightBlocked | №0057 |
| sigilEligible | №0615 |
| sigilicGrace | №0762 |
| signal | №0636 (+ 2 других файлов) |
| signatureSpells | №0631 |
| signup | №0636 |
| silent | №0801 |
| silentCheck | №0825 |
| silentStalker | №0762 |
| silk | №0045 |
| silkwormSilk | №0656 |
| silver | №0651 (+ 2 других файлов) |
| silvered | №0638 (+ 1 других файлов) |
| site | №0778 |
| sixthMetamorphosis | №0762 |
| size | №0044 (+ 36 других файлов) |
| size_mb | №1088 |
| sizeBytes | №1092 |
| sizeCategory | №0049 (+ 1 других файлов) |
| sizeChange | №0061 |
| sizeFt | №0061 (+ 1 других файлов) |
| sizeIncrease | №0759 (+ 1 других файлов) |
| skeleton | №0049 (+ 2 других файлов) |
| skill | №0611 (+ 13 других файлов) |
| skillAdvantage | №0624 |
| skillBonus | №0759 (+ 3 других файлов) |
| skillChoices | №0767 (+ 3 других файлов) |
| skilled | №0646 (+ 1 других файлов) |
| skilledRider | №0762 |
| skillId | №0755 |
| skillModifiers | №0624 |
| skillProficiency | №0762 |
| skillProficient | №0638 (+ 1 других файлов) |
| skills | №0607 (+ 26 других файлов) |
| skillsChoose | №0061 (+ 1 других файлов) |
| skillsData | №0607 (+ 2 других файлов) |
| skiltKrigga | №0762 |
| skin | №0041 (+ 8 других файлов) |
| skin_names | №1088 |
| skinCompatible | №0049 |
| skinDetail | №0049 (+ 6 других файлов) |
| skinFamily | №0049 |
| skinGlow | №0049 (+ 2 других файлов) |
| skinId | №0049 (+ 1 других файлов) |
| skinMaterial | №0049 |
| skinned_primitives | №1088 |
| skinPositions | №0041 |
| skins | №0051 (+ 4 других файлов) |
| skinSurface | №0046 (+ 5 других файлов) |
| skipDefeated | №0766 |
| skirt | №0045 |
| skirtProfile | №0045 |
| slamDamage | №0762 |
| slamMagical | №0762 |
| slash | №0057 (+ 1 других файлов) |
| slashing | №0854 |
| slashTexture | №0059 |
| slaymateRitual | №0792 |
| sleep | №0762 (+ 1 других файлов) |
| Sleep | №0063 |
| sleepImmune | №0801 |
| sleepUntilStartNextTurnOrDamage | №0762 |
| sleepwalker | №0762 |
| sleeves | №0045 (+ 2 других файлов) |
| sleightBonus | №0762 |
| sleightingImprecation | №0762 |
| sleightOfHand | №0755 (+ 1 других файлов) |
| slick_back | №0044 (+ 1 других файлов) |
| slime | №0046 |
| slimeCovered | №0061 |
| slimeFiber | №0809 |
| slimeReagent | №0809 |
| slipperyMind | №0631 |
| slipTurns | №0804 |
| slit | №1057 (+ 2 других файлов) |
| slitHeight | №1057 (+ 1 других файлов) |
| slot | №0045 (+ 9 других файлов) |
| slotKind | №0631 |
| slotLevel | №0624 (+ 12 других файлов) |
| slotLevels | №1186 |
| slots | №0045 (+ 8 других файлов) |
| slotsByLevel | №0792 |
| slotSpent | №0796 |
| slotsRefresh | №0827 |
| slotsUsed | №0769 |
| slowFall | №0631 |
| slowFt | №0624 |
| small | №0050 (+ 2 других файлов) |
| smith | №0651 (+ 7 других файлов) |
| smoke | №0061 |
| smokeBomb | №0762 |
| smokeCloud | №0061 |
| snapshot | №0636 (+ 10 других файлов) |
| snapshots | №0061 |
| sneakApplied | №0638 (+ 1 других файлов) |
| sneakAttack | №0631 |
| sneakAttackDice | №0769 (+ 1 других файлов) |
| sneakEligible | №1186 |
| sneakStyle | №0837 |
| snout | №0044 |
| social | №0611 (+ 12 других файлов) |
| socialAdvantage | №0759 |
| socialBonus | №0792 |
| socket | №0044 |
| socks | №0045 (+ 3 других файлов) |
| solidified | №0762 |
| soloShieldAC | №0762 |
| solvent | №0061 |
| somatic | №0743 (+ 10 других файлов) |
| somaticMaterialFree | №0762 |
| somnolence | №0762 |
| songOfRest | №0631 |
| songsOfWarPeace | №0762 |
| soothingSpeech | №0762 |
| sorcerer | №0781 (+ 1 других файлов) |
| sorcerousOriginMastery | №0631 |
| sorcerousRestoration | №0631 |
| sorceryPoints | №0631 (+ 2 других файлов) |
| sort | №0776 |
| soulEater | №0624 (+ 1 других файлов) |
| soulOfArtifice | №0631 |
| soulSight | №0796 |
| soulToyConversion | №0792 |
| source | №0041 (+ 110 других файлов) |
| SOURCE | №0649 |
| SOURCE_TAG | №0653 |
| sourceDead | №0852 |
| sourceDisplacementMax | №1096 |
| sourceDisplacementMean | №1096 |
| sourceFor | №0064 |
| sourceGlb | №1085 |
| sourceGlbSha256 | №1268 |
| sourceHashes | №1268 |
| sourceId | №0060 (+ 20 других файлов) |
| sourceIndices | №0044 |
| sourceKey | №0778 |
| sourceLabel | №0611 (+ 10 других файлов) |
| sourceMaxDisplacement | №1095 |
| sourceMeanDisplacement | №1095 |
| sourceMeshes | №0046 |
| sourceName | №0683 (+ 3 других файлов) |
| sourceNonZeroEntries | №1095 |
| sourcePack | №0611 (+ 11 других файлов) |
| sourcePacks | №0613 (+ 2 других файлов) |
| sourceProject | №1268 |
| sourceQuantity | №0647 |
| sourceRule | №0064 |
| sources | №0064 (+ 12 других файлов) |
| sourceSha256 | №1090 |
| sourceStackTerms | №1268 |
| sourceTarget | №1085 |
| sourceType | №0061 (+ 15 других файлов) |
| sourceVersion | №0709 (+ 3 других файлов) |
| sovereignOfFate | №0762 |
| sp | №0773 (+ 5 других файлов) |
| space | №0822 |
| span | №0044 |
| sparse | №1086 |
| spatialManipulation | №0762 |
| speakWithBeastsAndPlants | №0762 |
| special | №0651 |
| specialization | №0653 (+ 2 других файлов) |
| specializationBonus | №0653 |
| specializationList | №0653 |
| specializations | №0653 |
| specialReactionPerOtherCreatureTurn | №0762 |
| specialSightFt | №0801 |
| specialtyTags | №0650 |
| species | №0044 (+ 4 других файлов) |
| spectral | №0044 |
| spectralFiber | №0650 (+ 1 других файлов) |
| spectralIndices | №0044 |
| spectralMounts | №0792 |
| spectralParts | №0044 |
| spectralReagent | №0809 |
| spectralThreadV49 | №0650 |
| speed | №0607 (+ 36 других файлов) |
| Speed | №0063 |
| speedBonus | №0762 |
| speedBonusFt | №0624 (+ 1 других файлов) |
| speedDouble | №0762 |
| speedFt | №0794 |
| speedHalf | №0762 |
| speedMultiplier | №0792 (+ 1 других файлов) |
| speedPenalty | №0624 |
| speedPenaltyFt | №0624 (+ 1 других файлов) |
| speedReductionFt | №0669 |
| speedZeroSave | №0762 |
| spell | №0631 (+ 6 других файлов) |
| spellAttack | №0762 (+ 3 других файлов) |
| spellAttackBonus | №0762 (+ 2 других файлов) |
| spellAttackUsesWisdom | №0762 |
| spellblade | №0762 (+ 1 других файлов) |
| Spellblade | №0778 |
| spellbladeSource | №0778 |
| spellCaster | №0794 (+ 1 других файлов) |
| spellcasting | №0690 (+ 10 других файлов) |
| spellcastingAbility | №0061 |
| spellcastingFocus | №0762 |
| spellDamageModifiers | №0631 (+ 2 других файлов) |
| spellDamageVulnerability | №0762 |
| spellHealingOrDamage | №0796 |
| spellId | №0638 (+ 7 других файлов) |
| spellLevel | №0631 (+ 10 других файлов) |
| spellLevelCap | №0796 |
| spellLevelMax | №0762 |
| spellLevels | №0796 |
| spellList | №0786 |
| spellLists | №0697 |
| spellMastery | №0631 |
| spellName | №0638 (+ 18 других файлов) |
| spells | №0769 (+ 11 других файлов) |
| spellSaveDC | №0762 (+ 2 других файлов) |
| spellsData | №0607 (+ 4 других файлов) |
| spellsDoNotCountAgainstKnown | №0762 |
| Spellshot | №0778 |
| spellsKnown | №0690 (+ 2 других файлов) |
| spellSlotKind | №0631 |
| spellSlotLevel | №0631 |
| spellSlots | №0631 (+ 2 других файлов) |
| spellSlotsData | №0607 (+ 14 других файлов) |
| spellSlotSubstitute | №0792 |
| spellSlotTable | №0810 (+ 1 других файлов) |
| spellSources | №0810 |
| spellStat | №0607 (+ 1 других файлов) |
| spellStats | №0810 |
| spellStoringItem | №0631 |
| spellstrike | №0762 |
| spellTable | №0624 |
| spellUses | №0786 |
| spellUsesByLevel | №0786 |
| Spellweaver | №0778 |
| spend | №0766 |
| spendAction | №0766 |
| spendCharges | №0762 |
| spendDynamo | №0061 |
| spendExtendedResource | №0631 |
| spendMovement | №0766 |
| spendMovementReward | №0804 |
| spendReaction | №0801 |
| spendResource | №0810 |
| spendSpellSlot | №0762 |
| spent | №0669 (+ 4 других файлов) |
| spices | №0656 |
| spider | №0669 |
| spiderSilk | №0650 (+ 1 других файлов) |
| spines | №0049 |
| spiral | №0049 |
| spirit | №0827 (+ 1 других файлов) |
| spiritAttacks | №0767 |
| spiritCommunication | №0796 |
| spiritDamage | №0796 |
| spiritDamageBonus | №0796 |
| spiritForm | №0767 |
| spiritHP | №0767 |
| spiritMantle | №0827 |
| spiritMaxHP | №0767 |
| spiritRangeFt | №0796 |
| spiritTypes | №0690 |
| spiritualDefense | №0827 |
| splashDice | №0061 |
| split | №0762 |
| splitAmongTargets | №0762 |
| splitDamage | №0762 |
| sporeling | №0669 |
| spread | №0041 |
| springSteel | №0656 |
| spurredArmy | №0762 |
| square | №0046 (+ 1 других файлов) |
| squaredCircle | №0699 |
| src | №0065 (+ 4 других файлов) |
| stability | №0063 (+ 1 других файлов) |
| Stability | №0063 |
| stable | №0784 (+ 2 других файлов) |
| stack | №0050 (+ 1 других файлов) |
| stacks | №0669 |
| stage | №0767 (+ 3 других файлов) |
| stage10 | №0061 |
| staged | №0825 |
| stair | №0050 |
| stairFrom | №0059 |
| stairHeight | №1117 |
| stairs | №0050 |
| stairTo | №0059 |
| stale | №0848 |
| stalkersProwess | №0624 |
| stalwartDefender | №0762 |
| stalwartSpirit | №0854 |
| stance | №0762 (+ 2 других файлов) |
| stanceRadiusFt | №0762 |
| stand | №0050 |
| standard | №0648 (+ 2 других файлов) |
| standingJump | №0762 |
| standTheFallen | №0762 |
| standUp | №0762 |
| start | №0697 |
| startActorTurn | №0624 |
| startedAt | №0845 |
| startedAtTurn | №0061 |
| startElevation | №0801 |
| startingEquipment | №0061 (+ 3 других файлов) |
| startLevel | №0816 |
| startlingJinx | №0762 |
| startTurn | №0060 (+ 13 других файлов) |
| startTurnDamage | №0762 |
| startTurnHeal | №0762 |
| startTurnHealing | №0762 |
| startTurnNecrotic | №0762 |
| startX | №0801 (+ 1 других файлов) |
| startY | №0801 (+ 1 других файлов) |
| stat | №0060 (+ 19 других файлов) |
| STAT_ALIASES | №0810 |
| STAT_META | №0852 |
| statblock | №0061 |
| statBlock | №0816 (+ 1 других файлов) |
| statBonus | №0729 (+ 4 других файлов) |
| state | №0638 (+ 18 других файлов) |
| stateRevision | №0793 (+ 6 других файлов) |
| states | №0822 |
| stats | №0607 (+ 47 других файлов) |
| status | №0815 (+ 55 других файлов) |
| STATUS | №0061 |
| steadfastOrder | №0762 |
| steadfastToughness | №0854 |
| stealth | №0755 (+ 1 других файлов) |
| stealthAdvantage | №0762 |
| stealthBonus | №0762 |
| stealthDisadvantage | №0067 |
| steed | №0640 |
| steel | №0651 (+ 3 других файлов) |
| steelBillet | №0656 |
| steelWire | №0656 |
| steelWireV38 | №1078 |
| stencil | №0056 |
| step | №0058 (+ 1 других файлов) |
| stepWind | №0631 |
| stickAndMove | №0762 |
| stillnessOfMind | №0631 |
| stock | №0782 (+ 2 других файлов) |
| stockCount | №0783 |
| stocky | №0049 |
| stolenSpark | №0762 |
| stone | №0050 (+ 4 других файлов) |
| Stoneblood | №0778 |
| stonecutter | №0784 (+ 1 других файлов) |
| stoneDust | №0655 |
| stoneForm | №0762 |
| stoneFormToggle | №0762 |
| stoneReductionAppliesToMagic | №0762 |
| stoneToFlesh | №0762 |
| stool | №0050 |
| stop | №0830 |
| stopIntruder | №0759 |
| stopOnDefeat | №0766 (+ 3 других файлов) |
| stopped | №0801 (+ 1 других файлов) |
| storage | №0796 (+ 2 других файлов) |
| STORAGE_KEY | №0649 |
| stored | №0792 |
| storedHealingMax | №0762 |
| storm | №0624 |
| str | №0607 (+ 60 других файлов) |
| straight | №0049 |
| straightLine | №0762 |
| strands | №1223 |
| strangeMetabolism | №0624 |
| strategicAdjustments | №0762 |
| strategist | №0722 (+ 1 других файлов) |
| strBonus | №0624 |
| strChecksDisadvantage | №0624 (+ 1 других файлов) |
| strDexChecksDisadvantage | №0624 (+ 1 других файлов) |
| strDexSaveAdvantage | №0762 |
| stream | №0869 |
| streetSmart | №0699 |
| streetwise | №0762 |
| strength | №0769 (+ 10 других файлов) |
| Strength | №0063 |
| strengthAdvantage | №0801 |
| strengthFloor | №0801 |
| strengthInNumbers | №0762 |
| strengthMaxBonus | №0762 |
| strengthOrDexterity | №0681 (+ 3 других файлов) |
| strenuous | №0064 (+ 1 других файлов) |
| stressPressure | №0612 |
| strikeDice | №0762 |
| strIncrease | №0762 |
| strMaxBonus | №0624 |
| strMaxIncrease | №0762 |
| strokeOfLuck | №0631 |
| strongbow | №0762 |
| strOrDexSave | №0762 |
| strSave | №0762 |
| strSavesDisadvantage | №0624 (+ 1 других файлов) |
| stubble | №0044 (+ 1 других файлов) |
| student | №0759 |
| stun | №0759 |
| stunIfFailedBy5 | №0624 |
| stunned | №0762 (+ 2 других файлов) |
| stunnedUntilEndOfNextTurn | №0762 |
| stunning | №0762 |
| stunningStrike | №0631 (+ 1 других файлов) |
| stunOnFail | №0762 |
| stunOnFailBy5 | №0762 |
| style | №0762 (+ 32 других файлов) |
| styles | №0796 |
| subclass | №0769 (+ 18 других файлов) |
| SUBCLASS_FEATURES | №0631 |
| subclassBonds | №0669 |
| subclassDeepMagic | №0681 |
| subclasses | №0060 (+ 24 других файлов) |
| subclassFeature | №0759 |
| subclassFeatureCatalog | №0699 |
| subclassFeatureIdResolution | №0660 |
| subclassFeatureLevels | №0060 (+ 20 других файлов) |
| subclassId | №0644 (+ 2 других файлов) |
| subclassLevel | №0060 (+ 41 других файлов) |
| subclassSystem | №0660 (+ 4 других файлов) |
| subclassUse | №0762 |
| subjugateThrall | №0762 |
| subtle | №0631 (+ 1 других файлов) |
| subtractD8 | №0762 |
| subtractHemocraftDie | №0624 |
| subtree | №0775 (+ 3 других файлов) |
| success | №0061 (+ 24 других файлов) |
| successes | №0638 (+ 13 других файлов) |
| successorClientId | №1204 |
| successTempHp | №0762 |
| suit | №0804 |
| suite | №0837 |
| summary | №0611 (+ 12 других файлов) |
| summon | №0759 (+ 3 других файлов) |
| summonDevilJurist | №0762 |
| summonFamiliar | №0762 |
| summonFiendAt0HP | №0762 |
| summonOoze | №0061 |
| summonSpellId | №0813 |
| sunAura | №0801 |
| sunlightAttackAndPerceptionDisadvantage | №0762 |
| sunlightAttackAndSightDisadvantage | №0624 |
| sunlightHazard | №0792 |
| Sunwatcher | №0778 |
| superior | №0648 |
| superiorInspiration | №0631 |
| superiorInterdict | №0681 |
| superiorInterdictRestore | №0681 |
| superiorityDice | №0631 |
| supernal | №0762 (+ 1 других файлов) |
| supported | №0041 (+ 1 других файлов) |
| supportFetchAPI | №0869 |
| supportRangeFt | №0762 |
| suppressAilments | №0762 |
| suppressResistanceAndImmunity | №0762 |
| surface | №0049 |
| surfaceMaxDistance | №1094 (+ 1 других файлов) |
| surfaceMeanDistance | №1085 (+ 3 других файлов) |
| surfaceMedianDistance | №1085 (+ 3 других файлов) |
| surfaceP95Distance | №1085 (+ 3 других файлов) |
| surpriseAttack | №0762 |
| surveySettlement | №0762 |
| surveyWilderness | №0762 |
| survival | №0755 (+ 2 других файлов) |
| survive | №0718 |
| survivor | №0631 |
| sutureCost | №0792 |
| sutureOptions | №0792 |
| swamp | №0046 (+ 2 других файлов) |
| swapCard | №0804 |
| swappedTurns | №0804 (+ 1 других файлов) |
| swapWithThrallRangeFt | №0792 |
| swarm | №0044 (+ 2 других файлов) |
| swarm_bats | №1235 |
| swarm_beetles | №1235 |
| swarm_rats | №1235 |
| swarmCore | №0044 |
| swarmFloor | №0044 |
| swarmForm | №0046 (+ 3 других файлов) |
| swarmParts | №0044 |
| swarmPercent | №0046 (+ 3 других файлов) |
| swarmUnit | №0044 |
| swarmVortex | №0044 |
| sweep | №0044 (+ 1 других файлов) |
| sweepAttack | №0762 |
| sweepingStrike | №0762 |
| sweetDreams | №0762 |
| sweetScience | №0699 |
| swept | №0049 |
| swift | №0762 |
| Swiftblade | №0778 |
| swiftJinx | №0762 |
| swimFt | №0624 |
| swimSpeed | №0762 |
| swimSpeedEqualsWalking | №0762 |
| swine | №0757 |
| switchAlly | №0762 |
| swords | №0801 (+ 1 других файлов) |
| symbiosis | №0799 |
| sync | №0061 (+ 19 других файлов) |
| syncClassResources | №0631 |
| syncFromInitiative | №1147 |
| syncState | №0060 |
| synergy | №0062 |
| t | №0041 (+ 1 других файлов) |
| tab | №0832 (+ 3 других файлов) |
| table | №0050 (+ 18 других файлов) |
| tacticalExploit | №0722 |
| tacticalReposition | №0762 |
| tacticalSkill | №0722 |
| tacticalSuperiority | №0722 |
| tactician | №0765 (+ 1 других файлов) |
| Tactician | №0778 |
| tag | №0044 (+ 1 других файлов) |
| tagName | №1183 |
| tags | №0044 (+ 28 других файлов) |
| tail | №0044 |
| tailColor | №0049 (+ 3 других файлов) |
| tailCurve | №0049 (+ 1 других файлов) |
| tailLength | №0049 (+ 5 других файлов) |
| tailoring | №0045 |
| tailThickness | №0049 (+ 3 других файлов) |
| tailTip | №0046 (+ 1 других файлов) |
| tailTuftSize | №0049 (+ 1 других файлов) |
| takeAttack | №0818 |
| talent | №0762 |
| talentProgression | №0697 |
| talents | №0697 (+ 1 других файлов) |
| tannin | №0656 |
| target | №0044 (+ 44 других файлов) |
| targetAc | №0794 (+ 3 других файлов) |
| targetCount | №0762 |
| targetDefeated | №0638 (+ 3 других файлов) |
| targetedAllyAdvantage | №0762 |
| targetEntries | №1095 (+ 1 других файлов) |
| targetExtraRadiant | №0786 |
| targetFile | №1095 (+ 1 других файлов) |
| targetId | №0043 (+ 29 других файлов) |
| targetKey | №0060 |
| targetLevel | №0683 |
| targetMode | №0850 |
| targetName | №0767 (+ 2 других файлов) |
| targetOncePerLongRest | №0792 |
| targetPeerId | №0794 |
| targetRadiantDamage | №0762 |
| targetRequired | №0762 |
| targets | №0061 (+ 12 других файлов) |
| targetSelfOrTouch | №0762 |
| targetsFatigueRadiusFt | №0762 |
| targetsUpTo | №0762 |
| targetTurns | №0624 |
| targetType | №0796 |
| tarotEffects | №1077 |
| tarotKnowledge | №1077 |
| tarotLastStartedTurn | №1077 |
| tarotModeApplied | №0638 |
| tarotScene | №0638 (+ 4 других файлов) |
| taunt | №0759 (+ 1 других файлов) |
| team | №0061 (+ 7 других файлов) |
| teamAttackBonus | №0801 |
| techniques | №0818 |
| telekinesis | №0759 (+ 1 других файлов) |
| telekinesisLiftBonus | №0762 |
| telekinetic | №0765 |
| telekineticForce | №0762 |
| telekineticPush | №0762 |
| telepathic | №0765 |
| telepathicIntrusion | №0762 |
| telepathicIntrusionSave | №0762 |
| telepathy | №0762 |
| telepathyFt | №0759 |
| teleport | №0061 |
| teleportAllyId | №0802 (+ 2 других файлов) |
| teleportBetweenPaint | №0061 |
| teleportDamage | №0762 |
| teleported | №0801 |
| teleportFt | №0669 (+ 3 других файлов) |
| teleportNearTarget | №0762 |
| teleportRangeFt | №0792 |
| teleportSave | №0762 |
| teleportToImpact | №0061 |
| teleportWithFamiliar | №0796 |
| temp | №0769 (+ 3 других файлов) |
| tempAbsorbed | №0638 |
| temperament | №0784 |
| tempHp | №0061 (+ 19 других файлов) |
| tempHP | №0796 (+ 3 других файлов) |
| tempHpAtStartTurn | №0762 |
| tempHpBonus | №0762 |
| tempHpDice | №0762 |
| tempHpEach | №0762 |
| tempHpFromCharnel | №0792 |
| tempHpFromLightningDamage | №0762 |
| tempHpFromSealDamage | №0762 |
| tempHpOnApplause | №0759 |
| tempHpOnEnemyReducedToZero | №0762 |
| tempHpOnWake | №0762 |
| tempHpPerDie | №0762 |
| template | №0044 |
| templateNormals | №0044 |
| templates | №0640 |
| temple | №0784 (+ 1 других файлов) |
| temporary | №0762 |
| temporaryHp | №0765 |
| temporaryHP | №0061 |
| terrain | №0861 |
| terrorAndDecay | №0762 |
| terrorDie | №0762 |
| terrorizingForce | №0681 |
| test | №1049 |
| testMode | №0825 (+ 1 других файлов) |
| tests | №0837 |
| tethered | №0762 |
| TEXCOORD_0 | №1091 |
| texLoc | №0056 |
| text | №0795 (+ 1 других файлов) |
| textContent | №1183 |
| textile | №0653 |
| texture | №0045 (+ 4 других файлов) |
| Texture | №0053 |
| textures | №0056 |
| textureTile | №0045 |
| thaumaturgy | №0762 |
| thaumaturgyEnhanced | №0792 |
| thenResistance | №0624 |
| thievesToolsBonus | №0762 |
| thieving | №0762 |
| thighL | №0042 |
| thighR | №0042 |
| thirdDisciplineLevel | №0697 |
| thirdparty | №0643 |
| thornsDice | №0852 |
| thrallAdvantage | №0792 |
| thrallAura | №0792 |
| thrallDance | №0792 |
| thrallDeathExplosion | №0792 |
| thrallEthereal | №0792 |
| thrallFlight | №0792 |
| thrallInvisible | №0792 |
| thralls | №0792 |
| thrallSlots | №0792 |
| thrallType | №0792 |
| thrallTypes | №0792 |
| thread | №0650 (+ 4 других файлов) |
| thresholds | №0788 |
| thrillOfTheHunt | №0762 |
| thrownRange | №0762 |
| thunder | №0631 |
| tiedMaximumsAllActive | №0852 |
| tier | №0648 |
| tights | №0045 |
| tile | №0045 |
| tiles | №0054 (+ 1 других файлов) |
| time | №0044 (+ 13 других файлов) |
| timelessBody | №0631 |
| timeMinutes | №1047 |
| timeout | №1087 (+ 35 других файлов) |
| timer | №0830 |
| times | №0051 |
| tinker | №0653 (+ 3 других файлов) |
| tinkerer | №0654 |
| tinOre | №0656 |
| tiny | №0799 (+ 1 других файлов) |
| tinyServant | №1140 |
| tissue | №0041 (+ 1 других файлов) |
| title | №0625 (+ 5 других файлов) |
| to | №0615 (+ 2 других файлов) |
| toad | №0669 |
| toggle | №0643 (+ 1 других файлов) |
| toggleCondition | №0638 (+ 3 других файлов) |
| toHit | №0857 (+ 3 других файлов) |
| token | №0636 (+ 3 других файлов) |
| tokenList | №1182 (+ 2 других файлов) |
| tokens | №0054 (+ 18 других файлов) |
| tombGuardian | №0762 |
| tool | №0609 (+ 20 других файлов) |
| toolBonus | №0791 |
| toolMastery | №0801 |
| toolName | №1047 |
| toolProficiencies | №0607 (+ 2 других файлов) |
| toolRequired | №0861 |
| tools | №0061 (+ 27 других файлов) |
| toolsAdvantage | №0801 |
| top | №0046 (+ 12 других файлов) |
| top10LargestMapped | №1096 |
| topknot | №0044 (+ 1 других файлов) |
| topY | №0045 |
| torso | №0044 (+ 2 других файлов) |
| torsoRidgeSize | №0049 (+ 4 других файлов) |
| torsoRidgeWidth | №0049 (+ 2 других файлов) |
| tortle | №1252 |
| total | №0611 (+ 53 других файлов) |
| total_length | №1088 |
| totalCp | №0782 |
| totalDomination | №0762 |
| totalGp | №0785 |
| totalLeather | №0646 |
| totalLength | №1097 |
| totalLevel | №0810 |
| totemSpirit | №0631 |
| toTheMat | №0762 |
| touchCurseThreshold | №0792 |
| touchedGlbVertexPct | №1096 |
| touchedGlbVertices | №1096 |
| touchMaxHpCut | №0792 |
| touchParalyzeThreshold | №0792 |
| touchRangeBonusFt | №0792 |
| touchThreshold | №0792 |
| towerShield | №0854 |
| town | №0050 |
| toxins | №0653 |
| toyArmy | №0792 |
| toymaker | №0792 |
| toySoulVault | №0792 |
| track | №0065 |
| trackInscribedRunesAnyPlane | №0762 |
| traderCount | №0783 |
| traderId | №0784 |
| traders | №0782 (+ 1 других файлов) |
| TRADERS | №0782 |
| tradition | №0796 (+ 1 других файлов) |
| traditionAction | №0796 |
| traditionRites | №0690 |
| traditions | №0690 (+ 1 других файлов) |
| trainHumanoids | №0762 |
| traits | №0641 (+ 2 других файлов) |
| transactionRevision | №0794 |
| transcended | №0697 (+ 1 других файлов) |
| Transcended | №0778 |
| transfer | №0799 |
| transferCondition | №0762 |
| transferDamage | №0762 |
| transferringAffliction | №0762 |
| transform | №0792 |
| translation | №1052 |
| transport | №0793 |
| transposition | №0762 |
| traps | №0653 |
| treasure | №0050 |
| triangles | №0046 (+ 4 других файлов) |
| trickster | №0804 (+ 2 других файлов) |
| tricksterStatus | №0804 |
| trigger | №0762 (+ 3 других файлов) |
| triggerDamageTypes | №0624 |
| triggerHealing | №0786 |
| triggerId | №0638 (+ 2 других файлов) |
| triggerMiraculousHealing | №0762 |
| triggerOnNearbyKill | №0624 |
| triggerOnPsychicDamage | №0762 |
| triggerSpend | №0792 |
| trough | №0050 |
| trousers | №0045 |
| trueSight | №0796 |
| truesightFt | №0762 |
| trunkSize | №0049 (+ 1 других файлов) |
| truth | №0786 |
| ts | №0834 |
| turn | №0792 |
| turned | №0631 |
| turnEnd | №0801 |
| turnId | №1123 |
| turnIds | №0804 (+ 1 других файлов) |
| turnResources | №0061 (+ 31 других файлов) |
| turns | №0624 |
| turnStart | №0801 |
| turnUndead | №0631 |
| turtle | №0044 |
| tuskSize | №0049 (+ 2 других файлов) |
| twin_braids | №0044 (+ 1 других файлов) |
| twin_tails | №0044 (+ 1 других файлов) |
| twinFamiliar | №0762 |
| twinned | №0631 |
| twoRevelations | №0796 |
| type | №0053 (+ 103 других файлов) |
| typedDice | №0801 |
| typedExtraDice | №0061 (+ 4 других файлов) |
| typeKey | №0857 (+ 3 других файлов) |
| types | №0657 |
| u | №0044 (+ 1 других файлов) |
| uiGather | №0064 |
| uiRequired | №0697 |
| umbralImprecation | №0762 |
| unarmed | №0762 |
| unarmedAttack | №0624 (+ 3 других файлов) |
| unarmedAttackBonus | №0762 |
| unarmedDamage | №0762 |
| unarmedGraft | №1047 |
| unarmoredAC | №0762 |
| unavailable | №0060 (+ 11 других файлов) |
| unavoidableAccident | №0762 |
| unbreakable | №0624 (+ 2 других файлов) |
| Unbreakable | №0762 |
| unbreakableExploit | №0762 |
| unbridledChaos | №0762 |
| uncannyDodge | №0631 |
| unchanged | №1090 |
| uncommon | №0776 (+ 5 других файлов) |
| unconsciousAtFatigueGteCurrentHp | №0762 |
| unconsciousOrStunnedOnly | №0762 |
| undead | №0611 (+ 15 других файлов) |
| undeadFocusAvailable | №0624 |
| undeadFocusReaction | №0624 |
| undercut | №0044 (+ 1 других файлов) |
| underdark | №0046 |
| underwaterDarkvision | №0816 |
| underwear | №0045 |
| underwearBottom | №0049 (+ 5 других файлов) |
| underwearTop | №0049 (+ 6 других файлов) |
| undo | №0046 |
| undying | №0624 (+ 2 других файлов) |
| undyingServitude | №0792 |
| unequip | №0049 |
| unerringEye | №0762 |
| unfortunateAccident | №0762 |
| ungulate | №0757 |
| uniforms | №1048 |
| uniquePositionVertexCounts | №1097 |
| unit | №0044 (+ 4 других файлов) |
| unitGp | №0785 |
| units | №0782 |
| unknown | №1053 |
| unleashed | №0697 (+ 1 других файлов) |
| unlimitedHybrid | №0762 |
| unlockRank | №0653 |
| unlockSchedule | №0804 |
| unreducedNecrotic | №0762 |
| unreducedSelfDamage | №0762 |
| unreducible | №0762 |
| unrivaledGenius | №0812 |
| unsealed | №0624 |
| unsealedArcana | №0624 |
| unsealedAspectReplacement | №0827 |
| unseen | №1145 |
| unshackledPower | №0762 |
| unstable | №0062 (+ 1 других файлов) |
| unstoppable | №0854 |
| unsupported | №0060 (+ 17 других файлов) |
| until | №0061 (+ 1 других файлов) |
| untilDismissed | №0762 |
| untilOwnEnd | №0801 |
| untilOwnEndAfterNext | №0801 |
| untilOwnerEnd | №0801 (+ 1 других файлов) |
| untilOwnerStart | №0801 |
| untilOwnStart | №0801 (+ 2 других файлов) |
| untilRound | №0801 |
| unwaveringWill | №0722 |
| unyieldingResolve | №0718 |
| unyieldingWill | №0812 |
| update | №0813 (+ 1 других файлов) |
| updateAvailable | №0825 |
| updated | №0816 (+ 1 других файлов) |
| updated_at | №1077 |
| updatedAt | №0054 (+ 1 других файлов) |
| updateSwarm | №0044 |
| upperArmL | №0042 |
| upperArmR | №0042 |
| urbanAdvantage | №0759 |
| uri | №1086 |
| url | №0051 (+ 4 других файлов) |
| URL | №1158 (+ 5 других файлов) |
| urls | №0869 |
| ursine | №0757 |
| use | №0669 (+ 1 других файлов) |
| useCount | №0762 |
| used | №0607 (+ 21 других файлов) |
| usedBloodLevels | №0796 |
| usedBy | №0656 (+ 1 других файлов) |
| usedByV38 | №0655 (+ 1 других файлов) |
| usedCount | №0637 |
| usedLevels | №0796 |
| useDominantOrgan | №0852 |
| usedThisRound | №0788 |
| useFeature | №0061 (+ 16 других файлов) |
| useIntForStr | №0762 |
| useIntForStrengthOrDexOnSurge | №0762 |
| useLeadership | №0762 |
| user | №0636 (+ 1 других файлов) |
| userAgent | №0831 (+ 1 других файлов) |
| useRules | №0766 (+ 17 других файлов) |
| uses | №0681 (+ 5 других файлов) |
| usesAlchemistSupplies | №0794 |
| usesIntForPerception | №0762 |
| usesPerLongRest | №0061 (+ 2 других файлов) |
| usesPerRest | №0792 |
| usesPerTurn | №0762 |
| useSpiritAbility | №0767 |
| usesStrength | №0639 (+ 1 других файлов) |
| useStrength | №0762 |
| useStrengthWithBows | №0762 |
| useSubclassFeature | №0767 (+ 2 других файлов) |
| useTex | №1048 |
| useTexLoc | №0056 |
| uv | №0041 (+ 5 других файлов) |
| uvLoc | №0056 |
| v | №0041 (+ 2 других файлов) |
| V | №1114 |
| V52 | №1127 |
| V53 | №1128 |
| valiantLeader | №0722 |
| validate | №0803 |
| validatePack | №0644 |
| validateTurn | №0766 |
| value | №0043 (+ 23 других файлов) |
| valueMultiplier | №0648 |
| values | №0051 (+ 1 других файлов) |
| vampirism | №0060 |
| vanish | №0631 |
| variant | №0042 (+ 4 других файлов) |
| variantHooks | №0611 (+ 13 других файлов) |
| variants | №0061 (+ 2 других файлов) |
| VEC2 | №0051 (+ 4 других файлов) |
| VEC3 | №0051 (+ 4 других файлов) |
| VEC4 | №0051 (+ 4 других файлов) |
| vedalken | №0655 |
| vengefulBane | №0762 |
| venom | №0650 |
| Venom | №0063 |
| venomConcentrateV49 | №0650 |
| venomReagent | №0650 (+ 1 других файлов) |
| verbal | №0743 (+ 10 других файлов) |
| verbalBlocked | №0801 |
| verbalComponentsBlocked | №0061 |
| verify | №0636 |
| vermillion | №0624 |
| Vermillion | №0762 |
| vermin | №0757 |
| versatileAttackBonus | №0762 |
| versatileFightingAdvanced | №0762 |
| version | №0042 (+ 51 других файлов) |
| VERSION | №0042 (+ 56 других файлов) |
| vertexCount | №0046 (+ 1 других файлов) |
| vertexMask | №0042 |
| vertices | №0046 (+ 6 других файлов) |
| verticesPerRat | №0044 |
| very_rare | №0776 (+ 5 других файлов) |
| vesselMagic | №0827 |
| vessels | №0653 |
| vesselSlots | №0827 |
| vesselStrike | №0827 |
| vials | №0653 |
| victorySurgeExploit | №0762 |
| view | №0054 (+ 1 других файлов) |
| viewport | №1223 (+ 36 других файлов) |
| viewportHeight | №0046 |
| viewportWidth | №0046 |
| vileAffliction | №0762 |
| village | №0782 |
| vine | №0815 |
| vinegar | №0656 |
| violet | №0815 |
| visible | №0624 (+ 8 других файлов) |
| visibleMeleeOnly | №0762 |
| Vitality | №0063 |
| vitalitySplint | №0762 |
| voiceReagent | №0809 |
| volatility | №0063 |
| Volatility | №0063 |
| volume | №0044 (+ 1 других файлов) |
| volumes | №0044 |
| voluntarilyDetach | №0799 |
| voraciousWeapon | №0762 |
| vowOfEnmity | №0631 (+ 1 других файлов) |
| vpLoc | №0056 |
| vulnerabilities | №0638 (+ 9 других файлов) |
| vulnerability | №0624 (+ 2 других файлов) |
| vulnerable | №0833 (+ 1 других файлов) |
| w | №0041 (+ 10 других файлов) |
| wagerCurrent | №0804 |
| wagerMax | №0804 |
| wagerOdds | №0804 |
| wagers | №0804 |
| waist | №0046 (+ 6 других файлов) |
| waiveSacrificeDamage | №0762 |
| wall | №0054 |
| WALL | №0055 |
| wall_brick_red | №0055 |
| wall_concrete | №0055 |
| wall_half_timber | №0055 |
| wall_marble_dark | №0055 |
| wall_marble_light | №0055 |
| wall_moss_stone | №0055 |
| wall_old_plaster | №0055 |
| wall_plaster_dark | №0055 |
| wall_plaster_light | №0055 |
| wall_plaster_panel | №0055 |
| wall_slate | №0055 |
| wall_stone_dark | №0055 |
| wall_stone_light | №0055 |
| wall_stone_masonry | №0055 |
| wall_wallpaper | №0055 |
| wall_white_plaster | №0055 |
| wall_wood_dark | №0055 |
| wall_wood_light | №0055 |
| wallClimb | №0792 |
| walls | №0054 (+ 7 других файлов) |
| wallStart | №0609 |
| wandering | №0697 (+ 1 других файлов) |
| wands | №0801 (+ 1 других файлов) |
| wands_02 | №0801 |
| wantedCp | №0784 (+ 1 других файлов) |
| war_caster | №0765 |
| warCry | №0762 |
| ward | №0638 |
| wardAbsorbed | №0638 |
| wardDenied | №0638 |
| Warden | №0778 |
| wardenInterrupt | №0638 |
| wardenSource | №0778 |
| wardenSurvive | №0638 |
| warforged | №0655 |
| warfront | №1136 |
| warfrontEligible | №0614 |
| warlock | №0781 (+ 1 других файлов) |
| warlockLevelEquivalent | №0762 |
| Warlord | №0778 |
| warlordSource | №0778 |
| warning | №0647 |
| warPriest | №0631 |
| warriorPoet | №0762 |
| warsong | №0762 |
| warSongs | №0759 |
| waste | №0809 |
| wasteland | №0782 |
| water | №0655 (+ 1 других файлов) |
| waterBreathing | №0061 (+ 2 других файлов) |
| waterCore | №0809 |
| waterEssence | №0809 |
| wave | №0044 |
| wavy_bob | №0044 (+ 1 других файлов) |
| wavy_long | №0044 (+ 1 других файлов) |
| wax | №0651 (+ 2 других файлов) |
| Weakness | №0063 |
| weapon | №0050 (+ 13 других файлов) |
| weaponAttack | №0638 (+ 21 других файлов) |
| weaponAttackBonus | №0796 |
| weaponBonus | №0796 |
| weaponDamage | №0796 |
| weaponDamageType | №0762 |
| weaponFunctional | №1130 |
| weaponId | №0061 (+ 14 других файлов) |
| weaponMastery | №0718 |
| weaponMasteryLevels | №0718 |
| weaponOnly | №0801 |
| weaponProficiency | №0796 |
| weapons | №0776 (+ 62 других файлов) |
| weaponsData | №0607 (+ 2 других файлов) |
| weaponsmith | №0784 (+ 1 других файлов) |
| weaponTeleportIfDistanceGtFt | №0762 |
| weaponValue | №1130 |
| weaponWear | №1079 |
| wearForArmor | №0649 |
| wearForAttack | №0649 |
| wearRatio | №0648 |
| weasel | №0669 |
| weaver | №0651 (+ 6 других файлов) |
| webgl | №1231 |
| webPreferences | №0869 |
| webSecurity | №0869 |
| weight | №0048 (+ 43 других файлов) |
| weights | №0041 (+ 3 других файлов) |
| weld | №0041 |
| White | №0759 (+ 1 других файлов) |
| whiteHot | №0762 |
| width | №0046 (+ 48 других файлов) |
| wildCharge | №0762 |
| wildernessIntel | №0762 |
| wildMagicSurge | №0631 |
| wildShape | №0631 (+ 1 других файлов) |
| wildspace | №0613 (+ 1 других файлов) |
| wildspaceEligible | №0613 |
| wildwood | №0046 |
| willControlledBy | №0852 |
| willingTargetIds | №0802 (+ 1 других файлов) |
| window | №0050 (+ 76 других файлов) |
| wingColor | №0049 (+ 3 других файлов) |
| wingSize | №0049 (+ 1 других файлов) |
| wis | №0607 (+ 52 других файлов) |
| wisChecksAdvantage | №0624 (+ 1 других файлов) |
| wisChecksDisadvantage | №0624 (+ 1 других файлов) |
| wisdom | №0769 (+ 9 других файлов) |
| wisdomCheckAdvantage | №0796 |
| wisdomSaveAdvantage | №0762 |
| wisSave | №0762 |
| wisSavesDisadvantage | №0624 (+ 1 других файлов) |
| Witch | №0690 |
| witchCurse | №0762 |
| witchItemFlySpeed | №0792 |
| with | №0788 |
| withering | №0061 |
| withFileTypes | №0871 (+ 1 других файлов) |
| within10CellsPct | №1094 |
| within2CellsPct | №1094 |
| within5CellsPct | №1094 |
| within5GridCellsPct | №1099 |
| withinCellPct | №1094 |
| withinGridCellPct | №1099 |
| wizard | №0781 (+ 1 других файлов) |
| won | №0804 |
| wood | №0050 (+ 6 других файлов) |
| woodcarver | №0653 (+ 3 других файлов) |
| wooden | №0050 |
| woodwork | №0651 (+ 1 других файлов) |
| wool | №0045 |
| wordsOfAdamance | №0762 |
| wordsOfBenediction | №0762 |
| wordsOfDamnation | №0762 |
| wordsOfDomination | №0762 |
| wordsOfLegend | №0762 |
| wordsOfMayhem | №0762 |
| wordsOfZeal | №0762 |
| worg | №0669 |
| worldActor | №0057 |
| worldId | №0861 |
| worldMatrices | №0051 |
| worn | №0647 |
| wrapS | №0046 (+ 1 других файлов) |
| wrapT | №0046 (+ 1 других файлов) |
| wretchedCastigation | №0762 |
| writable | №0801 |
| write | №0061 (+ 1 других файлов) |
| x | №0044 (+ 38 других файлов) |
| xanathar | №0611 |
| xenoNecroticReady | №1046 |
| xp | №0611 (+ 16 других файлов) |
| xpFor | №0788 |
| xu | №0041 |
| xv | №0041 |
| xx | №0041 |
| xy | №0041 |
| y | №0044 (+ 35 других файлов) |
| yaw | №0044 (+ 2 других файлов) |
| yeast | №0655 |
| yew | №0656 |
| yieldMult | №0791 |
| yieldMultiplier | №0655 |
| yu | №0041 |
| yuan_ti | №0655 |
| yv | №0041 |
| yy | №0041 |
| z | №0044 (+ 3 других файлов) |
| zealousWords | №0759 |
| zeroHp | №0801 |
| zeroHpReaction | №0638 (+ 4 других файлов) |
| zeroHpSave | №0762 |
| zincOre | №0656 |
| zoneRadiusFt | №0762 |
| zones | №0054 (+ 1 других файлов) |
| zoom | №0053 (+ 3 других файлов) |

### Ключи localStorage (26)

| Имя | Исходные файлы |
|---|---|
| dnd_app_alpha | №0815 |
| dnd_app_font | №0815 |
| dnd_app_frame_color | №0815 |
| dnd_app_frame_style | №0815 |
| dnd_app_theme | №0815 |
| dnd_autorotate_enabled | №0851 |
| dnd_autorotate_interval | №0851 |
| dnd_campaigns_v1 | №0793 (+ 1 других файлов) |
| dnd_character_appearance_draft_v1 | №1231 |
| dnd_characters | №0814 |
| dnd_current_character_id | №0814 (+ 1 других файлов) |
| dnd_custom_races | №0807 |
| dnd_debug_enabled | №0815 (+ 2 других файлов) |
| dnd_launcher_icon | №0815 (+ 2 других файлов) |
| dnd_market_v55_state | №0785 (+ 1 других файлов) |
| dnd_modal_color | №0053 (+ 1 других файлов) |
| dnd_modal_opacity | №0053 (+ 1 других файлов) |
| dnd_multi_characters_v2 | №0607 (+ 44 других файлов) |
| dnd_selected_wallpaper | №0851 |
| dnd_ui_color | №0053 (+ 1 других файлов) |
| dnd_ui_opacity | №0053 (+ 1 других файлов) |
| dnd_v53_world_id | №0861 |
| dnd_v71_onboarding_done | №0798 (+ 1 других файлов) |
| dnd_vtt_mobile_session_v67 | №1205 |
| dnd_wallpaper_dim | №0851 |
| dndContentEnabled | №0644 |

### CSS переменные (16)

| Имя | Исходные файлы |
|---|---|
| --accent-action | №0820 |
| --accent-danger | №0820 |
| --accent-primary | №0820 |
| --accent-success | №0820 |
| --bg-box | №0820 |
| --bg-card | №0820 |
| --bg-input | №0820 |
| --bg-main | №0820 |
| --border-color | №0820 |
| --border-input | №0820 |
| --dnd-frame-art | №0820 |
| --dnd-frame-color | №0820 |
| --dnd-frame-filter | №0820 |
| --text-labels | №0820 |
| --text-main | №0820 |
| --text-muted | №0820 |

### Python/Java идентификаторы (248)

| Имя | Исходные файлы |
|---|---|
| __DND_APP_BOOT_READY | №0032 |
| __name__ | №1217 (+ 2 других файлов) |
| a | №0031 |
| aa | №0031 |
| action | №1262 |
| active | №0031 (+ 1 других файлов) |
| activeFile | №0031 |
| activeRoot | №0032 |
| activeVersion | №0031 |
| activity | №0031 |
| aliases | №0031 |
| android | №1272 |
| animationClips | №1217 |
| ap | №1222 |
| apkBytes | №0031 |
| app | №1272 |
| app_path | №1272 |
| APP_VERSION | №1272 |
| archives | №1262 |
| area | №1217 |
| args | №1217 (+ 2 других файлов) |
| attributes | №1217 |
| av | №0031 |
| axis | №1217 |
| b | №0031 (+ 2 других файлов) |
| baseUrl | №0031 |
| bb | №0031 |
| binary | №1217 |
| bones | №1217 |
| buf | №0031 |
| buffer | №1217 |
| bv | №0031 |
| bytes | №0031 (+ 1 других файлов) |
| c | №0031 (+ 2 других файлов) |
| cache | №0031 |
| cacheBytes | №0031 |
| cacheKey | №0031 |
| candidates | №0031 (+ 1 других файлов) |
| canonical | №0031 |
| catalog | №1262 |
| category | №1270 |
| children | №0031 |
| choices | №1222 |
| chunk | №1217 |
| code | №1272 |
| codeCache | №0031 |
| codeCacheBytes | №0031 |
| component | №0031 |
| connectedComponents | №1217 |
| context | №0031 |
| count | №1217 (+ 1 других файлов) |
| counts | №1217 |
| current | №1272 |
| d | №1221 |
| data | №0031 (+ 1 других файлов) |
| dataBytes | №0031 |
| dataRoot | №0031 |
| default | №1222 |
| defaultFile | №0031 |
| degenerateTriangles | №1217 |
| dest | №1262 |
| detected | №1222 |
| digest | №0031 |
| dirs | №0031 |
| dndvtt_update | №0031 |
| document | №1217 |
| downloadedBytes | №0031 |
| dtype | №1217 |
| edges | №1217 |
| editorMorphs | №1217 |
| embeddedMorphChannels | №1217 |
| enabled | №0031 |
| encoding | №1222 (+ 3 других файлов) |
| ensure_ascii | №1217 (+ 5 других файлов) |
| entries | №1263 (+ 1 других файлов) |
| entry | №0031 (+ 1 других файлов) |
| errors | №1262 |
| EXCLUDE_DIRS | №1270 |
| executor | №0031 |
| exist_ok | №1217 (+ 2 других файлов) |
| expectedBytes | №0031 |
| expectedHash | №0031 |
| export_apply | №1262 |
| export_format | №1262 |
| ext | №1222 (+ 1 других файлов) |
| f | №0031 |
| faces | №1217 |
| file | №0031 (+ 1 других файлов) |
| filepath | №1262 |
| files | №0031 (+ 5 других файлов) |
| filesBytes | №0031 |
| fp | №1263 |
| GENERATED | №1270 |
| goToTab | №0032 |
| gradle | №1272 |
| gradle_path | №1272 |
| gx | №1221 |
| gy | №1221 |
| h | №1222 (+ 1 других файлов) |
| healthy | №0032 |
| height | №1221 |
| help | №1272 |
| i | №0031 (+ 1 других файлов) |
| iconId | №0031 |
| id | №0031 |
| ids | №1217 |
| image | №1221 |
| in | №0031 |
| indent | №1217 (+ 3 других файлов) |
| indexComponentType | №1217 |
| info | №0031 |
| item | №1217 (+ 1 других файлов) |
| k | №1262 |
| keepPrevious | №0031 |
| key | №1262 (+ 2 других файлов) |
| kind | №1217 (+ 1 других файлов) |
| landscapeActive | №0032 |
| len | №0031 |
| length | №0031 (+ 2 других файлов) |
| lines | №1262 |
| link | №1262 |
| loader | №0032 |
| lower | №0031 |
| m | №1222 (+ 3 других файлов) |
| manifest | №0031 (+ 1 других файлов) |
| MANIFEST | №1270 |
| MANIFEST_PATHS | №1270 |
| manifestUrl | №0031 |
| marker | №1262 |
| materials | №1217 |
| meshes | №1262 |
| meshMetadata | №1217 |
| metavar | №1272 |
| missing_ok | №1262 |
| morphNames | №1217 |
| n | №0031 (+ 1 других файлов) |
| N | №1221 |
| name | №0031 |
| nativeSeedValidated | №0031 |
| next | №0031 |
| noBackup | №0031 |
| noBackupBytes | №0031 |
| nonFiniteValues | №1217 |
| o | №0031 |
| objects | №1262 |
| offset | №1217 |
| out | №0031 (+ 4 других файлов) |
| p | №1222 (+ 1 других файлов) |
| package | №1272 |
| packageVersion | №0031 |
| parent | №0031 (+ 1 других файлов) |
| parents | №1217 (+ 2 других файлов) |
| parser | №1217 (+ 1 других файлов) |
| parts | №1217 |
| path | №0031 (+ 1 других файлов) |
| pending | №0031 |
| pixels | №1217 (+ 1 других файлов) |
| pkg | №1272 |
| pkg_path | №1272 |
| pm | №0031 |
| pores | №1221 |
| positions | №1217 |
| prefs | №0031 |
| previewRoot | №0031 |
| previous | №0031 |
| previousDir | №0031 |
| previousRequestedOrientation | №0032 |
| primitives | №1217 |
| raw | №0031 |
| rawBounds | №1217 |
| reach | №1221 |
| received | №0031 |
| records | №1262 |
| rel | №1270 |
| relative | №1262 |
| report | №1217 (+ 1 других файлов) |
| request | №0031 |
| required | №1217 (+ 1 других файлов) |
| restore | №0032 |
| return_counts | №1217 |
| return_inverse | №1217 |
| rng | №1221 |
| root | №0031 (+ 2 других файлов) |
| ROOT | №1217 (+ 4 других файлов) |
| root_url | №1222 |
| rootEntries | №0031 |
| roots | №1217 |
| rough | №1221 |
| RUNTIME_MANIFEST | №1270 |
| s | №0031 (+ 1 других файлов) |
| schema | №1217 |
| seamDuplicates | №1217 |
| seen | №1222 |
| selected | №0031 |
| selectedIndex | №0031 |
| separators | №1263 (+ 1 других файлов) |
| sha256 | №1217 |
| skins | №1217 |
| skipped | №1262 |
| src | №0031 |
| stack | №0031 |
| staged | №0031 |
| stageRoot | №0031 |
| standalone | №1262 |
| state | №0031 |
| strides | №1217 |
| target | №0031 (+ 2 других файлов) |
| temp | №1262 |
| text | №1222 (+ 2 других файлов) |
| ti | №0031 |
| title | №0032 |
| topology | №1217 |
| total | №0031 |
| totalBytes | №0031 |
| totalFiles | №0031 |
| triangles | №1217 |
| type | №0031 (+ 2 других файлов) |
| uniquePositions | №1217 |
| unit | №0031 |
| units | №0031 |
| updateBytes | №0031 |
| updater | №0032 |
| updateRoot | №0031 |
| url | №0031 |
| use_global | №1262 |
| use_selection | №1262 |
| uv | №1217 |
| uvOutsideUnitSquare | №1217 |
| uvRange | №1217 |
| value | №0031 |
| version | №0031 (+ 1 других файлов) |
| VERSION | №1270 |
| versionName | №0031 |
| versions | №0031 |
| versionsBytes | №0031 |
| vertices | №1217 |
| view | №1217 |
| visited | №0031 |
| VTT_PROJECT_MANIFEST_V70 | №1263 (+ 1 других файлов) |
| webView | №0032 |
| weights | №1217 |
| weightSumMaxError | №1217 |
| weldedBoundaryEdges | №1217 |
| weldedNonManifoldEdges | №1217 |
| weldTolerance | №1217 |
| width | №1217 |
| z | №1272 |
| zeroWeightVertices | №1217 |

### JSON поля (291)

| Имя | Исходные файлы |
|---|---|
| action | №0740 |
| african | №0901 |
| age | №0901 |
| allManifestEntriesMatchPhysicalZIP | №0888 (+ 1 других файлов) |
| allowToChangeInstallationDirectory | №1035 |
| allUnpackedSizesAndSHA256 | №0888 (+ 1 других файлов) |
| androidDebug | №0905 |
| androidSignedRelease | №0905 |
| animationClips | №0894 |
| app | №1273 (+ 1 других файлов) |
| appId | №1035 |
| arch | №1035 |
| archiveBytes | №0888 (+ 1 других файлов) |
| armLength | №0069 (+ 1 других файлов) |
| armLength-decr | №0069 (+ 1 других файлов) |
| armLength-incr | №0069 (+ 1 других файлов) |
| arms | №0069 (+ 1 других файлов) |
| artifact | №0888 (+ 1 других файлов) |
| artifactBytes | №0888 (+ 1 других файлов) |
| artifactDigest | №0888 (+ 1 других файлов) |
| artifactName | №1035 |
| asar | №1035 |
| asian | №0901 |
| assetId | №0734 (+ 6 других файлов) |
| attributes | №0894 |
| audit | №0901 |
| author | №0734 (+ 5 других файлов) |
| backslash | №0738 |
| backslashTexture | №0738 |
| balanced | №1084 |
| baseColorFactor | №0894 |
| baseObj | №0069 (+ 1 других файлов) |
| basePositionsSha256 | №0069 (+ 1 других файлов) |
| baseUrl | №1273 (+ 1 других файлов) |
| binary | №0069 (+ 1 других файлов) |
| binarySha256 | №0069 (+ 1 других файлов) |
| binaryTransfer | №0903 |
| blockedVersions | №1273 (+ 1 других файлов) |
| bones | №0894 |
| breast-volume-decr | №0069 (+ 1 других файлов) |
| breast-volume-incr | №0069 (+ 1 других файлов) |
| breastSize | №0069 (+ 1 других файлов) |
| build | №1035 |
| bytes | №1277 (+ 8 других файлов) |
| category | №1277 |
| caucasian | №0901 |
| cell | №0734 (+ 8 других файлов) |
| changedVertices | №0901 (+ 1 других файлов) |
| channel | №1273 (+ 1 других файлов) |
| channels | №0069 (+ 1 других файлов) |
| chest | №0894 (+ 2 других файлов) |
| chromiumQA | №0888 |
| commit | №0069 (+ 1 других файлов) |
| compositeTerms | №0901 |
| compositions | №0069 (+ 1 других файлов) |
| conclusion | №0888 (+ 1 других файлов) |
| connectedComponents | №0894 |
| controlled | №0734 (+ 1 других файлов) |
| count | №0069 (+ 2 других файлов) |
| CRC | №0888 (+ 1 других файлов) |
| createDesktopShortcut | №1035 |
| createStartMenuShortcut | №1035 |
| cupsize | №0901 |
| currentFloor | №0734 (+ 8 других файлов) |
| cutoff | №0901 |
| d | №0734 (+ 8 других файлов) |
| darkness | №0734 (+ 8 других файлов) |
| debug | №0888 |
| declaredSourceCommit | №0901 |
| degenerateTriangles | №0894 |
| description | №0734 (+ 7 других файлов) |
| destinationGender | №0901 |
| devDependencies | №1035 |
| directories | №1035 |
| doubleSided | №0894 |
| e | №0734 (+ 8 других файлов) |
| editorMorphs | №0894 |
| electron | №1035 |
| electron-builder | №1035 |
| embeddedMorphChannels | №0894 |
| emitsLight | №0740 |
| enclosed | №1084 |
| eTexture | №0734 (+ 8 других файлов) |
| exportedMacros | №0901 |
| fail | №0888 (+ 1 других файлов) |
| femaleStackTerms | №0901 |
| fileCount | №1277 |
| files | №1277 (+ 7 других файлов) |
| firmness | №0901 |
| fixtureSha256 | №0901 (+ 1 других файлов) |
| floor | №0734 (+ 1 других файлов) |
| floors | №0734 (+ 8 других файлов) |
| flow | №0888 |
| folder | №0069 (+ 3 других файлов) |
| gender | №0901 |
| generated | №1277 (+ 2 других файлов) |
| gitBlob | №0905 |
| h | №0734 (+ 8 других файлов) |
| head | №0069 (+ 1 других файлов) |
| head-decr | №0069 (+ 1 других файлов) |
| head-incr | №0069 (+ 1 других файлов) |
| height | №0734 (+ 9 других файлов) |
| hips | №0894 (+ 2 других файлов) |
| human-female | №1266 |
| id | №0734 (+ 11 других файлов) |
| indexComponentType | №0894 |
| intensity | №0734 (+ 8 других файлов) |
| interactive | №0740 |
| joints | №0901 (+ 2 других файлов) |
| JOINTS_0 | №0894 |
| kind | №1277 |
| legacy | №0888 (+ 1 других файлов) |
| legLength | №0069 (+ 1 других файлов) |
| legLength-decr | №0069 (+ 1 других файлов) |
| legLength-incr | №0069 (+ 1 других файлов) |
| legs | №0069 (+ 1 других файлов) |
| library | №0734 (+ 6 других файлов) |
| license | №0069 (+ 1 других файлов) |
| lighting | №0734 (+ 8 других файлов) |
| lightIntensity | №0740 |
| lightRadius | №0740 |
| limitations | №0069 (+ 2 других файлов) |
| localRuntimeTests | №0903 |
| loot | №0734 |
| macroConfigSha256 | №0901 |
| main | №1035 |
| manifest | №0888 (+ 1 других файлов) |
| mapId | №0734 (+ 6 других файлов) |
| materials | №0894 |
| maxDisplacementMeters | №0901 (+ 1 других файлов) |
| measure-thigh-circ-decr | №0069 (+ 1 других файлов) |
| measure-thigh-circ-incr | №0069 (+ 1 других файлов) |
| measure-upperarm-circ-decr | №0069 (+ 1 других файлов) |
| measure-upperarm-circ-incr | №0069 (+ 1 других файлов) |
| meshes | №1032 |
| meshMetadata | №0894 |
| metallicFactor | №0894 |
| method | №0069 (+ 1 других файлов) |
| MhObjectType | №0894 |
| MhScaleFactor | №0894 |
| minAppVersion | №1273 (+ 1 других файлов) |
| model | №0734 (+ 9 других файлов) |
| morphNames | №0894 |
| MPFB_GEN_object_type | №0894 |
| MPFB_GEN_scale_factor | №0894 |
| MPFB_HUM_african | №0894 |
| MPFB_HUM_age | №0894 |
| MPFB_HUM_asian | №0894 |
| MPFB_HUM_caucasian | №0894 |
| MPFB_HUM_cupsize | №0894 |
| MPFB_HUM_firmness | №0894 |
| MPFB_HUM_gender | №0894 |
| MPFB_HUM_height | №0894 |
| MPFB_HUM_is_human_project | №0894 |
| MPFB_HUM_material_source | №0894 |
| MPFB_HUM_muscle | №0894 |
| MPFB_HUM_proportions | №0894 |
| MPFB_HUM_weight | №0894 |
| muscle | №0901 |
| n | №0734 (+ 8 других файлов) |
| name | №0069 (+ 12 других файлов) |
| negative | №0069 (+ 3 других файлов) |
| nextAction | №0905 |
| nonFiniteValues | №0894 |
| NORMAL | №0894 |
| nsis | №1035 |
| nTexture | №0734 (+ 8 других файлов) |
| objects | №0734 (+ 8 других файлов) |
| offset | №0069 (+ 1 других файлов) |
| oneClick | №1035 |
| ota_install_contract | №0890 |
| output | №1035 |
| pages | №0905 |
| pass | №0888 (+ 1 других файлов) |
| path | №1277 (+ 2 других файлов) |
| pbrMetallicRoughness | №0894 |
| pectorals | №0069 (+ 1 других файлов) |
| perMachine | №1035 |
| physical_android_test | №0890 |
| physicalAndroidQA | №0888 (+ 3 других файлов) |
| physicalZIP | №0888 |
| pixels | №0894 |
| portable | №1035 |
| POSITION | №0894 |
| positive | №0069 (+ 3 других файлов) |
| primitives | №0894 |
| private | №1035 |
| productionSyntaxFiles | №0888 (+ 1 других файлов) |
| productName | №1035 |
| project | №0069 (+ 1 других файлов) |
| pronounced | №1084 |
| proportions | №0901 |
| publication | №0888 (+ 1 других файлов) |
| race | №0901 |
| radius | №0734 (+ 8 других файлов) |
| rawBounds | №0894 |
| recommendedSourceCommit | №0901 |
| regression | №0888 (+ 1 других файлов) |
| release | №0903 |
| releaseCommit | №0888 (+ 1 других файлов) |
| required_editor_assets | №0890 |
| requiredAssets | №0734 (+ 6 других файлов) |
| rmsDisplacementMeters | №0901 (+ 1 других файлов) |
| rootCause | №0888 |
| rotation | №0735 (+ 5 других файлов) |
| roughnessFactor | №0894 |
| runtime | №0901 (+ 1 других файлов) |
| runtimeOTARegression | №0888 |
| s | №0734 (+ 7 других файлов) |
| scale | №0069 (+ 10 других файлов) |
| schema | №0069 (+ 3 других файлов) |
| schemaVersion | №0734 (+ 6 других файлов) |
| scripts | №1035 |
| seamDuplicates | №0894 |
| seamMaxMeters | №0901 (+ 1 других файлов) |
| searchable | №0734 (+ 5 других файлов) |
| seconds | №0888 (+ 1 других файлов) |
| selectedTexture | №0734 (+ 8 других файлов) |
| selectedTool | №0734 (+ 8 других файлов) |
| selectedWallTexture | №0734 (+ 8 других файлов) |
| sha256 | №1277 (+ 3 других файлов) |
| shippedSha256 | №0901 (+ 1 других файлов) |
| shoulders | №0894 (+ 2 других файлов) |
| showAbove | №0734 |
| showBelow | №0734 |
| showCeilings | №0734 |
| signedRelease | №0888 |
| skins | №0894 |
| sky | №0735 (+ 4 других файлов) |
| slash | №0738 |
| slashTexture | №0738 |
| source | №0069 (+ 2 других файлов) |
| sourceGlbSha256 | №0901 |
| sourceHashes | №0069 (+ 2 других файлов) |
| sourceProject | №0901 |
| sources | №0901 (+ 1 других файлов) |
| sourceSha256 | №0901 (+ 1 других файлов) |
| sourceStackTerms | №0901 |
| stableVersion | №0888 (+ 1 других файлов) |
| stage | №0903 |
| stairDirection | №0734 (+ 1 других файлов) |
| stairFrom | №0734 (+ 1 других файлов) |
| stairsTo | №0735 (+ 2 других файлов) |
| stairTo | №0734 (+ 1 других файлов) |
| status | №0888 (+ 3 других файлов) |
| steps | №0734 (+ 1 других файлов) |
| sTexture | №0734 (+ 7 других файлов) |
| tags | №0734 (+ 6 других файлов) |
| target | №1035 (+ 1 других файлов) |
| targets | №0069 (+ 4 других файлов) |
| TEXCOORD_0 | №0894 |
| tiles | №0734 (+ 8 других файлов) |
| tokens | №0734 (+ 8 других файлов) |
| topology | №0894 |
| torso-muscle-pectoral-decr | №0069 (+ 1 других файлов) |
| torso-muscle-pectoral-incr | №0069 (+ 1 других файлов) |
| triangles | №0894 |
| type | №0734 (+ 8 других файлов) |
| unchanged | №0901 (+ 1 других файлов) |
| uniquePositions | №0894 |
| url | №1275 |
| uvOutsideUnitSquare | №0894 |
| uvRange | №0894 |
| version | №1277 (+ 15 других файлов) |
| versionCode | №0888 (+ 1 других файлов) |
| vertexCount | №0069 (+ 1 других файлов) |
| vertices | №0894 (+ 3 других файлов) |
| view | №0734 (+ 8 других файлов) |
| w | №0734 (+ 8 других файлов) |
| waist | №0894 (+ 2 других файлов) |
| walkable | №0734 (+ 1 других файлов) |
| walls | №0734 (+ 8 других файлов) |
| weight | №0069 (+ 3 других файлов) |
| WEIGHTS_0 | №0894 |
| weightSumMaxError | №0894 |
| weldedBoundaryEdges | №0894 |
| weldedNonManifoldEdges | №0894 |
| weldTolerance | №0894 |
| width | №0734 (+ 8 других файлов) |
| win | №1035 |
| workflows | №0888 (+ 1 других файлов) |
| wTexture | №0734 (+ 7 других файлов) |
| x | №0734 (+ 8 других файлов) |
| y | №0734 (+ 8 других файлов) |
| z | №0734 (+ 8 других файлов) |
| zeroWeightVertices | №0894 |
| zip | №0905 |
| zip_crc_and_all_entry_sha256 | №0890 |
| zip_sha256 | №0890 |
| zipSha256 | №0888 (+ 1 других файлов) |
| zones | №0734 (+ 8 других файлов) |

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

