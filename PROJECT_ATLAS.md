# DnD-VTT — полный атлас проекта

Снимок кода 8de32b0afcf2. Git содержит 1909 файлов.
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
| №0001 .devcontainer/devcontainer.json | 564 B | данные/конфигурация: devcontainer |
| №0002 .github/ai-control.json | 255 B | данные/конфигурация: ai control |
| №0003 .github/prompts/autonomous-development.md | 1259 B | документация или отчёт: autonomous development |
| №0004 .github/scripts/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №0005 .github/scripts/publish-unity-artifacts.py | 8565 B | вспомогательный файл: publish unity artifacts |
| №0006 .github/scripts/test-publish-unity-artifacts.py | 3695 B | вспомогательный файл: test publish unity artifacts |
| №0007 .github/workflows/android-debug.yml | 4175 B | автоматизация GitHub Actions: android debug |
| №0008 .github/workflows/android-release.yml | 8160 B | автоматизация GitHub Actions: android release |
| №0009 .github/workflows/autonomous-development.yml | 4534 B | автоматизация GitHub Actions: autonomous development |
| №0010 .github/workflows/build-windows-desktop.yml | 1449 B | автоматизация GitHub Actions: build windows desktop |
| №0011 .github/workflows/cloud-test-build.yml | 3468 B | автоматизация GitHub Actions: cloud test build |
| №0012 .github/workflows/convert-remaining-furniture.yml | 1964 B | автоматизация GitHub Actions: convert remaining furniture |
| №0013 .github/workflows/deploy-pages.yml | 3633 B | автоматизация GitHub Actions: deploy pages |
| №0014 .github/workflows/human-glb-audit.yml | 931 B | автоматизация GitHub Actions: human glb audit |
| №0015 .github/workflows/import-root-furniture.yml | 3572 B | автоматизация GitHub Actions: import root furniture |
| №0016 .github/workflows/map-ui-stage-qa.yml | 776 B | автоматизация GitHub Actions: map ui stage qa |
| №0017 .github/workflows/project-atlas.yml | 953 B | автоматическое обновление атласа на GitHub |
| №0018 .github/workflows/publish-stress-map-ota.yml | 455 B | автоматизация GitHub Actions: publish stress map ota |
| №0019 .github/workflows/refresh-update-manifest.yml | 540 B | автоматизация GitHub Actions: refresh update manifest |
| №0020 .github/workflows/test-gltf-loader.yml | 717 B | автоматизация GitHub Actions: test gltf loader |
| №0021 .github/workflows/test-stair-navigation.yml | 752 B | автоматизация GitHub Actions: test stair navigation |
| №0022 .github/workflows/unified-release.yml | 14076 B | автоматизация GitHub Actions: unified release |
| №0023 .github/workflows/unity-android-update-publish.yml | 5039 B | автоматизация GitHub Actions: unity android update publish |
| №0024 .github/workflows/unity-brand-visual-contract.yml | 877 B | автоматизация GitHub Actions: unity brand visual contract |
| №0025 .github/workflows/unity-cloud-candidate.yml | 10664 B | автоматизация GitHub Actions: unity cloud candidate |
| №0026 .github/workflows/unity-cloud-promote.yml | 2934 B | автоматизация GitHub Actions: unity cloud promote |
| №0027 .github/workflows/unity-delivery-publish.yml | 872 B | автоматизация GitHub Actions: unity delivery publish |
| №0028 .github/workflows/unity-experiment-android.yml | 2708 B | автоматизация GitHub Actions: unity experiment android |
| №0029 .github/workflows/unity-retained-apk-audit.yml | 1749 B | автоматизация GitHub Actions: unity retained apk audit |
| №0030 .github/workflows/unpack-project.yml | 2987 B | автоматизация GitHub Actions: unpack project |
| №0031 .github/workflows/validate-imported-glb.yml | 2317 B | автоматизация GitHub Actions: validate imported glb |
| №0032 .gitignore | 81 B | вспомогательный файл: .gitignore |
| №0033 00_AI_PROJECT_GUIDE.md | 1108812 B | существующее руководство ИИ, не перезаписывать |
| №0034 01_plansforproject.md | 62524 B | план целей и критериев выполнения |
| №0035 1790622696215.png | 1202179 B | текстура/изображение: 1790622696215 |
| №0036 1790622844831.png | 104000 B | текстура/изображение: 1790622844831 |
| №0037 1790718758545.png | 1889164 B | текстура/изображение: 1790718758545 |
| №0038 1790788500741.png | 1468216 B | текстура/изображение: 1790788500741 |
| №0039 3D_CHARACTER_CLOTHING_PROGRESS.md | 84856 B | документация или отчёт: 3D CHARACTER CLOTHING PROGRESS |
| №0040 3D_CHARACTER_RACES_PROGRESS.md | 75599 B | документация или отчёт: 3D CHARACTER RACES PROGRESS |
| №0041 AGENTS.md | 4903 B | документация или отчёт: AGENTS |
| №0042 AI_BLOCKERS.md | 23406 B | документация или отчёт: AI BLOCKERS |
| №0043 AI_NEXT_TASK.md | 26049 B | документация или отчёт: AI NEXT TASK |
| №0044 AI_PROGRESS.md | 66632 B | документация или отчёт: AI PROGRESS |
| №0045 android/.gitignore | 44 B | Android компонент: .gitignore |
| №0046 android/app/build.gradle | 4122 B | Android компонент: build |
| №0047 android/app/src/main/AndroidManifest.xml | 12250 B | Android компонент: AndroidManifest |
| №0048 android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java | 34871 B | Android: bridge обновлений |
| №0049 android/app/src/main/java/com/dndvtt/app/MainActivity.java | 7574 B | Android: запуск WebView |
| №0050 android/app/src/main/res/values-v31/styles.xml | 527 B | Android компонент: styles |
| №0051 android/app/src/main/res/values/styles.xml | 407 B | Android компонент: styles |
| №0052 android/build.gradle | 73 B | Android компонент: build |
| №0053 android/gradle.properties | 106 B | Android компонент: gradle |
| №0054 android/README.md | 685 B | документация или отчёт: README |
| №0055 android/settings.gradle | 333 B | Android компонент: settings |
| №0056 app/3dmap/assets/clothing/fantasy-materials.webp | 434234 B | компонент 3D карты/редактора: fantasy materials |
| №0057 app/3dmap/assets/clothing/lingerie-nylon.webp | 289830 B | компонент 3D карты/редактора: lingerie nylon |
| №0058 app/3dmap/character_anatomy_geometry.js | 22797 B | компонент 3D карты/редактора: character anatomy geometry |
| №0059 app/3dmap/character_anatomy.js | 8424 B | компонент 3D карты/редактора: character anatomy |
| №0060 app/3dmap/character_appearance_store.js | 2619 B | компонент 3D карты/редактора: character appearance store |
| №0061 app/3dmap/character_body_geometry.js | 120619 B | компонент 3D карты/редактора: character body geometry |
| №0062 app/3dmap/character_clothing.js | 51618 B | компонент 3D карты/редактора: character clothing |
| №0063 app/3dmap/character_editor_3d.js | 166537 B | компонент 3D карты/редактора: character editor 3d |
| №0064 app/3dmap/character_morph_assets.js | 3322 B | компонент 3D карты/редактора: character morph assets |
| №0065 app/3dmap/character_pose.js | 4749 B | компонент 3D карты/редактора: character pose |
| №0066 app/3dmap/character_system.js | 49923 B | компонент 3D карты/редактора: character system |
| №0067 app/3dmap/gltf_catalog.js | 90502 B | компонент 3D карты/редактора: gltf catalog |
| №0068 app/3dmap/gltf_character_pipeline.js | 7811 B | компонент 3D карты/редактора: gltf character pipeline |
| №0069 app/3dmap/gltf_loader.js | 10027 B | компонент 3D карты/редактора: gltf loader |
| №0070 app/3dmap/map_editor.js | 45829 B | компонент 3D карты/редактора: map editor |
| №0071 app/3dmap/map_model.js | 7783 B | компонент 3D карты/редактора: map model |
| №0072 app/3dmap/map_renderer_2d.js | 7331 B | компонент 3D карты/редактора: map renderer 2d |
| №0073 app/3dmap/map_renderer_3d.js | 23969 B | компонент 3D карты/редактора: map renderer 3d |
| №0074 app/3dmap/map_world.js | 9119 B | компонент 3D карты/редактора: map world |
| №0075 app/3dmap/stair_navigation.js | 932 B | компонент 3D карты/редактора: stair navigation |
| №0076 app/3dmap/stress_map.js | 3272 B | компонент 3D карты/редактора: stress map |
| №0077 app/accursed_oap_v11_runtime.js | 31365 B | логический модуль: accursed oap v11 runtime |
| №0078 app/alchemist_mhp_2024_runtime.js | 140155 B | логический модуль: alchemist mhp 2024 runtime |
| №0079 app/alchemy_engine_v29.js | 40901 B | логический модуль: alchemy engine v29 |
| №0080 app/alchemy_gameplay_v30.js | 17859 B | логический модуль: alchemy gameplay v30 |
| №0081 app/alchemy_gathering_professions_v52.js | 11833 B | логический модуль: alchemy gathering professions v52 |
| №0082 app/Ambiences.js | 14648 B | логический модуль: Ambiences |
| №0083 app/app.js | 37183 B | главный контроллер; currentChar и все персонажи |
| №0084 app/armors.js | 27349 B | логический модуль: armors |
| №0085 app/assets/3d/makehuman/editor-morphs.bin | 2340320 B | ассет графики/3D/интерфейса: editor morphs |
| №0086 app/assets/3d/makehuman/editor-morphs.json | 11573 B | ассет графики/3D/интерфейса: editor morphs |
| №0087 app/assets/3d/makehuman/human-body-morphs.glb | 12671780 B | ассет графики/3D/интерфейса: human body morphs |
| №0088 app/assets/3d/makehuman/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №0089 app/assets/3d/makehuman/materials/skin_color_detail_v1.png | 2922380 B | ассет графики/3D/интерфейса: skin color detail v1 |
| №0090 app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png | 22965 B | ассет графики/3D/интерфейса: skin micro normal roughness |
| №0091 app/assets/3d/makehuman/README.md | 1510 B | документация или отчёт: README |
| №0092 app/assets/3d/makehuman/skins/young_caucasian_female/young_caucasian_female.mhmat | 1464 B | ассет графики/3D/интерфейса: young caucasian female |
| №0093 app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png | 4391156 B | ассет графики/3D/интерфейса: young lightskinned female diffuse |
| №0094 app/assets/3d/makehuman/skins/young_caucasian_male/young_caucasian_male.mhmat | 1462 B | ассет графики/3D/интерфейса: young caucasian male |
| №0095 app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png | 3693828 B | ассет графики/3D/интерфейса: young lightskinned male diffuse |
| №0096 app/assets/3d/quaternius/models/Anvil_Log.bin | 130880 B | ассет графики/3D/интерфейса: Anvil Log |
| №0097 app/assets/3d/quaternius/models/Anvil_Log.gltf | 5580 B | ассет графики/3D/интерфейса: Anvil Log |
| №0098 app/assets/3d/quaternius/models/Anvil.bin | 24020 B | ассет графики/3D/интерфейса: Anvil |
| №0099 app/assets/3d/quaternius/models/Anvil.gltf | 3189 B | ассет графики/3D/интерфейса: Anvil |
| №0100 app/assets/3d/quaternius/models/Axe_Bronze.bin | 31156 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0101 app/assets/3d/quaternius/models/Axe_Bronze.gltf | 2591 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0102 app/assets/3d/quaternius/models/Bag.bin | 27188 B | ассет графики/3D/интерфейса: Bag |
| №0103 app/assets/3d/quaternius/models/Bag.gltf | 4318 B | ассет графики/3D/интерфейса: Bag |
| №0104 app/assets/3d/quaternius/models/Banner_1_Cloth.bin | 6636 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0105 app/assets/3d/quaternius/models/Banner_1_Cloth.gltf | 4670 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0106 app/assets/3d/quaternius/models/Banner_1.bin | 20976 B | ассет графики/3D/интерфейса: Banner 1 |
| №0107 app/assets/3d/quaternius/models/Banner_1.gltf | 6789 B | ассет графики/3D/интерфейса: Banner 1 |
| №0108 app/assets/3d/quaternius/models/Banner_2_Cloth.bin | 4940 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0109 app/assets/3d/quaternius/models/Banner_2_Cloth.gltf | 4671 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0110 app/assets/3d/quaternius/models/Banner_2.bin | 19280 B | ассет графики/3D/интерфейса: Banner 2 |
| №0111 app/assets/3d/quaternius/models/Banner_2.gltf | 6788 B | ассет графики/3D/интерфейса: Banner 2 |
| №0112 app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0113 app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6241 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0114 app/assets/3d/quaternius/models/Barrel_Holder.bin | 161816 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0115 app/assets/3d/quaternius/models/Barrel_Holder.gltf | 4347 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0116 app/assets/3d/quaternius/models/Barrel.bin | 57144 B | ассет графики/3D/интерфейса: Barrel |
| №0117 app/assets/3d/quaternius/models/Barrel.gltf | 4311 B | ассет графики/3D/интерфейса: Barrel |
| №0118 app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0119 app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0120 app/assets/3d/quaternius/models/Bed_Twin2.bin | 76624 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0121 app/assets/3d/quaternius/models/Bed_Twin2.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0122 app/assets/3d/quaternius/models/Bench.bin | 19304 B | ассет графики/3D/интерфейса: Bench |
| №0123 app/assets/3d/quaternius/models/Bench.gltf | 4298 B | ассет графики/3D/интерфейса: Bench |
| №0124 app/assets/3d/quaternius/models/Book_5.bin | 5856 B | ассет графики/3D/интерфейса: Book 5 |
| №0125 app/assets/3d/quaternius/models/Book_5.gltf | 2403 B | ассет графики/3D/интерфейса: Book 5 |
| №0126 app/assets/3d/quaternius/models/Book_7.bin | 32664 B | ассет графики/3D/интерфейса: Book 7 |
| №0127 app/assets/3d/quaternius/models/Book_7.gltf | 4290 B | ассет графики/3D/интерфейса: Book 7 |
| №0128 app/assets/3d/quaternius/models/Book_Simplified_Single.bin | 3192 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0129 app/assets/3d/quaternius/models/Book_Simplified_Single.gltf | 2428 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0130 app/assets/3d/quaternius/models/Book_Stack_1.bin | 12768 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0131 app/assets/3d/quaternius/models/Book_Stack_1.gltf | 2418 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0132 app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0133 app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4309 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0134 app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0135 app/assets/3d/quaternius/models/Bookcase_2.gltf | 4329 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0136 app/assets/3d/quaternius/models/BookGroup_Medium_1.bin | 25536 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0137 app/assets/3d/quaternius/models/BookGroup_Medium_1.gltf | 2429 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0138 app/assets/3d/quaternius/models/BookGroup_Medium_2.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0139 app/assets/3d/quaternius/models/BookGroup_Medium_2.gltf | 2431 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0140 app/assets/3d/quaternius/models/BookGroup_Medium_3.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0141 app/assets/3d/quaternius/models/BookGroup_Medium_3.gltf | 2432 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0142 app/assets/3d/quaternius/models/BookGroup_Small_1.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0143 app/assets/3d/quaternius/models/BookGroup_Small_1.gltf | 2423 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0144 app/assets/3d/quaternius/models/BookGroup_Small_2.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0145 app/assets/3d/quaternius/models/BookGroup_Small_2.gltf | 2426 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0146 app/assets/3d/quaternius/models/BookGroup_Small_3.bin | 7980 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0147 app/assets/3d/quaternius/models/BookGroup_Small_3.gltf | 2424 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0148 app/assets/3d/quaternius/models/BookStand.bin | 62020 B | ассет графики/3D/интерфейса: BookStand |
| №0149 app/assets/3d/quaternius/models/BookStand.gltf | 2223 B | ассет графики/3D/интерфейса: BookStand |
| №0150 app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0151 app/assets/3d/quaternius/models/Bottle_1.gltf | 2413 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0152 app/assets/3d/quaternius/models/Bucket_Metal.bin | 18824 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0153 app/assets/3d/quaternius/models/Bucket_Metal.gltf | 2206 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0154 app/assets/3d/quaternius/models/Bucket_Wooden_1.bin | 32544 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0155 app/assets/3d/quaternius/models/Bucket_Wooden_1.gltf | 3911 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0156 app/assets/3d/quaternius/models/Cabinet.bin | 114768 B | ассет графики/3D/интерфейса: Cabinet |
| №0157 app/assets/3d/quaternius/models/Cabinet.gltf | 4324 B | ассет графики/3D/интерфейса: Cabinet |
| №0158 app/assets/3d/quaternius/models/Cage_Small.bin | 171848 B | ассет графики/3D/интерфейса: Cage Small |
| №0159 app/assets/3d/quaternius/models/Cage_Small.gltf | 2207 B | ассет графики/3D/интерфейса: Cage Small |
| №0160 app/assets/3d/quaternius/models/Candle_1.bin | 6200 B | ассет графики/3D/интерфейса: Candle 1 |
| №0161 app/assets/3d/quaternius/models/Candle_1.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 1 |
| №0162 app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | ассет графики/3D/интерфейса: Candle 2 |
| №0163 app/assets/3d/quaternius/models/Candle_2.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 2 |
| №0164 app/assets/3d/quaternius/models/CandleStick_Stand.bin | 226228 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0165 app/assets/3d/quaternius/models/CandleStick_Stand.gltf | 4347 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0166 app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0167 app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 3900 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0168 app/assets/3d/quaternius/models/CandleStick.bin | 21436 B | ассет графики/3D/интерфейса: CandleStick |
| №0169 app/assets/3d/quaternius/models/CandleStick.gltf | 2199 B | ассет графики/3D/интерфейса: CandleStick |
| №0170 app/assets/3d/quaternius/models/Carrot.bin | 22244 B | ассет графики/3D/интерфейса: Carrot |
| №0171 app/assets/3d/quaternius/models/Carrot.gltf | 2411 B | ассет графики/3D/интерфейса: Carrot |
| №0172 app/assets/3d/quaternius/models/Cauldron.bin | 62712 B | ассет графики/3D/интерфейса: Cauldron |
| №0173 app/assets/3d/quaternius/models/Cauldron.gltf | 2195 B | ассет графики/3D/интерфейса: Cauldron |
| №0174 app/assets/3d/quaternius/models/Chain_Coil.bin | 193664 B | ассет графики/3D/интерфейса: Chain Coil |
| №0175 app/assets/3d/quaternius/models/Chain_Coil.gltf | 2424 B | ассет графики/3D/интерфейса: Chain Coil |
| №0176 app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | ассет графики/3D/интерфейса: Chair 1 |
| №0177 app/assets/3d/quaternius/models/Chair_1.gltf | 4312 B | ассет графики/3D/интерфейса: Chair 1 |
| №0178 app/assets/3d/quaternius/models/Chalice.bin | 15644 B | ассет графики/3D/интерфейса: Chalice |
| №0179 app/assets/3d/quaternius/models/Chalice.gltf | 2197 B | ассет графики/3D/интерфейса: Chalice |
| №0180 app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | ассет графики/3D/интерфейса: Chandelier |
| №0181 app/assets/3d/quaternius/models/Chandelier.gltf | 6259 B | ассет графики/3D/интерфейса: Chandelier |
| №0182 app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | ассет графики/3D/интерфейса: Chest Wood |
| №0183 app/assets/3d/quaternius/models/Chest_Wood.gltf | 21402 B | ассет графики/3D/интерфейса: Chest Wood |
| №0184 app/assets/3d/quaternius/models/Coin_Pile_2.bin | 52612 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0185 app/assets/3d/quaternius/models/Coin_Pile_2.gltf | 2429 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0186 app/assets/3d/quaternius/models/Coin_Pile.bin | 47520 B | ассет графики/3D/интерфейса: Coin Pile |
| №0187 app/assets/3d/quaternius/models/Coin_Pile.gltf | 2424 B | ассет графики/3D/интерфейса: Coin Pile |
| №0188 app/assets/3d/quaternius/models/Coin.bin | 14464 B | ассет графики/3D/интерфейса: Coin |
| №0189 app/assets/3d/quaternius/models/Coin.gltf | 2408 B | ассет графики/3D/интерфейса: Coin |
| №0190 app/assets/3d/quaternius/models/Crate_Metal.bin | 126828 B | ассет графики/3D/интерфейса: Crate Metal |
| №0191 app/assets/3d/quaternius/models/Crate_Metal.gltf | 4335 B | ассет графики/3D/интерфейса: Crate Metal |
| №0192 app/assets/3d/quaternius/models/Crate_Wooden.bin | 66496 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0193 app/assets/3d/quaternius/models/Crate_Wooden.gltf | 4412 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0194 app/assets/3d/quaternius/models/Dummy.bin | 80988 B | ассет графики/3D/интерфейса: Dummy |
| №0195 app/assets/3d/quaternius/models/Dummy.gltf | 5570 B | ассет графики/3D/интерфейса: Dummy |
| №0196 app/assets/3d/quaternius/models/FarmCrate_Apple.bin | 134488 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0197 app/assets/3d/quaternius/models/FarmCrate_Apple.gltf | 6263 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0198 app/assets/3d/quaternius/models/FarmCrate_Carrot.bin | 204292 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0199 app/assets/3d/quaternius/models/FarmCrate_Carrot.gltf | 6273 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0200 app/assets/3d/quaternius/models/FarmCrate_Empty.bin | 54704 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0201 app/assets/3d/quaternius/models/FarmCrate_Empty.gltf | 3915 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0202 app/assets/3d/quaternius/models/Key_Gold.bin | 58636 B | ассет графики/3D/интерфейса: Key Gold |
| №0203 app/assets/3d/quaternius/models/Key_Gold.gltf | 2424 B | ассет графики/3D/интерфейса: Key Gold |
| №0204 app/assets/3d/quaternius/models/Key_Metal.bin | 19340 B | ассет графики/3D/интерфейса: Key Metal |
| №0205 app/assets/3d/quaternius/models/Key_Metal.gltf | 2197 B | ассет графики/3D/интерфейса: Key Metal |
| №0206 app/assets/3d/quaternius/models/Lantern_Wall.bin | 120036 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0207 app/assets/3d/quaternius/models/Lantern_Wall.gltf | 2203 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0208 app/assets/3d/quaternius/models/Mug.bin | 12488 B | ассет графики/3D/интерфейса: Mug |
| №0209 app/assets/3d/quaternius/models/Mug.gltf | 3881 B | ассет графики/3D/интерфейса: Mug |
| №0210 app/assets/3d/quaternius/models/Nightstand_Shelf.bin | 21412 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0211 app/assets/3d/quaternius/models/Nightstand_Shelf.gltf | 2447 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0212 app/assets/3d/quaternius/models/Peg_Rack.bin | 26672 B | ассет графики/3D/интерфейса: Peg Rack |
| №0213 app/assets/3d/quaternius/models/Peg_Rack.gltf | 3879 B | ассет графики/3D/интерфейса: Peg Rack |
| №0214 app/assets/3d/quaternius/models/Pickaxe_Bronze.bin | 30736 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0215 app/assets/3d/quaternius/models/Pickaxe_Bronze.gltf | 2425 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0216 app/assets/3d/quaternius/models/Pot_1_Lid.bin | 46120 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0217 app/assets/3d/quaternius/models/Pot_1_Lid.gltf | 2196 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0218 app/assets/3d/quaternius/models/Pot_1.bin | 37160 B | ассет графики/3D/интерфейса: Pot 1 |
| №0219 app/assets/3d/quaternius/models/Pot_1.gltf | 2185 B | ассет графики/3D/интерфейса: Pot 1 |
| №0220 app/assets/3d/quaternius/models/Potion_1.bin | 18200 B | ассет графики/3D/интерфейса: Potion 1 |
| №0221 app/assets/3d/quaternius/models/Potion_1.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 1 |
| №0222 app/assets/3d/quaternius/models/Potion_2.bin | 19672 B | ассет графики/3D/интерфейса: Potion 2 |
| №0223 app/assets/3d/quaternius/models/Potion_2.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 2 |
| №0224 app/assets/3d/quaternius/models/Potion_4.bin | 22536 B | ассет графики/3D/интерфейса: Potion 4 |
| №0225 app/assets/3d/quaternius/models/Potion_4.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 4 |
| №0226 app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | ассет графики/3D/интерфейса: Pouch Large |
| №0227 app/assets/3d/quaternius/models/Pouch_Large.gltf | 4306 B | ассет графики/3D/интерфейса: Pouch Large |
| №0228 app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | ассет графики/3D/интерфейса: Rope 1 |
| №0229 app/assets/3d/quaternius/models/Rope_1.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 1 |
| №0230 app/assets/3d/quaternius/models/Rope_2.bin | 34904 B | ассет графики/3D/интерфейса: Rope 2 |
| №0231 app/assets/3d/quaternius/models/Rope_2.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 2 |
| №0232 app/assets/3d/quaternius/models/Rope_3.bin | 41624 B | ассет графики/3D/интерфейса: Rope 3 |
| №0233 app/assets/3d/quaternius/models/Rope_3.gltf | 2225 B | ассет графики/3D/интерфейса: Rope 3 |
| №0234 app/assets/3d/quaternius/models/Scroll_1.bin | 20112 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0235 app/assets/3d/quaternius/models/Scroll_1.gltf | 3954 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0236 app/assets/3d/quaternius/models/Scroll_2.bin | 28392 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0237 app/assets/3d/quaternius/models/Scroll_2.gltf | 3968 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0238 app/assets/3d/quaternius/models/Shelf_Arch.bin | 64836 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0239 app/assets/3d/quaternius/models/Shelf_Arch.gltf | 4332 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0240 app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0241 app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2224 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0242 app/assets/3d/quaternius/models/Shelf_Small_Bottles.bin | 229484 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0243 app/assets/3d/quaternius/models/Shelf_Small_Bottles.gltf | 6266 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0244 app/assets/3d/quaternius/models/Shield_Wooden.bin | 64184 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0245 app/assets/3d/quaternius/models/Shield_Wooden.gltf | 6243 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0246 app/assets/3d/quaternius/models/SmallBottle.bin | 5700 B | ассет графики/3D/интерфейса: SmallBottle |
| №0247 app/assets/3d/quaternius/models/SmallBottle.gltf | 2392 B | ассет графики/3D/интерфейса: SmallBottle |
| №0248 app/assets/3d/quaternius/models/SmallBottles_1.bin | 20556 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0249 app/assets/3d/quaternius/models/SmallBottles_1.gltf | 2423 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0250 app/assets/3d/quaternius/models/Stall_Cart_Empty.bin | 237264 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0251 app/assets/3d/quaternius/models/Stall_Cart_Empty.gltf | 6857 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0252 app/assets/3d/quaternius/models/Stall_Empty.bin | 88176 B | ассет графики/3D/интерфейса: Stall Empty |
| №0253 app/assets/3d/quaternius/models/Stall_Empty.gltf | 6804 B | ассет графики/3D/интерфейса: Stall Empty |
| №0254 app/assets/3d/quaternius/models/Stool.bin | 11472 B | ассет графики/3D/интерфейса: Stool |
| №0255 app/assets/3d/quaternius/models/Stool.gltf | 2423 B | ассет графики/3D/интерфейса: Stool |
| №0256 app/assets/3d/quaternius/models/Sword_Bronze.bin | 69920 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0257 app/assets/3d/quaternius/models/Sword_Bronze.gltf | 2436 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0258 app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | ассет графики/3D/интерфейса: Table Fork |
| №0259 app/assets/3d/quaternius/models/Table_Fork.gltf | 2189 B | ассет графики/3D/интерфейса: Table Fork |
| №0260 app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | ассет графики/3D/интерфейса: Table Knife |
| №0261 app/assets/3d/quaternius/models/Table_Knife.gltf | 2186 B | ассет графики/3D/интерфейса: Table Knife |
| №0262 app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | ассет графики/3D/интерфейса: Table Large |
| №0263 app/assets/3d/quaternius/models/Table_Large.gltf | 4316 B | ассет графики/3D/интерфейса: Table Large |
| №0264 app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | ассет графики/3D/интерфейса: Table Plate |
| №0265 app/assets/3d/quaternius/models/Table_Plate.gltf | 2199 B | ассет графики/3D/интерфейса: Table Plate |
| №0266 app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | ассет графики/3D/интерфейса: Table Spoon |
| №0267 app/assets/3d/quaternius/models/Table_Spoon.gltf | 2191 B | ассет графики/3D/интерфейса: Table Spoon |
| №0268 app/assets/3d/quaternius/models/Torch_Metal.bin | 39100 B | ассет графики/3D/интерфейса: Torch Metal |
| №0269 app/assets/3d/quaternius/models/Torch_Metal.gltf | 2203 B | ассет графики/3D/интерфейса: Torch Metal |
| №0270 app/assets/3d/quaternius/models/Vase_2.bin | 21188 B | ассет графики/3D/интерфейса: Vase 2 |
| №0271 app/assets/3d/quaternius/models/Vase_2.gltf | 2407 B | ассет графики/3D/интерфейса: Vase 2 |
| №0272 app/assets/3d/quaternius/models/Vase_4.bin | 22028 B | ассет графики/3D/интерфейса: Vase 4 |
| №0273 app/assets/3d/quaternius/models/Vase_4.gltf | 2412 B | ассет графики/3D/интерфейса: Vase 4 |
| №0274 app/assets/3d/quaternius/models/Vase_Rubble_Medium.bin | 85960 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0275 app/assets/3d/quaternius/models/Vase_Rubble_Medium.gltf | 2453 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0276 app/assets/3d/quaternius/models/WeaponStand.bin | 76312 B | ассет графики/3D/интерфейса: WeaponStand |
| №0277 app/assets/3d/quaternius/models/WeaponStand.gltf | 3903 B | ассет графики/3D/интерфейса: WeaponStand |
| №0278 app/assets/3d/quaternius/models/Whetstone.bin | 59280 B | ассет графики/3D/интерфейса: Whetstone |
| №0279 app/assets/3d/quaternius/models/Whetstone.gltf | 6212 B | ассет графики/3D/интерфейса: Whetstone |
| №0280 app/assets/3d/quaternius/models/Workbench_Drawers.bin | 16824 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0281 app/assets/3d/quaternius/models/Workbench_Drawers.gltf | 4313 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0282 app/assets/3d/quaternius/models/Workbench.bin | 63408 B | ассет графики/3D/интерфейса: Workbench |
| №0283 app/assets/3d/quaternius/models/Workbench.gltf | 4318 B | ассет графики/3D/интерфейса: Workbench |
| №0284 app/assets/3d/quaternius/textures/T_Page_Noise.png | 7486734 B | ассет графики/3D/интерфейса: T Page Noise |
| №0285 app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png | 1936754 B | ассет графики/3D/интерфейса: T Trim Cloth BaseColor |
| №0286 app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png | 3920858 B | ассет графики/3D/интерфейса: T Trim Cloth Normal |
| №0287 app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png | 623426 B | ассет графики/3D/интерфейса: T Trim Cloth ORM |
| №0288 app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png | 2232961 B | ассет графики/3D/интерфейса: T Trim Furniture BaseColor |
| №0289 app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png | 3485710 B | ассет графики/3D/интерфейса: T Trim Furniture Normal |
| №0290 app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png | 2064585 B | ассет графики/3D/интерфейса: T Trim Furniture ORM |
| №0291 app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png | 1361221 B | ассет графики/3D/интерфейса: T Trim Metal BaseColor |
| №0292 app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png | 3625541 B | ассет графики/3D/интерфейса: T Trim Metal Normal |
| №0293 app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png | 1871475 B | ассет графики/3D/интерфейса: T Trim Metal ORM |
| №0294 app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png | 2263132 B | ассет графики/3D/интерфейса: T Trim Props BaseColor |
| №0295 app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png | 4441458 B | ассет графики/3D/интерфейса: T Trim Props Normal |
| №0296 app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png | 3017151 B | ассет графики/3D/интерфейса: T Trim Props ORM |
| №0297 app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp | 510226 B | ассет графики/3D/интерфейса: bird contour feathers v1 |
| №0298 app/assets/3d/race_surfaces/flight-feather-vane-v1.webp | 555662 B | ассет графики/3D/интерфейса: flight feather vane v1 |
| №0299 app/assets/3d/race_surfaces/mammal-underfur-v1.webp | 544064 B | ассет графики/3D/интерфейса: mammal underfur v1 |
| №0300 app/assets/3d/race_surfaces/reptile-scales-v1.webp | 730360 B | ассет графики/3D/интерфейса: reptile scales v1 |
| №0301 app/assets/3d/user_furniture/altar_table.glb | 36228 B | ассет графики/3D/интерфейса: altar table |
| №0302 app/assets/3d/user_furniture/apothecary_jar_shelf.glb | 106668 B | ассет графики/3D/интерфейса: apothecary jar shelf |
| №0303 app/assets/3d/user_furniture/apothecary_shelf.glb | 107148 B | ассет графики/3D/интерфейса: apothecary shelf |
| №0304 app/assets/3d/user_furniture/armour_stand.glb | 16340 B | ассет графики/3D/интерфейса: armour stand |
| №0305 app/assets/3d/user_furniture/banner_pole.glb | 17136 B | ассет графики/3D/интерфейса: banner pole |
| №0306 app/assets/3d/user_furniture/bed.glb | 5718760 B | ассет графики/3D/интерфейса: bed |
| №0307 app/assets/3d/user_furniture/book_chest.glb | 45816 B | ассет графики/3D/интерфейса: book chest |
| №0308 app/assets/3d/user_furniture/book_press.glb | 59492 B | ассет графики/3D/интерфейса: book press |
| №0309 app/assets/3d/user_furniture/bookshelf.glb | 7818348 B | ассет графики/3D/интерфейса: bookshelf |
| №0310 app/assets/3d/user_furniture/bread_oven.glb | 45200 B | ассет графики/3D/интерфейса: bread oven |
| №0311 app/assets/3d/user_furniture/brewhouse_tun.glb | 68616 B | ассет графики/3D/интерфейса: brewhouse tun |
| №0312 app/assets/3d/user_furniture/candle_stand.glb | 21372 B | ассет графики/3D/интерфейса: candle stand |
| №0313 app/assets/3d/user_furniture/chained_library_desk.glb | 190612 B | ассет графики/3D/интерфейса: chained library desk |
| №0314 app/assets/3d/user_furniture/chair.glb | 4643004 B | ассет графики/3D/интерфейса: chair |
| №0315 app/assets/3d/user_furniture/closet.glb | 6550260 B | ассет графики/3D/интерфейса: closet |
| №0316 app/assets/3d/user_furniture/commode.glb | 4845868 B | ассет графики/3D/интерфейса: commode |
| №0317 app/assets/3d/user_furniture/cooking_cauldron.glb | 34300 B | ассет графики/3D/интерфейса: cooking cauldron |
| №0318 app/assets/3d/user_furniture/crate_stack.glb | 39644 B | ассет графики/3D/интерфейса: crate stack |
| №0319 app/assets/3d/user_furniture/dormitory_cot.glb | 70976 B | ассет графики/3D/интерфейса: dormitory cot |
| №0320 app/assets/3d/user_furniture/finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: finished codex |
| №0321 app/assets/3d/user_furniture/gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: gold leaf cushion |
| №0322 app/assets/3d/user_furniture/hand_cart.glb | 75012 B | ассет графики/3D/интерфейса: hand cart |
| №0323 app/assets/3d/user_furniture/hanging_oil_lamp.glb | 50924 B | ассет графики/3D/интерфейса: hanging oil lamp |
| №0324 app/assets/3d/user_furniture/hitching_post.glb | 22232 B | ассет графики/3D/интерфейса: hitching post |
| №0325 app/assets/3d/user_furniture/human-base-rigged.glb | 4994640 B | ассет графики/3D/интерфейса: human base rigged |
| №0326 app/assets/3d/user_furniture/infirmary_cot.glb | 71696 B | ассет графики/3D/интерфейса: infirmary cot |
| №0327 app/assets/3d/user_furniture/kitchen_hearth.glb | 38460 B | ассет графики/3D/интерфейса: kitchen hearth |
| №0328 app/assets/3d/user_furniture/lamp_post.glb | 16960 B | ассет графики/3D/интерфейса: lamp post |
| №0329 app/assets/3d/user_furniture/loom.glb | 46728 B | ассет графики/3D/интерфейса: loom |
| №0330 app/assets/3d/user_furniture/manuscript_in_progress.glb | 153128 B | ассет графики/3D/интерфейса: manuscript in progress |
| №0331 app/assets/3d/user_furniture/monastery_altar_table.glb | 36248 B | ассет графики/3D/интерфейса: monastery altar table |
| №0332 app/assets/3d/user_furniture/monastery_apothecary_jar_shelf.glb | 106620 B | ассет графики/3D/интерфейса: monastery apothecary jar shelf |
| №0333 app/assets/3d/user_furniture/monastery_bell_tower_section.glb | 456868 B | ассет графики/3D/интерфейса: monastery bell tower section |
| №0334 app/assets/3d/user_furniture/monastery_book_chest.glb | 45320 B | ассет графики/3D/интерфейса: monastery book chest |
| №0335 app/assets/3d/user_furniture/monastery_book_press.glb | 59492 B | ассет графики/3D/интерфейса: monastery book press |
| №0336 app/assets/3d/user_furniture/monastery_bread_oven.glb | 45296 B | ассет графики/3D/интерфейса: monastery bread oven |
| №0337 app/assets/3d/user_furniture/monastery_brewhouse_tun.glb | 68216 B | ассет графики/3D/интерфейса: monastery brewhouse tun |
| №0338 app/assets/3d/user_furniture/monastery_candle_stand.glb | 21376 B | ассет графики/3D/интерфейса: monastery candle stand |
| №0339 app/assets/3d/user_furniture/monastery_censer.glb | 49336 B | ассет графики/3D/интерфейса: monastery censer |
| №0340 app/assets/3d/user_furniture/monastery_chained_library_desk.glb | 148408 B | ассет графики/3D/интерфейса: monastery chained library desk |
| №0341 app/assets/3d/user_furniture/monastery_chapel_screen.glb | 333728 B | ассет графики/3D/интерфейса: monastery chapel screen |
| №0342 app/assets/3d/user_furniture/monastery_chapter_house_bay.glb | 151904 B | ассет графики/3D/интерфейса: monastery chapter house bay |
| №0343 app/assets/3d/user_furniture/monastery_cloister_arcade_bay.glb | 130972 B | ассет графики/3D/интерфейса: monastery cloister arcade bay |
| №0344 app/assets/3d/user_furniture/monastery_cloister_arcade_corner.glb | 73924 B | ассет графики/3D/интерфейса: monastery cloister arcade corner |
| №0345 app/assets/3d/user_furniture/monastery_cloister_garth_lawn.glb | 13732 B | ассет графики/3D/интерфейса: monastery cloister garth lawn |
| №0346 app/assets/3d/user_furniture/monastery_cloister_lean_to_roof.glb | 18724 B | ассет графики/3D/интерфейса: monastery cloister lean to roof |
| №0347 app/assets/3d/user_furniture/monastery_cloister_vault_section.glb | 73928 B | ассет графики/3D/интерфейса: monastery cloister vault section |
| №0348 app/assets/3d/user_furniture/monastery_cloister_well.glb | 41568 B | ассет графики/3D/интерфейса: monastery cloister well |
| №0349 app/assets/3d/user_furniture/monastery_compost_bay.glb | 55596 B | ассет графики/3D/интерфейса: monastery compost bay |
| №0350 app/assets/3d/user_furniture/monastery_cooking_cauldron.glb | 33800 B | ассет графики/3D/интерфейса: monastery cooking cauldron |
| №0351 app/assets/3d/user_furniture/monastery_dormitory_cot.glb | 54832 B | ассет графики/3D/интерфейса: monastery dormitory cot |
| №0352 app/assets/3d/user_furniture/monastery_finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: monastery finished codex |
| №0353 app/assets/3d/user_furniture/monastery_flagstone_floor_slab.glb | 9900 B | ассет графики/3D/интерфейса: monastery flagstone floor slab |
| №0354 app/assets/3d/user_furniture/monastery_gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: monastery gold leaf cushion |
| №0355 app/assets/3d/user_furniture/monastery_hand_cart.glb | 86864 B | ассет графики/3D/интерфейса: monastery hand cart |
| №0356 app/assets/3d/user_furniture/monastery_hanging_oil_lamp.glb | 47156 B | ассет графики/3D/интерфейса: monastery hanging oil lamp |
| №0357 app/assets/3d/user_furniture/monastery_herb_garden_bed.glb | 94584 B | ассет графики/3D/интерфейса: monastery herb garden bed |
| №0358 app/assets/3d/user_furniture/monastery_hung_bell.glb | 40368 B | ассет графики/3D/интерфейса: monastery hung bell |
| №0359 app/assets/3d/user_furniture/monastery_infirmary_cot.glb | 71700 B | ассет графики/3D/интерфейса: monastery infirmary cot |
| №0360 app/assets/3d/user_furniture/monastery_kitchen_hearth.glb | 37972 B | ассет графики/3D/интерфейса: monastery kitchen hearth |
| №0361 app/assets/3d/user_furniture/monastery_manuscript_in_progress.glb | 153132 B | ассет графики/3D/интерфейса: monastery manuscript in progress |
| №0362 app/assets/3d/user_furniture/monastery_monastery_buttress.glb | 18440 B | ассет графики/3D/интерфейса: monastery monastery buttress |
| №0363 app/assets/3d/user_furniture/monastery_monastery_door_bay.glb | 87284 B | ассет графики/3D/интерфейса: monastery monastery door bay |
| №0364 app/assets/3d/user_furniture/monastery_monastery_lancet_window_bay.glb | 64048 B | ассет графики/3D/интерфейса: monastery monastery lancet window bay |
| №0365 app/assets/3d/user_furniture/monastery_monastery_wall_bay.glb | 29336 B | ассет графики/3D/интерфейса: monastery monastery wall bay |
| №0366 app/assets/3d/user_furniture/monastery_monks_chest.glb | 30432 B | ассет графики/3D/интерфейса: monastery monks chest |
| №0367 app/assets/3d/user_furniture/monastery_mortar_and_pestle_set.glb | 31476 B | ассет графики/3D/интерфейса: monastery mortar and pestle set |
| №0368 app/assets/3d/user_furniture/monastery_parchment_stretching_frame.glb | 66292 B | ассет графики/3D/интерфейса: monastery parchment stretching frame |
| №0369 app/assets/3d/user_furniture/monastery_physic_bench.glb | 46424 B | ассет графики/3D/интерфейса: monastery physic bench |
| №0370 app/assets/3d/user_furniture/monastery_pigment_tray.glb | 42180 B | ассет графики/3D/интерфейса: monastery pigment tray |
| №0371 app/assets/3d/user_furniture/monastery_quill_and_inkhorn_set.glb | 36912 B | ассет графики/3D/интерфейса: monastery quill and inkhorn set |
| №0372 app/assets/3d/user_furniture/monastery_rain_water_butt.glb | 45160 B | ассет графики/3D/интерфейса: monastery rain water butt |
| №0373 app/assets/3d/user_furniture/monastery_readers_pulpit.glb | 70796 B | ассет графики/3D/интерфейса: monastery readers pulpit |
| №0374 app/assets/3d/user_furniture/monastery_reading_lectern.glb | 48744 B | ассет графики/3D/интерфейса: monastery reading lectern |
| №0375 app/assets/3d/user_furniture/monastery_refectory_bench.glb | 20408 B | ассет графики/3D/интерфейса: monastery refectory bench |
| №0376 app/assets/3d/user_furniture/monastery_refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: monastery refectory long table |
| №0377 app/assets/3d/user_furniture/monastery_reliquary_casket.glb | 59680 B | ассет графики/3D/интерфейса: monastery reliquary casket |
| №0378 app/assets/3d/user_furniture/monastery_ruling_board.glb | 98044 B | ассет графики/3D/интерфейса: monastery ruling board |
| №0379 app/assets/3d/user_furniture/monastery_rush_light_stand.glb | 19044 B | ассет графики/3D/интерфейса: monastery rush light stand |
| №0380 app/assets/3d/user_furniture/monastery_scribes_stool.glb | 19900 B | ассет графики/3D/интерфейса: monastery scribes stool |
| №0381 app/assets/3d/user_furniture/monastery_sloped_writing_desk.glb | 247044 B | ассет графики/3D/интерфейса: monastery sloped writing desk |
| №0382 app/assets/3d/user_furniture/monastery_stone_drain.glb | 12360 B | ассет графики/3D/интерфейса: monastery stone drain |
| №0383 app/assets/3d/user_furniture/monastery_stone_font.glb | 55200 B | ассет графики/3D/интерфейса: monastery stone font |
| №0384 app/assets/3d/user_furniture/monastery_stone_stair_vice.glb | 130164 B | ассет графики/3D/интерфейса: monastery stone stair vice |
| №0385 app/assets/3d/user_furniture/monastery_tomb_slab.glb | 47852 B | ассет графики/3D/интерфейса: monastery tomb slab |
| №0386 app/assets/3d/user_furniture/monastery_trestle_table.glb | 39912 B | ассет графики/3D/интерфейса: monastery trestle table |
| №0387 app/assets/3d/user_furniture/monastery_wall_torch_bracket.glb | 38324 B | ассет графики/3D/интерфейса: monastery wall torch bracket |
| №0388 app/assets/3d/user_furniture/monastery_wood_stack.glb | 71140 B | ассет графики/3D/интерфейса: monastery wood stack |
| №0389 app/assets/3d/user_furniture/monks_chest.glb | 30508 B | ассет графики/3D/интерфейса: monks chest |
| №0390 app/assets/3d/user_furniture/mortar_pestle.glb | 31516 B | ассет графики/3D/интерфейса: mortar pestle |
| №0391 app/assets/3d/user_furniture/nature_birch_leaning.glb | 14804 B | ассет графики/3D/интерфейса: nature birch leaning |
| №0392 app/assets/3d/user_furniture/nature_birch_mature.glb | 15636 B | ассет графики/3D/интерфейса: nature birch mature |
| №0393 app/assets/3d/user_furniture/nature_birch_young.glb | 13980 B | ассет графики/3D/интерфейса: nature birch young |
| №0394 app/assets/3d/user_furniture/nature_boulder_large.glb | 6660 B | ассет графики/3D/интерфейса: nature boulder large |
| №0395 app/assets/3d/user_furniture/nature_boulder_medium.glb | 6192 B | ассет графики/3D/интерфейса: nature boulder medium |
| №0396 app/assets/3d/user_furniture/nature_boulder_mossy.glb | 24232 B | ассет графики/3D/интерфейса: nature boulder mossy |
| №0397 app/assets/3d/user_furniture/nature_boulder_small.glb | 4760 B | ассет графики/3D/интерфейса: nature boulder small |
| №0398 app/assets/3d/user_furniture/nature_bush_berry.glb | 12316 B | ассет графики/3D/интерфейса: nature bush berry |
| №0399 app/assets/3d/user_furniture/nature_bush_flat.glb | 5980 B | ассет графики/3D/интерфейса: nature bush flat |
| №0400 app/assets/3d/user_furniture/nature_bush_flowering.glb | 16248 B | ассет графики/3D/интерфейса: nature bush flowering |
| №0401 app/assets/3d/user_furniture/nature_bush_round.glb | 5152 B | ассет графики/3D/интерфейса: nature bush round |
| №0402 app/assets/3d/user_furniture/nature_bush_tall.glb | 5968 B | ассет графики/3D/интерфейса: nature bush tall |
| №0403 app/assets/3d/user_furniture/nature_cliff_block.glb | 29492 B | ассет графики/3D/интерфейса: nature cliff block |
| №0404 app/assets/3d/user_furniture/nature_dead_snag_short.glb | 8596 B | ассет графики/3D/интерфейса: nature dead snag short |
| №0405 app/assets/3d/user_furniture/nature_dead_snag_tall.glb | 16784 B | ассет графики/3D/интерфейса: nature dead snag tall |
| №0406 app/assets/3d/user_furniture/nature_fern_clump.glb | 29024 B | ассет графики/3D/интерфейса: nature fern clump |
| №0407 app/assets/3d/user_furniture/nature_fern_single.glb | 13176 B | ассет графики/3D/интерфейса: nature fern single |
| №0408 app/assets/3d/user_furniture/nature_flower_red.glb | 12412 B | ассет графики/3D/интерфейса: nature flower red |
| №0409 app/assets/3d/user_furniture/nature_flower_yellow.glb | 12216 B | ассет графики/3D/интерфейса: nature flower yellow |
| №0410 app/assets/3d/user_furniture/nature_grass_tuft_tall.glb | 6628 B | ассет графики/3D/интерфейса: nature grass tuft tall |
| №0411 app/assets/3d/user_furniture/nature_hedge_block.glb | 2444 B | ассет графики/3D/интерфейса: nature hedge block |
| №0412 app/assets/3d/user_furniture/nature_meadow_disc.glb | 8780 B | ассет графики/3D/интерфейса: nature meadow disc |
| №0413 app/assets/3d/user_furniture/nature_mushroom_group.glb | 39600 B | ассет графики/3D/интерфейса: nature mushroom group |
| №0414 app/assets/3d/user_furniture/nature_oak_ancient.glb | 292756 B | ассет графики/3D/интерфейса: nature oak ancient |
| №0415 app/assets/3d/user_furniture/nature_oak_mature.glb | 279624 B | ассет графики/3D/интерфейса: nature oak mature |
| №0416 app/assets/3d/user_furniture/nature_oak_sapling.glb | 266084 B | ассет графики/3D/интерфейса: nature oak sapling |
| №0417 app/assets/3d/user_furniture/nature_oak_young.glb | 266536 B | ассет графики/3D/интерфейса: nature oak young |
| №0418 app/assets/3d/user_furniture/nature_palm_leaning.glb | 50808 B | ассет графики/3D/интерфейса: nature palm leaning |
| №0419 app/assets/3d/user_furniture/nature_palm_mature.glb | 57076 B | ассет графики/3D/интерфейса: nature palm mature |
| №0420 app/assets/3d/user_furniture/nature_palm_young.glb | 37688 B | ассет графики/3D/интерфейса: nature palm young |
| №0421 app/assets/3d/user_furniture/nature_pebble_cluster.glb | 12184 B | ассет графики/3D/интерфейса: nature pebble cluster |
| №0422 app/assets/3d/user_furniture/nature_pine_columnar.glb | 265888 B | ассет графики/3D/интерфейса: nature pine columnar |
| №0423 app/assets/3d/user_furniture/nature_pine_sapling.glb | 264192 B | ассет графики/3D/интерфейса: nature pine sapling |
| №0424 app/assets/3d/user_furniture/nature_pine_spreading.glb | 265024 B | ассет графики/3D/интерфейса: nature pine spreading |
| №0425 app/assets/3d/user_furniture/nature_pine_windswept.glb | 265012 B | ассет графики/3D/интерфейса: nature pine windswept |
| №0426 app/assets/3d/user_furniture/nature_rock_pile.glb | 11840 B | ассет графики/3D/интерфейса: nature rock pile |
| №0427 app/assets/3d/user_furniture/nature_root_cluster.glb | 18436 B | ассет графики/3D/интерфейса: nature root cluster |
| №0428 app/assets/3d/user_furniture/nature_sapling_pair.glb | 267912 B | ассет графики/3D/интерфейса: nature sapling pair |
| №0429 app/assets/3d/user_furniture/nature_slab_flat.glb | 2744 B | ассет графики/3D/интерфейса: nature slab flat |
| №0430 app/assets/3d/user_furniture/nature_slab_upright.glb | 2484 B | ассет графики/3D/интерфейса: nature slab upright |
| №0431 app/assets/3d/user_furniture/nature_stump_mossy.glb | 6616 B | ассет графики/3D/интерфейса: nature stump mossy |
| №0432 app/assets/3d/user_furniture/nature_stump_oak.glb | 273776 B | ассет графики/3D/интерфейса: nature stump oak |
| №0433 app/assets/3d/user_furniture/nature_stump_pine.glb | 261388 B | ассет графики/3D/интерфейса: nature stump pine |
| №0434 app/assets/3d/user_furniture/nature_topiary_cone.glb | 7524 B | ассет графики/3D/интерфейса: nature topiary cone |
| №0435 app/assets/3d/user_furniture/parchment_stretching_frame.glb | 55508 B | ассет графики/3D/интерфейса: parchment stretching frame |
| №0436 app/assets/3d/user_furniture/physic_bench.glb | 60316 B | ассет графики/3D/интерфейса: physic bench |
| №0437 app/assets/3d/user_furniture/pigment_tray.glb | 39864 B | ассет графики/3D/интерфейса: pigment tray |
| №0438 app/assets/3d/user_furniture/quill_inkhorn_set.glb | 36956 B | ассет графики/3D/интерфейса: quill inkhorn set |
| №0439 app/assets/3d/user_furniture/rain_water_butt.glb | 45168 B | ассет графики/3D/интерфейса: rain water butt |
| №0440 app/assets/3d/user_furniture/range_and_oven.glb | 19732 B | ассет графики/3D/интерфейса: range and oven |
| №0441 app/assets/3d/user_furniture/reading_lectern.glb | 48844 B | ассет графики/3D/интерфейса: reading lectern |
| №0442 app/assets/3d/user_furniture/refectory_bench.glb | 20560 B | ассет графики/3D/интерфейса: refectory bench |
| №0443 app/assets/3d/user_furniture/refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: refectory long table |
| №0444 app/assets/3d/user_furniture/reliquary_casket.glb | 59728 B | ассет графики/3D/интерфейса: reliquary casket |
| №0445 app/assets/3d/user_furniture/road_signpost.glb | 8044 B | ассет графики/3D/интерфейса: road signpost |
| №0446 app/assets/3d/user_furniture/rug.glb | 16540 B | ассет графики/3D/интерфейса: rug |
| №0447 app/assets/3d/user_furniture/ruling_board.glb | 98032 B | ассет графики/3D/интерфейса: ruling board |
| №0448 app/assets/3d/user_furniture/rush_light_stand.glb | 19052 B | ассет графики/3D/интерфейса: rush light stand |
| №0449 app/assets/3d/user_furniture/scribes_stool.glb | 20040 B | ассет графики/3D/интерфейса: scribes stool |
| №0450 app/assets/3d/user_furniture/shop_counter.glb | 58488 B | ассет графики/3D/интерфейса: shop counter |
| №0451 app/assets/3d/user_furniture/sloped_writing_desk.glb | 341476 B | ассет графики/3D/интерфейса: sloped writing desk |
| №0452 app/assets/3d/user_furniture/spinning_wheel.glb | 21900 B | ассет графики/3D/интерфейса: spinning wheel |
| №0453 app/assets/3d/user_furniture/stone_stone_stair_vice_0.glb | 130164 B | ассет графики/3D/интерфейса: stone stone stair vice 0 |
| №0454 app/assets/3d/user_furniture/table_and_stools.glb | 34088 B | ассет графики/3D/интерфейса: table and stools |
| №0455 app/assets/3d/user_furniture/table.glb | 6217412 B | ассет графики/3D/интерфейса: table |
| №0456 app/assets/3d/user_furniture/torch_sconce.glb | 8692 B | ассет графики/3D/интерфейса: torch sconce |
| №0457 app/assets/3d/user_furniture/town_allotment_bed.glb | 42940 B | ассет графики/3D/интерфейса: town allotment bed |
| №0458 app/assets/3d/user_furniture/town_altar_with_candles.glb | 28704 B | ассет графики/3D/интерфейса: town altar with candles |
| №0459 app/assets/3d/user_furniture/town_anvil.glb | 7820 B | ассет графики/3D/интерфейса: town anvil |
| №0460 app/assets/3d/user_furniture/town_apple_tree.glb | 21880 B | ассет графики/3D/интерфейса: town apple tree |
| №0461 app/assets/3d/user_furniture/town_armour_stand.glb | 16180 B | ассет графики/3D/интерфейса: town armour stand |
| №0462 app/assets/3d/user_furniture/town_banner_pole.glb | 16800 B | ассет графики/3D/интерфейса: town banner pole |
| №0463 app/assets/3d/user_furniture/town_barrel.glb | 13340 B | ассет графики/3D/интерфейса: town barrel |
| №0464 app/assets/3d/user_furniture/town_bedroll.glb | 8964 B | ассет графики/3D/интерфейса: town bedroll |
| №0465 app/assets/3d/user_furniture/town_bench.glb | 16564 B | ассет графики/3D/интерфейса: town bench |
| №0466 app/assets/3d/user_furniture/town_boulder_large.glb | 9404 B | ассет графики/3D/интерфейса: town boulder large |
| №0467 app/assets/3d/user_furniture/town_boulder_small.glb | 4768 B | ассет графики/3D/интерфейса: town boulder small |
| №0468 app/assets/3d/user_furniture/town_bush.glb | 9188 B | ассет графики/3D/интерфейса: town bush |
| №0469 app/assets/3d/user_furniture/town_campfire_with_spit.glb | 33304 B | ассет графики/3D/интерфейса: town campfire with spit |
| №0470 app/assets/3d/user_furniture/town_canoe.glb | 15568 B | ассет графики/3D/интерфейса: town canoe |
| №0471 app/assets/3d/user_furniture/town_cargo_cart.glb | 70964 B | ассет графики/3D/интерфейса: town cargo cart |
| №0472 app/assets/3d/user_furniture/town_cauldron_on_tripod.glb | 32232 B | ассет графики/3D/интерфейса: town cauldron on tripod |
| №0473 app/assets/3d/user_furniture/town_cave_mouth.glb | 21616 B | ассет графики/3D/интерфейса: town cave mouth |
| №0474 app/assets/3d/user_furniture/town_chandelier.glb | 24996 B | ассет графики/3D/интерфейса: town chandelier |
| №0475 app/assets/3d/user_furniture/town_chicken_coop.glb | 26176 B | ассет графики/3D/интерфейса: town chicken coop |
| №0476 app/assets/3d/user_furniture/town_cobble_road_corner.glb | 18268 B | ассет графики/3D/интерфейса: town cobble road corner |
| №0477 app/assets/3d/user_furniture/town_cobble_road_junction.glb | 26024 B | ассет графики/3D/интерфейса: town cobble road junction |
| №0478 app/assets/3d/user_furniture/town_cobble_road_tile.glb | 20612 B | ассет графики/3D/интерфейса: town cobble road tile |
| №0479 app/assets/3d/user_furniture/town_cooks_kitchen.glb | 96404 B | ассет графики/3D/интерфейса: town cooks kitchen |
| №0480 app/assets/3d/user_furniture/town_cow_pen_fence.glb | 11268 B | ассет графики/3D/интерфейса: town cow pen fence |
| №0481 app/assets/3d/user_furniture/town_crate_stack.glb | 39416 B | ассет графики/3D/интерфейса: town crate stack |
| №0482 app/assets/3d/user_furniture/town_dead_tree.glb | 6196 B | ассет графики/3D/интерфейса: town dead tree |
| №0483 app/assets/3d/user_furniture/town_dirt_path_tile.glb | 9152 B | ассет графики/3D/интерфейса: town dirt path tile |
| №0484 app/assets/3d/user_furniture/town_farmhouse_and_barn.glb | 161272 B | ассет графики/3D/интерфейса: town farmhouse and barn |
| №0485 app/assets/3d/user_furniture/town_fence_gate.glb | 14544 B | ассет графики/3D/интерфейса: town fence gate |
| №0486 app/assets/3d/user_furniture/town_fence_run.glb | 28988 B | ассет графики/3D/интерфейса: town fence run |
| №0487 app/assets/3d/user_furniture/town_fern_clump.glb | 15892 B | ассет графики/3D/интерфейса: town fern clump |
| №0488 app/assets/3d/user_furniture/town_ferry_raft.glb | 31140 B | ассет графики/3D/интерфейса: town ferry raft |
| №0489 app/assets/3d/user_furniture/town_fishing_boat.glb | 25960 B | ассет графики/3D/интерфейса: town fishing boat |
| №0490 app/assets/3d/user_furniture/town_fishing_hut_on_stilts.glb | 110516 B | ассет графики/3D/интерфейса: town fishing hut on stilts |
| №0491 app/assets/3d/user_furniture/town_fletcher_shop.glb | 117300 B | ассет графики/3D/интерфейса: town fletcher shop |
| №0492 app/assets/3d/user_furniture/town_flower_patch.glb | 34768 B | ассет графики/3D/интерфейса: town flower patch |
| №0493 app/assets/3d/user_furniture/town_general_store.glb | 137904 B | ассет графики/3D/интерфейса: town general store |
| №0494 app/assets/3d/user_furniture/town_goblin_tent.glb | 15120 B | ассет графики/3D/интерфейса: town goblin tent |
| №0495 app/assets/3d/user_furniture/town_goblin_totem.glb | 27832 B | ассет графики/3D/интерфейса: town goblin totem |
| №0496 app/assets/3d/user_furniture/town_grass_ground_tile.glb | 8564 B | ассет графики/3D/интерфейса: town grass ground tile |
| №0497 app/assets/3d/user_furniture/town_grass_tuft_cluster.glb | 5080 B | ассет графики/3D/интерфейса: town grass tuft cluster |
| №0498 app/assets/3d/user_furniture/town_gravestone_set.glb | 23812 B | ассет графики/3D/интерфейса: town gravestone set |
| №0499 app/assets/3d/user_furniture/town_guard_barracks.glb | 162732 B | ассет графики/3D/интерфейса: town guard barracks |
| №0500 app/assets/3d/user_furniture/town_hand_cart.glb | 25308 B | ассет графики/3D/интерфейса: town hand cart |
| №0501 app/assets/3d/user_furniture/town_hay_bale.glb | 16340 B | ассет графики/3D/интерфейса: town hay bale |
| №0502 app/assets/3d/user_furniture/town_hitching_post.glb | 22008 B | ассет графики/3D/интерфейса: town hitching post |
| №0503 app/assets/3d/user_furniture/town_hunters_hide.glb | 33880 B | ассет графики/3D/интерфейса: town hunters hide |
| №0504 app/assets/3d/user_furniture/town_lamp_post.glb | 16804 B | ассет графики/3D/интерфейса: town lamp post |
| №0505 app/assets/3d/user_furniture/town_lily_pads.glb | 16632 B | ассет графики/3D/интерфейса: town lily pads |
| №0506 app/assets/3d/user_furniture/town_log_pile.glb | 37732 B | ассет графики/3D/интерфейса: town log pile |
| №0507 app/assets/3d/user_furniture/town_loom.glb | 46480 B | ассет графики/3D/интерфейса: town loom |
| №0508 app/assets/3d/user_furniture/town_loot_sack.glb | 11820 B | ассет графики/3D/интерфейса: town loot sack |
| №0509 app/assets/3d/user_furniture/town_market_stall_blue.glb | 61540 B | ассет графики/3D/интерфейса: town market stall blue |
| №0510 app/assets/3d/user_furniture/town_market_stall_cream.glb | 60756 B | ассет графики/3D/интерфейса: town market stall cream |
| №0511 app/assets/3d/user_furniture/town_market_stall.glb | 61536 B | ассет графики/3D/интерфейса: town market stall |
| №0512 app/assets/3d/user_furniture/town_mine_entrance.glb | 41744 B | ассет графики/3D/интерфейса: town mine entrance |
| №0513 app/assets/3d/user_furniture/town_mushroom_ring.glb | 22884 B | ассет графики/3D/интерфейса: town mushroom ring |
| №0514 app/assets/3d/user_furniture/town_notice_board.glb | 15924 B | ассет графики/3D/интерфейса: town notice board |
| №0515 app/assets/3d/user_furniture/town_oak_tree.glb | 19492 B | ассет графики/3D/интерфейса: town oak tree |
| №0516 app/assets/3d/user_furniture/town_pine_tree.glb | 7096 B | ассет графики/3D/интерфейса: town pine tree |
| №0517 app/assets/3d/user_furniture/town_plaza_paving_tile.glb | 40396 B | ассет графики/3D/интерфейса: town plaza paving tile |
| №0518 app/assets/3d/user_furniture/town_ploughed_field_tile.glb | 24992 B | ассет графики/3D/интерфейса: town ploughed field tile |
| №0519 app/assets/3d/user_furniture/town_range_and_oven.glb | 19440 B | ассет графики/3D/интерфейса: town range and oven |
| №0520 app/assets/3d/user_furniture/town_reed_clump.glb | 8672 B | ассет графики/3D/интерфейса: town reed clump |
| №0521 app/assets/3d/user_furniture/town_river_bank_tile.glb | 17528 B | ассет графики/3D/интерфейса: town river bank tile |
| №0522 app/assets/3d/user_furniture/town_river_bend_tile.glb | 27100 B | ассет графики/3D/интерфейса: town river bend tile |
| №0523 app/assets/3d/user_furniture/town_river_tile_straight.glb | 19108 B | ассет графики/3D/интерфейса: town river tile straight |
| №0524 app/assets/3d/user_furniture/town_road_signpost.glb | 7824 B | ассет графики/3D/интерфейса: town road signpost |
| №0525 app/assets/3d/user_furniture/town_rock_outcrop.glb | 10020 B | ассет графики/3D/интерфейса: town rock outcrop |
| №0526 app/assets/3d/user_furniture/town_rope_bridge.glb | 104548 B | ассет графики/3D/интерфейса: town rope bridge |
| №0527 app/assets/3d/user_furniture/town_rowing_boat.glb | 26056 B | ассет графики/3D/интерфейса: town rowing boat |
| №0528 app/assets/3d/user_furniture/town_rug.glb | 16352 B | ассет графики/3D/интерфейса: town rug |
| №0529 app/assets/3d/user_furniture/town_scarecrow.glb | 22344 B | ассет графики/3D/интерфейса: town scarecrow |
| №0530 app/assets/3d/user_furniture/town_shop_counter.glb | 61556 B | ассет графики/3D/интерфейса: town shop counter |
| №0531 app/assets/3d/user_furniture/town_smithy.glb | 105612 B | ассет графики/3D/интерфейса: town smithy |
| №0532 app/assets/3d/user_furniture/town_spinning_wheel.glb | 21608 B | ассет графики/3D/интерфейса: town spinning wheel |
| №0533 app/assets/3d/user_furniture/town_standing_stone.glb | 13276 B | ассет графики/3D/интерфейса: town standing stone |
| №0534 app/assets/3d/user_furniture/town_stone_arch_bridge.glb | 51536 B | ассет графики/3D/интерфейса: town stone arch bridge |
| №0535 app/assets/3d/user_furniture/town_stone_church.glb | 145052 B | ассет графики/3D/интерфейса: town stone church |
| №0536 app/assets/3d/user_furniture/town_stone_circle_slab.glb | 31656 B | ассет графики/3D/интерфейса: town stone circle slab |
| №0537 app/assets/3d/user_furniture/town_straw_target.glb | 15176 B | ассет графики/3D/интерфейса: town straw target |
| №0538 app/assets/3d/user_furniture/town_stump_with_axe.glb | 11880 B | ассет графики/3D/интерфейса: town stump with axe |
| №0539 app/assets/3d/user_furniture/town_table_and_stools.glb | 33848 B | ассет графики/3D/интерфейса: town table and stools |
| №0540 app/assets/3d/user_furniture/town_thatched_cottage.glb | 106096 B | ассет графики/3D/интерфейса: town thatched cottage |
| №0541 app/assets/3d/user_furniture/town_timber_house_large.glb | 262356 B | ассет графики/3D/интерфейса: town timber house large |
| №0542 app/assets/3d/user_furniture/town_timber_house_medium.glb | 169188 B | ассет графики/3D/интерфейса: town timber house medium |
| №0543 app/assets/3d/user_furniture/town_timber_house_small.glb | 119348 B | ассет графики/3D/интерфейса: town timber house small |
| №0544 app/assets/3d/user_furniture/town_timber_plank_bridge.glb | 60076 B | ассет графики/3D/интерфейса: town timber plank bridge |
| №0545 app/assets/3d/user_furniture/town_torch_sconce.glb | 8460 B | ассет графики/3D/интерфейса: town torch sconce |
| №0546 app/assets/3d/user_furniture/town_town_bank.glb | 116184 B | ассет графики/3D/интерфейса: town town bank |
| №0547 app/assets/3d/user_furniture/town_town_hall.glb | 252584 B | ассет графики/3D/интерфейса: town town hall |
| №0548 app/assets/3d/user_furniture/town_town_wall_segment.glb | 9696 B | ассет графики/3D/интерфейса: town town wall segment |
| №0549 app/assets/3d/user_furniture/town_town_well.glb | 32492 B | ассет графики/3D/интерфейса: town town well |
| №0550 app/assets/3d/user_furniture/town_treasure_chest.glb | 12404 B | ассет графики/3D/интерфейса: town treasure chest |
| №0551 app/assets/3d/user_furniture/town_village_tavern.glb | 220336 B | ассет графики/3D/интерфейса: town village tavern |
| №0552 app/assets/3d/user_furniture/town_wall_corner_tower.glb | 79592 B | ассет графики/3D/интерфейса: town wall corner tower |
| №0553 app/assets/3d/user_furniture/town_wall_gatehouse.glb | 77180 B | ассет графики/3D/интерфейса: town wall gatehouse |
| №0554 app/assets/3d/user_furniture/town_wall_stair.glb | 34040 B | ассет графики/3D/интерфейса: town wall stair |
| №0555 app/assets/3d/user_furniture/town_wall_walk_crenellated.glb | 15296 B | ассет графики/3D/интерфейса: town wall walk crenellated |
| №0556 app/assets/3d/user_furniture/town_watchtower.glb | 109556 B | ассет графики/3D/интерфейса: town watchtower |
| №0557 app/assets/3d/user_furniture/town_water_trough.glb | 18172 B | ассет графики/3D/интерфейса: town water trough |
| №0558 app/assets/3d/user_furniture/town_weapon_rack.glb | 23152 B | ассет графики/3D/интерфейса: town weapon rack |
| №0559 app/assets/3d/user_furniture/town_wheat_field_tile.glb | 55508 B | ассет графики/3D/интерфейса: town wheat field tile |
| №0560 app/assets/3d/user_furniture/town_willow_tree.glb | 26360 B | ассет графики/3D/интерфейса: town willow tree |
| №0561 app/assets/3d/user_furniture/town_windmill.glb | 121768 B | ассет графики/3D/интерфейса: town windmill |
| №0562 app/assets/3d/user_furniture/town_wizard_tower_base.glb | 64292 B | ассет графики/3D/интерфейса: town wizard tower base |
| №0563 app/assets/3d/user_furniture/town_wizard_tower_mid.glb | 70456 B | ассет графики/3D/интерфейса: town wizard tower mid |
| №0564 app/assets/3d/user_furniture/town_wizard_tower_top.glb | 50984 B | ассет графики/3D/интерфейса: town wizard tower top |
| №0565 app/assets/3d/user_furniture/treasure_chest.glb | 12772 B | ассет графики/3D/интерфейса: treasure chest |
| №0566 app/assets/3d/user_furniture/trestle_table.glb | 40424 B | ассет графики/3D/интерфейса: trestle table |
| №0567 app/assets/3d/user_furniture/weapon_rack.glb | 23300 B | ассет графики/3D/интерфейса: weapon rack |
| №0568 app/assets/3d/user_furniture/wood_stack.glb | 71136 B | ассет графики/3D/интерфейса: wood stack |
| №0569 app/assets/dice/.gitkeep | 0 B | ассет графики/3D/интерфейса: .gitkeep |
| №0570 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png | 2349861 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 07 PM |
| №0571 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_30 PM.png | 2088308 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 30 PM |
| №0572 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_13_27 PM.png | 2584925 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 13 27 PM |
| №0573 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_23_00 PM.png | 2274607 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 23 00 PM |
| №0574 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_24_38 PM.png | 2254958 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 24 38 PM |
| №0575 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_27_51 PM.png | 2389543 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 27 51 PM |
| №0576 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_35_50 PM.png | 2486441 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 35 50 PM |
| №0577 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_41_40 PM.png | 2712929 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 41 40 PM |
| №0578 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_49_58 PM.png | 2751322 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 49 58 PM |
| №0579 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_07 PM.png | 2778707 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 07 PM |
| №0580 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_18 PM.png | 2503466 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 18 PM |
| №0581 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_28 PM.png | 2561809 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 28 PM |
| №0582 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_39 PM.png | 2841483 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 39 PM |
| №0583 app/assets/dice/dice1.png | 348916 B | ассет графики/3D/интерфейса: dice1 |
| №0584 app/assets/dice/dice10-1.png | 386558 B | ассет графики/3D/интерфейса: dice10 1 |
| №0585 app/assets/dice/dice10.png | 386558 B | ассет графики/3D/интерфейса: dice10 |
| №0586 app/assets/dice/dice11.png | 307154 B | ассет графики/3D/интерфейса: dice11 |
| №0587 app/assets/dice/dice12.png | 395864 B | ассет графики/3D/интерфейса: dice12 |
| №0588 app/assets/dice/dice13.png | 344758 B | ассет графики/3D/интерфейса: dice13 |
| №0589 app/assets/dice/dice15.png | 388111 B | ассет графики/3D/интерфейса: dice15 |
| №0590 app/assets/dice/dice16.png | 352768 B | ассет графики/3D/интерфейса: dice16 |
| №0591 app/assets/dice/dice17.png | 342548 B | ассет графики/3D/интерфейса: dice17 |
| №0592 app/assets/dice/dice2.png | 246156 B | ассет графики/3D/интерфейса: dice2 |
| №0593 app/assets/dice/dice3.png | 346757 B | ассет графики/3D/интерфейса: dice3 |
| №0594 app/assets/dice/dice4.png | 348331 B | ассет графики/3D/интерфейса: dice4 |
| №0595 app/assets/dice/dice5.png | 299652 B | ассет графики/3D/интерфейса: dice5 |
| №0596 app/assets/dice/dice6.png | 331669 B | ассет графики/3D/интерфейса: dice6 |
| №0597 app/assets/dice/dice7.png | 343178 B | ассет графики/3D/интерфейса: dice7 |
| №0598 app/assets/dice/dice8.png | 370230 B | ассет графики/3D/интерфейса: dice8 |
| №0599 app/assets/dice/dice9.png | 336030 B | ассет графики/3D/интерфейса: dice9 |
| №0600 app/assets/ui/character-creation/1790622252250.png | 908119 B | ассет графики/3D/интерфейса: 1790622252250 |
| №0601 app/assets/ui/dragon_fire_burst_v2_sprite.png | 237749 B | ассет графики/3D/интерфейса: dragon fire burst v2 sprite |
| №0602 app/assets/ui/dragon_fire.png | 267960 B | ассет графики/3D/интерфейса: dragon fire |
| №0603 app/assets/ui/dragon_flight_v2_sprite.png | 573207 B | ассет графики/3D/интерфейса: dragon flight v2 sprite |
| №0604 app/assets/ui/dragon_frame_strip.svg | 858 B | ассет графики/3D/интерфейса: dragon frame strip |
| №0605 app/assets/ui/dragon.png | 274924 B | ассет графики/3D/интерфейса: dragon |
| №0606 app/assets/ui/fire_front.png | 1276760 B | ассет графики/3D/интерфейса: fire front |
| №0607 app/assets/ui/forest_burned.jpg | 211523 B | ассет графики/3D/интерфейса: forest burned |
| №0608 app/assets/ui/forest_green.jpg | 309184 B | ассет графики/3D/интерфейса: forest green |
| №0609 app/assets/ui/loader_dragon_head.svg | 2388 B | ассет графики/3D/интерфейса: loader dragon head |
| №0610 app/assets/ui/loader_fire.svg | 902 B | ассет графики/3D/интерфейса: loader fire |
| №0611 app/assets/ui/loader_forest_burning.svg | 1448 B | ассет графики/3D/интерфейса: loader forest burning |
| №0612 app/assets/ui/loader_forest.svg | 917 B | ассет графики/3D/интерфейса: loader forest |
| №0613 app/assets/ui/loader_sparks.svg | 626 B | ассет графики/3D/интерфейса: loader sparks |
| №0614 app/assets/ui/update_scene_ash.svg | 432 B | ассет графики/3D/интерфейса: update scene ash |
| №0615 app/assets/ui/update_scene_background.svg | 1141 B | ассет графики/3D/интерфейса: update scene background |
| №0616 app/assets/ui/update_scene_dragon_fire.svg | 733 B | ассет графики/3D/интерфейса: update scene dragon fire |
| №0617 app/assets/ui/update_scene_dragon.svg | 1324 B | ассет графики/3D/интерфейса: update scene dragon |
| №0618 app/assets/ui/update_scene_embers.svg | 474 B | ассет графики/3D/интерфейса: update scene embers |
| №0619 app/assets/ui/update_scene_fire_front.svg | 837 B | ассет графики/3D/интерфейса: update scene fire front |
| №0620 app/assets/ui/update_scene_forest_burned.svg | 1417 B | ассет графики/3D/интерфейса: update scene forest burned |
| №0621 app/assets/ui/update_scene_forest_green.svg | 1181 B | ассет графики/3D/интерфейса: update scene forest green |
| №0622 app/assets/ui/update_scene_smoke.svg | 417 B | ассет графики/3D/интерфейса: update scene smoke |
| №0623 app/assets/ui/vine_bone_frame_strip.svg | 943 B | ассет графики/3D/интерфейса: vine bone frame strip |
| №0624 app/Backgrounds.js | 63130 B | логический модуль: Backgrounds |
| №0625 app/battle_action_ui.js | 18386 B | логический модуль: battle action ui |
| №0626 app/battle_board.js | 37591 B | логический модуль: battle board |
| №0627 app/bestiary_2_0_v56.js | 55429 B | логический модуль: bestiary 2 0 v56 |
| №0628 app/bestiary_catalog_v56_1.js | 16222 B | логический модуль: bestiary catalog v56 1 |
| №0629 app/bestiary_catalog_v56_10.js | 10944 B | логический модуль: bestiary catalog v56 10 |
| №0630 app/bestiary_catalog_v56_11.js | 13164 B | логический модуль: bestiary catalog v56 11 |
| №0631 app/bestiary_catalog_v56_12.js | 10118 B | логический модуль: bestiary catalog v56 12 |
| №0632 app/bestiary_catalog_v56_13.js | 12586 B | логический модуль: bestiary catalog v56 13 |
| №0633 app/bestiary_catalog_v56_2.js | 13525 B | логический модуль: bestiary catalog v56 2 |
| №0634 app/bestiary_catalog_v56_3.js | 14383 B | логический модуль: bestiary catalog v56 3 |
| №0635 app/bestiary_catalog_v56_4.js | 11396 B | логический модуль: bestiary catalog v56 4 |
| №0636 app/bestiary_catalog_v56_5.js | 8648 B | логический модуль: bestiary catalog v56 5 |
| №0637 app/bestiary_catalog_v56_6.js | 9066 B | логический модуль: bestiary catalog v56 6 |
| №0638 app/bestiary_catalog_v56_7.js | 9314 B | логический модуль: bestiary catalog v56 7 |
| №0639 app/bestiary_catalog_v56_8.js | 9559 B | логический модуль: bestiary catalog v56 8 |
| №0640 app/bestiary_catalog_v56_9.js | 9861 B | логический модуль: bestiary catalog v56 9 |
| №0641 app/blood_hunter_engine.js | 82133 B | логика класса Кровавый охотник |
| №0642 app/campaign_manager.js | 7195 B | логический модуль: campaign manager |
| №0643 app/character_builder_v2.js | 109543 B | логический модуль: character builder v2 |
| №0644 app/character_creation_pergament.css | 12669 B | оформление интерфейса: character creation pergament |
| №0645 app/character_creation_pergament.js | 39686 B | логический модуль: character creation pergament |
| №0646 app/character_creation.js | 46823 B | логический модуль: character creation |
| №0647 app/character.js | 11133 B | лист персонажа; состояния и оружие |
| №0648 app/class_features_engine.js | 135018 B | логический модуль: class features engine |
| №0649 app/classesRegistry.js | 10857 B | логический модуль: classesRegistry |
| №0650 app/cloud_account.css | 1213 B | оформление интерфейса: cloud account |
| №0651 app/cloud_account.js | 8970 B | интерфейс авторизации и управления версиями |
| №0652 app/cloud_config.js | 450 B | публичная конфигурация облака |
| №0653 app/cloud_sync.js | 24647 B | синхронизация сохранений через Supabase |
| №0654 app/combat_abilities.js | 12824 B | логический модуль: combat abilities |
| №0655 app/combat_engine.js | 95078 B | движок боя и HP; адаптеры legacy значений |
| №0656 app/companion_gameplay_v27.js | 17531 B | логический модуль: companion gameplay v27 |
| №0657 app/companion_packs_v26.js | 4998 B | логический модуль: companion packs v26 |
| №0658 app/companions.js | 8943 B | логический модуль: companions |
| №0659 app/consumables.js | 15638 B | логический модуль: consumables |
| №0660 app/content_catalog.js | 9721 B | логический модуль: content catalog |
| №0661 app/content_framework.js | 9884 B | логический модуль: content framework |
| №0662 app/content_manifest.js | 3755 B | логический модуль: content manifest |
| №0663 app/crafting_character_influence_test_v46.js | 7123 B | логический модуль: crafting character influence test v46 |
| №0664 app/crafting_disassembly_repair_v51.js | 13334 B | логический модуль: crafting disassembly repair v51 |
| №0665 app/crafting_disassembly_v51.js | 11979 B | логический модуль: crafting disassembly v51 |
| №0666 app/crafting_dlc_v50.js | 8373 B | логический модуль: crafting dlc v50 |
| №0667 app/crafting_economy_v49.js | 17129 B | логический модуль: crafting economy v49 |
| №0668 app/crafting_engine_v31.js | 20294 B | логический модуль: crafting engine v31 |
| №0669 app/crafting_profession_progression_test_v47.js | 5609 B | логический модуль: crafting profession progression test v47 |
| №0670 app/crafting_profession_progression_v47.js | 35781 B | логический модуль: crafting profession progression v47 |
| №0671 app/crafting_professions_v33.js | 19300 B | логический модуль: crafting professions v33 |
| №0672 app/crafting_professions_v38.js | 48800 B | логический модуль: crafting professions v38 |
| №0673 app/crafting_resources_v34.js | 35661 B | логический модуль: crafting resources v34 |
| №0674 app/custom_crafting_v32.js | 15989 B | логический модуль: custom crafting v32 |
| №0675 app/data/classes/Accursed.js | 3369 B | логика классов: Accursed |
| №0676 app/data/classes/accursed.png | 2441667 B | логика классов: accursed |
| №0677 app/data/classes/Alchemist.js | 5589 B | логика классов: Alchemist |
| №0678 app/data/classes/alchemist.png | 1945616 B | логика классов: alchemist |
| №0679 app/data/classes/Artificer.js | 2124 B | логика классов: Artificer |
| №0680 app/data/classes/ARTIFICER.png | 891812 B | логика классов: ARTIFICER |
| №0681 app/data/classes/Barbarian.js | 3822 B | логика классов: Barbarian |
| №0682 app/data/classes/BARBARIAN.png | 815028 B | логика классов: BARBARIAN |
| №0683 app/data/classes/Bard.js | 2085 B | логика классов: Bard |
| №0684 app/data/classes/Bard.png | 769261 B | логика классов: Bard |
| №0685 app/data/classes/beasthart.png | 2255040 B | логика классов: beasthart |
| №0686 app/data/classes/Beastheart.js | 28992 B | логика классов: Beastheart |
| №0687 app/data/classes/blood hunter.png | 2210071 B | логика классов: blood hunter |
| №0688 app/data/classes/BloodHunter.js | 5283 B | логика классов: BloodHunter |
| №0689 app/data/classes/Cleric.js | 1987 B | логика классов: Cleric |
| №0690 app/data/classes/CLERIC.png | 914579 B | логика классов: CLERIC |
| №0691 app/data/classes/Druid.js | 1898 B | логика классов: Druid |
| №0692 app/data/classes/DRUID.png | 776880 B | логика классов: DRUID |
| №0693 app/data/classes/extra_class_stubs.js | 4499 B | логика классов: extra class stubs |
| №0694 app/data/classes/Fighter.js | 3771 B | логика классов: Fighter |
| №0695 app/data/classes/FIGHTER.png | 762812 B | логика классов: FIGHTER |
| №0696 app/data/classes/geist.png | 1776006 B | логика классов: geist |
| №0697 app/data/classes/Ghost.js | 295 B | логика классов: Ghost |
| №0698 app/data/classes/Illigger.js | 6058 B | логика классов: Illigger |
| №0699 app/data/classes/Illigger.png | 1716994 B | логика классов: Illigger |
| №0700 app/data/classes/level_up.js | 62903 B | логика классов: level up |
| №0701 app/data/classes/Martyr.js | 884 B | логика классов: Martyr |
| №0702 app/data/classes/martyr.png | 2381724 B | логика классов: martyr |
| №0703 app/data/classes/Monk.js | 2493 B | логика классов: Monk |
| №0704 app/data/classes/Monk.png | 1115382 B | логика классов: Monk |
| №0705 app/data/classes/Necromancer.js | 1013 B | логика классов: Necromancer |
| №0706 app/data/classes/necromancer.png | 2007714 B | логика классов: necromancer |
| №0707 app/data/classes/Occultist.js | 8507 B | логика классов: Occultist |
| №0708 app/data/classes/occultist.png | 1986332 B | логика классов: occultist |
| №0709 app/data/classes/Paladin.js | 2017 B | логика классов: Paladin |
| №0710 app/data/classes/PALADIN.png | 873991 B | логика классов: PALADIN |
| №0711 app/data/classes/Parasite.js | 545 B | логика классов: Parasite |
| №0712 app/data/classes/parasite.png | 2144116 B | логика классов: parasite |
| №0713 app/data/classes/progressionEngine.js | 20610 B | логика классов: progressionEngine |
| №0714 app/data/classes/Psion.js | 9033 B | логика классов: Psion |
| №0715 app/data/classes/psion.png | 1951350 B | логика классов: psion |
| №0716 app/data/classes/Pugilist.js | 11453 B | логика классов: Pugilist |
| №0717 app/data/classes/pugilist.png | 2022336 B | логика классов: pugilist |
| №0718 app/data/classes/Ranger.js | 1938 B | логика классов: Ranger |
| №0719 app/data/classes/RANGER.png | 643335 B | логика классов: RANGER |
| №0720 app/data/classes/Rogue.js | 3244 B | логика классов: Rogue |
| №0721 app/data/classes/Rogue.png | 579962 B | логика классов: Rogue |
| №0722 app/data/classes/rune keeper.png | 2582772 B | логика классов: rune keeper |
| №0723 app/data/classes/RuneKeeper.js | 2366 B | логика классов: RuneKeeper |
| №0724 app/data/classes/Savant.js | 930 B | логика классов: Savant |
| №0725 app/data/classes/savant.png | 1991433 B | логика классов: savant |
| №0726 app/data/classes/Shifter.js | 734 B | логика классов: Shifter |
| №0727 app/data/classes/shifter.png | 2248497 B | логика классов: shifter |
| №0728 app/data/classes/Sorcerer.js | 2098 B | логика классов: Sorcerer |
| №0729 app/data/classes/SORCERER.png | 939797 B | логика классов: SORCERER |
| №0730 app/data/classes/Swarm.js | 198 B | логика классов: Swarm |
| №0731 app/data/classes/the swam.png | 1759593 B | логика классов: the swam |
| №0732 app/data/classes/Vessel.js | 751 B | логика классов: Vessel |
| №0733 app/data/classes/vessel.png | 1943431 B | логика классов: vessel |
| №0734 app/data/classes/WalterParasite.js | 303 B | логика классов: WalterParasite |
| №0735 app/data/classes/Warden.js | 6678 B | логика классов: Warden |
| №0736 app/data/classes/warden.png | 2093561 B | логика классов: warden |
| №0737 app/data/classes/Warlock.js | 2013 B | логика классов: Warlock |
| №0738 app/data/classes/WARLOCK.png | 981038 B | логика классов: WARLOCK |
| №0739 app/data/classes/Warlord.js | 9504 B | логика классов: Warlord |
| №0740 app/data/classes/warlord.png | 2460016 B | логика классов: warlord |
| №0741 app/data/classes/Witch.js | 8032 B | логика классов: Witch |
| №0742 app/data/classes/witch.png | 1931074 B | логика классов: witch |
| №0743 app/data/classes/Wizard.js | 1627 B | логика классов: Wizard |
| №0744 app/data/classes/Wizard.png | 822251 B | логика классов: Wizard |
| №0745 app/data/feats/Feat_widget.js | 25654 B | черты и таланты: Feat widget |
| №0746 app/data/feats/Feats_phb.js | 19377 B | черты и таланты: Feats phb |
| №0747 app/data/feats/Feats_settings.js | 4392 B | черты и таланты: Feats settings |
| №0748 app/data/feats/Feats_tcoe.js | 5779 B | черты и таланты: Feats tcoe |
| №0749 app/data/feats/Feats_ua_homebrew.js | 11770 B | черты и таланты: Feats ua homebrew |
| №0750 app/data/feats/Feats_xgte.js | 6729 B | черты и таланты: Feats xgte |
| №0751 app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №0752 app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №0753 app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №0754 app/data/maps/3d_stress_test_all.json | 165139 B | данные/конфигурация: 3d stress test all |
| №0755 app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №0756 app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №0757 app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №0758 app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №0759 app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №0760 app/data/spells/Focuses.js | 53387 B | данные заклинаний: Focuses |
| №0761 app/data/spells/Spells1lvl.js | 60079 B | данные заклинаний: Spells1lvl |
| №0762 app/data/spells/Spells2lvl.js | 70401 B | данные заклинаний: Spells2lvl |
| №0763 app/data/spells/Spells3lvl.js | 48531 B | данные заклинаний: Spells3lvl |
| №0764 app/data/spells/Spells4lvl.js | 39396 B | данные заклинаний: Spells4lvl |
| №0765 app/data/spells/Spells5lvl.js | 41719 B | данные заклинаний: Spells5lvl |
| №0766 app/data/spells/spells6lvl.js | 37855 B | данные заклинаний: spells6lvl |
| №0767 app/data/spells/Spells7lvl.js | 29194 B | данные заклинаний: Spells7lvl |
| №0768 app/data/spells/Spells8lvl.js | 21355 B | данные заклинаний: Spells8lvl |
| №0769 app/data/spells/Spells9lvl.js | 32625 B | данные заклинаний: Spells9lvl |
| №0770 app/data/subclasses/subclassesRegistry.js | 111805 B | логика подклассов: subclassesRegistry |
| №0771 app/debug.js | 5961 B | логический модуль: debug |
| №0772 app/dice.js | 42492 B | логический модуль: dice |
| №0773 app/dnd_tools.js | 19419 B | логический модуль: dnd tools |
| №0774 app/expanded_bestiary_v39.js | 49383 B | логический модуль: expanded bestiary v39 |
| №0775 app/expanded_class_registry_bridge.js | 5025 B | логический модуль: expanded class registry bridge |
| №0776 app/expanded_classes_v23.js | 30269 B | логический модуль: expanded classes v23 |
| №0777 app/expanded_subclasses_v23.js | 2030 B | логический модуль: expanded subclasses v23 |
| №0778 app/expansion_class_progressions.js | 6719 B | логический модуль: expansion class progressions |
| №0779 app/expansion_classes_pack.js | 352830 B | логический модуль: expansion classes pack |
| №0780 app/Experience.js | 6150 B | логический модуль: Experience |
| №0781 app/extra_class_ui_bridge.js | 645 B | логический модуль: extra class ui bridge |
| №0782 app/feat_engine.js | 11457 B | логический модуль: feat engine |
| №0783 app/gameplay_core_v57.js | 20212 B | логический модуль: gameplay core v57 |
| №0784 app/ghost_extra_runtime.js | 22293 B | логический модуль: ghost extra runtime |
| №0785 app/ghost_extra_ui.js | 2387 B | логический модуль: ghost extra ui |
| №0786 app/Hero-info.js | 12434 B | логический модуль: Hero info |
| №0787 app/icon_settings_v2.js | 10484 B | логический модуль: icon settings v2 |
| №0788 app/icon_settings.js | 11281 B | логический модуль: icon settings |
| №0789 app/inventory_containers_v54.js | 12772 B | логический модуль: inventory containers v54 |
| №0790 app/inventory-coins.js | 23961 B | логический модуль: inventory coins |
| №0791 app/inventory-modal.js | 32494 B | логический модуль: inventory modal |
| №0792 app/Inventory-weight-tracker.js | 15712 B | логический модуль: Inventory weight tracker |
| №0793 app/Inventory.js | 36947 B | логический модуль: Inventory |
| №0794 app/junk.js | 8387 B | логический модуль: junk |
| №0795 app/kibbles_localization_content_v71.js | 32339 B | логический модуль: kibbles localization content v71 |
| №0796 app/library.js | 9314 B | логический модуль: library |
| №0797 app/Logo.js | 5742 B | логический модуль: Logo |
| №0798 app/magic_engine.js | 7570 B | логический модуль: magic engine |
| №0799 app/market_economy_v55.js | 17219 B | логический модуль: market economy v55 |
| №0800 app/market_expansion_v55_1.js | 21531 B | логический модуль: market expansion v55 1 |
| №0801 app/market_social_v55_3.js | 11752 B | логический модуль: market social v55 3 |
| №0802 app/market_trade_v55_2.js | 25582 B | логический модуль: market trade v55 2 |
| №0803 app/martyr_mhp_2024_runtime.js | 33254 B | логический модуль: martyr mhp 2024 runtime |
| №0804 app/materials.js | 11976 B | логический модуль: materials |
| №0805 app/monster_engine.js | 17873 B | логический модуль: monster engine |
| №0806 app/monster_loot_crafting_bridge_v40.js | 31518 B | логический модуль: monster loot crafting bridge v40 |
| №0807 app/monster_loot_engine_v36.js | 13559 B | логический модуль: monster loot engine v36 |
| №0808 app/monster_loot_engine_v37.js | 18554 B | логический модуль: monster loot engine v37 |
| №0809 app/necromancer_mhp_2024_runtime.js | 43556 B | логический модуль: necromancer mhp 2024 runtime |
| №0810 app/network_engine.js | 45962 B | логический модуль: network engine |
| №0811 app/network_gameplay.js | 87259 B | логический модуль: network gameplay |
| №0812 app/notes.js | 4818 B | логический модуль: notes |
| №0813 app/occultist_kibbles_v11_runtime.js | 60686 B | логический модуль: occultist kibbles v11 runtime |
| №0814 app/onboarding_faq_v71.css | 6093 B | оформление интерфейса: onboarding faq v71 |
| №0815 app/onboarding_faq_v71.js | 32373 B | логический модуль: onboarding faq v71 |
| №0816 app/parasite_extra_runtime.js | 30047 B | логический модуль: parasite extra runtime |
| №0817 app/parasite_extra_ui.js | 4710 B | логический модуль: parasite extra ui |
| №0818 app/predictor_cards.js | 145118 B | логический модуль: predictor cards |
| №0819 app/predictor_deck_ui.js | 39502 B | логический модуль: predictor deck ui |
| №0820 app/predictor_movement.js | 6682 B | логический модуль: predictor movement |
| №0821 app/predictor_runtime.js | 31001 B | логический модуль: predictor runtime |
| №0822 app/Proficiencies.js | 31253 B | логический модуль: Proficiencies |
| №0823 app/Proficienciescheck.js | 10367 B | логический модуль: Proficienciescheck |
| №0824 app/races.js | 52239 B | логический модуль: races |
| №0825 app/resource_gathering_v35.js | 12553 B | логический модуль: resource gathering v35 |
| №0826 app/resource_processing_v44.js | 22150 B | логический модуль: resource processing v44 |
| №0827 app/rulesEngine.js | 46039 B | логический модуль: rulesEngine |
| №0828 app/runekeeper_taron_v12_runtime.js | 27697 B | логический модуль: runekeeper taron v12 runtime |
| №0829 app/savant_laserllama_v561_runtime.js | 29860 B | логический модуль: savant laserllama v561 runtime |
| №0830 app/secondary_entities_engine.js | 7342 B | логический модуль: secondary entities engine |
| №0831 app/Settings_debug.js | 7336 B | логический модуль: Settings debug |
| №0832 app/Settings.js | 59645 B | логический модуль: Settings |
| №0833 app/shifter_laserllama_v2_1_runtime.js | 38454 B | логический модуль: shifter laserllama v2 1 runtime |
| №0834 app/skills.js | 6367 B | логический модуль: skills |
| №0835 app/spellblade_kibbles_runtime.js | 14261 B | логический модуль: spellblade kibbles runtime |
| №0836 app/spells.js | 39220 B | логический модуль: spells |
| №0837 app/styles.css | 24174 B | оформление интерфейса: styles |
| №0838 app/summoning_engine.js | 12861 B | логический модуль: summoning engine |
| №0839 app/swarm_extra_runtime.js | 19936 B | логический модуль: swarm extra runtime |
| №0840 app/swipe-lock.js | 1838 B | логический модуль: swipe lock |
| №0841 app/turn_planner.js | 15930 B | логический модуль: turn planner |
| №0842 app/update_manager_v2.js | 19885 B | логический модуль: update manager v2 |
| №0843 app/update_scene_v2.js | 11560 B | логический модуль: update scene v2 |
| №0844 app/vessel_laserllama_v4_runtime.js | 48055 B | логический модуль: vessel laserllama v4 runtime |
| №0845 app/vtt_character_actions_v64.js | 4047 B | логический модуль: vtt character actions v64 |
| №0846 app/vtt_character_sheet_v63.js | 3966 B | логический модуль: vtt character sheet v63 |
| №0847 app/vtt_combat_event_bus_v69.js | 8287 B | логический модуль: vtt combat event bus v69 |
| №0848 app/vtt_combat_log_v66.js | 8113 B | логический модуль: vtt combat log v66 |
| №0849 app/vtt_debug_character_lab_v702.js | 16566 B | логический модуль: vtt debug character lab v702 |
| №0850 app/vtt_debug_dice_lab_v706.js | 9112 B | логический модуль: vtt debug dice lab v706 |
| №0851 app/vtt_debug_error_log_v709.js | 5965 B | логический модуль: vtt debug error log v709 |
| №0852 app/vtt_debug_lab_v703.js | 12151 B | логический модуль: vtt debug lab v703 |
| №0853 app/vtt_debug_panel_v70.js | 17285 B | логический модуль: vtt debug panel v70 |
| №0854 app/vtt_debug_rules_matrix_v707.js | 6881 B | логический модуль: vtt debug rules matrix v707 |
| №0855 app/vtt_debug_sandbox_v701.js | 14634 B | логический модуль: vtt debug sandbox v701 |
| №0856 app/vtt_debug_scenario_editor_v705.js | 10352 B | логический модуль: vtt debug scenario editor v705 |
| №0857 app/vtt_debug_scenarios_v704.js | 8385 B | логический модуль: vtt debug scenarios v704 |
| №0858 app/vtt_debug_tasks_v708.js | 25273 B | логический модуль: vtt debug tasks v708 |
| №0859 app/vtt_dice_resolution_v65.js | 3941 B | логический модуль: vtt dice resolution v65 |
| №0860 app/vtt_encounter_checkpoint_v68.js | 9606 B | логический модуль: vtt encounter checkpoint v68 |
| №0861 app/vtt_encounter_map_v59.js | 9462 B | логический модуль: vtt encounter map v59 |
| №0862 app/vtt_gameplay_ux_v58.js | 8641 B | логический модуль: vtt gameplay ux v58 |
| №0863 app/vtt_mobile_battle_v61.js | 4559 B | логический модуль: vtt mobile battle v61 |
| №0864 app/vtt_mobile_combat_hud_v62.js | 9071 B | логический модуль: vtt mobile combat hud v62 |
| №0865 app/vtt_mobile_session_v67.js | 11143 B | логический модуль: vtt mobile session v67 |
| №0866 app/vtt_project_manifest_v70.js | 44405 B | логический модуль: vtt project manifest v70 |
| №0867 app/vtt_token_interaction_v60.js | 8542 B | логический модуль: vtt token interaction v60 |
| №0868 app/Wallpapers.js | 19943 B | логический модуль: Wallpapers |
| №0869 app/walter_parasite_extra_runtime.js | 33758 B | логический модуль: walter parasite extra runtime |
| №0870 app/walter_parasite_ui.js | 4185 B | логический модуль: walter parasite ui |
| №0871 app/warden_mhp_2024_runtime.js | 41820 B | логический модуль: warden mhp 2024 runtime |
| №0872 app/warlord_laserllama_v330_runtime.js | 15866 B | логический модуль: warlord laserllama v330 runtime |
| №0873 app/weapons.js | 3380 B | логический модуль: weapons |
| №0874 app/weaponsheavy.js | 8328 B | логический модуль: weaponsheavy |
| №0875 app/weaponsmelee.js | 20232 B | логический модуль: weaponsmelee |
| №0876 app/weaponsranged.js | 18195 B | логический модуль: weaponsranged |
| №0877 app/weaponsspecial.js | 5655 B | логический модуль: weaponsspecial |
| №0878 app/world_resource_gathering_v53.js | 17353 B | логический модуль: world resource gathering v53 |
| №0879 arcanacards.png | 1820683 B | текстура/изображение: arcanacards |
| №0880 ash_v2_sprite.png | 442476 B | текстура/изображение: ash v2 sprite |
| №0881 bed.glb | 5718760 B | 3D модель/геометрия: bed |
| №0882 bookshelf.glb | 7818348 B | 3D модель/геометрия: bookshelf |
| №0883 chair.glb | 4643004 B | 3D модель/геометрия: chair |
| №0884 closet.glb | 6550260 B | 3D модель/геометрия: closet |
| №0885 commode.glb | 4845868 B | 3D модель/геометрия: commode |
| №0886 desktop/main.cjs | 8991 B | Electron: создание окна Windows |
| №0887 desktop/preload.cjs | 2239 B | Electron: preload и мост к UI |
| №0888 desktop/prepare.cjs | 3322 B | Electron: подготовка web ресурсов |
| №0889 desktop/update.cjs | 10917 B | Electron: обновление |
| №0890 DND_VTT_FURNITURE_CONVERSION_KIT.zip | 4072 B | архив ассетов: DND VTT FURNITURE CONVERSION KIT |
| №0891 DND_VTT_FURNITURE_READY_02.zip | 65111 B | архив ассетов: DND VTT FURNITURE READY 02 |
| №0892 DND_VTT_FURNITURE_READY_03.zip | 84538 B | архив ассетов: DND VTT FURNITURE READY 03 |
| №0893 DND_VTT_FURNITURE_READY_04.zip | 133763 B | архив ассетов: DND VTT FURNITURE READY 04 |
| №0894 DND_VTT_FURNITURE_READY_05.zip | 54294 B | архив ассетов: DND VTT FURNITURE READY 05 |
| №0895 DND_VTT_FURNITURE_READY_06.zip | 89087 B | архив ассетов: DND VTT FURNITURE READY 06 |
| №0896 DND_VTT_FURNITURE_READY_07.zip | 73932 B | архив ассетов: DND VTT FURNITURE READY 07 |
| №0897 DND_VTT_FURNITURE_READY_08.zip | 67621 B | архив ассетов: DND VTT FURNITURE READY 08 |
| №0898 DND_VTT_FURNITURE_READY_09_20_MODELS.zip | 101933 B | архив ассетов: DND VTT FURNITURE READY 09 20 MODELS |
| №0899 DND_VTT_REMAINING_GLB_BULK.zip | 5302181 B | архив ассетов: DND VTT REMAINING GLB BULK |
| №0900 docs/00_AI_PROJECT_GUIDE.md | 351623 B | документация или отчёт: 00 AI PROJECT GUIDE |
| №0901 docs/00_NEW_CHAT_PROMPT_V56_10.txt | 2658 B | документация или отчёт: 00 NEW CHAT PROMPT V56 10 |
| №0902 docs/00_NEW_CHAT_PROMPT_V56_11.txt | 2118 B | документация или отчёт: 00 NEW CHAT PROMPT V56 11 |
| №0903 docs/00_NEW_CHAT_PROMPT_V56_12.txt | 763 B | документация или отчёт: 00 NEW CHAT PROMPT V56 12 |
| №0904 docs/00_NEW_CHAT_PROMPT_V56_9.txt | 3900 B | документация или отчёт: 00 NEW CHAT PROMPT V56 9 |
| №0905 docs/2026-10-09_ota_v74_00_17_checkpoint.json | 1645 B | документация или отчёт: 2026 10 09 ota v74 00 17 checkpoint |
| №0906 docs/2026-10-09_ota_v74_00_17.md | 6180 B | документация или отчёт: 2026 10 09 ota v74 00 17 |
| №0907 docs/2026-10-11_ota_v74_00_57_checkpoint.json | 469 B | документация или отчёт: 2026 10 11 ota v74 00 57 checkpoint |
| №0908 docs/2026-10-11_ota_v74_00_57.md | 5873 B | документация или отчёт: 2026 10 11 ota v74 00 57 |
| №0909 docs/3D_ASSET_IMPORT_BATCHES.md | 32725 B | документация или отчёт: 3D ASSET IMPORT BATCHES |
| №0910 docs/3d_character_anatomy/ADULT_ANATOMY_PROGRESS.md | 43788 B | документация или отчёт: ADULT ANATOMY PROGRESS |
| №0911 docs/3d_character_anatomy/ASSET_AUDIT_2026-10-12.json | 22458 B | документация или отчёт: ASSET AUDIT 2026 10 12 |
| №0912 docs/3d_character_anatomy/SKIN_MATERIAL_PIPELINE.md | 7470 B | документация или отчёт: SKIN MATERIAL PIPELINE |
| №0913 docs/3d_character_journal/2026-10-09_01_morph_architecture.md | 2418 B | документация или отчёт: 2026 10 09 01 morph architecture |
| №0914 docs/3d_character_journal/2026-10-09_02_morph_bridge.md | 2712 B | документация или отчёт: 2026 10 09 02 morph bridge |
| №0915 docs/3d_character_journal/2026-10-09_03_morph_bridge_diagnostics.md | 1768 B | документация или отчёт: 2026 10 09 03 morph bridge diagnostics |
| №0916 docs/3d_character_journal/2026-10-09_04_skin_textures.md | 4995 B | документация или отчёт: 2026 10 09 04 skin textures |
| №0917 docs/3d_character_journal/2026-10-09_05_named_makehuman_morphs.md | 8679 B | документация или отчёт: 2026 10 09 05 named makehuman morphs |
| №0918 docs/3d_character_journal/2026-10-09_06_female_stage1_checkpoint.json | 5867 B | документация или отчёт: 2026 10 09 06 female stage1 checkpoint |
| №0919 docs/3d_character_journal/2026-10-09_06_female_stage1.md | 8415 B | документация или отчёт: 2026 10 09 06 female stage1 |
| №0920 docs/3d_character_journal/2026-10-09_07_female_stage2_checkpoint.json | 871 B | документация или отчёт: 2026 10 09 07 female stage2 checkpoint |
| №0921 docs/3d_character_journal/2026-10-09_07_female_stage2.md | 7677 B | документация или отчёт: 2026 10 09 07 female stage2 |
| №0922 docs/3d_character_journal/2026-10-09_08_female_release_checkpoint.json | 1725 B | документация или отчёт: 2026 10 09 08 female release checkpoint |
| №0923 docs/3d_character_journal/2026-10-09_08_female_release.md | 7794 B | документация или отчёт: 2026 10 09 08 female release |
| №0924 docs/3d_character_journal/2026-10-10_editor_v74_00_22.md | 6792 B | документация или отчёт: 2026 10 10 editor v74 00 22 |
| №0925 docs/3d_character_journal/2026-10-11_editor_v74_00_32.md | 1158 B | документация или отчёт: 2026 10 11 editor v74 00 32 |
| №0926 docs/3d_character_journal/2026-10-11_editor_v74_00_33.md | 1260 B | документация или отчёт: 2026 10 11 editor v74 00 33 |
| №0927 docs/3d_character_journal/2026-10-11_editor_v74_00_34.md | 3336 B | документация или отчёт: 2026 10 11 editor v74 00 34 |
| №0928 docs/3d_character_journal/2026-10-11_editor_v74_00_35.md | 3249 B | документация или отчёт: 2026 10 11 editor v74 00 35 |
| №0929 docs/3d_character_races/aarakocra.md | 4966 B | документация или отчёт: aarakocra |
| №0930 docs/3d_character_races/aasimar.md | 2398 B | документация или отчёт: aasimar |
| №0931 docs/3d_character_races/ANIMAL_HEADS.md | 5724 B | документация или отчёт: ANIMAL HEADS |
| №0932 docs/3d_character_races/autognome.md | 2759 B | документация или отчёт: autognome |
| №0933 docs/3d_character_races/AVIAN_ELEPHANT_HEADS.md | 5661 B | документация или отчёт: AVIAN ELEPHANT HEADS |
| №0934 docs/3d_character_races/bugbear.md | 4059 B | документация или отчёт: bugbear |
| №0935 docs/3d_character_races/centaur.md | 2896 B | документация или отчёт: centaur |
| №0936 docs/3d_character_races/changeling.md | 2162 B | документация или отчёт: changeling |
| №0937 docs/3d_character_races/dhampir.md | 1557 B | документация или отчёт: dhampir |
| №0938 docs/3d_character_races/dragonborn.md | 5010 B | документация или отчёт: dragonborn |
| №0939 docs/3d_character_races/dwarf_hill.md | 2179 B | документация или отчёт: dwarf hill |
| №0940 docs/3d_character_races/dwarf_mountain.md | 2179 B | документация или отчёт: dwarf mountain |
| №0941 docs/3d_character_races/elf_drow.md | 4152 B | документация или отчёт: elf drow |
| №0942 docs/3d_character_races/elf_high.md | 4150 B | документация или отчёт: elf high |
| №0943 docs/3d_character_races/elf_wood.md | 4135 B | документация или отчёт: elf wood |
| №0944 docs/3d_character_races/EXTRA_FORMS_PLAN.md | 5841 B | документация или отчёт: EXTRA FORMS PLAN |
| №0945 docs/3d_character_races/fairy.md | 2154 B | документация или отчёт: fairy |
| №0946 docs/3d_character_races/firbolg.md | 1211 B | документация или отчёт: firbolg |
| №0947 docs/3d_character_races/full_orc.md | 2994 B | документация или отчёт: full orc |
| №0948 docs/3d_character_races/FUR_PACK.md | 3742 B | документация или отчёт: FUR PACK |
| №0949 docs/3d_character_races/genasi_air.md | 1474 B | документация или отчёт: genasi air |
| №0950 docs/3d_character_races/genasi_earth.md | 1519 B | документация или отчёт: genasi earth |
| №0951 docs/3d_character_races/genasi_fire.md | 1527 B | документация или отчёт: genasi fire |
| №0952 docs/3d_character_races/genasi_water.md | 1464 B | документация или отчёт: genasi water |
| №0953 docs/3d_character_races/ghost.md | 5482 B | документация или отчёт: ghost |
| №0954 docs/3d_character_races/githyanki.md | 1321 B | документация или отчёт: githyanki |
| №0955 docs/3d_character_races/githzerai.md | 1321 B | документация или отчёт: githzerai |
| №0956 docs/3d_character_races/gnome_forest.md | 2175 B | документация или отчёт: gnome forest |
| №0957 docs/3d_character_races/gnome_rock.md | 2177 B | документация или отчёт: gnome rock |
| №0958 docs/3d_character_races/goblin.md | 1278 B | документация или отчёт: goblin |
| №0959 docs/3d_character_races/goliath.md | 1362 B | документация или отчёт: goliath |
| №0960 docs/3d_character_races/hadozee.md | 4245 B | документация или отчёт: hadozee |
| №0961 docs/3d_character_races/HAIR_PACK.md | 4833 B | документация или отчёт: HAIR PACK |
| №0962 docs/3d_character_races/half_elf.md | 4189 B | документация или отчёт: half elf |
| №0963 docs/3d_character_races/half_orc.md | 3002 B | документация или отчёт: half orc |
| №0964 docs/3d_character_races/halfling_lightfoot.md | 3486 B | документация или отчёт: halfling lightfoot |
| №0965 docs/3d_character_races/halfling_stout.md | 3482 B | документация или отчёт: halfling stout |
| №0966 docs/3d_character_races/harengon.md | 5657 B | документация или отчёт: harengon |
| №0967 docs/3d_character_races/hexblood.md | 1643 B | документация или отчёт: hexblood |
| №0968 docs/3d_character_races/hobgoblin.md | 1210 B | документация или отчёт: hobgoblin |
| №0969 docs/3d_character_races/kalashtar.md | 1410 B | документация или отчёт: kalashtar |
| №0970 docs/3d_character_races/kender.md | 1159 B | документация или отчёт: kender |
| №0971 docs/3d_character_races/kenku.md | 5013 B | документация или отчёт: kenku |
| №0972 docs/3d_character_races/kobold.md | 4696 B | документация или отчёт: kobold |
| №0973 docs/3d_character_races/lizardfolk.md | 4944 B | документация или отчёт: lizardfolk |
| №0974 docs/3d_character_races/loxodon.md | 4673 B | документация или отчёт: loxodon |
| №0975 docs/3d_character_races/minotaur.md | 6054 B | документация или отчёт: minotaur |
| №0976 docs/3d_character_races/myconid.md | 1846 B | документация или отчёт: myconid |
| №0977 docs/3d_character_races/NATIVE_LIMBS.md | 6433 B | документация или отчёт: NATIVE LIMBS |
| №0978 docs/3d_character_races/owlin.md | 5120 B | документация или отчёт: owlin |
| №0979 docs/3d_character_races/parasite.md | 3100 B | документация или отчёт: parasite |
| №0980 docs/3d_character_races/plasmoid.md | 1933 B | документация или отчёт: plasmoid |
| №0981 docs/3d_character_races/RACES_3D_REMAINING_AUDIT_2026-10-12.md | 35486 B | документация или отчёт: RACES 3D REMAINING AUDIT 2026 10 12 |
| №0982 docs/3d_character_races/reborn.md | 1619 B | документация или отчёт: reborn |
| №0983 docs/3d_character_races/REMAINING_WORK.md | 23848 B | документация или отчёт: REMAINING WORK |
| №0984 docs/3d_character_races/satyr.md | 5063 B | документация или отчёт: satyr |
| №0985 docs/3d_character_races/shifter.md | 3214 B | документация или отчёт: shifter |
| №0986 docs/3d_character_races/simic_hybrid.md | 2647 B | документация или отчёт: simic hybrid |
| №0987 docs/3d_character_races/swarm_bats.md | 1019 B | документация или отчёт: swarm bats |
| №0988 docs/3d_character_races/swarm_beetles.md | 6967 B | документация или отчёт: swarm beetles |
| №0989 docs/3d_character_races/SWARM_DENSE_REDESIGN.md | 9032 B | документация или отчёт: SWARM DENSE REDESIGN |
| №0990 docs/3d_character_races/swarm_rats.md | 6463 B | документация или отчёт: swarm rats |
| №0991 docs/3d_character_races/tabaxi.md | 6015 B | документация или отчёт: tabaxi |
| №0992 docs/3d_character_races/TEXTURE_PACK_CHECKPOINT.md | 17270 B | документация или отчёт: TEXTURE PACK CHECKPOINT |
| №0993 docs/3d_character_races/TIEFLING_DETAIL_REDESIGN.md | 7294 B | документация или отчёт: TIEFLING DETAIL REDESIGN |
| №0994 docs/3d_character_races/tiefling.md | 2992 B | документация или отчёт: tiefling |
| №0995 docs/3d_character_races/tortle.md | 5805 B | документация или отчёт: tortle |
| №0996 docs/3d_character_races/triton.md | 1588 B | документация или отчёт: triton |
| №0997 docs/3d_character_races/vedalken.md | 1301 B | документация или отчёт: vedalken |
| №0998 docs/3d_character_races/walter_parasite.md | 3278 B | документация или отчёт: walter parasite |
| №0999 docs/3d_character_races/warforged.md | 2731 B | документация или отчёт: warforged |
| №1000 docs/3d_character_races/yuan_ti.md | 1669 B | документация или отчёт: yuan ti |
| №1001 docs/AI_AUTOMATION.md | 4081 B | документация или отчёт: AI AUTOMATION |
| №1002 docs/CLASS_IMPLEMENTATION_PLAN.md | 19250 B | документация или отчёт: CLASS IMPLEMENTATION PLAN |
| №1003 docs/CLASS_MECHANICS_SPEC.md | 38943 B | документация или отчёт: CLASS MECHANICS SPEC |
| №1004 docs/CLOUD_CHARACTER_SYNC.md | 31142 B | документация или отчёт: CLOUD CHARACTER SYNC |
| №1005 docs/CLOUD_SAVE_CALLERS.txt | 1869 B | документация или отчёт: CLOUD SAVE CALLERS |
| №1006 docs/CONTENT_MANAGER_ARCHITECTURE.md | 2565 B | документация или отчёт: CONTENT MANAGER ARCHITECTURE |
| №1007 docs/content-catalog-v1.json | 661 B | документация или отчёт: content catalog v1 |
| №1008 docs/content-packages/demo-race.json | 299 B | документация или отчёт: demo race |
| №1009 docs/DND_VTT_CLASS_AUDIT_V74_00_17.md | 184356 B | документация или отчёт: DND VTT CLASS AUDIT V74 00 17 |
| №1010 docs/Help.txt | 110717 B | документация или отчёт: Help |
| №1011 docs/KIBBLES_ATTRIBUTION_V71.md | 803 B | документация или отчёт: KIBBLES ATTRIBUTION V71 |
| №1012 docs/map-stage-740019.md | 1675 B | документация или отчёт: map stage 740019 |
| №1013 docs/map-stage-740021.md | 2000 B | документация или отчёт: map stage 740021 |
| №1014 docs/modular-content/android-texture-imports.json | 3843 B | документация или отчёт: android texture imports |
| №1015 docs/modular-content/audit.json | 1754999 B | документация или отчёт: audit |
| №1016 docs/modular-content/catalog-entry-v1.schema.json | 2876 B | документация или отчёт: catalog entry v1.schema |
| №1017 docs/modular-content/commerce-transfer.json | 8608 B | документация или отчёт: commerce transfer |
| №1018 docs/modular-content/DEPENDENCIES.md | 8468 B | документация или отчёт: DEPENDENCIES |
| №1019 docs/modular-content/DEVICE_QA.md | 7947 B | документация или отчёт: DEVICE QA |
| №1020 docs/modular-content/EXTRACTION_STAGE2.md | 7041 B | документация или отчёт: EXTRACTION STAGE2 |
| №1021 docs/modular-content/final-apk-metrics.json | 1291 B | документация или отчёт: final apk metrics |
| №1022 docs/modular-content/hotfix-1.00.07-metrics.json | 1451 B | документация или отчёт: hotfix 1.00.07 metrics |
| №1023 docs/modular-content/LICENSE_REVIEW.md | 3704 B | документация или отчёт: LICENSE REVIEW |
| №1024 docs/modular-content/live-manager-texture-comparison.json | 436 B | документация или отчёт: live manager texture comparison |
| №1025 docs/modular-content/minimal-1.00.08-metrics.json | 1411 B | документация или отчёт: minimal 1.00.08 metrics |
| №1026 docs/modular-content/native-validation.json | 2495 B | документация или отчёт: native validation |
| №1027 docs/modular-content/old-apk-inspection.json | 1311 B | документация или отчёт: old apk inspection |
| №1028 docs/modular-content/old-apk-objects.json | 196276 B | документация или отчёт: old apk objects |
| №1029 docs/modular-content/optimized-1.00.09-metrics.json | 1495 B | документация или отчёт: optimized 1.00.09 metrics |
| №1030 docs/modular-content/png-container-audit.json | 362 B | документация или отчёт: png container audit |
| №1031 docs/modular-content/PROGRESS.md | 12878 B | документация или отчёт: PROGRESS |
| №1032 docs/modular-content/public-v2-verification.json | 61493 B | документация или отчёт: public v2 verification |
| №1033 docs/modular-content/public-verification.json | 1729 B | документация или отчёт: public verification |
| №1034 docs/modular-content/quaternius-public-verification.json | 399 B | документация или отчёт: quaternius public verification |
| №1035 docs/modular-content/quaternius-source-comparison.json | 47480 B | документация или отчёт: quaternius source comparison |
| №1036 docs/modular-content/REPORT.md | 25826 B | документация или отчёт: REPORT |
| №1037 docs/modular-content/RESUME_STYLE_FIX.md | 1990 B | документация или отчёт: RESUME STYLE FIX |
| №1038 docs/modular-content/resume-1.00.10-metrics.json | 1553 B | документация или отчёт: resume 1.00.10 metrics |
| №1039 docs/modular-content/RETAINED_APK_AUDIT.md | 3729 B | документация или отчёт: RETAINED APK AUDIT |
| №1040 docs/modular-content/retained-1.00.08-summary.json | 2936 B | документация или отчёт: retained 1.00.08 summary |
| №1041 docs/modular-content/retained-1.00.08-textures.json | 8726 B | документация или отчёт: retained 1.00.08 textures |
| №1042 docs/modular-content/retained-1.00.08-top-assets.json | 2133 B | документация или отчёт: retained 1.00.08 top assets |
| №1043 docs/modular-content/split-inventory.json | 33489 B | документация или отчёт: split inventory |
| №1044 docs/modular-content/UNITY-1.00.11-measured.json | 2382 B | документация или отчёт: UNITY 1.00.11 measured |
| №1045 docs/modular-content/UNITY-1.00.11.md | 7583 B | документация или отчёт: UNITY 1.00.11 |
| №1046 docs/MONETIZATION_ROADMAP.md | 15924 B | документация или отчёт: MONETIZATION ROADMAP |
| №1047 docs/NETWORK_APK_NOTES.md | 7296 B | документация или отчёт: NETWORK APK NOTES |
| №1048 docs/PREDICTOR_APPROVED_CARD_STATUS.md | 52542 B | документация или отчёт: PREDICTOR APPROVED CARD STATUS |
| №1049 docs/PREDICTOR_CLASS_SPEC.md | 94181 B | документация или отчёт: PREDICTOR CLASS SPEC |
| №1050 docs/PRODUCT_ACCESS_AND_MONETIZATION.md | 12539 B | документация или отчёт: PRODUCT ACCESS AND MONETIZATION |
| №1051 docs/ROOT_FURNITURE_IMPORT_REPORT.md | 6882 B | документация или отчёт: ROOT FURNITURE IMPORT REPORT |
| №1052 docs/SIGNATURE_ASSET_FIX_74_00_66.md | 1729 B | документация или отчёт: SIGNATURE ASSET FIX 74 00 66 |
| №1053 docs/SUPABASE_MAIL_SETUP_PROMPT_RU.md | 2853 B | документация или отчёт: SUPABASE MAIL SETUP PROMPT RU |
| №1054 docs/UNIFIED_RELEASE.md | 6136 B | документация или отчёт: UNIFIED RELEASE |
| №1055 docs/UNITY_CHARACTER_SHEET_PARITY.md | 12064 B | документация или отчёт: UNITY CHARACTER SHEET PARITY |
| №1056 docs/UNITY_CLOUD_HANDOFF.md | 37179 B | документация или отчёт: UNITY CLOUD HANDOFF |
| №1057 docs/UNITY_MIGRATION_PLAN.md | 14710 B | документация или отчёт: UNITY MIGRATION PLAN |
| №1058 docs/unity-account/ACCESS_AND_TOUCH_1.00.12.md | 8253 B | документация или отчёт: ACCESS AND TOUCH 1.00.12 |
| №1059 docs/unity-account/ADMIN_CENTER_AND_PRIVATE_WORKSHOP.md | 9558 B | документация или отчёт: ADMIN CENTER AND PRIVATE WORKSHOP |
| №1060 docs/unity-account/IMPLEMENTATION_STATUS.md | 9342 B | документация или отчёт: IMPLEMENTATION STATUS |
| №1061 docs/unity-account/SUPABASE_DEPLOYMENT_1.00.12.md | 3575 B | документация или отчёт: SUPABASE DEPLOYMENT 1.00.12 |
| №1062 docs/WINDOWS_DESKTOP.md | 3756 B | документация или отчёт: WINDOWS DESKTOP |
| №1063 dragon_fire_v2_sprite.png | 1013123 B | текстура/изображение: dragon fire v2 sprite |
| №1064 embers_v2_sprite.png | 698014 B | текстура/изображение: embers v2 sprite |
| №1065 FAQ.md | 38563 B | документация или отчёт: FAQ |
| №1066 fire_front_v2_sprite.png | 2249732 B | текстура/изображение: fire front v2 sprite |
| №1067 fire_spread_mask_v2_sprite.png | 1373284 B | текстура/изображение: fire spread mask v2 sprite |
| №1068 flash_v2_sprite.png | 803264 B | текстура/изображение: flash v2 sprite |
| №1069 floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1070 floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1071 floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1072 floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1073 floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1074 floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1075 floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1076 floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1077 floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1078 floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1079 floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1080 floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1081 floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1082 floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1083 floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1084 floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1085 floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1086 floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1087 GLENMORIL Soundtrack - Music Box.mp3 | 1827664 B | аудиофайл: GLENMORIL Soundtrack   Music Box |
| №1088 gltf_catalog.js | 3197 B | логический модуль: gltf catalog |
| №1089 heat_glow_v2_sprite.png | 836371 B | текстура/изображение: heat glow v2 sprite |
| №1090 human-base-rigged.glb | 4994640 B | 3D модель/геометрия: human base rigged |
| №1091 index.html | 89700 B | HTML-точка входа; интерфейс и порядок JS загрузки |
| №1092 Jalan Jalan - Lotus.mp3 | 9083034 B | аудиофайл: Jalan Jalan   Lotus |
| №1093 lineage_2_16. Shepard's Flute.mp3 | 2997816 B | аудиофайл: lineage 2 16. Shepard's Flute |
| №1094 manifest.json | 488 B | данные/конфигурация: manifest |
| №1095 Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3 | 4020570 B | аудиофайл: Oliver DeRiviere   Prelude to an End (grizzlymusic.ru) |
| №1096 Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3 | 3530381 B | аудиофайл: Oliver Deriviere   Who Am I (grizzlymusic.ru) |
| №1097 package.json | 1608 B | npm и упаковка desktop EXE |
| №1098 PROJECT_ATLAS.md | генерируется | машиночитаемая карта репозитория для ИИ |
| №1099 PROJECT_ATLAS.txt | генерируется | человекочитаемая карта репозитория |
| №1100 README.md | 145 B | документация или отчёт: README |
| №1101 release-staging/unity-android-approval.json | 470 B | данные/конфигурация: unity android approval |
| №1102 release-staging/unity-release.json | 3914 B | данные/конфигурация: unity release |
| №1103 smoke_back_v2_sprite-1.png | 1707378 B | текстура/изображение: smoke back v2 sprite 1 |
| №1104 smoke_back_v2_sprite.png | 1814587 B | текстура/изображение: smoke back v2 sprite |
| №1105 smoke_front_v2_sprite-1.png | 1890480 B | текстура/изображение: smoke front v2 sprite 1 |
| №1106 smoke_front_v2_sprite.png | 2064687 B | текстура/изображение: smoke front v2 sprite |
| №1107 smoke_mid_v2_sprite.png | 1898516 B | текстура/изображение: smoke mid v2 sprite |
| №1108 supabase/migrations/202610130001_characters.sql | 4421 B | SQL миграция Supabase |
| №1109 supabase/migrations/202610210001_access_control.sql | 8940 B | SQL миграция Supabase |
| №1110 supabase/tests/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №1111 supabase/tests/access-control.mjs | 7783 B | вспомогательный файл: access control |
| №1112 supabase/tests/package-lock.json | 512 B | данные/конфигурация: package lock |
| №1113 supabase/tests/package.json | 165 B | данные/конфигурация: package |
| №1114 table.glb | 6217412 B | 3D модель/геометрия: table |
| №1115 tests/ai_automation_test.cjs | 1649 B | автотест: ai automation test |
| №1116 tests/ai_finalize_test.cjs | 3840 B | автотест: ai finalize test |
| №1117 tests/alchemist_combat_test.js | 19298 B | автотест: alchemist combat test |
| №1118 tests/alchemist_runtime_test.js | 41827 B | автотест: alchemist runtime test |
| №1119 tests/character_3d_editor_test.js | 14206 B | автотест: character 3d editor test |
| №1120 tests/character_3d_foundation_test.js | 15396 B | автотест: character 3d foundation test |
| №1121 tests/character_3d_morph_assets_test.js | 5179 B | автотест: character 3d morph assets test |
| №1122 tests/character_3d_skin_assets_test.js | 1827 B | автотест: character 3d skin assets test |
| №1123 tests/character_3d_skin_morph_test.js | 3032 B | автотест: character 3d skin morph test |
| №1124 tests/character_adult_anatomy_test.js | 4704 B | автотест: character adult anatomy test |
| №1125 tests/character_animal_heads_test.js | 4415 B | автотест: character animal heads test |
| №1126 tests/character_appearance_store_test.js | 2308 B | автотест: character appearance store test |
| №1127 tests/character_avian_elephant_heads_test.js | 5125 B | автотест: character avian elephant heads test |
| №1128 tests/character_clothing_customizer_geometry_test.js | 4676 B | автотест: character clothing customizer geometry test |
| №1129 tests/character_clothing_options_test.js | 1922 B | автотест: character clothing options test |
| №1130 tests/character_clothing_test.js | 7286 B | автотест: character clothing test |
| №1131 tests/character_editor_morph_assets_test.js | 4783 B | автотест: character editor morph assets test |
| №1132 tests/character_elf_details_test.js | 2787 B | автотест: character elf details test |
| №1133 tests/character_external_anatomy_test.js | 7930 B | автотест: character external anatomy test |
| №1134 tests/character_fur_test.js | 3520 B | автотест: character fur test |
| №1135 tests/character_ghost_geometry_test.js | 3867 B | автотест: character ghost geometry test |
| №1136 tests/character_hair_pack_test.js | 2838 B | автотест: character hair pack test |
| №1137 tests/character_head_geometry_test.js | 3575 B | автотест: character head geometry test |
| №1138 tests/character_male_anatomy_fix_test.js | 3902 B | автотест: character male anatomy fix test |
| №1139 tests/character_native_limbs_test.js | 4909 B | автотест: character native limbs test |
| №1140 tests/character_parasites_geometry_test.js | 3738 B | автотест: character parasites geometry test |
| №1141 tests/character_races_geometry_test.js | 19702 B | автотест: character races geometry test |
| №1142 tests/character_reptile_heads_test.js | 3734 B | автотест: character reptile heads test |
| №1143 tests/character_skin_material_test.js | 3816 B | автотест: character skin material test |
| №1144 tests/character_stat_modes_levelup_test.cjs | 4864 B | автотест: character stat modes levelup test |
| №1145 tests/character_swarm_geometry_test.js | 3505 B | автотест: character swarm geometry test |
| №1146 tests/character_tiefling_details_test.js | 4451 B | автотест: character tiefling details test |
| №1147 tests/cloud_rls_test.sql | 5342 B | автотест: cloud rls test |
| №1148 tests/cloud_sql_concurrency.cjs | 2072 B | автотест: cloud sql concurrency |
| №1149 tests/cloud_sync_test.cjs | 19921 B | автотест: cloud sync test |
| №1150 tests/crafting_disassembly_v51_test.js | 3052 B | автотест: crafting disassembly v51 test |
| №1151 tests/crafting_dlc_v50_test.js | 2668 B | автотест: crafting dlc v50 test |
| №1152 tests/crafting_economy_v49_test.js | 1974 B | автотест: crafting economy v49 test |
| №1153 tests/creation_signature_asset_test.cjs | 3935 B | автотест: creation signature asset test |
| №1154 tests/desktop_update_contract.cjs | 4025 B | автотест: desktop update contract |
| №1155 tests/fixtures/cloud_auth.sql | 711 B | автотест: cloud auth |
| №1156 tests/fixtures/female_anatomy_74_00_59.json | 251 B | автотест: female anatomy 74 00 59 |
| №1157 tests/generate_makehuman_glb_morph_fixture.js | 4454 B | автотест: generate makehuman glb morph fixture |
| №1158 tests/gltf_loader_smoke.cjs | 3734 B | автотест: gltf loader smoke |
| №1159 tests/helpers/class_runtime_harness.js | 2323 B | автотест: class runtime harness |
| №1160 tests/human_base_glb_audit.js | 2158 B | автотест: human base glb audit |
| №1161 tests/imported_3d_editor_assets.cjs | 2157 B | автотест: imported 3d editor assets |
| №1162 tests/makehuman_gender_fixture_audit.js | 4646 B | автотест: makehuman gender fixture audit |
| №1163 tests/makehuman_gender_recipe_test.js | 5498 B | автотест: makehuman gender recipe test |
| №1164 tests/makehuman_glb_morph_fixture_audit.js | 1703 B | автотест: makehuman glb morph fixture audit |
| №1165 tests/makehuman_morph_bridge.js | 9756 B | автотест: makehuman morph bridge |
| №1166 tests/makehuman_surface_mapping_audit.js | 9447 B | автотест: makehuman surface mapping audit |
| №1167 tests/makehuman_target_reverse_transfer_audit.js | 10959 B | автотест: makehuman target reverse transfer audit |
| №1168 tests/makehuman_target_surface_transfer_audit.js | 12260 B | автотест: makehuman target surface transfer audit |
| №1169 tests/makehuman_topology_audit.js | 5878 B | автотест: makehuman topology audit |
| №1170 tests/makehuman_uv_bridge_test.js | 1465 B | автотест: makehuman uv bridge test |
| №1171 tests/makehuman_vertex_mapping_audit.js | 7410 B | автотест: makehuman vertex mapping audit |
| №1172 tests/map_editor_dom_test.js | 3347 B | автотест: map editor dom test |
| №1173 tests/map_rebuild_world_test.js | 3815 B | автотест: map rebuild world test |
| №1174 tests/predictor_aura_ledger_test.cjs | 12810 B | автотест: predictor aura ledger test |
| №1175 tests/predictor_blind_test.cjs | 4972 B | автотест: predictor blind test |
| №1176 tests/predictor_cards_test.cjs | 10793 B | автотест: predictor cards test |
| №1177 tests/predictor_cloud_sync_test.cjs | 36354 B | автотест: predictor cloud sync test |
| №1178 tests/predictor_coin_ancestor_test.cjs | 6734 B | автотест: predictor coin ancestor test |
| №1179 tests/predictor_deck_ui_test.cjs | 29014 B | автотест: predictor deck ui test |
| №1180 tests/predictor_devil_plan_test.cjs | 4680 B | автотест: predictor devil plan test |
| №1181 tests/predictor_event_reactions_test.cjs | 7259 B | автотест: predictor event reactions test |
| №1182 tests/predictor_exhaustion_test.cjs | 4867 B | автотест: predictor exhaustion test |
| №1183 tests/predictor_healing_reaction_test.cjs | 5049 B | автотест: predictor healing reaction test |
| №1184 tests/predictor_inventory_rewards_test.cjs | 14111 B | автотест: predictor inventory rewards test |
| №1185 tests/predictor_last_stand_test.cjs | 12289 B | автотест: predictor last stand test |
| №1186 tests/predictor_mage_spells_test.cjs | 29988 B | автотест: predictor mage spells test |
| №1187 tests/predictor_motion_cards_test.cjs | 11690 B | автотест: predictor motion cards test |
| №1188 tests/predictor_movement_cards_test.cjs | 7196 B | автотест: predictor movement cards test |
| №1189 tests/predictor_progression_test.cjs | 3750 B | автотест: predictor progression test |
| №1190 tests/predictor_runtime_test.cjs | 10585 B | автотест: predictor runtime test |
| №1191 tests/predictor_seven_cups_test.cjs | 12727 B | автотест: predictor seven cups test |
| №1192 tests/predictor_status_cards_test.cjs | 13936 B | автотест: predictor status cards test |
| №1193 tests/predictor_tactics_cards_test.cjs | 11334 B | автотест: predictor tactics cards test |
| №1194 tests/predictor_trickster_test.cjs | 10554 B | автотест: predictor trickster test |
| №1195 tests/predictor_turn_effects_test.cjs | 13273 B | автотест: predictor turn effects test |
| №1196 tests/predictor_vision_control_test.cjs | 12922 B | автотест: predictor vision control test |
| №1197 tests/predictor_world_truth_search_test.cjs | 5654 B | автотест: predictor world truth search test |
| №1198 tests/pugilist_combat_test.js | 21085 B | автотест: pugilist combat test |
| №1199 tests/pugilist_runtime_test.js | 4834 B | автотест: pugilist runtime test |
| №1200 tests/stair_navigation.cjs | 2520 B | автотест: stair navigation |
| №1201 tests/test_blood_hunter_completion.js | 8673 B | автотест: test blood hunter completion |
| №1202 tests/test_blood_hunter_focus_network.js | 3203 B | автотест: test blood hunter focus network |
| №1203 tests/test_blood_hunter_orders.js | 9810 B | автотест: test blood hunter orders |
| №1204 tests/test_blood_hunter_patron_selection.js | 4699 B | автотест: test blood hunter patron selection |
| №1205 tests/test_blood_hunter_profane_focus.js | 6459 B | автотест: test blood hunter profane focus |
| №1206 tests/test_class_audit_runtime.js | 14611 B | автотест: test class audit runtime |
| №1207 tests/test_class_audit_stage2_runtime.js | 15372 B | автотест: test class audit stage2 runtime |
| №1208 tests/test_class_audit_stage3_runtime.js | 16610 B | автотест: test class audit stage3 runtime |
| №1209 tests/test_class_audit_stage4_runtime.js | 23853 B | автотест: test class audit stage4 runtime |
| №1210 tests/test_v52.js | 2202 B | автотест: test v52 |
| №1211 tests/test_v53.js | 2507 B | автотест: test v53 |
| №1212 tests/test_v54.js | 2148 B | автотест: test v54 |
| №1213 tests/test_v55_2.js | 4154 B | автотест: test v55 2 |
| №1214 tests/test_v55_3.js | 2635 B | автотест: test v55 3 |
| №1215 tests/test_v55.js | 2152 B | автотест: test v55 |
| №1216 tests/test_v56_1.js | 1667 B | автотест: test v56 1 |
| №1217 tests/test_v56_10.js | 2140 B | автотест: test v56 10 |
| №1218 tests/test_v56_11.js | 1791 B | автотест: test v56 11 |
| №1219 tests/test_v56_12.js | 1665 B | автотест: test v56 12 |
| №1220 tests/test_v56_13.js | 2465 B | автотест: test v56 13 |
| №1221 tests/test_v56_2.js | 1697 B | автотест: test v56 2 |
| №1222 tests/test_v56_3.js | 1363 B | автотест: test v56 3 |
| №1223 tests/test_v56_4.js | 1458 B | автотест: test v56 4 |
| №1224 tests/test_v56_5.js | 1745 B | автотест: test v56 5 |
| №1225 tests/test_v56_6.js | 1439 B | автотест: test v56 6 |
| №1226 tests/test_v56_8.js | 1516 B | автотест: test v56 8 |
| №1227 tests/test_v56_9.js | 1734 B | автотест: test v56 9 |
| №1228 tests/test_v56.js | 3572 B | автотест: test v56 |
| №1229 tests/test_v57.js | 2554 B | автотест: test v57 |
| №1230 tests/test_v58.js | 1847 B | автотест: test v58 |
| №1231 tests/test_v59.js | 878 B | автотест: test v59 |
| №1232 tests/test_v60.js | 860 B | автотест: test v60 |
| №1233 tests/test_v61.js | 961 B | автотест: test v61 |
| №1234 tests/test_v62.js | 800 B | автотест: test v62 |
| №1235 tests/test_v63.js | 364 B | автотест: test v63 |
| №1236 tests/test_v64.js | 312 B | автотест: test v64 |
| №1237 tests/test_v65.js | 335 B | автотест: test v65 |
| №1238 tests/test_v66.js | 373 B | автотест: test v66 |
| №1239 tests/test_v67.js | 628 B | автотест: test v67 |
| №1240 tests/test_v68.js | 984 B | автотест: test v68 |
| №1241 tests/test_v69.js | 1713 B | автотест: test v69 |
| №1242 tests/test_v70.js | 2112 B | автотест: test v70 |
| №1243 tests/test_v701.js | 2425 B | автотест: test v701 |
| №1244 tests/test_v702.js | 4409 B | автотест: test v702 |
| №1245 tests/test_v703.js | 2646 B | автотест: test v703 |
| №1246 tests/test_v704.js | 2402 B | автотест: test v704 |
| №1247 tests/test_v705.js | 2717 B | автотест: test v705 |
| №1248 tests/test_v706.js | 1414 B | автотест: test v706 |
| №1249 tests/test_v707.js | 1066 B | автотест: test v707 |
| №1250 tests/test_v708_fixes.js | 2968 B | автотест: test v708 fixes |
| №1251 tests/test_v709_fixes.js | 2128 B | автотест: test v709 fixes |
| №1252 tests/test_v710_fixes.js | 2223 B | автотест: test v710 fixes |
| №1253 tests/test_v711_fixes.js | 1037 B | автотест: test v711 fixes |
| №1254 tests/test_v712_fixes.js | 1675 B | автотест: test v712 fixes |
| №1255 tests/test_v713_fixes.js | 2127 B | автотест: test v713 fixes |
| №1256 tests/test_v714_fixes.js | 1727 B | автотест: test v714 fixes |
| №1257 tests/test_v715_fixes.js | 1817 B | автотест: test v715 fixes |
| №1258 tests/test_v716_fixes.js | 1980 B | автотест: test v716 fixes |
| №1259 tests/test_v717_fixes.js | 2657 B | автотест: test v717 fixes |
| №1260 tests/test_v718_fixes.js | 1001 B | автотест: test v718 fixes |
| №1261 tests/test_v719_fixes.js | 1156 B | автотест: test v719 fixes |
| №1262 tests/test_v720_fixes.js | 1621 B | автотест: test v720 fixes |
| №1263 tests/test_v721_fixes.js | 3536 B | автотест: test v721 fixes |
| №1264 tests/test_v722_fixes.js | 3509 B | автотест: test v722 fixes |
| №1265 tests/test_v723_fixes.js | 4780 B | автотест: test v723 fixes |
| №1266 tests/test_v724_fixes.js | 2330 B | автотест: test v724 fixes |
| №1267 tests/test_v725_fixes.js | 4026 B | автотест: test v725 fixes |
| №1268 tests/test_v726_fixes.js | 3809 B | автотест: test v726 fixes |
| №1269 tests/test_v727_fixes.js | 3061 B | автотест: test v727 fixes |
| №1270 tests/test_v728_fixes.js | 2641 B | автотест: test v728 fixes |
| №1271 tests/test_v729_fixes.js | 1372 B | автотест: test v729 fixes |
| №1272 tests/test_v730_fixes.js | 2190 B | автотест: test v730 fixes |
| №1273 tests/test_v731_fixes.js | 1649 B | автотест: test v731 fixes |
| №1274 tests/test_v732_fixes.js | 2794 B | автотест: test v732 fixes |
| №1275 tests/test_v733_logic_audit.js | 2286 B | автотест: test v733 logic audit |
| №1276 tests/test_v734_network_concentration.js | 1522 B | автотест: test v734 network concentration |
| №1277 tests/test_v735_logic_rules.js | 1885 B | автотест: test v735 logic rules |
| №1278 tests/test_v736_deep_rules.js | 4307 B | автотест: test v736 deep rules |
| №1279 tests/test_v737_spellcasting_transaction.js | 5283 B | автотест: test v737 spellcasting transaction |
| №1280 tests/test_v738_multiclass_spell_sources.js | 5402 B | автотест: test v738 multiclass spell sources |
| №1281 tests/test_v739_prepared_transaction.js | 4317 B | автотест: test v739 prepared transaction |
| №1282 tests/test_v740_concentration_lifecycle.js | 2114 B | автотест: test v740 concentration lifecycle |
| №1283 tests/test_v741_damage_pipeline.js | 2462 B | автотест: test v741 damage pipeline |
| №1284 tests/test_v742_character_combatant_sync.js | 3540 B | автотест: test v742 character combatant sync |
| №1285 tests/test_v743_authority_recharge_events.js | 2228 B | автотест: test v743 authority recharge events |
| №1286 tests/test_v744_sync_authority_save.js | 2516 B | автотест: test v744 sync authority save |
| №1287 tests/test_v745_host_handoff.js | 2112 B | автотест: test v745 host handoff |
| №1288 tests/test_v746_authoritative_save_recharge.js | 3032 B | автотест: test v746 authoritative save recharge |
| №1289 tests/test_v747_event_race_compaction.js | 3064 B | автотест: test v747 event race compaction |
| №1290 tests/test_v748_full_combat_transaction.js | 5181 B | автотест: test v748 full combat transaction |
| №1291 tests/test_v749_monster_authority_reaction_order.js | 2661 B | автотест: test v749 monster authority reaction order |
| №1292 tests/test_v750_resignal_reaction_monster_rpc.js | 1973 B | автотест: test v750 resignal reaction monster rpc |
| №1293 tests/test_v751_authoritative_replay_rollback.js | 1185 B | автотест: test v751 authoritative replay rollback |
| №1294 tests/test_v752_replay_hash_authority.js | 2033 B | автотест: test v752 replay hash authority |
| №1295 tests/test_v753_replay_transaction_rng.js | 1195 B | автотест: test v753 replay transaction rng |
| №1296 tests/test_v754_update_manager.js | 2816 B | автотест: test v754 update manager |
| №1297 tests/test_v755_creation_buckets.js | 3973 B | автотест: test v755 creation buckets |
| №1298 tests/test_v755_update_scene.js | 3625 B | автотест: test v755 update scene |
| №1299 tests/update_ota_flow_test.js | 9661 B | автотест: update ota flow test |
| №1300 tools/ai_automation.cjs | 2383 B | скрипт разработчика: ai automation |
| №1301 tools/ai_checks.cjs | 1068 B | скрипт разработчика: ai checks |
| №1302 tools/ai_finalize.cjs | 2199 B | скрипт разработчика: ai finalize |
| №1303 tools/audit_adult_body_assets.py | 5868 B | скрипт разработчика: audit adult body assets |
| №1304 tools/audit_modular_content.py | 5418 B | скрипт разработчика: audit modular content |
| №1305 tools/audit_retained_apk.py | 2920 B | скрипт разработчика: audit retained apk |
| №1306 tools/build_character_editor_morphs.js | 4493 B | скрипт разработчика: build character editor morphs |
| №1307 tools/build_cloud_tests.sh | 1945 B | скрипт разработчика: build cloud tests |
| №1308 tools/build_makehuman_morphs.js | 8803 B | скрипт разработчика: build makehuman morphs |
| №1309 tools/build_skin_microtexture.py | 1254 B | скрипт разработчика: build skin microtexture |
| №1310 tools/build_update_manifest.py | 3881 B | скрипт разработчика: build update manifest |
| №1311 tools/check_adult_anatomy_browser.js | 7862 B | скрипт разработчика: check adult anatomy browser |
| №1312 tools/check_adult_base_browser.js | 4732 B | скрипт разработчика: check adult base browser |
| №1313 tools/check_animal_heads_browser.js | 6045 B | скрипт разработчика: check animal heads browser |
| №1314 tools/check_avian_elephant_heads_browser.js | 6052 B | скрипт разработчика: check avian elephant heads browser |
| №1315 tools/check_avian_races_browser.js | 6195 B | скрипт разработчика: check avian races browser |
| №1316 tools/check_character_clothing_closeups.js | 3941 B | скрипт разработчика: check character clothing closeups |
| №1317 tools/check_character_clothing_customizer.js | 8611 B | скрипт разработчика: check character clothing customizer |
| №1318 tools/check_character_dress_customizer.js | 4892 B | скрипт разработчика: check character dress customizer |
| №1319 tools/check_character_editor_browser.js | 24473 B | скрипт разработчика: check character editor browser |
| №1320 tools/check_character_head_browser.js | 7169 B | скрипт разработчика: check character head browser |
| №1321 tools/check_character_races_browser.js | 14773 B | скрипт разработчика: check character races browser |
| №1322 tools/check_cloud_account_browser.cjs | 7054 B | скрипт разработчика: check cloud account browser |
| №1323 tools/check_dense_swarm_browser.js | 6299 B | скрипт разработчика: check dense swarm browser |
| №1324 tools/check_elf_details_browser.js | 5791 B | скрипт разработчика: check elf details browser |
| №1325 tools/check_external_anatomy_browser.js | 9967 B | скрипт разработчика: check external anatomy browser |
| №1326 tools/check_feather_surface_browser.js | 8888 B | скрипт разработчика: check feather surface browser |
| №1327 tools/check_fur_browser.js | 6062 B | скрипт разработчика: check fur browser |
| №1328 tools/check_fur_surface_browser.js | 8973 B | скрипт разработчика: check fur surface browser |
| №1329 tools/check_ghost_browser.js | 8977 B | скрипт разработчика: check ghost browser |
| №1330 tools/check_hair_pack_browser.js | 5826 B | скрипт разработчика: check hair pack browser |
| №1331 tools/check_kobold_tabaxi_browser.js | 6240 B | скрипт разработчика: check kobold tabaxi browser |
| №1332 tools/check_last_races_browser.js | 7457 B | скрипт разработчика: check last races browser |
| №1333 tools/check_male_anatomy_browser.js | 6082 B | скрипт разработчика: check male anatomy browser |
| №1334 tools/check_map_browser.js | 3805 B | скрипт разработчика: check map browser |
| №1335 tools/check_mechanical_races_browser.js | 6158 B | скрипт разработчика: check mechanical races browser |
| №1336 tools/check_modular_races_browser.js | 5826 B | скрипт разработчика: check modular races browser |
| №1337 tools/check_native_limbs_browser.js | 7153 B | скрипт разработчика: check native limbs browser |
| №1338 tools/check_parasites_browser.js | 6584 B | скрипт разработчика: check parasites browser |
| №1339 tools/check_pose_browser.js | 7090 B | скрипт разработчика: check pose browser |
| №1340 tools/check_quartet_races_browser.js | 6706 B | скрипт разработчика: check quartet races browser |
| №1341 tools/check_reptile_heads_browser.js | 5336 B | скрипт разработчика: check reptile heads browser |
| №1342 tools/check_reptile_races_browser.js | 5781 B | скрипт разработчика: check reptile races browser |
| №1343 tools/check_reptile_surface_browser.js | 7114 B | скрипт разработчика: check reptile surface browser |
| №1344 tools/check_skin_material_browser.js | 11016 B | скрипт разработчика: check skin material browser |
| №1345 tools/check_small_armor_browser.js | 3698 B | скрипт разработчика: check small armor browser |
| №1346 tools/check_swarm_browser.js | 7847 B | скрипт разработчика: check swarm browser |
| №1347 tools/check_tiefling_browser.js | 7273 B | скрипт разработчика: check tiefling browser |
| №1348 tools/check_tiefling_details_browser.js | 6694 B | скрипт разработчика: check tiefling details browser |
| №1349 tools/cloud_test.init.gradle | 781 B | скрипт разработчика: cloud test.init |
| №1350 tools/convert_remaining_furniture.py | 4297 B | скрипт разработчика: convert remaining furniture |
| №1351 tools/finalize_v741.py | 3280 B | скрипт разработчика: finalize v741 |
| №1352 tools/generate_project_atlas.cjs | 12690 B | автоматический генератор этого атласа |
| №1353 tools/inspect_unity_apk.py | 3390 B | скрипт разработчика: inspect unity apk |
| №1354 tools/install_native_build_tools.sh | 2975 B | скрипт разработчика: install native build tools |
| №1355 tools/makehuman_gender_channels.json | 4749 B | скрипт разработчика: makehuman gender channels |
| №1356 tools/makehuman_morph_channels.json | 448 B | скрипт разработчика: makehuman morph channels |
| №1357 tools/prepare_makehuman_gender.js | 5599 B | скрипт разработчика: prepare makehuman gender |
| №1358 tools/run_tests_v731.js | 5062 B | скрипт разработчика: run tests v731 |
| №1359 tools/sync_manifest.py | 2034 B | скрипт разработчика: sync manifest |
| №1360 tools/test_cloud_sql.sh | 1088 B | скрипт разработчика: test cloud sql |
| №1361 tools/unified_version.py | 3403 B | скрипт разработчика: unified version |
| №1362 unity/.gitattributes | 451 B | вспомогательный файл: .gitattributes |
| №1363 unity/.gitignore | 454 B | вспомогательный файл: .gitignore |
| №1364 unity/ANDROID_UPDATES.md | 3652 B | документация или отчёт: ANDROID UPDATES |
| №1365 unity/Assets/DefaultVolumeProfile.asset | 20474 B | вспомогательный файл: DefaultVolumeProfile |
| №1366 unity/Assets/DefaultVolumeProfile.asset.meta | 189 B | вспомогательный файл: DefaultVolumeProfile.asset |
| №1367 unity/Assets/LegacyContent.meta | 172 B | вспомогательный файл: LegacyContent |
| №1368 unity/Assets/LegacyContent/Catalog.asset | 9068 B | вспомогательный файл: Catalog |
| №1369 unity/Assets/LegacyContent/Catalog.asset.meta | 189 B | вспомогательный файл: Catalog.asset |
| №1370 unity/Assets/LegacyContent/geometry-contract.json | 2446 B | данные/конфигурация: geometry contract |
| №1371 unity/Assets/LegacyContent/geometry-contract.json.meta | 158 B | вспомогательный файл: geometry contract.json |
| №1372 unity/Assets/LegacyContent/Materials.meta | 172 B | вспомогательный файл: Materials |
| №1373 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat | 3851 B | вспомогательный файл: floor ceramic tile dark |
| №1374 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat.meta | 188 B | вспомогательный файл: floor ceramic tile dark.mat |
| №1375 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat | 3852 B | вспомогательный файл: floor ceramic tile light |
| №1376 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat.meta | 188 B | вспомогательный файл: floor ceramic tile light.mat |
| №1377 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat | 3846 B | вспомогательный файл: floor checker tile |
| №1378 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat.meta | 188 B | вспомогательный файл: floor checker tile.mat |
| №1379 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat | 3845 B | вспомогательный файл: floor cobblestone |
| №1380 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat.meta | 188 B | вспомогательный файл: floor cobblestone.mat |
| №1381 unity/Assets/LegacyContent/Materials/floor_earth.mat | 3838 B | вспомогательный файл: floor earth |
| №1382 unity/Assets/LegacyContent/Materials/floor_earth.mat.meta | 188 B | вспомогательный файл: floor earth.mat |
| №1383 unity/Assets/LegacyContent/Materials/floor_grass.mat | 3839 B | вспомогательный файл: floor grass |
| №1384 unity/Assets/LegacyContent/Materials/floor_grass.mat.meta | 188 B | вспомогательный файл: floor grass.mat |
| №1385 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat | 3841 B | вспомогательный файл: floor hex tile |
| №1386 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat.meta | 188 B | вспомогательный файл: floor hex tile.mat |
| №1387 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat | 3844 B | вспомогательный файл: floor marble dark |
| №1388 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat.meta | 188 B | вспомогательный файл: floor marble dark.mat |
| №1389 unity/Assets/LegacyContent/Materials/floor_marble_light.mat | 3846 B | вспомогательный файл: floor marble light |
| №1390 unity/Assets/LegacyContent/Materials/floor_marble_light.mat.meta | 188 B | вспомогательный файл: floor marble light.mat |
| №1391 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat | 3852 B | вспомогательный файл: floor parquet herringbone |
| №1392 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat.meta | 188 B | вспомогательный файл: floor parquet herringbone.mat |
| №1393 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat | 3841 B | вспомогательный файл: floor rug blue |
| №1394 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat.meta | 188 B | вспомогательный файл: floor rug blue.mat |
| №1395 unity/Assets/LegacyContent/Materials/floor_rug_green.mat | 3842 B | вспомогательный файл: floor rug green |
| №1396 unity/Assets/LegacyContent/Materials/floor_rug_green.mat.meta | 188 B | вспомогательный файл: floor rug green.mat |
| №1397 unity/Assets/LegacyContent/Materials/floor_rug_red.mat | 3840 B | вспомогательный файл: floor rug red |
| №1398 unity/Assets/LegacyContent/Materials/floor_rug_red.mat.meta | 188 B | вспомогательный файл: floor rug red.mat |
| №1399 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat | 3848 B | вспомогательный файл: floor stone tile dark |
| №1400 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat.meta | 188 B | вспомогательный файл: floor stone tile dark.mat |
| №1401 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat | 3849 B | вспомогательный файл: floor stone tile light |
| №1402 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat.meta | 188 B | вспомогательный файл: floor stone tile light.mat |
| №1403 unity/Assets/LegacyContent/Materials/floor_tatami.mat | 3840 B | вспомогательный файл: floor tatami |
| №1404 unity/Assets/LegacyContent/Materials/floor_tatami.mat.meta | 188 B | вспомогательный файл: floor tatami.mat |
| №1405 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat | 3842 B | вспомогательный файл: floor wood dark |
| №1406 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat.meta | 188 B | вспомогательный файл: floor wood dark.mat |
| №1407 unity/Assets/LegacyContent/Materials/floor_wood_light.mat | 3842 B | вспомогательный файл: floor wood light |
| №1408 unity/Assets/LegacyContent/Materials/floor_wood_light.mat.meta | 188 B | вспомогательный файл: floor wood light.mat |
| №1409 unity/Assets/LegacyContent/Materials/wall_brick_red.mat | 3842 B | вспомогательный файл: wall brick red |
| №1410 unity/Assets/LegacyContent/Materials/wall_brick_red.mat.meta | 188 B | вспомогательный файл: wall brick red.mat |
| №1411 unity/Assets/LegacyContent/Materials/wall_concrete.mat | 3841 B | вспомогательный файл: wall concrete |
| №1412 unity/Assets/LegacyContent/Materials/wall_concrete.mat.meta | 188 B | вспомогательный файл: wall concrete.mat |
| №1413 unity/Assets/LegacyContent/Materials/wall_half_timber.mat | 3844 B | вспомогательный файл: wall half timber |
| №1414 unity/Assets/LegacyContent/Materials/wall_half_timber.mat.meta | 188 B | вспомогательный файл: wall half timber.mat |
| №1415 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat | 3843 B | вспомогательный файл: wall marble dark |
| №1416 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat.meta | 188 B | вспомогательный файл: wall marble dark.mat |
| №1417 unity/Assets/LegacyContent/Materials/wall_marble_light.mat | 3845 B | вспомогательный файл: wall marble light |
| №1418 unity/Assets/LegacyContent/Materials/wall_marble_light.mat.meta | 188 B | вспомогательный файл: wall marble light.mat |
| №1419 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat | 3843 B | вспомогательный файл: wall moss stone |
| №1420 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat.meta | 188 B | вспомогательный файл: wall moss stone.mat |
| №1421 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat | 3843 B | вспомогательный файл: wall old plaster |
| №1422 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat.meta | 188 B | вспомогательный файл: wall old plaster.mat |
| №1423 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat | 3844 B | вспомогательный файл: wall plaster dark |
| №1424 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat.meta | 188 B | вспомогательный файл: wall plaster dark.mat |
| №1425 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat | 3846 B | вспомогательный файл: wall plaster light |
| №1426 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat.meta | 188 B | вспомогательный файл: wall plaster light.mat |
| №1427 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat | 3846 B | вспомогательный файл: wall plaster panel |
| №1428 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat.meta | 188 B | вспомогательный файл: wall plaster panel.mat |
| №1429 unity/Assets/LegacyContent/Materials/wall_slate.mat | 3837 B | вспомогательный файл: wall slate |
| №1430 unity/Assets/LegacyContent/Materials/wall_slate.mat.meta | 188 B | вспомогательный файл: wall slate.mat |
| №1431 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat | 3842 B | вспомогательный файл: wall stone dark |
| №1432 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat.meta | 188 B | вспомогательный файл: wall stone dark.mat |
| №1433 unity/Assets/LegacyContent/Materials/wall_stone_light.mat | 3843 B | вспомогательный файл: wall stone light |
| №1434 unity/Assets/LegacyContent/Materials/wall_stone_light.mat.meta | 188 B | вспомогательный файл: wall stone light.mat |
| №1435 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat | 3845 B | вспомогательный файл: wall stone masonry |
| №1436 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat.meta | 188 B | вспомогательный файл: wall stone masonry.mat |
| №1437 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat | 3841 B | вспомогательный файл: wall wallpaper |
| №1438 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat.meta | 188 B | вспомогательный файл: wall wallpaper.mat |
| №1439 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat | 3845 B | вспомогательный файл: wall white plaster |
| №1440 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat.meta | 188 B | вспомогательный файл: wall white plaster.mat |
| №1441 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat | 3841 B | вспомогательный файл: wall wood dark |
| №1442 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat.meta | 188 B | вспомогательный файл: wall wood dark.mat |
| №1443 unity/Assets/LegacyContent/Materials/wall_wood_light.mat | 3843 B | вспомогательный файл: wall wood light |
| №1444 unity/Assets/LegacyContent/Materials/wall_wood_light.mat.meta | 188 B | вспомогательный файл: wall wood light.mat |
| №1445 unity/Assets/LegacyContent/provenance.json | 28556 B | данные/конфигурация: provenance |
| №1446 unity/Assets/LegacyContent/provenance.json.meta | 158 B | вспомогательный файл: provenance.json |
| №1447 unity/Assets/LegacyContent/Source.meta | 172 B | вспомогательный файл: Source |
| №1448 unity/Assets/LegacyContent/Source/app.meta | 172 B | вспомогательный файл: app |
| №1449 unity/Assets/LegacyContent/Source/app/assets.meta | 172 B | вспомогательный файл: assets |
| №1450 unity/Assets/LegacyContent/Source/app/assets/3d.meta | 172 B | вспомогательный файл: 3d |
| №1451 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius.meta | 172 B | вспомогательный файл: quaternius |
| №1452 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models.meta | 172 B | вспомогательный файл: models |
| №1453 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin | 27188 B | 3D модель/геометрия: Bag |
| №1454 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin.meta | 155 B | вспомогательный файл: Bag.bin |
| №1455 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf | 4614 B | 3D модель/геометрия: Bag |
| №1456 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf.meta | 2193 B | вспомогательный файл: Bag.gltf |
| №1457 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | 3D модель/геометрия: Barrel Apples |
| №1458 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin.meta | 155 B | вспомогательный файл: Barrel Apples.bin |
| №1459 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6660 B | 3D модель/геометрия: Barrel Apples |
| №1460 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf.meta | 2849 B | вспомогательный файл: Barrel Apples.gltf |
| №1461 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin | 57144 B | 3D модель/геометрия: Barrel |
| №1462 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin.meta | 155 B | вспомогательный файл: Barrel.bin |
| №1463 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf | 4607 B | 3D модель/геометрия: Barrel |
| №1464 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf.meta | 2199 B | вспомогательный файл: Barrel.gltf |
| №1465 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | 3D модель/геометрия: Bed Twin1 |
| №1466 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin.meta | 155 B | вспомогательный файл: Bed Twin1.bin |
| №1467 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6636 B | 3D модель/геометрия: Bed Twin1 |
| №1468 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf.meta | 2841 B | вспомогательный файл: Bed Twin1.gltf |
| №1469 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin | 19304 B | 3D модель/геометрия: Bench |
| №1470 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin.meta | 155 B | вспомогательный файл: Bench.bin |
| №1471 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf | 4594 B | 3D модель/геометрия: Bench |
| №1472 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf.meta | 2197 B | вспомогательный файл: Bench.gltf |
| №1473 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | 3D модель/геометрия: Book Stack 2 |
| №1474 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin.meta | 155 B | вспомогательный файл: Book Stack 2.bin |
| №1475 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4605 B | 3D модель/геометрия: Book Stack 2 |
| №1476 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf.meta | 2187 B | вспомогательный файл: Book Stack 2.gltf |
| №1477 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | 3D модель/геометрия: Bookcase 2 |
| №1478 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin.meta | 155 B | вспомогательный файл: Bookcase 2.bin |
| №1479 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf | 4625 B | 3D модель/геометрия: Bookcase 2 |
| №1480 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf.meta | 2207 B | вспомогательный файл: Bookcase 2.gltf |
| №1481 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | 3D модель/геометрия: Bottle 1 |
| №1482 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin.meta | 155 B | вспомогательный файл: Bottle 1.bin |
| №1483 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf | 2586 B | 3D модель/геометрия: Bottle 1 |
| №1484 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf.meta | 1543 B | вспомогательный файл: Bottle 1.gltf |
| №1485 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | 3D модель/геометрия: Candle 2 |
| №1486 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin.meta | 155 B | вспомогательный файл: Candle 2.bin |
| №1487 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf | 2350 B | 3D модель/геометрия: Candle 2 |
| №1488 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf.meta | 1543 B | вспомогательный файл: Candle 2.gltf |
| №1489 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | 3D модель/геометрия: CandleStick Triple |
| №1490 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin.meta | 155 B | вспомогательный файл: CandleStick Triple.bin |
| №1491 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 4168 B | 3D модель/геометрия: CandleStick Triple |
| №1492 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf.meta | 2199 B | вспомогательный файл: CandleStick Triple.gltf |
| №1493 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | 3D модель/геометрия: Chair 1 |
| №1494 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin.meta | 155 B | вспомогательный файл: Chair 1.bin |
| №1495 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf | 4608 B | 3D модель/геометрия: Chair 1 |
| №1496 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf.meta | 2201 B | вспомогательный файл: Chair 1.gltf |
| №1497 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin | 15644 B | 3D модель/геометрия: Chalice |
| №1498 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin.meta | 155 B | вспомогательный файл: Chalice.bin |
| №1499 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf | 2356 B | 3D модель/геометрия: Chalice |
| №1500 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf.meta | 1541 B | вспомогательный файл: Chalice.gltf |
| №1501 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | 3D модель/геометрия: Chandelier |
| №1502 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin.meta | 155 B | вспомогательный файл: Chandelier.bin |
| №1503 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf | 6678 B | 3D модель/геометрия: Chandelier |
| №1504 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf.meta | 2843 B | вспомогательный файл: Chandelier.gltf |
| №1505 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | 3D модель/геометрия: Chest Wood |
| №1506 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin.meta | 155 B | вспомогательный файл: Chest Wood.bin |
| №1507 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf | 18141 B | 3D модель/геометрия: Chest Wood |
| №1508 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes | 22924 B | вспомогательный файл: Chest Wood.gltf |
| №1509 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes.meta | 158 B | вспомогательный файл: Chest Wood.gltf.bytes |
| №1510 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.meta | 720 B | вспомогательный файл: Chest Wood.gltf |
| №1511 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin | 14464 B | 3D модель/геометрия: Coin |
| №1512 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin.meta | 155 B | вспомогательный файл: Coin.bin |
| №1513 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf | 2581 B | 3D модель/геометрия: Coin |
| №1514 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf.meta | 1535 B | вспомогательный файл: Coin.gltf |
| №1515 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin | 12488 B | 3D модель/геометрия: Mug |
| №1516 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin.meta | 155 B | вспомогательный файл: Mug.bin |
| №1517 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf | 4149 B | 3D модель/геометрия: Mug |
| №1518 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf.meta | 2193 B | вспомогательный файл: Mug.gltf |
| №1519 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | 3D модель/геометрия: Pouch Large |
| №1520 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin.meta | 155 B | вспомогательный файл: Pouch Large.bin |
| №1521 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf | 4602 B | 3D модель/геометрия: Pouch Large |
| №1522 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf.meta | 2185 B | вспомогательный файл: Pouch Large.gltf |
| №1523 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | 3D модель/геометрия: Rope 1 |
| №1524 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin.meta | 155 B | вспомогательный файл: Rope 1.bin |
| №1525 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf | 2382 B | 3D модель/геометрия: Rope 1 |
| №1526 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf.meta | 1563 B | вспомогательный файл: Rope 1.gltf |
| №1527 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | 3D модель/геометрия: Shelf Simple |
| №1528 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin.meta | 155 B | вспомогательный файл: Shelf Simple.bin |
| №1529 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2383 B | 3D модель/геометрия: Shelf Simple |
| №1530 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf.meta | 1575 B | вспомогательный файл: Shelf Simple.gltf |
| №1531 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin | 11472 B | 3D модель/геометрия: Stool |
| №1532 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin.meta | 155 B | вспомогательный файл: Stool.bin |
| №1533 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf | 2596 B | 3D модель/геометрия: Stool |
| №1534 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf.meta | 1561 B | вспомогательный файл: Stool.gltf |
| №1535 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png | 1936754 B | текстура/изображение: T Trim Cloth BaseColor |
| №1536 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Cloth BaseColor.png |
| №1537 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png | 3920858 B | текстура/изображение: T Trim Cloth Normal |
| №1538 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Cloth Normal.png |
| №1539 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png | 623426 B | текстура/изображение: T Trim Cloth ORM |
| №1540 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Cloth ORM.png |
| №1541 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png | 2232961 B | текстура/изображение: T Trim Furniture BaseColor |
| №1542 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Furniture BaseColor.png |
| №1543 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png | 3485710 B | текстура/изображение: T Trim Furniture Normal |
| №1544 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Furniture Normal.png |
| №1545 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png | 2064585 B | текстура/изображение: T Trim Furniture ORM |
| №1546 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Furniture ORM.png |
| №1547 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png | 1361221 B | текстура/изображение: T Trim Metal BaseColor |
| №1548 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Metal BaseColor.png |
| №1549 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png | 3625541 B | текстура/изображение: T Trim Metal Normal |
| №1550 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Metal Normal.png |
| №1551 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png | 1871475 B | текстура/изображение: T Trim Metal ORM |
| №1552 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Metal ORM.png |
| №1553 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png | 2263132 B | текстура/изображение: T Trim Props BaseColor |
| №1554 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Props BaseColor.png |
| №1555 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png | 4441458 B | текстура/изображение: T Trim Props Normal |
| №1556 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Props Normal.png |
| №1557 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png | 3017151 B | текстура/изображение: T Trim Props ORM |
| №1558 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Props ORM.png |
| №1559 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | 3D модель/геометрия: Table Fork |
| №1560 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin.meta | 155 B | вспомогательный файл: Table Fork.bin |
| №1561 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf | 2348 B | 3D модель/геометрия: Table Fork |
| №1562 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf.meta | 1547 B | вспомогательный файл: Table Fork.gltf |
| №1563 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | 3D модель/геометрия: Table Knife |
| №1564 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin.meta | 155 B | вспомогательный файл: Table Knife.bin |
| №1565 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf | 2345 B | 3D модель/геометрия: Table Knife |
| №1566 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf.meta | 1549 B | вспомогательный файл: Table Knife.gltf |
| №1567 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | 3D модель/геометрия: Table Large |
| №1568 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin.meta | 155 B | вспомогательный файл: Table Large.bin |
| №1569 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf | 4612 B | 3D модель/геометрия: Table Large |
| №1570 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf.meta | 2209 B | вспомогательный файл: Table Large.gltf |
| №1571 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | 3D модель/геометрия: Table Plate |
| №1572 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin.meta | 155 B | вспомогательный файл: Table Plate.bin |
| №1573 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf | 2358 B | 3D модель/геометрия: Table Plate |
| №1574 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf.meta | 1549 B | вспомогательный файл: Table Plate.gltf |
| №1575 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | 3D модель/геометрия: Table Spoon |
| №1576 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin.meta | 155 B | вспомогательный файл: Table Spoon.bin |
| №1577 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf | 2350 B | 3D модель/геометрия: Table Spoon |
| №1578 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf.meta | 1549 B | вспомогательный файл: Table Spoon.gltf |
| №1579 unity/Assets/LegacyContent/Source/app/data.meta | 172 B | вспомогательный файл: data |
| №1580 unity/Assets/LegacyContent/Source/app/data/maps.meta | 172 B | вспомогательный файл: maps |
| №1581 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №1582 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json.meta | 158 B | вспомогательный файл: 3d castle black rose v740030.json |
| №1583 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №1584 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json.meta | 158 B | вспомогательный файл: 3d castle v740019.json |
| №1585 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №1586 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json.meta | 158 B | вспомогательный файл: 3d house v740019.json |
| №1587 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json | 170566 B | данные/конфигурация: 3d stress test all |
| №1588 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json.meta | 158 B | вспомогательный файл: 3d stress test all.json |
| №1589 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №1590 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json.meta | 158 B | вспомогательный файл: 3d stress v740026.json |
| №1591 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №1592 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json.meta | 158 B | вспомогательный файл: 3d tavern v740019.json |
| №1593 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №1594 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json.meta | 158 B | вспомогательный файл: 3d test dungeon.json |
| №1595 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №1596 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json.meta | 158 B | вспомогательный файл: 3d town v740019.json |
| №1597 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №1598 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json.meta | 158 B | вспомогательный файл: 3d village v740019.json |
| №1599 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1600 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png.meta | 3009 B | вспомогательный файл: floor ceramic tile dark.png |
| №1601 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1602 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png.meta | 3009 B | вспомогательный файл: floor ceramic tile light.png |
| №1603 unity/Assets/LegacyContent/Source/floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1604 unity/Assets/LegacyContent/Source/floor_checker_tile.png.meta | 3009 B | вспомогательный файл: floor checker tile.png |
| №1605 unity/Assets/LegacyContent/Source/floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1606 unity/Assets/LegacyContent/Source/floor_cobblestone.png.meta | 3009 B | вспомогательный файл: floor cobblestone.png |
| №1607 unity/Assets/LegacyContent/Source/floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1608 unity/Assets/LegacyContent/Source/floor_earth.png.meta | 3009 B | вспомогательный файл: floor earth.png |
| №1609 unity/Assets/LegacyContent/Source/floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1610 unity/Assets/LegacyContent/Source/floor_grass.png.meta | 3009 B | вспомогательный файл: floor grass.png |
| №1611 unity/Assets/LegacyContent/Source/floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1612 unity/Assets/LegacyContent/Source/floor_hex_tile.png.meta | 3009 B | вспомогательный файл: floor hex tile.png |
| №1613 unity/Assets/LegacyContent/Source/floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1614 unity/Assets/LegacyContent/Source/floor_marble_dark.png.meta | 3009 B | вспомогательный файл: floor marble dark.png |
| №1615 unity/Assets/LegacyContent/Source/floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1616 unity/Assets/LegacyContent/Source/floor_marble_light.png.meta | 3009 B | вспомогательный файл: floor marble light.png |
| №1617 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1618 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png.meta | 3009 B | вспомогательный файл: floor parquet herringbone.png |
| №1619 unity/Assets/LegacyContent/Source/floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1620 unity/Assets/LegacyContent/Source/floor_rug_blue.png.meta | 3009 B | вспомогательный файл: floor rug blue.png |
| №1621 unity/Assets/LegacyContent/Source/floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1622 unity/Assets/LegacyContent/Source/floor_rug_green.png.meta | 3009 B | вспомогательный файл: floor rug green.png |
| №1623 unity/Assets/LegacyContent/Source/floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1624 unity/Assets/LegacyContent/Source/floor_rug_red.png.meta | 3009 B | вспомогательный файл: floor rug red.png |
| №1625 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1626 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png.meta | 3009 B | вспомогательный файл: floor stone tile dark.png |
| №1627 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1628 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png.meta | 3009 B | вспомогательный файл: floor stone tile light.png |
| №1629 unity/Assets/LegacyContent/Source/floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1630 unity/Assets/LegacyContent/Source/floor_tatami.png.meta | 3009 B | вспомогательный файл: floor tatami.png |
| №1631 unity/Assets/LegacyContent/Source/floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1632 unity/Assets/LegacyContent/Source/floor_wood_dark.png.meta | 3009 B | вспомогательный файл: floor wood dark.png |
| №1633 unity/Assets/LegacyContent/Source/floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1634 unity/Assets/LegacyContent/Source/floor_wood_light.png.meta | 3009 B | вспомогательный файл: floor wood light.png |
| №1635 unity/Assets/LegacyContent/Source/wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1636 unity/Assets/LegacyContent/Source/wall_brick_red.png.meta | 3009 B | вспомогательный файл: wall brick red.png |
| №1637 unity/Assets/LegacyContent/Source/wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1638 unity/Assets/LegacyContent/Source/wall_concrete.png.meta | 3009 B | вспомогательный файл: wall concrete.png |
| №1639 unity/Assets/LegacyContent/Source/wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1640 unity/Assets/LegacyContent/Source/wall_half_timber.png.meta | 3009 B | вспомогательный файл: wall half timber.png |
| №1641 unity/Assets/LegacyContent/Source/wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1642 unity/Assets/LegacyContent/Source/wall_marble_dark.png.meta | 3009 B | вспомогательный файл: wall marble dark.png |
| №1643 unity/Assets/LegacyContent/Source/wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1644 unity/Assets/LegacyContent/Source/wall_marble_light.png.meta | 3009 B | вспомогательный файл: wall marble light.png |
| №1645 unity/Assets/LegacyContent/Source/wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1646 unity/Assets/LegacyContent/Source/wall_moss_stone.png.meta | 3009 B | вспомогательный файл: wall moss stone.png |
| №1647 unity/Assets/LegacyContent/Source/wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1648 unity/Assets/LegacyContent/Source/wall_old_plaster.png.meta | 3009 B | вспомогательный файл: wall old plaster.png |
| №1649 unity/Assets/LegacyContent/Source/wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1650 unity/Assets/LegacyContent/Source/wall_plaster_dark.png.meta | 3009 B | вспомогательный файл: wall plaster dark.png |
| №1651 unity/Assets/LegacyContent/Source/wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1652 unity/Assets/LegacyContent/Source/wall_plaster_light.png.meta | 3009 B | вспомогательный файл: wall plaster light.png |
| №1653 unity/Assets/LegacyContent/Source/wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1654 unity/Assets/LegacyContent/Source/wall_plaster_panel.png.meta | 3009 B | вспомогательный файл: wall plaster panel.png |
| №1655 unity/Assets/LegacyContent/Source/wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1656 unity/Assets/LegacyContent/Source/wall_slate.png.meta | 3009 B | вспомогательный файл: wall slate.png |
| №1657 unity/Assets/LegacyContent/Source/wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1658 unity/Assets/LegacyContent/Source/wall_stone_dark.png.meta | 3009 B | вспомогательный файл: wall stone dark.png |
| №1659 unity/Assets/LegacyContent/Source/wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1660 unity/Assets/LegacyContent/Source/wall_stone_light.png.meta | 3009 B | вспомогательный файл: wall stone light.png |
| №1661 unity/Assets/LegacyContent/Source/wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1662 unity/Assets/LegacyContent/Source/wall_stone_masonry.png.meta | 3009 B | вспомогательный файл: wall stone masonry.png |
| №1663 unity/Assets/LegacyContent/Source/wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1664 unity/Assets/LegacyContent/Source/wall_wallpaper.png.meta | 3009 B | вспомогательный файл: wall wallpaper.png |
| №1665 unity/Assets/LegacyContent/Source/wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1666 unity/Assets/LegacyContent/Source/wall_white_plaster.png.meta | 3009 B | вспомогательный файл: wall white plaster.png |
| №1667 unity/Assets/LegacyContent/Source/wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1668 unity/Assets/LegacyContent/Source/wall_wood_dark.png.meta | 3009 B | вспомогательный файл: wall wood dark.png |
| №1669 unity/Assets/LegacyContent/Source/wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1670 unity/Assets/LegacyContent/Source/wall_wood_light.png.meta | 3009 B | вспомогательный файл: wall wood light.png |
| №1671 unity/Assets/Plugins.meta | 172 B | вспомогательный файл: Plugins |
| №1672 unity/Assets/Plugins/Android.meta | 172 B | вспомогательный файл: Android |
| №1673 unity/Assets/Plugins/Android/DndSessionVault.java | 2333 B | вспомогательный файл: DndSessionVault |
| №1674 unity/Assets/Plugins/Android/DndSessionVault.java.meta | 60 B | вспомогательный файл: DndSessionVault.java |
| №1675 unity/Assets/Plugins/Android/UpdateProvider.java | 4306 B | вспомогательный файл: UpdateProvider |
| №1676 unity/Assets/Plugins/Android/UpdateProvider.java.meta | 60 B | вспомогательный файл: UpdateProvider.java |
| №1677 unity/Assets/StreamingAssets/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1678 unity/Assets/StreamingAssets/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1679 unity/Assets/StreamingAssets/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1680 unity/Assets/UniversalRenderPipelineGlobalSettings.asset | 25900 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings |
| №1681 unity/Assets/UniversalRenderPipelineGlobalSettings.asset.meta | 189 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings.asset |
| №1682 unity/Assets/Vtt.meta | 172 B | вспомогательный файл: Vtt |
| №1683 unity/Assets/Vtt/Editor.meta | 172 B | вспомогательный файл: Editor |
| №1684 unity/Assets/Vtt/Editor/BrandingResumeValidation.cs | 2971 B | вспомогательный файл: BrandingResumeValidation |
| №1685 unity/Assets/Vtt/Editor/BrandingResumeValidation.cs.meta | 60 B | вспомогательный файл: BrandingResumeValidation.cs |
| №1686 unity/Assets/Vtt/Editor/BuildBranding.cs | 2738 B | вспомогательный файл: BuildBranding |
| №1687 unity/Assets/Vtt/Editor/BuildBranding.cs.meta | 60 B | вспомогательный файл: BuildBranding.cs |
| №1688 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs | 21197 B | вспомогательный файл: CharacterSheetValidation |
| №1689 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs.meta | 59 B | вспомогательный файл: CharacterSheetValidation.cs |
| №1690 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs | 10734 B | вспомогательный файл: LegacyMigrationSetup |
| №1691 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSetup.cs |
| №1692 unity/Assets/Vtt/Editor/PrototypeSetup.cs | 7704 B | вспомогательный файл: PrototypeSetup |
| №1693 unity/Assets/Vtt/Editor/PrototypeSetup.cs.meta | 59 B | вспомогательный файл: PrototypeSetup.cs |
| №1694 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs | 10017 B | вспомогательный файл: UnityReleaseBuild |
| №1695 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs.meta | 60 B | вспомогательный файл: UnityReleaseBuild.cs |
| №1696 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs | 3632 B | вспомогательный файл: WorkshopBundleBuild |
| №1697 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs.meta | 60 B | вспомогательный файл: WorkshopBundleBuild.cs |
| №1698 unity/Assets/Vtt/Editor/WorkshopEditorValidation.cs | 9571 B | вспомогательный файл: WorkshopEditorValidation |
| №1699 unity/Assets/Vtt/Editor/WorkshopEditorValidation.cs.meta | 60 B | вспомогательный файл: WorkshopEditorValidation.cs |
| №1700 unity/Assets/Vtt/Resources.meta | 172 B | вспомогательный файл: Resources |
| №1701 unity/Assets/Vtt/Resources/Branding.meta | 172 B | вспомогательный файл: Branding |
| №1702 unity/Assets/Vtt/Resources/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1703 unity/Assets/Vtt/Resources/Branding/Dragon20.png.meta | 312 B | вспомогательный файл: Dragon20.png |
| №1704 unity/Assets/Vtt/Resources/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1705 unity/Assets/Vtt/Resources/Branding/Splash19.png.meta | 312 B | вспомогательный файл: Splash19.png |
| №1706 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1707 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg.meta | 312 B | вспомогательный файл: Wallpaper16.jpg |
| №1708 unity/Assets/Vtt/Resources/Changelog.json | 10432 B | данные/конфигурация: Changelog |
| №1709 unity/Assets/Vtt/Resources/Changelog.json.meta | 158 B | вспомогательный файл: Changelog.json |
| №1710 unity/Assets/Vtt/Resources/CharacterSheet.meta | 172 B | вспомогательный файл: CharacterSheet |
| №1711 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json | 823381 B | данные/конфигурация: catalog |
| №1712 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json.meta | 158 B | вспомогательный файл: catalog.json |
| №1713 unity/Assets/Vtt/Runtime.meta | 172 B | вспомогательный файл: Runtime |
| №1714 unity/Assets/Vtt/Runtime/CharacterCreation.cs | 11170 B | вспомогательный файл: CharacterCreation |
| №1715 unity/Assets/Vtt/Runtime/CharacterCreation.cs.meta | 59 B | вспомогательный файл: CharacterCreation.cs |
| №1716 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs | 16128 B | вспомогательный файл: CharacterSheetRules |
| №1717 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs.meta | 59 B | вспомогательный файл: CharacterSheetRules.cs |
| №1718 unity/Assets/Vtt/Runtime/ClientPreferences.cs | 4479 B | вспомогательный файл: ClientPreferences |
| №1719 unity/Assets/Vtt/Runtime/ClientPreferences.cs.meta | 59 B | вспомогательный файл: ClientPreferences.cs |
| №1720 unity/Assets/Vtt/Runtime/CloudCharacterProtocol.cs | 5186 B | вспомогательный файл: CloudCharacterProtocol |
| №1721 unity/Assets/Vtt/Runtime/CloudCharacterProtocol.cs.meta | 60 B | вспомогательный файл: CloudCharacterProtocol.cs |
| №1722 unity/Assets/Vtt/Runtime/CommerceRules.cs | 19387 B | вспомогательный файл: CommerceRules |
| №1723 unity/Assets/Vtt/Runtime/CommerceRules.cs.meta | 60 B | вспомогательный файл: CommerceRules.cs |
| №1724 unity/Assets/Vtt/Runtime/ExplorerController.cs | 5869 B | вспомогательный файл: ExplorerController |
| №1725 unity/Assets/Vtt/Runtime/ExplorerController.cs.meta | 59 B | вспомогательный файл: ExplorerController.cs |
| №1726 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs | 808 B | вспомогательный файл: LegacyContentCatalog |
| №1727 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs.meta | 59 B | вспомогательный файл: LegacyContentCatalog.cs |
| №1728 unity/Assets/Vtt/Runtime/LegacyDocuments.cs | 9096 B | вспомогательный файл: LegacyDocuments |
| №1729 unity/Assets/Vtt/Runtime/LegacyDocuments.cs.meta | 59 B | вспомогательный файл: LegacyDocuments.cs |
| №1730 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs | 16116 B | вспомогательный файл: LegacyMapPresenter |
| №1731 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs.meta | 59 B | вспомогательный файл: LegacyMapPresenter.cs |
| №1732 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs | 3065 B | вспомогательный файл: LegacyMigrationSmoke |
| №1733 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSmoke.cs |
| №1734 unity/Assets/Vtt/Runtime/LegacySessionPanel.Account.cs | 18851 B | вспомогательный файл: LegacySessionPanel.Account |
| №1735 unity/Assets/Vtt/Runtime/LegacySessionPanel.Account.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Account.cs |
| №1736 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs | 16427 B | вспомогательный файл: LegacySessionPanel.Branding |
| №1737 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Branding.cs |
| №1738 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs | 12135 B | вспомогательный файл: LegacySessionPanel.BrandSettings |
| №1739 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.BrandSettings.cs |
| №1740 unity/Assets/Vtt/Runtime/LegacySessionPanel.Commerce.cs | 18536 B | вспомогательный файл: LegacySessionPanel.Commerce |
| №1741 unity/Assets/Vtt/Runtime/LegacySessionPanel.Commerce.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Commerce.cs |
| №1742 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs | 13159 B | вспомогательный файл: LegacySessionPanel.ContentManager |
| №1743 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs | 8942 B | вспомогательный файл: LegacySessionPanel |
| №1744 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.cs |
| №1745 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs | 27573 B | вспомогательный файл: LegacySessionPanel.FrontEnd |
| №1746 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.FrontEnd.cs |
| №1747 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs | 9448 B | вспомогательный файл: LegacySessionPanel.Settings |
| №1748 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Settings.cs |
| №1749 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs | 28532 B | вспомогательный файл: LegacySessionPanel.Sheet |
| №1750 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Sheet.cs |
| №1751 unity/Assets/Vtt/Runtime/LegacySessionPanel.SheetSkin.cs | 4480 B | вспомогательный файл: LegacySessionPanel.SheetSkin |
| №1752 unity/Assets/Vtt/Runtime/LegacySessionPanel.SheetSkin.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.SheetSkin.cs |
| №1753 unity/Assets/Vtt/Runtime/LegacySessionPanel.Touch.cs | 3267 B | вспомогательный файл: LegacySessionPanel.Touch |
| №1754 unity/Assets/Vtt/Runtime/LegacySessionPanel.Touch.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Touch.cs |
| №1755 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs | 13243 B | вспомогательный файл: LegacySessionPanel.Updates |
| №1756 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Updates.cs |
| №1757 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs | 2534 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary |
| №1758 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary.cs |
| №1759 unity/Assets/Vtt/Runtime/link.xml | 628 B | вспомогательный файл: link |
| №1760 unity/Assets/Vtt/Runtime/link.xml.meta | 60 B | вспомогательный файл: link.xml |
| №1761 unity/Assets/Vtt/Runtime/MenuGesture.cs | 1718 B | вспомогательный файл: MenuGesture |
| №1762 unity/Assets/Vtt/Runtime/MenuGesture.cs.meta | 60 B | вспомогательный файл: MenuGesture.cs |
| №1763 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs | 3139 B | вспомогательный файл: PrototypeSmoke |
| №1764 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs.meta | 59 B | вспомогательный файл: PrototypeSmoke.cs |
| №1765 unity/Assets/Vtt/Runtime/UnityRelease.cs | 5985 B | вспомогательный файл: UnityRelease |
| №1766 unity/Assets/Vtt/Runtime/UnityRelease.cs.meta | 60 B | вспомогательный файл: UnityRelease.cs |
| №1767 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs | 8174 B | вспомогательный файл: WorkshopRuntime |
| №1768 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs.meta | 60 B | вспомогательный файл: WorkshopRuntime.cs |
| №1769 unity/Assets/Vtt/Runtime/WorkshopStore.cs | 20856 B | вспомогательный файл: WorkshopStore |
| №1770 unity/Assets/Vtt/Runtime/WorkshopStore.cs.meta | 60 B | вспомогательный файл: WorkshopStore.cs |
| №1771 unity/Assets/Vtt/Scenes.meta | 172 B | вспомогательный файл: Scenes |
| №1772 unity/Assets/Vtt/Scenes/Exploration.unity | 49176 B | вспомогательный файл: Exploration |
| №1773 unity/Assets/Vtt/Scenes/Exploration.unity.meta | 155 B | вспомогательный файл: Exploration.unity |
| №1774 unity/Assets/Vtt/Scenes/ImportedAdventure.unity | 2328750 B | вспомогательный файл: ImportedAdventure |
| №1775 unity/Assets/Vtt/Scenes/ImportedAdventure.unity.meta | 155 B | вспомогательный файл: ImportedAdventure.unity |
| №1776 unity/Assets/Vtt/Settings.meta | 172 B | вспомогательный файл: Settings |
| №1777 unity/Assets/Vtt/Settings/Explorer.mat | 3799 B | вспомогательный файл: Explorer |
| №1778 unity/Assets/Vtt/Settings/Explorer.mat.meta | 188 B | вспомогательный файл: Explorer.mat |
| №1779 unity/Assets/Vtt/Settings/ExplorerRenderer.asset | 1865 B | вспомогательный файл: ExplorerRenderer |
| №1780 unity/Assets/Vtt/Settings/ExplorerRenderer.asset.meta | 189 B | вспомогательный файл: ExplorerRenderer.asset |
| №1781 unity/Assets/Vtt/Settings/ExplorerURP.asset | 4690 B | вспомогательный файл: ExplorerURP |
| №1782 unity/Assets/Vtt/Settings/ExplorerURP.asset.meta | 189 B | вспомогательный файл: ExplorerURP.asset |
| №1783 unity/Assets/Vtt/Settings/Stone.mat | 3795 B | вспомогательный файл: Stone |
| №1784 unity/Assets/Vtt/Settings/Stone.mat.meta | 188 B | вспомогательный файл: Stone.mat |
| №1785 unity/Assets/Vtt/Settings/Wall.mat | 3793 B | вспомогательный файл: Wall |
| №1786 unity/Assets/Vtt/Settings/Wall.mat.meta | 188 B | вспомогательный файл: Wall.mat |
| №1787 unity/Assets/Vtt/Tests.meta | 172 B | вспомогательный файл: Tests |
| №1788 unity/Assets/Vtt/Tests/sheet-contract.json | 195912 B | данные/конфигурация: sheet contract |
| №1789 unity/Assets/Vtt/Tests/sheet-contract.json.meta | 158 B | вспомогательный файл: sheet contract.json |
| №1790 unity/ci/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №1791 unity/ci/check_sheet_provenance.py | 2365 B | вспомогательный файл: check sheet provenance |
| №1792 unity/ci/cloud_release.py | 14328 B | вспомогательный файл: cloud release |
| №1793 unity/ci/measure_apk.py | 5713 B | вспомогательный файл: measure apk |
| №1794 unity/ci/promote_candidate.py | 4640 B | вспомогательный файл: promote candidate |
| №1795 unity/ci/publish_android_update.py | 6493 B | вспомогательный файл: publish android update |
| №1796 unity/ci/requirements.txt | 21 B | документация или отчёт: requirements |
| №1797 unity/ci/test_brand_visual_contract.py | 3012 B | вспомогательный файл: test brand visual contract |
| №1798 unity/ci/test_cloud_release.py | 10089 B | вспомогательный файл: test cloud release |
| №1799 unity/ci/test_content_registry_contract.py | 1174 B | вспомогательный файл: test content registry contract |
| №1800 unity/ci/test_update_settings_contract.py | 3945 B | вспомогательный файл: test update settings contract |
| №1801 unity/ci/transfer-signing-secrets.ps1 | 3449 B | вспомогательный файл: transfer signing secrets |
| №1802 unity/ci/verify_bundle_output.py | 1081 B | вспомогательный файл: verify bundle output |
| №1803 unity/ci/verify_public_workshop.py | 1766 B | вспомогательный файл: verify public workshop |
| №1804 unity/ci/windows-upgrade-qa.ps1 | 3846 B | вспомогательный файл: windows upgrade qa |
| №1805 unity/ci/workshop-tests/.gitignore | 10 B | вспомогательный файл: .gitignore |
| №1806 unity/ci/workshop-tests/AccountGestureChecks.cs | 3924 B | вспомогательный файл: AccountGestureChecks |
| №1807 unity/ci/workshop-tests/CommerceChecks.cs | 4247 B | вспомогательный файл: CommerceChecks |
| №1808 unity/ci/workshop-tests/Program.cs | 17232 B | вспомогательный файл: Program |
| №1809 unity/ci/workshop-tests/WorkshopTests.csproj | 1243 B | вспомогательный файл: WorkshopTests |
| №1810 unity/ContentSources~/catalog.full.json | 1259265 B | данные/конфигурация: catalog.full |
| №1811 unity/ContentSources~/cloud-copy-contracts.json | 3613 B | данные/конфигурация: cloud copy contracts |
| №1812 unity/ContentSources~/workshop-commerce/catalogs.json | 91244 B | данные/конфигурация: catalogs |
| №1813 unity/ContentSources~/workshop-commerce/contracts.json | 7885 B | данные/конфигурация: contracts |
| №1814 unity/evidence/exploration.png | 119417 B | текстура/изображение: exploration |
| №1815 unity/Installer/release-notes.md | 1582 B | документация или отчёт: release notes |
| №1816 unity/Installer/UnitySetup.nsi | 3417 B | вспомогательный файл: UnitySetup |
| №1817 unity/Packages/manifest.json | 565 B | данные/конфигурация: manifest |
| №1818 unity/Packages/packages-lock.json | 6359 B | данные/конфигурация: packages lock |
| №1819 unity/ProjectSettings/AudioManager.asset | 523 B | вспомогательный файл: AudioManager |
| №1820 unity/ProjectSettings/ClusterInputManager.asset | 114 B | вспомогательный файл: ClusterInputManager |
| №1821 unity/ProjectSettings/DynamicsManager.asset | 1574 B | вспомогательный файл: DynamicsManager |
| №1822 unity/ProjectSettings/EditorBuildSettings.asset | 401 B | вспомогательный файл: EditorBuildSettings |
| №1823 unity/ProjectSettings/EditorSettings.asset | 1603 B | вспомогательный файл: EditorSettings |
| №1824 unity/ProjectSettings/GraphicsSettings.asset | 2615 B | вспомогательный файл: GraphicsSettings |
| №1825 unity/ProjectSettings/InputManager.asset | 9754 B | вспомогательный файл: InputManager |
| №1826 unity/ProjectSettings/MemorySettings.asset | 1226 B | вспомогательный файл: MemorySettings |
| №1827 unity/ProjectSettings/MultiplayerManager.asset | 232 B | вспомогательный файл: MultiplayerManager |
| №1828 unity/ProjectSettings/NavMeshAreas.asset | 1361 B | вспомогательный файл: NavMeshAreas |
| №1829 unity/ProjectSettings/Physics2DSettings.asset | 1862 B | вспомогательный файл: Physics2DSettings |
| №1830 unity/ProjectSettings/PresetManager.asset | 146 B | вспомогательный файл: PresetManager |
| №1831 unity/ProjectSettings/ProjectSettings.asset | 22468 B | вспомогательный файл: ProjectSettings |
| №1832 unity/ProjectSettings/ProjectVersion.txt | 85 B | документация или отчёт: ProjectVersion |
| №1833 unity/ProjectSettings/QualitySettings.asset | 9858 B | вспомогательный файл: QualitySettings |
| №1834 unity/ProjectSettings/SceneTemplateSettings.json | 3535 B | данные/конфигурация: SceneTemplateSettings |
| №1835 unity/ProjectSettings/ShaderGraphSettings.asset | 633 B | вспомогательный файл: ShaderGraphSettings |
| №1836 unity/ProjectSettings/TagManager.asset | 411 B | вспомогательный файл: TagManager |
| №1837 unity/ProjectSettings/TimeManager.asset | 305 B | вспомогательный файл: TimeManager |
| №1838 unity/ProjectSettings/UnityConnectSettings.asset | 1063 B | вспомогательный файл: UnityConnectSettings |
| №1839 unity/ProjectSettings/VersionControlSettings.asset | 172 B | вспомогательный файл: VersionControlSettings |
| №1840 unity/ProjectSettings/VFXManager.asset | 525 B | вспомогательный файл: VFXManager |
| №1841 unity/PUBLIC_DELIVERY.json | 973 B | данные/конфигурация: PUBLIC DELIVERY |
| №1842 unity/README.md | 9382 B | документация или отчёт: README |
| №1843 unity/release.ps1 | 7750 B | вспомогательный файл: release |
| №1844 unity/Tools/export_cloud_copy.cjs | 1429 B | логический модуль: export cloud copy |
| №1845 unity/Tools/export_commerce.cjs | 2282 B | логический модуль: export commerce |
| №1846 unity/Tools/package_commerce.py | 3643 B | вспомогательный файл: package commerce |
| №1847 unity/Tools/split_workshop_content.py | 7629 B | вспомогательный файл: split workshop content |
| №1848 unity/Tools/sync_character_sheet.cjs | 11842 B | логический модуль: sync character sheet |
| №1849 unity/Tools/sync_legacy_content.cjs | 5736 B | логический модуль: sync legacy content |
| №1850 unity/VALIDATION.md | 32688 B | документация или отчёт: VALIDATION |
| №1851 unity/verify.ps1 | 2809 B | вспомогательный файл: verify |
| №1852 updates/beta.json | 211 B | метаданные обновлений: beta |
| №1853 updates/previous-stable.json | 179808 B | метаданные обновлений: previous stable |
| №1854 updates/README.md | 233 B | документация или отчёт: README |
| №1855 updates/stable.json | 179809 B | метаданные обновлений: stable |
| №1856 updates/unity-changelog.json | 10432 B | метаданные обновлений: unity changelog |
| №1857 updates/unity-experiment.json | 1343 B | метаданные обновлений: unity experiment |
| №1858 vignette_v2_sprite.png | 1213593 B | текстура/изображение: vignette v2 sprite |
| №1859 VTT_PROJECT_MANIFEST_V70.json | 44370 B | устаревший список V70, не актуален |
| №1860 wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1861 wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1862 wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1863 wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1864 wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1865 wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1866 wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1867 wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1868 wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1869 wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1870 wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1871 wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1872 wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1873 wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1874 wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1875 wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1876 wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1877 wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1878 wallpapers/1.png | 1460744 B | ассет графики/3D/интерфейса: 1 |
| №1879 wallpapers/10.png | 1667723 B | ассет графики/3D/интерфейса: 10 |
| №1880 wallpapers/11.png | 1815959 B | ассет графики/3D/интерфейса: 11 |
| №1881 wallpapers/12.png | 1548677 B | ассет графики/3D/интерфейса: 12 |
| №1882 wallpapers/13.png | 1599093 B | ассет графики/3D/интерфейса: 13 |
| №1883 wallpapers/14.png | 1596513 B | ассет графики/3D/интерфейса: 14 |
| №1884 wallpapers/15.png | 233043 B | ассет графики/3D/интерфейса: 15 |
| №1885 wallpapers/16.png | 212684 B | ассет графики/3D/интерфейса: 16 |
| №1886 wallpapers/17.png | 1585122 B | ассет графики/3D/интерфейса: 17 |
| №1887 wallpapers/18.png | 2095852 B | ассет графики/3D/интерфейса: 18 |
| №1888 wallpapers/19.png | 8605503 B | ассет графики/3D/интерфейса: 19 |
| №1889 wallpapers/2.png | 1590206 B | ассет графики/3D/интерфейса: 2 |
| №1890 wallpapers/20.png | 1284815 B | ассет графики/3D/интерфейса: 20 |
| №1891 wallpapers/21.png | 179307 B | ассет графики/3D/интерфейса: 21 |
| №1892 wallpapers/22.png | 344279 B | ассет графики/3D/интерфейса: 22 |
| №1893 wallpapers/23.png | 210291 B | ассет графики/3D/интерфейса: 23 |
| №1894 wallpapers/24.png | 141215 B | ассет графики/3D/интерфейса: 24 |
| №1895 wallpapers/25.png | 160892 B | ассет графики/3D/интерфейса: 25 |
| №1896 wallpapers/26.png | 187259 B | ассет графики/3D/интерфейса: 26 |
| №1897 wallpapers/27.png | 213194 B | ассет графики/3D/интерфейса: 27 |
| №1898 wallpapers/28.png | 202417 B | ассет графики/3D/интерфейса: 28 |
| №1899 wallpapers/29.png | 166942 B | ассет графики/3D/интерфейса: 29 |
| №1900 wallpapers/3.png | 1662340 B | ассет графики/3D/интерфейса: 3 |
| №1901 wallpapers/30.png | 237556 B | ассет графики/3D/интерфейса: 30 |
| №1902 wallpapers/31.svg | 1181 B | ассет графики/3D/интерфейса: 31 |
| №1903 wallpapers/32.svg | 1417 B | ассет графики/3D/интерфейса: 32 |
| №1904 wallpapers/4.png | 1816114 B | ассет графики/3D/интерфейса: 4 |
| №1905 wallpapers/5.png | 1742466 B | ассет графики/3D/интерфейса: 5 |
| №1906 wallpapers/6.png | 1591016 B | ассет графики/3D/интерфейса: 6 |
| №1907 wallpapers/7.png | 1815665 B | ассет графики/3D/интерфейса: 7 |
| №1908 wallpapers/8.png | 1492730 B | ассет графики/3D/интерфейса: 8 |
| №1909 wallpapers/9.png | 1715179 B | ассет графики/3D/интерфейса: 9 |

## Реестр имён, переменных и ключей

Имена сгруппированы по роли. Ссылка №NNNN указывает на путь в таблице файлов выше; остальные вхождения ищите в исходниках.
Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.


### JS объявления/параметры (4931)

| Имя | Исходные файлы |
|---|---|
| _ | №0058 (+ 10 других файлов) |
| __ls | №1243 (+ 4 других файлов) |
| __shifterProgression | №0833 |
| __TEST_SRC__ | №1243 (+ 4 других файлов) |
| _event | №0887 |
| _wc | №0886 |
| a | №0059 (+ 144 других файлов) |
| A | №0058 (+ 5 других файлов) |
| a0 | №1166 (+ 1 других файлов) |
| a1 | №1166 (+ 1 других файлов) |
| a2 | №1166 (+ 1 других файлов) |
| aa | №0061 (+ 1 других файлов) |
| aal | №1111 |
| ab | №0058 (+ 10 других файлов) |
| abilities | №0784 |
| ability | №0077 (+ 6 других файлов) |
| ABILITY | №0798 |
| abilityMod | №0779 |
| abName | №0654 |
| AbortController | №1149 |
| above | №0061 (+ 2 других файлов) |
| absent | №0668 |
| absolute | №1849 |
| absorbed | №0655 (+ 1 других файлов) |
| ac | №0061 (+ 25 других файлов) |
| ACADEMIES | №0872 |
| academy | №0776 (+ 1 других файлов) |
| academyEffects | №0779 |
| acBase | №0791 |
| acBaseInp | №0791 |
| acc | №0836 (+ 4 других файлов) |
| acCalcBaseSel | №0791 |
| ACCEPT | №0802 |
| access | №0670 (+ 1 других файлов) |
| accessors | №1165 (+ 4 других файлов) |
| accessory | №0063 |
| accIndex | №1157 |
| account | №0651 |
| ACCURSED_CURSE_FEATURES | №0779 |
| ACCURSED_CURSES | №0779 |
| ACCURSED_METAMORPHOSES | №0779 |
| acidAttack | №1118 |
| acInput | №0083 (+ 1 других файлов) |
| acInputEl | №0793 |
| across | №0061 |
| action | №0077 (+ 20 других файлов) |
| actionBtn | №0792 |
| actionHandler | №0810 |
| actionId | №0825 |
| actionIndex | №0838 |
| actionName | №0811 |
| actionResultsByPeer | №0810 |
| actions | №0078 (+ 6 других файлов) |
| ACTIONS | №0783 |
| actionSpent | №0655 |
| actionStr | №0790 |
| actionTokenId | №0625 |
| active | №0061 (+ 15 других файлов) |
| ACTIVE | №0782 |
| activeBonuses | №0793 |
| activeBtns | №0772 |
| activeCat | №0791 |
| activeCategory | №0793 (+ 1 других файлов) |
| activeClass | №0812 |
| activeColsWallet | №0790 |
| activeEffects | №0078 |
| activeFolder | №0812 |
| activeHero | №0832 (+ 1 других файлов) |
| activeId | №0818 |
| activeLvl | №0832 |
| activeNow | №0773 |
| activeStats | №0793 |
| activeTab | №0063 |
| activeWp | №0868 |
| actor | №0655 (+ 10 других файлов) |
| actorId | №0783 (+ 1 других файлов) |
| actors | №0641 |
| acts | №0633 (+ 7 других файлов) |
| actual | №0783 (+ 5 других файлов) |
| actualMode | №0655 |
| acVal | №0793 |
| ad | №0061 |
| add | №0789 (+ 3 других файлов) |
| addBtn | №0791 |
| added | №0713 (+ 2 других файлов) |
| addedLangs | №0646 |
| addedWeight | №0792 (+ 1 других файлов) |
| addExhaustion | №0825 |
| addGroup | №0673 |
| addToContainer | №0789 |
| addVal | №0780 |
| adj | №0805 |
| adjacent | №0058 |
| adjusted | №0805 |
| adr | №0833 (+ 1 других файлов) |
| adv | №0655 (+ 2 других файлов) |
| advice | №0819 |
| aether | №0641 |
| af | №0061 |
| affected | №0078 |
| affinity | №0648 (+ 1 других файлов) |
| after | №0655 (+ 8 других файлов) |
| afterBounds | №1141 |
| ag | №0779 (+ 1 других файлов) |
| again | №1182 |
| age | №0624 (+ 2 других файлов) |
| ageEl | №0624 (+ 1 других файлов) |
| ageInput | №0624 (+ 1 других файлов) |
| agents | №0632 |
| ah | №0061 (+ 1 других файлов) |
| ai | №0061 (+ 11 других файлов) |
| ailment | №0779 |
| aim | №0070 |
| aimed | №1172 |
| ain | №0061 (+ 1 других файлов) |
| al | №0061 |
| alchemistCombatant | №1117 |
| alchemistDebuffs | №0655 |
| alchemistFormula | №0655 |
| alchemistLevel | №0655 |
| alchemistState | №0655 |
| alchemistVariants | №0078 |
| alias | №0700 (+ 2 других файлов) |
| ALIAS | №0770 |
| aliases | №0078 (+ 7 других файлов) |
| ALIASES | №0672 (+ 1 других файлов) |
| align | №1308 |
| all | №0063 (+ 5 других файлов) |
| ALL_RECIPES | №0672 |
| allBgs | №0624 |
| allCharacters | №0083 |
| allCreatureNames | №0806 |
| allCurses | №0779 |
| allElements | №0790 |
| allFeats | №0745 |
| allItems | №0793 |
| allow | №0820 |
| allowed | №0061 (+ 10 других файлов) |
| allowed2 | №0813 |
| allowMastery | №0779 |
| allPanels | №0822 (+ 1 других файлов) |
| allRaces | №0624 (+ 2 других файлов) |
| allRollsDetails | №0836 |
| allSources | №0745 |
| allSpells | №0836 |
| ally | №0078 (+ 5 других файлов) |
| allyState | №0078 |
| allyWilling | №0819 |
| allyX | №0819 |
| allyY | №0819 |
| alone | №1124 |
| already | №0779 (+ 1 других файлов) |
| alreadyHad | №0745 |
| alreadyHas | №0822 |
| alreadyHasSelectedClass | №0700 |
| alreadyHasSubclass | №0700 |
| alternates | №0081 |
| always | №0809 |
| am | №0073 (+ 3 других файлов) |
| am2 | №1269 |
| amap | №0779 |
| AMBIENCE_STATE_KEY | №0082 |
| ambienceShouldPlay | №0082 |
| ambienceStateLoaded | №0082 |
| AMBIENT_TRACKS | №0082 |
| amorist | №1118 |
| amount | №0061 (+ 23 других файлов) |
| amp | №0779 |
| amphibian | №1118 |
| amphibianMods | №1118 |
| amplified | №1274 |
| anatomy | №1120 |
| anchor | №0058 (+ 1 других файлов) |
| anchors | №0061 (+ 1 других файлов) |
| angle | №0058 (+ 6 других файлов) |
| angularIndex | №0058 |
| animal | №0061 |
| animalCfg | №0061 |
| animalParts | №0061 |
| animalSelect | №0063 |
| ankle | №0061 (+ 1 других файлов) |
| answered | №0811 |
| answers | №1179 |
| ao | №0811 |
| ap | №0648 (+ 7 других файлов) |
| api | №0059 (+ 41 других файлов) |
| API | №0079 (+ 12 других файлов) |
| app | №0886 (+ 3 других файлов) |
| APP_FONTS | №0832 |
| APP_FRAME_COLORS | №0832 |
| APP_FRAME_STYLES | №0832 |
| APP_THEMES | №0832 |
| APP_VERSION | №0842 (+ 1 других файлов) |
| appearance | №0060 (+ 2 других файлов) |
| appearanceSource | №1149 |
| applicable | №0821 |
| applied | №0818 (+ 5 других файлов) |
| appliedBonusText | №0745 |
| applySkin | №0063 |
| approved | №1115 |
| approvedRules | №0821 |
| ar | №0648 (+ 4 других файлов) |
| arc | №0061 |
| arch | №0061 |
| archetypeFeatureIds | №0779 |
| area | №0061 (+ 2 других файлов) |
| arena | №1198 |
| arg | №0771 |
| args | №0771 (+ 7 других файлов) |
| arm | №0061 |
| armLine | №0061 |
| armor | №0666 (+ 4 других файлов) |
| armorCategories | №0791 |
| armored | №0829 |
| armorFields | №0791 |
| armorName | №0655 |
| armorObj | №0655 |
| armorOn | №0061 |
| arr | №0069 (+ 12 других файлов) |
| Array | №0663 (+ 23 других файлов) |
| ArrayBuffer | №1158 |
| arrays | №0672 |
| arrow | №0648 (+ 3 других файлов) |
| ARTIFICER_CLASSES | №0648 |
| ARTIFICER_KEY | №0827 |
| artisan | №1177 |
| artisanBack | №1177 |
| ASI | №0816 (+ 1 других файлов) |
| ASI_LEVELS | №0839 |
| asiContainer | №0700 |
| asiHtml | №0700 |
| asiLevels | №0778 |
| asiPrompt | №0700 |
| asMoney | №0818 |
| aspect | №0063 (+ 1 других файлов) |
| aspects | №0844 |
| ASPECTS | №0844 |
| assert | №1115 (+ 178 других файлов) |
| assertSource | №1154 |
| asset | №0059 (+ 30 других файлов) |
| assetId | №1161 |
| assets | №0076 |
| assetSet | №0071 |
| assigned | №0779 |
| at | №0059 (+ 16 других файлов) |
| atk | №0654 (+ 5 других файлов) |
| atkBonus | №0633 (+ 9 других файлов) |
| atkElem | №0654 (+ 1 других файлов) |
| atlas | №0062 |
| atob | №1121 (+ 21 других файлов) |
| aTok | №0655 |
| attachment | №0062 |
| attack | №0809 (+ 7 других файлов) |
| attacker | №0641 (+ 9 других файлов) |
| attackerBack | №0811 |
| attackerDebuffs | №0655 |
| attackerId | №0655 |
| attackerIdForStudy | №0655 |
| attackerSelect | №1179 |
| attackerState | №0655 |
| attackModifiers | №0809 |
| attackPayload | №0811 |
| attackRolls | №1209 |
| attacks | №0655 (+ 3 других файлов) |
| attempts | №0653 (+ 1 других файлов) |
| attributes | №1207 |
| aura | №0811 (+ 1 других файлов) |
| auraActive | №0648 |
| auraBack | №1177 |
| auraCha | №0648 |
| auraPC | №1177 |
| auraPhone | №1177 |
| auraRoster | №1177 |
| auraServer | №1177 |
| auraSource | №0648 |
| auth | №1148 |
| authoritativeAoe | №0811 |
| auto | №0811 |
| autoCloseTimer | №0797 |
| autoFail | №0655 |
| autoInterval | №0868 |
| automatic | №0641 |
| autoPlay | №0082 |
| autoResults | №0811 |
| autoRotateState | №0868 |
| autoRotateTimer | №0868 |
| autos | №0811 |
| av | №0061 (+ 2 других файлов) |
| avail | №0648 |
| available | №0779 (+ 4 других файлов) |
| availableCharges | №0078 |
| availableWallpapers | №0868 |
| avg | №0700 |
| avianHybrid | №1120 |
| aw | №0061 (+ 1 других файлов) |
| ax | №0061 (+ 2 других файлов) |
| axes | №0061 |
| AXES | №0066 |
| axis | №0061 (+ 10 других файлов) |
| ay | №0062 |
| az | №0061 (+ 1 других файлов) |
| b | №0059 (+ 128 других файлов) |
| B | №0058 (+ 16 других файлов) |
| b1 | №0061 (+ 1 других файлов) |
| back | №0059 (+ 4 других файлов) |
| backAnchor | №0061 |
| backBurden | №1177 |
| backCount | №0061 |
| backDepth | №0062 |
| backdrop | №0063 |
| backgroundName | №0624 (+ 1 других файлов) |
| backgrounds | №1297 |
| backgroundsList | №0624 (+ 1 других файлов) |
| backQueen | №1177 |
| backTop | №0062 |
| backup | №0653 (+ 2 других файлов) |
| backupData | №0832 |
| backups | №0651 |
| bad | №0641 (+ 5 других файлов) |
| badgeTag | №0772 |
| badR | №1274 |
| bag | №1138 |
| bagAnchor | №0058 |
| bagCenter | №0058 |
| bagRings | №0058 |
| baked | №1849 |
| balanceAfterBarter | №1213 |
| balanceAfterBuy | №1213 |
| BAM | №0630 |
| band | №0062 |
| bandHi | №0062 |
| bandLo | №0062 |
| bandSection | №0062 |
| bar | №0843 |
| barb | №1270 (+ 1 других файлов) |
| barbarian | №1263 |
| barFill | №0792 |
| barter | №1213 |
| barWrapper | №0792 |
| base | №0061 (+ 67 других файлов) |
| BASE | №0664 (+ 1 других файлов) |
| BASE_HOSTS | №0889 |
| baseAc | №0624 (+ 1 других файлов) |
| baseAC | №0793 |
| baseACInput | №0793 |
| baseActions | №0813 |
| baseConfig | №1357 |
| baseCount | №0672 |
| baseFeatures | №0813 |
| baseGain | №0700 |
| baseH | №0062 (+ 1 других файлов) |
| baseIds | №0872 |
| baseJinx | №0779 |
| baseline | №0063 (+ 2 других файлов) |
| baseMax | №0655 |
| baseMod | №0772 |
| baseMode | №0827 |
| baseNameEng | №0745 |
| baseNameRu | №0745 |
| baseOpenTrade | №0801 |
| baseRate | №0665 |
| baseRender | №0656 |
| BASES | №0674 |
| baseStock | №0802 |
| baseValue | №0667 |
| baseW | №0072 |
| baseX | №0061 |
| baseY | №0061 |
| bat | №0061 (+ 1 других файлов) |
| batch | №0811 |
| batchFail | №1290 |
| batchTarget | №1290 |
| battleGame | №1177 |
| bb | №0061 (+ 4 других файлов) |
| bbu | №0779 |
| bbuDamage | №1198 |
| bbuHero | №1198 |
| bbuLevel9 | №1198 |
| bbuResource | №0655 |
| bbuResult | №0655 |
| bbuTemp | №0779 |
| bc | №0058 (+ 2 других файлов) |
| bCha | №0824 |
| bCon | №0824 |
| bd | №1171 |
| bDex | №0824 |
| beak | №0061 |
| beakKind | №0061 |
| beakL | №0061 |
| beakScale | №0061 |
| beakSelect | №0063 |
| beakStyle | №1141 |
| beakW | №0061 |
| bearer | №0653 |
| bearing | №0818 |
| beast | №0833 |
| beetle | №0061 |
| before | №0653 (+ 63 других файлов) |
| beforeBounds | №1141 |
| beforeBurn | №1117 |
| beforeCup | №1179 |
| beforeCurse | №1274 |
| beforeMoxie | №1198 |
| beforeNormal | №1280 |
| beforePact | №1280 |
| beforeRepeat | №1177 |
| beforeReset | №1119 |
| beforeUnsupported | №1179 |
| beh | №1228 |
| belly | №0061 |
| belt | №0663 |
| bend | №0061 |
| berry | №0818 (+ 1 других файлов) |
| berryOwner | №0819 |
| berryRef | №1177 |
| best | №0061 (+ 11 других файлов) |
| bestD | №1165 |
| bestDist | №0811 |
| bestiary | №0806 |
| bestTrans | №1171 |
| bestTri | №1166 |
| bet | №1176 (+ 1 других файлов) |
| bev | №0811 |
| bf | №0069 (+ 2 других файлов) |
| bg | №0672 (+ 1 других файлов) |
| BG_COLOR_PALETTE | №0868 |
| BG3_POINT_BUY | №0624 (+ 1 других файлов) |
| bgBody | №0868 |
| bgInput | №0083 |
| bgs | №0645 (+ 1 других файлов) |
| bgSelect | №0624 (+ 1 других файлов) |
| bgStyle | №0772 |
| bgVal | №0624 (+ 1 других файлов) |
| bh | №0827 (+ 3 других файлов) |
| bhDamage | №0655 |
| bhPact | №0827 |
| bi | №0811 |
| bIdx | №0624 |
| bin | №0061 (+ 16 других файлов) |
| binary | №1306 |
| binBytes | №1160 |
| binPad | №1157 |
| bins | №0062 |
| bInt | №0824 |
| bird | №0061 |
| bite | №1191 |
| bits | №0058 (+ 1 других файлов) |
| bl | №0686 |
| blackPowder | №1118 |
| blackPowderAttack | №1118 |
| blade | №0061 |
| bladeSpan | №0061 |
| bleed | №0655 |
| blend | №0058 (+ 1 других файлов) |
| blended | №0058 |
| blind | №0818 (+ 2 других файлов) |
| blob | №0832 (+ 7 других файлов) |
| blobs | №1352 |
| block | №0822 (+ 6 других файлов) |
| blocked | №0653 (+ 4 других файлов) |
| bloodAbility | №0078 |
| bloodAgent | №1118 |
| bloodCurseReaction | №0655 |
| bloodHunterPack | №0779 |
| bloodlines | №0833 |
| bloodMax | №0648 |
| bloodMutagenist | №1118 |
| bloodRiteRevival | №0655 |
| bloodShort | №0078 |
| bloodSnapshots | №0078 |
| bm | №0811 (+ 2 других файлов) |
| board | №0811 (+ 2 других файлов) |
| boardBox | №0626 |
| boardCtx | №1251 |
| body | №0058 (+ 22 других файлов) |
| bodyArmor | №0793 |
| bodyBefore | №1119 |
| bodyExtras | №1127 |
| bodyStats | №0784 |
| bomb | №0078 (+ 2 других файлов) |
| bomber | №1118 |
| bomberGuard | №1118 |
| bomberResistanceTarget | №1117 |
| bomberResisted | №1117 |
| bond | №0656 |
| bondBox | №0819 |
| bondConsent | №1179 |
| bondLabel | №0819 |
| bonds | №0686 |
| bondTarget | №1179 |
| bondText | №0819 |
| bondWilling | №0819 |
| bone | №0068 (+ 1 других файлов) |
| bonesChecked | №1348 |
| boneStyle | №0061 |
| boneVertexMap | №0061 |
| bonus | №0074 (+ 24 других файлов) |
| bonusAction | №0811 |
| bonuses | №0791 |
| bonusesText | №0624 (+ 1 других файлов) |
| bonusMultiplier | №0772 |
| bonusText | №0745 |
| Boolean | №0663 (+ 1 других файлов) |
| booted | №0886 |
| borderLeftColor | №0772 |
| bottom | №0058 (+ 4 других файлов) |
| bought | №1213 |
| boundary | №0058 (+ 1 других файлов) |
| boundaryEdges | №0058 |
| boundaryWelds | №0058 |
| bounds | №1128 (+ 1 других файлов) |
| box | №0063 (+ 27 других файлов) |
| boxer | №1198 |
| boxesHtml | №0836 |
| boxIndex | №0836 |
| bp | №0672 (+ 7 других файлов) |
| bParts | №0624 (+ 1 других файлов) |
| br | №1263 |
| brandedHp | №1201 |
| braPanels | №1141 |
| breath | №1118 |
| breathOne | №1118 |
| breathResults | №0078 |
| breathRoll | №0078 |
| breathTargets | №0078 |
| breathTwo | №1118 |
| breathType | №0078 |
| bridge | №1163 (+ 4 других файлов) |
| broken | №0061 (+ 3 других файлов) |
| brokenInputs | №1144 |
| browColor | №0063 |
| browser | №1311 (+ 38 других файлов) |
| BrowserWindow | №0886 |
| bStr | №0824 |
| bt | №0061 (+ 2 других файлов) |
| btn | №0792 (+ 4 других файлов) |
| btnCat | №0793 |
| btnContainer | №0791 |
| btnMode | №0772 |
| btoa | №1121 (+ 2 других файлов) |
| bucket | №0061 (+ 2 других файлов) |
| buckets | №0061 |
| bucketStep | №0061 |
| budget | №0818 (+ 1 других файлов) |
| budgets | №0059 |
| buf | №0069 (+ 2 других файлов) |
| buffers | №0061 (+ 3 других файлов) |
| bufs | №0069 |
| build | №0062 (+ 1 других файлов) |
| built | №1121 (+ 3 других файлов) |
| bulge | №0061 |
| bundled | №1153 (+ 1 других файлов) |
| burden | №1177 |
| burdenAliases | №0803 |
| burdens | №0803 |
| burn | №0779 (+ 1 других файлов) |
| burningOwner | №1117 |
| burningTarget | №1117 |
| bus | №0853 (+ 1 других файлов) |
| busy | №0651 |
| button | №0063 (+ 5 других файлов) |
| buttons | №0063 (+ 2 других файлов) |
| buttonsHtml | №0745 |
| buyFactor | №0800 |
| bv | №0061 (+ 2 других файлов) |
| bvh | №1165 |
| bvIndex | №1157 |
| bWis | №0824 |
| bx | №0062 (+ 1 других файлов) |
| by | №0062 |
| BY_ID | №0821 |
| byFamily | №0628 (+ 12 других файлов) |
| byLevel | №0809 |
| byName | №0664 (+ 1 других файлов) |
| BYPASS_PARCHMENT_ONCE | №0645 |
| bySource | №0628 (+ 2 других файлов) |
| byteOffset | №0069 |
| bytes | №0064 (+ 4 других файлов) |
| bytesWritten | №0889 |
| bz | №0073 |
| c | №0059 (+ 222 других файлов) |
| C | №0081 (+ 13 других файлов) |
| c0 | №0661 |
| c2 | №1294 |
| ca | №0058 (+ 1 других файлов) |
| cache | №0069 |
| CACHE_BUSTER | №0842 |
| cached | №0062 (+ 1 других файлов) |
| calcAtk | №0647 |
| calcDmgBonus | №0647 |
| calcInput | №0780 |
| calcType | №0791 |
| calcWidget | №0790 |
| calf | №0059 |
| call | №0871 |
| callback | №0886 (+ 19 других файлов) |
| callbacks | №1186 |
| called | №1206 |
| calls | №1158 (+ 3 других файлов) |
| cam | №0070 (+ 1 других файлов) |
| campaign | №1230 |
| campaigns | №0642 |
| CAN | №0809 |
| canClose | №0843 |
| candidate | №0889 |
| candidates | №0061 (+ 7 других файлов) |
| canonical | №0770 |
| cantrip | №0078 |
| cantrips | №0760 (+ 1 других файлов) |
| CANTRIPS | №0844 |
| cantripsList | №0836 |
| canvas | №0070 (+ 3 других файлов) |
| cap | №0058 (+ 6 других файлов) |
| capacity | №1189 |
| caps | №1132 |
| capStart | №0058 |
| caption | №0819 |
| card | №0792 (+ 10 других файлов) |
| cardApi | №0819 |
| cardId | №0821 |
| cards | №0655 (+ 5 других файлов) |
| CARDS | №0821 |
| cases | №0663 (+ 3 других файлов) |
| cast | №1185 (+ 1 других файлов) |
| caster | №0811 (+ 3 других файлов) |
| casterLevel | №0827 |
| cat | №0067 (+ 22 других файлов) |
| catalog | №0063 (+ 5 других файлов) |
| CATALOG | №0628 (+ 15 других файлов) |
| catalogContainer | №0822 |
| catalogHtml | №0822 |
| catalogKey | №0819 |
| catalogState | №0660 |
| catalogue | №1319 |
| catalyst | №0081 |
| catalystId | №0079 (+ 1 других файлов) |
| CATALYSTS | №0079 |
| catContainer | №0791 |
| category | №0070 (+ 17 других файлов) |
| CATEGORY | №0660 |
| catLower | №0791 |
| catOk | №0802 |
| cats | №0664 |
| catStr | №0823 |
| catTitle | №0791 |
| cb | №1169 (+ 2 других файлов) |
| cbt | №1178 |
| cc | №0061 (+ 1 других файлов) |
| cd | №0779 |
| ce | №1286 (+ 1 других файлов) |
| ceiling | №0818 |
| cel | №0073 |
| celestial | №1204 |
| cell | №0061 (+ 7 других файлов) |
| CELL_FT | №0626 |
| cellFt | №0656 |
| cells | №0065 (+ 1 других файлов) |
| cellU | №0061 |
| cellV | №0061 |
| center | №0061 (+ 5 других файлов) |
| centre | №0061 |
| centres | №0061 |
| cf | №0779 (+ 1 других файлов) |
| cfg | №0061 (+ 2 других файлов) |
| cg | №0862 |
| ch | №0068 (+ 3 других файлов) |
| cha | №0628 (+ 11 других файлов) |
| chain | №0061 (+ 1 других файлов) |
| chance | №0080 (+ 2 других файлов) |
| change | №1091 |
| changed | №0878 (+ 3 других файлов) |
| CHANGELOG | №0815 |
| changes | №0827 (+ 1 других файлов) |
| channel | №0063 |
| CHANNEL_KEY | №0842 |
| channels | №0066 (+ 6 других файлов) |
| char | №0831 (+ 5 других файлов) |
| character | №0059 (+ 5 других файлов) |
| CHARACTER_CREATION_MODE | №0645 |
| CHARACTER_SAVE_SCHEMA_VERSION | №0083 |
| characters | №0831 |
| characterShape | №0648 (+ 1 других файлов) |
| charClassInputs | №0700 |
| charge | №0779 |
| chargeCount | №0078 |
| chargeDirection | №0819 |
| charges | №1201 (+ 2 других файлов) |
| charId | №0831 |
| charIndex | №0831 |
| charInfo | №0832 |
| chariot | №1177 |
| charLevel | №0831 |
| charm | №1177 |
| charmed | №0078 |
| charmedHero | №1177 |
| charmTarget | №1177 |
| charName | №0831 |
| chars | №0832 (+ 1 других файлов) |
| charTotalCopper | №0790 |
| check | №0648 (+ 11 других файлов) |
| checkbox | №0792 (+ 2 других файлов) |
| checked | №0858 (+ 11 других файлов) |
| checkedAttr | №0624 (+ 1 других файлов) |
| checks | №1111 |
| cheek | №0061 |
| chest | №1172 |
| chestUnderwear | №0061 |
| child | №0789 (+ 1 других файлов) |
| childId | №0789 |
| children | №0789 |
| chin | №0061 |
| chk | №0656 (+ 1 других файлов) |
| choice | №0653 (+ 4 других файлов) |
| choiceBlocks | №0700 |
| choices | №0063 (+ 5 других файлов) |
| chosen | №0641 (+ 4 других файлов) |
| chosenD20 | №0647 |
| chosenFeat | №0700 (+ 1 других файлов) |
| chosenMod | №0772 |
| chosenPatron | №0779 |
| chosenResistance | №0078 |
| chosenTrad | №0813 |
| chromium | №1311 (+ 37 других файлов) |
| chunk | №0069 (+ 6 других файлов) |
| chunks | №1306 (+ 1 других файлов) |
| ci | №0061 (+ 1 других файлов) |
| cid | №0078 (+ 1 других файлов) |
| cId | №0832 |
| cl | №0061 (+ 3 других файлов) |
| claim | №0074 |
| clamp | №0080 |
| class | №0700 |
| CLASS | №0078 (+ 4 других файлов) |
| CLASS_DEFS | №0775 |
| CLASS_I18N | №0795 |
| CLASS_KEYS | №0827 |
| CLASS_NAMES | №0648 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0713 |
| CLASS_TOKEN_ART | №0645 |
| classBonus | №0655 |
| classContext | №0655 |
| classData | №0700 (+ 1 других файлов) |
| classDescriptions | №0663 |
| classEntry | №0700 |
| classes | №0786 (+ 5 других файлов) |
| CLASSIC_BACKGROUND_NAMES | №0645 |
| CLASSIC_CLASS_NAMES | №0645 |
| CLASSIC_RACE_IDS | №0645 |
| classicBgs | №1297 |
| classicClasses | №1297 |
| classLevel | №0700 |
| classMatch | №0836 |
| classMeta | №0786 |
| className | №0624 (+ 7 других файлов) |
| classNameBase | №0646 |
| classNameOnly | №0624 (+ 1 других файлов) |
| classReduction | №0655 |
| classSelect | №0624 (+ 1 других файлов) |
| classStr | №0836 |
| clawLen | №0061 |
| clean | №0633 (+ 10 других файлов) |
| cleanName | №0646 |
| cleanStr | №0772 (+ 1 других файлов) |
| cleanTool | №0646 |
| clear | №0062 (+ 1 других файлов) |
| clearContainer | №0789 |
| clearInterval | №1243 (+ 5 других файлов) |
| clearTimeout | №1243 (+ 28 других файлов) |
| cleft | №0058 (+ 1 других файлов) |
| cleric | №1270 |
| click | №1172 |
| CLIENT_KEY | №0810 |
| clipped | №0061 |
| clone | №1116 (+ 5 других файлов) |
| close | №0815 (+ 1 других файлов) |
| closeBtn | №0700 |
| closedHero | №1179 |
| closedPixels | №1317 |
| cloth | №0063 (+ 3 других файлов) |
| clothBuckets | №0061 |
| clothed | №1146 (+ 1 других файлов) |
| clothes | №1120 (+ 2 других файлов) |
| clothFaces | №0061 |
| clothing | №0059 (+ 2 других файлов) |
| cloud | №1149 |
| cloudStatus | №0832 |
| cls | №0786 (+ 7 других файлов) |
| club | №0776 (+ 1 других файлов) |
| clubFeatures | №0779 |
| clubIds | №1206 |
| cm | №0779 (+ 1 других файлов) |
| cmd | №1116 |
| cmn | №1165 |
| cmx | №1165 |
| cn | №0795 (+ 1 других файлов) |
| cName | №0836 |
| co | №0073 |
| code | №0651 (+ 6 других файлов) |
| coinRef | №1178 |
| coins | №0790 |
| col | №0065 (+ 1 других файлов) |
| cold | №0063 |
| colEP | №0790 |
| collar | №0058 (+ 2 других файлов) |
| collarCount | №0058 |
| collisions | №1171 |
| colno | №0771 |
| color | №0061 (+ 4 других файлов) |
| coloredDrink | №1118 |
| coloredPotionMaker | №1118 |
| colorHex | №0868 |
| colorKey | №0832 |
| colors | №0063 (+ 1 других файлов) |
| colorType | №0078 |
| colour | №1143 |
| colourDetail | №1119 |
| colourIdat | №1143 |
| colourRaw | №1143 |
| colPP | №0790 |
| cols | №0061 (+ 1 других файлов) |
| combat | №0666 (+ 2 других файлов) |
| combatant | №0078 (+ 1 других файлов) |
| combatants | №0078 |
| command | №0830 |
| commit | №0641 |
| committed | №1150 |
| commonSaved | №1317 |
| companion | №1179 (+ 1 других файлов) |
| companionId | №1206 |
| compare | №1154 |
| comparing | №0063 |
| compat | №0842 (+ 2 других файлов) |
| compatFs | №1358 |
| compatRequire | №1358 |
| completed | №0797 |
| completedBytes | №0889 |
| component | №1165 |
| componentBytes | №1169 |
| compositions | №1308 |
| comps | №1166 |
| con | №0628 (+ 15 других файлов) |
| conc | №0827 |
| concentration | №0655 |
| cond | №0647 (+ 2 других файлов) |
| condition | №0655 (+ 3 других файлов) |
| CONDITION_ALIASES | №0827 |
| conditionHero | №1198 |
| conditionMods | №0655 |
| conditionNotes | №0772 |
| conditions | №0655 (+ 4 других файлов) |
| CONDITIONS | №0655 (+ 3 других файлов) |
| CONDITIONS_CONFIG | №0083 |
| conds | №0655 |
| conduit | №0698 |
| config | №0074 (+ 5 других файлов) |
| CONFIG | №0653 |
| confirmed | №0078 |
| conflict | №0653 |
| CONFLICT | №0079 |
| conflicts | №0079 (+ 2 других файлов) |
| conflictSet | №0079 |
| conMod | №0624 (+ 4 других файлов) |
| conModFinal | №0624 (+ 1 других файлов) |
| conScore | №0655 |
| consent | №1179 |
| console | №0663 (+ 29 других файлов) |
| constant | №0811 (+ 1 других файлов) |
| consumed | №0672 |
| consumedJinx | №0655 |
| consumer | №1186 |
| container | №0624 (+ 15 других файлов) |
| containerId | №0822 (+ 3 других файлов) |
| containers | №0783 (+ 3 других файлов) |
| content | №0793 (+ 1 других файлов) |
| contentBox | №0700 |
| contentDiv | №0772 |
| contentsWeight | №0789 |
| context | №0655 (+ 12 других файлов) |
| contextBridge | №0887 |
| contexts | №1119 (+ 1 других файлов) |
| contract | №0779 |
| contracts | №1849 |
| control | №0063 (+ 1 других файлов) |
| controller | №0653 (+ 2 других файлов) |
| controls | №0063 (+ 1 других файлов) |
| conVal | №0700 |
| converted | №0081 (+ 1 других файлов) |
| cooldown | №1115 |
| cooledAttack | №1118 |
| cooling | №1118 |
| copied | №1849 |
| COPPER | №0799 |
| copperPerElectrum | №0790 |
| copperPerGold | №0790 |
| copperPerPlat | №0790 |
| copperPerSilver | №0790 |
| copy | №0060 (+ 8 других файлов) |
| core | №0061 (+ 8 других файлов) |
| CORE | №0648 |
| CORE_CLASSES | №0660 |
| coreOwned | №0648 |
| corePositions | №0061 |
| corner | №1143 |
| corners | №0061 (+ 2 других файлов) |
| corona | №0058 |
| corpse | №0809 (+ 2 других файлов) |
| corrupt | №1131 |
| cost | №0648 (+ 14 других файлов) |
| costDie | №0779 |
| costInp | №0791 |
| count | №0061 (+ 43 других файлов) |
| counter | №0793 (+ 6 других файлов) |
| counterDamage | №0779 (+ 1 других файлов) |
| counterHero | №1198 |
| counterLeft | №0655 |
| counterReduction | №0655 (+ 1 других файлов) |
| counterState | №0655 |
| countInput | №0793 |
| counts | №0058 (+ 3 других файлов) |
| countToRead | №0069 |
| coverBonus | №0655 (+ 1 других файлов) |
| covered | №0062 (+ 1 других файлов) |
| coveredCount | №1347 |
| cp | №0061 (+ 17 других файлов) |
| cPerS | №0790 |
| cpInput | №0790 |
| cpVal | №0790 |
| cr | №0628 (+ 15 других файлов) |
| CR | №0809 |
| CR_BY_MONSTER | №0808 |
| CR_RANK | №0808 |
| craft | №0628 (+ 21 других файлов) |
| craftBase | №0627 |
| craftBonus | №0665 (+ 1 других файлов) |
| crafted | №0664 |
| CRAFTING_BACKGROUND_PROFILES | №0672 |
| CRAFTING_CLASS_PROFILES | №0672 |
| CRAFTING_FEAT_PROFILES | №0672 |
| CRAFTING_RACE_PROFILES | №0672 |
| craftingProfile | №0672 |
| craftModifier | №0672 |
| craftNotes | №0672 |
| createContainer | №0789 |
| created | №0818 |
| creationScreen | №0624 (+ 1 других файлов) |
| creatures | №0686 |
| CREATURES | №0774 |
| crest | №0061 |
| crit | №1198 |
| critical | №0655 (+ 3 других файлов) |
| criticalRange | №0655 |
| critNote | №0772 (+ 1 других файлов) |
| critTarget | №1198 |
| cross | №0062 (+ 1 других файлов) |
| crowd | №0655 (+ 1 других файлов) |
| crowdCondition | №0779 |
| crowdDC | №0779 |
| crowdHero | №1198 |
| crowdResults | №0779 |
| crowdSave | №0655 |
| crowdTarget | №1198 |
| crowdTargets | №0779 |
| crown | №0061 |
| crownDiagnostics | №1321 |
| crownOff | №1321 |
| crypto | №0889 (+ 54 других файлов) |
| cs | №0061 (+ 11 других файлов) |
| csel | №0806 |
| ct | №0061 |
| ctx | №0072 (+ 136 других файлов) |
| ctx2d | №0063 |
| cuff | №0062 |
| cum | №0061 |
| cup | №0062 (+ 1 других файлов) |
| cupChoice | №0819 |
| cupNumber | №1191 |
| cupPC | №1177 |
| cupPhone | №1177 |
| cupProfiles | №1177 |
| cupResult | №0819 |
| cupRoster | №1177 |
| cups | №0062 |
| cupsBack | №1177 |
| cupServer | №1177 |
| cupsPending | №0819 |
| cur | №0080 (+ 4 других файлов) |
| curHp | №0779 |
| curl | №0061 |
| current | №0058 (+ 13 других файлов) |
| currentActiveId | №0831 |
| currentChar | №0083 |
| currentCharacterId | №0083 |
| currentClass | №0700 |
| currentColor | №0868 |
| currentCurrHp | №0824 |
| currentDim | №0868 |
| currentExp | №0780 |
| currentHero | №0832 (+ 1 других файлов) |
| currentHound | №0779 |
| currentHp | №0078 (+ 1 других файлов) |
| currentHP | №0869 |
| currentInventoryCategory | №0793 |
| currentLevelExpReq | №0780 |
| currentLevelInClass | №0713 |
| currentLvl | №0780 (+ 1 других файлов) |
| currentMax | №0700 |
| currentModalColor | №0868 |
| currentModalOpacity | №0868 |
| currentOpacity | №0868 |
| currentPact | №0798 |
| currentProfsIds | №0822 |
| currentProgress | №0843 |
| currentRollMode | №0772 |
| currentRound | №0655 |
| currentSpent | №0624 (+ 1 других файлов) |
| currentStep | №0082 |
| currentTime | №0797 |
| currentTrack | №0082 |
| currentTrackIndex | №0082 |
| currentVal | №0624 (+ 3 других файлов) |
| currentVersion | №0832 (+ 1 других файлов) |
| currentVolume | №0082 |
| currentWallpaperIndex | №0868 |
| currId | №0832 |
| curse | №0779 |
| curseActor | №0655 |
| curseEffect | №0779 |
| curseId | №0779 |
| curseKnown | №0688 |
| curseMax | №0779 |
| curseNames | №0641 |
| curses | №0077 (+ 1 других файлов) |
| curseSaveMods | №0655 |
| curSides | №0647 |
| curStat | №0647 |
| curve | №0061 |
| custom | №0062 (+ 1 других файлов) |
| customBtn | №0793 (+ 1 других файлов) |
| customElem | №0796 |
| customGather | №0825 |
| customRaces | №0824 |
| customSkinCharacter | №1120 |
| customTestSource | №0842 |
| cut | №0061 (+ 1 других файлов) |
| cutFaces | №0058 |
| cv | №0061 (+ 2 других файлов) |
| cw | №1143 |
| cwd | №1116 |
| cx | №0061 (+ 7 других файлов) |
| cy | №0058 (+ 7 других файлов) |
| cycles | №0665 |
| cz | №0061 (+ 5 других файлов) |
| d | №0059 (+ 84 других файлов) |
| D | №0058 (+ 23 других файлов) |
| d00 | №1165 (+ 2 других файлов) |
| d01 | №1165 (+ 2 других файлов) |
| d1 | №1165 (+ 3 других файлов) |
| d11 | №1165 (+ 2 других файлов) |
| d2 | №1165 (+ 3 других файлов) |
| d20 | №0655 (+ 4 других файлов) |
| d20_1 | №0647 |
| d20_2 | №0647 |
| d20Button | №0648 |
| d20Details | №0647 |
| d20Result | №0772 (+ 1 других файлов) |
| d21 | №1165 (+ 2 других файлов) |
| d3 | №1165 (+ 3 других файлов) |
| d4 | №1165 (+ 3 других файлов) |
| d5 | №1165 (+ 3 других файлов) |
| d6 | №1165 (+ 3 других файлов) |
| da | №1143 |
| damage | №0074 (+ 21 других файлов) |
| DAMAGE_TYPES | №0655 |
| damageBeforeWard | №0655 |
| damageButton | №0648 |
| damaged | №0664 |
| damageOpts | №0655 |
| damageParts | №0655 |
| damageResult | №0811 |
| damageStr | №0791 |
| damageString | №0772 (+ 1 других файлов) |
| damageTaken | №0655 |
| dark | №0061 (+ 2 других файлов) |
| data | №0063 (+ 40 других файлов) |
| dataDir | №1308 (+ 1 других файлов) |
| dataStr | №0832 |
| DataView | №1121 (+ 21 других файлов) |
| Date | №0663 (+ 66 других файлов) |
| dateStr | №0832 |
| day | №0799 |
| db | №0713 (+ 4 других файлов) |
| dbg | №1242 (+ 1 других файлов) |
| dbItem | №0792 (+ 1 других файлов) |
| dbNameLower | №0646 |
| dc | №0074 (+ 26 других файлов) |
| dcElem | №0654 (+ 1 других файлов) |
| dcValue | №0816 |
| dd | №0073 (+ 1 других файлов) |
| deadAlly | №1118 |
| dealUses | №0779 |
| deathSaveFailures | №0655 |
| deb | №0078 |
| debuffs | №0655 (+ 1 других файлов) |
| debug | №1091 |
| debugBtn | №0771 |
| debugContainer | №0832 (+ 1 других файлов) |
| debugToggle | №0832 |
| debugWrapper | №0832 |
| deception | №0078 |
| deck | №0819 (+ 5 других файлов) |
| DECLARATIVE_FEATURES | №0648 |
| declared | №1179 |
| decodeURIComponent | №1256 (+ 1 других файлов) |
| deduction | №0641 |
| def | №0066 (+ 6 других файлов) |
| DEFAULT | №0071 |
| DEFAULT_CAPACITY | №0789 |
| DEFAULT_CHANNEL | №0842 |
| DEFAULT_COLS | №0626 |
| DEFAULT_ENABLED | №0666 |
| DEFAULT_ICON | №0832 (+ 2 других файлов) |
| DEFAULT_MANIFEST_URL | №0842 |
| DEFAULT_RACES | №0824 |
| DEFAULT_ROWS | №0626 |
| defaultIcon | №0888 |
| defaultMode | №0791 |
| defaultModel | №0806 |
| defaults | №0066 (+ 2 других файлов) |
| defaultType | №0791 |
| defaultValue | №0791 |
| defender | №1198 (+ 1 других файлов) |
| defenderClasses | №0655 |
| defenses | №0791 (+ 1 других файлов) |
| defensesContainer | №0791 |
| defer | №0811 |
| deflect | №0655 |
| deflected | №1117 |
| defs | №0066 (+ 4 других файлов) |
| DEFS | №0818 |
| delay | №0653 (+ 1 других файлов) |
| delayedBomb | №1118 |
| delBtn | №0793 (+ 1 других файлов) |
| deleteBtn | №0812 |
| deleted | №0653 |
| delta | №0058 (+ 18 других файлов) |
| demolitionOwner | №1118 |
| demolitionResult | №1118 |
| demolitionTarget | №0078 (+ 1 других файлов) |
| den | №0061 (+ 7 других файлов) |
| denied | №1193 |
| denLabel | №0063 |
| denOpacity | №0062 |
| dense | №1328 |
| denValues | №0062 |
| dependency | №1849 |
| depth | №0061 (+ 4 других файлов) |
| deputy | №1111 |
| derived | №1849 |
| derivedAssets | №0071 |
| desc | №0670 (+ 7 других файлов) |
| descBox | №0624 (+ 2 других файлов) |
| descElem | №0796 |
| descInp | №0791 |
| descInput | №0824 |
| description | №0648 (+ 2 других файлов) |
| descriptor | №1121 (+ 1 других файлов) |
| descText | №0624 (+ 1 других файлов) |
| descVal | №0824 |
| desired | №0058 (+ 2 других файлов) |
| DesktopWebUpdater | №0886 (+ 2 других файлов) |
| dest | №0075 (+ 4 других файлов) |
| destination | №0818 (+ 2 других файлов) |
| destinations | №0818 |
| detail | №0850 (+ 3 других файлов) |
| details | №0063 (+ 4 других файлов) |
| detailsElem | №0796 |
| detailsHtml | №0793 |
| detailText | №0772 (+ 1 других файлов) |
| developmentGate | №1115 |
| device | №1177 |
| devModal | №0832 |
| dex | №0628 (+ 14 других файлов) |
| dexHero | №1198 (+ 1 других файлов) |
| dexInput | №0824 |
| dexMod | №0624 (+ 6 других файлов) |
| dexSave | №1198 |
| dexScore | №0655 (+ 1 других файлов) |
| dexStats | №0655 |
| df | №0779 |
| di | №0655 (+ 1 других файлов) |
| diag | №1131 (+ 9 других файлов) |
| diagnostics | №1308 |
| diagonal | №0820 (+ 1 других файлов) |
| diagonals | №0820 |
| dialectAliases | №0828 |
| DIALECTS | №0828 |
| dice | №0779 (+ 9 других файлов) |
| DICE_ICONS | №0832 (+ 2 других файлов) |
| diceCount | №0772 (+ 3 других файлов) |
| diceCountInp | №0791 |
| diceDir | №0888 |
| diceFiles | №0888 |
| diceMatch | №0772 |
| diceMax | №1144 |
| diceMin | №1144 |
| diceOptions | №0647 |
| diceRegex | №0836 |
| dices | №0791 |
| diceSides | №0772 (+ 1 других файлов) |
| diceSpent | №0078 |
| diceTab | №0772 |
| diceTypes | №0647 |
| die | №0081 (+ 7 других файлов) |
| DIE | №0641 (+ 1 других файлов) |
| dieSides | №0811 |
| diff | №0700 (+ 1 других файлов) |
| dig | №1199 |
| digDeep | №0655 |
| digDeepTypes | №0655 |
| digit | №0061 |
| digits | №0061 |
| dimLayer | №0868 |
| dir | №0061 (+ 10 других файлов) |
| dire | №0779 |
| direct | №0065 |
| directCompatible | №1169 |
| direction | №0818 (+ 2 других файлов) |
| directions | №0818 |
| direMax | №0779 |
| DIRS | №0820 |
| dirty | №0779 (+ 1 других файлов) |
| dirtyApplied | №0779 |
| dirtyDC | №0779 |
| dirtyHero | №1198 |
| dirtyResource | №0779 |
| dirtySave | №0779 |
| dirtyTarget | №1198 |
| dis | №0655 (+ 2 других файлов) |
| disable | №0792 |
| disabled | №0819 |
| disBtn | №0793 |
| disc | №0061 (+ 2 других файлов) |
| discharge | №1117 |
| dischargeTarget | №1117 |
| disciplineAliases | №0829 |
| disciplineByPower | №0779 |
| disciplines | №0829 |
| discover | №0079 |
| discoveries | №0078 |
| discovery | №0078 |
| discoveryLevel | №0078 |
| discoveryName | №0078 |
| discoveryRecipes | №0078 |
| disguise | №1197 |
| displacement | №1162 |
| display | №0700 (+ 1 других файлов) |
| displayedAC | №0827 |
| displayName | №0624 (+ 3 других файлов) |
| displaySpeed | №0783 |
| displayStyle | №0836 |
| dist | №0061 (+ 5 других файлов) |
| distal | №0061 |
| distance | №0061 (+ 4 других файлов) |
| distanceFt | №0818 (+ 1 других файлов) |
| distanceRolled | №0818 |
| distances | №1165 (+ 2 других файлов) |
| div | №0700 |
| dl | №0061 (+ 1 других файлов) |
| dm | №0811 (+ 1 других файлов) |
| dmg | №0078 (+ 7 других файлов) |
| dmgBonus | №0647 |
| dn | №0061 |
| DND_CLASSES_LIST | №0624 (+ 1 других файлов) |
| DND_DAMAGE_TYPES | №0791 |
| DND_SKILLS_LIST | №0791 |
| DND_WEAPON_CATEGORIES | №0791 |
| DND_WEAPON_PROPERTIES | №0791 |
| dndBackgrounds | №0624 |
| dndModal | №0700 |
| doc | №1242 (+ 2 других файлов) |
| document | №1119 |
| dom | №1172 |
| dome | №0061 |
| domReady | №1264 (+ 1 других файлов) |
| done | №0842 (+ 3 других файлов) |
| donor | №0813 |
| dot | №0058 |
| down | №0075 |
| download | №1322 |
| downloadAnchor | №0832 |
| downloads | №1153 |
| dr | №0779 (+ 2 других файлов) |
| draft | №0818 (+ 2 других файлов) |
| DRAFT | №0060 |
| drag | №0863 |
| dragon | №1268 |
| dragonGraft | №0078 |
| draw | №0783 (+ 4 других файлов) |
| drawer | №0793 |
| drawerContainer | №0772 |
| drawerContent | №0772 |
| drawWindow | №0773 |
| dreadAttack | №1198 |
| dreadHandHero | №1198 |
| dreadHero | №1198 |
| dreadTarget | №1198 |
| dress | №1129 |
| drop | №0061 |
| dry | №1152 |
| ds | №0655 (+ 1 других файлов) |
| dst | №0069 (+ 1 других файлов) |
| dt | №0061 (+ 2 других файлов) |
| du | №0058 |
| duplicates | №1352 |
| duplicityMiss | №0655 |
| duplicityTarget | №0655 |
| dupRoll | №0655 |
| durability | №0799 (+ 1 других файлов) |
| duration | №0869 |
| durationMs | №0082 |
| durationSeconds | №0869 |
| dv | №0058 (+ 3 других файлов) |
| dwarf | №0066 |
| dwarfDesc | №0663 |
| dx | №0058 (+ 13 других файлов) |
| dy | №0058 (+ 12 других файлов) |
| dynamicContainer | №0793 |
| dynamoAttack | №1118 |
| dz | №0058 (+ 5 других файлов) |
| dzdt | №0058 |
| e | №0058 (+ 150 других файлов) |
| E | №0809 |
| e0 | №0063 (+ 1 других файлов) |
| each | №0648 |
| ear | №0061 |
| earOuter | №0061 |
| ears | №0061 (+ 1 других файлов) |
| earVertices | №1132 |
| eb | №0061 (+ 1 других файлов) |
| ec | №0779 |
| eco | №1228 |
| econ | №0665 (+ 1 других файлов) |
| ECON | №0664 |
| edge | №0061 |
| edges | №0061 |
| editor | №0887 (+ 1 других файлов) |
| editorWeaponPresets | №0063 |
| ef | №0078 (+ 1 других файлов) |
| eff | №0779 |
| effect | №0078 (+ 3 других файлов) |
| effectApplies | №0655 |
| effectiveD20 | №0655 |
| effectiveDiceCount | №0772 |
| effectiveMode | №0772 |
| effectMap | №0078 |
| effects | №0674 (+ 2 других файлов) |
| EFFECTS | №0080 |
| effectSerial | №0641 |
| eid | №0809 (+ 1 других файлов) |
| eInput | №0790 |
| el | №0070 (+ 28 других файлов) |
| elapsed | №0878 |
| elBar | №0780 |
| elCurExp | №0780 |
| elCurLvl | №0780 |
| elDesc | №0824 |
| electromagneticShield | №0655 |
| elem | №1268 |
| element | №0779 |
| elementId | №0793 |
| elements | №1119 (+ 3 других файлов) |
| elementsToHide | №0868 |
| elId | №0792 |
| eligible | №0821 |
| elInputCur | №0780 |
| ellipse | №0058 |
| elName | №0824 |
| elNextExp | №0780 |
| elSpeed | №0824 |
| email | №0651 (+ 1 других файлов) |
| embedded | №0821 |
| emojis | №0772 |
| empty | №0061 |
| emptyMsg | №0791 |
| enabled | №0059 (+ 3 других файлов) |
| encoded | №0818 |
| encodeURIComponent | №1256 (+ 1 других файлов) |
| encounter | №0805 |
| end | №0061 (+ 4 других файлов) |
| ended | №0818 |
| ends | №0074 |
| endY | №0062 |
| enemies | №0818 |
| enemy | №0872 (+ 4 других файлов) |
| enemyHP | №1208 |
| energyDamage | №0078 |
| energyResult | №0078 |
| energySeamTarget | №1117 |
| engine | №1255 |
| englishName | №0778 |
| engName | №0700 (+ 1 других файлов) |
| enhancedAttack | №1198 |
| enhancedTarget | №1198 |
| entity | №0078 (+ 2 других файлов) |
| entries | №0653 (+ 8 других файлов) |
| entry | №0063 (+ 18 других файлов) |
| entryId | №0796 |
| env | №1173 (+ 1 других файлов) |
| envelope | №0058 |
| ep | №0779 (+ 2 других файлов) |
| epInput | №0790 |
| epoch | №0653 |
| eprof | №0811 |
| eps | №0058 (+ 2 других файлов) |
| epsilon | №0062 |
| epVal | №0790 |
| equipCheckbox | №0793 |
| equipLabel | №0793 |
| equipment | №0066 |
| equippedWeapon | №0772 |
| er | №0061 (+ 1 других файлов) |
| err | №0063 (+ 4 других файлов) |
| error | №0063 (+ 1 других файлов) |
| errorCount | №0771 |
| errors | №0661 (+ 40 других файлов) |
| es | №0080 |
| esc | №0070 (+ 1 других файлов) |
| escape | №1256 (+ 2 других файлов) |
| ev | №0783 (+ 6 других файлов) |
| evasion | №0655 |
| event | №0074 (+ 15 других файлов) |
| EVENT_LIMIT | №0810 |
| eventAttacker | №0655 |
| eventBox | №0819 |
| eventChainHeadHash | №0810 |
| eventLabel | №0819 |
| eventLogBaseHash | №0810 |
| eventLogBaseSeq | №0810 |
| eventPC | №1177 |
| eventPhone | №1177 |
| eventRoster | №1177 |
| events | №0810 (+ 6 других файлов) |
| eventServer | №1177 |
| eventText | №0819 |
| evo | №1268 |
| evt | №1119 |
| ex | №0061 (+ 1 других файлов) |
| exact | №0661 (+ 2 других файлов) |
| excess | №0779 |
| executionScene | №0818 |
| exhaustion | №0825 |
| exhaustionNow | №0655 |
| exhaustionRestKey | №0647 (+ 1 других файлов) |
| exhaustionText | №0825 |
| existing | №0074 (+ 9 других файлов) |
| existingClass | №0786 |
| existingClassEntry | №0700 |
| existingOverlay | №0772 |
| exists | №0646 (+ 1 других файлов) |
| existsL | №0646 |
| exp | №0780 |
| expand | №0062 |
| expanded | №0063 |
| expBasedLevel | №0780 |
| expected | №0078 (+ 4 других файлов) |
| expectedRevision | №0821 |
| expert | №1192 |
| expiration | №1207 |
| expired | №1198 |
| expires | №0833 |
| explicit | №1120 |
| exploitContract | №0779 |
| exploits | №0872 |
| explored | №0074 |
| exposureActor | №0655 |
| expr | №0648 (+ 7 других файлов) |
| expression | №0779 |
| ext | №0073 (+ 4 других файлов) |
| external | №0059 (+ 1 других файлов) |
| externalCalls | №1158 |
| externalJson | №1158 |
| externalPanels | №0772 |
| extra | №0061 (+ 31 других файлов) |
| EXTRA | №0643 |
| EXTRA_RULES | №0079 |
| EXTRA_TRIGGER | №0080 |
| EXTRA_TYPES | №0645 |
| extraACBonus | №0793 |
| extraAtk | №0811 |
| extraClass | №0700 |
| extraClasses | №1297 |
| extraDamages | №0791 |
| extraData | №0793 (+ 1 других файлов) |
| extraDmg | №0811 |
| extraDmgContainer | №0791 |
| extraLine | №0745 |
| extraLocked | №0700 |
| extraName | №0700 (+ 1 других файлов) |
| extrapolated | №1308 |
| extras | №0063 (+ 3 других файлов) |
| extraType | №0700 |
| exts | №0888 |
| ey | №0061 |
| eye | №0061 (+ 1 других файлов) |
| eyeBtn | №0868 |
| eyeIsland | №0061 |
| eyePart | №0061 |
| eyes | №0061 (+ 2 других файлов) |
| eyeSave | №1321 |
| eyesDiag | №1321 |
| eyesOff | №1321 |
| eyeWeight | №0061 |
| eyeX | №0061 |
| eyeY | №0061 |
| eyeZ | №0061 |
| ez | №0061 |
| f | №0059 (+ 116 других файлов) |
| F | №1267 (+ 4 других файлов) |
| fa | №0779 |
| face | №0058 (+ 2 других файлов) |
| faceParts | №0063 |
| faces | №0058 (+ 3 других файлов) |
| facing | №0061 |
| FACTIONS | №0632 |
| factor | №0058 (+ 4 других файлов) |
| factory | №0827 |
| fadeInterval | №0082 |
| fadeTimer | №0797 |
| fail | №1214 (+ 1 других файлов) |
| failed | №1116 (+ 2 других файлов) |
| failedSave | №0833 |
| fall | №1263 |
| fallback | №0061 (+ 7 других файлов) |
| FALLBACK_MANIFEST_URL | №0842 |
| fallbackName | №0713 |
| fallbackText | №0772 |
| false | №0779 (+ 6 других файлов) |
| fam | №0629 (+ 10 других файлов) |
| familiarForms | №0779 |
| FAMILIES | №0628 |
| family | №0628 (+ 1 других файлов) |
| FAMILY_BY_CREATURE | №0774 |
| FAMILY_DEFS | №0774 |
| FAMILY_NAMES | №0629 (+ 11 других файлов) |
| familyId | №0774 |
| familyOpts | №0774 |
| fangs | №0061 |
| fangsOff | №1321 |
| fans | №1141 |
| fantasy | №1319 |
| fantasySaved | №1319 |
| fApplied | №0779 |
| faq | №0815 |
| FAQ | №0815 |
| far | №0073 (+ 1 других файлов) |
| fat | №0061 |
| fatalHit | №1198 |
| fateMax | №0648 |
| fc | №0073 |
| fd | №0078 |
| fdc | №0779 |
| fdmg | №0779 |
| fearSave | №0779 |
| feat | №0648 (+ 2 других файлов) |
| FEAT_STAT_LABELS | №0745 |
| FEAT_VALID_STATS | №0745 |
| featActionHtml | №0745 |
| featDesc | №0745 |
| featherHead | №0063 |
| featherKind | №0063 |
| featherPart | №0063 |
| featName | №0745 |
| featObj | №0700 (+ 1 других файлов) |
| feats | №0625 (+ 2 других файлов) |
| featsOptions | №0700 |
| feature | №0078 (+ 3 других файлов) |
| FEATURE_DEFS | №0648 |
| FEATURE_TARGET_RULES | №0811 |
| featureDescStr | №0624 (+ 1 других файлов) |
| featureHtml | №0624 (+ 2 других файлов) |
| featureIds | №0661 (+ 1 других файлов) |
| featureIndex | №0661 |
| featureLevel | №0661 |
| featureList | №0713 |
| featureLists | №0648 |
| featureMeta | №0648 |
| featureMod | №0655 |
| featureMode | №0655 |
| features | №0078 (+ 9 других файлов) |
| featuresHtml | №0700 |
| featuresList | №0700 |
| featureStr | №0624 (+ 1 других файлов) |
| fecund | №0779 |
| feet | №0061 (+ 3 других файлов) |
| female | №0062 (+ 5 других файлов) |
| femalePositions | №1121 |
| fer | №0656 |
| ferocity | №1206 |
| fetched | №0842 |
| ff | №0073 (+ 1 других файлов) |
| fgm | №1270 |
| fi | №0061 (+ 3 других файлов) |
| fid | №0648 (+ 4 других файлов) |
| field | №0061 (+ 9 других файлов) |
| fieldLengths | №1167 |
| fields | №1186 (+ 3 других файлов) |
| fiend | №1204 |
| fight | №0818 |
| fighter | №1267 (+ 1 других файлов) |
| fighters | №0819 |
| fightingPack | №0655 |
| fightingResource | №0655 |
| fightingResult | №0655 |
| fightingStyleEffects | №0779 |
| file | №0832 (+ 56 других файлов) |
| fileNo | №1352 |
| filePath | №0868 |
| files | №0669 (+ 11 других файлов) |
| fileUrl | №0889 |
| filter | №0081 (+ 3 других файлов) |
| filteredItems | №0836 |
| filters | №0645 (+ 1 других файлов) |
| filterText | №0745 |
| final | №0779 (+ 1 других файлов) |
| finalAC | №0793 |
| finalAttackTotal | №0772 |
| finalCount | №0672 |
| finalData | №0791 |
| finalName | №0791 |
| finalPropsString | №0791 |
| finalSkillModifier | №0772 |
| finalStats | №0624 (+ 1 других файлов) |
| finalTotal | №0772 (+ 1 других файлов) |
| fingerless | №0061 |
| fins | №0061 |
| finsOff | №1321 |
| fire | №0843 |
| fireFront | №0843 |
| fireRoll | №0078 |
| first | №0058 (+ 9 других файлов) |
| firstFace | №1169 |
| firstVertex | №1169 |
| fit | №0063 (+ 5 других файлов) |
| fitted | №0061 (+ 2 других файлов) |
| fixture | №1138 |
| flags | №0656 |
| flare | №0062 |
| flat | №1141 |
| fleeing | №1177 |
| fleePhone | №1177 |
| flexible | №1118 |
| flexibleInstall | №1118 |
| Float32Array | №1119 (+ 23 других файлов) |
| Float64Array | №1124 (+ 2 других файлов) |
| floor | №0061 (+ 3 других файлов) |
| FLOOR | №0072 |
| floorAttack | №1198 |
| floorHero | №1198 |
| floorHpBefore | №1198 |
| floorMod | №1199 |
| floors | №0076 |
| floorTarget | №1198 (+ 1 других файлов) |
| floorTypes | №0076 |
| flush | №1119 |
| flyer | №1198 |
| fm | №0655 (+ 1 других файлов) |
| fm2 | №1270 |
| fn | №0058 (+ 30 других файлов) |
| focus | №0058 (+ 1 других файлов) |
| focusEl | №0815 |
| focusSources | №0836 |
| foe | №1181 (+ 1 других файлов) |
| fog | №1173 |
| fogShade | №0073 |
| fold | №0061 |
| folder | №1306 |
| folderId | №0812 |
| fontKey | №0832 |
| fontObj | №0832 |
| fontSelect | №0832 |
| fontStyleTag | №0832 |
| foot | №0061 (+ 1 других файлов) |
| footH | №0061 |
| force | №0799 (+ 1 других файлов) |
| forceCrit1 | №0772 |
| forced | №0818 |
| forceSlot | №0844 |
| forearmHigh | №0061 |
| forearmLow | №0061 |
| foreign | №1207 |
| fork | №0061 |
| form | №0061 (+ 5 других файлов) |
| formattedText | №0700 |
| formula | №0641 (+ 3 других файлов) |
| formulaDamage | №0078 |
| formulae | №0078 |
| formulaEffects | №0078 |
| formulaHero | №1118 |
| formulaIds | №0779 |
| formulas | №0641 (+ 1 других файлов) |
| fortifying | №0779 |
| fortune | №0827 |
| forward | №0061 (+ 1 других файлов) |
| found | №0062 (+ 16 других файлов) |
| foundIdx | №0868 |
| foundItemData | №0792 |
| foundProf | №0822 |
| foundWeapon | №0823 (+ 1 других файлов) |
| fov | №0073 |
| fr | №0686 (+ 1 других файлов) |
| fR1 | №0772 (+ 1 других файлов) |
| fR2 | №0772 (+ 1 других файлов) |
| fragHighp | №0073 |
| frame | №0061 (+ 25 других файлов) |
| frameColorSelect | №0832 |
| frameKey | №0832 |
| frames | №1136 |
| frameStyleSelect | №0832 |
| framework | №1190 |
| free | №0061 (+ 2 других файлов) |
| freeGather | №0878 |
| fresh | №0061 (+ 3 других файлов) |
| friend | №1177 (+ 2 других файлов) |
| frill | №0061 |
| from | №0632 (+ 4 других файлов) |
| front | №0059 (+ 4 других файлов) |
| frontal | №0061 |
| frontCount | №0061 |
| frontPlate | №0061 |
| frontTop | №0062 |
| fs | №0063 (+ 228 других файлов) |
| fsave | №0779 |
| fsp | №0886 (+ 1 других файлов) |
| ft | №0779 |
| full | №1153 (+ 1 других файлов) |
| FULL | №0798 |
| FULL_CASTER_SLOTS_TABLE | №0836 |
| FULL_CASTERS | №0827 |
| FULL_SLOTS | №0827 |
| fullCoat | №0063 |
| fullData | №0745 |
| fullPath | №0886 |
| fur | №0063 (+ 1 других файлов) |
| furEnabled | №0063 |
| furryAccessory | №0063 |
| furryLimb | №0063 |
| furrySkull | №0063 |
| furSelect | №0063 |
| fuseMinutes | №0078 |
| fuseRounds | №0078 |
| future | №0063 (+ 1 других файлов) |
| fv | №0779 |
| fx | №0061 (+ 2 других файлов) |
| fy | №0061 (+ 1 других файлов) |
| g | №0059 (+ 151 других файлов) |
| G | №0081 |
| g1 | №0072 |
| gain | №0669 (+ 4 других файлов) |
| gained | №0656 (+ 1 других файлов) |
| gainedHp | №0786 |
| gameplay | №1255 |
| gameTool | №0646 |
| gap | №0062 |
| garment | №0062 |
| garments | №0061 |
| GATE_TOWNS | №0632 |
| gather | №0825 |
| GATHERING_ACTIONS | №0825 |
| gb | №1165 (+ 4 других файлов) |
| gdiag | №1166 (+ 1 других файлов) |
| ge | №0779 |
| gem | №0818 |
| gender | №0062 (+ 7 других файлов) |
| generated | №1228 (+ 1 других файлов) |
| generatedHarvest | №1228 |
| generatedPath | №1849 |
| generation | №0653 |
| GENERIC_SPECIALTIES | №0670 |
| geo | №0059 (+ 24 других файлов) |
| geometryKey | №1128 |
| geoTarget | №0811 |
| gesture | №0063 (+ 1 других файлов) |
| getData | №0713 |
| getStat | №0786 |
| getSub | №0713 |
| ghostBounds | №0063 |
| ghostForbiddenSlots | №0063 |
| ghostShellTarget | №0646 |
| ghostWeapon | №0063 |
| gi | №0655 |
| gills | №0061 |
| git | №1300 (+ 3 других файлов) |
| gl | №0061 (+ 23 других файлов) |
| glb | №1165 (+ 7 других файлов) |
| glbPath | №1157 (+ 6 других файлов) |
| glbVertices | №1169 |
| glen | №0061 |
| global | №0832 (+ 84 других файлов) |
| globalAudio | №0082 |
| glove | №0061 |
| gn | №0779 |
| gname | №0779 |
| gnome | №0066 |
| gob | №1230 |
| gold | №0063 |
| goldNeeded | №0665 |
| goldOwner | №0819 |
| goldRef | №0819 |
| golemCraft | №1118 |
| golemEntities | №1118 |
| golemEntity | №1118 |
| golemRestore | №1118 |
| good | №0641 (+ 1 других файлов) |
| got | №0079 (+ 2 других файлов) |
| gp | №0790 (+ 7 других файлов) |
| gPerE | №0790 |
| gpInput | №0790 |
| gpVal | №0790 |
| gradle | №0888 |
| graftAC | №0655 |
| graftArmorAttack | №1117 |
| graftArmorTarget | №1117 |
| graftCriticalAttack | №1117 |
| graftCriticalTarget | №1117 |
| graftDef | №0078 |
| graftInstalled | №1118 |
| graftMissingDonor | №1118 |
| graftName | №0078 |
| graftRemoved | №1118 |
| graftResistant | №0655 |
| grafts | №0078 (+ 1 других файлов) |
| grant | №0673 |
| granted | №0078 (+ 1 других файлов) |
| grantMaterial | №0668 |
| gray | №0063 |
| grid | №0832 (+ 7 других файлов) |
| grip | №0061 (+ 1 других файлов) |
| groom | №0061 |
| groove | №0058 |
| ground | №0061 (+ 1 других файлов) |
| group | №0058 (+ 8 других файлов) |
| grouped | №0648 |
| groupedFeats | №0700 |
| groupFeats | №0700 |
| groupKey | №0745 |
| groupKeys | №0822 |
| groupName | №0822 |
| groupOrder | №0745 |
| groupRolls | №0836 |
| groups | №0061 (+ 4 других файлов) |
| groupsMap | №0822 |
| groupTitle | №0791 |
| growth | №1198 |
| growthAttack | №1198 |
| growthTarget | №1198 |
| gs | №1166 |
| guard | №0783 (+ 2 других файлов) |
| guide | №1231 (+ 3 других файлов) |
| guildDesc | №0663 |
| gw | №1357 |
| h | №0059 (+ 127 других файлов) |
| H | №0059 (+ 10 других файлов) |
| h2 | №1267 |
| h3 | №1190 (+ 1 других файлов) |
| h4 | №1267 |
| hab | №0628 |
| habitat | №0063 (+ 1 других файлов) |
| habitats | №0063 |
| hadSpeedZero | №0783 |
| hair | №0059 (+ 2 других файлов) |
| hairLength | №0061 |
| hairProfiles | №0061 |
| hairs | №0061 (+ 1 других файлов) |
| half | №0061 (+ 2 других файлов) |
| HALF_CASTERS | №0827 |
| hand | №0061 (+ 1 других файлов) |
| handle | №0889 |
| handleAdd | №0791 |
| handleAddClick | №0791 |
| handleArmorCatSelect | №0791 |
| handleCatSelect | №0791 |
| handleDel | №0791 |
| handleDiceSelect | №0791 |
| handlePropToggle | №0791 |
| handler | №0842 (+ 1 других файлов) |
| handlers | №0648 (+ 1 других файлов) |
| HANDLERS | №0818 |
| handleTabClick | №0793 |
| handMax | №1131 |
| handoffCalls | №1290 |
| hands | №0061 |
| harness | №1334 |
| harvest | №1218 (+ 1 других файлов) |
| hasActiveModal | №0840 |
| hasAoe | №0811 |
| hasAutoStarted | №0082 |
| hasDex | №0779 |
| hasDice | №0836 |
| hasFirearmsAll | №0823 |
| hasGraft | №0078 |
| hash | №0842 (+ 4 других файлов) |
| hashes | №1138 (+ 6 других файлов) |
| hasMagic | №0836 |
| hasMartialAll | №0823 |
| hasProf | №0873 |
| hasProficiency | №0793 |
| hasSimpleAll | №0823 |
| hasSpecificProf | №0823 |
| hasTool | №0668 (+ 2 других файлов) |
| hasUV | №0063 |
| hat | №0061 (+ 4 других файлов) |
| have | №0665 (+ 1 других файлов) |
| hay | №0793 (+ 1 других файлов) |
| haymaker | №1198 |
| hayTarget | №1198 |
| hb | №1165 (+ 4 других файлов) |
| hCls | №0836 |
| hctx | №1290 |
| hd | №0813 (+ 1 других файлов) |
| hdiag | №1171 |
| head | №0058 (+ 5 других файлов) |
| HEAD_AXES | №0066 |
| HEAD_FORMS | №0066 |
| HEAD_STYLES | №0066 |
| header | №0827 (+ 1 других файлов) |
| headerAC | №0083 |
| headers | №0653 (+ 2 других файлов) |
| heading | №0772 |
| headMax | №1131 |
| heal | №0779 (+ 2 других файлов) |
| heal2 | №0779 |
| healAmount | №0819 |
| healBatch | №1290 |
| healCaster | №0819 |
| healDeclared | №0819 |
| healed | №0078 (+ 9 других файлов) |
| healer | №0641 |
| healEventId | №0819 |
| healing | №0871 (+ 2 других файлов) |
| healingActors | №0819 |
| healingRedirect | №0655 |
| healingResult | №0655 |
| healMap | №0078 |
| healNoUndead | №0819 |
| healOriginal | №0819 |
| healRange | №0819 |
| healRoll | №0078 |
| healSight | №0819 |
| healTarget | №1290 |
| healv | №0648 |
| heatDamage | №1118 |
| heatMode | №0078 |
| height | №0061 (+ 6 других файлов) |
| heights | №1200 |
| held | №1177 (+ 2 других файлов) |
| heldName | №1179 |
| help | №0815 |
| hem | №0062 |
| hemoragent | №1118 |
| hemoragentNoPool | №1118 |
| hermit | №1177 |
| hermitHero | №1177 |
| hero | №0786 (+ 49 других файлов) |
| heroClassNames | №0836 |
| heroes | №1144 |
| heroFeats | №0745 |
| heroFeatsRef | №0745 |
| heroIsExtra | №0700 |
| heroLevel | №0661 |
| heroLevels | №0805 |
| hex | №0062 (+ 3 других файлов) |
| hi | №0061 (+ 10 других файлов) |
| hidden | №0080 (+ 1 других файлов) |
| hiddenBuckets | №0061 |
| high | №0061 (+ 5 других файлов) |
| highlight | №0063 |
| hint | №0063 |
| hip | №0061 (+ 1 других файлов) |
| hipCenter | №0062 |
| hipMax | №0062 |
| hipMin | №0062 |
| hipRadius | №0062 |
| history | №0063 (+ 4 других файлов) |
| hit | №0655 (+ 14 других файлов) |
| HIT_COST | №0803 |
| hitDie | №0693 (+ 2 других файлов) |
| hitDieMax | №0786 |
| hiX | №0061 |
| hiY | №0061 |
| hm | №1165 (+ 7 других файлов) |
| hole | №0061 |
| holeCounts | №0058 |
| holes | №0061 |
| holeVertices | №0058 |
| hollowHp | №0655 |
| holyAttack | №1118 |
| homebrewClasses | №1297 |
| homunculusCraft | №1118 |
| homunculusEntities | №1118 |
| homunculusOwner | №0655 (+ 1 других файлов) |
| homunculusState | №0655 |
| hood | №0058 (+ 1 других файлов) |
| hoof | №1139 |
| hoofScale | №0061 |
| hoofY | №0061 |
| hook | №0061 |
| hooks | №1117 (+ 3 других файлов) |
| HORN_STYLES | №0066 |
| hornAttack | №1118 |
| hornInstall | №1118 |
| hornPart | №0061 |
| horns | №0061 (+ 1 других файлов) |
| hornSelect | №0063 |
| hornSize | №1146 |
| hornStyle | №0061 (+ 1 других файлов) |
| horror | №0629 (+ 1 других файлов) |
| horseY | №0061 |
| hosiery | №0063 |
| hosieryDen | №1130 |
| host | №0081 (+ 24 других файлов) |
| hostBox | №0810 |
| hostDestroyed | №0816 |
| hostiles | №0656 (+ 1 других файлов) |
| houndHP | №0779 |
| houndTemplate | №0779 |
| howlTargets | №0641 |
| hp | №0078 (+ 22 других файлов) |
| hpAfter | №1264 |
| hpAfterTick | №1117 |
| hpBefore | №1177 |
| hpBeforeShift | №1207 |
| hpCurrentInput | №0700 (+ 1 других файлов) |
| hpDamage | №0655 |
| hpGain | №0700 |
| hpMax | №0647 (+ 1 других файлов) |
| hpMaxInput | №0700 (+ 1 других файлов) |
| hpNow | №0779 |
| hpObj | №0078 |
| hpRes | №0700 |
| hpShape | №1198 |
| hs | №1166 |
| html | №0082 (+ 51 других файлов) |
| http | №1311 (+ 37 других файлов) |
| hud | №1240 (+ 1 других файлов) |
| hugeHands | №1118 |
| human | №1120 (+ 2 других файлов) |
| hunter | №1273 |
| hv | №1228 |
| hx | №0779 |
| hy | №0061 |
| hybrid | №0779 |
| i | №0059 (+ 177 других файлов) |
| ia | №1166 (+ 2 других файлов) |
| ib | №0068 |
| icon | №0792 (+ 3 других файлов) |
| iconEl | №0792 |
| iconId | №0832 (+ 3 других файлов) |
| iconPath | №0886 |
| ICONS | №0832 (+ 2 других файлов) |
| id | №0059 (+ 153 других файлов) |
| ID | №0835 (+ 1 других файлов) |
| idat | №1143 |
| identity | №0073 (+ 1 других файлов) |
| idName | №0745 |
| idOrName | №0672 |
| ids | №0058 (+ 31 других файлов) |
| idv | №0069 (+ 1 других файлов) |
| idx | №0063 (+ 30 других файлов) |
| ignoreTarot | №0827 |
| ignoreWeight | №0789 |
| ii | №1166 (+ 1 других файлов) |
| illIds | №1206 |
| illusion | №0818 (+ 1 других файлов) |
| im | №0069 (+ 3 других файлов) |
| Image | №1119 |
| images | №1119 |
| img | №0063 (+ 3 других файлов) |
| IMG | №0072 |
| imitation | №0078 |
| immune | №0818 (+ 3 других файлов) |
| immuneCharm | №0779 |
| immuneFire | №1117 |
| immuneUntil | №0655 |
| immunity | №0641 |
| importDocument | №1849 |
| imported | №1161 |
| improved | №0803 |
| inCombat | №0641 |
| incoming | №1154 (+ 1 других файлов) |
| incomingType | №0655 |
| incompatible | №0063 |
| indent | №0789 |
| index | №0058 (+ 26 других файлов) |
| indexed | №0793 |
| indices | №0058 (+ 4 других файлов) |
| Infinity | №0061 (+ 8 других файлов) |
| influence | №0058 |
| influences | №0058 |
| info | №0651 (+ 3 других файлов) |
| infoBox | №0824 |
| infoText | №0792 |
| ing | №0079 (+ 2 других файлов) |
| INGREDIENT_SOURCES | №0081 |
| INGREDIENTS | №0079 |
| ings | №0079 (+ 1 других файлов) |
| ini | №0811 |
| initElem | №0624 (+ 1 других файлов) |
| initial | №1119 (+ 2 других файлов) |
| initialAngle | №0062 |
| initialId | №1119 |
| initialProficiencies | №0646 |
| initialSkillsData | №0624 (+ 1 других файлов) |
| initiative | №0773 (+ 1 других файлов) |
| inline | №0069 |
| inner | №0058 (+ 1 других файлов) |
| innerDivs | №0822 |
| innerHtml | №0836 |
| innerList | №0793 |
| inp | №0791 |
| input | №0059 (+ 23 других файлов) |
| inputColEP | №0790 |
| inputColPP | №0790 |
| inputCopper | №0790 |
| inputElem | №0780 (+ 1 других файлов) |
| inputField | №0792 |
| inputGrid | №0790 |
| inputId | №0826 |
| inputs | №1144 |
| inputVal | №0780 |
| ins | №0779 |
| INS | №0828 |
| inside | №0811 |
| insight | №0078 |
| inspect | №0079 |
| inspectOnly | №0818 |
| inspired | №1177 |
| inspiredPhone | №1177 |
| installed | №0660 (+ 1 других файлов) |
| installedGrafts | №0078 |
| instantDeath | №0655 |
| int | №0628 (+ 10 других файлов) |
| Int16Array | №1121 (+ 21 других файлов) |
| Int8Array | №1121 (+ 21 других файлов) |
| internal | №0779 |
| interrupted | №0773 (+ 1 других файлов) |
| intervalVal | №0868 |
| intMod | №0624 (+ 5 других файлов) |
| inv | №0058 (+ 14 других файлов) |
| invalidDead | №1118 |
| inventory | №0823 (+ 1 других файлов) |
| INVENTORY_CATEGORIES | №0818 |
| inventoryPC | №1177 |
| inventoryPhone | №1177 |
| inventoryRoster | №1177 |
| inventorySearchState | №0793 |
| inventoryServer | №1177 |
| inverted | №1177 |
| invertedPhone | №1177 |
| invHeaderACEl | №0793 |
| invis | №1118 |
| invisibleAttacker | №1117 |
| invisUsed | №0655 |
| invokeOptions | №0779 |
| invSrc | №1250 |
| ioff | №0069 |
| ionizer | №1118 |
| ionizerClass | №0655 |
| ionizerEngineer | №1118 |
| ionizerTarget | №1117 |
| ip | №0646 |
| ipcMain | №0886 |
| ipcRenderer | №0887 |
| ir | №0069 (+ 1 других файлов) |
| ironChinAttack | №1198 |
| ironChinTarget | №1198 |
| irregular | №0061 |
| is | №1166 |
| isActionProcessed | №0791 |
| isActive | №0868 (+ 1 других файлов) |
| isAlreadyHas | №0822 |
| isAsiLevel | №0700 |
| isAttackOrCheck | №0772 |
| isAutoOn | №0868 |
| isAvailable | №0836 |
| isBlood | №0811 |
| isBomb | №0078 |
| isChecked | №0624 (+ 4 других файлов) |
| isCrit | №0836 |
| isDead | №0078 |
| isDebug | №0832 |
| isDebugEnabled | №0771 |
| isDestroyed | №0797 |
| isDrawerOpen | №0772 |
| isEnabled | №0832 (+ 1 других файлов) |
| isExpert | №0772 |
| isExtraHero | №0700 |
| isFinesse | №0772 |
| isFinger | №0061 |
| isFinite | №1215 (+ 15 других файлов) |
| isFirearm | №0823 |
| isFree | №0844 |
| isGhost | №0646 (+ 1 других файлов) |
| isGhostExtra | №0646 |
| isGhostHero | №0700 |
| isGrouped | №0791 |
| isHeavyOrExceeds | №0792 |
| isHero | №0773 |
| isHidden | №0793 |
| isInterfaceHidden | №0868 |
| isize | №0069 |
| isLandscape | №0886 |
| isLeft | №0059 |
| isMartial | №0823 |
| isMoreStep | №0815 |
| isNewClass | №0700 (+ 1 других файлов) |
| isolated | №1299 |
| isolatedFound | №1299 |
| isolatedLegacy | №1299 |
| isOverLimit | №0836 |
| isOverweight | №0792 |
| isParasite | №0646 (+ 1 других файлов) |
| isParasiteExtra | №0646 |
| isParasiteHero | №0700 |
| isPhbA | №0836 |
| isPlayingAmbience | №0082 |
| isPOT | №0073 |
| isPrepared | №0836 |
| isProf | №0624 (+ 2 других файлов) |
| isProficient | №0772 |
| isRanged | №0772 |
| isRepeatOneOn | №0082 |
| isRight | №0059 |
| isRite | №0641 |
| isRowActionProcessed | №0791 |
| isSelected | №0082 (+ 1 других файлов) |
| isShield | №0793 |
| isShuffleOn | №0082 |
| isSimple | №0823 |
| isSuccess | №0772 |
| issues | №0672 |
| isSwarm | №0646 (+ 1 других файлов) |
| isSwarmExtra | №0646 |
| isSwarmHero | №0700 |
| isWalterHero | №0700 |
| isWalterParasite | №0646 (+ 1 других файлов) |
| isWalterParasiteExtra | №0646 |
| isWalterParasiteHero | №0700 |
| it | №0665 (+ 4 других файлов) |
| item | №0062 (+ 37 других файлов) |
| itemArray | №0792 |
| itemCards | №0792 |
| itemCategory | №0793 |
| itemData | №0792 (+ 1 других файлов) |
| itemId | №0799 (+ 2 других файлов) |
| itemName | №0793 |
| itemRegistry | №0792 |
| items | №0061 (+ 13 других файлов) |
| iterations | №0820 |
| iv | №0069 (+ 3 других файлов) |
| iw | №0779 (+ 1 других файлов) |
| ix | №0058 (+ 3 других файлов) |
| j | №0058 (+ 24 других файлов) |
| J | №0061 |
| jaw | №0061 |
| jb | №1163 (+ 1 других файлов) |
| jh | №1163 (+ 1 других файлов) |
| ji | №0068 |
| jinx | №0655 |
| job | №0818 |
| joinBox | №0810 |
| jointIds | №1133 |
| joints | №0058 (+ 4 других файлов) |
| journal | №0855 (+ 1 других файлов) |
| JOURNAL | №0653 (+ 1 других файлов) |
| jp | №1163 |
| jpad | №1308 |
| JSDOM | №1172 |
| json | №0069 (+ 12 других файлов) |
| JSON | №0663 (+ 55 других файлов) |
| jsonBytes | №1157 |
| jsonBytes0 | №1157 |
| jsonPad | №1157 |
| k | №0059 (+ 111 других файлов) |
| K | №0068 (+ 1 других файлов) |
| keep | №0061 (+ 4 других файлов) |
| keepConditions | №0078 |
| keepEffects | №0078 |
| keepFaces | №0058 |
| keepResistance | №0078 |
| key | №0061 (+ 62 других файлов) |
| KEY | №0060 (+ 20 других файлов) |
| keyName | №0078 |
| keys | №0061 (+ 6 других файлов) |
| kg | №0791 |
| kgInput | №0791 |
| killer | №0783 |
| kind | №0061 (+ 20 других файлов) |
| kinds | №0818 (+ 1 других файлов) |
| kingAlly | №0819 |
| kingEnemy | №1179 |
| kingSelect | №1179 |
| knee | №0061 |
| kneeHigh | №0061 |
| kneeLine | №0061 |
| kneeLow | №0061 |
| knockout | №1198 |
| knockoutHero | №1198 |
| knockoutTarget | №1198 |
| knot | №0063 |
| known | №0078 (+ 8 других файлов) |
| KNOWN | №0828 (+ 1 других файлов) |
| knownCantrips | №0078 |
| knownFormula | №0779 |
| knownProcessed | №0673 |
| knownSpell | №1209 |
| ko | №0779 |
| koMod | №1199 |
| koRoll | №0779 |
| koTarget | №1199 |
| l | №0061 (+ 44 других файлов) |
| L | №0058 (+ 2 других файлов) |
| la | №0811 |
| label | №0063 (+ 10 других файлов) |
| labels | №0063 (+ 2 других файлов) |
| LABELS | №0871 |
| lamp | №1173 |
| landed | №1177 |
| landscape | №0886 (+ 1 других файлов) |
| langCount | №0646 |
| langs | №0828 |
| LANGS | №0828 |
| langStr | №0646 |
| langText | №0824 |
| larva | №0061 (+ 1 других файлов) |
| larvaBounds | №0063 |
| larval | №0063 |
| last | №0058 (+ 7 других файлов) |
| lastError | №0063 |
| lastFace | №1169 |
| lastResult | №0801 |
| lastRow | №1143 |
| lastTap | №0797 |
| lastVertex | №1169 |
| late | №1119 |
| latitude | №0058 |
| latitudes | №0058 |
| launchTour | №0815 |
| layer | №0061 |
| layout | №1319 (+ 1 других файлов) |
| lazarusOwner | №1118 |
| lbs | №0791 |
| le | №0865 |
| lead | №0776 (+ 1 других файлов) |
| leaf | №0063 |
| leafSize | №1165 |
| lean | №0061 |
| learned | №0670 |
| leather | №0063 |
| leatherQty | №0663 |
| leaving | №1179 |
| leavingReach | №0819 |
| left | №0062 (+ 13 других файлов) |
| leftReaction | №0655 |
| leg | №0061 (+ 1 других файлов) |
| legacy | №0823 (+ 9 других файлов) |
| legacyCount | №1358 |
| legacyCurses | №0077 |
| legacyHuman | №1120 |
| legacyPact | №0798 |
| legacyUrl | №1299 |
| legend | №0063 |
| legPhase | №0061 |
| len | №0061 (+ 12 других файлов) |
| length | №0058 (+ 2 других файлов) |
| lengths | №1168 |
| level | №0058 (+ 38 других файлов) |
| level1 | №0778 |
| levelData | №0700 (+ 1 других файлов) |
| levelDisplays | №0700 |
| levelFilter | №0836 |
| levelFour | №1118 |
| levelInput | №0831 |
| levelInputs | №0700 |
| levelOk | №0836 |
| levelReq | №0779 |
| levels | №0675 (+ 23 других файлов) |
| LEVELS | №0670 |
| levelSources | №0836 |
| levelSpells | №0836 |
| levelUp | №1144 |
| levelUpBtn | №0780 |
| levelUpSrc | №1250 |
| levelVal | №0836 |
| li | №0072 (+ 1 других файлов) |
| lie | №1197 |
| lifecycle | №0793 |
| lift | №0061 |
| light | №0073 |
| lightArmor | №0655 |
| lightFloor | №0073 |
| lightLimitKg | №0792 |
| lightLimitLb | №0792 |
| lights | №0071 |
| lim | №0818 |
| limbRanges | №0061 |
| limbSamples | №0061 |
| limbSelect | №0063 |
| limit | №0061 (+ 3 других файлов) |
| limits | №0063 |
| limitStr | №0792 |
| line | №0061 (+ 8 других файлов) |
| lineno | №0771 |
| lines | №0827 |
| lingerie | №0062 |
| lingerieAtlas | №0062 |
| link | №0797 (+ 1 других файлов) |
| linked | №1177 |
| linkedPhone | №1177 |
| links | №0058 (+ 1 других файлов) |
| lip | №0061 |
| list | №0060 (+ 41 других файлов) |
| listContainer | №0082 (+ 2 других файлов) |
| listContainers | №0789 |
| listener | №0887 |
| listeners | №0653 (+ 1 других файлов) |
| lit | №1173 |
| lItem | №0646 |
| live | №0063 (+ 6 других файлов) |
| LIVE_PROGRESSION_KEYS | №0649 |
| liveFoe | №1181 |
| liveKey | №0649 |
| livePC | №1177 |
| livePhone | №1177 |
| liveRoot | №0886 |
| liveServer | №1177 |
| liveSnake | №1177 |
| lo | №0061 (+ 7 других файлов) |
| LOAD_FILES | №0663 |
| loader | №1158 |
| lobe | №0061 |
| loc | №1119 |
| local | №0061 (+ 5 других файлов) |
| localData | №0832 |
| localId | №0653 |
| localStorage | №1161 |
| location | №0818 |
| lock | №0886 |
| locked | №0669 (+ 1 других файлов) |
| locks | №0061 (+ 1 других файлов) |
| logBox | №0771 |
| logContainer | №0772 |
| logContent | №0790 |
| logDiv | №0790 |
| logItem | №0772 |
| logLine | №0771 |
| logs | №0832 |
| logText | №0772 (+ 1 других файлов) |
| long | №0063 (+ 1 других файлов) |
| longFired | №0863 |
| longitude | №0058 |
| longTimer | №0863 |
| looksLikeModal | №0832 |
| lookup | №0061 |
| loop | №0058 |
| loot | №0627 (+ 18 других файлов) |
| LOOT_MODELS | №0806 |
| los | №0656 (+ 1 других файлов) |
| loss | №0641 (+ 1 других файлов) |
| low | №0061 (+ 6 других файлов) |
| lower | №0059 (+ 4 других файлов) |
| lowerId | №0062 |
| lowerJaw | №0061 |
| lowerLang | №0646 |
| lowerName | №0624 |
| lowerOptions | №0062 |
| lowerTool | №0646 |
| lowest | №0058 |
| loX | №0061 |
| loY | №0061 |
| lr | №0811 (+ 1 других файлов) |
| ls | №0073 (+ 2 других файлов) |
| lv | №0078 (+ 1 других файлов) |
| lvl | №0786 (+ 8 других файлов) |
| lvl1Options | №0646 |
| lvlA | №0836 |
| lvlB | №0836 |
| lvlBadge | №0836 |
| lvlDisplay | №0832 |
| lvlInput | №0832 |
| lx | №0072 |
| Lx | №0072 |
| ly | №0072 |
| Ly | №0072 |
| m | №0059 (+ 101 других файлов) |
| M | №0070 (+ 8 других файлов) |
| m0 | №1119 |
| m1 | №0674 (+ 1 других файлов) |
| m2 | №0674 |
| macro | №1357 |
| macroFile | №1357 |
| macros | №1163 (+ 2 других файлов) |
| madBomber | №0655 |
| mag | №0063 (+ 1 других файлов) |
| MAGE_CATALOG_AUDITED | №0818 |
| MAGE_HANDLERS | №0818 |
| MAGE_LEVEL2 | №0818 |
| mageActors | №0819 |
| mageApi | №0819 |
| mageBack | №1177 |
| mageBerryCount | №0819 |
| mageCon | №1177 |
| mageDarts | №0819 (+ 1 других файлов) |
| mageGround | №0819 |
| magePC | №1177 |
| magePending | №0819 |
| magePhone | №1177 |
| mageRoster | №1177 |
| mageSelect | №1179 |
| mageServer | №1177 |
| mageSpell | №0819 |
| mageStat | №0819 |
| mageTargets | №0819 |
| mageType | №0819 |
| mageWilling | №0819 |
| magic | №1250 |
| magicFistHero | №1198 |
| magicHit | №1198 |
| main | №0062 |
| mainCard | №0772 |
| mainWindow | №0886 |
| major | №1177 |
| MAJOR_ACTIONS | №0818 |
| MAJORS | №0821 |
| male | №1138 |
| malePositions | №1119 |
| maleRef | №1138 |
| malformed | №1124 (+ 3 других файлов) |
| manager | №1298 |
| manifest | №0795 (+ 4 других файлов) |
| manifestPath | №0889 (+ 1 других файлов) |
| manifestUrl | №0842 |
| manual | №1125 (+ 1 других файлов) |
| map | №0061 (+ 25 других файлов) |
| Map | №1159 (+ 5 других файлов) |
| mapPaths | №1849 |
| mapped | №0779 |
| mapping | №0061 (+ 1 других файлов) |
| maps | №0871 (+ 1 других файлов) |
| mapToVar | №0834 |
| mark | №0641 (+ 1 других файлов) |
| market | №0800 (+ 2 других файлов) |
| mask | №0059 (+ 2 других файлов) |
| MASS_HARVEST_MATERIALS | №0806 |
| master | №0665 (+ 2 других файлов) |
| mastery | №0811 |
| masteryNames | №0811 |
| mat | №0062 (+ 8 других файлов) |
| match | №0780 (+ 6 других файлов) |
| matches | №0648 (+ 2 других файлов) |
| material | №0062 (+ 2 других файлов) |
| MATERIAL_BRIDGE | №0806 |
| MATERIAL_DEFS | №0672 |
| materialCells | №0062 |
| materialIds | №0672 |
| materials | №0062 (+ 3 других файлов) |
| MATERIALS | №0667 (+ 2 других файлов) |
| math | №1144 (+ 2 других файлов) |
| Math | №1117 (+ 63 других файлов) |
| matrices | №0058 (+ 1 других файлов) |
| matrix | №0058 (+ 1 других файлов) |
| mats | №0664 (+ 6 других файлов) |
| max | №0061 (+ 37 других файлов) |
| MAX | №0803 (+ 3 других файлов) |
| MAX_CR | №0833 |
| MAX_DEPTH | №0789 |
| MAX_ERRORS | №0853 |
| MAX_FILES | №0889 |
| MAX_PLAYERS | №0810 |
| MAX_TOTAL_BYTES | №0889 |
| max2 | №0813 |
| maxAllowedLevel | №0836 |
| maxAt | №1189 |
| maxBuilder | №1144 |
| maxCapacityKg | №0792 (+ 1 других файлов) |
| maxCapacityLb | №0792 |
| maxDisplacement | №1162 |
| maxDistance | №1133 |
| maxFaces | №0058 (+ 1 других файлов) |
| maxHero | №1177 |
| maxHit | №1177 |
| maxHp | №0624 (+ 3 других файлов) |
| maxHP | №0869 |
| maximize | №0655 |
| maximum | №0655 (+ 2 других файлов) |
| maxIndex | №1169 |
| maxLevel | №0836 |
| maxOutside | №1308 |
| maxPrepared | №0836 |
| maxRestore | №0648 |
| maxRoll | №1144 |
| maxSpell | №0835 |
| maxSteps | №0656 |
| maxTargets | №1164 |
| maxTex | №0073 |
| maxUses | №0654 (+ 1 других файлов) |
| maxVal | №0836 |
| maxVertices | №0063 (+ 6 других файлов) |
| maxX | №0071 |
| maxY | №0071 |
| MC1 | №0630 |
| mctx | №1291 (+ 1 других файлов) |
| MCV2 | №0631 |
| md | №0073 (+ 2 других файлов) |
| me | №0069 (+ 1 других файлов) |
| mean | №0058 (+ 6 других файлов) |
| meanUniform | №1143 |
| mechanics | №0833 |
| MECHANICS | №0077 (+ 2 других файлов) |
| medium | №0641 |
| mediumLimitKg | №0792 |
| mediumLimitLb | №0792 |
| member | №1111 |
| members | №0818 |
| memory | №1126 |
| mental | №0784 (+ 1 других файлов) |
| menu | №0815 |
| merged | №0063 (+ 1 других файлов) |
| mesh | №0061 (+ 4 других файлов) |
| meshes | №0069 (+ 2 других файлов) |
| message | №0063 (+ 17 других файлов) |
| messages | №0074 |
| meta | №0064 (+ 7 других файлов) |
| META_COST | №0648 |
| META_NAMES | №0648 |
| METAS | №0077 |
| method | №0653 |
| mettle | №0655 |
| mh | №0061 (+ 5 других файлов) |
| mi | №0069 (+ 2 других файлов) |
| microEntry | №0063 |
| mid | №0061 (+ 1 других файлов) |
| middles | №0058 |
| migrated | №0811 |
| mimeTypes | №0886 |
| min | №0061 (+ 7 других файлов) |
| minBuilder | №1144 |
| mind | №0816 |
| minimumLevel | №0648 |
| minIndex | №1169 |
| minor | №1190 |
| MINOR_ACTIONS | №0818 |
| mins | №0868 |
| minutes | №0868 (+ 1 других файлов) |
| minutesSinceDeath | №0078 |
| minutesVal | №0868 |
| minVal | №0786 |
| minX | №0071 |
| minY | №0071 |
| miss | №1193 |
| missArena | №1198 |
| missedKnockoutHero | №1198 |
| missedKnockoutTarget | №1198 |
| misses | №1165 (+ 3 других файлов) |
| missing | №0664 (+ 10 других файлов) |
| missingReliefRoll | №1118 |
| missingTools | №0672 |
| missTarget | №1198 |
| mix | №0079 (+ 1 других файлов) |
| mixed | №1121 (+ 1 других файлов) |
| mj | №0779 |
| ml | №0061 |
| mm | №0073 (+ 2 других файлов) |
| mn | №0081 (+ 7 других файлов) |
| mo | №0073 |
| mob | №1177 |
| mobile | №1177 |
| mobileArmor | №1177 |
| mobileArmored | №1177 |
| mobileArtisan | №1177 |
| mobileBerry | №1177 |
| mobileBurden | №1177 |
| mobileDarts | №1177 |
| mobileDash | №1177 |
| mobileIllusion | №1177 |
| mobileMage | №1177 |
| mobilePoison | №1177 |
| mobileQueen | №1177 |
| mobileRange | №0073 |
| mobileSnake | №1177 |
| mobileStand | №1177 |
| mod | №0624 (+ 9 других файлов) |
| modal | №0082 (+ 13 других файлов) |
| modalColorOptions | №0868 |
| modalHTML | №0700 |
| modals | №0793 |
| modDisplay | №0772 (+ 1 других файлов) |
| mode | №0070 (+ 21 других файлов) |
| modeButtons | №0772 |
| model | №0806 (+ 2 других файлов) |
| models | №1849 |
| modeRadio | №0647 |
| modes | №1196 (+ 2 других файлов) |
| modeSelect | №0791 |
| modifier | №0654 (+ 1 других файлов) |
| modifierMatch | №0772 |
| modifiers | №1198 |
| MODIFIERS | №0674 |
| modMatches | №0836 |
| modName | №0772 |
| modNum | №0624 (+ 1 других файлов) |
| mods | №0655 (+ 5 других файлов) |
| modSourceLabel | №0772 |
| modStr | №0624 (+ 3 других файлов) |
| modTag | №0624 (+ 1 других файлов) |
| modules | №1091 (+ 37 других файлов) |
| modVal | №0772 (+ 1 других файлов) |
| monk | №1263 (+ 1 других файлов) |
| monster | №0805 (+ 2 других файлов) |
| MONSTER_RECIPES | №0806 |
| monsterCount | №0805 |
| monsterId | №0811 |
| monsterName | №0807 (+ 1 других файлов) |
| monsters | №0627 (+ 13 других файлов) |
| MONSTERS | №0655 |
| monsterSrc | №1271 |
| monstrousGrafts | №0078 |
| morph | №1165 (+ 2 других файлов) |
| morphBytes | №1157 |
| morphed | №1120 |
| morphName | №1157 |
| morphOffset | №1157 |
| morphPrimitives | №1160 (+ 1 других файлов) |
| morphTargets | №1160 |
| motion | №0063 |
| motionBack | №1177 |
| motionPC | №1177 |
| motionPhone | №1177 |
| motionRoster | №1177 |
| motionServer | №1177 |
| mouth | №0061 |
| mouthDistance | №0061 |
| mouthRadius | №0061 |
| mouthRY | №0061 |
| mouthY | №0061 |
| move | №0070 (+ 1 других файлов) |
| moved | №0863 (+ 3 других файлов) |
| moveExtraPanelsIntoDrawer | №0772 |
| moveHero | №1177 |
| moveId | №1184 |
| moveItemToContainer | №0789 |
| movement | №0074 |
| movePC | №1177 |
| movePhone | №1177 |
| moveRoster | №1177 |
| movers | №0818 |
| moveServer | №1177 |
| moving | №0061 |
| moxie | №0779 |
| moxieBeforeMiss | №1198 |
| mp | №0648 (+ 2 других файлов) |
| mr | №0648 (+ 2 других файлов) |
| mrko | №0779 |
| ms | №0069 (+ 2 других файлов) |
| msg | №0832 (+ 11 других файлов) |
| msgEl | №0792 |
| mult | №0624 (+ 4 других файлов) |
| multi2 | №0669 |
| MULTICLASS_PROFICIENCIES_2014 | №0713 |
| MULTICLASS_REQUIREMENTS | №0786 |
| MULTIPLIER | №0805 |
| multiRules | №0700 |
| mults | №0790 |
| muscle | №0061 |
| mutableHit | №1117 |
| mutableTarget | №1117 |
| mutagenAbility | №0078 |
| mutagenAlly | №1118 |
| mutagenHero | №1118 |
| mutagenist | №1118 |
| mutagenNames | №0641 |
| mutagenResult | №1118 |
| mutagens | №0641 |
| mutatedCap | №0078 |
| MUTATION_SLOTS | №0816 (+ 1 других файлов) |
| mutations | №0792 (+ 4 других файлов) |
| mutCreated | №0779 |
| muts | №0839 |
| muzzle | №0061 (+ 3 других файлов) |
| mv | №0656 |
| mw | №0061 |
| mx | №0073 (+ 6 других файлов) |
| my | №0073 (+ 1 других файлов) |
| mysteries | №0813 |
| mythic | №1207 (+ 1 других файлов) |
| n | №0059 (+ 143 других файлов) |
| N | №0058 (+ 3 других файлов) |
| n2 | №1294 |
| nailLen | №0061 |
| name | №0059 (+ 168 других файлов) |
| NAME | №0835 (+ 1 других файлов) |
| NAME_ALIASES | №0802 |
| name2 | №0779 |
| nameA | №0836 |
| nameB | №0836 |
| nameInp | №0791 |
| nameInput | №0624 (+ 2 других файлов) |
| nameLower | №0772 |
| nameRu | №1297 |
| names | №0059 (+ 23 других файлов) |
| NAMES | №0628 (+ 12 других файлов) |
| nameSpan | №0793 (+ 1 других файлов) |
| NaN | №1207 |
| native | №0842 (+ 1 других файлов) |
| nativeBridge | №0810 |
| nativeClear | №0653 |
| nativePacketSeq | №0810 |
| nativeRemove | №0653 |
| nativeSeenSeqByPeer | №0810 |
| nativeSet | №0653 |
| nativeVersion | №0842 |
| natural | №0833 |
| naturalAttack | №1207 |
| naturalGrafts | №0078 |
| naturalTwenty | №0655 |
| nb | №0061 |
| nctx | №1290 |
| ne | №1266 (+ 7 других файлов) |
| near | №0058 (+ 2 других файлов) |
| nearest | №0656 (+ 1 других файлов) |
| nearestAt | №0061 |
| nearestDist | №0656 |
| neck | №0061 |
| neckDrop | №0062 |
| neckFront | №0062 |
| neckIndices | №0061 |
| neckMap | №0061 |
| neckNormals | №0061 |
| neckZ | №0061 |
| necromanticRevival | №0655 |
| necrotic | №0655 |
| needsSave | №0655 |
| needsSubclassChoice | №0700 |
| needsTarget | №0779 |
| net | №0773 (+ 4 других файлов) |
| neutral | №1121 (+ 2 других файлов) |
| newChar | №0624 (+ 1 других файлов) |
| newcomer | №1190 (+ 1 других файлов) |
| newCount | №0793 |
| newCp | №0790 |
| newEntry | №0796 |
| newEp | №0790 |
| newFolder | №0812 |
| newGp | №0790 |
| newId | №0624 (+ 2 других файлов) |
| newLevel | №0831 (+ 1 других файлов) |
| newLvl | №0832 |
| newMax | №0700 |
| newPeer | №1284 |
| newPp | №0790 |
| newRace | №0824 |
| newSp | №0790 |
| newSpell | №0836 |
| newTemp | №0078 |
| newTotalLevel | №0700 |
| newVal | №0624 (+ 2 других файлов) |
| newVol | №0082 |
| next | №0058 (+ 18 других файлов) |
| nextHp | №0078 |
| nextLevel | №0700 |
| nextLevelExpReq | №0780 |
| nextRemaining | №0078 |
| nf | №0073 |
| ng | №1285 (+ 2 других файлов) |
| ni | №0061 (+ 2 других файлов) |
| nk | №0061 (+ 1 других файлов) |
| nl | №0061 |
| nm | №0865 |
| nn | №1165 (+ 3 других файлов) |
| nnx | №0061 |
| nnz | №0061 |
| no | №1213 |
| noChoice | №1118 |
| noClaws | №1139 |
| node | №0832 (+ 5 других файлов) |
| nodes | №0059 (+ 8 других файлов) |
| NODES | №0878 |
| noEars | №1141 |
| noGlow | №1321 |
| none | №0063 (+ 2 других файлов) |
| nonmagicalResistance | №0655 |
| nonmagicalVariants | №0655 |
| nonZero | №1165 (+ 2 других файлов) |
| nonzeroSource | №1168 |
| noRefill | №1177 |
| noReliefTarget | №1118 |
| noRiteDice | №1204 |
| norm | №0058 (+ 2 других файлов) |
| normal | №0061 (+ 5 других файлов) |
| normalAC | №0655 |
| normalizeClassKey | №0700 |
| normalized | №0713 (+ 3 других файлов) |
| normalizedCondition | №0655 |
| normalizedCurrentClass | №0700 |
| normalizedRequested | №0700 |
| normalizeLevelUpClassName | №0700 |
| normalizeYield | №0826 |
| normalRaceLabel | №0646 |
| normals | №0058 (+ 1 других файлов) |
| nose | №0061 |
| noseDepth | №0061 |
| nosePart | №0061 |
| noseTop | №0061 |
| noseWidth | №0061 |
| noseY | №0061 |
| noseZ | №0061 |
| nostril | №0061 |
| nostrils | №0061 |
| note | №0655 (+ 2 других файлов) |
| now | №0061 (+ 5 других файлов) |
| np | №0061 |
| npot | №0073 |
| null | №0832 (+ 15 других файлов) |
| num | №0786 (+ 1 других файлов) |
| Number | №0663 (+ 25 других файлов) |
| numbers | №0062 |
| nums | №0811 |
| nw | №0779 |
| nx | №0061 (+ 1 других файлов) |
| ny | №0058 (+ 1 других файлов) |
| nylon | №0063 |
| nz | №0058 (+ 2 других файлов) |
| o | №0059 (+ 52 других файлов) |
| oa | №0779 |
| obj | №0071 (+ 5 других файлов) |
| Object | №0663 (+ 23 других файлов) |
| objectBomber | №1117 |
| objectId | №0648 (+ 2 других файлов) |
| objectIds | №0828 |
| objPath | №1157 (+ 6 других файлов) |
| objs | №0072 |
| observer | №0792 (+ 3 других файлов) |
| observerTarget | №0792 |
| oc | №1268 |
| oc2 | №1268 |
| occultIds | №1206 |
| occultistPack | №0779 |
| occupied | №0830 |
| od | №0811 |
| odd | №0818 |
| odds | №0819 (+ 4 других файлов) |
| odr | №0811 |
| off | №0063 (+ 6 других файлов) |
| offer | №0801 (+ 3 других файлов) |
| offered | №0802 |
| offers | №0801 (+ 1 других файлов) |
| offHoof | №1139 |
| offset | №0061 (+ 7 других файлов) |
| oh | №0072 (+ 1 других файлов) |
| oi | №0072 (+ 2 других файлов) |
| oid | №0779 |
| oilDamage | №0655 |
| ok | №0072 (+ 10 других файлов) |
| ol | №0073 |
| old | №0065 (+ 47 других файлов) |
| oldAngle | №0065 |
| oldBin | №1157 |
| oldBuffer | №1119 |
| oldChar | №1284 |
| oldCharacter | №1284 |
| oldCombatForDemolition | №1118 |
| oldData | №0832 |
| oldDrawer | №0772 |
| oldEffects | №0078 |
| oldHead | №1120 |
| oldHost | №0772 |
| oldHp | №0078 |
| oldId | №0655 (+ 1 других файлов) |
| oldInitRender | №0827 |
| oldLength | №0058 |
| oldLevel | №0670 |
| oldMax | №0077 (+ 1 других файлов) |
| oldNet | №1284 |
| oldPact | №0827 |
| oldPeer | №0811 |
| oldRAF | №1311 (+ 18 других файлов) |
| oldRandom | №0663 (+ 1 других файлов) |
| oldRandomForBurn | №1117 |
| oldRandomMutable | №1117 |
| oldRandomObject | №1117 |
| oldRandomPoison | №1117 |
| oldRandomSlime | №1117 |
| oldRenderDndTools | №0827 |
| oldRoll | №1275 |
| oldSelect | №0791 |
| oldTemp | №0078 |
| oldTotal | №0700 |
| on | №0063 (+ 6 других файлов) |
| onchange | №0819 |
| one | №1192 |
| oneTwoTarget | №0779 |
| onPhone | №1177 |
| onProgress | №0842 |
| oozeRancher | №0655 |
| oozeRancherAcidResistance | №0655 |
| oozeTarget | №1117 |
| op | №0063 (+ 2 других файлов) |
| opacity | №0868 (+ 1 других файлов) |
| opacityVal | №0868 |
| open | №0648 (+ 2 других файлов) |
| openedHero | №0819 |
| opening | №0772 |
| openPanels | №1141 |
| openSet | №0796 |
| openSky | №0818 |
| operation | №1111 |
| operationId | №0821 |
| opportunityAttacker | №0819 |
| opt | №0063 (+ 4 других файлов) |
| option | №0063 |
| options | №0061 (+ 22 других файлов) |
| opts | №0080 (+ 29 других файлов) |
| optsHtml | №0646 |
| orbit | №0061 |
| orc | №1270 |
| order | №0058 (+ 4 других файлов) |
| orderCtx | №1209 |
| origin | №0063 (+ 2 других файлов) |
| original | №0058 (+ 18 других файлов) |
| originalAppearance | №0078 |
| originalAttack | №0666 |
| originalBody | №1120 |
| originalCalculateMods | №0836 |
| originalContext | №1119 |
| originalCraft | №0666 (+ 1 других файлов) |
| originalCrypto | №1179 |
| originalDamage | №0666 |
| originalEnemyHp | №1179 |
| originalError | №0771 |
| originalHealingTarget | №0655 |
| originalIndex | №0793 |
| originalIndices | №1137 |
| originalLog | №0771 |
| originalOpenCharacter | №0836 |
| originalPhysical | №0833 |
| originalRepair | №0666 |
| originalUI | №1299 |
| originalUiCraft | №0666 |
| originLabel | №0063 |
| orphan | №0789 |
| os | №1116 (+ 5 других файлов) |
| ot | №0656 (+ 1 других файлов) |
| other | №0793 (+ 8 других файлов) |
| otherCat | №0793 |
| otherIndex | №0793 |
| otherIsShield | №0793 |
| otherName | №0793 |
| ott | №0779 |
| out | №0059 (+ 71 других файлов) |
| outcome | №0818 (+ 2 других файлов) |
| outer | №0058 (+ 2 других файлов) |
| outerWidth | №0058 |
| outPath | №1157 |
| output | №0063 (+ 3 других файлов) |
| outputId | №0673 (+ 1 других файлов) |
| outputName | №0673 (+ 1 других файлов) |
| outside | №0062 (+ 1 других файлов) |
| outsideBary | №1168 |
| overheated | №0078 |
| overheatedTarget | №1118 |
| overlay | №0797 (+ 3 других файлов) |
| overload | №1118 |
| overloadBefore | №1118 |
| overloadBomber | №1118 |
| overloadCost | №0078 |
| overrides | №0657 |
| ow | №0072 |
| own | №0656 (+ 1 других файлов) |
| owned | №0671 (+ 2 других файлов) |
| owner | №0063 (+ 11 других файлов) |
| ownerActor | №0656 |
| ownerBombHit | №1117 |
| ownerClass | №0078 |
| ownerCopy | №0821 |
| ownerId | №0830 |
| ox | №0068 (+ 2 других файлов) |
| oy | №0068 (+ 2 других файлов) |
| oz | №0068 (+ 1 других файлов) |
| p | №0059 (+ 162 других файлов) |
| P | №0069 (+ 2 других файлов) |
| p0 | №0061 |
| p1 | №0061 |
| pa | №0655 |
| pack | №0070 (+ 22 других файлов) |
| PACK_ID | №0078 (+ 2 других файлов) |
| PACK_MANIFEST | №0662 |
| packId | №0661 |
| packName | №0661 |
| packs | №0776 (+ 1 других файлов) |
| pact | №0648 (+ 3 других файлов) |
| PACT | №0798 |
| PACT_SLOTS | №0827 |
| pactBoxes | №0836 |
| pactLevel | №0827 |
| pactSlots | №0779 |
| pactState | №0827 |
| pad | №0061 |
| pads | №0061 |
| page | №0653 (+ 38 других файлов) |
| paid | №0803 (+ 1 других файлов) |
| paintAttack | №1118 |
| painter | №1118 |
| pair | №0058 (+ 2 других файлов) |
| pal | №1268 (+ 2 других файлов) |
| palette | №0062 (+ 1 других файлов) |
| palettes | №0063 |
| palm | №0061 |
| panel | №0062 (+ 6 других файлов) |
| panelHost | №0827 |
| panelsHidden | №0070 |
| panX | №0863 |
| panY | №0863 |
| parasiteHostTarget | №0646 |
| parent | №0068 (+ 3 других файлов) |
| parentArea | №0793 |
| parentId | №0839 |
| parsed | №0832 (+ 3 других файлов) |
| parsedHtml | №0772 |
| parsedSides | №0772 |
| parseFloat | №1117 (+ 15 других файлов) |
| parseInt | №1117 (+ 13 других файлов) |
| part | №0059 (+ 16 других файлов) |
| partner | №0818 |
| partnerSnapshot | №0818 |
| parts | №0061 (+ 29 других файлов) |
| partySize | №0805 |
| pass | №0058 (+ 3 других файлов) |
| passed | №1149 (+ 2 других файлов) |
| passInsight | №0624 (+ 1 других файлов) |
| passInvestigation | №0624 (+ 1 других файлов) |
| passive | №0779 (+ 2 других файлов) |
| passiveFeatures | №0078 |
| passPerception | №0624 (+ 1 других файлов) |
| password | №0651 (+ 1 других файлов) |
| pat | №0072 |
| patch | №0061 (+ 5 других файлов) |
| patchLootResult | №0826 |
| path | №0061 (+ 113 других файлов) |
| paths | №1153 |
| patient | №0078 (+ 1 других файлов) |
| patronNames | №0641 |
| patrons | №0641 (+ 1 других файлов) |
| paw | №0061 |
| payload | №0083 (+ 11 других файлов) |
| pb | №0077 (+ 7 других файлов) |
| PB | №0077 (+ 10 других файлов) |
| pbBreath | №0078 |
| pc | №0779 (+ 4 других файлов) |
| pcRoster | №1177 |
| pct | №0843 (+ 1 других файлов) |
| pd | №0878 |
| peace | №1177 |
| peacePhone | №1177 |
| peak | №1198 |
| peer | №0811 (+ 2 других файлов) |
| peerId | №0811 |
| peers | №0810 (+ 3 других файлов) |
| pelvisNode | №0058 |
| penalizedAttack | №1117 |
| penalizedSave | №1117 |
| penalty | №0641 |
| pending | №0064 (+ 14 других файлов) |
| pendingBloodAttack | №0655 |
| pendingBomb | №0078 |
| pendingContext | №0625 |
| pendingFeature | №0625 |
| pendingLevelUpData | №0700 |
| pendingReactions | №0811 |
| pendingSavantAttack | №0655 |
| pendingTargetId | №0625 |
| percent | №0063 (+ 2 других файлов) |
| perfumeAttack | №1117 |
| perfumeAttacker | №1117 |
| perfumeClass | №0655 |
| perfumeDC | №0655 |
| perfumeHero | №0655 |
| perfumeOwner | №1117 |
| perfumeOwnerState | №0655 |
| perfumeRound | №0655 |
| perfumeSave | №0655 |
| perfumeSource | №0655 |
| perfumeSourceClass | №0655 |
| perfumeState | №0655 |
| perfumeTargetId | №0655 |
| permission | №0886 |
| perms | №1171 |
| pev | №0811 |
| pf | №0833 |
| PGlite | №1111 |
| ph | №1273 |
| PH | №0072 |
| phase | №0061 (+ 1 других файлов) |
| phases | №1217 |
| pher | №0655 |
| pherDebuffs | №0078 |
| pheromone | №1117 (+ 1 других файлов) |
| pheromoneOwner | №1117 |
| pheromoneSave | №0078 |
| pheromoneTarget | №1117 (+ 1 других файлов) |
| phi | №0058 (+ 2 других файлов) |
| phone | №1149 (+ 2 других файлов) |
| phoneProtected | №1177 |
| phoneTraveller | №1177 |
| physical | №0655 (+ 1 других файлов) |
| physicalKey | №0833 |
| pi | №0068 (+ 5 других файлов) |
| pick | №0061 (+ 9 других файлов) |
| picked | №0641 (+ 1 других файлов) |
| picker | №0063 |
| picks | №0078 |
| pid | №0670 (+ 1 других файлов) |
| pigmentClass | №0078 |
| pigmentist | №1118 |
| pinch | №0863 |
| pink | №0061 |
| PINNED_COMMIT | №1357 |
| pInput | №0790 |
| pipe | №1121 (+ 20 других файлов) |
| pitch | №0063 (+ 3 других файлов) |
| pivot | №0058 |
| pixel | №1329 |
| pixels | №1311 (+ 19 других файлов) |
| pl | №0693 (+ 2 других файлов) |
| plan | №0665 (+ 4 других файлов) |
| plane | №0061 (+ 1 других файлов) |
| PLANES | №0632 |
| plannedMove | №0811 |
| plates | №0061 |
| playable | №0821 |
| playBtn | №0082 |
| played | №1177 |
| plumage | №0061 |
| plume | №0061 |
| plus | №0058 (+ 1 других файлов) |
| pn | №0061 |
| po | №0779 |
| point | №0061 (+ 2 других файлов) |
| pointCostDiff | №0624 (+ 1 других файлов) |
| pointers | №0863 |
| points | №0061 (+ 10 других файлов) |
| pointsLeftEl | №0624 (+ 1 других файлов) |
| poisonBomb | №1118 |
| poisonedAttacker | №1117 |
| poisonedCombatant | №1117 |
| poisonedStrike | №1117 |
| poisonedWeaponAttack | №1118 |
| poisonImmuneTarget | №1117 |
| poisonPreview | №1117 |
| poisonWeapon | №0078 |
| poisonWeaponId | №0078 |
| pole | №0058 |
| policy | №0672 |
| poly | №0061 (+ 1 других файлов) |
| polygon | №0061 |
| pool | №0078 (+ 5 других файлов) |
| poolKind | №0078 |
| pools | №0079 |
| portraitBounds | №0886 |
| pos | №0058 (+ 10 других файлов) |
| pose | №0061 |
| posed | №0065 |
| poses | №0065 |
| position | №0818 |
| positionCounts | №1169 |
| positions | №0058 (+ 5 других файлов) |
| possibleIdElements | №0792 |
| potency | №0079 (+ 1 других файлов) |
| potential | №0061 |
| potion | №0078 (+ 2 других файлов) |
| potionColor | №0078 |
| potionIndex | №1213 |
| potions | №0078 |
| pounds | №0818 |
| power | №0061 (+ 1 других файлов) |
| pp | №0081 (+ 4 других файлов) |
| pPerG | №0790 |
| ppInput | №0790 |
| ppVal | №0790 |
| pr | №0641 (+ 2 других файлов) |
| pre | №0077 |
| predicate | №0061 |
| predict | №1143 |
| predictorTrump | №0655 |
| preFeatSelect | №0700 |
| preferPact | №0648 |
| prefix | №0789 (+ 3 других файлов) |
| preloadPath | №1358 |
| prep | №1268 |
| PREP | №0803 (+ 1 других файлов) |
| prepared | №0641 (+ 3 других файлов) |
| preparedAny | №0811 |
| preparedCount | №0836 |
| preparedFormula | №0078 |
| preparedReaction | №0811 |
| preparedReservation | №0811 |
| prepProfile | №0836 |
| prereq | №0844 |
| preS | №0700 |
| preS1 | №0700 |
| preS2 | №0700 |
| preset | №0062 (+ 3 других файлов) |
| presets | №0066 (+ 1 других файлов) |
| preStats | №0700 |
| prev | №0058 (+ 2 других файлов) |
| preview | №0793 (+ 2 других файлов) |
| previous | №0058 (+ 11 других файлов) |
| previousAC | №0829 |
| previousActive | №0773 |
| previousCount | №1134 |
| previousFetch | №1153 (+ 1 других файлов) |
| previousMageCrypto | №1179 |
| previousRoot | №0773 |
| price | №0667 (+ 1 других файлов) |
| prim | №1157 |
| primary | №0081 (+ 1 других файлов) |
| primaryStat | №0693 |
| prime | №0779 |
| prior | №1202 (+ 2 других файлов) |
| prismaticIndex | №0078 |
| prismaticOptions | №0078 |
| prismAttack | №1118 |
| prismTester | №1118 |
| probe | №0061 (+ 1 других файлов) |
| proceed | №0700 |
| process | №1287 (+ 2 других файлов) |
| processedNames | №0826 |
| processing | №0663 (+ 1 других файлов) |
| PROCESSING | №0672 |
| PROCESSING_DC_BY_RARITY | №0826 |
| PROCESSING_RECIPES | №0673 |
| PROCESSING_TOOL_BY_TYPE | №0826 |
| product | №0080 |
| prof | №0793 (+ 8 других файлов) |
| profBlock | №0745 |
| profBonus | №0624 (+ 4 других файлов) |
| profession | №0673 (+ 2 других файлов) |
| professionBonus | №0080 |
| professionId | №0670 |
| professionLayer | №0672 |
| professions | №0673 |
| PROFESSIONS | №0670 (+ 2 других файлов) |
| PROFICIENCIES_DB | №0822 |
| proficiencyBonus | №0772 |
| proficiencyChoiceHtml | №0700 |
| proficiencyType | №0793 |
| proficient | №0655 (+ 2 других файлов) |
| profId | №0822 (+ 1 других файлов) |
| profIds | №0823 |
| profile | №0058 (+ 11 других файлов) |
| profiles | №0062 (+ 6 других файлов) |
| profInput | №0836 |
| profName | №0823 (+ 1 других файлов) |
| profObj | №0823 (+ 1 других файлов) |
| profOk | №0878 |
| profs | №0793 (+ 3 других файлов) |
| prog | №0073 (+ 4 других файлов) |
| progress | №0819 |
| progressFrame | №0843 |
| progressHandler | №0842 |
| progression | №0077 (+ 11 других файлов) |
| progressPercent | №0780 |
| projected | №0789 (+ 1 других файлов) |
| projection | №0061 |
| projectManifest | №0853 |
| Promise | №1158 (+ 2 других файлов) |
| prompts | №1203 |
| prop | №0078 (+ 2 других файлов) |
| propContainer | №0791 |
| PROPERTIES | №0079 |
| proportions | №1357 |
| props | №0062 (+ 1 других файлов) |
| propTitle | №0791 |
| protectedCase | №1116 |
| protectedHero | №1177 |
| protectedKeys | №0832 |
| proto | №0653 |
| protocol | №0886 |
| proxy | №0811 (+ 1 других файлов) |
| ps | №0069 (+ 2 других файлов) |
| psiLimit | №0714 |
| psion | №1273 |
| psionDisciplines | №0779 |
| pt | №0641 |
| pu | №1273 |
| pugilist | №1199 |
| pugilistAC | №0655 |
| pugilistDefender | №0655 |
| pugilistDigDeepResistant | №0655 |
| pugilistLevelEntry | №0655 |
| pugilistPack | №0655 |
| pugilistSchool | №0655 |
| pugilistState | №0655 |
| pugilistStudy | №0655 |
| pupilDiagnostics | №1321 |
| pupilRound | №1321 |
| pupilSelect | №0063 |
| puppet | №1203 |
| puppetTarget | №0641 |
| puppetWeapon | №0641 |
| purity | №0079 (+ 1 других файлов) |
| pursuits | №0829 |
| pw | №1357 |
| PW | №0072 |
| px | №0061 (+ 2 других файлов) |
| PX | №0072 |
| py | №0063 (+ 1 других файлов) |
| PY | №0072 |
| pz | №0063 |
| q | №0058 (+ 37 других файлов) |
| Q | №0058 |
| q0 | №0061 |
| q1 | №0061 |
| qApi | №0793 |
| qd | №0674 |
| qi | №0783 |
| ql | №0058 |
| qn | №0065 |
| qr | №0779 |
| qs | №1177 |
| qty | №0664 (+ 1 других файлов) |
| quality | №0063 (+ 6 других файлов) |
| QUALITY | №0667 (+ 2 других файлов) |
| QUALITY_GRADES | №0664 |
| QUALITY_TIERS | №0665 |
| qualityFactor | №0664 |
| qualityKey | №0808 |
| qualityPenalty | №0664 |
| quantity | №0792 (+ 2 других файлов) |
| queen | №1177 |
| queenReceipt | №1177 |
| query | №0070 (+ 1 других файлов) |
| queue | №0818 (+ 1 других файлов) |
| queued | №0656 |
| quickGather | №0825 |
| quota | №0059 (+ 1 других файлов) |
| r | №0059 (+ 205 других файлов) |
| R | №0061 (+ 11 других файлов) |
| r0 | №0061 |
| r1 | №0061 (+ 2 других файлов) |
| r2 | №0772 (+ 1 других файлов) |
| race | №0063 (+ 11 других файлов) |
| raceDesc | №0646 |
| raceEntry | №0063 |
| raceId | №0066 (+ 7 других файлов) |
| raceImmune | №0655 |
| raceLabel | №0646 |
| raceList | №0672 |
| raceName | №0624 (+ 1 других файлов) |
| raceObj | №0824 |
| raceResistant | №0655 |
| races | №0066 (+ 3 других файлов) |
| raceSelect | №0624 (+ 2 других файлов) |
| rad | №0061 (+ 1 других файлов) |
| radial | №0061 |
| radii | №0061 |
| radius | №0058 (+ 5 других файлов) |
| raf | №0626 |
| raging | №0655 |
| raise | №0061 |
| rampage | №0656 |
| randIdx | №0082 |
| random | №1144 |
| randomSequence | №1198 |
| randomValue | №1198 |
| randomXOffset | №0772 |
| randomYOffset | №0772 |
| range | №0641 (+ 6 других файлов) |
| rangedIncoming | №0655 |
| rangeFt | №0811 |
| ranger | №1270 |
| rangeU | №1138 |
| rangeV | №1138 |
| rank | №0655 (+ 2 других файлов) |
| RANKS | №0821 |
| raphe | №0058 |
| rare | №0808 |
| rarity | №0667 (+ 4 других файлов) |
| RARITY | №0799 |
| RARITY_WEIGHT | №0878 |
| rarityOrder | №0793 |
| rate | №0061 (+ 1 других файлов) |
| ratio | №0073 (+ 3 других файлов) |
| rats | №0061 |
| raw | №0060 (+ 32 других файлов) |
| rawCat | №0802 |
| rawDestination | №1849 |
| rawItems | №0836 |
| rawParts | №0655 |
| rawRadial | №0062 |
| rawStats | №0793 |
| rawTotal | №0655 |
| rb | №0799 (+ 1 других файлов) |
| rBottom | №0063 |
| rd | №0779 (+ 1 других файлов) |
| rd0 | №0813 |
| re | №0813 (+ 1 других файлов) |
| reach | №0061 |
| reacted | №1177 |
| reaction | №0655 (+ 5 других файлов) |
| reactionButton | №1266 |
| reactionCtx | №0655 (+ 1 других файлов) |
| reactionReduction | №0655 |
| reactionResult | №0655 |
| reactions | №0811 |
| REACTIONS | №0829 |
| read | №0818 (+ 1 других файлов) |
| Readable | №0886 |
| reader | №0832 (+ 2 других файлов) |
| readGlb | №1121 (+ 5 других файлов) |
| readIndex | №1166 (+ 1 других файлов) |
| ready | №0818 (+ 3 других файлов) |
| reagentCount | №0078 |
| reagentGain | №0078 |
| reagentRoll | №0078 |
| reagentsBefore | №1118 |
| reagentTarget | №1118 |
| real | №1358 |
| realAttack | №1185 |
| realCrypto | №1179 |
| realSave | №1191 |
| realSet | №1149 |
| rear | №0061 |
| reason | №0666 (+ 7 других файлов) |
| rebuildMaterialUsage | №0672 |
| rec | №0745 (+ 4 других файлов) |
| receipt | №0074 (+ 1 других файлов) |
| receiptKey | №1149 |
| received | №0802 (+ 2 других файлов) |
| recharge | №0078 (+ 11 других файлов) |
| recipe | №0078 (+ 7 других файлов) |
| recipeId | №0668 |
| recipes | №0667 |
| RECIPES | №0668 (+ 2 других файлов) |
| recipient | №0641 (+ 1 других файлов) |
| record | №0060 (+ 1 других файлов) |
| recorded | №0818 |
| records | №0061 (+ 3 других файлов) |
| recovered | №0665 (+ 1 других файлов) |
| RECOVERY_BY_DURABILITY | №0664 |
| RECOVERY_BY_QUALITY | №0665 |
| red | №0648 |
| reduce | №0871 |
| reduced | №0641 |
| reduction | №0648 |
| ref | №0061 (+ 26 других файлов) |
| reference | №0061 (+ 1 других файлов) |
| referenceNode | №0790 |
| refresh | №0674 |
| refreshBase | №0674 |
| refreshing | №0653 |
| refs | №0080 (+ 3 других файлов) |
| refunded | №0811 |
| reg | №1267 |
| regeneration | №1118 |
| RegExp | №0663 (+ 6 других файлов) |
| region | №0063 (+ 2 других файлов) |
| REGION_MOD | №0799 |
| regionId | №0878 |
| regions | №0059 (+ 4 других файлов) |
| REGIONS | №0878 |
| registered | №1117 (+ 8 других файлов) |
| registry | №0058 (+ 3 других файлов) |
| reject | №0832 (+ 6 других файлов) |
| rejected | №1154 (+ 1 других файлов) |
| rel | №0801 (+ 6 других файлов) |
| relative | №0886 (+ 2 других файлов) |
| release | №1149 |
| releaseGate | №1115 |
| relief | №0078 |
| reliefCount | №0061 |
| reliefResult | №1118 |
| reliefTarget | №1118 |
| reloaded | №1185 |
| relocateGameplayPanels | №0772 |
| rem | №0790 |
| remaining | №0078 (+ 5 других файлов) |
| remainingReduction | №0655 |
| remote | №0651 (+ 2 других файлов) |
| remoteHead | №1116 |
| remoteStatus | №1177 |
| remove | №0063 |
| removeAt | №0078 |
| removed | №0058 (+ 5 других файлов) |
| removedGraft | №0078 |
| removeFromContainer | №0789 |
| render | №0079 (+ 7 других файлов) |
| renderList | №0668 (+ 1 других файлов) |
| renderRecipes | №0672 |
| renderTabs | №0671 |
| renderTools | №0672 |
| rep | №0061 |
| repair | №1151 |
| REPAIR_COST_PER_10 | №0664 |
| REPAIR_PROFILES | №0665 |
| repairBtn | №0793 |
| repairCount | №0664 |
| repaired | №1150 |
| repairPlan | №1150 |
| repCfg | №0061 |
| repeatBtn | №0082 |
| replace | №0641 (+ 1 других файлов) |
| replacement | №1179 |
| repo | №1849 |
| report | №0793 (+ 10 других файлов) |
| repSelect | №0063 |
| reptileCoreCache | №0061 |
| reptilePart | №0063 |
| req | №0648 (+ 52 других файлов) |
| reqHtml | №0745 |
| reqR | №0779 |
| reqs | №0786 |
| reqText | №0670 (+ 1 других файлов) |
| request | №0886 (+ 2 других файлов) |
| requested | №0648 (+ 3 других файлов) |
| requestedAoe | №0811 |
| requestedFeature | №0078 |
| requestedForm | №0779 |
| requestId | №0811 |
| requests | №1202 |
| require | №1287 (+ 1 других файлов) |
| required | №0670 (+ 1 других файлов) |
| requiredEnd | №1171 |
| requiredLevel | №0078 (+ 1 других файлов) |
| requireLevel | №0779 |
| requireTool | №0670 |
| reroll | №0648 (+ 3 других файлов) |
| res | №0648 (+ 45 других файлов) |
| resBox | №0647 (+ 2 других файлов) |
| resDiv | №0791 |
| reservation | №0835 |
| reserved | №0811 |
| reset | №0063 (+ 2 других файлов) |
| resetBuffer | №1119 |
| resist | №0850 |
| resistance | №0078 (+ 1 других файлов) |
| resistanceType | №0078 |
| resistanceTypes | №0078 |
| resistant | №0655 |
| resistantFire | №1117 |
| resistantTarget | №1198 |
| resisted | №1198 |
| resMap | №0648 |
| resolve | №0832 (+ 8 других файлов) |
| resolved | №0068 (+ 1 других файлов) |
| resolvedParts | №0655 |
| resource | №0783 (+ 2 других файлов) |
| RESOURCE_HINTS | №0825 |
| RESOURCE_PROCESSING | №0826 |
| RESOURCE_YIELDS | №0826 |
| resourceBefore | №1198 |
| resourceDefs | №0827 |
| resourceId | №0825 |
| resourceKind | №0811 |
| resources | №0878 (+ 1 других файлов) |
| response | №0842 (+ 3 других файлов) |
| responses | №1148 (+ 1 других файлов) |
| rest | №0779 (+ 2 других файлов) |
| restarted | №1149 |
| rested | №1189 |
| restId | №0821 (+ 1 других файлов) |
| restored | №0648 (+ 13 других файлов) |
| restoredShort | №0647 |
| restoredUse | №1118 |
| restoreFullCheckbox | №0700 |
| restoreUsed | №0078 |
| restStr | №0836 |
| result | №0061 (+ 63 других файлов) |
| resultPending | №0811 |
| results | №0065 (+ 10 других файлов) |
| resultText | №0647 (+ 1 других файлов) |
| resume | №0811 (+ 1 других файлов) |
| resumed | №0818 (+ 1 других файлов) |
| resumedStand | №1177 |
| resumeSpell | №0811 |
| retries | №0821 |
| retry | №0843 |
| returned | №1177 |
| returnedDash | №1177 |
| reused | №0889 |
| rev | №0811 |
| reveal | №0819 |
| reverse | №0062 |
| revision | №0653 (+ 2 других файлов) |
| revival | №1117 |
| revived | №1118 |
| revivedFromZero | №0655 |
| reward | №0670 (+ 4 других файлов) |
| rewardId | №0821 |
| rewards | №0670 |
| rewardX | №0819 |
| rewardY | №0819 |
| rgb | №0063 |
| rht | №0779 |
| ri | №1167 |
| rid | №0871 (+ 2 других файлов) |
| rider | №0838 |
| ridge | №1141 |
| RIDGE_STYLES | №0066 |
| ridges | №0061 |
| ridgeSelect | №0063 |
| ridgeStyle | №1348 |
| right | №0061 (+ 4 других файлов) |
| rigid | №1123 |
| ring | №0058 (+ 1 других файлов) |
| ringCount | №0058 |
| rings | №0062 |
| rise | №0062 (+ 2 других файлов) |
| risk | №0079 (+ 1 других файлов) |
| rite | №0641 (+ 2 других файлов) |
| riteId | №0779 |
| riteKnown | №0813 |
| riteMax | №0779 |
| riteNames | №0641 |
| rites | №0779 (+ 1 других файлов) |
| riteTypes | №0641 |
| rl | №0061 |
| rm | №0655 (+ 1 других файлов) |
| rn | №0813 |
| rn0 | №0813 |
| rn2 | №0813 |
| ro | №1263 |
| robe | №0061 |
| rock | №0063 |
| rogue | №1186 (+ 3 других файлов) |
| role | №0061 (+ 3 других файлов) |
| roleName | №0629 |
| roles | №0673 |
| roll | №0074 (+ 18 других файлов) |
| rolled | №0078 (+ 7 других файлов) |
| rolledRelief | №1118 |
| roller | №0805 (+ 1 других файлов) |
| rollMode | №0647 |
| rollResult | №1198 |
| rolls | №0647 (+ 9 других файлов) |
| rollTypeClass | №0772 (+ 1 других файлов) |
| roofColor | №0063 |
| room | №0816 |
| root | №0061 (+ 99 других файлов) |
| ROOT | №0663 (+ 10 других файлов) |
| rootId | №0853 (+ 1 других файлов) |
| roots | №0061 (+ 4 других файлов) |
| rootSurface | №0058 |
| rootT | №0061 |
| rootY | №0061 |
| rootZ | №0061 |
| roster | №0651 (+ 1 других файлов) |
| rotation | №0063 |
| rough | №0820 (+ 1 других файлов) |
| round | №0805 (+ 1 других файлов) |
| round4 | №1357 |
| rounds | №0833 |
| roundTracker | №0655 |
| roundTrip | №1120 |
| route | №1319 (+ 1 других файлов) |
| routed | №0648 |
| row | №0061 (+ 12 других файлов) |
| rows | №0061 (+ 11 других файлов) |
| ROWS | №0628 |
| rp | №1213 |
| rq | №1264 (+ 1 других файлов) |
| rr | №0061 (+ 8 других файлов) |
| rs | №0641 (+ 2 других файлов) |
| rt | №0648 (+ 1 других файлов) |
| rTop | №0063 |
| rule | №0063 (+ 11 других файлов) |
| rules | №0700 (+ 7 других файлов) |
| RULES | №0821 |
| run | №0073 (+ 2 других файлов) |
| ruName | №0700 (+ 1 других файлов) |
| rune | №0779 (+ 1 других файлов) |
| RUNEKEEPER_INSCRIBED | №0779 |
| runesBefore | №1208 |
| running | №0653 |
| runtime | №0803 (+ 33 других файлов) |
| runtimeFeatures | №0813 |
| runtimes | №0648 |
| runtimeSubclasses | №0813 |
| rw | №1357 |
| rx | №0061 (+ 4 других файлов) |
| rx2 | №0811 |
| ry | №0061 (+ 3 других файлов) |
| rz | №0061 (+ 3 других файлов) |
| rz2 | №0073 |
| s | №0058 (+ 174 других файлов) |
| S | №0072 (+ 1 других файлов) |
| s1 | №0700 |
| s2 | №0700 |
| sa | №0061 |
| safe | №0083 (+ 1 других файлов) |
| SAFE_FILE | №0889 |
| safeFeatureId | №0648 |
| safeGet | №0791 |
| safeName | №0654 |
| safeText | №0772 |
| salty | №1198 |
| saltyDC | №0779 |
| saltyEffect | №0648 |
| saltyHero | №1198 |
| saltyMods | №1198 |
| saltySave | №0779 |
| saltyTarget | №1198 |
| sam | №0068 |
| same | №0665 (+ 8 других файлов) |
| sample | №0061 (+ 4 других файлов) |
| sampleCount | №1171 |
| sampler | №0063 (+ 2 других файлов) |
| samples | №0061 (+ 1 других файлов) |
| sandbox | №1248 (+ 6 других файлов) |
| satin | №0063 |
| savage | №0779 |
| savantFlourish | №0655 |
| savantHP | №1208 |
| save | №0074 (+ 12 других файлов) |
| saveAdv | №0655 |
| saved | №0083 (+ 50 других файлов) |
| savedAlpha | №0832 |
| savedBg | №0868 |
| saveDC | №0641 |
| savedColor | №0868 |
| savedDim | №0868 |
| saveDebuffs | №0655 |
| savedFont | №0832 |
| savedHeritage | №1321 |
| saveDis | №0655 |
| savedOpacity | №0868 |
| savedRetreat | №1177 |
| savedSmall | №1321 |
| savedSurface | №1321 |
| savedTarget | №1205 |
| savedTheme | №0832 |
| savedWander | №1177 |
| saveResult | №0655 |
| saveRoll | №0784 (+ 2 других файлов) |
| saves | №0693 (+ 3 других файлов) |
| savesBeforeRefresh | №1179 |
| saveStat | №0779 |
| sb | №0670 (+ 2 других файлов) |
| sc | №0068 (+ 8 других файлов) |
| scale | №0058 (+ 11 других файлов) |
| scaled | №0063 |
| scalpBuckets | №0061 |
| scalpCache | №0061 |
| scalpSamples | №0061 |
| scene | №0069 (+ 3 других файлов) |
| scenes | №0063 |
| scheduleUpdate | №0792 |
| SCHEMA_VERSION | №0642 (+ 2 других файлов) |
| schoolDamageTarget | №1198 |
| schoolHero | №1198 |
| schoolSave | №1198 |
| schoolText | №0836 |
| scLower | №0836 |
| scope | №1844 |
| scoped | №0648 |
| score | №0061 (+ 8 других файлов) |
| scores | №0686 (+ 3 других файлов) |
| scoreSnapshots | №0078 |
| scout | №1173 |
| screen | №0815 (+ 1 других файлов) |
| script | №1116 |
| scripts | №1159 (+ 1 других файлов) |
| sctx | №1288 |
| sd | №0655 (+ 1 других файлов) |
| se | №0865 |
| sealDamage | №0698 |
| sealedHp | №1206 |
| seals | №0698 (+ 2 других файлов) |
| sealTarget | №1206 |
| seam | №0061 (+ 3 других файлов) |
| seamDamage | №1117 |
| seamGroups | №0058 |
| seamMax | №1121 (+ 1 других файлов) |
| seams | №0061 |
| searchInput | №0836 |
| searchVal | №0836 |
| second | №0818 (+ 1 других файлов) |
| secondary | №0061 |
| secondDead | №1118 |
| secondOpts | №0818 |
| seconds | №0818 |
| section | №0062 |
| seed | №0061 (+ 1 других файлов) |
| seekingAttack | №1118 |
| seen | №0074 (+ 6 других файлов) |
| seenEventIds | №0810 |
| seenNames | №0745 |
| seer | №1177 |
| seg | №0061 |
| segments | №0058 (+ 3 других файлов) |
| sel | №0646 (+ 5 других файлов) |
| select | №0063 (+ 6 других файлов) |
| selected | №0058 (+ 25 других файлов) |
| selected0 | №0661 (+ 1 других файлов) |
| selectedArmorCategory | №0791 |
| selectedAsset | №0070 |
| selectedBg | №0624 (+ 1 других файлов) |
| selectedChar | №0831 |
| selectedClass | №0624 (+ 2 других файлов) |
| selectedClassKey | №0700 |
| selectedClassName | №0700 |
| selectedClothes | №1319 |
| selectedFeatSelect | №0700 |
| selectedId | №0824 |
| selectedIds | №0713 |
| selectedNatural | №0078 |
| selectedRace | №0624 (+ 1 других файлов) |
| selectedSub | №0661 |
| selectedTarget | №0819 |
| selectedTrader | №0801 |
| selectedWeaponCategoryType | №0791 |
| selectedWeaponDice | №0791 |
| selectedWeaponProperties | №0791 |
| selectEl | №0791 |
| selectElem | №0796 |
| selector | №0792 |
| selectors | №0840 |
| selectScreen | №0624 (+ 1 других файлов) |
| selectType | №0791 |
| self | №0779 |
| selfActor | №0653 |
| sellFactor | №0800 |
| sellResult | №1213 |
| SEMVER | №0889 |
| send | №0886 |
| sent | №1256 (+ 7 других файлов) |
| sep | №0058 |
| seq | №0783 (+ 4 других файлов) |
| sequence | №1185 |
| serial | №1201 (+ 1 других файлов) |
| server | №1149 (+ 39 других файлов) |
| Server | №1177 (+ 1 других файлов) |
| session | №0060 (+ 4 других файлов) |
| SESSION | №0653 |
| set | №0789 (+ 2 других файлов) |
| Set | №0663 (+ 14 других файлов) |
| setInterval | №1243 (+ 5 других файлов) |
| setTimeout | №1150 (+ 35 других файлов) |
| settings | №0651 (+ 2 других файлов) |
| settingsPanel | №0832 |
| settled | №0820 |
| sf | №0648 (+ 1 других файлов) |
| sh | №0784 |
| sha | №1300 (+ 3 других файлов) |
| shader | №1143 |
| shaft | №0058 |
| shaftSources | №0058 |
| shape | №0058 (+ 2 других файлов) |
| shaped | №1141 |
| shapeInput | №0063 |
| shapes | №0059 (+ 1 других файлов) |
| shared | №0079 (+ 2 других файлов) |
| sharedAbility | №0078 |
| sharedAliases | №0078 |
| sharedMutagen | №1118 |
| sharedSnapshots | №0078 |
| sharp | №0061 |
| shaved | №0063 |
| sheer | №0063 |
| sheetScreen | №0624 (+ 1 других файлов) |
| shell | №0784 (+ 1 других файлов) |
| shellIX | №0061 |
| shellN | №0061 |
| shellP | №0061 |
| shellUV | №0061 |
| shield | №0655 (+ 3 других файлов) |
| shieldAccess | №0669 |
| shieldAvailable | №0648 |
| shieldBonus | №0793 |
| shielded | №0811 (+ 1 других файлов) |
| shieldRoll | №0655 |
| shieldSlot | №0648 |
| shieldSpent | №0648 |
| shipped | №1162 |
| shirt | №1128 |
| short | №0641 (+ 3 других файлов) |
| shortage | №0665 |
| shortKeys | №0786 (+ 1 других файлов) |
| shortToFull | №0700 |
| shot | №1186 (+ 1 других файлов) |
| shoulder | №0061 (+ 1 других файлов) |
| shoulderSpan | №0061 |
| shouldRestoreFull | №0700 |
| shouldUpdate | №0792 |
| showEP | №0790 |
| showPP | №0790 |
| shuffleBtn | №0082 |
| shutdownCalls | №1290 |
| si | №0061 (+ 3 других файлов) |
| side | №0059 (+ 6 других файлов) |
| sideIndex | №0061 |
| sides | №0063 (+ 11 других файлов) |
| sIdx | №0646 |
| sig | №0811 (+ 1 других файлов) |
| sightHero | №1177 |
| sign | №0065 (+ 2 других файлов) |
| signatures | №1125 (+ 5 других файлов) |
| signed | №0061 |
| signup | №0651 |
| sigTarget | №1198 |
| sigUses | №0811 |
| sin | №0058 |
| single | №0836 |
| singleBox | №0810 |
| singleWeightKg | №0792 |
| size | №0061 (+ 10 других файлов) |
| sizes | №0833 (+ 1 других файлов) |
| sk | №0772 |
| sKey | №0624 |
| skill | №0074 (+ 5 других файлов) |
| SKILL_STAT | №0808 |
| SKILL_TO_VAR_MAP | №0772 |
| skilledDesc | №0663 |
| skillId | №0624 (+ 4 других файлов) |
| skillName | №0772 |
| skillNameRu | №0624 |
| skills | №0624 (+ 3 других файлов) |
| SKILLS_CONFIG | №0083 |
| skillsConfig | №0772 |
| skillsDataObj | №0772 |
| skillsList | №0772 |
| skillsListContainer | №0822 |
| skillsPanel | №0822 (+ 1 других файлов) |
| skillsStr | №0624 (+ 1 других файлов) |
| skillStr | №0624 (+ 1 других файлов) |
| skin | №0059 (+ 5 других файлов) |
| skinBaseline | №1321 |
| skinColorEntry | №0063 |
| skinImages | №1119 |
| skinned | №1133 |
| skinnedPrimitives | №1160 (+ 1 других файлов) |
| skins | №0066 (+ 2 других файлов) |
| skip | №0061 (+ 1 других файлов) |
| skipped | №1186 |
| skirt | №1130 |
| skirtDepth | №0062 |
| skull | №0061 (+ 2 других файлов) |
| sky | №0073 |
| sl | №0061 (+ 6 других файлов) |
| sleep | №1177 |
| sleeve | №0062 |
| sleeveMasks | №0062 |
| sleeves | №0062 (+ 1 других файлов) |
| slices | №0061 |
| slider | №0063 |
| slimeAcid | №1117 |
| slimeAttacker | №1117 |
| slimeBombAttack | №1118 |
| slimeBomber | №1118 |
| slimeHit | №1117 |
| slimeResistantTarget | №1117 |
| slimeVictim | №1117 |
| slot | №0059 (+ 15 других файлов) |
| SLOT_LEVEL | №0844 |
| slot2 | №0779 |
| slot3 | №0779 |
| slot4 | №0779 |
| slotBefore | №1206 |
| slotData | №0836 |
| slotHtml | №0836 |
| slotLevel | №0779 |
| slotMax | №0813 |
| slotRowHtml | №0836 |
| slots | №0062 (+ 12 других файлов) |
| SLOTS | №0077 (+ 2 других файлов) |
| slotsBefore | №1208 |
| slotSnapshot | №0811 |
| sm | №0655 (+ 4 других файлов) |
| small | №0811 |
| smitePart | №0655 |
| smoke | №0843 |
| smooth | №0061 |
| sn | №0061 |
| snake | №0818 |
| snakeId | №1177 |
| snap | №0078 (+ 5 других файлов) |
| snapshot | №0060 (+ 6 других файлов) |
| snapshots | №0655 |
| snout | №0061 |
| sorted | №0793 |
| SOTDQ | №0631 |
| source | №0058 (+ 40 других файлов) |
| SOURCE | №0078 (+ 13 других файлов) |
| SOURCE_TAG | №0670 (+ 1 других файлов) |
| sourceArmor | №0793 |
| sourceCache | №0853 |
| sourceCheck | №0811 |
| sourceCommit | №1848 |
| sourceCount | №0826 |
| sourceGroups | №0700 |
| sourceHashes | №1306 (+ 1 других файлов) |
| sourceHtml | №0836 |
| sourceId | №0656 |
| sourceManifestUrl | №0842 |
| sourceMax | №1168 |
| sourceMean | №1168 |
| sourceMeshCount | №0063 |
| sources | №0641 (+ 10 других файлов) |
| sourceStats | №0816 |
| sourceTag | №0745 |
| sourceToken | №0656 |
| sourceWeapons | №0811 |
| sp | №0069 (+ 9 других файлов) |
| span | №0058 (+ 3 других файлов) |
| spanCurrent | №0780 |
| spanTotal | №0780 |
| sparks | №0843 |
| sparse | №1158 (+ 1 других файлов) |
| sparseJson | №1158 |
| spawn | №1148 |
| spd | №0628 (+ 3 других файлов) |
| spear | №0669 |
| spec | №0657 (+ 7 других файлов) |
| specHtml | №0670 |
| specialBombEffects | №0078 |
| SPECIALIZATIONS | №0670 |
| specId | №0670 |
| species | №0839 |
| specificClass | №0700 |
| specificProf1 | №0823 |
| specificProf2 | №0823 |
| specificProf3 | №0823 |
| specificSources | №0745 |
| specs | №0670 |
| spectral | №0063 |
| speed | №0656 (+ 3 других файлов) |
| speedInput | №0824 |
| speedVal | №0824 |
| spell | №0648 (+ 7 других файлов) |
| spellbladeDeflection | №0655 |
| spellbladeOnly | №0827 |
| SPELLCASTING_CLASSES | №0836 |
| spellcastingCard | №0836 |
| spellClass | №0836 |
| spellDamageMods | №0811 (+ 1 других файлов) |
| spellDesc | №0836 |
| spellId | №0819 |
| spellLevel | №0648 (+ 4 других файлов) |
| spellList | №0077 (+ 1 других файлов) |
| spellName | №0803 (+ 4 других файлов) |
| spellNameEscaped | №0836 |
| spellObj | №0836 |
| spellPayload | №0811 |
| spellReaction | №0811 |
| spells | №0803 (+ 4 других файлов) |
| SPELLS_KNOWN | №0077 |
| spellsByLevel | №0803 |
| spellsHtml | №0836 |
| spellSourcesNow | №0827 |
| spent | №0624 (+ 11 других файлов) |
| spentLevel | №0648 |
| sPerG | №0790 |
| spine | №0061 |
| spInput | №0790 |
| spiritAttacks | №0784 |
| spiritAuto | №1198 |
| spiritHp | №0779 |
| spiritMax | №0779 |
| spiritRestored | №0779 |
| spirits | №0844 |
| splay | №0061 |
| spread | №0061 |
| spVal | №0790 |
| sq | №0061 |
| sql | №1111 |
| squares | №1143 |
| squircle | №0061 |
| sr | №0648 (+ 6 других файлов) |
| src | №0059 (+ 34 других файлов) |
| srcA | №0836 |
| srcALower | №0836 |
| srcB | №0836 |
| srcBLower | №0836 |
| ss | №0655 (+ 1 других файлов) |
| st | №0061 (+ 7 других файлов) |
| stability | №0079 (+ 1 других файлов) |
| stableFound | №1299 |
| stableLegacy | №1299 |
| stack | №0664 (+ 1 других файлов) |
| stageCount | №1299 |
| staged | №1153 (+ 2 других файлов) |
| STAGED_KEY | №0842 |
| stageManifestUrl | №0842 |
| stairs | №0076 (+ 1 других файлов) |
| stale | №1286 (+ 2 других файлов) |
| stalker | №1273 |
| stance | №0779 |
| STAND_TURN_FLAGS | №0818 |
| standard | №1144 |
| standardRaceIds | №1297 |
| standing | №1177 |
| standPC | №1177 |
| standPhone | №1177 |
| standRoster | №1177 |
| standServer | №1177 |
| start | №0061 (+ 12 других файлов) |
| started | №0783 (+ 1 других файлов) |
| startI | №1167 (+ 1 других файлов) |
| startingProfession | №0646 |
| startupRun | №0842 |
| startVol | №0082 |
| startY | №0062 |
| stat | №0074 (+ 13 других файлов) |
| STAT_ALIASES | №0827 |
| STAT_META | №0869 |
| STAT_NAMES | №0643 |
| stat2 | №0700 |
| statBonus | №0745 |
| statBonusKeys | №0745 |
| state | №0059 (+ 43 других файлов) |
| statElem | №0836 |
| stateOnly | №1302 |
| states | №0839 |
| statId | №0624 (+ 2 других файлов) |
| statKey | №0624 (+ 6 других файлов) |
| statKeysMap | №0700 |
| statMod | №0647 (+ 2 других файлов) |
| statName | №0772 |
| statNames | №0624 (+ 1 других файлов) |
| statNameShort | №0772 |
| statNamesShort | №0624 (+ 1 других файлов) |
| statOptions | №0647 (+ 1 других файлов) |
| stats | №0786 (+ 11 других файлов) |
| STATS | №0643 |
| STATS_CONFIG | №0083 |
| statsConfig | №0772 |
| statSelect | №0654 |
| statsGrid | №0772 |
| statsList | №0647 |
| status | №0832 (+ 8 других файлов) |
| STATUS | №0660 |
| statusClass | №0660 |
| statusEl | №0082 |
| statusPC | №1177 |
| statusPhone | №1177 |
| statusServer | №1177 |
| statusText | №0772 (+ 1 других файлов) |
| steel | №0063 |
| stem | №0067 (+ 2 других файлов) |
| stems | №1306 |
| stench | №1118 |
| stenchTarget | №1118 |
| step | №0061 (+ 5 других файлов) |
| steps | №0073 (+ 2 других файлов) |
| stepTime | №0082 |
| sternumSpan | №0061 |
| stock | №0800 |
| stone | №0871 |
| stop | №0656 |
| stopped | №0820 |
| storage | №0653 (+ 3 других файлов) |
| STORAGE_KEY | №0666 (+ 2 других файлов) |
| store | №1126 (+ 5 других файлов) |
| stored | №1258 |
| str | №0792 (+ 12 других файлов) |
| strand | №0061 |
| strap | №0062 |
| stream | №0889 |
| strength | №0792 |
| strenuous | №0825 |
| stride | №0062 (+ 9 других файлов) |
| strikeHP | №1207 |
| String | №0663 (+ 23 других файлов) |
| strInput | №0792 |
| stripped | №0811 |
| strMod | №0772 |
| structureBlast | №1117 |
| structureTarget | №1117 |
| studied | №0779 (+ 1 других файлов) |
| style | №0061 (+ 7 других файлов) |
| STYLE_ID | №0843 |
| styleEl | №0793 |
| styles | №0779 (+ 5 других файлов) |
| styleTag | №0832 (+ 1 других файлов) |
| sub | №0074 (+ 9 других файлов) |
| subByName | №0795 |
| subclass | №1159 (+ 3 других файлов) |
| SUBCLASS_FEATURES | №0648 |
| SUBCLASS_MAP | №0648 |
| subclasses | №0641 (+ 6 других файлов) |
| subclassHtml | №0700 |
| subclassLevel | №0778 |
| subclassName | №0713 (+ 1 других файлов) |
| subclassPacks | №0871 |
| subclassResult | №1118 |
| subclassSelect | №0700 |
| subData | №0713 |
| subFeatures | №0795 |
| subId | №0078 |
| subIds | №0872 |
| subject | №0818 |
| subOptionsHtml | №0700 |
| subpacks | №0078 |
| subs | №0078 (+ 2 других файлов) |
| SUBS | №0821 (+ 1 других файлов) |
| subVal | №0780 |
| success | №0074 (+ 6 других файлов) |
| suffix | №0661 |
| suit | №0819 (+ 3 других файлов) |
| suite | №0854 (+ 1 других файлов) |
| SUITS | №0821 |
| sum | №0058 (+ 16 других файлов) |
| summary | №0063 (+ 10 других файлов) |
| summonX | №0819 |
| summonY | №0819 |
| sums | №0061 (+ 2 других файлов) |
| sumSq | №1167 |
| sUp | №0745 |
| supernatural | №0779 |
| supportedSave | №1208 |
| suppressBodyHP | №0647 |
| surface | №0061 (+ 2 других файлов) |
| surfaceDiagnostics | №1321 |
| surfaceKind | №0063 |
| surfaceSelect | №0063 |
| surfaceUrl | №0063 |
| surge | №1196 (+ 1 других файлов) |
| surprised | №0648 |
| sv | №0069 (+ 6 других файлов) |
| sv2 | №0779 |
| swap | №0821 |
| swapped | №1177 |
| swarm | №0063 |
| swarmForm | №0063 |
| swarmLimits | №0066 |
| swarmMotion | №0063 |
| swift | №0779 |
| swiperContainer | №0822 (+ 1 других файлов) |
| sx | №0061 (+ 3 других файлов) |
| sy | №0061 (+ 3 других файлов) |
| synapse | №1118 |
| synapseInstall | №1118 |
| synapseRecord | №0078 |
| sync | №0887 |
| syncRequested | №0810 |
| synergies | №0079 (+ 1 других файлов) |
| SYNERGY | №0079 |
| synergySet | №0079 |
| sys | №0063 (+ 18 других файлов) |
| sz | №0061 (+ 3 других файлов) |
| t | №0058 (+ 104 других файлов) |
| T | №0058 (+ 2 других файлов) |
| t2 | №0813 |
| ta | №0779 |
| tab | №0070 (+ 4 других файлов) |
| tabButtons | №0793 |
| table | №0641 (+ 6 других файлов) |
| tabs | №0671 |
| tabsContainer | №0793 |
| tabsNav | №0868 |
| tabsWrapper | №0793 |
| tacticalBack | №1177 |
| tacticalPC | №1177 |
| tacticalPhone | №1177 |
| tacticalRoster | №1177 |
| tacticalServer | №1177 |
| tactics | №0872 |
| tag | №0061 (+ 15 других файлов) |
| tagOk | №0802 |
| tags | №0061 (+ 9 других файлов) |
| tail | №0061 |
| tailEnd | №0061 |
| tailRoot | №0061 |
| take | №0641 (+ 7 других файлов) |
| takeFromContainer | №0789 |
| taken | №0074 |
| tal | №0779 |
| tampered | №1294 |
| tangent | №0061 |
| taper | №0061 (+ 1 других файлов) |
| tapLength | №0797 |
| target | №0058 (+ 49 других файлов) |
| targetActor | №0818 |
| targetChar | №0831 |
| targetCharId | №0831 |
| targetClass | №0786 (+ 1 других файлов) |
| targetClasses | №0655 |
| targetClassesForSlime | №0655 |
| targetContent | №0793 |
| targetCopy | №0821 |
| targetGrafts | №0655 |
| targetGrappled | №0779 |
| targetH | №0073 |
| targetHasArmor | №0655 |
| targetId | №0656 (+ 6 других файлов) |
| targetIsPugilist | №0655 |
| targetLabels | №1091 |
| targetLevel | №0700 (+ 1 других файлов) |
| targetList | №0656 |
| targetLvl | №0832 |
| targetMeshIndex | №1157 |
| targetName | №0656 |
| targetParent | №0790 |
| targetPath | №1157 (+ 3 других файлов) |
| targetPrim | №1157 |
| targetPrimIndex | №1157 |
| targetProfId | №0823 (+ 1 других файлов) |
| targetProgress | №0843 |
| targetReports | №1169 |
| targetResistances | №0655 |
| targets | №0061 (+ 9 других файлов) |
| targetSnapshot | №0818 |
| targetTok | №0656 |
| targetToken | №0656 |
| targetType | №0813 |
| targetVol | №0082 |
| targetW | №0073 |
| tarot | №0655 (+ 1 других файлов) |
| tarotAC | №0655 |
| tarotActor | №0772 |
| tarotAdv | №0655 |
| tarotCast | №0835 |
| tarotCheck | №0811 |
| tarotDis | №0655 |
| tarotFactor | №0655 |
| tarotForced | №0655 |
| tarotIgnoresResistance | №0655 |
| tarotInitiative | №0773 |
| tarotMod | №0655 |
| tarotOwner | №0773 |
| tarotReroll | №0655 |
| tarotRound | №0783 |
| tarotSave | №0655 |
| tarotScene | №0655 |
| tarotTurnId | №0773 |
| TASKS | №0858 |
| tavern | №1849 |
| tb | №0808 |
| tc | №0779 (+ 1 других файлов) |
| team | №0811 |
| teeth | №0061 |
| teleportAllyId | №0819 |
| teleportX | №0819 |
| teleportY | №0819 |
| temp | №0655 (+ 6 других файлов) |
| TEMPER | №0801 |
| tempHp | №0779 |
| template | №0655 (+ 1 других файлов) |
| term | №1163 |
| terms | №1163 (+ 2 других файлов) |
| terror | №0061 |
| test | №0843 (+ 2 других файлов) |
| testDir | №1358 |
| testRecipe | №1150 |
| tests | №1301 |
| tets | №0061 |
| tex | №0062 (+ 2 других файлов) |
| text | №0063 (+ 26 других файлов) |
| textColor | №0772 |
| TextDecoder | №1121 (+ 21 других файлов) |
| textSpan | №0772 |
| texture | №0069 (+ 3 других файлов) |
| textures | №1849 |
| th | №0073 (+ 1 других файлов) |
| theftRef | №0819 |
| theme | №0832 |
| themed | №0673 |
| themeKey | №0832 |
| themeSelect | №0832 |
| theta | №0058 (+ 1 других файлов) |
| thick | №1319 |
| thickness | №0061 |
| thigh | №0059 |
| thin | №1319 |
| THIRD_CASTERS | №0827 |
| THR | №0809 |
| thresholds | №0805 (+ 1 других файлов) |
| THRESHOLDS | №0805 |
| thumbDir | №0061 |
| thumbEnd | №0061 |
| thumbRoot | №0061 |
| thumbs | №0868 |
| thumbSide | №0061 |
| ti | №0061 (+ 3 других файлов) |
| tick | №0811 |
| tid | №0656 |
| tie | №1120 |
| tier | №0665 |
| tile | №0062 |
| time | №0068 (+ 4 других файлов) |
| timedHero | №1118 |
| timeout | №0653 (+ 1 других файлов) |
| timer | №0653 (+ 3 других файлов) |
| timers | №1149 |
| times | №0068 |
| timeSpan | №0772 |
| timeStr | №0790 |
| timeString | №0772 |
| tint | №0063 |
| tiny | №1207 |
| tip | №0058 (+ 1 других файлов) |
| tipSelect | №0063 |
| title | №0063 (+ 7 других файлов) |
| titleEl | №0792 (+ 1 других файлов) |
| titleElem | №0796 (+ 1 других файлов) |
| titleText | №0836 |
| tl | №0058 (+ 1 других файлов) |
| tm | №0772 (+ 1 других файлов) |
| tmax | №0073 |
| tmin | №0073 |
| tmp | №0889 |
| tn | №1160 (+ 1 других файлов) |
| to | №0632 (+ 3 других файлов) |
| toggle | №0666 |
| toggleContainer | №0789 |
| tok | №0656 (+ 2 других файлов) |
| token | №0653 (+ 3 других файлов) |
| tokens | №0067 (+ 1 других файлов) |
| tool | №0636 (+ 10 других файлов) |
| TOOL_IDS | №0668 |
| TOOL_LABELS | №0668 |
| toolbar | №0789 |
| toolBox | №0819 |
| toolId | №0808 |
| toolLabel | №0819 |
| toolMatrix | №0672 |
| toolOk | №0878 |
| toolProficient | №0819 |
| tools | №0081 (+ 5 других файлов) |
| TOOLS | №0672 |
| toolsStr | №0624 (+ 1 других файлов) |
| toolStat | №0819 |
| toolStr | №0646 |
| toolText | №0819 |
| tooth | №0061 |
| toothColor | №1321 |
| toothPart | №0061 |
| top | №0058 (+ 5 других файлов) |
| topology | №1133 |
| topRow | №0793 |
| torso | №0061 (+ 1 других файлов) |
| total | №0061 (+ 35 других файлов) |
| totalAtk | №0836 |
| totalAttack | №0647 |
| totalAttackBonus | №0772 |
| totalCopper | №0790 |
| totalCurrentLevel | №0700 |
| totalDamage | №0647 |
| totalDiceDamage | №0647 |
| totalGain | №0700 |
| totalLevel | №0700 (+ 1 других файлов) |
| totalMod | №0772 |
| totalObjects | №0071 |
| totals | №0653 (+ 1 других файлов) |
| totalSkillMod | №0834 |
| totalSum | №0772 (+ 1 других файлов) |
| totalWeight | №0789 |
| totalWeightKg | №0792 (+ 1 других файлов) |
| totalWeightLb | №0792 |
| totalZones | №0071 |
| totem | №0648 |
| touched | №0811 |
| touchHp | №0813 |
| toxic | №1118 |
| toxicDC | №0078 |
| toxicSave | №0078 |
| toxicTarget | №0078 (+ 1 других файлов) |
| tp | №0811 |
| tr | №0813 (+ 1 других файлов) |
| track | №0082 |
| tracker | №0078 (+ 5 других файлов) |
| trackNameEl | №0082 |
| TRADE_KEY | №0802 |
| traderId | №0799 (+ 2 других файлов) |
| TRADERS | №0799 |
| traditionActions | №0813 |
| traditions | №0813 |
| trained | №1179 (+ 1 других файлов) |
| transfer | №1157 |
| transformed | №1166 (+ 1 других файлов) |
| transforms | №0065 |
| translated | №0067 (+ 1 других файлов) |
| transported | №1177 |
| transpose | №1119 |
| travelling | №1177 |
| tri | №0058 (+ 3 других файлов) |
| triangleHits | №1168 |
| triangles | №0061 (+ 5 других файлов) |
| trick | №0819 |
| TRICK_FEATURES | №0821 |
| trickster | №1177 |
| triggerCustomCreation | №0791 |
| TRIGGERS | №0818 |
| tris | №0061 |
| true | №0779 (+ 3 других файлов) |
| trunk | №0061 |
| trust | №1111 |
| ts | №0811 (+ 1 других файлов) |
| tt | №0073 (+ 2 других файлов) |
| tTok | №0655 |
| tu | №1269 (+ 1 других файлов) |
| tuft | №0061 |
| tufts | №0061 |
| turn | №0779 (+ 2 других файлов) |
| turned | №0648 |
| turnId | №0783 (+ 1 других файлов) |
| turnKey | №0779 |
| turnOne | №1117 |
| turnTwo | №1117 |
| tusks | №0061 |
| tw | №0073 |
| two | №1192 |
| tx | №0069 (+ 4 других файлов) |
| txt | №0822 (+ 2 других файлов) |
| typ | №0779 (+ 1 других файлов) |
| type | №0058 (+ 59 других файлов) |
| typeCount | №1169 |
| typedExtraTotal | №0655 |
| types | №0833 (+ 3 других файлов) |
| TYPES | №0800 |
| typeSelect | №0791 |
| u | №0058 (+ 16 других файлов) |
| U | №0058 |
| ub | №0073 |
| ui | №0842 (+ 1 других файлов) |
| uiColorOptions | №0868 |
| uid | №1111 (+ 1 других файлов) |
| uiFreeGather | №0825 |
| uiGather | №0825 |
| uiMix | №0079 |
| Uint16Array | №1119 (+ 22 других файлов) |
| Uint32Array | №1119 (+ 27 других файлов) |
| Uint8Array | №1121 (+ 22 других файлов) |
| ul | №0061 |
| unacted | №0648 |
| unarmoredBase | №0655 |
| unbreakable | №1198 |
| unbreakableHero | №1198 |
| uncouthId | №0779 |
| uncouthTargets | №0779 |
| undead | №1269 |
| undeadFocus | №0655 |
| undo | №0648 |
| unescape | №1256 (+ 2 других файлов) |
| unique | №0062 (+ 1 других файлов) |
| uniqueFeatsMap | №0700 |
| uniqueMap | №0836 |
| uniqueSuffix | №0791 |
| unit | №0061 (+ 4 других файлов) |
| units | №0832 |
| unknown | №1141 (+ 2 других файлов) |
| unrelated | №1185 (+ 1 других файлов) |
| untrained | №1192 |
| up | №0061 (+ 1 других файлов) |
| update | №0674 (+ 2 других файлов) |
| updateCloudStatus | №0832 |
| updated | №0745 |
| updateListeners | №0887 |
| updater | №0886 (+ 2 других файлов) |
| updateRun | №0842 |
| updateScheduled | №0792 |
| uploadImage | №0063 |
| uploads | №1119 |
| upper | №0059 (+ 5 других файлов) |
| upperSnout | №0061 |
| upTo | №0713 |
| uri | №0069 |
| url | №0063 (+ 40 других файлов) |
| URL | №1149 |
| urlPath | №0889 |
| usage | №0063 |
| use | №0665 |
| useBtn | №0793 |
| used | №0641 (+ 9 других файлов) |
| usedBy | №0673 |
| usedCombat | №0811 |
| usedCount | №0654 |
| usedVal | №0836 |
| useFeature | №0809 |
| useFur | №0063 |
| useReptile | №0063 |
| userProfsIds | №0793 |
| uses | №0648 (+ 3 других файлов) |
| USES | №0803 |
| usesHtml | №0654 |
| useSkinMicro | №0063 |
| utilityArmor | №1177 |
| utilityBack | №1177 |
| utilityBerry | №1177 |
| utilityDash | №1177 |
| utilityPC | №1177 |
| utilityPhone | №1177 |
| utilityRoster | №1177 |
| utilityServer | №1177 |
| uv | №0058 (+ 6 других файлов) |
| uvAnchor | №0058 |
| uvDet | №0058 |
| uvFit | №0058 |
| ux | №0061 |
| uy | №0061 |
| uz | №0061 |
| v | №0059 (+ 150 других файлов) |
| V | №0058 (+ 1 других файлов) |
| v0 | №1165 (+ 2 других файлов) |
| v1 | №1165 (+ 2 других файлов) |
| v2 | №1165 (+ 2 других файлов) |
| v2Broken | №1144 |
| va | №1165 (+ 4 других файлов) |
| val | №0082 (+ 14 других файлов) |
| valEl | №0624 (+ 1 других файлов) |
| valid | №1175 |
| validate | №0672 |
| validBoons | №0779 |
| validRelative | №1154 |
| validStats | №0745 |
| valInput | №0791 |
| valName | №0624 (+ 1 других файлов) |
| vals | №0068 (+ 2 других файлов) |
| valStr | №0624 (+ 1 других файлов) |
| value | №0059 (+ 35 других файлов) |
| values | №0069 (+ 7 других файлов) |
| variableNameUsed | №0772 |
| variant | №1228 |
| variants | №1130 |
| varName | №0772 (+ 2 других файлов) |
| vary | №1143 |
| vb | №1165 (+ 3 других файлов) |
| vc | №1165 (+ 3 других файлов) |
| vector | №0065 |
| venom | №1118 |
| venomDamage | №1117 |
| venomFeature | №1118 |
| venomHero | №1118 |
| venomsmithPoisonImmune | №0655 |
| venomTarget | №1117 |
| verbal | №0818 |
| verm | №0641 |
| version | №0832 (+ 4 других файлов) |
| VERSION | №0066 (+ 25 других файлов) |
| versionText | №0842 |
| vertex | №0061 (+ 1 других файлов) |
| vertices | №0058 (+ 8 других файлов) |
| verts | №0062 (+ 1 других файлов) |
| vesselHP | №1207 |
| vi | №1165 (+ 2 других файлов) |
| victim | №0818 (+ 4 других файлов) |
| view | №0064 (+ 8 других файлов) |
| viewIndex | №0069 |
| views | №0069 (+ 7 других файлов) |
| viscera | №1198 |
| visceraTarget | №1198 |
| visible | №0061 (+ 8 других файлов) |
| visionBack | №1177 |
| visionPC | №1177 |
| visionPhone | №1177 |
| visionRoster | №1177 |
| visionServer | №1177 |
| vm | №0663 (+ 149 других файлов) |
| voice | №1118 |
| voiceInstall | №1118 |
| volatility | №0079 (+ 1 других файлов) |
| volStep | №0082 |
| volumeRange | №0082 |
| volumes | №0061 |
| vp | №0073 |
| vr | №0811 |
| vs | №0063 |
| vuln | №0850 |
| vulnerable | №0655 (+ 1 других файлов) |
| vx | №0061 (+ 1 других файлов) |
| vy | №0061 |
| vz | №0061 (+ 1 других файлов) |
| w | №0059 (+ 33 других файлов) |
| W | №0061 (+ 2 других файлов) |
| w1 | №0061 |
| w2 | №0061 |
| w3 | №0061 |
| wa | №0655 (+ 1 других файлов) |
| wager | №1177 (+ 1 других файлов) |
| wagerGuard | №0819 |
| waistPoints | №1130 |
| waived | №0803 |
| walk | №0844 |
| wall | №0063 |
| wallCache | №0073 |
| wallet | №0799 |
| walletGrid | №0790 |
| wallpapersGridHtml | №0868 |
| wallTypes | №0076 |
| walter | №0061 |
| walterCorpseTarget | №0646 |
| wandering | №1177 |
| wanderPhone | №1177 |
| want | №0801 (+ 2 других файлов) |
| wanted | №0061 (+ 2 других файлов) |
| wantedClass | №0700 |
| war | №0631 (+ 1 других файлов) |
| WAR_ACADEMIES | №0776 |
| ward | №0655 (+ 1 других файлов) |
| wardAbsorbed | №0655 |
| wardenResistant | №0655 |
| wardenSurvive | №0655 |
| wardReduce | №0655 |
| wardrobeSaved | №1319 |
| wardState | №0655 |
| warlordParry | №0655 |
| warp | №1139 (+ 1 других файлов) |
| wasLastStand | №0783 |
| wasNewClass | №0700 |
| wasStand | №0655 |
| wave | №0061 |
| wb | №1165 (+ 2 других файлов) |
| wc | №1165 (+ 2 других файлов) |
| weapon | №0823 (+ 8 других файлов) |
| weaponAttack | №1195 |
| weaponFields | №0791 |
| weaponId | №0823 (+ 2 других файлов) |
| weaponName | №0823 (+ 2 других файлов) |
| weapons | №0811 |
| weaponsDb | №0823 (+ 1 других файлов) |
| wear | №0665 |
| webbedTarget | №1118 |
| webDebuffs | №0078 |
| webResult | №1118 |
| webRoot | №0886 |
| webSave | №0078 |
| webTarget | №0078 |
| weight | №0061 (+ 5 других файлов) |
| weightInp | №0791 |
| weightRes | №0791 |
| weights | №0058 (+ 6 других файлов) |
| weightStr | №0792 (+ 1 других файлов) |
| weightValue | №1306 |
| weldedBoundary | №0058 |
| weldKey | №0058 |
| wh | №0061 |
| whiskers | №0061 |
| who | №0811 |
| wi | №0076 (+ 1 других файлов) |
| wide | №0061 |
| width | №0061 (+ 7 других файлов) |
| wild | №0630 (+ 1 других файлов) |
| willActivate | №0655 |
| willingTargetIds | №0819 |
| win | №0886 (+ 5 других файлов) |
| window | №1849 |
| wingAngle | №0061 |
| wis | №0628 (+ 11 других файлов) |
| wisMod | №0624 (+ 1 других файлов) |
| WITCH_CRAFT_DATA | №0779 |
| WITCH_CRAFTS | №0779 |
| WITCH_CURSE_EFFECTS | №0779 |
| WITCH_CURSES | №0779 |
| WITCH_GRAND_HEXES | №0779 |
| WITCH_HEXES | №0779 |
| witchAttackPenalty | №0655 |
| witchElemental | №0655 |
| witchImperil | №0655 |
| witchLabels | №0779 |
| witchPack | №0779 |
| withFade | №0868 |
| within1 | №1171 |
| within5 | №1171 |
| wiz | №0811 |
| Wizard | №1144 |
| wk | №1168 |
| wl | №0648 |
| wName | №0647 |
| wolf | №1207 |
| won | №1184 |
| wood | №0063 |
| words | №0067 |
| world | №0058 (+ 2 других файлов) |
| WORLD_STATE | №0878 |
| woven | №0063 |
| wp | №0868 (+ 1 других файлов) |
| wrap | №0625 (+ 4 других файлов) |
| wrapped | №0783 (+ 4 других файлов) |
| wrappedTools | №0827 |
| wrapper | №0772 (+ 1 других файлов) |
| wrapS | №0073 |
| wrapT | №0073 |
| wrist | №0061 |
| wrists | №0061 |
| write | №0818 |
| wrong | №1198 (+ 2 других файлов) |
| ws | №0063 (+ 2 других файлов) |
| wt | №0063 (+ 1 других файлов) |
| ww | №0073 |
| wx | №0072 (+ 1 других файлов) |
| wy | №0072 (+ 1 других файлов) |
| x | №0059 (+ 163 других файлов) |
| X | №0072 |
| x0 | №0061 |
| x1 | №0061 (+ 2 других файлов) |
| x2 | №0071 (+ 1 других файлов) |
| xenoHero | №1117 |
| xenoOwner | №1118 |
| xn | №0081 (+ 1 других файлов) |
| xp | №0628 (+ 11 других файлов) |
| XP_BY_CR | №0805 |
| xs | №1297 |
| xt | №0081 |
| xx | №0061 (+ 3 других файлов) |
| xy | №0073 |
| y | №0058 (+ 55 других файлов) |
| Y | №0061 (+ 1 других файлов) |
| y0 | №0061 (+ 1 других файлов) |
| y1 | №0061 (+ 4 других файлов) |
| y2 | №0071 (+ 2 других файлов) |
| yaw | №0063 (+ 36 других файлов) |
| yd | №0779 |
| yes | №0059 (+ 2 других файлов) |
| yf | №1165 |
| yFile | №1167 |
| ys | №0061 |
| yuan | №1125 (+ 2 других файлов) |
| yy | №0061 (+ 1 других файлов) |
| z | №0058 (+ 19 других файлов) |
| z0 | №0061 (+ 1 других файлов) |
| z1 | №0061 (+ 1 других файлов) |
| zb | №0061 |
| zf | №0061 |
| zFile | №1167 |
| ZH | №0072 |
| zi | №0072 |
| zlib | №1143 (+ 7 других файлов) |
| zoom | №0063 (+ 2 других файлов) |
| zs | №0072 |
| ZW | №0072 |
| ZX | №0072 |
| ZY | №0072 |
| zz | №0061 (+ 1 других файлов) |

### Глобальные JS API (563)

| Имя | Исходные файлы |
|---|---|
| __diceGameplayRelocationObserver | №0772 |
| __diceGameplayRelocationQueued | №0772 |
| __diceTabPanelObserver | №0772 |
| __DND_APP_BOOT_READY | №0083 |
| __dndGameplayV57Waiter | №0783 |
| __dndLootV36 | №0807 |
| __dndLootV37 | №0808 |
| __dndLootV40 | №0806 |
| __dndModalFrameObserverInstalled | №0832 |
| __dndPendingReactionRequest | №0811 |
| __fallbackRollDice | №0772 |
| __map | №1149 |
| __TEST_RESULT__ | №1284 |
| _dndFaqRender | №0815 |
| _dndSave | №0838 (+ 6 других файлов) |
| _dndTourBack | №0815 |
| _dndTourNext | №0815 |
| _dndTourSkip | №0815 |
| _expBeforeLevelUp | №0700 |
| _loadedFeatsMap | №0700 |
| _loadedSubclassOptions | №0700 |
| _originalAddItemToInventory | №0792 |
| AbortController | №0842 |
| ACCURSED_V11 | №0077 |
| accursedAfflictions | №0077 |
| accursedProgression | №0077 (+ 2 других файлов) |
| accursedRuntime | №0077 (+ 1 других файлов) |
| addEventListener | №1179 (+ 4 других файлов) |
| addExperienceValue | №0780 |
| addItemToInventory | №0792 (+ 2 других файлов) |
| ALCHEMIST_MHP_2024 | №0078 |
| alchemistProgression | №0677 |
| alert | №0811 (+ 3 других файлов) |
| allCharacters | №0624 (+ 4 других файлов) |
| appDebugLogs | №0832 (+ 1 других файлов) |
| appendDiceLog | №0648 (+ 3 других файлов) |
| applyClassProgression | №0713 |
| applyConditionsToRoll | №1196 |
| applyDndASI | №0827 |
| applyMulticlassProficiencies | №0700 (+ 1 других файлов) |
| applySubclassProgression | №0648 (+ 1 других файлов) |
| artificerProgression | №0679 |
| autoSaveCurrentCharacter | №0081 (+ 39 других файлов) |
| averageHpIncrease | №0700 |
| barbarianProgression | №0681 |
| bardProgression | №0683 |
| beastheartProgression | №0686 (+ 1 других файлов) |
| BeastheartRuntime | №0686 |
| bloodHunterProgression | №0688 |
| calculateMods | №0827 (+ 1 других файлов) |
| changePointBuyStat | №0624 (+ 1 других файлов) |
| checkMulticlassRequirements | №0786 (+ 1 других файлов) |
| chooseAssassinSubclass | №0648 |
| chooseMetamagic | №0648 |
| chooseSubclass | №0713 |
| chooseSubclassForClass | №0648 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0713 |
| CLASSES_REFERENCE | №0078 (+ 4 других файлов) |
| clericProgression | №0689 |
| closeAddFeatModal | №0745 |
| closeCharacterCreationModal | №0624 (+ 1 других файлов) |
| closeCustomAlert | №0792 |
| closeDndChangelog | №0815 |
| closeDndNetworkModal | №0810 |
| closeExperienceModal | №0780 |
| closeIconSettingsModal | №0832 (+ 2 других файлов) |
| closeLevelUpModal | №0700 |
| closeSettingsModal | №0832 |
| Companions | №0658 |
| confirm | №0063 (+ 2 других файлов) |
| confirmAddFeatManual | №0745 |
| confirmLevelUp | №0700 |
| createNewCharacter | №0624 (+ 1 других файлов) |
| createSwarmAvatar | №0839 |
| crypto | №1174 (+ 19 других файлов) |
| currentChar | №0832 (+ 31 других файлов) |
| currentCharacter | №0832 (+ 10 других файлов) |
| currentCharacterId | №0653 (+ 2 других файлов) |
| currentRollMode | №1192 |
| defaultArmors | №0084 |
| defaultConsumables | №0659 (+ 1 других файлов) |
| defaultJunk | №0794 (+ 2 других файлов) |
| defaultMaterials | №0804 (+ 2 других файлов) |
| defaultWeapons | №0823 (+ 1 других файлов) |
| disableDndDebugRuntime | №0832 (+ 1 других файлов) |
| DND_ALCHEMY_GATHERING_V52 | №0081 |
| DND_APP_ICONS | №0832 (+ 2 других файлов) |
| DND_BESTIARY_V56_1 | №0628 |
| DND_BESTIARY_V56_10 | №0629 |
| DND_BESTIARY_V56_11 | №0630 |
| DND_BESTIARY_V56_12 | №0631 |
| DND_BESTIARY_V56_13 | №0632 |
| DND_BESTIARY_V56_2 | №0633 |
| DND_BESTIARY_V56_3 | №0634 |
| DND_BESTIARY_V56_4 | №0635 |
| DND_BESTIARY_V56_5 | №0636 |
| DND_BESTIARY_V56_6 | №0637 |
| DND_BESTIARY_V56_7 | №0638 |
| DND_BESTIARY_V56_8 | №0639 |
| DND_BESTIARY_V56_9 | №0640 |
| DND_CRAFT_DISASSEMBLY_V51 | №0664 |
| DND_CRAFT_ECONOMY_V49 | №0667 |
| DND_CRAFT_PROFESSION_PROGRESS | №0670 |
| DND_CRAFT_PROFESSIONS_V33 | №0671 |
| DND_CRAFT_PROFESSIONS_V38 | №0672 |
| DND_CRAFT_PROFESSIONS_V47 | №0670 |
| DND_CRAFT_PROFESSIONS_V47_CRAFT | №0670 |
| DND_CRAFT_RESOURCES_V34 | №0673 |
| DND_CRAFT_V51 | №0665 |
| DND_CRAFTING_DLC_V50 | №0666 |
| DND_CRAFTING_V31 | №0668 |
| DND_CUSTOM_CRAFTING_V32 | №0674 |
| DND_EXP_TABLE | №0780 |
| DND_INVENTORY_CONTAINERS_V54 | №0789 |
| DND_MARKET_V55 | №0799 |
| DND_MARKET_V55_1 | №0800 |
| DND_MARKET_V55_3 | №0801 |
| DND_PENDING_CLASS_PACKS | №0077 (+ 8 других файлов) |
| DND_PLANESCAPE_V56_13 | №0632 |
| DND_RESOURCE_GATHERING_V35 | №0825 |
| DND_RESOURCE_PROCESSING_V43 | №0826 |
| DND_UPDATE_MANAGER | №0842 |
| DND_UPDATE_SCENE_V2 | №0843 |
| DND_UPDATE_UI | №0842 |
| DND_WORLD_GATHERING_V53 | №0878 |
| DND3DAssetCatalog | №0067 (+ 1 других файлов) |
| DND3DAssetNames | №0067 (+ 1 других файлов) |
| DND3DMap | №0070 |
| dndAddCompanionAttack | №0827 |
| DNDAdvancedDebugV70 | №0853 |
| DNDAlchemy | №0079 |
| dndBackgrounds | №0624 |
| dndBattleActionClose | №0625 |
| dndBattleActionOpen | №0625 (+ 1 других файлов) |
| dndBattleQuickAttack | №0625 |
| dndBattleQuickMove | №0625 |
| dndBattleQuickReady | №0625 |
| dndBattleQuickSpell | №0625 |
| DNDBloodHunter | №0641 |
| DNDCampaign | №0642 |
| DNDCharacter3D | №0066 |
| DNDCharacterAnatomy | №0059 |
| DNDCharacterAnatomyGeometry | №0058 |
| DNDCharacterAppearanceStore | №0060 |
| DNDCharacterBodyGeometry | №0061 |
| DNDCharacterClothing | №0062 |
| DNDCharacterEditor3D | №0063 |
| dndCharacterEditorLaunchError | №1091 |
| DNDCharacterLabV702 | №0849 |
| DNDCharacterMorphAssets | №0064 |
| DNDCharacterPose | №0065 |
| DNDClassFeatures | №0648 (+ 1 других файлов) |
| DNDCloudAccount | №0651 |
| DNDCloudConfig | №0652 |
| DNDCloudSync | №0653 |
| dndCollectMonsterLootV36 | №0807 |
| dndCollectMonsterLootV37 | №0808 |
| dndCollectMonsterLootV40 | №0806 |
| DNDCombat | №0655 (+ 1 других файлов) |
| DNDCombatEventBusV69 | №0847 |
| dndCombatLog | №0838 |
| DNDCombatLogV66 | №0848 |
| dndCompanionAttack | №0827 |
| dndCompanionDamage | №0827 |
| DNDCompanionGameplayV27 | №0656 |
| dndCompanionHeal | №0827 |
| DNDCompanionPacks | №0657 |
| dndCompanionStat | №0827 |
| dndConcentrationDamagePrompt | №0827 |
| DNDContent | №0661 |
| DNDContentCatalog | №0660 |
| DNDContentManifest | №0662 |
| dndCraft | №0668 |
| dndCraftProfession | №0671 |
| dndCraftProfessionV38 | №0665 (+ 3 других файлов) |
| dndCreateBeastheartCompanion | №0657 |
| dndCreateBeastMasterCompanion | №0657 |
| dndCreateFamiliar | №0657 |
| dndCreateSteed | №0657 |
| dndDebugEnabled | №1091 |
| DNDDebugScenarioEditorV705 | №0856 |
| DNDDebugScenarioManagerV704 | №0857 |
| DNDDiceResolutionV65 | №0859 |
| DNDEncounterCheckpointV68 | №0860 |
| DNDEncounterMapV59 | №0861 |
| DNDExpandedV23 | №0776 |
| DNDExpansionClasses | №0779 |
| DNDFeats | №0782 |
| dndGameplayCoreV57Render | №0783 |
| DNDGameplayV57 | №0783 |
| dndGenerateMonsterLootV36 | №0807 |
| dndGenerateMonsterLootV37 | №0806 (+ 1 других файлов) |
| DNDGLTF | №0069 |
| DNDGLTFCharacterPipeline | №0068 |
| dndInitiativeActive | №0827 |
| dndInitiativeDamageActive | №0827 |
| dndInitiativeHealActive | №0827 |
| dndInitiativeSkipDefeated | №0827 |
| DndInventoryContainersV54 | №0789 |
| DndItemDatabase | №0792 |
| dndLaunchCharacterEditor3D | №1091 |
| DNDMagic | №0798 |
| dndMap3DOpen | №0070 |
| DNDMapModel | №0071 |
| DNDMapRenderer2D | №0072 |
| DNDMapRenderer3D | №0073 (+ 1 других файлов) |
| DndMarketV55 | №0799 |
| DndMarketV55_3 | №0801 |
| DNDMobileBattleV61 | №0863 |
| DNDMobileSessionV67 | №0865 |
| DNDMonsterLoot | №0807 (+ 1 других файлов) |
| DNDMonsterLootV40 | №0806 |
| DNDMonsters | №0805 |
| dndNetwork | №1149 (+ 4 других файлов) |
| dndNetworkAddPlayerToInitiative | №0811 |
| dndNetworkCopyHint | №0810 |
| dndNetworkGameplayBuildProfile | №0811 |
| dndNetworkGameplayEvent | №0811 |
| dndNetworkGameplayMonsterAction | №0811 |
| dndNetworkGameplayMonsterState | №0811 |
| dndNetworkGameplayPeerDisconnect | №0811 |
| dndNetworkGameplayPeerHello | №0811 |
| dndNetworkGameplayPendingReactions | №0811 |
| dndNetworkGameplayPrepareHostHandoff | №0811 |
| dndNetworkGameplayReactionRequest | №0811 |
| dndNetworkGameplayRender | №0783 (+ 2 других файлов) |
| dndNetworkGameplayResult | №0811 |
| dndNetworkGameplayRoomShutdown | №0811 |
| dndNetworkGameplaySnapshot | №0811 |
| dndNetworkHostCreate | №0810 |
| dndNetworkHostFinish | №0810 |
| dndNetworkJoinCreate | №0810 |
| dndNetworkKick | №0810 |
| dndNetworkNewInvite | №0810 |
| dndNetworkSingle | №0810 |
| dndOpenCharacterEditor3D | №0063 |
| DNDPredictor | №0821 |
| DNDPredictorCards | №0818 |
| DNDPredictorMovement | №0820 |
| DNDPredictorUI | №0819 |
| dndProcessResourceV43 | №0826 |
| dndRemoveCompanionAttack | №0827 |
| dndRenderAlchemy | №0079 (+ 1 других файлов) |
| dndRenderCombat | №0641 |
| dndRenderCombatV3 | №0811 (+ 1 других файлов) |
| DNDRules | №0827 (+ 1 других файлов) |
| DNDSecondaryEntities | №0830 |
| dndShowRulesSummary | №0827 |
| DNDSpellPreparation | №0836 |
| dndSplashFinished | №0797 (+ 2 других файлов) |
| DNDStairNavigation | №0075 |
| dndStartConcentrationPrompt | №0827 |
| DNDStressMap | №0076 |
| dndSummonAttack | №0838 |
| dndSummonCommand | №0838 |
| dndSummonHeal | №0838 |
| DNDSummoning | №0838 |
| dndSyncCurrentCharacterFromCombat | №0811 (+ 2 других файлов) |
| dndUseAlchemyProduct | №0080 |
| dndV59CreateEncounter | №0861 |
| dndV61ResetView | №0863 |
| dndV65Close | №0859 |
| dndV65Open | №0859 |
| dndV65Resolve | №0859 |
| dndV66Clear | №0848 |
| dndV66CloseDebug | №0848 |
| dndV66CloseLog | №0848 |
| dndV66Export | №0848 |
| dndV66Filter | №0848 |
| dndV66OpenDebug | №0848 |
| dndV66OpenLog | №0848 |
| dndV66Record | №0847 (+ 1 других файлов) |
| dndV66RefreshDebug | №0848 |
| dndV66SelfTest | №0848 |
| dndV67Close | №0865 |
| dndV67Delete | №0865 |
| dndV67Export | №0865 |
| dndV67FileImport | №0865 |
| dndV67Open | №0865 |
| dndV67Restore | №0865 |
| dndV67Save | №0865 |
| dndV68Close | №0860 |
| dndV68Delete | №0860 |
| dndV68Export | №0860 |
| dndV68FileImport | №0860 |
| dndV68Open | №0860 |
| dndV68Restore | №0860 |
| dndV68Save | №0860 |
| dndV69Clear | №0847 |
| dndV69CloseReplay | №0847 |
| dndV69ExportReplay | №0847 |
| dndV69Filter | №0847 |
| dndV69OpenReplay | №0847 |
| dndV69Play | №0847 |
| dndV69Record | №0847 |
| dndV69Seek | №0847 |
| dndV69Step | №0847 |
| dndV69Stop | №0847 |
| dndV702AddClass | №0849 |
| dndV702AddFeat | №0849 |
| dndV702AddItem | №0849 |
| dndV702AddSpell | №0849 |
| dndV702Close | №0849 |
| dndV702Open | №0849 |
| dndV702Recalc | №0849 |
| dndV702RemoveClass | №0849 |
| dndV702RemoveFeat | №0849 |
| dndV702RemoveItem | №0849 |
| dndV702RemoveSpell | №0849 |
| dndV702SetBackground | №0849 |
| dndV702SetClassLevel | №0849 |
| dndV702SetProfession | №0849 |
| dndV702SetRace | №0849 |
| dndV702SetTotalLevel | №0849 |
| dndV702Tab | №0849 |
| dndV704Close | №0857 |
| dndV704Open | №0857 |
| dndV704Remove | №0857 |
| dndV704Rollback | №0857 |
| dndV704Run | №0857 |
| dndV704SaveCustom | №0857 |
| dndV704Select | №0857 |
| dndV705Close | №0856 |
| dndV705Create | №0856 |
| dndV705Export | №0856 |
| dndV705ImportPrompt | №0856 |
| dndV705Open | №0856 |
| dndV705Rollback | №0856 |
| dndV705Run | №0856 |
| dndV705Select | №0856 |
| dndV708Close | №0858 |
| dndV708Open | №0858 |
| dndV708Reset | №0858 |
| dndV70ApiFilter | №0853 |
| dndV70CallAPI | №0853 |
| dndV70ClearErrors | №0853 |
| dndV70CloseDebug | №0853 |
| dndV70Export | №0853 |
| dndV70InspectSource | №0853 |
| dndV70ModuleFilter | №0853 |
| dndV70OpenDebug | №0853 |
| dndV70RefreshDebug | №0853 |
| dndV70RunHealthCheck | №0853 |
| dndV70SetAPIArgs | №0853 |
| dndV70SetAPIPath | №0853 |
| dndV70Tab | №0853 |
| dndV70UseAPI | №0853 |
| document | №1190 (+ 1 других файлов) |
| druidProgression | №0691 |
| enableDndDebugLogger | №0832 (+ 2 других файлов) |
| enableDndDebugRuntime | №0832 (+ 1 других файлов) |
| ensureDndToolsState | №1181 (+ 5 других файлов) |
| escapeDndHtml | №0626 (+ 3 других файлов) |
| EXTRA_BODY_RUNTIME | №0784 (+ 1 других файлов) |
| FEATS_PHB | №0746 |
| FEATS_SETTING | №0747 |
| FEATS_TCOE | №0748 |
| FEATS_UA_HOMEBREW | №0749 |
| FEATS_XGTE | №0750 |
| fetch | №1149 (+ 2 других файлов) |
| fighterProgression | №0694 |
| filterFeatsList | №0745 |
| geistProgression | №0693 |
| getAllBackgrounds | №0624 |
| getAvailableSubclasses | №0648 (+ 3 других файлов) |
| getCharacterCurrentLevel | №0780 |
| getCharacterLevel | №0780 (+ 3 других файлов) |
| getClassData | №0649 (+ 2 других файлов) |
| getCurrentInventoryWeightData | №0792 (+ 1 других файлов) |
| getDndRules | №0827 |
| getExpandedClassDefinition | №0775 |
| getExpandedClassPack | №0775 |
| getFormattedClassAndLevel | №0700 |
| getKibblesClassDisplayName | №0795 |
| getLevelByExp | №0780 |
| getProfBonusNum | №0648 (+ 2 других файлов) |
| getShifterBloodline | №0833 |
| getShifterBloodlines | №0833 |
| getShifterMaxCR | №0833 |
| getSpellcastingAbilityForClass | №0713 |
| getSpellCastingInfo | №0798 |
| getStatModNum | №0648 (+ 2 других файлов) |
| getSubclassData | №0713 (+ 1 других файлов) |
| getSubclassesForClass | №0649 |
| getSubclassFeaturesForLevel | №0770 |
| getSwarmDevourDamage | №0839 |
| getSwarmDevourDC | №0839 |
| getSwarmMutationSlots | №0839 |
| getSwarmState | №0839 |
| getVesselAspects | №0844 |
| getVesselSpellList | №0844 |
| getVesselSpirit | №0844 |
| GHOST_EXTRA | №0784 |
| ghostProgression | №0697 (+ 2 других файлов) |
| goToTab | №0648 |
| heavyWeapons | №0874 |
| Hero | №0786 |
| illriggerProgression | №0698 (+ 1 других файлов) |
| KIBBLES_CLASS_I18N | №0795 |
| KIBBLES_SOURCE_CATALOG | №0795 |
| KIBBLES_SOURCE_INFO | №0795 |
| kind | №0819 |
| listIntegratedExpandedClasses | №0775 |
| logs | №1192 |
| MARTYR_2024 | №0803 |
| MARTYR_BURDENS | №0803 |
| martyrProgression | №0701 (+ 1 других файлов) |
| martyrRuntime | №0803 |
| maxHpIncrease | №0700 |
| meleeWeapons | №0875 |
| monkProgression | №0703 |
| MULTICLASS_CLASS_REQUIREMENTS | №0775 (+ 2 других файлов) |
| MULTICLASS_PROFICIENCIES_2014 | №0713 (+ 1 других файлов) |
| MULTICLASS_REQUIREMENTS | №0786 |
| NECROMANCER_2024 | №0809 |
| NECROMANCER_SUBCLASSES | №0809 |
| necromancerProgression | №0705 (+ 1 других файлов) |
| necromancerRuntime | №0809 |
| nextInitiativeTurn | №0827 |
| OCCULTIST_KIBBLES_V11 | №0813 |
| occultistProgression | №0707 |
| occultistRuntime | №0813 |
| onerror | №0771 |
| onExpInputChange | №0780 |
| onFeatOrAsiChange | №0700 |
| onSubclassChange | №0700 |
| openAddFeatModal | №0745 |
| openCharacter | №0836 |
| openDndChangelog | №0815 |
| openDndNetworkModal | №0810 |
| openExperienceModal | №0780 |
| openFeatStatChoiceModal | №0745 |
| openIconSettingsModal | №0832 (+ 2 других файлов) |
| openLevelUpModal | №0700 |
| openLevelUpModalFromExp | №0780 |
| openSettingsModal | №0832 |
| paladinProgression | №0709 |
| PARASITE_EXTRA | №0816 |
| parasiteProgression | №0711 (+ 2 других файлов) |
| parasiteRuntime | №0816 |
| parseWeightToKg | №0792 (+ 1 других файлов) |
| pendingLevelUpData | №0700 |
| populateFeatModalList | №0745 |
| Prof_Acr | №0083 |
| Prof_Ani | №0083 |
| Prof_Arc | №0083 |
| Prof_Ath | №0083 (+ 1 других файлов) |
| Prof_Dec | №0083 |
| Prof_His | №0083 |
| Prof_Ins | №0083 |
| Prof_Inv | №0083 |
| Prof_Itm | №0083 |
| Prof_Med | №0083 |
| Prof_Nat | №0083 |
| Prof_Prc | №0083 |
| Prof_Prf | №0083 |
| Prof_Prs | №0083 |
| Prof_Rel | №0083 |
| Prof_Soh | №0083 |
| Prof_Stl | №0083 |
| Prof_Sur | №0083 |
| prompt | №1179 (+ 1 других файлов) |
| psionProgression | №0714 (+ 1 других файлов) |
| pugilistProgression | №0716 (+ 1 других файлов) |
| pugilistRuntime | №0779 |
| rangedWeapons | №0876 |
| rangerProgression | №0718 |
| refreshClassModalLocks | №0700 |
| refreshExtraClassPanels | №0781 |
| removeCharacterFeat | №0745 |
| renderClassFeatures | №0641 (+ 1 других файлов) |
| renderCombatAbilities | №0641 (+ 1 других файлов) |
| renderCompanions | №0827 |
| renderDndTools | №0773 (+ 2 других файлов) |
| renderGhostExtraPanel | №0781 |
| renderInitiativeTracker | №0783 (+ 11 других файлов) |
| renderInventory | №0081 (+ 13 других файлов) |
| renderParasiteExtraPanel | №0781 |
| renderSpellSlots | №0827 (+ 2 других файлов) |
| renderWalterParasitePanel | №0781 |
| renderWeapons | №0827 |
| requestAnimationFrame | №1311 (+ 18 других файлов) |
| resolveMulticlassProficiencyChoice | №0700 (+ 1 других файлов) |
| restorePactMagic | №0773 (+ 2 других файлов) |
| rogueProgression | №0720 |
| rollClassFeatureD20 | №0648 |
| rollClassFeatureDamage | №0648 |
| rollHpIncrease | №0700 |
| rollSingleDice | №0827 |
| RUNEKeeper_V12 | №0828 |
| runeKeeperDialects | №0828 |
| runeKeeperProgression | №0723 (+ 2 других файлов) |
| runeKeeperRuntime | №0779 (+ 1 других файлов) |
| SAVANT_V561 | №0829 |
| savantDisciplines | №0829 |
| savantProgression | №0724 (+ 2 других файлов) |
| savantRuntime | №0829 |
| saveAllCharacters | №1172 (+ 1 других файлов) |
| saveCharacter | №0081 (+ 5 других файлов) |
| saveCurrentCharacter | №0078 |
| saved | №1190 |
| savedDimBeforeHide | №0868 |
| saveNewCreatedCharacter | №0624 (+ 1 других файлов) |
| selectedBaseHp | №0700 |
| selectLauncherIcon | №0832 (+ 2 других файлов) |
| setCharacterLevel | №0832 (+ 2 других файлов) |
| setTimeout | №1179 (+ 1 других файлов) |
| SHIFTER_V21 | №0833 |
| shifterProgression | №0726 (+ 2 других файлов) |
| shifterRuntime | №0833 |
| showCustomAlert | №0792 (+ 1 других файлов) |
| SKILL_TO_VAR_MAP | №1192 |
| SKILLS_CONFIG | №0083 |
| sorcererProgression | №0728 |
| sortInitiativeTracker | №0838 (+ 1 других файлов) |
| specialWeapons | №0877 |
| SPELLBLADE_RUNTIME | №0835 |
| spellbladeProgression | №0835 |
| spells3lvl | №0763 |
| spells4lvl | №0764 |
| spells5lvl | №0765 |
| spells6Lvl | №0766 |
| spells8lvl | №0768 |
| spells9lvl | №0769 |
| spellsLevel1 | №0761 |
| spellsLevel2 | №0762 |
| spellsLevel7 | №0767 |
| startDndOnboarding | №0815 |
| SUBCLASSES_REFERENCE | №0078 (+ 6 других файлов) |
| subtractExperienceValue | №0780 |
| SWARM_EXTRA | №0839 |
| swarmProgression | №0730 (+ 2 других файлов) |
| swarmRuntime | №0839 |
| syncDndNetworkInitiative | №1181 (+ 4 других файлов) |
| syncLevelUI | №0700 |
| toggleClassFeatureDetails | №0648 |
| triggerCritEffect | №1196 |
| updateCharacterArmorClass | №1186 |
| updateCharacterSpellSlots | №0700 (+ 1 других файлов) |
| updateExperienceModalUI | №0780 |
| updateExtraClassCreationUI | №0646 |
| updateMagicData | №0798 |
| updateNetworkModeUI | №0810 |
| useBloodHunterFeature | №0641 |
| useClassFeature | №0648 |
| useFeat | №0782 |
| VESSEL_V4 | №0844 |
| vesselProgression | №0732 (+ 1 других файлов) |
| vesselRuntime | №0844 |
| VTT_PROJECT_MANIFEST_V70 | №0866 |
| WALTER_PARASITE_EXTRA | №0869 |
| walterParasiteProgression | №0734 (+ 2 других файлов) |
| WARDEN_MHP_2024 | №0871 |
| wardenProgression | №0735 (+ 1 других файлов) |
| warlockProgression | №0737 |
| WARLORD_LASERLLAMA_V330 | №0872 |
| warlordProgression | №0739 (+ 1 других файлов) |
| WEAPONS_DB | №0823 (+ 1 других файлов) |
| window | №1149 (+ 8 других файлов) |
| WITCH_MHP_2014 | №0779 |
| witchProgression | №0741 |
| witchRuntime | №0779 |
| wizardProgression | №0743 |

### Поля персонажа (101)

| Имя | Исходные файлы |
|---|---|
| ac | №0793 (+ 4 других файлов) |
| actionSurges | №0827 |
| activeConditions | №0647 (+ 5 других файлов) |
| activeFolderId | №0812 |
| anatomy | №0059 |
| appearance3d | №1126 (+ 1 других файлов) |
| baseAC | №0793 (+ 3 других файлов) |
| class | №0780 (+ 3 других файлов) |
| classes | №0786 (+ 7 других файлов) |
| classFeaturesState | №0773 (+ 1 других файлов) |
| className | №0700 (+ 2 других файлов) |
| clothing | №0059 (+ 1 других файлов) |
| coinLog | №0790 |
| coins | №0790 (+ 2 других файлов) |
| combatAbilities | №0647 (+ 1 других файлов) |
| combatAbilityStat | №0654 |
| companions | №0773 |
| con | №0700 |
| concentration | №0827 (+ 1 других файлов) |
| conditions | №0772 (+ 3 других файлов) |
| constitution | №0700 |
| craftingProfessions | №0669 |
| dead | №0647 (+ 1 других файлов) |
| deathSaves | №0655 (+ 4 других файлов) |
| defeated | №0773 (+ 3 других файлов) |
| encounters | №1091 |
| equipment | №0063 |
| equippedWeapon | №0823 (+ 1 других файлов) |
| exp | №0780 (+ 1 других файлов) |
| extraACBonus | №0827 |
| extraClassType | №0647 (+ 6 других файлов) |
| feats | №0700 (+ 2 других файлов) |
| featStatBonuses | №0745 |
| features | №0700 (+ 3 других файлов) |
| folders | №0812 |
| gender | №0059 (+ 1 других файлов) |
| ghost | №0784 |
| head | №0059 (+ 1 других файлов) |
| heroClass | №0836 |
| hostName | №0784 (+ 2 других файлов) |
| hp | №0647 (+ 4 других файлов) |
| hpCurrent | №0647 (+ 8 других файлов) |
| hpMax | №0647 (+ 5 других файлов) |
| hpTemp | №1179 |
| id | №0773 (+ 3 других файлов) |
| initiativeTracker | №0773 (+ 9 других файлов) |
| inspiration | №1179 |
| inventory | №0792 (+ 14 других файлов) |
| isExtraClass | №0700 (+ 5 других файлов) |
| kiPoints | №0713 (+ 1 других файлов) |
| lastRest | №0647 (+ 1 других файлов) |
| level | №0832 (+ 6 других файлов) |
| library | №0796 |
| libraryData | №0796 |
| morphChannels | №0064 (+ 2 других файлов) |
| multiclassAllowed | №0784 (+ 2 других файлов) |
| name | №0773 (+ 1 других файлов) |
| originRaceId | №0059 |
| pactMagic | №0773 (+ 2 других файлов) |
| pactMagicData | №0773 (+ 3 других файлов) |
| parasite | №0816 |
| pendingProficiencyChoices | №0713 |
| position | №1179 |
| predictorState | №0793 (+ 4 других файлов) |
| profBonus | №0836 |
| proficiencies | №0793 (+ 3 других файлов) |
| race | №0700 (+ 2 других файлов) |
| raceId | №0059 (+ 1 других файлов) |
| raceName | №0784 (+ 2 других файлов) |
| rageDamageBonus | №0713 |
| ragesCount | №0713 (+ 1 других файлов) |
| replacesRace | №0784 (+ 3 других файлов) |
| resistances | №1118 |
| resources | №0827 (+ 1 других файлов) |
| revision | №0653 (+ 1 других файлов) |
| savesData | №0624 (+ 2 других файлов) |
| secondWindUses | №0827 |
| skills | №0713 (+ 1 других файлов) |
| skillsData | №0624 (+ 5 других файлов) |
| skillValues | №0083 |
| skins | №0059 (+ 5 других файлов) |
| sneakAttackDice | №0713 |
| sorceryPoints | №0713 (+ 1 других файлов) |
| speed | №0784 (+ 3 других файлов) |
| spellcastingSources | №0713 (+ 1 других файлов) |
| spells | №0773 |
| spellsData | №0827 (+ 1 других файлов) |
| spellSlotsData | №0647 (+ 4 других файлов) |
| spellStat | №0713 |
| stats | №0786 (+ 12 других файлов) |
| subclass | №0713 (+ 1 других файлов) |
| swarm | №0700 (+ 1 других файлов) |
| tarotEffects | №1177 (+ 1 других файлов) |
| tarotKnowledge | №1177 |
| tempHp | №1118 |
| turnResources | №0773 (+ 1 других файлов) |
| unsaved | №1149 |
| valueOf | №0836 |
| walterParasite | №0700 (+ 1 других файлов) |
| weaponsData | №0647 |
| worldMatrices | №0059 (+ 3 других файлов) |

### Поля JS объектов (6512)

| Имя | Исходные файлы |
|---|---|
| _ | №1212 (+ 11 других файлов) |
| __base | №0073 |
| __bodyMasks | №1141 |
| __ceHeadFrame | №0058 |
| __ceNormals | №0058 (+ 3 других файлов) |
| __ceShapedPositions | №0058 (+ 3 других файлов) |
| __dirname | №1358 |
| __filename | №1358 |
| __floor | №0073 |
| __tarotChargeDouble | №0818 |
| __tarotShared | №0818 |
| __TEST_ASSERT__ | №1358 |
| _sent | №1289 |
| a | №0061 (+ 17 других файлов) |
| aal | №1111 |
| abdomen | №0059 |
| aberration | №0628 (+ 12 других файлов) |
| abilities | №0628 (+ 17 других файлов) |
| ability | №0077 (+ 19 других файлов) |
| abilityBonus | №0078 (+ 1 других файлов) |
| abilityBonuses | №0641 |
| abilityChanges | №0818 |
| abilityCheck | №0655 (+ 1 других файлов) |
| abilityCheckBonus | №0779 |
| abilityCheckHigherSpell | №0779 |
| abilityIncrease | №0776 |
| abilityMax | №0818 |
| abilityMin | №0818 |
| abilityScores | №1117 (+ 3 других файлов) |
| absorbedItems | №0839 |
| absorbedTempHp | №0838 |
| ac | №0624 (+ 69 других файлов) |
| academies | №0739 (+ 1 других файлов) |
| academy | №0776 (+ 1 других файлов) |
| academyFeature | №0776 |
| academyFeatures | №0739 |
| acBase | №0084 (+ 1 других файлов) |
| acBonus | №0776 (+ 7 других файлов) |
| acBonusAgainstTarget | №0779 |
| acBonusDie | №0779 |
| accent | №0832 |
| acceptedCategories | №0802 |
| acceptedTags | №0802 |
| access | №0670 |
| access_token | №0653 (+ 1 других файлов) |
| accessories | №0807 (+ 1 других файлов) |
| accessors | №1158 (+ 1 других файлов) |
| acEqualsSelf | №0779 |
| acFormula | №0084 |
| acid | №0078 (+ 2 других файлов) |
| Acid | №0080 |
| acidBomb | №0779 |
| acidReagent | №0826 |
| acolyteOfArms | №0779 |
| acOverride | №0811 (+ 1 других файлов) |
| acPenalty | №0078 |
| acReduction | №0779 |
| acrobatics | №0772 (+ 1 других файлов) |
| acSaveDamageBonus | №0779 |
| action | №0077 (+ 58 других файлов) |
| actionId | №0805 |
| actionOrBonusAction | №0779 |
| actionRequired | №0655 |
| actions | №0078 (+ 28 других файлов) |
| actionSpent | №0078 (+ 1 других файлов) |
| actionSurge | №0648 |
| actionSurges | №0694 |
| actionType | №0078 |
| activate | №1199 |
| activated | №0818 |
| activateLastStand | №0818 |
| active | №0641 (+ 32 других файлов) |
| ACTIVE | №0782 |
| activeCharacteristics | №0869 |
| activeConditions | №0624 (+ 9 других файлов) |
| activeEncounter | №0862 |
| activeEncounterId | №0861 (+ 1 других файлов) |
| activeId | №0862 |
| activeIndex | №0078 (+ 42 других файлов) |
| activeMutations | №0839 |
| activeOrgans | №0869 |
| activeProperties | №0080 |
| activeRage | №0648 (+ 1 других файлов) |
| activeRite | №0641 |
| activeShape | №1279 |
| activity | №0628 (+ 12 других файлов) |
| actor | №0783 (+ 2 других файлов) |
| actorId | №0819 (+ 4 других файлов) |
| actorName | №1241 |
| actual | №0854 |
| actWithArcaneAnathemaWhileDisabled | №0779 |
| adamantine | №0668 |
| adaptiveMalediction | №0779 |
| addClass | №0849 |
| addCombatantFromTemplate | №0655 |
| addConToEachDie | №0779 |
| addCreature | №0861 |
| addCustomLoot | №0807 (+ 1 других файлов) |
| addD4OnFailure | №0779 |
| addDamage | №0078 |
| addDie | №0779 |
| added | №0628 (+ 26 других файлов) |
| addEventListener | №0887 (+ 25 других файлов) |
| addExhaustion | №0827 |
| addFeat | №0849 |
| addFloor | №0071 |
| addInventory | №0849 |
| additionalFamiliar | №0813 |
| addLexiconRune | №0779 |
| addObject | №0071 |
| addProficiencyBonus | №0779 |
| addProfToAnathema | №0779 |
| addRecipe | №0667 |
| addSelected | №0861 |
| addSpell | №0849 |
| addToRoll | №0779 |
| addXP | №0670 |
| addZone | №0071 |
| adhesive | №0078 |
| adjustedXp | №0805 |
| adjustRiteDamage | №0641 |
| adjustSymbiosis | №0816 |
| adjustWeaponDamage | №0641 |
| adornment | №0670 |
| adrenaline | №0833 |
| adroitAnalysis | №0829 |
| adultAnatomy | №0066 |
| advancedRoguishCharm | №0779 |
| advancedTactics | №0779 |
| advancedTransformation | №0641 |
| advanceTime | №0078 (+ 1 других файлов) |
| advantage | №0078 (+ 14 других файлов) |
| advantageAgainst | №0779 |
| advantageAgainstFrightened | №0779 |
| advantageAgainstGrappled | №0779 |
| advantageAgainstTarget | №0779 |
| advantageAgainstWounded | №0776 |
| advantageAllAttacks | №0641 |
| advantageAllD20 | №0779 |
| advantageAttackRolls | №0779 |
| advantageAttacks | №0779 |
| advantageCharismaChecks | №0779 |
| advantageDexSave | №0779 |
| advantageFirstAttack | №0779 |
| advantageIfSameTarget | №0686 |
| advantageMagicalSaves | №0779 |
| advantageNextAttack | №0776 (+ 1 других файлов) |
| advantageNextSave | №0779 |
| advantageOnChecks | №0776 |
| advantageOnCon | №0776 |
| advantageOneAttackOrSave | №0779 |
| advantageOrDisadvantage | №0779 |
| advantagePerception | №0813 |
| advantageRecallFeyFiendsUndead | №0641 |
| advantageSaves | №0641 (+ 1 других файлов) |
| advantageSavesAgainst | №0779 |
| advantageSavingThrows | №0779 |
| advantageStealth | №0686 |
| advantageStr | №0779 |
| advantageStrength | №0078 |
| advantageTrackFeyFiendsUndead | №0641 |
| advantageVsIntimidation | №0776 |
| adventuringDiscipline | №0779 |
| advice | №0818 (+ 3 других файлов) |
| aether | №0641 |
| Aether | №0779 |
| aetherWalk | №0641 |
| affected | №0078 |
| affinities | №0844 |
| affinity | №1207 |
| afflictedDisadvantageEndSave | №0779 |
| afflictionControl | №0077 |
| african | №1163 |
| afro | №0061 (+ 1 других файлов) |
| after | №0779 (+ 1 других файлов) |
| afterActorAttack | №0641 |
| afterAttack | №0818 |
| afterAttackCost | №0779 |
| afterAttackThreeUnarmed | №0779 |
| afterCarousingAdvantage | №0779 |
| afterDamage | №0641 (+ 1 других файлов) |
| againstInterdicted | №0779 |
| age | №0624 (+ 2 других файлов) |
| ageAppearanceLocked | №0813 |
| ageless | №0779 |
| agePossessionSleepTransformImmunity | №0779 |
| AI_ALLOW_PAID_API | №1115 |
| AI_BASE_SHA | №1116 |
| AI_DEVELOPMENT_ENABLED | №1115 |
| ailment | №0779 |
| ailments | №0077 (+ 1 других файлов) |
| airCore | №0826 |
| airEssence | №0826 |
| alchemical | №0799 |
| alchemicalFat | №0826 |
| alchemicalReagentV49 | №0667 |
| alchemicalSavvy | №0648 |
| alchemist | №0670 (+ 4 других файлов) |
| alchemistActiveEffects | №1117 (+ 1 других файлов) |
| alchemistDebuffs | №1117 |
| alchemistDiscovered | №1118 |
| alchemistExplosionResistanceType | №1117 |
| alchemistGolem | №0078 |
| alchemistGolemOwner | №0078 |
| alchemistGrafts | №1117 |
| alchemistHomunculus | №0078 |
| alchemistHomunculusOwner | №0078 (+ 1 других файлов) |
| alchemistPoisonedWeaponId | №1117 |
| alchemistPreparedFormula | №1118 |
| alchemistSaveDC | №1117 |
| alchemistToxicVengeance | №1117 |
| alchemy | №0668 (+ 2 других файлов) |
| alchemyId | №0080 (+ 1 других файлов) |
| alchemyPoints | №0779 |
| alchemyTools | №0813 |
| alcoholRules | №0078 |
| ale | №0672 |
| alert | №1151 (+ 12 других файлов) |
| alerts | №1179 |
| aliases | №0077 (+ 12 других файлов) |
| all | №0775 (+ 1 других файлов) |
| ALL_RECIPES | №1150 (+ 1 других файлов) |
| allAttacksThisTurn | №0641 |
| allConcentrationSavesDisadvantage | №0641 |
| allDisciplines | №0776 |
| allies | №1228 |
| alliesTempHp | №0779 |
| allLanguages | №0779 |
| allowedForms | №0779 |
| allowFriendly | №0656 |
| allSeeing | №0871 |
| allSkills | №0809 |
| alluring | №0641 |
| Alluring | №0779 |
| ally | №1180 |
| allyACBonus | №0779 |
| allyAdvantage | №0776 |
| allyAdvantageAgainstMarkedPrey | №0779 |
| allyAttackOrDamageCantrip | №0779 |
| allyCharge | №0776 |
| allyCount | №0779 |
| allyDestination | №0819 (+ 2 других файлов) |
| allyFormation | №0776 |
| allyId | №0818 (+ 3 других файлов) |
| allyMoveReactionFt | №0779 |
| allyNextAddD8 | №0779 |
| allyReactionsUpTo | №0779 |
| allyReposition | №0776 |
| allySaveAdvantage | №0779 |
| allySaveAdvantageFt | №0779 |
| allySaveBonus | №0779 |
| allyStrDexSaveBonus | №0779 |
| allyTempHp | №0779 |
| allyWilling | №0819 (+ 2 других файлов) |
| allyWithinAura | №0655 (+ 1 других файлов) |
| allyWithinCourage | №0655 |
| almond | №0063 (+ 1 других файлов) |
| alpha | №0063 (+ 1 других файлов) |
| alphaCutoff | №0069 |
| alphaCutoffLoc | №0073 |
| alphaMode | №0069 |
| alphaModeLoc | №0073 |
| alpine | №0063 |
| alreadyCast | №0819 (+ 1 других файлов) |
| alreadyKnown | №0833 |
| alt | №0779 |
| altar | №0067 |
| alternateNecromancers | №0809 |
| alternateResourceIds | №0081 |
| altMin | №0746 |
| altStat | №0746 |
| alum | №0673 |
| alwaysPrepared | №0803 (+ 2 других файлов) |
| amount | №0081 (+ 35 других файлов) |
| amp | №0641 |
| amphibian | №0774 |
| amplified | №0641 (+ 1 других файлов) |
| amplifiedDamage | №0779 |
| amplifiedEffect | №0779 |
| amplifiedMoveFt | №0779 |
| amplifiedNextAttackAdvantage | №0779 |
| amplifiedRestoreSpellSlot | №0779 |
| amplify | №0641 (+ 4 других файлов) |
| amr | №1111 |
| analysisAction | №0829 |
| analyticalDefense | №0829 |
| anatomy | №0061 (+ 1 других файлов) |
| anatomyLevel | №0058 |
| anatomyProfile | №0066 |
| anatomyShape | №0058 |
| anatomySkin | №0058 |
| anatomyType | №0058 |
| anatomyVariant | №0058 |
| anatomyZones | №0058 |
| anchor | №0061 (+ 1 других файлов) |
| anchorPositions | №0061 (+ 1 других файлов) |
| anchors | №0809 |
| ancient_ruins | №0878 |
| ancientMalediction | №0779 |
| angle | №0061 |
| animalFrame | №0061 |
| animalHandling | №0772 (+ 1 других файлов) |
| animalHandlingDC | №0686 |
| animalProfile | №0061 (+ 6 других файлов) |
| animalSkin | №0061 |
| animateDead | №0809 |
| animateThralls | №0779 |
| animation | №0779 |
| animationId | №0065 (+ 1 других файлов) |
| animations | №0068 |
| ankhBlessing | №0809 |
| annotated | №0663 |
| anointedMagic | №0779 |
| antelope | №0066 |
| antialias | №0063 (+ 1 других файлов) |
| Antidote | №0080 |
| antiMagicAdvantage | №0809 |
| anvil | №0067 |
| anxious | №0641 |
| any | №0775 (+ 1 других файлов) |
| aoe | №0811 |
| aoeFt | №0641 |
| aoeLengthFt | №0811 |
| aoeRadiusFt | №0626 (+ 3 других файлов) |
| aoeShape | №0626 (+ 1 других файлов) |
| aoeWidthFt | №0811 |
| apathy | №0818 |
| ape | №0061 |
| apexPredator | №0779 |
| api | №1149 |
| apiArgs | №0853 |
| apiFilter | №0853 |
| apikey | №0653 |
| apiPath | №0853 |
| apis | №0853 |
| apothecary | №0067 (+ 1 других файлов) |
| apothecaryRejectsHammer | №1213 |
| app | №0860 (+ 1 других файлов) |
| appearance | №0060 (+ 3 других файлов) |
| appearance3d | №1149 |
| appearanceAgingStopped | №0813 |
| appearanceOpacity | №0066 |
| appendChild | №1210 (+ 8 других файлов) |
| applications | №0821 |
| applied | №0077 (+ 10 других файлов) |
| appliesCalcifyingStrike | №0779 |
| apply | №0842 |
| applyASI | №0827 |
| applyDamage | №0655 (+ 5 других файлов) |
| applyDamageBatch | №0655 |
| applyFromRound | №0818 |
| applyFullQuality | №0665 |
| applyMorphTargets | №0066 |
| applyOverchannel | №0811 |
| applyPotionEffect | №0078 |
| applyPreset | №0066 |
| applyQuality | №0667 |
| applyStaged | №0842 |
| applyVisibility | №0666 |
| applyWitchTouch | №0779 |
| arcana | №0772 (+ 1 других файлов) |
| arcanaSaveDC | №0779 |
| arcane | №0799 (+ 2 других файлов) |
| arcane_defender | №0782 |
| arcane_recovery_feat | №0782 |
| arcaneAnathema | №0779 |
| arcaneMastery | №0648 |
| arcaneReagentV49 | №0667 |
| arcaneRecovery | №0648 |
| arcaneShard | №0667 (+ 1 других файлов) |
| arcaneWard | №1268 |
| archaeologist | №0829 |
| archdruid | №0648 |
| archery | №0779 |
| archetype | №0779 (+ 1 других файлов) |
| archetypes | №0714 |
| archfey | №0641 |
| architect | №0779 |
| archon | №0844 |
| archonForm | №0844 |
| archons | №0844 |
| area | №0078 (+ 1 других файлов) |
| areaFt | №0078 (+ 1 других файлов) |
| areaRadiusFt | №0779 |
| areaSlime | №0078 |
| areaVulnerability | №0839 |
| arenaRoyale | №0716 |
| args | №1311 (+ 37 других файлов) |
| arm | №0061 |
| armament | №0077 (+ 1 других файлов) |
| armedAndAngry | №0779 |
| armLength | №0063 (+ 1 других файлов) |
| armor | №0061 (+ 64 других файлов) |
| armor_component | №0826 |
| armorBonus | №0665 |
| armorClass | №0674 (+ 1 других файлов) |
| armoredAC | №0779 |
| armorer | №0670 (+ 2 других файлов) |
| armorOfFaith | №0803 |
| armorProficiency | №0813 |
| armorTriangles | №0063 |
| armorWear | №1151 |
| armour | №0067 |
| armpitL | №0059 (+ 1 других файлов) |
| armpitR | №0059 |
| armReaction | №0818 |
| arms | №0063 (+ 3 других файлов) |
| arr | №0802 |
| arrayBuffer | №1122 (+ 5 других файлов) |
| arrestingStrike | №0779 |
| ArrowDown | №0070 |
| arrowheads | №0667 (+ 1 других файлов) |
| ArrowLeft | №0070 |
| ArrowRight | №0070 |
| ArrowUp | №0070 |
| art | №0832 |
| artificer | №0663 (+ 2 других файлов) |
| artOfWar | №0779 |
| ascended | №0844 |
| ascensionLevel | №0714 |
| asi | №0675 (+ 28 других файлов) |
| asian | №1163 |
| asleep | №0818 |
| aspect | №0779 (+ 1 других файлов) |
| assessItem | №0664 |
| asset | №1158 (+ 1 других файлов) |
| assetId | №0063 (+ 3 других файлов) |
| astral | №0063 |
| astralConstruct | №0779 |
| asymmetric | №0066 |
| at | №0061 (+ 17 других файлов) |
| at11 | №0714 |
| at17 | №0714 |
| athletics | №0772 (+ 2 других файлов) |
| atob | №1256 (+ 2 других файлов) |
| atStartOfTurn | №1203 (+ 1 других файлов) |
| attach | №0064 (+ 1 других файлов) |
| attached | №0078 |
| attachment | №0869 |
| attack | №0078 (+ 20 других файлов) |
| attackAbility | №0078 |
| attackAction | №0779 |
| attackAgainstMode | №0827 |
| attackBonus | №0078 (+ 9 других файлов) |
| attackBonusAdjustment | №0641 |
| attackCantripSwap | №0809 |
| attackChain | №0776 |
| attackContext | №0641 (+ 1 других файлов) |
| attackCount | №0655 (+ 3 других файлов) |
| attackCrit | №0809 |
| attackDamageBonus | №0665 |
| attackDisadvantage | №0078 (+ 2 других файлов) |
| attackDisadvantageUnlessTargetsSelf | №0779 |
| attackDistanceFt | №1203 |
| attacker | №0641 (+ 13 других файлов) |
| attackerId | №0078 (+ 9 других файлов) |
| attackerPeerId | №0811 |
| attackKind | №0655 (+ 7 других файлов) |
| attackModifier | №0833 |
| attackModifiers | №0078 (+ 17 других файлов) |
| attackOrSpell | №0779 |
| attackPenalty | №0078 (+ 1 других файлов) |
| attackReplaced | №1209 |
| attackResult | №0641 (+ 5 других файлов) |
| attackRoll | №0779 |
| attacks | №0655 (+ 8 других файлов) |
| attacksAgainst | №0827 |
| attackSequence | №0655 (+ 1 других файлов) |
| attacksHaveAdvantage | №0078 |
| attackSight | №0818 |
| attackTarget | №1203 |
| attackTotal | №0811 (+ 3 других файлов) |
| attackType | №0760 (+ 18 других файлов) |
| attitudeIndifferent | №0779 |
| attitudeShift | №0779 |
| attributeFilter | №0840 (+ 1 других файлов) |
| attributes | №0840 (+ 3 других файлов) |
| attrs | №1119 |
| atWill | №0779 |
| atWillSuppress | №0779 |
| auraDebuff | №0809 |
| auraHoldTheLine | №0779 |
| auraOfCourage | №0648 |
| auraOfProtection | №0648 |
| auraRangeFt | №0809 |
| auraSource | №0655 (+ 1 других файлов) |
| author | №0071 |
| authoritativeSubclasses | №0077 (+ 13 других файлов) |
| authorityEpoch | №0810 (+ 5 других файлов) |
| authorityId | №0810 (+ 3 других файлов) |
| authoritySnapshot | №0865 |
| auto | №0811 |
| autoAnimalHandlingRampage | №0686 |
| autoCheckForUpdates | №0842 |
| autoFailed | №0641 (+ 2 других файлов) |
| autoFailHexSave | №0779 |
| autoFailSaveUses | №0779 |
| autoFailStrDex | №0827 (+ 2 других файлов) |
| autognome | №0672 |
| autoHideMenuBar | №0886 |
| automaticAssembly | №0066 |
| autoPlans | №0811 |
| autoSaveCurrentCharacter | №1210 (+ 2 других файлов) |
| autoTrigger | №0078 |
| available | №0805 (+ 1 других файлов) |
| availableFeatures | №0661 |
| avatars | №0839 |
| avatarStorm | №0809 |
| avian | №0061 (+ 1 других файлов) |
| avoidDeath | №0779 |
| awakened | №0714 (+ 1 других файлов) |
| Awakened | №0795 |
| awakenedRune | №0779 |
| awakening | №0803 |
| axes | №0063 |
| AXES | №0066 |
| azure | №0832 |
| b | №0868 (+ 17 других файлов) |
| back | №0062 (+ 3 других файлов) |
| background | №0624 (+ 5 других файлов) |
| backgroundColor | №0886 |
| backLower | №0059 |
| backslash | №0074 (+ 1 других файлов) |
| backslashTexture | №0076 |
| BackTexture | №1173 |
| backup | №0852 (+ 1 других файлов) |
| backUpper | №0059 |
| bad | №1129 |
| badlands | №0878 |
| badlands_canyon | №0878 |
| badlands_crater | №0878 |
| badlands_glass | №0878 |
| balanceCp | №0799 |
| balanced | №0059 |
| balancePreserved | №1213 |
| balefulInterdict | №0698 |
| balefulPresence | №0779 |
| band | №0664 |
| bandHeight | №0062 |
| bandTile | №0062 |
| bandTogether | №0779 |
| banished | №0779 |
| banner | №0067 |
| bard | №0798 (+ 1 других файлов) |
| bardicInspiration | №0648 (+ 1 других файлов) |
| barrel | №0067 |
| barter | №1213 |
| barycentricOutsideTolerance | №1168 |
| base | №0069 (+ 5 других файлов) |
| baseAc | №0811 (+ 1 других файлов) |
| baseAC | №0624 (+ 2 других файлов) |
| baseAcFormula | №0824 |
| baseColorFactor | №0069 (+ 1 других файлов) |
| baseColorSampler | №0069 |
| baseColorTexture | №0069 |
| baseCp | №0801 |
| baseFeatures | №0871 |
| baseId | №0674 |
| baseModel | №0066 (+ 1 других файлов) |
| baseObj | №1169 (+ 2 других файлов) |
| basePositions | №0062 (+ 2 других файлов) |
| basePositionsSha256 | №1306 |
| baseQualityScore | №0664 |
| baseUrl | №1154 (+ 1 других файлов) |
| basilisk | №0686 |
| bastionOfOrder | №0779 |
| battleBoard | №0848 (+ 1 других файлов) |
| battleBoardView | №0860 |
| battlefield | №1149 (+ 21 других файлов) |
| battlefieldAnalysis | №0776 |
| battlefieldSupport | №0739 |
| Battlemage | №0795 |
| battleMagic | №0648 |
| battleOver | №0783 |
| bboxDiagonalRatio | №1171 |
| beakColor | №0066 (+ 1 других файлов) |
| beakSize | №0066 (+ 3 других файлов) |
| beakStyle | №0063 (+ 3 других файлов) |
| beard | №0063 (+ 3 других файлов) |
| bearingDegrees | №0818 |
| beast | №0629 (+ 2 других файлов) |
| beast_tamer | №0782 |
| beastCommand | №0776 |
| beastCompanion | №0648 |
| beastheart | №0657 |
| beastheartEndTurn | №0656 |
| beastheartLevel | №0686 |
| beastheartStartTurn | №0656 |
| Beasthide | №0795 |
| beastMaster | №0657 |
| beastShape | №0779 |
| beastSpells | №0648 |
| becomeGhost | №0779 |
| bed | №0067 |
| before | №0827 (+ 1 других файлов) |
| beforeAttack | №0818 |
| beforeRoll | №0655 |
| beginBlind | №0821 |
| beginConcentration | №0655 |
| beginInitial | №0821 |
| beginLastStand | №0818 |
| beginOwnTurn | №0821 |
| beginWager | №0821 |
| behavior | №1228 |
| belt | №0062 |
| bench | №0067 |
| benefits | №0779 |
| berserker_rage | №0782 |
| bestAxisPermutation | №1171 |
| bestiaryVersion | №0628 (+ 12 других файлов) |
| bigby | №0628 |
| bin_bytes | №1160 |
| binary | №1306 |
| binarySha256 | №1306 |
| bindHost | №0816 |
| binding | №0641 |
| bindOnCharnelSpend | №0809 |
| bindPositions | №0058 |
| bindShell | №0784 |
| biomass | №0816 |
| biomassGained | №0816 |
| biomassHealing | №0839 |
| black | №0868 |
| Black | №0776 (+ 1 других файлов) |
| blackmarket | №0801 (+ 1 других файлов) |
| blackRider | №0809 |
| blacksmith | №0799 |
| blastCoating | №0677 |
| blastDice | №0078 |
| blastWave | №0779 |
| blend | №0061 |
| blessGuidance | №0779 |
| blessLike | №0078 |
| blind | №0776 |
| blindBeyond | №0818 |
| blinded | №0818 (+ 1 других файлов) |
| blinding | №0779 |
| Blindness | №0080 |
| blindsense | №0648 |
| blindsight | №0869 |
| blindsightFt | №0779 (+ 1 других файлов) |
| bloatedAgony | №0641 |
| Blob | №1241 (+ 5 других файлов) |
| block | №0844 |
| blocked | №0655 (+ 3 других файлов) |
| blocksIncorporealMovement | №0779 |
| blocksMovement | №0074 |
| bloodAscendent | №0809 |
| bloodCost | №0813 |
| bloodCostPerSpellLevel | №0813 |
| bloodCurseActor | №0655 (+ 1 других файлов) |
| bloodCurseAmplify | №0655 (+ 1 других файлов) |
| bloodCurseDistanceFt | №0655 (+ 1 других файлов) |
| bloodCurseExposure | №0655 |
| bloodCurseOfCorrosion | №0641 |
| bloodCurseOfHowl | №0641 |
| bloodCurseOfTheExorcist | №0641 |
| bloodCurses | №0688 |
| bloodCurseTargetsBloodless | №0779 |
| bloodhawk | №0686 |
| bloodhoundBruisers | №0716 |
| bloodHunterPuppet | №0641 (+ 1 других файлов) |
| bloodiedButUnbowed | №0716 (+ 1 других файлов) |
| bloodline | №0833 (+ 1 других файлов) |
| bloodlines | №0833 |
| bloodlustAdvantage | №0779 |
| bloodMaledict | №0641 (+ 1 других файлов) |
| bloodPrice | №0698 |
| bloodPriceAura | №0779 |
| bloodRiteRevival | №0655 |
| bludgeoning | №0871 |
| blue | №0832 |
| blushColor | №0066 |
| blushOpacity | №1320 |
| bob | №0061 (+ 1 других файлов) |
| bodiesCount | №0078 (+ 1 других файлов) |
| bodiesSpent | №0078 |
| body | №0066 (+ 35 других файлов) |
| bodyAccessories | №0061 |
| bodyColor | №0066 (+ 9 других файлов) |
| bodyDefaults | №0066 |
| bodyDestroyed | №0869 |
| bodyH | №0059 (+ 2 других файлов) |
| bodyHorror | №0629 |
| bodyHP | №0869 |
| bodyMaxHP | №0869 |
| bodyName | №0869 |
| bodyPossession | №0809 |
| bodyPreset | №0059 |
| bodyStats | №0816 |
| bodyTint | №0066 (+ 1 других файлов) |
| bolsteringSuppression | №0779 |
| bomb | №0677 (+ 1 других файлов) |
| bombDamage | №0677 |
| bombFormulas | №0677 |
| bombImmunity | №0779 |
| bombs | №0677 |
| bondedTarget | №0779 |
| bondOfBloodthirst | №0779 |
| bondOwnerId | №0818 |
| bondPartnerId | №0818 |
| bonds | №0686 |
| bondWilling | №0819 (+ 2 других файлов) |
| bone | №0667 (+ 1 других файлов) |
| boneAsh | №0673 |
| boneSpurring | №0779 |
| boneStock | №0667 (+ 1 других файлов) |
| boneStockV49 | №0667 |
| bonus | №0078 (+ 66 других файлов) |
| bonusAC | №0779 |
| bonusAction | №0078 (+ 27 других файлов) |
| bonusActionAfflict | №0779 |
| bonusActionAttack | №0776 |
| bonusActionAttackAfterExploit | №0779 |
| bonusActionAttackAfterSpell | №0813 |
| bonusActionAttacks | №0779 |
| bonusActionDash | №0078 |
| bonusActionDisengageOrHide | №0779 |
| bonusActionDisengageOrSearch | №0779 |
| bonusActionExtraWeaponAttack | №0779 |
| bonusActionFear30 | №0779 |
| bonusActionOrder | №0779 |
| bonusActions | №0658 |
| bonusActionSeed | №0809 |
| bonusActionSupport | №0776 |
| bonusActionSupportOrder | №0779 |
| bonusActionUnarmedOrGrapple | №0779 |
| bonusActionWeaponAttack | №0641 |
| bonusAttack | №0641 (+ 3 других файлов) |
| bonusAttackAfterInvoke | №0779 |
| bonusAttackVsFrightened | №0779 |
| bonusCantrip | №0779 |
| bonusCharnelTouchAfterAttack | №0809 |
| bonusDamage | №0078 (+ 9 других файлов) |
| bonusDamageDice | №0779 |
| bonusDamageDie | №0779 |
| bonusDamageOnHit | №0779 |
| bonusDash | №0779 |
| bonusDie | №0813 |
| bonuses | №0084 (+ 6 других файлов) |
| bonusFireDamage | №0686 |
| bonusGrapple | №0779 |
| bonusHealing | №0779 |
| bonusHp | №0779 (+ 1 других файлов) |
| bonusHpDice | №0779 |
| bonusKnownSpells | №0779 |
| bonusMaxHP | №0779 |
| bonusMeleeAttack | №0779 |
| bonusSpell | №0813 |
| bonusSpells | №0813 |
| bonusSteps | №0809 |
| bonusStrDexConRolls | №0779 |
| bonusWeaponAttackAfterCantrip | №0779 |
| book | №0067 |
| bookshelf | №0067 |
| boon | №0779 |
| boots | №0062 (+ 1 других файлов) |
| bottle | №0067 |
| bottom | №0066 (+ 6 других файлов) |
| boundary | №0058 |
| bounds | №0061 (+ 2 других файлов) |
| bountiful_luck | №0782 |
| bovineEarSize | №0066 (+ 1 других файлов) |
| bowDamageBonus | №0779 |
| bowyer | №0670 |
| boxingTechnique | №0776 |
| bra | №0062 |
| braceUp | №0779 |
| braid | №0061 (+ 1 других файлов) |
| brainsOverBrawn | №0779 |
| bramble | №0078 |
| brambleBomb | №0779 |
| brand | №0779 |
| brandAllyDistanceFt | №0655 |
| brandCastigation | №0655 (+ 2 других файлов) |
| brandOfAxiom | №0641 |
| brandOfCastigation | №0641 (+ 1 других файлов) |
| brandOfSundering | №0641 |
| brandOfTethering | №0641 (+ 1 других файлов) |
| brandOfVoracious | №0641 |
| brandSappingScar | №0641 |
| brawling | №0779 |
| breakConcentration | №0655 |
| breastSize | №0063 (+ 2 других файлов) |
| Breathing | №0080 |
| brew | №0813 |
| brewer | №0670 (+ 3 других файлов) |
| brewMinutes | №0809 |
| briefs_female | №0062 |
| briefs_male | №0062 |
| brightLightFt | №0779 |
| brightLightRadiusFt | №0779 |
| broken | №0066 (+ 2 других файлов) |
| browHeight | №0066 |
| browRidge | №0066 |
| browser | №1299 |
| brutalCritical | №0648 |
| bt_a | №1280 |
| bt_ally | №1174 (+ 5 других файлов) |
| bt_b | №1280 |
| bt_enemy | №1174 (+ 6 других файлов) |
| bt_friend | №1179 |
| bt_own | №1193 |
| bt_owner | №1176 (+ 1 других файлов) |
| bt_self | №1174 (+ 5 других файлов) |
| btoa | №1256 (+ 2 других файлов) |
| bubbles | №0700 |
| budgets | №0059 |
| buf | №0073 |
| buff | №0818 |
| buffer | №1157 (+ 3 других файлов) |
| buffers | №0069 (+ 3 других файлов) |
| bufferView | №1157 (+ 3 других файлов) |
| bufferViews | №1158 (+ 1 других файлов) |
| build | №0058 (+ 3 других файлов) |
| buildAnimations | №0068 |
| builder | №0670 |
| buildFeatureSet | №0648 (+ 2 других файлов) |
| bulette | №0686 |
| bull | №0061 |
| bullMuzzleSize | №0066 (+ 1 других файлов) |
| bun | №0061 (+ 1 других файлов) |
| burden | №0803 (+ 1 других файлов) |
| Burned | №0779 |
| burning | №0078 (+ 1 других файлов) |
| burningTicks | №1117 |
| burstDamage | №0779 |
| burstRadiusFt | №0779 |
| buttocks | №0059 |
| buttonColor | №0062 (+ 2 других файлов) |
| buttons | №0062 (+ 3 других файлов) |
| buy | №0799 (+ 2 других файлов) |
| buyFactor | №0799 (+ 1 других файлов) |
| bypassesTempHP | №0803 |
| byteLength | №1157 (+ 3 других файлов) |
| byteOffset | №1157 (+ 3 других файлов) |
| bytes | №0842 (+ 8 других файлов) |
| bytesDone | №0842 (+ 2 других файлов) |
| bytesTotal | №0842 (+ 2 других файлов) |
| c | №0811 (+ 19 других файлов) |
| cabinet | №0067 |
| cache | №0842 (+ 2 других файлов) |
| cackle | №0779 |
| calcifyingStrike | №0779 |
| calculateAC | №0827 |
| calculatedCombustion | №0779 |
| calculatedFlourish | №0829 |
| calculateEncounter | №0805 |
| calculateMaxHP | №0839 |
| call | №1209 |
| callAPI | №0853 |
| callFromBelow | №0779 |
| calligrapher | №0670 (+ 1 других файлов) |
| callOfIron | №0779 |
| calls | №0871 (+ 2 других файлов) |
| callToHavok | №0779 |
| campaign | №0848 |
| campaignEvent | №0783 |
| campaignEvents | №1230 |
| campaigns | №0642 |
| canAncestorAttack | №0818 |
| canApplyNatively | №0842 |
| canBarter | №0801 |
| canBecomeHuge | №0779 |
| canBurnSealForBlind | №0779 |
| canCaptureHost | №0816 |
| canCast | №0818 |
| cancel | №0886 |
| cancelReaction | №0818 |
| canCounter | №0779 |
| canCraftRecipe | №0670 |
| canDisassemble | №0665 |
| candle | №0067 |
| canEnterHost | №0816 |
| canHear | №1203 |
| canid | №0774 |
| canMerge | №0839 |
| canMove | №0818 |
| cannotBecomeRitual | №0813 |
| cannotLie | №0818 |
| cannotSurprise | №0776 |
| CANONICAL_2024_SUBCLASSES | №0078 |
| canopicJars | №0809 |
| canReceiveHealing | №0784 (+ 1 других файлов) |
| canRepair | №0665 |
| canRestHealBody | №0784 (+ 2 других файлов) |
| canSee | №0818 |
| canTarget0Hp | №0779 |
| cantrip | №0078 (+ 3 других файлов) |
| cantrips | №0641 (+ 4 других файлов) |
| cantripsByLevel | №0809 |
| cantripsKnown | №0707 (+ 2 других файлов) |
| canWalk | №0071 |
| cap | №0062 |
| capaciousAnathema | №0779 |
| capacity | №0779 (+ 4 других файлов) |
| capacityByLevel | №0813 |
| capacityFt3 | №0813 |
| capColor | №0066 (+ 1 других файлов) |
| cape | №0062 |
| capeWidth | №0062 |
| capSize | №0066 (+ 1 других файлов) |
| captain | №0739 (+ 1 других файлов) |
| capture | №0863 |
| capturedAt | №0816 |
| captureHost | №0816 |
| caravan | №0799 (+ 2 других файлов) |
| caravan_master | №0801 (+ 1 других файлов) |
| card | №0821 |
| cardId | №0818 |
| cards | №0821 (+ 2 других файлов) |
| careful | №0648 |
| carpenter | №0669 (+ 4 других файлов) |
| carried | №0806 |
| carryCapacity | №0813 |
| carryingCapacityMultiplier | №0779 |
| cart | №0067 |
| cartographer | №0668 (+ 5 других файлов) |
| cartographyQuality | №0671 |
| case | №0648 (+ 2 других файлов) |
| cases | №1844 |
| castAsRitual | №0813 |
| caster | №0655 (+ 3 других файлов) |
| casterId | №0819 (+ 2 других файлов) |
| casterLevel | №0798 (+ 2 других файлов) |
| castIllriggerActionSpell | №0779 |
| castingClass | №0811 (+ 5 других файлов) |
| castingStat | №0811 (+ 4 других файлов) |
| castingTime | №0760 (+ 16 других файлов) |
| castLucidSpellFree | №0779 |
| castSpell | №0779 (+ 1 других файлов) |
| castSpellInAttack | №0779 |
| castWish | №0779 |
| cat | №0061 (+ 21 других файлов) |
| cataclysm | №0844 |
| cataclysmicStrike | №0779 |
| catalog | №0628 (+ 27 других файлов) |
| catalogKey | №0819 (+ 2 других файлов) |
| catalyst | №0080 (+ 1 других файлов) |
| catalystId | №0080 |
| catalystReagent | №0826 |
| catalysts | №0079 (+ 1 других файлов) |
| catEarSize | №0066 (+ 2 других файлов) |
| categories | №0802 |
| category | №0074 (+ 50 других файлов) |
| catMuzzleSize | №0066 (+ 3 других файлов) |
| caucasian | №1163 |
| cauldron | №0067 (+ 1 других файлов) |
| causal | №0828 |
| ceilingCollision | №0818 |
| celerity | №0641 |
| Celerity | №0779 |
| celestial | №0063 (+ 14 других файлов) |
| celestialDiscourse | №0779 |
| celestialStance | №0779 |
| cell | №0071 (+ 1 других файлов) |
| cellFt | №0861 (+ 20 других файлов) |
| cellPx | №1259 |
| cellSize | №1166 |
| censurePeacemaker | №0779 |
| centaur | №1332 |
| centaurIndices | №0061 |
| centaurSize | №0066 (+ 2 других файлов) |
| center | №0061 (+ 14 других файлов) |
| centerY | №0058 |
| ceramic | №0668 (+ 2 других файлов) |
| cha | №0624 (+ 52 других файлов) |
| chaChecksAdvantage | №0779 |
| chaChecksDisadvantage | №0641 (+ 1 других файлов) |
| chain | №0078 |
| chainReport | №0667 |
| chair | №0067 |
| championCalls | №0735 |
| chance | №0774 (+ 3 других файлов) |
| chandelier | №0067 |
| changedVertices | №1162 |
| changeShape | №0813 |
| channel | №0810 (+ 3 других файлов) |
| channelDivinity | №0648 (+ 3 других файлов) |
| channels | №0068 |
| chant | №0828 |
| character | №0806 (+ 6 других файлов) |
| characterId | №0066 (+ 33 других файлов) |
| characterName | №1256 |
| characters | №0653 (+ 2 других файлов) |
| charcoal | №0668 (+ 3 других файлов) |
| charcoalFine | №0673 |
| charge | №0779 |
| chargeOnDeflect | №0078 |
| charges | №0648 (+ 2 других файлов) |
| chargesMax | №0648 |
| chargesSpent | №0078 (+ 1 других файлов) |
| chargeTempHP | №0779 |
| chargeWeapon | №0078 |
| charisma | №0786 (+ 10 других файлов) |
| charismaChecksAdvantage | №0641 |
| charismaReferencesUse | №0779 |
| charmed | №0818 (+ 2 других файлов) |
| charmedHours | №0779 |
| charmEffect | №0655 |
| charmOrCompel | №0779 |
| charmSourceId | №0818 |
| charnelHitThreshold | №0809 |
| charnelTouch | №0809 |
| charnelTouchMax | №0809 |
| charnelTouchSpendMax | №0809 |
| chaSave | №0779 |
| chaSavesDisadvantage | №0641 (+ 1 других файлов) |
| cheapShot | №0779 |
| check | №0779 (+ 2 других файлов) |
| checkAndStage | №0842 |
| checkBonus | №0670 (+ 1 других файлов) |
| checkBonusAll | №0672 |
| checked | №1182 (+ 1 других файлов) |
| checkMageTrack | №0818 |
| checkModifiers | №0078 (+ 6 других файлов) |
| checkResult | №1209 |
| checks | №0779 (+ 1 других файлов) |
| cheekbones | №0063 (+ 1 других файлов) |
| chef | №0672 |
| chest | №0059 (+ 6 других файлов) |
| chestShape | №1120 |
| Chieftain | №0795 |
| childAppearance | №0818 |
| childList | №0792 (+ 5 других файлов) |
| children | №1123 (+ 2 других файлов) |
| chinLength | №0063 (+ 1 других файлов) |
| chitin | №0826 |
| chitinPlate | №0667 (+ 1 других файлов) |
| choice | №0811 (+ 4 других файлов) |
| choiceMode | №0821 |
| choices | №0641 (+ 2 других файлов) |
| choiceSaved | №0871 (+ 1 других файлов) |
| choose | №0675 (+ 23 других файлов) |
| chooseAnyAilments | №0779 |
| chooseBeforeRoll | №0779 |
| chooseBond | №0686 |
| chooseCompanion | №0686 |
| chooseCraft | №0779 |
| chooseGrandHex | №0779 |
| chooseHex | №0779 |
| chooseKnown | №0641 |
| chooseMovement | №0078 |
| chooseResistance | №0078 |
| chooseSavingThrowProficiency | №0779 |
| chooseSpecialization | №0670 |
| chosenCreatureId | №0077 (+ 1 других файлов) |
| cinzel | №0832 |
| circumcised | №0059 |
| cl | №0073 |
| claimReward | №0818 |
| claimWagerReward | №0821 |
| clairvoyance | №0776 |
| clandestineSource | №0779 |
| class | №0624 (+ 3 других файлов) |
| CLASS | №0641 |
| CLASS_NAMES | №0648 |
| classAbilities | №0779 |
| classBonus | №0655 (+ 1 других файлов) |
| classes | №0786 (+ 46 других файлов) |
| CLASSES_REFERENCE | №1297 |
| classFeatureIds | №0811 (+ 5 других файлов) |
| classFeatureNotes | №0655 (+ 1 других файлов) |
| classFeaturesState | №0078 (+ 21 других файлов) |
| classKey | №0827 |
| classLevel | №0827 |
| classList | №1159 |
| className | №0624 (+ 56 других файлов) |
| clawColor | №0066 |
| clawSize | №0066 (+ 2 других файлов) |
| clay | №0668 (+ 2 других файлов) |
| cleanHead | №0066 |
| cleansed | №0818 |
| cleansingTouch | №0648 |
| clear | №0069 (+ 6 других файлов) |
| clearTimeout | №0663 (+ 5 других файлов) |
| cleric | №0798 (+ 1 других файлов) |
| clientId | №0810 (+ 5 других файлов) |
| clientX | №0863 (+ 1 других файлов) |
| clientY | №0863 (+ 1 других файлов) |
| climb | №0809 |
| climbSpeed | №0078 (+ 1 других файлов) |
| clingingCurse | №0779 |
| clone | №0071 (+ 1 других файлов) |
| close | №0063 (+ 9 других файлов) |
| closed | №0789 |
| closedChains | №0667 |
| closeReplay | №0847 |
| closet | №0067 |
| cloth | №0667 (+ 4 других файлов) |
| clothes | №1346 |
| clothing | №0062 (+ 18 других файлов) |
| clothingBuilds | №0063 |
| clothingId | №0062 |
| clothingTriangles | №0063 |
| cloudId | №0653 |
| cloudScope | №0060 |
| cls | №0648 |
| club | №1206 |
| coast | №0799 (+ 1 других файлов) |
| coast_caves | №0878 |
| coast_cliffs | №0878 |
| coast_grotto | №0878 |
| cobbler | №0670 (+ 3 других файлов) |
| code | №1149 |
| coins | №1215 (+ 3 других файлов) |
| col | №0073 (+ 1 других файлов) |
| cold | №0641 (+ 2 других файлов) |
| Cold | №0080 |
| collar | №0062 |
| collect | №0806 (+ 3 других файлов) |
| collectiveBody | №0839 |
| collectLoot | №0783 |
| color | №0059 (+ 9 других файлов) |
| colors | №0073 (+ 2 других файлов) |
| cols | №0078 (+ 21 других файлов) |
| column | №0851 |
| combat | №0848 (+ 1 других файлов) |
| combatant | №0656 |
| combatantId | №0783 (+ 2 других файлов) |
| combatants | №0078 (+ 52 других файлов) |
| combatEnd | №0818 |
| combatHooks | №0707 |
| combatInsight | №0813 |
| combatInspiration | №0648 |
| combatLog | №0865 |
| combatMasteries | №0698 |
| combatMastery | №0698 (+ 1 других файлов) |
| combatOnly | №0818 |
| combatTurnGate | №0686 |
| combineDisciplines | №0779 |
| combustion | №0779 |
| command | №0656 (+ 3 других файлов) |
| commandable | №0779 |
| Commander | №0795 |
| commandFamiliarAndUndeadTogether | №0779 |
| commandRangeMultiplier | №0776 |
| commands | №0779 |
| commandSpellsWithoutSlot | №0809 |
| commandWithoutFear | №0776 |
| commit | №1306 (+ 1 других файлов) |
| commitHostEvent | №1202 (+ 7 других файлов) |
| committed | №0665 |
| common | №0793 (+ 5 других файлов) |
| commonPeopleBonus | №0779 |
| companion | №0078 (+ 4 других файлов) |
| companionACBonus | №0686 |
| companionAction | №0776 |
| companionActor | №0686 |
| companionAttack | №0776 |
| companionDamage | №0776 |
| companionExtraAttack | №0776 |
| companionMagicAttacks | №0776 |
| companionRampage | №0776 |
| companionResistance | №0686 |
| companions | №0686 |
| companionType | №0078 (+ 2 других файлов) |
| compareVersions | №0842 |
| compatibility | №0842 |
| completeAttack | №0835 |
| components | №0068 (+ 14 других файлов) |
| componentType | №1157 (+ 3 других файлов) |
| compositeTerms | №1357 |
| compositions | №1306 |
| compressionLock | №0779 |
| con | №0624 (+ 55 других файлов) |
| concealPsionics | №0779 |
| concentration | №0655 (+ 31 других файлов) |
| concentrationCheck | №0655 |
| concentrationDC | №0827 |
| concentrationSaveBonus | №0779 |
| concentrationState | №0655 |
| concussion | №0078 |
| concussionBomb | №0779 |
| condition | №0078 (+ 11 других файлов) |
| conditionApplied | №0779 |
| conditionChoice | №0686 |
| conditionImmune | №0641 |
| conditionImmunity | №0779 |
| conditionLabel | №0664 |
| conditionModeApplied | №0655 |
| conditionModifiers | №0827 (+ 2 других файлов) |
| conditionNotes | №1196 |
| conditionRemoved | №0871 |
| conditions | №0655 (+ 17 других файлов) |
| CONDITIONS | №0655 (+ 2 других файлов) |
| conditionsImmune | №0658 |
| coneWisdomSave | №0779 |
| config | №0850 |
| configurable | №0818 |
| configure | №0653 |
| configured | №0653 (+ 1 других файлов) |
| confirm | №1119 (+ 3 других файлов) |
| conflict | №0079 (+ 2 других файлов) |
| conflicts | №0653 |
| connected | №0810 (+ 2 других файлов) |
| conSave | №0779 |
| conscious | №0818 |
| console | №1159 |
| constant | №0655 (+ 7 других файлов) |
| constitution | №0786 (+ 12 других файлов) |
| Constitution | №0080 |
| constitutionHalfDamageFailure | №0779 |
| constitutionHalfDamageSuccess | №0779 |
| constitutionMaxBonus | №0779 |
| construct | №0628 (+ 12 других файлов) |
| constructBody | №0809 |
| constructConcentration | №0779 |
| constructDamageBonus | №0779 |
| constructMode | №0779 |
| consumableFunctional | №1213 |
| consumables | №0793 (+ 31 других файлов) |
| consume | №0672 (+ 1 других файлов) |
| consumed | №0672 (+ 2 других файлов) |
| consumedPotion | №0078 |
| consumeLairAction | №0805 |
| consumeLegendaryAction | №0805 |
| consumeLegendaryResistance | №0805 |
| consumeMageBerry | №0818 |
| consumeMagicMeleeWeapon | №0779 |
| consumeMaximum | №0818 |
| consumeOn | №0818 |
| consumePendingOnHit | №0648 (+ 1 других файлов) |
| consuming | №0714 (+ 1 других файлов) |
| Consuming | №0795 |
| consumption | №0779 |
| container | №0789 |
| containerId | №1184 |
| containerRequired | №0779 |
| containers | №0806 (+ 6 других файлов) |
| containerType | №0789 |
| content | №0071 (+ 1 других файлов) |
| contentPackId | №0078 (+ 6 других файлов) |
| contents | №0789 (+ 6 других файлов) |
| contentType | №1322 |
| context | №0655 (+ 1 других файлов) |
| contextIsolation | №0886 |
| contextRestore | №1319 |
| contingencyPlan | №0779 |
| contracts | №0698 |
| controlMode | №0078 (+ 5 других файлов) |
| controlWithoutAction | №0779 |
| controlWithSameAction | №0779 |
| conversant | №0641 |
| Conversant | №0779 |
| convertDamage | №0813 |
| cook | №0670 (+ 4 других файлов) |
| coordinatedAssault | №0779 |
| copper | №0673 |
| copy | №0658 |
| copyDeleted | №0653 |
| core | №0795 |
| CORE | №0648 |
| core_2014 | №0628 |
| coreLoop | №0707 |
| corpseFlorist | №0809 |
| corpseId | №0809 |
| corpseTypes | №0779 |
| corrosion | №0641 (+ 1 других файлов) |
| corset | №1130 |
| cost | №0078 (+ 36 других файлов) |
| costGp | №0799 (+ 4 других файлов) |
| costs | №0624 (+ 1 других файлов) |
| cot | №0067 |
| cotton | №0062 (+ 1 других файлов) |
| counselorProtege | №0779 |
| count | №0061 (+ 64 других файлов) |
| counter | №0067 |
| counterAttackIfReducedToZero | №0779 |
| countercharm | №0648 |
| countered | №0811 |
| countsAsHit | №0779 |
| courageSource | №0655 |
| coven | №0813 |
| covens | №0707 |
| cover | №0811 (+ 6 других файлов) |
| coverBonus | №0811 (+ 1 других файлов) |
| covered | №0059 |
| coversTop | №0062 |
| cp | №0790 (+ 7 других файлов) |
| cr | №0628 (+ 18 других файлов) |
| craft | №0779 (+ 5 других файлов) |
| craftBonus | №0808 |
| craftCheck | №0671 (+ 1 других файлов) |
| craftDC | №0671 (+ 1 других файлов) |
| crafted | №0080 (+ 5 других файлов) |
| craftedOnly | №0793 |
| craftEffect | №0671 |
| craftFeature | №0779 |
| craftingBonus | №0663 (+ 3 других файлов) |
| craftingMaterial | №0664 |
| craftingProfessions | №0669 (+ 2 других файлов) |
| craftingProfile | №0672 |
| craftingSources | №0672 |
| craftMasterworkBonus | №0665 (+ 2 других файлов) |
| craftMaterialId | №0628 (+ 14 других файлов) |
| craftOutcome | №0672 (+ 1 других файлов) |
| craftProfession | №0671 (+ 1 других файлов) |
| craftQuality | №0665 (+ 6 других файлов) |
| craftQualityLabel | №0674 |
| craftRecipe | №0668 (+ 3 других файлов) |
| craftRoll | №0674 |
| CRAFTS | №0779 |
| craftTags | №0667 |
| craftTime | №0668 (+ 2 других файлов) |
| craftTools | №0668 |
| craftValue | №0671 (+ 1 других файлов) |
| craftValueNote | №0665 |
| crate | №0067 |
| create | №0076 (+ 7 других файлов) |
| createAvatar | №0839 |
| createBodyStatBlock | №0869 |
| createBoneObject | №0779 |
| createCharacter | №0066 |
| created | №0779 (+ 1 других файлов) |
| createdAt | №0071 (+ 8 других файлов) |
| createdAtTurn | №0078 |
| createElement | №1119 (+ 23 других файлов) |
| createFor | №0657 (+ 2 других файлов) |
| createHostStatBlock | №0816 |
| createLarvaStatBlock | №0816 |
| createObjectURL | №1259 |
| createOozeDuplicate | №0078 |
| createProjectedItem | №0779 |
| createRoom | №1256 |
| createShell | №0784 |
| creationOptions | №0818 |
| creator | №0795 |
| creatorMind | №0779 |
| creatures | №0839 |
| creatureType | №0646 (+ 12 других файлов) |
| crescendoOfViolence | №0779 |
| crest | №0061 |
| crestSize | №0066 (+ 1 других файлов) |
| crewLeader | №0779 |
| crewRangeFt | №0779 |
| crewSaveBonus | №0779 |
| crewSize | №0779 |
| crewSupport | №0776 |
| criminalContact | №0779 |
| crimson | №0832 |
| crimsonRite | №0641 |
| crimsonRites | №0688 |
| cripplingJinx | №0779 |
| cripplingStrike | №0779 |
| critFearAoEFt | №0641 |
| critical | №0655 (+ 35 других файлов) |
| critical_failure | №0664 (+ 1 других файлов) |
| criticalDoubles | №0779 (+ 1 других файлов) |
| criticalHit | №0779 |
| criticalOn | №0776 |
| criticalOnHit | №0779 |
| criticalRange | №0648 (+ 2 других файлов) |
| criticalSpellcasting | №0809 |
| critRange | №0641 |
| critWithRiteRestoresBloodMaledict | №0779 |
| crLimit | №0779 |
| crone | №0809 |
| crop | №0061 |
| crow | №0061 |
| crown | №0061 (+ 1 других файлов) |
| crown_braid | №0061 (+ 1 других файлов) |
| crownColor | №0066 (+ 1 других файлов) |
| crownSize | №0066 (+ 3 других файлов) |
| crScale | №0078 |
| crTotal | №0809 |
| cruelty | №0641 |
| Cruelty | №0779 |
| cryo | №0078 |
| cryoBomb | №0779 |
| crypto | №1124 (+ 25 других файлов) |
| crystal | №0668 (+ 3 других файлов) |
| cssText | №1179 |
| ctx | №0073 (+ 1 других файлов) |
| cube | №0686 |
| cunningAction | №0648 |
| cunningInstinct | №0779 |
| cupNumber | №0818 (+ 3 других файлов) |
| cups | №0062 (+ 2 других файлов) |
| cups_05 | №0818 |
| cups_13 | №0818 |
| cupsize | №1163 |
| curl | №0061 |
| curly_long | №0061 (+ 1 других файлов) |
| curly_short | №0061 (+ 1 других файлов) |
| current | №0071 (+ 34 других файлов) |
| currentCampaignId | №0642 |
| currentChar | №1210 (+ 5 других файлов) |
| currentCharacter | №1229 |
| currentFloor | №0071 |
| currentHP | №0784 (+ 3 других файлов) |
| currentId | №0847 |
| currentLevel | №0670 |
| currentVersion | №0842 |
| curse | №0077 (+ 10 других файлов) |
| curseAbility | №0077 |
| curseAbilityCheckDC | №0779 |
| curseBonusDamage | №0641 |
| curseCombination | №0779 |
| curseConcentrationAdvantage | №0813 |
| cursed | №0063 (+ 1 других файлов) |
| cursedAttackPenalty | №0641 |
| cursedCheckModifiers | №0641 |
| curseDetection30 | №0779 |
| cursedSaveModifiers | №0641 |
| curseImmunity | №0779 |
| curseItem | №0813 |
| curseMastery | №0776 |
| curseName | №0779 |
| cursePenalty | №0809 |
| cursePower | №0776 |
| curses | №0641 (+ 4 других файлов) |
| CURSES | №0779 |
| curseSave | №0809 |
| curseSpecialist | №0641 |
| curseSpells | №0779 |
| curseTarget | №0779 |
| custom | №0066 (+ 2 других файлов) |
| customColor | №0061 (+ 2 других файлов) |
| customCrafted | №0674 |
| customDress | №0062 |
| CustomEvent | №1159 (+ 1 других файлов) |
| customizations | №1128 (+ 1 других файлов) |
| customShirt | №0062 |
| customSkirt | №0062 |
| cut | №0062 (+ 2 других файлов) |
| cutoff | №1357 |
| cwd | №1116 (+ 3 других файлов) |
| cx | №0058 (+ 2 других файлов) |
| cycles | №0825 (+ 1 других файлов) |
| cz | №0061 (+ 1 других файлов) |
| d | №0058 (+ 6 других файлов) |
| d2 | №1165 (+ 2 других файлов) |
| d20 | №0655 (+ 2 других файлов) |
| d20Modifiers | №0818 |
| d6 | №0078 |
| damage | №0074 (+ 89 других файлов) |
| DAMAGE_TYPES | №0655 |
| damageAfter | №0779 |
| damageAtTurnStart | №0078 |
| damageBefore | №0779 |
| damageBody | №0816 (+ 1 других файлов) |
| damageBonus | №0779 (+ 1 других файлов) |
| damageBonusMultiplier | №0779 |
| damageBoost | №0776 |
| damageContext | №0811 |
| damageDice | №0078 (+ 14 других файлов) |
| damageDie | №0776 (+ 1 других файлов) |
| damageDoubled | №0655 |
| damageDurability | №0666 |
| damageImmunity | №0779 |
| damageModifiers | №0641 (+ 1 других файлов) |
| damageMult | №0839 |
| damageOnFailedSave | №0779 |
| damageParts | №0641 (+ 6 других файлов) |
| damagePer10Ft | №0779 |
| damagePerTrigger | №0779 |
| damageRedirect | №0813 |
| damageReduction | №0648 (+ 4 других файлов) |
| damageResistance | №0776 (+ 1 других файлов) |
| damageResult | №0655 (+ 1 других файлов) |
| damageRoll | №0078 (+ 4 других файлов) |
| damageRolled | №0818 |
| damageSelf | №0779 |
| damageShell | №0784 |
| damageTaken | №0655 |
| damageType | №0078 (+ 84 других файлов) |
| damageTypeChoice | №0779 |
| damageTypes | №0078 (+ 5 других файлов) |
| danceBonusByCount | №0809 |
| dangerSense | №0648 |
| daringRescue | №0779 |
| dark | №0868 |
| darkArcana | №0809 |
| darkAugmentation | №0641 |
| darkCaptain | №0779 |
| darkDelirium | №0811 |
| darkMagic | №0776 |
| darkness | №0071 (+ 1 других файлов) |
| darknessAroundInterdictedFt | №0779 |
| darkOneDiscourse | №0779 |
| darkOnesBlessing | №0648 |
| darkvision | №0833 |
| darkvision60 | №0779 |
| darkvisionBonusFt | №0641 |
| darkvisionFt | №0641 (+ 1 других файлов) |
| dash | №0776 |
| dashMageRetreat | №0818 |
| dastardlyTalents | №0779 |
| data | №0077 (+ 10 других файлов) |
| dataset | №1144 |
| date | №0642 (+ 1 других файлов) |
| dauntless | №0739 |
| dawn | №0641 |
| day | №0073 |
| dc | №0077 (+ 45 других файлов) |
| dcReduction | №0672 |
| dead | №0078 (+ 6 других файлов) |
| deadMistAcolyte | №0809 |
| deadShell | №0784 |
| deadSpace | №0779 (+ 1 других файлов) |
| deadSpaceSlots | №0809 |
| deafened | №0078 (+ 1 других файлов) |
| deathAfterDuration | №0779 |
| deathCause | №1118 |
| deathExplosion | №0809 |
| deathKnight | №0809 |
| deathPenalty | №0779 |
| deathSave | №0655 |
| deathSaveDisadvantage | №0641 (+ 1 других файлов) |
| deathSaveFailures | №0655 |
| deathSaves | №0655 (+ 6 других файлов) |
| deathWard | №0813 |
| debug | №0848 |
| decayPerHour | №0078 |
| deception | №0772 (+ 1 других файлов) |
| deceptionBlocked | №0818 |
| deceptionIntent | №1197 |
| deceptionTotal | №0078 (+ 1 других файлов) |
| deck | №0821 (+ 1 других файлов) |
| decks | №0821 |
| declaredSourceCommit | №1357 |
| decorateItem | №0670 |
| deepSleeper | №0779 |
| deerHide | №0673 |
| default | №0066 (+ 2 других файлов) |
| DEFAULT | №0071 |
| DEFAULT_ENABLED | №0666 |
| DEFAULT_RACES | №1297 |
| defaultEnabled | №1151 |
| defaultSkinByGender | №0066 |
| defaultSkinId | №0066 |
| defeat | №0838 |
| defeated | №0078 (+ 9 других файлов) |
| defenderAura | №0776 |
| defenderReaction | №0655 (+ 4 других файлов) |
| defensive_duelist | №0782 |
| defensiveStance | №0779 |
| deferDamage | №0811 (+ 1 других файлов) |
| definition | №0818 |
| definitions | №0818 |
| deflected | №0655 |
| deflectMissiles | №0648 |
| deformAsset | №0068 |
| deformedPositions | №1141 |
| deftness | №0641 |
| Deftness | №0779 |
| deinonychus | №0686 |
| deleted | №0653 (+ 1 других файлов) |
| denial | №0779 |
| deniesActions | №0078 |
| denominator | №0821 |
| density | №0059 (+ 2 других файлов) |
| denValues | №0062 |
| denyAttackAdvantage | №0779 |
| denyBonusActions | №0078 |
| denyDashDisengageDodge | №0078 |
| depleted | №1211 |
| depth | №0061 (+ 4 других файлов) |
| desc | №0624 (+ 13 других файлов) |
| describeProfession | №0670 |
| description | №0071 (+ 70 других файлов) |
| descriptor | №0059 |
| deserialize | №0066 |
| desk | №0067 |
| destination | №0818 (+ 8 других файлов) |
| destinationGender | №1357 |
| destroy | №0843 |
| destroyThrallToHeal | №0809 |
| destroyUndead | №0648 |
| detail | №0066 (+ 3 других файлов) |
| details | №0784 (+ 3 других файлов) |
| detectIllusionAndShapeshifter | №0779 |
| detectMagic | №0779 (+ 1 других файлов) |
| dethek | №0779 (+ 1 других файлов) |
| dethekStance | №0779 |
| devicePixelRatio | №1119 (+ 1 других файлов) |
| devices | №0670 |
| deviceScaleFactor | №1334 |
| devilDamageMaximum | №0818 |
| devilPlan | №0818 |
| deviousTactics | №0779 |
| devouring | №0779 (+ 1 других файлов) |
| devTools | №0886 |
| dex | №0624 (+ 56 других файлов) |
| dexBonus | №0641 |
| dexChecksAdvantage | №0641 (+ 1 других файлов) |
| dexIncrease | №0779 |
| dexMaxBonus | №0641 |
| dexMaxIncrease | №0779 |
| dexSave | №0779 |
| dexSavesDisadvantage | №0641 (+ 1 других файлов) |
| dexSaveVisible | №0655 (+ 1 других файлов) |
| dexterity | №0786 (+ 10 других файлов) |
| Dexterity | №0080 |
| dexteritySaveProficiency | №0779 |
| diagnostics | №0063 (+ 1 других файлов) |
| diagonal | №0820 |
| dialect | №0779 (+ 1 других файлов) |
| diamondForm | №0779 |
| diamondPaste | №0673 |
| diamondSoul | №0648 |
| dice | №0077 (+ 9 других файлов) |
| diceCount | №0647 (+ 3 других файлов) |
| diceSides | №0647 (+ 3 других файлов) |
| die | №0081 (+ 6 других файлов) |
| diet | №0628 (+ 12 других файлов) |
| difficultTerrain | №1251 |
| difficulty | №0805 |
| digDeep | №0716 (+ 1 других файлов) |
| digits | №0061 |
| diminutive | №0833 (+ 1 других файлов) |
| dimLightAdditionalFt | №0779 |
| direct | №0818 (+ 2 других файлов) |
| directAttackNearestIfFailed | №0779 |
| directDice | №0078 |
| direction | №0073 (+ 6 других файлов) |
| directionSense | №0779 |
| directShift | №0833 |
| dirty | №0653 |
| dirtyHit | №0779 |
| dirtyStrike | №0776 |
| disabled | №0664 (+ 2 других файлов) |
| disabledBlocked | №1151 |
| disableSense | №0779 |
| disadvantage | №0078 (+ 10 других файлов) |
| disadvantageAgainstOthers | №0779 |
| disadvantageAgainstOthersWithinFt | №0779 |
| disadvantageAgainstSelf | №0779 |
| disadvantageAttacksExceptSelfUntilEndNextTurn | №0779 |
| disadvantageFirstSaveAgainstSpell | №0779 |
| disadvantageInDimLight | №0779 |
| disadvantageNextAttack | №0779 |
| disadvantageOnSaveWhenHidden | №0779 |
| disadvantageSaves | №0779 |
| disadvantageVsBloodHunterSpells | №0779 |
| disarm | №0776 (+ 1 других файлов) |
| disassembleItem | №0664 (+ 1 других файлов) |
| discard | №0821 |
| disciplinaryAdept | №0779 |
| discipline | №0714 (+ 4 других файлов) |
| disciplines | №0714 (+ 2 других файлов) |
| disciplineUsesPerTurn | №0714 |
| discovered | №0079 (+ 1 других файлов) |
| discoveries | №0078 (+ 3 других файлов) |
| discovery | №0078 (+ 1 других файлов) |
| discoveryBonus | №0081 |
| discoveryLevelGating | №0677 |
| discoveryRecipes | №0078 |
| disengageOnHit | №0776 |
| disguise | №0672 |
| disguiseAndHexFocus | №0813 |
| disguiseAppearance | №0078 |
| disguiser | №0670 (+ 1 других файлов) |
| dismissMageArmor | №0818 |
| disoriented | №0779 |
| disorientedDice | №0779 |
| dispellingAnathema | №0779 |
| display | №0799 (+ 1 других файлов) |
| displayName | №0645 (+ 3 других файлов) |
| dispose | №0073 |
| dist | №0811 |
| distance | №0656 (+ 2 других файлов) |
| distanceFt | №0641 (+ 18 других файлов) |
| distant | №0648 |
| divineChannelUses | №0809 |
| divineIntervention | №0648 |
| divineMandate | №0779 |
| divineRespite | №0803 |
| divineSense | №0648 |
| divineSmite | №0648 (+ 2 других файлов) |
| dlc | №0666 |
| DND_CLASSES_LIST | №1297 |
| DND_UPDATE_MANIFEST_URL | №1296 |
| dndBackgrounds | №1297 |
| DNDBattleBoard | №1230 |
| DNDCampaign | №1229 (+ 1 других файлов) |
| DNDCloudConfig | №1149 |
| DNDCombat | №1229 (+ 1 других файлов) |
| DNDContent | №1117 (+ 2 других файлов) |
| DNDGameplayV57 | №1230 |
| DNDGLTF | №1119 |
| DndLanBridge | №1256 |
| DNDMonsterLoot | №1229 |
| dndMorphChannels | №1119 (+ 1 других файлов) |
| dndMorphSource | №1308 |
| dndNetwork | №1229 (+ 1 других файлов) |
| DNDRules | №1291 |
| DNDSummoning | №1229 |
| dock | №0070 |
| document | №1117 (+ 39 других файлов) |
| documentElement | №1159 |
| dodge | №0779 |
| dogAndHound | №0716 |
| dominantCharacteristics | №0869 |
| donorHitDieSpent | №0813 |
| donorType | №0078 (+ 1 других файлов) |
| donorVerified | №1118 |
| door | №0067 |
| doubleBreath | №0779 |
| doubleFoodSleepInterval | №0779 |
| doubleProficiency | №0779 |
| doubleSided | №0069 |
| doubleSpeed | №0809 |
| doublingJinx | №0779 |
| downButNotOut | №0716 (+ 1 других файлов) |
| downButNotOutActive | №0779 |
| downstreamRecipeAvailable | №0663 |
| draconicDiscourse | №0779 |
| draconicElement | №1268 |
| draconicResilience | №0648 |
| draconicStance | №0779 |
| draft | №0861 |
| dragging | №0626 |
| dragon | №0061 (+ 17 других файлов) |
| dragon_fear | №0782 |
| dragonArmyAffinity | №0631 |
| dragonFamily | №1224 |
| dragonlance | №0631 |
| dragonReagent | №0667 (+ 1 других файлов) |
| dragonsAscent | №0779 |
| dragonScale | №0667 (+ 1 других файлов) |
| dragonScaleRed | №0673 |
| draw | №0072 (+ 2 других файлов) |
| draws | №1119 |
| dreadfulGlare | №0779 |
| dreadlord | №0779 |
| dreadPresence | №0779 |
| dress | №0062 (+ 1 других файлов) |
| dressSleeves | №0062 |
| driedHerbBundle | №0672 |
| driedMeat | №0672 (+ 1 других файлов) |
| dropObject | №0779 |
| dropToOneHP | №0686 |
| Drowned | №0779 |
| druid | №0798 (+ 1 других файлов) |
| druidic | №0648 |
| dryRun | №0663 (+ 6 других файлов) |
| duplicate | №0852 |
| duplicateOnPhaseRift | №0779 |
| duplicateTargetCollisions | №1171 |
| dur | №0667 |
| durability | №0665 (+ 4 других файлов) |
| durabilityBonus | №0669 |
| durabilityMax | №1150 (+ 1 других файлов) |
| durabilityMultiplier | №0665 (+ 2 других файлов) |
| duration | №0068 (+ 21 других файлов) |
| durationHours | №0641 (+ 2 других файлов) |
| durationMinutes | №0078 (+ 6 других файлов) |
| durationRounds | №0077 (+ 4 других файлов) |
| durationRule | №0833 |
| durationSeconds | №0818 (+ 1 других файлов) |
| durationTurns | №0809 |
| durationUnit | №0657 (+ 1 других файлов) |
| durationUntilSave | №0809 |
| durationUntilStartOfTurn | №0779 |
| duringShortRest | №1118 |
| dusk | №0073 |
| dwarf | №0663 |
| dwarf_hill | №0672 |
| dwarf_mountain | №0672 |
| dwarven_fortitude | №0782 |
| dwarvishDiscourse | №0779 |
| dyingCurse | №0779 |
| dynamic | №0061 |
| e | №0074 (+ 1 других файлов) |
| earField | №0061 |
| earFrame | №0062 |
| earLength | №0066 (+ 6 других файлов) |
| earPointiness | №0066 (+ 6 других файлов) |
| earth | №0686 |
| Earth | №0080 |
| earthCore | №0826 |
| earthEssence | №0826 |
| earTuftSize | №0066 (+ 2 других файлов) |
| ecology | №0628 (+ 12 других файлов) |
| ectoplasm | №0667 (+ 1 других файлов) |
| edition | №0077 (+ 23 других файлов) |
| effect | №0078 (+ 20 других файлов) |
| effectiveD20 | №0655 |
| effectiveDamage | №0655 |
| effectiveMaxHp | №0827 |
| effectiveMode | №1196 |
| effectiveStats | №0816 |
| effectKey | №0816 |
| effects | №0080 (+ 7 других файлов) |
| elasticHide | №0826 |
| Elderheart | №0795 |
| eldritchBane | №0779 |
| eldritchCannon | №0648 |
| eldritchInvocations | №0648 |
| eldritchMaster | №0648 |
| electricCharge | №0779 |
| elemental | №0063 (+ 14 других файлов) |
| Elemental | №0795 |
| elementalAsh | №0667 (+ 1 других файлов) |
| elementalBlast | №0779 |
| elementalPower | №0779 |
| elephant | №0061 |
| elephantEarSize | №0066 (+ 1 других файлов) |
| elephantTuskSize | №0066 (+ 1 других файлов) |
| elevationFt | №0818 |
| elf_wood | №0672 |
| elfcity | №0063 |
| eligible | №1208 |
| elixirs | №0670 |
| eloquentSpeech | №0779 |
| elven_accuracy | №0782 |
| email | №0653 (+ 2 других файлов) |
| emanationFt | №0779 |
| embers | №0641 |
| Embers | №0779 |
| emerald | №0868 |
| emergencyReanimate | №0869 |
| emissaryPhaseHooks | №1217 |
| empowered | №0648 (+ 1 других файлов) |
| empty | №0819 |
| enableApply | №0843 |
| enabled | №0059 (+ 6 других файлов) |
| enchant | №0670 |
| enclosed | №0059 |
| encoding | №0889 (+ 7 других файлов) |
| encounter | №0860 (+ 1 других файлов) |
| encounterBias | №0632 |
| encounterId | №0818 (+ 2 других файлов) |
| end | №0061 (+ 2 других файлов) |
| endActorTurn | №0641 |
| endAllRites | №0779 |
| endCondition | №0779 |
| endConditions | №0779 |
| endedByZeroHp | №0655 |
| endEffectPsi | №0779 |
| endEncounter | №0686 |
| endExternalPetrificationAfter | №0779 |
| endIllusion | №0779 |
| endInvisibility | №0779 |
| endPossession | №0784 |
| endRampage | №0686 |
| ends | №0844 |
| endsAt | №0779 |
| endsOnAttack | №0078 (+ 1 других файлов) |
| endsOnAttackOrSpell | №0779 |
| endsOnDamage | №0078 |
| endsOnHostile | №0818 |
| endsOnMagicHealing | №0686 |
| endsOnMove | №0779 |
| endsOnRemoveCurse | №0779 |
| endSpellConcentration | №0818 |
| endsWhen | №0779 |
| endTurn | №0783 (+ 3 других файлов) |
| enemiesFrightened | №0779 |
| enemy | №1176 (+ 6 других файлов) |
| enemyDistanceFt | №1209 |
| enemyRead | №0776 |
| enervatingJinx | №0779 |
| enervatingSpell | №0779 |
| eng | №0745 |
| engines | №0848 (+ 1 других файлов) |
| englishName | №0077 (+ 29 других файлов) |
| enhancement | №0779 |
| enhancingSurge | №0779 |
| enlightened | №0779 |
| enliveningOrder | №0779 |
| enshroudingImprecation | №0779 |
| ensure | №0784 (+ 8 других файлов) |
| ensureCharacterProfessions | №0670 |
| ensureMaterial | №0667 |
| ensureResourceState | №0805 |
| ensureTracker | №0783 (+ 1 других файлов) |
| enterSpiritForm | №0784 |
| entities | №0078 (+ 2 других файлов) |
| entity | №0078 (+ 4 других файлов) |
| entityId | №0078 (+ 4 других файлов) |
| entries | №0653 (+ 1 других файлов) |
| entryRoute | №0869 |
| enumerable | №0818 |
| env | №1116 |
| ep | №0790 (+ 5 других файлов) |
| equip | №0066 |
| equipment | №0066 (+ 6 других файлов) |
| equipmentId | №0066 |
| equipMilitia | №0779 |
| equipped | №0074 (+ 6 других файлов) |
| equippedArmor | №1151 |
| error | №0063 (+ 33 других файлов) |
| error_code | №1149 |
| errors | №0661 (+ 1 других файлов) |
| essence | №0826 |
| eTexture | №0076 |
| ethanol | №0673 |
| ethereal | №0779 |
| evasion | №0648 (+ 3 других файлов) |
| evasionMonk | №0648 |
| event | №0818 (+ 3 других файлов) |
| eventCount | №0847 (+ 2 других файлов) |
| eventId | №0819 (+ 1 других файлов) |
| eventLog | №0862 (+ 2 других файлов) |
| eventLogBaseSeq | №1289 |
| events | №0847 (+ 5 других файлов) |
| eventSeq | №0810 (+ 5 других файлов) |
| exact | №1322 |
| exaltedLeader | №0739 |
| exaltedMutation | №0641 |
| exaltedProtege | №0779 |
| excellent | №0808 |
| exceptional | №0664 (+ 1 других файлов) |
| exceptPsychic | №0779 |
| exclude | №0058 |
| excludeUndeadConstructs | №0818 (+ 2 других файлов) |
| executablePath | №1311 (+ 37 других файлов) |
| executeAttack | №0783 |
| executionActor | №0818 |
| exhaustion | №0779 (+ 2 других файлов) |
| exhaustionAfter | №0776 |
| exhaustionApplied | №0779 |
| exhaustionGain | №0776 |
| exhaustionOnFailedSave | №0779 |
| exit | №1154 |
| exorcist | №0641 (+ 1 других файлов) |
| exoskeletonArmor | №0779 |
| exp | №0780 |
| expand | №0660 |
| expanded | №0660 (+ 1 других файлов) |
| expected | №0854 (+ 2 других файлов) |
| expectedProcessed | №0826 |
| expectedRevision | №0793 (+ 21 других файлов) |
| expendHitDie | №0779 |
| experience | №0786 |
| experimental | №0079 (+ 1 других файлов) |
| experimentalist | №0677 |
| experiments | №0079 (+ 1 других файлов) |
| expertFocus | №0779 |
| expertise | №0779 (+ 1 других файлов) |
| expertiseSkills | №0779 |
| expired | №0078 |
| expires | №0078 (+ 3 других файлов) |
| expires_at | №0653 |
| expires_in | №1149 |
| expiresAt | №0077 (+ 3 других файлов) |
| expiresRounds | №0779 |
| exploded | №0078 |
| explodeRadiusFt | №0078 |
| explodesOncePerTurn | №0779 |
| exploit | №0686 |
| exploitDice | №0739 |
| exploitDie | №0739 (+ 1 других файлов) |
| exploits | №0739 (+ 1 других файлов) |
| exploitsKnown | №0739 |
| explosiveBane | №0779 |
| explosiveCannon | №0811 |
| exportedAt | №0847 |
| exportedMacros | №1357 |
| exportJSON | №0063 (+ 1 других файлов) |
| exportReplay | №0847 |
| exportSession | №0860 (+ 1 других файлов) |
| exposingStrike | №0779 |
| exposure | №0641 |
| expression | №0655 (+ 2 других файлов) |
| extended | №0648 |
| extendedResourceState | №0648 |
| extendedTactics | №0735 |
| extendExistingDarkvisionFt | №0641 |
| extendHex | №0776 |
| extendHexRounds | №0779 |
| external | №0059 (+ 2 других файлов) |
| externalGeometryAvailable | №0059 |
| externalGeometryReady | №0059 |
| externalGeometryStage | №0059 |
| extra | №0079 (+ 2 других файлов) |
| extraAction | №0779 (+ 1 других файлов) |
| extraActionNextTurn | №0818 |
| extraAstralConstruct | №0779 |
| extraAtk | №0647 (+ 1 других файлов) |
| extraAttack | №0641 (+ 7 других файлов) |
| extraAttackDamage | №0641 |
| extraAttacks | №0077 (+ 13 других файлов) |
| extraBloodMaledictUse | №0641 (+ 1 других файлов) |
| extraCantrips | №0813 |
| extraClassType | №0646 |
| extraCurseArmamentAttack | №0779 |
| extraCursedAttunement | №0779 |
| extraDamage | №0078 (+ 2 других файлов) |
| extraDamageByLevel | №0077 |
| extraDamageDice | №0779 |
| extraDamageDie | №0779 |
| extraDice | №0078 (+ 8 других файлов) |
| extraDieVsUndead | №0779 |
| extradimensional | №0813 |
| extraDimLight | №0779 |
| extraDimLightDie | №0779 |
| extraDiscipline | №0779 |
| extraDmg | №0647 (+ 2 других файлов) |
| extraExploitDice | №0779 |
| extraExploitKnown | №0779 |
| extraFamiliarAction | №0813 |
| extraForms | №0779 |
| extraKnowledgeSkill | №0779 |
| extraMovement | №0818 |
| extraNecrotic | №0779 |
| extrapolated | №1308 |
| extraPsiOverMax | №0779 |
| extraPsychicDice | №0779 |
| extraRadiusFt | №0078 |
| extraRampageDie | №0779 |
| extraReaction | №0818 |
| extraReactions | №0818 |
| extraRiteDie | №0779 |
| extras | №1119 (+ 1 других файлов) |
| extraSaveBonus | №0872 |
| extraSkillChoice | №0779 |
| extraSuture | №0809 |
| extraTargetPerSlotAbove1 | №0779 |
| extraTargets | №0779 |
| extraTrigger | №1845 |
| extraTurns | №0813 |
| extraUnarmedAfterTwoOldOneTwo | №0779 |
| extraUse | №0779 (+ 1 других файлов) |
| eye | №0061 (+ 1 других файлов) |
| eyeColor | №0066 (+ 3 других файлов) |
| eyeGlow | №0066 (+ 2 других файлов) |
| eyeHeight | №0063 (+ 2 других файлов) |
| eyeless | №0641 |
| eyeliner | №1320 |
| eyeShape | №0066 |
| eyeSize | №0066 (+ 1 других файлов) |
| eyeSpacing | №0066 (+ 1 других файлов) |
| eyeTilt | №0063 (+ 1 других файлов) |
| eyeWidth | №0063 (+ 1 других файлов) |
| f | №0061 (+ 2 других файлов) |
| faceColor | №0066 (+ 5 других файлов) |
| faceLength | №0063 (+ 1 других файлов) |
| faceShape | №0066 |
| faceTint | №0066 (+ 2 других файлов) |
| faceWidth | №0063 (+ 2 других файлов) |
| facileSuppression | №0779 |
| factionAgents | №0632 |
| factions | №0632 |
| fail | №0843 (+ 1 других файлов) |
| failChance | №0080 |
| failed | №0063 (+ 4 других файлов) |
| failedSave | №1198 |
| failNextRollDisadvantage | №0779 |
| failure | №0080 (+ 3 других файлов) |
| failures | №0655 (+ 14 других файлов) |
| fair | №0808 |
| fall | №0655 (+ 3 других файлов) |
| fallDamageReduction | №0779 |
| fallen | №0071 (+ 1 других файлов) |
| fallenAttack | №0641 |
| fallenPuppet | №0641 |
| fallingStrike | №0776 |
| familiar | №0657 (+ 2 других файлов) |
| familiarAttack | №0779 |
| familiarHpBonus | №0779 |
| familiarLink | №0813 |
| familiarSettlement | №0779 |
| familiarStealth | №0813 |
| families | №0628 (+ 24 других файлов) |
| family | №0059 (+ 3 других файлов) |
| familyByCreature | №1216 (+ 10 других файлов) |
| familyId | №0628 (+ 10 других файлов) |
| fancyFootwork | №0779 |
| fangSize | №0066 (+ 2 других файлов) |
| fastHands | №0648 |
| fastMovement | №0648 |
| fastTravel | №0779 |
| fat | №0063 (+ 1 других файлов) |
| fathomless | №0641 |
| fatigue | №0779 |
| favoredEnemy | №0648 |
| favoredServant | №0779 |
| fear | №0078 (+ 1 других файлов) |
| Fear | №0080 |
| fearApplied | №0779 |
| fearAura | №0776 |
| fearBomb | №0779 |
| fearImmune | №0818 |
| fearImmunity | №0776 |
| fearPulse | №0629 |
| fearSave | №0779 |
| fearSavePenalty | №0779 |
| fearSourceId | №0818 |
| fearTargets | №1205 |
| fearVisible | №0818 |
| feat | №0747 |
| featherTailSize | №0066 (+ 3 других файлов) |
| featherWingSize | №0066 (+ 3 других файлов) |
| feats | №0786 (+ 3 других файлов) |
| feature | №0624 (+ 1 других файлов) |
| FEATURE_DEFS | №0648 |
| featureAvailableForCurrentBuild | №0648 |
| featureId | №0811 |
| featureLevels | №0803 (+ 4 других файлов) |
| featureName | №0811 (+ 2 других файлов) |
| features | №0786 (+ 57 других файлов) |
| fecundAffliction | №0779 |
| feedOnCorpse | №0816 |
| feet | №0061 (+ 9 других файлов) |
| feint | №0779 |
| female | №0059 (+ 2 других файлов) |
| femaleStackTerms | №1357 |
| feralInstinct | №0648 |
| feralSenses | №0648 (+ 1 других файлов) |
| ferocious | №0686 |
| ferocity | №0656 (+ 3 других файлов) |
| ferocityMax | №0657 (+ 1 других файлов) |
| fetch | №1121 (+ 6 других файлов) |
| fey | №0628 (+ 11 других файлов) |
| fey_touched | №0782 |
| feyFiber | №0826 |
| feyPresence | №0648 (+ 1 других файлов) |
| fiber | №0667 (+ 1 других файлов) |
| field | №0061 (+ 1 других файлов) |
| fiend | №0628 (+ 12 других файлов) |
| fiendish | №0779 (+ 1 других файлов) |
| fiendishStance | №0779 |
| fight | №0818 |
| fightClubs | №0716 |
| fighterRemarkableAthlete | №0648 |
| fighting_initiate | №0782 |
| fightingSpirit | №0716 (+ 1 других файлов) |
| fightingStyle | №0641 (+ 4 других файлов) |
| fightingStyleChoice | №0779 |
| fightingStyles | №0688 (+ 1 других файлов) |
| file | №0868 (+ 1 других файлов) |
| filename | №0663 (+ 70 других файлов) |
| FileReader | №1259 |
| files | №0842 (+ 4 других файлов) |
| filter | №0832 (+ 3 других файлов) |
| filtered | №0847 |
| final | №0850 |
| finalMartyrdom | №0803 |
| finalStrikeExploit | №0779 |
| findRecipeForItem | №0664 |
| fine | №0664 (+ 3 других файлов) |
| finecarver | №0670 |
| fineFiberV49 | №0667 |
| fineLeatherV49 | №0667 |
| finesse | №0813 |
| finesseOrRanged | №1269 |
| finger | №0061 |
| finish | №0061 (+ 2 других файлов) |
| finishLastStand | №0818 |
| finite | №1325 (+ 3 других файлов) |
| finSize | №0066 (+ 2 других файлов) |
| firbolg | №0672 |
| fire | №0641 (+ 3 других файлов) |
| Fire | №0080 |
| fireAffinity | №0813 |
| fireClay | №0673 |
| fireDamage | №0779 (+ 1 других файлов) |
| fireEssence | №0667 (+ 1 других файлов) |
| fireResistance | №0813 |
| firmness | №1163 |
| first | №0827 |
| firstAid | №0779 |
| firstAttackAdvantage | №0779 (+ 1 других файлов) |
| firstHitByEachTargetRestoresMoxie | №0779 |
| firstMate | №0779 |
| fisher | №0801 (+ 1 других файлов) |
| fisticuffs | №0716 |
| fisticuffsDie | №0716 |
| fit | №0062 (+ 8 других файлов) |
| fitFrame | №0062 |
| fitProfile | №0066 |
| fixed | №0713 (+ 1 других файлов) |
| fixtureSha256 | №1162 |
| fizban | №0628 |
| flags | №0818 |
| flame | №0641 |
| flameBurst | №0779 |
| flameReroll12 | №0641 |
| flamesOfHope | №0779 |
| flare | №0062 |
| flashOfGenius | №0648 (+ 1 других файлов) |
| flashOfGeniusAvailable | №0655 |
| flat | №0061 |
| flawed | №0674 |
| flawlessAnalysis | №0829 |
| flax | №0673 |
| fletcher | №0670 (+ 2 других файлов) |
| fletchingStock | №0667 (+ 1 других файлов) |
| fletchingStockV49 | №0667 |
| floatObjectsLb | №0779 |
| floor | №0058 (+ 5 других файлов) |
| FLOOR | №0072 |
| floor_ceramic_tile_dark | №0072 |
| floor_ceramic_tile_light | №0072 |
| floor_checker_tile | №0072 |
| floor_cobblestone | №0072 |
| floor_earth | №0072 |
| floor_grass | №0072 |
| floor_hex_tile | №0072 |
| floor_marble_dark | №0072 |
| floor_marble_light | №0072 |
| floor_parquet_herringbone | №0072 |
| floor_rug_blue | №0072 |
| floor_rug_green | №0072 |
| floor_rug_red | №0072 |
| floor_stone_tile_dark | №0072 |
| floor_stone_tile_light | №0072 |
| floor_tatami | №0072 |
| floor_water | №0072 |
| floor_wood_dark | №0072 |
| floor_wood_light | №0072 |
| floors | №0071 (+ 1 других файлов) |
| flowers | №0825 |
| flurry | №0648 |
| fly | №0809 |
| flyFt | №0641 (+ 1 других файлов) |
| flyIfSelected | №0686 |
| flyingSpeed | №0813 |
| flySpeed | №0078 (+ 2 других файлов) |
| focus | №0641 (+ 10 других файлов) |
| focusDebuff | №0779 |
| focusDuration | №0829 |
| focusDurationRounds | №0779 |
| focusEndsOn | №0829 |
| focuses | №0648 |
| focusRangeFt | №0829 |
| foe | №1178 (+ 4 других файлов) |
| foeSlayer | №0648 |
| foeSlayerApplied | №1270 |
| foeSlayerMode | №1270 |
| folder | №1163 (+ 2 других файлов) |
| folders | №0624 (+ 1 других файлов) |
| fontOfLife | №0735 |
| fontOfMagic | №0648 |
| food | №0799 |
| foot | №0061 |
| footL | №0059 |
| footprintFeet | №0066 |
| footR | №0059 |
| foraging | №0670 |
| force | №0871 (+ 7 других файлов) |
| forceAttackRedirect | №0779 |
| forceCrit1 | №1196 |
| forceCritical | №0648 (+ 1 других файлов) |
| forced | №0655 (+ 2 других файлов) |
| forceDamage | №0686 (+ 1 других файлов) |
| forceDamageInside | №0779 |
| forcedAttack | №0850 |
| forcedD20 | №0850 |
| forcedDamage | №0850 |
| forcedDice | №0852 |
| forcedFailure | №0818 |
| forcedMeleeReaction | №0779 |
| forcedMoveFt | №0776 (+ 2 других файлов) |
| forcedMovementProtection | №0779 |
| forcedReactionAttack | №0779 |
| forcedSave | №0850 |
| forceOfNature | №0833 |
| forceSlot | №1207 |
| forceSurge | №0779 |
| forceTwenty | №0648 |
| forceUnarmed | №0779 |
| forearmL | №0059 |
| forearmR | №0059 |
| foresight | №0776 |
| forest | №0063 (+ 1 других файлов) |
| forge | №0063 |
| forger | №0670 (+ 1 других файлов) |
| forgery | №0672 |
| forgetAfterCast | №0779 |
| forgottenKnowledge | №0779 |
| forkedTongue | №0698 |
| form | №0061 (+ 3 других файлов) |
| formationRole | №0631 |
| formless | №0844 |
| formula | №0078 (+ 4 других файлов) |
| formulae | №0078 |
| formulas | №0078 (+ 4 других файлов) |
| fortified | №0871 |
| fortifyingDice | №0779 |
| fortunateCompany | №0779 |
| fortuneMode | №0818 |
| fortunePending | №0818 |
| fortuneRevealed | №0818 |
| fortuneTwist | №0779 |
| forward | №0066 |
| found | №0818 |
| fractureBurst | №0779 |
| frame | №0058 |
| free | №0779 (+ 4 других файлов) |
| freeAfflict | №0779 |
| freeAt17 | №0803 |
| freeAtLevel17 | №0779 |
| freeAtUnsealed | №0779 |
| freeCast | №0779 |
| freeDispelCaster | №0779 |
| freedomOfMovement | №0809 |
| freeExploits | №0779 |
| freeHandBonusAction | №0779 |
| freeHitDieChancePercent | №0779 |
| freeHoldTheLine | №0779 |
| freeInsightfulOrder | №0779 |
| freeLawShieldAndHalt | №0779 |
| freeMoveFt | №0779 |
| freePoints | №0714 |
| freePsi | №0779 |
| freePsiLost | №0779 |
| freePsiPerTurn | №0779 |
| freeSpell | №0813 |
| freeSpells | №0779 |
| freeTalent | №0779 |
| freeUse | №0779 |
| freeUses | №0844 |
| frenzy | №0648 |
| friend | №1183 (+ 3 других файлов) |
| frighten | №0813 |
| frightened | №0779 (+ 2 других файлов) |
| frightenedBy | №0818 |
| frightenedEffect | №0641 (+ 3 других файлов) |
| frightenedSaveDisadvantage | №0779 |
| frightenedUntilEndNextTurn | №0779 |
| from | №0632 (+ 25 других файлов) |
| fromFiendOrUndead | №0648 (+ 1 других файлов) |
| fromRound | №0818 |
| fromSpell | №0655 (+ 3 других файлов) |
| front | №0062 (+ 1 других файлов) |
| frontDigits | №0061 |
| FrontTexture | №1173 |
| frozen | №0641 |
| full_orc | №0672 |
| fullMaxNearestDistance | №1171 |
| fullMeanNearestDistance | №1171 |
| fullSpeedDragging | №0779 |
| fulminatingFatigue | №0779 |
| fumble | №0655 (+ 30 других файлов) |
| functionalStatus | №0802 |
| fur | №0061 |
| furAmount | №0059 (+ 3 других файлов) |
| furColor | №0066 (+ 1 других файлов) |
| furDensity | №0059 (+ 4 других файлов) |
| furH | №0061 |
| furLength | №0059 (+ 2 других файлов) |
| furParts | №0061 |
| furProfile | №0059 (+ 4 других файлов) |
| furRoots | №0061 |
| furShell | №0061 |
| furStrands | №0061 |
| furyOfForge | №0779 |
| fuseMinutes | №0078 |
| fuseRounds | №0078 (+ 1 других файлов) |
| g | №0868 |
| gainD4OnFailure | №0779 |
| gained | №0656 (+ 1 других файлов) |
| gainFerocity | №0656 (+ 1 других файлов) |
| gainRelaxationPerTurn | №0779 |
| gallantSpellcasting | №0779 |
| gameActors | №0641 |
| gameOfChance | №0779 |
| gameplay | №0848 (+ 2 других файлов) |
| gameplayEvents | №0862 (+ 1 других файлов) |
| gargantuan | №0816 (+ 1 других файлов) |
| gaseousBody | №0809 |
| gaseousReaction | №0809 |
| gateTowns | №0632 |
| gather | №0081 |
| gatherAction | №0081 |
| gathered | №0878 (+ 1 других файлов) |
| gatherIngredient | №0081 |
| gear | №0665 (+ 2 других файлов) |
| gelid | №0641 |
| Gelid | №0779 |
| gem | №0668 (+ 4 других файлов) |
| gemcutter | №0801 (+ 1 других файлов) |
| gems | №0670 |
| gender | №0060 (+ 18 других файлов) |
| genderMorphs | №0066 |
| general | №0801 (+ 1 других файлов) |
| generate | №0806 (+ 3 других файлов) |
| genie | №0641 |
| geometryBuilds | №0063 |
| geometryState | №0062 |
| geometryUploads | №0063 |
| get | №0658 (+ 5 других файлов) |
| getAC | №0839 |
| getAllBackgrounds | №1297 |
| getAllRaces | №1297 |
| getAttribute | №1242 |
| getAvailableRecipes | №0670 |
| getBiomassFromCorpse | №0839 |
| getBody | №0816 |
| getBodyState | №0066 |
| getCharismaModifier | №0801 |
| getClass | №0661 |
| getClassSummary | №0869 |
| getCreature | №0628 (+ 12 других файлов) |
| getCurrent | №0642 (+ 2 других файлов) |
| getCurse | №0077 |
| getDC | №0829 |
| getDevourDamage | №0839 |
| getDevourDC | №0839 |
| getDialect | №0828 |
| getDie | №0829 |
| getDiscipline | №0829 |
| getDominantAbilityNames | №0869 |
| getDurability | №0667 (+ 1 других файлов) |
| getElementById | №1117 (+ 37 других файлов) |
| getExhaustion | №0825 (+ 1 других файлов) |
| getFeature | №0661 |
| getInscribedRunes | №0828 |
| getItem | №1119 (+ 20 других файлов) |
| getItemQuality | №0667 |
| getLanguages | №0828 |
| getLarva | №0816 |
| getLibraryManifest | №0071 |
| getLockedRecipes | №0670 |
| getMap | №0070 |
| getMaxCharacteristics | №0869 |
| getMaxPreparedSpellsLimit | №0836 |
| getMetamorphoses | №0077 |
| getMorphWeights | №0066 |
| getMutationSlots | №0839 |
| getNativeStorageStats | №0842 |
| getObject | №0071 |
| getPath | №1153 (+ 1 других файлов) |
| getPeer | №1202 (+ 7 других файлов) |
| getPersuasionModifier | №0801 |
| getProfession | №0670 |
| getProfile | №0670 (+ 1 других файлов) |
| getPursuit | №0829 |
| getRace | №0066 |
| getReactions | №0829 |
| getRenderDescriptor | №0066 |
| getRunesKnown | №0828 |
| getRunicDC | №0828 |
| getSaveBonus | №0827 (+ 13 других файлов) |
| getSaveDC | №0077 |
| getSkillBonus | №0827 |
| getSource | №0798 |
| getSpecialization | №0670 |
| getSpellInfo | №0798 |
| getSpellsKnown | №0077 |
| getSpellSlots | №0077 |
| getState | №0063 (+ 1 других файлов) |
| getStats | №0827 |
| getSubclass | №0648 |
| getSummary | №0784 |
| getSymbiosisTier | №0816 |
| getToken | №0830 |
| getTrader | №0799 |
| getVersion | №1153 (+ 1 других файлов) |
| getView | №1259 |
| getZone | №0071 |
| ghost | №0063 |
| ghostChainSize | №0066 (+ 2 других файлов) |
| ghostOnKill | №0809 |
| ghostOpacity | №0066 (+ 2 других файлов) |
| ghostTerror | №0066 (+ 2 других файлов) |
| ghostWeapon | №0063 (+ 3 других файлов) |
| ghukliak | №0779 (+ 1 других файлов) |
| giant | №0631 |
| Gifted | №0795 |
| giftedStrategist | №0779 |
| GITHUB_REPOSITORY | №1116 |
| GITHUB_RUN_ID | №1116 |
| GITHUB_SERVER_URL | №1116 |
| gl | №0073 (+ 4 других файлов) |
| glancingBlow | №0779 |
| glareParalyzeOnFailBy5 | №0779 |
| glass | №0667 (+ 6 других файлов) |
| glassBatch | №0673 |
| glassblower | №0670 (+ 3 других файлов) |
| glasswork | №0668 (+ 2 других файлов) |
| glaze | №0672 (+ 1 других файлов) |
| glazedVessel | №0672 |
| glb | №1169 |
| glbBBox | №1166 (+ 1 других файлов) |
| glbTriangles | №1166 (+ 2 других файлов) |
| glbVertices | №1157 (+ 4 других файлов) |
| gliderMembraneSize | №0066 (+ 1 других файлов) |
| global | №1266 (+ 5 других файлов) |
| globalThis | №1280 (+ 4 других файлов) |
| gloves | №0062 |
| glow | №0066 |
| gltf | №0069 (+ 2 других файлов) |
| gnoll | №0774 |
| gnome_forest | №0672 |
| gnome_rock | №0672 |
| goblin | №0672 |
| goblinDiscourse | №0779 |
| goblinoid | №0774 |
| goblinStance | №0779 |
| gold | №0832 (+ 3 других файлов) |
| goldBillet | №0673 |
| goldenSlumbers | №0779 |
| goldPer10 | №0665 |
| goldReceived | №0818 |
| goldSpent | №0818 |
| good | №0664 (+ 1 других файлов) |
| goodPct | №1171 |
| gooSize | №0066 (+ 1 других файлов) |
| gp | №0790 (+ 10 других файлов) |
| graftAction | №1118 |
| graftName | №1118 |
| grafts | №0078 (+ 1 других файлов) |
| grain | №0672 (+ 1 других файлов) |
| GRAND_HEXES | №0779 |
| grandHex | №0776 (+ 1 других файлов) |
| grandRevolutionary | №0779 |
| grantActionNextStart | №0818 |
| grantAdvantage | №0779 |
| grantIngredient | №0081 |
| grantsAdvantage | №0827 |
| grantTemporaryHitPoints | №0655 |
| grantUndyingToAlly | №0779 |
| grapple | №0776 |
| grappleBonus | №0779 |
| grappleMastery | №0776 |
| grappleSizePlus | №0779 |
| grappleTarget | №0776 |
| gravity | №0818 |
| gravityResisted | №0818 |
| grayColor | №0066 (+ 1 других файлов) |
| grayPercent | №1137 (+ 1 других файлов) |
| great_weapon_master | №0782 |
| greaterDivineIntervention | №0648 |
| greatOldOne | №0641 |
| Green | №0776 (+ 1 других файлов) |
| greenwood | №0878 |
| greenwood_clearing | №0878 |
| greenwood_heart | №0878 |
| greenwood_stream | №0878 |
| grid | №0061 (+ 1 других файлов) |
| grimPsychometry | №0641 |
| grip | №0063 |
| ground | №0061 |
| group | №0061 |
| groupKey | №0874 (+ 3 других файлов) |
| groups | №0655 (+ 7 других файлов) |
| guaranteed | №0628 (+ 14 других файлов) |
| guardCraft | №0666 |
| guardDC | №0818 |
| Guardian | №0795 |
| guardianRangeFt | №0779 |
| guardians | №1228 |
| guardianTactic | №0779 |
| guardianTactics | №0735 |
| guardRepair | №0666 |
| guest | №0653 |
| guidedStrike | №0648 |
| guild | №0663 |
| gumArabic | №0673 |
| h | №0061 (+ 9 других файлов) |
| H | №0058 (+ 1 других файлов) |
| habitat | №0063 |
| habitats | №0628 (+ 13 других файлов) |
| hadMaterial | №0818 |
| hadozee | №1332 |
| haggle | №0801 |
| hair | №0059 (+ 15 других файлов) |
| hairColor | №0066 (+ 3 других файлов) |
| hairParts | №0059 |
| hairRibbonBudget | №0059 |
| half | №0066 (+ 1 других файлов) |
| half_up | №0061 (+ 1 других файлов) |
| halfCover | №0779 |
| halfCoverWhileGrappling | №0779 |
| halfDamageEffect | №0655 (+ 4 других файлов) |
| halfOnSave | №0779 (+ 2 других файлов) |
| halfProficiencySkills | №0779 |
| halfSpeed | №0779 |
| Hallucination | №0080 |
| halt | №0779 |
| haltRestrains | №0779 |
| halveDamage | №0779 |
| halveNecroticReaction | №0641 |
| hand | №0061 (+ 1 других файлов) |
| handL | №0059 |
| handlebar | №0066 |
| handled | №0068 |
| handOfDread | №0716 |
| handoffNeedsSignaling | №0810 |
| handoffPending | №0810 |
| handR | №0059 |
| hands | №0061 (+ 9 других файлов) |
| hardenedSoul | №0641 |
| hardwood | №0667 (+ 4 других файлов) |
| harmonic | №0828 |
| harmonicAttunement | №0779 |
| harvest | №0628 (+ 19 других файлов) |
| harvestMaterial | №1228 |
| has | №0782 |
| has_joints_and_weights | №1160 |
| has_morph_targets | №1160 |
| hasAsi | №0700 (+ 2 других файлов) |
| hasCharacter | №0865 |
| hasDamage | №0811 (+ 1 других файлов) |
| hasInventoryEffects | №0818 |
| hasPreparation | №0836 |
| hasProfession | №0081 |
| haste | №0078 |
| hasToolProficiency | №0808 |
| hatOfDisguise | №0779 |
| have | №0664 (+ 3 других файлов) |
| haveGold | №0665 |
| haveMaterials | №0665 |
| haymaker | №0716 (+ 1 других файлов) |
| head | №0059 (+ 12 других файлов) |
| HEAD_AXES | №0066 |
| HEAD_FORMS | №0066 |
| HEAD_STYLES | №0066 |
| headAccessories | №0061 |
| headAccessory | №0058 (+ 2 других файлов) |
| headBuilds | №0063 |
| headDefaults | №0066 |
| headers | №0653 (+ 1 других файлов) |
| headFrame | №0061 |
| headless | №1311 (+ 37 других файлов) |
| heal | №0641 (+ 4 других файлов) |
| healAfterNecrotic | №0809 |
| healAfterRest | №0809 |
| healAmount | №1118 |
| healBatch | №0655 |
| healBody | №0869 |
| healCompanion | №0686 |
| healed | №0784 (+ 2 других файлов) |
| healHalfMaxHp | №0779 |
| healHitDie | №0776 |
| healHP | №0779 |
| healing | №0078 (+ 6 других файлов) |
| healingAllowed | №0869 |
| healingAmount | №0818 |
| healingBlocked | №0784 |
| healingBonus | №0779 (+ 1 других файлов) |
| healingBoost | №0813 |
| healingCount | №0818 |
| healingGrantsACBonus | №0779 |
| healingPotion | №0813 |
| healingPotionOnLongRest | №0813 |
| healingSpell | №0818 (+ 2 других файлов) |
| healingSpellsCannotHealSelf | №0809 |
| healMod | №0641 |
| healModifier | №0776 |
| healOnCharnelKill | №0809 |
| healOnKill | №0641 |
| healOrDamage | №0813 |
| healPer5Charnel | №0809 |
| healPool | №0779 |
| healRoll | №1118 |
| healSelf | №0779 |
| healShell | №0784 |
| healthCheck | №0853 |
| healWithHitDice | №0779 |
| heart | №0063 (+ 1 других файлов) |
| hearth | №0067 |
| heartPhylactery | №0779 |
| heavyArmor | №0779 |
| heelstomper | №0779 |
| height | №0063 (+ 50 других файлов) |
| heightened | №0648 |
| heightenedSenses | №0641 |
| hellhound | №0686 |
| hellspeaker | №0779 |
| hellspeakerHoneySweetBlades | №0779 |
| hellspeakerTurncoat | №0779 |
| hemMod | №0641 |
| hemocraftAbilities | №0688 |
| hemocraftDie | №0688 |
| hemocraftRerollOncePerTurn | №0641 |
| Hemorrhage | №0080 |
| hemp | №0673 |
| herb | №0668 (+ 2 других файлов) |
| herbalism | №0672 (+ 1 других файлов) |
| herbalist | №0670 (+ 4 других файлов) |
| herbs | №0825 (+ 1 других файлов) |
| herculean | №0716 (+ 1 других файлов) |
| hero | №1177 |
| heroicCharge | №0779 |
| heroicFocus | №0779 |
| heroicFortitude | №0779 |
| heroicOrderExploit | №0779 |
| heroicRush | №0776 |
| hex | №0868 (+ 2 других файлов) |
| hexArmor | №0779 |
| hexAura | №0779 |
| hexblade | №0641 |
| HEXES | №0779 |
| hexesAtWill | №0776 |
| hexmaster | №0779 |
| hexPhalanx | №0779 |
| hexPlate | №0779 |
| hexSaveDisadvantage | №0779 |
| hexShield | №0779 |
| hi | №0061 |
| hidden | №1346 |
| hide | №0667 (+ 1 других файлов) |
| hideBonusAction | №0779 |
| hideInDimDark | №0779 |
| hideInPlainSight | №0648 |
| Hideous | №0779 |
| high | №0059 (+ 1 других файлов) |
| high_ponytail | №0061 (+ 1 других файлов) |
| highAuthority | №0779 |
| highest | №1163 |
| highestId | №0818 |
| highGround | №0818 |
| highJumpBonusFt | №0779 |
| highlands | №0799 (+ 1 других файлов) |
| highlands_mine | №0878 |
| highlands_quarry | №0878 |
| highlands_ridge | №0878 |
| highlightColor | №0066 (+ 2 других файлов) |
| highlightPercent | №1137 (+ 2 других файлов) |
| hills | №0063 |
| hips | №0063 (+ 5 других файлов) |
| history | №0080 (+ 8 других файлов) |
| historyAdvantage | №0779 |
| historyAdvantageOnSinisterObjectOrPlace | №0641 |
| hit | №0655 (+ 9 других файлов) |
| hitCount | №0655 (+ 3 других файлов) |
| hitDice | №0624 (+ 2 других файлов) |
| hitDiceMax | №1198 |
| hitDiceRemaining | №0078 (+ 2 других файлов) |
| hitDiceRestored | №0803 |
| hitDiceSpent | №0078 (+ 4 других файлов) |
| hitDiceUsed | №0786 (+ 1 других файлов) |
| hitDie | №0624 (+ 53 других файлов) |
| hitInfo | №0073 |
| hitPoints | №0779 (+ 2 других файлов) |
| hitPointsAfter | №0803 (+ 1 других файлов) |
| hits | №0779 |
| hitTest | №0072 (+ 1 других файлов) |
| hitTokenId | №0820 |
| hitZone | №0072 |
| hive | №0063 |
| hm08BBox | №1166 (+ 1 других файлов) |
| hm08Triangles | №1166 (+ 1 других файлов) |
| hm08Vertices | №1166 (+ 3 других файлов) |
| hoard | №0806 |
| hobgoblin | №0672 |
| holdBreathIndefinite | №0779 |
| holdTheLine | №0779 |
| Hollow | №0779 |
| holy | №0078 |
| holyBomb | №0779 |
| holyMagic | №0776 |
| holyNexus | №0648 |
| homebrew | №0660 (+ 1 других файлов) |
| honey | №0673 |
| honorDuel | №0779 |
| hoofColor | №0066 (+ 1 других файлов) |
| hoofSize | №0063 (+ 3 других файлов) |
| hooks | №0077 (+ 19 других файлов) |
| hope | №0776 |
| horde | №0063 (+ 5 других файлов) |
| hordeCount | №0066 |
| horn | №0826 |
| HORN_STYLES | №0066 |
| hornColor | №0066 (+ 1 других файлов) |
| hornRidges | №1146 (+ 1 других файлов) |
| hornSize | №0066 (+ 3 других файлов) |
| hornStyle | №0063 (+ 5 других файлов) |
| hornThickness | №1146 (+ 1 других файлов) |
| horror | №0629 |
| horrorEligible | №0629 |
| horseColor | №0066 (+ 1 других файлов) |
| hosiery | №0062 |
| hosieryDen | №1130 |
| host | №0643 (+ 1 других файлов) |
| hostDestroyed | №0816 |
| hostileAction | №0818 |
| hostileBane | №0779 |
| hostilesWithin5 | №1206 |
| hostIsSeparateStatBlock | №0816 |
| hostSurvived | №0816 |
| houndReactionAttack | №0779 |
| howl | №0641 (+ 1 других файлов) |
| hp | №0786 (+ 77 других файлов) |
| hpBonus | №0779 |
| hpBonusPerLevel | №0824 |
| hpCost | №0803 (+ 1 других файлов) |
| hpCostBySlot | №0803 |
| hpCurrent | №0624 (+ 19 других файлов) |
| hpDamage | №0655 (+ 6 других файлов) |
| hpDamageBySlot | №0803 |
| hpFraction | №0776 |
| hpMax | №0624 (+ 13 других файлов) |
| hpMaxBonus | №0686 |
| hpPer100gp | №0779 |
| hpPercent | №1228 |
| hpTemp | №0624 (+ 6 других файлов) |
| href | №1242 |
| huge | №0816 (+ 1 других файлов) |
| humanoid | №0628 (+ 13 других файлов) |
| humanoidTorch | №0779 |
| hunter | №0686 (+ 2 других файлов) |
| hunterCompanion | №0776 |
| huntersBane | №0641 |
| huntersMark | №0648 (+ 1 других файлов) |
| huntersPrey | №0648 (+ 1 других файлов) |
| hurlThroughHell | №0811 |
| hybrid | №0779 |
| hybridAttackAdvantageVsBranded | №0779 |
| hybridRegeneration | №0779 |
| hybridTransformation | №0641 |
| hybridTransformationMastery | №0641 |
| hyena | №0774 |
| i | №0811 |
| ibex | №0066 |
| icon | №0671 (+ 3 других файлов) |
| iconId | №0788 (+ 1 других файлов) |
| id | №0061 (+ 200 других файлов) |
| idempotent | №0865 |
| identifyEffect | №0779 |
| identity | №1844 |
| identityDistortion | №0629 |
| ids | №0058 (+ 2 других файлов) |
| idx | №0073 |
| ifReducedToZero | №0779 |
| ifStolenSpark | №0779 |
| ignitingTouch | №0779 |
| ignoreCover | №0078 (+ 1 других файлов) |
| ignored | №0648 |
| ignoreExtremeTemperature | №0779 |
| ignoreHalfCover | №0779 |
| ignoreHalfDamageOnSave | №0779 |
| ignoreImmunity | №0641 (+ 2 других файлов) |
| ignoreInvisibility | №0818 |
| ignoreOneMutagenSideEffect | №0779 |
| ignoreOpportunityAttacksWhileFlying | №0809 |
| ignorePhysicalResistance | №0818 |
| ignoreRequirements | №1211 |
| ignoreResistance | №0078 (+ 6 других файлов) |
| ignoresImmunity | №0803 |
| ignoreSomaticInDimDark | №0779 |
| ignoresResistance | №0803 (+ 1 других файлов) |
| ignoreVerbalInDimDark | №0779 |
| illuminationAt | №0071 |
| illusion | №0818 (+ 1 других файлов) |
| illusoryDuplicate | №0779 |
| illustriousAdmiral | №0779 |
| imitation | №0078 (+ 1 других файлов) |
| immortality | №0779 |
| immortalityAnchor | №0809 |
| immune | №0641 (+ 5 других файлов) |
| immuneAging | №0779 |
| immuneAll | №0818 |
| immuneCondition | №0818 |
| immuneConditions | №0818 (+ 1 других файлов) |
| immuneFrightened | №0648 (+ 1 других файлов) |
| immuneIfBlindedImmune | №0641 |
| immuneNaturalDeath | №0813 |
| immuneSuppression | №0779 |
| immuneSurprise | №0779 |
| immuneToOwnerBombs | №0078 |
| immuneWhenRampageAtLeast | №0779 |
| immunities | №0655 (+ 13 других файлов) |
| immunity | №0641 (+ 3 других файлов) |
| immunity24hOnSave | №0779 |
| immunityBecomesResistance | №0078 (+ 3 других файлов) |
| immunityChosen | №0779 |
| impact | №0078 |
| impactBomb | №0779 |
| impermeable | №0641 |
| Impermeable | №0779 |
| implemented | №0779 |
| importJSON | №0856 |
| importLocal | №0653 |
| importText | №0860 (+ 1 других файлов) |
| imposeDisadvantage | №0779 |
| imposingPresence | №0779 |
| improvedAt11 | №0803 |
| improvedBombs | №0677 |
| improvedDivineSmite | №0648 |
| improvedFamiliar | №0779 |
| improvedResolve | №0735 |
| improvedThralls | №0809 |
| inactiveAfterInvoke | №0828 |
| inAttackAction | №1209 |
| incendiary | №0078 |
| incendiaryBomb | №0779 |
| inciteViolence | №0779 |
| incoming | №0818 |
| incomingAC | №0641 (+ 1 других файлов) |
| incomingAttackModifiers | №0871 |
| incomingDamage | №1198 |
| incomingDisadvantage | №0818 |
| incomparableIntellect | №0829 |
| index | №0793 (+ 8 других файлов) |
| indexType | №0073 |
| indices | №0058 (+ 8 других файлов) |
| individualCount | №0066 |
| individuals | №0061 |
| indomitable | №0648 (+ 1 других файлов) |
| indomitableMight | №0648 |
| infernal | №0686 |
| infernalConduit | №0698 |
| infernalConduitDice | №0698 |
| infernalMajesty | №0698 |
| inferno | №0063 |
| influenceSlots | №0632 |
| informant | №0779 |
| infuseItem | №0648 |
| ingredient | №0080 (+ 1 других файлов) |
| INGREDIENT_SOURCES | №0081 |
| ingredientCategory | №0081 |
| ingredientId | №0081 |
| ingredientName | №0081 |
| ingredients | №0079 (+ 3 других файлов) |
| inheritsOrigin | №0066 |
| init | №0660 |
| initCreatedCharacter | №0670 |
| initialize | №0821 |
| initiative | №0628 (+ 23 других файлов) |
| initiativeBonus | №0776 (+ 2 других файлов) |
| initiativeDash | №0779 |
| initiativeDisadvantage | №0641 (+ 1 других файлов) |
| initiativeExploit | №0779 |
| initiativeFerocity | №0686 |
| initiativeOrPerception | №0779 |
| initiativeReagentsTo | №0779 |
| initiativeRoll | №1209 |
| initiativeSave | №0779 |
| initiativeTempHp | №0779 |
| initiativeTracker | №0860 (+ 21 других файлов) |
| ink | №0668 (+ 2 других файлов) |
| innatePsionics | №0714 |
| inner | №0058 |
| innerHeight | №1242 |
| innerHTML | №1144 (+ 2 других файлов) |
| innerWidth | №1242 |
| inscribe | №0779 |
| inscribedCount | №0779 |
| inscribedGearProficiency | №0779 |
| inscribedRunes | №0828 |
| inscription | №0828 |
| inscrutableMind | №0779 |
| insectoid | №0774 |
| insidiousImprecation | №0779 |
| insidiousSpell | №0779 |
| insight | №0772 (+ 1 других файлов) |
| insightAbility | №0779 |
| insightBonus | №0779 |
| insightfulOrder | №0779 |
| insightTotal | №0078 (+ 1 других файлов) |
| inspect | №0821 (+ 1 других файлов) |
| inspector | №0070 |
| inspectSource | №0853 |
| inspirationalSpeech | №0779 |
| inspirationOnKill | №0818 |
| inspiring_leader | №0782 |
| inspiringShout | №0779 |
| inspiringWord | №0739 |
| inspiringWordMaxHeal | №0776 (+ 1 других файлов) |
| inspiringWordUses | №0739 |
| install | №0068 |
| installed | №0078 (+ 1 других файлов) |
| installedAtLevel | №0078 |
| instant | №0078 |
| instantDeath | №0655 (+ 1 других файлов) |
| instinctualSuppression | №0779 |
| instruments | №0779 |
| int | №0624 (+ 52 других файлов) |
| intBonus | №0641 |
| intChecksAdvantage | №0641 (+ 1 других файлов) |
| intChecksDisadvantage | №0641 (+ 1 других файлов) |
| intellectDie | №0829 |
| intelligence | №0786 (+ 12 других файлов) |
| intelligenceOrWisdomOrCharisma | №0077 (+ 1 других файлов) |
| intelligentExplosion | №0078 |
| intelligentExplosions | №0677 |
| intensity | №0070 (+ 2 других файлов) |
| inter | №0832 |
| interceptAttack | №0818 |
| interceptHealing | №0818 |
| interceptInitiative | №0818 |
| interceptSave | №0818 |
| interdict | №0871 |
| interdictBoons | №0698 |
| interdiction | №0698 |
| interpolation | №0068 |
| interrupt | №0735 |
| interrupted | №0655 (+ 1 других файлов) |
| interruptedId | №0818 |
| interruptOneAttackOrAbility | №0779 |
| interruptUses | №0735 |
| intimidatingCommand | №0779 |
| intimidation | №0772 (+ 1 других файлов) |
| intimidationAdvantage | №0779 |
| intimidationPersuasionBonus | №0779 |
| intIncrease | №0779 |
| intMaxBonus | №0641 |
| intMaxIncrease | №0779 |
| intToAC | №0809 |
| intuition | №0828 |
| intWisChaSavesDisadvantage | №0641 |
| invadeHost | №0816 |
| inventory | №0786 (+ 20 других файлов) |
| inventoryEntries | №0818 |
| inventoryRef | №0793 (+ 4 других файлов) |
| inverseBindMatrices | №0068 (+ 1 других файлов) |
| investigation | №0772 (+ 1 других файлов) |
| investigationExpertise | №0776 |
| investigator | №0829 |
| invHeaderAC | №1186 |
| invigoratingOrders | №0779 |
| Invisibility | №0080 |
| invisibilityAfterCharnel | №0809 |
| invisible | №0686 (+ 2 других файлов) |
| invocation | №0828 |
| invocationSlots | №0779 |
| invoke | №0661 (+ 1 других файлов) |
| invokeCount | №0779 |
| invokeDebuff | №0779 |
| invokeHell | №0698 |
| invoking | №0828 |
| iokharic | №0779 (+ 1 других файлов) |
| iridescentStrike | №0844 |
| iron | №0668 (+ 2 других файлов) |
| Ironbound | №0795 |
| ironChin | №0716 |
| ironCommand | №0779 |
| ironIngot | №0673 |
| isActive | №0782 |
| isAlly | №1118 |
| isAssassin | №0648 |
| isBomb | №0078 (+ 3 других файлов) |
| isDead | №0646 |
| isEnabled | №0661 (+ 1 других файлов) |
| isExtra | №0646 (+ 9 других файлов) |
| isExtraClass | №0646 |
| isIndependentCreature | №0839 |
| isLarval | №0061 |
| isMagical | №1197 |
| isObject | №1117 |
| isRaceClassHybrid | №0649 (+ 6 других файлов) |
| isShirt | №0062 |
| isSkirtDress | №0062 |
| isSolid | №0071 |
| issues | №0672 |
| isSwarm | №0061 |
| item | №0062 (+ 18 других файлов) |
| itemId | №0813 |
| items | №0062 (+ 7 других файлов) |
| itemValue | №0667 (+ 1 других файлов) |
| itsAlive | №0779 |
| ix | №0061 |
| j | №0058 |
| jacket | №0062 |
| jackOfAllTrades | №0648 |
| jade | №0832 |
| jar | №0067 |
| jaw | №0061 |
| jawProjection | №0066 |
| jawWidth | №0063 (+ 2 других файлов) |
| jealousy | №0077 |
| jeweler | №0668 (+ 5 других файлов) |
| jinx | №1208 |
| jinxBonusAction | №0779 |
| jinxExtraDamage | №0779 |
| jinxOptions | №0779 |
| joinRoom | №1256 |
| joints | №0058 (+ 4 других файлов) |
| jotun | №0779 (+ 1 других файлов) |
| jotunbrudJuggernaut | №0779 |
| jotunStance | №0779 |
| journal | №0852 |
| json | №0653 (+ 5 других файлов) |
| jumpDistanceMultiplier | №0776 |
| jumpFt | №0779 |
| jumpMultiplier | №0779 |
| jungle | №0063 |
| junk | №0793 (+ 38 других файлов) |
| justDroppedToZero | №1203 |
| K | №1165 |
| keenAwareness | №0829 |
| keeperOfOrder | №0779 |
| key | №0071 (+ 13 других файлов) |
| KEY | №0071 |
| ki | №1195 (+ 2 других файлов) |
| killInspiration | №0818 |
| kiln | №0670 |
| kind | №0061 (+ 36 других файлов) |
| Kind | №1173 |
| kingdom | №0063 |
| kiPoints | №0703 |
| kitchen | №0067 |
| knighthood | №0779 |
| knockdown | №0776 |
| knockout | №0776 |
| knockoutIfSelfDamageReachesZero | №0779 |
| knockoutRoll | №0779 |
| knockProne | №0779 |
| knockProneSmaller | №0779 |
| knot | №0062 (+ 3 других файлов) |
| known | №0786 (+ 3 других файлов) |
| knownAt | №0698 |
| knownAtLevel | №0077 |
| knownCantrips | №0078 |
| knownClasses | №0836 |
| knownCount | №0779 |
| knownMetamorphoses | №0779 |
| knownReactions | №0080 |
| knowYourEnemy | №0779 |
| kobold | №0061 (+ 1 других файлов) |
| krd | №0795 |
| krynn | №0631 |
| label | №0832 (+ 22 других файлов) |
| laboratory | №0063 |
| labyrinth | №0063 |
| lace | №0062 |
| lairActions | №1291 |
| lairActionState | №0811 |
| lamp | №0067 |
| lampblack | №0673 |
| landscape | №0887 |
| landsStrideRanger | №0648 |
| language | №0779 (+ 1 других файлов) |
| languageChoice | №0779 |
| languages | №0624 (+ 4 других файлов) |
| lantern | №0067 |
| large | №0067 (+ 2 других файлов) |
| larva | №0816 |
| larvaGirth | №0066 (+ 2 других файлов) |
| larvaIsSeparateStatBlock | №0816 |
| larval | №0061 |
| larvaLength | №0066 (+ 2 других файлов) |
| larvalParts | №0061 |
| larvaTendrilSize | №0066 (+ 2 других файлов) |
| larvaToothSize | №0066 (+ 2 других файлов) |
| last | №0061 (+ 1 других файлов) |
| lastAttemptRound | №0805 |
| lastGatheredAt | №0878 |
| lastLifesMemories | №0779 |
| lastRest | №1278 |
| lastRestId | №0821 |
| lastRestock | №0799 (+ 1 других файлов) |
| lastRestoredKey | №0865 |
| lastRoll | №0805 |
| lastRound | №0805 |
| lastRun | №0854 |
| lastStandActive | №0818 |
| lastStandFinished | №0818 |
| lastStandReady | №0818 |
| lastTrump | №0821 |
| lastTrumpAvailable | №0821 |
| lastTrumpUsed | №0821 (+ 1 других файлов) |
| lastX | №0626 (+ 1 других файлов) |
| lastY | №0626 (+ 1 других файлов) |
| latency | №0852 |
| latitude | №0061 |
| laughingGas | №0078 |
| laughingGasBomb | №0779 |
| launch | №0861 |
| lawShield | №0776 |
| lawsShield | №0779 |
| layer | №0062 |
| layered | №0061 (+ 1 других файлов) |
| layers | №0061 |
| layOnHands | №0648 (+ 1 других файлов) |
| leadershipAbility | №0739 (+ 1 других файлов) |
| leadershipBased | №0779 |
| leadershipChoices | №0739 |
| leadershipForCheck | №0779 |
| leadershipForChecks | №0779 |
| leadershipForDeception | №0779 |
| leadershipForHistoryInvestigation | №0779 |
| leadershipForIntimidation | №0779 |
| leadershipForReligion | №0779 |
| leadershipModifier | №0739 |
| leadershipStyles | №0739 |
| leadTheCharge | №0779 |
| leaks | №1326 (+ 2 других файлов) |
| learnAnyCastableSpell | №0779 |
| learnBeastShape | №0779 |
| learnCantrip | №0779 |
| learned | №0878 |
| learnedAt | №0670 |
| learnFromUI | №0670 |
| learning | №0833 |
| learnLanguage | №0779 |
| learnMartialWeapon | №0779 |
| learnProfession | №0670 |
| learnSkill | №0779 |
| learnSpell | №0779 |
| learnTargetStatistic | №0779 |
| learnTool | №0779 |
| leather | №0062 (+ 7 других файлов) |
| leatherSole | №0672 |
| leatherStrapV49 | №0667 |
| leatherwork | №0668 (+ 1 других файлов) |
| leatherworker | №0669 (+ 4 других файлов) |
| leavingReach | №0819 (+ 2 других файлов) |
| lectern | №0067 |
| left | №0063 (+ 2 других файлов) |
| leg | №0061 |
| legacy_expansions | №0628 |
| legendary | №0793 (+ 6 других файлов) |
| legendaryActionCurrent | №0811 |
| legendaryActions | №0805 (+ 1 других файлов) |
| legendaryResistance | №0735 |
| legendaryResistanceCurrent | №0811 |
| legendaryResistances | №0805 (+ 1 других файлов) |
| legendaryTandem | №0779 |
| legLength | №0063 (+ 1 других файлов) |
| legs | №0063 (+ 2 других файлов) |
| length | №0059 (+ 19 других файлов) |
| level | №0780 (+ 82 других файлов) |
| level10 | №0077 |
| level18 | №0077 |
| level2 | №0077 |
| level20 | №0828 |
| level6 | №0077 |
| level9 | №0828 |
| levelData | №0700 |
| leveledUp | №0670 |
| levelName | №0670 |
| levels | №0077 (+ 46 других файлов) |
| LEVELS | №0670 |
| levelsRestored | №0648 |
| library | №0071 (+ 2 других файлов) |
| license | №0071 (+ 11 других файлов) |
| lichdom | №0809 |
| lieDetectionAutoFail | №0779 |
| lighting | №0071 |
| lightIntensity | №1173 |
| lightning | №0078 (+ 3 других файлов) |
| lightningArc | №0809 |
| lightningBomb | №0779 |
| lightRadius | №1173 |
| limb | №0061 |
| limbH | №0061 |
| limbIndices | №0061 |
| limbParts | №0061 |
| limbProfile | №0061 (+ 4 других файлов) |
| limbRecords | №0061 |
| limbState | №0061 |
| limestone | №0673 |
| limit | №0836 |
| limitations | №1306 (+ 1 других файлов) |
| line | №0851 |
| linen | №0062 |
| lineOfSight | №1265 (+ 2 других файлов) |
| lingerie | №0062 |
| link | №0776 |
| linked | №0776 |
| linkedClass | №0658 (+ 1 других файлов) |
| linkedHowl | №0641 |
| lipColor | №0066 (+ 1 других файлов) |
| lipOpacity | №1320 |
| lipVolume | №0066 |
| list | №0060 (+ 7 других файлов) |
| listAllClasses | №0661 |
| listByFamily | №0628 (+ 12 других файлов) |
| listBySource | №0628 (+ 12 других файлов) |
| listClasses | №0661 |
| listEquipment | №0066 |
| listPresets | №0066 |
| listRaces | №0066 |
| listSkins | №0066 |
| listSources | №0081 |
| listSubclasses | №0661 |
| liveBodyAfterReanimation | №0869 |
| liveEpoch | №0865 |
| liveRevision | №0865 |
| living | №0783 |
| livingStatue | №0779 |
| lizard | №0061 |
| lizardfolk | №0672 |
| lo | №0061 |
| load | №0069 (+ 4 других файлов) |
| loaded | №0073 |
| loadFailed | №1323 |
| loading | №0073 (+ 1 других файлов) |
| loadSkin | №0068 |
| local | №0058 (+ 1 других файлов) |
| localBackups | №0653 |
| localId | №0653 |
| localStorage | №1119 (+ 33 других файлов) |
| location | №1159 (+ 3 других файлов) |
| locked | №0074 |
| lockedAt1 | №0669 |
| locks | №0670 |
| log | №0848 |
| login | №0653 |
| logout | №0653 |
| long | №0061 (+ 1 других файлов) |
| longevity | №0078 (+ 1 других файлов) |
| longJumpBonusFt | №0779 |
| longRest | №0078 (+ 1 других файлов) |
| longRestAllHitDice | №0779 |
| longRestClears | №0078 |
| longRestEffects | №0818 |
| longRestExhaustionRecovery | №0779 |
| longRestHealingAllowed | №0869 |
| longRestLimit | №0641 |
| longRestOnRevive | №0779 |
| longRestRedistribute | №0779 |
| longRestTempHp | №0779 |
| longRestUses | №0078 |
| loom | №0067 |
| loot | №0070 (+ 19 других файлов) |
| lootId | №0074 |
| lootModel | №0806 |
| lootModels | №0806 |
| loreRecall | №0779 |
| los | №0656 (+ 1 других файлов) |
| loss | №0852 |
| lossHp | №0641 |
| lost | №0666 |
| Loveless | №0779 |
| low | №0059 |
| lowBlow | №0779 |
| lowest | №0058 (+ 1 других файлов) |
| lowestId | №0818 |
| loxodon | №1340 |
| lucidDreaming | №0779 |
| lucidWaking | №0779 |
| lucky | №0782 |
| lunge | №0779 |
| luxury | №0801 (+ 1 других файлов) |
| lycanthropy | №0077 |
| lyre | №0066 |
| M | №0818 |
| macroConfigSha256 | №1357 |
| macrotargets | №1163 |
| mage_slayer | №0782 |
| mageArmor | №0813 |
| mageArmorAC | №0818 |
| mageBerryCount | №0819 (+ 2 других файлов) |
| mageD20Bonus | №0818 |
| mageDamageType | №0819 (+ 1 других файлов) |
| mageEquipmentChanged | №0818 |
| mageGround | №0819 (+ 1 других файлов) |
| mageInfo | №0818 |
| mageOptions | №0818 |
| mageProgress | №0818 |
| mageSpellId | №0819 (+ 2 других файлов) |
| mageStat | №0819 (+ 1 других файлов) |
| mageTargetIds | №0819 (+ 2 других файлов) |
| mageWilling | №0819 (+ 2 других файлов) |
| magFilter | №0063 (+ 1 других файлов) |
| magic | №0844 (+ 2 других файлов) |
| Magic | №0080 |
| magic_initiate | №0782 |
| magicAdvantage | №0809 |
| magical | №0779 (+ 1 других файлов) |
| magical_beast | №0628 (+ 10 других файлов) |
| magicalAttack | №0641 (+ 4 других файлов) |
| magicalDarkness | №0779 |
| magicalFamiliarAttacks | №0779 |
| magicalSecrets | №0648 |
| magicalTinkering | №0648 |
| magicByAffinity | №0844 |
| magicInteractionSafe | №0779 |
| magicItemAdept | №0648 |
| magicShared | №0844 |
| maintainable | №0779 |
| maintainAction | №0779 |
| majestySplash | №0779 |
| major | №0821 |
| major_00 | №0821 |
| major_01 | №0821 |
| major_02 | №0821 |
| major_03 | №0821 |
| major_04 | №0821 |
| major_05 | №0821 |
| major_06 | №0821 |
| major_07 | №0821 |
| major_08 | №0821 |
| major_09 | №0821 |
| major_10 | №0821 |
| major_11 | №0821 |
| major_12 | №0821 |
| major_13 | №0821 |
| major_14 | №0821 |
| major_15 | №0821 |
| major_16 | №0821 |
| major_17 | №0821 |
| major_18 | №0821 |
| major_19 | №0821 |
| major_20 | №0821 |
| major_21 | №0821 |
| majorCost | №0821 |
| majorCurrent | №0821 |
| majorMax | №0821 |
| majorSpent | №0821 |
| makeWeaponAttack | №0779 |
| male | №0059 (+ 1 других файлов) |
| maleProfile | №0058 |
| malformed | №1169 |
| malformedTargetLines | №1167 (+ 1 других файлов) |
| manifest | №0842 |
| manifestations | №0795 |
| manifested | №0813 |
| manifestUrl | №0842 (+ 2 других файлов) |
| map | №0861 |
| mapId | №0071 |
| mappedDisplacementMax | №1168 |
| mappedDisplacementMean | №1168 |
| mappedDisplacementMedian | №1168 |
| mappedDisplacementP95 | №1168 |
| mappedMaxDisplacement | №1167 |
| mappedMeanDisplacement | №1167 |
| mappedMedianDisplacement | №1167 |
| mappedP95Displacement | №1167 |
| mappedRmsDisplacement | №1167 |
| mappedTargetEntries | №1168 |
| mappedVertices | №1157 |
| mapping | №1308 |
| maps | №0670 (+ 1 других файлов) |
| marble | №0672 |
| marchUntoDestiny | №0803 |
| margin | №1091 |
| mariner | №0779 |
| mark | №0779 |
| marked | №0641 (+ 2 других файлов) |
| markedForDeath | №0779 |
| marketPriceGp | №0799 (+ 1 других файлов) |
| marketReport | №0799 |
| marketSource | №0799 (+ 1 других файлов) |
| marketValue | №0664 (+ 1 других файлов) |
| markPrey | №0779 |
| maroon | №0868 |
| marsh_moss | №0878 |
| marsh_pool | №0878 |
| marsh_reeds | №0878 |
| marshes | №0878 |
| martial_adept | №0782 |
| martialBane | №0779 |
| martialFocus | №0779 |
| masks | №0061 |
| mason | №0670 (+ 3 других файлов) |
| master | №0670 |
| masterOfHell | №0698 |
| masterSpecialization | №0670 |
| masterTactician | №0779 |
| masterwork | №0665 (+ 1 других файлов) |
| masterworkBonus | №0669 |
| mastery | №0080 (+ 2 других файлов) |
| masteryExpiry | №0779 |
| masterySpent | №0779 |
| MAT2 | №0068 (+ 2 других файлов) |
| MAT3 | №0068 (+ 2 других файлов) |
| MAT4 | №0068 (+ 4 других файлов) |
| matched | №0802 |
| material | №0058 (+ 23 других файлов) |
| materialBridge | №0806 |
| materialCost | №0078 |
| materialCostGP | №0813 |
| materialCostPerLevelGP | №0813 |
| materialCount | №0665 |
| materialId | №0664 (+ 11 других файлов) |
| materialKind | №0062 |
| materialOnly | №0793 |
| materials | №0062 (+ 48 других файлов) |
| MATERIALS | №1150 (+ 13 других файлов) |
| materialsCost | №0078 |
| materialsPaid | №1118 |
| materialsUsed | №0665 |
| Math | №1144 (+ 4 других файлов) |
| maturity | №0059 (+ 1 других файлов) |
| max | №0061 (+ 51 других файлов) |
| max_mm | №1131 |
| max_morph_targets | №1160 |
| maxAbility | №0078 (+ 1 других файлов) |
| maxBloodLevels | №0813 |
| maxBuffer | №1352 |
| maxCR | №0779 (+ 1 других файлов) |
| maxDice | №0779 |
| maxDisplacementMeters | №1162 |
| maxDistanceFt | №0779 |
| maxExtraShredPsi | №0779 |
| maxHeal | №0779 |
| maxHitDice | №0779 |
| maxHitPoints | №1262 |
| maxHp | №0078 (+ 68 других файлов) |
| maxHP | №0784 (+ 3 других файлов) |
| maxHpReduction | №0779 |
| maxHpReductionOnNecrotic | №0779 |
| maximize | №0648 (+ 3 других файлов) |
| maximizeAttack | №0818 |
| maximized | №0655 (+ 1 других файлов) |
| maximizeDamageDice | №0648 (+ 1 других файлов) |
| maximizeElementalSpell | №0779 |
| maximizeNextAttack | №0818 |
| maximizeNextRoll | №0818 |
| maximum | №0078 |
| maxIntelligence | №0829 |
| maxLevels | №0648 (+ 1 других файлов) |
| maxObjects | №0779 |
| maxOutside | №1308 |
| maxPoints | №0624 (+ 1 других файлов) |
| maxPotions | №0078 |
| maxScore | №0779 |
| maxSizeFt | №0779 |
| maxSlots | №0844 |
| maxSpellLevel | №0803 |
| maxSpellLevelByLevel | №0803 |
| maxSpend | №0809 |
| maxSpendTempHp | №0779 |
| maxStages | №0078 |
| maxStrands | №0059 |
| maxStrDexCon | №0779 |
| maxTargets | №0779 |
| maxUses | №0654 |
| maxWeightLb | №0779 |
| me | №1178 (+ 9 других файлов) |
| measureStartId | №0626 |
| mechanics | №0677 (+ 16 других файлов) |
| mechanicsPending | №0871 (+ 1 других файлов) |
| mechanicsSource | №0701 (+ 3 других файлов) |
| mechanicsStatus | №0688 |
| medicine | №0670 (+ 3 других файлов) |
| medium | №0059 (+ 2 других файлов) |
| mediumArmorWisInsteadOfDex | №0779 |
| meleeAttack | №0779 (+ 1 других файлов) |
| meleeDamage | №0813 |
| meleeExtraDamage | №0779 |
| meleeOrThrown | №0656 (+ 1 других файлов) |
| meleeSpellAttack | №0779 |
| meleeWeaponAttack | №0779 |
| members | №0774 |
| menacingShout | №0779 |
| mentalAny | №0872 |
| mentalConstruct | №0779 |
| mentalDefense | №0776 |
| mentalSavesDisadvantage | №0779 |
| mentalSource | №0816 |
| mentalStats | №0784 |
| mentalStatsPersist | №0784 |
| mentor | №0739 (+ 2 других файлов) |
| mercenary | №0779 |
| merciless | №0779 |
| mercy | №0803 |
| mesh | №1158 (+ 1 других файлов) |
| meshes | №0063 (+ 5 других файлов) |
| meshWeights | №0069 (+ 1 других файлов) |
| message | №0077 (+ 33 других файлов) |
| messy | №0061 |
| messy_crop | №0061 (+ 1 других файлов) |
| meta | №0851 |
| META_COST | №0648 |
| META_NAMES | №0648 |
| metadata | №0078 (+ 12 других файлов) |
| metal | №0062 (+ 1 других файлов) |
| metalworker | №0670 |
| metamagic | №0648 |
| metamagic_adept | №0782 |
| metamorphosesKnown | №0648 |
| metamorphosesMax | №0648 |
| metamorphosis | №0077 |
| method | №0653 (+ 4 других файлов) |
| metrics | №0063 |
| mettle | №0655 (+ 2 других файлов) |
| mid | №0863 |
| mimic | №0686 |
| min | №0061 (+ 17 других файлов) |
| minAppVersion | №0842 (+ 1 других файлов) |
| minAt11 | №0779 |
| Mind | №0080 |
| mindLeech | №0779 |
| mindRead | №0776 |
| mindReadingImmunity | №0779 |
| mindsightFt | №0779 |
| mindsightTrackingHours | №0779 |
| mindStats | №0816 |
| mindThrust | №0779 |
| miner | №0801 (+ 1 других файлов) |
| mineral | №0826 |
| minFilter | №0063 (+ 1 других файлов) |
| minHeight | №0886 |
| minimal | №0066 |
| minimum | №0078 (+ 3 других файлов) |
| minimumAC | №0779 |
| minimumD20 | №0779 |
| minIndex | №1169 |
| mining | №0825 (+ 1 других файлов) |
| minion | №0779 |
| minionResistance | №0779 |
| minionRollBonus | №0779 |
| minionTypes | №0779 |
| minLevel | №0672 |
| minor | №0821 |
| minotaur | №1340 |
| minPsi | №0779 |
| minStr | №0084 |
| minusD4AllD20 | №0779 |
| minutesSinceDeath | №1118 |
| minWidth | №0886 |
| miracle | №0813 |
| miraculousHealing | №0803 |
| miserableCompany | №0779 |
| misfortune | №0077 (+ 1 других файлов) |
| miss | №0779 |
| missed | №0835 |
| missedUnarmedExtraAttack | №0779 |
| missing | №0664 (+ 5 других файлов) |
| missingTools | №0668 (+ 2 других файлов) |
| missRecoveryMinutes | №0779 |
| missRefund | №0779 |
| missRefunds | №0809 |
| mistAffinity | №0629 |
| mistStep | №0813 |
| mithral | №0668 |
| mitosis | №0839 |
| mix | №0081 |
| mixBonus | №1210 |
| mixedPotions | №0779 |
| mixPotions | №0078 |
| mobility | №0641 |
| Mobility | №0779 |
| mod | №0827 (+ 1 других файлов) |
| mode | №0059 (+ 17 других файлов) |
| model | №0070 (+ 2 других файлов) |
| modelFamily | №0066 |
| modelLoc | №0073 |
| models | №1849 |
| modes | №0828 |
| modifier | №0801 (+ 5 других файлов) |
| modifierAtLevel20 | №0829 |
| modifierIds | №0674 |
| modifiers | №0779 (+ 1 других файлов) |
| modifyStats | №0818 |
| modules | №0853 |
| mohawk | №0061 (+ 1 других файлов) |
| monastery | №0067 |
| monster | №0806 (+ 3 других файлов) |
| monster_acid_slime | №0826 |
| monster_acolyte_cloth | №0826 |
| monster_air_essence | №0826 |
| monster_air_vortex | №0826 |
| monster_ankheg_acid_gland | №0826 |
| monster_ankheg_shell | №0826 |
| monster_bandit_captain_leather_armor | №0826 |
| monster_bandit_hide | №0826 |
| monster_basilisk_eye | №0826 |
| monster_basilisk_gallstone | №0826 |
| monster_basilisk_scale | №0806 |
| monster_bear_fat | №0826 |
| monster_bear_hide | №0826 |
| monster_blink_dog_pelt | №0826 |
| monster_blink_dog_phase_gland | №0826 |
| monster_boar_hide | №0826 |
| monster_boar_tusk | №0826 |
| monster_bugbear_fang | №0826 |
| monster_bugbear_hide | №0826 |
| monster_carrion_chitin | №0826 |
| monster_carrion_crawler_paralytic | №0826 |
| monster_constrictor_hide | №0826 |
| monster_constrictor_venom | №0826 |
| monster_crocodile_hide | №0826 |
| monster_crocodile_teeth | №0826 |
| monster_cultist_cloth | №0826 |
| monster_deer_antler | №0826 |
| monster_deer_hide | №0826 |
| monster_direwolf_fang | №0826 |
| monster_direwolf_hide | №0806 (+ 1 других файлов) |
| monster_displacer_hide | №0826 |
| monster_displacer_tentacle | №0826 |
| monster_dragon_blood | №0806 |
| monster_dragon_bones | №0806 (+ 1 других файлов) |
| monster_dragon_heart | №0826 |
| monster_dragon_scales | №0806 (+ 1 других файлов) |
| monster_earth_core | №0826 |
| monster_earth_essence | №0826 |
| monster_ectoplasm | №0826 |
| monster_ethereal_shard | №0826 |
| monster_fire_ash | №0826 |
| monster_fire_essence | №0826 |
| monster_frog_gland | №0826 |
| monster_frog_skin | №0826 |
| monster_ghost_thread | №0826 |
| monster_ghoul_claw | №0826 |
| monster_ghoul_tissue | №0826 |
| monster_giant_eagle_claw | №0826 |
| monster_giant_eagle_feather | №0826 |
| monster_giant_owl_eye | №0826 |
| monster_giant_owl_feather | №0826 |
| monster_gnoll_hide | №0826 |
| monster_gnoll_tooth | №0826 |
| monster_goblin_hide | №0826 |
| monster_harpy_vocal_membrane | №0826 |
| monster_hyena_fangs | №0826 |
| monster_hyena_hide | №0826 |
| monster_kobold_horn | №0826 |
| monster_kobold_scalehide | №0826 |
| monster_manticore_hide | №0826 |
| monster_manticore_meat | №0826 |
| monster_manticore_spines | №0806 |
| monster_meat | №0826 |
| monster_mimic_skin | №0826 |
| monster_mimic_slime | №0826 |
| monster_orc_hide | №0826 |
| monster_owlbear_claw | №0826 |
| monster_owlbear_feathers | №0806 |
| monster_owlbear_hide | №0806 (+ 1 других файлов) |
| monster_rat_fangs | №0826 |
| monster_rat_hide | №0826 |
| monster_rust_chitin | №0826 |
| monster_rust_gland | №0826 |
| monster_shadow_clot | №0826 |
| monster_slime_membrane | №0826 |
| monster_spectral_dust | №0826 |
| monster_spider_chitin | №0806 |
| monster_spider_silk | №0806 (+ 1 других файлов) |
| monster_spider_venom | №0826 |
| monster_troll_blood | №0806 (+ 1 других файлов) |
| monster_troll_claw | №0826 |
| monster_troll_hide | №0806 (+ 1 других файлов) |
| monster_veteran_leather_armor | №0826 |
| monster_water_core | №0826 |
| monster_water_essence | №0826 |
| monster_wight_bone | №0826 |
| monster_wight_essence | №0826 |
| monster_wolf_hide | №0806 (+ 1 других файлов) |
| monsterCount | №0805 |
| monsterCR | №0808 |
| monsterId | №0783 (+ 5 других файлов) |
| monsterName | №0811 |
| monsterparts | №0801 (+ 1 других файлов) |
| MONSTERS | №0655 |
| monstrosity | №0628 (+ 13 других файлов) |
| monstrousGrafts | №0078 |
| monstrousMenagerie | №0779 |
| monstrousMinion | №0776 (+ 1 других файлов) |
| moonEffects | №0813 |
| morph_names | №1160 |
| morph_primitives | №1160 |
| morphAccessor | №1157 |
| morphBufferView | №1157 |
| morphChannels | №0068 (+ 1 других файлов) |
| morphNames | №0069 (+ 2 других файлов) |
| morphs | №0066 (+ 3 других файлов) |
| morphSet | №0066 |
| morphTargets | №0069 (+ 1 других файлов) |
| morphWeights | №0066 |
| mount | №0809 |
| mountaineer | №0779 |
| mountainsEndurance | №0779 |
| mountCantripSwap | №0809 |
| mounted | №0813 |
| mountRollBonus | №0779 |
| mountSpeed | №0809 |
| moustache | №0063 (+ 3 других файлов) |
| mouth | №0061 |
| mouthWidth | №0066 (+ 1 других файлов) |
| moveAlliesHalfSpeed | №0779 |
| moveAndAttack | №0779 |
| moveCostFt | №0078 |
| moved | №0863 |
| movedFt | №0818 |
| moveFt | №0686 (+ 4 других файлов) |
| moveHalfSpeed | №0641 |
| movement | №0078 (+ 19 других файлов) |
| movementAllowance | №0818 |
| movementUsed | №0078 (+ 14 других файлов) |
| movementWithoutOpportunityAttacks | №0813 |
| moveReward | №0818 |
| moveStraightFt | №0779 |
| moveThralls | №0809 |
| moveThroughCreatures | №0779 |
| moveThroughProneCreatures | №0779 |
| moveTo | №0811 (+ 1 других файлов) |
| moveToward | №0656 |
| moving | №0061 |
| moxie | №0716 (+ 2 других файлов) |
| moxieFraction | №0776 |
| moxieFueledFists | №0716 |
| moxieOnFail | №0779 |
| moxieRefunded | №0779 |
| moxieRestored | №0779 |
| moxieSpent | №0779 |
| msg | №0849 (+ 1 других файлов) |
| muddledMind | №0641 |
| mufflingImprecation | №0779 |
| mult | №0667 (+ 1 других файлов) |
| multiAttackAction | №0655 (+ 1 других файлов) |
| multiclass | №0078 (+ 7 других файлов) |
| multiclassAllowed | №0646 (+ 7 других файлов) |
| multiclassProficiencies | №0677 (+ 6 других файлов) |
| multiclassRequirement | №0077 (+ 18 других файлов) |
| multiplier | №0805 |
| mummification | №0779 |
| mummyLord | №0779 |
| mummyRot | №0779 |
| muscle | №0063 (+ 5 других файлов) |
| mutagen | №0641 (+ 2 других файлов) |
| mutagenAbility | №0078 |
| mutagencraft | №0641 |
| mutagenMaximum | №0078 |
| mutagenNoDownside | №0078 |
| mutagens | №0641 (+ 1 других файлов) |
| mutations | №0816 (+ 2 других файлов) |
| mutationSlots | №0816 (+ 1 других файлов) |
| muzzle | №0061 |
| muzzleHeight | №0066 (+ 7 других файлов) |
| muzzleLength | №0066 (+ 9 других файлов) |
| muzzleWidth | №0066 (+ 7 других файлов) |
| myconid | №1332 |
| mysteries | №0707 (+ 1 других файлов) |
| mystery | №0813 |
| mysticArcanum | №0648 |
| mysticEmpowerment | №0833 |
| mysticFrenzy | №0641 |
| mythicForms | №0833 |
| mythicVoice | №0779 |
| n | №0058 (+ 4 других файлов) |
| name | №0060 (+ 237 других файлов) |
| NAME | №0666 |
| nameRu | №0624 (+ 8 других файлов) |
| nameRus | №1088 |
| names | №1208 (+ 1 других файлов) |
| narrow | №0061 (+ 2 других файлов) |
| native | №0810 (+ 1 других файлов) |
| nativeHeadH | №0061 |
| natural | №0066 |
| natural20 | №0811 (+ 1 других файлов) |
| naturalArmor | №0833 |
| naturalAttacks | №0816 (+ 1 других файлов) |
| naturalExplorer | №0648 |
| naturalist | №0829 |
| naturalRecovery | №0816 |
| naturalWeapons | №0833 |
| nature | №0772 (+ 2 других файлов) |
| Nausea | №0080 |
| navigation | №0776 |
| navigator | №1149 (+ 9 других файлов) |
| navigatorCrew | №0779 |
| navy | №0868 |
| nearAllyId | №0818 (+ 1 других файлов) |
| neck | №0061 (+ 2 других файлов) |
| neckDepth | №1128 (+ 2 других файлов) |
| neckline | №1128 (+ 1 других файлов) |
| necrodancer | №0809 |
| necromancyDamageBonusPerCharnel | №0809 |
| necromancyUnleashed | №0809 |
| necromanticSpurs | №0779 |
| necromanticSustainment | №0779 |
| necrotic | №0776 (+ 1 других файлов) |
| Necrotic | №0080 |
| necroticAffinity | №0813 |
| necroticBone | №0826 |
| necroticDamage | №0776 (+ 2 других файлов) |
| necroticEssence | №0826 |
| necroticIgnoreImmunity | №0809 |
| necroticIgnoreResistance | №0809 |
| necroticReagent | №0826 |
| need | №0672 |
| needsChoice | №0078 |
| needsConfirmation | №0078 |
| needsDonor | №0078 |
| needsMaterials | №0078 |
| needsRoll | №0078 |
| needsSubclassChoice | №0700 |
| needsTarget | №0078 |
| needsTime | №0078 |
| negatingAnathema | №0779 |
| negative | №1119 (+ 3 других файлов) |
| negotiated | №0801 |
| negotiatedPrice | №0801 |
| negotiatedQuote | №0801 |
| negotiationModifier | №0801 |
| network | №0848 (+ 2 других файлов) |
| neutral | №0065 |
| newDraft | №0861 |
| newJinxOptions | №0779 |
| newTraderIds | №0800 |
| newValue | №0811 |
| next | №0058 (+ 2 других файлов) |
| nextAttackAdvantage | №0641 (+ 1 других файлов) |
| nextAttackBonus | №0779 |
| nextAttackExtraDice | №0078 |
| nextBombOnly | №0078 |
| nextConcentrationSaveDisadvantage | №0641 |
| nextDamageDice | №0779 |
| nextHitCrit | №0779 |
| nextRiteHitExtraDie | №0641 |
| nextRollMaximum | №0818 |
| nextSaveAdvantage | №0779 |
| nextSpellOrWeaponDamageDisadvantage | №0779 |
| nextTick | №0078 (+ 1 других файлов) |
| nextWisSaveDisadvantage | №0641 |
| night | №0073 |
| nighteye | №0641 |
| Nighteye | №0779 |
| nightforest | №0063 |
| nightmareMount | №0809 |
| nightTerrors | №0779 |
| nightTerrorsWhileAsleep | №0779 |
| noAction | №0779 |
| noActions | №0818 |
| noAging | №0779 |
| noAttacks | №0818 (+ 1 других файлов) |
| Noble | №0795 |
| noConcentrationCheck | №0803 |
| noCoverOrInvisibility | №0641 |
| noDamage | №0078 |
| noDash | №0779 |
| node | №0068 (+ 3 других файлов) |
| nodeId | №0878 |
| nodeIntegration | №0886 |
| nodes | №0878 (+ 7 других файлов) |
| noDisadvantage | №0779 |
| noDisengage | №0818 |
| noFallDamage | №0779 |
| noFoodOrDrink | №0779 |
| noForcedMovement | №0818 (+ 1 других файлов) |
| noFreeWill | №0869 |
| noHealing | №0779 |
| noHealingFromOwnSpells | №0803 |
| noHealingUntilStartNextTurn | №0779 |
| noHelp | №0818 |
| noHide | №0062 (+ 1 других файлов) |
| noMainAction | №0818 (+ 1 других файлов) |
| noMaintainAction | №0779 |
| noMovement | №0818 |
| nonAttackAccursedDamageBonus | №0779 |
| nonCombat | №0657 |
| none | №0066 (+ 1 других файлов) |
| nonlethal | №0078 |
| nonmagicalDamageReduction | №0779 |
| nonManifold | №1133 |
| nonZeroMappedGlbVertexPct | №1167 |
| nonZeroMappedGlbVertices | №1167 |
| nonZeroPct | №1157 |
| nonZeroTargetEntries | №1168 |
| nonZeroVertices | №1157 |
| noOldAgeDeath | №0813 |
| noOpportunity | №0776 |
| noOpportunityAttacks | №0078 (+ 3 других файлов) |
| noReaction | №0779 (+ 1 других файлов) |
| noReactions | №0641 (+ 4 других файлов) |
| noReduction | №0779 |
| noRest | №0779 |
| normal | №0827 (+ 1 других файлов) |
| normalForm | №0833 |
| normalize | №0059 (+ 6 других файлов) |
| normalizeCharacter | №0784 (+ 3 других файлов) |
| normalizeClassName | №0836 |
| normalizeConditionName | №0827 (+ 2 других файлов) |
| normalizeHead | №0066 |
| normalPaceStealth | №0779 |
| normals | №0061 (+ 2 других файлов) |
| noseLength | №0066 |
| noseWidth | №0066 (+ 1 других файлов) |
| noShield | №0779 |
| noSpells | №0818 |
| noStandardHealing | №0839 |
| noSurprise | №0779 |
| notation | №0829 |
| note | №0655 (+ 8 других файлов) |
| noteAffect | №0818 |
| noteD20Roll | №0818 |
| noteMove | №0818 |
| notes | №0624 (+ 28 других файлов) |
| noTransfer | №0818 |
| noUnderwaterDrawbacks | №0779 |
| nourishing | №0779 |
| noVerbal | №0818 (+ 1 других файлов) |
| npcs | №1259 |
| nTexture | №0076 |
| nuclearBomb | №0677 |
| nullification | №0779 |
| number | №0821 |
| numerator | №0821 |
| nylon | №0062 |
| oak | №0672 (+ 1 других файлов) |
| objectId | №0779 (+ 2 других файлов) |
| objectIds | №1208 |
| objectMeleeDamageMultiplier | №0779 |
| objects | №0071 (+ 1 других файлов) |
| obscured | №0686 |
| observe | №0641 |
| obstacles | №1174 (+ 10 других файлов) |
| obstinateAnathema | №0779 |
| occultFetish | №0813 |
| occultRitesKnown | №0707 |
| ocean | №0063 |
| odds | №0821 |
| offer | №0821 |
| offeredCp | №0801 (+ 1 других файлов) |
| official | №0660 (+ 1 других файлов) |
| official_expansion | №0628 |
| offline | №0852 (+ 1 других файлов) |
| oil | №0078 |
| oilBomb | №0779 |
| oilCoated | №0078 |
| ok | №0832 (+ 79 других файлов) |
| old | №0811 |
| oldFormat | №1186 |
| oldLevel | №0670 |
| oldOneTwo | №0779 |
| omnipotence | №0779 (+ 1 других файлов) |
| omnipresence | №0779 (+ 1 других файлов) |
| omniscience | №0779 (+ 1 других файлов) |
| onApply | №0843 |
| onAttackResult | №0077 (+ 8 других файлов) |
| once | №0082 (+ 6 других файлов) |
| oncePerLongRest | №0803 |
| oncePerTurn | №0078 (+ 1 других файлов) |
| onChange | №0653 |
| onclick | №1266 |
| onCondition | №0641 (+ 5 других файлов) |
| onDamage | №0641 (+ 4 других файлов) |
| onDefeat | №0783 |
| onePerShortRest | №0809 |
| oneThirdCaster | №0779 |
| onFail | №0774 (+ 1 других файлов) |
| ongoingDamage | №0686 |
| onHitSave | №0818 |
| onLine | №1149 (+ 1 других файлов) |
| onlyDeadBodies | №0869 |
| onlyMisfortuneFeatures | №0779 |
| onNatural1 | №0078 |
| onPreyDeath | №0779 |
| onProgress | №0842 |
| onRetry | №0843 |
| onSave | №0779 |
| onSavingThrow | №0648 (+ 1 других файлов) |
| onTurnEnd | №0077 (+ 10 других файлов) |
| ooze | №0774 |
| opacity | №0061 (+ 1 других файлов) |
| open | №0060 (+ 27 других файлов) |
| OPENAI_API_KEY | №1115 |
| openBoard | №0861 |
| openDebug | №0848 |
| openHandTechnique | №0811 |
| openInfo | №0666 |
| openLog | №0848 |
| openMainMenuUpdate | №0842 |
| openMind | №0779 |
| openReplay | №0847 |
| openTrade | №0801 |
| operationId | №0818 (+ 20 других файлов) |
| opportunityAdvantage | №0818 |
| opportunityAttack | №0818 (+ 3 других файлов) |
| opportunityAttackBecomesGrapple | №0779 |
| optics | №0670 |
| optional | №0795 |
| optionalSlotDice | №0779 |
| options | №0062 (+ 6 других файлов) |
| optionsFor | №0062 |
| opts | №0811 (+ 1 других файлов) |
| oracle | №0641 (+ 2 других файлов) |
| Oracle | №0707 |
| orange | №0832 |
| orcish_fury | №0782 |
| orcsteppe | №0063 |
| order | №0641 (+ 1 других файлов) |
| orders | №0688 (+ 1 других файлов) |
| organ | №0826 |
| organic | №0063 |
| origin | №0073 |
| original | №0078 |
| originalStats | №0816 (+ 1 других файлов) |
| originRaceId | №0066 (+ 1 других файлов) |
| ostorianDiscourse | №0779 |
| other | №1126 (+ 2 других файлов) |
| otherStyleEffectsPending | №0872 |
| otherworldlyPatron | №0641 |
| outcome | №0672 (+ 1 других файлов) |
| outcomeLabel | №0672 |
| outer | №0058 (+ 2 других файлов) |
| outlandsEligible | №0632 |
| outOfOrder | №0852 |
| output | №0667 (+ 7 других файлов) |
| outputBytes | №1157 |
| oval | №0063 (+ 1 других файлов) |
| oven | №0067 |
| overCorset | №0062 |
| overCuirass | №0062 |
| overflow | №1319 |
| overheat | №0779 |
| overheatIgnoresImmunity | №0779 |
| overlay | №0843 |
| overlord | №0809 |
| overpayCp | №0802 |
| owl | №0061 |
| owlbear | №0686 |
| own | №1176 |
| ownedCondition | №0818 |
| owner | №1119 |
| owner_id | №1149 |
| ownerId | №0078 (+ 10 других файлов) |
| ownerPeerId | №1202 (+ 7 других файлов) |
| ownerTokenId | №0078 (+ 4 других файлов) |
| ownerTurns | №0641 |
| ownTurnId | №0821 (+ 2 других файлов) |
| ox | №0072 |
| oy | №0072 |
| p | №0058 (+ 2 других файлов) |
| p_deleted | №0653 |
| p_expected_revision | №0653 |
| p_id | №0653 |
| p_operation_id | №0653 |
| p_profile | №0653 |
| p_schema_version | №0653 |
| p1 | №1265 (+ 3 других файлов) |
| p2 | №1265 |
| pa | №1202 |
| pack | №0063 (+ 7 других файлов) |
| PACK_ID | №0078 (+ 2 других файлов) |
| packId | №0661 |
| packleader | №0779 |
| Packleader | №0795 |
| packs | №0776 (+ 2 других файлов) |
| packTactics | №0779 |
| pact | №0827 (+ 1 других файлов) |
| pactBoon | №0648 |
| pactLevel | №0798 |
| pactMagic | №0641 (+ 3 других файлов) |
| pactMagicData | №0811 (+ 4 других файлов) |
| padding | №0671 |
| paid_api_authorized | №1115 |
| painkiller | №0779 |
| painkillerGrandStrategist | №0779 |
| painkillerPunishment | №0779 |
| paint | №0078 |
| paintBomb | №0779 |
| paintCreatures | №0078 |
| painter | №0670 (+ 3 других файлов) |
| paintV38 | №0672 |
| paladin | №0798 (+ 1 других файлов) |
| paleMaster | №0809 |
| panelScroll | №1319 |
| panelUV | №0062 |
| panX | №0070 (+ 2 других файлов) |
| panY | №0070 (+ 2 других файлов) |
| paper | №0668 (+ 2 других файлов) |
| Paragon | №0795 |
| paragonOfChivalry | №0779 |
| paralyticReagent | №0826 |
| paralyzed | №0779 (+ 1 других файлов) |
| parasiteMind | №0816 |
| parchment | №0668 (+ 2 других файлов) |
| parent | №0820 |
| parentContainerId | №0789 |
| parentId | №0839 |
| parentNode | №1266 |
| parentTriangles | №1325 (+ 3 других файлов) |
| parley | №0779 |
| parleyFree | №0779 |
| parseDice | №0827 (+ 5 других файлов) |
| part | №0065 |
| partial | №0059 |
| participantTurnStart | №0818 |
| partnerId | №0818 |
| parts | №0058 (+ 13 других файлов) |
| pass | №0854 |
| passesThroughCreatures | №0779 |
| passive | №0063 (+ 9 других файлов) |
| password | №0653 |
| patch | №0665 (+ 1 других файлов) |
| path | №0067 (+ 32 других файлов) |
| pathCost | №1279 (+ 1 других файлов) |
| pathFt | №0811 |
| patientDefense | №0648 |
| patron | №0641 (+ 5 других файлов) |
| patrons | №0641 |
| patternScale | №0062 |
| pauldrons | №0062 |
| pawPadColor | №0066 |
| payHitPointCost | №0655 |
| payload | №0811 (+ 16 других файлов) |
| payOwnHPForCharnel | №0809 |
| PB | №0784 (+ 3 других файлов) |
| pc | №0810 |
| pd | №1202 |
| peaceAura | №0818 (+ 2 других файлов) |
| peaceBlocked | №0655 (+ 1 других файлов) |
| peakPhysicalCondition | №0716 (+ 1 других файлов) |
| pectorals | №0063 (+ 1 других файлов) |
| peer | №0811 |
| peerId | №1256 |
| peerName | №0810 |
| penaltyPerFatigue | №0779 |
| pending | №0078 (+ 3 других файлов) |
| pendingAnswer | №0810 |
| pendingAttack | №0655 (+ 1 других файлов) |
| pendingDamage | №0641 (+ 3 других файлов) |
| pendingInitiativeBonus | №0818 |
| pendingOffer | №0810 |
| pendingOnHit | №0078 (+ 3 других файлов) |
| pendingReaction | №0811 |
| pendingReactions | №0811 (+ 1 других файлов) |
| pendingSelection | №0648 |
| penetratesResistance | №0779 |
| penetratingDice | №0779 |
| pentacles | №0818 (+ 1 других файлов) |
| pentacles_14 | №0818 |
| percent | №0821 |
| perception | №0772 (+ 1 других файлов) |
| Perception | №0080 |
| perceptionReagent | №0826 |
| percipient | №0641 |
| Percipient | №0779 |
| perfectSelf | №0648 |
| performance | №0772 (+ 3 других файлов) |
| perilousGambit | №0779 |
| permanentCurse | №0779 |
| persistent | №0779 |
| persistentRage | №0648 |
| persona | №0779 |
| persuasion | №0772 (+ 2 других файлов) |
| persuasionDeceptionIntimidationFloor | №0779 |
| perTargetLongRest | №0779 |
| perTurn | №0809 |
| petrification | №0779 |
| Petrification | №0080 |
| petrificationReagent | №0826 |
| pharaoh | №0809 |
| phase | №0061 (+ 3 других файлов) |
| phaseFiber | №0826 |
| phaseReagent | №0826 |
| phaseRift | №0779 |
| phaseRiftNoStraightLine | №0779 |
| phaseThrough | №0779 |
| phaseWeaponAttack | №0779 |
| philosophersStone | №0677 |
| physicalAndroidQA | №1162 |
| physicalResistance | №0839 |
| physicalStats | №0784 (+ 1 других файлов) |
| physicalStatsFromShell | №0784 |
| physician | №0829 |
| pickFloor | №0073 |
| pickLevel | №0077 (+ 17 других файлов) |
| piercing | №0871 |
| pigment | №0672 |
| pineResin | №0673 |
| pissAndVinegar | №0716 |
| pitch | №0070 (+ 1 других файлов) |
| pixie | №0061 (+ 1 других файлов) |
| pl | №0073 |
| placeToken | №0861 |
| plague | №0839 |
| plagueLord | №0809 |
| plain | №0663 |
| plan | №0811 (+ 1 других файлов) |
| planar | №0632 |
| planarInfluence | №0632 |
| planes | №0632 |
| planescape | №0632 |
| planned | №0660 |
| planPreview | №0626 |
| plant | №0628 (+ 11 других файлов) |
| plasmoid | №1332 |
| plateColor | №0066 (+ 1 других файлов) |
| plates | №0066 |
| plateSize | №0066 (+ 2 других файлов) |
| play | №0818 (+ 1 других файлов) |
| playerAction | №1266 |
| playfair | №0832 |
| playing | №0082 (+ 1 других файлов) |
| playingTheOdds | №0779 |
| pleats | №0062 (+ 3 других файлов) |
| plusDex | №0813 |
| pockets | №0628 (+ 18 других файлов) |
| pocketSand | №0779 |
| point | №0061 (+ 2 других файлов) |
| pointerId | №1119 |
| points | №0061 (+ 1 других файлов) |
| poison | №0648 (+ 3 других файлов) |
| poisonBypass | №0813 |
| poisoned | №0809 (+ 1 других файлов) |
| poisoner | №0672 (+ 3 других файлов) |
| poisonIgnoresImmunity | №0809 |
| poisonIgnoresResistance | №0809 |
| poisonOnCharnel | №0809 |
| poisonResistance | №0776 |
| polearm_master | №0782 |
| polyglot | №0779 (+ 1 других файлов) |
| ponytail | №0061 (+ 1 других файлов) |
| pool | №0809 (+ 1 других файлов) |
| poor | №0665 (+ 1 других файлов) |
| porcelainClay | №0673 |
| portalAffinity | №0632 |
| portalRoute | №0632 |
| pos | №0073 |
| pose | №0066 |
| poseBuilds | №0063 |
| poses | №0065 |
| position | №0061 (+ 10 других файлов) |
| POSITION | №0064 (+ 6 других файлов) |
| positions | №0058 (+ 11 других файлов) |
| positive | №1119 (+ 3 других файлов) |
| Possessed | №0779 |
| possession | №0077 (+ 1 других файлов) |
| possessLiving | №0784 |
| postMessage | №0887 |
| pot | №0067 |
| potash | №0673 |
| potency | №0080 (+ 1 других файлов) |
| Potency | №0779 |
| potentObservation | №0829 |
| potion | №0078 (+ 4 других файлов) |
| potionBrewing | №0677 |
| potionCap | №0809 |
| potionColor | №0078 (+ 1 других файлов) |
| potionMixologist | №0677 |
| potions | №0078 |
| potter | №0670 (+ 3 других файлов) |
| pottery | №0668 (+ 1 других файлов) |
| power | №0061 (+ 2 других файлов) |
| powerOfTwo | №0063 |
| powerPreference | №0073 |
| pp | №0790 (+ 5 других файлов) |
| precedence | №0854 |
| precision | №0641 |
| Precision | №0779 |
| precisionStrike | №0779 |
| precognition | №0779 |
| predatoryInstinct | №0779 |
| predictiveDodge | №0779 |
| predictorCardId | №1194 (+ 1 других файлов) |
| predictorMajor | №1195 |
| predictorState | №1149 |
| preload | №0886 |
| premium | №1111 |
| prepare | №0065 (+ 1 других файлов) |
| prepared | №0078 (+ 4 других файлов) |
| preparedActions | №0811 (+ 1 других файлов) |
| preparedByLevel | №0803 (+ 1 других файлов) |
| preparedClasses | №0836 |
| preparedLastStand | №0818 |
| preparedLimit | №0836 |
| preparedReactionAttack | №0648 |
| preparedSpells | №0803 (+ 1 других файлов) |
| prepareForLibrary | №0071 |
| prepareInspiration | №0818 |
| prerequisite | №0688 (+ 6 других файлов) |
| present | №0833 (+ 1 других файлов) |
| preserved | №0779 |
| preserveLife | №0648 (+ 1 других файлов) |
| preset | №0063 (+ 5 других файлов) |
| presetId | №0066 (+ 1 других файлов) |
| presets | №0066 (+ 1 других файлов) |
| press | №0067 |
| preSubclassBase | №0821 |
| pretendToBeVisual | №1172 |
| preventDropToZero | №0779 |
| preventExhaustion | №0779 |
| preventOpportunity | №0818 |
| preventsOpportunity | №0818 |
| preventZero | №0779 |
| preventZeroHp | №0686 |
| preview | №0071 |
| previewDisassembly | №0664 |
| previous | №0783 (+ 1 других файлов) |
| previousHp | №0655 |
| preyDamage | №0779 |
| price | №0628 (+ 20 других файлов) |
| priceImproved | №1214 |
| priceModifier | №0801 |
| primalChampion | №0648 |
| primalResilience | №0833 |
| primary | №0832 |
| primaryAbilities | №0078 (+ 4 других файлов) |
| primaryResourceId | №0081 |
| primaryStat | №0077 (+ 31 других файлов) |
| primeBomb | №0677 |
| primeval | №0779 |
| primevalForm | №0833 |
| primevalResurgence | №0833 |
| primitives | №1158 (+ 1 других файлов) |
| primordial | №0686 |
| priority | №0648 (+ 2 других файлов) |
| prismatic | №0078 |
| prismaticBomb | №0779 |
| prismaticIndex | №1118 |
| pristine | №0664 (+ 1 других файлов) |
| privileges | №0886 |
| processedEach | №0663 |
| processedId | №0826 |
| processedRuns | №0663 |
| processedUnit | №0826 |
| processing | №0672 (+ 1 других файлов) |
| prodigy | №0672 |
| profBonus | №0624 (+ 20 других файлов) |
| profession | №0670 (+ 4 других файлов) |
| professionBonus | №1210 |
| professionIds | №0670 |
| professionProfile | №0081 |
| professionRequirements | №0670 |
| PROFESSIONS | №0670 |
| proficiencies | №0646 (+ 10 других файлов) |
| proficiency | №0746 (+ 4 других файлов) |
| proficiencyBonus | №0658 (+ 13 других файлов) |
| proficiencyIfUntrained | №0818 |
| proficiencyRank | №1192 |
| proficiencyType | №0084 |
| proficient | №0647 (+ 6 других файлов) |
| profile | №0061 (+ 15 других файлов) |
| profileResources | №0811 |
| prog | №0073 |
| progression | №0649 (+ 15 других файлов) |
| progressionSource | №0701 (+ 3 других файлов) |
| project | №1306 (+ 1 других файлов) |
| projectedWeaponBonus | №0779 |
| projectile | №0655 (+ 3 других файлов) |
| projection | №0779 (+ 3 других файлов) |
| projectItem | №0779 |
| projectMobility | №0641 |
| projectPoint | №0073 |
| projectScreen | №0073 |
| projectUrl | №0651 (+ 4 других файлов) |
| projectVariant | №0835 |
| prolificAffliction | №0779 |
| prompt | №1198 (+ 8 других файлов) |
| prone | №0779 (+ 1 других файлов) |
| proneOnHit | №0779 |
| proneOnSuccess | №0779 |
| pronounced | №0059 |
| prop | №0078 |
| properties | №0079 (+ 10 других файлов) |
| propertiesHidden | №0081 |
| property | №0080 |
| proportions | №1163 |
| props | №0674 |
| protectAlly | №0686 |
| protected | №0818 |
| protection | №0776 |
| protector | №0686 |
| protege | №0779 |
| protegeAdvantageAfterExploit | №0779 |
| protegeUpgrade | №0779 |
| provokesNoOpportunity | №0776 |
| provokesOpportunityAttacks | №0818 |
| pseudopodSize | №0066 (+ 1 других файлов) |
| psi | №1206 |
| psiLimit | №0714 (+ 1 других файлов) |
| psiLimitFormula | №0714 |
| Psion | №0795 |
| psionicPredator | №0779 |
| psionSource | №0795 |
| psiPoints | №0714 (+ 2 других файлов) |
| psiPointsMax | №0776 (+ 1 других файлов) |
| psiPointsRest | №0714 |
| psychic | №0871 |
| psychicDamage | №0779 |
| psychicDamagePerTurn | №0779 |
| psychokinetics | №0779 |
| pubic | №0059 (+ 1 других файлов) |
| publishableKey | №0651 (+ 4 других файлов) |
| pulpit | №0067 |
| pupilOpacity | №0066 (+ 2 других файлов) |
| pupilShape | №0063 (+ 2 других файлов) |
| purity | №0080 |
| purple | №0832 (+ 1 других файлов) |
| pursuit | №0829 |
| pushFt | №0078 (+ 2 других файлов) |
| pushProneSaveBonus | №0779 |
| pushRadiusFt | №0779 |
| q | №1168 |
| qty | №0799 (+ 2 других файлов) |
| quality | №0059 (+ 12 других файлов) |
| QUALITY | №0667 |
| QUALITY_GRADES | №0664 |
| QUALITY_TIERS | №0665 |
| qualityBand | №0664 |
| qualityBonus | №0081 (+ 5 других файлов) |
| qualityEffects | №0665 |
| qualityKey | №0664 (+ 1 других файлов) |
| qualityLabel | №0664 |
| qualityMultiplier | №0799 (+ 1 других файлов) |
| qualityOf | №0665 |
| qualityReport | №0664 |
| quantity | №0668 (+ 1 других файлов) |
| quartz | №0673 |
| quartzForm | №0779 |
| query | №0793 |
| querySelector | №1230 |
| querySelectorAll | №1151 (+ 4 других файлов) |
| queued | №0818 |
| queueLastStandAttacks | №0818 |
| quick | №1288 |
| quickBrewing | №0078 (+ 1 других файлов) |
| quickened | №0648 |
| quickPin | №0779 |
| quiet | №0078 |
| quietBomb | №0779 |
| quiveringPalm | №0811 |
| quota_scope | №1300 |
| quote | №0799 |
| r | №0868 (+ 2 других файлов) |
| rabbit | №0061 |
| rabbitEarSize | №0066 (+ 1 других файлов) |
| rabbitTailSize | №0066 (+ 1 других файлов) |
| rabbleRouser | №0779 |
| race | №0786 (+ 7 других файлов) |
| raceId | №0060 (+ 18 других файлов) |
| raceName | №0624 (+ 1 других файлов) |
| raceWarp | №0061 |
| rack | №0067 |
| radial | №0062 |
| radiant | №0871 |
| Radiant | №0080 |
| radiantAttackOrder | №0779 |
| radiantRetaliation | №0809 |
| radiantVsUndead | №0078 |
| radius | №0062 (+ 4 других файлов) |
| radiusBySlot | №0779 |
| radiusFt | №0677 (+ 3 других файлов) |
| radiusIncreaseFt | №0779 |
| radiusMiles | №0078 |
| rage | №0648 (+ 1 других файлов) |
| rageDamageBonus | №0681 |
| ragesCount | №0681 |
| raging | №1263 (+ 1 других файлов) |
| ragingInferno | №0779 |
| ragPulp | №0673 |
| rail | №0070 |
| raisedFt | №0818 |
| raiseThrallOnSeedKill | №0809 |
| rallyCrew | №0779 |
| rallyingCry | №0739 |
| rallyUnlimited | №0776 (+ 1 других файлов) |
| ram | №0066 |
| rampage | №0656 (+ 1 других файлов) |
| rampageDie | №0779 |
| rampagePending | №0686 |
| randomUUID | №1177 (+ 3 других файлов) |
| range | №0078 (+ 17 других файлов) |
| rangedAttack | №0818 (+ 2 других файлов) |
| rangedAttackBonus | №0779 |
| rangeFt | №0077 (+ 31 других файлов) |
| rangeFtByLevel | №0828 |
| rangeMultiplier | №0779 |
| ranger | №0798 (+ 1 других файлов) |
| rangerFightingStyle | №0648 |
| rank | №0821 |
| rankForRecipe | №0670 |
| rapidity | №0641 |
| Rapidity | №0779 |
| raptor | №0061 |
| rare | №0793 (+ 6 других файлов) |
| rareBonus | №0808 |
| rareChance | №0774 |
| rarity | №0793 (+ 27 других файлов) |
| rate | №0665 |
| ratio | №0664 (+ 4 других файлов) |
| rats | №0061 |
| ravenousWeapon | №0779 |
| raw | №0653 (+ 3 других файлов) |
| rawCopper | №0673 |
| rawIron | №0673 |
| rawUnit | №0826 |
| rawXp | №0805 |
| ray | №0820 |
| reach | №0820 |
| reachBonusFt | №0779 |
| reachFt | №0776 (+ 1 других файлов) |
| reaction | №0078 (+ 41 других файлов) |
| reactionAction | №0779 |
| reactionAttack | №0686 (+ 2 других файлов) |
| reactionAttackOrSingleTargetSpell | №0779 |
| reactionCastHexOnDamager | №0779 |
| reactionChoice | №1194 (+ 2 других файлов) |
| reactionCounter | №0776 |
| reactionDamage | №0779 |
| reactionDamageReduction | №0809 |
| reactionDefensiveOrder | №0779 |
| reactionHalveDamage | №0779 |
| reactionId | №0811 (+ 4 других файлов) |
| reactionMode | №0779 |
| reactionMove | №0779 |
| reactionMoveFt | №0779 |
| reactionNegateSpellUpTo5 | №0779 |
| reactionOpportunityAgainstAttacker | №0779 |
| reactionOptions | №0648 (+ 3 других файлов) |
| reactionPending | №0811 |
| reactionRedirectAttack | №0809 |
| reactions | №0648 (+ 2 других файлов) |
| reactionsMax | №0648 |
| reactionSpell | №0813 |
| reactionsRefresh | №0829 |
| reactionSuppressOnInitiative | №0779 |
| reactionUsesByLevel | №0829 |
| reactionWeather | №0686 |
| reactionWindow | №0655 |
| readAllWriting | №0779 |
| readError | №0063 |
| readOnly | №0847 |
| readWriteForkedLanguages | №0779 |
| ready | №0063 (+ 2 других файлов) |
| readyState | №1150 (+ 26 других файлов) |
| reagent | №0826 |
| reagentRoll | №1118 |
| reagents | №0078 (+ 4 других файлов) |
| reagentsRegained | №0078 |
| reagentsSpent | №0078 |
| reagentSynthesis | №0677 |
| reanimateCorpse | №0869 |
| reanimated | №0869 |
| reanimator | №0809 |
| reaper | №0809 |
| rearDigits | №0061 |
| reason | №0077 (+ 30 других файлов) |
| reassembleCorpus | №0779 |
| rebirthInHell | №0779 |
| rebuild | №0798 |
| rebuildMaterialUsage | №1150 (+ 1 других файлов) |
| recalculate | №0849 |
| receipt | №0818 |
| received | №0802 |
| recharge | №0078 (+ 12 других файлов) |
| rechargeActions | №0805 |
| recharged | №0805 |
| rechargeOn | №0654 |
| rechargeState | №0811 |
| recipe | №0665 (+ 5 других файлов) |
| recipeCount | №0672 |
| recipeId | №0664 |
| recipeName | №0664 |
| recipeRequirements | №0670 |
| recipes | №0667 (+ 4 других файлов) |
| RECIPES | №0667 |
| recipesList | №0667 |
| reciprocalRelationship | №0779 |
| reckless | №0648 |
| recommendedSourceCommit | №1357 |
| reconstruction | №0641 |
| Reconstruction | №0779 |
| record | №0847 (+ 6 других файлов) |
| recordApplication | №0821 |
| recordCraftResult | №0670 |
| recordDamage | №0818 |
| recordMutation | №0816 (+ 1 других файлов) |
| recover | №0653 |
| recoverable | №0664 |
| recovered | №0664 (+ 2 других файлов) |
| recoveredFromCrafting | №0665 |
| recoverRatio | №0664 |
| recovery | №0716 (+ 1 других файлов) |
| Recovery | №0080 |
| RECOVERY_BY_DURABILITY | №0664 |
| RECOVERY_BY_QUALITY | №0665 |
| recoveryRate | №1150 |
| recruitInformant | №0779 |
| recruitMercenary | №0779 |
| recursive | №0888 (+ 48 других файлов) |
| red | №0832 |
| Red | №0776 (+ 1 других файлов) |
| redirect | №0779 |
| redirectAttack | №0779 |
| redirectAttackToAlly | №0078 |
| redirectDamage | №0776 |
| redirectDamageToConstruct | №0779 |
| redirectMeleeAttackToFamiliar | №0779 |
| redirectMissedAttackToGrappledTarget | №0779 |
| redirectOrCancel | №0779 |
| redirectTargetId | №0818 |
| redirectURL | №0886 |
| redistributed | №0818 |
| redo | №0063 |
| reduced | №0641 (+ 2 других файлов) |
| reducedBy | №0779 |
| reduceMaxHpByDamage | №0779 |
| reduceNextVisibleAttackBy | №0779 |
| reduction | №0828 (+ 1 других файлов) |
| reEnabled | №1151 |
| ref | №0818 |
| refinedCopper | №0673 |
| reflectPsychicDamage | №0779 |
| refresh | №0819 (+ 2 других файлов) |
| refresh_token | №0653 (+ 1 других файлов) |
| refreshByItsAlive | №0779 |
| refreshMaterial | №0062 |
| refreshOrgans | №0869 |
| refreshStatus | №0664 |
| refundCharnelOnThrallLoss | №0809 |
| refunded | №0811 |
| refundedSpellSlot | №0811 |
| regainOnShortRest | №0776 |
| regainReagentsOnInitiativeUpTo | №0078 |
| regeneration | №0809 |
| Regeneration | №0080 |
| regenerationBlockedBy | №0809 |
| regenPbWhenBloodied | №0641 |
| region | №0062 (+ 3 других файлов) |
| REGION_MOD | №0799 |
| regionalHairSupported | №0059 |
| regionMask | №0059 |
| regionMultiplier | №0799 |
| regions | №0059 (+ 5 других файлов) |
| register | №0628 (+ 12 других файлов) |
| registerActionHandler | №1202 (+ 5 других файлов) |
| registerClass | №0661 (+ 3 других файлов) |
| registerEquipment | №0066 |
| registerPreset | №0066 |
| registerRace | №0066 |
| registerSkin | №0066 |
| registerSummon | №0830 |
| registry | №0661 |
| reinforcedWoodV49 | №0667 |
| reinvokedRune | №0779 |
| reject | №0788 (+ 2 других файлов) |
| rejuvenatingOrder | №0779 |
| relation | №0818 (+ 1 других файлов) |
| relationship | №0801 |
| relationshipChanged | №1214 |
| relaunch | №1154 |
| relaxationLevels | №0779 |
| rele | №0648 |
| release_ready | №1115 |
| release_reason | №1115 |
| release_source_sha | №1115 |
| releaseDeadSpaceOnInitiative | №0809 |
| releaseToLarva | №0816 |
| relentless | №0629 |
| relentlessRage | №0648 |
| reliableTalent | №0648 |
| relic | №0799 (+ 2 других файлов) |
| religion | №0772 (+ 1 других файлов) |
| remaining | №0648 (+ 11 других файлов) |
| remainingAmount | №0641 (+ 3 других файлов) |
| remainingCharges | №0078 |
| remainingHp | №0779 |
| remainingMinutes | №0078 (+ 2 других файлов) |
| remainingOwnerTurns | №0078 |
| remainingTurns | №0078 (+ 1 других файлов) |
| remnant | №0839 |
| remnants | №0063 (+ 4 других файлов) |
| remote | №0653 |
| remoteRoster | №0810 |
| remove | №0658 (+ 7 других файлов) |
| removeAction | №0078 |
| removeAdvantage | №0871 |
| removeAlchemistSlime | №0655 |
| removeClass | №0849 |
| removeCondition | №0776 (+ 1 других файлов) |
| removeConditions | №0641 |
| removed | №0058 (+ 2 других файлов) |
| removeEventListener | №0887 |
| removeFeat | №0849 |
| removeFloor | №0071 |
| removeImmunity | №0641 |
| removeInventory | №0849 |
| removeItem | №1161 (+ 3 других файлов) |
| removeObject | №0071 |
| removePoisonDisease | №0779 |
| removeRampage | №0686 |
| removeResistance | №0641 |
| removeResistanceTo | №0779 |
| removeSpell | №0849 |
| removeZone | №0071 |
| render | №0081 (+ 10 других файлов) |
| renderAppearance | №0061 |
| renderCharacterCreation | №0670 |
| renderControls | №0641 |
| renderFamily | №0066 |
| renderInventory | №1210 (+ 1 других файлов) |
| renderStatus | №0666 |
| rendingStrike | №0779 |
| repairCost | №1152 |
| repairCount | №0664 |
| repaired | №0664 (+ 3 других файлов) |
| repairGold | №1150 |
| repairItem | №0664 (+ 3 других файлов) |
| repairProfile | №0665 |
| repeat | №0082 |
| repeatCondition | №0818 |
| repeatDamageOnFailedSave | №0641 |
| repeatMissedAttack | №0779 |
| repeatRestriction | №0779 |
| repeatRollingBoulderOnSuccessfulProne | №0779 |
| repeatSave | №0078 (+ 3 других файлов) |
| repeatSaveAtTurnEnd | №0779 |
| repeatSaveEndTurn | №0779 |
| repeatSaveOnDamage | №0779 |
| replaceAfterShortRest | №0779 |
| replaceAnyAfterLongRest | №0779 |
| replaceAnyNon18Metamorphoses | №0779 |
| replaceAttackWithSpirit | №0813 |
| replaceAttackWithTouchCantrip | №0779 |
| replaceConsumed | №0779 |
| replaceDropToZeroWithHP | №0078 |
| replaceExploitOnRest | №0779 |
| replaceLowSpellSlotWithInspiringWord | №0779 |
| replaceMetamorphosis | №0779 |
| replaceMutagen | №0779 (+ 1 других файлов) |
| replaceOnRest | №0077 |
| replacePhysicalSaveWith | №0779 |
| replacesRace | №0643 (+ 10 других файлов) |
| replaceStandardOrExoticAfterLongRest | №0779 |
| replaceWolfWithDireWolf | №0779 |
| report | №0664 (+ 1 других файлов) |
| reposition | №0779 |
| reprisal | №0803 |
| reptile | №0774 |
| reptileIndices | №0061 |
| reptileProfile | №0061 (+ 5 других файлов) |
| reptileSkin | №0061 |
| req | №0641 (+ 1 других файлов) |
| requestedExternal | №0059 |
| requestId | №0811 (+ 7 других файлов) |
| require | №1358 |
| required | №0714 (+ 3 других файлов) |
| requiredAssets | №0071 |
| requiredGold | №0665 |
| requiredLevel | №0670 |
| requiredMaterials | №0665 |
| requiredSpecialization | №0670 |
| requiredTools | №0672 |
| requirements | №0632 (+ 1 других файлов) |
| requires | №0674 (+ 4 других файлов) |
| requiresAdvantage | №0779 |
| requiresArmor | №0779 |
| requiresDisengage | №0779 |
| requiresEqualOrHigherExtraSlot | №0779 |
| requiresGrappled | №0779 |
| requiresNearestAttack | №0641 |
| requiresSight | №0818 (+ 3 других файлов) |
| requiresSoleHexTarget | №0779 |
| requiresTarget | №0779 |
| reroll | №0648 |
| rerollAttack | №0078 |
| rerollDamage12 | №0779 |
| rerollFlickerCost | №0779 |
| rerollGrappleEscape | №0779 |
| rerollHemocraftOncePerTurn | №0779 |
| rerollOne | №0648 (+ 3 других файлов) |
| rerollOneDamageDie | №0779 |
| rerollSave | №0776 (+ 1 других файлов) |
| rerollType | №0779 |
| reservationRetained | №0655 |
| reserved | №0803 (+ 3 других файлов) |
| reservedDie | №0813 |
| reset | №0063 |
| resetDeathSaves | №0655 |
| resetLairRound | №0805 |
| resetNegotiation | №0801 |
| resetRestResources | №0869 |
| resetTurn | №0648 |
| resetTurnResources | №0783 |
| resetView | №0863 |
| resignalSeq | №0810 |
| resilientOrder | №0779 |
| resilientOrderAdvanced | №0779 |
| resin | №0667 (+ 3 других файлов) |
| resist | №0818 |
| resistance | №0078 (+ 10 других файлов) |
| resistanceAll | №0078 (+ 2 других файлов) |
| resistanceAllDamage | №0779 |
| resistanceAllExceptPsychic | №0779 |
| resistanceChosen | №0779 |
| resistances | №0655 (+ 14 других файлов) |
| resistanceType | №0078 (+ 2 других файлов) |
| resistanceWhileBloodied | №0779 |
| resistant | №0818 (+ 1 других файлов) |
| resistantSuppression | №0779 |
| resisted | №0850 |
| resize | №0071 |
| resolution | №0859 (+ 1 других файлов) |
| resolve | №0653 (+ 4 других файлов) |
| resolveAction | №0805 |
| resolveAttack | №0655 (+ 1 других файлов) |
| resolveCharacterRace | №0066 |
| resolveEquipment | №0066 |
| resolveFall | №0071 |
| resolveFeature | №0661 |
| resolveHealingEvent | №0818 |
| resolveMorphWeights | №0068 |
| resolveRace | №0066 |
| resolveReaction | №0648 |
| resolveRollMode | №0827 |
| resolveSkin | №0066 |
| resource | №0783 (+ 1 других файлов) |
| resourceBridge | №0686 |
| resourceInput | №0672 |
| resourceName | №0825 |
| resourceProcessing | №0826 |
| resourceRevision | №0811 |
| resources | №0078 (+ 39 других файлов) |
| RESOURCES | №0673 |
| resourceUnit | №0826 |
| resourceYieldMultiplier | №0672 |
| respawn | №0878 |
| rest | №0641 (+ 11 других файлов) |
| restAndRecover | №0779 |
| restHealing | №0784 (+ 1 других файлов) |
| restNormals | №0061 |
| restock | №0799 (+ 1 других файлов) |
| restore | №0648 (+ 4 других файлов) |
| restoreBloodMaledictOnRiteCrit | №0641 |
| restoreBody | №0816 |
| restored | №0078 (+ 3 других файлов) |
| restoredAt | №0865 |
| restoreExhaustion | №0776 (+ 1 других файлов) |
| restoreExploitPerAlly | №0779 |
| restoreGolem | №1118 |
| restoreHitDice | №0776 (+ 1 других файлов) |
| restoreHp | №0686 |
| restoreHP | №0779 |
| restoreInterruptOnInitiative | №0779 |
| restoreLocalCopy | №0653 |
| restoreMoxie | №0779 |
| restoreMoxieOnSuccessfulCrossCounter | №0779 |
| restoreOneSealLongRest | №0779 |
| restoreOnInitiative | №0779 |
| restorePactSlot | №0641 |
| restoreReagents | №0779 |
| restoreResource | №0776 |
| restoreResources | №0827 |
| restoreSnapshot | №0861 (+ 1 других файлов) |
| restoreSpellLevels | №0809 |
| restoreThrall | №0779 |
| restoreWithReagents | №1118 |
| restPositions | №0061 |
| restrainAt0Hp | №0779 |
| restrained | №0779 (+ 1 других файлов) |
| restrainedUntilEndOfNextTurn | №0779 |
| restrictionUntilOwnEnd | №0818 |
| result | №0648 (+ 40 других файлов) |
| resultCp | №0790 |
| resultEp | №0790 |
| resultGp | №0790 |
| resultPp | №0790 |
| results | №0648 (+ 4 других файлов) |
| resultSp | №0790 |
| resumed | №0818 |
| retain | №0833 |
| retainMentalStats | №0779 |
| retains | №0844 |
| retaliationHealing | №0779 |
| retaliatoryDamage | №0779 |
| retaliatoryNecrotic | №0779 |
| retargetMageMark | №0818 |
| retreat | №0820 |
| retreatFrom | №0818 |
| retries | №0821 |
| retry_after | №1115 (+ 1 других файлов) |
| retryIn | №0878 (+ 1 других файлов) |
| returnAfterHour | №0809 |
| returnAttackBonus | №0811 (+ 1 других файлов) |
| returnDamage | №0779 (+ 3 других файлов) |
| returnDamageType | №0811 |
| returnedAttack | №0648 |
| returnTarget | №0655 (+ 3 других файлов) |
| returnToShell | №0784 |
| reveal | №0079 (+ 3 других файлов) |
| revealed | №0074 (+ 2 других файлов) |
| revealedArcana | №0641 |
| revealedSight | №0818 |
| revealsInvisible | №0078 |
| reverseMappedGlbVertices | №1167 |
| revert | №0779 (+ 1 других файлов) |
| revision | №0653 (+ 3 других файлов) |
| revitalizingOrderExploit | №0779 |
| reviveAtDawn | №0779 |
| reviveAtZero | №0776 |
| revived | №0078 |
| revivedFromZero | №0655 |
| reviveHp | №0779 |
| reviveNearHeartAfterHours | №0779 |
| reviveRecentDead | №0809 |
| reviveRite | №0641 |
| reviveTo1 | №0779 |
| revokeObjectURL | №1259 |
| revolution | №0803 |
| rewards | №0670 (+ 2 других файлов) |
| rider | №0869 |
| RIDGE_STYLES | №0066 |
| ridgeColor | №0066 (+ 1 других файлов) |
| ridgeStyle | №0063 |
| right | №1165 |
| ringingStrike | №0779 |
| riposte | №0779 |
| riseFt | №0818 |
| risk | №0080 |
| rite | №0779 (+ 2 других файлов) |
| riteFocus | №0641 |
| riteOfTheDawn | №0641 |
| riteRevival | №0641 |
| rites | №0707 (+ 8 других файлов) |
| riteSwapAtLevel | №0779 |
| riteType | №0641 (+ 7 других файлов) |
| ritual | №0761 (+ 3 других файлов) |
| ritualCasting | №0707 (+ 1 других файлов) |
| ritualComponentReplaced | №0813 |
| ritualDuringShortRest | №0779 |
| ritualizeKnownSpellsUpTo | №0813 |
| ritualMastery | №0779 |
| ritualMaterialSubstitution | №0779 |
| ritualMinutes | №0779 (+ 1 других файлов) |
| ritualSpellLevelMax | №0813 |
| ritualTurnsBySpellLevel | №0813 |
| rmsDisplacementMeters | №1162 |
| roar | №0641 (+ 1 других файлов) |
| roguishCharm | №0779 |
| role | №0059 (+ 32 других файлов) |
| roles | №0628 (+ 18 других файлов) |
| roll | №0074 (+ 25 других файлов) |
| rollback | №0856 (+ 1 других файлов) |
| rollD20 | №0827 (+ 20 других файлов) |
| rollDice | №0655 (+ 4 других файлов) |
| rolled | №0838 |
| rolledDistanceFt | №0818 |
| rollingAvalanche | №0779 |
| rollingBoulder | №0779 |
| rollPockets | №0807 (+ 1 других файлов) |
| rollResolved | №0835 |
| rollResult | №0872 |
| rolls | №0628 (+ 24 других файлов) |
| rollTwiceChoose | №0779 |
| roomId | №0810 (+ 5 других файлов) |
| rope | №0670 (+ 1 других файлов) |
| roster | №1149 (+ 2 других файлов) |
| rotation | №0076 |
| rotFist | №0779 |
| roughness | №0061 (+ 3 других файлов) |
| round | №0063 (+ 51 других файлов) |
| roundEarSize | №0066 (+ 1 других файлов) |
| roundOwnerId | №0818 |
| roundsRemaining | №0779 (+ 1 других файлов) |
| roundStart | №0818 |
| route | №0820 |
| rows | №0078 (+ 21 других файлов) |
| RTCPeerConnection | №1287 |
| ru | №0745 (+ 1 других файлов) |
| rug | №0067 |
| ruined | №0664 (+ 1 других файлов) |
| ruins | №0799 |
| ruins_courtyard | №0878 |
| ruins_vault | №0878 |
| ruins_workshop | №0878 |
| rules | №0821 (+ 2 других файлов) |
| run | №0856 (+ 1 других файлов) |
| rune | №0779 (+ 2 других файлов) |
| runeDoesNotCountAgainstAttunement | №0779 |
| runeInert | №0779 |
| runesKnown | №0648 (+ 1 других файлов) |
| runesPerObject | №0779 |
| runesPersistAfterDeath | №0779 |
| runicCharges | №0828 |
| runicLore | №0828 |
| runSceneTest | №0842 |
| runScripts | №1172 |
| runtime | №0707 (+ 4 других файлов) |
| runtimeCraft | №0779 |
| runtimeId | №0813 |
| runtimeKey | №0770 |
| runtimeStatus | №0707 (+ 1 других файлов) |
| runtimeVersion | №0677 |
| ruthlessCommand | №0779 |
| ruthlessFocus | №0779 |
| rx | №0061 (+ 4 других файлов) |
| ry | №0061 |
| rz | №0061 (+ 1 других файлов) |
| s | №0070 (+ 3 других файлов) |
| sacredWeapon | №0648 |
| sacrifice | №0803 (+ 1 других файлов) |
| sacrificeFoe | №0803 |
| saddler | №0670 |
| safeAlliesMax | №0779 |
| sagacity | №0641 |
| Sagacity | №0779 |
| salt | №0671 (+ 3 других файлов) |
| saltOfEarth | №0779 |
| salvage | №0825 (+ 1 других файлов) |
| sample | №1221 (+ 3 других файлов) |
| sampledBestMaxDistance | №1171 |
| sampledBestMeanDistance | №1171 |
| sampledGoodPct | №1171 |
| sampleSampler | №0068 |
| sand | №0672 |
| sandbox | №0886 |
| sandVortex | №0809 |
| sanguine | №0779 |
| sanguineEmboldenAllies | №0779 |
| sanguineMastery | №0641 |
| sanguineVitalize | №0779 |
| satyr | №1340 |
| savage_attacker | №0782 |
| savageDice | №0779 |
| save | №0060 (+ 26 других файлов) |
| save1 | №0809 |
| save1or2 | №0809 |
| saveAbility | №0677 |
| saveBonus | №0641 (+ 1 других файлов) |
| saveBonuses | №1117 (+ 6 других файлов) |
| saveBottom | №1319 |
| saveCustom | №0857 |
| saved | №0784 (+ 2 других файлов) |
| savedAt | №0860 (+ 2 других файлов) |
| saveDc | №0811 |
| saveDC | №0078 (+ 6 других файлов) |
| savedChannel | №1299 |
| savedDrawCalls | №0063 |
| saveDisadvantage | №0779 (+ 1 других файлов) |
| saveDisadvantageForPugilistFeatures | №0779 |
| savedUrl | №1299 |
| saveEpoch | №0865 |
| saveId | №0865 |
| saveModifiers | №0641 (+ 8 других файлов) |
| saveOnHit | №0078 |
| savePenalty | №0078 |
| saveResult | №0078 (+ 7 других файлов) |
| saveRevision | №0865 |
| saveRoll | №0811 |
| saves | №0779 (+ 1 других файлов) |
| savesData | №0624 (+ 1 других файлов) |
| saveSheet | №0658 |
| saveSucceeds | №0779 |
| saveSuccess | №0078 |
| saveType | №0655 (+ 7 других файлов) |
| savingThrow | №0655 (+ 20 других файлов) |
| savingThrowBonusDice | №0779 |
| savingThrowProficiencies | №1198 |
| savingThrows | №0077 (+ 32 других файлов) |
| SCALAR | №0068 (+ 4 других файлов) |
| scale | №0061 (+ 20 других файлов) |
| scalePlateV49 | №0667 |
| scalesPerLevel | №0779 |
| scaleWithOwner | №0658 (+ 1 других файлов) |
| scan | №0830 |
| scarf | №0062 |
| scenarios | №0856 (+ 1 других файлов) |
| scene | №1123 (+ 2 других файлов) |
| sceneFrom | №0818 |
| sceneOwnerId | №0818 (+ 1 других файлов) |
| scenes | №1123 (+ 2 других файлов) |
| schema | №1306 |
| schema_version | №1149 |
| SCHEMA_VERSION | №0642 (+ 2 других файлов) |
| schemaVersion | №0066 (+ 7 других файлов) |
| scheme | №0886 |
| scholarlyPursuits | №0829 |
| school | №0760 (+ 10 других файлов) |
| schoolOfHardKnocks | №0779 |
| scope | №0779 (+ 1 других файлов) |
| scopeId | №0653 |
| scopes | №0653 |
| score | №0664 (+ 1 других файлов) |
| scourgeAttunement | №0779 |
| scourgePresence | №0779 |
| scourgeSense | №0779 |
| scourgeSpeech | №0779 |
| scourgeVisage | №0779 |
| scribe | №0668 (+ 4 других файлов) |
| scrolls | №0670 (+ 2 других файлов) |
| seafarer | №0779 |
| seal | №0779 |
| sealDamage | №0698 (+ 1 других файлов) |
| sealDamageIgnoresResistance | №0779 |
| sealDiceDoubled | №0779 |
| sealedSpiritFeatureLevels | №0844 |
| seals | №0698 |
| sealSystem | №0698 |
| sealWax | №0672 |
| seamMaxMeters | №1162 |
| seaMobility | №0776 |
| search | №0660 |
| searchAsBonus | №0776 |
| second | №0827 |
| second_chance | №0782 |
| secondaryAbility | №0686 |
| secondaryStat | №0677 (+ 3 других файлов) |
| secondaryStatChoice | №0698 (+ 2 других файлов) |
| secondaryStats | №0726 (+ 5 других файлов) |
| seconds | №0818 (+ 4 других файлов) |
| secondTarget | №0779 |
| secondWind | №0648 |
| secret | №0074 |
| secure | №0886 |
| seeIllusions | №0818 |
| seeing | №0779 |
| seeInvisible | №0818 (+ 1 других файлов) |
| seek | №0847 |
| seeking | №0078 |
| seekingBomb | №0779 |
| select | №0857 |
| selected | №0077 (+ 4 других файлов) |
| selectedFile | №0853 |
| selectedRites | №0813 |
| selectedTexture | №0071 |
| selectedTokenId | №0626 |
| selectedTool | №0071 |
| selectedWallTexture | №0071 |
| selection | №0077 |
| self | №1844 |
| selfAdvantage | №0827 |
| selfDamage | №0648 (+ 4 других файлов) |
| selfDamageType | №0779 |
| selfDisadvantage | №0827 |
| selfFireDamageUpToLevel | №0779 |
| selfHeal | №0779 |
| selfNecrotic | №0779 |
| selfRadiantDamage | №0779 |
| selfSuture | №0809 |
| selfUsesHitDie | №0779 |
| sell | №0799 (+ 2 других файлов) |
| sellable | №0802 |
| sellFactor | №0799 (+ 1 других файлов) |
| sendActionResult | №1202 (+ 5 других файлов) |
| sendMessage | №1256 |
| sendReactionRequest | №1202 (+ 2 других файлов) |
| senseBloodCreatures | №0779 |
| senses | №0658 (+ 4 других файлов) |
| sentinel | №0782 |
| sentinelSoul | №0735 (+ 1 других файлов) |
| sentinelSoulChoices | №0735 |
| sentinelStand | №0735 (+ 1 других файлов) |
| sentinelStandChoices | №0735 |
| sentinelStrike | №0735 (+ 1 других файлов) |
| sentinelStrikeChoices | №0735 |
| seq | №1264 (+ 6 других файлов) |
| serial | №0641 |
| serialize | №0066 |
| session | №0862 (+ 2 других файлов) |
| sessionId | №0862 (+ 1 других файлов) |
| sessions | №1230 (+ 1 других файлов) |
| setArmor | №0063 |
| setAttribute | №1210 (+ 1 других файлов) |
| setAxis | №0063 |
| setBackground | №0849 |
| setBodyHair | №0063 |
| setCeiling | №0818 |
| setClassLevel | №0849 |
| setClothing | №0063 |
| setClothingCustomization | №0063 |
| setElevation | №0818 |
| setEnabled | №0661 (+ 1 других файлов) |
| setExternalAnatomy | №0063 |
| setGender | №0063 (+ 1 других файлов) |
| setHead | №0063 |
| setHosieryDen | №0063 |
| setHp | №0779 |
| setHP | №0779 |
| setIcon | №0887 |
| setItem | №1119 (+ 19 других файлов) |
| setMainMenuAvailability | №0842 |
| setMessageHandler | №1256 |
| setOriginRace | №0066 |
| setPose | №0063 |
| setProfession | №0849 |
| setProgress | №0843 |
| setProgressHandler | №0842 |
| setRace | №0063 (+ 2 других файлов) |
| setRegion | №0799 |
| setResource | №0827 |
| setSkin | №0063 |
| setStance | №0779 |
| setStatus | №0843 |
| setStrength | №0078 |
| setSwarmMoving | №0063 |
| setSymbiosis | №0816 |
| setTile | №0071 |
| setTimeout | №0663 (+ 15 других файлов) |
| settlementIntel | №0779 |
| settlementOnly | №0779 |
| setTotalLevel | №0849 |
| setView | №1259 |
| setWeapon | №0063 |
| sewer | №0063 |
| sha | №1306 |
| sha256 | №0842 (+ 4 других файлов) |
| shadow_dancer | №0782 |
| shadow_touched | №0782 |
| shadowColor | №0066 (+ 1 других файлов) |
| shadowEssence | №0826 |
| shadowForm | №0809 |
| shadowmaster | №0779 |
| shadowMasterOfDisguise | №0779 |
| shadowNoEscape | №0779 |
| shadowOpacity | №1320 |
| shadowStep | №0648 |
| shag | №0061 (+ 1 других файлов) |
| shakeItOff | №0716 (+ 1 других файлов) |
| Shaman | №0707 |
| shape | №0061 (+ 8 других файлов) |
| shapechange | №0779 |
| shapeChangeSave | №0779 |
| shapeFemale | №1133 |
| shapeHead | №0061 |
| shapeMale | №1133 (+ 1 других файлов) |
| shaper | №0714 (+ 1 других файлов) |
| Shaper | №0795 |
| shapes | №0059 (+ 1 других файлов) |
| sharedAdvantage | №0779 |
| shareDamage | №0818 |
| shareDanceBonus | №0809 |
| sharedBonusAction | №0779 (+ 1 других файлов) |
| sharedHp | №0779 |
| sharedImmortality | №0779 |
| sharedInitiative | №0839 |
| sharedProperties | №0079 (+ 1 других файлов) |
| sharedReaction | №0776 (+ 2 других файлов) |
| sharedStealth | №0686 |
| shareSaves | №0813 |
| shareSensesHours | №0779 |
| sharpMind | №0829 |
| sharpshooter | №0782 |
| shaved | №0059 (+ 1 других файлов) |
| shelf | №0067 |
| shell | №0784 |
| shellColor | №0066 (+ 1 других файлов) |
| shellDestroyed | №0784 |
| shellHealing | №0784 |
| shellHP | №0784 |
| shellMaxHP | №0784 |
| shellName | №0784 |
| shells | №1328 |
| shellSize | №0066 (+ 1 других файлов) |
| shield_master | №0782 |
| shieldACBonus | №0779 |
| shieldAllowed | №0779 |
| shieldAttackBonus | №0779 |
| shieldDamage | №0779 |
| shielded | №0641 (+ 1 других файлов) |
| Shielded | №0779 |
| shieldFrame | №0667 (+ 1 других файлов) |
| shieldImpact | №0779 |
| shieldmaker | №0670 |
| shieldMartial | №0779 |
| shieldSlam | №0779 (+ 1 других файлов) |
| shieldWarrior | №0779 |
| shift | №0801 |
| shifter | №0672 (+ 1 других файлов) |
| shifterNaturalWeapon | №0833 |
| shinL | №0059 |
| shinR | №0059 |
| shipchandler | №0801 (+ 1 других файлов) |
| shippedSha256 | №1162 |
| shirt | №0062 |
| shirt_long | №1128 (+ 1 других файлов) |
| shockingStrike | №0779 |
| shockingStrikeDamage | №0779 |
| short | №0061 (+ 1 других файлов) |
| shortRest | №0078 (+ 1 других файлов) |
| shortRestHealing | №0839 |
| shortRestHealingAllowed | №0869 |
| shortRestSlots | №0779 |
| shoulders | №0063 (+ 6 других файлов) |
| shouldSuppressRestHP | №0784 (+ 1 других файлов) |
| shove | №0776 |
| shredding | №0779 |
| shreddingFree | №0779 |
| shuffle | №0082 |
| side | №0061 (+ 2 других файлов) |
| side_part | №0061 (+ 1 других файлов) |
| sideEffect | №0779 |
| sideEffects | №0080 |
| sides | №0655 (+ 8 других файлов) |
| siege | №0670 (+ 2 других файлов) |
| siegeInteraction | №0631 |
| sightBlocked | №0074 |
| sigilEligible | №0632 |
| sigilicGrace | №0779 |
| signal | №0653 (+ 2 других файлов) |
| signature | №0793 (+ 1 других файлов) |
| signatureSpells | №0648 |
| signup | №0653 |
| silent | №0818 |
| silentCheck | №0842 |
| silentStalker | №0779 |
| silk | №0062 |
| silkwormSilk | №0673 |
| silver | №0668 (+ 2 других файлов) |
| silvered | №0655 (+ 1 других файлов) |
| site | №0795 |
| sixthMetamorphosis | №0779 |
| size | №0061 (+ 45 других файлов) |
| size_mb | №1160 |
| sizeBytes | №1164 |
| sizeCategory | №0066 (+ 1 других файлов) |
| sizeChange | №0078 |
| sizeFt | №0078 (+ 1 других файлов) |
| sizeIncrease | №0776 (+ 1 других файлов) |
| skeleton | №0066 (+ 2 других файлов) |
| skill | №0628 (+ 13 других файлов) |
| skillAdvantage | №0641 |
| skillBonus | №0776 (+ 3 других файлов) |
| skillChoices | №0784 (+ 3 других файлов) |
| skilled | №0663 (+ 1 других файлов) |
| skilledRider | №0779 |
| skillId | №0772 (+ 3 других файлов) |
| skillModifiers | №0641 |
| skillProficiency | №0779 |
| skillProficient | №0655 (+ 1 других файлов) |
| skills | №0624 (+ 26 других файлов) |
| skillsChoose | №0078 (+ 1 других файлов) |
| skillsData | №0624 (+ 2 других файлов) |
| skiltKrigga | №0779 |
| skin | №0058 (+ 8 других файлов) |
| skin_names | №1160 |
| skinCompatible | №0066 |
| skinDetail | №0066 (+ 6 других файлов) |
| skinFamily | №0066 |
| skinGlow | №0066 (+ 2 других файлов) |
| skinId | №0066 (+ 1 других файлов) |
| skinMaterial | №0066 |
| skinned_primitives | №1160 |
| skinPositions | №0058 |
| skins | №0068 (+ 4 других файлов) |
| skinSurface | №0063 (+ 5 других файлов) |
| skipDefeated | №0783 |
| skirt | №0062 |
| skirtProfile | №0062 |
| slamDamage | №0779 |
| slamMagical | №0779 |
| slash | №0074 (+ 1 других файлов) |
| slashing | №0871 |
| slashTexture | №0076 |
| slaymateRitual | №0809 |
| sleep | №0779 (+ 1 других файлов) |
| Sleep | №0080 |
| sleepImmune | №0818 |
| sleepUntilStartNextTurnOrDamage | №0779 |
| sleepwalker | №0779 |
| sleeves | №0062 (+ 2 других файлов) |
| sleightBonus | №0779 |
| sleightingImprecation | №0779 |
| sleightOfHand | №0772 (+ 1 других файлов) |
| slick_back | №0061 (+ 1 других файлов) |
| slime | №0063 |
| slimeCovered | №0078 |
| slimeFiber | №0826 |
| slimeReagent | №0826 |
| slipperyMind | №0648 |
| slipTurns | №0821 (+ 1 других файлов) |
| slit | №1128 (+ 2 других файлов) |
| slitHeight | №1128 (+ 1 других файлов) |
| slot | №0062 (+ 9 других файлов) |
| slotKind | №0648 |
| slotLevel | №0641 (+ 12 других файлов) |
| slotLevels | №1269 |
| slots | №0062 (+ 8 других файлов) |
| slotsByLevel | №0809 |
| slotSpent | №0813 |
| slotsRefresh | №0844 |
| slotsUsed | №0786 |
| slowFall | №0648 |
| slowFt | №0641 |
| small | №0067 (+ 2 других файлов) |
| smith | №0668 (+ 7 других файлов) |
| smoke | №0078 |
| smokeBomb | №0779 |
| smokeCloud | №0078 |
| snake | №0819 |
| snapshot | №0653 (+ 10 других файлов) |
| snapshots | №0078 |
| sneakApplied | №0655 (+ 1 других файлов) |
| sneakAttack | №0648 |
| sneakAttackDice | №0786 (+ 1 других файлов) |
| sneakEligible | №1269 |
| sneakStyle | №0854 |
| snout | №0061 |
| social | №0628 (+ 12 других файлов) |
| socialAdvantage | №0776 |
| socialBonus | №0809 |
| socket | №0061 |
| socks | №0062 (+ 3 других файлов) |
| solidified | №0779 |
| soloShieldAC | №0779 |
| solvent | №0078 |
| somatic | №0760 (+ 10 других файлов) |
| somaticMaterialFree | №0779 |
| somnolence | №0779 |
| songOfRest | №0648 |
| songsOfWarPeace | №0779 |
| soothingSpeech | №0779 |
| sorcerer | №0798 (+ 1 других файлов) |
| sorcerousOriginMastery | №0648 |
| sorcerousRestoration | №0648 |
| sorceryPoints | №0648 (+ 2 других файлов) |
| sort | №0793 |
| soulEater | №0641 (+ 1 других файлов) |
| soulOfArtifice | №0648 |
| soulSight | №0813 |
| soulToyConversion | №0809 |
| source | №0058 (+ 113 других файлов) |
| SOURCE | №0666 |
| SOURCE_TAG | №0670 |
| sourceCommit | №1849 |
| sourceDead | №0869 |
| sourceDisplacementMax | №1168 |
| sourceDisplacementMean | №1168 |
| sourceFor | №0081 |
| sourceGlb | №1157 |
| sourceGlbSha256 | №1357 |
| sourceHashes | №1357 |
| sourceId | №0077 (+ 30 других файлов) |
| sourceIndices | №0061 |
| sourceKey | №0795 |
| sourceLabel | №0628 (+ 10 других файлов) |
| sourceMaxDisplacement | №1167 |
| sourceMeanDisplacement | №1167 |
| sourceMeshes | №0063 |
| sourceName | №0700 (+ 3 других файлов) |
| sourceNonZeroEntries | №1167 |
| sourcePack | №0628 (+ 11 других файлов) |
| sourcePacks | №0630 (+ 2 других файлов) |
| sourceProject | №1357 |
| sourceQuantity | №0664 |
| sourceRule | №0081 |
| sources | №0081 (+ 13 других файлов) |
| sourceSha256 | №1162 (+ 1 других файлов) |
| sourceStackTerms | №1357 |
| sourceTarget | №1157 |
| sourceType | №0078 (+ 15 других файлов) |
| sourceVersion | №0726 (+ 3 других файлов) |
| sovereignOfFate | №0779 |
| sp | №0790 (+ 5 других файлов) |
| space | №0839 |
| span | №0061 |
| sparse | №1158 |
| spatialManipulation | №0779 |
| speakWithBeastsAndPlants | №0779 |
| special | №0668 |
| specialization | №0670 (+ 2 других файлов) |
| specializationBonus | №0670 |
| specializationList | №0670 |
| specializations | №0670 |
| specialReactionPerOtherCreatureTurn | №0779 |
| specialSightFt | №0818 |
| specialtyTags | №0667 |
| species | №0061 (+ 4 других файлов) |
| spectral | №0061 |
| spectralFiber | №0667 (+ 1 других файлов) |
| spectralIndices | №0061 |
| spectralMounts | №0809 |
| spectralParts | №0061 |
| spectralReagent | №0826 |
| spectralThreadV49 | №0667 |
| speed | №0624 (+ 38 других файлов) |
| Speed | №0080 |
| speedBonus | №0779 |
| speedBonusFt | №0641 (+ 1 других файлов) |
| speedDouble | №0779 |
| speedFt | №0811 |
| speedHalf | №0779 |
| speedMultiplier | №0809 (+ 1 других файлов) |
| speedPenalty | №0641 |
| speedPenaltyFt | №0641 (+ 1 других файлов) |
| speedReductionFt | №0686 |
| speedZeroSave | №0779 |
| spell | №0648 (+ 6 других файлов) |
| spellAttack | №0779 (+ 3 других файлов) |
| spellAttackBonus | №0779 (+ 2 других файлов) |
| spellAttackUsesWisdom | №0779 |
| spellblade | №0779 (+ 1 других файлов) |
| Spellblade | №0795 |
| spellbladeSource | №0795 |
| spellCaster | №0811 (+ 1 других файлов) |
| spellcasting | №0707 (+ 10 других файлов) |
| spellcastingAbility | №0078 |
| spellcastingFocus | №0779 |
| spellDamageModifiers | №0648 (+ 2 других файлов) |
| spellDamageVulnerability | №0779 |
| spellHealingOrDamage | №0813 |
| spellId | №0655 (+ 9 других файлов) |
| spellLevel | №0648 (+ 10 других файлов) |
| spellLevelCap | №0813 |
| spellLevelMax | №0779 |
| spellLevels | №0813 |
| spellList | №0803 |
| spellLists | №0714 |
| spellMastery | №0648 |
| spellName | №0655 (+ 18 других файлов) |
| spells | №0786 (+ 11 других файлов) |
| spellSaveDC | №0779 (+ 2 других файлов) |
| spellsData | №0624 (+ 4 других файлов) |
| spellsDoNotCountAgainstKnown | №0779 |
| Spellshot | №0795 |
| spellsKnown | №0707 (+ 2 других файлов) |
| spellSlotKind | №0648 |
| spellSlotLevel | №0648 |
| spellSlots | №0648 (+ 2 других файлов) |
| spellSlotsData | №0624 (+ 14 других файлов) |
| spellSlotSubstitute | №0809 |
| spellSlotTable | №0827 (+ 1 других файлов) |
| spellSources | №0827 |
| spellStat | №0624 (+ 1 других файлов) |
| spellStats | №0827 |
| spellStoringItem | №0648 |
| spellstrike | №0779 |
| spellTable | №0641 |
| spellUses | №0803 |
| spellUsesByLevel | №0803 |
| Spellweaver | №0795 |
| spend | №0783 |
| spendAction | №0783 |
| spendCharges | №0779 |
| spendCoin | №0818 |
| spendDynamo | №0078 |
| spendExtendedResource | №0648 |
| spendMovement | №0783 |
| spendMovementReward | №0821 |
| spendReaction | №0818 |
| spendResource | №0827 |
| spendSpellSlot | №0779 |
| spent | №0686 (+ 4 других файлов) |
| spices | №0673 |
| spider | №0686 |
| spiderSilk | №0667 (+ 1 других файлов) |
| spines | №0066 |
| spiral | №0066 |
| spirit | №0844 (+ 1 других файлов) |
| spiritAttacks | №0784 |
| spiritCommunication | №0813 |
| spiritDamage | №0813 |
| spiritDamageBonus | №0813 |
| spiritForm | №0784 |
| spiritHP | №0784 |
| spiritMantle | №0844 |
| spiritMaxHP | №0784 |
| spiritRangeFt | №0813 |
| spiritTypes | №0707 |
| spiritualDefense | №0844 |
| splashDice | №0078 |
| split | №0779 |
| splitAmongTargets | №0779 |
| splitDamage | №0779 |
| sporeling | №0686 |
| spread | №0058 |
| springSteel | №0673 |
| spurredArmy | №0779 |
| square | №0063 (+ 1 других файлов) |
| squaredCircle | №0716 |
| src | №0082 (+ 4 других файлов) |
| stability | №0080 (+ 1 других файлов) |
| Stability | №0080 |
| stable | №0801 (+ 2 других файлов) |
| stack | №0067 (+ 1 других файлов) |
| stacks | №0686 |
| stage | №0784 (+ 3 других файлов) |
| stage10 | №0078 |
| staged | №0842 |
| stair | №0067 |
| stairFrom | №0076 |
| stairHeight | №1200 |
| stairs | №0067 |
| stairTo | №0076 |
| stale | №0865 |
| stalkersProwess | №0641 |
| stalwartDefender | №0779 |
| stalwartSpirit | №0871 |
| stance | №0779 (+ 2 других файлов) |
| stanceRadiusFt | №0779 |
| stand | №0067 |
| standard | №0665 (+ 2 других файлов) |
| standingJump | №0779 |
| standTheFallen | №0779 |
| standUp | №0779 |
| start | №0714 |
| startActorTurn | №0641 |
| startedAt | №0862 |
| startedAtTurn | №0078 |
| startedTurn | №0818 |
| startElevation | №0818 |
| startingEquipment | №0078 (+ 3 других файлов) |
| startLevel | №0833 |
| startlingJinx | №0779 |
| startTurn | №0077 (+ 13 других файлов) |
| startTurnDamage | №0779 |
| startTurnHeal | №0779 |
| startTurnHealing | №0779 |
| startTurnNecrotic | №0779 |
| startX | №0818 (+ 1 других файлов) |
| startY | №0818 (+ 1 других файлов) |
| stat | №0077 (+ 21 других файлов) |
| STAT_ALIASES | №0827 |
| STAT_META | №0869 |
| statblock | №0078 |
| statBlock | №0833 (+ 1 других файлов) |
| statBonus | №0746 (+ 4 других файлов) |
| state | №0655 (+ 19 других файлов) |
| stateRevision | №0810 (+ 6 других файлов) |
| states | №0839 |
| stats | №0624 (+ 50 других файлов) |
| status | №0832 (+ 58 других файлов) |
| STATUS | №0078 |
| stdio | №1116 (+ 2 других файлов) |
| steadfastOrder | №0779 |
| steadfastToughness | №0871 |
| stealth | №0772 (+ 1 других файлов) |
| stealthAdvantage | №0779 |
| stealthBonus | №0779 |
| stealthDisadvantage | №0084 |
| steed | №0657 |
| steel | №0668 (+ 3 других файлов) |
| steelBillet | №0673 |
| steelWire | №0673 |
| steelWireV38 | №1150 |
| stencil | №0073 |
| step | №0075 (+ 1 других файлов) |
| stepWind | №0648 |
| stickAndMove | №0779 |
| stillnessOfMind | №0648 |
| stock | №0799 (+ 2 других файлов) |
| stockCount | №0800 |
| stocky | №0066 |
| stolen | №0818 |
| stolenSpark | №0779 |
| stone | №0067 (+ 4 других файлов) |
| Stoneblood | №0795 |
| stonecutter | №0801 (+ 1 других файлов) |
| stoneDust | №0672 |
| stoneForm | №0779 |
| stoneFormToggle | №0779 |
| stoneReductionAppliesToMagic | №0779 |
| stoneToFlesh | №0779 |
| stool | №0067 |
| stop | №0847 |
| stopIntruder | №0776 |
| stopOnDefeat | №0783 (+ 4 других файлов) |
| stopped | №0818 (+ 1 других файлов) |
| storage | №0813 (+ 2 других файлов) |
| STORAGE_KEY | №0666 |
| stored | №0809 |
| storedHealingMax | №0779 |
| storm | №0641 |
| str | №0624 (+ 61 других файлов) |
| straight | №0066 |
| straightLine | №0779 |
| strands | №1311 |
| strangeMetabolism | №0641 |
| strategicAdjustments | №0779 |
| strategist | №0739 (+ 1 других файлов) |
| strBonus | №0641 |
| strChecksDisadvantage | №0641 (+ 1 других файлов) |
| strDexChecksDisadvantage | №0641 (+ 1 других файлов) |
| strDexSaveAdvantage | №0779 |
| stream | №0886 |
| streetSmart | №0716 |
| streetwise | №0779 |
| strength | №0786 (+ 11 других файлов) |
| Strength | №0080 |
| strengthAdvantage | №0818 |
| strengthFloor | №0818 |
| strengthInNumbers | №0779 |
| strengthMaxBonus | №0779 |
| strengthOrDexterity | №0698 (+ 3 других файлов) |
| strenuous | №0081 (+ 1 других файлов) |
| stressPressure | №0629 |
| strikeDice | №0779 |
| strIncrease | №0779 |
| strMaxBonus | №0641 |
| strMaxIncrease | №0779 |
| strokeOfLuck | №0648 |
| strongbow | №0779 |
| strOrDexSave | №0779 |
| strSave | №0779 |
| strSavesDisadvantage | №0641 (+ 1 других файлов) |
| stubble | №0061 (+ 1 других файлов) |
| student | №0776 |
| stun | №0776 |
| stunIfFailedBy5 | №0641 |
| stunned | №0779 (+ 2 других файлов) |
| stunnedUntilEndOfNextTurn | №0779 |
| stunning | №0779 |
| stunningStrike | №0648 (+ 1 других файлов) |
| stunOnFail | №0779 |
| stunOnFailBy5 | №0779 |
| style | №0779 (+ 32 других файлов) |
| styles | №0813 |
| sub | №1111 |
| subclass | №0786 (+ 20 других файлов) |
| SUBCLASS_FEATURES | №0648 |
| subclassBonds | №0686 |
| subclassDeepMagic | №0698 |
| subclasses | №0077 (+ 24 других файлов) |
| subclassFeature | №0776 |
| subclassFeatureCatalog | №0716 |
| subclassFeatureIdResolution | №0677 |
| subclassFeatureLevels | №0077 (+ 20 других файлов) |
| subclassId | №0661 (+ 2 других файлов) |
| subclassLevel | №0077 (+ 41 других файлов) |
| subclassSystem | №0677 (+ 4 других файлов) |
| subclassUse | №0779 |
| subjugateThrall | №0779 |
| subtle | №0648 (+ 1 других файлов) |
| subtractD8 | №0779 |
| subtractHemocraftDie | №0641 |
| subtree | №0792 (+ 3 других файлов) |
| success | №0078 (+ 24 других файлов) |
| successes | №0655 (+ 14 других файлов) |
| successorClientId | №1287 |
| successTempHp | №0779 |
| suit | №0821 |
| suite | №0854 |
| summary | №0628 (+ 12 других файлов) |
| summon | №0776 (+ 3 других файлов) |
| summonDevilJurist | №0779 |
| summonedId | №0818 |
| summonFamiliar | №0779 |
| summonFiendAt0HP | №0779 |
| summonOoze | №0078 |
| summonSpellId | №0830 |
| sunAura | №0818 |
| sunlightAttackAndPerceptionDisadvantage | №0779 |
| sunlightAttackAndSightDisadvantage | №0641 |
| sunlightHazard | №0809 |
| Sunwatcher | №0795 |
| superior | №0665 |
| superiorInspiration | №0648 |
| superiorInterdict | №0698 |
| superiorInterdictRestore | №0698 |
| superiorityDice | №0648 |
| supernal | №0779 (+ 1 других файлов) |
| supported | №0058 (+ 1 других файлов) |
| supportFetchAPI | №0886 |
| supportRangeFt | №0779 |
| suppressAilments | №0779 |
| suppressResistanceAndImmunity | №0779 |
| surface | №0066 |
| surfaceMaxDistance | №1166 (+ 1 других файлов) |
| surfaceMeanDistance | №1157 (+ 3 других файлов) |
| surfaceMedianDistance | №1157 (+ 3 других файлов) |
| surfaceP95Distance | №1157 (+ 3 других файлов) |
| surpriseAttack | №0779 |
| surveySettlement | №0779 |
| surveyWilderness | №0779 |
| survival | №0772 (+ 2 других файлов) |
| survive | №0735 |
| survivor | №0648 |
| suspended | №0655 (+ 1 других файлов) |
| sutureCost | №0809 |
| sutureOptions | №0809 |
| swamp | №0063 (+ 2 других файлов) |
| swapCard | №0821 |
| swappedTurns | №0821 (+ 2 других файлов) |
| swapWithThrallRangeFt | №0809 |
| swarm | №0061 (+ 2 других файлов) |
| swarm_bats | №1323 |
| swarm_beetles | №1323 |
| swarm_rats | №1323 |
| swarmCore | №0061 |
| swarmFloor | №0061 |
| swarmForm | №0063 (+ 3 других файлов) |
| swarmParts | №0061 |
| swarmPercent | №0063 (+ 3 других файлов) |
| swarmUnit | №0061 |
| swarmVortex | №0061 |
| sweep | №0061 (+ 1 других файлов) |
| sweepAttack | №0779 |
| sweepingStrike | №0779 |
| sweetDreams | №0779 |
| sweetScience | №0716 |
| swept | №0066 |
| swift | №0779 |
| Swiftblade | №0795 |
| swiftJinx | №0779 |
| swimFt | №0641 |
| swimSpeed | №0779 |
| swimSpeedEqualsWalking | №0779 |
| swine | №0774 |
| switchAlly | №0779 |
| swords | №0818 (+ 1 других файлов) |
| symbiosis | №0816 |
| sync | №0078 (+ 19 других файлов) |
| syncClassResources | №0648 |
| syncFromInitiative | №1230 |
| syncState | №0077 |
| syncTarotEntity | №0818 |
| synergy | №0079 (+ 1 других файлов) |
| t | №0058 (+ 1 других файлов) |
| tab | №0849 (+ 3 других файлов) |
| table | №0067 (+ 18 других файлов) |
| tacticalExploit | №0739 |
| tacticalReposition | №0779 |
| tacticalSkill | №0739 |
| tacticalSuperiority | №0739 |
| tactician | №0782 (+ 1 других файлов) |
| Tactician | №0795 |
| tag | №0061 (+ 1 других файлов) |
| tagName | №1266 |
| tags | №0061 (+ 28 других файлов) |
| tail | №0061 |
| tailColor | №0066 (+ 3 других файлов) |
| tailCurve | №0066 (+ 1 других файлов) |
| tailLength | №0066 (+ 5 других файлов) |
| tailoring | №0062 |
| tailThickness | №0066 (+ 3 других файлов) |
| tailTip | №0063 (+ 1 других файлов) |
| tailTuftSize | №0066 (+ 1 других файлов) |
| takeAttack | №0835 |
| talent | №0779 |
| talentProgression | №0714 |
| talents | №0714 (+ 1 других файлов) |
| tannin | №0673 |
| target | №0061 (+ 46 других файлов) |
| targetAc | №0811 (+ 3 других файлов) |
| targetCount | №0779 |
| targetDefeated | №0655 (+ 3 других файлов) |
| targetedAllyAdvantage | №0779 |
| targetEntries | №1167 (+ 1 других файлов) |
| targetExtraRadiant | №0803 |
| targetFile | №1167 (+ 1 других файлов) |
| targetId | №0060 (+ 34 других файлов) |
| targetKey | №0077 |
| targetLevel | №0700 |
| targetMode | №0867 |
| targetName | №0784 (+ 2 других файлов) |
| targetOncePerLongRest | №0809 |
| targetPeerId | №0811 |
| targetRadiantDamage | №0779 |
| targetRequired | №0779 |
| targets | №0078 (+ 12 других файлов) |
| targetSelfOrTouch | №0779 |
| targetsFatigueRadiusFt | №0779 |
| targetsUpTo | №0779 |
| targetTurns | №0641 |
| targetType | №0813 |
| tarotActorRef | №0818 |
| tarotCoin | №0818 |
| tarotDamageTotals | №1844 |
| tarotEffects | №1149 |
| tarotKnowledge | №1149 (+ 1 других файлов) |
| tarotLastStartedTurn | №1149 (+ 1 других файлов) |
| tarotModeApplied | №0655 (+ 1 других файлов) |
| tarotOwnerId | №0818 |
| tarotReaction | №0655 |
| tarotScene | №0655 (+ 14 других файлов) |
| taunt | №0776 (+ 1 других файлов) |
| team | №0078 (+ 8 других файлов) |
| teamAttackBonus | №0818 |
| techniques | №0835 |
| telekinesis | №0776 (+ 1 других файлов) |
| telekinesisLiftBonus | №0779 |
| telekinetic | №0782 |
| telekineticForce | №0779 |
| telekineticPush | №0779 |
| telepathic | №0782 |
| telepathicIntrusion | №0779 |
| telepathicIntrusionSave | №0779 |
| telepathy | №0779 |
| telepathyFt | №0776 |
| teleport | №0078 |
| teleportAllyId | №0819 (+ 2 других файлов) |
| teleportBetweenPaint | №0078 |
| teleportDamage | №0779 |
| teleported | №0818 |
| teleportFt | №0686 (+ 3 других файлов) |
| teleportNearTarget | №0779 |
| teleportRangeFt | №0809 |
| teleportSave | №0779 |
| teleportToImpact | №0078 |
| teleportWithFamiliar | №0813 |
| temp | №0786 (+ 3 других файлов) |
| tempAbsorbed | №0655 |
| temperament | №0801 |
| tempHp | №0078 (+ 19 других файлов) |
| tempHP | №0813 (+ 3 других файлов) |
| tempHpAtStartTurn | №0779 |
| tempHpBonus | №0779 |
| tempHpDice | №0779 |
| tempHpEach | №0779 |
| tempHpFromCharnel | №0809 |
| tempHpFromLightningDamage | №0779 |
| tempHpFromSealDamage | №0779 |
| tempHpOnApplause | №0776 |
| tempHpOnEnemyReducedToZero | №0779 |
| tempHpOnWake | №0779 |
| tempHpPerDie | №0779 |
| template | №0061 |
| templateNormals | №0061 |
| templates | №0657 |
| temple | №0801 (+ 1 других файлов) |
| temporary | №0779 |
| temporaryHp | №0782 |
| temporaryHP | №0078 |
| terrain | №0878 |
| terrorAndDecay | №0779 |
| terrorDie | №0779 |
| terrorizingForce | №0698 |
| test | №1120 |
| testMode | №0842 (+ 1 других файлов) |
| tests | №0854 |
| tethered | №0779 |
| TEXCOORD_0 | №1163 |
| texLoc | №0073 |
| text | №0812 (+ 2 других файлов) |
| textContent | №1266 |
| textile | №0670 |
| texture | №0062 (+ 4 других файлов) |
| Texture | №0070 |
| textures | №0073 (+ 1 других файлов) |
| textureTile | №0062 |
| thaumaturgy | №0779 |
| thaumaturgyEnhanced | №0809 |
| thenResistance | №0641 |
| thievesToolsBonus | №0779 |
| thieving | №0779 |
| thighL | №0059 |
| thighR | №0059 |
| thirdDisciplineLevel | №0714 |
| thirdparty | №0660 |
| thornsDice | №0869 |
| thrallAdvantage | №0809 |
| thrallAura | №0809 |
| thrallDance | №0809 |
| thrallDeathExplosion | №0809 |
| thrallEthereal | №0809 |
| thrallFlight | №0809 |
| thrallInvisible | №0809 |
| thralls | №0809 |
| thrallSlots | №0809 |
| thrallType | №0809 |
| thrallTypes | №0809 |
| thread | №0667 (+ 4 других файлов) |
| thresholds | №0805 |
| thrillOfTheHunt | №0779 |
| thrownRange | №0779 |
| thunder | №0648 |
| tiedMaximumsAllActive | №0869 |
| tier | №0665 |
| tights | №0062 |
| tile | №0062 |
| tiles | №0071 (+ 2 других файлов) |
| time | №0061 (+ 13 других файлов) |
| timeFrozen | №0818 |
| timelessBody | №0648 |
| timeMinutes | №1118 |
| timeout | №1159 (+ 37 других файлов) |
| timer | №0847 |
| times | №0068 |
| timestamp | №1111 |
| timeStop | №0818 |
| tinker | №0670 (+ 3 других файлов) |
| tinkerer | №0671 |
| tinOre | №0673 |
| tiny | №0816 (+ 1 других файлов) |
| tinyServant | №1223 |
| tissue | №0058 (+ 1 других файлов) |
| title | №0642 (+ 5 других файлов) |
| to | №0632 (+ 2 других файлов) |
| toad | №0686 |
| toggle | №0660 (+ 1 других файлов) |
| toggleCondition | №0655 (+ 3 других файлов) |
| toHit | №0874 (+ 3 других файлов) |
| token | №0653 (+ 3 других файлов) |
| tokenList | №1265 (+ 2 других файлов) |
| tokens | №0071 (+ 28 других файлов) |
| tombGuardian | №0779 |
| tool | №0626 (+ 20 других файлов) |
| toolAliases | №1845 |
| toolBonus | №0808 |
| toolLabels | №1845 |
| toolMastery | №0818 |
| toolName | №1118 |
| toolProficiencies | №0624 (+ 2 других файлов) |
| toolRequired | №0878 |
| tools | №0078 (+ 27 других файлов) |
| toolsAdvantage | №0818 |
| top | №0063 (+ 12 других файлов) |
| top10LargestMapped | №1168 |
| topknot | №0061 (+ 1 других файлов) |
| topY | №0062 |
| torso | №0061 (+ 2 других файлов) |
| torsoRidgeSize | №0066 (+ 4 других файлов) |
| torsoRidgeWidth | №0066 (+ 2 других файлов) |
| tortle | №1340 |
| total | №0628 (+ 53 других файлов) |
| total_length | №1160 |
| totalCp | №0799 |
| totalDomination | №0779 |
| totalGp | №0802 |
| totalLeather | №0663 |
| totalLength | №1169 |
| totalLevel | №0827 |
| totemSpirit | №0648 |
| toTheMat | №0779 |
| touchCurseThreshold | №0809 |
| touchedGlbVertexPct | №1168 |
| touchedGlbVertices | №1168 |
| touchMaxHpCut | №0809 |
| touchParalyzeThreshold | №0809 |
| touchRangeBonusFt | №0809 |
| touchThreshold | №0809 |
| towerShield | №0871 |
| town | №0067 |
| toxins | №0670 |
| toyArmy | №0809 |
| toymaker | №0809 |
| toySoulVault | №0809 |
| track | №0082 |
| trackInscribedRunesAnyPlane | №0779 |
| traderCount | №0800 |
| traderId | №0801 |
| traders | №0799 (+ 1 других файлов) |
| TRADERS | №0799 |
| tradition | №0813 (+ 1 других файлов) |
| traditionAction | №0813 |
| traditionRites | №0707 |
| traditions | №0707 (+ 1 других файлов) |
| trainHumanoids | №0779 |
| traits | №0658 (+ 2 других файлов) |
| transactionRevision | №0811 |
| transcended | №0714 (+ 1 других файлов) |
| Transcended | №0795 |
| transfer | №0816 |
| transferCondition | №0779 |
| transferDamage | №0779 |
| transferringAffliction | №0779 |
| transform | №0809 |
| transformed | №0818 |
| translation | №1123 |
| transport | №0810 |
| transposition | №0779 |
| traps | №0670 |
| treasure | №0067 |
| triangles | №0063 (+ 4 других файлов) |
| trickster | №0821 (+ 2 других файлов) |
| tricksterStatus | №0821 |
| tricksterTurn | №0818 |
| trigger | №0779 (+ 3 других файлов) |
| triggerDamageTypes | №0641 |
| triggerHealing | №0803 |
| triggerId | №0655 (+ 2 других файлов) |
| triggerMiraculousHealing | №0779 |
| triggerOnNearbyKill | №0641 |
| triggerOnPsychicDamage | №0779 |
| triggerSpend | №0809 |
| trough | №0067 |
| trousers | №0062 |
| trueSight | №0813 |
| truesightFt | №0779 |
| trunkSize | №0066 (+ 1 других файлов) |
| truth | №0803 |
| truthful | №0818 |
| truthfulIds | №0818 |
| ts | №0851 |
| turn | №0809 |
| turned | №0648 |
| turnEnd | №0818 |
| turnId | №1206 |
| turnIds | №0821 (+ 2 других файлов) |
| turnResources | №0078 (+ 34 других файлов) |
| turns | №0641 |
| turnStart | №0818 |
| turnUndead | №0648 |
| turtle | №0061 |
| tuskSize | №0066 (+ 2 других файлов) |
| twin_braids | №0061 (+ 1 других файлов) |
| twin_tails | №0061 (+ 1 других файлов) |
| twinFamiliar | №0779 |
| twinned | №0648 |
| twoRevelations | №0813 |
| type | №0070 (+ 113 других файлов) |
| typedDice | №0818 |
| typedExtraDice | №0078 (+ 3 других файлов) |
| typeKey | №0874 (+ 4 других файлов) |
| types | №0674 |
| u | №0061 (+ 1 других файлов) |
| uiGather | №0081 |
| uiRequired | №0714 |
| umbralImprecation | №0779 |
| unarmed | №0779 |
| unarmedAttack | №0641 (+ 3 других файлов) |
| unarmedAttackBonus | №0779 |
| unarmedDamage | №0779 |
| unarmedGraft | №1118 |
| unarmoredAC | №0779 |
| unavailable | №0077 (+ 11 других файлов) |
| unavoidableAccident | №0779 |
| unbreakable | №0641 (+ 2 других файлов) |
| Unbreakable | №0779 |
| unbreakableExploit | №0779 |
| unbridledChaos | №0779 |
| uncannyDodge | №0648 |
| unchanged | №1162 |
| uncommon | №0793 (+ 5 других файлов) |
| unconsciousAtFatigueGteCurrentHp | №0779 |
| unconsciousOrStunnedOnly | №0779 |
| undead | №0628 (+ 15 других файлов) |
| undeadFocusAvailable | №0641 |
| undeadFocusReaction | №0641 |
| undercut | №0061 (+ 1 других файлов) |
| underdark | №0063 |
| underwaterDarkvision | №0833 |
| underwear | №0062 |
| underwearBottom | №0066 (+ 5 других файлов) |
| underwearTop | №0066 (+ 6 других файлов) |
| undo | №0063 |
| undying | №0641 (+ 2 других файлов) |
| undyingServitude | №0809 |
| unequip | №0066 |
| unerringEye | №0779 |
| unfortunateAccident | №0779 |
| ungulate | №0774 |
| uniforms | №1119 |
| uniquePositionVertexCounts | №1169 |
| unit | №0061 (+ 4 других файлов) |
| unitGp | №0802 |
| units | №0799 |
| unknown | №1111 (+ 2 других файлов) |
| unleashed | №0714 (+ 1 других файлов) |
| unlimitedHybrid | №0779 |
| unlockRank | №0670 |
| unlockSchedule | №0821 |
| unreducedNecrotic | №0779 |
| unreducedSelfDamage | №0779 |
| unreducible | №0779 |
| unrivaledGenius | №0829 |
| unsealed | №0641 |
| unsealedArcana | №0641 |
| unsealedAspectReplacement | №0844 |
| unseen | №1228 |
| unshackledPower | №0779 |
| unstable | №0079 (+ 1 других файлов) |
| unstoppable | №0871 |
| unsupported | №0077 (+ 17 других файлов) |
| until | №0078 (+ 1 других файлов) |
| untilDismissed | №0779 |
| untilOwnEnd | №0818 |
| untilOwnEndAfterNext | №0818 |
| untilOwnerEnd | №0818 (+ 1 других файлов) |
| untilOwnerStart | №0818 |
| untilOwnStart | №0818 (+ 2 других файлов) |
| untilRound | №0818 |
| unwaveringWill | №0739 |
| unyieldingResolve | №0735 |
| unyieldingWill | №0829 |
| update | №0830 (+ 1 других файлов) |
| updateAvailable | №0842 |
| updated | №0833 (+ 1 других файлов) |
| updated_at | №1149 |
| updatedAt | №0071 (+ 1 других файлов) |
| updateSwarm | №0061 |
| upperArmL | №0059 |
| upperArmR | №0059 |
| urbanAdvantage | №0776 |
| uri | №1158 |
| url | №0068 (+ 4 других файлов) |
| URL | №1241 (+ 5 других файлов) |
| urls | №0886 |
| ursine | №0774 |
| use | №0686 (+ 1 других файлов) |
| useCount | №0779 |
| used | №0624 (+ 21 других файлов) |
| usedBloodLevels | №0813 |
| usedBy | №0673 (+ 1 других файлов) |
| usedByV38 | №0672 (+ 1 других файлов) |
| usedCount | №0654 |
| usedLevels | №0813 |
| useDominantOrgan | №0869 |
| usedThisRound | №0805 |
| useFeature | №0078 (+ 16 других файлов) |
| useIntForStr | №0779 |
| useIntForStrengthOrDexOnSurge | №0779 |
| useLeadership | №0779 |
| user | №0653 (+ 1 других файлов) |
| user_metadata | №1111 |
| userAgent | №0848 (+ 1 других файлов) |
| useRules | №0783 (+ 23 других файлов) |
| uses | №0698 (+ 5 других файлов) |
| usesAlchemistSupplies | №0811 |
| usesIntForPerception | №0779 |
| usesPerLongRest | №0078 (+ 2 других файлов) |
| usesPerRest | №0809 |
| usesPerTurn | №0779 |
| useSpiritAbility | №0784 |
| usesStrength | №0656 (+ 1 других файлов) |
| useStrength | №0779 |
| useStrengthWithBows | №0779 |
| useSubclassFeature | №0784 (+ 2 других файлов) |
| useTex | №1119 |
| useTexLoc | №0073 |
| uv | №0058 (+ 5 других файлов) |
| uvLoc | №0073 |
| v | №0058 (+ 2 других файлов) |
| V | №1196 |
| V52 | №1210 |
| V53 | №1211 |
| valiantLeader | №0739 |
| validate | №0820 |
| validatePack | №0661 |
| validateTurn | №0783 |
| value | №0060 (+ 25 других файлов) |
| valueGp | №0818 |
| valueMultiplier | №0665 |
| values | №0068 (+ 1 других файлов) |
| vampirism | №0077 |
| vanish | №0648 |
| variant | №0059 (+ 4 других файлов) |
| variantHooks | №0628 (+ 13 других файлов) |
| variants | №0078 (+ 2 других файлов) |
| VEC2 | №0068 (+ 4 других файлов) |
| VEC3 | №0068 (+ 4 других файлов) |
| VEC4 | №0068 (+ 4 других файлов) |
| vedalken | №0672 |
| vengefulBane | №0779 |
| venom | №0667 |
| Venom | №0080 |
| venomConcentrateV49 | №0667 |
| venomReagent | №0667 (+ 1 других файлов) |
| verbal | №0760 (+ 10 других файлов) |
| verbalBlocked | №0818 |
| verbalComponentsBlocked | №0078 |
| verify | №0653 |
| vermillion | №0641 |
| Vermillion | №0779 |
| vermin | №0774 |
| versatileAttackBonus | №0779 |
| versatileFightingAdvanced | №0779 |
| version | №0059 (+ 51 других файлов) |
| VERSION | №0059 (+ 56 других файлов) |
| vertexCount | №0063 (+ 1 других файлов) |
| vertexMask | №0059 |
| vertices | №0063 (+ 6 других файлов) |
| verticesPerRat | №0061 |
| very_rare | №0793 (+ 5 других файлов) |
| vesselMagic | №0844 |
| vessels | №0670 |
| vesselSlots | №0844 |
| vesselStrike | №0844 |
| vials | №0670 |
| victorySurgeExploit | №0779 |
| view | №0071 (+ 1 других файлов) |
| viewport | №1311 (+ 36 других файлов) |
| viewportHeight | №0063 |
| viewportWidth | №0063 |
| vileAffliction | №0779 |
| village | №0799 |
| vine | №0832 |
| vinegar | №0673 |
| violet | №0832 |
| visible | №0641 (+ 9 других файлов) |
| visibleMeleeOnly | №0779 |
| Vitality | №0080 |
| vitalitySplint | №0779 |
| voiceReagent | №0826 |
| volatility | №0080 |
| Volatility | №0080 |
| volume | №0061 (+ 1 других файлов) |
| volumes | №0061 |
| voluntarilyDetach | №0816 |
| voraciousWeapon | №0779 |
| vowOfEnmity | №0648 (+ 1 других файлов) |
| vpLoc | №0073 |
| vulnerabilities | №0655 (+ 9 других файлов) |
| vulnerability | №0641 (+ 2 других файлов) |
| vulnerable | №0850 (+ 1 других файлов) |
| w | №0058 (+ 10 других файлов) |
| wagerCurrent | №0821 |
| wagerMax | №0821 |
| wagerOdds | №0821 |
| wagers | №0821 (+ 1 других файлов) |
| wagerStartCheck | №0818 |
| waist | №0063 (+ 6 других файлов) |
| waiveSacrificeDamage | №0779 |
| wakeMageSleeper | №0818 |
| wall | №0071 |
| WALL | №0072 |
| wall_brick_red | №0072 |
| wall_concrete | №0072 |
| wall_half_timber | №0072 |
| wall_marble_dark | №0072 |
| wall_marble_light | №0072 |
| wall_moss_stone | №0072 |
| wall_old_plaster | №0072 |
| wall_plaster_dark | №0072 |
| wall_plaster_light | №0072 |
| wall_plaster_panel | №0072 |
| wall_slate | №0072 |
| wall_stone_dark | №0072 |
| wall_stone_light | №0072 |
| wall_stone_masonry | №0072 |
| wall_wallpaper | №0072 |
| wall_white_plaster | №0072 |
| wall_wood_dark | №0072 |
| wall_wood_light | №0072 |
| wallClimb | №0809 |
| walls | №0071 (+ 16 других файлов) |
| wallStart | №0626 |
| wandering | №0714 (+ 1 других файлов) |
| wands | №0818 (+ 1 других файлов) |
| wands_02 | №0818 |
| wantedCp | №0801 (+ 1 других файлов) |
| war_caster | №0782 |
| warCry | №0779 |
| ward | №0655 |
| wardAbsorbed | №0655 |
| wardDenied | №0655 |
| Warden | №0795 |
| wardenInterrupt | №0655 |
| wardenSource | №0795 |
| wardenSurvive | №0655 |
| warforged | №0672 |
| warfront | №1219 |
| warfrontEligible | №0631 |
| warlock | №0798 (+ 1 других файлов) |
| warlockLevelEquivalent | №0779 |
| Warlord | №0795 |
| warlordSource | №0795 |
| warning | №0664 |
| warPriest | №0648 |
| warriorPoet | №0779 |
| warsong | №0779 |
| warSongs | №0776 |
| waste | №0826 |
| wasteland | №0799 |
| water | №0672 (+ 1 других файлов) |
| waterBreathing | №0078 (+ 2 других файлов) |
| waterCore | №0826 |
| waterEssence | №0826 |
| wave | №0061 |
| wavy_bob | №0061 (+ 1 других файлов) |
| wavy_long | №0061 (+ 1 других файлов) |
| wax | №0668 (+ 2 других файлов) |
| Weakness | №0080 |
| weapon | №0067 (+ 13 других файлов) |
| weaponAttack | №0655 (+ 22 других файлов) |
| weaponAttackBonus | №0813 |
| weaponBonus | №0813 |
| weaponDamage | №0813 |
| weaponDamageType | №0779 |
| weaponFunctional | №1213 |
| weaponId | №0078 (+ 14 других файлов) |
| weaponMastery | №0735 |
| weaponMasteryLevels | №0735 |
| weaponOnly | №0818 |
| weaponProficiency | №0813 |
| weapons | №0793 (+ 65 других файлов) |
| weaponsData | №0624 (+ 2 других файлов) |
| weaponsmith | №0801 (+ 1 других файлов) |
| weaponTeleportIfDistanceGtFt | №0779 |
| weaponValue | №1213 |
| weaponWear | №1151 |
| wearForArmor | №0666 |
| wearForAttack | №0666 |
| wearRatio | №0665 |
| weasel | №0686 |
| weaver | №0668 (+ 6 других файлов) |
| webgl | №1319 |
| webPreferences | №0886 |
| webSecurity | №0886 |
| weight | №0065 (+ 47 других файлов) |
| weights | №0058 (+ 3 других файлов) |
| weld | №0058 |
| White | №0776 (+ 1 других файлов) |
| whiteHot | №0779 |
| width | №0063 (+ 48 других файлов) |
| wildCharge | №0779 |
| wildernessIntel | №0779 |
| wildMagicSurge | №0648 |
| wildShape | №0648 (+ 1 других файлов) |
| wildspace | №0630 (+ 1 других файлов) |
| wildspaceEligible | №0630 |
| wildwood | №0063 |
| willControlledBy | №0869 |
| willingTargetIds | №0819 (+ 1 других файлов) |
| window | №0067 (+ 77 других файлов) |
| wingColor | №0066 (+ 3 других файлов) |
| wingSize | №0066 (+ 1 других файлов) |
| wis | №0624 (+ 54 других файлов) |
| wisChecksAdvantage | №0641 (+ 1 других файлов) |
| wisChecksDisadvantage | №0641 (+ 1 других файлов) |
| wisdom | №0786 (+ 9 других файлов) |
| wisdomCheckAdvantage | №0813 |
| wisdomSaveAdvantage | №0779 |
| wisSave | №0779 |
| wisSavesDisadvantage | №0641 (+ 1 других файлов) |
| Witch | №0707 |
| witchCurse | №0779 |
| witchItemFlySpeed | №0809 |
| with | №0805 |
| withering | №0078 |
| withFileTypes | №0888 (+ 1 других файлов) |
| within10CellsPct | №1166 |
| within2CellsPct | №1166 |
| within5CellsPct | №1166 |
| within5GridCellsPct | №1171 |
| withinCellPct | №1166 |
| withinGridCellPct | №1171 |
| wizard | №0798 (+ 1 других файлов) |
| won | №0821 |
| wood | №0067 (+ 6 других файлов) |
| woodcarver | №0670 (+ 3 других файлов) |
| wooden | №0067 |
| woodwork | №0668 (+ 1 других файлов) |
| wool | №0062 |
| wordsOfAdamance | №0779 |
| wordsOfBenediction | №0779 |
| wordsOfDamnation | №0779 |
| wordsOfDomination | №0779 |
| wordsOfLegend | №0779 |
| wordsOfMayhem | №0779 |
| wordsOfZeal | №0779 |
| worg | №0686 |
| worldActor | №0074 |
| worldId | №0878 |
| worldMatrices | №0068 |
| worn | №0664 |
| wrapS | №0063 (+ 1 других файлов) |
| wrapT | №0063 (+ 1 других файлов) |
| wretchedCastigation | №0779 |
| writable | №0818 |
| write | №0078 (+ 1 других файлов) |
| x | №0061 (+ 49 других файлов) |
| xanathar | №0628 |
| xenoNecroticReady | №1117 |
| xp | №0628 (+ 16 других файлов) |
| xpFor | №0805 |
| xu | №0058 |
| xv | №0058 |
| xx | №0058 |
| xy | №0058 |
| y | №0061 (+ 44 других файлов) |
| yaw | №0061 (+ 2 других файлов) |
| yeast | №0672 |
| yew | №0673 |
| yieldMult | №0808 |
| yieldMultiplier | №0672 |
| yu | №0058 |
| yuan_ti | №0672 |
| yv | №0058 |
| yy | №0058 |
| z | №0061 (+ 3 других файлов) |
| zealousWords | №0776 |
| zeroHp | №0818 |
| zeroHpReaction | №0655 (+ 4 других файлов) |
| zeroHpSave | №0779 |
| zincOre | №0673 |
| zoneRadiusFt | №0779 |
| zones | №0071 (+ 1 других файлов) |
| zoom | №0070 (+ 3 других файлов) |

### Ключи localStorage (26)

| Имя | Исходные файлы |
|---|---|
| dnd_app_alpha | №0832 |
| dnd_app_font | №0832 |
| dnd_app_frame_color | №0832 |
| dnd_app_frame_style | №0832 |
| dnd_app_theme | №0832 |
| dnd_autorotate_enabled | №0868 |
| dnd_autorotate_interval | №0868 |
| dnd_campaigns_v1 | №0810 (+ 1 других файлов) |
| dnd_character_appearance_draft_v1 | №1319 |
| dnd_characters | №0831 |
| dnd_current_character_id | №0831 (+ 1 других файлов) |
| dnd_custom_races | №0824 |
| dnd_debug_enabled | №0832 (+ 2 других файлов) |
| dnd_launcher_icon | №0832 (+ 2 других файлов) |
| dnd_market_v55_state | №0802 (+ 1 других файлов) |
| dnd_modal_color | №0070 (+ 1 других файлов) |
| dnd_modal_opacity | №0070 (+ 1 других файлов) |
| dnd_multi_characters_v2 | №0624 (+ 44 других файлов) |
| dnd_selected_wallpaper | №0868 |
| dnd_ui_color | №0070 (+ 1 других файлов) |
| dnd_ui_opacity | №0070 (+ 1 других файлов) |
| dnd_v53_world_id | №0878 |
| dnd_v71_onboarding_done | №0815 (+ 1 других файлов) |
| dnd_vtt_mobile_session_v67 | №1288 |
| dnd_wallpaper_dim | №0868 |
| dndContentEnabled | №0661 |

### CSS переменные (16)

| Имя | Исходные файлы |
|---|---|
| --accent-action | №0837 |
| --accent-danger | №0837 |
| --accent-primary | №0837 |
| --accent-success | №0837 |
| --bg-box | №0837 |
| --bg-card | №0837 |
| --bg-input | №0837 |
| --bg-main | №0837 |
| --border-color | №0837 |
| --border-input | №0837 |
| --dnd-frame-art | №0837 |
| --dnd-frame-color | №0837 |
| --dnd-frame-filter | №0837 |
| --text-labels | №0837 |
| --text-main | №0837 |
| --text-muted | №0837 |

### Python/Java идентификаторы (513)

| Имя | Исходные файлы |
|---|---|
| __DND_APP_BOOT_READY | №0049 |
| __name__ | №0005 (+ 11 других файлов) |
| a | №0048 (+ 2 других файлов) |
| aa | №0048 |
| action | №1350 (+ 2 других файлов) |
| active | №0048 (+ 1 других файлов) |
| activeFile | №0048 |
| activeRoot | №0049 |
| activeVersion | №0048 |
| activity | №0048 |
| actor | №1800 |
| actual | №1797 |
| alch | №1846 |
| ALIAS | №1673 |
| aliases | №0048 |
| aligned | №1792 |
| alt | №1847 |
| android | №1361 |
| androidPackage | №1794 |
| animationClips | №1303 |
| ap | №1310 |
| apk | №1675 (+ 2 других файлов) |
| apkBytes | №0048 (+ 2 других файлов) |
| apkCompressedBytes | №1305 |
| apkSha256 | №1353 (+ 1 других файлов) |
| app | №1361 |
| app_path | №1361 |
| APP_VERSION | №1361 |
| archive | №1792 |
| archives | №1350 |
| area | №1303 |
| args | №1303 (+ 9 других файлов) |
| artifacts | №0006 (+ 2 других файлов) |
| artwork | №1305 |
| assets | №1847 |
| attributes | №1303 |
| av | №0048 |
| axis | №1303 |
| b | №0048 (+ 6 других файлов) |
| backup | №1797 |
| backup_hash | №1797 |
| badging | №1792 (+ 1 других файлов) |
| base | №1846 (+ 1 других файлов) |
| base_classes | №1847 |
| base_feat_ids | №1847 |
| base_races | №1847 |
| baselineInstall | №1798 |
| baseUrl | №0048 |
| bb | №0048 |
| binary | №1303 |
| blob | №0005 |
| blobs | №0006 |
| bones | №1303 |
| branch | №1304 |
| BRANCH | №0005 (+ 2 других файлов) |
| BRAND | №1797 |
| buf | №0048 |
| buffer | №1303 |
| build | №1305 |
| build_run | №0005 (+ 1 других файлов) |
| build_script | №1800 |
| buildRoots | №1304 |
| bundled | №1800 |
| bundled_history | №1795 |
| bundledCreationIds | №1793 |
| bv | №0048 |
| bytes | №0048 (+ 7 других файлов) |
| c | №0048 (+ 6 других файлов) |
| cache | №0048 |
| cacheBytes | №0048 |
| cacheKey | №0048 |
| candidate | №1798 |
| candidate_run | №1795 |
| candidates | №0048 (+ 1 других файлов) |
| canonical | №0048 |
| capture | №1792 (+ 1 других файлов) |
| capture_output | №0005 |
| catalog | №1350 (+ 2 других файлов) |
| catalogs | №1793 |
| category | №1359 |
| cert | №1792 (+ 1 других файлов) |
| CERT | №1792 (+ 1 других файлов) |
| certificate | №0005 |
| channel | №1794 |
| checksums | №0005 |
| children | №0048 |
| choices | №1310 (+ 2 других файлов) |
| chunk | №1303 |
| ci | №1798 |
| cipher | №1673 |
| ciphertext | №1673 |
| client | №1797 |
| code | №1361 (+ 3 других файлов) |
| Code | №1792 (+ 1 других файлов) |
| codeCache | №0048 |
| codeCacheBytes | №0048 |
| codes | №1800 |
| color | №1847 |
| component | №0048 |
| compressed | №1793 |
| conclusion | №1798 |
| connectedComponents | №1303 |
| content | №1847 |
| context | №0048 |
| converted | №1791 |
| count | №1303 (+ 1 других файлов) |
| counts | №1303 (+ 1 других файлов) |
| craft | №1846 |
| created | №0006 |
| creation | №1353 |
| crlf | №1791 |
| current | №1361 (+ 1 других файлов) |
| cwd | №1304 (+ 1 других файлов) |
| d | №1309 |
| data | №0005 (+ 10 других файлов) |
| dataBytes | №0048 |
| dataRoot | №0048 |
| default | №1310 (+ 1 других файлов) |
| defaultFile | №0048 |
| defaultInterfaceOrientation | №1800 |
| degenerateTriangles | №1303 |
| dependencies | №1304 |
| deps | №1846 |
| descriptor | №0005 (+ 1 других файлов) |
| dest | №0006 (+ 1 других файлов) |
| destination | №0005 (+ 1 других файлов) |
| detected | №1310 |
| deviceQa | №1793 |
| digest | №0005 (+ 4 других файлов) |
| dir | №1792 |
| dirs | №0048 |
| dklen | №1792 |
| dndvtt_update | №0048 |
| doc | №1846 (+ 3 других файлов) |
| document | №1303 (+ 1 других файлов) |
| downloadedBytes | №0048 |
| dtype | №1303 |
| duplicates | №1304 |
| edges | №1303 (+ 1 других файлов) |
| editorMorphs | №1303 |
| embeddedMorphChannels | №1303 |
| enabled | №0048 |
| encoding | №0005 (+ 10 других файлов) |
| encrypted | №1792 (+ 1 других файлов) |
| ensure_ascii | №0005 (+ 13 других файлов) |
| entries | №1351 (+ 3 других файлов) |
| entry | №0048 (+ 3 других файлов) |
| env | №0006 (+ 1 других файлов) |
| environment | №1353 |
| errors | №1304 (+ 1 других файлов) |
| event | №1798 |
| EXCLUDE_DIRS | №1359 |
| executor | №0048 |
| exist_ok | №0005 (+ 9 других файлов) |
| existing | №0005 |
| expected | №1791 (+ 2 других файлов) |
| expected_cert | №0005 |
| expected_name | №0005 |
| expectedBytes | №0048 |
| expectedHash | №0048 |
| export_apply | №1350 |
| export_format | №1350 |
| ext | №1310 (+ 1 других файлов) |
| external_guids | №1304 |
| f | №0048 (+ 1 других файлов) |
| faces | №1303 |
| failed | №0006 |
| feats | №1847 |
| feed | №0005 (+ 2 других файлов) |
| file | №0048 (+ 3 других файлов) |
| filepath | №1350 |
| files | №0006 (+ 9 других файлов) |
| filesBytes | №0048 |
| FIXTURE | №1791 |
| flags | №1675 |
| flush | №0005 |
| folder | №1794 (+ 1 других файлов) |
| found | №1797 |
| fp | №1351 |
| frontend | №1797 (+ 1 других файлов) |
| fs | №1847 |
| full | №1847 |
| full_name | №1798 |
| GENERATED | №1359 |
| generator | №1673 |
| git_sha | №0005 |
| GITHUB_EVENT_NAME | №1798 |
| GITHUB_REF | №1798 |
| GITHUB_REPOSITORY | №1798 |
| GITHUB_SHA | №1798 |
| goToTab | №0049 |
| gradle | №1361 |
| gradle_path | №1361 |
| groups | №1304 |
| guids | №1304 |
| gx | №1309 |
| gy | №1309 |
| h | №1310 (+ 3 других файлов) |
| head_branch | №1798 |
| head_repository | №1798 |
| head_sha | №1798 |
| header | №1792 |
| headers | №0005 |
| healthy | №0049 |
| height | №1309 (+ 1 других файлов) |
| help | №1361 |
| history | №1795 |
| history_path | №1795 |
| home | №1797 |
| i | №0048 (+ 1 других файлов) |
| iconId | №0048 |
| id | №0048 (+ 4 других файлов) |
| ids | №1303 |
| image | №1309 |
| in | №0048 |
| indent | №0005 (+ 13 других файлов) |
| indexComponentType | №1303 |
| info | №0048 |
| ings | №1846 |
| installedPayloadHashes | №1798 |
| intent | №1675 |
| inv | №1305 |
| isolatedProfileAndBackupPreserved | №1798 |
| item | №0005 (+ 4 других файлов) |
| item_catalogs | №1793 |
| iv | №1673 |
| jobs | №1794 (+ 2 других файлов) |
| k | №1350 |
| keepPrevious | №0048 |
| key | №1305 (+ 3 других файлов) |
| keys | №1847 |
| kind | №0006 (+ 5 других файлов) |
| landscapeActive | №0049 |
| latest | №0005 (+ 1 других файлов) |
| len | №0048 |
| length | №0048 (+ 2 других файлов) |
| limitations | №1304 |
| lines | №1350 |
| link | №1350 (+ 1 других файлов) |
| live | №1800 |
| live_feed | №0005 |
| loader | №0049 |
| local_path | №1795 |
| lower | №0048 |
| m | №1304 (+ 8 других файлов) |
| main | №1304 (+ 1 других файлов) |
| manifest | №0005 (+ 5 других файлов) |
| MANIFEST | №1359 |
| MANIFEST_PATHS | №1359 |
| manifestUrl | №0048 |
| marker | №1350 |
| materials | №1303 (+ 1 других файлов) |
| max_workers | №1803 |
| meshes | №1350 |
| meshMetadata | №1303 |
| metavar | №1361 |
| method | №1792 |
| migrated | №1304 |
| minimalContentVerified | №1793 |
| missing | №1792 |
| missing_ok | №1350 (+ 1 других файлов) |
| mode | №1793 |
| model | №1304 |
| module | №0006 |
| morphNames | №1303 |
| n | №0048 (+ 4 других файлов) |
| N | №1309 |
| name | №0048 (+ 7 других файлов) |
| names | №1792 |
| native | №1305 |
| nativeSeedValidated | №0048 |
| new_manifest | №1795 |
| newCode | №1675 |
| next | №0048 (+ 1 других файлов) |
| noBackup | №0048 |
| noBackupBytes | №0048 |
| nonce | №1792 |
| nonFiniteValues | №1303 |
| normalized | №1791 |
| note | №1353 (+ 1 других файлов) |
| notes | №1794 (+ 1 других файлов) |
| notes_file | №1795 |
| o | №0048 |
| objects | №1350 (+ 2 других файлов) |
| offset | №0005 (+ 1 других файлов) |
| old | №1793 |
| oldCode | №1675 |
| oldUnity10005ApkBytes | №1793 |
| omittedNonRenderingPngBytes | №1793 |
| optional | №1305 |
| optional_names | №1793 |
| original | №0006 (+ 2 других файлов) |
| ORIGINAL_BLOBS | №1797 |
| original_chunks | №1793 |
| originalBrandingBytesVerified | №1793 |
| originalBrandingPixelsVerified | №1793 |
| out | №0048 (+ 7 других файлов) |
| p | №1304 (+ 6 других файлов) |
| package | №1361 |
| PACKAGE | №1792 (+ 1 других файлов) |
| packaged | №1793 |
| packaged_chunks | №1793 |
| packaged_image | №1793 |
| packageVersion | №0048 |
| packed | №1305 |
| parent | №0048 (+ 1 других файлов) |
| parents | №0006 (+ 10 других файлов) |
| parser | №1303 (+ 6 других файлов) |
| part | №1846 |
| parts | №1303 |
| password | №1792 |
| patch | №1795 |
| path | №0005 (+ 9 других файлов) |
| pathId | №1353 |
| paths | №1304 |
| payload | №1791 (+ 1 других файлов) |
| pending | №0048 |
| per_page | №1794 |
| phb | №1847 |
| physicalAndroidQa | №1792 |
| pixels | №1303 (+ 1 других файлов) |
| pkg | №1361 |
| pkg_path | №1361 |
| plaintext | №1792 |
| platform | №0005 (+ 1 других файлов) |
| player_settings | №1800 |
| pm | №0048 (+ 1 других файлов) |
| pores | №1309 |
| position | №1793 |
| positions | №1303 |
| prefix | №0006 (+ 3 других файлов) |
| prefs | №0048 (+ 1 других файлов) |
| present | №1802 |
| previewRoot | №0048 |
| previous | №0005 (+ 3 других файлов) |
| previousDir | №0048 |
| previousRequestedOrientation | №0049 |
| primitives | №1303 |
| prior | №1795 |
| probe | №1792 |
| props | №1793 |
| propTextureCount | №1793 |
| propTextureDimensions | №1793 |
| provenance | №1305 |
| PUBLISHED_APK_SHA | №1792 |
| publisher | №1794 |
| pushed | №0006 |
| qa | №1794 (+ 1 других файлов) |
| queue | №1304 |
| raw | №0048 (+ 1 других файлов) |
| rawBounds | №1303 |
| reach | №1309 |
| received | №0048 |
| record | №1353 |
| records | №1350 |
| reductionBytes | №1793 |
| reductionPercent | №1793 |
| references | №1304 |
| reinstall | №1798 |
| rel | №1359 |
| relative | №1350 |
| release | №1800 |
| release_exists | №1795 |
| remote | №1800 |
| removed_art_bytes | №1793 |
| REPO | №0005 (+ 2 других файлов) |
| report | №0005 (+ 5 других файлов) |
| request | №0005 (+ 1 других файлов) |
| required | №1303 (+ 10 других файлов) |
| restore | №0049 |
| result | №1305 (+ 5 других файлов) |
| return_counts | №1303 |
| return_inverse | №1303 |
| return_value | №1798 |
| returncode | №0005 (+ 1 других файлов) |
| reverse | №1305 (+ 1 других файлов) |
| rng | №1309 |
| root | №0006 (+ 13 других файлов) |
| ROOT | №1303 (+ 9 других файлов) |
| root_url | №1310 |
| rootEntries | №0048 |
| roots | №1303 (+ 1 других файлов) |
| rough | №1309 |
| row | №1304 (+ 1 других файлов) |
| rows | №1305 (+ 3 других файлов) |
| run | №1794 (+ 1 других файлов) |
| run_data | №1795 |
| RUNNER_TEMP | №1798 |
| runtime | №1798 |
| RUNTIME_MANIFEST | №1359 |
| runtimeSmoke | №1798 |
| s | №0048 (+ 1 других файлов) |
| scene | №1798 |
| schema | №1303 (+ 2 других файлов) |
| script | №1847 |
| sdk | №0005 (+ 1 других файлов) |
| seamDuplicates | №1303 |
| seen | №1304 (+ 2 других файлов) |
| selected | №0048 |
| selectedIndex | №0048 |
| separators | №1351 (+ 2 других файлов) |
| serializedBytes | №1353 |
| settings | №1792 (+ 2 других файлов) |
| sha | №0006 (+ 1 других файлов) |
| sha256 | №1303 (+ 4 других файлов) |
| side_effect | №1798 |
| signer | №1795 |
| signers | №0005 |
| signingCertificateSha256 | №1792 |
| sigs | №1675 |
| size | №1793 (+ 1 других файлов) |
| skins | №1303 |
| skipped | №1350 |
| slug | №1847 |
| source | №0006 (+ 3 других файлов) |
| SOURCE | №1799 |
| source_commit | №0005 (+ 2 других файлов) |
| source_image | №1793 |
| source_paths | №1304 |
| sourceCommit | №1792 |
| sourceRefs | №1304 |
| sources | №1791 |
| spec | №0006 (+ 2 других файлов) |
| src | №0048 |
| stack | №0048 |
| stage | №1792 (+ 1 других файлов) |
| staged | №0048 |
| stageRoot | №0048 |
| standalone | №1350 |
| state | №0048 |
| status | №1792 (+ 2 других файлов) |
| stderr | №1792 (+ 1 других файлов) |
| stdout | №1795 |
| store | №1673 (+ 2 других файлов) |
| strides | №1303 |
| sums | №0005 |
| surfaces | №1847 |
| tag | №0005 (+ 1 других файлов) |
| target | №0048 (+ 6 других файлов) |
| targets | №0006 |
| temp | №1350 |
| text | №0005 (+ 6 других файлов) |
| texts | №1304 |
| textureFormat | №1353 |
| textures | №1305 |
| ti | №0048 |
| timeout | №0005 (+ 1 других файлов) |
| title | №0049 |
| tools | №1795 |
| topology | №1303 |
| total | №0048 |
| totalBytes | №0048 |
| totalFiles | №0048 |
| tracked | №1304 |
| triangles | №1303 |
| type | №0048 (+ 9 других файлов) |
| typeCounts | №1353 |
| ui | №1800 |
| unique | №1847 |
| uniquePositions | №1303 |
| unit | №0048 |
| units | №0048 |
| UNITY_ANDROID_KEYSTORE_BASE64 | №1798 |
| UNITY_CI_ARTIFACT_PASSWORD | №1798 |
| UNITY_EMAIL | №1798 |
| UNITY_LICENSE | №1798 |
| UNITY_PASSWORD | №1798 |
| UNITY_SERIAL | №1798 |
| unityGuidEdges | №1304 |
| unityPyVersion | №1353 |
| unknownFilePreserved | №1798 |
| updateBytes | №0048 |
| updater | №0049 (+ 1 других файлов) |
| updateRoot | №0048 |
| upgrade | №1798 |
| uri | №1304 (+ 1 других файлов) |
| url | №0005 (+ 4 других файлов) |
| use_global | №1350 |
| use_selection | №1350 |
| uv | №1303 |
| uvOutsideUnitSquare | №1303 |
| uvRange | №1303 |
| validate | №1792 |
| value | №0048 |
| verbosity | №1798 |
| verified | №0005 (+ 1 других файлов) |
| version | №0005 (+ 6 других файлов) |
| Version | №1792 (+ 1 других файлов) |
| VERSION | №1359 |
| versionCode | №0006 (+ 3 других файлов) |
| versionName | №0048 (+ 2 других файлов) |
| versions | №0048 (+ 1 других файлов) |
| versionsBytes | №0048 |
| vertices | №1303 |
| view | №1303 |
| visited | №0048 |
| vm | №1847 |
| VTT_PROJECT_MANIFEST_V70 | №1351 (+ 1 других файлов) |
| webView | №0049 |
| weights | №1303 |
| weightSumMaxError | №1303 |
| weldedBoundaryEdges | №1303 |
| weldedNonManifoldEdges | №1303 |
| weldTolerance | №1303 |
| width | №1303 (+ 1 других файлов) |
| window | №1847 |
| windows | №1798 |
| windowsFiles | №1792 |
| z | №1361 |
| zeroWeightVertices | №1303 |
| zipCompressedBrandingBytes | №1793 |
| zipCompressedNativeBytes | №1793 |
| zipCompressedUnityDataBytes | №1793 |

### JSON поля (899)

| Имя | Исходные файлы |
|---|---|
| _builderBaseStats | №1711 (+ 2 других файлов) |
| $schema | №1016 |
| abilities | №1711 (+ 2 других файлов) |
| ac | №1711 (+ 3 других файлов) |
| acBase | №1788 (+ 1 других файлов) |
| accepted | №1788 |
| acFormula | №1788 (+ 1 других файлов) |
| Acid | №1812 |
| acidResistance | №1711 (+ 2 других файлов) |
| acrobatics | №1711 (+ 2 других файлов) |
| action | №0757 (+ 2 других файлов) |
| activeConditions | №1711 (+ 2 других файлов) |
| activeFolderId | №1788 |
| activeProperties | №1813 |
| adamantine | №1812 |
| african | №0918 |
| age | №0918 (+ 3 других файлов) |
| alchemy | №1812 |
| allManifestEntriesMatchPhysicalZIP | №0905 (+ 1 других файлов) |
| allOf | №1016 |
| allowToChangeInstallationDirectory | №1097 |
| allUnpackedSizesAndSHA256 | №0905 (+ 1 других файлов) |
| amount | №1788 |
| amphibious | №1711 (+ 2 других файлов) |
| android | №1102 (+ 2 других файлов) |
| androidAfter | №1014 |
| androidBefore | №1014 |
| androidBundleArtifact | №1026 |
| androidBundleBytes | №1026 |
| androidBundleSha256 | №1026 |
| androidDebug | №0922 |
| androidPackage | №1102 (+ 1 других файлов) |
| androidSignedRelease | №0922 |
| androidSigningCertificateSha256 | №1841 |
| animalHandling | №1711 (+ 2 других файлов) |
| animationClips | №0911 |
| answers | №1788 |
| Antidote | №1812 |
| apkArtifact | №1026 |
| apkArtifactId | №1022 (+ 3 других файлов) |
| apkBytes | №1044 (+ 8 других файлов) |
| apkCompressedBytes | №1040 |
| apkSha256 | №1044 (+ 6 других файлов) |
| app | №1852 (+ 2 других файлов) |
| appId | №1097 |
| approved | №1101 |
| arcana | №1711 (+ 2 других файлов) |
| arch | №1097 |
| archiveBytes | №0905 (+ 3 других файлов) |
| archiveCRC | №1033 |
| archiveSha256 | №1034 |
| armLength | №0086 (+ 1 других файлов) |
| armLength-decr | №0086 (+ 1 других файлов) |
| armLength-incr | №0086 (+ 1 других файлов) |
| armor | №1017 (+ 3 других файлов) |
| arms | №0086 (+ 1 других файлов) |
| artifact | №0905 (+ 1 других файлов) |
| artifactBytes | №0905 (+ 1 других файлов) |
| artifactDigest | №0905 (+ 1 других файлов) |
| artifactName | №1097 |
| artifacts | №1044 (+ 3 других файлов) |
| artworkAlsoPresentAsUnityTextures | №1040 |
| asar | №1097 |
| asian | №0918 |
| assetId | №0751 (+ 13 других файлов) |
| athletics | №1711 (+ 2 других файлов) |
| attackType | №1711 (+ 1 других файлов) |
| attributes | №0911 |
| AudioListener | №1028 |
| AudioManager | №1028 |
| audit | №0918 |
| author | №0751 (+ 15 других файлов) |
| background | №1711 (+ 2 других файлов) |
| backgroundFeature | №1711 (+ 2 других файлов) |
| backgroundLanguagesToChoose | №1711 (+ 2 других файлов) |
| backgrounds | №1711 (+ 1 других файлов) |
| backslash | №0755 (+ 1 других файлов) |
| backslashTexture | №0755 (+ 1 других файлов) |
| balanced | №1156 |
| base | №1370 |
| baseAc | №1810 |
| baseAC | №1711 (+ 2 других файлов) |
| baseAcFormula | №1810 |
| baseColorFactor | №0911 |
| baseline | №1043 (+ 1 других файлов) |
| baseObj | №0086 (+ 1 других файлов) |
| basePositionsSha256 | №0086 (+ 1 других файлов) |
| baseUrl | №1852 (+ 2 других файлов) |
| battlefield | №1811 |
| binary | №0086 (+ 1 других файлов) |
| binaryBundlePublishedToAssets | №1026 |
| binarySha256 | №0086 (+ 1 других файлов) |
| binaryTransfer | №0920 |
| Blindness | №1812 |
| blockedVersions | №1852 (+ 2 других файлов) |
| bones | №0911 |
| bonuses | №1711 (+ 2 других файлов) |
| BoxCollider | №1028 |
| branch | №1015 |
| brandingResumeValidation | №1038 |
| brave | №1711 (+ 2 других файлов) |
| breast-volume-decr | №0086 (+ 1 других файлов) |
| breast-volume-incr | №0086 (+ 1 других файлов) |
| breastSize | №0086 (+ 1 других файлов) |
| Breathing | №1812 |
| breathWeapon | №1711 (+ 2 других файлов) |
| bt_copy | №1811 |
| bt_self | №1811 |
| build | №1097 |
| buildReportArtifact | №1026 |
| buildRoots | №1015 |
| BuildSettings | №1028 |
| bundledCreationIds | №1044 (+ 3 других файлов) |
| bytes | №1859 (+ 24 других файлов) |
| Camera | №1028 |
| candidateRunId | №1101 |
| Canvas | №1028 |
| CanvasRenderer | №1028 |
| cartographer | №1812 |
| cases | №1788 (+ 1 других файлов) |
| casterId | №1811 |
| castingTime | №1711 (+ 1 других файлов) |
| cat | №1812 |
| catalogUrl | №1024 |
| catalyst | №1813 |
| catalystId | №1813 |
| catalysts | №1812 |
| category | №1859 (+ 4 других файлов) |
| caucasian | №0918 |
| cell | №0751 (+ 17 других файлов) |
| ceramic | №1812 |
| certificateSha256 | №1026 (+ 1 других файлов) |
| cha | №1711 (+ 2 других файлов) |
| changedVertices | №0918 (+ 1 других файлов) |
| changeFrom10010Bytes | №1044 |
| changes | №1708 (+ 1 других файлов) |
| channel | №1101 (+ 7 других файлов) |
| channels | №0086 (+ 1 других файлов) |
| CharacterController | №1028 |
| charcoal | №1812 |
| charge | №1711 (+ 2 других файлов) |
| charisma | №1711 (+ 1 других файлов) |
| checks | №1044 |
| chest | №0911 (+ 2 других файлов) |
| choiceHistory | №1711 (+ 2 других файлов) |
| choices | №1711 (+ 1 других файлов) |
| choiceState | №1711 (+ 2 других файлов) |
| chromiumQA | №0905 |
| class | №1711 (+ 2 других файлов) |
| classEntries | №1043 (+ 1 других файлов) |
| classes | №1044 (+ 6 других файлов) |
| classFeaturesState | №1711 (+ 2 других файлов) |
| className | №1711 (+ 2 других файлов) |
| clay | №1812 |
| climb | №1711 (+ 2 других файлов) |
| cloth | №1812 |
| cloudUnityBuildLicenseConfigured | №1841 |
| coinCases | №1788 |
| coinLog | №1788 |
| coins | №1788 |
| Cold | №1812 |
| coldResistance | №1711 (+ 2 других файлов) |
| combatants | №1811 |
| commit | №0086 (+ 1 других файлов) |
| comparison | №1035 |
| components | №1711 (+ 1 других файлов) |
| compositeTerms | №0918 |
| compositions | №0086 (+ 1 других файлов) |
| compressedBytes | №1027 |
| ComputeShader | №1028 |
| con | №1711 (+ 2 других файлов) |
| concentration | №1711 (+ 1 других файлов) |
| conclusion | №0905 (+ 2 других файлов) |
| condition | №1812 |
| conflict | №1812 |
| conflicts | №1813 |
| connectedComponents | №0911 |
| const | №1016 |
| constitution | №1711 (+ 2 других файлов) |
| Constitution | №1812 |
| consumables | №1017 (+ 3 других файлов) |
| controlled | №0751 (+ 3 других файлов) |
| copy | №1811 |
| cost | №1788 (+ 2 других файлов) |
| count | №0086 (+ 6 других файлов) |
| cp | №1788 |
| cPerS | №1788 |
| craft | №1812 |
| craftBonuses | №1711 (+ 1 других файлов) |
| CRC | №0905 (+ 1 других файлов) |
| createDesktopShortcut | №1097 |
| createStartMenuShortcut | №1097 |
| creation | №1711 (+ 1 других файлов) |
| creationCases | №1788 |
| crystal | №1812 |
| Cubemap | №1028 |
| cupsize | №0918 |
| currentFloor | №0751 (+ 17 других файлов) |
| customizations | №0001 |
| cutoff | №0918 |
| d | №0751 (+ 17 других файлов) |
| damage | №1711 (+ 3 других файлов) |
| damageType | №1711 (+ 3 других файлов) |
| darkness | №0751 (+ 17 других файлов) |
| darkvisionFt | №1711 (+ 2 других файлов) |
| date | №1708 (+ 1 других файлов) |
| dc | №1812 |
| debug | №0905 |
| deception | №1711 (+ 2 других файлов) |
| declaredSourceCommit | №0918 |
| declaredUnityPackages | №1015 |
| defaultDependencyTypeInfo | №1834 |
| defaultInstantiationMode | №1834 |
| degenerateTriangles | №0911 |
| DelayedCallManager | №1028 |
| dependencies | №1015 (+ 4 других файлов) |
| dependencyTypeInfos | №1834 |
| depth | №1015 (+ 1 других файлов) |
| derived | №1445 |
| desc | №1711 (+ 1 других файлов) |
| description | №0751 (+ 21 других файлов) |
| destination | №1035 (+ 1 других файлов) |
| destinationGender | №0918 |
| dev | №1112 |
| devDependencies | №1097 (+ 2 других файлов) |
| device | №1044 |
| deviceQa | №1044 (+ 6 других файлов) |
| dex | №1711 (+ 2 других файлов) |
| dexterity | №1711 (+ 2 других файлов) |
| Dexterity | №1812 |
| directories | №1097 |
| dotnet | №1044 |
| doubleSided | №0911 |
| dragonScale | №1812 |
| duplicates | №1015 |
| duration | №1711 (+ 1 других файлов) |
| e | №0751 (+ 17 других файлов) |
| Earth | №1812 |
| edition | №1043 (+ 1 других файлов) |
| editorMorphs | №0911 |
| effect | №1788 (+ 1 других файлов) |
| effects | №1811 (+ 1 других файлов) |
| electron | №1097 |
| electron-builder | №1097 |
| embeddedMorphChannels | №0911 |
| emitsLight | №0757 (+ 1 других файлов) |
| enclosed | №1156 |
| entries | №1043 |
| enum | №1016 |
| ep | №1788 |
| equipped | №1788 |
| eTexture | №0751 (+ 17 других файлов) |
| expected | №1788 (+ 2 других файлов) |
| exportedMacros | №0918 |
| extensions | №0001 |
| external | №1811 |
| externalOrPackageGuidReferences | №1015 |
| extra | №1812 |
| extraClassName | №1810 |
| extraClassType | №1810 |
| extras | №1813 |
| extraTrigger | №1812 |
| fail | №0905 (+ 1 других файлов) |
| Fear | №1812 |
| feats | №1044 (+ 7 других файлов) |
| feature | №1711 (+ 1 других файлов) |
| features | №0001 (+ 3 других файлов) |
| femaleStackTerms | №0918 |
| feyAncestry | №1711 (+ 2 других файлов) |
| file | №1788 (+ 2 других файлов) |
| fileCount | №1859 |
| files | №1859 (+ 11 других файлов) |
| Fire | №1812 |
| fireResistance | №1711 (+ 2 других файлов) |
| firmness | №0918 |
| fixtureSha256 | №0918 (+ 1 других файлов) |
| flight | №1711 (+ 2 других файлов) |
| floor | №0751 (+ 3 других файлов) |
| floors | №0751 (+ 18 других файлов) |
| flow | №0905 |
| folder | №0086 (+ 3 других файлов) |
| folderCases | №1788 |
| folders | №1711 (+ 2 других файлов) |
| Font | №1028 |
| format | №1016 (+ 1 других файлов) |
| formula | №1812 |
| GameObject | №1028 |
| gem | №1812 |
| gender | №0918 (+ 3 других файлов) |
| generated | №1859 (+ 3 других файлов) |
| gitBlob | №0922 |
| glass | №1812 |
| glasswork | №1812 |
| glide | №1711 (+ 2 других файлов) |
| gp | №1788 |
| gPerE | №1788 |
| GraphicsSettings | №1028 |
| groupKey | №1788 (+ 1 других файлов) |
| h | №0751 (+ 17 других файлов) |
| Hallucination | №1812 |
| hands | №1788 (+ 1 других файлов) |
| hardwood | №1812 |
| head | №0086 (+ 1 других файлов) |
| head-decr | №0086 (+ 1 других файлов) |
| head-incr | №0086 (+ 1 других файлов) |
| height | №0751 (+ 21 других файлов) |
| Hemorrhage | №1812 |
| herb | №1812 |
| hero | №1788 |
| hips | №0911 (+ 2 других файлов) |
| history | №1711 (+ 2 других файлов) |
| hitDice | №1711 (+ 2 других файлов) |
| hitDie | №1711 (+ 1 других файлов) |
| horns | №1711 (+ 2 других файлов) |
| hpBonusPerLevel | №1711 (+ 1 других файлов) |
| hpCurrent | №1711 (+ 2 других файлов) |
| hpMax | №1711 (+ 2 других файлов) |
| human-female | №1355 |
| id | №0751 (+ 34 других файлов) |
| identity | №1811 |
| ids | №1813 |
| if | №1016 |
| image | №0001 |
| immunities | №1711 (+ 2 других файлов) |
| incomingUnityReferences | №1015 |
| indexComponentType | №0911 |
| ingredients | №1017 (+ 1 других файлов) |
| initiativeTracker | №1811 |
| ink | №1812 |
| innateSpellcasting | №1711 (+ 2 других файлов) |
| input | №1788 (+ 1 других файлов) |
| InputManager | №1028 |
| insight | №1711 (+ 2 других файлов) |
| int | №1711 (+ 2 других файлов) |
| integrity | №1112 |
| intelligence | №1711 (+ 2 других файлов) |
| intelligence_or_charisma | №1810 |
| intensity | №0751 (+ 17 других файлов) |
| interactive | №0757 (+ 1 других файлов) |
| intimidation | №1711 (+ 2 других файлов) |
| inventory | №1788 |
| inventoryCases | №1788 |
| inventoryCategory | №1812 |
| investigation | №1788 |
| Invisibility | №1812 |
| iron | №1812 |
| isExtra | №1810 |
| isExtraClass | №1810 |
| item | №1788 |
| items | №1016 (+ 3 других файлов) |
| jeweler | №1812 |
| jobId | №1026 |
| joints | №0918 (+ 2 других файлов) |
| JOINTS_0 | №0911 |
| junk | №1017 (+ 3 других файлов) |
| keep | №1788 |
| key | №1370 (+ 3 других файлов) |
| kind | №1859 (+ 1 других файлов) |
| known | №1811 |
| label | №1711 (+ 3 других файлов) |
| languages | №1711 (+ 1 других файлов) |
| leather | №1812 |
| leatherwork | №1812 |
| legacy | №0905 (+ 1 других файлов) |
| legacyApkInput | №1015 |
| legacyBinaryPublication | №1043 |
| legLength | №0086 (+ 1 других файлов) |
| legLength-decr | №0086 (+ 1 других файлов) |
| legLength-incr | №0086 (+ 1 других файлов) |
| legs | №0086 (+ 1 других файлов) |
| level | №1711 (+ 2 других файлов) |
| levelOneFeatures | №1711 (+ 1 других файлов) |
| library | №0751 (+ 16 других файлов) |
| license | №0086 (+ 5 других файлов) |
| licenseReview | №1015 |
| licenseSha256 | №1035 |
| Light | №1028 |
| lighting | №0751 (+ 17 других файлов) |
| lightIntensity | №0757 (+ 1 других файлов) |
| LightmapSettings | №1028 |
| lightRadius | №0757 (+ 1 других файлов) |
| limitations | №0086 (+ 3 других файлов) |
| localRuntimeTests | №0920 |
| lockfileVersion | №1112 |
| loot | №0751 (+ 1 других файлов) |
| lucky | №1711 (+ 2 других файлов) |
| macroConfigSha256 | №0918 |
| Magic | №1812 |
| magicResistance | №1711 (+ 2 других файлов) |
| main | №1015 (+ 1 других файлов) |
| manifest | №0905 (+ 1 других файлов) |
| mapId | №0751 (+ 13 других файлов) |
| maps | №1445 |
| markers | №1026 |
| matchesInApk | №1024 |
| material | №1711 (+ 1 других файлов) |
| Material | №1028 |
| materials | №0911 (+ 6 других файлов) |
| maxCapacityKg | №1788 |
| maxDisplacementMeters | №0918 (+ 1 других файлов) |
| maximum | №1016 |
| maxItems | №1016 |
| measure-thigh-circ-decr | №0086 (+ 1 других файлов) |
| measure-thigh-circ-incr | №0086 (+ 1 других файлов) |
| measure-upperarm-circ-decr | №0086 (+ 1 других файлов) |
| measure-upperarm-circ-incr | №0086 (+ 1 других файлов) |
| measurementsArtifact | №1026 |
| medicine | №1788 |
| mentalShield | №1711 (+ 2 других файлов) |
| Mesh | №1028 |
| meshes | №1094 |
| MeshFilter | №1028 |
| meshMetadata | №0911 |
| MeshRenderer | №1028 |
| metallicFactor | №0911 |
| method | №0086 (+ 1 других файлов) |
| MhObjectType | №0911 |
| MhScaleFactor | №0911 |
| migrationStatus | №1015 |
| mimicry | №1711 (+ 2 других файлов) |
| min | №1711 |
| minAppVersion | №1852 (+ 2 других файлов) |
| minClientVersionCode | №1017 |
| Mind | №1812 |
| minimalContentVerified | №1044 (+ 3 других файлов) |
| minimum | №1016 |
| minLength | №1016 |
| minStr | №1788 (+ 1 других файлов) |
| mithral | №1812 |
| model | №0751 (+ 18 других файлов) |
| models | №1370 (+ 1 других файлов) |
| modifiers | №1788 |
| MonoBehaviour | №1028 |
| MonoManager | №1028 |
| MonoScript | №1028 |
| morphNames | №0911 |
| MPFB_GEN_object_type | №0911 |
| MPFB_GEN_scale_factor | №0911 |
| MPFB_HUM_african | №0911 |
| MPFB_HUM_age | №0911 |
| MPFB_HUM_asian | №0911 |
| MPFB_HUM_caucasian | №0911 |
| MPFB_HUM_cupsize | №0911 |
| MPFB_HUM_firmness | №0911 |
| MPFB_HUM_gender | №0911 |
| MPFB_HUM_height | №0911 |
| MPFB_HUM_is_human_project | №0911 |
| MPFB_HUM_material_source | №0911 |
| MPFB_HUM_muscle | №0911 |
| MPFB_HUM_proportions | №0911 |
| MPFB_HUM_weight | №0911 |
| multiclassAllowed | №1810 |
| muscle | №0918 |
| n | №0751 (+ 17 других файлов) |
| name | №0001 (+ 37 других файлов) |
| nameRu | №1711 (+ 1 других файлов) |
| native | №1027 |
| nativeCommerce | №1044 |
| nativeLibraries | №1040 |
| naturalArmor | №1711 (+ 2 других файлов) |
| nature | №1788 |
| Nausea | №1812 |
| NavMeshProjectSettings | №1028 |
| NavMeshSettings | №1028 |
| Necrotic | №1812 |
| necroticResistance | №1711 (+ 2 других файлов) |
| negative | №0086 (+ 3 других файлов) |
| newPackages | №1017 |
| newSceneOverride | №1834 |
| nextAction | №0922 |
| nimbleEscape | №1711 (+ 2 других файлов) |
| noBreath | №1711 (+ 2 других файлов) |
| nonFiniteValues | №0911 |
| NORMAL | №0911 |
| noSleep | №1711 (+ 2 других файлов) |
| note | №1044 (+ 8 других файлов) |
| noteCase | №1788 |
| notes | №1102 (+ 2 других файлов) |
| nsis | №1097 |
| nTexture | №0751 (+ 17 других файлов) |
| objects | №0751 (+ 18 других файлов) |
| offset | №0086 (+ 2 других файлов) |
| oldApk | №1033 |
| oldUnity10005ApkBytes | №1044 (+ 5 других файлов) |
| omittedNonRenderingPngBytes | №1044 (+ 2 других файлов) |
| oneClick | №1097 |
| optionalMaterialMatches | №1040 |
| optionalTextureMatches | №1040 |
| options | №1711 (+ 1 других файлов) |
| origin | №1711 (+ 2 других файлов) |
| originalBrandingBytesVerified | №1044 (+ 5 других файлов) |
| originalBrandingPixelsVerified | №1044 (+ 2 других файлов) |
| originalBytes | №1033 |
| originalsDeleted | №1043 |
| ota_install_contract | №0907 |
| other | №1811 |
| output | №1097 |
| ownerId | №1811 |
| ownTurnId | №1811 |
| package | №1026 (+ 1 других файлов) |
| packagedBytes | №1030 |
| packagedSha256 | №1030 |
| packages | №1007 (+ 3 других файлов) |
| packedBytes | №1042 |
| packs | №1024 |
| packTactics | №1711 (+ 2 других файлов) |
| pages | №0922 |
| paid_api_authorized | №0002 |
| paper | №1812 |
| parchment | №1812 |
| parts | №1102 |
| pass | №0905 (+ 1 других файлов) |
| path | №1859 (+ 8 других файлов) |
| pathId | №1028 (+ 2 других файлов) |
| paths | №1015 |
| pattern | №1016 |
| pbrMetallicRoughness | №0911 |
| pectorals | №0086 (+ 1 других файлов) |
| pendingChoices | №1711 (+ 2 других файлов) |
| perception | №1711 (+ 2 других файлов) |
| Perception | №1812 |
| performance | №1711 (+ 2 других файлов) |
| perMachine | №1097 |
| persuasion | №1711 (+ 2 других файлов) |
| Petrification | №1812 |
| physical_android_test | №0907 |
| physicalAndroidQa | №1841 |
| physicalAndroidQA | №0905 (+ 3 других файлов) |
| physicalZIP | №0905 |
| Physics2DSettings | №1028 |
| PhysicsManager | №1028 |
| pixels | №0911 |
| pixelsIdentical | №1030 |
| platform | №1016 (+ 1 других файлов) |
| PlayerSettings | №1028 |
| poisonImmunity | №1711 (+ 2 других файлов) |
| poisonResistance | №1711 (+ 2 других файлов) |
| portable | №1097 |
| POSITION | №0911 |
| positive | №0086 (+ 3 других файлов) |
| postCreateCommand | №0001 |
| potency | №1812 (+ 1 других файлов) |
| pottery | №1812 |
| powerfulBuild | №1711 (+ 2 других файлов) |
| pp | №1788 |
| pPerG | №1788 |
| PreloadData | №1028 |
| prerequisite | №1711 |
| previous10007Bytes | №1025 |
| previous10008Bytes | №1029 |
| previousUnity10010ApkBytes | №1044 |
| price | №1812 |
| primaryLicenseUrls | №1035 |
| primitives | №0911 |
| private | №1097 (+ 1 других файлов) |
| productionSyntaxFiles | №0905 (+ 1 других файлов) |
| productName | №1097 |
| profBonus | №1711 (+ 2 других файлов) |
| profession | №1711 (+ 2 других файлов) |
| proficiencies | №1711 (+ 2 других файлов) |
| proficiency | №1788 |
| proficiencyType | №1788 (+ 1 других файлов) |
| profiles | №1813 |
| project | №0086 (+ 1 других файлов) |
| pronounced | №1156 |
| properties | №1016 (+ 3 других файлов) |
| proportions | №0918 |
| propTextureCount | №1044 (+ 5 других файлов) |
| propTextureDimensions | №1044 (+ 5 других файлов) |
| psychicResistance | №1711 (+ 2 других файлов) |
| publication | №0905 (+ 1 других файлов) |
| publicPackageBytes | №1044 |
| publicPackages | №1044 |
| publishedCopy | №1015 |
| purity | №1812 (+ 1 других файлов) |
| python | №1044 |
| QualitySettings | №1028 |
| quantity | №1812 |
| quota_scope | №0002 |
| race | №0918 |
| raceCraftBonuses | №1711 (+ 1 других файлов) |
| raceEntries | №1043 (+ 1 других файлов) |
| raceFamilies | №1043 (+ 1 других файлов) |
| raceFeatureDescriptions | №1711 (+ 2 других файлов) |
| raceHpBonusPerLevel | №1711 (+ 1 других файлов) |
| raceId | №1711 (+ 2 других файлов) |
| raceMechanics | №1711 (+ 2 других файлов) |
| raceName | №1711 (+ 2 других файлов) |
| races | №1044 (+ 5 других файлов) |
| Radiant | №1812 |
| radiantResistance | №1711 (+ 2 других файлов) |
| radius | №0751 (+ 17 других файлов) |
| range | №1711 (+ 1 других файлов) |
| rarity | №1788 (+ 2 других файлов) |
| rates | №1788 |
| rawArtwork | №1040 |
| rawBounds | №0911 |
| rawBranding | №1027 |
| reason | №1445 |
| recipes | №1017 (+ 1 других файлов) |
| recommendedSourceCommit | №0918 |
| Recovery | №1812 |
| RectTransform | №1028 |
| reductionBytes | №1044 (+ 5 других файлов) |
| reductionPercent | №1044 (+ 5 других файлов) |
| reductionVs10007Bytes | №1025 |
| reductionVs10008Bytes | №1029 |
| referenceCommit | №1035 |
| referencePath | №1035 |
| referenceRepository | №1035 |
| referenceSha256 | №1035 |
| Regeneration | №1812 |
| regression | №0905 (+ 1 других файлов) |
| release | №0920 |
| release_ready | №0002 |
| release_reason | №0002 |
| release_source_sha | №0002 |
| releaseCommit | №0905 (+ 1 других файлов) |
| releases | №1708 (+ 1 других файлов) |
| releaseType | №1101 |
| releaseUrl | №1034 (+ 1 других файлов) |
| relentlessEndurance | №1711 (+ 2 других файлов) |
| religion | №1711 (+ 2 других файлов) |
| removed | №1788 |
| RenderSettings | №1028 |
| repairable | №1711 (+ 2 других файлов) |
| replacesRace | №1810 |
| required | №1016 |
| required_editor_assets | №0907 |
| requiredAssets | №0751 (+ 13 других файлов) |
| requires | №1112 |
| resin | №1812 |
| resistanceDamageType | №1711 (+ 1 других файлов) |
| resistances | №1711 (+ 2 других файлов) |
| resolved | №1112 |
| resolvedUnityPackages | №1015 |
| ResourceManager | №1028 |
| resources | №1024 (+ 2 других файлов) |
| resultCp | №1788 |
| resultEp | №1788 |
| resultGp | №1788 |
| resultPp | №1788 |
| resultSp | №1788 |
| retainedChunks | №1030 |
| retry_after | №0002 |
| risk | №1813 |
| ritual | №1711 (+ 1 других файлов) |
| rmsDisplacementMeters | №0918 (+ 1 других файлов) |
| rootCause | №0905 |
| rotation | №0752 (+ 11 других файлов) |
| roughnessFactor | №0911 |
| runId | №1044 (+ 5 других файлов) |
| runtime | №0918 (+ 1 других файлов) |
| RuntimeInitializeOnLoadManager | №1028 |
| runtimeOTARegression | №0905 |
| runtimeStatus | №1034 |
| s | №0751 (+ 15 других файлов) |
| sameTreeDuplicates | №1015 |
| savageAttacks | №1711 (+ 2 других файлов) |
| savedBytes | №1030 |
| savesData | №1711 (+ 2 других файлов) |
| savingThrow | №1711 (+ 1 других файлов) |
| scale | №0086 (+ 19 других файлов) |
| schema | №0086 (+ 9 других файлов) |
| schemaVersion | №0751 (+ 18 других файлов) |
| school | №1711 (+ 1 других файлов) |
| scope | №1101 |
| scribe | №1812 |
| ScriptMapper | №1028 |
| scripts | №1097 (+ 1 других файлов) |
| seamDuplicates | №0911 |
| seamMaxMeters | №0918 (+ 1 других файлов) |
| searchable | №0751 (+ 11 других файлов) |
| seconds | №0905 (+ 1 других файлов) |
| seed | №1711 (+ 1 других файлов) |
| selectedTexture | №0751 (+ 17 других файлов) |
| selectedTool | №0751 (+ 17 других файлов) |
| selectedWallTexture | №0751 (+ 17 других файлов) |
| self | №1811 |
| serializedBytes | №1028 (+ 2 других файлов) |
| settings | №0001 |
| sha | №1102 |
| sha256 | №1859 (+ 20 других файлов) |
| Shader | №1028 |
| shapeshifter | №1711 (+ 2 других файлов) |
| sharedProperties | №1813 |
| shippedSha256 | №0918 (+ 1 других файлов) |
| shoulders | №0911 (+ 2 других файлов) |
| showAbove | №0751 (+ 1 других файлов) |
| showBelow | №0751 (+ 1 других файлов) |
| showCeilings | №0751 (+ 1 других файлов) |
| showEp | №1788 |
| showPp | №1788 |
| signatureVerification | №1033 |
| signedRelease | №0905 |
| signingCertificateSha256 | №1102 |
| silver | №1812 |
| size | №1711 (+ 2 других файлов) |
| sizeChoice | №1711 (+ 2 других файлов) |
| skillBonuses | №1711 (+ 2 других файлов) |
| skills | №1711 (+ 2 других файлов) |
| skillsData | №1711 (+ 2 других файлов) |
| skins | №0911 |
| sky | №0752 (+ 9 других файлов) |
| slash | №0755 (+ 1 других файлов) |
| slashTexture | №0755 (+ 1 других файлов) |
| Sleep | №1812 |
| sleightOfHand | №1711 (+ 2 других файлов) |
| smith | №1812 |
| somatic | №1711 (+ 1 других файлов) |
| source | №0086 (+ 15 других файлов) |
| sourceByteEquality | №1033 |
| sourceBytes | №1030 (+ 1 других файлов) |
| sourceCodeNeverDownloaded | №1017 |
| sourceCommit | №1044 (+ 7 других файлов) |
| sourceFileCount | №1034 |
| sourceGlbSha256 | №0918 |
| sourceHashes | №0086 (+ 2 других файлов) |
| sourceId | №1811 |
| sourcePixelsModified | №1014 |
| sourceProject | №0918 |
| sourceRefs | №1015 |
| sourceRelease | №1033 |
| sources | №0918 (+ 4 других файлов) |
| sourceSha256 | №0918 (+ 4 других файлов) |
| sourceStackTerms | №0918 |
| sp | №1788 |
| special | №1812 |
| speed | №1711 (+ 2 других файлов) |
| Speed | №1812 |
| speedFt | №1711 (+ 2 других файлов) |
| spells | №1711 (+ 1 других файлов) |
| spellsData | №1711 (+ 2 других файлов) |
| spellSlotsData | №1711 (+ 2 других файлов) |
| sPerG | №1788 |
| spiderClimb | №1711 (+ 2 других файлов) |
| Sprite | №1028 |
| stability | №1812 (+ 1 других файлов) |
| Stability | №1812 |
| stableVersion | №0905 (+ 1 других файлов) |
| stacked | №1788 |
| stage | №0920 |
| stairDirection | №0751 (+ 3 других файлов) |
| stairFrom | №0751 (+ 3 других файлов) |
| stairsTo | №0752 (+ 5 других файлов) |
| stairTo | №0751 (+ 3 других файлов) |
| stat | №1711 (+ 2 других файлов) |
| statBonus | №1711 |
| statGenerationMode | №1711 (+ 2 других файлов) |
| statRollsUsed | №1711 (+ 2 других файлов) |
| stats | №1711 (+ 2 других файлов) |
| status | №0905 (+ 9 других файлов) |
| stealth | №1711 (+ 2 других файлов) |
| stealthDisadvantage | №1788 (+ 1 других файлов) |
| steel | №1812 |
| steps | №0751 (+ 3 других файлов) |
| sTexture | №0751 (+ 15 других файлов) |
| stoneEndurance | №1711 (+ 2 других файлов) |
| str | №1711 (+ 2 других файлов) |
| StreamingManager | №1028 |
| strength | №1711 (+ 2 других файлов) |
| Strength | №1812 |
| subclass | №1711 (+ 2 других файлов) |
| sunlightSensitivity | №1711 (+ 2 других файлов) |
| survival | №1711 (+ 2 других файлов) |
| swim | №1711 (+ 2 других файлов) |
| synergies | №1813 |
| synergy | №1812 |
| T_Trim_Cloth_BaseColor | №1021 (+ 1 других файлов) |
| T_Trim_Cloth_Normal | №1021 (+ 1 других файлов) |
| T_Trim_Cloth_ORM | №1021 (+ 1 других файлов) |
| T_Trim_Furniture_BaseColor | №1021 (+ 1 других файлов) |
| T_Trim_Furniture_Normal | №1021 (+ 1 других файлов) |
| T_Trim_Furniture_ORM | №1021 (+ 1 других файлов) |
| T_Trim_Metal_BaseColor | №1021 (+ 1 других файлов) |
| T_Trim_Metal_Normal | №1021 (+ 1 других файлов) |
| T_Trim_Metal_ORM | №1021 (+ 1 других файлов) |
| T_Trim_Props_BaseColor | №1021 (+ 1 других файлов) |
| T_Trim_Props_Normal | №1021 (+ 1 других файлов) |
| T_Trim_Props_ORM | №1021 (+ 1 других файлов) |
| tag | №1035 |
| TagManager | №1028 |
| tags | №0751 (+ 14 других файлов) |
| target | №1097 (+ 1 других файлов) |
| targetId | №1811 |
| targets | №0086 (+ 4 других файлов) |
| tarotDamageTotals | №1811 |
| tarotKnowledge | №1811 |
| tarotLastStartedTurn | №1811 |
| telepathy | №1711 (+ 2 других файлов) |
| templatePinStates | №1834 |
| test | №1113 |
| testApkArtifact | №1044 |
| TEXCOORD_0 | №0911 |
| text | №1788 (+ 1 других файлов) |
| TextAsset | №1028 |
| Texture2D | №1028 |
| textureFormat | №1028 (+ 2 других файлов) |
| textures | №1445 |
| then | №1016 |
| thread | №1812 |
| tiles | №0751 (+ 18 других файлов) |
| time | №1788 (+ 1 других файлов) |
| TimeManager | №1028 |
| title | №1016 (+ 2 других файлов) |
| toHit | №1788 (+ 1 других файлов) |
| tokenArt | №1810 |
| tokenReady | №1810 |
| tokens | №0751 (+ 18 других файлов) |
| toolAliases | №1812 |
| toolLabels | №1812 |
| toolProficiencies | №1711 (+ 1 других файлов) |
| tools | №1812 |
| topology | №0911 |
| torso-muscle-pectoral-decr | №0086 (+ 1 других файлов) |
| torso-muscle-pectoral-incr | №0086 (+ 1 других файлов) |
| totals | №1788 |
| totalWeightKg | №1788 |
| Transform | №1028 |
| triangles | №0911 |
| trunk | №1711 (+ 2 других файлов) |
| turnIds | №1811 |
| type | №0751 (+ 28 других файлов) |
| typeCounts | №1028 |
| typeKey | №1788 (+ 1 других файлов) |
| unchanged | №0918 (+ 1 других файлов) |
| undeadResilience | №1711 (+ 2 других файлов) |
| uniqueItems | №1016 |
| uniqueOriginalFiles | №1033 |
| uniquePositions | №0911 |
| unity-branch | №1015 |
| unityCopiedSha256 | №1035 |
| unityGuidEdges | №1015 |
| unityInclusion | №1015 |
| unityPyVersion | №1028 |
| unityVersion | №1016 (+ 1 других файлов) |
| unknown | №1788 (+ 1 других файлов) |
| unstable | №1813 |
| untouched | №1788 |
| updateManifest | №1102 |
| url | №1007 (+ 12 других файлов) |
| userAdded | №1834 |
| uvOutsideUnitSquare | №0911 |
| uvRange | №0911 |
| value | №1788 |
| Venom | №1812 |
| verbal | №1711 (+ 1 других файлов) |
| version | №0001 (+ 45 других файлов) |
| versionCode | №0905 (+ 12 других файлов) |
| vertexCount | №0086 (+ 1 других файлов) |
| vertices | №0911 (+ 3 других файлов) |
| VFXManager | №1028 |
| view | №0751 (+ 17 других файлов) |
| Vitality | №1812 |
| volatility | №1812 (+ 1 других файлов) |
| Volatility | №1812 |
| vscode | №0001 |
| w | №0751 (+ 17 других файлов) |
| waist | №0911 (+ 2 других файлов) |
| walkable | №0751 (+ 3 других файлов) |
| walls | №0751 (+ 18 других файлов) |
| wax | №1812 |
| Weakness | №1812 |
| weapons | №1017 (+ 3 других файлов) |
| weaponsData | №1711 (+ 2 других файлов) |
| weaponTraining | №1711 (+ 2 других файлов) |
| weaver | №1812 |
| weight | №0086 (+ 6 других файлов) |
| weightCases | №1788 |
| weightHero | №1788 |
| WEIGHTS_0 | №0911 |
| weightSumMaxError | №0911 |
| weightTotal | №1788 |
| weldedBoundaryEdges | №0911 |
| weldedNonManifoldEdges | №0911 |
| weldTolerance | №0911 |
| width | №0751 (+ 20 других файлов) |
| win | №1097 |
| windows | №1014 (+ 2 других файлов) |
| windowsBundleBuilt | №1026 |
| wis | №1711 (+ 2 других файлов) |
| wisdom | №1711 (+ 2 других файлов) |
| wood | №1812 |
| woodwork | №1812 |
| workflows | №0905 (+ 1 других файлов) |
| workingTreeStatus | №1015 |
| wTexture | №0751 (+ 15 других файлов) |
| x | №0751 (+ 18 других файлов) |
| y | №0751 (+ 17 других файлов) |
| z | №0751 (+ 17 других файлов) |
| zeroWeightVertices | №0911 |
| zip | №0922 |
| zip_crc_and_all_entry_sha256 | №0907 |
| zip_sha256 | №0907 |
| zipCompressedBrandingBytes | №1044 (+ 5 других файлов) |
| zipCompressedNativeBytes | №1044 (+ 5 других файлов) |
| zipCompressedUnityDataBytes | №1044 (+ 5 других файлов) |
| zipSha256 | №0905 (+ 1 других файлов) |
| zones | №0751 (+ 17 других файлов) |

## Файлы с совпадающим Git SHA

Совпадение содержимого не означает, что путь можно удалить.

- unity/Assets/StreamingAssets/Branding/Dragon20.png ; unity/Assets/Vtt/Resources/Branding/Dragon20.png ; wallpapers/20.png
- unity/Assets/StreamingAssets/Branding/Splash19.png ; unity/Assets/Vtt/Resources/Branding/Splash19.png ; wallpapers/19.png
- unity/Assets/StreamingAssets/Branding/Wallpaper16.jpg ; unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg ; wallpapers/16.png
- .github/scripts/.gitignore ; unity/ci/.gitignore
- app/assets/3d/quaternius/models/Bag.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin
- app/assets/3d/quaternius/models/Barrel.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin
- app/assets/3d/quaternius/models/Barrel_Apples.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin
- app/assets/3d/quaternius/models/Bed_Twin1.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin
- app/assets/3d/quaternius/models/Bench.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin
- app/assets/3d/quaternius/models/Book_Stack_2.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin
- app/assets/3d/quaternius/models/Bookcase_2.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin
- app/assets/3d/quaternius/models/Bottle_1.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin
- app/assets/3d/quaternius/models/CandleStick_Triple.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin
- app/assets/3d/quaternius/models/Candle_2.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin
- app/assets/3d/quaternius/models/Chair_1.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin
- app/assets/3d/quaternius/models/Chalice.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin
- app/assets/3d/quaternius/models/Chandelier.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin
- app/assets/3d/quaternius/models/Chest_Wood.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin
- app/assets/3d/quaternius/models/Coin.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin
- app/assets/3d/quaternius/models/Mug.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin
- app/assets/3d/quaternius/models/Pouch_Large.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin
- app/assets/3d/quaternius/models/Rope_1.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin
- app/assets/3d/quaternius/models/Shelf_Simple.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin
- app/assets/3d/quaternius/models/Stool.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin
- app/assets/3d/quaternius/models/Table_Fork.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin
- app/assets/3d/quaternius/models/Table_Knife.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin
- app/assets/3d/quaternius/models/Table_Large.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin
- app/assets/3d/quaternius/models/Table_Plate.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin
- app/assets/3d/quaternius/models/Table_Spoon.bin ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin
- app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png
- app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png
- app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png
- app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png
- app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png
- app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png
- app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png
- app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png
- app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png
- app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png
- app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png
- app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png ; unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png
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
- app/data/maps/3d_castle_black_rose_v740030.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json
- app/data/maps/3d_castle_v740019.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json
- app/data/maps/3d_house_v740019.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json
- app/data/maps/3d_stress_v740026.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json
- app/data/maps/3d_tavern_v740019.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json
- app/data/maps/3d_test_dungeon.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json
- app/data/maps/3d_town_v740019.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json
- app/data/maps/3d_village_v740019.json ; unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json
- floor_ceramic_tile_dark.png ; unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png
- floor_ceramic_tile_light.png ; unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png
- floor_checker_tile.png ; unity/Assets/LegacyContent/Source/floor_checker_tile.png
- floor_cobblestone.png ; unity/Assets/LegacyContent/Source/floor_cobblestone.png
- floor_earth.png ; unity/Assets/LegacyContent/Source/floor_earth.png
- floor_grass.png ; unity/Assets/LegacyContent/Source/floor_grass.png
- floor_hex_tile.png ; unity/Assets/LegacyContent/Source/floor_hex_tile.png
- floor_marble_dark.png ; unity/Assets/LegacyContent/Source/floor_marble_dark.png
- floor_marble_light.png ; unity/Assets/LegacyContent/Source/floor_marble_light.png
- floor_parquet_herringbone.png ; unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png
- floor_rug_blue.png ; unity/Assets/LegacyContent/Source/floor_rug_blue.png
- floor_rug_green.png ; unity/Assets/LegacyContent/Source/floor_rug_green.png
- floor_rug_red.png ; unity/Assets/LegacyContent/Source/floor_rug_red.png
- floor_stone_tile_dark.png ; unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png
- floor_stone_tile_light.png ; unity/Assets/LegacyContent/Source/floor_stone_tile_light.png
- floor_tatami.png ; unity/Assets/LegacyContent/Source/floor_tatami.png
- floor_wood_dark.png ; unity/Assets/LegacyContent/Source/floor_wood_dark.png
- floor_wood_light.png ; unity/Assets/LegacyContent/Source/floor_wood_light.png
- unity/Assets/LegacyContent/Source/wall_brick_red.png ; wall_brick_red.png
- unity/Assets/LegacyContent/Source/wall_concrete.png ; wall_concrete.png
- unity/Assets/LegacyContent/Source/wall_half_timber.png ; wall_half_timber.png
- unity/Assets/LegacyContent/Source/wall_marble_dark.png ; wall_marble_dark.png
- unity/Assets/LegacyContent/Source/wall_marble_light.png ; wall_marble_light.png
- unity/Assets/LegacyContent/Source/wall_moss_stone.png ; wall_moss_stone.png
- unity/Assets/LegacyContent/Source/wall_old_plaster.png ; wall_old_plaster.png
- unity/Assets/LegacyContent/Source/wall_plaster_dark.png ; wall_plaster_dark.png
- unity/Assets/LegacyContent/Source/wall_plaster_light.png ; wall_plaster_light.png
- unity/Assets/LegacyContent/Source/wall_plaster_panel.png ; wall_plaster_panel.png
- unity/Assets/LegacyContent/Source/wall_slate.png ; wall_slate.png
- unity/Assets/LegacyContent/Source/wall_stone_dark.png ; wall_stone_dark.png
- unity/Assets/LegacyContent/Source/wall_stone_light.png ; wall_stone_light.png
- unity/Assets/LegacyContent/Source/wall_stone_masonry.png ; wall_stone_masonry.png
- unity/Assets/LegacyContent/Source/wall_wallpaper.png ; wall_wallpaper.png
- unity/Assets/LegacyContent/Source/wall_white_plaster.png ; wall_white_plaster.png
- unity/Assets/LegacyContent/Source/wall_wood_dark.png ; wall_wood_dark.png
- unity/Assets/LegacyContent/Source/wall_wood_light.png ; wall_wood_light.png
- unity/Assets/Vtt/Resources/Changelog.json ; updates/unity-changelog.json

## Обновление индекса

После изменения проекта выполнить node tools/generate_project_atlas.cjs и коммитить обе версии.

