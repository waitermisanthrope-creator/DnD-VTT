# DnD-VTT — полный атлас проекта

Снимок кода addb23fce351. Git содержит 2398 файлов.
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
| №0005 .github/scripts/publish-unity-artifacts.py | 12464 B | вспомогательный файл: publish unity artifacts |
| №0006 .github/scripts/test_unity_render_review.py | 964 B | вспомогательный файл: test unity render review |
| №0007 .github/scripts/test-publish-unity-artifacts.py | 3695 B | вспомогательный файл: test publish unity artifacts |
| №0008 .github/scripts/unity-navigation-diagnostic.ps1 | 3024 B | вспомогательный файл: unity navigation diagnostic |
| №0009 .github/scripts/unity-navigation-physical.ps1 | 12192 B | вспомогательный файл: unity navigation physical |
| №0010 .github/workflows/android-debug.yml | 4175 B | автоматизация GitHub Actions: android debug |
| №0011 .github/workflows/android-release.yml | 8160 B | автоматизация GitHub Actions: android release |
| №0012 .github/workflows/autonomous-development.yml | 4534 B | автоматизация GitHub Actions: autonomous development |
| №0013 .github/workflows/build-windows-desktop.yml | 1449 B | автоматизация GitHub Actions: build windows desktop |
| №0014 .github/workflows/cloud-test-build.yml | 3468 B | автоматизация GitHub Actions: cloud test build |
| №0015 .github/workflows/convert-remaining-furniture.yml | 1964 B | автоматизация GitHub Actions: convert remaining furniture |
| №0016 .github/workflows/deploy-pages.yml | 3633 B | автоматизация GitHub Actions: deploy pages |
| №0017 .github/workflows/human-glb-audit.yml | 931 B | автоматизация GitHub Actions: human glb audit |
| №0018 .github/workflows/import-root-furniture.yml | 3572 B | автоматизация GitHub Actions: import root furniture |
| №0019 .github/workflows/map-ui-stage-qa.yml | 776 B | автоматизация GitHub Actions: map ui stage qa |
| №0020 .github/workflows/project-atlas.yml | 953 B | автоматическое обновление атласа на GitHub |
| №0021 .github/workflows/publish-stress-map-ota.yml | 455 B | автоматизация GitHub Actions: publish stress map ota |
| №0022 .github/workflows/refresh-update-manifest.yml | 540 B | автоматизация GitHub Actions: refresh update manifest |
| №0023 .github/workflows/test-gltf-loader.yml | 717 B | автоматизация GitHub Actions: test gltf loader |
| №0024 .github/workflows/test-stair-navigation.yml | 752 B | автоматизация GitHub Actions: test stair navigation |
| №0025 .github/workflows/unified-release.yml | 14076 B | автоматизация GitHub Actions: unified release |
| №0026 .github/workflows/unity-android-update-publish.yml | 5157 B | автоматизация GitHub Actions: unity android update publish |
| №0027 .github/workflows/unity-brand-visual-contract.yml | 877 B | автоматизация GitHub Actions: unity brand visual contract |
| №0028 .github/workflows/unity-cloud-candidate.yml | 17234 B | автоматизация GitHub Actions: unity cloud candidate |
| №0029 .github/workflows/unity-cloud-promote.yml | 5696 B | автоматизация GitHub Actions: unity cloud promote |
| №0030 .github/workflows/unity-delivery-publish.yml | 872 B | автоматизация GitHub Actions: unity delivery publish |
| №0031 .github/workflows/unity-experiment-android.yml | 2708 B | автоматизация GitHub Actions: unity experiment android |
| №0032 .github/workflows/unity-navigation-diagnostic.yml | 2426 B | автоматизация GitHub Actions: unity navigation diagnostic |
| №0033 .github/workflows/unity-retained-apk-audit.yml | 1749 B | автоматизация GitHub Actions: unity retained apk audit |
| №0034 .github/workflows/unpack-project.yml | 2987 B | автоматизация GitHub Actions: unpack project |
| №0035 .github/workflows/validate-imported-glb.yml | 2317 B | автоматизация GitHub Actions: validate imported glb |
| №0036 .gitignore | 81 B | вспомогательный файл: .gitignore |
| №0037 00_AI_PROJECT_GUIDE.md | 1108812 B | существующее руководство ИИ, не перезаписывать |
| №0038 01_plansforproject.md | 73050 B | план целей и критериев выполнения |
| №0039 1790622696215.png | 1202179 B | текстура/изображение: 1790622696215 |
| №0040 1790622844831.png | 104000 B | текстура/изображение: 1790622844831 |
| №0041 1790718758545.png | 1889164 B | текстура/изображение: 1790718758545 |
| №0042 1790788500741.png | 1468216 B | текстура/изображение: 1790788500741 |
| №0043 3D_CHARACTER_CLOTHING_PROGRESS.md | 84856 B | документация или отчёт: 3D CHARACTER CLOTHING PROGRESS |
| №0044 3D_CHARACTER_RACES_PROGRESS.md | 75599 B | документация или отчёт: 3D CHARACTER RACES PROGRESS |
| №0045 AGENTS.md | 8151 B | документация или отчёт: AGENTS |
| №0046 AI_BLOCKERS.md | 145343 B | документация или отчёт: AI BLOCKERS |
| №0047 AI_NEXT_TASK.md | 183841 B | документация или отчёт: AI NEXT TASK |
| №0048 AI_PROGRESS.md | 223178 B | документация или отчёт: AI PROGRESS |
| №0049 android/.gitignore | 44 B | Android компонент: .gitignore |
| №0050 android/app/build.gradle | 4122 B | Android компонент: build |
| №0051 android/app/src/main/AndroidManifest.xml | 12250 B | Android компонент: AndroidManifest |
| №0052 android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java | 34871 B | Android: bridge обновлений |
| №0053 android/app/src/main/java/com/dndvtt/app/MainActivity.java | 7574 B | Android: запуск WebView |
| №0054 android/app/src/main/res/values-v31/styles.xml | 527 B | Android компонент: styles |
| №0055 android/app/src/main/res/values/styles.xml | 407 B | Android компонент: styles |
| №0056 android/build.gradle | 73 B | Android компонент: build |
| №0057 android/gradle.properties | 106 B | Android компонент: gradle |
| №0058 android/README.md | 685 B | документация или отчёт: README |
| №0059 android/settings.gradle | 333 B | Android компонент: settings |
| №0060 app/3dmap/assets/clothing/fantasy-materials.webp | 434234 B | компонент 3D карты/редактора: fantasy materials |
| №0061 app/3dmap/assets/clothing/lingerie-nylon.webp | 289830 B | компонент 3D карты/редактора: lingerie nylon |
| №0062 app/3dmap/character_anatomy_geometry.js | 22797 B | компонент 3D карты/редактора: character anatomy geometry |
| №0063 app/3dmap/character_anatomy.js | 8424 B | компонент 3D карты/редактора: character anatomy |
| №0064 app/3dmap/character_appearance_store.js | 2619 B | компонент 3D карты/редактора: character appearance store |
| №0065 app/3dmap/character_body_geometry.js | 120619 B | компонент 3D карты/редактора: character body geometry |
| №0066 app/3dmap/character_clothing.js | 51618 B | компонент 3D карты/редактора: character clothing |
| №0067 app/3dmap/character_editor_3d.js | 166537 B | компонент 3D карты/редактора: character editor 3d |
| №0068 app/3dmap/character_morph_assets.js | 3322 B | компонент 3D карты/редактора: character morph assets |
| №0069 app/3dmap/character_pose.js | 4749 B | компонент 3D карты/редактора: character pose |
| №0070 app/3dmap/character_system.js | 49923 B | компонент 3D карты/редактора: character system |
| №0071 app/3dmap/gltf_catalog.js | 90502 B | компонент 3D карты/редактора: gltf catalog |
| №0072 app/3dmap/gltf_character_pipeline.js | 7811 B | компонент 3D карты/редактора: gltf character pipeline |
| №0073 app/3dmap/gltf_loader.js | 10027 B | компонент 3D карты/редактора: gltf loader |
| №0074 app/3dmap/map_editor.js | 45829 B | компонент 3D карты/редактора: map editor |
| №0075 app/3dmap/map_model.js | 7783 B | компонент 3D карты/редактора: map model |
| №0076 app/3dmap/map_renderer_2d.js | 7331 B | компонент 3D карты/редактора: map renderer 2d |
| №0077 app/3dmap/map_renderer_3d.js | 23969 B | компонент 3D карты/редактора: map renderer 3d |
| №0078 app/3dmap/map_world.js | 9119 B | компонент 3D карты/редактора: map world |
| №0079 app/3dmap/stair_navigation.js | 932 B | компонент 3D карты/редактора: stair navigation |
| №0080 app/3dmap/stress_map.js | 3272 B | компонент 3D карты/редактора: stress map |
| №0081 app/accursed_oap_v11_runtime.js | 31365 B | логический модуль: accursed oap v11 runtime |
| №0082 app/alchemist_mhp_2024_runtime.js | 140155 B | логический модуль: alchemist mhp 2024 runtime |
| №0083 app/alchemy_engine_v29.js | 40901 B | логический модуль: alchemy engine v29 |
| №0084 app/alchemy_gameplay_v30.js | 17859 B | логический модуль: alchemy gameplay v30 |
| №0085 app/alchemy_gathering_professions_v52.js | 11833 B | логический модуль: alchemy gathering professions v52 |
| №0086 app/Ambiences.js | 14648 B | логический модуль: Ambiences |
| №0087 app/app.js | 37183 B | главный контроллер; currentChar и все персонажи |
| №0088 app/armors.js | 27349 B | логический модуль: armors |
| №0089 app/assets/3d/makehuman/editor-morphs.bin | 2340320 B | ассет графики/3D/интерфейса: editor morphs |
| №0090 app/assets/3d/makehuman/editor-morphs.json | 11573 B | ассет графики/3D/интерфейса: editor morphs |
| №0091 app/assets/3d/makehuman/human-body-morphs.glb | 12671780 B | ассет графики/3D/интерфейса: human body morphs |
| №0092 app/assets/3d/makehuman/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №0093 app/assets/3d/makehuman/materials/skin_color_detail_v1.png | 2922380 B | ассет графики/3D/интерфейса: skin color detail v1 |
| №0094 app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png | 22965 B | ассет графики/3D/интерфейса: skin micro normal roughness |
| №0095 app/assets/3d/makehuman/README.md | 1510 B | документация или отчёт: README |
| №0096 app/assets/3d/makehuman/skins/young_caucasian_female/young_caucasian_female.mhmat | 1464 B | ассет графики/3D/интерфейса: young caucasian female |
| №0097 app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png | 4391156 B | ассет графики/3D/интерфейса: young lightskinned female diffuse |
| №0098 app/assets/3d/makehuman/skins/young_caucasian_male/young_caucasian_male.mhmat | 1462 B | ассет графики/3D/интерфейса: young caucasian male |
| №0099 app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png | 3693828 B | ассет графики/3D/интерфейса: young lightskinned male diffuse |
| №0100 app/assets/3d/quaternius/models/Anvil_Log.bin | 130880 B | ассет графики/3D/интерфейса: Anvil Log |
| №0101 app/assets/3d/quaternius/models/Anvil_Log.gltf | 5580 B | ассет графики/3D/интерфейса: Anvil Log |
| №0102 app/assets/3d/quaternius/models/Anvil.bin | 24020 B | ассет графики/3D/интерфейса: Anvil |
| №0103 app/assets/3d/quaternius/models/Anvil.gltf | 3189 B | ассет графики/3D/интерфейса: Anvil |
| №0104 app/assets/3d/quaternius/models/Axe_Bronze.bin | 31156 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0105 app/assets/3d/quaternius/models/Axe_Bronze.gltf | 2591 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0106 app/assets/3d/quaternius/models/Bag.bin | 27188 B | ассет графики/3D/интерфейса: Bag |
| №0107 app/assets/3d/quaternius/models/Bag.gltf | 4318 B | ассет графики/3D/интерфейса: Bag |
| №0108 app/assets/3d/quaternius/models/Banner_1_Cloth.bin | 6636 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0109 app/assets/3d/quaternius/models/Banner_1_Cloth.gltf | 4670 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0110 app/assets/3d/quaternius/models/Banner_1.bin | 20976 B | ассет графики/3D/интерфейса: Banner 1 |
| №0111 app/assets/3d/quaternius/models/Banner_1.gltf | 6789 B | ассет графики/3D/интерфейса: Banner 1 |
| №0112 app/assets/3d/quaternius/models/Banner_2_Cloth.bin | 4940 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0113 app/assets/3d/quaternius/models/Banner_2_Cloth.gltf | 4671 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0114 app/assets/3d/quaternius/models/Banner_2.bin | 19280 B | ассет графики/3D/интерфейса: Banner 2 |
| №0115 app/assets/3d/quaternius/models/Banner_2.gltf | 6788 B | ассет графики/3D/интерфейса: Banner 2 |
| №0116 app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0117 app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6241 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0118 app/assets/3d/quaternius/models/Barrel_Holder.bin | 161816 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0119 app/assets/3d/quaternius/models/Barrel_Holder.gltf | 4347 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0120 app/assets/3d/quaternius/models/Barrel.bin | 57144 B | ассет графики/3D/интерфейса: Barrel |
| №0121 app/assets/3d/quaternius/models/Barrel.gltf | 4311 B | ассет графики/3D/интерфейса: Barrel |
| №0122 app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0123 app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0124 app/assets/3d/quaternius/models/Bed_Twin2.bin | 76624 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0125 app/assets/3d/quaternius/models/Bed_Twin2.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0126 app/assets/3d/quaternius/models/Bench.bin | 19304 B | ассет графики/3D/интерфейса: Bench |
| №0127 app/assets/3d/quaternius/models/Bench.gltf | 4298 B | ассет графики/3D/интерфейса: Bench |
| №0128 app/assets/3d/quaternius/models/Book_5.bin | 5856 B | ассет графики/3D/интерфейса: Book 5 |
| №0129 app/assets/3d/quaternius/models/Book_5.gltf | 2403 B | ассет графики/3D/интерфейса: Book 5 |
| №0130 app/assets/3d/quaternius/models/Book_7.bin | 32664 B | ассет графики/3D/интерфейса: Book 7 |
| №0131 app/assets/3d/quaternius/models/Book_7.gltf | 4290 B | ассет графики/3D/интерфейса: Book 7 |
| №0132 app/assets/3d/quaternius/models/Book_Simplified_Single.bin | 3192 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0133 app/assets/3d/quaternius/models/Book_Simplified_Single.gltf | 2428 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0134 app/assets/3d/quaternius/models/Book_Stack_1.bin | 12768 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0135 app/assets/3d/quaternius/models/Book_Stack_1.gltf | 2418 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0136 app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0137 app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4309 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0138 app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0139 app/assets/3d/quaternius/models/Bookcase_2.gltf | 4329 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0140 app/assets/3d/quaternius/models/BookGroup_Medium_1.bin | 25536 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0141 app/assets/3d/quaternius/models/BookGroup_Medium_1.gltf | 2429 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0142 app/assets/3d/quaternius/models/BookGroup_Medium_2.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0143 app/assets/3d/quaternius/models/BookGroup_Medium_2.gltf | 2431 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0144 app/assets/3d/quaternius/models/BookGroup_Medium_3.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0145 app/assets/3d/quaternius/models/BookGroup_Medium_3.gltf | 2432 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0146 app/assets/3d/quaternius/models/BookGroup_Small_1.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0147 app/assets/3d/quaternius/models/BookGroup_Small_1.gltf | 2423 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0148 app/assets/3d/quaternius/models/BookGroup_Small_2.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0149 app/assets/3d/quaternius/models/BookGroup_Small_2.gltf | 2426 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0150 app/assets/3d/quaternius/models/BookGroup_Small_3.bin | 7980 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0151 app/assets/3d/quaternius/models/BookGroup_Small_3.gltf | 2424 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0152 app/assets/3d/quaternius/models/BookStand.bin | 62020 B | ассет графики/3D/интерфейса: BookStand |
| №0153 app/assets/3d/quaternius/models/BookStand.gltf | 2223 B | ассет графики/3D/интерфейса: BookStand |
| №0154 app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0155 app/assets/3d/quaternius/models/Bottle_1.gltf | 2413 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0156 app/assets/3d/quaternius/models/Bucket_Metal.bin | 18824 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0157 app/assets/3d/quaternius/models/Bucket_Metal.gltf | 2206 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0158 app/assets/3d/quaternius/models/Bucket_Wooden_1.bin | 32544 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0159 app/assets/3d/quaternius/models/Bucket_Wooden_1.gltf | 3911 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0160 app/assets/3d/quaternius/models/Cabinet.bin | 114768 B | ассет графики/3D/интерфейса: Cabinet |
| №0161 app/assets/3d/quaternius/models/Cabinet.gltf | 4324 B | ассет графики/3D/интерфейса: Cabinet |
| №0162 app/assets/3d/quaternius/models/Cage_Small.bin | 171848 B | ассет графики/3D/интерфейса: Cage Small |
| №0163 app/assets/3d/quaternius/models/Cage_Small.gltf | 2207 B | ассет графики/3D/интерфейса: Cage Small |
| №0164 app/assets/3d/quaternius/models/Candle_1.bin | 6200 B | ассет графики/3D/интерфейса: Candle 1 |
| №0165 app/assets/3d/quaternius/models/Candle_1.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 1 |
| №0166 app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | ассет графики/3D/интерфейса: Candle 2 |
| №0167 app/assets/3d/quaternius/models/Candle_2.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 2 |
| №0168 app/assets/3d/quaternius/models/CandleStick_Stand.bin | 226228 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0169 app/assets/3d/quaternius/models/CandleStick_Stand.gltf | 4347 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0170 app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0171 app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 3900 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0172 app/assets/3d/quaternius/models/CandleStick.bin | 21436 B | ассет графики/3D/интерфейса: CandleStick |
| №0173 app/assets/3d/quaternius/models/CandleStick.gltf | 2199 B | ассет графики/3D/интерфейса: CandleStick |
| №0174 app/assets/3d/quaternius/models/Carrot.bin | 22244 B | ассет графики/3D/интерфейса: Carrot |
| №0175 app/assets/3d/quaternius/models/Carrot.gltf | 2411 B | ассет графики/3D/интерфейса: Carrot |
| №0176 app/assets/3d/quaternius/models/Cauldron.bin | 62712 B | ассет графики/3D/интерфейса: Cauldron |
| №0177 app/assets/3d/quaternius/models/Cauldron.gltf | 2195 B | ассет графики/3D/интерфейса: Cauldron |
| №0178 app/assets/3d/quaternius/models/Chain_Coil.bin | 193664 B | ассет графики/3D/интерфейса: Chain Coil |
| №0179 app/assets/3d/quaternius/models/Chain_Coil.gltf | 2424 B | ассет графики/3D/интерфейса: Chain Coil |
| №0180 app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | ассет графики/3D/интерфейса: Chair 1 |
| №0181 app/assets/3d/quaternius/models/Chair_1.gltf | 4312 B | ассет графики/3D/интерфейса: Chair 1 |
| №0182 app/assets/3d/quaternius/models/Chalice.bin | 15644 B | ассет графики/3D/интерфейса: Chalice |
| №0183 app/assets/3d/quaternius/models/Chalice.gltf | 2197 B | ассет графики/3D/интерфейса: Chalice |
| №0184 app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | ассет графики/3D/интерфейса: Chandelier |
| №0185 app/assets/3d/quaternius/models/Chandelier.gltf | 6259 B | ассет графики/3D/интерфейса: Chandelier |
| №0186 app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | ассет графики/3D/интерфейса: Chest Wood |
| №0187 app/assets/3d/quaternius/models/Chest_Wood.gltf | 21402 B | ассет графики/3D/интерфейса: Chest Wood |
| №0188 app/assets/3d/quaternius/models/Coin_Pile_2.bin | 52612 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0189 app/assets/3d/quaternius/models/Coin_Pile_2.gltf | 2429 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0190 app/assets/3d/quaternius/models/Coin_Pile.bin | 47520 B | ассет графики/3D/интерфейса: Coin Pile |
| №0191 app/assets/3d/quaternius/models/Coin_Pile.gltf | 2424 B | ассет графики/3D/интерфейса: Coin Pile |
| №0192 app/assets/3d/quaternius/models/Coin.bin | 14464 B | ассет графики/3D/интерфейса: Coin |
| №0193 app/assets/3d/quaternius/models/Coin.gltf | 2408 B | ассет графики/3D/интерфейса: Coin |
| №0194 app/assets/3d/quaternius/models/Crate_Metal.bin | 126828 B | ассет графики/3D/интерфейса: Crate Metal |
| №0195 app/assets/3d/quaternius/models/Crate_Metal.gltf | 4335 B | ассет графики/3D/интерфейса: Crate Metal |
| №0196 app/assets/3d/quaternius/models/Crate_Wooden.bin | 66496 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0197 app/assets/3d/quaternius/models/Crate_Wooden.gltf | 4412 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0198 app/assets/3d/quaternius/models/Dummy.bin | 80988 B | ассет графики/3D/интерфейса: Dummy |
| №0199 app/assets/3d/quaternius/models/Dummy.gltf | 5570 B | ассет графики/3D/интерфейса: Dummy |
| №0200 app/assets/3d/quaternius/models/FarmCrate_Apple.bin | 134488 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0201 app/assets/3d/quaternius/models/FarmCrate_Apple.gltf | 6263 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0202 app/assets/3d/quaternius/models/FarmCrate_Carrot.bin | 204292 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0203 app/assets/3d/quaternius/models/FarmCrate_Carrot.gltf | 6273 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0204 app/assets/3d/quaternius/models/FarmCrate_Empty.bin | 54704 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0205 app/assets/3d/quaternius/models/FarmCrate_Empty.gltf | 3915 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0206 app/assets/3d/quaternius/models/Key_Gold.bin | 58636 B | ассет графики/3D/интерфейса: Key Gold |
| №0207 app/assets/3d/quaternius/models/Key_Gold.gltf | 2424 B | ассет графики/3D/интерфейса: Key Gold |
| №0208 app/assets/3d/quaternius/models/Key_Metal.bin | 19340 B | ассет графики/3D/интерфейса: Key Metal |
| №0209 app/assets/3d/quaternius/models/Key_Metal.gltf | 2197 B | ассет графики/3D/интерфейса: Key Metal |
| №0210 app/assets/3d/quaternius/models/Lantern_Wall.bin | 120036 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0211 app/assets/3d/quaternius/models/Lantern_Wall.gltf | 2203 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0212 app/assets/3d/quaternius/models/Mug.bin | 12488 B | ассет графики/3D/интерфейса: Mug |
| №0213 app/assets/3d/quaternius/models/Mug.gltf | 3881 B | ассет графики/3D/интерфейса: Mug |
| №0214 app/assets/3d/quaternius/models/Nightstand_Shelf.bin | 21412 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0215 app/assets/3d/quaternius/models/Nightstand_Shelf.gltf | 2447 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0216 app/assets/3d/quaternius/models/Peg_Rack.bin | 26672 B | ассет графики/3D/интерфейса: Peg Rack |
| №0217 app/assets/3d/quaternius/models/Peg_Rack.gltf | 3879 B | ассет графики/3D/интерфейса: Peg Rack |
| №0218 app/assets/3d/quaternius/models/Pickaxe_Bronze.bin | 30736 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0219 app/assets/3d/quaternius/models/Pickaxe_Bronze.gltf | 2425 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0220 app/assets/3d/quaternius/models/Pot_1_Lid.bin | 46120 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0221 app/assets/3d/quaternius/models/Pot_1_Lid.gltf | 2196 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0222 app/assets/3d/quaternius/models/Pot_1.bin | 37160 B | ассет графики/3D/интерфейса: Pot 1 |
| №0223 app/assets/3d/quaternius/models/Pot_1.gltf | 2185 B | ассет графики/3D/интерфейса: Pot 1 |
| №0224 app/assets/3d/quaternius/models/Potion_1.bin | 18200 B | ассет графики/3D/интерфейса: Potion 1 |
| №0225 app/assets/3d/quaternius/models/Potion_1.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 1 |
| №0226 app/assets/3d/quaternius/models/Potion_2.bin | 19672 B | ассет графики/3D/интерфейса: Potion 2 |
| №0227 app/assets/3d/quaternius/models/Potion_2.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 2 |
| №0228 app/assets/3d/quaternius/models/Potion_4.bin | 22536 B | ассет графики/3D/интерфейса: Potion 4 |
| №0229 app/assets/3d/quaternius/models/Potion_4.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 4 |
| №0230 app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | ассет графики/3D/интерфейса: Pouch Large |
| №0231 app/assets/3d/quaternius/models/Pouch_Large.gltf | 4306 B | ассет графики/3D/интерфейса: Pouch Large |
| №0232 app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | ассет графики/3D/интерфейса: Rope 1 |
| №0233 app/assets/3d/quaternius/models/Rope_1.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 1 |
| №0234 app/assets/3d/quaternius/models/Rope_2.bin | 34904 B | ассет графики/3D/интерфейса: Rope 2 |
| №0235 app/assets/3d/quaternius/models/Rope_2.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 2 |
| №0236 app/assets/3d/quaternius/models/Rope_3.bin | 41624 B | ассет графики/3D/интерфейса: Rope 3 |
| №0237 app/assets/3d/quaternius/models/Rope_3.gltf | 2225 B | ассет графики/3D/интерфейса: Rope 3 |
| №0238 app/assets/3d/quaternius/models/Scroll_1.bin | 20112 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0239 app/assets/3d/quaternius/models/Scroll_1.gltf | 3954 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0240 app/assets/3d/quaternius/models/Scroll_2.bin | 28392 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0241 app/assets/3d/quaternius/models/Scroll_2.gltf | 3968 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0242 app/assets/3d/quaternius/models/Shelf_Arch.bin | 64836 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0243 app/assets/3d/quaternius/models/Shelf_Arch.gltf | 4332 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0244 app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0245 app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2224 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0246 app/assets/3d/quaternius/models/Shelf_Small_Bottles.bin | 229484 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0247 app/assets/3d/quaternius/models/Shelf_Small_Bottles.gltf | 6266 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0248 app/assets/3d/quaternius/models/Shield_Wooden.bin | 64184 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0249 app/assets/3d/quaternius/models/Shield_Wooden.gltf | 6243 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0250 app/assets/3d/quaternius/models/SmallBottle.bin | 5700 B | ассет графики/3D/интерфейса: SmallBottle |
| №0251 app/assets/3d/quaternius/models/SmallBottle.gltf | 2392 B | ассет графики/3D/интерфейса: SmallBottle |
| №0252 app/assets/3d/quaternius/models/SmallBottles_1.bin | 20556 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0253 app/assets/3d/quaternius/models/SmallBottles_1.gltf | 2423 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0254 app/assets/3d/quaternius/models/Stall_Cart_Empty.bin | 237264 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0255 app/assets/3d/quaternius/models/Stall_Cart_Empty.gltf | 6857 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0256 app/assets/3d/quaternius/models/Stall_Empty.bin | 88176 B | ассет графики/3D/интерфейса: Stall Empty |
| №0257 app/assets/3d/quaternius/models/Stall_Empty.gltf | 6804 B | ассет графики/3D/интерфейса: Stall Empty |
| №0258 app/assets/3d/quaternius/models/Stool.bin | 11472 B | ассет графики/3D/интерфейса: Stool |
| №0259 app/assets/3d/quaternius/models/Stool.gltf | 2423 B | ассет графики/3D/интерфейса: Stool |
| №0260 app/assets/3d/quaternius/models/Sword_Bronze.bin | 69920 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0261 app/assets/3d/quaternius/models/Sword_Bronze.gltf | 2436 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0262 app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | ассет графики/3D/интерфейса: Table Fork |
| №0263 app/assets/3d/quaternius/models/Table_Fork.gltf | 2189 B | ассет графики/3D/интерфейса: Table Fork |
| №0264 app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | ассет графики/3D/интерфейса: Table Knife |
| №0265 app/assets/3d/quaternius/models/Table_Knife.gltf | 2186 B | ассет графики/3D/интерфейса: Table Knife |
| №0266 app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | ассет графики/3D/интерфейса: Table Large |
| №0267 app/assets/3d/quaternius/models/Table_Large.gltf | 4316 B | ассет графики/3D/интерфейса: Table Large |
| №0268 app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | ассет графики/3D/интерфейса: Table Plate |
| №0269 app/assets/3d/quaternius/models/Table_Plate.gltf | 2199 B | ассет графики/3D/интерфейса: Table Plate |
| №0270 app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | ассет графики/3D/интерфейса: Table Spoon |
| №0271 app/assets/3d/quaternius/models/Table_Spoon.gltf | 2191 B | ассет графики/3D/интерфейса: Table Spoon |
| №0272 app/assets/3d/quaternius/models/Torch_Metal.bin | 39100 B | ассет графики/3D/интерфейса: Torch Metal |
| №0273 app/assets/3d/quaternius/models/Torch_Metal.gltf | 2203 B | ассет графики/3D/интерфейса: Torch Metal |
| №0274 app/assets/3d/quaternius/models/Vase_2.bin | 21188 B | ассет графики/3D/интерфейса: Vase 2 |
| №0275 app/assets/3d/quaternius/models/Vase_2.gltf | 2407 B | ассет графики/3D/интерфейса: Vase 2 |
| №0276 app/assets/3d/quaternius/models/Vase_4.bin | 22028 B | ассет графики/3D/интерфейса: Vase 4 |
| №0277 app/assets/3d/quaternius/models/Vase_4.gltf | 2412 B | ассет графики/3D/интерфейса: Vase 4 |
| №0278 app/assets/3d/quaternius/models/Vase_Rubble_Medium.bin | 85960 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0279 app/assets/3d/quaternius/models/Vase_Rubble_Medium.gltf | 2453 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0280 app/assets/3d/quaternius/models/WeaponStand.bin | 76312 B | ассет графики/3D/интерфейса: WeaponStand |
| №0281 app/assets/3d/quaternius/models/WeaponStand.gltf | 3903 B | ассет графики/3D/интерфейса: WeaponStand |
| №0282 app/assets/3d/quaternius/models/Whetstone.bin | 59280 B | ассет графики/3D/интерфейса: Whetstone |
| №0283 app/assets/3d/quaternius/models/Whetstone.gltf | 6212 B | ассет графики/3D/интерфейса: Whetstone |
| №0284 app/assets/3d/quaternius/models/Workbench_Drawers.bin | 16824 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0285 app/assets/3d/quaternius/models/Workbench_Drawers.gltf | 4313 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0286 app/assets/3d/quaternius/models/Workbench.bin | 63408 B | ассет графики/3D/интерфейса: Workbench |
| №0287 app/assets/3d/quaternius/models/Workbench.gltf | 4318 B | ассет графики/3D/интерфейса: Workbench |
| №0288 app/assets/3d/quaternius/textures/T_Page_Noise.png | 7486734 B | ассет графики/3D/интерфейса: T Page Noise |
| №0289 app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png | 1936754 B | ассет графики/3D/интерфейса: T Trim Cloth BaseColor |
| №0290 app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png | 3920858 B | ассет графики/3D/интерфейса: T Trim Cloth Normal |
| №0291 app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png | 623426 B | ассет графики/3D/интерфейса: T Trim Cloth ORM |
| №0292 app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png | 2232961 B | ассет графики/3D/интерфейса: T Trim Furniture BaseColor |
| №0293 app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png | 3485710 B | ассет графики/3D/интерфейса: T Trim Furniture Normal |
| №0294 app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png | 2064585 B | ассет графики/3D/интерфейса: T Trim Furniture ORM |
| №0295 app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png | 1361221 B | ассет графики/3D/интерфейса: T Trim Metal BaseColor |
| №0296 app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png | 3625541 B | ассет графики/3D/интерфейса: T Trim Metal Normal |
| №0297 app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png | 1871475 B | ассет графики/3D/интерфейса: T Trim Metal ORM |
| №0298 app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png | 2263132 B | ассет графики/3D/интерфейса: T Trim Props BaseColor |
| №0299 app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png | 4441458 B | ассет графики/3D/интерфейса: T Trim Props Normal |
| №0300 app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png | 3017151 B | ассет графики/3D/интерфейса: T Trim Props ORM |
| №0301 app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp | 510226 B | ассет графики/3D/интерфейса: bird contour feathers v1 |
| №0302 app/assets/3d/race_surfaces/flight-feather-vane-v1.webp | 555662 B | ассет графики/3D/интерфейса: flight feather vane v1 |
| №0303 app/assets/3d/race_surfaces/mammal-underfur-v1.webp | 544064 B | ассет графики/3D/интерфейса: mammal underfur v1 |
| №0304 app/assets/3d/race_surfaces/reptile-scales-v1.webp | 730360 B | ассет графики/3D/интерфейса: reptile scales v1 |
| №0305 app/assets/3d/user_furniture/altar_table.glb | 36228 B | ассет графики/3D/интерфейса: altar table |
| №0306 app/assets/3d/user_furniture/apothecary_jar_shelf.glb | 106668 B | ассет графики/3D/интерфейса: apothecary jar shelf |
| №0307 app/assets/3d/user_furniture/apothecary_shelf.glb | 107148 B | ассет графики/3D/интерфейса: apothecary shelf |
| №0308 app/assets/3d/user_furniture/armour_stand.glb | 16340 B | ассет графики/3D/интерфейса: armour stand |
| №0309 app/assets/3d/user_furniture/banner_pole.glb | 17136 B | ассет графики/3D/интерфейса: banner pole |
| №0310 app/assets/3d/user_furniture/bed.glb | 5718760 B | ассет графики/3D/интерфейса: bed |
| №0311 app/assets/3d/user_furniture/book_chest.glb | 45816 B | ассет графики/3D/интерфейса: book chest |
| №0312 app/assets/3d/user_furniture/book_press.glb | 59492 B | ассет графики/3D/интерфейса: book press |
| №0313 app/assets/3d/user_furniture/bookshelf.glb | 7818348 B | ассет графики/3D/интерфейса: bookshelf |
| №0314 app/assets/3d/user_furniture/bread_oven.glb | 45200 B | ассет графики/3D/интерфейса: bread oven |
| №0315 app/assets/3d/user_furniture/brewhouse_tun.glb | 68616 B | ассет графики/3D/интерфейса: brewhouse tun |
| №0316 app/assets/3d/user_furniture/candle_stand.glb | 21372 B | ассет графики/3D/интерфейса: candle stand |
| №0317 app/assets/3d/user_furniture/chained_library_desk.glb | 190612 B | ассет графики/3D/интерфейса: chained library desk |
| №0318 app/assets/3d/user_furniture/chair.glb | 4643004 B | ассет графики/3D/интерфейса: chair |
| №0319 app/assets/3d/user_furniture/closet.glb | 6550260 B | ассет графики/3D/интерфейса: closet |
| №0320 app/assets/3d/user_furniture/commode.glb | 4845868 B | ассет графики/3D/интерфейса: commode |
| №0321 app/assets/3d/user_furniture/cooking_cauldron.glb | 34300 B | ассет графики/3D/интерфейса: cooking cauldron |
| №0322 app/assets/3d/user_furniture/crate_stack.glb | 39644 B | ассет графики/3D/интерфейса: crate stack |
| №0323 app/assets/3d/user_furniture/dormitory_cot.glb | 70976 B | ассет графики/3D/интерфейса: dormitory cot |
| №0324 app/assets/3d/user_furniture/finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: finished codex |
| №0325 app/assets/3d/user_furniture/gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: gold leaf cushion |
| №0326 app/assets/3d/user_furniture/hand_cart.glb | 75012 B | ассет графики/3D/интерфейса: hand cart |
| №0327 app/assets/3d/user_furniture/hanging_oil_lamp.glb | 50924 B | ассет графики/3D/интерфейса: hanging oil lamp |
| №0328 app/assets/3d/user_furniture/hitching_post.glb | 22232 B | ассет графики/3D/интерфейса: hitching post |
| №0329 app/assets/3d/user_furniture/human-base-rigged.glb | 4994640 B | ассет графики/3D/интерфейса: human base rigged |
| №0330 app/assets/3d/user_furniture/infirmary_cot.glb | 71696 B | ассет графики/3D/интерфейса: infirmary cot |
| №0331 app/assets/3d/user_furniture/kitchen_hearth.glb | 38460 B | ассет графики/3D/интерфейса: kitchen hearth |
| №0332 app/assets/3d/user_furniture/lamp_post.glb | 16960 B | ассет графики/3D/интерфейса: lamp post |
| №0333 app/assets/3d/user_furniture/loom.glb | 46728 B | ассет графики/3D/интерфейса: loom |
| №0334 app/assets/3d/user_furniture/manuscript_in_progress.glb | 153128 B | ассет графики/3D/интерфейса: manuscript in progress |
| №0335 app/assets/3d/user_furniture/monastery_altar_table.glb | 36248 B | ассет графики/3D/интерфейса: monastery altar table |
| №0336 app/assets/3d/user_furniture/monastery_apothecary_jar_shelf.glb | 106620 B | ассет графики/3D/интерфейса: monastery apothecary jar shelf |
| №0337 app/assets/3d/user_furniture/monastery_bell_tower_section.glb | 456868 B | ассет графики/3D/интерфейса: monastery bell tower section |
| №0338 app/assets/3d/user_furniture/monastery_book_chest.glb | 45320 B | ассет графики/3D/интерфейса: monastery book chest |
| №0339 app/assets/3d/user_furniture/monastery_book_press.glb | 59492 B | ассет графики/3D/интерфейса: monastery book press |
| №0340 app/assets/3d/user_furniture/monastery_bread_oven.glb | 45296 B | ассет графики/3D/интерфейса: monastery bread oven |
| №0341 app/assets/3d/user_furniture/monastery_brewhouse_tun.glb | 68216 B | ассет графики/3D/интерфейса: monastery brewhouse tun |
| №0342 app/assets/3d/user_furniture/monastery_candle_stand.glb | 21376 B | ассет графики/3D/интерфейса: monastery candle stand |
| №0343 app/assets/3d/user_furniture/monastery_censer.glb | 49336 B | ассет графики/3D/интерфейса: monastery censer |
| №0344 app/assets/3d/user_furniture/monastery_chained_library_desk.glb | 148408 B | ассет графики/3D/интерфейса: monastery chained library desk |
| №0345 app/assets/3d/user_furniture/monastery_chapel_screen.glb | 333728 B | ассет графики/3D/интерфейса: monastery chapel screen |
| №0346 app/assets/3d/user_furniture/monastery_chapter_house_bay.glb | 151904 B | ассет графики/3D/интерфейса: monastery chapter house bay |
| №0347 app/assets/3d/user_furniture/monastery_cloister_arcade_bay.glb | 130972 B | ассет графики/3D/интерфейса: monastery cloister arcade bay |
| №0348 app/assets/3d/user_furniture/monastery_cloister_arcade_corner.glb | 73924 B | ассет графики/3D/интерфейса: monastery cloister arcade corner |
| №0349 app/assets/3d/user_furniture/monastery_cloister_garth_lawn.glb | 13732 B | ассет графики/3D/интерфейса: monastery cloister garth lawn |
| №0350 app/assets/3d/user_furniture/monastery_cloister_lean_to_roof.glb | 18724 B | ассет графики/3D/интерфейса: monastery cloister lean to roof |
| №0351 app/assets/3d/user_furniture/monastery_cloister_vault_section.glb | 73928 B | ассет графики/3D/интерфейса: monastery cloister vault section |
| №0352 app/assets/3d/user_furniture/monastery_cloister_well.glb | 41568 B | ассет графики/3D/интерфейса: monastery cloister well |
| №0353 app/assets/3d/user_furniture/monastery_compost_bay.glb | 55596 B | ассет графики/3D/интерфейса: monastery compost bay |
| №0354 app/assets/3d/user_furniture/monastery_cooking_cauldron.glb | 33800 B | ассет графики/3D/интерфейса: monastery cooking cauldron |
| №0355 app/assets/3d/user_furniture/monastery_dormitory_cot.glb | 54832 B | ассет графики/3D/интерфейса: monastery dormitory cot |
| №0356 app/assets/3d/user_furniture/monastery_finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: monastery finished codex |
| №0357 app/assets/3d/user_furniture/monastery_flagstone_floor_slab.glb | 9900 B | ассет графики/3D/интерфейса: monastery flagstone floor slab |
| №0358 app/assets/3d/user_furniture/monastery_gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: monastery gold leaf cushion |
| №0359 app/assets/3d/user_furniture/monastery_hand_cart.glb | 86864 B | ассет графики/3D/интерфейса: monastery hand cart |
| №0360 app/assets/3d/user_furniture/monastery_hanging_oil_lamp.glb | 47156 B | ассет графики/3D/интерфейса: monastery hanging oil lamp |
| №0361 app/assets/3d/user_furniture/monastery_herb_garden_bed.glb | 94584 B | ассет графики/3D/интерфейса: monastery herb garden bed |
| №0362 app/assets/3d/user_furniture/monastery_hung_bell.glb | 40368 B | ассет графики/3D/интерфейса: monastery hung bell |
| №0363 app/assets/3d/user_furniture/monastery_infirmary_cot.glb | 71700 B | ассет графики/3D/интерфейса: monastery infirmary cot |
| №0364 app/assets/3d/user_furniture/monastery_kitchen_hearth.glb | 37972 B | ассет графики/3D/интерфейса: monastery kitchen hearth |
| №0365 app/assets/3d/user_furniture/monastery_manuscript_in_progress.glb | 153132 B | ассет графики/3D/интерфейса: monastery manuscript in progress |
| №0366 app/assets/3d/user_furniture/monastery_monastery_buttress.glb | 18440 B | ассет графики/3D/интерфейса: monastery monastery buttress |
| №0367 app/assets/3d/user_furniture/monastery_monastery_door_bay.glb | 87284 B | ассет графики/3D/интерфейса: monastery monastery door bay |
| №0368 app/assets/3d/user_furniture/monastery_monastery_lancet_window_bay.glb | 64048 B | ассет графики/3D/интерфейса: monastery monastery lancet window bay |
| №0369 app/assets/3d/user_furniture/monastery_monastery_wall_bay.glb | 29336 B | ассет графики/3D/интерфейса: monastery monastery wall bay |
| №0370 app/assets/3d/user_furniture/monastery_monks_chest.glb | 30432 B | ассет графики/3D/интерфейса: monastery monks chest |
| №0371 app/assets/3d/user_furniture/monastery_mortar_and_pestle_set.glb | 31476 B | ассет графики/3D/интерфейса: monastery mortar and pestle set |
| №0372 app/assets/3d/user_furniture/monastery_parchment_stretching_frame.glb | 66292 B | ассет графики/3D/интерфейса: monastery parchment stretching frame |
| №0373 app/assets/3d/user_furniture/monastery_physic_bench.glb | 46424 B | ассет графики/3D/интерфейса: monastery physic bench |
| №0374 app/assets/3d/user_furniture/monastery_pigment_tray.glb | 42180 B | ассет графики/3D/интерфейса: monastery pigment tray |
| №0375 app/assets/3d/user_furniture/monastery_quill_and_inkhorn_set.glb | 36912 B | ассет графики/3D/интерфейса: monastery quill and inkhorn set |
| №0376 app/assets/3d/user_furniture/monastery_rain_water_butt.glb | 45160 B | ассет графики/3D/интерфейса: monastery rain water butt |
| №0377 app/assets/3d/user_furniture/monastery_readers_pulpit.glb | 70796 B | ассет графики/3D/интерфейса: monastery readers pulpit |
| №0378 app/assets/3d/user_furniture/monastery_reading_lectern.glb | 48744 B | ассет графики/3D/интерфейса: monastery reading lectern |
| №0379 app/assets/3d/user_furniture/monastery_refectory_bench.glb | 20408 B | ассет графики/3D/интерфейса: monastery refectory bench |
| №0380 app/assets/3d/user_furniture/monastery_refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: monastery refectory long table |
| №0381 app/assets/3d/user_furniture/monastery_reliquary_casket.glb | 59680 B | ассет графики/3D/интерфейса: monastery reliquary casket |
| №0382 app/assets/3d/user_furniture/monastery_ruling_board.glb | 98044 B | ассет графики/3D/интерфейса: monastery ruling board |
| №0383 app/assets/3d/user_furniture/monastery_rush_light_stand.glb | 19044 B | ассет графики/3D/интерфейса: monastery rush light stand |
| №0384 app/assets/3d/user_furniture/monastery_scribes_stool.glb | 19900 B | ассет графики/3D/интерфейса: monastery scribes stool |
| №0385 app/assets/3d/user_furniture/monastery_sloped_writing_desk.glb | 247044 B | ассет графики/3D/интерфейса: monastery sloped writing desk |
| №0386 app/assets/3d/user_furniture/monastery_stone_drain.glb | 12360 B | ассет графики/3D/интерфейса: monastery stone drain |
| №0387 app/assets/3d/user_furniture/monastery_stone_font.glb | 55200 B | ассет графики/3D/интерфейса: monastery stone font |
| №0388 app/assets/3d/user_furniture/monastery_stone_stair_vice.glb | 130164 B | ассет графики/3D/интерфейса: monastery stone stair vice |
| №0389 app/assets/3d/user_furniture/monastery_tomb_slab.glb | 47852 B | ассет графики/3D/интерфейса: monastery tomb slab |
| №0390 app/assets/3d/user_furniture/monastery_trestle_table.glb | 39912 B | ассет графики/3D/интерфейса: monastery trestle table |
| №0391 app/assets/3d/user_furniture/monastery_wall_torch_bracket.glb | 38324 B | ассет графики/3D/интерфейса: monastery wall torch bracket |
| №0392 app/assets/3d/user_furniture/monastery_wood_stack.glb | 71140 B | ассет графики/3D/интерфейса: monastery wood stack |
| №0393 app/assets/3d/user_furniture/monks_chest.glb | 30508 B | ассет графики/3D/интерфейса: monks chest |
| №0394 app/assets/3d/user_furniture/mortar_pestle.glb | 31516 B | ассет графики/3D/интерфейса: mortar pestle |
| №0395 app/assets/3d/user_furniture/nature_birch_leaning.glb | 14804 B | ассет графики/3D/интерфейса: nature birch leaning |
| №0396 app/assets/3d/user_furniture/nature_birch_mature.glb | 15636 B | ассет графики/3D/интерфейса: nature birch mature |
| №0397 app/assets/3d/user_furniture/nature_birch_young.glb | 13980 B | ассет графики/3D/интерфейса: nature birch young |
| №0398 app/assets/3d/user_furniture/nature_boulder_large.glb | 6660 B | ассет графики/3D/интерфейса: nature boulder large |
| №0399 app/assets/3d/user_furniture/nature_boulder_medium.glb | 6192 B | ассет графики/3D/интерфейса: nature boulder medium |
| №0400 app/assets/3d/user_furniture/nature_boulder_mossy.glb | 24232 B | ассет графики/3D/интерфейса: nature boulder mossy |
| №0401 app/assets/3d/user_furniture/nature_boulder_small.glb | 4760 B | ассет графики/3D/интерфейса: nature boulder small |
| №0402 app/assets/3d/user_furniture/nature_bush_berry.glb | 12316 B | ассет графики/3D/интерфейса: nature bush berry |
| №0403 app/assets/3d/user_furniture/nature_bush_flat.glb | 5980 B | ассет графики/3D/интерфейса: nature bush flat |
| №0404 app/assets/3d/user_furniture/nature_bush_flowering.glb | 16248 B | ассет графики/3D/интерфейса: nature bush flowering |
| №0405 app/assets/3d/user_furniture/nature_bush_round.glb | 5152 B | ассет графики/3D/интерфейса: nature bush round |
| №0406 app/assets/3d/user_furniture/nature_bush_tall.glb | 5968 B | ассет графики/3D/интерфейса: nature bush tall |
| №0407 app/assets/3d/user_furniture/nature_cliff_block.glb | 29492 B | ассет графики/3D/интерфейса: nature cliff block |
| №0408 app/assets/3d/user_furniture/nature_dead_snag_short.glb | 8596 B | ассет графики/3D/интерфейса: nature dead snag short |
| №0409 app/assets/3d/user_furniture/nature_dead_snag_tall.glb | 16784 B | ассет графики/3D/интерфейса: nature dead snag tall |
| №0410 app/assets/3d/user_furniture/nature_fern_clump.glb | 29024 B | ассет графики/3D/интерфейса: nature fern clump |
| №0411 app/assets/3d/user_furniture/nature_fern_single.glb | 13176 B | ассет графики/3D/интерфейса: nature fern single |
| №0412 app/assets/3d/user_furniture/nature_flower_red.glb | 12412 B | ассет графики/3D/интерфейса: nature flower red |
| №0413 app/assets/3d/user_furniture/nature_flower_yellow.glb | 12216 B | ассет графики/3D/интерфейса: nature flower yellow |
| №0414 app/assets/3d/user_furniture/nature_grass_tuft_tall.glb | 6628 B | ассет графики/3D/интерфейса: nature grass tuft tall |
| №0415 app/assets/3d/user_furniture/nature_hedge_block.glb | 2444 B | ассет графики/3D/интерфейса: nature hedge block |
| №0416 app/assets/3d/user_furniture/nature_meadow_disc.glb | 8780 B | ассет графики/3D/интерфейса: nature meadow disc |
| №0417 app/assets/3d/user_furniture/nature_mushroom_group.glb | 39600 B | ассет графики/3D/интерфейса: nature mushroom group |
| №0418 app/assets/3d/user_furniture/nature_oak_ancient.glb | 292756 B | ассет графики/3D/интерфейса: nature oak ancient |
| №0419 app/assets/3d/user_furniture/nature_oak_mature.glb | 279624 B | ассет графики/3D/интерфейса: nature oak mature |
| №0420 app/assets/3d/user_furniture/nature_oak_sapling.glb | 266084 B | ассет графики/3D/интерфейса: nature oak sapling |
| №0421 app/assets/3d/user_furniture/nature_oak_young.glb | 266536 B | ассет графики/3D/интерфейса: nature oak young |
| №0422 app/assets/3d/user_furniture/nature_palm_leaning.glb | 50808 B | ассет графики/3D/интерфейса: nature palm leaning |
| №0423 app/assets/3d/user_furniture/nature_palm_mature.glb | 57076 B | ассет графики/3D/интерфейса: nature palm mature |
| №0424 app/assets/3d/user_furniture/nature_palm_young.glb | 37688 B | ассет графики/3D/интерфейса: nature palm young |
| №0425 app/assets/3d/user_furniture/nature_pebble_cluster.glb | 12184 B | ассет графики/3D/интерфейса: nature pebble cluster |
| №0426 app/assets/3d/user_furniture/nature_pine_columnar.glb | 265888 B | ассет графики/3D/интерфейса: nature pine columnar |
| №0427 app/assets/3d/user_furniture/nature_pine_sapling.glb | 264192 B | ассет графики/3D/интерфейса: nature pine sapling |
| №0428 app/assets/3d/user_furniture/nature_pine_spreading.glb | 265024 B | ассет графики/3D/интерфейса: nature pine spreading |
| №0429 app/assets/3d/user_furniture/nature_pine_windswept.glb | 265012 B | ассет графики/3D/интерфейса: nature pine windswept |
| №0430 app/assets/3d/user_furniture/nature_rock_pile.glb | 11840 B | ассет графики/3D/интерфейса: nature rock pile |
| №0431 app/assets/3d/user_furniture/nature_root_cluster.glb | 18436 B | ассет графики/3D/интерфейса: nature root cluster |
| №0432 app/assets/3d/user_furniture/nature_sapling_pair.glb | 267912 B | ассет графики/3D/интерфейса: nature sapling pair |
| №0433 app/assets/3d/user_furniture/nature_slab_flat.glb | 2744 B | ассет графики/3D/интерфейса: nature slab flat |
| №0434 app/assets/3d/user_furniture/nature_slab_upright.glb | 2484 B | ассет графики/3D/интерфейса: nature slab upright |
| №0435 app/assets/3d/user_furniture/nature_stump_mossy.glb | 6616 B | ассет графики/3D/интерфейса: nature stump mossy |
| №0436 app/assets/3d/user_furniture/nature_stump_oak.glb | 273776 B | ассет графики/3D/интерфейса: nature stump oak |
| №0437 app/assets/3d/user_furniture/nature_stump_pine.glb | 261388 B | ассет графики/3D/интерфейса: nature stump pine |
| №0438 app/assets/3d/user_furniture/nature_topiary_cone.glb | 7524 B | ассет графики/3D/интерфейса: nature topiary cone |
| №0439 app/assets/3d/user_furniture/parchment_stretching_frame.glb | 55508 B | ассет графики/3D/интерфейса: parchment stretching frame |
| №0440 app/assets/3d/user_furniture/physic_bench.glb | 60316 B | ассет графики/3D/интерфейса: physic bench |
| №0441 app/assets/3d/user_furniture/pigment_tray.glb | 39864 B | ассет графики/3D/интерфейса: pigment tray |
| №0442 app/assets/3d/user_furniture/quill_inkhorn_set.glb | 36956 B | ассет графики/3D/интерфейса: quill inkhorn set |
| №0443 app/assets/3d/user_furniture/rain_water_butt.glb | 45168 B | ассет графики/3D/интерфейса: rain water butt |
| №0444 app/assets/3d/user_furniture/range_and_oven.glb | 19732 B | ассет графики/3D/интерфейса: range and oven |
| №0445 app/assets/3d/user_furniture/reading_lectern.glb | 48844 B | ассет графики/3D/интерфейса: reading lectern |
| №0446 app/assets/3d/user_furniture/refectory_bench.glb | 20560 B | ассет графики/3D/интерфейса: refectory bench |
| №0447 app/assets/3d/user_furniture/refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: refectory long table |
| №0448 app/assets/3d/user_furniture/reliquary_casket.glb | 59728 B | ассет графики/3D/интерфейса: reliquary casket |
| №0449 app/assets/3d/user_furniture/road_signpost.glb | 8044 B | ассет графики/3D/интерфейса: road signpost |
| №0450 app/assets/3d/user_furniture/rug.glb | 16540 B | ассет графики/3D/интерфейса: rug |
| №0451 app/assets/3d/user_furniture/ruling_board.glb | 98032 B | ассет графики/3D/интерфейса: ruling board |
| №0452 app/assets/3d/user_furniture/rush_light_stand.glb | 19052 B | ассет графики/3D/интерфейса: rush light stand |
| №0453 app/assets/3d/user_furniture/scribes_stool.glb | 20040 B | ассет графики/3D/интерфейса: scribes stool |
| №0454 app/assets/3d/user_furniture/shop_counter.glb | 58488 B | ассет графики/3D/интерфейса: shop counter |
| №0455 app/assets/3d/user_furniture/sloped_writing_desk.glb | 341476 B | ассет графики/3D/интерфейса: sloped writing desk |
| №0456 app/assets/3d/user_furniture/spinning_wheel.glb | 21900 B | ассет графики/3D/интерфейса: spinning wheel |
| №0457 app/assets/3d/user_furniture/stone_stone_stair_vice_0.glb | 130164 B | ассет графики/3D/интерфейса: stone stone stair vice 0 |
| №0458 app/assets/3d/user_furniture/table_and_stools.glb | 34088 B | ассет графики/3D/интерфейса: table and stools |
| №0459 app/assets/3d/user_furniture/table.glb | 6217412 B | ассет графики/3D/интерфейса: table |
| №0460 app/assets/3d/user_furniture/torch_sconce.glb | 8692 B | ассет графики/3D/интерфейса: torch sconce |
| №0461 app/assets/3d/user_furniture/town_allotment_bed.glb | 42940 B | ассет графики/3D/интерфейса: town allotment bed |
| №0462 app/assets/3d/user_furniture/town_altar_with_candles.glb | 28704 B | ассет графики/3D/интерфейса: town altar with candles |
| №0463 app/assets/3d/user_furniture/town_anvil.glb | 7820 B | ассет графики/3D/интерфейса: town anvil |
| №0464 app/assets/3d/user_furniture/town_apple_tree.glb | 21880 B | ассет графики/3D/интерфейса: town apple tree |
| №0465 app/assets/3d/user_furniture/town_armour_stand.glb | 16180 B | ассет графики/3D/интерфейса: town armour stand |
| №0466 app/assets/3d/user_furniture/town_banner_pole.glb | 16800 B | ассет графики/3D/интерфейса: town banner pole |
| №0467 app/assets/3d/user_furniture/town_barrel.glb | 13340 B | ассет графики/3D/интерфейса: town barrel |
| №0468 app/assets/3d/user_furniture/town_bedroll.glb | 8964 B | ассет графики/3D/интерфейса: town bedroll |
| №0469 app/assets/3d/user_furniture/town_bench.glb | 16564 B | ассет графики/3D/интерфейса: town bench |
| №0470 app/assets/3d/user_furniture/town_boulder_large.glb | 9404 B | ассет графики/3D/интерфейса: town boulder large |
| №0471 app/assets/3d/user_furniture/town_boulder_small.glb | 4768 B | ассет графики/3D/интерфейса: town boulder small |
| №0472 app/assets/3d/user_furniture/town_bush.glb | 9188 B | ассет графики/3D/интерфейса: town bush |
| №0473 app/assets/3d/user_furniture/town_campfire_with_spit.glb | 33304 B | ассет графики/3D/интерфейса: town campfire with spit |
| №0474 app/assets/3d/user_furniture/town_canoe.glb | 15568 B | ассет графики/3D/интерфейса: town canoe |
| №0475 app/assets/3d/user_furniture/town_cargo_cart.glb | 70964 B | ассет графики/3D/интерфейса: town cargo cart |
| №0476 app/assets/3d/user_furniture/town_cauldron_on_tripod.glb | 32232 B | ассет графики/3D/интерфейса: town cauldron on tripod |
| №0477 app/assets/3d/user_furniture/town_cave_mouth.glb | 21616 B | ассет графики/3D/интерфейса: town cave mouth |
| №0478 app/assets/3d/user_furniture/town_chandelier.glb | 24996 B | ассет графики/3D/интерфейса: town chandelier |
| №0479 app/assets/3d/user_furniture/town_chicken_coop.glb | 26176 B | ассет графики/3D/интерфейса: town chicken coop |
| №0480 app/assets/3d/user_furniture/town_cobble_road_corner.glb | 18268 B | ассет графики/3D/интерфейса: town cobble road corner |
| №0481 app/assets/3d/user_furniture/town_cobble_road_junction.glb | 26024 B | ассет графики/3D/интерфейса: town cobble road junction |
| №0482 app/assets/3d/user_furniture/town_cobble_road_tile.glb | 20612 B | ассет графики/3D/интерфейса: town cobble road tile |
| №0483 app/assets/3d/user_furniture/town_cooks_kitchen.glb | 96404 B | ассет графики/3D/интерфейса: town cooks kitchen |
| №0484 app/assets/3d/user_furniture/town_cow_pen_fence.glb | 11268 B | ассет графики/3D/интерфейса: town cow pen fence |
| №0485 app/assets/3d/user_furniture/town_crate_stack.glb | 39416 B | ассет графики/3D/интерфейса: town crate stack |
| №0486 app/assets/3d/user_furniture/town_dead_tree.glb | 6196 B | ассет графики/3D/интерфейса: town dead tree |
| №0487 app/assets/3d/user_furniture/town_dirt_path_tile.glb | 9152 B | ассет графики/3D/интерфейса: town dirt path tile |
| №0488 app/assets/3d/user_furniture/town_farmhouse_and_barn.glb | 161272 B | ассет графики/3D/интерфейса: town farmhouse and barn |
| №0489 app/assets/3d/user_furniture/town_fence_gate.glb | 14544 B | ассет графики/3D/интерфейса: town fence gate |
| №0490 app/assets/3d/user_furniture/town_fence_run.glb | 28988 B | ассет графики/3D/интерфейса: town fence run |
| №0491 app/assets/3d/user_furniture/town_fern_clump.glb | 15892 B | ассет графики/3D/интерфейса: town fern clump |
| №0492 app/assets/3d/user_furniture/town_ferry_raft.glb | 31140 B | ассет графики/3D/интерфейса: town ferry raft |
| №0493 app/assets/3d/user_furniture/town_fishing_boat.glb | 25960 B | ассет графики/3D/интерфейса: town fishing boat |
| №0494 app/assets/3d/user_furniture/town_fishing_hut_on_stilts.glb | 110516 B | ассет графики/3D/интерфейса: town fishing hut on stilts |
| №0495 app/assets/3d/user_furniture/town_fletcher_shop.glb | 117300 B | ассет графики/3D/интерфейса: town fletcher shop |
| №0496 app/assets/3d/user_furniture/town_flower_patch.glb | 34768 B | ассет графики/3D/интерфейса: town flower patch |
| №0497 app/assets/3d/user_furniture/town_general_store.glb | 137904 B | ассет графики/3D/интерфейса: town general store |
| №0498 app/assets/3d/user_furniture/town_goblin_tent.glb | 15120 B | ассет графики/3D/интерфейса: town goblin tent |
| №0499 app/assets/3d/user_furniture/town_goblin_totem.glb | 27832 B | ассет графики/3D/интерфейса: town goblin totem |
| №0500 app/assets/3d/user_furniture/town_grass_ground_tile.glb | 8564 B | ассет графики/3D/интерфейса: town grass ground tile |
| №0501 app/assets/3d/user_furniture/town_grass_tuft_cluster.glb | 5080 B | ассет графики/3D/интерфейса: town grass tuft cluster |
| №0502 app/assets/3d/user_furniture/town_gravestone_set.glb | 23812 B | ассет графики/3D/интерфейса: town gravestone set |
| №0503 app/assets/3d/user_furniture/town_guard_barracks.glb | 162732 B | ассет графики/3D/интерфейса: town guard barracks |
| №0504 app/assets/3d/user_furniture/town_hand_cart.glb | 25308 B | ассет графики/3D/интерфейса: town hand cart |
| №0505 app/assets/3d/user_furniture/town_hay_bale.glb | 16340 B | ассет графики/3D/интерфейса: town hay bale |
| №0506 app/assets/3d/user_furniture/town_hitching_post.glb | 22008 B | ассет графики/3D/интерфейса: town hitching post |
| №0507 app/assets/3d/user_furniture/town_hunters_hide.glb | 33880 B | ассет графики/3D/интерфейса: town hunters hide |
| №0508 app/assets/3d/user_furniture/town_lamp_post.glb | 16804 B | ассет графики/3D/интерфейса: town lamp post |
| №0509 app/assets/3d/user_furniture/town_lily_pads.glb | 16632 B | ассет графики/3D/интерфейса: town lily pads |
| №0510 app/assets/3d/user_furniture/town_log_pile.glb | 37732 B | ассет графики/3D/интерфейса: town log pile |
| №0511 app/assets/3d/user_furniture/town_loom.glb | 46480 B | ассет графики/3D/интерфейса: town loom |
| №0512 app/assets/3d/user_furniture/town_loot_sack.glb | 11820 B | ассет графики/3D/интерфейса: town loot sack |
| №0513 app/assets/3d/user_furniture/town_market_stall_blue.glb | 61540 B | ассет графики/3D/интерфейса: town market stall blue |
| №0514 app/assets/3d/user_furniture/town_market_stall_cream.glb | 60756 B | ассет графики/3D/интерфейса: town market stall cream |
| №0515 app/assets/3d/user_furniture/town_market_stall.glb | 61536 B | ассет графики/3D/интерфейса: town market stall |
| №0516 app/assets/3d/user_furniture/town_mine_entrance.glb | 41744 B | ассет графики/3D/интерфейса: town mine entrance |
| №0517 app/assets/3d/user_furniture/town_mushroom_ring.glb | 22884 B | ассет графики/3D/интерфейса: town mushroom ring |
| №0518 app/assets/3d/user_furniture/town_notice_board.glb | 15924 B | ассет графики/3D/интерфейса: town notice board |
| №0519 app/assets/3d/user_furniture/town_oak_tree.glb | 19492 B | ассет графики/3D/интерфейса: town oak tree |
| №0520 app/assets/3d/user_furniture/town_pine_tree.glb | 7096 B | ассет графики/3D/интерфейса: town pine tree |
| №0521 app/assets/3d/user_furniture/town_plaza_paving_tile.glb | 40396 B | ассет графики/3D/интерфейса: town plaza paving tile |
| №0522 app/assets/3d/user_furniture/town_ploughed_field_tile.glb | 24992 B | ассет графики/3D/интерфейса: town ploughed field tile |
| №0523 app/assets/3d/user_furniture/town_range_and_oven.glb | 19440 B | ассет графики/3D/интерфейса: town range and oven |
| №0524 app/assets/3d/user_furniture/town_reed_clump.glb | 8672 B | ассет графики/3D/интерфейса: town reed clump |
| №0525 app/assets/3d/user_furniture/town_river_bank_tile.glb | 17528 B | ассет графики/3D/интерфейса: town river bank tile |
| №0526 app/assets/3d/user_furniture/town_river_bend_tile.glb | 27100 B | ассет графики/3D/интерфейса: town river bend tile |
| №0527 app/assets/3d/user_furniture/town_river_tile_straight.glb | 19108 B | ассет графики/3D/интерфейса: town river tile straight |
| №0528 app/assets/3d/user_furniture/town_road_signpost.glb | 7824 B | ассет графики/3D/интерфейса: town road signpost |
| №0529 app/assets/3d/user_furniture/town_rock_outcrop.glb | 10020 B | ассет графики/3D/интерфейса: town rock outcrop |
| №0530 app/assets/3d/user_furniture/town_rope_bridge.glb | 104548 B | ассет графики/3D/интерфейса: town rope bridge |
| №0531 app/assets/3d/user_furniture/town_rowing_boat.glb | 26056 B | ассет графики/3D/интерфейса: town rowing boat |
| №0532 app/assets/3d/user_furniture/town_rug.glb | 16352 B | ассет графики/3D/интерфейса: town rug |
| №0533 app/assets/3d/user_furniture/town_scarecrow.glb | 22344 B | ассет графики/3D/интерфейса: town scarecrow |
| №0534 app/assets/3d/user_furniture/town_shop_counter.glb | 61556 B | ассет графики/3D/интерфейса: town shop counter |
| №0535 app/assets/3d/user_furniture/town_smithy.glb | 105612 B | ассет графики/3D/интерфейса: town smithy |
| №0536 app/assets/3d/user_furniture/town_spinning_wheel.glb | 21608 B | ассет графики/3D/интерфейса: town spinning wheel |
| №0537 app/assets/3d/user_furniture/town_standing_stone.glb | 13276 B | ассет графики/3D/интерфейса: town standing stone |
| №0538 app/assets/3d/user_furniture/town_stone_arch_bridge.glb | 51536 B | ассет графики/3D/интерфейса: town stone arch bridge |
| №0539 app/assets/3d/user_furniture/town_stone_church.glb | 145052 B | ассет графики/3D/интерфейса: town stone church |
| №0540 app/assets/3d/user_furniture/town_stone_circle_slab.glb | 31656 B | ассет графики/3D/интерфейса: town stone circle slab |
| №0541 app/assets/3d/user_furniture/town_straw_target.glb | 15176 B | ассет графики/3D/интерфейса: town straw target |
| №0542 app/assets/3d/user_furniture/town_stump_with_axe.glb | 11880 B | ассет графики/3D/интерфейса: town stump with axe |
| №0543 app/assets/3d/user_furniture/town_table_and_stools.glb | 33848 B | ассет графики/3D/интерфейса: town table and stools |
| №0544 app/assets/3d/user_furniture/town_thatched_cottage.glb | 106096 B | ассет графики/3D/интерфейса: town thatched cottage |
| №0545 app/assets/3d/user_furniture/town_timber_house_large.glb | 262356 B | ассет графики/3D/интерфейса: town timber house large |
| №0546 app/assets/3d/user_furniture/town_timber_house_medium.glb | 169188 B | ассет графики/3D/интерфейса: town timber house medium |
| №0547 app/assets/3d/user_furniture/town_timber_house_small.glb | 119348 B | ассет графики/3D/интерфейса: town timber house small |
| №0548 app/assets/3d/user_furniture/town_timber_plank_bridge.glb | 60076 B | ассет графики/3D/интерфейса: town timber plank bridge |
| №0549 app/assets/3d/user_furniture/town_torch_sconce.glb | 8460 B | ассет графики/3D/интерфейса: town torch sconce |
| №0550 app/assets/3d/user_furniture/town_town_bank.glb | 116184 B | ассет графики/3D/интерфейса: town town bank |
| №0551 app/assets/3d/user_furniture/town_town_hall.glb | 252584 B | ассет графики/3D/интерфейса: town town hall |
| №0552 app/assets/3d/user_furniture/town_town_wall_segment.glb | 9696 B | ассет графики/3D/интерфейса: town town wall segment |
| №0553 app/assets/3d/user_furniture/town_town_well.glb | 32492 B | ассет графики/3D/интерфейса: town town well |
| №0554 app/assets/3d/user_furniture/town_treasure_chest.glb | 12404 B | ассет графики/3D/интерфейса: town treasure chest |
| №0555 app/assets/3d/user_furniture/town_village_tavern.glb | 220336 B | ассет графики/3D/интерфейса: town village tavern |
| №0556 app/assets/3d/user_furniture/town_wall_corner_tower.glb | 79592 B | ассет графики/3D/интерфейса: town wall corner tower |
| №0557 app/assets/3d/user_furniture/town_wall_gatehouse.glb | 77180 B | ассет графики/3D/интерфейса: town wall gatehouse |
| №0558 app/assets/3d/user_furniture/town_wall_stair.glb | 34040 B | ассет графики/3D/интерфейса: town wall stair |
| №0559 app/assets/3d/user_furniture/town_wall_walk_crenellated.glb | 15296 B | ассет графики/3D/интерфейса: town wall walk crenellated |
| №0560 app/assets/3d/user_furniture/town_watchtower.glb | 109556 B | ассет графики/3D/интерфейса: town watchtower |
| №0561 app/assets/3d/user_furniture/town_water_trough.glb | 18172 B | ассет графики/3D/интерфейса: town water trough |
| №0562 app/assets/3d/user_furniture/town_weapon_rack.glb | 23152 B | ассет графики/3D/интерфейса: town weapon rack |
| №0563 app/assets/3d/user_furniture/town_wheat_field_tile.glb | 55508 B | ассет графики/3D/интерфейса: town wheat field tile |
| №0564 app/assets/3d/user_furniture/town_willow_tree.glb | 26360 B | ассет графики/3D/интерфейса: town willow tree |
| №0565 app/assets/3d/user_furniture/town_windmill.glb | 121768 B | ассет графики/3D/интерфейса: town windmill |
| №0566 app/assets/3d/user_furniture/town_wizard_tower_base.glb | 64292 B | ассет графики/3D/интерфейса: town wizard tower base |
| №0567 app/assets/3d/user_furniture/town_wizard_tower_mid.glb | 70456 B | ассет графики/3D/интерфейса: town wizard tower mid |
| №0568 app/assets/3d/user_furniture/town_wizard_tower_top.glb | 50984 B | ассет графики/3D/интерфейса: town wizard tower top |
| №0569 app/assets/3d/user_furniture/treasure_chest.glb | 12772 B | ассет графики/3D/интерфейса: treasure chest |
| №0570 app/assets/3d/user_furniture/trestle_table.glb | 40424 B | ассет графики/3D/интерфейса: trestle table |
| №0571 app/assets/3d/user_furniture/weapon_rack.glb | 23300 B | ассет графики/3D/интерфейса: weapon rack |
| №0572 app/assets/3d/user_furniture/wood_stack.glb | 71136 B | ассет графики/3D/интерфейса: wood stack |
| №0573 app/assets/dice/.gitkeep | 0 B | ассет графики/3D/интерфейса: .gitkeep |
| №0574 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png | 2349861 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 07 PM |
| №0575 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_30 PM.png | 2088308 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 30 PM |
| №0576 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_13_27 PM.png | 2584925 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 13 27 PM |
| №0577 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_23_00 PM.png | 2274607 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 23 00 PM |
| №0578 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_24_38 PM.png | 2254958 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 24 38 PM |
| №0579 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_27_51 PM.png | 2389543 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 27 51 PM |
| №0580 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_35_50 PM.png | 2486441 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 35 50 PM |
| №0581 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_41_40 PM.png | 2712929 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 41 40 PM |
| №0582 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_49_58 PM.png | 2751322 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 49 58 PM |
| №0583 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_07 PM.png | 2778707 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 07 PM |
| №0584 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_18 PM.png | 2503466 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 18 PM |
| №0585 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_28 PM.png | 2561809 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 28 PM |
| №0586 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_39 PM.png | 2841483 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 39 PM |
| №0587 app/assets/dice/dice1.png | 348916 B | ассет графики/3D/интерфейса: dice1 |
| №0588 app/assets/dice/dice10-1.png | 386558 B | ассет графики/3D/интерфейса: dice10 1 |
| №0589 app/assets/dice/dice10.png | 386558 B | ассет графики/3D/интерфейса: dice10 |
| №0590 app/assets/dice/dice11.png | 307154 B | ассет графики/3D/интерфейса: dice11 |
| №0591 app/assets/dice/dice12.png | 395864 B | ассет графики/3D/интерфейса: dice12 |
| №0592 app/assets/dice/dice13.png | 344758 B | ассет графики/3D/интерфейса: dice13 |
| №0593 app/assets/dice/dice15.png | 388111 B | ассет графики/3D/интерфейса: dice15 |
| №0594 app/assets/dice/dice16.png | 352768 B | ассет графики/3D/интерфейса: dice16 |
| №0595 app/assets/dice/dice17.png | 342548 B | ассет графики/3D/интерфейса: dice17 |
| №0596 app/assets/dice/dice2.png | 246156 B | ассет графики/3D/интерфейса: dice2 |
| №0597 app/assets/dice/dice3.png | 346757 B | ассет графики/3D/интерфейса: dice3 |
| №0598 app/assets/dice/dice4.png | 348331 B | ассет графики/3D/интерфейса: dice4 |
| №0599 app/assets/dice/dice5.png | 299652 B | ассет графики/3D/интерфейса: dice5 |
| №0600 app/assets/dice/dice6.png | 331669 B | ассет графики/3D/интерфейса: dice6 |
| №0601 app/assets/dice/dice7.png | 343178 B | ассет графики/3D/интерфейса: dice7 |
| №0602 app/assets/dice/dice8.png | 370230 B | ассет графики/3D/интерфейса: dice8 |
| №0603 app/assets/dice/dice9.png | 336030 B | ассет графики/3D/интерфейса: dice9 |
| №0604 app/assets/ui/character-creation/1790622252250.png | 908119 B | ассет графики/3D/интерфейса: 1790622252250 |
| №0605 app/assets/ui/dragon_fire_burst_v2_sprite.png | 237749 B | ассет графики/3D/интерфейса: dragon fire burst v2 sprite |
| №0606 app/assets/ui/dragon_fire.png | 267960 B | ассет графики/3D/интерфейса: dragon fire |
| №0607 app/assets/ui/dragon_flight_v2_sprite.png | 573207 B | ассет графики/3D/интерфейса: dragon flight v2 sprite |
| №0608 app/assets/ui/dragon_frame_strip.svg | 858 B | ассет графики/3D/интерфейса: dragon frame strip |
| №0609 app/assets/ui/dragon.png | 274924 B | ассет графики/3D/интерфейса: dragon |
| №0610 app/assets/ui/fire_front.png | 1276760 B | ассет графики/3D/интерфейса: fire front |
| №0611 app/assets/ui/forest_burned.jpg | 211523 B | ассет графики/3D/интерфейса: forest burned |
| №0612 app/assets/ui/forest_green.jpg | 309184 B | ассет графики/3D/интерфейса: forest green |
| №0613 app/assets/ui/loader_dragon_head.svg | 2388 B | ассет графики/3D/интерфейса: loader dragon head |
| №0614 app/assets/ui/loader_fire.svg | 902 B | ассет графики/3D/интерфейса: loader fire |
| №0615 app/assets/ui/loader_forest_burning.svg | 1448 B | ассет графики/3D/интерфейса: loader forest burning |
| №0616 app/assets/ui/loader_forest.svg | 917 B | ассет графики/3D/интерфейса: loader forest |
| №0617 app/assets/ui/loader_sparks.svg | 626 B | ассет графики/3D/интерфейса: loader sparks |
| №0618 app/assets/ui/update_scene_ash.svg | 432 B | ассет графики/3D/интерфейса: update scene ash |
| №0619 app/assets/ui/update_scene_background.svg | 1141 B | ассет графики/3D/интерфейса: update scene background |
| №0620 app/assets/ui/update_scene_dragon_fire.svg | 733 B | ассет графики/3D/интерфейса: update scene dragon fire |
| №0621 app/assets/ui/update_scene_dragon.svg | 1324 B | ассет графики/3D/интерфейса: update scene dragon |
| №0622 app/assets/ui/update_scene_embers.svg | 474 B | ассет графики/3D/интерфейса: update scene embers |
| №0623 app/assets/ui/update_scene_fire_front.svg | 837 B | ассет графики/3D/интерфейса: update scene fire front |
| №0624 app/assets/ui/update_scene_forest_burned.svg | 1417 B | ассет графики/3D/интерфейса: update scene forest burned |
| №0625 app/assets/ui/update_scene_forest_green.svg | 1181 B | ассет графики/3D/интерфейса: update scene forest green |
| №0626 app/assets/ui/update_scene_smoke.svg | 417 B | ассет графики/3D/интерфейса: update scene smoke |
| №0627 app/assets/ui/vine_bone_frame_strip.svg | 943 B | ассет графики/3D/интерфейса: vine bone frame strip |
| №0628 app/Backgrounds.js | 63130 B | логический модуль: Backgrounds |
| №0629 app/battle_action_ui.js | 18386 B | логический модуль: battle action ui |
| №0630 app/battle_board.js | 37591 B | логический модуль: battle board |
| №0631 app/bestiary_2_0_v56.js | 55429 B | логический модуль: bestiary 2 0 v56 |
| №0632 app/bestiary_catalog_v56_1.js | 16222 B | логический модуль: bestiary catalog v56 1 |
| №0633 app/bestiary_catalog_v56_10.js | 10944 B | логический модуль: bestiary catalog v56 10 |
| №0634 app/bestiary_catalog_v56_11.js | 13164 B | логический модуль: bestiary catalog v56 11 |
| №0635 app/bestiary_catalog_v56_12.js | 10118 B | логический модуль: bestiary catalog v56 12 |
| №0636 app/bestiary_catalog_v56_13.js | 12586 B | логический модуль: bestiary catalog v56 13 |
| №0637 app/bestiary_catalog_v56_2.js | 13525 B | логический модуль: bestiary catalog v56 2 |
| №0638 app/bestiary_catalog_v56_3.js | 14383 B | логический модуль: bestiary catalog v56 3 |
| №0639 app/bestiary_catalog_v56_4.js | 11396 B | логический модуль: bestiary catalog v56 4 |
| №0640 app/bestiary_catalog_v56_5.js | 8648 B | логический модуль: bestiary catalog v56 5 |
| №0641 app/bestiary_catalog_v56_6.js | 9066 B | логический модуль: bestiary catalog v56 6 |
| №0642 app/bestiary_catalog_v56_7.js | 9314 B | логический модуль: bestiary catalog v56 7 |
| №0643 app/bestiary_catalog_v56_8.js | 9559 B | логический модуль: bestiary catalog v56 8 |
| №0644 app/bestiary_catalog_v56_9.js | 9861 B | логический модуль: bestiary catalog v56 9 |
| №0645 app/blood_hunter_engine.js | 82133 B | логика класса Кровавый охотник |
| №0646 app/campaign_manager.js | 7195 B | логический модуль: campaign manager |
| №0647 app/character_builder_v2.js | 109543 B | логический модуль: character builder v2 |
| №0648 app/character_creation_pergament.css | 12669 B | оформление интерфейса: character creation pergament |
| №0649 app/character_creation_pergament.js | 39686 B | логический модуль: character creation pergament |
| №0650 app/character_creation.js | 46823 B | логический модуль: character creation |
| №0651 app/character.js | 11133 B | лист персонажа; состояния и оружие |
| №0652 app/class_features_engine.js | 135018 B | логический модуль: class features engine |
| №0653 app/classesRegistry.js | 10857 B | логический модуль: classesRegistry |
| №0654 app/cloud_account.css | 1213 B | оформление интерфейса: cloud account |
| №0655 app/cloud_account.js | 8970 B | интерфейс авторизации и управления версиями |
| №0656 app/cloud_config.js | 450 B | публичная конфигурация облака |
| №0657 app/cloud_sync.js | 24647 B | синхронизация сохранений через Supabase |
| №0658 app/combat_abilities.js | 12824 B | логический модуль: combat abilities |
| №0659 app/combat_engine.js | 95078 B | движок боя и HP; адаптеры legacy значений |
| №0660 app/companion_gameplay_v27.js | 17531 B | логический модуль: companion gameplay v27 |
| №0661 app/companion_packs_v26.js | 4998 B | логический модуль: companion packs v26 |
| №0662 app/companions.js | 8943 B | логический модуль: companions |
| №0663 app/consumables.js | 15638 B | логический модуль: consumables |
| №0664 app/content_catalog.js | 9721 B | логический модуль: content catalog |
| №0665 app/content_framework.js | 9884 B | логический модуль: content framework |
| №0666 app/content_manifest.js | 3755 B | логический модуль: content manifest |
| №0667 app/crafting_character_influence_test_v46.js | 7123 B | логический модуль: crafting character influence test v46 |
| №0668 app/crafting_disassembly_repair_v51.js | 13334 B | логический модуль: crafting disassembly repair v51 |
| №0669 app/crafting_disassembly_v51.js | 11979 B | логический модуль: crafting disassembly v51 |
| №0670 app/crafting_dlc_v50.js | 8373 B | логический модуль: crafting dlc v50 |
| №0671 app/crafting_economy_v49.js | 17129 B | логический модуль: crafting economy v49 |
| №0672 app/crafting_engine_v31.js | 20294 B | логический модуль: crafting engine v31 |
| №0673 app/crafting_profession_progression_test_v47.js | 5609 B | логический модуль: crafting profession progression test v47 |
| №0674 app/crafting_profession_progression_v47.js | 35781 B | логический модуль: crafting profession progression v47 |
| №0675 app/crafting_professions_v33.js | 19300 B | логический модуль: crafting professions v33 |
| №0676 app/crafting_professions_v38.js | 48800 B | логический модуль: crafting professions v38 |
| №0677 app/crafting_resources_v34.js | 35661 B | логический модуль: crafting resources v34 |
| №0678 app/custom_crafting_v32.js | 15989 B | логический модуль: custom crafting v32 |
| №0679 app/data/classes/Accursed.js | 3369 B | логика классов: Accursed |
| №0680 app/data/classes/accursed.png | 2441667 B | логика классов: accursed |
| №0681 app/data/classes/Alchemist.js | 5589 B | логика классов: Alchemist |
| №0682 app/data/classes/alchemist.png | 1945616 B | логика классов: alchemist |
| №0683 app/data/classes/Artificer.js | 2124 B | логика классов: Artificer |
| №0684 app/data/classes/ARTIFICER.png | 891812 B | логика классов: ARTIFICER |
| №0685 app/data/classes/Barbarian.js | 3822 B | логика классов: Barbarian |
| №0686 app/data/classes/BARBARIAN.png | 815028 B | логика классов: BARBARIAN |
| №0687 app/data/classes/Bard.js | 2085 B | логика классов: Bard |
| №0688 app/data/classes/Bard.png | 769261 B | логика классов: Bard |
| №0689 app/data/classes/beasthart.png | 2255040 B | логика классов: beasthart |
| №0690 app/data/classes/Beastheart.js | 28992 B | логика классов: Beastheart |
| №0691 app/data/classes/blood hunter.png | 2210071 B | логика классов: blood hunter |
| №0692 app/data/classes/BloodHunter.js | 5283 B | логика классов: BloodHunter |
| №0693 app/data/classes/Cleric.js | 1987 B | логика классов: Cleric |
| №0694 app/data/classes/CLERIC.png | 914579 B | логика классов: CLERIC |
| №0695 app/data/classes/Druid.js | 1898 B | логика классов: Druid |
| №0696 app/data/classes/DRUID.png | 776880 B | логика классов: DRUID |
| №0697 app/data/classes/extra_class_stubs.js | 4499 B | логика классов: extra class stubs |
| №0698 app/data/classes/Fighter.js | 3771 B | логика классов: Fighter |
| №0699 app/data/classes/FIGHTER.png | 762812 B | логика классов: FIGHTER |
| №0700 app/data/classes/geist.png | 1776006 B | логика классов: geist |
| №0701 app/data/classes/Ghost.js | 295 B | логика классов: Ghost |
| №0702 app/data/classes/Illigger.js | 6058 B | логика классов: Illigger |
| №0703 app/data/classes/Illigger.png | 1716994 B | логика классов: Illigger |
| №0704 app/data/classes/level_up.js | 62903 B | логика классов: level up |
| №0705 app/data/classes/Martyr.js | 884 B | логика классов: Martyr |
| №0706 app/data/classes/martyr.png | 2381724 B | логика классов: martyr |
| №0707 app/data/classes/Monk.js | 2493 B | логика классов: Monk |
| №0708 app/data/classes/Monk.png | 1115382 B | логика классов: Monk |
| №0709 app/data/classes/Necromancer.js | 1013 B | логика классов: Necromancer |
| №0710 app/data/classes/necromancer.png | 2007714 B | логика классов: necromancer |
| №0711 app/data/classes/Occultist.js | 8507 B | логика классов: Occultist |
| №0712 app/data/classes/occultist.png | 1986332 B | логика классов: occultist |
| №0713 app/data/classes/Paladin.js | 2017 B | логика классов: Paladin |
| №0714 app/data/classes/PALADIN.png | 873991 B | логика классов: PALADIN |
| №0715 app/data/classes/Parasite.js | 545 B | логика классов: Parasite |
| №0716 app/data/classes/parasite.png | 2144116 B | логика классов: parasite |
| №0717 app/data/classes/progressionEngine.js | 20610 B | логика классов: progressionEngine |
| №0718 app/data/classes/Psion.js | 9033 B | логика классов: Psion |
| №0719 app/data/classes/psion.png | 1951350 B | логика классов: psion |
| №0720 app/data/classes/Pugilist.js | 11453 B | логика классов: Pugilist |
| №0721 app/data/classes/pugilist.png | 2022336 B | логика классов: pugilist |
| №0722 app/data/classes/Ranger.js | 1938 B | логика классов: Ranger |
| №0723 app/data/classes/RANGER.png | 643335 B | логика классов: RANGER |
| №0724 app/data/classes/Rogue.js | 3244 B | логика классов: Rogue |
| №0725 app/data/classes/Rogue.png | 579962 B | логика классов: Rogue |
| №0726 app/data/classes/rune keeper.png | 2582772 B | логика классов: rune keeper |
| №0727 app/data/classes/RuneKeeper.js | 2366 B | логика классов: RuneKeeper |
| №0728 app/data/classes/Savant.js | 930 B | логика классов: Savant |
| №0729 app/data/classes/savant.png | 1991433 B | логика классов: savant |
| №0730 app/data/classes/Shifter.js | 734 B | логика классов: Shifter |
| №0731 app/data/classes/shifter.png | 2248497 B | логика классов: shifter |
| №0732 app/data/classes/Sorcerer.js | 2098 B | логика классов: Sorcerer |
| №0733 app/data/classes/SORCERER.png | 939797 B | логика классов: SORCERER |
| №0734 app/data/classes/Swarm.js | 198 B | логика классов: Swarm |
| №0735 app/data/classes/the swam.png | 1759593 B | логика классов: the swam |
| №0736 app/data/classes/Vessel.js | 751 B | логика классов: Vessel |
| №0737 app/data/classes/vessel.png | 1943431 B | логика классов: vessel |
| №0738 app/data/classes/WalterParasite.js | 303 B | логика классов: WalterParasite |
| №0739 app/data/classes/Warden.js | 6678 B | логика классов: Warden |
| №0740 app/data/classes/warden.png | 2093561 B | логика классов: warden |
| №0741 app/data/classes/Warlock.js | 2013 B | логика классов: Warlock |
| №0742 app/data/classes/WARLOCK.png | 981038 B | логика классов: WARLOCK |
| №0743 app/data/classes/Warlord.js | 9504 B | логика классов: Warlord |
| №0744 app/data/classes/warlord.png | 2460016 B | логика классов: warlord |
| №0745 app/data/classes/Witch.js | 8032 B | логика классов: Witch |
| №0746 app/data/classes/witch.png | 1931074 B | логика классов: witch |
| №0747 app/data/classes/Wizard.js | 1627 B | логика классов: Wizard |
| №0748 app/data/classes/Wizard.png | 822251 B | логика классов: Wizard |
| №0749 app/data/feats/Feat_widget.js | 25654 B | черты и таланты: Feat widget |
| №0750 app/data/feats/Feats_phb.js | 19377 B | черты и таланты: Feats phb |
| №0751 app/data/feats/Feats_settings.js | 4392 B | черты и таланты: Feats settings |
| №0752 app/data/feats/Feats_tcoe.js | 5779 B | черты и таланты: Feats tcoe |
| №0753 app/data/feats/Feats_ua_homebrew.js | 11770 B | черты и таланты: Feats ua homebrew |
| №0754 app/data/feats/Feats_xgte.js | 6729 B | черты и таланты: Feats xgte |
| №0755 app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №0756 app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №0757 app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №0758 app/data/maps/3d_stress_test_all.json | 165139 B | данные/конфигурация: 3d stress test all |
| №0759 app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №0760 app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №0761 app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №0762 app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №0763 app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №0764 app/data/spells/Focuses.js | 53387 B | данные заклинаний: Focuses |
| №0765 app/data/spells/Spells1lvl.js | 60079 B | данные заклинаний: Spells1lvl |
| №0766 app/data/spells/Spells2lvl.js | 70401 B | данные заклинаний: Spells2lvl |
| №0767 app/data/spells/Spells3lvl.js | 48531 B | данные заклинаний: Spells3lvl |
| №0768 app/data/spells/Spells4lvl.js | 39396 B | данные заклинаний: Spells4lvl |
| №0769 app/data/spells/Spells5lvl.js | 41719 B | данные заклинаний: Spells5lvl |
| №0770 app/data/spells/spells6lvl.js | 37855 B | данные заклинаний: spells6lvl |
| №0771 app/data/spells/Spells7lvl.js | 29194 B | данные заклинаний: Spells7lvl |
| №0772 app/data/spells/Spells8lvl.js | 21355 B | данные заклинаний: Spells8lvl |
| №0773 app/data/spells/Spells9lvl.js | 32625 B | данные заклинаний: Spells9lvl |
| №0774 app/data/subclasses/subclassesRegistry.js | 111805 B | логика подклассов: subclassesRegistry |
| №0775 app/debug.js | 5961 B | логический модуль: debug |
| №0776 app/dice.js | 42492 B | логический модуль: dice |
| №0777 app/dnd_tools.js | 19419 B | логический модуль: dnd tools |
| №0778 app/expanded_bestiary_v39.js | 49383 B | логический модуль: expanded bestiary v39 |
| №0779 app/expanded_class_registry_bridge.js | 5025 B | логический модуль: expanded class registry bridge |
| №0780 app/expanded_classes_v23.js | 30269 B | логический модуль: expanded classes v23 |
| №0781 app/expanded_subclasses_v23.js | 2030 B | логический модуль: expanded subclasses v23 |
| №0782 app/expansion_class_progressions.js | 6719 B | логический модуль: expansion class progressions |
| №0783 app/expansion_classes_pack.js | 352830 B | логический модуль: expansion classes pack |
| №0784 app/Experience.js | 6150 B | логический модуль: Experience |
| №0785 app/extra_class_ui_bridge.js | 645 B | логический модуль: extra class ui bridge |
| №0786 app/feat_engine.js | 11457 B | логический модуль: feat engine |
| №0787 app/gameplay_core_v57.js | 20212 B | логический модуль: gameplay core v57 |
| №0788 app/ghost_extra_runtime.js | 22293 B | логический модуль: ghost extra runtime |
| №0789 app/ghost_extra_ui.js | 2387 B | логический модуль: ghost extra ui |
| №0790 app/Hero-info.js | 12434 B | логический модуль: Hero info |
| №0791 app/icon_settings_v2.js | 10484 B | логический модуль: icon settings v2 |
| №0792 app/icon_settings.js | 11281 B | логический модуль: icon settings |
| №0793 app/inventory_containers_v54.js | 12772 B | логический модуль: inventory containers v54 |
| №0794 app/inventory-coins.js | 23961 B | логический модуль: inventory coins |
| №0795 app/inventory-modal.js | 32494 B | логический модуль: inventory modal |
| №0796 app/Inventory-weight-tracker.js | 15712 B | логический модуль: Inventory weight tracker |
| №0797 app/Inventory.js | 36947 B | логический модуль: Inventory |
| №0798 app/junk.js | 8387 B | логический модуль: junk |
| №0799 app/kibbles_localization_content_v71.js | 32339 B | логический модуль: kibbles localization content v71 |
| №0800 app/library.js | 9314 B | логический модуль: library |
| №0801 app/Logo.js | 5742 B | логический модуль: Logo |
| №0802 app/magic_engine.js | 7570 B | логический модуль: magic engine |
| №0803 app/market_economy_v55.js | 17219 B | логический модуль: market economy v55 |
| №0804 app/market_expansion_v55_1.js | 21531 B | логический модуль: market expansion v55 1 |
| №0805 app/market_social_v55_3.js | 11752 B | логический модуль: market social v55 3 |
| №0806 app/market_trade_v55_2.js | 25582 B | логический модуль: market trade v55 2 |
| №0807 app/martyr_mhp_2024_runtime.js | 33254 B | логический модуль: martyr mhp 2024 runtime |
| №0808 app/materials.js | 11976 B | логический модуль: materials |
| №0809 app/monster_engine.js | 17873 B | логический модуль: monster engine |
| №0810 app/monster_loot_crafting_bridge_v40.js | 31518 B | логический модуль: monster loot crafting bridge v40 |
| №0811 app/monster_loot_engine_v36.js | 13559 B | логический модуль: monster loot engine v36 |
| №0812 app/monster_loot_engine_v37.js | 18554 B | логический модуль: monster loot engine v37 |
| №0813 app/necromancer_mhp_2024_runtime.js | 43556 B | логический модуль: necromancer mhp 2024 runtime |
| №0814 app/network_engine.js | 45962 B | логический модуль: network engine |
| №0815 app/network_gameplay.js | 87259 B | логический модуль: network gameplay |
| №0816 app/notes.js | 4818 B | логический модуль: notes |
| №0817 app/occultist_kibbles_v11_runtime.js | 60686 B | логический модуль: occultist kibbles v11 runtime |
| №0818 app/onboarding_faq_v71.css | 6093 B | оформление интерфейса: onboarding faq v71 |
| №0819 app/onboarding_faq_v71.js | 32373 B | логический модуль: onboarding faq v71 |
| №0820 app/parasite_extra_runtime.js | 30047 B | логический модуль: parasite extra runtime |
| №0821 app/parasite_extra_ui.js | 4710 B | логический модуль: parasite extra ui |
| №0822 app/predictor_cards.js | 145118 B | логический модуль: predictor cards |
| №0823 app/predictor_deck_ui.js | 39502 B | логический модуль: predictor deck ui |
| №0824 app/predictor_movement.js | 6682 B | логический модуль: predictor movement |
| №0825 app/predictor_runtime.js | 31001 B | логический модуль: predictor runtime |
| №0826 app/Proficiencies.js | 31253 B | логический модуль: Proficiencies |
| №0827 app/Proficienciescheck.js | 10367 B | логический модуль: Proficienciescheck |
| №0828 app/races.js | 52239 B | логический модуль: races |
| №0829 app/resource_gathering_v35.js | 12553 B | логический модуль: resource gathering v35 |
| №0830 app/resource_processing_v44.js | 22150 B | логический модуль: resource processing v44 |
| №0831 app/rulesEngine.js | 46039 B | логический модуль: rulesEngine |
| №0832 app/runekeeper_taron_v12_runtime.js | 27697 B | логический модуль: runekeeper taron v12 runtime |
| №0833 app/savant_laserllama_v561_runtime.js | 29860 B | логический модуль: savant laserllama v561 runtime |
| №0834 app/secondary_entities_engine.js | 7342 B | логический модуль: secondary entities engine |
| №0835 app/Settings_debug.js | 7336 B | логический модуль: Settings debug |
| №0836 app/Settings.js | 59645 B | логический модуль: Settings |
| №0837 app/shifter_laserllama_v2_1_runtime.js | 38454 B | логический модуль: shifter laserllama v2 1 runtime |
| №0838 app/skills.js | 6367 B | логический модуль: skills |
| №0839 app/spellblade_kibbles_runtime.js | 14261 B | логический модуль: spellblade kibbles runtime |
| №0840 app/spells.js | 39220 B | логический модуль: spells |
| №0841 app/styles.css | 24174 B | оформление интерфейса: styles |
| №0842 app/summoning_engine.js | 12861 B | логический модуль: summoning engine |
| №0843 app/swarm_extra_runtime.js | 19936 B | логический модуль: swarm extra runtime |
| №0844 app/swipe-lock.js | 1838 B | логический модуль: swipe lock |
| №0845 app/turn_planner.js | 15930 B | логический модуль: turn planner |
| №0846 app/update_manager_v2.js | 19885 B | логический модуль: update manager v2 |
| №0847 app/update_scene_v2.js | 11560 B | логический модуль: update scene v2 |
| №0848 app/vessel_laserllama_v4_runtime.js | 48055 B | логический модуль: vessel laserllama v4 runtime |
| №0849 app/vtt_character_actions_v64.js | 4047 B | логический модуль: vtt character actions v64 |
| №0850 app/vtt_character_sheet_v63.js | 3966 B | логический модуль: vtt character sheet v63 |
| №0851 app/vtt_combat_event_bus_v69.js | 8287 B | логический модуль: vtt combat event bus v69 |
| №0852 app/vtt_combat_log_v66.js | 8113 B | логический модуль: vtt combat log v66 |
| №0853 app/vtt_debug_character_lab_v702.js | 16566 B | логический модуль: vtt debug character lab v702 |
| №0854 app/vtt_debug_dice_lab_v706.js | 9112 B | логический модуль: vtt debug dice lab v706 |
| №0855 app/vtt_debug_error_log_v709.js | 5965 B | логический модуль: vtt debug error log v709 |
| №0856 app/vtt_debug_lab_v703.js | 12151 B | логический модуль: vtt debug lab v703 |
| №0857 app/vtt_debug_panel_v70.js | 17285 B | логический модуль: vtt debug panel v70 |
| №0858 app/vtt_debug_rules_matrix_v707.js | 6881 B | логический модуль: vtt debug rules matrix v707 |
| №0859 app/vtt_debug_sandbox_v701.js | 14634 B | логический модуль: vtt debug sandbox v701 |
| №0860 app/vtt_debug_scenario_editor_v705.js | 10352 B | логический модуль: vtt debug scenario editor v705 |
| №0861 app/vtt_debug_scenarios_v704.js | 8385 B | логический модуль: vtt debug scenarios v704 |
| №0862 app/vtt_debug_tasks_v708.js | 25273 B | логический модуль: vtt debug tasks v708 |
| №0863 app/vtt_dice_resolution_v65.js | 3941 B | логический модуль: vtt dice resolution v65 |
| №0864 app/vtt_encounter_checkpoint_v68.js | 9606 B | логический модуль: vtt encounter checkpoint v68 |
| №0865 app/vtt_encounter_map_v59.js | 9462 B | логический модуль: vtt encounter map v59 |
| №0866 app/vtt_gameplay_ux_v58.js | 8641 B | логический модуль: vtt gameplay ux v58 |
| №0867 app/vtt_mobile_battle_v61.js | 4559 B | логический модуль: vtt mobile battle v61 |
| №0868 app/vtt_mobile_combat_hud_v62.js | 9071 B | логический модуль: vtt mobile combat hud v62 |
| №0869 app/vtt_mobile_session_v67.js | 11143 B | логический модуль: vtt mobile session v67 |
| №0870 app/vtt_project_manifest_v70.js | 44405 B | логический модуль: vtt project manifest v70 |
| №0871 app/vtt_token_interaction_v60.js | 8542 B | логический модуль: vtt token interaction v60 |
| №0872 app/Wallpapers.js | 19943 B | логический модуль: Wallpapers |
| №0873 app/walter_parasite_extra_runtime.js | 33758 B | логический модуль: walter parasite extra runtime |
| №0874 app/walter_parasite_ui.js | 4185 B | логический модуль: walter parasite ui |
| №0875 app/warden_mhp_2024_runtime.js | 41820 B | логический модуль: warden mhp 2024 runtime |
| №0876 app/warlord_laserllama_v330_runtime.js | 15866 B | логический модуль: warlord laserllama v330 runtime |
| №0877 app/weapons.js | 3380 B | логический модуль: weapons |
| №0878 app/weaponsheavy.js | 8328 B | логический модуль: weaponsheavy |
| №0879 app/weaponsmelee.js | 20232 B | логический модуль: weaponsmelee |
| №0880 app/weaponsranged.js | 18195 B | логический модуль: weaponsranged |
| №0881 app/weaponsspecial.js | 5655 B | логический модуль: weaponsspecial |
| №0882 app/world_resource_gathering_v53.js | 17353 B | логический модуль: world resource gathering v53 |
| №0883 arcanacards.png | 1820683 B | текстура/изображение: arcanacards |
| №0884 ash_v2_sprite.png | 442476 B | текстура/изображение: ash v2 sprite |
| №0885 bed.glb | 5718760 B | 3D модель/геометрия: bed |
| №0886 bookshelf.glb | 7818348 B | 3D модель/геометрия: bookshelf |
| №0887 chair.glb | 4643004 B | 3D модель/геометрия: chair |
| №0888 closet.glb | 6550260 B | 3D модель/геометрия: closet |
| №0889 commode.glb | 4845868 B | 3D модель/геометрия: commode |
| №0890 desktop/main.cjs | 8991 B | Electron: создание окна Windows |
| №0891 desktop/preload.cjs | 2239 B | Electron: preload и мост к UI |
| №0892 desktop/prepare.cjs | 3322 B | Electron: подготовка web ресурсов |
| №0893 desktop/update.cjs | 10917 B | Electron: обновление |
| №0894 DND_VTT_FURNITURE_CONVERSION_KIT.zip | 4072 B | архив ассетов: DND VTT FURNITURE CONVERSION KIT |
| №0895 DND_VTT_FURNITURE_READY_02.zip | 65111 B | архив ассетов: DND VTT FURNITURE READY 02 |
| №0896 DND_VTT_FURNITURE_READY_03.zip | 84538 B | архив ассетов: DND VTT FURNITURE READY 03 |
| №0897 DND_VTT_FURNITURE_READY_04.zip | 133763 B | архив ассетов: DND VTT FURNITURE READY 04 |
| №0898 DND_VTT_FURNITURE_READY_05.zip | 54294 B | архив ассетов: DND VTT FURNITURE READY 05 |
| №0899 DND_VTT_FURNITURE_READY_06.zip | 89087 B | архив ассетов: DND VTT FURNITURE READY 06 |
| №0900 DND_VTT_FURNITURE_READY_07.zip | 73932 B | архив ассетов: DND VTT FURNITURE READY 07 |
| №0901 DND_VTT_FURNITURE_READY_08.zip | 67621 B | архив ассетов: DND VTT FURNITURE READY 08 |
| №0902 DND_VTT_FURNITURE_READY_09_20_MODELS.zip | 101933 B | архив ассетов: DND VTT FURNITURE READY 09 20 MODELS |
| №0903 DND_VTT_REMAINING_GLB_BULK.zip | 5302181 B | архив ассетов: DND VTT REMAINING GLB BULK |
| №0904 docs/00_AI_PROJECT_GUIDE.md | 351623 B | документация или отчёт: 00 AI PROJECT GUIDE |
| №0905 docs/00_NEW_CHAT_PROMPT_V56_10.txt | 2658 B | документация или отчёт: 00 NEW CHAT PROMPT V56 10 |
| №0906 docs/00_NEW_CHAT_PROMPT_V56_11.txt | 2118 B | документация или отчёт: 00 NEW CHAT PROMPT V56 11 |
| №0907 docs/00_NEW_CHAT_PROMPT_V56_12.txt | 763 B | документация или отчёт: 00 NEW CHAT PROMPT V56 12 |
| №0908 docs/00_NEW_CHAT_PROMPT_V56_9.txt | 3900 B | документация или отчёт: 00 NEW CHAT PROMPT V56 9 |
| №0909 docs/2026-10-09_ota_v74_00_17_checkpoint.json | 1645 B | документация или отчёт: 2026 10 09 ota v74 00 17 checkpoint |
| №0910 docs/2026-10-09_ota_v74_00_17.md | 6180 B | документация или отчёт: 2026 10 09 ota v74 00 17 |
| №0911 docs/2026-10-11_ota_v74_00_57_checkpoint.json | 469 B | документация или отчёт: 2026 10 11 ota v74 00 57 checkpoint |
| №0912 docs/2026-10-11_ota_v74_00_57.md | 5873 B | документация или отчёт: 2026 10 11 ota v74 00 57 |
| №0913 docs/3D_ASSET_IMPORT_BATCHES.md | 32725 B | документация или отчёт: 3D ASSET IMPORT BATCHES |
| №0914 docs/3d_character_anatomy/ADULT_ANATOMY_PROGRESS.md | 43788 B | документация или отчёт: ADULT ANATOMY PROGRESS |
| №0915 docs/3d_character_anatomy/ASSET_AUDIT_2026-10-12.json | 22458 B | документация или отчёт: ASSET AUDIT 2026 10 12 |
| №0916 docs/3d_character_anatomy/SKIN_MATERIAL_PIPELINE.md | 7470 B | документация или отчёт: SKIN MATERIAL PIPELINE |
| №0917 docs/3d_character_journal/2026-10-09_01_morph_architecture.md | 2418 B | документация или отчёт: 2026 10 09 01 morph architecture |
| №0918 docs/3d_character_journal/2026-10-09_02_morph_bridge.md | 2712 B | документация или отчёт: 2026 10 09 02 morph bridge |
| №0919 docs/3d_character_journal/2026-10-09_03_morph_bridge_diagnostics.md | 1768 B | документация или отчёт: 2026 10 09 03 morph bridge diagnostics |
| №0920 docs/3d_character_journal/2026-10-09_04_skin_textures.md | 4995 B | документация или отчёт: 2026 10 09 04 skin textures |
| №0921 docs/3d_character_journal/2026-10-09_05_named_makehuman_morphs.md | 8679 B | документация или отчёт: 2026 10 09 05 named makehuman morphs |
| №0922 docs/3d_character_journal/2026-10-09_06_female_stage1_checkpoint.json | 5867 B | документация или отчёт: 2026 10 09 06 female stage1 checkpoint |
| №0923 docs/3d_character_journal/2026-10-09_06_female_stage1.md | 8415 B | документация или отчёт: 2026 10 09 06 female stage1 |
| №0924 docs/3d_character_journal/2026-10-09_07_female_stage2_checkpoint.json | 871 B | документация или отчёт: 2026 10 09 07 female stage2 checkpoint |
| №0925 docs/3d_character_journal/2026-10-09_07_female_stage2.md | 7677 B | документация или отчёт: 2026 10 09 07 female stage2 |
| №0926 docs/3d_character_journal/2026-10-09_08_female_release_checkpoint.json | 1725 B | документация или отчёт: 2026 10 09 08 female release checkpoint |
| №0927 docs/3d_character_journal/2026-10-09_08_female_release.md | 7794 B | документация или отчёт: 2026 10 09 08 female release |
| №0928 docs/3d_character_journal/2026-10-10_editor_v74_00_22.md | 6792 B | документация или отчёт: 2026 10 10 editor v74 00 22 |
| №0929 docs/3d_character_journal/2026-10-11_editor_v74_00_32.md | 1158 B | документация или отчёт: 2026 10 11 editor v74 00 32 |
| №0930 docs/3d_character_journal/2026-10-11_editor_v74_00_33.md | 1260 B | документация или отчёт: 2026 10 11 editor v74 00 33 |
| №0931 docs/3d_character_journal/2026-10-11_editor_v74_00_34.md | 3336 B | документация или отчёт: 2026 10 11 editor v74 00 34 |
| №0932 docs/3d_character_journal/2026-10-11_editor_v74_00_35.md | 3249 B | документация или отчёт: 2026 10 11 editor v74 00 35 |
| №0933 docs/3d_character_races/aarakocra.md | 4966 B | документация или отчёт: aarakocra |
| №0934 docs/3d_character_races/aasimar.md | 2398 B | документация или отчёт: aasimar |
| №0935 docs/3d_character_races/ANIMAL_HEADS.md | 5724 B | документация или отчёт: ANIMAL HEADS |
| №0936 docs/3d_character_races/autognome.md | 2759 B | документация или отчёт: autognome |
| №0937 docs/3d_character_races/AVIAN_ELEPHANT_HEADS.md | 5661 B | документация или отчёт: AVIAN ELEPHANT HEADS |
| №0938 docs/3d_character_races/bugbear.md | 4059 B | документация или отчёт: bugbear |
| №0939 docs/3d_character_races/centaur.md | 2896 B | документация или отчёт: centaur |
| №0940 docs/3d_character_races/changeling.md | 2162 B | документация или отчёт: changeling |
| №0941 docs/3d_character_races/dhampir.md | 1557 B | документация или отчёт: dhampir |
| №0942 docs/3d_character_races/dragonborn.md | 5010 B | документация или отчёт: dragonborn |
| №0943 docs/3d_character_races/dwarf_hill.md | 2179 B | документация или отчёт: dwarf hill |
| №0944 docs/3d_character_races/dwarf_mountain.md | 2179 B | документация или отчёт: dwarf mountain |
| №0945 docs/3d_character_races/elf_drow.md | 4152 B | документация или отчёт: elf drow |
| №0946 docs/3d_character_races/elf_high.md | 4150 B | документация или отчёт: elf high |
| №0947 docs/3d_character_races/elf_wood.md | 4135 B | документация или отчёт: elf wood |
| №0948 docs/3d_character_races/EXTRA_FORMS_PLAN.md | 5841 B | документация или отчёт: EXTRA FORMS PLAN |
| №0949 docs/3d_character_races/fairy.md | 2154 B | документация или отчёт: fairy |
| №0950 docs/3d_character_races/firbolg.md | 1211 B | документация или отчёт: firbolg |
| №0951 docs/3d_character_races/full_orc.md | 2994 B | документация или отчёт: full orc |
| №0952 docs/3d_character_races/FUR_PACK.md | 3742 B | документация или отчёт: FUR PACK |
| №0953 docs/3d_character_races/genasi_air.md | 1474 B | документация или отчёт: genasi air |
| №0954 docs/3d_character_races/genasi_earth.md | 1519 B | документация или отчёт: genasi earth |
| №0955 docs/3d_character_races/genasi_fire.md | 1527 B | документация или отчёт: genasi fire |
| №0956 docs/3d_character_races/genasi_water.md | 1464 B | документация или отчёт: genasi water |
| №0957 docs/3d_character_races/ghost.md | 5482 B | документация или отчёт: ghost |
| №0958 docs/3d_character_races/githyanki.md | 1321 B | документация или отчёт: githyanki |
| №0959 docs/3d_character_races/githzerai.md | 1321 B | документация или отчёт: githzerai |
| №0960 docs/3d_character_races/gnome_forest.md | 2175 B | документация или отчёт: gnome forest |
| №0961 docs/3d_character_races/gnome_rock.md | 2177 B | документация или отчёт: gnome rock |
| №0962 docs/3d_character_races/goblin.md | 1278 B | документация или отчёт: goblin |
| №0963 docs/3d_character_races/goliath.md | 1362 B | документация или отчёт: goliath |
| №0964 docs/3d_character_races/hadozee.md | 4245 B | документация или отчёт: hadozee |
| №0965 docs/3d_character_races/HAIR_PACK.md | 4833 B | документация или отчёт: HAIR PACK |
| №0966 docs/3d_character_races/half_elf.md | 4189 B | документация или отчёт: half elf |
| №0967 docs/3d_character_races/half_orc.md | 3002 B | документация или отчёт: half orc |
| №0968 docs/3d_character_races/halfling_lightfoot.md | 3486 B | документация или отчёт: halfling lightfoot |
| №0969 docs/3d_character_races/halfling_stout.md | 3482 B | документация или отчёт: halfling stout |
| №0970 docs/3d_character_races/harengon.md | 5657 B | документация или отчёт: harengon |
| №0971 docs/3d_character_races/hexblood.md | 1643 B | документация или отчёт: hexblood |
| №0972 docs/3d_character_races/hobgoblin.md | 1210 B | документация или отчёт: hobgoblin |
| №0973 docs/3d_character_races/kalashtar.md | 1410 B | документация или отчёт: kalashtar |
| №0974 docs/3d_character_races/kender.md | 1159 B | документация или отчёт: kender |
| №0975 docs/3d_character_races/kenku.md | 5013 B | документация или отчёт: kenku |
| №0976 docs/3d_character_races/kobold.md | 4696 B | документация или отчёт: kobold |
| №0977 docs/3d_character_races/lizardfolk.md | 4944 B | документация или отчёт: lizardfolk |
| №0978 docs/3d_character_races/loxodon.md | 4673 B | документация или отчёт: loxodon |
| №0979 docs/3d_character_races/minotaur.md | 6054 B | документация или отчёт: minotaur |
| №0980 docs/3d_character_races/myconid.md | 1846 B | документация или отчёт: myconid |
| №0981 docs/3d_character_races/NATIVE_LIMBS.md | 6433 B | документация или отчёт: NATIVE LIMBS |
| №0982 docs/3d_character_races/owlin.md | 5120 B | документация или отчёт: owlin |
| №0983 docs/3d_character_races/parasite.md | 3100 B | документация или отчёт: parasite |
| №0984 docs/3d_character_races/plasmoid.md | 1933 B | документация или отчёт: plasmoid |
| №0985 docs/3d_character_races/RACES_3D_REMAINING_AUDIT_2026-10-12.md | 35486 B | документация или отчёт: RACES 3D REMAINING AUDIT 2026 10 12 |
| №0986 docs/3d_character_races/reborn.md | 1619 B | документация или отчёт: reborn |
| №0987 docs/3d_character_races/REMAINING_WORK.md | 23848 B | документация или отчёт: REMAINING WORK |
| №0988 docs/3d_character_races/satyr.md | 5063 B | документация или отчёт: satyr |
| №0989 docs/3d_character_races/shifter.md | 3214 B | документация или отчёт: shifter |
| №0990 docs/3d_character_races/simic_hybrid.md | 2647 B | документация или отчёт: simic hybrid |
| №0991 docs/3d_character_races/swarm_bats.md | 1019 B | документация или отчёт: swarm bats |
| №0992 docs/3d_character_races/swarm_beetles.md | 6967 B | документация или отчёт: swarm beetles |
| №0993 docs/3d_character_races/SWARM_DENSE_REDESIGN.md | 9032 B | документация или отчёт: SWARM DENSE REDESIGN |
| №0994 docs/3d_character_races/swarm_rats.md | 6463 B | документация или отчёт: swarm rats |
| №0995 docs/3d_character_races/tabaxi.md | 6015 B | документация или отчёт: tabaxi |
| №0996 docs/3d_character_races/TEXTURE_PACK_CHECKPOINT.md | 17270 B | документация или отчёт: TEXTURE PACK CHECKPOINT |
| №0997 docs/3d_character_races/TIEFLING_DETAIL_REDESIGN.md | 7294 B | документация или отчёт: TIEFLING DETAIL REDESIGN |
| №0998 docs/3d_character_races/tiefling.md | 2992 B | документация или отчёт: tiefling |
| №0999 docs/3d_character_races/tortle.md | 5805 B | документация или отчёт: tortle |
| №1000 docs/3d_character_races/triton.md | 1588 B | документация или отчёт: triton |
| №1001 docs/3d_character_races/vedalken.md | 1301 B | документация или отчёт: vedalken |
| №1002 docs/3d_character_races/walter_parasite.md | 3278 B | документация или отчёт: walter parasite |
| №1003 docs/3d_character_races/warforged.md | 2731 B | документация или отчёт: warforged |
| №1004 docs/3d_character_races/yuan_ti.md | 1669 B | документация или отчёт: yuan ti |
| №1005 docs/AI_AUTOMATION.md | 4081 B | документация или отчёт: AI AUTOMATION |
| №1006 docs/CLASS_IMPLEMENTATION_PLAN.md | 19250 B | документация или отчёт: CLASS IMPLEMENTATION PLAN |
| №1007 docs/CLASS_MECHANICS_SPEC.md | 38943 B | документация или отчёт: CLASS MECHANICS SPEC |
| №1008 docs/CLOUD_CHARACTER_SYNC.md | 31142 B | документация или отчёт: CLOUD CHARACTER SYNC |
| №1009 docs/CLOUD_SAVE_CALLERS.txt | 1869 B | документация или отчёт: CLOUD SAVE CALLERS |
| №1010 docs/CONTENT_MANAGER_ARCHITECTURE.md | 2565 B | документация или отчёт: CONTENT MANAGER ARCHITECTURE |
| №1011 docs/content-catalog-v1.json | 661 B | документация или отчёт: content catalog v1 |
| №1012 docs/content-packages/demo-race.json | 299 B | документация или отчёт: demo race |
| №1013 docs/DND_VTT_CLASS_AUDIT_V74_00_17.md | 184356 B | документация или отчёт: DND VTT CLASS AUDIT V74 00 17 |
| №1014 docs/Help.txt | 110717 B | документация или отчёт: Help |
| №1015 docs/KIBBLES_ATTRIBUTION_V71.md | 803 B | документация или отчёт: KIBBLES ATTRIBUTION V71 |
| №1016 docs/map-stage-740019.md | 1675 B | документация или отчёт: map stage 740019 |
| №1017 docs/map-stage-740021.md | 2000 B | документация или отчёт: map stage 740021 |
| №1018 docs/modular-content/android-texture-imports.json | 3843 B | документация или отчёт: android texture imports |
| №1019 docs/modular-content/APPEARANCE_SOURCE_INVENTORY.json | 15440 B | документация или отчёт: APPEARANCE SOURCE INVENTORY |
| №1020 docs/modular-content/audit.json | 1754999 B | документация или отчёт: audit |
| №1021 docs/modular-content/catalog-entry-v1.schema.json | 2876 B | документация или отчёт: catalog entry v1.schema |
| №1022 docs/modular-content/commerce-transfer.json | 8608 B | документация или отчёт: commerce transfer |
| №1023 docs/modular-content/DEPENDENCIES.md | 8468 B | документация или отчёт: DEPENDENCIES |
| №1024 docs/modular-content/DEVICE_QA.md | 7947 B | документация или отчёт: DEVICE QA |
| №1025 docs/modular-content/EXTRACTION_STAGE2.md | 7041 B | документация или отчёт: EXTRACTION STAGE2 |
| №1026 docs/modular-content/final-apk-metrics.json | 1291 B | документация или отчёт: final apk metrics |
| №1027 docs/modular-content/hotfix-1.00.07-metrics.json | 1451 B | документация или отчёт: hotfix 1.00.07 metrics |
| №1028 docs/modular-content/LICENSE_REVIEW.md | 3704 B | документация или отчёт: LICENSE REVIEW |
| №1029 docs/modular-content/live-manager-texture-comparison.json | 436 B | документация или отчёт: live manager texture comparison |
| №1030 docs/modular-content/minimal-1.00.08-metrics.json | 1411 B | документация или отчёт: minimal 1.00.08 metrics |
| №1031 docs/modular-content/native-validation.json | 2495 B | документация или отчёт: native validation |
| №1032 docs/modular-content/old-apk-inspection.json | 1311 B | документация или отчёт: old apk inspection |
| №1033 docs/modular-content/old-apk-objects.json | 196276 B | документация или отчёт: old apk objects |
| №1034 docs/modular-content/optimized-1.00.09-metrics.json | 1495 B | документация или отчёт: optimized 1.00.09 metrics |
| №1035 docs/modular-content/png-container-audit.json | 362 B | документация или отчёт: png container audit |
| №1036 docs/modular-content/PROGRESS.md | 12878 B | документация или отчёт: PROGRESS |
| №1037 docs/modular-content/public-v2-verification.json | 61493 B | документация или отчёт: public v2 verification |
| №1038 docs/modular-content/public-verification.json | 1729 B | документация или отчёт: public verification |
| №1039 docs/modular-content/quaternius-public-verification.json | 399 B | документация или отчёт: quaternius public verification |
| №1040 docs/modular-content/quaternius-source-comparison.json | 47480 B | документация или отчёт: quaternius source comparison |
| №1041 docs/modular-content/REPORT.md | 25826 B | документация или отчёт: REPORT |
| №1042 docs/modular-content/RESUME_STYLE_FIX.md | 1990 B | документация или отчёт: RESUME STYLE FIX |
| №1043 docs/modular-content/resume-1.00.10-metrics.json | 1553 B | документация или отчёт: resume 1.00.10 metrics |
| №1044 docs/modular-content/RETAINED_APK_AUDIT.md | 3729 B | документация или отчёт: RETAINED APK AUDIT |
| №1045 docs/modular-content/retained-1.00.08-summary.json | 2936 B | документация или отчёт: retained 1.00.08 summary |
| №1046 docs/modular-content/retained-1.00.08-textures.json | 8726 B | документация или отчёт: retained 1.00.08 textures |
| №1047 docs/modular-content/retained-1.00.08-top-assets.json | 2133 B | документация или отчёт: retained 1.00.08 top assets |
| №1048 docs/modular-content/split-inventory.json | 33489 B | документация или отчёт: split inventory |
| №1049 docs/modular-content/UNITY-1.00.11-measured.json | 2382 B | документация или отчёт: UNITY 1.00.11 measured |
| №1050 docs/modular-content/UNITY-1.00.11.md | 7583 B | документация или отчёт: UNITY 1.00.11 |
| №1051 docs/MONETIZATION_ROADMAP.md | 15924 B | документация или отчёт: MONETIZATION ROADMAP |
| №1052 docs/NETWORK_APK_NOTES.md | 7296 B | документация или отчёт: NETWORK APK NOTES |
| №1053 docs/PREDICTOR_APPROVED_CARD_STATUS.md | 52542 B | документация или отчёт: PREDICTOR APPROVED CARD STATUS |
| №1054 docs/PREDICTOR_CLASS_SPEC.md | 94181 B | документация или отчёт: PREDICTOR CLASS SPEC |
| №1055 docs/PRODUCT_ACCESS_AND_MONETIZATION.md | 12539 B | документация или отчёт: PRODUCT ACCESS AND MONETIZATION |
| №1056 docs/roadmap/DUAL_MODE_MMO_MASTER_PLAN.md | 13895 B | документация или отчёт: DUAL MODE MMO MASTER PLAN |
| №1057 docs/roadmap/MMO_ARCHITECTURE_AND_CHARACTERS.md | 14850 B | документация или отчёт: MMO ARCHITECTURE AND CHARACTERS |
| №1058 docs/roadmap/MMO_CONTENT_STREAMING.md | 17382 B | документация или отчёт: MMO CONTENT STREAMING |
| №1059 docs/roadmap/MMO_TEAM_ECONOMY_AND_ROADMAP.md | 21663 B | документация или отчёт: MMO TEAM ECONOMY AND ROADMAP |
| №1060 docs/ROOT_FURNITURE_IMPORT_REPORT.md | 6882 B | документация или отчёт: ROOT FURNITURE IMPORT REPORT |
| №1061 docs/SIGNATURE_ASSET_FIX_74_00_66.md | 1729 B | документация или отчёт: SIGNATURE ASSET FIX 74 00 66 |
| №1062 docs/SUPABASE_MAIL_SETUP_PROMPT_RU.md | 2853 B | документация или отчёт: SUPABASE MAIL SETUP PROMPT RU |
| №1063 docs/superpowers/plans/2026-10-27-feedback43.md | 3069 B | документация или отчёт: 2026 10 27 feedback43 |
| №1064 docs/superpowers/plans/2026-10-27-hero-art.md | 5137 B | документация или отчёт: 2026 10 27 hero art |
| №1065 docs/superpowers/plans/2026-10-27-unity-progression.md | 4032 B | документация или отчёт: 2026 10 27 unity progression |
| №1066 docs/superpowers/plans/2026-10-28-exact-webview-clone.md | 1844 B | документация или отчёт: 2026 10 28 exact webview clone |
| №1067 docs/superpowers/plans/2026-10-28-webview-ui-parity.md | 5274 B | документация или отчёт: 2026 10 28 webview ui parity |
| №1068 docs/superpowers/plans/2026-10-29-webview-sheet-completion.md | 4172 B | документация или отчёт: 2026 10 29 webview sheet completion |
| №1069 docs/superpowers/plans/2026-11-14-mobile-grimoire.md | 3656 B | документация или отчёт: 2026 11 14 mobile grimoire |
| №1070 docs/superpowers/specs/2026-10-27-hero-art-design.md | 1637 B | документация или отчёт: 2026 10 27 hero art design |
| №1071 docs/ui-redesign/evidence-1.00.56/grimoire-details-0-portrait.jpg | 40907 B | документация или отчёт: grimoire details 0 portrait |
| №1072 docs/ui-redesign/evidence-1.00.56/grimoire-details-1-portrait.jpg | 38913 B | документация или отчёт: grimoire details 1 portrait |
| №1073 docs/ui-redesign/evidence-1.00.56/grimoire-details-2-portrait.jpg | 38888 B | документация или отчёт: grimoire details 2 portrait |
| №1074 docs/ui-redesign/evidence-1.00.56/grimoire-details-3-portrait.jpg | 39990 B | документация или отчёт: grimoire details 3 portrait |
| №1075 docs/ui-redesign/evidence-1.00.56/grimoire-overflow-portrait.jpg | 22862 B | документация или отчёт: grimoire overflow portrait |
| №1076 docs/ui-redesign/evidence-1.00.56/grimoire-overview-portrait.jpg | 45842 B | документация или отчёт: grimoire overview portrait |
| №1077 docs/ui-redesign/evidence-1.00.57/grimoire-details-0-portrait.jpg | 42158 B | документация или отчёт: grimoire details 0 portrait |
| №1078 docs/ui-redesign/evidence-1.00.57/grimoire-details-1-portrait.jpg | 39946 B | документация или отчёт: grimoire details 1 portrait |
| №1079 docs/ui-redesign/evidence-1.00.57/grimoire-details-2-portrait.jpg | 39295 B | документация или отчёт: grimoire details 2 portrait |
| №1080 docs/ui-redesign/evidence-1.00.57/grimoire-details-3-portrait.jpg | 40695 B | документация или отчёт: grimoire details 3 portrait |
| №1081 docs/ui-redesign/evidence-1.00.57/grimoire-overflow-portrait.jpg | 23124 B | документация или отчёт: grimoire overflow portrait |
| №1082 docs/ui-redesign/evidence-1.00.57/grimoire-overview-portrait.jpg | 44406 B | документация или отчёт: grimoire overview portrait |
| №1083 docs/ui-redesign/evidence-1.00.57/header-position.json | 495 B | документация или отчёт: header position |
| №1084 docs/ui-redesign/evidence-1.00.58/active-roll.jpg | 39089 B | документация или отчёт: active roll |
| №1085 docs/ui-redesign/evidence-1.00.58/advancement.jpg | 55998 B | документация или отчёт: advancement |
| №1086 docs/ui-redesign/evidence-1.00.58/attacks-0.jpg | 49370 B | документация или отчёт: attacks 0 |
| №1087 docs/ui-redesign/evidence-1.00.58/attacks-4.jpg | 49370 B | документация или отчёт: attacks 4 |
| №1088 docs/ui-redesign/evidence-1.00.58/dice-0.jpg | 55100 B | документация или отчёт: dice 0 |
| №1089 docs/ui-redesign/evidence-1.00.58/dice-4.jpg | 55066 B | документация или отчёт: dice 4 |
| №1090 docs/ui-redesign/evidence-1.00.58/hero-initial.jpg | 53979 B | документация или отчёт: hero initial |
| №1091 docs/ui-redesign/evidence-1.00.58/hero-returned.jpg | 58666 B | документация или отчёт: hero returned |
| №1092 docs/ui-redesign/evidence-1.00.58/home-before-dice.jpg | 62490 B | документация или отчёт: home before dice |
| №1093 docs/ui-redesign/evidence-1.00.58/home-returned.jpg | 62490 B | документация или отчёт: home returned |
| №1094 docs/ui-redesign/evidence-1.00.58/native-verdict.json | 1240 B | документация или отчёт: native verdict |
| №1095 docs/ui-redesign/evidence-1.00.58/public-verification.json | 1772 B | документация или отчёт: public verification |
| №1096 docs/ui-redesign/evidence-1.00.58/standalone-dice.jpg | 60645 B | документация или отчёт: standalone dice |
| №1097 docs/ui-redesign/GRIMOIRE_ANDROID_NATIVE_CANDIDATE.md | 1497 B | документация или отчёт: GRIMOIRE ANDROID NATIVE CANDIDATE |
| №1098 docs/ui-redesign/GRIMOIRE_DETAILS_STAGE.md | 1451 B | документация или отчёт: GRIMOIRE DETAILS STAGE |
| №1099 docs/ui-redesign/GRIMOIRE_HERO_STAGE2A.md | 5620 B | документация или отчёт: GRIMOIRE HERO STAGE2A |
| №1100 docs/ui-redesign/MOBILE_GRIMOIRE_1.00.56_verification.json | 1677 B | документация или отчёт: MOBILE GRIMOIRE 1.00.56 verification |
| №1101 docs/ui-redesign/MOBILE_GRIMOIRE_1.00.56.md | 4899 B | документация или отчёт: MOBILE GRIMOIRE 1.00.56 |
| №1102 docs/ui-redesign/MOBILE_GRIMOIRE_1.00.57_verification.json | 1971 B | документация или отчёт: MOBILE GRIMOIRE 1.00.57 verification |
| №1103 docs/ui-redesign/MOBILE_GRIMOIRE_1.00.57.md | 2811 B | документация или отчёт: MOBILE GRIMOIRE 1.00.57 |
| №1104 docs/ui-redesign/NAVIGATION_FIX_1.00.58.md | 5355 B | документация или отчёт: NAVIGATION FIX 1.00.58 |
| №1105 docs/ui-redesign/THEME_PORT_10053.md | 6739 B | документация или отчёт: THEME PORT 10053 |
| №1106 docs/UNIFIED_RELEASE.md | 6136 B | документация или отчёт: UNIFIED RELEASE |
| №1107 docs/UNITY_ADVANCEMENT_1.00.44.md | 10267 B | документация или отчёт: UNITY ADVANCEMENT 1.00.44 |
| №1108 docs/UNITY_AGENT_WORKFLOW.md | 8841 B | документация или отчёт: UNITY AGENT WORKFLOW |
| №1109 docs/UNITY_CHARACTER_SHEET_PARITY.md | 12064 B | документация или отчёт: UNITY CHARACTER SHEET PARITY |
| №1110 docs/UNITY_CLOUD_HANDOFF.md | 37179 B | документация или отчёт: UNITY CLOUD HANDOFF |
| №1111 docs/UNITY_HERO_ART_1.00.42.md | 4384 B | документация или отчёт: UNITY HERO ART 1.00.42 |
| №1112 docs/UNITY_MARKET_TREE_2026-11-11.md | 4918 B | документация или отчёт: UNITY MARKET TREE 2026 11 11 |
| №1113 docs/UNITY_MIGRATION_PLAN.md | 14710 B | документация или отчёт: UNITY MIGRATION PLAN |
| №1114 docs/UNITY_PRODUCTION_FORMAT.md | 6032 B | документация или отчёт: UNITY PRODUCTION FORMAT |
| №1115 docs/UNITY_SCROLL_REVIEW.md | 8169 B | документация или отчёт: UNITY SCROLL REVIEW |
| №1116 docs/UNITY_STABILITY_CRAFTS_2026-11-11.md | 23356 B | документация или отчёт: UNITY STABILITY CRAFTS 2026 11 11 |
| №1117 docs/UNITY_UI_READABILITY.md | 7339 B | документация или отчёт: UNITY UI READABILITY |
| №1118 docs/UNITY_UI_RUNTIME_CHECK.md | 5415 B | документация или отчёт: UNITY UI RUNTIME CHECK |
| №1119 docs/UNITY_USER_FEEDBACK_1.00.43.md | 3277 B | документация или отчёт: UNITY USER FEEDBACK 1.00.43 |
| №1120 docs/UNITY_WEBVIEW_EXACT_CLONE.md | 19867 B | документация или отчёт: UNITY WEBVIEW EXACT CLONE |
| №1121 docs/UNITY_WEBVIEW_PARITY_STAGE1.md | 10754 B | документация или отчёт: UNITY WEBVIEW PARITY STAGE1 |
| №1122 docs/unity-account/ACCESS_AND_TOUCH_1.00.12.md | 8253 B | документация или отчёт: ACCESS AND TOUCH 1.00.12 |
| №1123 docs/unity-account/ADMIN_CENTER_AND_PRIVATE_WORKSHOP.md | 9558 B | документация или отчёт: ADMIN CENTER AND PRIVATE WORKSHOP |
| №1124 docs/unity-account/ALL_MOD_COLLECTIONS_1.00.36.md | 6950 B | документация или отчёт: ALL MOD COLLECTIONS 1.00.36 |
| №1125 docs/unity-account/audit-1.00.40/02-empty-name.png | 82694 B | документация или отчёт: 02 empty name |
| №1126 docs/unity-account/audit-1.00.40/03-create-step2.png | 114493 B | документация или отчёт: 03 create step2 |
| №1127 docs/unity-account/audit-1.00.40/04-create-step3.png | 86721 B | документация или отчёт: 04 create step3 |
| №1128 docs/unity-account/audit-1.00.40/05-create-choices.png | 84297 B | документация или отчёт: 05 create choices |
| №1129 docs/unity-account/audit-1.00.40/06-create-skills.png | 82810 B | документация или отчёт: 06 create skills |
| №1130 docs/unity-account/audit-1.00.40/07-create-review.png | 105279 B | документация или отчёт: 07 create review |
| №1131 docs/unity-account/audit-1.00.40/08-created-sheet.png | 86759 B | документация или отчёт: 08 created sheet |
| №1132 docs/unity-account/audit-1.00.40/09-class-label-edit.png | 88391 B | документация или отчёт: 09 class label edit |
| №1133 docs/unity-account/audit-1.00.40/11-level-edit.png | 72738 B | документация или отчёт: 11 level edit |
| №1134 docs/unity-account/audit-1.00.40/12-name-undo-probe.png | 88081 B | документация или отчёт: 12 name undo probe |
| №1135 docs/unity-account/audit-1.00.40/13-roster-level-mismatch.png | 65308 B | документация или отчёт: 13 roster level mismatch |
| №1136 docs/unity-account/audit-1.00.40/22-inventory.png | 87146 B | документация или отчёт: 22 inventory |
| №1137 docs/unity-account/audit-1.00.40/25-negative-weight.png | 82140 B | документация или отчёт: 25 negative weight |
| №1138 docs/unity-account/audit-1.00.40/27-abilities.png | 119987 B | документация или отчёт: 27 abilities |
| №1139 docs/unity-account/audit-1.00.40/28-spell-stat.png | 120389 B | документация или отчёт: 28 spell stat |
| №1140 docs/unity-account/audit-1.00.40/31-negative-spell-level.png | 85647 B | документация или отчёт: 31 negative spell level |
| №1141 docs/unity-account/audit-1.00.40/36-negative-hp.png | 70464 B | документация или отчёт: 36 negative hp |
| №1142 docs/unity-account/audit-1.00.40/39-graphics.png | 90444 B | документация или отчёт: 39 graphics |
| №1143 docs/unity-account/audit-1.00.40/42-studio-open.png | 165764 B | документация или отчёт: 42 studio open |
| №1144 docs/unity-account/audit-1.00.40/43-studio-save.png | 158335 B | документация или отчёт: 43 studio save |
| №1145 docs/unity-account/audit-1.00.40/47-dice-bottom.png | 87859 B | документация или отчёт: 47 dice bottom |
| №1146 docs/unity-account/audit-1.00.40/49-map.png | 42395 B | документация или отчёт: 49 map |
| №1147 docs/unity-account/audit-1.00.40/53-second-imported.png | 80996 B | документация или отчёт: 53 second imported |
| №1148 docs/unity-account/audit-1.00.40/54-second-selected.png | 90162 B | документация или отчёт: 54 second selected |
| №1149 docs/unity-account/audit-1.00.40/56-map-current-hero.png | 42402 B | документация или отчёт: 56 map current hero |
| №1150 docs/unity-account/audit-1.00.40/60-unicode-note.png | 86442 B | документация или отчёт: 60 unicode note |
| №1151 docs/unity-account/audit-1.00.40/61-note-delete-confirm.png | 91245 B | документация или отчёт: 61 note delete confirm |
| №1152 docs/unity-account/audit-1.00.40/62-second-notes-empty.png | 71452 B | документация или отчёт: 62 second notes empty |
| №1153 docs/unity-account/audit-1.00.40/68-second-item-before-add.png | 82187 B | документация или отчёт: 68 second item before add |
| №1154 docs/unity-account/audit-1.00.40/69-merged-item.png | 64352 B | документация или отчёт: 69 merged item |
| №1155 docs/unity-account/audit-1.00.40/71-capacity-item.png | 66699 B | документация или отчёт: 71 capacity item |
| №1156 docs/unity-account/audit-1.00.40/72-over-capacity.png | 71528 B | документация или отчёт: 72 over capacity |
| №1157 docs/unity-account/audit-1.00.40/74-wallet-rejected.png | 96926 B | документация или отчёт: 74 wallet rejected |
| №1158 docs/unity-account/audit-1.00.40/75-export-scope.png | 86222 B | документация или отчёт: 75 export scope |
| №1159 docs/unity-account/audit-1.00.40/render-observation.txt | 2818 B | документация или отчёт: render observation |
| №1160 docs/unity-account/audit-1.00.40/synthetic-pass2-evidence.json | 795 B | документация или отчёт: synthetic pass2 evidence |
| №1161 docs/unity-account/audit-1.00.40/synthetic-pass3-evidence.json | 1819 B | документация или отчёт: synthetic pass3 evidence |
| №1162 docs/unity-account/audit-1.00.40/synthetic-profile-evidence.json | 7260 B | документация или отчёт: synthetic profile evidence |
| №1163 docs/unity-account/CHARACTER_FILES_1.00.40.md | 9102 B | документация или отчёт: CHARACTER FILES 1.00.40 |
| №1164 docs/unity-account/CHARACTER_PREVIEW_1.00.37.md | 12746 B | документация или отчёт: CHARACTER PREVIEW 1.00.37 |
| №1165 docs/unity-account/CHAT_NICKNAMES_1.00.21.md | 3028 B | документация или отчёт: CHAT NICKNAMES 1.00.21 |
| №1166 docs/unity-account/CHAT_ONE_HOUR.md | 2267 B | документация или отчёт: CHAT ONE HOUR |
| №1167 docs/unity-account/CHAT_WORKSHOP_1.00.22.md | 7852 B | документация или отчёт: CHAT WORKSHOP 1.00.22 |
| №1168 docs/unity-account/DAILY_CHARACTERS_1.00.39.md | 7617 B | документация или отчёт: DAILY CHARACTERS 1.00.39 |
| №1169 docs/unity-account/DICE_1.00.23.md | 5241 B | документация или отчёт: DICE 1.00.23 |
| №1170 docs/unity-account/DICE_CONTACT_1.00.31.md | 9409 B | документация или отчёт: DICE CONTACT 1.00.31 |
| №1171 docs/unity-account/DICE_CONTACT_1.00.32.md | 14224 B | документация или отчёт: DICE CONTACT 1.00.32 |
| №1172 docs/unity-account/DICE_DECAY_1.00.33.md | 4433 B | документация или отчёт: DICE DECAY 1.00.33 |
| №1173 docs/unity-account/DICE_DECAY_1.00.34.md | 9464 B | документация или отчёт: DICE DECAY 1.00.34 |
| №1174 docs/unity-account/DICE_MATERIALS_1.00.28.md | 3463 B | документация или отчёт: DICE MATERIALS 1.00.28 |
| №1175 docs/unity-account/DICE_SIX_1.00.29.md | 5386 B | документация или отчёт: DICE SIX 1.00.29 |
| №1176 docs/unity-account/DICE_SIX_1.00.30.md | 8993 B | документация или отчёт: DICE SIX 1.00.30 |
| №1177 docs/unity-account/DICE_THEMES_1.00.24.md | 6119 B | документация или отчёт: DICE THEMES 1.00.24 |
| №1178 docs/unity-account/dice-1.00.23-metrics.json | 1453 B | документация или отчёт: dice 1.00.23 metrics |
| №1179 docs/unity-account/dice-1.00.24-metrics.json | 2106 B | документация или отчёт: dice 1.00.24 metrics |
| №1180 docs/unity-account/dice-1.00.25-metrics.json | 2023 B | документация или отчёт: dice 1.00.25 metrics |
| №1181 docs/unity-account/dice-1.00.28-metrics.json | 1717 B | документация или отчёт: dice 1.00.28 metrics |
| №1182 docs/unity-account/dice-1.00.30-metrics.json | 2979 B | документация или отчёт: dice 1.00.30 metrics |
| №1183 docs/unity-account/dice-1.00.32-metrics.json | 2200 B | документация или отчёт: dice 1.00.32 metrics |
| №1184 docs/unity-account/IMPLEMENTATION_STATUS.md | 77740 B | документация или отчёт: IMPLEMENTATION STATUS |
| №1185 docs/unity-account/MODERATION_CENTER_RUNBOOK.md | 7893 B | документация или отчёт: MODERATION CENTER RUNBOOK |
| №1186 docs/unity-account/PC_UI_FIX_1.00.38.md | 9612 B | документация или отчёт: PC UI FIX 1.00.38 |
| №1187 docs/unity-account/STABILITY_CRAFTS_1.00.51.md | 19184 B | документация или отчёт: STABILITY CRAFTS 1.00.51 |
| №1188 docs/unity-account/STABILITY_CRAFTS_1.00.52.md | 15674 B | документация или отчёт: STABILITY CRAFTS 1.00.52 |
| №1189 docs/unity-account/SUPABASE_DEPLOYMENT_1.00.12.md | 3575 B | документация или отчёт: SUPABASE DEPLOYMENT 1.00.12 |
| №1190 docs/unity-account/USER_AUDIT_1.00.40.md | 51749 B | документация или отчёт: USER AUDIT 1.00.40 |
| №1191 docs/unity-account/WORKSHOP_COLLECTIONS_1.00.35.md | 5177 B | документация или отчёт: WORKSHOP COLLECTIONS 1.00.35 |
| №1192 docs/unity-ui-runtime/home.png | 83676 B | документация или отчёт: home |
| №1193 docs/unity-ui-runtime/roster-empty-search-portrait.png | 91228 B | документация или отчёт: roster empty search portrait |
| №1194 docs/unity-ui-runtime/roster-portrait.png | 88858 B | документация или отчёт: roster portrait |
| №1195 docs/unity-ui-runtime/settings-Визуальные.png | 104324 B | документация или отчёт: settings Визуальные |
| №1196 docs/unity-ui-runtime/sheet-long-name-portrait.png | 90535 B | документация или отчёт: sheet long name portrait |
| №1197 docs/unity-ui-runtime/verification.json | 758 B | документация или отчёт: verification |
| №1198 docs/WINDOWS_DESKTOP.md | 3756 B | документация или отчёт: WINDOWS DESKTOP |
| №1199 dragon_fire_v2_sprite.png | 1013123 B | текстура/изображение: dragon fire v2 sprite |
| №1200 embers_v2_sprite.png | 698014 B | текстура/изображение: embers v2 sprite |
| №1201 FAQ.md | 38563 B | документация или отчёт: FAQ |
| №1202 fire_front_v2_sprite.png | 2249732 B | текстура/изображение: fire front v2 sprite |
| №1203 fire_spread_mask_v2_sprite.png | 1373284 B | текстура/изображение: fire spread mask v2 sprite |
| №1204 flash_v2_sprite.png | 803264 B | текстура/изображение: flash v2 sprite |
| №1205 floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1206 floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1207 floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1208 floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1209 floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1210 floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1211 floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1212 floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1213 floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1214 floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1215 floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1216 floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1217 floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1218 floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1219 floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1220 floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1221 floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1222 floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1223 GLENMORIL Soundtrack - Music Box.mp3 | 1827664 B | аудиофайл: GLENMORIL Soundtrack   Music Box |
| №1224 gltf_catalog.js | 3197 B | логический модуль: gltf catalog |
| №1225 heat_glow_v2_sprite.png | 836371 B | текстура/изображение: heat glow v2 sprite |
| №1226 human-base-rigged.glb | 4994640 B | 3D модель/геометрия: human base rigged |
| №1227 index.html | 89700 B | HTML-точка входа; интерфейс и порядок JS загрузки |
| №1228 Jalan Jalan - Lotus.mp3 | 9083034 B | аудиофайл: Jalan Jalan   Lotus |
| №1229 lineage_2_16. Shepard's Flute.mp3 | 2997816 B | аудиофайл: lineage 2 16. Shepard's Flute |
| №1230 manifest.json | 488 B | данные/конфигурация: manifest |
| №1231 MMORPG_FUTURE_PLAN.txt | 4115 B | документация или отчёт: MMORPG FUTURE PLAN |
| №1232 MODDING_START_HERE.md | 9518 B | документация или отчёт: MODDING START HERE |
| №1233 Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3 | 4020570 B | аудиофайл: Oliver DeRiviere   Prelude to an End (grizzlymusic.ru) |
| №1234 Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3 | 3530381 B | аудиофайл: Oliver Deriviere   Who Am I (grizzlymusic.ru) |
| №1235 package.json | 1608 B | npm и упаковка desktop EXE |
| №1236 PROJECT_ATLAS.md | генерируется | машиночитаемая карта репозитория для ИИ |
| №1237 PROJECT_ATLAS.txt | генерируется | человекочитаемая карта репозитория |
| №1238 README.md | 145 B | документация или отчёт: README |
| №1239 release-staging/unity-android-approval.json | 1748 B | данные/конфигурация: unity android approval |
| №1240 release-staging/unity-paired-approval.json | 1614 B | данные/конфигурация: unity paired approval |
| №1241 release-staging/unity-release.json | 3914 B | данные/конфигурация: unity release |
| №1242 smoke_back_v2_sprite-1.png | 1707378 B | текстура/изображение: smoke back v2 sprite 1 |
| №1243 smoke_back_v2_sprite.png | 1814587 B | текстура/изображение: smoke back v2 sprite |
| №1244 smoke_front_v2_sprite-1.png | 1890480 B | текстура/изображение: smoke front v2 sprite 1 |
| №1245 smoke_front_v2_sprite.png | 2064687 B | текстура/изображение: smoke front v2 sprite |
| №1246 smoke_mid_v2_sprite.png | 1898516 B | текстура/изображение: smoke mid v2 sprite |
| №1247 supabase/bootstrap_owner.sql | 1092 B | вспомогательный файл: bootstrap owner |
| №1248 supabase/enable_chat_retention.sql | 473 B | вспомогательный файл: enable chat retention |
| №1249 supabase/enable_moderation_retention.sql | 861 B | вспомогательный файл: enable moderation retention |
| №1250 supabase/migrations/202610130001_characters.sql | 4421 B | SQL миграция Supabase |
| №1251 supabase/migrations/202610210001_access_control.sql | 8940 B | SQL миграция Supabase |
| №1252 supabase/migrations/202610210002_moderation_center.sql | 13546 B | SQL миграция Supabase |
| №1253 supabase/migrations/202610210003_direct_moderator_management.sql | 2765 B | SQL миграция Supabase |
| №1254 supabase/migrations/202610210004_authenticated_chat.sql | 3040 B | SQL миграция Supabase |
| №1255 supabase/migrations/202610220001_chat_nicknames.sql | 1258 B | SQL миграция Supabase |
| №1256 supabase/migrations/202610220002_chat_staff_badges.sql | 1397 B | SQL миграция Supabase |
| №1257 supabase/tests/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №1258 supabase/tests/access-control.mjs | 20963 B | вспомогательный файл: access control |
| №1259 supabase/tests/package-lock.json | 512 B | данные/конфигурация: package lock |
| №1260 supabase/tests/package.json | 165 B | данные/конфигурация: package |
| №1261 table.glb | 6217412 B | 3D модель/геометрия: table |
| №1262 tests/ai_automation_test.cjs | 1649 B | автотест: ai automation test |
| №1263 tests/ai_finalize_test.cjs | 3840 B | автотест: ai finalize test |
| №1264 tests/alchemist_combat_test.js | 19298 B | автотест: alchemist combat test |
| №1265 tests/alchemist_runtime_test.js | 41827 B | автотест: alchemist runtime test |
| №1266 tests/character_3d_editor_test.js | 14206 B | автотест: character 3d editor test |
| №1267 tests/character_3d_foundation_test.js | 15396 B | автотест: character 3d foundation test |
| №1268 tests/character_3d_morph_assets_test.js | 5179 B | автотест: character 3d morph assets test |
| №1269 tests/character_3d_skin_assets_test.js | 1827 B | автотест: character 3d skin assets test |
| №1270 tests/character_3d_skin_morph_test.js | 3032 B | автотест: character 3d skin morph test |
| №1271 tests/character_adult_anatomy_test.js | 4704 B | автотест: character adult anatomy test |
| №1272 tests/character_animal_heads_test.js | 4415 B | автотест: character animal heads test |
| №1273 tests/character_appearance_store_test.js | 2308 B | автотест: character appearance store test |
| №1274 tests/character_avian_elephant_heads_test.js | 5125 B | автотест: character avian elephant heads test |
| №1275 tests/character_clothing_customizer_geometry_test.js | 4676 B | автотест: character clothing customizer geometry test |
| №1276 tests/character_clothing_options_test.js | 1922 B | автотест: character clothing options test |
| №1277 tests/character_clothing_test.js | 7286 B | автотест: character clothing test |
| №1278 tests/character_editor_morph_assets_test.js | 4783 B | автотест: character editor morph assets test |
| №1279 tests/character_elf_details_test.js | 2787 B | автотест: character elf details test |
| №1280 tests/character_external_anatomy_test.js | 7930 B | автотест: character external anatomy test |
| №1281 tests/character_fur_test.js | 3520 B | автотест: character fur test |
| №1282 tests/character_ghost_geometry_test.js | 3867 B | автотест: character ghost geometry test |
| №1283 tests/character_hair_pack_test.js | 2838 B | автотест: character hair pack test |
| №1284 tests/character_head_geometry_test.js | 3575 B | автотест: character head geometry test |
| №1285 tests/character_male_anatomy_fix_test.js | 3902 B | автотест: character male anatomy fix test |
| №1286 tests/character_native_limbs_test.js | 4909 B | автотест: character native limbs test |
| №1287 tests/character_parasites_geometry_test.js | 3738 B | автотест: character parasites geometry test |
| №1288 tests/character_races_geometry_test.js | 19702 B | автотест: character races geometry test |
| №1289 tests/character_reptile_heads_test.js | 3734 B | автотест: character reptile heads test |
| №1290 tests/character_skin_material_test.js | 3816 B | автотест: character skin material test |
| №1291 tests/character_stat_modes_levelup_test.cjs | 4864 B | автотест: character stat modes levelup test |
| №1292 tests/character_swarm_geometry_test.js | 3505 B | автотест: character swarm geometry test |
| №1293 tests/character_tiefling_details_test.js | 4451 B | автотест: character tiefling details test |
| №1294 tests/cloud_rls_test.sql | 5342 B | автотест: cloud rls test |
| №1295 tests/cloud_sql_concurrency.cjs | 2072 B | автотест: cloud sql concurrency |
| №1296 tests/cloud_sync_test.cjs | 19921 B | автотест: cloud sync test |
| №1297 tests/crafting_disassembly_v51_test.js | 3052 B | автотест: crafting disassembly v51 test |
| №1298 tests/crafting_dlc_v50_test.js | 2668 B | автотест: crafting dlc v50 test |
| №1299 tests/crafting_economy_v49_test.js | 1974 B | автотест: crafting economy v49 test |
| №1300 tests/creation_signature_asset_test.cjs | 3935 B | автотест: creation signature asset test |
| №1301 tests/desktop_update_contract.cjs | 4025 B | автотест: desktop update contract |
| №1302 tests/fixtures/cloud_auth.sql | 711 B | автотест: cloud auth |
| №1303 tests/fixtures/female_anatomy_74_00_59.json | 251 B | автотест: female anatomy 74 00 59 |
| №1304 tests/generate_makehuman_glb_morph_fixture.js | 4454 B | автотест: generate makehuman glb morph fixture |
| №1305 tests/gltf_loader_smoke.cjs | 3734 B | автотест: gltf loader smoke |
| №1306 tests/helpers/class_runtime_harness.js | 2323 B | автотест: class runtime harness |
| №1307 tests/human_base_glb_audit.js | 2158 B | автотест: human base glb audit |
| №1308 tests/imported_3d_editor_assets.cjs | 2157 B | автотест: imported 3d editor assets |
| №1309 tests/makehuman_gender_fixture_audit.js | 4646 B | автотест: makehuman gender fixture audit |
| №1310 tests/makehuman_gender_recipe_test.js | 5498 B | автотест: makehuman gender recipe test |
| №1311 tests/makehuman_glb_morph_fixture_audit.js | 1703 B | автотест: makehuman glb morph fixture audit |
| №1312 tests/makehuman_morph_bridge.js | 9756 B | автотест: makehuman morph bridge |
| №1313 tests/makehuman_surface_mapping_audit.js | 9447 B | автотест: makehuman surface mapping audit |
| №1314 tests/makehuman_target_reverse_transfer_audit.js | 10959 B | автотест: makehuman target reverse transfer audit |
| №1315 tests/makehuman_target_surface_transfer_audit.js | 12260 B | автотест: makehuman target surface transfer audit |
| №1316 tests/makehuman_topology_audit.js | 5878 B | автотест: makehuman topology audit |
| №1317 tests/makehuman_uv_bridge_test.js | 1465 B | автотест: makehuman uv bridge test |
| №1318 tests/makehuman_vertex_mapping_audit.js | 7410 B | автотест: makehuman vertex mapping audit |
| №1319 tests/map_editor_dom_test.js | 3347 B | автотест: map editor dom test |
| №1320 tests/map_rebuild_world_test.js | 3815 B | автотест: map rebuild world test |
| №1321 tests/predictor_aura_ledger_test.cjs | 12810 B | автотест: predictor aura ledger test |
| №1322 tests/predictor_blind_test.cjs | 4972 B | автотест: predictor blind test |
| №1323 tests/predictor_cards_test.cjs | 10793 B | автотест: predictor cards test |
| №1324 tests/predictor_cloud_sync_test.cjs | 36354 B | автотест: predictor cloud sync test |
| №1325 tests/predictor_coin_ancestor_test.cjs | 6734 B | автотест: predictor coin ancestor test |
| №1326 tests/predictor_deck_ui_test.cjs | 29014 B | автотест: predictor deck ui test |
| №1327 tests/predictor_devil_plan_test.cjs | 4680 B | автотест: predictor devil plan test |
| №1328 tests/predictor_event_reactions_test.cjs | 7259 B | автотест: predictor event reactions test |
| №1329 tests/predictor_exhaustion_test.cjs | 4867 B | автотест: predictor exhaustion test |
| №1330 tests/predictor_healing_reaction_test.cjs | 5049 B | автотест: predictor healing reaction test |
| №1331 tests/predictor_inventory_rewards_test.cjs | 14111 B | автотест: predictor inventory rewards test |
| №1332 tests/predictor_last_stand_test.cjs | 12289 B | автотест: predictor last stand test |
| №1333 tests/predictor_mage_spells_test.cjs | 29988 B | автотест: predictor mage spells test |
| №1334 tests/predictor_motion_cards_test.cjs | 11690 B | автотест: predictor motion cards test |
| №1335 tests/predictor_movement_cards_test.cjs | 7196 B | автотест: predictor movement cards test |
| №1336 tests/predictor_progression_test.cjs | 3750 B | автотест: predictor progression test |
| №1337 tests/predictor_runtime_test.cjs | 10585 B | автотест: predictor runtime test |
| №1338 tests/predictor_seven_cups_test.cjs | 12727 B | автотест: predictor seven cups test |
| №1339 tests/predictor_status_cards_test.cjs | 13936 B | автотест: predictor status cards test |
| №1340 tests/predictor_tactics_cards_test.cjs | 11334 B | автотест: predictor tactics cards test |
| №1341 tests/predictor_trickster_test.cjs | 10554 B | автотест: predictor trickster test |
| №1342 tests/predictor_turn_effects_test.cjs | 13273 B | автотест: predictor turn effects test |
| №1343 tests/predictor_vision_control_test.cjs | 12922 B | автотест: predictor vision control test |
| №1344 tests/predictor_world_truth_search_test.cjs | 5654 B | автотест: predictor world truth search test |
| №1345 tests/pugilist_combat_test.js | 21085 B | автотест: pugilist combat test |
| №1346 tests/pugilist_runtime_test.js | 4834 B | автотест: pugilist runtime test |
| №1347 tests/stair_navigation.cjs | 2520 B | автотест: stair navigation |
| №1348 tests/test_blood_hunter_completion.js | 8673 B | автотест: test blood hunter completion |
| №1349 tests/test_blood_hunter_focus_network.js | 3203 B | автотест: test blood hunter focus network |
| №1350 tests/test_blood_hunter_orders.js | 9810 B | автотест: test blood hunter orders |
| №1351 tests/test_blood_hunter_patron_selection.js | 4699 B | автотест: test blood hunter patron selection |
| №1352 tests/test_blood_hunter_profane_focus.js | 6459 B | автотест: test blood hunter profane focus |
| №1353 tests/test_class_audit_runtime.js | 14611 B | автотест: test class audit runtime |
| №1354 tests/test_class_audit_stage2_runtime.js | 15372 B | автотест: test class audit stage2 runtime |
| №1355 tests/test_class_audit_stage3_runtime.js | 16610 B | автотест: test class audit stage3 runtime |
| №1356 tests/test_class_audit_stage4_runtime.js | 23853 B | автотест: test class audit stage4 runtime |
| №1357 tests/test_v52.js | 2202 B | автотест: test v52 |
| №1358 tests/test_v53.js | 2507 B | автотест: test v53 |
| №1359 tests/test_v54.js | 2148 B | автотест: test v54 |
| №1360 tests/test_v55_2.js | 4154 B | автотест: test v55 2 |
| №1361 tests/test_v55_3.js | 2635 B | автотест: test v55 3 |
| №1362 tests/test_v55.js | 2152 B | автотест: test v55 |
| №1363 tests/test_v56_1.js | 1667 B | автотест: test v56 1 |
| №1364 tests/test_v56_10.js | 2140 B | автотест: test v56 10 |
| №1365 tests/test_v56_11.js | 1791 B | автотест: test v56 11 |
| №1366 tests/test_v56_12.js | 1665 B | автотест: test v56 12 |
| №1367 tests/test_v56_13.js | 2465 B | автотест: test v56 13 |
| №1368 tests/test_v56_2.js | 1697 B | автотест: test v56 2 |
| №1369 tests/test_v56_3.js | 1363 B | автотест: test v56 3 |
| №1370 tests/test_v56_4.js | 1458 B | автотест: test v56 4 |
| №1371 tests/test_v56_5.js | 1745 B | автотест: test v56 5 |
| №1372 tests/test_v56_6.js | 1439 B | автотест: test v56 6 |
| №1373 tests/test_v56_8.js | 1516 B | автотест: test v56 8 |
| №1374 tests/test_v56_9.js | 1734 B | автотест: test v56 9 |
| №1375 tests/test_v56.js | 3572 B | автотест: test v56 |
| №1376 tests/test_v57.js | 2554 B | автотест: test v57 |
| №1377 tests/test_v58.js | 1847 B | автотест: test v58 |
| №1378 tests/test_v59.js | 878 B | автотест: test v59 |
| №1379 tests/test_v60.js | 860 B | автотест: test v60 |
| №1380 tests/test_v61.js | 961 B | автотест: test v61 |
| №1381 tests/test_v62.js | 800 B | автотест: test v62 |
| №1382 tests/test_v63.js | 364 B | автотест: test v63 |
| №1383 tests/test_v64.js | 312 B | автотест: test v64 |
| №1384 tests/test_v65.js | 335 B | автотест: test v65 |
| №1385 tests/test_v66.js | 373 B | автотест: test v66 |
| №1386 tests/test_v67.js | 628 B | автотест: test v67 |
| №1387 tests/test_v68.js | 984 B | автотест: test v68 |
| №1388 tests/test_v69.js | 1713 B | автотест: test v69 |
| №1389 tests/test_v70.js | 2112 B | автотест: test v70 |
| №1390 tests/test_v701.js | 2425 B | автотест: test v701 |
| №1391 tests/test_v702.js | 4409 B | автотест: test v702 |
| №1392 tests/test_v703.js | 2646 B | автотест: test v703 |
| №1393 tests/test_v704.js | 2402 B | автотест: test v704 |
| №1394 tests/test_v705.js | 2717 B | автотест: test v705 |
| №1395 tests/test_v706.js | 1414 B | автотест: test v706 |
| №1396 tests/test_v707.js | 1066 B | автотест: test v707 |
| №1397 tests/test_v708_fixes.js | 2968 B | автотест: test v708 fixes |
| №1398 tests/test_v709_fixes.js | 2128 B | автотест: test v709 fixes |
| №1399 tests/test_v710_fixes.js | 2223 B | автотест: test v710 fixes |
| №1400 tests/test_v711_fixes.js | 1037 B | автотест: test v711 fixes |
| №1401 tests/test_v712_fixes.js | 1675 B | автотест: test v712 fixes |
| №1402 tests/test_v713_fixes.js | 2127 B | автотест: test v713 fixes |
| №1403 tests/test_v714_fixes.js | 1727 B | автотест: test v714 fixes |
| №1404 tests/test_v715_fixes.js | 1817 B | автотест: test v715 fixes |
| №1405 tests/test_v716_fixes.js | 1980 B | автотест: test v716 fixes |
| №1406 tests/test_v717_fixes.js | 2657 B | автотест: test v717 fixes |
| №1407 tests/test_v718_fixes.js | 1001 B | автотест: test v718 fixes |
| №1408 tests/test_v719_fixes.js | 1156 B | автотест: test v719 fixes |
| №1409 tests/test_v720_fixes.js | 1621 B | автотест: test v720 fixes |
| №1410 tests/test_v721_fixes.js | 3536 B | автотест: test v721 fixes |
| №1411 tests/test_v722_fixes.js | 3509 B | автотест: test v722 fixes |
| №1412 tests/test_v723_fixes.js | 4780 B | автотест: test v723 fixes |
| №1413 tests/test_v724_fixes.js | 2330 B | автотест: test v724 fixes |
| №1414 tests/test_v725_fixes.js | 4026 B | автотест: test v725 fixes |
| №1415 tests/test_v726_fixes.js | 3809 B | автотест: test v726 fixes |
| №1416 tests/test_v727_fixes.js | 3061 B | автотест: test v727 fixes |
| №1417 tests/test_v728_fixes.js | 2641 B | автотест: test v728 fixes |
| №1418 tests/test_v729_fixes.js | 1372 B | автотест: test v729 fixes |
| №1419 tests/test_v730_fixes.js | 2190 B | автотест: test v730 fixes |
| №1420 tests/test_v731_fixes.js | 1649 B | автотест: test v731 fixes |
| №1421 tests/test_v732_fixes.js | 2794 B | автотест: test v732 fixes |
| №1422 tests/test_v733_logic_audit.js | 2286 B | автотест: test v733 logic audit |
| №1423 tests/test_v734_network_concentration.js | 1522 B | автотест: test v734 network concentration |
| №1424 tests/test_v735_logic_rules.js | 1885 B | автотест: test v735 logic rules |
| №1425 tests/test_v736_deep_rules.js | 4307 B | автотест: test v736 deep rules |
| №1426 tests/test_v737_spellcasting_transaction.js | 5283 B | автотест: test v737 spellcasting transaction |
| №1427 tests/test_v738_multiclass_spell_sources.js | 5402 B | автотест: test v738 multiclass spell sources |
| №1428 tests/test_v739_prepared_transaction.js | 4317 B | автотест: test v739 prepared transaction |
| №1429 tests/test_v740_concentration_lifecycle.js | 2114 B | автотест: test v740 concentration lifecycle |
| №1430 tests/test_v741_damage_pipeline.js | 2462 B | автотест: test v741 damage pipeline |
| №1431 tests/test_v742_character_combatant_sync.js | 3540 B | автотест: test v742 character combatant sync |
| №1432 tests/test_v743_authority_recharge_events.js | 2228 B | автотест: test v743 authority recharge events |
| №1433 tests/test_v744_sync_authority_save.js | 2516 B | автотест: test v744 sync authority save |
| №1434 tests/test_v745_host_handoff.js | 2112 B | автотест: test v745 host handoff |
| №1435 tests/test_v746_authoritative_save_recharge.js | 3032 B | автотест: test v746 authoritative save recharge |
| №1436 tests/test_v747_event_race_compaction.js | 3064 B | автотест: test v747 event race compaction |
| №1437 tests/test_v748_full_combat_transaction.js | 5181 B | автотест: test v748 full combat transaction |
| №1438 tests/test_v749_monster_authority_reaction_order.js | 2661 B | автотест: test v749 monster authority reaction order |
| №1439 tests/test_v750_resignal_reaction_monster_rpc.js | 1973 B | автотест: test v750 resignal reaction monster rpc |
| №1440 tests/test_v751_authoritative_replay_rollback.js | 1185 B | автотест: test v751 authoritative replay rollback |
| №1441 tests/test_v752_replay_hash_authority.js | 2033 B | автотест: test v752 replay hash authority |
| №1442 tests/test_v753_replay_transaction_rng.js | 1195 B | автотест: test v753 replay transaction rng |
| №1443 tests/test_v754_update_manager.js | 2816 B | автотест: test v754 update manager |
| №1444 tests/test_v755_creation_buckets.js | 3973 B | автотест: test v755 creation buckets |
| №1445 tests/test_v755_update_scene.js | 3625 B | автотест: test v755 update scene |
| №1446 tests/update_ota_flow_test.js | 9661 B | автотест: update ota flow test |
| №1447 tools/ai_automation.cjs | 2383 B | скрипт разработчика: ai automation |
| №1448 tools/ai_checks.cjs | 1068 B | скрипт разработчика: ai checks |
| №1449 tools/ai_finalize.cjs | 2199 B | скрипт разработчика: ai finalize |
| №1450 tools/audit_adult_body_assets.py | 5868 B | скрипт разработчика: audit adult body assets |
| №1451 tools/audit_modular_content.py | 5418 B | скрипт разработчика: audit modular content |
| №1452 tools/audit_retained_apk.py | 2920 B | скрипт разработчика: audit retained apk |
| №1453 tools/build_character_editor_morphs.js | 4493 B | скрипт разработчика: build character editor morphs |
| №1454 tools/build_cloud_tests.sh | 1945 B | скрипт разработчика: build cloud tests |
| №1455 tools/build_makehuman_morphs.js | 8803 B | скрипт разработчика: build makehuman morphs |
| №1456 tools/build_skin_microtexture.py | 1254 B | скрипт разработчика: build skin microtexture |
| №1457 tools/build_update_manifest.py | 3881 B | скрипт разработчика: build update manifest |
| №1458 tools/check_adult_anatomy_browser.js | 7862 B | скрипт разработчика: check adult anatomy browser |
| №1459 tools/check_adult_base_browser.js | 4732 B | скрипт разработчика: check adult base browser |
| №1460 tools/check_animal_heads_browser.js | 6045 B | скрипт разработчика: check animal heads browser |
| №1461 tools/check_avian_elephant_heads_browser.js | 6052 B | скрипт разработчика: check avian elephant heads browser |
| №1462 tools/check_avian_races_browser.js | 6195 B | скрипт разработчика: check avian races browser |
| №1463 tools/check_character_clothing_closeups.js | 3941 B | скрипт разработчика: check character clothing closeups |
| №1464 tools/check_character_clothing_customizer.js | 8611 B | скрипт разработчика: check character clothing customizer |
| №1465 tools/check_character_dress_customizer.js | 4892 B | скрипт разработчика: check character dress customizer |
| №1466 tools/check_character_editor_browser.js | 24473 B | скрипт разработчика: check character editor browser |
| №1467 tools/check_character_head_browser.js | 7169 B | скрипт разработчика: check character head browser |
| №1468 tools/check_character_races_browser.js | 14773 B | скрипт разработчика: check character races browser |
| №1469 tools/check_cloud_account_browser.cjs | 7054 B | скрипт разработчика: check cloud account browser |
| №1470 tools/check_dense_swarm_browser.js | 6299 B | скрипт разработчика: check dense swarm browser |
| №1471 tools/check_elf_details_browser.js | 5791 B | скрипт разработчика: check elf details browser |
| №1472 tools/check_external_anatomy_browser.js | 9967 B | скрипт разработчика: check external anatomy browser |
| №1473 tools/check_feather_surface_browser.js | 8888 B | скрипт разработчика: check feather surface browser |
| №1474 tools/check_fur_browser.js | 6062 B | скрипт разработчика: check fur browser |
| №1475 tools/check_fur_surface_browser.js | 8973 B | скрипт разработчика: check fur surface browser |
| №1476 tools/check_ghost_browser.js | 8977 B | скрипт разработчика: check ghost browser |
| №1477 tools/check_hair_pack_browser.js | 5826 B | скрипт разработчика: check hair pack browser |
| №1478 tools/check_kobold_tabaxi_browser.js | 6240 B | скрипт разработчика: check kobold tabaxi browser |
| №1479 tools/check_last_races_browser.js | 7457 B | скрипт разработчика: check last races browser |
| №1480 tools/check_male_anatomy_browser.js | 6082 B | скрипт разработчика: check male anatomy browser |
| №1481 tools/check_map_browser.js | 3805 B | скрипт разработчика: check map browser |
| №1482 tools/check_mechanical_races_browser.js | 6158 B | скрипт разработчика: check mechanical races browser |
| №1483 tools/check_modular_races_browser.js | 5826 B | скрипт разработчика: check modular races browser |
| №1484 tools/check_native_limbs_browser.js | 7153 B | скрипт разработчика: check native limbs browser |
| №1485 tools/check_parasites_browser.js | 6584 B | скрипт разработчика: check parasites browser |
| №1486 tools/check_pose_browser.js | 7090 B | скрипт разработчика: check pose browser |
| №1487 tools/check_quartet_races_browser.js | 6706 B | скрипт разработчика: check quartet races browser |
| №1488 tools/check_reptile_heads_browser.js | 5336 B | скрипт разработчика: check reptile heads browser |
| №1489 tools/check_reptile_races_browser.js | 5781 B | скрипт разработчика: check reptile races browser |
| №1490 tools/check_reptile_surface_browser.js | 7114 B | скрипт разработчика: check reptile surface browser |
| №1491 tools/check_skin_material_browser.js | 11016 B | скрипт разработчика: check skin material browser |
| №1492 tools/check_small_armor_browser.js | 3698 B | скрипт разработчика: check small armor browser |
| №1493 tools/check_swarm_browser.js | 7847 B | скрипт разработчика: check swarm browser |
| №1494 tools/check_tiefling_browser.js | 7273 B | скрипт разработчика: check tiefling browser |
| №1495 tools/check_tiefling_details_browser.js | 6694 B | скрипт разработчика: check tiefling details browser |
| №1496 tools/cloud_test.init.gradle | 781 B | скрипт разработчика: cloud test.init |
| №1497 tools/convert_remaining_furniture.py | 4297 B | скрипт разработчика: convert remaining furniture |
| №1498 tools/finalize_v741.py | 3280 B | скрипт разработчика: finalize v741 |
| №1499 tools/generate_project_atlas.cjs | 12690 B | автоматический генератор этого атласа |
| №1500 tools/inspect_unity_apk.py | 3390 B | скрипт разработчика: inspect unity apk |
| №1501 tools/install_native_build_tools.sh | 2975 B | скрипт разработчика: install native build tools |
| №1502 tools/makehuman_gender_channels.json | 4749 B | скрипт разработчика: makehuman gender channels |
| №1503 tools/makehuman_morph_channels.json | 448 B | скрипт разработчика: makehuman morph channels |
| №1504 tools/prepare_makehuman_gender.js | 5599 B | скрипт разработчика: prepare makehuman gender |
| №1505 tools/run_tests_v731.js | 5062 B | скрипт разработчика: run tests v731 |
| №1506 tools/sync_manifest.py | 2034 B | скрипт разработчика: sync manifest |
| №1507 tools/test_cloud_sql.sh | 1088 B | скрипт разработчика: test cloud sql |
| №1508 tools/unified_version.py | 3403 B | скрипт разработчика: unified version |
| №1509 unity/.gitattributes | 451 B | вспомогательный файл: .gitattributes |
| №1510 unity/.gitignore | 454 B | вспомогательный файл: .gitignore |
| №1511 unity/AGENTS.md | 7316 B | документация или отчёт: AGENTS |
| №1512 unity/ANDROID_UPDATES.md | 3652 B | документация или отчёт: ANDROID UPDATES |
| №1513 unity/Assets/DefaultVolumeProfile.asset | 20474 B | вспомогательный файл: DefaultVolumeProfile |
| №1514 unity/Assets/DefaultVolumeProfile.asset.meta | 189 B | вспомогательный файл: DefaultVolumeProfile.asset |
| №1515 unity/Assets/LegacyContent.meta | 172 B | вспомогательный файл: LegacyContent |
| №1516 unity/Assets/LegacyContent/Catalog.asset | 9068 B | вспомогательный файл: Catalog |
| №1517 unity/Assets/LegacyContent/Catalog.asset.meta | 189 B | вспомогательный файл: Catalog.asset |
| №1518 unity/Assets/LegacyContent/geometry-contract.json | 2446 B | данные/конфигурация: geometry contract |
| №1519 unity/Assets/LegacyContent/geometry-contract.json.meta | 158 B | вспомогательный файл: geometry contract.json |
| №1520 unity/Assets/LegacyContent/Materials.meta | 172 B | вспомогательный файл: Materials |
| №1521 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat | 3851 B | вспомогательный файл: floor ceramic tile dark |
| №1522 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat.meta | 188 B | вспомогательный файл: floor ceramic tile dark.mat |
| №1523 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat | 3852 B | вспомогательный файл: floor ceramic tile light |
| №1524 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat.meta | 188 B | вспомогательный файл: floor ceramic tile light.mat |
| №1525 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat | 3846 B | вспомогательный файл: floor checker tile |
| №1526 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat.meta | 188 B | вспомогательный файл: floor checker tile.mat |
| №1527 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat | 3845 B | вспомогательный файл: floor cobblestone |
| №1528 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat.meta | 188 B | вспомогательный файл: floor cobblestone.mat |
| №1529 unity/Assets/LegacyContent/Materials/floor_earth.mat | 3838 B | вспомогательный файл: floor earth |
| №1530 unity/Assets/LegacyContent/Materials/floor_earth.mat.meta | 188 B | вспомогательный файл: floor earth.mat |
| №1531 unity/Assets/LegacyContent/Materials/floor_grass.mat | 3839 B | вспомогательный файл: floor grass |
| №1532 unity/Assets/LegacyContent/Materials/floor_grass.mat.meta | 188 B | вспомогательный файл: floor grass.mat |
| №1533 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat | 3841 B | вспомогательный файл: floor hex tile |
| №1534 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat.meta | 188 B | вспомогательный файл: floor hex tile.mat |
| №1535 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat | 3844 B | вспомогательный файл: floor marble dark |
| №1536 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat.meta | 188 B | вспомогательный файл: floor marble dark.mat |
| №1537 unity/Assets/LegacyContent/Materials/floor_marble_light.mat | 3846 B | вспомогательный файл: floor marble light |
| №1538 unity/Assets/LegacyContent/Materials/floor_marble_light.mat.meta | 188 B | вспомогательный файл: floor marble light.mat |
| №1539 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat | 3852 B | вспомогательный файл: floor parquet herringbone |
| №1540 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat.meta | 188 B | вспомогательный файл: floor parquet herringbone.mat |
| №1541 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat | 3841 B | вспомогательный файл: floor rug blue |
| №1542 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat.meta | 188 B | вспомогательный файл: floor rug blue.mat |
| №1543 unity/Assets/LegacyContent/Materials/floor_rug_green.mat | 3842 B | вспомогательный файл: floor rug green |
| №1544 unity/Assets/LegacyContent/Materials/floor_rug_green.mat.meta | 188 B | вспомогательный файл: floor rug green.mat |
| №1545 unity/Assets/LegacyContent/Materials/floor_rug_red.mat | 3840 B | вспомогательный файл: floor rug red |
| №1546 unity/Assets/LegacyContent/Materials/floor_rug_red.mat.meta | 188 B | вспомогательный файл: floor rug red.mat |
| №1547 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat | 3848 B | вспомогательный файл: floor stone tile dark |
| №1548 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat.meta | 188 B | вспомогательный файл: floor stone tile dark.mat |
| №1549 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat | 3849 B | вспомогательный файл: floor stone tile light |
| №1550 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat.meta | 188 B | вспомогательный файл: floor stone tile light.mat |
| №1551 unity/Assets/LegacyContent/Materials/floor_tatami.mat | 3840 B | вспомогательный файл: floor tatami |
| №1552 unity/Assets/LegacyContent/Materials/floor_tatami.mat.meta | 188 B | вспомогательный файл: floor tatami.mat |
| №1553 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat | 3842 B | вспомогательный файл: floor wood dark |
| №1554 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat.meta | 188 B | вспомогательный файл: floor wood dark.mat |
| №1555 unity/Assets/LegacyContent/Materials/floor_wood_light.mat | 3842 B | вспомогательный файл: floor wood light |
| №1556 unity/Assets/LegacyContent/Materials/floor_wood_light.mat.meta | 188 B | вспомогательный файл: floor wood light.mat |
| №1557 unity/Assets/LegacyContent/Materials/wall_brick_red.mat | 3842 B | вспомогательный файл: wall brick red |
| №1558 unity/Assets/LegacyContent/Materials/wall_brick_red.mat.meta | 188 B | вспомогательный файл: wall brick red.mat |
| №1559 unity/Assets/LegacyContent/Materials/wall_concrete.mat | 3841 B | вспомогательный файл: wall concrete |
| №1560 unity/Assets/LegacyContent/Materials/wall_concrete.mat.meta | 188 B | вспомогательный файл: wall concrete.mat |
| №1561 unity/Assets/LegacyContent/Materials/wall_half_timber.mat | 3844 B | вспомогательный файл: wall half timber |
| №1562 unity/Assets/LegacyContent/Materials/wall_half_timber.mat.meta | 188 B | вспомогательный файл: wall half timber.mat |
| №1563 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat | 3843 B | вспомогательный файл: wall marble dark |
| №1564 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat.meta | 188 B | вспомогательный файл: wall marble dark.mat |
| №1565 unity/Assets/LegacyContent/Materials/wall_marble_light.mat | 3845 B | вспомогательный файл: wall marble light |
| №1566 unity/Assets/LegacyContent/Materials/wall_marble_light.mat.meta | 188 B | вспомогательный файл: wall marble light.mat |
| №1567 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat | 3843 B | вспомогательный файл: wall moss stone |
| №1568 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat.meta | 188 B | вспомогательный файл: wall moss stone.mat |
| №1569 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat | 3843 B | вспомогательный файл: wall old plaster |
| №1570 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat.meta | 188 B | вспомогательный файл: wall old plaster.mat |
| №1571 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat | 3844 B | вспомогательный файл: wall plaster dark |
| №1572 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat.meta | 188 B | вспомогательный файл: wall plaster dark.mat |
| №1573 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat | 3846 B | вспомогательный файл: wall plaster light |
| №1574 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat.meta | 188 B | вспомогательный файл: wall plaster light.mat |
| №1575 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat | 3846 B | вспомогательный файл: wall plaster panel |
| №1576 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat.meta | 188 B | вспомогательный файл: wall plaster panel.mat |
| №1577 unity/Assets/LegacyContent/Materials/wall_slate.mat | 3837 B | вспомогательный файл: wall slate |
| №1578 unity/Assets/LegacyContent/Materials/wall_slate.mat.meta | 188 B | вспомогательный файл: wall slate.mat |
| №1579 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat | 3842 B | вспомогательный файл: wall stone dark |
| №1580 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat.meta | 188 B | вспомогательный файл: wall stone dark.mat |
| №1581 unity/Assets/LegacyContent/Materials/wall_stone_light.mat | 3843 B | вспомогательный файл: wall stone light |
| №1582 unity/Assets/LegacyContent/Materials/wall_stone_light.mat.meta | 188 B | вспомогательный файл: wall stone light.mat |
| №1583 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat | 3845 B | вспомогательный файл: wall stone masonry |
| №1584 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat.meta | 188 B | вспомогательный файл: wall stone masonry.mat |
| №1585 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat | 3841 B | вспомогательный файл: wall wallpaper |
| №1586 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat.meta | 188 B | вспомогательный файл: wall wallpaper.mat |
| №1587 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat | 3845 B | вспомогательный файл: wall white plaster |
| №1588 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat.meta | 188 B | вспомогательный файл: wall white plaster.mat |
| №1589 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat | 3841 B | вспомогательный файл: wall wood dark |
| №1590 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat.meta | 188 B | вспомогательный файл: wall wood dark.mat |
| №1591 unity/Assets/LegacyContent/Materials/wall_wood_light.mat | 3843 B | вспомогательный файл: wall wood light |
| №1592 unity/Assets/LegacyContent/Materials/wall_wood_light.mat.meta | 188 B | вспомогательный файл: wall wood light.mat |
| №1593 unity/Assets/LegacyContent/provenance.json | 28556 B | данные/конфигурация: provenance |
| №1594 unity/Assets/LegacyContent/provenance.json.meta | 158 B | вспомогательный файл: provenance.json |
| №1595 unity/Assets/LegacyContent/Source.meta | 172 B | вспомогательный файл: Source |
| №1596 unity/Assets/LegacyContent/Source/app.meta | 172 B | вспомогательный файл: app |
| №1597 unity/Assets/LegacyContent/Source/app/assets.meta | 172 B | вспомогательный файл: assets |
| №1598 unity/Assets/LegacyContent/Source/app/assets/3d.meta | 172 B | вспомогательный файл: 3d |
| №1599 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius.meta | 172 B | вспомогательный файл: quaternius |
| №1600 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models.meta | 172 B | вспомогательный файл: models |
| №1601 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin | 27188 B | 3D модель/геометрия: Bag |
| №1602 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin.meta | 155 B | вспомогательный файл: Bag.bin |
| №1603 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf | 4614 B | 3D модель/геометрия: Bag |
| №1604 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf.meta | 2193 B | вспомогательный файл: Bag.gltf |
| №1605 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | 3D модель/геометрия: Barrel Apples |
| №1606 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin.meta | 155 B | вспомогательный файл: Barrel Apples.bin |
| №1607 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6660 B | 3D модель/геометрия: Barrel Apples |
| №1608 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf.meta | 2849 B | вспомогательный файл: Barrel Apples.gltf |
| №1609 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin | 57144 B | 3D модель/геометрия: Barrel |
| №1610 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin.meta | 155 B | вспомогательный файл: Barrel.bin |
| №1611 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf | 4607 B | 3D модель/геометрия: Barrel |
| №1612 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf.meta | 2199 B | вспомогательный файл: Barrel.gltf |
| №1613 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | 3D модель/геометрия: Bed Twin1 |
| №1614 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin.meta | 155 B | вспомогательный файл: Bed Twin1.bin |
| №1615 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6636 B | 3D модель/геометрия: Bed Twin1 |
| №1616 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf.meta | 2841 B | вспомогательный файл: Bed Twin1.gltf |
| №1617 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin | 19304 B | 3D модель/геометрия: Bench |
| №1618 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin.meta | 155 B | вспомогательный файл: Bench.bin |
| №1619 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf | 4594 B | 3D модель/геометрия: Bench |
| №1620 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf.meta | 2197 B | вспомогательный файл: Bench.gltf |
| №1621 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | 3D модель/геометрия: Book Stack 2 |
| №1622 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin.meta | 155 B | вспомогательный файл: Book Stack 2.bin |
| №1623 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4605 B | 3D модель/геометрия: Book Stack 2 |
| №1624 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf.meta | 2187 B | вспомогательный файл: Book Stack 2.gltf |
| №1625 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | 3D модель/геометрия: Bookcase 2 |
| №1626 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin.meta | 155 B | вспомогательный файл: Bookcase 2.bin |
| №1627 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf | 4625 B | 3D модель/геометрия: Bookcase 2 |
| №1628 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf.meta | 2207 B | вспомогательный файл: Bookcase 2.gltf |
| №1629 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | 3D модель/геометрия: Bottle 1 |
| №1630 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin.meta | 155 B | вспомогательный файл: Bottle 1.bin |
| №1631 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf | 2586 B | 3D модель/геометрия: Bottle 1 |
| №1632 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf.meta | 1543 B | вспомогательный файл: Bottle 1.gltf |
| №1633 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | 3D модель/геометрия: Candle 2 |
| №1634 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin.meta | 155 B | вспомогательный файл: Candle 2.bin |
| №1635 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf | 2350 B | 3D модель/геометрия: Candle 2 |
| №1636 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf.meta | 1543 B | вспомогательный файл: Candle 2.gltf |
| №1637 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | 3D модель/геометрия: CandleStick Triple |
| №1638 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin.meta | 155 B | вспомогательный файл: CandleStick Triple.bin |
| №1639 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 4168 B | 3D модель/геометрия: CandleStick Triple |
| №1640 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf.meta | 2199 B | вспомогательный файл: CandleStick Triple.gltf |
| №1641 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | 3D модель/геометрия: Chair 1 |
| №1642 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin.meta | 155 B | вспомогательный файл: Chair 1.bin |
| №1643 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf | 4608 B | 3D модель/геометрия: Chair 1 |
| №1644 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf.meta | 2201 B | вспомогательный файл: Chair 1.gltf |
| №1645 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin | 15644 B | 3D модель/геометрия: Chalice |
| №1646 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin.meta | 155 B | вспомогательный файл: Chalice.bin |
| №1647 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf | 2356 B | 3D модель/геометрия: Chalice |
| №1648 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf.meta | 1541 B | вспомогательный файл: Chalice.gltf |
| №1649 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | 3D модель/геометрия: Chandelier |
| №1650 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin.meta | 155 B | вспомогательный файл: Chandelier.bin |
| №1651 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf | 6678 B | 3D модель/геометрия: Chandelier |
| №1652 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf.meta | 2843 B | вспомогательный файл: Chandelier.gltf |
| №1653 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | 3D модель/геометрия: Chest Wood |
| №1654 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin.meta | 155 B | вспомогательный файл: Chest Wood.bin |
| №1655 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf | 18141 B | 3D модель/геометрия: Chest Wood |
| №1656 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes | 22924 B | вспомогательный файл: Chest Wood.gltf |
| №1657 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes.meta | 158 B | вспомогательный файл: Chest Wood.gltf.bytes |
| №1658 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.meta | 720 B | вспомогательный файл: Chest Wood.gltf |
| №1659 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin | 14464 B | 3D модель/геометрия: Coin |
| №1660 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin.meta | 155 B | вспомогательный файл: Coin.bin |
| №1661 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf | 2581 B | 3D модель/геометрия: Coin |
| №1662 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf.meta | 1535 B | вспомогательный файл: Coin.gltf |
| №1663 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin | 12488 B | 3D модель/геометрия: Mug |
| №1664 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin.meta | 155 B | вспомогательный файл: Mug.bin |
| №1665 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf | 4149 B | 3D модель/геометрия: Mug |
| №1666 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf.meta | 2193 B | вспомогательный файл: Mug.gltf |
| №1667 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | 3D модель/геометрия: Pouch Large |
| №1668 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin.meta | 155 B | вспомогательный файл: Pouch Large.bin |
| №1669 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf | 4602 B | 3D модель/геометрия: Pouch Large |
| №1670 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf.meta | 2185 B | вспомогательный файл: Pouch Large.gltf |
| №1671 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | 3D модель/геометрия: Rope 1 |
| №1672 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin.meta | 155 B | вспомогательный файл: Rope 1.bin |
| №1673 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf | 2382 B | 3D модель/геометрия: Rope 1 |
| №1674 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf.meta | 1563 B | вспомогательный файл: Rope 1.gltf |
| №1675 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | 3D модель/геометрия: Shelf Simple |
| №1676 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin.meta | 155 B | вспомогательный файл: Shelf Simple.bin |
| №1677 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2383 B | 3D модель/геометрия: Shelf Simple |
| №1678 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf.meta | 1575 B | вспомогательный файл: Shelf Simple.gltf |
| №1679 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin | 11472 B | 3D модель/геометрия: Stool |
| №1680 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin.meta | 155 B | вспомогательный файл: Stool.bin |
| №1681 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf | 2596 B | 3D модель/геометрия: Stool |
| №1682 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf.meta | 1561 B | вспомогательный файл: Stool.gltf |
| №1683 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png | 1936754 B | текстура/изображение: T Trim Cloth BaseColor |
| №1684 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Cloth BaseColor.png |
| №1685 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png | 3920858 B | текстура/изображение: T Trim Cloth Normal |
| №1686 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Cloth Normal.png |
| №1687 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png | 623426 B | текстура/изображение: T Trim Cloth ORM |
| №1688 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Cloth ORM.png |
| №1689 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png | 2232961 B | текстура/изображение: T Trim Furniture BaseColor |
| №1690 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Furniture BaseColor.png |
| №1691 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png | 3485710 B | текстура/изображение: T Trim Furniture Normal |
| №1692 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Furniture Normal.png |
| №1693 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png | 2064585 B | текстура/изображение: T Trim Furniture ORM |
| №1694 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Furniture ORM.png |
| №1695 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png | 1361221 B | текстура/изображение: T Trim Metal BaseColor |
| №1696 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Metal BaseColor.png |
| №1697 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png | 3625541 B | текстура/изображение: T Trim Metal Normal |
| №1698 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Metal Normal.png |
| №1699 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png | 1871475 B | текстура/изображение: T Trim Metal ORM |
| №1700 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Metal ORM.png |
| №1701 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png | 2263132 B | текстура/изображение: T Trim Props BaseColor |
| №1702 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Props BaseColor.png |
| №1703 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png | 4441458 B | текстура/изображение: T Trim Props Normal |
| №1704 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Props Normal.png |
| №1705 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png | 3017151 B | текстура/изображение: T Trim Props ORM |
| №1706 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Props ORM.png |
| №1707 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | 3D модель/геометрия: Table Fork |
| №1708 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin.meta | 155 B | вспомогательный файл: Table Fork.bin |
| №1709 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf | 2348 B | 3D модель/геометрия: Table Fork |
| №1710 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf.meta | 1547 B | вспомогательный файл: Table Fork.gltf |
| №1711 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | 3D модель/геометрия: Table Knife |
| №1712 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin.meta | 155 B | вспомогательный файл: Table Knife.bin |
| №1713 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf | 2345 B | 3D модель/геометрия: Table Knife |
| №1714 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf.meta | 1549 B | вспомогательный файл: Table Knife.gltf |
| №1715 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | 3D модель/геометрия: Table Large |
| №1716 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin.meta | 155 B | вспомогательный файл: Table Large.bin |
| №1717 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf | 4612 B | 3D модель/геометрия: Table Large |
| №1718 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf.meta | 2209 B | вспомогательный файл: Table Large.gltf |
| №1719 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | 3D модель/геометрия: Table Plate |
| №1720 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin.meta | 155 B | вспомогательный файл: Table Plate.bin |
| №1721 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf | 2358 B | 3D модель/геометрия: Table Plate |
| №1722 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf.meta | 1549 B | вспомогательный файл: Table Plate.gltf |
| №1723 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | 3D модель/геометрия: Table Spoon |
| №1724 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin.meta | 155 B | вспомогательный файл: Table Spoon.bin |
| №1725 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf | 2350 B | 3D модель/геометрия: Table Spoon |
| №1726 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf.meta | 1549 B | вспомогательный файл: Table Spoon.gltf |
| №1727 unity/Assets/LegacyContent/Source/app/data.meta | 172 B | вспомогательный файл: data |
| №1728 unity/Assets/LegacyContent/Source/app/data/maps.meta | 172 B | вспомогательный файл: maps |
| №1729 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №1730 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json.meta | 158 B | вспомогательный файл: 3d castle black rose v740030.json |
| №1731 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №1732 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json.meta | 158 B | вспомогательный файл: 3d castle v740019.json |
| №1733 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №1734 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json.meta | 158 B | вспомогательный файл: 3d house v740019.json |
| №1735 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json | 170566 B | данные/конфигурация: 3d stress test all |
| №1736 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json.meta | 158 B | вспомогательный файл: 3d stress test all.json |
| №1737 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №1738 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json.meta | 158 B | вспомогательный файл: 3d stress v740026.json |
| №1739 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №1740 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json.meta | 158 B | вспомогательный файл: 3d tavern v740019.json |
| №1741 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №1742 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json.meta | 158 B | вспомогательный файл: 3d test dungeon.json |
| №1743 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №1744 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json.meta | 158 B | вспомогательный файл: 3d town v740019.json |
| №1745 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №1746 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json.meta | 158 B | вспомогательный файл: 3d village v740019.json |
| №1747 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1748 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png.meta | 3009 B | вспомогательный файл: floor ceramic tile dark.png |
| №1749 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1750 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png.meta | 3009 B | вспомогательный файл: floor ceramic tile light.png |
| №1751 unity/Assets/LegacyContent/Source/floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1752 unity/Assets/LegacyContent/Source/floor_checker_tile.png.meta | 3009 B | вспомогательный файл: floor checker tile.png |
| №1753 unity/Assets/LegacyContent/Source/floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1754 unity/Assets/LegacyContent/Source/floor_cobblestone.png.meta | 3009 B | вспомогательный файл: floor cobblestone.png |
| №1755 unity/Assets/LegacyContent/Source/floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1756 unity/Assets/LegacyContent/Source/floor_earth.png.meta | 3009 B | вспомогательный файл: floor earth.png |
| №1757 unity/Assets/LegacyContent/Source/floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1758 unity/Assets/LegacyContent/Source/floor_grass.png.meta | 3009 B | вспомогательный файл: floor grass.png |
| №1759 unity/Assets/LegacyContent/Source/floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1760 unity/Assets/LegacyContent/Source/floor_hex_tile.png.meta | 3009 B | вспомогательный файл: floor hex tile.png |
| №1761 unity/Assets/LegacyContent/Source/floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1762 unity/Assets/LegacyContent/Source/floor_marble_dark.png.meta | 3009 B | вспомогательный файл: floor marble dark.png |
| №1763 unity/Assets/LegacyContent/Source/floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1764 unity/Assets/LegacyContent/Source/floor_marble_light.png.meta | 3009 B | вспомогательный файл: floor marble light.png |
| №1765 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1766 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png.meta | 3009 B | вспомогательный файл: floor parquet herringbone.png |
| №1767 unity/Assets/LegacyContent/Source/floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1768 unity/Assets/LegacyContent/Source/floor_rug_blue.png.meta | 3009 B | вспомогательный файл: floor rug blue.png |
| №1769 unity/Assets/LegacyContent/Source/floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1770 unity/Assets/LegacyContent/Source/floor_rug_green.png.meta | 3009 B | вспомогательный файл: floor rug green.png |
| №1771 unity/Assets/LegacyContent/Source/floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1772 unity/Assets/LegacyContent/Source/floor_rug_red.png.meta | 3009 B | вспомогательный файл: floor rug red.png |
| №1773 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1774 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png.meta | 3009 B | вспомогательный файл: floor stone tile dark.png |
| №1775 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1776 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png.meta | 3009 B | вспомогательный файл: floor stone tile light.png |
| №1777 unity/Assets/LegacyContent/Source/floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1778 unity/Assets/LegacyContent/Source/floor_tatami.png.meta | 3009 B | вспомогательный файл: floor tatami.png |
| №1779 unity/Assets/LegacyContent/Source/floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1780 unity/Assets/LegacyContent/Source/floor_wood_dark.png.meta | 3009 B | вспомогательный файл: floor wood dark.png |
| №1781 unity/Assets/LegacyContent/Source/floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1782 unity/Assets/LegacyContent/Source/floor_wood_light.png.meta | 3009 B | вспомогательный файл: floor wood light.png |
| №1783 unity/Assets/LegacyContent/Source/wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1784 unity/Assets/LegacyContent/Source/wall_brick_red.png.meta | 3009 B | вспомогательный файл: wall brick red.png |
| №1785 unity/Assets/LegacyContent/Source/wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1786 unity/Assets/LegacyContent/Source/wall_concrete.png.meta | 3009 B | вспомогательный файл: wall concrete.png |
| №1787 unity/Assets/LegacyContent/Source/wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1788 unity/Assets/LegacyContent/Source/wall_half_timber.png.meta | 3009 B | вспомогательный файл: wall half timber.png |
| №1789 unity/Assets/LegacyContent/Source/wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1790 unity/Assets/LegacyContent/Source/wall_marble_dark.png.meta | 3009 B | вспомогательный файл: wall marble dark.png |
| №1791 unity/Assets/LegacyContent/Source/wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1792 unity/Assets/LegacyContent/Source/wall_marble_light.png.meta | 3009 B | вспомогательный файл: wall marble light.png |
| №1793 unity/Assets/LegacyContent/Source/wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1794 unity/Assets/LegacyContent/Source/wall_moss_stone.png.meta | 3009 B | вспомогательный файл: wall moss stone.png |
| №1795 unity/Assets/LegacyContent/Source/wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1796 unity/Assets/LegacyContent/Source/wall_old_plaster.png.meta | 3009 B | вспомогательный файл: wall old plaster.png |
| №1797 unity/Assets/LegacyContent/Source/wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1798 unity/Assets/LegacyContent/Source/wall_plaster_dark.png.meta | 3009 B | вспомогательный файл: wall plaster dark.png |
| №1799 unity/Assets/LegacyContent/Source/wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1800 unity/Assets/LegacyContent/Source/wall_plaster_light.png.meta | 3009 B | вспомогательный файл: wall plaster light.png |
| №1801 unity/Assets/LegacyContent/Source/wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1802 unity/Assets/LegacyContent/Source/wall_plaster_panel.png.meta | 3009 B | вспомогательный файл: wall plaster panel.png |
| №1803 unity/Assets/LegacyContent/Source/wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1804 unity/Assets/LegacyContent/Source/wall_slate.png.meta | 3009 B | вспомогательный файл: wall slate.png |
| №1805 unity/Assets/LegacyContent/Source/wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1806 unity/Assets/LegacyContent/Source/wall_stone_dark.png.meta | 3009 B | вспомогательный файл: wall stone dark.png |
| №1807 unity/Assets/LegacyContent/Source/wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1808 unity/Assets/LegacyContent/Source/wall_stone_light.png.meta | 3009 B | вспомогательный файл: wall stone light.png |
| №1809 unity/Assets/LegacyContent/Source/wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1810 unity/Assets/LegacyContent/Source/wall_stone_masonry.png.meta | 3009 B | вспомогательный файл: wall stone masonry.png |
| №1811 unity/Assets/LegacyContent/Source/wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1812 unity/Assets/LegacyContent/Source/wall_wallpaper.png.meta | 3009 B | вспомогательный файл: wall wallpaper.png |
| №1813 unity/Assets/LegacyContent/Source/wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1814 unity/Assets/LegacyContent/Source/wall_white_plaster.png.meta | 3009 B | вспомогательный файл: wall white plaster.png |
| №1815 unity/Assets/LegacyContent/Source/wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1816 unity/Assets/LegacyContent/Source/wall_wood_dark.png.meta | 3009 B | вспомогательный файл: wall wood dark.png |
| №1817 unity/Assets/LegacyContent/Source/wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1818 unity/Assets/LegacyContent/Source/wall_wood_light.png.meta | 3009 B | вспомогательный файл: wall wood light.png |
| №1819 unity/Assets/Plugins.meta | 172 B | вспомогательный файл: Plugins |
| №1820 unity/Assets/Plugins/Android.meta | 172 B | вспомогательный файл: Android |
| №1821 unity/Assets/Plugins/Android/CharacterDocumentActivity.java | 6089 B | вспомогательный файл: CharacterDocumentActivity |
| №1822 unity/Assets/Plugins/Android/CharacterDocumentActivity.java.meta | 60 B | вспомогательный файл: CharacterDocumentActivity.java |
| №1823 unity/Assets/Plugins/Android/DndSessionVault.java | 2333 B | вспомогательный файл: DndSessionVault |
| №1824 unity/Assets/Plugins/Android/DndSessionVault.java.meta | 60 B | вспомогательный файл: DndSessionVault.java |
| №1825 unity/Assets/Plugins/Android/UpdateProvider.java | 11429 B | вспомогательный файл: UpdateProvider |
| №1826 unity/Assets/Plugins/Android/UpdateProvider.java.meta | 60 B | вспомогательный файл: UpdateProvider.java |
| №1827 unity/Assets/StreamingAssets/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1828 unity/Assets/StreamingAssets/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1829 unity/Assets/StreamingAssets/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1830 unity/Assets/UniversalRenderPipelineGlobalSettings.asset | 25900 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings |
| №1831 unity/Assets/UniversalRenderPipelineGlobalSettings.asset.meta | 189 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings.asset |
| №1832 unity/Assets/Vtt.meta | 172 B | вспомогательный файл: Vtt |
| №1833 unity/Assets/Vtt/Editor.meta | 172 B | вспомогательный файл: Editor |
| №1834 unity/Assets/Vtt/Editor/BrandingResumeValidation.cs | 8891 B | вспомогательный файл: BrandingResumeValidation |
| №1835 unity/Assets/Vtt/Editor/BrandingResumeValidation.cs.meta | 60 B | вспомогательный файл: BrandingResumeValidation.cs |
| №1836 unity/Assets/Vtt/Editor/BuildBranding.cs | 2738 B | вспомогательный файл: BuildBranding |
| №1837 unity/Assets/Vtt/Editor/BuildBranding.cs.meta | 60 B | вспомогательный файл: BuildBranding.cs |
| №1838 unity/Assets/Vtt/Editor/CharacterPreviewImport.cs | 1433 B | вспомогательный файл: CharacterPreviewImport |
| №1839 unity/Assets/Vtt/Editor/CharacterPreviewImport.cs.meta | 60 B | вспомогательный файл: CharacterPreviewImport.cs |
| №1840 unity/Assets/Vtt/Editor/CharacterPreviewValidation.cs | 8132 B | вспомогательный файл: CharacterPreviewValidation |
| №1841 unity/Assets/Vtt/Editor/CharacterPreviewValidation.cs.meta | 60 B | вспомогательный файл: CharacterPreviewValidation.cs |
| №1842 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs | 21197 B | вспомогательный файл: CharacterSheetValidation |
| №1843 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs.meta | 59 B | вспомогательный файл: CharacterSheetValidation.cs |
| №1844 unity/Assets/Vtt/Editor/DiceBuildGate.cs | 4583 B | вспомогательный файл: DiceBuildGate |
| №1845 unity/Assets/Vtt/Editor/DiceBuildGate.cs.meta | 60 B | вспомогательный файл: DiceBuildGate.cs |
| №1846 unity/Assets/Vtt/Editor/DiceValidation.cs | 42160 B | вспомогательный файл: DiceValidation |
| №1847 unity/Assets/Vtt/Editor/DiceValidation.cs.meta | 60 B | вспомогательный файл: DiceValidation.cs |
| №1848 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs | 10967 B | вспомогательный файл: LegacyMigrationSetup |
| №1849 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSetup.cs |
| №1850 unity/Assets/Vtt/Editor/PrototypeSetup.cs | 7704 B | вспомогательный файл: PrototypeSetup |
| №1851 unity/Assets/Vtt/Editor/PrototypeSetup.cs.meta | 59 B | вспомогательный файл: PrototypeSetup.cs |
| №1852 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs | 17569 B | вспомогательный файл: UnityReleaseBuild |
| №1853 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs.meta | 60 B | вспомогательный файл: UnityReleaseBuild.cs |
| №1854 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs | 3632 B | вспомогательный файл: WorkshopBundleBuild |
| №1855 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs.meta | 60 B | вспомогательный файл: WorkshopBundleBuild.cs |
| №1856 unity/Assets/Vtt/Editor/WorkshopEditorValidation.cs | 35729 B | вспомогательный файл: WorkshopEditorValidation |
| №1857 unity/Assets/Vtt/Editor/WorkshopEditorValidation.cs.meta | 60 B | вспомогательный файл: WorkshopEditorValidation.cs |
| №1858 unity/Assets/Vtt/Resources.meta | 172 B | вспомогательный файл: Resources |
| №1859 unity/Assets/Vtt/Resources/Branding.meta | 172 B | вспомогательный файл: Branding |
| №1860 unity/Assets/Vtt/Resources/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1861 unity/Assets/Vtt/Resources/Branding/Dragon20.png.meta | 886 B | вспомогательный файл: Dragon20.png |
| №1862 unity/Assets/Vtt/Resources/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1863 unity/Assets/Vtt/Resources/Branding/Splash19.png.meta | 886 B | вспомогательный файл: Splash19.png |
| №1864 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1865 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg.meta | 886 B | вспомогательный файл: Wallpaper16.jpg |
| №1866 unity/Assets/Vtt/Resources/Changelog.json | 68471 B | данные/конфигурация: Changelog |
| №1867 unity/Assets/Vtt/Resources/Changelog.json.meta | 158 B | вспомогательный файл: Changelog.json |
| №1868 unity/Assets/Vtt/Resources/CharacterSheet.meta | 172 B | вспомогательный файл: CharacterSheet |
| №1869 unity/Assets/Vtt/Resources/CharacterSheet/advancement.json | 260278 B | данные/конфигурация: advancement |
| №1870 unity/Assets/Vtt/Resources/CharacterSheet/advancement.json.meta | 60 B | вспомогательный файл: advancement.json |
| №1871 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json | 823381 B | данные/конфигурация: catalog |
| №1872 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json.meta | 158 B | вспомогательный файл: catalog.json |
| №1873 unity/Assets/Vtt/Resources/CharacterSheet/market.json | 96596 B | данные/конфигурация: market |
| №1874 unity/Assets/Vtt/Resources/CharacterSheet/market.json.meta | 60 B | вспомогательный файл: market.json |
| №1875 unity/Assets/Vtt/Resources/CharacterSheet/production.json | 44738 B | данные/конфигурация: production |
| №1876 unity/Assets/Vtt/Resources/CharacterSheet/production.json.meta | 60 B | вспомогательный файл: production.json |
| №1877 unity/Assets/Vtt/Resources/CharacterStudio.meta | 77 B | вспомогательный файл: CharacterStudio |
| №1878 unity/Assets/Vtt/Resources/CharacterStudio/DefaultFemale.json | 3860 B | данные/конфигурация: DefaultFemale |
| №1879 unity/Assets/Vtt/Resources/CharacterStudio/DefaultFemale.json.meta | 60 B | вспомогательный файл: DefaultFemale.json |
| №1880 unity/Assets/Vtt/Resources/CharacterStudio/DefaultMale.json | 3851 B | данные/конфигурация: DefaultMale |
| №1881 unity/Assets/Vtt/Resources/CharacterStudio/DefaultMale.json.meta | 60 B | вспомогательный файл: DefaultMale.json |
| №1882 unity/Assets/Vtt/Resources/CharacterStudio/HumanBody.fbx | 6899052 B | вспомогательный файл: HumanBody |
| №1883 unity/Assets/Vtt/Resources/CharacterStudio/HumanBody.fbx.meta | 60 B | вспомогательный файл: HumanBody.fbx |
| №1884 unity/Assets/Vtt/Resources/CharacterStudio/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №1885 unity/Assets/Vtt/Resources/CharacterStudio/LICENSE.ASSETS.md.meta | 60 B | вспомогательный файл: LICENSE.ASSETS.md |
| №1886 unity/Assets/Vtt/Resources/CharacterStudio/MorphCatalog.json | 2701 B | данные/конфигурация: MorphCatalog |
| №1887 unity/Assets/Vtt/Resources/CharacterStudio/MorphCatalog.json.meta | 60 B | вспомогательный файл: MorphCatalog.json |
| №1888 unity/Assets/Vtt/Resources/CharacterStudio/PreviewLit.mat | 1027 B | вспомогательный файл: PreviewLit |
| №1889 unity/Assets/Vtt/Resources/CharacterStudio/PreviewLit.mat.meta | 60 B | вспомогательный файл: PreviewLit.mat |
| №1890 unity/Assets/Vtt/Resources/CharacterStudio/PreviewStudio.shader | 2521 B | вспомогательный файл: PreviewStudio |
| №1891 unity/Assets/Vtt/Resources/CharacterStudio/PreviewStudio.shader.meta | 204 B | вспомогательный файл: PreviewStudio.shader |
| №1892 unity/Assets/Vtt/Resources/CharacterStudio/SkinFemale.png | 4391156 B | текстура/изображение: SkinFemale |
| №1893 unity/Assets/Vtt/Resources/CharacterStudio/SkinFemale.png.meta | 585 B | вспомогательный файл: SkinFemale.png |
| №1894 unity/Assets/Vtt/Resources/CharacterStudio/SkinMale.png | 3693828 B | текстура/изображение: SkinMale |
| №1895 unity/Assets/Vtt/Resources/CharacterStudio/SkinMale.png.meta | 585 B | вспомогательный файл: SkinMale.png |
| №1896 unity/Assets/Vtt/Resources/Dice.meta | 77 B | вспомогательный файл: Dice |
| №1897 unity/Assets/Vtt/Resources/Dice/DiceNumeral.shader | 1428 B | вспомогательный файл: DiceNumeral |
| №1898 unity/Assets/Vtt/Resources/Dice/DiceNumeral.shader.meta | 60 B | вспомогательный файл: DiceNumeral.shader |
| №1899 unity/Assets/Vtt/Resources/Dice/DiceSurface.shader | 3471 B | вспомогательный файл: DiceSurface |
| №1900 unity/Assets/Vtt/Resources/Dice/DiceSurface.shader.meta | 60 B | вспомогательный файл: DiceSurface.shader |
| №1901 unity/Assets/Vtt/Resources/UI.meta | 77 B | вспомогательный файл: UI |
| №1902 unity/Assets/Vtt/Resources/UI/DejaVu-LICENSE.txt | 3859 B | документация или отчёт: DejaVu LICENSE |
| №1903 unity/Assets/Vtt/Resources/UI/DejaVu-LICENSE.txt.meta | 60 B | вспомогательный файл: DejaVu LICENSE.txt |
| №1904 unity/Assets/Vtt/Resources/UI/DejaVuSans.ttf | 759720 B | вспомогательный файл: DejaVuSans |
| №1905 unity/Assets/Vtt/Resources/UI/DejaVuSans.ttf.meta | 496 B | вспомогательный файл: DejaVuSans.ttf |
| №1906 unity/Assets/Vtt/Resources/UI/Grimoire.meta | 172 B | вспомогательный файл: Grimoire |
| №1907 unity/Assets/Vtt/Resources/UI/Grimoire/backgrounds.meta | 172 B | вспомогательный файл: backgrounds |
| №1908 unity/Assets/Vtt/Resources/UI/Grimoire/backgrounds/bg_graphite_1080x1920.png | 1079914 B | текстура/изображение: bg graphite 1080x1920 |
| №1909 unity/Assets/Vtt/Resources/UI/Grimoire/backgrounds/bg_graphite_1080x1920.png.meta | 565 B | вспомогательный файл: bg graphite 1080x1920.png |
| №1910 unity/Assets/Vtt/Resources/UI/Grimoire/backgrounds/bg_parchment_stone_tile_512.png | 13384 B | текстура/изображение: bg parchment stone tile 512 |
| №1911 unity/Assets/Vtt/Resources/UI/Grimoire/backgrounds/bg_parchment_stone_tile_512.png.meta | 565 B | вспомогательный файл: bg parchment stone tile 512.png |
| №1912 unity/Assets/Vtt/Resources/UI/Grimoire/bars.meta | 172 B | вспомогательный файл: bars |
| №1913 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_experience_fill_mask_9s.png | 1100 B | текстура/изображение: bar experience fill mask 9s |
| №1914 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_experience_fill_mask_9s.png.meta | 565 B | вспомогательный файл: bar experience fill mask 9s.png |
| №1915 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_experience_track_9s.png | 2599 B | текстура/изображение: bar experience track 9s |
| №1916 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_experience_track_9s.png.meta | 565 B | вспомогательный файл: bar experience track 9s.png |
| №1917 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_health_fill_mask_9s.png | 1140 B | текстура/изображение: bar health fill mask 9s |
| №1918 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_health_fill_mask_9s.png.meta | 565 B | вспомогательный файл: bar health fill mask 9s.png |
| №1919 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_health_track_9s.png | 2602 B | текстура/изображение: bar health track 9s |
| №1920 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_health_track_9s.png.meta | 565 B | вспомогательный файл: bar health track 9s.png |
| №1921 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_resource_fill_mask_9s.png | 1133 B | текстура/изображение: bar resource fill mask 9s |
| №1922 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_resource_fill_mask_9s.png.meta | 565 B | вспомогательный файл: bar resource fill mask 9s.png |
| №1923 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_resource_track_9s.png | 2592 B | текстура/изображение: bar resource track 9s |
| №1924 unity/Assets/Vtt/Resources/UI/Grimoire/bars/bar_resource_track_9s.png.meta | 565 B | вспомогательный файл: bar resource track 9s.png |
| №1925 unity/Assets/Vtt/Resources/UI/Grimoire/buttons.meta | 172 B | вспомогательный файл: buttons |
| №1926 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_accent_mask_9s.png | 1138 B | текстура/изображение: button danger accent mask 9s |
| №1927 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_accent_mask_9s.png.meta | 565 B | вспомогательный файл: button danger accent mask 9s.png |
| №1928 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_disabled_9s.png | 1325 B | текстура/изображение: button danger disabled 9s |
| №1929 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_disabled_9s.png.meta | 565 B | вспомогательный файл: button danger disabled 9s.png |
| №1930 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_hover_9s.png | 1415 B | текстура/изображение: button danger hover 9s |
| №1931 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_hover_9s.png.meta | 565 B | вспомогательный файл: button danger hover 9s.png |
| №1932 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_normal_9s.png | 1393 B | текстура/изображение: button danger normal 9s |
| №1933 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_normal_9s.png.meta | 565 B | вспомогательный файл: button danger normal 9s.png |
| №1934 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_pressed_9s.png | 1433 B | текстура/изображение: button danger pressed 9s |
| №1935 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_pressed_9s.png.meta | 565 B | вспомогательный файл: button danger pressed 9s.png |
| №1936 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_accent_mask_9s.png | 1138 B | текстура/изображение: button ghost accent mask 9s |
| №1937 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_accent_mask_9s.png.meta | 565 B | вспомогательный файл: button ghost accent mask 9s.png |
| №1938 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_disabled_9s.png | 1237 B | текстура/изображение: button ghost disabled 9s |
| №1939 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_disabled_9s.png.meta | 565 B | вспомогательный файл: button ghost disabled 9s.png |
| №1940 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_hover_9s.png | 1337 B | текстура/изображение: button ghost hover 9s |
| №1941 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_hover_9s.png.meta | 565 B | вспомогательный файл: button ghost hover 9s.png |
| №1942 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_normal_9s.png | 1312 B | текстура/изображение: button ghost normal 9s |
| №1943 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_normal_9s.png.meta | 565 B | вспомогательный файл: button ghost normal 9s.png |
| №1944 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_pressed_9s.png | 1317 B | текстура/изображение: button ghost pressed 9s |
| №1945 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_pressed_9s.png.meta | 565 B | вспомогательный файл: button ghost pressed 9s.png |
| №1946 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_accent_mask_9s.png | 1246 B | текстура/изображение: button primary accent mask 9s |
| №1947 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_accent_mask_9s.png.meta | 565 B | вспомогательный файл: button primary accent mask 9s.png |
| №1948 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_disabled_9s.png | 2019 B | текстура/изображение: button primary disabled 9s |
| №1949 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_disabled_9s.png.meta | 565 B | вспомогательный файл: button primary disabled 9s.png |
| №1950 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_hover_9s.png | 2103 B | текстура/изображение: button primary hover 9s |
| №1951 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_hover_9s.png.meta | 565 B | вспомогательный файл: button primary hover 9s.png |
| №1952 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_normal_9s.png | 2108 B | текстура/изображение: button primary normal 9s |
| №1953 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_normal_9s.png.meta | 565 B | вспомогательный файл: button primary normal 9s.png |
| №1954 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_pressed_9s.png | 2066 B | текстура/изображение: button primary pressed 9s |
| №1955 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_primary_pressed_9s.png.meta | 565 B | вспомогательный файл: button primary pressed 9s.png |
| №1956 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_accent_mask_9s.png | 1138 B | текстура/изображение: button secondary accent mask 9s |
| №1957 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_accent_mask_9s.png.meta | 565 B | вспомогательный файл: button secondary accent mask 9s.png |
| №1958 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_disabled_9s.png | 1306 B | текстура/изображение: button secondary disabled 9s |
| №1959 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_disabled_9s.png.meta | 565 B | вспомогательный файл: button secondary disabled 9s.png |
| №1960 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_hover_9s.png | 1401 B | текстура/изображение: button secondary hover 9s |
| №1961 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_hover_9s.png.meta | 565 B | вспомогательный файл: button secondary hover 9s.png |
| №1962 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_normal_9s.png | 1444 B | текстура/изображение: button secondary normal 9s |
| №1963 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_normal_9s.png.meta | 565 B | вспомогательный файл: button secondary normal 9s.png |
| №1964 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_pressed_9s.png | 1421 B | текстура/изображение: button secondary pressed 9s |
| №1965 unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_pressed_9s.png.meta | 565 B | вспомогательный файл: button secondary pressed 9s.png |
| №1966 unity/Assets/Vtt/Resources/UI/Grimoire/dividers.meta | 172 B | вспомогательный файл: dividers |
| №1967 unity/Assets/Vtt/Resources/UI/Grimoire/dividers/divider_double_mask.png | 373 B | текстура/изображение: divider double mask |
| №1968 unity/Assets/Vtt/Resources/UI/Grimoire/dividers/divider_double_mask.png.meta | 565 B | вспомогательный файл: divider double mask.png |
| №1969 unity/Assets/Vtt/Resources/UI/Grimoire/dividers/divider_line_mask.png | 648 B | текстура/изображение: divider line mask |
| №1970 unity/Assets/Vtt/Resources/UI/Grimoire/dividers/divider_line_mask.png.meta | 565 B | вспомогательный файл: divider line mask.png |
| №1971 unity/Assets/Vtt/Resources/UI/Grimoire/dividers/divider_runic_mask.png | 981 B | текстура/изображение: divider runic mask |
| №1972 unity/Assets/Vtt/Resources/UI/Grimoire/dividers/divider_runic_mask.png.meta | 565 B | вспомогательный файл: divider runic mask.png |
| №1973 unity/Assets/Vtt/Resources/UI/Grimoire/frames.meta | 172 B | вспомогательный файл: frames |
| №1974 unity/Assets/Vtt/Resources/UI/Grimoire/frames/frame_hero_mask_9s.png | 2195 B | текстура/изображение: frame hero mask 9s |
| №1975 unity/Assets/Vtt/Resources/UI/Grimoire/frames/frame_hero_mask_9s.png.meta | 565 B | вспомогательный файл: frame hero mask 9s.png |
| №1976 unity/Assets/Vtt/Resources/UI/Grimoire/frames/frame_minimal_mask_9s.png | 1377 B | текстура/изображение: frame minimal mask 9s |
| №1977 unity/Assets/Vtt/Resources/UI/Grimoire/frames/frame_minimal_mask_9s.png.meta | 565 B | вспомогательный файл: frame minimal mask 9s.png |
| №1978 unity/Assets/Vtt/Resources/UI/Grimoire/frames/frame_ornate_mask_9s.png | 1904 B | текстура/изображение: frame ornate mask 9s |
| №1979 unity/Assets/Vtt/Resources/UI/Grimoire/frames/frame_ornate_mask_9s.png.meta | 565 B | вспомогательный файл: frame ornate mask 9s.png |
| №1980 unity/Assets/Vtt/Resources/UI/Grimoire/icons.meta | 172 B | вспомогательный файл: icons |
| №1981 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_abilities_96.png | 1215 B | текстура/изображение: icon abilities 96 |
| №1982 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_abilities_96.png.meta | 565 B | вспомогательный файл: icon abilities 96.png |
| №1983 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_add_96.png | 1740 B | текстура/изображение: icon add 96 |
| №1984 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_add_96.png.meta | 565 B | вспомогательный файл: icon add 96.png |
| №1985 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_attack_96.png | 953 B | текстура/изображение: icon attack 96 |
| №1986 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_attack_96.png.meta | 565 B | вспомогательный файл: icon attack 96.png |
| №1987 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_clock_96.png | 1037 B | текстура/изображение: icon clock 96 |
| №1988 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_clock_96.png.meta | 565 B | вспомогательный файл: icon clock 96.png |
| №1989 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_conditions_96.png | 1853 B | текстура/изображение: icon conditions 96 |
| №1990 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_conditions_96.png.meta | 565 B | вспомогательный файл: icon conditions 96.png |
| №1991 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_containers_96.png | 862 B | текстура/изображение: icon containers 96 |
| №1992 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_containers_96.png.meta | 565 B | вспомогательный файл: icon containers 96.png |
| №1993 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_crafts_96.png | 803 B | текстура/изображение: icon crafts 96 |
| №1994 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_crafts_96.png.meta | 565 B | вспомогательный файл: icon crafts 96.png |
| №1995 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_dice_96.png | 1968 B | текстура/изображение: icon dice 96 |
| №1996 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_dice_96.png.meta | 565 B | вспомогательный файл: icon dice 96.png |
| №1997 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_filter_96.png | 922 B | текстура/изображение: icon filter 96 |
| №1998 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_filter_96.png.meta | 565 B | вспомогательный файл: icon filter 96.png |
| №1999 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_gold_96.png | 2365 B | текстура/изображение: icon gold 96 |
| №2000 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_gold_96.png.meta | 565 B | вспомогательный файл: icon gold 96.png |
| №2001 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_hero_96.png | 1279 B | текстура/изображение: icon hero 96 |
| №2002 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_hero_96.png.meta | 565 B | вспомогательный файл: icon hero 96.png |
| №2003 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_hp_96.png | 1203 B | текстура/изображение: icon hp 96 |
| №2004 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_hp_96.png.meta | 565 B | вспомогательный файл: icon hp 96.png |
| №2005 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_inventory_96.png | 1189 B | текстура/изображение: icon inventory 96 |
| №2006 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_inventory_96.png.meta | 565 B | вспомогательный файл: icon inventory 96.png |
| №2007 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_lore_96.png | 1950 B | текстура/изображение: icon lore 96 |
| №2008 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_lore_96.png.meta | 565 B | вспомогательный файл: icon lore 96.png |
| №2009 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_magic_96.png | 1495 B | текстура/изображение: icon magic 96 |
| №2010 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_magic_96.png.meta | 565 B | вспомогательный файл: icon magic 96.png |
| №2011 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_map_96.png | 1306 B | текстура/изображение: icon map 96 |
| №2012 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_map_96.png.meta | 565 B | вспомогательный файл: icon map 96.png |
| №2013 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_notes_96.png | 829 B | текстура/изображение: icon notes 96 |
| №2014 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_notes_96.png.meta | 565 B | вспомогательный файл: icon notes 96.png |
| №2015 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_pin_96.png | 2064 B | текстура/изображение: icon pin 96 |
| №2016 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_pin_96.png.meta | 565 B | вспомогательный файл: icon pin 96.png |
| №2017 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_search_96.png | 1353 B | текстура/изображение: icon search 96 |
| №2018 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_search_96.png.meta | 565 B | вспомогательный файл: icon search 96.png |
| №2019 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_settings_96.png | 1949 B | текстура/изображение: icon settings 96 |
| №2020 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_settings_96.png.meta | 565 B | вспомогательный файл: icon settings 96.png |
| №2021 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_shield_96.png | 1310 B | текстура/изображение: icon shield 96 |
| №2022 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_shield_96.png.meta | 565 B | вспомогательный файл: icon shield 96.png |
| №2023 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_skills_96.png | 1389 B | текстура/изображение: icon skills 96 |
| №2024 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_skills_96.png.meta | 565 B | вспомогательный файл: icon skills 96.png |
| №2025 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_weight_96.png | 1061 B | текстура/изображение: icon weight 96 |
| №2026 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_weight_96.png.meta | 565 B | вспомогательный файл: icon weight 96.png |
| №2027 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_xp_96.png | 1033 B | текстура/изображение: icon xp 96 |
| №2028 unity/Assets/Vtt/Resources/UI/Grimoire/icons/icon_xp_96.png.meta | 565 B | вспомогательный файл: icon xp 96.png |
| №2029 unity/Assets/Vtt/Resources/UI/Grimoire/manifest.json | 19820 B | данные/конфигурация: manifest |
| №2030 unity/Assets/Vtt/Resources/UI/Grimoire/manifest.json.meta | 158 B | вспомогательный файл: manifest.json |
| №2031 unity/Assets/Vtt/Resources/UI/Grimoire/navigation.meta | 172 B | вспомогательный файл: navigation |
| №2032 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_bottom_plate_9s.png | 1653 B | текстура/изображение: nav bottom plate 9s |
| №2033 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_bottom_plate_9s.png.meta | 565 B | вспомогательный файл: nav bottom plate 9s.png |
| №2034 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_focus_marker_9s.png | 163 B | текстура/изображение: nav focus marker 9s |
| №2035 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_focus_marker_9s.png.meta | 565 B | вспомогательный файл: nav focus marker 9s.png |
| №2036 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_tab_active_9s.png | 2271 B | текстура/изображение: nav tab active 9s |
| №2037 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_tab_active_9s.png.meta | 565 B | вспомогательный файл: nav tab active 9s.png |
| №2038 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_tab_idle_9s.png | 1419 B | текстура/изображение: nav tab idle 9s |
| №2039 unity/Assets/Vtt/Resources/UI/Grimoire/navigation/nav_tab_idle_9s.png.meta | 565 B | вспомогательный файл: nav tab idle 9s.png |
| №2040 unity/Assets/Vtt/Resources/UI/Grimoire/panels.meta | 172 B | вспомогательный файл: panels |
| №2041 unity/Assets/Vtt/Resources/UI/Grimoire/panels/panel_inset_9s.png | 2790 B | текстура/изображение: panel inset 9s |
| №2042 unity/Assets/Vtt/Resources/UI/Grimoire/panels/panel_inset_9s.png.meta | 565 B | вспомогательный файл: panel inset 9s.png |
| №2043 unity/Assets/Vtt/Resources/UI/Grimoire/panels/panel_primary_9s.png | 2419 B | текстура/изображение: panel primary 9s |
| №2044 unity/Assets/Vtt/Resources/UI/Grimoire/panels/panel_primary_9s.png.meta | 565 B | вспомогательный файл: panel primary 9s.png |
| №2045 unity/Assets/Vtt/Resources/UI/Grimoire/panels/panel_secondary_9s.png | 2379 B | текстура/изображение: panel secondary 9s |
| №2046 unity/Assets/Vtt/Resources/UI/Grimoire/panels/panel_secondary_9s.png.meta | 565 B | вспомогательный файл: panel secondary 9s.png |
| №2047 unity/Assets/Vtt/Resources/UI/Parchment.png | 1460744 B | текстура/изображение: Parchment |
| №2048 unity/Assets/Vtt/Resources/UI/Parchment.png.meta | 886 B | вспомогательный файл: Parchment.png |
| №2049 unity/Assets/Vtt/Resources/UI/PlayfairDisplay-OFL.txt | 4448 B | документация или отчёт: PlayfairDisplay OFL |
| №2050 unity/Assets/Vtt/Resources/UI/PlayfairDisplay-OFL.txt.meta | 60 B | вспомогательный файл: PlayfairDisplay OFL.txt |
| №2051 unity/Assets/Vtt/Resources/UI/PlayfairDisplay-Regular.ttf | 300724 B | вспомогательный файл: PlayfairDisplay Regular |
| №2052 unity/Assets/Vtt/Resources/UI/PlayfairDisplay-Regular.ttf.meta | 575 B | вспомогательный файл: PlayfairDisplay Regular.ttf |
| №2053 unity/Assets/Vtt/Runtime.meta | 172 B | вспомогательный файл: Runtime |
| №2054 unity/Assets/Vtt/Runtime/AppearanceDocument.cs | 3069 B | вспомогательный файл: AppearanceDocument |
| №2055 unity/Assets/Vtt/Runtime/AppearanceDocument.cs.meta | 60 B | вспомогательный файл: AppearanceDocument.cs |
| №2056 unity/Assets/Vtt/Runtime/CharacterAdvancement.cs | 20688 B | вспомогательный файл: CharacterAdvancement |
| №2057 unity/Assets/Vtt/Runtime/CharacterAdvancement.cs.meta | 60 B | вспомогательный файл: CharacterAdvancement.cs |
| №2058 unity/Assets/Vtt/Runtime/CharacterArt.cs | 7613 B | вспомогательный файл: CharacterArt |
| №2059 unity/Assets/Vtt/Runtime/CharacterArt.cs.meta | 60 B | вспомогательный файл: CharacterArt.cs |
| №2060 unity/Assets/Vtt/Runtime/CharacterBodyPreview.cs | 15702 B | вспомогательный файл: CharacterBodyPreview |
| №2061 unity/Assets/Vtt/Runtime/CharacterBodyPreview.cs.meta | 60 B | вспомогательный файл: CharacterBodyPreview.cs |
| №2062 unity/Assets/Vtt/Runtime/CharacterCreation.cs | 11100 B | вспомогательный файл: CharacterCreation |
| №2063 unity/Assets/Vtt/Runtime/CharacterCreation.cs.meta | 59 B | вспомогательный файл: CharacterCreation.cs |
| №2064 unity/Assets/Vtt/Runtime/CharacterFiles.cs | 5029 B | вспомогательный файл: CharacterFiles |
| №2065 unity/Assets/Vtt/Runtime/CharacterFiles.cs.meta | 60 B | вспомогательный файл: CharacterFiles.cs |
| №2066 unity/Assets/Vtt/Runtime/CharacterSheetRules.Actions.cs | 15903 B | вспомогательный файл: CharacterSheetRules.Actions |
| №2067 unity/Assets/Vtt/Runtime/CharacterSheetRules.Actions.cs.meta | 60 B | вспомогательный файл: CharacterSheetRules.Actions.cs |
| №2068 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs | 21286 B | вспомогательный файл: CharacterSheetRules |
| №2069 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs.meta | 59 B | вспомогательный файл: CharacterSheetRules.cs |
| №2070 unity/Assets/Vtt/Runtime/CharacterSheetStore.Inventory.cs | 1933 B | вспомогательный файл: CharacterSheetStore.Inventory |
| №2071 unity/Assets/Vtt/Runtime/CharacterSheetStore.Inventory.cs.meta | 60 B | вспомогательный файл: CharacterSheetStore.Inventory.cs |
| №2072 unity/Assets/Vtt/Runtime/CharacterSheetStore.Trade.cs | 7156 B | вспомогательный файл: CharacterSheetStore.Trade |
| №2073 unity/Assets/Vtt/Runtime/CharacterSheetStore.Trade.cs.meta | 60 B | вспомогательный файл: CharacterSheetStore.Trade.cs |
| №2074 unity/Assets/Vtt/Runtime/CharacterSpeedDisplay.cs | 1618 B | вспомогательный файл: CharacterSpeedDisplay |
| №2075 unity/Assets/Vtt/Runtime/CharacterSpeedDisplay.cs.meta | 60 B | вспомогательный файл: CharacterSpeedDisplay.cs |
| №2076 unity/Assets/Vtt/Runtime/CharacterStudioView.cs | 4943 B | вспомогательный файл: CharacterStudioView |
| №2077 unity/Assets/Vtt/Runtime/CharacterStudioView.cs.meta | 60 B | вспомогательный файл: CharacterStudioView.cs |
| №2078 unity/Assets/Vtt/Runtime/ClientPreferences.cs | 7330 B | вспомогательный файл: ClientPreferences |
| №2079 unity/Assets/Vtt/Runtime/ClientPreferences.cs.meta | 59 B | вспомогательный файл: ClientPreferences.cs |
| №2080 unity/Assets/Vtt/Runtime/CloudCharacterProtocol.cs | 6277 B | вспомогательный файл: CloudCharacterProtocol |
| №2081 unity/Assets/Vtt/Runtime/CloudCharacterProtocol.cs.meta | 60 B | вспомогательный файл: CloudCharacterProtocol.cs |
| №2082 unity/Assets/Vtt/Runtime/CommerceRules.cs | 19535 B | вспомогательный файл: CommerceRules |
| №2083 unity/Assets/Vtt/Runtime/CommerceRules.cs.meta | 60 B | вспомогательный файл: CommerceRules.cs |
| №2084 unity/Assets/Vtt/Runtime/CommerceRules.InventoryMigration.cs | 5287 B | вспомогательный файл: CommerceRules.InventoryMigration |
| №2085 unity/Assets/Vtt/Runtime/CommerceRules.InventoryMigration.cs.meta | 60 B | вспомогательный файл: CommerceRules.InventoryMigration.cs |
| №2086 unity/Assets/Vtt/Runtime/CommerceRules.Market.cs | 24799 B | вспомогательный файл: CommerceRules.Market |
| №2087 unity/Assets/Vtt/Runtime/CommerceRules.Market.cs.meta | 60 B | вспомогательный файл: CommerceRules.Market.cs |
| №2088 unity/Assets/Vtt/Runtime/CommerceRules.Production.cs | 28716 B | вспомогательный файл: CommerceRules.Production |
| №2089 unity/Assets/Vtt/Runtime/CommerceRules.Production.cs.meta | 60 B | вспомогательный файл: CommerceRules.Production.cs |
| №2090 unity/Assets/Vtt/Runtime/CreationPickerOptions.cs | 1646 B | вспомогательный файл: CreationPickerOptions |
| №2091 unity/Assets/Vtt/Runtime/CreationPickerOptions.cs.meta | 60 B | вспомогательный файл: CreationPickerOptions.cs |
| №2092 unity/Assets/Vtt/Runtime/DesktopUiSmoke.cs | 83585 B | вспомогательный файл: DesktopUiSmoke |
| №2093 unity/Assets/Vtt/Runtime/DesktopUiSmoke.cs.meta | 60 B | вспомогательный файл: DesktopUiSmoke.cs |
| №2094 unity/Assets/Vtt/Runtime/DiceAppearanceCatalog.cs | 1575 B | вспомогательный файл: DiceAppearanceCatalog |
| №2095 unity/Assets/Vtt/Runtime/DiceAppearanceCatalog.cs.meta | 60 B | вспомогательный файл: DiceAppearanceCatalog.cs |
| №2096 unity/Assets/Vtt/Runtime/DiceGeometry.cs | 7902 B | вспомогательный файл: DiceGeometry |
| №2097 unity/Assets/Vtt/Runtime/DiceGeometry.cs.meta | 60 B | вспомогательный файл: DiceGeometry.cs |
| №2098 unity/Assets/Vtt/Runtime/DiceMotion.cs | 1864 B | вспомогательный файл: DiceMotion |
| №2099 unity/Assets/Vtt/Runtime/DiceMotion.cs.meta | 60 B | вспомогательный файл: DiceMotion.cs |
| №2100 unity/Assets/Vtt/Runtime/DiceRollRequest.cs | 3635 B | вспомогательный файл: DiceRollRequest |
| №2101 unity/Assets/Vtt/Runtime/DiceRollRequest.cs.meta | 60 B | вспомогательный файл: DiceRollRequest.cs |
| №2102 unity/Assets/Vtt/Runtime/DiceTable.cs | 32092 B | вспомогательный файл: DiceTable |
| №2103 unity/Assets/Vtt/Runtime/DiceTable.cs.meta | 60 B | вспомогательный файл: DiceTable.cs |
| №2104 unity/Assets/Vtt/Runtime/DiceTable.Trays.cs | 13492 B | вспомогательный файл: DiceTable.Trays |
| №2105 unity/Assets/Vtt/Runtime/DiceTable.Trays.cs.meta | 60 B | вспомогательный файл: DiceTable.Trays.cs |
| №2106 unity/Assets/Vtt/Runtime/DiceTentacles.cs | 6087 B | вспомогательный файл: DiceTentacles |
| №2107 unity/Assets/Vtt/Runtime/DiceTentacles.cs.meta | 60 B | вспомогательный файл: DiceTentacles.cs |
| №2108 unity/Assets/Vtt/Runtime/DiceTheme.cs | 3679 B | вспомогательный файл: DiceTheme |
| №2109 unity/Assets/Vtt/Runtime/DiceTheme.cs.meta | 60 B | вспомогательный файл: DiceTheme.cs |
| №2110 unity/Assets/Vtt/Runtime/DiceThemeGeometry.cs | 7056 B | вспомогательный файл: DiceThemeGeometry |
| №2111 unity/Assets/Vtt/Runtime/DiceThemeGeometry.cs.meta | 60 B | вспомогательный файл: DiceThemeGeometry.cs |
| №2112 unity/Assets/Vtt/Runtime/DiceTray.cs | 1313 B | вспомогательный файл: DiceTray |
| №2113 unity/Assets/Vtt/Runtime/DiceTray.cs.meta | 60 B | вспомогательный файл: DiceTray.cs |
| №2114 unity/Assets/Vtt/Runtime/ExplorerController.cs | 5869 B | вспомогательный файл: ExplorerController |
| №2115 unity/Assets/Vtt/Runtime/ExplorerController.cs.meta | 59 B | вспомогательный файл: ExplorerController.cs |
| №2116 unity/Assets/Vtt/Runtime/InventoryCatalogCache.cs | 3549 B | вспомогательный файл: InventoryCatalogCache |
| №2117 unity/Assets/Vtt/Runtime/InventoryCatalogCache.cs.meta | 60 B | вспомогательный файл: InventoryCatalogCache.cs |
| №2118 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs | 808 B | вспомогательный файл: LegacyContentCatalog |
| №2119 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs.meta | 59 B | вспомогательный файл: LegacyContentCatalog.cs |
| №2120 unity/Assets/Vtt/Runtime/LegacyDocuments.cs | 11608 B | вспомогательный файл: LegacyDocuments |
| №2121 unity/Assets/Vtt/Runtime/LegacyDocuments.cs.meta | 59 B | вспомогательный файл: LegacyDocuments.cs |
| №2122 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs | 16116 B | вспомогательный файл: LegacyMapPresenter |
| №2123 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs.meta | 59 B | вспомогательный файл: LegacyMapPresenter.cs |
| №2124 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs | 5858 B | вспомогательный файл: LegacyMigrationSmoke |
| №2125 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSmoke.cs |
| №2126 unity/Assets/Vtt/Runtime/LegacySessionPanel.Account.cs | 19315 B | вспомогательный файл: LegacySessionPanel.Account |
| №2127 unity/Assets/Vtt/Runtime/LegacySessionPanel.Account.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Account.cs |
| №2128 unity/Assets/Vtt/Runtime/LegacySessionPanel.Advancement.cs | 16714 B | вспомогательный файл: LegacySessionPanel.Advancement |
| №2129 unity/Assets/Vtt/Runtime/LegacySessionPanel.Advancement.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Advancement.cs |
| №2130 unity/Assets/Vtt/Runtime/LegacySessionPanel.Appearance.cs | 14833 B | вспомогательный файл: LegacySessionPanel.Appearance |
| №2131 unity/Assets/Vtt/Runtime/LegacySessionPanel.Appearance.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Appearance.cs |
| №2132 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs | 19929 B | вспомогательный файл: LegacySessionPanel.Branding |
| №2133 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Branding.cs |
| №2134 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs | 16404 B | вспомогательный файл: LegacySessionPanel.BrandSettings |
| №2135 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.BrandSettings.cs |
| №2136 unity/Assets/Vtt/Runtime/LegacySessionPanel.CharacterFiles.cs | 5785 B | вспомогательный файл: LegacySessionPanel.CharacterFiles |
| №2137 unity/Assets/Vtt/Runtime/LegacySessionPanel.CharacterFiles.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.CharacterFiles.cs |
| №2138 unity/Assets/Vtt/Runtime/LegacySessionPanel.CharacterStudio.cs | 12283 B | вспомогательный файл: LegacySessionPanel.CharacterStudio |
| №2139 unity/Assets/Vtt/Runtime/LegacySessionPanel.CharacterStudio.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.CharacterStudio.cs |
| №2140 unity/Assets/Vtt/Runtime/LegacySessionPanel.Chat.cs | 11345 B | вспомогательный файл: LegacySessionPanel.Chat |
| №2141 unity/Assets/Vtt/Runtime/LegacySessionPanel.Chat.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Chat.cs |
| №2142 unity/Assets/Vtt/Runtime/LegacySessionPanel.ClassicSheet.cs | 48067 B | вспомогательный файл: LegacySessionPanel.ClassicSheet |
| №2143 unity/Assets/Vtt/Runtime/LegacySessionPanel.ClassicSheet.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.ClassicSheet.cs |
| №2144 unity/Assets/Vtt/Runtime/LegacySessionPanel.Commerce.cs | 14081 B | вспомогательный файл: LegacySessionPanel.Commerce |
| №2145 unity/Assets/Vtt/Runtime/LegacySessionPanel.Commerce.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Commerce.cs |
| №2146 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs | 22062 B | вспомогательный файл: LegacySessionPanel.ContentManager |
| №2147 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.ContentManager.cs |
| №2148 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentPreviews.cs | 6755 B | вспомогательный файл: LegacySessionPanel.ContentPreviews |
| №2149 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentPreviews.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.ContentPreviews.cs |
| №2150 unity/Assets/Vtt/Runtime/LegacySessionPanel.Crafts.cs | 7466 B | вспомогательный файл: LegacySessionPanel.Crafts |
| №2151 unity/Assets/Vtt/Runtime/LegacySessionPanel.Crafts.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Crafts.cs |
| №2152 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs | 10252 B | вспомогательный файл: LegacySessionPanel |
| №2153 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.cs |
| №2154 unity/Assets/Vtt/Runtime/LegacySessionPanel.Desktop.cs | 2424 B | вспомогательный файл: LegacySessionPanel.Desktop |
| №2155 unity/Assets/Vtt/Runtime/LegacySessionPanel.Desktop.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Desktop.cs |
| №2156 unity/Assets/Vtt/Runtime/LegacySessionPanel.Dice.cs | 17778 B | вспомогательный файл: LegacySessionPanel.Dice |
| №2157 unity/Assets/Vtt/Runtime/LegacySessionPanel.Dice.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Dice.cs |
| №2158 unity/Assets/Vtt/Runtime/LegacySessionPanel.DiceControls.cs | 3537 B | вспомогательный файл: LegacySessionPanel.DiceControls |
| №2159 unity/Assets/Vtt/Runtime/LegacySessionPanel.DiceControls.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.DiceControls.cs |
| №2160 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs | 43978 B | вспомогательный файл: LegacySessionPanel.FrontEnd |
| №2161 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.FrontEnd.cs |
| №2162 unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireAdvancement.cs | 9365 B | вспомогательный файл: LegacySessionPanel.GrimoireAdvancement |
| №2163 unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireAdvancement.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.GrimoireAdvancement.cs |
| №2164 unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireDetails.cs | 20163 B | вспомогательный файл: LegacySessionPanel.GrimoireDetails |
| №2165 unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireDetails.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.GrimoireDetails.cs |
| №2166 unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireHero.cs | 21385 B | вспомогательный файл: LegacySessionPanel.GrimoireHero |
| №2167 unity/Assets/Vtt/Runtime/LegacySessionPanel.GrimoireHero.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.GrimoireHero.cs |
| №2168 unity/Assets/Vtt/Runtime/LegacySessionPanel.HeroArt.cs | 7671 B | вспомогательный файл: LegacySessionPanel.HeroArt |
| №2169 unity/Assets/Vtt/Runtime/LegacySessionPanel.HeroArt.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.HeroArt.cs |
| №2170 unity/Assets/Vtt/Runtime/LegacySessionPanel.InventoryMigration.cs | 2443 B | вспомогательный файл: LegacySessionPanel.InventoryMigration |
| №2171 unity/Assets/Vtt/Runtime/LegacySessionPanel.InventoryMigration.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.InventoryMigration.cs |
| №2172 unity/Assets/Vtt/Runtime/LegacySessionPanel.Market.cs | 19579 B | вспомогательный файл: LegacySessionPanel.Market |
| №2173 unity/Assets/Vtt/Runtime/LegacySessionPanel.Market.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Market.cs |
| №2174 unity/Assets/Vtt/Runtime/LegacySessionPanel.Moderation.cs | 16411 B | вспомогательный файл: LegacySessionPanel.Moderation |
| №2175 unity/Assets/Vtt/Runtime/LegacySessionPanel.Moderation.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Moderation.cs |
| №2176 unity/Assets/Vtt/Runtime/LegacySessionPanel.Production.cs | 30660 B | вспомогательный файл: LegacySessionPanel.Production |
| №2177 unity/Assets/Vtt/Runtime/LegacySessionPanel.Production.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Production.cs |
| №2178 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs | 9899 B | вспомогательный файл: LegacySessionPanel.Settings |
| №2179 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Settings.cs |
| №2180 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs | 30540 B | вспомогательный файл: LegacySessionPanel.Sheet |
| №2181 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Sheet.cs |
| №2182 unity/Assets/Vtt/Runtime/LegacySessionPanel.SheetSkin.cs | 9914 B | вспомогательный файл: LegacySessionPanel.SheetSkin |
| №2183 unity/Assets/Vtt/Runtime/LegacySessionPanel.SheetSkin.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.SheetSkin.cs |
| №2184 unity/Assets/Vtt/Runtime/LegacySessionPanel.StyleCache.cs | 2563 B | вспомогательный файл: LegacySessionPanel.StyleCache |
| №2185 unity/Assets/Vtt/Runtime/LegacySessionPanel.StyleCache.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.StyleCache.cs |
| №2186 unity/Assets/Vtt/Runtime/LegacySessionPanel.TextInput.cs | 8180 B | вспомогательный файл: LegacySessionPanel.TextInput |
| №2187 unity/Assets/Vtt/Runtime/LegacySessionPanel.TextInput.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.TextInput.cs |
| №2188 unity/Assets/Vtt/Runtime/LegacySessionPanel.Theme.cs | 953 B | вспомогательный файл: LegacySessionPanel.Theme |
| №2189 unity/Assets/Vtt/Runtime/LegacySessionPanel.Theme.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Theme.cs |
| №2190 unity/Assets/Vtt/Runtime/LegacySessionPanel.Touch.cs | 8886 B | вспомогательный файл: LegacySessionPanel.Touch |
| №2191 unity/Assets/Vtt/Runtime/LegacySessionPanel.Touch.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Touch.cs |
| №2192 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs | 13404 B | вспомогательный файл: LegacySessionPanel.Updates |
| №2193 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Updates.cs |
| №2194 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopImport.cs | 2794 B | вспомогательный файл: LegacySessionPanel.WorkshopImport |
| №2195 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopImport.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.WorkshopImport.cs |
| №2196 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs | 2534 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary |
| №2197 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary.cs |
| №2198 unity/Assets/Vtt/Runtime/link.xml | 628 B | вспомогательный файл: link |
| №2199 unity/Assets/Vtt/Runtime/link.xml.meta | 60 B | вспомогательный файл: link.xml |
| №2200 unity/Assets/Vtt/Runtime/MenuGesture.cs | 2065 B | вспомогательный файл: MenuGesture |
| №2201 unity/Assets/Vtt/Runtime/MenuGesture.cs.meta | 60 B | вспомогательный файл: MenuGesture.cs |
| №2202 unity/Assets/Vtt/Runtime/NumericInputSession.cs | 1309 B | вспомогательный файл: NumericInputSession |
| №2203 unity/Assets/Vtt/Runtime/NumericInputSession.cs.meta | 60 B | вспомогательный файл: NumericInputSession.cs |
| №2204 unity/Assets/Vtt/Runtime/ProductionCatalog.cs | 10850 B | вспомогательный файл: ProductionCatalog |
| №2205 unity/Assets/Vtt/Runtime/ProductionCatalog.cs.meta | 60 B | вспомогательный файл: ProductionCatalog.cs |
| №2206 unity/Assets/Vtt/Runtime/ProductionLegacy.cs | 8877 B | вспомогательный файл: ProductionLegacy |
| №2207 unity/Assets/Vtt/Runtime/ProductionLegacy.cs.meta | 60 B | вспомогательный файл: ProductionLegacy.cs |
| №2208 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs | 3139 B | вспомогательный файл: PrototypeSmoke |
| №2209 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs.meta | 59 B | вспомогательный файл: PrototypeSmoke.cs |
| №2210 unity/Assets/Vtt/Runtime/SheetSwipeMotion.cs | 1586 B | вспомогательный файл: SheetSwipeMotion |
| №2211 unity/Assets/Vtt/Runtime/SheetSwipeMotion.cs.meta | 60 B | вспомогательный файл: SheetSwipeMotion.cs |
| №2212 unity/Assets/Vtt/Runtime/TextCaretSession.cs | 1341 B | вспомогательный файл: TextCaretSession |
| №2213 unity/Assets/Vtt/Runtime/TextCaretSession.cs.meta | 60 B | вспомогательный файл: TextCaretSession.cs |
| №2214 unity/Assets/Vtt/Runtime/UiTheme.cs | 4152 B | вспомогательный файл: UiTheme |
| №2215 unity/Assets/Vtt/Runtime/UiTheme.cs.meta | 60 B | вспомогательный файл: UiTheme.cs |
| №2216 unity/Assets/Vtt/Runtime/UnityRelease.cs | 5985 B | вспомогательный файл: UnityRelease |
| №2217 unity/Assets/Vtt/Runtime/UnityRelease.cs.meta | 60 B | вспомогательный файл: UnityRelease.cs |
| №2218 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs | 8241 B | вспомогательный файл: WorkshopRuntime |
| №2219 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs.meta | 60 B | вспомогательный файл: WorkshopRuntime.cs |
| №2220 unity/Assets/Vtt/Runtime/WorkshopStore.cs | 40228 B | вспомогательный файл: WorkshopStore |
| №2221 unity/Assets/Vtt/Runtime/WorkshopStore.cs.meta | 60 B | вспомогательный файл: WorkshopStore.cs |
| №2222 unity/Assets/Vtt/Runtime/WorkshopStore.Production.cs | 4025 B | вспомогательный файл: WorkshopStore.Production |
| №2223 unity/Assets/Vtt/Runtime/WorkshopStore.Production.cs.meta | 60 B | вспомогательный файл: WorkshopStore.Production.cs |
| №2224 unity/Assets/Vtt/Scenes.meta | 172 B | вспомогательный файл: Scenes |
| №2225 unity/Assets/Vtt/Scenes/Exploration.unity | 49176 B | вспомогательный файл: Exploration |
| №2226 unity/Assets/Vtt/Scenes/Exploration.unity.meta | 155 B | вспомогательный файл: Exploration.unity |
| №2227 unity/Assets/Vtt/Scenes/ImportedAdventure.unity | 2328750 B | вспомогательный файл: ImportedAdventure |
| №2228 unity/Assets/Vtt/Scenes/ImportedAdventure.unity.meta | 155 B | вспомогательный файл: ImportedAdventure.unity |
| №2229 unity/Assets/Vtt/Settings.meta | 172 B | вспомогательный файл: Settings |
| №2230 unity/Assets/Vtt/Settings/Explorer.mat | 3799 B | вспомогательный файл: Explorer |
| №2231 unity/Assets/Vtt/Settings/Explorer.mat.meta | 188 B | вспомогательный файл: Explorer.mat |
| №2232 unity/Assets/Vtt/Settings/ExplorerRenderer.asset | 1865 B | вспомогательный файл: ExplorerRenderer |
| №2233 unity/Assets/Vtt/Settings/ExplorerRenderer.asset.meta | 189 B | вспомогательный файл: ExplorerRenderer.asset |
| №2234 unity/Assets/Vtt/Settings/ExplorerURP.asset | 4690 B | вспомогательный файл: ExplorerURP |
| №2235 unity/Assets/Vtt/Settings/ExplorerURP.asset.meta | 189 B | вспомогательный файл: ExplorerURP.asset |
| №2236 unity/Assets/Vtt/Settings/Stone.mat | 3795 B | вспомогательный файл: Stone |
| №2237 unity/Assets/Vtt/Settings/Stone.mat.meta | 188 B | вспомогательный файл: Stone.mat |
| №2238 unity/Assets/Vtt/Settings/Wall.mat | 3793 B | вспомогательный файл: Wall |
| №2239 unity/Assets/Vtt/Settings/Wall.mat.meta | 188 B | вспомогательный файл: Wall.mat |
| №2240 unity/Assets/Vtt/Tests.meta | 172 B | вспомогательный файл: Tests |
| №2241 unity/Assets/Vtt/Tests/advancement-contract.json | 135449 B | данные/конфигурация: advancement contract |
| №2242 unity/Assets/Vtt/Tests/advancement-contract.json.meta | 60 B | вспомогательный файл: advancement contract.json |
| №2243 unity/Assets/Vtt/Tests/sheet-contract.json | 195912 B | данные/конфигурация: sheet contract |
| №2244 unity/Assets/Vtt/Tests/sheet-contract.json.meta | 158 B | вспомогательный файл: sheet contract.json |
| №2245 unity/ci/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №2246 unity/ci/check_sheet_provenance.py | 2365 B | вспомогательный файл: check sheet provenance |
| №2247 unity/ci/cloud_release.py | 14328 B | вспомогательный файл: cloud release |
| №2248 unity/ci/measure_apk.py | 5713 B | вспомогательный файл: measure apk |
| №2249 unity/ci/promote_candidate.py | 5141 B | вспомогательный файл: promote candidate |
| №2250 unity/ci/publish_android_update.py | 7131 B | вспомогательный файл: publish android update |
| №2251 unity/ci/requirements.txt | 21 B | документация или отчёт: requirements |
| №2252 unity/ci/test_android_publish.py | 1500 B | вспомогательный файл: test android publish |
| №2253 unity/ci/test_brand_visual_contract.py | 3012 B | вспомогательный файл: test brand visual contract |
| №2254 unity/ci/test_character_preview_contract.py | 1354 B | вспомогательный файл: test character preview contract |
| №2255 unity/ci/test_cloud_release.py | 11048 B | вспомогательный файл: test cloud release |
| №2256 unity/ci/test_content_registry_contract.py | 1574 B | вспомогательный файл: test content registry contract |
| №2257 unity/ci/test_grimoire_details_contract.py | 1714 B | вспомогательный файл: test grimoire details contract |
| №2258 unity/ci/test_launcher_aliases.py | 1007 B | вспомогательный файл: test launcher aliases |
| №2259 unity/ci/test_menu_readability.py | 1656 B | вспомогательный файл: test menu readability |
| №2260 unity/ci/test_sheet_navigation_contract.py | 2256 B | вспомогательный файл: test sheet navigation contract |
| №2261 unity/ci/test_ui_theme_contract.py | 1538 B | вспомогательный файл: test ui theme contract |
| №2262 unity/ci/test_update_settings_contract.py | 4439 B | вспомогательный файл: test update settings contract |
| №2263 unity/ci/transfer-signing-secrets.ps1 | 3449 B | вспомогательный файл: transfer signing secrets |
| №2264 unity/ci/verify_bundle_output.py | 1081 B | вспомогательный файл: verify bundle output |
| №2265 unity/ci/verify_launcher_aliases.py | 4390 B | вспомогательный файл: verify launcher aliases |
| №2266 unity/ci/verify_public_workshop.py | 6725 B | вспомогательный файл: verify public workshop |
| №2267 unity/ci/windows-upgrade-qa.ps1 | 5538 B | вспомогательный файл: windows upgrade qa |
| №2268 unity/ci/workshop-tests/.gitignore | 10 B | вспомогательный файл: .gitignore |
| №2269 unity/ci/workshop-tests/AccountGestureChecks.cs | 7066 B | вспомогательный файл: AccountGestureChecks |
| №2270 unity/ci/workshop-tests/AdvancementChecks.cs | 9986 B | вспомогательный файл: AdvancementChecks |
| №2271 unity/ci/workshop-tests/AllModCollectionChecks.cs | 7884 B | вспомогательный файл: AllModCollectionChecks |
| №2272 unity/ci/workshop-tests/CharacterArtChecks.cs | 6106 B | вспомогательный файл: CharacterArtChecks |
| №2273 unity/ci/workshop-tests/CollectionChecks.cs | 6865 B | вспомогательный файл: CollectionChecks |
| №2274 unity/ci/workshop-tests/CommerceChecks.cs | 4818 B | вспомогательный файл: CommerceChecks |
| №2275 unity/ci/workshop-tests/ContainerMigrationChecks.cs | 3485 B | вспомогательный файл: ContainerMigrationChecks |
| №2276 unity/ci/workshop-tests/DiceLoadingChecks.cs | 734 B | вспомогательный файл: DiceLoadingChecks |
| №2277 unity/ci/workshop-tests/GuiStyleResetChecks.cs | 1677 B | вспомогательный файл: GuiStyleResetChecks |
| №2278 unity/ci/workshop-tests/HeroUiChecks.cs | 1106 B | вспомогательный файл: HeroUiChecks |
| №2279 unity/ci/workshop-tests/InventoryCatalogChecks.cs | 3653 B | вспомогательный файл: InventoryCatalogChecks |
| №2280 unity/ci/workshop-tests/MarketChecks.cs | 14120 B | вспомогательный файл: MarketChecks |
| №2281 unity/ci/workshop-tests/NumericInputChecks.cs | 2630 B | вспомогательный файл: NumericInputChecks |
| №2282 unity/ci/workshop-tests/ProductionChecks.cs | 8731 B | вспомогательный файл: ProductionChecks |
| №2283 unity/ci/workshop-tests/ProductionLegacyChecks.cs | 4653 B | вспомогательный файл: ProductionLegacyChecks |
| №2284 unity/ci/workshop-tests/ProductionPackageChecks.cs | 3636 B | вспомогательный файл: ProductionPackageChecks |
| №2285 unity/ci/workshop-tests/Program.cs | 50573 B | вспомогательный файл: Program |
| №2286 unity/ci/workshop-tests/SheetActionChecks.cs | 11507 B | вспомогательный файл: SheetActionChecks |
| №2287 unity/ci/workshop-tests/SheetSwipeChecks.cs | 2314 B | вспомогательный файл: SheetSwipeChecks |
| №2288 unity/ci/workshop-tests/ThemeChecks.cs | 4846 B | вспомогательный файл: ThemeChecks |
| №2289 unity/ci/workshop-tests/UiLifecycleChecks.cs | 914 B | вспомогательный файл: UiLifecycleChecks |
| №2290 unity/ci/workshop-tests/WalletMarketChecks.cs | 2908 B | вспомогательный файл: WalletMarketChecks |
| №2291 unity/ci/workshop-tests/WorkshopTests.csproj | 3914 B | вспомогательный файл: WorkshopTests |
| №2292 unity/ContentSources~/catalog.full.json | 1259265 B | данные/конфигурация: catalog.full |
| №2293 unity/ContentSources~/cloud-copy-contracts.json | 3613 B | данные/конфигурация: cloud copy contracts |
| №2294 unity/ContentSources~/production-examples/01-items.json | 1572 B | данные/конфигурация: 01 items |
| №2295 unity/ContentSources~/production-examples/02-forge.json | 2304 B | данные/конфигурация: 02 forge |
| №2296 unity/ContentSources~/workshop-commerce/catalogs.json | 91244 B | данные/конфигурация: catalogs |
| №2297 unity/ContentSources~/workshop-commerce/contracts.json | 7885 B | данные/конфигурация: contracts |
| №2298 unity/ContentSources~/workshop-commerce/market-contracts.json | 165510 B | данные/конфигурация: market contracts |
| №2299 unity/evidence/exploration.png | 119417 B | текстура/изображение: exploration |
| №2300 unity/Installer/release-notes.md | 1582 B | документация или отчёт: release notes |
| №2301 unity/Installer/UnitySetup.nsi | 3417 B | вспомогательный файл: UnitySetup |
| №2302 unity/Packages/manifest.json | 609 B | данные/конфигурация: manifest |
| №2303 unity/Packages/packages-lock.json | 6359 B | данные/конфигурация: packages lock |
| №2304 unity/ProjectSettings/AudioManager.asset | 523 B | вспомогательный файл: AudioManager |
| №2305 unity/ProjectSettings/ClusterInputManager.asset | 114 B | вспомогательный файл: ClusterInputManager |
| №2306 unity/ProjectSettings/DynamicsManager.asset | 1574 B | вспомогательный файл: DynamicsManager |
| №2307 unity/ProjectSettings/EditorBuildSettings.asset | 401 B | вспомогательный файл: EditorBuildSettings |
| №2308 unity/ProjectSettings/EditorSettings.asset | 1603 B | вспомогательный файл: EditorSettings |
| №2309 unity/ProjectSettings/GraphicsSettings.asset | 2615 B | вспомогательный файл: GraphicsSettings |
| №2310 unity/ProjectSettings/InputManager.asset | 9754 B | вспомогательный файл: InputManager |
| №2311 unity/ProjectSettings/MemorySettings.asset | 1226 B | вспомогательный файл: MemorySettings |
| №2312 unity/ProjectSettings/MultiplayerManager.asset | 232 B | вспомогательный файл: MultiplayerManager |
| №2313 unity/ProjectSettings/NavMeshAreas.asset | 1361 B | вспомогательный файл: NavMeshAreas |
| №2314 unity/ProjectSettings/Physics2DSettings.asset | 1862 B | вспомогательный файл: Physics2DSettings |
| №2315 unity/ProjectSettings/PresetManager.asset | 146 B | вспомогательный файл: PresetManager |
| №2316 unity/ProjectSettings/ProjectSettings.asset | 22467 B | вспомогательный файл: ProjectSettings |
| №2317 unity/ProjectSettings/ProjectVersion.txt | 85 B | документация или отчёт: ProjectVersion |
| №2318 unity/ProjectSettings/QualitySettings.asset | 9858 B | вспомогательный файл: QualitySettings |
| №2319 unity/ProjectSettings/SceneTemplateSettings.json | 3535 B | данные/конфигурация: SceneTemplateSettings |
| №2320 unity/ProjectSettings/ShaderGraphSettings.asset | 633 B | вспомогательный файл: ShaderGraphSettings |
| №2321 unity/ProjectSettings/TagManager.asset | 411 B | вспомогательный файл: TagManager |
| №2322 unity/ProjectSettings/TimeManager.asset | 305 B | вспомогательный файл: TimeManager |
| №2323 unity/ProjectSettings/UnityConnectSettings.asset | 1063 B | вспомогательный файл: UnityConnectSettings |
| №2324 unity/ProjectSettings/VersionControlSettings.asset | 172 B | вспомогательный файл: VersionControlSettings |
| №2325 unity/ProjectSettings/VFXManager.asset | 525 B | вспомогательный файл: VFXManager |
| №2326 unity/PUBLIC_DELIVERY.json | 1072 B | данные/конфигурация: PUBLIC DELIVERY |
| №2327 unity/README.md | 9382 B | документация или отчёт: README |
| №2328 unity/release.ps1 | 7750 B | вспомогательный файл: release |
| №2329 unity/Tools/export_advancement.cjs | 4842 B | логический модуль: export advancement |
| №2330 unity/Tools/export_character.py | 7410 B | вспомогательный файл: export character |
| №2331 unity/Tools/export_cloud_copy.cjs | 1429 B | логический модуль: export cloud copy |
| №2332 unity/Tools/export_commerce.cjs | 2282 B | логический модуль: export commerce |
| №2333 unity/Tools/export_market.cjs | 1756 B | логический модуль: export market |
| №2334 unity/Tools/export_production.cjs | 2324 B | логический модуль: export production |
| №2335 unity/Tools/package_commerce.py | 3643 B | вспомогательный файл: package commerce |
| №2336 unity/Tools/split_workshop_content.py | 7629 B | вспомогательный файл: split workshop content |
| №2337 unity/Tools/sync_character_sheet.cjs | 11842 B | логический модуль: sync character sheet |
| №2338 unity/Tools/sync_legacy_content.cjs | 5736 B | логический модуль: sync legacy content |
| №2339 unity/VALIDATION.md | 32688 B | документация или отчёт: VALIDATION |
| №2340 unity/verify.ps1 | 2809 B | вспомогательный файл: verify |
| №2341 updates/beta.json | 211 B | метаданные обновлений: beta |
| №2342 updates/previous-stable.json | 179808 B | метаданные обновлений: previous stable |
| №2343 updates/README.md | 233 B | документация или отчёт: README |
| №2344 updates/stable.json | 179809 B | метаданные обновлений: stable |
| №2345 updates/unity-changelog.json | 68471 B | метаданные обновлений: unity changelog |
| №2346 updates/unity-experiment.json | 1241 B | метаданные обновлений: unity experiment |
| №2347 vignette_v2_sprite.png | 1213593 B | текстура/изображение: vignette v2 sprite |
| №2348 VTT_PROJECT_MANIFEST_V70.json | 44370 B | устаревший список V70, не актуален |
| №2349 wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №2350 wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №2351 wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №2352 wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №2353 wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №2354 wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №2355 wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №2356 wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №2357 wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №2358 wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №2359 wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №2360 wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №2361 wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №2362 wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №2363 wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №2364 wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №2365 wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №2366 wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №2367 wallpapers/1.png | 1460744 B | ассет графики/3D/интерфейса: 1 |
| №2368 wallpapers/10.png | 1667723 B | ассет графики/3D/интерфейса: 10 |
| №2369 wallpapers/11.png | 1815959 B | ассет графики/3D/интерфейса: 11 |
| №2370 wallpapers/12.png | 1548677 B | ассет графики/3D/интерфейса: 12 |
| №2371 wallpapers/13.png | 1599093 B | ассет графики/3D/интерфейса: 13 |
| №2372 wallpapers/14.png | 1596513 B | ассет графики/3D/интерфейса: 14 |
| №2373 wallpapers/15.png | 233043 B | ассет графики/3D/интерфейса: 15 |
| №2374 wallpapers/16.png | 212684 B | ассет графики/3D/интерфейса: 16 |
| №2375 wallpapers/17.png | 1585122 B | ассет графики/3D/интерфейса: 17 |
| №2376 wallpapers/18.png | 2095852 B | ассет графики/3D/интерфейса: 18 |
| №2377 wallpapers/19.png | 8605503 B | ассет графики/3D/интерфейса: 19 |
| №2378 wallpapers/2.png | 1590206 B | ассет графики/3D/интерфейса: 2 |
| №2379 wallpapers/20.png | 1284815 B | ассет графики/3D/интерфейса: 20 |
| №2380 wallpapers/21.png | 179307 B | ассет графики/3D/интерфейса: 21 |
| №2381 wallpapers/22.png | 344279 B | ассет графики/3D/интерфейса: 22 |
| №2382 wallpapers/23.png | 210291 B | ассет графики/3D/интерфейса: 23 |
| №2383 wallpapers/24.png | 141215 B | ассет графики/3D/интерфейса: 24 |
| №2384 wallpapers/25.png | 160892 B | ассет графики/3D/интерфейса: 25 |
| №2385 wallpapers/26.png | 187259 B | ассет графики/3D/интерфейса: 26 |
| №2386 wallpapers/27.png | 213194 B | ассет графики/3D/интерфейса: 27 |
| №2387 wallpapers/28.png | 202417 B | ассет графики/3D/интерфейса: 28 |
| №2388 wallpapers/29.png | 166942 B | ассет графики/3D/интерфейса: 29 |
| №2389 wallpapers/3.png | 1662340 B | ассет графики/3D/интерфейса: 3 |
| №2390 wallpapers/30.png | 237556 B | ассет графики/3D/интерфейса: 30 |
| №2391 wallpapers/31.svg | 1181 B | ассет графики/3D/интерфейса: 31 |
| №2392 wallpapers/32.svg | 1417 B | ассет графики/3D/интерфейса: 32 |
| №2393 wallpapers/4.png | 1816114 B | ассет графики/3D/интерфейса: 4 |
| №2394 wallpapers/5.png | 1742466 B | ассет графики/3D/интерфейса: 5 |
| №2395 wallpapers/6.png | 1591016 B | ассет графики/3D/интерфейса: 6 |
| №2396 wallpapers/7.png | 1815665 B | ассет графики/3D/интерфейса: 7 |
| №2397 wallpapers/8.png | 1492730 B | ассет графики/3D/интерфейса: 8 |
| №2398 wallpapers/9.png | 1715179 B | ассет графики/3D/интерфейса: 9 |

## Реестр имён, переменных и ключей

Имена сгруппированы по роли. Ссылка №NNNN указывает на путь в таблице файлов выше; остальные вхождения ищите в исходниках.
Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.


### JS объявления/параметры (4941)

| Имя | Исходные файлы |
|---|---|
| _ | №0062 (+ 10 других файлов) |
| __ls | №1390 (+ 4 других файлов) |
| __shifterProgression | №0837 |
| __TEST_SRC__ | №1390 (+ 4 других файлов) |
| _event | №0891 |
| _wc | №0890 |
| a | №0063 (+ 144 других файлов) |
| A | №0062 (+ 5 других файлов) |
| a0 | №1313 (+ 1 других файлов) |
| a1 | №1313 (+ 1 других файлов) |
| a2 | №1313 (+ 1 других файлов) |
| aa | №0065 (+ 1 других файлов) |
| aal | №1258 |
| ab | №0062 (+ 10 других файлов) |
| abilities | №0788 |
| ability | №0081 (+ 6 других файлов) |
| ABILITY | №0802 |
| abilityMod | №0783 |
| abName | №0658 |
| AbortController | №1296 |
| above | №0065 (+ 2 других файлов) |
| absent | №0672 |
| absolute | №2338 |
| absorbed | №0659 (+ 1 других файлов) |
| ac | №0065 (+ 25 других файлов) |
| ACADEMIES | №0876 |
| academy | №0780 (+ 1 других файлов) |
| academyEffects | №0783 |
| acBase | №0795 |
| acBaseInp | №0795 |
| acc | №0840 (+ 4 других файлов) |
| acCalcBaseSel | №0795 |
| ACCEPT | №0806 |
| access | №0674 (+ 1 других файлов) |
| accessors | №1312 (+ 4 других файлов) |
| accessory | №0067 |
| accIndex | №1304 |
| account | №0655 |
| ACCURSED_CURSE_FEATURES | №0783 |
| ACCURSED_CURSES | №0783 |
| ACCURSED_METAMORPHOSES | №0783 |
| acidAttack | №1265 |
| acInput | №0087 (+ 1 других файлов) |
| acInputEl | №0797 |
| across | №0065 |
| action | №0081 (+ 20 других файлов) |
| actionBtn | №0796 |
| actionHandler | №0814 |
| actionId | №0829 |
| actionIndex | №0842 |
| actionName | №0815 |
| actionResultsByPeer | №0814 |
| actions | №0082 (+ 6 других файлов) |
| ACTIONS | №0787 |
| actionSpent | №0659 |
| actionStr | №0794 |
| actionTokenId | №0629 |
| active | №0065 (+ 15 других файлов) |
| ACTIVE | №0786 |
| activeBonuses | №0797 |
| activeBtns | №0776 |
| activeCat | №0795 |
| activeCategory | №0797 (+ 1 других файлов) |
| activeClass | №0816 |
| activeColsWallet | №0794 |
| activeEffects | №0082 |
| activeFolder | №0816 |
| activeHero | №0836 (+ 1 других файлов) |
| activeId | №0822 |
| activeLvl | №0836 |
| activeNow | №0777 |
| activeStats | №0797 |
| activeTab | №0067 |
| activeWp | №0872 |
| actor | №0659 (+ 10 других файлов) |
| actorId | №0787 (+ 1 других файлов) |
| actors | №0645 |
| acts | №0637 (+ 7 других файлов) |
| actual | №0787 (+ 5 других файлов) |
| actualMode | №0659 |
| acVal | №0797 |
| ad | №0065 |
| add | №0793 (+ 3 других файлов) |
| addBtn | №0795 |
| added | №0717 (+ 2 других файлов) |
| addedLangs | №0650 |
| addedWeight | №0796 (+ 1 других файлов) |
| addExhaustion | №0829 |
| addGroup | №0677 |
| addToContainer | №0793 |
| addVal | №0784 |
| adj | №0809 |
| adjacent | №0062 |
| adjusted | №0809 |
| adr | №0837 (+ 1 других файлов) |
| adv | №0659 (+ 2 других файлов) |
| advice | №0823 |
| aether | №0645 |
| af | №0065 |
| affected | №0082 |
| affinity | №0652 (+ 1 других файлов) |
| after | №0659 (+ 8 других файлов) |
| afterBounds | №1288 |
| ag | №0783 (+ 1 других файлов) |
| again | №1329 |
| age | №0628 (+ 2 других файлов) |
| ageEl | №0628 (+ 1 других файлов) |
| ageInput | №0628 (+ 1 других файлов) |
| agents | №0636 |
| ah | №0065 (+ 1 других файлов) |
| ai | №0065 (+ 11 других файлов) |
| ailment | №0783 |
| aim | №0074 |
| aimed | №1319 |
| ain | №0065 (+ 1 других файлов) |
| al | №0065 |
| alchemistCombatant | №1264 |
| alchemistDebuffs | №0659 |
| alchemistFormula | №0659 |
| alchemistLevel | №0659 |
| alchemistState | №0659 |
| alchemistVariants | №0082 |
| alias | №0704 (+ 2 других файлов) |
| ALIAS | №0774 |
| aliases | №0082 (+ 7 других файлов) |
| ALIASES | №0676 (+ 1 других файлов) |
| align | №1455 |
| all | №0067 (+ 5 других файлов) |
| ALL_RECIPES | №0676 |
| allBgs | №0628 |
| allCharacters | №0087 |
| allCreatureNames | №0810 |
| allCurses | №0783 |
| allElements | №0794 |
| allFeats | №0749 |
| allItems | №0797 |
| allow | №0824 |
| allowed | №0065 (+ 10 других файлов) |
| allowed2 | №0817 |
| allowMastery | №0783 |
| allPanels | №0826 (+ 1 других файлов) |
| allRaces | №0628 (+ 2 других файлов) |
| allRollsDetails | №0840 |
| allSources | №0749 |
| allSpells | №0840 |
| ally | №0082 (+ 5 других файлов) |
| allyState | №0082 |
| allyWilling | №0823 |
| allyX | №0823 |
| allyY | №0823 |
| alone | №1271 |
| already | №0783 (+ 1 других файлов) |
| alreadyHad | №0749 |
| alreadyHas | №0826 |
| alreadyHasSelectedClass | №0704 |
| alreadyHasSubclass | №0704 |
| alternates | №0085 |
| always | №0813 |
| am | №0077 (+ 3 других файлов) |
| am2 | №1416 |
| amap | №0783 |
| AMBIENCE_STATE_KEY | №0086 |
| ambienceShouldPlay | №0086 |
| ambienceStateLoaded | №0086 |
| AMBIENT_TRACKS | №0086 |
| amorist | №1265 |
| amount | №0065 (+ 23 других файлов) |
| amp | №0783 |
| amphibian | №1265 |
| amphibianMods | №1265 |
| amplified | №1421 |
| anatomy | №1267 |
| anchor | №0062 (+ 1 других файлов) |
| anchors | №0065 (+ 1 других файлов) |
| angle | №0062 (+ 6 других файлов) |
| angularIndex | №0062 |
| animal | №0065 |
| animalCfg | №0065 |
| animalParts | №0065 |
| animalSelect | №0067 |
| ankle | №0065 (+ 1 других файлов) |
| answered | №0815 |
| answers | №1326 |
| ao | №0815 |
| ap | №0652 (+ 7 других файлов) |
| api | №0063 (+ 41 других файлов) |
| API | №0083 (+ 12 других файлов) |
| app | №0890 (+ 3 других файлов) |
| APP_FONTS | №0836 |
| APP_FRAME_COLORS | №0836 |
| APP_FRAME_STYLES | №0836 |
| APP_THEMES | №0836 |
| APP_VERSION | №0846 (+ 1 других файлов) |
| appearance | №0064 (+ 2 других файлов) |
| appearanceSource | №1296 |
| applicable | №0825 |
| applied | №0822 (+ 5 других файлов) |
| appliedBonusText | №0749 |
| applySkin | №0067 |
| approved | №1262 |
| approvedRules | №0825 |
| ar | №0652 (+ 4 других файлов) |
| arc | №0065 |
| arch | №0065 |
| archetypeFeatureIds | №0783 |
| area | №0065 (+ 2 других файлов) |
| arena | №1345 |
| arg | №0775 |
| args | №0775 (+ 7 других файлов) |
| arm | №0065 |
| armLine | №0065 |
| armor | №0670 (+ 4 других файлов) |
| armorCategories | №0795 |
| armored | №0833 |
| armorFields | №0795 |
| armorName | №0659 |
| armorObj | №0659 |
| armorOn | №0065 |
| arr | №0073 (+ 12 других файлов) |
| Array | №0667 (+ 23 других файлов) |
| ArrayBuffer | №1305 |
| arrays | №0676 |
| arrow | №0652 (+ 3 других файлов) |
| ARTIFICER_CLASSES | №0652 |
| ARTIFICER_KEY | №0831 |
| artisan | №1324 |
| artisanBack | №1324 |
| ASI | №0820 (+ 1 других файлов) |
| ASI_LEVELS | №0843 |
| asiContainer | №0704 |
| asiHtml | №0704 |
| asiLevels | №0782 |
| asiPrompt | №0704 |
| asMoney | №0822 |
| aspect | №0067 (+ 1 других файлов) |
| aspects | №0848 |
| ASPECTS | №0848 |
| assert | №1262 (+ 178 других файлов) |
| assertSource | №1301 |
| asset | №0063 (+ 30 других файлов) |
| assetId | №1308 |
| assets | №0080 |
| assetSet | №0075 |
| assigned | №0783 |
| at | №0063 (+ 16 других файлов) |
| atk | №0658 (+ 5 других файлов) |
| atkBonus | №0637 (+ 9 других файлов) |
| atkElem | №0658 (+ 1 других файлов) |
| atlas | №0066 |
| atob | №1268 (+ 21 других файлов) |
| aTok | №0659 |
| attachment | №0066 |
| attack | №0813 (+ 7 других файлов) |
| attacker | №0645 (+ 9 других файлов) |
| attackerBack | №0815 |
| attackerDebuffs | №0659 |
| attackerId | №0659 |
| attackerIdForStudy | №0659 |
| attackerSelect | №1326 |
| attackerState | №0659 |
| attackModifiers | №0813 |
| attackPayload | №0815 |
| attackRolls | №1356 |
| attacks | №0659 (+ 3 других файлов) |
| attempts | №0657 (+ 1 других файлов) |
| attributes | №1354 |
| aura | №0815 (+ 1 других файлов) |
| auraActive | №0652 |
| auraBack | №1324 |
| auraCha | №0652 |
| auraPC | №1324 |
| auraPhone | №1324 |
| auraRoster | №1324 |
| auraServer | №1324 |
| auraSource | №0652 |
| auth | №1295 |
| authoritativeAoe | №0815 |
| auto | №0815 |
| autoCloseTimer | №0801 |
| autoFail | №0659 |
| autoInterval | №0872 |
| automatic | №0645 |
| autoPlay | №0086 |
| autoResults | №0815 |
| autoRotateState | №0872 |
| autoRotateTimer | №0872 |
| autos | №0815 |
| av | №0065 (+ 2 других файлов) |
| avail | №0652 |
| available | №0783 (+ 4 других файлов) |
| availableCharges | №0082 |
| availableWallpapers | №0872 |
| avg | №0704 |
| avianHybrid | №1267 |
| aw | №0065 (+ 1 других файлов) |
| ax | №0065 (+ 2 других файлов) |
| axes | №0065 |
| AXES | №0070 |
| axis | №0065 (+ 10 других файлов) |
| ay | №0066 |
| az | №0065 (+ 1 других файлов) |
| b | №0063 (+ 128 других файлов) |
| B | №0062 (+ 16 других файлов) |
| b1 | №0065 (+ 1 других файлов) |
| back | №0063 (+ 4 других файлов) |
| backAnchor | №0065 |
| backBurden | №1324 |
| backCount | №0065 |
| backDepth | №0066 |
| backdrop | №0067 |
| backgroundName | №0628 (+ 1 других файлов) |
| backgrounds | №1444 |
| backgroundsList | №0628 (+ 1 других файлов) |
| backQueen | №1324 |
| backTop | №0066 |
| backup | №0657 (+ 2 других файлов) |
| backupData | №0836 |
| backups | №0655 |
| bad | №0645 (+ 5 других файлов) |
| badgeTag | №0776 |
| badR | №1421 |
| bag | №1285 |
| bagAnchor | №0062 |
| bagCenter | №0062 |
| bagRings | №0062 |
| baked | №2338 |
| balanceAfterBarter | №1360 |
| balanceAfterBuy | №1360 |
| BAM | №0634 |
| band | №0066 |
| bandHi | №0066 |
| bandLo | №0066 |
| bandSection | №0066 |
| bar | №0847 |
| barb | №1417 (+ 1 других файлов) |
| barbarian | №1410 |
| barFill | №0796 |
| barter | №1360 |
| barWrapper | №0796 |
| base | №0065 (+ 69 других файлов) |
| BASE | №0668 (+ 1 других файлов) |
| BASE_HOSTS | №0893 |
| baseAc | №0628 (+ 1 других файлов) |
| baseAC | №0797 |
| baseACInput | №0797 |
| baseActions | №0817 |
| baseConfig | №1504 |
| baseCount | №0676 |
| baseFeatures | №0817 |
| baseGain | №0704 |
| baseH | №0066 (+ 1 других файлов) |
| baseIds | №0876 |
| baseJinx | №0783 |
| baseline | №0067 (+ 2 других файлов) |
| baseMax | №0659 |
| baseMod | №0776 |
| baseMode | №0831 |
| baseNameEng | №0749 |
| baseNameRu | №0749 |
| baseOpenTrade | №0805 |
| baseRate | №0669 |
| baseRender | №0660 |
| BASES | №0678 |
| baseStock | №0806 |
| baseValue | №0671 |
| baseW | №0076 |
| baseX | №0065 |
| baseY | №0065 |
| bat | №0065 (+ 1 других файлов) |
| batch | №0815 |
| batchFail | №1437 |
| batchTarget | №1437 |
| battleGame | №1324 |
| bb | №0065 (+ 4 других файлов) |
| bbu | №0783 |
| bbuDamage | №1345 |
| bbuHero | №1345 |
| bbuLevel9 | №1345 |
| bbuResource | №0659 |
| bbuResult | №0659 |
| bbuTemp | №0783 |
| bc | №0062 (+ 2 других файлов) |
| bCha | №0828 |
| bCon | №0828 |
| bd | №1318 |
| bDex | №0828 |
| beak | №0065 |
| beakKind | №0065 |
| beakL | №0065 |
| beakScale | №0065 |
| beakSelect | №0067 |
| beakStyle | №1288 |
| beakW | №0065 |
| bearer | №0657 |
| bearing | №0822 |
| beast | №0837 |
| beetle | №0065 |
| before | №0657 (+ 63 других файлов) |
| beforeBounds | №1288 |
| beforeBurn | №1264 |
| beforeCup | №1326 |
| beforeCurse | №1421 |
| beforeMoxie | №1345 |
| beforeNormal | №1427 |
| beforePact | №1427 |
| beforeRepeat | №1324 |
| beforeReset | №1266 |
| beforeUnsupported | №1326 |
| beh | №1375 |
| belly | №0065 |
| belt | №0667 |
| bend | №0065 |
| berry | №0822 (+ 1 других файлов) |
| berryOwner | №0823 |
| berryRef | №1324 |
| best | №0065 (+ 11 других файлов) |
| bestD | №1312 |
| bestDist | №0815 |
| bestiary | №0810 |
| bestTrans | №1318 |
| bestTri | №1313 |
| bet | №1323 (+ 1 других файлов) |
| bev | №0815 |
| bf | №0073 (+ 2 других файлов) |
| bg | №0676 (+ 1 других файлов) |
| BG_COLOR_PALETTE | №0872 |
| BG3_POINT_BUY | №0628 (+ 1 других файлов) |
| bgBody | №0872 |
| bgInput | №0087 |
| bgs | №0649 (+ 1 других файлов) |
| bgSelect | №0628 (+ 1 других файлов) |
| bgStyle | №0776 |
| bgVal | №0628 (+ 1 других файлов) |
| bh | №0831 (+ 3 других файлов) |
| bhDamage | №0659 |
| bhPact | №0831 |
| bi | №0815 |
| bIdx | №0628 |
| bin | №0065 (+ 16 других файлов) |
| binary | №1453 |
| binBytes | №1307 |
| binPad | №1304 |
| bins | №0066 |
| bInt | №0828 |
| bird | №0065 |
| bite | №1338 |
| bits | №0062 (+ 1 других файлов) |
| bl | №0690 |
| blackPowder | №1265 |
| blackPowderAttack | №1265 |
| blade | №0065 |
| bladeSpan | №0065 |
| bleed | №0659 |
| blend | №0062 (+ 1 других файлов) |
| blended | №0062 |
| blind | №0822 (+ 2 других файлов) |
| blob | №0836 (+ 7 других файлов) |
| blobs | №1499 |
| block | №0826 (+ 6 других файлов) |
| blocked | №0657 (+ 4 других файлов) |
| bloodAbility | №0082 |
| bloodAgent | №1265 |
| bloodCurseReaction | №0659 |
| bloodHunterPack | №0783 |
| bloodlines | №0837 |
| bloodMax | №0652 |
| bloodMutagenist | №1265 |
| bloodRiteRevival | №0659 |
| bloodShort | №0082 |
| bloodSnapshots | №0082 |
| bm | №0815 (+ 2 других файлов) |
| board | №0815 (+ 2 других файлов) |
| boardBox | №0630 |
| boardCtx | №1398 |
| body | №0062 (+ 23 других файлов) |
| bodyArmor | №0797 |
| bodyBefore | №1266 |
| bodyExtras | №1274 |
| bodyStats | №0788 |
| bomb | №0082 (+ 2 других файлов) |
| bomber | №1265 |
| bomberGuard | №1265 |
| bomberResistanceTarget | №1264 |
| bomberResisted | №1264 |
| bond | №0660 |
| bondBox | №0823 |
| bondConsent | №1326 |
| bondLabel | №0823 |
| bonds | №0690 |
| bondTarget | №1326 |
| bondText | №0823 |
| bondWilling | №0823 |
| bone | №0072 (+ 1 других файлов) |
| bonesChecked | №1495 |
| boneStyle | №0065 |
| boneVertexMap | №0065 |
| bonus | №0078 (+ 24 других файлов) |
| bonusAction | №0815 |
| bonuses | №0795 |
| bonusesText | №0628 (+ 1 других файлов) |
| bonusMultiplier | №0776 |
| bonusText | №0749 |
| Boolean | №0667 (+ 1 других файлов) |
| booted | №0890 |
| borderLeftColor | №0776 |
| bottom | №0062 (+ 4 других файлов) |
| bought | №1360 |
| boundary | №0062 (+ 1 других файлов) |
| boundaryEdges | №0062 |
| boundaryWelds | №0062 |
| bounds | №1275 (+ 1 других файлов) |
| box | №0067 (+ 27 других файлов) |
| boxer | №1345 |
| boxesHtml | №0840 |
| boxIndex | №0840 |
| bp | №0676 (+ 7 других файлов) |
| bParts | №0628 (+ 1 других файлов) |
| br | №1410 |
| brandedHp | №1348 |
| braPanels | №1288 |
| breath | №1265 |
| breathOne | №1265 |
| breathResults | №0082 |
| breathRoll | №0082 |
| breathTargets | №0082 |
| breathTwo | №1265 |
| breathType | №0082 |
| bridge | №1310 (+ 4 других файлов) |
| broken | №0065 (+ 3 других файлов) |
| brokenInputs | №1291 |
| browColor | №0067 |
| browser | №1458 (+ 38 других файлов) |
| BrowserWindow | №0890 |
| bStr | №0828 |
| bt | №0065 (+ 2 других файлов) |
| btn | №0796 (+ 4 других файлов) |
| btnCat | №0797 |
| btnContainer | №0795 |
| btnMode | №0776 |
| btoa | №1268 (+ 2 других файлов) |
| bucket | №0065 (+ 2 других файлов) |
| buckets | №0065 |
| bucketStep | №0065 |
| budget | №0822 (+ 1 других файлов) |
| budgets | №0063 |
| buf | №0073 (+ 2 других файлов) |
| buffers | №0065 (+ 3 других файлов) |
| bufs | №0073 |
| build | №0066 (+ 1 других файлов) |
| built | №1268 (+ 3 других файлов) |
| bulge | №0065 |
| bundled | №1300 (+ 1 других файлов) |
| burden | №1324 |
| burdenAliases | №0807 |
| burdens | №0807 |
| burn | №0783 (+ 1 других файлов) |
| burningOwner | №1264 |
| burningTarget | №1264 |
| bus | №0857 (+ 1 других файлов) |
| busy | №0655 |
| button | №0067 (+ 5 других файлов) |
| buttons | №0067 (+ 2 других файлов) |
| buttonsHtml | №0749 |
| buyFactor | №0804 |
| bv | №0065 (+ 2 других файлов) |
| bvh | №1312 |
| bvIndex | №1304 |
| bWis | №0828 |
| bx | №0066 (+ 1 других файлов) |
| by | №0066 |
| BY_ID | №0825 |
| byFamily | №0632 (+ 12 других файлов) |
| byLevel | №0813 |
| byName | №0668 (+ 1 других файлов) |
| BYPASS_PARCHMENT_ONCE | №0649 |
| bySource | №0632 (+ 2 других файлов) |
| byteOffset | №0073 |
| bytes | №0068 (+ 4 других файлов) |
| bytesWritten | №0893 |
| bz | №0077 |
| c | №0063 (+ 223 других файлов) |
| C | №0085 (+ 13 других файлов) |
| c0 | №0665 |
| c2 | №1441 |
| ca | №0062 (+ 1 других файлов) |
| cache | №0073 |
| CACHE_BUSTER | №0846 |
| cached | №0066 (+ 1 других файлов) |
| calcAtk | №0651 |
| calcDmgBonus | №0651 |
| calcInput | №0784 |
| calcType | №0795 |
| calcWidget | №0794 |
| calf | №0063 |
| call | №0875 |
| callback | №0890 (+ 19 других файлов) |
| callbacks | №1333 |
| called | №1353 |
| calls | №1305 (+ 3 других файлов) |
| cam | №0074 (+ 1 других файлов) |
| campaign | №1377 |
| campaigns | №0646 |
| CAN | №0813 |
| canClose | №0847 |
| candidate | №0893 |
| candidates | №0065 (+ 7 других файлов) |
| canonical | №0774 |
| cantrip | №0082 |
| cantrips | №0764 (+ 1 других файлов) |
| CANTRIPS | №0848 |
| cantripsList | №0840 |
| canvas | №0074 (+ 3 других файлов) |
| cap | №0062 (+ 6 других файлов) |
| capacity | №1336 |
| caps | №1279 |
| capStart | №0062 |
| caption | №0823 |
| card | №0796 (+ 10 других файлов) |
| cardApi | №0823 |
| cardId | №0825 |
| cards | №0659 (+ 5 других файлов) |
| CARDS | №0825 |
| caseId | №1258 |
| cases | №0667 (+ 4 других файлов) |
| cast | №1332 (+ 1 других файлов) |
| caster | №0815 (+ 3 других файлов) |
| casterLevel | №0831 |
| cat | №0071 (+ 22 других файлов) |
| catalog | №0067 (+ 5 других файлов) |
| CATALOG | №0632 (+ 15 других файлов) |
| catalogContainer | №0826 |
| catalogHtml | №0826 |
| catalogKey | №0823 |
| catalogState | №0664 |
| catalogue | №1466 |
| catalyst | №0085 |
| catalystId | №0083 (+ 1 других файлов) |
| CATALYSTS | №0083 |
| catContainer | №0795 |
| category | №0074 (+ 17 других файлов) |
| CATEGORY | №0664 |
| catLower | №0795 |
| catOk | №0806 |
| cats | №0668 |
| catStr | №0827 |
| catTitle | №0795 |
| cb | №1316 (+ 2 других файлов) |
| cbt | №1325 |
| cc | №0065 (+ 1 других файлов) |
| cd | №0783 |
| ce | №1433 (+ 1 других файлов) |
| ceiling | №0822 |
| cel | №0077 |
| celestial | №1351 |
| cell | №0065 (+ 7 других файлов) |
| CELL_FT | №0630 |
| cellFt | №0660 |
| cells | №0069 (+ 1 других файлов) |
| cellU | №0065 |
| cellV | №0065 |
| center | №0065 (+ 5 других файлов) |
| centre | №0065 |
| centres | №0065 |
| cf | №0783 (+ 1 других файлов) |
| cfg | №0065 (+ 2 других файлов) |
| cg | №0866 |
| ch | №0072 (+ 3 других файлов) |
| cha | №0632 (+ 11 других файлов) |
| chain | №0065 (+ 1 других файлов) |
| chance | №0084 (+ 2 других файлов) |
| change | №1227 |
| changed | №0882 (+ 3 других файлов) |
| CHANGELOG | №0819 |
| changes | №0831 (+ 1 других файлов) |
| channel | №0067 |
| CHANNEL_KEY | №0846 |
| channels | №0070 (+ 6 других файлов) |
| char | №0835 (+ 5 других файлов) |
| character | №0063 (+ 5 других файлов) |
| CHARACTER_CREATION_MODE | №0649 |
| CHARACTER_SAVE_SCHEMA_VERSION | №0087 |
| characters | №0835 |
| characterShape | №0652 (+ 1 других файлов) |
| charClassInputs | №0704 |
| charge | №0783 |
| chargeCount | №0082 |
| chargeDirection | №0823 |
| charges | №1348 (+ 2 других файлов) |
| charId | №0835 |
| charIndex | №0835 |
| charInfo | №0836 |
| chariot | №1324 |
| charLevel | №0835 |
| charm | №1324 |
| charmed | №0082 |
| charmedHero | №1324 |
| charmTarget | №1324 |
| charName | №0835 |
| chars | №0836 (+ 1 других файлов) |
| charTotalCopper | №0794 |
| check | №0652 (+ 11 других файлов) |
| checkbox | №0796 (+ 2 других файлов) |
| checked | №0862 (+ 11 других файлов) |
| checkedAttr | №0628 (+ 1 других файлов) |
| checks | №1258 |
| cheek | №0065 |
| chest | №1319 |
| chestUnderwear | №0065 |
| child | №0793 (+ 1 других файлов) |
| childId | №0793 |
| children | №0793 |
| chin | №0065 |
| chk | №0660 (+ 1 других файлов) |
| choice | №0657 (+ 4 других файлов) |
| choiceBlocks | №0704 |
| choices | №0067 (+ 5 других файлов) |
| chosen | №0645 (+ 4 других файлов) |
| chosenD20 | №0651 |
| chosenFeat | №0704 (+ 1 других файлов) |
| chosenMod | №0776 |
| chosenPatron | №0783 |
| chosenResistance | №0082 |
| chosenTrad | №0817 |
| chromium | №1458 (+ 37 других файлов) |
| chunk | №0073 (+ 6 других файлов) |
| chunks | №1453 (+ 1 других файлов) |
| ci | №0065 (+ 1 других файлов) |
| cid | №0082 (+ 1 других файлов) |
| cId | №0836 |
| cl | №0065 (+ 3 других файлов) |
| claim | №0078 |
| clamp | №0084 |
| class | №0704 |
| CLASS | №0082 (+ 4 других файлов) |
| CLASS_DEFS | №0779 |
| CLASS_I18N | №0799 |
| CLASS_KEYS | №0831 |
| CLASS_NAMES | №0652 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0717 |
| CLASS_TOKEN_ART | №0649 |
| classBonus | №0659 |
| classContext | №0659 |
| classData | №0704 (+ 1 других файлов) |
| classDescriptions | №0667 |
| classEntry | №0704 |
| classes | №0790 (+ 6 других файлов) |
| CLASSIC_BACKGROUND_NAMES | №0649 |
| CLASSIC_CLASS_NAMES | №0649 |
| CLASSIC_RACE_IDS | №0649 |
| classicBgs | №1444 |
| classicClasses | №1444 |
| classLevel | №0704 |
| classMatch | №0840 |
| classMeta | №0790 |
| className | №0628 (+ 7 других файлов) |
| classNameBase | №0650 |
| classNameOnly | №0628 (+ 1 других файлов) |
| classReduction | №0659 |
| classSelect | №0628 (+ 1 других файлов) |
| classStr | №0840 |
| clawLen | №0065 |
| clean | №0637 (+ 10 других файлов) |
| cleanName | №0650 |
| cleanStr | №0776 (+ 1 других файлов) |
| cleanTool | №0650 |
| clear | №0066 (+ 1 других файлов) |
| clearContainer | №0793 |
| clearInterval | №1390 (+ 5 других файлов) |
| clearTimeout | №1390 (+ 28 других файлов) |
| cleft | №0062 (+ 1 других файлов) |
| cleric | №1417 |
| click | №1319 |
| CLIENT_KEY | №0814 |
| clipped | №0065 |
| clone | №1263 (+ 6 других файлов) |
| close | №0819 (+ 1 других файлов) |
| closeBtn | №0704 |
| closedHero | №1326 |
| closedPixels | №1464 |
| cloth | №0067 (+ 3 других файлов) |
| clothBuckets | №0065 |
| clothed | №1293 (+ 1 других файлов) |
| clothes | №1267 (+ 2 других файлов) |
| clothFaces | №0065 |
| clothing | №0063 (+ 2 других файлов) |
| cloud | №1296 |
| cloudStatus | №0836 |
| cls | №0790 (+ 7 других файлов) |
| club | №0780 (+ 1 других файлов) |
| clubFeatures | №0783 |
| clubIds | №1353 |
| cm | №0783 (+ 1 других файлов) |
| cmd | №1263 |
| cmn | №1312 |
| cmx | №1312 |
| cn | №0799 (+ 1 других файлов) |
| cName | №0840 |
| co | №0077 |
| code | №0655 (+ 6 других файлов) |
| coinRef | №1325 |
| coins | №0794 |
| col | №0069 (+ 1 других файлов) |
| cold | №0067 |
| colEP | №0794 |
| collar | №0062 (+ 2 других файлов) |
| collarCount | №0062 |
| collisions | №1318 |
| colno | №0775 |
| color | №0065 (+ 4 других файлов) |
| coloredDrink | №1265 |
| coloredPotionMaker | №1265 |
| colorHex | №0872 |
| colorKey | №0836 |
| colors | №0067 (+ 1 других файлов) |
| colorType | №0082 |
| colour | №1290 |
| colourDetail | №1266 |
| colourIdat | №1290 |
| colourRaw | №1290 |
| colPP | №0794 |
| cols | №0065 (+ 1 других файлов) |
| combat | №0670 (+ 2 других файлов) |
| combatant | №0082 (+ 1 других файлов) |
| combatants | №0082 |
| command | №0834 |
| commit | №0645 |
| committed | №1297 |
| commonSaved | №1464 |
| companion | №1326 (+ 1 других файлов) |
| companionId | №1353 |
| compare | №1301 |
| comparing | №0067 |
| compat | №0846 (+ 2 других файлов) |
| compatFs | №1505 |
| compatRequire | №1505 |
| completed | №0801 |
| completedBytes | №0893 |
| component | №1312 |
| componentBytes | №1316 |
| compositions | №1455 |
| comps | №1313 |
| con | №0632 (+ 15 других файлов) |
| conc | №0831 |
| concentration | №0659 |
| cond | №0651 (+ 2 других файлов) |
| condition | №0659 (+ 3 других файлов) |
| CONDITION_ALIASES | №0831 |
| conditionHero | №1345 |
| conditionMods | №0659 |
| conditionNotes | №0776 |
| conditions | №0659 (+ 4 других файлов) |
| CONDITIONS | №0659 (+ 3 других файлов) |
| CONDITIONS_CONFIG | №0087 |
| conds | №0659 |
| conduit | №0702 |
| config | №0078 (+ 5 других файлов) |
| CONFIG | №0657 |
| confirmed | №0082 |
| conflict | №0657 |
| CONFLICT | №0083 |
| conflicts | №0083 (+ 2 других файлов) |
| conflictSet | №0083 |
| conMod | №0628 (+ 4 других файлов) |
| conModFinal | №0628 (+ 1 других файлов) |
| conScore | №0659 |
| consent | №1326 |
| console | №0667 (+ 29 других файлов) |
| constant | №0815 (+ 1 других файлов) |
| consumed | №0676 |
| consumedJinx | №0659 |
| consumer | №1333 |
| container | №0628 (+ 15 других файлов) |
| containerId | №0826 (+ 3 других файлов) |
| containers | №0787 (+ 3 других файлов) |
| content | №0797 (+ 1 других файлов) |
| contentBox | №0704 |
| contentDiv | №0776 |
| contentsWeight | №0793 |
| context | №0659 (+ 13 других файлов) |
| contextBridge | №0891 |
| contexts | №1266 (+ 1 других файлов) |
| contract | №0783 |
| contracts | №2338 |
| control | №0067 (+ 1 других файлов) |
| controller | №0657 (+ 2 других файлов) |
| controls | №0067 (+ 1 других файлов) |
| conVal | №0704 |
| converted | №0085 (+ 1 других файлов) |
| cooldown | №1262 |
| cooledAttack | №1265 |
| cooling | №1265 |
| copied | №2338 |
| COPPER | №0803 |
| copperPerElectrum | №0794 |
| copperPerGold | №0794 |
| copperPerPlat | №0794 |
| copperPerSilver | №0794 |
| copy | №0064 (+ 8 других файлов) |
| core | №0065 (+ 8 других файлов) |
| CORE | №0652 |
| CORE_CLASSES | №0664 |
| coreOwned | №0652 |
| corePositions | №0065 |
| corner | №1290 |
| corners | №0065 (+ 2 других файлов) |
| corona | №0062 |
| corpse | №0813 (+ 2 других файлов) |
| corrupt | №1278 |
| cost | №0652 (+ 14 других файлов) |
| costDie | №0783 |
| costInp | №0795 |
| count | №0065 (+ 43 других файлов) |
| counter | №0797 (+ 6 других файлов) |
| counterDamage | №0783 (+ 1 других файлов) |
| counterHero | №1345 |
| counterLeft | №0659 |
| counterReduction | №0659 (+ 1 других файлов) |
| counterState | №0659 |
| countInput | №0797 |
| counts | №0062 (+ 3 других файлов) |
| countToRead | №0073 |
| coverBonus | №0659 (+ 1 других файлов) |
| covered | №0066 (+ 1 других файлов) |
| coveredCount | №1494 |
| cp | №0065 (+ 17 других файлов) |
| cPerS | №0794 |
| cpInput | №0794 |
| cpVal | №0794 |
| cr | №0632 (+ 15 других файлов) |
| CR | №0813 |
| CR_BY_MONSTER | №0812 |
| CR_RANK | №0812 |
| craft | №0632 (+ 21 других файлов) |
| craftBase | №0631 |
| craftBonus | №0669 (+ 1 других файлов) |
| crafted | №0668 |
| CRAFTING_BACKGROUND_PROFILES | №0676 |
| CRAFTING_CLASS_PROFILES | №0676 |
| CRAFTING_FEAT_PROFILES | №0676 |
| CRAFTING_RACE_PROFILES | №0676 |
| craftingProfile | №0676 |
| craftModifier | №0676 |
| craftNotes | №0676 |
| createContainer | №0793 |
| created | №0822 |
| creationScreen | №0628 (+ 1 других файлов) |
| creatures | №0690 |
| CREATURES | №0778 |
| crest | №0065 |
| crit | №1345 |
| critical | №0659 (+ 3 других файлов) |
| criticalRange | №0659 |
| critNote | №0776 (+ 1 других файлов) |
| critTarget | №1345 |
| cross | №0066 (+ 1 других файлов) |
| crowd | №0659 (+ 1 других файлов) |
| crowdCondition | №0783 |
| crowdDC | №0783 |
| crowdHero | №1345 |
| crowdResults | №0783 |
| crowdSave | №0659 |
| crowdTarget | №1345 |
| crowdTargets | №0783 |
| crown | №0065 |
| crownDiagnostics | №1468 |
| crownOff | №1468 |
| crypto | №0893 (+ 57 других файлов) |
| cs | №0065 (+ 11 других файлов) |
| csel | №0810 |
| ct | №0065 |
| ctx | №0076 (+ 137 других файлов) |
| ctx2d | №0067 |
| cuff | №0066 |
| cum | №0065 |
| cup | №0066 (+ 1 других файлов) |
| cupChoice | №0823 |
| cupNumber | №1338 |
| cupPC | №1324 |
| cupPhone | №1324 |
| cupProfiles | №1324 |
| cupResult | №0823 |
| cupRoster | №1324 |
| cups | №0066 |
| cupsBack | №1324 |
| cupServer | №1324 |
| cupsPending | №0823 |
| cur | №0084 (+ 4 других файлов) |
| curHp | №0783 |
| curl | №0065 |
| current | №0062 (+ 13 других файлов) |
| currentActiveId | №0835 |
| currentChar | №0087 |
| currentCharacterId | №0087 |
| currentClass | №0704 |
| currentColor | №0872 |
| currentCurrHp | №0828 |
| currentDim | №0872 |
| currentExp | №0784 |
| currentHero | №0836 (+ 1 других файлов) |
| currentHound | №0783 |
| currentHp | №0082 (+ 1 других файлов) |
| currentHP | №0873 |
| currentInventoryCategory | №0797 |
| currentLevelExpReq | №0784 |
| currentLevelInClass | №0717 |
| currentLvl | №0784 (+ 1 других файлов) |
| currentMax | №0704 |
| currentModalColor | №0872 |
| currentModalOpacity | №0872 |
| currentOpacity | №0872 |
| currentPact | №0802 |
| currentProfsIds | №0826 |
| currentProgress | №0847 |
| currentRollMode | №0776 |
| currentRound | №0659 |
| currentSpent | №0628 (+ 1 других файлов) |
| currentStep | №0086 |
| currentTime | №0801 |
| currentTrack | №0086 |
| currentTrackIndex | №0086 |
| currentVal | №0628 (+ 3 других файлов) |
| currentVersion | №0836 (+ 1 других файлов) |
| currentVolume | №0086 |
| currentWallpaperIndex | №0872 |
| currId | №0836 |
| curse | №0783 |
| curseActor | №0659 |
| curseEffect | №0783 |
| curseId | №0783 |
| curseKnown | №0692 |
| curseMax | №0783 |
| curseNames | №0645 |
| curses | №0081 (+ 1 других файлов) |
| curseSaveMods | №0659 |
| curSides | №0651 |
| curStat | №0651 |
| curve | №0065 |
| custom | №0066 (+ 1 других файлов) |
| customBtn | №0797 (+ 1 других файлов) |
| customElem | №0800 |
| customGather | №0829 |
| customRaces | №0828 |
| customSkinCharacter | №1267 |
| customTestSource | №0846 |
| cut | №0065 (+ 1 других файлов) |
| cutFaces | №0062 |
| cv | №0065 (+ 2 других файлов) |
| cw | №1290 |
| cwd | №1263 |
| cx | №0065 (+ 7 других файлов) |
| cy | №0062 (+ 7 других файлов) |
| cycles | №0669 |
| cz | №0065 (+ 5 других файлов) |
| d | №0063 (+ 84 других файлов) |
| D | №0062 (+ 23 других файлов) |
| d00 | №1312 (+ 2 других файлов) |
| d01 | №1312 (+ 2 других файлов) |
| d1 | №1312 (+ 3 других файлов) |
| d11 | №1312 (+ 2 других файлов) |
| d2 | №1312 (+ 3 других файлов) |
| d20 | №0659 (+ 4 других файлов) |
| d20_1 | №0651 |
| d20_2 | №0651 |
| d20Button | №0652 |
| d20Details | №0651 |
| d20Result | №0776 (+ 1 других файлов) |
| d21 | №1312 (+ 2 других файлов) |
| d3 | №1312 (+ 3 других файлов) |
| d4 | №1312 (+ 3 других файлов) |
| d5 | №1312 (+ 3 других файлов) |
| d6 | №1312 (+ 3 других файлов) |
| da | №1290 |
| damage | №0078 (+ 21 других файлов) |
| DAMAGE_TYPES | №0659 |
| damageBeforeWard | №0659 |
| damageButton | №0652 |
| damaged | №0668 |
| damageOpts | №0659 |
| damageParts | №0659 |
| damageResult | №0815 |
| damageStr | №0795 |
| damageString | №0776 (+ 1 других файлов) |
| damageTaken | №0659 |
| dark | №0065 (+ 2 других файлов) |
| data | №0067 (+ 42 других файлов) |
| dataDir | №1455 (+ 1 других файлов) |
| dataStr | №0836 |
| DataView | №1268 (+ 21 других файлов) |
| Date | №0667 (+ 66 других файлов) |
| dateStr | №0836 |
| day | №0803 |
| db | №0717 (+ 4 других файлов) |
| dbg | №1389 (+ 1 других файлов) |
| dbItem | №0796 (+ 1 других файлов) |
| dbNameLower | №0650 |
| dc | №0078 (+ 26 других файлов) |
| dcElem | №0658 (+ 1 других файлов) |
| dcValue | №0820 |
| dd | №0077 (+ 1 других файлов) |
| deadAlly | №1265 |
| dealUses | №0783 |
| deathSaveFailures | №0659 |
| deb | №0082 |
| debuffs | №0659 (+ 1 других файлов) |
| debug | №1227 |
| debugBtn | №0775 |
| debugContainer | №0836 (+ 1 других файлов) |
| debugToggle | №0836 |
| debugWrapper | №0836 |
| deception | №0082 |
| deck | №0823 (+ 5 других файлов) |
| DECLARATIVE_FEATURES | №0652 |
| declared | №1326 |
| decodeURIComponent | №1403 (+ 1 других файлов) |
| deduction | №0645 |
| def | №0070 (+ 6 других файлов) |
| DEFAULT | №0075 |
| DEFAULT_CAPACITY | №0793 |
| DEFAULT_CHANNEL | №0846 |
| DEFAULT_COLS | №0630 |
| DEFAULT_ENABLED | №0670 |
| DEFAULT_ICON | №0836 (+ 2 других файлов) |
| DEFAULT_MANIFEST_URL | №0846 |
| DEFAULT_RACES | №0828 |
| DEFAULT_ROWS | №0630 |
| defaultIcon | №0892 |
| defaultMode | №0795 |
| defaultModel | №0810 |
| defaults | №0070 (+ 2 других файлов) |
| defaultType | №0795 |
| defaultValue | №0795 |
| defender | №1345 (+ 1 других файлов) |
| defenderClasses | №0659 |
| defenses | №0795 (+ 1 других файлов) |
| defensesContainer | №0795 |
| defer | №0815 |
| deflect | №0659 |
| deflected | №1264 |
| defs | №0070 (+ 4 других файлов) |
| DEFS | №0822 |
| delay | №0657 (+ 1 других файлов) |
| delayedBomb | №1265 |
| delBtn | №0797 (+ 1 других файлов) |
| deleteBtn | №0816 |
| deleted | №0657 |
| delta | №0062 (+ 18 других файлов) |
| demolitionOwner | №1265 |
| demolitionResult | №1265 |
| demolitionTarget | №0082 (+ 1 других файлов) |
| den | №0065 (+ 7 других файлов) |
| denied | №1340 |
| denLabel | №0067 |
| denOpacity | №0066 |
| dense | №1475 |
| denValues | №0066 |
| dependency | №2338 |
| depth | №0065 (+ 4 других файлов) |
| deputy | №1258 |
| derived | №2338 |
| derivedAssets | №0075 |
| desc | №0674 (+ 7 других файлов) |
| descBox | №0628 (+ 2 других файлов) |
| descElem | №0800 |
| descInp | №0795 |
| descInput | №0828 |
| description | №0652 (+ 2 других файлов) |
| descriptor | №1268 (+ 1 других файлов) |
| descText | №0628 (+ 1 других файлов) |
| descVal | №0828 |
| desired | №0062 (+ 2 других файлов) |
| DesktopWebUpdater | №0890 (+ 2 других файлов) |
| dest | №0079 (+ 5 других файлов) |
| destination | №0822 (+ 2 других файлов) |
| destinations | №0822 |
| detail | №0854 (+ 3 других файлов) |
| details | №0067 (+ 4 других файлов) |
| detailsElem | №0800 |
| detailsHtml | №0797 |
| detailText | №0776 (+ 1 других файлов) |
| developmentGate | №1262 |
| device | №1324 |
| devModal | №0836 |
| dex | №0632 (+ 14 других файлов) |
| dexHero | №1345 (+ 1 других файлов) |
| dexInput | №0828 |
| dexMod | №0628 (+ 6 других файлов) |
| dexSave | №1345 |
| dexScore | №0659 (+ 1 других файлов) |
| dexStats | №0659 |
| df | №0783 |
| di | №0659 (+ 1 других файлов) |
| diag | №1278 (+ 9 других файлов) |
| diagnostics | №1455 |
| diagonal | №0824 (+ 1 других файлов) |
| diagonals | №0824 |
| dialectAliases | №0832 |
| DIALECTS | №0832 |
| dice | №0783 (+ 9 других файлов) |
| DICE_ICONS | №0836 (+ 2 других файлов) |
| diceCount | №0776 (+ 3 других файлов) |
| diceCountInp | №0795 |
| diceDir | №0892 |
| diceFiles | №0892 |
| diceMatch | №0776 |
| diceMax | №1291 |
| diceMin | №1291 |
| diceOptions | №0651 |
| diceRegex | №0840 |
| dices | №0795 |
| diceSides | №0776 (+ 1 других файлов) |
| diceSpent | №0082 |
| diceTab | №0776 |
| diceTypes | №0651 |
| die | №0085 (+ 7 других файлов) |
| DIE | №0645 (+ 1 других файлов) |
| dieSides | №0815 |
| diff | №0704 (+ 1 других файлов) |
| dig | №1346 |
| digDeep | №0659 |
| digDeepTypes | №0659 |
| digit | №0065 |
| digits | №0065 |
| dimLayer | №0872 |
| dir | №0065 (+ 10 других файлов) |
| dire | №0783 |
| direct | №0069 |
| directCompatible | №1316 |
| direction | №0822 (+ 2 других файлов) |
| directions | №0822 |
| direMax | №0783 |
| DIRS | №0824 |
| dirty | №0783 (+ 1 других файлов) |
| dirtyApplied | №0783 |
| dirtyDC | №0783 |
| dirtyHero | №1345 |
| dirtyResource | №0783 |
| dirtySave | №0783 |
| dirtyTarget | №1345 |
| dis | №0659 (+ 2 других файлов) |
| disable | №0796 |
| disabled | №0823 |
| disBtn | №0797 |
| disc | №0065 (+ 2 других файлов) |
| discharge | №1264 |
| dischargeTarget | №1264 |
| disciplineAliases | №0833 |
| disciplineByPower | №0783 |
| disciplines | №0833 |
| discover | №0083 |
| discoveries | №0082 |
| discovery | №0082 |
| discoveryLevel | №0082 |
| discoveryName | №0082 |
| discoveryRecipes | №0082 |
| disguise | №1344 |
| displacement | №1309 |
| display | №0704 (+ 1 других файлов) |
| displayedAC | №0831 |
| displayName | №0628 (+ 3 других файлов) |
| displaySpeed | №0787 |
| displayStyle | №0840 |
| dist | №0065 (+ 5 других файлов) |
| distal | №0065 |
| distance | №0065 (+ 4 других файлов) |
| distanceFt | №0822 (+ 1 других файлов) |
| distanceRolled | №0822 |
| distances | №1312 (+ 2 других файлов) |
| div | №0704 |
| dl | №0065 (+ 1 других файлов) |
| dm | №0815 (+ 1 других файлов) |
| dmg | №0082 (+ 7 других файлов) |
| dmgBonus | №0651 |
| dn | №0065 |
| DND_CLASSES_LIST | №0628 (+ 1 других файлов) |
| DND_DAMAGE_TYPES | №0795 |
| DND_SKILLS_LIST | №0795 |
| DND_WEAPON_CATEGORIES | №0795 |
| DND_WEAPON_PROPERTIES | №0795 |
| dndBackgrounds | №0628 |
| dndModal | №0704 |
| doc | №1389 (+ 2 других файлов) |
| document | №1266 |
| dom | №1319 |
| dome | №0065 |
| domReady | №1411 (+ 1 других файлов) |
| done | №0846 (+ 3 других файлов) |
| donor | №0817 |
| dot | №0062 |
| down | №0079 |
| download | №1469 |
| downloadAnchor | №0836 |
| downloads | №1300 |
| dr | №0783 (+ 2 других файлов) |
| draft | №0822 (+ 2 других файлов) |
| DRAFT | №0064 |
| drag | №0867 |
| dragon | №1415 |
| dragonGraft | №0082 |
| draw | №0787 (+ 4 других файлов) |
| drawer | №0797 |
| drawerContainer | №0776 |
| drawerContent | №0776 |
| drawWindow | №0777 |
| dreadAttack | №1345 |
| dreadHandHero | №1345 |
| dreadHero | №1345 |
| dreadTarget | №1345 |
| dress | №1276 |
| drop | №0065 |
| dry | №1299 |
| ds | №0659 (+ 1 других файлов) |
| dst | №0073 (+ 1 других файлов) |
| dt | №0065 (+ 2 других файлов) |
| du | №0062 |
| duplicates | №1499 |
| duplicityMiss | №0659 |
| duplicityTarget | №0659 |
| dupRoll | №0659 |
| durability | №0803 (+ 1 других файлов) |
| duration | №0873 |
| durationMs | №0086 |
| durationSeconds | №0873 |
| dv | №0062 (+ 3 других файлов) |
| dwarf | №0070 |
| dwarfDesc | №0667 |
| dx | №0062 (+ 13 других файлов) |
| dy | №0062 (+ 12 других файлов) |
| dynamicContainer | №0797 |
| dynamoAttack | №1265 |
| dz | №0062 (+ 5 других файлов) |
| dzdt | №0062 |
| e | №0062 (+ 151 других файлов) |
| E | №0813 |
| e0 | №0067 (+ 1 других файлов) |
| each | №0652 |
| ear | №0065 |
| earOuter | №0065 |
| ears | №0065 (+ 1 других файлов) |
| earVertices | №1279 |
| eb | №0065 (+ 1 других файлов) |
| ec | №0783 |
| eco | №1375 |
| econ | №0669 (+ 1 других файлов) |
| ECON | №0668 |
| edge | №0065 |
| edges | №0065 |
| editor | №0891 (+ 1 других файлов) |
| editorWeaponPresets | №0067 |
| ef | №0082 (+ 1 других файлов) |
| eff | №0783 |
| effect | №0082 (+ 3 других файлов) |
| effectApplies | №0659 |
| effectiveD20 | №0659 |
| effectiveDiceCount | №0776 |
| effectiveMode | №0776 |
| effectMap | №0082 |
| effects | №0678 (+ 2 других файлов) |
| EFFECTS | №0084 |
| effectSerial | №0645 |
| eid | №0813 (+ 1 других файлов) |
| eInput | №0794 |
| el | №0074 (+ 28 других файлов) |
| elapsed | №0882 |
| elBar | №0784 |
| elCurExp | №0784 |
| elCurLvl | №0784 |
| elDesc | №0828 |
| electromagneticShield | №0659 |
| elem | №1415 |
| element | №0783 |
| elementId | №0797 |
| elements | №1266 (+ 3 других файлов) |
| elementsToHide | №0872 |
| elId | №0796 |
| eligible | №0825 |
| elInputCur | №0784 |
| ellipse | №0062 |
| elName | №0828 |
| elNextExp | №0784 |
| elSpeed | №0828 |
| email | №0655 (+ 1 других файлов) |
| embedded | №0825 |
| emojis | №0776 |
| empty | №0065 |
| emptyMsg | №0795 |
| enabled | №0063 (+ 3 других файлов) |
| encoded | №0822 |
| encodeURIComponent | №1403 (+ 1 других файлов) |
| encounter | №0809 |
| end | №0065 (+ 4 других файлов) |
| ended | №0822 |
| ends | №0078 |
| endY | №0066 |
| enemies | №0822 |
| enemy | №0876 (+ 4 других файлов) |
| enemyHP | №1355 |
| energyDamage | №0082 |
| energyResult | №0082 |
| energySeamTarget | №1264 |
| engine | №1402 |
| englishName | №0782 |
| engName | №0704 (+ 1 других файлов) |
| enhancedAttack | №1345 |
| enhancedTarget | №1345 |
| entity | №0082 (+ 2 других файлов) |
| entries | №0657 (+ 8 других файлов) |
| entry | №0067 (+ 18 других файлов) |
| entryId | №0800 |
| env | №1320 (+ 1 других файлов) |
| envelope | №0062 |
| ep | №0783 (+ 2 других файлов) |
| epInput | №0794 |
| epoch | №0657 |
| eprof | №0815 |
| eps | №0062 (+ 2 других файлов) |
| epsilon | №0066 |
| epVal | №0794 |
| equipCheckbox | №0797 |
| equipLabel | №0797 |
| equipment | №0070 |
| equippedWeapon | №0776 |
| er | №0065 (+ 1 других файлов) |
| err | №0067 (+ 4 других файлов) |
| error | №0067 (+ 1 других файлов) |
| errorCount | №0775 |
| errors | №0665 (+ 40 других файлов) |
| es | №0084 |
| esc | №0074 (+ 1 других файлов) |
| escape | №1403 (+ 2 других файлов) |
| ev | №0787 (+ 6 других файлов) |
| evasion | №0659 |
| event | №0078 (+ 15 других файлов) |
| EVENT_LIMIT | №0814 |
| eventAttacker | №0659 |
| eventBox | №0823 |
| eventChainHeadHash | №0814 |
| eventLabel | №0823 |
| eventLogBaseHash | №0814 |
| eventLogBaseSeq | №0814 |
| eventPC | №1324 |
| eventPhone | №1324 |
| eventRoster | №1324 |
| events | №0814 (+ 6 других файлов) |
| eventServer | №1324 |
| eventText | №0823 |
| evo | №1415 |
| evt | №1266 |
| ex | №0065 (+ 1 других файлов) |
| exact | №0665 (+ 2 других файлов) |
| excess | №0783 |
| executionScene | №0822 |
| exhaustion | №0829 |
| exhaustionNow | №0659 |
| exhaustionRestKey | №0651 (+ 1 других файлов) |
| exhaustionText | №0829 |
| existing | №0078 (+ 9 других файлов) |
| existingClass | №0790 |
| existingClassEntry | №0704 |
| existingOverlay | №0776 |
| exists | №0650 (+ 1 других файлов) |
| existsL | №0650 |
| exp | №0784 |
| expand | №0066 |
| expanded | №0067 |
| expBasedLevel | №0784 |
| expected | №0082 (+ 4 других файлов) |
| expectedRevision | №0825 |
| expert | №1339 |
| expiration | №1354 |
| expired | №1345 |
| expires | №0837 |
| explicit | №1267 |
| exploitContract | №0783 |
| exploits | №0876 |
| explored | №0078 |
| exposureActor | №0659 |
| expr | №0652 (+ 7 других файлов) |
| expression | №0783 |
| ext | №0077 (+ 4 других файлов) |
| external | №0063 (+ 1 других файлов) |
| externalCalls | №1305 |
| externalJson | №1305 |
| externalPanels | №0776 |
| extra | №0065 (+ 31 других файлов) |
| EXTRA | №0647 |
| EXTRA_RULES | №0083 |
| EXTRA_TRIGGER | №0084 |
| EXTRA_TYPES | №0649 |
| extraACBonus | №0797 |
| extraAtk | №0815 |
| extraClass | №0704 |
| extraClasses | №1444 |
| extraDamages | №0795 |
| extraData | №0797 (+ 1 других файлов) |
| extraDmg | №0815 |
| extraDmgContainer | №0795 |
| extraLine | №0749 |
| extraLocked | №0704 |
| extraName | №0704 (+ 1 других файлов) |
| extrapolated | №1455 |
| extras | №0067 (+ 3 других файлов) |
| extraType | №0704 |
| exts | №0892 |
| ey | №0065 |
| eye | №0065 (+ 1 других файлов) |
| eyeBtn | №0872 |
| eyeIsland | №0065 |
| eyePart | №0065 |
| eyes | №0065 (+ 2 других файлов) |
| eyeSave | №1468 |
| eyesDiag | №1468 |
| eyesOff | №1468 |
| eyeWeight | №0065 |
| eyeX | №0065 |
| eyeY | №0065 |
| eyeZ | №0065 |
| ez | №0065 |
| f | №0063 (+ 116 других файлов) |
| F | №1414 (+ 4 других файлов) |
| fa | №0783 |
| face | №0062 (+ 2 других файлов) |
| faceParts | №0067 |
| faces | №0062 (+ 3 других файлов) |
| facing | №0065 |
| FACTIONS | №0636 |
| factor | №0062 (+ 4 других файлов) |
| factory | №0831 |
| fadeInterval | №0086 |
| fadeTimer | №0801 |
| fail | №1361 (+ 1 других файлов) |
| failed | №1263 (+ 2 других файлов) |
| failedSave | №0837 |
| fall | №1410 |
| fallback | №0065 (+ 7 других файлов) |
| FALLBACK_MANIFEST_URL | №0846 |
| fallbackName | №0717 |
| fallbackText | №0776 |
| false | №0783 (+ 6 других файлов) |
| fam | №0633 (+ 10 других файлов) |
| familiarForms | №0783 |
| FAMILIES | №0632 |
| family | №0632 (+ 1 других файлов) |
| FAMILY_BY_CREATURE | №0778 |
| FAMILY_DEFS | №0778 |
| FAMILY_NAMES | №0633 (+ 11 других файлов) |
| familyId | №0778 |
| familyOpts | №0778 |
| fangs | №0065 |
| fangsOff | №1468 |
| fans | №1288 |
| fantasy | №1466 |
| fantasySaved | №1466 |
| fApplied | №0783 |
| faq | №0819 |
| FAQ | №0819 |
| far | №0077 (+ 1 других файлов) |
| fat | №0065 |
| fatalHit | №1345 |
| fateMax | №0652 |
| fc | №0077 |
| fd | №0082 |
| fdc | №0783 |
| fdmg | №0783 |
| fearSave | №0783 |
| feat | №0652 (+ 2 других файлов) |
| FEAT_STAT_LABELS | №0749 |
| FEAT_VALID_STATS | №0749 |
| featActionHtml | №0749 |
| featDesc | №0749 |
| featherHead | №0067 |
| featherKind | №0067 |
| featherPart | №0067 |
| featName | №0749 |
| featObj | №0704 (+ 1 других файлов) |
| feats | №0629 (+ 2 других файлов) |
| featsOptions | №0704 |
| feature | №0082 (+ 3 других файлов) |
| FEATURE_DEFS | №0652 |
| FEATURE_TARGET_RULES | №0815 |
| featureDescStr | №0628 (+ 1 других файлов) |
| featureHtml | №0628 (+ 2 других файлов) |
| featureIds | №0665 (+ 1 других файлов) |
| featureIndex | №0665 |
| featureLevel | №0665 |
| featureList | №0717 |
| featureLists | №0652 |
| featureMeta | №0652 |
| featureMod | №0659 |
| featureMode | №0659 |
| features | №0082 (+ 9 других файлов) |
| featuresHtml | №0704 |
| featuresList | №0704 |
| featureStr | №0628 (+ 1 других файлов) |
| fecund | №0783 |
| feet | №0065 (+ 3 других файлов) |
| female | №0066 (+ 5 других файлов) |
| femalePositions | №1268 |
| fer | №0660 |
| ferocity | №1353 |
| fetched | №0846 |
| ff | №0077 (+ 1 других файлов) |
| fgm | №1417 |
| fi | №0065 (+ 3 других файлов) |
| fid | №0652 (+ 4 других файлов) |
| field | №0065 (+ 9 других файлов) |
| fieldLengths | №1314 |
| fields | №1333 (+ 3 других файлов) |
| fiend | №1351 |
| fight | №0822 |
| fighter | №1414 (+ 1 других файлов) |
| fighters | №0823 |
| fightingPack | №0659 |
| fightingResource | №0659 |
| fightingResult | №0659 |
| fightingStyleEffects | №0783 |
| file | №0836 (+ 59 других файлов) |
| fileNo | №1499 |
| filePath | №0872 |
| files | №0673 (+ 14 других файлов) |
| fileUrl | №0893 |
| filter | №0085 (+ 3 других файлов) |
| filteredItems | №0840 |
| filters | №0649 (+ 1 других файлов) |
| filterText | №0749 |
| final | №0783 (+ 1 других файлов) |
| finalAC | №0797 |
| finalAttackTotal | №0776 |
| finalCount | №0676 |
| finalData | №0795 |
| finalName | №0795 |
| finalPropsString | №0795 |
| finalSkillModifier | №0776 |
| finalStats | №0628 (+ 1 других файлов) |
| finalTotal | №0776 (+ 1 других файлов) |
| fingerless | №0065 |
| fins | №0065 |
| finsOff | №1468 |
| fire | №0847 |
| fireFront | №0847 |
| fireRoll | №0082 |
| first | №0062 (+ 9 других файлов) |
| firstFace | №1316 |
| firstVertex | №1316 |
| fit | №0067 (+ 5 других файлов) |
| fitted | №0065 (+ 2 других файлов) |
| fixture | №1285 |
| fixtures | №2329 |
| flags | №0660 |
| flare | №0066 |
| flat | №1288 |
| fleeing | №1324 |
| fleePhone | №1324 |
| flexible | №1265 |
| flexibleInstall | №1265 |
| Float32Array | №1266 (+ 23 других файлов) |
| Float64Array | №1271 (+ 2 других файлов) |
| floor | №0065 (+ 3 других файлов) |
| FLOOR | №0076 |
| floorAttack | №1345 |
| floorHero | №1345 |
| floorHpBefore | №1345 |
| floorMod | №1346 |
| floors | №0080 |
| floorTarget | №1345 (+ 1 других файлов) |
| floorTypes | №0080 |
| flush | №1266 |
| flyer | №1345 |
| fm | №0659 (+ 1 других файлов) |
| fm2 | №1417 |
| fn | №0062 (+ 30 других файлов) |
| focus | №0062 (+ 1 других файлов) |
| focusEl | №0819 |
| focusSources | №0840 |
| foe | №1328 (+ 1 других файлов) |
| fog | №1320 |
| fogShade | №0077 |
| fold | №0065 |
| folder | №1453 |
| folderId | №0816 |
| fontKey | №0836 |
| fontObj | №0836 |
| fontSelect | №0836 |
| fontStyleTag | №0836 |
| foot | №0065 (+ 1 других файлов) |
| footH | №0065 |
| force | №0803 (+ 1 других файлов) |
| forceCrit1 | №0776 |
| forced | №0822 |
| forceSlot | №0848 |
| forearmHigh | №0065 |
| forearmLow | №0065 |
| foreign | №1354 |
| fork | №0065 |
| form | №0065 (+ 5 других файлов) |
| formattedText | №0704 |
| formula | №0645 (+ 3 других файлов) |
| formulaDamage | №0082 |
| formulae | №0082 |
| formulaEffects | №0082 |
| formulaHero | №1265 |
| formulaIds | №0783 |
| formulas | №0645 (+ 1 других файлов) |
| fortifying | №0783 |
| fortune | №0831 |
| forward | №0065 (+ 1 других файлов) |
| found | №0066 (+ 16 других файлов) |
| foundIdx | №0872 |
| foundItemData | №0796 |
| foundProf | №0826 |
| foundWeapon | №0827 (+ 1 других файлов) |
| fov | №0077 |
| fr | №0690 (+ 1 других файлов) |
| fR1 | №0776 (+ 1 других файлов) |
| fR2 | №0776 (+ 1 других файлов) |
| fragHighp | №0077 |
| frame | №0065 (+ 25 других файлов) |
| frameColorSelect | №0836 |
| frameKey | №0836 |
| frames | №1283 |
| frameStyleSelect | №0836 |
| framework | №1337 |
| free | №0065 (+ 2 других файлов) |
| freeGather | №0882 |
| fresh | №0065 (+ 3 других файлов) |
| friend | №1324 (+ 2 других файлов) |
| frill | №0065 |
| from | №0636 (+ 4 других файлов) |
| front | №0063 (+ 4 других файлов) |
| frontal | №0065 |
| frontCount | №0065 |
| frontPlate | №0065 |
| frontTop | №0066 |
| fs | №0067 (+ 231 других файлов) |
| fsave | №0783 |
| fsp | №0890 (+ 1 других файлов) |
| ft | №0783 |
| full | №1300 (+ 1 других файлов) |
| FULL | №0802 |
| FULL_CASTER_SLOTS_TABLE | №0840 |
| FULL_CASTERS | №0831 |
| FULL_SLOTS | №0831 |
| fullCoat | №0067 |
| fullData | №0749 |
| fullPath | №0890 |
| fur | №0067 (+ 1 других файлов) |
| furEnabled | №0067 |
| furryAccessory | №0067 |
| furryLimb | №0067 |
| furrySkull | №0067 |
| furSelect | №0067 |
| fuseMinutes | №0082 |
| fuseRounds | №0082 |
| future | №0067 (+ 1 других файлов) |
| fv | №0783 |
| fx | №0065 (+ 2 других файлов) |
| fy | №0065 (+ 1 других файлов) |
| g | №0063 (+ 151 других файлов) |
| G | №0085 |
| g1 | №0076 |
| gain | №0673 (+ 4 других файлов) |
| gained | №0660 (+ 1 других файлов) |
| gainedHp | №0790 |
| gameplay | №1402 |
| gameTool | №0650 |
| gap | №0066 |
| garment | №0066 |
| garments | №0065 |
| GATE_TOWNS | №0636 |
| gather | №0829 |
| GATHERING_ACTIONS | №0829 |
| gb | №1312 (+ 4 других файлов) |
| gdiag | №1313 (+ 1 других файлов) |
| ge | №0783 |
| gem | №0822 |
| gender | №0066 (+ 7 других файлов) |
| generated | №1375 (+ 1 других файлов) |
| generatedHarvest | №1375 |
| generatedPath | №2338 |
| generation | №0657 |
| GENERIC_SPECIALTIES | №0674 |
| geo | №0063 (+ 24 других файлов) |
| geometryKey | №1275 |
| geoTarget | №0815 |
| gesture | №0067 (+ 1 других файлов) |
| getData | №0717 |
| getStat | №0790 |
| getSub | №0717 |
| ghostBounds | №0067 |
| ghostForbiddenSlots | №0067 |
| ghostShellTarget | №0650 |
| ghostWeapon | №0067 |
| gi | №0659 |
| gills | №0065 |
| git | №1447 (+ 3 других файлов) |
| gl | №0065 (+ 23 других файлов) |
| glb | №1312 (+ 7 других файлов) |
| glbPath | №1304 (+ 6 других файлов) |
| glbVertices | №1316 |
| glen | №0065 |
| global | №0836 (+ 84 других файлов) |
| globalAudio | №0086 |
| glove | №0065 |
| gn | №0783 |
| gname | №0783 |
| gnome | №0070 |
| gob | №1377 |
| gold | №0067 |
| golden | №2329 |
| goldNeeded | №0669 |
| goldOwner | №0823 |
| goldRef | №0823 |
| golemCraft | №1265 |
| golemEntities | №1265 |
| golemEntity | №1265 |
| golemRestore | №1265 |
| good | №0645 (+ 1 других файлов) |
| got | №0083 (+ 2 других файлов) |
| gp | №0794 (+ 7 других файлов) |
| gPerE | №0794 |
| gpInput | №0794 |
| gpVal | №0794 |
| gradle | №0892 |
| graftAC | №0659 |
| graftArmorAttack | №1264 |
| graftArmorTarget | №1264 |
| graftCriticalAttack | №1264 |
| graftCriticalTarget | №1264 |
| graftDef | №0082 |
| graftInstalled | №1265 |
| graftMissingDonor | №1265 |
| graftName | №0082 |
| graftRemoved | №1265 |
| graftResistant | №0659 |
| grafts | №0082 (+ 1 других файлов) |
| grant | №0677 |
| granted | №0082 (+ 1 других файлов) |
| grantMaterial | №0672 |
| gray | №0067 |
| grid | №0836 (+ 7 других файлов) |
| grip | №0065 (+ 1 других файлов) |
| groom | №0065 |
| groove | №0062 |
| ground | №0065 (+ 1 других файлов) |
| group | №0062 (+ 8 других файлов) |
| grouped | №0652 |
| groupedFeats | №0704 |
| groupFeats | №0704 |
| groupKey | №0749 |
| groupKeys | №0826 |
| groupName | №0826 |
| groupOrder | №0749 |
| groupRolls | №0840 |
| groups | №0065 (+ 4 других файлов) |
| groupsMap | №0826 |
| groupTitle | №0795 |
| growth | №1345 |
| growthAttack | №1345 |
| growthTarget | №1345 |
| gs | №1313 |
| guard | №0787 (+ 2 других файлов) |
| guide | №1378 (+ 3 других файлов) |
| guildDesc | №0667 |
| gw | №1504 |
| h | №0063 (+ 128 других файлов) |
| H | №0063 (+ 10 других файлов) |
| h2 | №1414 |
| h3 | №1337 (+ 1 других файлов) |
| h4 | №1414 |
| hab | №0632 |
| habitat | №0067 (+ 1 других файлов) |
| habitats | №0067 |
| hadSpeedZero | №0787 |
| hair | №0063 (+ 2 других файлов) |
| hairLength | №0065 |
| hairProfiles | №0065 |
| hairs | №0065 (+ 1 других файлов) |
| half | №0065 (+ 2 других файлов) |
| HALF_CASTERS | №0831 |
| hand | №0065 (+ 1 других файлов) |
| handle | №0893 |
| handleAdd | №0795 |
| handleAddClick | №0795 |
| handleArmorCatSelect | №0795 |
| handleCatSelect | №0795 |
| handleDel | №0795 |
| handleDiceSelect | №0795 |
| handlePropToggle | №0795 |
| handler | №0846 (+ 1 других файлов) |
| handlers | №0652 (+ 1 других файлов) |
| HANDLERS | №0822 |
| handleTabClick | №0797 |
| handMax | №1278 |
| handoffCalls | №1437 |
| hands | №0065 |
| harness | №1481 |
| harvest | №1365 (+ 1 других файлов) |
| hasActiveModal | №0844 |
| hasAoe | №0815 |
| hasAutoStarted | №0086 |
| hasDex | №0783 |
| hasDice | №0840 |
| hasFirearmsAll | №0827 |
| hasGraft | №0082 |
| hash | №0846 (+ 4 других файлов) |
| hashes | №1285 (+ 6 других файлов) |
| hasMagic | №0840 |
| hasMartialAll | №0827 |
| hasProf | №0877 |
| hasProficiency | №0797 |
| hasSimpleAll | №0827 |
| hasSpecificProf | №0827 |
| hasTool | №0672 (+ 2 других файлов) |
| hasUV | №0067 |
| hat | №0065 (+ 4 других файлов) |
| have | №0669 (+ 1 других файлов) |
| hay | №0797 (+ 1 других файлов) |
| haymaker | №1345 |
| hayTarget | №1345 |
| hb | №1312 (+ 4 других файлов) |
| hCls | №0840 |
| hctx | №1437 |
| hd | №0817 (+ 1 других файлов) |
| hdiag | №1318 |
| head | №0062 (+ 5 других файлов) |
| HEAD_AXES | №0070 |
| HEAD_FORMS | №0070 |
| HEAD_STYLES | №0070 |
| header | №0831 (+ 1 других файлов) |
| headerAC | №0087 |
| headers | №0657 (+ 2 других файлов) |
| heading | №0776 |
| headMax | №1278 |
| heal | №0783 (+ 2 других файлов) |
| heal2 | №0783 |
| healAmount | №0823 |
| healBatch | №1437 |
| healCaster | №0823 |
| healDeclared | №0823 |
| healed | №0082 (+ 9 других файлов) |
| healer | №0645 |
| healEventId | №0823 |
| healing | №0875 (+ 2 других файлов) |
| healingActors | №0823 |
| healingRedirect | №0659 |
| healingResult | №0659 |
| healMap | №0082 |
| healNoUndead | №0823 |
| healOriginal | №0823 |
| healRange | №0823 |
| healRoll | №0082 |
| healSight | №0823 |
| healTarget | №1437 |
| healv | №0652 |
| heatDamage | №1265 |
| heatMode | №0082 |
| height | №0065 (+ 6 других файлов) |
| heights | №1347 |
| held | №1324 (+ 2 других файлов) |
| heldName | №1326 |
| help | №0819 |
| hem | №0066 |
| hemoragent | №1265 |
| hemoragentNoPool | №1265 |
| hermit | №1324 |
| hermitHero | №1324 |
| hero | №0790 (+ 49 других файлов) |
| heroClassNames | №0840 |
| heroes | №1291 |
| heroFeats | №0749 |
| heroFeatsRef | №0749 |
| heroIsExtra | №0704 |
| heroLevel | №0665 |
| heroLevels | №0809 |
| hex | №0066 (+ 3 других файлов) |
| hi | №0065 (+ 10 других файлов) |
| hidden | №0084 (+ 1 других файлов) |
| hiddenBuckets | №0065 |
| high | №0065 (+ 5 других файлов) |
| highlight | №0067 |
| hint | №0067 |
| hip | №0065 (+ 1 других файлов) |
| hipCenter | №0066 |
| hipMax | №0066 |
| hipMin | №0066 |
| hipRadius | №0066 |
| history | №0067 (+ 4 других файлов) |
| hit | №0659 (+ 14 других файлов) |
| HIT_COST | №0807 |
| hitDie | №0697 (+ 2 других файлов) |
| hitDieMax | №0790 |
| hiX | №0065 |
| hiY | №0065 |
| hm | №1312 (+ 7 других файлов) |
| hole | №0065 |
| holeCounts | №0062 |
| holes | №0065 |
| holeVertices | №0062 |
| hollowHp | №0659 |
| holyAttack | №1265 |
| homebrewClasses | №1444 |
| homunculusCraft | №1265 |
| homunculusEntities | №1265 |
| homunculusOwner | №0659 (+ 1 других файлов) |
| homunculusState | №0659 |
| hood | №0062 (+ 1 других файлов) |
| hoof | №1286 |
| hoofScale | №0065 |
| hoofY | №0065 |
| hook | №0065 |
| hooks | №1264 (+ 3 других файлов) |
| HORN_STYLES | №0070 |
| hornAttack | №1265 |
| hornInstall | №1265 |
| hornPart | №0065 |
| horns | №0065 (+ 1 других файлов) |
| hornSelect | №0067 |
| hornSize | №1293 |
| hornStyle | №0065 (+ 1 других файлов) |
| horror | №0633 (+ 1 других файлов) |
| horseY | №0065 |
| hosiery | №0067 |
| hosieryDen | №1277 |
| host | №0085 (+ 24 других файлов) |
| hostBox | №0814 |
| hostDestroyed | №0820 |
| hostiles | №0660 (+ 1 других файлов) |
| houndHP | №0783 |
| houndTemplate | №0783 |
| howlTargets | №0645 |
| hp | №0082 (+ 22 других файлов) |
| hpAfter | №1411 |
| hpAfterTick | №1264 |
| hpBefore | №1324 |
| hpBeforeShift | №1354 |
| hpCurrentInput | №0704 (+ 1 других файлов) |
| hpDamage | №0659 |
| hpGain | №0704 |
| hpMax | №0651 (+ 1 других файлов) |
| hpMaxInput | №0704 (+ 1 других файлов) |
| hpNow | №0783 |
| hpObj | №0082 |
| hpRes | №0704 |
| hpShape | №1345 |
| hs | №1313 |
| html | №0086 (+ 51 других файлов) |
| http | №1458 (+ 37 других файлов) |
| hud | №1387 (+ 1 других файлов) |
| hugeHands | №1265 |
| human | №1267 (+ 2 других файлов) |
| hunter | №1420 |
| hv | №1375 |
| hx | №0783 |
| hy | №0065 |
| hybrid | №0783 |
| i | №0063 (+ 178 других файлов) |
| ia | №1313 (+ 2 других файлов) |
| ib | №0072 |
| icon | №0796 (+ 3 других файлов) |
| iconEl | №0796 |
| iconId | №0836 (+ 3 других файлов) |
| iconPath | №0890 |
| ICONS | №0836 (+ 2 других файлов) |
| id | №0063 (+ 153 других файлов) |
| ID | №0839 (+ 1 других файлов) |
| idat | №1290 |
| identity | №0077 (+ 1 других файлов) |
| idName | №0749 |
| idOrName | №0676 |
| ids | №0062 (+ 31 других файлов) |
| idv | №0073 (+ 1 других файлов) |
| idx | №0067 (+ 30 других файлов) |
| ignoreTarot | №0831 |
| ignoreWeight | №0793 |
| ii | №1313 (+ 1 других файлов) |
| illIds | №1353 |
| illusion | №0822 (+ 1 других файлов) |
| im | №0073 (+ 3 других файлов) |
| Image | №1266 |
| images | №1266 |
| img | №0067 (+ 3 других файлов) |
| IMG | №0076 |
| imitation | №0082 |
| immediate | №1258 |
| immune | №0822 (+ 3 других файлов) |
| immuneCharm | №0783 |
| immuneFire | №1264 |
| immuneUntil | №0659 |
| immunity | №0645 |
| importDocument | №2338 |
| imported | №1308 |
| improved | №0807 |
| inCombat | №0645 |
| incoming | №1301 (+ 1 других файлов) |
| incomingType | №0659 |
| incompatible | №0067 |
| indent | №0793 |
| index | №0062 (+ 26 других файлов) |
| indexed | №0797 |
| indices | №0062 (+ 4 других файлов) |
| Infinity | №0065 (+ 8 других файлов) |
| influence | №0062 |
| influences | №0062 |
| info | №0655 (+ 3 других файлов) |
| infoBox | №0828 |
| infoText | №0796 |
| ing | №0083 (+ 2 других файлов) |
| INGREDIENT_SOURCES | №0085 |
| INGREDIENTS | №0083 |
| ings | №0083 (+ 1 других файлов) |
| ini | №0815 |
| initElem | №0628 (+ 1 других файлов) |
| initial | №1266 (+ 2 других файлов) |
| initialAngle | №0066 |
| initialId | №1266 |
| initialProficiencies | №0650 |
| initialSkillsData | №0628 (+ 1 других файлов) |
| initiative | №0777 (+ 1 других файлов) |
| inline | №0073 |
| inner | №0062 (+ 1 других файлов) |
| innerDivs | №0826 |
| innerHtml | №0840 |
| innerList | №0797 |
| inp | №0795 |
| input | №0063 (+ 23 других файлов) |
| inputColEP | №0794 |
| inputColPP | №0794 |
| inputCopper | №0794 |
| inputElem | №0784 (+ 1 других файлов) |
| inputField | №0796 |
| inputGrid | №0794 |
| inputId | №0830 |
| inputs | №1291 |
| inputVal | №0784 |
| ins | №0783 |
| INS | №0832 |
| inside | №0815 |
| insight | №0082 |
| inspect | №0083 |
| inspectOnly | №0822 |
| inspired | №1324 |
| inspiredPhone | №1324 |
| installed | №0664 (+ 1 других файлов) |
| installedGrafts | №0082 |
| instantDeath | №0659 |
| int | №0632 (+ 10 других файлов) |
| Int16Array | №1268 (+ 21 других файлов) |
| Int8Array | №1268 (+ 21 других файлов) |
| internal | №0783 |
| interrupted | №0777 (+ 1 других файлов) |
| intervalVal | №0872 |
| intMod | №0628 (+ 5 других файлов) |
| inv | №0062 (+ 14 других файлов) |
| invalidDead | №1265 |
| inventory | №0827 (+ 1 других файлов) |
| INVENTORY_CATEGORIES | №0822 |
| inventoryPC | №1324 |
| inventoryPhone | №1324 |
| inventoryRoster | №1324 |
| inventorySearchState | №0797 |
| inventoryServer | №1324 |
| inverted | №1324 |
| invertedPhone | №1324 |
| invHeaderACEl | №0797 |
| invis | №1265 |
| invisibleAttacker | №1264 |
| invisUsed | №0659 |
| invokeOptions | №0783 |
| invSrc | №1397 |
| ioff | №0073 |
| ionizer | №1265 |
| ionizerClass | №0659 |
| ionizerEngineer | №1265 |
| ionizerTarget | №1264 |
| ip | №0650 |
| ipcMain | №0890 |
| ipcRenderer | №0891 |
| ir | №0073 (+ 1 других файлов) |
| ironChinAttack | №1345 |
| ironChinTarget | №1345 |
| irregular | №0065 |
| is | №1313 |
| isActionProcessed | №0795 |
| isActive | №0872 (+ 1 других файлов) |
| isAlreadyHas | №0826 |
| isAsiLevel | №0704 |
| isAttackOrCheck | №0776 |
| isAutoOn | №0872 |
| isAvailable | №0840 |
| isBlood | №0815 |
| isBomb | №0082 |
| isChecked | №0628 (+ 4 других файлов) |
| isCrit | №0840 |
| isDead | №0082 |
| isDebug | №0836 |
| isDebugEnabled | №0775 |
| isDestroyed | №0801 |
| isDrawerOpen | №0776 |
| isEnabled | №0836 (+ 1 других файлов) |
| isExpert | №0776 |
| isExtraHero | №0704 |
| isFinesse | №0776 |
| isFinger | №0065 |
| isFinite | №1362 (+ 15 других файлов) |
| isFirearm | №0827 |
| isFree | №0848 |
| isGhost | №0650 (+ 1 других файлов) |
| isGhostExtra | №0650 |
| isGhostHero | №0704 |
| isGrouped | №0795 |
| isHeavyOrExceeds | №0796 |
| isHero | №0777 |
| isHidden | №0797 |
| isInterfaceHidden | №0872 |
| isize | №0073 |
| isLandscape | №0890 |
| isLeft | №0063 |
| isMartial | №0827 |
| isMoreStep | №0819 |
| isNewClass | №0704 (+ 1 других файлов) |
| isolated | №1446 |
| isolatedFound | №1446 |
| isolatedLegacy | №1446 |
| isOverLimit | №0840 |
| isOverweight | №0796 |
| isParasite | №0650 (+ 1 других файлов) |
| isParasiteExtra | №0650 |
| isParasiteHero | №0704 |
| isPhbA | №0840 |
| isPlayingAmbience | №0086 |
| isPOT | №0077 |
| isPrepared | №0840 |
| isProf | №0628 (+ 2 других файлов) |
| isProficient | №0776 |
| isRanged | №0776 |
| isRepeatOneOn | №0086 |
| isRight | №0063 |
| isRite | №0645 |
| isRowActionProcessed | №0795 |
| isSelected | №0086 (+ 1 других файлов) |
| isShield | №0797 |
| isShuffleOn | №0086 |
| isSimple | №0827 |
| isSuccess | №0776 |
| issues | №0676 |
| isSwarm | №0650 (+ 1 других файлов) |
| isSwarmExtra | №0650 |
| isSwarmHero | №0704 |
| isWalterHero | №0704 |
| isWalterParasite | №0650 (+ 1 других файлов) |
| isWalterParasiteExtra | №0650 |
| isWalterParasiteHero | №0704 |
| it | №0669 (+ 4 других файлов) |
| item | №0066 (+ 39 других файлов) |
| itemArray | №0796 |
| itemCards | №0796 |
| itemCategory | №0797 |
| itemData | №0796 (+ 1 других файлов) |
| itemId | №0803 (+ 2 других файлов) |
| itemName | №0797 |
| itemRegistry | №0796 |
| items | №0065 (+ 13 других файлов) |
| iterations | №0824 |
| iv | №0073 (+ 3 других файлов) |
| iw | №0783 (+ 1 других файлов) |
| ix | №0062 (+ 3 других файлов) |
| j | №0062 (+ 24 других файлов) |
| J | №0065 |
| jaw | №0065 |
| jb | №1310 (+ 1 других файлов) |
| jh | №1310 (+ 1 других файлов) |
| ji | №0072 |
| jinx | №0659 |
| job | №0822 |
| joinBox | №0814 |
| jointIds | №1280 |
| joints | №0062 (+ 4 других файлов) |
| journal | №0859 (+ 1 других файлов) |
| JOURNAL | №0657 (+ 1 других файлов) |
| jp | №1310 |
| jpad | №1455 |
| JSDOM | №1319 |
| json | №0073 (+ 12 других файлов) |
| JSON | №0667 (+ 55 других файлов) |
| jsonBytes | №1304 |
| jsonBytes0 | №1304 |
| jsonPad | №1304 |
| k | №0063 (+ 112 других файлов) |
| K | №0072 (+ 1 других файлов) |
| keep | №0065 (+ 4 других файлов) |
| keepConditions | №0082 |
| keepEffects | №0082 |
| keepFaces | №0062 |
| keepResistance | №0082 |
| key | №0065 (+ 62 других файлов) |
| KEY | №0064 (+ 20 других файлов) |
| keyName | №0082 |
| keys | №0065 (+ 6 других файлов) |
| kg | №0795 |
| kgInput | №0795 |
| killer | №0787 |
| kind | №0065 (+ 20 других файлов) |
| kinds | №0822 (+ 1 других файлов) |
| kingAlly | №0823 |
| kingEnemy | №1326 |
| kingSelect | №1326 |
| knee | №0065 |
| kneeHigh | №0065 |
| kneeLine | №0065 |
| kneeLow | №0065 |
| knockout | №1345 |
| knockoutHero | №1345 |
| knockoutTarget | №1345 |
| knot | №0067 |
| known | №0082 (+ 8 других файлов) |
| KNOWN | №0832 (+ 1 других файлов) |
| knownCantrips | №0082 |
| knownFormula | №0783 |
| knownProcessed | №0677 |
| knownSpell | №1356 |
| ko | №0783 |
| koMod | №1346 |
| koRoll | №0783 |
| koTarget | №1346 |
| l | №0065 (+ 45 других файлов) |
| L | №0062 (+ 2 других файлов) |
| la | №0815 |
| label | №0067 (+ 10 других файлов) |
| labels | №0067 (+ 2 других файлов) |
| LABELS | №0875 |
| lamp | №1320 |
| landed | №1324 |
| landscape | №0890 (+ 1 других файлов) |
| langCount | №0650 |
| langs | №0832 |
| LANGS | №0832 |
| langStr | №0650 |
| langText | №0828 |
| larva | №0065 (+ 1 других файлов) |
| larvaBounds | №0067 |
| larval | №0067 |
| last | №0062 (+ 7 других файлов) |
| lastError | №0067 |
| lastFace | №1316 |
| lastResult | №0805 |
| lastRow | №1290 |
| lastTap | №0801 |
| lastVertex | №1316 |
| late | №1266 |
| latitude | №0062 |
| latitudes | №0062 |
| launchTour | №0819 |
| layer | №0065 |
| layout | №1466 (+ 1 других файлов) |
| lazarusOwner | №1265 |
| lbs | №0795 |
| le | №0869 |
| lead | №0780 (+ 1 других файлов) |
| leaf | №0067 |
| leafSize | №1312 |
| lean | №0065 |
| learned | №0674 |
| leather | №0067 |
| leatherQty | №0667 |
| leaving | №1326 |
| leavingReach | №0823 |
| left | №0066 (+ 13 других файлов) |
| leftReaction | №0659 |
| leg | №0065 (+ 1 других файлов) |
| legacy | №0827 (+ 9 других файлов) |
| legacyCount | №1505 |
| legacyCurses | №0081 |
| legacyHuman | №1267 |
| legacyPact | №0802 |
| legacyUrl | №1446 |
| legend | №0067 |
| legPhase | №0065 |
| len | №0065 (+ 12 других файлов) |
| length | №0062 (+ 2 других файлов) |
| lengths | №1315 |
| level | №0062 (+ 39 других файлов) |
| level1 | №0782 |
| levelData | №0704 (+ 1 других файлов) |
| levelDisplays | №0704 |
| levelFilter | №0840 |
| levelFour | №1265 |
| levelInput | №0835 |
| levelInputs | №0704 |
| levelOk | №0840 |
| levelReq | №0783 |
| levels | №0679 (+ 23 других файлов) |
| LEVELS | №0674 |
| levelSources | №0840 |
| levelSpells | №0840 |
| levelUp | №1291 |
| levelUpBtn | №0784 |
| levelUpSrc | №1397 |
| levelVal | №0840 |
| li | №0076 (+ 1 других файлов) |
| lie | №1344 |
| lifecycle | №0797 |
| lift | №0065 |
| light | №0077 |
| lightArmor | №0659 |
| lightFloor | №0077 |
| lightLimitKg | №0796 |
| lightLimitLb | №0796 |
| lights | №0075 |
| lim | №0822 |
| limbRanges | №0065 |
| limbSamples | №0065 |
| limbSelect | №0067 |
| limit | №0065 (+ 4 других файлов) |
| limits | №0067 |
| limitStr | №0796 |
| line | №0065 (+ 9 других файлов) |
| lineno | №0775 |
| lines | №0831 |
| lingerie | №0066 |
| lingerieAtlas | №0066 |
| link | №0801 (+ 1 других файлов) |
| linked | №1324 |
| linkedPhone | №1324 |
| links | №0062 (+ 1 других файлов) |
| lip | №0065 |
| list | №0064 (+ 41 других файлов) |
| listContainer | №0086 (+ 2 других файлов) |
| listContainers | №0793 |
| listener | №0891 |
| listeners | №0657 (+ 1 других файлов) |
| lit | №1320 |
| lItem | №0650 |
| live | №0067 (+ 6 других файлов) |
| LIVE_PROGRESSION_KEYS | №0653 |
| liveFoe | №1328 |
| liveKey | №0653 |
| livePC | №1324 |
| livePhone | №1324 |
| liveRoot | №0890 |
| liveServer | №1324 |
| liveSnake | №1324 |
| lo | №0065 (+ 7 других файлов) |
| LOAD_FILES | №0667 |
| loader | №1305 |
| lobe | №0065 |
| loc | №1266 |
| local | №0065 (+ 5 других файлов) |
| localData | №0836 |
| localId | №0657 |
| localStorage | №1308 |
| location | №0822 |
| lock | №0890 |
| locked | №0673 (+ 1 других файлов) |
| locks | №0065 (+ 1 других файлов) |
| logBox | №0775 |
| logContainer | №0776 |
| logContent | №0794 |
| logDiv | №0794 |
| logItem | №0776 |
| logLine | №0775 |
| logs | №0836 |
| logText | №0776 (+ 1 других файлов) |
| long | №0067 (+ 1 других файлов) |
| longFired | №0867 |
| longitude | №0062 |
| longTimer | №0867 |
| looksLikeModal | №0836 |
| lookup | №0065 |
| loop | №0062 |
| loot | №0631 (+ 18 других файлов) |
| LOOT_MODELS | №0810 |
| los | №0660 (+ 1 других файлов) |
| loss | №0645 (+ 1 других файлов) |
| low | №0065 (+ 6 других файлов) |
| lower | №0063 (+ 4 других файлов) |
| lowerId | №0066 |
| lowerJaw | №0065 |
| lowerLang | №0650 |
| lowerName | №0628 |
| lowerOptions | №0066 |
| lowerTool | №0650 |
| lowest | №0062 |
| loX | №0065 |
| loY | №0065 |
| lr | №0815 (+ 1 других файлов) |
| ls | №0077 (+ 2 других файлов) |
| lv | №0082 (+ 1 других файлов) |
| lvl | №0790 (+ 8 других файлов) |
| lvl1Options | №0650 |
| lvlA | №0840 |
| lvlB | №0840 |
| lvlBadge | №0840 |
| lvlDisplay | №0836 |
| lvlInput | №0836 |
| lx | №0076 |
| Lx | №0076 |
| ly | №0076 |
| Ly | №0076 |
| m | №0063 (+ 102 других файлов) |
| M | №0074 (+ 8 других файлов) |
| m0 | №1266 |
| m1 | №0678 (+ 1 других файлов) |
| m2 | №0678 |
| macro | №1504 |
| macroFile | №1504 |
| macros | №1310 (+ 2 других файлов) |
| madBomber | №0659 |
| mag | №0067 (+ 1 других файлов) |
| MAGE_CATALOG_AUDITED | №0822 |
| MAGE_HANDLERS | №0822 |
| MAGE_LEVEL2 | №0822 |
| mageActors | №0823 |
| mageApi | №0823 |
| mageBack | №1324 |
| mageBerryCount | №0823 |
| mageCon | №1324 |
| mageDarts | №0823 (+ 1 других файлов) |
| mageGround | №0823 |
| magePC | №1324 |
| magePending | №0823 |
| magePhone | №1324 |
| mageRoster | №1324 |
| mageSelect | №1326 |
| mageServer | №1324 |
| mageSpell | №0823 |
| mageStat | №0823 |
| mageTargets | №0823 |
| mageType | №0823 |
| mageWilling | №0823 |
| magic | №1397 |
| magicCases | №2329 |
| magicFistHero | №1345 |
| magicHit | №1345 |
| main | №0066 |
| mainCard | №0776 |
| mainWindow | №0890 |
| major | №1324 |
| MAJOR_ACTIONS | №0822 |
| MAJORS | №0825 |
| male | №1285 |
| malePositions | №1266 |
| maleRef | №1285 |
| malformed | №1271 (+ 3 других файлов) |
| manager | №1445 |
| manifest | №0799 (+ 4 других файлов) |
| manifestPath | №0893 (+ 1 других файлов) |
| manifestUrl | №0846 |
| manual | №1272 (+ 1 других файлов) |
| map | №0065 (+ 25 других файлов) |
| Map | №1306 (+ 5 других файлов) |
| mapPaths | №2338 |
| mapped | №0783 |
| mapping | №0065 (+ 1 других файлов) |
| maps | №0875 (+ 1 других файлов) |
| mapToVar | №0838 |
| mark | №0645 (+ 1 других файлов) |
| market | №0804 (+ 3 других файлов) |
| mask | №0063 (+ 2 других файлов) |
| MASS_HARVEST_MATERIALS | №0810 |
| master | №0669 (+ 2 других файлов) |
| mastery | №0815 |
| masteryNames | №0815 |
| mat | №0066 (+ 8 других файлов) |
| match | №0784 (+ 6 других файлов) |
| matches | №0652 (+ 2 других файлов) |
| material | №0066 (+ 2 других файлов) |
| MATERIAL_BRIDGE | №0810 |
| MATERIAL_DEFS | №0676 |
| materialCells | №0066 |
| materialIds | №0676 |
| materials | №0066 (+ 3 других файлов) |
| MATERIALS | №0671 (+ 2 других файлов) |
| math | №1291 (+ 2 других файлов) |
| Math | №1264 (+ 63 других файлов) |
| matrices | №0062 (+ 1 других файлов) |
| matrix | №0062 (+ 1 других файлов) |
| mats | №0668 (+ 6 других файлов) |
| max | №0065 (+ 37 других файлов) |
| MAX | №0807 (+ 3 других файлов) |
| MAX_CR | №0837 |
| MAX_DEPTH | №0793 |
| MAX_ERRORS | №0857 |
| MAX_FILES | №0893 |
| MAX_PLAYERS | №0814 |
| MAX_TOTAL_BYTES | №0893 |
| max2 | №0817 |
| maxAllowedLevel | №0840 |
| maxAt | №1336 |
| maxBuilder | №1291 |
| maxCapacityKg | №0796 (+ 1 других файлов) |
| maxCapacityLb | №0796 |
| maxDisplacement | №1309 |
| maxDistance | №1280 |
| maxFaces | №0062 (+ 1 других файлов) |
| maxHero | №1324 |
| maxHit | №1324 |
| maxHp | №0628 (+ 3 других файлов) |
| maxHP | №0873 |
| maximize | №0659 |
| maximum | №0659 (+ 2 других файлов) |
| maxIndex | №1316 |
| maxLevel | №0840 |
| maxOutside | №1455 |
| maxPrepared | №0840 |
| maxRestore | №0652 |
| maxRoll | №1291 |
| maxSpell | №0839 |
| maxSteps | №0660 |
| maxTargets | №1311 |
| maxTex | №0077 |
| maxUses | №0658 (+ 1 других файлов) |
| maxVal | №0840 |
| maxVertices | №0067 (+ 6 других файлов) |
| maxX | №0075 |
| maxY | №0075 |
| MC1 | №0634 |
| mctx | №1438 (+ 1 других файлов) |
| MCV2 | №0635 |
| md | №0077 (+ 2 других файлов) |
| me | №0073 (+ 1 других файлов) |
| mean | №0062 (+ 6 других файлов) |
| meanUniform | №1290 |
| mechanics | №0837 |
| MECHANICS | №0081 (+ 2 других файлов) |
| medium | №0645 |
| mediumLimitKg | №0796 |
| mediumLimitLb | №0796 |
| member | №1258 |
| members | №0822 |
| memory | №1273 |
| mental | №0788 (+ 1 других файлов) |
| menu | №0819 |
| merged | №0067 (+ 1 других файлов) |
| mesh | №0065 (+ 4 других файлов) |
| meshes | №0073 (+ 2 других файлов) |
| message | №0067 (+ 17 других файлов) |
| messages | №0078 |
| meta | №0068 (+ 7 других файлов) |
| META_COST | №0652 |
| META_NAMES | №0652 |
| METAS | №0081 |
| method | №0657 |
| mettle | №0659 |
| mh | №0065 (+ 5 других файлов) |
| mi | №0073 (+ 2 других файлов) |
| microEntry | №0067 |
| mid | №0065 (+ 1 других файлов) |
| middles | №0062 |
| migrated | №0815 |
| mimeTypes | №0890 |
| min | №0065 (+ 7 других файлов) |
| minBuilder | №1291 |
| mind | №0820 |
| minimumLevel | №0652 |
| minIndex | №1316 |
| minor | №1337 |
| MINOR_ACTIONS | №0822 |
| mins | №0872 |
| minutes | №0872 (+ 1 других файлов) |
| minutesSinceDeath | №0082 |
| minutesVal | №0872 |
| minVal | №0790 |
| minX | №0075 |
| minY | №0075 |
| miss | №1340 |
| missArena | №1345 |
| missedKnockoutHero | №1345 |
| missedKnockoutTarget | №1345 |
| misses | №1312 (+ 3 других файлов) |
| missing | №0668 (+ 10 других файлов) |
| missingReliefRoll | №1265 |
| missingTools | №0676 |
| missTarget | №1345 |
| mix | №0083 (+ 1 других файлов) |
| mixed | №1268 (+ 1 других файлов) |
| mj | №0783 |
| ml | №0065 |
| mm | №0077 (+ 2 других файлов) |
| mn | №0085 (+ 7 других файлов) |
| mo | №0077 |
| mob | №1324 |
| mobile | №1324 |
| mobileArmor | №1324 |
| mobileArmored | №1324 |
| mobileArtisan | №1324 |
| mobileBerry | №1324 |
| mobileBurden | №1324 |
| mobileDarts | №1324 |
| mobileDash | №1324 |
| mobileIllusion | №1324 |
| mobileMage | №1324 |
| mobilePoison | №1324 |
| mobileQueen | №1324 |
| mobileRange | №0077 |
| mobileSnake | №1324 |
| mobileStand | №1324 |
| mod | №0628 (+ 9 других файлов) |
| modal | №0086 (+ 13 других файлов) |
| modalColorOptions | №0872 |
| modalHTML | №0704 |
| modals | №0797 |
| modDisplay | №0776 (+ 1 других файлов) |
| mode | №0074 (+ 21 других файлов) |
| modeButtons | №0776 |
| model | №0810 (+ 2 других файлов) |
| models | №2338 |
| modeRadio | №0651 |
| modes | №1343 (+ 2 других файлов) |
| modeSelect | №0795 |
| modifier | №0658 (+ 1 других файлов) |
| modifierMatch | №0776 |
| modifiers | №1345 |
| MODIFIERS | №0678 |
| modMatches | №0840 |
| modName | №0776 |
| modNum | №0628 (+ 1 других файлов) |
| mods | №0659 (+ 5 других файлов) |
| modSourceLabel | №0776 |
| modStr | №0628 (+ 3 других файлов) |
| modTag | №0628 (+ 1 других файлов) |
| modules | №1227 (+ 37 других файлов) |
| modVal | №0776 (+ 1 других файлов) |
| monk | №1410 (+ 1 других файлов) |
| monster | №0809 (+ 2 других файлов) |
| MONSTER_RECIPES | №0810 |
| monsterCount | №0809 |
| monsterId | №0815 |
| monsterName | №0811 (+ 1 других файлов) |
| monsters | №0631 (+ 13 других файлов) |
| MONSTERS | №0659 |
| monsterSrc | №1418 |
| monstrousGrafts | №0082 |
| morph | №1312 (+ 2 других файлов) |
| morphBytes | №1304 |
| morphed | №1267 |
| morphName | №1304 |
| morphOffset | №1304 |
| morphPrimitives | №1307 (+ 1 других файлов) |
| morphTargets | №1307 |
| motion | №0067 |
| motionBack | №1324 |
| motionPC | №1324 |
| motionPhone | №1324 |
| motionRoster | №1324 |
| motionServer | №1324 |
| mouth | №0065 |
| mouthDistance | №0065 |
| mouthRadius | №0065 |
| mouthRY | №0065 |
| mouthY | №0065 |
| move | №0074 (+ 1 других файлов) |
| moved | №0867 (+ 3 других файлов) |
| moveExtraPanelsIntoDrawer | №0776 |
| moveHero | №1324 |
| moveId | №1331 |
| moveItemToContainer | №0793 |
| movement | №0078 |
| movePC | №1324 |
| movePhone | №1324 |
| moveRoster | №1324 |
| movers | №0822 |
| moveServer | №1324 |
| moving | №0065 |
| moxie | №0783 |
| moxieBeforeMiss | №1345 |
| mp | №0652 (+ 2 других файлов) |
| mr | №0652 (+ 2 других файлов) |
| mrko | №0783 |
| ms | №0073 (+ 2 других файлов) |
| msg | №0836 (+ 12 других файлов) |
| msgEl | №0796 |
| mult | №0628 (+ 4 других файлов) |
| multi2 | №0673 |
| MULTICLASS_PROFICIENCIES_2014 | №0717 |
| MULTICLASS_REQUIREMENTS | №0790 |
| MULTIPLIER | №0809 |
| multiRules | №0704 |
| mults | №0794 |
| muscle | №0065 |
| mutableHit | №1264 |
| mutableTarget | №1264 |
| mutagenAbility | №0082 |
| mutagenAlly | №1265 |
| mutagenHero | №1265 |
| mutagenist | №1265 |
| mutagenNames | №0645 |
| mutagenResult | №1265 |
| mutagens | №0645 |
| mutatedCap | №0082 |
| MUTATION_SLOTS | №0820 (+ 1 других файлов) |
| mutations | №0796 (+ 4 других файлов) |
| mutCreated | №0783 |
| muts | №0843 |
| muzzle | №0065 (+ 3 других файлов) |
| mv | №0660 |
| mw | №0065 |
| mx | №0077 (+ 6 других файлов) |
| my | №0077 (+ 1 других файлов) |
| mysteries | №0817 |
| mythic | №1354 (+ 1 других файлов) |
| n | №0063 (+ 144 других файлов) |
| N | №0062 (+ 3 других файлов) |
| n2 | №1441 |
| nailLen | №0065 |
| name | №0063 (+ 169 других файлов) |
| NAME | №0839 (+ 1 других файлов) |
| NAME_ALIASES | №0806 |
| name2 | №0783 |
| nameA | №0840 |
| nameB | №0840 |
| named | №1258 |
| nameInp | №0795 |
| nameInput | №0628 (+ 2 других файлов) |
| nameLower | №0776 |
| nameRu | №1444 |
| names | №0063 (+ 24 других файлов) |
| NAMES | №0632 (+ 12 других файлов) |
| nameSpan | №0797 (+ 1 других файлов) |
| NaN | №1354 |
| native | №0846 (+ 1 других файлов) |
| nativeBridge | №0814 |
| nativeClear | №0657 |
| nativePacketSeq | №0814 |
| nativeRemove | №0657 |
| nativeSeenSeqByPeer | №0814 |
| nativeSet | №0657 |
| nativeVersion | №0846 |
| natural | №0837 |
| naturalAttack | №1354 |
| naturalGrafts | №0082 |
| naturalTwenty | №0659 |
| nb | №0065 |
| nctx | №1437 |
| ne | №1413 (+ 7 других файлов) |
| near | №0062 (+ 2 других файлов) |
| nearest | №0660 (+ 1 других файлов) |
| nearestAt | №0065 |
| nearestDist | №0660 |
| neck | №0065 |
| neckDrop | №0066 |
| neckFront | №0066 |
| neckIndices | №0065 |
| neckMap | №0065 |
| neckNormals | №0065 |
| neckZ | №0065 |
| necromanticRevival | №0659 |
| necrotic | №0659 |
| needsSave | №0659 |
| needsSubclassChoice | №0704 |
| needsTarget | №0783 |
| net | №0777 (+ 4 других файлов) |
| neutral | №1268 (+ 2 других файлов) |
| newChar | №0628 (+ 1 других файлов) |
| newcomer | №1337 (+ 1 других файлов) |
| newCount | №0797 |
| newCp | №0794 |
| newEntry | №0800 |
| newEp | №0794 |
| newFolder | №0816 |
| newGp | №0794 |
| newId | №0628 (+ 2 других файлов) |
| newLevel | №0835 (+ 1 других файлов) |
| newLvl | №0836 |
| newMax | №0704 |
| newPeer | №1431 |
| newPp | №0794 |
| newRace | №0828 |
| newSp | №0794 |
| newSpell | №0840 |
| newTemp | №0082 |
| newTotalLevel | №0704 |
| newVal | №0628 (+ 2 других файлов) |
| newVol | №0086 |
| next | №0062 (+ 18 других файлов) |
| nextHp | №0082 |
| nextLevel | №0704 |
| nextLevelExpReq | №0784 |
| nextRemaining | №0082 |
| nf | №0077 |
| ng | №1432 (+ 2 других файлов) |
| ni | №0065 (+ 2 других файлов) |
| nk | №0065 (+ 1 других файлов) |
| nl | №0065 |
| nm | №0869 |
| nn | №1312 (+ 3 других файлов) |
| nnx | №0065 |
| nnz | №0065 |
| no | №1360 |
| noChoice | №1265 |
| noClaws | №1286 |
| node | №0836 (+ 5 других файлов) |
| nodes | №0063 (+ 8 других файлов) |
| NODES | №0882 |
| noEars | №1288 |
| noGlow | №1468 |
| none | №0067 (+ 2 других файлов) |
| nonmagicalResistance | №0659 |
| nonmagicalVariants | №0659 |
| nonZero | №1312 (+ 2 других файлов) |
| nonzeroSource | №1315 |
| noRefill | №1324 |
| noReliefTarget | №1265 |
| noRiteDice | №1351 |
| norm | №0062 (+ 2 других файлов) |
| normal | №0065 (+ 5 других файлов) |
| normalAC | №0659 |
| normalizeClassKey | №0704 |
| normalized | №0717 (+ 3 других файлов) |
| normalizedCondition | №0659 |
| normalizedCurrentClass | №0704 |
| normalizedRequested | №0704 |
| normalizeLevelUpClassName | №0704 |
| normalizeYield | №0830 |
| normalRaceLabel | №0650 |
| normals | №0062 (+ 1 других файлов) |
| nose | №0065 |
| noseDepth | №0065 |
| nosePart | №0065 |
| noseTop | №0065 |
| noseWidth | №0065 |
| noseY | №0065 |
| noseZ | №0065 |
| nostril | №0065 |
| nostrils | №0065 |
| note | №0659 (+ 2 других файлов) |
| now | №0065 (+ 5 других файлов) |
| np | №0065 |
| npot | №0077 |
| null | №0836 (+ 16 других файлов) |
| num | №0790 (+ 1 других файлов) |
| Number | №0667 (+ 25 других файлов) |
| numbers | №0066 |
| nums | №0815 |
| nw | №0783 |
| nx | №0065 (+ 1 других файлов) |
| ny | №0062 (+ 1 других файлов) |
| nylon | №0067 |
| nz | №0062 (+ 2 других файлов) |
| o | №0063 (+ 52 других файлов) |
| oa | №0783 |
| obj | №0075 (+ 5 других файлов) |
| Object | №0667 (+ 23 других файлов) |
| objectBomber | №1264 |
| objectId | №0652 (+ 2 других файлов) |
| objectIds | №0832 |
| objPath | №1304 (+ 6 других файлов) |
| objs | №0076 |
| observer | №0796 (+ 3 других файлов) |
| observerTarget | №0796 |
| oc | №1415 |
| oc2 | №1415 |
| occultIds | №1353 |
| occultistPack | №0783 |
| occupied | №0834 |
| od | №0815 |
| odd | №0822 |
| odds | №0823 (+ 4 других файлов) |
| odr | №0815 |
| off | №0067 (+ 6 других файлов) |
| offer | №0805 (+ 3 других файлов) |
| offered | №0806 |
| offers | №0805 (+ 1 других файлов) |
| offHoof | №1286 |
| offset | №0065 (+ 7 других файлов) |
| oh | №0076 (+ 1 других файлов) |
| oi | №0076 (+ 2 других файлов) |
| oid | №0783 |
| oilDamage | №0659 |
| ok | №0076 (+ 10 других файлов) |
| ol | №0077 |
| old | №0069 (+ 47 других файлов) |
| oldAngle | №0069 |
| oldBin | №1304 |
| oldBuffer | №1266 |
| oldChar | №1431 |
| oldCharacter | №1431 |
| oldCombatForDemolition | №1265 |
| oldData | №0836 |
| oldDrawer | №0776 |
| oldEffects | №0082 |
| oldHead | №1267 |
| oldHost | №0776 |
| oldHp | №0082 |
| oldId | №0659 (+ 1 других файлов) |
| oldInitRender | №0831 |
| oldLength | №0062 |
| oldLevel | №0674 |
| oldMax | №0081 (+ 1 других файлов) |
| oldNet | №1431 |
| oldPact | №0831 |
| oldPeer | №0815 |
| oldRAF | №1458 (+ 18 других файлов) |
| oldRandom | №0667 (+ 1 других файлов) |
| oldRandomForBurn | №1264 |
| oldRandomMutable | №1264 |
| oldRandomObject | №1264 |
| oldRandomPoison | №1264 |
| oldRandomSlime | №1264 |
| oldRenderDndTools | №0831 |
| oldRoll | №1422 |
| oldSelect | №0795 |
| oldTemp | №0082 |
| oldTotal | №0704 |
| on | №0067 (+ 6 других файлов) |
| onchange | №0823 |
| one | №1339 |
| oneTwoTarget | №0783 |
| onPhone | №1324 |
| onProgress | №0846 |
| oozeRancher | №0659 |
| oozeRancherAcidResistance | №0659 |
| oozeTarget | №1264 |
| op | №0067 (+ 2 других файлов) |
| opacity | №0872 (+ 1 других файлов) |
| opacityVal | №0872 |
| open | №0652 (+ 2 других файлов) |
| openedHero | №0823 |
| opening | №0776 |
| openPanels | №1288 |
| openSet | №0800 |
| openSky | №0822 |
| operation | №1258 |
| operationId | №0825 |
| opportunityAttacker | №0823 |
| opt | №0067 (+ 4 других файлов) |
| option | №0067 |
| options | №0065 (+ 22 других файлов) |
| opts | №0084 (+ 29 других файлов) |
| optsHtml | №0650 |
| orbit | №0065 |
| orc | №1417 |
| order | №0062 (+ 4 других файлов) |
| orderCtx | №1356 |
| origin | №0067 (+ 2 других файлов) |
| original | №0062 (+ 18 других файлов) |
| originalAppearance | №0082 |
| originalAttack | №0670 |
| originalBody | №1267 |
| originalCalculateMods | №0840 |
| originalContext | №1266 |
| originalCraft | №0670 (+ 1 других файлов) |
| originalCrypto | №1326 |
| originalDamage | №0670 |
| originalEnemyHp | №1326 |
| originalError | №0775 |
| originalHealingTarget | №0659 |
| originalIndex | №0797 |
| originalIndices | №1284 |
| originalLog | №0775 |
| originalOpenCharacter | №0840 |
| originalPhysical | №0837 |
| originalRepair | №0670 |
| originalUI | №1446 |
| originalUiCraft | №0670 |
| originLabel | №0067 |
| orphan | №0793 |
| os | №1263 (+ 5 других файлов) |
| ot | №0660 (+ 1 других файлов) |
| other | №0797 (+ 8 других файлов) |
| otherCat | №0797 |
| otherIndex | №0797 |
| otherIsShield | №0797 |
| otherName | №0797 |
| ott | №0783 |
| out | №0063 (+ 73 других файлов) |
| outcome | №0822 (+ 2 других файлов) |
| outer | №0062 (+ 2 других файлов) |
| outerWidth | №0062 |
| outPath | №1304 |
| output | №0067 (+ 3 других файлов) |
| outputId | №0677 (+ 1 других файлов) |
| outputName | №0677 (+ 1 других файлов) |
| outside | №0066 (+ 1 других файлов) |
| outsideBary | №1315 |
| overheated | №0082 |
| overheatedTarget | №1265 |
| overlay | №0801 (+ 3 других файлов) |
| overload | №1265 |
| overloadBefore | №1265 |
| overloadBomber | №1265 |
| overloadCost | №0082 |
| overrides | №0661 |
| ow | №0076 |
| own | №0660 (+ 1 других файлов) |
| owned | №0675 (+ 2 других файлов) |
| owner | №0067 (+ 11 других файлов) |
| ownerActor | №0660 |
| ownerBombHit | №1264 |
| ownerClass | №0082 |
| ownerCopy | №0825 |
| ownerId | №0834 |
| ownId | №1258 |
| ox | №0072 (+ 2 других файлов) |
| oy | №0072 (+ 2 других файлов) |
| oz | №0072 (+ 1 других файлов) |
| p | №0063 (+ 164 других файлов) |
| P | №0073 (+ 2 других файлов) |
| p0 | №0065 |
| p1 | №0065 |
| pa | №0659 |
| pack | №0074 (+ 22 других файлов) |
| PACK_ID | №0082 (+ 2 других файлов) |
| PACK_MANIFEST | №0666 |
| packId | №0665 |
| packName | №0665 |
| packs | №0780 (+ 1 других файлов) |
| pact | №0652 (+ 4 других файлов) |
| PACT | №0802 |
| PACT_SLOTS | №0831 |
| pactBoxes | №0840 |
| pactLevel | №0831 |
| pactSlots | №0783 |
| pactState | №0831 |
| pad | №0065 |
| pads | №0065 |
| page | №0657 (+ 38 других файлов) |
| paid | №0807 (+ 1 других файлов) |
| paintAttack | №1265 |
| painter | №1265 |
| pair | №0062 (+ 2 других файлов) |
| pal | №1415 (+ 2 других файлов) |
| palette | №0066 (+ 1 других файлов) |
| palettes | №0067 |
| palm | №0065 |
| panel | №0066 (+ 6 других файлов) |
| panelHost | №0831 |
| panelsHidden | №0074 |
| panX | №0867 |
| panY | №0867 |
| parasiteHostTarget | №0650 |
| parent | №0072 (+ 3 других файлов) |
| parentArea | №0797 |
| parentId | №0843 |
| parsed | №0836 (+ 3 других файлов) |
| parsedHtml | №0776 |
| parsedSides | №0776 |
| parseFloat | №1264 (+ 15 других файлов) |
| parseInt | №1264 (+ 13 других файлов) |
| part | №0063 (+ 16 других файлов) |
| partner | №0822 |
| partnerSnapshot | №0822 |
| parts | №0065 (+ 29 других файлов) |
| partySize | №0809 |
| pass | №0062 (+ 3 других файлов) |
| passed | №1296 (+ 2 других файлов) |
| passInsight | №0628 (+ 1 других файлов) |
| passInvestigation | №0628 (+ 1 других файлов) |
| passive | №0783 (+ 2 других файлов) |
| passiveFeatures | №0082 |
| passPerception | №0628 (+ 1 других файлов) |
| password | №0655 (+ 1 других файлов) |
| pat | №0076 |
| patch | №0065 (+ 5 других файлов) |
| patchLootResult | №0830 |
| path | №0065 (+ 116 других файлов) |
| paths | №1300 |
| patient | №0082 (+ 1 других файлов) |
| patronNames | №0645 |
| patrons | №0645 (+ 1 других файлов) |
| paw | №0065 |
| payload | №0087 (+ 11 других файлов) |
| pb | №0081 (+ 7 других файлов) |
| PB | №0081 (+ 10 других файлов) |
| pbBreath | №0082 |
| pc | №0783 (+ 4 других файлов) |
| pcRoster | №1324 |
| pct | №0847 (+ 1 других файлов) |
| pd | №0882 |
| peace | №1324 |
| peacePhone | №1324 |
| peak | №1345 |
| peer | №0815 (+ 2 других файлов) |
| peerId | №0815 |
| peers | №0814 (+ 3 других файлов) |
| pelvisNode | №0062 |
| penalizedAttack | №1264 |
| penalizedSave | №1264 |
| penalty | №0645 |
| pending | №0068 (+ 14 других файлов) |
| pendingBloodAttack | №0659 |
| pendingBomb | №0082 |
| pendingContext | №0629 |
| pendingFeature | №0629 |
| pendingLevelUpData | №0704 |
| pendingReactions | №0815 |
| pendingSavantAttack | №0659 |
| pendingTargetId | №0629 |
| percent | №0067 (+ 2 других файлов) |
| perfumeAttack | №1264 |
| perfumeAttacker | №1264 |
| perfumeClass | №0659 |
| perfumeDC | №0659 |
| perfumeHero | №0659 |
| perfumeOwner | №1264 |
| perfumeOwnerState | №0659 |
| perfumeRound | №0659 |
| perfumeSave | №0659 |
| perfumeSource | №0659 |
| perfumeSourceClass | №0659 |
| perfumeState | №0659 |
| perfumeTargetId | №0659 |
| permission | №0890 |
| perms | №1318 |
| pev | №0815 |
| pf | №0837 |
| PGlite | №1258 |
| ph | №1420 |
| PH | №0076 |
| phase | №0065 (+ 1 других файлов) |
| phases | №1364 |
| pher | №0659 |
| pherDebuffs | №0082 |
| pheromone | №1264 (+ 1 других файлов) |
| pheromoneOwner | №1264 |
| pheromoneSave | №0082 |
| pheromoneTarget | №1264 (+ 1 других файлов) |
| phi | №0062 (+ 2 других файлов) |
| phone | №1296 (+ 2 других файлов) |
| phoneProtected | №1324 |
| phoneTraveller | №1324 |
| physical | №0659 (+ 1 других файлов) |
| physicalKey | №0837 |
| pi | №0072 (+ 5 других файлов) |
| pick | №0065 (+ 9 других файлов) |
| picked | №0645 (+ 1 других файлов) |
| picker | №0067 |
| picks | №0082 |
| pid | №0674 (+ 1 других файлов) |
| pigmentClass | №0082 |
| pigmentist | №1265 |
| pinch | №0867 |
| pink | №0065 |
| PINNED_COMMIT | №1504 |
| pInput | №0794 |
| pipe | №1268 (+ 20 других файлов) |
| pitch | №0067 (+ 3 других файлов) |
| pivot | №0062 |
| pixel | №1476 |
| pixels | №1458 (+ 19 других файлов) |
| pl | №0697 (+ 2 других файлов) |
| plan | №0669 (+ 4 других файлов) |
| plane | №0065 (+ 1 других файлов) |
| PLANES | №0636 |
| plannedMove | №0815 |
| plates | №0065 |
| playable | №0825 |
| playBtn | №0086 |
| played | №1324 |
| plumage | №0065 |
| plume | №0065 |
| plus | №0062 (+ 1 других файлов) |
| pn | №0065 |
| po | №0783 |
| point | №0065 (+ 2 других файлов) |
| pointCostDiff | №0628 (+ 1 других файлов) |
| pointers | №0867 |
| points | №0065 (+ 10 других файлов) |
| pointsLeftEl | №0628 (+ 1 других файлов) |
| poisonBomb | №1265 |
| poisonedAttacker | №1264 |
| poisonedCombatant | №1264 |
| poisonedStrike | №1264 |
| poisonedWeaponAttack | №1265 |
| poisonImmuneTarget | №1264 |
| poisonPreview | №1264 |
| poisonWeapon | №0082 |
| poisonWeaponId | №0082 |
| pole | №0062 |
| policy | №0676 |
| poly | №0065 (+ 1 других файлов) |
| polygon | №0065 |
| pool | №0082 (+ 5 других файлов) |
| poolKind | №0082 |
| pools | №0083 |
| portraitBounds | №0890 |
| pos | №0062 (+ 10 других файлов) |
| pose | №0065 |
| posed | №0069 |
| poses | №0069 |
| position | №0822 |
| positionCounts | №1316 |
| positions | №0062 (+ 5 других файлов) |
| possibleIdElements | №0796 |
| potency | №0083 (+ 1 других файлов) |
| potential | №0065 |
| potion | №0082 (+ 2 других файлов) |
| potionColor | №0082 |
| potionIndex | №1360 |
| potions | №0082 |
| pounds | №0822 |
| power | №0065 (+ 1 других файлов) |
| pp | №0085 (+ 4 других файлов) |
| pPerG | №0794 |
| ppInput | №0794 |
| ppVal | №0794 |
| pr | №0645 (+ 2 других файлов) |
| pre | №0081 |
| predicate | №0065 |
| predict | №1290 |
| predictorTrump | №0659 |
| preFeatSelect | №0704 |
| preferPact | №0652 |
| prefix | №0793 (+ 3 других файлов) |
| preloadPath | №1505 |
| prep | №1415 |
| PREP | №0807 (+ 1 других файлов) |
| prepared | №0645 (+ 3 других файлов) |
| preparedAny | №0815 |
| preparedCount | №0840 |
| preparedFormula | №0082 |
| preparedReaction | №0815 |
| preparedReservation | №0815 |
| prepProfile | №0840 |
| prereq | №0848 |
| preS | №0704 |
| preS1 | №0704 |
| preS2 | №0704 |
| preset | №0066 (+ 3 других файлов) |
| presets | №0070 (+ 1 других файлов) |
| preStats | №0704 |
| prev | №0062 (+ 2 других файлов) |
| preview | №0797 (+ 2 других файлов) |
| previous | №0062 (+ 11 других файлов) |
| previousAC | №0833 |
| previousActive | №0777 |
| previousCount | №1281 |
| previousFetch | №1300 (+ 1 других файлов) |
| previousMageCrypto | №1326 |
| previousRoot | №0777 |
| price | №0671 (+ 1 других файлов) |
| prim | №1304 |
| primary | №0085 (+ 1 других файлов) |
| primaryStat | №0697 |
| prime | №0783 |
| prior | №1349 (+ 2 других файлов) |
| prismaticIndex | №0082 |
| prismaticOptions | №0082 |
| prismAttack | №1265 |
| prismTester | №1265 |
| probe | №0065 (+ 1 других файлов) |
| proceed | №0704 |
| process | №1434 (+ 2 других файлов) |
| processedNames | №0830 |
| processing | №0667 (+ 1 других файлов) |
| PROCESSING | №0676 |
| PROCESSING_DC_BY_RARITY | №0830 |
| PROCESSING_RECIPES | №0677 |
| PROCESSING_TOOL_BY_TYPE | №0830 |
| product | №0084 |
| prof | №0797 (+ 8 других файлов) |
| profBlock | №0749 |
| profBonus | №0628 (+ 4 других файлов) |
| profession | №0677 (+ 2 других файлов) |
| professionBonus | №0084 |
| professionId | №0674 |
| professionLayer | №0676 |
| professions | №0677 (+ 1 других файлов) |
| PROFESSIONS | №0674 (+ 2 других файлов) |
| PROFICIENCIES_DB | №0826 |
| proficiencyBonus | №0776 |
| proficiencyChoiceHtml | №0704 |
| proficiencyType | №0797 |
| proficient | №0659 (+ 2 других файлов) |
| profId | №0826 (+ 1 других файлов) |
| profIds | №0827 |
| profile | №0062 (+ 11 других файлов) |
| profiles | №0066 (+ 6 других файлов) |
| profInput | №0840 |
| profName | №0827 (+ 1 других файлов) |
| profObj | №0827 (+ 1 других файлов) |
| profOk | №0882 |
| profs | №0797 (+ 3 других файлов) |
| prog | №0077 (+ 4 других файлов) |
| progress | №0823 (+ 1 других файлов) |
| progressFrame | №0847 |
| progressHandler | №0846 |
| progression | №0081 (+ 11 других файлов) |
| progressPercent | №0784 |
| projected | №0793 (+ 1 других файлов) |
| projection | №0065 |
| projectManifest | №0857 |
| Promise | №1305 (+ 2 других файлов) |
| prompts | №1350 |
| prop | №0082 (+ 2 других файлов) |
| propContainer | №0795 |
| PROPERTIES | №0083 |
| proportions | №1504 |
| props | №0066 (+ 1 других файлов) |
| propTitle | №0795 |
| protectedCase | №1263 |
| protectedHero | №1324 |
| protectedKeys | №0836 |
| proto | №0657 |
| protocol | №0890 |
| proxy | №0815 (+ 1 других файлов) |
| ps | №0073 (+ 2 других файлов) |
| psiLimit | №0718 |
| psion | №1420 |
| psionDisciplines | №0783 |
| pt | №0645 |
| pu | №1420 |
| pugilist | №1346 |
| pugilistAC | №0659 |
| pugilistDefender | №0659 |
| pugilistDigDeepResistant | №0659 |
| pugilistLevelEntry | №0659 |
| pugilistPack | №0659 |
| pugilistSchool | №0659 |
| pugilistState | №0659 |
| pugilistStudy | №0659 |
| pupilDiagnostics | №1468 |
| pupilRound | №1468 |
| pupilSelect | №0067 |
| puppet | №1350 |
| puppetTarget | №0645 |
| puppetWeapon | №0645 |
| purity | №0083 (+ 1 других файлов) |
| pursuits | №0833 |
| pw | №1504 |
| PW | №0076 |
| px | №0065 (+ 2 других файлов) |
| PX | №0076 |
| py | №0067 (+ 1 других файлов) |
| PY | №0076 |
| pz | №0067 |
| q | №0062 (+ 37 других файлов) |
| Q | №0062 |
| q0 | №0065 |
| q1 | №0065 |
| qApi | №0797 |
| qd | №0678 |
| qi | №0787 |
| ql | №0062 |
| qn | №0069 |
| qr | №0783 |
| qs | №1324 |
| qty | №0668 (+ 1 других файлов) |
| quality | №0067 (+ 6 других файлов) |
| QUALITY | №0671 (+ 2 других файлов) |
| QUALITY_GRADES | №0668 |
| QUALITY_TIERS | №0669 |
| qualityFactor | №0668 |
| qualityKey | №0812 |
| qualityPenalty | №0668 |
| quantity | №0796 (+ 2 других файлов) |
| queen | №1324 |
| queenReceipt | №1324 |
| query | №0074 (+ 1 других файлов) |
| queue | №0822 (+ 1 других файлов) |
| queued | №0660 |
| quickGather | №0829 |
| quota | №0063 (+ 1 других файлов) |
| r | №0063 (+ 205 других файлов) |
| R | №0065 (+ 11 других файлов) |
| r0 | №0065 |
| r1 | №0065 (+ 2 других файлов) |
| r2 | №0776 (+ 1 других файлов) |
| race | №0067 (+ 11 других файлов) |
| raceDesc | №0650 |
| raceEntry | №0067 |
| raceId | №0070 (+ 7 других файлов) |
| raceImmune | №0659 |
| raceLabel | №0650 |
| raceList | №0676 |
| raceName | №0628 (+ 1 других файлов) |
| raceObj | №0828 |
| raceResistant | №0659 |
| races | №0070 (+ 3 других файлов) |
| raceSelect | №0628 (+ 2 других файлов) |
| rad | №0065 (+ 1 других файлов) |
| radial | №0065 |
| radii | №0065 |
| radius | №0062 (+ 5 других файлов) |
| raf | №0630 |
| raging | №0659 |
| raise | №0065 |
| rampage | №0660 |
| randIdx | №0086 |
| random | №1291 |
| randomSequence | №1345 |
| randomValue | №1345 |
| randomXOffset | №0776 |
| randomYOffset | №0776 |
| range | №0645 (+ 6 других файлов) |
| rangedIncoming | №0659 |
| rangeFt | №0815 |
| ranger | №1417 |
| rangeU | №1285 |
| rangeV | №1285 |
| rank | №0659 (+ 2 других файлов) |
| RANKS | №0825 |
| raphe | №0062 |
| rare | №0812 |
| rarity | №0671 (+ 4 других файлов) |
| RARITY | №0803 |
| RARITY_WEIGHT | №0882 |
| rarityOrder | №0797 |
| rate | №0065 (+ 1 других файлов) |
| ratio | №0077 (+ 3 других файлов) |
| rats | №0065 |
| raw | №0064 (+ 32 других файлов) |
| rawCat | №0806 |
| rawDestination | №2338 |
| rawItems | №0840 |
| rawParts | №0659 |
| rawRadial | №0066 |
| rawStats | №0797 |
| rawTotal | №0659 |
| rb | №0803 (+ 1 других файлов) |
| rBottom | №0067 |
| rd | №0783 (+ 1 других файлов) |
| rd0 | №0817 |
| re | №0817 (+ 1 других файлов) |
| reach | №0065 |
| reacted | №1324 |
| reaction | №0659 (+ 5 других файлов) |
| reactionButton | №1413 |
| reactionCtx | №0659 (+ 1 других файлов) |
| reactionReduction | №0659 |
| reactionResult | №0659 |
| reactions | №0815 |
| REACTIONS | №0833 |
| read | №0822 (+ 1 других файлов) |
| Readable | №0890 |
| reader | №0836 (+ 2 других файлов) |
| readGlb | №1268 (+ 5 других файлов) |
| readIndex | №1313 (+ 1 других файлов) |
| ready | №0822 (+ 3 других файлов) |
| reagentCount | №0082 |
| reagentGain | №0082 |
| reagentRoll | №0082 |
| reagentsBefore | №1265 |
| reagentTarget | №1265 |
| real | №1505 |
| realAttack | №1332 |
| realCrypto | №1326 |
| realSave | №1338 |
| realSet | №1296 |
| rear | №0065 |
| reason | №0670 (+ 7 других файлов) |
| rebuildMaterialUsage | №0676 |
| rec | №0749 (+ 4 других файлов) |
| receipt | №0078 (+ 1 других файлов) |
| receiptKey | №1296 |
| received | №0806 (+ 2 других файлов) |
| recharge | №0082 (+ 11 других файлов) |
| recipe | №0082 (+ 7 других файлов) |
| recipeId | №0672 |
| recipes | №0671 |
| RECIPES | №0672 (+ 2 других файлов) |
| recipient | №0645 (+ 1 других файлов) |
| record | №0064 (+ 1 других файлов) |
| recorded | №0822 |
| records | №0065 (+ 3 других файлов) |
| recovered | №0669 (+ 1 других файлов) |
| RECOVERY_BY_DURABILITY | №0668 |
| RECOVERY_BY_QUALITY | №0669 |
| red | №0652 |
| reduce | №0875 |
| reduced | №0645 |
| reduction | №0652 |
| ref | №0065 (+ 26 других файлов) |
| reference | №0065 (+ 1 других файлов) |
| referenceNode | №0794 |
| refresh | №0678 |
| refreshBase | №0678 |
| refreshing | №0657 |
| refs | №0084 (+ 3 других файлов) |
| refunded | №0815 |
| reg | №1414 |
| regeneration | №1265 |
| RegExp | №0667 (+ 6 других файлов) |
| region | №0067 (+ 2 других файлов) |
| REGION_MOD | №0803 |
| regionId | №0882 |
| regions | №0063 (+ 4 других файлов) |
| REGIONS | №0882 |
| registered | №1264 (+ 8 других файлов) |
| registry | №0062 (+ 3 других файлов) |
| reject | №0836 (+ 6 других файлов) |
| rejected | №1301 (+ 1 других файлов) |
| rel | №0805 (+ 6 других файлов) |
| relative | №0890 (+ 2 других файлов) |
| release | №1296 |
| releaseGate | №1262 |
| relief | №0082 |
| reliefCount | №0065 |
| reliefResult | №1265 |
| reliefTarget | №1265 |
| reloaded | №1332 |
| relocateGameplayPanels | №0776 |
| rem | №0794 |
| remaining | №0082 (+ 5 других файлов) |
| remainingReduction | №0659 |
| remote | №0655 (+ 2 других файлов) |
| remoteHead | №1263 |
| remoteStatus | №1324 |
| remove | №0067 |
| removeAt | №0082 |
| removed | №0062 (+ 5 других файлов) |
| removedGraft | №0082 |
| removeFromContainer | №0793 |
| render | №0083 (+ 7 других файлов) |
| renderList | №0672 (+ 1 других файлов) |
| renderRecipes | №0676 |
| renderTabs | №0675 |
| renderTools | №0676 |
| rep | №0065 |
| repair | №1298 |
| REPAIR_COST_PER_10 | №0668 |
| REPAIR_PROFILES | №0669 |
| repairBtn | №0797 |
| repairCount | №0668 |
| repaired | №1297 |
| repairPlan | №1297 |
| repCfg | №0065 |
| repeatBtn | №0086 |
| replace | №0645 (+ 1 других файлов) |
| replacement | №1326 |
| repo | №2338 |
| report | №0797 (+ 10 других файлов) |
| repSelect | №0067 |
| reptileCoreCache | №0065 |
| reptilePart | №0067 |
| req | №0652 (+ 52 других файлов) |
| reqHtml | №0749 |
| reqR | №0783 |
| reqs | №0790 |
| reqText | №0674 (+ 1 других файлов) |
| request | №0890 (+ 2 других файлов) |
| requested | №0652 (+ 3 других файлов) |
| requestedAoe | №0815 |
| requestedFeature | №0082 |
| requestedForm | №0783 |
| requestId | №0815 |
| requests | №1349 |
| require | №1434 (+ 1 других файлов) |
| required | №0674 (+ 1 других файлов) |
| requiredEnd | №1318 |
| requiredLevel | №0082 (+ 1 других файлов) |
| requireLevel | №0783 |
| requirements | №2329 |
| requireTool | №0674 |
| reroll | №0652 (+ 3 других файлов) |
| res | №0652 (+ 45 других файлов) |
| resBox | №0651 (+ 2 других файлов) |
| resDiv | №0795 |
| reservation | №0839 |
| reserved | №0815 |
| reset | №0067 (+ 2 других файлов) |
| resetBuffer | №1266 |
| resist | №0854 |
| resistance | №0082 (+ 1 других файлов) |
| resistanceType | №0082 |
| resistanceTypes | №0082 |
| resistant | №0659 |
| resistantFire | №1264 |
| resistantTarget | №1345 |
| resisted | №1345 |
| resMap | №0652 |
| resolve | №0836 (+ 8 других файлов) |
| resolved | №0072 (+ 1 других файлов) |
| resolvedParts | №0659 |
| resource | №0787 (+ 2 других файлов) |
| RESOURCE_HINTS | №0829 |
| RESOURCE_PROCESSING | №0830 |
| RESOURCE_YIELDS | №0830 |
| resourceBefore | №1345 |
| resourceDefs | №0831 |
| resourceId | №0829 |
| resourceKind | №0815 |
| resources | №0882 (+ 1 других файлов) |
| response | №0846 (+ 3 других файлов) |
| responses | №1295 (+ 1 других файлов) |
| rest | №0783 (+ 2 других файлов) |
| restarted | №1296 |
| rested | №1336 |
| restId | №0825 (+ 1 других файлов) |
| restored | №0652 (+ 13 других файлов) |
| restoredShort | №0651 |
| restoredUse | №1265 |
| restoreFullCheckbox | №0704 |
| restoreUsed | №0082 |
| restStr | №0840 |
| result | №0065 (+ 64 других файлов) |
| resultPending | №0815 |
| results | №0069 (+ 10 других файлов) |
| resultText | №0651 (+ 1 других файлов) |
| resume | №0815 (+ 1 других файлов) |
| resumed | №0822 (+ 1 других файлов) |
| resumedStand | №1324 |
| resumeSpell | №0815 |
| retries | №0825 |
| retry | №0847 |
| returned | №1324 |
| returnedDash | №1324 |
| reused | №0893 |
| rev | №0815 |
| reveal | №0823 |
| reverse | №0066 |
| revision | №0657 (+ 2 других файлов) |
| revival | №1264 |
| revived | №1265 |
| revivedFromZero | №0659 |
| reward | №0674 (+ 4 других файлов) |
| rewardId | №0825 |
| rewards | №0674 |
| rewardX | №0823 |
| rewardY | №0823 |
| rgb | №0067 |
| rht | №0783 |
| ri | №1314 |
| rid | №0875 (+ 2 других файлов) |
| rider | №0842 |
| ridge | №1288 |
| RIDGE_STYLES | №0070 |
| ridges | №0065 |
| ridgeSelect | №0067 |
| ridgeStyle | №1495 |
| right | №0065 (+ 4 других файлов) |
| rigid | №1270 |
| ring | №0062 (+ 1 других файлов) |
| ringCount | №0062 |
| rings | №0066 |
| rise | №0066 (+ 2 других файлов) |
| risk | №0083 (+ 1 других файлов) |
| rite | №0645 (+ 2 других файлов) |
| riteId | №0783 |
| riteKnown | №0817 |
| riteMax | №0783 |
| riteNames | №0645 |
| rites | №0783 (+ 1 других файлов) |
| riteTypes | №0645 |
| rl | №0065 |
| rm | №0659 (+ 1 других файлов) |
| rn | №0817 |
| rn0 | №0817 |
| rn2 | №0817 |
| ro | №1410 |
| robe | №0065 |
| rock | №0067 |
| rogue | №1333 (+ 3 других файлов) |
| role | №0065 (+ 3 других файлов) |
| roleName | №0633 |
| roles | №0677 |
| roll | №0078 (+ 18 других файлов) |
| rolled | №0082 (+ 7 других файлов) |
| rolledRelief | №1265 |
| roller | №0809 (+ 1 других файлов) |
| rollMode | №0651 |
| rollResult | №1345 |
| rolls | №0651 (+ 9 других файлов) |
| rollTypeClass | №0776 (+ 1 других файлов) |
| roofColor | №0067 |
| room | №0820 |
| root | №0065 (+ 102 других файлов) |
| ROOT | №0667 (+ 10 других файлов) |
| rootId | №0857 (+ 1 других файлов) |
| roots | №0065 (+ 4 других файлов) |
| rootSurface | №0062 |
| rootT | №0065 |
| rootY | №0065 |
| rootZ | №0065 |
| roster | №0655 (+ 1 других файлов) |
| rotation | №0067 |
| rough | №0824 (+ 1 других файлов) |
| round | №0809 (+ 1 других файлов) |
| round4 | №1504 |
| rounds | №0837 |
| roundTracker | №0659 |
| roundTrip | №1267 |
| route | №1466 (+ 1 других файлов) |
| routed | №0652 |
| row | №0065 (+ 12 других файлов) |
| rows | №0065 (+ 11 других файлов) |
| ROWS | №0632 |
| rp | №1360 |
| rq | №1411 (+ 1 других файлов) |
| rr | №0065 (+ 8 других файлов) |
| rs | №0645 (+ 2 других файлов) |
| rt | №0652 (+ 1 других файлов) |
| rTop | №0067 |
| rule | №0067 (+ 11 других файлов) |
| rules | №0704 (+ 7 других файлов) |
| RULES | №0825 |
| run | №0077 (+ 2 других файлов) |
| ruName | №0704 (+ 1 других файлов) |
| rune | №0783 (+ 1 других файлов) |
| RUNEKEEPER_INSCRIBED | №0783 |
| runesBefore | №1355 |
| running | №0657 |
| runtime | №0807 (+ 33 других файлов) |
| runtimeFeatures | №0817 |
| runtimes | №0652 |
| runtimeSubclasses | №0817 |
| rw | №1504 |
| rx | №0065 (+ 4 других файлов) |
| rx2 | №0815 |
| ry | №0065 (+ 3 других файлов) |
| rz | №0065 (+ 3 других файлов) |
| rz2 | №0077 |
| s | №0062 (+ 175 других файлов) |
| S | №0076 (+ 1 других файлов) |
| s1 | №0704 |
| s2 | №0704 |
| sa | №0065 |
| safe | №0087 (+ 1 других файлов) |
| SAFE_FILE | №0893 |
| safeFeatureId | №0652 |
| safeGet | №0795 |
| safeName | №0658 |
| safeText | №0776 |
| salty | №1345 |
| saltyDC | №0783 |
| saltyEffect | №0652 |
| saltyHero | №1345 |
| saltyMods | №1345 |
| saltySave | №0783 |
| saltyTarget | №1345 |
| sam | №0072 |
| same | №0669 (+ 8 других файлов) |
| sample | №0065 (+ 4 других файлов) |
| sampleCount | №1318 |
| sampler | №0067 (+ 2 других файлов) |
| samples | №0065 (+ 1 других файлов) |
| sandbox | №1395 (+ 6 других файлов) |
| satin | №0067 |
| savage | №0783 |
| savantFlourish | №0659 |
| savantHP | №1355 |
| save | №0078 (+ 12 других файлов) |
| saveAdv | №0659 |
| saved | №0087 (+ 50 других файлов) |
| savedAlpha | №0836 |
| savedBg | №0872 |
| saveDC | №0645 |
| savedColor | №0872 |
| savedDim | №0872 |
| saveDebuffs | №0659 |
| savedFont | №0836 |
| savedHeritage | №1468 |
| saveDis | №0659 |
| savedOpacity | №0872 |
| savedRetreat | №1324 |
| savedSmall | №1468 |
| savedSurface | №1468 |
| savedTarget | №1352 |
| savedTheme | №0836 |
| savedWander | №1324 |
| saveResult | №0659 |
| saveRoll | №0788 (+ 2 других файлов) |
| saves | №0697 (+ 3 других файлов) |
| savesBeforeRefresh | №1326 |
| saveStat | №0783 |
| sb | №0674 (+ 2 других файлов) |
| sc | №0072 (+ 8 других файлов) |
| scale | №0062 (+ 11 других файлов) |
| scaled | №0067 |
| scalpBuckets | №0065 |
| scalpCache | №0065 |
| scalpSamples | №0065 |
| scene | №0073 (+ 3 других файлов) |
| scenes | №0067 |
| scheduleUpdate | №0796 |
| SCHEMA_VERSION | №0646 (+ 2 других файлов) |
| schoolDamageTarget | №1345 |
| schoolHero | №1345 |
| schoolSave | №1345 |
| schoolText | №0840 |
| scLower | №0840 |
| scope | №2331 |
| scoped | №0652 |
| score | №0065 (+ 8 других файлов) |
| scores | №0690 (+ 3 других файлов) |
| scoreSnapshots | №0082 |
| scout | №1320 |
| screen | №0819 (+ 1 других файлов) |
| script | №1263 |
| scripts | №1306 (+ 1 других файлов) |
| sctx | №1435 |
| sd | №0659 (+ 1 других файлов) |
| se | №0869 |
| sealDamage | №0702 |
| sealedHp | №1353 |
| seals | №0702 (+ 2 других файлов) |
| sealTarget | №1353 |
| seam | №0065 (+ 3 других файлов) |
| seamDamage | №1264 |
| seamGroups | №0062 |
| seamMax | №1268 (+ 1 других файлов) |
| seams | №0065 |
| searchInput | №0840 |
| searchVal | №0840 |
| second | №0822 (+ 1 других файлов) |
| secondary | №0065 |
| secondDead | №1265 |
| secondOpts | №0822 |
| seconds | №0822 |
| section | №0066 |
| seed | №0065 (+ 1 других файлов) |
| seekingAttack | №1265 |
| seen | №0078 (+ 6 других файлов) |
| seenEventIds | №0814 |
| seenNames | №0749 |
| seer | №1324 |
| seg | №0065 |
| segments | №0062 (+ 3 других файлов) |
| sel | №0650 (+ 5 других файлов) |
| select | №0067 (+ 6 других файлов) |
| selected | №0062 (+ 25 других файлов) |
| selected0 | №0665 (+ 1 других файлов) |
| selectedArmorCategory | №0795 |
| selectedAsset | №0074 |
| selectedBg | №0628 (+ 1 других файлов) |
| selectedChar | №0835 |
| selectedClass | №0628 (+ 2 других файлов) |
| selectedClassKey | №0704 |
| selectedClassName | №0704 |
| selectedClothes | №1466 |
| selectedFeatSelect | №0704 |
| selectedId | №0828 |
| selectedIds | №0717 |
| selectedNatural | №0082 |
| selectedRace | №0628 (+ 1 других файлов) |
| selectedSub | №0665 |
| selectedTarget | №0823 |
| selectedTrader | №0805 |
| selectedWeaponCategoryType | №0795 |
| selectedWeaponDice | №0795 |
| selectedWeaponProperties | №0795 |
| selectEl | №0795 |
| selectElem | №0800 |
| selector | №0796 |
| selectors | №0844 |
| selectScreen | №0628 (+ 1 других файлов) |
| selectType | №0795 |
| self | №0783 |
| selfActor | №0657 |
| sellFactor | №0804 |
| sellResult | №1360 |
| SEMVER | №0893 |
| send | №0890 |
| sent | №1403 (+ 7 других файлов) |
| sep | №0062 |
| seq | №0787 (+ 4 других файлов) |
| sequence | №1332 |
| serial | №1348 (+ 1 других файлов) |
| server | №1296 (+ 39 других файлов) |
| Server | №1324 (+ 1 других файлов) |
| session | №0064 (+ 4 других файлов) |
| SESSION | №0657 |
| set | №0793 (+ 2 других файлов) |
| Set | №0667 (+ 14 других файлов) |
| setInterval | №1390 (+ 5 других файлов) |
| setTimeout | №1297 (+ 35 других файлов) |
| settings | №0655 (+ 2 других файлов) |
| settingsPanel | №0836 |
| settled | №0824 |
| sf | №0652 (+ 1 других файлов) |
| sh | №0788 |
| sha | №1447 (+ 3 других файлов) |
| shader | №1290 |
| shaft | №0062 |
| shaftSources | №0062 |
| shape | №0062 (+ 2 других файлов) |
| shaped | №1288 |
| shapeInput | №0067 |
| shapes | №0063 (+ 1 других файлов) |
| shared | №0083 (+ 2 других файлов) |
| sharedAbility | №0082 |
| sharedAliases | №0082 |
| sharedMutagen | №1265 |
| sharedSnapshots | №0082 |
| sharp | №0065 |
| shaved | №0067 |
| sheer | №0067 |
| sheetScreen | №0628 (+ 1 других файлов) |
| shell | №0788 (+ 1 других файлов) |
| shellIX | №0065 |
| shellN | №0065 |
| shellP | №0065 |
| shellUV | №0065 |
| shield | №0659 (+ 3 других файлов) |
| shieldAccess | №0673 |
| shieldAvailable | №0652 |
| shieldBonus | №0797 |
| shielded | №0815 (+ 1 других файлов) |
| shieldRoll | №0659 |
| shieldSlot | №0652 |
| shieldSpent | №0652 |
| shipped | №1309 |
| shirt | №1275 |
| short | №0645 (+ 3 других файлов) |
| shortage | №0669 |
| shortKeys | №0790 (+ 1 других файлов) |
| shortToFull | №0704 |
| shot | №1333 (+ 1 других файлов) |
| shoulder | №0065 (+ 1 других файлов) |
| shoulderSpan | №0065 |
| shouldRestoreFull | №0704 |
| shouldUpdate | №0796 |
| showEP | №0794 |
| showPP | №0794 |
| shuffleBtn | №0086 |
| shutdownCalls | №1437 |
| si | №0065 (+ 3 других файлов) |
| side | №0063 (+ 6 других файлов) |
| sideIndex | №0065 |
| sides | №0067 (+ 11 других файлов) |
| sIdx | №0650 |
| sig | №0815 (+ 1 других файлов) |
| sightHero | №1324 |
| sign | №0069 (+ 2 других файлов) |
| signatures | №1272 (+ 5 других файлов) |
| signed | №0065 |
| signup | №0655 |
| sigTarget | №1345 |
| sigUses | №0815 |
| sin | №0062 |
| single | №0840 |
| singleBox | №0814 |
| singleWeightKg | №0796 |
| size | №0065 (+ 10 других файлов) |
| sizes | №0837 (+ 1 других файлов) |
| sk | №0776 |
| sKey | №0628 |
| skill | №0078 (+ 5 других файлов) |
| SKILL_STAT | №0812 |
| SKILL_TO_VAR_MAP | №0776 |
| skilledDesc | №0667 |
| skillId | №0628 (+ 4 других файлов) |
| skillName | №0776 |
| skillNameRu | №0628 |
| skills | №0628 (+ 3 других файлов) |
| SKILLS_CONFIG | №0087 |
| skillsConfig | №0776 |
| skillsDataObj | №0776 |
| skillsList | №0776 |
| skillsListContainer | №0826 |
| skillsPanel | №0826 (+ 1 других файлов) |
| skillsStr | №0628 (+ 1 других файлов) |
| skillStr | №0628 (+ 1 других файлов) |
| skin | №0063 (+ 5 других файлов) |
| skinBaseline | №1468 |
| skinColorEntry | №0067 |
| skinImages | №1266 |
| skinned | №1280 |
| skinnedPrimitives | №1307 (+ 1 других файлов) |
| skins | №0070 (+ 2 других файлов) |
| skip | №0065 (+ 1 других файлов) |
| skipped | №1333 |
| skirt | №1277 |
| skirtDepth | №0066 |
| skull | №0065 (+ 2 других файлов) |
| sky | №0077 |
| sl | №0065 (+ 6 других файлов) |
| sleep | №1324 |
| sleeve | №0066 |
| sleeveMasks | №0066 |
| sleeves | №0066 (+ 1 других файлов) |
| slices | №0065 |
| slider | №0067 |
| slimeAcid | №1264 |
| slimeAttacker | №1264 |
| slimeBombAttack | №1265 |
| slimeBomber | №1265 |
| slimeHit | №1264 |
| slimeResistantTarget | №1264 |
| slimeVictim | №1264 |
| slot | №0063 (+ 15 других файлов) |
| SLOT_LEVEL | №0848 |
| slot2 | №0783 |
| slot3 | №0783 |
| slot4 | №0783 |
| slotBefore | №1353 |
| slotData | №0840 |
| slotHtml | №0840 |
| slotLevel | №0783 |
| slotMax | №0817 |
| slotRowHtml | №0840 |
| slots | №0066 (+ 13 других файлов) |
| SLOTS | №0081 (+ 2 других файлов) |
| slotsBefore | №1355 |
| slotSnapshot | №0815 |
| sm | №0659 (+ 4 других файлов) |
| small | №0815 |
| smitePart | №0659 |
| smoke | №0847 |
| smooth | №0065 |
| sn | №0065 |
| snake | №0822 |
| snakeId | №1324 |
| snap | №0082 (+ 5 других файлов) |
| snapshot | №0064 (+ 7 других файлов) |
| snapshots | №0659 |
| snout | №0065 |
| sorted | №0797 |
| SOTDQ | №0635 |
| source | №0062 (+ 40 других файлов) |
| SOURCE | №0082 (+ 13 других файлов) |
| SOURCE_TAG | №0674 (+ 1 других файлов) |
| sourceArmor | №0797 |
| sourceCache | №0857 |
| sourceCheck | №0815 |
| sourceCommit | №2337 |
| sourceCount | №0830 |
| sourceGroups | №0704 |
| sourceHashes | №1453 (+ 1 других файлов) |
| sourceHtml | №0840 |
| sourceId | №0660 |
| sourceManifestUrl | №0846 |
| sourceMax | №1315 |
| sourceMean | №1315 |
| sourceMeshCount | №0067 |
| sources | №0645 (+ 10 других файлов) |
| sourceStats | №0820 |
| sourceTag | №0749 |
| sourceToken | №0660 |
| sourceWeapons | №0815 |
| sp | №0073 (+ 9 других файлов) |
| span | №0062 (+ 3 других файлов) |
| spanCurrent | №0784 |
| spanTotal | №0784 |
| sparks | №0847 |
| sparse | №1305 (+ 1 других файлов) |
| sparseJson | №1305 |
| spawn | №1295 |
| spd | №0632 (+ 3 других файлов) |
| spear | №0673 |
| spec | №0661 (+ 7 других файлов) |
| specHtml | №0674 |
| specialBombEffects | №0082 |
| SPECIALIZATIONS | №0674 |
| specId | №0674 |
| species | №0843 |
| specificClass | №0704 |
| specificProf1 | №0827 |
| specificProf2 | №0827 |
| specificProf3 | №0827 |
| specificSources | №0749 |
| specs | №0674 |
| spectral | №0067 |
| speed | №0660 (+ 3 других файлов) |
| speedInput | №0828 |
| speedVal | №0828 |
| spell | №0652 (+ 7 других файлов) |
| spellbladeDeflection | №0659 |
| spellbladeOnly | №0831 |
| SPELLCASTING_CLASSES | №0840 |
| spellcastingCard | №0840 |
| spellClass | №0840 |
| spellDamageMods | №0815 (+ 1 других файлов) |
| spellDesc | №0840 |
| spellId | №0823 |
| spellLevel | №0652 (+ 4 других файлов) |
| spellList | №0081 (+ 1 других файлов) |
| spellName | №0807 (+ 4 других файлов) |
| spellNameEscaped | №0840 |
| spellObj | №0840 |
| spellPayload | №0815 |
| spellReaction | №0815 |
| spells | №0807 (+ 4 других файлов) |
| SPELLS_KNOWN | №0081 |
| spellsByLevel | №0807 |
| spellsHtml | №0840 |
| spellSourcesNow | №0831 |
| spent | №0628 (+ 11 других файлов) |
| spentLevel | №0652 |
| sPerG | №0794 |
| spine | №0065 |
| spInput | №0794 |
| spiritAttacks | №0788 |
| spiritAuto | №1345 |
| spiritHp | №0783 |
| spiritMax | №0783 |
| spiritRestored | №0783 |
| spirits | №0848 |
| splay | №0065 |
| spread | №0065 |
| spVal | №0794 |
| sq | №0065 |
| sql | №1258 |
| squares | №1290 |
| squircle | №0065 |
| sr | №0652 (+ 6 других файлов) |
| src | №0063 (+ 34 других файлов) |
| srcA | №0840 |
| srcALower | №0840 |
| srcB | №0840 |
| srcBLower | №0840 |
| ss | №0659 (+ 1 других файлов) |
| st | №0065 (+ 7 других файлов) |
| stability | №0083 (+ 1 других файлов) |
| stableFound | №1446 |
| stableLegacy | №1446 |
| stack | №0668 (+ 1 других файлов) |
| stageCount | №1446 |
| staged | №1300 (+ 2 других файлов) |
| STAGED_KEY | №0846 |
| stageManifestUrl | №0846 |
| stairs | №0080 (+ 1 других файлов) |
| stale | №1433 (+ 2 других файлов) |
| stalker | №1420 |
| stance | №0783 |
| STAND_TURN_FLAGS | №0822 |
| standard | №1291 |
| standardRaceIds | №1444 |
| standing | №1324 |
| standPC | №1324 |
| standPhone | №1324 |
| standRoster | №1324 |
| standServer | №1324 |
| start | №0065 (+ 12 других файлов) |
| started | №0787 (+ 1 других файлов) |
| startI | №1314 (+ 1 других файлов) |
| startingProfession | №0650 |
| startupRun | №0846 |
| startVol | №0086 |
| startY | №0066 |
| stat | №0078 (+ 13 других файлов) |
| STAT_ALIASES | №0831 |
| STAT_META | №0873 |
| STAT_NAMES | №0647 |
| stat2 | №0704 |
| statBonus | №0749 |
| statBonusKeys | №0749 |
| state | №0063 (+ 43 других файлов) |
| statElem | №0840 |
| stateOnly | №1449 |
| states | №0843 |
| statId | №0628 (+ 2 других файлов) |
| statKey | №0628 (+ 6 других файлов) |
| statKeysMap | №0704 |
| statMod | №0651 (+ 2 других файлов) |
| statName | №0776 |
| statNames | №0628 (+ 1 других файлов) |
| statNameShort | №0776 |
| statNamesShort | №0628 (+ 1 других файлов) |
| statOptions | №0651 (+ 1 других файлов) |
| stats | №0790 (+ 11 других файлов) |
| STATS | №0647 |
| STATS_CONFIG | №0087 |
| statsConfig | №0776 |
| statSelect | №0658 |
| statsGrid | №0776 |
| statsList | №0651 |
| status | №0836 (+ 8 других файлов) |
| STATUS | №0664 |
| statusClass | №0664 |
| statusEl | №0086 |
| statusPC | №1324 |
| statusPhone | №1324 |
| statusServer | №1324 |
| statusText | №0776 (+ 1 других файлов) |
| steel | №0067 |
| stem | №0071 (+ 2 других файлов) |
| stems | №1453 |
| stench | №1265 |
| stenchTarget | №1265 |
| step | №0065 (+ 5 других файлов) |
| steps | №0077 (+ 2 других файлов) |
| stepTime | №0086 |
| sternumSpan | №0065 |
| stock | №0804 |
| stone | №0875 |
| stop | №0660 |
| stopped | №0824 |
| storage | №0657 (+ 3 других файлов) |
| STORAGE_KEY | №0670 (+ 2 других файлов) |
| store | №1273 (+ 5 других файлов) |
| stored | №1405 |
| str | №0796 (+ 12 других файлов) |
| strand | №0065 |
| strap | №0066 |
| stream | №0893 |
| strength | №0796 |
| strenuous | №0829 |
| stride | №0066 (+ 9 других файлов) |
| strikeHP | №1354 |
| String | №0667 (+ 23 других файлов) |
| strInput | №0796 |
| stripped | №0815 |
| strMod | №0776 |
| structureBlast | №1264 |
| structureTarget | №1264 |
| studied | №0783 (+ 1 других файлов) |
| style | №0065 (+ 7 других файлов) |
| STYLE_ID | №0847 |
| styleEl | №0797 |
| styles | №0783 (+ 5 других файлов) |
| styleTag | №0836 (+ 1 других файлов) |
| sub | №0078 (+ 9 других файлов) |
| subByName | №0799 |
| subclass | №1306 (+ 3 других файлов) |
| SUBCLASS_FEATURES | №0652 |
| SUBCLASS_MAP | №0652 |
| subclasses | №0645 (+ 6 других файлов) |
| subclassHtml | №0704 |
| subclassLevel | №0782 |
| subclassName | №0717 (+ 1 других файлов) |
| subclassPacks | №0875 |
| subclassResult | №1265 |
| subclassSelect | №0704 |
| subData | №0717 |
| subFeatures | №0799 |
| subId | №0082 |
| subIds | №0876 |
| subject | №0822 |
| submit | №1258 |
| subOptionsHtml | №0704 |
| subpacks | №0082 |
| subs | №0082 (+ 2 других файлов) |
| SUBS | №0825 (+ 1 других файлов) |
| subVal | №0784 |
| success | №0078 (+ 6 других файлов) |
| suffix | №0665 |
| suit | №0823 (+ 3 других файлов) |
| suite | №0858 (+ 1 других файлов) |
| SUITS | №0825 |
| sum | №0062 (+ 16 других файлов) |
| summary | №0067 (+ 10 других файлов) |
| summonX | №0823 |
| summonY | №0823 |
| sums | №0065 (+ 2 других файлов) |
| sumSq | №1314 |
| sUp | №0749 |
| supernatural | №0783 |
| supportedSave | №1355 |
| suppressBodyHP | №0651 |
| surface | №0065 (+ 2 других файлов) |
| surfaceDiagnostics | №1468 |
| surfaceKind | №0067 |
| surfaceSelect | №0067 |
| surfaceUrl | №0067 |
| surge | №1343 (+ 1 других файлов) |
| surprised | №0652 |
| sv | №0073 (+ 6 других файлов) |
| sv2 | №0783 |
| swap | №0825 |
| swapped | №1324 |
| swarm | №0067 |
| swarmForm | №0067 |
| swarmLimits | №0070 |
| swarmMotion | №0067 |
| swift | №0783 |
| swiperContainer | №0826 (+ 1 других файлов) |
| sx | №0065 (+ 3 других файлов) |
| sy | №0065 (+ 3 других файлов) |
| synapse | №1265 |
| synapseInstall | №1265 |
| synapseRecord | №0082 |
| sync | №0891 |
| syncRequested | №0814 |
| synergies | №0083 (+ 1 других файлов) |
| SYNERGY | №0083 |
| synergySet | №0083 |
| sys | №0067 (+ 18 других файлов) |
| sz | №0065 (+ 3 других файлов) |
| t | №0062 (+ 106 других файлов) |
| T | №0062 (+ 2 других файлов) |
| t2 | №0817 |
| ta | №0783 |
| tab | №0074 (+ 4 других файлов) |
| tabButtons | №0797 |
| table | №0645 (+ 6 других файлов) |
| tabs | №0675 |
| tabsContainer | №0797 |
| tabsNav | №0872 |
| tabsWrapper | №0797 |
| tacticalBack | №1324 |
| tacticalPC | №1324 |
| tacticalPhone | №1324 |
| tacticalRoster | №1324 |
| tacticalServer | №1324 |
| tactics | №0876 |
| tag | №0065 (+ 15 других файлов) |
| tagOk | №0806 |
| tags | №0065 (+ 9 других файлов) |
| tail | №0065 |
| tailEnd | №0065 |
| tailRoot | №0065 |
| take | №0645 (+ 7 других файлов) |
| takeFromContainer | №0793 |
| taken | №0078 |
| tal | №0783 |
| tampered | №1441 |
| tangent | №0065 |
| taper | №0065 (+ 1 других файлов) |
| tapLength | №0801 |
| target | №0062 (+ 50 других файлов) |
| targetActor | №0822 |
| targetChar | №0835 |
| targetCharId | №0835 |
| targetClass | №0790 (+ 1 других файлов) |
| targetClasses | №0659 |
| targetClassesForSlime | №0659 |
| targetContent | №0797 |
| targetCopy | №0825 |
| targetGrafts | №0659 |
| targetGrappled | №0783 |
| targetH | №0077 |
| targetHasArmor | №0659 |
| targetId | №0660 (+ 6 других файлов) |
| targetIsPugilist | №0659 |
| targetLabels | №1227 |
| targetLevel | №0704 (+ 1 других файлов) |
| targetList | №0660 |
| targetLvl | №0836 |
| targetMeshIndex | №1304 |
| targetName | №0660 |
| targetParent | №0794 |
| targetPath | №1304 (+ 3 других файлов) |
| targetPrim | №1304 |
| targetPrimIndex | №1304 |
| targetProfId | №0827 (+ 1 других файлов) |
| targetProgress | №0847 |
| targetReports | №1316 |
| targetResistances | №0659 |
| targets | №0065 (+ 9 других файлов) |
| targetSnapshot | №0822 |
| targetTok | №0660 |
| targetToken | №0660 |
| targetType | №0817 |
| targetVol | №0086 |
| targetW | №0077 |
| tarot | №0659 (+ 1 других файлов) |
| tarotAC | №0659 |
| tarotActor | №0776 |
| tarotAdv | №0659 |
| tarotCast | №0839 |
| tarotCheck | №0815 |
| tarotDis | №0659 |
| tarotFactor | №0659 |
| tarotForced | №0659 |
| tarotIgnoresResistance | №0659 |
| tarotInitiative | №0777 |
| tarotMod | №0659 |
| tarotOwner | №0777 |
| tarotReroll | №0659 |
| tarotRound | №0787 |
| tarotSave | №0659 |
| tarotScene | №0659 |
| tarotTurnId | №0777 |
| TASKS | №0862 |
| tavern | №2338 |
| tb | №0812 |
| tc | №0783 (+ 1 других файлов) |
| team | №0815 |
| teeth | №0065 |
| teleportAllyId | №0823 |
| teleportX | №0823 |
| teleportY | №0823 |
| temp | №0659 (+ 6 других файлов) |
| TEMPER | №0805 |
| tempHp | №0783 |
| template | №0659 (+ 1 других файлов) |
| term | №1310 |
| terms | №1310 (+ 2 других файлов) |
| terror | №0065 |
| test | №0847 (+ 2 других файлов) |
| testDir | №1505 |
| testRecipe | №1297 |
| tests | №1448 |
| tets | №0065 |
| tex | №0066 (+ 2 других файлов) |
| text | №0067 (+ 26 других файлов) |
| textColor | №0776 |
| TextDecoder | №1268 (+ 21 других файлов) |
| textSpan | №0776 |
| texture | №0073 (+ 3 других файлов) |
| textures | №2338 |
| th | №0077 (+ 1 других файлов) |
| theftRef | №0823 |
| theme | №0836 |
| themed | №0677 |
| themeKey | №0836 |
| themeSelect | №0836 |
| theta | №0062 (+ 1 других файлов) |
| thick | №1466 |
| thickness | №0065 |
| thigh | №0063 |
| thin | №1466 |
| THIRD_CASTERS | №0831 |
| THR | №0813 |
| thresholds | №0809 (+ 1 других файлов) |
| THRESHOLDS | №0809 |
| thumbDir | №0065 |
| thumbEnd | №0065 |
| thumbRoot | №0065 |
| thumbs | №0872 |
| thumbSide | №0065 |
| ti | №0065 (+ 3 других файлов) |
| tick | №0815 |
| tid | №0660 |
| tie | №1267 |
| tier | №0669 |
| tile | №0066 |
| time | №0072 (+ 4 других файлов) |
| timedHero | №1265 |
| timeout | №0657 (+ 1 других файлов) |
| timer | №0657 (+ 3 других файлов) |
| timers | №1296 |
| times | №0072 |
| timeSpan | №0776 |
| timeStr | №0794 |
| timeString | №0776 |
| tint | №0067 |
| tiny | №1354 |
| tip | №0062 (+ 1 других файлов) |
| tipSelect | №0067 |
| title | №0067 (+ 7 других файлов) |
| titleEl | №0796 (+ 1 других файлов) |
| titleElem | №0800 (+ 1 других файлов) |
| titleText | №0840 |
| tl | №0062 (+ 1 других файлов) |
| tm | №0776 (+ 1 других файлов) |
| tmax | №0077 |
| tmin | №0077 |
| tmp | №0893 |
| tn | №1307 (+ 1 других файлов) |
| to | №0636 (+ 3 других файлов) |
| toggle | №0670 |
| toggleContainer | №0793 |
| tok | №0660 (+ 2 других файлов) |
| token | №0657 (+ 3 других файлов) |
| tokens | №0071 (+ 1 других файлов) |
| tool | №0640 (+ 10 других файлов) |
| TOOL_IDS | №0672 |
| TOOL_LABELS | №0672 |
| toolbar | №0793 |
| toolBox | №0823 |
| toolId | №0812 |
| toolLabel | №0823 |
| toolMatrix | №0676 |
| toolOk | №0882 |
| toolProficient | №0823 |
| tools | №0085 (+ 5 других файлов) |
| TOOLS | №0676 |
| toolsStr | №0628 (+ 1 других файлов) |
| toolStat | №0823 |
| toolStr | №0650 |
| toolText | №0823 |
| tooth | №0065 |
| toothColor | №1468 |
| toothPart | №0065 |
| top | №0062 (+ 5 других файлов) |
| topology | №1280 |
| topRow | №0797 |
| torso | №0065 (+ 1 других файлов) |
| total | №0065 (+ 35 других файлов) |
| totalAtk | №0840 |
| totalAttack | №0651 |
| totalAttackBonus | №0776 |
| totalCopper | №0794 |
| totalCurrentLevel | №0704 |
| totalDamage | №0651 |
| totalDiceDamage | №0651 |
| totalGain | №0704 |
| totalLevel | №0704 (+ 1 других файлов) |
| totalMod | №0776 |
| totalObjects | №0075 |
| totals | №0657 (+ 1 других файлов) |
| totalSkillMod | №0838 |
| totalSum | №0776 (+ 1 других файлов) |
| totalWeight | №0793 |
| totalWeightKg | №0796 (+ 1 других файлов) |
| totalWeightLb | №0796 |
| totalZones | №0075 |
| totem | №0652 |
| touched | №0815 |
| touchHp | №0817 |
| toxic | №1265 |
| toxicDC | №0082 |
| toxicSave | №0082 |
| toxicTarget | №0082 (+ 1 других файлов) |
| tp | №0815 |
| tr | №0817 (+ 1 других файлов) |
| track | №0086 |
| tracker | №0082 (+ 5 других файлов) |
| trackNameEl | №0086 |
| trade | №2333 |
| TRADE_KEY | №0806 |
| traderId | №0803 (+ 2 других файлов) |
| TRADERS | №0803 |
| traditionActions | №0817 |
| traditions | №0817 |
| trained | №1326 (+ 1 других файлов) |
| transfer | №1304 |
| transformed | №1313 (+ 1 других файлов) |
| transforms | №0069 |
| translated | №0071 (+ 1 других файлов) |
| transported | №1324 |
| transpose | №1266 |
| travelling | №1324 |
| tri | №0062 (+ 3 других файлов) |
| triangleHits | №1315 |
| triangles | №0065 (+ 5 других файлов) |
| trick | №0823 |
| TRICK_FEATURES | №0825 |
| trickster | №1324 |
| triggerCustomCreation | №0795 |
| TRIGGERS | №0822 |
| tris | №0065 |
| true | №0783 (+ 3 других файлов) |
| trunk | №0065 |
| trust | №1258 |
| ts | №0815 (+ 1 других файлов) |
| tt | №0077 (+ 2 других файлов) |
| tTok | №0659 |
| tu | №1416 (+ 1 других файлов) |
| tuft | №0065 |
| tufts | №0065 |
| turn | №0783 (+ 2 других файлов) |
| turned | №0652 |
| turnId | №0787 (+ 1 других файлов) |
| turnKey | №0783 |
| turnOne | №1264 |
| turnTwo | №1264 |
| tusks | №0065 |
| tw | №0077 |
| two | №1339 |
| tx | №0073 (+ 4 других файлов) |
| txt | №0826 (+ 2 других файлов) |
| typ | №0783 (+ 1 других файлов) |
| type | №0062 (+ 59 других файлов) |
| typeCount | №1316 |
| typedExtraTotal | №0659 |
| types | №0837 (+ 3 других файлов) |
| TYPES | №0804 |
| typeSelect | №0795 |
| u | №0062 (+ 16 других файлов) |
| U | №0062 |
| ub | №0077 |
| ui | №0846 (+ 1 других файлов) |
| uiColorOptions | №0872 |
| uid | №1258 (+ 1 других файлов) |
| uiFreeGather | №0829 |
| uiGather | №0829 |
| uiMix | №0083 |
| Uint16Array | №1266 (+ 22 других файлов) |
| Uint32Array | №1266 (+ 27 других файлов) |
| Uint8Array | №1268 (+ 22 других файлов) |
| ul | №0065 |
| unacted | №0652 |
| unarmoredBase | №0659 |
| unbreakable | №1345 |
| unbreakableHero | №1345 |
| uncouthId | №0783 |
| uncouthTargets | №0783 |
| undead | №1416 |
| undeadFocus | №0659 |
| undo | №0652 |
| unescape | №1403 (+ 2 других файлов) |
| unique | №0066 (+ 1 других файлов) |
| uniqueFeatsMap | №0704 |
| uniqueMap | №0840 |
| uniqueSuffix | №0795 |
| unit | №0065 (+ 4 других файлов) |
| units | №0836 |
| unknown | №1288 (+ 2 других файлов) |
| unrelated | №1332 (+ 1 других файлов) |
| untrained | №1339 |
| up | №0065 (+ 1 других файлов) |
| update | №0678 (+ 2 других файлов) |
| updateCloudStatus | №0836 |
| updated | №0749 |
| updateListeners | №0891 |
| updater | №0890 (+ 2 других файлов) |
| updateRun | №0846 |
| updateScheduled | №0796 |
| uploadImage | №0067 |
| uploads | №1266 |
| upper | №0063 (+ 5 других файлов) |
| upperSnout | №0065 |
| upTo | №0717 |
| uri | №0073 |
| url | №0067 (+ 40 других файлов) |
| URL | №1296 |
| urlPath | №0893 |
| usage | №0067 |
| use | №0669 |
| useBtn | №0797 |
| used | №0645 (+ 9 других файлов) |
| usedBy | №0677 |
| usedCombat | №0815 |
| usedCount | №0658 |
| usedVal | №0840 |
| useFeature | №0813 |
| useFur | №0067 |
| useReptile | №0067 |
| userProfsIds | №0797 |
| uses | №0652 (+ 3 других файлов) |
| USES | №0807 |
| usesHtml | №0658 |
| useSkinMicro | №0067 |
| utilityArmor | №1324 |
| utilityBack | №1324 |
| utilityBerry | №1324 |
| utilityDash | №1324 |
| utilityPC | №1324 |
| utilityPhone | №1324 |
| utilityRoster | №1324 |
| utilityServer | №1324 |
| uv | №0062 (+ 6 других файлов) |
| uvAnchor | №0062 |
| uvDet | №0062 |
| uvFit | №0062 |
| ux | №0065 |
| uy | №0065 |
| uz | №0065 |
| v | №0063 (+ 151 других файлов) |
| V | №0062 (+ 1 других файлов) |
| v0 | №1312 (+ 2 других файлов) |
| v1 | №1312 (+ 2 других файлов) |
| v2 | №1312 (+ 2 других файлов) |
| v2Broken | №1291 |
| va | №1312 (+ 4 других файлов) |
| val | №0086 (+ 14 других файлов) |
| valEl | №0628 (+ 1 других файлов) |
| valid | №1322 |
| validate | №0676 |
| validBoons | №0783 |
| validRelative | №1301 |
| validStats | №0749 |
| valInput | №0795 |
| valName | №0628 (+ 1 других файлов) |
| vals | №0072 (+ 2 других файлов) |
| valStr | №0628 (+ 1 других файлов) |
| value | №0063 (+ 35 других файлов) |
| values | №0073 (+ 7 других файлов) |
| variableNameUsed | №0776 |
| variant | №1375 |
| variants | №1277 |
| varName | №0776 (+ 2 других файлов) |
| vary | №1290 |
| vb | №1312 (+ 3 других файлов) |
| vc | №1312 (+ 3 других файлов) |
| vector | №0069 |
| venom | №1265 |
| venomDamage | №1264 |
| venomFeature | №1265 |
| venomHero | №1265 |
| venomsmithPoisonImmune | №0659 |
| venomTarget | №1264 |
| verbal | №0822 |
| verm | №0645 |
| version | №0836 (+ 4 других файлов) |
| VERSION | №0070 (+ 25 других файлов) |
| versionText | №0846 |
| vertex | №0065 (+ 1 других файлов) |
| vertices | №0062 (+ 8 других файлов) |
| verts | №0066 (+ 1 других файлов) |
| vesselHP | №1354 |
| vi | №1312 (+ 2 других файлов) |
| victim | №0822 (+ 4 других файлов) |
| view | №0068 (+ 8 других файлов) |
| viewIndex | №0073 |
| views | №0073 (+ 7 других файлов) |
| viscera | №1345 |
| visceraTarget | №1345 |
| visible | №0065 (+ 8 других файлов) |
| visionBack | №1324 |
| visionPC | №1324 |
| visionPhone | №1324 |
| visionRoster | №1324 |
| visionServer | №1324 |
| vm | №0667 (+ 152 других файлов) |
| voice | №1265 |
| voiceInstall | №1265 |
| volatility | №0083 (+ 1 других файлов) |
| volStep | №0086 |
| volumeRange | №0086 |
| volumes | №0065 |
| vp | №0077 |
| vr | №0815 |
| vs | №0067 |
| vuln | №0854 |
| vulnerable | №0659 (+ 1 других файлов) |
| vx | №0065 (+ 1 других файлов) |
| vy | №0065 |
| vz | №0065 (+ 1 других файлов) |
| w | №0063 (+ 33 других файлов) |
| W | №0065 (+ 2 других файлов) |
| w1 | №0065 |
| w2 | №0065 |
| w3 | №0065 |
| wa | №0659 (+ 1 других файлов) |
| wager | №1324 (+ 1 других файлов) |
| wagerGuard | №0823 |
| waistPoints | №1277 |
| waived | №0807 |
| walk | №0848 |
| wall | №0067 |
| wallCache | №0077 |
| wallet | №0803 |
| walletGrid | №0794 |
| wallpapersGridHtml | №0872 |
| wallTypes | №0080 |
| walter | №0065 |
| walterCorpseTarget | №0650 |
| wandering | №1324 |
| wanderPhone | №1324 |
| want | №0805 (+ 2 других файлов) |
| wanted | №0065 (+ 2 других файлов) |
| wantedClass | №0704 |
| war | №0635 (+ 1 других файлов) |
| WAR_ACADEMIES | №0780 |
| ward | №0659 (+ 1 других файлов) |
| wardAbsorbed | №0659 |
| wardenResistant | №0659 |
| wardenSurvive | №0659 |
| wardReduce | №0659 |
| wardrobeSaved | №1466 |
| wardState | №0659 |
| warlordParry | №0659 |
| warp | №1286 (+ 1 других файлов) |
| wasLastStand | №0787 |
| wasNewClass | №0704 |
| wasStand | №0659 |
| wave | №0065 |
| wb | №1312 (+ 2 других файлов) |
| wc | №1312 (+ 2 других файлов) |
| weapon | №0827 (+ 8 других файлов) |
| weaponAttack | №1342 |
| weaponFields | №0795 |
| weaponId | №0827 (+ 2 других файлов) |
| weaponName | №0827 (+ 2 других файлов) |
| weapons | №0815 |
| weaponsDb | №0827 (+ 1 других файлов) |
| wear | №0669 |
| webbedTarget | №1265 |
| webDebuffs | №0082 |
| webResult | №1265 |
| webRoot | №0890 |
| webSave | №0082 |
| webTarget | №0082 |
| weight | №0065 (+ 5 других файлов) |
| weightInp | №0795 |
| weightRes | №0795 |
| weights | №0062 (+ 6 других файлов) |
| weightStr | №0796 (+ 1 других файлов) |
| weightValue | №1453 |
| weldedBoundary | №0062 |
| weldKey | №0062 |
| wh | №0065 |
| whiskers | №0065 |
| who | №0815 |
| wi | №0080 (+ 1 других файлов) |
| wide | №0065 |
| width | №0065 (+ 7 других файлов) |
| wild | №0634 (+ 1 других файлов) |
| willActivate | №0659 |
| willingTargetIds | №0823 |
| win | №0890 (+ 5 других файлов) |
| window | №2338 |
| wingAngle | №0065 |
| wis | №0632 (+ 11 других файлов) |
| wisMod | №0628 (+ 1 других файлов) |
| WITCH_CRAFT_DATA | №0783 |
| WITCH_CRAFTS | №0783 |
| WITCH_CURSE_EFFECTS | №0783 |
| WITCH_CURSES | №0783 |
| WITCH_GRAND_HEXES | №0783 |
| WITCH_HEXES | №0783 |
| witchAttackPenalty | №0659 |
| witchElemental | №0659 |
| witchImperil | №0659 |
| witchLabels | №0783 |
| witchPack | №0783 |
| withFade | №0872 |
| within1 | №1318 |
| within5 | №1318 |
| wiz | №0815 |
| Wizard | №1291 |
| wk | №1315 |
| wl | №0652 |
| wName | №0651 |
| wolf | №1354 |
| won | №1331 |
| wood | №0067 |
| words | №0071 |
| world | №0062 (+ 2 других файлов) |
| WORLD_STATE | №0882 |
| woven | №0067 |
| wp | №0872 (+ 1 других файлов) |
| wrap | №0629 (+ 4 других файлов) |
| wrapped | №0787 (+ 4 других файлов) |
| wrappedTools | №0831 |
| wrapper | №0776 (+ 1 других файлов) |
| wrapS | №0077 |
| wrapT | №0077 |
| wrist | №0065 |
| wrists | №0065 |
| write | №0822 |
| wrong | №1345 (+ 2 других файлов) |
| ws | №0067 (+ 2 других файлов) |
| wt | №0067 (+ 1 других файлов) |
| ww | №0077 |
| wx | №0076 (+ 1 других файлов) |
| wy | №0076 (+ 1 других файлов) |
| x | №0063 (+ 164 других файлов) |
| X | №0076 |
| x0 | №0065 |
| x1 | №0065 (+ 2 других файлов) |
| x2 | №0075 (+ 1 других файлов) |
| xenoHero | №1264 |
| xenoOwner | №1265 |
| xn | №0085 (+ 1 других файлов) |
| xp | №0632 (+ 11 других файлов) |
| XP_BY_CR | №0809 |
| xs | №1444 |
| xt | №0085 |
| xx | №0065 (+ 3 других файлов) |
| xy | №0077 |
| y | №0062 (+ 55 других файлов) |
| Y | №0065 (+ 1 других файлов) |
| y0 | №0065 (+ 1 других файлов) |
| y1 | №0065 (+ 4 других файлов) |
| y2 | №0075 (+ 2 других файлов) |
| yaw | №0067 (+ 36 других файлов) |
| yd | №0783 |
| yes | №0063 (+ 2 других файлов) |
| yf | №1312 |
| yFile | №1314 |
| ys | №0065 |
| yuan | №1272 (+ 2 других файлов) |
| yy | №0065 (+ 1 других файлов) |
| z | №0062 (+ 19 других файлов) |
| z0 | №0065 (+ 1 других файлов) |
| z1 | №0065 (+ 1 других файлов) |
| zb | №0065 |
| zf | №0065 |
| zFile | №1314 |
| ZH | №0076 |
| zi | №0076 |
| zlib | №1290 (+ 7 других файлов) |
| zoom | №0067 (+ 2 других файлов) |
| zs | №0076 |
| ZW | №0076 |
| ZX | №0076 |
| ZY | №0076 |
| zz | №0065 (+ 1 других файлов) |

### Глобальные JS API (563)

| Имя | Исходные файлы |
|---|---|
| __diceGameplayRelocationObserver | №0776 |
| __diceGameplayRelocationQueued | №0776 |
| __diceTabPanelObserver | №0776 |
| __DND_APP_BOOT_READY | №0087 |
| __dndGameplayV57Waiter | №0787 |
| __dndLootV36 | №0811 |
| __dndLootV37 | №0812 |
| __dndLootV40 | №0810 |
| __dndModalFrameObserverInstalled | №0836 |
| __dndPendingReactionRequest | №0815 |
| __fallbackRollDice | №0776 |
| __map | №1296 |
| __TEST_RESULT__ | №1431 |
| _dndFaqRender | №0819 |
| _dndSave | №0842 (+ 6 других файлов) |
| _dndTourBack | №0819 |
| _dndTourNext | №0819 |
| _dndTourSkip | №0819 |
| _expBeforeLevelUp | №0704 |
| _loadedFeatsMap | №0704 |
| _loadedSubclassOptions | №0704 |
| _originalAddItemToInventory | №0796 |
| AbortController | №0846 |
| ACCURSED_V11 | №0081 |
| accursedAfflictions | №0081 |
| accursedProgression | №0081 (+ 2 других файлов) |
| accursedRuntime | №0081 (+ 1 других файлов) |
| addEventListener | №1326 (+ 4 других файлов) |
| addExperienceValue | №0784 |
| addItemToInventory | №0796 (+ 2 других файлов) |
| ALCHEMIST_MHP_2024 | №0082 |
| alchemistProgression | №0681 |
| alert | №0815 (+ 3 других файлов) |
| allCharacters | №0628 (+ 4 других файлов) |
| appDebugLogs | №0836 (+ 1 других файлов) |
| appendDiceLog | №0652 (+ 3 других файлов) |
| applyClassProgression | №0717 |
| applyConditionsToRoll | №1343 |
| applyDndASI | №0831 |
| applyMulticlassProficiencies | №0704 (+ 1 других файлов) |
| applySubclassProgression | №0652 (+ 1 других файлов) |
| artificerProgression | №0683 |
| autoSaveCurrentCharacter | №0085 (+ 39 других файлов) |
| averageHpIncrease | №0704 |
| barbarianProgression | №0685 |
| bardProgression | №0687 |
| beastheartProgression | №0690 (+ 1 других файлов) |
| BeastheartRuntime | №0690 |
| bloodHunterProgression | №0692 |
| calculateMods | №0831 (+ 1 других файлов) |
| changePointBuyStat | №0628 (+ 1 других файлов) |
| checkMulticlassRequirements | №0790 (+ 1 других файлов) |
| chooseAssassinSubclass | №0652 |
| chooseMetamagic | №0652 |
| chooseSubclass | №0717 |
| chooseSubclassForClass | №0652 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0717 |
| CLASSES_REFERENCE | №0082 (+ 4 других файлов) |
| clericProgression | №0693 |
| closeAddFeatModal | №0749 |
| closeCharacterCreationModal | №0628 (+ 1 других файлов) |
| closeCustomAlert | №0796 |
| closeDndChangelog | №0819 |
| closeDndNetworkModal | №0814 |
| closeExperienceModal | №0784 |
| closeIconSettingsModal | №0836 (+ 2 других файлов) |
| closeLevelUpModal | №0704 |
| closeSettingsModal | №0836 |
| Companions | №0662 |
| confirm | №0067 (+ 2 других файлов) |
| confirmAddFeatManual | №0749 |
| confirmLevelUp | №0704 |
| createNewCharacter | №0628 (+ 1 других файлов) |
| createSwarmAvatar | №0843 |
| crypto | №1321 (+ 19 других файлов) |
| currentChar | №0836 (+ 31 других файлов) |
| currentCharacter | №0836 (+ 10 других файлов) |
| currentCharacterId | №0657 (+ 2 других файлов) |
| currentRollMode | №1339 |
| defaultArmors | №0088 |
| defaultConsumables | №0663 (+ 1 других файлов) |
| defaultJunk | №0798 (+ 2 других файлов) |
| defaultMaterials | №0808 (+ 2 других файлов) |
| defaultWeapons | №0827 (+ 1 других файлов) |
| disableDndDebugRuntime | №0836 (+ 1 других файлов) |
| DND_ALCHEMY_GATHERING_V52 | №0085 |
| DND_APP_ICONS | №0836 (+ 2 других файлов) |
| DND_BESTIARY_V56_1 | №0632 |
| DND_BESTIARY_V56_10 | №0633 |
| DND_BESTIARY_V56_11 | №0634 |
| DND_BESTIARY_V56_12 | №0635 |
| DND_BESTIARY_V56_13 | №0636 |
| DND_BESTIARY_V56_2 | №0637 |
| DND_BESTIARY_V56_3 | №0638 |
| DND_BESTIARY_V56_4 | №0639 |
| DND_BESTIARY_V56_5 | №0640 |
| DND_BESTIARY_V56_6 | №0641 |
| DND_BESTIARY_V56_7 | №0642 |
| DND_BESTIARY_V56_8 | №0643 |
| DND_BESTIARY_V56_9 | №0644 |
| DND_CRAFT_DISASSEMBLY_V51 | №0668 |
| DND_CRAFT_ECONOMY_V49 | №0671 |
| DND_CRAFT_PROFESSION_PROGRESS | №0674 |
| DND_CRAFT_PROFESSIONS_V33 | №0675 |
| DND_CRAFT_PROFESSIONS_V38 | №0676 |
| DND_CRAFT_PROFESSIONS_V47 | №0674 |
| DND_CRAFT_PROFESSIONS_V47_CRAFT | №0674 |
| DND_CRAFT_RESOURCES_V34 | №0677 |
| DND_CRAFT_V51 | №0669 |
| DND_CRAFTING_DLC_V50 | №0670 |
| DND_CRAFTING_V31 | №0672 |
| DND_CUSTOM_CRAFTING_V32 | №0678 |
| DND_EXP_TABLE | №0784 |
| DND_INVENTORY_CONTAINERS_V54 | №0793 |
| DND_MARKET_V55 | №0803 |
| DND_MARKET_V55_1 | №0804 |
| DND_MARKET_V55_3 | №0805 |
| DND_PENDING_CLASS_PACKS | №0081 (+ 8 других файлов) |
| DND_PLANESCAPE_V56_13 | №0636 |
| DND_RESOURCE_GATHERING_V35 | №0829 |
| DND_RESOURCE_PROCESSING_V43 | №0830 |
| DND_UPDATE_MANAGER | №0846 |
| DND_UPDATE_SCENE_V2 | №0847 |
| DND_UPDATE_UI | №0846 |
| DND_WORLD_GATHERING_V53 | №0882 |
| DND3DAssetCatalog | №0071 (+ 1 других файлов) |
| DND3DAssetNames | №0071 (+ 1 других файлов) |
| DND3DMap | №0074 |
| dndAddCompanionAttack | №0831 |
| DNDAdvancedDebugV70 | №0857 |
| DNDAlchemy | №0083 |
| dndBackgrounds | №0628 |
| dndBattleActionClose | №0629 |
| dndBattleActionOpen | №0629 (+ 1 других файлов) |
| dndBattleQuickAttack | №0629 |
| dndBattleQuickMove | №0629 |
| dndBattleQuickReady | №0629 |
| dndBattleQuickSpell | №0629 |
| DNDBloodHunter | №0645 |
| DNDCampaign | №0646 |
| DNDCharacter3D | №0070 |
| DNDCharacterAnatomy | №0063 |
| DNDCharacterAnatomyGeometry | №0062 |
| DNDCharacterAppearanceStore | №0064 |
| DNDCharacterBodyGeometry | №0065 |
| DNDCharacterClothing | №0066 |
| DNDCharacterEditor3D | №0067 |
| dndCharacterEditorLaunchError | №1227 |
| DNDCharacterLabV702 | №0853 |
| DNDCharacterMorphAssets | №0068 |
| DNDCharacterPose | №0069 |
| DNDClassFeatures | №0652 (+ 1 других файлов) |
| DNDCloudAccount | №0655 |
| DNDCloudConfig | №0656 |
| DNDCloudSync | №0657 |
| dndCollectMonsterLootV36 | №0811 |
| dndCollectMonsterLootV37 | №0812 |
| dndCollectMonsterLootV40 | №0810 |
| DNDCombat | №0659 (+ 1 других файлов) |
| DNDCombatEventBusV69 | №0851 |
| dndCombatLog | №0842 |
| DNDCombatLogV66 | №0852 |
| dndCompanionAttack | №0831 |
| dndCompanionDamage | №0831 |
| DNDCompanionGameplayV27 | №0660 |
| dndCompanionHeal | №0831 |
| DNDCompanionPacks | №0661 |
| dndCompanionStat | №0831 |
| dndConcentrationDamagePrompt | №0831 |
| DNDContent | №0665 |
| DNDContentCatalog | №0664 |
| DNDContentManifest | №0666 |
| dndCraft | №0672 |
| dndCraftProfession | №0675 |
| dndCraftProfessionV38 | №0669 (+ 3 других файлов) |
| dndCreateBeastheartCompanion | №0661 |
| dndCreateBeastMasterCompanion | №0661 |
| dndCreateFamiliar | №0661 |
| dndCreateSteed | №0661 |
| dndDebugEnabled | №1227 |
| DNDDebugScenarioEditorV705 | №0860 |
| DNDDebugScenarioManagerV704 | №0861 |
| DNDDiceResolutionV65 | №0863 |
| DNDEncounterCheckpointV68 | №0864 |
| DNDEncounterMapV59 | №0865 |
| DNDExpandedV23 | №0780 |
| DNDExpansionClasses | №0783 |
| DNDFeats | №0786 |
| dndGameplayCoreV57Render | №0787 |
| DNDGameplayV57 | №0787 |
| dndGenerateMonsterLootV36 | №0811 |
| dndGenerateMonsterLootV37 | №0810 (+ 1 других файлов) |
| DNDGLTF | №0073 |
| DNDGLTFCharacterPipeline | №0072 |
| dndInitiativeActive | №0831 |
| dndInitiativeDamageActive | №0831 |
| dndInitiativeHealActive | №0831 |
| dndInitiativeSkipDefeated | №0831 |
| DndInventoryContainersV54 | №0793 |
| DndItemDatabase | №0796 |
| dndLaunchCharacterEditor3D | №1227 |
| DNDMagic | №0802 |
| dndMap3DOpen | №0074 |
| DNDMapModel | №0075 |
| DNDMapRenderer2D | №0076 |
| DNDMapRenderer3D | №0077 (+ 1 других файлов) |
| DndMarketV55 | №0803 |
| DndMarketV55_3 | №0805 |
| DNDMobileBattleV61 | №0867 |
| DNDMobileSessionV67 | №0869 |
| DNDMonsterLoot | №0811 (+ 1 других файлов) |
| DNDMonsterLootV40 | №0810 |
| DNDMonsters | №0809 |
| dndNetwork | №1296 (+ 4 других файлов) |
| dndNetworkAddPlayerToInitiative | №0815 |
| dndNetworkCopyHint | №0814 |
| dndNetworkGameplayBuildProfile | №0815 |
| dndNetworkGameplayEvent | №0815 |
| dndNetworkGameplayMonsterAction | №0815 |
| dndNetworkGameplayMonsterState | №0815 |
| dndNetworkGameplayPeerDisconnect | №0815 |
| dndNetworkGameplayPeerHello | №0815 |
| dndNetworkGameplayPendingReactions | №0815 |
| dndNetworkGameplayPrepareHostHandoff | №0815 |
| dndNetworkGameplayReactionRequest | №0815 |
| dndNetworkGameplayRender | №0787 (+ 2 других файлов) |
| dndNetworkGameplayResult | №0815 |
| dndNetworkGameplayRoomShutdown | №0815 |
| dndNetworkGameplaySnapshot | №0815 |
| dndNetworkHostCreate | №0814 |
| dndNetworkHostFinish | №0814 |
| dndNetworkJoinCreate | №0814 |
| dndNetworkKick | №0814 |
| dndNetworkNewInvite | №0814 |
| dndNetworkSingle | №0814 |
| dndOpenCharacterEditor3D | №0067 |
| DNDPredictor | №0825 |
| DNDPredictorCards | №0822 |
| DNDPredictorMovement | №0824 |
| DNDPredictorUI | №0823 |
| dndProcessResourceV43 | №0830 |
| dndRemoveCompanionAttack | №0831 |
| dndRenderAlchemy | №0083 (+ 1 других файлов) |
| dndRenderCombat | №0645 |
| dndRenderCombatV3 | №0815 (+ 1 других файлов) |
| DNDRules | №0831 (+ 1 других файлов) |
| DNDSecondaryEntities | №0834 |
| dndShowRulesSummary | №0831 |
| DNDSpellPreparation | №0840 |
| dndSplashFinished | №0801 (+ 2 других файлов) |
| DNDStairNavigation | №0079 |
| dndStartConcentrationPrompt | №0831 |
| DNDStressMap | №0080 |
| dndSummonAttack | №0842 |
| dndSummonCommand | №0842 |
| dndSummonHeal | №0842 |
| DNDSummoning | №0842 |
| dndSyncCurrentCharacterFromCombat | №0815 (+ 2 других файлов) |
| dndUseAlchemyProduct | №0084 |
| dndV59CreateEncounter | №0865 |
| dndV61ResetView | №0867 |
| dndV65Close | №0863 |
| dndV65Open | №0863 |
| dndV65Resolve | №0863 |
| dndV66Clear | №0852 |
| dndV66CloseDebug | №0852 |
| dndV66CloseLog | №0852 |
| dndV66Export | №0852 |
| dndV66Filter | №0852 |
| dndV66OpenDebug | №0852 |
| dndV66OpenLog | №0852 |
| dndV66Record | №0851 (+ 1 других файлов) |
| dndV66RefreshDebug | №0852 |
| dndV66SelfTest | №0852 |
| dndV67Close | №0869 |
| dndV67Delete | №0869 |
| dndV67Export | №0869 |
| dndV67FileImport | №0869 |
| dndV67Open | №0869 |
| dndV67Restore | №0869 |
| dndV67Save | №0869 |
| dndV68Close | №0864 |
| dndV68Delete | №0864 |
| dndV68Export | №0864 |
| dndV68FileImport | №0864 |
| dndV68Open | №0864 |
| dndV68Restore | №0864 |
| dndV68Save | №0864 |
| dndV69Clear | №0851 |
| dndV69CloseReplay | №0851 |
| dndV69ExportReplay | №0851 |
| dndV69Filter | №0851 |
| dndV69OpenReplay | №0851 |
| dndV69Play | №0851 |
| dndV69Record | №0851 |
| dndV69Seek | №0851 |
| dndV69Step | №0851 |
| dndV69Stop | №0851 |
| dndV702AddClass | №0853 |
| dndV702AddFeat | №0853 |
| dndV702AddItem | №0853 |
| dndV702AddSpell | №0853 |
| dndV702Close | №0853 |
| dndV702Open | №0853 |
| dndV702Recalc | №0853 |
| dndV702RemoveClass | №0853 |
| dndV702RemoveFeat | №0853 |
| dndV702RemoveItem | №0853 |
| dndV702RemoveSpell | №0853 |
| dndV702SetBackground | №0853 |
| dndV702SetClassLevel | №0853 |
| dndV702SetProfession | №0853 |
| dndV702SetRace | №0853 |
| dndV702SetTotalLevel | №0853 |
| dndV702Tab | №0853 |
| dndV704Close | №0861 |
| dndV704Open | №0861 |
| dndV704Remove | №0861 |
| dndV704Rollback | №0861 |
| dndV704Run | №0861 |
| dndV704SaveCustom | №0861 |
| dndV704Select | №0861 |
| dndV705Close | №0860 |
| dndV705Create | №0860 |
| dndV705Export | №0860 |
| dndV705ImportPrompt | №0860 |
| dndV705Open | №0860 |
| dndV705Rollback | №0860 |
| dndV705Run | №0860 |
| dndV705Select | №0860 |
| dndV708Close | №0862 |
| dndV708Open | №0862 |
| dndV708Reset | №0862 |
| dndV70ApiFilter | №0857 |
| dndV70CallAPI | №0857 |
| dndV70ClearErrors | №0857 |
| dndV70CloseDebug | №0857 |
| dndV70Export | №0857 |
| dndV70InspectSource | №0857 |
| dndV70ModuleFilter | №0857 |
| dndV70OpenDebug | №0857 |
| dndV70RefreshDebug | №0857 |
| dndV70RunHealthCheck | №0857 |
| dndV70SetAPIArgs | №0857 |
| dndV70SetAPIPath | №0857 |
| dndV70Tab | №0857 |
| dndV70UseAPI | №0857 |
| document | №1337 (+ 1 других файлов) |
| druidProgression | №0695 |
| enableDndDebugLogger | №0836 (+ 2 других файлов) |
| enableDndDebugRuntime | №0836 (+ 1 других файлов) |
| ensureDndToolsState | №1328 (+ 5 других файлов) |
| escapeDndHtml | №0630 (+ 3 других файлов) |
| EXTRA_BODY_RUNTIME | №0788 (+ 1 других файлов) |
| FEATS_PHB | №0750 |
| FEATS_SETTING | №0751 |
| FEATS_TCOE | №0752 |
| FEATS_UA_HOMEBREW | №0753 |
| FEATS_XGTE | №0754 |
| fetch | №1296 (+ 2 других файлов) |
| fighterProgression | №0698 |
| filterFeatsList | №0749 |
| geistProgression | №0697 |
| getAllBackgrounds | №0628 |
| getAvailableSubclasses | №0652 (+ 3 других файлов) |
| getCharacterCurrentLevel | №0784 |
| getCharacterLevel | №0784 (+ 3 других файлов) |
| getClassData | №0653 (+ 2 других файлов) |
| getCurrentInventoryWeightData | №0796 (+ 1 других файлов) |
| getDndRules | №0831 |
| getExpandedClassDefinition | №0779 |
| getExpandedClassPack | №0779 |
| getFormattedClassAndLevel | №0704 |
| getKibblesClassDisplayName | №0799 |
| getLevelByExp | №0784 |
| getProfBonusNum | №0652 (+ 2 других файлов) |
| getShifterBloodline | №0837 |
| getShifterBloodlines | №0837 |
| getShifterMaxCR | №0837 |
| getSpellcastingAbilityForClass | №0717 |
| getSpellCastingInfo | №0802 |
| getStatModNum | №0652 (+ 2 других файлов) |
| getSubclassData | №0717 (+ 1 других файлов) |
| getSubclassesForClass | №0653 |
| getSubclassFeaturesForLevel | №0774 |
| getSwarmDevourDamage | №0843 |
| getSwarmDevourDC | №0843 |
| getSwarmMutationSlots | №0843 |
| getSwarmState | №0843 |
| getVesselAspects | №0848 |
| getVesselSpellList | №0848 |
| getVesselSpirit | №0848 |
| GHOST_EXTRA | №0788 |
| ghostProgression | №0701 (+ 2 других файлов) |
| goToTab | №0652 |
| heavyWeapons | №0878 |
| Hero | №0790 |
| illriggerProgression | №0702 (+ 1 других файлов) |
| KIBBLES_CLASS_I18N | №0799 |
| KIBBLES_SOURCE_CATALOG | №0799 |
| KIBBLES_SOURCE_INFO | №0799 |
| kind | №0823 |
| listIntegratedExpandedClasses | №0779 |
| logs | №1339 |
| MARTYR_2024 | №0807 |
| MARTYR_BURDENS | №0807 |
| martyrProgression | №0705 (+ 1 других файлов) |
| martyrRuntime | №0807 |
| maxHpIncrease | №0704 |
| meleeWeapons | №0879 |
| monkProgression | №0707 |
| MULTICLASS_CLASS_REQUIREMENTS | №0779 (+ 2 других файлов) |
| MULTICLASS_PROFICIENCIES_2014 | №0717 (+ 1 других файлов) |
| MULTICLASS_REQUIREMENTS | №0790 |
| NECROMANCER_2024 | №0813 |
| NECROMANCER_SUBCLASSES | №0813 |
| necromancerProgression | №0709 (+ 1 других файлов) |
| necromancerRuntime | №0813 |
| nextInitiativeTurn | №0831 |
| OCCULTIST_KIBBLES_V11 | №0817 |
| occultistProgression | №0711 |
| occultistRuntime | №0817 |
| onerror | №0775 |
| onExpInputChange | №0784 |
| onFeatOrAsiChange | №0704 |
| onSubclassChange | №0704 |
| openAddFeatModal | №0749 |
| openCharacter | №0840 |
| openDndChangelog | №0819 |
| openDndNetworkModal | №0814 |
| openExperienceModal | №0784 |
| openFeatStatChoiceModal | №0749 |
| openIconSettingsModal | №0836 (+ 2 других файлов) |
| openLevelUpModal | №0704 |
| openLevelUpModalFromExp | №0784 |
| openSettingsModal | №0836 |
| paladinProgression | №0713 |
| PARASITE_EXTRA | №0820 |
| parasiteProgression | №0715 (+ 2 других файлов) |
| parasiteRuntime | №0820 |
| parseWeightToKg | №0796 (+ 1 других файлов) |
| pendingLevelUpData | №0704 |
| populateFeatModalList | №0749 |
| Prof_Acr | №0087 |
| Prof_Ani | №0087 |
| Prof_Arc | №0087 |
| Prof_Ath | №0087 (+ 1 других файлов) |
| Prof_Dec | №0087 |
| Prof_His | №0087 |
| Prof_Ins | №0087 |
| Prof_Inv | №0087 |
| Prof_Itm | №0087 |
| Prof_Med | №0087 |
| Prof_Nat | №0087 |
| Prof_Prc | №0087 |
| Prof_Prf | №0087 |
| Prof_Prs | №0087 |
| Prof_Rel | №0087 |
| Prof_Soh | №0087 |
| Prof_Stl | №0087 |
| Prof_Sur | №0087 |
| prompt | №1326 (+ 1 других файлов) |
| psionProgression | №0718 (+ 1 других файлов) |
| pugilistProgression | №0720 (+ 1 других файлов) |
| pugilistRuntime | №0783 |
| rangedWeapons | №0880 |
| rangerProgression | №0722 |
| refreshClassModalLocks | №0704 |
| refreshExtraClassPanels | №0785 |
| removeCharacterFeat | №0749 |
| renderClassFeatures | №0645 (+ 1 других файлов) |
| renderCombatAbilities | №0645 (+ 1 других файлов) |
| renderCompanions | №0831 |
| renderDndTools | №0777 (+ 2 других файлов) |
| renderGhostExtraPanel | №0785 |
| renderInitiativeTracker | №0787 (+ 11 других файлов) |
| renderInventory | №0085 (+ 13 других файлов) |
| renderParasiteExtraPanel | №0785 |
| renderSpellSlots | №0831 (+ 2 других файлов) |
| renderWalterParasitePanel | №0785 |
| renderWeapons | №0831 |
| requestAnimationFrame | №1458 (+ 18 других файлов) |
| resolveMulticlassProficiencyChoice | №0704 (+ 1 других файлов) |
| restorePactMagic | №0777 (+ 2 других файлов) |
| rogueProgression | №0724 |
| rollClassFeatureD20 | №0652 |
| rollClassFeatureDamage | №0652 |
| rollHpIncrease | №0704 |
| rollSingleDice | №0831 |
| RUNEKeeper_V12 | №0832 |
| runeKeeperDialects | №0832 |
| runeKeeperProgression | №0727 (+ 2 других файлов) |
| runeKeeperRuntime | №0783 (+ 1 других файлов) |
| SAVANT_V561 | №0833 |
| savantDisciplines | №0833 |
| savantProgression | №0728 (+ 2 других файлов) |
| savantRuntime | №0833 |
| saveAllCharacters | №1319 (+ 1 других файлов) |
| saveCharacter | №0085 (+ 5 других файлов) |
| saveCurrentCharacter | №0082 |
| saved | №1337 |
| savedDimBeforeHide | №0872 |
| saveNewCreatedCharacter | №0628 (+ 1 других файлов) |
| selectedBaseHp | №0704 |
| selectLauncherIcon | №0836 (+ 2 других файлов) |
| setCharacterLevel | №0836 (+ 2 других файлов) |
| setTimeout | №1326 (+ 1 других файлов) |
| SHIFTER_V21 | №0837 |
| shifterProgression | №0730 (+ 2 других файлов) |
| shifterRuntime | №0837 |
| showCustomAlert | №0796 (+ 1 других файлов) |
| SKILL_TO_VAR_MAP | №1339 |
| SKILLS_CONFIG | №0087 |
| sorcererProgression | №0732 |
| sortInitiativeTracker | №0842 (+ 1 других файлов) |
| specialWeapons | №0881 |
| SPELLBLADE_RUNTIME | №0839 |
| spellbladeProgression | №0839 |
| spells3lvl | №0767 |
| spells4lvl | №0768 |
| spells5lvl | №0769 |
| spells6Lvl | №0770 |
| spells8lvl | №0772 |
| spells9lvl | №0773 |
| spellsLevel1 | №0765 |
| spellsLevel2 | №0766 |
| spellsLevel7 | №0771 |
| startDndOnboarding | №0819 |
| SUBCLASSES_REFERENCE | №0082 (+ 6 других файлов) |
| subtractExperienceValue | №0784 |
| SWARM_EXTRA | №0843 |
| swarmProgression | №0734 (+ 2 других файлов) |
| swarmRuntime | №0843 |
| syncDndNetworkInitiative | №1328 (+ 4 других файлов) |
| syncLevelUI | №0704 |
| toggleClassFeatureDetails | №0652 |
| triggerCritEffect | №1343 |
| updateCharacterArmorClass | №1333 |
| updateCharacterSpellSlots | №0704 (+ 1 других файлов) |
| updateExperienceModalUI | №0784 |
| updateExtraClassCreationUI | №0650 |
| updateMagicData | №0802 |
| updateNetworkModeUI | №0814 |
| useBloodHunterFeature | №0645 |
| useClassFeature | №0652 |
| useFeat | №0786 |
| VESSEL_V4 | №0848 |
| vesselProgression | №0736 (+ 1 других файлов) |
| vesselRuntime | №0848 |
| VTT_PROJECT_MANIFEST_V70 | №0870 |
| WALTER_PARASITE_EXTRA | №0873 |
| walterParasiteProgression | №0738 (+ 2 других файлов) |
| WARDEN_MHP_2024 | №0875 |
| wardenProgression | №0739 (+ 1 других файлов) |
| warlockProgression | №0741 |
| WARLORD_LASERLLAMA_V330 | №0876 |
| warlordProgression | №0743 (+ 1 других файлов) |
| WEAPONS_DB | №0827 (+ 1 других файлов) |
| window | №1296 (+ 8 других файлов) |
| WITCH_MHP_2014 | №0783 |
| witchProgression | №0745 |
| witchRuntime | №0783 |
| wizardProgression | №0747 |

### Поля персонажа (101)

| Имя | Исходные файлы |
|---|---|
| ac | №0797 (+ 4 других файлов) |
| actionSurges | №0831 |
| activeConditions | №0651 (+ 5 других файлов) |
| activeFolderId | №0816 |
| anatomy | №0063 |
| appearance3d | №1273 (+ 1 других файлов) |
| baseAC | №0797 (+ 3 других файлов) |
| class | №0784 (+ 3 других файлов) |
| classes | №0790 (+ 7 других файлов) |
| classFeaturesState | №0777 (+ 1 других файлов) |
| className | №0704 (+ 2 других файлов) |
| clothing | №0063 (+ 1 других файлов) |
| coinLog | №0794 |
| coins | №0794 (+ 2 других файлов) |
| combatAbilities | №0651 (+ 1 других файлов) |
| combatAbilityStat | №0658 |
| companions | №0777 |
| con | №0704 |
| concentration | №0831 (+ 1 других файлов) |
| conditions | №0776 (+ 3 других файлов) |
| constitution | №0704 |
| craftingProfessions | №0673 |
| dead | №0651 (+ 1 других файлов) |
| deathSaves | №0659 (+ 4 других файлов) |
| defeated | №0777 (+ 3 других файлов) |
| encounters | №1227 |
| equipment | №0067 |
| equippedWeapon | №0827 (+ 1 других файлов) |
| exp | №0784 (+ 1 других файлов) |
| extraACBonus | №0831 |
| extraClassType | №0651 (+ 6 других файлов) |
| feats | №0704 (+ 2 других файлов) |
| featStatBonuses | №0749 |
| features | №0704 (+ 3 других файлов) |
| folders | №0816 |
| gender | №0063 (+ 1 других файлов) |
| ghost | №0788 |
| head | №0063 (+ 1 других файлов) |
| heroClass | №0840 |
| hostName | №0788 (+ 2 других файлов) |
| hp | №0651 (+ 4 других файлов) |
| hpCurrent | №0651 (+ 8 других файлов) |
| hpMax | №0651 (+ 5 других файлов) |
| hpTemp | №1326 |
| id | №0777 (+ 3 других файлов) |
| initiativeTracker | №0777 (+ 9 других файлов) |
| inspiration | №1326 |
| inventory | №0796 (+ 14 других файлов) |
| isExtraClass | №0704 (+ 5 других файлов) |
| kiPoints | №0717 (+ 1 других файлов) |
| lastRest | №0651 (+ 1 других файлов) |
| level | №0836 (+ 6 других файлов) |
| library | №0800 |
| libraryData | №0800 |
| morphChannels | №0068 (+ 2 других файлов) |
| multiclassAllowed | №0788 (+ 2 других файлов) |
| name | №0777 (+ 1 других файлов) |
| originRaceId | №0063 |
| pactMagic | №0777 (+ 2 других файлов) |
| pactMagicData | №0777 (+ 3 других файлов) |
| parasite | №0820 |
| pendingProficiencyChoices | №0717 |
| position | №1326 |
| predictorState | №0797 (+ 4 других файлов) |
| profBonus | №0840 |
| proficiencies | №0797 (+ 3 других файлов) |
| race | №0704 (+ 2 других файлов) |
| raceId | №0063 (+ 1 других файлов) |
| raceName | №0788 (+ 2 других файлов) |
| rageDamageBonus | №0717 |
| ragesCount | №0717 (+ 1 других файлов) |
| replacesRace | №0788 (+ 3 других файлов) |
| resistances | №1265 |
| resources | №0831 (+ 1 других файлов) |
| revision | №0657 (+ 1 других файлов) |
| savesData | №0628 (+ 2 других файлов) |
| secondWindUses | №0831 |
| skills | №0717 (+ 1 других файлов) |
| skillsData | №0628 (+ 5 других файлов) |
| skillValues | №0087 |
| skins | №0063 (+ 5 других файлов) |
| sneakAttackDice | №0717 |
| sorceryPoints | №0717 (+ 1 других файлов) |
| speed | №0788 (+ 3 других файлов) |
| spellcastingSources | №0717 (+ 1 других файлов) |
| spells | №0777 |
| spellsData | №0831 (+ 1 других файлов) |
| spellSlotsData | №0651 (+ 4 других файлов) |
| spellStat | №0717 |
| stats | №0790 (+ 12 других файлов) |
| subclass | №0717 (+ 1 других файлов) |
| swarm | №0704 (+ 1 других файлов) |
| tarotEffects | №1324 (+ 1 других файлов) |
| tarotKnowledge | №1324 |
| tempHp | №1265 |
| turnResources | №0777 (+ 1 других файлов) |
| unsaved | №1296 |
| valueOf | №0840 |
| walterParasite | №0704 (+ 1 других файлов) |
| weaponsData | №0651 |
| worldMatrices | №0063 (+ 3 других файлов) |

### Поля JS объектов (6518)

| Имя | Исходные файлы |
|---|---|
| _ | №1359 (+ 11 других файлов) |
| __base | №0077 |
| __bodyMasks | №1288 |
| __ceHeadFrame | №0062 |
| __ceNormals | №0062 (+ 3 других файлов) |
| __ceShapedPositions | №0062 (+ 3 других файлов) |
| __dirname | №1505 |
| __filename | №1505 |
| __floor | №0077 |
| __tarotChargeDouble | №0822 |
| __tarotShared | №0822 |
| __TEST_ASSERT__ | №1505 |
| _sent | №1436 |
| a | №0065 (+ 17 других файлов) |
| aal | №1258 |
| abdomen | №0063 |
| aberration | №0632 (+ 12 других файлов) |
| abilities | №0632 (+ 17 других файлов) |
| ability | №0081 (+ 19 других файлов) |
| abilityBonus | №0082 (+ 1 других файлов) |
| abilityBonuses | №0645 |
| abilityChanges | №0822 |
| abilityCheck | №0659 (+ 1 других файлов) |
| abilityCheckBonus | №0783 |
| abilityCheckHigherSpell | №0783 |
| abilityIncrease | №0780 |
| abilityMax | №0822 |
| abilityMin | №0822 |
| abilityScores | №1264 (+ 3 других файлов) |
| absorbedItems | №0843 |
| absorbedTempHp | №0842 |
| ac | №0628 (+ 69 других файлов) |
| academies | №0743 (+ 1 других файлов) |
| academy | №0780 (+ 1 других файлов) |
| academyFeature | №0780 |
| academyFeatures | №0743 |
| acBase | №0088 (+ 1 других файлов) |
| acBonus | №0780 (+ 7 других файлов) |
| acBonusAgainstTarget | №0783 |
| acBonusDie | №0783 |
| accent | №0836 |
| accept | №2333 |
| acceptedCategories | №0806 |
| acceptedTags | №0806 |
| access | №0674 |
| access_token | №0657 (+ 1 других файлов) |
| accessories | №0811 (+ 1 других файлов) |
| accessors | №1305 (+ 1 других файлов) |
| acEqualsSelf | №0783 |
| acFormula | №0088 |
| acid | №0082 (+ 2 других файлов) |
| Acid | №0084 |
| acidBomb | №0783 |
| acidReagent | №0830 |
| acolyteOfArms | №0783 |
| acOverride | №0815 (+ 1 других файлов) |
| acPenalty | №0082 |
| acReduction | №0783 |
| acrobatics | №0776 (+ 1 других файлов) |
| acSaveDamageBonus | №0783 |
| action | №0081 (+ 58 других файлов) |
| actionId | №0809 |
| actionOrBonusAction | №0783 |
| actionRequired | №0659 |
| actions | №0082 (+ 28 других файлов) |
| actionSpent | №0082 (+ 1 других файлов) |
| actionSurge | №0652 |
| actionSurges | №0698 |
| actionType | №0082 |
| activate | №1346 |
| activated | №0822 |
| activateLastStand | №0822 |
| active | №0645 (+ 32 других файлов) |
| ACTIVE | №0786 |
| activeCharacteristics | №0873 |
| activeConditions | №0628 (+ 9 других файлов) |
| activeEncounter | №0866 |
| activeEncounterId | №0865 (+ 1 других файлов) |
| activeId | №0866 |
| activeIndex | №0082 (+ 42 других файлов) |
| activeMutations | №0843 |
| activeOrgans | №0873 |
| activeProperties | №0084 |
| activeRage | №0652 (+ 1 других файлов) |
| activeRite | №0645 |
| activeShape | №1426 |
| activity | №0632 (+ 12 других файлов) |
| actor | №0787 (+ 2 других файлов) |
| actorId | №0823 (+ 4 других файлов) |
| actorName | №1388 |
| actual | №0858 |
| actWithArcaneAnathemaWhileDisabled | №0783 |
| adamantine | №0672 |
| adaptiveMalediction | №0783 |
| addClass | №0853 |
| addCombatantFromTemplate | №0659 |
| addConToEachDie | №0783 |
| addCreature | №0865 |
| addCustomLoot | №0811 (+ 1 других файлов) |
| addD4OnFailure | №0783 |
| addDamage | №0082 |
| addDie | №0783 |
| added | №0632 (+ 26 других файлов) |
| addEventListener | №0891 (+ 25 других файлов) |
| addExhaustion | №0831 |
| addFeat | №0853 |
| addFloor | №0075 |
| addInventory | №0853 |
| additionalFamiliar | №0817 |
| addLexiconRune | №0783 |
| addObject | №0075 |
| addProficiencyBonus | №0783 |
| addProfToAnathema | №0783 |
| addRecipe | №0671 |
| addSelected | №0865 |
| addSpell | №0853 |
| addToRoll | №0783 |
| addXP | №0674 |
| addZone | №0075 |
| adhesive | №0082 |
| adjustedXp | №0809 |
| adjustRiteDamage | №0645 |
| adjustSymbiosis | №0820 |
| adjustWeaponDamage | №0645 |
| adornment | №0674 |
| adrenaline | №0837 |
| adroitAnalysis | №0833 |
| adultAnatomy | №0070 |
| advancedRoguishCharm | №0783 |
| advancedTactics | №0783 |
| advancedTransformation | №0645 |
| advanceTime | №0082 (+ 1 других файлов) |
| advantage | №0082 (+ 14 других файлов) |
| advantageAgainst | №0783 |
| advantageAgainstFrightened | №0783 |
| advantageAgainstGrappled | №0783 |
| advantageAgainstTarget | №0783 |
| advantageAgainstWounded | №0780 |
| advantageAllAttacks | №0645 |
| advantageAllD20 | №0783 |
| advantageAttackRolls | №0783 |
| advantageAttacks | №0783 |
| advantageCharismaChecks | №0783 |
| advantageDexSave | №0783 |
| advantageFirstAttack | №0783 |
| advantageIfSameTarget | №0690 |
| advantageMagicalSaves | №0783 |
| advantageNextAttack | №0780 (+ 1 других файлов) |
| advantageNextSave | №0783 |
| advantageOnChecks | №0780 |
| advantageOnCon | №0780 |
| advantageOneAttackOrSave | №0783 |
| advantageOrDisadvantage | №0783 |
| advantagePerception | №0817 |
| advantageRecallFeyFiendsUndead | №0645 |
| advantageSaves | №0645 (+ 1 других файлов) |
| advantageSavesAgainst | №0783 |
| advantageSavingThrows | №0783 |
| advantageStealth | №0690 |
| advantageStr | №0783 |
| advantageStrength | №0082 |
| advantageTrackFeyFiendsUndead | №0645 |
| advantageVsIntimidation | №0780 |
| adventuringDiscipline | №0783 |
| advice | №0822 (+ 3 других файлов) |
| aether | №0645 |
| Aether | №0783 |
| aetherWalk | №0645 |
| affected | №0082 |
| affinities | №0848 |
| affinity | №1354 |
| afflictedDisadvantageEndSave | №0783 |
| afflictionControl | №0081 |
| african | №1310 |
| afro | №0065 (+ 1 других файлов) |
| after | №0783 (+ 1 других файлов) |
| afterActorAttack | №0645 |
| afterAttack | №0822 |
| afterAttackCost | №0783 |
| afterAttackThreeUnarmed | №0783 |
| afterCarousingAdvantage | №0783 |
| afterDamage | №0645 (+ 1 других файлов) |
| againstInterdicted | №0783 |
| age | №0628 (+ 2 других файлов) |
| ageAppearanceLocked | №0817 |
| ageless | №0783 |
| agePossessionSleepTransformImmunity | №0783 |
| AI_ALLOW_PAID_API | №1262 |
| AI_BASE_SHA | №1263 |
| AI_DEVELOPMENT_ENABLED | №1262 |
| ailment | №0783 |
| ailments | №0081 (+ 1 других файлов) |
| airCore | №0830 |
| airEssence | №0830 |
| alchemical | №0803 |
| alchemicalFat | №0830 |
| alchemicalReagentV49 | №0671 |
| alchemicalSavvy | №0652 |
| alchemist | №0674 (+ 5 других файлов) |
| alchemistActiveEffects | №1264 (+ 1 других файлов) |
| alchemistDebuffs | №1264 |
| alchemistDiscovered | №1265 |
| alchemistExplosionResistanceType | №1264 |
| alchemistGolem | №0082 |
| alchemistGolemOwner | №0082 |
| alchemistGrafts | №1264 |
| alchemistHomunculus | №0082 |
| alchemistHomunculusOwner | №0082 (+ 1 других файлов) |
| alchemistPoisonedWeaponId | №1264 |
| alchemistPreparedFormula | №1265 |
| alchemistSaveDC | №1264 |
| alchemistToxicVengeance | №1264 |
| alchemy | №0672 (+ 2 других файлов) |
| alchemyId | №0084 (+ 1 других файлов) |
| alchemyPoints | №0783 |
| alchemyTools | №0817 |
| alcoholRules | №0082 |
| ale | №0676 |
| alert | №1298 (+ 12 других файлов) |
| alerts | №1326 |
| aliases | №0081 (+ 13 других файлов) |
| all | №0779 (+ 1 других файлов) |
| ALL_RECIPES | №1297 (+ 1 других файлов) |
| allAttacksThisTurn | №0645 |
| allConcentrationSavesDisadvantage | №0645 |
| allDisciplines | №0780 |
| allies | №1375 |
| alliesTempHp | №0783 |
| allLanguages | №0783 |
| allowedForms | №0783 |
| allowFriendly | №0660 |
| allSeeing | №0875 |
| allSkills | №0813 |
| alluring | №0645 |
| Alluring | №0783 |
| ally | №1327 |
| allyACBonus | №0783 |
| allyAdvantage | №0780 |
| allyAdvantageAgainstMarkedPrey | №0783 |
| allyAttackOrDamageCantrip | №0783 |
| allyCharge | №0780 |
| allyCount | №0783 |
| allyDestination | №0823 (+ 2 других файлов) |
| allyFormation | №0780 |
| allyId | №0822 (+ 3 других файлов) |
| allyMoveReactionFt | №0783 |
| allyNextAddD8 | №0783 |
| allyReactionsUpTo | №0783 |
| allyReposition | №0780 |
| allySaveAdvantage | №0783 |
| allySaveAdvantageFt | №0783 |
| allySaveBonus | №0783 |
| allyStrDexSaveBonus | №0783 |
| allyTempHp | №0783 |
| allyWilling | №0823 (+ 2 других файлов) |
| allyWithinAura | №0659 (+ 1 других файлов) |
| allyWithinCourage | №0659 |
| almond | №0067 (+ 1 других файлов) |
| alpha | №0067 (+ 1 других файлов) |
| alphaCutoff | №0073 |
| alphaCutoffLoc | №0077 |
| alphaMode | №0073 |
| alphaModeLoc | №0077 |
| alpine | №0067 |
| alreadyCast | №0823 (+ 1 других файлов) |
| alreadyKnown | №0837 |
| alt | №0783 |
| altar | №0071 |
| alternateNecromancers | №0813 |
| alternateResourceIds | №0085 |
| altMin | №0750 |
| altStat | №0750 |
| alum | №0677 |
| alwaysPrepared | №0807 (+ 2 других файлов) |
| amount | №0085 (+ 35 других файлов) |
| amp | №0645 |
| amphibian | №0778 |
| amplified | №0645 (+ 1 других файлов) |
| amplifiedDamage | №0783 |
| amplifiedEffect | №0783 |
| amplifiedMoveFt | №0783 |
| amplifiedNextAttackAdvantage | №0783 |
| amplifiedRestoreSpellSlot | №0783 |
| amplify | №0645 (+ 4 других файлов) |
| amr | №1258 |
| analysisAction | №0833 |
| analyticalDefense | №0833 |
| anatomy | №0065 (+ 1 других файлов) |
| anatomyLevel | №0062 |
| anatomyProfile | №0070 |
| anatomyShape | №0062 |
| anatomySkin | №0062 |
| anatomyType | №0062 |
| anatomyVariant | №0062 |
| anatomyZones | №0062 |
| anchor | №0065 (+ 1 других файлов) |
| anchorPositions | №0065 (+ 1 других файлов) |
| anchors | №0813 |
| ancient_ruins | №0882 |
| ancientMalediction | №0783 |
| angle | №0065 |
| animalFrame | №0065 |
| animalHandling | №0776 (+ 1 других файлов) |
| animalHandlingDC | №0690 |
| animalProfile | №0065 (+ 6 других файлов) |
| animalSkin | №0065 |
| animateDead | №0813 |
| animateThralls | №0783 |
| animation | №0783 |
| animationId | №0069 (+ 1 других файлов) |
| animations | №0072 |
| ankhBlessing | №0813 |
| annotated | №0667 |
| anointedMagic | №0783 |
| antelope | №0070 |
| antialias | №0067 (+ 1 других файлов) |
| Antidote | №0084 |
| antiMagicAdvantage | №0813 |
| anvil | №0071 |
| anxious | №0645 |
| any | №0779 (+ 1 других файлов) |
| aoe | №0815 |
| aoeFt | №0645 |
| aoeLengthFt | №0815 |
| aoeRadiusFt | №0630 (+ 3 других файлов) |
| aoeShape | №0630 (+ 1 других файлов) |
| aoeWidthFt | №0815 |
| apathy | №0822 |
| ape | №0065 |
| apexPredator | №0783 |
| api | №1296 |
| apiArgs | №0857 |
| apiFilter | №0857 |
| apikey | №0657 |
| apiPath | №0857 |
| apis | №0857 |
| apothecary | №0071 (+ 1 других файлов) |
| apothecaryRejectsHammer | №1360 |
| app | №0864 (+ 1 других файлов) |
| appearance | №0064 (+ 3 других файлов) |
| appearance3d | №1296 |
| appearanceAgingStopped | №0817 |
| appearanceOpacity | №0070 |
| appendChild | №1357 (+ 8 других файлов) |
| applications | №0825 |
| applied | №0081 (+ 10 других файлов) |
| appliesCalcifyingStrike | №0783 |
| apply | №0846 |
| applyASI | №0831 |
| applyDamage | №0659 (+ 5 других файлов) |
| applyDamageBatch | №0659 |
| applyFromRound | №0822 |
| applyFullQuality | №0669 |
| applyMorphTargets | №0070 |
| applyOverchannel | №0815 |
| applyPotionEffect | №0082 |
| applyPreset | №0070 |
| applyQuality | №0671 |
| applyStaged | №0846 |
| applyVisibility | №0670 |
| applyWitchTouch | №0783 |
| arcana | №0776 (+ 1 других файлов) |
| arcanaSaveDC | №0783 |
| arcane | №0803 (+ 2 других файлов) |
| arcane_defender | №0786 |
| arcane_recovery_feat | №0786 |
| arcaneAnathema | №0783 |
| arcaneMastery | №0652 |
| arcaneReagentV49 | №0671 |
| arcaneRecovery | №0652 |
| arcaneShard | №0671 (+ 1 других файлов) |
| arcaneWard | №1415 |
| archaeologist | №0833 |
| archdruid | №0652 |
| archery | №0783 |
| archetype | №0783 (+ 1 других файлов) |
| archetypes | №0718 |
| archfey | №0645 |
| architect | №0783 |
| archon | №0848 |
| archonForm | №0848 |
| archons | №0848 |
| area | №0082 (+ 1 других файлов) |
| areaFt | №0082 (+ 1 других файлов) |
| areaRadiusFt | №0783 |
| areaSlime | №0082 |
| areaVulnerability | №0843 |
| arenaRoyale | №0720 |
| args | №1458 (+ 37 других файлов) |
| arm | №0065 |
| armament | №0081 (+ 1 других файлов) |
| armedAndAngry | №0783 |
| armLength | №0067 (+ 1 других файлов) |
| armor | №0065 (+ 64 других файлов) |
| armor_component | №0830 |
| armorBonus | №0669 |
| armorClass | №0678 (+ 1 других файлов) |
| armoredAC | №0783 |
| armorer | №0674 (+ 2 других файлов) |
| armorOfFaith | №0807 |
| armorProficiency | №0817 |
| armorTriangles | №0067 |
| armorWear | №1298 |
| armour | №0071 |
| armpitL | №0063 (+ 1 других файлов) |
| armpitR | №0063 |
| armReaction | №0822 |
| arms | №0067 (+ 3 других файлов) |
| arr | №0806 |
| arrayBuffer | №1269 (+ 5 других файлов) |
| arrestingStrike | №0783 |
| ArrowDown | №0074 |
| arrowheads | №0671 (+ 1 других файлов) |
| ArrowLeft | №0074 |
| ArrowRight | №0074 |
| ArrowUp | №0074 |
| art | №0836 |
| artificer | №0667 (+ 2 других файлов) |
| artOfWar | №0783 |
| ascended | №0848 |
| ascensionLevel | №0718 |
| asi | №0679 (+ 28 других файлов) |
| asian | №1310 |
| asleep | №0822 |
| aspect | №0783 (+ 1 других файлов) |
| assessItem | №0668 |
| asset | №1305 (+ 1 других файлов) |
| assetId | №0067 (+ 3 других файлов) |
| astral | №0067 |
| astralConstruct | №0783 |
| asymmetric | №0070 |
| at | №0065 (+ 17 других файлов) |
| at11 | №0718 |
| at17 | №0718 |
| athletics | №0776 (+ 2 других файлов) |
| atob | №1403 (+ 2 других файлов) |
| atStartOfTurn | №1350 (+ 1 других файлов) |
| attach | №0068 (+ 1 других файлов) |
| attached | №0082 |
| attachment | №0873 |
| attack | №0082 (+ 20 других файлов) |
| attackAbility | №0082 |
| attackAction | №0783 |
| attackAgainstMode | №0831 |
| attackBonus | №0082 (+ 9 других файлов) |
| attackBonusAdjustment | №0645 |
| attackCantripSwap | №0813 |
| attackChain | №0780 |
| attackContext | №0645 (+ 1 других файлов) |
| attackCount | №0659 (+ 3 других файлов) |
| attackCrit | №0813 |
| attackDamageBonus | №0669 |
| attackDisadvantage | №0082 (+ 2 других файлов) |
| attackDisadvantageUnlessTargetsSelf | №0783 |
| attackDistanceFt | №1350 |
| attacker | №0645 (+ 13 других файлов) |
| attackerId | №0082 (+ 9 других файлов) |
| attackerPeerId | №0815 |
| attackKind | №0659 (+ 7 других файлов) |
| attackModifier | №0837 |
| attackModifiers | №0082 (+ 17 других файлов) |
| attackOrSpell | №0783 |
| attackPenalty | №0082 (+ 1 других файлов) |
| attackReplaced | №1356 |
| attackResult | №0645 (+ 5 других файлов) |
| attackRoll | №0783 |
| attacks | №0659 (+ 8 других файлов) |
| attacksAgainst | №0831 |
| attackSequence | №0659 (+ 1 других файлов) |
| attacksHaveAdvantage | №0082 |
| attackSight | №0822 |
| attackTarget | №1350 |
| attackTotal | №0815 (+ 3 других файлов) |
| attackType | №0764 (+ 18 других файлов) |
| attitudeIndifferent | №0783 |
| attitudeShift | №0783 |
| attributeFilter | №0844 (+ 1 других файлов) |
| attributes | №0844 (+ 3 других файлов) |
| attrs | №1266 |
| atWill | №0783 |
| atWillSuppress | №0783 |
| auraDebuff | №0813 |
| auraHoldTheLine | №0783 |
| auraOfCourage | №0652 |
| auraOfProtection | №0652 |
| auraRangeFt | №0813 |
| auraSource | №0659 (+ 1 других файлов) |
| author | №0075 |
| authoritativeSubclasses | №0081 (+ 13 других файлов) |
| authorityEpoch | №0814 (+ 5 других файлов) |
| authorityId | №0814 (+ 3 других файлов) |
| authoritySnapshot | №0869 |
| auto | №0815 |
| autoAnimalHandlingRampage | №0690 |
| autoCheckForUpdates | №0846 |
| autoFailed | №0645 (+ 2 других файлов) |
| autoFailHexSave | №0783 |
| autoFailSaveUses | №0783 |
| autoFailStrDex | №0831 (+ 2 других файлов) |
| autognome | №0676 |
| autoHideMenuBar | №0890 |
| automaticAssembly | №0070 |
| autoPlans | №0815 |
| autoSaveCurrentCharacter | №1357 (+ 2 других файлов) |
| autoTrigger | №0082 |
| available | №0809 (+ 1 других файлов) |
| availableFeatures | №0665 |
| avatars | №0843 |
| avatarStorm | №0813 |
| avian | №0065 (+ 1 других файлов) |
| avoidDeath | №0783 |
| awakened | №0718 (+ 1 других файлов) |
| Awakened | №0799 |
| awakenedRune | №0783 |
| awakening | №0807 |
| axes | №0067 |
| AXES | №0070 |
| azure | №0836 |
| b | №0872 (+ 17 других файлов) |
| back | №0066 (+ 3 других файлов) |
| background | №0628 (+ 5 других файлов) |
| backgroundColor | №0890 |
| backLower | №0063 |
| backslash | №0078 (+ 1 других файлов) |
| backslashTexture | №0080 |
| BackTexture | №1320 |
| backup | №0856 (+ 1 других файлов) |
| backUpper | №0063 |
| bad | №1276 |
| badlands | №0882 |
| badlands_canyon | №0882 |
| badlands_crater | №0882 |
| badlands_glass | №0882 |
| balanceCp | №0803 |
| balanced | №0063 |
| balancePreserved | №1360 |
| balefulInterdict | №0702 |
| balefulPresence | №0783 |
| band | №0668 |
| bandHeight | №0066 |
| bandTile | №0066 |
| bandTogether | №0783 |
| banished | №0783 |
| banner | №0071 |
| bard | №0802 (+ 1 других файлов) |
| bardicInspiration | №0652 (+ 1 других файлов) |
| barrel | №0071 |
| barter | №1360 |
| barycentricOutsideTolerance | №1315 |
| base | №0073 (+ 5 других файлов) |
| baseAc | №0815 (+ 1 других файлов) |
| baseAC | №0628 (+ 2 других файлов) |
| baseAcFormula | №0828 |
| baseColorFactor | №0073 (+ 1 других файлов) |
| baseColorSampler | №0073 |
| baseColorTexture | №0073 |
| baseCp | №0805 |
| baseFeatures | №0875 |
| baseId | №0678 |
| baseModel | №0070 (+ 1 других файлов) |
| baseObj | №1316 (+ 2 других файлов) |
| basePositions | №0066 (+ 2 других файлов) |
| basePositionsSha256 | №1453 |
| baseQualityScore | №0668 |
| baseUrl | №1301 (+ 1 других файлов) |
| basilisk | №0690 |
| bastionOfOrder | №0783 |
| battleBoard | №0852 (+ 1 других файлов) |
| battleBoardView | №0864 |
| battlefield | №1296 (+ 21 других файлов) |
| battlefieldAnalysis | №0780 |
| battlefieldSupport | №0743 |
| Battlemage | №0799 |
| battleMagic | №0652 |
| battleOver | №0787 |
| bboxDiagonalRatio | №1318 |
| beakColor | №0070 (+ 1 других файлов) |
| beakSize | №0070 (+ 3 других файлов) |
| beakStyle | №0067 (+ 3 других файлов) |
| beard | №0067 (+ 3 других файлов) |
| bearingDegrees | №0822 |
| beast | №0633 (+ 2 других файлов) |
| beast_tamer | №0786 |
| beastCommand | №0780 |
| beastCompanion | №0652 |
| beastheart | №0661 |
| beastheartEndTurn | №0660 |
| beastheartLevel | №0690 |
| beastheartStartTurn | №0660 |
| Beasthide | №0799 |
| beastMaster | №0661 |
| beastShape | №0783 |
| beastSpells | №0652 |
| becomeGhost | №0783 |
| bed | №0071 |
| before | №0831 (+ 1 других файлов) |
| beforeAttack | №0822 |
| beforeRoll | №0659 |
| beginBlind | №0825 |
| beginConcentration | №0659 |
| beginInitial | №0825 |
| beginLastStand | №0822 |
| beginOwnTurn | №0825 |
| beginWager | №0825 |
| behavior | №1375 |
| belt | №0066 |
| bench | №0071 |
| benefits | №0783 |
| berserker_rage | №0786 |
| bestAxisPermutation | №1318 |
| bestiaryVersion | №0632 (+ 12 других файлов) |
| bigby | №0632 |
| bin_bytes | №1307 |
| binary | №1453 |
| binarySha256 | №1453 |
| bindHost | №0820 |
| binding | №0645 |
| bindOnCharnelSpend | №0813 |
| bindPositions | №0062 |
| bindShell | №0788 |
| biomass | №0820 |
| biomassGained | №0820 |
| biomassHealing | №0843 |
| black | №0872 |
| Black | №0780 (+ 1 других файлов) |
| blackmarket | №0805 (+ 1 других файлов) |
| blackRider | №0813 |
| blacksmith | №0803 |
| blastCoating | №0681 |
| blastDice | №0082 |
| blastWave | №0783 |
| blend | №0065 |
| blessGuidance | №0783 |
| blessLike | №0082 |
| blind | №0780 |
| blindBeyond | №0822 |
| blinded | №0822 (+ 1 других файлов) |
| blinding | №0783 |
| Blindness | №0084 |
| blindsense | №0652 |
| blindsight | №0873 |
| blindsightFt | №0783 (+ 1 других файлов) |
| bloatedAgony | №0645 |
| Blob | №1388 (+ 5 других файлов) |
| block | №0848 |
| blocked | №0659 (+ 3 других файлов) |
| blocksIncorporealMovement | №0783 |
| blocksMovement | №0078 |
| bloodAscendent | №0813 |
| bloodCost | №0817 |
| bloodCostPerSpellLevel | №0817 |
| bloodCurseActor | №0659 (+ 1 других файлов) |
| bloodCurseAmplify | №0659 (+ 1 других файлов) |
| bloodCurseDistanceFt | №0659 (+ 1 других файлов) |
| bloodCurseExposure | №0659 |
| bloodCurseOfCorrosion | №0645 |
| bloodCurseOfHowl | №0645 |
| bloodCurseOfTheExorcist | №0645 |
| bloodCurses | №0692 |
| bloodCurseTargetsBloodless | №0783 |
| bloodhawk | №0690 |
| bloodhoundBruisers | №0720 |
| bloodHunterPuppet | №0645 (+ 1 других файлов) |
| bloodiedButUnbowed | №0720 (+ 1 других файлов) |
| bloodline | №0837 (+ 1 других файлов) |
| bloodlines | №0837 |
| bloodlustAdvantage | №0783 |
| bloodMaledict | №0645 (+ 1 других файлов) |
| bloodPrice | №0702 |
| bloodPriceAura | №0783 |
| bloodRiteRevival | №0659 |
| bludgeoning | №0875 |
| blue | №0836 |
| blushColor | №0070 |
| blushOpacity | №1467 |
| bob | №0065 (+ 1 других файлов) |
| bodiesCount | №0082 (+ 1 других файлов) |
| bodiesSpent | №0082 |
| body | №0070 (+ 35 других файлов) |
| bodyAccessories | №0065 |
| bodyColor | №0070 (+ 9 других файлов) |
| bodyDefaults | №0070 |
| bodyDestroyed | №0873 |
| bodyH | №0063 (+ 2 других файлов) |
| bodyHorror | №0633 |
| bodyHP | №0873 |
| bodyMaxHP | №0873 |
| bodyName | №0873 |
| bodyPossession | №0813 |
| bodyPreset | №0063 |
| bodyStats | №0820 |
| bodyTint | №0070 (+ 1 других файлов) |
| bolsteringSuppression | №0783 |
| bomb | №0681 (+ 1 других файлов) |
| bombDamage | №0681 |
| bombFormulas | №0681 |
| bombImmunity | №0783 |
| bombs | №0681 |
| bondedTarget | №0783 |
| bondOfBloodthirst | №0783 |
| bondOwnerId | №0822 |
| bondPartnerId | №0822 |
| bonds | №0690 |
| bondWilling | №0823 (+ 2 других файлов) |
| bone | №0671 (+ 1 других файлов) |
| boneAsh | №0677 |
| boneSpurring | №0783 |
| boneStock | №0671 (+ 1 других файлов) |
| boneStockV49 | №0671 |
| bonus | №0082 (+ 66 других файлов) |
| bonusAC | №0783 |
| bonusAction | №0082 (+ 27 других файлов) |
| bonusActionAfflict | №0783 |
| bonusActionAttack | №0780 |
| bonusActionAttackAfterExploit | №0783 |
| bonusActionAttackAfterSpell | №0817 |
| bonusActionAttacks | №0783 |
| bonusActionDash | №0082 |
| bonusActionDisengageOrHide | №0783 |
| bonusActionDisengageOrSearch | №0783 |
| bonusActionExtraWeaponAttack | №0783 |
| bonusActionFear30 | №0783 |
| bonusActionOrder | №0783 |
| bonusActions | №0662 |
| bonusActionSeed | №0813 |
| bonusActionSupport | №0780 |
| bonusActionSupportOrder | №0783 |
| bonusActionUnarmedOrGrapple | №0783 |
| bonusActionWeaponAttack | №0645 |
| bonusAttack | №0645 (+ 3 других файлов) |
| bonusAttackAfterInvoke | №0783 |
| bonusAttackVsFrightened | №0783 |
| bonusCantrip | №0783 |
| bonusCharnelTouchAfterAttack | №0813 |
| bonusDamage | №0082 (+ 9 других файлов) |
| bonusDamageDice | №0783 |
| bonusDamageDie | №0783 |
| bonusDamageOnHit | №0783 |
| bonusDash | №0783 |
| bonusDie | №0817 |
| bonuses | №0088 (+ 6 других файлов) |
| bonusFireDamage | №0690 |
| bonusGrapple | №0783 |
| bonusHealing | №0783 |
| bonusHp | №0783 (+ 1 других файлов) |
| bonusHpDice | №0783 |
| bonusKnownSpells | №0783 |
| bonusMaxHP | №0783 |
| bonusMeleeAttack | №0783 |
| bonusSpell | №0817 |
| bonusSpells | №0817 |
| bonusSteps | №0813 |
| bonusStrDexConRolls | №0783 |
| bonusWeaponAttackAfterCantrip | №0783 |
| book | №0071 |
| bookshelf | №0071 |
| boon | №0783 |
| boots | №0066 (+ 1 других файлов) |
| bottle | №0071 |
| bottom | №0070 (+ 6 других файлов) |
| boundary | №0062 |
| bounds | №0065 (+ 2 других файлов) |
| bountiful_luck | №0786 |
| bovineEarSize | №0070 (+ 1 других файлов) |
| bowDamageBonus | №0783 |
| bowyer | №0674 |
| boxingTechnique | №0780 |
| bra | №0066 |
| braceUp | №0783 |
| braid | №0065 (+ 1 других файлов) |
| brainsOverBrawn | №0783 |
| bramble | №0082 |
| brambleBomb | №0783 |
| brand | №0783 |
| brandAllyDistanceFt | №0659 |
| brandCastigation | №0659 (+ 2 других файлов) |
| brandOfAxiom | №0645 |
| brandOfCastigation | №0645 (+ 1 других файлов) |
| brandOfSundering | №0645 |
| brandOfTethering | №0645 (+ 1 других файлов) |
| brandOfVoracious | №0645 |
| brandSappingScar | №0645 |
| brawling | №0783 |
| breakConcentration | №0659 |
| breastSize | №0067 (+ 2 других файлов) |
| Breathing | №0084 |
| brew | №0817 |
| brewer | №0674 (+ 3 других файлов) |
| brewMinutes | №0813 |
| briefs_female | №0066 |
| briefs_male | №0066 |
| brightLightFt | №0783 |
| brightLightRadiusFt | №0783 |
| broken | №0070 (+ 2 других файлов) |
| browHeight | №0070 |
| browRidge | №0070 |
| browser | №1446 |
| brutalCritical | №0652 |
| bt_a | №1427 |
| bt_ally | №1321 (+ 5 других файлов) |
| bt_b | №1427 |
| bt_enemy | №1321 (+ 6 других файлов) |
| bt_friend | №1326 |
| bt_own | №1340 |
| bt_owner | №1323 (+ 1 других файлов) |
| bt_self | №1321 (+ 5 других файлов) |
| btoa | №1403 (+ 2 других файлов) |
| bubbles | №0704 |
| budgets | №0063 |
| buf | №0077 |
| buff | №0822 |
| buffer | №1304 (+ 3 других файлов) |
| buffers | №0073 (+ 3 других файлов) |
| bufferView | №1304 (+ 3 других файлов) |
| bufferViews | №1305 (+ 1 других файлов) |
| build | №0062 (+ 3 других файлов) |
| buildAnimations | №0072 |
| builder | №0674 |
| buildFeatureSet | №0652 (+ 2 других файлов) |
| bulette | №0690 |
| bull | №0065 |
| bullMuzzleSize | №0070 (+ 1 других файлов) |
| bun | №0065 (+ 1 других файлов) |
| burden | №0807 (+ 1 других файлов) |
| Burned | №0783 |
| burning | №0082 (+ 1 других файлов) |
| burningTicks | №1264 |
| burstDamage | №0783 |
| burstRadiusFt | №0783 |
| buttocks | №0063 |
| buttonColor | №0066 (+ 2 других файлов) |
| buttons | №0066 (+ 3 других файлов) |
| buy | №0803 (+ 2 других файлов) |
| buyFactor | №0803 (+ 1 других файлов) |
| bypassesTempHP | №0807 |
| byteLength | №1304 (+ 3 других файлов) |
| byteOffset | №1304 (+ 3 других файлов) |
| bytes | №0846 (+ 8 других файлов) |
| bytesDone | №0846 (+ 2 других файлов) |
| bytesTotal | №0846 (+ 2 других файлов) |
| c | №0815 (+ 19 других файлов) |
| cabinet | №0071 |
| cache | №0846 (+ 2 других файлов) |
| cackle | №0783 |
| calcifyingStrike | №0783 |
| calculateAC | №0831 |
| calculatedCombustion | №0783 |
| calculatedFlourish | №0833 |
| calculateEncounter | №0809 |
| calculateMaxHP | №0843 |
| call | №1356 |
| callAPI | №0857 |
| callFromBelow | №0783 |
| calligrapher | №0674 (+ 2 других файлов) |
| callOfIron | №0783 |
| calls | №0875 (+ 2 других файлов) |
| callToHavok | №0783 |
| campaign | №0852 |
| campaignEvent | №0787 |
| campaignEvents | №1377 |
| campaigns | №0646 |
| canAncestorAttack | №0822 |
| canApplyNatively | №0846 |
| canBarter | №0805 |
| canBecomeHuge | №0783 |
| canBurnSealForBlind | №0783 |
| canCaptureHost | №0820 |
| canCast | №0822 |
| cancel | №0890 |
| cancelReaction | №0822 |
| canCounter | №0783 |
| canCraftRecipe | №0674 |
| canDisassemble | №0669 |
| candle | №0071 |
| canEnterHost | №0820 |
| canHear | №1350 |
| canid | №0778 |
| canMerge | №0843 |
| canMove | №0822 |
| cannotBecomeRitual | №0817 |
| cannotLie | №0822 |
| cannotSurprise | №0780 |
| CANONICAL_2024_SUBCLASSES | №0082 |
| canopicJars | №0813 |
| canReceiveHealing | №0788 (+ 1 других файлов) |
| canRepair | №0669 |
| canRestHealBody | №0788 (+ 2 других файлов) |
| canSee | №0822 |
| canTarget0Hp | №0783 |
| cantrip | №0082 (+ 3 других файлов) |
| cantrips | №0645 (+ 4 других файлов) |
| cantripsByLevel | №0813 |
| cantripsKnown | №0711 (+ 2 других файлов) |
| canWalk | №0075 |
| cap | №0066 |
| capaciousAnathema | №0783 |
| capacity | №0783 (+ 4 других файлов) |
| capacityByLevel | №0817 |
| capacityFt3 | №0817 |
| capColor | №0070 (+ 1 других файлов) |
| cape | №0066 |
| capeWidth | №0066 |
| capSize | №0070 (+ 1 других файлов) |
| captain | №0743 (+ 1 других файлов) |
| capture | №0867 |
| capturedAt | №0820 |
| captureHost | №0820 |
| caravan | №0803 (+ 2 других файлов) |
| caravan_master | №0805 (+ 1 других файлов) |
| card | №0825 |
| cardId | №0822 |
| cards | №0825 (+ 2 других файлов) |
| careful | №0652 |
| carpenter | №0673 (+ 5 других файлов) |
| carried | №0810 |
| carryCapacity | №0817 |
| carryingCapacityMultiplier | №0783 |
| cart | №0071 |
| cartographer | №0672 (+ 5 других файлов) |
| cartographyQuality | №0675 |
| case | №0652 (+ 2 других файлов) |
| cases | №2329 (+ 1 других файлов) |
| castAsRitual | №0817 |
| caster | №0659 (+ 3 других файлов) |
| casterId | №0823 (+ 2 других файлов) |
| casterLevel | №0802 (+ 2 других файлов) |
| castIllriggerActionSpell | №0783 |
| castingClass | №0815 (+ 5 других файлов) |
| castingStat | №0815 (+ 4 других файлов) |
| castingTime | №0764 (+ 16 других файлов) |
| castLucidSpellFree | №0783 |
| castSpell | №0783 (+ 1 других файлов) |
| castSpellInAttack | №0783 |
| castWish | №0783 |
| cat | №0065 (+ 21 других файлов) |
| cataclysm | №0848 |
| cataclysmicStrike | №0783 |
| catalog | №0632 (+ 27 других файлов) |
| catalogKey | №0823 (+ 2 других файлов) |
| catalyst | №0084 (+ 1 других файлов) |
| catalystId | №0084 |
| catalystReagent | №0830 |
| catalysts | №0083 (+ 1 других файлов) |
| catEarSize | №0070 (+ 2 других файлов) |
| categories | №0806 |
| category | №0078 (+ 50 других файлов) |
| catMuzzleSize | №0070 (+ 3 других файлов) |
| caucasian | №1310 |
| cauldron | №0071 (+ 1 других файлов) |
| causal | №0832 |
| ceilingCollision | №0822 |
| celerity | №0645 |
| Celerity | №0783 |
| celestial | №0067 (+ 14 других файлов) |
| celestialDiscourse | №0783 |
| celestialStance | №0783 |
| cell | №0075 (+ 1 других файлов) |
| cellFt | №0865 (+ 20 других файлов) |
| cellPx | №1406 |
| cellSize | №1313 |
| censurePeacemaker | №0783 |
| centaur | №1479 |
| centaurIndices | №0065 |
| centaurSize | №0070 (+ 2 других файлов) |
| center | №0065 (+ 14 других файлов) |
| centerY | №0062 |
| ceramic | №0672 (+ 2 других файлов) |
| cha | №0628 (+ 52 других файлов) |
| chaChecksAdvantage | №0783 |
| chaChecksDisadvantage | №0645 (+ 1 других файлов) |
| chain | №0082 |
| chainReport | №0671 |
| chair | №0071 |
| championCalls | №0739 |
| chance | №0778 (+ 3 других файлов) |
| chandelier | №0071 |
| changedVertices | №1309 |
| changeShape | №0817 |
| channel | №0814 (+ 3 других файлов) |
| channelDivinity | №0652 (+ 3 других файлов) |
| channels | №0072 |
| chant | №0832 |
| character | №0810 (+ 6 других файлов) |
| characterId | №0070 (+ 33 других файлов) |
| characterName | №1403 |
| characters | №0657 (+ 2 других файлов) |
| charcoal | №0672 (+ 3 других файлов) |
| charcoalFine | №0677 |
| charge | №0783 |
| chargeOnDeflect | №0082 |
| charges | №0652 (+ 2 других файлов) |
| chargesMax | №0652 |
| chargesSpent | №0082 (+ 1 других файлов) |
| chargeTempHP | №0783 |
| chargeWeapon | №0082 |
| charisma | №0790 (+ 10 других файлов) |
| charismaChecksAdvantage | №0645 |
| charismaReferencesUse | №0783 |
| charmed | №0822 (+ 2 других файлов) |
| charmedHours | №0783 |
| charmEffect | №0659 |
| charmOrCompel | №0783 |
| charmSourceId | №0822 |
| charnelHitThreshold | №0813 |
| charnelTouch | №0813 |
| charnelTouchMax | №0813 |
| charnelTouchSpendMax | №0813 |
| chaSave | №0783 |
| chaSavesDisadvantage | №0645 (+ 1 других файлов) |
| chat_nickname | №1258 |
| cheapShot | №0783 |
| check | №0783 (+ 2 других файлов) |
| checkAndStage | №0846 |
| checkBonus | №0674 (+ 1 других файлов) |
| checkBonusAll | №0676 |
| checked | №1329 (+ 1 других файлов) |
| checkMageTrack | №0822 |
| checkModifiers | №0082 (+ 6 других файлов) |
| checkResult | №1356 |
| checks | №0783 (+ 1 других файлов) |
| cheekbones | №0067 (+ 1 других файлов) |
| chef | №0676 |
| chest | №0063 (+ 6 других файлов) |
| chestShape | №1267 |
| Chieftain | №0799 |
| childAppearance | №0822 |
| childList | №0796 (+ 5 других файлов) |
| children | №1270 (+ 2 других файлов) |
| chinLength | №0067 (+ 1 других файлов) |
| chitin | №0830 |
| chitinPlate | №0671 (+ 1 других файлов) |
| choice | №0815 (+ 4 других файлов) |
| choiceMode | №0825 |
| choices | №0645 (+ 2 других файлов) |
| choiceSaved | №0875 (+ 1 других файлов) |
| choose | №0679 (+ 23 других файлов) |
| chooseAnyAilments | №0783 |
| chooseBeforeRoll | №0783 |
| chooseBond | №0690 |
| chooseCompanion | №0690 |
| chooseCraft | №0783 |
| chooseGrandHex | №0783 |
| chooseHex | №0783 |
| chooseKnown | №0645 |
| chooseMovement | №0082 |
| chooseResistance | №0082 |
| chooseSavingThrowProficiency | №0783 |
| chooseSpecialization | №0674 |
| chosenCreatureId | №0081 (+ 1 других файлов) |
| cinzel | №0836 |
| circumcised | №0063 |
| cl | №0077 |
| claimReward | №0822 |
| claimWagerReward | №0825 |
| clairvoyance | №0780 |
| clandestineSource | №0783 |
| class | №0628 (+ 3 других файлов) |
| CLASS | №0645 |
| CLASS_NAMES | №0652 |
| classAbilities | №0783 |
| classBonus | №0659 (+ 1 других файлов) |
| classes | №0790 (+ 47 других файлов) |
| CLASSES_REFERENCE | №1444 |
| classFeatureIds | №0815 (+ 5 других файлов) |
| classFeatureNotes | №0659 (+ 1 других файлов) |
| classFeaturesState | №0082 (+ 21 других файлов) |
| classKey | №0831 |
| classLevel | №0831 |
| classList | №1306 |
| className | №0628 (+ 56 других файлов) |
| clawColor | №0070 |
| clawSize | №0070 (+ 2 других файлов) |
| clay | №0672 (+ 2 других файлов) |
| cleanHead | №0070 |
| cleansed | №0822 |
| cleansingTouch | №0652 |
| clear | №0073 (+ 6 других файлов) |
| clearTimeout | №0667 (+ 5 других файлов) |
| cleric | №0802 (+ 1 других файлов) |
| clientId | №0814 (+ 5 других файлов) |
| clientX | №0867 (+ 1 других файлов) |
| clientY | №0867 (+ 1 других файлов) |
| climb | №0813 |
| climbSpeed | №0082 (+ 1 других файлов) |
| clingingCurse | №0783 |
| clone | №0075 (+ 1 других файлов) |
| close | №0067 (+ 9 других файлов) |
| closed | №0793 |
| closedChains | №0671 |
| closeReplay | №0851 |
| closet | №0071 |
| cloth | №0671 (+ 4 других файлов) |
| clothes | №1493 |
| clothing | №0066 (+ 18 других файлов) |
| clothingBuilds | №0067 |
| clothingId | №0066 |
| clothingTriangles | №0067 |
| cloudId | №0657 |
| cloudScope | №0064 |
| cls | №0652 |
| club | №1353 |
| coast | №0803 (+ 1 других файлов) |
| coast_caves | №0882 |
| coast_cliffs | №0882 |
| coast_grotto | №0882 |
| cobbler | №0674 (+ 3 других файлов) |
| code | №1296 |
| coins | №1362 (+ 3 других файлов) |
| col | №0077 (+ 1 других файлов) |
| cold | №0645 (+ 2 других файлов) |
| Cold | №0084 |
| collar | №0066 |
| collect | №0810 (+ 3 других файлов) |
| collectiveBody | №0843 |
| collectLoot | №0787 |
| color | №0063 (+ 9 других файлов) |
| colors | №0077 (+ 2 других файлов) |
| cols | №0082 (+ 21 других файлов) |
| column | №0855 |
| combat | №0852 (+ 1 других файлов) |
| combatant | №0660 |
| combatantId | №0787 (+ 2 других файлов) |
| combatants | №0082 (+ 52 других файлов) |
| combatEnd | №0822 |
| combatHooks | №0711 |
| combatInsight | №0817 |
| combatInspiration | №0652 |
| combatLog | №0869 |
| combatMasteries | №0702 |
| combatMastery | №0702 (+ 1 других файлов) |
| combatOnly | №0822 |
| combatTurnGate | №0690 |
| combineDisciplines | №0783 |
| combustion | №0783 |
| command | №0660 (+ 3 других файлов) |
| commandable | №0783 |
| Commander | №0799 |
| commandFamiliarAndUndeadTogether | №0783 |
| commandRangeMultiplier | №0780 |
| commands | №0783 |
| commandSpellsWithoutSlot | №0813 |
| commandWithoutFear | №0780 |
| commit | №1453 (+ 1 других файлов) |
| commitHostEvent | №1349 (+ 7 других файлов) |
| committed | №0669 |
| common | №0797 (+ 5 других файлов) |
| commonPeopleBonus | №0783 |
| companion | №0082 (+ 4 других файлов) |
| companionACBonus | №0690 |
| companionAction | №0780 |
| companionActor | №0690 |
| companionAttack | №0780 |
| companionDamage | №0780 |
| companionExtraAttack | №0780 |
| companionMagicAttacks | №0780 |
| companionRampage | №0780 |
| companionResistance | №0690 |
| companions | №0690 |
| companionType | №0082 (+ 2 других файлов) |
| compareVersions | №0846 |
| compatibility | №0846 |
| completeAttack | №0839 |
| components | №0072 (+ 14 других файлов) |
| componentType | №1304 (+ 3 других файлов) |
| compositeTerms | №1504 |
| compositions | №1453 |
| compressionLock | №0783 |
| con | №0628 (+ 55 других файлов) |
| concealPsionics | №0783 |
| concentration | №0659 (+ 31 других файлов) |
| concentrationCheck | №0659 |
| concentrationDC | №0831 |
| concentrationSaveBonus | №0783 |
| concentrationState | №0659 |
| concussion | №0082 |
| concussionBomb | №0783 |
| condition | №0082 (+ 11 других файлов) |
| conditionApplied | №0783 |
| conditionChoice | №0690 |
| conditionImmune | №0645 |
| conditionImmunity | №0783 |
| conditionLabel | №0668 |
| conditionModeApplied | №0659 |
| conditionModifiers | №0831 (+ 2 других файлов) |
| conditionNotes | №1343 |
| conditionRemoved | №0875 |
| conditions | №0659 (+ 17 других файлов) |
| CONDITIONS | №0659 (+ 2 других файлов) |
| conditionsImmune | №0662 |
| coneWisdomSave | №0783 |
| config | №0854 |
| configurable | №0822 |
| configure | №0657 |
| configured | №0657 (+ 1 других файлов) |
| confirm | №1266 (+ 3 других файлов) |
| conflict | №0083 (+ 2 других файлов) |
| conflicts | №0657 |
| connected | №0814 (+ 2 других файлов) |
| conSave | №0783 |
| conscious | №0822 |
| console | №1306 (+ 1 других файлов) |
| constant | №0659 (+ 7 других файлов) |
| constitution | №0790 (+ 12 других файлов) |
| Constitution | №0084 |
| constitutionHalfDamageFailure | №0783 |
| constitutionHalfDamageSuccess | №0783 |
| constitutionMaxBonus | №0783 |
| construct | №0632 (+ 12 других файлов) |
| constructBody | №0813 |
| constructConcentration | №0783 |
| constructDamageBonus | №0783 |
| constructMode | №0783 |
| consumableFunctional | №1360 |
| consumables | №0797 (+ 31 других файлов) |
| consume | №0676 (+ 1 других файлов) |
| consumed | №0676 (+ 2 других файлов) |
| consumedPotion | №0082 |
| consumeLairAction | №0809 |
| consumeLegendaryAction | №0809 |
| consumeLegendaryResistance | №0809 |
| consumeMageBerry | №0822 |
| consumeMagicMeleeWeapon | №0783 |
| consumeMaximum | №0822 |
| consumeOn | №0822 |
| consumePendingOnHit | №0652 (+ 1 других файлов) |
| consuming | №0718 (+ 1 других файлов) |
| Consuming | №0799 |
| consumption | №0783 |
| container | №0793 |
| containerId | №1331 |
| containerRequired | №0783 |
| containers | №0810 (+ 6 других файлов) |
| containerType | №0793 |
| content | №0075 (+ 1 других файлов) |
| contentPackId | №0082 (+ 6 других файлов) |
| contents | №0793 (+ 6 других файлов) |
| contentType | №1469 |
| context | №0659 (+ 1 других файлов) |
| contextIsolation | №0890 |
| contextRestore | №1466 |
| contingencyPlan | №0783 |
| contracts | №0702 |
| controlMode | №0082 (+ 5 других файлов) |
| controlWithoutAction | №0783 |
| controlWithSameAction | №0783 |
| conversant | №0645 |
| Conversant | №0783 |
| convertDamage | №0817 |
| cook | №0674 (+ 5 других файлов) |
| coordinatedAssault | №0783 |
| copper | №0677 |
| copy | №0662 |
| copyDeleted | №0657 |
| core | №0799 |
| CORE | №0652 |
| core_2014 | №0632 |
| coreLoop | №0711 |
| corpseFlorist | №0813 |
| corpseId | №0813 |
| corpseTypes | №0783 |
| corrosion | №0645 (+ 1 других файлов) |
| corset | №1277 |
| cost | №0082 (+ 36 других файлов) |
| costGp | №0803 (+ 4 других файлов) |
| costs | №0628 (+ 1 других файлов) |
| cot | №0071 |
| cotton | №0066 (+ 1 других файлов) |
| counselorProtege | №0783 |
| count | №0065 (+ 64 других файлов) |
| counter | №0071 |
| counterAttackIfReducedToZero | №0783 |
| countercharm | №0652 |
| countered | №0815 |
| countsAsHit | №0783 |
| courageSource | №0659 |
| coven | №0817 |
| covens | №0711 |
| cover | №0815 (+ 6 других файлов) |
| coverBonus | №0815 (+ 1 других файлов) |
| covered | №0063 |
| coversTop | №0066 |
| cp | №0794 (+ 8 других файлов) |
| cr | №0632 (+ 18 других файлов) |
| craft | №0783 (+ 5 других файлов) |
| craftBonus | №0812 |
| craftCheck | №0675 (+ 1 других файлов) |
| craftDC | №0675 (+ 1 других файлов) |
| crafted | №0084 (+ 5 других файлов) |
| craftedOnly | №0797 |
| craftEffect | №0675 |
| craftFeature | №0783 |
| craftingBonus | №0667 (+ 3 других файлов) |
| craftingMaterial | №0668 |
| craftingProfessions | №0673 (+ 2 других файлов) |
| craftingProfile | №0676 |
| craftingSources | №0676 |
| craftMasterworkBonus | №0669 (+ 2 других файлов) |
| craftMaterialId | №0632 (+ 14 других файлов) |
| craftOutcome | №0676 (+ 1 других файлов) |
| craftProfession | №0675 (+ 1 других файлов) |
| craftQuality | №0669 (+ 6 других файлов) |
| craftQualityLabel | №0678 |
| craftRecipe | №0672 (+ 3 других файлов) |
| craftRoll | №0678 |
| CRAFTS | №0783 |
| craftTags | №0671 |
| craftTime | №0672 (+ 2 других файлов) |
| craftTools | №0672 |
| craftValue | №0675 (+ 1 других файлов) |
| craftValueNote | №0669 |
| crate | №0071 |
| create | №0080 (+ 7 других файлов) |
| createAvatar | №0843 |
| createBodyStatBlock | №0873 |
| createBoneObject | №0783 |
| createCharacter | №0070 |
| created | №0783 (+ 1 других файлов) |
| createdAt | №0075 (+ 8 других файлов) |
| createdAtTurn | №0082 |
| createElement | №1266 (+ 23 других файлов) |
| createFor | №0661 (+ 2 других файлов) |
| createHostStatBlock | №0820 |
| createLarvaStatBlock | №0820 |
| createObjectURL | №1406 |
| createOozeDuplicate | №0082 |
| createProjectedItem | №0783 |
| createRoom | №1403 |
| createShell | №0788 |
| creationOptions | №0822 |
| creator | №0799 |
| creatorMind | №0783 |
| creatures | №0843 |
| creatureType | №0650 (+ 12 других файлов) |
| crescendoOfViolence | №0783 |
| crest | №0065 |
| crestSize | №0070 (+ 1 других файлов) |
| crewLeader | №0783 |
| crewRangeFt | №0783 |
| crewSaveBonus | №0783 |
| crewSize | №0783 |
| crewSupport | №0780 |
| criminalContact | №0783 |
| crimson | №0836 |
| crimsonRite | №0645 |
| crimsonRites | №0692 |
| cripplingJinx | №0783 |
| cripplingStrike | №0783 |
| critFearAoEFt | №0645 |
| critical | №0659 (+ 35 других файлов) |
| critical_failure | №0668 (+ 1 других файлов) |
| criticalDoubles | №0783 (+ 1 других файлов) |
| criticalHit | №0783 |
| criticalOn | №0780 |
| criticalOnHit | №0783 |
| criticalRange | №0652 (+ 2 других файлов) |
| criticalSpellcasting | №0813 |
| critRange | №0645 |
| critWithRiteRestoresBloodMaledict | №0783 |
| crLimit | №0783 |
| crone | №0813 |
| crop | №0065 |
| crow | №0065 |
| crown | №0065 (+ 1 других файлов) |
| crown_braid | №0065 (+ 1 других файлов) |
| crownColor | №0070 (+ 1 других файлов) |
| crownSize | №0070 (+ 3 других файлов) |
| crScale | №0082 |
| crTotal | №0813 |
| cruelty | №0645 |
| Cruelty | №0783 |
| cryo | №0082 |
| cryoBomb | №0783 |
| crypto | №1271 (+ 25 других файлов) |
| crystal | №0672 (+ 3 других файлов) |
| cssText | №1326 |
| ctx | №0077 (+ 1 других файлов) |
| cube | №0690 |
| cunningAction | №0652 |
| cunningInstinct | №0783 |
| cupNumber | №0822 (+ 3 других файлов) |
| cups | №0066 (+ 2 других файлов) |
| cups_05 | №0822 |
| cups_13 | №0822 |
| cupsize | №1310 |
| curl | №0065 |
| curly_long | №0065 (+ 1 других файлов) |
| curly_short | №0065 (+ 1 других файлов) |
| current | №0075 (+ 34 других файлов) |
| currentCampaignId | №0646 |
| currentChar | №1357 (+ 5 других файлов) |
| currentCharacter | №1376 |
| currentFloor | №0075 |
| currentHP | №0788 (+ 3 других файлов) |
| currentId | №0851 |
| currentLevel | №0674 |
| currentVersion | №0846 |
| curse | №0081 (+ 10 других файлов) |
| curseAbility | №0081 |
| curseAbilityCheckDC | №0783 |
| curseBonusDamage | №0645 |
| curseCombination | №0783 |
| curseConcentrationAdvantage | №0817 |
| cursed | №0067 (+ 1 других файлов) |
| cursedAttackPenalty | №0645 |
| cursedCheckModifiers | №0645 |
| curseDetection30 | №0783 |
| cursedSaveModifiers | №0645 |
| curseImmunity | №0783 |
| curseItem | №0817 |
| curseMastery | №0780 |
| curseName | №0783 |
| cursePenalty | №0813 |
| cursePower | №0780 |
| curses | №0645 (+ 4 других файлов) |
| CURSES | №0783 |
| curseSave | №0813 |
| curseSpecialist | №0645 |
| curseSpells | №0783 |
| curseTarget | №0783 |
| custom | №0070 (+ 2 других файлов) |
| customColor | №0065 (+ 2 других файлов) |
| customCrafted | №0678 |
| customDress | №0066 |
| CustomEvent | №1306 (+ 1 других файлов) |
| customizations | №1275 (+ 1 других файлов) |
| customShirt | №0066 |
| customSkirt | №0066 |
| cut | №0066 (+ 2 других файлов) |
| cutoff | №1504 |
| cwd | №1263 (+ 3 других файлов) |
| cx | №0062 (+ 2 других файлов) |
| cycles | №0829 (+ 1 других файлов) |
| cz | №0065 (+ 1 других файлов) |
| d | №0062 (+ 6 других файлов) |
| d2 | №1312 (+ 2 других файлов) |
| d20 | №0659 (+ 2 других файлов) |
| d20Modifiers | №0822 |
| d6 | №0082 |
| damage | №0078 (+ 89 других файлов) |
| DAMAGE_TYPES | №0659 |
| damageAfter | №0783 |
| damageAtTurnStart | №0082 |
| damageBefore | №0783 |
| damageBody | №0820 (+ 1 других файлов) |
| damageBonus | №0783 (+ 1 других файлов) |
| damageBonusMultiplier | №0783 |
| damageBoost | №0780 |
| damageContext | №0815 |
| damageDice | №0082 (+ 14 других файлов) |
| damageDie | №0780 (+ 1 других файлов) |
| damageDoubled | №0659 |
| damageDurability | №0670 |
| damageImmunity | №0783 |
| damageModifiers | №0645 (+ 1 других файлов) |
| damageMult | №0843 |
| damageOnFailedSave | №0783 |
| damageParts | №0645 (+ 6 других файлов) |
| damagePer10Ft | №0783 |
| damagePerTrigger | №0783 |
| damageRedirect | №0817 |
| damageReduction | №0652 (+ 4 других файлов) |
| damageResistance | №0780 (+ 1 других файлов) |
| damageResult | №0659 (+ 1 других файлов) |
| damageRoll | №0082 (+ 4 других файлов) |
| damageRolled | №0822 |
| damageSelf | №0783 |
| damageShell | №0788 |
| damageTaken | №0659 |
| damageType | №0082 (+ 84 других файлов) |
| damageTypeChoice | №0783 |
| damageTypes | №0082 (+ 5 других файлов) |
| danceBonusByCount | №0813 |
| dangerSense | №0652 |
| daringRescue | №0783 |
| dark | №0872 |
| darkArcana | №0813 |
| darkAugmentation | №0645 |
| darkCaptain | №0783 |
| darkDelirium | №0815 |
| darkMagic | №0780 |
| darkness | №0075 (+ 1 других файлов) |
| darknessAroundInterdictedFt | №0783 |
| darkOneDiscourse | №0783 |
| darkOnesBlessing | №0652 |
| darkvision | №0837 |
| darkvision60 | №0783 |
| darkvisionBonusFt | №0645 |
| darkvisionFt | №0645 (+ 1 других файлов) |
| dash | №0780 |
| dashMageRetreat | №0822 |
| dastardlyTalents | №0783 |
| data | №0081 (+ 10 других файлов) |
| dataset | №1291 |
| date | №0646 (+ 1 других файлов) |
| dauntless | №0743 |
| dawn | №0645 |
| day | №0077 |
| dc | №0081 (+ 45 других файлов) |
| dcReduction | №0676 |
| dead | №0082 (+ 6 других файлов) |
| deadMistAcolyte | №0813 |
| deadShell | №0788 |
| deadSpace | №0783 (+ 1 других файлов) |
| deadSpaceSlots | №0813 |
| deafened | №0082 (+ 1 других файлов) |
| deathAfterDuration | №0783 |
| deathCause | №1265 |
| deathExplosion | №0813 |
| deathKnight | №0813 |
| deathPenalty | №0783 |
| deathSave | №0659 |
| deathSaveDisadvantage | №0645 (+ 1 других файлов) |
| deathSaveFailures | №0659 |
| deathSaves | №0659 (+ 6 других файлов) |
| deathWard | №0817 |
| debug | №0852 |
| decayPerHour | №0082 |
| deception | №0776 (+ 1 других файлов) |
| deceptionBlocked | №0822 |
| deceptionIntent | №1344 |
| deceptionTotal | №0082 (+ 1 других файлов) |
| deck | №0825 (+ 1 других файлов) |
| decks | №0825 |
| declaredSourceCommit | №1504 |
| decorateItem | №0674 |
| deepSleeper | №0783 |
| deerHide | №0677 |
| default | №0070 (+ 2 других файлов) |
| DEFAULT | №0075 |
| DEFAULT_ENABLED | №0670 |
| DEFAULT_RACES | №1444 |
| defaultEnabled | №1298 |
| defaultSkinByGender | №0070 |
| defaultSkinId | №0070 |
| defeat | №0842 |
| defeated | №0082 (+ 9 других файлов) |
| defenderAura | №0780 |
| defenderReaction | №0659 (+ 4 других файлов) |
| defensive_duelist | №0786 |
| defensiveStance | №0783 |
| deferDamage | №0815 (+ 1 других файлов) |
| definition | №0822 |
| definitions | №0822 |
| deflected | №0659 |
| deflectMissiles | №0652 |
| deformAsset | №0072 |
| deformedPositions | №1288 |
| deftness | №0645 |
| Deftness | №0783 |
| deinonychus | №0690 |
| deleted | №0657 (+ 1 других файлов) |
| denial | №0783 |
| deniesActions | №0082 |
| denominator | №0825 |
| density | №0063 (+ 2 других файлов) |
| denValues | №0066 |
| denyAttackAdvantage | №0783 |
| denyBonusActions | №0082 |
| denyDashDisengageDodge | №0082 |
| depleted | №1358 |
| depth | №0065 (+ 4 других файлов) |
| desc | №0628 (+ 13 других файлов) |
| describeProfession | №0674 |
| description | №0075 (+ 72 других файлов) |
| descriptor | №0063 |
| deserialize | №0070 |
| desk | №0071 |
| destination | №0822 (+ 8 других файлов) |
| destinationGender | №1504 |
| destroy | №0847 |
| destroyThrallToHeal | №0813 |
| destroyUndead | №0652 |
| detail | №0070 (+ 3 других файлов) |
| details | №0788 (+ 3 других файлов) |
| detectIllusionAndShapeshifter | №0783 |
| detectMagic | №0783 (+ 1 других файлов) |
| dethek | №0783 (+ 1 других файлов) |
| dethekStance | №0783 |
| devicePixelRatio | №1266 (+ 1 других файлов) |
| devices | №0674 |
| deviceScaleFactor | №1481 |
| devilDamageMaximum | №0822 |
| devilPlan | №0822 |
| deviousTactics | №0783 |
| devouring | №0783 (+ 1 других файлов) |
| devTools | №0890 |
| dex | №0628 (+ 56 других файлов) |
| dexBonus | №0645 |
| dexChecksAdvantage | №0645 (+ 1 других файлов) |
| dexIncrease | №0783 |
| dexMaxBonus | №0645 |
| dexMaxIncrease | №0783 |
| dexSave | №0783 |
| dexSavesDisadvantage | №0645 (+ 1 других файлов) |
| dexSaveVisible | №0659 (+ 1 других файлов) |
| dexterity | №0790 (+ 10 других файлов) |
| Dexterity | №0084 |
| dexteritySaveProficiency | №0783 |
| diagnostics | №0067 (+ 1 других файлов) |
| diagonal | №0824 |
| dialect | №0783 (+ 1 других файлов) |
| diamondForm | №0783 |
| diamondPaste | №0677 |
| diamondSoul | №0652 |
| dice | №0081 (+ 9 других файлов) |
| diceCount | №0651 (+ 3 других файлов) |
| diceSides | №0651 (+ 3 других файлов) |
| die | №0085 (+ 6 других файлов) |
| diet | №0632 (+ 12 других файлов) |
| difficultTerrain | №1398 |
| difficulty | №0809 |
| digDeep | №0720 (+ 1 других файлов) |
| digits | №0065 |
| diminutive | №0837 (+ 1 других файлов) |
| dimLightAdditionalFt | №0783 |
| direct | №0822 (+ 2 других файлов) |
| directAttackNearestIfFailed | №0783 |
| directDice | №0082 |
| direction | №0077 (+ 6 других файлов) |
| directionSense | №0783 |
| directShift | №0837 |
| dirty | №0657 |
| dirtyHit | №0783 |
| dirtyStrike | №0780 |
| disabled | №0668 (+ 2 других файлов) |
| disabledBlocked | №1298 |
| disableSense | №0783 |
| disadvantage | №0082 (+ 10 других файлов) |
| disadvantageAgainstOthers | №0783 |
| disadvantageAgainstOthersWithinFt | №0783 |
| disadvantageAgainstSelf | №0783 |
| disadvantageAttacksExceptSelfUntilEndNextTurn | №0783 |
| disadvantageFirstSaveAgainstSpell | №0783 |
| disadvantageInDimLight | №0783 |
| disadvantageNextAttack | №0783 |
| disadvantageOnSaveWhenHidden | №0783 |
| disadvantageSaves | №0783 |
| disadvantageVsBloodHunterSpells | №0783 |
| disarm | №0780 (+ 1 других файлов) |
| disassembleItem | №0668 (+ 1 других файлов) |
| discard | №0825 |
| disciplinaryAdept | №0783 |
| discipline | №0718 (+ 4 других файлов) |
| disciplines | №0718 (+ 2 других файлов) |
| disciplineUsesPerTurn | №0718 |
| discovered | №0083 (+ 1 других файлов) |
| discoveries | №0082 (+ 3 других файлов) |
| discovery | №0082 (+ 1 других файлов) |
| discoveryBonus | №0085 |
| discoveryLevelGating | №0681 |
| discoveryRecipes | №0082 |
| disengageOnHit | №0780 |
| disguise | №0676 |
| disguiseAndHexFocus | №0817 |
| disguiseAppearance | №0082 |
| disguiser | №0674 (+ 1 других файлов) |
| dismissMageArmor | №0822 |
| disoriented | №0783 |
| disorientedDice | №0783 |
| dispellingAnathema | №0783 |
| display | №0803 (+ 1 других файлов) |
| displayName | №0649 (+ 3 других файлов) |
| dispose | №0077 |
| dist | №0815 |
| distance | №0660 (+ 2 других файлов) |
| distanceFt | №0645 (+ 18 других файлов) |
| distant | №0652 |
| divineChannelUses | №0813 |
| divineIntervention | №0652 |
| divineMandate | №0783 |
| divineRespite | №0807 |
| divineSense | №0652 |
| divineSmite | №0652 (+ 2 других файлов) |
| dlc | №0670 |
| DND_CLASSES_LIST | №1444 |
| DND_UPDATE_MANIFEST_URL | №1443 |
| dndBackgrounds | №1444 |
| DNDBattleBoard | №1377 |
| DNDCampaign | №1376 (+ 1 других файлов) |
| DNDCloudConfig | №1296 |
| DNDCombat | №1376 (+ 1 других файлов) |
| DNDContent | №1264 (+ 2 других файлов) |
| DNDGameplayV57 | №1377 |
| DNDGLTF | №1266 |
| DndLanBridge | №1403 |
| DNDMonsterLoot | №1376 |
| dndMorphChannels | №1266 (+ 1 других файлов) |
| dndMorphSource | №1455 |
| dndNetwork | №1376 (+ 1 других файлов) |
| DNDRules | №1438 |
| DNDSummoning | №1376 |
| dock | №0074 |
| document | №1264 (+ 42 других файлов) |
| documentElement | №1306 |
| dodge | №0783 |
| dogAndHound | №0720 |
| dominantCharacteristics | №0873 |
| donorHitDieSpent | №0817 |
| donorType | №0082 (+ 1 других файлов) |
| donorVerified | №1265 |
| door | №0071 |
| doubleBreath | №0783 |
| doubleFoodSleepInterval | №0783 |
| doubleProficiency | №0783 |
| doubleSided | №0073 |
| doubleSpeed | №0813 |
| doublingJinx | №0783 |
| downButNotOut | №0720 (+ 1 других файлов) |
| downButNotOutActive | №0783 |
| downstreamRecipeAvailable | №0667 |
| draconicDiscourse | №0783 |
| draconicElement | №1415 |
| draconicResilience | №0652 |
| draconicStance | №0783 |
| draft | №0865 |
| dragging | №0630 |
| dragon | №0065 (+ 17 других файлов) |
| dragon_fear | №0786 |
| dragonArmyAffinity | №0635 |
| dragonFamily | №1371 |
| dragonlance | №0635 |
| dragonReagent | №0671 (+ 1 других файлов) |
| dragonsAscent | №0783 |
| dragonScale | №0671 (+ 1 других файлов) |
| dragonScaleRed | №0677 |
| draw | №0076 (+ 2 других файлов) |
| draws | №1266 |
| dreadfulGlare | №0783 |
| dreadlord | №0783 |
| dreadPresence | №0783 |
| dress | №0066 (+ 1 других файлов) |
| dressSleeves | №0066 |
| driedHerbBundle | №0676 |
| driedMeat | №0676 (+ 1 других файлов) |
| dropObject | №0783 |
| dropToOneHP | №0690 |
| Drowned | №0783 |
| druid | №0802 (+ 1 других файлов) |
| druidic | №0652 |
| dryRun | №0667 (+ 6 других файлов) |
| duplicate | №0856 |
| duplicateOnPhaseRift | №0783 |
| duplicateTargetCollisions | №1318 |
| dur | №0671 |
| durability | №0669 (+ 4 других файлов) |
| durabilityBonus | №0673 |
| durabilityMax | №1297 (+ 1 других файлов) |
| durabilityMultiplier | №0669 (+ 2 других файлов) |
| duration | №0072 (+ 21 других файлов) |
| durationHours | №0645 (+ 2 других файлов) |
| durationMinutes | №0082 (+ 6 других файлов) |
| durationRounds | №0081 (+ 4 других файлов) |
| durationRule | №0837 |
| durationSeconds | №0822 (+ 1 других файлов) |
| durationTurns | №0813 |
| durationUnit | №0661 (+ 1 других файлов) |
| durationUntilSave | №0813 |
| durationUntilStartOfTurn | №0783 |
| duringShortRest | №1265 |
| dusk | №0077 |
| dwarf | №0667 |
| dwarf_hill | №0676 |
| dwarf_mountain | №0676 |
| dwarven_fortitude | №0786 |
| dwarvishDiscourse | №0783 |
| dyingCurse | №0783 |
| dynamic | №0065 |
| e | №0078 (+ 1 других файлов) |
| earField | №0065 |
| earFrame | №0066 |
| earLength | №0070 (+ 6 других файлов) |
| earPointiness | №0070 (+ 6 других файлов) |
| earth | №0690 |
| Earth | №0084 |
| earthCore | №0830 |
| earthEssence | №0830 |
| earTuftSize | №0070 (+ 2 других файлов) |
| ecology | №0632 (+ 12 других файлов) |
| ectoplasm | №0671 (+ 1 других файлов) |
| edition | №0081 (+ 23 других файлов) |
| effect | №0082 (+ 20 других файлов) |
| effectiveD20 | №0659 |
| effectiveDamage | №0659 |
| effectiveMaxHp | №0831 |
| effectiveMode | №1343 |
| effectiveStats | №0820 |
| effectKey | №0820 |
| effects | №0084 (+ 7 других файлов) |
| elasticHide | №0830 |
| Elderheart | №0799 |
| eldritchBane | №0783 |
| eldritchCannon | №0652 |
| eldritchInvocations | №0652 |
| eldritchMaster | №0652 |
| electricCharge | №0783 |
| elemental | №0067 (+ 14 других файлов) |
| Elemental | №0799 |
| elementalAsh | №0671 (+ 1 других файлов) |
| elementalBlast | №0783 |
| elementalPower | №0783 |
| elephant | №0065 |
| elephantEarSize | №0070 (+ 1 других файлов) |
| elephantTuskSize | №0070 (+ 1 других файлов) |
| elevationFt | №0822 |
| elf_wood | №0676 |
| elfcity | №0067 |
| eligible | №1355 |
| elixirs | №0674 |
| eloquentSpeech | №0783 |
| elven_accuracy | №0786 |
| email | №0657 (+ 2 других файлов) |
| emanationFt | №0783 |
| embers | №0645 |
| Embers | №0783 |
| emerald | №0872 |
| emergencyReanimate | №0873 |
| emissaryPhaseHooks | №1364 |
| empowered | №0652 (+ 1 других файлов) |
| empty | №0823 |
| enableApply | №0847 |
| enabled | №0063 (+ 6 других файлов) |
| enabledByDefault | №2334 |
| enchant | №0674 |
| enclosed | №0063 |
| encoding | №0893 (+ 7 других файлов) |
| encounter | №0864 (+ 1 других файлов) |
| encounterBias | №0636 |
| encounterId | №0822 (+ 2 других файлов) |
| end | №0065 (+ 2 других файлов) |
| endActorTurn | №0645 |
| endAllRites | №0783 |
| endCondition | №0783 |
| endConditions | №0783 |
| endedByZeroHp | №0659 |
| endEffectPsi | №0783 |
| endEncounter | №0690 |
| endExternalPetrificationAfter | №0783 |
| endIllusion | №0783 |
| endInvisibility | №0783 |
| endPossession | №0788 |
| endRampage | №0690 |
| ends | №0848 |
| endsAt | №0783 |
| endsOnAttack | №0082 (+ 1 других файлов) |
| endsOnAttackOrSpell | №0783 |
| endsOnDamage | №0082 |
| endsOnHostile | №0822 |
| endsOnMagicHealing | №0690 |
| endsOnMove | №0783 |
| endsOnRemoveCurse | №0783 |
| endSpellConcentration | №0822 |
| endsWhen | №0783 |
| endTurn | №0787 (+ 3 других файлов) |
| enemiesFrightened | №0783 |
| enemy | №1323 (+ 6 других файлов) |
| enemyDistanceFt | №1356 |
| enemyRead | №0780 |
| enervatingJinx | №0783 |
| enervatingSpell | №0783 |
| eng | №0749 |
| engines | №0852 (+ 1 других файлов) |
| englishName | №0081 (+ 29 других файлов) |
| enhancement | №0783 |
| enhancingSurge | №0783 |
| enlightened | №0783 |
| enliveningOrder | №0783 |
| enshroudingImprecation | №0783 |
| ensure | №0788 (+ 8 других файлов) |
| ensureCharacterProfessions | №0674 |
| ensureMaterial | №0671 |
| ensureResourceState | №0809 |
| ensureTracker | №0787 (+ 1 других файлов) |
| enterSpiritForm | №0788 |
| entities | №0082 (+ 2 других файлов) |
| entity | №0082 (+ 4 других файлов) |
| entityId | №0082 (+ 4 других файлов) |
| entries | №0657 (+ 1 других файлов) |
| entryRoute | №0873 |
| enumerable | №0822 |
| env | №1263 |
| ep | №0794 (+ 5 других файлов) |
| equip | №0070 |
| equipment | №0070 (+ 6 других файлов) |
| equipmentId | №0070 |
| equipMilitia | №0783 |
| equipped | №0078 (+ 6 других файлов) |
| equippedArmor | №1298 |
| error | №0067 (+ 33 других файлов) |
| error_code | №1296 |
| errors | №0665 (+ 1 других файлов) |
| essence | №0830 |
| eTexture | №0080 |
| ethanol | №0677 |
| ethereal | №0783 |
| evasion | №0652 (+ 3 других файлов) |
| evasionMonk | №0652 |
| event | №0822 (+ 3 других файлов) |
| eventCount | №0851 (+ 2 других файлов) |
| eventId | №0823 (+ 1 других файлов) |
| eventLog | №0866 (+ 2 других файлов) |
| eventLogBaseSeq | №1436 |
| events | №0851 (+ 5 других файлов) |
| eventSeq | №0814 (+ 5 других файлов) |
| exact | №1469 |
| exaltedLeader | №0743 |
| exaltedMutation | №0645 |
| exaltedProtege | №0783 |
| excellent | №0812 |
| exceptional | №0668 (+ 1 других файлов) |
| exceptPsychic | №0783 |
| exclude | №0062 |
| excludeUndeadConstructs | №0822 (+ 2 других файлов) |
| executablePath | №1458 (+ 37 других файлов) |
| executeAttack | №0787 |
| executionActor | №0822 |
| exhaustion | №0783 (+ 2 других файлов) |
| exhaustionAfter | №0780 |
| exhaustionApplied | №0783 |
| exhaustionGain | №0780 |
| exhaustionOnFailedSave | №0783 |
| exit | №1301 |
| exorcist | №0645 (+ 1 других файлов) |
| exoskeletonArmor | №0783 |
| exp | №0784 |
| expand | №0664 |
| expanded | №0664 (+ 1 других файлов) |
| expected | №0858 (+ 3 других файлов) |
| expectedProcessed | №0830 |
| expectedRevision | №0797 (+ 21 других файлов) |
| expendHitDie | №0783 |
| experience | №0790 |
| experimental | №0083 (+ 1 других файлов) |
| experimentalist | №0681 |
| experiments | №0083 (+ 1 других файлов) |
| expertFocus | №0783 |
| expertise | №0783 (+ 1 других файлов) |
| expertiseSkills | №0783 |
| expired | №0082 |
| expires | №0082 (+ 3 других файлов) |
| expires_at | №0657 |
| expires_in | №1296 |
| expiresAt | №0081 (+ 3 других файлов) |
| expiresRounds | №0783 |
| exploded | №0082 |
| explodeRadiusFt | №0082 |
| explodesOncePerTurn | №0783 |
| exploit | №0690 |
| exploitDice | №0743 |
| exploitDie | №0743 (+ 1 других файлов) |
| exploits | №0743 (+ 1 других файлов) |
| exploitsKnown | №0743 |
| explosiveBane | №0783 |
| explosiveCannon | №0815 |
| exportedAt | №0851 |
| exportedMacros | №1504 |
| exportJSON | №0067 (+ 1 других файлов) |
| exportReplay | №0851 |
| exportSession | №0864 (+ 1 других файлов) |
| exposingStrike | №0783 |
| exposure | №0645 |
| expression | №0659 (+ 2 других файлов) |
| extended | №0652 |
| extendedResourceState | №0652 |
| extendedTactics | №0739 |
| extendExistingDarkvisionFt | №0645 |
| extendHex | №0780 |
| extendHexRounds | №0783 |
| external | №0063 (+ 2 других файлов) |
| externalGeometryAvailable | №0063 |
| externalGeometryReady | №0063 |
| externalGeometryStage | №0063 |
| extra | №0083 (+ 2 других файлов) |
| extraAction | №0783 (+ 1 других файлов) |
| extraActionNextTurn | №0822 |
| extraAstralConstruct | №0783 |
| extraAtk | №0651 (+ 1 других файлов) |
| extraAttack | №0645 (+ 7 других файлов) |
| extraAttackDamage | №0645 |
| extraAttacks | №0081 (+ 13 других файлов) |
| extraBloodMaledictUse | №0645 (+ 1 других файлов) |
| extraCantrips | №0817 |
| extraClassType | №0650 |
| extraCurseArmamentAttack | №0783 |
| extraCursedAttunement | №0783 |
| extraDamage | №0082 (+ 2 других файлов) |
| extraDamageByLevel | №0081 |
| extraDamageDice | №0783 |
| extraDamageDie | №0783 |
| extraDice | №0082 (+ 8 других файлов) |
| extraDieVsUndead | №0783 |
| extradimensional | №0817 |
| extraDimLight | №0783 |
| extraDimLightDie | №0783 |
| extraDiscipline | №0783 |
| extraDmg | №0651 (+ 2 других файлов) |
| extraExploitDice | №0783 |
| extraExploitKnown | №0783 |
| extraFamiliarAction | №0817 |
| extraForms | №0783 |
| extraKnowledgeSkill | №0783 |
| extraMovement | №0822 |
| extraNecrotic | №0783 |
| extrapolated | №1455 |
| extraPsiOverMax | №0783 |
| extraPsychicDice | №0783 |
| extraRadiusFt | №0082 |
| extraRampageDie | №0783 |
| extraReaction | №0822 |
| extraReactions | №0822 |
| extraRiteDie | №0783 |
| extras | №1266 (+ 1 других файлов) |
| extraSaveBonus | №0876 |
| extraSkillChoice | №0783 |
| extraSuture | №0813 |
| extraTargetPerSlotAbove1 | №0783 |
| extraTargets | №0783 |
| extraTrigger | №2332 |
| extraTurns | №0817 |
| extraUnarmedAfterTwoOldOneTwo | №0783 |
| extraUse | №0783 (+ 1 других файлов) |
| eye | №0065 (+ 1 других файлов) |
| eyeColor | №0070 (+ 3 других файлов) |
| eyeGlow | №0070 (+ 2 других файлов) |
| eyeHeight | №0067 (+ 2 других файлов) |
| eyeless | №0645 |
| eyeliner | №1467 |
| eyeShape | №0070 |
| eyeSize | №0070 (+ 1 других файлов) |
| eyeSpacing | №0070 (+ 1 других файлов) |
| eyeTilt | №0067 (+ 1 других файлов) |
| eyeWidth | №0067 (+ 1 других файлов) |
| f | №0065 (+ 2 других файлов) |
| faceColor | №0070 (+ 5 других файлов) |
| faceLength | №0067 (+ 1 других файлов) |
| faceShape | №0070 |
| faceTint | №0070 (+ 2 других файлов) |
| faceWidth | №0067 (+ 2 других файлов) |
| facileSuppression | №0783 |
| factionAgents | №0636 |
| factions | №0636 |
| fail | №0847 (+ 1 других файлов) |
| failChance | №0084 |
| failed | №0067 (+ 4 других файлов) |
| failedSave | №1345 |
| failNextRollDisadvantage | №0783 |
| failure | №0084 (+ 3 других файлов) |
| failures | №0659 (+ 14 других файлов) |
| fair | №0812 |
| fall | №0659 (+ 3 других файлов) |
| fallDamageReduction | №0783 |
| fallen | №0075 (+ 1 других файлов) |
| fallenAttack | №0645 |
| fallenPuppet | №0645 |
| fallingStrike | №0780 |
| familiar | №0661 (+ 2 других файлов) |
| familiarAttack | №0783 |
| familiarHpBonus | №0783 |
| familiarLink | №0817 |
| familiarSettlement | №0783 |
| familiarStealth | №0817 |
| families | №0632 (+ 24 других файлов) |
| family | №0063 (+ 3 других файлов) |
| familyByCreature | №1363 (+ 10 других файлов) |
| familyId | №0632 (+ 10 других файлов) |
| fancyFootwork | №0783 |
| fangSize | №0070 (+ 2 других файлов) |
| fastHands | №0652 |
| fastMovement | №0652 |
| fastTravel | №0783 |
| fat | №0067 (+ 1 других файлов) |
| fathomless | №0645 |
| fatigue | №0783 |
| favoredEnemy | №0652 |
| favoredServant | №0783 |
| fear | №0082 (+ 1 других файлов) |
| Fear | №0084 |
| fearApplied | №0783 |
| fearAura | №0780 |
| fearBomb | №0783 |
| fearImmune | №0822 |
| fearImmunity | №0780 |
| fearPulse | №0633 |
| fearSave | №0783 |
| fearSavePenalty | №0783 |
| fearSourceId | №0822 |
| fearTargets | №1352 |
| fearVisible | №0822 |
| feat | №0751 |
| featherTailSize | №0070 (+ 3 других файлов) |
| featherWingSize | №0070 (+ 3 других файлов) |
| feats | №0790 (+ 3 других файлов) |
| feature | №0628 (+ 1 других файлов) |
| FEATURE_DEFS | №0652 |
| featureAvailableForCurrentBuild | №0652 |
| featureId | №0815 |
| featureLevels | №0807 (+ 4 других файлов) |
| featureName | №0815 (+ 2 других файлов) |
| features | №0790 (+ 58 других файлов) |
| fecundAffliction | №0783 |
| feedOnCorpse | №0820 |
| feet | №0065 (+ 9 других файлов) |
| feint | №0783 |
| female | №0063 (+ 2 других файлов) |
| femaleStackTerms | №1504 |
| feralInstinct | №0652 |
| feralSenses | №0652 (+ 1 других файлов) |
| ferocious | №0690 |
| ferocity | №0660 (+ 3 других файлов) |
| ferocityMax | №0661 (+ 1 других файлов) |
| fetch | №1268 (+ 6 других файлов) |
| fey | №0632 (+ 11 других файлов) |
| fey_touched | №0786 |
| feyFiber | №0830 |
| feyPresence | №0652 (+ 1 других файлов) |
| fiber | №0671 (+ 1 других файлов) |
| field | №0065 (+ 1 других файлов) |
| fields | №2329 |
| fiend | №0632 (+ 12 других файлов) |
| fiendish | №0783 (+ 1 других файлов) |
| fiendishStance | №0783 |
| fight | №0822 |
| fightClubs | №0720 |
| fighterRemarkableAthlete | №0652 |
| fighting_initiate | №0786 |
| fightingSpirit | №0720 (+ 1 других файлов) |
| fightingStyle | №0645 (+ 4 других файлов) |
| fightingStyleChoice | №0783 |
| fightingStyles | №0692 (+ 1 других файлов) |
| file | №0872 (+ 1 других файлов) |
| filename | №0667 (+ 73 других файлов) |
| FileReader | №1406 |
| files | №0846 (+ 4 других файлов) |
| filter | №0836 (+ 3 других файлов) |
| filtered | №0851 |
| final | №0854 |
| finalMartyrdom | №0807 |
| finalStrikeExploit | №0783 |
| findRecipeForItem | №0668 |
| fine | №0668 (+ 3 других файлов) |
| finecarver | №0674 |
| fineFiberV49 | №0671 |
| fineLeatherV49 | №0671 |
| finesse | №0817 |
| finesseOrRanged | №1416 |
| finger | №0065 |
| finish | №0065 (+ 2 других файлов) |
| finishLastStand | №0822 |
| finite | №1472 (+ 3 других файлов) |
| finSize | №0070 (+ 2 других файлов) |
| firbolg | №0676 |
| fire | №0645 (+ 3 других файлов) |
| Fire | №0084 |
| fireAffinity | №0817 |
| fireClay | №0677 |
| fireDamage | №0783 (+ 1 других файлов) |
| fireEssence | №0671 (+ 1 других файлов) |
| fireResistance | №0817 |
| firmness | №1310 |
| first | №0831 |
| firstAid | №0783 |
| firstAttackAdvantage | №0783 (+ 1 других файлов) |
| firstHitByEachTargetRestoresMoxie | №0783 |
| firstMate | №0783 |
| fisher | №0805 (+ 1 других файлов) |
| fisticuffs | №0720 |
| fisticuffsDie | №0720 |
| fit | №0066 (+ 8 других файлов) |
| fitFrame | №0066 |
| fitProfile | №0070 |
| fixed | №0717 (+ 2 других файлов) |
| fixtureSha256 | №1309 |
| fizban | №0632 |
| flags | №0822 |
| flame | №0645 |
| flameBurst | №0783 |
| flameReroll12 | №0645 |
| flamesOfHope | №0783 |
| flare | №0066 |
| flashOfGenius | №0652 (+ 1 других файлов) |
| flashOfGeniusAvailable | №0659 |
| flat | №0065 |
| flawed | №0678 |
| flawlessAnalysis | №0833 |
| flax | №0677 |
| fletcher | №0674 (+ 2 других файлов) |
| fletchingStock | №0671 (+ 1 других файлов) |
| fletchingStockV49 | №0671 |
| floatObjectsLb | №0783 |
| floor | №0062 (+ 5 других файлов) |
| FLOOR | №0076 |
| floor_ceramic_tile_dark | №0076 |
| floor_ceramic_tile_light | №0076 |
| floor_checker_tile | №0076 |
| floor_cobblestone | №0076 |
| floor_earth | №0076 |
| floor_grass | №0076 |
| floor_hex_tile | №0076 |
| floor_marble_dark | №0076 |
| floor_marble_light | №0076 |
| floor_parquet_herringbone | №0076 |
| floor_rug_blue | №0076 |
| floor_rug_green | №0076 |
| floor_rug_red | №0076 |
| floor_stone_tile_dark | №0076 |
| floor_stone_tile_light | №0076 |
| floor_tatami | №0076 |
| floor_water | №0076 |
| floor_wood_dark | №0076 |
| floor_wood_light | №0076 |
| floors | №0075 (+ 1 других файлов) |
| flowers | №0829 |
| flurry | №0652 |
| fly | №0813 |
| flyFt | №0645 (+ 1 других файлов) |
| flyIfSelected | №0690 |
| flyingSpeed | №0817 |
| flySpeed | №0082 (+ 2 других файлов) |
| focus | №0645 (+ 10 других файлов) |
| focusDebuff | №0783 |
| focusDuration | №0833 |
| focusDurationRounds | №0783 |
| focusEndsOn | №0833 |
| focuses | №0652 |
| focusRangeFt | №0833 |
| foe | №1325 (+ 4 других файлов) |
| foeSlayer | №0652 |
| foeSlayerApplied | №1417 |
| foeSlayerMode | №1417 |
| folder | №1310 (+ 2 других файлов) |
| folders | №0628 (+ 1 других файлов) |
| fontOfLife | №0739 |
| fontOfMagic | №0652 |
| food | №0803 |
| foot | №0065 |
| footL | №0063 |
| footprintFeet | №0070 |
| footR | №0063 |
| foraging | №0674 |
| force | №0875 (+ 7 других файлов) |
| forceAttackRedirect | №0783 |
| forceCrit1 | №1343 |
| forceCritical | №0652 (+ 1 других файлов) |
| forced | №0659 (+ 2 других файлов) |
| forceDamage | №0690 (+ 1 других файлов) |
| forceDamageInside | №0783 |
| forcedAttack | №0854 |
| forcedD20 | №0854 |
| forcedDamage | №0854 |
| forcedDice | №0856 |
| forcedFailure | №0822 |
| forcedMeleeReaction | №0783 |
| forcedMoveFt | №0780 (+ 2 других файлов) |
| forcedMovementProtection | №0783 |
| forcedReactionAttack | №0783 |
| forcedSave | №0854 |
| forceOfNature | №0837 |
| forceSlot | №1354 |
| forceSurge | №0783 |
| forceTwenty | №0652 |
| forceUnarmed | №0783 |
| forearmL | №0063 |
| forearmR | №0063 |
| foresight | №0780 |
| forest | №0067 (+ 1 других файлов) |
| forge | №0067 |
| forger | №0674 (+ 1 других файлов) |
| forgery | №0676 |
| forgetAfterCast | №0783 |
| forgottenKnowledge | №0783 |
| forkedTongue | №0702 |
| form | №0065 (+ 3 других файлов) |
| formationRole | №0635 |
| formless | №0848 |
| formula | №0082 (+ 4 других файлов) |
| formulae | №0082 |
| formulas | №0082 (+ 4 других файлов) |
| fortified | №0875 |
| fortifyingDice | №0783 |
| fortunateCompany | №0783 |
| fortuneMode | №0822 |
| fortunePending | №0822 |
| fortuneRevealed | №0822 |
| fortuneTwist | №0783 |
| forward | №0070 |
| found | №0822 |
| fractureBurst | №0783 |
| frame | №0062 |
| free | №0783 (+ 4 других файлов) |
| freeAfflict | №0783 |
| freeAt17 | №0807 |
| freeAtLevel17 | №0783 |
| freeAtUnsealed | №0783 |
| freeCast | №0783 |
| freeDispelCaster | №0783 |
| freedomOfMovement | №0813 |
| freeExploits | №0783 |
| freeHandBonusAction | №0783 |
| freeHitDieChancePercent | №0783 |
| freeHoldTheLine | №0783 |
| freeInsightfulOrder | №0783 |
| freeLawShieldAndHalt | №0783 |
| freeMoveFt | №0783 |
| freePoints | №0718 |
| freePsi | №0783 |
| freePsiLost | №0783 |
| freePsiPerTurn | №0783 |
| freeSpell | №0817 |
| freeSpells | №0783 |
| freeTalent | №0783 |
| freeUse | №0783 |
| freeUses | №0848 |
| frenzy | №0652 |
| friend | №1330 (+ 3 других файлов) |
| frighten | №0817 |
| frightened | №0783 (+ 2 других файлов) |
| frightenedBy | №0822 |
| frightenedEffect | №0645 (+ 3 других файлов) |
| frightenedSaveDisadvantage | №0783 |
| frightenedUntilEndNextTurn | №0783 |
| from | №0636 (+ 25 других файлов) |
| fromFiendOrUndead | №0652 (+ 1 других файлов) |
| fromRound | №0822 |
| fromSpell | №0659 (+ 3 других файлов) |
| front | №0066 (+ 1 других файлов) |
| frontDigits | №0065 |
| FrontTexture | №1320 |
| frozen | №0645 |
| full_orc | №0676 |
| fullMaxNearestDistance | №1318 |
| fullMeanNearestDistance | №1318 |
| fullSpeedDragging | №0783 |
| fulminatingFatigue | №0783 |
| fumble | №0659 (+ 30 других файлов) |
| functionalStatus | №0806 |
| fur | №0065 |
| furAmount | №0063 (+ 3 других файлов) |
| furColor | №0070 (+ 1 других файлов) |
| furDensity | №0063 (+ 4 других файлов) |
| furH | №0065 |
| furLength | №0063 (+ 2 других файлов) |
| furParts | №0065 |
| furProfile | №0063 (+ 4 других файлов) |
| furRoots | №0065 |
| furShell | №0065 |
| furStrands | №0065 |
| furyOfForge | №0783 |
| fuseMinutes | №0082 |
| fuseRounds | №0082 (+ 1 других файлов) |
| g | №0872 |
| gainD4OnFailure | №0783 |
| gained | №0660 (+ 1 других файлов) |
| gainFerocity | №0660 (+ 1 других файлов) |
| gainRelaxationPerTurn | №0783 |
| gallantSpellcasting | №0783 |
| gameActors | №0645 |
| gameOfChance | №0783 |
| gameplay | №0852 (+ 2 других файлов) |
| gameplayEvents | №0866 (+ 1 других файлов) |
| gargantuan | №0820 (+ 1 других файлов) |
| gaseousBody | №0813 |
| gaseousReaction | №0813 |
| gateTowns | №0636 |
| gather | №0085 |
| gatherAction | №0085 |
| gathered | №0882 (+ 1 других файлов) |
| gatherIngredient | №0085 |
| gear | №0669 (+ 2 других файлов) |
| gelid | №0645 |
| Gelid | №0783 |
| gem | №0672 (+ 4 других файлов) |
| gemcutter | №0805 (+ 1 других файлов) |
| gems | №0674 |
| gender | №0064 (+ 18 других файлов) |
| genderMorphs | №0070 |
| general | №0805 (+ 1 других файлов) |
| generate | №0810 (+ 3 других файлов) |
| genie | №0645 |
| geometryBuilds | №0067 |
| geometryState | №0066 |
| geometryUploads | №0067 |
| get | №0662 (+ 5 других файлов) |
| getAC | №0843 |
| getAllBackgrounds | №1444 |
| getAllRaces | №1444 |
| getAttribute | №1389 |
| getAvailableRecipes | №0674 |
| getBiomassFromCorpse | №0843 |
| getBody | №0820 |
| getBodyState | №0070 |
| getCharismaModifier | №0805 |
| getClass | №0665 |
| getClassSummary | №0873 |
| getCreature | №0632 (+ 12 других файлов) |
| getCurrent | №0646 (+ 2 других файлов) |
| getCurse | №0081 |
| getDC | №0833 |
| getDevourDamage | №0843 |
| getDevourDC | №0843 |
| getDialect | №0832 |
| getDie | №0833 |
| getDiscipline | №0833 |
| getDominantAbilityNames | №0873 |
| getDurability | №0671 (+ 1 других файлов) |
| getElementById | №1264 (+ 37 других файлов) |
| getExhaustion | №0829 (+ 1 других файлов) |
| getFeature | №0665 |
| getInscribedRunes | №0832 |
| getItem | №1266 (+ 20 других файлов) |
| getItemQuality | №0671 |
| getLanguages | №0832 |
| getLarva | №0820 |
| getLibraryManifest | №0075 |
| getLockedRecipes | №0674 |
| getMap | №0074 |
| getMaxCharacteristics | №0873 |
| getMaxPreparedSpellsLimit | №0840 |
| getMetamorphoses | №0081 |
| getMorphWeights | №0070 |
| getMutationSlots | №0843 |
| getNativeStorageStats | №0846 |
| getObject | №0075 |
| getPath | №1300 (+ 1 других файлов) |
| getPeer | №1349 (+ 7 других файлов) |
| getPersuasionModifier | №0805 |
| getProfession | №0674 |
| getProfile | №0674 (+ 1 других файлов) |
| getPursuit | №0833 |
| getRace | №0070 |
| getReactions | №0833 |
| getRenderDescriptor | №0070 |
| getRunesKnown | №0832 |
| getRunicDC | №0832 |
| getSaveBonus | №0831 (+ 13 других файлов) |
| getSaveDC | №0081 |
| getSkillBonus | №0831 |
| getSource | №0802 |
| getSpecialization | №0674 |
| getSpellInfo | №0802 |
| getSpellsKnown | №0081 |
| getSpellSlots | №0081 |
| getState | №0067 (+ 1 других файлов) |
| getStats | №0831 |
| getSubclass | №0652 |
| getSummary | №0788 |
| getSymbiosisTier | №0820 |
| getToken | №0834 |
| getTrader | №0803 |
| getVersion | №1300 (+ 1 других файлов) |
| getView | №1406 |
| getZone | №0075 |
| ghost | №0067 |
| ghostChainSize | №0070 (+ 2 других файлов) |
| ghostOnKill | №0813 |
| ghostOpacity | №0070 (+ 2 других файлов) |
| ghostTerror | №0070 (+ 2 других файлов) |
| ghostWeapon | №0067 (+ 3 других файлов) |
| ghukliak | №0783 (+ 1 других файлов) |
| giant | №0635 |
| Gifted | №0799 |
| giftedStrategist | №0783 |
| GITHUB_REPOSITORY | №1263 |
| GITHUB_RUN_ID | №1263 |
| GITHUB_SERVER_URL | №1263 |
| gl | №0077 (+ 4 других файлов) |
| glancingBlow | №0783 |
| glareParalyzeOnFailBy5 | №0783 |
| glass | №0671 (+ 6 других файлов) |
| glassBatch | №0677 |
| glassblower | №0674 (+ 3 других файлов) |
| glasswork | №0672 (+ 2 других файлов) |
| glaze | №0676 (+ 1 других файлов) |
| glazedVessel | №0676 |
| glb | №1316 |
| glbBBox | №1313 (+ 1 других файлов) |
| glbTriangles | №1313 (+ 2 других файлов) |
| glbVertices | №1304 (+ 4 других файлов) |
| gliderMembraneSize | №0070 (+ 1 других файлов) |
| global | №1413 (+ 5 других файлов) |
| globalThis | №1427 (+ 4 других файлов) |
| gloves | №0066 |
| glow | №0070 |
| gltf | №0073 (+ 2 других файлов) |
| gnoll | №0778 |
| gnome_forest | №0676 |
| gnome_rock | №0676 |
| goblin | №0676 |
| goblinDiscourse | №0783 |
| goblinoid | №0778 |
| goblinStance | №0783 |
| gold | №0836 (+ 3 других файлов) |
| goldBillet | №0677 |
| goldenSlumbers | №0783 |
| goldPer10 | №0669 |
| goldReceived | №0822 |
| goldSpent | №0822 |
| good | №0668 (+ 1 других файлов) |
| goodPct | №1318 |
| gooSize | №0070 (+ 1 других файлов) |
| gp | №0794 (+ 10 других файлов) |
| graftAction | №1265 |
| graftName | №1265 |
| grafts | №0082 (+ 1 других файлов) |
| grain | №0676 (+ 1 других файлов) |
| GRAND_HEXES | №0783 |
| grandHex | №0780 (+ 1 других файлов) |
| grandRevolutionary | №0783 |
| grantActionNextStart | №0822 |
| grantAdvantage | №0783 |
| grantIngredient | №0085 |
| grantsAdvantage | №0831 |
| grantTemporaryHitPoints | №0659 |
| grantUndyingToAlly | №0783 |
| grapple | №0780 |
| grappleBonus | №0783 |
| grappleMastery | №0780 |
| grappleSizePlus | №0783 |
| grappleTarget | №0780 |
| gravity | №0822 |
| gravityResisted | №0822 |
| grayColor | №0070 (+ 1 других файлов) |
| grayPercent | №1284 (+ 1 других файлов) |
| great_weapon_master | №0786 |
| greaterDivineIntervention | №0652 |
| greatOldOne | №0645 |
| Green | №0780 (+ 1 других файлов) |
| greenwood | №0882 |
| greenwood_clearing | №0882 |
| greenwood_heart | №0882 |
| greenwood_stream | №0882 |
| grid | №0065 (+ 1 других файлов) |
| grimPsychometry | №0645 |
| grip | №0067 |
| ground | №0065 |
| group | №0065 |
| groupKey | №0878 (+ 3 других файлов) |
| groups | №0659 (+ 7 других файлов) |
| guaranteed | №0632 (+ 14 других файлов) |
| guardCraft | №0670 |
| guardDC | №0822 |
| Guardian | №0799 |
| guardianRangeFt | №0783 |
| guardians | №1375 |
| guardianTactic | №0783 |
| guardianTactics | №0739 |
| guardRepair | №0670 |
| guest | №0657 |
| guidedStrike | №0652 |
| guild | №0667 |
| gumArabic | №0677 |
| h | №0065 (+ 9 других файлов) |
| H | №0062 (+ 1 других файлов) |
| habitat | №0067 |
| habitats | №0632 (+ 13 других файлов) |
| hadMaterial | №0822 |
| hadozee | №1479 |
| haggle | №0805 |
| hair | №0063 (+ 15 других файлов) |
| hairColor | №0070 (+ 3 других файлов) |
| hairParts | №0063 |
| hairRibbonBudget | №0063 |
| half | №0070 (+ 1 других файлов) |
| half_up | №0065 (+ 1 других файлов) |
| halfCover | №0783 |
| halfCoverWhileGrappling | №0783 |
| halfDamageEffect | №0659 (+ 4 других файлов) |
| halfOnSave | №0783 (+ 2 других файлов) |
| halfProficiencySkills | №0783 |
| halfSpeed | №0783 |
| Hallucination | №0084 |
| halt | №0783 |
| haltRestrains | №0783 |
| halveDamage | №0783 |
| halveNecroticReaction | №0645 |
| hand | №0065 (+ 1 других файлов) |
| handL | №0063 |
| handlebar | №0070 |
| handled | №0072 |
| handOfDread | №0720 |
| handoffNeedsSignaling | №0814 |
| handoffPending | №0814 |
| handR | №0063 |
| hands | №0065 (+ 9 других файлов) |
| hardenedSoul | №0645 |
| hardwood | №0671 (+ 4 других файлов) |
| harmonic | №0832 |
| harmonicAttunement | №0783 |
| harvest | №0632 (+ 19 других файлов) |
| harvestMaterial | №1375 |
| has | №0786 |
| has_joints_and_weights | №1307 |
| has_morph_targets | №1307 |
| hasAsi | №0704 (+ 2 других файлов) |
| hasCharacter | №0869 |
| hasDamage | №0815 (+ 1 других файлов) |
| hasInventoryEffects | №0822 |
| hasPreparation | №0840 |
| hasProfession | №0085 |
| haste | №0082 |
| hasToolProficiency | №0812 |
| hatOfDisguise | №0783 |
| have | №0668 (+ 3 других файлов) |
| haveGold | №0669 |
| haveMaterials | №0669 |
| haymaker | №0720 (+ 1 других файлов) |
| head | №0063 (+ 12 других файлов) |
| HEAD_AXES | №0070 |
| HEAD_FORMS | №0070 |
| HEAD_STYLES | №0070 |
| headAccessories | №0065 |
| headAccessory | №0062 (+ 2 других файлов) |
| headBuilds | №0067 |
| headDefaults | №0070 |
| headers | №0657 (+ 1 других файлов) |
| headFrame | №0065 |
| headless | №1458 (+ 37 других файлов) |
| heal | №0645 (+ 4 других файлов) |
| healAfterNecrotic | №0813 |
| healAfterRest | №0813 |
| healAmount | №1265 |
| healBatch | №0659 |
| healBody | №0873 |
| healCompanion | №0690 |
| healed | №0788 (+ 2 других файлов) |
| healHalfMaxHp | №0783 |
| healHitDie | №0780 |
| healHP | №0783 |
| healing | №0082 (+ 6 других файлов) |
| healingAllowed | №0873 |
| healingAmount | №0822 |
| healingBlocked | №0788 |
| healingBonus | №0783 (+ 1 других файлов) |
| healingBoost | №0817 |
| healingCount | №0822 |
| healingGrantsACBonus | №0783 |
| healingPotion | №0817 |
| healingPotionOnLongRest | №0817 |
| healingSpell | №0822 (+ 2 других файлов) |
| healingSpellsCannotHealSelf | №0813 |
| healMod | №0645 |
| healModifier | №0780 |
| healOnCharnelKill | №0813 |
| healOnKill | №0645 |
| healOrDamage | №0817 |
| healPer5Charnel | №0813 |
| healPool | №0783 |
| healRoll | №1265 |
| healSelf | №0783 |
| healShell | №0788 |
| healthCheck | №0857 |
| healWithHitDice | №0783 |
| heart | №0067 (+ 1 других файлов) |
| hearth | №0071 |
| heartPhylactery | №0783 |
| heavyArmor | №0783 |
| heelstomper | №0783 |
| height | №0067 (+ 50 других файлов) |
| heightened | №0652 |
| heightenedSenses | №0645 |
| hellhound | №0690 |
| hellspeaker | №0783 |
| hellspeakerHoneySweetBlades | №0783 |
| hellspeakerTurncoat | №0783 |
| hemMod | №0645 |
| hemocraftAbilities | №0692 |
| hemocraftDie | №0692 |
| hemocraftRerollOncePerTurn | №0645 |
| Hemorrhage | №0084 |
| hemp | №0677 |
| herb | №0672 (+ 2 других файлов) |
| herbalism | №0676 (+ 1 других файлов) |
| herbalist | №0674 (+ 5 других файлов) |
| herbs | №0829 (+ 1 других файлов) |
| herculean | №0720 (+ 1 других файлов) |
| hero | №1324 |
| heroicCharge | №0783 |
| heroicFocus | №0783 |
| heroicFortitude | №0783 |
| heroicOrderExploit | №0783 |
| heroicRush | №0780 |
| hex | №0872 (+ 2 других файлов) |
| hexArmor | №0783 |
| hexAura | №0783 |
| hexblade | №0645 |
| HEXES | №0783 |
| hexesAtWill | №0780 |
| hexmaster | №0783 |
| hexPhalanx | №0783 |
| hexPlate | №0783 |
| hexSaveDisadvantage | №0783 |
| hexShield | №0783 |
| hi | №0065 |
| hidden | №1493 |
| hide | №0671 (+ 1 других файлов) |
| hideBonusAction | №0783 |
| hideInDimDark | №0783 |
| hideInPlainSight | №0652 |
| Hideous | №0783 |
| high | №0063 (+ 1 других файлов) |
| high_ponytail | №0065 (+ 1 других файлов) |
| highAuthority | №0783 |
| highest | №1310 |
| highestId | №0822 |
| highGround | №0822 |
| highJumpBonusFt | №0783 |
| highlands | №0803 (+ 1 других файлов) |
| highlands_mine | №0882 |
| highlands_quarry | №0882 |
| highlands_ridge | №0882 |
| highlightColor | №0070 (+ 2 других файлов) |
| highlightPercent | №1284 (+ 2 других файлов) |
| hills | №0067 |
| hips | №0067 (+ 5 других файлов) |
| history | №0084 (+ 8 других файлов) |
| historyAdvantage | №0783 |
| historyAdvantageOnSinisterObjectOrPlace | №0645 |
| hit | №0659 (+ 9 других файлов) |
| hitCount | №0659 (+ 3 других файлов) |
| hitDice | №0628 (+ 2 других файлов) |
| hitDiceMax | №1345 |
| hitDiceRemaining | №0082 (+ 2 других файлов) |
| hitDiceRestored | №0807 |
| hitDiceSpent | №0082 (+ 4 других файлов) |
| hitDiceUsed | №0790 (+ 1 других файлов) |
| hitDie | №0628 (+ 54 других файлов) |
| hitInfo | №0077 |
| hitPoints | №0783 (+ 2 других файлов) |
| hitPointsAfter | №0807 (+ 1 других файлов) |
| hits | №0783 |
| hitTest | №0076 (+ 1 других файлов) |
| hitTokenId | №0824 |
| hitZone | №0076 |
| hive | №0067 |
| hm08BBox | №1313 (+ 1 других файлов) |
| hm08Triangles | №1313 (+ 1 других файлов) |
| hm08Vertices | №1313 (+ 3 других файлов) |
| hoard | №0810 |
| hobgoblin | №0676 |
| holdBreathIndefinite | №0783 |
| holdTheLine | №0783 |
| Hollow | №0783 |
| holy | №0082 |
| holyBomb | №0783 |
| holyMagic | №0780 |
| holyNexus | №0652 |
| homebrew | №0664 (+ 2 других файлов) |
| honey | №0677 |
| honorDuel | №0783 |
| hoofColor | №0070 (+ 1 других файлов) |
| hoofSize | №0067 (+ 3 других файлов) |
| hooks | №0081 (+ 19 других файлов) |
| hope | №0780 |
| horde | №0067 (+ 5 других файлов) |
| hordeCount | №0070 |
| horn | №0830 |
| HORN_STYLES | №0070 |
| hornColor | №0070 (+ 1 других файлов) |
| hornRidges | №1293 (+ 1 других файлов) |
| hornSize | №0070 (+ 3 других файлов) |
| hornStyle | №0067 (+ 5 других файлов) |
| hornThickness | №1293 (+ 1 других файлов) |
| horror | №0633 |
| horrorEligible | №0633 |
| horseColor | №0070 (+ 1 других файлов) |
| hosiery | №0066 |
| hosieryDen | №1277 |
| host | №0647 (+ 1 других файлов) |
| hostDestroyed | №0820 |
| hostileAction | №0822 |
| hostileBane | №0783 |
| hostilesWithin5 | №1353 |
| hostIsSeparateStatBlock | №0820 |
| hostSurvived | №0820 |
| houndReactionAttack | №0783 |
| howl | №0645 (+ 1 других файлов) |
| hp | №0790 (+ 77 других файлов) |
| hpBonus | №0783 |
| hpBonusPerLevel | №0828 |
| hpCost | №0807 (+ 1 других файлов) |
| hpCostBySlot | №0807 |
| hpCurrent | №0628 (+ 19 других файлов) |
| hpDamage | №0659 (+ 6 других файлов) |
| hpDamageBySlot | №0807 |
| hpFraction | №0780 |
| hpMax | №0628 (+ 13 других файлов) |
| hpMaxBonus | №0690 |
| hpPer100gp | №0783 |
| hpPercent | №1375 |
| hpTemp | №0628 (+ 6 других файлов) |
| href | №1389 |
| huge | №0820 (+ 1 других файлов) |
| humanoid | №0632 (+ 13 других файлов) |
| humanoidTorch | №0783 |
| hunter | №0690 (+ 2 других файлов) |
| hunterCompanion | №0780 |
| huntersBane | №0645 |
| huntersMark | №0652 (+ 1 других файлов) |
| huntersPrey | №0652 (+ 1 других файлов) |
| hurlThroughHell | №0815 |
| hybrid | №0783 |
| hybridAttackAdvantageVsBranded | №0783 |
| hybridRegeneration | №0783 |
| hybridTransformation | №0645 |
| hybridTransformationMastery | №0645 |
| hyena | №0778 |
| i | №0815 |
| ibex | №0070 |
| icon | №0675 (+ 4 других файлов) |
| iconId | №0792 (+ 1 других файлов) |
| id | №0065 (+ 202 других файлов) |
| idempotent | №0869 |
| identifyEffect | №0783 |
| identity | №2331 |
| identityDistortion | №0633 |
| ids | №0062 (+ 2 других файлов) |
| idx | №0077 |
| ifReducedToZero | №0783 |
| ifStolenSpark | №0783 |
| ignitingTouch | №0783 |
| ignoreCover | №0082 (+ 1 других файлов) |
| ignored | №0652 |
| ignoreExtremeTemperature | №0783 |
| ignoreHalfCover | №0783 |
| ignoreHalfDamageOnSave | №0783 |
| ignoreImmunity | №0645 (+ 2 других файлов) |
| ignoreInvisibility | №0822 |
| ignoreOneMutagenSideEffect | №0783 |
| ignoreOpportunityAttacksWhileFlying | №0813 |
| ignorePhysicalResistance | №0822 |
| ignoreRequirements | №1358 |
| ignoreResistance | №0082 (+ 6 других файлов) |
| ignoresImmunity | №0807 |
| ignoreSomaticInDimDark | №0783 |
| ignoresResistance | №0807 (+ 1 других файлов) |
| ignoreVerbalInDimDark | №0783 |
| illuminationAt | №0075 |
| illusion | №0822 (+ 1 других файлов) |
| illusoryDuplicate | №0783 |
| illustriousAdmiral | №0783 |
| imitation | №0082 (+ 1 других файлов) |
| immortality | №0783 |
| immortalityAnchor | №0813 |
| immune | №0645 (+ 5 других файлов) |
| immuneAging | №0783 |
| immuneAll | №0822 |
| immuneCondition | №0822 |
| immuneConditions | №0822 (+ 1 других файлов) |
| immuneFrightened | №0652 (+ 1 других файлов) |
| immuneIfBlindedImmune | №0645 |
| immuneNaturalDeath | №0817 |
| immuneSuppression | №0783 |
| immuneSurprise | №0783 |
| immuneToOwnerBombs | №0082 |
| immuneWhenRampageAtLeast | №0783 |
| immunities | №0659 (+ 13 других файлов) |
| immunity | №0645 (+ 3 других файлов) |
| immunity24hOnSave | №0783 |
| immunityBecomesResistance | №0082 (+ 3 других файлов) |
| immunityChosen | №0783 |
| impact | №0082 |
| impactBomb | №0783 |
| impermeable | №0645 |
| Impermeable | №0783 |
| implemented | №0783 |
| importJSON | №0860 |
| importLocal | №0657 |
| importText | №0864 (+ 1 других файлов) |
| imposeDisadvantage | №0783 |
| imposingPresence | №0783 |
| improvedAt11 | №0807 |
| improvedBombs | №0681 |
| improvedDivineSmite | №0652 |
| improvedFamiliar | №0783 |
| improvedResolve | №0739 |
| improvedThralls | №0813 |
| inactiveAfterInvoke | №0832 |
| inAttackAction | №1356 |
| incendiary | №0082 |
| incendiaryBomb | №0783 |
| inciteViolence | №0783 |
| incoming | №0822 |
| incomingAC | №0645 (+ 1 других файлов) |
| incomingAttackModifiers | №0875 |
| incomingDamage | №1345 |
| incomingDisadvantage | №0822 |
| incomparableIntellect | №0833 |
| index | №0797 (+ 8 других файлов) |
| indexType | №0077 |
| indices | №0062 (+ 8 других файлов) |
| individualCount | №0070 |
| individuals | №0065 |
| indomitable | №0652 (+ 1 других файлов) |
| indomitableMight | №0652 |
| infernal | №0690 |
| infernalConduit | №0702 |
| infernalConduitDice | №0702 |
| infernalMajesty | №0702 |
| inferno | №0067 |
| influenceSlots | №0636 |
| informant | №0783 |
| infuseItem | №0652 |
| ingredient | №0084 (+ 1 других файлов) |
| INGREDIENT_SOURCES | №0085 |
| ingredientCategory | №0085 |
| ingredientId | №0085 |
| ingredientName | №0085 |
| ingredients | №0083 (+ 3 других файлов) |
| inheritsOrigin | №0070 |
| init | №0664 |
| initCreatedCharacter | №0674 |
| initialize | №0825 |
| initiative | №0632 (+ 23 других файлов) |
| initiativeBonus | №0780 (+ 2 других файлов) |
| initiativeDash | №0783 |
| initiativeDisadvantage | №0645 (+ 1 других файлов) |
| initiativeExploit | №0783 |
| initiativeFerocity | №0690 |
| initiativeOrPerception | №0783 |
| initiativeReagentsTo | №0783 |
| initiativeRoll | №1356 |
| initiativeSave | №0783 |
| initiativeTempHp | №0783 |
| initiativeTracker | №0864 (+ 21 других файлов) |
| ink | №0672 (+ 2 других файлов) |
| innatePsionics | №0718 |
| inner | №0062 |
| innerHeight | №1389 |
| innerHTML | №1291 (+ 2 других файлов) |
| innerWidth | №1389 |
| inscribe | №0783 |
| inscribedCount | №0783 |
| inscribedGearProficiency | №0783 |
| inscribedRunes | №0832 |
| inscription | №0832 |
| inscrutableMind | №0783 |
| insectoid | №0778 |
| insidiousImprecation | №0783 |
| insidiousSpell | №0783 |
| insight | №0776 (+ 1 других файлов) |
| insightAbility | №0783 |
| insightBonus | №0783 |
| insightfulOrder | №0783 |
| insightTotal | №0082 (+ 1 других файлов) |
| inspect | №0825 (+ 1 других файлов) |
| inspector | №0074 |
| inspectSource | №0857 |
| inspirationalSpeech | №0783 |
| inspirationOnKill | №0822 |
| inspiring_leader | №0786 |
| inspiringShout | №0783 |
| inspiringWord | №0743 |
| inspiringWordMaxHeal | №0780 (+ 1 других файлов) |
| inspiringWordUses | №0743 |
| install | №0072 |
| installed | №0082 (+ 1 других файлов) |
| installedAtLevel | №0082 |
| instant | №0082 |
| instantDeath | №0659 (+ 1 других файлов) |
| instinctualSuppression | №0783 |
| instruments | №0783 |
| int | №0628 (+ 52 других файлов) |
| intBonus | №0645 |
| intChecksAdvantage | №0645 (+ 1 других файлов) |
| intChecksDisadvantage | №0645 (+ 1 других файлов) |
| intellectDie | №0833 |
| intelligence | №0790 (+ 12 других файлов) |
| intelligenceOrWisdomOrCharisma | №0081 (+ 1 других файлов) |
| intelligentExplosion | №0082 |
| intelligentExplosions | №0681 |
| intensity | №0074 (+ 2 других файлов) |
| inter | №0836 |
| interceptAttack | №0822 |
| interceptHealing | №0822 |
| interceptInitiative | №0822 |
| interceptSave | №0822 |
| interdict | №0875 |
| interdictBoons | №0702 |
| interdiction | №0702 |
| interpolation | №0072 |
| interrupt | №0739 |
| interrupted | №0659 (+ 1 других файлов) |
| interruptedId | №0822 |
| interruptOneAttackOrAbility | №0783 |
| interruptUses | №0739 |
| intimidatingCommand | №0783 |
| intimidation | №0776 (+ 1 других файлов) |
| intimidationAdvantage | №0783 |
| intimidationPersuasionBonus | №0783 |
| intIncrease | №0783 |
| intMaxBonus | №0645 |
| intMaxIncrease | №0783 |
| intToAC | №0813 |
| intuition | №0832 |
| intWisChaSavesDisadvantage | №0645 |
| invadeHost | №0820 |
| inventory | №0790 (+ 20 других файлов) |
| inventoryEntries | №0822 |
| inventoryRef | №0797 (+ 4 других файлов) |
| inverseBindMatrices | №0072 (+ 1 других файлов) |
| investigation | №0776 (+ 1 других файлов) |
| investigationExpertise | №0780 |
| investigator | №0833 |
| invHeaderAC | №1333 |
| invigoratingOrders | №0783 |
| Invisibility | №0084 |
| invisibilityAfterCharnel | №0813 |
| invisible | №0690 (+ 2 других файлов) |
| invocation | №0832 |
| invocationSlots | №0783 |
| invoke | №0665 (+ 1 других файлов) |
| invokeCount | №0783 |
| invokeDebuff | №0783 |
| invokeHell | №0702 |
| invoking | №0832 |
| iokharic | №0783 (+ 1 других файлов) |
| iridescentStrike | №0848 |
| iron | №0672 (+ 2 других файлов) |
| Ironbound | №0799 |
| ironChin | №0720 |
| ironCommand | №0783 |
| ironIngot | №0677 |
| isActive | №0786 |
| isAlly | №1265 |
| isAssassin | №0652 |
| isBomb | №0082 (+ 3 других файлов) |
| isDead | №0650 |
| isEnabled | №0665 (+ 1 других файлов) |
| isExtra | №0650 (+ 9 других файлов) |
| isExtraClass | №0650 |
| isIndependentCreature | №0843 |
| isLarval | №0065 |
| isMagical | №1344 |
| isObject | №1264 |
| isRaceClassHybrid | №0653 (+ 6 других файлов) |
| isShirt | №0066 |
| isSkirtDress | №0066 |
| isSolid | №0075 |
| issues | №0676 |
| isSwarm | №0065 |
| item | №0066 (+ 18 других файлов) |
| itemId | №0817 |
| items | №0066 (+ 7 других файлов) |
| itemValue | №0671 (+ 1 других файлов) |
| itsAlive | №0783 |
| ix | №0065 |
| j | №0062 |
| jacket | №0066 |
| jackOfAllTrades | №0652 |
| jade | №0836 |
| jar | №0071 |
| jaw | №0065 |
| jawProjection | №0070 |
| jawWidth | №0067 (+ 2 других файлов) |
| jealousy | №0081 |
| jeweler | №0672 (+ 6 других файлов) |
| jinx | №1355 |
| jinxBonusAction | №0783 |
| jinxExtraDamage | №0783 |
| jinxOptions | №0783 |
| joinRoom | №1403 |
| joints | №0062 (+ 4 других файлов) |
| jotun | №0783 (+ 1 других файлов) |
| jotunbrudJuggernaut | №0783 |
| jotunStance | №0783 |
| journal | №0856 |
| json | №0657 (+ 5 других файлов) |
| jumpDistanceMultiplier | №0780 |
| jumpFt | №0783 |
| jumpMultiplier | №0783 |
| jungle | №0067 |
| junk | №0797 (+ 38 других файлов) |
| justDroppedToZero | №1350 |
| K | №1312 |
| keenAwareness | №0833 |
| keeperOfOrder | №0783 |
| key | №0075 (+ 13 других файлов) |
| KEY | №0075 |
| ki | №1342 (+ 2 других файлов) |
| killInspiration | №0822 |
| kiln | №0674 |
| kind | №0065 (+ 36 других файлов) |
| Kind | №1320 |
| kingdom | №0067 |
| kiPoints | №0707 |
| kitchen | №0071 |
| knighthood | №0783 |
| knockdown | №0780 |
| knockout | №0780 |
| knockoutIfSelfDamageReachesZero | №0783 |
| knockoutRoll | №0783 |
| knockProne | №0783 |
| knockProneSmaller | №0783 |
| knot | №0066 (+ 3 других файлов) |
| known | №0790 (+ 3 других файлов) |
| knownAt | №0702 |
| knownAtLevel | №0081 |
| knownCantrips | №0082 |
| knownClasses | №0840 |
| knownCount | №0783 |
| knownMetamorphoses | №0783 |
| knownReactions | №0084 |
| knowYourEnemy | №0783 |
| kobold | №0065 (+ 1 других файлов) |
| krd | №0799 |
| krynn | №0635 |
| label | №0836 (+ 22 других файлов) |
| laboratory | №0067 |
| labyrinth | №0067 |
| lace | №0066 |
| lairActions | №1438 |
| lairActionState | №0815 |
| lamp | №0071 |
| lampblack | №0677 |
| landscape | №0891 |
| landsStrideRanger | №0652 |
| language | №0783 (+ 1 других файлов) |
| languageChoice | №0783 |
| languages | №0628 (+ 4 других файлов) |
| lantern | №0071 |
| large | №0071 (+ 2 других файлов) |
| larva | №0820 |
| larvaGirth | №0070 (+ 2 других файлов) |
| larvaIsSeparateStatBlock | №0820 |
| larval | №0065 |
| larvaLength | №0070 (+ 2 других файлов) |
| larvalParts | №0065 |
| larvaTendrilSize | №0070 (+ 2 других файлов) |
| larvaToothSize | №0070 (+ 2 других файлов) |
| last | №0065 (+ 1 других файлов) |
| lastAttemptRound | №0809 |
| lastGatheredAt | №0882 |
| lastLifesMemories | №0783 |
| lastRest | №1425 |
| lastRestId | №0825 |
| lastRestock | №0803 (+ 1 других файлов) |
| lastRestoredKey | №0869 |
| lastRoll | №0809 |
| lastRound | №0809 |
| lastRun | №0858 |
| lastStandActive | №0822 |
| lastStandFinished | №0822 |
| lastStandReady | №0822 |
| lastTrump | №0825 |
| lastTrumpAvailable | №0825 |
| lastTrumpUsed | №0825 (+ 1 других файлов) |
| lastX | №0630 (+ 1 других файлов) |
| lastY | №0630 (+ 1 других файлов) |
| latency | №0856 |
| latitude | №0065 |
| laughingGas | №0082 |
| laughingGasBomb | №0783 |
| launch | №0865 |
| lawShield | №0780 |
| lawsShield | №0783 |
| layer | №0066 |
| layered | №0065 (+ 1 других файлов) |
| layers | №0065 |
| layOnHands | №0652 (+ 1 других файлов) |
| leadershipAbility | №0743 (+ 1 других файлов) |
| leadershipBased | №0783 |
| leadershipChoices | №0743 |
| leadershipForCheck | №0783 |
| leadershipForChecks | №0783 |
| leadershipForDeception | №0783 |
| leadershipForHistoryInvestigation | №0783 |
| leadershipForIntimidation | №0783 |
| leadershipForReligion | №0783 |
| leadershipModifier | №0743 |
| leadershipStyles | №0743 |
| leadTheCharge | №0783 |
| leaks | №1473 (+ 2 других файлов) |
| learnAnyCastableSpell | №0783 |
| learnBeastShape | №0783 |
| learnCantrip | №0783 |
| learned | №0882 |
| learnedAt | №0674 |
| learnFromUI | №0674 |
| learning | №0837 |
| learnLanguage | №0783 |
| learnMartialWeapon | №0783 |
| learnProfession | №0674 |
| learnSkill | №0783 |
| learnSpell | №0783 |
| learnTargetStatistic | №0783 |
| learnTool | №0783 |
| leather | №0066 (+ 7 других файлов) |
| leatherSole | №0676 |
| leatherStrapV49 | №0671 |
| leatherwork | №0672 (+ 1 других файлов) |
| leatherworker | №0673 (+ 5 других файлов) |
| leavingReach | №0823 (+ 2 других файлов) |
| lectern | №0071 |
| left | №0067 (+ 2 других файлов) |
| leg | №0065 |
| legacy_expansions | №0632 |
| legendary | №0797 (+ 6 других файлов) |
| legendaryActionCurrent | №0815 |
| legendaryActions | №0809 (+ 1 других файлов) |
| legendaryResistance | №0739 |
| legendaryResistanceCurrent | №0815 |
| legendaryResistances | №0809 (+ 1 других файлов) |
| legendaryTandem | №0783 |
| legLength | №0067 (+ 1 других файлов) |
| legs | №0067 (+ 2 других файлов) |
| length | №0063 (+ 19 других файлов) |
| level | №0784 (+ 83 других файлов) |
| level10 | №0081 |
| level18 | №0081 |
| level2 | №0081 |
| level20 | №0832 |
| level6 | №0081 |
| level9 | №0832 |
| levelData | №0704 |
| leveledUp | №0674 |
| levelName | №0674 |
| levels | №0081 (+ 48 других файлов) |
| LEVELS | №0674 |
| levelsRestored | №0652 |
| library | №0075 (+ 2 других файлов) |
| license | №0075 (+ 11 других файлов) |
| lichdom | №0813 |
| lieDetectionAutoFail | №0783 |
| lighting | №0075 |
| lightIntensity | №1320 |
| lightning | №0082 (+ 3 других файлов) |
| lightningArc | №0813 |
| lightningBomb | №0783 |
| lightRadius | №1320 |
| limb | №0065 |
| limbH | №0065 |
| limbIndices | №0065 |
| limbParts | №0065 |
| limbProfile | №0065 (+ 4 других файлов) |
| limbRecords | №0065 |
| limbState | №0065 |
| limestone | №0677 |
| limit | №0840 |
| limitations | №1453 (+ 1 других файлов) |
| line | №0855 |
| linen | №0066 |
| lineOfSight | №1412 (+ 2 других файлов) |
| lingerie | №0066 |
| link | №0780 |
| linked | №0780 |
| linkedClass | №0662 (+ 1 других файлов) |
| linkedHowl | №0645 |
| lipColor | №0070 (+ 1 других файлов) |
| lipOpacity | №1467 |
| lipVolume | №0070 |
| list | №0064 (+ 7 других файлов) |
| listAllClasses | №0665 |
| listByFamily | №0632 (+ 12 других файлов) |
| listBySource | №0632 (+ 12 других файлов) |
| listClasses | №0665 |
| listEquipment | №0070 |
| listPresets | №0070 |
| listRaces | №0070 |
| listSkins | №0070 |
| listSources | №0085 |
| listSubclasses | №0665 |
| liveBodyAfterReanimation | №0873 |
| liveEpoch | №0869 |
| liveRevision | №0869 |
| living | №0787 |
| livingStatue | №0783 |
| lizard | №0065 |
| lizardfolk | №0676 |
| lo | №0065 |
| load | №0073 (+ 4 других файлов) |
| loaded | №0077 |
| loadFailed | №1470 |
| loading | №0077 (+ 1 других файлов) |
| loadSkin | №0072 |
| local | №0062 (+ 1 других файлов) |
| localBackups | №0657 |
| localId | №0657 |
| localStorage | №1266 (+ 35 других файлов) |
| location | №1306 (+ 3 других файлов) |
| locked | №0078 |
| lockedAt1 | №0673 |
| locks | №0674 |
| log | №0852 |
| login | №0657 |
| logout | №0657 |
| long | №0065 (+ 1 других файлов) |
| longevity | №0082 (+ 1 других файлов) |
| longJumpBonusFt | №0783 |
| longRest | №0082 (+ 1 других файлов) |
| longRestAllHitDice | №0783 |
| longRestClears | №0082 |
| longRestEffects | №0822 |
| longRestExhaustionRecovery | №0783 |
| longRestHealingAllowed | №0873 |
| longRestLimit | №0645 |
| longRestOnRevive | №0783 |
| longRestRedistribute | №0783 |
| longRestTempHp | №0783 |
| longRestUses | №0082 |
| loom | №0071 |
| loot | №0074 (+ 19 других файлов) |
| lootId | №0078 |
| lootModel | №0810 |
| lootModels | №0810 |
| loreRecall | №0783 |
| los | №0660 (+ 1 других файлов) |
| loss | №0856 |
| lossHp | №0645 |
| lost | №0670 |
| Loveless | №0783 |
| low | №0063 |
| lowBlow | №0783 |
| lowest | №0062 (+ 1 других файлов) |
| lowestId | №0822 |
| loxodon | №1487 |
| lucidDreaming | №0783 |
| lucidWaking | №0783 |
| lucky | №0786 |
| lunge | №0783 |
| luxury | №0805 (+ 1 других файлов) |
| lycanthropy | №0081 |
| lyre | №0070 |
| M | №0822 |
| macroConfigSha256 | №1504 |
| macrotargets | №1310 |
| mage_slayer | №0786 |
| mageArmor | №0817 |
| mageArmorAC | №0822 |
| mageBerryCount | №0823 (+ 2 других файлов) |
| mageD20Bonus | №0822 |
| mageDamageType | №0823 (+ 1 других файлов) |
| mageEquipmentChanged | №0822 |
| mageGround | №0823 (+ 1 других файлов) |
| mageInfo | №0822 |
| mageOptions | №0822 |
| mageProgress | №0822 |
| mageSpellId | №0823 (+ 2 других файлов) |
| mageStat | №0823 (+ 1 других файлов) |
| mageTargetIds | №0823 (+ 2 других файлов) |
| mageWilling | №0823 (+ 2 других файлов) |
| magFilter | №0067 (+ 1 других файлов) |
| magic | №0848 (+ 2 других файлов) |
| Magic | №0084 |
| magic_initiate | №0786 |
| magicAdvantage | №0813 |
| magical | №0783 (+ 1 других файлов) |
| magical_beast | №0632 (+ 10 других файлов) |
| magicalAttack | №0645 (+ 4 других файлов) |
| magicalDarkness | №0783 |
| magicalFamiliarAttacks | №0783 |
| magicalSecrets | №0652 |
| magicalTinkering | №0652 |
| magicByAffinity | №0848 |
| magicInteractionSafe | №0783 |
| magicItemAdept | №0652 |
| magicShared | №0848 |
| maintainable | №0783 |
| maintainAction | №0783 |
| majestySplash | №0783 |
| major | №0825 |
| major_00 | №0825 |
| major_01 | №0825 |
| major_02 | №0825 |
| major_03 | №0825 |
| major_04 | №0825 |
| major_05 | №0825 |
| major_06 | №0825 |
| major_07 | №0825 |
| major_08 | №0825 |
| major_09 | №0825 |
| major_10 | №0825 |
| major_11 | №0825 |
| major_12 | №0825 |
| major_13 | №0825 |
| major_14 | №0825 |
| major_15 | №0825 |
| major_16 | №0825 |
| major_17 | №0825 |
| major_18 | №0825 |
| major_19 | №0825 |
| major_20 | №0825 |
| major_21 | №0825 |
| majorCost | №0825 |
| majorCurrent | №0825 |
| majorMax | №0825 |
| majorSpent | №0825 |
| makeWeaponAttack | №0783 |
| male | №0063 (+ 1 других файлов) |
| maleProfile | №0062 |
| malformed | №1316 |
| malformedTargetLines | №1314 (+ 1 других файлов) |
| manifest | №0846 |
| manifestations | №0799 |
| manifested | №0817 |
| manifestUrl | №0846 (+ 2 других файлов) |
| map | №0865 |
| mapId | №0075 |
| mappedDisplacementMax | №1315 |
| mappedDisplacementMean | №1315 |
| mappedDisplacementMedian | №1315 |
| mappedDisplacementP95 | №1315 |
| mappedMaxDisplacement | №1314 |
| mappedMeanDisplacement | №1314 |
| mappedMedianDisplacement | №1314 |
| mappedP95Displacement | №1314 |
| mappedRmsDisplacement | №1314 |
| mappedTargetEntries | №1315 |
| mappedVertices | №1304 |
| mapping | №1455 |
| maps | №0674 (+ 1 других файлов) |
| marble | №0676 |
| marchUntoDestiny | №0807 |
| margin | №1227 |
| mariner | №0783 |
| mark | №0783 |
| marked | №0645 (+ 2 других файлов) |
| markedForDeath | №0783 |
| marketPriceGp | №0803 (+ 1 других файлов) |
| marketReport | №0803 |
| marketSource | №0803 (+ 1 других файлов) |
| marketValue | №0668 (+ 1 других файлов) |
| markPrey | №0783 |
| maroon | №0872 |
| marsh_moss | №0882 |
| marsh_pool | №0882 |
| marsh_reeds | №0882 |
| marshes | №0882 |
| martial_adept | №0786 |
| martialBane | №0783 |
| martialFocus | №0783 |
| masks | №0065 |
| mason | №0674 (+ 3 других файлов) |
| master | №0674 |
| masterOfHell | №0702 |
| masterSpecialization | №0674 |
| masterTactician | №0783 |
| masterwork | №0669 (+ 1 других файлов) |
| masterworkBonus | №0673 |
| mastery | №0084 (+ 2 других файлов) |
| masteryExpiry | №0783 |
| masterySpent | №0783 |
| MAT2 | №0072 (+ 2 других файлов) |
| MAT3 | №0072 (+ 2 других файлов) |
| MAT4 | №0072 (+ 4 других файлов) |
| matched | №0806 |
| material | №0062 (+ 23 других файлов) |
| materialBridge | №0810 |
| materialCost | №0082 |
| materialCostGP | №0817 |
| materialCostPerLevelGP | №0817 |
| materialCount | №0669 |
| materialId | №0668 (+ 11 других файлов) |
| materialKind | №0066 |
| materialOnly | №0797 |
| materials | №0066 (+ 48 других файлов) |
| MATERIALS | №1297 (+ 13 других файлов) |
| materialsCost | №0082 |
| materialsPaid | №1265 |
| materialsUsed | №0669 |
| Math | №1291 (+ 5 других файлов) |
| maturity | №0063 (+ 1 других файлов) |
| max | №0065 (+ 51 других файлов) |
| max_mm | №1278 |
| max_morph_targets | №1307 |
| maxAbility | №0082 (+ 1 других файлов) |
| maxBloodLevels | №0817 |
| maxBuffer | №1499 |
| maxCR | №0783 (+ 1 других файлов) |
| maxDice | №0783 |
| maxDisplacementMeters | №1309 |
| maxDistanceFt | №0783 |
| maxExtraShredPsi | №0783 |
| maxHeal | №0783 |
| maxHitDice | №0783 |
| maxHitPoints | №1409 |
| maxHp | №0082 (+ 68 других файлов) |
| maxHP | №0788 (+ 3 других файлов) |
| maxHpReduction | №0783 |
| maxHpReductionOnNecrotic | №0783 |
| maximize | №0652 (+ 3 других файлов) |
| maximizeAttack | №0822 |
| maximized | №0659 (+ 1 других файлов) |
| maximizeDamageDice | №0652 (+ 1 других файлов) |
| maximizeElementalSpell | №0783 |
| maximizeNextAttack | №0822 |
| maximizeNextRoll | №0822 |
| maximum | №0082 |
| maxIntelligence | №0833 |
| maxLevels | №0652 (+ 1 других файлов) |
| maxObjects | №0783 |
| maxOutside | №1455 |
| maxPoints | №0628 (+ 1 других файлов) |
| maxPotions | №0082 |
| maxScore | №0783 |
| maxSizeFt | №0783 |
| maxSlots | №0848 |
| maxSpellLevel | №0807 |
| maxSpellLevelByLevel | №0807 |
| maxSpend | №0813 |
| maxSpendTempHp | №0783 |
| maxStages | №0082 |
| maxStrands | №0063 |
| maxStrDexCon | №0783 |
| maxTargets | №0783 |
| maxUses | №0658 |
| maxWeightLb | №0783 |
| me | №1325 (+ 9 других файлов) |
| measureStartId | №0630 |
| mechanics | №0681 (+ 16 других файлов) |
| mechanicsPending | №0875 (+ 1 других файлов) |
| mechanicsSource | №0705 (+ 3 других файлов) |
| mechanicsStatus | №0692 |
| medicine | №0674 (+ 3 других файлов) |
| medium | №0063 (+ 2 других файлов) |
| mediumArmorWisInsteadOfDex | №0783 |
| meleeAttack | №0783 (+ 1 других файлов) |
| meleeDamage | №0817 |
| meleeExtraDamage | №0783 |
| meleeOrThrown | №0660 (+ 1 других файлов) |
| meleeSpellAttack | №0783 |
| meleeWeaponAttack | №0783 |
| members | №0778 |
| menacingShout | №0783 |
| mentalAny | №0876 |
| mentalConstruct | №0783 |
| mentalDefense | №0780 |
| mentalSavesDisadvantage | №0783 |
| mentalSource | №0820 |
| mentalStats | №0788 |
| mentalStatsPersist | №0788 |
| mentor | №0743 (+ 2 других файлов) |
| mercenary | №0783 |
| merciless | №0783 |
| mercy | №0807 |
| mesh | №1305 (+ 1 других файлов) |
| meshes | №0067 (+ 5 других файлов) |
| meshWeights | №0073 (+ 1 других файлов) |
| message | №0081 (+ 33 других файлов) |
| messy | №0065 |
| messy_crop | №0065 (+ 1 других файлов) |
| meta | №0855 |
| META_COST | №0652 |
| META_NAMES | №0652 |
| metadata | №0082 (+ 12 других файлов) |
| metal | №0066 (+ 1 других файлов) |
| metalworker | №0674 |
| metamagic | №0652 |
| metamagic_adept | №0786 |
| metamorphosesKnown | №0652 |
| metamorphosesMax | №0652 |
| metamorphosis | №0081 |
| method | №0657 (+ 4 других файлов) |
| metrics | №0067 |
| mettle | №0659 (+ 2 других файлов) |
| mid | №0867 |
| mimic | №0690 |
| min | №0065 (+ 17 других файлов) |
| minAppVersion | №0846 (+ 1 других файлов) |
| minAt11 | №0783 |
| Mind | №0084 |
| mindLeech | №0783 |
| mindRead | №0780 |
| mindReadingImmunity | №0783 |
| mindsightFt | №0783 |
| mindsightTrackingHours | №0783 |
| mindStats | №0820 |
| mindThrust | №0783 |
| miner | №0805 (+ 1 других файлов) |
| mineral | №0830 |
| minFilter | №0067 (+ 1 других файлов) |
| minHeight | №0890 |
| minimal | №0070 |
| minimum | №0082 (+ 3 других файлов) |
| minimumAC | №0783 |
| minimumD20 | №0783 |
| minIndex | №1316 |
| mining | №0829 (+ 1 других файлов) |
| minion | №0783 |
| minionResistance | №0783 |
| minionRollBonus | №0783 |
| minionTypes | №0783 |
| minLevel | №0676 |
| minor | №0825 |
| minotaur | №1487 |
| minPsi | №0783 |
| minStr | №0088 |
| minusD4AllD20 | №0783 |
| minutesSinceDeath | №1265 |
| minWidth | №0890 |
| miracle | №0817 |
| miraculousHealing | №0807 |
| miserableCompany | №0783 |
| misfortune | №0081 (+ 1 других файлов) |
| miss | №0783 |
| missed | №0839 |
| missedUnarmedExtraAttack | №0783 |
| missing | №0668 (+ 5 других файлов) |
| missingTools | №0672 (+ 2 других файлов) |
| missRecoveryMinutes | №0783 |
| missRefund | №0783 |
| missRefunds | №0813 |
| mistAffinity | №0633 |
| mistStep | №0817 |
| mithral | №0672 |
| mitosis | №0843 |
| mix | №0085 |
| mixBonus | №1357 |
| mixedPotions | №0783 |
| mixPotions | №0082 |
| mobility | №0645 |
| Mobility | №0783 |
| mod | №0831 (+ 1 других файлов) |
| mode | №0063 (+ 18 других файлов) |
| model | №0074 (+ 2 других файлов) |
| modelFamily | №0070 |
| modelLoc | №0077 |
| models | №2338 |
| modes | №0832 |
| modifier | №0805 (+ 5 других файлов) |
| modifierAtLevel20 | №0833 |
| modifierIds | №0678 |
| modifiers | №0783 (+ 1 других файлов) |
| modifyStats | №0822 |
| modules | №0857 |
| mohawk | №0065 (+ 1 других файлов) |
| monastery | №0071 |
| monster | №0810 (+ 3 других файлов) |
| monster_acid_slime | №0830 |
| monster_acolyte_cloth | №0830 |
| monster_air_essence | №0830 |
| monster_air_vortex | №0830 |
| monster_ankheg_acid_gland | №0830 |
| monster_ankheg_shell | №0830 |
| monster_bandit_captain_leather_armor | №0830 |
| monster_bandit_hide | №0830 |
| monster_basilisk_eye | №0830 |
| monster_basilisk_gallstone | №0830 |
| monster_basilisk_scale | №0810 |
| monster_bear_fat | №0830 |
| monster_bear_hide | №0830 |
| monster_blink_dog_pelt | №0830 |
| monster_blink_dog_phase_gland | №0830 |
| monster_boar_hide | №0830 |
| monster_boar_tusk | №0830 |
| monster_bugbear_fang | №0830 |
| monster_bugbear_hide | №0830 |
| monster_carrion_chitin | №0830 |
| monster_carrion_crawler_paralytic | №0830 |
| monster_constrictor_hide | №0830 |
| monster_constrictor_venom | №0830 |
| monster_crocodile_hide | №0830 |
| monster_crocodile_teeth | №0830 |
| monster_cultist_cloth | №0830 |
| monster_deer_antler | №0830 |
| monster_deer_hide | №0830 |
| monster_direwolf_fang | №0830 |
| monster_direwolf_hide | №0810 (+ 1 других файлов) |
| monster_displacer_hide | №0830 |
| monster_displacer_tentacle | №0830 |
| monster_dragon_blood | №0810 |
| monster_dragon_bones | №0810 (+ 1 других файлов) |
| monster_dragon_heart | №0830 |
| monster_dragon_scales | №0810 (+ 1 других файлов) |
| monster_earth_core | №0830 |
| monster_earth_essence | №0830 |
| monster_ectoplasm | №0830 |
| monster_ethereal_shard | №0830 |
| monster_fire_ash | №0830 |
| monster_fire_essence | №0830 |
| monster_frog_gland | №0830 |
| monster_frog_skin | №0830 |
| monster_ghost_thread | №0830 |
| monster_ghoul_claw | №0830 |
| monster_ghoul_tissue | №0830 |
| monster_giant_eagle_claw | №0830 |
| monster_giant_eagle_feather | №0830 |
| monster_giant_owl_eye | №0830 |
| monster_giant_owl_feather | №0830 |
| monster_gnoll_hide | №0830 |
| monster_gnoll_tooth | №0830 |
| monster_goblin_hide | №0830 |
| monster_harpy_vocal_membrane | №0830 |
| monster_hyena_fangs | №0830 |
| monster_hyena_hide | №0830 |
| monster_kobold_horn | №0830 |
| monster_kobold_scalehide | №0830 |
| monster_manticore_hide | №0830 |
| monster_manticore_meat | №0830 |
| monster_manticore_spines | №0810 |
| monster_meat | №0830 |
| monster_mimic_skin | №0830 |
| monster_mimic_slime | №0830 |
| monster_orc_hide | №0830 |
| monster_owlbear_claw | №0830 |
| monster_owlbear_feathers | №0810 |
| monster_owlbear_hide | №0810 (+ 1 других файлов) |
| monster_rat_fangs | №0830 |
| monster_rat_hide | №0830 |
| monster_rust_chitin | №0830 |
| monster_rust_gland | №0830 |
| monster_shadow_clot | №0830 |
| monster_slime_membrane | №0830 |
| monster_spectral_dust | №0830 |
| monster_spider_chitin | №0810 |
| monster_spider_silk | №0810 (+ 1 других файлов) |
| monster_spider_venom | №0830 |
| monster_troll_blood | №0810 (+ 1 других файлов) |
| monster_troll_claw | №0830 |
| monster_troll_hide | №0810 (+ 1 других файлов) |
| monster_veteran_leather_armor | №0830 |
| monster_water_core | №0830 |
| monster_water_essence | №0830 |
| monster_wight_bone | №0830 |
| monster_wight_essence | №0830 |
| monster_wolf_hide | №0810 (+ 1 других файлов) |
| monsterCount | №0809 |
| monsterCR | №0812 |
| monsterId | №0787 (+ 5 других файлов) |
| monsterName | №0815 |
| monsterparts | №0805 (+ 1 других файлов) |
| MONSTERS | №0659 |
| monstrosity | №0632 (+ 13 других файлов) |
| monstrousGrafts | №0082 |
| monstrousMenagerie | №0783 |
| monstrousMinion | №0780 (+ 1 других файлов) |
| moonEffects | №0817 |
| morph_names | №1307 |
| morph_primitives | №1307 |
| morphAccessor | №1304 |
| morphBufferView | №1304 |
| morphChannels | №0072 (+ 1 других файлов) |
| morphNames | №0073 (+ 2 других файлов) |
| morphs | №0070 (+ 3 других файлов) |
| morphSet | №0070 |
| morphTargets | №0073 (+ 1 других файлов) |
| morphWeights | №0070 |
| mount | №0813 |
| mountaineer | №0783 |
| mountainsEndurance | №0783 |
| mountCantripSwap | №0813 |
| mounted | №0817 |
| mountRollBonus | №0783 |
| mountSpeed | №0813 |
| moustache | №0067 (+ 3 других файлов) |
| mouth | №0065 |
| mouthWidth | №0070 (+ 1 других файлов) |
| moveAlliesHalfSpeed | №0783 |
| moveAndAttack | №0783 |
| moveCostFt | №0082 |
| moved | №0867 |
| movedFt | №0822 |
| moveFt | №0690 (+ 4 других файлов) |
| moveHalfSpeed | №0645 |
| movement | №0082 (+ 19 других файлов) |
| movementAllowance | №0822 |
| movementUsed | №0082 (+ 14 других файлов) |
| movementWithoutOpportunityAttacks | №0817 |
| moveReward | №0822 |
| moveStraightFt | №0783 |
| moveThralls | №0813 |
| moveThroughCreatures | №0783 |
| moveThroughProneCreatures | №0783 |
| moveTo | №0815 (+ 1 других файлов) |
| moveToward | №0660 |
| moving | №0065 |
| moxie | №0720 (+ 2 других файлов) |
| moxieFraction | №0780 |
| moxieFueledFists | №0720 |
| moxieOnFail | №0783 |
| moxieRefunded | №0783 |
| moxieRestored | №0783 |
| moxieSpent | №0783 |
| msg | №0853 (+ 1 других файлов) |
| muddledMind | №0645 |
| mufflingImprecation | №0783 |
| mult | №0671 (+ 1 других файлов) |
| multiAttackAction | №0659 (+ 1 других файлов) |
| multiclass | №0082 (+ 8 других файлов) |
| multiclassAllowed | №0650 (+ 8 других файлов) |
| multiclassProficiencies | №0681 (+ 6 других файлов) |
| multiclassRequirement | №0081 (+ 18 других файлов) |
| multiplier | №0809 |
| mummification | №0783 |
| mummyLord | №0783 |
| mummyRot | №0783 |
| muscle | №0067 (+ 5 других файлов) |
| mutagen | №0645 (+ 2 других файлов) |
| mutagenAbility | №0082 |
| mutagencraft | №0645 |
| mutagenMaximum | №0082 |
| mutagenNoDownside | №0082 |
| mutagens | №0645 (+ 1 других файлов) |
| mutations | №0820 (+ 2 других файлов) |
| mutationSlots | №0820 (+ 1 других файлов) |
| muzzle | №0065 |
| muzzleHeight | №0070 (+ 7 других файлов) |
| muzzleLength | №0070 (+ 9 других файлов) |
| muzzleWidth | №0070 (+ 7 других файлов) |
| myconid | №1479 |
| mysteries | №0711 (+ 1 других файлов) |
| mystery | №0817 |
| mysticArcanum | №0652 |
| mysticEmpowerment | №0837 |
| mysticFrenzy | №0645 |
| mythicForms | №0837 |
| mythicVoice | №0783 |
| n | №0062 (+ 4 других файлов) |
| name | №0064 (+ 239 других файлов) |
| NAME | №0670 |
| nameRu | №0628 (+ 8 других файлов) |
| nameRus | №1224 |
| names | №1355 (+ 1 других файлов) |
| narrow | №0065 (+ 2 других файлов) |
| native | №0814 (+ 1 других файлов) |
| nativeHeadH | №0065 |
| natural | №0070 |
| natural20 | №0815 (+ 1 других файлов) |
| naturalArmor | №0837 |
| naturalAttacks | №0820 (+ 1 других файлов) |
| naturalExplorer | №0652 |
| naturalist | №0833 |
| naturalRecovery | №0820 |
| naturalWeapons | №0837 |
| nature | №0776 (+ 2 других файлов) |
| Nausea | №0084 |
| navigation | №0780 |
| navigator | №1296 (+ 9 других файлов) |
| navigatorCrew | №0783 |
| navy | №0872 |
| nearAllyId | №0822 (+ 1 других файлов) |
| neck | №0065 (+ 2 других файлов) |
| neckDepth | №1275 (+ 2 других файлов) |
| neckline | №1275 (+ 1 других файлов) |
| necrodancer | №0813 |
| necromancyDamageBonusPerCharnel | №0813 |
| necromancyUnleashed | №0813 |
| necromanticSpurs | №0783 |
| necromanticSustainment | №0783 |
| necrotic | №0780 (+ 1 других файлов) |
| Necrotic | №0084 |
| necroticAffinity | №0817 |
| necroticBone | №0830 |
| necroticDamage | №0780 (+ 2 других файлов) |
| necroticEssence | №0830 |
| necroticIgnoreImmunity | №0813 |
| necroticIgnoreResistance | №0813 |
| necroticReagent | №0830 |
| need | №0676 |
| needsChoice | №0082 |
| needsConfirmation | №0082 |
| needsDonor | №0082 |
| needsMaterials | №0082 |
| needsRoll | №0082 |
| needsSubclassChoice | №0704 |
| needsTarget | №0082 |
| needsTime | №0082 |
| negatingAnathema | №0783 |
| negative | №1266 (+ 3 других файлов) |
| negotiated | №0805 |
| negotiatedPrice | №0805 |
| negotiatedQuote | №0805 |
| negotiationModifier | №0805 |
| network | №0852 (+ 2 других файлов) |
| neutral | №0069 |
| newDraft | №0865 |
| newJinxOptions | №0783 |
| newTraderIds | №0804 |
| newValue | №0815 |
| next | №0062 (+ 2 других файлов) |
| nextAttackAdvantage | №0645 (+ 1 других файлов) |
| nextAttackBonus | №0783 |
| nextAttackExtraDice | №0082 |
| nextBombOnly | №0082 |
| nextConcentrationSaveDisadvantage | №0645 |
| nextDamageDice | №0783 |
| nextHitCrit | №0783 |
| nextRiteHitExtraDie | №0645 |
| nextRollMaximum | №0822 |
| nextSaveAdvantage | №0783 |
| nextSpellOrWeaponDamageDisadvantage | №0783 |
| nextTick | №0082 (+ 1 других файлов) |
| nextWisSaveDisadvantage | №0645 |
| night | №0077 |
| nighteye | №0645 |
| Nighteye | №0783 |
| nightforest | №0067 |
| nightmareMount | №0813 |
| nightTerrors | №0783 |
| nightTerrorsWhileAsleep | №0783 |
| noAction | №0783 |
| noActions | №0822 |
| noAging | №0783 |
| noAttacks | №0822 (+ 1 других файлов) |
| Noble | №0799 |
| noConcentrationCheck | №0807 |
| noCoverOrInvisibility | №0645 |
| noDamage | №0082 |
| noDash | №0783 |
| node | №0072 (+ 3 других файлов) |
| nodeId | №0882 |
| nodeIntegration | №0890 |
| nodes | №0882 (+ 7 других файлов) |
| noDisadvantage | №0783 |
| noDisengage | №0822 |
| noFallDamage | №0783 |
| noFoodOrDrink | №0783 |
| noForcedMovement | №0822 (+ 1 других файлов) |
| noFreeWill | №0873 |
| noHealing | №0783 |
| noHealingFromOwnSpells | №0807 |
| noHealingUntilStartNextTurn | №0783 |
| noHelp | №0822 |
| noHide | №0066 (+ 1 других файлов) |
| noMainAction | №0822 (+ 1 других файлов) |
| noMaintainAction | №0783 |
| noMovement | №0822 |
| nonAttackAccursedDamageBonus | №0783 |
| nonCombat | №0661 |
| none | №0070 (+ 1 других файлов) |
| nonlethal | №0082 |
| nonmagicalDamageReduction | №0783 |
| nonManifold | №1280 |
| nonZeroMappedGlbVertexPct | №1314 |
| nonZeroMappedGlbVertices | №1314 |
| nonZeroPct | №1304 |
| nonZeroTargetEntries | №1315 |
| nonZeroVertices | №1304 |
| noOldAgeDeath | №0817 |
| noOpportunity | №0780 |
| noOpportunityAttacks | №0082 (+ 3 других файлов) |
| noReaction | №0783 (+ 1 других файлов) |
| noReactions | №0645 (+ 4 других файлов) |
| noReduction | №0783 |
| noRest | №0783 |
| normal | №0831 (+ 1 других файлов) |
| normalForm | №0837 |
| normalize | №0063 (+ 6 других файлов) |
| normalizeCharacter | №0788 (+ 3 других файлов) |
| normalizeClassName | №0840 |
| normalizeConditionName | №0831 (+ 2 других файлов) |
| normalizeHead | №0070 |
| normalPaceStealth | №0783 |
| normals | №0065 (+ 2 других файлов) |
| noseLength | №0070 |
| noseWidth | №0070 (+ 1 других файлов) |
| noShield | №0783 |
| noSpells | №0822 |
| noStandardHealing | №0843 |
| noSurprise | №0783 |
| notation | №0833 |
| note | №0659 (+ 8 других файлов) |
| noteAffect | №0822 |
| noteD20Roll | №0822 |
| noteMove | №0822 |
| notes | №0628 (+ 28 других файлов) |
| noTransfer | №0822 |
| noUnderwaterDrawbacks | №0783 |
| nourishing | №0783 |
| noVerbal | №0822 (+ 1 других файлов) |
| npcs | №1406 |
| nTexture | №0080 |
| nuclearBomb | №0681 |
| nullification | №0783 |
| number | №0825 |
| numerator | №0825 |
| nylon | №0066 |
| oak | №0676 (+ 1 других файлов) |
| objectId | №0783 (+ 2 других файлов) |
| objectIds | №1355 |
| objectMeleeDamageMultiplier | №0783 |
| objects | №0075 (+ 1 других файлов) |
| obscured | №0690 |
| observe | №0645 |
| obstacles | №1321 (+ 10 других файлов) |
| obstinateAnathema | №0783 |
| occultFetish | №0817 |
| occultRitesKnown | №0711 |
| ocean | №0067 |
| odds | №0825 |
| offer | №0825 |
| offeredCp | №0805 (+ 1 других файлов) |
| official | №0664 (+ 1 других файлов) |
| official_expansion | №0632 |
| offline | №0856 (+ 1 других файлов) |
| oil | №0082 |
| oilBomb | №0783 |
| oilCoated | №0082 |
| ok | №0836 (+ 79 других файлов) |
| old | №0815 |
| oldFormat | №1333 |
| oldLevel | №0674 |
| oldOneTwo | №0783 |
| omnipotence | №0783 (+ 1 других файлов) |
| omnipresence | №0783 (+ 1 других файлов) |
| omniscience | №0783 (+ 1 других файлов) |
| onApply | №0847 |
| onAttackResult | №0081 (+ 8 других файлов) |
| once | №0086 (+ 6 других файлов) |
| oncePerLongRest | №0807 |
| oncePerTurn | №0082 (+ 1 других файлов) |
| onChange | №0657 |
| onclick | №1413 |
| onCondition | №0645 (+ 5 других файлов) |
| onDamage | №0645 (+ 4 других файлов) |
| onDefeat | №0787 |
| onePerShortRest | №0813 |
| oneThirdCaster | №0783 |
| onFail | №0778 (+ 1 других файлов) |
| ongoingDamage | №0690 |
| onHitSave | №0822 |
| onLine | №1296 (+ 1 других файлов) |
| onlyDeadBodies | №0873 |
| onlyMisfortuneFeatures | №0783 |
| onNatural1 | №0082 |
| onPreyDeath | №0783 |
| onProgress | №0846 |
| onRetry | №0847 |
| onSave | №0783 |
| onSavingThrow | №0652 (+ 1 других файлов) |
| onTurnEnd | №0081 (+ 10 других файлов) |
| ooze | №0778 |
| opacity | №0065 (+ 1 других файлов) |
| open | №0064 (+ 27 других файлов) |
| OPENAI_API_KEY | №1262 |
| openBoard | №0865 |
| openDebug | №0852 |
| openHandTechnique | №0815 |
| openInfo | №0670 |
| openLog | №0852 |
| openMainMenuUpdate | №0846 |
| openMind | №0783 |
| openReplay | №0851 |
| openTrade | №0805 |
| operationId | №0822 (+ 20 других файлов) |
| opportunityAdvantage | №0822 |
| opportunityAttack | №0822 (+ 3 других файлов) |
| opportunityAttackBecomesGrapple | №0783 |
| optics | №0674 |
| optional | №0799 |
| optionalSlotDice | №0783 |
| options | №0066 (+ 6 других файлов) |
| optionsFor | №0066 |
| opts | №0815 (+ 1 других файлов) |
| oracle | №0645 (+ 2 других файлов) |
| Oracle | №0711 |
| orange | №0836 |
| orcish_fury | №0786 |
| orcsteppe | №0067 |
| order | №0645 (+ 1 других файлов) |
| orders | №0692 (+ 1 других файлов) |
| organ | №0830 |
| organic | №0067 |
| origin | №0077 |
| original | №0082 |
| originalStats | №0820 (+ 1 других файлов) |
| originRaceId | №0070 (+ 1 других файлов) |
| ostorianDiscourse | №0783 |
| other | №1273 (+ 2 других файлов) |
| otherStyleEffectsPending | №0876 |
| otherworldlyPatron | №0645 |
| outcome | №0676 (+ 1 других файлов) |
| outcomeLabel | №0676 |
| outer | №0062 (+ 2 других файлов) |
| outlandsEligible | №0636 |
| outOfOrder | №0856 |
| output | №0671 (+ 7 других файлов) |
| outputBytes | №1304 |
| oval | №0067 (+ 1 других файлов) |
| oven | №0071 |
| overCorset | №0066 |
| overCuirass | №0066 |
| overflow | №1466 |
| overheat | №0783 |
| overheatIgnoresImmunity | №0783 |
| overlay | №0847 |
| overlord | №0813 |
| overpayCp | №0806 |
| owl | №0065 |
| owlbear | №0690 |
| own | №1323 |
| ownedCondition | №0822 |
| owner | №1266 |
| owner_id | №1296 |
| ownerId | №0082 (+ 10 других файлов) |
| ownerPeerId | №1349 (+ 7 других файлов) |
| ownerTokenId | №0082 (+ 4 других файлов) |
| ownerTurns | №0645 |
| ownTurnId | №0825 (+ 2 других файлов) |
| ox | №0076 |
| oy | №0076 |
| p | №0062 (+ 2 других файлов) |
| p_deleted | №0657 |
| p_expected_revision | №0657 |
| p_id | №0657 |
| p_operation_id | №0657 |
| p_profile | №0657 |
| p_schema_version | №0657 |
| p1 | №1412 (+ 3 других файлов) |
| p2 | №1412 |
| pa | №1349 |
| pack | №0067 (+ 7 других файлов) |
| PACK_ID | №0082 (+ 2 других файлов) |
| packId | №0665 |
| packleader | №0783 |
| Packleader | №0799 |
| packs | №0780 (+ 2 других файлов) |
| packTactics | №0783 |
| pact | №0831 (+ 1 других файлов) |
| pactBoon | №0652 |
| pactLevel | №0802 |
| pactMagic | №0645 (+ 3 других файлов) |
| pactMagicData | №0815 (+ 4 других файлов) |
| padding | №0675 |
| paid_api_authorized | №1262 |
| painkiller | №0783 |
| painkillerGrandStrategist | №0783 |
| painkillerPunishment | №0783 |
| paint | №0082 |
| paintBomb | №0783 |
| paintCreatures | №0082 |
| painter | №0674 (+ 3 других файлов) |
| paintV38 | №0676 |
| paladin | №0802 (+ 1 других файлов) |
| paleMaster | №0813 |
| panelScroll | №1466 |
| panelUV | №0066 |
| panX | №0074 (+ 2 других файлов) |
| panY | №0074 (+ 2 других файлов) |
| paper | №0672 (+ 2 других файлов) |
| Paragon | №0799 |
| paragonOfChivalry | №0783 |
| paralyticReagent | №0830 |
| paralyzed | №0783 (+ 1 других файлов) |
| parasiteMind | №0820 |
| parchment | №0672 (+ 2 других файлов) |
| parent | №0824 |
| parentContainerId | №0793 |
| parentId | №0843 |
| parentNode | №1413 |
| parentTriangles | №1472 (+ 3 других файлов) |
| parley | №0783 |
| parleyFree | №0783 |
| parseDice | №0831 (+ 5 других файлов) |
| part | №0069 |
| partial | №0063 |
| participantTurnStart | №0822 |
| partnerId | №0822 |
| parts | №0062 (+ 13 других файлов) |
| pass | №0858 |
| passesThroughCreatures | №0783 |
| passive | №0067 (+ 9 других файлов) |
| password | №0657 |
| patch | №0669 (+ 1 других файлов) |
| path | №0071 (+ 32 других файлов) |
| pathCost | №1426 (+ 1 других файлов) |
| pathFt | №0815 |
| patientDefense | №0652 |
| patron | №0645 (+ 5 других файлов) |
| patrons | №0645 |
| patternScale | №0066 |
| pauldrons | №0066 |
| pawPadColor | №0070 |
| payHitPointCost | №0659 |
| payload | №0815 (+ 16 других файлов) |
| payOwnHPForCharnel | №0813 |
| PB | №0788 (+ 3 других файлов) |
| pc | №0814 |
| pd | №1349 |
| peaceAura | №0822 (+ 2 других файлов) |
| peaceBlocked | №0659 (+ 1 других файлов) |
| peakPhysicalCondition | №0720 (+ 1 других файлов) |
| pectorals | №0067 (+ 1 других файлов) |
| peer | №0815 |
| peerId | №1403 |
| peerName | №0814 |
| penaltyPerFatigue | №0783 |
| pending | №0082 (+ 3 других файлов) |
| pendingAnswer | №0814 |
| pendingAttack | №0659 (+ 1 других файлов) |
| pendingDamage | №0645 (+ 3 других файлов) |
| pendingInitiativeBonus | №0822 |
| pendingOffer | №0814 |
| pendingOnHit | №0082 (+ 3 других файлов) |
| pendingReaction | №0815 |
| pendingReactions | №0815 (+ 1 других файлов) |
| pendingSelection | №0652 |
| penetratesResistance | №0783 |
| penetratingDice | №0783 |
| pentacles | №0822 (+ 1 других файлов) |
| pentacles_14 | №0822 |
| percent | №0825 |
| perception | №0776 (+ 1 других файлов) |
| Perception | №0084 |
| perceptionReagent | №0830 |
| percipient | №0645 |
| Percipient | №0783 |
| perfectSelf | №0652 |
| performance | №0776 (+ 3 других файлов) |
| perilousGambit | №0783 |
| permanentCurse | №0783 |
| persistent | №0783 |
| persistentRage | №0652 |
| persona | №0783 |
| persuasion | №0776 (+ 2 других файлов) |
| persuasionDeceptionIntimidationFloor | №0783 |
| perTargetLongRest | №0783 |
| perTurn | №0813 |
| petrification | №0783 |
| Petrification | №0084 |
| petrificationReagent | №0830 |
| pharaoh | №0813 |
| phase | №0065 (+ 3 других файлов) |
| phaseFiber | №0830 |
| phaseReagent | №0830 |
| phaseRift | №0783 |
| phaseRiftNoStraightLine | №0783 |
| phaseThrough | №0783 |
| phaseWeaponAttack | №0783 |
| philosophersStone | №0681 |
| physicalAndroidQA | №1309 |
| physicalResistance | №0843 |
| physicalStats | №0788 (+ 1 других файлов) |
| physicalStatsFromShell | №0788 |
| physician | №0833 |
| pickFloor | №0077 |
| pickLevel | №0081 (+ 18 других файлов) |
| piercing | №0875 |
| pigment | №0676 |
| pineResin | №0677 |
| pissAndVinegar | №0720 |
| pitch | №0074 (+ 1 других файлов) |
| pixie | №0065 (+ 1 других файлов) |
| pl | №0077 |
| placeToken | №0865 |
| plague | №0843 |
| plagueLord | №0813 |
| plain | №0667 |
| plan | №0815 (+ 1 других файлов) |
| planar | №0636 |
| planarInfluence | №0636 |
| planes | №0636 |
| planescape | №0636 |
| planned | №0664 |
| planPreview | №0630 |
| plant | №0632 (+ 11 других файлов) |
| plasmoid | №1479 |
| plateColor | №0070 (+ 1 других файлов) |
| plates | №0070 |
| plateSize | №0070 (+ 2 других файлов) |
| play | №0822 (+ 1 других файлов) |
| playerAction | №1413 |
| playfair | №0836 |
| playing | №0086 (+ 1 других файлов) |
| playingTheOdds | №0783 |
| pleats | №0066 (+ 3 других файлов) |
| plusDex | №0817 |
| pockets | №0632 (+ 18 других файлов) |
| pocketSand | №0783 |
| point | №0065 (+ 2 других файлов) |
| pointerId | №1266 |
| points | №0065 (+ 1 других файлов) |
| poison | №0652 (+ 3 других файлов) |
| poisonBypass | №0817 |
| poisoned | №0813 (+ 1 других файлов) |
| poisoner | №0676 (+ 3 других файлов) |
| poisonIgnoresImmunity | №0813 |
| poisonIgnoresResistance | №0813 |
| poisonOnCharnel | №0813 |
| poisonResistance | №0780 |
| polearm_master | №0786 |
| polyglot | №0783 (+ 1 других файлов) |
| ponytail | №0065 (+ 1 других файлов) |
| pool | №0813 (+ 1 других файлов) |
| poor | №0669 (+ 1 других файлов) |
| porcelainClay | №0677 |
| portalAffinity | №0636 |
| portalRoute | №0636 |
| pos | №0077 |
| pose | №0070 |
| poseBuilds | №0067 |
| poses | №0069 |
| position | №0065 (+ 10 других файлов) |
| POSITION | №0068 (+ 6 других файлов) |
| positions | №0062 (+ 11 других файлов) |
| positive | №1266 (+ 3 других файлов) |
| Possessed | №0783 |
| possession | №0081 (+ 1 других файлов) |
| possessLiving | №0788 |
| postMessage | №0891 |
| pot | №0071 |
| potash | №0677 |
| potency | №0084 (+ 1 других файлов) |
| Potency | №0783 |
| potentObservation | №0833 |
| potion | №0082 (+ 4 других файлов) |
| potionBrewing | №0681 |
| potionCap | №0813 |
| potionColor | №0082 (+ 1 других файлов) |
| potionMixologist | №0681 |
| potions | №0082 |
| potter | №0674 (+ 3 других файлов) |
| pottery | №0672 (+ 1 других файлов) |
| power | №0065 (+ 2 других файлов) |
| powerOfTwo | №0067 |
| powerPreference | №0077 |
| pp | №0794 (+ 5 других файлов) |
| precedence | №0858 |
| precision | №0645 |
| Precision | №0783 |
| precisionStrike | №0783 |
| precognition | №0783 |
| predatoryInstinct | №0783 |
| predictiveDodge | №0783 |
| predictorCardId | №1341 (+ 1 других файлов) |
| predictorMajor | №1342 |
| predictorState | №1296 |
| preload | №0890 |
| premium | №1258 |
| prepare | №0069 (+ 1 других файлов) |
| prepared | №0082 (+ 4 других файлов) |
| preparedActions | №0815 (+ 1 других файлов) |
| preparedByLevel | №0807 (+ 1 других файлов) |
| preparedClasses | №0840 |
| preparedLastStand | №0822 |
| preparedLimit | №0840 |
| preparedReactionAttack | №0652 |
| preparedSpells | №0807 (+ 1 других файлов) |
| prepareForLibrary | №0075 |
| prepareInspiration | №0822 |
| prerequisite | №0692 (+ 6 других файлов) |
| present | №0837 (+ 1 других файлов) |
| preserved | №0783 |
| preserveLife | №0652 (+ 1 других файлов) |
| preset | №0067 (+ 5 других файлов) |
| presetId | №0070 (+ 1 других файлов) |
| presets | №0070 (+ 1 других файлов) |
| press | №0071 |
| preSubclassBase | №0825 |
| pretendToBeVisual | №1319 |
| preventDropToZero | №0783 |
| preventExhaustion | №0783 |
| preventOpportunity | №0822 |
| preventsOpportunity | №0822 |
| preventZero | №0783 |
| preventZeroHp | №0690 |
| preview | №0075 |
| previewDisassembly | №0668 |
| previous | №0787 (+ 1 других файлов) |
| previousHp | №0659 |
| preyDamage | №0783 |
| price | №0632 (+ 20 других файлов) |
| priceImproved | №1361 |
| priceModifier | №0805 |
| primalChampion | №0652 |
| primalResilience | №0837 |
| primary | №0836 |
| primaryAbilities | №0082 (+ 4 других файлов) |
| primaryResourceId | №0085 |
| primaryStat | №0081 (+ 31 других файлов) |
| primeBomb | №0681 |
| primeval | №0783 |
| primevalForm | №0837 |
| primevalResurgence | №0837 |
| primitives | №1305 (+ 1 других файлов) |
| primordial | №0690 |
| priority | №0652 (+ 2 других файлов) |
| prismatic | №0082 |
| prismaticBomb | №0783 |
| prismaticIndex | №1265 |
| pristine | №0668 (+ 1 других файлов) |
| privileges | №0890 |
| processedEach | №0667 |
| processedId | №0830 |
| processedRuns | №0667 |
| processedUnit | №0830 |
| processing | №0676 (+ 1 других файлов) |
| prodigy | №0676 |
| profBonus | №0628 (+ 20 других файлов) |
| profession | №0674 (+ 4 других файлов) |
| professionBonus | №1357 |
| professionIds | №0674 |
| professionProfile | №0085 |
| professionRequirements | №0674 |
| PROFESSIONS | №0674 |
| proficiencies | №0650 (+ 11 других файлов) |
| proficiency | №0750 (+ 4 других файлов) |
| proficiencyBonus | №0662 (+ 13 других файлов) |
| proficiencyIfUntrained | №0822 |
| proficiencyRank | №1339 |
| proficiencyType | №0088 |
| proficient | №0651 (+ 6 других файлов) |
| profile | №0065 (+ 15 других файлов) |
| profileResources | №0815 |
| prog | №0077 |
| progression | №0653 (+ 16 других файлов) |
| progressionSource | №0705 (+ 3 других файлов) |
| project | №1453 (+ 1 других файлов) |
| projectedWeaponBonus | №0783 |
| projectile | №0659 (+ 3 других файлов) |
| projection | №0783 (+ 3 других файлов) |
| projectItem | №0783 |
| projectMobility | №0645 |
| projectPoint | №0077 |
| projectScreen | №0077 |
| projectUrl | №0655 (+ 4 других файлов) |
| projectVariant | №0839 |
| prolificAffliction | №0783 |
| prompt | №1345 (+ 8 других файлов) |
| prone | №0783 (+ 1 других файлов) |
| proneOnHit | №0783 |
| proneOnSuccess | №0783 |
| pronounced | №0063 |
| prop | №0082 |
| properties | №0083 (+ 10 других файлов) |
| propertiesHidden | №0085 |
| property | №0084 |
| proportions | №1310 |
| props | №0678 |
| protectAlly | №0690 |
| protected | №0822 |
| protection | №0780 |
| protector | №0690 |
| protege | №0783 |
| protegeAdvantageAfterExploit | №0783 |
| protegeUpgrade | №0783 |
| provokesNoOpportunity | №0780 |
| provokesOpportunityAttacks | №0822 |
| pseudopodSize | №0070 (+ 1 других файлов) |
| psi | №1353 |
| psiLimit | №0718 (+ 1 других файлов) |
| psiLimitFormula | №0718 |
| Psion | №0799 |
| psionicPredator | №0783 |
| psionSource | №0799 |
| psiPoints | №0718 (+ 2 других файлов) |
| psiPointsMax | №0780 (+ 1 других файлов) |
| psiPointsRest | №0718 |
| psychic | №0875 |
| psychicDamage | №0783 |
| psychicDamagePerTurn | №0783 |
| psychokinetics | №0783 |
| pubic | №0063 (+ 1 других файлов) |
| publishableKey | №0655 (+ 4 других файлов) |
| pulpit | №0071 |
| pupilOpacity | №0070 (+ 2 других файлов) |
| pupilShape | №0067 (+ 2 других файлов) |
| purity | №0084 |
| purple | №0836 (+ 1 других файлов) |
| pursuit | №0833 |
| pushFt | №0082 (+ 2 других файлов) |
| pushProneSaveBonus | №0783 |
| pushRadiusFt | №0783 |
| q | №1315 |
| qty | №0803 (+ 2 других файлов) |
| quality | №0063 (+ 12 других файлов) |
| QUALITY | №0671 |
| QUALITY_GRADES | №0668 |
| QUALITY_TIERS | №0669 |
| qualityBand | №0668 |
| qualityBonus | №0085 (+ 5 других файлов) |
| qualityEffects | №0669 |
| qualityKey | №0668 (+ 1 других файлов) |
| qualityLabel | №0668 |
| qualityMultiplier | №0803 (+ 1 других файлов) |
| qualityOf | №0669 |
| qualityReport | №0668 |
| quantity | №0672 (+ 1 других файлов) |
| quartz | №0677 |
| quartzForm | №0783 |
| query | №0797 |
| querySelector | №1377 |
| querySelectorAll | №1298 (+ 4 других файлов) |
| queued | №0822 |
| queueLastStandAttacks | №0822 |
| quick | №1435 |
| quickBrewing | №0082 (+ 1 других файлов) |
| quickened | №0652 |
| quickPin | №0783 |
| quiet | №0082 |
| quietBomb | №0783 |
| quiveringPalm | №0815 |
| quota_scope | №1447 |
| quote | №0803 |
| r | №0872 (+ 2 других файлов) |
| rabbit | №0065 |
| rabbitEarSize | №0070 (+ 1 других файлов) |
| rabbitTailSize | №0070 (+ 1 других файлов) |
| rabbleRouser | №0783 |
| race | №0790 (+ 7 других файлов) |
| raceId | №0064 (+ 18 других файлов) |
| raceName | №0628 (+ 1 других файлов) |
| raceWarp | №0065 |
| rack | №0071 |
| radial | №0066 |
| radiant | №0875 |
| Radiant | №0084 |
| radiantAttackOrder | №0783 |
| radiantRetaliation | №0813 |
| radiantVsUndead | №0082 |
| radius | №0066 (+ 4 других файлов) |
| radiusBySlot | №0783 |
| radiusFt | №0681 (+ 3 других файлов) |
| radiusIncreaseFt | №0783 |
| radiusMiles | №0082 |
| rage | №0652 (+ 1 других файлов) |
| rageDamageBonus | №0685 |
| ragesCount | №0685 |
| raging | №1410 (+ 1 других файлов) |
| ragingInferno | №0783 |
| ragPulp | №0677 |
| rail | №0074 |
| raisedFt | №0822 |
| raiseThrallOnSeedKill | №0813 |
| rallyCrew | №0783 |
| rallyingCry | №0743 |
| rallyUnlimited | №0780 (+ 1 других файлов) |
| ram | №0070 |
| rampage | №0660 (+ 1 других файлов) |
| rampageDie | №0783 |
| rampagePending | №0690 |
| randomUUID | №1324 (+ 3 других файлов) |
| range | №0082 (+ 17 других файлов) |
| rangedAttack | №0822 (+ 2 других файлов) |
| rangedAttackBonus | №0783 |
| rangeFt | №0081 (+ 31 других файлов) |
| rangeFtByLevel | №0832 |
| rangeMultiplier | №0783 |
| ranger | №0802 (+ 1 других файлов) |
| rangerFightingStyle | №0652 |
| rank | №0825 |
| rankForRecipe | №0674 |
| rapidity | №0645 |
| Rapidity | №0783 |
| raptor | №0065 |
| rare | №0797 (+ 6 других файлов) |
| rareBonus | №0812 |
| rareChance | №0778 |
| rarity | №0797 (+ 27 других файлов) |
| rate | №0669 |
| ratio | №0668 (+ 4 других файлов) |
| rats | №0065 |
| ravenousWeapon | №0783 |
| raw | №0657 (+ 3 других файлов) |
| rawCopper | №0677 |
| rawIron | №0677 |
| rawUnit | №0830 |
| rawXp | №0809 |
| ray | №0824 |
| reach | №0824 |
| reachBonusFt | №0783 |
| reachFt | №0780 (+ 1 других файлов) |
| reaction | №0082 (+ 41 других файлов) |
| reactionAction | №0783 |
| reactionAttack | №0690 (+ 2 других файлов) |
| reactionAttackOrSingleTargetSpell | №0783 |
| reactionCastHexOnDamager | №0783 |
| reactionChoice | №1341 (+ 2 других файлов) |
| reactionCounter | №0780 |
| reactionDamage | №0783 |
| reactionDamageReduction | №0813 |
| reactionDefensiveOrder | №0783 |
| reactionHalveDamage | №0783 |
| reactionId | №0815 (+ 4 других файлов) |
| reactionMode | №0783 |
| reactionMove | №0783 |
| reactionMoveFt | №0783 |
| reactionNegateSpellUpTo5 | №0783 |
| reactionOpportunityAgainstAttacker | №0783 |
| reactionOptions | №0652 (+ 3 других файлов) |
| reactionPending | №0815 |
| reactionRedirectAttack | №0813 |
| reactions | №0652 (+ 2 других файлов) |
| reactionsMax | №0652 |
| reactionSpell | №0817 |
| reactionsRefresh | №0833 |
| reactionSuppressOnInitiative | №0783 |
| reactionUsesByLevel | №0833 |
| reactionWeather | №0690 |
| reactionWindow | №0659 |
| readAllWriting | №0783 |
| readError | №0067 |
| readOnly | №0851 |
| readWriteForkedLanguages | №0783 |
| ready | №0067 (+ 2 других файлов) |
| readyState | №1297 (+ 27 других файлов) |
| reagent | №0830 |
| reagentRoll | №1265 |
| reagents | №0082 (+ 4 других файлов) |
| reagentsRegained | №0082 |
| reagentsSpent | №0082 |
| reagentSynthesis | №0681 |
| reanimateCorpse | №0873 |
| reanimated | №0873 |
| reanimator | №0813 |
| reaper | №0813 |
| rearDigits | №0065 |
| reason | №0081 (+ 30 других файлов) |
| reassembleCorpus | №0783 |
| rebirthInHell | №0783 |
| rebuild | №0802 |
| rebuildMaterialUsage | №1297 (+ 1 других файлов) |
| recalculate | №0853 |
| receipt | №0822 |
| received | №0806 |
| recharge | №0082 (+ 12 других файлов) |
| rechargeActions | №0809 |
| recharged | №0809 |
| rechargeOn | №0658 |
| rechargeState | №0815 |
| recipe | №0669 (+ 5 других файлов) |
| recipeCount | №0676 |
| recipeId | №0668 |
| recipeName | №0668 |
| recipeRequirements | №0674 |
| recipes | №0671 (+ 5 других файлов) |
| RECIPES | №0671 |
| recipesList | №0671 |
| reciprocalRelationship | №0783 |
| reckless | №0652 |
| recommendedSourceCommit | №1504 |
| reconstruction | №0645 |
| Reconstruction | №0783 |
| record | №0851 (+ 6 других файлов) |
| recordApplication | №0825 |
| recordCraftResult | №0674 |
| recordDamage | №0822 |
| recordMutation | №0820 (+ 1 других файлов) |
| recover | №0657 |
| recoverable | №0668 |
| recovered | №0668 (+ 2 других файлов) |
| recoveredFromCrafting | №0669 |
| recoverRatio | №0668 |
| recovery | №0720 (+ 1 других файлов) |
| Recovery | №0084 |
| RECOVERY_BY_DURABILITY | №0668 |
| RECOVERY_BY_QUALITY | №0669 |
| recoveryRate | №1297 |
| recruitInformant | №0783 |
| recruitMercenary | №0783 |
| recursive | №0892 (+ 48 других файлов) |
| red | №0836 |
| Red | №0780 (+ 1 других файлов) |
| redirect | №0783 |
| redirectAttack | №0783 |
| redirectAttackToAlly | №0082 |
| redirectDamage | №0780 |
| redirectDamageToConstruct | №0783 |
| redirectMeleeAttackToFamiliar | №0783 |
| redirectMissedAttackToGrappledTarget | №0783 |
| redirectOrCancel | №0783 |
| redirectTargetId | №0822 |
| redirectURL | №0890 |
| redistributed | №0822 |
| redo | №0067 |
| reduced | №0645 (+ 2 других файлов) |
| reducedBy | №0783 |
| reduceMaxHpByDamage | №0783 |
| reduceNextVisibleAttackBy | №0783 |
| reduction | №0832 (+ 1 других файлов) |
| reEnabled | №1298 |
| ref | №0822 |
| refinedCopper | №0677 |
| reflectPsychicDamage | №0783 |
| refresh | №0823 (+ 2 других файлов) |
| refresh_token | №0657 (+ 1 других файлов) |
| refreshByItsAlive | №0783 |
| refreshMaterial | №0066 |
| refreshOrgans | №0873 |
| refreshStatus | №0668 |
| refundCharnelOnThrallLoss | №0813 |
| refunded | №0815 |
| refundedSpellSlot | №0815 |
| regainOnShortRest | №0780 |
| regainReagentsOnInitiativeUpTo | №0082 |
| regeneration | №0813 |
| Regeneration | №0084 |
| regenerationBlockedBy | №0813 |
| regenPbWhenBloodied | №0645 |
| region | №0066 (+ 3 других файлов) |
| REGION_MOD | №0803 |
| regionalHairSupported | №0063 |
| regionMask | №0063 |
| regionMultiplier | №0803 |
| regions | №0063 (+ 6 других файлов) |
| register | №0632 (+ 12 других файлов) |
| registerActionHandler | №1349 (+ 5 других файлов) |
| registerClass | №0665 (+ 3 других файлов) |
| registerEquipment | №0070 |
| registerPreset | №0070 |
| registerRace | №0070 |
| registerSkin | №0070 |
| registerSummon | №0834 |
| registry | №0665 |
| reinforcedWoodV49 | №0671 |
| reinvokedRune | №0783 |
| reject | №0792 (+ 2 других файлов) |
| rejuvenatingOrder | №0783 |
| relation | №0822 (+ 1 других файлов) |
| relationship | №0805 |
| relationshipChanged | №1361 |
| relaunch | №1301 |
| relaxationLevels | №0783 |
| rele | №0652 |
| release_ready | №1262 |
| release_reason | №1262 |
| release_source_sha | №1262 |
| releaseDeadSpaceOnInitiative | №0813 |
| releaseToLarva | №0820 |
| relentless | №0633 |
| relentlessRage | №0652 |
| reliableTalent | №0652 |
| relic | №0803 (+ 2 других файлов) |
| religion | №0776 (+ 1 других файлов) |
| remaining | №0652 (+ 11 других файлов) |
| remainingAmount | №0645 (+ 3 других файлов) |
| remainingCharges | №0082 |
| remainingHp | №0783 |
| remainingMinutes | №0082 (+ 2 других файлов) |
| remainingOwnerTurns | №0082 |
| remainingTurns | №0082 (+ 1 других файлов) |
| remnant | №0843 |
| remnants | №0067 (+ 4 других файлов) |
| remote | №0657 |
| remoteRoster | №0814 |
| remove | №0662 (+ 7 других файлов) |
| removeAction | №0082 |
| removeAdvantage | №0875 |
| removeAlchemistSlime | №0659 |
| removeClass | №0853 |
| removeCondition | №0780 (+ 1 других файлов) |
| removeConditions | №0645 |
| removed | №0062 (+ 2 других файлов) |
| removeEventListener | №0891 |
| removeFeat | №0853 |
| removeFloor | №0075 |
| removeImmunity | №0645 |
| removeInventory | №0853 |
| removeItem | №1308 (+ 3 других файлов) |
| removeObject | №0075 |
| removePoisonDisease | №0783 |
| removeRampage | №0690 |
| removeResistance | №0645 |
| removeResistanceTo | №0783 |
| removeSpell | №0853 |
| removeZone | №0075 |
| render | №0085 (+ 10 других файлов) |
| renderAppearance | №0065 |
| renderCharacterCreation | №0674 |
| renderControls | №0645 |
| renderFamily | №0070 |
| renderInventory | №1357 (+ 1 других файлов) |
| renderStatus | №0670 |
| rendingStrike | №0783 |
| repairCost | №1299 |
| repairCount | №0668 |
| repaired | №0668 (+ 3 других файлов) |
| repairGold | №1297 |
| repairItem | №0668 (+ 3 других файлов) |
| repairProfile | №0669 |
| repeat | №0086 |
| repeatCondition | №0822 |
| repeatDamageOnFailedSave | №0645 |
| repeatMissedAttack | №0783 |
| repeatRestriction | №0783 |
| repeatRollingBoulderOnSuccessfulProne | №0783 |
| repeatSave | №0082 (+ 3 других файлов) |
| repeatSaveAtTurnEnd | №0783 |
| repeatSaveEndTurn | №0783 |
| repeatSaveOnDamage | №0783 |
| replaceAfterShortRest | №0783 |
| replaceAnyAfterLongRest | №0783 |
| replaceAnyNon18Metamorphoses | №0783 |
| replaceAttackWithSpirit | №0817 |
| replaceAttackWithTouchCantrip | №0783 |
| replaceConsumed | №0783 |
| replaceDropToZeroWithHP | №0082 |
| replaceExploitOnRest | №0783 |
| replaceLowSpellSlotWithInspiringWord | №0783 |
| replaceMetamorphosis | №0783 |
| replaceMutagen | №0783 (+ 1 других файлов) |
| replaceOnRest | №0081 |
| replacePhysicalSaveWith | №0783 |
| replacesRace | №0647 (+ 10 других файлов) |
| replaceStandardOrExoticAfterLongRest | №0783 |
| replaceWolfWithDireWolf | №0783 |
| report | №0668 (+ 1 других файлов) |
| reposition | №0783 |
| reprisal | №0807 |
| reptile | №0778 |
| reptileIndices | №0065 |
| reptileProfile | №0065 (+ 5 других файлов) |
| reptileSkin | №0065 |
| req | №0645 (+ 1 других файлов) |
| requestedExternal | №0063 |
| requestId | №0815 (+ 7 других файлов) |
| require | №1505 |
| required | №0718 (+ 3 других файлов) |
| requiredAssets | №0075 |
| requiredGold | №0669 |
| requiredLevel | №0674 |
| requiredMaterials | №0669 |
| requiredSpecialization | №0674 |
| requiredTools | №0676 |
| requirements | №0636 (+ 2 других файлов) |
| requires | №0678 (+ 4 других файлов) |
| requiresAdvantage | №0783 |
| requiresArmor | №0783 |
| requiresDisengage | №0783 |
| requiresEqualOrHigherExtraSlot | №0783 |
| requiresGrappled | №0783 |
| requiresNearestAttack | №0645 |
| requiresSight | №0822 (+ 3 других файлов) |
| requiresSoleHexTarget | №0783 |
| requiresTarget | №0783 |
| reroll | №0652 |
| rerollAttack | №0082 |
| rerollDamage12 | №0783 |
| rerollFlickerCost | №0783 |
| rerollGrappleEscape | №0783 |
| rerollHemocraftOncePerTurn | №0783 |
| rerollOne | №0652 (+ 3 других файлов) |
| rerollOneDamageDie | №0783 |
| rerollSave | №0780 (+ 1 других файлов) |
| rerollType | №0783 |
| reservationRetained | №0659 |
| reserved | №0807 (+ 3 других файлов) |
| reservedDie | №0817 |
| reset | №0067 |
| resetDeathSaves | №0659 |
| resetLairRound | №0809 |
| resetNegotiation | №0805 |
| resetRestResources | №0873 |
| resetTurn | №0652 |
| resetTurnResources | №0787 |
| resetView | №0867 |
| resignalSeq | №0814 |
| resilientOrder | №0783 |
| resilientOrderAdvanced | №0783 |
| resin | №0671 (+ 3 других файлов) |
| resist | №0822 |
| resistance | №0082 (+ 10 других файлов) |
| resistanceAll | №0082 (+ 2 других файлов) |
| resistanceAllDamage | №0783 |
| resistanceAllExceptPsychic | №0783 |
| resistanceChosen | №0783 |
| resistances | №0659 (+ 14 других файлов) |
| resistanceType | №0082 (+ 2 других файлов) |
| resistanceWhileBloodied | №0783 |
| resistant | №0822 (+ 1 других файлов) |
| resistantSuppression | №0783 |
| resisted | №0854 |
| resize | №0075 |
| resolution | №0863 (+ 1 других файлов) |
| resolve | №0657 (+ 4 других файлов) |
| resolveAction | №0809 |
| resolveAttack | №0659 (+ 1 других файлов) |
| resolveCharacterRace | №0070 |
| resolveEquipment | №0070 |
| resolveFall | №0075 |
| resolveFeature | №0665 |
| resolveHealingEvent | №0822 |
| resolveMorphWeights | №0072 |
| resolveRace | №0070 |
| resolveReaction | №0652 |
| resolveRollMode | №0831 |
| resolveSkin | №0070 |
| resource | №0787 (+ 1 других файлов) |
| resourceBridge | №0690 |
| resourceInput | №0676 |
| resourceName | №0829 |
| resourceProcessing | №0830 |
| resourceRevision | №0815 |
| resources | №0082 (+ 39 других файлов) |
| RESOURCES | №0677 |
| resourceUnit | №0830 |
| resourceYieldMultiplier | №0676 |
| respawn | №0882 |
| rest | №0645 (+ 11 других файлов) |
| restAndRecover | №0783 |
| restHealing | №0788 (+ 1 других файлов) |
| restNormals | №0065 |
| restock | №0803 (+ 1 других файлов) |
| restore | №0652 (+ 4 других файлов) |
| restoreBloodMaledictOnRiteCrit | №0645 |
| restoreBody | №0820 |
| restored | №0082 (+ 3 других файлов) |
| restoredAt | №0869 |
| restoreExhaustion | №0780 (+ 1 других файлов) |
| restoreExploitPerAlly | №0783 |
| restoreGolem | №1265 |
| restoreHitDice | №0780 (+ 1 других файлов) |
| restoreHp | №0690 |
| restoreHP | №0783 |
| restoreInterruptOnInitiative | №0783 |
| restoreLocalCopy | №0657 |
| restoreMoxie | №0783 |
| restoreMoxieOnSuccessfulCrossCounter | №0783 |
| restoreOneSealLongRest | №0783 |
| restoreOnInitiative | №0783 |
| restorePactSlot | №0645 |
| restoreReagents | №0783 |
| restoreResource | №0780 |
| restoreResources | №0831 |
| restoreSnapshot | №0865 (+ 1 других файлов) |
| restoreSpellLevels | №0813 |
| restoreThrall | №0783 |
| restoreWithReagents | №1265 |
| restPositions | №0065 |
| restrainAt0Hp | №0783 |
| restrained | №0783 (+ 1 других файлов) |
| restrainedUntilEndOfNextTurn | №0783 |
| restrictionUntilOwnEnd | №0822 |
| result | №0652 (+ 40 других файлов) |
| resultCp | №0794 |
| resultEp | №0794 |
| resultGp | №0794 |
| resultPp | №0794 |
| results | №0652 (+ 4 других файлов) |
| resultSp | №0794 |
| resumed | №0822 |
| retain | №0837 |
| retainMentalStats | №0783 |
| retains | №0848 |
| retaliationHealing | №0783 |
| retaliatoryDamage | №0783 |
| retaliatoryNecrotic | №0783 |
| retargetMageMark | №0822 |
| retreat | №0824 |
| retreatFrom | №0822 |
| retries | №0825 |
| retry_after | №1262 (+ 1 других файлов) |
| retryIn | №0882 (+ 1 других файлов) |
| returnAfterHour | №0813 |
| returnAttackBonus | №0815 (+ 1 других файлов) |
| returnDamage | №0783 (+ 3 других файлов) |
| returnDamageType | №0815 |
| returnedAttack | №0652 |
| returnTarget | №0659 (+ 3 других файлов) |
| returnToShell | №0788 |
| reveal | №0083 (+ 3 других файлов) |
| revealed | №0078 (+ 2 других файлов) |
| revealedArcana | №0645 |
| revealedSight | №0822 |
| revealsInvisible | №0082 |
| reverseMappedGlbVertices | №1314 |
| revert | №0783 (+ 1 других файлов) |
| revision | №0657 (+ 3 других файлов) |
| revitalizingOrderExploit | №0783 |
| reviveAtDawn | №0783 |
| reviveAtZero | №0780 |
| revived | №0082 |
| revivedFromZero | №0659 |
| reviveHp | №0783 |
| reviveNearHeartAfterHours | №0783 |
| reviveRecentDead | №0813 |
| reviveRite | №0645 |
| reviveTo1 | №0783 |
| revokeObjectURL | №1406 |
| revolution | №0807 |
| rewards | №0674 (+ 2 других файлов) |
| rider | №0873 |
| RIDGE_STYLES | №0070 |
| ridgeColor | №0070 (+ 1 других файлов) |
| ridgeStyle | №0067 |
| right | №1312 |
| ringingStrike | №0783 |
| riposte | №0783 |
| riseFt | №0822 |
| risk | №0084 |
| rite | №0783 (+ 2 других файлов) |
| riteFocus | №0645 |
| riteOfTheDawn | №0645 |
| riteRevival | №0645 |
| rites | №0711 (+ 8 других файлов) |
| riteSwapAtLevel | №0783 |
| riteType | №0645 (+ 7 других файлов) |
| ritual | №0765 (+ 3 других файлов) |
| ritualCasting | №0711 (+ 1 других файлов) |
| ritualComponentReplaced | №0817 |
| ritualDuringShortRest | №0783 |
| ritualizeKnownSpellsUpTo | №0817 |
| ritualMastery | №0783 |
| ritualMaterialSubstitution | №0783 |
| ritualMinutes | №0783 (+ 1 других файлов) |
| ritualSpellLevelMax | №0817 |
| ritualTurnsBySpellLevel | №0817 |
| rmsDisplacementMeters | №1309 |
| roar | №0645 (+ 1 других файлов) |
| roguishCharm | №0783 |
| role | №0063 (+ 32 других файлов) |
| roles | №0632 (+ 18 других файлов) |
| roll | №0078 (+ 25 других файлов) |
| rollback | №0860 (+ 1 других файлов) |
| rollD20 | №0831 (+ 20 других файлов) |
| rollDice | №0659 (+ 4 других файлов) |
| rolled | №0842 |
| rolledDistanceFt | №0822 |
| rollingAvalanche | №0783 |
| rollingBoulder | №0783 |
| rollPockets | №0811 (+ 1 других файлов) |
| rollResolved | №0839 |
| rollResult | №0876 |
| rolls | №0632 (+ 24 других файлов) |
| rollTwiceChoose | №0783 |
| roomId | №0814 (+ 5 других файлов) |
| rope | №0674 (+ 1 других файлов) |
| roster | №1296 (+ 2 других файлов) |
| rotation | №0080 |
| rotFist | №0783 |
| roughness | №0065 (+ 3 других файлов) |
| round | №0067 (+ 51 других файлов) |
| roundEarSize | №0070 (+ 1 других файлов) |
| roundOwnerId | №0822 |
| roundsRemaining | №0783 (+ 1 других файлов) |
| roundStart | №0822 |
| route | №0824 |
| rows | №0082 (+ 21 других файлов) |
| RTCPeerConnection | №1434 |
| ru | №0749 (+ 1 других файлов) |
| rug | №0071 |
| ruined | №0668 (+ 1 других файлов) |
| ruins | №0803 |
| ruins_courtyard | №0882 |
| ruins_vault | №0882 |
| ruins_workshop | №0882 |
| rules | №0825 (+ 2 других файлов) |
| run | №0860 (+ 1 других файлов) |
| rune | №0783 (+ 2 других файлов) |
| runeDoesNotCountAgainstAttunement | №0783 |
| runeInert | №0783 |
| runesKnown | №0652 (+ 1 других файлов) |
| runesPerObject | №0783 |
| runesPersistAfterDeath | №0783 |
| runicCharges | №0832 |
| runicLore | №0832 |
| runSceneTest | №0846 |
| runScripts | №1319 |
| runtime | №0711 (+ 4 других файлов) |
| runtimeCraft | №0783 |
| runtimeId | №0817 |
| runtimeKey | №0774 |
| runtimeStatus | №0711 (+ 1 других файлов) |
| runtimeVersion | №0681 |
| ruthlessCommand | №0783 |
| ruthlessFocus | №0783 |
| rx | №0065 (+ 4 других файлов) |
| ry | №0065 |
| rz | №0065 (+ 1 других файлов) |
| s | №0074 (+ 3 других файлов) |
| sacredWeapon | №0652 |
| sacrifice | №0807 (+ 1 других файлов) |
| sacrificeFoe | №0807 |
| saddler | №0674 |
| safeAlliesMax | №0783 |
| sagacity | №0645 |
| Sagacity | №0783 |
| salt | №0675 (+ 3 других файлов) |
| saltOfEarth | №0783 |
| salvage | №0829 (+ 1 других файлов) |
| sample | №1368 (+ 3 других файлов) |
| sampledBestMaxDistance | №1318 |
| sampledBestMeanDistance | №1318 |
| sampledGoodPct | №1318 |
| sampleSampler | №0072 |
| sand | №0676 |
| sandbox | №0890 |
| sandVortex | №0813 |
| sanguine | №0783 |
| sanguineEmboldenAllies | №0783 |
| sanguineMastery | №0645 |
| sanguineVitalize | №0783 |
| satyr | №1487 |
| savage_attacker | №0786 |
| savageDice | №0783 |
| save | №0064 (+ 26 других файлов) |
| save1 | №0813 |
| save1or2 | №0813 |
| saveAbility | №0681 |
| saveBonus | №0645 (+ 1 других файлов) |
| saveBonuses | №1264 (+ 6 других файлов) |
| saveBottom | №1466 |
| saveCustom | №0861 |
| saved | №0788 (+ 2 других файлов) |
| savedAt | №0864 (+ 2 других файлов) |
| saveDc | №0815 |
| saveDC | №0082 (+ 6 других файлов) |
| savedChannel | №1446 |
| savedDrawCalls | №0067 |
| saveDisadvantage | №0783 (+ 1 других файлов) |
| saveDisadvantageForPugilistFeatures | №0783 |
| savedUrl | №1446 |
| saveEpoch | №0869 |
| saveId | №0869 |
| saveModifiers | №0645 (+ 8 других файлов) |
| saveOnHit | №0082 |
| savePenalty | №0082 |
| saveResult | №0082 (+ 7 других файлов) |
| saveRevision | №0869 |
| saveRoll | №0815 |
| saves | №0783 (+ 1 других файлов) |
| savesData | №0628 (+ 1 других файлов) |
| saveSheet | №0662 |
| saveSucceeds | №0783 |
| saveSuccess | №0082 |
| saveType | №0659 (+ 7 других файлов) |
| savingThrow | №0659 (+ 20 других файлов) |
| savingThrowBonusDice | №0783 |
| savingThrowProficiencies | №1345 |
| savingThrows | №0081 (+ 32 других файлов) |
| SCALAR | №0072 (+ 4 других файлов) |
| scale | №0065 (+ 20 других файлов) |
| scalePlateV49 | №0671 |
| scalesPerLevel | №0783 |
| scaleWithOwner | №0662 (+ 1 других файлов) |
| scan | №0834 |
| scarf | №0066 |
| scenarios | №0860 (+ 1 других файлов) |
| scene | №1270 (+ 2 других файлов) |
| sceneFrom | №0822 |
| sceneOwnerId | №0822 (+ 1 других файлов) |
| scenes | №1270 (+ 2 других файлов) |
| schema | №1453 (+ 2 других файлов) |
| schema_version | №1296 |
| SCHEMA_VERSION | №0646 (+ 2 других файлов) |
| schemaVersion | №0070 (+ 7 других файлов) |
| scheme | №0890 |
| scholarlyPursuits | №0833 |
| school | №0764 (+ 10 других файлов) |
| schoolOfHardKnocks | №0783 |
| scope | №0783 (+ 1 других файлов) |
| scopeId | №0657 |
| scopes | №0657 |
| score | №0668 (+ 1 других файлов) |
| scourgeAttunement | №0783 |
| scourgePresence | №0783 |
| scourgeSense | №0783 |
| scourgeSpeech | №0783 |
| scourgeVisage | №0783 |
| scribe | №0672 (+ 4 других файлов) |
| scrolls | №0674 (+ 2 других файлов) |
| seafarer | №0783 |
| seal | №0783 |
| sealDamage | №0702 (+ 1 других файлов) |
| sealDamageIgnoresResistance | №0783 |
| sealDiceDoubled | №0783 |
| sealedSpiritFeatureLevels | №0848 |
| seals | №0702 |
| sealSystem | №0702 |
| sealWax | №0676 |
| seamMaxMeters | №1309 |
| seaMobility | №0780 |
| search | №0664 |
| searchAsBonus | №0780 |
| second | №0831 |
| second_chance | №0786 |
| secondaryAbility | №0690 |
| secondaryStat | №0681 (+ 3 других файлов) |
| secondaryStatChoice | №0702 (+ 2 других файлов) |
| secondaryStats | №0730 (+ 5 других файлов) |
| seconds | №0822 (+ 4 других файлов) |
| secondTarget | №0783 |
| secondWind | №0652 |
| secret | №0078 |
| secure | №0890 |
| seeIllusions | №0822 |
| seeing | №0783 |
| seeInvisible | №0822 (+ 1 других файлов) |
| seek | №0851 |
| seeking | №0082 |
| seekingBomb | №0783 |
| select | №0861 |
| selected | №0081 (+ 4 других файлов) |
| selectedFile | №0857 |
| selectedRites | №0817 |
| selectedTexture | №0075 |
| selectedTokenId | №0630 |
| selectedTool | №0075 |
| selectedWallTexture | №0075 |
| selection | №0081 |
| self | №2331 |
| selfAdvantage | №0831 |
| selfDamage | №0652 (+ 4 других файлов) |
| selfDamageType | №0783 |
| selfDisadvantage | №0831 |
| selfFireDamageUpToLevel | №0783 |
| selfHeal | №0783 |
| selfNecrotic | №0783 |
| selfRadiantDamage | №0783 |
| selfSuture | №0813 |
| selfUsesHitDie | №0783 |
| sell | №0803 (+ 2 других файлов) |
| sellable | №0806 |
| sellFactor | №0803 (+ 1 других файлов) |
| sendActionResult | №1349 (+ 5 других файлов) |
| sendMessage | №1403 |
| sendReactionRequest | №1349 (+ 2 других файлов) |
| senseBloodCreatures | №0783 |
| senses | №0662 (+ 4 других файлов) |
| sentinel | №0786 |
| sentinelSoul | №0739 (+ 1 других файлов) |
| sentinelSoulChoices | №0739 |
| sentinelStand | №0739 (+ 1 других файлов) |
| sentinelStandChoices | №0739 |
| sentinelStrike | №0739 (+ 1 других файлов) |
| sentinelStrikeChoices | №0739 |
| seq | №1411 (+ 6 других файлов) |
| serial | №0645 |
| serialize | №0070 |
| session | №0866 (+ 2 других файлов) |
| sessionId | №0866 (+ 1 других файлов) |
| sessions | №1377 (+ 1 других файлов) |
| setArmor | №0067 |
| setAttribute | №1357 (+ 1 других файлов) |
| setAxis | №0067 |
| setBackground | №0853 |
| setBodyHair | №0067 |
| setCeiling | №0822 |
| setClassLevel | №0853 |
| setClothing | №0067 |
| setClothingCustomization | №0067 |
| setElevation | №0822 |
| setEnabled | №0665 (+ 1 других файлов) |
| setExternalAnatomy | №0067 |
| setGender | №0067 (+ 1 других файлов) |
| setHead | №0067 |
| setHosieryDen | №0067 |
| setHp | №0783 |
| setHP | №0783 |
| setIcon | №0891 |
| setItem | №1266 (+ 19 других файлов) |
| setMainMenuAvailability | №0846 |
| setMessageHandler | №1403 |
| setOriginRace | №0070 |
| setPose | №0067 |
| setProfession | №0853 |
| setProgress | №0847 |
| setProgressHandler | №0846 |
| setRace | №0067 (+ 2 других файлов) |
| setRegion | №0803 |
| setResource | №0831 |
| setSkin | №0067 |
| setStance | №0783 |
| setStatus | №0847 |
| setStrength | №0082 |
| setSwarmMoving | №0067 |
| setSymbiosis | №0820 |
| setTile | №0075 |
| setTimeout | №0667 (+ 15 других файлов) |
| settlementIntel | №0783 |
| settlementOnly | №0783 |
| setTotalLevel | №0853 |
| setView | №1406 |
| setWeapon | №0067 |
| sewer | №0067 |
| sha | №1453 |
| sha256 | №0846 (+ 8 других файлов) |
| shadow_dancer | №0786 |
| shadow_touched | №0786 |
| shadowColor | №0070 (+ 1 других файлов) |
| shadowEssence | №0830 |
| shadowForm | №0813 |
| shadowmaster | №0783 |
| shadowMasterOfDisguise | №0783 |
| shadowNoEscape | №0783 |
| shadowOpacity | №1467 |
| shadowStep | №0652 |
| shag | №0065 (+ 1 других файлов) |
| shakeItOff | №0720 (+ 1 других файлов) |
| Shaman | №0711 |
| shape | №0065 (+ 8 других файлов) |
| shapechange | №0783 |
| shapeChangeSave | №0783 |
| shapeFemale | №1280 |
| shapeHead | №0065 |
| shapeMale | №1280 (+ 1 других файлов) |
| shaper | №0718 (+ 1 других файлов) |
| Shaper | №0799 |
| shapes | №0063 (+ 1 других файлов) |
| sharedAdvantage | №0783 |
| shareDamage | №0822 |
| shareDanceBonus | №0813 |
| sharedBonusAction | №0783 (+ 1 других файлов) |
| sharedHp | №0783 |
| sharedImmortality | №0783 |
| sharedInitiative | №0843 |
| sharedProperties | №0083 (+ 1 других файлов) |
| sharedReaction | №0780 (+ 2 других файлов) |
| sharedStealth | №0690 |
| shareSaves | №0817 |
| shareSensesHours | №0783 |
| sharpMind | №0833 |
| sharpshooter | №0786 |
| shaved | №0063 (+ 1 других файлов) |
| shelf | №0071 |
| shell | №0788 |
| shellColor | №0070 (+ 1 других файлов) |
| shellDestroyed | №0788 |
| shellHealing | №0788 |
| shellHP | №0788 |
| shellMaxHP | №0788 |
| shellName | №0788 |
| shells | №1475 |
| shellSize | №0070 (+ 1 других файлов) |
| shield_master | №0786 |
| shieldACBonus | №0783 |
| shieldAllowed | №0783 |
| shieldAttackBonus | №0783 |
| shieldDamage | №0783 |
| shielded | №0645 (+ 1 других файлов) |
| Shielded | №0783 |
| shieldFrame | №0671 (+ 1 других файлов) |
| shieldImpact | №0783 |
| shieldmaker | №0674 |
| shieldMartial | №0783 |
| shieldSlam | №0783 (+ 1 других файлов) |
| shieldWarrior | №0783 |
| shift | №0805 |
| shifter | №0676 (+ 1 других файлов) |
| shifterNaturalWeapon | №0837 |
| shinL | №0063 |
| shinR | №0063 |
| shipchandler | №0805 (+ 1 других файлов) |
| shippedSha256 | №1309 |
| shirt | №0066 |
| shirt_long | №1275 (+ 1 других файлов) |
| shockingStrike | №0783 |
| shockingStrikeDamage | №0783 |
| short | №0065 (+ 1 других файлов) |
| shortRest | №0082 (+ 1 других файлов) |
| shortRestHealing | №0843 |
| shortRestHealingAllowed | №0873 |
| shortRestSlots | №0783 |
| shoulders | №0067 (+ 6 других файлов) |
| shouldSuppressRestHP | №0788 (+ 1 других файлов) |
| shove | №0780 |
| shredding | №0783 |
| shreddingFree | №0783 |
| shuffle | №0086 |
| side | №0065 (+ 2 других файлов) |
| side_part | №0065 (+ 1 других файлов) |
| sideEffect | №0783 |
| sideEffects | №0084 |
| sides | №0659 (+ 8 других файлов) |
| siege | №0674 (+ 2 других файлов) |
| siegeInteraction | №0635 |
| sightBlocked | №0078 |
| sigilEligible | №0636 |
| sigilicGrace | №0783 |
| signal | №0657 (+ 2 других файлов) |
| signature | №0797 (+ 1 других файлов) |
| signatureSpells | №0652 |
| signup | №0657 |
| silent | №0822 |
| silentCheck | №0846 |
| silentStalker | №0783 |
| silk | №0066 |
| silkwormSilk | №0677 |
| silver | №0672 (+ 2 других файлов) |
| silvered | №0659 (+ 1 других файлов) |
| site | №0799 |
| sixthMetamorphosis | №0783 |
| size | №0065 (+ 45 других файлов) |
| size_mb | №1307 |
| sizeBytes | №1311 |
| sizeCategory | №0070 (+ 1 других файлов) |
| sizeChange | №0082 |
| sizeFt | №0082 (+ 1 других файлов) |
| sizeIncrease | №0780 (+ 1 других файлов) |
| skeleton | №0070 (+ 2 других файлов) |
| skill | №0632 (+ 13 других файлов) |
| skillAdvantage | №0645 |
| skillBonus | №0780 (+ 3 других файлов) |
| skillChoices | №0788 (+ 3 других файлов) |
| skilled | №0667 (+ 1 других файлов) |
| skilledRider | №0783 |
| skillId | №0776 (+ 3 других файлов) |
| skillModifiers | №0645 |
| skillProficiency | №0783 |
| skillProficient | №0659 (+ 1 других файлов) |
| skills | №0628 (+ 26 других файлов) |
| skillsChoose | №0082 (+ 1 других файлов) |
| skillsData | №0628 (+ 2 других файлов) |
| skiltKrigga | №0783 |
| skin | №0062 (+ 8 других файлов) |
| skin_names | №1307 |
| skinCompatible | №0070 |
| skinDetail | №0070 (+ 6 других файлов) |
| skinFamily | №0070 |
| skinGlow | №0070 (+ 2 других файлов) |
| skinId | №0070 (+ 1 других файлов) |
| skinMaterial | №0070 |
| skinned_primitives | №1307 |
| skinPositions | №0062 |
| skins | №0072 (+ 4 других файлов) |
| skinSurface | №0067 (+ 5 других файлов) |
| skipDefeated | №0787 |
| skirt | №0066 |
| skirtProfile | №0066 |
| slamDamage | №0783 |
| slamMagical | №0783 |
| slash | №0078 (+ 1 других файлов) |
| slashing | №0875 |
| slashTexture | №0080 |
| slaymateRitual | №0813 |
| sleep | №0783 (+ 1 других файлов) |
| Sleep | №0084 |
| sleepImmune | №0822 |
| sleepUntilStartNextTurnOrDamage | №0783 |
| sleepwalker | №0783 |
| sleeves | №0066 (+ 2 других файлов) |
| sleightBonus | №0783 |
| sleightingImprecation | №0783 |
| sleightOfHand | №0776 (+ 1 других файлов) |
| slick_back | №0065 (+ 1 других файлов) |
| slime | №0067 |
| slimeCovered | №0082 |
| slimeFiber | №0830 |
| slimeReagent | №0830 |
| slipperyMind | №0652 |
| slipTurns | №0825 (+ 1 других файлов) |
| slit | №1275 (+ 2 других файлов) |
| slitHeight | №1275 (+ 1 других файлов) |
| slot | №0066 (+ 9 других файлов) |
| slotKind | №0652 |
| slotLevel | №0645 (+ 12 других файлов) |
| slotLevels | №1416 |
| slots | №0066 (+ 8 других файлов) |
| slotsByLevel | №0813 |
| slotSpent | №0817 |
| slotsRefresh | №0848 |
| slotsUsed | №0790 |
| slowFall | №0652 |
| slowFt | №0645 |
| small | №0071 (+ 2 других файлов) |
| smith | №0672 (+ 8 других файлов) |
| smoke | №0082 |
| smokeBomb | №0783 |
| smokeCloud | №0082 |
| snake | №0823 |
| snapshot | №0657 (+ 10 других файлов) |
| snapshots | №0082 |
| sneakApplied | №0659 (+ 1 других файлов) |
| sneakAttack | №0652 |
| sneakAttackDice | №0790 (+ 1 других файлов) |
| sneakEligible | №1416 |
| sneakStyle | №0858 |
| snout | №0065 |
| social | №0632 (+ 12 других файлов) |
| socialAdvantage | №0780 |
| socialBonus | №0813 |
| socket | №0065 |
| socks | №0066 (+ 3 других файлов) |
| solidified | №0783 |
| soloShieldAC | №0783 |
| solvent | №0082 |
| somatic | №0764 (+ 10 других файлов) |
| somaticMaterialFree | №0783 |
| somnolence | №0783 |
| songOfRest | №0652 |
| songsOfWarPeace | №0783 |
| soothingSpeech | №0783 |
| sorcerer | №0802 (+ 1 других файлов) |
| sorcerousOriginMastery | №0652 |
| sorcerousRestoration | №0652 |
| sorceryPoints | №0652 (+ 2 других файлов) |
| sort | №0797 |
| soulEater | №0645 (+ 1 других файлов) |
| soulOfArtifice | №0652 |
| soulSight | №0817 |
| soulToyConversion | №0813 |
| source | №0062 (+ 113 других файлов) |
| SOURCE | №0670 |
| SOURCE_TAG | №0674 |
| sourceCommit | №2338 |
| sourceDead | №0873 |
| sourceDisplacementMax | №1315 |
| sourceDisplacementMean | №1315 |
| sourceFor | №0085 |
| sourceGlb | №1304 |
| sourceGlbSha256 | №1504 |
| sourceHashes | №1504 |
| sourceId | №0081 (+ 30 других файлов) |
| sourceIndices | №0065 |
| sourceKey | №0799 |
| sourceLabel | №0632 (+ 10 других файлов) |
| sourceMaxDisplacement | №1314 |
| sourceMeanDisplacement | №1314 |
| sourceMeshes | №0067 |
| sourceName | №0704 (+ 3 других файлов) |
| sourceNonZeroEntries | №1314 |
| sourcePack | №0632 (+ 11 других файлов) |
| sourcePacks | №0634 (+ 2 других файлов) |
| sourceProject | №1504 |
| sourceQuantity | №0668 |
| sourceRule | №0085 |
| sources | №0085 (+ 16 других файлов) |
| sourceSha256 | №1309 (+ 1 других файлов) |
| sourceStackTerms | №1504 |
| sourceTarget | №1304 |
| sourceType | №0082 (+ 15 других файлов) |
| sourceVersion | №0730 (+ 3 других файлов) |
| sovereignOfFate | №0783 |
| sp | №0794 (+ 5 других файлов) |
| space | №0843 |
| span | №0065 |
| sparse | №1305 |
| spatialManipulation | №0783 |
| speakWithBeastsAndPlants | №0783 |
| special | №0672 |
| specialization | №0674 (+ 2 других файлов) |
| specializationBonus | №0674 |
| specializationList | №0674 |
| specializations | №0674 |
| specialReactionPerOtherCreatureTurn | №0783 |
| specialSightFt | №0822 |
| specialtyTags | №0671 |
| species | №0065 (+ 4 других файлов) |
| spectral | №0065 |
| spectralFiber | №0671 (+ 1 других файлов) |
| spectralIndices | №0065 |
| spectralMounts | №0813 |
| spectralParts | №0065 |
| spectralReagent | №0830 |
| spectralThreadV49 | №0671 |
| speed | №0628 (+ 38 других файлов) |
| Speed | №0084 |
| speedBonus | №0783 |
| speedBonusFt | №0645 (+ 1 других файлов) |
| speedDouble | №0783 |
| speedFt | №0815 |
| speedHalf | №0783 |
| speedMultiplier | №0813 (+ 1 других файлов) |
| speedPenalty | №0645 |
| speedPenaltyFt | №0645 (+ 1 других файлов) |
| speedReductionFt | №0690 |
| speedZeroSave | №0783 |
| spell | №0652 (+ 6 других файлов) |
| spellAbility | №2329 |
| spellAttack | №0783 (+ 3 других файлов) |
| spellAttackBonus | №0783 (+ 2 других файлов) |
| spellAttackUsesWisdom | №0783 |
| spellblade | №0783 (+ 1 других файлов) |
| Spellblade | №0799 |
| spellbladeSource | №0799 |
| spellCaster | №0815 (+ 1 других файлов) |
| spellcasting | №0711 (+ 10 других файлов) |
| spellcastingAbility | №0082 |
| spellcastingFocus | №0783 |
| spellDamageModifiers | №0652 (+ 2 других файлов) |
| spellDamageVulnerability | №0783 |
| spellHealingOrDamage | №0817 |
| spellId | №0659 (+ 9 других файлов) |
| spellLevel | №0652 (+ 10 других файлов) |
| spellLevelCap | №0817 |
| spellLevelMax | №0783 |
| spellLevels | №0817 |
| spellList | №0807 |
| spellLists | №0718 |
| spellMastery | №0652 |
| spellName | №0659 (+ 18 других файлов) |
| spells | №0790 (+ 11 других файлов) |
| spellSaveDC | №0783 (+ 2 других файлов) |
| spellsData | №0628 (+ 4 других файлов) |
| spellsDoNotCountAgainstKnown | №0783 |
| Spellshot | №0799 |
| spellsKnown | №0711 (+ 2 других файлов) |
| spellSlotKind | №0652 |
| spellSlotLevel | №0652 |
| spellSlots | №0652 (+ 2 других файлов) |
| spellSlotsData | №0628 (+ 14 других файлов) |
| spellSlotSubstitute | №0813 |
| spellSlotTable | №0831 (+ 1 других файлов) |
| spellSources | №0831 |
| spellStat | №0628 (+ 1 других файлов) |
| spellStats | №0831 |
| spellStoringItem | №0652 |
| spellstrike | №0783 |
| spellTable | №0645 |
| spellUses | №0807 |
| spellUsesByLevel | №0807 |
| Spellweaver | №0799 |
| spend | №0787 |
| spendAction | №0787 |
| spendCharges | №0783 |
| spendCoin | №0822 |
| spendDynamo | №0082 |
| spendExtendedResource | №0652 |
| spendMovement | №0787 |
| spendMovementReward | №0825 |
| spendReaction | №0822 |
| spendResource | №0831 |
| spendSpellSlot | №0783 |
| spent | №0690 (+ 4 других файлов) |
| spices | №0677 |
| spider | №0690 |
| spiderSilk | №0671 (+ 1 других файлов) |
| spines | №0070 |
| spiral | №0070 |
| spirit | №0848 (+ 1 других файлов) |
| spiritAttacks | №0788 |
| spiritCommunication | №0817 |
| spiritDamage | №0817 |
| spiritDamageBonus | №0817 |
| spiritForm | №0788 |
| spiritHP | №0788 |
| spiritMantle | №0848 |
| spiritMaxHP | №0788 |
| spiritRangeFt | №0817 |
| spiritTypes | №0711 |
| spiritualDefense | №0848 |
| splashDice | №0082 |
| split | №0783 |
| splitAmongTargets | №0783 |
| splitDamage | №0783 |
| sporeling | №0690 |
| spread | №0062 |
| springSteel | №0677 |
| spurredArmy | №0783 |
| square | №0067 (+ 1 других файлов) |
| squaredCircle | №0720 |
| src | №0086 (+ 4 других файлов) |
| stability | №0084 (+ 1 других файлов) |
| Stability | №0084 |
| stable | №0805 (+ 2 других файлов) |
| stack | №0071 (+ 1 других файлов) |
| stacks | №0690 |
| stage | №0788 (+ 3 других файлов) |
| stage10 | №0082 |
| staged | №0846 |
| stair | №0071 |
| stairFrom | №0080 |
| stairHeight | №1347 |
| stairs | №0071 |
| stairTo | №0080 |
| stale | №0869 |
| stalkersProwess | №0645 |
| stalwartDefender | №0783 |
| stalwartSpirit | №0875 |
| stance | №0783 (+ 2 других файлов) |
| stanceRadiusFt | №0783 |
| stand | №0071 |
| standard | №0669 (+ 2 других файлов) |
| standingJump | №0783 |
| standTheFallen | №0783 |
| standUp | №0783 |
| start | №0718 |
| startActorTurn | №0645 |
| startedAt | №0866 |
| startedAtTurn | №0082 |
| startedTurn | №0822 |
| startElevation | №0822 |
| startingEquipment | №0082 (+ 3 других файлов) |
| startLevel | №0837 |
| startlingJinx | №0783 |
| startTurn | №0081 (+ 13 других файлов) |
| startTurnDamage | №0783 |
| startTurnHeal | №0783 |
| startTurnHealing | №0783 |
| startTurnNecrotic | №0783 |
| startX | №0822 (+ 1 других файлов) |
| startY | №0822 (+ 1 других файлов) |
| stat | №0081 (+ 21 других файлов) |
| STAT_ALIASES | №0831 |
| STAT_META | №0873 |
| statblock | №0082 |
| statBlock | №0837 (+ 1 других файлов) |
| statBonus | №0750 (+ 4 других файлов) |
| state | №0659 (+ 19 других файлов) |
| stateRevision | №0814 (+ 6 других файлов) |
| states | №0843 |
| stats | №0628 (+ 50 других файлов) |
| status | №0836 (+ 58 других файлов) |
| STATUS | №0082 |
| stdio | №1263 (+ 2 других файлов) |
| steadfastOrder | №0783 |
| steadfastToughness | №0875 |
| stealth | №0776 (+ 1 других файлов) |
| stealthAdvantage | №0783 |
| stealthBonus | №0783 |
| stealthDisadvantage | №0088 |
| steed | №0661 |
| steel | №0672 (+ 3 других файлов) |
| steelBillet | №0677 |
| steelWire | №0677 |
| steelWireV38 | №1297 |
| stencil | №0077 |
| step | №0079 (+ 1 других файлов) |
| stepWind | №0652 |
| stickAndMove | №0783 |
| stillnessOfMind | №0652 |
| stock | №0803 (+ 2 других файлов) |
| stockCount | №0804 |
| stocky | №0070 |
| stolen | №0822 |
| stolenSpark | №0783 |
| stone | №0071 (+ 4 других файлов) |
| Stoneblood | №0799 |
| stonecutter | №0805 (+ 1 других файлов) |
| stoneDust | №0676 |
| stoneForm | №0783 |
| stoneFormToggle | №0783 |
| stoneReductionAppliesToMagic | №0783 |
| stoneToFlesh | №0783 |
| stool | №0071 |
| stop | №0851 |
| stopIntruder | №0780 |
| stopOnDefeat | №0787 (+ 4 других файлов) |
| stopped | №0822 (+ 1 других файлов) |
| storage | №0817 (+ 2 других файлов) |
| STORAGE_KEY | №0670 |
| stored | №0813 |
| storedHealingMax | №0783 |
| storm | №0645 |
| str | №0628 (+ 61 других файлов) |
| straight | №0070 |
| straightLine | №0783 |
| strands | №1458 |
| strangeMetabolism | №0645 |
| strategicAdjustments | №0783 |
| strategist | №0743 (+ 1 других файлов) |
| strBonus | №0645 |
| strChecksDisadvantage | №0645 (+ 1 других файлов) |
| strDexChecksDisadvantage | №0645 (+ 1 других файлов) |
| strDexSaveAdvantage | №0783 |
| stream | №0890 |
| streetSmart | №0720 |
| streetwise | №0783 |
| strength | №0790 (+ 11 других файлов) |
| Strength | №0084 |
| strengthAdvantage | №0822 |
| strengthFloor | №0822 |
| strengthInNumbers | №0783 |
| strengthMaxBonus | №0783 |
| strengthOrDexterity | №0702 (+ 3 других файлов) |
| strenuous | №0085 (+ 1 других файлов) |
| stressPressure | №0633 |
| strikeDice | №0783 |
| strIncrease | №0783 |
| strMaxBonus | №0645 |
| strMaxIncrease | №0783 |
| strokeOfLuck | №0652 |
| strongbow | №0783 |
| strOrDexSave | №0783 |
| strSave | №0783 |
| strSavesDisadvantage | №0645 (+ 1 других файлов) |
| stubble | №0065 (+ 1 других файлов) |
| student | №0780 |
| stun | №0780 |
| stunIfFailedBy5 | №0645 |
| stunned | №0783 (+ 2 других файлов) |
| stunnedUntilEndOfNextTurn | №0783 |
| stunning | №0783 |
| stunningStrike | №0652 (+ 1 других файлов) |
| stunOnFail | №0783 |
| stunOnFailBy5 | №0783 |
| style | №0783 (+ 32 других файлов) |
| styles | №0817 |
| sub | №1258 |
| subclass | №0790 (+ 21 других файлов) |
| SUBCLASS_FEATURES | №0652 |
| subclassBonds | №0690 |
| subclassDeepMagic | №0702 |
| subclasses | №0081 (+ 25 других файлов) |
| subclassFeature | №0780 |
| subclassFeatureCatalog | №0720 |
| subclassFeatureIdResolution | №0681 |
| subclassFeatureLevels | №0081 (+ 20 других файлов) |
| subclassId | №0665 (+ 2 других файлов) |
| subclassLevel | №0081 (+ 41 других файлов) |
| subclassSystem | №0681 (+ 4 других файлов) |
| subclassUse | №0783 |
| subjugateThrall | №0783 |
| subtle | №0652 (+ 1 других файлов) |
| subtractD8 | №0783 |
| subtractHemocraftDie | №0645 |
| subtree | №0796 (+ 3 других файлов) |
| success | №0082 (+ 24 других файлов) |
| successes | №0659 (+ 14 других файлов) |
| successorClientId | №1434 |
| successTempHp | №0783 |
| suit | №0825 |
| suite | №0858 |
| summary | №0632 (+ 12 других файлов) |
| summon | №0780 (+ 3 других файлов) |
| summonDevilJurist | №0783 |
| summonedId | №0822 |
| summonFamiliar | №0783 |
| summonFiendAt0HP | №0783 |
| summonOoze | №0082 |
| summonSpellId | №0834 |
| sunAura | №0822 |
| sunlightAttackAndPerceptionDisadvantage | №0783 |
| sunlightAttackAndSightDisadvantage | №0645 |
| sunlightHazard | №0813 |
| Sunwatcher | №0799 |
| superior | №0669 |
| superiorInspiration | №0652 |
| superiorInterdict | №0702 |
| superiorInterdictRestore | №0702 |
| superiorityDice | №0652 |
| supernal | №0783 (+ 1 других файлов) |
| supported | №0062 (+ 1 других файлов) |
| supportFetchAPI | №0890 |
| supportRangeFt | №0783 |
| suppressAilments | №0783 |
| suppressResistanceAndImmunity | №0783 |
| surface | №0070 |
| surfaceMaxDistance | №1313 (+ 1 других файлов) |
| surfaceMeanDistance | №1304 (+ 3 других файлов) |
| surfaceMedianDistance | №1304 (+ 3 других файлов) |
| surfaceP95Distance | №1304 (+ 3 других файлов) |
| surpriseAttack | №0783 |
| surveySettlement | №0783 |
| surveyWilderness | №0783 |
| survival | №0776 (+ 2 других файлов) |
| survive | №0739 |
| survivor | №0652 |
| suspended | №0659 (+ 1 других файлов) |
| sutureCost | №0813 |
| sutureOptions | №0813 |
| swamp | №0067 (+ 2 других файлов) |
| swapCard | №0825 |
| swappedTurns | №0825 (+ 2 других файлов) |
| swapWithThrallRangeFt | №0813 |
| swarm | №0065 (+ 2 других файлов) |
| swarm_bats | №1470 |
| swarm_beetles | №1470 |
| swarm_rats | №1470 |
| swarmCore | №0065 |
| swarmFloor | №0065 |
| swarmForm | №0067 (+ 3 других файлов) |
| swarmParts | №0065 |
| swarmPercent | №0067 (+ 3 других файлов) |
| swarmUnit | №0065 |
| swarmVortex | №0065 |
| sweep | №0065 (+ 1 других файлов) |
| sweepAttack | №0783 |
| sweepingStrike | №0783 |
| sweetDreams | №0783 |
| sweetScience | №0720 |
| swept | №0070 |
| swift | №0783 |
| Swiftblade | №0799 |
| swiftJinx | №0783 |
| swimFt | №0645 |
| swimSpeed | №0783 |
| swimSpeedEqualsWalking | №0783 |
| swine | №0778 |
| switchAlly | №0783 |
| swords | №0822 (+ 1 других файлов) |
| symbiosis | №0820 |
| sync | №0082 (+ 19 других файлов) |
| syncClassResources | №0652 |
| syncFromInitiative | №1377 |
| syncState | №0081 |
| syncTarotEntity | №0822 |
| synergy | №0083 (+ 1 других файлов) |
| t | №0062 (+ 1 других файлов) |
| tab | №0853 (+ 3 других файлов) |
| table | №0071 (+ 18 других файлов) |
| tacticalExploit | №0743 |
| tacticalReposition | №0783 |
| tacticalSkill | №0743 |
| tacticalSuperiority | №0743 |
| tactician | №0786 (+ 1 других файлов) |
| Tactician | №0799 |
| tag | №0065 (+ 1 других файлов) |
| tagName | №1413 |
| tags | №0065 (+ 28 других файлов) |
| tail | №0065 |
| tailColor | №0070 (+ 3 других файлов) |
| tailCurve | №0070 (+ 1 других файлов) |
| tailLength | №0070 (+ 5 других файлов) |
| tailoring | №0066 |
| tailThickness | №0070 (+ 3 других файлов) |
| tailTip | №0067 (+ 1 других файлов) |
| tailTuftSize | №0070 (+ 1 других файлов) |
| takeAttack | №0839 |
| talent | №0783 |
| talentProgression | №0718 |
| talents | №0718 (+ 1 других файлов) |
| tannin | №0677 |
| target | №0065 (+ 46 других файлов) |
| targetAc | №0815 (+ 3 других файлов) |
| targetCount | №0783 |
| targetDefeated | №0659 (+ 3 других файлов) |
| targetedAllyAdvantage | №0783 |
| targetEntries | №1314 (+ 1 других файлов) |
| targetExtraRadiant | №0807 |
| targetFile | №1314 (+ 1 других файлов) |
| targetId | №0064 (+ 34 других файлов) |
| targetKey | №0081 |
| targetLevel | №0704 |
| targetMode | №0871 |
| targetName | №0788 (+ 2 других файлов) |
| targetOncePerLongRest | №0813 |
| targetPeerId | №0815 |
| targetRadiantDamage | №0783 |
| targetRequired | №0783 |
| targets | №0082 (+ 12 других файлов) |
| targetSelfOrTouch | №0783 |
| targetsFatigueRadiusFt | №0783 |
| targetsUpTo | №0783 |
| targetTurns | №0645 |
| targetType | №0817 |
| tarotActorRef | №0822 |
| tarotCoin | №0822 |
| tarotDamageTotals | №2331 |
| tarotEffects | №1296 |
| tarotKnowledge | №1296 (+ 1 других файлов) |
| tarotLastStartedTurn | №1296 (+ 1 других файлов) |
| tarotModeApplied | №0659 (+ 1 других файлов) |
| tarotOwnerId | №0822 |
| tarotReaction | №0659 |
| tarotScene | №0659 (+ 14 других файлов) |
| taunt | №0780 (+ 1 других файлов) |
| team | №0082 (+ 8 других файлов) |
| teamAttackBonus | №0822 |
| techniques | №0839 |
| telekinesis | №0780 (+ 1 других файлов) |
| telekinesisLiftBonus | №0783 |
| telekinetic | №0786 |
| telekineticForce | №0783 |
| telekineticPush | №0783 |
| telepathic | №0786 |
| telepathicIntrusion | №0783 |
| telepathicIntrusionSave | №0783 |
| telepathy | №0783 |
| telepathyFt | №0780 |
| teleport | №0082 |
| teleportAllyId | №0823 (+ 2 других файлов) |
| teleportBetweenPaint | №0082 |
| teleportDamage | №0783 |
| teleported | №0822 |
| teleportFt | №0690 (+ 3 других файлов) |
| teleportNearTarget | №0783 |
| teleportRangeFt | №0813 |
| teleportSave | №0783 |
| teleportToImpact | №0082 |
| teleportWithFamiliar | №0817 |
| temp | №0790 (+ 3 других файлов) |
| tempAbsorbed | №0659 |
| temperament | №0805 |
| tempHp | №0082 (+ 19 других файлов) |
| tempHP | №0817 (+ 3 других файлов) |
| tempHpAtStartTurn | №0783 |
| tempHpBonus | №0783 |
| tempHpDice | №0783 |
| tempHpEach | №0783 |
| tempHpFromCharnel | №0813 |
| tempHpFromLightningDamage | №0783 |
| tempHpFromSealDamage | №0783 |
| tempHpOnApplause | №0780 |
| tempHpOnEnemyReducedToZero | №0783 |
| tempHpOnWake | №0783 |
| tempHpPerDie | №0783 |
| template | №0065 |
| templateNormals | №0065 |
| templates | №0661 |
| temple | №0805 (+ 1 других файлов) |
| temporary | №0783 |
| temporaryHp | №0786 |
| temporaryHP | №0082 |
| terrain | №0882 |
| terrorAndDecay | №0783 |
| terrorDie | №0783 |
| terrorizingForce | №0702 |
| test | №1267 |
| testMode | №0846 (+ 1 других файлов) |
| tests | №0858 |
| tethered | №0783 |
| TEXCOORD_0 | №1310 |
| texLoc | №0077 |
| text | №0816 (+ 2 других файлов) |
| textContent | №1413 |
| textile | №0674 |
| texture | №0066 (+ 4 других файлов) |
| Texture | №0074 |
| textures | №0077 (+ 1 других файлов) |
| textureTile | №0066 |
| thaumaturgy | №0783 |
| thaumaturgyEnhanced | №0813 |
| thenResistance | №0645 |
| thievesToolsBonus | №0783 |
| thieving | №0783 |
| thighL | №0063 |
| thighR | №0063 |
| thirdDisciplineLevel | №0718 |
| thirdparty | №0664 |
| thornsDice | №0873 |
| thrallAdvantage | №0813 |
| thrallAura | №0813 |
| thrallDance | №0813 |
| thrallDeathExplosion | №0813 |
| thrallEthereal | №0813 |
| thrallFlight | №0813 |
| thrallInvisible | №0813 |
| thralls | №0813 |
| thrallSlots | №0813 |
| thrallType | №0813 |
| thrallTypes | №0813 |
| thread | №0671 (+ 4 других файлов) |
| thresholds | №0809 (+ 1 других файлов) |
| thrillOfTheHunt | №0783 |
| thrownRange | №0783 |
| thunder | №0652 |
| tiedMaximumsAllActive | №0873 |
| tier | №0669 |
| tights | №0066 |
| tile | №0066 |
| tiles | №0075 (+ 2 других файлов) |
| time | №0065 (+ 13 других файлов) |
| timeFrozen | №0822 |
| timelessBody | №0652 |
| timeMinutes | №1265 |
| timeout | №1306 (+ 40 других файлов) |
| timer | №0851 |
| times | №0072 |
| timestamp | №1258 |
| timeStop | №0822 |
| tinker | №0674 (+ 3 других файлов) |
| tinkerer | №0675 |
| tinOre | №0677 |
| tiny | №0820 (+ 1 других файлов) |
| tinyServant | №1370 |
| tissue | №0062 (+ 1 других файлов) |
| title | №0646 (+ 5 других файлов) |
| to | №0636 (+ 2 других файлов) |
| toad | №0690 |
| toggle | №0664 (+ 1 других файлов) |
| toggleCondition | №0659 (+ 3 других файлов) |
| toHit | №0878 (+ 3 других файлов) |
| token | №0657 (+ 3 других файлов) |
| tokenList | №1412 (+ 2 других файлов) |
| tokens | №0075 (+ 28 других файлов) |
| tombGuardian | №0783 |
| tool | №0630 (+ 20 других файлов) |
| toolAliases | №2332 |
| toolBonus | №0812 |
| toolLabels | №2332 (+ 1 других файлов) |
| toolMastery | №0822 |
| toolName | №1265 |
| toolProficiencies | №0628 (+ 2 других файлов) |
| toolRequired | №0882 |
| tools | №0082 (+ 28 других файлов) |
| toolsAdvantage | №0822 |
| top | №0067 (+ 12 других файлов) |
| top10LargestMapped | №1315 |
| topknot | №0065 (+ 1 других файлов) |
| topY | №0066 |
| torso | №0065 (+ 2 других файлов) |
| torsoRidgeSize | №0070 (+ 4 других файлов) |
| torsoRidgeWidth | №0070 (+ 2 других файлов) |
| tortle | №1487 |
| total | №0632 (+ 53 других файлов) |
| total_length | №1307 |
| totalCp | №0803 |
| totalDomination | №0783 |
| totalGp | №0806 |
| totalLeather | №0667 |
| totalLength | №1316 |
| totalLevel | №0831 |
| totemSpirit | №0652 |
| toTheMat | №0783 |
| touchCurseThreshold | №0813 |
| touchedGlbVertexPct | №1315 |
| touchedGlbVertices | №1315 |
| touchMaxHpCut | №0813 |
| touchParalyzeThreshold | №0813 |
| touchRangeBonusFt | №0813 |
| touchThreshold | №0813 |
| towerShield | №0875 |
| town | №0071 |
| toxins | №0674 |
| toyArmy | №0813 |
| toymaker | №0813 |
| toySoulVault | №0813 |
| track | №0086 |
| trackInscribedRunesAnyPlane | №0783 |
| trader | №2333 |
| traderCount | №0804 |
| traderId | №0805 |
| traders | №0803 (+ 2 других файлов) |
| TRADERS | №0803 |
| tradition | №0817 (+ 1 других файлов) |
| traditionAction | №0817 |
| traditionRites | №0711 |
| traditions | №0711 (+ 1 других файлов) |
| trainHumanoids | №0783 |
| traits | №0662 (+ 2 других файлов) |
| transactionRevision | №0815 |
| transcended | №0718 (+ 1 других файлов) |
| Transcended | №0799 |
| transfer | №0820 |
| transferCondition | №0783 |
| transferDamage | №0783 |
| transferringAffliction | №0783 |
| transform | №0813 |
| transformed | №0822 |
| translation | №1270 |
| transport | №0814 |
| transposition | №0783 |
| traps | №0674 |
| treasure | №0071 |
| triangles | №0067 (+ 4 других файлов) |
| trickster | №0825 (+ 2 других файлов) |
| tricksterStatus | №0825 |
| tricksterTurn | №0822 |
| trigger | №0783 (+ 3 других файлов) |
| triggerDamageTypes | №0645 |
| triggerHealing | №0807 |
| triggerId | №0659 (+ 2 других файлов) |
| triggerMiraculousHealing | №0783 |
| triggerOnNearbyKill | №0645 |
| triggerOnPsychicDamage | №0783 |
| triggerSpend | №0813 |
| trough | №0071 |
| trousers | №0066 |
| trueSight | №0817 |
| truesightFt | №0783 |
| trunkSize | №0070 (+ 1 других файлов) |
| truth | №0807 |
| truthful | №0822 |
| truthfulIds | №0822 |
| ts | №0855 |
| turn | №0813 |
| turned | №0652 |
| turnEnd | №0822 |
| turnId | №1353 |
| turnIds | №0825 (+ 2 других файлов) |
| turnResources | №0082 (+ 34 других файлов) |
| turns | №0645 |
| turnStart | №0822 |
| turnUndead | №0652 |
| turtle | №0065 |
| tuskSize | №0070 (+ 2 других файлов) |
| twin_braids | №0065 (+ 1 других файлов) |
| twin_tails | №0065 (+ 1 других файлов) |
| twinFamiliar | №0783 |
| twinned | №0652 |
| twoRevelations | №0817 |
| type | №0074 (+ 113 других файлов) |
| typedDice | №0822 |
| typedExtraDice | №0082 (+ 3 других файлов) |
| typeKey | №0878 (+ 4 других файлов) |
| types | №0678 |
| u | №0065 (+ 1 других файлов) |
| uiGather | №0085 |
| uiRequired | №0718 |
| umbralImprecation | №0783 |
| unarmed | №0783 |
| unarmedAttack | №0645 (+ 3 других файлов) |
| unarmedAttackBonus | №0783 |
| unarmedDamage | №0783 |
| unarmedGraft | №1265 |
| unarmoredAC | №0783 |
| unavailable | №0081 (+ 11 других файлов) |
| unavoidableAccident | №0783 |
| unbreakable | №0645 (+ 2 других файлов) |
| Unbreakable | №0783 |
| unbreakableExploit | №0783 |
| unbridledChaos | №0783 |
| uncannyDodge | №0652 |
| unchanged | №1309 |
| uncommon | №0797 (+ 5 других файлов) |
| unconsciousAtFatigueGteCurrentHp | №0783 |
| unconsciousOrStunnedOnly | №0783 |
| undead | №0632 (+ 15 других файлов) |
| undeadFocusAvailable | №0645 |
| undeadFocusReaction | №0645 |
| undercut | №0065 (+ 1 других файлов) |
| underdark | №0067 |
| underwaterDarkvision | №0837 |
| underwear | №0066 |
| underwearBottom | №0070 (+ 5 других файлов) |
| underwearTop | №0070 (+ 6 других файлов) |
| undo | №0067 |
| undying | №0645 (+ 2 других файлов) |
| undyingServitude | №0813 |
| unequip | №0070 |
| unerringEye | №0783 |
| unfortunateAccident | №0783 |
| ungulate | №0778 |
| uniforms | №1266 |
| uniquePositionVertexCounts | №1316 |
| unit | №0065 (+ 4 других файлов) |
| unitGp | №0806 |
| units | №0803 |
| unknown | №1258 (+ 2 других файлов) |
| unleashed | №0718 (+ 1 других файлов) |
| unlimitedHybrid | №0783 |
| unlockRank | №0674 |
| unlockSchedule | №0825 |
| unreducedNecrotic | №0783 |
| unreducedSelfDamage | №0783 |
| unreducible | №0783 |
| unrivaledGenius | №0833 |
| unsealed | №0645 |
| unsealedArcana | №0645 |
| unsealedAspectReplacement | №0848 |
| unseen | №1375 |
| unshackledPower | №0783 |
| unstable | №0083 (+ 1 других файлов) |
| unstoppable | №0875 |
| unsupported | №0081 (+ 17 других файлов) |
| until | №0082 (+ 1 других файлов) |
| untilDismissed | №0783 |
| untilOwnEnd | №0822 |
| untilOwnEndAfterNext | №0822 |
| untilOwnerEnd | №0822 (+ 1 других файлов) |
| untilOwnerStart | №0822 |
| untilOwnStart | №0822 (+ 2 других файлов) |
| untilRound | №0822 |
| unwaveringWill | №0743 |
| unyieldingResolve | №0739 |
| unyieldingWill | №0833 |
| update | №0834 (+ 1 других файлов) |
| updateAvailable | №0846 |
| updated | №0837 (+ 1 других файлов) |
| updated_at | №1296 |
| updatedAt | №0075 (+ 1 других файлов) |
| updateSwarm | №0065 |
| upperArmL | №0063 |
| upperArmR | №0063 |
| urbanAdvantage | №0780 |
| uri | №1305 |
| url | №0072 (+ 4 других файлов) |
| URL | №1388 (+ 5 других файлов) |
| urls | №0890 |
| ursine | №0778 |
| use | №0690 (+ 1 других файлов) |
| useCount | №0783 |
| used | №0628 (+ 21 других файлов) |
| usedBloodLevels | №0817 |
| usedBy | №0677 (+ 1 других файлов) |
| usedByV38 | №0676 (+ 1 других файлов) |
| usedCount | №0658 |
| usedLevels | №0817 |
| useDominantOrgan | №0873 |
| usedThisRound | №0809 |
| useFeature | №0082 (+ 16 других файлов) |
| useIntForStr | №0783 |
| useIntForStrengthOrDexOnSurge | №0783 |
| useLeadership | №0783 |
| user | №0657 (+ 1 других файлов) |
| user_metadata | №1258 |
| userAgent | №0852 (+ 1 других файлов) |
| useRules | №0787 (+ 23 других файлов) |
| uses | №0702 (+ 5 других файлов) |
| usesAlchemistSupplies | №0815 |
| usesIntForPerception | №0783 |
| usesPerLongRest | №0082 (+ 2 других файлов) |
| usesPerRest | №0813 |
| usesPerTurn | №0783 |
| useSpiritAbility | №0788 |
| usesStrength | №0660 (+ 1 других файлов) |
| useStrength | №0783 |
| useStrengthWithBows | №0783 |
| useSubclassFeature | №0788 (+ 2 других файлов) |
| useTex | №1266 |
| useTexLoc | №0077 |
| uv | №0062 (+ 5 других файлов) |
| uvLoc | №0077 |
| v | №0062 (+ 2 других файлов) |
| V | №1343 |
| V52 | №1357 |
| V53 | №1358 |
| valiantLeader | №0743 |
| validate | №0824 |
| validatePack | №0665 |
| validateTurn | №0787 |
| value | №0064 (+ 25 других файлов) |
| valueGp | №0822 |
| valueMultiplier | №0669 |
| values | №0072 (+ 1 других файлов) |
| vampirism | №0081 |
| vanish | №0652 |
| variant | №0063 (+ 4 других файлов) |
| variantHooks | №0632 (+ 13 других файлов) |
| variants | №0082 (+ 2 других файлов) |
| VEC2 | №0072 (+ 4 других файлов) |
| VEC3 | №0072 (+ 4 других файлов) |
| VEC4 | №0072 (+ 4 других файлов) |
| vedalken | №0676 |
| vengefulBane | №0783 |
| venom | №0671 |
| Venom | №0084 |
| venomConcentrateV49 | №0671 |
| venomReagent | №0671 (+ 1 других файлов) |
| verbal | №0764 (+ 10 других файлов) |
| verbalBlocked | №0822 |
| verbalComponentsBlocked | №0082 |
| verify | №0657 |
| vermillion | №0645 |
| Vermillion | №0783 |
| vermin | №0778 |
| versatileAttackBonus | №0783 |
| versatileFightingAdvanced | №0783 |
| version | №0063 (+ 51 других файлов) |
| VERSION | №0063 (+ 56 других файлов) |
| vertexCount | №0067 (+ 1 других файлов) |
| vertexMask | №0063 |
| vertices | №0067 (+ 6 других файлов) |
| verticesPerRat | №0065 |
| very_rare | №0797 (+ 5 других файлов) |
| vesselMagic | №0848 |
| vessels | №0674 |
| vesselSlots | №0848 |
| vesselStrike | №0848 |
| vials | №0674 |
| victorySurgeExploit | №0783 |
| view | №0075 (+ 1 других файлов) |
| viewport | №1458 (+ 36 других файлов) |
| viewportHeight | №0067 |
| viewportWidth | №0067 |
| vileAffliction | №0783 |
| village | №0803 |
| vine | №0836 |
| vinegar | №0677 |
| violet | №0836 |
| visible | №0645 (+ 9 других файлов) |
| visibleMeleeOnly | №0783 |
| Vitality | №0084 |
| vitalitySplint | №0783 |
| voiceReagent | №0830 |
| volatility | №0084 |
| Volatility | №0084 |
| volume | №0065 (+ 1 других файлов) |
| volumes | №0065 |
| voluntarilyDetach | №0820 |
| voraciousWeapon | №0783 |
| vowOfEnmity | №0652 (+ 1 других файлов) |
| vpLoc | №0077 |
| vulnerabilities | №0659 (+ 9 других файлов) |
| vulnerability | №0645 (+ 2 других файлов) |
| vulnerable | №0854 (+ 1 других файлов) |
| w | №0062 (+ 10 других файлов) |
| wagerCurrent | №0825 |
| wagerMax | №0825 |
| wagerOdds | №0825 |
| wagers | №0825 (+ 1 других файлов) |
| wagerStartCheck | №0822 |
| waist | №0067 (+ 6 других файлов) |
| waiveSacrificeDamage | №0783 |
| wakeMageSleeper | №0822 |
| wall | №0075 |
| WALL | №0076 |
| wall_brick_red | №0076 |
| wall_concrete | №0076 |
| wall_half_timber | №0076 |
| wall_marble_dark | №0076 |
| wall_marble_light | №0076 |
| wall_moss_stone | №0076 |
| wall_old_plaster | №0076 |
| wall_plaster_dark | №0076 |
| wall_plaster_light | №0076 |
| wall_plaster_panel | №0076 |
| wall_slate | №0076 |
| wall_stone_dark | №0076 |
| wall_stone_light | №0076 |
| wall_stone_masonry | №0076 |
| wall_wallpaper | №0076 |
| wall_white_plaster | №0076 |
| wall_wood_dark | №0076 |
| wall_wood_light | №0076 |
| wallClimb | №0813 |
| walls | №0075 (+ 16 других файлов) |
| wallStart | №0630 |
| wandering | №0718 (+ 1 других файлов) |
| wands | №0822 (+ 1 других файлов) |
| wands_02 | №0822 |
| wantedCp | №0805 (+ 1 других файлов) |
| war_caster | №0786 |
| warCry | №0783 |
| ward | №0659 |
| wardAbsorbed | №0659 |
| wardDenied | №0659 |
| Warden | №0799 |
| wardenInterrupt | №0659 |
| wardenSource | №0799 |
| wardenSurvive | №0659 |
| warforged | №0676 |
| warfront | №1366 |
| warfrontEligible | №0635 |
| warlock | №0802 (+ 1 других файлов) |
| warlockLevelEquivalent | №0783 |
| Warlord | №0799 |
| warlordSource | №0799 |
| warning | №0668 |
| warPriest | №0652 |
| warriorPoet | №0783 |
| warsong | №0783 |
| warSongs | №0780 |
| waste | №0830 |
| wasteland | №0803 |
| water | №0676 (+ 1 других файлов) |
| waterBreathing | №0082 (+ 2 других файлов) |
| waterCore | №0830 |
| waterEssence | №0830 |
| wave | №0065 |
| wavy_bob | №0065 (+ 1 других файлов) |
| wavy_long | №0065 (+ 1 других файлов) |
| wax | №0672 (+ 2 других файлов) |
| Weakness | №0084 |
| weapon | №0071 (+ 13 других файлов) |
| weaponAttack | №0659 (+ 22 других файлов) |
| weaponAttackBonus | №0817 |
| weaponBonus | №0817 |
| weaponDamage | №0817 |
| weaponDamageType | №0783 |
| weaponFunctional | №1360 |
| weaponId | №0082 (+ 14 других файлов) |
| weaponMastery | №0739 |
| weaponMasteryLevels | №0739 |
| weaponOnly | №0822 |
| weaponProficiency | №0817 |
| weapons | №0797 (+ 65 других файлов) |
| weaponsData | №0628 (+ 2 других файлов) |
| weaponsmith | №0805 (+ 1 других файлов) |
| weaponTeleportIfDistanceGtFt | №0783 |
| weaponValue | №1360 |
| weaponWear | №1298 |
| wearForArmor | №0670 |
| wearForAttack | №0670 |
| wearRatio | №0669 |
| weasel | №0690 |
| weaver | №0672 (+ 7 других файлов) |
| webgl | №1466 |
| webPreferences | №0890 |
| webSecurity | №0890 |
| weight | №0069 (+ 47 других файлов) |
| weights | №0062 (+ 3 других файлов) |
| weld | №0062 |
| White | №0780 (+ 1 других файлов) |
| whiteHot | №0783 |
| width | №0067 (+ 48 других файлов) |
| wildCharge | №0783 |
| wildernessIntel | №0783 |
| wildMagicSurge | №0652 |
| wildShape | №0652 (+ 1 других файлов) |
| wildspace | №0634 (+ 1 других файлов) |
| wildspaceEligible | №0634 |
| wildwood | №0067 |
| willControlledBy | №0873 |
| willingTargetIds | №0823 (+ 1 других файлов) |
| window | №0071 (+ 77 других файлов) |
| wingColor | №0070 (+ 3 других файлов) |
| wingSize | №0070 (+ 1 других файлов) |
| wis | №0628 (+ 54 других файлов) |
| wisChecksAdvantage | №0645 (+ 1 других файлов) |
| wisChecksDisadvantage | №0645 (+ 1 других файлов) |
| wisdom | №0790 (+ 9 других файлов) |
| wisdomCheckAdvantage | №0817 |
| wisdomSaveAdvantage | №0783 |
| wisSave | №0783 |
| wisSavesDisadvantage | №0645 (+ 1 других файлов) |
| Witch | №0711 |
| witchCurse | №0783 |
| witchItemFlySpeed | №0813 |
| with | №0809 |
| withering | №0082 |
| withFileTypes | №0892 (+ 1 других файлов) |
| within10CellsPct | №1313 |
| within2CellsPct | №1313 |
| within5CellsPct | №1313 |
| within5GridCellsPct | №1318 |
| withinCellPct | №1313 |
| withinGridCellPct | №1318 |
| wizard | №0802 (+ 1 других файлов) |
| won | №0825 |
| wood | №0071 (+ 6 других файлов) |
| woodcarver | №0674 (+ 3 других файлов) |
| wooden | №0071 |
| woodwork | №0672 (+ 1 других файлов) |
| wool | №0066 |
| wordsOfAdamance | №0783 |
| wordsOfBenediction | №0783 |
| wordsOfDamnation | №0783 |
| wordsOfDomination | №0783 |
| wordsOfLegend | №0783 |
| wordsOfMayhem | №0783 |
| wordsOfZeal | №0783 |
| worg | №0690 |
| worldActor | №0078 |
| worldId | №0882 |
| worldMatrices | №0072 |
| worn | №0668 |
| wrapS | №0067 (+ 1 других файлов) |
| wrapT | №0067 (+ 1 других файлов) |
| wretchedCastigation | №0783 |
| writable | №0822 |
| write | №0082 (+ 1 других файлов) |
| x | №0065 (+ 49 других файлов) |
| xanathar | №0632 |
| xenoNecroticReady | №1264 |
| xp | №0632 (+ 17 других файлов) |
| xpFor | №0809 |
| xu | №0062 |
| xv | №0062 |
| xx | №0062 |
| xy | №0062 |
| y | №0065 (+ 44 других файлов) |
| yaw | №0065 (+ 2 других файлов) |
| yeast | №0676 |
| yew | №0677 |
| yieldMult | №0812 |
| yieldMultiplier | №0676 |
| yu | №0062 |
| yuan_ti | №0676 |
| yv | №0062 |
| yy | №0062 |
| z | №0065 (+ 3 других файлов) |
| zealousWords | №0780 |
| zeroHp | №0822 |
| zeroHpReaction | №0659 (+ 4 других файлов) |
| zeroHpSave | №0783 |
| zincOre | №0677 |
| zoneRadiusFt | №0783 |
| zones | №0075 (+ 1 других файлов) |
| zoom | №0074 (+ 3 других файлов) |

### Ключи localStorage (26)

| Имя | Исходные файлы |
|---|---|
| dnd_app_alpha | №0836 |
| dnd_app_font | №0836 |
| dnd_app_frame_color | №0836 |
| dnd_app_frame_style | №0836 |
| dnd_app_theme | №0836 |
| dnd_autorotate_enabled | №0872 |
| dnd_autorotate_interval | №0872 |
| dnd_campaigns_v1 | №0814 (+ 1 других файлов) |
| dnd_character_appearance_draft_v1 | №1466 |
| dnd_characters | №0835 |
| dnd_current_character_id | №0835 (+ 1 других файлов) |
| dnd_custom_races | №0828 |
| dnd_debug_enabled | №0836 (+ 2 других файлов) |
| dnd_launcher_icon | №0836 (+ 2 других файлов) |
| dnd_market_v55_state | №0806 (+ 1 других файлов) |
| dnd_modal_color | №0074 (+ 1 других файлов) |
| dnd_modal_opacity | №0074 (+ 1 других файлов) |
| dnd_multi_characters_v2 | №0628 (+ 44 других файлов) |
| dnd_selected_wallpaper | №0872 |
| dnd_ui_color | №0074 (+ 1 других файлов) |
| dnd_ui_opacity | №0074 (+ 1 других файлов) |
| dnd_v53_world_id | №0882 |
| dnd_v71_onboarding_done | №0819 (+ 1 других файлов) |
| dnd_vtt_mobile_session_v67 | №1435 |
| dnd_wallpaper_dim | №0872 |
| dndContentEnabled | №0665 |

### CSS переменные (16)

| Имя | Исходные файлы |
|---|---|
| --accent-action | №0841 |
| --accent-danger | №0841 |
| --accent-primary | №0841 |
| --accent-success | №0841 |
| --bg-box | №0841 |
| --bg-card | №0841 |
| --bg-input | №0841 |
| --bg-main | №0841 |
| --border-color | №0841 |
| --border-input | №0841 |
| --dnd-frame-art | №0841 |
| --dnd-frame-color | №0841 |
| --dnd-frame-filter | №0841 |
| --text-labels | №0841 |
| --text-main | №0841 |
| --text-muted | №0841 |

### Python/Java идентификаторы (650)

| Имя | Исходные файлы |
|---|---|
| __DND_APP_BOOT_READY | №0053 |
| __name__ | №0005 (+ 17 других файлов) |
| a | №0052 (+ 3 других файлов) |
| aa | №0052 |
| accentHex | №2261 |
| accessor | №2330 |
| action | №1497 (+ 4 других файлов) |
| active | №0052 (+ 2 других файлов) |
| activeFile | №0052 |
| activeRoot | №0053 |
| activeVersion | №0052 |
| activity | №0052 |
| actor | №2262 |
| actual | №2253 |
| add_leaf_bones | №2330 |
| adv | №2257 |
| advui | №2257 |
| alch | №2335 |
| ALIAS | №1823 |
| aliases | №0052 (+ 1 других файлов) |
| aligned | №2247 |
| alt | №2336 |
| altered | №2252 |
| android | №1508 |
| androidPackage | №2249 |
| animationClips | №1450 |
| ap | №1457 |
| apk | №1825 (+ 2 других файлов) |
| apkBytes | №0052 (+ 2 других файлов) |
| apkCompressedBytes | №1452 |
| apkSha256 | №1500 (+ 1 других файлов) |
| app | №1508 |
| app_path | №1508 |
| APP_VERSION | №1508 |
| apply_unit_scale | №2330 |
| approved | №0005 |
| archive | №2247 |
| archives | №1497 |
| area | №1450 |
| arenas | №0005 |
| args | №1450 (+ 9 других файлов) |
| armatures | №2330 |
| artifacts | №0007 (+ 2 других файлов) |
| artwork | №1452 |
| assets | №2336 (+ 1 других файлов) |
| at | №2330 |
| attr | №2265 |
| attributes | №1450 |
| attrs | №2265 |
| av | №0052 |
| axis | №1450 |
| axis_forward | №2330 |
| axis_up | №2330 |
| b | №0052 (+ 7 других файлов) |
| backup | №2253 |
| backup_hash | №2253 |
| badging | №2247 (+ 1 других файлов) |
| bake_anim | №2330 |
| base | №2335 (+ 1 других файлов) |
| base_classes | №2336 |
| base_feat_ids | №2336 |
| base_races | №2336 |
| baselineInstall | №2255 |
| baseUrl | №0052 |
| bb | №0052 |
| before | №1825 |
| binary | №1450 (+ 1 других файлов) |
| blend_match | №2259 |
| blob | №0005 |
| blobs | №0007 |
| bodies | №2330 |
| body | №2260 |
| bones | №1450 |
| branch | №1451 |
| BRANCH | №0005 (+ 2 других файлов) |
| brand | №2261 |
| BRAND | №2253 |
| brandTemplateSkin | №2261 |
| buf | №0052 |
| buffer | №1450 (+ 1 других файлов) |
| build | №1452 |
| build_run | №0005 (+ 1 других файлов) |
| build_script | №2262 |
| buildRoots | №1451 |
| buildRun | №0005 |
| bundled | №2262 |
| bundled_history | №2250 |
| bundledCreationIds | №2248 |
| button | №2259 |
| bv | №0052 |
| bytes | №0005 (+ 8 других файлов) |
| c | №0052 (+ 6 других файлов) |
| cache | №0052 |
| cacheBytes | №0052 |
| cacheKey | №0052 |
| candidate | №2255 |
| candidate_run | №2250 |
| candidates | №0052 (+ 1 других файлов) |
| canonical | №0052 |
| capture | №2247 (+ 1 других файлов) |
| capture_output | №0005 |
| catalog | №1497 (+ 2 других файлов) |
| catalogs | №2248 |
| category | №1506 |
| cert | №2247 (+ 1 других файлов) |
| CERT | №2247 (+ 1 других файлов) |
| certificate | №0005 |
| changes | №1825 |
| channel | №2249 |
| channels | №2330 |
| characters | №1825 |
| chatEditResult | №1825 |
| checksums | №0005 |
| children | №0052 |
| choices | №1457 (+ 2 других файлов) |
| chunk | №1450 |
| ci | №2255 |
| cipher | №1823 |
| ciphertext | №1823 |
| classic | №2260 |
| client | №2253 |
| code | №1508 (+ 3 других файлов) |
| Code | №2247 (+ 1 других файлов) |
| codeCache | №0052 |
| codeCacheBytes | №0052 |
| codes | №2262 |
| color | №2336 |
| component | №0052 |
| components | №1825 |
| compressed | №2248 |
| conclusion | №2252 (+ 1 других файлов) |
| connectedComponents | №1450 |
| content | №2336 |
| context | №0052 |
| converted | №2246 |
| coordinates | №2330 |
| copying | №1821 |
| count | №1450 (+ 3 других файлов) |
| counts | №1450 (+ 1 других файлов) |
| craft | №2335 |
| created | №0007 |
| creation | №1500 |
| crlf | №2246 |
| current | №1508 (+ 2 других файлов) |
| cwd | №1451 (+ 1 других файлов) |
| d | №1456 (+ 2 других файлов) |
| data | №0005 (+ 11 других файлов) |
| dataBytes | №0052 |
| dataRoot | №0052 |
| default | №1457 (+ 2 других файлов) |
| defaultFile | №0052 |
| defaultInterfaceOrientation | №2262 |
| degenerateTriangles | №1450 |
| delta | №2330 |
| dependencies | №1451 |
| deps | №2335 |
| descriptor | №0005 (+ 1 других файлов) |
| desktopUiSmoke | №2255 |
| dest | №0007 (+ 1 других файлов) |
| destination | №0005 (+ 1 других файлов) |
| details | №2257 |
| detected | №1457 |
| deviceQa | №2248 |
| dialog | №1825 |
| dice | №2260 |
| digest | №0005 (+ 4 других файлов) |
| dir | №2247 |
| directory | №1821 |
| dirs | №0052 |
| dklen | №2247 |
| dndvtt_update | №0052 |
| doc | №2330 (+ 4 других файлов) |
| document | №1450 (+ 1 других файлов) |
| documents | №2265 |
| downloadedBytes | №0052 |
| dtype | №1450 (+ 1 других файлов) |
| dump | №2258 |
| duplicates | №1451 |
| edges | №1450 (+ 1 других файлов) |
| editorMorphs | №1450 |
| element | №2265 |
| embeddedMorphChannels | №1450 |
| enabled | №0052 (+ 2 других файлов) |
| encoding | №0005 (+ 12 других файлов) |
| encrypted | №2247 (+ 1 других файлов) |
| ensure_ascii | №0005 (+ 13 других файлов) |
| entries | №1498 (+ 3 других файлов) |
| entry | №0052 (+ 5 других файлов) |
| env | №0007 (+ 1 других файлов) |
| environment | №1500 |
| error | №2330 |
| errors | №1451 (+ 1 других файлов) |
| event | №2252 (+ 1 других файлов) |
| evidence | №0005 |
| EXCLUDE_DIRS | №1506 |
| executor | №0052 |
| exist_ok | №0005 (+ 10 других файлов) |
| existing | №0005 (+ 1 других файлов) |
| expected | №0005 (+ 4 других файлов) |
| expected_bones | №2330 |
| expected_cert | №0005 |
| expected_coordinates | №2330 |
| expected_extents | №2330 |
| expected_name | №0005 |
| expected_shapes | №2330 |
| expected_triangles | №2330 |
| expectedBytes | №0052 |
| expectedHash | №0052 |
| experimental | №2266 |
| experiments | №0005 |
| export_apply | №1497 |
| export_format | №1497 |
| ext | №1457 (+ 1 других файлов) |
| extents | №2330 |
| external_guids | №1451 |
| f | №0052 (+ 1 других файлов) |
| faces | №1450 |
| failed | №0007 |
| fbx | №2330 |
| feats | №2336 |
| feed | №0005 (+ 2 других файлов) |
| female | №2330 |
| field | №2252 |
| file | №0052 (+ 4 других файлов) |
| filepath | №1497 (+ 1 других файлов) |
| files | №0007 (+ 9 других файлов) |
| filesBytes | №0052 |
| FIXTURE | №2246 |
| flags | №1825 (+ 1 других файлов) |
| flush | №0005 |
| folder | №2249 (+ 1 других файлов) |
| found | №2253 |
| fp | №1498 |
| front | №2260 |
| frontend | №2253 (+ 1 других файлов) |
| fs | №2336 |
| full | №2336 |
| full_name | №2252 (+ 1 других файлов) |
| GENERATED | №1506 |
| generator | №1823 |
| git_sha | №0005 |
| GITHUB_EVENT_NAME | №2255 |
| GITHUB_REF | №2255 |
| GITHUB_REPOSITORY | №2255 |
| GITHUB_SHA | №2255 |
| glb | №2330 |
| goToTab | №0053 |
| gradle | №1508 |
| gradle_path | №1508 |
| groups | №1451 |
| guids | №1451 |
| gx | №1456 |
| gy | №1456 |
| h | №1457 (+ 3 других файлов) |
| head_branch | №2252 (+ 1 других файлов) |
| head_repository | №2252 (+ 1 других файлов) |
| head_sha | №2252 (+ 1 других файлов) |
| header | №2247 |
| headers | №0005 |
| healthy | №0053 |
| height | №0005 (+ 2 других файлов) |
| help | №1508 |
| hero | №2257 |
| history | №0005 (+ 1 других файлов) |
| history_path | №0005 (+ 2 других файлов) |
| home | №2253 |
| hover_blend | №2259 |
| i | №0052 (+ 2 других файлов) |
| iconId | №0052 |
| id | №0052 (+ 4 других файлов) |
| ids | №1450 |
| image | №1456 |
| imageDirty | №2260 |
| images | №0005 |
| imported | №2330 |
| in | №0052 |
| indent | №0005 (+ 15 других файлов) |
| index | №0005 |
| indexComponentType | №1450 |
| info | №0052 |
| ings | №2335 |
| input | №1821 (+ 1 других файлов) |
| installedPayloadHashes | №2255 |
| intent | №1821 (+ 1 других файлов) |
| inv | №1452 |
| isolatedProfileAndBackupPreserved | №2255 |
| item | №0005 (+ 4 других файлов) |
| item_catalogs | №2248 |
| iv | №1823 |
| jb | №2330 |
| jobs | №2249 (+ 4 других файлов) |
| json | №1825 |
| json_size | №2330 |
| k | №1497 |
| keepPrevious | №0052 |
| key | №1452 (+ 3 других файлов) |
| keys | №2336 |
| kind | №0005 (+ 6 других файлов) |
| landscapeActive | №0053 |
| latest | №0005 (+ 1 других файлов) |
| launchers | №2265 |
| legacy | №1825 (+ 1 других файлов) |
| len | №0052 |
| length | №0052 (+ 2 других файлов) |
| LIMIT | №1821 |
| limitations | №1451 |
| linear | №2259 |
| lines | №1497 |
| link | №1497 (+ 1 других файлов) |
| live | №2262 |
| live_feed | №0005 |
| loader | №0053 |
| local_path | №2250 |
| lower | №0052 |
| m | №1451 (+ 8 других файлов) |
| main | №1451 (+ 1 других файлов) |
| manifest | №0005 (+ 5 других файлов) |
| MANIFEST | №1506 |
| MANIFEST_PATHS | №1506 |
| manifestUrl | №0052 |
| marker | №1497 (+ 1 других файлов) |
| match | №2259 |
| materials | №1450 (+ 1 других файлов) |
| max_coordinate_error | №2330 |
| max_workers | №2266 |
| merge_vertices | №2330 |
| merged | №2330 |
| mesh_smooth_type | №2330 |
| meshes | №1497 (+ 1 других файлов) |
| meshMetadata | №1450 |
| meta | №2330 (+ 1 других файлов) |
| metavar | №1508 |
| method | №2247 |
| migrated | №1451 |
| minimalContentVerified | №2248 |
| missing | №2247 |
| missing_ok | №1497 (+ 1 других файлов) |
| mode | №2248 |
| model | №1451 |
| modern | №2255 |
| module | №0007 |
| morphNames | №1450 |
| n | №0052 (+ 4 других файлов) |
| N | №1456 |
| name | №0005 (+ 10 других файлов) |
| names | №2330 (+ 2 других файлов) |
| native | №1452 |
| nativeSeedValidated | №0052 |
| new_manifest | №2250 |
| newCode | №1825 |
| next | №0052 (+ 1 других файлов) |
| noBackup | №0052 |
| noBackupBytes | №0052 |
| node | №2265 |
| nodes | №2265 |
| nonce | №2247 |
| nonFiniteValues | №1450 |
| normalized | №2246 |
| note | №1500 (+ 1 других файлов) |
| notes | №2249 (+ 1 других файлов) |
| notes_file | №0005 (+ 1 других файлов) |
| o | №0052 |
| object_types | №2330 |
| objects | №1497 (+ 2 других файлов) |
| offset | №0005 (+ 1 других файлов) |
| old | №2248 |
| oldCode | №1825 |
| oldUnity10005ApkBytes | №2248 |
| omittedNonRenderingPngBytes | №2248 |
| operation | №1821 |
| optional | №1452 |
| optional_names | №2248 |
| original | №0007 (+ 3 других файлов) |
| ORIGINAL_BLOBS | №2253 |
| original_chunks | №2248 |
| originalBrandingBytesVerified | №2248 |
| originalBrandingPixelsVerified | №2248 |
| out | №0052 (+ 7 других файлов) |
| OUT | №2330 |
| outcome | №2252 |
| output | №1821 |
| p | №1451 (+ 8 других файлов) |
| package | №1508 |
| PACKAGE | №2247 (+ 1 других файлов) |
| packaged | №2248 |
| packaged_chunks | №2248 |
| packaged_image | №2248 |
| packageId | №1825 |
| packageVersion | №0052 |
| packed | №1452 |
| parent | №0052 (+ 2 других файлов) |
| parents | №0007 (+ 11 других файлов) |
| parser | №1450 (+ 6 других файлов) |
| part | №2335 |
| parts | №1450 |
| passed | №2249 |
| password | №2247 |
| patch | №2250 |
| path | №0005 (+ 10 других файлов) |
| path_mode | №2330 |
| pathId | №1500 |
| paths | №1451 (+ 1 других файлов) |
| payload | №2246 (+ 1 других файлов) |
| pending | №0052 |
| per_page | №2249 (+ 1 других файлов) |
| permissions | №2265 |
| phb | №2336 |
| physical | №2265 |
| physicalAndroidQa | №2247 |
| pick | №1821 |
| PICK | №1821 |
| picture | №1825 |
| pixels | №1450 (+ 1 других файлов) |
| pkg | №1508 |
| pkg_path | №1508 |
| plaintext | №2247 |
| platform | №0005 (+ 1 других файлов) |
| player_settings | №2262 |
| pm | №0052 (+ 1 других файлов) |
| png | №1825 |
| pores | №1456 |
| position | №2248 |
| position_view | №2330 |
| positions | №1450 (+ 1 других файлов) |
| prefix | №0007 (+ 3 других файлов) |
| prefs | №0052 (+ 1 других файлов) |
| present | №2264 |
| preset | №2254 |
| preview | №2260 |
| preview_root | №2266 |
| preview_rows | №2266 |
| PreviewCacheLimit | №2256 |
| previewRoot | №0052 |
| previews | №2256 |
| previous | №0005 (+ 4 других файлов) |
| previousDir | №0052 |
| previousRequestedOrientation | №0053 |
| primitive | №2330 |
| primitives | №1450 |
| prior | №2250 |
| probe | №2247 |
| props | №2248 |
| propTextureCount | №2248 |
| propTextureDimensions | №2248 |
| provenance | №1452 |
| PUBLISHED_APK_SHA | №2247 |
| publisher | №0006 (+ 1 других файлов) |
| pushed | №0007 |
| qa | №2249 (+ 1 других файлов) |
| queue | №1451 |
| quoted | №2265 |
| ratio | №2259 |
| raw | №0052 (+ 3 других файлов) |
| rawBounds | №1450 |
| reach | №1456 |
| received | №0052 |
| record | №1500 |
| records | №1497 |
| reductionBytes | №2248 |
| reductionPercent | №2248 |
| reference | №2265 |
| references | №1451 |
| refs | №2258 (+ 1 других файлов) |
| reinstall | №2255 |
| rel | №1506 |
| relative | №1497 |
| release | №2262 |
| release_exists | №2250 |
| remote | №2262 |
| removed_art_bytes | №2248 |
| render | №2260 |
| render_digest | №0005 |
| render_folder | №0005 |
| REPO | №0005 (+ 2 других файлов) |
| report | №0005 (+ 5 других файлов) |
| request | №0005 (+ 1 других файлов) |
| required | №0005 (+ 12 других файлов) |
| resources | №2265 |
| restore | №0053 |
| result | №1452 (+ 7 других файлов) |
| resultDelivered | №1821 |
| return_counts | №1450 |
| return_inverse | №1450 |
| return_value | №2255 |
| returncode | №0005 (+ 1 других файлов) |
| reverse | №1452 (+ 1 других файлов) |
| rgb | №2259 |
| rig | №2330 |
| rigs | №2330 |
| rng | №1456 |
| root | №0007 (+ 16 других файлов) |
| ROOT | №1450 (+ 12 других файлов) |
| root_url | №1457 |
| rootEntries | №0052 |
| roots | №1450 (+ 1 других файлов) |
| rough | №1456 |
| row | №1451 (+ 1 других файлов) |
| rows | №1452 (+ 3 других файлов) |
| run | №2249 (+ 2 других файлов) |
| run_data | №2250 |
| RUNNER_TEMP | №2255 |
| runtime | №2255 |
| RUNTIME_MANIFEST | №1506 |
| runtimeSmoke | №2255 |
| s | №0052 (+ 1 других файлов) |
| scene | №2255 |
| schema | №1450 (+ 2 других файлов) |
| script | №2336 |
| sdk | №0005 (+ 1 других файлов) |
| seamDuplicates | №1450 |
| seen | №1451 (+ 3 других файлов) |
| selected | №0052 (+ 1 других файлов) |
| selectedIndex | №0052 |
| send | №1825 |
| separators | №1498 (+ 3 других файлов) |
| serializedBytes | №1500 |
| session | №2260 |
| settings | №2247 (+ 3 других файлов) |
| settings_hub | №2262 |
| settingsCategory | №2262 |
| sha | №0007 (+ 1 других файлов) |
| sha256 | №0005 (+ 5 других файлов) |
| shape | №2330 |
| sheet | №2260 (+ 1 других файлов) |
| sheetSkin | №2261 |
| shortcuts | №1825 |
| side_effect | №2255 |
| signer | №2250 |
| signers | №0005 |
| signingCertificateSha256 | №2247 |
| sigs | №1825 |
| size | №2248 (+ 2 других файлов) |
| skin | №2261 |
| skins | №1450 |
| skipped | №1497 |
| slot | №1825 |
| slug | №2336 |
| source | №0007 (+ 7 других файлов) |
| SOURCE | №2256 |
| source_commit | №0005 (+ 2 других файлов) |
| source_image | №2248 |
| source_paths | №1451 |
| sourceCommit | №0005 (+ 1 других файлов) |
| sourceRefs | №1451 |
| sources | №2246 |
| sparse | №2330 |
| spec | №0007 (+ 3 других файлов) |
| src | №0052 |
| SRC | №2330 |
| stack | №0052 (+ 1 других файлов) |
| stage | №2247 (+ 1 других файлов) |
| staged | №0052 |
| stageRoot | №0052 |
| standalone | №1497 |
| start | №2330 |
| state | №0052 |
| status | №2247 (+ 2 других файлов) |
| stderr | №2247 (+ 1 других файлов) |
| stdout | №2250 |
| store | №1823 (+ 2 других файлов) |
| strides | №1450 |
| sums | №0005 |
| surfaces | №2336 |
| t | №2258 (+ 1 других файлов) |
| table | №2260 |
| tag | №0005 (+ 2 других файлов) |
| target | №0052 (+ 7 других файлов) |
| targets | №0007 |
| temp | №1497 |
| text | №0005 (+ 7 других файлов) |
| texts | №1451 |
| textured | №2266 |
| textureFormat | №1500 |
| textures | №1452 |
| themes | №2266 |
| ti | №0052 |
| timeout | №0005 (+ 1 других файлов) |
| title | №0053 |
| token | №1821 |
| tools | №2250 |
| topology | №1450 |
| total | №0052 (+ 1 других файлов) |
| totalBytes | №0052 |
| totalFiles | №0052 |
| tracked | №1451 |
| trays | №2266 |
| triangles | №1450 |
| type | №0052 (+ 10 других файлов) |
| typeCounts | №1500 |
| ui | №2262 |
| uiStyles | №2261 |
| unique | №2336 |
| uniquePositions | №1450 |
| unit | №0052 |
| units | №0052 |
| UNITY_ANDROID_KEYSTORE_BASE64 | №2255 |
| UNITY_CI_ARTIFACT_PASSWORD | №2255 |
| UNITY_EMAIL | №2255 |
| UNITY_LICENSE | №2255 |
| UNITY_PASSWORD | №2255 |
| UNITY_SERIAL | №2255 |
| unityGuidEdges | №1451 |
| unityPyVersion | №1500 |
| unknownFilePreserved | №2255 |
| updateBytes | №0052 |
| updater | №0053 (+ 1 других файлов) |
| updateRoot | №0052 |
| upgrade | №2255 |
| uri | №1451 (+ 2 других файлов) |
| url | №0005 (+ 4 других файлов) |
| use_anim | №2330 |
| use_empty | №2330 |
| use_global | №1497 |
| use_mesh_modifiers | №2330 |
| use_selection | №1497 (+ 1 других файлов) |
| uv | №1450 |
| uvOutsideUnitSquare | №1450 |
| uvRange | №1450 |
| validate | №2247 |
| value | №0052 |
| verbosity | №0006 (+ 1 других файлов) |
| verified | №0005 (+ 1 других файлов) |
| verify | №2252 |
| version | №0005 (+ 6 других файлов) |
| Version | №2247 (+ 1 других файлов) |
| VERSION | №1506 |
| versionCode | №0007 (+ 3 других файлов) |
| versionName | №0052 (+ 2 других файлов) |
| versions | №0052 (+ 1 других файлов) |
| versionsBytes | №0052 |
| vertices | №1450 |
| view | №1450 (+ 1 других файлов) |
| visited | №0052 |
| vm | №2336 |
| VTT_PROJECT_MANIFEST_V70 | №1498 (+ 1 других файлов) |
| webView | №0053 |
| weights | №1450 |
| weightSumMaxError | №1450 |
| weldedBoundaryEdges | №1450 |
| weldedNonManifoldEdges | №1450 |
| weldTolerance | №1450 |
| width | №0005 (+ 2 других файлов) |
| window | №2336 |
| windows | №2255 |
| windowsFiles | №2247 |
| z | №1508 (+ 1 других файлов) |
| zeroWeightVertices | №1450 |
| zipCompressedBrandingBytes | №2248 |
| zipCompressedNativeBytes | №2248 |
| zipCompressedUnityDataBytes | №2248 |

### JSON поля (1401)

| Имя | Исходные файлы |
|---|---|
| _builderBaseStats | №1871 (+ 2 других файлов) |
| $schema | №1021 |
| abilities | №1871 (+ 2 других файлов) |
| abyss | №1182 |
| ac | №1160 (+ 4 других файлов) |
| acBase | №2243 (+ 1 других файлов) |
| accent_hex_reference | №2029 |
| accept | №1873 |
| accepted | №2243 |
| acFormula | №2243 (+ 1 других файлов) |
| Acid | №2296 |
| acidResistance | №1871 (+ 2 других файлов) |
| acrobatics | №1871 (+ 2 других файлов) |
| action | №0761 (+ 3 других файлов) |
| actionSurges | №1869 |
| activationCommit | №1178 (+ 5 других файлов) |
| activeConditions | №1871 (+ 2 других файлов) |
| activeFolderId | №2243 |
| activeProperties | №2297 |
| actualAndroidUpgradeOnPhone | №1180 |
| actualInstallUpgradeReinstallPassed | №1179 |
| actualLocalPhysxThrowsPerTarget | №1178 |
| actualUpgradeVerified | №1182 |
| actualWindowsUpgrade | №1180 |
| adamantine | №2296 |
| advancementBack | №1094 |
| african | №0922 |
| age | №0922 (+ 3 других файлов) |
| alchemical | №1873 |
| alchemist | №1873 (+ 1 других файлов) |
| alchemy | №2296 |
| aliases | №1873 |
| all42Forms | №1182 |
| allManifestEntriesMatchPhysicalZIP | №0909 (+ 1 других файлов) |
| allOf | №1021 |
| allowToChangeInstallationDirectory | №1235 |
| allUnpackedSizesAndSHA256 | №0909 (+ 1 других файлов) |
| amount | №2243 |
| amphibious | №1871 (+ 2 других файлов) |
| android | №1178 (+ 8 других файлов) |
| androidAfter | №1018 |
| androidBefore | №1018 |
| androidBundleArtifact | №1031 |
| androidBundleBytes | №1031 |
| androidBundleSha256 | №1031 |
| androidCertificateSha256 | №1183 |
| androidDebug | №0926 |
| androidPackage | №1180 (+ 3 других файлов) |
| androidSignedRelease | №0926 |
| androidSigningCertificateSha256 | №2326 |
| animalHandling | №1871 (+ 2 других файлов) |
| animalProfile | №1878 (+ 1 других файлов) |
| animationClips | №0915 |
| animationId | №1878 (+ 1 других файлов) |
| answers | №2243 |
| Antidote | №2296 |
| apk | №1100 (+ 2 других файлов) |
| apkArtifact | №1031 |
| apkArtifactId | №1027 (+ 3 других файлов) |
| apkBytes | №1049 (+ 8 других файлов) |
| apkCertificateSha256 | №1180 |
| apkCompressedBytes | №1045 |
| apkDeltaVs30 | №1183 |
| apkSha256 | №1049 (+ 6 других файлов) |
| apkV2 | №1180 |
| apkV3 | №1180 |
| apkVersionCode | №1180 |
| apothecary | №1873 |
| app | №2341 (+ 2 других файлов) |
| appId | №1235 |
| approved | №1239 (+ 1 других файлов) |
| arcana | №1871 (+ 2 других файлов) |
| arcane | №1873 |
| arch | №1235 |
| archiveBytes | №0909 (+ 3 других файлов) |
| archiveCRC | №1038 |
| archiveSha256 | №1039 |
| arm64 | №1100 (+ 2 других файлов) |
| armLength | №0090 (+ 4 других файлов) |
| armLength-decr | №0090 (+ 1 других файлов) |
| armLength-incr | №0090 (+ 1 других файлов) |
| armor | №1022 (+ 5 других файлов) |
| armorer | №1873 |
| arms | №0090 (+ 4 других файлов) |
| artifact | №0909 (+ 1 других файлов) |
| artifactBytes | №0909 (+ 1 других файлов) |
| artifactDigest | №0909 (+ 1 других файлов) |
| artifactName | №1235 |
| artifacts | №1049 (+ 4 других файлов) |
| artworkAlsoPresentAsUnityTextures | №1045 |
| asar | №1235 |
| asi | №1869 |
| asian | №0922 |
| assembly_sha256 | №1197 |
| assetId | №0755 (+ 13 других файлов) |
| assets | №1182 |
| assetsActivationCommit | №1181 |
| assetsPreviewRun | №1181 |
| asyncSceneCleanup | №1178 |
| athletics | №1162 (+ 3 других файлов) |
| attacksBack | №1094 |
| attackType | №1871 (+ 1 других файлов) |
| attributes | №0915 |
| AudioListener | №1033 |
| AudioManager | №1033 |
| audit | №0922 |
| authenticodeVerified | №1182 |
| author | №0755 (+ 17 других файлов) |
| back | №1878 (+ 1 других файлов) |
| background | №1162 (+ 3 других файлов) |
| backgroundFeature | №1871 (+ 2 других файлов) |
| backgroundLanguagesToChoose | №1871 (+ 2 других файлов) |
| backgrounds | №1871 (+ 1 других файлов) |
| backslash | №0759 (+ 1 других файлов) |
| backslashTexture | №0759 (+ 1 других файлов) |
| balanced | №1303 |
| base | №1518 |
| baseAc | №2292 |
| baseAC | №1160 (+ 3 других файлов) |
| baseAcFormula | №2292 |
| baseColorFactor | №0915 |
| baseHeight | №1886 |
| baseline | №1048 (+ 2 других файлов) |
| baseObj | №0090 (+ 1 других файлов) |
| basePositionsSha256 | №0090 (+ 1 других файлов) |
| baseUrl | №2341 (+ 2 других файлов) |
| battlefield | №2293 |
| beakColor | №1878 (+ 1 других файлов) |
| beakSize | №1878 (+ 1 других файлов) |
| beakStyle | №1878 (+ 1 других файлов) |
| beard | №1878 (+ 1 других файлов) |
| binary | №0090 (+ 1 других файлов) |
| binaryBundlePublishedToAssets | №1031 |
| binarySha256 | №0090 (+ 1 других файлов) |
| binaryTransfer | №0924 |
| blackmarket | №1873 |
| blacksmith | №1873 |
| Blindness | №2296 |
| blockedVersions | №2341 (+ 2 других файлов) |
| blood | №1182 |
| bloodCursesKnown | №1869 |
| blushColor | №1878 (+ 1 других файлов) |
| blushOpacity | №1878 (+ 1 других файлов) |
| body | №1878 (+ 1 других файлов) |
| bodyColor | №1878 (+ 1 других файлов) |
| bodyTint | №1878 (+ 1 других файлов) |
| bones | №0915 (+ 1 других файлов) |
| bonuses | №1871 (+ 2 других файлов) |
| bothBinariesDownloadedAndHashed | №1180 |
| bottom | №1878 (+ 2 других файлов) |
| bovineEarSize | №1878 (+ 1 других файлов) |
| BoxCollider | №1033 |
| branch | №1020 |
| brandingResumeValidation | №1043 |
| brave | №1871 (+ 2 других файлов) |
| breast-volume-decr | №0090 (+ 1 других файлов) |
| breast-volume-incr | №0090 (+ 1 других файлов) |
| breastSize | №0090 (+ 4 других файлов) |
| Breathing | №2296 |
| breathWeapon | №1871 (+ 2 других файлов) |
| brewer | №1873 (+ 1 других файлов) |
| browHeight | №1878 (+ 1 других файлов) |
| browRidge | №1878 (+ 1 других файлов) |
| bt_copy | №2293 |
| bt_self | №2293 |
| build | №1235 |
| buildReportArtifact | №1031 |
| buildRoots | №1020 |
| BuildSettings | №1033 |
| bullMuzzleSize | №1878 (+ 1 других файлов) |
| bundledCreationIds | №1049 (+ 3 других файлов) |
| buyFactor | №1873 |
| bytes | №2348 (+ 34 других файлов) |
| cacheBustedFeedVersionCode | №1180 |
| calligrapher | №1875 |
| Camera | №1033 |
| candidateConclusion | №1178 (+ 1 других файлов) |
| candidateJobs | №1183 |
| candidateRun | №1094 (+ 5 других файлов) |
| candidateRunId | №1100 (+ 5 других файлов) |
| cantrips | №1869 |
| Canvas | №1033 |
| CanvasRenderer | №1033 |
| capacity | №1161 |
| capColor | №1878 (+ 1 других файлов) |
| capSize | №1878 (+ 1 других файлов) |
| caravan | №1873 |
| caravan_master | №1873 |
| carpenter | №1873 (+ 1 других файлов) |
| cartographer | №1873 (+ 2 других файлов) |
| cases | №2241 (+ 3 других файлов) |
| casterId | №2293 |
| casterLevel | №2241 |
| castingTime | №1871 (+ 1 других файлов) |
| cat | №2296 |
| catalog | №1179 (+ 1 других файлов) |
| catalogUrl | №1029 |
| catalyst | №2297 |
| catalystId | №2297 |
| catalysts | №2296 |
| catEarSize | №1878 (+ 1 других файлов) |
| categories | №1873 |
| category | №2348 (+ 9 других файлов) |
| catMuzzleSize | №1878 (+ 1 других файлов) |
| caucasian | №0922 |
| cell | №0755 (+ 17 других файлов) |
| centaurSize | №1878 (+ 1 других файлов) |
| ceramic | №2296 |
| certificateSha256 | №1031 (+ 4 других файлов) |
| cha | №1160 (+ 3 других файлов) |
| changedVertices | №0922 (+ 1 других файлов) |
| changeFrom10010Bytes | №1049 |
| changes | №1866 (+ 1 других файлов) |
| channel | №1239 (+ 7 других файлов) |
| channels | №0090 (+ 2 других файлов) |
| CharacterController | №1033 |
| charcoal | №2296 |
| charge | №1871 (+ 2 других файлов) |
| charisma | №1869 (+ 2 других файлов) |
| checkBonus | №1875 (+ 1 других файлов) |
| checks | №1049 (+ 4 других файлов) |
| cheekbones | №1878 (+ 1 других файлов) |
| chest | №0915 (+ 5 других файлов) |
| chinLength | №1878 (+ 1 других файлов) |
| choiceHistory | №1871 (+ 2 других файлов) |
| choices | №1869 (+ 2 других файлов) |
| choiceState | №1162 (+ 3 других файлов) |
| chromiumQA | №0909 |
| ciOriginalCertificateVerified | №1179 |
| class | №1162 (+ 3 других файлов) |
| classEntries | №1048 (+ 1 других файлов) |
| classes | №1049 (+ 9 других файлов) |
| classFeaturesState | №1162 (+ 3 других файлов) |
| classId | №1162 |
| className | №1162 (+ 3 других файлов) |
| clawColor | №1878 (+ 1 других файлов) |
| clawSize | №1878 (+ 1 других файлов) |
| clay | №2296 |
| climb | №1871 (+ 2 других файлов) |
| clipboardExport | №1161 |
| closed | №1161 |
| cloth | №2296 |
| clothing | №1878 (+ 1 других файлов) |
| cloudBuildRun | №2326 |
| cloudUnityBuildLicenseConfigured | №2326 |
| coast | №1873 |
| cobbler | №1873 (+ 1 других файлов) |
| coinCases | №2243 |
| coinLog | №1161 (+ 1 других файлов) |
| coins | №1160 (+ 2 других файлов) |
| Cold | №2296 |
| coldResistance | №1871 (+ 2 других файлов) |
| color_policy | №2029 |
| combatants | №2293 |
| commit | №0090 (+ 1 других файлов) |
| common | №1873 |
| comparison | №1040 (+ 1 других файлов) |
| components | №1871 (+ 2 других файлов) |
| components_count | №2029 |
| compositeTerms | №0922 |
| compositions | №0090 (+ 1 других файлов) |
| compressedBytes | №1032 |
| ComputeShader | №1033 |
| con | №1160 (+ 3 других файлов) |
| concentration | №1871 (+ 1 других файлов) |
| conclusion | №0909 (+ 2 других файлов) |
| condition | №2296 |
| conflict | №2296 |
| conflicts | №2297 |
| connectedComponents | №0915 |
| const | №1021 |
| constitution | №1869 (+ 3 других файлов) |
| Constitution | №2296 |
| consumables | №1022 (+ 5 других файлов) |
| containerAfterMove | №1161 |
| containers | №1161 |
| content | №1179 |
| contents | №1161 |
| controlled | №0755 (+ 3 других файлов) |
| converted | №1182 |
| cook | №1873 (+ 1 других файлов) |
| copy | №2293 |
| corset | №1878 (+ 1 других файлов) |
| cost | №2243 (+ 2 других файлов) |
| costGp | №1873 (+ 1 других файлов) |
| count | №0090 (+ 13 других файлов) |
| cp | №1160 (+ 3 других файлов) |
| cPerS | №2243 |
| craft | №2296 |
| craftBonuses | №1871 (+ 1 других файлов) |
| CRC | №0909 (+ 1 других файлов) |
| createDesktopShortcut | №1235 |
| createStartMenuShortcut | №1235 |
| creation | №1871 (+ 1 других файлов) |
| creationCases | №2243 |
| crestSize | №1878 (+ 1 других файлов) |
| crownColor | №1878 (+ 1 других файлов) |
| crownSize | №1878 (+ 1 других файлов) |
| crystal | №2296 |
| csharp | №1178 (+ 5 других файлов) |
| Cubemap | №1033 |
| cupsize | №0922 |
| current | №1162 |
| currentFloor | №0755 (+ 17 других файлов) |
| customizations | №0001 (+ 2 других файлов) |
| cutoff | №0922 |
| cycle | №1094 |
| cycles | №1094 |
| d | №0755 (+ 17 других файлов) |
| damage | №1871 (+ 3 других файлов) |
| damageType | №1871 (+ 3 других файлов) |
| darkness | №0755 (+ 17 других файлов) |
| darkvisionFt | №1871 (+ 2 других файлов) |
| data | №2294 (+ 1 других файлов) |
| date | №1183 (+ 2 других файлов) |
| dc | №2296 |
| debug | №0909 |
| deception | №1871 (+ 2 других файлов) |
| declaredSourceCommit | №0922 |
| declaredUnityPackages | №1020 |
| defaultDependencyTypeInfo | №2319 |
| defaultInstantiationMode | №2319 |
| degenerateTriangles | №0915 |
| DelayedCallManager | №1033 |
| deltaBytesFrom10022 | №1178 |
| deltaBytesVs28 | №1182 |
| deltaFrom10023Bytes | №1179 |
| dependencies | №1020 (+ 6 других файлов) |
| dependencyTypeInfos | №2319 |
| depth | №1020 (+ 1 других файлов) |
| derived | №1593 |
| desc | №1160 (+ 2 других файлов) |
| description | №0755 (+ 26 других файлов) |
| destination | №1040 (+ 1 других файлов) |
| destinationGender | №0922 |
| dev | №1259 |
| devDependencies | №1235 (+ 2 других файлов) |
| device | №1049 |
| deviceQa | №1049 (+ 6 других файлов) |
| dex | №1160 (+ 3 других файлов) |
| dexterity | №1869 (+ 3 других файлов) |
| Dexterity | №2296 |
| Diabolist | №1869 |
| diceBack | №1094 |
| diceGeometryPreviewBytes | №1179 |
| diceGeometryPreviews | №1179 |
| directories | №1235 |
| disguise | №1875 |
| dotnet | №1049 |
| doubleSided | №0915 |
| dragonScale | №2296 |
| Drake-Blooded | №1869 |
| dress | №1878 (+ 1 других файлов) |
| duplicates | №1020 |
| duration | №1871 (+ 1 других файлов) |
| e | №0755 (+ 17 других файлов) |
| earLength | №1878 (+ 1 других файлов) |
| earPointiness | №1878 (+ 1 других файлов) |
| Earth | №2296 |
| earTuftSize | №1878 (+ 1 других файлов) |
| edition | №1048 (+ 1 других файлов) |
| editorMorphs | №0915 |
| effect | №2243 (+ 1 других файлов) |
| effects | №2293 (+ 1 других файлов) |
| electron | №1235 |
| electron-builder | №1235 |
| elephantEarSize | №1878 (+ 1 других файлов) |
| elephantTuskSize | №1878 (+ 1 других файлов) |
| embeddedMorphChannels | №0915 |
| emitsLight | №0761 (+ 1 других файлов) |
| enabledByDefault | №1875 |
| enclosed | №1303 |
| entries | №1048 |
| enum | №1021 |
| environment | №1197 |
| ep | №1160 (+ 2 других файлов) |
| equipment | №1878 (+ 1 других файлов) |
| equipped | №1160 (+ 2 других файлов) |
| errors | №1182 |
| eTexture | №0755 (+ 17 других файлов) |
| exact31SculpturesComplete | №1181 |
| exactSculpturesComplete | №1182 |
| existingPython | №1181 (+ 1 других файлов) |
| exit | №1197 |
| expected | №2241 (+ 3 других файлов) |
| experience | №2295 |
| experimentalTypes | №1182 |
| exportedCount | №1161 |
| exportedMacros | №0922 |
| exportedNames | №1161 |
| extensions | №0001 |
| exteriorUVFaces | №1182 |
| external | №2293 |
| externalOrPackageGuidReferences | №1020 |
| extra | №2296 |
| extraClassName | №2292 |
| extraClassType | №2292 |
| extras | №2297 |
| extraTrigger | №2296 |
| eyeColor | №1878 (+ 1 других файлов) |
| eyeGlow | №1878 (+ 1 других файлов) |
| eyeHeight | №1878 (+ 1 других файлов) |
| eyeliner | №1878 (+ 1 других файлов) |
| eyeShape | №1878 (+ 1 других файлов) |
| eyeSize | №1878 (+ 1 других файлов) |
| eyeSpacing | №1878 (+ 1 других файлов) |
| eyeTilt | №1878 (+ 1 других файлов) |
| eyeWidth | №1878 (+ 1 других файлов) |
| faceColor | №1878 (+ 1 других файлов) |
| faceLength | №1878 (+ 1 других файлов) |
| faceShape | №1878 (+ 1 других файлов) |
| faceTint | №1878 (+ 1 других файлов) |
| faceWidth | №1878 (+ 1 других файлов) |
| fail | №0909 (+ 1 других файлов) |
| fangSize | №1878 (+ 1 других файлов) |
| fat | №1878 (+ 1 других файлов) |
| fbxSha256 | №1886 |
| Fear | №2296 |
| featherTailSize | №1878 (+ 1 других файлов) |
| featherWingSize | №1878 (+ 1 других файлов) |
| feats | №1049 (+ 7 других файлов) |
| feature | №1871 (+ 1 других файлов) |
| features | №0001 (+ 5 других файлов) |
| feedActivated | №1182 |
| feedCommit | №1100 (+ 2 других файлов) |
| feedPlainAndCacheBustedVerified | №1183 |
| feet | №1878 (+ 1 других файлов) |
| femaleStackTerms | №0922 |
| feyAncestry | №1871 (+ 2 других файлов) |
| fields | №2241 |
| file | №1869 (+ 5 других файлов) |
| fileCount | №2348 |
| files | №2348 (+ 13 других файлов) |
| finSize | №1878 (+ 1 других файлов) |
| Fire | №2296 |
| fireResistance | №1871 (+ 2 других файлов) |
| firmness | №0922 |
| firstHeroNotesAfterCancel | №1161 |
| fisher | №1873 |
| fixed | №1869 |
| fixtureSha256 | №0922 (+ 1 других файлов) |
| fletcher | №1873 |
| flight | №1871 (+ 2 других файлов) |
| floor | №0755 (+ 3 других файлов) |
| floors | №0755 (+ 18 других файлов) |
| flow | №0909 |
| folder | №0090 (+ 3 других файлов) |
| folderCases | №2243 |
| folders | №1871 (+ 2 других файлов) |
| Font | №1033 |
| food | №1873 |
| forest | №1873 |
| forgery | №1875 |
| format | №1021 (+ 1 других файлов) |
| formula | №2296 |
| frames | №1197 |
| full6d20 | №1182 |
| fullSoftBodyComplete | №1182 |
| furAmount | №1878 (+ 1 других файлов) |
| furColor | №1878 (+ 1 других файлов) |
| furDensity | №1878 (+ 1 других файлов) |
| furLength | №1878 (+ 1 других файлов) |
| furProfile | №1878 (+ 1 других файлов) |
| GameObject | №1033 |
| gem | №2296 |
| gemcutter | №1873 |
| gender | №0922 (+ 5 других файлов) |
| general | №1873 |
| generalstore | №1873 |
| generated | №2348 (+ 3 других файлов) |
| ghostChainSize | №1878 (+ 1 других файлов) |
| ghostOpacity | №1878 (+ 1 других файлов) |
| ghostTerror | №1878 (+ 1 других файлов) |
| ghostWeapon | №1878 (+ 1 других файлов) |
| gitBlob | №0926 |
| glass | №1873 (+ 1 других файлов) |
| glassblower | №1873 (+ 1 других файлов) |
| glasswork | №2296 |
| glide | №1871 (+ 2 других файлов) |
| gliderMembraneSize | №1878 (+ 1 других файлов) |
| Godsworn | №1869 |
| gooSize | №1878 (+ 1 других файлов) |
| gp | №1160 (+ 2 других файлов) |
| gPerE | №2243 |
| grandHexes | №1869 |
| GraphicsSettings | №1033 |
| grayColor | №1878 (+ 1 других файлов) |
| grayPercent | №1878 (+ 1 других файлов) |
| groupKey | №2243 (+ 1 других файлов) |
| h | №0755 (+ 17 других файлов) |
| hair | №1878 (+ 1 других файлов) |
| hairColor | №1878 (+ 1 других файлов) |
| Hallucination | №2296 |
| hands | №1878 (+ 3 других файлов) |
| hardwood | №2296 |
| head | №0090 (+ 4 других файлов) |
| head-decr | №0090 (+ 1 других файлов) |
| head-incr | №0090 (+ 1 других файлов) |
| height | №0755 (+ 23 других файлов) |
| Hemorrhage | №2296 |
| herb | №2296 |
| herbalism | №1873 (+ 1 других файлов) |
| herbalist | №1873 |
| hero | №2243 |
| hexes | №1869 |
| highlands | №1873 |
| highlightColor | №1878 (+ 1 других файлов) |
| highlightPercent | №1878 (+ 1 других файлов) |
| hips | №0915 (+ 5 других файлов) |
| history | №1871 (+ 2 других файлов) |
| hitDice | №1871 (+ 2 других файлов) |
| hitDie | №1869 (+ 2 других файлов) |
| homebrew | №1875 |
| hoofColor | №1878 (+ 1 других файлов) |
| hoofSize | №1878 (+ 1 других файлов) |
| hornColor | №1878 (+ 1 других файлов) |
| hornRidges | №1878 (+ 1 других файлов) |
| horns | №1871 (+ 2 других файлов) |
| hornSize | №1878 (+ 1 других файлов) |
| hornStyle | №1878 (+ 1 других файлов) |
| hornThickness | №1878 (+ 1 других файлов) |
| horseColor | №1878 (+ 1 других файлов) |
| hosieryDen | №1878 (+ 1 других файлов) |
| hpBonusPerLevel | №1871 (+ 1 других файлов) |
| hpCurrent | №1160 (+ 3 других файлов) |
| hpMax | №1160 (+ 3 других файлов) |
| human-female | №1502 |
| hunter | №1873 |
| ice | №1182 |
| icon | №1875 (+ 1 других файлов) |
| id | №0755 (+ 46 других файлов) |
| identity | №2293 |
| ids | №2297 |
| if | №1021 |
| image | №0001 |
| immunities | №1871 (+ 2 других файлов) |
| incomingUnityReferences | №1020 |
| independentPublicVerification | №1179 |
| indexComponentType | №0915 |
| indomitable | №1869 |
| ingredients | №1022 (+ 2 других файлов) |
| initiativeTracker | №2293 |
| ink | №2296 |
| innateSpellcasting | №1871 (+ 2 других файлов) |
| input | №2243 (+ 1 других файлов) |
| InputManager | №1033 |
| insight | №1871 (+ 2 других файлов) |
| installers | №1183 |
| installUpgradeReinstall | №1178 |
| int | №1160 (+ 3 других файлов) |
| integrity | №1259 |
| intelligence | №1869 (+ 3 других файлов) |
| intelligence_or_charisma | №2292 |
| intelligenceOrWisdomOrCharisma | №1869 |
| intensity | №0755 (+ 17 других файлов) |
| interactive | №0761 (+ 1 других файлов) |
| interactiveDesktopVerified | №1182 |
| interactiveWindowsGpu | №1183 |
| intimidation | №1162 (+ 3 других файлов) |
| inventory | №1160 (+ 2 других файлов) |
| inventoryCases | №2243 |
| inventoryCategory | №1160 (+ 3 других файлов) |
| investigation | №2243 |
| Invisibility | №2296 |
| iron | №2296 |
| isExtra | №2292 |
| isExtraClass | №2292 |
| item | №2243 (+ 1 других файлов) |
| itemId | №2295 |
| items | №1021 (+ 4 других файлов) |
| jawProjection | №1878 (+ 1 других файлов) |
| jawWidth | №1878 (+ 1 других файлов) |
| jeweler | №1873 (+ 2 других файлов) |
| job | №1094 (+ 2 других файлов) |
| jobId | №1031 |
| jobs | №1180 (+ 2 других файлов) |
| joints | №0922 (+ 2 других файлов) |
| JOINTS_0 | №0915 |
| junk | №1022 (+ 6 других файлов) |
| keep | №2243 |
| key | №1518 (+ 3 других файлов) |
| kind | №2348 (+ 2 других файлов) |
| kiPoints | №1869 (+ 1 других файлов) |
| kit | №2029 |
| known | №2293 |
| knownByDefault | №2295 |
| label | №1869 (+ 4 других файлов) |
| languages | №1871 (+ 1 других файлов) |
| larvaGirth | №1878 (+ 1 других файлов) |
| larvaLength | №1878 (+ 1 других файлов) |
| larvaTendrilSize | №1878 (+ 1 других файлов) |
| larvaToothSize | №1878 (+ 1 других файлов) |
| leather | №1873 (+ 1 других файлов) |
| leatherwork | №2296 |
| leatherworker | №1873 (+ 1 других файлов) |
| left | №2029 |
| legacy | №0909 (+ 1 других файлов) |
| legacyApkInput | №1020 |
| legacyBinaryPublication | №1048 |
| legacyGlyphControls | №1183 |
| legacyNumeralControls | №1182 |
| legacyPayloadsPreserved | №1183 |
| legLength | №0090 (+ 4 других файлов) |
| legLength-decr | №0090 (+ 1 других файлов) |
| legLength-incr | №0090 (+ 1 других файлов) |
| legs | №0090 (+ 4 других файлов) |
| level | №1160 (+ 7 других файлов) |
| levelOneFeatures | №1871 (+ 1 других файлов) |
| levels | №1869 (+ 2 других файлов) |
| library | №0755 (+ 16 других файлов) |
| license | №0090 (+ 8 других файлов) |
| licenseReview | №1020 |
| licenseSha256 | №1040 |
| Light | №1033 |
| lighting | №0755 (+ 17 других файлов) |
| lightIntensity | №0761 (+ 1 других файлов) |
| LightmapSettings | №1033 |
| lightRadius | №0761 (+ 1 других файлов) |
| limbProfile | №1878 (+ 1 других файлов) |
| limitations | №0090 (+ 6 других файлов) |
| lipColor | №1878 (+ 1 других файлов) |
| lipOpacity | №1878 (+ 1 других файлов) |
| lipVolume | №1878 (+ 1 других файлов) |
| liveBodyBudget | №1183 |
| liveSupabase | №1178 (+ 2 других файлов) |
| liveSupabaseTested | №1179 |
| liveSupabaseVerified | №1181 (+ 1 других файлов) |
| localFilesystemPackageUpgrade | №1182 |
| localRuntimeTests | №0924 |
| lockfileVersion | №1259 |
| logicalPhysXThrows | №1183 |
| loot | №0755 (+ 1 других файлов) |
| lucky | №1871 (+ 2 других файлов) |
| luxury | №1873 |
| macroConfigSha256 | №0922 |
| Magic | №2296 |
| magicCases | №2241 |
| magicResistance | №1871 (+ 2 других файлов) |
| main | №1020 (+ 1 других файлов) |
| manifest | №0909 (+ 3 других файлов) |
| manifestNormalAndCacheBusted | №1100 (+ 2 других файлов) |
| mapId | №0755 (+ 13 других файлов) |
| maps | №1593 |
| markers | №1031 (+ 1 других файлов) |
| mason | №1873 (+ 1 других файлов) |
| matchesInApk | №1029 |
| material | №1871 (+ 1 других файлов) |
| Material | №1033 |
| materialPackBytes | №1181 |
| materialPacks | №1181 |
| materials | №0915 (+ 8 других файлов) |
| maxCapacityKg | №2243 |
| maxCoordinateRoundTripError | №1886 |
| maxCR | №1869 |
| maxDisplacementMeters | №0922 (+ 1 других файлов) |
| maximum | №1021 |
| maxItems | №1021 |
| maxMeanAbsoluteChannelDifference | №1083 |
| measure-thigh-circ-decr | №0090 (+ 1 других файлов) |
| measure-thigh-circ-incr | №0090 (+ 1 других файлов) |
| measure-upperarm-circ-decr | №0090 (+ 1 других файлов) |
| measure-upperarm-circ-incr | №0090 (+ 1 других файлов) |
| measurementsArtifact | №1031 |
| medicine | №2243 |
| mentalShield | №1871 (+ 2 других файлов) |
| mergeAfterSecondAdd | №1161 |
| Mesh | №1033 |
| meshes | №1230 |
| MeshFilter | №1033 |
| meshMetadata | №0915 |
| MeshRenderer | №1033 |
| metal | №1873 |
| metallicFactor | №0915 |
| method | №0090 (+ 1 других файлов) |
| MhObjectType | №0915 |
| MhScaleFactor | №0915 |
| migrationStatus | №1020 |
| mimicry | №1871 (+ 2 других файлов) |
| min | №1871 |
| minAndroidSdk | №1183 |
| minAppVersion | №2341 (+ 2 других файлов) |
| minClientVersionCode | №1022 |
| Mind | №2296 |
| miner | №1873 |
| minimalContentVerified | №1049 (+ 4 других файлов) |
| minimum | №1021 |
| minLength | №1021 |
| minStr | №2243 (+ 1 других файлов) |
| mithral | №2296 |
| mode | №1875 (+ 2 других файлов) |
| model | №0755 (+ 18 других файлов) |
| modelFamily | №1878 (+ 1 других файлов) |
| models | №1518 (+ 1 других файлов) |
| modifiers | №2243 |
| MonoBehaviour | №1033 |
| MonoManager | №1033 |
| MonoScript | №1033 |
| monsterparts | №1873 |
| morphNames | №0915 (+ 1 других файлов) |
| moustache | №1878 (+ 1 других файлов) |
| mouthWidth | №1878 (+ 1 других файлов) |
| MPFB_GEN_object_type | №0915 |
| MPFB_GEN_scale_factor | №0915 |
| MPFB_HUM_african | №0915 |
| MPFB_HUM_age | №0915 |
| MPFB_HUM_asian | №0915 |
| MPFB_HUM_caucasian | №0915 |
| MPFB_HUM_cupsize | №0915 |
| MPFB_HUM_firmness | №0915 |
| MPFB_HUM_gender | №0915 |
| MPFB_HUM_height | №0915 |
| MPFB_HUM_is_human_project | №0915 |
| MPFB_HUM_material_source | №0915 |
| MPFB_HUM_muscle | №0915 |
| MPFB_HUM_proportions | №0915 |
| MPFB_HUM_weight | №0915 |
| multiclass | №1869 |
| multiclassAllowed | №1869 (+ 1 других файлов) |
| muscle | №0922 (+ 2 других файлов) |
| muzzleHeight | №1878 (+ 1 других файлов) |
| muzzleLength | №1878 (+ 1 других файлов) |
| muzzleWidth | №1878 (+ 1 других файлов) |
| n | №0755 (+ 17 других файлов) |
| name | №0001 (+ 49 других файлов) |
| nameRu | №1871 (+ 1 других файлов) |
| native | №1032 |
| nativeAndroidFaceOrientations | №1179 |
| nativeAndroidJobId | №1100 (+ 1 других файлов) |
| nativeAndroidMixedLogicalDice | №1179 |
| nativeAndroidPhysicalThrows | №1179 |
| nativeCommerce | №1049 |
| nativeComposerBothTargets | №1180 |
| nativeEditorPerTarget | №1182 |
| nativeFaceOrientationsEach | №1180 |
| nativeFaceOrientationsPerTarget | №1178 |
| nativeLibraries | №1045 |
| nativePerTarget | №1181 (+ 1 других файлов) |
| nativePhysicalThrowsEach | №1180 |
| nativePngBytes | №1181 |
| nativePngCount | №1181 |
| nativeReplayJobId | №1095 |
| nativeReplayRunId | №1095 |
| nativeSource | №1083 |
| nativeUiJobId | №1102 |
| nativeUiStatus | №1102 |
| nativeWindowsBuildJobId | №1102 |
| nativeWindowsFaceOrientations | №1179 |
| nativeWindowsMixedLogicalDice | №1179 |
| nativeWindowsPhysicalThrows | №1179 |
| naturalArmor | №1871 (+ 2 других файлов) |
| nature | №2243 |
| Nausea | №2296 |
| NavMeshProjectSettings | №1033 |
| NavMeshSettings | №1033 |
| neck | №1878 (+ 1 других файлов) |
| Necrotic | №2296 |
| necroticResistance | №1871 (+ 2 других файлов) |
| negative | №0090 (+ 4 других файлов) |
| newPackages | №1022 |
| newSceneOverride | №2319 |
| nextAction | №0926 |
| Nightgaunt | №1869 |
| nimbleEscape | №1871 (+ 2 других файлов) |
| nine_slice | №2029 |
| nine_slice_units | №2029 |
| noBreath | №1871 (+ 2 других файлов) |
| nonFiniteValues | №0915 |
| normal | №2241 |
| NORMAL | №0915 |
| noseLength | №1878 (+ 1 других файлов) |
| noseWidth | №1878 (+ 1 других файлов) |
| noSleep | №1871 (+ 2 других файлов) |
| note | №1019 (+ 11 других файлов) |
| noteCase | №2243 |
| notes | №1161 (+ 4 других файлов) |
| nsis | №1235 |
| nTexture | №0755 (+ 17 других файлов) |
| numeralPixelControls | №1181 |
| objects | №0755 (+ 18 других файлов) |
| offset | №0090 (+ 2 других файлов) |
| oldApk | №1038 |
| oldUnity10005ApkBytes | №1049 (+ 5 других файлов) |
| omittedNonRenderingPngBytes | №1049 (+ 2 других файлов) |
| oneClick | №1235 |
| opaqueShellControls | №1182 (+ 1 других файлов) |
| optionalMaterialMatches | №1045 |
| optionalTextureMatches | №1045 |
| options | №1871 (+ 1 других файлов) |
| Oracle | №1869 |
| origin | №1871 (+ 2 других файлов) |
| originalBrandingBytesVerified | №1049 (+ 5 других файлов) |
| originalBrandingPixelsVerified | №1049 (+ 2 других файлов) |
| originalBytes | №1038 |
| originalsDeleted | №1048 |
| originalSigningCertificate | №1100 (+ 2 других файлов) |
| ota_install_contract | №0911 |
| other | №2293 |
| outer | №1878 (+ 1 других файлов) |
| output | №1235 |
| ownerId | №2293 |
| ownTurnId | №2293 |
| package | №1031 (+ 5 других файлов) |
| packagedBytes | №1035 |
| packagedSha256 | №1035 |
| packages | №1011 (+ 3 других файлов) |
| packageVersion | №1100 (+ 2 других файлов) |
| packBytes | №1182 |
| packedBytes | №1047 |
| packs | №1029 (+ 1 других файлов) |
| packTactics | №1871 (+ 2 других файлов) |
| packVersion | №1182 |
| pact | №1869 (+ 1 других файлов) |
| pages | №0926 |
| paid_api_authorized | №0002 |
| painter | №1873 (+ 1 других файлов) |
| paper | №2296 |
| parchment | №2296 |
| parts | №1241 |
| pass | №0909 (+ 1 других файлов) |
| path | №2348 (+ 9 других файлов) |
| pathId | №1033 (+ 2 других файлов) |
| paths | №1020 |
| pattern | №1021 |
| pawPadColor | №1878 (+ 1 других файлов) |
| pbrMetallicRoughness | №0915 |
| pectorals | №0090 (+ 4 других файлов) |
| pendingChoices | №1162 (+ 3 других файлов) |
| perception | №1871 (+ 2 других файлов) |
| Perception | №2296 |
| performance | №1871 (+ 2 других файлов) |
| perMachine | №1235 |
| persuasion | №1871 (+ 2 других файлов) |
| Petrification | №2296 |
| physical_android_test | №0911 |
| physicalAndroid | №1102 (+ 4 других файлов) |
| physicalAndroidQa | №2326 |
| physicalAndroidQA | №0909 (+ 3 других файлов) |
| physicalDeviceTested | №1179 |
| physicalPhoneTouch | №1180 |
| physicalPhoneVerified | №1181 (+ 1 других файлов) |
| physicalZIP | №0909 |
| Physics2DSettings | №1033 |
| PhysicsManager | №1033 |
| physxThrows | №1181 (+ 1 других файлов) |
| pickLevel | №1869 |
| pixels | №0915 |
| pixelsIdentical | №1035 |
| plainAndCacheBustedPublicFeedVerified | №1179 |
| plainFeedVersionCode | №1180 |
| plateColor | №1878 (+ 1 других файлов) |
| plateSize | №1878 (+ 1 других файлов) |
| platform | №1021 (+ 1 других файлов) |
| PlayerSettings | №1033 |
| poisoner | №1873 |
| poisonImmunity | №1871 (+ 2 других файлов) |
| poisonResistance | №1871 (+ 2 других файлов) |
| portable | №1235 |
| pose | №1878 (+ 1 других файлов) |
| POSITION | №0915 |
| positive | №0090 (+ 4 других файлов) |
| postCreateCommand | №0001 |
| postRestChangedPixels | №1182 |
| potency | №2296 (+ 1 других файлов) |
| potter | №1873 (+ 1 других файлов) |
| pottery | №2296 |
| powerfulBuild | №1871 (+ 2 других файлов) |
| pp | №1160 (+ 2 других файлов) |
| pPerG | №2243 |
| PreloadData | №1033 |
| prepared | №1160 |
| prerequisite | №1871 |
| preset | №1878 (+ 1 других файлов) |
| presetId | №1878 (+ 1 других файлов) |
| previewJob | №1182 |
| previewPhysicsRenderPoses | №1178 |
| previewRun | №1179 (+ 1 других файлов) |
| previews | №1183 |
| previous10007Bytes | №1030 |
| previous10008Bytes | №1034 |
| previous75PreviewHashesUnchanged | №1179 |
| previousAutomaticBackup | №1162 |
| previousUnity10010ApkBytes | №1049 |
| price | №2296 |
| primaryLicenseUrls | №1040 |
| primitives | №0915 |
| private | №1235 (+ 1 других файлов) |
| producerRun | №1182 (+ 1 других файлов) |
| productionBinaryUnchanged | №1094 |
| productionSyntaxFiles | №0909 (+ 1 других файлов) |
| productName | №1235 |
| profBonus | №1162 (+ 3 других файлов) |
| profession | №1871 (+ 2 других файлов) |
| professionId | №2295 |
| professions | №1875 (+ 1 других файлов) |
| proficiencies | №1162 (+ 4 других файлов) |
| proficiency | №2243 |
| proficiencyBonus | №1869 |
| proficiencyType | №2243 (+ 1 других файлов) |
| profileBackupAndUnknownFilePreserved | №1178 |
| profileNames | №1161 |
| profiles | №2297 |
| profileSha256 | №1094 |
| profileUnchanged | №1094 |
| progression | №1875 (+ 1 других файлов) |
| project | №0090 (+ 1 других файлов) |
| pronounced | №1303 |
| properties | №1021 (+ 3 других файлов) |
| proportions | №0922 |
| propTextureCount | №1049 (+ 5 других файлов) |
| propTextureDimensions | №1049 (+ 5 других файлов) |
| pseudopodSize | №1878 (+ 1 других файлов) |
| psychicResistance | №1871 (+ 2 других файлов) |
| publicApkSignature | №1183 |
| publicApkV2V3SignatureVerified | №1178 |
| publication | №0909 (+ 4 других файлов) |
| publicDownloadsVerified | №1178 |
| publicFeedVerified | №1178 |
| publicGeometryPreviewShaAndDecodeVerified | №1179 |
| publicNativePngBytes | №1182 |
| publicNativePngCount | №1182 |
| publicPackageBytes | №1049 |
| publicPackages | №1049 |
| publicPreviewBytes | №1182 |
| publicPreviewJpegBytes | №1181 |
| publicPreviewJpegCount | №1181 |
| publicPreviewJpegs | №1182 |
| publicRecipeShaVerified | №1179 |
| publicVerification | №1180 |
| publishedCopy | №1020 |
| publisherConclusion | №1180 |
| publisherJob | №1180 (+ 2 других файлов) |
| publisherJobId | №1100 (+ 2 других файлов) |
| publisherRun | №1180 (+ 3 других файлов) |
| publisherRunId | №1100 (+ 2 других файлов) |
| publishRunId | №1178 |
| pupilOpacity | №1878 (+ 1 других файлов) |
| pupilShape | №1878 (+ 1 других файлов) |
| purity | №2296 (+ 1 других файлов) |
| python | №1049 (+ 2 других файлов) |
| pythonUnit | №1178 (+ 1 других файлов) |
| qaJobId | №1083 |
| qty | №1873 (+ 1 других файлов) |
| qualityBonus | №1875 |
| QualitySettings | №1033 |
| quantity | №2296 |
| quota_scope | №0002 |
| rabbitEarSize | №1878 (+ 1 других файлов) |
| rabbitTailSize | №1878 (+ 1 других файлов) |
| race | №0922 |
| raceCraftBonuses | №1871 (+ 1 других файлов) |
| raceEntries | №1048 (+ 1 других файлов) |
| raceFamilies | №1048 (+ 1 других файлов) |
| raceFeatureDescriptions | №1871 (+ 2 других файлов) |
| raceHpBonusPerLevel | №1871 (+ 1 других файлов) |
| raceId | №1162 (+ 5 других файлов) |
| raceMechanics | №1871 (+ 2 других файлов) |
| raceName | №1162 (+ 3 других файлов) |
| races | №1049 (+ 5 других файлов) |
| Radiant | №2296 |
| radiantResistance | №1871 (+ 2 других файлов) |
| radius | №0755 (+ 17 других файлов) |
| rageDamageBonus | №1869 (+ 1 других файлов) |
| ragesCount | №1869 (+ 1 других файлов) |
| range | №1871 (+ 1 других файлов) |
| rarity | №2243 (+ 2 других файлов) |
| rates | №2243 |
| rawArtwork | №1045 |
| rawBounds | №0915 |
| rawBranding | №1032 |
| reason | №1182 (+ 1 других файлов) |
| recipeBytes | №1179 |
| recipeCommit | №1179 |
| recipes | №1022 (+ 3 других файлов) |
| recommendedSourceCommit | №0922 |
| Recovery | №2296 |
| RectTransform | №1033 |
| reductionBytes | №1049 (+ 5 других файлов) |
| reductionPercent | №1049 (+ 5 других файлов) |
| reductionVs10007Bytes | №1030 |
| reductionVs10008Bytes | №1034 |
| reference_commit | №2029 |
| referenceCommit | №1040 |
| referencePath | №1040 |
| referenceRepository | №1040 |
| referenceSha256 | №1040 |
| Regeneration | №2296 |
| region | №2298 |
| regions | №1873 |
| regression | №0909 (+ 1 других файлов) |
| rejectedCandidate | №1182 |
| rejectedCandidate31NeverActivated | №1183 |
| release | №0924 (+ 1 других файлов) |
| release_ready | №0002 |
| release_reason | №0002 |
| release_source_sha | №0002 |
| releaseCommit | №0909 (+ 1 других файлов) |
| releases | №1866 (+ 1 других файлов) |
| releaseType | №1239 |
| releaseUrl | №1039 (+ 2 других файлов) |
| relentlessEndurance | №1871 (+ 2 других файлов) |
| relic | №1873 |
| relicdealer | №1873 |
| religion | №1871 (+ 2 других файлов) |
| removed | №2243 |
| renderBytes | №1183 |
| renderCount | №1183 |
| renderIndexSha256 | №1181 (+ 2 других файлов) |
| renderReviewBoundary | №1181 (+ 2 других файлов) |
| RenderSettings | №1033 |
| repairable | №1871 (+ 2 других файлов) |
| replacesRace | №2292 |
| repository | №1179 |
| reptileProfile | №1878 (+ 1 других файлов) |
| required | №1021 |
| required_editor_assets | №0911 |
| requiredAssets | №0755 (+ 13 других файлов) |
| requirements | №1869 |
| requireRenderReview | №1240 |
| requires | №1259 |
| resin | №2296 |
| resistanceDamageType | №1871 (+ 1 других файлов) |
| resistances | №1871 (+ 2 других файлов) |
| resolved | №1259 |
| resolvedUnityPackages | №1020 |
| ResourceManager | №1033 |
| resources | №1029 (+ 2 других файлов) |
| result | №1083 |
| resultCp | №1161 (+ 1 других файлов) |
| resultEp | №1161 (+ 1 других файлов) |
| resultGp | №1161 (+ 1 других файлов) |
| resultPp | №1161 (+ 1 других файлов) |
| results | №2295 |
| resultSp | №1161 (+ 1 других файлов) |
| retainedChunks | №1035 |
| retry_after | №0002 |
| review | №1182 |
| ridgeColor | №1878 (+ 1 других файлов) |
| ridgeStyle | №1878 (+ 1 других файлов) |
| right | №2029 |
| Rimekeeper | №1869 |
| risk | №2297 |
| rites | №1869 |
| ritual | №1871 (+ 1 других файлов) |
| rmsDisplacementMeters | №0922 (+ 1 других файлов) |
| rootCause | №0909 |
| rope | №1873 |
| rotation | №0756 (+ 11 других файлов) |
| roughnessFactor | №0915 |
| roundEarSize | №1878 (+ 1 других файлов) |
| ruins | №1873 |
| rulesets | №2295 |
| run | №1179 (+ 1 других файлов) |
| runId | №1049 (+ 5 других файлов) |
| runtime | №0922 (+ 1 других файлов) |
| RuntimeInitializeOnLoadManager | №1033 |
| runtimeKey | №1869 |
| runtimeOTARegression | №0909 |
| runtimeStatus | №1039 |
| s | №0755 (+ 15 других файлов) |
| sameProcess | №1094 |
| sameTreeDuplicates | №1020 |
| savageAttacks | №1871 (+ 2 других файлов) |
| savedBytes | №1035 |
| savesData | №1871 (+ 2 других файлов) |
| savingThrow | №1871 (+ 1 других файлов) |
| scale | №0090 (+ 20 других файлов) |
| schema | №0090 (+ 13 других файлов) |
| schemaVersion | №0755 (+ 20 других файлов) |
| school | №1871 (+ 1 других файлов) |
| scope | №1239 (+ 1 других файлов) |
| scribe | №1873 (+ 1 других файлов) |
| ScriptMapper | №1033 |
| scripts | №1235 (+ 1 других файлов) |
| scrollmerchant | №1873 |
| scrolls | №1873 |
| seamDuplicates | №0915 |
| seamMaxMeters | №0922 (+ 1 других файлов) |
| searchable | №0755 (+ 11 других файлов) |
| secondHeroNotes | №1161 |
| seconds | №0909 (+ 1 других файлов) |
| seed | №1871 (+ 1 других файлов) |
| selectedHero | №1161 |
| selectedTexture | №0755 (+ 17 других файлов) |
| selectedTool | №0755 (+ 17 других файлов) |
| selectedWallTexture | №0755 (+ 17 других файлов) |
| self | №2293 |
| sellFactor | №1873 |
| serializedBytes | №1033 (+ 2 других файлов) |
| sets | №1179 |
| settings | №0001 |
| settled12Frames | №1182 |
| sha | №1241 |
| sha256 | №2348 (+ 33 других файлов) |
| Shader | №1033 |
| shadowColor | №1878 (+ 1 других файлов) |
| shadowOpacity | №1878 (+ 1 других файлов) |
| Shaman | №1869 |
| shapeFamilies | №1179 |
| shapeshifter | №1871 (+ 2 других файлов) |
| sharedProperties | №2297 |
| shellColor | №1878 (+ 1 других файлов) |
| shellSize | №1878 (+ 1 других файлов) |
| shipchandler | №1873 |
| shippedSha256 | №0922 (+ 1 других файлов) |
| shoulders | №0915 (+ 5 других файлов) |
| showAbove | №0755 (+ 1 других файлов) |
| showBelow | №0755 (+ 1 других файлов) |
| showCeilings | №0755 (+ 1 других файлов) |
| showEp | №2243 |
| showPp | №2243 |
| siege | №1873 |
| signature | №1100 (+ 2 других файлов) |
| signatureSchemes | №1179 |
| signatureV2 | №1181 (+ 1 других файлов) |
| signatureV3 | №1181 (+ 1 других файлов) |
| signatureVerification | №1038 |
| signedRelease | №0909 |
| signingCertificateSha256 | №1178 (+ 1 других файлов) |
| silver | №2296 |
| size | №1871 (+ 2 других файлов) |
| sizeChoice | №1871 (+ 2 других файлов) |
| skillBonuses | №1871 (+ 2 других файлов) |
| skills | №1871 (+ 2 других файлов) |
| skillsData | №1162 (+ 3 других файлов) |
| skinDetail | №1878 (+ 1 других файлов) |
| skinGlow | №1878 (+ 1 других файлов) |
| skinId | №1878 (+ 1 других файлов) |
| skins | №0915 |
| skinSurface | №1878 (+ 1 других файлов) |
| sky | №0756 (+ 9 других файлов) |
| slash | №0759 (+ 1 других файлов) |
| slashTexture | №0759 (+ 1 других файлов) |
| Sleep | №2296 |
| sleightOfHand | №1871 (+ 2 других файлов) |
| slime | №1182 |
| slots | №1869 |
| smith | №1873 (+ 2 других файлов) |
| sneakAttackDice | №1869 (+ 1 других файлов) |
| socks | №1878 (+ 1 других файлов) |
| softBodySolver | №1183 |
| somatic | №1871 (+ 1 других файлов) |
| sorceryPoints | №1869 (+ 1 других файлов) |
| source | №0090 (+ 21 других файлов) |
| sourceByteEquality | №1038 |
| sourceBytes | №1035 (+ 1 других файлов) |
| sourceCodeNeverDownloaded | №1022 |
| sourceCommit | №1049 (+ 12 других файлов) |
| sourceContracts | №1183 |
| sourceFileCount | №1039 |
| sourceGlbSha256 | №0922 (+ 1 других файлов) |
| sourceHashes | №0090 (+ 2 других файлов) |
| sourceId | №2293 |
| sourcePixelsModified | №1018 |
| sourceProject | №0922 |
| sourceRefs | №1020 |
| sourceRelease | №1038 |
| sources | №0922 (+ 7 других файлов) |
| sourceSha | №1179 |
| sourceSha256 | №0922 (+ 4 других файлов) |
| sourceSparseSha256 | №1886 |
| sourceStackTerms | №0922 |
| sp | №1160 (+ 2 других файлов) |
| special | №2296 |
| speed | №1871 (+ 2 других файлов) |
| Speed | №2296 |
| speedFt | №1871 (+ 2 других файлов) |
| spellAbility | №1869 |
| spells | №1869 (+ 2 других файлов) |
| spellsData | №1160 (+ 3 других файлов) |
| spellSlotsData | №1871 (+ 2 других файлов) |
| spellStat | №1160 |
| sPerG | №2243 |
| spiderClimb | №1871 (+ 2 других файлов) |
| Sprite | №1033 |
| sqlWasm | №1178 (+ 5 других файлов) |
| stability | №2296 (+ 1 других файлов) |
| Stability | №2296 |
| stable | №1873 |
| stablemaster | №1873 |
| stableVersion | №0909 (+ 1 других файлов) |
| stacked | №2243 |
| stage | №0924 |
| stairDirection | №0755 (+ 3 других файлов) |
| stairFrom | №0755 (+ 3 других файлов) |
| stairsTo | №0756 (+ 5 других файлов) |
| stairTo | №0755 (+ 3 других файлов) |
| standaloneBack | №1094 |
| stat | №1871 (+ 2 других файлов) |
| statBonus | №1871 |
| statGenerationMode | №1871 (+ 2 других файлов) |
| statRollsUsed | №1871 (+ 2 других файлов) |
| stats | №1160 (+ 3 других файлов) |
| status | №0909 (+ 13 других файлов) |
| stealth | №1871 (+ 2 других файлов) |
| stealthDisadvantage | №2243 (+ 1 других файлов) |
| steel | №2296 |
| steps | №0755 (+ 3 других файлов) |
| sTexture | №0755 (+ 15 других файлов) |
| stock | №1873 |
| stone | №1182 (+ 1 других файлов) |
| stonecutter | №1873 |
| stoneEndurance | №1871 (+ 2 других файлов) |
| str | №1160 (+ 3 других файлов) |
| StreamingManager | №1033 |
| strength | №1869 (+ 3 других файлов) |
| Strength | №2296 |
| strengthOrDexterity | №1869 |
| strictBodyAndNumeralRaster | №1178 |
| subclass | №1162 (+ 5 других файлов) |
| subclasses | №1869 |
| subclassLevel | №1869 |
| sunlightSensitivity | №1871 (+ 2 других файлов) |
| survival | №1871 (+ 2 других файлов) |
| swamp | №1873 |
| swarmForm | №1878 (+ 1 других файлов) |
| swarmPercent | №1878 (+ 1 других файлов) |
| swim | №1871 (+ 2 других файлов) |
| synergies | №2297 |
| synergy | №2296 |
| syntheticSensorLifecycle | №1183 |
| T_Trim_Cloth_BaseColor | №1026 (+ 1 других файлов) |
| T_Trim_Cloth_Normal | №1026 (+ 1 других файлов) |
| T_Trim_Cloth_ORM | №1026 (+ 1 других файлов) |
| T_Trim_Furniture_BaseColor | №1026 (+ 1 других файлов) |
| T_Trim_Furniture_Normal | №1026 (+ 1 других файлов) |
| T_Trim_Furniture_ORM | №1026 (+ 1 других файлов) |
| T_Trim_Metal_BaseColor | №1026 (+ 1 других файлов) |
| T_Trim_Metal_Normal | №1026 (+ 1 других файлов) |
| T_Trim_Metal_ORM | №1026 (+ 1 других файлов) |
| T_Trim_Props_BaseColor | №1026 (+ 1 других файлов) |
| T_Trim_Props_Normal | №1026 (+ 1 других файлов) |
| T_Trim_Props_ORM | №1026 (+ 1 других файлов) |
| tag | №1040 |
| TagManager | №1033 |
| tags | №0755 (+ 16 других файлов) |
| tailColor | №1878 (+ 1 других файлов) |
| tailCurve | №1878 (+ 1 других файлов) |
| tailLength | №1878 (+ 1 других файлов) |
| tailThickness | №1878 (+ 1 других файлов) |
| tailTip | №1878 (+ 1 других файлов) |
| tailTuftSize | №1878 (+ 1 других файлов) |
| target | №1235 (+ 1 других файлов) |
| targetId | №2293 |
| targets | №0090 (+ 4 других файлов) |
| targetsTested | №1178 |
| tarotDamageTotals | №2293 |
| tarotKnowledge | №2293 |
| tarotLastStartedTurn | №2293 |
| telepathy | №1871 (+ 2 других файлов) |
| templatePinStates | №2319 |
| temple | №1873 |
| test | №1260 |
| testApkArtifact | №1049 |
| tests | №1179 (+ 1 других файлов) |
| TEXCOORD_0 | №0915 |
| text | №1161 (+ 2 других файлов) |
| TextAsset | №1033 |
| Texture2D | №1033 |
| textureFormat | №1033 (+ 2 других файлов) |
| textures | №1593 |
| themes | №1179 |
| then | №1021 |
| thread | №2296 |
| thresholds | №1875 (+ 1 других файлов) |
| tiles | №0755 (+ 18 других файлов) |
| time | №1161 (+ 4 других файлов) |
| timeHours | №2295 |
| TimeManager | №1033 |
| tinker | №1873 (+ 1 других файлов) |
| title | №1021 (+ 3 других файлов) |
| toHit | №2243 (+ 1 других файлов) |
| tokenArt | №2292 |
| tokenReady | №2292 |
| tokens | №0755 (+ 18 других файлов) |
| toolAliases | №2296 |
| toolItems | №2295 |
| toolLabels | №1875 (+ 1 других файлов) |
| toolProficiencies | №1871 (+ 1 других файлов) |
| tools | №1875 (+ 2 других файлов) |
| top | №1878 (+ 2 других файлов) |
| topology | №0915 (+ 2 других файлов) |
| topologyFaceCases | №1183 |
| torso-muscle-pectoral-decr | №0090 (+ 1 других файлов) |
| torso-muscle-pectoral-incr | №0090 (+ 1 других файлов) |
| torsoRidgeSize | №1878 (+ 1 других файлов) |
| torsoRidgeWidth | №1878 (+ 1 других файлов) |
| totals | №2243 |
| totalWeightKg | №2243 |
| touched | №1182 |
| trader | №2298 |
| traders | №1873 |
| Transform | №1033 |
| trayRecipes | №1183 |
| triangles | №0915 (+ 1 других файлов) |
| trunk | №1871 (+ 2 других файлов) |
| trunkSize | №1878 (+ 1 других файлов) |
| turnIds | №2293 |
| tuskSize | №1878 (+ 1 других файлов) |
| type | №0755 (+ 33 других файлов) |
| typeCounts | №1033 |
| typeKey | №2243 (+ 1 других файлов) |
| unchanged | №0922 (+ 1 других файлов) |
| undeadResilience | №1871 (+ 2 других файлов) |
| underwearBottom | №1878 (+ 1 других файлов) |
| underwearTop | №1878 (+ 1 других файлов) |
| uniqueItems | №1021 |
| uniqueOriginalFiles | №1038 |
| uniquePositions | №0915 |
| unity-branch | №1020 |
| unityCopiedSha256 | №1040 |
| unityGuidEdges | №1020 |
| unityInclusion | №1020 |
| unityPyVersion | №1033 |
| unityValidation | №1886 |
| unityVersion | №1021 (+ 1 других файлов) |
| unknown | №2243 (+ 1 других файлов) |
| unlimitedTotalRequest | №1183 |
| unlockRank | №1875 |
| unrelatedCiFailure | №1182 |
| unstable | №2297 |
| untouched | №2243 |
| updateManifest | №1241 |
| upgradeQaJob | №1179 |
| url | №1011 (+ 16 других файлов) |
| userAdded | №2319 |
| uvDirections | №1183 |
| uvOutsideUnitSquare | №0915 |
| uvRange | №0915 |
| validation | №1886 |
| value | №2243 |
| Venom | №2296 |
| verbal | №1871 (+ 1 других файлов) |
| version | №0001 (+ 59 других файлов) |
| versionCode | №0909 (+ 18 других файлов) |
| vertexCount | №0090 (+ 1 других файлов) |
| vertices | №0915 (+ 3 других файлов) |
| VFXManager | №1033 |
| view | №0755 (+ 17 других файлов) |
| village | №1873 |
| vine | №1182 |
| Vitality | №2296 |
| volatility | №2296 (+ 1 других файлов) |
| Volatility | №2296 |
| vscode | №0001 |
| w | №0755 (+ 17 других файлов) |
| waist | №0915 (+ 5 других файлов) |
| walkable | №0755 (+ 3 других файлов) |
| walletAfterRejectedSpend | №1161 |
| walls | №0755 (+ 18 других файлов) |
| wasteland | №1873 |
| water | №1873 |
| wax | №2296 |
| Weakness | №2296 |
| weapons | №1022 (+ 5 других файлов) |
| weaponsData | №1871 (+ 2 других файлов) |
| weaponsmith | №1873 |
| weaponTraining | №1871 (+ 2 других файлов) |
| weaponwright | №1873 |
| weaver | №1873 (+ 2 других файлов) |
| weight | №0090 (+ 11 других файлов) |
| weightCases | №2243 |
| weightHero | №2243 |
| WEIGHTS_0 | №0915 |
| weightSumMaxError | №0915 |
| weightTotal | №2243 |
| weldedBoundaryEdges | №0915 |
| weldedNonManifoldEdges | №0915 |
| weldTolerance | №0915 |
| width | №0755 (+ 22 других файлов) |
| win | №1235 |
| windows | №1018 (+ 8 других файлов) |
| windowsBundleBuilt | №1031 |
| windowsInstallUpgradeReinstall | №1183 |
| windowsUpgrade | №1180 (+ 3 других файлов) |
| wingColor | №1878 (+ 1 других файлов) |
| wingSize | №1878 (+ 1 других файлов) |
| wis | №1160 (+ 3 других файлов) |
| wisdom | №1869 (+ 3 других файлов) |
| Witch | №1869 |
| wood | №1873 (+ 1 других файлов) |
| woodcarver | №1873 (+ 1 других файлов) |
| woodwork | №2296 |
| workflowRun | №1094 |
| workflows | №0909 (+ 1 других файлов) |
| workingTreeStatus | №1020 |
| wTexture | №0755 (+ 15 других файлов) |
| x | №0755 (+ 18 других файлов) |
| xp | №1869 (+ 1 других файлов) |
| y | №0755 (+ 17 других файлов) |
| z | №0755 (+ 17 других файлов) |
| zeroWeightVertices | №0915 |
| zip | №0926 |
| zip_crc_and_all_entry_sha256 | №0911 |
| zip_sha256 | №0911 |
| zipalign16KB | №1100 (+ 2 других файлов) |
| zipCompressedBrandingBytes | №1049 (+ 5 других файлов) |
| zipCompressedNativeBytes | №1049 (+ 5 других файлов) |
| zipCompressedUnityDataBytes | №1049 (+ 5 других файлов) |
| zipCrc | №1100 (+ 2 других файлов) |
| zipSha256 | №0909 (+ 1 других файлов) |
| zones | №0755 (+ 17 других файлов) |

## Файлы с совпадающим Git SHA

Совпадение содержимого не означает, что путь можно удалить.

- unity/Assets/StreamingAssets/Branding/Dragon20.png ; unity/Assets/Vtt/Resources/Branding/Dragon20.png ; wallpapers/20.png
- unity/Assets/StreamingAssets/Branding/Splash19.png ; unity/Assets/Vtt/Resources/Branding/Splash19.png ; wallpapers/19.png
- unity/Assets/StreamingAssets/Branding/Wallpaper16.jpg ; unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg ; wallpapers/16.png
- unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_danger_accent_mask_9s.png ; unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_ghost_accent_mask_9s.png ; unity/Assets/Vtt/Resources/UI/Grimoire/buttons/button_secondary_accent_mask_9s.png
- .github/scripts/.gitignore ; unity/ci/.gitignore
- app/assets/3d/makehuman/LICENSE.ASSETS.md ; unity/Assets/Vtt/Resources/CharacterStudio/LICENSE.ASSETS.md
- app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png ; unity/Assets/Vtt/Resources/CharacterStudio/SkinFemale.png
- app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png ; unity/Assets/Vtt/Resources/CharacterStudio/SkinMale.png
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
- docs/ui-redesign/evidence-1.00.58/attacks-0.jpg ; docs/ui-redesign/evidence-1.00.58/attacks-4.jpg
- docs/ui-redesign/evidence-1.00.58/home-before-dice.jpg ; docs/ui-redesign/evidence-1.00.58/home-returned.jpg
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
- unity/Assets/Vtt/Resources/UI/Parchment.png ; wallpapers/1.png

## Обновление индекса

После изменения проекта выполнить node tools/generate_project_atlas.cjs и коммитить обе версии.

