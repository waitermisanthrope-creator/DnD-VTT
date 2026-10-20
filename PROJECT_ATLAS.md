# DnD-VTT — полный атлас проекта

Снимок кода 8a8b299335b2. Git содержит 1832 файлов.
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
| №0025 .github/workflows/unity-cloud-candidate.yml | 7381 B | автоматизация GitHub Actions: unity cloud candidate |
| №0026 .github/workflows/unity-cloud-promote.yml | 2934 B | автоматизация GitHub Actions: unity cloud promote |
| №0027 .github/workflows/unity-delivery-publish.yml | 872 B | автоматизация GitHub Actions: unity delivery publish |
| №0028 .github/workflows/unity-experiment-android.yml | 2708 B | автоматизация GitHub Actions: unity experiment android |
| №0029 .github/workflows/unpack-project.yml | 2987 B | автоматизация GitHub Actions: unpack project |
| №0030 .github/workflows/validate-imported-glb.yml | 2317 B | автоматизация GitHub Actions: validate imported glb |
| №0031 .gitignore | 81 B | вспомогательный файл: .gitignore |
| №0032 00_AI_PROJECT_GUIDE.md | 1108812 B | существующее руководство ИИ, не перезаписывать |
| №0033 01_plansforproject.md | 62054 B | план целей и критериев выполнения |
| №0034 1790622696215.png | 1202179 B | текстура/изображение: 1790622696215 |
| №0035 1790622844831.png | 104000 B | текстура/изображение: 1790622844831 |
| №0036 1790718758545.png | 1889164 B | текстура/изображение: 1790718758545 |
| №0037 1790788500741.png | 1468216 B | текстура/изображение: 1790788500741 |
| №0038 3D_CHARACTER_CLOTHING_PROGRESS.md | 84856 B | документация или отчёт: 3D CHARACTER CLOTHING PROGRESS |
| №0039 3D_CHARACTER_RACES_PROGRESS.md | 75599 B | документация или отчёт: 3D CHARACTER RACES PROGRESS |
| №0040 AGENTS.md | 4903 B | документация или отчёт: AGENTS |
| №0041 AI_BLOCKERS.md | 13221 B | документация или отчёт: AI BLOCKERS |
| №0042 AI_NEXT_TASK.md | 14310 B | документация или отчёт: AI NEXT TASK |
| №0043 AI_PROGRESS.md | 51170 B | документация или отчёт: AI PROGRESS |
| №0044 android/.gitignore | 44 B | Android компонент: .gitignore |
| №0045 android/app/build.gradle | 4122 B | Android компонент: build |
| №0046 android/app/src/main/AndroidManifest.xml | 12250 B | Android компонент: AndroidManifest |
| №0047 android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java | 34871 B | Android: bridge обновлений |
| №0048 android/app/src/main/java/com/dndvtt/app/MainActivity.java | 7574 B | Android: запуск WebView |
| №0049 android/app/src/main/res/values-v31/styles.xml | 527 B | Android компонент: styles |
| №0050 android/app/src/main/res/values/styles.xml | 407 B | Android компонент: styles |
| №0051 android/build.gradle | 73 B | Android компонент: build |
| №0052 android/gradle.properties | 106 B | Android компонент: gradle |
| №0053 android/README.md | 685 B | документация или отчёт: README |
| №0054 android/settings.gradle | 333 B | Android компонент: settings |
| №0055 app/3dmap/assets/clothing/fantasy-materials.webp | 434234 B | компонент 3D карты/редактора: fantasy materials |
| №0056 app/3dmap/assets/clothing/lingerie-nylon.webp | 289830 B | компонент 3D карты/редактора: lingerie nylon |
| №0057 app/3dmap/character_anatomy_geometry.js | 22797 B | компонент 3D карты/редактора: character anatomy geometry |
| №0058 app/3dmap/character_anatomy.js | 8424 B | компонент 3D карты/редактора: character anatomy |
| №0059 app/3dmap/character_appearance_store.js | 2619 B | компонент 3D карты/редактора: character appearance store |
| №0060 app/3dmap/character_body_geometry.js | 120619 B | компонент 3D карты/редактора: character body geometry |
| №0061 app/3dmap/character_clothing.js | 51618 B | компонент 3D карты/редактора: character clothing |
| №0062 app/3dmap/character_editor_3d.js | 166537 B | компонент 3D карты/редактора: character editor 3d |
| №0063 app/3dmap/character_morph_assets.js | 3322 B | компонент 3D карты/редактора: character morph assets |
| №0064 app/3dmap/character_pose.js | 4749 B | компонент 3D карты/редактора: character pose |
| №0065 app/3dmap/character_system.js | 49923 B | компонент 3D карты/редактора: character system |
| №0066 app/3dmap/gltf_catalog.js | 90502 B | компонент 3D карты/редактора: gltf catalog |
| №0067 app/3dmap/gltf_character_pipeline.js | 7811 B | компонент 3D карты/редактора: gltf character pipeline |
| №0068 app/3dmap/gltf_loader.js | 10027 B | компонент 3D карты/редактора: gltf loader |
| №0069 app/3dmap/map_editor.js | 45829 B | компонент 3D карты/редактора: map editor |
| №0070 app/3dmap/map_model.js | 7783 B | компонент 3D карты/редактора: map model |
| №0071 app/3dmap/map_renderer_2d.js | 7331 B | компонент 3D карты/редактора: map renderer 2d |
| №0072 app/3dmap/map_renderer_3d.js | 23969 B | компонент 3D карты/редактора: map renderer 3d |
| №0073 app/3dmap/map_world.js | 9119 B | компонент 3D карты/редактора: map world |
| №0074 app/3dmap/stair_navigation.js | 932 B | компонент 3D карты/редактора: stair navigation |
| №0075 app/3dmap/stress_map.js | 3272 B | компонент 3D карты/редактора: stress map |
| №0076 app/accursed_oap_v11_runtime.js | 31365 B | логический модуль: accursed oap v11 runtime |
| №0077 app/alchemist_mhp_2024_runtime.js | 140155 B | логический модуль: alchemist mhp 2024 runtime |
| №0078 app/alchemy_engine_v29.js | 40901 B | логический модуль: alchemy engine v29 |
| №0079 app/alchemy_gameplay_v30.js | 17859 B | логический модуль: alchemy gameplay v30 |
| №0080 app/alchemy_gathering_professions_v52.js | 11833 B | логический модуль: alchemy gathering professions v52 |
| №0081 app/Ambiences.js | 14648 B | логический модуль: Ambiences |
| №0082 app/app.js | 37183 B | главный контроллер; currentChar и все персонажи |
| №0083 app/armors.js | 27349 B | логический модуль: armors |
| №0084 app/assets/3d/makehuman/editor-morphs.bin | 2340320 B | ассет графики/3D/интерфейса: editor morphs |
| №0085 app/assets/3d/makehuman/editor-morphs.json | 11573 B | ассет графики/3D/интерфейса: editor morphs |
| №0086 app/assets/3d/makehuman/human-body-morphs.glb | 12671780 B | ассет графики/3D/интерфейса: human body morphs |
| №0087 app/assets/3d/makehuman/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №0088 app/assets/3d/makehuman/materials/skin_color_detail_v1.png | 2922380 B | ассет графики/3D/интерфейса: skin color detail v1 |
| №0089 app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png | 22965 B | ассет графики/3D/интерфейса: skin micro normal roughness |
| №0090 app/assets/3d/makehuman/README.md | 1510 B | документация или отчёт: README |
| №0091 app/assets/3d/makehuman/skins/young_caucasian_female/young_caucasian_female.mhmat | 1464 B | ассет графики/3D/интерфейса: young caucasian female |
| №0092 app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png | 4391156 B | ассет графики/3D/интерфейса: young lightskinned female diffuse |
| №0093 app/assets/3d/makehuman/skins/young_caucasian_male/young_caucasian_male.mhmat | 1462 B | ассет графики/3D/интерфейса: young caucasian male |
| №0094 app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png | 3693828 B | ассет графики/3D/интерфейса: young lightskinned male diffuse |
| №0095 app/assets/3d/quaternius/models/Anvil_Log.bin | 130880 B | ассет графики/3D/интерфейса: Anvil Log |
| №0096 app/assets/3d/quaternius/models/Anvil_Log.gltf | 5580 B | ассет графики/3D/интерфейса: Anvil Log |
| №0097 app/assets/3d/quaternius/models/Anvil.bin | 24020 B | ассет графики/3D/интерфейса: Anvil |
| №0098 app/assets/3d/quaternius/models/Anvil.gltf | 3189 B | ассет графики/3D/интерфейса: Anvil |
| №0099 app/assets/3d/quaternius/models/Axe_Bronze.bin | 31156 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0100 app/assets/3d/quaternius/models/Axe_Bronze.gltf | 2591 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0101 app/assets/3d/quaternius/models/Bag.bin | 27188 B | ассет графики/3D/интерфейса: Bag |
| №0102 app/assets/3d/quaternius/models/Bag.gltf | 4318 B | ассет графики/3D/интерфейса: Bag |
| №0103 app/assets/3d/quaternius/models/Banner_1_Cloth.bin | 6636 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0104 app/assets/3d/quaternius/models/Banner_1_Cloth.gltf | 4670 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0105 app/assets/3d/quaternius/models/Banner_1.bin | 20976 B | ассет графики/3D/интерфейса: Banner 1 |
| №0106 app/assets/3d/quaternius/models/Banner_1.gltf | 6789 B | ассет графики/3D/интерфейса: Banner 1 |
| №0107 app/assets/3d/quaternius/models/Banner_2_Cloth.bin | 4940 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0108 app/assets/3d/quaternius/models/Banner_2_Cloth.gltf | 4671 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0109 app/assets/3d/quaternius/models/Banner_2.bin | 19280 B | ассет графики/3D/интерфейса: Banner 2 |
| №0110 app/assets/3d/quaternius/models/Banner_2.gltf | 6788 B | ассет графики/3D/интерфейса: Banner 2 |
| №0111 app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0112 app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6241 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0113 app/assets/3d/quaternius/models/Barrel_Holder.bin | 161816 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0114 app/assets/3d/quaternius/models/Barrel_Holder.gltf | 4347 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0115 app/assets/3d/quaternius/models/Barrel.bin | 57144 B | ассет графики/3D/интерфейса: Barrel |
| №0116 app/assets/3d/quaternius/models/Barrel.gltf | 4311 B | ассет графики/3D/интерфейса: Barrel |
| №0117 app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0118 app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0119 app/assets/3d/quaternius/models/Bed_Twin2.bin | 76624 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0120 app/assets/3d/quaternius/models/Bed_Twin2.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0121 app/assets/3d/quaternius/models/Bench.bin | 19304 B | ассет графики/3D/интерфейса: Bench |
| №0122 app/assets/3d/quaternius/models/Bench.gltf | 4298 B | ассет графики/3D/интерфейса: Bench |
| №0123 app/assets/3d/quaternius/models/Book_5.bin | 5856 B | ассет графики/3D/интерфейса: Book 5 |
| №0124 app/assets/3d/quaternius/models/Book_5.gltf | 2403 B | ассет графики/3D/интерфейса: Book 5 |
| №0125 app/assets/3d/quaternius/models/Book_7.bin | 32664 B | ассет графики/3D/интерфейса: Book 7 |
| №0126 app/assets/3d/quaternius/models/Book_7.gltf | 4290 B | ассет графики/3D/интерфейса: Book 7 |
| №0127 app/assets/3d/quaternius/models/Book_Simplified_Single.bin | 3192 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0128 app/assets/3d/quaternius/models/Book_Simplified_Single.gltf | 2428 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0129 app/assets/3d/quaternius/models/Book_Stack_1.bin | 12768 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0130 app/assets/3d/quaternius/models/Book_Stack_1.gltf | 2418 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0131 app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0132 app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4309 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0133 app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0134 app/assets/3d/quaternius/models/Bookcase_2.gltf | 4329 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0135 app/assets/3d/quaternius/models/BookGroup_Medium_1.bin | 25536 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0136 app/assets/3d/quaternius/models/BookGroup_Medium_1.gltf | 2429 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0137 app/assets/3d/quaternius/models/BookGroup_Medium_2.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0138 app/assets/3d/quaternius/models/BookGroup_Medium_2.gltf | 2431 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0139 app/assets/3d/quaternius/models/BookGroup_Medium_3.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0140 app/assets/3d/quaternius/models/BookGroup_Medium_3.gltf | 2432 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0141 app/assets/3d/quaternius/models/BookGroup_Small_1.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0142 app/assets/3d/quaternius/models/BookGroup_Small_1.gltf | 2423 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0143 app/assets/3d/quaternius/models/BookGroup_Small_2.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0144 app/assets/3d/quaternius/models/BookGroup_Small_2.gltf | 2426 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0145 app/assets/3d/quaternius/models/BookGroup_Small_3.bin | 7980 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0146 app/assets/3d/quaternius/models/BookGroup_Small_3.gltf | 2424 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0147 app/assets/3d/quaternius/models/BookStand.bin | 62020 B | ассет графики/3D/интерфейса: BookStand |
| №0148 app/assets/3d/quaternius/models/BookStand.gltf | 2223 B | ассет графики/3D/интерфейса: BookStand |
| №0149 app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0150 app/assets/3d/quaternius/models/Bottle_1.gltf | 2413 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0151 app/assets/3d/quaternius/models/Bucket_Metal.bin | 18824 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0152 app/assets/3d/quaternius/models/Bucket_Metal.gltf | 2206 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0153 app/assets/3d/quaternius/models/Bucket_Wooden_1.bin | 32544 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0154 app/assets/3d/quaternius/models/Bucket_Wooden_1.gltf | 3911 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0155 app/assets/3d/quaternius/models/Cabinet.bin | 114768 B | ассет графики/3D/интерфейса: Cabinet |
| №0156 app/assets/3d/quaternius/models/Cabinet.gltf | 4324 B | ассет графики/3D/интерфейса: Cabinet |
| №0157 app/assets/3d/quaternius/models/Cage_Small.bin | 171848 B | ассет графики/3D/интерфейса: Cage Small |
| №0158 app/assets/3d/quaternius/models/Cage_Small.gltf | 2207 B | ассет графики/3D/интерфейса: Cage Small |
| №0159 app/assets/3d/quaternius/models/Candle_1.bin | 6200 B | ассет графики/3D/интерфейса: Candle 1 |
| №0160 app/assets/3d/quaternius/models/Candle_1.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 1 |
| №0161 app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | ассет графики/3D/интерфейса: Candle 2 |
| №0162 app/assets/3d/quaternius/models/Candle_2.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 2 |
| №0163 app/assets/3d/quaternius/models/CandleStick_Stand.bin | 226228 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0164 app/assets/3d/quaternius/models/CandleStick_Stand.gltf | 4347 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0165 app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0166 app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 3900 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0167 app/assets/3d/quaternius/models/CandleStick.bin | 21436 B | ассет графики/3D/интерфейса: CandleStick |
| №0168 app/assets/3d/quaternius/models/CandleStick.gltf | 2199 B | ассет графики/3D/интерфейса: CandleStick |
| №0169 app/assets/3d/quaternius/models/Carrot.bin | 22244 B | ассет графики/3D/интерфейса: Carrot |
| №0170 app/assets/3d/quaternius/models/Carrot.gltf | 2411 B | ассет графики/3D/интерфейса: Carrot |
| №0171 app/assets/3d/quaternius/models/Cauldron.bin | 62712 B | ассет графики/3D/интерфейса: Cauldron |
| №0172 app/assets/3d/quaternius/models/Cauldron.gltf | 2195 B | ассет графики/3D/интерфейса: Cauldron |
| №0173 app/assets/3d/quaternius/models/Chain_Coil.bin | 193664 B | ассет графики/3D/интерфейса: Chain Coil |
| №0174 app/assets/3d/quaternius/models/Chain_Coil.gltf | 2424 B | ассет графики/3D/интерфейса: Chain Coil |
| №0175 app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | ассет графики/3D/интерфейса: Chair 1 |
| №0176 app/assets/3d/quaternius/models/Chair_1.gltf | 4312 B | ассет графики/3D/интерфейса: Chair 1 |
| №0177 app/assets/3d/quaternius/models/Chalice.bin | 15644 B | ассет графики/3D/интерфейса: Chalice |
| №0178 app/assets/3d/quaternius/models/Chalice.gltf | 2197 B | ассет графики/3D/интерфейса: Chalice |
| №0179 app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | ассет графики/3D/интерфейса: Chandelier |
| №0180 app/assets/3d/quaternius/models/Chandelier.gltf | 6259 B | ассет графики/3D/интерфейса: Chandelier |
| №0181 app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | ассет графики/3D/интерфейса: Chest Wood |
| №0182 app/assets/3d/quaternius/models/Chest_Wood.gltf | 21402 B | ассет графики/3D/интерфейса: Chest Wood |
| №0183 app/assets/3d/quaternius/models/Coin_Pile_2.bin | 52612 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0184 app/assets/3d/quaternius/models/Coin_Pile_2.gltf | 2429 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0185 app/assets/3d/quaternius/models/Coin_Pile.bin | 47520 B | ассет графики/3D/интерфейса: Coin Pile |
| №0186 app/assets/3d/quaternius/models/Coin_Pile.gltf | 2424 B | ассет графики/3D/интерфейса: Coin Pile |
| №0187 app/assets/3d/quaternius/models/Coin.bin | 14464 B | ассет графики/3D/интерфейса: Coin |
| №0188 app/assets/3d/quaternius/models/Coin.gltf | 2408 B | ассет графики/3D/интерфейса: Coin |
| №0189 app/assets/3d/quaternius/models/Crate_Metal.bin | 126828 B | ассет графики/3D/интерфейса: Crate Metal |
| №0190 app/assets/3d/quaternius/models/Crate_Metal.gltf | 4335 B | ассет графики/3D/интерфейса: Crate Metal |
| №0191 app/assets/3d/quaternius/models/Crate_Wooden.bin | 66496 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0192 app/assets/3d/quaternius/models/Crate_Wooden.gltf | 4412 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0193 app/assets/3d/quaternius/models/Dummy.bin | 80988 B | ассет графики/3D/интерфейса: Dummy |
| №0194 app/assets/3d/quaternius/models/Dummy.gltf | 5570 B | ассет графики/3D/интерфейса: Dummy |
| №0195 app/assets/3d/quaternius/models/FarmCrate_Apple.bin | 134488 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0196 app/assets/3d/quaternius/models/FarmCrate_Apple.gltf | 6263 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0197 app/assets/3d/quaternius/models/FarmCrate_Carrot.bin | 204292 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0198 app/assets/3d/quaternius/models/FarmCrate_Carrot.gltf | 6273 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0199 app/assets/3d/quaternius/models/FarmCrate_Empty.bin | 54704 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0200 app/assets/3d/quaternius/models/FarmCrate_Empty.gltf | 3915 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0201 app/assets/3d/quaternius/models/Key_Gold.bin | 58636 B | ассет графики/3D/интерфейса: Key Gold |
| №0202 app/assets/3d/quaternius/models/Key_Gold.gltf | 2424 B | ассет графики/3D/интерфейса: Key Gold |
| №0203 app/assets/3d/quaternius/models/Key_Metal.bin | 19340 B | ассет графики/3D/интерфейса: Key Metal |
| №0204 app/assets/3d/quaternius/models/Key_Metal.gltf | 2197 B | ассет графики/3D/интерфейса: Key Metal |
| №0205 app/assets/3d/quaternius/models/Lantern_Wall.bin | 120036 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0206 app/assets/3d/quaternius/models/Lantern_Wall.gltf | 2203 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0207 app/assets/3d/quaternius/models/Mug.bin | 12488 B | ассет графики/3D/интерфейса: Mug |
| №0208 app/assets/3d/quaternius/models/Mug.gltf | 3881 B | ассет графики/3D/интерфейса: Mug |
| №0209 app/assets/3d/quaternius/models/Nightstand_Shelf.bin | 21412 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0210 app/assets/3d/quaternius/models/Nightstand_Shelf.gltf | 2447 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0211 app/assets/3d/quaternius/models/Peg_Rack.bin | 26672 B | ассет графики/3D/интерфейса: Peg Rack |
| №0212 app/assets/3d/quaternius/models/Peg_Rack.gltf | 3879 B | ассет графики/3D/интерфейса: Peg Rack |
| №0213 app/assets/3d/quaternius/models/Pickaxe_Bronze.bin | 30736 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0214 app/assets/3d/quaternius/models/Pickaxe_Bronze.gltf | 2425 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0215 app/assets/3d/quaternius/models/Pot_1_Lid.bin | 46120 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0216 app/assets/3d/quaternius/models/Pot_1_Lid.gltf | 2196 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0217 app/assets/3d/quaternius/models/Pot_1.bin | 37160 B | ассет графики/3D/интерфейса: Pot 1 |
| №0218 app/assets/3d/quaternius/models/Pot_1.gltf | 2185 B | ассет графики/3D/интерфейса: Pot 1 |
| №0219 app/assets/3d/quaternius/models/Potion_1.bin | 18200 B | ассет графики/3D/интерфейса: Potion 1 |
| №0220 app/assets/3d/quaternius/models/Potion_1.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 1 |
| №0221 app/assets/3d/quaternius/models/Potion_2.bin | 19672 B | ассет графики/3D/интерфейса: Potion 2 |
| №0222 app/assets/3d/quaternius/models/Potion_2.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 2 |
| №0223 app/assets/3d/quaternius/models/Potion_4.bin | 22536 B | ассет графики/3D/интерфейса: Potion 4 |
| №0224 app/assets/3d/quaternius/models/Potion_4.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 4 |
| №0225 app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | ассет графики/3D/интерфейса: Pouch Large |
| №0226 app/assets/3d/quaternius/models/Pouch_Large.gltf | 4306 B | ассет графики/3D/интерфейса: Pouch Large |
| №0227 app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | ассет графики/3D/интерфейса: Rope 1 |
| №0228 app/assets/3d/quaternius/models/Rope_1.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 1 |
| №0229 app/assets/3d/quaternius/models/Rope_2.bin | 34904 B | ассет графики/3D/интерфейса: Rope 2 |
| №0230 app/assets/3d/quaternius/models/Rope_2.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 2 |
| №0231 app/assets/3d/quaternius/models/Rope_3.bin | 41624 B | ассет графики/3D/интерфейса: Rope 3 |
| №0232 app/assets/3d/quaternius/models/Rope_3.gltf | 2225 B | ассет графики/3D/интерфейса: Rope 3 |
| №0233 app/assets/3d/quaternius/models/Scroll_1.bin | 20112 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0234 app/assets/3d/quaternius/models/Scroll_1.gltf | 3954 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0235 app/assets/3d/quaternius/models/Scroll_2.bin | 28392 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0236 app/assets/3d/quaternius/models/Scroll_2.gltf | 3968 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0237 app/assets/3d/quaternius/models/Shelf_Arch.bin | 64836 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0238 app/assets/3d/quaternius/models/Shelf_Arch.gltf | 4332 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0239 app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0240 app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2224 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0241 app/assets/3d/quaternius/models/Shelf_Small_Bottles.bin | 229484 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0242 app/assets/3d/quaternius/models/Shelf_Small_Bottles.gltf | 6266 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0243 app/assets/3d/quaternius/models/Shield_Wooden.bin | 64184 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0244 app/assets/3d/quaternius/models/Shield_Wooden.gltf | 6243 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0245 app/assets/3d/quaternius/models/SmallBottle.bin | 5700 B | ассет графики/3D/интерфейса: SmallBottle |
| №0246 app/assets/3d/quaternius/models/SmallBottle.gltf | 2392 B | ассет графики/3D/интерфейса: SmallBottle |
| №0247 app/assets/3d/quaternius/models/SmallBottles_1.bin | 20556 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0248 app/assets/3d/quaternius/models/SmallBottles_1.gltf | 2423 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0249 app/assets/3d/quaternius/models/Stall_Cart_Empty.bin | 237264 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0250 app/assets/3d/quaternius/models/Stall_Cart_Empty.gltf | 6857 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0251 app/assets/3d/quaternius/models/Stall_Empty.bin | 88176 B | ассет графики/3D/интерфейса: Stall Empty |
| №0252 app/assets/3d/quaternius/models/Stall_Empty.gltf | 6804 B | ассет графики/3D/интерфейса: Stall Empty |
| №0253 app/assets/3d/quaternius/models/Stool.bin | 11472 B | ассет графики/3D/интерфейса: Stool |
| №0254 app/assets/3d/quaternius/models/Stool.gltf | 2423 B | ассет графики/3D/интерфейса: Stool |
| №0255 app/assets/3d/quaternius/models/Sword_Bronze.bin | 69920 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0256 app/assets/3d/quaternius/models/Sword_Bronze.gltf | 2436 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0257 app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | ассет графики/3D/интерфейса: Table Fork |
| №0258 app/assets/3d/quaternius/models/Table_Fork.gltf | 2189 B | ассет графики/3D/интерфейса: Table Fork |
| №0259 app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | ассет графики/3D/интерфейса: Table Knife |
| №0260 app/assets/3d/quaternius/models/Table_Knife.gltf | 2186 B | ассет графики/3D/интерфейса: Table Knife |
| №0261 app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | ассет графики/3D/интерфейса: Table Large |
| №0262 app/assets/3d/quaternius/models/Table_Large.gltf | 4316 B | ассет графики/3D/интерфейса: Table Large |
| №0263 app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | ассет графики/3D/интерфейса: Table Plate |
| №0264 app/assets/3d/quaternius/models/Table_Plate.gltf | 2199 B | ассет графики/3D/интерфейса: Table Plate |
| №0265 app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | ассет графики/3D/интерфейса: Table Spoon |
| №0266 app/assets/3d/quaternius/models/Table_Spoon.gltf | 2191 B | ассет графики/3D/интерфейса: Table Spoon |
| №0267 app/assets/3d/quaternius/models/Torch_Metal.bin | 39100 B | ассет графики/3D/интерфейса: Torch Metal |
| №0268 app/assets/3d/quaternius/models/Torch_Metal.gltf | 2203 B | ассет графики/3D/интерфейса: Torch Metal |
| №0269 app/assets/3d/quaternius/models/Vase_2.bin | 21188 B | ассет графики/3D/интерфейса: Vase 2 |
| №0270 app/assets/3d/quaternius/models/Vase_2.gltf | 2407 B | ассет графики/3D/интерфейса: Vase 2 |
| №0271 app/assets/3d/quaternius/models/Vase_4.bin | 22028 B | ассет графики/3D/интерфейса: Vase 4 |
| №0272 app/assets/3d/quaternius/models/Vase_4.gltf | 2412 B | ассет графики/3D/интерфейса: Vase 4 |
| №0273 app/assets/3d/quaternius/models/Vase_Rubble_Medium.bin | 85960 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0274 app/assets/3d/quaternius/models/Vase_Rubble_Medium.gltf | 2453 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0275 app/assets/3d/quaternius/models/WeaponStand.bin | 76312 B | ассет графики/3D/интерфейса: WeaponStand |
| №0276 app/assets/3d/quaternius/models/WeaponStand.gltf | 3903 B | ассет графики/3D/интерфейса: WeaponStand |
| №0277 app/assets/3d/quaternius/models/Whetstone.bin | 59280 B | ассет графики/3D/интерфейса: Whetstone |
| №0278 app/assets/3d/quaternius/models/Whetstone.gltf | 6212 B | ассет графики/3D/интерфейса: Whetstone |
| №0279 app/assets/3d/quaternius/models/Workbench_Drawers.bin | 16824 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0280 app/assets/3d/quaternius/models/Workbench_Drawers.gltf | 4313 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0281 app/assets/3d/quaternius/models/Workbench.bin | 63408 B | ассет графики/3D/интерфейса: Workbench |
| №0282 app/assets/3d/quaternius/models/Workbench.gltf | 4318 B | ассет графики/3D/интерфейса: Workbench |
| №0283 app/assets/3d/quaternius/textures/T_Page_Noise.png | 7486734 B | ассет графики/3D/интерфейса: T Page Noise |
| №0284 app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png | 1936754 B | ассет графики/3D/интерфейса: T Trim Cloth BaseColor |
| №0285 app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png | 3920858 B | ассет графики/3D/интерфейса: T Trim Cloth Normal |
| №0286 app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png | 623426 B | ассет графики/3D/интерфейса: T Trim Cloth ORM |
| №0287 app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png | 2232961 B | ассет графики/3D/интерфейса: T Trim Furniture BaseColor |
| №0288 app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png | 3485710 B | ассет графики/3D/интерфейса: T Trim Furniture Normal |
| №0289 app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png | 2064585 B | ассет графики/3D/интерфейса: T Trim Furniture ORM |
| №0290 app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png | 1361221 B | ассет графики/3D/интерфейса: T Trim Metal BaseColor |
| №0291 app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png | 3625541 B | ассет графики/3D/интерфейса: T Trim Metal Normal |
| №0292 app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png | 1871475 B | ассет графики/3D/интерфейса: T Trim Metal ORM |
| №0293 app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png | 2263132 B | ассет графики/3D/интерфейса: T Trim Props BaseColor |
| №0294 app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png | 4441458 B | ассет графики/3D/интерфейса: T Trim Props Normal |
| №0295 app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png | 3017151 B | ассет графики/3D/интерфейса: T Trim Props ORM |
| №0296 app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp | 510226 B | ассет графики/3D/интерфейса: bird contour feathers v1 |
| №0297 app/assets/3d/race_surfaces/flight-feather-vane-v1.webp | 555662 B | ассет графики/3D/интерфейса: flight feather vane v1 |
| №0298 app/assets/3d/race_surfaces/mammal-underfur-v1.webp | 544064 B | ассет графики/3D/интерфейса: mammal underfur v1 |
| №0299 app/assets/3d/race_surfaces/reptile-scales-v1.webp | 730360 B | ассет графики/3D/интерфейса: reptile scales v1 |
| №0300 app/assets/3d/user_furniture/altar_table.glb | 36228 B | ассет графики/3D/интерфейса: altar table |
| №0301 app/assets/3d/user_furniture/apothecary_jar_shelf.glb | 106668 B | ассет графики/3D/интерфейса: apothecary jar shelf |
| №0302 app/assets/3d/user_furniture/apothecary_shelf.glb | 107148 B | ассет графики/3D/интерфейса: apothecary shelf |
| №0303 app/assets/3d/user_furniture/armour_stand.glb | 16340 B | ассет графики/3D/интерфейса: armour stand |
| №0304 app/assets/3d/user_furniture/banner_pole.glb | 17136 B | ассет графики/3D/интерфейса: banner pole |
| №0305 app/assets/3d/user_furniture/bed.glb | 5718760 B | ассет графики/3D/интерфейса: bed |
| №0306 app/assets/3d/user_furniture/book_chest.glb | 45816 B | ассет графики/3D/интерфейса: book chest |
| №0307 app/assets/3d/user_furniture/book_press.glb | 59492 B | ассет графики/3D/интерфейса: book press |
| №0308 app/assets/3d/user_furniture/bookshelf.glb | 7818348 B | ассет графики/3D/интерфейса: bookshelf |
| №0309 app/assets/3d/user_furniture/bread_oven.glb | 45200 B | ассет графики/3D/интерфейса: bread oven |
| №0310 app/assets/3d/user_furniture/brewhouse_tun.glb | 68616 B | ассет графики/3D/интерфейса: brewhouse tun |
| №0311 app/assets/3d/user_furniture/candle_stand.glb | 21372 B | ассет графики/3D/интерфейса: candle stand |
| №0312 app/assets/3d/user_furniture/chained_library_desk.glb | 190612 B | ассет графики/3D/интерфейса: chained library desk |
| №0313 app/assets/3d/user_furniture/chair.glb | 4643004 B | ассет графики/3D/интерфейса: chair |
| №0314 app/assets/3d/user_furniture/closet.glb | 6550260 B | ассет графики/3D/интерфейса: closet |
| №0315 app/assets/3d/user_furniture/commode.glb | 4845868 B | ассет графики/3D/интерфейса: commode |
| №0316 app/assets/3d/user_furniture/cooking_cauldron.glb | 34300 B | ассет графики/3D/интерфейса: cooking cauldron |
| №0317 app/assets/3d/user_furniture/crate_stack.glb | 39644 B | ассет графики/3D/интерфейса: crate stack |
| №0318 app/assets/3d/user_furniture/dormitory_cot.glb | 70976 B | ассет графики/3D/интерфейса: dormitory cot |
| №0319 app/assets/3d/user_furniture/finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: finished codex |
| №0320 app/assets/3d/user_furniture/gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: gold leaf cushion |
| №0321 app/assets/3d/user_furniture/hand_cart.glb | 75012 B | ассет графики/3D/интерфейса: hand cart |
| №0322 app/assets/3d/user_furniture/hanging_oil_lamp.glb | 50924 B | ассет графики/3D/интерфейса: hanging oil lamp |
| №0323 app/assets/3d/user_furniture/hitching_post.glb | 22232 B | ассет графики/3D/интерфейса: hitching post |
| №0324 app/assets/3d/user_furniture/human-base-rigged.glb | 4994640 B | ассет графики/3D/интерфейса: human base rigged |
| №0325 app/assets/3d/user_furniture/infirmary_cot.glb | 71696 B | ассет графики/3D/интерфейса: infirmary cot |
| №0326 app/assets/3d/user_furniture/kitchen_hearth.glb | 38460 B | ассет графики/3D/интерфейса: kitchen hearth |
| №0327 app/assets/3d/user_furniture/lamp_post.glb | 16960 B | ассет графики/3D/интерфейса: lamp post |
| №0328 app/assets/3d/user_furniture/loom.glb | 46728 B | ассет графики/3D/интерфейса: loom |
| №0329 app/assets/3d/user_furniture/manuscript_in_progress.glb | 153128 B | ассет графики/3D/интерфейса: manuscript in progress |
| №0330 app/assets/3d/user_furniture/monastery_altar_table.glb | 36248 B | ассет графики/3D/интерфейса: monastery altar table |
| №0331 app/assets/3d/user_furniture/monastery_apothecary_jar_shelf.glb | 106620 B | ассет графики/3D/интерфейса: monastery apothecary jar shelf |
| №0332 app/assets/3d/user_furniture/monastery_bell_tower_section.glb | 456868 B | ассет графики/3D/интерфейса: monastery bell tower section |
| №0333 app/assets/3d/user_furniture/monastery_book_chest.glb | 45320 B | ассет графики/3D/интерфейса: monastery book chest |
| №0334 app/assets/3d/user_furniture/monastery_book_press.glb | 59492 B | ассет графики/3D/интерфейса: monastery book press |
| №0335 app/assets/3d/user_furniture/monastery_bread_oven.glb | 45296 B | ассет графики/3D/интерфейса: monastery bread oven |
| №0336 app/assets/3d/user_furniture/monastery_brewhouse_tun.glb | 68216 B | ассет графики/3D/интерфейса: monastery brewhouse tun |
| №0337 app/assets/3d/user_furniture/monastery_candle_stand.glb | 21376 B | ассет графики/3D/интерфейса: monastery candle stand |
| №0338 app/assets/3d/user_furniture/monastery_censer.glb | 49336 B | ассет графики/3D/интерфейса: monastery censer |
| №0339 app/assets/3d/user_furniture/monastery_chained_library_desk.glb | 148408 B | ассет графики/3D/интерфейса: monastery chained library desk |
| №0340 app/assets/3d/user_furniture/monastery_chapel_screen.glb | 333728 B | ассет графики/3D/интерфейса: monastery chapel screen |
| №0341 app/assets/3d/user_furniture/monastery_chapter_house_bay.glb | 151904 B | ассет графики/3D/интерфейса: monastery chapter house bay |
| №0342 app/assets/3d/user_furniture/monastery_cloister_arcade_bay.glb | 130972 B | ассет графики/3D/интерфейса: monastery cloister arcade bay |
| №0343 app/assets/3d/user_furniture/monastery_cloister_arcade_corner.glb | 73924 B | ассет графики/3D/интерфейса: monastery cloister arcade corner |
| №0344 app/assets/3d/user_furniture/monastery_cloister_garth_lawn.glb | 13732 B | ассет графики/3D/интерфейса: monastery cloister garth lawn |
| №0345 app/assets/3d/user_furniture/monastery_cloister_lean_to_roof.glb | 18724 B | ассет графики/3D/интерфейса: monastery cloister lean to roof |
| №0346 app/assets/3d/user_furniture/monastery_cloister_vault_section.glb | 73928 B | ассет графики/3D/интерфейса: monastery cloister vault section |
| №0347 app/assets/3d/user_furniture/monastery_cloister_well.glb | 41568 B | ассет графики/3D/интерфейса: monastery cloister well |
| №0348 app/assets/3d/user_furniture/monastery_compost_bay.glb | 55596 B | ассет графики/3D/интерфейса: monastery compost bay |
| №0349 app/assets/3d/user_furniture/monastery_cooking_cauldron.glb | 33800 B | ассет графики/3D/интерфейса: monastery cooking cauldron |
| №0350 app/assets/3d/user_furniture/monastery_dormitory_cot.glb | 54832 B | ассет графики/3D/интерфейса: monastery dormitory cot |
| №0351 app/assets/3d/user_furniture/monastery_finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: monastery finished codex |
| №0352 app/assets/3d/user_furniture/monastery_flagstone_floor_slab.glb | 9900 B | ассет графики/3D/интерфейса: monastery flagstone floor slab |
| №0353 app/assets/3d/user_furniture/monastery_gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: monastery gold leaf cushion |
| №0354 app/assets/3d/user_furniture/monastery_hand_cart.glb | 86864 B | ассет графики/3D/интерфейса: monastery hand cart |
| №0355 app/assets/3d/user_furniture/monastery_hanging_oil_lamp.glb | 47156 B | ассет графики/3D/интерфейса: monastery hanging oil lamp |
| №0356 app/assets/3d/user_furniture/monastery_herb_garden_bed.glb | 94584 B | ассет графики/3D/интерфейса: monastery herb garden bed |
| №0357 app/assets/3d/user_furniture/monastery_hung_bell.glb | 40368 B | ассет графики/3D/интерфейса: monastery hung bell |
| №0358 app/assets/3d/user_furniture/monastery_infirmary_cot.glb | 71700 B | ассет графики/3D/интерфейса: monastery infirmary cot |
| №0359 app/assets/3d/user_furniture/monastery_kitchen_hearth.glb | 37972 B | ассет графики/3D/интерфейса: monastery kitchen hearth |
| №0360 app/assets/3d/user_furniture/monastery_manuscript_in_progress.glb | 153132 B | ассет графики/3D/интерфейса: monastery manuscript in progress |
| №0361 app/assets/3d/user_furniture/monastery_monastery_buttress.glb | 18440 B | ассет графики/3D/интерфейса: monastery monastery buttress |
| №0362 app/assets/3d/user_furniture/monastery_monastery_door_bay.glb | 87284 B | ассет графики/3D/интерфейса: monastery monastery door bay |
| №0363 app/assets/3d/user_furniture/monastery_monastery_lancet_window_bay.glb | 64048 B | ассет графики/3D/интерфейса: monastery monastery lancet window bay |
| №0364 app/assets/3d/user_furniture/monastery_monastery_wall_bay.glb | 29336 B | ассет графики/3D/интерфейса: monastery monastery wall bay |
| №0365 app/assets/3d/user_furniture/monastery_monks_chest.glb | 30432 B | ассет графики/3D/интерфейса: monastery monks chest |
| №0366 app/assets/3d/user_furniture/monastery_mortar_and_pestle_set.glb | 31476 B | ассет графики/3D/интерфейса: monastery mortar and pestle set |
| №0367 app/assets/3d/user_furniture/monastery_parchment_stretching_frame.glb | 66292 B | ассет графики/3D/интерфейса: monastery parchment stretching frame |
| №0368 app/assets/3d/user_furniture/monastery_physic_bench.glb | 46424 B | ассет графики/3D/интерфейса: monastery physic bench |
| №0369 app/assets/3d/user_furniture/monastery_pigment_tray.glb | 42180 B | ассет графики/3D/интерфейса: monastery pigment tray |
| №0370 app/assets/3d/user_furniture/monastery_quill_and_inkhorn_set.glb | 36912 B | ассет графики/3D/интерфейса: monastery quill and inkhorn set |
| №0371 app/assets/3d/user_furniture/monastery_rain_water_butt.glb | 45160 B | ассет графики/3D/интерфейса: monastery rain water butt |
| №0372 app/assets/3d/user_furniture/monastery_readers_pulpit.glb | 70796 B | ассет графики/3D/интерфейса: monastery readers pulpit |
| №0373 app/assets/3d/user_furniture/monastery_reading_lectern.glb | 48744 B | ассет графики/3D/интерфейса: monastery reading lectern |
| №0374 app/assets/3d/user_furniture/monastery_refectory_bench.glb | 20408 B | ассет графики/3D/интерфейса: monastery refectory bench |
| №0375 app/assets/3d/user_furniture/monastery_refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: monastery refectory long table |
| №0376 app/assets/3d/user_furniture/monastery_reliquary_casket.glb | 59680 B | ассет графики/3D/интерфейса: monastery reliquary casket |
| №0377 app/assets/3d/user_furniture/monastery_ruling_board.glb | 98044 B | ассет графики/3D/интерфейса: monastery ruling board |
| №0378 app/assets/3d/user_furniture/monastery_rush_light_stand.glb | 19044 B | ассет графики/3D/интерфейса: monastery rush light stand |
| №0379 app/assets/3d/user_furniture/monastery_scribes_stool.glb | 19900 B | ассет графики/3D/интерфейса: monastery scribes stool |
| №0380 app/assets/3d/user_furniture/monastery_sloped_writing_desk.glb | 247044 B | ассет графики/3D/интерфейса: monastery sloped writing desk |
| №0381 app/assets/3d/user_furniture/monastery_stone_drain.glb | 12360 B | ассет графики/3D/интерфейса: monastery stone drain |
| №0382 app/assets/3d/user_furniture/monastery_stone_font.glb | 55200 B | ассет графики/3D/интерфейса: monastery stone font |
| №0383 app/assets/3d/user_furniture/monastery_stone_stair_vice.glb | 130164 B | ассет графики/3D/интерфейса: monastery stone stair vice |
| №0384 app/assets/3d/user_furniture/monastery_tomb_slab.glb | 47852 B | ассет графики/3D/интерфейса: monastery tomb slab |
| №0385 app/assets/3d/user_furniture/monastery_trestle_table.glb | 39912 B | ассет графики/3D/интерфейса: monastery trestle table |
| №0386 app/assets/3d/user_furniture/monastery_wall_torch_bracket.glb | 38324 B | ассет графики/3D/интерфейса: monastery wall torch bracket |
| №0387 app/assets/3d/user_furniture/monastery_wood_stack.glb | 71140 B | ассет графики/3D/интерфейса: monastery wood stack |
| №0388 app/assets/3d/user_furniture/monks_chest.glb | 30508 B | ассет графики/3D/интерфейса: monks chest |
| №0389 app/assets/3d/user_furniture/mortar_pestle.glb | 31516 B | ассет графики/3D/интерфейса: mortar pestle |
| №0390 app/assets/3d/user_furniture/nature_birch_leaning.glb | 14804 B | ассет графики/3D/интерфейса: nature birch leaning |
| №0391 app/assets/3d/user_furniture/nature_birch_mature.glb | 15636 B | ассет графики/3D/интерфейса: nature birch mature |
| №0392 app/assets/3d/user_furniture/nature_birch_young.glb | 13980 B | ассет графики/3D/интерфейса: nature birch young |
| №0393 app/assets/3d/user_furniture/nature_boulder_large.glb | 6660 B | ассет графики/3D/интерфейса: nature boulder large |
| №0394 app/assets/3d/user_furniture/nature_boulder_medium.glb | 6192 B | ассет графики/3D/интерфейса: nature boulder medium |
| №0395 app/assets/3d/user_furniture/nature_boulder_mossy.glb | 24232 B | ассет графики/3D/интерфейса: nature boulder mossy |
| №0396 app/assets/3d/user_furniture/nature_boulder_small.glb | 4760 B | ассет графики/3D/интерфейса: nature boulder small |
| №0397 app/assets/3d/user_furniture/nature_bush_berry.glb | 12316 B | ассет графики/3D/интерфейса: nature bush berry |
| №0398 app/assets/3d/user_furniture/nature_bush_flat.glb | 5980 B | ассет графики/3D/интерфейса: nature bush flat |
| №0399 app/assets/3d/user_furniture/nature_bush_flowering.glb | 16248 B | ассет графики/3D/интерфейса: nature bush flowering |
| №0400 app/assets/3d/user_furniture/nature_bush_round.glb | 5152 B | ассет графики/3D/интерфейса: nature bush round |
| №0401 app/assets/3d/user_furniture/nature_bush_tall.glb | 5968 B | ассет графики/3D/интерфейса: nature bush tall |
| №0402 app/assets/3d/user_furniture/nature_cliff_block.glb | 29492 B | ассет графики/3D/интерфейса: nature cliff block |
| №0403 app/assets/3d/user_furniture/nature_dead_snag_short.glb | 8596 B | ассет графики/3D/интерфейса: nature dead snag short |
| №0404 app/assets/3d/user_furniture/nature_dead_snag_tall.glb | 16784 B | ассет графики/3D/интерфейса: nature dead snag tall |
| №0405 app/assets/3d/user_furniture/nature_fern_clump.glb | 29024 B | ассет графики/3D/интерфейса: nature fern clump |
| №0406 app/assets/3d/user_furniture/nature_fern_single.glb | 13176 B | ассет графики/3D/интерфейса: nature fern single |
| №0407 app/assets/3d/user_furniture/nature_flower_red.glb | 12412 B | ассет графики/3D/интерфейса: nature flower red |
| №0408 app/assets/3d/user_furniture/nature_flower_yellow.glb | 12216 B | ассет графики/3D/интерфейса: nature flower yellow |
| №0409 app/assets/3d/user_furniture/nature_grass_tuft_tall.glb | 6628 B | ассет графики/3D/интерфейса: nature grass tuft tall |
| №0410 app/assets/3d/user_furniture/nature_hedge_block.glb | 2444 B | ассет графики/3D/интерфейса: nature hedge block |
| №0411 app/assets/3d/user_furniture/nature_meadow_disc.glb | 8780 B | ассет графики/3D/интерфейса: nature meadow disc |
| №0412 app/assets/3d/user_furniture/nature_mushroom_group.glb | 39600 B | ассет графики/3D/интерфейса: nature mushroom group |
| №0413 app/assets/3d/user_furniture/nature_oak_ancient.glb | 292756 B | ассет графики/3D/интерфейса: nature oak ancient |
| №0414 app/assets/3d/user_furniture/nature_oak_mature.glb | 279624 B | ассет графики/3D/интерфейса: nature oak mature |
| №0415 app/assets/3d/user_furniture/nature_oak_sapling.glb | 266084 B | ассет графики/3D/интерфейса: nature oak sapling |
| №0416 app/assets/3d/user_furniture/nature_oak_young.glb | 266536 B | ассет графики/3D/интерфейса: nature oak young |
| №0417 app/assets/3d/user_furniture/nature_palm_leaning.glb | 50808 B | ассет графики/3D/интерфейса: nature palm leaning |
| №0418 app/assets/3d/user_furniture/nature_palm_mature.glb | 57076 B | ассет графики/3D/интерфейса: nature palm mature |
| №0419 app/assets/3d/user_furniture/nature_palm_young.glb | 37688 B | ассет графики/3D/интерфейса: nature palm young |
| №0420 app/assets/3d/user_furniture/nature_pebble_cluster.glb | 12184 B | ассет графики/3D/интерфейса: nature pebble cluster |
| №0421 app/assets/3d/user_furniture/nature_pine_columnar.glb | 265888 B | ассет графики/3D/интерфейса: nature pine columnar |
| №0422 app/assets/3d/user_furniture/nature_pine_sapling.glb | 264192 B | ассет графики/3D/интерфейса: nature pine sapling |
| №0423 app/assets/3d/user_furniture/nature_pine_spreading.glb | 265024 B | ассет графики/3D/интерфейса: nature pine spreading |
| №0424 app/assets/3d/user_furniture/nature_pine_windswept.glb | 265012 B | ассет графики/3D/интерфейса: nature pine windswept |
| №0425 app/assets/3d/user_furniture/nature_rock_pile.glb | 11840 B | ассет графики/3D/интерфейса: nature rock pile |
| №0426 app/assets/3d/user_furniture/nature_root_cluster.glb | 18436 B | ассет графики/3D/интерфейса: nature root cluster |
| №0427 app/assets/3d/user_furniture/nature_sapling_pair.glb | 267912 B | ассет графики/3D/интерфейса: nature sapling pair |
| №0428 app/assets/3d/user_furniture/nature_slab_flat.glb | 2744 B | ассет графики/3D/интерфейса: nature slab flat |
| №0429 app/assets/3d/user_furniture/nature_slab_upright.glb | 2484 B | ассет графики/3D/интерфейса: nature slab upright |
| №0430 app/assets/3d/user_furniture/nature_stump_mossy.glb | 6616 B | ассет графики/3D/интерфейса: nature stump mossy |
| №0431 app/assets/3d/user_furniture/nature_stump_oak.glb | 273776 B | ассет графики/3D/интерфейса: nature stump oak |
| №0432 app/assets/3d/user_furniture/nature_stump_pine.glb | 261388 B | ассет графики/3D/интерфейса: nature stump pine |
| №0433 app/assets/3d/user_furniture/nature_topiary_cone.glb | 7524 B | ассет графики/3D/интерфейса: nature topiary cone |
| №0434 app/assets/3d/user_furniture/parchment_stretching_frame.glb | 55508 B | ассет графики/3D/интерфейса: parchment stretching frame |
| №0435 app/assets/3d/user_furniture/physic_bench.glb | 60316 B | ассет графики/3D/интерфейса: physic bench |
| №0436 app/assets/3d/user_furniture/pigment_tray.glb | 39864 B | ассет графики/3D/интерфейса: pigment tray |
| №0437 app/assets/3d/user_furniture/quill_inkhorn_set.glb | 36956 B | ассет графики/3D/интерфейса: quill inkhorn set |
| №0438 app/assets/3d/user_furniture/rain_water_butt.glb | 45168 B | ассет графики/3D/интерфейса: rain water butt |
| №0439 app/assets/3d/user_furniture/range_and_oven.glb | 19732 B | ассет графики/3D/интерфейса: range and oven |
| №0440 app/assets/3d/user_furniture/reading_lectern.glb | 48844 B | ассет графики/3D/интерфейса: reading lectern |
| №0441 app/assets/3d/user_furniture/refectory_bench.glb | 20560 B | ассет графики/3D/интерфейса: refectory bench |
| №0442 app/assets/3d/user_furniture/refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: refectory long table |
| №0443 app/assets/3d/user_furniture/reliquary_casket.glb | 59728 B | ассет графики/3D/интерфейса: reliquary casket |
| №0444 app/assets/3d/user_furniture/road_signpost.glb | 8044 B | ассет графики/3D/интерфейса: road signpost |
| №0445 app/assets/3d/user_furniture/rug.glb | 16540 B | ассет графики/3D/интерфейса: rug |
| №0446 app/assets/3d/user_furniture/ruling_board.glb | 98032 B | ассет графики/3D/интерфейса: ruling board |
| №0447 app/assets/3d/user_furniture/rush_light_stand.glb | 19052 B | ассет графики/3D/интерфейса: rush light stand |
| №0448 app/assets/3d/user_furniture/scribes_stool.glb | 20040 B | ассет графики/3D/интерфейса: scribes stool |
| №0449 app/assets/3d/user_furniture/shop_counter.glb | 58488 B | ассет графики/3D/интерфейса: shop counter |
| №0450 app/assets/3d/user_furniture/sloped_writing_desk.glb | 341476 B | ассет графики/3D/интерфейса: sloped writing desk |
| №0451 app/assets/3d/user_furniture/spinning_wheel.glb | 21900 B | ассет графики/3D/интерфейса: spinning wheel |
| №0452 app/assets/3d/user_furniture/stone_stone_stair_vice_0.glb | 130164 B | ассет графики/3D/интерфейса: stone stone stair vice 0 |
| №0453 app/assets/3d/user_furniture/table_and_stools.glb | 34088 B | ассет графики/3D/интерфейса: table and stools |
| №0454 app/assets/3d/user_furniture/table.glb | 6217412 B | ассет графики/3D/интерфейса: table |
| №0455 app/assets/3d/user_furniture/torch_sconce.glb | 8692 B | ассет графики/3D/интерфейса: torch sconce |
| №0456 app/assets/3d/user_furniture/town_allotment_bed.glb | 42940 B | ассет графики/3D/интерфейса: town allotment bed |
| №0457 app/assets/3d/user_furniture/town_altar_with_candles.glb | 28704 B | ассет графики/3D/интерфейса: town altar with candles |
| №0458 app/assets/3d/user_furniture/town_anvil.glb | 7820 B | ассет графики/3D/интерфейса: town anvil |
| №0459 app/assets/3d/user_furniture/town_apple_tree.glb | 21880 B | ассет графики/3D/интерфейса: town apple tree |
| №0460 app/assets/3d/user_furniture/town_armour_stand.glb | 16180 B | ассет графики/3D/интерфейса: town armour stand |
| №0461 app/assets/3d/user_furniture/town_banner_pole.glb | 16800 B | ассет графики/3D/интерфейса: town banner pole |
| №0462 app/assets/3d/user_furniture/town_barrel.glb | 13340 B | ассет графики/3D/интерфейса: town barrel |
| №0463 app/assets/3d/user_furniture/town_bedroll.glb | 8964 B | ассет графики/3D/интерфейса: town bedroll |
| №0464 app/assets/3d/user_furniture/town_bench.glb | 16564 B | ассет графики/3D/интерфейса: town bench |
| №0465 app/assets/3d/user_furniture/town_boulder_large.glb | 9404 B | ассет графики/3D/интерфейса: town boulder large |
| №0466 app/assets/3d/user_furniture/town_boulder_small.glb | 4768 B | ассет графики/3D/интерфейса: town boulder small |
| №0467 app/assets/3d/user_furniture/town_bush.glb | 9188 B | ассет графики/3D/интерфейса: town bush |
| №0468 app/assets/3d/user_furniture/town_campfire_with_spit.glb | 33304 B | ассет графики/3D/интерфейса: town campfire with spit |
| №0469 app/assets/3d/user_furniture/town_canoe.glb | 15568 B | ассет графики/3D/интерфейса: town canoe |
| №0470 app/assets/3d/user_furniture/town_cargo_cart.glb | 70964 B | ассет графики/3D/интерфейса: town cargo cart |
| №0471 app/assets/3d/user_furniture/town_cauldron_on_tripod.glb | 32232 B | ассет графики/3D/интерфейса: town cauldron on tripod |
| №0472 app/assets/3d/user_furniture/town_cave_mouth.glb | 21616 B | ассет графики/3D/интерфейса: town cave mouth |
| №0473 app/assets/3d/user_furniture/town_chandelier.glb | 24996 B | ассет графики/3D/интерфейса: town chandelier |
| №0474 app/assets/3d/user_furniture/town_chicken_coop.glb | 26176 B | ассет графики/3D/интерфейса: town chicken coop |
| №0475 app/assets/3d/user_furniture/town_cobble_road_corner.glb | 18268 B | ассет графики/3D/интерфейса: town cobble road corner |
| №0476 app/assets/3d/user_furniture/town_cobble_road_junction.glb | 26024 B | ассет графики/3D/интерфейса: town cobble road junction |
| №0477 app/assets/3d/user_furniture/town_cobble_road_tile.glb | 20612 B | ассет графики/3D/интерфейса: town cobble road tile |
| №0478 app/assets/3d/user_furniture/town_cooks_kitchen.glb | 96404 B | ассет графики/3D/интерфейса: town cooks kitchen |
| №0479 app/assets/3d/user_furniture/town_cow_pen_fence.glb | 11268 B | ассет графики/3D/интерфейса: town cow pen fence |
| №0480 app/assets/3d/user_furniture/town_crate_stack.glb | 39416 B | ассет графики/3D/интерфейса: town crate stack |
| №0481 app/assets/3d/user_furniture/town_dead_tree.glb | 6196 B | ассет графики/3D/интерфейса: town dead tree |
| №0482 app/assets/3d/user_furniture/town_dirt_path_tile.glb | 9152 B | ассет графики/3D/интерфейса: town dirt path tile |
| №0483 app/assets/3d/user_furniture/town_farmhouse_and_barn.glb | 161272 B | ассет графики/3D/интерфейса: town farmhouse and barn |
| №0484 app/assets/3d/user_furniture/town_fence_gate.glb | 14544 B | ассет графики/3D/интерфейса: town fence gate |
| №0485 app/assets/3d/user_furniture/town_fence_run.glb | 28988 B | ассет графики/3D/интерфейса: town fence run |
| №0486 app/assets/3d/user_furniture/town_fern_clump.glb | 15892 B | ассет графики/3D/интерфейса: town fern clump |
| №0487 app/assets/3d/user_furniture/town_ferry_raft.glb | 31140 B | ассет графики/3D/интерфейса: town ferry raft |
| №0488 app/assets/3d/user_furniture/town_fishing_boat.glb | 25960 B | ассет графики/3D/интерфейса: town fishing boat |
| №0489 app/assets/3d/user_furniture/town_fishing_hut_on_stilts.glb | 110516 B | ассет графики/3D/интерфейса: town fishing hut on stilts |
| №0490 app/assets/3d/user_furniture/town_fletcher_shop.glb | 117300 B | ассет графики/3D/интерфейса: town fletcher shop |
| №0491 app/assets/3d/user_furniture/town_flower_patch.glb | 34768 B | ассет графики/3D/интерфейса: town flower patch |
| №0492 app/assets/3d/user_furniture/town_general_store.glb | 137904 B | ассет графики/3D/интерфейса: town general store |
| №0493 app/assets/3d/user_furniture/town_goblin_tent.glb | 15120 B | ассет графики/3D/интерфейса: town goblin tent |
| №0494 app/assets/3d/user_furniture/town_goblin_totem.glb | 27832 B | ассет графики/3D/интерфейса: town goblin totem |
| №0495 app/assets/3d/user_furniture/town_grass_ground_tile.glb | 8564 B | ассет графики/3D/интерфейса: town grass ground tile |
| №0496 app/assets/3d/user_furniture/town_grass_tuft_cluster.glb | 5080 B | ассет графики/3D/интерфейса: town grass tuft cluster |
| №0497 app/assets/3d/user_furniture/town_gravestone_set.glb | 23812 B | ассет графики/3D/интерфейса: town gravestone set |
| №0498 app/assets/3d/user_furniture/town_guard_barracks.glb | 162732 B | ассет графики/3D/интерфейса: town guard barracks |
| №0499 app/assets/3d/user_furniture/town_hand_cart.glb | 25308 B | ассет графики/3D/интерфейса: town hand cart |
| №0500 app/assets/3d/user_furniture/town_hay_bale.glb | 16340 B | ассет графики/3D/интерфейса: town hay bale |
| №0501 app/assets/3d/user_furniture/town_hitching_post.glb | 22008 B | ассет графики/3D/интерфейса: town hitching post |
| №0502 app/assets/3d/user_furniture/town_hunters_hide.glb | 33880 B | ассет графики/3D/интерфейса: town hunters hide |
| №0503 app/assets/3d/user_furniture/town_lamp_post.glb | 16804 B | ассет графики/3D/интерфейса: town lamp post |
| №0504 app/assets/3d/user_furniture/town_lily_pads.glb | 16632 B | ассет графики/3D/интерфейса: town lily pads |
| №0505 app/assets/3d/user_furniture/town_log_pile.glb | 37732 B | ассет графики/3D/интерфейса: town log pile |
| №0506 app/assets/3d/user_furniture/town_loom.glb | 46480 B | ассет графики/3D/интерфейса: town loom |
| №0507 app/assets/3d/user_furniture/town_loot_sack.glb | 11820 B | ассет графики/3D/интерфейса: town loot sack |
| №0508 app/assets/3d/user_furniture/town_market_stall_blue.glb | 61540 B | ассет графики/3D/интерфейса: town market stall blue |
| №0509 app/assets/3d/user_furniture/town_market_stall_cream.glb | 60756 B | ассет графики/3D/интерфейса: town market stall cream |
| №0510 app/assets/3d/user_furniture/town_market_stall.glb | 61536 B | ассет графики/3D/интерфейса: town market stall |
| №0511 app/assets/3d/user_furniture/town_mine_entrance.glb | 41744 B | ассет графики/3D/интерфейса: town mine entrance |
| №0512 app/assets/3d/user_furniture/town_mushroom_ring.glb | 22884 B | ассет графики/3D/интерфейса: town mushroom ring |
| №0513 app/assets/3d/user_furniture/town_notice_board.glb | 15924 B | ассет графики/3D/интерфейса: town notice board |
| №0514 app/assets/3d/user_furniture/town_oak_tree.glb | 19492 B | ассет графики/3D/интерфейса: town oak tree |
| №0515 app/assets/3d/user_furniture/town_pine_tree.glb | 7096 B | ассет графики/3D/интерфейса: town pine tree |
| №0516 app/assets/3d/user_furniture/town_plaza_paving_tile.glb | 40396 B | ассет графики/3D/интерфейса: town plaza paving tile |
| №0517 app/assets/3d/user_furniture/town_ploughed_field_tile.glb | 24992 B | ассет графики/3D/интерфейса: town ploughed field tile |
| №0518 app/assets/3d/user_furniture/town_range_and_oven.glb | 19440 B | ассет графики/3D/интерфейса: town range and oven |
| №0519 app/assets/3d/user_furniture/town_reed_clump.glb | 8672 B | ассет графики/3D/интерфейса: town reed clump |
| №0520 app/assets/3d/user_furniture/town_river_bank_tile.glb | 17528 B | ассет графики/3D/интерфейса: town river bank tile |
| №0521 app/assets/3d/user_furniture/town_river_bend_tile.glb | 27100 B | ассет графики/3D/интерфейса: town river bend tile |
| №0522 app/assets/3d/user_furniture/town_river_tile_straight.glb | 19108 B | ассет графики/3D/интерфейса: town river tile straight |
| №0523 app/assets/3d/user_furniture/town_road_signpost.glb | 7824 B | ассет графики/3D/интерфейса: town road signpost |
| №0524 app/assets/3d/user_furniture/town_rock_outcrop.glb | 10020 B | ассет графики/3D/интерфейса: town rock outcrop |
| №0525 app/assets/3d/user_furniture/town_rope_bridge.glb | 104548 B | ассет графики/3D/интерфейса: town rope bridge |
| №0526 app/assets/3d/user_furniture/town_rowing_boat.glb | 26056 B | ассет графики/3D/интерфейса: town rowing boat |
| №0527 app/assets/3d/user_furniture/town_rug.glb | 16352 B | ассет графики/3D/интерфейса: town rug |
| №0528 app/assets/3d/user_furniture/town_scarecrow.glb | 22344 B | ассет графики/3D/интерфейса: town scarecrow |
| №0529 app/assets/3d/user_furniture/town_shop_counter.glb | 61556 B | ассет графики/3D/интерфейса: town shop counter |
| №0530 app/assets/3d/user_furniture/town_smithy.glb | 105612 B | ассет графики/3D/интерфейса: town smithy |
| №0531 app/assets/3d/user_furniture/town_spinning_wheel.glb | 21608 B | ассет графики/3D/интерфейса: town spinning wheel |
| №0532 app/assets/3d/user_furniture/town_standing_stone.glb | 13276 B | ассет графики/3D/интерфейса: town standing stone |
| №0533 app/assets/3d/user_furniture/town_stone_arch_bridge.glb | 51536 B | ассет графики/3D/интерфейса: town stone arch bridge |
| №0534 app/assets/3d/user_furniture/town_stone_church.glb | 145052 B | ассет графики/3D/интерфейса: town stone church |
| №0535 app/assets/3d/user_furniture/town_stone_circle_slab.glb | 31656 B | ассет графики/3D/интерфейса: town stone circle slab |
| №0536 app/assets/3d/user_furniture/town_straw_target.glb | 15176 B | ассет графики/3D/интерфейса: town straw target |
| №0537 app/assets/3d/user_furniture/town_stump_with_axe.glb | 11880 B | ассет графики/3D/интерфейса: town stump with axe |
| №0538 app/assets/3d/user_furniture/town_table_and_stools.glb | 33848 B | ассет графики/3D/интерфейса: town table and stools |
| №0539 app/assets/3d/user_furniture/town_thatched_cottage.glb | 106096 B | ассет графики/3D/интерфейса: town thatched cottage |
| №0540 app/assets/3d/user_furniture/town_timber_house_large.glb | 262356 B | ассет графики/3D/интерфейса: town timber house large |
| №0541 app/assets/3d/user_furniture/town_timber_house_medium.glb | 169188 B | ассет графики/3D/интерфейса: town timber house medium |
| №0542 app/assets/3d/user_furniture/town_timber_house_small.glb | 119348 B | ассет графики/3D/интерфейса: town timber house small |
| №0543 app/assets/3d/user_furniture/town_timber_plank_bridge.glb | 60076 B | ассет графики/3D/интерфейса: town timber plank bridge |
| №0544 app/assets/3d/user_furniture/town_torch_sconce.glb | 8460 B | ассет графики/3D/интерфейса: town torch sconce |
| №0545 app/assets/3d/user_furniture/town_town_bank.glb | 116184 B | ассет графики/3D/интерфейса: town town bank |
| №0546 app/assets/3d/user_furniture/town_town_hall.glb | 252584 B | ассет графики/3D/интерфейса: town town hall |
| №0547 app/assets/3d/user_furniture/town_town_wall_segment.glb | 9696 B | ассет графики/3D/интерфейса: town town wall segment |
| №0548 app/assets/3d/user_furniture/town_town_well.glb | 32492 B | ассет графики/3D/интерфейса: town town well |
| №0549 app/assets/3d/user_furniture/town_treasure_chest.glb | 12404 B | ассет графики/3D/интерфейса: town treasure chest |
| №0550 app/assets/3d/user_furniture/town_village_tavern.glb | 220336 B | ассет графики/3D/интерфейса: town village tavern |
| №0551 app/assets/3d/user_furniture/town_wall_corner_tower.glb | 79592 B | ассет графики/3D/интерфейса: town wall corner tower |
| №0552 app/assets/3d/user_furniture/town_wall_gatehouse.glb | 77180 B | ассет графики/3D/интерфейса: town wall gatehouse |
| №0553 app/assets/3d/user_furniture/town_wall_stair.glb | 34040 B | ассет графики/3D/интерфейса: town wall stair |
| №0554 app/assets/3d/user_furniture/town_wall_walk_crenellated.glb | 15296 B | ассет графики/3D/интерфейса: town wall walk crenellated |
| №0555 app/assets/3d/user_furniture/town_watchtower.glb | 109556 B | ассет графики/3D/интерфейса: town watchtower |
| №0556 app/assets/3d/user_furniture/town_water_trough.glb | 18172 B | ассет графики/3D/интерфейса: town water trough |
| №0557 app/assets/3d/user_furniture/town_weapon_rack.glb | 23152 B | ассет графики/3D/интерфейса: town weapon rack |
| №0558 app/assets/3d/user_furniture/town_wheat_field_tile.glb | 55508 B | ассет графики/3D/интерфейса: town wheat field tile |
| №0559 app/assets/3d/user_furniture/town_willow_tree.glb | 26360 B | ассет графики/3D/интерфейса: town willow tree |
| №0560 app/assets/3d/user_furniture/town_windmill.glb | 121768 B | ассет графики/3D/интерфейса: town windmill |
| №0561 app/assets/3d/user_furniture/town_wizard_tower_base.glb | 64292 B | ассет графики/3D/интерфейса: town wizard tower base |
| №0562 app/assets/3d/user_furniture/town_wizard_tower_mid.glb | 70456 B | ассет графики/3D/интерфейса: town wizard tower mid |
| №0563 app/assets/3d/user_furniture/town_wizard_tower_top.glb | 50984 B | ассет графики/3D/интерфейса: town wizard tower top |
| №0564 app/assets/3d/user_furniture/treasure_chest.glb | 12772 B | ассет графики/3D/интерфейса: treasure chest |
| №0565 app/assets/3d/user_furniture/trestle_table.glb | 40424 B | ассет графики/3D/интерфейса: trestle table |
| №0566 app/assets/3d/user_furniture/weapon_rack.glb | 23300 B | ассет графики/3D/интерфейса: weapon rack |
| №0567 app/assets/3d/user_furniture/wood_stack.glb | 71136 B | ассет графики/3D/интерфейса: wood stack |
| №0568 app/assets/dice/.gitkeep | 0 B | ассет графики/3D/интерфейса: .gitkeep |
| №0569 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png | 2349861 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 07 PM |
| №0570 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_30 PM.png | 2088308 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 30 PM |
| №0571 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_13_27 PM.png | 2584925 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 13 27 PM |
| №0572 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_23_00 PM.png | 2274607 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 23 00 PM |
| №0573 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_24_38 PM.png | 2254958 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 24 38 PM |
| №0574 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_27_51 PM.png | 2389543 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 27 51 PM |
| №0575 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_35_50 PM.png | 2486441 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 35 50 PM |
| №0576 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_41_40 PM.png | 2712929 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 41 40 PM |
| №0577 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_49_58 PM.png | 2751322 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 49 58 PM |
| №0578 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_07 PM.png | 2778707 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 07 PM |
| №0579 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_18 PM.png | 2503466 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 18 PM |
| №0580 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_28 PM.png | 2561809 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 28 PM |
| №0581 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_39 PM.png | 2841483 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 39 PM |
| №0582 app/assets/dice/dice1.png | 348916 B | ассет графики/3D/интерфейса: dice1 |
| №0583 app/assets/dice/dice10-1.png | 386558 B | ассет графики/3D/интерфейса: dice10 1 |
| №0584 app/assets/dice/dice10.png | 386558 B | ассет графики/3D/интерфейса: dice10 |
| №0585 app/assets/dice/dice11.png | 307154 B | ассет графики/3D/интерфейса: dice11 |
| №0586 app/assets/dice/dice12.png | 395864 B | ассет графики/3D/интерфейса: dice12 |
| №0587 app/assets/dice/dice13.png | 344758 B | ассет графики/3D/интерфейса: dice13 |
| №0588 app/assets/dice/dice15.png | 388111 B | ассет графики/3D/интерфейса: dice15 |
| №0589 app/assets/dice/dice16.png | 352768 B | ассет графики/3D/интерфейса: dice16 |
| №0590 app/assets/dice/dice17.png | 342548 B | ассет графики/3D/интерфейса: dice17 |
| №0591 app/assets/dice/dice2.png | 246156 B | ассет графики/3D/интерфейса: dice2 |
| №0592 app/assets/dice/dice3.png | 346757 B | ассет графики/3D/интерфейса: dice3 |
| №0593 app/assets/dice/dice4.png | 348331 B | ассет графики/3D/интерфейса: dice4 |
| №0594 app/assets/dice/dice5.png | 299652 B | ассет графики/3D/интерфейса: dice5 |
| №0595 app/assets/dice/dice6.png | 331669 B | ассет графики/3D/интерфейса: dice6 |
| №0596 app/assets/dice/dice7.png | 343178 B | ассет графики/3D/интерфейса: dice7 |
| №0597 app/assets/dice/dice8.png | 370230 B | ассет графики/3D/интерфейса: dice8 |
| №0598 app/assets/dice/dice9.png | 336030 B | ассет графики/3D/интерфейса: dice9 |
| №0599 app/assets/ui/character-creation/1790622252250.png | 908119 B | ассет графики/3D/интерфейса: 1790622252250 |
| №0600 app/assets/ui/dragon_fire_burst_v2_sprite.png | 237749 B | ассет графики/3D/интерфейса: dragon fire burst v2 sprite |
| №0601 app/assets/ui/dragon_fire.png | 267960 B | ассет графики/3D/интерфейса: dragon fire |
| №0602 app/assets/ui/dragon_flight_v2_sprite.png | 573207 B | ассет графики/3D/интерфейса: dragon flight v2 sprite |
| №0603 app/assets/ui/dragon_frame_strip.svg | 858 B | ассет графики/3D/интерфейса: dragon frame strip |
| №0604 app/assets/ui/dragon.png | 274924 B | ассет графики/3D/интерфейса: dragon |
| №0605 app/assets/ui/fire_front.png | 1276760 B | ассет графики/3D/интерфейса: fire front |
| №0606 app/assets/ui/forest_burned.jpg | 211523 B | ассет графики/3D/интерфейса: forest burned |
| №0607 app/assets/ui/forest_green.jpg | 309184 B | ассет графики/3D/интерфейса: forest green |
| №0608 app/assets/ui/loader_dragon_head.svg | 2388 B | ассет графики/3D/интерфейса: loader dragon head |
| №0609 app/assets/ui/loader_fire.svg | 902 B | ассет графики/3D/интерфейса: loader fire |
| №0610 app/assets/ui/loader_forest_burning.svg | 1448 B | ассет графики/3D/интерфейса: loader forest burning |
| №0611 app/assets/ui/loader_forest.svg | 917 B | ассет графики/3D/интерфейса: loader forest |
| №0612 app/assets/ui/loader_sparks.svg | 626 B | ассет графики/3D/интерфейса: loader sparks |
| №0613 app/assets/ui/update_scene_ash.svg | 432 B | ассет графики/3D/интерфейса: update scene ash |
| №0614 app/assets/ui/update_scene_background.svg | 1141 B | ассет графики/3D/интерфейса: update scene background |
| №0615 app/assets/ui/update_scene_dragon_fire.svg | 733 B | ассет графики/3D/интерфейса: update scene dragon fire |
| №0616 app/assets/ui/update_scene_dragon.svg | 1324 B | ассет графики/3D/интерфейса: update scene dragon |
| №0617 app/assets/ui/update_scene_embers.svg | 474 B | ассет графики/3D/интерфейса: update scene embers |
| №0618 app/assets/ui/update_scene_fire_front.svg | 837 B | ассет графики/3D/интерфейса: update scene fire front |
| №0619 app/assets/ui/update_scene_forest_burned.svg | 1417 B | ассет графики/3D/интерфейса: update scene forest burned |
| №0620 app/assets/ui/update_scene_forest_green.svg | 1181 B | ассет графики/3D/интерфейса: update scene forest green |
| №0621 app/assets/ui/update_scene_smoke.svg | 417 B | ассет графики/3D/интерфейса: update scene smoke |
| №0622 app/assets/ui/vine_bone_frame_strip.svg | 943 B | ассет графики/3D/интерфейса: vine bone frame strip |
| №0623 app/Backgrounds.js | 63130 B | логический модуль: Backgrounds |
| №0624 app/battle_action_ui.js | 18386 B | логический модуль: battle action ui |
| №0625 app/battle_board.js | 37591 B | логический модуль: battle board |
| №0626 app/bestiary_2_0_v56.js | 55429 B | логический модуль: bestiary 2 0 v56 |
| №0627 app/bestiary_catalog_v56_1.js | 16222 B | логический модуль: bestiary catalog v56 1 |
| №0628 app/bestiary_catalog_v56_10.js | 10944 B | логический модуль: bestiary catalog v56 10 |
| №0629 app/bestiary_catalog_v56_11.js | 13164 B | логический модуль: bestiary catalog v56 11 |
| №0630 app/bestiary_catalog_v56_12.js | 10118 B | логический модуль: bestiary catalog v56 12 |
| №0631 app/bestiary_catalog_v56_13.js | 12586 B | логический модуль: bestiary catalog v56 13 |
| №0632 app/bestiary_catalog_v56_2.js | 13525 B | логический модуль: bestiary catalog v56 2 |
| №0633 app/bestiary_catalog_v56_3.js | 14383 B | логический модуль: bestiary catalog v56 3 |
| №0634 app/bestiary_catalog_v56_4.js | 11396 B | логический модуль: bestiary catalog v56 4 |
| №0635 app/bestiary_catalog_v56_5.js | 8648 B | логический модуль: bestiary catalog v56 5 |
| №0636 app/bestiary_catalog_v56_6.js | 9066 B | логический модуль: bestiary catalog v56 6 |
| №0637 app/bestiary_catalog_v56_7.js | 9314 B | логический модуль: bestiary catalog v56 7 |
| №0638 app/bestiary_catalog_v56_8.js | 9559 B | логический модуль: bestiary catalog v56 8 |
| №0639 app/bestiary_catalog_v56_9.js | 9861 B | логический модуль: bestiary catalog v56 9 |
| №0640 app/blood_hunter_engine.js | 82133 B | логика класса Кровавый охотник |
| №0641 app/campaign_manager.js | 7195 B | логический модуль: campaign manager |
| №0642 app/character_builder_v2.js | 109543 B | логический модуль: character builder v2 |
| №0643 app/character_creation_pergament.css | 12669 B | оформление интерфейса: character creation pergament |
| №0644 app/character_creation_pergament.js | 39686 B | логический модуль: character creation pergament |
| №0645 app/character_creation.js | 46823 B | логический модуль: character creation |
| №0646 app/character.js | 11133 B | лист персонажа; состояния и оружие |
| №0647 app/class_features_engine.js | 135018 B | логический модуль: class features engine |
| №0648 app/classesRegistry.js | 10857 B | логический модуль: classesRegistry |
| №0649 app/cloud_account.css | 1213 B | оформление интерфейса: cloud account |
| №0650 app/cloud_account.js | 8970 B | интерфейс авторизации и управления версиями |
| №0651 app/cloud_config.js | 450 B | публичная конфигурация облака |
| №0652 app/cloud_sync.js | 24647 B | синхронизация сохранений через Supabase |
| №0653 app/combat_abilities.js | 12824 B | логический модуль: combat abilities |
| №0654 app/combat_engine.js | 95078 B | движок боя и HP; адаптеры legacy значений |
| №0655 app/companion_gameplay_v27.js | 17531 B | логический модуль: companion gameplay v27 |
| №0656 app/companion_packs_v26.js | 4998 B | логический модуль: companion packs v26 |
| №0657 app/companions.js | 8943 B | логический модуль: companions |
| №0658 app/consumables.js | 15638 B | логический модуль: consumables |
| №0659 app/content_catalog.js | 9721 B | логический модуль: content catalog |
| №0660 app/content_framework.js | 9884 B | логический модуль: content framework |
| №0661 app/content_manifest.js | 3755 B | логический модуль: content manifest |
| №0662 app/crafting_character_influence_test_v46.js | 7123 B | логический модуль: crafting character influence test v46 |
| №0663 app/crafting_disassembly_repair_v51.js | 13334 B | логический модуль: crafting disassembly repair v51 |
| №0664 app/crafting_disassembly_v51.js | 11979 B | логический модуль: crafting disassembly v51 |
| №0665 app/crafting_dlc_v50.js | 8373 B | логический модуль: crafting dlc v50 |
| №0666 app/crafting_economy_v49.js | 17129 B | логический модуль: crafting economy v49 |
| №0667 app/crafting_engine_v31.js | 20294 B | логический модуль: crafting engine v31 |
| №0668 app/crafting_profession_progression_test_v47.js | 5609 B | логический модуль: crafting profession progression test v47 |
| №0669 app/crafting_profession_progression_v47.js | 35781 B | логический модуль: crafting profession progression v47 |
| №0670 app/crafting_professions_v33.js | 19300 B | логический модуль: crafting professions v33 |
| №0671 app/crafting_professions_v38.js | 48800 B | логический модуль: crafting professions v38 |
| №0672 app/crafting_resources_v34.js | 35661 B | логический модуль: crafting resources v34 |
| №0673 app/custom_crafting_v32.js | 15989 B | логический модуль: custom crafting v32 |
| №0674 app/data/classes/Accursed.js | 3369 B | логика классов: Accursed |
| №0675 app/data/classes/accursed.png | 2441667 B | логика классов: accursed |
| №0676 app/data/classes/Alchemist.js | 5589 B | логика классов: Alchemist |
| №0677 app/data/classes/alchemist.png | 1945616 B | логика классов: alchemist |
| №0678 app/data/classes/Artificer.js | 2124 B | логика классов: Artificer |
| №0679 app/data/classes/ARTIFICER.png | 891812 B | логика классов: ARTIFICER |
| №0680 app/data/classes/Barbarian.js | 3822 B | логика классов: Barbarian |
| №0681 app/data/classes/BARBARIAN.png | 815028 B | логика классов: BARBARIAN |
| №0682 app/data/classes/Bard.js | 2085 B | логика классов: Bard |
| №0683 app/data/classes/Bard.png | 769261 B | логика классов: Bard |
| №0684 app/data/classes/beasthart.png | 2255040 B | логика классов: beasthart |
| №0685 app/data/classes/Beastheart.js | 28992 B | логика классов: Beastheart |
| №0686 app/data/classes/blood hunter.png | 2210071 B | логика классов: blood hunter |
| №0687 app/data/classes/BloodHunter.js | 5283 B | логика классов: BloodHunter |
| №0688 app/data/classes/Cleric.js | 1987 B | логика классов: Cleric |
| №0689 app/data/classes/CLERIC.png | 914579 B | логика классов: CLERIC |
| №0690 app/data/classes/Druid.js | 1898 B | логика классов: Druid |
| №0691 app/data/classes/DRUID.png | 776880 B | логика классов: DRUID |
| №0692 app/data/classes/extra_class_stubs.js | 4499 B | логика классов: extra class stubs |
| №0693 app/data/classes/Fighter.js | 3771 B | логика классов: Fighter |
| №0694 app/data/classes/FIGHTER.png | 762812 B | логика классов: FIGHTER |
| №0695 app/data/classes/geist.png | 1776006 B | логика классов: geist |
| №0696 app/data/classes/Ghost.js | 295 B | логика классов: Ghost |
| №0697 app/data/classes/Illigger.js | 6058 B | логика классов: Illigger |
| №0698 app/data/classes/Illigger.png | 1716994 B | логика классов: Illigger |
| №0699 app/data/classes/level_up.js | 62903 B | логика классов: level up |
| №0700 app/data/classes/Martyr.js | 884 B | логика классов: Martyr |
| №0701 app/data/classes/martyr.png | 2381724 B | логика классов: martyr |
| №0702 app/data/classes/Monk.js | 2493 B | логика классов: Monk |
| №0703 app/data/classes/Monk.png | 1115382 B | логика классов: Monk |
| №0704 app/data/classes/Necromancer.js | 1013 B | логика классов: Necromancer |
| №0705 app/data/classes/necromancer.png | 2007714 B | логика классов: necromancer |
| №0706 app/data/classes/Occultist.js | 8507 B | логика классов: Occultist |
| №0707 app/data/classes/occultist.png | 1986332 B | логика классов: occultist |
| №0708 app/data/classes/Paladin.js | 2017 B | логика классов: Paladin |
| №0709 app/data/classes/PALADIN.png | 873991 B | логика классов: PALADIN |
| №0710 app/data/classes/Parasite.js | 545 B | логика классов: Parasite |
| №0711 app/data/classes/parasite.png | 2144116 B | логика классов: parasite |
| №0712 app/data/classes/progressionEngine.js | 20610 B | логика классов: progressionEngine |
| №0713 app/data/classes/Psion.js | 9033 B | логика классов: Psion |
| №0714 app/data/classes/psion.png | 1951350 B | логика классов: psion |
| №0715 app/data/classes/Pugilist.js | 11453 B | логика классов: Pugilist |
| №0716 app/data/classes/pugilist.png | 2022336 B | логика классов: pugilist |
| №0717 app/data/classes/Ranger.js | 1938 B | логика классов: Ranger |
| №0718 app/data/classes/RANGER.png | 643335 B | логика классов: RANGER |
| №0719 app/data/classes/Rogue.js | 3244 B | логика классов: Rogue |
| №0720 app/data/classes/Rogue.png | 579962 B | логика классов: Rogue |
| №0721 app/data/classes/rune keeper.png | 2582772 B | логика классов: rune keeper |
| №0722 app/data/classes/RuneKeeper.js | 2366 B | логика классов: RuneKeeper |
| №0723 app/data/classes/Savant.js | 930 B | логика классов: Savant |
| №0724 app/data/classes/savant.png | 1991433 B | логика классов: savant |
| №0725 app/data/classes/Shifter.js | 734 B | логика классов: Shifter |
| №0726 app/data/classes/shifter.png | 2248497 B | логика классов: shifter |
| №0727 app/data/classes/Sorcerer.js | 2098 B | логика классов: Sorcerer |
| №0728 app/data/classes/SORCERER.png | 939797 B | логика классов: SORCERER |
| №0729 app/data/classes/Swarm.js | 198 B | логика классов: Swarm |
| №0730 app/data/classes/the swam.png | 1759593 B | логика классов: the swam |
| №0731 app/data/classes/Vessel.js | 751 B | логика классов: Vessel |
| №0732 app/data/classes/vessel.png | 1943431 B | логика классов: vessel |
| №0733 app/data/classes/WalterParasite.js | 303 B | логика классов: WalterParasite |
| №0734 app/data/classes/Warden.js | 6678 B | логика классов: Warden |
| №0735 app/data/classes/warden.png | 2093561 B | логика классов: warden |
| №0736 app/data/classes/Warlock.js | 2013 B | логика классов: Warlock |
| №0737 app/data/classes/WARLOCK.png | 981038 B | логика классов: WARLOCK |
| №0738 app/data/classes/Warlord.js | 9504 B | логика классов: Warlord |
| №0739 app/data/classes/warlord.png | 2460016 B | логика классов: warlord |
| №0740 app/data/classes/Witch.js | 8032 B | логика классов: Witch |
| №0741 app/data/classes/witch.png | 1931074 B | логика классов: witch |
| №0742 app/data/classes/Wizard.js | 1627 B | логика классов: Wizard |
| №0743 app/data/classes/Wizard.png | 822251 B | логика классов: Wizard |
| №0744 app/data/feats/Feat_widget.js | 25654 B | черты и таланты: Feat widget |
| №0745 app/data/feats/Feats_phb.js | 19377 B | черты и таланты: Feats phb |
| №0746 app/data/feats/Feats_settings.js | 4392 B | черты и таланты: Feats settings |
| №0747 app/data/feats/Feats_tcoe.js | 5779 B | черты и таланты: Feats tcoe |
| №0748 app/data/feats/Feats_ua_homebrew.js | 11770 B | черты и таланты: Feats ua homebrew |
| №0749 app/data/feats/Feats_xgte.js | 6729 B | черты и таланты: Feats xgte |
| №0750 app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №0751 app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №0752 app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №0753 app/data/maps/3d_stress_test_all.json | 165139 B | данные/конфигурация: 3d stress test all |
| №0754 app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №0755 app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №0756 app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №0757 app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №0758 app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №0759 app/data/spells/Focuses.js | 53387 B | данные заклинаний: Focuses |
| №0760 app/data/spells/Spells1lvl.js | 60079 B | данные заклинаний: Spells1lvl |
| №0761 app/data/spells/Spells2lvl.js | 70401 B | данные заклинаний: Spells2lvl |
| №0762 app/data/spells/Spells3lvl.js | 48531 B | данные заклинаний: Spells3lvl |
| №0763 app/data/spells/Spells4lvl.js | 39396 B | данные заклинаний: Spells4lvl |
| №0764 app/data/spells/Spells5lvl.js | 41719 B | данные заклинаний: Spells5lvl |
| №0765 app/data/spells/spells6lvl.js | 37855 B | данные заклинаний: spells6lvl |
| №0766 app/data/spells/Spells7lvl.js | 29194 B | данные заклинаний: Spells7lvl |
| №0767 app/data/spells/Spells8lvl.js | 21355 B | данные заклинаний: Spells8lvl |
| №0768 app/data/spells/Spells9lvl.js | 32625 B | данные заклинаний: Spells9lvl |
| №0769 app/data/subclasses/subclassesRegistry.js | 111805 B | логика подклассов: subclassesRegistry |
| №0770 app/debug.js | 5961 B | логический модуль: debug |
| №0771 app/dice.js | 42492 B | логический модуль: dice |
| №0772 app/dnd_tools.js | 19419 B | логический модуль: dnd tools |
| №0773 app/expanded_bestiary_v39.js | 49383 B | логический модуль: expanded bestiary v39 |
| №0774 app/expanded_class_registry_bridge.js | 5025 B | логический модуль: expanded class registry bridge |
| №0775 app/expanded_classes_v23.js | 30269 B | логический модуль: expanded classes v23 |
| №0776 app/expanded_subclasses_v23.js | 2030 B | логический модуль: expanded subclasses v23 |
| №0777 app/expansion_class_progressions.js | 6719 B | логический модуль: expansion class progressions |
| №0778 app/expansion_classes_pack.js | 352830 B | логический модуль: expansion classes pack |
| №0779 app/Experience.js | 6150 B | логический модуль: Experience |
| №0780 app/extra_class_ui_bridge.js | 645 B | логический модуль: extra class ui bridge |
| №0781 app/feat_engine.js | 11457 B | логический модуль: feat engine |
| №0782 app/gameplay_core_v57.js | 20212 B | логический модуль: gameplay core v57 |
| №0783 app/ghost_extra_runtime.js | 22293 B | логический модуль: ghost extra runtime |
| №0784 app/ghost_extra_ui.js | 2387 B | логический модуль: ghost extra ui |
| №0785 app/Hero-info.js | 12434 B | логический модуль: Hero info |
| №0786 app/icon_settings_v2.js | 10484 B | логический модуль: icon settings v2 |
| №0787 app/icon_settings.js | 11281 B | логический модуль: icon settings |
| №0788 app/inventory_containers_v54.js | 12772 B | логический модуль: inventory containers v54 |
| №0789 app/inventory-coins.js | 23961 B | логический модуль: inventory coins |
| №0790 app/inventory-modal.js | 32494 B | логический модуль: inventory modal |
| №0791 app/Inventory-weight-tracker.js | 15712 B | логический модуль: Inventory weight tracker |
| №0792 app/Inventory.js | 36947 B | логический модуль: Inventory |
| №0793 app/junk.js | 8387 B | логический модуль: junk |
| №0794 app/kibbles_localization_content_v71.js | 32339 B | логический модуль: kibbles localization content v71 |
| №0795 app/library.js | 9314 B | логический модуль: library |
| №0796 app/Logo.js | 5742 B | логический модуль: Logo |
| №0797 app/magic_engine.js | 7570 B | логический модуль: magic engine |
| №0798 app/market_economy_v55.js | 17219 B | логический модуль: market economy v55 |
| №0799 app/market_expansion_v55_1.js | 21531 B | логический модуль: market expansion v55 1 |
| №0800 app/market_social_v55_3.js | 11752 B | логический модуль: market social v55 3 |
| №0801 app/market_trade_v55_2.js | 25582 B | логический модуль: market trade v55 2 |
| №0802 app/martyr_mhp_2024_runtime.js | 33254 B | логический модуль: martyr mhp 2024 runtime |
| №0803 app/materials.js | 11976 B | логический модуль: materials |
| №0804 app/monster_engine.js | 17873 B | логический модуль: monster engine |
| №0805 app/monster_loot_crafting_bridge_v40.js | 31518 B | логический модуль: monster loot crafting bridge v40 |
| №0806 app/monster_loot_engine_v36.js | 13559 B | логический модуль: monster loot engine v36 |
| №0807 app/monster_loot_engine_v37.js | 18554 B | логический модуль: monster loot engine v37 |
| №0808 app/necromancer_mhp_2024_runtime.js | 43556 B | логический модуль: necromancer mhp 2024 runtime |
| №0809 app/network_engine.js | 45962 B | логический модуль: network engine |
| №0810 app/network_gameplay.js | 87259 B | логический модуль: network gameplay |
| №0811 app/notes.js | 4818 B | логический модуль: notes |
| №0812 app/occultist_kibbles_v11_runtime.js | 60686 B | логический модуль: occultist kibbles v11 runtime |
| №0813 app/onboarding_faq_v71.css | 6093 B | оформление интерфейса: onboarding faq v71 |
| №0814 app/onboarding_faq_v71.js | 32373 B | логический модуль: onboarding faq v71 |
| №0815 app/parasite_extra_runtime.js | 30047 B | логический модуль: parasite extra runtime |
| №0816 app/parasite_extra_ui.js | 4710 B | логический модуль: parasite extra ui |
| №0817 app/predictor_cards.js | 145118 B | логический модуль: predictor cards |
| №0818 app/predictor_deck_ui.js | 39502 B | логический модуль: predictor deck ui |
| №0819 app/predictor_movement.js | 6682 B | логический модуль: predictor movement |
| №0820 app/predictor_runtime.js | 31001 B | логический модуль: predictor runtime |
| №0821 app/Proficiencies.js | 31253 B | логический модуль: Proficiencies |
| №0822 app/Proficienciescheck.js | 10367 B | логический модуль: Proficienciescheck |
| №0823 app/races.js | 52239 B | логический модуль: races |
| №0824 app/resource_gathering_v35.js | 12553 B | логический модуль: resource gathering v35 |
| №0825 app/resource_processing_v44.js | 22150 B | логический модуль: resource processing v44 |
| №0826 app/rulesEngine.js | 46039 B | логический модуль: rulesEngine |
| №0827 app/runekeeper_taron_v12_runtime.js | 27697 B | логический модуль: runekeeper taron v12 runtime |
| №0828 app/savant_laserllama_v561_runtime.js | 29860 B | логический модуль: savant laserllama v561 runtime |
| №0829 app/secondary_entities_engine.js | 7342 B | логический модуль: secondary entities engine |
| №0830 app/Settings_debug.js | 7336 B | логический модуль: Settings debug |
| №0831 app/Settings.js | 59645 B | логический модуль: Settings |
| №0832 app/shifter_laserllama_v2_1_runtime.js | 38454 B | логический модуль: shifter laserllama v2 1 runtime |
| №0833 app/skills.js | 6367 B | логический модуль: skills |
| №0834 app/spellblade_kibbles_runtime.js | 14261 B | логический модуль: spellblade kibbles runtime |
| №0835 app/spells.js | 39220 B | логический модуль: spells |
| №0836 app/styles.css | 24174 B | оформление интерфейса: styles |
| №0837 app/summoning_engine.js | 12861 B | логический модуль: summoning engine |
| №0838 app/swarm_extra_runtime.js | 19936 B | логический модуль: swarm extra runtime |
| №0839 app/swipe-lock.js | 1838 B | логический модуль: swipe lock |
| №0840 app/turn_planner.js | 15930 B | логический модуль: turn planner |
| №0841 app/update_manager_v2.js | 19885 B | логический модуль: update manager v2 |
| №0842 app/update_scene_v2.js | 11560 B | логический модуль: update scene v2 |
| №0843 app/vessel_laserllama_v4_runtime.js | 48055 B | логический модуль: vessel laserllama v4 runtime |
| №0844 app/vtt_character_actions_v64.js | 4047 B | логический модуль: vtt character actions v64 |
| №0845 app/vtt_character_sheet_v63.js | 3966 B | логический модуль: vtt character sheet v63 |
| №0846 app/vtt_combat_event_bus_v69.js | 8287 B | логический модуль: vtt combat event bus v69 |
| №0847 app/vtt_combat_log_v66.js | 8113 B | логический модуль: vtt combat log v66 |
| №0848 app/vtt_debug_character_lab_v702.js | 16566 B | логический модуль: vtt debug character lab v702 |
| №0849 app/vtt_debug_dice_lab_v706.js | 9112 B | логический модуль: vtt debug dice lab v706 |
| №0850 app/vtt_debug_error_log_v709.js | 5965 B | логический модуль: vtt debug error log v709 |
| №0851 app/vtt_debug_lab_v703.js | 12151 B | логический модуль: vtt debug lab v703 |
| №0852 app/vtt_debug_panel_v70.js | 17285 B | логический модуль: vtt debug panel v70 |
| №0853 app/vtt_debug_rules_matrix_v707.js | 6881 B | логический модуль: vtt debug rules matrix v707 |
| №0854 app/vtt_debug_sandbox_v701.js | 14634 B | логический модуль: vtt debug sandbox v701 |
| №0855 app/vtt_debug_scenario_editor_v705.js | 10352 B | логический модуль: vtt debug scenario editor v705 |
| №0856 app/vtt_debug_scenarios_v704.js | 8385 B | логический модуль: vtt debug scenarios v704 |
| №0857 app/vtt_debug_tasks_v708.js | 25273 B | логический модуль: vtt debug tasks v708 |
| №0858 app/vtt_dice_resolution_v65.js | 3941 B | логический модуль: vtt dice resolution v65 |
| №0859 app/vtt_encounter_checkpoint_v68.js | 9606 B | логический модуль: vtt encounter checkpoint v68 |
| №0860 app/vtt_encounter_map_v59.js | 9462 B | логический модуль: vtt encounter map v59 |
| №0861 app/vtt_gameplay_ux_v58.js | 8641 B | логический модуль: vtt gameplay ux v58 |
| №0862 app/vtt_mobile_battle_v61.js | 4559 B | логический модуль: vtt mobile battle v61 |
| №0863 app/vtt_mobile_combat_hud_v62.js | 9071 B | логический модуль: vtt mobile combat hud v62 |
| №0864 app/vtt_mobile_session_v67.js | 11143 B | логический модуль: vtt mobile session v67 |
| №0865 app/vtt_project_manifest_v70.js | 44405 B | логический модуль: vtt project manifest v70 |
| №0866 app/vtt_token_interaction_v60.js | 8542 B | логический модуль: vtt token interaction v60 |
| №0867 app/Wallpapers.js | 19943 B | логический модуль: Wallpapers |
| №0868 app/walter_parasite_extra_runtime.js | 33758 B | логический модуль: walter parasite extra runtime |
| №0869 app/walter_parasite_ui.js | 4185 B | логический модуль: walter parasite ui |
| №0870 app/warden_mhp_2024_runtime.js | 41820 B | логический модуль: warden mhp 2024 runtime |
| №0871 app/warlord_laserllama_v330_runtime.js | 15866 B | логический модуль: warlord laserllama v330 runtime |
| №0872 app/weapons.js | 3380 B | логический модуль: weapons |
| №0873 app/weaponsheavy.js | 8328 B | логический модуль: weaponsheavy |
| №0874 app/weaponsmelee.js | 20232 B | логический модуль: weaponsmelee |
| №0875 app/weaponsranged.js | 18195 B | логический модуль: weaponsranged |
| №0876 app/weaponsspecial.js | 5655 B | логический модуль: weaponsspecial |
| №0877 app/world_resource_gathering_v53.js | 17353 B | логический модуль: world resource gathering v53 |
| №0878 arcanacards.png | 1820683 B | текстура/изображение: arcanacards |
| №0879 ash_v2_sprite.png | 442476 B | текстура/изображение: ash v2 sprite |
| №0880 bed.glb | 5718760 B | 3D модель/геометрия: bed |
| №0881 bookshelf.glb | 7818348 B | 3D модель/геометрия: bookshelf |
| №0882 chair.glb | 4643004 B | 3D модель/геометрия: chair |
| №0883 closet.glb | 6550260 B | 3D модель/геометрия: closet |
| №0884 commode.glb | 4845868 B | 3D модель/геометрия: commode |
| №0885 desktop/main.cjs | 8991 B | Electron: создание окна Windows |
| №0886 desktop/preload.cjs | 2239 B | Electron: preload и мост к UI |
| №0887 desktop/prepare.cjs | 3322 B | Electron: подготовка web ресурсов |
| №0888 desktop/update.cjs | 10917 B | Electron: обновление |
| №0889 DND_VTT_FURNITURE_CONVERSION_KIT.zip | 4072 B | архив ассетов: DND VTT FURNITURE CONVERSION KIT |
| №0890 DND_VTT_FURNITURE_READY_02.zip | 65111 B | архив ассетов: DND VTT FURNITURE READY 02 |
| №0891 DND_VTT_FURNITURE_READY_03.zip | 84538 B | архив ассетов: DND VTT FURNITURE READY 03 |
| №0892 DND_VTT_FURNITURE_READY_04.zip | 133763 B | архив ассетов: DND VTT FURNITURE READY 04 |
| №0893 DND_VTT_FURNITURE_READY_05.zip | 54294 B | архив ассетов: DND VTT FURNITURE READY 05 |
| №0894 DND_VTT_FURNITURE_READY_06.zip | 89087 B | архив ассетов: DND VTT FURNITURE READY 06 |
| №0895 DND_VTT_FURNITURE_READY_07.zip | 73932 B | архив ассетов: DND VTT FURNITURE READY 07 |
| №0896 DND_VTT_FURNITURE_READY_08.zip | 67621 B | архив ассетов: DND VTT FURNITURE READY 08 |
| №0897 DND_VTT_FURNITURE_READY_09_20_MODELS.zip | 101933 B | архив ассетов: DND VTT FURNITURE READY 09 20 MODELS |
| №0898 DND_VTT_REMAINING_GLB_BULK.zip | 5302181 B | архив ассетов: DND VTT REMAINING GLB BULK |
| №0899 docs/00_AI_PROJECT_GUIDE.md | 351623 B | документация или отчёт: 00 AI PROJECT GUIDE |
| №0900 docs/00_NEW_CHAT_PROMPT_V56_10.txt | 2658 B | документация или отчёт: 00 NEW CHAT PROMPT V56 10 |
| №0901 docs/00_NEW_CHAT_PROMPT_V56_11.txt | 2118 B | документация или отчёт: 00 NEW CHAT PROMPT V56 11 |
| №0902 docs/00_NEW_CHAT_PROMPT_V56_12.txt | 763 B | документация или отчёт: 00 NEW CHAT PROMPT V56 12 |
| №0903 docs/00_NEW_CHAT_PROMPT_V56_9.txt | 3900 B | документация или отчёт: 00 NEW CHAT PROMPT V56 9 |
| №0904 docs/2026-10-09_ota_v74_00_17_checkpoint.json | 1645 B | документация или отчёт: 2026 10 09 ota v74 00 17 checkpoint |
| №0905 docs/2026-10-09_ota_v74_00_17.md | 6180 B | документация или отчёт: 2026 10 09 ota v74 00 17 |
| №0906 docs/2026-10-11_ota_v74_00_57_checkpoint.json | 469 B | документация или отчёт: 2026 10 11 ota v74 00 57 checkpoint |
| №0907 docs/2026-10-11_ota_v74_00_57.md | 5873 B | документация или отчёт: 2026 10 11 ota v74 00 57 |
| №0908 docs/3D_ASSET_IMPORT_BATCHES.md | 32725 B | документация или отчёт: 3D ASSET IMPORT BATCHES |
| №0909 docs/3d_character_anatomy/ADULT_ANATOMY_PROGRESS.md | 43788 B | документация или отчёт: ADULT ANATOMY PROGRESS |
| №0910 docs/3d_character_anatomy/ASSET_AUDIT_2026-10-12.json | 22458 B | документация или отчёт: ASSET AUDIT 2026 10 12 |
| №0911 docs/3d_character_anatomy/SKIN_MATERIAL_PIPELINE.md | 7470 B | документация или отчёт: SKIN MATERIAL PIPELINE |
| №0912 docs/3d_character_journal/2026-10-09_01_morph_architecture.md | 2418 B | документация или отчёт: 2026 10 09 01 morph architecture |
| №0913 docs/3d_character_journal/2026-10-09_02_morph_bridge.md | 2712 B | документация или отчёт: 2026 10 09 02 morph bridge |
| №0914 docs/3d_character_journal/2026-10-09_03_morph_bridge_diagnostics.md | 1768 B | документация или отчёт: 2026 10 09 03 morph bridge diagnostics |
| №0915 docs/3d_character_journal/2026-10-09_04_skin_textures.md | 4995 B | документация или отчёт: 2026 10 09 04 skin textures |
| №0916 docs/3d_character_journal/2026-10-09_05_named_makehuman_morphs.md | 8679 B | документация или отчёт: 2026 10 09 05 named makehuman morphs |
| №0917 docs/3d_character_journal/2026-10-09_06_female_stage1_checkpoint.json | 5867 B | документация или отчёт: 2026 10 09 06 female stage1 checkpoint |
| №0918 docs/3d_character_journal/2026-10-09_06_female_stage1.md | 8415 B | документация или отчёт: 2026 10 09 06 female stage1 |
| №0919 docs/3d_character_journal/2026-10-09_07_female_stage2_checkpoint.json | 871 B | документация или отчёт: 2026 10 09 07 female stage2 checkpoint |
| №0920 docs/3d_character_journal/2026-10-09_07_female_stage2.md | 7677 B | документация или отчёт: 2026 10 09 07 female stage2 |
| №0921 docs/3d_character_journal/2026-10-09_08_female_release_checkpoint.json | 1725 B | документация или отчёт: 2026 10 09 08 female release checkpoint |
| №0922 docs/3d_character_journal/2026-10-09_08_female_release.md | 7794 B | документация или отчёт: 2026 10 09 08 female release |
| №0923 docs/3d_character_journal/2026-10-10_editor_v74_00_22.md | 6792 B | документация или отчёт: 2026 10 10 editor v74 00 22 |
| №0924 docs/3d_character_journal/2026-10-11_editor_v74_00_32.md | 1158 B | документация или отчёт: 2026 10 11 editor v74 00 32 |
| №0925 docs/3d_character_journal/2026-10-11_editor_v74_00_33.md | 1260 B | документация или отчёт: 2026 10 11 editor v74 00 33 |
| №0926 docs/3d_character_journal/2026-10-11_editor_v74_00_34.md | 3336 B | документация или отчёт: 2026 10 11 editor v74 00 34 |
| №0927 docs/3d_character_journal/2026-10-11_editor_v74_00_35.md | 3249 B | документация или отчёт: 2026 10 11 editor v74 00 35 |
| №0928 docs/3d_character_races/aarakocra.md | 4966 B | документация или отчёт: aarakocra |
| №0929 docs/3d_character_races/aasimar.md | 2398 B | документация или отчёт: aasimar |
| №0930 docs/3d_character_races/ANIMAL_HEADS.md | 5724 B | документация или отчёт: ANIMAL HEADS |
| №0931 docs/3d_character_races/autognome.md | 2759 B | документация или отчёт: autognome |
| №0932 docs/3d_character_races/AVIAN_ELEPHANT_HEADS.md | 5661 B | документация или отчёт: AVIAN ELEPHANT HEADS |
| №0933 docs/3d_character_races/bugbear.md | 4059 B | документация или отчёт: bugbear |
| №0934 docs/3d_character_races/centaur.md | 2896 B | документация или отчёт: centaur |
| №0935 docs/3d_character_races/changeling.md | 2162 B | документация или отчёт: changeling |
| №0936 docs/3d_character_races/dhampir.md | 1557 B | документация или отчёт: dhampir |
| №0937 docs/3d_character_races/dragonborn.md | 5010 B | документация или отчёт: dragonborn |
| №0938 docs/3d_character_races/dwarf_hill.md | 2179 B | документация или отчёт: dwarf hill |
| №0939 docs/3d_character_races/dwarf_mountain.md | 2179 B | документация или отчёт: dwarf mountain |
| №0940 docs/3d_character_races/elf_drow.md | 4152 B | документация или отчёт: elf drow |
| №0941 docs/3d_character_races/elf_high.md | 4150 B | документация или отчёт: elf high |
| №0942 docs/3d_character_races/elf_wood.md | 4135 B | документация или отчёт: elf wood |
| №0943 docs/3d_character_races/EXTRA_FORMS_PLAN.md | 5841 B | документация или отчёт: EXTRA FORMS PLAN |
| №0944 docs/3d_character_races/fairy.md | 2154 B | документация или отчёт: fairy |
| №0945 docs/3d_character_races/firbolg.md | 1211 B | документация или отчёт: firbolg |
| №0946 docs/3d_character_races/full_orc.md | 2994 B | документация или отчёт: full orc |
| №0947 docs/3d_character_races/FUR_PACK.md | 3742 B | документация или отчёт: FUR PACK |
| №0948 docs/3d_character_races/genasi_air.md | 1474 B | документация или отчёт: genasi air |
| №0949 docs/3d_character_races/genasi_earth.md | 1519 B | документация или отчёт: genasi earth |
| №0950 docs/3d_character_races/genasi_fire.md | 1527 B | документация или отчёт: genasi fire |
| №0951 docs/3d_character_races/genasi_water.md | 1464 B | документация или отчёт: genasi water |
| №0952 docs/3d_character_races/ghost.md | 5482 B | документация или отчёт: ghost |
| №0953 docs/3d_character_races/githyanki.md | 1321 B | документация или отчёт: githyanki |
| №0954 docs/3d_character_races/githzerai.md | 1321 B | документация или отчёт: githzerai |
| №0955 docs/3d_character_races/gnome_forest.md | 2175 B | документация или отчёт: gnome forest |
| №0956 docs/3d_character_races/gnome_rock.md | 2177 B | документация или отчёт: gnome rock |
| №0957 docs/3d_character_races/goblin.md | 1278 B | документация или отчёт: goblin |
| №0958 docs/3d_character_races/goliath.md | 1362 B | документация или отчёт: goliath |
| №0959 docs/3d_character_races/hadozee.md | 4245 B | документация или отчёт: hadozee |
| №0960 docs/3d_character_races/HAIR_PACK.md | 4833 B | документация или отчёт: HAIR PACK |
| №0961 docs/3d_character_races/half_elf.md | 4189 B | документация или отчёт: half elf |
| №0962 docs/3d_character_races/half_orc.md | 3002 B | документация или отчёт: half orc |
| №0963 docs/3d_character_races/halfling_lightfoot.md | 3486 B | документация или отчёт: halfling lightfoot |
| №0964 docs/3d_character_races/halfling_stout.md | 3482 B | документация или отчёт: halfling stout |
| №0965 docs/3d_character_races/harengon.md | 5657 B | документация или отчёт: harengon |
| №0966 docs/3d_character_races/hexblood.md | 1643 B | документация или отчёт: hexblood |
| №0967 docs/3d_character_races/hobgoblin.md | 1210 B | документация или отчёт: hobgoblin |
| №0968 docs/3d_character_races/kalashtar.md | 1410 B | документация или отчёт: kalashtar |
| №0969 docs/3d_character_races/kender.md | 1159 B | документация или отчёт: kender |
| №0970 docs/3d_character_races/kenku.md | 5013 B | документация или отчёт: kenku |
| №0971 docs/3d_character_races/kobold.md | 4696 B | документация или отчёт: kobold |
| №0972 docs/3d_character_races/lizardfolk.md | 4944 B | документация или отчёт: lizardfolk |
| №0973 docs/3d_character_races/loxodon.md | 4673 B | документация или отчёт: loxodon |
| №0974 docs/3d_character_races/minotaur.md | 6054 B | документация или отчёт: minotaur |
| №0975 docs/3d_character_races/myconid.md | 1846 B | документация или отчёт: myconid |
| №0976 docs/3d_character_races/NATIVE_LIMBS.md | 6433 B | документация или отчёт: NATIVE LIMBS |
| №0977 docs/3d_character_races/owlin.md | 5120 B | документация или отчёт: owlin |
| №0978 docs/3d_character_races/parasite.md | 3100 B | документация или отчёт: parasite |
| №0979 docs/3d_character_races/plasmoid.md | 1933 B | документация или отчёт: plasmoid |
| №0980 docs/3d_character_races/RACES_3D_REMAINING_AUDIT_2026-10-12.md | 35486 B | документация или отчёт: RACES 3D REMAINING AUDIT 2026 10 12 |
| №0981 docs/3d_character_races/reborn.md | 1619 B | документация или отчёт: reborn |
| №0982 docs/3d_character_races/REMAINING_WORK.md | 23848 B | документация или отчёт: REMAINING WORK |
| №0983 docs/3d_character_races/satyr.md | 5063 B | документация или отчёт: satyr |
| №0984 docs/3d_character_races/shifter.md | 3214 B | документация или отчёт: shifter |
| №0985 docs/3d_character_races/simic_hybrid.md | 2647 B | документация или отчёт: simic hybrid |
| №0986 docs/3d_character_races/swarm_bats.md | 1019 B | документация или отчёт: swarm bats |
| №0987 docs/3d_character_races/swarm_beetles.md | 6967 B | документация или отчёт: swarm beetles |
| №0988 docs/3d_character_races/SWARM_DENSE_REDESIGN.md | 9032 B | документация или отчёт: SWARM DENSE REDESIGN |
| №0989 docs/3d_character_races/swarm_rats.md | 6463 B | документация или отчёт: swarm rats |
| №0990 docs/3d_character_races/tabaxi.md | 6015 B | документация или отчёт: tabaxi |
| №0991 docs/3d_character_races/TEXTURE_PACK_CHECKPOINT.md | 17270 B | документация или отчёт: TEXTURE PACK CHECKPOINT |
| №0992 docs/3d_character_races/TIEFLING_DETAIL_REDESIGN.md | 7294 B | документация или отчёт: TIEFLING DETAIL REDESIGN |
| №0993 docs/3d_character_races/tiefling.md | 2992 B | документация или отчёт: tiefling |
| №0994 docs/3d_character_races/tortle.md | 5805 B | документация или отчёт: tortle |
| №0995 docs/3d_character_races/triton.md | 1588 B | документация или отчёт: triton |
| №0996 docs/3d_character_races/vedalken.md | 1301 B | документация или отчёт: vedalken |
| №0997 docs/3d_character_races/walter_parasite.md | 3278 B | документация или отчёт: walter parasite |
| №0998 docs/3d_character_races/warforged.md | 2731 B | документация или отчёт: warforged |
| №0999 docs/3d_character_races/yuan_ti.md | 1669 B | документация или отчёт: yuan ti |
| №1000 docs/AI_AUTOMATION.md | 4081 B | документация или отчёт: AI AUTOMATION |
| №1001 docs/CLASS_IMPLEMENTATION_PLAN.md | 19250 B | документация или отчёт: CLASS IMPLEMENTATION PLAN |
| №1002 docs/CLASS_MECHANICS_SPEC.md | 38943 B | документация или отчёт: CLASS MECHANICS SPEC |
| №1003 docs/CLOUD_CHARACTER_SYNC.md | 31142 B | документация или отчёт: CLOUD CHARACTER SYNC |
| №1004 docs/CLOUD_SAVE_CALLERS.txt | 1869 B | документация или отчёт: CLOUD SAVE CALLERS |
| №1005 docs/CONTENT_MANAGER_ARCHITECTURE.md | 2565 B | документация или отчёт: CONTENT MANAGER ARCHITECTURE |
| №1006 docs/content-catalog-v1.json | 661 B | документация или отчёт: content catalog v1 |
| №1007 docs/content-packages/demo-race.json | 299 B | документация или отчёт: demo race |
| №1008 docs/DND_VTT_CLASS_AUDIT_V74_00_17.md | 184356 B | документация или отчёт: DND VTT CLASS AUDIT V74 00 17 |
| №1009 docs/Help.txt | 110717 B | документация или отчёт: Help |
| №1010 docs/KIBBLES_ATTRIBUTION_V71.md | 803 B | документация или отчёт: KIBBLES ATTRIBUTION V71 |
| №1011 docs/map-stage-740019.md | 1675 B | документация или отчёт: map stage 740019 |
| №1012 docs/map-stage-740021.md | 2000 B | документация или отчёт: map stage 740021 |
| №1013 docs/modular-content/audit.json | 1461290 B | документация или отчёт: audit |
| №1014 docs/modular-content/PROGRESS.md | 6626 B | документация или отчёт: PROGRESS |
| №1015 docs/modular-content/public-verification.json | 1495 B | документация или отчёт: public verification |
| №1016 docs/MONETIZATION_ROADMAP.md | 15924 B | документация или отчёт: MONETIZATION ROADMAP |
| №1017 docs/NETWORK_APK_NOTES.md | 7296 B | документация или отчёт: NETWORK APK NOTES |
| №1018 docs/PREDICTOR_APPROVED_CARD_STATUS.md | 52542 B | документация или отчёт: PREDICTOR APPROVED CARD STATUS |
| №1019 docs/PREDICTOR_CLASS_SPEC.md | 94181 B | документация или отчёт: PREDICTOR CLASS SPEC |
| №1020 docs/PRODUCT_ACCESS_AND_MONETIZATION.md | 11580 B | документация или отчёт: PRODUCT ACCESS AND MONETIZATION |
| №1021 docs/ROOT_FURNITURE_IMPORT_REPORT.md | 6882 B | документация или отчёт: ROOT FURNITURE IMPORT REPORT |
| №1022 docs/SIGNATURE_ASSET_FIX_74_00_66.md | 1729 B | документация или отчёт: SIGNATURE ASSET FIX 74 00 66 |
| №1023 docs/SUPABASE_MAIL_SETUP_PROMPT_RU.md | 2853 B | документация или отчёт: SUPABASE MAIL SETUP PROMPT RU |
| №1024 docs/UNIFIED_RELEASE.md | 6136 B | документация или отчёт: UNIFIED RELEASE |
| №1025 docs/UNITY_CHARACTER_SHEET_PARITY.md | 12064 B | документация или отчёт: UNITY CHARACTER SHEET PARITY |
| №1026 docs/UNITY_CLOUD_HANDOFF.md | 37179 B | документация или отчёт: UNITY CLOUD HANDOFF |
| №1027 docs/UNITY_MIGRATION_PLAN.md | 14710 B | документация или отчёт: UNITY MIGRATION PLAN |
| №1028 docs/WINDOWS_DESKTOP.md | 3756 B | документация или отчёт: WINDOWS DESKTOP |
| №1029 dragon_fire_v2_sprite.png | 1013123 B | текстура/изображение: dragon fire v2 sprite |
| №1030 embers_v2_sprite.png | 698014 B | текстура/изображение: embers v2 sprite |
| №1031 FAQ.md | 38563 B | документация или отчёт: FAQ |
| №1032 fire_front_v2_sprite.png | 2249732 B | текстура/изображение: fire front v2 sprite |
| №1033 fire_spread_mask_v2_sprite.png | 1373284 B | текстура/изображение: fire spread mask v2 sprite |
| №1034 flash_v2_sprite.png | 803264 B | текстура/изображение: flash v2 sprite |
| №1035 floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1036 floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1037 floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1038 floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1039 floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1040 floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1041 floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1042 floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1043 floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1044 floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1045 floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1046 floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1047 floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1048 floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1049 floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1050 floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1051 floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1052 floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1053 GLENMORIL Soundtrack - Music Box.mp3 | 1827664 B | аудиофайл: GLENMORIL Soundtrack   Music Box |
| №1054 gltf_catalog.js | 3197 B | логический модуль: gltf catalog |
| №1055 heat_glow_v2_sprite.png | 836371 B | текстура/изображение: heat glow v2 sprite |
| №1056 human-base-rigged.glb | 4994640 B | 3D модель/геометрия: human base rigged |
| №1057 index.html | 89700 B | HTML-точка входа; интерфейс и порядок JS загрузки |
| №1058 Jalan Jalan - Lotus.mp3 | 9083034 B | аудиофайл: Jalan Jalan   Lotus |
| №1059 lineage_2_16. Shepard's Flute.mp3 | 2997816 B | аудиофайл: lineage 2 16. Shepard's Flute |
| №1060 manifest.json | 488 B | данные/конфигурация: manifest |
| №1061 Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3 | 4020570 B | аудиофайл: Oliver DeRiviere   Prelude to an End (grizzlymusic.ru) |
| №1062 Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3 | 3530381 B | аудиофайл: Oliver Deriviere   Who Am I (grizzlymusic.ru) |
| №1063 package.json | 1608 B | npm и упаковка desktop EXE |
| №1064 PROJECT_ATLAS.md | генерируется | машиночитаемая карта репозитория для ИИ |
| №1065 PROJECT_ATLAS.txt | генерируется | человекочитаемая карта репозитория |
| №1066 README.md | 145 B | документация или отчёт: README |
| №1067 release-staging/unity-android-approval.json | 437 B | данные/конфигурация: unity android approval |
| №1068 release-staging/unity-release.json | 3914 B | данные/конфигурация: unity release |
| №1069 smoke_back_v2_sprite-1.png | 1707378 B | текстура/изображение: smoke back v2 sprite 1 |
| №1070 smoke_back_v2_sprite.png | 1814587 B | текстура/изображение: smoke back v2 sprite |
| №1071 smoke_front_v2_sprite-1.png | 1890480 B | текстура/изображение: smoke front v2 sprite 1 |
| №1072 smoke_front_v2_sprite.png | 2064687 B | текстура/изображение: smoke front v2 sprite |
| №1073 smoke_mid_v2_sprite.png | 1898516 B | текстура/изображение: smoke mid v2 sprite |
| №1074 supabase/migrations/202610130001_characters.sql | 4421 B | SQL миграция Supabase |
| №1075 table.glb | 6217412 B | 3D модель/геометрия: table |
| №1076 tests/ai_automation_test.cjs | 1649 B | автотест: ai automation test |
| №1077 tests/ai_finalize_test.cjs | 3840 B | автотест: ai finalize test |
| №1078 tests/alchemist_combat_test.js | 19298 B | автотест: alchemist combat test |
| №1079 tests/alchemist_runtime_test.js | 41827 B | автотест: alchemist runtime test |
| №1080 tests/character_3d_editor_test.js | 14206 B | автотест: character 3d editor test |
| №1081 tests/character_3d_foundation_test.js | 15396 B | автотест: character 3d foundation test |
| №1082 tests/character_3d_morph_assets_test.js | 5179 B | автотест: character 3d morph assets test |
| №1083 tests/character_3d_skin_assets_test.js | 1827 B | автотест: character 3d skin assets test |
| №1084 tests/character_3d_skin_morph_test.js | 3032 B | автотест: character 3d skin morph test |
| №1085 tests/character_adult_anatomy_test.js | 4704 B | автотест: character adult anatomy test |
| №1086 tests/character_animal_heads_test.js | 4415 B | автотест: character animal heads test |
| №1087 tests/character_appearance_store_test.js | 2308 B | автотест: character appearance store test |
| №1088 tests/character_avian_elephant_heads_test.js | 5125 B | автотест: character avian elephant heads test |
| №1089 tests/character_clothing_customizer_geometry_test.js | 4676 B | автотест: character clothing customizer geometry test |
| №1090 tests/character_clothing_options_test.js | 1922 B | автотест: character clothing options test |
| №1091 tests/character_clothing_test.js | 7286 B | автотест: character clothing test |
| №1092 tests/character_editor_morph_assets_test.js | 4783 B | автотест: character editor morph assets test |
| №1093 tests/character_elf_details_test.js | 2787 B | автотест: character elf details test |
| №1094 tests/character_external_anatomy_test.js | 7930 B | автотест: character external anatomy test |
| №1095 tests/character_fur_test.js | 3520 B | автотест: character fur test |
| №1096 tests/character_ghost_geometry_test.js | 3867 B | автотест: character ghost geometry test |
| №1097 tests/character_hair_pack_test.js | 2838 B | автотест: character hair pack test |
| №1098 tests/character_head_geometry_test.js | 3575 B | автотест: character head geometry test |
| №1099 tests/character_male_anatomy_fix_test.js | 3902 B | автотест: character male anatomy fix test |
| №1100 tests/character_native_limbs_test.js | 4909 B | автотест: character native limbs test |
| №1101 tests/character_parasites_geometry_test.js | 3738 B | автотест: character parasites geometry test |
| №1102 tests/character_races_geometry_test.js | 19702 B | автотест: character races geometry test |
| №1103 tests/character_reptile_heads_test.js | 3734 B | автотест: character reptile heads test |
| №1104 tests/character_skin_material_test.js | 3816 B | автотест: character skin material test |
| №1105 tests/character_stat_modes_levelup_test.cjs | 4864 B | автотест: character stat modes levelup test |
| №1106 tests/character_swarm_geometry_test.js | 3505 B | автотест: character swarm geometry test |
| №1107 tests/character_tiefling_details_test.js | 4451 B | автотест: character tiefling details test |
| №1108 tests/cloud_rls_test.sql | 5342 B | автотест: cloud rls test |
| №1109 tests/cloud_sql_concurrency.cjs | 2072 B | автотест: cloud sql concurrency |
| №1110 tests/cloud_sync_test.cjs | 19921 B | автотест: cloud sync test |
| №1111 tests/crafting_disassembly_v51_test.js | 3052 B | автотест: crafting disassembly v51 test |
| №1112 tests/crafting_dlc_v50_test.js | 2668 B | автотест: crafting dlc v50 test |
| №1113 tests/crafting_economy_v49_test.js | 1974 B | автотест: crafting economy v49 test |
| №1114 tests/creation_signature_asset_test.cjs | 3935 B | автотест: creation signature asset test |
| №1115 tests/desktop_update_contract.cjs | 4025 B | автотест: desktop update contract |
| №1116 tests/fixtures/cloud_auth.sql | 711 B | автотест: cloud auth |
| №1117 tests/fixtures/female_anatomy_74_00_59.json | 251 B | автотест: female anatomy 74 00 59 |
| №1118 tests/generate_makehuman_glb_morph_fixture.js | 4454 B | автотест: generate makehuman glb morph fixture |
| №1119 tests/gltf_loader_smoke.cjs | 3734 B | автотест: gltf loader smoke |
| №1120 tests/helpers/class_runtime_harness.js | 2323 B | автотест: class runtime harness |
| №1121 tests/human_base_glb_audit.js | 2158 B | автотест: human base glb audit |
| №1122 tests/imported_3d_editor_assets.cjs | 2157 B | автотест: imported 3d editor assets |
| №1123 tests/makehuman_gender_fixture_audit.js | 4646 B | автотест: makehuman gender fixture audit |
| №1124 tests/makehuman_gender_recipe_test.js | 5498 B | автотест: makehuman gender recipe test |
| №1125 tests/makehuman_glb_morph_fixture_audit.js | 1703 B | автотест: makehuman glb morph fixture audit |
| №1126 tests/makehuman_morph_bridge.js | 9756 B | автотест: makehuman morph bridge |
| №1127 tests/makehuman_surface_mapping_audit.js | 9447 B | автотест: makehuman surface mapping audit |
| №1128 tests/makehuman_target_reverse_transfer_audit.js | 10959 B | автотест: makehuman target reverse transfer audit |
| №1129 tests/makehuman_target_surface_transfer_audit.js | 12260 B | автотест: makehuman target surface transfer audit |
| №1130 tests/makehuman_topology_audit.js | 5878 B | автотест: makehuman topology audit |
| №1131 tests/makehuman_uv_bridge_test.js | 1465 B | автотест: makehuman uv bridge test |
| №1132 tests/makehuman_vertex_mapping_audit.js | 7410 B | автотест: makehuman vertex mapping audit |
| №1133 tests/map_editor_dom_test.js | 3347 B | автотест: map editor dom test |
| №1134 tests/map_rebuild_world_test.js | 3815 B | автотест: map rebuild world test |
| №1135 tests/predictor_aura_ledger_test.cjs | 12810 B | автотест: predictor aura ledger test |
| №1136 tests/predictor_blind_test.cjs | 4972 B | автотест: predictor blind test |
| №1137 tests/predictor_cards_test.cjs | 10793 B | автотест: predictor cards test |
| №1138 tests/predictor_cloud_sync_test.cjs | 36354 B | автотест: predictor cloud sync test |
| №1139 tests/predictor_coin_ancestor_test.cjs | 6734 B | автотест: predictor coin ancestor test |
| №1140 tests/predictor_deck_ui_test.cjs | 29014 B | автотест: predictor deck ui test |
| №1141 tests/predictor_devil_plan_test.cjs | 4680 B | автотест: predictor devil plan test |
| №1142 tests/predictor_event_reactions_test.cjs | 7259 B | автотест: predictor event reactions test |
| №1143 tests/predictor_exhaustion_test.cjs | 4867 B | автотест: predictor exhaustion test |
| №1144 tests/predictor_healing_reaction_test.cjs | 5049 B | автотест: predictor healing reaction test |
| №1145 tests/predictor_inventory_rewards_test.cjs | 14111 B | автотест: predictor inventory rewards test |
| №1146 tests/predictor_last_stand_test.cjs | 12289 B | автотест: predictor last stand test |
| №1147 tests/predictor_mage_spells_test.cjs | 29988 B | автотест: predictor mage spells test |
| №1148 tests/predictor_motion_cards_test.cjs | 11690 B | автотест: predictor motion cards test |
| №1149 tests/predictor_movement_cards_test.cjs | 7196 B | автотест: predictor movement cards test |
| №1150 tests/predictor_progression_test.cjs | 3750 B | автотест: predictor progression test |
| №1151 tests/predictor_runtime_test.cjs | 10585 B | автотест: predictor runtime test |
| №1152 tests/predictor_seven_cups_test.cjs | 12727 B | автотест: predictor seven cups test |
| №1153 tests/predictor_status_cards_test.cjs | 13936 B | автотест: predictor status cards test |
| №1154 tests/predictor_tactics_cards_test.cjs | 11334 B | автотест: predictor tactics cards test |
| №1155 tests/predictor_trickster_test.cjs | 10554 B | автотест: predictor trickster test |
| №1156 tests/predictor_turn_effects_test.cjs | 13273 B | автотест: predictor turn effects test |
| №1157 tests/predictor_vision_control_test.cjs | 12922 B | автотест: predictor vision control test |
| №1158 tests/predictor_world_truth_search_test.cjs | 5654 B | автотест: predictor world truth search test |
| №1159 tests/pugilist_combat_test.js | 21085 B | автотест: pugilist combat test |
| №1160 tests/pugilist_runtime_test.js | 4834 B | автотест: pugilist runtime test |
| №1161 tests/stair_navigation.cjs | 2520 B | автотест: stair navigation |
| №1162 tests/test_blood_hunter_completion.js | 8673 B | автотест: test blood hunter completion |
| №1163 tests/test_blood_hunter_focus_network.js | 3203 B | автотест: test blood hunter focus network |
| №1164 tests/test_blood_hunter_orders.js | 9810 B | автотест: test blood hunter orders |
| №1165 tests/test_blood_hunter_patron_selection.js | 4699 B | автотест: test blood hunter patron selection |
| №1166 tests/test_blood_hunter_profane_focus.js | 6459 B | автотест: test blood hunter profane focus |
| №1167 tests/test_class_audit_runtime.js | 14611 B | автотест: test class audit runtime |
| №1168 tests/test_class_audit_stage2_runtime.js | 15372 B | автотест: test class audit stage2 runtime |
| №1169 tests/test_class_audit_stage3_runtime.js | 16610 B | автотест: test class audit stage3 runtime |
| №1170 tests/test_class_audit_stage4_runtime.js | 23853 B | автотест: test class audit stage4 runtime |
| №1171 tests/test_v52.js | 2202 B | автотест: test v52 |
| №1172 tests/test_v53.js | 2507 B | автотест: test v53 |
| №1173 tests/test_v54.js | 2148 B | автотест: test v54 |
| №1174 tests/test_v55_2.js | 4154 B | автотест: test v55 2 |
| №1175 tests/test_v55_3.js | 2635 B | автотест: test v55 3 |
| №1176 tests/test_v55.js | 2152 B | автотест: test v55 |
| №1177 tests/test_v56_1.js | 1667 B | автотест: test v56 1 |
| №1178 tests/test_v56_10.js | 2140 B | автотест: test v56 10 |
| №1179 tests/test_v56_11.js | 1791 B | автотест: test v56 11 |
| №1180 tests/test_v56_12.js | 1665 B | автотест: test v56 12 |
| №1181 tests/test_v56_13.js | 2465 B | автотест: test v56 13 |
| №1182 tests/test_v56_2.js | 1697 B | автотест: test v56 2 |
| №1183 tests/test_v56_3.js | 1363 B | автотест: test v56 3 |
| №1184 tests/test_v56_4.js | 1458 B | автотест: test v56 4 |
| №1185 tests/test_v56_5.js | 1745 B | автотест: test v56 5 |
| №1186 tests/test_v56_6.js | 1439 B | автотест: test v56 6 |
| №1187 tests/test_v56_8.js | 1516 B | автотест: test v56 8 |
| №1188 tests/test_v56_9.js | 1734 B | автотест: test v56 9 |
| №1189 tests/test_v56.js | 3572 B | автотест: test v56 |
| №1190 tests/test_v57.js | 2554 B | автотест: test v57 |
| №1191 tests/test_v58.js | 1847 B | автотест: test v58 |
| №1192 tests/test_v59.js | 878 B | автотест: test v59 |
| №1193 tests/test_v60.js | 860 B | автотест: test v60 |
| №1194 tests/test_v61.js | 961 B | автотест: test v61 |
| №1195 tests/test_v62.js | 800 B | автотест: test v62 |
| №1196 tests/test_v63.js | 364 B | автотест: test v63 |
| №1197 tests/test_v64.js | 312 B | автотест: test v64 |
| №1198 tests/test_v65.js | 335 B | автотест: test v65 |
| №1199 tests/test_v66.js | 373 B | автотест: test v66 |
| №1200 tests/test_v67.js | 628 B | автотест: test v67 |
| №1201 tests/test_v68.js | 984 B | автотест: test v68 |
| №1202 tests/test_v69.js | 1713 B | автотест: test v69 |
| №1203 tests/test_v70.js | 2112 B | автотест: test v70 |
| №1204 tests/test_v701.js | 2425 B | автотест: test v701 |
| №1205 tests/test_v702.js | 4409 B | автотест: test v702 |
| №1206 tests/test_v703.js | 2646 B | автотест: test v703 |
| №1207 tests/test_v704.js | 2402 B | автотест: test v704 |
| №1208 tests/test_v705.js | 2717 B | автотест: test v705 |
| №1209 tests/test_v706.js | 1414 B | автотест: test v706 |
| №1210 tests/test_v707.js | 1066 B | автотест: test v707 |
| №1211 tests/test_v708_fixes.js | 2968 B | автотест: test v708 fixes |
| №1212 tests/test_v709_fixes.js | 2128 B | автотест: test v709 fixes |
| №1213 tests/test_v710_fixes.js | 2223 B | автотест: test v710 fixes |
| №1214 tests/test_v711_fixes.js | 1037 B | автотест: test v711 fixes |
| №1215 tests/test_v712_fixes.js | 1675 B | автотест: test v712 fixes |
| №1216 tests/test_v713_fixes.js | 2127 B | автотест: test v713 fixes |
| №1217 tests/test_v714_fixes.js | 1727 B | автотест: test v714 fixes |
| №1218 tests/test_v715_fixes.js | 1817 B | автотест: test v715 fixes |
| №1219 tests/test_v716_fixes.js | 1980 B | автотест: test v716 fixes |
| №1220 tests/test_v717_fixes.js | 2657 B | автотест: test v717 fixes |
| №1221 tests/test_v718_fixes.js | 1001 B | автотест: test v718 fixes |
| №1222 tests/test_v719_fixes.js | 1156 B | автотест: test v719 fixes |
| №1223 tests/test_v720_fixes.js | 1621 B | автотест: test v720 fixes |
| №1224 tests/test_v721_fixes.js | 3536 B | автотест: test v721 fixes |
| №1225 tests/test_v722_fixes.js | 3509 B | автотест: test v722 fixes |
| №1226 tests/test_v723_fixes.js | 4780 B | автотест: test v723 fixes |
| №1227 tests/test_v724_fixes.js | 2330 B | автотест: test v724 fixes |
| №1228 tests/test_v725_fixes.js | 4026 B | автотест: test v725 fixes |
| №1229 tests/test_v726_fixes.js | 3809 B | автотест: test v726 fixes |
| №1230 tests/test_v727_fixes.js | 3061 B | автотест: test v727 fixes |
| №1231 tests/test_v728_fixes.js | 2641 B | автотест: test v728 fixes |
| №1232 tests/test_v729_fixes.js | 1372 B | автотест: test v729 fixes |
| №1233 tests/test_v730_fixes.js | 2190 B | автотест: test v730 fixes |
| №1234 tests/test_v731_fixes.js | 1649 B | автотест: test v731 fixes |
| №1235 tests/test_v732_fixes.js | 2794 B | автотест: test v732 fixes |
| №1236 tests/test_v733_logic_audit.js | 2286 B | автотест: test v733 logic audit |
| №1237 tests/test_v734_network_concentration.js | 1522 B | автотест: test v734 network concentration |
| №1238 tests/test_v735_logic_rules.js | 1885 B | автотест: test v735 logic rules |
| №1239 tests/test_v736_deep_rules.js | 4307 B | автотест: test v736 deep rules |
| №1240 tests/test_v737_spellcasting_transaction.js | 5283 B | автотест: test v737 spellcasting transaction |
| №1241 tests/test_v738_multiclass_spell_sources.js | 5402 B | автотест: test v738 multiclass spell sources |
| №1242 tests/test_v739_prepared_transaction.js | 4317 B | автотест: test v739 prepared transaction |
| №1243 tests/test_v740_concentration_lifecycle.js | 2114 B | автотест: test v740 concentration lifecycle |
| №1244 tests/test_v741_damage_pipeline.js | 2462 B | автотест: test v741 damage pipeline |
| №1245 tests/test_v742_character_combatant_sync.js | 3540 B | автотест: test v742 character combatant sync |
| №1246 tests/test_v743_authority_recharge_events.js | 2228 B | автотест: test v743 authority recharge events |
| №1247 tests/test_v744_sync_authority_save.js | 2516 B | автотест: test v744 sync authority save |
| №1248 tests/test_v745_host_handoff.js | 2112 B | автотест: test v745 host handoff |
| №1249 tests/test_v746_authoritative_save_recharge.js | 3032 B | автотест: test v746 authoritative save recharge |
| №1250 tests/test_v747_event_race_compaction.js | 3064 B | автотест: test v747 event race compaction |
| №1251 tests/test_v748_full_combat_transaction.js | 5181 B | автотест: test v748 full combat transaction |
| №1252 tests/test_v749_monster_authority_reaction_order.js | 2661 B | автотест: test v749 monster authority reaction order |
| №1253 tests/test_v750_resignal_reaction_monster_rpc.js | 1973 B | автотест: test v750 resignal reaction monster rpc |
| №1254 tests/test_v751_authoritative_replay_rollback.js | 1185 B | автотест: test v751 authoritative replay rollback |
| №1255 tests/test_v752_replay_hash_authority.js | 2033 B | автотест: test v752 replay hash authority |
| №1256 tests/test_v753_replay_transaction_rng.js | 1195 B | автотест: test v753 replay transaction rng |
| №1257 tests/test_v754_update_manager.js | 2816 B | автотест: test v754 update manager |
| №1258 tests/test_v755_creation_buckets.js | 3973 B | автотест: test v755 creation buckets |
| №1259 tests/test_v755_update_scene.js | 3625 B | автотест: test v755 update scene |
| №1260 tests/update_ota_flow_test.js | 9661 B | автотест: update ota flow test |
| №1261 tools/ai_automation.cjs | 2383 B | скрипт разработчика: ai automation |
| №1262 tools/ai_checks.cjs | 1068 B | скрипт разработчика: ai checks |
| №1263 tools/ai_finalize.cjs | 2199 B | скрипт разработчика: ai finalize |
| №1264 tools/audit_adult_body_assets.py | 5868 B | скрипт разработчика: audit adult body assets |
| №1265 tools/audit_modular_content.py | 3852 B | скрипт разработчика: audit modular content |
| №1266 tools/build_character_editor_morphs.js | 4493 B | скрипт разработчика: build character editor morphs |
| №1267 tools/build_cloud_tests.sh | 1945 B | скрипт разработчика: build cloud tests |
| №1268 tools/build_makehuman_morphs.js | 8803 B | скрипт разработчика: build makehuman morphs |
| №1269 tools/build_skin_microtexture.py | 1254 B | скрипт разработчика: build skin microtexture |
| №1270 tools/build_update_manifest.py | 3881 B | скрипт разработчика: build update manifest |
| №1271 tools/check_adult_anatomy_browser.js | 7862 B | скрипт разработчика: check adult anatomy browser |
| №1272 tools/check_adult_base_browser.js | 4732 B | скрипт разработчика: check adult base browser |
| №1273 tools/check_animal_heads_browser.js | 6045 B | скрипт разработчика: check animal heads browser |
| №1274 tools/check_avian_elephant_heads_browser.js | 6052 B | скрипт разработчика: check avian elephant heads browser |
| №1275 tools/check_avian_races_browser.js | 6195 B | скрипт разработчика: check avian races browser |
| №1276 tools/check_character_clothing_closeups.js | 3941 B | скрипт разработчика: check character clothing closeups |
| №1277 tools/check_character_clothing_customizer.js | 8611 B | скрипт разработчика: check character clothing customizer |
| №1278 tools/check_character_dress_customizer.js | 4892 B | скрипт разработчика: check character dress customizer |
| №1279 tools/check_character_editor_browser.js | 24473 B | скрипт разработчика: check character editor browser |
| №1280 tools/check_character_head_browser.js | 7169 B | скрипт разработчика: check character head browser |
| №1281 tools/check_character_races_browser.js | 14773 B | скрипт разработчика: check character races browser |
| №1282 tools/check_cloud_account_browser.cjs | 7054 B | скрипт разработчика: check cloud account browser |
| №1283 tools/check_dense_swarm_browser.js | 6299 B | скрипт разработчика: check dense swarm browser |
| №1284 tools/check_elf_details_browser.js | 5791 B | скрипт разработчика: check elf details browser |
| №1285 tools/check_external_anatomy_browser.js | 9967 B | скрипт разработчика: check external anatomy browser |
| №1286 tools/check_feather_surface_browser.js | 8888 B | скрипт разработчика: check feather surface browser |
| №1287 tools/check_fur_browser.js | 6062 B | скрипт разработчика: check fur browser |
| №1288 tools/check_fur_surface_browser.js | 8973 B | скрипт разработчика: check fur surface browser |
| №1289 tools/check_ghost_browser.js | 8977 B | скрипт разработчика: check ghost browser |
| №1290 tools/check_hair_pack_browser.js | 5826 B | скрипт разработчика: check hair pack browser |
| №1291 tools/check_kobold_tabaxi_browser.js | 6240 B | скрипт разработчика: check kobold tabaxi browser |
| №1292 tools/check_last_races_browser.js | 7457 B | скрипт разработчика: check last races browser |
| №1293 tools/check_male_anatomy_browser.js | 6082 B | скрипт разработчика: check male anatomy browser |
| №1294 tools/check_map_browser.js | 3805 B | скрипт разработчика: check map browser |
| №1295 tools/check_mechanical_races_browser.js | 6158 B | скрипт разработчика: check mechanical races browser |
| №1296 tools/check_modular_races_browser.js | 5826 B | скрипт разработчика: check modular races browser |
| №1297 tools/check_native_limbs_browser.js | 7153 B | скрипт разработчика: check native limbs browser |
| №1298 tools/check_parasites_browser.js | 6584 B | скрипт разработчика: check parasites browser |
| №1299 tools/check_pose_browser.js | 7090 B | скрипт разработчика: check pose browser |
| №1300 tools/check_quartet_races_browser.js | 6706 B | скрипт разработчика: check quartet races browser |
| №1301 tools/check_reptile_heads_browser.js | 5336 B | скрипт разработчика: check reptile heads browser |
| №1302 tools/check_reptile_races_browser.js | 5781 B | скрипт разработчика: check reptile races browser |
| №1303 tools/check_reptile_surface_browser.js | 7114 B | скрипт разработчика: check reptile surface browser |
| №1304 tools/check_skin_material_browser.js | 11016 B | скрипт разработчика: check skin material browser |
| №1305 tools/check_small_armor_browser.js | 3698 B | скрипт разработчика: check small armor browser |
| №1306 tools/check_swarm_browser.js | 7847 B | скрипт разработчика: check swarm browser |
| №1307 tools/check_tiefling_browser.js | 7273 B | скрипт разработчика: check tiefling browser |
| №1308 tools/check_tiefling_details_browser.js | 6694 B | скрипт разработчика: check tiefling details browser |
| №1309 tools/cloud_test.init.gradle | 781 B | скрипт разработчика: cloud test.init |
| №1310 tools/convert_remaining_furniture.py | 4297 B | скрипт разработчика: convert remaining furniture |
| №1311 tools/finalize_v741.py | 3280 B | скрипт разработчика: finalize v741 |
| №1312 tools/generate_project_atlas.cjs | 12690 B | автоматический генератор этого атласа |
| №1313 tools/install_native_build_tools.sh | 2975 B | скрипт разработчика: install native build tools |
| №1314 tools/makehuman_gender_channels.json | 4749 B | скрипт разработчика: makehuman gender channels |
| №1315 tools/makehuman_morph_channels.json | 448 B | скрипт разработчика: makehuman morph channels |
| №1316 tools/prepare_makehuman_gender.js | 5599 B | скрипт разработчика: prepare makehuman gender |
| №1317 tools/run_tests_v731.js | 5062 B | скрипт разработчика: run tests v731 |
| №1318 tools/sync_manifest.py | 2034 B | скрипт разработчика: sync manifest |
| №1319 tools/test_cloud_sql.sh | 1088 B | скрипт разработчика: test cloud sql |
| №1320 tools/unified_version.py | 3403 B | скрипт разработчика: unified version |
| №1321 unity/.gitattributes | 451 B | вспомогательный файл: .gitattributes |
| №1322 unity/.gitignore | 368 B | вспомогательный файл: .gitignore |
| №1323 unity/ANDROID_UPDATES.md | 3652 B | документация или отчёт: ANDROID UPDATES |
| №1324 unity/Assets/DefaultVolumeProfile.asset | 20474 B | вспомогательный файл: DefaultVolumeProfile |
| №1325 unity/Assets/DefaultVolumeProfile.asset.meta | 189 B | вспомогательный файл: DefaultVolumeProfile.asset |
| №1326 unity/Assets/LegacyContent.meta | 172 B | вспомогательный файл: LegacyContent |
| №1327 unity/Assets/LegacyContent/Catalog.asset | 9068 B | вспомогательный файл: Catalog |
| №1328 unity/Assets/LegacyContent/Catalog.asset.meta | 189 B | вспомогательный файл: Catalog.asset |
| №1329 unity/Assets/LegacyContent/geometry-contract.json | 2446 B | данные/конфигурация: geometry contract |
| №1330 unity/Assets/LegacyContent/geometry-contract.json.meta | 158 B | вспомогательный файл: geometry contract.json |
| №1331 unity/Assets/LegacyContent/Materials.meta | 172 B | вспомогательный файл: Materials |
| №1332 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat | 3851 B | вспомогательный файл: floor ceramic tile dark |
| №1333 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat.meta | 188 B | вспомогательный файл: floor ceramic tile dark.mat |
| №1334 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat | 3852 B | вспомогательный файл: floor ceramic tile light |
| №1335 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat.meta | 188 B | вспомогательный файл: floor ceramic tile light.mat |
| №1336 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat | 3846 B | вспомогательный файл: floor checker tile |
| №1337 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat.meta | 188 B | вспомогательный файл: floor checker tile.mat |
| №1338 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat | 3845 B | вспомогательный файл: floor cobblestone |
| №1339 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat.meta | 188 B | вспомогательный файл: floor cobblestone.mat |
| №1340 unity/Assets/LegacyContent/Materials/floor_earth.mat | 3838 B | вспомогательный файл: floor earth |
| №1341 unity/Assets/LegacyContent/Materials/floor_earth.mat.meta | 188 B | вспомогательный файл: floor earth.mat |
| №1342 unity/Assets/LegacyContent/Materials/floor_grass.mat | 3839 B | вспомогательный файл: floor grass |
| №1343 unity/Assets/LegacyContent/Materials/floor_grass.mat.meta | 188 B | вспомогательный файл: floor grass.mat |
| №1344 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat | 3841 B | вспомогательный файл: floor hex tile |
| №1345 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat.meta | 188 B | вспомогательный файл: floor hex tile.mat |
| №1346 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat | 3844 B | вспомогательный файл: floor marble dark |
| №1347 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat.meta | 188 B | вспомогательный файл: floor marble dark.mat |
| №1348 unity/Assets/LegacyContent/Materials/floor_marble_light.mat | 3846 B | вспомогательный файл: floor marble light |
| №1349 unity/Assets/LegacyContent/Materials/floor_marble_light.mat.meta | 188 B | вспомогательный файл: floor marble light.mat |
| №1350 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat | 3852 B | вспомогательный файл: floor parquet herringbone |
| №1351 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat.meta | 188 B | вспомогательный файл: floor parquet herringbone.mat |
| №1352 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat | 3841 B | вспомогательный файл: floor rug blue |
| №1353 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat.meta | 188 B | вспомогательный файл: floor rug blue.mat |
| №1354 unity/Assets/LegacyContent/Materials/floor_rug_green.mat | 3842 B | вспомогательный файл: floor rug green |
| №1355 unity/Assets/LegacyContent/Materials/floor_rug_green.mat.meta | 188 B | вспомогательный файл: floor rug green.mat |
| №1356 unity/Assets/LegacyContent/Materials/floor_rug_red.mat | 3840 B | вспомогательный файл: floor rug red |
| №1357 unity/Assets/LegacyContent/Materials/floor_rug_red.mat.meta | 188 B | вспомогательный файл: floor rug red.mat |
| №1358 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat | 3848 B | вспомогательный файл: floor stone tile dark |
| №1359 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat.meta | 188 B | вспомогательный файл: floor stone tile dark.mat |
| №1360 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat | 3849 B | вспомогательный файл: floor stone tile light |
| №1361 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat.meta | 188 B | вспомогательный файл: floor stone tile light.mat |
| №1362 unity/Assets/LegacyContent/Materials/floor_tatami.mat | 3840 B | вспомогательный файл: floor tatami |
| №1363 unity/Assets/LegacyContent/Materials/floor_tatami.mat.meta | 188 B | вспомогательный файл: floor tatami.mat |
| №1364 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat | 3842 B | вспомогательный файл: floor wood dark |
| №1365 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat.meta | 188 B | вспомогательный файл: floor wood dark.mat |
| №1366 unity/Assets/LegacyContent/Materials/floor_wood_light.mat | 3842 B | вспомогательный файл: floor wood light |
| №1367 unity/Assets/LegacyContent/Materials/floor_wood_light.mat.meta | 188 B | вспомогательный файл: floor wood light.mat |
| №1368 unity/Assets/LegacyContent/Materials/wall_brick_red.mat | 3842 B | вспомогательный файл: wall brick red |
| №1369 unity/Assets/LegacyContent/Materials/wall_brick_red.mat.meta | 188 B | вспомогательный файл: wall brick red.mat |
| №1370 unity/Assets/LegacyContent/Materials/wall_concrete.mat | 3841 B | вспомогательный файл: wall concrete |
| №1371 unity/Assets/LegacyContent/Materials/wall_concrete.mat.meta | 188 B | вспомогательный файл: wall concrete.mat |
| №1372 unity/Assets/LegacyContent/Materials/wall_half_timber.mat | 3844 B | вспомогательный файл: wall half timber |
| №1373 unity/Assets/LegacyContent/Materials/wall_half_timber.mat.meta | 188 B | вспомогательный файл: wall half timber.mat |
| №1374 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat | 3843 B | вспомогательный файл: wall marble dark |
| №1375 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat.meta | 188 B | вспомогательный файл: wall marble dark.mat |
| №1376 unity/Assets/LegacyContent/Materials/wall_marble_light.mat | 3845 B | вспомогательный файл: wall marble light |
| №1377 unity/Assets/LegacyContent/Materials/wall_marble_light.mat.meta | 188 B | вспомогательный файл: wall marble light.mat |
| №1378 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat | 3843 B | вспомогательный файл: wall moss stone |
| №1379 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat.meta | 188 B | вспомогательный файл: wall moss stone.mat |
| №1380 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat | 3843 B | вспомогательный файл: wall old plaster |
| №1381 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat.meta | 188 B | вспомогательный файл: wall old plaster.mat |
| №1382 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat | 3844 B | вспомогательный файл: wall plaster dark |
| №1383 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat.meta | 188 B | вспомогательный файл: wall plaster dark.mat |
| №1384 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat | 3846 B | вспомогательный файл: wall plaster light |
| №1385 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat.meta | 188 B | вспомогательный файл: wall plaster light.mat |
| №1386 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat | 3846 B | вспомогательный файл: wall plaster panel |
| №1387 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat.meta | 188 B | вспомогательный файл: wall plaster panel.mat |
| №1388 unity/Assets/LegacyContent/Materials/wall_slate.mat | 3837 B | вспомогательный файл: wall slate |
| №1389 unity/Assets/LegacyContent/Materials/wall_slate.mat.meta | 188 B | вспомогательный файл: wall slate.mat |
| №1390 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat | 3842 B | вспомогательный файл: wall stone dark |
| №1391 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat.meta | 188 B | вспомогательный файл: wall stone dark.mat |
| №1392 unity/Assets/LegacyContent/Materials/wall_stone_light.mat | 3843 B | вспомогательный файл: wall stone light |
| №1393 unity/Assets/LegacyContent/Materials/wall_stone_light.mat.meta | 188 B | вспомогательный файл: wall stone light.mat |
| №1394 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat | 3845 B | вспомогательный файл: wall stone masonry |
| №1395 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat.meta | 188 B | вспомогательный файл: wall stone masonry.mat |
| №1396 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat | 3841 B | вспомогательный файл: wall wallpaper |
| №1397 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat.meta | 188 B | вспомогательный файл: wall wallpaper.mat |
| №1398 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat | 3845 B | вспомогательный файл: wall white plaster |
| №1399 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat.meta | 188 B | вспомогательный файл: wall white plaster.mat |
| №1400 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat | 3841 B | вспомогательный файл: wall wood dark |
| №1401 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat.meta | 188 B | вспомогательный файл: wall wood dark.mat |
| №1402 unity/Assets/LegacyContent/Materials/wall_wood_light.mat | 3843 B | вспомогательный файл: wall wood light |
| №1403 unity/Assets/LegacyContent/Materials/wall_wood_light.mat.meta | 188 B | вспомогательный файл: wall wood light.mat |
| №1404 unity/Assets/LegacyContent/provenance.json | 28556 B | данные/конфигурация: provenance |
| №1405 unity/Assets/LegacyContent/provenance.json.meta | 158 B | вспомогательный файл: provenance.json |
| №1406 unity/Assets/LegacyContent/Source.meta | 172 B | вспомогательный файл: Source |
| №1407 unity/Assets/LegacyContent/Source/app.meta | 172 B | вспомогательный файл: app |
| №1408 unity/Assets/LegacyContent/Source/app/assets.meta | 172 B | вспомогательный файл: assets |
| №1409 unity/Assets/LegacyContent/Source/app/assets/3d.meta | 172 B | вспомогательный файл: 3d |
| №1410 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius.meta | 172 B | вспомогательный файл: quaternius |
| №1411 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models.meta | 172 B | вспомогательный файл: models |
| №1412 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin | 27188 B | 3D модель/геометрия: Bag |
| №1413 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin.meta | 155 B | вспомогательный файл: Bag.bin |
| №1414 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf | 4614 B | 3D модель/геометрия: Bag |
| №1415 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf.meta | 2193 B | вспомогательный файл: Bag.gltf |
| №1416 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | 3D модель/геометрия: Barrel Apples |
| №1417 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin.meta | 155 B | вспомогательный файл: Barrel Apples.bin |
| №1418 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6660 B | 3D модель/геометрия: Barrel Apples |
| №1419 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf.meta | 2849 B | вспомогательный файл: Barrel Apples.gltf |
| №1420 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin | 57144 B | 3D модель/геометрия: Barrel |
| №1421 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin.meta | 155 B | вспомогательный файл: Barrel.bin |
| №1422 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf | 4607 B | 3D модель/геометрия: Barrel |
| №1423 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf.meta | 2199 B | вспомогательный файл: Barrel.gltf |
| №1424 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | 3D модель/геометрия: Bed Twin1 |
| №1425 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin.meta | 155 B | вспомогательный файл: Bed Twin1.bin |
| №1426 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6636 B | 3D модель/геометрия: Bed Twin1 |
| №1427 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf.meta | 2841 B | вспомогательный файл: Bed Twin1.gltf |
| №1428 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin | 19304 B | 3D модель/геометрия: Bench |
| №1429 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin.meta | 155 B | вспомогательный файл: Bench.bin |
| №1430 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf | 4594 B | 3D модель/геометрия: Bench |
| №1431 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf.meta | 2197 B | вспомогательный файл: Bench.gltf |
| №1432 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | 3D модель/геометрия: Book Stack 2 |
| №1433 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin.meta | 155 B | вспомогательный файл: Book Stack 2.bin |
| №1434 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4605 B | 3D модель/геометрия: Book Stack 2 |
| №1435 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf.meta | 2187 B | вспомогательный файл: Book Stack 2.gltf |
| №1436 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | 3D модель/геометрия: Bookcase 2 |
| №1437 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin.meta | 155 B | вспомогательный файл: Bookcase 2.bin |
| №1438 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf | 4625 B | 3D модель/геометрия: Bookcase 2 |
| №1439 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf.meta | 2207 B | вспомогательный файл: Bookcase 2.gltf |
| №1440 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | 3D модель/геометрия: Bottle 1 |
| №1441 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin.meta | 155 B | вспомогательный файл: Bottle 1.bin |
| №1442 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf | 2586 B | 3D модель/геометрия: Bottle 1 |
| №1443 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf.meta | 1543 B | вспомогательный файл: Bottle 1.gltf |
| №1444 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | 3D модель/геометрия: Candle 2 |
| №1445 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin.meta | 155 B | вспомогательный файл: Candle 2.bin |
| №1446 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf | 2350 B | 3D модель/геометрия: Candle 2 |
| №1447 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf.meta | 1543 B | вспомогательный файл: Candle 2.gltf |
| №1448 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | 3D модель/геометрия: CandleStick Triple |
| №1449 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin.meta | 155 B | вспомогательный файл: CandleStick Triple.bin |
| №1450 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 4168 B | 3D модель/геометрия: CandleStick Triple |
| №1451 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf.meta | 2199 B | вспомогательный файл: CandleStick Triple.gltf |
| №1452 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | 3D модель/геометрия: Chair 1 |
| №1453 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin.meta | 155 B | вспомогательный файл: Chair 1.bin |
| №1454 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf | 4608 B | 3D модель/геометрия: Chair 1 |
| №1455 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf.meta | 2201 B | вспомогательный файл: Chair 1.gltf |
| №1456 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin | 15644 B | 3D модель/геометрия: Chalice |
| №1457 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin.meta | 155 B | вспомогательный файл: Chalice.bin |
| №1458 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf | 2356 B | 3D модель/геометрия: Chalice |
| №1459 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf.meta | 1541 B | вспомогательный файл: Chalice.gltf |
| №1460 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | 3D модель/геометрия: Chandelier |
| №1461 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin.meta | 155 B | вспомогательный файл: Chandelier.bin |
| №1462 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf | 6678 B | 3D модель/геометрия: Chandelier |
| №1463 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf.meta | 2843 B | вспомогательный файл: Chandelier.gltf |
| №1464 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | 3D модель/геометрия: Chest Wood |
| №1465 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin.meta | 155 B | вспомогательный файл: Chest Wood.bin |
| №1466 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf | 18141 B | 3D модель/геометрия: Chest Wood |
| №1467 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes | 22924 B | вспомогательный файл: Chest Wood.gltf |
| №1468 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes.meta | 158 B | вспомогательный файл: Chest Wood.gltf.bytes |
| №1469 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.meta | 720 B | вспомогательный файл: Chest Wood.gltf |
| №1470 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin | 14464 B | 3D модель/геометрия: Coin |
| №1471 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin.meta | 155 B | вспомогательный файл: Coin.bin |
| №1472 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf | 2581 B | 3D модель/геометрия: Coin |
| №1473 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf.meta | 1535 B | вспомогательный файл: Coin.gltf |
| №1474 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin | 12488 B | 3D модель/геометрия: Mug |
| №1475 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin.meta | 155 B | вспомогательный файл: Mug.bin |
| №1476 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf | 4149 B | 3D модель/геометрия: Mug |
| №1477 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf.meta | 2193 B | вспомогательный файл: Mug.gltf |
| №1478 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | 3D модель/геометрия: Pouch Large |
| №1479 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin.meta | 155 B | вспомогательный файл: Pouch Large.bin |
| №1480 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf | 4602 B | 3D модель/геометрия: Pouch Large |
| №1481 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf.meta | 2185 B | вспомогательный файл: Pouch Large.gltf |
| №1482 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | 3D модель/геометрия: Rope 1 |
| №1483 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin.meta | 155 B | вспомогательный файл: Rope 1.bin |
| №1484 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf | 2382 B | 3D модель/геометрия: Rope 1 |
| №1485 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf.meta | 1563 B | вспомогательный файл: Rope 1.gltf |
| №1486 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | 3D модель/геометрия: Shelf Simple |
| №1487 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin.meta | 155 B | вспомогательный файл: Shelf Simple.bin |
| №1488 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2383 B | 3D модель/геометрия: Shelf Simple |
| №1489 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf.meta | 1575 B | вспомогательный файл: Shelf Simple.gltf |
| №1490 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin | 11472 B | 3D модель/геометрия: Stool |
| №1491 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin.meta | 155 B | вспомогательный файл: Stool.bin |
| №1492 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf | 2596 B | 3D модель/геометрия: Stool |
| №1493 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf.meta | 1561 B | вспомогательный файл: Stool.gltf |
| №1494 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png | 1936754 B | текстура/изображение: T Trim Cloth BaseColor |
| №1495 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Cloth BaseColor.png |
| №1496 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png | 3920858 B | текстура/изображение: T Trim Cloth Normal |
| №1497 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Cloth Normal.png |
| №1498 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png | 623426 B | текстура/изображение: T Trim Cloth ORM |
| №1499 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Cloth ORM.png |
| №1500 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png | 2232961 B | текстура/изображение: T Trim Furniture BaseColor |
| №1501 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Furniture BaseColor.png |
| №1502 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png | 3485710 B | текстура/изображение: T Trim Furniture Normal |
| №1503 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Furniture Normal.png |
| №1504 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png | 2064585 B | текстура/изображение: T Trim Furniture ORM |
| №1505 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Furniture ORM.png |
| №1506 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png | 1361221 B | текстура/изображение: T Trim Metal BaseColor |
| №1507 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Metal BaseColor.png |
| №1508 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png | 3625541 B | текстура/изображение: T Trim Metal Normal |
| №1509 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Metal Normal.png |
| №1510 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png | 1871475 B | текстура/изображение: T Trim Metal ORM |
| №1511 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Metal ORM.png |
| №1512 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png | 2263132 B | текстура/изображение: T Trim Props BaseColor |
| №1513 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Props BaseColor.png |
| №1514 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png | 4441458 B | текстура/изображение: T Trim Props Normal |
| №1515 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Props Normal.png |
| №1516 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png | 3017151 B | текстура/изображение: T Trim Props ORM |
| №1517 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Props ORM.png |
| №1518 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | 3D модель/геометрия: Table Fork |
| №1519 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin.meta | 155 B | вспомогательный файл: Table Fork.bin |
| №1520 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf | 2348 B | 3D модель/геометрия: Table Fork |
| №1521 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf.meta | 1547 B | вспомогательный файл: Table Fork.gltf |
| №1522 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | 3D модель/геометрия: Table Knife |
| №1523 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin.meta | 155 B | вспомогательный файл: Table Knife.bin |
| №1524 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf | 2345 B | 3D модель/геометрия: Table Knife |
| №1525 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf.meta | 1549 B | вспомогательный файл: Table Knife.gltf |
| №1526 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | 3D модель/геометрия: Table Large |
| №1527 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin.meta | 155 B | вспомогательный файл: Table Large.bin |
| №1528 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf | 4612 B | 3D модель/геометрия: Table Large |
| №1529 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf.meta | 2209 B | вспомогательный файл: Table Large.gltf |
| №1530 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | 3D модель/геометрия: Table Plate |
| №1531 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin.meta | 155 B | вспомогательный файл: Table Plate.bin |
| №1532 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf | 2358 B | 3D модель/геометрия: Table Plate |
| №1533 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf.meta | 1549 B | вспомогательный файл: Table Plate.gltf |
| №1534 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | 3D модель/геометрия: Table Spoon |
| №1535 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin.meta | 155 B | вспомогательный файл: Table Spoon.bin |
| №1536 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf | 2350 B | 3D модель/геометрия: Table Spoon |
| №1537 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf.meta | 1549 B | вспомогательный файл: Table Spoon.gltf |
| №1538 unity/Assets/LegacyContent/Source/app/data.meta | 172 B | вспомогательный файл: data |
| №1539 unity/Assets/LegacyContent/Source/app/data/maps.meta | 172 B | вспомогательный файл: maps |
| №1540 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №1541 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json.meta | 158 B | вспомогательный файл: 3d castle black rose v740030.json |
| №1542 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №1543 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json.meta | 158 B | вспомогательный файл: 3d castle v740019.json |
| №1544 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №1545 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json.meta | 158 B | вспомогательный файл: 3d house v740019.json |
| №1546 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json | 170566 B | данные/конфигурация: 3d stress test all |
| №1547 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json.meta | 158 B | вспомогательный файл: 3d stress test all.json |
| №1548 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №1549 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json.meta | 158 B | вспомогательный файл: 3d stress v740026.json |
| №1550 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №1551 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json.meta | 158 B | вспомогательный файл: 3d tavern v740019.json |
| №1552 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №1553 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json.meta | 158 B | вспомогательный файл: 3d test dungeon.json |
| №1554 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №1555 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json.meta | 158 B | вспомогательный файл: 3d town v740019.json |
| №1556 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №1557 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json.meta | 158 B | вспомогательный файл: 3d village v740019.json |
| №1558 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1559 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png.meta | 3009 B | вспомогательный файл: floor ceramic tile dark.png |
| №1560 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1561 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png.meta | 3009 B | вспомогательный файл: floor ceramic tile light.png |
| №1562 unity/Assets/LegacyContent/Source/floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1563 unity/Assets/LegacyContent/Source/floor_checker_tile.png.meta | 3009 B | вспомогательный файл: floor checker tile.png |
| №1564 unity/Assets/LegacyContent/Source/floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1565 unity/Assets/LegacyContent/Source/floor_cobblestone.png.meta | 3009 B | вспомогательный файл: floor cobblestone.png |
| №1566 unity/Assets/LegacyContent/Source/floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1567 unity/Assets/LegacyContent/Source/floor_earth.png.meta | 3009 B | вспомогательный файл: floor earth.png |
| №1568 unity/Assets/LegacyContent/Source/floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1569 unity/Assets/LegacyContent/Source/floor_grass.png.meta | 3009 B | вспомогательный файл: floor grass.png |
| №1570 unity/Assets/LegacyContent/Source/floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1571 unity/Assets/LegacyContent/Source/floor_hex_tile.png.meta | 3009 B | вспомогательный файл: floor hex tile.png |
| №1572 unity/Assets/LegacyContent/Source/floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1573 unity/Assets/LegacyContent/Source/floor_marble_dark.png.meta | 3009 B | вспомогательный файл: floor marble dark.png |
| №1574 unity/Assets/LegacyContent/Source/floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1575 unity/Assets/LegacyContent/Source/floor_marble_light.png.meta | 3009 B | вспомогательный файл: floor marble light.png |
| №1576 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1577 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png.meta | 3009 B | вспомогательный файл: floor parquet herringbone.png |
| №1578 unity/Assets/LegacyContent/Source/floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1579 unity/Assets/LegacyContent/Source/floor_rug_blue.png.meta | 3009 B | вспомогательный файл: floor rug blue.png |
| №1580 unity/Assets/LegacyContent/Source/floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1581 unity/Assets/LegacyContent/Source/floor_rug_green.png.meta | 3009 B | вспомогательный файл: floor rug green.png |
| №1582 unity/Assets/LegacyContent/Source/floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1583 unity/Assets/LegacyContent/Source/floor_rug_red.png.meta | 3009 B | вспомогательный файл: floor rug red.png |
| №1584 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1585 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png.meta | 3009 B | вспомогательный файл: floor stone tile dark.png |
| №1586 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1587 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png.meta | 3009 B | вспомогательный файл: floor stone tile light.png |
| №1588 unity/Assets/LegacyContent/Source/floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1589 unity/Assets/LegacyContent/Source/floor_tatami.png.meta | 3009 B | вспомогательный файл: floor tatami.png |
| №1590 unity/Assets/LegacyContent/Source/floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1591 unity/Assets/LegacyContent/Source/floor_wood_dark.png.meta | 3009 B | вспомогательный файл: floor wood dark.png |
| №1592 unity/Assets/LegacyContent/Source/floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1593 unity/Assets/LegacyContent/Source/floor_wood_light.png.meta | 3009 B | вспомогательный файл: floor wood light.png |
| №1594 unity/Assets/LegacyContent/Source/wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1595 unity/Assets/LegacyContent/Source/wall_brick_red.png.meta | 3009 B | вспомогательный файл: wall brick red.png |
| №1596 unity/Assets/LegacyContent/Source/wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1597 unity/Assets/LegacyContent/Source/wall_concrete.png.meta | 3009 B | вспомогательный файл: wall concrete.png |
| №1598 unity/Assets/LegacyContent/Source/wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1599 unity/Assets/LegacyContent/Source/wall_half_timber.png.meta | 3009 B | вспомогательный файл: wall half timber.png |
| №1600 unity/Assets/LegacyContent/Source/wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1601 unity/Assets/LegacyContent/Source/wall_marble_dark.png.meta | 3009 B | вспомогательный файл: wall marble dark.png |
| №1602 unity/Assets/LegacyContent/Source/wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1603 unity/Assets/LegacyContent/Source/wall_marble_light.png.meta | 3009 B | вспомогательный файл: wall marble light.png |
| №1604 unity/Assets/LegacyContent/Source/wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1605 unity/Assets/LegacyContent/Source/wall_moss_stone.png.meta | 3009 B | вспомогательный файл: wall moss stone.png |
| №1606 unity/Assets/LegacyContent/Source/wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1607 unity/Assets/LegacyContent/Source/wall_old_plaster.png.meta | 3009 B | вспомогательный файл: wall old plaster.png |
| №1608 unity/Assets/LegacyContent/Source/wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1609 unity/Assets/LegacyContent/Source/wall_plaster_dark.png.meta | 3009 B | вспомогательный файл: wall plaster dark.png |
| №1610 unity/Assets/LegacyContent/Source/wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1611 unity/Assets/LegacyContent/Source/wall_plaster_light.png.meta | 3009 B | вспомогательный файл: wall plaster light.png |
| №1612 unity/Assets/LegacyContent/Source/wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1613 unity/Assets/LegacyContent/Source/wall_plaster_panel.png.meta | 3009 B | вспомогательный файл: wall plaster panel.png |
| №1614 unity/Assets/LegacyContent/Source/wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1615 unity/Assets/LegacyContent/Source/wall_slate.png.meta | 3009 B | вспомогательный файл: wall slate.png |
| №1616 unity/Assets/LegacyContent/Source/wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1617 unity/Assets/LegacyContent/Source/wall_stone_dark.png.meta | 3009 B | вспомогательный файл: wall stone dark.png |
| №1618 unity/Assets/LegacyContent/Source/wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1619 unity/Assets/LegacyContent/Source/wall_stone_light.png.meta | 3009 B | вспомогательный файл: wall stone light.png |
| №1620 unity/Assets/LegacyContent/Source/wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1621 unity/Assets/LegacyContent/Source/wall_stone_masonry.png.meta | 3009 B | вспомогательный файл: wall stone masonry.png |
| №1622 unity/Assets/LegacyContent/Source/wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1623 unity/Assets/LegacyContent/Source/wall_wallpaper.png.meta | 3009 B | вспомогательный файл: wall wallpaper.png |
| №1624 unity/Assets/LegacyContent/Source/wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1625 unity/Assets/LegacyContent/Source/wall_white_plaster.png.meta | 3009 B | вспомогательный файл: wall white plaster.png |
| №1626 unity/Assets/LegacyContent/Source/wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1627 unity/Assets/LegacyContent/Source/wall_wood_dark.png.meta | 3009 B | вспомогательный файл: wall wood dark.png |
| №1628 unity/Assets/LegacyContent/Source/wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1629 unity/Assets/LegacyContent/Source/wall_wood_light.png.meta | 3009 B | вспомогательный файл: wall wood light.png |
| №1630 unity/Assets/Plugins.meta | 172 B | вспомогательный файл: Plugins |
| №1631 unity/Assets/Plugins/Android.meta | 172 B | вспомогательный файл: Android |
| №1632 unity/Assets/Plugins/Android/UpdateProvider.java | 4306 B | вспомогательный файл: UpdateProvider |
| №1633 unity/Assets/Plugins/Android/UpdateProvider.java.meta | 60 B | вспомогательный файл: UpdateProvider.java |
| №1634 unity/Assets/StreamingAssets/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1635 unity/Assets/StreamingAssets/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1636 unity/Assets/StreamingAssets/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1637 unity/Assets/UniversalRenderPipelineGlobalSettings.asset | 25900 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings |
| №1638 unity/Assets/UniversalRenderPipelineGlobalSettings.asset.meta | 189 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings.asset |
| №1639 unity/Assets/Vtt.meta | 172 B | вспомогательный файл: Vtt |
| №1640 unity/Assets/Vtt/Editor.meta | 172 B | вспомогательный файл: Editor |
| №1641 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs | 21157 B | вспомогательный файл: CharacterSheetValidation |
| №1642 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs.meta | 59 B | вспомогательный файл: CharacterSheetValidation.cs |
| №1643 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs | 10734 B | вспомогательный файл: LegacyMigrationSetup |
| №1644 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSetup.cs |
| №1645 unity/Assets/Vtt/Editor/PrototypeSetup.cs | 7704 B | вспомогательный файл: PrototypeSetup |
| №1646 unity/Assets/Vtt/Editor/PrototypeSetup.cs.meta | 59 B | вспомогательный файл: PrototypeSetup.cs |
| №1647 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs | 7015 B | вспомогательный файл: UnityReleaseBuild |
| №1648 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs.meta | 60 B | вспомогательный файл: UnityReleaseBuild.cs |
| №1649 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs | 3636 B | вспомогательный файл: WorkshopBundleBuild |
| №1650 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs.meta | 60 B | вспомогательный файл: WorkshopBundleBuild.cs |
| №1651 unity/Assets/Vtt/Resources.meta | 172 B | вспомогательный файл: Resources |
| №1652 unity/Assets/Vtt/Resources/Branding.meta | 172 B | вспомогательный файл: Branding |
| №1653 unity/Assets/Vtt/Resources/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1654 unity/Assets/Vtt/Resources/Branding/Dragon20.png.meta | 312 B | вспомогательный файл: Dragon20.png |
| №1655 unity/Assets/Vtt/Resources/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1656 unity/Assets/Vtt/Resources/Branding/Splash19.png.meta | 312 B | вспомогательный файл: Splash19.png |
| №1657 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1658 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg.meta | 312 B | вспомогательный файл: Wallpaper16.jpg |
| №1659 unity/Assets/Vtt/Resources/Changelog.json | 6219 B | данные/конфигурация: Changelog |
| №1660 unity/Assets/Vtt/Resources/Changelog.json.meta | 158 B | вспомогательный файл: Changelog.json |
| №1661 unity/Assets/Vtt/Resources/CharacterSheet.meta | 172 B | вспомогательный файл: CharacterSheet |
| №1662 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json | 1259265 B | данные/конфигурация: catalog |
| №1663 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json.meta | 158 B | вспомогательный файл: catalog.json |
| №1664 unity/Assets/Vtt/Runtime.meta | 172 B | вспомогательный файл: Runtime |
| №1665 unity/Assets/Vtt/Runtime/CharacterCreation.cs | 8639 B | вспомогательный файл: CharacterCreation |
| №1666 unity/Assets/Vtt/Runtime/CharacterCreation.cs.meta | 59 B | вспомогательный файл: CharacterCreation.cs |
| №1667 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs | 16128 B | вспомогательный файл: CharacterSheetRules |
| №1668 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs.meta | 59 B | вспомогательный файл: CharacterSheetRules.cs |
| №1669 unity/Assets/Vtt/Runtime/ClientPreferences.cs | 4297 B | вспомогательный файл: ClientPreferences |
| №1670 unity/Assets/Vtt/Runtime/ClientPreferences.cs.meta | 59 B | вспомогательный файл: ClientPreferences.cs |
| №1671 unity/Assets/Vtt/Runtime/ExplorerController.cs | 5869 B | вспомогательный файл: ExplorerController |
| №1672 unity/Assets/Vtt/Runtime/ExplorerController.cs.meta | 59 B | вспомогательный файл: ExplorerController.cs |
| №1673 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs | 808 B | вспомогательный файл: LegacyContentCatalog |
| №1674 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs.meta | 59 B | вспомогательный файл: LegacyContentCatalog.cs |
| №1675 unity/Assets/Vtt/Runtime/LegacyDocuments.cs | 9096 B | вспомогательный файл: LegacyDocuments |
| №1676 unity/Assets/Vtt/Runtime/LegacyDocuments.cs.meta | 59 B | вспомогательный файл: LegacyDocuments.cs |
| №1677 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs | 14727 B | вспомогательный файл: LegacyMapPresenter |
| №1678 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs.meta | 59 B | вспомогательный файл: LegacyMapPresenter.cs |
| №1679 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs | 3065 B | вспомогательный файл: LegacyMigrationSmoke |
| №1680 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSmoke.cs |
| №1681 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs | 15036 B | вспомогательный файл: LegacySessionPanel.Branding |
| №1682 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Branding.cs |
| №1683 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs | 10194 B | вспомогательный файл: LegacySessionPanel.BrandSettings |
| №1684 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.BrandSettings.cs |
| №1685 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs | 12667 B | вспомогательный файл: LegacySessionPanel.ContentManager |
| №1686 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs | 7648 B | вспомогательный файл: LegacySessionPanel |
| №1687 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.cs |
| №1688 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs | 24370 B | вспомогательный файл: LegacySessionPanel.FrontEnd |
| №1689 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.FrontEnd.cs |
| №1690 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs | 8889 B | вспомогательный файл: LegacySessionPanel.Settings |
| №1691 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Settings.cs |
| №1692 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs | 29467 B | вспомогательный файл: LegacySessionPanel.Sheet |
| №1693 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Sheet.cs |
| №1694 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs | 13243 B | вспомогательный файл: LegacySessionPanel.Updates |
| №1695 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Updates.cs |
| №1696 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs | 2534 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary |
| №1697 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary.cs |
| №1698 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs | 3139 B | вспомогательный файл: PrototypeSmoke |
| №1699 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs.meta | 59 B | вспомогательный файл: PrototypeSmoke.cs |
| №1700 unity/Assets/Vtt/Runtime/UnityRelease.cs | 5985 B | вспомогательный файл: UnityRelease |
| №1701 unity/Assets/Vtt/Runtime/UnityRelease.cs.meta | 60 B | вспомогательный файл: UnityRelease.cs |
| №1702 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs | 6620 B | вспомогательный файл: WorkshopRuntime |
| №1703 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs.meta | 60 B | вспомогательный файл: WorkshopRuntime.cs |
| №1704 unity/Assets/Vtt/Runtime/WorkshopStore.cs | 13437 B | вспомогательный файл: WorkshopStore |
| №1705 unity/Assets/Vtt/Runtime/WorkshopStore.cs.meta | 60 B | вспомогательный файл: WorkshopStore.cs |
| №1706 unity/Assets/Vtt/Scenes.meta | 172 B | вспомогательный файл: Scenes |
| №1707 unity/Assets/Vtt/Scenes/Exploration.unity | 49176 B | вспомогательный файл: Exploration |
| №1708 unity/Assets/Vtt/Scenes/Exploration.unity.meta | 155 B | вспомогательный файл: Exploration.unity |
| №1709 unity/Assets/Vtt/Scenes/ImportedAdventure.unity | 2328750 B | вспомогательный файл: ImportedAdventure |
| №1710 unity/Assets/Vtt/Scenes/ImportedAdventure.unity.meta | 155 B | вспомогательный файл: ImportedAdventure.unity |
| №1711 unity/Assets/Vtt/Settings.meta | 172 B | вспомогательный файл: Settings |
| №1712 unity/Assets/Vtt/Settings/Explorer.mat | 3799 B | вспомогательный файл: Explorer |
| №1713 unity/Assets/Vtt/Settings/Explorer.mat.meta | 188 B | вспомогательный файл: Explorer.mat |
| №1714 unity/Assets/Vtt/Settings/ExplorerRenderer.asset | 1865 B | вспомогательный файл: ExplorerRenderer |
| №1715 unity/Assets/Vtt/Settings/ExplorerRenderer.asset.meta | 189 B | вспомогательный файл: ExplorerRenderer.asset |
| №1716 unity/Assets/Vtt/Settings/ExplorerURP.asset | 4690 B | вспомогательный файл: ExplorerURP |
| №1717 unity/Assets/Vtt/Settings/ExplorerURP.asset.meta | 189 B | вспомогательный файл: ExplorerURP.asset |
| №1718 unity/Assets/Vtt/Settings/Stone.mat | 3795 B | вспомогательный файл: Stone |
| №1719 unity/Assets/Vtt/Settings/Stone.mat.meta | 188 B | вспомогательный файл: Stone.mat |
| №1720 unity/Assets/Vtt/Settings/Wall.mat | 3793 B | вспомогательный файл: Wall |
| №1721 unity/Assets/Vtt/Settings/Wall.mat.meta | 188 B | вспомогательный файл: Wall.mat |
| №1722 unity/Assets/Vtt/Tests.meta | 172 B | вспомогательный файл: Tests |
| №1723 unity/Assets/Vtt/Tests/sheet-contract.json | 195912 B | данные/конфигурация: sheet contract |
| №1724 unity/Assets/Vtt/Tests/sheet-contract.json.meta | 158 B | вспомогательный файл: sheet contract.json |
| №1725 unity/ci/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №1726 unity/ci/check_sheet_provenance.py | 2365 B | вспомогательный файл: check sheet provenance |
| №1727 unity/ci/cloud_release.py | 14328 B | вспомогательный файл: cloud release |
| №1728 unity/ci/promote_candidate.py | 4640 B | вспомогательный файл: promote candidate |
| №1729 unity/ci/publish_android_update.py | 6308 B | вспомогательный файл: publish android update |
| №1730 unity/ci/requirements.txt | 21 B | документация или отчёт: requirements |
| №1731 unity/ci/test_brand_visual_contract.py | 3012 B | вспомогательный файл: test brand visual contract |
| №1732 unity/ci/test_cloud_release.py | 10089 B | вспомогательный файл: test cloud release |
| №1733 unity/ci/test_content_registry_contract.py | 1174 B | вспомогательный файл: test content registry contract |
| №1734 unity/ci/test_update_settings_contract.py | 3975 B | вспомогательный файл: test update settings contract |
| №1735 unity/ci/transfer-signing-secrets.ps1 | 3449 B | вспомогательный файл: transfer signing secrets |
| №1736 unity/ci/verify_public_workshop.py | 1506 B | вспомогательный файл: verify public workshop |
| №1737 unity/ci/windows-upgrade-qa.ps1 | 3846 B | вспомогательный файл: windows upgrade qa |
| №1738 unity/ci/workshop-tests/.gitignore | 10 B | вспомогательный файл: .gitignore |
| №1739 unity/ci/workshop-tests/Program.cs | 10040 B | вспомогательный файл: Program |
| №1740 unity/ci/workshop-tests/WorkshopTests.csproj | 799 B | вспомогательный файл: WorkshopTests |
| №1741 unity/evidence/exploration.png | 119417 B | текстура/изображение: exploration |
| №1742 unity/Installer/release-notes.md | 1582 B | документация или отчёт: release notes |
| №1743 unity/Installer/UnitySetup.nsi | 3417 B | вспомогательный файл: UnitySetup |
| №1744 unity/Packages/manifest.json | 565 B | данные/конфигурация: manifest |
| №1745 unity/Packages/packages-lock.json | 6359 B | данные/конфигурация: packages lock |
| №1746 unity/ProjectSettings/AudioManager.asset | 523 B | вспомогательный файл: AudioManager |
| №1747 unity/ProjectSettings/ClusterInputManager.asset | 114 B | вспомогательный файл: ClusterInputManager |
| №1748 unity/ProjectSettings/DynamicsManager.asset | 1574 B | вспомогательный файл: DynamicsManager |
| №1749 unity/ProjectSettings/EditorBuildSettings.asset | 401 B | вспомогательный файл: EditorBuildSettings |
| №1750 unity/ProjectSettings/EditorSettings.asset | 1603 B | вспомогательный файл: EditorSettings |
| №1751 unity/ProjectSettings/GraphicsSettings.asset | 2615 B | вспомогательный файл: GraphicsSettings |
| №1752 unity/ProjectSettings/InputManager.asset | 9754 B | вспомогательный файл: InputManager |
| №1753 unity/ProjectSettings/MemorySettings.asset | 1226 B | вспомогательный файл: MemorySettings |
| №1754 unity/ProjectSettings/MultiplayerManager.asset | 232 B | вспомогательный файл: MultiplayerManager |
| №1755 unity/ProjectSettings/NavMeshAreas.asset | 1361 B | вспомогательный файл: NavMeshAreas |
| №1756 unity/ProjectSettings/Physics2DSettings.asset | 1862 B | вспомогательный файл: Physics2DSettings |
| №1757 unity/ProjectSettings/PresetManager.asset | 146 B | вспомогательный файл: PresetManager |
| №1758 unity/ProjectSettings/ProjectSettings.asset | 22468 B | вспомогательный файл: ProjectSettings |
| №1759 unity/ProjectSettings/ProjectVersion.txt | 85 B | документация или отчёт: ProjectVersion |
| №1760 unity/ProjectSettings/QualitySettings.asset | 9858 B | вспомогательный файл: QualitySettings |
| №1761 unity/ProjectSettings/SceneTemplateSettings.json | 3535 B | данные/конфигурация: SceneTemplateSettings |
| №1762 unity/ProjectSettings/ShaderGraphSettings.asset | 633 B | вспомогательный файл: ShaderGraphSettings |
| №1763 unity/ProjectSettings/TagManager.asset | 411 B | вспомогательный файл: TagManager |
| №1764 unity/ProjectSettings/TimeManager.asset | 305 B | вспомогательный файл: TimeManager |
| №1765 unity/ProjectSettings/UnityConnectSettings.asset | 1063 B | вспомогательный файл: UnityConnectSettings |
| №1766 unity/ProjectSettings/VersionControlSettings.asset | 172 B | вспомогательный файл: VersionControlSettings |
| №1767 unity/ProjectSettings/VFXManager.asset | 525 B | вспомогательный файл: VFXManager |
| №1768 unity/PUBLIC_DELIVERY.json | 973 B | данные/конфигурация: PUBLIC DELIVERY |
| №1769 unity/README.md | 9382 B | документация или отчёт: README |
| №1770 unity/release.ps1 | 7750 B | вспомогательный файл: release |
| №1771 unity/Tools/sync_character_sheet.cjs | 11570 B | логический модуль: sync character sheet |
| №1772 unity/Tools/sync_legacy_content.cjs | 5736 B | логический модуль: sync legacy content |
| №1773 unity/VALIDATION.md | 32688 B | документация или отчёт: VALIDATION |
| №1774 unity/verify.ps1 | 2809 B | вспомогательный файл: verify |
| №1775 updates/beta.json | 211 B | метаданные обновлений: beta |
| №1776 updates/previous-stable.json | 179808 B | метаданные обновлений: previous stable |
| №1777 updates/README.md | 233 B | документация или отчёт: README |
| №1778 updates/stable.json | 179809 B | метаданные обновлений: stable |
| №1779 updates/unity-changelog.json | 6219 B | метаданные обновлений: unity changelog |
| №1780 updates/unity-experiment.json | 1601 B | метаданные обновлений: unity experiment |
| №1781 vignette_v2_sprite.png | 1213593 B | текстура/изображение: vignette v2 sprite |
| №1782 VTT_PROJECT_MANIFEST_V70.json | 44370 B | устаревший список V70, не актуален |
| №1783 wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1784 wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1785 wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1786 wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1787 wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1788 wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1789 wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1790 wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1791 wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1792 wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1793 wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1794 wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1795 wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1796 wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1797 wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1798 wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1799 wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1800 wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1801 wallpapers/1.png | 1460744 B | ассет графики/3D/интерфейса: 1 |
| №1802 wallpapers/10.png | 1667723 B | ассет графики/3D/интерфейса: 10 |
| №1803 wallpapers/11.png | 1815959 B | ассет графики/3D/интерфейса: 11 |
| №1804 wallpapers/12.png | 1548677 B | ассет графики/3D/интерфейса: 12 |
| №1805 wallpapers/13.png | 1599093 B | ассет графики/3D/интерфейса: 13 |
| №1806 wallpapers/14.png | 1596513 B | ассет графики/3D/интерфейса: 14 |
| №1807 wallpapers/15.png | 233043 B | ассет графики/3D/интерфейса: 15 |
| №1808 wallpapers/16.png | 212684 B | ассет графики/3D/интерфейса: 16 |
| №1809 wallpapers/17.png | 1585122 B | ассет графики/3D/интерфейса: 17 |
| №1810 wallpapers/18.png | 2095852 B | ассет графики/3D/интерфейса: 18 |
| №1811 wallpapers/19.png | 8605503 B | ассет графики/3D/интерфейса: 19 |
| №1812 wallpapers/2.png | 1590206 B | ассет графики/3D/интерфейса: 2 |
| №1813 wallpapers/20.png | 1284815 B | ассет графики/3D/интерфейса: 20 |
| №1814 wallpapers/21.png | 179307 B | ассет графики/3D/интерфейса: 21 |
| №1815 wallpapers/22.png | 344279 B | ассет графики/3D/интерфейса: 22 |
| №1816 wallpapers/23.png | 210291 B | ассет графики/3D/интерфейса: 23 |
| №1817 wallpapers/24.png | 141215 B | ассет графики/3D/интерфейса: 24 |
| №1818 wallpapers/25.png | 160892 B | ассет графики/3D/интерфейса: 25 |
| №1819 wallpapers/26.png | 187259 B | ассет графики/3D/интерфейса: 26 |
| №1820 wallpapers/27.png | 213194 B | ассет графики/3D/интерфейса: 27 |
| №1821 wallpapers/28.png | 202417 B | ассет графики/3D/интерфейса: 28 |
| №1822 wallpapers/29.png | 166942 B | ассет графики/3D/интерфейса: 29 |
| №1823 wallpapers/3.png | 1662340 B | ассет графики/3D/интерфейса: 3 |
| №1824 wallpapers/30.png | 237556 B | ассет графики/3D/интерфейса: 30 |
| №1825 wallpapers/31.svg | 1181 B | ассет графики/3D/интерфейса: 31 |
| №1826 wallpapers/32.svg | 1417 B | ассет графики/3D/интерфейса: 32 |
| №1827 wallpapers/4.png | 1816114 B | ассет графики/3D/интерфейса: 4 |
| №1828 wallpapers/5.png | 1742466 B | ассет графики/3D/интерфейса: 5 |
| №1829 wallpapers/6.png | 1591016 B | ассет графики/3D/интерфейса: 6 |
| №1830 wallpapers/7.png | 1815665 B | ассет графики/3D/интерфейса: 7 |
| №1831 wallpapers/8.png | 1492730 B | ассет графики/3D/интерфейса: 8 |
| №1832 wallpapers/9.png | 1715179 B | ассет графики/3D/интерфейса: 9 |

## Реестр имён, переменных и ключей

Имена сгруппированы по роли. Ссылка №NNNN указывает на путь в таблице файлов выше; остальные вхождения ищите в исходниках.
Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.


### JS объявления/параметры (4944)

| Имя | Исходные файлы |
|---|---|
| _ | №0057 (+ 11 других файлов) |
| __ls | №1204 (+ 4 других файлов) |
| __shifterProgression | №0832 |
| __TEST_SRC__ | №1204 (+ 4 других файлов) |
| _event | №0886 |
| _wc | №0885 |
| a | №0058 (+ 143 других файлов) |
| A | №0057 (+ 5 других файлов) |
| a0 | №1127 (+ 1 других файлов) |
| a1 | №1127 (+ 1 других файлов) |
| a2 | №1127 (+ 1 других файлов) |
| aa | №0060 (+ 1 других файлов) |
| ab | №0057 (+ 10 других файлов) |
| abilities | №0783 |
| ability | №0076 (+ 6 других файлов) |
| ABILITY | №0797 |
| abilityMod | №0778 |
| abName | №0653 |
| AbortController | №1110 |
| above | №0060 (+ 2 других файлов) |
| absent | №0667 |
| absolute | №1772 |
| absorbed | №0654 (+ 1 других файлов) |
| ac | №0060 (+ 25 других файлов) |
| ACADEMIES | №0871 |
| academy | №0775 (+ 1 других файлов) |
| academyEffects | №0778 |
| acBase | №0790 |
| acBaseInp | №0790 |
| acc | №0835 (+ 4 других файлов) |
| acCalcBaseSel | №0790 |
| ACCEPT | №0801 |
| access | №0669 (+ 1 других файлов) |
| accessors | №1126 (+ 4 других файлов) |
| accessory | №0062 |
| accIndex | №1118 |
| account | №0650 |
| ACCURSED_CURSE_FEATURES | №0778 |
| ACCURSED_CURSES | №0778 |
| ACCURSED_METAMORPHOSES | №0778 |
| acidAttack | №1079 |
| acInput | №0082 (+ 1 других файлов) |
| acInputEl | №0792 |
| across | №0060 |
| action | №0076 (+ 21 других файлов) |
| actionBtn | №0791 |
| actionHandler | №0809 |
| actionId | №0824 |
| actionIndex | №0837 |
| actionName | №0810 |
| actionResultsByPeer | №0809 |
| actions | №0077 (+ 6 других файлов) |
| ACTIONS | №0782 |
| actionSpent | №0654 |
| actionStr | №0789 |
| actionTokenId | №0624 |
| active | №0060 (+ 15 других файлов) |
| ACTIVE | №0781 |
| activeBonuses | №0792 |
| activeBtns | №0771 |
| activeCat | №0790 |
| activeCategory | №0792 (+ 1 других файлов) |
| activeClass | №0811 |
| activeColsWallet | №0789 |
| activeEffects | №0077 |
| activeFolder | №0811 |
| activeFolderId | №1771 |
| activeHero | №0831 (+ 1 других файлов) |
| activeId | №0817 |
| activeLvl | №0831 |
| activeNow | №0772 |
| activeStats | №0792 |
| activeTab | №0062 |
| activeWp | №0867 |
| actor | №0654 (+ 10 других файлов) |
| actorId | №0782 (+ 1 других файлов) |
| actors | №0640 |
| acts | №0632 (+ 7 других файлов) |
| actual | №0782 (+ 5 других файлов) |
| actualMode | №0654 |
| acVal | №0792 |
| ad | №0060 |
| add | №0788 (+ 3 других файлов) |
| addBtn | №0790 |
| added | №0712 (+ 2 других файлов) |
| addedLangs | №0645 |
| addedWeight | №0791 (+ 1 других файлов) |
| addExhaustion | №0824 |
| addGroup | №0672 |
| addToContainer | №0788 |
| addVal | №0779 |
| adj | №0804 |
| adjacent | №0057 |
| adjusted | №0804 |
| adr | №0832 (+ 1 других файлов) |
| adv | №0654 (+ 2 других файлов) |
| advice | №0818 |
| aether | №0640 |
| af | №0060 |
| affected | №0077 |
| affinity | №0647 (+ 1 других файлов) |
| after | №0654 (+ 8 других файлов) |
| afterBounds | №1102 |
| ag | №0778 (+ 1 других файлов) |
| again | №1143 |
| age | №0623 (+ 2 других файлов) |
| ageEl | №0623 (+ 1 других файлов) |
| ageInput | №0623 (+ 1 других файлов) |
| agents | №0631 |
| ah | №0060 (+ 1 других файлов) |
| ai | №0060 (+ 11 других файлов) |
| ailment | №0778 |
| aim | №0069 |
| aimed | №1133 |
| ain | №0060 (+ 1 других файлов) |
| al | №0060 |
| alchemistCombatant | №1078 |
| alchemistDebuffs | №0654 |
| alchemistFormula | №0654 |
| alchemistLevel | №0654 |
| alchemistState | №0654 |
| alchemistVariants | №0077 |
| alerts | №1771 |
| alias | №0699 (+ 2 других файлов) |
| ALIAS | №0769 |
| aliases | №0077 (+ 7 других файлов) |
| ALIASES | №0671 (+ 1 других файлов) |
| align | №1268 |
| all | №0062 (+ 5 других файлов) |
| ALL_RECIPES | №0671 |
| allBgs | №0623 |
| allCharacters | №0082 |
| allCreatureNames | №0805 |
| allCurses | №0778 |
| allElements | №0789 |
| allFeats | №0744 |
| allItems | №0792 |
| allow | №0819 |
| allowed | №0060 (+ 10 других файлов) |
| allowed2 | №0812 |
| allowMastery | №0778 |
| allPanels | №0821 (+ 1 других файлов) |
| allRaces | №0623 (+ 2 других файлов) |
| allRollsDetails | №0835 |
| allSources | №0744 |
| allSpells | №0835 |
| ally | №0077 (+ 5 других файлов) |
| allyState | №0077 |
| allyWilling | №0818 |
| allyX | №0818 |
| allyY | №0818 |
| alone | №1085 |
| already | №0778 (+ 1 других файлов) |
| alreadyHad | №0744 |
| alreadyHas | №0821 |
| alreadyHasSelectedClass | №0699 |
| alreadyHasSubclass | №0699 |
| alternates | №0080 |
| always | №0808 |
| am | №0072 (+ 3 других файлов) |
| am2 | №1230 |
| amap | №0778 |
| AMBIENCE_STATE_KEY | №0081 |
| ambienceShouldPlay | №0081 |
| ambienceStateLoaded | №0081 |
| AMBIENT_TRACKS | №0081 |
| amorist | №1079 |
| amount | №0060 (+ 24 других файлов) |
| amp | №0778 |
| amphibian | №1079 |
| amphibianMods | №1079 |
| amplified | №1235 |
| anatomy | №1081 |
| anchor | №0057 (+ 1 других файлов) |
| anchors | №0060 (+ 1 других файлов) |
| angle | №0057 (+ 6 других файлов) |
| angularIndex | №0057 |
| animal | №0060 |
| animalCfg | №0060 |
| animalParts | №0060 |
| animalSelect | №0062 |
| ankle | №0060 (+ 1 других файлов) |
| answered | №0810 |
| answers | №1140 (+ 1 других файлов) |
| ao | №0810 |
| ap | №0647 (+ 7 других файлов) |
| api | №0058 (+ 41 других файлов) |
| API | №0078 (+ 12 других файлов) |
| app | №0885 (+ 3 других файлов) |
| APP_FONTS | №0831 |
| APP_FRAME_COLORS | №0831 |
| APP_FRAME_STYLES | №0831 |
| APP_THEMES | №0831 |
| APP_VERSION | №0841 (+ 1 других файлов) |
| appearance | №0059 (+ 2 других файлов) |
| appearanceSource | №1110 |
| applicable | №0820 |
| applied | №0817 (+ 5 других файлов) |
| appliedBonusText | №0744 |
| applySkin | №0062 |
| approved | №1076 |
| approvedRules | №0820 |
| ar | №0647 (+ 4 других файлов) |
| arc | №0060 |
| arch | №0060 |
| archetypeFeatureIds | №0778 |
| area | №0060 (+ 2 других файлов) |
| arena | №1159 |
| arg | №0770 |
| args | №0770 (+ 6 других файлов) |
| arm | №0060 |
| armLine | №0060 |
| armor | №0665 (+ 4 других файлов) |
| armorCategories | №0790 |
| armored | №0828 |
| armorFields | №0790 |
| armorName | №0654 |
| armorObj | №0654 |
| armorOn | №0060 |
| arr | №0068 (+ 12 других файлов) |
| Array | №0662 (+ 23 других файлов) |
| ArrayBuffer | №1119 |
| arrays | №0671 |
| arrow | №0647 (+ 3 других файлов) |
| ARTIFICER_CLASSES | №0647 |
| ARTIFICER_KEY | №0826 |
| artisan | №1138 |
| artisanBack | №1138 |
| ASI | №0815 (+ 1 других файлов) |
| ASI_LEVELS | №0838 |
| asiContainer | №0699 |
| asiHtml | №0699 |
| asiLevels | №0777 |
| asiPrompt | №0699 |
| asMoney | №0817 |
| aspect | №0062 (+ 1 других файлов) |
| aspects | №0843 |
| ASPECTS | №0843 |
| assert | №1076 (+ 178 других файлов) |
| assertSource | №1115 |
| asset | №0058 (+ 30 других файлов) |
| assetId | №1122 |
| assets | №0075 |
| assetSet | №0070 |
| assigned | №0778 |
| at | №0058 (+ 16 других файлов) |
| atk | №0653 (+ 5 других файлов) |
| atkBonus | №0632 (+ 9 других файлов) |
| atkElem | №0653 (+ 1 других файлов) |
| atlas | №0061 |
| atob | №1082 (+ 21 других файлов) |
| aTok | №0654 |
| attachment | №0061 |
| attack | №0808 (+ 7 других файлов) |
| attacker | №0640 (+ 9 других файлов) |
| attackerBack | №0810 |
| attackerDebuffs | №0654 |
| attackerId | №0654 |
| attackerIdForStudy | №0654 |
| attackerSelect | №1140 |
| attackerState | №0654 |
| attackModifiers | №0808 |
| attackPayload | №0810 |
| attackRolls | №1170 |
| attacks | №0654 (+ 3 других файлов) |
| attempts | №0652 (+ 1 других файлов) |
| attributes | №1168 |
| aura | №0810 (+ 1 других файлов) |
| auraActive | №0647 |
| auraBack | №1138 |
| auraCha | №0647 |
| auraPC | №1138 |
| auraPhone | №1138 |
| auraRoster | №1138 |
| auraServer | №1138 |
| auraSource | №0647 |
| auth | №1109 |
| authoritativeAoe | №0810 |
| auto | №0810 |
| autoCloseTimer | №0796 |
| autoFail | №0654 |
| autoInterval | №0867 |
| automatic | №0640 |
| autoPlay | №0081 |
| autoResults | №0810 |
| autoRotateState | №0867 |
| autoRotateTimer | №0867 |
| autos | №0810 |
| av | №0060 (+ 2 других файлов) |
| avail | №0647 |
| available | №0778 (+ 4 других файлов) |
| availableCharges | №0077 |
| availableWallpapers | №0867 |
| avg | №0699 |
| avianHybrid | №1081 |
| aw | №0060 (+ 1 других файлов) |
| ax | №0060 (+ 2 других файлов) |
| axes | №0060 |
| AXES | №0065 |
| axis | №0060 (+ 10 других файлов) |
| ay | №0061 |
| az | №0060 (+ 1 других файлов) |
| b | №0058 (+ 129 других файлов) |
| B | №0057 (+ 16 других файлов) |
| b1 | №0060 (+ 1 других файлов) |
| back | №0058 (+ 4 других файлов) |
| backAnchor | №0060 |
| backBurden | №1138 |
| backCount | №0060 |
| backDepth | №0061 |
| backdrop | №0062 |
| background | №1771 |
| backgroundName | №0623 (+ 1 других файлов) |
| backgrounds | №1258 |
| backgroundsList | №0623 (+ 1 других файлов) |
| backQueen | №1138 |
| backTop | №0061 |
| backup | №0652 (+ 2 других файлов) |
| backupData | №0831 |
| backups | №0650 |
| bad | №0640 (+ 5 других файлов) |
| badgeTag | №0771 |
| badR | №1235 |
| bag | №1099 |
| bagAnchor | №0057 |
| bagCenter | №0057 |
| bagRings | №0057 |
| baked | №1772 |
| balanceAfterBarter | №1174 |
| balanceAfterBuy | №1174 |
| BAM | №0629 |
| band | №0061 |
| bandHi | №0061 |
| bandLo | №0061 |
| bandSection | №0061 |
| bar | №0842 |
| barb | №1231 (+ 1 других файлов) |
| barbarian | №1224 |
| barFill | №0791 |
| barter | №1174 |
| barWrapper | №0791 |
| base | №0060 (+ 67 других файлов) |
| BASE | №0663 (+ 1 других файлов) |
| BASE_HOSTS | №0888 |
| baseAc | №0623 (+ 1 других файлов) |
| baseAC | №0792 |
| baseACInput | №0792 |
| baseActions | №0812 |
| baseConfig | №1316 |
| baseCount | №0671 |
| baseFeatures | №0812 |
| baseGain | №0699 |
| baseH | №0061 (+ 1 других файлов) |
| baseIds | №0871 |
| baseJinx | №0778 |
| baseline | №0062 (+ 2 других файлов) |
| baseMax | №0654 |
| baseMod | №0771 |
| baseMode | №0826 |
| baseNameEng | №0744 |
| baseNameRu | №0744 |
| baseOpenTrade | №0800 |
| baseRate | №0664 |
| baseRender | №0655 |
| BASES | №0673 |
| baseStats | №1771 |
| baseStock | №0801 |
| baseValue | №0666 |
| baseW | №0071 |
| baseX | №0060 |
| baseY | №0060 |
| bat | №0060 (+ 1 других файлов) |
| batch | №0810 |
| batchFail | №1251 |
| batchTarget | №1251 |
| battleGame | №1138 |
| bb | №0060 (+ 4 других файлов) |
| bbu | №0778 |
| bbuDamage | №1159 |
| bbuHero | №1159 |
| bbuLevel9 | №1159 |
| bbuResource | №0654 |
| bbuResult | №0654 |
| bbuTemp | №0778 |
| bc | №0057 (+ 2 других файлов) |
| bCha | №0823 |
| bCon | №0823 |
| bd | №1132 |
| bDex | №0823 |
| beak | №0060 |
| beakKind | №0060 |
| beakL | №0060 |
| beakScale | №0060 |
| beakSelect | №0062 |
| beakStyle | №1102 |
| beakW | №0060 |
| bearer | №0652 |
| bearing | №0817 |
| beast | №0832 |
| beetle | №0060 |
| before | №0652 (+ 63 других файлов) |
| beforeBounds | №1102 |
| beforeBurn | №1078 |
| beforeCup | №1140 |
| beforeCurse | №1235 |
| beforeMoxie | №1159 |
| beforeNormal | №1241 |
| beforePact | №1241 |
| beforeRepeat | №1138 |
| beforeReset | №1080 |
| beforeUnsupported | №1140 |
| beh | №1189 |
| belly | №0060 |
| belt | №0662 |
| bend | №0060 |
| berry | №0817 (+ 1 других файлов) |
| berryOwner | №0818 |
| berryRef | №1138 |
| best | №0060 (+ 11 других файлов) |
| bestD | №1126 |
| bestDist | №0810 |
| bestiary | №0805 |
| bestTrans | №1132 |
| bestTri | №1127 |
| bet | №1137 (+ 1 других файлов) |
| bev | №0810 |
| bf | №0068 (+ 2 других файлов) |
| bg | №0671 (+ 2 других файлов) |
| BG_COLOR_PALETTE | №0867 |
| BG3_POINT_BUY | №0623 (+ 1 других файлов) |
| bgBody | №0867 |
| bgInput | №0082 |
| bgs | №0644 (+ 1 других файлов) |
| bgSelect | №0623 (+ 1 других файлов) |
| bgStyle | №0771 |
| bgVal | №0623 (+ 1 других файлов) |
| bh | №0826 (+ 3 других файлов) |
| bhDamage | №0654 |
| bhPact | №0826 |
| bi | №0810 |
| bIdx | №0623 |
| bin | №0060 (+ 16 других файлов) |
| binary | №1266 |
| binBytes | №1121 |
| binPad | №1118 |
| bins | №0061 |
| bInt | №0823 |
| bird | №0060 |
| bite | №1152 |
| bits | №0057 (+ 1 других файлов) |
| bl | №0685 |
| blackPowder | №1079 |
| blackPowderAttack | №1079 |
| blade | №0060 |
| bladeSpan | №0060 |
| bleed | №0654 |
| blend | №0057 (+ 1 других файлов) |
| blended | №0057 |
| blind | №0817 (+ 2 других файлов) |
| blob | №0831 (+ 7 других файлов) |
| blobs | №1312 |
| block | №0821 (+ 6 других файлов) |
| blocked | №0652 (+ 4 других файлов) |
| bloodAbility | №0077 |
| bloodAgent | №1079 |
| bloodCurseReaction | №0654 |
| bloodHunterPack | №0778 |
| bloodlines | №0832 |
| bloodMax | №0647 |
| bloodMutagenist | №1079 |
| bloodRiteRevival | №0654 |
| bloodShort | №0077 |
| bloodSnapshots | №0077 |
| bm | №0810 (+ 2 других файлов) |
| board | №0810 (+ 2 других файлов) |
| boardBox | №0625 |
| boardCtx | №1212 |
| body | №0057 (+ 22 других файлов) |
| bodyArmor | №0792 |
| bodyBefore | №1080 |
| bodyExtras | №1088 |
| bodyStats | №0783 |
| bomb | №0077 (+ 2 других файлов) |
| bomber | №1079 |
| bomberGuard | №1079 |
| bomberResistanceTarget | №1078 |
| bomberResisted | №1078 |
| bond | №0655 |
| bondBox | №0818 |
| bondConsent | №1140 |
| bondLabel | №0818 |
| bonds | №0685 |
| bondTarget | №1140 |
| bondText | №0818 |
| bondWilling | №0818 |
| bone | №0067 (+ 1 других файлов) |
| bonesChecked | №1308 |
| boneStyle | №0060 |
| boneVertexMap | №0060 |
| bonus | №0073 (+ 24 других файлов) |
| bonusAction | №0810 |
| bonuses | №0790 |
| bonusesText | №0623 (+ 1 других файлов) |
| bonusMultiplier | №0771 |
| bonusText | №0744 |
| Boolean | №0662 (+ 1 других файлов) |
| booted | №0885 |
| borderLeftColor | №0771 |
| bottom | №0057 (+ 4 других файлов) |
| bought | №1174 |
| boundary | №0057 (+ 1 других файлов) |
| boundaryEdges | №0057 |
| boundaryWelds | №0057 |
| bounds | №1089 (+ 1 других файлов) |
| box | №0062 (+ 27 других файлов) |
| boxer | №1159 |
| boxesHtml | №0835 |
| boxIndex | №0835 |
| bp | №0671 (+ 7 других файлов) |
| bParts | №0623 (+ 1 других файлов) |
| br | №1224 |
| brandedHp | №1162 |
| braPanels | №1102 |
| breath | №1079 |
| breathOne | №1079 |
| breathResults | №0077 |
| breathRoll | №0077 |
| breathTargets | №0077 |
| breathTwo | №1079 |
| breathType | №0077 |
| bridge | №1124 (+ 4 других файлов) |
| broken | №0060 (+ 3 других файлов) |
| brokenInputs | №1105 |
| browColor | №0062 |
| browser | №1271 (+ 38 других файлов) |
| BrowserWindow | №0885 |
| bStr | №0823 |
| bt | №0060 (+ 2 других файлов) |
| btn | №0791 (+ 4 других файлов) |
| btnCat | №0792 |
| btnContainer | №0790 |
| btnMode | №0771 |
| btoa | №1082 (+ 2 других файлов) |
| bucket | №0060 (+ 2 других файлов) |
| buckets | №0060 |
| bucketStep | №0060 |
| budget | №0817 (+ 1 других файлов) |
| budgets | №0058 |
| buf | №0068 (+ 2 других файлов) |
| buffers | №0060 (+ 3 других файлов) |
| bufs | №0068 |
| build | №0061 (+ 1 других файлов) |
| built | №1082 (+ 3 других файлов) |
| bulge | №0060 |
| bundled | №1114 (+ 1 других файлов) |
| burden | №1138 |
| burdenAliases | №0802 |
| burdens | №0802 |
| burn | №0778 (+ 1 других файлов) |
| burningOwner | №1078 |
| burningTarget | №1078 |
| bus | №0852 (+ 1 других файлов) |
| busy | №0650 |
| button | №0062 (+ 5 других файлов) |
| buttons | №0062 (+ 2 других файлов) |
| buttonsHtml | №0744 |
| buyFactor | №0799 |
| bv | №0060 (+ 2 других файлов) |
| bvh | №1126 |
| bvIndex | №1118 |
| bWis | №0823 |
| bx | №0061 (+ 1 других файлов) |
| by | №0061 |
| BY_ID | №0820 |
| byFamily | №0627 (+ 12 других файлов) |
| byLevel | №0808 |
| byName | №0663 (+ 1 других файлов) |
| BYPASS_PARCHMENT_ONCE | №0644 |
| bySource | №0627 (+ 2 других файлов) |
| byteOffset | №0068 |
| bytes | №0063 (+ 4 других файлов) |
| bytesWritten | №0888 |
| bz | №0072 |
| c | №0058 (+ 222 других файлов) |
| C | №0080 (+ 13 других файлов) |
| c0 | №0660 |
| c2 | №1255 |
| ca | №0057 (+ 1 других файлов) |
| cache | №0068 |
| CACHE_BUSTER | №0841 |
| cached | №0061 (+ 1 других файлов) |
| calcAtk | №0646 |
| calcDmgBonus | №0646 |
| calcInput | №0779 |
| calcType | №0790 |
| calcWidget | №0789 |
| calf | №0058 |
| call | №0870 |
| callback | №0885 (+ 19 других файлов) |
| callbacks | №1147 |
| called | №1167 |
| calls | №1119 (+ 3 других файлов) |
| cam | №0069 (+ 1 других файлов) |
| campaign | №1191 |
| campaigns | №0641 |
| CAN | №0808 |
| canClose | №0842 |
| candidate | №0888 |
| candidates | №0060 (+ 7 других файлов) |
| canonical | №0769 |
| cantrip | №0077 |
| cantrips | №0759 (+ 1 других файлов) |
| CANTRIPS | №0843 |
| cantripsList | №0835 |
| canvas | №0069 (+ 3 других файлов) |
| cap | №0057 (+ 6 других файлов) |
| capacity | №1150 |
| caps | №1093 |
| capStart | №0057 |
| caption | №0818 |
| card | №0791 (+ 10 других файлов) |
| cardApi | №0818 |
| cardId | №0820 |
| cards | №0654 (+ 5 других файлов) |
| CARDS | №0820 |
| cases | №0662 (+ 3 других файлов) |
| cast | №1146 (+ 1 других файлов) |
| caster | №0810 (+ 3 других файлов) |
| casterLevel | №0826 |
| cat | №0066 (+ 22 других файлов) |
| catalog | №0062 (+ 5 других файлов) |
| CATALOG | №0627 (+ 15 других файлов) |
| catalogContainer | №0821 |
| catalogHtml | №0821 |
| catalogKey | №0818 |
| catalogState | №0659 |
| catalogue | №1279 |
| catalyst | №0080 |
| catalystId | №0078 (+ 1 других файлов) |
| CATALYSTS | №0078 |
| catContainer | №0790 |
| category | №0069 (+ 17 других файлов) |
| CATEGORY | №0659 |
| catLower | №0790 |
| catOk | №0801 |
| cats | №0663 |
| catStr | №0822 |
| catTitle | №0790 |
| cb | №1130 (+ 2 других файлов) |
| cbt | №1139 |
| cc | №0060 (+ 1 других файлов) |
| cd | №0778 |
| ce | №1247 (+ 1 других файлов) |
| ceiling | №0817 |
| cel | №0072 |
| celestial | №1165 |
| cell | №0060 (+ 7 других файлов) |
| CELL_FT | №0625 |
| cellFt | №0655 |
| cells | №0064 (+ 1 других файлов) |
| cellU | №0060 |
| cellV | №0060 |
| center | №0060 (+ 5 других файлов) |
| centre | №0060 |
| centres | №0060 |
| cf | №0778 (+ 1 других файлов) |
| cfg | №0060 (+ 2 других файлов) |
| cg | №0861 |
| ch | №0067 (+ 3 других файлов) |
| cha | №0627 (+ 11 других файлов) |
| chain | №0060 (+ 1 других файлов) |
| chance | №0079 (+ 2 других файлов) |
| change | №1057 |
| changed | №0877 (+ 3 других файлов) |
| CHANGELOG | №0814 |
| changes | №0826 (+ 1 других файлов) |
| channel | №0062 |
| CHANNEL_KEY | №0841 |
| channels | №0065 (+ 6 других файлов) |
| char | №0830 (+ 5 других файлов) |
| character | №0058 (+ 5 других файлов) |
| CHARACTER_CREATION_MODE | №0644 |
| CHARACTER_SAVE_SCHEMA_VERSION | №0082 |
| characters | №0830 |
| characterShape | №0647 (+ 1 других файлов) |
| charClassInputs | №0699 |
| charge | №0778 |
| chargeCount | №0077 |
| chargeDirection | №0818 |
| charges | №1162 (+ 2 других файлов) |
| charId | №0830 |
| charIndex | №0830 |
| charInfo | №0831 |
| chariot | №1138 |
| charLevel | №0830 |
| charm | №1138 |
| charmed | №0077 |
| charmedHero | №1138 |
| charmTarget | №1138 |
| charName | №0830 |
| chars | №0831 (+ 1 других файлов) |
| charTotalCopper | №0789 |
| check | №0647 (+ 11 других файлов) |
| checkbox | №0791 (+ 2 других файлов) |
| checked | №0857 (+ 11 других файлов) |
| checkedAttr | №0623 (+ 1 других файлов) |
| cheek | №0060 |
| chest | №1133 |
| chestUnderwear | №0060 |
| child | №0788 (+ 1 других файлов) |
| childId | №0788 |
| children | №0788 |
| chin | №0060 |
| chk | №0655 (+ 1 других файлов) |
| choice | №0652 (+ 4 других файлов) |
| choiceBlocks | №0699 |
| choices | №0062 (+ 5 других файлов) |
| chosen | №0640 (+ 4 других файлов) |
| chosenD20 | №0646 |
| chosenFeat | №0699 (+ 1 других файлов) |
| chosenMod | №0771 |
| chosenPatron | №0778 |
| chosenResistance | №0077 |
| chosenTrad | №0812 |
| chromium | №1271 (+ 37 других файлов) |
| chunk | №0068 (+ 6 других файлов) |
| chunks | №1266 (+ 1 других файлов) |
| ci | №0060 (+ 1 других файлов) |
| cid | №0077 |
| cId | №0831 |
| cl | №0060 (+ 3 других файлов) |
| claim | №0073 |
| clamp | №0079 |
| class | №0699 |
| CLASS | №0077 (+ 4 других файлов) |
| CLASS_DEFS | №0774 |
| CLASS_I18N | №0794 |
| CLASS_KEYS | №0826 |
| CLASS_NAMES | №0647 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0712 |
| CLASS_TOKEN_ART | №0644 |
| classBonus | №0654 |
| classContext | №0654 |
| classData | №0699 (+ 1 других файлов) |
| classDescriptions | №0662 |
| classEntry | №0699 |
| classes | №0785 (+ 5 других файлов) |
| classFiles | №1771 |
| CLASSIC_BACKGROUND_NAMES | №0644 |
| CLASSIC_CLASS_NAMES | №0644 |
| CLASSIC_RACE_IDS | №0644 |
| classicBgs | №1258 |
| classicClasses | №1258 |
| classLevel | №0699 |
| classMatch | №0835 |
| classMeta | №0785 |
| className | №0623 (+ 8 других файлов) |
| classNameBase | №0645 |
| classNameOnly | №0623 (+ 1 других файлов) |
| classReduction | №0654 |
| classSelect | №0623 (+ 1 других файлов) |
| classStr | №0835 |
| clawLen | №0060 |
| clean | №0632 (+ 10 других файлов) |
| cleanName | №0645 |
| cleanStr | №0771 (+ 1 других файлов) |
| cleanTool | №0645 |
| clear | №0061 (+ 1 других файлов) |
| clearContainer | №0788 |
| clearInterval | №1204 (+ 5 других файлов) |
| clearTimeout | №1204 (+ 28 других файлов) |
| cleft | №0057 (+ 1 других файлов) |
| cleric | №1231 |
| click | №1133 |
| CLIENT_KEY | №0809 |
| clipped | №0060 |
| clone | №1077 (+ 5 других файлов) |
| close | №0814 (+ 1 других файлов) |
| closeBtn | №0699 |
| closedHero | №1140 |
| closedPixels | №1277 |
| cloth | №0062 (+ 3 других файлов) |
| clothBuckets | №0060 |
| clothed | №1107 (+ 1 других файлов) |
| clothes | №1081 (+ 2 других файлов) |
| clothFaces | №0060 |
| clothing | №0058 (+ 2 других файлов) |
| cloud | №1110 |
| cloudStatus | №0831 |
| cls | №0785 (+ 8 других файлов) |
| club | №0775 (+ 1 других файлов) |
| clubFeatures | №0778 |
| clubIds | №1167 |
| cm | №0778 (+ 1 других файлов) |
| cmd | №1077 |
| cmn | №1126 |
| cmx | №1126 |
| cn | №0794 (+ 1 других файлов) |
| cName | №0835 |
| co | №0072 |
| code | №0650 (+ 5 других файлов) |
| coinCases | №1771 |
| coinHero | №1771 |
| coinRef | №1139 |
| coins | №0789 |
| col | №0064 (+ 1 других файлов) |
| cold | №0062 |
| colEP | №0789 |
| collar | №0057 (+ 2 других файлов) |
| collarCount | №0057 |
| collisions | №1132 |
| colno | №0770 |
| color | №0060 (+ 4 других файлов) |
| coloredDrink | №1079 |
| coloredPotionMaker | №1079 |
| colorHex | №0867 |
| colorKey | №0831 |
| colors | №0062 (+ 1 других файлов) |
| colorType | №0077 |
| colour | №1104 |
| colourDetail | №1080 |
| colourIdat | №1104 |
| colourRaw | №1104 |
| colPP | №0789 |
| cols | №0060 (+ 1 других файлов) |
| combat | №0665 (+ 2 других файлов) |
| combatant | №0077 (+ 1 других файлов) |
| combatants | №0077 |
| command | №0829 |
| commit | №0640 |
| committed | №1111 |
| commonSaved | №1277 |
| companion | №1140 (+ 1 других файлов) |
| companionId | №1167 |
| compare | №1115 |
| comparing | №0062 |
| compat | №0841 (+ 2 других файлов) |
| compatFs | №1317 |
| compatRequire | №1317 |
| completed | №0796 |
| completedBytes | №0888 |
| component | №1126 |
| componentBytes | №1130 |
| compositions | №1268 |
| comps | №1127 |
| con | №0627 (+ 15 других файлов) |
| conc | №0826 |
| concentration | №0654 |
| cond | №0646 (+ 2 других файлов) |
| condition | №0654 (+ 3 других файлов) |
| CONDITION_ALIASES | №0826 |
| conditionHero | №1159 |
| conditionMods | №0654 |
| conditionNotes | №0771 |
| conditions | №0654 (+ 4 других файлов) |
| CONDITIONS | №0654 (+ 3 других файлов) |
| CONDITIONS_CONFIG | №0082 |
| conds | №0654 |
| conduit | №0697 |
| config | №0073 (+ 5 других файлов) |
| CONFIG | №0652 |
| confirmed | №0077 |
| conflict | №0652 |
| CONFLICT | №0078 |
| conflicts | №0078 (+ 2 других файлов) |
| conflictSet | №0078 |
| conMod | №0623 (+ 4 других файлов) |
| conModFinal | №0623 (+ 1 других файлов) |
| conScore | №0654 |
| consent | №1140 |
| console | №0662 (+ 29 других файлов) |
| constant | №0810 (+ 1 других файлов) |
| consumed | №0671 |
| consumedJinx | №0654 |
| consumer | №1147 |
| container | №0623 (+ 15 других файлов) |
| containerId | №0821 (+ 3 других файлов) |
| containers | №0782 (+ 3 других файлов) |
| content | №0792 (+ 1 других файлов) |
| contentBox | №0699 |
| contentDiv | №0771 |
| contentsWeight | №0788 |
| context | №0654 (+ 13 других файлов) |
| contextBridge | №0886 |
| contexts | №1080 (+ 1 других файлов) |
| contract | №0778 |
| contracts | №1772 |
| control | №0062 (+ 1 других файлов) |
| controller | №0652 (+ 2 других файлов) |
| controls | №0062 (+ 1 других файлов) |
| conVal | №0699 |
| converted | №0080 (+ 1 других файлов) |
| cooldown | №1076 |
| cooledAttack | №1079 |
| cooling | №1079 |
| copied | №1772 |
| COPPER | №0798 |
| copperPerElectrum | №0789 |
| copperPerGold | №0789 |
| copperPerPlat | №0789 |
| copperPerSilver | №0789 |
| copy | №0059 (+ 8 других файлов) |
| core | №0060 (+ 8 других файлов) |
| CORE | №0647 |
| CORE_CLASSES | №0659 |
| coreOwned | №0647 |
| corePositions | №0060 |
| corner | №1104 |
| corners | №0060 (+ 2 других файлов) |
| corona | №0057 |
| corpse | №0808 (+ 2 других файлов) |
| corrupt | №1092 |
| cost | №0647 (+ 14 других файлов) |
| costDie | №0778 |
| costInp | №0790 |
| count | №0060 (+ 43 других файлов) |
| counter | №0792 (+ 6 других файлов) |
| counterDamage | №0778 (+ 1 других файлов) |
| counterHero | №1159 |
| counterLeft | №0654 |
| counterReduction | №0654 (+ 1 других файлов) |
| counterState | №0654 |
| countInput | №0792 |
| counts | №0057 (+ 3 других файлов) |
| countToRead | №0068 |
| coverBonus | №0654 (+ 1 других файлов) |
| covered | №0061 (+ 1 других файлов) |
| coveredCount | №1307 |
| cp | №0060 (+ 17 других файлов) |
| cPerS | №0789 |
| cpInput | №0789 |
| cpVal | №0789 |
| cr | №0627 (+ 15 других файлов) |
| CR | №0808 |
| CR_BY_MONSTER | №0807 |
| CR_RANK | №0807 |
| craft | №0627 (+ 21 других файлов) |
| craftBase | №0626 |
| craftBonus | №0664 (+ 1 других файлов) |
| crafted | №0663 |
| CRAFTING_BACKGROUND_PROFILES | №0671 |
| CRAFTING_CLASS_PROFILES | №0671 |
| CRAFTING_FEAT_PROFILES | №0671 |
| CRAFTING_RACE_PROFILES | №0671 |
| craftingProfile | №0671 |
| craftModifier | №0671 |
| craftNotes | №0671 |
| createContainer | №0788 |
| created | №0817 |
| creation | №1771 |
| creationCases | №1771 |
| creationScreen | №0623 (+ 1 других файлов) |
| creatures | №0685 |
| CREATURES | №0773 |
| crest | №0060 |
| crit | №1159 |
| critical | №0654 (+ 3 других файлов) |
| criticalRange | №0654 |
| critNote | №0771 (+ 1 других файлов) |
| critTarget | №1159 |
| cross | №0061 (+ 1 других файлов) |
| crowd | №0654 (+ 1 других файлов) |
| crowdCondition | №0778 |
| crowdDC | №0778 |
| crowdHero | №1159 |
| crowdResults | №0778 |
| crowdSave | №0654 |
| crowdTarget | №1159 |
| crowdTargets | №0778 |
| crown | №0060 |
| crownDiagnostics | №1281 |
| crownOff | №1281 |
| crypto | №0888 (+ 52 других файлов) |
| cs | №0060 (+ 11 других файлов) |
| csel | №0805 |
| ct | №0060 |
| ctx | №0071 (+ 136 других файлов) |
| ctx2d | №0062 |
| cuff | №0061 |
| cum | №0060 |
| cup | №0061 (+ 1 других файлов) |
| cupChoice | №0818 |
| cupNumber | №1152 |
| cupPC | №1138 |
| cupPhone | №1138 |
| cupProfiles | №1138 |
| cupResult | №0818 |
| cupRoster | №1138 |
| cups | №0061 |
| cupsBack | №1138 |
| cupServer | №1138 |
| cupsPending | №0818 |
| cur | №0079 (+ 4 других файлов) |
| curHp | №0778 |
| curl | №0060 |
| current | №0057 (+ 13 других файлов) |
| currentActiveId | №0830 |
| currentChar | №0082 |
| currentCharacterId | №0082 |
| currentClass | №0699 |
| currentColor | №0867 |
| currentCurrHp | №0823 |
| currentDim | №0867 |
| currentExp | №0779 |
| currentHero | №0831 (+ 1 других файлов) |
| currentHound | №0778 |
| currentHp | №0077 (+ 1 других файлов) |
| currentHP | №0868 |
| currentInventoryCategory | №0792 |
| currentLevelExpReq | №0779 |
| currentLevelInClass | №0712 |
| currentLvl | №0779 (+ 1 других файлов) |
| currentMax | №0699 |
| currentModalColor | №0867 |
| currentModalOpacity | №0867 |
| currentOpacity | №0867 |
| currentPact | №0797 |
| currentProfsIds | №0821 |
| currentProgress | №0842 |
| currentRollMode | №0771 |
| currentRound | №0654 |
| currentSpent | №0623 (+ 1 других файлов) |
| currentStep | №0081 |
| currentTime | №0796 |
| currentTrack | №0081 |
| currentTrackIndex | №0081 |
| currentVal | №0623 (+ 3 других файлов) |
| currentVersion | №0831 (+ 1 других файлов) |
| currentVolume | №0081 |
| currentWallpaperIndex | №0867 |
| currId | №0831 |
| curse | №0778 |
| curseActor | №0654 |
| curseEffect | №0778 |
| curseId | №0778 |
| curseKnown | №0687 |
| curseMax | №0778 |
| curseNames | №0640 |
| curses | №0076 (+ 1 других файлов) |
| curseSaveMods | №0654 |
| curSides | №0646 |
| curStat | №0646 |
| curve | №0060 |
| custom | №0061 (+ 1 других файлов) |
| customBtn | №0792 (+ 1 других файлов) |
| customElem | №0795 |
| customGather | №0824 |
| customRaces | №0823 |
| customSkinCharacter | №1081 |
| customTestSource | №0841 |
| cut | №0060 (+ 1 других файлов) |
| cutFaces | №0057 |
| cv | №0060 (+ 2 других файлов) |
| cw | №1104 |
| cwd | №1077 |
| cx | №0060 (+ 7 других файлов) |
| cy | №0057 (+ 7 других файлов) |
| cycles | №0664 |
| cz | №0060 (+ 5 других файлов) |
| d | №0058 (+ 84 других файлов) |
| D | №0057 (+ 23 других файлов) |
| d00 | №1126 (+ 2 других файлов) |
| d01 | №1126 (+ 2 других файлов) |
| d1 | №1126 (+ 3 других файлов) |
| d11 | №1126 (+ 2 других файлов) |
| d2 | №1126 (+ 3 других файлов) |
| d20 | №0654 (+ 4 других файлов) |
| d20_1 | №0646 |
| d20_2 | №0646 |
| d20Button | №0647 |
| d20Details | №0646 |
| d20Result | №0771 (+ 1 других файлов) |
| d21 | №1126 (+ 2 других файлов) |
| d3 | №1126 (+ 3 других файлов) |
| d4 | №1126 (+ 3 других файлов) |
| d5 | №1126 (+ 3 других файлов) |
| d6 | №1126 (+ 3 других файлов) |
| da | №1104 |
| damage | №0073 (+ 21 других файлов) |
| DAMAGE_TYPES | №0654 |
| damageBeforeWard | №0654 |
| damageButton | №0647 |
| damaged | №0663 |
| damageOpts | №0654 |
| damageParts | №0654 |
| damageResult | №0810 |
| damageStr | №0790 |
| damageString | №0771 (+ 1 других файлов) |
| damageTaken | №0654 |
| dark | №0060 (+ 2 других файлов) |
| data | №0062 (+ 40 других файлов) |
| dataDir | №1268 (+ 1 других файлов) |
| dataStr | №0831 |
| DataView | №1082 (+ 21 других файлов) |
| Date | №0662 (+ 66 других файлов) |
| dateStr | №0831 |
| day | №0798 |
| db | №0712 (+ 3 других файлов) |
| dbg | №1203 (+ 1 других файлов) |
| dbItem | №0791 (+ 1 других файлов) |
| dbNameLower | №0645 |
| dc | №0073 (+ 26 других файлов) |
| dcElem | №0653 (+ 1 других файлов) |
| dcValue | №0815 |
| dd | №0072 (+ 1 других файлов) |
| deadAlly | №1079 |
| dealUses | №0778 |
| deathSaveFailures | №0654 |
| deb | №0077 |
| debuffs | №0654 (+ 1 других файлов) |
| debug | №1057 |
| debugBtn | №0770 |
| debugContainer | №0831 (+ 1 других файлов) |
| debugToggle | №0831 |
| debugWrapper | №0831 |
| deception | №0077 |
| deck | №0818 (+ 5 других файлов) |
| DECLARATIVE_FEATURES | №0647 |
| declared | №1140 |
| decodeURIComponent | №1217 (+ 1 других файлов) |
| deduction | №0640 |
| def | №0065 (+ 6 других файлов) |
| DEFAULT | №0070 |
| DEFAULT_CAPACITY | №0788 |
| DEFAULT_CHANNEL | №0841 |
| DEFAULT_COLS | №0625 |
| DEFAULT_ENABLED | №0665 |
| DEFAULT_ICON | №0831 (+ 2 других файлов) |
| DEFAULT_MANIFEST_URL | №0841 |
| DEFAULT_RACES | №0823 |
| DEFAULT_ROWS | №0625 |
| defaultIcon | №0887 |
| defaultMode | №0790 |
| defaultModel | №0805 |
| defaults | №0065 (+ 2 других файлов) |
| defaultType | №0790 |
| defaultValue | №0790 |
| defender | №1159 (+ 1 других файлов) |
| defenderClasses | №0654 |
| defenses | №0790 (+ 1 других файлов) |
| defensesContainer | №0790 |
| defer | №0810 |
| deflect | №0654 |
| deflected | №1078 |
| defs | №0065 (+ 4 других файлов) |
| DEFS | №0817 |
| delay | №0652 (+ 1 других файлов) |
| delayedBomb | №1079 |
| delBtn | №0792 (+ 1 других файлов) |
| deleteBtn | №0811 |
| deleted | №0652 |
| delta | №0057 (+ 18 других файлов) |
| demolitionOwner | №1079 |
| demolitionResult | №1079 |
| demolitionTarget | №0077 (+ 1 других файлов) |
| den | №0060 (+ 7 других файлов) |
| denied | №1154 |
| denLabel | №0062 |
| denOpacity | №0061 |
| dense | №1288 |
| denValues | №0061 |
| dependency | №1772 |
| depth | №0060 (+ 4 других файлов) |
| derived | №1772 |
| derivedAssets | №0070 |
| desc | №0669 (+ 7 других файлов) |
| descBox | №0623 (+ 2 других файлов) |
| descElem | №0795 |
| descInp | №0790 |
| descInput | №0823 |
| description | №0647 (+ 2 других файлов) |
| descriptor | №1082 (+ 1 других файлов) |
| descText | №0623 (+ 1 других файлов) |
| descVal | №0823 |
| desired | №0057 (+ 2 других файлов) |
| DesktopWebUpdater | №0885 (+ 2 других файлов) |
| dest | №0074 (+ 4 других файлов) |
| destination | №0817 (+ 2 других файлов) |
| destinations | №0817 |
| detail | №0849 (+ 3 других файлов) |
| details | №0062 (+ 4 других файлов) |
| detailsElem | №0795 |
| detailsHtml | №0792 |
| detailText | №0771 (+ 1 других файлов) |
| developmentGate | №1076 |
| device | №1138 |
| devModal | №0831 |
| dex | №0627 (+ 14 других файлов) |
| dexHero | №1159 (+ 1 других файлов) |
| dexInput | №0823 |
| dexMod | №0623 (+ 6 других файлов) |
| dexSave | №1159 |
| dexScore | №0654 (+ 1 других файлов) |
| dexStats | №0654 |
| df | №0778 |
| di | №0654 (+ 1 других файлов) |
| diag | №1092 (+ 9 других файлов) |
| diagnostics | №1268 |
| diagonal | №0819 (+ 1 других файлов) |
| diagonals | №0819 |
| dialectAliases | №0827 |
| DIALECTS | №0827 |
| dice | №0778 (+ 9 других файлов) |
| DICE_ICONS | №0831 (+ 2 других файлов) |
| diceCount | №0771 (+ 3 других файлов) |
| diceCountInp | №0790 |
| diceDir | №0887 |
| diceFiles | №0887 |
| diceMatch | №0771 |
| diceMax | №1105 |
| diceMin | №1105 |
| diceOptions | №0646 |
| diceRegex | №0835 |
| dices | №0790 |
| diceSides | №0771 (+ 1 других файлов) |
| diceSpent | №0077 |
| diceTab | №0771 |
| diceTypes | №0646 |
| die | №0080 (+ 7 других файлов) |
| DIE | №0640 (+ 1 других файлов) |
| dieSides | №0810 |
| diff | №0699 (+ 1 других файлов) |
| dig | №1160 |
| digDeep | №0654 |
| digDeepTypes | №0654 |
| digit | №0060 |
| digits | №0060 |
| dimLayer | №0867 |
| dir | №0060 (+ 10 других файлов) |
| dire | №0778 |
| direct | №0064 |
| directCompatible | №1130 |
| direction | №0817 (+ 2 других файлов) |
| directions | №0817 |
| direMax | №0778 |
| DIRS | №0819 |
| dirty | №0778 (+ 1 других файлов) |
| dirtyApplied | №0778 |
| dirtyDC | №0778 |
| dirtyHero | №1159 |
| dirtyResource | №0778 |
| dirtySave | №0778 |
| dirtyTarget | №1159 |
| dis | №0654 (+ 2 других файлов) |
| disable | №0791 |
| disabled | №0818 |
| disBtn | №0792 |
| disc | №0060 (+ 2 других файлов) |
| discharge | №1078 |
| dischargeTarget | №1078 |
| disciplineAliases | №0828 |
| disciplineByPower | №0778 |
| disciplines | №0828 |
| discover | №0078 |
| discoveries | №0077 |
| discovery | №0077 |
| discoveryLevel | №0077 |
| discoveryName | №0077 |
| discoveryRecipes | №0077 |
| disguise | №1158 |
| displacement | №1123 |
| display | №0699 (+ 1 других файлов) |
| displayedAC | №0826 |
| displayName | №0623 (+ 3 других файлов) |
| displaySpeed | №0782 |
| displayStyle | №0835 |
| dist | №0060 (+ 5 других файлов) |
| distal | №0060 |
| distance | №0060 (+ 4 других файлов) |
| distanceFt | №0817 (+ 1 других файлов) |
| distanceRolled | №0817 |
| distances | №1126 (+ 2 других файлов) |
| div | №0699 |
| dl | №0060 (+ 1 других файлов) |
| dm | №0810 (+ 1 других файлов) |
| dmg | №0077 (+ 7 других файлов) |
| dmgBonus | №0646 |
| dn | №0060 |
| DND_CLASSES_LIST | №0623 (+ 1 других файлов) |
| DND_DAMAGE_TYPES | №0790 |
| DND_SKILLS_LIST | №0790 |
| DND_WEAPON_CATEGORIES | №0790 |
| DND_WEAPON_PROPERTIES | №0790 |
| dndBackgrounds | №0623 |
| dndModal | №0699 |
| doc | №1203 (+ 2 других файлов) |
| document | №1080 |
| dom | №1133 |
| dome | №0060 |
| domReady | №1225 (+ 1 других файлов) |
| done | №0841 (+ 3 других файлов) |
| donor | №0812 |
| dot | №0057 |
| down | №0074 |
| download | №1282 |
| downloadAnchor | №0831 |
| downloads | №1114 |
| dr | №0778 (+ 2 других файлов) |
| draft | №0817 (+ 2 других файлов) |
| DRAFT | №0059 |
| drag | №0862 |
| dragon | №1229 |
| dragonGraft | №0077 |
| draw | №0782 (+ 4 других файлов) |
| drawer | №0792 |
| drawerContainer | №0771 |
| drawerContent | №0771 |
| drawWindow | №0772 |
| dreadAttack | №1159 |
| dreadHandHero | №1159 |
| dreadHero | №1159 |
| dreadTarget | №1159 |
| dress | №1090 |
| drop | №0060 |
| dry | №1113 |
| ds | №0654 (+ 1 других файлов) |
| dst | №0068 (+ 1 других файлов) |
| dt | №0060 (+ 2 других файлов) |
| du | №0057 |
| duplicates | №1312 |
| duplicityMiss | №0654 |
| duplicityTarget | №0654 |
| dupRoll | №0654 |
| durability | №0798 (+ 1 других файлов) |
| duration | №0868 |
| durationMs | №0081 |
| durationSeconds | №0868 |
| dv | №0057 (+ 3 других файлов) |
| dwarf | №0065 |
| dwarfDesc | №0662 |
| dx | №0057 (+ 13 других файлов) |
| dy | №0057 (+ 12 других файлов) |
| dynamicContainer | №0792 |
| dynamoAttack | №1079 |
| dz | №0057 (+ 5 других файлов) |
| dzdt | №0057 |
| e | №0057 (+ 150 других файлов) |
| E | №0808 |
| e0 | №0062 (+ 1 других файлов) |
| each | №0647 |
| ear | №0060 |
| earOuter | №0060 |
| ears | №0060 (+ 1 других файлов) |
| earVertices | №1093 |
| eb | №0060 (+ 1 других файлов) |
| ec | №0778 |
| eco | №1189 |
| econ | №0664 (+ 1 других файлов) |
| ECON | №0663 |
| edge | №0060 |
| edges | №0060 |
| editor | №0886 (+ 1 других файлов) |
| editorWeaponPresets | №0062 |
| ef | №0077 (+ 1 других файлов) |
| eff | №0778 |
| effect | №0077 (+ 3 других файлов) |
| effectApplies | №0654 |
| effectiveD20 | №0654 |
| effectiveDiceCount | №0771 |
| effectiveMode | №0771 |
| effectMap | №0077 |
| effects | №0673 (+ 2 других файлов) |
| EFFECTS | №0079 |
| effectSerial | №0640 |
| eid | №0808 (+ 1 других файлов) |
| eInput | №0789 |
| el | №0069 (+ 28 других файлов) |
| elapsed | №0877 |
| elBar | №0779 |
| elCurExp | №0779 |
| elCurLvl | №0779 |
| elDesc | №0823 |
| electromagneticShield | №0654 |
| elem | №1229 |
| element | №0778 |
| elementId | №0792 |
| elements | №1080 (+ 4 других файлов) |
| elementsToHide | №0867 |
| elId | №0791 |
| eligible | №0820 |
| elInputCur | №0779 |
| ellipse | №0057 |
| elName | №0823 |
| elNextExp | №0779 |
| elSpeed | №0823 |
| email | №0650 (+ 1 других файлов) |
| embedded | №0820 |
| emojis | №0771 |
| empty | №0060 |
| emptyMsg | №0790 |
| enabled | №0058 (+ 3 других файлов) |
| encoded | №0817 |
| encodeURIComponent | №1217 (+ 1 других файлов) |
| encounter | №0804 |
| end | №0060 (+ 4 других файлов) |
| ended | №0817 |
| ends | №0073 |
| endY | №0061 |
| enemies | №0817 |
| enemy | №0871 (+ 4 других файлов) |
| enemyHP | №1169 |
| energyDamage | №0077 |
| energyResult | №0077 |
| energySeamTarget | №1078 |
| engine | №1216 |
| englishName | №0777 |
| engName | №0699 (+ 1 других файлов) |
| enhancedAttack | №1159 |
| enhancedTarget | №1159 |
| entity | №0077 (+ 2 других файлов) |
| entries | №0652 (+ 8 других файлов) |
| entry | №0062 (+ 18 других файлов) |
| entryId | №0795 |
| env | №1134 (+ 1 других файлов) |
| envelope | №0057 |
| ep | №0778 (+ 2 других файлов) |
| epInput | №0789 |
| epoch | №0652 |
| eprof | №0810 |
| eps | №0057 (+ 2 других файлов) |
| epsilon | №0061 |
| epVal | №0789 |
| equipCheckbox | №0792 |
| equipLabel | №0792 |
| equipment | №0065 |
| equippedWeapon | №0771 |
| er | №0060 (+ 1 других файлов) |
| err | №0062 (+ 4 других файлов) |
| error | №0062 (+ 1 других файлов) |
| errorCount | №0770 |
| errors | №0660 (+ 40 других файлов) |
| es | №0079 |
| esc | №0069 (+ 1 других файлов) |
| escape | №1217 (+ 2 других файлов) |
| ev | №0782 (+ 6 других файлов) |
| evasion | №0654 |
| event | №0073 (+ 15 других файлов) |
| EVENT_LIMIT | №0809 |
| eventAttacker | №0654 |
| eventBox | №0818 |
| eventChainHeadHash | №0809 |
| eventLabel | №0818 |
| eventLogBaseHash | №0809 |
| eventLogBaseSeq | №0809 |
| eventPC | №1138 |
| eventPhone | №1138 |
| eventRoster | №1138 |
| events | №0809 (+ 6 других файлов) |
| eventServer | №1138 |
| eventText | №0818 |
| evo | №1229 |
| evt | №1080 |
| ex | №0060 (+ 1 других файлов) |
| exact | №0660 (+ 2 других файлов) |
| excess | №0778 |
| executionScene | №0817 |
| exhaustion | №0824 |
| exhaustionNow | №0654 |
| exhaustionRestKey | №0646 (+ 1 других файлов) |
| exhaustionText | №0824 |
| existing | №0073 (+ 9 других файлов) |
| existingClass | №0785 |
| existingClassEntry | №0699 |
| existingOverlay | №0771 |
| exists | №0645 (+ 1 других файлов) |
| existsL | №0645 |
| exp | №0779 |
| expand | №0061 |
| expanded | №0062 |
| expBasedLevel | №0779 |
| expected | №0077 (+ 4 других файлов) |
| expectedRevision | №0820 |
| expert | №1153 |
| expiration | №1168 |
| expired | №1159 |
| expires | №0832 |
| explicit | №1081 |
| exploitContract | №0778 |
| exploits | №0871 |
| explored | №0073 |
| exposureActor | №0654 |
| expr | №0647 (+ 7 других файлов) |
| expression | №0778 |
| ext | №0072 (+ 4 других файлов) |
| external | №0058 (+ 1 других файлов) |
| externalCalls | №1119 |
| externalJson | №1119 |
| externalPanels | №0771 |
| extra | №0060 (+ 31 других файлов) |
| EXTRA | №0642 |
| EXTRA_RULES | №0078 |
| EXTRA_TRIGGER | №0079 |
| EXTRA_TYPES | №0644 |
| extraACBonus | №0792 |
| extraAtk | №0810 |
| extraClass | №0699 |
| extraClasses | №1258 |
| extraDamages | №0790 |
| extraData | №0792 (+ 1 других файлов) |
| extraDmg | №0810 |
| extraDmgContainer | №0790 |
| extraLine | №0744 |
| extraLocked | №0699 |
| extraName | №0699 (+ 1 других файлов) |
| extrapolated | №1268 |
| extras | №0062 (+ 3 других файлов) |
| extraType | №0699 |
| exts | №0887 |
| ey | №0060 |
| eye | №0060 (+ 1 других файлов) |
| eyeBtn | №0867 |
| eyeIsland | №0060 |
| eyePart | №0060 |
| eyes | №0060 (+ 2 других файлов) |
| eyeSave | №1281 |
| eyesDiag | №1281 |
| eyesOff | №1281 |
| eyeWeight | №0060 |
| eyeX | №0060 |
| eyeY | №0060 |
| eyeZ | №0060 |
| ez | №0060 |
| f | №0058 (+ 116 других файлов) |
| F | №1228 (+ 4 других файлов) |
| fa | №0778 |
| face | №0057 (+ 2 других файлов) |
| faceParts | №0062 |
| faces | №0057 (+ 3 других файлов) |
| facing | №0060 |
| FACTIONS | №0631 |
| factor | №0057 (+ 4 других файлов) |
| factory | №0826 |
| fadeInterval | №0081 |
| fadeTimer | №0796 |
| fail | №1175 (+ 1 других файлов) |
| failed | №1077 (+ 2 других файлов) |
| failedSave | №0832 |
| fall | №1224 |
| fallback | №0060 (+ 7 других файлов) |
| FALLBACK_MANIFEST_URL | №0841 |
| fallbackName | №0712 |
| fallbackText | №0771 |
| false | №0778 (+ 6 других файлов) |
| fam | №0628 (+ 10 других файлов) |
| familiarForms | №0778 |
| FAMILIES | №0627 |
| family | №0627 (+ 1 других файлов) |
| FAMILY_BY_CREATURE | №0773 |
| FAMILY_DEFS | №0773 |
| FAMILY_NAMES | №0628 (+ 11 других файлов) |
| familyId | №0773 |
| familyOpts | №0773 |
| fangs | №0060 |
| fangsOff | №1281 |
| fans | №1102 |
| fantasy | №1279 |
| fantasySaved | №1279 |
| fApplied | №0778 |
| faq | №0814 |
| FAQ | №0814 |
| far | №0072 (+ 1 других файлов) |
| fat | №0060 |
| fatalHit | №1159 |
| fateMax | №0647 |
| fc | №0072 |
| fd | №0077 |
| fdc | №0778 |
| fdmg | №0778 |
| fearSave | №0778 |
| feat | №0647 (+ 2 других файлов) |
| FEAT_STAT_LABELS | №0744 |
| FEAT_VALID_STATS | №0744 |
| featActionHtml | №0744 |
| featDesc | №0744 |
| featherHead | №0062 |
| featherKind | №0062 |
| featherPart | №0062 |
| featName | №0744 |
| featObj | №0699 (+ 1 других файлов) |
| feats | №0624 (+ 2 других файлов) |
| featsOptions | №0699 |
| feature | №0077 (+ 3 других файлов) |
| FEATURE_DEFS | №0647 |
| FEATURE_TARGET_RULES | №0810 |
| featureDescStr | №0623 (+ 1 других файлов) |
| featureHtml | №0623 (+ 2 других файлов) |
| featureIds | №0660 (+ 1 других файлов) |
| featureIndex | №0660 |
| featureLevel | №0660 |
| featureList | №0712 |
| featureLists | №0647 |
| featureMeta | №0647 |
| featureMod | №0654 |
| featureMode | №0654 |
| features | №0077 (+ 10 других файлов) |
| featuresHtml | №0699 |
| featuresList | №0699 |
| featureStr | №0623 (+ 1 других файлов) |
| fecund | №0778 |
| feet | №0060 (+ 3 других файлов) |
| female | №0061 (+ 5 других файлов) |
| femalePositions | №1082 |
| fer | №0655 |
| ferocity | №1167 |
| fetched | №0841 |
| ff | №0072 (+ 1 других файлов) |
| fgm | №1231 |
| fi | №0060 (+ 3 других файлов) |
| fid | №0647 (+ 4 других файлов) |
| field | №0060 (+ 9 других файлов) |
| fieldLengths | №1128 |
| fields | №1147 (+ 3 других файлов) |
| fiend | №1165 |
| fight | №0817 |
| fighter | №1228 (+ 1 других файлов) |
| fighters | №0818 |
| fightingPack | №0654 |
| fightingResource | №0654 |
| fightingResult | №0654 |
| fightingStyleEffects | №0778 |
| file | №0831 (+ 56 других файлов) |
| fileNo | №1312 |
| filePath | №0867 |
| files | №0668 (+ 10 других файлов) |
| fileUrl | №0888 |
| filter | №0080 (+ 3 других файлов) |
| filteredItems | №0835 |
| filters | №0644 (+ 1 других файлов) |
| filterText | №0744 |
| final | №0778 (+ 1 других файлов) |
| finalAC | №0792 |
| finalAttackTotal | №0771 |
| finalCount | №0671 |
| finalData | №0790 |
| finalName | №0790 |
| finalPropsString | №0790 |
| finalSkillModifier | №0771 |
| finalStats | №0623 (+ 1 других файлов) |
| finalTotal | №0771 (+ 1 других файлов) |
| fingerless | №0060 |
| fins | №0060 |
| finsOff | №1281 |
| fire | №0842 |
| fireFront | №0842 |
| fireRoll | №0077 |
| first | №0057 (+ 9 других файлов) |
| firstFace | №1130 |
| firstVertex | №1130 |
| fit | №0062 (+ 5 других файлов) |
| fitted | №0060 (+ 2 других файлов) |
| fixture | №1099 |
| flags | №0655 |
| flare | №0061 |
| flat | №1102 |
| fleeing | №1138 |
| fleePhone | №1138 |
| flexible | №1079 |
| flexibleInstall | №1079 |
| Float32Array | №1080 (+ 23 других файлов) |
| Float64Array | №1085 (+ 2 других файлов) |
| floor | №0060 (+ 3 других файлов) |
| FLOOR | №0071 |
| floorAttack | №1159 |
| floorHero | №1159 |
| floorHpBefore | №1159 |
| floorMod | №1160 |
| floors | №0075 |
| floorTarget | №1159 (+ 1 других файлов) |
| floorTypes | №0075 |
| flush | №1080 |
| flyer | №1159 |
| fm | №0654 (+ 1 других файлов) |
| fm2 | №1231 |
| fn | №0057 (+ 30 других файлов) |
| focus | №0057 (+ 1 других файлов) |
| focusEl | №0814 |
| focusSources | №0835 |
| foe | №1142 (+ 1 других файлов) |
| fog | №1134 |
| fogShade | №0072 |
| fold | №0060 |
| folder | №1266 |
| folderCases | №1771 |
| folderId | №0811 |
| fontKey | №0831 |
| fontObj | №0831 |
| fontSelect | №0831 |
| fontStyleTag | №0831 |
| foot | №0060 (+ 1 других файлов) |
| footH | №0060 |
| force | №0798 (+ 1 других файлов) |
| forceCrit1 | №0771 |
| forced | №0817 |
| forceSlot | №0843 |
| forearmHigh | №0060 |
| forearmLow | №0060 |
| foreign | №1168 |
| fork | №0060 |
| form | №0060 (+ 5 других файлов) |
| formattedText | №0699 |
| formula | №0640 (+ 3 других файлов) |
| formulaDamage | №0077 |
| formulae | №0077 |
| formulaEffects | №0077 |
| formulaHero | №1079 |
| formulaIds | №0778 |
| formulas | №0640 (+ 1 других файлов) |
| fortifying | №0778 |
| fortune | №0826 |
| forward | №0060 (+ 1 других файлов) |
| found | №0061 (+ 16 других файлов) |
| foundIdx | №0867 |
| foundItemData | №0791 |
| foundProf | №0821 |
| foundWeapon | №0822 (+ 1 других файлов) |
| fov | №0072 |
| fr | №0685 (+ 1 других файлов) |
| fR1 | №0771 (+ 1 других файлов) |
| fR2 | №0771 (+ 1 других файлов) |
| fragHighp | №0072 |
| frame | №0060 (+ 25 других файлов) |
| frameColorSelect | №0831 |
| frameKey | №0831 |
| frames | №1097 |
| frameStyleSelect | №0831 |
| framework | №1151 |
| free | №0060 (+ 2 других файлов) |
| freeGather | №0877 |
| fresh | №0060 (+ 3 других файлов) |
| friend | №1138 (+ 2 других файлов) |
| frill | №0060 |
| from | №0631 (+ 4 других файлов) |
| front | №0058 (+ 4 других файлов) |
| frontal | №0060 |
| frontCount | №0060 |
| frontPlate | №0060 |
| frontTop | №0061 |
| fs | №0062 (+ 226 других файлов) |
| fsave | №0778 |
| fsp | №0885 (+ 1 других файлов) |
| ft | №0778 |
| full | №1114 (+ 1 других файлов) |
| FULL | №0797 |
| FULL_CASTER_SLOTS_TABLE | №0835 |
| FULL_CASTERS | №0826 |
| FULL_SLOTS | №0826 |
| fullCoat | №0062 |
| fullData | №0744 |
| fullPath | №0885 |
| fur | №0062 (+ 1 других файлов) |
| furEnabled | №0062 |
| furryAccessory | №0062 |
| furryLimb | №0062 |
| furrySkull | №0062 |
| furSelect | №0062 |
| fuseMinutes | №0077 |
| fuseRounds | №0077 |
| future | №0062 (+ 1 других файлов) |
| fv | №0778 |
| fx | №0060 (+ 2 других файлов) |
| fy | №0060 (+ 1 других файлов) |
| g | №0058 (+ 151 других файлов) |
| G | №0080 |
| g1 | №0071 |
| gain | №0668 (+ 4 других файлов) |
| gained | №0655 (+ 1 других файлов) |
| gainedHp | №0785 |
| gameplay | №1216 |
| gameTool | №0645 |
| gap | №0061 |
| garment | №0061 |
| garments | №0060 |
| GATE_TOWNS | №0631 |
| gather | №0824 |
| GATHERING_ACTIONS | №0824 |
| gb | №1126 (+ 4 других файлов) |
| gdiag | №1127 (+ 1 других файлов) |
| ge | №0778 |
| gem | №0817 |
| gender | №0061 (+ 7 других файлов) |
| generated | №1189 (+ 1 других файлов) |
| generatedHarvest | №1189 |
| generatedPath | №1772 |
| generation | №0652 |
| GENERIC_SPECIALTIES | №0669 |
| geo | №0058 (+ 24 других файлов) |
| geometryKey | №1089 |
| geoTarget | №0810 |
| gesture | №0062 (+ 1 других файлов) |
| getData | №0712 |
| getStat | №0785 |
| getSub | №0712 |
| ghostBounds | №0062 |
| ghostForbiddenSlots | №0062 |
| ghostShellTarget | №0645 |
| ghostWeapon | №0062 |
| gi | №0654 |
| gills | №0060 |
| git | №1261 (+ 3 других файлов) |
| gl | №0060 (+ 23 других файлов) |
| glb | №1126 (+ 7 других файлов) |
| glbPath | №1118 (+ 6 других файлов) |
| glbVertices | №1130 |
| glen | №0060 |
| global | №0831 (+ 84 других файлов) |
| globalAudio | №0081 |
| glove | №0060 |
| gn | №0778 |
| gname | №0778 |
| gnome | №0065 |
| gob | №1191 |
| gold | №0062 |
| golden | №1771 |
| goldNeeded | №0664 |
| goldOwner | №0818 |
| goldRef | №0818 |
| golemCraft | №1079 |
| golemEntities | №1079 |
| golemEntity | №1079 |
| golemRestore | №1079 |
| good | №0640 (+ 1 других файлов) |
| got | №0078 (+ 2 других файлов) |
| gp | №0789 (+ 7 других файлов) |
| gPerE | №0789 |
| gpInput | №0789 |
| gpVal | №0789 |
| gradle | №0887 |
| graftAC | №0654 |
| graftArmorAttack | №1078 |
| graftArmorTarget | №1078 |
| graftCriticalAttack | №1078 |
| graftCriticalTarget | №1078 |
| graftDef | №0077 |
| graftInstalled | №1079 |
| graftMissingDonor | №1079 |
| graftName | №0077 |
| graftRemoved | №1079 |
| graftResistant | №0654 |
| grafts | №0077 (+ 1 других файлов) |
| grant | №0672 |
| granted | №0077 (+ 1 других файлов) |
| grantMaterial | №0667 |
| gray | №0062 |
| grid | №0831 (+ 7 других файлов) |
| grip | №0060 (+ 1 других файлов) |
| groom | №0060 |
| groove | №0057 |
| ground | №0060 (+ 1 других файлов) |
| group | №0057 (+ 8 других файлов) |
| grouped | №0647 |
| groupedFeats | №0699 |
| groupFeats | №0699 |
| groupKey | №0744 |
| groupKeys | №0821 |
| groupName | №0821 |
| groupOrder | №0744 |
| groupRolls | №0835 |
| groups | №0060 (+ 4 других файлов) |
| groupsMap | №0821 |
| groupTitle | №0790 |
| growth | №1159 |
| growthAttack | №1159 |
| growthTarget | №1159 |
| gs | №1127 |
| guard | №0782 (+ 2 других файлов) |
| guide | №1192 (+ 3 других файлов) |
| guildDesc | №0662 |
| gw | №1316 |
| h | №0058 (+ 127 других файлов) |
| H | №0058 (+ 10 других файлов) |
| h2 | №1228 |
| h3 | №1151 (+ 1 других файлов) |
| h4 | №1228 |
| hab | №0627 |
| habitat | №0062 (+ 1 других файлов) |
| habitats | №0062 |
| hadSpeedZero | №0782 |
| hair | №0058 (+ 2 других файлов) |
| hairLength | №0060 |
| hairProfiles | №0060 |
| hairs | №0060 (+ 1 других файлов) |
| half | №0060 (+ 2 других файлов) |
| HALF_CASTERS | №0826 |
| hand | №0060 (+ 1 других файлов) |
| handle | №0888 |
| handleAdd | №0790 |
| handleAddClick | №0790 |
| handleArmorCatSelect | №0790 |
| handleCatSelect | №0790 |
| handleDel | №0790 |
| handleDiceSelect | №0790 |
| handlePropToggle | №0790 |
| handler | №0841 (+ 1 других файлов) |
| handlers | №0647 (+ 1 других файлов) |
| HANDLERS | №0817 |
| handleTabClick | №0792 |
| handMax | №1092 |
| handoffCalls | №1251 |
| hands | №0060 |
| harness | №1294 |
| harvest | №1179 (+ 1 других файлов) |
| hasActiveModal | №0839 |
| hasAoe | №0810 |
| hasAutoStarted | №0081 |
| hasDex | №0778 |
| hasDice | №0835 |
| hasFirearmsAll | №0822 |
| hasGraft | №0077 |
| hash | №0841 (+ 4 других файлов) |
| hashes | №1099 (+ 6 других файлов) |
| hasMagic | №0835 |
| hasMartialAll | №0822 |
| hasProf | №0872 |
| hasProficiency | №0792 |
| hasSimpleAll | №0822 |
| hasSpecificProf | №0822 |
| hasTool | №0667 (+ 2 других файлов) |
| hasUV | №0062 |
| hat | №0060 (+ 4 других файлов) |
| have | №0664 (+ 1 других файлов) |
| hay | №0792 (+ 1 других файлов) |
| haymaker | №1159 |
| hayTarget | №1159 |
| hb | №1126 (+ 4 других файлов) |
| hCls | №0835 |
| hctx | №1251 |
| hd | №0812 (+ 1 других файлов) |
| hdiag | №1132 |
| head | №0057 (+ 5 других файлов) |
| HEAD_AXES | №0065 |
| HEAD_FORMS | №0065 |
| HEAD_STYLES | №0065 |
| header | №0826 (+ 1 других файлов) |
| headerAC | №0082 |
| headers | №0652 (+ 2 других файлов) |
| heading | №0771 |
| headMax | №1092 |
| heal | №0778 (+ 2 других файлов) |
| heal2 | №0778 |
| healAmount | №0818 |
| healBatch | №1251 |
| healCaster | №0818 |
| healDeclared | №0818 |
| healed | №0077 (+ 9 других файлов) |
| healer | №0640 |
| healEventId | №0818 |
| healing | №0870 (+ 2 других файлов) |
| healingActors | №0818 |
| healingRedirect | №0654 |
| healingResult | №0654 |
| healMap | №0077 |
| healNoUndead | №0818 |
| healOriginal | №0818 |
| healRange | №0818 |
| healRoll | №0077 |
| healSight | №0818 |
| healTarget | №1251 |
| healv | №0647 |
| heatDamage | №1079 |
| heatMode | №0077 |
| height | №0060 (+ 6 других файлов) |
| heights | №1161 |
| held | №1138 (+ 2 других файлов) |
| heldName | №1140 |
| help | №0814 |
| hem | №0061 |
| hemoragent | №1079 |
| hemoragentNoPool | №1079 |
| hermit | №1138 |
| hermitHero | №1138 |
| hero | №0785 (+ 50 других файлов) |
| heroClassNames | №0835 |
| heroes | №1105 |
| heroFeats | №0744 |
| heroFeatsRef | №0744 |
| heroIsExtra | №0699 |
| heroLevel | №0660 |
| heroLevels | №0804 |
| hex | №0061 (+ 3 других файлов) |
| hi | №0060 (+ 10 других файлов) |
| hidden | №0079 (+ 1 других файлов) |
| hiddenBuckets | №0060 |
| high | №0060 (+ 5 других файлов) |
| highlight | №0062 |
| hint | №0062 |
| hip | №0060 (+ 1 других файлов) |
| hipCenter | №0061 |
| hipMax | №0061 |
| hipMin | №0061 |
| hipRadius | №0061 |
| history | №0062 (+ 4 других файлов) |
| hit | №0654 (+ 14 других файлов) |
| HIT_COST | №0802 |
| hitDie | №0692 (+ 2 других файлов) |
| hitDieMax | №0785 |
| hiX | №0060 |
| hiY | №0060 |
| hm | №1126 (+ 7 других файлов) |
| hole | №0060 |
| holeCounts | №0057 |
| holes | №0060 |
| holeVertices | №0057 |
| hollowHp | №0654 |
| holyAttack | №1079 |
| homebrewClasses | №1258 |
| homunculusCraft | №1079 |
| homunculusEntities | №1079 |
| homunculusOwner | №0654 (+ 1 других файлов) |
| homunculusState | №0654 |
| hood | №0057 (+ 1 других файлов) |
| hoof | №1100 |
| hoofScale | №0060 |
| hoofY | №0060 |
| hook | №0060 |
| hooks | №1078 (+ 3 других файлов) |
| HORN_STYLES | №0065 |
| hornAttack | №1079 |
| hornInstall | №1079 |
| hornPart | №0060 |
| horns | №0060 (+ 1 других файлов) |
| hornSelect | №0062 |
| hornSize | №1107 |
| hornStyle | №0060 (+ 1 других файлов) |
| horror | №0628 (+ 1 других файлов) |
| horseY | №0060 |
| hosiery | №0062 |
| hosieryDen | №1091 |
| host | №0080 (+ 24 других файлов) |
| hostBox | №0809 |
| hostDestroyed | №0815 |
| hostiles | №0655 (+ 1 других файлов) |
| houndHP | №0778 |
| houndTemplate | №0778 |
| howlTargets | №0640 |
| hp | №0077 (+ 22 других файлов) |
| hpAfter | №1225 |
| hpAfterTick | №1078 |
| hpBefore | №1138 |
| hpBeforeShift | №1168 |
| hpCurrentInput | №0699 (+ 1 других файлов) |
| hpDamage | №0654 |
| hpGain | №0699 |
| hpMax | №0646 (+ 1 других файлов) |
| hpMaxInput | №0699 (+ 1 других файлов) |
| hpNow | №0778 |
| hpObj | №0077 |
| hpRes | №0699 |
| hpShape | №1159 |
| hs | №1127 |
| html | №0081 (+ 51 других файлов) |
| http | №1271 (+ 37 других файлов) |
| hud | №1201 (+ 1 других файлов) |
| hugeHands | №1079 |
| human | №1081 (+ 2 других файлов) |
| hunter | №1234 |
| hv | №1189 |
| hx | №0778 |
| hy | №0060 |
| hybrid | №0778 |
| i | №0058 (+ 178 других файлов) |
| ia | №1127 (+ 2 других файлов) |
| ib | №0067 |
| icon | №0791 (+ 3 других файлов) |
| iconEl | №0791 |
| iconId | №0831 (+ 3 других файлов) |
| iconPath | №0885 |
| ICONS | №0831 (+ 2 других файлов) |
| id | №0058 (+ 152 других файлов) |
| ID | №0834 (+ 1 других файлов) |
| idat | №1104 |
| identity | №0072 (+ 1 других файлов) |
| idName | №0744 |
| idOrName | №0671 |
| ids | №0057 (+ 32 других файлов) |
| idv | №0068 (+ 1 других файлов) |
| idx | №0062 (+ 30 других файлов) |
| ignoreTarot | №0826 |
| ignoreWeight | №0788 |
| ii | №1127 (+ 1 других файлов) |
| illIds | №1167 |
| illusion | №0817 (+ 1 других файлов) |
| im | №0068 (+ 3 других файлов) |
| Image | №1080 |
| images | №1080 |
| img | №0062 (+ 3 других файлов) |
| IMG | №0071 |
| imitation | №0077 |
| immune | №0817 (+ 3 других файлов) |
| immuneCharm | №0778 |
| immuneFire | №1078 |
| immuneUntil | №0654 |
| immunity | №0640 |
| importDocument | №1772 |
| imported | №1122 |
| improved | №0802 |
| inCombat | №0640 |
| incoming | №1115 (+ 1 других файлов) |
| incomingType | №0654 |
| incompatible | №0062 |
| indent | №0788 |
| index | №0057 (+ 26 других файлов) |
| indexed | №0792 |
| indices | №0057 (+ 4 других файлов) |
| Infinity | №0060 (+ 8 других файлов) |
| influence | №0057 |
| influences | №0057 |
| info | №0650 (+ 3 других файлов) |
| infoBox | №0823 |
| infoText | №0791 |
| ing | №0078 (+ 2 других файлов) |
| INGREDIENT_SOURCES | №0080 |
| INGREDIENTS | №0078 |
| ings | №0078 (+ 1 других файлов) |
| ini | №0810 |
| initElem | №0623 (+ 1 других файлов) |
| initial | №1080 (+ 2 других файлов) |
| initialAngle | №0061 |
| initialId | №1080 |
| initialProficiencies | №0645 |
| initialSkillsData | №0623 (+ 1 других файлов) |
| initiative | №0772 (+ 1 других файлов) |
| inline | №0068 |
| inner | №0057 (+ 1 других файлов) |
| innerDivs | №0821 |
| innerHtml | №0835 |
| innerList | №0792 |
| inp | №0790 |
| input | №0058 (+ 23 других файлов) |
| inputColEP | №0789 |
| inputColPP | №0789 |
| inputCopper | №0789 |
| inputElem | №0779 (+ 1 других файлов) |
| inputField | №0791 |
| inputGrid | №0789 |
| inputId | №0825 |
| inputs | №1105 |
| inputVal | №0779 |
| ins | №0778 |
| INS | №0827 |
| inside | №0810 |
| insight | №0077 |
| inspect | №0078 |
| inspectOnly | №0817 |
| inspired | №1138 |
| inspiredPhone | №1138 |
| installed | №0659 (+ 1 других файлов) |
| installedGrafts | №0077 |
| instantDeath | №0654 |
| int | №0627 (+ 10 других файлов) |
| Int16Array | №1082 (+ 21 других файлов) |
| Int8Array | №1082 (+ 21 других файлов) |
| internal | №0778 |
| interrupted | №0772 (+ 1 других файлов) |
| intervalVal | №0867 |
| intMod | №0623 (+ 5 других файлов) |
| inv | №0057 (+ 14 других файлов) |
| invalidDead | №1079 |
| inventory | №0822 (+ 1 других файлов) |
| INVENTORY_CATEGORIES | №0817 |
| inventoryCases | №1771 |
| inventoryPC | №1138 |
| inventoryPhone | №1138 |
| inventoryRoster | №1138 |
| inventorySearchState | №0792 |
| inventoryServer | №1138 |
| inverted | №1138 |
| invertedPhone | №1138 |
| invHeaderACEl | №0792 |
| invis | №1079 |
| invisibleAttacker | №1078 |
| invisUsed | №0654 |
| invokeOptions | №0778 |
| invSrc | №1211 |
| ioff | №0068 |
| ionizer | №1079 |
| ionizerClass | №0654 |
| ionizerEngineer | №1079 |
| ionizerTarget | №1078 |
| ip | №0645 |
| ipcMain | №0885 |
| ipcRenderer | №0886 |
| ir | №0068 (+ 1 других файлов) |
| ironChinAttack | №1159 |
| ironChinTarget | №1159 |
| irregular | №0060 |
| is | №1127 |
| isActionProcessed | №0790 |
| isActive | №0867 (+ 1 других файлов) |
| isAlreadyHas | №0821 |
| isAsiLevel | №0699 |
| isAttackOrCheck | №0771 |
| isAutoOn | №0867 |
| isAvailable | №0835 |
| isBlood | №0810 |
| isBomb | №0077 |
| isChecked | №0623 (+ 4 других файлов) |
| isCrit | №0835 |
| isDead | №0077 |
| isDebug | №0831 |
| isDebugEnabled | №0770 |
| isDestroyed | №0796 |
| isDrawerOpen | №0771 |
| isEnabled | №0831 (+ 1 других файлов) |
| isExpert | №0771 |
| isExtraHero | №0699 |
| isFinesse | №0771 |
| isFinger | №0060 |
| isFinite | №1176 (+ 15 других файлов) |
| isFirearm | №0822 |
| isFree | №0843 |
| isGhost | №0645 (+ 1 других файлов) |
| isGhostExtra | №0645 |
| isGhostHero | №0699 |
| isGrouped | №0790 |
| isHeavyOrExceeds | №0791 |
| isHero | №0772 |
| isHidden | №0792 |
| isInterfaceHidden | №0867 |
| isize | №0068 |
| isLandscape | №0885 |
| isLeft | №0058 |
| isMartial | №0822 |
| isMoreStep | №0814 |
| isNewClass | №0699 (+ 1 других файлов) |
| isolated | №1260 |
| isolatedFound | №1260 |
| isolatedLegacy | №1260 |
| isOverLimit | №0835 |
| isOverweight | №0791 |
| isParasite | №0645 (+ 1 других файлов) |
| isParasiteExtra | №0645 |
| isParasiteHero | №0699 |
| isPhbA | №0835 |
| isPlayingAmbience | №0081 |
| isPOT | №0072 |
| isPrepared | №0835 |
| isProf | №0623 (+ 2 других файлов) |
| isProficient | №0771 |
| isRanged | №0771 |
| isRepeatOneOn | №0081 |
| isRight | №0058 |
| isRite | №0640 |
| isRowActionProcessed | №0790 |
| isSelected | №0081 (+ 1 других файлов) |
| isShield | №0792 |
| isShuffleOn | №0081 |
| isSimple | №0822 |
| isSuccess | №0771 |
| issues | №0671 |
| isSwarm | №0645 (+ 1 других файлов) |
| isSwarmExtra | №0645 |
| isSwarmHero | №0699 |
| isWalterHero | №0699 |
| isWalterParasite | №0645 (+ 1 других файлов) |
| isWalterParasiteExtra | №0645 |
| isWalterParasiteHero | №0699 |
| it | №0664 (+ 4 других файлов) |
| item | №0061 (+ 38 других файлов) |
| itemArray | №0791 |
| itemCards | №0791 |
| itemCategory | №0792 |
| itemData | №0791 (+ 1 других файлов) |
| itemId | №0798 (+ 2 других файлов) |
| itemName | №0792 |
| itemRegistry | №0791 |
| items | №0060 (+ 14 других файлов) |
| iterations | №0819 |
| iv | №0068 (+ 3 других файлов) |
| iw | №0778 (+ 1 других файлов) |
| ix | №0057 (+ 3 других файлов) |
| j | №0057 (+ 24 других файлов) |
| J | №0060 |
| jaw | №0060 |
| jb | №1124 (+ 1 других файлов) |
| jh | №1124 (+ 1 других файлов) |
| ji | №0067 |
| jinx | №0654 |
| job | №0817 |
| joinBox | №0809 |
| jointIds | №1094 |
| joints | №0057 (+ 4 других файлов) |
| journal | №0854 (+ 1 других файлов) |
| JOURNAL | №0652 (+ 1 других файлов) |
| jp | №1124 |
| jpad | №1268 |
| JSDOM | №1133 |
| json | №0068 (+ 12 других файлов) |
| JSON | №0662 (+ 55 других файлов) |
| jsonBytes | №1118 |
| jsonBytes0 | №1118 |
| jsonPad | №1118 |
| k | №0058 (+ 111 других файлов) |
| K | №0067 (+ 1 других файлов) |
| keep | №0060 (+ 4 других файлов) |
| keepConditions | №0077 |
| keepEffects | №0077 |
| keepFaces | №0057 |
| keepResistance | №0077 |
| key | №0060 (+ 63 других файлов) |
| KEY | №0059 (+ 20 других файлов) |
| keyName | №0077 |
| keys | №0060 (+ 6 других файлов) |
| kg | №0790 |
| kgInput | №0790 |
| killer | №0782 |
| kind | №0060 (+ 20 других файлов) |
| kinds | №0817 (+ 1 других файлов) |
| kingAlly | №0818 |
| kingEnemy | №1140 |
| kingSelect | №1140 |
| knee | №0060 |
| kneeHigh | №0060 |
| kneeLine | №0060 |
| kneeLow | №0060 |
| knockout | №1159 |
| knockoutHero | №1159 |
| knockoutTarget | №1159 |
| knot | №0062 |
| known | №0077 (+ 8 других файлов) |
| KNOWN | №0827 (+ 1 других файлов) |
| knownCantrips | №0077 |
| knownFormula | №0778 |
| knownProcessed | №0672 |
| knownSpell | №1170 |
| ko | №0778 |
| koMod | №1160 |
| koRoll | №0778 |
| koTarget | №1160 |
| l | №0060 (+ 44 других файлов) |
| L | №0057 (+ 2 других файлов) |
| la | №0810 |
| label | №0062 (+ 10 других файлов) |
| labels | №0062 (+ 2 других файлов) |
| LABELS | №0870 |
| lamp | №1134 |
| landed | №1138 |
| landscape | №0885 (+ 1 других файлов) |
| langCount | №0645 |
| langs | №0827 |
| LANGS | №0827 |
| langStr | №0645 |
| langText | №0823 |
| larva | №0060 (+ 1 других файлов) |
| larvaBounds | №0062 |
| larval | №0062 |
| last | №0057 (+ 7 других файлов) |
| lastError | №0062 |
| lastFace | №1130 |
| lastResult | №0800 |
| lastRow | №1104 |
| lastTap | №0796 |
| lastVertex | №1130 |
| late | №1080 |
| latitude | №0057 |
| latitudes | №0057 |
| launchTour | №0814 |
| layer | №0060 |
| layout | №1279 (+ 1 других файлов) |
| lazarusOwner | №1079 |
| lbs | №0790 |
| le | №0864 |
| lead | №0775 (+ 1 других файлов) |
| leaf | №0062 |
| leafSize | №1126 |
| lean | №0060 |
| learned | №0669 |
| leather | №0062 |
| leatherQty | №0662 |
| leaving | №1140 |
| leavingReach | №0818 |
| left | №0061 (+ 13 других файлов) |
| leftReaction | №0654 |
| leg | №0060 (+ 1 других файлов) |
| legacy | №0822 (+ 9 других файлов) |
| legacyCount | №1317 |
| legacyCurses | №0076 |
| legacyHuman | №1081 |
| legacyPact | №0797 |
| legacyUrl | №1260 |
| legend | №0062 |
| legPhase | №0060 |
| len | №0060 (+ 12 других файлов) |
| length | №0057 (+ 2 других файлов) |
| lengths | №1129 |
| level | №0057 (+ 39 других файлов) |
| level1 | №0777 |
| levelData | №0699 (+ 1 других файлов) |
| levelDisplays | №0699 |
| levelFilter | №0835 |
| levelFour | №1079 |
| levelInput | №0830 |
| levelInputs | №0699 |
| levelOk | №0835 |
| levelReq | №0778 |
| levels | №0674 (+ 23 других файлов) |
| LEVELS | №0669 |
| levelSources | №0835 |
| levelSpells | №0835 |
| levelUp | №1105 |
| levelUpBtn | №0779 |
| levelUpSrc | №1211 |
| levelVal | №0835 |
| li | №0071 (+ 1 других файлов) |
| lie | №1158 |
| lifecycle | №0792 |
| lift | №0060 |
| light | №0072 |
| lightArmor | №0654 |
| lightFloor | №0072 |
| lightLimitKg | №0791 |
| lightLimitLb | №0791 |
| lights | №0070 |
| lim | №0817 |
| limbRanges | №0060 |
| limbSamples | №0060 |
| limbSelect | №0062 |
| limit | №0060 (+ 3 других файлов) |
| limits | №0062 |
| limitStr | №0791 |
| line | №0060 (+ 8 других файлов) |
| lineno | №0770 |
| lines | №0826 |
| lingerie | №0061 |
| lingerieAtlas | №0061 |
| link | №0796 (+ 1 других файлов) |
| linked | №1138 |
| linkedPhone | №1138 |
| links | №0057 (+ 1 других файлов) |
| lip | №0060 |
| list | №0059 (+ 41 других файлов) |
| listContainer | №0081 (+ 2 других файлов) |
| listContainers | №0788 |
| listener | №0886 |
| listeners | №0652 (+ 1 других файлов) |
| lit | №1134 |
| lItem | №0645 |
| live | №0062 (+ 6 других файлов) |
| LIVE_PROGRESSION_KEYS | №0648 |
| liveFoe | №1142 |
| liveKey | №0648 |
| livePC | №1138 |
| livePhone | №1138 |
| liveRoot | №0885 |
| liveServer | №1138 |
| liveSnake | №1138 |
| lo | №0060 (+ 7 других файлов) |
| LOAD_FILES | №0662 |
| loader | №1119 |
| lobe | №0060 |
| loc | №1080 |
| local | №0060 (+ 5 других файлов) |
| localData | №0831 |
| localId | №0652 |
| localStorage | №1122 |
| location | №0817 |
| lock | №0885 |
| locked | №0668 (+ 1 других файлов) |
| locks | №0060 (+ 1 других файлов) |
| logBox | №0770 |
| logContainer | №0771 |
| logContent | №0789 |
| logDiv | №0789 |
| logItem | №0771 |
| logLine | №0770 |
| logs | №0831 |
| logText | №0771 (+ 1 других файлов) |
| long | №0062 (+ 1 других файлов) |
| longFired | №0862 |
| longitude | №0057 |
| longTimer | №0862 |
| looksLikeModal | №0831 |
| lookup | №0060 |
| loop | №0057 |
| loot | №0626 (+ 18 других файлов) |
| LOOT_MODELS | №0805 |
| los | №0655 (+ 1 других файлов) |
| loss | №0640 (+ 1 других файлов) |
| low | №0060 (+ 6 других файлов) |
| lower | №0058 (+ 4 других файлов) |
| lowerId | №0061 |
| lowerJaw | №0060 |
| lowerLang | №0645 |
| lowerName | №0623 |
| lowerOptions | №0061 |
| lowerTool | №0645 |
| lowest | №0057 |
| loX | №0060 |
| loY | №0060 |
| lr | №0810 (+ 1 других файлов) |
| ls | №0072 (+ 2 других файлов) |
| lv | №0077 (+ 1 других файлов) |
| lvl | №0785 (+ 8 других файлов) |
| lvl1Options | №0645 |
| lvlA | №0835 |
| lvlB | №0835 |
| lvlBadge | №0835 |
| lvlDisplay | №0831 |
| lvlInput | №0831 |
| lx | №0071 |
| Lx | №0071 |
| ly | №0071 |
| Ly | №0071 |
| m | №0058 (+ 102 других файлов) |
| M | №0069 (+ 8 других файлов) |
| m0 | №1080 |
| m1 | №0673 (+ 1 других файлов) |
| m2 | №0673 |
| macro | №1316 |
| macroFile | №1316 |
| macros | №1124 (+ 2 других файлов) |
| madBomber | №0654 |
| mag | №0062 (+ 1 других файлов) |
| MAGE_CATALOG_AUDITED | №0817 |
| MAGE_HANDLERS | №0817 |
| MAGE_LEVEL2 | №0817 |
| mageActors | №0818 |
| mageApi | №0818 |
| mageBack | №1138 |
| mageBerryCount | №0818 |
| mageCon | №1138 |
| mageDarts | №0818 (+ 1 других файлов) |
| mageGround | №0818 |
| magePC | №1138 |
| magePending | №0818 |
| magePhone | №1138 |
| mageRoster | №1138 |
| mageSelect | №1140 |
| mageServer | №1138 |
| mageSpell | №0818 |
| mageStat | №0818 |
| mageTargets | №0818 |
| mageType | №0818 |
| mageWilling | №0818 |
| magic | №1211 |
| magicFistHero | №1159 |
| magicHit | №1159 |
| main | №0061 |
| mainCard | №0771 |
| mainWindow | №0885 |
| major | №1138 |
| MAJOR_ACTIONS | №0817 |
| MAJORS | №0820 |
| male | №1099 |
| malePositions | №1080 |
| maleRef | №1099 |
| malformed | №1085 (+ 3 других файлов) |
| manager | №1259 |
| manifest | №0794 (+ 4 других файлов) |
| manifestPath | №0888 (+ 1 других файлов) |
| manifestUrl | №0841 |
| manual | №1086 (+ 1 других файлов) |
| map | №0060 (+ 25 других файлов) |
| Map | №1120 (+ 5 других файлов) |
| mapPaths | №1772 |
| mapped | №0778 |
| mapping | №0060 (+ 1 других файлов) |
| maps | №0870 (+ 1 других файлов) |
| mapToVar | №0833 |
| mark | №0640 (+ 1 других файлов) |
| market | №0799 (+ 2 других файлов) |
| mask | №0058 (+ 2 других файлов) |
| MASS_HARVEST_MATERIALS | №0805 |
| master | №0664 (+ 2 других файлов) |
| mastery | №0810 |
| masteryNames | №0810 |
| mat | №0061 (+ 8 других файлов) |
| match | №0779 (+ 6 других файлов) |
| matches | №0647 (+ 2 других файлов) |
| material | №0061 (+ 2 других файлов) |
| MATERIAL_BRIDGE | №0805 |
| MATERIAL_DEFS | №0671 |
| materialCells | №0061 |
| materialIds | №0671 |
| materials | №0061 (+ 3 других файлов) |
| MATERIALS | №0666 (+ 2 других файлов) |
| math | №1105 (+ 2 других файлов) |
| Math | №1078 (+ 63 других файлов) |
| matrices | №0057 (+ 1 других файлов) |
| matrix | №0057 (+ 1 других файлов) |
| mats | №0663 (+ 6 других файлов) |
| max | №0060 (+ 37 других файлов) |
| MAX | №0802 (+ 3 других файлов) |
| MAX_CR | №0832 |
| MAX_DEPTH | №0788 |
| MAX_ERRORS | №0852 |
| MAX_FILES | №0888 |
| MAX_PLAYERS | №0809 |
| MAX_TOTAL_BYTES | №0888 |
| max2 | №0812 |
| maxAllowedLevel | №0835 |
| maxAt | №1150 |
| maxBuilder | №1105 |
| maxCapacityKg | №0791 (+ 1 других файлов) |
| maxCapacityLb | №0791 |
| maxDisplacement | №1123 |
| maxDistance | №1094 |
| maxFaces | №0057 (+ 1 других файлов) |
| maxHero | №1138 |
| maxHit | №1138 |
| maxHp | №0623 (+ 3 других файлов) |
| maxHP | №0868 |
| maximize | №0654 |
| maximum | №0654 (+ 2 других файлов) |
| maxIndex | №1130 |
| maxLevel | №0835 |
| maxOutside | №1268 |
| maxPrepared | №0835 |
| maxRestore | №0647 |
| maxRoll | №1105 |
| maxSpell | №0834 |
| maxSteps | №0655 |
| maxTargets | №1125 |
| maxTex | №0072 |
| maxUses | №0653 (+ 1 других файлов) |
| maxVal | №0835 |
| maxVertices | №0062 (+ 6 других файлов) |
| maxX | №0070 |
| maxY | №0070 |
| MC1 | №0629 |
| mctx | №1252 (+ 1 других файлов) |
| MCV2 | №0630 |
| md | №0072 (+ 2 других файлов) |
| me | №0068 (+ 1 других файлов) |
| mean | №0057 (+ 6 других файлов) |
| meanUniform | №1104 |
| mechanics | №0832 |
| MECHANICS | №0076 (+ 2 других файлов) |
| medium | №0640 |
| mediumLimitKg | №0791 |
| mediumLimitLb | №0791 |
| members | №0817 |
| memory | №1087 |
| mental | №0783 (+ 1 других файлов) |
| menu | №0814 |
| merged | №0062 (+ 1 других файлов) |
| mesh | №0060 (+ 4 других файлов) |
| meshes | №0068 (+ 2 других файлов) |
| message | №0062 (+ 18 других файлов) |
| messages | №0073 |
| meta | №0063 (+ 7 других файлов) |
| META_COST | №0647 |
| META_NAMES | №0647 |
| METAS | №0076 |
| method | №0652 |
| mettle | №0654 |
| mh | №0060 (+ 5 других файлов) |
| mi | №0068 (+ 2 других файлов) |
| microEntry | №0062 |
| mid | №0060 (+ 1 других файлов) |
| middles | №0057 |
| migrated | №0810 |
| mimeTypes | №0885 |
| min | №0060 (+ 7 других файлов) |
| minBuilder | №1105 |
| mind | №0815 |
| minimumLevel | №0647 |
| minIndex | №1130 |
| minor | №1151 |
| MINOR_ACTIONS | №0817 |
| mins | №0867 |
| minutes | №0867 (+ 1 других файлов) |
| minutesSinceDeath | №0077 |
| minutesVal | №0867 |
| minVal | №0785 |
| minX | №0070 |
| minY | №0070 |
| miss | №1154 |
| missArena | №1159 |
| missedKnockoutHero | №1159 |
| missedKnockoutTarget | №1159 |
| misses | №1126 (+ 3 других файлов) |
| missing | №0663 (+ 10 других файлов) |
| missingReliefRoll | №1079 |
| missingTools | №0671 |
| missTarget | №1159 |
| mix | №0078 (+ 1 других файлов) |
| mixed | №1082 (+ 1 других файлов) |
| mj | №0778 |
| ml | №0060 |
| mm | №0072 (+ 2 других файлов) |
| mn | №0080 (+ 7 других файлов) |
| mo | №0072 |
| mob | №1138 |
| mobile | №1138 |
| mobileArmor | №1138 |
| mobileArmored | №1138 |
| mobileArtisan | №1138 |
| mobileBerry | №1138 |
| mobileBurden | №1138 |
| mobileDarts | №1138 |
| mobileDash | №1138 |
| mobileIllusion | №1138 |
| mobileMage | №1138 |
| mobilePoison | №1138 |
| mobileQueen | №1138 |
| mobileRange | №0072 |
| mobileSnake | №1138 |
| mobileStand | №1138 |
| mod | №0623 (+ 9 других файлов) |
| modal | №0081 (+ 13 других файлов) |
| modalColorOptions | №0867 |
| modalHTML | №0699 |
| modals | №0792 |
| modDisplay | №0771 (+ 1 других файлов) |
| mode | №0069 (+ 21 других файлов) |
| modeButtons | №0771 |
| model | №0805 (+ 2 других файлов) |
| models | №1772 |
| modeRadio | №0646 |
| modes | №1157 (+ 2 других файлов) |
| modeSelect | №0790 |
| modifier | №0653 (+ 1 других файлов) |
| modifierMatch | №0771 |
| modifiers | №1159 |
| MODIFIERS | №0673 |
| modMatches | №0835 |
| modName | №0771 |
| modNum | №0623 (+ 1 других файлов) |
| mods | №0654 (+ 5 других файлов) |
| modSourceLabel | №0771 |
| modStr | №0623 (+ 3 других файлов) |
| modTag | №0623 (+ 1 других файлов) |
| modules | №1057 (+ 37 других файлов) |
| modVal | №0771 (+ 1 других файлов) |
| monk | №1224 (+ 1 других файлов) |
| monster | №0804 (+ 2 других файлов) |
| MONSTER_RECIPES | №0805 |
| monsterCount | №0804 |
| monsterId | №0810 |
| monsterName | №0806 (+ 1 других файлов) |
| monsters | №0626 (+ 13 других файлов) |
| MONSTERS | №0654 |
| monsterSrc | №1232 |
| monstrousGrafts | №0077 |
| morph | №1126 (+ 2 других файлов) |
| morphBytes | №1118 |
| morphed | №1081 |
| morphName | №1118 |
| morphOffset | №1118 |
| morphPrimitives | №1121 (+ 1 других файлов) |
| morphTargets | №1121 |
| motion | №0062 |
| motionBack | №1138 |
| motionPC | №1138 |
| motionPhone | №1138 |
| motionRoster | №1138 |
| motionServer | №1138 |
| mouth | №0060 |
| mouthDistance | №0060 |
| mouthRadius | №0060 |
| mouthRY | №0060 |
| mouthY | №0060 |
| move | №0069 (+ 1 других файлов) |
| moved | №0862 (+ 3 других файлов) |
| moveExtraPanelsIntoDrawer | №0771 |
| moveHero | №1138 |
| moveId | №1145 |
| moveItemToContainer | №0788 |
| movement | №0073 |
| movePC | №1138 |
| movePhone | №1138 |
| moveRoster | №1138 |
| movers | №0817 |
| moveServer | №1138 |
| moving | №0060 |
| moxie | №0778 |
| moxieBeforeMiss | №1159 |
| mp | №0647 (+ 2 других файлов) |
| mr | №0647 (+ 2 других файлов) |
| mrko | №0778 |
| ms | №0068 (+ 2 других файлов) |
| msg | №0831 (+ 11 других файлов) |
| msgEl | №0791 |
| mult | №0623 (+ 5 других файлов) |
| multi2 | №0668 |
| MULTICLASS_PROFICIENCIES_2014 | №0712 |
| MULTICLASS_REQUIREMENTS | №0785 |
| MULTIPLIER | №0804 |
| multiRules | №0699 |
| mults | №0789 |
| muscle | №0060 |
| mutableHit | №1078 |
| mutableTarget | №1078 |
| mutagenAbility | №0077 |
| mutagenAlly | №1079 |
| mutagenHero | №1079 |
| mutagenist | №1079 |
| mutagenNames | №0640 |
| mutagenResult | №1079 |
| mutagens | №0640 |
| mutatedCap | №0077 |
| MUTATION_SLOTS | №0815 (+ 1 других файлов) |
| mutations | №0791 (+ 4 других файлов) |
| mutCreated | №0778 |
| muts | №0838 |
| muzzle | №0060 (+ 3 других файлов) |
| mv | №0655 |
| mw | №0060 |
| mx | №0072 (+ 6 других файлов) |
| my | №0072 (+ 1 других файлов) |
| mysteries | №0812 |
| mythic | №1168 (+ 1 других файлов) |
| n | №0058 (+ 144 других файлов) |
| N | №0057 (+ 3 других файлов) |
| n2 | №1255 |
| nailLen | №0060 |
| name | №0058 (+ 167 других файлов) |
| NAME | №0834 (+ 1 других файлов) |
| NAME_ALIASES | №0801 |
| name2 | №0778 |
| nameA | №0835 |
| nameB | №0835 |
| nameInp | №0790 |
| nameInput | №0623 (+ 2 других файлов) |
| nameLower | №0771 |
| nameRu | №1258 |
| names | №0058 (+ 23 других файлов) |
| NAMES | №0627 (+ 12 других файлов) |
| nameSpan | №0792 (+ 1 других файлов) |
| NaN | №1168 |
| native | №0841 (+ 1 других файлов) |
| nativeBridge | №0809 |
| nativeClear | №0652 |
| nativePacketSeq | №0809 |
| nativeRemove | №0652 |
| nativeSeenSeqByPeer | №0809 |
| nativeSet | №0652 |
| nativeVersion | №0841 |
| natural | №0832 |
| naturalAttack | №1168 |
| naturalGrafts | №0077 |
| naturalTwenty | №0654 |
| nb | №0060 |
| nctx | №1251 |
| ne | №1227 (+ 7 других файлов) |
| near | №0057 (+ 2 других файлов) |
| nearest | №0655 (+ 1 других файлов) |
| nearestAt | №0060 |
| nearestDist | №0655 |
| neck | №0060 |
| neckDrop | №0061 |
| neckFront | №0061 |
| neckIndices | №0060 |
| neckMap | №0060 |
| neckNormals | №0060 |
| neckZ | №0060 |
| necromanticRevival | №0654 |
| necrotic | №0654 |
| needsSave | №0654 |
| needsSubclassChoice | №0699 |
| needsTarget | №0778 |
| net | №0772 (+ 4 других файлов) |
| neutral | №1082 (+ 3 других файлов) |
| newChar | №0623 (+ 1 других файлов) |
| newcomer | №1151 (+ 1 других файлов) |
| newCount | №0792 |
| newCp | №0789 |
| newEntry | №0795 |
| newEp | №0789 |
| newFolder | №0811 |
| newGp | №0789 |
| newId | №0623 (+ 2 других файлов) |
| newLevel | №0830 (+ 1 других файлов) |
| newLvl | №0831 |
| newMax | №0699 |
| newPeer | №1245 |
| newPp | №0789 |
| newRace | №0823 |
| newSp | №0789 |
| newSpell | №0835 |
| newTemp | №0077 |
| newTotalLevel | №0699 |
| newVal | №0623 (+ 2 других файлов) |
| newVol | №0081 |
| next | №0057 (+ 18 других файлов) |
| nextHp | №0077 |
| nextLevel | №0699 |
| nextLevelExpReq | №0779 |
| nextRemaining | №0077 |
| nf | №0072 |
| ng | №1246 (+ 2 других файлов) |
| ni | №0060 (+ 2 других файлов) |
| nk | №0060 (+ 1 других файлов) |
| nl | №0060 |
| nm | №0864 |
| nn | №1126 (+ 3 других файлов) |
| nnx | №0060 |
| nnz | №0060 |
| no | №1174 |
| noChoice | №1079 |
| noClaws | №1100 |
| node | №0831 (+ 5 других файлов) |
| nodes | №0058 (+ 8 других файлов) |
| NODES | №0877 |
| noEars | №1102 |
| noGlow | №1281 |
| none | №0062 (+ 2 других файлов) |
| nonmagicalResistance | №0654 |
| nonmagicalVariants | №0654 |
| nonZero | №1126 (+ 2 других файлов) |
| nonzeroSource | №1129 |
| noRefill | №1138 |
| noReliefTarget | №1079 |
| noRiteDice | №1165 |
| norm | №0057 (+ 2 других файлов) |
| normal | №0060 (+ 5 других файлов) |
| normalAC | №0654 |
| normalizeClassKey | №0699 |
| normalized | №0712 (+ 3 других файлов) |
| normalizedCondition | №0654 |
| normalizedCurrentClass | №0699 |
| normalizedRequested | №0699 |
| normalizeLevelUpClassName | №0699 |
| normalizeYield | №0825 |
| normalRaceLabel | №0645 |
| normals | №0057 (+ 1 других файлов) |
| nose | №0060 |
| noseDepth | №0060 |
| nosePart | №0060 |
| noseTop | №0060 |
| noseWidth | №0060 |
| noseY | №0060 |
| noseZ | №0060 |
| nostril | №0060 |
| nostrils | №0060 |
| note | №0654 (+ 2 других файлов) |
| noteCase | №1771 |
| noteInput | №1771 |
| now | №0060 (+ 5 других файлов) |
| np | №0060 |
| npot | №0072 |
| null | №0831 (+ 15 других файлов) |
| num | №0785 (+ 1 других файлов) |
| Number | №0662 (+ 25 других файлов) |
| numbers | №0061 |
| nums | №0810 |
| nw | №0778 |
| nx | №0060 (+ 1 других файлов) |
| ny | №0057 (+ 1 других файлов) |
| nylon | №0062 |
| nz | №0057 (+ 2 других файлов) |
| o | №0058 (+ 53 других файлов) |
| oa | №0778 |
| obj | №0070 (+ 5 других файлов) |
| Object | №0662 (+ 23 других файлов) |
| objectBomber | №1078 |
| objectId | №0647 (+ 2 других файлов) |
| objectIds | №0827 |
| objPath | №1118 (+ 6 других файлов) |
| objs | №0071 |
| observer | №0791 (+ 3 других файлов) |
| observerTarget | №0791 |
| oc | №1229 |
| oc2 | №1229 |
| occultIds | №1167 |
| occultistPack | №0778 |
| occupied | №0829 |
| od | №0810 |
| odd | №0817 |
| odds | №0818 (+ 4 других файлов) |
| odr | №0810 |
| off | №0062 (+ 6 других файлов) |
| offer | №0800 (+ 3 других файлов) |
| offered | №0801 |
| offers | №0800 (+ 1 других файлов) |
| offHoof | №1100 |
| offset | №0060 (+ 7 других файлов) |
| oh | №0071 (+ 1 других файлов) |
| oi | №0071 (+ 2 других файлов) |
| oid | №0778 |
| oilDamage | №0654 |
| ok | №0071 (+ 10 других файлов) |
| ol | №0072 |
| old | №0064 (+ 47 других файлов) |
| oldAngle | №0064 |
| oldBin | №1118 |
| oldBuffer | №1080 |
| oldChar | №1245 |
| oldCharacter | №1245 |
| oldCombatForDemolition | №1079 |
| oldData | №0831 |
| oldDrawer | №0771 |
| oldEffects | №0077 |
| oldHead | №1081 |
| oldHost | №0771 |
| oldHp | №0077 |
| oldId | №0654 (+ 1 других файлов) |
| oldInitRender | №0826 |
| oldLength | №0057 |
| oldLevel | №0669 |
| oldMax | №0076 (+ 1 других файлов) |
| oldNet | №1245 |
| oldPact | №0826 |
| oldPeer | №0810 |
| oldRAF | №1271 (+ 18 других файлов) |
| oldRandom | №0662 (+ 1 других файлов) |
| oldRandomForBurn | №1078 |
| oldRandomMutable | №1078 |
| oldRandomObject | №1078 |
| oldRandomPoison | №1078 |
| oldRandomSlime | №1078 |
| oldRenderDndTools | №0826 |
| oldRoll | №1236 |
| oldSelect | №0790 |
| oldTemp | №0077 |
| oldTotal | №0699 |
| on | №0062 (+ 6 других файлов) |
| onchange | №0818 |
| one | №1153 |
| oneTwoTarget | №0778 |
| onPhone | №1138 |
| onProgress | №0841 |
| oozeRancher | №0654 |
| oozeRancherAcidResistance | №0654 |
| oozeTarget | №1078 |
| op | №0062 (+ 2 других файлов) |
| opacity | №0867 (+ 1 других файлов) |
| opacityVal | №0867 |
| open | №0647 (+ 2 других файлов) |
| openedHero | №0818 |
| opening | №0771 |
| openPanels | №1102 |
| openSet | №0795 |
| openSky | №0817 |
| operationId | №0820 |
| opportunityAttacker | №0818 |
| opt | №0062 (+ 4 других файлов) |
| option | №0062 |
| options | №0060 (+ 22 других файлов) |
| opts | №0079 (+ 29 других файлов) |
| optsHtml | №0645 |
| orbit | №0060 |
| orc | №1231 |
| order | №0057 (+ 4 других файлов) |
| orderCtx | №1170 |
| origin | №0062 (+ 2 других файлов) |
| original | №0057 (+ 18 других файлов) |
| originalAppearance | №0077 |
| originalAttack | №0665 |
| originalBody | №1081 |
| originalCalculateMods | №0835 |
| originalContext | №1080 |
| originalCraft | №0665 (+ 1 других файлов) |
| originalCrypto | №1140 |
| originalDamage | №0665 |
| originalEnemyHp | №1140 |
| originalError | №0770 |
| originalHealingTarget | №0654 |
| originalIndex | №0792 |
| originalIndices | №1098 |
| originalLog | №0770 |
| originalOpenCharacter | №0835 |
| originalPhysical | №0832 |
| originalRepair | №0665 |
| originalUI | №1260 |
| originalUiCraft | №0665 |
| originLabel | №0062 |
| orphan | №0788 |
| os | №1077 (+ 5 других файлов) |
| ot | №0655 (+ 1 других файлов) |
| other | №0792 (+ 7 других файлов) |
| otherCat | №0792 |
| otherIndex | №0792 |
| otherIsShield | №0792 |
| otherName | №0792 |
| ott | №0778 |
| out | №0058 (+ 70 других файлов) |
| outcome | №0817 (+ 2 других файлов) |
| outer | №0057 (+ 2 других файлов) |
| outerWidth | №0057 |
| outPath | №1118 |
| output | №0062 (+ 4 других файлов) |
| outputId | №0672 (+ 1 других файлов) |
| outputName | №0672 (+ 1 других файлов) |
| outside | №0061 (+ 1 других файлов) |
| outsideBary | №1129 |
| overheated | №0077 |
| overheatedTarget | №1079 |
| overlay | №0796 (+ 3 других файлов) |
| overload | №1079 |
| overloadBefore | №1079 |
| overloadBomber | №1079 |
| overloadCost | №0077 |
| overrides | №0656 |
| ow | №0071 |
| own | №0655 (+ 1 других файлов) |
| owned | №0670 (+ 2 других файлов) |
| owner | №0062 (+ 10 других файлов) |
| ownerActor | №0655 |
| ownerBombHit | №1078 |
| ownerClass | №0077 |
| ownerCopy | №0820 |
| ownerId | №0829 |
| ox | №0067 (+ 2 других файлов) |
| oy | №0067 (+ 2 других файлов) |
| oz | №0067 (+ 1 других файлов) |
| p | №0058 (+ 162 других файлов) |
| P | №0068 (+ 2 других файлов) |
| p0 | №0060 |
| p1 | №0060 |
| pa | №0654 |
| pack | №0069 (+ 22 других файлов) |
| PACK_ID | №0077 (+ 2 других файлов) |
| PACK_MANIFEST | №0661 |
| packId | №0660 |
| packName | №0660 |
| packs | №0775 (+ 1 других файлов) |
| pact | №0647 (+ 3 других файлов) |
| PACT | №0797 |
| PACT_SLOTS | №0826 |
| pactBoxes | №0835 |
| pactLevel | №0826 |
| pactSlots | №0778 |
| pactState | №0826 |
| pad | №0060 |
| pads | №0060 |
| page | №0652 (+ 38 других файлов) |
| paid | №0802 (+ 1 других файлов) |
| paintAttack | №1079 |
| painter | №1079 |
| pair | №0057 (+ 2 других файлов) |
| pal | №1229 (+ 2 других файлов) |
| palette | №0061 (+ 1 других файлов) |
| palettes | №0062 |
| palm | №0060 |
| panel | №0061 (+ 6 других файлов) |
| panelHost | №0826 |
| panelsHidden | №0069 |
| panX | №0862 |
| panY | №0862 |
| parasiteHostTarget | №0645 |
| parent | №0067 (+ 3 других файлов) |
| parentArea | №0792 |
| parentId | №0838 |
| parsed | №0831 (+ 3 других файлов) |
| parsedHtml | №0771 |
| parsedSides | №0771 |
| parseFloat | №1078 (+ 15 других файлов) |
| parseInt | №1078 (+ 13 других файлов) |
| part | №0058 (+ 16 других файлов) |
| partner | №0817 |
| partnerSnapshot | №0817 |
| parts | №0060 (+ 29 других файлов) |
| partySize | №0804 |
| pass | №0057 (+ 3 других файлов) |
| passed | №1110 (+ 2 других файлов) |
| passInsight | №0623 (+ 1 других файлов) |
| passInvestigation | №0623 (+ 1 других файлов) |
| passive | №0778 (+ 2 других файлов) |
| passiveFeatures | №0077 |
| passPerception | №0623 (+ 1 других файлов) |
| password | №0650 (+ 1 других файлов) |
| pat | №0071 |
| patch | №0060 (+ 5 других файлов) |
| patchLootResult | №0825 |
| path | №0060 (+ 112 других файлов) |
| paths | №1114 |
| patient | №0077 (+ 1 других файлов) |
| patronNames | №0640 |
| patrons | №0640 (+ 1 других файлов) |
| paw | №0060 |
| payload | №0082 (+ 11 других файлов) |
| pb | №0076 (+ 7 других файлов) |
| PB | №0076 (+ 10 других файлов) |
| pbBreath | №0077 |
| pc | №0778 (+ 4 других файлов) |
| pcRoster | №1138 |
| pct | №0842 (+ 1 других файлов) |
| pd | №0877 |
| peace | №1138 |
| peacePhone | №1138 |
| peak | №1159 |
| peer | №0810 (+ 2 других файлов) |
| peerId | №0810 |
| peers | №0809 (+ 3 других файлов) |
| pelvisNode | №0057 |
| penalizedAttack | №1078 |
| penalizedSave | №1078 |
| penalty | №0640 |
| pending | №0063 (+ 14 других файлов) |
| pendingBloodAttack | №0654 |
| pendingBomb | №0077 |
| pendingContext | №0624 |
| pendingFeature | №0624 |
| pendingLevelUpData | №0699 |
| pendingReactions | №0810 |
| pendingSavantAttack | №0654 |
| pendingTargetId | №0624 |
| percent | №0062 (+ 2 других файлов) |
| perfumeAttack | №1078 |
| perfumeAttacker | №1078 |
| perfumeClass | №0654 |
| perfumeDC | №0654 |
| perfumeHero | №0654 |
| perfumeOwner | №1078 |
| perfumeOwnerState | №0654 |
| perfumeRound | №0654 |
| perfumeSave | №0654 |
| perfumeSource | №0654 |
| perfumeSourceClass | №0654 |
| perfumeState | №0654 |
| perfumeTargetId | №0654 |
| permission | №0885 |
| perms | №1132 |
| pev | №0810 |
| pf | №0832 |
| ph | №1234 |
| PH | №0071 |
| phase | №0060 (+ 1 других файлов) |
| phases | №1178 |
| pher | №0654 |
| pherDebuffs | №0077 |
| pheromone | №1078 (+ 1 других файлов) |
| pheromoneOwner | №1078 |
| pheromoneSave | №0077 |
| pheromoneTarget | №1078 (+ 1 других файлов) |
| phi | №0057 (+ 2 других файлов) |
| phone | №1110 (+ 2 других файлов) |
| phoneProtected | №1138 |
| phoneTraveller | №1138 |
| physical | №0654 (+ 1 других файлов) |
| physicalKey | №0832 |
| pi | №0067 (+ 5 других файлов) |
| pick | №0060 (+ 9 других файлов) |
| picked | №0640 (+ 1 других файлов) |
| picker | №0062 |
| picks | №0077 (+ 1 других файлов) |
| pid | №0669 (+ 1 других файлов) |
| pigmentClass | №0077 |
| pigmentist | №1079 |
| pinch | №0862 |
| pink | №0060 |
| PINNED_COMMIT | №1316 |
| pInput | №0789 |
| pipe | №1082 (+ 20 других файлов) |
| pitch | №0062 (+ 3 других файлов) |
| pivot | №0057 |
| pixel | №1289 |
| pixels | №1271 (+ 19 других файлов) |
| pl | №0692 (+ 2 других файлов) |
| plan | №0664 (+ 4 других файлов) |
| plane | №0060 (+ 1 других файлов) |
| PLANES | №0631 |
| plannedMove | №0810 |
| plates | №0060 |
| playable | №0820 |
| playBtn | №0081 |
| played | №1138 |
| plumage | №0060 |
| plume | №0060 |
| plus | №0057 (+ 1 других файлов) |
| pn | №0060 |
| po | №0778 |
| point | №0060 (+ 2 других файлов) |
| pointCostDiff | №0623 (+ 1 других файлов) |
| pointers | №0862 |
| points | №0060 (+ 10 других файлов) |
| pointsLeftEl | №0623 (+ 1 других файлов) |
| poisonBomb | №1079 |
| poisonedAttacker | №1078 |
| poisonedCombatant | №1078 |
| poisonedStrike | №1078 |
| poisonedWeaponAttack | №1079 |
| poisonImmuneTarget | №1078 |
| poisonPreview | №1078 |
| poisonWeapon | №0077 |
| poisonWeaponId | №0077 |
| pole | №0057 |
| policy | №0671 |
| poly | №0060 (+ 1 других файлов) |
| polygon | №0060 |
| pool | №0077 (+ 5 других файлов) |
| poolKind | №0077 |
| pools | №0078 |
| portraitBounds | №0885 |
| pos | №0057 (+ 10 других файлов) |
| pose | №0060 |
| posed | №0064 |
| poses | №0064 |
| position | №0817 |
| positionCounts | №1130 |
| positions | №0057 (+ 5 других файлов) |
| possibleIdElements | №0791 |
| potency | №0078 (+ 1 других файлов) |
| potential | №0060 |
| potion | №0077 (+ 2 других файлов) |
| potionColor | №0077 |
| potionIndex | №1174 |
| potions | №0077 |
| pounds | №0817 |
| power | №0060 (+ 1 других файлов) |
| pp | №0080 (+ 4 других файлов) |
| pPerG | №0789 |
| ppInput | №0789 |
| ppVal | №0789 |
| pr | №0640 (+ 2 других файлов) |
| pre | №0076 |
| predicate | №0060 |
| predict | №1104 |
| predictorTrump | №0654 |
| preFeatSelect | №0699 |
| preferPact | №0647 |
| prefix | №0788 (+ 3 других файлов) |
| preloadPath | №1317 |
| prep | №1229 |
| PREP | №0802 (+ 1 других файлов) |
| prepared | №0640 (+ 3 других файлов) |
| preparedAny | №0810 |
| preparedCount | №0835 |
| preparedFormula | №0077 |
| preparedReaction | №0810 |
| preparedReservation | №0810 |
| prepProfile | №0835 |
| prereq | №0843 |
| preS | №0699 |
| preS1 | №0699 |
| preS2 | №0699 |
| preset | №0061 (+ 3 других файлов) |
| presets | №0065 (+ 1 других файлов) |
| preStats | №0699 |
| prev | №0057 (+ 2 других файлов) |
| preview | №0792 (+ 2 других файлов) |
| previous | №0057 (+ 11 других файлов) |
| previousAC | №0828 |
| previousActive | №0772 |
| previousCount | №1095 |
| previousFetch | №1114 (+ 1 других файлов) |
| previousMageCrypto | №1140 |
| previousRoot | №0772 |
| price | №0666 (+ 1 других файлов) |
| prim | №1118 |
| primary | №0080 (+ 1 других файлов) |
| primaryStat | №0692 |
| prime | №0778 |
| prior | №1163 (+ 2 других файлов) |
| prismaticIndex | №0077 |
| prismaticOptions | №0077 |
| prismAttack | №1079 |
| prismTester | №1079 |
| probe | №0060 (+ 1 других файлов) |
| proceed | №0699 |
| process | №1248 (+ 2 других файлов) |
| processedNames | №0825 |
| processing | №0662 (+ 1 других файлов) |
| PROCESSING | №0671 |
| PROCESSING_DC_BY_RARITY | №0825 |
| PROCESSING_RECIPES | №0672 |
| PROCESSING_TOOL_BY_TYPE | №0825 |
| product | №0079 |
| prof | №0792 (+ 8 других файлов) |
| profBlock | №0744 |
| profBonus | №0623 (+ 4 других файлов) |
| profession | №0672 (+ 2 других файлов) |
| professionBonus | №0079 |
| professionId | №0669 |
| professionLayer | №0671 |
| professions | №0672 |
| PROFESSIONS | №0669 (+ 2 других файлов) |
| PROFICIENCIES_DB | №0821 |
| proficiencyBonus | №0771 |
| proficiencyChoiceHtml | №0699 |
| proficiencyType | №0792 |
| proficient | №0654 (+ 2 других файлов) |
| profId | №0821 (+ 1 других файлов) |
| profIds | №0822 |
| profile | №0057 (+ 10 других файлов) |
| profiles | №0061 (+ 4 других файлов) |
| profInput | №0835 |
| profName | №0822 (+ 1 других файлов) |
| profObj | №0822 (+ 1 других файлов) |
| profOk | №0877 |
| profs | №0792 (+ 3 других файлов) |
| prog | №0072 (+ 4 других файлов) |
| progress | №0818 |
| progressFrame | №0842 |
| progressHandler | №0841 |
| progression | №0076 (+ 11 других файлов) |
| progressPercent | №0779 |
| projected | №0788 (+ 1 других файлов) |
| projection | №0060 |
| projectManifest | №0852 |
| Promise | №1119 (+ 2 других файлов) |
| prompts | №1164 |
| prop | №0077 (+ 2 других файлов) |
| propContainer | №0790 |
| PROPERTIES | №0078 |
| proportions | №1316 |
| props | №0061 (+ 1 других файлов) |
| propTitle | №0790 |
| protectedCase | №1077 |
| protectedHero | №1138 |
| protectedKeys | №0831 |
| proto | №0652 |
| protocol | №0885 |
| proxy | №0810 (+ 1 других файлов) |
| ps | №0068 (+ 2 других файлов) |
| psiLimit | №0713 |
| psion | №1234 |
| psionDisciplines | №0778 |
| pt | №0640 |
| pu | №1234 |
| pugilist | №1160 |
| pugilistAC | №0654 |
| pugilistDefender | №0654 |
| pugilistDigDeepResistant | №0654 |
| pugilistLevelEntry | №0654 |
| pugilistPack | №0654 |
| pugilistSchool | №0654 |
| pugilistState | №0654 |
| pugilistStudy | №0654 |
| pupilDiagnostics | №1281 |
| pupilRound | №1281 |
| pupilSelect | №0062 |
| puppet | №1164 |
| puppetTarget | №0640 |
| puppetWeapon | №0640 |
| purity | №0078 (+ 1 других файлов) |
| pursuits | №0828 |
| pw | №1316 |
| PW | №0071 |
| px | №0060 (+ 2 других файлов) |
| PX | №0071 |
| py | №0062 (+ 1 других файлов) |
| PY | №0071 |
| pz | №0062 |
| q | №0057 (+ 37 других файлов) |
| Q | №0057 |
| q0 | №0060 |
| q1 | №0060 |
| qApi | №0792 |
| qd | №0673 |
| qi | №0782 |
| ql | №0057 |
| qn | №0064 |
| qr | №0778 |
| qs | №1138 |
| qty | №0663 (+ 1 других файлов) |
| quality | №0062 (+ 6 других файлов) |
| QUALITY | №0666 (+ 2 других файлов) |
| QUALITY_GRADES | №0663 |
| QUALITY_TIERS | №0664 |
| qualityFactor | №0663 |
| qualityKey | №0807 |
| qualityPenalty | №0663 |
| quantity | №0791 (+ 2 других файлов) |
| queen | №1138 |
| queenReceipt | №1138 |
| query | №0069 (+ 1 других файлов) |
| queue | №0817 (+ 1 других файлов) |
| queued | №0655 |
| quickGather | №0824 |
| quota | №0058 (+ 1 других файлов) |
| r | №0058 (+ 206 других файлов) |
| R | №0060 (+ 11 других файлов) |
| r0 | №0060 |
| r1 | №0060 (+ 2 других файлов) |
| r2 | №0771 (+ 1 других файлов) |
| race | №0062 (+ 12 других файлов) |
| raceDesc | №0645 |
| raceEntry | №0062 |
| raceId | №0065 (+ 7 других файлов) |
| raceImmune | №0654 |
| raceLabel | №0645 |
| raceList | №0671 |
| raceName | №0623 (+ 1 других файлов) |
| raceObj | №0823 |
| raceResistant | №0654 |
| races | №0065 (+ 3 других файлов) |
| raceSelect | №0623 (+ 2 других файлов) |
| rad | №0060 (+ 1 других файлов) |
| radial | №0060 |
| radii | №0060 |
| radius | №0057 (+ 5 других файлов) |
| raf | №0625 |
| raging | №0654 |
| raise | №0060 |
| rampage | №0655 |
| randIdx | №0081 |
| random | №1105 |
| randomSequence | №1159 |
| randomValue | №1159 |
| randomXOffset | №0771 |
| randomYOffset | №0771 |
| range | №0640 (+ 6 других файлов) |
| rangedIncoming | №0654 |
| rangeFt | №0810 |
| ranger | №1231 |
| rangeU | №1099 |
| rangeV | №1099 |
| rank | №0654 (+ 2 других файлов) |
| RANKS | №0820 |
| raphe | №0057 |
| rare | №0807 |
| rarity | №0666 (+ 4 других файлов) |
| RARITY | №0798 |
| RARITY_WEIGHT | №0877 |
| rarityOrder | №0792 |
| rate | №0060 (+ 1 других файлов) |
| rates | №1771 |
| ratio | №0072 (+ 3 других файлов) |
| rats | №0060 |
| raw | №0059 (+ 32 других файлов) |
| rawCat | №0801 |
| rawDestination | №1772 |
| rawItems | №0835 |
| rawParts | №0654 |
| rawRadial | №0061 |
| rawStats | №0792 |
| rawTotal | №0654 |
| rb | №0798 (+ 1 других файлов) |
| rBottom | №0062 |
| rd | №0778 (+ 1 других файлов) |
| rd0 | №0812 |
| re | №0812 (+ 1 других файлов) |
| reach | №0060 |
| reacted | №1138 |
| reaction | №0654 (+ 5 других файлов) |
| reactionButton | №1227 |
| reactionCtx | №0654 (+ 1 других файлов) |
| reactionReduction | №0654 |
| reactionResult | №0654 |
| reactions | №0810 |
| REACTIONS | №0828 |
| read | №0817 (+ 1 других файлов) |
| Readable | №0885 |
| reader | №0831 (+ 2 других файлов) |
| readGlb | №1082 (+ 5 других файлов) |
| readIndex | №1127 (+ 1 других файлов) |
| ready | №0817 (+ 3 других файлов) |
| reagentCount | №0077 |
| reagentGain | №0077 |
| reagentRoll | №0077 |
| reagentsBefore | №1079 |
| reagentTarget | №1079 |
| real | №1317 |
| realAttack | №1146 |
| realCrypto | №1140 |
| realSave | №1152 |
| realSet | №1110 |
| rear | №0060 |
| reason | №0665 (+ 7 других файлов) |
| rebuildMaterialUsage | №0671 |
| rec | №0744 (+ 4 других файлов) |
| receipt | №0073 (+ 1 других файлов) |
| receiptKey | №1110 |
| received | №0801 (+ 2 других файлов) |
| recharge | №0077 (+ 11 других файлов) |
| recipe | №0077 (+ 7 других файлов) |
| recipeId | №0667 |
| recipes | №0666 |
| RECIPES | №0667 (+ 2 других файлов) |
| recipient | №0640 (+ 1 других файлов) |
| record | №0059 (+ 1 других файлов) |
| recorded | №0817 |
| records | №0060 (+ 3 других файлов) |
| recovered | №0664 (+ 1 других файлов) |
| RECOVERY_BY_DURABILITY | №0663 |
| RECOVERY_BY_QUALITY | №0664 |
| red | №0647 |
| reduce | №0870 |
| reduced | №0640 |
| reduction | №0647 |
| ref | №0060 (+ 26 других файлов) |
| reference | №0060 (+ 1 других файлов) |
| referenceNode | №0789 |
| refresh | №0673 |
| refreshBase | №0673 |
| refreshing | №0652 |
| refs | №0079 (+ 3 других файлов) |
| refunded | №0810 |
| reg | №1228 |
| regeneration | №1079 |
| RegExp | №0662 (+ 6 других файлов) |
| region | №0062 (+ 2 других файлов) |
| REGION_MOD | №0798 |
| regionId | №0877 |
| regions | №0058 (+ 4 других файлов) |
| REGIONS | №0877 |
| registered | №1078 (+ 8 других файлов) |
| registry | №0057 (+ 3 других файлов) |
| reject | №0831 (+ 6 других файлов) |
| rejected | №1115 (+ 1 других файлов) |
| rel | №0800 (+ 6 других файлов) |
| relative | №0885 (+ 2 других файлов) |
| release | №1110 |
| releaseGate | №1076 |
| relief | №0077 |
| reliefCount | №0060 |
| reliefResult | №1079 |
| reliefTarget | №1079 |
| reloaded | №1146 |
| relocateGameplayPanels | №0771 |
| rem | №0789 |
| remaining | №0077 (+ 5 других файлов) |
| remainingReduction | №0654 |
| remote | №0650 (+ 2 других файлов) |
| remoteHead | №1077 |
| remoteStatus | №1138 |
| remove | №0062 |
| removeAt | №0077 |
| removed | №0057 (+ 5 других файлов) |
| removedGraft | №0077 |
| removeFromContainer | №0788 |
| render | №0078 (+ 7 других файлов) |
| renderList | №0667 (+ 1 других файлов) |
| renderRecipes | №0671 |
| renderTabs | №0670 |
| renderTools | №0671 |
| rep | №0060 |
| repair | №1112 |
| REPAIR_COST_PER_10 | №0663 |
| REPAIR_PROFILES | №0664 |
| repairBtn | №0792 |
| repairCount | №0663 |
| repaired | №1111 |
| repairPlan | №1111 |
| repCfg | №0060 |
| repeatBtn | №0081 |
| replace | №0640 (+ 1 других файлов) |
| replacement | №1140 |
| repo | №1772 |
| report | №0792 (+ 10 других файлов) |
| repSelect | №0062 |
| reptileCoreCache | №0060 |
| reptilePart | №0062 |
| req | №0647 (+ 52 других файлов) |
| reqHtml | №0744 |
| reqR | №0778 |
| reqs | №0785 |
| reqText | №0669 (+ 1 других файлов) |
| request | №0885 (+ 2 других файлов) |
| requested | №0647 (+ 3 других файлов) |
| requestedAoe | №0810 |
| requestedFeature | №0077 |
| requestedForm | №0778 |
| requestId | №0810 |
| requests | №1163 |
| require | №1248 (+ 1 других файлов) |
| required | №0669 (+ 1 других файлов) |
| requiredEnd | №1132 |
| requiredLevel | №0077 (+ 1 других файлов) |
| requireLevel | №0778 |
| requireTool | №0669 |
| reroll | №0647 (+ 3 других файлов) |
| res | №0647 (+ 45 других файлов) |
| resBox | №0646 (+ 2 других файлов) |
| resDiv | №0790 |
| reservation | №0834 |
| reserved | №0810 |
| reset | №0062 (+ 2 других файлов) |
| resetBuffer | №1080 |
| resist | №0849 |
| resistance | №0077 (+ 1 других файлов) |
| resistanceType | №0077 |
| resistanceTypes | №0077 |
| resistant | №0654 |
| resistantFire | №1078 |
| resistantTarget | №1159 |
| resisted | №1159 |
| resMap | №0647 |
| resolve | №0831 (+ 8 других файлов) |
| resolved | №0067 (+ 1 других файлов) |
| resolvedParts | №0654 |
| resource | №0782 (+ 2 других файлов) |
| RESOURCE_HINTS | №0824 |
| RESOURCE_PROCESSING | №0825 |
| RESOURCE_YIELDS | №0825 |
| resourceBefore | №1159 |
| resourceDefs | №0826 |
| resourceId | №0824 |
| resourceKind | №0810 |
| resources | №0877 (+ 1 других файлов) |
| response | №0841 (+ 3 других файлов) |
| responses | №1109 (+ 1 других файлов) |
| rest | №0778 (+ 2 других файлов) |
| restarted | №1110 |
| rested | №1150 |
| restId | №0820 (+ 1 других файлов) |
| restored | №0647 (+ 13 других файлов) |
| restoredShort | №0646 |
| restoredUse | №1079 |
| restoreFullCheckbox | №0699 |
| restoreUsed | №0077 |
| restStr | №0835 |
| result | №0060 (+ 63 других файлов) |
| resultPending | №0810 |
| results | №0064 (+ 10 других файлов) |
| resultText | №0646 (+ 1 других файлов) |
| resume | №0810 (+ 1 других файлов) |
| resumed | №0817 (+ 1 других файлов) |
| resumedStand | №1138 |
| resumeSpell | №0810 |
| retries | №0820 |
| retry | №0842 |
| returned | №1138 |
| returnedDash | №1138 |
| reused | №0888 |
| rev | №0810 |
| reveal | №0818 |
| reverse | №0061 |
| revision | №0652 (+ 2 других файлов) |
| revival | №1078 |
| revived | №1079 |
| revivedFromZero | №0654 |
| reward | №0669 (+ 4 других файлов) |
| rewardId | №0820 |
| rewards | №0669 |
| rewardX | №0818 |
| rewardY | №0818 |
| rgb | №0062 |
| rht | №0778 |
| ri | №1128 |
| rid | №0870 (+ 2 других файлов) |
| rider | №0837 |
| ridge | №1102 |
| RIDGE_STYLES | №0065 |
| ridges | №0060 |
| ridgeSelect | №0062 |
| ridgeStyle | №1308 |
| right | №0060 (+ 4 других файлов) |
| rigid | №1084 |
| ring | №0057 (+ 1 других файлов) |
| ringCount | №0057 |
| rings | №0061 |
| rise | №0061 (+ 2 других файлов) |
| risk | №0078 (+ 1 других файлов) |
| rite | №0640 (+ 2 других файлов) |
| riteId | №0778 |
| riteKnown | №0812 |
| riteMax | №0778 |
| riteNames | №0640 |
| rites | №0778 (+ 1 других файлов) |
| riteTypes | №0640 |
| rl | №0060 |
| rm | №0654 (+ 1 других файлов) |
| rn | №0812 |
| rn0 | №0812 |
| rn2 | №0812 |
| ro | №1224 |
| robe | №0060 |
| rock | №0062 |
| rogue | №1147 (+ 3 других файлов) |
| role | №0060 (+ 3 других файлов) |
| roleName | №0628 |
| roles | №0672 |
| roll | №0073 (+ 18 других файлов) |
| rolled | №0077 (+ 7 других файлов) |
| rolledRelief | №1079 |
| roller | №0804 (+ 1 других файлов) |
| rollMode | №0646 |
| rollResult | №1159 |
| rolls | №0646 (+ 9 других файлов) |
| rollTypeClass | №0771 (+ 1 других файлов) |
| roofColor | №0062 |
| room | №0815 |
| root | №0060 (+ 98 других файлов) |
| ROOT | №0662 (+ 10 других файлов) |
| rootId | №0852 (+ 1 других файлов) |
| roots | №0060 (+ 4 других файлов) |
| rootSurface | №0057 |
| rootT | №0060 |
| rootY | №0060 |
| rootZ | №0060 |
| roster | №0650 (+ 1 других файлов) |
| rotation | №0062 |
| rough | №0819 (+ 1 других файлов) |
| round | №0804 (+ 1 других файлов) |
| round4 | №1316 |
| rounds | №0832 |
| roundTracker | №0654 |
| roundTrip | №1081 |
| route | №1279 (+ 1 других файлов) |
| routed | №0647 |
| row | №0060 (+ 12 других файлов) |
| rows | №0060 (+ 11 других файлов) |
| ROWS | №0627 |
| rp | №1174 |
| rq | №1225 (+ 1 других файлов) |
| rr | №0060 (+ 8 других файлов) |
| rs | №0640 (+ 2 других файлов) |
| rt | №0647 (+ 1 других файлов) |
| rTop | №0062 |
| rule | №0062 (+ 11 других файлов) |
| rules | №0699 (+ 7 других файлов) |
| RULES | №0820 |
| run | №0072 (+ 2 других файлов) |
| ruName | №0699 (+ 1 других файлов) |
| rune | №0778 (+ 1 других файлов) |
| RUNEKEEPER_INSCRIBED | №0778 |
| runesBefore | №1169 |
| running | №0652 |
| runtime | №0802 (+ 33 других файлов) |
| runtimeFeatures | №0812 |
| runtimes | №0647 |
| runtimeSubclasses | №0812 |
| rw | №1316 |
| rx | №0060 (+ 4 других файлов) |
| rx2 | №0810 |
| ry | №0060 (+ 3 других файлов) |
| rz | №0060 (+ 3 других файлов) |
| rz2 | №0072 |
| s | №0057 (+ 175 других файлов) |
| S | №0071 (+ 1 других файлов) |
| s1 | №0699 |
| s2 | №0699 |
| sa | №0060 |
| safe | №0082 (+ 1 других файлов) |
| SAFE_FILE | №0888 |
| safeFeatureId | №0647 |
| safeGet | №0790 |
| safeName | №0653 |
| safeText | №0771 |
| salty | №1159 |
| saltyDC | №0778 |
| saltyEffect | №0647 |
| saltyHero | №1159 |
| saltyMods | №1159 |
| saltySave | №0778 |
| saltyTarget | №1159 |
| sam | №0067 |
| same | №0664 (+ 8 других файлов) |
| sample | №0060 (+ 4 других файлов) |
| sampleCount | №1132 |
| sampler | №0062 (+ 2 других файлов) |
| samples | №0060 (+ 1 других файлов) |
| sandbox | №1209 (+ 6 других файлов) |
| satin | №0062 |
| savage | №0778 |
| savantFlourish | №0654 |
| savantHP | №1169 |
| save | №0073 (+ 12 других файлов) |
| saveAdv | №0654 |
| saved | №0082 (+ 49 других файлов) |
| savedAlpha | №0831 |
| savedBg | №0867 |
| saveDC | №0640 |
| savedColor | №0867 |
| savedDim | №0867 |
| saveDebuffs | №0654 |
| savedFont | №0831 |
| savedHeritage | №1281 |
| saveDis | №0654 |
| savedOpacity | №0867 |
| savedRetreat | №1138 |
| savedSmall | №1281 |
| savedSurface | №1281 |
| savedTarget | №1166 |
| savedTheme | №0831 |
| savedWander | №1138 |
| saveResult | №0654 |
| saveRoll | №0783 (+ 2 других файлов) |
| saves | №0692 (+ 3 других файлов) |
| savesBeforeRefresh | №1140 |
| saveStat | №0778 |
| sb | №0669 (+ 2 других файлов) |
| sc | №0067 (+ 8 других файлов) |
| scale | №0057 (+ 11 других файлов) |
| scaled | №0062 |
| scalpBuckets | №0060 |
| scalpCache | №0060 |
| scalpSamples | №0060 |
| scene | №0068 (+ 3 других файлов) |
| scenes | №0062 |
| scheduleUpdate | №0791 |
| SCHEMA_VERSION | №0641 (+ 2 других файлов) |
| schoolDamageTarget | №1159 |
| schoolHero | №1159 |
| schoolSave | №1159 |
| schoolText | №0835 |
| scLower | №0835 |
| scoped | №0647 |
| score | №0060 (+ 8 других файлов) |
| scores | №0685 (+ 3 других файлов) |
| scoreSnapshots | №0077 |
| scout | №1134 |
| screen | №0814 (+ 1 других файлов) |
| script | №1077 |
| scripts | №1120 (+ 1 других файлов) |
| sctx | №1249 |
| sd | №0654 (+ 1 других файлов) |
| se | №0864 |
| sealDamage | №0697 |
| sealedHp | №1167 |
| seals | №0697 (+ 2 других файлов) |
| sealTarget | №1167 |
| seam | №0060 (+ 3 других файлов) |
| seamDamage | №1078 |
| seamGroups | №0057 |
| seamMax | №1082 (+ 1 других файлов) |
| seams | №0060 |
| searchInput | №0835 |
| searchVal | №0835 |
| second | №0817 (+ 1 других файлов) |
| secondary | №0060 |
| secondDead | №1079 |
| secondOpts | №0817 |
| seconds | №0817 |
| section | №0061 |
| seed | №0060 (+ 1 других файлов) |
| seekingAttack | №1079 |
| seen | №0073 (+ 6 других файлов) |
| seenEventIds | №0809 |
| seenNames | №0744 |
| seer | №1138 |
| seg | №0060 |
| segments | №0057 (+ 3 других файлов) |
| sel | №0645 (+ 5 других файлов) |
| select | №0062 (+ 6 других файлов) |
| selected | №0057 (+ 25 других файлов) |
| selected0 | №0660 (+ 1 других файлов) |
| selectedArmorCategory | №0790 |
| selectedAsset | №0069 |
| selectedBg | №0623 (+ 1 других файлов) |
| selectedChar | №0830 |
| selectedClass | №0623 (+ 2 других файлов) |
| selectedClassKey | №0699 |
| selectedClassName | №0699 |
| selectedClothes | №1279 |
| selectedFeatSelect | №0699 |
| selectedId | №0823 |
| selectedIds | №0712 |
| selectedNatural | №0077 |
| selectedRace | №0623 (+ 1 других файлов) |
| selectedSub | №0660 |
| selectedTarget | №0818 |
| selectedTrader | №0800 |
| selectedWeaponCategoryType | №0790 |
| selectedWeaponDice | №0790 |
| selectedWeaponProperties | №0790 |
| selectEl | №0790 |
| selectElem | №0795 |
| selector | №0791 |
| selectors | №0839 |
| selectScreen | №0623 (+ 1 других файлов) |
| selectType | №0790 |
| self | №0778 |
| selfActor | №0652 |
| sellFactor | №0799 |
| sellResult | №1174 |
| SEMVER | №0888 |
| send | №0885 |
| sent | №1217 (+ 7 других файлов) |
| sep | №0057 |
| seq | №0782 (+ 4 других файлов) |
| sequence | №1146 |
| serial | №1162 (+ 1 других файлов) |
| server | №1110 (+ 39 других файлов) |
| Server | №1138 (+ 1 других файлов) |
| session | №0059 (+ 4 других файлов) |
| SESSION | №0652 |
| set | №0788 (+ 2 других файлов) |
| Set | №0662 (+ 14 других файлов) |
| setInterval | №1204 (+ 5 других файлов) |
| setTimeout | №1111 (+ 35 других файлов) |
| settings | №0650 (+ 2 других файлов) |
| settingsPanel | №0831 |
| settled | №0819 |
| sf | №0647 (+ 1 других файлов) |
| sh | №0783 |
| sha | №1261 (+ 3 других файлов) |
| shader | №1104 |
| shaft | №0057 |
| shaftSources | №0057 |
| shape | №0057 (+ 2 других файлов) |
| shaped | №1102 |
| shapeInput | №0062 |
| shapes | №0058 (+ 1 других файлов) |
| shared | №0078 (+ 2 других файлов) |
| sharedAbility | №0077 |
| sharedAliases | №0077 |
| sharedMutagen | №1079 |
| sharedSnapshots | №0077 |
| sharp | №0060 |
| shaved | №0062 |
| sheer | №0062 |
| sheetScreen | №0623 (+ 1 других файлов) |
| shell | №0783 (+ 1 других файлов) |
| shellIX | №0060 |
| shellN | №0060 |
| shellP | №0060 |
| shellUV | №0060 |
| shield | №0654 (+ 3 других файлов) |
| shieldAccess | №0668 |
| shieldAvailable | №0647 |
| shieldBonus | №0792 |
| shielded | №0810 (+ 1 других файлов) |
| shieldRoll | №0654 |
| shieldSlot | №0647 |
| shieldSpent | №0647 |
| shipped | №1123 |
| shirt | №1089 |
| short | №0640 (+ 3 других файлов) |
| shortage | №0664 |
| shortKeys | №0785 (+ 1 других файлов) |
| shortToFull | №0699 |
| shot | №1147 (+ 1 других файлов) |
| shoulder | №0060 (+ 1 других файлов) |
| shoulderSpan | №0060 |
| shouldRestoreFull | №0699 |
| shouldUpdate | №0791 |
| showEp | №1771 |
| showEP | №0789 |
| showPp | №1771 |
| showPP | №0789 |
| shuffleBtn | №0081 |
| shutdownCalls | №1251 |
| si | №0060 (+ 3 других файлов) |
| side | №0058 (+ 6 других файлов) |
| sideIndex | №0060 |
| sides | №0062 (+ 11 других файлов) |
| sIdx | №0645 |
| sig | №0810 (+ 1 других файлов) |
| sightHero | №1138 |
| sign | №0064 (+ 2 других файлов) |
| signatures | №1086 (+ 5 других файлов) |
| signed | №0060 |
| signup | №0650 |
| sigTarget | №1159 |
| sigUses | №0810 |
| sin | №0057 |
| single | №0835 |
| singleBox | №0809 |
| singleWeightKg | №0791 |
| size | №0060 (+ 10 других файлов) |
| sizes | №0832 (+ 1 других файлов) |
| sk | №0771 |
| sKey | №0623 |
| skill | №0073 (+ 5 других файлов) |
| SKILL_STAT | №0807 |
| SKILL_TO_VAR_MAP | №0771 |
| skilledDesc | №0662 |
| skillId | №0623 (+ 4 других файлов) |
| skillName | №0771 |
| skillNameRu | №0623 |
| skills | №0623 (+ 3 других файлов) |
| SKILLS_CONFIG | №0082 |
| skillsConfig | №0771 |
| skillsDataObj | №0771 |
| skillsList | №0771 |
| skillsListContainer | №0821 |
| skillsPanel | №0821 (+ 1 других файлов) |
| skillsStr | №0623 (+ 1 других файлов) |
| skillStr | №0623 (+ 1 других файлов) |
| skin | №0058 (+ 5 других файлов) |
| skinBaseline | №1281 |
| skinColorEntry | №0062 |
| skinImages | №1080 |
| skinned | №1094 |
| skinnedPrimitives | №1121 (+ 1 других файлов) |
| skins | №0065 (+ 2 других файлов) |
| skip | №0060 (+ 1 других файлов) |
| skipped | №1147 |
| skirt | №1091 |
| skirtDepth | №0061 |
| skull | №0060 (+ 2 других файлов) |
| sky | №0072 |
| sl | №0060 (+ 6 других файлов) |
| sleep | №1138 |
| sleeve | №0061 |
| sleeveMasks | №0061 |
| sleeves | №0061 (+ 1 других файлов) |
| slices | №0060 |
| slider | №0062 |
| slimeAcid | №1078 |
| slimeAttacker | №1078 |
| slimeBombAttack | №1079 |
| slimeBomber | №1079 |
| slimeHit | №1078 |
| slimeResistantTarget | №1078 |
| slimeVictim | №1078 |
| slot | №0058 (+ 15 других файлов) |
| SLOT_LEVEL | №0843 |
| slot2 | №0778 |
| slot3 | №0778 |
| slot4 | №0778 |
| slotBefore | №1167 |
| slotData | №0835 |
| slotHtml | №0835 |
| slotLevel | №0778 |
| slotMax | №0812 |
| slotRowHtml | №0835 |
| slots | №0061 (+ 12 других файлов) |
| SLOTS | №0076 (+ 2 других файлов) |
| slotsBefore | №1169 |
| slotSnapshot | №0810 |
| sm | №0654 (+ 4 других файлов) |
| small | №0810 |
| smitePart | №0654 |
| smoke | №0842 |
| smooth | №0060 |
| sn | №0060 |
| snake | №0817 |
| snakeId | №1138 |
| snap | №0077 (+ 5 других файлов) |
| snapshot | №0059 (+ 6 других файлов) |
| snapshots | №0654 |
| snout | №0060 |
| sorted | №0792 |
| SOTDQ | №0630 |
| source | №0057 (+ 39 других файлов) |
| SOURCE | №0077 (+ 13 других файлов) |
| SOURCE_TAG | №0669 (+ 1 других файлов) |
| sourceArmor | №0792 |
| sourceCache | №0852 |
| sourceCheck | №0810 |
| sourceCommit | №1771 |
| sourceCount | №0825 |
| sourceGroups | №0699 |
| sourceHashes | №1266 (+ 1 других файлов) |
| sourceHtml | №0835 |
| sourceId | №0655 |
| sourceManifestUrl | №0841 |
| sourceMax | №1129 |
| sourceMean | №1129 |
| sourceMeshCount | №0062 |
| sources | №0640 (+ 11 других файлов) |
| sourceStats | №0815 |
| sourceTag | №0744 |
| sourceToken | №0655 |
| sourceWeapons | №0810 |
| sp | №0068 (+ 9 других файлов) |
| span | №0057 (+ 3 других файлов) |
| spanCurrent | №0779 |
| spanTotal | №0779 |
| sparks | №0842 |
| sparse | №1119 (+ 1 других файлов) |
| sparseJson | №1119 |
| spawn | №1109 |
| spd | №0627 (+ 3 других файлов) |
| spear | №0668 |
| spec | №0656 (+ 7 других файлов) |
| specHtml | №0669 |
| specialBombEffects | №0077 |
| SPECIALIZATIONS | №0669 |
| specId | №0669 |
| species | №0838 |
| specificClass | №0699 |
| specificProf1 | №0822 |
| specificProf2 | №0822 |
| specificProf3 | №0822 |
| specificSources | №0744 |
| specs | №0669 |
| spectral | №0062 |
| speed | №0655 (+ 3 других файлов) |
| speedInput | №0823 |
| speedVal | №0823 |
| spell | №0647 (+ 7 других файлов) |
| spellbladeDeflection | №0654 |
| spellbladeOnly | №0826 |
| SPELLCASTING_CLASSES | №0835 |
| spellcastingCard | №0835 |
| spellClass | №0835 |
| spellDamageMods | №0810 (+ 1 других файлов) |
| spellDesc | №0835 |
| spellId | №0818 |
| spellLevel | №0647 (+ 4 других файлов) |
| spellList | №0076 (+ 1 других файлов) |
| spellName | №0802 (+ 4 других файлов) |
| spellNameEscaped | №0835 |
| spellObj | №0835 |
| spellPayload | №0810 |
| spellReaction | №0810 |
| spells | №0802 (+ 5 других файлов) |
| SPELLS_KNOWN | №0076 |
| spellsByLevel | №0802 |
| spellsHtml | №0835 |
| spellSourcesNow | №0826 |
| spent | №0623 (+ 11 других файлов) |
| spentLevel | №0647 |
| sPerG | №0789 |
| spine | №0060 |
| spInput | №0789 |
| spiritAttacks | №0783 |
| spiritAuto | №1159 |
| spiritHp | №0778 |
| spiritMax | №0778 |
| spiritRestored | №0778 |
| spirits | №0843 |
| splay | №0060 |
| spread | №0060 |
| spVal | №0789 |
| sq | №0060 |
| squares | №1104 |
| squircle | №0060 |
| sr | №0647 (+ 6 других файлов) |
| src | №0058 (+ 34 других файлов) |
| srcA | №0835 |
| srcALower | №0835 |
| srcB | №0835 |
| srcBLower | №0835 |
| ss | №0654 (+ 1 других файлов) |
| st | №0060 (+ 7 других файлов) |
| stability | №0078 (+ 1 других файлов) |
| stableFound | №1260 |
| stableLegacy | №1260 |
| stack | №0663 (+ 1 других файлов) |
| stacked | №1771 |
| stageCount | №1260 |
| staged | №1114 (+ 2 других файлов) |
| STAGED_KEY | №0841 |
| stageManifestUrl | №0841 |
| stairs | №0075 (+ 1 других файлов) |
| stale | №1247 (+ 2 других файлов) |
| stalker | №1234 |
| stance | №0778 |
| STAND_TURN_FLAGS | №0817 |
| standard | №1105 |
| standardRaceIds | №1258 |
| standardRates | №1771 |
| standing | №1138 |
| standPC | №1138 |
| standPhone | №1138 |
| standRoster | №1138 |
| standServer | №1138 |
| start | №0060 (+ 12 других файлов) |
| started | №0782 (+ 1 других файлов) |
| startI | №1128 (+ 1 других файлов) |
| startingProfession | №0645 |
| startupRun | №0841 |
| startVol | №0081 |
| startY | №0061 |
| stat | №0073 (+ 14 других файлов) |
| STAT_ALIASES | №0826 |
| STAT_META | №0868 |
| STAT_NAMES | №0642 |
| stat2 | №0699 |
| statBonus | №0744 |
| statBonusKeys | №0744 |
| state | №0058 (+ 43 других файлов) |
| statElem | №0835 |
| stateOnly | №1263 |
| states | №0838 |
| statId | №0623 (+ 2 других файлов) |
| statKey | №0623 (+ 6 других файлов) |
| statKeysMap | №0699 |
| statMod | №0646 (+ 2 других файлов) |
| statName | №0771 |
| statNames | №0623 (+ 1 других файлов) |
| statNameShort | №0771 |
| statNamesShort | №0623 (+ 1 других файлов) |
| statOptions | №0646 (+ 1 других файлов) |
| stats | №0785 (+ 12 других файлов) |
| STATS | №0642 |
| STATS_CONFIG | №0082 |
| statsConfig | №0771 |
| statSelect | №0653 |
| statsGrid | №0771 |
| statsList | №0646 |
| status | №0831 (+ 8 других файлов) |
| STATUS | №0659 |
| statusClass | №0659 |
| statusEl | №0081 |
| statusPC | №1138 |
| statusPhone | №1138 |
| statusServer | №1138 |
| statusText | №0771 (+ 1 других файлов) |
| steel | №0062 |
| stem | №0066 (+ 2 других файлов) |
| stems | №1266 |
| stench | №1079 |
| stenchTarget | №1079 |
| step | №0060 (+ 5 других файлов) |
| steps | №0072 (+ 2 других файлов) |
| stepTime | №0081 |
| sternumSpan | №0060 |
| stock | №0799 |
| stone | №0870 |
| stop | №0655 |
| stopped | №0819 |
| storage | №0652 (+ 3 других файлов) |
| STORAGE_KEY | №0665 (+ 2 других файлов) |
| store | №1087 (+ 5 других файлов) |
| stored | №1219 |
| str | №0791 (+ 12 других файлов) |
| strand | №0060 |
| strap | №0061 |
| stream | №0888 |
| strength | №0791 |
| strenuous | №0824 |
| stride | №0061 (+ 9 других файлов) |
| strikeHP | №1168 |
| String | №0662 (+ 23 других файлов) |
| strInput | №0791 |
| stripped | №0810 |
| strMod | №0771 |
| structureBlast | №1078 |
| structureTarget | №1078 |
| studied | №0778 (+ 1 других файлов) |
| style | №0060 (+ 7 других файлов) |
| STYLE_ID | №0842 |
| styleEl | №0792 |
| styles | №0778 (+ 5 других файлов) |
| styleTag | №0831 (+ 1 других файлов) |
| sub | №0073 (+ 9 других файлов) |
| subByName | №0794 |
| subclass | №1120 (+ 3 других файлов) |
| SUBCLASS_FEATURES | №0647 |
| SUBCLASS_MAP | №0647 |
| subclasses | №0640 (+ 6 других файлов) |
| subclassHtml | №0699 |
| subclassLevel | №0777 |
| subclassName | №0712 (+ 1 других файлов) |
| subclassPacks | №0870 |
| subclassResult | №1079 |
| subclassSelect | №0699 |
| subData | №0712 |
| subFeatures | №0794 |
| subId | №0077 |
| subIds | №0871 |
| subject | №0817 |
| subOptionsHtml | №0699 |
| subpacks | №0077 |
| subs | №0077 (+ 2 других файлов) |
| SUBS | №0820 (+ 1 других файлов) |
| subVal | №0779 |
| success | №0073 (+ 6 других файлов) |
| suffix | №0660 |
| suit | №0818 (+ 3 других файлов) |
| suite | №0853 (+ 1 других файлов) |
| SUITS | №0820 |
| sum | №0057 (+ 16 других файлов) |
| summary | №0062 (+ 10 других файлов) |
| summonX | №0818 |
| summonY | №0818 |
| sums | №0060 (+ 2 других файлов) |
| sumSq | №1128 |
| sUp | №0744 |
| supernatural | №0778 |
| supportedSave | №1169 |
| suppressBodyHP | №0646 |
| surface | №0060 (+ 2 других файлов) |
| surfaceDiagnostics | №1281 |
| surfaceKind | №0062 |
| surfaceSelect | №0062 |
| surfaceUrl | №0062 |
| surge | №1157 (+ 1 других файлов) |
| surprised | №0647 |
| sv | №0068 (+ 6 других файлов) |
| sv2 | №0778 |
| swap | №0820 |
| swapped | №1138 |
| swarm | №0062 |
| swarmForm | №0062 |
| swarmLimits | №0065 |
| swarmMotion | №0062 |
| swift | №0778 |
| swiperContainer | №0821 (+ 1 других файлов) |
| sx | №0060 (+ 3 других файлов) |
| sy | №0060 (+ 3 других файлов) |
| synapse | №1079 |
| synapseInstall | №1079 |
| synapseRecord | №0077 |
| sync | №0886 |
| syncRequested | №0809 |
| synergies | №0078 (+ 1 других файлов) |
| SYNERGY | №0078 |
| synergySet | №0078 |
| sys | №0062 (+ 18 других файлов) |
| sz | №0060 (+ 3 других файлов) |
| t | №0057 (+ 104 других файлов) |
| T | №0057 (+ 2 других файлов) |
| t2 | №0812 |
| ta | №0778 |
| tab | №0069 (+ 4 других файлов) |
| tabButtons | №0792 |
| table | №0640 (+ 6 других файлов) |
| tabs | №0670 |
| tabsContainer | №0792 |
| tabsNav | №0867 |
| tabsWrapper | №0792 |
| tacticalBack | №1138 |
| tacticalPC | №1138 |
| tacticalPhone | №1138 |
| tacticalRoster | №1138 |
| tacticalServer | №1138 |
| tactics | №0871 |
| tag | №0060 (+ 15 других файлов) |
| tagOk | №0801 |
| tags | №0060 (+ 9 других файлов) |
| tail | №0060 |
| tailEnd | №0060 |
| tailRoot | №0060 |
| take | №0640 (+ 7 других файлов) |
| takeFromContainer | №0788 |
| taken | №0073 |
| tal | №0778 |
| tampered | №1255 |
| tangent | №0060 |
| taper | №0060 (+ 1 других файлов) |
| tapLength | №0796 |
| target | №0057 (+ 49 других файлов) |
| targetActor | №0817 |
| targetChar | №0830 |
| targetCharId | №0830 |
| targetClass | №0785 (+ 1 других файлов) |
| targetClasses | №0654 |
| targetClassesForSlime | №0654 |
| targetContent | №0792 |
| targetCopy | №0820 |
| targetGrafts | №0654 |
| targetGrappled | №0778 |
| targetH | №0072 |
| targetHasArmor | №0654 |
| targetId | №0655 (+ 6 других файлов) |
| targetIsPugilist | №0654 |
| targetLabels | №1057 |
| targetLevel | №0699 (+ 1 других файлов) |
| targetList | №0655 |
| targetLvl | №0831 |
| targetMeshIndex | №1118 |
| targetName | №0655 |
| targetParent | №0789 |
| targetPath | №1118 (+ 3 других файлов) |
| targetPrim | №1118 |
| targetPrimIndex | №1118 |
| targetProfId | №0822 (+ 1 других файлов) |
| targetProgress | №0842 |
| targetReports | №1130 |
| targetResistances | №0654 |
| targets | №0060 (+ 9 других файлов) |
| targetSnapshot | №0817 |
| targetTok | №0655 |
| targetToken | №0655 |
| targetType | №0812 |
| targetVol | №0081 |
| targetW | №0072 |
| tarot | №0654 (+ 1 других файлов) |
| tarotAC | №0654 |
| tarotActor | №0771 |
| tarotAdv | №0654 |
| tarotCast | №0834 |
| tarotCheck | №0810 |
| tarotDis | №0654 |
| tarotFactor | №0654 |
| tarotForced | №0654 |
| tarotIgnoresResistance | №0654 |
| tarotInitiative | №0772 |
| tarotMod | №0654 |
| tarotOwner | №0772 |
| tarotReroll | №0654 |
| tarotRound | №0782 |
| tarotSave | №0654 |
| tarotScene | №0654 |
| tarotTurnId | №0772 |
| TASKS | №0857 |
| tavern | №1772 |
| tb | №0807 |
| tc | №0778 (+ 1 других файлов) |
| team | №0810 |
| teeth | №0060 |
| teleportAllyId | №0818 |
| teleportX | №0818 |
| teleportY | №0818 |
| temp | №0654 (+ 6 других файлов) |
| TEMPER | №0800 |
| tempHp | №0778 |
| template | №0654 (+ 1 других файлов) |
| term | №1124 |
| terms | №1124 (+ 2 других файлов) |
| terror | №0060 |
| test | №0842 (+ 2 других файлов) |
| testDir | №1317 |
| testRecipe | №1111 |
| tests | №1262 (+ 1 других файлов) |
| tets | №0060 |
| tex | №0061 (+ 2 других файлов) |
| text | №0062 (+ 26 других файлов) |
| textColor | №0771 |
| TextDecoder | №1082 (+ 21 других файлов) |
| textSpan | №0771 |
| texture | №0068 (+ 3 других файлов) |
| textures | №1772 |
| th | №0072 (+ 1 других файлов) |
| theftRef | №0818 |
| theme | №0831 |
| themed | №0672 |
| themeKey | №0831 |
| themeSelect | №0831 |
| theta | №0057 (+ 1 других файлов) |
| thick | №1279 |
| thickness | №0060 |
| thigh | №0058 |
| thin | №1279 |
| THIRD_CASTERS | №0826 |
| THR | №0808 |
| thresholds | №0804 (+ 1 других файлов) |
| THRESHOLDS | №0804 |
| thumbDir | №0060 |
| thumbEnd | №0060 |
| thumbRoot | №0060 |
| thumbs | №0867 |
| thumbSide | №0060 |
| ti | №0060 (+ 3 других файлов) |
| tick | №0810 |
| tid | №0655 |
| tie | №1081 |
| tier | №0664 |
| tile | №0061 |
| time | №0067 (+ 4 других файлов) |
| timedHero | №1079 |
| timeout | №0652 (+ 1 других файлов) |
| timer | №0652 (+ 3 других файлов) |
| timers | №1110 |
| times | №0067 |
| timeSpan | №0771 |
| timeStr | №0789 |
| timeString | №0771 |
| tint | №0062 |
| tiny | №1168 |
| tip | №0057 (+ 1 других файлов) |
| tipSelect | №0062 |
| title | №0062 (+ 7 других файлов) |
| titleEl | №0791 (+ 1 других файлов) |
| titleElem | №0795 (+ 1 других файлов) |
| titleText | №0835 |
| tl | №0057 (+ 1 других файлов) |
| tm | №0771 (+ 1 других файлов) |
| tmax | №0072 |
| tmin | №0072 |
| tmp | №0888 |
| tn | №1121 (+ 1 других файлов) |
| to | №0631 (+ 3 других файлов) |
| toggle | №0665 |
| toggleContainer | №0788 |
| tok | №0655 (+ 2 других файлов) |
| token | №0652 (+ 3 других файлов) |
| tokens | №0066 (+ 1 других файлов) |
| tool | №0635 (+ 10 других файлов) |
| TOOL_IDS | №0667 |
| TOOL_LABELS | №0667 |
| toolbar | №0788 |
| toolBox | №0818 |
| toolId | №0807 |
| toolLabel | №0818 |
| toolMatrix | №0671 |
| toolOk | №0877 |
| toolProficient | №0818 |
| tools | №0080 (+ 5 других файлов) |
| TOOLS | №0671 |
| toolsStr | №0623 (+ 1 других файлов) |
| toolStat | №0818 |
| toolStr | №0645 |
| toolText | №0818 |
| tooth | №0060 |
| toothColor | №1281 |
| toothPart | №0060 |
| top | №0057 (+ 5 других файлов) |
| topology | №1094 |
| topRow | №0792 |
| torso | №0060 (+ 1 других файлов) |
| total | №0060 (+ 35 других файлов) |
| totalAtk | №0835 |
| totalAttack | №0646 |
| totalAttackBonus | №0771 |
| totalCopper | №0789 |
| totalCurrentLevel | №0699 |
| totalDamage | №0646 |
| totalDiceDamage | №0646 |
| totalGain | №0699 |
| totalLevel | №0699 (+ 1 других файлов) |
| totalMod | №0771 |
| totalObjects | №0070 |
| totals | №0652 (+ 1 других файлов) |
| totalSkillMod | №0833 |
| totalSum | №0771 (+ 1 других файлов) |
| totalWeight | №0788 |
| totalWeightKg | №0791 (+ 1 других файлов) |
| totalWeightLb | №0791 |
| totalZones | №0070 |
| totem | №0647 |
| touched | №0810 |
| touchHp | №0812 |
| toxic | №1079 |
| toxicDC | №0077 |
| toxicSave | №0077 |
| toxicTarget | №0077 (+ 1 других файлов) |
| tp | №0810 |
| tr | №0812 (+ 1 других файлов) |
| track | №0081 |
| tracker | №0077 (+ 5 других файлов) |
| trackNameEl | №0081 |
| TRADE_KEY | №0801 |
| traderId | №0798 (+ 2 других файлов) |
| TRADERS | №0798 |
| traditionActions | №0812 |
| traditions | №0812 |
| trained | №1140 (+ 1 других файлов) |
| transfer | №1118 |
| transformed | №1127 (+ 1 других файлов) |
| transforms | №0064 |
| translated | №0066 (+ 1 других файлов) |
| transported | №1138 |
| transpose | №1080 |
| travelling | №1138 |
| tri | №0057 (+ 3 других файлов) |
| triangleHits | №1129 |
| triangles | №0060 (+ 5 других файлов) |
| trick | №0818 |
| TRICK_FEATURES | №0820 |
| trickster | №1138 |
| triggerCustomCreation | №0790 |
| TRIGGERS | №0817 |
| tris | №0060 |
| true | №0778 (+ 3 других файлов) |
| trunk | №0060 |
| ts | №0810 (+ 1 других файлов) |
| tt | №0072 (+ 2 других файлов) |
| tTok | №0654 |
| tu | №1230 (+ 1 других файлов) |
| tuft | №0060 |
| tufts | №0060 |
| turn | №0778 (+ 2 других файлов) |
| turned | №0647 |
| turnId | №0782 (+ 1 других файлов) |
| turnKey | №0778 |
| turnOne | №1078 |
| turnTwo | №1078 |
| tusks | №0060 |
| tw | №0072 |
| two | №1153 |
| tx | №0068 (+ 4 других файлов) |
| txt | №0821 (+ 2 других файлов) |
| typ | №0778 (+ 1 других файлов) |
| type | №0057 (+ 59 других файлов) |
| typeCount | №1130 |
| typedExtraTotal | №0654 |
| types | №0832 (+ 3 других файлов) |
| TYPES | №0799 |
| typeSelect | №0790 |
| u | №0057 (+ 16 других файлов) |
| U | №0057 |
| ub | №0072 |
| ui | №0841 (+ 1 других файлов) |
| uiColorOptions | №0867 |
| uid | №1109 |
| uiFreeGather | №0824 |
| uiGather | №0824 |
| uiMix | №0078 |
| Uint16Array | №1080 (+ 22 других файлов) |
| Uint32Array | №1080 (+ 27 других файлов) |
| Uint8Array | №1082 (+ 22 других файлов) |
| ul | №0060 |
| unacted | №0647 |
| unarmoredBase | №0654 |
| unbreakable | №1159 |
| unbreakableHero | №1159 |
| uncouthId | №0778 |
| uncouthTargets | №0778 |
| undead | №1230 |
| undeadFocus | №0654 |
| undo | №0647 |
| unescape | №1217 (+ 2 других файлов) |
| unique | №0061 (+ 1 других файлов) |
| uniqueFeatsMap | №0699 |
| uniqueMap | №0835 |
| uniqueSuffix | №0790 |
| unit | №0060 (+ 4 других файлов) |
| units | №0831 |
| unknown | №1102 (+ 2 других файлов) |
| unrelated | №1146 (+ 1 других файлов) |
| untrained | №1153 |
| up | №0060 (+ 1 других файлов) |
| update | №0673 (+ 2 других файлов) |
| updateCloudStatus | №0831 |
| updated | №0744 |
| updateListeners | №0886 |
| updater | №0885 (+ 2 других файлов) |
| updateRun | №0841 |
| updateScheduled | №0791 |
| uploadImage | №0062 |
| uploads | №1080 |
| upper | №0058 (+ 5 других файлов) |
| upperSnout | №0060 |
| upTo | №0712 |
| uri | №0068 |
| url | №0062 (+ 40 других файлов) |
| URL | №1110 |
| urlPath | №0888 |
| usage | №0062 |
| use | №0664 |
| useBtn | №0792 |
| used | №0640 (+ 9 других файлов) |
| usedBy | №0672 |
| usedCombat | №0810 |
| usedCount | №0653 |
| usedVal | №0835 |
| useFeature | №0808 |
| useFur | №0062 |
| useReptile | №0062 |
| userProfsIds | №0792 |
| uses | №0647 (+ 3 других файлов) |
| USES | №0802 |
| usesHtml | №0653 |
| useSkinMicro | №0062 |
| utilityArmor | №1138 |
| utilityBack | №1138 |
| utilityBerry | №1138 |
| utilityDash | №1138 |
| utilityPC | №1138 |
| utilityPhone | №1138 |
| utilityRoster | №1138 |
| utilityServer | №1138 |
| uv | №0057 (+ 6 других файлов) |
| uvAnchor | №0057 |
| uvDet | №0057 |
| uvFit | №0057 |
| ux | №0060 |
| uy | №0060 |
| uz | №0060 |
| v | №0058 (+ 150 других файлов) |
| V | №0057 (+ 1 других файлов) |
| v0 | №1126 (+ 2 других файлов) |
| v1 | №1126 (+ 2 других файлов) |
| v2 | №1126 (+ 2 других файлов) |
| v2Broken | №1105 |
| va | №1126 (+ 4 других файлов) |
| val | №0081 (+ 14 других файлов) |
| valEl | №0623 (+ 1 других файлов) |
| valid | №1136 |
| validate | №0671 |
| validBoons | №0778 |
| validRelative | №1115 |
| validStats | №0744 |
| valInput | №0790 |
| valName | №0623 (+ 1 других файлов) |
| vals | №0067 (+ 2 других файлов) |
| valStr | №0623 (+ 1 других файлов) |
| value | №0058 (+ 35 других файлов) |
| values | №0068 (+ 7 других файлов) |
| variableNameUsed | №0771 |
| variant | №1189 |
| variants | №1091 |
| varName | №0771 (+ 2 других файлов) |
| vary | №1104 |
| vb | №1126 (+ 3 других файлов) |
| vc | №1126 (+ 3 других файлов) |
| vector | №0064 |
| venom | №1079 |
| venomDamage | №1078 |
| venomFeature | №1079 |
| venomHero | №1079 |
| venomsmithPoisonImmune | №0654 |
| venomTarget | №1078 |
| verbal | №0817 |
| verm | №0640 |
| version | №0831 (+ 4 других файлов) |
| VERSION | №0065 (+ 25 других файлов) |
| versionText | №0841 |
| vertex | №0060 (+ 1 других файлов) |
| vertices | №0057 (+ 8 других файлов) |
| verts | №0061 (+ 1 других файлов) |
| vesselHP | №1168 |
| vi | №1126 (+ 2 других файлов) |
| victim | №0817 (+ 4 других файлов) |
| view | №0063 (+ 8 других файлов) |
| viewIndex | №0068 |
| views | №0068 (+ 7 других файлов) |
| viscera | №1159 |
| visceraTarget | №1159 |
| visible | №0060 (+ 8 других файлов) |
| visionBack | №1138 |
| visionPC | №1138 |
| visionPhone | №1138 |
| visionRoster | №1138 |
| visionServer | №1138 |
| vm | №0662 (+ 147 других файлов) |
| voice | №1079 |
| voiceInstall | №1079 |
| volatility | №0078 (+ 1 других файлов) |
| volStep | №0081 |
| volumeRange | №0081 |
| volumes | №0060 |
| vp | №0072 |
| vr | №0810 |
| vs | №0062 |
| vuln | №0849 |
| vulnerable | №0654 (+ 1 других файлов) |
| vx | №0060 (+ 1 других файлов) |
| vy | №0060 |
| vz | №0060 (+ 1 других файлов) |
| w | №0058 (+ 33 других файлов) |
| W | №0060 (+ 2 других файлов) |
| w1 | №0060 |
| w2 | №0060 |
| w3 | №0060 |
| wa | №0654 (+ 1 других файлов) |
| wager | №1138 (+ 1 других файлов) |
| wagerGuard | №0818 |
| waistPoints | №1091 |
| waived | №0802 |
| walk | №0843 |
| wall | №0062 |
| wallCache | №0072 |
| wallet | №0798 |
| walletGrid | №0789 |
| wallpapersGridHtml | №0867 |
| wallTypes | №0075 |
| walter | №0060 |
| walterCorpseTarget | №0645 |
| wandering | №1138 |
| wanderPhone | №1138 |
| want | №0800 (+ 2 других файлов) |
| wanted | №0060 (+ 2 других файлов) |
| wantedClass | №0699 |
| war | №0630 (+ 1 других файлов) |
| WAR_ACADEMIES | №0775 |
| ward | №0654 (+ 1 других файлов) |
| wardAbsorbed | №0654 |
| wardenResistant | №0654 |
| wardenSurvive | №0654 |
| wardReduce | №0654 |
| wardrobeSaved | №1279 |
| wardState | №0654 |
| warlordParry | №0654 |
| warp | №1100 (+ 1 других файлов) |
| wasLastStand | №0782 |
| wasNewClass | №0699 |
| wasStand | №0654 |
| wave | №0060 |
| wb | №1126 (+ 2 других файлов) |
| wc | №1126 (+ 2 других файлов) |
| weapon | №0822 (+ 8 других файлов) |
| weaponAttack | №1156 |
| weaponFields | №0790 |
| weaponId | №0822 (+ 2 других файлов) |
| weaponName | №0822 (+ 2 других файлов) |
| weapons | №0810 |
| weaponsDb | №0822 (+ 1 других файлов) |
| wear | №0664 |
| webbedTarget | №1079 |
| webDebuffs | №0077 |
| webResult | №1079 |
| webRoot | №0885 |
| webSave | №0077 |
| webTarget | №0077 |
| weight | №0060 (+ 5 других файлов) |
| weightCases | №1771 |
| weightHero | №1771 |
| weightInp | №0790 |
| weightRes | №0790 |
| weights | №0057 (+ 6 других файлов) |
| weightStr | №0791 (+ 1 других файлов) |
| weightTotal | №1771 |
| weightValue | №1266 |
| weldedBoundary | №0057 |
| weldKey | №0057 |
| wh | №0060 |
| whiskers | №0060 |
| who | №0810 |
| wi | №0075 (+ 1 других файлов) |
| wide | №0060 |
| width | №0060 (+ 7 других файлов) |
| wild | №0629 (+ 1 других файлов) |
| willActivate | №0654 |
| willingTargetIds | №0818 |
| win | №0885 (+ 5 других файлов) |
| window | №1772 |
| wingAngle | №0060 |
| wis | №0627 (+ 11 других файлов) |
| wisMod | №0623 (+ 1 других файлов) |
| WITCH_CRAFT_DATA | №0778 |
| WITCH_CRAFTS | №0778 |
| WITCH_CURSE_EFFECTS | №0778 |
| WITCH_CURSES | №0778 |
| WITCH_GRAND_HEXES | №0778 |
| WITCH_HEXES | №0778 |
| witchAttackPenalty | №0654 |
| witchElemental | №0654 |
| witchImperil | №0654 |
| witchLabels | №0778 |
| witchPack | №0778 |
| withFade | №0867 |
| within1 | №1132 |
| within5 | №1132 |
| wiz | №0810 |
| Wizard | №1105 |
| wk | №1129 |
| wl | №0647 |
| wName | №0646 |
| wolf | №1168 |
| won | №1145 |
| wood | №0062 |
| words | №0066 |
| world | №0057 (+ 2 других файлов) |
| WORLD_STATE | №0877 |
| woven | №0062 |
| wp | №0867 (+ 1 других файлов) |
| wrap | №0624 (+ 4 других файлов) |
| wrapped | №0782 (+ 4 других файлов) |
| wrappedTools | №0826 |
| wrapper | №0771 (+ 1 других файлов) |
| wrapS | №0072 |
| wrapT | №0072 |
| wrist | №0060 |
| wrists | №0060 |
| write | №0817 |
| wrong | №1159 (+ 2 других файлов) |
| ws | №0062 (+ 2 других файлов) |
| wt | №0062 (+ 1 других файлов) |
| ww | №0072 |
| wx | №0071 (+ 1 других файлов) |
| wy | №0071 (+ 1 других файлов) |
| x | №0058 (+ 163 других файлов) |
| X | №0071 |
| x0 | №0060 |
| x1 | №0060 (+ 2 других файлов) |
| x2 | №0070 (+ 1 других файлов) |
| xenoHero | №1078 |
| xenoOwner | №1079 |
| xn | №0080 (+ 1 других файлов) |
| xp | №0627 (+ 11 других файлов) |
| XP_BY_CR | №0804 |
| xs | №1258 |
| xt | №0080 |
| xx | №0060 (+ 3 других файлов) |
| xy | №0072 |
| y | №0057 (+ 55 других файлов) |
| Y | №0060 (+ 1 других файлов) |
| y0 | №0060 (+ 1 других файлов) |
| y1 | №0060 (+ 4 других файлов) |
| y2 | №0070 (+ 2 других файлов) |
| yaw | №0062 (+ 36 других файлов) |
| yd | №0778 |
| yes | №0058 (+ 2 других файлов) |
| yf | №1126 |
| yFile | №1128 |
| ys | №0060 |
| yuan | №1086 (+ 2 других файлов) |
| yy | №0060 (+ 1 других файлов) |
| z | №0057 (+ 19 других файлов) |
| z0 | №0060 (+ 1 других файлов) |
| z1 | №0060 (+ 1 других файлов) |
| zb | №0060 |
| zf | №0060 |
| zFile | №1128 |
| ZH | №0071 |
| zi | №0071 |
| zlib | №1104 (+ 7 других файлов) |
| zoom | №0062 (+ 2 других файлов) |
| zs | №0071 |
| ZW | №0071 |
| ZX | №0071 |
| ZY | №0071 |
| zz | №0060 (+ 1 других файлов) |

### Глобальные JS API (563)

| Имя | Исходные файлы |
|---|---|
| __diceGameplayRelocationObserver | №0771 |
| __diceGameplayRelocationQueued | №0771 |
| __diceTabPanelObserver | №0771 |
| __DND_APP_BOOT_READY | №0082 |
| __dndGameplayV57Waiter | №0782 |
| __dndLootV36 | №0806 |
| __dndLootV37 | №0807 |
| __dndLootV40 | №0805 |
| __dndModalFrameObserverInstalled | №0831 |
| __dndPendingReactionRequest | №0810 |
| __fallbackRollDice | №0771 |
| __map | №1110 |
| __TEST_RESULT__ | №1245 |
| _dndFaqRender | №0814 |
| _dndSave | №0837 (+ 6 других файлов) |
| _dndTourBack | №0814 |
| _dndTourNext | №0814 |
| _dndTourSkip | №0814 |
| _expBeforeLevelUp | №0699 |
| _loadedFeatsMap | №0699 |
| _loadedSubclassOptions | №0699 |
| _originalAddItemToInventory | №0791 |
| AbortController | №0841 |
| ACCURSED_V11 | №0076 |
| accursedAfflictions | №0076 |
| accursedProgression | №0076 (+ 2 других файлов) |
| accursedRuntime | №0076 (+ 1 других файлов) |
| addEventListener | №1140 (+ 4 других файлов) |
| addExperienceValue | №0779 |
| addItemToInventory | №0791 (+ 2 других файлов) |
| ALCHEMIST_MHP_2024 | №0077 |
| alchemistProgression | №0676 |
| alert | №0810 (+ 3 других файлов) |
| allCharacters | №0623 (+ 4 других файлов) |
| appDebugLogs | №0831 (+ 1 других файлов) |
| appendDiceLog | №0647 (+ 3 других файлов) |
| applyClassProgression | №0712 |
| applyConditionsToRoll | №1157 |
| applyDndASI | №0826 |
| applyMulticlassProficiencies | №0699 (+ 1 других файлов) |
| applySubclassProgression | №0647 (+ 1 других файлов) |
| artificerProgression | №0678 |
| autoSaveCurrentCharacter | №0080 (+ 39 других файлов) |
| averageHpIncrease | №0699 |
| barbarianProgression | №0680 |
| bardProgression | №0682 |
| beastheartProgression | №0685 (+ 1 других файлов) |
| BeastheartRuntime | №0685 |
| bloodHunterProgression | №0687 |
| calculateMods | №0826 (+ 1 других файлов) |
| changePointBuyStat | №0623 (+ 1 других файлов) |
| checkMulticlassRequirements | №0785 (+ 1 других файлов) |
| chooseAssassinSubclass | №0647 |
| chooseMetamagic | №0647 |
| chooseSubclass | №0712 |
| chooseSubclassForClass | №0647 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0712 |
| CLASSES_REFERENCE | №0077 (+ 4 других файлов) |
| clericProgression | №0688 |
| closeAddFeatModal | №0744 |
| closeCharacterCreationModal | №0623 (+ 1 других файлов) |
| closeCustomAlert | №0791 |
| closeDndChangelog | №0814 |
| closeDndNetworkModal | №0809 |
| closeExperienceModal | №0779 |
| closeIconSettingsModal | №0831 (+ 2 других файлов) |
| closeLevelUpModal | №0699 |
| closeSettingsModal | №0831 |
| Companions | №0657 |
| confirm | №0062 (+ 2 других файлов) |
| confirmAddFeatManual | №0744 |
| confirmLevelUp | №0699 |
| createNewCharacter | №0623 (+ 1 других файлов) |
| createSwarmAvatar | №0838 |
| crypto | №1135 (+ 19 других файлов) |
| currentChar | №0831 (+ 31 других файлов) |
| currentCharacter | №0831 (+ 10 других файлов) |
| currentCharacterId | №0652 (+ 2 других файлов) |
| currentRollMode | №1153 |
| defaultArmors | №0083 |
| defaultConsumables | №0658 (+ 1 других файлов) |
| defaultJunk | №0793 (+ 2 других файлов) |
| defaultMaterials | №0803 (+ 2 других файлов) |
| defaultWeapons | №0822 (+ 1 других файлов) |
| disableDndDebugRuntime | №0831 (+ 1 других файлов) |
| DND_ALCHEMY_GATHERING_V52 | №0080 |
| DND_APP_ICONS | №0831 (+ 2 других файлов) |
| DND_BESTIARY_V56_1 | №0627 |
| DND_BESTIARY_V56_10 | №0628 |
| DND_BESTIARY_V56_11 | №0629 |
| DND_BESTIARY_V56_12 | №0630 |
| DND_BESTIARY_V56_13 | №0631 |
| DND_BESTIARY_V56_2 | №0632 |
| DND_BESTIARY_V56_3 | №0633 |
| DND_BESTIARY_V56_4 | №0634 |
| DND_BESTIARY_V56_5 | №0635 |
| DND_BESTIARY_V56_6 | №0636 |
| DND_BESTIARY_V56_7 | №0637 |
| DND_BESTIARY_V56_8 | №0638 |
| DND_BESTIARY_V56_9 | №0639 |
| DND_CRAFT_DISASSEMBLY_V51 | №0663 |
| DND_CRAFT_ECONOMY_V49 | №0666 |
| DND_CRAFT_PROFESSION_PROGRESS | №0669 |
| DND_CRAFT_PROFESSIONS_V33 | №0670 |
| DND_CRAFT_PROFESSIONS_V38 | №0671 |
| DND_CRAFT_PROFESSIONS_V47 | №0669 |
| DND_CRAFT_PROFESSIONS_V47_CRAFT | №0669 |
| DND_CRAFT_RESOURCES_V34 | №0672 |
| DND_CRAFT_V51 | №0664 |
| DND_CRAFTING_DLC_V50 | №0665 |
| DND_CRAFTING_V31 | №0667 |
| DND_CUSTOM_CRAFTING_V32 | №0673 |
| DND_EXP_TABLE | №0779 |
| DND_INVENTORY_CONTAINERS_V54 | №0788 |
| DND_MARKET_V55 | №0798 |
| DND_MARKET_V55_1 | №0799 |
| DND_MARKET_V55_3 | №0800 |
| DND_PENDING_CLASS_PACKS | №0076 (+ 8 других файлов) |
| DND_PLANESCAPE_V56_13 | №0631 |
| DND_RESOURCE_GATHERING_V35 | №0824 |
| DND_RESOURCE_PROCESSING_V43 | №0825 |
| DND_UPDATE_MANAGER | №0841 |
| DND_UPDATE_SCENE_V2 | №0842 |
| DND_UPDATE_UI | №0841 |
| DND_WORLD_GATHERING_V53 | №0877 |
| DND3DAssetCatalog | №0066 (+ 1 других файлов) |
| DND3DAssetNames | №0066 (+ 1 других файлов) |
| DND3DMap | №0069 |
| dndAddCompanionAttack | №0826 |
| DNDAdvancedDebugV70 | №0852 |
| DNDAlchemy | №0078 |
| dndBackgrounds | №0623 |
| dndBattleActionClose | №0624 |
| dndBattleActionOpen | №0624 (+ 1 других файлов) |
| dndBattleQuickAttack | №0624 |
| dndBattleQuickMove | №0624 |
| dndBattleQuickReady | №0624 |
| dndBattleQuickSpell | №0624 |
| DNDBloodHunter | №0640 |
| DNDCampaign | №0641 |
| DNDCharacter3D | №0065 |
| DNDCharacterAnatomy | №0058 |
| DNDCharacterAnatomyGeometry | №0057 |
| DNDCharacterAppearanceStore | №0059 |
| DNDCharacterBodyGeometry | №0060 |
| DNDCharacterClothing | №0061 |
| DNDCharacterEditor3D | №0062 |
| dndCharacterEditorLaunchError | №1057 |
| DNDCharacterLabV702 | №0848 |
| DNDCharacterMorphAssets | №0063 |
| DNDCharacterPose | №0064 |
| DNDClassFeatures | №0647 (+ 1 других файлов) |
| DNDCloudAccount | №0650 |
| DNDCloudConfig | №0651 |
| DNDCloudSync | №0652 |
| dndCollectMonsterLootV36 | №0806 |
| dndCollectMonsterLootV37 | №0807 |
| dndCollectMonsterLootV40 | №0805 |
| DNDCombat | №0654 (+ 1 других файлов) |
| DNDCombatEventBusV69 | №0846 |
| dndCombatLog | №0837 |
| DNDCombatLogV66 | №0847 |
| dndCompanionAttack | №0826 |
| dndCompanionDamage | №0826 |
| DNDCompanionGameplayV27 | №0655 |
| dndCompanionHeal | №0826 |
| DNDCompanionPacks | №0656 |
| dndCompanionStat | №0826 |
| dndConcentrationDamagePrompt | №0826 |
| DNDContent | №0660 |
| DNDContentCatalog | №0659 |
| DNDContentManifest | №0661 |
| dndCraft | №0667 |
| dndCraftProfession | №0670 |
| dndCraftProfessionV38 | №0664 (+ 3 других файлов) |
| dndCreateBeastheartCompanion | №0656 |
| dndCreateBeastMasterCompanion | №0656 |
| dndCreateFamiliar | №0656 |
| dndCreateSteed | №0656 |
| dndDebugEnabled | №1057 |
| DNDDebugScenarioEditorV705 | №0855 |
| DNDDebugScenarioManagerV704 | №0856 |
| DNDDiceResolutionV65 | №0858 |
| DNDEncounterCheckpointV68 | №0859 |
| DNDEncounterMapV59 | №0860 |
| DNDExpandedV23 | №0775 |
| DNDExpansionClasses | №0778 |
| DNDFeats | №0781 |
| dndGameplayCoreV57Render | №0782 |
| DNDGameplayV57 | №0782 |
| dndGenerateMonsterLootV36 | №0806 |
| dndGenerateMonsterLootV37 | №0805 (+ 1 других файлов) |
| DNDGLTF | №0068 |
| DNDGLTFCharacterPipeline | №0067 |
| dndInitiativeActive | №0826 |
| dndInitiativeDamageActive | №0826 |
| dndInitiativeHealActive | №0826 |
| dndInitiativeSkipDefeated | №0826 |
| DndInventoryContainersV54 | №0788 |
| DndItemDatabase | №0791 |
| dndLaunchCharacterEditor3D | №1057 |
| DNDMagic | №0797 |
| dndMap3DOpen | №0069 |
| DNDMapModel | №0070 |
| DNDMapRenderer2D | №0071 |
| DNDMapRenderer3D | №0072 (+ 1 других файлов) |
| DndMarketV55 | №0798 |
| DndMarketV55_3 | №0800 |
| DNDMobileBattleV61 | №0862 |
| DNDMobileSessionV67 | №0864 |
| DNDMonsterLoot | №0806 (+ 1 других файлов) |
| DNDMonsterLootV40 | №0805 |
| DNDMonsters | №0804 |
| dndNetwork | №1110 (+ 4 других файлов) |
| dndNetworkAddPlayerToInitiative | №0810 |
| dndNetworkCopyHint | №0809 |
| dndNetworkGameplayBuildProfile | №0810 |
| dndNetworkGameplayEvent | №0810 |
| dndNetworkGameplayMonsterAction | №0810 |
| dndNetworkGameplayMonsterState | №0810 |
| dndNetworkGameplayPeerDisconnect | №0810 |
| dndNetworkGameplayPeerHello | №0810 |
| dndNetworkGameplayPendingReactions | №0810 |
| dndNetworkGameplayPrepareHostHandoff | №0810 |
| dndNetworkGameplayReactionRequest | №0810 |
| dndNetworkGameplayRender | №0782 (+ 2 других файлов) |
| dndNetworkGameplayResult | №0810 |
| dndNetworkGameplayRoomShutdown | №0810 |
| dndNetworkGameplaySnapshot | №0810 |
| dndNetworkHostCreate | №0809 |
| dndNetworkHostFinish | №0809 |
| dndNetworkJoinCreate | №0809 |
| dndNetworkKick | №0809 |
| dndNetworkNewInvite | №0809 |
| dndNetworkSingle | №0809 |
| dndOpenCharacterEditor3D | №0062 |
| DNDPredictor | №0820 |
| DNDPredictorCards | №0817 |
| DNDPredictorMovement | №0819 |
| DNDPredictorUI | №0818 |
| dndProcessResourceV43 | №0825 |
| dndRemoveCompanionAttack | №0826 |
| dndRenderAlchemy | №0078 (+ 1 других файлов) |
| dndRenderCombat | №0640 |
| dndRenderCombatV3 | №0810 (+ 1 других файлов) |
| DNDRules | №0826 (+ 1 других файлов) |
| DNDSecondaryEntities | №0829 |
| dndShowRulesSummary | №0826 |
| DNDSpellPreparation | №0835 |
| dndSplashFinished | №0796 (+ 2 других файлов) |
| DNDStairNavigation | №0074 |
| dndStartConcentrationPrompt | №0826 |
| DNDStressMap | №0075 |
| dndSummonAttack | №0837 |
| dndSummonCommand | №0837 |
| dndSummonHeal | №0837 |
| DNDSummoning | №0837 |
| dndSyncCurrentCharacterFromCombat | №0810 (+ 2 других файлов) |
| dndUseAlchemyProduct | №0079 |
| dndV59CreateEncounter | №0860 |
| dndV61ResetView | №0862 |
| dndV65Close | №0858 |
| dndV65Open | №0858 |
| dndV65Resolve | №0858 |
| dndV66Clear | №0847 |
| dndV66CloseDebug | №0847 |
| dndV66CloseLog | №0847 |
| dndV66Export | №0847 |
| dndV66Filter | №0847 |
| dndV66OpenDebug | №0847 |
| dndV66OpenLog | №0847 |
| dndV66Record | №0846 (+ 1 других файлов) |
| dndV66RefreshDebug | №0847 |
| dndV66SelfTest | №0847 |
| dndV67Close | №0864 |
| dndV67Delete | №0864 |
| dndV67Export | №0864 |
| dndV67FileImport | №0864 |
| dndV67Open | №0864 |
| dndV67Restore | №0864 |
| dndV67Save | №0864 |
| dndV68Close | №0859 |
| dndV68Delete | №0859 |
| dndV68Export | №0859 |
| dndV68FileImport | №0859 |
| dndV68Open | №0859 |
| dndV68Restore | №0859 |
| dndV68Save | №0859 |
| dndV69Clear | №0846 |
| dndV69CloseReplay | №0846 |
| dndV69ExportReplay | №0846 |
| dndV69Filter | №0846 |
| dndV69OpenReplay | №0846 |
| dndV69Play | №0846 |
| dndV69Record | №0846 |
| dndV69Seek | №0846 |
| dndV69Step | №0846 |
| dndV69Stop | №0846 |
| dndV702AddClass | №0848 |
| dndV702AddFeat | №0848 |
| dndV702AddItem | №0848 |
| dndV702AddSpell | №0848 |
| dndV702Close | №0848 |
| dndV702Open | №0848 |
| dndV702Recalc | №0848 |
| dndV702RemoveClass | №0848 |
| dndV702RemoveFeat | №0848 |
| dndV702RemoveItem | №0848 |
| dndV702RemoveSpell | №0848 |
| dndV702SetBackground | №0848 |
| dndV702SetClassLevel | №0848 |
| dndV702SetProfession | №0848 |
| dndV702SetRace | №0848 |
| dndV702SetTotalLevel | №0848 |
| dndV702Tab | №0848 |
| dndV704Close | №0856 |
| dndV704Open | №0856 |
| dndV704Remove | №0856 |
| dndV704Rollback | №0856 |
| dndV704Run | №0856 |
| dndV704SaveCustom | №0856 |
| dndV704Select | №0856 |
| dndV705Close | №0855 |
| dndV705Create | №0855 |
| dndV705Export | №0855 |
| dndV705ImportPrompt | №0855 |
| dndV705Open | №0855 |
| dndV705Rollback | №0855 |
| dndV705Run | №0855 |
| dndV705Select | №0855 |
| dndV708Close | №0857 |
| dndV708Open | №0857 |
| dndV708Reset | №0857 |
| dndV70ApiFilter | №0852 |
| dndV70CallAPI | №0852 |
| dndV70ClearErrors | №0852 |
| dndV70CloseDebug | №0852 |
| dndV70Export | №0852 |
| dndV70InspectSource | №0852 |
| dndV70ModuleFilter | №0852 |
| dndV70OpenDebug | №0852 |
| dndV70RefreshDebug | №0852 |
| dndV70RunHealthCheck | №0852 |
| dndV70SetAPIArgs | №0852 |
| dndV70SetAPIPath | №0852 |
| dndV70Tab | №0852 |
| dndV70UseAPI | №0852 |
| document | №1151 (+ 1 других файлов) |
| druidProgression | №0690 |
| enableDndDebugLogger | №0831 (+ 2 других файлов) |
| enableDndDebugRuntime | №0831 (+ 1 других файлов) |
| ensureDndToolsState | №1142 (+ 5 других файлов) |
| escapeDndHtml | №0625 (+ 3 других файлов) |
| EXTRA_BODY_RUNTIME | №0783 (+ 1 других файлов) |
| FEATS_PHB | №0745 |
| FEATS_SETTING | №0746 |
| FEATS_TCOE | №0747 |
| FEATS_UA_HOMEBREW | №0748 |
| FEATS_XGTE | №0749 |
| fetch | №1110 (+ 2 других файлов) |
| fighterProgression | №0693 |
| filterFeatsList | №0744 |
| geistProgression | №0692 |
| getAllBackgrounds | №0623 |
| getAvailableSubclasses | №0647 (+ 3 других файлов) |
| getCharacterCurrentLevel | №0779 |
| getCharacterLevel | №0779 (+ 3 других файлов) |
| getClassData | №0648 (+ 2 других файлов) |
| getCurrentInventoryWeightData | №0791 (+ 1 других файлов) |
| getDndRules | №0826 |
| getExpandedClassDefinition | №0774 |
| getExpandedClassPack | №0774 |
| getFormattedClassAndLevel | №0699 |
| getKibblesClassDisplayName | №0794 |
| getLevelByExp | №0779 |
| getProfBonusNum | №0647 (+ 2 других файлов) |
| getShifterBloodline | №0832 |
| getShifterBloodlines | №0832 |
| getShifterMaxCR | №0832 |
| getSpellcastingAbilityForClass | №0712 |
| getSpellCastingInfo | №0797 |
| getStatModNum | №0647 (+ 2 других файлов) |
| getSubclassData | №0712 (+ 1 других файлов) |
| getSubclassesForClass | №0648 |
| getSubclassFeaturesForLevel | №0769 |
| getSwarmDevourDamage | №0838 |
| getSwarmDevourDC | №0838 |
| getSwarmMutationSlots | №0838 |
| getSwarmState | №0838 |
| getVesselAspects | №0843 |
| getVesselSpellList | №0843 |
| getVesselSpirit | №0843 |
| GHOST_EXTRA | №0783 |
| ghostProgression | №0696 (+ 2 других файлов) |
| goToTab | №0647 |
| heavyWeapons | №0873 |
| Hero | №0785 |
| illriggerProgression | №0697 (+ 1 других файлов) |
| KIBBLES_CLASS_I18N | №0794 |
| KIBBLES_SOURCE_CATALOG | №0794 |
| KIBBLES_SOURCE_INFO | №0794 |
| kind | №0818 |
| listIntegratedExpandedClasses | №0774 |
| logs | №1153 |
| MARTYR_2024 | №0802 |
| MARTYR_BURDENS | №0802 |
| martyrProgression | №0700 (+ 1 других файлов) |
| martyrRuntime | №0802 |
| maxHpIncrease | №0699 |
| meleeWeapons | №0874 |
| monkProgression | №0702 |
| MULTICLASS_CLASS_REQUIREMENTS | №0774 (+ 2 других файлов) |
| MULTICLASS_PROFICIENCIES_2014 | №0712 (+ 1 других файлов) |
| MULTICLASS_REQUIREMENTS | №0785 |
| NECROMANCER_2024 | №0808 |
| NECROMANCER_SUBCLASSES | №0808 |
| necromancerProgression | №0704 (+ 1 других файлов) |
| necromancerRuntime | №0808 |
| nextInitiativeTurn | №0826 |
| OCCULTIST_KIBBLES_V11 | №0812 |
| occultistProgression | №0706 |
| occultistRuntime | №0812 |
| onerror | №0770 |
| onExpInputChange | №0779 |
| onFeatOrAsiChange | №0699 |
| onSubclassChange | №0699 |
| openAddFeatModal | №0744 |
| openCharacter | №0835 |
| openDndChangelog | №0814 |
| openDndNetworkModal | №0809 |
| openExperienceModal | №0779 |
| openFeatStatChoiceModal | №0744 |
| openIconSettingsModal | №0831 (+ 2 других файлов) |
| openLevelUpModal | №0699 |
| openLevelUpModalFromExp | №0779 |
| openSettingsModal | №0831 |
| paladinProgression | №0708 |
| PARASITE_EXTRA | №0815 |
| parasiteProgression | №0710 (+ 2 других файлов) |
| parasiteRuntime | №0815 |
| parseWeightToKg | №0791 (+ 1 других файлов) |
| pendingLevelUpData | №0699 |
| populateFeatModalList | №0744 |
| Prof_Acr | №0082 |
| Prof_Ani | №0082 |
| Prof_Arc | №0082 |
| Prof_Ath | №0082 (+ 1 других файлов) |
| Prof_Dec | №0082 |
| Prof_His | №0082 |
| Prof_Ins | №0082 |
| Prof_Inv | №0082 |
| Prof_Itm | №0082 |
| Prof_Med | №0082 |
| Prof_Nat | №0082 |
| Prof_Prc | №0082 |
| Prof_Prf | №0082 |
| Prof_Prs | №0082 |
| Prof_Rel | №0082 |
| Prof_Soh | №0082 |
| Prof_Stl | №0082 |
| Prof_Sur | №0082 |
| prompt | №1140 (+ 1 других файлов) |
| psionProgression | №0713 (+ 1 других файлов) |
| pugilistProgression | №0715 (+ 1 других файлов) |
| pugilistRuntime | №0778 |
| rangedWeapons | №0875 |
| rangerProgression | №0717 |
| refreshClassModalLocks | №0699 |
| refreshExtraClassPanels | №0780 |
| removeCharacterFeat | №0744 |
| renderClassFeatures | №0640 (+ 1 других файлов) |
| renderCombatAbilities | №0640 (+ 1 других файлов) |
| renderCompanions | №0826 |
| renderDndTools | №0772 (+ 2 других файлов) |
| renderGhostExtraPanel | №0780 |
| renderInitiativeTracker | №0782 (+ 11 других файлов) |
| renderInventory | №0080 (+ 13 других файлов) |
| renderParasiteExtraPanel | №0780 |
| renderSpellSlots | №0826 (+ 2 других файлов) |
| renderWalterParasitePanel | №0780 |
| renderWeapons | №0826 |
| requestAnimationFrame | №1271 (+ 18 других файлов) |
| resolveMulticlassProficiencyChoice | №0699 (+ 1 других файлов) |
| restorePactMagic | №0772 (+ 2 других файлов) |
| rogueProgression | №0719 |
| rollClassFeatureD20 | №0647 |
| rollClassFeatureDamage | №0647 |
| rollHpIncrease | №0699 |
| rollSingleDice | №0826 |
| RUNEKeeper_V12 | №0827 |
| runeKeeperDialects | №0827 |
| runeKeeperProgression | №0722 (+ 2 других файлов) |
| runeKeeperRuntime | №0778 (+ 1 других файлов) |
| SAVANT_V561 | №0828 |
| savantDisciplines | №0828 |
| savantProgression | №0723 (+ 2 других файлов) |
| savantRuntime | №0828 |
| saveAllCharacters | №1133 (+ 1 других файлов) |
| saveCharacter | №0080 (+ 5 других файлов) |
| saveCurrentCharacter | №0077 |
| saved | №1151 |
| savedDimBeforeHide | №0867 |
| saveNewCreatedCharacter | №0623 (+ 1 других файлов) |
| selectedBaseHp | №0699 |
| selectLauncherIcon | №0831 (+ 2 других файлов) |
| setCharacterLevel | №0831 (+ 2 других файлов) |
| setTimeout | №1140 (+ 1 других файлов) |
| SHIFTER_V21 | №0832 |
| shifterProgression | №0725 (+ 2 других файлов) |
| shifterRuntime | №0832 |
| showCustomAlert | №0791 (+ 1 других файлов) |
| SKILL_TO_VAR_MAP | №1153 |
| SKILLS_CONFIG | №0082 |
| sorcererProgression | №0727 |
| sortInitiativeTracker | №0837 (+ 1 других файлов) |
| specialWeapons | №0876 |
| SPELLBLADE_RUNTIME | №0834 |
| spellbladeProgression | №0834 |
| spells3lvl | №0762 |
| spells4lvl | №0763 |
| spells5lvl | №0764 |
| spells6Lvl | №0765 |
| spells8lvl | №0767 |
| spells9lvl | №0768 |
| spellsLevel1 | №0760 |
| spellsLevel2 | №0761 |
| spellsLevel7 | №0766 |
| startDndOnboarding | №0814 |
| SUBCLASSES_REFERENCE | №0077 (+ 6 других файлов) |
| subtractExperienceValue | №0779 |
| SWARM_EXTRA | №0838 |
| swarmProgression | №0729 (+ 2 других файлов) |
| swarmRuntime | №0838 |
| syncDndNetworkInitiative | №1142 (+ 4 других файлов) |
| syncLevelUI | №0699 |
| toggleClassFeatureDetails | №0647 |
| triggerCritEffect | №1157 |
| updateCharacterArmorClass | №1147 |
| updateCharacterSpellSlots | №0699 (+ 1 других файлов) |
| updateExperienceModalUI | №0779 |
| updateExtraClassCreationUI | №0645 |
| updateMagicData | №0797 |
| updateNetworkModeUI | №0809 |
| useBloodHunterFeature | №0640 |
| useClassFeature | №0647 |
| useFeat | №0781 |
| VESSEL_V4 | №0843 |
| vesselProgression | №0731 (+ 1 других файлов) |
| vesselRuntime | №0843 |
| VTT_PROJECT_MANIFEST_V70 | №0865 |
| WALTER_PARASITE_EXTRA | №0868 |
| walterParasiteProgression | №0733 (+ 2 других файлов) |
| WARDEN_MHP_2024 | №0870 |
| wardenProgression | №0734 (+ 1 других файлов) |
| warlockProgression | №0736 |
| WARLORD_LASERLLAMA_V330 | №0871 |
| warlordProgression | №0738 (+ 1 других файлов) |
| WEAPONS_DB | №0822 (+ 1 других файлов) |
| window | №1110 (+ 8 других файлов) |
| WITCH_MHP_2014 | №0778 |
| witchProgression | №0740 |
| witchRuntime | №0778 |
| wizardProgression | №0742 |

### Поля персонажа (101)

| Имя | Исходные файлы |
|---|---|
| ac | №0792 (+ 4 других файлов) |
| actionSurges | №0826 |
| activeConditions | №0646 (+ 5 других файлов) |
| activeFolderId | №0811 |
| anatomy | №0058 |
| appearance3d | №1087 (+ 1 других файлов) |
| baseAC | №0792 (+ 3 других файлов) |
| class | №0779 (+ 3 других файлов) |
| classes | №0785 (+ 8 других файлов) |
| classFeaturesState | №0772 (+ 1 других файлов) |
| className | №0699 (+ 2 других файлов) |
| clothing | №0058 (+ 1 других файлов) |
| coinLog | №0789 |
| coins | №0789 (+ 2 других файлов) |
| combatAbilities | №0646 (+ 1 других файлов) |
| combatAbilityStat | №0653 |
| companions | №0772 |
| con | №0699 |
| concentration | №0826 (+ 1 других файлов) |
| conditions | №0771 (+ 3 других файлов) |
| constitution | №0699 |
| craftingProfessions | №0668 |
| dead | №0646 (+ 1 других файлов) |
| deathSaves | №0654 (+ 4 других файлов) |
| defeated | №0772 (+ 3 других файлов) |
| encounters | №1057 |
| equipment | №0062 |
| equippedWeapon | №0822 (+ 1 других файлов) |
| exp | №0779 (+ 1 других файлов) |
| extraACBonus | №0826 |
| extraClassType | №0646 (+ 6 других файлов) |
| feats | №0699 (+ 2 других файлов) |
| featStatBonuses | №0744 |
| features | №0699 (+ 3 других файлов) |
| folders | №0811 |
| gender | №0058 (+ 1 других файлов) |
| ghost | №0783 |
| head | №0058 (+ 1 других файлов) |
| heroClass | №0835 |
| hostName | №0783 (+ 2 других файлов) |
| hp | №0646 (+ 4 других файлов) |
| hpCurrent | №0646 (+ 8 других файлов) |
| hpMax | №0646 (+ 5 других файлов) |
| hpTemp | №1140 |
| id | №0772 (+ 4 других файлов) |
| initiativeTracker | №0772 (+ 9 других файлов) |
| inspiration | №1140 |
| inventory | №0791 (+ 14 других файлов) |
| isExtraClass | №0699 (+ 5 других файлов) |
| kiPoints | №0712 (+ 1 других файлов) |
| lastRest | №0646 (+ 1 других файлов) |
| level | №0831 (+ 6 других файлов) |
| library | №0795 |
| libraryData | №0795 |
| morphChannels | №0063 (+ 2 других файлов) |
| multiclassAllowed | №0783 (+ 2 других файлов) |
| name | №0772 (+ 1 других файлов) |
| originRaceId | №0058 |
| pactMagic | №0772 (+ 2 других файлов) |
| pactMagicData | №0772 (+ 3 других файлов) |
| parasite | №0815 |
| pendingProficiencyChoices | №0712 |
| position | №1140 |
| predictorState | №0792 (+ 4 других файлов) |
| profBonus | №0835 (+ 1 других файлов) |
| proficiencies | №0792 (+ 3 других файлов) |
| race | №0699 (+ 2 других файлов) |
| raceId | №0058 (+ 1 других файлов) |
| raceName | №0783 (+ 2 других файлов) |
| rageDamageBonus | №0712 |
| ragesCount | №0712 (+ 1 других файлов) |
| replacesRace | №0783 (+ 3 других файлов) |
| resistances | №1079 |
| resources | №0826 (+ 1 других файлов) |
| revision | №0652 |
| savesData | №0623 (+ 2 других файлов) |
| secondWindUses | №0826 |
| skills | №0712 (+ 1 других файлов) |
| skillsData | №0623 (+ 5 других файлов) |
| skillValues | №0082 |
| skins | №0058 (+ 5 других файлов) |
| sneakAttackDice | №0712 |
| sorceryPoints | №0712 (+ 1 других файлов) |
| speed | №0783 (+ 3 других файлов) |
| spellcastingSources | №0712 (+ 1 других файлов) |
| spells | №0772 |
| spellsData | №0826 (+ 1 других файлов) |
| spellSlotsData | №0646 (+ 4 других файлов) |
| spellStat | №0712 |
| stats | №0785 (+ 12 других файлов) |
| subclass | №0712 (+ 1 других файлов) |
| swarm | №0699 (+ 1 других файлов) |
| tarotEffects | №1138 (+ 1 других файлов) |
| tarotKnowledge | №1138 |
| tempHp | №1079 |
| turnResources | №0772 (+ 1 других файлов) |
| unsaved | №1110 |
| valueOf | №0835 |
| walterParasite | №0699 (+ 1 других файлов) |
| weaponsData | №0646 |
| worldMatrices | №0058 (+ 3 других файлов) |

### Поля JS объектов (6518)

| Имя | Исходные файлы |
|---|---|
| _ | №1173 (+ 11 других файлов) |
| __base | №0072 |
| __bodyMasks | №1102 |
| __ceHeadFrame | №0057 |
| __ceNormals | №0057 (+ 3 других файлов) |
| __ceShapedPositions | №0057 (+ 3 других файлов) |
| __dirname | №1317 |
| __filename | №1317 |
| __floor | №0072 |
| __tarotChargeDouble | №0817 |
| __tarotShared | №0817 |
| __TEST_ASSERT__ | №1317 |
| _sent | №1250 |
| a | №0060 (+ 17 других файлов) |
| abdomen | №0058 |
| aberration | №0627 (+ 12 других файлов) |
| abilities | №0627 (+ 17 других файлов) |
| ability | №0076 (+ 19 других файлов) |
| abilityBonus | №0077 (+ 1 других файлов) |
| abilityBonuses | №0640 |
| abilityChanges | №0817 |
| abilityCheck | №0654 (+ 1 других файлов) |
| abilityCheckBonus | №0778 |
| abilityCheckHigherSpell | №0778 |
| abilityIncrease | №0775 |
| abilityMax | №0817 |
| abilityMin | №0817 |
| abilityScores | №1078 (+ 3 других файлов) |
| absorbedItems | №0838 |
| absorbedTempHp | №0837 |
| ac | №0623 (+ 69 других файлов) |
| academies | №0738 (+ 1 других файлов) |
| academy | №0775 (+ 1 других файлов) |
| academyFeature | №0775 |
| academyFeatures | №0738 |
| acBase | №0083 (+ 1 других файлов) |
| acBonus | №0775 (+ 7 других файлов) |
| acBonusAgainstTarget | №0778 |
| acBonusDie | №0778 |
| accent | №0831 |
| accepted | №1771 |
| acceptedCategories | №0801 |
| acceptedTags | №0801 |
| access | №0669 |
| access_token | №0652 (+ 1 других файлов) |
| accessories | №0806 (+ 1 других файлов) |
| accessors | №1119 (+ 1 других файлов) |
| acEqualsSelf | №0778 |
| acFormula | №0083 |
| acid | №0077 (+ 2 других файлов) |
| Acid | №0079 |
| acidBomb | №0778 |
| acidReagent | №0825 |
| acolyteOfArms | №0778 |
| acOverride | №0810 (+ 1 других файлов) |
| acPenalty | №0077 |
| acReduction | №0778 |
| acrobatics | №0771 (+ 1 других файлов) |
| acSaveDamageBonus | №0778 |
| action | №0076 (+ 59 других файлов) |
| actionId | №0804 |
| actionOrBonusAction | №0778 |
| actionRequired | №0654 |
| actions | №0077 (+ 28 других файлов) |
| actionSpent | №0077 (+ 1 других файлов) |
| actionSurge | №0647 |
| actionSurges | №0693 |
| actionType | №0077 |
| activate | №1160 |
| activated | №0817 |
| activateLastStand | №0817 |
| active | №0640 (+ 32 других файлов) |
| ACTIVE | №0781 |
| activeCharacteristics | №0868 |
| activeConditions | №0623 (+ 9 других файлов) |
| activeEncounter | №0861 |
| activeEncounterId | №0860 (+ 1 других файлов) |
| activeFolderId | №1771 |
| activeId | №0861 |
| activeIndex | №0077 (+ 42 других файлов) |
| activeMutations | №0838 |
| activeOrgans | №0868 |
| activeProperties | №0079 |
| activeRage | №0647 (+ 1 других файлов) |
| activeRite | №0640 |
| activeShape | №1240 |
| activity | №0627 (+ 12 других файлов) |
| actor | №0782 (+ 2 других файлов) |
| actorId | №0818 (+ 4 других файлов) |
| actorName | №1202 |
| actual | №0853 |
| actWithArcaneAnathemaWhileDisabled | №0778 |
| adamantine | №0667 |
| adaptiveMalediction | №0778 |
| addClass | №0848 |
| addCombatantFromTemplate | №0654 |
| addConToEachDie | №0778 |
| addCreature | №0860 |
| addCustomLoot | №0806 (+ 1 других файлов) |
| addD4OnFailure | №0778 |
| addDamage | №0077 |
| addDie | №0778 |
| added | №0627 (+ 26 других файлов) |
| addEventListener | №0886 (+ 25 других файлов) |
| addExhaustion | №0826 |
| addFeat | №0848 |
| addFloor | №0070 |
| addInventory | №0848 |
| additionalFamiliar | №0812 |
| addLexiconRune | №0778 |
| addObject | №0070 |
| addProficiencyBonus | №0778 |
| addProfToAnathema | №0778 |
| addRecipe | №0666 |
| addSelected | №0860 |
| addSpell | №0848 |
| addToRoll | №0778 |
| addXP | №0669 |
| addZone | №0070 |
| adhesive | №0077 |
| adjustedXp | №0804 |
| adjustRiteDamage | №0640 |
| adjustSymbiosis | №0815 |
| adjustWeaponDamage | №0640 |
| adornment | №0669 |
| adrenaline | №0832 |
| adroitAnalysis | №0828 |
| adultAnatomy | №0065 |
| advancedRoguishCharm | №0778 |
| advancedTactics | №0778 |
| advancedTransformation | №0640 |
| advanceTime | №0077 (+ 1 других файлов) |
| advantage | №0077 (+ 14 других файлов) |
| advantageAgainst | №0778 |
| advantageAgainstFrightened | №0778 |
| advantageAgainstGrappled | №0778 |
| advantageAgainstTarget | №0778 |
| advantageAgainstWounded | №0775 |
| advantageAllAttacks | №0640 |
| advantageAllD20 | №0778 |
| advantageAttackRolls | №0778 |
| advantageAttacks | №0778 |
| advantageCharismaChecks | №0778 |
| advantageDexSave | №0778 |
| advantageFirstAttack | №0778 |
| advantageIfSameTarget | №0685 |
| advantageMagicalSaves | №0778 |
| advantageNextAttack | №0775 (+ 1 других файлов) |
| advantageNextSave | №0778 |
| advantageOnChecks | №0775 |
| advantageOnCon | №0775 |
| advantageOneAttackOrSave | №0778 |
| advantageOrDisadvantage | №0778 |
| advantagePerception | №0812 |
| advantageRecallFeyFiendsUndead | №0640 |
| advantageSaves | №0640 (+ 1 других файлов) |
| advantageSavesAgainst | №0778 |
| advantageSavingThrows | №0778 |
| advantageStealth | №0685 |
| advantageStr | №0778 |
| advantageStrength | №0077 |
| advantageTrackFeyFiendsUndead | №0640 |
| advantageVsIntimidation | №0775 |
| adventuringDiscipline | №0778 |
| advice | №0817 (+ 3 других файлов) |
| aether | №0640 |
| Aether | №0778 |
| aetherWalk | №0640 |
| affected | №0077 |
| affinities | №0843 |
| affinity | №1168 |
| afflictedDisadvantageEndSave | №0778 |
| afflictionControl | №0076 |
| african | №1124 |
| afro | №0060 (+ 1 других файлов) |
| after | №0778 (+ 1 других файлов) |
| afterActorAttack | №0640 |
| afterAttack | №0817 |
| afterAttackCost | №0778 |
| afterAttackThreeUnarmed | №0778 |
| afterCarousingAdvantage | №0778 |
| afterDamage | №0640 (+ 1 других файлов) |
| againstInterdicted | №0778 |
| age | №0623 (+ 2 других файлов) |
| ageAppearanceLocked | №0812 |
| ageless | №0778 |
| agePossessionSleepTransformImmunity | №0778 |
| AI_ALLOW_PAID_API | №1076 |
| AI_BASE_SHA | №1077 |
| AI_DEVELOPMENT_ENABLED | №1076 |
| ailment | №0778 |
| ailments | №0076 (+ 1 других файлов) |
| airCore | №0825 |
| airEssence | №0825 |
| alchemical | №0798 |
| alchemicalFat | №0825 |
| alchemicalReagentV49 | №0666 |
| alchemicalSavvy | №0647 |
| alchemist | №0669 (+ 4 других файлов) |
| alchemistActiveEffects | №1078 (+ 1 других файлов) |
| alchemistDebuffs | №1078 |
| alchemistDiscovered | №1079 |
| alchemistExplosionResistanceType | №1078 |
| alchemistGolem | №0077 |
| alchemistGolemOwner | №0077 |
| alchemistGrafts | №1078 |
| alchemistHomunculus | №0077 |
| alchemistHomunculusOwner | №0077 (+ 1 других файлов) |
| alchemistPoisonedWeaponId | №1078 |
| alchemistPreparedFormula | №1079 |
| alchemistSaveDC | №1078 |
| alchemistToxicVengeance | №1078 |
| alchemy | №0667 (+ 1 других файлов) |
| alchemyId | №0079 (+ 1 других файлов) |
| alchemyPoints | №0778 |
| alchemyTools | №0812 |
| alcoholRules | №0077 |
| ale | №0671 |
| alert | №1112 (+ 12 других файлов) |
| alerts | №1140 |
| aliases | №0076 (+ 12 других файлов) |
| all | №0774 (+ 1 других файлов) |
| ALL_RECIPES | №1111 (+ 1 других файлов) |
| allAttacksThisTurn | №0640 |
| allConcentrationSavesDisadvantage | №0640 |
| allDisciplines | №0775 |
| allies | №1189 |
| alliesTempHp | №0778 |
| allLanguages | №0778 |
| allowedForms | №0778 |
| allowFriendly | №0655 |
| allSeeing | №0870 |
| allSkills | №0808 |
| alluring | №0640 |
| Alluring | №0778 |
| ally | №1141 |
| allyACBonus | №0778 |
| allyAdvantage | №0775 |
| allyAdvantageAgainstMarkedPrey | №0778 |
| allyAttackOrDamageCantrip | №0778 |
| allyCharge | №0775 |
| allyCount | №0778 |
| allyDestination | №0818 (+ 2 других файлов) |
| allyFormation | №0775 |
| allyId | №0817 (+ 3 других файлов) |
| allyMoveReactionFt | №0778 |
| allyNextAddD8 | №0778 |
| allyReactionsUpTo | №0778 |
| allyReposition | №0775 |
| allySaveAdvantage | №0778 |
| allySaveAdvantageFt | №0778 |
| allySaveBonus | №0778 |
| allyStrDexSaveBonus | №0778 |
| allyTempHp | №0778 |
| allyWilling | №0818 (+ 2 других файлов) |
| allyWithinAura | №0654 (+ 1 других файлов) |
| allyWithinCourage | №0654 |
| almond | №0062 (+ 1 других файлов) |
| alpha | №0062 (+ 1 других файлов) |
| alphaCutoff | №0068 |
| alphaCutoffLoc | №0072 |
| alphaMode | №0068 |
| alphaModeLoc | №0072 |
| alpine | №0062 |
| alreadyCast | №0818 (+ 1 других файлов) |
| alreadyKnown | №0832 |
| alt | №0778 |
| altar | №0066 |
| alternateNecromancers | №0808 |
| alternateResourceIds | №0080 |
| altMin | №0745 |
| altStat | №0745 |
| alum | №0672 |
| alwaysPrepared | №0802 (+ 2 других файлов) |
| amount | №0080 (+ 35 других файлов) |
| amp | №0640 |
| amphibian | №0773 |
| amplified | №0640 (+ 1 других файлов) |
| amplifiedDamage | №0778 |
| amplifiedEffect | №0778 |
| amplifiedMoveFt | №0778 |
| amplifiedNextAttackAdvantage | №0778 |
| amplifiedRestoreSpellSlot | №0778 |
| amplify | №0640 (+ 4 других файлов) |
| analysisAction | №0828 |
| analyticalDefense | №0828 |
| anatomy | №0060 (+ 1 других файлов) |
| anatomyLevel | №0057 |
| anatomyProfile | №0065 |
| anatomyShape | №0057 |
| anatomySkin | №0057 |
| anatomyType | №0057 |
| anatomyVariant | №0057 |
| anatomyZones | №0057 |
| anchor | №0060 (+ 1 других файлов) |
| anchorPositions | №0060 (+ 1 других файлов) |
| anchors | №0808 |
| ancient_ruins | №0877 |
| ancientMalediction | №0778 |
| angle | №0060 |
| animalFrame | №0060 |
| animalHandling | №0771 (+ 1 других файлов) |
| animalHandlingDC | №0685 |
| animalProfile | №0060 (+ 6 других файлов) |
| animalSkin | №0060 |
| animateDead | №0808 |
| animateThralls | №0778 |
| animation | №0778 |
| animationId | №0064 (+ 1 других файлов) |
| animations | №0067 |
| ankhBlessing | №0808 |
| annotated | №0662 |
| anointedMagic | №0778 |
| antelope | №0065 |
| antialias | №0062 (+ 1 других файлов) |
| Antidote | №0079 |
| antiMagicAdvantage | №0808 |
| anvil | №0066 |
| anxious | №0640 |
| any | №0774 (+ 1 других файлов) |
| aoe | №0810 |
| aoeFt | №0640 |
| aoeLengthFt | №0810 |
| aoeRadiusFt | №0625 (+ 3 других файлов) |
| aoeShape | №0625 (+ 1 других файлов) |
| aoeWidthFt | №0810 |
| apathy | №0817 |
| ape | №0060 |
| apexPredator | №0778 |
| api | №1110 |
| apiArgs | №0852 |
| apiFilter | №0852 |
| apikey | №0652 |
| apiPath | №0852 |
| apis | №0852 |
| apothecary | №0066 (+ 1 других файлов) |
| apothecaryRejectsHammer | №1174 |
| app | №0859 (+ 1 других файлов) |
| appearance | №0059 (+ 3 других файлов) |
| appearance3d | №1110 |
| appearanceAgingStopped | №0812 |
| appearanceOpacity | №0065 |
| appendChild | №1171 (+ 8 других файлов) |
| applications | №0820 |
| applied | №0076 (+ 10 других файлов) |
| appliesCalcifyingStrike | №0778 |
| apply | №0841 |
| applyASI | №0826 |
| applyDamage | №0654 (+ 5 других файлов) |
| applyDamageBatch | №0654 |
| applyFromRound | №0817 |
| applyFullQuality | №0664 |
| applyMorphTargets | №0065 |
| applyOverchannel | №0810 |
| applyPotionEffect | №0077 |
| applyPreset | №0065 |
| applyQuality | №0666 |
| applyStaged | №0841 |
| applyVisibility | №0665 |
| applyWitchTouch | №0778 |
| arcana | №0771 (+ 1 других файлов) |
| arcanaSaveDC | №0778 |
| arcane | №0798 (+ 2 других файлов) |
| arcane_defender | №0781 |
| arcane_recovery_feat | №0781 |
| arcaneAnathema | №0778 |
| arcaneMastery | №0647 |
| arcaneReagentV49 | №0666 |
| arcaneRecovery | №0647 |
| arcaneShard | №0666 (+ 1 других файлов) |
| arcaneWard | №1229 |
| archaeologist | №0828 |
| archdruid | №0647 |
| archery | №0778 |
| archetype | №0778 (+ 1 других файлов) |
| archetypes | №0713 |
| archfey | №0640 |
| architect | №0778 |
| archon | №0843 |
| archonForm | №0843 |
| archons | №0843 |
| area | №0077 (+ 1 других файлов) |
| areaFt | №0077 (+ 1 других файлов) |
| areaRadiusFt | №0778 |
| areaSlime | №0077 |
| areaVulnerability | №0838 |
| arenaRoyale | №0715 |
| args | №1271 (+ 37 других файлов) |
| arm | №0060 |
| armament | №0076 (+ 1 других файлов) |
| armedAndAngry | №0778 |
| armLength | №0062 (+ 1 других файлов) |
| armor | №0060 (+ 65 других файлов) |
| armor_component | №0825 |
| armorBonus | №0664 |
| armorClass | №0673 (+ 1 других файлов) |
| armoredAC | №0778 |
| armorer | №0669 (+ 2 других файлов) |
| armorOfFaith | №0802 |
| armorProficiency | №0812 |
| armorTriangles | №0062 |
| armorWear | №1112 |
| armour | №0066 |
| armpitL | №0058 (+ 1 других файлов) |
| armpitR | №0058 |
| armReaction | №0817 |
| arms | №0062 (+ 3 других файлов) |
| arr | №0801 |
| arrayBuffer | №1083 (+ 5 других файлов) |
| arrestingStrike | №0778 |
| ArrowDown | №0069 |
| arrowheads | №0666 (+ 1 других файлов) |
| ArrowLeft | №0069 |
| ArrowRight | №0069 |
| ArrowUp | №0069 |
| art | №0831 |
| artificer | №0662 (+ 2 других файлов) |
| artOfWar | №0778 |
| ascended | №0843 |
| ascensionLevel | №0713 |
| asi | №0674 (+ 28 других файлов) |
| asian | №1124 |
| asleep | №0817 |
| aspect | №0778 (+ 1 других файлов) |
| assessItem | №0663 |
| asset | №1119 (+ 1 других файлов) |
| assetId | №0062 (+ 3 других файлов) |
| astral | №0062 |
| astralConstruct | №0778 |
| asymmetric | №0065 |
| at | №0060 (+ 17 других файлов) |
| at11 | №0713 |
| at17 | №0713 |
| athletics | №0771 (+ 2 других файлов) |
| atob | №1217 (+ 2 других файлов) |
| atStartOfTurn | №1164 (+ 1 других файлов) |
| attach | №0063 (+ 1 других файлов) |
| attached | №0077 |
| attachment | №0868 |
| attack | №0077 (+ 20 других файлов) |
| attackAbility | №0077 |
| attackAction | №0778 |
| attackAgainstMode | №0826 |
| attackBonus | №0077 (+ 9 других файлов) |
| attackBonusAdjustment | №0640 |
| attackCantripSwap | №0808 |
| attackChain | №0775 |
| attackContext | №0640 (+ 1 других файлов) |
| attackCount | №0654 (+ 3 других файлов) |
| attackCrit | №0808 |
| attackDamageBonus | №0664 |
| attackDisadvantage | №0077 (+ 2 других файлов) |
| attackDisadvantageUnlessTargetsSelf | №0778 |
| attackDistanceFt | №1164 |
| attacker | №0640 (+ 13 других файлов) |
| attackerId | №0077 (+ 9 других файлов) |
| attackerPeerId | №0810 |
| attackKind | №0654 (+ 7 других файлов) |
| attackModifier | №0832 |
| attackModifiers | №0077 (+ 17 других файлов) |
| attackOrSpell | №0778 |
| attackPenalty | №0077 (+ 1 других файлов) |
| attackReplaced | №1170 |
| attackResult | №0640 (+ 5 других файлов) |
| attackRoll | №0778 |
| attacks | №0654 (+ 8 других файлов) |
| attacksAgainst | №0826 |
| attackSequence | №0654 (+ 1 других файлов) |
| attacksHaveAdvantage | №0077 |
| attackSight | №0817 |
| attackTarget | №1164 |
| attackTotal | №0810 (+ 3 других файлов) |
| attackType | №0759 (+ 18 других файлов) |
| attitudeIndifferent | №0778 |
| attitudeShift | №0778 |
| attributeFilter | №0839 (+ 1 других файлов) |
| attributes | №0839 (+ 3 других файлов) |
| attrs | №1080 |
| atWill | №0778 |
| atWillSuppress | №0778 |
| auraDebuff | №0808 |
| auraHoldTheLine | №0778 |
| auraOfCourage | №0647 |
| auraOfProtection | №0647 |
| auraRangeFt | №0808 |
| auraSource | №0654 (+ 1 других файлов) |
| author | №0070 |
| authoritativeSubclasses | №0076 (+ 13 других файлов) |
| authorityEpoch | №0809 (+ 5 других файлов) |
| authorityId | №0809 (+ 3 других файлов) |
| authoritySnapshot | №0864 |
| auto | №0810 |
| autoAnimalHandlingRampage | №0685 |
| autoCheckForUpdates | №0841 |
| autoFailed | №0640 (+ 2 других файлов) |
| autoFailHexSave | №0778 |
| autoFailSaveUses | №0778 |
| autoFailStrDex | №0826 (+ 2 других файлов) |
| autognome | №0671 |
| autoHideMenuBar | №0885 |
| automaticAssembly | №0065 |
| autoPlans | №0810 |
| autoSaveCurrentCharacter | №1171 (+ 2 других файлов) |
| autoTrigger | №0077 |
| available | №0804 (+ 1 других файлов) |
| availableFeatures | №0660 |
| avatars | №0838 |
| avatarStorm | №0808 |
| avian | №0060 (+ 1 других файлов) |
| avoidDeath | №0778 |
| awakened | №0713 (+ 1 других файлов) |
| Awakened | №0794 |
| awakenedRune | №0778 |
| awakening | №0802 |
| axes | №0062 |
| AXES | №0065 |
| azure | №0831 |
| b | №0867 (+ 17 других файлов) |
| back | №0061 (+ 3 других файлов) |
| background | №0623 (+ 6 других файлов) |
| backgroundColor | №0885 |
| backgrounds | №1771 |
| backLower | №0058 |
| backslash | №0073 (+ 1 других файлов) |
| backslashTexture | №0075 |
| BackTexture | №1134 |
| backup | №0851 (+ 1 других файлов) |
| backUpper | №0058 |
| bad | №1090 |
| badlands | №0877 |
| badlands_canyon | №0877 |
| badlands_crater | №0877 |
| badlands_glass | №0877 |
| balanceCp | №0798 |
| balanced | №0058 |
| balancePreserved | №1174 |
| balefulInterdict | №0697 |
| balefulPresence | №0778 |
| band | №0663 |
| bandHeight | №0061 |
| bandTile | №0061 |
| bandTogether | №0778 |
| banished | №0778 |
| banner | №0066 |
| bard | №0797 (+ 1 других файлов) |
| bardicInspiration | №0647 (+ 1 других файлов) |
| barrel | №0066 |
| barter | №1174 |
| barycentricOutsideTolerance | №1129 |
| base | №0068 (+ 5 других файлов) |
| baseAc | №0810 (+ 1 других файлов) |
| baseAC | №0623 (+ 2 других файлов) |
| baseAcFormula | №0823 |
| baseColorFactor | №0068 (+ 1 других файлов) |
| baseColorSampler | №0068 |
| baseColorTexture | №0068 |
| baseCp | №0800 |
| baseFeatures | №0870 |
| baseId | №0673 |
| baseModel | №0065 (+ 1 других файлов) |
| baseObj | №1130 (+ 2 других файлов) |
| basePositions | №0061 (+ 2 других файлов) |
| basePositionsSha256 | №1266 |
| baseQualityScore | №0663 |
| baseUrl | №1115 (+ 1 других файлов) |
| basilisk | №0685 |
| bastionOfOrder | №0778 |
| battleBoard | №0847 (+ 1 других файлов) |
| battleBoardView | №0859 |
| battlefield | №1110 (+ 20 других файлов) |
| battlefieldAnalysis | №0775 |
| battlefieldSupport | №0738 |
| Battlemage | №0794 |
| battleMagic | №0647 |
| battleOver | №0782 |
| bboxDiagonalRatio | №1132 |
| beakColor | №0065 (+ 1 других файлов) |
| beakSize | №0065 (+ 3 других файлов) |
| beakStyle | №0062 (+ 3 других файлов) |
| beard | №0062 (+ 3 других файлов) |
| bearingDegrees | №0817 |
| beast | №0628 (+ 2 других файлов) |
| beast_tamer | №0781 |
| beastCommand | №0775 |
| beastCompanion | №0647 |
| beastheart | №0656 |
| beastheartEndTurn | №0655 |
| beastheartLevel | №0685 |
| beastheartStartTurn | №0655 |
| Beasthide | №0794 |
| beastMaster | №0656 |
| beastShape | №0778 |
| beastSpells | №0647 |
| becomeGhost | №0778 |
| bed | №0066 |
| before | №0826 (+ 1 других файлов) |
| beforeAttack | №0817 |
| beforeRoll | №0654 |
| beginBlind | №0820 |
| beginConcentration | №0654 |
| beginInitial | №0820 |
| beginLastStand | №0817 |
| beginOwnTurn | №0820 |
| beginWager | №0820 |
| behavior | №1189 |
| belt | №0061 |
| bench | №0066 |
| benefits | №0778 |
| berserker_rage | №0781 |
| bestAxisPermutation | №1132 |
| bestiaryVersion | №0627 (+ 12 других файлов) |
| bigby | №0627 |
| bin_bytes | №1121 |
| binary | №1266 |
| binarySha256 | №1266 |
| bindHost | №0815 |
| binding | №0640 |
| bindOnCharnelSpend | №0808 |
| bindPositions | №0057 |
| bindShell | №0783 |
| biomass | №0815 |
| biomassGained | №0815 |
| biomassHealing | №0838 |
| black | №0867 |
| Black | №0775 (+ 1 других файлов) |
| blackmarket | №0800 (+ 1 других файлов) |
| blackRider | №0808 |
| blacksmith | №0798 |
| blastCoating | №0676 |
| blastDice | №0077 |
| blastWave | №0778 |
| blend | №0060 |
| blessGuidance | №0778 |
| blessLike | №0077 |
| blind | №0775 |
| blindBeyond | №0817 |
| blinded | №0817 (+ 1 других файлов) |
| blinding | №0778 |
| Blindness | №0079 |
| blindsense | №0647 |
| blindsight | №0868 |
| blindsightFt | №0778 (+ 1 других файлов) |
| bloatedAgony | №0640 |
| Blob | №1202 (+ 5 других файлов) |
| block | №0843 |
| blocked | №0654 (+ 3 других файлов) |
| blocksIncorporealMovement | №0778 |
| blocksMovement | №0073 |
| bloodAscendent | №0808 |
| bloodCost | №0812 |
| bloodCostPerSpellLevel | №0812 |
| bloodCurseActor | №0654 (+ 1 других файлов) |
| bloodCurseAmplify | №0654 (+ 1 других файлов) |
| bloodCurseDistanceFt | №0654 (+ 1 других файлов) |
| bloodCurseExposure | №0654 |
| bloodCurseOfCorrosion | №0640 |
| bloodCurseOfHowl | №0640 |
| bloodCurseOfTheExorcist | №0640 |
| bloodCurses | №0687 |
| bloodCurseTargetsBloodless | №0778 |
| bloodhawk | №0685 |
| bloodhoundBruisers | №0715 |
| bloodHunterPuppet | №0640 (+ 1 других файлов) |
| bloodiedButUnbowed | №0715 (+ 1 других файлов) |
| bloodline | №0832 (+ 1 других файлов) |
| bloodlines | №0832 |
| bloodlustAdvantage | №0778 |
| bloodMaledict | №0640 (+ 1 других файлов) |
| bloodPrice | №0697 |
| bloodPriceAura | №0778 |
| bloodRiteRevival | №0654 |
| bludgeoning | №0870 |
| blue | №0831 |
| blushColor | №0065 |
| blushOpacity | №1280 |
| bob | №0060 (+ 1 других файлов) |
| bodiesCount | №0077 (+ 1 других файлов) |
| bodiesSpent | №0077 |
| body | №0065 (+ 35 других файлов) |
| bodyAccessories | №0060 |
| bodyColor | №0065 (+ 9 других файлов) |
| bodyDefaults | №0065 |
| bodyDestroyed | №0868 |
| bodyH | №0058 (+ 2 других файлов) |
| bodyHorror | №0628 |
| bodyHP | №0868 |
| bodyMaxHP | №0868 |
| bodyName | №0868 |
| bodyPossession | №0808 |
| bodyPreset | №0058 |
| bodyStats | №0815 |
| bodyTint | №0065 (+ 1 других файлов) |
| bolsteringSuppression | №0778 |
| bomb | №0676 (+ 1 других файлов) |
| bombDamage | №0676 |
| bombFormulas | №0676 |
| bombImmunity | №0778 |
| bombs | №0676 |
| bondedTarget | №0778 |
| bondOfBloodthirst | №0778 |
| bondOwnerId | №0817 |
| bondPartnerId | №0817 |
| bonds | №0685 |
| bondWilling | №0818 (+ 2 других файлов) |
| bone | №0666 (+ 1 других файлов) |
| boneAsh | №0672 |
| boneSpurring | №0778 |
| boneStock | №0666 (+ 1 других файлов) |
| boneStockV49 | №0666 |
| bonus | №0077 (+ 66 других файлов) |
| bonusAC | №0778 |
| bonusAction | №0077 (+ 27 других файлов) |
| bonusActionAfflict | №0778 |
| bonusActionAttack | №0775 |
| bonusActionAttackAfterExploit | №0778 |
| bonusActionAttackAfterSpell | №0812 |
| bonusActionAttacks | №0778 |
| bonusActionDash | №0077 |
| bonusActionDisengageOrHide | №0778 |
| bonusActionDisengageOrSearch | №0778 |
| bonusActionExtraWeaponAttack | №0778 |
| bonusActionFear30 | №0778 |
| bonusActionOrder | №0778 |
| bonusActions | №0657 |
| bonusActionSeed | №0808 |
| bonusActionSupport | №0775 |
| bonusActionSupportOrder | №0778 |
| bonusActionUnarmedOrGrapple | №0778 |
| bonusActionWeaponAttack | №0640 |
| bonusAttack | №0640 (+ 3 других файлов) |
| bonusAttackAfterInvoke | №0778 |
| bonusAttackVsFrightened | №0778 |
| bonusCantrip | №0778 |
| bonusCharnelTouchAfterAttack | №0808 |
| bonusDamage | №0077 (+ 9 других файлов) |
| bonusDamageDice | №0778 |
| bonusDamageDie | №0778 |
| bonusDamageOnHit | №0778 |
| bonusDash | №0778 |
| bonusDie | №0812 |
| bonuses | №0083 (+ 6 других файлов) |
| bonusFireDamage | №0685 |
| bonusGrapple | №0778 |
| bonusHealing | №0778 |
| bonusHp | №0778 (+ 1 других файлов) |
| bonusHpDice | №0778 |
| bonusKnownSpells | №0778 |
| bonusMaxHP | №0778 |
| bonusMeleeAttack | №0778 |
| bonusSpell | №0812 |
| bonusSpells | №0812 |
| bonusSteps | №0808 |
| bonusStrDexConRolls | №0778 |
| bonusWeaponAttackAfterCantrip | №0778 |
| book | №0066 |
| bookshelf | №0066 |
| boon | №0778 |
| boots | №0061 (+ 1 других файлов) |
| bottle | №0066 |
| bottom | №0065 (+ 6 других файлов) |
| boundary | №0057 |
| bounds | №0060 (+ 2 других файлов) |
| bountiful_luck | №0781 |
| bovineEarSize | №0065 (+ 1 других файлов) |
| bowDamageBonus | №0778 |
| bowyer | №0669 |
| boxingTechnique | №0775 |
| bra | №0061 |
| braceUp | №0778 |
| braid | №0060 (+ 1 других файлов) |
| brainsOverBrawn | №0778 |
| bramble | №0077 |
| brambleBomb | №0778 |
| brand | №0778 |
| brandAllyDistanceFt | №0654 |
| brandCastigation | №0654 (+ 2 других файлов) |
| brandOfAxiom | №0640 |
| brandOfCastigation | №0640 (+ 1 других файлов) |
| brandOfSundering | №0640 |
| brandOfTethering | №0640 (+ 1 других файлов) |
| brandOfVoracious | №0640 |
| brandSappingScar | №0640 |
| brawling | №0778 |
| breakConcentration | №0654 |
| breastSize | №0062 (+ 2 других файлов) |
| Breathing | №0079 |
| brew | №0812 |
| brewer | №0669 (+ 3 других файлов) |
| brewMinutes | №0808 |
| briefs_female | №0061 |
| briefs_male | №0061 |
| brightLightFt | №0778 |
| brightLightRadiusFt | №0778 |
| broken | №0065 (+ 2 других файлов) |
| browHeight | №0065 |
| browRidge | №0065 |
| browser | №1260 |
| brutalCritical | №0647 |
| bt_a | №1241 |
| bt_ally | №1135 (+ 5 других файлов) |
| bt_b | №1241 |
| bt_enemy | №1135 (+ 6 других файлов) |
| bt_friend | №1140 |
| bt_own | №1154 |
| bt_owner | №1137 (+ 1 других файлов) |
| bt_self | №1135 (+ 4 других файлов) |
| btoa | №1217 (+ 2 других файлов) |
| bubbles | №0699 |
| budgets | №0058 |
| buf | №0072 |
| buff | №0817 |
| buffer | №1118 (+ 3 других файлов) |
| buffers | №0068 (+ 3 других файлов) |
| bufferView | №1118 (+ 3 других файлов) |
| bufferViews | №1119 (+ 1 других файлов) |
| build | №0057 (+ 3 других файлов) |
| buildAnimations | №0067 |
| builder | №0669 |
| buildFeatureSet | №0647 (+ 2 других файлов) |
| bulette | №0685 |
| bull | №0060 |
| bullMuzzleSize | №0065 (+ 1 других файлов) |
| bun | №0060 (+ 1 других файлов) |
| burden | №0802 (+ 1 других файлов) |
| Burned | №0778 |
| burning | №0077 (+ 1 других файлов) |
| burningTicks | №1078 |
| burstDamage | №0778 |
| burstRadiusFt | №0778 |
| buttocks | №0058 |
| buttonColor | №0061 (+ 2 других файлов) |
| buttons | №0061 (+ 3 других файлов) |
| buy | №0798 (+ 2 других файлов) |
| buyFactor | №0798 (+ 1 других файлов) |
| bypassesTempHP | №0802 |
| byteLength | №1118 (+ 3 других файлов) |
| byteOffset | №1118 (+ 3 других файлов) |
| bytes | №0841 (+ 8 других файлов) |
| bytesDone | №0841 (+ 2 других файлов) |
| bytesTotal | №0841 (+ 2 других файлов) |
| c | №0810 (+ 19 других файлов) |
| cabinet | №0066 |
| cache | №0841 (+ 2 других файлов) |
| cackle | №0778 |
| calcifyingStrike | №0778 |
| calculateAC | №0826 |
| calculatedCombustion | №0778 |
| calculatedFlourish | №0828 |
| calculateEncounter | №0804 |
| calculateMaxHP | №0838 |
| call | №1170 |
| callAPI | №0852 |
| callFromBelow | №0778 |
| calligrapher | №0669 (+ 1 других файлов) |
| callOfIron | №0778 |
| calls | №0870 (+ 2 других файлов) |
| callToHavok | №0778 |
| campaign | №0847 |
| campaignEvent | №0782 |
| campaignEvents | №1191 |
| campaigns | №0641 |
| canAncestorAttack | №0817 |
| canApplyNatively | №0841 |
| canBarter | №0800 |
| canBecomeHuge | №0778 |
| canBurnSealForBlind | №0778 |
| canCaptureHost | №0815 |
| canCast | №0817 |
| cancel | №0885 |
| cancelReaction | №0817 |
| canCounter | №0778 |
| canCraftRecipe | №0669 |
| canDisassemble | №0664 |
| candle | №0066 |
| canEnterHost | №0815 |
| canHear | №1164 |
| canid | №0773 |
| canMerge | №0838 |
| canMove | №0817 |
| cannotBecomeRitual | №0812 |
| cannotLie | №0817 |
| cannotSurprise | №0775 |
| CANONICAL_2024_SUBCLASSES | №0077 |
| canopicJars | №0808 |
| canReceiveHealing | №0783 (+ 1 других файлов) |
| canRepair | №0664 |
| canRestHealBody | №0783 (+ 2 других файлов) |
| canSee | №0817 |
| canTarget0Hp | №0778 |
| cantrip | №0077 (+ 3 других файлов) |
| cantrips | №0640 (+ 4 других файлов) |
| cantripsByLevel | №0808 |
| cantripsKnown | №0706 (+ 2 других файлов) |
| canWalk | №0070 |
| cap | №0061 |
| capaciousAnathema | №0778 |
| capacity | №0778 (+ 4 других файлов) |
| capacityByLevel | №0812 |
| capacityFt3 | №0812 |
| capColor | №0065 (+ 1 других файлов) |
| cape | №0061 |
| capeWidth | №0061 |
| capSize | №0065 (+ 1 других файлов) |
| captain | №0738 (+ 1 других файлов) |
| capture | №0862 |
| capturedAt | №0815 |
| captureHost | №0815 |
| caravan | №0798 (+ 2 других файлов) |
| caravan_master | №0800 (+ 1 других файлов) |
| card | №0820 |
| cardId | №0817 |
| cards | №0820 (+ 2 других файлов) |
| careful | №0647 |
| carpenter | №0668 (+ 4 других файлов) |
| carried | №0805 |
| carryCapacity | №0812 |
| carryingCapacityMultiplier | №0778 |
| cart | №0066 |
| cartographer | №0667 (+ 5 других файлов) |
| cartographyQuality | №0670 |
| case | №0647 (+ 2 других файлов) |
| cases | №1771 |
| castAsRitual | №0812 |
| caster | №0654 (+ 3 других файлов) |
| casterId | №0818 (+ 1 других файлов) |
| casterLevel | №0797 (+ 2 других файлов) |
| castIllriggerActionSpell | №0778 |
| castingClass | №0810 (+ 5 других файлов) |
| castingStat | №0810 (+ 4 других файлов) |
| castingTime | №0759 (+ 16 других файлов) |
| castLucidSpellFree | №0778 |
| castSpell | №0778 (+ 1 других файлов) |
| castSpellInAttack | №0778 |
| castWish | №0778 |
| cat | №0060 (+ 21 других файлов) |
| cataclysm | №0843 |
| cataclysmicStrike | №0778 |
| catalog | №0627 (+ 27 других файлов) |
| catalogKey | №0818 (+ 2 других файлов) |
| catalyst | №0079 |
| catalystId | №0079 |
| catalystReagent | №0825 |
| catalysts | №0078 |
| catEarSize | №0065 (+ 2 других файлов) |
| categories | №0801 |
| category | №0073 (+ 50 других файлов) |
| catMuzzleSize | №0065 (+ 3 других файлов) |
| caucasian | №1124 |
| cauldron | №0066 (+ 1 других файлов) |
| causal | №0827 |
| ceilingCollision | №0817 |
| celerity | №0640 |
| Celerity | №0778 |
| celestial | №0062 (+ 14 других файлов) |
| celestialDiscourse | №0778 |
| celestialStance | №0778 |
| cell | №0070 (+ 1 других файлов) |
| cellFt | №0860 (+ 20 других файлов) |
| cellPx | №1220 |
| cellSize | №1127 |
| censurePeacemaker | №0778 |
| centaur | №1292 |
| centaurIndices | №0060 |
| centaurSize | №0065 (+ 2 других файлов) |
| center | №0060 (+ 14 других файлов) |
| centerY | №0057 |
| ceramic | №0667 (+ 2 других файлов) |
| cha | №0623 (+ 52 других файлов) |
| chaChecksAdvantage | №0778 |
| chaChecksDisadvantage | №0640 (+ 1 других файлов) |
| chain | №0077 |
| chainReport | №0666 |
| chair | №0066 |
| championCalls | №0734 |
| chance | №0773 (+ 3 других файлов) |
| chandelier | №0066 |
| changedVertices | №1123 |
| changeShape | №0812 |
| channel | №0809 (+ 3 других файлов) |
| channelDivinity | №0647 (+ 3 других файлов) |
| channels | №0067 |
| chant | №0827 |
| character | №0805 (+ 6 других файлов) |
| characterId | №0065 (+ 33 других файлов) |
| characterName | №1217 |
| characters | №0652 (+ 2 других файлов) |
| charcoal | №0667 (+ 3 других файлов) |
| charcoalFine | №0672 |
| charge | №0778 |
| chargeOnDeflect | №0077 |
| charges | №0647 (+ 2 других файлов) |
| chargesMax | №0647 |
| chargesSpent | №0077 (+ 1 других файлов) |
| chargeTempHP | №0778 |
| chargeWeapon | №0077 |
| charisma | №0785 (+ 10 других файлов) |
| charismaChecksAdvantage | №0640 |
| charismaReferencesUse | №0778 |
| charmed | №0817 (+ 2 других файлов) |
| charmedHours | №0778 |
| charmEffect | №0654 |
| charmOrCompel | №0778 |
| charmSourceId | №0817 |
| charnelHitThreshold | №0808 |
| charnelTouch | №0808 |
| charnelTouchMax | №0808 |
| charnelTouchSpendMax | №0808 |
| chaSave | №0778 |
| chaSavesDisadvantage | №0640 (+ 1 других файлов) |
| cheapShot | №0778 |
| check | №0778 (+ 2 других файлов) |
| checkAndStage | №0841 |
| checkBonus | №0669 (+ 1 других файлов) |
| checkBonusAll | №0671 |
| checked | №1143 (+ 2 других файлов) |
| checkMageTrack | №0817 |
| checkModifiers | №0077 (+ 6 других файлов) |
| checkResult | №1170 |
| checks | №0778 (+ 1 других файлов) |
| cheekbones | №0062 (+ 1 других файлов) |
| chef | №0671 |
| chest | №0058 (+ 6 других файлов) |
| chestShape | №1081 |
| Chieftain | №0794 |
| childAppearance | №0817 |
| childList | №0791 (+ 5 других файлов) |
| children | №1084 (+ 2 других файлов) |
| chinLength | №0062 (+ 1 других файлов) |
| chitin | №0825 |
| chitinPlate | №0666 (+ 1 других файлов) |
| choice | №0810 (+ 4 других файлов) |
| choiceMode | №0820 |
| choices | №0640 (+ 3 других файлов) |
| choiceSaved | №0870 (+ 1 других файлов) |
| choose | №0674 (+ 23 других файлов) |
| chooseAnyAilments | №0778 |
| chooseBeforeRoll | №0778 |
| chooseBond | №0685 |
| chooseCompanion | №0685 |
| chooseCraft | №0778 |
| chooseGrandHex | №0778 |
| chooseHex | №0778 |
| chooseKnown | №0640 |
| chooseMovement | №0077 |
| chooseResistance | №0077 |
| chooseSavingThrowProficiency | №0778 |
| chooseSpecialization | №0669 |
| chosenCreatureId | №0076 (+ 1 других файлов) |
| cinzel | №0831 |
| circumcised | №0058 |
| cl | №0072 |
| claimReward | №0817 |
| claimWagerReward | №0820 |
| clairvoyance | №0775 |
| clandestineSource | №0778 |
| class | №0623 (+ 3 других файлов) |
| CLASS | №0640 |
| CLASS_NAMES | №0647 |
| classAbilities | №0778 |
| classBonus | №0654 (+ 1 других файлов) |
| classes | №0785 (+ 47 других файлов) |
| CLASSES_REFERENCE | №1258 |
| classFeatureIds | №0810 (+ 5 других файлов) |
| classFeatureNotes | №0654 (+ 1 других файлов) |
| classFeaturesState | №0077 (+ 21 других файлов) |
| classKey | №0826 |
| classLevel | №0826 |
| classList | №1120 |
| className | №0623 (+ 56 других файлов) |
| clawColor | №0065 |
| clawSize | №0065 (+ 2 других файлов) |
| clay | №0667 (+ 2 других файлов) |
| cleanHead | №0065 |
| cleansed | №0817 |
| cleansingTouch | №0647 |
| clear | №0068 (+ 6 других файлов) |
| clearTimeout | №0662 (+ 5 других файлов) |
| cleric | №0797 (+ 1 других файлов) |
| clientId | №0809 (+ 5 других файлов) |
| clientX | №0862 (+ 1 других файлов) |
| clientY | №0862 (+ 1 других файлов) |
| climb | №0808 |
| climbSpeed | №0077 (+ 1 других файлов) |
| clingingCurse | №0778 |
| clone | №0070 (+ 1 других файлов) |
| close | №0062 (+ 9 других файлов) |
| closed | №0788 |
| closedChains | №0666 |
| closeReplay | №0846 |
| closet | №0066 |
| cloth | №0666 (+ 4 других файлов) |
| clothes | №1306 |
| clothing | №0061 (+ 18 других файлов) |
| clothingBuilds | №0062 |
| clothingId | №0061 |
| clothingTriangles | №0062 |
| cloudId | №0652 |
| cloudScope | №0059 |
| cls | №0647 |
| club | №1167 |
| coast | №0798 (+ 1 других файлов) |
| coast_caves | №0877 |
| coast_cliffs | №0877 |
| coast_grotto | №0877 |
| cobbler | №0669 (+ 3 других файлов) |
| code | №1110 |
| coinLog | №1771 |
| coins | №1176 (+ 4 других файлов) |
| col | №0072 (+ 1 других файлов) |
| cold | №0640 (+ 2 других файлов) |
| Cold | №0079 |
| collar | №0061 |
| collect | №0805 (+ 3 других файлов) |
| collectiveBody | №0838 |
| collectLoot | №0782 |
| color | №0058 (+ 9 других файлов) |
| colors | №0072 (+ 2 других файлов) |
| cols | №0077 (+ 21 других файлов) |
| column | №0850 |
| combat | №0847 (+ 1 других файлов) |
| combatant | №0655 |
| combatantId | №0782 (+ 2 других файлов) |
| combatants | №0077 (+ 51 других файлов) |
| combatEnd | №0817 |
| combatHooks | №0706 |
| combatInsight | №0812 |
| combatInspiration | №0647 |
| combatLog | №0864 |
| combatMasteries | №0697 |
| combatMastery | №0697 (+ 1 других файлов) |
| combatOnly | №0817 |
| combatTurnGate | №0685 |
| combineDisciplines | №0778 |
| combustion | №0778 |
| command | №0655 (+ 3 других файлов) |
| commandable | №0778 |
| Commander | №0794 |
| commandFamiliarAndUndeadTogether | №0778 |
| commandRangeMultiplier | №0775 |
| commands | №0778 |
| commandSpellsWithoutSlot | №0808 |
| commandWithoutFear | №0775 |
| commit | №1266 (+ 1 других файлов) |
| commitHostEvent | №1163 (+ 7 других файлов) |
| committed | №0664 |
| common | №0792 (+ 5 других файлов) |
| commonPeopleBonus | №0778 |
| companion | №0077 (+ 4 других файлов) |
| companionACBonus | №0685 |
| companionAction | №0775 |
| companionActor | №0685 |
| companionAttack | №0775 |
| companionDamage | №0775 |
| companionExtraAttack | №0775 |
| companionMagicAttacks | №0775 |
| companionRampage | №0775 |
| companionResistance | №0685 |
| companions | №0685 |
| companionType | №0077 (+ 2 других файлов) |
| compareVersions | №0841 |
| compatibility | №0841 |
| completeAttack | №0834 |
| components | №0067 (+ 14 других файлов) |
| componentType | №1118 (+ 3 других файлов) |
| compositeTerms | №1316 |
| compositions | №1266 |
| compressionLock | №0778 |
| con | №0623 (+ 55 других файлов) |
| concealPsionics | №0778 |
| concentration | №0654 (+ 31 других файлов) |
| concentrationCheck | №0654 |
| concentrationDC | №0826 |
| concentrationSaveBonus | №0778 |
| concentrationState | №0654 |
| concussion | №0077 |
| concussionBomb | №0778 |
| condition | №0077 (+ 11 других файлов) |
| conditionApplied | №0778 |
| conditionChoice | №0685 |
| conditionImmune | №0640 |
| conditionImmunity | №0778 |
| conditionLabel | №0663 |
| conditionModeApplied | №0654 |
| conditionModifiers | №0826 (+ 2 других файлов) |
| conditionNotes | №1157 |
| conditionRemoved | №0870 |
| conditions | №0654 (+ 17 других файлов) |
| CONDITIONS | №0654 (+ 2 других файлов) |
| conditionsImmune | №0657 |
| coneWisdomSave | №0778 |
| config | №0849 |
| configurable | №0817 |
| configure | №0652 |
| configured | №0652 (+ 1 других файлов) |
| confirm | №1080 (+ 3 других файлов) |
| conflict | №0078 (+ 1 других файлов) |
| conflicts | №0652 |
| connected | №0809 (+ 2 других файлов) |
| conSave | №0778 |
| conscious | №0817 |
| console | №1120 |
| constant | №0654 (+ 7 других файлов) |
| constitution | №0785 (+ 12 других файлов) |
| Constitution | №0079 |
| constitutionHalfDamageFailure | №0778 |
| constitutionHalfDamageSuccess | №0778 |
| constitutionMaxBonus | №0778 |
| construct | №0627 (+ 12 других файлов) |
| constructBody | №0808 |
| constructConcentration | №0778 |
| constructDamageBonus | №0778 |
| constructMode | №0778 |
| consumableFunctional | №1174 |
| consumables | №0792 (+ 32 других файлов) |
| consume | №0671 (+ 1 других файлов) |
| consumed | №0671 (+ 2 других файлов) |
| consumedPotion | №0077 |
| consumeLairAction | №0804 |
| consumeLegendaryAction | №0804 |
| consumeLegendaryResistance | №0804 |
| consumeMageBerry | №0817 |
| consumeMagicMeleeWeapon | №0778 |
| consumeMaximum | №0817 |
| consumeOn | №0817 |
| consumePendingOnHit | №0647 (+ 1 других файлов) |
| consuming | №0713 (+ 1 других файлов) |
| Consuming | №0794 |
| consumption | №0778 |
| container | №0788 |
| containerId | №1145 |
| containerRequired | №0778 |
| containers | №0805 (+ 6 других файлов) |
| containerType | №0788 |
| content | №0070 (+ 1 других файлов) |
| contentPackId | №0077 (+ 6 других файлов) |
| contents | №0788 (+ 6 других файлов) |
| contentType | №1282 |
| context | №0654 (+ 1 других файлов) |
| contextIsolation | №0885 |
| contextRestore | №1279 |
| contingencyPlan | №0778 |
| contracts | №0697 |
| controlMode | №0077 (+ 5 других файлов) |
| controlWithoutAction | №0778 |
| controlWithSameAction | №0778 |
| conversant | №0640 |
| Conversant | №0778 |
| convertDamage | №0812 |
| cook | №0669 (+ 4 других файлов) |
| coordinatedAssault | №0778 |
| copper | №0672 |
| copy | №0657 |
| copyDeleted | №0652 |
| core | №0794 |
| CORE | №0647 |
| core_2014 | №0627 |
| coreLoop | №0706 |
| corpseFlorist | №0808 |
| corpseId | №0808 |
| corpseTypes | №0778 |
| corrosion | №0640 (+ 1 других файлов) |
| corset | №1091 |
| cost | №0077 (+ 36 других файлов) |
| costGp | №0798 (+ 4 других файлов) |
| costs | №0623 (+ 1 других файлов) |
| cot | №0066 |
| cotton | №0061 (+ 1 других файлов) |
| counselorProtege | №0778 |
| count | №0060 (+ 65 других файлов) |
| counter | №0066 |
| counterAttackIfReducedToZero | №0778 |
| countercharm | №0647 |
| countered | №0810 |
| countsAsHit | №0778 |
| courageSource | №0654 |
| coven | №0812 |
| covens | №0706 |
| cover | №0810 (+ 6 других файлов) |
| coverBonus | №0810 (+ 1 других файлов) |
| covered | №0058 |
| coversTop | №0061 |
| cp | №0789 (+ 8 других файлов) |
| cPerS | №1771 |
| cr | №0627 (+ 18 других файлов) |
| craft | №0778 (+ 4 других файлов) |
| craftBonus | №0807 |
| craftCheck | №0670 (+ 1 других файлов) |
| craftDC | №0670 (+ 1 других файлов) |
| crafted | №0079 (+ 5 других файлов) |
| craftedOnly | №0792 |
| craftEffect | №0670 |
| craftFeature | №0778 |
| craftingBonus | №0662 (+ 3 других файлов) |
| craftingMaterial | №0663 |
| craftingProfessions | №0668 (+ 2 других файлов) |
| craftingProfile | №0671 |
| craftingSources | №0671 |
| craftMasterworkBonus | №0664 (+ 2 других файлов) |
| craftMaterialId | №0627 (+ 14 других файлов) |
| craftOutcome | №0671 (+ 1 других файлов) |
| craftProfession | №0670 (+ 1 других файлов) |
| craftQuality | №0664 (+ 6 других файлов) |
| craftQualityLabel | №0673 |
| craftRecipe | №0667 (+ 3 других файлов) |
| craftRoll | №0673 |
| CRAFTS | №0778 |
| craftTags | №0666 |
| craftTime | №0667 (+ 2 других файлов) |
| craftTools | №0667 |
| craftValue | №0670 (+ 1 других файлов) |
| craftValueNote | №0664 |
| crate | №0066 |
| create | №0075 (+ 7 других файлов) |
| createAvatar | №0838 |
| createBodyStatBlock | №0868 |
| createBoneObject | №0778 |
| createCharacter | №0065 |
| created | №0778 (+ 1 других файлов) |
| createdAt | №0070 (+ 8 других файлов) |
| createdAtTurn | №0077 |
| createElement | №1080 (+ 23 других файлов) |
| createFor | №0656 (+ 2 других файлов) |
| createHostStatBlock | №0815 |
| createLarvaStatBlock | №0815 |
| createObjectURL | №1220 |
| createOozeDuplicate | №0077 |
| createProjectedItem | №0778 |
| createRoom | №1217 |
| createShell | №0783 |
| creationOptions | №0817 |
| creator | №0794 |
| creatorMind | №0778 |
| creatures | №0838 |
| creatureType | №0645 (+ 12 других файлов) |
| crescendoOfViolence | №0778 |
| crest | №0060 |
| crestSize | №0065 (+ 1 других файлов) |
| crewLeader | №0778 |
| crewRangeFt | №0778 |
| crewSaveBonus | №0778 |
| crewSize | №0778 |
| crewSupport | №0775 |
| criminalContact | №0778 |
| crimson | №0831 |
| crimsonRite | №0640 |
| crimsonRites | №0687 |
| cripplingJinx | №0778 |
| cripplingStrike | №0778 |
| critFearAoEFt | №0640 |
| critical | №0654 (+ 35 других файлов) |
| critical_failure | №0663 (+ 1 других файлов) |
| criticalDoubles | №0778 (+ 1 других файлов) |
| criticalHit | №0778 |
| criticalOn | №0775 |
| criticalOnHit | №0778 |
| criticalRange | №0647 (+ 2 других файлов) |
| criticalSpellcasting | №0808 |
| critRange | №0640 |
| critWithRiteRestoresBloodMaledict | №0778 |
| crLimit | №0778 |
| crone | №0808 |
| crop | №0060 |
| crow | №0060 |
| crown | №0060 (+ 1 других файлов) |
| crown_braid | №0060 (+ 1 других файлов) |
| crownColor | №0065 (+ 1 других файлов) |
| crownSize | №0065 (+ 3 других файлов) |
| crScale | №0077 |
| crTotal | №0808 |
| cruelty | №0640 |
| Cruelty | №0778 |
| cryo | №0077 |
| cryoBomb | №0778 |
| crypto | №1085 (+ 25 других файлов) |
| crystal | №0667 (+ 3 других файлов) |
| cssText | №1140 |
| ctx | №0072 (+ 1 других файлов) |
| cube | №0685 |
| cunningAction | №0647 |
| cunningInstinct | №0778 |
| cupNumber | №0817 (+ 3 других файлов) |
| cups | №0061 (+ 2 других файлов) |
| cups_05 | №0817 |
| cups_13 | №0817 |
| cupsize | №1124 |
| curl | №0060 |
| curly_long | №0060 (+ 1 других файлов) |
| curly_short | №0060 (+ 1 других файлов) |
| current | №0070 (+ 34 других файлов) |
| currentCampaignId | №0641 |
| currentChar | №1171 (+ 5 других файлов) |
| currentCharacter | №1190 |
| currentFloor | №0070 |
| currentHP | №0783 (+ 3 других файлов) |
| currentId | №0846 |
| currentLevel | №0669 |
| currentVersion | №0841 |
| curse | №0076 (+ 10 других файлов) |
| curseAbility | №0076 |
| curseAbilityCheckDC | №0778 |
| curseBonusDamage | №0640 |
| curseCombination | №0778 |
| curseConcentrationAdvantage | №0812 |
| cursed | №0062 (+ 1 других файлов) |
| cursedAttackPenalty | №0640 |
| cursedCheckModifiers | №0640 |
| curseDetection30 | №0778 |
| cursedSaveModifiers | №0640 |
| curseImmunity | №0778 |
| curseItem | №0812 |
| curseMastery | №0775 |
| curseName | №0778 |
| cursePenalty | №0808 |
| cursePower | №0775 |
| curses | №0640 (+ 4 других файлов) |
| CURSES | №0778 |
| curseSave | №0808 |
| curseSpecialist | №0640 |
| curseSpells | №0778 |
| curseTarget | №0778 |
| custom | №0065 (+ 2 других файлов) |
| customColor | №0060 (+ 2 других файлов) |
| customCrafted | №0673 |
| customDress | №0061 |
| CustomEvent | №1120 (+ 1 других файлов) |
| customizations | №1089 (+ 1 других файлов) |
| customShirt | №0061 |
| customSkirt | №0061 |
| cut | №0061 (+ 2 других файлов) |
| cutoff | №1316 |
| cwd | №1077 (+ 3 других файлов) |
| cx | №0057 (+ 2 других файлов) |
| cycles | №0824 (+ 1 других файлов) |
| cz | №0060 (+ 1 других файлов) |
| d | №0057 (+ 6 других файлов) |
| d2 | №1126 (+ 2 других файлов) |
| d20 | №0654 (+ 2 других файлов) |
| d20Modifiers | №0817 |
| d6 | №0077 |
| damage | №0073 (+ 89 других файлов) |
| DAMAGE_TYPES | №0654 |
| damageAfter | №0778 |
| damageAtTurnStart | №0077 |
| damageBefore | №0778 |
| damageBody | №0815 (+ 1 других файлов) |
| damageBonus | №0778 (+ 1 других файлов) |
| damageBonusMultiplier | №0778 |
| damageBoost | №0775 |
| damageContext | №0810 |
| damageDice | №0077 (+ 14 других файлов) |
| damageDie | №0775 (+ 1 других файлов) |
| damageDoubled | №0654 |
| damageDurability | №0665 |
| damageImmunity | №0778 |
| damageModifiers | №0640 (+ 1 других файлов) |
| damageMult | №0838 |
| damageOnFailedSave | №0778 |
| damageParts | №0640 (+ 6 других файлов) |
| damagePer10Ft | №0778 |
| damagePerTrigger | №0778 |
| damageRedirect | №0812 |
| damageReduction | №0647 (+ 4 других файлов) |
| damageResistance | №0775 (+ 1 других файлов) |
| damageResult | №0654 (+ 1 других файлов) |
| damageRoll | №0077 (+ 4 других файлов) |
| damageRolled | №0817 |
| damageSelf | №0778 |
| damageShell | №0783 |
| damageTaken | №0654 |
| damageType | №0077 (+ 84 других файлов) |
| damageTypeChoice | №0778 |
| damageTypes | №0077 (+ 5 других файлов) |
| danceBonusByCount | №0808 |
| dangerSense | №0647 |
| daringRescue | №0778 |
| dark | №0867 |
| darkArcana | №0808 |
| darkAugmentation | №0640 |
| darkCaptain | №0778 |
| darkDelirium | №0810 |
| darkMagic | №0775 |
| darkness | №0070 (+ 1 других файлов) |
| darknessAroundInterdictedFt | №0778 |
| darkOneDiscourse | №0778 |
| darkOnesBlessing | №0647 |
| darkvision | №0832 |
| darkvision60 | №0778 |
| darkvisionBonusFt | №0640 |
| darkvisionFt | №0640 (+ 1 других файлов) |
| dash | №0775 |
| dashMageRetreat | №0817 |
| dastardlyTalents | №0778 |
| data | №0076 (+ 10 других файлов) |
| dataset | №1105 |
| date | №0641 (+ 1 других файлов) |
| dauntless | №0738 |
| dawn | №0640 |
| day | №0072 |
| dc | №0076 (+ 45 других файлов) |
| dcReduction | №0671 |
| dead | №0077 (+ 6 других файлов) |
| deadMistAcolyte | №0808 |
| deadShell | №0783 |
| deadSpace | №0778 (+ 1 других файлов) |
| deadSpaceSlots | №0808 |
| deafened | №0077 (+ 1 других файлов) |
| deathAfterDuration | №0778 |
| deathCause | №1079 |
| deathExplosion | №0808 |
| deathKnight | №0808 |
| deathPenalty | №0778 |
| deathSave | №0654 |
| deathSaveDisadvantage | №0640 (+ 1 других файлов) |
| deathSaveFailures | №0654 |
| deathSaves | №0654 (+ 6 других файлов) |
| deathWard | №0812 |
| debug | №0847 |
| decayPerHour | №0077 |
| deception | №0771 (+ 1 других файлов) |
| deceptionBlocked | №0817 |
| deceptionIntent | №1158 |
| deceptionTotal | №0077 (+ 1 других файлов) |
| deck | №0820 (+ 1 других файлов) |
| decks | №0820 |
| declaredSourceCommit | №1316 |
| decorateItem | №0669 |
| deepSleeper | №0778 |
| deerHide | №0672 |
| default | №0065 (+ 2 других файлов) |
| DEFAULT | №0070 |
| DEFAULT_ENABLED | №0665 |
| DEFAULT_RACES | №1258 |
| defaultEnabled | №1112 |
| defaultSkinByGender | №0065 |
| defaultSkinId | №0065 |
| defeat | №0837 |
| defeated | №0077 (+ 9 других файлов) |
| defenderAura | №0775 |
| defenderReaction | №0654 (+ 4 других файлов) |
| defensive_duelist | №0781 |
| defensiveStance | №0778 |
| deferDamage | №0810 (+ 1 других файлов) |
| definition | №0817 |
| definitions | №0817 |
| deflected | №0654 |
| deflectMissiles | №0647 |
| deformAsset | №0067 |
| deformedPositions | №1102 |
| deftness | №0640 |
| Deftness | №0778 |
| deinonychus | №0685 |
| deleted | №0652 (+ 1 других файлов) |
| denial | №0778 |
| deniesActions | №0077 |
| denominator | №0820 |
| density | №0058 (+ 2 других файлов) |
| denValues | №0061 |
| denyAttackAdvantage | №0778 |
| denyBonusActions | №0077 |
| denyDashDisengageDodge | №0077 |
| depleted | №1172 |
| depth | №0060 (+ 4 других файлов) |
| desc | №0623 (+ 13 других файлов) |
| describeProfession | №0669 |
| description | №0070 (+ 70 других файлов) |
| descriptor | №0058 |
| deserialize | №0065 |
| desk | №0066 |
| destination | №0817 (+ 8 других файлов) |
| destinationGender | №1316 |
| destroy | №0842 |
| destroyThrallToHeal | №0808 |
| destroyUndead | №0647 |
| detail | №0065 (+ 3 других файлов) |
| details | №0783 (+ 3 других файлов) |
| detectIllusionAndShapeshifter | №0778 |
| detectMagic | №0778 (+ 1 других файлов) |
| dethek | №0778 (+ 1 других файлов) |
| dethekStance | №0778 |
| devicePixelRatio | №1080 (+ 1 других файлов) |
| devices | №0669 |
| deviceScaleFactor | №1294 |
| devilDamageMaximum | №0817 |
| devilPlan | №0817 |
| deviousTactics | №0778 |
| devouring | №0778 (+ 1 других файлов) |
| devTools | №0885 |
| dex | №0623 (+ 56 других файлов) |
| dexBonus | №0640 |
| dexChecksAdvantage | №0640 (+ 1 других файлов) |
| dexIncrease | №0778 |
| dexMaxBonus | №0640 |
| dexMaxIncrease | №0778 |
| dexSave | №0778 |
| dexSavesDisadvantage | №0640 (+ 1 других файлов) |
| dexSaveVisible | №0654 (+ 1 других файлов) |
| dexterity | №0785 (+ 10 других файлов) |
| Dexterity | №0079 |
| dexteritySaveProficiency | №0778 |
| diagnostics | №0062 (+ 1 других файлов) |
| diagonal | №0819 |
| dialect | №0778 (+ 1 других файлов) |
| diamondForm | №0778 |
| diamondPaste | №0672 |
| diamondSoul | №0647 |
| dice | №0076 (+ 9 других файлов) |
| diceCount | №0646 (+ 3 других файлов) |
| diceSides | №0646 (+ 3 других файлов) |
| die | №0080 (+ 6 других файлов) |
| diet | №0627 (+ 12 других файлов) |
| difficultTerrain | №1212 |
| difficulty | №0804 |
| digDeep | №0715 (+ 1 других файлов) |
| digits | №0060 |
| diminutive | №0832 (+ 1 других файлов) |
| dimLightAdditionalFt | №0778 |
| direct | №0817 (+ 2 других файлов) |
| directAttackNearestIfFailed | №0778 |
| directDice | №0077 |
| direction | №0072 (+ 6 других файлов) |
| directionSense | №0778 |
| directShift | №0832 |
| dirty | №0652 |
| dirtyHit | №0778 |
| dirtyStrike | №0775 |
| disabled | №0663 (+ 2 других файлов) |
| disabledBlocked | №1112 |
| disableSense | №0778 |
| disadvantage | №0077 (+ 10 других файлов) |
| disadvantageAgainstOthers | №0778 |
| disadvantageAgainstOthersWithinFt | №0778 |
| disadvantageAgainstSelf | №0778 |
| disadvantageAttacksExceptSelfUntilEndNextTurn | №0778 |
| disadvantageFirstSaveAgainstSpell | №0778 |
| disadvantageInDimLight | №0778 |
| disadvantageNextAttack | №0778 |
| disadvantageOnSaveWhenHidden | №0778 |
| disadvantageSaves | №0778 |
| disadvantageVsBloodHunterSpells | №0778 |
| disarm | №0775 (+ 1 других файлов) |
| disassembleItem | №0663 (+ 1 других файлов) |
| discard | №0820 |
| disciplinaryAdept | №0778 |
| discipline | №0713 (+ 4 других файлов) |
| disciplines | №0713 (+ 2 других файлов) |
| disciplineUsesPerTurn | №0713 |
| discovered | №0078 (+ 1 других файлов) |
| discoveries | №0077 (+ 3 других файлов) |
| discovery | №0077 (+ 1 других файлов) |
| discoveryBonus | №0080 |
| discoveryLevelGating | №0676 |
| discoveryRecipes | №0077 |
| disengageOnHit | №0775 |
| disguise | №0671 |
| disguiseAndHexFocus | №0812 |
| disguiseAppearance | №0077 |
| disguiser | №0669 (+ 1 других файлов) |
| dismissMageArmor | №0817 |
| disoriented | №0778 |
| disorientedDice | №0778 |
| dispellingAnathema | №0778 |
| display | №0798 (+ 1 других файлов) |
| displayName | №0644 (+ 3 других файлов) |
| dispose | №0072 |
| dist | №0810 |
| distance | №0655 (+ 2 других файлов) |
| distanceFt | №0640 (+ 18 других файлов) |
| distant | №0647 |
| divineChannelUses | №0808 |
| divineIntervention | №0647 |
| divineMandate | №0778 |
| divineRespite | №0802 |
| divineSense | №0647 |
| divineSmite | №0647 (+ 2 других файлов) |
| dlc | №0665 |
| DND_CLASSES_LIST | №1258 |
| DND_UPDATE_MANIFEST_URL | №1257 |
| dndBackgrounds | №1258 |
| DNDBattleBoard | №1191 |
| DNDCampaign | №1190 (+ 1 других файлов) |
| DNDCloudConfig | №1110 |
| DNDCombat | №1190 (+ 1 других файлов) |
| DNDContent | №1078 (+ 2 других файлов) |
| DNDGameplayV57 | №1191 |
| DNDGLTF | №1080 |
| DndLanBridge | №1217 |
| DNDMonsterLoot | №1190 |
| dndMorphChannels | №1080 (+ 1 других файлов) |
| dndMorphSource | №1268 |
| dndNetwork | №1190 (+ 1 других файлов) |
| DNDRules | №1252 |
| DNDSummoning | №1190 |
| dock | №0069 |
| document | №1078 (+ 39 других файлов) |
| documentElement | №1120 |
| dodge | №0778 |
| dogAndHound | №0715 |
| dominantCharacteristics | №0868 |
| donorHitDieSpent | №0812 |
| donorType | №0077 (+ 1 других файлов) |
| donorVerified | №1079 |
| door | №0066 |
| doubleBreath | №0778 |
| doubleFoodSleepInterval | №0778 |
| doubleProficiency | №0778 |
| doubleSided | №0068 |
| doubleSpeed | №0808 |
| doublingJinx | №0778 |
| downButNotOut | №0715 (+ 1 других файлов) |
| downButNotOutActive | №0778 |
| downstreamRecipeAvailable | №0662 |
| draconicDiscourse | №0778 |
| draconicElement | №1229 |
| draconicResilience | №0647 |
| draconicStance | №0778 |
| draft | №0860 |
| dragging | №0625 |
| dragon | №0060 (+ 17 других файлов) |
| dragon_fear | №0781 |
| dragonArmyAffinity | №0630 |
| dragonFamily | №1185 |
| dragonlance | №0630 |
| dragonReagent | №0666 (+ 1 других файлов) |
| dragonsAscent | №0778 |
| dragonScale | №0666 (+ 1 других файлов) |
| dragonScaleRed | №0672 |
| draw | №0071 (+ 2 других файлов) |
| draws | №1080 |
| dreadfulGlare | №0778 |
| dreadlord | №0778 |
| dreadPresence | №0778 |
| dress | №0061 (+ 1 других файлов) |
| dressSleeves | №0061 |
| driedHerbBundle | №0671 |
| driedMeat | №0671 (+ 1 других файлов) |
| dropObject | №0778 |
| dropToOneHP | №0685 |
| Drowned | №0778 |
| druid | №0797 (+ 1 других файлов) |
| druidic | №0647 |
| dryRun | №0662 (+ 6 других файлов) |
| duplicate | №0851 |
| duplicateOnPhaseRift | №0778 |
| duplicateTargetCollisions | №1132 |
| dur | №0666 |
| durability | №0664 (+ 4 других файлов) |
| durabilityBonus | №0668 |
| durabilityMax | №1111 (+ 1 других файлов) |
| durabilityMultiplier | №0664 (+ 2 других файлов) |
| duration | №0067 (+ 21 других файлов) |
| durationHours | №0640 (+ 2 других файлов) |
| durationMinutes | №0077 (+ 6 других файлов) |
| durationRounds | №0076 (+ 4 других файлов) |
| durationRule | №0832 |
| durationSeconds | №0817 (+ 1 других файлов) |
| durationTurns | №0808 |
| durationUnit | №0656 (+ 1 других файлов) |
| durationUntilSave | №0808 |
| durationUntilStartOfTurn | №0778 |
| duringShortRest | №1079 |
| dusk | №0072 |
| dwarf | №0662 |
| dwarf_hill | №0671 |
| dwarf_mountain | №0671 |
| dwarven_fortitude | №0781 |
| dwarvishDiscourse | №0778 |
| dyingCurse | №0778 |
| dynamic | №0060 |
| e | №0073 (+ 1 других файлов) |
| earField | №0060 |
| earFrame | №0061 |
| earLength | №0065 (+ 6 других файлов) |
| earPointiness | №0065 (+ 6 других файлов) |
| earth | №0685 |
| Earth | №0079 |
| earthCore | №0825 |
| earthEssence | №0825 |
| earTuftSize | №0065 (+ 2 других файлов) |
| ecology | №0627 (+ 12 других файлов) |
| ectoplasm | №0666 (+ 1 других файлов) |
| edition | №0076 (+ 23 других файлов) |
| effect | №0077 (+ 20 других файлов) |
| effectiveD20 | №0654 |
| effectiveDamage | №0654 |
| effectiveMaxHp | №0826 |
| effectiveMode | №1157 |
| effectiveStats | №0815 |
| effectKey | №0815 |
| effects | №0079 (+ 5 других файлов) |
| elasticHide | №0825 |
| Elderheart | №0794 |
| eldritchBane | №0778 |
| eldritchCannon | №0647 |
| eldritchInvocations | №0647 |
| eldritchMaster | №0647 |
| electricCharge | №0778 |
| elemental | №0062 (+ 14 других файлов) |
| Elemental | №0794 |
| elementalAsh | №0666 (+ 1 других файлов) |
| elementalBlast | №0778 |
| elementalPower | №0778 |
| elephant | №0060 |
| elephantEarSize | №0065 (+ 1 других файлов) |
| elephantTuskSize | №0065 (+ 1 других файлов) |
| elevationFt | №0817 |
| elf_wood | №0671 |
| elfcity | №0062 |
| eligible | №1169 |
| elixirs | №0669 |
| eloquentSpeech | №0778 |
| elven_accuracy | №0781 |
| email | №0652 (+ 1 других файлов) |
| emanationFt | №0778 |
| embers | №0640 |
| Embers | №0778 |
| emerald | №0867 |
| emergencyReanimate | №0868 |
| emissaryPhaseHooks | №1178 |
| empowered | №0647 (+ 1 других файлов) |
| empty | №0818 |
| enableApply | №0842 |
| enabled | №0058 (+ 6 других файлов) |
| enchant | №0669 |
| enclosed | №0058 |
| encoding | №0888 (+ 7 других файлов) |
| encounter | №0859 (+ 1 других файлов) |
| encounterBias | №0631 |
| encounterId | №0817 (+ 2 других файлов) |
| end | №0060 (+ 2 других файлов) |
| endActorTurn | №0640 |
| endAllRites | №0778 |
| endCondition | №0778 |
| endConditions | №0778 |
| endedByZeroHp | №0654 |
| endEffectPsi | №0778 |
| endEncounter | №0685 |
| endExternalPetrificationAfter | №0778 |
| endIllusion | №0778 |
| endInvisibility | №0778 |
| endPossession | №0783 |
| endRampage | №0685 |
| ends | №0843 |
| endsAt | №0778 |
| endsOnAttack | №0077 (+ 1 других файлов) |
| endsOnAttackOrSpell | №0778 |
| endsOnDamage | №0077 |
| endsOnHostile | №0817 |
| endsOnMagicHealing | №0685 |
| endsOnMove | №0778 |
| endsOnRemoveCurse | №0778 |
| endSpellConcentration | №0817 |
| endsWhen | №0778 |
| endTurn | №0782 (+ 3 других файлов) |
| enemiesFrightened | №0778 |
| enemy | №1137 (+ 6 других файлов) |
| enemyDistanceFt | №1170 |
| enemyRead | №0775 |
| enervatingJinx | №0778 |
| enervatingSpell | №0778 |
| eng | №0744 |
| engines | №0847 (+ 1 других файлов) |
| englishName | №0076 (+ 29 других файлов) |
| enhancement | №0778 |
| enhancingSurge | №0778 |
| enlightened | №0778 |
| enliveningOrder | №0778 |
| enshroudingImprecation | №0778 |
| ensure | №0783 (+ 8 других файлов) |
| ensureCharacterProfessions | №0669 |
| ensureMaterial | №0666 |
| ensureResourceState | №0804 |
| ensureTracker | №0782 (+ 1 других файлов) |
| enterSpiritForm | №0783 |
| entities | №0077 (+ 2 других файлов) |
| entity | №0077 (+ 4 других файлов) |
| entityId | №0077 (+ 4 других файлов) |
| entries | №0652 (+ 1 других файлов) |
| entryRoute | №0868 |
| enumerable | №0817 |
| env | №1077 |
| ep | №0789 (+ 6 других файлов) |
| equip | №0065 |
| equipment | №0065 (+ 6 других файлов) |
| equipmentId | №0065 |
| equipMilitia | №0778 |
| equipped | №0073 (+ 6 других файлов) |
| equippedArmor | №1112 |
| error | №0062 (+ 33 других файлов) |
| error_code | №1110 |
| errors | №0660 (+ 1 других файлов) |
| essence | №0825 |
| eTexture | №0075 |
| ethanol | №0672 |
| ethereal | №0778 |
| evasion | №0647 (+ 3 других файлов) |
| evasionMonk | №0647 |
| event | №0817 (+ 3 других файлов) |
| eventCount | №0846 (+ 2 других файлов) |
| eventId | №0818 (+ 1 других файлов) |
| eventLog | №0861 (+ 2 других файлов) |
| eventLogBaseSeq | №1250 |
| events | №0846 (+ 5 других файлов) |
| eventSeq | №0809 (+ 5 других файлов) |
| exact | №1282 |
| exaltedLeader | №0738 |
| exaltedMutation | №0640 |
| exaltedProtege | №0778 |
| excellent | №0807 |
| exceptional | №0663 (+ 1 других файлов) |
| exceptPsychic | №0778 |
| exclude | №0057 |
| excludeUndeadConstructs | №0817 (+ 2 других файлов) |
| executablePath | №1271 (+ 37 других файлов) |
| executeAttack | №0782 |
| executionActor | №0817 |
| exhaustion | №0778 (+ 2 других файлов) |
| exhaustionAfter | №0775 |
| exhaustionApplied | №0778 |
| exhaustionGain | №0775 |
| exhaustionOnFailedSave | №0778 |
| exit | №1115 |
| exorcist | №0640 (+ 1 других файлов) |
| exoskeletonArmor | №0778 |
| exp | №0779 |
| expand | №0659 |
| expanded | №0659 (+ 1 других файлов) |
| expected | №0853 (+ 1 других файлов) |
| expectedProcessed | №0825 |
| expectedRevision | №0792 (+ 21 других файлов) |
| expendHitDie | №0778 |
| experience | №0785 |
| experimental | №0078 (+ 1 других файлов) |
| experimentalist | №0676 |
| experiments | №0078 (+ 1 других файлов) |
| expertFocus | №0778 |
| expertise | №0778 (+ 1 других файлов) |
| expertiseSkills | №0778 |
| expired | №0077 |
| expires | №0077 (+ 3 других файлов) |
| expires_at | №0652 |
| expires_in | №1110 |
| expiresAt | №0076 (+ 3 других файлов) |
| expiresRounds | №0778 |
| exploded | №0077 |
| explodeRadiusFt | №0077 |
| explodesOncePerTurn | №0778 |
| exploit | №0685 |
| exploitDice | №0738 |
| exploitDie | №0738 (+ 1 других файлов) |
| exploits | №0738 (+ 1 других файлов) |
| exploitsKnown | №0738 |
| explosiveBane | №0778 |
| explosiveCannon | №0810 |
| exportedAt | №0846 |
| exportedMacros | №1316 |
| exportJSON | №0062 (+ 1 других файлов) |
| exportReplay | №0846 |
| exportSession | №0859 (+ 1 других файлов) |
| exposingStrike | №0778 |
| exposure | №0640 |
| expression | №0654 (+ 2 других файлов) |
| extended | №0647 |
| extendedResourceState | №0647 |
| extendedTactics | №0734 |
| extendExistingDarkvisionFt | №0640 |
| extendHex | №0775 |
| extendHexRounds | №0778 |
| external | №0058 (+ 1 других файлов) |
| externalGeometryAvailable | №0058 |
| externalGeometryReady | №0058 |
| externalGeometryStage | №0058 |
| extra | №0078 (+ 2 других файлов) |
| extraAction | №0778 (+ 1 других файлов) |
| extraActionNextTurn | №0817 |
| extraAstralConstruct | №0778 |
| extraAtk | №0646 (+ 1 других файлов) |
| extraAttack | №0640 (+ 7 других файлов) |
| extraAttackDamage | №0640 |
| extraAttacks | №0076 (+ 13 других файлов) |
| extraBloodMaledictUse | №0640 (+ 1 других файлов) |
| extraCantrips | №0812 |
| extraClassType | №0645 |
| extraCurseArmamentAttack | №0778 |
| extraCursedAttunement | №0778 |
| extraDamage | №0077 (+ 2 других файлов) |
| extraDamageByLevel | №0076 |
| extraDamageDice | №0778 |
| extraDamageDie | №0778 |
| extraDice | №0077 (+ 8 других файлов) |
| extraDieVsUndead | №0778 |
| extradimensional | №0812 |
| extraDimLight | №0778 |
| extraDimLightDie | №0778 |
| extraDiscipline | №0778 |
| extraDmg | №0646 (+ 2 других файлов) |
| extraExploitDice | №0778 |
| extraExploitKnown | №0778 |
| extraFamiliarAction | №0812 |
| extraForms | №0778 |
| extraKnowledgeSkill | №0778 |
| extraMovement | №0817 |
| extraNecrotic | №0778 |
| extrapolated | №1268 |
| extraPsiOverMax | №0778 |
| extraPsychicDice | №0778 |
| extraRadiusFt | №0077 |
| extraRampageDie | №0778 |
| extraReaction | №0817 |
| extraReactions | №0817 |
| extraRiteDie | №0778 |
| extras | №1080 (+ 1 других файлов) |
| extraSaveBonus | №0871 |
| extraSkillChoice | №0778 |
| extraSuture | №0808 |
| extraTargetPerSlotAbove1 | №0778 |
| extraTargets | №0778 |
| extraTurns | №0812 |
| extraUnarmedAfterTwoOldOneTwo | №0778 |
| extraUse | №0778 (+ 1 других файлов) |
| eye | №0060 (+ 1 других файлов) |
| eyeColor | №0065 (+ 3 других файлов) |
| eyeGlow | №0065 (+ 2 других файлов) |
| eyeHeight | №0062 (+ 2 других файлов) |
| eyeless | №0640 |
| eyeliner | №1280 |
| eyeShape | №0065 |
| eyeSize | №0065 (+ 1 других файлов) |
| eyeSpacing | №0065 (+ 1 других файлов) |
| eyeTilt | №0062 (+ 1 других файлов) |
| eyeWidth | №0062 (+ 1 других файлов) |
| f | №0060 (+ 2 других файлов) |
| faceColor | №0065 (+ 5 других файлов) |
| faceLength | №0062 (+ 1 других файлов) |
| faceShape | №0065 |
| faceTint | №0065 (+ 2 других файлов) |
| faceWidth | №0062 (+ 2 других файлов) |
| facileSuppression | №0778 |
| factionAgents | №0631 |
| factions | №0631 |
| fail | №0842 (+ 1 других файлов) |
| failChance | №0079 |
| failed | №0062 (+ 4 других файлов) |
| failedSave | №1159 |
| failNextRollDisadvantage | №0778 |
| failure | №0079 (+ 3 других файлов) |
| failures | №0654 (+ 14 других файлов) |
| fair | №0807 |
| fall | №0654 (+ 3 других файлов) |
| fallDamageReduction | №0778 |
| fallen | №0070 (+ 1 других файлов) |
| fallenAttack | №0640 |
| fallenPuppet | №0640 |
| fallingStrike | №0775 |
| familiar | №0656 (+ 2 других файлов) |
| familiarAttack | №0778 |
| familiarHpBonus | №0778 |
| familiarLink | №0812 |
| familiarSettlement | №0778 |
| familiarStealth | №0812 |
| families | №0627 (+ 24 других файлов) |
| family | №0058 (+ 3 других файлов) |
| familyByCreature | №1177 (+ 10 других файлов) |
| familyId | №0627 (+ 10 других файлов) |
| fancyFootwork | №0778 |
| fangSize | №0065 (+ 2 других файлов) |
| fastHands | №0647 |
| fastMovement | №0647 |
| fastTravel | №0778 |
| fat | №0062 (+ 1 других файлов) |
| fathomless | №0640 |
| fatigue | №0778 |
| favoredEnemy | №0647 |
| favoredServant | №0778 |
| fear | №0077 (+ 1 других файлов) |
| Fear | №0079 |
| fearApplied | №0778 |
| fearAura | №0775 |
| fearBomb | №0778 |
| fearImmune | №0817 |
| fearImmunity | №0775 |
| fearPulse | №0628 |
| fearSave | №0778 |
| fearSavePenalty | №0778 |
| fearSourceId | №0817 |
| fearTargets | №1166 |
| fearVisible | №0817 |
| feat | №0746 |
| featherTailSize | №0065 (+ 3 других файлов) |
| featherWingSize | №0065 (+ 3 других файлов) |
| feats | №0785 (+ 3 других файлов) |
| feature | №0623 (+ 1 других файлов) |
| FEATURE_DEFS | №0647 |
| featureAvailableForCurrentBuild | №0647 |
| featureId | №0810 |
| featureLevels | №0802 (+ 4 других файлов) |
| featureName | №0810 (+ 2 других файлов) |
| features | №0785 (+ 57 других файлов) |
| fecundAffliction | №0778 |
| feedOnCorpse | №0815 |
| feet | №0060 (+ 9 других файлов) |
| feint | №0778 |
| female | №0058 (+ 2 других файлов) |
| femaleStackTerms | №1316 |
| feralInstinct | №0647 |
| feralSenses | №0647 (+ 1 других файлов) |
| ferocious | №0685 |
| ferocity | №0655 (+ 3 других файлов) |
| ferocityMax | №0656 (+ 1 других файлов) |
| fetch | №1082 (+ 6 других файлов) |
| fey | №0627 (+ 11 других файлов) |
| fey_touched | №0781 |
| feyFiber | №0825 |
| feyPresence | №0647 (+ 1 других файлов) |
| fiber | №0666 (+ 1 других файлов) |
| field | №0060 (+ 1 других файлов) |
| fiend | №0627 (+ 12 других файлов) |
| fiendish | №0778 (+ 1 других файлов) |
| fiendishStance | №0778 |
| fight | №0817 |
| fightClubs | №0715 |
| fighterRemarkableAthlete | №0647 |
| fighting_initiate | №0781 |
| fightingSpirit | №0715 (+ 1 других файлов) |
| fightingStyle | №0640 (+ 4 других файлов) |
| fightingStyleChoice | №0778 |
| fightingStyles | №0687 (+ 1 других файлов) |
| file | №0867 (+ 1 других файлов) |
| filename | №0662 (+ 70 других файлов) |
| FileReader | №1220 |
| files | №0841 (+ 4 других файлов) |
| filter | №0831 (+ 3 других файлов) |
| filtered | №0846 |
| final | №0849 |
| finalMartyrdom | №0802 |
| finalStrikeExploit | №0778 |
| findRecipeForItem | №0663 |
| fine | №0663 (+ 3 других файлов) |
| finecarver | №0669 |
| fineFiberV49 | №0666 |
| fineLeatherV49 | №0666 |
| finesse | №0812 |
| finesseOrRanged | №1230 |
| finger | №0060 |
| finish | №0060 (+ 2 других файлов) |
| finishLastStand | №0817 |
| finite | №1285 (+ 3 других файлов) |
| finSize | №0065 (+ 2 других файлов) |
| firbolg | №0671 |
| fire | №0640 (+ 3 других файлов) |
| Fire | №0079 |
| fireAffinity | №0812 |
| fireClay | №0672 |
| fireDamage | №0778 (+ 1 других файлов) |
| fireEssence | №0666 (+ 1 других файлов) |
| fireResistance | №0812 |
| firmness | №1124 |
| first | №0826 |
| firstAid | №0778 |
| firstAttackAdvantage | №0778 (+ 1 других файлов) |
| firstHitByEachTargetRestoresMoxie | №0778 |
| firstMate | №0778 |
| fisher | №0800 (+ 1 других файлов) |
| fisticuffs | №0715 |
| fisticuffsDie | №0715 |
| fit | №0061 (+ 8 других файлов) |
| fitFrame | №0061 |
| fitProfile | №0065 |
| fixed | №0712 (+ 1 других файлов) |
| fixtureSha256 | №1123 |
| fizban | №0627 |
| flags | №0817 |
| flame | №0640 |
| flameBurst | №0778 |
| flameReroll12 | №0640 |
| flamesOfHope | №0778 |
| flare | №0061 |
| flashOfGenius | №0647 (+ 1 других файлов) |
| flashOfGeniusAvailable | №0654 |
| flat | №0060 |
| flawed | №0673 |
| flawlessAnalysis | №0828 |
| flax | №0672 |
| fletcher | №0669 (+ 2 других файлов) |
| fletchingStock | №0666 (+ 1 других файлов) |
| fletchingStockV49 | №0666 |
| floatObjectsLb | №0778 |
| floor | №0057 (+ 5 других файлов) |
| FLOOR | №0071 |
| floor_ceramic_tile_dark | №0071 |
| floor_ceramic_tile_light | №0071 |
| floor_checker_tile | №0071 |
| floor_cobblestone | №0071 |
| floor_earth | №0071 |
| floor_grass | №0071 |
| floor_hex_tile | №0071 |
| floor_marble_dark | №0071 |
| floor_marble_light | №0071 |
| floor_parquet_herringbone | №0071 |
| floor_rug_blue | №0071 |
| floor_rug_green | №0071 |
| floor_rug_red | №0071 |
| floor_stone_tile_dark | №0071 |
| floor_stone_tile_light | №0071 |
| floor_tatami | №0071 |
| floor_water | №0071 |
| floor_wood_dark | №0071 |
| floor_wood_light | №0071 |
| floors | №0070 (+ 1 других файлов) |
| flowers | №0824 |
| flurry | №0647 |
| fly | №0808 |
| flyFt | №0640 (+ 1 других файлов) |
| flyIfSelected | №0685 |
| flyingSpeed | №0812 |
| flySpeed | №0077 (+ 2 других файлов) |
| focus | №0640 (+ 10 других файлов) |
| focusDebuff | №0778 |
| focusDuration | №0828 |
| focusDurationRounds | №0778 |
| focusEndsOn | №0828 |
| focuses | №0647 |
| focusRangeFt | №0828 |
| foe | №1139 (+ 4 других файлов) |
| foeSlayer | №0647 |
| foeSlayerApplied | №1231 |
| foeSlayerMode | №1231 |
| folder | №1124 (+ 2 других файлов) |
| folders | №0623 (+ 2 других файлов) |
| fontOfLife | №0734 |
| fontOfMagic | №0647 |
| food | №0798 |
| foot | №0060 |
| footL | №0058 |
| footprintFeet | №0065 |
| footR | №0058 |
| foraging | №0669 |
| force | №0870 (+ 7 других файлов) |
| forceAttackRedirect | №0778 |
| forceCrit1 | №1157 |
| forceCritical | №0647 (+ 1 других файлов) |
| forced | №0654 (+ 2 других файлов) |
| forceDamage | №0685 (+ 1 других файлов) |
| forceDamageInside | №0778 |
| forcedAttack | №0849 |
| forcedD20 | №0849 |
| forcedDamage | №0849 |
| forcedDice | №0851 |
| forcedFailure | №0817 |
| forcedMeleeReaction | №0778 |
| forcedMoveFt | №0775 (+ 2 других файлов) |
| forcedMovementProtection | №0778 |
| forcedReactionAttack | №0778 |
| forcedSave | №0849 |
| forceOfNature | №0832 |
| forceSlot | №1168 |
| forceSurge | №0778 |
| forceTwenty | №0647 |
| forceUnarmed | №0778 |
| forearmL | №0058 |
| forearmR | №0058 |
| foresight | №0775 |
| forest | №0062 (+ 1 других файлов) |
| forge | №0062 |
| forger | №0669 (+ 1 других файлов) |
| forgery | №0671 |
| forgetAfterCast | №0778 |
| forgottenKnowledge | №0778 |
| forkedTongue | №0697 |
| form | №0060 (+ 3 других файлов) |
| formationRole | №0630 |
| formless | №0843 |
| formula | №0077 (+ 4 других файлов) |
| formulae | №0077 |
| formulas | №0077 (+ 4 других файлов) |
| fortified | №0870 |
| fortifyingDice | №0778 |
| fortunateCompany | №0778 |
| fortuneMode | №0817 |
| fortunePending | №0817 |
| fortuneRevealed | №0817 |
| fortuneTwist | №0778 |
| forward | №0065 |
| found | №0817 |
| fractureBurst | №0778 |
| frame | №0057 |
| free | №0778 (+ 4 других файлов) |
| freeAfflict | №0778 |
| freeAt17 | №0802 |
| freeAtLevel17 | №0778 |
| freeAtUnsealed | №0778 |
| freeCast | №0778 |
| freeDispelCaster | №0778 |
| freedomOfMovement | №0808 |
| freeExploits | №0778 |
| freeHandBonusAction | №0778 |
| freeHitDieChancePercent | №0778 |
| freeHoldTheLine | №0778 |
| freeInsightfulOrder | №0778 |
| freeLawShieldAndHalt | №0778 |
| freeMoveFt | №0778 |
| freePoints | №0713 |
| freePsi | №0778 |
| freePsiLost | №0778 |
| freePsiPerTurn | №0778 |
| freeSpell | №0812 |
| freeSpells | №0778 |
| freeTalent | №0778 |
| freeUse | №0778 |
| freeUses | №0843 |
| frenzy | №0647 |
| friend | №1144 (+ 3 других файлов) |
| frighten | №0812 |
| frightened | №0778 (+ 2 других файлов) |
| frightenedBy | №0817 |
| frightenedEffect | №0640 (+ 3 других файлов) |
| frightenedSaveDisadvantage | №0778 |
| frightenedUntilEndNextTurn | №0778 |
| from | №0631 (+ 25 других файлов) |
| fromFiendOrUndead | №0647 (+ 1 других файлов) |
| fromRound | №0817 |
| fromSpell | №0654 (+ 3 других файлов) |
| front | №0061 (+ 1 других файлов) |
| frontDigits | №0060 |
| FrontTexture | №1134 |
| frozen | №0640 |
| full_orc | №0671 |
| fullMaxNearestDistance | №1132 |
| fullMeanNearestDistance | №1132 |
| fullSpeedDragging | №0778 |
| fulminatingFatigue | №0778 |
| fumble | №0654 (+ 30 других файлов) |
| functionalStatus | №0801 |
| fur | №0060 |
| furAmount | №0058 (+ 3 других файлов) |
| furColor | №0065 (+ 1 других файлов) |
| furDensity | №0058 (+ 4 других файлов) |
| furH | №0060 |
| furLength | №0058 (+ 2 других файлов) |
| furParts | №0060 |
| furProfile | №0058 (+ 4 других файлов) |
| furRoots | №0060 |
| furShell | №0060 |
| furStrands | №0060 |
| furyOfForge | №0778 |
| fuseMinutes | №0077 |
| fuseRounds | №0077 (+ 1 других файлов) |
| g | №0867 |
| gainD4OnFailure | №0778 |
| gained | №0655 (+ 1 других файлов) |
| gainFerocity | №0655 (+ 1 других файлов) |
| gainRelaxationPerTurn | №0778 |
| gallantSpellcasting | №0778 |
| gameActors | №0640 |
| gameOfChance | №0778 |
| gameplay | №0847 (+ 2 других файлов) |
| gameplayEvents | №0861 (+ 1 других файлов) |
| gargantuan | №0815 (+ 1 других файлов) |
| gaseousBody | №0808 |
| gaseousReaction | №0808 |
| gateTowns | №0631 |
| gather | №0080 |
| gatherAction | №0080 |
| gathered | №0877 (+ 1 других файлов) |
| gatherIngredient | №0080 |
| gear | №0664 (+ 2 других файлов) |
| gelid | №0640 |
| Gelid | №0778 |
| gem | №0667 (+ 4 других файлов) |
| gemcutter | №0800 (+ 1 других файлов) |
| gems | №0669 |
| gender | №0059 (+ 18 других файлов) |
| genderMorphs | №0065 |
| general | №0800 (+ 1 других файлов) |
| generate | №0805 (+ 3 других файлов) |
| genie | №0640 |
| geometryBuilds | №0062 |
| geometryState | №0061 |
| geometryUploads | №0062 |
| get | №0657 (+ 5 других файлов) |
| getAC | №0838 |
| getAllBackgrounds | №1258 |
| getAllRaces | №1258 |
| getAttribute | №1203 |
| getAvailableRecipes | №0669 |
| getBiomassFromCorpse | №0838 |
| getBody | №0815 |
| getBodyState | №0065 |
| getCharismaModifier | №0800 |
| getClass | №0660 |
| getClassSummary | №0868 |
| getCreature | №0627 (+ 12 других файлов) |
| getCurrent | №0641 (+ 2 других файлов) |
| getCurse | №0076 |
| getDC | №0828 |
| getDevourDamage | №0838 |
| getDevourDC | №0838 |
| getDialect | №0827 |
| getDie | №0828 |
| getDiscipline | №0828 |
| getDominantAbilityNames | №0868 |
| getDurability | №0666 (+ 1 других файлов) |
| getElementById | №1078 (+ 37 других файлов) |
| getExhaustion | №0824 (+ 1 других файлов) |
| getFeature | №0660 |
| getInscribedRunes | №0827 |
| getItem | №1080 (+ 20 других файлов) |
| getItemQuality | №0666 |
| getLanguages | №0827 |
| getLarva | №0815 |
| getLibraryManifest | №0070 |
| getLockedRecipes | №0669 |
| getMap | №0069 |
| getMaxCharacteristics | №0868 |
| getMaxPreparedSpellsLimit | №0835 |
| getMetamorphoses | №0076 |
| getMorphWeights | №0065 |
| getMutationSlots | №0838 |
| getNativeStorageStats | №0841 |
| getObject | №0070 |
| getPath | №1114 (+ 1 других файлов) |
| getPeer | №1163 (+ 7 других файлов) |
| getPersuasionModifier | №0800 |
| getProfession | №0669 |
| getProfile | №0669 (+ 1 других файлов) |
| getPursuit | №0828 |
| getRace | №0065 |
| getReactions | №0828 |
| getRenderDescriptor | №0065 |
| getRunesKnown | №0827 |
| getRunicDC | №0827 |
| getSaveBonus | №0826 (+ 13 других файлов) |
| getSaveDC | №0076 |
| getSkillBonus | №0826 |
| getSource | №0797 |
| getSpecialization | №0669 |
| getSpellInfo | №0797 |
| getSpellsKnown | №0076 |
| getSpellSlots | №0076 |
| getState | №0062 (+ 1 других файлов) |
| getStats | №0826 |
| getSubclass | №0647 |
| getSummary | №0783 |
| getSymbiosisTier | №0815 |
| getToken | №0829 |
| getTrader | №0798 |
| getVersion | №1114 (+ 1 других файлов) |
| getView | №1220 |
| getZone | №0070 |
| ghost | №0062 |
| ghostChainSize | №0065 (+ 2 других файлов) |
| ghostOnKill | №0808 |
| ghostOpacity | №0065 (+ 2 других файлов) |
| ghostTerror | №0065 (+ 2 других файлов) |
| ghostWeapon | №0062 (+ 3 других файлов) |
| ghukliak | №0778 (+ 1 других файлов) |
| giant | №0630 |
| Gifted | №0794 |
| giftedStrategist | №0778 |
| GITHUB_REPOSITORY | №1077 |
| GITHUB_RUN_ID | №1077 |
| GITHUB_SERVER_URL | №1077 |
| gl | №0072 (+ 4 других файлов) |
| glancingBlow | №0778 |
| glareParalyzeOnFailBy5 | №0778 |
| glass | №0666 (+ 6 других файлов) |
| glassBatch | №0672 |
| glassblower | №0669 (+ 3 других файлов) |
| glasswork | №0667 (+ 2 других файлов) |
| glaze | №0671 (+ 1 других файлов) |
| glazedVessel | №0671 |
| glb | №1130 |
| glbBBox | №1127 (+ 1 других файлов) |
| glbTriangles | №1127 (+ 2 других файлов) |
| glbVertices | №1118 (+ 4 других файлов) |
| gliderMembraneSize | №0065 (+ 1 других файлов) |
| global | №1227 (+ 5 других файлов) |
| globalThis | №1241 (+ 4 других файлов) |
| gloves | №0061 |
| glow | №0065 |
| gltf | №0068 (+ 2 других файлов) |
| gnoll | №0773 |
| gnome_forest | №0671 |
| gnome_rock | №0671 |
| goblin | №0671 |
| goblinDiscourse | №0778 |
| goblinoid | №0773 |
| goblinStance | №0778 |
| gold | №0831 (+ 3 других файлов) |
| goldBillet | №0672 |
| goldenSlumbers | №0778 |
| goldPer10 | №0664 |
| goldReceived | №0817 |
| goldSpent | №0817 |
| good | №0663 (+ 1 других файлов) |
| goodPct | №1132 |
| gooSize | №0065 (+ 1 других файлов) |
| gp | №0789 (+ 11 других файлов) |
| gPerE | №1771 |
| graftAction | №1079 |
| graftName | №1079 |
| grafts | №0077 (+ 1 других файлов) |
| grain | №0671 (+ 1 других файлов) |
| GRAND_HEXES | №0778 |
| grandHex | №0775 (+ 1 других файлов) |
| grandRevolutionary | №0778 |
| grantActionNextStart | №0817 |
| grantAdvantage | №0778 |
| grantIngredient | №0080 |
| grantsAdvantage | №0826 |
| grantTemporaryHitPoints | №0654 |
| grantUndyingToAlly | №0778 |
| grapple | №0775 |
| grappleBonus | №0778 |
| grappleMastery | №0775 |
| grappleSizePlus | №0778 |
| grappleTarget | №0775 |
| gravity | №0817 |
| gravityResisted | №0817 |
| grayColor | №0065 (+ 1 других файлов) |
| grayPercent | №1098 (+ 1 других файлов) |
| great_weapon_master | №0781 |
| greaterDivineIntervention | №0647 |
| greatOldOne | №0640 |
| Green | №0775 (+ 1 других файлов) |
| greenwood | №0877 |
| greenwood_clearing | №0877 |
| greenwood_heart | №0877 |
| greenwood_stream | №0877 |
| grid | №0060 (+ 1 других файлов) |
| grimPsychometry | №0640 |
| grip | №0062 |
| ground | №0060 |
| group | №0060 |
| groupKey | №0873 (+ 3 других файлов) |
| groups | №0654 (+ 7 других файлов) |
| guaranteed | №0627 (+ 14 других файлов) |
| guardCraft | №0665 |
| guardDC | №0817 |
| Guardian | №0794 |
| guardianRangeFt | №0778 |
| guardians | №1189 |
| guardianTactic | №0778 |
| guardianTactics | №0734 |
| guardRepair | №0665 |
| guest | №0652 |
| guidedStrike | №0647 |
| guild | №0662 |
| gumArabic | №0672 |
| h | №0060 (+ 9 других файлов) |
| H | №0057 (+ 1 других файлов) |
| habitat | №0062 |
| habitats | №0627 (+ 13 других файлов) |
| hadMaterial | №0817 |
| hadozee | №1292 |
| haggle | №0800 |
| hair | №0058 (+ 15 других файлов) |
| hairColor | №0065 (+ 3 других файлов) |
| hairParts | №0058 |
| hairRibbonBudget | №0058 |
| half | №0065 (+ 1 других файлов) |
| half_up | №0060 (+ 1 других файлов) |
| halfCover | №0778 |
| halfCoverWhileGrappling | №0778 |
| halfDamageEffect | №0654 (+ 4 других файлов) |
| halfOnSave | №0778 (+ 2 других файлов) |
| halfProficiencySkills | №0778 |
| halfSpeed | №0778 |
| Hallucination | №0079 |
| halt | №0778 |
| haltRestrains | №0778 |
| halveDamage | №0778 |
| halveNecroticReaction | №0640 |
| hand | №0060 (+ 1 других файлов) |
| handL | №0058 |
| handlebar | №0065 |
| handled | №0067 |
| handOfDread | №0715 |
| handoffNeedsSignaling | №0809 |
| handoffPending | №0809 |
| handR | №0058 |
| hands | №0060 (+ 9 других файлов) |
| hardenedSoul | №0640 |
| hardwood | №0666 (+ 4 других файлов) |
| harmonic | №0827 |
| harmonicAttunement | №0778 |
| harvest | №0627 (+ 19 других файлов) |
| harvestMaterial | №1189 |
| has | №0781 |
| has_joints_and_weights | №1121 |
| has_morph_targets | №1121 |
| hasAsi | №0699 (+ 2 других файлов) |
| hasCharacter | №0864 |
| hasDamage | №0810 (+ 1 других файлов) |
| hasInventoryEffects | №0817 |
| hasPreparation | №0835 |
| hasProfession | №0080 |
| haste | №0077 |
| hasToolProficiency | №0807 |
| hatOfDisguise | №0778 |
| have | №0663 (+ 3 других файлов) |
| haveGold | №0664 |
| haveMaterials | №0664 |
| haymaker | №0715 (+ 1 других файлов) |
| head | №0058 (+ 12 других файлов) |
| HEAD_AXES | №0065 |
| HEAD_FORMS | №0065 |
| HEAD_STYLES | №0065 |
| headAccessories | №0060 |
| headAccessory | №0057 (+ 2 других файлов) |
| headBuilds | №0062 |
| headDefaults | №0065 |
| headers | №0652 (+ 1 других файлов) |
| headFrame | №0060 |
| headless | №1271 (+ 37 других файлов) |
| heal | №0640 (+ 4 других файлов) |
| healAfterNecrotic | №0808 |
| healAfterRest | №0808 |
| healAmount | №1079 |
| healBatch | №0654 |
| healBody | №0868 |
| healCompanion | №0685 |
| healed | №0783 (+ 2 других файлов) |
| healHalfMaxHp | №0778 |
| healHitDie | №0775 |
| healHP | №0778 |
| healing | №0077 (+ 6 других файлов) |
| healingAllowed | №0868 |
| healingAmount | №0817 |
| healingBlocked | №0783 |
| healingBonus | №0778 (+ 1 других файлов) |
| healingBoost | №0812 |
| healingCount | №0817 |
| healingGrantsACBonus | №0778 |
| healingPotion | №0812 |
| healingPotionOnLongRest | №0812 |
| healingSpell | №0817 (+ 2 других файлов) |
| healingSpellsCannotHealSelf | №0808 |
| healMod | №0640 |
| healModifier | №0775 |
| healOnCharnelKill | №0808 |
| healOnKill | №0640 |
| healOrDamage | №0812 |
| healPer5Charnel | №0808 |
| healPool | №0778 |
| healRoll | №1079 |
| healSelf | №0778 |
| healShell | №0783 |
| healthCheck | №0852 |
| healWithHitDice | №0778 |
| heart | №0062 (+ 1 других файлов) |
| hearth | №0066 |
| heartPhylactery | №0778 |
| heavyArmor | №0778 |
| heelstomper | №0778 |
| height | №0062 (+ 50 других файлов) |
| heightened | №0647 |
| heightenedSenses | №0640 |
| hellhound | №0685 |
| hellspeaker | №0778 |
| hellspeakerHoneySweetBlades | №0778 |
| hellspeakerTurncoat | №0778 |
| hemMod | №0640 |
| hemocraftAbilities | №0687 |
| hemocraftDie | №0687 |
| hemocraftRerollOncePerTurn | №0640 |
| Hemorrhage | №0079 |
| hemp | №0672 |
| herb | №0667 (+ 2 других файлов) |
| herbalism | №0671 (+ 1 других файлов) |
| herbalist | №0669 (+ 4 других файлов) |
| herbs | №0824 (+ 1 других файлов) |
| herculean | №0715 (+ 1 других файлов) |
| hero | №1138 |
| heroicCharge | №0778 |
| heroicFocus | №0778 |
| heroicFortitude | №0778 |
| heroicOrderExploit | №0778 |
| heroicRush | №0775 |
| hex | №0867 (+ 2 других файлов) |
| hexArmor | №0778 |
| hexAura | №0778 |
| hexblade | №0640 |
| HEXES | №0778 |
| hexesAtWill | №0775 |
| hexmaster | №0778 |
| hexPhalanx | №0778 |
| hexPlate | №0778 |
| hexSaveDisadvantage | №0778 |
| hexShield | №0778 |
| hi | №0060 |
| hidden | №1306 |
| hide | №0666 (+ 1 других файлов) |
| hideBonusAction | №0778 |
| hideInDimDark | №0778 |
| hideInPlainSight | №0647 |
| Hideous | №0778 |
| high | №0058 (+ 1 других файлов) |
| high_ponytail | №0060 (+ 1 других файлов) |
| highAuthority | №0778 |
| highest | №1124 |
| highestId | №0817 |
| highGround | №0817 |
| highJumpBonusFt | №0778 |
| highlands | №0798 (+ 1 других файлов) |
| highlands_mine | №0877 |
| highlands_quarry | №0877 |
| highlands_ridge | №0877 |
| highlightColor | №0065 (+ 2 других файлов) |
| highlightPercent | №1098 (+ 2 других файлов) |
| hills | №0062 |
| hips | №0062 (+ 5 других файлов) |
| history | №0079 (+ 8 других файлов) |
| historyAdvantage | №0778 |
| historyAdvantageOnSinisterObjectOrPlace | №0640 |
| hit | №0654 (+ 9 других файлов) |
| hitCount | №0654 (+ 3 других файлов) |
| hitDice | №0623 (+ 2 других файлов) |
| hitDiceMax | №1159 |
| hitDiceRemaining | №0077 (+ 2 других файлов) |
| hitDiceRestored | №0802 |
| hitDiceSpent | №0077 (+ 4 других файлов) |
| hitDiceUsed | №0785 (+ 1 других файлов) |
| hitDie | №0623 (+ 53 других файлов) |
| hitInfo | №0072 |
| hitPoints | №0778 (+ 2 других файлов) |
| hitPointsAfter | №0802 (+ 1 других файлов) |
| hits | №0778 |
| hitTest | №0071 (+ 1 других файлов) |
| hitTokenId | №0819 |
| hitZone | №0071 |
| hive | №0062 |
| hm08BBox | №1127 (+ 1 других файлов) |
| hm08Triangles | №1127 (+ 1 других файлов) |
| hm08Vertices | №1127 (+ 3 других файлов) |
| hoard | №0805 |
| hobgoblin | №0671 |
| holdBreathIndefinite | №0778 |
| holdTheLine | №0778 |
| Hollow | №0778 |
| holy | №0077 |
| holyBomb | №0778 |
| holyMagic | №0775 |
| holyNexus | №0647 |
| homebrew | №0659 (+ 1 других файлов) |
| honey | №0672 |
| honorDuel | №0778 |
| hoofColor | №0065 (+ 1 других файлов) |
| hoofSize | №0062 (+ 3 других файлов) |
| hooks | №0076 (+ 19 других файлов) |
| hope | №0775 |
| horde | №0062 (+ 5 других файлов) |
| hordeCount | №0065 |
| horn | №0825 |
| HORN_STYLES | №0065 |
| hornColor | №0065 (+ 1 других файлов) |
| hornRidges | №1107 (+ 1 других файлов) |
| hornSize | №0065 (+ 3 других файлов) |
| hornStyle | №0062 (+ 5 других файлов) |
| hornThickness | №1107 (+ 1 других файлов) |
| horror | №0628 |
| horrorEligible | №0628 |
| horseColor | №0065 (+ 1 других файлов) |
| hosiery | №0061 |
| hosieryDen | №1091 |
| host | №0642 (+ 1 других файлов) |
| hostDestroyed | №0815 |
| hostileAction | №0817 |
| hostileBane | №0778 |
| hostilesWithin5 | №1167 |
| hostIsSeparateStatBlock | №0815 |
| hostSurvived | №0815 |
| houndReactionAttack | №0778 |
| howl | №0640 (+ 1 других файлов) |
| hp | №0785 (+ 77 других файлов) |
| hpBonus | №0778 |
| hpBonusPerLevel | №0823 |
| hpCost | №0802 (+ 1 других файлов) |
| hpCostBySlot | №0802 |
| hpCurrent | №0623 (+ 19 других файлов) |
| hpDamage | №0654 (+ 6 других файлов) |
| hpDamageBySlot | №0802 |
| hpFraction | №0775 |
| hpMax | №0623 (+ 13 других файлов) |
| hpMaxBonus | №0685 |
| hpPer100gp | №0778 |
| hpPercent | №1189 |
| hpTemp | №0623 (+ 6 других файлов) |
| href | №1203 |
| huge | №0815 (+ 1 других файлов) |
| humanoid | №0627 (+ 13 других файлов) |
| humanoidTorch | №0778 |
| hunter | №0685 (+ 2 других файлов) |
| hunterCompanion | №0775 |
| huntersBane | №0640 |
| huntersMark | №0647 (+ 1 других файлов) |
| huntersPrey | №0647 (+ 1 других файлов) |
| hurlThroughHell | №0810 |
| hybrid | №0778 |
| hybridAttackAdvantageVsBranded | №0778 |
| hybridRegeneration | №0778 |
| hybridTransformation | №0640 |
| hybridTransformationMastery | №0640 |
| hyena | №0773 |
| i | №0810 |
| ibex | №0065 |
| icon | №0670 (+ 3 других файлов) |
| iconId | №0787 (+ 1 других файлов) |
| id | №0060 (+ 199 других файлов) |
| idempotent | №0864 |
| identifyEffect | №0778 |
| identityDistortion | №0628 |
| ids | №0057 (+ 2 других файлов) |
| idx | №0072 |
| ifReducedToZero | №0778 |
| ifStolenSpark | №0778 |
| ignitingTouch | №0778 |
| ignoreCover | №0077 (+ 1 других файлов) |
| ignored | №0647 |
| ignoreExtremeTemperature | №0778 |
| ignoreHalfCover | №0778 |
| ignoreHalfDamageOnSave | №0778 |
| ignoreImmunity | №0640 (+ 2 других файлов) |
| ignoreInvisibility | №0817 |
| ignoreOneMutagenSideEffect | №0778 |
| ignoreOpportunityAttacksWhileFlying | №0808 |
| ignorePhysicalResistance | №0817 |
| ignoreRequirements | №1172 |
| ignoreResistance | №0077 (+ 6 других файлов) |
| ignoresImmunity | №0802 |
| ignoreSomaticInDimDark | №0778 |
| ignoresResistance | №0802 (+ 1 других файлов) |
| ignoreVerbalInDimDark | №0778 |
| illuminationAt | №0070 |
| illusion | №0817 (+ 1 других файлов) |
| illusoryDuplicate | №0778 |
| illustriousAdmiral | №0778 |
| imitation | №0077 (+ 1 других файлов) |
| immortality | №0778 |
| immortalityAnchor | №0808 |
| immune | №0640 (+ 5 других файлов) |
| immuneAging | №0778 |
| immuneAll | №0817 |
| immuneCondition | №0817 |
| immuneConditions | №0817 (+ 1 других файлов) |
| immuneFrightened | №0647 (+ 1 других файлов) |
| immuneIfBlindedImmune | №0640 |
| immuneNaturalDeath | №0812 |
| immuneSuppression | №0778 |
| immuneSurprise | №0778 |
| immuneToOwnerBombs | №0077 |
| immuneWhenRampageAtLeast | №0778 |
| immunities | №0654 (+ 13 других файлов) |
| immunity | №0640 (+ 3 других файлов) |
| immunity24hOnSave | №0778 |
| immunityBecomesResistance | №0077 (+ 3 других файлов) |
| immunityChosen | №0778 |
| impact | №0077 |
| impactBomb | №0778 |
| impermeable | №0640 |
| Impermeable | №0778 |
| implemented | №0778 |
| importJSON | №0855 |
| importLocal | №0652 |
| importText | №0859 (+ 1 других файлов) |
| imposeDisadvantage | №0778 |
| imposingPresence | №0778 |
| improvedAt11 | №0802 |
| improvedBombs | №0676 |
| improvedDivineSmite | №0647 |
| improvedFamiliar | №0778 |
| improvedResolve | №0734 |
| improvedThralls | №0808 |
| inactiveAfterInvoke | №0827 |
| inAttackAction | №1170 |
| incendiary | №0077 |
| incendiaryBomb | №0778 |
| inciteViolence | №0778 |
| incoming | №0817 |
| incomingAC | №0640 (+ 1 других файлов) |
| incomingAttackModifiers | №0870 |
| incomingDamage | №1159 |
| incomingDisadvantage | №0817 |
| incomparableIntellect | №0828 |
| index | №0792 (+ 8 других файлов) |
| indexType | №0072 |
| indices | №0057 (+ 8 других файлов) |
| individualCount | №0065 |
| individuals | №0060 |
| indomitable | №0647 (+ 1 других файлов) |
| indomitableMight | №0647 |
| infernal | №0685 |
| infernalConduit | №0697 |
| infernalConduitDice | №0697 |
| infernalMajesty | №0697 |
| inferno | №0062 |
| influenceSlots | №0631 |
| informant | №0778 |
| infuseItem | №0647 |
| ingredient | №0079 (+ 1 других файлов) |
| INGREDIENT_SOURCES | №0080 |
| ingredientCategory | №0080 |
| ingredientId | №0080 |
| ingredientName | №0080 |
| ingredients | №0078 (+ 2 других файлов) |
| inheritsOrigin | №0065 |
| init | №0659 |
| initCreatedCharacter | №0669 |
| initialize | №0820 |
| initiative | №0627 (+ 23 других файлов) |
| initiativeBonus | №0775 (+ 2 других файлов) |
| initiativeDash | №0778 |
| initiativeDisadvantage | №0640 (+ 1 других файлов) |
| initiativeExploit | №0778 |
| initiativeFerocity | №0685 |
| initiativeOrPerception | №0778 |
| initiativeReagentsTo | №0778 |
| initiativeRoll | №1170 |
| initiativeSave | №0778 |
| initiativeTempHp | №0778 |
| initiativeTracker | №0859 (+ 20 других файлов) |
| ink | №0667 (+ 2 других файлов) |
| innatePsionics | №0713 |
| inner | №0057 |
| innerHeight | №1203 |
| innerHTML | №1105 (+ 2 других файлов) |
| innerWidth | №1203 |
| input | №1771 |
| inscribe | №0778 |
| inscribedCount | №0778 |
| inscribedGearProficiency | №0778 |
| inscribedRunes | №0827 |
| inscription | №0827 |
| inscrutableMind | №0778 |
| insectoid | №0773 |
| insidiousImprecation | №0778 |
| insidiousSpell | №0778 |
| insight | №0771 (+ 1 других файлов) |
| insightAbility | №0778 |
| insightBonus | №0778 |
| insightfulOrder | №0778 |
| insightTotal | №0077 (+ 1 других файлов) |
| inspect | №0820 (+ 1 других файлов) |
| inspector | №0069 |
| inspectSource | №0852 |
| inspirationalSpeech | №0778 |
| inspirationOnKill | №0817 |
| inspiring_leader | №0781 |
| inspiringShout | №0778 |
| inspiringWord | №0738 |
| inspiringWordMaxHeal | №0775 (+ 1 других файлов) |
| inspiringWordUses | №0738 |
| install | №0067 |
| installed | №0077 (+ 1 других файлов) |
| installedAtLevel | №0077 |
| instant | №0077 |
| instantDeath | №0654 (+ 1 других файлов) |
| instinctualSuppression | №0778 |
| instruments | №0778 |
| int | №0623 (+ 52 других файлов) |
| intBonus | №0640 |
| intChecksAdvantage | №0640 (+ 1 других файлов) |
| intChecksDisadvantage | №0640 (+ 1 других файлов) |
| intellectDie | №0828 |
| intelligence | №0785 (+ 12 других файлов) |
| intelligenceOrWisdomOrCharisma | №0076 (+ 1 других файлов) |
| intelligentExplosion | №0077 |
| intelligentExplosions | №0676 |
| intensity | №0069 (+ 2 других файлов) |
| inter | №0831 |
| interceptAttack | №0817 |
| interceptHealing | №0817 |
| interceptInitiative | №0817 |
| interceptSave | №0817 |
| interdict | №0870 |
| interdictBoons | №0697 |
| interdiction | №0697 |
| interpolation | №0067 |
| interrupt | №0734 |
| interrupted | №0654 (+ 1 других файлов) |
| interruptedId | №0817 |
| interruptOneAttackOrAbility | №0778 |
| interruptUses | №0734 |
| intimidatingCommand | №0778 |
| intimidation | №0771 (+ 1 других файлов) |
| intimidationAdvantage | №0778 |
| intimidationPersuasionBonus | №0778 |
| intIncrease | №0778 |
| intMaxBonus | №0640 |
| intMaxIncrease | №0778 |
| intToAC | №0808 |
| intuition | №0827 |
| intWisChaSavesDisadvantage | №0640 |
| invadeHost | №0815 |
| inventory | №0785 (+ 21 других файлов) |
| inventoryEntries | №0817 |
| inventoryRef | №0792 (+ 4 других файлов) |
| inverseBindMatrices | №0067 (+ 1 других файлов) |
| investigation | №0771 (+ 1 других файлов) |
| investigationExpertise | №0775 |
| investigator | №0828 |
| invHeaderAC | №1147 |
| invigoratingOrders | №0778 |
| Invisibility | №0079 |
| invisibilityAfterCharnel | №0808 |
| invisible | №0685 (+ 2 других файлов) |
| invocation | №0827 |
| invocationSlots | №0778 |
| invoke | №0660 (+ 1 других файлов) |
| invokeCount | №0778 |
| invokeDebuff | №0778 |
| invokeHell | №0697 |
| invoking | №0827 |
| iokharic | №0778 (+ 1 других файлов) |
| iridescentStrike | №0843 |
| iron | №0667 (+ 2 других файлов) |
| Ironbound | №0794 |
| ironChin | №0715 |
| ironCommand | №0778 |
| ironIngot | №0672 |
| isActive | №0781 |
| isAlly | №1079 |
| isAssassin | №0647 |
| isBomb | №0077 (+ 3 других файлов) |
| isDead | №0645 |
| isEnabled | №0660 (+ 1 других файлов) |
| isExtra | №0645 (+ 9 других файлов) |
| isExtraClass | №0645 |
| isIndependentCreature | №0838 |
| isLarval | №0060 |
| isMagical | №1158 |
| isNewClass | №1771 |
| isObject | №1078 |
| isRaceClassHybrid | №0648 (+ 6 других файлов) |
| isShirt | №0061 |
| isSkirtDress | №0061 |
| isSolid | №0070 |
| issues | №0671 |
| isSwarm | №0060 |
| item | №0061 (+ 18 других файлов) |
| itemId | №0812 |
| items | №0061 (+ 7 других файлов) |
| itemValue | №0666 (+ 1 других файлов) |
| itsAlive | №0778 |
| ix | №0060 |
| j | №0057 |
| jacket | №0061 |
| jackOfAllTrades | №0647 |
| jade | №0831 |
| jar | №0066 |
| jaw | №0060 |
| jawProjection | №0065 |
| jawWidth | №0062 (+ 2 других файлов) |
| jealousy | №0076 |
| jeweler | №0667 (+ 5 других файлов) |
| jinx | №1169 |
| jinxBonusAction | №0778 |
| jinxExtraDamage | №0778 |
| jinxOptions | №0778 |
| joinRoom | №1217 |
| joints | №0057 (+ 4 других файлов) |
| jotun | №0778 (+ 1 других файлов) |
| jotunbrudJuggernaut | №0778 |
| jotunStance | №0778 |
| journal | №0851 |
| json | №0652 (+ 5 других файлов) |
| jumpDistanceMultiplier | №0775 |
| jumpFt | №0778 |
| jumpMultiplier | №0778 |
| jungle | №0062 |
| junk | №0792 (+ 39 других файлов) |
| justDroppedToZero | №1164 |
| K | №1126 |
| keenAwareness | №0828 |
| keep | №1771 |
| keeperOfOrder | №0778 |
| key | №0070 (+ 13 других файлов) |
| KEY | №0070 |
| ki | №1156 (+ 2 других файлов) |
| killInspiration | №0817 |
| kiln | №0669 |
| kind | №0060 (+ 36 других файлов) |
| Kind | №1134 |
| kingdom | №0062 |
| kiPoints | №0702 |
| kitchen | №0066 |
| knighthood | №0778 |
| knockdown | №0775 |
| knockout | №0775 |
| knockoutIfSelfDamageReachesZero | №0778 |
| knockoutRoll | №0778 |
| knockProne | №0778 |
| knockProneSmaller | №0778 |
| knot | №0061 (+ 3 других файлов) |
| known | №0785 (+ 2 других файлов) |
| knownAt | №0697 |
| knownAtLevel | №0076 |
| knownCantrips | №0077 |
| knownClasses | №0835 |
| knownCount | №0778 |
| knownMetamorphoses | №0778 |
| knownReactions | №0079 |
| knowYourEnemy | №0778 |
| kobold | №0060 (+ 1 других файлов) |
| krd | №0794 |
| krynn | №0630 |
| label | №0831 (+ 22 других файлов) |
| laboratory | №0062 |
| labyrinth | №0062 |
| lace | №0061 |
| lairActions | №1252 |
| lairActionState | №0810 |
| lamp | №0066 |
| lampblack | №0672 |
| landscape | №0886 |
| landsStrideRanger | №0647 |
| language | №0778 (+ 1 других файлов) |
| languageChoice | №0778 |
| languages | №0623 (+ 4 других файлов) |
| lantern | №0066 |
| large | №0066 (+ 2 других файлов) |
| larva | №0815 |
| larvaGirth | №0065 (+ 2 других файлов) |
| larvaIsSeparateStatBlock | №0815 |
| larval | №0060 |
| larvaLength | №0065 (+ 2 других файлов) |
| larvalParts | №0060 |
| larvaTendrilSize | №0065 (+ 2 других файлов) |
| larvaToothSize | №0065 (+ 2 других файлов) |
| last | №0060 (+ 1 других файлов) |
| lastAttemptRound | №0804 |
| lastGatheredAt | №0877 |
| lastLifesMemories | №0778 |
| lastRest | №1239 |
| lastRestId | №0820 |
| lastRestock | №0798 (+ 1 других файлов) |
| lastRestoredKey | №0864 |
| lastRoll | №0804 |
| lastRound | №0804 |
| lastRun | №0853 |
| lastStandActive | №0817 |
| lastStandFinished | №0817 |
| lastStandReady | №0817 |
| lastTrump | №0820 |
| lastTrumpAvailable | №0820 |
| lastTrumpUsed | №0820 (+ 1 других файлов) |
| lastX | №0625 (+ 1 других файлов) |
| lastY | №0625 (+ 1 других файлов) |
| latency | №0851 |
| latitude | №0060 |
| laughingGas | №0077 |
| laughingGasBomb | №0778 |
| launch | №0860 |
| lawShield | №0775 |
| lawsShield | №0778 |
| layer | №0061 |
| layered | №0060 (+ 1 других файлов) |
| layers | №0060 |
| layOnHands | №0647 (+ 1 других файлов) |
| leadershipAbility | №0738 (+ 1 других файлов) |
| leadershipBased | №0778 |
| leadershipChoices | №0738 |
| leadershipForCheck | №0778 |
| leadershipForChecks | №0778 |
| leadershipForDeception | №0778 |
| leadershipForHistoryInvestigation | №0778 |
| leadershipForIntimidation | №0778 |
| leadershipForReligion | №0778 |
| leadershipModifier | №0738 |
| leadershipStyles | №0738 |
| leadTheCharge | №0778 |
| leaks | №1286 (+ 2 других файлов) |
| learnAnyCastableSpell | №0778 |
| learnBeastShape | №0778 |
| learnCantrip | №0778 |
| learned | №0877 |
| learnedAt | №0669 |
| learnFromUI | №0669 |
| learning | №0832 |
| learnLanguage | №0778 |
| learnMartialWeapon | №0778 |
| learnProfession | №0669 |
| learnSkill | №0778 |
| learnSpell | №0778 |
| learnTargetStatistic | №0778 |
| learnTool | №0778 |
| leather | №0061 (+ 7 других файлов) |
| leatherSole | №0671 |
| leatherStrapV49 | №0666 |
| leatherwork | №0667 (+ 1 других файлов) |
| leatherworker | №0668 (+ 4 других файлов) |
| leavingReach | №0818 (+ 2 других файлов) |
| lectern | №0066 |
| left | №0062 (+ 2 других файлов) |
| leg | №0060 |
| legacy_expansions | №0627 |
| legendary | №0792 (+ 6 других файлов) |
| legendaryActionCurrent | №0810 |
| legendaryActions | №0804 (+ 1 других файлов) |
| legendaryResistance | №0734 |
| legendaryResistanceCurrent | №0810 |
| legendaryResistances | №0804 (+ 1 других файлов) |
| legendaryTandem | №0778 |
| legLength | №0062 (+ 1 других файлов) |
| legs | №0062 (+ 2 других файлов) |
| length | №0058 (+ 20 других файлов) |
| level | №0779 (+ 83 других файлов) |
| level10 | №0076 |
| level18 | №0076 |
| level2 | №0076 |
| level20 | №0827 |
| level6 | №0076 |
| level9 | №0827 |
| levelData | №0699 |
| leveledUp | №0669 |
| levelName | №0669 |
| levels | №0076 (+ 46 других файлов) |
| LEVELS | №0669 |
| levelsRestored | №0647 |
| library | №0070 (+ 2 других файлов) |
| license | №0070 (+ 11 других файлов) |
| lichdom | №0808 |
| lieDetectionAutoFail | №0778 |
| lighting | №0070 |
| lightIntensity | №1134 |
| lightning | №0077 (+ 3 других файлов) |
| lightningArc | №0808 |
| lightningBomb | №0778 |
| lightRadius | №1134 |
| limb | №0060 |
| limbH | №0060 |
| limbIndices | №0060 |
| limbParts | №0060 |
| limbProfile | №0060 (+ 4 других файлов) |
| limbRecords | №0060 |
| limbState | №0060 |
| limestone | №0672 |
| limit | №0835 |
| limitations | №1266 (+ 1 других файлов) |
| line | №0850 |
| linen | №0061 |
| lineOfSight | №1226 (+ 2 других файлов) |
| lingerie | №0061 |
| link | №0775 |
| linked | №0775 |
| linkedClass | №0657 (+ 1 других файлов) |
| linkedHowl | №0640 |
| lipColor | №0065 (+ 1 других файлов) |
| lipOpacity | №1280 |
| lipVolume | №0065 |
| list | №0059 (+ 7 других файлов) |
| listAllClasses | №0660 |
| listByFamily | №0627 (+ 12 других файлов) |
| listBySource | №0627 (+ 12 других файлов) |
| listClasses | №0660 |
| listEquipment | №0065 |
| listPresets | №0065 |
| listRaces | №0065 |
| listSkins | №0065 |
| listSources | №0080 |
| listSubclasses | №0660 |
| liveBodyAfterReanimation | №0868 |
| liveEpoch | №0864 |
| liveRevision | №0864 |
| living | №0782 |
| livingStatue | №0778 |
| lizard | №0060 |
| lizardfolk | №0671 |
| lo | №0060 |
| load | №0068 (+ 4 других файлов) |
| loaded | №0072 |
| loadFailed | №1283 |
| loading | №0072 (+ 1 других файлов) |
| loadSkin | №0067 |
| local | №0057 (+ 1 других файлов) |
| localBackups | №0652 |
| localId | №0652 |
| localStorage | №1080 (+ 33 других файлов) |
| location | №1120 (+ 3 других файлов) |
| locked | №0073 |
| lockedAt1 | №0668 |
| locks | №0669 |
| log | №0847 |
| login | №0652 |
| logout | №0652 |
| long | №0060 (+ 1 других файлов) |
| longevity | №0077 (+ 1 других файлов) |
| longJumpBonusFt | №0778 |
| longRest | №0077 (+ 1 других файлов) |
| longRestAllHitDice | №0778 |
| longRestClears | №0077 |
| longRestEffects | №0817 |
| longRestExhaustionRecovery | №0778 |
| longRestHealingAllowed | №0868 |
| longRestLimit | №0640 |
| longRestOnRevive | №0778 |
| longRestRedistribute | №0778 |
| longRestTempHp | №0778 |
| longRestUses | №0077 |
| loom | №0066 |
| loot | №0069 (+ 19 других файлов) |
| lootId | №0073 |
| lootModel | №0805 |
| lootModels | №0805 |
| loreRecall | №0778 |
| los | №0655 (+ 1 других файлов) |
| loss | №0851 |
| lossHp | №0640 |
| lost | №0665 |
| Loveless | №0778 |
| low | №0058 |
| lowBlow | №0778 |
| lowest | №0057 (+ 1 других файлов) |
| lowestId | №0817 |
| loxodon | №1300 |
| lucidDreaming | №0778 |
| lucidWaking | №0778 |
| lucky | №0781 |
| lunge | №0778 |
| luxury | №0800 (+ 1 других файлов) |
| lycanthropy | №0076 |
| lyre | №0065 |
| M | №0817 |
| macroConfigSha256 | №1316 |
| macrotargets | №1124 |
| mage_slayer | №0781 |
| mageArmor | №0812 |
| mageArmorAC | №0817 |
| mageBerryCount | №0818 (+ 2 других файлов) |
| mageD20Bonus | №0817 |
| mageDamageType | №0818 (+ 1 других файлов) |
| mageEquipmentChanged | №0817 |
| mageGround | №0818 (+ 1 других файлов) |
| mageInfo | №0817 |
| mageOptions | №0817 |
| mageProgress | №0817 |
| mageSpellId | №0818 (+ 2 других файлов) |
| mageStat | №0818 (+ 1 других файлов) |
| mageTargetIds | №0818 (+ 2 других файлов) |
| mageWilling | №0818 (+ 2 других файлов) |
| magFilter | №0062 (+ 1 других файлов) |
| magic | №0843 (+ 2 других файлов) |
| Magic | №0079 |
| magic_initiate | №0781 |
| magicAdvantage | №0808 |
| magical | №0778 (+ 1 других файлов) |
| magical_beast | №0627 (+ 10 других файлов) |
| magicalAttack | №0640 (+ 4 других файлов) |
| magicalDarkness | №0778 |
| magicalFamiliarAttacks | №0778 |
| magicalSecrets | №0647 |
| magicalTinkering | №0647 |
| magicByAffinity | №0843 |
| magicInteractionSafe | №0778 |
| magicItemAdept | №0647 |
| magicShared | №0843 |
| maintainable | №0778 |
| maintainAction | №0778 |
| majestySplash | №0778 |
| major | №0820 |
| major_00 | №0820 |
| major_01 | №0820 |
| major_02 | №0820 |
| major_03 | №0820 |
| major_04 | №0820 |
| major_05 | №0820 |
| major_06 | №0820 |
| major_07 | №0820 |
| major_08 | №0820 |
| major_09 | №0820 |
| major_10 | №0820 |
| major_11 | №0820 |
| major_12 | №0820 |
| major_13 | №0820 |
| major_14 | №0820 |
| major_15 | №0820 |
| major_16 | №0820 |
| major_17 | №0820 |
| major_18 | №0820 |
| major_19 | №0820 |
| major_20 | №0820 |
| major_21 | №0820 |
| majorCost | №0820 |
| majorCurrent | №0820 |
| majorMax | №0820 |
| majorSpent | №0820 |
| makeWeaponAttack | №0778 |
| male | №0058 (+ 1 других файлов) |
| maleProfile | №0057 |
| malformed | №1130 |
| malformedTargetLines | №1128 (+ 1 других файлов) |
| manifest | №0841 |
| manifestations | №0794 |
| manifested | №0812 |
| manifestUrl | №0841 (+ 2 других файлов) |
| map | №0860 |
| mapId | №0070 |
| mappedDisplacementMax | №1129 |
| mappedDisplacementMean | №1129 |
| mappedDisplacementMedian | №1129 |
| mappedDisplacementP95 | №1129 |
| mappedMaxDisplacement | №1128 |
| mappedMeanDisplacement | №1128 |
| mappedMedianDisplacement | №1128 |
| mappedP95Displacement | №1128 |
| mappedRmsDisplacement | №1128 |
| mappedTargetEntries | №1129 |
| mappedVertices | №1118 |
| mapping | №1268 |
| maps | №0669 (+ 1 других файлов) |
| marble | №0671 |
| marchUntoDestiny | №0802 |
| margin | №1057 |
| mariner | №0778 |
| mark | №0778 |
| marked | №0640 (+ 2 других файлов) |
| markedForDeath | №0778 |
| marketPriceGp | №0798 (+ 1 других файлов) |
| marketReport | №0798 |
| marketSource | №0798 (+ 1 других файлов) |
| marketValue | №0663 (+ 1 других файлов) |
| markPrey | №0778 |
| maroon | №0867 |
| marsh_moss | №0877 |
| marsh_pool | №0877 |
| marsh_reeds | №0877 |
| marshes | №0877 |
| martial_adept | №0781 |
| martialBane | №0778 |
| martialFocus | №0778 |
| masks | №0060 |
| mason | №0669 (+ 3 других файлов) |
| master | №0669 |
| masterOfHell | №0697 |
| masterSpecialization | №0669 |
| masterTactician | №0778 |
| masterwork | №0664 (+ 1 других файлов) |
| masterworkBonus | №0668 |
| mastery | №0079 (+ 2 других файлов) |
| masteryExpiry | №0778 |
| masterySpent | №0778 |
| MAT2 | №0067 (+ 2 других файлов) |
| MAT3 | №0067 (+ 2 других файлов) |
| MAT4 | №0067 (+ 4 других файлов) |
| matched | №0801 |
| material | №0057 (+ 23 других файлов) |
| materialBridge | №0805 |
| materialCost | №0077 |
| materialCostGP | №0812 |
| materialCostPerLevelGP | №0812 |
| materialCount | №0664 |
| materialId | №0663 (+ 11 других файлов) |
| materialKind | №0061 |
| materialOnly | №0792 |
| materials | №0061 (+ 48 других файлов) |
| MATERIALS | №1111 (+ 13 других файлов) |
| materialsCost | №0077 |
| materialsPaid | №1079 |
| materialsUsed | №0664 |
| Math | №1105 (+ 3 других файлов) |
| maturity | №0058 (+ 1 других файлов) |
| max | №0060 (+ 51 других файлов) |
| max_mm | №1092 |
| max_morph_targets | №1121 |
| maxAbility | №0077 (+ 1 других файлов) |
| maxBloodLevels | №0812 |
| maxBuffer | №1312 |
| maxCR | №0778 (+ 1 других файлов) |
| maxDice | №0778 |
| maxDisplacementMeters | №1123 |
| maxDistanceFt | №0778 |
| maxExtraShredPsi | №0778 |
| maxHeal | №0778 |
| maxHitDice | №0778 |
| maxHitPoints | №1223 |
| maxHp | №0077 (+ 68 других файлов) |
| maxHP | №0783 (+ 3 других файлов) |
| maxHpReduction | №0778 |
| maxHpReductionOnNecrotic | №0778 |
| maximize | №0647 (+ 3 других файлов) |
| maximizeAttack | №0817 |
| maximized | №0654 (+ 1 других файлов) |
| maximizeDamageDice | №0647 (+ 1 других файлов) |
| maximizeElementalSpell | №0778 |
| maximizeNextAttack | №0817 |
| maximizeNextRoll | №0817 |
| maximum | №0077 |
| maxIntelligence | №0828 |
| maxLevels | №0647 (+ 1 других файлов) |
| maxObjects | №0778 |
| maxOutside | №1268 |
| maxPoints | №0623 (+ 1 других файлов) |
| maxPotions | №0077 |
| maxScore | №0778 |
| maxSizeFt | №0778 |
| maxSlots | №0843 |
| maxSpellLevel | №0802 |
| maxSpellLevelByLevel | №0802 |
| maxSpend | №0808 |
| maxSpendTempHp | №0778 |
| maxStages | №0077 |
| maxStrands | №0058 |
| maxStrDexCon | №0778 |
| maxTargets | №0778 |
| maxUses | №0653 |
| maxWeightLb | №0778 |
| me | №1139 (+ 9 других файлов) |
| measureStartId | №0625 |
| mechanics | №0676 (+ 16 других файлов) |
| mechanicsPending | №0870 (+ 1 других файлов) |
| mechanicsSource | №0700 (+ 3 других файлов) |
| mechanicsStatus | №0687 |
| medicine | №0669 (+ 3 других файлов) |
| medium | №0058 (+ 2 других файлов) |
| mediumArmorWisInsteadOfDex | №0778 |
| meleeAttack | №0778 (+ 1 других файлов) |
| meleeDamage | №0812 |
| meleeExtraDamage | №0778 |
| meleeOrThrown | №0655 (+ 1 других файлов) |
| meleeSpellAttack | №0778 |
| meleeWeaponAttack | №0778 |
| members | №0773 |
| menacingShout | №0778 |
| mentalAny | №0871 |
| mentalConstruct | №0778 |
| mentalDefense | №0775 |
| mentalSavesDisadvantage | №0778 |
| mentalSource | №0815 |
| mentalStats | №0783 |
| mentalStatsPersist | №0783 |
| mentor | №0738 (+ 2 других файлов) |
| mercenary | №0778 |
| merciless | №0778 |
| mercy | №0802 |
| mesh | №1119 (+ 1 других файлов) |
| meshes | №0062 (+ 5 других файлов) |
| meshWeights | №0068 (+ 1 других файлов) |
| message | №0076 (+ 33 других файлов) |
| messy | №0060 |
| messy_crop | №0060 (+ 1 других файлов) |
| meta | №0850 |
| META_COST | №0647 |
| META_NAMES | №0647 |
| metadata | №0077 (+ 12 других файлов) |
| metal | №0061 (+ 1 других файлов) |
| metalworker | №0669 |
| metamagic | №0647 |
| metamagic_adept | №0781 |
| metamorphosesKnown | №0647 |
| metamorphosesMax | №0647 |
| metamorphosis | №0076 |
| method | №0652 (+ 3 других файлов) |
| metrics | №0062 |
| mettle | №0654 (+ 2 других файлов) |
| mid | №0862 |
| mimic | №0685 |
| min | №0060 (+ 17 других файлов) |
| minAppVersion | №0841 (+ 1 других файлов) |
| minAt11 | №0778 |
| Mind | №0079 |
| mindLeech | №0778 |
| mindRead | №0775 |
| mindReadingImmunity | №0778 |
| mindsightFt | №0778 |
| mindsightTrackingHours | №0778 |
| mindStats | №0815 |
| mindThrust | №0778 |
| miner | №0800 (+ 1 других файлов) |
| mineral | №0825 |
| minFilter | №0062 (+ 1 других файлов) |
| minHeight | №0885 |
| minimal | №0065 |
| minimum | №0077 (+ 3 других файлов) |
| minimumAC | №0778 |
| minimumD20 | №0778 |
| minIndex | №1130 |
| mining | №0824 (+ 1 других файлов) |
| minion | №0778 |
| minionResistance | №0778 |
| minionRollBonus | №0778 |
| minionTypes | №0778 |
| minLevel | №0671 |
| minor | №0820 |
| minotaur | №1300 |
| minPsi | №0778 |
| minStr | №0083 |
| minusD4AllD20 | №0778 |
| minutesSinceDeath | №1079 |
| minWidth | №0885 |
| miracle | №0812 |
| miraculousHealing | №0802 |
| miserableCompany | №0778 |
| misfortune | №0076 (+ 1 других файлов) |
| miss | №0778 |
| missed | №0834 |
| missedUnarmedExtraAttack | №0778 |
| missing | №0663 (+ 5 других файлов) |
| missingTools | №0667 (+ 2 других файлов) |
| missRecoveryMinutes | №0778 |
| missRefund | №0778 |
| missRefunds | №0808 |
| mistAffinity | №0628 |
| mistStep | №0812 |
| mithral | №0667 |
| mitosis | №0838 |
| mix | №0080 |
| mixBonus | №1171 |
| mixedPotions | №0778 |
| mixPotions | №0077 |
| mobility | №0640 |
| Mobility | №0778 |
| mod | №0826 (+ 1 других файлов) |
| mode | №0058 (+ 17 других файлов) |
| model | №0069 (+ 2 других файлов) |
| modelFamily | №0065 |
| modelLoc | №0072 |
| models | №1772 |
| modes | №0827 |
| modifier | №0800 (+ 5 других файлов) |
| modifierAtLevel20 | №0828 |
| modifierIds | №0673 |
| modifiers | №0778 (+ 2 других файлов) |
| modifyStats | №0817 |
| modules | №0852 |
| mohawk | №0060 (+ 1 других файлов) |
| monastery | №0066 |
| monster | №0805 (+ 3 других файлов) |
| monster_acid_slime | №0825 |
| monster_acolyte_cloth | №0825 |
| monster_air_essence | №0825 |
| monster_air_vortex | №0825 |
| monster_ankheg_acid_gland | №0825 |
| monster_ankheg_shell | №0825 |
| monster_bandit_captain_leather_armor | №0825 |
| monster_bandit_hide | №0825 |
| monster_basilisk_eye | №0825 |
| monster_basilisk_gallstone | №0825 |
| monster_basilisk_scale | №0805 |
| monster_bear_fat | №0825 |
| monster_bear_hide | №0825 |
| monster_blink_dog_pelt | №0825 |
| monster_blink_dog_phase_gland | №0825 |
| monster_boar_hide | №0825 |
| monster_boar_tusk | №0825 |
| monster_bugbear_fang | №0825 |
| monster_bugbear_hide | №0825 |
| monster_carrion_chitin | №0825 |
| monster_carrion_crawler_paralytic | №0825 |
| monster_constrictor_hide | №0825 |
| monster_constrictor_venom | №0825 |
| monster_crocodile_hide | №0825 |
| monster_crocodile_teeth | №0825 |
| monster_cultist_cloth | №0825 |
| monster_deer_antler | №0825 |
| monster_deer_hide | №0825 |
| monster_direwolf_fang | №0825 |
| monster_direwolf_hide | №0805 (+ 1 других файлов) |
| monster_displacer_hide | №0825 |
| monster_displacer_tentacle | №0825 |
| monster_dragon_blood | №0805 |
| monster_dragon_bones | №0805 (+ 1 других файлов) |
| monster_dragon_heart | №0825 |
| monster_dragon_scales | №0805 (+ 1 других файлов) |
| monster_earth_core | №0825 |
| monster_earth_essence | №0825 |
| monster_ectoplasm | №0825 |
| monster_ethereal_shard | №0825 |
| monster_fire_ash | №0825 |
| monster_fire_essence | №0825 |
| monster_frog_gland | №0825 |
| monster_frog_skin | №0825 |
| monster_ghost_thread | №0825 |
| monster_ghoul_claw | №0825 |
| monster_ghoul_tissue | №0825 |
| monster_giant_eagle_claw | №0825 |
| monster_giant_eagle_feather | №0825 |
| monster_giant_owl_eye | №0825 |
| monster_giant_owl_feather | №0825 |
| monster_gnoll_hide | №0825 |
| monster_gnoll_tooth | №0825 |
| monster_goblin_hide | №0825 |
| monster_harpy_vocal_membrane | №0825 |
| monster_hyena_fangs | №0825 |
| monster_hyena_hide | №0825 |
| monster_kobold_horn | №0825 |
| monster_kobold_scalehide | №0825 |
| monster_manticore_hide | №0825 |
| monster_manticore_meat | №0825 |
| monster_manticore_spines | №0805 |
| monster_meat | №0825 |
| monster_mimic_skin | №0825 |
| monster_mimic_slime | №0825 |
| monster_orc_hide | №0825 |
| monster_owlbear_claw | №0825 |
| monster_owlbear_feathers | №0805 |
| monster_owlbear_hide | №0805 (+ 1 других файлов) |
| monster_rat_fangs | №0825 |
| monster_rat_hide | №0825 |
| monster_rust_chitin | №0825 |
| monster_rust_gland | №0825 |
| monster_shadow_clot | №0825 |
| monster_slime_membrane | №0825 |
| monster_spectral_dust | №0825 |
| monster_spider_chitin | №0805 |
| monster_spider_silk | №0805 (+ 1 других файлов) |
| monster_spider_venom | №0825 |
| monster_troll_blood | №0805 (+ 1 других файлов) |
| monster_troll_claw | №0825 |
| monster_troll_hide | №0805 (+ 1 других файлов) |
| monster_veteran_leather_armor | №0825 |
| monster_water_core | №0825 |
| monster_water_essence | №0825 |
| monster_wight_bone | №0825 |
| monster_wight_essence | №0825 |
| monster_wolf_hide | №0805 (+ 1 других файлов) |
| monsterCount | №0804 |
| monsterCR | №0807 |
| monsterId | №0782 (+ 5 других файлов) |
| monsterName | №0810 |
| monsterparts | №0800 (+ 1 других файлов) |
| MONSTERS | №0654 |
| monstrosity | №0627 (+ 13 других файлов) |
| monstrousGrafts | №0077 |
| monstrousMenagerie | №0778 |
| monstrousMinion | №0775 (+ 1 других файлов) |
| moonEffects | №0812 |
| morph_names | №1121 |
| morph_primitives | №1121 |
| morphAccessor | №1118 |
| morphBufferView | №1118 |
| morphChannels | №0067 (+ 1 других файлов) |
| morphNames | №0068 (+ 2 других файлов) |
| morphs | №0065 (+ 3 других файлов) |
| morphSet | №0065 |
| morphTargets | №0068 (+ 1 других файлов) |
| morphWeights | №0065 |
| mount | №0808 |
| mountaineer | №0778 |
| mountainsEndurance | №0778 |
| mountCantripSwap | №0808 |
| mounted | №0812 |
| mountRollBonus | №0778 |
| mountSpeed | №0808 |
| moustache | №0062 (+ 3 других файлов) |
| mouth | №0060 |
| mouthWidth | №0065 (+ 1 других файлов) |
| moveAlliesHalfSpeed | №0778 |
| moveAndAttack | №0778 |
| moveCostFt | №0077 |
| moved | №0862 |
| movedFt | №0817 |
| moveFt | №0685 (+ 4 других файлов) |
| moveHalfSpeed | №0640 |
| movement | №0077 (+ 19 других файлов) |
| movementAllowance | №0817 |
| movementUsed | №0077 (+ 14 других файлов) |
| movementWithoutOpportunityAttacks | №0812 |
| moveReward | №0817 |
| moveStraightFt | №0778 |
| moveThralls | №0808 |
| moveThroughCreatures | №0778 |
| moveThroughProneCreatures | №0778 |
| moveTo | №0810 (+ 1 других файлов) |
| moveToward | №0655 |
| moving | №0060 |
| moxie | №0715 (+ 2 других файлов) |
| moxieFraction | №0775 |
| moxieFueledFists | №0715 |
| moxieOnFail | №0778 |
| moxieRefunded | №0778 |
| moxieRestored | №0778 |
| moxieSpent | №0778 |
| msg | №0848 (+ 1 других файлов) |
| muddledMind | №0640 |
| mufflingImprecation | №0778 |
| mult | №0666 (+ 1 других файлов) |
| multiAttackAction | №0654 (+ 1 других файлов) |
| multiclass | №0077 (+ 7 других файлов) |
| multiclassAllowed | №0645 (+ 7 других файлов) |
| multiclassProficiencies | №0676 (+ 6 других файлов) |
| multiclassRequirement | №0076 (+ 18 других файлов) |
| multiplier | №0804 |
| mummification | №0778 |
| mummyLord | №0778 |
| mummyRot | №0778 |
| muscle | №0062 (+ 5 других файлов) |
| mutagen | №0640 (+ 2 других файлов) |
| mutagenAbility | №0077 |
| mutagencraft | №0640 |
| mutagenMaximum | №0077 |
| mutagenNoDownside | №0077 |
| mutagens | №0640 (+ 1 других файлов) |
| mutations | №0815 (+ 2 других файлов) |
| mutationSlots | №0815 (+ 1 других файлов) |
| muzzle | №0060 |
| muzzleHeight | №0065 (+ 7 других файлов) |
| muzzleLength | №0065 (+ 9 других файлов) |
| muzzleWidth | №0065 (+ 7 других файлов) |
| myconid | №1292 |
| mysteries | №0706 (+ 1 других файлов) |
| mystery | №0812 |
| mysticArcanum | №0647 |
| mysticEmpowerment | №0832 |
| mysticFrenzy | №0640 |
| mythicForms | №0832 |
| mythicVoice | №0778 |
| n | №0057 (+ 4 других файлов) |
| name | №0059 (+ 236 других файлов) |
| NAME | №0665 |
| nameRu | №0623 (+ 8 других файлов) |
| nameRus | №1054 |
| names | №1169 (+ 1 других файлов) |
| narrow | №0060 (+ 2 других файлов) |
| native | №0809 (+ 1 других файлов) |
| nativeHeadH | №0060 |
| natural | №0065 |
| natural20 | №0810 (+ 1 других файлов) |
| naturalArmor | №0832 |
| naturalAttacks | №0815 (+ 1 других файлов) |
| naturalExplorer | №0647 |
| naturalist | №0828 |
| naturalRecovery | №0815 |
| naturalWeapons | №0832 |
| nature | №0771 (+ 2 других файлов) |
| Nausea | №0079 |
| navigation | №0775 |
| navigator | №1110 (+ 9 других файлов) |
| navigatorCrew | №0778 |
| navy | №0867 |
| nearAllyId | №0817 (+ 1 других файлов) |
| neck | №0060 (+ 2 других файлов) |
| neckDepth | №1089 (+ 2 других файлов) |
| neckline | №1089 (+ 1 других файлов) |
| necrodancer | №0808 |
| necromancyDamageBonusPerCharnel | №0808 |
| necromancyUnleashed | №0808 |
| necromanticSpurs | №0778 |
| necromanticSustainment | №0778 |
| necrotic | №0775 (+ 1 других файлов) |
| Necrotic | №0079 |
| necroticAffinity | №0812 |
| necroticBone | №0825 |
| necroticDamage | №0775 (+ 2 других файлов) |
| necroticEssence | №0825 |
| necroticIgnoreImmunity | №0808 |
| necroticIgnoreResistance | №0808 |
| necroticReagent | №0825 |
| need | №0671 |
| needsChoice | №0077 |
| needsConfirmation | №0077 |
| needsDonor | №0077 |
| needsMaterials | №0077 |
| needsRoll | №0077 |
| needsSubclassChoice | №0699 |
| needsTarget | №0077 |
| needsTime | №0077 |
| negatingAnathema | №0778 |
| negative | №1080 (+ 3 других файлов) |
| negotiated | №0800 |
| negotiatedPrice | №0800 |
| negotiatedQuote | №0800 |
| negotiationModifier | №0800 |
| network | №0847 (+ 2 других файлов) |
| neutral | №0064 |
| newDraft | №0860 |
| newJinxOptions | №0778 |
| newTraderIds | №0799 |
| newValue | №0810 |
| next | №0057 (+ 2 других файлов) |
| nextAttackAdvantage | №0640 (+ 1 других файлов) |
| nextAttackBonus | №0778 |
| nextAttackExtraDice | №0077 |
| nextBombOnly | №0077 |
| nextConcentrationSaveDisadvantage | №0640 |
| nextDamageDice | №0778 |
| nextHitCrit | №0778 |
| nextRiteHitExtraDie | №0640 |
| nextRollMaximum | №0817 |
| nextSaveAdvantage | №0778 |
| nextSpellOrWeaponDamageDisadvantage | №0778 |
| nextTick | №0077 (+ 1 других файлов) |
| nextWisSaveDisadvantage | №0640 |
| night | №0072 |
| nighteye | №0640 |
| Nighteye | №0778 |
| nightforest | №0062 |
| nightmareMount | №0808 |
| nightTerrors | №0778 |
| nightTerrorsWhileAsleep | №0778 |
| noAction | №0778 |
| noActions | №0817 |
| noAging | №0778 |
| noAttacks | №0817 (+ 1 других файлов) |
| Noble | №0794 |
| noConcentrationCheck | №0802 |
| noCoverOrInvisibility | №0640 |
| noDamage | №0077 |
| noDash | №0778 |
| node | №0067 (+ 3 других файлов) |
| nodeId | №0877 |
| nodeIntegration | №0885 |
| nodes | №0877 (+ 7 других файлов) |
| noDisadvantage | №0778 |
| noDisengage | №0817 |
| noFallDamage | №0778 |
| noFoodOrDrink | №0778 |
| noForcedMovement | №0817 (+ 1 других файлов) |
| noFreeWill | №0868 |
| noHealing | №0778 |
| noHealingFromOwnSpells | №0802 |
| noHealingUntilStartNextTurn | №0778 |
| noHelp | №0817 |
| noHide | №0061 (+ 1 других файлов) |
| noMainAction | №0817 (+ 1 других файлов) |
| noMaintainAction | №0778 |
| noMovement | №0817 |
| nonAttackAccursedDamageBonus | №0778 |
| nonCombat | №0656 |
| none | №0065 (+ 1 других файлов) |
| nonlethal | №0077 |
| nonmagicalDamageReduction | №0778 |
| nonManifold | №1094 |
| nonZeroMappedGlbVertexPct | №1128 |
| nonZeroMappedGlbVertices | №1128 |
| nonZeroPct | №1118 |
| nonZeroTargetEntries | №1129 |
| nonZeroVertices | №1118 |
| noOldAgeDeath | №0812 |
| noOpportunity | №0775 |
| noOpportunityAttacks | №0077 (+ 3 других файлов) |
| noReaction | №0778 (+ 1 других файлов) |
| noReactions | №0640 (+ 4 других файлов) |
| noReduction | №0778 |
| noRest | №0778 |
| normal | №0826 (+ 1 других файлов) |
| normalForm | №0832 |
| normalize | №0058 (+ 6 других файлов) |
| normalizeCharacter | №0783 (+ 3 других файлов) |
| normalizeClassName | №0835 |
| normalizeConditionName | №0826 (+ 2 других файлов) |
| normalizeHead | №0065 |
| normalPaceStealth | №0778 |
| normals | №0060 (+ 2 других файлов) |
| noseLength | №0065 |
| noseWidth | №0065 (+ 1 других файлов) |
| noShield | №0778 |
| noSpells | №0817 |
| noStandardHealing | №0838 |
| noSurprise | №0778 |
| notation | №0828 |
| note | №0654 (+ 8 других файлов) |
| noteAffect | №0817 |
| noteD20Roll | №0817 |
| noteMove | №0817 |
| notes | №0623 (+ 29 других файлов) |
| noTransfer | №0817 |
| noUnderwaterDrawbacks | №0778 |
| nourishing | №0778 |
| noVerbal | №0817 (+ 1 других файлов) |
| npcs | №1220 |
| nTexture | №0075 |
| nuclearBomb | №0676 |
| nullification | №0778 |
| number | №0820 |
| numerator | №0820 |
| nylon | №0061 |
| oak | №0671 (+ 1 других файлов) |
| objectId | №0778 (+ 2 других файлов) |
| objectIds | №1169 |
| objectMeleeDamageMultiplier | №0778 |
| objects | №0070 (+ 1 других файлов) |
| obscured | №0685 |
| observe | №0640 |
| obstacles | №1135 (+ 10 других файлов) |
| obstinateAnathema | №0778 |
| occultFetish | №0812 |
| occultRitesKnown | №0706 |
| ocean | №0062 |
| odds | №0820 |
| offer | №0820 |
| offeredCp | №0800 (+ 1 других файлов) |
| official | №0659 (+ 1 других файлов) |
| official_expansion | №0627 |
| offline | №0851 (+ 1 других файлов) |
| oil | №0077 |
| oilBomb | №0778 |
| oilCoated | №0077 |
| ok | №0831 (+ 79 других файлов) |
| old | №0810 |
| oldFormat | №1147 |
| oldLevel | №0669 |
| oldOneTwo | №0778 |
| omnipotence | №0778 (+ 1 других файлов) |
| omnipresence | №0778 (+ 1 других файлов) |
| omniscience | №0778 (+ 1 других файлов) |
| onApply | №0842 |
| onAttackResult | №0076 (+ 8 других файлов) |
| once | №0081 (+ 6 других файлов) |
| oncePerLongRest | №0802 |
| oncePerTurn | №0077 (+ 1 других файлов) |
| onChange | №0652 |
| onclick | №1227 |
| onCondition | №0640 (+ 5 других файлов) |
| onDamage | №0640 (+ 4 других файлов) |
| onDefeat | №0782 |
| onePerShortRest | №0808 |
| oneThirdCaster | №0778 |
| onFail | №0773 (+ 1 других файлов) |
| ongoingDamage | №0685 |
| onHitSave | №0817 |
| onLine | №1110 (+ 1 других файлов) |
| onlyDeadBodies | №0868 |
| onlyMisfortuneFeatures | №0778 |
| onNatural1 | №0077 |
| onPreyDeath | №0778 |
| onProgress | №0841 |
| onRetry | №0842 |
| onSave | №0778 |
| onSavingThrow | №0647 (+ 1 других файлов) |
| onTurnEnd | №0076 (+ 10 других файлов) |
| ooze | №0773 |
| opacity | №0060 (+ 1 других файлов) |
| open | №0059 (+ 27 других файлов) |
| OPENAI_API_KEY | №1076 |
| openBoard | №0860 |
| openDebug | №0847 |
| openHandTechnique | №0810 |
| openInfo | №0665 |
| openLog | №0847 |
| openMainMenuUpdate | №0841 |
| openMind | №0778 |
| openReplay | №0846 |
| openTrade | №0800 |
| operationId | №0817 (+ 20 других файлов) |
| opportunityAdvantage | №0817 |
| opportunityAttack | №0817 (+ 3 других файлов) |
| opportunityAttackBecomesGrapple | №0778 |
| optics | №0669 |
| optional | №0794 |
| optionalSlotDice | №0778 |
| options | №0061 (+ 7 других файлов) |
| optionsFor | №0061 |
| opts | №0810 (+ 1 других файлов) |
| oracle | №0640 (+ 2 других файлов) |
| Oracle | №0706 |
| orange | №0831 |
| orcish_fury | №0781 |
| orcsteppe | №0062 |
| order | №0640 (+ 1 других файлов) |
| orders | №0687 (+ 1 других файлов) |
| organ | №0825 |
| organic | №0062 |
| origin | №0072 |
| original | №0077 |
| originalStats | №0815 (+ 1 других файлов) |
| originRaceId | №0065 (+ 1 других файлов) |
| ostorianDiscourse | №0778 |
| other | №1087 (+ 1 других файлов) |
| otherStyleEffectsPending | №0871 |
| otherworldlyPatron | №0640 |
| outcome | №0671 (+ 1 других файлов) |
| outcomeLabel | №0671 |
| outer | №0057 (+ 2 других файлов) |
| outlandsEligible | №0631 |
| outOfOrder | №0851 |
| output | №0666 (+ 7 других файлов) |
| outputBytes | №1118 |
| oval | №0062 (+ 1 других файлов) |
| oven | №0066 |
| overCorset | №0061 |
| overCuirass | №0061 |
| overflow | №1279 |
| overheat | №0778 |
| overheatIgnoresImmunity | №0778 |
| overlay | №0842 |
| overlord | №0808 |
| overpayCp | №0801 |
| owl | №0060 |
| owlbear | №0685 |
| own | №1137 |
| ownedCondition | №0817 |
| owner | №1080 |
| owner_id | №1110 |
| ownerId | №0077 (+ 9 других файлов) |
| ownerPeerId | №1163 (+ 7 других файлов) |
| ownerTokenId | №0077 (+ 4 других файлов) |
| ownerTurns | №0640 |
| ownTurnId | №0820 (+ 1 других файлов) |
| ox | №0071 |
| oy | №0071 |
| p | №0057 (+ 2 других файлов) |
| p_deleted | №0652 |
| p_expected_revision | №0652 |
| p_id | №0652 |
| p_operation_id | №0652 |
| p_profile | №0652 |
| p_schema_version | №0652 |
| p1 | №1226 (+ 3 других файлов) |
| p2 | №1226 |
| pa | №1163 |
| pack | №0062 (+ 7 других файлов) |
| PACK_ID | №0077 (+ 2 других файлов) |
| packId | №0660 |
| packleader | №0778 |
| Packleader | №0794 |
| packs | №0775 (+ 2 других файлов) |
| packTactics | №0778 |
| pact | №0826 (+ 1 других файлов) |
| pactBoon | №0647 |
| pactLevel | №0797 |
| pactMagic | №0640 (+ 3 других файлов) |
| pactMagicData | №0810 (+ 4 других файлов) |
| padding | №0670 |
| paid_api_authorized | №1076 |
| painkiller | №0778 |
| painkillerGrandStrategist | №0778 |
| painkillerPunishment | №0778 |
| paint | №0077 |
| paintBomb | №0778 |
| paintCreatures | №0077 |
| painter | №0669 (+ 3 других файлов) |
| paintV38 | №0671 |
| paladin | №0797 (+ 1 других файлов) |
| paleMaster | №0808 |
| panelScroll | №1279 |
| panelUV | №0061 |
| panX | №0069 (+ 2 других файлов) |
| panY | №0069 (+ 2 других файлов) |
| paper | №0667 (+ 2 других файлов) |
| Paragon | №0794 |
| paragonOfChivalry | №0778 |
| paralyticReagent | №0825 |
| paralyzed | №0778 (+ 1 других файлов) |
| parasiteMind | №0815 |
| parchment | №0667 (+ 2 других файлов) |
| parent | №0819 |
| parentContainerId | №0788 |
| parentId | №0838 |
| parentNode | №1227 |
| parentTriangles | №1285 (+ 3 других файлов) |
| parley | №0778 |
| parleyFree | №0778 |
| parseDice | №0826 (+ 5 других файлов) |
| part | №0064 |
| partial | №0058 |
| participantTurnStart | №0817 |
| partnerId | №0817 |
| parts | №0057 (+ 13 других файлов) |
| pass | №0853 |
| passesThroughCreatures | №0778 |
| passive | №0062 (+ 9 других файлов) |
| password | №0652 |
| patch | №0664 (+ 1 других файлов) |
| path | №0066 (+ 32 других файлов) |
| pathCost | №1240 (+ 1 других файлов) |
| pathFt | №0810 |
| patientDefense | №0647 |
| patron | №0640 (+ 5 других файлов) |
| patrons | №0640 |
| patternScale | №0061 |
| pauldrons | №0061 |
| pawPadColor | №0065 |
| payHitPointCost | №0654 |
| payload | №0810 (+ 16 других файлов) |
| payOwnHPForCharnel | №0808 |
| PB | №0783 (+ 3 других файлов) |
| pc | №0809 |
| pd | №1163 |
| peaceAura | №0817 (+ 2 других файлов) |
| peaceBlocked | №0654 (+ 1 других файлов) |
| peakPhysicalCondition | №0715 (+ 1 других файлов) |
| pectorals | №0062 (+ 1 других файлов) |
| peer | №0810 |
| peerId | №1217 |
| peerName | №0809 |
| penaltyPerFatigue | №0778 |
| pending | №0077 (+ 3 других файлов) |
| pendingAnswer | №0809 |
| pendingAttack | №0654 (+ 1 других файлов) |
| pendingDamage | №0640 (+ 3 других файлов) |
| pendingInitiativeBonus | №0817 |
| pendingOffer | №0809 |
| pendingOnHit | №0077 (+ 3 других файлов) |
| pendingReaction | №0810 |
| pendingReactions | №0810 (+ 1 других файлов) |
| pendingSelection | №0647 |
| penetratesResistance | №0778 |
| penetratingDice | №0778 |
| pentacles | №0817 (+ 1 других файлов) |
| pentacles_14 | №0817 |
| percent | №0820 |
| perception | №0771 (+ 1 других файлов) |
| Perception | №0079 |
| perceptionReagent | №0825 |
| percipient | №0640 |
| Percipient | №0778 |
| perfectSelf | №0647 |
| performance | №0771 (+ 3 других файлов) |
| perilousGambit | №0778 |
| permanentCurse | №0778 |
| persistent | №0778 |
| persistentRage | №0647 |
| persona | №0778 |
| persuasion | №0771 (+ 2 других файлов) |
| persuasionDeceptionIntimidationFloor | №0778 |
| perTargetLongRest | №0778 |
| perTurn | №0808 |
| petrification | №0778 |
| Petrification | №0079 |
| petrificationReagent | №0825 |
| pharaoh | №0808 |
| phase | №0060 (+ 3 других файлов) |
| phaseFiber | №0825 |
| phaseReagent | №0825 |
| phaseRift | №0778 |
| phaseRiftNoStraightLine | №0778 |
| phaseThrough | №0778 |
| phaseWeaponAttack | №0778 |
| philosophersStone | №0676 |
| physicalAndroidQA | №1123 |
| physicalResistance | №0838 |
| physicalStats | №0783 (+ 1 других файлов) |
| physicalStatsFromShell | №0783 |
| physician | №0828 |
| pickFloor | №0072 |
| pickLevel | №0076 (+ 17 других файлов) |
| piercing | №0870 |
| pigment | №0671 |
| pineResin | №0672 |
| pissAndVinegar | №0715 |
| pitch | №0069 (+ 1 других файлов) |
| pixie | №0060 (+ 1 других файлов) |
| pl | №0072 |
| placeToken | №0860 |
| plague | №0838 |
| plagueLord | №0808 |
| plain | №0662 |
| plan | №0810 (+ 1 других файлов) |
| planar | №0631 |
| planarInfluence | №0631 |
| planes | №0631 |
| planescape | №0631 |
| planned | №0659 |
| planPreview | №0625 |
| plant | №0627 (+ 11 других файлов) |
| plasmoid | №1292 |
| plateColor | №0065 (+ 1 других файлов) |
| plates | №0065 |
| plateSize | №0065 (+ 2 других файлов) |
| play | №0817 (+ 1 других файлов) |
| playerAction | №1227 |
| playfair | №0831 |
| playing | №0081 (+ 1 других файлов) |
| playingTheOdds | №0778 |
| pleats | №0061 (+ 3 других файлов) |
| plusDex | №0812 |
| pockets | №0627 (+ 18 других файлов) |
| pocketSand | №0778 |
| point | №0060 (+ 2 других файлов) |
| pointerId | №1080 |
| points | №0060 (+ 1 других файлов) |
| poison | №0647 (+ 3 других файлов) |
| poisonBypass | №0812 |
| poisoned | №0808 (+ 1 других файлов) |
| poisoner | №0671 (+ 3 других файлов) |
| poisonIgnoresImmunity | №0808 |
| poisonIgnoresResistance | №0808 |
| poisonOnCharnel | №0808 |
| poisonResistance | №0775 |
| polearm_master | №0781 |
| polyglot | №0778 (+ 1 других файлов) |
| ponytail | №0060 (+ 1 других файлов) |
| pool | №0808 (+ 1 других файлов) |
| poor | №0664 (+ 1 других файлов) |
| porcelainClay | №0672 |
| portalAffinity | №0631 |
| portalRoute | №0631 |
| pos | №0072 |
| pose | №0065 |
| poseBuilds | №0062 |
| poses | №0064 |
| position | №0060 (+ 10 других файлов) |
| POSITION | №0063 (+ 6 других файлов) |
| positions | №0057 (+ 11 других файлов) |
| positive | №1080 (+ 3 других файлов) |
| Possessed | №0778 |
| possession | №0076 (+ 1 других файлов) |
| possessLiving | №0783 |
| postMessage | №0886 |
| pot | №0066 |
| potash | №0672 |
| potency | №0079 (+ 1 других файлов) |
| Potency | №0778 |
| potentObservation | №0828 |
| potion | №0077 (+ 4 других файлов) |
| potionBrewing | №0676 |
| potionCap | №0808 |
| potionColor | №0077 (+ 1 других файлов) |
| potionMixologist | №0676 |
| potions | №0077 |
| potter | №0669 (+ 3 других файлов) |
| pottery | №0667 (+ 1 других файлов) |
| power | №0060 (+ 2 других файлов) |
| powerOfTwo | №0062 |
| powerPreference | №0072 |
| pp | №0789 (+ 6 других файлов) |
| pPerG | №1771 |
| precedence | №0853 |
| precision | №0640 |
| Precision | №0778 |
| precisionStrike | №0778 |
| precognition | №0778 |
| predatoryInstinct | №0778 |
| predictiveDodge | №0778 |
| predictorCardId | №1155 (+ 1 других файлов) |
| predictorMajor | №1156 |
| predictorState | №1110 |
| preload | №0885 |
| prepare | №0064 (+ 1 других файлов) |
| prepared | №0077 (+ 4 других файлов) |
| preparedActions | №0810 (+ 1 других файлов) |
| preparedByLevel | №0802 (+ 1 других файлов) |
| preparedClasses | №0835 |
| preparedLastStand | №0817 |
| preparedLimit | №0835 |
| preparedReactionAttack | №0647 |
| preparedSpells | №0802 (+ 1 других файлов) |
| prepareForLibrary | №0070 |
| prepareInspiration | №0817 |
| prerequisite | №0687 (+ 6 других файлов) |
| present | №0832 (+ 1 других файлов) |
| preserved | №0778 |
| preserveLife | №0647 (+ 1 других файлов) |
| preset | №0062 (+ 5 других файлов) |
| presetId | №0065 (+ 1 других файлов) |
| presets | №0065 (+ 1 других файлов) |
| press | №0066 |
| preSubclassBase | №0820 |
| pretendToBeVisual | №1133 |
| preventDropToZero | №0778 |
| preventExhaustion | №0778 |
| preventOpportunity | №0817 |
| preventsOpportunity | №0817 |
| preventZero | №0778 |
| preventZeroHp | №0685 |
| preview | №0070 |
| previewDisassembly | №0663 |
| previous | №0782 (+ 1 других файлов) |
| previousHp | №0654 |
| preyDamage | №0778 |
| price | №0627 (+ 20 других файлов) |
| priceImproved | №1175 |
| priceModifier | №0800 |
| primalChampion | №0647 |
| primalResilience | №0832 |
| primary | №0831 |
| primaryAbilities | №0077 (+ 4 других файлов) |
| primaryResourceId | №0080 |
| primaryStat | №0076 (+ 31 других файлов) |
| primeBomb | №0676 |
| primeval | №0778 |
| primevalForm | №0832 |
| primevalResurgence | №0832 |
| primitives | №1119 (+ 1 других файлов) |
| primordial | №0685 |
| priority | №0647 (+ 2 других файлов) |
| prismatic | №0077 |
| prismaticBomb | №0778 |
| prismaticIndex | №1079 |
| pristine | №0663 (+ 1 других файлов) |
| privileges | №0885 |
| processedEach | №0662 |
| processedId | №0825 |
| processedRuns | №0662 |
| processedUnit | №0825 |
| processing | №0671 (+ 1 других файлов) |
| prodigy | №0671 |
| profBonus | №0623 (+ 20 других файлов) |
| profession | №0669 (+ 4 других файлов) |
| professionBonus | №1171 |
| professionIds | №0669 |
| professionProfile | №0080 |
| professionRequirements | №0669 |
| PROFESSIONS | №0669 |
| proficiencies | №0645 (+ 11 других файлов) |
| proficiency | №0745 (+ 5 других файлов) |
| proficiencyBonus | №0657 (+ 13 других файлов) |
| proficiencyIfUntrained | №0817 |
| proficiencyRank | №1153 |
| proficiencyType | №0083 |
| proficient | №0646 (+ 6 других файлов) |
| profile | №0060 (+ 15 других файлов) |
| profileResources | №0810 |
| prog | №0072 |
| progression | №0648 (+ 15 других файлов) |
| progressionSource | №0700 (+ 3 других файлов) |
| project | №1266 (+ 1 других файлов) |
| projectedWeaponBonus | №0778 |
| projectile | №0654 (+ 3 других файлов) |
| projection | №0778 (+ 3 других файлов) |
| projectItem | №0778 |
| projectMobility | №0640 |
| projectPoint | №0072 |
| projectScreen | №0072 |
| projectUrl | №0650 (+ 4 других файлов) |
| projectVariant | №0834 |
| prolificAffliction | №0778 |
| prompt | №1159 (+ 8 других файлов) |
| prone | №0778 (+ 1 других файлов) |
| proneOnHit | №0778 |
| proneOnSuccess | №0778 |
| pronounced | №0058 |
| prop | №0077 |
| properties | №0078 (+ 10 других файлов) |
| propertiesHidden | №0080 |
| property | №0079 |
| proportions | №1124 |
| props | №0673 |
| protectAlly | №0685 |
| protected | №0817 |
| protection | №0775 |
| protector | №0685 |
| protege | №0778 |
| protegeAdvantageAfterExploit | №0778 |
| protegeUpgrade | №0778 |
| provokesNoOpportunity | №0775 |
| provokesOpportunityAttacks | №0817 |
| pseudopodSize | №0065 (+ 1 других файлов) |
| psi | №1167 |
| psiLimit | №0713 (+ 1 других файлов) |
| psiLimitFormula | №0713 |
| Psion | №0794 |
| psionicPredator | №0778 |
| psionSource | №0794 |
| psiPoints | №0713 (+ 2 других файлов) |
| psiPointsMax | №0775 (+ 1 других файлов) |
| psiPointsRest | №0713 |
| psychic | №0870 |
| psychicDamage | №0778 |
| psychicDamagePerTurn | №0778 |
| psychokinetics | №0778 |
| pubic | №0058 (+ 1 других файлов) |
| publishableKey | №0650 (+ 4 других файлов) |
| pulpit | №0066 |
| pupilOpacity | №0065 (+ 2 других файлов) |
| pupilShape | №0062 (+ 2 других файлов) |
| purity | №0079 |
| purple | №0831 (+ 1 других файлов) |
| pursuit | №0828 |
| pushFt | №0077 (+ 2 других файлов) |
| pushProneSaveBonus | №0778 |
| pushRadiusFt | №0778 |
| q | №1129 |
| qty | №0798 (+ 2 других файлов) |
| quality | №0058 (+ 12 других файлов) |
| QUALITY | №0666 |
| QUALITY_GRADES | №0663 |
| QUALITY_TIERS | №0664 |
| qualityBand | №0663 |
| qualityBonus | №0080 (+ 5 других файлов) |
| qualityEffects | №0664 |
| qualityKey | №0663 (+ 1 других файлов) |
| qualityLabel | №0663 |
| qualityMultiplier | №0798 (+ 1 других файлов) |
| qualityOf | №0664 |
| qualityReport | №0663 |
| quantity | №0667 (+ 1 других файлов) |
| quartz | №0672 |
| quartzForm | №0778 |
| query | №0792 |
| querySelector | №1191 |
| querySelectorAll | №1112 (+ 4 других файлов) |
| queued | №0817 |
| queueLastStandAttacks | №0817 |
| quick | №1249 |
| quickBrewing | №0077 (+ 1 других файлов) |
| quickened | №0647 |
| quickPin | №0778 |
| quiet | №0077 |
| quietBomb | №0778 |
| quiveringPalm | №0810 |
| quota_scope | №1261 |
| quote | №0798 |
| r | №0867 (+ 2 других файлов) |
| rabbit | №0060 |
| rabbitEarSize | №0065 (+ 1 других файлов) |
| rabbitTailSize | №0065 (+ 1 других файлов) |
| rabbleRouser | №0778 |
| race | №0785 (+ 7 других файлов) |
| raceId | №0059 (+ 19 других файлов) |
| raceName | №0623 (+ 1 других файлов) |
| races | №1771 |
| raceWarp | №0060 |
| rack | №0066 |
| radial | №0061 |
| radiant | №0870 |
| Radiant | №0079 |
| radiantAttackOrder | №0778 |
| radiantRetaliation | №0808 |
| radiantVsUndead | №0077 |
| radius | №0061 (+ 4 других файлов) |
| radiusBySlot | №0778 |
| radiusFt | №0676 (+ 3 других файлов) |
| radiusIncreaseFt | №0778 |
| radiusMiles | №0077 |
| rage | №0647 (+ 1 других файлов) |
| rageDamageBonus | №0680 |
| ragesCount | №0680 |
| raging | №1224 (+ 1 других файлов) |
| ragingInferno | №0778 |
| ragPulp | №0672 |
| rail | №0069 |
| raisedFt | №0817 |
| raiseThrallOnSeedKill | №0808 |
| rallyCrew | №0778 |
| rallyingCry | №0738 |
| rallyUnlimited | №0775 (+ 1 других файлов) |
| ram | №0065 |
| rampage | №0655 (+ 1 других файлов) |
| rampageDie | №0778 |
| rampagePending | №0685 |
| randomRollsLeft | №1771 |
| randomUUID | №1138 (+ 3 других файлов) |
| range | №0077 (+ 17 других файлов) |
| rangedAttack | №0817 (+ 2 других файлов) |
| rangedAttackBonus | №0778 |
| rangeFt | №0076 (+ 31 других файлов) |
| rangeFtByLevel | №0827 |
| rangeMultiplier | №0778 |
| ranger | №0797 (+ 1 других файлов) |
| rangerFightingStyle | №0647 |
| rank | №0820 |
| rankForRecipe | №0669 |
| rapidity | №0640 |
| Rapidity | №0778 |
| raptor | №0060 |
| rare | №0792 (+ 6 других файлов) |
| rareBonus | №0807 |
| rareChance | №0773 |
| rarity | №0792 (+ 27 других файлов) |
| rate | №0664 |
| ratio | №0663 (+ 4 других файлов) |
| rats | №0060 |
| ravenousWeapon | №0778 |
| raw | №0652 (+ 3 других файлов) |
| rawCopper | №0672 |
| rawIron | №0672 |
| rawUnit | №0825 |
| rawXp | №0804 |
| ray | №0819 |
| reach | №0819 |
| reachBonusFt | №0778 |
| reachFt | №0775 (+ 1 других файлов) |
| reaction | №0077 (+ 41 других файлов) |
| reactionAction | №0778 |
| reactionAttack | №0685 (+ 2 других файлов) |
| reactionAttackOrSingleTargetSpell | №0778 |
| reactionCastHexOnDamager | №0778 |
| reactionChoice | №1155 (+ 2 других файлов) |
| reactionCounter | №0775 |
| reactionDamage | №0778 |
| reactionDamageReduction | №0808 |
| reactionDefensiveOrder | №0778 |
| reactionHalveDamage | №0778 |
| reactionId | №0810 (+ 4 других файлов) |
| reactionMode | №0778 |
| reactionMove | №0778 |
| reactionMoveFt | №0778 |
| reactionNegateSpellUpTo5 | №0778 |
| reactionOpportunityAgainstAttacker | №0778 |
| reactionOptions | №0647 (+ 3 других файлов) |
| reactionPending | №0810 |
| reactionRedirectAttack | №0808 |
| reactions | №0647 (+ 2 других файлов) |
| reactionsMax | №0647 |
| reactionSpell | №0812 |
| reactionsRefresh | №0828 |
| reactionSuppressOnInitiative | №0778 |
| reactionUsesByLevel | №0828 |
| reactionWeather | №0685 |
| reactionWindow | №0654 |
| readAllWriting | №0778 |
| readError | №0062 |
| readOnly | №0846 |
| readWriteForkedLanguages | №0778 |
| ready | №0062 (+ 2 других файлов) |
| readyState | №1111 (+ 26 других файлов) |
| reagent | №0825 |
| reagentRoll | №1079 |
| reagents | №0077 (+ 4 других файлов) |
| reagentsRegained | №0077 |
| reagentsSpent | №0077 |
| reagentSynthesis | №0676 |
| reanimateCorpse | №0868 |
| reanimated | №0868 |
| reanimator | №0808 |
| reaper | №0808 |
| rearDigits | №0060 |
| reason | №0076 (+ 30 других файлов) |
| reassembleCorpus | №0778 |
| rebirthInHell | №0778 |
| rebuild | №0797 |
| rebuildMaterialUsage | №1111 (+ 1 других файлов) |
| recalculate | №0848 |
| receipt | №0817 |
| received | №0801 |
| recharge | №0077 (+ 12 других файлов) |
| rechargeActions | №0804 |
| recharged | №0804 |
| rechargeOn | №0653 |
| rechargeState | №0810 |
| recipe | №0664 (+ 5 других файлов) |
| recipeCount | №0671 |
| recipeId | №0663 |
| recipeName | №0663 |
| recipeRequirements | №0669 |
| recipes | №0666 (+ 3 других файлов) |
| RECIPES | №0666 |
| recipesList | №0666 |
| reciprocalRelationship | №0778 |
| reckless | №0647 |
| recommendedSourceCommit | №1316 |
| reconstruction | №0640 |
| Reconstruction | №0778 |
| record | №0846 (+ 6 других файлов) |
| recordApplication | №0820 |
| recordCraftResult | №0669 |
| recordDamage | №0817 |
| recordMutation | №0815 (+ 1 других файлов) |
| recover | №0652 |
| recoverable | №0663 |
| recovered | №0663 (+ 2 других файлов) |
| recoveredFromCrafting | №0664 |
| recoverRatio | №0663 |
| recovery | №0715 (+ 1 других файлов) |
| Recovery | №0079 |
| RECOVERY_BY_DURABILITY | №0663 |
| RECOVERY_BY_QUALITY | №0664 |
| recoveryRate | №1111 |
| recruitInformant | №0778 |
| recruitMercenary | №0778 |
| recursive | №0887 (+ 48 других файлов) |
| red | №0831 |
| Red | №0775 (+ 1 других файлов) |
| redirect | №0778 |
| redirectAttack | №0778 |
| redirectAttackToAlly | №0077 |
| redirectDamage | №0775 |
| redirectDamageToConstruct | №0778 |
| redirectMeleeAttackToFamiliar | №0778 |
| redirectMissedAttackToGrappledTarget | №0778 |
| redirectOrCancel | №0778 |
| redirectTargetId | №0817 |
| redirectURL | №0885 |
| redistributed | №0817 |
| redo | №0062 |
| reduced | №0640 (+ 2 других файлов) |
| reducedBy | №0778 |
| reduceMaxHpByDamage | №0778 |
| reduceNextVisibleAttackBy | №0778 |
| reduction | №0827 (+ 1 других файлов) |
| reEnabled | №1112 |
| ref | №0817 |
| refinedCopper | №0672 |
| reflectPsychicDamage | №0778 |
| refresh | №0818 (+ 2 других файлов) |
| refresh_token | №0652 (+ 1 других файлов) |
| refreshByItsAlive | №0778 |
| refreshMaterial | №0061 |
| refreshOrgans | №0868 |
| refreshStatus | №0663 |
| refundCharnelOnThrallLoss | №0808 |
| refunded | №0810 |
| refundedSpellSlot | №0810 |
| regainOnShortRest | №0775 |
| regainReagentsOnInitiativeUpTo | №0077 |
| regeneration | №0808 |
| Regeneration | №0079 |
| regenerationBlockedBy | №0808 |
| regenPbWhenBloodied | №0640 |
| region | №0061 (+ 3 других файлов) |
| REGION_MOD | №0798 |
| regionalHairSupported | №0058 |
| regionMask | №0058 |
| regionMultiplier | №0798 |
| regions | №0058 (+ 5 других файлов) |
| register | №0627 (+ 12 других файлов) |
| registerActionHandler | №1163 (+ 5 других файлов) |
| registerClass | №0660 (+ 3 других файлов) |
| registerEquipment | №0065 |
| registerPreset | №0065 |
| registerRace | №0065 |
| registerSkin | №0065 |
| registerSummon | №0829 |
| registry | №0660 |
| reinforcedWoodV49 | №0666 |
| reinvokedRune | №0778 |
| reject | №0787 (+ 2 других файлов) |
| rejuvenatingOrder | №0778 |
| relation | №0817 (+ 1 других файлов) |
| relationship | №0800 |
| relationshipChanged | №1175 |
| relaunch | №1115 |
| relaxationLevels | №0778 |
| rele | №0647 |
| release_ready | №1076 |
| release_reason | №1076 |
| release_source_sha | №1076 |
| releaseDeadSpaceOnInitiative | №0808 |
| releaseToLarva | №0815 |
| relentless | №0628 |
| relentlessRage | №0647 |
| reliableTalent | №0647 |
| relic | №0798 (+ 2 других файлов) |
| religion | №0771 (+ 1 других файлов) |
| remaining | №0647 (+ 11 других файлов) |
| remainingAmount | №0640 (+ 3 других файлов) |
| remainingCharges | №0077 |
| remainingHp | №0778 |
| remainingMinutes | №0077 (+ 2 других файлов) |
| remainingOwnerTurns | №0077 |
| remainingTurns | №0077 (+ 1 других файлов) |
| remnant | №0838 |
| remnants | №0062 (+ 4 других файлов) |
| remote | №0652 |
| remoteRoster | №0809 |
| remove | №0657 (+ 7 других файлов) |
| removeAction | №0077 |
| removeAdvantage | №0870 |
| removeAlchemistSlime | №0654 |
| removeClass | №0848 |
| removeCondition | №0775 (+ 1 других файлов) |
| removeConditions | №0640 |
| removed | №0057 (+ 3 других файлов) |
| removeEventListener | №0886 |
| removeFeat | №0848 |
| removeFloor | №0070 |
| removeImmunity | №0640 |
| removeInventory | №0848 |
| removeItem | №1122 (+ 3 других файлов) |
| removeObject | №0070 |
| removePoisonDisease | №0778 |
| removeRampage | №0685 |
| removeResistance | №0640 |
| removeResistanceTo | №0778 |
| removeSpell | №0848 |
| removeZone | №0070 |
| render | №0080 (+ 10 других файлов) |
| renderAppearance | №0060 |
| renderCharacterCreation | №0669 |
| renderControls | №0640 |
| renderFamily | №0065 |
| renderInventory | №1171 (+ 1 других файлов) |
| renderStatus | №0665 |
| rendingStrike | №0778 |
| repairCost | №1113 |
| repairCount | №0663 |
| repaired | №0663 (+ 3 других файлов) |
| repairGold | №1111 |
| repairItem | №0663 (+ 3 других файлов) |
| repairProfile | №0664 |
| repeat | №0081 |
| repeatCondition | №0817 |
| repeatDamageOnFailedSave | №0640 |
| repeatMissedAttack | №0778 |
| repeatRestriction | №0778 |
| repeatRollingBoulderOnSuccessfulProne | №0778 |
| repeatSave | №0077 (+ 3 других файлов) |
| repeatSaveAtTurnEnd | №0778 |
| repeatSaveEndTurn | №0778 |
| repeatSaveOnDamage | №0778 |
| replaceAfterShortRest | №0778 |
| replaceAnyAfterLongRest | №0778 |
| replaceAnyNon18Metamorphoses | №0778 |
| replaceAttackWithSpirit | №0812 |
| replaceAttackWithTouchCantrip | №0778 |
| replaceConsumed | №0778 |
| replaceDropToZeroWithHP | №0077 |
| replaceExploitOnRest | №0778 |
| replaceLowSpellSlotWithInspiringWord | №0778 |
| replaceMetamorphosis | №0778 |
| replaceMutagen | №0778 (+ 1 других файлов) |
| replaceOnRest | №0076 |
| replacePhysicalSaveWith | №0778 |
| replacesRace | №0642 (+ 10 других файлов) |
| replaceStandardOrExoticAfterLongRest | №0778 |
| replaceWolfWithDireWolf | №0778 |
| report | №0663 (+ 1 других файлов) |
| reposition | №0778 |
| reprisal | №0802 |
| reptile | №0773 |
| reptileIndices | №0060 |
| reptileProfile | №0060 (+ 5 других файлов) |
| reptileSkin | №0060 |
| req | №0640 (+ 1 других файлов) |
| requestedExternal | №0058 |
| requestId | №0810 (+ 7 других файлов) |
| require | №1317 |
| required | №0713 (+ 3 других файлов) |
| requiredAssets | №0070 |
| requiredGold | №0664 |
| requiredLevel | №0669 |
| requiredMaterials | №0664 |
| requiredSpecialization | №0669 |
| requiredTools | №0671 |
| requirements | №0631 (+ 1 других файлов) |
| requires | №0673 (+ 4 других файлов) |
| requiresAdvantage | №0778 |
| requiresArmor | №0778 |
| requiresDisengage | №0778 |
| requiresEqualOrHigherExtraSlot | №0778 |
| requiresGrappled | №0778 |
| requiresNearestAttack | №0640 |
| requiresSight | №0817 (+ 3 других файлов) |
| requiresSoleHexTarget | №0778 |
| requiresTarget | №0778 |
| reroll | №0647 |
| rerollAttack | №0077 |
| rerollDamage12 | №0778 |
| rerollFlickerCost | №0778 |
| rerollGrappleEscape | №0778 |
| rerollHemocraftOncePerTurn | №0778 |
| rerollOne | №0647 (+ 3 других файлов) |
| rerollOneDamageDie | №0778 |
| rerollSave | №0775 (+ 1 других файлов) |
| rerollType | №0778 |
| reservationRetained | №0654 |
| reserved | №0802 (+ 3 других файлов) |
| reservedDie | №0812 |
| reset | №0062 |
| resetDeathSaves | №0654 |
| resetLairRound | №0804 |
| resetNegotiation | №0800 |
| resetRestResources | №0868 |
| resetTurn | №0647 |
| resetTurnResources | №0782 |
| resetView | №0862 |
| resignalSeq | №0809 |
| resilientOrder | №0778 |
| resilientOrderAdvanced | №0778 |
| resin | №0666 (+ 3 других файлов) |
| resist | №0817 |
| resistance | №0077 (+ 10 других файлов) |
| resistanceAll | №0077 (+ 2 других файлов) |
| resistanceAllDamage | №0778 |
| resistanceAllExceptPsychic | №0778 |
| resistanceChosen | №0778 |
| resistances | №0654 (+ 14 других файлов) |
| resistanceType | №0077 (+ 2 других файлов) |
| resistanceWhileBloodied | №0778 |
| resistant | №0817 (+ 1 других файлов) |
| resistantSuppression | №0778 |
| resisted | №0849 |
| resize | №0070 |
| resolution | №0858 (+ 1 других файлов) |
| resolve | №0652 (+ 4 других файлов) |
| resolveAction | №0804 |
| resolveAttack | №0654 (+ 1 других файлов) |
| resolveCharacterRace | №0065 |
| resolveEquipment | №0065 |
| resolveFall | №0070 |
| resolveFeature | №0660 |
| resolveHealingEvent | №0817 |
| resolveMorphWeights | №0067 |
| resolveRace | №0065 |
| resolveReaction | №0647 |
| resolveRollMode | №0826 |
| resolveSkin | №0065 |
| resource | №0782 (+ 1 других файлов) |
| resourceBridge | №0685 |
| resourceInput | №0671 |
| resourceName | №0824 |
| resourceProcessing | №0825 |
| resourceRevision | №0810 |
| resources | №0077 (+ 39 других файлов) |
| RESOURCES | №0672 |
| resourceUnit | №0825 |
| resourceYieldMultiplier | №0671 |
| respawn | №0877 |
| rest | №0640 (+ 11 других файлов) |
| restAndRecover | №0778 |
| restHealing | №0783 (+ 1 других файлов) |
| restNormals | №0060 |
| restock | №0798 (+ 1 других файлов) |
| restore | №0647 (+ 4 других файлов) |
| restoreBloodMaledictOnRiteCrit | №0640 |
| restoreBody | №0815 |
| restored | №0077 (+ 3 других файлов) |
| restoredAt | №0864 |
| restoreExhaustion | №0775 (+ 1 других файлов) |
| restoreExploitPerAlly | №0778 |
| restoreGolem | №1079 |
| restoreHitDice | №0775 (+ 1 других файлов) |
| restoreHp | №0685 |
| restoreHP | №0778 |
| restoreInterruptOnInitiative | №0778 |
| restoreLocalCopy | №0652 |
| restoreMoxie | №0778 |
| restoreMoxieOnSuccessfulCrossCounter | №0778 |
| restoreOneSealLongRest | №0778 |
| restoreOnInitiative | №0778 |
| restorePactSlot | №0640 |
| restoreReagents | №0778 |
| restoreResource | №0775 |
| restoreResources | №0826 |
| restoreSnapshot | №0860 (+ 1 других файлов) |
| restoreSpellLevels | №0808 |
| restoreThrall | №0778 |
| restoreWithReagents | №1079 |
| restPositions | №0060 |
| restrainAt0Hp | №0778 |
| restrained | №0778 (+ 1 других файлов) |
| restrainedUntilEndOfNextTurn | №0778 |
| restrictionUntilOwnEnd | №0817 |
| result | №0647 (+ 40 других файлов) |
| resultCp | №0789 |
| resultEp | №0789 |
| resultGp | №0789 |
| resultPp | №0789 |
| results | №0647 (+ 4 других файлов) |
| resultSp | №0789 |
| resumed | №0817 |
| retain | №0832 |
| retainMentalStats | №0778 |
| retains | №0843 |
| retaliationHealing | №0778 |
| retaliatoryDamage | №0778 |
| retaliatoryNecrotic | №0778 |
| retargetMageMark | №0817 |
| retreat | №0819 |
| retreatFrom | №0817 |
| retries | №0820 |
| retry_after | №1076 (+ 1 других файлов) |
| retryIn | №0877 (+ 1 других файлов) |
| returnAfterHour | №0808 |
| returnAttackBonus | №0810 (+ 1 других файлов) |
| returnDamage | №0778 (+ 3 других файлов) |
| returnDamageType | №0810 |
| returnedAttack | №0647 |
| returnTarget | №0654 (+ 3 других файлов) |
| returnToShell | №0783 |
| reveal | №0078 (+ 3 других файлов) |
| revealed | №0073 (+ 2 других файлов) |
| revealedArcana | №0640 |
| revealedSight | №0817 |
| revealsInvisible | №0077 |
| reverseMappedGlbVertices | №1128 |
| revert | №0778 (+ 1 других файлов) |
| revision | №0652 (+ 3 других файлов) |
| revitalizingOrderExploit | №0778 |
| reviveAtDawn | №0778 |
| reviveAtZero | №0775 |
| revived | №0077 |
| revivedFromZero | №0654 |
| reviveHp | №0778 |
| reviveNearHeartAfterHours | №0778 |
| reviveRecentDead | №0808 |
| reviveRite | №0640 |
| reviveTo1 | №0778 |
| revokeObjectURL | №1220 |
| revolution | №0802 |
| rewards | №0669 (+ 2 других файлов) |
| rider | №0868 |
| RIDGE_STYLES | №0065 |
| ridgeColor | №0065 (+ 1 других файлов) |
| ridgeStyle | №0062 |
| right | №1126 |
| ringingStrike | №0778 |
| riposte | №0778 |
| riseFt | №0817 |
| risk | №0079 |
| rite | №0778 (+ 2 других файлов) |
| riteFocus | №0640 |
| riteOfTheDawn | №0640 |
| riteRevival | №0640 |
| rites | №0706 (+ 8 других файлов) |
| riteSwapAtLevel | №0778 |
| riteType | №0640 (+ 7 других файлов) |
| ritual | №0760 (+ 3 других файлов) |
| ritualCasting | №0706 (+ 1 других файлов) |
| ritualComponentReplaced | №0812 |
| ritualDuringShortRest | №0778 |
| ritualizeKnownSpellsUpTo | №0812 |
| ritualMastery | №0778 |
| ritualMaterialSubstitution | №0778 |
| ritualMinutes | №0778 (+ 1 других файлов) |
| ritualSpellLevelMax | №0812 |
| ritualTurnsBySpellLevel | №0812 |
| rmsDisplacementMeters | №1123 |
| roar | №0640 (+ 1 других файлов) |
| roguishCharm | №0778 |
| role | №0058 (+ 31 других файлов) |
| roles | №0627 (+ 18 других файлов) |
| roll | №0073 (+ 25 других файлов) |
| rollback | №0855 (+ 1 других файлов) |
| rollD20 | №0826 (+ 20 других файлов) |
| rollDice | №0654 (+ 4 других файлов) |
| rolled | №0837 |
| rolledDistanceFt | №0817 |
| rollingAvalanche | №0778 |
| rollingBoulder | №0778 |
| rollPockets | №0806 (+ 1 других файлов) |
| rollResolved | №0834 |
| rollResult | №0871 |
| rolls | №0627 (+ 24 других файлов) |
| rollTwiceChoose | №0778 |
| roomId | №0809 (+ 5 других файлов) |
| root | №1771 |
| rope | №0669 (+ 1 других файлов) |
| roster | №1110 (+ 2 других файлов) |
| rotation | №0075 |
| rotFist | №0778 |
| roughness | №0060 (+ 3 других файлов) |
| round | №0062 (+ 51 других файлов) |
| roundEarSize | №0065 (+ 1 других файлов) |
| roundOwnerId | №0817 |
| roundsRemaining | №0778 (+ 1 других файлов) |
| roundStart | №0817 |
| route | №0819 |
| rows | №0077 (+ 21 других файлов) |
| RTCPeerConnection | №1248 |
| ru | №0744 (+ 1 других файлов) |
| rug | №0066 |
| ruined | №0663 (+ 1 других файлов) |
| ruins | №0798 |
| ruins_courtyard | №0877 |
| ruins_vault | №0877 |
| ruins_workshop | №0877 |
| rules | №0820 (+ 2 других файлов) |
| run | №0855 (+ 1 других файлов) |
| rune | №0778 (+ 2 других файлов) |
| runeDoesNotCountAgainstAttunement | №0778 |
| runeInert | №0778 |
| runesKnown | №0647 (+ 1 других файлов) |
| runesPerObject | №0778 |
| runesPersistAfterDeath | №0778 |
| runicCharges | №0827 |
| runicLore | №0827 |
| runSceneTest | №0841 |
| runScripts | №1133 |
| runtime | №0706 (+ 4 других файлов) |
| runtimeCraft | №0778 |
| runtimeId | №0812 |
| runtimeKey | №0769 |
| runtimeStatus | №0706 (+ 1 других файлов) |
| runtimeVersion | №0676 |
| ruthlessCommand | №0778 |
| ruthlessFocus | №0778 |
| rx | №0060 (+ 4 других файлов) |
| ry | №0060 |
| rz | №0060 (+ 1 других файлов) |
| s | №0069 (+ 3 других файлов) |
| sacredWeapon | №0647 |
| sacrifice | №0802 (+ 1 других файлов) |
| sacrificeFoe | №0802 |
| saddler | №0669 |
| safeAlliesMax | №0778 |
| sagacity | №0640 |
| Sagacity | №0778 |
| salt | №0670 (+ 3 других файлов) |
| saltOfEarth | №0778 |
| salvage | №0824 (+ 1 других файлов) |
| sample | №1182 (+ 3 других файлов) |
| sampledBestMaxDistance | №1132 |
| sampledBestMeanDistance | №1132 |
| sampledGoodPct | №1132 |
| sampleSampler | №0067 |
| sand | №0671 |
| sandbox | №0885 |
| sandVortex | №0808 |
| sanguine | №0778 |
| sanguineEmboldenAllies | №0778 |
| sanguineMastery | №0640 |
| sanguineVitalize | №0778 |
| satyr | №1300 |
| savage_attacker | №0781 |
| savageDice | №0778 |
| save | №0059 (+ 26 других файлов) |
| save1 | №0808 |
| save1or2 | №0808 |
| saveAbility | №0676 |
| saveBonus | №0640 (+ 1 других файлов) |
| saveBonuses | №1078 (+ 6 других файлов) |
| saveBottom | №1279 |
| saveCustom | №0856 |
| saved | №0783 (+ 2 других файлов) |
| savedAt | №0859 (+ 2 других файлов) |
| saveDc | №0810 |
| saveDC | №0077 (+ 6 других файлов) |
| savedChannel | №1260 |
| savedDrawCalls | №0062 |
| saveDisadvantage | №0778 (+ 1 других файлов) |
| saveDisadvantageForPugilistFeatures | №0778 |
| savedUrl | №1260 |
| saveEpoch | №0864 |
| saveId | №0864 |
| saveModifiers | №0640 (+ 8 других файлов) |
| saveOnHit | №0077 |
| savePenalty | №0077 |
| saveResult | №0077 (+ 7 других файлов) |
| saveRevision | №0864 |
| saveRoll | №0810 |
| saves | №0778 (+ 1 других файлов) |
| savesData | №0623 (+ 1 других файлов) |
| saveSheet | №0657 |
| saveSucceeds | №0778 |
| saveSuccess | №0077 |
| saveType | №0654 (+ 7 других файлов) |
| savingThrow | №0654 (+ 20 других файлов) |
| savingThrowBonusDice | №0778 |
| savingThrowProficiencies | №1159 |
| savingThrows | №0076 (+ 32 других файлов) |
| SCALAR | №0067 (+ 4 других файлов) |
| scale | №0060 (+ 20 других файлов) |
| scalePlateV49 | №0666 |
| scalesPerLevel | №0778 |
| scaleWithOwner | №0657 (+ 1 других файлов) |
| scan | №0829 |
| scarf | №0061 |
| scenarios | №0855 (+ 1 других файлов) |
| scene | №1084 (+ 2 других файлов) |
| sceneFrom | №0817 |
| sceneOwnerId | №0817 (+ 1 других файлов) |
| scenes | №1084 (+ 2 других файлов) |
| schema | №1266 |
| schema_version | №1110 |
| SCHEMA_VERSION | №0641 (+ 2 других файлов) |
| schemaVersion | №0065 (+ 7 других файлов) |
| scheme | №0885 |
| scholarlyPursuits | №0828 |
| school | №0759 (+ 10 других файлов) |
| schoolOfHardKnocks | №0778 |
| scope | №0778 (+ 1 других файлов) |
| scopeId | №0652 |
| scopes | №0652 |
| score | №0663 (+ 1 других файлов) |
| scourgeAttunement | №0778 |
| scourgePresence | №0778 |
| scourgeSense | №0778 |
| scourgeSpeech | №0778 |
| scourgeVisage | №0778 |
| scribe | №0667 (+ 4 других файлов) |
| scrolls | №0669 (+ 2 других файлов) |
| seafarer | №0778 |
| seal | №0778 |
| sealDamage | №0697 (+ 1 других файлов) |
| sealDamageIgnoresResistance | №0778 |
| sealDiceDoubled | №0778 |
| sealedSpiritFeatureLevels | №0843 |
| seals | №0697 |
| sealSystem | №0697 |
| sealWax | №0671 |
| seamMaxMeters | №1123 |
| seaMobility | №0775 |
| search | №0659 |
| searchAsBonus | №0775 |
| second | №0826 |
| second_chance | №0781 |
| secondaryAbility | №0685 |
| secondaryStat | №0676 (+ 3 других файлов) |
| secondaryStatChoice | №0697 (+ 2 других файлов) |
| secondaryStats | №0725 (+ 5 других файлов) |
| seconds | №0817 (+ 4 других файлов) |
| secondTarget | №0778 |
| secondWind | №0647 |
| secret | №0073 |
| secure | №0885 |
| seed | №1771 |
| seeIllusions | №0817 |
| seeing | №0778 |
| seeInvisible | №0817 (+ 1 других файлов) |
| seek | №0846 |
| seeking | №0077 |
| seekingBomb | №0778 |
| select | №0856 |
| selected | №0076 (+ 4 других файлов) |
| selectedFile | №0852 |
| selectedRites | №0812 |
| selectedTexture | №0070 |
| selectedTokenId | №0625 |
| selectedTool | №0070 |
| selectedWallTexture | №0070 |
| selection | №0076 |
| selfAdvantage | №0826 |
| selfDamage | №0647 (+ 4 других файлов) |
| selfDamageType | №0778 |
| selfDisadvantage | №0826 |
| selfFireDamageUpToLevel | №0778 |
| selfHeal | №0778 |
| selfNecrotic | №0778 |
| selfRadiantDamage | №0778 |
| selfSuture | №0808 |
| selfUsesHitDie | №0778 |
| sell | №0798 (+ 2 других файлов) |
| sellable | №0801 |
| sellFactor | №0798 (+ 1 других файлов) |
| sendActionResult | №1163 (+ 5 других файлов) |
| sendMessage | №1217 |
| sendReactionRequest | №1163 (+ 2 других файлов) |
| senseBloodCreatures | №0778 |
| senses | №0657 (+ 4 других файлов) |
| sentinel | №0781 |
| sentinelSoul | №0734 (+ 1 других файлов) |
| sentinelSoulChoices | №0734 |
| sentinelStand | №0734 (+ 1 других файлов) |
| sentinelStandChoices | №0734 |
| sentinelStrike | №0734 (+ 1 других файлов) |
| sentinelStrikeChoices | №0734 |
| seq | №1225 (+ 6 других файлов) |
| serial | №0640 |
| serialize | №0065 |
| session | №0861 (+ 2 других файлов) |
| sessionId | №0861 (+ 1 других файлов) |
| sessions | №1191 (+ 1 других файлов) |
| setArmor | №0062 |
| setAttribute | №1171 (+ 1 других файлов) |
| setAxis | №0062 |
| setBackground | №0848 |
| setBodyHair | №0062 |
| setCeiling | №0817 |
| setClassLevel | №0848 |
| setClothing | №0062 |
| setClothingCustomization | №0062 |
| setElevation | №0817 |
| setEnabled | №0660 (+ 1 других файлов) |
| setExternalAnatomy | №0062 |
| setGender | №0062 (+ 1 других файлов) |
| setHead | №0062 |
| setHosieryDen | №0062 |
| setHp | №0778 |
| setHP | №0778 |
| setIcon | №0886 |
| setItem | №1080 (+ 19 других файлов) |
| setMainMenuAvailability | №0841 |
| setMessageHandler | №1217 |
| setOriginRace | №0065 |
| setPose | №0062 |
| setProfession | №0848 |
| setProgress | №0842 |
| setProgressHandler | №0841 |
| setRace | №0062 (+ 2 других файлов) |
| setRegion | №0798 |
| setResource | №0826 |
| setSkin | №0062 |
| setStance | №0778 |
| setStatus | №0842 |
| setStrength | №0077 |
| setSwarmMoving | №0062 |
| setSymbiosis | №0815 |
| setTile | №0070 |
| setTimeout | №0662 (+ 15 других файлов) |
| settlementIntel | №0778 |
| settlementOnly | №0778 |
| setTotalLevel | №0848 |
| setView | №1220 |
| setWeapon | №0062 |
| sewer | №0062 |
| sha | №1266 |
| sha256 | №0841 (+ 4 других файлов) |
| shadow_dancer | №0781 |
| shadow_touched | №0781 |
| shadowColor | №0065 (+ 1 других файлов) |
| shadowEssence | №0825 |
| shadowForm | №0808 |
| shadowmaster | №0778 |
| shadowMasterOfDisguise | №0778 |
| shadowNoEscape | №0778 |
| shadowOpacity | №1280 |
| shadowStep | №0647 |
| shag | №0060 (+ 1 других файлов) |
| shakeItOff | №0715 (+ 1 других файлов) |
| Shaman | №0706 |
| shape | №0060 (+ 8 других файлов) |
| shapechange | №0778 |
| shapeChangeSave | №0778 |
| shapeFemale | №1094 |
| shapeHead | №0060 |
| shapeMale | №1094 (+ 1 других файлов) |
| shaper | №0713 (+ 1 других файлов) |
| Shaper | №0794 |
| shapes | №0058 (+ 1 других файлов) |
| sharedAdvantage | №0778 |
| shareDamage | №0817 |
| shareDanceBonus | №0808 |
| sharedBonusAction | №0778 (+ 1 других файлов) |
| sharedHp | №0778 |
| sharedImmortality | №0778 |
| sharedInitiative | №0838 |
| sharedProperties | №0078 (+ 1 других файлов) |
| sharedReaction | №0775 (+ 2 других файлов) |
| sharedStealth | №0685 |
| shareSaves | №0812 |
| shareSensesHours | №0778 |
| sharpMind | №0828 |
| sharpshooter | №0781 |
| shaved | №0058 (+ 1 других файлов) |
| shelf | №0066 |
| shell | №0783 |
| shellColor | №0065 (+ 1 других файлов) |
| shellDestroyed | №0783 |
| shellHealing | №0783 |
| shellHP | №0783 |
| shellMaxHP | №0783 |
| shellName | №0783 |
| shells | №1288 |
| shellSize | №0065 (+ 1 других файлов) |
| shield_master | №0781 |
| shieldACBonus | №0778 |
| shieldAllowed | №0778 |
| shieldAttackBonus | №0778 |
| shieldDamage | №0778 |
| shielded | №0640 (+ 1 других файлов) |
| Shielded | №0778 |
| shieldFrame | №0666 (+ 1 других файлов) |
| shieldImpact | №0778 |
| shieldmaker | №0669 |
| shieldMartial | №0778 |
| shieldSlam | №0778 (+ 1 других файлов) |
| shieldWarrior | №0778 |
| shift | №0800 |
| shifter | №0671 (+ 1 других файлов) |
| shifterNaturalWeapon | №0832 |
| shinL | №0058 |
| shinR | №0058 |
| shipchandler | №0800 (+ 1 других файлов) |
| shippedSha256 | №1123 |
| shirt | №0061 |
| shirt_long | №1089 (+ 1 других файлов) |
| shockingStrike | №0778 |
| shockingStrikeDamage | №0778 |
| short | №0060 (+ 1 других файлов) |
| shortRest | №0077 (+ 1 других файлов) |
| shortRestHealing | №0838 |
| shortRestHealingAllowed | №0868 |
| shortRestSlots | №0778 |
| shoulders | №0062 (+ 6 других файлов) |
| shouldSuppressRestHP | №0783 (+ 1 других файлов) |
| shove | №0775 |
| shredding | №0778 |
| shreddingFree | №0778 |
| shuffle | №0081 |
| side | №0060 (+ 2 других файлов) |
| side_part | №0060 (+ 1 других файлов) |
| sideEffect | №0778 |
| sideEffects | №0079 |
| sides | №0654 (+ 8 других файлов) |
| siege | №0669 (+ 2 других файлов) |
| siegeInteraction | №0630 |
| sightBlocked | №0073 |
| sigilEligible | №0631 |
| sigilicGrace | №0778 |
| signal | №0652 (+ 2 других файлов) |
| signature | №0792 (+ 1 других файлов) |
| signatureSpells | №0647 |
| signup | №0652 |
| silent | №0817 |
| silentCheck | №0841 |
| silentStalker | №0778 |
| silk | №0061 |
| silkwormSilk | №0672 |
| silver | №0667 (+ 2 других файлов) |
| silvered | №0654 (+ 1 других файлов) |
| site | №0794 |
| sixthMetamorphosis | №0778 |
| size | №0060 (+ 45 других файлов) |
| size_mb | №1121 |
| sizeBytes | №1125 |
| sizeCategory | №0065 (+ 1 других файлов) |
| sizeChange | №0077 |
| sizeFt | №0077 (+ 1 других файлов) |
| sizeIncrease | №0775 (+ 1 других файлов) |
| skeleton | №0065 (+ 2 других файлов) |
| skill | №0627 (+ 13 других файлов) |
| skillAdvantage | №0640 |
| skillBonus | №0775 (+ 3 других файлов) |
| skillChoices | №0783 (+ 3 других файлов) |
| skilled | №0662 (+ 1 других файлов) |
| skilledRider | №0778 |
| skillId | №0771 (+ 3 других файлов) |
| skillModifiers | №0640 |
| skillProficiency | №0778 |
| skillProficient | №0654 (+ 1 других файлов) |
| skills | №0623 (+ 27 других файлов) |
| skillsChoose | №0077 (+ 1 других файлов) |
| skillsData | №0623 (+ 3 других файлов) |
| skiltKrigga | №0778 |
| skin | №0057 (+ 8 других файлов) |
| skin_names | №1121 |
| skinCompatible | №0065 |
| skinDetail | №0065 (+ 6 других файлов) |
| skinFamily | №0065 |
| skinGlow | №0065 (+ 2 других файлов) |
| skinId | №0065 (+ 1 других файлов) |
| skinMaterial | №0065 |
| skinned_primitives | №1121 |
| skinPositions | №0057 |
| skins | №0067 (+ 4 других файлов) |
| skinSurface | №0062 (+ 5 других файлов) |
| skipDefeated | №0782 |
| skirt | №0061 |
| skirtProfile | №0061 |
| slamDamage | №0778 |
| slamMagical | №0778 |
| slash | №0073 (+ 1 других файлов) |
| slashing | №0870 |
| slashTexture | №0075 |
| slaymateRitual | №0808 |
| sleep | №0778 (+ 1 других файлов) |
| Sleep | №0079 |
| sleepImmune | №0817 |
| sleepUntilStartNextTurnOrDamage | №0778 |
| sleepwalker | №0778 |
| sleeves | №0061 (+ 2 других файлов) |
| sleightBonus | №0778 |
| sleightingImprecation | №0778 |
| sleightOfHand | №0771 (+ 1 других файлов) |
| slick_back | №0060 (+ 1 других файлов) |
| slime | №0062 |
| slimeCovered | №0077 |
| slimeFiber | №0825 |
| slimeReagent | №0825 |
| slipperyMind | №0647 |
| slipTurns | №0820 (+ 1 других файлов) |
| slit | №1089 (+ 2 других файлов) |
| slitHeight | №1089 (+ 1 других файлов) |
| slot | №0061 (+ 9 других файлов) |
| slotKind | №0647 |
| slotLevel | №0640 (+ 12 других файлов) |
| slotLevels | №1230 |
| slots | №0061 (+ 8 других файлов) |
| slotsByLevel | №0808 |
| slotSpent | №0812 |
| slotsRefresh | №0843 |
| slotsUsed | №0785 |
| slowFall | №0647 |
| slowFt | №0640 |
| small | №0066 (+ 2 других файлов) |
| smith | №0667 (+ 7 других файлов) |
| smoke | №0077 |
| smokeBomb | №0778 |
| smokeCloud | №0077 |
| snake | №0818 |
| snapshot | №0652 (+ 10 других файлов) |
| snapshots | №0077 |
| sneakApplied | №0654 (+ 1 других файлов) |
| sneakAttack | №0647 |
| sneakAttackDice | №0785 (+ 1 других файлов) |
| sneakEligible | №1230 |
| sneakStyle | №0853 |
| snout | №0060 |
| social | №0627 (+ 12 других файлов) |
| socialAdvantage | №0775 |
| socialBonus | №0808 |
| socket | №0060 |
| socks | №0061 (+ 3 других файлов) |
| solidified | №0778 |
| soloShieldAC | №0778 |
| solvent | №0077 |
| somatic | №0759 (+ 10 других файлов) |
| somaticMaterialFree | №0778 |
| somnolence | №0778 |
| songOfRest | №0647 |
| songsOfWarPeace | №0778 |
| soothingSpeech | №0778 |
| sorcerer | №0797 (+ 1 других файлов) |
| sorcerousOriginMastery | №0647 |
| sorcerousRestoration | №0647 |
| sorceryPoints | №0647 (+ 2 других файлов) |
| sort | №0792 |
| soulEater | №0640 (+ 1 других файлов) |
| soulOfArtifice | №0647 |
| soulSight | №0812 |
| soulToyConversion | №0808 |
| source | №0057 (+ 112 других файлов) |
| SOURCE | №0665 |
| SOURCE_TAG | №0669 |
| sourceCommit | №1772 |
| sourceDead | №0868 |
| sourceDisplacementMax | №1129 |
| sourceDisplacementMean | №1129 |
| sourceFor | №0080 |
| sourceGlb | №1118 |
| sourceGlbSha256 | №1316 |
| sourceHashes | №1316 |
| sourceId | №0076 (+ 29 других файлов) |
| sourceIndices | №0060 |
| sourceKey | №0794 |
| sourceLabel | №0627 (+ 10 других файлов) |
| sourceMaxDisplacement | №1128 |
| sourceMeanDisplacement | №1128 |
| sourceMeshes | №0062 |
| sourceName | №0699 (+ 3 других файлов) |
| sourceNonZeroEntries | №1128 |
| sourcePack | №0627 (+ 11 других файлов) |
| sourcePacks | №0629 (+ 2 других файлов) |
| sourceProject | №1316 |
| sourceQuantity | №0663 |
| sourceRule | №0080 |
| sources | №0080 (+ 12 других файлов) |
| sourceSha256 | №1123 |
| sourceStackTerms | №1316 |
| sourceTarget | №1118 |
| sourceType | №0077 (+ 15 других файлов) |
| sourceVersion | №0725 (+ 3 других файлов) |
| sovereignOfFate | №0778 |
| sp | №0789 (+ 6 других файлов) |
| space | №0838 |
| span | №0060 |
| sparse | №1119 |
| spatialManipulation | №0778 |
| speakWithBeastsAndPlants | №0778 |
| special | №0667 |
| specialization | №0669 (+ 2 других файлов) |
| specializationBonus | №0669 |
| specializationList | №0669 |
| specializations | №0669 |
| specialReactionPerOtherCreatureTurn | №0778 |
| specialSightFt | №0817 |
| specialtyTags | №0666 |
| species | №0060 (+ 4 других файлов) |
| spectral | №0060 |
| spectralFiber | №0666 (+ 1 других файлов) |
| spectralIndices | №0060 |
| spectralMounts | №0808 |
| spectralParts | №0060 |
| spectralReagent | №0825 |
| spectralThreadV49 | №0666 |
| speed | №0623 (+ 38 других файлов) |
| Speed | №0079 |
| speedBonus | №0778 |
| speedBonusFt | №0640 (+ 1 других файлов) |
| speedDouble | №0778 |
| speedFt | №0810 |
| speedHalf | №0778 |
| speedMultiplier | №0808 (+ 1 других файлов) |
| speedPenalty | №0640 |
| speedPenaltyFt | №0640 (+ 1 других файлов) |
| speedReductionFt | №0685 |
| speedZeroSave | №0778 |
| spell | №0647 (+ 6 других файлов) |
| spellAttack | №0778 (+ 3 других файлов) |
| spellAttackBonus | №0778 (+ 2 других файлов) |
| spellAttackUsesWisdom | №0778 |
| spellblade | №0778 (+ 1 других файлов) |
| Spellblade | №0794 |
| spellbladeSource | №0794 |
| spellCaster | №0810 (+ 1 других файлов) |
| spellcasting | №0706 (+ 10 других файлов) |
| spellcastingAbility | №0077 |
| spellcastingFocus | №0778 |
| spellDamageModifiers | №0647 (+ 2 других файлов) |
| spellDamageVulnerability | №0778 |
| spellHealingOrDamage | №0812 |
| spellId | №0654 (+ 9 других файлов) |
| spellLevel | №0647 (+ 10 других файлов) |
| spellLevelCap | №0812 |
| spellLevelMax | №0778 |
| spellLevels | №0812 |
| spellList | №0802 |
| spellLists | №0713 |
| spellMastery | №0647 |
| spellName | №0654 (+ 18 других файлов) |
| spells | №0785 (+ 11 других файлов) |
| spellSaveDC | №0778 (+ 2 других файлов) |
| spellsData | №0623 (+ 4 других файлов) |
| spellsDoNotCountAgainstKnown | №0778 |
| Spellshot | №0794 |
| spellsKnown | №0706 (+ 2 других файлов) |
| spellSlotKind | №0647 |
| spellSlotLevel | №0647 |
| spellSlots | №0647 (+ 2 других файлов) |
| spellSlotsData | №0623 (+ 14 других файлов) |
| spellSlotSubstitute | №0808 |
| spellSlotTable | №0826 (+ 1 других файлов) |
| spellSources | №0826 |
| spellStat | №0623 (+ 1 других файлов) |
| spellStats | №0826 |
| spellStoringItem | №0647 |
| spellstrike | №0778 |
| spellTable | №0640 |
| spellUses | №0802 |
| spellUsesByLevel | №0802 |
| Spellweaver | №0794 |
| spend | №0782 |
| spendAction | №0782 |
| spendCharges | №0778 |
| spendCoin | №0817 |
| spendDynamo | №0077 |
| spendExtendedResource | №0647 |
| spendMovement | №0782 |
| spendMovementReward | №0820 |
| spendReaction | №0817 |
| spendResource | №0826 |
| spendSpellSlot | №0778 |
| spent | №0685 (+ 4 других файлов) |
| sPerG | №1771 |
| spices | №0672 |
| spider | №0685 |
| spiderSilk | №0666 (+ 1 других файлов) |
| spines | №0065 |
| spiral | №0065 |
| spirit | №0843 (+ 1 других файлов) |
| spiritAttacks | №0783 |
| spiritCommunication | №0812 |
| spiritDamage | №0812 |
| spiritDamageBonus | №0812 |
| spiritForm | №0783 |
| spiritHP | №0783 |
| spiritMantle | №0843 |
| spiritMaxHP | №0783 |
| spiritRangeFt | №0812 |
| spiritTypes | №0706 |
| spiritualDefense | №0843 |
| splashDice | №0077 |
| split | №0778 |
| splitAmongTargets | №0778 |
| splitDamage | №0778 |
| sporeling | №0685 |
| spread | №0057 |
| springSteel | №0672 |
| spurredArmy | №0778 |
| square | №0062 (+ 1 других файлов) |
| squaredCircle | №0715 |
| src | №0081 (+ 4 других файлов) |
| stability | №0079 (+ 1 других файлов) |
| Stability | №0079 |
| stable | №0800 (+ 2 других файлов) |
| stack | №0066 (+ 1 других файлов) |
| stacks | №0685 |
| stage | №0783 (+ 3 других файлов) |
| stage10 | №0077 |
| staged | №0841 |
| stair | №0066 |
| stairFrom | №0075 |
| stairHeight | №1161 |
| stairs | №0066 |
| stairTo | №0075 |
| stale | №0864 |
| stalkersProwess | №0640 |
| stalwartDefender | №0778 |
| stalwartSpirit | №0870 |
| stance | №0778 (+ 2 других файлов) |
| stanceRadiusFt | №0778 |
| stand | №0066 |
| standard | №0664 (+ 2 других файлов) |
| standingJump | №0778 |
| standTheFallen | №0778 |
| standUp | №0778 |
| start | №0713 |
| startActorTurn | №0640 |
| startedAt | №0861 |
| startedAtTurn | №0077 |
| startedTurn | №0817 |
| startElevation | №0817 |
| startingEquipment | №0077 (+ 3 других файлов) |
| startLevel | №0832 |
| startlingJinx | №0778 |
| startTurn | №0076 (+ 13 других файлов) |
| startTurnDamage | №0778 |
| startTurnHeal | №0778 |
| startTurnHealing | №0778 |
| startTurnNecrotic | №0778 |
| startX | №0817 (+ 1 других файлов) |
| startY | №0817 (+ 1 других файлов) |
| stat | №0076 (+ 21 других файлов) |
| STAT_ALIASES | №0826 |
| STAT_META | №0868 |
| statblock | №0077 |
| statBlock | №0832 (+ 1 других файлов) |
| statBonus | №0745 (+ 4 других файлов) |
| state | №0654 (+ 19 других файлов) |
| stateRevision | №0809 (+ 6 других файлов) |
| states | №0838 |
| statMode | №1771 |
| stats | №0623 (+ 51 других файлов) |
| status | №0831 (+ 58 других файлов) |
| STATUS | №0077 |
| stdio | №1077 (+ 2 других файлов) |
| steadfastOrder | №0778 |
| steadfastToughness | №0870 |
| stealth | №0771 (+ 1 других файлов) |
| stealthAdvantage | №0778 |
| stealthBonus | №0778 |
| stealthDisadvantage | №0083 |
| steed | №0656 |
| steel | №0667 (+ 3 других файлов) |
| steelBillet | №0672 |
| steelWire | №0672 |
| steelWireV38 | №1111 |
| stencil | №0072 |
| step | №0074 (+ 1 других файлов) |
| stepWind | №0647 |
| stickAndMove | №0778 |
| stillnessOfMind | №0647 |
| stock | №0798 (+ 2 других файлов) |
| stockCount | №0799 |
| stocky | №0065 |
| stolen | №0817 |
| stolenSpark | №0778 |
| stone | №0066 (+ 4 других файлов) |
| Stoneblood | №0794 |
| stonecutter | №0800 (+ 1 других файлов) |
| stoneDust | №0671 |
| stoneForm | №0778 |
| stoneFormToggle | №0778 |
| stoneReductionAppliesToMagic | №0778 |
| stoneToFlesh | №0778 |
| stool | №0066 |
| stop | №0846 |
| stopIntruder | №0775 |
| stopOnDefeat | №0782 (+ 4 других файлов) |
| stopped | №0817 (+ 1 других файлов) |
| storage | №0812 (+ 2 других файлов) |
| STORAGE_KEY | №0665 |
| stored | №0808 |
| storedHealingMax | №0778 |
| storm | №0640 |
| str | №0623 (+ 62 других файлов) |
| straight | №0065 |
| straightLine | №0778 |
| strands | №1271 |
| strangeMetabolism | №0640 |
| strategicAdjustments | №0778 |
| strategist | №0738 (+ 1 других файлов) |
| strBonus | №0640 |
| strChecksDisadvantage | №0640 (+ 1 других файлов) |
| strDexChecksDisadvantage | №0640 (+ 1 других файлов) |
| strDexSaveAdvantage | №0778 |
| stream | №0885 |
| streetSmart | №0715 |
| streetwise | №0778 |
| strength | №0785 (+ 11 других файлов) |
| Strength | №0079 |
| strengthAdvantage | №0817 |
| strengthFloor | №0817 |
| strengthInNumbers | №0778 |
| strengthMaxBonus | №0778 |
| strengthOrDexterity | №0697 (+ 3 других файлов) |
| strenuous | №0080 (+ 1 других файлов) |
| stressPressure | №0628 |
| strikeDice | №0778 |
| strIncrease | №0778 |
| strMaxBonus | №0640 |
| strMaxIncrease | №0778 |
| strokeOfLuck | №0647 |
| strongbow | №0778 |
| strOrDexSave | №0778 |
| strSave | №0778 |
| strSavesDisadvantage | №0640 (+ 1 других файлов) |
| stubble | №0060 (+ 1 других файлов) |
| student | №0775 |
| stun | №0775 |
| stunIfFailedBy5 | №0640 |
| stunned | №0778 (+ 2 других файлов) |
| stunnedUntilEndOfNextTurn | №0778 |
| stunning | №0778 |
| stunningStrike | №0647 (+ 1 других файлов) |
| stunOnFail | №0778 |
| stunOnFailBy5 | №0778 |
| style | №0778 (+ 33 других файлов) |
| styles | №0812 |
| subclass | №0785 (+ 20 других файлов) |
| SUBCLASS_FEATURES | №0647 |
| subclassBonds | №0685 |
| subclassDeepMagic | №0697 |
| subclasses | №0076 (+ 24 других файлов) |
| subclassFeature | №0775 |
| subclassFeatureCatalog | №0715 |
| subclassFeatureIdResolution | №0676 |
| subclassFeatureLevels | №0076 (+ 20 других файлов) |
| subclassId | №0660 (+ 2 других файлов) |
| subclassLevel | №0076 (+ 41 других файлов) |
| subclassSystem | №0676 (+ 4 других файлов) |
| subclassUse | №0778 |
| subjugateThrall | №0778 |
| subtle | №0647 (+ 1 других файлов) |
| subtractD8 | №0778 |
| subtractHemocraftDie | №0640 |
| subtree | №0791 (+ 3 других файлов) |
| success | №0077 (+ 24 других файлов) |
| successes | №0654 (+ 14 других файлов) |
| successorClientId | №1248 |
| successTempHp | №0778 |
| suit | №0820 |
| suite | №0853 |
| summary | №0627 (+ 12 других файлов) |
| summon | №0775 (+ 3 других файлов) |
| summonDevilJurist | №0778 |
| summonedId | №0817 |
| summonFamiliar | №0778 |
| summonFiendAt0HP | №0778 |
| summonOoze | №0077 |
| summonSpellId | №0829 |
| sunAura | №0817 |
| sunlightAttackAndPerceptionDisadvantage | №0778 |
| sunlightAttackAndSightDisadvantage | №0640 |
| sunlightHazard | №0808 |
| Sunwatcher | №0794 |
| superior | №0664 |
| superiorInspiration | №0647 |
| superiorInterdict | №0697 |
| superiorInterdictRestore | №0697 |
| superiorityDice | №0647 |
| supernal | №0778 (+ 1 других файлов) |
| supported | №0057 (+ 1 других файлов) |
| supportFetchAPI | №0885 |
| supportRangeFt | №0778 |
| suppressAilments | №0778 |
| suppressResistanceAndImmunity | №0778 |
| surface | №0065 |
| surfaceMaxDistance | №1127 (+ 1 других файлов) |
| surfaceMeanDistance | №1118 (+ 3 других файлов) |
| surfaceMedianDistance | №1118 (+ 3 других файлов) |
| surfaceP95Distance | №1118 (+ 3 других файлов) |
| surpriseAttack | №0778 |
| surveySettlement | №0778 |
| surveyWilderness | №0778 |
| survival | №0771 (+ 2 других файлов) |
| survive | №0734 |
| survivor | №0647 |
| suspended | №0654 (+ 1 других файлов) |
| sutureCost | №0808 |
| sutureOptions | №0808 |
| swamp | №0062 (+ 2 других файлов) |
| swapCard | №0820 |
| swappedTurns | №0820 (+ 2 других файлов) |
| swapWithThrallRangeFt | №0808 |
| swarm | №0060 (+ 2 других файлов) |
| swarm_bats | №1283 |
| swarm_beetles | №1283 |
| swarm_rats | №1283 |
| swarmCore | №0060 |
| swarmFloor | №0060 |
| swarmForm | №0062 (+ 3 других файлов) |
| swarmParts | №0060 |
| swarmPercent | №0062 (+ 3 других файлов) |
| swarmUnit | №0060 |
| swarmVortex | №0060 |
| sweep | №0060 (+ 1 других файлов) |
| sweepAttack | №0778 |
| sweepingStrike | №0778 |
| sweetDreams | №0778 |
| sweetScience | №0715 |
| swept | №0065 |
| swift | №0778 |
| Swiftblade | №0794 |
| swiftJinx | №0778 |
| swimFt | №0640 |
| swimSpeed | №0778 |
| swimSpeedEqualsWalking | №0778 |
| swine | №0773 |
| switchAlly | №0778 |
| swords | №0817 (+ 1 других файлов) |
| symbiosis | №0815 |
| sync | №0077 (+ 19 других файлов) |
| syncClassResources | №0647 |
| syncFromInitiative | №1191 |
| syncState | №0076 |
| syncTarotEntity | №0817 |
| synergy | №0078 |
| t | №0057 (+ 1 других файлов) |
| tab | №0848 (+ 3 других файлов) |
| table | №0066 (+ 18 других файлов) |
| tacticalExploit | №0738 |
| tacticalReposition | №0778 |
| tacticalSkill | №0738 |
| tacticalSuperiority | №0738 |
| tactician | №0781 (+ 1 других файлов) |
| Tactician | №0794 |
| tag | №0060 (+ 1 других файлов) |
| tagName | №1227 |
| tags | №0060 (+ 28 других файлов) |
| tail | №0060 |
| tailColor | №0065 (+ 3 других файлов) |
| tailCurve | №0065 (+ 1 других файлов) |
| tailLength | №0065 (+ 5 других файлов) |
| tailoring | №0061 |
| tailThickness | №0065 (+ 3 других файлов) |
| tailTip | №0062 (+ 1 других файлов) |
| tailTuftSize | №0065 (+ 1 других файлов) |
| takeAttack | №0834 |
| talent | №0778 |
| talentProgression | №0713 |
| talents | №0713 (+ 1 других файлов) |
| tannin | №0672 |
| target | №0060 (+ 46 других файлов) |
| targetAc | №0810 (+ 3 других файлов) |
| targetCount | №0778 |
| targetDefeated | №0654 (+ 3 других файлов) |
| targetedAllyAdvantage | №0778 |
| targetEntries | №1128 (+ 1 других файлов) |
| targetExtraRadiant | №0802 |
| targetFile | №1128 (+ 1 других файлов) |
| targetId | №0059 (+ 33 других файлов) |
| targetKey | №0076 |
| targetLevel | №0699 |
| targetMode | №0866 |
| targetName | №0783 (+ 2 других файлов) |
| targetOncePerLongRest | №0808 |
| targetPeerId | №0810 |
| targetRadiantDamage | №0778 |
| targetRequired | №0778 |
| targets | №0077 (+ 12 других файлов) |
| targetSelfOrTouch | №0778 |
| targetsFatigueRadiusFt | №0778 |
| targetsUpTo | №0778 |
| targetTurns | №0640 |
| targetType | №0812 |
| tarotActorRef | №0817 |
| tarotCoin | №0817 |
| tarotEffects | №1110 |
| tarotKnowledge | №1110 |
| tarotLastStartedTurn | №1110 |
| tarotModeApplied | №0654 (+ 1 других файлов) |
| tarotOwnerId | №0817 |
| tarotReaction | №0654 |
| tarotScene | №0654 (+ 14 других файлов) |
| taunt | №0775 (+ 1 других файлов) |
| team | №0077 (+ 8 других файлов) |
| teamAttackBonus | №0817 |
| techniques | №0834 |
| telekinesis | №0775 (+ 1 других файлов) |
| telekinesisLiftBonus | №0778 |
| telekinetic | №0781 |
| telekineticForce | №0778 |
| telekineticPush | №0778 |
| telepathic | №0781 |
| telepathicIntrusion | №0778 |
| telepathicIntrusionSave | №0778 |
| telepathy | №0778 |
| telepathyFt | №0775 |
| teleport | №0077 |
| teleportAllyId | №0818 (+ 2 других файлов) |
| teleportBetweenPaint | №0077 |
| teleportDamage | №0778 |
| teleported | №0817 |
| teleportFt | №0685 (+ 3 других файлов) |
| teleportNearTarget | №0778 |
| teleportRangeFt | №0808 |
| teleportSave | №0778 |
| teleportToImpact | №0077 |
| teleportWithFamiliar | №0812 |
| temp | №0785 (+ 3 других файлов) |
| tempAbsorbed | №0654 |
| temperament | №0800 |
| tempHp | №0077 (+ 19 других файлов) |
| tempHP | №0812 (+ 3 других файлов) |
| tempHpAtStartTurn | №0778 |
| tempHpBonus | №0778 |
| tempHpDice | №0778 |
| tempHpEach | №0778 |
| tempHpFromCharnel | №0808 |
| tempHpFromLightningDamage | №0778 |
| tempHpFromSealDamage | №0778 |
| tempHpOnApplause | №0775 |
| tempHpOnEnemyReducedToZero | №0778 |
| tempHpOnWake | №0778 |
| tempHpPerDie | №0778 |
| template | №0060 |
| templateNormals | №0060 |
| templates | №0656 |
| temple | №0800 (+ 1 других файлов) |
| temporary | №0778 |
| temporaryHp | №0781 |
| temporaryHP | №0077 |
| terrain | №0877 |
| terrorAndDecay | №0778 |
| terrorDie | №0778 |
| terrorizingForce | №0697 |
| test | №1081 |
| testMode | №0841 (+ 1 других файлов) |
| tests | №0853 |
| tethered | №0778 |
| TEXCOORD_0 | №1124 |
| texLoc | №0072 |
| text | №0811 (+ 2 других файлов) |
| textContent | №1227 |
| textile | №0669 |
| texture | №0061 (+ 4 других файлов) |
| Texture | №0069 |
| textures | №0072 (+ 1 других файлов) |
| textureTile | №0061 |
| thaumaturgy | №0778 |
| thaumaturgyEnhanced | №0808 |
| thenResistance | №0640 |
| thievesToolsBonus | №0778 |
| thieving | №0778 |
| thighL | №0058 |
| thighR | №0058 |
| thirdDisciplineLevel | №0713 |
| thirdparty | №0659 |
| thornsDice | №0868 |
| thrallAdvantage | №0808 |
| thrallAura | №0808 |
| thrallDance | №0808 |
| thrallDeathExplosion | №0808 |
| thrallEthereal | №0808 |
| thrallFlight | №0808 |
| thrallInvisible | №0808 |
| thralls | №0808 |
| thrallSlots | №0808 |
| thrallType | №0808 |
| thrallTypes | №0808 |
| thread | №0666 (+ 4 других файлов) |
| thresholds | №0804 |
| thrillOfTheHunt | №0778 |
| thrownRange | №0778 |
| thunder | №0647 |
| tiedMaximumsAllActive | №0868 |
| tier | №0664 |
| tights | №0061 |
| tile | №0061 |
| tiles | №0070 (+ 2 других файлов) |
| time | №0060 (+ 14 других файлов) |
| timeFrozen | №0817 |
| timelessBody | №0647 |
| timeMinutes | №1079 |
| timeout | №1120 (+ 37 других файлов) |
| timer | №0846 |
| times | №0067 |
| timeStop | №0817 |
| tinker | №0669 (+ 3 других файлов) |
| tinkerer | №0670 |
| tinOre | №0672 |
| tiny | №0815 (+ 1 других файлов) |
| tinyServant | №1184 |
| tissue | №0057 (+ 1 других файлов) |
| title | №0641 (+ 5 других файлов) |
| to | №0631 (+ 2 других файлов) |
| toad | №0685 |
| toggle | №0659 (+ 1 других файлов) |
| toggleCondition | №0654 (+ 3 других файлов) |
| toHit | №0873 (+ 3 других файлов) |
| token | №0652 (+ 3 других файлов) |
| tokenList | №1226 (+ 2 других файлов) |
| tokens | №0070 (+ 27 других файлов) |
| tombGuardian | №0778 |
| tool | №0625 (+ 20 других файлов) |
| toolBonus | №0807 |
| toolMastery | №0817 |
| toolName | №1079 |
| toolProficiencies | №0623 (+ 2 других файлов) |
| toolRequired | №0877 |
| tools | №0077 (+ 27 других файлов) |
| toolsAdvantage | №0817 |
| top | №0062 (+ 12 других файлов) |
| top10LargestMapped | №1129 |
| topknot | №0060 (+ 1 других файлов) |
| topY | №0061 |
| torso | №0060 (+ 2 других файлов) |
| torsoRidgeSize | №0065 (+ 4 других файлов) |
| torsoRidgeWidth | №0065 (+ 2 других файлов) |
| tortle | №1300 |
| total | №0627 (+ 53 других файлов) |
| total_length | №1121 |
| totalCp | №0798 |
| totalDomination | №0778 |
| totalGp | №0801 |
| totalLeather | №0662 |
| totalLength | №1130 |
| totalLevel | №0826 |
| totals | №1771 |
| totemSpirit | №0647 |
| toTheMat | №0778 |
| touchCurseThreshold | №0808 |
| touchedGlbVertexPct | №1129 |
| touchedGlbVertices | №1129 |
| touchMaxHpCut | №0808 |
| touchParalyzeThreshold | №0808 |
| touchRangeBonusFt | №0808 |
| touchThreshold | №0808 |
| towerShield | №0870 |
| town | №0066 |
| toxins | №0669 |
| toyArmy | №0808 |
| toymaker | №0808 |
| toySoulVault | №0808 |
| track | №0081 |
| trackInscribedRunesAnyPlane | №0778 |
| traderCount | №0799 |
| traderId | №0800 |
| traders | №0798 (+ 1 других файлов) |
| TRADERS | №0798 |
| tradition | №0812 (+ 1 других файлов) |
| traditionAction | №0812 |
| traditionRites | №0706 |
| traditions | №0706 (+ 1 других файлов) |
| trainHumanoids | №0778 |
| traits | №0657 (+ 2 других файлов) |
| transactionRevision | №0810 |
| transcended | №0713 (+ 1 других файлов) |
| Transcended | №0794 |
| transfer | №0815 |
| transferCondition | №0778 |
| transferDamage | №0778 |
| transferringAffliction | №0778 |
| transform | №0808 |
| transformed | №0817 |
| translation | №1084 |
| transport | №0809 |
| transposition | №0778 |
| traps | №0669 |
| treasure | №0066 |
| triangles | №0062 (+ 4 других файлов) |
| trickster | №0820 (+ 2 других файлов) |
| tricksterStatus | №0820 |
| tricksterTurn | №0817 |
| trigger | №0778 (+ 3 других файлов) |
| triggerDamageTypes | №0640 |
| triggerHealing | №0802 |
| triggerId | №0654 (+ 2 других файлов) |
| triggerMiraculousHealing | №0778 |
| triggerOnNearbyKill | №0640 |
| triggerOnPsychicDamage | №0778 |
| triggerSpend | №0808 |
| trough | №0066 |
| trousers | №0061 |
| trueSight | №0812 |
| truesightFt | №0778 |
| trunkSize | №0065 (+ 1 других файлов) |
| truth | №0802 |
| truthful | №0817 |
| truthfulIds | №0817 |
| ts | №0850 |
| turn | №0808 |
| turned | №0647 |
| turnEnd | №0817 |
| turnId | №1167 |
| turnIds | №0820 (+ 1 других файлов) |
| turnResources | №0077 (+ 34 других файлов) |
| turns | №0640 |
| turnStart | №0817 |
| turnUndead | №0647 |
| turtle | №0060 |
| tuskSize | №0065 (+ 2 других файлов) |
| twin_braids | №0060 (+ 1 других файлов) |
| twin_tails | №0060 (+ 1 других файлов) |
| twinFamiliar | №0778 |
| twinned | №0647 |
| twoRevelations | №0812 |
| type | №0069 (+ 113 других файлов) |
| typedDice | №0817 |
| typedExtraDice | №0077 (+ 3 других файлов) |
| typeKey | №0873 (+ 4 других файлов) |
| types | №0673 |
| u | №0060 (+ 1 других файлов) |
| uiGather | №0080 |
| uiRequired | №0713 |
| umbralImprecation | №0778 |
| unarmed | №0778 |
| unarmedAttack | №0640 (+ 3 других файлов) |
| unarmedAttackBonus | №0778 |
| unarmedDamage | №0778 |
| unarmedGraft | №1079 |
| unarmoredAC | №0778 |
| unavailable | №0076 (+ 11 других файлов) |
| unavoidableAccident | №0778 |
| unbreakable | №0640 (+ 2 других файлов) |
| Unbreakable | №0778 |
| unbreakableExploit | №0778 |
| unbridledChaos | №0778 |
| uncannyDodge | №0647 |
| unchanged | №1123 |
| uncommon | №0792 (+ 5 других файлов) |
| unconsciousAtFatigueGteCurrentHp | №0778 |
| unconsciousOrStunnedOnly | №0778 |
| undead | №0627 (+ 15 других файлов) |
| undeadFocusAvailable | №0640 |
| undeadFocusReaction | №0640 |
| undercut | №0060 (+ 1 других файлов) |
| underdark | №0062 |
| underwaterDarkvision | №0832 |
| underwear | №0061 |
| underwearBottom | №0065 (+ 5 других файлов) |
| underwearTop | №0065 (+ 6 других файлов) |
| undo | №0062 |
| undying | №0640 (+ 2 других файлов) |
| undyingServitude | №0808 |
| unequip | №0065 |
| unerringEye | №0778 |
| unfortunateAccident | №0778 |
| ungulate | №0773 |
| uniforms | №1080 |
| uniquePositionVertexCounts | №1130 |
| unit | №0060 (+ 4 других файлов) |
| unitGp | №0801 |
| units | №0798 |
| unknown | №1085 (+ 1 других файлов) |
| unleashed | №0713 (+ 1 других файлов) |
| unlimitedHybrid | №0778 |
| unlockRank | №0669 |
| unlockSchedule | №0820 |
| unreducedNecrotic | №0778 |
| unreducedSelfDamage | №0778 |
| unreducible | №0778 |
| unrivaledGenius | №0828 |
| unsealed | №0640 |
| unsealedArcana | №0640 |
| unsealedAspectReplacement | №0843 |
| unseen | №1189 |
| unshackledPower | №0778 |
| unstable | №0078 (+ 1 других файлов) |
| unstoppable | №0870 |
| unsupported | №0076 (+ 17 других файлов) |
| until | №0077 (+ 1 других файлов) |
| untilDismissed | №0778 |
| untilOwnEnd | №0817 |
| untilOwnEndAfterNext | №0817 |
| untilOwnerEnd | №0817 (+ 1 других файлов) |
| untilOwnerStart | №0817 |
| untilOwnStart | №0817 (+ 2 других файлов) |
| untilRound | №0817 |
| untouched | №1771 |
| unwaveringWill | №0738 |
| unyieldingResolve | №0734 |
| unyieldingWill | №0828 |
| update | №0829 (+ 1 других файлов) |
| updateAvailable | №0841 |
| updated | №0832 (+ 1 других файлов) |
| updated_at | №1110 |
| updatedAt | №0070 (+ 1 других файлов) |
| updateSwarm | №0060 |
| upperArmL | №0058 |
| upperArmR | №0058 |
| urbanAdvantage | №0775 |
| uri | №1119 |
| url | №0067 (+ 4 других файлов) |
| URL | №1202 (+ 5 других файлов) |
| urls | №0885 |
| ursine | №0773 |
| use | №0685 (+ 1 других файлов) |
| useCount | №0778 |
| used | №0623 (+ 21 других файлов) |
| usedBloodLevels | №0812 |
| usedBy | №0672 (+ 1 других файлов) |
| usedByV38 | №0671 (+ 1 других файлов) |
| usedCount | №0653 |
| usedLevels | №0812 |
| useDominantOrgan | №0868 |
| usedThisRound | №0804 |
| useFeature | №0077 (+ 16 других файлов) |
| useIntForStr | №0778 |
| useIntForStrengthOrDexOnSurge | №0778 |
| useLeadership | №0778 |
| user | №0652 (+ 1 других файлов) |
| userAgent | №0847 (+ 1 других файлов) |
| useRules | №0782 (+ 23 других файлов) |
| uses | №0697 (+ 5 других файлов) |
| usesAlchemistSupplies | №0810 |
| usesIntForPerception | №0778 |
| usesPerLongRest | №0077 (+ 2 других файлов) |
| usesPerRest | №0808 |
| usesPerTurn | №0778 |
| useSpiritAbility | №0783 |
| usesStrength | №0655 (+ 1 других файлов) |
| useStrength | №0778 |
| useStrengthWithBows | №0778 |
| useSubclassFeature | №0783 (+ 2 других файлов) |
| useTex | №1080 |
| useTexLoc | №0072 |
| uv | №0057 (+ 5 других файлов) |
| uvLoc | №0072 |
| v | №0057 (+ 2 других файлов) |
| V | №1157 |
| V52 | №1171 |
| V53 | №1172 |
| valiantLeader | №0738 |
| validate | №0819 |
| validatePack | №0660 |
| validateTurn | №0782 |
| value | №0059 (+ 26 других файлов) |
| valueGp | №0817 |
| valueMultiplier | №0664 |
| values | №0067 (+ 2 других файлов) |
| vampirism | №0076 |
| vanish | №0647 |
| variant | №0058 (+ 4 других файлов) |
| variantHooks | №0627 (+ 13 других файлов) |
| variants | №0077 (+ 2 других файлов) |
| VEC2 | №0067 (+ 4 других файлов) |
| VEC3 | №0067 (+ 4 других файлов) |
| VEC4 | №0067 (+ 4 других файлов) |
| vedalken | №0671 |
| vengefulBane | №0778 |
| venom | №0666 |
| Venom | №0079 |
| venomConcentrateV49 | №0666 |
| venomReagent | №0666 (+ 1 других файлов) |
| verbal | №0759 (+ 10 других файлов) |
| verbalBlocked | №0817 |
| verbalComponentsBlocked | №0077 |
| verify | №0652 |
| vermillion | №0640 |
| Vermillion | №0778 |
| vermin | №0773 |
| versatileAttackBonus | №0778 |
| versatileFightingAdvanced | №0778 |
| version | №0058 (+ 51 других файлов) |
| VERSION | №0058 (+ 56 других файлов) |
| vertexCount | №0062 (+ 1 других файлов) |
| vertexMask | №0058 |
| vertices | №0062 (+ 6 других файлов) |
| verticesPerRat | №0060 |
| very_rare | №0792 (+ 5 других файлов) |
| vesselMagic | №0843 |
| vessels | №0669 |
| vesselSlots | №0843 |
| vesselStrike | №0843 |
| vials | №0669 |
| victorySurgeExploit | №0778 |
| view | №0070 (+ 1 других файлов) |
| viewport | №1271 (+ 36 других файлов) |
| viewportHeight | №0062 |
| viewportWidth | №0062 |
| vileAffliction | №0778 |
| village | №0798 |
| vine | №0831 |
| vinegar | №0672 |
| violet | №0831 |
| visible | №0640 (+ 9 других файлов) |
| visibleMeleeOnly | №0778 |
| Vitality | №0079 |
| vitalitySplint | №0778 |
| voiceReagent | №0825 |
| volatility | №0079 |
| Volatility | №0079 |
| volume | №0060 (+ 1 других файлов) |
| volumes | №0060 |
| voluntarilyDetach | №0815 |
| voraciousWeapon | №0778 |
| vowOfEnmity | №0647 (+ 1 других файлов) |
| vpLoc | №0072 |
| vulnerabilities | №0654 (+ 9 других файлов) |
| vulnerability | №0640 (+ 2 других файлов) |
| vulnerable | №0849 (+ 1 других файлов) |
| w | №0057 (+ 10 других файлов) |
| wagerCurrent | №0820 |
| wagerMax | №0820 |
| wagerOdds | №0820 |
| wagers | №0820 (+ 1 других файлов) |
| wagerStartCheck | №0817 |
| waist | №0062 (+ 6 других файлов) |
| waiveSacrificeDamage | №0778 |
| wakeMageSleeper | №0817 |
| wall | №0070 |
| WALL | №0071 |
| wall_brick_red | №0071 |
| wall_concrete | №0071 |
| wall_half_timber | №0071 |
| wall_marble_dark | №0071 |
| wall_marble_light | №0071 |
| wall_moss_stone | №0071 |
| wall_old_plaster | №0071 |
| wall_plaster_dark | №0071 |
| wall_plaster_light | №0071 |
| wall_plaster_panel | №0071 |
| wall_slate | №0071 |
| wall_stone_dark | №0071 |
| wall_stone_light | №0071 |
| wall_stone_masonry | №0071 |
| wall_wallpaper | №0071 |
| wall_white_plaster | №0071 |
| wall_wood_dark | №0071 |
| wall_wood_light | №0071 |
| wallClimb | №0808 |
| walls | №0070 (+ 16 других файлов) |
| wallStart | №0625 |
| wandering | №0713 (+ 1 других файлов) |
| wands | №0817 (+ 1 других файлов) |
| wands_02 | №0817 |
| wantedCp | №0800 (+ 1 других файлов) |
| war_caster | №0781 |
| warCry | №0778 |
| ward | №0654 |
| wardAbsorbed | №0654 |
| wardDenied | №0654 |
| Warden | №0794 |
| wardenInterrupt | №0654 |
| wardenSource | №0794 |
| wardenSurvive | №0654 |
| warforged | №0671 |
| warfront | №1180 |
| warfrontEligible | №0630 |
| warlock | №0797 (+ 1 других файлов) |
| warlockLevelEquivalent | №0778 |
| Warlord | №0794 |
| warlordSource | №0794 |
| warning | №0663 |
| warPriest | №0647 |
| warriorPoet | №0778 |
| warsong | №0778 |
| warSongs | №0775 |
| waste | №0825 |
| wasteland | №0798 |
| water | №0671 (+ 1 других файлов) |
| waterBreathing | №0077 (+ 2 других файлов) |
| waterCore | №0825 |
| waterEssence | №0825 |
| wave | №0060 |
| wavy_bob | №0060 (+ 1 других файлов) |
| wavy_long | №0060 (+ 1 других файлов) |
| wax | №0667 (+ 2 других файлов) |
| Weakness | №0079 |
| weapon | №0066 (+ 13 других файлов) |
| weaponAttack | №0654 (+ 22 других файлов) |
| weaponAttackBonus | №0812 |
| weaponBonus | №0812 |
| weaponDamage | №0812 |
| weaponDamageType | №0778 |
| weaponFunctional | №1174 |
| weaponId | №0077 (+ 14 других файлов) |
| weaponMastery | №0734 |
| weaponMasteryLevels | №0734 |
| weaponOnly | №0817 |
| weaponProficiency | №0812 |
| weapons | №0792 (+ 66 других файлов) |
| weaponsData | №0623 (+ 2 других файлов) |
| weaponsmith | №0800 (+ 1 других файлов) |
| weaponTeleportIfDistanceGtFt | №0778 |
| weaponValue | №1174 |
| weaponWear | №1112 |
| wearForArmor | №0665 |
| wearForAttack | №0665 |
| wearRatio | №0664 |
| weasel | №0685 |
| weaver | №0667 (+ 6 других файлов) |
| webgl | №1279 |
| webPreferences | №0885 |
| webSecurity | №0885 |
| weight | №0064 (+ 48 других файлов) |
| weights | №0057 (+ 3 других файлов) |
| weld | №0057 |
| White | №0775 (+ 1 других файлов) |
| whiteHot | №0778 |
| width | №0062 (+ 48 других файлов) |
| wildCharge | №0778 |
| wildernessIntel | №0778 |
| wildMagicSurge | №0647 |
| wildShape | №0647 (+ 1 других файлов) |
| wildspace | №0629 (+ 1 других файлов) |
| wildspaceEligible | №0629 |
| wildwood | №0062 |
| willControlledBy | №0868 |
| willingTargetIds | №0818 (+ 1 других файлов) |
| window | №0066 (+ 77 других файлов) |
| wingColor | №0065 (+ 3 других файлов) |
| wingSize | №0065 (+ 1 других файлов) |
| wis | №0623 (+ 54 других файлов) |
| wisChecksAdvantage | №0640 (+ 1 других файлов) |
| wisChecksDisadvantage | №0640 (+ 1 других файлов) |
| wisdom | №0785 (+ 9 других файлов) |
| wisdomCheckAdvantage | №0812 |
| wisdomSaveAdvantage | №0778 |
| wisSave | №0778 |
| wisSavesDisadvantage | №0640 (+ 1 других файлов) |
| Witch | №0706 |
| witchCurse | №0778 |
| witchItemFlySpeed | №0808 |
| with | №0804 |
| withering | №0077 |
| withFileTypes | №0887 (+ 1 других файлов) |
| within10CellsPct | №1127 |
| within2CellsPct | №1127 |
| within5CellsPct | №1127 |
| within5GridCellsPct | №1132 |
| withinCellPct | №1127 |
| withinGridCellPct | №1132 |
| wizard | №0797 (+ 1 других файлов) |
| won | №0820 |
| wood | №0066 (+ 6 других файлов) |
| woodcarver | №0669 (+ 3 других файлов) |
| wooden | №0066 |
| woodwork | №0667 (+ 1 других файлов) |
| wool | №0061 |
| wordsOfAdamance | №0778 |
| wordsOfBenediction | №0778 |
| wordsOfDamnation | №0778 |
| wordsOfDomination | №0778 |
| wordsOfLegend | №0778 |
| wordsOfMayhem | №0778 |
| wordsOfZeal | №0778 |
| worg | №0685 |
| worldActor | №0073 |
| worldId | №0877 |
| worldMatrices | №0067 |
| worn | №0663 |
| wrapS | №0062 (+ 1 других файлов) |
| wrapT | №0062 (+ 1 других файлов) |
| wretchedCastigation | №0778 |
| writable | №0817 |
| write | №0077 (+ 1 других файлов) |
| x | №0060 (+ 47 других файлов) |
| xanathar | №0627 |
| xenoNecroticReady | №1078 |
| xp | №0627 (+ 16 других файлов) |
| xpFor | №0804 |
| xu | №0057 |
| xv | №0057 |
| xx | №0057 |
| xy | №0057 |
| y | №0060 (+ 44 других файлов) |
| yaw | №0060 (+ 2 других файлов) |
| yeast | №0671 |
| yew | №0672 |
| yieldMult | №0807 |
| yieldMultiplier | №0671 |
| yu | №0057 |
| yuan_ti | №0671 |
| yv | №0057 |
| yy | №0057 |
| z | №0060 (+ 3 других файлов) |
| zealousWords | №0775 |
| zeroHp | №0817 |
| zeroHpReaction | №0654 (+ 4 других файлов) |
| zeroHpSave | №0778 |
| zincOre | №0672 |
| zoneRadiusFt | №0778 |
| zones | №0070 (+ 1 других файлов) |
| zoom | №0069 (+ 3 других файлов) |

### Ключи localStorage (26)

| Имя | Исходные файлы |
|---|---|
| dnd_app_alpha | №0831 |
| dnd_app_font | №0831 |
| dnd_app_frame_color | №0831 |
| dnd_app_frame_style | №0831 |
| dnd_app_theme | №0831 |
| dnd_autorotate_enabled | №0867 |
| dnd_autorotate_interval | №0867 |
| dnd_campaigns_v1 | №0809 (+ 1 других файлов) |
| dnd_character_appearance_draft_v1 | №1279 |
| dnd_characters | №0830 |
| dnd_current_character_id | №0830 (+ 1 других файлов) |
| dnd_custom_races | №0823 |
| dnd_debug_enabled | №0831 (+ 2 других файлов) |
| dnd_launcher_icon | №0831 (+ 2 других файлов) |
| dnd_market_v55_state | №0801 (+ 1 других файлов) |
| dnd_modal_color | №0069 (+ 1 других файлов) |
| dnd_modal_opacity | №0069 (+ 1 других файлов) |
| dnd_multi_characters_v2 | №0623 (+ 44 других файлов) |
| dnd_selected_wallpaper | №0867 |
| dnd_ui_color | №0069 (+ 1 других файлов) |
| dnd_ui_opacity | №0069 (+ 1 других файлов) |
| dnd_v53_world_id | №0877 |
| dnd_v71_onboarding_done | №0814 (+ 1 других файлов) |
| dnd_vtt_mobile_session_v67 | №1249 |
| dnd_wallpaper_dim | №0867 |
| dndContentEnabled | №0660 |

### CSS переменные (16)

| Имя | Исходные файлы |
|---|---|
| --accent-action | №0836 |
| --accent-danger | №0836 |
| --accent-primary | №0836 |
| --accent-success | №0836 |
| --bg-box | №0836 |
| --bg-card | №0836 |
| --bg-input | №0836 |
| --bg-main | №0836 |
| --border-color | №0836 |
| --border-input | №0836 |
| --dnd-frame-art | №0836 |
| --dnd-frame-color | №0836 |
| --dnd-frame-filter | №0836 |
| --text-labels | №0836 |
| --text-main | №0836 |
| --text-muted | №0836 |

### Python/Java идентификаторы (429)

| Имя | Исходные файлы |
|---|---|
| __DND_APP_BOOT_READY | №0048 |
| __name__ | №0005 (+ 11 других файлов) |
| a | №0047 |
| aa | №0047 |
| action | №1310 (+ 1 других файлов) |
| active | №0047 (+ 1 других файлов) |
| activeFile | №0047 |
| activeRoot | №0048 |
| activeVersion | №0047 |
| activity | №0047 |
| actor | №1734 |
| actual | №1731 |
| aliases | №0047 |
| aligned | №1727 |
| android | №1320 |
| androidPackage | №1728 |
| animationClips | №1264 |
| ap | №1270 |
| apk | №1632 (+ 2 других файлов) |
| apkBytes | №0047 |
| app | №1320 |
| app_path | №1320 |
| APP_VERSION | №1320 |
| archive | №1727 |
| archives | №1310 |
| area | №1264 |
| args | №1264 (+ 6 других файлов) |
| artifacts | №0006 (+ 2 других файлов) |
| attributes | №1264 |
| av | №0047 |
| axis | №1264 |
| b | №0047 (+ 4 других файлов) |
| backup | №1731 |
| backup_hash | №1731 |
| badging | №1727 (+ 1 других файлов) |
| baselineInstall | №1732 |
| baseUrl | №0047 |
| bb | №0047 |
| binary | №1264 |
| blob | №0005 |
| blobs | №0006 |
| bones | №1264 |
| branch | №1265 |
| BRANCH | №0005 (+ 2 других файлов) |
| BRAND | №1731 |
| buf | №0047 |
| buffer | №1264 |
| build_run | №0005 (+ 1 других файлов) |
| build_script | №1734 |
| buildRoots | №1265 |
| bundled | №1734 |
| bv | №0047 |
| bytes | №0047 (+ 5 других файлов) |
| c | №0047 (+ 5 других файлов) |
| cache | №0047 |
| cacheBytes | №0047 |
| cacheKey | №0047 |
| candidate | №1732 |
| candidate_run | №1729 |
| candidates | №0047 (+ 1 других файлов) |
| canonical | №0047 |
| capture | №1727 (+ 1 других файлов) |
| capture_output | №0005 |
| catalog | №1310 |
| category | №1318 |
| cert | №1727 (+ 1 других файлов) |
| CERT | №1727 (+ 1 других файлов) |
| certificate | №0005 |
| channel | №1728 |
| checksums | №0005 |
| children | №0047 |
| choices | №1270 (+ 2 других файлов) |
| chunk | №1264 |
| ci | №1732 |
| client | №1731 |
| code | №1320 (+ 3 других файлов) |
| Code | №1727 (+ 1 других файлов) |
| codeCache | №0047 |
| codeCacheBytes | №0047 |
| codes | №1734 |
| component | №0047 |
| conclusion | №1732 |
| connectedComponents | №1264 |
| context | №0047 |
| converted | №1726 |
| count | №1264 (+ 1 других файлов) |
| counts | №1264 |
| created | №0006 |
| crlf | №1726 |
| current | №1320 (+ 1 других файлов) |
| cwd | №1265 (+ 1 других файлов) |
| d | №1269 |
| data | №0005 (+ 7 других файлов) |
| dataBytes | №0047 |
| dataRoot | №0047 |
| default | №1270 (+ 1 других файлов) |
| defaultFile | №0047 |
| defaultInterfaceOrientation | №1734 |
| degenerateTriangles | №1264 |
| dependencies | №1265 |
| descriptor | №0005 (+ 1 других файлов) |
| dest | №0006 (+ 1 других файлов) |
| destination | №0005 (+ 1 других файлов) |
| detected | №1270 |
| digest | №0005 (+ 3 других файлов) |
| dir | №1727 |
| dirs | №0047 |
| dklen | №1727 |
| dndvtt_update | №0047 |
| doc | №1736 |
| document | №1264 |
| downloadedBytes | №0047 |
| dtype | №1264 |
| duplicates | №1265 |
| edges | №1264 (+ 1 других файлов) |
| editorMorphs | №1264 |
| embeddedMorphChannels | №1264 |
| enabled | №0047 |
| encoding | №0005 (+ 10 других файлов) |
| encrypted | №1727 (+ 1 других файлов) |
| ensure_ascii | №0005 (+ 9 других файлов) |
| entries | №1311 (+ 1 других файлов) |
| entry | №0047 (+ 2 других файлов) |
| env | №0006 (+ 1 других файлов) |
| errors | №1265 (+ 1 других файлов) |
| event | №1732 |
| EXCLUDE_DIRS | №1318 |
| executor | №0047 |
| exist_ok | №0005 (+ 5 других файлов) |
| existing | №0005 |
| expected | №1726 (+ 1 других файлов) |
| expected_cert | №0005 |
| expected_name | №0005 |
| expectedBytes | №0047 |
| expectedHash | №0047 |
| export_apply | №1310 |
| export_format | №1310 |
| ext | №1270 (+ 1 других файлов) |
| f | №0047 (+ 1 других файлов) |
| faces | №1264 |
| failed | №0006 |
| feed | №0005 (+ 2 других файлов) |
| file | №0047 (+ 3 других файлов) |
| filepath | №1310 |
| files | №0006 (+ 8 других файлов) |
| filesBytes | №0047 |
| FIXTURE | №1726 |
| flags | №1632 |
| flush | №0005 |
| folder | №1728 (+ 1 других файлов) |
| found | №1731 |
| fp | №1311 |
| frontend | №1731 (+ 1 других файлов) |
| full_name | №1732 |
| GENERATED | №1318 |
| git_sha | №0005 |
| GITHUB_EVENT_NAME | №1732 |
| GITHUB_REF | №1732 |
| GITHUB_REPOSITORY | №1732 |
| GITHUB_SHA | №1732 |
| goToTab | №0048 |
| gradle | №1320 |
| gradle_path | №1320 |
| groups | №1265 |
| guids | №1265 |
| gx | №1269 |
| gy | №1269 |
| h | №1270 (+ 2 других файлов) |
| head_branch | №1732 |
| head_repository | №1732 |
| head_sha | №1732 |
| header | №1727 |
| headers | №0005 |
| healthy | №0048 |
| height | №1269 |
| help | №1320 |
| history | №1729 |
| history_path | №1729 |
| home | №1731 |
| i | №0047 (+ 1 других файлов) |
| iconId | №0047 |
| id | №0047 (+ 2 других файлов) |
| ids | №1264 |
| image | №1269 |
| in | №0047 |
| indent | №0005 (+ 8 других файлов) |
| indexComponentType | №1264 |
| info | №0047 |
| installedPayloadHashes | №1732 |
| intent | №1632 |
| isolatedProfileAndBackupPreserved | №1732 |
| item | №0005 (+ 3 других файлов) |
| jobs | №1728 (+ 1 других файлов) |
| k | №1310 |
| keepPrevious | №0047 |
| key | №1310 (+ 2 других файлов) |
| kind | №0006 (+ 3 других файлов) |
| landscapeActive | №0048 |
| latest | №0005 (+ 1 других файлов) |
| len | №0047 |
| length | №0047 (+ 2 других файлов) |
| limitations | №1265 |
| lines | №1310 |
| link | №1310 (+ 1 других файлов) |
| live | №1734 |
| live_feed | №0005 |
| loader | №0048 |
| local_path | №1729 |
| lower | №0047 |
| m | №1265 (+ 5 других файлов) |
| main | №1265 (+ 1 других файлов) |
| manifest | №0005 (+ 4 других файлов) |
| MANIFEST | №1318 |
| MANIFEST_PATHS | №1318 |
| manifestUrl | №0047 |
| marker | №1310 |
| materials | №1264 |
| meshes | №1310 |
| meshMetadata | №1264 |
| metavar | №1320 |
| method | №1727 |
| missing | №1727 |
| missing_ok | №1310 (+ 1 других файлов) |
| model | №1265 |
| module | №0006 |
| morphNames | №1264 |
| n | №0047 (+ 3 других файлов) |
| N | №1269 |
| name | №0047 (+ 4 других файлов) |
| names | №1727 |
| nativeSeedValidated | №0047 |
| new_manifest | №1729 |
| newCode | №1632 |
| next | №0047 (+ 1 других файлов) |
| noBackup | №0047 |
| noBackupBytes | №0047 |
| nonce | №1727 |
| nonFiniteValues | №1264 |
| normalized | №1726 |
| notes | №1728 (+ 1 других файлов) |
| notes_file | №1729 |
| o | №0047 |
| objects | №1310 |
| offset | №0005 (+ 1 других файлов) |
| oldCode | №1632 |
| original | №0006 (+ 1 других файлов) |
| ORIGINAL_BLOBS | №1731 |
| out | №0047 (+ 7 других файлов) |
| p | №1265 (+ 3 других файлов) |
| package | №1320 |
| PACKAGE | №1727 (+ 1 других файлов) |
| packageVersion | №0047 |
| parent | №0047 (+ 1 других файлов) |
| parents | №0006 (+ 6 других файлов) |
| parser | №1264 (+ 4 других файлов) |
| parts | №1264 |
| password | №1727 |
| patch | №1729 |
| path | №0005 (+ 6 других файлов) |
| paths | №1265 |
| payload | №1726 (+ 1 других файлов) |
| pending | №0047 |
| per_page | №1728 |
| physicalAndroidQa | №1727 |
| pixels | №1264 (+ 1 других файлов) |
| pkg | №1320 |
| pkg_path | №1320 |
| plaintext | №1727 |
| platform | №0005 (+ 1 других файлов) |
| player_settings | №1734 |
| pm | №0047 (+ 1 других файлов) |
| pores | №1269 |
| positions | №1264 |
| prefix | №0006 (+ 2 других файлов) |
| prefs | №0047 (+ 1 других файлов) |
| previewRoot | №0047 |
| previous | №0005 (+ 3 других файлов) |
| previousDir | №0047 |
| previousRequestedOrientation | №0048 |
| primitives | №1264 |
| prior | №1729 |
| probe | №1727 |
| PUBLISHED_APK_SHA | №1727 |
| publisher | №1728 |
| pushed | №0006 |
| qa | №1728 (+ 1 других файлов) |
| queue | №1265 |
| raw | №0047 |
| rawBounds | №1264 |
| reach | №1269 |
| received | №0047 |
| records | №1310 |
| reinstall | №1732 |
| rel | №1318 |
| relative | №1310 |
| release | №1734 |
| release_exists | №1729 |
| remote | №1734 |
| REPO | №0005 (+ 2 других файлов) |
| report | №0005 (+ 5 других файлов) |
| request | №0005 (+ 1 других файлов) |
| required | №1264 (+ 5 других файлов) |
| restore | №0048 |
| result | №1632 |
| return_counts | №1264 |
| return_inverse | №1264 |
| return_value | №1732 |
| returncode | №0005 (+ 1 других файлов) |
| reverse | №1734 |
| rng | №1269 |
| root | №0006 (+ 8 других файлов) |
| ROOT | №1264 (+ 8 других файлов) |
| root_url | №1270 |
| rootEntries | №0047 |
| roots | №1264 (+ 1 других файлов) |
| rough | №1269 |
| row | №1265 |
| rows | №1736 |
| run | №1728 (+ 1 других файлов) |
| run_data | №1729 |
| RUNNER_TEMP | №1732 |
| runtime | №1732 |
| RUNTIME_MANIFEST | №1318 |
| runtimeSmoke | №1732 |
| s | №0047 (+ 1 других файлов) |
| scene | №1732 |
| schema | №1264 (+ 2 других файлов) |
| sdk | №0005 (+ 1 других файлов) |
| seamDuplicates | №1264 |
| seen | №1265 (+ 2 других файлов) |
| selected | №0047 |
| selectedIndex | №0047 |
| separators | №1311 (+ 1 других файлов) |
| settings | №1727 (+ 2 других файлов) |
| sha | №0006 |
| sha256 | №1264 (+ 4 других файлов) |
| side_effect | №1732 |
| signer | №1729 |
| signers | №0005 |
| signingCertificateSha256 | №1727 |
| sigs | №1632 |
| skins | №1264 |
| skipped | №1310 |
| source | №0006 (+ 2 других файлов) |
| SOURCE | №1733 |
| source_commit | №0005 (+ 2 других файлов) |
| sourceCommit | №1727 |
| sourceRefs | №1265 |
| sources | №1726 |
| spec | №0006 (+ 2 других файлов) |
| src | №0047 |
| stack | №0047 |
| stage | №1727 (+ 1 других файлов) |
| staged | №0047 |
| stageRoot | №0047 |
| standalone | №1310 |
| state | №0047 |
| status | №1727 (+ 2 других файлов) |
| stderr | №1727 (+ 1 других файлов) |
| stdout | №1729 |
| store | №1727 (+ 1 других файлов) |
| strides | №1264 |
| sums | №0005 |
| tag | №0005 (+ 1 других файлов) |
| target | №0047 (+ 4 других файлов) |
| targets | №0006 |
| temp | №1310 |
| text | №0005 (+ 6 других файлов) |
| texts | №1265 |
| ti | №0047 |
| timeout | №0005 (+ 1 других файлов) |
| title | №0048 |
| tools | №1729 |
| topology | №1264 |
| total | №0047 |
| totalBytes | №0047 |
| totalFiles | №0047 |
| tracked | №1265 |
| triangles | №1264 |
| type | №0047 (+ 4 других файлов) |
| ui | №1734 |
| uniquePositions | №1264 |
| unit | №0047 |
| units | №0047 |
| UNITY_ANDROID_KEYSTORE_BASE64 | №1732 |
| UNITY_CI_ARTIFACT_PASSWORD | №1732 |
| UNITY_EMAIL | №1732 |
| UNITY_LICENSE | №1732 |
| UNITY_PASSWORD | №1732 |
| UNITY_SERIAL | №1732 |
| unityGuidEdges | №1265 |
| unknownFilePreserved | №1732 |
| updateBytes | №0047 |
| updater | №0048 (+ 1 других файлов) |
| updateRoot | №0047 |
| upgrade | №1732 |
| uri | №1265 (+ 1 других файлов) |
| url | №0005 (+ 4 других файлов) |
| use_global | №1310 |
| use_selection | №1310 |
| uv | №1264 |
| uvOutsideUnitSquare | №1264 |
| uvRange | №1264 |
| validate | №1727 |
| value | №0047 |
| verbosity | №1732 |
| verified | №0005 (+ 1 других файлов) |
| version | №0005 (+ 5 других файлов) |
| Version | №1727 (+ 1 других файлов) |
| VERSION | №1318 |
| versionCode | №0006 (+ 3 других файлов) |
| versionName | №0047 (+ 2 других файлов) |
| versions | №0047 (+ 1 других файлов) |
| versionsBytes | №0047 |
| vertices | №1264 |
| view | №1264 |
| visited | №0047 |
| VTT_PROJECT_MANIFEST_V70 | №1311 (+ 1 других файлов) |
| webView | №0048 |
| weights | №1264 |
| weightSumMaxError | №1264 |
| weldedBoundaryEdges | №1264 |
| weldedNonManifoldEdges | №1264 |
| weldTolerance | №1264 |
| width | №1264 |
| windows | №1732 |
| windowsFiles | №1727 |
| z | №1320 |
| zeroWeightVertices | №1264 |

### JSON поля (597)

| Имя | Исходные файлы |
|---|---|
| _builderBaseStats | №1662 (+ 1 других файлов) |
| abilities | №1662 (+ 1 других файлов) |
| ac | №1662 (+ 1 других файлов) |
| acBase | №1662 (+ 1 других файлов) |
| accepted | №1723 |
| acFormula | №1662 (+ 1 других файлов) |
| acidResistance | №1662 (+ 1 других файлов) |
| acrobatics | №1662 (+ 1 других файлов) |
| action | №0756 (+ 2 других файлов) |
| activeConditions | №1662 (+ 1 других файлов) |
| activeFolderId | №1723 |
| african | №0917 |
| age | №0917 (+ 2 других файлов) |
| allManifestEntriesMatchPhysicalZIP | №0904 (+ 1 других файлов) |
| allowToChangeInstallationDirectory | №1063 |
| allUnpackedSizesAndSHA256 | №0904 (+ 1 других файлов) |
| amount | №1723 |
| amphibious | №1662 (+ 1 других файлов) |
| android | №1068 (+ 2 других файлов) |
| androidDebug | №0921 |
| androidPackage | №1068 (+ 1 других файлов) |
| androidSignedRelease | №0921 |
| androidSigningCertificateSha256 | №1768 |
| animalHandling | №1662 (+ 1 других файлов) |
| animationClips | №0910 |
| answers | №1723 |
| app | №1775 (+ 2 других файлов) |
| appId | №1063 |
| approved | №1067 |
| arcana | №1662 (+ 1 других файлов) |
| arch | №1063 |
| archiveBytes | №0904 (+ 2 других файлов) |
| archiveCRC | №1015 |
| armLength | №0085 (+ 1 других файлов) |
| armLength-decr | №0085 (+ 1 других файлов) |
| armLength-incr | №0085 (+ 1 других файлов) |
| armor | №1662 (+ 1 других файлов) |
| arms | №0085 (+ 1 других файлов) |
| artifact | №0904 (+ 1 других файлов) |
| artifactBytes | №0904 (+ 1 других файлов) |
| artifactDigest | №0904 (+ 1 других файлов) |
| artifactName | №1063 |
| artifacts | №1068 (+ 2 других файлов) |
| asar | №1063 |
| asian | №0917 |
| assetId | №0750 (+ 13 других файлов) |
| athletics | №1662 (+ 1 других файлов) |
| attackType | №1662 |
| attributes | №0910 |
| audit | №0917 |
| author | №0750 (+ 12 других файлов) |
| background | №1662 (+ 1 других файлов) |
| backgroundFeature | №1662 (+ 1 других файлов) |
| backgroundLanguagesToChoose | №1662 (+ 1 других файлов) |
| backgrounds | №1662 |
| backslash | №0754 (+ 1 других файлов) |
| backslashTexture | №0754 (+ 1 других файлов) |
| balanced | №1117 |
| base | №1329 |
| baseAc | №1662 |
| baseAC | №1662 (+ 1 других файлов) |
| baseAcFormula | №1662 |
| baseColorFactor | №0910 |
| baseObj | №0085 (+ 1 других файлов) |
| basePositionsSha256 | №0085 (+ 1 других файлов) |
| baseUrl | №1775 (+ 2 других файлов) |
| binary | №0085 (+ 1 других файлов) |
| binarySha256 | №0085 (+ 1 других файлов) |
| binaryTransfer | №0919 |
| blockedVersions | №1775 (+ 2 других файлов) |
| bones | №0910 |
| bonuses | №1662 (+ 1 других файлов) |
| branch | №1013 |
| brave | №1662 (+ 1 других файлов) |
| breast-volume-decr | №0085 (+ 1 других файлов) |
| breast-volume-incr | №0085 (+ 1 других файлов) |
| breastSize | №0085 (+ 1 других файлов) |
| breathWeapon | №1662 (+ 1 других файлов) |
| build | №1063 |
| buildRoots | №1013 |
| bytes | №1782 (+ 16 других файлов) |
| candidateRunId | №1067 |
| cases | №1723 |
| castingTime | №1662 |
| category | №1782 (+ 2 других файлов) |
| caucasian | №0917 |
| cell | №0750 (+ 17 других файлов) |
| cha | №1662 (+ 1 других файлов) |
| changedVertices | №0917 (+ 1 других файлов) |
| changes | №1659 (+ 1 других файлов) |
| channel | №1067 (+ 7 других файлов) |
| channels | №0085 (+ 1 других файлов) |
| charge | №1662 (+ 1 других файлов) |
| charisma | №1662 |
| chest | №0910 (+ 2 других файлов) |
| choiceHistory | №1662 (+ 1 других файлов) |
| choices | №1662 |
| choiceState | №1662 (+ 1 других файлов) |
| chromiumQA | №0904 |
| class | №1662 (+ 1 других файлов) |
| classes | №1662 (+ 1 других файлов) |
| classFeaturesState | №1662 (+ 1 других файлов) |
| className | №1662 (+ 1 других файлов) |
| climb | №1662 (+ 1 других файлов) |
| cloudUnityBuildLicenseConfigured | №1768 |
| coinCases | №1723 |
| coinLog | №1723 |
| coins | №1723 |
| coldResistance | №1662 (+ 1 других файлов) |
| commit | №0085 (+ 1 других файлов) |
| components | №1662 |
| compositeTerms | №0917 |
| compositions | №0085 (+ 1 других файлов) |
| con | №1662 (+ 1 других файлов) |
| concentration | №1662 |
| conclusion | №0904 (+ 1 других файлов) |
| connectedComponents | №0910 |
| constitution | №1662 (+ 1 других файлов) |
| consumables | №1662 (+ 1 других файлов) |
| controlled | №0750 (+ 3 других файлов) |
| cost | №1662 (+ 1 других файлов) |
| count | №0085 (+ 5 других файлов) |
| cp | №1723 |
| cPerS | №1723 |
| craftBonuses | №1662 |
| CRC | №0904 (+ 1 других файлов) |
| createDesktopShortcut | №1063 |
| createStartMenuShortcut | №1063 |
| creation | №1662 |
| creationCases | №1723 |
| cupsize | №0917 |
| currentFloor | №0750 (+ 17 других файлов) |
| customizations | №0001 |
| cutoff | №0917 |
| d | №0750 (+ 17 других файлов) |
| damage | №1662 (+ 1 других файлов) |
| damageType | №1662 (+ 1 других файлов) |
| darkness | №0750 (+ 17 других файлов) |
| darkvisionFt | №1662 (+ 1 других файлов) |
| date | №1659 (+ 1 других файлов) |
| debug | №0904 |
| deception | №1662 (+ 1 других файлов) |
| declaredSourceCommit | №0917 |
| defaultDependencyTypeInfo | №1761 |
| defaultInstantiationMode | №1761 |
| degenerateTriangles | №0910 |
| dependencies | №1744 (+ 1 других файлов) |
| dependencyTypeInfos | №1761 |
| depth | №1745 |
| derived | №1404 |
| desc | №1662 |
| description | №0750 (+ 18 других файлов) |
| destination | №1404 |
| destinationGender | №0917 |
| devDependencies | №1063 |
| dex | №1662 (+ 1 других файлов) |
| dexterity | №1662 (+ 1 других файлов) |
| directories | №1063 |
| doubleSided | №0910 |
| duplicates | №1013 |
| duration | №1662 |
| e | №0750 (+ 17 других файлов) |
| editorMorphs | №0910 |
| effect | №1662 (+ 1 других файлов) |
| electron | №1063 |
| electron-builder | №1063 |
| embeddedMorphChannels | №0910 |
| emitsLight | №0756 (+ 1 других файлов) |
| enclosed | №1117 |
| ep | №1723 |
| equipped | №1723 |
| eTexture | №0750 (+ 17 других файлов) |
| expected | №1723 |
| exportedMacros | №0917 |
| extensions | №0001 |
| extraClassName | №1662 |
| extraClassType | №1662 |
| fail | №0904 (+ 1 других файлов) |
| feats | №1662 (+ 1 других файлов) |
| feature | №1662 |
| features | №0001 (+ 2 других файлов) |
| femaleStackTerms | №0917 |
| feyAncestry | №1662 (+ 1 других файлов) |
| file | №1662 (+ 1 других файлов) |
| fileCount | №1782 |
| files | №1782 (+ 10 других файлов) |
| fireResistance | №1662 (+ 1 других файлов) |
| firmness | №0917 |
| fixtureSha256 | №0917 (+ 1 других файлов) |
| flight | №1662 (+ 1 других файлов) |
| floor | №0750 (+ 3 других файлов) |
| floors | №0750 (+ 18 других файлов) |
| flow | №0904 |
| folder | №0085 (+ 3 других файлов) |
| folderCases | №1723 |
| folders | №1662 (+ 1 других файлов) |
| gender | №0917 (+ 2 других файлов) |
| generated | №1782 (+ 3 других файлов) |
| gitBlob | №0921 |
| glide | №1662 (+ 1 других файлов) |
| gp | №1723 |
| gPerE | №1723 |
| groupKey | №1662 (+ 1 других файлов) |
| h | №0750 (+ 17 других файлов) |
| hands | №1662 (+ 1 других файлов) |
| head | №0085 (+ 1 других файлов) |
| head-decr | №0085 (+ 1 других файлов) |
| head-incr | №0085 (+ 1 других файлов) |
| height | №0750 (+ 18 других файлов) |
| hero | №1723 |
| hips | №0910 (+ 2 других файлов) |
| history | №1662 (+ 1 других файлов) |
| hitDice | №1662 (+ 1 других файлов) |
| hitDie | №1662 |
| horns | №1662 (+ 1 других файлов) |
| hpBonusPerLevel | №1662 |
| hpCurrent | №1662 (+ 1 других файлов) |
| hpMax | №1662 (+ 1 других файлов) |
| human-female | №1314 |
| id | №0750 (+ 25 других файлов) |
| image | №0001 |
| immunities | №1662 (+ 1 других файлов) |
| incomingUnityReferences | №1013 |
| indexComponentType | №0910 |
| innateSpellcasting | №1662 (+ 1 других файлов) |
| input | №1723 |
| insight | №1662 (+ 1 других файлов) |
| int | №1662 (+ 1 других файлов) |
| intelligence | №1662 (+ 1 других файлов) |
| intelligence_or_charisma | №1662 |
| intensity | №0750 (+ 17 других файлов) |
| interactive | №0756 (+ 1 других файлов) |
| intimidation | №1662 (+ 1 других файлов) |
| inventory | №1723 |
| inventoryCases | №1723 |
| investigation | №1723 |
| isExtra | №1662 |
| isExtraClass | №1662 |
| item | №1723 |
| items | №1662 |
| joints | №0917 (+ 2 других файлов) |
| JOINTS_0 | №0910 |
| junk | №1662 (+ 1 других файлов) |
| keep | №1723 |
| key | №1329 (+ 2 других файлов) |
| kind | №1782 |
| label | №1662 (+ 1 других файлов) |
| languages | №1662 |
| legacy | №0904 (+ 1 других файлов) |
| legacyApkInput | №1013 |
| legLength | №0085 (+ 1 других файлов) |
| legLength-decr | №0085 (+ 1 других файлов) |
| legLength-incr | №0085 (+ 1 других файлов) |
| legs | №0085 (+ 1 других файлов) |
| level | №1662 (+ 1 других файлов) |
| levelOneFeatures | №1662 |
| library | №0750 (+ 15 других файлов) |
| license | №0085 (+ 1 других файлов) |
| licenseReview | №1013 |
| lighting | №0750 (+ 17 других файлов) |
| lightIntensity | №0756 (+ 1 других файлов) |
| lightRadius | №0756 (+ 1 других файлов) |
| limitations | №0085 (+ 3 других файлов) |
| localRuntimeTests | №0919 |
| loot | №0750 (+ 1 других файлов) |
| lucky | №1662 (+ 1 других файлов) |
| macroConfigSha256 | №0917 |
| magicResistance | №1662 (+ 1 других файлов) |
| main | №1013 (+ 1 других файлов) |
| manifest | №0904 (+ 1 других файлов) |
| mapId | №0750 (+ 13 других файлов) |
| maps | №1404 |
| material | №1662 |
| materials | №0910 (+ 2 других файлов) |
| maxCapacityKg | №1723 |
| maxDisplacementMeters | №0917 (+ 1 других файлов) |
| measure-thigh-circ-decr | №0085 (+ 1 других файлов) |
| measure-thigh-circ-incr | №0085 (+ 1 других файлов) |
| measure-upperarm-circ-decr | №0085 (+ 1 других файлов) |
| measure-upperarm-circ-incr | №0085 (+ 1 других файлов) |
| medicine | №1723 |
| mentalShield | №1662 (+ 1 других файлов) |
| meshes | №1060 |
| meshMetadata | №0910 |
| metallicFactor | №0910 |
| method | №0085 (+ 1 других файлов) |
| MhObjectType | №0910 |
| MhScaleFactor | №0910 |
| mimicry | №1662 (+ 1 других файлов) |
| minAppVersion | №1775 (+ 2 других файлов) |
| minStr | №1662 (+ 1 других файлов) |
| model | №0750 (+ 18 других файлов) |
| models | №1329 (+ 1 других файлов) |
| modifiers | №1723 |
| morphNames | №0910 |
| MPFB_GEN_object_type | №0910 |
| MPFB_GEN_scale_factor | №0910 |
| MPFB_HUM_african | №0910 |
| MPFB_HUM_age | №0910 |
| MPFB_HUM_asian | №0910 |
| MPFB_HUM_caucasian | №0910 |
| MPFB_HUM_cupsize | №0910 |
| MPFB_HUM_firmness | №0910 |
| MPFB_HUM_gender | №0910 |
| MPFB_HUM_height | №0910 |
| MPFB_HUM_is_human_project | №0910 |
| MPFB_HUM_material_source | №0910 |
| MPFB_HUM_muscle | №0910 |
| MPFB_HUM_proportions | №0910 |
| MPFB_HUM_weight | №0910 |
| multiclassAllowed | №1662 |
| muscle | №0917 |
| n | №0750 (+ 17 других файлов) |
| name | №0001 (+ 27 других файлов) |
| nameRu | №1662 |
| naturalArmor | №1662 (+ 1 других файлов) |
| nature | №1723 |
| necroticResistance | №1662 (+ 1 других файлов) |
| negative | №0085 (+ 3 других файлов) |
| newSceneOverride | №1761 |
| nextAction | №0921 |
| nimbleEscape | №1662 (+ 1 других файлов) |
| noBreath | №1662 (+ 1 других файлов) |
| nonFiniteValues | №0910 |
| NORMAL | №0910 |
| noSleep | №1662 (+ 1 других файлов) |
| note | №1067 |
| noteCase | №1723 |
| notes | №1068 (+ 2 других файлов) |
| nsis | №1063 |
| nTexture | №0750 (+ 17 других файлов) |
| objects | №0750 (+ 17 других файлов) |
| offset | №0085 (+ 2 других файлов) |
| oldApk | №1015 |
| oneClick | №1063 |
| options | №1662 |
| origin | №1662 (+ 1 других файлов) |
| originalBytes | №1015 |
| ota_install_contract | №0906 |
| output | №1063 |
| packages | №1006 (+ 1 других файлов) |
| packTactics | №1662 (+ 1 других файлов) |
| pages | №0921 |
| paid_api_authorized | №0002 |
| parts | №1068 |
| pass | №0904 (+ 1 других файлов) |
| path | №1782 (+ 5 других файлов) |
| paths | №1013 |
| pbrMetallicRoughness | №0910 |
| pectorals | №0085 (+ 1 других файлов) |
| pendingChoices | №1662 (+ 1 других файлов) |
| perception | №1662 (+ 1 других файлов) |
| performance | №1662 (+ 1 других файлов) |
| perMachine | №1063 |
| persuasion | №1662 (+ 1 других файлов) |
| physical_android_test | №0906 |
| physicalAndroidQa | №1768 |
| physicalAndroidQA | №0904 (+ 3 других файлов) |
| physicalZIP | №0904 |
| pixels | №0910 |
| poisonImmunity | №1662 (+ 1 других файлов) |
| poisonResistance | №1662 (+ 1 других файлов) |
| portable | №1063 |
| POSITION | №0910 |
| positive | №0085 (+ 3 других файлов) |
| postCreateCommand | №0001 |
| powerfulBuild | №1662 (+ 1 других файлов) |
| pp | №1723 |
| pPerG | №1723 |
| primitives | №0910 |
| private | №1063 |
| productionSyntaxFiles | №0904 (+ 1 других файлов) |
| productName | №1063 |
| profBonus | №1662 (+ 1 других файлов) |
| profession | №1662 (+ 1 других файлов) |
| proficiencies | №1662 (+ 1 других файлов) |
| proficiency | №1723 |
| proficiencyType | №1662 (+ 1 других файлов) |
| project | №0085 (+ 1 других файлов) |
| pronounced | №1117 |
| properties | №1662 (+ 1 других файлов) |
| proportions | №0917 |
| psychicResistance | №1662 (+ 1 других файлов) |
| publication | №0904 (+ 1 других файлов) |
| quota_scope | №0002 |
| race | №0917 |
| raceCraftBonuses | №1662 |
| raceFeatureDescriptions | №1662 (+ 1 других файлов) |
| raceHpBonusPerLevel | №1662 |
| raceId | №1662 (+ 1 других файлов) |
| raceMechanics | №1662 (+ 1 других файлов) |
| raceName | №1662 (+ 1 других файлов) |
| races | №1662 |
| radiantResistance | №1662 (+ 1 других файлов) |
| radius | №0750 (+ 17 других файлов) |
| range | №1662 |
| rarity | №1662 (+ 1 других файлов) |
| rates | №1723 |
| rawBounds | №0910 |
| reason | №1404 |
| recommendedSourceCommit | №0917 |
| regression | №0904 (+ 1 других файлов) |
| release | №0919 |
| release_ready | №0002 |
| release_reason | №0002 |
| release_source_sha | №0002 |
| releaseCommit | №0904 (+ 1 других файлов) |
| releases | №1659 (+ 1 других файлов) |
| releaseType | №1067 |
| releaseUrl | №1768 |
| relentlessEndurance | №1662 (+ 1 других файлов) |
| religion | №1662 (+ 1 других файлов) |
| removed | №1723 |
| repairable | №1662 (+ 1 других файлов) |
| replacesRace | №1662 |
| required_editor_assets | №0906 |
| requiredAssets | №0750 (+ 13 других файлов) |
| resistanceDamageType | №1662 |
| resistances | №1662 (+ 1 других файлов) |
| resources | №1723 |
| resultCp | №1723 |
| resultEp | №1723 |
| resultGp | №1723 |
| resultPp | №1723 |
| resultSp | №1723 |
| retry_after | №0002 |
| ritual | №1662 |
| rmsDisplacementMeters | №0917 (+ 1 других файлов) |
| rootCause | №0904 |
| rotation | №0751 (+ 11 других файлов) |
| roughnessFactor | №0910 |
| runtime | №0917 (+ 1 других файлов) |
| runtimeOTARegression | №0904 |
| s | №0750 (+ 15 других файлов) |
| sameTreeDuplicates | №1013 |
| savageAttacks | №1662 (+ 1 других файлов) |
| savesData | №1662 (+ 1 других файлов) |
| savingThrow | №1662 |
| scale | №0085 (+ 19 других файлов) |
| schema | №0085 (+ 9 других файлов) |
| schemaVersion | №0750 (+ 15 других файлов) |
| school | №1662 |
| scope | №1067 |
| scripts | №1063 |
| seamDuplicates | №0910 |
| seamMaxMeters | №0917 (+ 1 других файлов) |
| searchable | №0750 (+ 11 других файлов) |
| seconds | №0904 (+ 1 других файлов) |
| seed | №1662 |
| selectedTexture | №0750 (+ 17 других файлов) |
| selectedTool | №0750 (+ 17 других файлов) |
| selectedWallTexture | №0750 (+ 17 других файлов) |
| settings | №0001 |
| sha | №1068 |
| sha256 | №1782 (+ 13 других файлов) |
| shapeshifter | №1662 (+ 1 других файлов) |
| shippedSha256 | №0917 (+ 1 других файлов) |
| shoulders | №0910 (+ 2 других файлов) |
| showAbove | №0750 (+ 1 других файлов) |
| showBelow | №0750 (+ 1 других файлов) |
| showCeilings | №0750 (+ 1 других файлов) |
| showEp | №1723 |
| showPp | №1723 |
| signedRelease | №0904 |
| signingCertificateSha256 | №1068 |
| size | №1662 (+ 1 других файлов) |
| sizeChoice | №1662 (+ 1 других файлов) |
| skillBonuses | №1662 (+ 1 других файлов) |
| skills | №1662 (+ 1 других файлов) |
| skillsData | №1662 (+ 1 других файлов) |
| skins | №0910 |
| sky | №0751 (+ 9 других файлов) |
| slash | №0754 (+ 1 других файлов) |
| slashTexture | №0754 (+ 1 других файлов) |
| sleightOfHand | №1662 (+ 1 других файлов) |
| somatic | №1662 |
| source | №0085 (+ 6 других файлов) |
| sourceByteEquality | №1015 |
| sourceCommit | №1404 (+ 3 других файлов) |
| sourceGlbSha256 | №0917 |
| sourceHashes | №0085 (+ 2 других файлов) |
| sourceProject | №0917 |
| sourceRefs | №1013 |
| sourceRelease | №1015 |
| sources | №0917 (+ 3 других файлов) |
| sourceSha256 | №0917 (+ 1 других файлов) |
| sourceStackTerms | №0917 |
| sp | №1723 |
| speed | №1662 (+ 1 других файлов) |
| speedFt | №1662 (+ 1 других файлов) |
| spells | №1662 |
| spellsData | №1662 (+ 1 других файлов) |
| spellSlotsData | №1662 (+ 1 других файлов) |
| sPerG | №1723 |
| spiderClimb | №1662 (+ 1 других файлов) |
| stableVersion | №0904 (+ 1 других файлов) |
| stacked | №1723 |
| stage | №0919 |
| stairDirection | №0750 (+ 3 других файлов) |
| stairFrom | №0750 (+ 3 других файлов) |
| stairsTo | №0751 (+ 5 других файлов) |
| stairTo | №0750 (+ 3 других файлов) |
| stat | №1662 (+ 1 других файлов) |
| statGenerationMode | №1662 (+ 1 других файлов) |
| statRollsUsed | №1662 (+ 1 других файлов) |
| stats | №1662 (+ 1 других файлов) |
| status | №0904 (+ 7 других файлов) |
| stealth | №1662 (+ 1 других файлов) |
| stealthDisadvantage | №1662 (+ 1 других файлов) |
| steps | №0750 (+ 3 других файлов) |
| sTexture | №0750 (+ 15 других файлов) |
| stoneEndurance | №1662 (+ 1 других файлов) |
| str | №1662 (+ 1 других файлов) |
| strength | №1662 (+ 1 других файлов) |
| subclass | №1662 (+ 1 других файлов) |
| sunlightSensitivity | №1662 (+ 1 других файлов) |
| survival | №1662 (+ 1 других файлов) |
| swim | №1662 (+ 1 других файлов) |
| tags | №0750 (+ 13 других файлов) |
| target | №1063 (+ 1 других файлов) |
| targets | №0085 (+ 4 других файлов) |
| telepathy | №1662 (+ 1 других файлов) |
| templatePinStates | №1761 |
| TEXCOORD_0 | №0910 |
| text | №1723 |
| textures | №1404 |
| tiles | №0750 (+ 18 других файлов) |
| time | №1723 |
| title | №1659 (+ 1 других файлов) |
| toHit | №1662 (+ 1 других файлов) |
| tokenArt | №1662 |
| tokenReady | №1662 |
| tokens | №0750 (+ 17 других файлов) |
| toolProficiencies | №1662 |
| topology | №0910 |
| torso-muscle-pectoral-decr | №0085 (+ 1 других файлов) |
| torso-muscle-pectoral-incr | №0085 (+ 1 других файлов) |
| totals | №1723 |
| totalWeightKg | №1723 |
| triangles | №0910 |
| trunk | №1662 (+ 1 других файлов) |
| type | №0750 (+ 21 других файлов) |
| typeKey | №1662 (+ 1 других файлов) |
| unchanged | №0917 (+ 1 других файлов) |
| undeadResilience | №1662 (+ 1 других файлов) |
| uniqueOriginalFiles | №1015 |
| uniquePositions | №0910 |
| unity-branch | №1013 |
| unityGuidEdges | №1013 |
| unityInclusion | №1013 |
| unknown | №1723 |
| untouched | №1723 |
| updateManifest | №1068 |
| url | №1006 (+ 7 других файлов) |
| userAdded | №1761 |
| uvOutsideUnitSquare | №0910 |
| uvRange | №0910 |
| value | №1723 |
| verbal | №1662 |
| version | №0001 (+ 34 других файлов) |
| versionCode | №0904 (+ 5 других файлов) |
| vertexCount | №0085 (+ 1 других файлов) |
| vertices | №0910 (+ 3 других файлов) |
| view | №0750 (+ 17 других файлов) |
| vscode | №0001 |
| w | №0750 (+ 17 других файлов) |
| waist | №0910 (+ 2 других файлов) |
| walkable | №0750 (+ 3 других файлов) |
| walls | №0750 (+ 18 других файлов) |
| weapons | №1662 (+ 1 других файлов) |
| weaponsData | №1662 (+ 1 других файлов) |
| weaponTraining | №1662 (+ 1 других файлов) |
| weight | №0085 (+ 5 других файлов) |
| weightCases | №1723 |
| weightHero | №1723 |
| WEIGHTS_0 | №0910 |
| weightSumMaxError | №0910 |
| weightTotal | №1723 |
| weldedBoundaryEdges | №0910 |
| weldedNonManifoldEdges | №0910 |
| weldTolerance | №0910 |
| width | №0750 (+ 17 других файлов) |
| win | №1063 |
| windows | №1068 (+ 1 других файлов) |
| wis | №1662 (+ 1 других файлов) |
| wisdom | №1662 (+ 1 других файлов) |
| workflows | №0904 (+ 1 других файлов) |
| wTexture | №0750 (+ 15 других файлов) |
| x | №0750 (+ 17 других файлов) |
| y | №0750 (+ 17 других файлов) |
| z | №0750 (+ 17 других файлов) |
| zeroWeightVertices | №0910 |
| zip | №0921 |
| zip_crc_and_all_entry_sha256 | №0906 |
| zip_sha256 | №0906 |
| zipSha256 | №0904 (+ 1 других файлов) |
| zones | №0750 (+ 17 других файлов) |

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

