# DnD-VTT — полный атлас проекта

Снимок кода e400a8543b91. Git содержит 2035 файлов.
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
| №0008 .github/workflows/android-debug.yml | 4175 B | автоматизация GitHub Actions: android debug |
| №0009 .github/workflows/android-release.yml | 8160 B | автоматизация GitHub Actions: android release |
| №0010 .github/workflows/autonomous-development.yml | 4534 B | автоматизация GitHub Actions: autonomous development |
| №0011 .github/workflows/build-windows-desktop.yml | 1449 B | автоматизация GitHub Actions: build windows desktop |
| №0012 .github/workflows/cloud-test-build.yml | 3468 B | автоматизация GitHub Actions: cloud test build |
| №0013 .github/workflows/convert-remaining-furniture.yml | 1964 B | автоматизация GitHub Actions: convert remaining furniture |
| №0014 .github/workflows/deploy-pages.yml | 3633 B | автоматизация GitHub Actions: deploy pages |
| №0015 .github/workflows/human-glb-audit.yml | 931 B | автоматизация GitHub Actions: human glb audit |
| №0016 .github/workflows/import-root-furniture.yml | 3572 B | автоматизация GitHub Actions: import root furniture |
| №0017 .github/workflows/map-ui-stage-qa.yml | 776 B | автоматизация GitHub Actions: map ui stage qa |
| №0018 .github/workflows/project-atlas.yml | 953 B | автоматическое обновление атласа на GitHub |
| №0019 .github/workflows/publish-stress-map-ota.yml | 455 B | автоматизация GitHub Actions: publish stress map ota |
| №0020 .github/workflows/refresh-update-manifest.yml | 540 B | автоматизация GitHub Actions: refresh update manifest |
| №0021 .github/workflows/test-gltf-loader.yml | 717 B | автоматизация GitHub Actions: test gltf loader |
| №0022 .github/workflows/test-stair-navigation.yml | 752 B | автоматизация GitHub Actions: test stair navigation |
| №0023 .github/workflows/unified-release.yml | 14076 B | автоматизация GitHub Actions: unified release |
| №0024 .github/workflows/unity-android-update-publish.yml | 5039 B | автоматизация GitHub Actions: unity android update publish |
| №0025 .github/workflows/unity-brand-visual-contract.yml | 877 B | автоматизация GitHub Actions: unity brand visual contract |
| №0026 .github/workflows/unity-cloud-candidate.yml | 17112 B | автоматизация GitHub Actions: unity cloud candidate |
| №0027 .github/workflows/unity-cloud-promote.yml | 5696 B | автоматизация GitHub Actions: unity cloud promote |
| №0028 .github/workflows/unity-delivery-publish.yml | 872 B | автоматизация GitHub Actions: unity delivery publish |
| №0029 .github/workflows/unity-experiment-android.yml | 2708 B | автоматизация GitHub Actions: unity experiment android |
| №0030 .github/workflows/unity-retained-apk-audit.yml | 1749 B | автоматизация GitHub Actions: unity retained apk audit |
| №0031 .github/workflows/unpack-project.yml | 2987 B | автоматизация GitHub Actions: unpack project |
| №0032 .github/workflows/validate-imported-glb.yml | 2317 B | автоматизация GitHub Actions: validate imported glb |
| №0033 .gitignore | 81 B | вспомогательный файл: .gitignore |
| №0034 00_AI_PROJECT_GUIDE.md | 1108812 B | существующее руководство ИИ, не перезаписывать |
| №0035 01_plansforproject.md | 64636 B | план целей и критериев выполнения |
| №0036 1790622696215.png | 1202179 B | текстура/изображение: 1790622696215 |
| №0037 1790622844831.png | 104000 B | текстура/изображение: 1790622844831 |
| №0038 1790718758545.png | 1889164 B | текстура/изображение: 1790718758545 |
| №0039 1790788500741.png | 1468216 B | текстура/изображение: 1790788500741 |
| №0040 3D_CHARACTER_CLOTHING_PROGRESS.md | 84856 B | документация или отчёт: 3D CHARACTER CLOTHING PROGRESS |
| №0041 3D_CHARACTER_RACES_PROGRESS.md | 75599 B | документация или отчёт: 3D CHARACTER RACES PROGRESS |
| №0042 AGENTS.md | 7025 B | документация или отчёт: AGENTS |
| №0043 AI_BLOCKERS.md | 72030 B | документация или отчёт: AI BLOCKERS |
| №0044 AI_NEXT_TASK.md | 98482 B | документация или отчёт: AI NEXT TASK |
| №0045 AI_PROGRESS.md | 137028 B | документация или отчёт: AI PROGRESS |
| №0046 android/.gitignore | 44 B | Android компонент: .gitignore |
| №0047 android/app/build.gradle | 4122 B | Android компонент: build |
| №0048 android/app/src/main/AndroidManifest.xml | 12250 B | Android компонент: AndroidManifest |
| №0049 android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java | 34871 B | Android: bridge обновлений |
| №0050 android/app/src/main/java/com/dndvtt/app/MainActivity.java | 7574 B | Android: запуск WebView |
| №0051 android/app/src/main/res/values-v31/styles.xml | 527 B | Android компонент: styles |
| №0052 android/app/src/main/res/values/styles.xml | 407 B | Android компонент: styles |
| №0053 android/build.gradle | 73 B | Android компонент: build |
| №0054 android/gradle.properties | 106 B | Android компонент: gradle |
| №0055 android/README.md | 685 B | документация или отчёт: README |
| №0056 android/settings.gradle | 333 B | Android компонент: settings |
| №0057 app/3dmap/assets/clothing/fantasy-materials.webp | 434234 B | компонент 3D карты/редактора: fantasy materials |
| №0058 app/3dmap/assets/clothing/lingerie-nylon.webp | 289830 B | компонент 3D карты/редактора: lingerie nylon |
| №0059 app/3dmap/character_anatomy_geometry.js | 22797 B | компонент 3D карты/редактора: character anatomy geometry |
| №0060 app/3dmap/character_anatomy.js | 8424 B | компонент 3D карты/редактора: character anatomy |
| №0061 app/3dmap/character_appearance_store.js | 2619 B | компонент 3D карты/редактора: character appearance store |
| №0062 app/3dmap/character_body_geometry.js | 120619 B | компонент 3D карты/редактора: character body geometry |
| №0063 app/3dmap/character_clothing.js | 51618 B | компонент 3D карты/редактора: character clothing |
| №0064 app/3dmap/character_editor_3d.js | 166537 B | компонент 3D карты/редактора: character editor 3d |
| №0065 app/3dmap/character_morph_assets.js | 3322 B | компонент 3D карты/редактора: character morph assets |
| №0066 app/3dmap/character_pose.js | 4749 B | компонент 3D карты/редактора: character pose |
| №0067 app/3dmap/character_system.js | 49923 B | компонент 3D карты/редактора: character system |
| №0068 app/3dmap/gltf_catalog.js | 90502 B | компонент 3D карты/редактора: gltf catalog |
| №0069 app/3dmap/gltf_character_pipeline.js | 7811 B | компонент 3D карты/редактора: gltf character pipeline |
| №0070 app/3dmap/gltf_loader.js | 10027 B | компонент 3D карты/редактора: gltf loader |
| №0071 app/3dmap/map_editor.js | 45829 B | компонент 3D карты/редактора: map editor |
| №0072 app/3dmap/map_model.js | 7783 B | компонент 3D карты/редактора: map model |
| №0073 app/3dmap/map_renderer_2d.js | 7331 B | компонент 3D карты/редактора: map renderer 2d |
| №0074 app/3dmap/map_renderer_3d.js | 23969 B | компонент 3D карты/редактора: map renderer 3d |
| №0075 app/3dmap/map_world.js | 9119 B | компонент 3D карты/редактора: map world |
| №0076 app/3dmap/stair_navigation.js | 932 B | компонент 3D карты/редактора: stair navigation |
| №0077 app/3dmap/stress_map.js | 3272 B | компонент 3D карты/редактора: stress map |
| №0078 app/accursed_oap_v11_runtime.js | 31365 B | логический модуль: accursed oap v11 runtime |
| №0079 app/alchemist_mhp_2024_runtime.js | 140155 B | логический модуль: alchemist mhp 2024 runtime |
| №0080 app/alchemy_engine_v29.js | 40901 B | логический модуль: alchemy engine v29 |
| №0081 app/alchemy_gameplay_v30.js | 17859 B | логический модуль: alchemy gameplay v30 |
| №0082 app/alchemy_gathering_professions_v52.js | 11833 B | логический модуль: alchemy gathering professions v52 |
| №0083 app/Ambiences.js | 14648 B | логический модуль: Ambiences |
| №0084 app/app.js | 37183 B | главный контроллер; currentChar и все персонажи |
| №0085 app/armors.js | 27349 B | логический модуль: armors |
| №0086 app/assets/3d/makehuman/editor-morphs.bin | 2340320 B | ассет графики/3D/интерфейса: editor morphs |
| №0087 app/assets/3d/makehuman/editor-morphs.json | 11573 B | ассет графики/3D/интерфейса: editor morphs |
| №0088 app/assets/3d/makehuman/human-body-morphs.glb | 12671780 B | ассет графики/3D/интерфейса: human body morphs |
| №0089 app/assets/3d/makehuman/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №0090 app/assets/3d/makehuman/materials/skin_color_detail_v1.png | 2922380 B | ассет графики/3D/интерфейса: skin color detail v1 |
| №0091 app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png | 22965 B | ассет графики/3D/интерфейса: skin micro normal roughness |
| №0092 app/assets/3d/makehuman/README.md | 1510 B | документация или отчёт: README |
| №0093 app/assets/3d/makehuman/skins/young_caucasian_female/young_caucasian_female.mhmat | 1464 B | ассет графики/3D/интерфейса: young caucasian female |
| №0094 app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png | 4391156 B | ассет графики/3D/интерфейса: young lightskinned female diffuse |
| №0095 app/assets/3d/makehuman/skins/young_caucasian_male/young_caucasian_male.mhmat | 1462 B | ассет графики/3D/интерфейса: young caucasian male |
| №0096 app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png | 3693828 B | ассет графики/3D/интерфейса: young lightskinned male diffuse |
| №0097 app/assets/3d/quaternius/models/Anvil_Log.bin | 130880 B | ассет графики/3D/интерфейса: Anvil Log |
| №0098 app/assets/3d/quaternius/models/Anvil_Log.gltf | 5580 B | ассет графики/3D/интерфейса: Anvil Log |
| №0099 app/assets/3d/quaternius/models/Anvil.bin | 24020 B | ассет графики/3D/интерфейса: Anvil |
| №0100 app/assets/3d/quaternius/models/Anvil.gltf | 3189 B | ассет графики/3D/интерфейса: Anvil |
| №0101 app/assets/3d/quaternius/models/Axe_Bronze.bin | 31156 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0102 app/assets/3d/quaternius/models/Axe_Bronze.gltf | 2591 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0103 app/assets/3d/quaternius/models/Bag.bin | 27188 B | ассет графики/3D/интерфейса: Bag |
| №0104 app/assets/3d/quaternius/models/Bag.gltf | 4318 B | ассет графики/3D/интерфейса: Bag |
| №0105 app/assets/3d/quaternius/models/Banner_1_Cloth.bin | 6636 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0106 app/assets/3d/quaternius/models/Banner_1_Cloth.gltf | 4670 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0107 app/assets/3d/quaternius/models/Banner_1.bin | 20976 B | ассет графики/3D/интерфейса: Banner 1 |
| №0108 app/assets/3d/quaternius/models/Banner_1.gltf | 6789 B | ассет графики/3D/интерфейса: Banner 1 |
| №0109 app/assets/3d/quaternius/models/Banner_2_Cloth.bin | 4940 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0110 app/assets/3d/quaternius/models/Banner_2_Cloth.gltf | 4671 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0111 app/assets/3d/quaternius/models/Banner_2.bin | 19280 B | ассет графики/3D/интерфейса: Banner 2 |
| №0112 app/assets/3d/quaternius/models/Banner_2.gltf | 6788 B | ассет графики/3D/интерфейса: Banner 2 |
| №0113 app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0114 app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6241 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0115 app/assets/3d/quaternius/models/Barrel_Holder.bin | 161816 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0116 app/assets/3d/quaternius/models/Barrel_Holder.gltf | 4347 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0117 app/assets/3d/quaternius/models/Barrel.bin | 57144 B | ассет графики/3D/интерфейса: Barrel |
| №0118 app/assets/3d/quaternius/models/Barrel.gltf | 4311 B | ассет графики/3D/интерфейса: Barrel |
| №0119 app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0120 app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0121 app/assets/3d/quaternius/models/Bed_Twin2.bin | 76624 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0122 app/assets/3d/quaternius/models/Bed_Twin2.gltf | 6217 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0123 app/assets/3d/quaternius/models/Bench.bin | 19304 B | ассет графики/3D/интерфейса: Bench |
| №0124 app/assets/3d/quaternius/models/Bench.gltf | 4298 B | ассет графики/3D/интерфейса: Bench |
| №0125 app/assets/3d/quaternius/models/Book_5.bin | 5856 B | ассет графики/3D/интерфейса: Book 5 |
| №0126 app/assets/3d/quaternius/models/Book_5.gltf | 2403 B | ассет графики/3D/интерфейса: Book 5 |
| №0127 app/assets/3d/quaternius/models/Book_7.bin | 32664 B | ассет графики/3D/интерфейса: Book 7 |
| №0128 app/assets/3d/quaternius/models/Book_7.gltf | 4290 B | ассет графики/3D/интерфейса: Book 7 |
| №0129 app/assets/3d/quaternius/models/Book_Simplified_Single.bin | 3192 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0130 app/assets/3d/quaternius/models/Book_Simplified_Single.gltf | 2428 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0131 app/assets/3d/quaternius/models/Book_Stack_1.bin | 12768 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0132 app/assets/3d/quaternius/models/Book_Stack_1.gltf | 2418 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0133 app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0134 app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4309 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0135 app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0136 app/assets/3d/quaternius/models/Bookcase_2.gltf | 4329 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0137 app/assets/3d/quaternius/models/BookGroup_Medium_1.bin | 25536 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0138 app/assets/3d/quaternius/models/BookGroup_Medium_1.gltf | 2429 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0139 app/assets/3d/quaternius/models/BookGroup_Medium_2.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0140 app/assets/3d/quaternius/models/BookGroup_Medium_2.gltf | 2431 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0141 app/assets/3d/quaternius/models/BookGroup_Medium_3.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0142 app/assets/3d/quaternius/models/BookGroup_Medium_3.gltf | 2432 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0143 app/assets/3d/quaternius/models/BookGroup_Small_1.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0144 app/assets/3d/quaternius/models/BookGroup_Small_1.gltf | 2423 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0145 app/assets/3d/quaternius/models/BookGroup_Small_2.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0146 app/assets/3d/quaternius/models/BookGroup_Small_2.gltf | 2426 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0147 app/assets/3d/quaternius/models/BookGroup_Small_3.bin | 7980 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0148 app/assets/3d/quaternius/models/BookGroup_Small_3.gltf | 2424 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0149 app/assets/3d/quaternius/models/BookStand.bin | 62020 B | ассет графики/3D/интерфейса: BookStand |
| №0150 app/assets/3d/quaternius/models/BookStand.gltf | 2223 B | ассет графики/3D/интерфейса: BookStand |
| №0151 app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0152 app/assets/3d/quaternius/models/Bottle_1.gltf | 2413 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0153 app/assets/3d/quaternius/models/Bucket_Metal.bin | 18824 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0154 app/assets/3d/quaternius/models/Bucket_Metal.gltf | 2206 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0155 app/assets/3d/quaternius/models/Bucket_Wooden_1.bin | 32544 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0156 app/assets/3d/quaternius/models/Bucket_Wooden_1.gltf | 3911 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0157 app/assets/3d/quaternius/models/Cabinet.bin | 114768 B | ассет графики/3D/интерфейса: Cabinet |
| №0158 app/assets/3d/quaternius/models/Cabinet.gltf | 4324 B | ассет графики/3D/интерфейса: Cabinet |
| №0159 app/assets/3d/quaternius/models/Cage_Small.bin | 171848 B | ассет графики/3D/интерфейса: Cage Small |
| №0160 app/assets/3d/quaternius/models/Cage_Small.gltf | 2207 B | ассет графики/3D/интерфейса: Cage Small |
| №0161 app/assets/3d/quaternius/models/Candle_1.bin | 6200 B | ассет графики/3D/интерфейса: Candle 1 |
| №0162 app/assets/3d/quaternius/models/Candle_1.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 1 |
| №0163 app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | ассет графики/3D/интерфейса: Candle 2 |
| №0164 app/assets/3d/quaternius/models/Candle_2.gltf | 2191 B | ассет графики/3D/интерфейса: Candle 2 |
| №0165 app/assets/3d/quaternius/models/CandleStick_Stand.bin | 226228 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0166 app/assets/3d/quaternius/models/CandleStick_Stand.gltf | 4347 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0167 app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0168 app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 3900 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0169 app/assets/3d/quaternius/models/CandleStick.bin | 21436 B | ассет графики/3D/интерфейса: CandleStick |
| №0170 app/assets/3d/quaternius/models/CandleStick.gltf | 2199 B | ассет графики/3D/интерфейса: CandleStick |
| №0171 app/assets/3d/quaternius/models/Carrot.bin | 22244 B | ассет графики/3D/интерфейса: Carrot |
| №0172 app/assets/3d/quaternius/models/Carrot.gltf | 2411 B | ассет графики/3D/интерфейса: Carrot |
| №0173 app/assets/3d/quaternius/models/Cauldron.bin | 62712 B | ассет графики/3D/интерфейса: Cauldron |
| №0174 app/assets/3d/quaternius/models/Cauldron.gltf | 2195 B | ассет графики/3D/интерфейса: Cauldron |
| №0175 app/assets/3d/quaternius/models/Chain_Coil.bin | 193664 B | ассет графики/3D/интерфейса: Chain Coil |
| №0176 app/assets/3d/quaternius/models/Chain_Coil.gltf | 2424 B | ассет графики/3D/интерфейса: Chain Coil |
| №0177 app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | ассет графики/3D/интерфейса: Chair 1 |
| №0178 app/assets/3d/quaternius/models/Chair_1.gltf | 4312 B | ассет графики/3D/интерфейса: Chair 1 |
| №0179 app/assets/3d/quaternius/models/Chalice.bin | 15644 B | ассет графики/3D/интерфейса: Chalice |
| №0180 app/assets/3d/quaternius/models/Chalice.gltf | 2197 B | ассет графики/3D/интерфейса: Chalice |
| №0181 app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | ассет графики/3D/интерфейса: Chandelier |
| №0182 app/assets/3d/quaternius/models/Chandelier.gltf | 6259 B | ассет графики/3D/интерфейса: Chandelier |
| №0183 app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | ассет графики/3D/интерфейса: Chest Wood |
| №0184 app/assets/3d/quaternius/models/Chest_Wood.gltf | 21402 B | ассет графики/3D/интерфейса: Chest Wood |
| №0185 app/assets/3d/quaternius/models/Coin_Pile_2.bin | 52612 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0186 app/assets/3d/quaternius/models/Coin_Pile_2.gltf | 2429 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0187 app/assets/3d/quaternius/models/Coin_Pile.bin | 47520 B | ассет графики/3D/интерфейса: Coin Pile |
| №0188 app/assets/3d/quaternius/models/Coin_Pile.gltf | 2424 B | ассет графики/3D/интерфейса: Coin Pile |
| №0189 app/assets/3d/quaternius/models/Coin.bin | 14464 B | ассет графики/3D/интерфейса: Coin |
| №0190 app/assets/3d/quaternius/models/Coin.gltf | 2408 B | ассет графики/3D/интерфейса: Coin |
| №0191 app/assets/3d/quaternius/models/Crate_Metal.bin | 126828 B | ассет графики/3D/интерфейса: Crate Metal |
| №0192 app/assets/3d/quaternius/models/Crate_Metal.gltf | 4335 B | ассет графики/3D/интерфейса: Crate Metal |
| №0193 app/assets/3d/quaternius/models/Crate_Wooden.bin | 66496 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0194 app/assets/3d/quaternius/models/Crate_Wooden.gltf | 4412 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0195 app/assets/3d/quaternius/models/Dummy.bin | 80988 B | ассет графики/3D/интерфейса: Dummy |
| №0196 app/assets/3d/quaternius/models/Dummy.gltf | 5570 B | ассет графики/3D/интерфейса: Dummy |
| №0197 app/assets/3d/quaternius/models/FarmCrate_Apple.bin | 134488 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0198 app/assets/3d/quaternius/models/FarmCrate_Apple.gltf | 6263 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0199 app/assets/3d/quaternius/models/FarmCrate_Carrot.bin | 204292 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0200 app/assets/3d/quaternius/models/FarmCrate_Carrot.gltf | 6273 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0201 app/assets/3d/quaternius/models/FarmCrate_Empty.bin | 54704 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0202 app/assets/3d/quaternius/models/FarmCrate_Empty.gltf | 3915 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0203 app/assets/3d/quaternius/models/Key_Gold.bin | 58636 B | ассет графики/3D/интерфейса: Key Gold |
| №0204 app/assets/3d/quaternius/models/Key_Gold.gltf | 2424 B | ассет графики/3D/интерфейса: Key Gold |
| №0205 app/assets/3d/quaternius/models/Key_Metal.bin | 19340 B | ассет графики/3D/интерфейса: Key Metal |
| №0206 app/assets/3d/quaternius/models/Key_Metal.gltf | 2197 B | ассет графики/3D/интерфейса: Key Metal |
| №0207 app/assets/3d/quaternius/models/Lantern_Wall.bin | 120036 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0208 app/assets/3d/quaternius/models/Lantern_Wall.gltf | 2203 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0209 app/assets/3d/quaternius/models/Mug.bin | 12488 B | ассет графики/3D/интерфейса: Mug |
| №0210 app/assets/3d/quaternius/models/Mug.gltf | 3881 B | ассет графики/3D/интерфейса: Mug |
| №0211 app/assets/3d/quaternius/models/Nightstand_Shelf.bin | 21412 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0212 app/assets/3d/quaternius/models/Nightstand_Shelf.gltf | 2447 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0213 app/assets/3d/quaternius/models/Peg_Rack.bin | 26672 B | ассет графики/3D/интерфейса: Peg Rack |
| №0214 app/assets/3d/quaternius/models/Peg_Rack.gltf | 3879 B | ассет графики/3D/интерфейса: Peg Rack |
| №0215 app/assets/3d/quaternius/models/Pickaxe_Bronze.bin | 30736 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0216 app/assets/3d/quaternius/models/Pickaxe_Bronze.gltf | 2425 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0217 app/assets/3d/quaternius/models/Pot_1_Lid.bin | 46120 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0218 app/assets/3d/quaternius/models/Pot_1_Lid.gltf | 2196 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0219 app/assets/3d/quaternius/models/Pot_1.bin | 37160 B | ассет графики/3D/интерфейса: Pot 1 |
| №0220 app/assets/3d/quaternius/models/Pot_1.gltf | 2185 B | ассет графики/3D/интерфейса: Pot 1 |
| №0221 app/assets/3d/quaternius/models/Potion_1.bin | 18200 B | ассет графики/3D/интерфейса: Potion 1 |
| №0222 app/assets/3d/quaternius/models/Potion_1.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 1 |
| №0223 app/assets/3d/quaternius/models/Potion_2.bin | 19672 B | ассет графики/3D/интерфейса: Potion 2 |
| №0224 app/assets/3d/quaternius/models/Potion_2.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 2 |
| №0225 app/assets/3d/quaternius/models/Potion_4.bin | 22536 B | ассет графики/3D/интерфейса: Potion 4 |
| №0226 app/assets/3d/quaternius/models/Potion_4.gltf | 2418 B | ассет графики/3D/интерфейса: Potion 4 |
| №0227 app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | ассет графики/3D/интерфейса: Pouch Large |
| №0228 app/assets/3d/quaternius/models/Pouch_Large.gltf | 4306 B | ассет графики/3D/интерфейса: Pouch Large |
| №0229 app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | ассет графики/3D/интерфейса: Rope 1 |
| №0230 app/assets/3d/quaternius/models/Rope_1.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 1 |
| №0231 app/assets/3d/quaternius/models/Rope_2.bin | 34904 B | ассет графики/3D/интерфейса: Rope 2 |
| №0232 app/assets/3d/quaternius/models/Rope_2.gltf | 2223 B | ассет графики/3D/интерфейса: Rope 2 |
| №0233 app/assets/3d/quaternius/models/Rope_3.bin | 41624 B | ассет графики/3D/интерфейса: Rope 3 |
| №0234 app/assets/3d/quaternius/models/Rope_3.gltf | 2225 B | ассет графики/3D/интерфейса: Rope 3 |
| №0235 app/assets/3d/quaternius/models/Scroll_1.bin | 20112 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0236 app/assets/3d/quaternius/models/Scroll_1.gltf | 3954 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0237 app/assets/3d/quaternius/models/Scroll_2.bin | 28392 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0238 app/assets/3d/quaternius/models/Scroll_2.gltf | 3968 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0239 app/assets/3d/quaternius/models/Shelf_Arch.bin | 64836 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0240 app/assets/3d/quaternius/models/Shelf_Arch.gltf | 4332 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0241 app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0242 app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2224 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0243 app/assets/3d/quaternius/models/Shelf_Small_Bottles.bin | 229484 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0244 app/assets/3d/quaternius/models/Shelf_Small_Bottles.gltf | 6266 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0245 app/assets/3d/quaternius/models/Shield_Wooden.bin | 64184 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0246 app/assets/3d/quaternius/models/Shield_Wooden.gltf | 6243 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0247 app/assets/3d/quaternius/models/SmallBottle.bin | 5700 B | ассет графики/3D/интерфейса: SmallBottle |
| №0248 app/assets/3d/quaternius/models/SmallBottle.gltf | 2392 B | ассет графики/3D/интерфейса: SmallBottle |
| №0249 app/assets/3d/quaternius/models/SmallBottles_1.bin | 20556 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0250 app/assets/3d/quaternius/models/SmallBottles_1.gltf | 2423 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0251 app/assets/3d/quaternius/models/Stall_Cart_Empty.bin | 237264 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0252 app/assets/3d/quaternius/models/Stall_Cart_Empty.gltf | 6857 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0253 app/assets/3d/quaternius/models/Stall_Empty.bin | 88176 B | ассет графики/3D/интерфейса: Stall Empty |
| №0254 app/assets/3d/quaternius/models/Stall_Empty.gltf | 6804 B | ассет графики/3D/интерфейса: Stall Empty |
| №0255 app/assets/3d/quaternius/models/Stool.bin | 11472 B | ассет графики/3D/интерфейса: Stool |
| №0256 app/assets/3d/quaternius/models/Stool.gltf | 2423 B | ассет графики/3D/интерфейса: Stool |
| №0257 app/assets/3d/quaternius/models/Sword_Bronze.bin | 69920 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0258 app/assets/3d/quaternius/models/Sword_Bronze.gltf | 2436 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0259 app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | ассет графики/3D/интерфейса: Table Fork |
| №0260 app/assets/3d/quaternius/models/Table_Fork.gltf | 2189 B | ассет графики/3D/интерфейса: Table Fork |
| №0261 app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | ассет графики/3D/интерфейса: Table Knife |
| №0262 app/assets/3d/quaternius/models/Table_Knife.gltf | 2186 B | ассет графики/3D/интерфейса: Table Knife |
| №0263 app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | ассет графики/3D/интерфейса: Table Large |
| №0264 app/assets/3d/quaternius/models/Table_Large.gltf | 4316 B | ассет графики/3D/интерфейса: Table Large |
| №0265 app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | ассет графики/3D/интерфейса: Table Plate |
| №0266 app/assets/3d/quaternius/models/Table_Plate.gltf | 2199 B | ассет графики/3D/интерфейса: Table Plate |
| №0267 app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | ассет графики/3D/интерфейса: Table Spoon |
| №0268 app/assets/3d/quaternius/models/Table_Spoon.gltf | 2191 B | ассет графики/3D/интерфейса: Table Spoon |
| №0269 app/assets/3d/quaternius/models/Torch_Metal.bin | 39100 B | ассет графики/3D/интерфейса: Torch Metal |
| №0270 app/assets/3d/quaternius/models/Torch_Metal.gltf | 2203 B | ассет графики/3D/интерфейса: Torch Metal |
| №0271 app/assets/3d/quaternius/models/Vase_2.bin | 21188 B | ассет графики/3D/интерфейса: Vase 2 |
| №0272 app/assets/3d/quaternius/models/Vase_2.gltf | 2407 B | ассет графики/3D/интерфейса: Vase 2 |
| №0273 app/assets/3d/quaternius/models/Vase_4.bin | 22028 B | ассет графики/3D/интерфейса: Vase 4 |
| №0274 app/assets/3d/quaternius/models/Vase_4.gltf | 2412 B | ассет графики/3D/интерфейса: Vase 4 |
| №0275 app/assets/3d/quaternius/models/Vase_Rubble_Medium.bin | 85960 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0276 app/assets/3d/quaternius/models/Vase_Rubble_Medium.gltf | 2453 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0277 app/assets/3d/quaternius/models/WeaponStand.bin | 76312 B | ассет графики/3D/интерфейса: WeaponStand |
| №0278 app/assets/3d/quaternius/models/WeaponStand.gltf | 3903 B | ассет графики/3D/интерфейса: WeaponStand |
| №0279 app/assets/3d/quaternius/models/Whetstone.bin | 59280 B | ассет графики/3D/интерфейса: Whetstone |
| №0280 app/assets/3d/quaternius/models/Whetstone.gltf | 6212 B | ассет графики/3D/интерфейса: Whetstone |
| №0281 app/assets/3d/quaternius/models/Workbench_Drawers.bin | 16824 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0282 app/assets/3d/quaternius/models/Workbench_Drawers.gltf | 4313 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0283 app/assets/3d/quaternius/models/Workbench.bin | 63408 B | ассет графики/3D/интерфейса: Workbench |
| №0284 app/assets/3d/quaternius/models/Workbench.gltf | 4318 B | ассет графики/3D/интерфейса: Workbench |
| №0285 app/assets/3d/quaternius/textures/T_Page_Noise.png | 7486734 B | ассет графики/3D/интерфейса: T Page Noise |
| №0286 app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png | 1936754 B | ассет графики/3D/интерфейса: T Trim Cloth BaseColor |
| №0287 app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png | 3920858 B | ассет графики/3D/интерфейса: T Trim Cloth Normal |
| №0288 app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png | 623426 B | ассет графики/3D/интерфейса: T Trim Cloth ORM |
| №0289 app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png | 2232961 B | ассет графики/3D/интерфейса: T Trim Furniture BaseColor |
| №0290 app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png | 3485710 B | ассет графики/3D/интерфейса: T Trim Furniture Normal |
| №0291 app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png | 2064585 B | ассет графики/3D/интерфейса: T Trim Furniture ORM |
| №0292 app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png | 1361221 B | ассет графики/3D/интерфейса: T Trim Metal BaseColor |
| №0293 app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png | 3625541 B | ассет графики/3D/интерфейса: T Trim Metal Normal |
| №0294 app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png | 1871475 B | ассет графики/3D/интерфейса: T Trim Metal ORM |
| №0295 app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png | 2263132 B | ассет графики/3D/интерфейса: T Trim Props BaseColor |
| №0296 app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png | 4441458 B | ассет графики/3D/интерфейса: T Trim Props Normal |
| №0297 app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png | 3017151 B | ассет графики/3D/интерфейса: T Trim Props ORM |
| №0298 app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp | 510226 B | ассет графики/3D/интерфейса: bird contour feathers v1 |
| №0299 app/assets/3d/race_surfaces/flight-feather-vane-v1.webp | 555662 B | ассет графики/3D/интерфейса: flight feather vane v1 |
| №0300 app/assets/3d/race_surfaces/mammal-underfur-v1.webp | 544064 B | ассет графики/3D/интерфейса: mammal underfur v1 |
| №0301 app/assets/3d/race_surfaces/reptile-scales-v1.webp | 730360 B | ассет графики/3D/интерфейса: reptile scales v1 |
| №0302 app/assets/3d/user_furniture/altar_table.glb | 36228 B | ассет графики/3D/интерфейса: altar table |
| №0303 app/assets/3d/user_furniture/apothecary_jar_shelf.glb | 106668 B | ассет графики/3D/интерфейса: apothecary jar shelf |
| №0304 app/assets/3d/user_furniture/apothecary_shelf.glb | 107148 B | ассет графики/3D/интерфейса: apothecary shelf |
| №0305 app/assets/3d/user_furniture/armour_stand.glb | 16340 B | ассет графики/3D/интерфейса: armour stand |
| №0306 app/assets/3d/user_furniture/banner_pole.glb | 17136 B | ассет графики/3D/интерфейса: banner pole |
| №0307 app/assets/3d/user_furniture/bed.glb | 5718760 B | ассет графики/3D/интерфейса: bed |
| №0308 app/assets/3d/user_furniture/book_chest.glb | 45816 B | ассет графики/3D/интерфейса: book chest |
| №0309 app/assets/3d/user_furniture/book_press.glb | 59492 B | ассет графики/3D/интерфейса: book press |
| №0310 app/assets/3d/user_furniture/bookshelf.glb | 7818348 B | ассет графики/3D/интерфейса: bookshelf |
| №0311 app/assets/3d/user_furniture/bread_oven.glb | 45200 B | ассет графики/3D/интерфейса: bread oven |
| №0312 app/assets/3d/user_furniture/brewhouse_tun.glb | 68616 B | ассет графики/3D/интерфейса: brewhouse tun |
| №0313 app/assets/3d/user_furniture/candle_stand.glb | 21372 B | ассет графики/3D/интерфейса: candle stand |
| №0314 app/assets/3d/user_furniture/chained_library_desk.glb | 190612 B | ассет графики/3D/интерфейса: chained library desk |
| №0315 app/assets/3d/user_furniture/chair.glb | 4643004 B | ассет графики/3D/интерфейса: chair |
| №0316 app/assets/3d/user_furniture/closet.glb | 6550260 B | ассет графики/3D/интерфейса: closet |
| №0317 app/assets/3d/user_furniture/commode.glb | 4845868 B | ассет графики/3D/интерфейса: commode |
| №0318 app/assets/3d/user_furniture/cooking_cauldron.glb | 34300 B | ассет графики/3D/интерфейса: cooking cauldron |
| №0319 app/assets/3d/user_furniture/crate_stack.glb | 39644 B | ассет графики/3D/интерфейса: crate stack |
| №0320 app/assets/3d/user_furniture/dormitory_cot.glb | 70976 B | ассет графики/3D/интерфейса: dormitory cot |
| №0321 app/assets/3d/user_furniture/finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: finished codex |
| №0322 app/assets/3d/user_furniture/gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: gold leaf cushion |
| №0323 app/assets/3d/user_furniture/hand_cart.glb | 75012 B | ассет графики/3D/интерфейса: hand cart |
| №0324 app/assets/3d/user_furniture/hanging_oil_lamp.glb | 50924 B | ассет графики/3D/интерфейса: hanging oil lamp |
| №0325 app/assets/3d/user_furniture/hitching_post.glb | 22232 B | ассет графики/3D/интерфейса: hitching post |
| №0326 app/assets/3d/user_furniture/human-base-rigged.glb | 4994640 B | ассет графики/3D/интерфейса: human base rigged |
| №0327 app/assets/3d/user_furniture/infirmary_cot.glb | 71696 B | ассет графики/3D/интерфейса: infirmary cot |
| №0328 app/assets/3d/user_furniture/kitchen_hearth.glb | 38460 B | ассет графики/3D/интерфейса: kitchen hearth |
| №0329 app/assets/3d/user_furniture/lamp_post.glb | 16960 B | ассет графики/3D/интерфейса: lamp post |
| №0330 app/assets/3d/user_furniture/loom.glb | 46728 B | ассет графики/3D/интерфейса: loom |
| №0331 app/assets/3d/user_furniture/manuscript_in_progress.glb | 153128 B | ассет графики/3D/интерфейса: manuscript in progress |
| №0332 app/assets/3d/user_furniture/monastery_altar_table.glb | 36248 B | ассет графики/3D/интерфейса: monastery altar table |
| №0333 app/assets/3d/user_furniture/monastery_apothecary_jar_shelf.glb | 106620 B | ассет графики/3D/интерфейса: monastery apothecary jar shelf |
| №0334 app/assets/3d/user_furniture/monastery_bell_tower_section.glb | 456868 B | ассет графики/3D/интерфейса: monastery bell tower section |
| №0335 app/assets/3d/user_furniture/monastery_book_chest.glb | 45320 B | ассет графики/3D/интерфейса: monastery book chest |
| №0336 app/assets/3d/user_furniture/monastery_book_press.glb | 59492 B | ассет графики/3D/интерфейса: monastery book press |
| №0337 app/assets/3d/user_furniture/monastery_bread_oven.glb | 45296 B | ассет графики/3D/интерфейса: monastery bread oven |
| №0338 app/assets/3d/user_furniture/monastery_brewhouse_tun.glb | 68216 B | ассет графики/3D/интерфейса: monastery brewhouse tun |
| №0339 app/assets/3d/user_furniture/monastery_candle_stand.glb | 21376 B | ассет графики/3D/интерфейса: monastery candle stand |
| №0340 app/assets/3d/user_furniture/monastery_censer.glb | 49336 B | ассет графики/3D/интерфейса: monastery censer |
| №0341 app/assets/3d/user_furniture/monastery_chained_library_desk.glb | 148408 B | ассет графики/3D/интерфейса: monastery chained library desk |
| №0342 app/assets/3d/user_furniture/monastery_chapel_screen.glb | 333728 B | ассет графики/3D/интерфейса: monastery chapel screen |
| №0343 app/assets/3d/user_furniture/monastery_chapter_house_bay.glb | 151904 B | ассет графики/3D/интерфейса: monastery chapter house bay |
| №0344 app/assets/3d/user_furniture/monastery_cloister_arcade_bay.glb | 130972 B | ассет графики/3D/интерфейса: monastery cloister arcade bay |
| №0345 app/assets/3d/user_furniture/monastery_cloister_arcade_corner.glb | 73924 B | ассет графики/3D/интерфейса: monastery cloister arcade corner |
| №0346 app/assets/3d/user_furniture/monastery_cloister_garth_lawn.glb | 13732 B | ассет графики/3D/интерфейса: monastery cloister garth lawn |
| №0347 app/assets/3d/user_furniture/monastery_cloister_lean_to_roof.glb | 18724 B | ассет графики/3D/интерфейса: monastery cloister lean to roof |
| №0348 app/assets/3d/user_furniture/monastery_cloister_vault_section.glb | 73928 B | ассет графики/3D/интерфейса: monastery cloister vault section |
| №0349 app/assets/3d/user_furniture/monastery_cloister_well.glb | 41568 B | ассет графики/3D/интерфейса: monastery cloister well |
| №0350 app/assets/3d/user_furniture/monastery_compost_bay.glb | 55596 B | ассет графики/3D/интерфейса: monastery compost bay |
| №0351 app/assets/3d/user_furniture/monastery_cooking_cauldron.glb | 33800 B | ассет графики/3D/интерфейса: monastery cooking cauldron |
| №0352 app/assets/3d/user_furniture/monastery_dormitory_cot.glb | 54832 B | ассет графики/3D/интерфейса: monastery dormitory cot |
| №0353 app/assets/3d/user_furniture/monastery_finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: monastery finished codex |
| №0354 app/assets/3d/user_furniture/monastery_flagstone_floor_slab.glb | 9900 B | ассет графики/3D/интерфейса: monastery flagstone floor slab |
| №0355 app/assets/3d/user_furniture/monastery_gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: monastery gold leaf cushion |
| №0356 app/assets/3d/user_furniture/monastery_hand_cart.glb | 86864 B | ассет графики/3D/интерфейса: monastery hand cart |
| №0357 app/assets/3d/user_furniture/monastery_hanging_oil_lamp.glb | 47156 B | ассет графики/3D/интерфейса: monastery hanging oil lamp |
| №0358 app/assets/3d/user_furniture/monastery_herb_garden_bed.glb | 94584 B | ассет графики/3D/интерфейса: monastery herb garden bed |
| №0359 app/assets/3d/user_furniture/monastery_hung_bell.glb | 40368 B | ассет графики/3D/интерфейса: monastery hung bell |
| №0360 app/assets/3d/user_furniture/monastery_infirmary_cot.glb | 71700 B | ассет графики/3D/интерфейса: monastery infirmary cot |
| №0361 app/assets/3d/user_furniture/monastery_kitchen_hearth.glb | 37972 B | ассет графики/3D/интерфейса: monastery kitchen hearth |
| №0362 app/assets/3d/user_furniture/monastery_manuscript_in_progress.glb | 153132 B | ассет графики/3D/интерфейса: monastery manuscript in progress |
| №0363 app/assets/3d/user_furniture/monastery_monastery_buttress.glb | 18440 B | ассет графики/3D/интерфейса: monastery monastery buttress |
| №0364 app/assets/3d/user_furniture/monastery_monastery_door_bay.glb | 87284 B | ассет графики/3D/интерфейса: monastery monastery door bay |
| №0365 app/assets/3d/user_furniture/monastery_monastery_lancet_window_bay.glb | 64048 B | ассет графики/3D/интерфейса: monastery monastery lancet window bay |
| №0366 app/assets/3d/user_furniture/monastery_monastery_wall_bay.glb | 29336 B | ассет графики/3D/интерфейса: monastery monastery wall bay |
| №0367 app/assets/3d/user_furniture/monastery_monks_chest.glb | 30432 B | ассет графики/3D/интерфейса: monastery monks chest |
| №0368 app/assets/3d/user_furniture/monastery_mortar_and_pestle_set.glb | 31476 B | ассет графики/3D/интерфейса: monastery mortar and pestle set |
| №0369 app/assets/3d/user_furniture/monastery_parchment_stretching_frame.glb | 66292 B | ассет графики/3D/интерфейса: monastery parchment stretching frame |
| №0370 app/assets/3d/user_furniture/monastery_physic_bench.glb | 46424 B | ассет графики/3D/интерфейса: monastery physic bench |
| №0371 app/assets/3d/user_furniture/monastery_pigment_tray.glb | 42180 B | ассет графики/3D/интерфейса: monastery pigment tray |
| №0372 app/assets/3d/user_furniture/monastery_quill_and_inkhorn_set.glb | 36912 B | ассет графики/3D/интерфейса: monastery quill and inkhorn set |
| №0373 app/assets/3d/user_furniture/monastery_rain_water_butt.glb | 45160 B | ассет графики/3D/интерфейса: monastery rain water butt |
| №0374 app/assets/3d/user_furniture/monastery_readers_pulpit.glb | 70796 B | ассет графики/3D/интерфейса: monastery readers pulpit |
| №0375 app/assets/3d/user_furniture/monastery_reading_lectern.glb | 48744 B | ассет графики/3D/интерфейса: monastery reading lectern |
| №0376 app/assets/3d/user_furniture/monastery_refectory_bench.glb | 20408 B | ассет графики/3D/интерфейса: monastery refectory bench |
| №0377 app/assets/3d/user_furniture/monastery_refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: monastery refectory long table |
| №0378 app/assets/3d/user_furniture/monastery_reliquary_casket.glb | 59680 B | ассет графики/3D/интерфейса: monastery reliquary casket |
| №0379 app/assets/3d/user_furniture/monastery_ruling_board.glb | 98044 B | ассет графики/3D/интерфейса: monastery ruling board |
| №0380 app/assets/3d/user_furniture/monastery_rush_light_stand.glb | 19044 B | ассет графики/3D/интерфейса: monastery rush light stand |
| №0381 app/assets/3d/user_furniture/monastery_scribes_stool.glb | 19900 B | ассет графики/3D/интерфейса: monastery scribes stool |
| №0382 app/assets/3d/user_furniture/monastery_sloped_writing_desk.glb | 247044 B | ассет графики/3D/интерфейса: monastery sloped writing desk |
| №0383 app/assets/3d/user_furniture/monastery_stone_drain.glb | 12360 B | ассет графики/3D/интерфейса: monastery stone drain |
| №0384 app/assets/3d/user_furniture/monastery_stone_font.glb | 55200 B | ассет графики/3D/интерфейса: monastery stone font |
| №0385 app/assets/3d/user_furniture/monastery_stone_stair_vice.glb | 130164 B | ассет графики/3D/интерфейса: monastery stone stair vice |
| №0386 app/assets/3d/user_furniture/monastery_tomb_slab.glb | 47852 B | ассет графики/3D/интерфейса: monastery tomb slab |
| №0387 app/assets/3d/user_furniture/monastery_trestle_table.glb | 39912 B | ассет графики/3D/интерфейса: monastery trestle table |
| №0388 app/assets/3d/user_furniture/monastery_wall_torch_bracket.glb | 38324 B | ассет графики/3D/интерфейса: monastery wall torch bracket |
| №0389 app/assets/3d/user_furniture/monastery_wood_stack.glb | 71140 B | ассет графики/3D/интерфейса: monastery wood stack |
| №0390 app/assets/3d/user_furniture/monks_chest.glb | 30508 B | ассет графики/3D/интерфейса: monks chest |
| №0391 app/assets/3d/user_furniture/mortar_pestle.glb | 31516 B | ассет графики/3D/интерфейса: mortar pestle |
| №0392 app/assets/3d/user_furniture/nature_birch_leaning.glb | 14804 B | ассет графики/3D/интерфейса: nature birch leaning |
| №0393 app/assets/3d/user_furniture/nature_birch_mature.glb | 15636 B | ассет графики/3D/интерфейса: nature birch mature |
| №0394 app/assets/3d/user_furniture/nature_birch_young.glb | 13980 B | ассет графики/3D/интерфейса: nature birch young |
| №0395 app/assets/3d/user_furniture/nature_boulder_large.glb | 6660 B | ассет графики/3D/интерфейса: nature boulder large |
| №0396 app/assets/3d/user_furniture/nature_boulder_medium.glb | 6192 B | ассет графики/3D/интерфейса: nature boulder medium |
| №0397 app/assets/3d/user_furniture/nature_boulder_mossy.glb | 24232 B | ассет графики/3D/интерфейса: nature boulder mossy |
| №0398 app/assets/3d/user_furniture/nature_boulder_small.glb | 4760 B | ассет графики/3D/интерфейса: nature boulder small |
| №0399 app/assets/3d/user_furniture/nature_bush_berry.glb | 12316 B | ассет графики/3D/интерфейса: nature bush berry |
| №0400 app/assets/3d/user_furniture/nature_bush_flat.glb | 5980 B | ассет графики/3D/интерфейса: nature bush flat |
| №0401 app/assets/3d/user_furniture/nature_bush_flowering.glb | 16248 B | ассет графики/3D/интерфейса: nature bush flowering |
| №0402 app/assets/3d/user_furniture/nature_bush_round.glb | 5152 B | ассет графики/3D/интерфейса: nature bush round |
| №0403 app/assets/3d/user_furniture/nature_bush_tall.glb | 5968 B | ассет графики/3D/интерфейса: nature bush tall |
| №0404 app/assets/3d/user_furniture/nature_cliff_block.glb | 29492 B | ассет графики/3D/интерфейса: nature cliff block |
| №0405 app/assets/3d/user_furniture/nature_dead_snag_short.glb | 8596 B | ассет графики/3D/интерфейса: nature dead snag short |
| №0406 app/assets/3d/user_furniture/nature_dead_snag_tall.glb | 16784 B | ассет графики/3D/интерфейса: nature dead snag tall |
| №0407 app/assets/3d/user_furniture/nature_fern_clump.glb | 29024 B | ассет графики/3D/интерфейса: nature fern clump |
| №0408 app/assets/3d/user_furniture/nature_fern_single.glb | 13176 B | ассет графики/3D/интерфейса: nature fern single |
| №0409 app/assets/3d/user_furniture/nature_flower_red.glb | 12412 B | ассет графики/3D/интерфейса: nature flower red |
| №0410 app/assets/3d/user_furniture/nature_flower_yellow.glb | 12216 B | ассет графики/3D/интерфейса: nature flower yellow |
| №0411 app/assets/3d/user_furniture/nature_grass_tuft_tall.glb | 6628 B | ассет графики/3D/интерфейса: nature grass tuft tall |
| №0412 app/assets/3d/user_furniture/nature_hedge_block.glb | 2444 B | ассет графики/3D/интерфейса: nature hedge block |
| №0413 app/assets/3d/user_furniture/nature_meadow_disc.glb | 8780 B | ассет графики/3D/интерфейса: nature meadow disc |
| №0414 app/assets/3d/user_furniture/nature_mushroom_group.glb | 39600 B | ассет графики/3D/интерфейса: nature mushroom group |
| №0415 app/assets/3d/user_furniture/nature_oak_ancient.glb | 292756 B | ассет графики/3D/интерфейса: nature oak ancient |
| №0416 app/assets/3d/user_furniture/nature_oak_mature.glb | 279624 B | ассет графики/3D/интерфейса: nature oak mature |
| №0417 app/assets/3d/user_furniture/nature_oak_sapling.glb | 266084 B | ассет графики/3D/интерфейса: nature oak sapling |
| №0418 app/assets/3d/user_furniture/nature_oak_young.glb | 266536 B | ассет графики/3D/интерфейса: nature oak young |
| №0419 app/assets/3d/user_furniture/nature_palm_leaning.glb | 50808 B | ассет графики/3D/интерфейса: nature palm leaning |
| №0420 app/assets/3d/user_furniture/nature_palm_mature.glb | 57076 B | ассет графики/3D/интерфейса: nature palm mature |
| №0421 app/assets/3d/user_furniture/nature_palm_young.glb | 37688 B | ассет графики/3D/интерфейса: nature palm young |
| №0422 app/assets/3d/user_furniture/nature_pebble_cluster.glb | 12184 B | ассет графики/3D/интерфейса: nature pebble cluster |
| №0423 app/assets/3d/user_furniture/nature_pine_columnar.glb | 265888 B | ассет графики/3D/интерфейса: nature pine columnar |
| №0424 app/assets/3d/user_furniture/nature_pine_sapling.glb | 264192 B | ассет графики/3D/интерфейса: nature pine sapling |
| №0425 app/assets/3d/user_furniture/nature_pine_spreading.glb | 265024 B | ассет графики/3D/интерфейса: nature pine spreading |
| №0426 app/assets/3d/user_furniture/nature_pine_windswept.glb | 265012 B | ассет графики/3D/интерфейса: nature pine windswept |
| №0427 app/assets/3d/user_furniture/nature_rock_pile.glb | 11840 B | ассет графики/3D/интерфейса: nature rock pile |
| №0428 app/assets/3d/user_furniture/nature_root_cluster.glb | 18436 B | ассет графики/3D/интерфейса: nature root cluster |
| №0429 app/assets/3d/user_furniture/nature_sapling_pair.glb | 267912 B | ассет графики/3D/интерфейса: nature sapling pair |
| №0430 app/assets/3d/user_furniture/nature_slab_flat.glb | 2744 B | ассет графики/3D/интерфейса: nature slab flat |
| №0431 app/assets/3d/user_furniture/nature_slab_upright.glb | 2484 B | ассет графики/3D/интерфейса: nature slab upright |
| №0432 app/assets/3d/user_furniture/nature_stump_mossy.glb | 6616 B | ассет графики/3D/интерфейса: nature stump mossy |
| №0433 app/assets/3d/user_furniture/nature_stump_oak.glb | 273776 B | ассет графики/3D/интерфейса: nature stump oak |
| №0434 app/assets/3d/user_furniture/nature_stump_pine.glb | 261388 B | ассет графики/3D/интерфейса: nature stump pine |
| №0435 app/assets/3d/user_furniture/nature_topiary_cone.glb | 7524 B | ассет графики/3D/интерфейса: nature topiary cone |
| №0436 app/assets/3d/user_furniture/parchment_stretching_frame.glb | 55508 B | ассет графики/3D/интерфейса: parchment stretching frame |
| №0437 app/assets/3d/user_furniture/physic_bench.glb | 60316 B | ассет графики/3D/интерфейса: physic bench |
| №0438 app/assets/3d/user_furniture/pigment_tray.glb | 39864 B | ассет графики/3D/интерфейса: pigment tray |
| №0439 app/assets/3d/user_furniture/quill_inkhorn_set.glb | 36956 B | ассет графики/3D/интерфейса: quill inkhorn set |
| №0440 app/assets/3d/user_furniture/rain_water_butt.glb | 45168 B | ассет графики/3D/интерфейса: rain water butt |
| №0441 app/assets/3d/user_furniture/range_and_oven.glb | 19732 B | ассет графики/3D/интерфейса: range and oven |
| №0442 app/assets/3d/user_furniture/reading_lectern.glb | 48844 B | ассет графики/3D/интерфейса: reading lectern |
| №0443 app/assets/3d/user_furniture/refectory_bench.glb | 20560 B | ассет графики/3D/интерфейса: refectory bench |
| №0444 app/assets/3d/user_furniture/refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: refectory long table |
| №0445 app/assets/3d/user_furniture/reliquary_casket.glb | 59728 B | ассет графики/3D/интерфейса: reliquary casket |
| №0446 app/assets/3d/user_furniture/road_signpost.glb | 8044 B | ассет графики/3D/интерфейса: road signpost |
| №0447 app/assets/3d/user_furniture/rug.glb | 16540 B | ассет графики/3D/интерфейса: rug |
| №0448 app/assets/3d/user_furniture/ruling_board.glb | 98032 B | ассет графики/3D/интерфейса: ruling board |
| №0449 app/assets/3d/user_furniture/rush_light_stand.glb | 19052 B | ассет графики/3D/интерфейса: rush light stand |
| №0450 app/assets/3d/user_furniture/scribes_stool.glb | 20040 B | ассет графики/3D/интерфейса: scribes stool |
| №0451 app/assets/3d/user_furniture/shop_counter.glb | 58488 B | ассет графики/3D/интерфейса: shop counter |
| №0452 app/assets/3d/user_furniture/sloped_writing_desk.glb | 341476 B | ассет графики/3D/интерфейса: sloped writing desk |
| №0453 app/assets/3d/user_furniture/spinning_wheel.glb | 21900 B | ассет графики/3D/интерфейса: spinning wheel |
| №0454 app/assets/3d/user_furniture/stone_stone_stair_vice_0.glb | 130164 B | ассет графики/3D/интерфейса: stone stone stair vice 0 |
| №0455 app/assets/3d/user_furniture/table_and_stools.glb | 34088 B | ассет графики/3D/интерфейса: table and stools |
| №0456 app/assets/3d/user_furniture/table.glb | 6217412 B | ассет графики/3D/интерфейса: table |
| №0457 app/assets/3d/user_furniture/torch_sconce.glb | 8692 B | ассет графики/3D/интерфейса: torch sconce |
| №0458 app/assets/3d/user_furniture/town_allotment_bed.glb | 42940 B | ассет графики/3D/интерфейса: town allotment bed |
| №0459 app/assets/3d/user_furniture/town_altar_with_candles.glb | 28704 B | ассет графики/3D/интерфейса: town altar with candles |
| №0460 app/assets/3d/user_furniture/town_anvil.glb | 7820 B | ассет графики/3D/интерфейса: town anvil |
| №0461 app/assets/3d/user_furniture/town_apple_tree.glb | 21880 B | ассет графики/3D/интерфейса: town apple tree |
| №0462 app/assets/3d/user_furniture/town_armour_stand.glb | 16180 B | ассет графики/3D/интерфейса: town armour stand |
| №0463 app/assets/3d/user_furniture/town_banner_pole.glb | 16800 B | ассет графики/3D/интерфейса: town banner pole |
| №0464 app/assets/3d/user_furniture/town_barrel.glb | 13340 B | ассет графики/3D/интерфейса: town barrel |
| №0465 app/assets/3d/user_furniture/town_bedroll.glb | 8964 B | ассет графики/3D/интерфейса: town bedroll |
| №0466 app/assets/3d/user_furniture/town_bench.glb | 16564 B | ассет графики/3D/интерфейса: town bench |
| №0467 app/assets/3d/user_furniture/town_boulder_large.glb | 9404 B | ассет графики/3D/интерфейса: town boulder large |
| №0468 app/assets/3d/user_furniture/town_boulder_small.glb | 4768 B | ассет графики/3D/интерфейса: town boulder small |
| №0469 app/assets/3d/user_furniture/town_bush.glb | 9188 B | ассет графики/3D/интерфейса: town bush |
| №0470 app/assets/3d/user_furniture/town_campfire_with_spit.glb | 33304 B | ассет графики/3D/интерфейса: town campfire with spit |
| №0471 app/assets/3d/user_furniture/town_canoe.glb | 15568 B | ассет графики/3D/интерфейса: town canoe |
| №0472 app/assets/3d/user_furniture/town_cargo_cart.glb | 70964 B | ассет графики/3D/интерфейса: town cargo cart |
| №0473 app/assets/3d/user_furniture/town_cauldron_on_tripod.glb | 32232 B | ассет графики/3D/интерфейса: town cauldron on tripod |
| №0474 app/assets/3d/user_furniture/town_cave_mouth.glb | 21616 B | ассет графики/3D/интерфейса: town cave mouth |
| №0475 app/assets/3d/user_furniture/town_chandelier.glb | 24996 B | ассет графики/3D/интерфейса: town chandelier |
| №0476 app/assets/3d/user_furniture/town_chicken_coop.glb | 26176 B | ассет графики/3D/интерфейса: town chicken coop |
| №0477 app/assets/3d/user_furniture/town_cobble_road_corner.glb | 18268 B | ассет графики/3D/интерфейса: town cobble road corner |
| №0478 app/assets/3d/user_furniture/town_cobble_road_junction.glb | 26024 B | ассет графики/3D/интерфейса: town cobble road junction |
| №0479 app/assets/3d/user_furniture/town_cobble_road_tile.glb | 20612 B | ассет графики/3D/интерфейса: town cobble road tile |
| №0480 app/assets/3d/user_furniture/town_cooks_kitchen.glb | 96404 B | ассет графики/3D/интерфейса: town cooks kitchen |
| №0481 app/assets/3d/user_furniture/town_cow_pen_fence.glb | 11268 B | ассет графики/3D/интерфейса: town cow pen fence |
| №0482 app/assets/3d/user_furniture/town_crate_stack.glb | 39416 B | ассет графики/3D/интерфейса: town crate stack |
| №0483 app/assets/3d/user_furniture/town_dead_tree.glb | 6196 B | ассет графики/3D/интерфейса: town dead tree |
| №0484 app/assets/3d/user_furniture/town_dirt_path_tile.glb | 9152 B | ассет графики/3D/интерфейса: town dirt path tile |
| №0485 app/assets/3d/user_furniture/town_farmhouse_and_barn.glb | 161272 B | ассет графики/3D/интерфейса: town farmhouse and barn |
| №0486 app/assets/3d/user_furniture/town_fence_gate.glb | 14544 B | ассет графики/3D/интерфейса: town fence gate |
| №0487 app/assets/3d/user_furniture/town_fence_run.glb | 28988 B | ассет графики/3D/интерфейса: town fence run |
| №0488 app/assets/3d/user_furniture/town_fern_clump.glb | 15892 B | ассет графики/3D/интерфейса: town fern clump |
| №0489 app/assets/3d/user_furniture/town_ferry_raft.glb | 31140 B | ассет графики/3D/интерфейса: town ferry raft |
| №0490 app/assets/3d/user_furniture/town_fishing_boat.glb | 25960 B | ассет графики/3D/интерфейса: town fishing boat |
| №0491 app/assets/3d/user_furniture/town_fishing_hut_on_stilts.glb | 110516 B | ассет графики/3D/интерфейса: town fishing hut on stilts |
| №0492 app/assets/3d/user_furniture/town_fletcher_shop.glb | 117300 B | ассет графики/3D/интерфейса: town fletcher shop |
| №0493 app/assets/3d/user_furniture/town_flower_patch.glb | 34768 B | ассет графики/3D/интерфейса: town flower patch |
| №0494 app/assets/3d/user_furniture/town_general_store.glb | 137904 B | ассет графики/3D/интерфейса: town general store |
| №0495 app/assets/3d/user_furniture/town_goblin_tent.glb | 15120 B | ассет графики/3D/интерфейса: town goblin tent |
| №0496 app/assets/3d/user_furniture/town_goblin_totem.glb | 27832 B | ассет графики/3D/интерфейса: town goblin totem |
| №0497 app/assets/3d/user_furniture/town_grass_ground_tile.glb | 8564 B | ассет графики/3D/интерфейса: town grass ground tile |
| №0498 app/assets/3d/user_furniture/town_grass_tuft_cluster.glb | 5080 B | ассет графики/3D/интерфейса: town grass tuft cluster |
| №0499 app/assets/3d/user_furniture/town_gravestone_set.glb | 23812 B | ассет графики/3D/интерфейса: town gravestone set |
| №0500 app/assets/3d/user_furniture/town_guard_barracks.glb | 162732 B | ассет графики/3D/интерфейса: town guard barracks |
| №0501 app/assets/3d/user_furniture/town_hand_cart.glb | 25308 B | ассет графики/3D/интерфейса: town hand cart |
| №0502 app/assets/3d/user_furniture/town_hay_bale.glb | 16340 B | ассет графики/3D/интерфейса: town hay bale |
| №0503 app/assets/3d/user_furniture/town_hitching_post.glb | 22008 B | ассет графики/3D/интерфейса: town hitching post |
| №0504 app/assets/3d/user_furniture/town_hunters_hide.glb | 33880 B | ассет графики/3D/интерфейса: town hunters hide |
| №0505 app/assets/3d/user_furniture/town_lamp_post.glb | 16804 B | ассет графики/3D/интерфейса: town lamp post |
| №0506 app/assets/3d/user_furniture/town_lily_pads.glb | 16632 B | ассет графики/3D/интерфейса: town lily pads |
| №0507 app/assets/3d/user_furniture/town_log_pile.glb | 37732 B | ассет графики/3D/интерфейса: town log pile |
| №0508 app/assets/3d/user_furniture/town_loom.glb | 46480 B | ассет графики/3D/интерфейса: town loom |
| №0509 app/assets/3d/user_furniture/town_loot_sack.glb | 11820 B | ассет графики/3D/интерфейса: town loot sack |
| №0510 app/assets/3d/user_furniture/town_market_stall_blue.glb | 61540 B | ассет графики/3D/интерфейса: town market stall blue |
| №0511 app/assets/3d/user_furniture/town_market_stall_cream.glb | 60756 B | ассет графики/3D/интерфейса: town market stall cream |
| №0512 app/assets/3d/user_furniture/town_market_stall.glb | 61536 B | ассет графики/3D/интерфейса: town market stall |
| №0513 app/assets/3d/user_furniture/town_mine_entrance.glb | 41744 B | ассет графики/3D/интерфейса: town mine entrance |
| №0514 app/assets/3d/user_furniture/town_mushroom_ring.glb | 22884 B | ассет графики/3D/интерфейса: town mushroom ring |
| №0515 app/assets/3d/user_furniture/town_notice_board.glb | 15924 B | ассет графики/3D/интерфейса: town notice board |
| №0516 app/assets/3d/user_furniture/town_oak_tree.glb | 19492 B | ассет графики/3D/интерфейса: town oak tree |
| №0517 app/assets/3d/user_furniture/town_pine_tree.glb | 7096 B | ассет графики/3D/интерфейса: town pine tree |
| №0518 app/assets/3d/user_furniture/town_plaza_paving_tile.glb | 40396 B | ассет графики/3D/интерфейса: town plaza paving tile |
| №0519 app/assets/3d/user_furniture/town_ploughed_field_tile.glb | 24992 B | ассет графики/3D/интерфейса: town ploughed field tile |
| №0520 app/assets/3d/user_furniture/town_range_and_oven.glb | 19440 B | ассет графики/3D/интерфейса: town range and oven |
| №0521 app/assets/3d/user_furniture/town_reed_clump.glb | 8672 B | ассет графики/3D/интерфейса: town reed clump |
| №0522 app/assets/3d/user_furniture/town_river_bank_tile.glb | 17528 B | ассет графики/3D/интерфейса: town river bank tile |
| №0523 app/assets/3d/user_furniture/town_river_bend_tile.glb | 27100 B | ассет графики/3D/интерфейса: town river bend tile |
| №0524 app/assets/3d/user_furniture/town_river_tile_straight.glb | 19108 B | ассет графики/3D/интерфейса: town river tile straight |
| №0525 app/assets/3d/user_furniture/town_road_signpost.glb | 7824 B | ассет графики/3D/интерфейса: town road signpost |
| №0526 app/assets/3d/user_furniture/town_rock_outcrop.glb | 10020 B | ассет графики/3D/интерфейса: town rock outcrop |
| №0527 app/assets/3d/user_furniture/town_rope_bridge.glb | 104548 B | ассет графики/3D/интерфейса: town rope bridge |
| №0528 app/assets/3d/user_furniture/town_rowing_boat.glb | 26056 B | ассет графики/3D/интерфейса: town rowing boat |
| №0529 app/assets/3d/user_furniture/town_rug.glb | 16352 B | ассет графики/3D/интерфейса: town rug |
| №0530 app/assets/3d/user_furniture/town_scarecrow.glb | 22344 B | ассет графики/3D/интерфейса: town scarecrow |
| №0531 app/assets/3d/user_furniture/town_shop_counter.glb | 61556 B | ассет графики/3D/интерфейса: town shop counter |
| №0532 app/assets/3d/user_furniture/town_smithy.glb | 105612 B | ассет графики/3D/интерфейса: town smithy |
| №0533 app/assets/3d/user_furniture/town_spinning_wheel.glb | 21608 B | ассет графики/3D/интерфейса: town spinning wheel |
| №0534 app/assets/3d/user_furniture/town_standing_stone.glb | 13276 B | ассет графики/3D/интерфейса: town standing stone |
| №0535 app/assets/3d/user_furniture/town_stone_arch_bridge.glb | 51536 B | ассет графики/3D/интерфейса: town stone arch bridge |
| №0536 app/assets/3d/user_furniture/town_stone_church.glb | 145052 B | ассет графики/3D/интерфейса: town stone church |
| №0537 app/assets/3d/user_furniture/town_stone_circle_slab.glb | 31656 B | ассет графики/3D/интерфейса: town stone circle slab |
| №0538 app/assets/3d/user_furniture/town_straw_target.glb | 15176 B | ассет графики/3D/интерфейса: town straw target |
| №0539 app/assets/3d/user_furniture/town_stump_with_axe.glb | 11880 B | ассет графики/3D/интерфейса: town stump with axe |
| №0540 app/assets/3d/user_furniture/town_table_and_stools.glb | 33848 B | ассет графики/3D/интерфейса: town table and stools |
| №0541 app/assets/3d/user_furniture/town_thatched_cottage.glb | 106096 B | ассет графики/3D/интерфейса: town thatched cottage |
| №0542 app/assets/3d/user_furniture/town_timber_house_large.glb | 262356 B | ассет графики/3D/интерфейса: town timber house large |
| №0543 app/assets/3d/user_furniture/town_timber_house_medium.glb | 169188 B | ассет графики/3D/интерфейса: town timber house medium |
| №0544 app/assets/3d/user_furniture/town_timber_house_small.glb | 119348 B | ассет графики/3D/интерфейса: town timber house small |
| №0545 app/assets/3d/user_furniture/town_timber_plank_bridge.glb | 60076 B | ассет графики/3D/интерфейса: town timber plank bridge |
| №0546 app/assets/3d/user_furniture/town_torch_sconce.glb | 8460 B | ассет графики/3D/интерфейса: town torch sconce |
| №0547 app/assets/3d/user_furniture/town_town_bank.glb | 116184 B | ассет графики/3D/интерфейса: town town bank |
| №0548 app/assets/3d/user_furniture/town_town_hall.glb | 252584 B | ассет графики/3D/интерфейса: town town hall |
| №0549 app/assets/3d/user_furniture/town_town_wall_segment.glb | 9696 B | ассет графики/3D/интерфейса: town town wall segment |
| №0550 app/assets/3d/user_furniture/town_town_well.glb | 32492 B | ассет графики/3D/интерфейса: town town well |
| №0551 app/assets/3d/user_furniture/town_treasure_chest.glb | 12404 B | ассет графики/3D/интерфейса: town treasure chest |
| №0552 app/assets/3d/user_furniture/town_village_tavern.glb | 220336 B | ассет графики/3D/интерфейса: town village tavern |
| №0553 app/assets/3d/user_furniture/town_wall_corner_tower.glb | 79592 B | ассет графики/3D/интерфейса: town wall corner tower |
| №0554 app/assets/3d/user_furniture/town_wall_gatehouse.glb | 77180 B | ассет графики/3D/интерфейса: town wall gatehouse |
| №0555 app/assets/3d/user_furniture/town_wall_stair.glb | 34040 B | ассет графики/3D/интерфейса: town wall stair |
| №0556 app/assets/3d/user_furniture/town_wall_walk_crenellated.glb | 15296 B | ассет графики/3D/интерфейса: town wall walk crenellated |
| №0557 app/assets/3d/user_furniture/town_watchtower.glb | 109556 B | ассет графики/3D/интерфейса: town watchtower |
| №0558 app/assets/3d/user_furniture/town_water_trough.glb | 18172 B | ассет графики/3D/интерфейса: town water trough |
| №0559 app/assets/3d/user_furniture/town_weapon_rack.glb | 23152 B | ассет графики/3D/интерфейса: town weapon rack |
| №0560 app/assets/3d/user_furniture/town_wheat_field_tile.glb | 55508 B | ассет графики/3D/интерфейса: town wheat field tile |
| №0561 app/assets/3d/user_furniture/town_willow_tree.glb | 26360 B | ассет графики/3D/интерфейса: town willow tree |
| №0562 app/assets/3d/user_furniture/town_windmill.glb | 121768 B | ассет графики/3D/интерфейса: town windmill |
| №0563 app/assets/3d/user_furniture/town_wizard_tower_base.glb | 64292 B | ассет графики/3D/интерфейса: town wizard tower base |
| №0564 app/assets/3d/user_furniture/town_wizard_tower_mid.glb | 70456 B | ассет графики/3D/интерфейса: town wizard tower mid |
| №0565 app/assets/3d/user_furniture/town_wizard_tower_top.glb | 50984 B | ассет графики/3D/интерфейса: town wizard tower top |
| №0566 app/assets/3d/user_furniture/treasure_chest.glb | 12772 B | ассет графики/3D/интерфейса: treasure chest |
| №0567 app/assets/3d/user_furniture/trestle_table.glb | 40424 B | ассет графики/3D/интерфейса: trestle table |
| №0568 app/assets/3d/user_furniture/weapon_rack.glb | 23300 B | ассет графики/3D/интерфейса: weapon rack |
| №0569 app/assets/3d/user_furniture/wood_stack.glb | 71136 B | ассет графики/3D/интерфейса: wood stack |
| №0570 app/assets/dice/.gitkeep | 0 B | ассет графики/3D/интерфейса: .gitkeep |
| №0571 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png | 2349861 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 07 PM |
| №0572 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_30 PM.png | 2088308 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 30 PM |
| №0573 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_13_27 PM.png | 2584925 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 13 27 PM |
| №0574 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_23_00 PM.png | 2274607 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 23 00 PM |
| №0575 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_24_38 PM.png | 2254958 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 24 38 PM |
| №0576 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_27_51 PM.png | 2389543 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 27 51 PM |
| №0577 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_35_50 PM.png | 2486441 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 35 50 PM |
| №0578 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_41_40 PM.png | 2712929 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 41 40 PM |
| №0579 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_49_58 PM.png | 2751322 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 49 58 PM |
| №0580 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_07 PM.png | 2778707 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 07 PM |
| №0581 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_18 PM.png | 2503466 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 18 PM |
| №0582 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_28 PM.png | 2561809 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 28 PM |
| №0583 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_39 PM.png | 2841483 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 39 PM |
| №0584 app/assets/dice/dice1.png | 348916 B | ассет графики/3D/интерфейса: dice1 |
| №0585 app/assets/dice/dice10-1.png | 386558 B | ассет графики/3D/интерфейса: dice10 1 |
| №0586 app/assets/dice/dice10.png | 386558 B | ассет графики/3D/интерфейса: dice10 |
| №0587 app/assets/dice/dice11.png | 307154 B | ассет графики/3D/интерфейса: dice11 |
| №0588 app/assets/dice/dice12.png | 395864 B | ассет графики/3D/интерфейса: dice12 |
| №0589 app/assets/dice/dice13.png | 344758 B | ассет графики/3D/интерфейса: dice13 |
| №0590 app/assets/dice/dice15.png | 388111 B | ассет графики/3D/интерфейса: dice15 |
| №0591 app/assets/dice/dice16.png | 352768 B | ассет графики/3D/интерфейса: dice16 |
| №0592 app/assets/dice/dice17.png | 342548 B | ассет графики/3D/интерфейса: dice17 |
| №0593 app/assets/dice/dice2.png | 246156 B | ассет графики/3D/интерфейса: dice2 |
| №0594 app/assets/dice/dice3.png | 346757 B | ассет графики/3D/интерфейса: dice3 |
| №0595 app/assets/dice/dice4.png | 348331 B | ассет графики/3D/интерфейса: dice4 |
| №0596 app/assets/dice/dice5.png | 299652 B | ассет графики/3D/интерфейса: dice5 |
| №0597 app/assets/dice/dice6.png | 331669 B | ассет графики/3D/интерфейса: dice6 |
| №0598 app/assets/dice/dice7.png | 343178 B | ассет графики/3D/интерфейса: dice7 |
| №0599 app/assets/dice/dice8.png | 370230 B | ассет графики/3D/интерфейса: dice8 |
| №0600 app/assets/dice/dice9.png | 336030 B | ассет графики/3D/интерфейса: dice9 |
| №0601 app/assets/ui/character-creation/1790622252250.png | 908119 B | ассет графики/3D/интерфейса: 1790622252250 |
| №0602 app/assets/ui/dragon_fire_burst_v2_sprite.png | 237749 B | ассет графики/3D/интерфейса: dragon fire burst v2 sprite |
| №0603 app/assets/ui/dragon_fire.png | 267960 B | ассет графики/3D/интерфейса: dragon fire |
| №0604 app/assets/ui/dragon_flight_v2_sprite.png | 573207 B | ассет графики/3D/интерфейса: dragon flight v2 sprite |
| №0605 app/assets/ui/dragon_frame_strip.svg | 858 B | ассет графики/3D/интерфейса: dragon frame strip |
| №0606 app/assets/ui/dragon.png | 274924 B | ассет графики/3D/интерфейса: dragon |
| №0607 app/assets/ui/fire_front.png | 1276760 B | ассет графики/3D/интерфейса: fire front |
| №0608 app/assets/ui/forest_burned.jpg | 211523 B | ассет графики/3D/интерфейса: forest burned |
| №0609 app/assets/ui/forest_green.jpg | 309184 B | ассет графики/3D/интерфейса: forest green |
| №0610 app/assets/ui/loader_dragon_head.svg | 2388 B | ассет графики/3D/интерфейса: loader dragon head |
| №0611 app/assets/ui/loader_fire.svg | 902 B | ассет графики/3D/интерфейса: loader fire |
| №0612 app/assets/ui/loader_forest_burning.svg | 1448 B | ассет графики/3D/интерфейса: loader forest burning |
| №0613 app/assets/ui/loader_forest.svg | 917 B | ассет графики/3D/интерфейса: loader forest |
| №0614 app/assets/ui/loader_sparks.svg | 626 B | ассет графики/3D/интерфейса: loader sparks |
| №0615 app/assets/ui/update_scene_ash.svg | 432 B | ассет графики/3D/интерфейса: update scene ash |
| №0616 app/assets/ui/update_scene_background.svg | 1141 B | ассет графики/3D/интерфейса: update scene background |
| №0617 app/assets/ui/update_scene_dragon_fire.svg | 733 B | ассет графики/3D/интерфейса: update scene dragon fire |
| №0618 app/assets/ui/update_scene_dragon.svg | 1324 B | ассет графики/3D/интерфейса: update scene dragon |
| №0619 app/assets/ui/update_scene_embers.svg | 474 B | ассет графики/3D/интерфейса: update scene embers |
| №0620 app/assets/ui/update_scene_fire_front.svg | 837 B | ассет графики/3D/интерфейса: update scene fire front |
| №0621 app/assets/ui/update_scene_forest_burned.svg | 1417 B | ассет графики/3D/интерфейса: update scene forest burned |
| №0622 app/assets/ui/update_scene_forest_green.svg | 1181 B | ассет графики/3D/интерфейса: update scene forest green |
| №0623 app/assets/ui/update_scene_smoke.svg | 417 B | ассет графики/3D/интерфейса: update scene smoke |
| №0624 app/assets/ui/vine_bone_frame_strip.svg | 943 B | ассет графики/3D/интерфейса: vine bone frame strip |
| №0625 app/Backgrounds.js | 63130 B | логический модуль: Backgrounds |
| №0626 app/battle_action_ui.js | 18386 B | логический модуль: battle action ui |
| №0627 app/battle_board.js | 37591 B | логический модуль: battle board |
| №0628 app/bestiary_2_0_v56.js | 55429 B | логический модуль: bestiary 2 0 v56 |
| №0629 app/bestiary_catalog_v56_1.js | 16222 B | логический модуль: bestiary catalog v56 1 |
| №0630 app/bestiary_catalog_v56_10.js | 10944 B | логический модуль: bestiary catalog v56 10 |
| №0631 app/bestiary_catalog_v56_11.js | 13164 B | логический модуль: bestiary catalog v56 11 |
| №0632 app/bestiary_catalog_v56_12.js | 10118 B | логический модуль: bestiary catalog v56 12 |
| №0633 app/bestiary_catalog_v56_13.js | 12586 B | логический модуль: bestiary catalog v56 13 |
| №0634 app/bestiary_catalog_v56_2.js | 13525 B | логический модуль: bestiary catalog v56 2 |
| №0635 app/bestiary_catalog_v56_3.js | 14383 B | логический модуль: bestiary catalog v56 3 |
| №0636 app/bestiary_catalog_v56_4.js | 11396 B | логический модуль: bestiary catalog v56 4 |
| №0637 app/bestiary_catalog_v56_5.js | 8648 B | логический модуль: bestiary catalog v56 5 |
| №0638 app/bestiary_catalog_v56_6.js | 9066 B | логический модуль: bestiary catalog v56 6 |
| №0639 app/bestiary_catalog_v56_7.js | 9314 B | логический модуль: bestiary catalog v56 7 |
| №0640 app/bestiary_catalog_v56_8.js | 9559 B | логический модуль: bestiary catalog v56 8 |
| №0641 app/bestiary_catalog_v56_9.js | 9861 B | логический модуль: bestiary catalog v56 9 |
| №0642 app/blood_hunter_engine.js | 82133 B | логика класса Кровавый охотник |
| №0643 app/campaign_manager.js | 7195 B | логический модуль: campaign manager |
| №0644 app/character_builder_v2.js | 109543 B | логический модуль: character builder v2 |
| №0645 app/character_creation_pergament.css | 12669 B | оформление интерфейса: character creation pergament |
| №0646 app/character_creation_pergament.js | 39686 B | логический модуль: character creation pergament |
| №0647 app/character_creation.js | 46823 B | логический модуль: character creation |
| №0648 app/character.js | 11133 B | лист персонажа; состояния и оружие |
| №0649 app/class_features_engine.js | 135018 B | логический модуль: class features engine |
| №0650 app/classesRegistry.js | 10857 B | логический модуль: classesRegistry |
| №0651 app/cloud_account.css | 1213 B | оформление интерфейса: cloud account |
| №0652 app/cloud_account.js | 8970 B | интерфейс авторизации и управления версиями |
| №0653 app/cloud_config.js | 450 B | публичная конфигурация облака |
| №0654 app/cloud_sync.js | 24647 B | синхронизация сохранений через Supabase |
| №0655 app/combat_abilities.js | 12824 B | логический модуль: combat abilities |
| №0656 app/combat_engine.js | 95078 B | движок боя и HP; адаптеры legacy значений |
| №0657 app/companion_gameplay_v27.js | 17531 B | логический модуль: companion gameplay v27 |
| №0658 app/companion_packs_v26.js | 4998 B | логический модуль: companion packs v26 |
| №0659 app/companions.js | 8943 B | логический модуль: companions |
| №0660 app/consumables.js | 15638 B | логический модуль: consumables |
| №0661 app/content_catalog.js | 9721 B | логический модуль: content catalog |
| №0662 app/content_framework.js | 9884 B | логический модуль: content framework |
| №0663 app/content_manifest.js | 3755 B | логический модуль: content manifest |
| №0664 app/crafting_character_influence_test_v46.js | 7123 B | логический модуль: crafting character influence test v46 |
| №0665 app/crafting_disassembly_repair_v51.js | 13334 B | логический модуль: crafting disassembly repair v51 |
| №0666 app/crafting_disassembly_v51.js | 11979 B | логический модуль: crafting disassembly v51 |
| №0667 app/crafting_dlc_v50.js | 8373 B | логический модуль: crafting dlc v50 |
| №0668 app/crafting_economy_v49.js | 17129 B | логический модуль: crafting economy v49 |
| №0669 app/crafting_engine_v31.js | 20294 B | логический модуль: crafting engine v31 |
| №0670 app/crafting_profession_progression_test_v47.js | 5609 B | логический модуль: crafting profession progression test v47 |
| №0671 app/crafting_profession_progression_v47.js | 35781 B | логический модуль: crafting profession progression v47 |
| №0672 app/crafting_professions_v33.js | 19300 B | логический модуль: crafting professions v33 |
| №0673 app/crafting_professions_v38.js | 48800 B | логический модуль: crafting professions v38 |
| №0674 app/crafting_resources_v34.js | 35661 B | логический модуль: crafting resources v34 |
| №0675 app/custom_crafting_v32.js | 15989 B | логический модуль: custom crafting v32 |
| №0676 app/data/classes/Accursed.js | 3369 B | логика классов: Accursed |
| №0677 app/data/classes/accursed.png | 2441667 B | логика классов: accursed |
| №0678 app/data/classes/Alchemist.js | 5589 B | логика классов: Alchemist |
| №0679 app/data/classes/alchemist.png | 1945616 B | логика классов: alchemist |
| №0680 app/data/classes/Artificer.js | 2124 B | логика классов: Artificer |
| №0681 app/data/classes/ARTIFICER.png | 891812 B | логика классов: ARTIFICER |
| №0682 app/data/classes/Barbarian.js | 3822 B | логика классов: Barbarian |
| №0683 app/data/classes/BARBARIAN.png | 815028 B | логика классов: BARBARIAN |
| №0684 app/data/classes/Bard.js | 2085 B | логика классов: Bard |
| №0685 app/data/classes/Bard.png | 769261 B | логика классов: Bard |
| №0686 app/data/classes/beasthart.png | 2255040 B | логика классов: beasthart |
| №0687 app/data/classes/Beastheart.js | 28992 B | логика классов: Beastheart |
| №0688 app/data/classes/blood hunter.png | 2210071 B | логика классов: blood hunter |
| №0689 app/data/classes/BloodHunter.js | 5283 B | логика классов: BloodHunter |
| №0690 app/data/classes/Cleric.js | 1987 B | логика классов: Cleric |
| №0691 app/data/classes/CLERIC.png | 914579 B | логика классов: CLERIC |
| №0692 app/data/classes/Druid.js | 1898 B | логика классов: Druid |
| №0693 app/data/classes/DRUID.png | 776880 B | логика классов: DRUID |
| №0694 app/data/classes/extra_class_stubs.js | 4499 B | логика классов: extra class stubs |
| №0695 app/data/classes/Fighter.js | 3771 B | логика классов: Fighter |
| №0696 app/data/classes/FIGHTER.png | 762812 B | логика классов: FIGHTER |
| №0697 app/data/classes/geist.png | 1776006 B | логика классов: geist |
| №0698 app/data/classes/Ghost.js | 295 B | логика классов: Ghost |
| №0699 app/data/classes/Illigger.js | 6058 B | логика классов: Illigger |
| №0700 app/data/classes/Illigger.png | 1716994 B | логика классов: Illigger |
| №0701 app/data/classes/level_up.js | 62903 B | логика классов: level up |
| №0702 app/data/classes/Martyr.js | 884 B | логика классов: Martyr |
| №0703 app/data/classes/martyr.png | 2381724 B | логика классов: martyr |
| №0704 app/data/classes/Monk.js | 2493 B | логика классов: Monk |
| №0705 app/data/classes/Monk.png | 1115382 B | логика классов: Monk |
| №0706 app/data/classes/Necromancer.js | 1013 B | логика классов: Necromancer |
| №0707 app/data/classes/necromancer.png | 2007714 B | логика классов: necromancer |
| №0708 app/data/classes/Occultist.js | 8507 B | логика классов: Occultist |
| №0709 app/data/classes/occultist.png | 1986332 B | логика классов: occultist |
| №0710 app/data/classes/Paladin.js | 2017 B | логика классов: Paladin |
| №0711 app/data/classes/PALADIN.png | 873991 B | логика классов: PALADIN |
| №0712 app/data/classes/Parasite.js | 545 B | логика классов: Parasite |
| №0713 app/data/classes/parasite.png | 2144116 B | логика классов: parasite |
| №0714 app/data/classes/progressionEngine.js | 20610 B | логика классов: progressionEngine |
| №0715 app/data/classes/Psion.js | 9033 B | логика классов: Psion |
| №0716 app/data/classes/psion.png | 1951350 B | логика классов: psion |
| №0717 app/data/classes/Pugilist.js | 11453 B | логика классов: Pugilist |
| №0718 app/data/classes/pugilist.png | 2022336 B | логика классов: pugilist |
| №0719 app/data/classes/Ranger.js | 1938 B | логика классов: Ranger |
| №0720 app/data/classes/RANGER.png | 643335 B | логика классов: RANGER |
| №0721 app/data/classes/Rogue.js | 3244 B | логика классов: Rogue |
| №0722 app/data/classes/Rogue.png | 579962 B | логика классов: Rogue |
| №0723 app/data/classes/rune keeper.png | 2582772 B | логика классов: rune keeper |
| №0724 app/data/classes/RuneKeeper.js | 2366 B | логика классов: RuneKeeper |
| №0725 app/data/classes/Savant.js | 930 B | логика классов: Savant |
| №0726 app/data/classes/savant.png | 1991433 B | логика классов: savant |
| №0727 app/data/classes/Shifter.js | 734 B | логика классов: Shifter |
| №0728 app/data/classes/shifter.png | 2248497 B | логика классов: shifter |
| №0729 app/data/classes/Sorcerer.js | 2098 B | логика классов: Sorcerer |
| №0730 app/data/classes/SORCERER.png | 939797 B | логика классов: SORCERER |
| №0731 app/data/classes/Swarm.js | 198 B | логика классов: Swarm |
| №0732 app/data/classes/the swam.png | 1759593 B | логика классов: the swam |
| №0733 app/data/classes/Vessel.js | 751 B | логика классов: Vessel |
| №0734 app/data/classes/vessel.png | 1943431 B | логика классов: vessel |
| №0735 app/data/classes/WalterParasite.js | 303 B | логика классов: WalterParasite |
| №0736 app/data/classes/Warden.js | 6678 B | логика классов: Warden |
| №0737 app/data/classes/warden.png | 2093561 B | логика классов: warden |
| №0738 app/data/classes/Warlock.js | 2013 B | логика классов: Warlock |
| №0739 app/data/classes/WARLOCK.png | 981038 B | логика классов: WARLOCK |
| №0740 app/data/classes/Warlord.js | 9504 B | логика классов: Warlord |
| №0741 app/data/classes/warlord.png | 2460016 B | логика классов: warlord |
| №0742 app/data/classes/Witch.js | 8032 B | логика классов: Witch |
| №0743 app/data/classes/witch.png | 1931074 B | логика классов: witch |
| №0744 app/data/classes/Wizard.js | 1627 B | логика классов: Wizard |
| №0745 app/data/classes/Wizard.png | 822251 B | логика классов: Wizard |
| №0746 app/data/feats/Feat_widget.js | 25654 B | черты и таланты: Feat widget |
| №0747 app/data/feats/Feats_phb.js | 19377 B | черты и таланты: Feats phb |
| №0748 app/data/feats/Feats_settings.js | 4392 B | черты и таланты: Feats settings |
| №0749 app/data/feats/Feats_tcoe.js | 5779 B | черты и таланты: Feats tcoe |
| №0750 app/data/feats/Feats_ua_homebrew.js | 11770 B | черты и таланты: Feats ua homebrew |
| №0751 app/data/feats/Feats_xgte.js | 6729 B | черты и таланты: Feats xgte |
| №0752 app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №0753 app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №0754 app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №0755 app/data/maps/3d_stress_test_all.json | 165139 B | данные/конфигурация: 3d stress test all |
| №0756 app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №0757 app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №0758 app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №0759 app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №0760 app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №0761 app/data/spells/Focuses.js | 53387 B | данные заклинаний: Focuses |
| №0762 app/data/spells/Spells1lvl.js | 60079 B | данные заклинаний: Spells1lvl |
| №0763 app/data/spells/Spells2lvl.js | 70401 B | данные заклинаний: Spells2lvl |
| №0764 app/data/spells/Spells3lvl.js | 48531 B | данные заклинаний: Spells3lvl |
| №0765 app/data/spells/Spells4lvl.js | 39396 B | данные заклинаний: Spells4lvl |
| №0766 app/data/spells/Spells5lvl.js | 41719 B | данные заклинаний: Spells5lvl |
| №0767 app/data/spells/spells6lvl.js | 37855 B | данные заклинаний: spells6lvl |
| №0768 app/data/spells/Spells7lvl.js | 29194 B | данные заклинаний: Spells7lvl |
| №0769 app/data/spells/Spells8lvl.js | 21355 B | данные заклинаний: Spells8lvl |
| №0770 app/data/spells/Spells9lvl.js | 32625 B | данные заклинаний: Spells9lvl |
| №0771 app/data/subclasses/subclassesRegistry.js | 111805 B | логика подклассов: subclassesRegistry |
| №0772 app/debug.js | 5961 B | логический модуль: debug |
| №0773 app/dice.js | 42492 B | логический модуль: dice |
| №0774 app/dnd_tools.js | 19419 B | логический модуль: dnd tools |
| №0775 app/expanded_bestiary_v39.js | 49383 B | логический модуль: expanded bestiary v39 |
| №0776 app/expanded_class_registry_bridge.js | 5025 B | логический модуль: expanded class registry bridge |
| №0777 app/expanded_classes_v23.js | 30269 B | логический модуль: expanded classes v23 |
| №0778 app/expanded_subclasses_v23.js | 2030 B | логический модуль: expanded subclasses v23 |
| №0779 app/expansion_class_progressions.js | 6719 B | логический модуль: expansion class progressions |
| №0780 app/expansion_classes_pack.js | 352830 B | логический модуль: expansion classes pack |
| №0781 app/Experience.js | 6150 B | логический модуль: Experience |
| №0782 app/extra_class_ui_bridge.js | 645 B | логический модуль: extra class ui bridge |
| №0783 app/feat_engine.js | 11457 B | логический модуль: feat engine |
| №0784 app/gameplay_core_v57.js | 20212 B | логический модуль: gameplay core v57 |
| №0785 app/ghost_extra_runtime.js | 22293 B | логический модуль: ghost extra runtime |
| №0786 app/ghost_extra_ui.js | 2387 B | логический модуль: ghost extra ui |
| №0787 app/Hero-info.js | 12434 B | логический модуль: Hero info |
| №0788 app/icon_settings_v2.js | 10484 B | логический модуль: icon settings v2 |
| №0789 app/icon_settings.js | 11281 B | логический модуль: icon settings |
| №0790 app/inventory_containers_v54.js | 12772 B | логический модуль: inventory containers v54 |
| №0791 app/inventory-coins.js | 23961 B | логический модуль: inventory coins |
| №0792 app/inventory-modal.js | 32494 B | логический модуль: inventory modal |
| №0793 app/Inventory-weight-tracker.js | 15712 B | логический модуль: Inventory weight tracker |
| №0794 app/Inventory.js | 36947 B | логический модуль: Inventory |
| №0795 app/junk.js | 8387 B | логический модуль: junk |
| №0796 app/kibbles_localization_content_v71.js | 32339 B | логический модуль: kibbles localization content v71 |
| №0797 app/library.js | 9314 B | логический модуль: library |
| №0798 app/Logo.js | 5742 B | логический модуль: Logo |
| №0799 app/magic_engine.js | 7570 B | логический модуль: magic engine |
| №0800 app/market_economy_v55.js | 17219 B | логический модуль: market economy v55 |
| №0801 app/market_expansion_v55_1.js | 21531 B | логический модуль: market expansion v55 1 |
| №0802 app/market_social_v55_3.js | 11752 B | логический модуль: market social v55 3 |
| №0803 app/market_trade_v55_2.js | 25582 B | логический модуль: market trade v55 2 |
| №0804 app/martyr_mhp_2024_runtime.js | 33254 B | логический модуль: martyr mhp 2024 runtime |
| №0805 app/materials.js | 11976 B | логический модуль: materials |
| №0806 app/monster_engine.js | 17873 B | логический модуль: monster engine |
| №0807 app/monster_loot_crafting_bridge_v40.js | 31518 B | логический модуль: monster loot crafting bridge v40 |
| №0808 app/monster_loot_engine_v36.js | 13559 B | логический модуль: monster loot engine v36 |
| №0809 app/monster_loot_engine_v37.js | 18554 B | логический модуль: monster loot engine v37 |
| №0810 app/necromancer_mhp_2024_runtime.js | 43556 B | логический модуль: necromancer mhp 2024 runtime |
| №0811 app/network_engine.js | 45962 B | логический модуль: network engine |
| №0812 app/network_gameplay.js | 87259 B | логический модуль: network gameplay |
| №0813 app/notes.js | 4818 B | логический модуль: notes |
| №0814 app/occultist_kibbles_v11_runtime.js | 60686 B | логический модуль: occultist kibbles v11 runtime |
| №0815 app/onboarding_faq_v71.css | 6093 B | оформление интерфейса: onboarding faq v71 |
| №0816 app/onboarding_faq_v71.js | 32373 B | логический модуль: onboarding faq v71 |
| №0817 app/parasite_extra_runtime.js | 30047 B | логический модуль: parasite extra runtime |
| №0818 app/parasite_extra_ui.js | 4710 B | логический модуль: parasite extra ui |
| №0819 app/predictor_cards.js | 145118 B | логический модуль: predictor cards |
| №0820 app/predictor_deck_ui.js | 39502 B | логический модуль: predictor deck ui |
| №0821 app/predictor_movement.js | 6682 B | логический модуль: predictor movement |
| №0822 app/predictor_runtime.js | 31001 B | логический модуль: predictor runtime |
| №0823 app/Proficiencies.js | 31253 B | логический модуль: Proficiencies |
| №0824 app/Proficienciescheck.js | 10367 B | логический модуль: Proficienciescheck |
| №0825 app/races.js | 52239 B | логический модуль: races |
| №0826 app/resource_gathering_v35.js | 12553 B | логический модуль: resource gathering v35 |
| №0827 app/resource_processing_v44.js | 22150 B | логический модуль: resource processing v44 |
| №0828 app/rulesEngine.js | 46039 B | логический модуль: rulesEngine |
| №0829 app/runekeeper_taron_v12_runtime.js | 27697 B | логический модуль: runekeeper taron v12 runtime |
| №0830 app/savant_laserllama_v561_runtime.js | 29860 B | логический модуль: savant laserllama v561 runtime |
| №0831 app/secondary_entities_engine.js | 7342 B | логический модуль: secondary entities engine |
| №0832 app/Settings_debug.js | 7336 B | логический модуль: Settings debug |
| №0833 app/Settings.js | 59645 B | логический модуль: Settings |
| №0834 app/shifter_laserllama_v2_1_runtime.js | 38454 B | логический модуль: shifter laserllama v2 1 runtime |
| №0835 app/skills.js | 6367 B | логический модуль: skills |
| №0836 app/spellblade_kibbles_runtime.js | 14261 B | логический модуль: spellblade kibbles runtime |
| №0837 app/spells.js | 39220 B | логический модуль: spells |
| №0838 app/styles.css | 24174 B | оформление интерфейса: styles |
| №0839 app/summoning_engine.js | 12861 B | логический модуль: summoning engine |
| №0840 app/swarm_extra_runtime.js | 19936 B | логический модуль: swarm extra runtime |
| №0841 app/swipe-lock.js | 1838 B | логический модуль: swipe lock |
| №0842 app/turn_planner.js | 15930 B | логический модуль: turn planner |
| №0843 app/update_manager_v2.js | 19885 B | логический модуль: update manager v2 |
| №0844 app/update_scene_v2.js | 11560 B | логический модуль: update scene v2 |
| №0845 app/vessel_laserllama_v4_runtime.js | 48055 B | логический модуль: vessel laserllama v4 runtime |
| №0846 app/vtt_character_actions_v64.js | 4047 B | логический модуль: vtt character actions v64 |
| №0847 app/vtt_character_sheet_v63.js | 3966 B | логический модуль: vtt character sheet v63 |
| №0848 app/vtt_combat_event_bus_v69.js | 8287 B | логический модуль: vtt combat event bus v69 |
| №0849 app/vtt_combat_log_v66.js | 8113 B | логический модуль: vtt combat log v66 |
| №0850 app/vtt_debug_character_lab_v702.js | 16566 B | логический модуль: vtt debug character lab v702 |
| №0851 app/vtt_debug_dice_lab_v706.js | 9112 B | логический модуль: vtt debug dice lab v706 |
| №0852 app/vtt_debug_error_log_v709.js | 5965 B | логический модуль: vtt debug error log v709 |
| №0853 app/vtt_debug_lab_v703.js | 12151 B | логический модуль: vtt debug lab v703 |
| №0854 app/vtt_debug_panel_v70.js | 17285 B | логический модуль: vtt debug panel v70 |
| №0855 app/vtt_debug_rules_matrix_v707.js | 6881 B | логический модуль: vtt debug rules matrix v707 |
| №0856 app/vtt_debug_sandbox_v701.js | 14634 B | логический модуль: vtt debug sandbox v701 |
| №0857 app/vtt_debug_scenario_editor_v705.js | 10352 B | логический модуль: vtt debug scenario editor v705 |
| №0858 app/vtt_debug_scenarios_v704.js | 8385 B | логический модуль: vtt debug scenarios v704 |
| №0859 app/vtt_debug_tasks_v708.js | 25273 B | логический модуль: vtt debug tasks v708 |
| №0860 app/vtt_dice_resolution_v65.js | 3941 B | логический модуль: vtt dice resolution v65 |
| №0861 app/vtt_encounter_checkpoint_v68.js | 9606 B | логический модуль: vtt encounter checkpoint v68 |
| №0862 app/vtt_encounter_map_v59.js | 9462 B | логический модуль: vtt encounter map v59 |
| №0863 app/vtt_gameplay_ux_v58.js | 8641 B | логический модуль: vtt gameplay ux v58 |
| №0864 app/vtt_mobile_battle_v61.js | 4559 B | логический модуль: vtt mobile battle v61 |
| №0865 app/vtt_mobile_combat_hud_v62.js | 9071 B | логический модуль: vtt mobile combat hud v62 |
| №0866 app/vtt_mobile_session_v67.js | 11143 B | логический модуль: vtt mobile session v67 |
| №0867 app/vtt_project_manifest_v70.js | 44405 B | логический модуль: vtt project manifest v70 |
| №0868 app/vtt_token_interaction_v60.js | 8542 B | логический модуль: vtt token interaction v60 |
| №0869 app/Wallpapers.js | 19943 B | логический модуль: Wallpapers |
| №0870 app/walter_parasite_extra_runtime.js | 33758 B | логический модуль: walter parasite extra runtime |
| №0871 app/walter_parasite_ui.js | 4185 B | логический модуль: walter parasite ui |
| №0872 app/warden_mhp_2024_runtime.js | 41820 B | логический модуль: warden mhp 2024 runtime |
| №0873 app/warlord_laserllama_v330_runtime.js | 15866 B | логический модуль: warlord laserllama v330 runtime |
| №0874 app/weapons.js | 3380 B | логический модуль: weapons |
| №0875 app/weaponsheavy.js | 8328 B | логический модуль: weaponsheavy |
| №0876 app/weaponsmelee.js | 20232 B | логический модуль: weaponsmelee |
| №0877 app/weaponsranged.js | 18195 B | логический модуль: weaponsranged |
| №0878 app/weaponsspecial.js | 5655 B | логический модуль: weaponsspecial |
| №0879 app/world_resource_gathering_v53.js | 17353 B | логический модуль: world resource gathering v53 |
| №0880 arcanacards.png | 1820683 B | текстура/изображение: arcanacards |
| №0881 ash_v2_sprite.png | 442476 B | текстура/изображение: ash v2 sprite |
| №0882 bed.glb | 5718760 B | 3D модель/геометрия: bed |
| №0883 bookshelf.glb | 7818348 B | 3D модель/геометрия: bookshelf |
| №0884 chair.glb | 4643004 B | 3D модель/геометрия: chair |
| №0885 closet.glb | 6550260 B | 3D модель/геометрия: closet |
| №0886 commode.glb | 4845868 B | 3D модель/геометрия: commode |
| №0887 desktop/main.cjs | 8991 B | Electron: создание окна Windows |
| №0888 desktop/preload.cjs | 2239 B | Electron: preload и мост к UI |
| №0889 desktop/prepare.cjs | 3322 B | Electron: подготовка web ресурсов |
| №0890 desktop/update.cjs | 10917 B | Electron: обновление |
| №0891 DND_VTT_FURNITURE_CONVERSION_KIT.zip | 4072 B | архив ассетов: DND VTT FURNITURE CONVERSION KIT |
| №0892 DND_VTT_FURNITURE_READY_02.zip | 65111 B | архив ассетов: DND VTT FURNITURE READY 02 |
| №0893 DND_VTT_FURNITURE_READY_03.zip | 84538 B | архив ассетов: DND VTT FURNITURE READY 03 |
| №0894 DND_VTT_FURNITURE_READY_04.zip | 133763 B | архив ассетов: DND VTT FURNITURE READY 04 |
| №0895 DND_VTT_FURNITURE_READY_05.zip | 54294 B | архив ассетов: DND VTT FURNITURE READY 05 |
| №0896 DND_VTT_FURNITURE_READY_06.zip | 89087 B | архив ассетов: DND VTT FURNITURE READY 06 |
| №0897 DND_VTT_FURNITURE_READY_07.zip | 73932 B | архив ассетов: DND VTT FURNITURE READY 07 |
| №0898 DND_VTT_FURNITURE_READY_08.zip | 67621 B | архив ассетов: DND VTT FURNITURE READY 08 |
| №0899 DND_VTT_FURNITURE_READY_09_20_MODELS.zip | 101933 B | архив ассетов: DND VTT FURNITURE READY 09 20 MODELS |
| №0900 DND_VTT_REMAINING_GLB_BULK.zip | 5302181 B | архив ассетов: DND VTT REMAINING GLB BULK |
| №0901 docs/00_AI_PROJECT_GUIDE.md | 351623 B | документация или отчёт: 00 AI PROJECT GUIDE |
| №0902 docs/00_NEW_CHAT_PROMPT_V56_10.txt | 2658 B | документация или отчёт: 00 NEW CHAT PROMPT V56 10 |
| №0903 docs/00_NEW_CHAT_PROMPT_V56_11.txt | 2118 B | документация или отчёт: 00 NEW CHAT PROMPT V56 11 |
| №0904 docs/00_NEW_CHAT_PROMPT_V56_12.txt | 763 B | документация или отчёт: 00 NEW CHAT PROMPT V56 12 |
| №0905 docs/00_NEW_CHAT_PROMPT_V56_9.txt | 3900 B | документация или отчёт: 00 NEW CHAT PROMPT V56 9 |
| №0906 docs/2026-10-09_ota_v74_00_17_checkpoint.json | 1645 B | документация или отчёт: 2026 10 09 ota v74 00 17 checkpoint |
| №0907 docs/2026-10-09_ota_v74_00_17.md | 6180 B | документация или отчёт: 2026 10 09 ota v74 00 17 |
| №0908 docs/2026-10-11_ota_v74_00_57_checkpoint.json | 469 B | документация или отчёт: 2026 10 11 ota v74 00 57 checkpoint |
| №0909 docs/2026-10-11_ota_v74_00_57.md | 5873 B | документация или отчёт: 2026 10 11 ota v74 00 57 |
| №0910 docs/3D_ASSET_IMPORT_BATCHES.md | 32725 B | документация или отчёт: 3D ASSET IMPORT BATCHES |
| №0911 docs/3d_character_anatomy/ADULT_ANATOMY_PROGRESS.md | 43788 B | документация или отчёт: ADULT ANATOMY PROGRESS |
| №0912 docs/3d_character_anatomy/ASSET_AUDIT_2026-10-12.json | 22458 B | документация или отчёт: ASSET AUDIT 2026 10 12 |
| №0913 docs/3d_character_anatomy/SKIN_MATERIAL_PIPELINE.md | 7470 B | документация или отчёт: SKIN MATERIAL PIPELINE |
| №0914 docs/3d_character_journal/2026-10-09_01_morph_architecture.md | 2418 B | документация или отчёт: 2026 10 09 01 morph architecture |
| №0915 docs/3d_character_journal/2026-10-09_02_morph_bridge.md | 2712 B | документация или отчёт: 2026 10 09 02 morph bridge |
| №0916 docs/3d_character_journal/2026-10-09_03_morph_bridge_diagnostics.md | 1768 B | документация или отчёт: 2026 10 09 03 morph bridge diagnostics |
| №0917 docs/3d_character_journal/2026-10-09_04_skin_textures.md | 4995 B | документация или отчёт: 2026 10 09 04 skin textures |
| №0918 docs/3d_character_journal/2026-10-09_05_named_makehuman_morphs.md | 8679 B | документация или отчёт: 2026 10 09 05 named makehuman morphs |
| №0919 docs/3d_character_journal/2026-10-09_06_female_stage1_checkpoint.json | 5867 B | документация или отчёт: 2026 10 09 06 female stage1 checkpoint |
| №0920 docs/3d_character_journal/2026-10-09_06_female_stage1.md | 8415 B | документация или отчёт: 2026 10 09 06 female stage1 |
| №0921 docs/3d_character_journal/2026-10-09_07_female_stage2_checkpoint.json | 871 B | документация или отчёт: 2026 10 09 07 female stage2 checkpoint |
| №0922 docs/3d_character_journal/2026-10-09_07_female_stage2.md | 7677 B | документация или отчёт: 2026 10 09 07 female stage2 |
| №0923 docs/3d_character_journal/2026-10-09_08_female_release_checkpoint.json | 1725 B | документация или отчёт: 2026 10 09 08 female release checkpoint |
| №0924 docs/3d_character_journal/2026-10-09_08_female_release.md | 7794 B | документация или отчёт: 2026 10 09 08 female release |
| №0925 docs/3d_character_journal/2026-10-10_editor_v74_00_22.md | 6792 B | документация или отчёт: 2026 10 10 editor v74 00 22 |
| №0926 docs/3d_character_journal/2026-10-11_editor_v74_00_32.md | 1158 B | документация или отчёт: 2026 10 11 editor v74 00 32 |
| №0927 docs/3d_character_journal/2026-10-11_editor_v74_00_33.md | 1260 B | документация или отчёт: 2026 10 11 editor v74 00 33 |
| №0928 docs/3d_character_journal/2026-10-11_editor_v74_00_34.md | 3336 B | документация или отчёт: 2026 10 11 editor v74 00 34 |
| №0929 docs/3d_character_journal/2026-10-11_editor_v74_00_35.md | 3249 B | документация или отчёт: 2026 10 11 editor v74 00 35 |
| №0930 docs/3d_character_races/aarakocra.md | 4966 B | документация или отчёт: aarakocra |
| №0931 docs/3d_character_races/aasimar.md | 2398 B | документация или отчёт: aasimar |
| №0932 docs/3d_character_races/ANIMAL_HEADS.md | 5724 B | документация или отчёт: ANIMAL HEADS |
| №0933 docs/3d_character_races/autognome.md | 2759 B | документация или отчёт: autognome |
| №0934 docs/3d_character_races/AVIAN_ELEPHANT_HEADS.md | 5661 B | документация или отчёт: AVIAN ELEPHANT HEADS |
| №0935 docs/3d_character_races/bugbear.md | 4059 B | документация или отчёт: bugbear |
| №0936 docs/3d_character_races/centaur.md | 2896 B | документация или отчёт: centaur |
| №0937 docs/3d_character_races/changeling.md | 2162 B | документация или отчёт: changeling |
| №0938 docs/3d_character_races/dhampir.md | 1557 B | документация или отчёт: dhampir |
| №0939 docs/3d_character_races/dragonborn.md | 5010 B | документация или отчёт: dragonborn |
| №0940 docs/3d_character_races/dwarf_hill.md | 2179 B | документация или отчёт: dwarf hill |
| №0941 docs/3d_character_races/dwarf_mountain.md | 2179 B | документация или отчёт: dwarf mountain |
| №0942 docs/3d_character_races/elf_drow.md | 4152 B | документация или отчёт: elf drow |
| №0943 docs/3d_character_races/elf_high.md | 4150 B | документация или отчёт: elf high |
| №0944 docs/3d_character_races/elf_wood.md | 4135 B | документация или отчёт: elf wood |
| №0945 docs/3d_character_races/EXTRA_FORMS_PLAN.md | 5841 B | документация или отчёт: EXTRA FORMS PLAN |
| №0946 docs/3d_character_races/fairy.md | 2154 B | документация или отчёт: fairy |
| №0947 docs/3d_character_races/firbolg.md | 1211 B | документация или отчёт: firbolg |
| №0948 docs/3d_character_races/full_orc.md | 2994 B | документация или отчёт: full orc |
| №0949 docs/3d_character_races/FUR_PACK.md | 3742 B | документация или отчёт: FUR PACK |
| №0950 docs/3d_character_races/genasi_air.md | 1474 B | документация или отчёт: genasi air |
| №0951 docs/3d_character_races/genasi_earth.md | 1519 B | документация или отчёт: genasi earth |
| №0952 docs/3d_character_races/genasi_fire.md | 1527 B | документация или отчёт: genasi fire |
| №0953 docs/3d_character_races/genasi_water.md | 1464 B | документация или отчёт: genasi water |
| №0954 docs/3d_character_races/ghost.md | 5482 B | документация или отчёт: ghost |
| №0955 docs/3d_character_races/githyanki.md | 1321 B | документация или отчёт: githyanki |
| №0956 docs/3d_character_races/githzerai.md | 1321 B | документация или отчёт: githzerai |
| №0957 docs/3d_character_races/gnome_forest.md | 2175 B | документация или отчёт: gnome forest |
| №0958 docs/3d_character_races/gnome_rock.md | 2177 B | документация или отчёт: gnome rock |
| №0959 docs/3d_character_races/goblin.md | 1278 B | документация или отчёт: goblin |
| №0960 docs/3d_character_races/goliath.md | 1362 B | документация или отчёт: goliath |
| №0961 docs/3d_character_races/hadozee.md | 4245 B | документация или отчёт: hadozee |
| №0962 docs/3d_character_races/HAIR_PACK.md | 4833 B | документация или отчёт: HAIR PACK |
| №0963 docs/3d_character_races/half_elf.md | 4189 B | документация или отчёт: half elf |
| №0964 docs/3d_character_races/half_orc.md | 3002 B | документация или отчёт: half orc |
| №0965 docs/3d_character_races/halfling_lightfoot.md | 3486 B | документация или отчёт: halfling lightfoot |
| №0966 docs/3d_character_races/halfling_stout.md | 3482 B | документация или отчёт: halfling stout |
| №0967 docs/3d_character_races/harengon.md | 5657 B | документация или отчёт: harengon |
| №0968 docs/3d_character_races/hexblood.md | 1643 B | документация или отчёт: hexblood |
| №0969 docs/3d_character_races/hobgoblin.md | 1210 B | документация или отчёт: hobgoblin |
| №0970 docs/3d_character_races/kalashtar.md | 1410 B | документация или отчёт: kalashtar |
| №0971 docs/3d_character_races/kender.md | 1159 B | документация или отчёт: kender |
| №0972 docs/3d_character_races/kenku.md | 5013 B | документация или отчёт: kenku |
| №0973 docs/3d_character_races/kobold.md | 4696 B | документация или отчёт: kobold |
| №0974 docs/3d_character_races/lizardfolk.md | 4944 B | документация или отчёт: lizardfolk |
| №0975 docs/3d_character_races/loxodon.md | 4673 B | документация или отчёт: loxodon |
| №0976 docs/3d_character_races/minotaur.md | 6054 B | документация или отчёт: minotaur |
| №0977 docs/3d_character_races/myconid.md | 1846 B | документация или отчёт: myconid |
| №0978 docs/3d_character_races/NATIVE_LIMBS.md | 6433 B | документация или отчёт: NATIVE LIMBS |
| №0979 docs/3d_character_races/owlin.md | 5120 B | документация или отчёт: owlin |
| №0980 docs/3d_character_races/parasite.md | 3100 B | документация или отчёт: parasite |
| №0981 docs/3d_character_races/plasmoid.md | 1933 B | документация или отчёт: plasmoid |
| №0982 docs/3d_character_races/RACES_3D_REMAINING_AUDIT_2026-10-12.md | 35486 B | документация или отчёт: RACES 3D REMAINING AUDIT 2026 10 12 |
| №0983 docs/3d_character_races/reborn.md | 1619 B | документация или отчёт: reborn |
| №0984 docs/3d_character_races/REMAINING_WORK.md | 23848 B | документация или отчёт: REMAINING WORK |
| №0985 docs/3d_character_races/satyr.md | 5063 B | документация или отчёт: satyr |
| №0986 docs/3d_character_races/shifter.md | 3214 B | документация или отчёт: shifter |
| №0987 docs/3d_character_races/simic_hybrid.md | 2647 B | документация или отчёт: simic hybrid |
| №0988 docs/3d_character_races/swarm_bats.md | 1019 B | документация или отчёт: swarm bats |
| №0989 docs/3d_character_races/swarm_beetles.md | 6967 B | документация или отчёт: swarm beetles |
| №0990 docs/3d_character_races/SWARM_DENSE_REDESIGN.md | 9032 B | документация или отчёт: SWARM DENSE REDESIGN |
| №0991 docs/3d_character_races/swarm_rats.md | 6463 B | документация или отчёт: swarm rats |
| №0992 docs/3d_character_races/tabaxi.md | 6015 B | документация или отчёт: tabaxi |
| №0993 docs/3d_character_races/TEXTURE_PACK_CHECKPOINT.md | 17270 B | документация или отчёт: TEXTURE PACK CHECKPOINT |
| №0994 docs/3d_character_races/TIEFLING_DETAIL_REDESIGN.md | 7294 B | документация или отчёт: TIEFLING DETAIL REDESIGN |
| №0995 docs/3d_character_races/tiefling.md | 2992 B | документация или отчёт: tiefling |
| №0996 docs/3d_character_races/tortle.md | 5805 B | документация или отчёт: tortle |
| №0997 docs/3d_character_races/triton.md | 1588 B | документация или отчёт: triton |
| №0998 docs/3d_character_races/vedalken.md | 1301 B | документация или отчёт: vedalken |
| №0999 docs/3d_character_races/walter_parasite.md | 3278 B | документация или отчёт: walter parasite |
| №1000 docs/3d_character_races/warforged.md | 2731 B | документация или отчёт: warforged |
| №1001 docs/3d_character_races/yuan_ti.md | 1669 B | документация или отчёт: yuan ti |
| №1002 docs/AI_AUTOMATION.md | 4081 B | документация или отчёт: AI AUTOMATION |
| №1003 docs/CLASS_IMPLEMENTATION_PLAN.md | 19250 B | документация или отчёт: CLASS IMPLEMENTATION PLAN |
| №1004 docs/CLASS_MECHANICS_SPEC.md | 38943 B | документация или отчёт: CLASS MECHANICS SPEC |
| №1005 docs/CLOUD_CHARACTER_SYNC.md | 31142 B | документация или отчёт: CLOUD CHARACTER SYNC |
| №1006 docs/CLOUD_SAVE_CALLERS.txt | 1869 B | документация или отчёт: CLOUD SAVE CALLERS |
| №1007 docs/CONTENT_MANAGER_ARCHITECTURE.md | 2565 B | документация или отчёт: CONTENT MANAGER ARCHITECTURE |
| №1008 docs/content-catalog-v1.json | 661 B | документация или отчёт: content catalog v1 |
| №1009 docs/content-packages/demo-race.json | 299 B | документация или отчёт: demo race |
| №1010 docs/DND_VTT_CLASS_AUDIT_V74_00_17.md | 184356 B | документация или отчёт: DND VTT CLASS AUDIT V74 00 17 |
| №1011 docs/Help.txt | 110717 B | документация или отчёт: Help |
| №1012 docs/KIBBLES_ATTRIBUTION_V71.md | 803 B | документация или отчёт: KIBBLES ATTRIBUTION V71 |
| №1013 docs/map-stage-740019.md | 1675 B | документация или отчёт: map stage 740019 |
| №1014 docs/map-stage-740021.md | 2000 B | документация или отчёт: map stage 740021 |
| №1015 docs/modular-content/android-texture-imports.json | 3843 B | документация или отчёт: android texture imports |
| №1016 docs/modular-content/APPEARANCE_SOURCE_INVENTORY.json | 15440 B | документация или отчёт: APPEARANCE SOURCE INVENTORY |
| №1017 docs/modular-content/audit.json | 1754999 B | документация или отчёт: audit |
| №1018 docs/modular-content/catalog-entry-v1.schema.json | 2876 B | документация или отчёт: catalog entry v1.schema |
| №1019 docs/modular-content/commerce-transfer.json | 8608 B | документация или отчёт: commerce transfer |
| №1020 docs/modular-content/DEPENDENCIES.md | 8468 B | документация или отчёт: DEPENDENCIES |
| №1021 docs/modular-content/DEVICE_QA.md | 7947 B | документация или отчёт: DEVICE QA |
| №1022 docs/modular-content/EXTRACTION_STAGE2.md | 7041 B | документация или отчёт: EXTRACTION STAGE2 |
| №1023 docs/modular-content/final-apk-metrics.json | 1291 B | документация или отчёт: final apk metrics |
| №1024 docs/modular-content/hotfix-1.00.07-metrics.json | 1451 B | документация или отчёт: hotfix 1.00.07 metrics |
| №1025 docs/modular-content/LICENSE_REVIEW.md | 3704 B | документация или отчёт: LICENSE REVIEW |
| №1026 docs/modular-content/live-manager-texture-comparison.json | 436 B | документация или отчёт: live manager texture comparison |
| №1027 docs/modular-content/minimal-1.00.08-metrics.json | 1411 B | документация или отчёт: minimal 1.00.08 metrics |
| №1028 docs/modular-content/native-validation.json | 2495 B | документация или отчёт: native validation |
| №1029 docs/modular-content/old-apk-inspection.json | 1311 B | документация или отчёт: old apk inspection |
| №1030 docs/modular-content/old-apk-objects.json | 196276 B | документация или отчёт: old apk objects |
| №1031 docs/modular-content/optimized-1.00.09-metrics.json | 1495 B | документация или отчёт: optimized 1.00.09 metrics |
| №1032 docs/modular-content/png-container-audit.json | 362 B | документация или отчёт: png container audit |
| №1033 docs/modular-content/PROGRESS.md | 12878 B | документация или отчёт: PROGRESS |
| №1034 docs/modular-content/public-v2-verification.json | 61493 B | документация или отчёт: public v2 verification |
| №1035 docs/modular-content/public-verification.json | 1729 B | документация или отчёт: public verification |
| №1036 docs/modular-content/quaternius-public-verification.json | 399 B | документация или отчёт: quaternius public verification |
| №1037 docs/modular-content/quaternius-source-comparison.json | 47480 B | документация или отчёт: quaternius source comparison |
| №1038 docs/modular-content/REPORT.md | 25826 B | документация или отчёт: REPORT |
| №1039 docs/modular-content/RESUME_STYLE_FIX.md | 1990 B | документация или отчёт: RESUME STYLE FIX |
| №1040 docs/modular-content/resume-1.00.10-metrics.json | 1553 B | документация или отчёт: resume 1.00.10 metrics |
| №1041 docs/modular-content/RETAINED_APK_AUDIT.md | 3729 B | документация или отчёт: RETAINED APK AUDIT |
| №1042 docs/modular-content/retained-1.00.08-summary.json | 2936 B | документация или отчёт: retained 1.00.08 summary |
| №1043 docs/modular-content/retained-1.00.08-textures.json | 8726 B | документация или отчёт: retained 1.00.08 textures |
| №1044 docs/modular-content/retained-1.00.08-top-assets.json | 2133 B | документация или отчёт: retained 1.00.08 top assets |
| №1045 docs/modular-content/split-inventory.json | 33489 B | документация или отчёт: split inventory |
| №1046 docs/modular-content/UNITY-1.00.11-measured.json | 2382 B | документация или отчёт: UNITY 1.00.11 measured |
| №1047 docs/modular-content/UNITY-1.00.11.md | 7583 B | документация или отчёт: UNITY 1.00.11 |
| №1048 docs/MONETIZATION_ROADMAP.md | 15924 B | документация или отчёт: MONETIZATION ROADMAP |
| №1049 docs/NETWORK_APK_NOTES.md | 7296 B | документация или отчёт: NETWORK APK NOTES |
| №1050 docs/PREDICTOR_APPROVED_CARD_STATUS.md | 52542 B | документация или отчёт: PREDICTOR APPROVED CARD STATUS |
| №1051 docs/PREDICTOR_CLASS_SPEC.md | 94181 B | документация или отчёт: PREDICTOR CLASS SPEC |
| №1052 docs/PRODUCT_ACCESS_AND_MONETIZATION.md | 12539 B | документация или отчёт: PRODUCT ACCESS AND MONETIZATION |
| №1053 docs/roadmap/DUAL_MODE_MMO_MASTER_PLAN.md | 13895 B | документация или отчёт: DUAL MODE MMO MASTER PLAN |
| №1054 docs/roadmap/MMO_ARCHITECTURE_AND_CHARACTERS.md | 14850 B | документация или отчёт: MMO ARCHITECTURE AND CHARACTERS |
| №1055 docs/roadmap/MMO_CONTENT_STREAMING.md | 17382 B | документация или отчёт: MMO CONTENT STREAMING |
| №1056 docs/roadmap/MMO_TEAM_ECONOMY_AND_ROADMAP.md | 21663 B | документация или отчёт: MMO TEAM ECONOMY AND ROADMAP |
| №1057 docs/ROOT_FURNITURE_IMPORT_REPORT.md | 6882 B | документация или отчёт: ROOT FURNITURE IMPORT REPORT |
| №1058 docs/SIGNATURE_ASSET_FIX_74_00_66.md | 1729 B | документация или отчёт: SIGNATURE ASSET FIX 74 00 66 |
| №1059 docs/SUPABASE_MAIL_SETUP_PROMPT_RU.md | 2853 B | документация или отчёт: SUPABASE MAIL SETUP PROMPT RU |
| №1060 docs/UNIFIED_RELEASE.md | 6136 B | документация или отчёт: UNIFIED RELEASE |
| №1061 docs/UNITY_CHARACTER_SHEET_PARITY.md | 12064 B | документация или отчёт: UNITY CHARACTER SHEET PARITY |
| №1062 docs/UNITY_CLOUD_HANDOFF.md | 37179 B | документация или отчёт: UNITY CLOUD HANDOFF |
| №1063 docs/UNITY_MIGRATION_PLAN.md | 14710 B | документация или отчёт: UNITY MIGRATION PLAN |
| №1064 docs/unity-account/ACCESS_AND_TOUCH_1.00.12.md | 8253 B | документация или отчёт: ACCESS AND TOUCH 1.00.12 |
| №1065 docs/unity-account/ADMIN_CENTER_AND_PRIVATE_WORKSHOP.md | 9558 B | документация или отчёт: ADMIN CENTER AND PRIVATE WORKSHOP |
| №1066 docs/unity-account/ALL_MOD_COLLECTIONS_1.00.36.md | 6950 B | документация или отчёт: ALL MOD COLLECTIONS 1.00.36 |
| №1067 docs/unity-account/CHARACTER_PREVIEW_1.00.37.md | 12746 B | документация или отчёт: CHARACTER PREVIEW 1.00.37 |
| №1068 docs/unity-account/CHAT_NICKNAMES_1.00.21.md | 3028 B | документация или отчёт: CHAT NICKNAMES 1.00.21 |
| №1069 docs/unity-account/CHAT_ONE_HOUR.md | 2267 B | документация или отчёт: CHAT ONE HOUR |
| №1070 docs/unity-account/CHAT_WORKSHOP_1.00.22.md | 7852 B | документация или отчёт: CHAT WORKSHOP 1.00.22 |
| №1071 docs/unity-account/DICE_1.00.23.md | 5241 B | документация или отчёт: DICE 1.00.23 |
| №1072 docs/unity-account/DICE_CONTACT_1.00.31.md | 9409 B | документация или отчёт: DICE CONTACT 1.00.31 |
| №1073 docs/unity-account/DICE_CONTACT_1.00.32.md | 14224 B | документация или отчёт: DICE CONTACT 1.00.32 |
| №1074 docs/unity-account/DICE_DECAY_1.00.33.md | 4433 B | документация или отчёт: DICE DECAY 1.00.33 |
| №1075 docs/unity-account/DICE_DECAY_1.00.34.md | 9464 B | документация или отчёт: DICE DECAY 1.00.34 |
| №1076 docs/unity-account/DICE_MATERIALS_1.00.28.md | 3463 B | документация или отчёт: DICE MATERIALS 1.00.28 |
| №1077 docs/unity-account/DICE_SIX_1.00.29.md | 5386 B | документация или отчёт: DICE SIX 1.00.29 |
| №1078 docs/unity-account/DICE_SIX_1.00.30.md | 8993 B | документация или отчёт: DICE SIX 1.00.30 |
| №1079 docs/unity-account/DICE_THEMES_1.00.24.md | 6119 B | документация или отчёт: DICE THEMES 1.00.24 |
| №1080 docs/unity-account/dice-1.00.23-metrics.json | 1453 B | документация или отчёт: dice 1.00.23 metrics |
| №1081 docs/unity-account/dice-1.00.24-metrics.json | 2106 B | документация или отчёт: dice 1.00.24 metrics |
| №1082 docs/unity-account/dice-1.00.25-metrics.json | 2023 B | документация или отчёт: dice 1.00.25 metrics |
| №1083 docs/unity-account/dice-1.00.28-metrics.json | 1717 B | документация или отчёт: dice 1.00.28 metrics |
| №1084 docs/unity-account/dice-1.00.30-metrics.json | 2979 B | документация или отчёт: dice 1.00.30 metrics |
| №1085 docs/unity-account/dice-1.00.32-metrics.json | 2200 B | документация или отчёт: dice 1.00.32 metrics |
| №1086 docs/unity-account/IMPLEMENTATION_STATUS.md | 77740 B | документация или отчёт: IMPLEMENTATION STATUS |
| №1087 docs/unity-account/MODERATION_CENTER_RUNBOOK.md | 7893 B | документация или отчёт: MODERATION CENTER RUNBOOK |
| №1088 docs/unity-account/PC_UI_FIX_1.00.38.md | 9612 B | документация или отчёт: PC UI FIX 1.00.38 |
| №1089 docs/unity-account/SUPABASE_DEPLOYMENT_1.00.12.md | 3575 B | документация или отчёт: SUPABASE DEPLOYMENT 1.00.12 |
| №1090 docs/unity-account/WORKSHOP_COLLECTIONS_1.00.35.md | 5177 B | документация или отчёт: WORKSHOP COLLECTIONS 1.00.35 |
| №1091 docs/WINDOWS_DESKTOP.md | 3756 B | документация или отчёт: WINDOWS DESKTOP |
| №1092 dragon_fire_v2_sprite.png | 1013123 B | текстура/изображение: dragon fire v2 sprite |
| №1093 embers_v2_sprite.png | 698014 B | текстура/изображение: embers v2 sprite |
| №1094 FAQ.md | 38563 B | документация или отчёт: FAQ |
| №1095 fire_front_v2_sprite.png | 2249732 B | текстура/изображение: fire front v2 sprite |
| №1096 fire_spread_mask_v2_sprite.png | 1373284 B | текстура/изображение: fire spread mask v2 sprite |
| №1097 flash_v2_sprite.png | 803264 B | текстура/изображение: flash v2 sprite |
| №1098 floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1099 floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1100 floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1101 floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1102 floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1103 floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1104 floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1105 floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1106 floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1107 floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1108 floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1109 floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1110 floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1111 floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1112 floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1113 floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1114 floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1115 floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1116 GLENMORIL Soundtrack - Music Box.mp3 | 1827664 B | аудиофайл: GLENMORIL Soundtrack   Music Box |
| №1117 gltf_catalog.js | 3197 B | логический модуль: gltf catalog |
| №1118 heat_glow_v2_sprite.png | 836371 B | текстура/изображение: heat glow v2 sprite |
| №1119 human-base-rigged.glb | 4994640 B | 3D модель/геометрия: human base rigged |
| №1120 index.html | 89700 B | HTML-точка входа; интерфейс и порядок JS загрузки |
| №1121 Jalan Jalan - Lotus.mp3 | 9083034 B | аудиофайл: Jalan Jalan   Lotus |
| №1122 lineage_2_16. Shepard's Flute.mp3 | 2997816 B | аудиофайл: lineage 2 16. Shepard's Flute |
| №1123 manifest.json | 488 B | данные/конфигурация: manifest |
| №1124 MMORPG_FUTURE_PLAN.txt | 4115 B | документация или отчёт: MMORPG FUTURE PLAN |
| №1125 MODDING_START_HERE.md | 9518 B | документация или отчёт: MODDING START HERE |
| №1126 Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3 | 4020570 B | аудиофайл: Oliver DeRiviere   Prelude to an End (grizzlymusic.ru) |
| №1127 Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3 | 3530381 B | аудиофайл: Oliver Deriviere   Who Am I (grizzlymusic.ru) |
| №1128 package.json | 1608 B | npm и упаковка desktop EXE |
| №1129 PROJECT_ATLAS.md | генерируется | машиночитаемая карта репозитория для ИИ |
| №1130 PROJECT_ATLAS.txt | генерируется | человекочитаемая карта репозитория |
| №1131 README.md | 145 B | документация или отчёт: README |
| №1132 release-staging/unity-android-approval.json | 470 B | данные/конфигурация: unity android approval |
| №1133 release-staging/unity-paired-approval.json | 2305 B | данные/конфигурация: unity paired approval |
| №1134 release-staging/unity-release.json | 3914 B | данные/конфигурация: unity release |
| №1135 smoke_back_v2_sprite-1.png | 1707378 B | текстура/изображение: smoke back v2 sprite 1 |
| №1136 smoke_back_v2_sprite.png | 1814587 B | текстура/изображение: smoke back v2 sprite |
| №1137 smoke_front_v2_sprite-1.png | 1890480 B | текстура/изображение: smoke front v2 sprite 1 |
| №1138 smoke_front_v2_sprite.png | 2064687 B | текстура/изображение: smoke front v2 sprite |
| №1139 smoke_mid_v2_sprite.png | 1898516 B | текстура/изображение: smoke mid v2 sprite |
| №1140 supabase/bootstrap_owner.sql | 1092 B | вспомогательный файл: bootstrap owner |
| №1141 supabase/enable_chat_retention.sql | 473 B | вспомогательный файл: enable chat retention |
| №1142 supabase/enable_moderation_retention.sql | 861 B | вспомогательный файл: enable moderation retention |
| №1143 supabase/migrations/202610130001_characters.sql | 4421 B | SQL миграция Supabase |
| №1144 supabase/migrations/202610210001_access_control.sql | 8940 B | SQL миграция Supabase |
| №1145 supabase/migrations/202610210002_moderation_center.sql | 13546 B | SQL миграция Supabase |
| №1146 supabase/migrations/202610210003_direct_moderator_management.sql | 2765 B | SQL миграция Supabase |
| №1147 supabase/migrations/202610210004_authenticated_chat.sql | 3040 B | SQL миграция Supabase |
| №1148 supabase/migrations/202610220001_chat_nicknames.sql | 1258 B | SQL миграция Supabase |
| №1149 supabase/migrations/202610220002_chat_staff_badges.sql | 1397 B | SQL миграция Supabase |
| №1150 supabase/tests/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №1151 supabase/tests/access-control.mjs | 20963 B | вспомогательный файл: access control |
| №1152 supabase/tests/package-lock.json | 512 B | данные/конфигурация: package lock |
| №1153 supabase/tests/package.json | 165 B | данные/конфигурация: package |
| №1154 table.glb | 6217412 B | 3D модель/геометрия: table |
| №1155 tests/ai_automation_test.cjs | 1649 B | автотест: ai automation test |
| №1156 tests/ai_finalize_test.cjs | 3840 B | автотест: ai finalize test |
| №1157 tests/alchemist_combat_test.js | 19298 B | автотест: alchemist combat test |
| №1158 tests/alchemist_runtime_test.js | 41827 B | автотест: alchemist runtime test |
| №1159 tests/character_3d_editor_test.js | 14206 B | автотест: character 3d editor test |
| №1160 tests/character_3d_foundation_test.js | 15396 B | автотест: character 3d foundation test |
| №1161 tests/character_3d_morph_assets_test.js | 5179 B | автотест: character 3d morph assets test |
| №1162 tests/character_3d_skin_assets_test.js | 1827 B | автотест: character 3d skin assets test |
| №1163 tests/character_3d_skin_morph_test.js | 3032 B | автотест: character 3d skin morph test |
| №1164 tests/character_adult_anatomy_test.js | 4704 B | автотест: character adult anatomy test |
| №1165 tests/character_animal_heads_test.js | 4415 B | автотест: character animal heads test |
| №1166 tests/character_appearance_store_test.js | 2308 B | автотест: character appearance store test |
| №1167 tests/character_avian_elephant_heads_test.js | 5125 B | автотест: character avian elephant heads test |
| №1168 tests/character_clothing_customizer_geometry_test.js | 4676 B | автотест: character clothing customizer geometry test |
| №1169 tests/character_clothing_options_test.js | 1922 B | автотест: character clothing options test |
| №1170 tests/character_clothing_test.js | 7286 B | автотест: character clothing test |
| №1171 tests/character_editor_morph_assets_test.js | 4783 B | автотест: character editor morph assets test |
| №1172 tests/character_elf_details_test.js | 2787 B | автотест: character elf details test |
| №1173 tests/character_external_anatomy_test.js | 7930 B | автотест: character external anatomy test |
| №1174 tests/character_fur_test.js | 3520 B | автотест: character fur test |
| №1175 tests/character_ghost_geometry_test.js | 3867 B | автотест: character ghost geometry test |
| №1176 tests/character_hair_pack_test.js | 2838 B | автотест: character hair pack test |
| №1177 tests/character_head_geometry_test.js | 3575 B | автотест: character head geometry test |
| №1178 tests/character_male_anatomy_fix_test.js | 3902 B | автотест: character male anatomy fix test |
| №1179 tests/character_native_limbs_test.js | 4909 B | автотест: character native limbs test |
| №1180 tests/character_parasites_geometry_test.js | 3738 B | автотест: character parasites geometry test |
| №1181 tests/character_races_geometry_test.js | 19702 B | автотест: character races geometry test |
| №1182 tests/character_reptile_heads_test.js | 3734 B | автотест: character reptile heads test |
| №1183 tests/character_skin_material_test.js | 3816 B | автотест: character skin material test |
| №1184 tests/character_stat_modes_levelup_test.cjs | 4864 B | автотест: character stat modes levelup test |
| №1185 tests/character_swarm_geometry_test.js | 3505 B | автотест: character swarm geometry test |
| №1186 tests/character_tiefling_details_test.js | 4451 B | автотест: character tiefling details test |
| №1187 tests/cloud_rls_test.sql | 5342 B | автотест: cloud rls test |
| №1188 tests/cloud_sql_concurrency.cjs | 2072 B | автотест: cloud sql concurrency |
| №1189 tests/cloud_sync_test.cjs | 19921 B | автотест: cloud sync test |
| №1190 tests/crafting_disassembly_v51_test.js | 3052 B | автотест: crafting disassembly v51 test |
| №1191 tests/crafting_dlc_v50_test.js | 2668 B | автотест: crafting dlc v50 test |
| №1192 tests/crafting_economy_v49_test.js | 1974 B | автотест: crafting economy v49 test |
| №1193 tests/creation_signature_asset_test.cjs | 3935 B | автотест: creation signature asset test |
| №1194 tests/desktop_update_contract.cjs | 4025 B | автотест: desktop update contract |
| №1195 tests/fixtures/cloud_auth.sql | 711 B | автотест: cloud auth |
| №1196 tests/fixtures/female_anatomy_74_00_59.json | 251 B | автотест: female anatomy 74 00 59 |
| №1197 tests/generate_makehuman_glb_morph_fixture.js | 4454 B | автотест: generate makehuman glb morph fixture |
| №1198 tests/gltf_loader_smoke.cjs | 3734 B | автотест: gltf loader smoke |
| №1199 tests/helpers/class_runtime_harness.js | 2323 B | автотест: class runtime harness |
| №1200 tests/human_base_glb_audit.js | 2158 B | автотест: human base glb audit |
| №1201 tests/imported_3d_editor_assets.cjs | 2157 B | автотест: imported 3d editor assets |
| №1202 tests/makehuman_gender_fixture_audit.js | 4646 B | автотест: makehuman gender fixture audit |
| №1203 tests/makehuman_gender_recipe_test.js | 5498 B | автотест: makehuman gender recipe test |
| №1204 tests/makehuman_glb_morph_fixture_audit.js | 1703 B | автотест: makehuman glb morph fixture audit |
| №1205 tests/makehuman_morph_bridge.js | 9756 B | автотест: makehuman morph bridge |
| №1206 tests/makehuman_surface_mapping_audit.js | 9447 B | автотест: makehuman surface mapping audit |
| №1207 tests/makehuman_target_reverse_transfer_audit.js | 10959 B | автотест: makehuman target reverse transfer audit |
| №1208 tests/makehuman_target_surface_transfer_audit.js | 12260 B | автотест: makehuman target surface transfer audit |
| №1209 tests/makehuman_topology_audit.js | 5878 B | автотест: makehuman topology audit |
| №1210 tests/makehuman_uv_bridge_test.js | 1465 B | автотест: makehuman uv bridge test |
| №1211 tests/makehuman_vertex_mapping_audit.js | 7410 B | автотест: makehuman vertex mapping audit |
| №1212 tests/map_editor_dom_test.js | 3347 B | автотест: map editor dom test |
| №1213 tests/map_rebuild_world_test.js | 3815 B | автотест: map rebuild world test |
| №1214 tests/predictor_aura_ledger_test.cjs | 12810 B | автотест: predictor aura ledger test |
| №1215 tests/predictor_blind_test.cjs | 4972 B | автотест: predictor blind test |
| №1216 tests/predictor_cards_test.cjs | 10793 B | автотест: predictor cards test |
| №1217 tests/predictor_cloud_sync_test.cjs | 36354 B | автотест: predictor cloud sync test |
| №1218 tests/predictor_coin_ancestor_test.cjs | 6734 B | автотест: predictor coin ancestor test |
| №1219 tests/predictor_deck_ui_test.cjs | 29014 B | автотест: predictor deck ui test |
| №1220 tests/predictor_devil_plan_test.cjs | 4680 B | автотест: predictor devil plan test |
| №1221 tests/predictor_event_reactions_test.cjs | 7259 B | автотест: predictor event reactions test |
| №1222 tests/predictor_exhaustion_test.cjs | 4867 B | автотест: predictor exhaustion test |
| №1223 tests/predictor_healing_reaction_test.cjs | 5049 B | автотест: predictor healing reaction test |
| №1224 tests/predictor_inventory_rewards_test.cjs | 14111 B | автотест: predictor inventory rewards test |
| №1225 tests/predictor_last_stand_test.cjs | 12289 B | автотест: predictor last stand test |
| №1226 tests/predictor_mage_spells_test.cjs | 29988 B | автотест: predictor mage spells test |
| №1227 tests/predictor_motion_cards_test.cjs | 11690 B | автотест: predictor motion cards test |
| №1228 tests/predictor_movement_cards_test.cjs | 7196 B | автотест: predictor movement cards test |
| №1229 tests/predictor_progression_test.cjs | 3750 B | автотест: predictor progression test |
| №1230 tests/predictor_runtime_test.cjs | 10585 B | автотест: predictor runtime test |
| №1231 tests/predictor_seven_cups_test.cjs | 12727 B | автотест: predictor seven cups test |
| №1232 tests/predictor_status_cards_test.cjs | 13936 B | автотест: predictor status cards test |
| №1233 tests/predictor_tactics_cards_test.cjs | 11334 B | автотест: predictor tactics cards test |
| №1234 tests/predictor_trickster_test.cjs | 10554 B | автотест: predictor trickster test |
| №1235 tests/predictor_turn_effects_test.cjs | 13273 B | автотест: predictor turn effects test |
| №1236 tests/predictor_vision_control_test.cjs | 12922 B | автотест: predictor vision control test |
| №1237 tests/predictor_world_truth_search_test.cjs | 5654 B | автотест: predictor world truth search test |
| №1238 tests/pugilist_combat_test.js | 21085 B | автотест: pugilist combat test |
| №1239 tests/pugilist_runtime_test.js | 4834 B | автотест: pugilist runtime test |
| №1240 tests/stair_navigation.cjs | 2520 B | автотест: stair navigation |
| №1241 tests/test_blood_hunter_completion.js | 8673 B | автотест: test blood hunter completion |
| №1242 tests/test_blood_hunter_focus_network.js | 3203 B | автотест: test blood hunter focus network |
| №1243 tests/test_blood_hunter_orders.js | 9810 B | автотест: test blood hunter orders |
| №1244 tests/test_blood_hunter_patron_selection.js | 4699 B | автотест: test blood hunter patron selection |
| №1245 tests/test_blood_hunter_profane_focus.js | 6459 B | автотест: test blood hunter profane focus |
| №1246 tests/test_class_audit_runtime.js | 14611 B | автотест: test class audit runtime |
| №1247 tests/test_class_audit_stage2_runtime.js | 15372 B | автотест: test class audit stage2 runtime |
| №1248 tests/test_class_audit_stage3_runtime.js | 16610 B | автотест: test class audit stage3 runtime |
| №1249 tests/test_class_audit_stage4_runtime.js | 23853 B | автотест: test class audit stage4 runtime |
| №1250 tests/test_v52.js | 2202 B | автотест: test v52 |
| №1251 tests/test_v53.js | 2507 B | автотест: test v53 |
| №1252 tests/test_v54.js | 2148 B | автотест: test v54 |
| №1253 tests/test_v55_2.js | 4154 B | автотест: test v55 2 |
| №1254 tests/test_v55_3.js | 2635 B | автотест: test v55 3 |
| №1255 tests/test_v55.js | 2152 B | автотест: test v55 |
| №1256 tests/test_v56_1.js | 1667 B | автотест: test v56 1 |
| №1257 tests/test_v56_10.js | 2140 B | автотест: test v56 10 |
| №1258 tests/test_v56_11.js | 1791 B | автотест: test v56 11 |
| №1259 tests/test_v56_12.js | 1665 B | автотест: test v56 12 |
| №1260 tests/test_v56_13.js | 2465 B | автотест: test v56 13 |
| №1261 tests/test_v56_2.js | 1697 B | автотест: test v56 2 |
| №1262 tests/test_v56_3.js | 1363 B | автотест: test v56 3 |
| №1263 tests/test_v56_4.js | 1458 B | автотест: test v56 4 |
| №1264 tests/test_v56_5.js | 1745 B | автотест: test v56 5 |
| №1265 tests/test_v56_6.js | 1439 B | автотест: test v56 6 |
| №1266 tests/test_v56_8.js | 1516 B | автотест: test v56 8 |
| №1267 tests/test_v56_9.js | 1734 B | автотест: test v56 9 |
| №1268 tests/test_v56.js | 3572 B | автотест: test v56 |
| №1269 tests/test_v57.js | 2554 B | автотест: test v57 |
| №1270 tests/test_v58.js | 1847 B | автотест: test v58 |
| №1271 tests/test_v59.js | 878 B | автотест: test v59 |
| №1272 tests/test_v60.js | 860 B | автотест: test v60 |
| №1273 tests/test_v61.js | 961 B | автотест: test v61 |
| №1274 tests/test_v62.js | 800 B | автотест: test v62 |
| №1275 tests/test_v63.js | 364 B | автотест: test v63 |
| №1276 tests/test_v64.js | 312 B | автотест: test v64 |
| №1277 tests/test_v65.js | 335 B | автотест: test v65 |
| №1278 tests/test_v66.js | 373 B | автотест: test v66 |
| №1279 tests/test_v67.js | 628 B | автотест: test v67 |
| №1280 tests/test_v68.js | 984 B | автотест: test v68 |
| №1281 tests/test_v69.js | 1713 B | автотест: test v69 |
| №1282 tests/test_v70.js | 2112 B | автотест: test v70 |
| №1283 tests/test_v701.js | 2425 B | автотест: test v701 |
| №1284 tests/test_v702.js | 4409 B | автотест: test v702 |
| №1285 tests/test_v703.js | 2646 B | автотест: test v703 |
| №1286 tests/test_v704.js | 2402 B | автотест: test v704 |
| №1287 tests/test_v705.js | 2717 B | автотест: test v705 |
| №1288 tests/test_v706.js | 1414 B | автотест: test v706 |
| №1289 tests/test_v707.js | 1066 B | автотест: test v707 |
| №1290 tests/test_v708_fixes.js | 2968 B | автотест: test v708 fixes |
| №1291 tests/test_v709_fixes.js | 2128 B | автотест: test v709 fixes |
| №1292 tests/test_v710_fixes.js | 2223 B | автотест: test v710 fixes |
| №1293 tests/test_v711_fixes.js | 1037 B | автотест: test v711 fixes |
| №1294 tests/test_v712_fixes.js | 1675 B | автотест: test v712 fixes |
| №1295 tests/test_v713_fixes.js | 2127 B | автотест: test v713 fixes |
| №1296 tests/test_v714_fixes.js | 1727 B | автотест: test v714 fixes |
| №1297 tests/test_v715_fixes.js | 1817 B | автотест: test v715 fixes |
| №1298 tests/test_v716_fixes.js | 1980 B | автотест: test v716 fixes |
| №1299 tests/test_v717_fixes.js | 2657 B | автотест: test v717 fixes |
| №1300 tests/test_v718_fixes.js | 1001 B | автотест: test v718 fixes |
| №1301 tests/test_v719_fixes.js | 1156 B | автотест: test v719 fixes |
| №1302 tests/test_v720_fixes.js | 1621 B | автотест: test v720 fixes |
| №1303 tests/test_v721_fixes.js | 3536 B | автотест: test v721 fixes |
| №1304 tests/test_v722_fixes.js | 3509 B | автотест: test v722 fixes |
| №1305 tests/test_v723_fixes.js | 4780 B | автотест: test v723 fixes |
| №1306 tests/test_v724_fixes.js | 2330 B | автотест: test v724 fixes |
| №1307 tests/test_v725_fixes.js | 4026 B | автотест: test v725 fixes |
| №1308 tests/test_v726_fixes.js | 3809 B | автотест: test v726 fixes |
| №1309 tests/test_v727_fixes.js | 3061 B | автотест: test v727 fixes |
| №1310 tests/test_v728_fixes.js | 2641 B | автотест: test v728 fixes |
| №1311 tests/test_v729_fixes.js | 1372 B | автотест: test v729 fixes |
| №1312 tests/test_v730_fixes.js | 2190 B | автотест: test v730 fixes |
| №1313 tests/test_v731_fixes.js | 1649 B | автотест: test v731 fixes |
| №1314 tests/test_v732_fixes.js | 2794 B | автотест: test v732 fixes |
| №1315 tests/test_v733_logic_audit.js | 2286 B | автотест: test v733 logic audit |
| №1316 tests/test_v734_network_concentration.js | 1522 B | автотест: test v734 network concentration |
| №1317 tests/test_v735_logic_rules.js | 1885 B | автотест: test v735 logic rules |
| №1318 tests/test_v736_deep_rules.js | 4307 B | автотест: test v736 deep rules |
| №1319 tests/test_v737_spellcasting_transaction.js | 5283 B | автотест: test v737 spellcasting transaction |
| №1320 tests/test_v738_multiclass_spell_sources.js | 5402 B | автотест: test v738 multiclass spell sources |
| №1321 tests/test_v739_prepared_transaction.js | 4317 B | автотест: test v739 prepared transaction |
| №1322 tests/test_v740_concentration_lifecycle.js | 2114 B | автотест: test v740 concentration lifecycle |
| №1323 tests/test_v741_damage_pipeline.js | 2462 B | автотест: test v741 damage pipeline |
| №1324 tests/test_v742_character_combatant_sync.js | 3540 B | автотест: test v742 character combatant sync |
| №1325 tests/test_v743_authority_recharge_events.js | 2228 B | автотест: test v743 authority recharge events |
| №1326 tests/test_v744_sync_authority_save.js | 2516 B | автотест: test v744 sync authority save |
| №1327 tests/test_v745_host_handoff.js | 2112 B | автотест: test v745 host handoff |
| №1328 tests/test_v746_authoritative_save_recharge.js | 3032 B | автотест: test v746 authoritative save recharge |
| №1329 tests/test_v747_event_race_compaction.js | 3064 B | автотест: test v747 event race compaction |
| №1330 tests/test_v748_full_combat_transaction.js | 5181 B | автотест: test v748 full combat transaction |
| №1331 tests/test_v749_monster_authority_reaction_order.js | 2661 B | автотест: test v749 monster authority reaction order |
| №1332 tests/test_v750_resignal_reaction_monster_rpc.js | 1973 B | автотест: test v750 resignal reaction monster rpc |
| №1333 tests/test_v751_authoritative_replay_rollback.js | 1185 B | автотест: test v751 authoritative replay rollback |
| №1334 tests/test_v752_replay_hash_authority.js | 2033 B | автотест: test v752 replay hash authority |
| №1335 tests/test_v753_replay_transaction_rng.js | 1195 B | автотест: test v753 replay transaction rng |
| №1336 tests/test_v754_update_manager.js | 2816 B | автотест: test v754 update manager |
| №1337 tests/test_v755_creation_buckets.js | 3973 B | автотест: test v755 creation buckets |
| №1338 tests/test_v755_update_scene.js | 3625 B | автотест: test v755 update scene |
| №1339 tests/update_ota_flow_test.js | 9661 B | автотест: update ota flow test |
| №1340 tools/ai_automation.cjs | 2383 B | скрипт разработчика: ai automation |
| №1341 tools/ai_checks.cjs | 1068 B | скрипт разработчика: ai checks |
| №1342 tools/ai_finalize.cjs | 2199 B | скрипт разработчика: ai finalize |
| №1343 tools/audit_adult_body_assets.py | 5868 B | скрипт разработчика: audit adult body assets |
| №1344 tools/audit_modular_content.py | 5418 B | скрипт разработчика: audit modular content |
| №1345 tools/audit_retained_apk.py | 2920 B | скрипт разработчика: audit retained apk |
| №1346 tools/build_character_editor_morphs.js | 4493 B | скрипт разработчика: build character editor morphs |
| №1347 tools/build_cloud_tests.sh | 1945 B | скрипт разработчика: build cloud tests |
| №1348 tools/build_makehuman_morphs.js | 8803 B | скрипт разработчика: build makehuman morphs |
| №1349 tools/build_skin_microtexture.py | 1254 B | скрипт разработчика: build skin microtexture |
| №1350 tools/build_update_manifest.py | 3881 B | скрипт разработчика: build update manifest |
| №1351 tools/check_adult_anatomy_browser.js | 7862 B | скрипт разработчика: check adult anatomy browser |
| №1352 tools/check_adult_base_browser.js | 4732 B | скрипт разработчика: check adult base browser |
| №1353 tools/check_animal_heads_browser.js | 6045 B | скрипт разработчика: check animal heads browser |
| №1354 tools/check_avian_elephant_heads_browser.js | 6052 B | скрипт разработчика: check avian elephant heads browser |
| №1355 tools/check_avian_races_browser.js | 6195 B | скрипт разработчика: check avian races browser |
| №1356 tools/check_character_clothing_closeups.js | 3941 B | скрипт разработчика: check character clothing closeups |
| №1357 tools/check_character_clothing_customizer.js | 8611 B | скрипт разработчика: check character clothing customizer |
| №1358 tools/check_character_dress_customizer.js | 4892 B | скрипт разработчика: check character dress customizer |
| №1359 tools/check_character_editor_browser.js | 24473 B | скрипт разработчика: check character editor browser |
| №1360 tools/check_character_head_browser.js | 7169 B | скрипт разработчика: check character head browser |
| №1361 tools/check_character_races_browser.js | 14773 B | скрипт разработчика: check character races browser |
| №1362 tools/check_cloud_account_browser.cjs | 7054 B | скрипт разработчика: check cloud account browser |
| №1363 tools/check_dense_swarm_browser.js | 6299 B | скрипт разработчика: check dense swarm browser |
| №1364 tools/check_elf_details_browser.js | 5791 B | скрипт разработчика: check elf details browser |
| №1365 tools/check_external_anatomy_browser.js | 9967 B | скрипт разработчика: check external anatomy browser |
| №1366 tools/check_feather_surface_browser.js | 8888 B | скрипт разработчика: check feather surface browser |
| №1367 tools/check_fur_browser.js | 6062 B | скрипт разработчика: check fur browser |
| №1368 tools/check_fur_surface_browser.js | 8973 B | скрипт разработчика: check fur surface browser |
| №1369 tools/check_ghost_browser.js | 8977 B | скрипт разработчика: check ghost browser |
| №1370 tools/check_hair_pack_browser.js | 5826 B | скрипт разработчика: check hair pack browser |
| №1371 tools/check_kobold_tabaxi_browser.js | 6240 B | скрипт разработчика: check kobold tabaxi browser |
| №1372 tools/check_last_races_browser.js | 7457 B | скрипт разработчика: check last races browser |
| №1373 tools/check_male_anatomy_browser.js | 6082 B | скрипт разработчика: check male anatomy browser |
| №1374 tools/check_map_browser.js | 3805 B | скрипт разработчика: check map browser |
| №1375 tools/check_mechanical_races_browser.js | 6158 B | скрипт разработчика: check mechanical races browser |
| №1376 tools/check_modular_races_browser.js | 5826 B | скрипт разработчика: check modular races browser |
| №1377 tools/check_native_limbs_browser.js | 7153 B | скрипт разработчика: check native limbs browser |
| №1378 tools/check_parasites_browser.js | 6584 B | скрипт разработчика: check parasites browser |
| №1379 tools/check_pose_browser.js | 7090 B | скрипт разработчика: check pose browser |
| №1380 tools/check_quartet_races_browser.js | 6706 B | скрипт разработчика: check quartet races browser |
| №1381 tools/check_reptile_heads_browser.js | 5336 B | скрипт разработчика: check reptile heads browser |
| №1382 tools/check_reptile_races_browser.js | 5781 B | скрипт разработчика: check reptile races browser |
| №1383 tools/check_reptile_surface_browser.js | 7114 B | скрипт разработчика: check reptile surface browser |
| №1384 tools/check_skin_material_browser.js | 11016 B | скрипт разработчика: check skin material browser |
| №1385 tools/check_small_armor_browser.js | 3698 B | скрипт разработчика: check small armor browser |
| №1386 tools/check_swarm_browser.js | 7847 B | скрипт разработчика: check swarm browser |
| №1387 tools/check_tiefling_browser.js | 7273 B | скрипт разработчика: check tiefling browser |
| №1388 tools/check_tiefling_details_browser.js | 6694 B | скрипт разработчика: check tiefling details browser |
| №1389 tools/cloud_test.init.gradle | 781 B | скрипт разработчика: cloud test.init |
| №1390 tools/convert_remaining_furniture.py | 4297 B | скрипт разработчика: convert remaining furniture |
| №1391 tools/finalize_v741.py | 3280 B | скрипт разработчика: finalize v741 |
| №1392 tools/generate_project_atlas.cjs | 12690 B | автоматический генератор этого атласа |
| №1393 tools/inspect_unity_apk.py | 3390 B | скрипт разработчика: inspect unity apk |
| №1394 tools/install_native_build_tools.sh | 2975 B | скрипт разработчика: install native build tools |
| №1395 tools/makehuman_gender_channels.json | 4749 B | скрипт разработчика: makehuman gender channels |
| №1396 tools/makehuman_morph_channels.json | 448 B | скрипт разработчика: makehuman morph channels |
| №1397 tools/prepare_makehuman_gender.js | 5599 B | скрипт разработчика: prepare makehuman gender |
| №1398 tools/run_tests_v731.js | 5062 B | скрипт разработчика: run tests v731 |
| №1399 tools/sync_manifest.py | 2034 B | скрипт разработчика: sync manifest |
| №1400 tools/test_cloud_sql.sh | 1088 B | скрипт разработчика: test cloud sql |
| №1401 tools/unified_version.py | 3403 B | скрипт разработчика: unified version |
| №1402 unity/.gitattributes | 451 B | вспомогательный файл: .gitattributes |
| №1403 unity/.gitignore | 454 B | вспомогательный файл: .gitignore |
| №1404 unity/ANDROID_UPDATES.md | 3652 B | документация или отчёт: ANDROID UPDATES |
| №1405 unity/Assets/DefaultVolumeProfile.asset | 20474 B | вспомогательный файл: DefaultVolumeProfile |
| №1406 unity/Assets/DefaultVolumeProfile.asset.meta | 189 B | вспомогательный файл: DefaultVolumeProfile.asset |
| №1407 unity/Assets/LegacyContent.meta | 172 B | вспомогательный файл: LegacyContent |
| №1408 unity/Assets/LegacyContent/Catalog.asset | 9068 B | вспомогательный файл: Catalog |
| №1409 unity/Assets/LegacyContent/Catalog.asset.meta | 189 B | вспомогательный файл: Catalog.asset |
| №1410 unity/Assets/LegacyContent/geometry-contract.json | 2446 B | данные/конфигурация: geometry contract |
| №1411 unity/Assets/LegacyContent/geometry-contract.json.meta | 158 B | вспомогательный файл: geometry contract.json |
| №1412 unity/Assets/LegacyContent/Materials.meta | 172 B | вспомогательный файл: Materials |
| №1413 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat | 3851 B | вспомогательный файл: floor ceramic tile dark |
| №1414 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat.meta | 188 B | вспомогательный файл: floor ceramic tile dark.mat |
| №1415 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat | 3852 B | вспомогательный файл: floor ceramic tile light |
| №1416 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat.meta | 188 B | вспомогательный файл: floor ceramic tile light.mat |
| №1417 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat | 3846 B | вспомогательный файл: floor checker tile |
| №1418 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat.meta | 188 B | вспомогательный файл: floor checker tile.mat |
| №1419 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat | 3845 B | вспомогательный файл: floor cobblestone |
| №1420 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat.meta | 188 B | вспомогательный файл: floor cobblestone.mat |
| №1421 unity/Assets/LegacyContent/Materials/floor_earth.mat | 3838 B | вспомогательный файл: floor earth |
| №1422 unity/Assets/LegacyContent/Materials/floor_earth.mat.meta | 188 B | вспомогательный файл: floor earth.mat |
| №1423 unity/Assets/LegacyContent/Materials/floor_grass.mat | 3839 B | вспомогательный файл: floor grass |
| №1424 unity/Assets/LegacyContent/Materials/floor_grass.mat.meta | 188 B | вспомогательный файл: floor grass.mat |
| №1425 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat | 3841 B | вспомогательный файл: floor hex tile |
| №1426 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat.meta | 188 B | вспомогательный файл: floor hex tile.mat |
| №1427 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat | 3844 B | вспомогательный файл: floor marble dark |
| №1428 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat.meta | 188 B | вспомогательный файл: floor marble dark.mat |
| №1429 unity/Assets/LegacyContent/Materials/floor_marble_light.mat | 3846 B | вспомогательный файл: floor marble light |
| №1430 unity/Assets/LegacyContent/Materials/floor_marble_light.mat.meta | 188 B | вспомогательный файл: floor marble light.mat |
| №1431 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat | 3852 B | вспомогательный файл: floor parquet herringbone |
| №1432 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat.meta | 188 B | вспомогательный файл: floor parquet herringbone.mat |
| №1433 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat | 3841 B | вспомогательный файл: floor rug blue |
| №1434 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat.meta | 188 B | вспомогательный файл: floor rug blue.mat |
| №1435 unity/Assets/LegacyContent/Materials/floor_rug_green.mat | 3842 B | вспомогательный файл: floor rug green |
| №1436 unity/Assets/LegacyContent/Materials/floor_rug_green.mat.meta | 188 B | вспомогательный файл: floor rug green.mat |
| №1437 unity/Assets/LegacyContent/Materials/floor_rug_red.mat | 3840 B | вспомогательный файл: floor rug red |
| №1438 unity/Assets/LegacyContent/Materials/floor_rug_red.mat.meta | 188 B | вспомогательный файл: floor rug red.mat |
| №1439 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat | 3848 B | вспомогательный файл: floor stone tile dark |
| №1440 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat.meta | 188 B | вспомогательный файл: floor stone tile dark.mat |
| №1441 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat | 3849 B | вспомогательный файл: floor stone tile light |
| №1442 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat.meta | 188 B | вспомогательный файл: floor stone tile light.mat |
| №1443 unity/Assets/LegacyContent/Materials/floor_tatami.mat | 3840 B | вспомогательный файл: floor tatami |
| №1444 unity/Assets/LegacyContent/Materials/floor_tatami.mat.meta | 188 B | вспомогательный файл: floor tatami.mat |
| №1445 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat | 3842 B | вспомогательный файл: floor wood dark |
| №1446 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat.meta | 188 B | вспомогательный файл: floor wood dark.mat |
| №1447 unity/Assets/LegacyContent/Materials/floor_wood_light.mat | 3842 B | вспомогательный файл: floor wood light |
| №1448 unity/Assets/LegacyContent/Materials/floor_wood_light.mat.meta | 188 B | вспомогательный файл: floor wood light.mat |
| №1449 unity/Assets/LegacyContent/Materials/wall_brick_red.mat | 3842 B | вспомогательный файл: wall brick red |
| №1450 unity/Assets/LegacyContent/Materials/wall_brick_red.mat.meta | 188 B | вспомогательный файл: wall brick red.mat |
| №1451 unity/Assets/LegacyContent/Materials/wall_concrete.mat | 3841 B | вспомогательный файл: wall concrete |
| №1452 unity/Assets/LegacyContent/Materials/wall_concrete.mat.meta | 188 B | вспомогательный файл: wall concrete.mat |
| №1453 unity/Assets/LegacyContent/Materials/wall_half_timber.mat | 3844 B | вспомогательный файл: wall half timber |
| №1454 unity/Assets/LegacyContent/Materials/wall_half_timber.mat.meta | 188 B | вспомогательный файл: wall half timber.mat |
| №1455 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat | 3843 B | вспомогательный файл: wall marble dark |
| №1456 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat.meta | 188 B | вспомогательный файл: wall marble dark.mat |
| №1457 unity/Assets/LegacyContent/Materials/wall_marble_light.mat | 3845 B | вспомогательный файл: wall marble light |
| №1458 unity/Assets/LegacyContent/Materials/wall_marble_light.mat.meta | 188 B | вспомогательный файл: wall marble light.mat |
| №1459 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat | 3843 B | вспомогательный файл: wall moss stone |
| №1460 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat.meta | 188 B | вспомогательный файл: wall moss stone.mat |
| №1461 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat | 3843 B | вспомогательный файл: wall old plaster |
| №1462 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat.meta | 188 B | вспомогательный файл: wall old plaster.mat |
| №1463 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat | 3844 B | вспомогательный файл: wall plaster dark |
| №1464 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat.meta | 188 B | вспомогательный файл: wall plaster dark.mat |
| №1465 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat | 3846 B | вспомогательный файл: wall plaster light |
| №1466 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat.meta | 188 B | вспомогательный файл: wall plaster light.mat |
| №1467 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat | 3846 B | вспомогательный файл: wall plaster panel |
| №1468 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat.meta | 188 B | вспомогательный файл: wall plaster panel.mat |
| №1469 unity/Assets/LegacyContent/Materials/wall_slate.mat | 3837 B | вспомогательный файл: wall slate |
| №1470 unity/Assets/LegacyContent/Materials/wall_slate.mat.meta | 188 B | вспомогательный файл: wall slate.mat |
| №1471 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat | 3842 B | вспомогательный файл: wall stone dark |
| №1472 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat.meta | 188 B | вспомогательный файл: wall stone dark.mat |
| №1473 unity/Assets/LegacyContent/Materials/wall_stone_light.mat | 3843 B | вспомогательный файл: wall stone light |
| №1474 unity/Assets/LegacyContent/Materials/wall_stone_light.mat.meta | 188 B | вспомогательный файл: wall stone light.mat |
| №1475 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat | 3845 B | вспомогательный файл: wall stone masonry |
| №1476 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat.meta | 188 B | вспомогательный файл: wall stone masonry.mat |
| №1477 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat | 3841 B | вспомогательный файл: wall wallpaper |
| №1478 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat.meta | 188 B | вспомогательный файл: wall wallpaper.mat |
| №1479 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat | 3845 B | вспомогательный файл: wall white plaster |
| №1480 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat.meta | 188 B | вспомогательный файл: wall white plaster.mat |
| №1481 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat | 3841 B | вспомогательный файл: wall wood dark |
| №1482 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat.meta | 188 B | вспомогательный файл: wall wood dark.mat |
| №1483 unity/Assets/LegacyContent/Materials/wall_wood_light.mat | 3843 B | вспомогательный файл: wall wood light |
| №1484 unity/Assets/LegacyContent/Materials/wall_wood_light.mat.meta | 188 B | вспомогательный файл: wall wood light.mat |
| №1485 unity/Assets/LegacyContent/provenance.json | 28556 B | данные/конфигурация: provenance |
| №1486 unity/Assets/LegacyContent/provenance.json.meta | 158 B | вспомогательный файл: provenance.json |
| №1487 unity/Assets/LegacyContent/Source.meta | 172 B | вспомогательный файл: Source |
| №1488 unity/Assets/LegacyContent/Source/app.meta | 172 B | вспомогательный файл: app |
| №1489 unity/Assets/LegacyContent/Source/app/assets.meta | 172 B | вспомогательный файл: assets |
| №1490 unity/Assets/LegacyContent/Source/app/assets/3d.meta | 172 B | вспомогательный файл: 3d |
| №1491 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius.meta | 172 B | вспомогательный файл: quaternius |
| №1492 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models.meta | 172 B | вспомогательный файл: models |
| №1493 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin | 27188 B | 3D модель/геометрия: Bag |
| №1494 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin.meta | 155 B | вспомогательный файл: Bag.bin |
| №1495 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf | 4614 B | 3D модель/геометрия: Bag |
| №1496 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf.meta | 2193 B | вспомогательный файл: Bag.gltf |
| №1497 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | 3D модель/геометрия: Barrel Apples |
| №1498 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin.meta | 155 B | вспомогательный файл: Barrel Apples.bin |
| №1499 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6660 B | 3D модель/геометрия: Barrel Apples |
| №1500 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf.meta | 2849 B | вспомогательный файл: Barrel Apples.gltf |
| №1501 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin | 57144 B | 3D модель/геометрия: Barrel |
| №1502 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin.meta | 155 B | вспомогательный файл: Barrel.bin |
| №1503 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf | 4607 B | 3D модель/геометрия: Barrel |
| №1504 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf.meta | 2199 B | вспомогательный файл: Barrel.gltf |
| №1505 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | 3D модель/геометрия: Bed Twin1 |
| №1506 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin.meta | 155 B | вспомогательный файл: Bed Twin1.bin |
| №1507 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6636 B | 3D модель/геометрия: Bed Twin1 |
| №1508 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf.meta | 2841 B | вспомогательный файл: Bed Twin1.gltf |
| №1509 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin | 19304 B | 3D модель/геометрия: Bench |
| №1510 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin.meta | 155 B | вспомогательный файл: Bench.bin |
| №1511 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf | 4594 B | 3D модель/геометрия: Bench |
| №1512 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf.meta | 2197 B | вспомогательный файл: Bench.gltf |
| №1513 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | 3D модель/геометрия: Book Stack 2 |
| №1514 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin.meta | 155 B | вспомогательный файл: Book Stack 2.bin |
| №1515 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4605 B | 3D модель/геометрия: Book Stack 2 |
| №1516 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf.meta | 2187 B | вспомогательный файл: Book Stack 2.gltf |
| №1517 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | 3D модель/геометрия: Bookcase 2 |
| №1518 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin.meta | 155 B | вспомогательный файл: Bookcase 2.bin |
| №1519 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf | 4625 B | 3D модель/геометрия: Bookcase 2 |
| №1520 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf.meta | 2207 B | вспомогательный файл: Bookcase 2.gltf |
| №1521 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | 3D модель/геометрия: Bottle 1 |
| №1522 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin.meta | 155 B | вспомогательный файл: Bottle 1.bin |
| №1523 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf | 2586 B | 3D модель/геометрия: Bottle 1 |
| №1524 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf.meta | 1543 B | вспомогательный файл: Bottle 1.gltf |
| №1525 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | 3D модель/геометрия: Candle 2 |
| №1526 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin.meta | 155 B | вспомогательный файл: Candle 2.bin |
| №1527 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf | 2350 B | 3D модель/геометрия: Candle 2 |
| №1528 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf.meta | 1543 B | вспомогательный файл: Candle 2.gltf |
| №1529 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | 3D модель/геометрия: CandleStick Triple |
| №1530 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin.meta | 155 B | вспомогательный файл: CandleStick Triple.bin |
| №1531 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 4168 B | 3D модель/геометрия: CandleStick Triple |
| №1532 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf.meta | 2199 B | вспомогательный файл: CandleStick Triple.gltf |
| №1533 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | 3D модель/геометрия: Chair 1 |
| №1534 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin.meta | 155 B | вспомогательный файл: Chair 1.bin |
| №1535 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf | 4608 B | 3D модель/геометрия: Chair 1 |
| №1536 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf.meta | 2201 B | вспомогательный файл: Chair 1.gltf |
| №1537 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin | 15644 B | 3D модель/геометрия: Chalice |
| №1538 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin.meta | 155 B | вспомогательный файл: Chalice.bin |
| №1539 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf | 2356 B | 3D модель/геометрия: Chalice |
| №1540 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf.meta | 1541 B | вспомогательный файл: Chalice.gltf |
| №1541 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | 3D модель/геометрия: Chandelier |
| №1542 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin.meta | 155 B | вспомогательный файл: Chandelier.bin |
| №1543 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf | 6678 B | 3D модель/геометрия: Chandelier |
| №1544 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf.meta | 2843 B | вспомогательный файл: Chandelier.gltf |
| №1545 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | 3D модель/геометрия: Chest Wood |
| №1546 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin.meta | 155 B | вспомогательный файл: Chest Wood.bin |
| №1547 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf | 18141 B | 3D модель/геометрия: Chest Wood |
| №1548 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes | 22924 B | вспомогательный файл: Chest Wood.gltf |
| №1549 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes.meta | 158 B | вспомогательный файл: Chest Wood.gltf.bytes |
| №1550 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.meta | 720 B | вспомогательный файл: Chest Wood.gltf |
| №1551 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin | 14464 B | 3D модель/геометрия: Coin |
| №1552 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin.meta | 155 B | вспомогательный файл: Coin.bin |
| №1553 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf | 2581 B | 3D модель/геометрия: Coin |
| №1554 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf.meta | 1535 B | вспомогательный файл: Coin.gltf |
| №1555 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin | 12488 B | 3D модель/геометрия: Mug |
| №1556 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin.meta | 155 B | вспомогательный файл: Mug.bin |
| №1557 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf | 4149 B | 3D модель/геометрия: Mug |
| №1558 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf.meta | 2193 B | вспомогательный файл: Mug.gltf |
| №1559 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | 3D модель/геометрия: Pouch Large |
| №1560 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin.meta | 155 B | вспомогательный файл: Pouch Large.bin |
| №1561 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf | 4602 B | 3D модель/геометрия: Pouch Large |
| №1562 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf.meta | 2185 B | вспомогательный файл: Pouch Large.gltf |
| №1563 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | 3D модель/геометрия: Rope 1 |
| №1564 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin.meta | 155 B | вспомогательный файл: Rope 1.bin |
| №1565 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf | 2382 B | 3D модель/геометрия: Rope 1 |
| №1566 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf.meta | 1563 B | вспомогательный файл: Rope 1.gltf |
| №1567 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | 3D модель/геометрия: Shelf Simple |
| №1568 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin.meta | 155 B | вспомогательный файл: Shelf Simple.bin |
| №1569 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2383 B | 3D модель/геометрия: Shelf Simple |
| №1570 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf.meta | 1575 B | вспомогательный файл: Shelf Simple.gltf |
| №1571 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin | 11472 B | 3D модель/геометрия: Stool |
| №1572 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin.meta | 155 B | вспомогательный файл: Stool.bin |
| №1573 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf | 2596 B | 3D модель/геометрия: Stool |
| №1574 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf.meta | 1561 B | вспомогательный файл: Stool.gltf |
| №1575 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png | 1936754 B | текстура/изображение: T Trim Cloth BaseColor |
| №1576 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Cloth BaseColor.png |
| №1577 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png | 3920858 B | текстура/изображение: T Trim Cloth Normal |
| №1578 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Cloth Normal.png |
| №1579 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png | 623426 B | текстура/изображение: T Trim Cloth ORM |
| №1580 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Cloth ORM.png |
| №1581 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png | 2232961 B | текстура/изображение: T Trim Furniture BaseColor |
| №1582 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Furniture BaseColor.png |
| №1583 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png | 3485710 B | текстура/изображение: T Trim Furniture Normal |
| №1584 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Furniture Normal.png |
| №1585 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png | 2064585 B | текстура/изображение: T Trim Furniture ORM |
| №1586 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Furniture ORM.png |
| №1587 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png | 1361221 B | текстура/изображение: T Trim Metal BaseColor |
| №1588 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Metal BaseColor.png |
| №1589 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png | 3625541 B | текстура/изображение: T Trim Metal Normal |
| №1590 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Metal Normal.png |
| №1591 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png | 1871475 B | текстура/изображение: T Trim Metal ORM |
| №1592 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Metal ORM.png |
| №1593 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png | 2263132 B | текстура/изображение: T Trim Props BaseColor |
| №1594 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Props BaseColor.png |
| №1595 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png | 4441458 B | текстура/изображение: T Trim Props Normal |
| №1596 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Props Normal.png |
| №1597 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png | 3017151 B | текстура/изображение: T Trim Props ORM |
| №1598 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Props ORM.png |
| №1599 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | 3D модель/геометрия: Table Fork |
| №1600 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin.meta | 155 B | вспомогательный файл: Table Fork.bin |
| №1601 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf | 2348 B | 3D модель/геометрия: Table Fork |
| №1602 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf.meta | 1547 B | вспомогательный файл: Table Fork.gltf |
| №1603 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | 3D модель/геометрия: Table Knife |
| №1604 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin.meta | 155 B | вспомогательный файл: Table Knife.bin |
| №1605 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf | 2345 B | 3D модель/геометрия: Table Knife |
| №1606 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf.meta | 1549 B | вспомогательный файл: Table Knife.gltf |
| №1607 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | 3D модель/геометрия: Table Large |
| №1608 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin.meta | 155 B | вспомогательный файл: Table Large.bin |
| №1609 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf | 4612 B | 3D модель/геометрия: Table Large |
| №1610 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf.meta | 2209 B | вспомогательный файл: Table Large.gltf |
| №1611 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | 3D модель/геометрия: Table Plate |
| №1612 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin.meta | 155 B | вспомогательный файл: Table Plate.bin |
| №1613 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf | 2358 B | 3D модель/геометрия: Table Plate |
| №1614 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf.meta | 1549 B | вспомогательный файл: Table Plate.gltf |
| №1615 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | 3D модель/геометрия: Table Spoon |
| №1616 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin.meta | 155 B | вспомогательный файл: Table Spoon.bin |
| №1617 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf | 2350 B | 3D модель/геометрия: Table Spoon |
| №1618 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf.meta | 1549 B | вспомогательный файл: Table Spoon.gltf |
| №1619 unity/Assets/LegacyContent/Source/app/data.meta | 172 B | вспомогательный файл: data |
| №1620 unity/Assets/LegacyContent/Source/app/data/maps.meta | 172 B | вспомогательный файл: maps |
| №1621 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №1622 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json.meta | 158 B | вспомогательный файл: 3d castle black rose v740030.json |
| №1623 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №1624 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json.meta | 158 B | вспомогательный файл: 3d castle v740019.json |
| №1625 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №1626 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json.meta | 158 B | вспомогательный файл: 3d house v740019.json |
| №1627 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json | 170566 B | данные/конфигурация: 3d stress test all |
| №1628 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json.meta | 158 B | вспомогательный файл: 3d stress test all.json |
| №1629 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №1630 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json.meta | 158 B | вспомогательный файл: 3d stress v740026.json |
| №1631 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №1632 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json.meta | 158 B | вспомогательный файл: 3d tavern v740019.json |
| №1633 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №1634 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json.meta | 158 B | вспомогательный файл: 3d test dungeon.json |
| №1635 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №1636 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json.meta | 158 B | вспомогательный файл: 3d town v740019.json |
| №1637 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №1638 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json.meta | 158 B | вспомогательный файл: 3d village v740019.json |
| №1639 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1640 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png.meta | 3009 B | вспомогательный файл: floor ceramic tile dark.png |
| №1641 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1642 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png.meta | 3009 B | вспомогательный файл: floor ceramic tile light.png |
| №1643 unity/Assets/LegacyContent/Source/floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1644 unity/Assets/LegacyContent/Source/floor_checker_tile.png.meta | 3009 B | вспомогательный файл: floor checker tile.png |
| №1645 unity/Assets/LegacyContent/Source/floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1646 unity/Assets/LegacyContent/Source/floor_cobblestone.png.meta | 3009 B | вспомогательный файл: floor cobblestone.png |
| №1647 unity/Assets/LegacyContent/Source/floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1648 unity/Assets/LegacyContent/Source/floor_earth.png.meta | 3009 B | вспомогательный файл: floor earth.png |
| №1649 unity/Assets/LegacyContent/Source/floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1650 unity/Assets/LegacyContent/Source/floor_grass.png.meta | 3009 B | вспомогательный файл: floor grass.png |
| №1651 unity/Assets/LegacyContent/Source/floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1652 unity/Assets/LegacyContent/Source/floor_hex_tile.png.meta | 3009 B | вспомогательный файл: floor hex tile.png |
| №1653 unity/Assets/LegacyContent/Source/floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1654 unity/Assets/LegacyContent/Source/floor_marble_dark.png.meta | 3009 B | вспомогательный файл: floor marble dark.png |
| №1655 unity/Assets/LegacyContent/Source/floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1656 unity/Assets/LegacyContent/Source/floor_marble_light.png.meta | 3009 B | вспомогательный файл: floor marble light.png |
| №1657 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1658 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png.meta | 3009 B | вспомогательный файл: floor parquet herringbone.png |
| №1659 unity/Assets/LegacyContent/Source/floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1660 unity/Assets/LegacyContent/Source/floor_rug_blue.png.meta | 3009 B | вспомогательный файл: floor rug blue.png |
| №1661 unity/Assets/LegacyContent/Source/floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1662 unity/Assets/LegacyContent/Source/floor_rug_green.png.meta | 3009 B | вспомогательный файл: floor rug green.png |
| №1663 unity/Assets/LegacyContent/Source/floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1664 unity/Assets/LegacyContent/Source/floor_rug_red.png.meta | 3009 B | вспомогательный файл: floor rug red.png |
| №1665 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1666 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png.meta | 3009 B | вспомогательный файл: floor stone tile dark.png |
| №1667 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1668 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png.meta | 3009 B | вспомогательный файл: floor stone tile light.png |
| №1669 unity/Assets/LegacyContent/Source/floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1670 unity/Assets/LegacyContent/Source/floor_tatami.png.meta | 3009 B | вспомогательный файл: floor tatami.png |
| №1671 unity/Assets/LegacyContent/Source/floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1672 unity/Assets/LegacyContent/Source/floor_wood_dark.png.meta | 3009 B | вспомогательный файл: floor wood dark.png |
| №1673 unity/Assets/LegacyContent/Source/floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1674 unity/Assets/LegacyContent/Source/floor_wood_light.png.meta | 3009 B | вспомогательный файл: floor wood light.png |
| №1675 unity/Assets/LegacyContent/Source/wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1676 unity/Assets/LegacyContent/Source/wall_brick_red.png.meta | 3009 B | вспомогательный файл: wall brick red.png |
| №1677 unity/Assets/LegacyContent/Source/wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1678 unity/Assets/LegacyContent/Source/wall_concrete.png.meta | 3009 B | вспомогательный файл: wall concrete.png |
| №1679 unity/Assets/LegacyContent/Source/wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1680 unity/Assets/LegacyContent/Source/wall_half_timber.png.meta | 3009 B | вспомогательный файл: wall half timber.png |
| №1681 unity/Assets/LegacyContent/Source/wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1682 unity/Assets/LegacyContent/Source/wall_marble_dark.png.meta | 3009 B | вспомогательный файл: wall marble dark.png |
| №1683 unity/Assets/LegacyContent/Source/wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1684 unity/Assets/LegacyContent/Source/wall_marble_light.png.meta | 3009 B | вспомогательный файл: wall marble light.png |
| №1685 unity/Assets/LegacyContent/Source/wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1686 unity/Assets/LegacyContent/Source/wall_moss_stone.png.meta | 3009 B | вспомогательный файл: wall moss stone.png |
| №1687 unity/Assets/LegacyContent/Source/wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1688 unity/Assets/LegacyContent/Source/wall_old_plaster.png.meta | 3009 B | вспомогательный файл: wall old plaster.png |
| №1689 unity/Assets/LegacyContent/Source/wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1690 unity/Assets/LegacyContent/Source/wall_plaster_dark.png.meta | 3009 B | вспомогательный файл: wall plaster dark.png |
| №1691 unity/Assets/LegacyContent/Source/wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1692 unity/Assets/LegacyContent/Source/wall_plaster_light.png.meta | 3009 B | вспомогательный файл: wall plaster light.png |
| №1693 unity/Assets/LegacyContent/Source/wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1694 unity/Assets/LegacyContent/Source/wall_plaster_panel.png.meta | 3009 B | вспомогательный файл: wall plaster panel.png |
| №1695 unity/Assets/LegacyContent/Source/wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1696 unity/Assets/LegacyContent/Source/wall_slate.png.meta | 3009 B | вспомогательный файл: wall slate.png |
| №1697 unity/Assets/LegacyContent/Source/wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1698 unity/Assets/LegacyContent/Source/wall_stone_dark.png.meta | 3009 B | вспомогательный файл: wall stone dark.png |
| №1699 unity/Assets/LegacyContent/Source/wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1700 unity/Assets/LegacyContent/Source/wall_stone_light.png.meta | 3009 B | вспомогательный файл: wall stone light.png |
| №1701 unity/Assets/LegacyContent/Source/wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1702 unity/Assets/LegacyContent/Source/wall_stone_masonry.png.meta | 3009 B | вспомогательный файл: wall stone masonry.png |
| №1703 unity/Assets/LegacyContent/Source/wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1704 unity/Assets/LegacyContent/Source/wall_wallpaper.png.meta | 3009 B | вспомогательный файл: wall wallpaper.png |
| №1705 unity/Assets/LegacyContent/Source/wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1706 unity/Assets/LegacyContent/Source/wall_white_plaster.png.meta | 3009 B | вспомогательный файл: wall white plaster.png |
| №1707 unity/Assets/LegacyContent/Source/wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1708 unity/Assets/LegacyContent/Source/wall_wood_dark.png.meta | 3009 B | вспомогательный файл: wall wood dark.png |
| №1709 unity/Assets/LegacyContent/Source/wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1710 unity/Assets/LegacyContent/Source/wall_wood_light.png.meta | 3009 B | вспомогательный файл: wall wood light.png |
| №1711 unity/Assets/Plugins.meta | 172 B | вспомогательный файл: Plugins |
| №1712 unity/Assets/Plugins/Android.meta | 172 B | вспомогательный файл: Android |
| №1713 unity/Assets/Plugins/Android/DndSessionVault.java | 2333 B | вспомогательный файл: DndSessionVault |
| №1714 unity/Assets/Plugins/Android/DndSessionVault.java.meta | 60 B | вспомогательный файл: DndSessionVault.java |
| №1715 unity/Assets/Plugins/Android/UpdateProvider.java | 10227 B | вспомогательный файл: UpdateProvider |
| №1716 unity/Assets/Plugins/Android/UpdateProvider.java.meta | 60 B | вспомогательный файл: UpdateProvider.java |
| №1717 unity/Assets/StreamingAssets/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1718 unity/Assets/StreamingAssets/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1719 unity/Assets/StreamingAssets/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1720 unity/Assets/UniversalRenderPipelineGlobalSettings.asset | 25900 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings |
| №1721 unity/Assets/UniversalRenderPipelineGlobalSettings.asset.meta | 189 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings.asset |
| №1722 unity/Assets/Vtt.meta | 172 B | вспомогательный файл: Vtt |
| №1723 unity/Assets/Vtt/Editor.meta | 172 B | вспомогательный файл: Editor |
| №1724 unity/Assets/Vtt/Editor/BrandingResumeValidation.cs | 2971 B | вспомогательный файл: BrandingResumeValidation |
| №1725 unity/Assets/Vtt/Editor/BrandingResumeValidation.cs.meta | 60 B | вспомогательный файл: BrandingResumeValidation.cs |
| №1726 unity/Assets/Vtt/Editor/BuildBranding.cs | 2738 B | вспомогательный файл: BuildBranding |
| №1727 unity/Assets/Vtt/Editor/BuildBranding.cs.meta | 60 B | вспомогательный файл: BuildBranding.cs |
| №1728 unity/Assets/Vtt/Editor/CharacterPreviewImport.cs | 1433 B | вспомогательный файл: CharacterPreviewImport |
| №1729 unity/Assets/Vtt/Editor/CharacterPreviewImport.cs.meta | 60 B | вспомогательный файл: CharacterPreviewImport.cs |
| №1730 unity/Assets/Vtt/Editor/CharacterPreviewValidation.cs | 8132 B | вспомогательный файл: CharacterPreviewValidation |
| №1731 unity/Assets/Vtt/Editor/CharacterPreviewValidation.cs.meta | 60 B | вспомогательный файл: CharacterPreviewValidation.cs |
| №1732 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs | 21197 B | вспомогательный файл: CharacterSheetValidation |
| №1733 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs.meta | 59 B | вспомогательный файл: CharacterSheetValidation.cs |
| №1734 unity/Assets/Vtt/Editor/DiceBuildGate.cs | 4583 B | вспомогательный файл: DiceBuildGate |
| №1735 unity/Assets/Vtt/Editor/DiceBuildGate.cs.meta | 60 B | вспомогательный файл: DiceBuildGate.cs |
| №1736 unity/Assets/Vtt/Editor/DiceValidation.cs | 40864 B | вспомогательный файл: DiceValidation |
| №1737 unity/Assets/Vtt/Editor/DiceValidation.cs.meta | 60 B | вспомогательный файл: DiceValidation.cs |
| №1738 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs | 10967 B | вспомогательный файл: LegacyMigrationSetup |
| №1739 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSetup.cs |
| №1740 unity/Assets/Vtt/Editor/PrototypeSetup.cs | 7704 B | вспомогательный файл: PrototypeSetup |
| №1741 unity/Assets/Vtt/Editor/PrototypeSetup.cs.meta | 59 B | вспомогательный файл: PrototypeSetup.cs |
| №1742 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs | 16327 B | вспомогательный файл: UnityReleaseBuild |
| №1743 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs.meta | 60 B | вспомогательный файл: UnityReleaseBuild.cs |
| №1744 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs | 3632 B | вспомогательный файл: WorkshopBundleBuild |
| №1745 unity/Assets/Vtt/Editor/WorkshopBundleBuild.cs.meta | 60 B | вспомогательный файл: WorkshopBundleBuild.cs |
| №1746 unity/Assets/Vtt/Editor/WorkshopEditorValidation.cs | 26287 B | вспомогательный файл: WorkshopEditorValidation |
| №1747 unity/Assets/Vtt/Editor/WorkshopEditorValidation.cs.meta | 60 B | вспомогательный файл: WorkshopEditorValidation.cs |
| №1748 unity/Assets/Vtt/Resources.meta | 172 B | вспомогательный файл: Resources |
| №1749 unity/Assets/Vtt/Resources/Branding.meta | 172 B | вспомогательный файл: Branding |
| №1750 unity/Assets/Vtt/Resources/Branding/Dragon20.png | 1284815 B | текстура/изображение: Dragon20 |
| №1751 unity/Assets/Vtt/Resources/Branding/Dragon20.png.meta | 312 B | вспомогательный файл: Dragon20.png |
| №1752 unity/Assets/Vtt/Resources/Branding/Splash19.png | 8605503 B | текстура/изображение: Splash19 |
| №1753 unity/Assets/Vtt/Resources/Branding/Splash19.png.meta | 312 B | вспомогательный файл: Splash19.png |
| №1754 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg | 212684 B | текстура/изображение: Wallpaper16 |
| №1755 unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg.meta | 312 B | вспомогательный файл: Wallpaper16.jpg |
| №1756 unity/Assets/Vtt/Resources/Changelog.json | 45270 B | данные/конфигурация: Changelog |
| №1757 unity/Assets/Vtt/Resources/Changelog.json.meta | 158 B | вспомогательный файл: Changelog.json |
| №1758 unity/Assets/Vtt/Resources/CharacterSheet.meta | 172 B | вспомогательный файл: CharacterSheet |
| №1759 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json | 823381 B | данные/конфигурация: catalog |
| №1760 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json.meta | 158 B | вспомогательный файл: catalog.json |
| №1761 unity/Assets/Vtt/Resources/CharacterStudio.meta | 77 B | вспомогательный файл: CharacterStudio |
| №1762 unity/Assets/Vtt/Resources/CharacterStudio/DefaultFemale.json | 3860 B | данные/конфигурация: DefaultFemale |
| №1763 unity/Assets/Vtt/Resources/CharacterStudio/DefaultFemale.json.meta | 60 B | вспомогательный файл: DefaultFemale.json |
| №1764 unity/Assets/Vtt/Resources/CharacterStudio/DefaultMale.json | 3851 B | данные/конфигурация: DefaultMale |
| №1765 unity/Assets/Vtt/Resources/CharacterStudio/DefaultMale.json.meta | 60 B | вспомогательный файл: DefaultMale.json |
| №1766 unity/Assets/Vtt/Resources/CharacterStudio/HumanBody.fbx | 6899052 B | вспомогательный файл: HumanBody |
| №1767 unity/Assets/Vtt/Resources/CharacterStudio/HumanBody.fbx.meta | 60 B | вспомогательный файл: HumanBody.fbx |
| №1768 unity/Assets/Vtt/Resources/CharacterStudio/LICENSE.ASSETS.md | 6962 B | документация или отчёт: LICENSE.ASSETS |
| №1769 unity/Assets/Vtt/Resources/CharacterStudio/LICENSE.ASSETS.md.meta | 60 B | вспомогательный файл: LICENSE.ASSETS.md |
| №1770 unity/Assets/Vtt/Resources/CharacterStudio/MorphCatalog.json | 2701 B | данные/конфигурация: MorphCatalog |
| №1771 unity/Assets/Vtt/Resources/CharacterStudio/MorphCatalog.json.meta | 60 B | вспомогательный файл: MorphCatalog.json |
| №1772 unity/Assets/Vtt/Resources/CharacterStudio/PreviewLit.mat | 1027 B | вспомогательный файл: PreviewLit |
| №1773 unity/Assets/Vtt/Resources/CharacterStudio/PreviewLit.mat.meta | 60 B | вспомогательный файл: PreviewLit.mat |
| №1774 unity/Assets/Vtt/Resources/CharacterStudio/PreviewStudio.shader | 2521 B | вспомогательный файл: PreviewStudio |
| №1775 unity/Assets/Vtt/Resources/CharacterStudio/PreviewStudio.shader.meta | 204 B | вспомогательный файл: PreviewStudio.shader |
| №1776 unity/Assets/Vtt/Resources/CharacterStudio/SkinFemale.png | 4391156 B | текстура/изображение: SkinFemale |
| №1777 unity/Assets/Vtt/Resources/CharacterStudio/SkinFemale.png.meta | 585 B | вспомогательный файл: SkinFemale.png |
| №1778 unity/Assets/Vtt/Resources/CharacterStudio/SkinMale.png | 3693828 B | текстура/изображение: SkinMale |
| №1779 unity/Assets/Vtt/Resources/CharacterStudio/SkinMale.png.meta | 585 B | вспомогательный файл: SkinMale.png |
| №1780 unity/Assets/Vtt/Resources/Dice.meta | 77 B | вспомогательный файл: Dice |
| №1781 unity/Assets/Vtt/Resources/Dice/DiceNumeral.shader | 1428 B | вспомогательный файл: DiceNumeral |
| №1782 unity/Assets/Vtt/Resources/Dice/DiceNumeral.shader.meta | 60 B | вспомогательный файл: DiceNumeral.shader |
| №1783 unity/Assets/Vtt/Resources/Dice/DiceSurface.shader | 3471 B | вспомогательный файл: DiceSurface |
| №1784 unity/Assets/Vtt/Resources/Dice/DiceSurface.shader.meta | 60 B | вспомогательный файл: DiceSurface.shader |
| №1785 unity/Assets/Vtt/Resources/UI.meta | 77 B | вспомогательный файл: UI |
| №1786 unity/Assets/Vtt/Resources/UI/DejaVu-LICENSE.txt | 3859 B | документация или отчёт: DejaVu LICENSE |
| №1787 unity/Assets/Vtt/Resources/UI/DejaVu-LICENSE.txt.meta | 60 B | вспомогательный файл: DejaVu LICENSE.txt |
| №1788 unity/Assets/Vtt/Resources/UI/DejaVuSans.ttf | 759720 B | вспомогательный файл: DejaVuSans |
| №1789 unity/Assets/Vtt/Resources/UI/DejaVuSans.ttf.meta | 496 B | вспомогательный файл: DejaVuSans.ttf |
| №1790 unity/Assets/Vtt/Runtime.meta | 172 B | вспомогательный файл: Runtime |
| №1791 unity/Assets/Vtt/Runtime/AppearanceDocument.cs | 3069 B | вспомогательный файл: AppearanceDocument |
| №1792 unity/Assets/Vtt/Runtime/AppearanceDocument.cs.meta | 60 B | вспомогательный файл: AppearanceDocument.cs |
| №1793 unity/Assets/Vtt/Runtime/CharacterBodyPreview.cs | 15702 B | вспомогательный файл: CharacterBodyPreview |
| №1794 unity/Assets/Vtt/Runtime/CharacterBodyPreview.cs.meta | 60 B | вспомогательный файл: CharacterBodyPreview.cs |
| №1795 unity/Assets/Vtt/Runtime/CharacterCreation.cs | 11170 B | вспомогательный файл: CharacterCreation |
| №1796 unity/Assets/Vtt/Runtime/CharacterCreation.cs.meta | 59 B | вспомогательный файл: CharacterCreation.cs |
| №1797 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs | 16794 B | вспомогательный файл: CharacterSheetRules |
| №1798 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs.meta | 59 B | вспомогательный файл: CharacterSheetRules.cs |
| №1799 unity/Assets/Vtt/Runtime/CharacterStudioView.cs | 4943 B | вспомогательный файл: CharacterStudioView |
| №1800 unity/Assets/Vtt/Runtime/CharacterStudioView.cs.meta | 60 B | вспомогательный файл: CharacterStudioView.cs |
| №1801 unity/Assets/Vtt/Runtime/ClientPreferences.cs | 4479 B | вспомогательный файл: ClientPreferences |
| №1802 unity/Assets/Vtt/Runtime/ClientPreferences.cs.meta | 59 B | вспомогательный файл: ClientPreferences.cs |
| №1803 unity/Assets/Vtt/Runtime/CloudCharacterProtocol.cs | 6277 B | вспомогательный файл: CloudCharacterProtocol |
| №1804 unity/Assets/Vtt/Runtime/CloudCharacterProtocol.cs.meta | 60 B | вспомогательный файл: CloudCharacterProtocol.cs |
| №1805 unity/Assets/Vtt/Runtime/CommerceRules.cs | 19387 B | вспомогательный файл: CommerceRules |
| №1806 unity/Assets/Vtt/Runtime/CommerceRules.cs.meta | 60 B | вспомогательный файл: CommerceRules.cs |
| №1807 unity/Assets/Vtt/Runtime/DesktopUiSmoke.cs | 10099 B | вспомогательный файл: DesktopUiSmoke |
| №1808 unity/Assets/Vtt/Runtime/DesktopUiSmoke.cs.meta | 60 B | вспомогательный файл: DesktopUiSmoke.cs |
| №1809 unity/Assets/Vtt/Runtime/DiceGeometry.cs | 7902 B | вспомогательный файл: DiceGeometry |
| №1810 unity/Assets/Vtt/Runtime/DiceGeometry.cs.meta | 60 B | вспомогательный файл: DiceGeometry.cs |
| №1811 unity/Assets/Vtt/Runtime/DiceMotion.cs | 1864 B | вспомогательный файл: DiceMotion |
| №1812 unity/Assets/Vtt/Runtime/DiceMotion.cs.meta | 60 B | вспомогательный файл: DiceMotion.cs |
| №1813 unity/Assets/Vtt/Runtime/DiceRollRequest.cs | 3635 B | вспомогательный файл: DiceRollRequest |
| №1814 unity/Assets/Vtt/Runtime/DiceRollRequest.cs.meta | 60 B | вспомогательный файл: DiceRollRequest.cs |
| №1815 unity/Assets/Vtt/Runtime/DiceTable.cs | 31882 B | вспомогательный файл: DiceTable |
| №1816 unity/Assets/Vtt/Runtime/DiceTable.cs.meta | 60 B | вспомогательный файл: DiceTable.cs |
| №1817 unity/Assets/Vtt/Runtime/DiceTable.Trays.cs | 13501 B | вспомогательный файл: DiceTable.Trays |
| №1818 unity/Assets/Vtt/Runtime/DiceTable.Trays.cs.meta | 60 B | вспомогательный файл: DiceTable.Trays.cs |
| №1819 unity/Assets/Vtt/Runtime/DiceTentacles.cs | 6087 B | вспомогательный файл: DiceTentacles |
| №1820 unity/Assets/Vtt/Runtime/DiceTentacles.cs.meta | 60 B | вспомогательный файл: DiceTentacles.cs |
| №1821 unity/Assets/Vtt/Runtime/DiceTheme.cs | 3343 B | вспомогательный файл: DiceTheme |
| №1822 unity/Assets/Vtt/Runtime/DiceTheme.cs.meta | 60 B | вспомогательный файл: DiceTheme.cs |
| №1823 unity/Assets/Vtt/Runtime/DiceThemeGeometry.cs | 7056 B | вспомогательный файл: DiceThemeGeometry |
| №1824 unity/Assets/Vtt/Runtime/DiceThemeGeometry.cs.meta | 60 B | вспомогательный файл: DiceThemeGeometry.cs |
| №1825 unity/Assets/Vtt/Runtime/DiceTray.cs | 1313 B | вспомогательный файл: DiceTray |
| №1826 unity/Assets/Vtt/Runtime/DiceTray.cs.meta | 60 B | вспомогательный файл: DiceTray.cs |
| №1827 unity/Assets/Vtt/Runtime/ExplorerController.cs | 5869 B | вспомогательный файл: ExplorerController |
| №1828 unity/Assets/Vtt/Runtime/ExplorerController.cs.meta | 59 B | вспомогательный файл: ExplorerController.cs |
| №1829 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs | 808 B | вспомогательный файл: LegacyContentCatalog |
| №1830 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs.meta | 59 B | вспомогательный файл: LegacyContentCatalog.cs |
| №1831 unity/Assets/Vtt/Runtime/LegacyDocuments.cs | 10525 B | вспомогательный файл: LegacyDocuments |
| №1832 unity/Assets/Vtt/Runtime/LegacyDocuments.cs.meta | 59 B | вспомогательный файл: LegacyDocuments.cs |
| №1833 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs | 16116 B | вспомогательный файл: LegacyMapPresenter |
| №1834 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs.meta | 59 B | вспомогательный файл: LegacyMapPresenter.cs |
| №1835 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs | 5858 B | вспомогательный файл: LegacyMigrationSmoke |
| №1836 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSmoke.cs |
| №1837 unity/Assets/Vtt/Runtime/LegacySessionPanel.Account.cs | 19278 B | вспомогательный файл: LegacySessionPanel.Account |
| №1838 unity/Assets/Vtt/Runtime/LegacySessionPanel.Account.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Account.cs |
| №1839 unity/Assets/Vtt/Runtime/LegacySessionPanel.Appearance.cs | 14833 B | вспомогательный файл: LegacySessionPanel.Appearance |
| №1840 unity/Assets/Vtt/Runtime/LegacySessionPanel.Appearance.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Appearance.cs |
| №1841 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs | 17059 B | вспомогательный файл: LegacySessionPanel.Branding |
| №1842 unity/Assets/Vtt/Runtime/LegacySessionPanel.Branding.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Branding.cs |
| №1843 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs | 12018 B | вспомогательный файл: LegacySessionPanel.BrandSettings |
| №1844 unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.BrandSettings.cs |
| №1845 unity/Assets/Vtt/Runtime/LegacySessionPanel.CharacterStudio.cs | 12270 B | вспомогательный файл: LegacySessionPanel.CharacterStudio |
| №1846 unity/Assets/Vtt/Runtime/LegacySessionPanel.CharacterStudio.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.CharacterStudio.cs |
| №1847 unity/Assets/Vtt/Runtime/LegacySessionPanel.Chat.cs | 11327 B | вспомогательный файл: LegacySessionPanel.Chat |
| №1848 unity/Assets/Vtt/Runtime/LegacySessionPanel.Chat.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Chat.cs |
| №1849 unity/Assets/Vtt/Runtime/LegacySessionPanel.Commerce.cs | 18536 B | вспомогательный файл: LegacySessionPanel.Commerce |
| №1850 unity/Assets/Vtt/Runtime/LegacySessionPanel.Commerce.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Commerce.cs |
| №1851 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs | 21214 B | вспомогательный файл: LegacySessionPanel.ContentManager |
| №1852 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentManager.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.ContentManager.cs |
| №1853 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentPreviews.cs | 6755 B | вспомогательный файл: LegacySessionPanel.ContentPreviews |
| №1854 unity/Assets/Vtt/Runtime/LegacySessionPanel.ContentPreviews.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.ContentPreviews.cs |
| №1855 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs | 9639 B | вспомогательный файл: LegacySessionPanel |
| №1856 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.cs |
| №1857 unity/Assets/Vtt/Runtime/LegacySessionPanel.Desktop.cs | 2053 B | вспомогательный файл: LegacySessionPanel.Desktop |
| №1858 unity/Assets/Vtt/Runtime/LegacySessionPanel.Desktop.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Desktop.cs |
| №1859 unity/Assets/Vtt/Runtime/LegacySessionPanel.Dice.cs | 12708 B | вспомогательный файл: LegacySessionPanel.Dice |
| №1860 unity/Assets/Vtt/Runtime/LegacySessionPanel.Dice.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Dice.cs |
| №1861 unity/Assets/Vtt/Runtime/LegacySessionPanel.DiceControls.cs | 3513 B | вспомогательный файл: LegacySessionPanel.DiceControls |
| №1862 unity/Assets/Vtt/Runtime/LegacySessionPanel.DiceControls.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.DiceControls.cs |
| №1863 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs | 32514 B | вспомогательный файл: LegacySessionPanel.FrontEnd |
| №1864 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.FrontEnd.cs |
| №1865 unity/Assets/Vtt/Runtime/LegacySessionPanel.Moderation.cs | 16332 B | вспомогательный файл: LegacySessionPanel.Moderation |
| №1866 unity/Assets/Vtt/Runtime/LegacySessionPanel.Moderation.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Moderation.cs |
| №1867 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs | 9503 B | вспомогательный файл: LegacySessionPanel.Settings |
| №1868 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Settings.cs |
| №1869 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs | 28173 B | вспомогательный файл: LegacySessionPanel.Sheet |
| №1870 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Sheet.cs |
| №1871 unity/Assets/Vtt/Runtime/LegacySessionPanel.SheetSkin.cs | 4221 B | вспомогательный файл: LegacySessionPanel.SheetSkin |
| №1872 unity/Assets/Vtt/Runtime/LegacySessionPanel.SheetSkin.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.SheetSkin.cs |
| №1873 unity/Assets/Vtt/Runtime/LegacySessionPanel.Touch.cs | 4441 B | вспомогательный файл: LegacySessionPanel.Touch |
| №1874 unity/Assets/Vtt/Runtime/LegacySessionPanel.Touch.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Touch.cs |
| №1875 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs | 13404 B | вспомогательный файл: LegacySessionPanel.Updates |
| №1876 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.Updates.cs |
| №1877 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs | 2534 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary |
| №1878 unity/Assets/Vtt/Runtime/LegacySessionPanel.WorkshopLibrary.cs.meta | 60 B | вспомогательный файл: LegacySessionPanel.WorkshopLibrary.cs |
| №1879 unity/Assets/Vtt/Runtime/link.xml | 628 B | вспомогательный файл: link |
| №1880 unity/Assets/Vtt/Runtime/link.xml.meta | 60 B | вспомогательный файл: link.xml |
| №1881 unity/Assets/Vtt/Runtime/MenuGesture.cs | 1718 B | вспомогательный файл: MenuGesture |
| №1882 unity/Assets/Vtt/Runtime/MenuGesture.cs.meta | 60 B | вспомогательный файл: MenuGesture.cs |
| №1883 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs | 3139 B | вспомогательный файл: PrototypeSmoke |
| №1884 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs.meta | 59 B | вспомогательный файл: PrototypeSmoke.cs |
| №1885 unity/Assets/Vtt/Runtime/UnityRelease.cs | 5985 B | вспомогательный файл: UnityRelease |
| №1886 unity/Assets/Vtt/Runtime/UnityRelease.cs.meta | 60 B | вспомогательный файл: UnityRelease.cs |
| №1887 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs | 8198 B | вспомогательный файл: WorkshopRuntime |
| №1888 unity/Assets/Vtt/Runtime/WorkshopRuntime.cs.meta | 60 B | вспомогательный файл: WorkshopRuntime.cs |
| №1889 unity/Assets/Vtt/Runtime/WorkshopStore.cs | 34917 B | вспомогательный файл: WorkshopStore |
| №1890 unity/Assets/Vtt/Runtime/WorkshopStore.cs.meta | 60 B | вспомогательный файл: WorkshopStore.cs |
| №1891 unity/Assets/Vtt/Scenes.meta | 172 B | вспомогательный файл: Scenes |
| №1892 unity/Assets/Vtt/Scenes/Exploration.unity | 49176 B | вспомогательный файл: Exploration |
| №1893 unity/Assets/Vtt/Scenes/Exploration.unity.meta | 155 B | вспомогательный файл: Exploration.unity |
| №1894 unity/Assets/Vtt/Scenes/ImportedAdventure.unity | 2328750 B | вспомогательный файл: ImportedAdventure |
| №1895 unity/Assets/Vtt/Scenes/ImportedAdventure.unity.meta | 155 B | вспомогательный файл: ImportedAdventure.unity |
| №1896 unity/Assets/Vtt/Settings.meta | 172 B | вспомогательный файл: Settings |
| №1897 unity/Assets/Vtt/Settings/Explorer.mat | 3799 B | вспомогательный файл: Explorer |
| №1898 unity/Assets/Vtt/Settings/Explorer.mat.meta | 188 B | вспомогательный файл: Explorer.mat |
| №1899 unity/Assets/Vtt/Settings/ExplorerRenderer.asset | 1865 B | вспомогательный файл: ExplorerRenderer |
| №1900 unity/Assets/Vtt/Settings/ExplorerRenderer.asset.meta | 189 B | вспомогательный файл: ExplorerRenderer.asset |
| №1901 unity/Assets/Vtt/Settings/ExplorerURP.asset | 4690 B | вспомогательный файл: ExplorerURP |
| №1902 unity/Assets/Vtt/Settings/ExplorerURP.asset.meta | 189 B | вспомогательный файл: ExplorerURP.asset |
| №1903 unity/Assets/Vtt/Settings/Stone.mat | 3795 B | вспомогательный файл: Stone |
| №1904 unity/Assets/Vtt/Settings/Stone.mat.meta | 188 B | вспомогательный файл: Stone.mat |
| №1905 unity/Assets/Vtt/Settings/Wall.mat | 3793 B | вспомогательный файл: Wall |
| №1906 unity/Assets/Vtt/Settings/Wall.mat.meta | 188 B | вспомогательный файл: Wall.mat |
| №1907 unity/Assets/Vtt/Tests.meta | 172 B | вспомогательный файл: Tests |
| №1908 unity/Assets/Vtt/Tests/sheet-contract.json | 195912 B | данные/конфигурация: sheet contract |
| №1909 unity/Assets/Vtt/Tests/sheet-contract.json.meta | 158 B | вспомогательный файл: sheet contract.json |
| №1910 unity/ci/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №1911 unity/ci/check_sheet_provenance.py | 2365 B | вспомогательный файл: check sheet provenance |
| №1912 unity/ci/cloud_release.py | 14328 B | вспомогательный файл: cloud release |
| №1913 unity/ci/measure_apk.py | 5713 B | вспомогательный файл: measure apk |
| №1914 unity/ci/promote_candidate.py | 5141 B | вспомогательный файл: promote candidate |
| №1915 unity/ci/publish_android_update.py | 6493 B | вспомогательный файл: publish android update |
| №1916 unity/ci/requirements.txt | 21 B | документация или отчёт: requirements |
| №1917 unity/ci/test_brand_visual_contract.py | 3012 B | вспомогательный файл: test brand visual contract |
| №1918 unity/ci/test_character_preview_contract.py | 1354 B | вспомогательный файл: test character preview contract |
| №1919 unity/ci/test_cloud_release.py | 11048 B | вспомогательный файл: test cloud release |
| №1920 unity/ci/test_content_registry_contract.py | 1574 B | вспомогательный файл: test content registry contract |
| №1921 unity/ci/test_launcher_aliases.py | 1007 B | вспомогательный файл: test launcher aliases |
| №1922 unity/ci/test_update_settings_contract.py | 4439 B | вспомогательный файл: test update settings contract |
| №1923 unity/ci/transfer-signing-secrets.ps1 | 3449 B | вспомогательный файл: transfer signing secrets |
| №1924 unity/ci/verify_bundle_output.py | 1081 B | вспомогательный файл: verify bundle output |
| №1925 unity/ci/verify_launcher_aliases.py | 3703 B | вспомогательный файл: verify launcher aliases |
| №1926 unity/ci/verify_public_workshop.py | 6725 B | вспомогательный файл: verify public workshop |
| №1927 unity/ci/windows-upgrade-qa.ps1 | 5538 B | вспомогательный файл: windows upgrade qa |
| №1928 unity/ci/workshop-tests/.gitignore | 10 B | вспомогательный файл: .gitignore |
| №1929 unity/ci/workshop-tests/AccountGestureChecks.cs | 5460 B | вспомогательный файл: AccountGestureChecks |
| №1930 unity/ci/workshop-tests/AllModCollectionChecks.cs | 5776 B | вспомогательный файл: AllModCollectionChecks |
| №1931 unity/ci/workshop-tests/CollectionChecks.cs | 6368 B | вспомогательный файл: CollectionChecks |
| №1932 unity/ci/workshop-tests/CommerceChecks.cs | 4694 B | вспомогательный файл: CommerceChecks |
| №1933 unity/ci/workshop-tests/Program.cs | 37627 B | вспомогательный файл: Program |
| №1934 unity/ci/workshop-tests/WorkshopTests.csproj | 1603 B | вспомогательный файл: WorkshopTests |
| №1935 unity/ContentSources~/catalog.full.json | 1259265 B | данные/конфигурация: catalog.full |
| №1936 unity/ContentSources~/cloud-copy-contracts.json | 3613 B | данные/конфигурация: cloud copy contracts |
| №1937 unity/ContentSources~/workshop-commerce/catalogs.json | 91244 B | данные/конфигурация: catalogs |
| №1938 unity/ContentSources~/workshop-commerce/contracts.json | 7885 B | данные/конфигурация: contracts |
| №1939 unity/evidence/exploration.png | 119417 B | текстура/изображение: exploration |
| №1940 unity/Installer/release-notes.md | 1582 B | документация или отчёт: release notes |
| №1941 unity/Installer/UnitySetup.nsi | 3417 B | вспомогательный файл: UnitySetup |
| №1942 unity/Packages/manifest.json | 609 B | данные/конфигурация: manifest |
| №1943 unity/Packages/packages-lock.json | 6359 B | данные/конфигурация: packages lock |
| №1944 unity/ProjectSettings/AudioManager.asset | 523 B | вспомогательный файл: AudioManager |
| №1945 unity/ProjectSettings/ClusterInputManager.asset | 114 B | вспомогательный файл: ClusterInputManager |
| №1946 unity/ProjectSettings/DynamicsManager.asset | 1574 B | вспомогательный файл: DynamicsManager |
| №1947 unity/ProjectSettings/EditorBuildSettings.asset | 401 B | вспомогательный файл: EditorBuildSettings |
| №1948 unity/ProjectSettings/EditorSettings.asset | 1603 B | вспомогательный файл: EditorSettings |
| №1949 unity/ProjectSettings/GraphicsSettings.asset | 2615 B | вспомогательный файл: GraphicsSettings |
| №1950 unity/ProjectSettings/InputManager.asset | 9754 B | вспомогательный файл: InputManager |
| №1951 unity/ProjectSettings/MemorySettings.asset | 1226 B | вспомогательный файл: MemorySettings |
| №1952 unity/ProjectSettings/MultiplayerManager.asset | 232 B | вспомогательный файл: MultiplayerManager |
| №1953 unity/ProjectSettings/NavMeshAreas.asset | 1361 B | вспомогательный файл: NavMeshAreas |
| №1954 unity/ProjectSettings/Physics2DSettings.asset | 1862 B | вспомогательный файл: Physics2DSettings |
| №1955 unity/ProjectSettings/PresetManager.asset | 146 B | вспомогательный файл: PresetManager |
| №1956 unity/ProjectSettings/ProjectSettings.asset | 22467 B | вспомогательный файл: ProjectSettings |
| №1957 unity/ProjectSettings/ProjectVersion.txt | 85 B | документация или отчёт: ProjectVersion |
| №1958 unity/ProjectSettings/QualitySettings.asset | 9858 B | вспомогательный файл: QualitySettings |
| №1959 unity/ProjectSettings/SceneTemplateSettings.json | 3535 B | данные/конфигурация: SceneTemplateSettings |
| №1960 unity/ProjectSettings/ShaderGraphSettings.asset | 633 B | вспомогательный файл: ShaderGraphSettings |
| №1961 unity/ProjectSettings/TagManager.asset | 411 B | вспомогательный файл: TagManager |
| №1962 unity/ProjectSettings/TimeManager.asset | 305 B | вспомогательный файл: TimeManager |
| №1963 unity/ProjectSettings/UnityConnectSettings.asset | 1063 B | вспомогательный файл: UnityConnectSettings |
| №1964 unity/ProjectSettings/VersionControlSettings.asset | 172 B | вспомогательный файл: VersionControlSettings |
| №1965 unity/ProjectSettings/VFXManager.asset | 525 B | вспомогательный файл: VFXManager |
| №1966 unity/PUBLIC_DELIVERY.json | 1072 B | данные/конфигурация: PUBLIC DELIVERY |
| №1967 unity/README.md | 9382 B | документация или отчёт: README |
| №1968 unity/release.ps1 | 7750 B | вспомогательный файл: release |
| №1969 unity/Tools/export_character.py | 7410 B | вспомогательный файл: export character |
| №1970 unity/Tools/export_cloud_copy.cjs | 1429 B | логический модуль: export cloud copy |
| №1971 unity/Tools/export_commerce.cjs | 2282 B | логический модуль: export commerce |
| №1972 unity/Tools/package_commerce.py | 3643 B | вспомогательный файл: package commerce |
| №1973 unity/Tools/split_workshop_content.py | 7629 B | вспомогательный файл: split workshop content |
| №1974 unity/Tools/sync_character_sheet.cjs | 11842 B | логический модуль: sync character sheet |
| №1975 unity/Tools/sync_legacy_content.cjs | 5736 B | логический модуль: sync legacy content |
| №1976 unity/VALIDATION.md | 32688 B | документация или отчёт: VALIDATION |
| №1977 unity/verify.ps1 | 2809 B | вспомогательный файл: verify |
| №1978 updates/beta.json | 211 B | метаданные обновлений: beta |
| №1979 updates/previous-stable.json | 179808 B | метаданные обновлений: previous stable |
| №1980 updates/README.md | 233 B | документация или отчёт: README |
| №1981 updates/stable.json | 179809 B | метаданные обновлений: stable |
| №1982 updates/unity-changelog.json | 45270 B | метаданные обновлений: unity changelog |
| №1983 updates/unity-experiment.json | 1237 B | метаданные обновлений: unity experiment |
| №1984 vignette_v2_sprite.png | 1213593 B | текстура/изображение: vignette v2 sprite |
| №1985 VTT_PROJECT_MANIFEST_V70.json | 44370 B | устаревший список V70, не актуален |
| №1986 wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1987 wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1988 wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1989 wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1990 wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1991 wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1992 wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1993 wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1994 wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1995 wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1996 wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1997 wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1998 wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1999 wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №2000 wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №2001 wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №2002 wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №2003 wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №2004 wallpapers/1.png | 1460744 B | ассет графики/3D/интерфейса: 1 |
| №2005 wallpapers/10.png | 1667723 B | ассет графики/3D/интерфейса: 10 |
| №2006 wallpapers/11.png | 1815959 B | ассет графики/3D/интерфейса: 11 |
| №2007 wallpapers/12.png | 1548677 B | ассет графики/3D/интерфейса: 12 |
| №2008 wallpapers/13.png | 1599093 B | ассет графики/3D/интерфейса: 13 |
| №2009 wallpapers/14.png | 1596513 B | ассет графики/3D/интерфейса: 14 |
| №2010 wallpapers/15.png | 233043 B | ассет графики/3D/интерфейса: 15 |
| №2011 wallpapers/16.png | 212684 B | ассет графики/3D/интерфейса: 16 |
| №2012 wallpapers/17.png | 1585122 B | ассет графики/3D/интерфейса: 17 |
| №2013 wallpapers/18.png | 2095852 B | ассет графики/3D/интерфейса: 18 |
| №2014 wallpapers/19.png | 8605503 B | ассет графики/3D/интерфейса: 19 |
| №2015 wallpapers/2.png | 1590206 B | ассет графики/3D/интерфейса: 2 |
| №2016 wallpapers/20.png | 1284815 B | ассет графики/3D/интерфейса: 20 |
| №2017 wallpapers/21.png | 179307 B | ассет графики/3D/интерфейса: 21 |
| №2018 wallpapers/22.png | 344279 B | ассет графики/3D/интерфейса: 22 |
| №2019 wallpapers/23.png | 210291 B | ассет графики/3D/интерфейса: 23 |
| №2020 wallpapers/24.png | 141215 B | ассет графики/3D/интерфейса: 24 |
| №2021 wallpapers/25.png | 160892 B | ассет графики/3D/интерфейса: 25 |
| №2022 wallpapers/26.png | 187259 B | ассет графики/3D/интерфейса: 26 |
| №2023 wallpapers/27.png | 213194 B | ассет графики/3D/интерфейса: 27 |
| №2024 wallpapers/28.png | 202417 B | ассет графики/3D/интерфейса: 28 |
| №2025 wallpapers/29.png | 166942 B | ассет графики/3D/интерфейса: 29 |
| №2026 wallpapers/3.png | 1662340 B | ассет графики/3D/интерфейса: 3 |
| №2027 wallpapers/30.png | 237556 B | ассет графики/3D/интерфейса: 30 |
| №2028 wallpapers/31.svg | 1181 B | ассет графики/3D/интерфейса: 31 |
| №2029 wallpapers/32.svg | 1417 B | ассет графики/3D/интерфейса: 32 |
| №2030 wallpapers/4.png | 1816114 B | ассет графики/3D/интерфейса: 4 |
| №2031 wallpapers/5.png | 1742466 B | ассет графики/3D/интерфейса: 5 |
| №2032 wallpapers/6.png | 1591016 B | ассет графики/3D/интерфейса: 6 |
| №2033 wallpapers/7.png | 1815665 B | ассет графики/3D/интерфейса: 7 |
| №2034 wallpapers/8.png | 1492730 B | ассет графики/3D/интерфейса: 8 |
| №2035 wallpapers/9.png | 1715179 B | ассет графики/3D/интерфейса: 9 |

## Реестр имён, переменных и ключей

Имена сгруппированы по роли. Ссылка №NNNN указывает на путь в таблице файлов выше; остальные вхождения ищите в исходниках.
Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.


### JS объявления/параметры (4936)

| Имя | Исходные файлы |
|---|---|
| _ | №0059 (+ 10 других файлов) |
| __ls | №1283 (+ 4 других файлов) |
| __shifterProgression | №0834 |
| __TEST_SRC__ | №1283 (+ 4 других файлов) |
| _event | №0888 |
| _wc | №0887 |
| a | №0060 (+ 144 других файлов) |
| A | №0059 (+ 5 других файлов) |
| a0 | №1206 (+ 1 других файлов) |
| a1 | №1206 (+ 1 других файлов) |
| a2 | №1206 (+ 1 других файлов) |
| aa | №0062 (+ 1 других файлов) |
| aal | №1151 |
| ab | №0059 (+ 10 других файлов) |
| abilities | №0785 |
| ability | №0078 (+ 6 других файлов) |
| ABILITY | №0799 |
| abilityMod | №0780 |
| abName | №0655 |
| AbortController | №1189 |
| above | №0062 (+ 2 других файлов) |
| absent | №0669 |
| absolute | №1975 |
| absorbed | №0656 (+ 1 других файлов) |
| ac | №0062 (+ 25 других файлов) |
| ACADEMIES | №0873 |
| academy | №0777 (+ 1 других файлов) |
| academyEffects | №0780 |
| acBase | №0792 |
| acBaseInp | №0792 |
| acc | №0837 (+ 4 других файлов) |
| acCalcBaseSel | №0792 |
| ACCEPT | №0803 |
| access | №0671 (+ 1 других файлов) |
| accessors | №1205 (+ 4 других файлов) |
| accessory | №0064 |
| accIndex | №1197 |
| account | №0652 |
| ACCURSED_CURSE_FEATURES | №0780 |
| ACCURSED_CURSES | №0780 |
| ACCURSED_METAMORPHOSES | №0780 |
| acidAttack | №1158 |
| acInput | №0084 (+ 1 других файлов) |
| acInputEl | №0794 |
| across | №0062 |
| action | №0078 (+ 20 других файлов) |
| actionBtn | №0793 |
| actionHandler | №0811 |
| actionId | №0826 |
| actionIndex | №0839 |
| actionName | №0812 |
| actionResultsByPeer | №0811 |
| actions | №0079 (+ 6 других файлов) |
| ACTIONS | №0784 |
| actionSpent | №0656 |
| actionStr | №0791 |
| actionTokenId | №0626 |
| active | №0062 (+ 15 других файлов) |
| ACTIVE | №0783 |
| activeBonuses | №0794 |
| activeBtns | №0773 |
| activeCat | №0792 |
| activeCategory | №0794 (+ 1 других файлов) |
| activeClass | №0813 |
| activeColsWallet | №0791 |
| activeEffects | №0079 |
| activeFolder | №0813 |
| activeHero | №0833 (+ 1 других файлов) |
| activeId | №0819 |
| activeLvl | №0833 |
| activeNow | №0774 |
| activeStats | №0794 |
| activeTab | №0064 |
| activeWp | №0869 |
| actor | №0656 (+ 10 других файлов) |
| actorId | №0784 (+ 1 других файлов) |
| actors | №0642 |
| acts | №0634 (+ 7 других файлов) |
| actual | №0784 (+ 5 других файлов) |
| actualMode | №0656 |
| acVal | №0794 |
| ad | №0062 |
| add | №0790 (+ 3 других файлов) |
| addBtn | №0792 |
| added | №0714 (+ 2 других файлов) |
| addedLangs | №0647 |
| addedWeight | №0793 (+ 1 других файлов) |
| addExhaustion | №0826 |
| addGroup | №0674 |
| addToContainer | №0790 |
| addVal | №0781 |
| adj | №0806 |
| adjacent | №0059 |
| adjusted | №0806 |
| adr | №0834 (+ 1 других файлов) |
| adv | №0656 (+ 2 других файлов) |
| advice | №0820 |
| aether | №0642 |
| af | №0062 |
| affected | №0079 |
| affinity | №0649 (+ 1 других файлов) |
| after | №0656 (+ 8 других файлов) |
| afterBounds | №1181 |
| ag | №0780 (+ 1 других файлов) |
| again | №1222 |
| age | №0625 (+ 2 других файлов) |
| ageEl | №0625 (+ 1 других файлов) |
| ageInput | №0625 (+ 1 других файлов) |
| agents | №0633 |
| ah | №0062 (+ 1 других файлов) |
| ai | №0062 (+ 11 других файлов) |
| ailment | №0780 |
| aim | №0071 |
| aimed | №1212 |
| ain | №0062 (+ 1 других файлов) |
| al | №0062 |
| alchemistCombatant | №1157 |
| alchemistDebuffs | №0656 |
| alchemistFormula | №0656 |
| alchemistLevel | №0656 |
| alchemistState | №0656 |
| alchemistVariants | №0079 |
| alias | №0701 (+ 2 других файлов) |
| ALIAS | №0771 |
| aliases | №0079 (+ 7 других файлов) |
| ALIASES | №0673 (+ 1 других файлов) |
| align | №1348 |
| all | №0064 (+ 5 других файлов) |
| ALL_RECIPES | №0673 |
| allBgs | №0625 |
| allCharacters | №0084 |
| allCreatureNames | №0807 |
| allCurses | №0780 |
| allElements | №0791 |
| allFeats | №0746 |
| allItems | №0794 |
| allow | №0821 |
| allowed | №0062 (+ 10 других файлов) |
| allowed2 | №0814 |
| allowMastery | №0780 |
| allPanels | №0823 (+ 1 других файлов) |
| allRaces | №0625 (+ 2 других файлов) |
| allRollsDetails | №0837 |
| allSources | №0746 |
| allSpells | №0837 |
| ally | №0079 (+ 5 других файлов) |
| allyState | №0079 |
| allyWilling | №0820 |
| allyX | №0820 |
| allyY | №0820 |
| alone | №1164 |
| already | №0780 (+ 1 других файлов) |
| alreadyHad | №0746 |
| alreadyHas | №0823 |
| alreadyHasSelectedClass | №0701 |
| alreadyHasSubclass | №0701 |
| alternates | №0082 |
| always | №0810 |
| am | №0074 (+ 3 других файлов) |
| am2 | №1309 |
| amap | №0780 |
| AMBIENCE_STATE_KEY | №0083 |
| ambienceShouldPlay | №0083 |
| ambienceStateLoaded | №0083 |
| AMBIENT_TRACKS | №0083 |
| amorist | №1158 |
| amount | №0062 (+ 23 других файлов) |
| amp | №0780 |
| amphibian | №1158 |
| amphibianMods | №1158 |
| amplified | №1314 |
| anatomy | №1160 |
| anchor | №0059 (+ 1 других файлов) |
| anchors | №0062 (+ 1 других файлов) |
| angle | №0059 (+ 6 других файлов) |
| angularIndex | №0059 |
| animal | №0062 |
| animalCfg | №0062 |
| animalParts | №0062 |
| animalSelect | №0064 |
| ankle | №0062 (+ 1 других файлов) |
| answered | №0812 |
| answers | №1219 |
| ao | №0812 |
| ap | №0649 (+ 7 других файлов) |
| api | №0060 (+ 41 других файлов) |
| API | №0080 (+ 12 других файлов) |
| app | №0887 (+ 3 других файлов) |
| APP_FONTS | №0833 |
| APP_FRAME_COLORS | №0833 |
| APP_FRAME_STYLES | №0833 |
| APP_THEMES | №0833 |
| APP_VERSION | №0843 (+ 1 других файлов) |
| appearance | №0061 (+ 2 других файлов) |
| appearanceSource | №1189 |
| applicable | №0822 |
| applied | №0819 (+ 5 других файлов) |
| appliedBonusText | №0746 |
| applySkin | №0064 |
| approved | №1155 |
| approvedRules | №0822 |
| ar | №0649 (+ 4 других файлов) |
| arc | №0062 |
| arch | №0062 |
| archetypeFeatureIds | №0780 |
| area | №0062 (+ 2 других файлов) |
| arena | №1238 |
| arg | №0772 |
| args | №0772 (+ 7 других файлов) |
| arm | №0062 |
| armLine | №0062 |
| armor | №0667 (+ 4 других файлов) |
| armorCategories | №0792 |
| armored | №0830 |
| armorFields | №0792 |
| armorName | №0656 |
| armorObj | №0656 |
| armorOn | №0062 |
| arr | №0070 (+ 12 других файлов) |
| Array | №0664 (+ 23 других файлов) |
| ArrayBuffer | №1198 |
| arrays | №0673 |
| arrow | №0649 (+ 3 других файлов) |
| ARTIFICER_CLASSES | №0649 |
| ARTIFICER_KEY | №0828 |
| artisan | №1217 |
| artisanBack | №1217 |
| ASI | №0817 (+ 1 других файлов) |
| ASI_LEVELS | №0840 |
| asiContainer | №0701 |
| asiHtml | №0701 |
| asiLevels | №0779 |
| asiPrompt | №0701 |
| asMoney | №0819 |
| aspect | №0064 (+ 1 других файлов) |
| aspects | №0845 |
| ASPECTS | №0845 |
| assert | №1155 (+ 178 других файлов) |
| assertSource | №1194 |
| asset | №0060 (+ 30 других файлов) |
| assetId | №1201 |
| assets | №0077 |
| assetSet | №0072 |
| assigned | №0780 |
| at | №0060 (+ 16 других файлов) |
| atk | №0655 (+ 5 других файлов) |
| atkBonus | №0634 (+ 9 других файлов) |
| atkElem | №0655 (+ 1 других файлов) |
| atlas | №0063 |
| atob | №1161 (+ 21 других файлов) |
| aTok | №0656 |
| attachment | №0063 |
| attack | №0810 (+ 7 других файлов) |
| attacker | №0642 (+ 9 других файлов) |
| attackerBack | №0812 |
| attackerDebuffs | №0656 |
| attackerId | №0656 |
| attackerIdForStudy | №0656 |
| attackerSelect | №1219 |
| attackerState | №0656 |
| attackModifiers | №0810 |
| attackPayload | №0812 |
| attackRolls | №1249 |
| attacks | №0656 (+ 3 других файлов) |
| attempts | №0654 (+ 1 других файлов) |
| attributes | №1247 |
| aura | №0812 (+ 1 других файлов) |
| auraActive | №0649 |
| auraBack | №1217 |
| auraCha | №0649 |
| auraPC | №1217 |
| auraPhone | №1217 |
| auraRoster | №1217 |
| auraServer | №1217 |
| auraSource | №0649 |
| auth | №1188 |
| authoritativeAoe | №0812 |
| auto | №0812 |
| autoCloseTimer | №0798 |
| autoFail | №0656 |
| autoInterval | №0869 |
| automatic | №0642 |
| autoPlay | №0083 |
| autoResults | №0812 |
| autoRotateState | №0869 |
| autoRotateTimer | №0869 |
| autos | №0812 |
| av | №0062 (+ 2 других файлов) |
| avail | №0649 |
| available | №0780 (+ 4 других файлов) |
| availableCharges | №0079 |
| availableWallpapers | №0869 |
| avg | №0701 |
| avianHybrid | №1160 |
| aw | №0062 (+ 1 других файлов) |
| ax | №0062 (+ 2 других файлов) |
| axes | №0062 |
| AXES | №0067 |
| axis | №0062 (+ 10 других файлов) |
| ay | №0063 |
| az | №0062 (+ 1 других файлов) |
| b | №0060 (+ 128 других файлов) |
| B | №0059 (+ 16 других файлов) |
| b1 | №0062 (+ 1 других файлов) |
| back | №0060 (+ 4 других файлов) |
| backAnchor | №0062 |
| backBurden | №1217 |
| backCount | №0062 |
| backDepth | №0063 |
| backdrop | №0064 |
| backgroundName | №0625 (+ 1 других файлов) |
| backgrounds | №1337 |
| backgroundsList | №0625 (+ 1 других файлов) |
| backQueen | №1217 |
| backTop | №0063 |
| backup | №0654 (+ 2 других файлов) |
| backupData | №0833 |
| backups | №0652 |
| bad | №0642 (+ 5 других файлов) |
| badgeTag | №0773 |
| badR | №1314 |
| bag | №1178 |
| bagAnchor | №0059 |
| bagCenter | №0059 |
| bagRings | №0059 |
| baked | №1975 |
| balanceAfterBarter | №1253 |
| balanceAfterBuy | №1253 |
| BAM | №0631 |
| band | №0063 |
| bandHi | №0063 |
| bandLo | №0063 |
| bandSection | №0063 |
| bar | №0844 |
| barb | №1310 (+ 1 других файлов) |
| barbarian | №1303 |
| barFill | №0793 |
| barter | №1253 |
| barWrapper | №0793 |
| base | №0062 (+ 67 других файлов) |
| BASE | №0665 (+ 1 других файлов) |
| BASE_HOSTS | №0890 |
| baseAc | №0625 (+ 1 других файлов) |
| baseAC | №0794 |
| baseACInput | №0794 |
| baseActions | №0814 |
| baseConfig | №1397 |
| baseCount | №0673 |
| baseFeatures | №0814 |
| baseGain | №0701 |
| baseH | №0063 (+ 1 других файлов) |
| baseIds | №0873 |
| baseJinx | №0780 |
| baseline | №0064 (+ 2 других файлов) |
| baseMax | №0656 |
| baseMod | №0773 |
| baseMode | №0828 |
| baseNameEng | №0746 |
| baseNameRu | №0746 |
| baseOpenTrade | №0802 |
| baseRate | №0666 |
| baseRender | №0657 |
| BASES | №0675 |
| baseStock | №0803 |
| baseValue | №0668 |
| baseW | №0073 |
| baseX | №0062 |
| baseY | №0062 |
| bat | №0062 (+ 1 других файлов) |
| batch | №0812 |
| batchFail | №1330 |
| batchTarget | №1330 |
| battleGame | №1217 |
| bb | №0062 (+ 4 других файлов) |
| bbu | №0780 |
| bbuDamage | №1238 |
| bbuHero | №1238 |
| bbuLevel9 | №1238 |
| bbuResource | №0656 |
| bbuResult | №0656 |
| bbuTemp | №0780 |
| bc | №0059 (+ 2 других файлов) |
| bCha | №0825 |
| bCon | №0825 |
| bd | №1211 |
| bDex | №0825 |
| beak | №0062 |
| beakKind | №0062 |
| beakL | №0062 |
| beakScale | №0062 |
| beakSelect | №0064 |
| beakStyle | №1181 |
| beakW | №0062 |
| bearer | №0654 |
| bearing | №0819 |
| beast | №0834 |
| beetle | №0062 |
| before | №0654 (+ 63 других файлов) |
| beforeBounds | №1181 |
| beforeBurn | №1157 |
| beforeCup | №1219 |
| beforeCurse | №1314 |
| beforeMoxie | №1238 |
| beforeNormal | №1320 |
| beforePact | №1320 |
| beforeRepeat | №1217 |
| beforeReset | №1159 |
| beforeUnsupported | №1219 |
| beh | №1268 |
| belly | №0062 |
| belt | №0664 |
| bend | №0062 |
| berry | №0819 (+ 1 других файлов) |
| berryOwner | №0820 |
| berryRef | №1217 |
| best | №0062 (+ 11 других файлов) |
| bestD | №1205 |
| bestDist | №0812 |
| bestiary | №0807 |
| bestTrans | №1211 |
| bestTri | №1206 |
| bet | №1216 (+ 1 других файлов) |
| bev | №0812 |
| bf | №0070 (+ 2 других файлов) |
| bg | №0673 (+ 1 других файлов) |
| BG_COLOR_PALETTE | №0869 |
| BG3_POINT_BUY | №0625 (+ 1 других файлов) |
| bgBody | №0869 |
| bgInput | №0084 |
| bgs | №0646 (+ 1 других файлов) |
| bgSelect | №0625 (+ 1 других файлов) |
| bgStyle | №0773 |
| bgVal | №0625 (+ 1 других файлов) |
| bh | №0828 (+ 3 других файлов) |
| bhDamage | №0656 |
| bhPact | №0828 |
| bi | №0812 |
| bIdx | №0625 |
| bin | №0062 (+ 16 других файлов) |
| binary | №1346 |
| binBytes | №1200 |
| binPad | №1197 |
| bins | №0063 |
| bInt | №0825 |
| bird | №0062 |
| bite | №1231 |
| bits | №0059 (+ 1 других файлов) |
| bl | №0687 |
| blackPowder | №1158 |
| blackPowderAttack | №1158 |
| blade | №0062 |
| bladeSpan | №0062 |
| bleed | №0656 |
| blend | №0059 (+ 1 других файлов) |
| blended | №0059 |
| blind | №0819 (+ 2 других файлов) |
| blob | №0833 (+ 7 других файлов) |
| blobs | №1392 |
| block | №0823 (+ 6 других файлов) |
| blocked | №0654 (+ 4 других файлов) |
| bloodAbility | №0079 |
| bloodAgent | №1158 |
| bloodCurseReaction | №0656 |
| bloodHunterPack | №0780 |
| bloodlines | №0834 |
| bloodMax | №0649 |
| bloodMutagenist | №1158 |
| bloodRiteRevival | №0656 |
| bloodShort | №0079 |
| bloodSnapshots | №0079 |
| bm | №0812 (+ 2 других файлов) |
| board | №0812 (+ 2 других файлов) |
| boardBox | №0627 |
| boardCtx | №1291 |
| body | №0059 (+ 22 других файлов) |
| bodyArmor | №0794 |
| bodyBefore | №1159 |
| bodyExtras | №1167 |
| bodyStats | №0785 |
| bomb | №0079 (+ 2 других файлов) |
| bomber | №1158 |
| bomberGuard | №1158 |
| bomberResistanceTarget | №1157 |
| bomberResisted | №1157 |
| bond | №0657 |
| bondBox | №0820 |
| bondConsent | №1219 |
| bondLabel | №0820 |
| bonds | №0687 |
| bondTarget | №1219 |
| bondText | №0820 |
| bondWilling | №0820 |
| bone | №0069 (+ 1 других файлов) |
| bonesChecked | №1388 |
| boneStyle | №0062 |
| boneVertexMap | №0062 |
| bonus | №0075 (+ 24 других файлов) |
| bonusAction | №0812 |
| bonuses | №0792 |
| bonusesText | №0625 (+ 1 других файлов) |
| bonusMultiplier | №0773 |
| bonusText | №0746 |
| Boolean | №0664 (+ 1 других файлов) |
| booted | №0887 |
| borderLeftColor | №0773 |
| bottom | №0059 (+ 4 других файлов) |
| bought | №1253 |
| boundary | №0059 (+ 1 других файлов) |
| boundaryEdges | №0059 |
| boundaryWelds | №0059 |
| bounds | №1168 (+ 1 других файлов) |
| box | №0064 (+ 27 других файлов) |
| boxer | №1238 |
| boxesHtml | №0837 |
| boxIndex | №0837 |
| bp | №0673 (+ 7 других файлов) |
| bParts | №0625 (+ 1 других файлов) |
| br | №1303 |
| brandedHp | №1241 |
| braPanels | №1181 |
| breath | №1158 |
| breathOne | №1158 |
| breathResults | №0079 |
| breathRoll | №0079 |
| breathTargets | №0079 |
| breathTwo | №1158 |
| breathType | №0079 |
| bridge | №1203 (+ 4 других файлов) |
| broken | №0062 (+ 3 других файлов) |
| brokenInputs | №1184 |
| browColor | №0064 |
| browser | №1351 (+ 38 других файлов) |
| BrowserWindow | №0887 |
| bStr | №0825 |
| bt | №0062 (+ 2 других файлов) |
| btn | №0793 (+ 4 других файлов) |
| btnCat | №0794 |
| btnContainer | №0792 |
| btnMode | №0773 |
| btoa | №1161 (+ 2 других файлов) |
| bucket | №0062 (+ 2 других файлов) |
| buckets | №0062 |
| bucketStep | №0062 |
| budget | №0819 (+ 1 других файлов) |
| budgets | №0060 |
| buf | №0070 (+ 2 других файлов) |
| buffers | №0062 (+ 3 других файлов) |
| bufs | №0070 |
| build | №0063 (+ 1 других файлов) |
| built | №1161 (+ 3 других файлов) |
| bulge | №0062 |
| bundled | №1193 (+ 1 других файлов) |
| burden | №1217 |
| burdenAliases | №0804 |
| burdens | №0804 |
| burn | №0780 (+ 1 других файлов) |
| burningOwner | №1157 |
| burningTarget | №1157 |
| bus | №0854 (+ 1 других файлов) |
| busy | №0652 |
| button | №0064 (+ 5 других файлов) |
| buttons | №0064 (+ 2 других файлов) |
| buttonsHtml | №0746 |
| buyFactor | №0801 |
| bv | №0062 (+ 2 других файлов) |
| bvh | №1205 |
| bvIndex | №1197 |
| bWis | №0825 |
| bx | №0063 (+ 1 других файлов) |
| by | №0063 |
| BY_ID | №0822 |
| byFamily | №0629 (+ 12 других файлов) |
| byLevel | №0810 |
| byName | №0665 (+ 1 других файлов) |
| BYPASS_PARCHMENT_ONCE | №0646 |
| bySource | №0629 (+ 2 других файлов) |
| byteOffset | №0070 |
| bytes | №0065 (+ 4 других файлов) |
| bytesWritten | №0890 |
| bz | №0074 |
| c | №0060 (+ 222 других файлов) |
| C | №0082 (+ 13 других файлов) |
| c0 | №0662 |
| c2 | №1334 |
| ca | №0059 (+ 1 других файлов) |
| cache | №0070 |
| CACHE_BUSTER | №0843 |
| cached | №0063 (+ 1 других файлов) |
| calcAtk | №0648 |
| calcDmgBonus | №0648 |
| calcInput | №0781 |
| calcType | №0792 |
| calcWidget | №0791 |
| calf | №0060 |
| call | №0872 |
| callback | №0887 (+ 19 других файлов) |
| callbacks | №1226 |
| called | №1246 |
| calls | №1198 (+ 3 других файлов) |
| cam | №0071 (+ 1 других файлов) |
| campaign | №1270 |
| campaigns | №0643 |
| CAN | №0810 |
| canClose | №0844 |
| candidate | №0890 |
| candidates | №0062 (+ 7 других файлов) |
| canonical | №0771 |
| cantrip | №0079 |
| cantrips | №0761 (+ 1 других файлов) |
| CANTRIPS | №0845 |
| cantripsList | №0837 |
| canvas | №0071 (+ 3 других файлов) |
| cap | №0059 (+ 6 других файлов) |
| capacity | №1229 |
| caps | №1172 |
| capStart | №0059 |
| caption | №0820 |
| card | №0793 (+ 10 других файлов) |
| cardApi | №0820 |
| cardId | №0822 |
| cards | №0656 (+ 5 других файлов) |
| CARDS | №0822 |
| caseId | №1151 |
| cases | №0664 (+ 3 других файлов) |
| cast | №1225 (+ 1 других файлов) |
| caster | №0812 (+ 3 других файлов) |
| casterLevel | №0828 |
| cat | №0068 (+ 22 других файлов) |
| catalog | №0064 (+ 5 других файлов) |
| CATALOG | №0629 (+ 15 других файлов) |
| catalogContainer | №0823 |
| catalogHtml | №0823 |
| catalogKey | №0820 |
| catalogState | №0661 |
| catalogue | №1359 |
| catalyst | №0082 |
| catalystId | №0080 (+ 1 других файлов) |
| CATALYSTS | №0080 |
| catContainer | №0792 |
| category | №0071 (+ 17 других файлов) |
| CATEGORY | №0661 |
| catLower | №0792 |
| catOk | №0803 |
| cats | №0665 |
| catStr | №0824 |
| catTitle | №0792 |
| cb | №1209 (+ 2 других файлов) |
| cbt | №1218 |
| cc | №0062 (+ 1 других файлов) |
| cd | №0780 |
| ce | №1326 (+ 1 других файлов) |
| ceiling | №0819 |
| cel | №0074 |
| celestial | №1244 |
| cell | №0062 (+ 7 других файлов) |
| CELL_FT | №0627 |
| cellFt | №0657 |
| cells | №0066 (+ 1 других файлов) |
| cellU | №0062 |
| cellV | №0062 |
| center | №0062 (+ 5 других файлов) |
| centre | №0062 |
| centres | №0062 |
| cf | №0780 (+ 1 других файлов) |
| cfg | №0062 (+ 2 других файлов) |
| cg | №0863 |
| ch | №0069 (+ 3 других файлов) |
| cha | №0629 (+ 11 других файлов) |
| chain | №0062 (+ 1 других файлов) |
| chance | №0081 (+ 2 других файлов) |
| change | №1120 |
| changed | №0879 (+ 3 других файлов) |
| CHANGELOG | №0816 |
| changes | №0828 (+ 1 других файлов) |
| channel | №0064 |
| CHANNEL_KEY | №0843 |
| channels | №0067 (+ 6 других файлов) |
| char | №0832 (+ 5 других файлов) |
| character | №0060 (+ 5 других файлов) |
| CHARACTER_CREATION_MODE | №0646 |
| CHARACTER_SAVE_SCHEMA_VERSION | №0084 |
| characters | №0832 |
| characterShape | №0649 (+ 1 других файлов) |
| charClassInputs | №0701 |
| charge | №0780 |
| chargeCount | №0079 |
| chargeDirection | №0820 |
| charges | №1241 (+ 2 других файлов) |
| charId | №0832 |
| charIndex | №0832 |
| charInfo | №0833 |
| chariot | №1217 |
| charLevel | №0832 |
| charm | №1217 |
| charmed | №0079 |
| charmedHero | №1217 |
| charmTarget | №1217 |
| charName | №0832 |
| chars | №0833 (+ 1 других файлов) |
| charTotalCopper | №0791 |
| check | №0649 (+ 11 других файлов) |
| checkbox | №0793 (+ 2 других файлов) |
| checked | №0859 (+ 11 других файлов) |
| checkedAttr | №0625 (+ 1 других файлов) |
| checks | №1151 |
| cheek | №0062 |
| chest | №1212 |
| chestUnderwear | №0062 |
| child | №0790 (+ 1 других файлов) |
| childId | №0790 |
| children | №0790 |
| chin | №0062 |
| chk | №0657 (+ 1 других файлов) |
| choice | №0654 (+ 4 других файлов) |
| choiceBlocks | №0701 |
| choices | №0064 (+ 5 других файлов) |
| chosen | №0642 (+ 4 других файлов) |
| chosenD20 | №0648 |
| chosenFeat | №0701 (+ 1 других файлов) |
| chosenMod | №0773 |
| chosenPatron | №0780 |
| chosenResistance | №0079 |
| chosenTrad | №0814 |
| chromium | №1351 (+ 37 других файлов) |
| chunk | №0070 (+ 6 других файлов) |
| chunks | №1346 (+ 1 других файлов) |
| ci | №0062 (+ 1 других файлов) |
| cid | №0079 (+ 1 других файлов) |
| cId | №0833 |
| cl | №0062 (+ 3 других файлов) |
| claim | №0075 |
| clamp | №0081 |
| class | №0701 |
| CLASS | №0079 (+ 4 других файлов) |
| CLASS_DEFS | №0776 |
| CLASS_I18N | №0796 |
| CLASS_KEYS | №0828 |
| CLASS_NAMES | №0649 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0714 |
| CLASS_TOKEN_ART | №0646 |
| classBonus | №0656 |
| classContext | №0656 |
| classData | №0701 (+ 1 других файлов) |
| classDescriptions | №0664 |
| classEntry | №0701 |
| classes | №0787 (+ 5 других файлов) |
| CLASSIC_BACKGROUND_NAMES | №0646 |
| CLASSIC_CLASS_NAMES | №0646 |
| CLASSIC_RACE_IDS | №0646 |
| classicBgs | №1337 |
| classicClasses | №1337 |
| classLevel | №0701 |
| classMatch | №0837 |
| classMeta | №0787 |
| className | №0625 (+ 7 других файлов) |
| classNameBase | №0647 |
| classNameOnly | №0625 (+ 1 других файлов) |
| classReduction | №0656 |
| classSelect | №0625 (+ 1 других файлов) |
| classStr | №0837 |
| clawLen | №0062 |
| clean | №0634 (+ 10 других файлов) |
| cleanName | №0647 |
| cleanStr | №0773 (+ 1 других файлов) |
| cleanTool | №0647 |
| clear | №0063 (+ 1 других файлов) |
| clearContainer | №0790 |
| clearInterval | №1283 (+ 5 других файлов) |
| clearTimeout | №1283 (+ 28 других файлов) |
| cleft | №0059 (+ 1 других файлов) |
| cleric | №1310 |
| click | №1212 |
| CLIENT_KEY | №0811 |
| clipped | №0062 |
| clone | №1156 (+ 5 других файлов) |
| close | №0816 (+ 1 других файлов) |
| closeBtn | №0701 |
| closedHero | №1219 |
| closedPixels | №1357 |
| cloth | №0064 (+ 3 других файлов) |
| clothBuckets | №0062 |
| clothed | №1186 (+ 1 других файлов) |
| clothes | №1160 (+ 2 других файлов) |
| clothFaces | №0062 |
| clothing | №0060 (+ 2 других файлов) |
| cloud | №1189 |
| cloudStatus | №0833 |
| cls | №0787 (+ 7 других файлов) |
| club | №0777 (+ 1 других файлов) |
| clubFeatures | №0780 |
| clubIds | №1246 |
| cm | №0780 (+ 1 других файлов) |
| cmd | №1156 |
| cmn | №1205 |
| cmx | №1205 |
| cn | №0796 (+ 1 других файлов) |
| cName | №0837 |
| co | №0074 |
| code | №0652 (+ 6 других файлов) |
| coinRef | №1218 |
| coins | №0791 |
| col | №0066 (+ 1 других файлов) |
| cold | №0064 |
| colEP | №0791 |
| collar | №0059 (+ 2 других файлов) |
| collarCount | №0059 |
| collisions | №1211 |
| colno | №0772 |
| color | №0062 (+ 4 других файлов) |
| coloredDrink | №1158 |
| coloredPotionMaker | №1158 |
| colorHex | №0869 |
| colorKey | №0833 |
| colors | №0064 (+ 1 других файлов) |
| colorType | №0079 |
| colour | №1183 |
| colourDetail | №1159 |
| colourIdat | №1183 |
| colourRaw | №1183 |
| colPP | №0791 |
| cols | №0062 (+ 1 других файлов) |
| combat | №0667 (+ 2 других файлов) |
| combatant | №0079 (+ 1 других файлов) |
| combatants | №0079 |
| command | №0831 |
| commit | №0642 |
| committed | №1190 |
| commonSaved | №1357 |
| companion | №1219 (+ 1 других файлов) |
| companionId | №1246 |
| compare | №1194 |
| comparing | №0064 |
| compat | №0843 (+ 2 других файлов) |
| compatFs | №1398 |
| compatRequire | №1398 |
| completed | №0798 |
| completedBytes | №0890 |
| component | №1205 |
| componentBytes | №1209 |
| compositions | №1348 |
| comps | №1206 |
| con | №0629 (+ 15 других файлов) |
| conc | №0828 |
| concentration | №0656 |
| cond | №0648 (+ 2 других файлов) |
| condition | №0656 (+ 3 других файлов) |
| CONDITION_ALIASES | №0828 |
| conditionHero | №1238 |
| conditionMods | №0656 |
| conditionNotes | №0773 |
| conditions | №0656 (+ 4 других файлов) |
| CONDITIONS | №0656 (+ 3 других файлов) |
| CONDITIONS_CONFIG | №0084 |
| conds | №0656 |
| conduit | №0699 |
| config | №0075 (+ 5 других файлов) |
| CONFIG | №0654 |
| confirmed | №0079 |
| conflict | №0654 |
| CONFLICT | №0080 |
| conflicts | №0080 (+ 2 других файлов) |
| conflictSet | №0080 |
| conMod | №0625 (+ 4 других файлов) |
| conModFinal | №0625 (+ 1 других файлов) |
| conScore | №0656 |
| consent | №1219 |
| console | №0664 (+ 29 других файлов) |
| constant | №0812 (+ 1 других файлов) |
| consumed | №0673 |
| consumedJinx | №0656 |
| consumer | №1226 |
| container | №0625 (+ 15 других файлов) |
| containerId | №0823 (+ 3 других файлов) |
| containers | №0784 (+ 3 других файлов) |
| content | №0794 (+ 1 других файлов) |
| contentBox | №0701 |
| contentDiv | №0773 |
| contentsWeight | №0790 |
| context | №0656 (+ 12 других файлов) |
| contextBridge | №0888 |
| contexts | №1159 (+ 1 других файлов) |
| contract | №0780 |
| contracts | №1975 |
| control | №0064 (+ 1 других файлов) |
| controller | №0654 (+ 2 других файлов) |
| controls | №0064 (+ 1 других файлов) |
| conVal | №0701 |
| converted | №0082 (+ 1 других файлов) |
| cooldown | №1155 |
| cooledAttack | №1158 |
| cooling | №1158 |
| copied | №1975 |
| COPPER | №0800 |
| copperPerElectrum | №0791 |
| copperPerGold | №0791 |
| copperPerPlat | №0791 |
| copperPerSilver | №0791 |
| copy | №0061 (+ 8 других файлов) |
| core | №0062 (+ 8 других файлов) |
| CORE | №0649 |
| CORE_CLASSES | №0661 |
| coreOwned | №0649 |
| corePositions | №0062 |
| corner | №1183 |
| corners | №0062 (+ 2 других файлов) |
| corona | №0059 |
| corpse | №0810 (+ 2 других файлов) |
| corrupt | №1171 |
| cost | №0649 (+ 14 других файлов) |
| costDie | №0780 |
| costInp | №0792 |
| count | №0062 (+ 43 других файлов) |
| counter | №0794 (+ 6 других файлов) |
| counterDamage | №0780 (+ 1 других файлов) |
| counterHero | №1238 |
| counterLeft | №0656 |
| counterReduction | №0656 (+ 1 других файлов) |
| counterState | №0656 |
| countInput | №0794 |
| counts | №0059 (+ 3 других файлов) |
| countToRead | №0070 |
| coverBonus | №0656 (+ 1 других файлов) |
| covered | №0063 (+ 1 других файлов) |
| coveredCount | №1387 |
| cp | №0062 (+ 17 других файлов) |
| cPerS | №0791 |
| cpInput | №0791 |
| cpVal | №0791 |
| cr | №0629 (+ 15 других файлов) |
| CR | №0810 |
| CR_BY_MONSTER | №0809 |
| CR_RANK | №0809 |
| craft | №0629 (+ 21 других файлов) |
| craftBase | №0628 |
| craftBonus | №0666 (+ 1 других файлов) |
| crafted | №0665 |
| CRAFTING_BACKGROUND_PROFILES | №0673 |
| CRAFTING_CLASS_PROFILES | №0673 |
| CRAFTING_FEAT_PROFILES | №0673 |
| CRAFTING_RACE_PROFILES | №0673 |
| craftingProfile | №0673 |
| craftModifier | №0673 |
| craftNotes | №0673 |
| createContainer | №0790 |
| created | №0819 |
| creationScreen | №0625 (+ 1 других файлов) |
| creatures | №0687 |
| CREATURES | №0775 |
| crest | №0062 |
| crit | №1238 |
| critical | №0656 (+ 3 других файлов) |
| criticalRange | №0656 |
| critNote | №0773 (+ 1 других файлов) |
| critTarget | №1238 |
| cross | №0063 (+ 1 других файлов) |
| crowd | №0656 (+ 1 других файлов) |
| crowdCondition | №0780 |
| crowdDC | №0780 |
| crowdHero | №1238 |
| crowdResults | №0780 |
| crowdSave | №0656 |
| crowdTarget | №1238 |
| crowdTargets | №0780 |
| crown | №0062 |
| crownDiagnostics | №1361 |
| crownOff | №1361 |
| crypto | №0890 (+ 54 других файлов) |
| cs | №0062 (+ 11 других файлов) |
| csel | №0807 |
| ct | №0062 |
| ctx | №0073 (+ 136 других файлов) |
| ctx2d | №0064 |
| cuff | №0063 |
| cum | №0062 |
| cup | №0063 (+ 1 других файлов) |
| cupChoice | №0820 |
| cupNumber | №1231 |
| cupPC | №1217 |
| cupPhone | №1217 |
| cupProfiles | №1217 |
| cupResult | №0820 |
| cupRoster | №1217 |
| cups | №0063 |
| cupsBack | №1217 |
| cupServer | №1217 |
| cupsPending | №0820 |
| cur | №0081 (+ 4 других файлов) |
| curHp | №0780 |
| curl | №0062 |
| current | №0059 (+ 13 других файлов) |
| currentActiveId | №0832 |
| currentChar | №0084 |
| currentCharacterId | №0084 |
| currentClass | №0701 |
| currentColor | №0869 |
| currentCurrHp | №0825 |
| currentDim | №0869 |
| currentExp | №0781 |
| currentHero | №0833 (+ 1 других файлов) |
| currentHound | №0780 |
| currentHp | №0079 (+ 1 других файлов) |
| currentHP | №0870 |
| currentInventoryCategory | №0794 |
| currentLevelExpReq | №0781 |
| currentLevelInClass | №0714 |
| currentLvl | №0781 (+ 1 других файлов) |
| currentMax | №0701 |
| currentModalColor | №0869 |
| currentModalOpacity | №0869 |
| currentOpacity | №0869 |
| currentPact | №0799 |
| currentProfsIds | №0823 |
| currentProgress | №0844 |
| currentRollMode | №0773 |
| currentRound | №0656 |
| currentSpent | №0625 (+ 1 других файлов) |
| currentStep | №0083 |
| currentTime | №0798 |
| currentTrack | №0083 |
| currentTrackIndex | №0083 |
| currentVal | №0625 (+ 3 других файлов) |
| currentVersion | №0833 (+ 1 других файлов) |
| currentVolume | №0083 |
| currentWallpaperIndex | №0869 |
| currId | №0833 |
| curse | №0780 |
| curseActor | №0656 |
| curseEffect | №0780 |
| curseId | №0780 |
| curseKnown | №0689 |
| curseMax | №0780 |
| curseNames | №0642 |
| curses | №0078 (+ 1 других файлов) |
| curseSaveMods | №0656 |
| curSides | №0648 |
| curStat | №0648 |
| curve | №0062 |
| custom | №0063 (+ 1 других файлов) |
| customBtn | №0794 (+ 1 других файлов) |
| customElem | №0797 |
| customGather | №0826 |
| customRaces | №0825 |
| customSkinCharacter | №1160 |
| customTestSource | №0843 |
| cut | №0062 (+ 1 других файлов) |
| cutFaces | №0059 |
| cv | №0062 (+ 2 других файлов) |
| cw | №1183 |
| cwd | №1156 |
| cx | №0062 (+ 7 других файлов) |
| cy | №0059 (+ 7 других файлов) |
| cycles | №0666 |
| cz | №0062 (+ 5 других файлов) |
| d | №0060 (+ 84 других файлов) |
| D | №0059 (+ 23 других файлов) |
| d00 | №1205 (+ 2 других файлов) |
| d01 | №1205 (+ 2 других файлов) |
| d1 | №1205 (+ 3 других файлов) |
| d11 | №1205 (+ 2 других файлов) |
| d2 | №1205 (+ 3 других файлов) |
| d20 | №0656 (+ 4 других файлов) |
| d20_1 | №0648 |
| d20_2 | №0648 |
| d20Button | №0649 |
| d20Details | №0648 |
| d20Result | №0773 (+ 1 других файлов) |
| d21 | №1205 (+ 2 других файлов) |
| d3 | №1205 (+ 3 других файлов) |
| d4 | №1205 (+ 3 других файлов) |
| d5 | №1205 (+ 3 других файлов) |
| d6 | №1205 (+ 3 других файлов) |
| da | №1183 |
| damage | №0075 (+ 21 других файлов) |
| DAMAGE_TYPES | №0656 |
| damageBeforeWard | №0656 |
| damageButton | №0649 |
| damaged | №0665 |
| damageOpts | №0656 |
| damageParts | №0656 |
| damageResult | №0812 |
| damageStr | №0792 |
| damageString | №0773 (+ 1 других файлов) |
| damageTaken | №0656 |
| dark | №0062 (+ 2 других файлов) |
| data | №0064 (+ 40 других файлов) |
| dataDir | №1348 (+ 1 других файлов) |
| dataStr | №0833 |
| DataView | №1161 (+ 21 других файлов) |
| Date | №0664 (+ 66 других файлов) |
| dateStr | №0833 |
| day | №0800 |
| db | №0714 (+ 4 других файлов) |
| dbg | №1282 (+ 1 других файлов) |
| dbItem | №0793 (+ 1 других файлов) |
| dbNameLower | №0647 |
| dc | №0075 (+ 26 других файлов) |
| dcElem | №0655 (+ 1 других файлов) |
| dcValue | №0817 |
| dd | №0074 (+ 1 других файлов) |
| deadAlly | №1158 |
| dealUses | №0780 |
| deathSaveFailures | №0656 |
| deb | №0079 |
| debuffs | №0656 (+ 1 других файлов) |
| debug | №1120 |
| debugBtn | №0772 |
| debugContainer | №0833 (+ 1 других файлов) |
| debugToggle | №0833 |
| debugWrapper | №0833 |
| deception | №0079 |
| deck | №0820 (+ 5 других файлов) |
| DECLARATIVE_FEATURES | №0649 |
| declared | №1219 |
| decodeURIComponent | №1296 (+ 1 других файлов) |
| deduction | №0642 |
| def | №0067 (+ 6 других файлов) |
| DEFAULT | №0072 |
| DEFAULT_CAPACITY | №0790 |
| DEFAULT_CHANNEL | №0843 |
| DEFAULT_COLS | №0627 |
| DEFAULT_ENABLED | №0667 |
| DEFAULT_ICON | №0833 (+ 2 других файлов) |
| DEFAULT_MANIFEST_URL | №0843 |
| DEFAULT_RACES | №0825 |
| DEFAULT_ROWS | №0627 |
| defaultIcon | №0889 |
| defaultMode | №0792 |
| defaultModel | №0807 |
| defaults | №0067 (+ 2 других файлов) |
| defaultType | №0792 |
| defaultValue | №0792 |
| defender | №1238 (+ 1 других файлов) |
| defenderClasses | №0656 |
| defenses | №0792 (+ 1 других файлов) |
| defensesContainer | №0792 |
| defer | №0812 |
| deflect | №0656 |
| deflected | №1157 |
| defs | №0067 (+ 4 других файлов) |
| DEFS | №0819 |
| delay | №0654 (+ 1 других файлов) |
| delayedBomb | №1158 |
| delBtn | №0794 (+ 1 других файлов) |
| deleteBtn | №0813 |
| deleted | №0654 |
| delta | №0059 (+ 18 других файлов) |
| demolitionOwner | №1158 |
| demolitionResult | №1158 |
| demolitionTarget | №0079 (+ 1 других файлов) |
| den | №0062 (+ 7 других файлов) |
| denied | №1233 |
| denLabel | №0064 |
| denOpacity | №0063 |
| dense | №1368 |
| denValues | №0063 |
| dependency | №1975 |
| depth | №0062 (+ 4 других файлов) |
| deputy | №1151 |
| derived | №1975 |
| derivedAssets | №0072 |
| desc | №0671 (+ 7 других файлов) |
| descBox | №0625 (+ 2 других файлов) |
| descElem | №0797 |
| descInp | №0792 |
| descInput | №0825 |
| description | №0649 (+ 2 других файлов) |
| descriptor | №1161 (+ 1 других файлов) |
| descText | №0625 (+ 1 других файлов) |
| descVal | №0825 |
| desired | №0059 (+ 2 других файлов) |
| DesktopWebUpdater | №0887 (+ 2 других файлов) |
| dest | №0076 (+ 4 других файлов) |
| destination | №0819 (+ 2 других файлов) |
| destinations | №0819 |
| detail | №0851 (+ 3 других файлов) |
| details | №0064 (+ 4 других файлов) |
| detailsElem | №0797 |
| detailsHtml | №0794 |
| detailText | №0773 (+ 1 других файлов) |
| developmentGate | №1155 |
| device | №1217 |
| devModal | №0833 |
| dex | №0629 (+ 14 других файлов) |
| dexHero | №1238 (+ 1 других файлов) |
| dexInput | №0825 |
| dexMod | №0625 (+ 6 других файлов) |
| dexSave | №1238 |
| dexScore | №0656 (+ 1 других файлов) |
| dexStats | №0656 |
| df | №0780 |
| di | №0656 (+ 1 других файлов) |
| diag | №1171 (+ 9 других файлов) |
| diagnostics | №1348 |
| diagonal | №0821 (+ 1 других файлов) |
| diagonals | №0821 |
| dialectAliases | №0829 |
| DIALECTS | №0829 |
| dice | №0780 (+ 9 других файлов) |
| DICE_ICONS | №0833 (+ 2 других файлов) |
| diceCount | №0773 (+ 3 других файлов) |
| diceCountInp | №0792 |
| diceDir | №0889 |
| diceFiles | №0889 |
| diceMatch | №0773 |
| diceMax | №1184 |
| diceMin | №1184 |
| diceOptions | №0648 |
| diceRegex | №0837 |
| dices | №0792 |
| diceSides | №0773 (+ 1 других файлов) |
| diceSpent | №0079 |
| diceTab | №0773 |
| diceTypes | №0648 |
| die | №0082 (+ 7 других файлов) |
| DIE | №0642 (+ 1 других файлов) |
| dieSides | №0812 |
| diff | №0701 (+ 1 других файлов) |
| dig | №1239 |
| digDeep | №0656 |
| digDeepTypes | №0656 |
| digit | №0062 |
| digits | №0062 |
| dimLayer | №0869 |
| dir | №0062 (+ 10 других файлов) |
| dire | №0780 |
| direct | №0066 |
| directCompatible | №1209 |
| direction | №0819 (+ 2 других файлов) |
| directions | №0819 |
| direMax | №0780 |
| DIRS | №0821 |
| dirty | №0780 (+ 1 других файлов) |
| dirtyApplied | №0780 |
| dirtyDC | №0780 |
| dirtyHero | №1238 |
| dirtyResource | №0780 |
| dirtySave | №0780 |
| dirtyTarget | №1238 |
| dis | №0656 (+ 2 других файлов) |
| disable | №0793 |
| disabled | №0820 |
| disBtn | №0794 |
| disc | №0062 (+ 2 других файлов) |
| discharge | №1157 |
| dischargeTarget | №1157 |
| disciplineAliases | №0830 |
| disciplineByPower | №0780 |
| disciplines | №0830 |
| discover | №0080 |
| discoveries | №0079 |
| discovery | №0079 |
| discoveryLevel | №0079 |
| discoveryName | №0079 |
| discoveryRecipes | №0079 |
| disguise | №1237 |
| displacement | №1202 |
| display | №0701 (+ 1 других файлов) |
| displayedAC | №0828 |
| displayName | №0625 (+ 3 других файлов) |
| displaySpeed | №0784 |
| displayStyle | №0837 |
| dist | №0062 (+ 5 других файлов) |
| distal | №0062 |
| distance | №0062 (+ 4 других файлов) |
| distanceFt | №0819 (+ 1 других файлов) |
| distanceRolled | №0819 |
| distances | №1205 (+ 2 других файлов) |
| div | №0701 |
| dl | №0062 (+ 1 других файлов) |
| dm | №0812 (+ 1 других файлов) |
| dmg | №0079 (+ 7 других файлов) |
| dmgBonus | №0648 |
| dn | №0062 |
| DND_CLASSES_LIST | №0625 (+ 1 других файлов) |
| DND_DAMAGE_TYPES | №0792 |
| DND_SKILLS_LIST | №0792 |
| DND_WEAPON_CATEGORIES | №0792 |
| DND_WEAPON_PROPERTIES | №0792 |
| dndBackgrounds | №0625 |
| dndModal | №0701 |
| doc | №1282 (+ 2 других файлов) |
| document | №1159 |
| dom | №1212 |
| dome | №0062 |
| domReady | №1304 (+ 1 других файлов) |
| done | №0843 (+ 3 других файлов) |
| donor | №0814 |
| dot | №0059 |
| down | №0076 |
| download | №1362 |
| downloadAnchor | №0833 |
| downloads | №1193 |
| dr | №0780 (+ 2 других файлов) |
| draft | №0819 (+ 2 других файлов) |
| DRAFT | №0061 |
| drag | №0864 |
| dragon | №1308 |
| dragonGraft | №0079 |
| draw | №0784 (+ 4 других файлов) |
| drawer | №0794 |
| drawerContainer | №0773 |
| drawerContent | №0773 |
| drawWindow | №0774 |
| dreadAttack | №1238 |
| dreadHandHero | №1238 |
| dreadHero | №1238 |
| dreadTarget | №1238 |
| dress | №1169 |
| drop | №0062 |
| dry | №1192 |
| ds | №0656 (+ 1 других файлов) |
| dst | №0070 (+ 1 других файлов) |
| dt | №0062 (+ 2 других файлов) |
| du | №0059 |
| duplicates | №1392 |
| duplicityMiss | №0656 |
| duplicityTarget | №0656 |
| dupRoll | №0656 |
| durability | №0800 (+ 1 других файлов) |
| duration | №0870 |
| durationMs | №0083 |
| durationSeconds | №0870 |
| dv | №0059 (+ 3 других файлов) |
| dwarf | №0067 |
| dwarfDesc | №0664 |
| dx | №0059 (+ 13 других файлов) |
| dy | №0059 (+ 12 других файлов) |
| dynamicContainer | №0794 |
| dynamoAttack | №1158 |
| dz | №0059 (+ 5 других файлов) |
| dzdt | №0059 |
| e | №0059 (+ 151 других файлов) |
| E | №0810 |
| e0 | №0064 (+ 1 других файлов) |
| each | №0649 |
| ear | №0062 |
| earOuter | №0062 |
| ears | №0062 (+ 1 других файлов) |
| earVertices | №1172 |
| eb | №0062 (+ 1 других файлов) |
| ec | №0780 |
| eco | №1268 |
| econ | №0666 (+ 1 других файлов) |
| ECON | №0665 |
| edge | №0062 |
| edges | №0062 |
| editor | №0888 (+ 1 других файлов) |
| editorWeaponPresets | №0064 |
| ef | №0079 (+ 1 других файлов) |
| eff | №0780 |
| effect | №0079 (+ 3 других файлов) |
| effectApplies | №0656 |
| effectiveD20 | №0656 |
| effectiveDiceCount | №0773 |
| effectiveMode | №0773 |
| effectMap | №0079 |
| effects | №0675 (+ 2 других файлов) |
| EFFECTS | №0081 |
| effectSerial | №0642 |
| eid | №0810 (+ 1 других файлов) |
| eInput | №0791 |
| el | №0071 (+ 28 других файлов) |
| elapsed | №0879 |
| elBar | №0781 |
| elCurExp | №0781 |
| elCurLvl | №0781 |
| elDesc | №0825 |
| electromagneticShield | №0656 |
| elem | №1308 |
| element | №0780 |
| elementId | №0794 |
| elements | №1159 (+ 3 других файлов) |
| elementsToHide | №0869 |
| elId | №0793 |
| eligible | №0822 |
| elInputCur | №0781 |
| ellipse | №0059 |
| elName | №0825 |
| elNextExp | №0781 |
| elSpeed | №0825 |
| email | №0652 (+ 1 других файлов) |
| embedded | №0822 |
| emojis | №0773 |
| empty | №0062 |
| emptyMsg | №0792 |
| enabled | №0060 (+ 3 других файлов) |
| encoded | №0819 |
| encodeURIComponent | №1296 (+ 1 других файлов) |
| encounter | №0806 |
| end | №0062 (+ 4 других файлов) |
| ended | №0819 |
| ends | №0075 |
| endY | №0063 |
| enemies | №0819 |
| enemy | №0873 (+ 4 других файлов) |
| enemyHP | №1248 |
| energyDamage | №0079 |
| energyResult | №0079 |
| energySeamTarget | №1157 |
| engine | №1295 |
| englishName | №0779 |
| engName | №0701 (+ 1 других файлов) |
| enhancedAttack | №1238 |
| enhancedTarget | №1238 |
| entity | №0079 (+ 2 других файлов) |
| entries | №0654 (+ 8 других файлов) |
| entry | №0064 (+ 18 других файлов) |
| entryId | №0797 |
| env | №1213 (+ 1 других файлов) |
| envelope | №0059 |
| ep | №0780 (+ 2 других файлов) |
| epInput | №0791 |
| epoch | №0654 |
| eprof | №0812 |
| eps | №0059 (+ 2 других файлов) |
| epsilon | №0063 |
| epVal | №0791 |
| equipCheckbox | №0794 |
| equipLabel | №0794 |
| equipment | №0067 |
| equippedWeapon | №0773 |
| er | №0062 (+ 1 других файлов) |
| err | №0064 (+ 4 других файлов) |
| error | №0064 (+ 1 других файлов) |
| errorCount | №0772 |
| errors | №0662 (+ 40 других файлов) |
| es | №0081 |
| esc | №0071 (+ 1 других файлов) |
| escape | №1296 (+ 2 других файлов) |
| ev | №0784 (+ 6 других файлов) |
| evasion | №0656 |
| event | №0075 (+ 15 других файлов) |
| EVENT_LIMIT | №0811 |
| eventAttacker | №0656 |
| eventBox | №0820 |
| eventChainHeadHash | №0811 |
| eventLabel | №0820 |
| eventLogBaseHash | №0811 |
| eventLogBaseSeq | №0811 |
| eventPC | №1217 |
| eventPhone | №1217 |
| eventRoster | №1217 |
| events | №0811 (+ 6 других файлов) |
| eventServer | №1217 |
| eventText | №0820 |
| evo | №1308 |
| evt | №1159 |
| ex | №0062 (+ 1 других файлов) |
| exact | №0662 (+ 2 других файлов) |
| excess | №0780 |
| executionScene | №0819 |
| exhaustion | №0826 |
| exhaustionNow | №0656 |
| exhaustionRestKey | №0648 (+ 1 других файлов) |
| exhaustionText | №0826 |
| existing | №0075 (+ 9 других файлов) |
| existingClass | №0787 |
| existingClassEntry | №0701 |
| existingOverlay | №0773 |
| exists | №0647 (+ 1 других файлов) |
| existsL | №0647 |
| exp | №0781 |
| expand | №0063 |
| expanded | №0064 |
| expBasedLevel | №0781 |
| expected | №0079 (+ 4 других файлов) |
| expectedRevision | №0822 |
| expert | №1232 |
| expiration | №1247 |
| expired | №1238 |
| expires | №0834 |
| explicit | №1160 |
| exploitContract | №0780 |
| exploits | №0873 |
| explored | №0075 |
| exposureActor | №0656 |
| expr | №0649 (+ 7 других файлов) |
| expression | №0780 |
| ext | №0074 (+ 4 других файлов) |
| external | №0060 (+ 1 других файлов) |
| externalCalls | №1198 |
| externalJson | №1198 |
| externalPanels | №0773 |
| extra | №0062 (+ 31 других файлов) |
| EXTRA | №0644 |
| EXTRA_RULES | №0080 |
| EXTRA_TRIGGER | №0081 |
| EXTRA_TYPES | №0646 |
| extraACBonus | №0794 |
| extraAtk | №0812 |
| extraClass | №0701 |
| extraClasses | №1337 |
| extraDamages | №0792 |
| extraData | №0794 (+ 1 других файлов) |
| extraDmg | №0812 |
| extraDmgContainer | №0792 |
| extraLine | №0746 |
| extraLocked | №0701 |
| extraName | №0701 (+ 1 других файлов) |
| extrapolated | №1348 |
| extras | №0064 (+ 3 других файлов) |
| extraType | №0701 |
| exts | №0889 |
| ey | №0062 |
| eye | №0062 (+ 1 других файлов) |
| eyeBtn | №0869 |
| eyeIsland | №0062 |
| eyePart | №0062 |
| eyes | №0062 (+ 2 других файлов) |
| eyeSave | №1361 |
| eyesDiag | №1361 |
| eyesOff | №1361 |
| eyeWeight | №0062 |
| eyeX | №0062 |
| eyeY | №0062 |
| eyeZ | №0062 |
| ez | №0062 |
| f | №0060 (+ 116 других файлов) |
| F | №1307 (+ 4 других файлов) |
| fa | №0780 |
| face | №0059 (+ 2 других файлов) |
| faceParts | №0064 |
| faces | №0059 (+ 3 других файлов) |
| facing | №0062 |
| FACTIONS | №0633 |
| factor | №0059 (+ 4 других файлов) |
| factory | №0828 |
| fadeInterval | №0083 |
| fadeTimer | №0798 |
| fail | №1254 (+ 1 других файлов) |
| failed | №1156 (+ 2 других файлов) |
| failedSave | №0834 |
| fall | №1303 |
| fallback | №0062 (+ 7 других файлов) |
| FALLBACK_MANIFEST_URL | №0843 |
| fallbackName | №0714 |
| fallbackText | №0773 |
| false | №0780 (+ 6 других файлов) |
| fam | №0630 (+ 10 других файлов) |
| familiarForms | №0780 |
| FAMILIES | №0629 |
| family | №0629 (+ 1 других файлов) |
| FAMILY_BY_CREATURE | №0775 |
| FAMILY_DEFS | №0775 |
| FAMILY_NAMES | №0630 (+ 11 других файлов) |
| familyId | №0775 |
| familyOpts | №0775 |
| fangs | №0062 |
| fangsOff | №1361 |
| fans | №1181 |
| fantasy | №1359 |
| fantasySaved | №1359 |
| fApplied | №0780 |
| faq | №0816 |
| FAQ | №0816 |
| far | №0074 (+ 1 других файлов) |
| fat | №0062 |
| fatalHit | №1238 |
| fateMax | №0649 |
| fc | №0074 |
| fd | №0079 |
| fdc | №0780 |
| fdmg | №0780 |
| fearSave | №0780 |
| feat | №0649 (+ 2 других файлов) |
| FEAT_STAT_LABELS | №0746 |
| FEAT_VALID_STATS | №0746 |
| featActionHtml | №0746 |
| featDesc | №0746 |
| featherHead | №0064 |
| featherKind | №0064 |
| featherPart | №0064 |
| featName | №0746 |
| featObj | №0701 (+ 1 других файлов) |
| feats | №0626 (+ 2 других файлов) |
| featsOptions | №0701 |
| feature | №0079 (+ 3 других файлов) |
| FEATURE_DEFS | №0649 |
| FEATURE_TARGET_RULES | №0812 |
| featureDescStr | №0625 (+ 1 других файлов) |
| featureHtml | №0625 (+ 2 других файлов) |
| featureIds | №0662 (+ 1 других файлов) |
| featureIndex | №0662 |
| featureLevel | №0662 |
| featureList | №0714 |
| featureLists | №0649 |
| featureMeta | №0649 |
| featureMod | №0656 |
| featureMode | №0656 |
| features | №0079 (+ 9 других файлов) |
| featuresHtml | №0701 |
| featuresList | №0701 |
| featureStr | №0625 (+ 1 других файлов) |
| fecund | №0780 |
| feet | №0062 (+ 3 других файлов) |
| female | №0063 (+ 5 других файлов) |
| femalePositions | №1161 |
| fer | №0657 |
| ferocity | №1246 |
| fetched | №0843 |
| ff | №0074 (+ 1 других файлов) |
| fgm | №1310 |
| fi | №0062 (+ 3 других файлов) |
| fid | №0649 (+ 4 других файлов) |
| field | №0062 (+ 9 других файлов) |
| fieldLengths | №1207 |
| fields | №1226 (+ 3 других файлов) |
| fiend | №1244 |
| fight | №0819 |
| fighter | №1307 (+ 1 других файлов) |
| fighters | №0820 |
| fightingPack | №0656 |
| fightingResource | №0656 |
| fightingResult | №0656 |
| fightingStyleEffects | №0780 |
| file | №0833 (+ 56 других файлов) |
| fileNo | №1392 |
| filePath | №0869 |
| files | №0670 (+ 11 других файлов) |
| fileUrl | №0890 |
| filter | №0082 (+ 3 других файлов) |
| filteredItems | №0837 |
| filters | №0646 (+ 1 других файлов) |
| filterText | №0746 |
| final | №0780 (+ 1 других файлов) |
| finalAC | №0794 |
| finalAttackTotal | №0773 |
| finalCount | №0673 |
| finalData | №0792 |
| finalName | №0792 |
| finalPropsString | №0792 |
| finalSkillModifier | №0773 |
| finalStats | №0625 (+ 1 других файлов) |
| finalTotal | №0773 (+ 1 других файлов) |
| fingerless | №0062 |
| fins | №0062 |
| finsOff | №1361 |
| fire | №0844 |
| fireFront | №0844 |
| fireRoll | №0079 |
| first | №0059 (+ 9 других файлов) |
| firstFace | №1209 |
| firstVertex | №1209 |
| fit | №0064 (+ 5 других файлов) |
| fitted | №0062 (+ 2 других файлов) |
| fixture | №1178 |
| flags | №0657 |
| flare | №0063 |
| flat | №1181 |
| fleeing | №1217 |
| fleePhone | №1217 |
| flexible | №1158 |
| flexibleInstall | №1158 |
| Float32Array | №1159 (+ 23 других файлов) |
| Float64Array | №1164 (+ 2 других файлов) |
| floor | №0062 (+ 3 других файлов) |
| FLOOR | №0073 |
| floorAttack | №1238 |
| floorHero | №1238 |
| floorHpBefore | №1238 |
| floorMod | №1239 |
| floors | №0077 |
| floorTarget | №1238 (+ 1 других файлов) |
| floorTypes | №0077 |
| flush | №1159 |
| flyer | №1238 |
| fm | №0656 (+ 1 других файлов) |
| fm2 | №1310 |
| fn | №0059 (+ 30 других файлов) |
| focus | №0059 (+ 1 других файлов) |
| focusEl | №0816 |
| focusSources | №0837 |
| foe | №1221 (+ 1 других файлов) |
| fog | №1213 |
| fogShade | №0074 |
| fold | №0062 |
| folder | №1346 |
| folderId | №0813 |
| fontKey | №0833 |
| fontObj | №0833 |
| fontSelect | №0833 |
| fontStyleTag | №0833 |
| foot | №0062 (+ 1 других файлов) |
| footH | №0062 |
| force | №0800 (+ 1 других файлов) |
| forceCrit1 | №0773 |
| forced | №0819 |
| forceSlot | №0845 |
| forearmHigh | №0062 |
| forearmLow | №0062 |
| foreign | №1247 |
| fork | №0062 |
| form | №0062 (+ 5 других файлов) |
| formattedText | №0701 |
| formula | №0642 (+ 3 других файлов) |
| formulaDamage | №0079 |
| formulae | №0079 |
| formulaEffects | №0079 |
| formulaHero | №1158 |
| formulaIds | №0780 |
| formulas | №0642 (+ 1 других файлов) |
| fortifying | №0780 |
| fortune | №0828 |
| forward | №0062 (+ 1 других файлов) |
| found | №0063 (+ 16 других файлов) |
| foundIdx | №0869 |
| foundItemData | №0793 |
| foundProf | №0823 |
| foundWeapon | №0824 (+ 1 других файлов) |
| fov | №0074 |
| fr | №0687 (+ 1 других файлов) |
| fR1 | №0773 (+ 1 других файлов) |
| fR2 | №0773 (+ 1 других файлов) |
| fragHighp | №0074 |
| frame | №0062 (+ 25 других файлов) |
| frameColorSelect | №0833 |
| frameKey | №0833 |
| frames | №1176 |
| frameStyleSelect | №0833 |
| framework | №1230 |
| free | №0062 (+ 2 других файлов) |
| freeGather | №0879 |
| fresh | №0062 (+ 3 других файлов) |
| friend | №1217 (+ 2 других файлов) |
| frill | №0062 |
| from | №0633 (+ 4 других файлов) |
| front | №0060 (+ 4 других файлов) |
| frontal | №0062 |
| frontCount | №0062 |
| frontPlate | №0062 |
| frontTop | №0063 |
| fs | №0064 (+ 228 других файлов) |
| fsave | №0780 |
| fsp | №0887 (+ 1 других файлов) |
| ft | №0780 |
| full | №1193 (+ 1 других файлов) |
| FULL | №0799 |
| FULL_CASTER_SLOTS_TABLE | №0837 |
| FULL_CASTERS | №0828 |
| FULL_SLOTS | №0828 |
| fullCoat | №0064 |
| fullData | №0746 |
| fullPath | №0887 |
| fur | №0064 (+ 1 других файлов) |
| furEnabled | №0064 |
| furryAccessory | №0064 |
| furryLimb | №0064 |
| furrySkull | №0064 |
| furSelect | №0064 |
| fuseMinutes | №0079 |
| fuseRounds | №0079 |
| future | №0064 (+ 1 других файлов) |
| fv | №0780 |
| fx | №0062 (+ 2 других файлов) |
| fy | №0062 (+ 1 других файлов) |
| g | №0060 (+ 151 других файлов) |
| G | №0082 |
| g1 | №0073 |
| gain | №0670 (+ 4 других файлов) |
| gained | №0657 (+ 1 других файлов) |
| gainedHp | №0787 |
| gameplay | №1295 |
| gameTool | №0647 |
| gap | №0063 |
| garment | №0063 |
| garments | №0062 |
| GATE_TOWNS | №0633 |
| gather | №0826 |
| GATHERING_ACTIONS | №0826 |
| gb | №1205 (+ 4 других файлов) |
| gdiag | №1206 (+ 1 других файлов) |
| ge | №0780 |
| gem | №0819 |
| gender | №0063 (+ 7 других файлов) |
| generated | №1268 (+ 1 других файлов) |
| generatedHarvest | №1268 |
| generatedPath | №1975 |
| generation | №0654 |
| GENERIC_SPECIALTIES | №0671 |
| geo | №0060 (+ 24 других файлов) |
| geometryKey | №1168 |
| geoTarget | №0812 |
| gesture | №0064 (+ 1 других файлов) |
| getData | №0714 |
| getStat | №0787 |
| getSub | №0714 |
| ghostBounds | №0064 |
| ghostForbiddenSlots | №0064 |
| ghostShellTarget | №0647 |
| ghostWeapon | №0064 |
| gi | №0656 |
| gills | №0062 |
| git | №1340 (+ 3 других файлов) |
| gl | №0062 (+ 23 других файлов) |
| glb | №1205 (+ 7 других файлов) |
| glbPath | №1197 (+ 6 других файлов) |
| glbVertices | №1209 |
| glen | №0062 |
| global | №0833 (+ 84 других файлов) |
| globalAudio | №0083 |
| glove | №0062 |
| gn | №0780 |
| gname | №0780 |
| gnome | №0067 |
| gob | №1270 |
| gold | №0064 |
| goldNeeded | №0666 |
| goldOwner | №0820 |
| goldRef | №0820 |
| golemCraft | №1158 |
| golemEntities | №1158 |
| golemEntity | №1158 |
| golemRestore | №1158 |
| good | №0642 (+ 1 других файлов) |
| got | №0080 (+ 2 других файлов) |
| gp | №0791 (+ 7 других файлов) |
| gPerE | №0791 |
| gpInput | №0791 |
| gpVal | №0791 |
| gradle | №0889 |
| graftAC | №0656 |
| graftArmorAttack | №1157 |
| graftArmorTarget | №1157 |
| graftCriticalAttack | №1157 |
| graftCriticalTarget | №1157 |
| graftDef | №0079 |
| graftInstalled | №1158 |
| graftMissingDonor | №1158 |
| graftName | №0079 |
| graftRemoved | №1158 |
| graftResistant | №0656 |
| grafts | №0079 (+ 1 других файлов) |
| grant | №0674 |
| granted | №0079 (+ 1 других файлов) |
| grantMaterial | №0669 |
| gray | №0064 |
| grid | №0833 (+ 7 других файлов) |
| grip | №0062 (+ 1 других файлов) |
| groom | №0062 |
| groove | №0059 |
| ground | №0062 (+ 1 других файлов) |
| group | №0059 (+ 8 других файлов) |
| grouped | №0649 |
| groupedFeats | №0701 |
| groupFeats | №0701 |
| groupKey | №0746 |
| groupKeys | №0823 |
| groupName | №0823 |
| groupOrder | №0746 |
| groupRolls | №0837 |
| groups | №0062 (+ 4 других файлов) |
| groupsMap | №0823 |
| groupTitle | №0792 |
| growth | №1238 |
| growthAttack | №1238 |
| growthTarget | №1238 |
| gs | №1206 |
| guard | №0784 (+ 2 других файлов) |
| guide | №1271 (+ 3 других файлов) |
| guildDesc | №0664 |
| gw | №1397 |
| h | №0060 (+ 127 других файлов) |
| H | №0060 (+ 10 других файлов) |
| h2 | №1307 |
| h3 | №1230 (+ 1 других файлов) |
| h4 | №1307 |
| hab | №0629 |
| habitat | №0064 (+ 1 других файлов) |
| habitats | №0064 |
| hadSpeedZero | №0784 |
| hair | №0060 (+ 2 других файлов) |
| hairLength | №0062 |
| hairProfiles | №0062 |
| hairs | №0062 (+ 1 других файлов) |
| half | №0062 (+ 2 других файлов) |
| HALF_CASTERS | №0828 |
| hand | №0062 (+ 1 других файлов) |
| handle | №0890 |
| handleAdd | №0792 |
| handleAddClick | №0792 |
| handleArmorCatSelect | №0792 |
| handleCatSelect | №0792 |
| handleDel | №0792 |
| handleDiceSelect | №0792 |
| handlePropToggle | №0792 |
| handler | №0843 (+ 1 других файлов) |
| handlers | №0649 (+ 1 других файлов) |
| HANDLERS | №0819 |
| handleTabClick | №0794 |
| handMax | №1171 |
| handoffCalls | №1330 |
| hands | №0062 |
| harness | №1374 |
| harvest | №1258 (+ 1 других файлов) |
| hasActiveModal | №0841 |
| hasAoe | №0812 |
| hasAutoStarted | №0083 |
| hasDex | №0780 |
| hasDice | №0837 |
| hasFirearmsAll | №0824 |
| hasGraft | №0079 |
| hash | №0843 (+ 4 других файлов) |
| hashes | №1178 (+ 6 других файлов) |
| hasMagic | №0837 |
| hasMartialAll | №0824 |
| hasProf | №0874 |
| hasProficiency | №0794 |
| hasSimpleAll | №0824 |
| hasSpecificProf | №0824 |
| hasTool | №0669 (+ 2 других файлов) |
| hasUV | №0064 |
| hat | №0062 (+ 4 других файлов) |
| have | №0666 (+ 1 других файлов) |
| hay | №0794 (+ 1 других файлов) |
| haymaker | №1238 |
| hayTarget | №1238 |
| hb | №1205 (+ 4 других файлов) |
| hCls | №0837 |
| hctx | №1330 |
| hd | №0814 (+ 1 других файлов) |
| hdiag | №1211 |
| head | №0059 (+ 5 других файлов) |
| HEAD_AXES | №0067 |
| HEAD_FORMS | №0067 |
| HEAD_STYLES | №0067 |
| header | №0828 (+ 1 других файлов) |
| headerAC | №0084 |
| headers | №0654 (+ 2 других файлов) |
| heading | №0773 |
| headMax | №1171 |
| heal | №0780 (+ 2 других файлов) |
| heal2 | №0780 |
| healAmount | №0820 |
| healBatch | №1330 |
| healCaster | №0820 |
| healDeclared | №0820 |
| healed | №0079 (+ 9 других файлов) |
| healer | №0642 |
| healEventId | №0820 |
| healing | №0872 (+ 2 других файлов) |
| healingActors | №0820 |
| healingRedirect | №0656 |
| healingResult | №0656 |
| healMap | №0079 |
| healNoUndead | №0820 |
| healOriginal | №0820 |
| healRange | №0820 |
| healRoll | №0079 |
| healSight | №0820 |
| healTarget | №1330 |
| healv | №0649 |
| heatDamage | №1158 |
| heatMode | №0079 |
| height | №0062 (+ 6 других файлов) |
| heights | №1240 |
| held | №1217 (+ 2 других файлов) |
| heldName | №1219 |
| help | №0816 |
| hem | №0063 |
| hemoragent | №1158 |
| hemoragentNoPool | №1158 |
| hermit | №1217 |
| hermitHero | №1217 |
| hero | №0787 (+ 49 других файлов) |
| heroClassNames | №0837 |
| heroes | №1184 |
| heroFeats | №0746 |
| heroFeatsRef | №0746 |
| heroIsExtra | №0701 |
| heroLevel | №0662 |
| heroLevels | №0806 |
| hex | №0063 (+ 3 других файлов) |
| hi | №0062 (+ 10 других файлов) |
| hidden | №0081 (+ 1 других файлов) |
| hiddenBuckets | №0062 |
| high | №0062 (+ 5 других файлов) |
| highlight | №0064 |
| hint | №0064 |
| hip | №0062 (+ 1 других файлов) |
| hipCenter | №0063 |
| hipMax | №0063 |
| hipMin | №0063 |
| hipRadius | №0063 |
| history | №0064 (+ 4 других файлов) |
| hit | №0656 (+ 14 других файлов) |
| HIT_COST | №0804 |
| hitDie | №0694 (+ 2 других файлов) |
| hitDieMax | №0787 |
| hiX | №0062 |
| hiY | №0062 |
| hm | №1205 (+ 7 других файлов) |
| hole | №0062 |
| holeCounts | №0059 |
| holes | №0062 |
| holeVertices | №0059 |
| hollowHp | №0656 |
| holyAttack | №1158 |
| homebrewClasses | №1337 |
| homunculusCraft | №1158 |
| homunculusEntities | №1158 |
| homunculusOwner | №0656 (+ 1 других файлов) |
| homunculusState | №0656 |
| hood | №0059 (+ 1 других файлов) |
| hoof | №1179 |
| hoofScale | №0062 |
| hoofY | №0062 |
| hook | №0062 |
| hooks | №1157 (+ 3 других файлов) |
| HORN_STYLES | №0067 |
| hornAttack | №1158 |
| hornInstall | №1158 |
| hornPart | №0062 |
| horns | №0062 (+ 1 других файлов) |
| hornSelect | №0064 |
| hornSize | №1186 |
| hornStyle | №0062 (+ 1 других файлов) |
| horror | №0630 (+ 1 других файлов) |
| horseY | №0062 |
| hosiery | №0064 |
| hosieryDen | №1170 |
| host | №0082 (+ 24 других файлов) |
| hostBox | №0811 |
| hostDestroyed | №0817 |
| hostiles | №0657 (+ 1 других файлов) |
| houndHP | №0780 |
| houndTemplate | №0780 |
| howlTargets | №0642 |
| hp | №0079 (+ 22 других файлов) |
| hpAfter | №1304 |
| hpAfterTick | №1157 |
| hpBefore | №1217 |
| hpBeforeShift | №1247 |
| hpCurrentInput | №0701 (+ 1 других файлов) |
| hpDamage | №0656 |
| hpGain | №0701 |
| hpMax | №0648 (+ 1 других файлов) |
| hpMaxInput | №0701 (+ 1 других файлов) |
| hpNow | №0780 |
| hpObj | №0079 |
| hpRes | №0701 |
| hpShape | №1238 |
| hs | №1206 |
| html | №0083 (+ 51 других файлов) |
| http | №1351 (+ 37 других файлов) |
| hud | №1280 (+ 1 других файлов) |
| hugeHands | №1158 |
| human | №1160 (+ 2 других файлов) |
| hunter | №1313 |
| hv | №1268 |
| hx | №0780 |
| hy | №0062 |
| hybrid | №0780 |
| i | №0060 (+ 177 других файлов) |
| ia | №1206 (+ 2 других файлов) |
| ib | №0069 |
| icon | №0793 (+ 3 других файлов) |
| iconEl | №0793 |
| iconId | №0833 (+ 3 других файлов) |
| iconPath | №0887 |
| ICONS | №0833 (+ 2 других файлов) |
| id | №0060 (+ 153 других файлов) |
| ID | №0836 (+ 1 других файлов) |
| idat | №1183 |
| identity | №0074 (+ 1 других файлов) |
| idName | №0746 |
| idOrName | №0673 |
| ids | №0059 (+ 31 других файлов) |
| idv | №0070 (+ 1 других файлов) |
| idx | №0064 (+ 30 других файлов) |
| ignoreTarot | №0828 |
| ignoreWeight | №0790 |
| ii | №1206 (+ 1 других файлов) |
| illIds | №1246 |
| illusion | №0819 (+ 1 других файлов) |
| im | №0070 (+ 3 других файлов) |
| Image | №1159 |
| images | №1159 |
| img | №0064 (+ 3 других файлов) |
| IMG | №0073 |
| imitation | №0079 |
| immediate | №1151 |
| immune | №0819 (+ 3 других файлов) |
| immuneCharm | №0780 |
| immuneFire | №1157 |
| immuneUntil | №0656 |
| immunity | №0642 |
| importDocument | №1975 |
| imported | №1201 |
| improved | №0804 |
| inCombat | №0642 |
| incoming | №1194 (+ 1 других файлов) |
| incomingType | №0656 |
| incompatible | №0064 |
| indent | №0790 |
| index | №0059 (+ 26 других файлов) |
| indexed | №0794 |
| indices | №0059 (+ 4 других файлов) |
| Infinity | №0062 (+ 8 других файлов) |
| influence | №0059 |
| influences | №0059 |
| info | №0652 (+ 3 других файлов) |
| infoBox | №0825 |
| infoText | №0793 |
| ing | №0080 (+ 2 других файлов) |
| INGREDIENT_SOURCES | №0082 |
| INGREDIENTS | №0080 |
| ings | №0080 (+ 1 других файлов) |
| ini | №0812 |
| initElem | №0625 (+ 1 других файлов) |
| initial | №1159 (+ 2 других файлов) |
| initialAngle | №0063 |
| initialId | №1159 |
| initialProficiencies | №0647 |
| initialSkillsData | №0625 (+ 1 других файлов) |
| initiative | №0774 (+ 1 других файлов) |
| inline | №0070 |
| inner | №0059 (+ 1 других файлов) |
| innerDivs | №0823 |
| innerHtml | №0837 |
| innerList | №0794 |
| inp | №0792 |
| input | №0060 (+ 23 других файлов) |
| inputColEP | №0791 |
| inputColPP | №0791 |
| inputCopper | №0791 |
| inputElem | №0781 (+ 1 других файлов) |
| inputField | №0793 |
| inputGrid | №0791 |
| inputId | №0827 |
| inputs | №1184 |
| inputVal | №0781 |
| ins | №0780 |
| INS | №0829 |
| inside | №0812 |
| insight | №0079 |
| inspect | №0080 |
| inspectOnly | №0819 |
| inspired | №1217 |
| inspiredPhone | №1217 |
| installed | №0661 (+ 1 других файлов) |
| installedGrafts | №0079 |
| instantDeath | №0656 |
| int | №0629 (+ 10 других файлов) |
| Int16Array | №1161 (+ 21 других файлов) |
| Int8Array | №1161 (+ 21 других файлов) |
| internal | №0780 |
| interrupted | №0774 (+ 1 других файлов) |
| intervalVal | №0869 |
| intMod | №0625 (+ 5 других файлов) |
| inv | №0059 (+ 14 других файлов) |
| invalidDead | №1158 |
| inventory | №0824 (+ 1 других файлов) |
| INVENTORY_CATEGORIES | №0819 |
| inventoryPC | №1217 |
| inventoryPhone | №1217 |
| inventoryRoster | №1217 |
| inventorySearchState | №0794 |
| inventoryServer | №1217 |
| inverted | №1217 |
| invertedPhone | №1217 |
| invHeaderACEl | №0794 |
| invis | №1158 |
| invisibleAttacker | №1157 |
| invisUsed | №0656 |
| invokeOptions | №0780 |
| invSrc | №1290 |
| ioff | №0070 |
| ionizer | №1158 |
| ionizerClass | №0656 |
| ionizerEngineer | №1158 |
| ionizerTarget | №1157 |
| ip | №0647 |
| ipcMain | №0887 |
| ipcRenderer | №0888 |
| ir | №0070 (+ 1 других файлов) |
| ironChinAttack | №1238 |
| ironChinTarget | №1238 |
| irregular | №0062 |
| is | №1206 |
| isActionProcessed | №0792 |
| isActive | №0869 (+ 1 других файлов) |
| isAlreadyHas | №0823 |
| isAsiLevel | №0701 |
| isAttackOrCheck | №0773 |
| isAutoOn | №0869 |
| isAvailable | №0837 |
| isBlood | №0812 |
| isBomb | №0079 |
| isChecked | №0625 (+ 4 других файлов) |
| isCrit | №0837 |
| isDead | №0079 |
| isDebug | №0833 |
| isDebugEnabled | №0772 |
| isDestroyed | №0798 |
| isDrawerOpen | №0773 |
| isEnabled | №0833 (+ 1 других файлов) |
| isExpert | №0773 |
| isExtraHero | №0701 |
| isFinesse | №0773 |
| isFinger | №0062 |
| isFinite | №1255 (+ 15 других файлов) |
| isFirearm | №0824 |
| isFree | №0845 |
| isGhost | №0647 (+ 1 других файлов) |
| isGhostExtra | №0647 |
| isGhostHero | №0701 |
| isGrouped | №0792 |
| isHeavyOrExceeds | №0793 |
| isHero | №0774 |
| isHidden | №0794 |
| isInterfaceHidden | №0869 |
| isize | №0070 |
| isLandscape | №0887 |
| isLeft | №0060 |
| isMartial | №0824 |
| isMoreStep | №0816 |
| isNewClass | №0701 (+ 1 других файлов) |
| isolated | №1339 |
| isolatedFound | №1339 |
| isolatedLegacy | №1339 |
| isOverLimit | №0837 |
| isOverweight | №0793 |
| isParasite | №0647 (+ 1 других файлов) |
| isParasiteExtra | №0647 |
| isParasiteHero | №0701 |
| isPhbA | №0837 |
| isPlayingAmbience | №0083 |
| isPOT | №0074 |
| isPrepared | №0837 |
| isProf | №0625 (+ 2 других файлов) |
| isProficient | №0773 |
| isRanged | №0773 |
| isRepeatOneOn | №0083 |
| isRight | №0060 |
| isRite | №0642 |
| isRowActionProcessed | №0792 |
| isSelected | №0083 (+ 1 других файлов) |
| isShield | №0794 |
| isShuffleOn | №0083 |
| isSimple | №0824 |
| isSuccess | №0773 |
| issues | №0673 |
| isSwarm | №0647 (+ 1 других файлов) |
| isSwarmExtra | №0647 |
| isSwarmHero | №0701 |
| isWalterHero | №0701 |
| isWalterParasite | №0647 (+ 1 других файлов) |
| isWalterParasiteExtra | №0647 |
| isWalterParasiteHero | №0701 |
| it | №0666 (+ 4 других файлов) |
| item | №0063 (+ 38 других файлов) |
| itemArray | №0793 |
| itemCards | №0793 |
| itemCategory | №0794 |
| itemData | №0793 (+ 1 других файлов) |
| itemId | №0800 (+ 2 других файлов) |
| itemName | №0794 |
| itemRegistry | №0793 |
| items | №0062 (+ 13 других файлов) |
| iterations | №0821 |
| iv | №0070 (+ 3 других файлов) |
| iw | №0780 (+ 1 других файлов) |
| ix | №0059 (+ 3 других файлов) |
| j | №0059 (+ 24 других файлов) |
| J | №0062 |
| jaw | №0062 |
| jb | №1203 (+ 1 других файлов) |
| jh | №1203 (+ 1 других файлов) |
| ji | №0069 |
| jinx | №0656 |
| job | №0819 |
| joinBox | №0811 |
| jointIds | №1173 |
| joints | №0059 (+ 4 других файлов) |
| journal | №0856 (+ 1 других файлов) |
| JOURNAL | №0654 (+ 1 других файлов) |
| jp | №1203 |
| jpad | №1348 |
| JSDOM | №1212 |
| json | №0070 (+ 12 других файлов) |
| JSON | №0664 (+ 55 других файлов) |
| jsonBytes | №1197 |
| jsonBytes0 | №1197 |
| jsonPad | №1197 |
| k | №0060 (+ 111 других файлов) |
| K | №0069 (+ 1 других файлов) |
| keep | №0062 (+ 4 других файлов) |
| keepConditions | №0079 |
| keepEffects | №0079 |
| keepFaces | №0059 |
| keepResistance | №0079 |
| key | №0062 (+ 62 других файлов) |
| KEY | №0061 (+ 20 других файлов) |
| keyName | №0079 |
| keys | №0062 (+ 6 других файлов) |
| kg | №0792 |
| kgInput | №0792 |
| killer | №0784 |
| kind | №0062 (+ 20 других файлов) |
| kinds | №0819 (+ 1 других файлов) |
| kingAlly | №0820 |
| kingEnemy | №1219 |
| kingSelect | №1219 |
| knee | №0062 |
| kneeHigh | №0062 |
| kneeLine | №0062 |
| kneeLow | №0062 |
| knockout | №1238 |
| knockoutHero | №1238 |
| knockoutTarget | №1238 |
| knot | №0064 |
| known | №0079 (+ 8 других файлов) |
| KNOWN | №0829 (+ 1 других файлов) |
| knownCantrips | №0079 |
| knownFormula | №0780 |
| knownProcessed | №0674 |
| knownSpell | №1249 |
| ko | №0780 |
| koMod | №1239 |
| koRoll | №0780 |
| koTarget | №1239 |
| l | №0062 (+ 44 других файлов) |
| L | №0059 (+ 2 других файлов) |
| la | №0812 |
| label | №0064 (+ 10 других файлов) |
| labels | №0064 (+ 2 других файлов) |
| LABELS | №0872 |
| lamp | №1213 |
| landed | №1217 |
| landscape | №0887 (+ 1 других файлов) |
| langCount | №0647 |
| langs | №0829 |
| LANGS | №0829 |
| langStr | №0647 |
| langText | №0825 |
| larva | №0062 (+ 1 других файлов) |
| larvaBounds | №0064 |
| larval | №0064 |
| last | №0059 (+ 7 других файлов) |
| lastError | №0064 |
| lastFace | №1209 |
| lastResult | №0802 |
| lastRow | №1183 |
| lastTap | №0798 |
| lastVertex | №1209 |
| late | №1159 |
| latitude | №0059 |
| latitudes | №0059 |
| launchTour | №0816 |
| layer | №0062 |
| layout | №1359 (+ 1 других файлов) |
| lazarusOwner | №1158 |
| lbs | №0792 |
| le | №0866 |
| lead | №0777 (+ 1 других файлов) |
| leaf | №0064 |
| leafSize | №1205 |
| lean | №0062 |
| learned | №0671 |
| leather | №0064 |
| leatherQty | №0664 |
| leaving | №1219 |
| leavingReach | №0820 |
| left | №0063 (+ 13 других файлов) |
| leftReaction | №0656 |
| leg | №0062 (+ 1 других файлов) |
| legacy | №0824 (+ 9 других файлов) |
| legacyCount | №1398 |
| legacyCurses | №0078 |
| legacyHuman | №1160 |
| legacyPact | №0799 |
| legacyUrl | №1339 |
| legend | №0064 |
| legPhase | №0062 |
| len | №0062 (+ 12 других файлов) |
| length | №0059 (+ 2 других файлов) |
| lengths | №1208 |
| level | №0059 (+ 38 других файлов) |
| level1 | №0779 |
| levelData | №0701 (+ 1 других файлов) |
| levelDisplays | №0701 |
| levelFilter | №0837 |
| levelFour | №1158 |
| levelInput | №0832 |
| levelInputs | №0701 |
| levelOk | №0837 |
| levelReq | №0780 |
| levels | №0676 (+ 23 других файлов) |
| LEVELS | №0671 |
| levelSources | №0837 |
| levelSpells | №0837 |
| levelUp | №1184 |
| levelUpBtn | №0781 |
| levelUpSrc | №1290 |
| levelVal | №0837 |
| li | №0073 (+ 1 других файлов) |
| lie | №1237 |
| lifecycle | №0794 |
| lift | №0062 |
| light | №0074 |
| lightArmor | №0656 |
| lightFloor | №0074 |
| lightLimitKg | №0793 |
| lightLimitLb | №0793 |
| lights | №0072 |
| lim | №0819 |
| limbRanges | №0062 |
| limbSamples | №0062 |
| limbSelect | №0064 |
| limit | №0062 (+ 4 других файлов) |
| limits | №0064 |
| limitStr | №0793 |
| line | №0062 (+ 8 других файлов) |
| lineno | №0772 |
| lines | №0828 |
| lingerie | №0063 |
| lingerieAtlas | №0063 |
| link | №0798 (+ 1 других файлов) |
| linked | №1217 |
| linkedPhone | №1217 |
| links | №0059 (+ 1 других файлов) |
| lip | №0062 |
| list | №0061 (+ 41 других файлов) |
| listContainer | №0083 (+ 2 других файлов) |
| listContainers | №0790 |
| listener | №0888 |
| listeners | №0654 (+ 1 других файлов) |
| lit | №1213 |
| lItem | №0647 |
| live | №0064 (+ 6 других файлов) |
| LIVE_PROGRESSION_KEYS | №0650 |
| liveFoe | №1221 |
| liveKey | №0650 |
| livePC | №1217 |
| livePhone | №1217 |
| liveRoot | №0887 |
| liveServer | №1217 |
| liveSnake | №1217 |
| lo | №0062 (+ 7 других файлов) |
| LOAD_FILES | №0664 |
| loader | №1198 |
| lobe | №0062 |
| loc | №1159 |
| local | №0062 (+ 5 других файлов) |
| localData | №0833 |
| localId | №0654 |
| localStorage | №1201 |
| location | №0819 |
| lock | №0887 |
| locked | №0670 (+ 1 других файлов) |
| locks | №0062 (+ 1 других файлов) |
| logBox | №0772 |
| logContainer | №0773 |
| logContent | №0791 |
| logDiv | №0791 |
| logItem | №0773 |
| logLine | №0772 |
| logs | №0833 |
| logText | №0773 (+ 1 других файлов) |
| long | №0064 (+ 1 других файлов) |
| longFired | №0864 |
| longitude | №0059 |
| longTimer | №0864 |
| looksLikeModal | №0833 |
| lookup | №0062 |
| loop | №0059 |
| loot | №0628 (+ 18 других файлов) |
| LOOT_MODELS | №0807 |
| los | №0657 (+ 1 других файлов) |
| loss | №0642 (+ 1 других файлов) |
| low | №0062 (+ 6 других файлов) |
| lower | №0060 (+ 4 других файлов) |
| lowerId | №0063 |
| lowerJaw | №0062 |
| lowerLang | №0647 |
| lowerName | №0625 |
| lowerOptions | №0063 |
| lowerTool | №0647 |
| lowest | №0059 |
| loX | №0062 |
| loY | №0062 |
| lr | №0812 (+ 1 других файлов) |
| ls | №0074 (+ 2 других файлов) |
| lv | №0079 (+ 1 других файлов) |
| lvl | №0787 (+ 8 других файлов) |
| lvl1Options | №0647 |
| lvlA | №0837 |
| lvlB | №0837 |
| lvlBadge | №0837 |
| lvlDisplay | №0833 |
| lvlInput | №0833 |
| lx | №0073 |
| Lx | №0073 |
| ly | №0073 |
| Ly | №0073 |
| m | №0060 (+ 101 других файлов) |
| M | №0071 (+ 8 других файлов) |
| m0 | №1159 |
| m1 | №0675 (+ 1 других файлов) |
| m2 | №0675 |
| macro | №1397 |
| macroFile | №1397 |
| macros | №1203 (+ 2 других файлов) |
| madBomber | №0656 |
| mag | №0064 (+ 1 других файлов) |
| MAGE_CATALOG_AUDITED | №0819 |
| MAGE_HANDLERS | №0819 |
| MAGE_LEVEL2 | №0819 |
| mageActors | №0820 |
| mageApi | №0820 |
| mageBack | №1217 |
| mageBerryCount | №0820 |
| mageCon | №1217 |
| mageDarts | №0820 (+ 1 других файлов) |
| mageGround | №0820 |
| magePC | №1217 |
| magePending | №0820 |
| magePhone | №1217 |
| mageRoster | №1217 |
| mageSelect | №1219 |
| mageServer | №1217 |
| mageSpell | №0820 |
| mageStat | №0820 |
| mageTargets | №0820 |
| mageType | №0820 |
| mageWilling | №0820 |
| magic | №1290 |
| magicFistHero | №1238 |
| magicHit | №1238 |
| main | №0063 |
| mainCard | №0773 |
| mainWindow | №0887 |
| major | №1217 |
| MAJOR_ACTIONS | №0819 |
| MAJORS | №0822 |
| male | №1178 |
| malePositions | №1159 |
| maleRef | №1178 |
| malformed | №1164 (+ 3 других файлов) |
| manager | №1338 |
| manifest | №0796 (+ 4 других файлов) |
| manifestPath | №0890 (+ 1 других файлов) |
| manifestUrl | №0843 |
| manual | №1165 (+ 1 других файлов) |
| map | №0062 (+ 25 других файлов) |
| Map | №1199 (+ 5 других файлов) |
| mapPaths | №1975 |
| mapped | №0780 |
| mapping | №0062 (+ 1 других файлов) |
| maps | №0872 (+ 1 других файлов) |
| mapToVar | №0835 |
| mark | №0642 (+ 1 других файлов) |
| market | №0801 (+ 2 других файлов) |
| mask | №0060 (+ 2 других файлов) |
| MASS_HARVEST_MATERIALS | №0807 |
| master | №0666 (+ 2 других файлов) |
| mastery | №0812 |
| masteryNames | №0812 |
| mat | №0063 (+ 8 других файлов) |
| match | №0781 (+ 6 других файлов) |
| matches | №0649 (+ 2 других файлов) |
| material | №0063 (+ 2 других файлов) |
| MATERIAL_BRIDGE | №0807 |
| MATERIAL_DEFS | №0673 |
| materialCells | №0063 |
| materialIds | №0673 |
| materials | №0063 (+ 3 других файлов) |
| MATERIALS | №0668 (+ 2 других файлов) |
| math | №1184 (+ 2 других файлов) |
| Math | №1157 (+ 63 других файлов) |
| matrices | №0059 (+ 1 других файлов) |
| matrix | №0059 (+ 1 других файлов) |
| mats | №0665 (+ 6 других файлов) |
| max | №0062 (+ 37 других файлов) |
| MAX | №0804 (+ 3 других файлов) |
| MAX_CR | №0834 |
| MAX_DEPTH | №0790 |
| MAX_ERRORS | №0854 |
| MAX_FILES | №0890 |
| MAX_PLAYERS | №0811 |
| MAX_TOTAL_BYTES | №0890 |
| max2 | №0814 |
| maxAllowedLevel | №0837 |
| maxAt | №1229 |
| maxBuilder | №1184 |
| maxCapacityKg | №0793 (+ 1 других файлов) |
| maxCapacityLb | №0793 |
| maxDisplacement | №1202 |
| maxDistance | №1173 |
| maxFaces | №0059 (+ 1 других файлов) |
| maxHero | №1217 |
| maxHit | №1217 |
| maxHp | №0625 (+ 3 других файлов) |
| maxHP | №0870 |
| maximize | №0656 |
| maximum | №0656 (+ 2 других файлов) |
| maxIndex | №1209 |
| maxLevel | №0837 |
| maxOutside | №1348 |
| maxPrepared | №0837 |
| maxRestore | №0649 |
| maxRoll | №1184 |
| maxSpell | №0836 |
| maxSteps | №0657 |
| maxTargets | №1204 |
| maxTex | №0074 |
| maxUses | №0655 (+ 1 других файлов) |
| maxVal | №0837 |
| maxVertices | №0064 (+ 6 других файлов) |
| maxX | №0072 |
| maxY | №0072 |
| MC1 | №0631 |
| mctx | №1331 (+ 1 других файлов) |
| MCV2 | №0632 |
| md | №0074 (+ 2 других файлов) |
| me | №0070 (+ 1 других файлов) |
| mean | №0059 (+ 6 других файлов) |
| meanUniform | №1183 |
| mechanics | №0834 |
| MECHANICS | №0078 (+ 2 других файлов) |
| medium | №0642 |
| mediumLimitKg | №0793 |
| mediumLimitLb | №0793 |
| member | №1151 |
| members | №0819 |
| memory | №1166 |
| mental | №0785 (+ 1 других файлов) |
| menu | №0816 |
| merged | №0064 (+ 1 других файлов) |
| mesh | №0062 (+ 4 других файлов) |
| meshes | №0070 (+ 2 других файлов) |
| message | №0064 (+ 17 других файлов) |
| messages | №0075 |
| meta | №0065 (+ 7 других файлов) |
| META_COST | №0649 |
| META_NAMES | №0649 |
| METAS | №0078 |
| method | №0654 |
| mettle | №0656 |
| mh | №0062 (+ 5 других файлов) |
| mi | №0070 (+ 2 других файлов) |
| microEntry | №0064 |
| mid | №0062 (+ 1 других файлов) |
| middles | №0059 |
| migrated | №0812 |
| mimeTypes | №0887 |
| min | №0062 (+ 7 других файлов) |
| minBuilder | №1184 |
| mind | №0817 |
| minimumLevel | №0649 |
| minIndex | №1209 |
| minor | №1230 |
| MINOR_ACTIONS | №0819 |
| mins | №0869 |
| minutes | №0869 (+ 1 других файлов) |
| minutesSinceDeath | №0079 |
| minutesVal | №0869 |
| minVal | №0787 |
| minX | №0072 |
| minY | №0072 |
| miss | №1233 |
| missArena | №1238 |
| missedKnockoutHero | №1238 |
| missedKnockoutTarget | №1238 |
| misses | №1205 (+ 3 других файлов) |
| missing | №0665 (+ 10 других файлов) |
| missingReliefRoll | №1158 |
| missingTools | №0673 |
| missTarget | №1238 |
| mix | №0080 (+ 1 других файлов) |
| mixed | №1161 (+ 1 других файлов) |
| mj | №0780 |
| ml | №0062 |
| mm | №0074 (+ 2 других файлов) |
| mn | №0082 (+ 7 других файлов) |
| mo | №0074 |
| mob | №1217 |
| mobile | №1217 |
| mobileArmor | №1217 |
| mobileArmored | №1217 |
| mobileArtisan | №1217 |
| mobileBerry | №1217 |
| mobileBurden | №1217 |
| mobileDarts | №1217 |
| mobileDash | №1217 |
| mobileIllusion | №1217 |
| mobileMage | №1217 |
| mobilePoison | №1217 |
| mobileQueen | №1217 |
| mobileRange | №0074 |
| mobileSnake | №1217 |
| mobileStand | №1217 |
| mod | №0625 (+ 9 других файлов) |
| modal | №0083 (+ 13 других файлов) |
| modalColorOptions | №0869 |
| modalHTML | №0701 |
| modals | №0794 |
| modDisplay | №0773 (+ 1 других файлов) |
| mode | №0071 (+ 21 других файлов) |
| modeButtons | №0773 |
| model | №0807 (+ 2 других файлов) |
| models | №1975 |
| modeRadio | №0648 |
| modes | №1236 (+ 2 других файлов) |
| modeSelect | №0792 |
| modifier | №0655 (+ 1 других файлов) |
| modifierMatch | №0773 |
| modifiers | №1238 |
| MODIFIERS | №0675 |
| modMatches | №0837 |
| modName | №0773 |
| modNum | №0625 (+ 1 других файлов) |
| mods | №0656 (+ 5 других файлов) |
| modSourceLabel | №0773 |
| modStr | №0625 (+ 3 других файлов) |
| modTag | №0625 (+ 1 других файлов) |
| modules | №1120 (+ 37 других файлов) |
| modVal | №0773 (+ 1 других файлов) |
| monk | №1303 (+ 1 других файлов) |
| monster | №0806 (+ 2 других файлов) |
| MONSTER_RECIPES | №0807 |
| monsterCount | №0806 |
| monsterId | №0812 |
| monsterName | №0808 (+ 1 других файлов) |
| monsters | №0628 (+ 13 других файлов) |
| MONSTERS | №0656 |
| monsterSrc | №1311 |
| monstrousGrafts | №0079 |
| morph | №1205 (+ 2 других файлов) |
| morphBytes | №1197 |
| morphed | №1160 |
| morphName | №1197 |
| morphOffset | №1197 |
| morphPrimitives | №1200 (+ 1 других файлов) |
| morphTargets | №1200 |
| motion | №0064 |
| motionBack | №1217 |
| motionPC | №1217 |
| motionPhone | №1217 |
| motionRoster | №1217 |
| motionServer | №1217 |
| mouth | №0062 |
| mouthDistance | №0062 |
| mouthRadius | №0062 |
| mouthRY | №0062 |
| mouthY | №0062 |
| move | №0071 (+ 1 других файлов) |
| moved | №0864 (+ 3 других файлов) |
| moveExtraPanelsIntoDrawer | №0773 |
| moveHero | №1217 |
| moveId | №1224 |
| moveItemToContainer | №0790 |
| movement | №0075 |
| movePC | №1217 |
| movePhone | №1217 |
| moveRoster | №1217 |
| movers | №0819 |
| moveServer | №1217 |
| moving | №0062 |
| moxie | №0780 |
| moxieBeforeMiss | №1238 |
| mp | №0649 (+ 2 других файлов) |
| mr | №0649 (+ 2 других файлов) |
| mrko | №0780 |
| ms | №0070 (+ 2 других файлов) |
| msg | №0833 (+ 12 других файлов) |
| msgEl | №0793 |
| mult | №0625 (+ 4 других файлов) |
| multi2 | №0670 |
| MULTICLASS_PROFICIENCIES_2014 | №0714 |
| MULTICLASS_REQUIREMENTS | №0787 |
| MULTIPLIER | №0806 |
| multiRules | №0701 |
| mults | №0791 |
| muscle | №0062 |
| mutableHit | №1157 |
| mutableTarget | №1157 |
| mutagenAbility | №0079 |
| mutagenAlly | №1158 |
| mutagenHero | №1158 |
| mutagenist | №1158 |
| mutagenNames | №0642 |
| mutagenResult | №1158 |
| mutagens | №0642 |
| mutatedCap | №0079 |
| MUTATION_SLOTS | №0817 (+ 1 других файлов) |
| mutations | №0793 (+ 4 других файлов) |
| mutCreated | №0780 |
| muts | №0840 |
| muzzle | №0062 (+ 3 других файлов) |
| mv | №0657 |
| mw | №0062 |
| mx | №0074 (+ 6 других файлов) |
| my | №0074 (+ 1 других файлов) |
| mysteries | №0814 |
| mythic | №1247 (+ 1 других файлов) |
| n | №0060 (+ 144 других файлов) |
| N | №0059 (+ 3 других файлов) |
| n2 | №1334 |
| nailLen | №0062 |
| name | №0060 (+ 168 других файлов) |
| NAME | №0836 (+ 1 других файлов) |
| NAME_ALIASES | №0803 |
| name2 | №0780 |
| nameA | №0837 |
| nameB | №0837 |
| named | №1151 |
| nameInp | №0792 |
| nameInput | №0625 (+ 2 других файлов) |
| nameLower | №0773 |
| nameRu | №1337 |
| names | №0060 (+ 23 других файлов) |
| NAMES | №0629 (+ 12 других файлов) |
| nameSpan | №0794 (+ 1 других файлов) |
| NaN | №1247 |
| native | №0843 (+ 1 других файлов) |
| nativeBridge | №0811 |
| nativeClear | №0654 |
| nativePacketSeq | №0811 |
| nativeRemove | №0654 |
| nativeSeenSeqByPeer | №0811 |
| nativeSet | №0654 |
| nativeVersion | №0843 |
| natural | №0834 |
| naturalAttack | №1247 |
| naturalGrafts | №0079 |
| naturalTwenty | №0656 |
| nb | №0062 |
| nctx | №1330 |
| ne | №1306 (+ 7 других файлов) |
| near | №0059 (+ 2 других файлов) |
| nearest | №0657 (+ 1 других файлов) |
| nearestAt | №0062 |
| nearestDist | №0657 |
| neck | №0062 |
| neckDrop | №0063 |
| neckFront | №0063 |
| neckIndices | №0062 |
| neckMap | №0062 |
| neckNormals | №0062 |
| neckZ | №0062 |
| necromanticRevival | №0656 |
| necrotic | №0656 |
| needsSave | №0656 |
| needsSubclassChoice | №0701 |
| needsTarget | №0780 |
| net | №0774 (+ 4 других файлов) |
| neutral | №1161 (+ 2 других файлов) |
| newChar | №0625 (+ 1 других файлов) |
| newcomer | №1230 (+ 1 других файлов) |
| newCount | №0794 |
| newCp | №0791 |
| newEntry | №0797 |
| newEp | №0791 |
| newFolder | №0813 |
| newGp | №0791 |
| newId | №0625 (+ 2 других файлов) |
| newLevel | №0832 (+ 1 других файлов) |
| newLvl | №0833 |
| newMax | №0701 |
| newPeer | №1324 |
| newPp | №0791 |
| newRace | №0825 |
| newSp | №0791 |
| newSpell | №0837 |
| newTemp | №0079 |
| newTotalLevel | №0701 |
| newVal | №0625 (+ 2 других файлов) |
| newVol | №0083 |
| next | №0059 (+ 18 других файлов) |
| nextHp | №0079 |
| nextLevel | №0701 |
| nextLevelExpReq | №0781 |
| nextRemaining | №0079 |
| nf | №0074 |
| ng | №1325 (+ 2 других файлов) |
| ni | №0062 (+ 2 других файлов) |
| nk | №0062 (+ 1 других файлов) |
| nl | №0062 |
| nm | №0866 |
| nn | №1205 (+ 3 других файлов) |
| nnx | №0062 |
| nnz | №0062 |
| no | №1253 |
| noChoice | №1158 |
| noClaws | №1179 |
| node | №0833 (+ 5 других файлов) |
| nodes | №0060 (+ 8 других файлов) |
| NODES | №0879 |
| noEars | №1181 |
| noGlow | №1361 |
| none | №0064 (+ 2 других файлов) |
| nonmagicalResistance | №0656 |
| nonmagicalVariants | №0656 |
| nonZero | №1205 (+ 2 других файлов) |
| nonzeroSource | №1208 |
| noRefill | №1217 |
| noReliefTarget | №1158 |
| noRiteDice | №1244 |
| norm | №0059 (+ 2 других файлов) |
| normal | №0062 (+ 5 других файлов) |
| normalAC | №0656 |
| normalizeClassKey | №0701 |
| normalized | №0714 (+ 3 других файлов) |
| normalizedCondition | №0656 |
| normalizedCurrentClass | №0701 |
| normalizedRequested | №0701 |
| normalizeLevelUpClassName | №0701 |
| normalizeYield | №0827 |
| normalRaceLabel | №0647 |
| normals | №0059 (+ 1 других файлов) |
| nose | №0062 |
| noseDepth | №0062 |
| nosePart | №0062 |
| noseTop | №0062 |
| noseWidth | №0062 |
| noseY | №0062 |
| noseZ | №0062 |
| nostril | №0062 |
| nostrils | №0062 |
| note | №0656 (+ 2 других файлов) |
| now | №0062 (+ 5 других файлов) |
| np | №0062 |
| npot | №0074 |
| null | №0833 (+ 15 других файлов) |
| num | №0787 (+ 1 других файлов) |
| Number | №0664 (+ 25 других файлов) |
| numbers | №0063 |
| nums | №0812 |
| nw | №0780 |
| nx | №0062 (+ 1 других файлов) |
| ny | №0059 (+ 1 других файлов) |
| nylon | №0064 |
| nz | №0059 (+ 2 других файлов) |
| o | №0060 (+ 52 других файлов) |
| oa | №0780 |
| obj | №0072 (+ 5 других файлов) |
| Object | №0664 (+ 23 других файлов) |
| objectBomber | №1157 |
| objectId | №0649 (+ 2 других файлов) |
| objectIds | №0829 |
| objPath | №1197 (+ 6 других файлов) |
| objs | №0073 |
| observer | №0793 (+ 3 других файлов) |
| observerTarget | №0793 |
| oc | №1308 |
| oc2 | №1308 |
| occultIds | №1246 |
| occultistPack | №0780 |
| occupied | №0831 |
| od | №0812 |
| odd | №0819 |
| odds | №0820 (+ 4 других файлов) |
| odr | №0812 |
| off | №0064 (+ 6 других файлов) |
| offer | №0802 (+ 3 других файлов) |
| offered | №0803 |
| offers | №0802 (+ 1 других файлов) |
| offHoof | №1179 |
| offset | №0062 (+ 7 других файлов) |
| oh | №0073 (+ 1 других файлов) |
| oi | №0073 (+ 2 других файлов) |
| oid | №0780 |
| oilDamage | №0656 |
| ok | №0073 (+ 10 других файлов) |
| ol | №0074 |
| old | №0066 (+ 47 других файлов) |
| oldAngle | №0066 |
| oldBin | №1197 |
| oldBuffer | №1159 |
| oldChar | №1324 |
| oldCharacter | №1324 |
| oldCombatForDemolition | №1158 |
| oldData | №0833 |
| oldDrawer | №0773 |
| oldEffects | №0079 |
| oldHead | №1160 |
| oldHost | №0773 |
| oldHp | №0079 |
| oldId | №0656 (+ 1 других файлов) |
| oldInitRender | №0828 |
| oldLength | №0059 |
| oldLevel | №0671 |
| oldMax | №0078 (+ 1 других файлов) |
| oldNet | №1324 |
| oldPact | №0828 |
| oldPeer | №0812 |
| oldRAF | №1351 (+ 18 других файлов) |
| oldRandom | №0664 (+ 1 других файлов) |
| oldRandomForBurn | №1157 |
| oldRandomMutable | №1157 |
| oldRandomObject | №1157 |
| oldRandomPoison | №1157 |
| oldRandomSlime | №1157 |
| oldRenderDndTools | №0828 |
| oldRoll | №1315 |
| oldSelect | №0792 |
| oldTemp | №0079 |
| oldTotal | №0701 |
| on | №0064 (+ 6 других файлов) |
| onchange | №0820 |
| one | №1232 |
| oneTwoTarget | №0780 |
| onPhone | №1217 |
| onProgress | №0843 |
| oozeRancher | №0656 |
| oozeRancherAcidResistance | №0656 |
| oozeTarget | №1157 |
| op | №0064 (+ 2 других файлов) |
| opacity | №0869 (+ 1 других файлов) |
| opacityVal | №0869 |
| open | №0649 (+ 2 других файлов) |
| openedHero | №0820 |
| opening | №0773 |
| openPanels | №1181 |
| openSet | №0797 |
| openSky | №0819 |
| operation | №1151 |
| operationId | №0822 |
| opportunityAttacker | №0820 |
| opt | №0064 (+ 4 других файлов) |
| option | №0064 |
| options | №0062 (+ 22 других файлов) |
| opts | №0081 (+ 29 других файлов) |
| optsHtml | №0647 |
| orbit | №0062 |
| orc | №1310 |
| order | №0059 (+ 4 других файлов) |
| orderCtx | №1249 |
| origin | №0064 (+ 2 других файлов) |
| original | №0059 (+ 18 других файлов) |
| originalAppearance | №0079 |
| originalAttack | №0667 |
| originalBody | №1160 |
| originalCalculateMods | №0837 |
| originalContext | №1159 |
| originalCraft | №0667 (+ 1 других файлов) |
| originalCrypto | №1219 |
| originalDamage | №0667 |
| originalEnemyHp | №1219 |
| originalError | №0772 |
| originalHealingTarget | №0656 |
| originalIndex | №0794 |
| originalIndices | №1177 |
| originalLog | №0772 |
| originalOpenCharacter | №0837 |
| originalPhysical | №0834 |
| originalRepair | №0667 |
| originalUI | №1339 |
| originalUiCraft | №0667 |
| originLabel | №0064 |
| orphan | №0790 |
| os | №1156 (+ 5 других файлов) |
| ot | №0657 (+ 1 других файлов) |
| other | №0794 (+ 8 других файлов) |
| otherCat | №0794 |
| otherIndex | №0794 |
| otherIsShield | №0794 |
| otherName | №0794 |
| ott | №0780 |
| out | №0060 (+ 71 других файлов) |
| outcome | №0819 (+ 2 других файлов) |
| outer | №0059 (+ 2 других файлов) |
| outerWidth | №0059 |
| outPath | №1197 |
| output | №0064 (+ 3 других файлов) |
| outputId | №0674 (+ 1 других файлов) |
| outputName | №0674 (+ 1 других файлов) |
| outside | №0063 (+ 1 других файлов) |
| outsideBary | №1208 |
| overheated | №0079 |
| overheatedTarget | №1158 |
| overlay | №0798 (+ 3 других файлов) |
| overload | №1158 |
| overloadBefore | №1158 |
| overloadBomber | №1158 |
| overloadCost | №0079 |
| overrides | №0658 |
| ow | №0073 |
| own | №0657 (+ 1 других файлов) |
| owned | №0672 (+ 2 других файлов) |
| owner | №0064 (+ 11 других файлов) |
| ownerActor | №0657 |
| ownerBombHit | №1157 |
| ownerClass | №0079 |
| ownerCopy | №0822 |
| ownerId | №0831 |
| ownId | №1151 |
| ox | №0069 (+ 2 других файлов) |
| oy | №0069 (+ 2 других файлов) |
| oz | №0069 (+ 1 других файлов) |
| p | №0060 (+ 162 других файлов) |
| P | №0070 (+ 2 других файлов) |
| p0 | №0062 |
| p1 | №0062 |
| pa | №0656 |
| pack | №0071 (+ 22 других файлов) |
| PACK_ID | №0079 (+ 2 других файлов) |
| PACK_MANIFEST | №0663 |
| packId | №0662 |
| packName | №0662 |
| packs | №0777 (+ 1 других файлов) |
| pact | №0649 (+ 3 других файлов) |
| PACT | №0799 |
| PACT_SLOTS | №0828 |
| pactBoxes | №0837 |
| pactLevel | №0828 |
| pactSlots | №0780 |
| pactState | №0828 |
| pad | №0062 |
| pads | №0062 |
| page | №0654 (+ 38 других файлов) |
| paid | №0804 (+ 1 других файлов) |
| paintAttack | №1158 |
| painter | №1158 |
| pair | №0059 (+ 2 других файлов) |
| pal | №1308 (+ 2 других файлов) |
| palette | №0063 (+ 1 других файлов) |
| palettes | №0064 |
| palm | №0062 |
| panel | №0063 (+ 6 других файлов) |
| panelHost | №0828 |
| panelsHidden | №0071 |
| panX | №0864 |
| panY | №0864 |
| parasiteHostTarget | №0647 |
| parent | №0069 (+ 3 других файлов) |
| parentArea | №0794 |
| parentId | №0840 |
| parsed | №0833 (+ 3 других файлов) |
| parsedHtml | №0773 |
| parsedSides | №0773 |
| parseFloat | №1157 (+ 15 других файлов) |
| parseInt | №1157 (+ 13 других файлов) |
| part | №0060 (+ 16 других файлов) |
| partner | №0819 |
| partnerSnapshot | №0819 |
| parts | №0062 (+ 29 других файлов) |
| partySize | №0806 |
| pass | №0059 (+ 3 других файлов) |
| passed | №1189 (+ 2 других файлов) |
| passInsight | №0625 (+ 1 других файлов) |
| passInvestigation | №0625 (+ 1 других файлов) |
| passive | №0780 (+ 2 других файлов) |
| passiveFeatures | №0079 |
| passPerception | №0625 (+ 1 других файлов) |
| password | №0652 (+ 1 других файлов) |
| pat | №0073 |
| patch | №0062 (+ 5 других файлов) |
| patchLootResult | №0827 |
| path | №0062 (+ 113 других файлов) |
| paths | №1193 |
| patient | №0079 (+ 1 других файлов) |
| patronNames | №0642 |
| patrons | №0642 (+ 1 других файлов) |
| paw | №0062 |
| payload | №0084 (+ 11 других файлов) |
| pb | №0078 (+ 7 других файлов) |
| PB | №0078 (+ 10 других файлов) |
| pbBreath | №0079 |
| pc | №0780 (+ 4 других файлов) |
| pcRoster | №1217 |
| pct | №0844 (+ 1 других файлов) |
| pd | №0879 |
| peace | №1217 |
| peacePhone | №1217 |
| peak | №1238 |
| peer | №0812 (+ 2 других файлов) |
| peerId | №0812 |
| peers | №0811 (+ 3 других файлов) |
| pelvisNode | №0059 |
| penalizedAttack | №1157 |
| penalizedSave | №1157 |
| penalty | №0642 |
| pending | №0065 (+ 14 других файлов) |
| pendingBloodAttack | №0656 |
| pendingBomb | №0079 |
| pendingContext | №0626 |
| pendingFeature | №0626 |
| pendingLevelUpData | №0701 |
| pendingReactions | №0812 |
| pendingSavantAttack | №0656 |
| pendingTargetId | №0626 |
| percent | №0064 (+ 2 других файлов) |
| perfumeAttack | №1157 |
| perfumeAttacker | №1157 |
| perfumeClass | №0656 |
| perfumeDC | №0656 |
| perfumeHero | №0656 |
| perfumeOwner | №1157 |
| perfumeOwnerState | №0656 |
| perfumeRound | №0656 |
| perfumeSave | №0656 |
| perfumeSource | №0656 |
| perfumeSourceClass | №0656 |
| perfumeState | №0656 |
| perfumeTargetId | №0656 |
| permission | №0887 |
| perms | №1211 |
| pev | №0812 |
| pf | №0834 |
| PGlite | №1151 |
| ph | №1313 |
| PH | №0073 |
| phase | №0062 (+ 1 других файлов) |
| phases | №1257 |
| pher | №0656 |
| pherDebuffs | №0079 |
| pheromone | №1157 (+ 1 других файлов) |
| pheromoneOwner | №1157 |
| pheromoneSave | №0079 |
| pheromoneTarget | №1157 (+ 1 других файлов) |
| phi | №0059 (+ 2 других файлов) |
| phone | №1189 (+ 2 других файлов) |
| phoneProtected | №1217 |
| phoneTraveller | №1217 |
| physical | №0656 (+ 1 других файлов) |
| physicalKey | №0834 |
| pi | №0069 (+ 5 других файлов) |
| pick | №0062 (+ 9 других файлов) |
| picked | №0642 (+ 1 других файлов) |
| picker | №0064 |
| picks | №0079 |
| pid | №0671 (+ 1 других файлов) |
| pigmentClass | №0079 |
| pigmentist | №1158 |
| pinch | №0864 |
| pink | №0062 |
| PINNED_COMMIT | №1397 |
| pInput | №0791 |
| pipe | №1161 (+ 20 других файлов) |
| pitch | №0064 (+ 3 других файлов) |
| pivot | №0059 |
| pixel | №1369 |
| pixels | №1351 (+ 19 других файлов) |
| pl | №0694 (+ 2 других файлов) |
| plan | №0666 (+ 4 других файлов) |
| plane | №0062 (+ 1 других файлов) |
| PLANES | №0633 |
| plannedMove | №0812 |
| plates | №0062 |
| playable | №0822 |
| playBtn | №0083 |
| played | №1217 |
| plumage | №0062 |
| plume | №0062 |
| plus | №0059 (+ 1 других файлов) |
| pn | №0062 |
| po | №0780 |
| point | №0062 (+ 2 других файлов) |
| pointCostDiff | №0625 (+ 1 других файлов) |
| pointers | №0864 |
| points | №0062 (+ 10 других файлов) |
| pointsLeftEl | №0625 (+ 1 других файлов) |
| poisonBomb | №1158 |
| poisonedAttacker | №1157 |
| poisonedCombatant | №1157 |
| poisonedStrike | №1157 |
| poisonedWeaponAttack | №1158 |
| poisonImmuneTarget | №1157 |
| poisonPreview | №1157 |
| poisonWeapon | №0079 |
| poisonWeaponId | №0079 |
| pole | №0059 |
| policy | №0673 |
| poly | №0062 (+ 1 других файлов) |
| polygon | №0062 |
| pool | №0079 (+ 5 других файлов) |
| poolKind | №0079 |
| pools | №0080 |
| portraitBounds | №0887 |
| pos | №0059 (+ 10 других файлов) |
| pose | №0062 |
| posed | №0066 |
| poses | №0066 |
| position | №0819 |
| positionCounts | №1209 |
| positions | №0059 (+ 5 других файлов) |
| possibleIdElements | №0793 |
| potency | №0080 (+ 1 других файлов) |
| potential | №0062 |
| potion | №0079 (+ 2 других файлов) |
| potionColor | №0079 |
| potionIndex | №1253 |
| potions | №0079 |
| pounds | №0819 |
| power | №0062 (+ 1 других файлов) |
| pp | №0082 (+ 4 других файлов) |
| pPerG | №0791 |
| ppInput | №0791 |
| ppVal | №0791 |
| pr | №0642 (+ 2 других файлов) |
| pre | №0078 |
| predicate | №0062 |
| predict | №1183 |
| predictorTrump | №0656 |
| preFeatSelect | №0701 |
| preferPact | №0649 |
| prefix | №0790 (+ 3 других файлов) |
| preloadPath | №1398 |
| prep | №1308 |
| PREP | №0804 (+ 1 других файлов) |
| prepared | №0642 (+ 3 других файлов) |
| preparedAny | №0812 |
| preparedCount | №0837 |
| preparedFormula | №0079 |
| preparedReaction | №0812 |
| preparedReservation | №0812 |
| prepProfile | №0837 |
| prereq | №0845 |
| preS | №0701 |
| preS1 | №0701 |
| preS2 | №0701 |
| preset | №0063 (+ 3 других файлов) |
| presets | №0067 (+ 1 других файлов) |
| preStats | №0701 |
| prev | №0059 (+ 2 других файлов) |
| preview | №0794 (+ 2 других файлов) |
| previous | №0059 (+ 11 других файлов) |
| previousAC | №0830 |
| previousActive | №0774 |
| previousCount | №1174 |
| previousFetch | №1193 (+ 1 других файлов) |
| previousMageCrypto | №1219 |
| previousRoot | №0774 |
| price | №0668 (+ 1 других файлов) |
| prim | №1197 |
| primary | №0082 (+ 1 других файлов) |
| primaryStat | №0694 |
| prime | №0780 |
| prior | №1242 (+ 2 других файлов) |
| prismaticIndex | №0079 |
| prismaticOptions | №0079 |
| prismAttack | №1158 |
| prismTester | №1158 |
| probe | №0062 (+ 1 других файлов) |
| proceed | №0701 |
| process | №1327 (+ 2 других файлов) |
| processedNames | №0827 |
| processing | №0664 (+ 1 других файлов) |
| PROCESSING | №0673 |
| PROCESSING_DC_BY_RARITY | №0827 |
| PROCESSING_RECIPES | №0674 |
| PROCESSING_TOOL_BY_TYPE | №0827 |
| product | №0081 |
| prof | №0794 (+ 8 других файлов) |
| profBlock | №0746 |
| profBonus | №0625 (+ 4 других файлов) |
| profession | №0674 (+ 2 других файлов) |
| professionBonus | №0081 |
| professionId | №0671 |
| professionLayer | №0673 |
| professions | №0674 |
| PROFESSIONS | №0671 (+ 2 других файлов) |
| PROFICIENCIES_DB | №0823 |
| proficiencyBonus | №0773 |
| proficiencyChoiceHtml | №0701 |
| proficiencyType | №0794 |
| proficient | №0656 (+ 2 других файлов) |
| profId | №0823 (+ 1 других файлов) |
| profIds | №0824 |
| profile | №0059 (+ 11 других файлов) |
| profiles | №0063 (+ 6 других файлов) |
| profInput | №0837 |
| profName | №0824 (+ 1 других файлов) |
| profObj | №0824 (+ 1 других файлов) |
| profOk | №0879 |
| profs | №0794 (+ 3 других файлов) |
| prog | №0074 (+ 4 других файлов) |
| progress | №0820 |
| progressFrame | №0844 |
| progressHandler | №0843 |
| progression | №0078 (+ 11 других файлов) |
| progressPercent | №0781 |
| projected | №0790 (+ 1 других файлов) |
| projection | №0062 |
| projectManifest | №0854 |
| Promise | №1198 (+ 2 других файлов) |
| prompts | №1243 |
| prop | №0079 (+ 2 других файлов) |
| propContainer | №0792 |
| PROPERTIES | №0080 |
| proportions | №1397 |
| props | №0063 (+ 1 других файлов) |
| propTitle | №0792 |
| protectedCase | №1156 |
| protectedHero | №1217 |
| protectedKeys | №0833 |
| proto | №0654 |
| protocol | №0887 |
| proxy | №0812 (+ 1 других файлов) |
| ps | №0070 (+ 2 других файлов) |
| psiLimit | №0715 |
| psion | №1313 |
| psionDisciplines | №0780 |
| pt | №0642 |
| pu | №1313 |
| pugilist | №1239 |
| pugilistAC | №0656 |
| pugilistDefender | №0656 |
| pugilistDigDeepResistant | №0656 |
| pugilistLevelEntry | №0656 |
| pugilistPack | №0656 |
| pugilistSchool | №0656 |
| pugilistState | №0656 |
| pugilistStudy | №0656 |
| pupilDiagnostics | №1361 |
| pupilRound | №1361 |
| pupilSelect | №0064 |
| puppet | №1243 |
| puppetTarget | №0642 |
| puppetWeapon | №0642 |
| purity | №0080 (+ 1 других файлов) |
| pursuits | №0830 |
| pw | №1397 |
| PW | №0073 |
| px | №0062 (+ 2 других файлов) |
| PX | №0073 |
| py | №0064 (+ 1 других файлов) |
| PY | №0073 |
| pz | №0064 |
| q | №0059 (+ 37 других файлов) |
| Q | №0059 |
| q0 | №0062 |
| q1 | №0062 |
| qApi | №0794 |
| qd | №0675 |
| qi | №0784 |
| ql | №0059 |
| qn | №0066 |
| qr | №0780 |
| qs | №1217 |
| qty | №0665 (+ 1 других файлов) |
| quality | №0064 (+ 6 других файлов) |
| QUALITY | №0668 (+ 2 других файлов) |
| QUALITY_GRADES | №0665 |
| QUALITY_TIERS | №0666 |
| qualityFactor | №0665 |
| qualityKey | №0809 |
| qualityPenalty | №0665 |
| quantity | №0793 (+ 2 других файлов) |
| queen | №1217 |
| queenReceipt | №1217 |
| query | №0071 (+ 1 других файлов) |
| queue | №0819 (+ 1 других файлов) |
| queued | №0657 |
| quickGather | №0826 |
| quota | №0060 (+ 1 других файлов) |
| r | №0060 (+ 205 других файлов) |
| R | №0062 (+ 11 других файлов) |
| r0 | №0062 |
| r1 | №0062 (+ 2 других файлов) |
| r2 | №0773 (+ 1 других файлов) |
| race | №0064 (+ 11 других файлов) |
| raceDesc | №0647 |
| raceEntry | №0064 |
| raceId | №0067 (+ 7 других файлов) |
| raceImmune | №0656 |
| raceLabel | №0647 |
| raceList | №0673 |
| raceName | №0625 (+ 1 других файлов) |
| raceObj | №0825 |
| raceResistant | №0656 |
| races | №0067 (+ 3 других файлов) |
| raceSelect | №0625 (+ 2 других файлов) |
| rad | №0062 (+ 1 других файлов) |
| radial | №0062 |
| radii | №0062 |
| radius | №0059 (+ 5 других файлов) |
| raf | №0627 |
| raging | №0656 |
| raise | №0062 |
| rampage | №0657 |
| randIdx | №0083 |
| random | №1184 |
| randomSequence | №1238 |
| randomValue | №1238 |
| randomXOffset | №0773 |
| randomYOffset | №0773 |
| range | №0642 (+ 6 других файлов) |
| rangedIncoming | №0656 |
| rangeFt | №0812 |
| ranger | №1310 |
| rangeU | №1178 |
| rangeV | №1178 |
| rank | №0656 (+ 2 других файлов) |
| RANKS | №0822 |
| raphe | №0059 |
| rare | №0809 |
| rarity | №0668 (+ 4 других файлов) |
| RARITY | №0800 |
| RARITY_WEIGHT | №0879 |
| rarityOrder | №0794 |
| rate | №0062 (+ 1 других файлов) |
| ratio | №0074 (+ 3 других файлов) |
| rats | №0062 |
| raw | №0061 (+ 32 других файлов) |
| rawCat | №0803 |
| rawDestination | №1975 |
| rawItems | №0837 |
| rawParts | №0656 |
| rawRadial | №0063 |
| rawStats | №0794 |
| rawTotal | №0656 |
| rb | №0800 (+ 1 других файлов) |
| rBottom | №0064 |
| rd | №0780 (+ 1 других файлов) |
| rd0 | №0814 |
| re | №0814 (+ 1 других файлов) |
| reach | №0062 |
| reacted | №1217 |
| reaction | №0656 (+ 5 других файлов) |
| reactionButton | №1306 |
| reactionCtx | №0656 (+ 1 других файлов) |
| reactionReduction | №0656 |
| reactionResult | №0656 |
| reactions | №0812 |
| REACTIONS | №0830 |
| read | №0819 (+ 1 других файлов) |
| Readable | №0887 |
| reader | №0833 (+ 2 других файлов) |
| readGlb | №1161 (+ 5 других файлов) |
| readIndex | №1206 (+ 1 других файлов) |
| ready | №0819 (+ 3 других файлов) |
| reagentCount | №0079 |
| reagentGain | №0079 |
| reagentRoll | №0079 |
| reagentsBefore | №1158 |
| reagentTarget | №1158 |
| real | №1398 |
| realAttack | №1225 |
| realCrypto | №1219 |
| realSave | №1231 |
| realSet | №1189 |
| rear | №0062 |
| reason | №0667 (+ 7 других файлов) |
| rebuildMaterialUsage | №0673 |
| rec | №0746 (+ 4 других файлов) |
| receipt | №0075 (+ 1 других файлов) |
| receiptKey | №1189 |
| received | №0803 (+ 2 других файлов) |
| recharge | №0079 (+ 11 других файлов) |
| recipe | №0079 (+ 7 других файлов) |
| recipeId | №0669 |
| recipes | №0668 |
| RECIPES | №0669 (+ 2 других файлов) |
| recipient | №0642 (+ 1 других файлов) |
| record | №0061 (+ 1 других файлов) |
| recorded | №0819 |
| records | №0062 (+ 3 других файлов) |
| recovered | №0666 (+ 1 других файлов) |
| RECOVERY_BY_DURABILITY | №0665 |
| RECOVERY_BY_QUALITY | №0666 |
| red | №0649 |
| reduce | №0872 |
| reduced | №0642 |
| reduction | №0649 |
| ref | №0062 (+ 26 других файлов) |
| reference | №0062 (+ 1 других файлов) |
| referenceNode | №0791 |
| refresh | №0675 |
| refreshBase | №0675 |
| refreshing | №0654 |
| refs | №0081 (+ 3 других файлов) |
| refunded | №0812 |
| reg | №1307 |
| regeneration | №1158 |
| RegExp | №0664 (+ 6 других файлов) |
| region | №0064 (+ 2 других файлов) |
| REGION_MOD | №0800 |
| regionId | №0879 |
| regions | №0060 (+ 4 других файлов) |
| REGIONS | №0879 |
| registered | №1157 (+ 8 других файлов) |
| registry | №0059 (+ 3 других файлов) |
| reject | №0833 (+ 6 других файлов) |
| rejected | №1194 (+ 1 других файлов) |
| rel | №0802 (+ 6 других файлов) |
| relative | №0887 (+ 2 других файлов) |
| release | №1189 |
| releaseGate | №1155 |
| relief | №0079 |
| reliefCount | №0062 |
| reliefResult | №1158 |
| reliefTarget | №1158 |
| reloaded | №1225 |
| relocateGameplayPanels | №0773 |
| rem | №0791 |
| remaining | №0079 (+ 5 других файлов) |
| remainingReduction | №0656 |
| remote | №0652 (+ 2 других файлов) |
| remoteHead | №1156 |
| remoteStatus | №1217 |
| remove | №0064 |
| removeAt | №0079 |
| removed | №0059 (+ 5 других файлов) |
| removedGraft | №0079 |
| removeFromContainer | №0790 |
| render | №0080 (+ 7 других файлов) |
| renderList | №0669 (+ 1 других файлов) |
| renderRecipes | №0673 |
| renderTabs | №0672 |
| renderTools | №0673 |
| rep | №0062 |
| repair | №1191 |
| REPAIR_COST_PER_10 | №0665 |
| REPAIR_PROFILES | №0666 |
| repairBtn | №0794 |
| repairCount | №0665 |
| repaired | №1190 |
| repairPlan | №1190 |
| repCfg | №0062 |
| repeatBtn | №0083 |
| replace | №0642 (+ 1 других файлов) |
| replacement | №1219 |
| repo | №1975 |
| report | №0794 (+ 10 других файлов) |
| repSelect | №0064 |
| reptileCoreCache | №0062 |
| reptilePart | №0064 |
| req | №0649 (+ 52 других файлов) |
| reqHtml | №0746 |
| reqR | №0780 |
| reqs | №0787 |
| reqText | №0671 (+ 1 других файлов) |
| request | №0887 (+ 2 других файлов) |
| requested | №0649 (+ 3 других файлов) |
| requestedAoe | №0812 |
| requestedFeature | №0079 |
| requestedForm | №0780 |
| requestId | №0812 |
| requests | №1242 |
| require | №1327 (+ 1 других файлов) |
| required | №0671 (+ 1 других файлов) |
| requiredEnd | №1211 |
| requiredLevel | №0079 (+ 1 других файлов) |
| requireLevel | №0780 |
| requireTool | №0671 |
| reroll | №0649 (+ 3 других файлов) |
| res | №0649 (+ 45 других файлов) |
| resBox | №0648 (+ 2 других файлов) |
| resDiv | №0792 |
| reservation | №0836 |
| reserved | №0812 |
| reset | №0064 (+ 2 других файлов) |
| resetBuffer | №1159 |
| resist | №0851 |
| resistance | №0079 (+ 1 других файлов) |
| resistanceType | №0079 |
| resistanceTypes | №0079 |
| resistant | №0656 |
| resistantFire | №1157 |
| resistantTarget | №1238 |
| resisted | №1238 |
| resMap | №0649 |
| resolve | №0833 (+ 8 других файлов) |
| resolved | №0069 (+ 1 других файлов) |
| resolvedParts | №0656 |
| resource | №0784 (+ 2 других файлов) |
| RESOURCE_HINTS | №0826 |
| RESOURCE_PROCESSING | №0827 |
| RESOURCE_YIELDS | №0827 |
| resourceBefore | №1238 |
| resourceDefs | №0828 |
| resourceId | №0826 |
| resourceKind | №0812 |
| resources | №0879 (+ 1 других файлов) |
| response | №0843 (+ 3 других файлов) |
| responses | №1188 (+ 1 других файлов) |
| rest | №0780 (+ 2 других файлов) |
| restarted | №1189 |
| rested | №1229 |
| restId | №0822 (+ 1 других файлов) |
| restored | №0649 (+ 13 других файлов) |
| restoredShort | №0648 |
| restoredUse | №1158 |
| restoreFullCheckbox | №0701 |
| restoreUsed | №0079 |
| restStr | №0837 |
| result | №0062 (+ 63 других файлов) |
| resultPending | №0812 |
| results | №0066 (+ 10 других файлов) |
| resultText | №0648 (+ 1 других файлов) |
| resume | №0812 (+ 1 других файлов) |
| resumed | №0819 (+ 1 других файлов) |
| resumedStand | №1217 |
| resumeSpell | №0812 |
| retries | №0822 |
| retry | №0844 |
| returned | №1217 |
| returnedDash | №1217 |
| reused | №0890 |
| rev | №0812 |
| reveal | №0820 |
| reverse | №0063 |
| revision | №0654 (+ 2 других файлов) |
| revival | №1157 |
| revived | №1158 |
| revivedFromZero | №0656 |
| reward | №0671 (+ 4 других файлов) |
| rewardId | №0822 |
| rewards | №0671 |
| rewardX | №0820 |
| rewardY | №0820 |
| rgb | №0064 |
| rht | №0780 |
| ri | №1207 |
| rid | №0872 (+ 2 других файлов) |
| rider | №0839 |
| ridge | №1181 |
| RIDGE_STYLES | №0067 |
| ridges | №0062 |
| ridgeSelect | №0064 |
| ridgeStyle | №1388 |
| right | №0062 (+ 4 других файлов) |
| rigid | №1163 |
| ring | №0059 (+ 1 других файлов) |
| ringCount | №0059 |
| rings | №0063 |
| rise | №0063 (+ 2 других файлов) |
| risk | №0080 (+ 1 других файлов) |
| rite | №0642 (+ 2 других файлов) |
| riteId | №0780 |
| riteKnown | №0814 |
| riteMax | №0780 |
| riteNames | №0642 |
| rites | №0780 (+ 1 других файлов) |
| riteTypes | №0642 |
| rl | №0062 |
| rm | №0656 (+ 1 других файлов) |
| rn | №0814 |
| rn0 | №0814 |
| rn2 | №0814 |
| ro | №1303 |
| robe | №0062 |
| rock | №0064 |
| rogue | №1226 (+ 3 других файлов) |
| role | №0062 (+ 3 других файлов) |
| roleName | №0630 |
| roles | №0674 |
| roll | №0075 (+ 18 других файлов) |
| rolled | №0079 (+ 7 других файлов) |
| rolledRelief | №1158 |
| roller | №0806 (+ 1 других файлов) |
| rollMode | №0648 |
| rollResult | №1238 |
| rolls | №0648 (+ 9 других файлов) |
| rollTypeClass | №0773 (+ 1 других файлов) |
| roofColor | №0064 |
| room | №0817 |
| root | №0062 (+ 99 других файлов) |
| ROOT | №0664 (+ 10 других файлов) |
| rootId | №0854 (+ 1 других файлов) |
| roots | №0062 (+ 4 других файлов) |
| rootSurface | №0059 |
| rootT | №0062 |
| rootY | №0062 |
| rootZ | №0062 |
| roster | №0652 (+ 1 других файлов) |
| rotation | №0064 |
| rough | №0821 (+ 1 других файлов) |
| round | №0806 (+ 1 других файлов) |
| round4 | №1397 |
| rounds | №0834 |
| roundTracker | №0656 |
| roundTrip | №1160 |
| route | №1359 (+ 1 других файлов) |
| routed | №0649 |
| row | №0062 (+ 12 других файлов) |
| rows | №0062 (+ 11 других файлов) |
| ROWS | №0629 |
| rp | №1253 |
| rq | №1304 (+ 1 других файлов) |
| rr | №0062 (+ 8 других файлов) |
| rs | №0642 (+ 2 других файлов) |
| rt | №0649 (+ 1 других файлов) |
| rTop | №0064 |
| rule | №0064 (+ 11 других файлов) |
| rules | №0701 (+ 7 других файлов) |
| RULES | №0822 |
| run | №0074 (+ 2 других файлов) |
| ruName | №0701 (+ 1 других файлов) |
| rune | №0780 (+ 1 других файлов) |
| RUNEKEEPER_INSCRIBED | №0780 |
| runesBefore | №1248 |
| running | №0654 |
| runtime | №0804 (+ 33 других файлов) |
| runtimeFeatures | №0814 |
| runtimes | №0649 |
| runtimeSubclasses | №0814 |
| rw | №1397 |
| rx | №0062 (+ 4 других файлов) |
| rx2 | №0812 |
| ry | №0062 (+ 3 других файлов) |
| rz | №0062 (+ 3 других файлов) |
| rz2 | №0074 |
| s | №0059 (+ 174 других файлов) |
| S | №0073 (+ 1 других файлов) |
| s1 | №0701 |
| s2 | №0701 |
| sa | №0062 |
| safe | №0084 (+ 1 других файлов) |
| SAFE_FILE | №0890 |
| safeFeatureId | №0649 |
| safeGet | №0792 |
| safeName | №0655 |
| safeText | №0773 |
| salty | №1238 |
| saltyDC | №0780 |
| saltyEffect | №0649 |
| saltyHero | №1238 |
| saltyMods | №1238 |
| saltySave | №0780 |
| saltyTarget | №1238 |
| sam | №0069 |
| same | №0666 (+ 8 других файлов) |
| sample | №0062 (+ 4 других файлов) |
| sampleCount | №1211 |
| sampler | №0064 (+ 2 других файлов) |
| samples | №0062 (+ 1 других файлов) |
| sandbox | №1288 (+ 6 других файлов) |
| satin | №0064 |
| savage | №0780 |
| savantFlourish | №0656 |
| savantHP | №1248 |
| save | №0075 (+ 12 других файлов) |
| saveAdv | №0656 |
| saved | №0084 (+ 50 других файлов) |
| savedAlpha | №0833 |
| savedBg | №0869 |
| saveDC | №0642 |
| savedColor | №0869 |
| savedDim | №0869 |
| saveDebuffs | №0656 |
| savedFont | №0833 |
| savedHeritage | №1361 |
| saveDis | №0656 |
| savedOpacity | №0869 |
| savedRetreat | №1217 |
| savedSmall | №1361 |
| savedSurface | №1361 |
| savedTarget | №1245 |
| savedTheme | №0833 |
| savedWander | №1217 |
| saveResult | №0656 |
| saveRoll | №0785 (+ 2 других файлов) |
| saves | №0694 (+ 3 других файлов) |
| savesBeforeRefresh | №1219 |
| saveStat | №0780 |
| sb | №0671 (+ 2 других файлов) |
| sc | №0069 (+ 8 других файлов) |
| scale | №0059 (+ 11 других файлов) |
| scaled | №0064 |
| scalpBuckets | №0062 |
| scalpCache | №0062 |
| scalpSamples | №0062 |
| scene | №0070 (+ 3 других файлов) |
| scenes | №0064 |
| scheduleUpdate | №0793 |
| SCHEMA_VERSION | №0643 (+ 2 других файлов) |
| schoolDamageTarget | №1238 |
| schoolHero | №1238 |
| schoolSave | №1238 |
| schoolText | №0837 |
| scLower | №0837 |
| scope | №1970 |
| scoped | №0649 |
| score | №0062 (+ 8 других файлов) |
| scores | №0687 (+ 3 других файлов) |
| scoreSnapshots | №0079 |
| scout | №1213 |
| screen | №0816 (+ 1 других файлов) |
| script | №1156 |
| scripts | №1199 (+ 1 других файлов) |
| sctx | №1328 |
| sd | №0656 (+ 1 других файлов) |
| se | №0866 |
| sealDamage | №0699 |
| sealedHp | №1246 |
| seals | №0699 (+ 2 других файлов) |
| sealTarget | №1246 |
| seam | №0062 (+ 3 других файлов) |
| seamDamage | №1157 |
| seamGroups | №0059 |
| seamMax | №1161 (+ 1 других файлов) |
| seams | №0062 |
| searchInput | №0837 |
| searchVal | №0837 |
| second | №0819 (+ 1 других файлов) |
| secondary | №0062 |
| secondDead | №1158 |
| secondOpts | №0819 |
| seconds | №0819 |
| section | №0063 |
| seed | №0062 (+ 1 других файлов) |
| seekingAttack | №1158 |
| seen | №0075 (+ 6 других файлов) |
| seenEventIds | №0811 |
| seenNames | №0746 |
| seer | №1217 |
| seg | №0062 |
| segments | №0059 (+ 3 других файлов) |
| sel | №0647 (+ 5 других файлов) |
| select | №0064 (+ 6 других файлов) |
| selected | №0059 (+ 25 других файлов) |
| selected0 | №0662 (+ 1 других файлов) |
| selectedArmorCategory | №0792 |
| selectedAsset | №0071 |
| selectedBg | №0625 (+ 1 других файлов) |
| selectedChar | №0832 |
| selectedClass | №0625 (+ 2 других файлов) |
| selectedClassKey | №0701 |
| selectedClassName | №0701 |
| selectedClothes | №1359 |
| selectedFeatSelect | №0701 |
| selectedId | №0825 |
| selectedIds | №0714 |
| selectedNatural | №0079 |
| selectedRace | №0625 (+ 1 других файлов) |
| selectedSub | №0662 |
| selectedTarget | №0820 |
| selectedTrader | №0802 |
| selectedWeaponCategoryType | №0792 |
| selectedWeaponDice | №0792 |
| selectedWeaponProperties | №0792 |
| selectEl | №0792 |
| selectElem | №0797 |
| selector | №0793 |
| selectors | №0841 |
| selectScreen | №0625 (+ 1 других файлов) |
| selectType | №0792 |
| self | №0780 |
| selfActor | №0654 |
| sellFactor | №0801 |
| sellResult | №1253 |
| SEMVER | №0890 |
| send | №0887 |
| sent | №1296 (+ 7 других файлов) |
| sep | №0059 |
| seq | №0784 (+ 4 других файлов) |
| sequence | №1225 |
| serial | №1241 (+ 1 других файлов) |
| server | №1189 (+ 39 других файлов) |
| Server | №1217 (+ 1 других файлов) |
| session | №0061 (+ 4 других файлов) |
| SESSION | №0654 |
| set | №0790 (+ 2 других файлов) |
| Set | №0664 (+ 14 других файлов) |
| setInterval | №1283 (+ 5 других файлов) |
| setTimeout | №1190 (+ 35 других файлов) |
| settings | №0652 (+ 2 других файлов) |
| settingsPanel | №0833 |
| settled | №0821 |
| sf | №0649 (+ 1 других файлов) |
| sh | №0785 |
| sha | №1340 (+ 3 других файлов) |
| shader | №1183 |
| shaft | №0059 |
| shaftSources | №0059 |
| shape | №0059 (+ 2 других файлов) |
| shaped | №1181 |
| shapeInput | №0064 |
| shapes | №0060 (+ 1 других файлов) |
| shared | №0080 (+ 2 других файлов) |
| sharedAbility | №0079 |
| sharedAliases | №0079 |
| sharedMutagen | №1158 |
| sharedSnapshots | №0079 |
| sharp | №0062 |
| shaved | №0064 |
| sheer | №0064 |
| sheetScreen | №0625 (+ 1 других файлов) |
| shell | №0785 (+ 1 других файлов) |
| shellIX | №0062 |
| shellN | №0062 |
| shellP | №0062 |
| shellUV | №0062 |
| shield | №0656 (+ 3 других файлов) |
| shieldAccess | №0670 |
| shieldAvailable | №0649 |
| shieldBonus | №0794 |
| shielded | №0812 (+ 1 других файлов) |
| shieldRoll | №0656 |
| shieldSlot | №0649 |
| shieldSpent | №0649 |
| shipped | №1202 |
| shirt | №1168 |
| short | №0642 (+ 3 других файлов) |
| shortage | №0666 |
| shortKeys | №0787 (+ 1 других файлов) |
| shortToFull | №0701 |
| shot | №1226 (+ 1 других файлов) |
| shoulder | №0062 (+ 1 других файлов) |
| shoulderSpan | №0062 |
| shouldRestoreFull | №0701 |
| shouldUpdate | №0793 |
| showEP | №0791 |
| showPP | №0791 |
| shuffleBtn | №0083 |
| shutdownCalls | №1330 |
| si | №0062 (+ 3 других файлов) |
| side | №0060 (+ 6 других файлов) |
| sideIndex | №0062 |
| sides | №0064 (+ 11 других файлов) |
| sIdx | №0647 |
| sig | №0812 (+ 1 других файлов) |
| sightHero | №1217 |
| sign | №0066 (+ 2 других файлов) |
| signatures | №1165 (+ 5 других файлов) |
| signed | №0062 |
| signup | №0652 |
| sigTarget | №1238 |
| sigUses | №0812 |
| sin | №0059 |
| single | №0837 |
| singleBox | №0811 |
| singleWeightKg | №0793 |
| size | №0062 (+ 10 других файлов) |
| sizes | №0834 (+ 1 других файлов) |
| sk | №0773 |
| sKey | №0625 |
| skill | №0075 (+ 5 других файлов) |
| SKILL_STAT | №0809 |
| SKILL_TO_VAR_MAP | №0773 |
| skilledDesc | №0664 |
| skillId | №0625 (+ 4 других файлов) |
| skillName | №0773 |
| skillNameRu | №0625 |
| skills | №0625 (+ 3 других файлов) |
| SKILLS_CONFIG | №0084 |
| skillsConfig | №0773 |
| skillsDataObj | №0773 |
| skillsList | №0773 |
| skillsListContainer | №0823 |
| skillsPanel | №0823 (+ 1 других файлов) |
| skillsStr | №0625 (+ 1 других файлов) |
| skillStr | №0625 (+ 1 других файлов) |
| skin | №0060 (+ 5 других файлов) |
| skinBaseline | №1361 |
| skinColorEntry | №0064 |
| skinImages | №1159 |
| skinned | №1173 |
| skinnedPrimitives | №1200 (+ 1 других файлов) |
| skins | №0067 (+ 2 других файлов) |
| skip | №0062 (+ 1 других файлов) |
| skipped | №1226 |
| skirt | №1170 |
| skirtDepth | №0063 |
| skull | №0062 (+ 2 других файлов) |
| sky | №0074 |
| sl | №0062 (+ 6 других файлов) |
| sleep | №1217 |
| sleeve | №0063 |
| sleeveMasks | №0063 |
| sleeves | №0063 (+ 1 других файлов) |
| slices | №0062 |
| slider | №0064 |
| slimeAcid | №1157 |
| slimeAttacker | №1157 |
| slimeBombAttack | №1158 |
| slimeBomber | №1158 |
| slimeHit | №1157 |
| slimeResistantTarget | №1157 |
| slimeVictim | №1157 |
| slot | №0060 (+ 15 других файлов) |
| SLOT_LEVEL | №0845 |
| slot2 | №0780 |
| slot3 | №0780 |
| slot4 | №0780 |
| slotBefore | №1246 |
| slotData | №0837 |
| slotHtml | №0837 |
| slotLevel | №0780 |
| slotMax | №0814 |
| slotRowHtml | №0837 |
| slots | №0063 (+ 12 других файлов) |
| SLOTS | №0078 (+ 2 других файлов) |
| slotsBefore | №1248 |
| slotSnapshot | №0812 |
| sm | №0656 (+ 4 других файлов) |
| small | №0812 |
| smitePart | №0656 |
| smoke | №0844 |
| smooth | №0062 |
| sn | №0062 |
| snake | №0819 |
| snakeId | №1217 |
| snap | №0079 (+ 5 других файлов) |
| snapshot | №0061 (+ 7 других файлов) |
| snapshots | №0656 |
| snout | №0062 |
| sorted | №0794 |
| SOTDQ | №0632 |
| source | №0059 (+ 40 других файлов) |
| SOURCE | №0079 (+ 13 других файлов) |
| SOURCE_TAG | №0671 (+ 1 других файлов) |
| sourceArmor | №0794 |
| sourceCache | №0854 |
| sourceCheck | №0812 |
| sourceCommit | №1974 |
| sourceCount | №0827 |
| sourceGroups | №0701 |
| sourceHashes | №1346 (+ 1 других файлов) |
| sourceHtml | №0837 |
| sourceId | №0657 |
| sourceManifestUrl | №0843 |
| sourceMax | №1208 |
| sourceMean | №1208 |
| sourceMeshCount | №0064 |
| sources | №0642 (+ 10 других файлов) |
| sourceStats | №0817 |
| sourceTag | №0746 |
| sourceToken | №0657 |
| sourceWeapons | №0812 |
| sp | №0070 (+ 9 других файлов) |
| span | №0059 (+ 3 других файлов) |
| spanCurrent | №0781 |
| spanTotal | №0781 |
| sparks | №0844 |
| sparse | №1198 (+ 1 других файлов) |
| sparseJson | №1198 |
| spawn | №1188 |
| spd | №0629 (+ 3 других файлов) |
| spear | №0670 |
| spec | №0658 (+ 7 других файлов) |
| specHtml | №0671 |
| specialBombEffects | №0079 |
| SPECIALIZATIONS | №0671 |
| specId | №0671 |
| species | №0840 |
| specificClass | №0701 |
| specificProf1 | №0824 |
| specificProf2 | №0824 |
| specificProf3 | №0824 |
| specificSources | №0746 |
| specs | №0671 |
| spectral | №0064 |
| speed | №0657 (+ 3 других файлов) |
| speedInput | №0825 |
| speedVal | №0825 |
| spell | №0649 (+ 7 других файлов) |
| spellbladeDeflection | №0656 |
| spellbladeOnly | №0828 |
| SPELLCASTING_CLASSES | №0837 |
| spellcastingCard | №0837 |
| spellClass | №0837 |
| spellDamageMods | №0812 (+ 1 других файлов) |
| spellDesc | №0837 |
| spellId | №0820 |
| spellLevel | №0649 (+ 4 других файлов) |
| spellList | №0078 (+ 1 других файлов) |
| spellName | №0804 (+ 4 других файлов) |
| spellNameEscaped | №0837 |
| spellObj | №0837 |
| spellPayload | №0812 |
| spellReaction | №0812 |
| spells | №0804 (+ 4 других файлов) |
| SPELLS_KNOWN | №0078 |
| spellsByLevel | №0804 |
| spellsHtml | №0837 |
| spellSourcesNow | №0828 |
| spent | №0625 (+ 11 других файлов) |
| spentLevel | №0649 |
| sPerG | №0791 |
| spine | №0062 |
| spInput | №0791 |
| spiritAttacks | №0785 |
| spiritAuto | №1238 |
| spiritHp | №0780 |
| spiritMax | №0780 |
| spiritRestored | №0780 |
| spirits | №0845 |
| splay | №0062 |
| spread | №0062 |
| spVal | №0791 |
| sq | №0062 |
| sql | №1151 |
| squares | №1183 |
| squircle | №0062 |
| sr | №0649 (+ 6 других файлов) |
| src | №0060 (+ 34 других файлов) |
| srcA | №0837 |
| srcALower | №0837 |
| srcB | №0837 |
| srcBLower | №0837 |
| ss | №0656 (+ 1 других файлов) |
| st | №0062 (+ 7 других файлов) |
| stability | №0080 (+ 1 других файлов) |
| stableFound | №1339 |
| stableLegacy | №1339 |
| stack | №0665 (+ 1 других файлов) |
| stageCount | №1339 |
| staged | №1193 (+ 2 других файлов) |
| STAGED_KEY | №0843 |
| stageManifestUrl | №0843 |
| stairs | №0077 (+ 1 других файлов) |
| stale | №1326 (+ 2 других файлов) |
| stalker | №1313 |
| stance | №0780 |
| STAND_TURN_FLAGS | №0819 |
| standard | №1184 |
| standardRaceIds | №1337 |
| standing | №1217 |
| standPC | №1217 |
| standPhone | №1217 |
| standRoster | №1217 |
| standServer | №1217 |
| start | №0062 (+ 12 других файлов) |
| started | №0784 (+ 1 других файлов) |
| startI | №1207 (+ 1 других файлов) |
| startingProfession | №0647 |
| startupRun | №0843 |
| startVol | №0083 |
| startY | №0063 |
| stat | №0075 (+ 13 других файлов) |
| STAT_ALIASES | №0828 |
| STAT_META | №0870 |
| STAT_NAMES | №0644 |
| stat2 | №0701 |
| statBonus | №0746 |
| statBonusKeys | №0746 |
| state | №0060 (+ 43 других файлов) |
| statElem | №0837 |
| stateOnly | №1342 |
| states | №0840 |
| statId | №0625 (+ 2 других файлов) |
| statKey | №0625 (+ 6 других файлов) |
| statKeysMap | №0701 |
| statMod | №0648 (+ 2 других файлов) |
| statName | №0773 |
| statNames | №0625 (+ 1 других файлов) |
| statNameShort | №0773 |
| statNamesShort | №0625 (+ 1 других файлов) |
| statOptions | №0648 (+ 1 других файлов) |
| stats | №0787 (+ 11 других файлов) |
| STATS | №0644 |
| STATS_CONFIG | №0084 |
| statsConfig | №0773 |
| statSelect | №0655 |
| statsGrid | №0773 |
| statsList | №0648 |
| status | №0833 (+ 8 других файлов) |
| STATUS | №0661 |
| statusClass | №0661 |
| statusEl | №0083 |
| statusPC | №1217 |
| statusPhone | №1217 |
| statusServer | №1217 |
| statusText | №0773 (+ 1 других файлов) |
| steel | №0064 |
| stem | №0068 (+ 2 других файлов) |
| stems | №1346 |
| stench | №1158 |
| stenchTarget | №1158 |
| step | №0062 (+ 5 других файлов) |
| steps | №0074 (+ 2 других файлов) |
| stepTime | №0083 |
| sternumSpan | №0062 |
| stock | №0801 |
| stone | №0872 |
| stop | №0657 |
| stopped | №0821 |
| storage | №0654 (+ 3 других файлов) |
| STORAGE_KEY | №0667 (+ 2 других файлов) |
| store | №1166 (+ 5 других файлов) |
| stored | №1298 |
| str | №0793 (+ 12 других файлов) |
| strand | №0062 |
| strap | №0063 |
| stream | №0890 |
| strength | №0793 |
| strenuous | №0826 |
| stride | №0063 (+ 9 других файлов) |
| strikeHP | №1247 |
| String | №0664 (+ 23 других файлов) |
| strInput | №0793 |
| stripped | №0812 |
| strMod | №0773 |
| structureBlast | №1157 |
| structureTarget | №1157 |
| studied | №0780 (+ 1 других файлов) |
| style | №0062 (+ 7 других файлов) |
| STYLE_ID | №0844 |
| styleEl | №0794 |
| styles | №0780 (+ 5 других файлов) |
| styleTag | №0833 (+ 1 других файлов) |
| sub | №0075 (+ 9 других файлов) |
| subByName | №0796 |
| subclass | №1199 (+ 3 других файлов) |
| SUBCLASS_FEATURES | №0649 |
| SUBCLASS_MAP | №0649 |
| subclasses | №0642 (+ 6 других файлов) |
| subclassHtml | №0701 |
| subclassLevel | №0779 |
| subclassName | №0714 (+ 1 других файлов) |
| subclassPacks | №0872 |
| subclassResult | №1158 |
| subclassSelect | №0701 |
| subData | №0714 |
| subFeatures | №0796 |
| subId | №0079 |
| subIds | №0873 |
| subject | №0819 |
| submit | №1151 |
| subOptionsHtml | №0701 |
| subpacks | №0079 |
| subs | №0079 (+ 2 других файлов) |
| SUBS | №0822 (+ 1 других файлов) |
| subVal | №0781 |
| success | №0075 (+ 6 других файлов) |
| suffix | №0662 |
| suit | №0820 (+ 3 других файлов) |
| suite | №0855 (+ 1 других файлов) |
| SUITS | №0822 |
| sum | №0059 (+ 16 других файлов) |
| summary | №0064 (+ 10 других файлов) |
| summonX | №0820 |
| summonY | №0820 |
| sums | №0062 (+ 2 других файлов) |
| sumSq | №1207 |
| sUp | №0746 |
| supernatural | №0780 |
| supportedSave | №1248 |
| suppressBodyHP | №0648 |
| surface | №0062 (+ 2 других файлов) |
| surfaceDiagnostics | №1361 |
| surfaceKind | №0064 |
| surfaceSelect | №0064 |
| surfaceUrl | №0064 |
| surge | №1236 (+ 1 других файлов) |
| surprised | №0649 |
| sv | №0070 (+ 6 других файлов) |
| sv2 | №0780 |
| swap | №0822 |
| swapped | №1217 |
| swarm | №0064 |
| swarmForm | №0064 |
| swarmLimits | №0067 |
| swarmMotion | №0064 |
| swift | №0780 |
| swiperContainer | №0823 (+ 1 других файлов) |
| sx | №0062 (+ 3 других файлов) |
| sy | №0062 (+ 3 других файлов) |
| synapse | №1158 |
| synapseInstall | №1158 |
| synapseRecord | №0079 |
| sync | №0888 |
| syncRequested | №0811 |
| synergies | №0080 (+ 1 других файлов) |
| SYNERGY | №0080 |
| synergySet | №0080 |
| sys | №0064 (+ 18 других файлов) |
| sz | №0062 (+ 3 других файлов) |
| t | №0059 (+ 104 других файлов) |
| T | №0059 (+ 2 других файлов) |
| t2 | №0814 |
| ta | №0780 |
| tab | №0071 (+ 4 других файлов) |
| tabButtons | №0794 |
| table | №0642 (+ 6 других файлов) |
| tabs | №0672 |
| tabsContainer | №0794 |
| tabsNav | №0869 |
| tabsWrapper | №0794 |
| tacticalBack | №1217 |
| tacticalPC | №1217 |
| tacticalPhone | №1217 |
| tacticalRoster | №1217 |
| tacticalServer | №1217 |
| tactics | №0873 |
| tag | №0062 (+ 15 других файлов) |
| tagOk | №0803 |
| tags | №0062 (+ 9 других файлов) |
| tail | №0062 |
| tailEnd | №0062 |
| tailRoot | №0062 |
| take | №0642 (+ 7 других файлов) |
| takeFromContainer | №0790 |
| taken | №0075 |
| tal | №0780 |
| tampered | №1334 |
| tangent | №0062 |
| taper | №0062 (+ 1 других файлов) |
| tapLength | №0798 |
| target | №0059 (+ 49 других файлов) |
| targetActor | №0819 |
| targetChar | №0832 |
| targetCharId | №0832 |
| targetClass | №0787 (+ 1 других файлов) |
| targetClasses | №0656 |
| targetClassesForSlime | №0656 |
| targetContent | №0794 |
| targetCopy | №0822 |
| targetGrafts | №0656 |
| targetGrappled | №0780 |
| targetH | №0074 |
| targetHasArmor | №0656 |
| targetId | №0657 (+ 6 других файлов) |
| targetIsPugilist | №0656 |
| targetLabels | №1120 |
| targetLevel | №0701 (+ 1 других файлов) |
| targetList | №0657 |
| targetLvl | №0833 |
| targetMeshIndex | №1197 |
| targetName | №0657 |
| targetParent | №0791 |
| targetPath | №1197 (+ 3 других файлов) |
| targetPrim | №1197 |
| targetPrimIndex | №1197 |
| targetProfId | №0824 (+ 1 других файлов) |
| targetProgress | №0844 |
| targetReports | №1209 |
| targetResistances | №0656 |
| targets | №0062 (+ 9 других файлов) |
| targetSnapshot | №0819 |
| targetTok | №0657 |
| targetToken | №0657 |
| targetType | №0814 |
| targetVol | №0083 |
| targetW | №0074 |
| tarot | №0656 (+ 1 других файлов) |
| tarotAC | №0656 |
| tarotActor | №0773 |
| tarotAdv | №0656 |
| tarotCast | №0836 |
| tarotCheck | №0812 |
| tarotDis | №0656 |
| tarotFactor | №0656 |
| tarotForced | №0656 |
| tarotIgnoresResistance | №0656 |
| tarotInitiative | №0774 |
| tarotMod | №0656 |
| tarotOwner | №0774 |
| tarotReroll | №0656 |
| tarotRound | №0784 |
| tarotSave | №0656 |
| tarotScene | №0656 |
| tarotTurnId | №0774 |
| TASKS | №0859 |
| tavern | №1975 |
| tb | №0809 |
| tc | №0780 (+ 1 других файлов) |
| team | №0812 |
| teeth | №0062 |
| teleportAllyId | №0820 |
| teleportX | №0820 |
| teleportY | №0820 |
| temp | №0656 (+ 6 других файлов) |
| TEMPER | №0802 |
| tempHp | №0780 |
| template | №0656 (+ 1 других файлов) |
| term | №1203 |
| terms | №1203 (+ 2 других файлов) |
| terror | №0062 |
| test | №0844 (+ 2 других файлов) |
| testDir | №1398 |
| testRecipe | №1190 |
| tests | №1341 |
| tets | №0062 |
| tex | №0063 (+ 2 других файлов) |
| text | №0064 (+ 26 других файлов) |
| textColor | №0773 |
| TextDecoder | №1161 (+ 21 других файлов) |
| textSpan | №0773 |
| texture | №0070 (+ 3 других файлов) |
| textures | №1975 |
| th | №0074 (+ 1 других файлов) |
| theftRef | №0820 |
| theme | №0833 |
| themed | №0674 |
| themeKey | №0833 |
| themeSelect | №0833 |
| theta | №0059 (+ 1 других файлов) |
| thick | №1359 |
| thickness | №0062 |
| thigh | №0060 |
| thin | №1359 |
| THIRD_CASTERS | №0828 |
| THR | №0810 |
| thresholds | №0806 (+ 1 других файлов) |
| THRESHOLDS | №0806 |
| thumbDir | №0062 |
| thumbEnd | №0062 |
| thumbRoot | №0062 |
| thumbs | №0869 |
| thumbSide | №0062 |
| ti | №0062 (+ 3 других файлов) |
| tick | №0812 |
| tid | №0657 |
| tie | №1160 |
| tier | №0666 |
| tile | №0063 |
| time | №0069 (+ 4 других файлов) |
| timedHero | №1158 |
| timeout | №0654 (+ 1 других файлов) |
| timer | №0654 (+ 3 других файлов) |
| timers | №1189 |
| times | №0069 |
| timeSpan | №0773 |
| timeStr | №0791 |
| timeString | №0773 |
| tint | №0064 |
| tiny | №1247 |
| tip | №0059 (+ 1 других файлов) |
| tipSelect | №0064 |
| title | №0064 (+ 7 других файлов) |
| titleEl | №0793 (+ 1 других файлов) |
| titleElem | №0797 (+ 1 других файлов) |
| titleText | №0837 |
| tl | №0059 (+ 1 других файлов) |
| tm | №0773 (+ 1 других файлов) |
| tmax | №0074 |
| tmin | №0074 |
| tmp | №0890 |
| tn | №1200 (+ 1 других файлов) |
| to | №0633 (+ 3 других файлов) |
| toggle | №0667 |
| toggleContainer | №0790 |
| tok | №0657 (+ 2 других файлов) |
| token | №0654 (+ 3 других файлов) |
| tokens | №0068 (+ 1 других файлов) |
| tool | №0637 (+ 10 других файлов) |
| TOOL_IDS | №0669 |
| TOOL_LABELS | №0669 |
| toolbar | №0790 |
| toolBox | №0820 |
| toolId | №0809 |
| toolLabel | №0820 |
| toolMatrix | №0673 |
| toolOk | №0879 |
| toolProficient | №0820 |
| tools | №0082 (+ 5 других файлов) |
| TOOLS | №0673 |
| toolsStr | №0625 (+ 1 других файлов) |
| toolStat | №0820 |
| toolStr | №0647 |
| toolText | №0820 |
| tooth | №0062 |
| toothColor | №1361 |
| toothPart | №0062 |
| top | №0059 (+ 5 других файлов) |
| topology | №1173 |
| topRow | №0794 |
| torso | №0062 (+ 1 других файлов) |
| total | №0062 (+ 35 других файлов) |
| totalAtk | №0837 |
| totalAttack | №0648 |
| totalAttackBonus | №0773 |
| totalCopper | №0791 |
| totalCurrentLevel | №0701 |
| totalDamage | №0648 |
| totalDiceDamage | №0648 |
| totalGain | №0701 |
| totalLevel | №0701 (+ 1 других файлов) |
| totalMod | №0773 |
| totalObjects | №0072 |
| totals | №0654 (+ 1 других файлов) |
| totalSkillMod | №0835 |
| totalSum | №0773 (+ 1 других файлов) |
| totalWeight | №0790 |
| totalWeightKg | №0793 (+ 1 других файлов) |
| totalWeightLb | №0793 |
| totalZones | №0072 |
| totem | №0649 |
| touched | №0812 |
| touchHp | №0814 |
| toxic | №1158 |
| toxicDC | №0079 |
| toxicSave | №0079 |
| toxicTarget | №0079 (+ 1 других файлов) |
| tp | №0812 |
| tr | №0814 (+ 1 других файлов) |
| track | №0083 |
| tracker | №0079 (+ 5 других файлов) |
| trackNameEl | №0083 |
| TRADE_KEY | №0803 |
| traderId | №0800 (+ 2 других файлов) |
| TRADERS | №0800 |
| traditionActions | №0814 |
| traditions | №0814 |
| trained | №1219 (+ 1 других файлов) |
| transfer | №1197 |
| transformed | №1206 (+ 1 других файлов) |
| transforms | №0066 |
| translated | №0068 (+ 1 других файлов) |
| transported | №1217 |
| transpose | №1159 |
| travelling | №1217 |
| tri | №0059 (+ 3 других файлов) |
| triangleHits | №1208 |
| triangles | №0062 (+ 5 других файлов) |
| trick | №0820 |
| TRICK_FEATURES | №0822 |
| trickster | №1217 |
| triggerCustomCreation | №0792 |
| TRIGGERS | №0819 |
| tris | №0062 |
| true | №0780 (+ 3 других файлов) |
| trunk | №0062 |
| trust | №1151 |
| ts | №0812 (+ 1 других файлов) |
| tt | №0074 (+ 2 других файлов) |
| tTok | №0656 |
| tu | №1309 (+ 1 других файлов) |
| tuft | №0062 |
| tufts | №0062 |
| turn | №0780 (+ 2 других файлов) |
| turned | №0649 |
| turnId | №0784 (+ 1 других файлов) |
| turnKey | №0780 |
| turnOne | №1157 |
| turnTwo | №1157 |
| tusks | №0062 |
| tw | №0074 |
| two | №1232 |
| tx | №0070 (+ 4 других файлов) |
| txt | №0823 (+ 2 других файлов) |
| typ | №0780 (+ 1 других файлов) |
| type | №0059 (+ 59 других файлов) |
| typeCount | №1209 |
| typedExtraTotal | №0656 |
| types | №0834 (+ 3 других файлов) |
| TYPES | №0801 |
| typeSelect | №0792 |
| u | №0059 (+ 16 других файлов) |
| U | №0059 |
| ub | №0074 |
| ui | №0843 (+ 1 других файлов) |
| uiColorOptions | №0869 |
| uid | №1151 (+ 1 других файлов) |
| uiFreeGather | №0826 |
| uiGather | №0826 |
| uiMix | №0080 |
| Uint16Array | №1159 (+ 22 других файлов) |
| Uint32Array | №1159 (+ 27 других файлов) |
| Uint8Array | №1161 (+ 22 других файлов) |
| ul | №0062 |
| unacted | №0649 |
| unarmoredBase | №0656 |
| unbreakable | №1238 |
| unbreakableHero | №1238 |
| uncouthId | №0780 |
| uncouthTargets | №0780 |
| undead | №1309 |
| undeadFocus | №0656 |
| undo | №0649 |
| unescape | №1296 (+ 2 других файлов) |
| unique | №0063 (+ 1 других файлов) |
| uniqueFeatsMap | №0701 |
| uniqueMap | №0837 |
| uniqueSuffix | №0792 |
| unit | №0062 (+ 4 других файлов) |
| units | №0833 |
| unknown | №1181 (+ 2 других файлов) |
| unrelated | №1225 (+ 1 других файлов) |
| untrained | №1232 |
| up | №0062 (+ 1 других файлов) |
| update | №0675 (+ 2 других файлов) |
| updateCloudStatus | №0833 |
| updated | №0746 |
| updateListeners | №0888 |
| updater | №0887 (+ 2 других файлов) |
| updateRun | №0843 |
| updateScheduled | №0793 |
| uploadImage | №0064 |
| uploads | №1159 |
| upper | №0060 (+ 5 других файлов) |
| upperSnout | №0062 |
| upTo | №0714 |
| uri | №0070 |
| url | №0064 (+ 40 других файлов) |
| URL | №1189 |
| urlPath | №0890 |
| usage | №0064 |
| use | №0666 |
| useBtn | №0794 |
| used | №0642 (+ 9 других файлов) |
| usedBy | №0674 |
| usedCombat | №0812 |
| usedCount | №0655 |
| usedVal | №0837 |
| useFeature | №0810 |
| useFur | №0064 |
| useReptile | №0064 |
| userProfsIds | №0794 |
| uses | №0649 (+ 3 других файлов) |
| USES | №0804 |
| usesHtml | №0655 |
| useSkinMicro | №0064 |
| utilityArmor | №1217 |
| utilityBack | №1217 |
| utilityBerry | №1217 |
| utilityDash | №1217 |
| utilityPC | №1217 |
| utilityPhone | №1217 |
| utilityRoster | №1217 |
| utilityServer | №1217 |
| uv | №0059 (+ 6 других файлов) |
| uvAnchor | №0059 |
| uvDet | №0059 |
| uvFit | №0059 |
| ux | №0062 |
| uy | №0062 |
| uz | №0062 |
| v | №0060 (+ 150 других файлов) |
| V | №0059 (+ 1 других файлов) |
| v0 | №1205 (+ 2 других файлов) |
| v1 | №1205 (+ 2 других файлов) |
| v2 | №1205 (+ 2 других файлов) |
| v2Broken | №1184 |
| va | №1205 (+ 4 других файлов) |
| val | №0083 (+ 14 других файлов) |
| valEl | №0625 (+ 1 других файлов) |
| valid | №1215 |
| validate | №0673 |
| validBoons | №0780 |
| validRelative | №1194 |
| validStats | №0746 |
| valInput | №0792 |
| valName | №0625 (+ 1 других файлов) |
| vals | №0069 (+ 2 других файлов) |
| valStr | №0625 (+ 1 других файлов) |
| value | №0060 (+ 35 других файлов) |
| values | №0070 (+ 7 других файлов) |
| variableNameUsed | №0773 |
| variant | №1268 |
| variants | №1170 |
| varName | №0773 (+ 2 других файлов) |
| vary | №1183 |
| vb | №1205 (+ 3 других файлов) |
| vc | №1205 (+ 3 других файлов) |
| vector | №0066 |
| venom | №1158 |
| venomDamage | №1157 |
| venomFeature | №1158 |
| venomHero | №1158 |
| venomsmithPoisonImmune | №0656 |
| venomTarget | №1157 |
| verbal | №0819 |
| verm | №0642 |
| version | №0833 (+ 4 других файлов) |
| VERSION | №0067 (+ 25 других файлов) |
| versionText | №0843 |
| vertex | №0062 (+ 1 других файлов) |
| vertices | №0059 (+ 8 других файлов) |
| verts | №0063 (+ 1 других файлов) |
| vesselHP | №1247 |
| vi | №1205 (+ 2 других файлов) |
| victim | №0819 (+ 4 других файлов) |
| view | №0065 (+ 8 других файлов) |
| viewIndex | №0070 |
| views | №0070 (+ 7 других файлов) |
| viscera | №1238 |
| visceraTarget | №1238 |
| visible | №0062 (+ 8 других файлов) |
| visionBack | №1217 |
| visionPC | №1217 |
| visionPhone | №1217 |
| visionRoster | №1217 |
| visionServer | №1217 |
| vm | №0664 (+ 149 других файлов) |
| voice | №1158 |
| voiceInstall | №1158 |
| volatility | №0080 (+ 1 других файлов) |
| volStep | №0083 |
| volumeRange | №0083 |
| volumes | №0062 |
| vp | №0074 |
| vr | №0812 |
| vs | №0064 |
| vuln | №0851 |
| vulnerable | №0656 (+ 1 других файлов) |
| vx | №0062 (+ 1 других файлов) |
| vy | №0062 |
| vz | №0062 (+ 1 других файлов) |
| w | №0060 (+ 33 других файлов) |
| W | №0062 (+ 2 других файлов) |
| w1 | №0062 |
| w2 | №0062 |
| w3 | №0062 |
| wa | №0656 (+ 1 других файлов) |
| wager | №1217 (+ 1 других файлов) |
| wagerGuard | №0820 |
| waistPoints | №1170 |
| waived | №0804 |
| walk | №0845 |
| wall | №0064 |
| wallCache | №0074 |
| wallet | №0800 |
| walletGrid | №0791 |
| wallpapersGridHtml | №0869 |
| wallTypes | №0077 |
| walter | №0062 |
| walterCorpseTarget | №0647 |
| wandering | №1217 |
| wanderPhone | №1217 |
| want | №0802 (+ 2 других файлов) |
| wanted | №0062 (+ 2 других файлов) |
| wantedClass | №0701 |
| war | №0632 (+ 1 других файлов) |
| WAR_ACADEMIES | №0777 |
| ward | №0656 (+ 1 других файлов) |
| wardAbsorbed | №0656 |
| wardenResistant | №0656 |
| wardenSurvive | №0656 |
| wardReduce | №0656 |
| wardrobeSaved | №1359 |
| wardState | №0656 |
| warlordParry | №0656 |
| warp | №1179 (+ 1 других файлов) |
| wasLastStand | №0784 |
| wasNewClass | №0701 |
| wasStand | №0656 |
| wave | №0062 |
| wb | №1205 (+ 2 других файлов) |
| wc | №1205 (+ 2 других файлов) |
| weapon | №0824 (+ 8 других файлов) |
| weaponAttack | №1235 |
| weaponFields | №0792 |
| weaponId | №0824 (+ 2 других файлов) |
| weaponName | №0824 (+ 2 других файлов) |
| weapons | №0812 |
| weaponsDb | №0824 (+ 1 других файлов) |
| wear | №0666 |
| webbedTarget | №1158 |
| webDebuffs | №0079 |
| webResult | №1158 |
| webRoot | №0887 |
| webSave | №0079 |
| webTarget | №0079 |
| weight | №0062 (+ 5 других файлов) |
| weightInp | №0792 |
| weightRes | №0792 |
| weights | №0059 (+ 6 других файлов) |
| weightStr | №0793 (+ 1 других файлов) |
| weightValue | №1346 |
| weldedBoundary | №0059 |
| weldKey | №0059 |
| wh | №0062 |
| whiskers | №0062 |
| who | №0812 |
| wi | №0077 (+ 1 других файлов) |
| wide | №0062 |
| width | №0062 (+ 7 других файлов) |
| wild | №0631 (+ 1 других файлов) |
| willActivate | №0656 |
| willingTargetIds | №0820 |
| win | №0887 (+ 5 других файлов) |
| window | №1975 |
| wingAngle | №0062 |
| wis | №0629 (+ 11 других файлов) |
| wisMod | №0625 (+ 1 других файлов) |
| WITCH_CRAFT_DATA | №0780 |
| WITCH_CRAFTS | №0780 |
| WITCH_CURSE_EFFECTS | №0780 |
| WITCH_CURSES | №0780 |
| WITCH_GRAND_HEXES | №0780 |
| WITCH_HEXES | №0780 |
| witchAttackPenalty | №0656 |
| witchElemental | №0656 |
| witchImperil | №0656 |
| witchLabels | №0780 |
| witchPack | №0780 |
| withFade | №0869 |
| within1 | №1211 |
| within5 | №1211 |
| wiz | №0812 |
| Wizard | №1184 |
| wk | №1208 |
| wl | №0649 |
| wName | №0648 |
| wolf | №1247 |
| won | №1224 |
| wood | №0064 |
| words | №0068 |
| world | №0059 (+ 2 других файлов) |
| WORLD_STATE | №0879 |
| woven | №0064 |
| wp | №0869 (+ 1 других файлов) |
| wrap | №0626 (+ 4 других файлов) |
| wrapped | №0784 (+ 4 других файлов) |
| wrappedTools | №0828 |
| wrapper | №0773 (+ 1 других файлов) |
| wrapS | №0074 |
| wrapT | №0074 |
| wrist | №0062 |
| wrists | №0062 |
| write | №0819 |
| wrong | №1238 (+ 2 других файлов) |
| ws | №0064 (+ 2 других файлов) |
| wt | №0064 (+ 1 других файлов) |
| ww | №0074 |
| wx | №0073 (+ 1 других файлов) |
| wy | №0073 (+ 1 других файлов) |
| x | №0060 (+ 163 других файлов) |
| X | №0073 |
| x0 | №0062 |
| x1 | №0062 (+ 2 других файлов) |
| x2 | №0072 (+ 1 других файлов) |
| xenoHero | №1157 |
| xenoOwner | №1158 |
| xn | №0082 (+ 1 других файлов) |
| xp | №0629 (+ 11 других файлов) |
| XP_BY_CR | №0806 |
| xs | №1337 |
| xt | №0082 |
| xx | №0062 (+ 3 других файлов) |
| xy | №0074 |
| y | №0059 (+ 55 других файлов) |
| Y | №0062 (+ 1 других файлов) |
| y0 | №0062 (+ 1 других файлов) |
| y1 | №0062 (+ 4 других файлов) |
| y2 | №0072 (+ 2 других файлов) |
| yaw | №0064 (+ 36 других файлов) |
| yd | №0780 |
| yes | №0060 (+ 2 других файлов) |
| yf | №1205 |
| yFile | №1207 |
| ys | №0062 |
| yuan | №1165 (+ 2 других файлов) |
| yy | №0062 (+ 1 других файлов) |
| z | №0059 (+ 19 других файлов) |
| z0 | №0062 (+ 1 других файлов) |
| z1 | №0062 (+ 1 других файлов) |
| zb | №0062 |
| zf | №0062 |
| zFile | №1207 |
| ZH | №0073 |
| zi | №0073 |
| zlib | №1183 (+ 7 других файлов) |
| zoom | №0064 (+ 2 других файлов) |
| zs | №0073 |
| ZW | №0073 |
| ZX | №0073 |
| ZY | №0073 |
| zz | №0062 (+ 1 других файлов) |

### Глобальные JS API (563)

| Имя | Исходные файлы |
|---|---|
| __diceGameplayRelocationObserver | №0773 |
| __diceGameplayRelocationQueued | №0773 |
| __diceTabPanelObserver | №0773 |
| __DND_APP_BOOT_READY | №0084 |
| __dndGameplayV57Waiter | №0784 |
| __dndLootV36 | №0808 |
| __dndLootV37 | №0809 |
| __dndLootV40 | №0807 |
| __dndModalFrameObserverInstalled | №0833 |
| __dndPendingReactionRequest | №0812 |
| __fallbackRollDice | №0773 |
| __map | №1189 |
| __TEST_RESULT__ | №1324 |
| _dndFaqRender | №0816 |
| _dndSave | №0839 (+ 6 других файлов) |
| _dndTourBack | №0816 |
| _dndTourNext | №0816 |
| _dndTourSkip | №0816 |
| _expBeforeLevelUp | №0701 |
| _loadedFeatsMap | №0701 |
| _loadedSubclassOptions | №0701 |
| _originalAddItemToInventory | №0793 |
| AbortController | №0843 |
| ACCURSED_V11 | №0078 |
| accursedAfflictions | №0078 |
| accursedProgression | №0078 (+ 2 других файлов) |
| accursedRuntime | №0078 (+ 1 других файлов) |
| addEventListener | №1219 (+ 4 других файлов) |
| addExperienceValue | №0781 |
| addItemToInventory | №0793 (+ 2 других файлов) |
| ALCHEMIST_MHP_2024 | №0079 |
| alchemistProgression | №0678 |
| alert | №0812 (+ 3 других файлов) |
| allCharacters | №0625 (+ 4 других файлов) |
| appDebugLogs | №0833 (+ 1 других файлов) |
| appendDiceLog | №0649 (+ 3 других файлов) |
| applyClassProgression | №0714 |
| applyConditionsToRoll | №1236 |
| applyDndASI | №0828 |
| applyMulticlassProficiencies | №0701 (+ 1 других файлов) |
| applySubclassProgression | №0649 (+ 1 других файлов) |
| artificerProgression | №0680 |
| autoSaveCurrentCharacter | №0082 (+ 39 других файлов) |
| averageHpIncrease | №0701 |
| barbarianProgression | №0682 |
| bardProgression | №0684 |
| beastheartProgression | №0687 (+ 1 других файлов) |
| BeastheartRuntime | №0687 |
| bloodHunterProgression | №0689 |
| calculateMods | №0828 (+ 1 других файлов) |
| changePointBuyStat | №0625 (+ 1 других файлов) |
| checkMulticlassRequirements | №0787 (+ 1 других файлов) |
| chooseAssassinSubclass | №0649 |
| chooseMetamagic | №0649 |
| chooseSubclass | №0714 |
| chooseSubclassForClass | №0649 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0714 |
| CLASSES_REFERENCE | №0079 (+ 4 других файлов) |
| clericProgression | №0690 |
| closeAddFeatModal | №0746 |
| closeCharacterCreationModal | №0625 (+ 1 других файлов) |
| closeCustomAlert | №0793 |
| closeDndChangelog | №0816 |
| closeDndNetworkModal | №0811 |
| closeExperienceModal | №0781 |
| closeIconSettingsModal | №0833 (+ 2 других файлов) |
| closeLevelUpModal | №0701 |
| closeSettingsModal | №0833 |
| Companions | №0659 |
| confirm | №0064 (+ 2 других файлов) |
| confirmAddFeatManual | №0746 |
| confirmLevelUp | №0701 |
| createNewCharacter | №0625 (+ 1 других файлов) |
| createSwarmAvatar | №0840 |
| crypto | №1214 (+ 19 других файлов) |
| currentChar | №0833 (+ 31 других файлов) |
| currentCharacter | №0833 (+ 10 других файлов) |
| currentCharacterId | №0654 (+ 2 других файлов) |
| currentRollMode | №1232 |
| defaultArmors | №0085 |
| defaultConsumables | №0660 (+ 1 других файлов) |
| defaultJunk | №0795 (+ 2 других файлов) |
| defaultMaterials | №0805 (+ 2 других файлов) |
| defaultWeapons | №0824 (+ 1 других файлов) |
| disableDndDebugRuntime | №0833 (+ 1 других файлов) |
| DND_ALCHEMY_GATHERING_V52 | №0082 |
| DND_APP_ICONS | №0833 (+ 2 других файлов) |
| DND_BESTIARY_V56_1 | №0629 |
| DND_BESTIARY_V56_10 | №0630 |
| DND_BESTIARY_V56_11 | №0631 |
| DND_BESTIARY_V56_12 | №0632 |
| DND_BESTIARY_V56_13 | №0633 |
| DND_BESTIARY_V56_2 | №0634 |
| DND_BESTIARY_V56_3 | №0635 |
| DND_BESTIARY_V56_4 | №0636 |
| DND_BESTIARY_V56_5 | №0637 |
| DND_BESTIARY_V56_6 | №0638 |
| DND_BESTIARY_V56_7 | №0639 |
| DND_BESTIARY_V56_8 | №0640 |
| DND_BESTIARY_V56_9 | №0641 |
| DND_CRAFT_DISASSEMBLY_V51 | №0665 |
| DND_CRAFT_ECONOMY_V49 | №0668 |
| DND_CRAFT_PROFESSION_PROGRESS | №0671 |
| DND_CRAFT_PROFESSIONS_V33 | №0672 |
| DND_CRAFT_PROFESSIONS_V38 | №0673 |
| DND_CRAFT_PROFESSIONS_V47 | №0671 |
| DND_CRAFT_PROFESSIONS_V47_CRAFT | №0671 |
| DND_CRAFT_RESOURCES_V34 | №0674 |
| DND_CRAFT_V51 | №0666 |
| DND_CRAFTING_DLC_V50 | №0667 |
| DND_CRAFTING_V31 | №0669 |
| DND_CUSTOM_CRAFTING_V32 | №0675 |
| DND_EXP_TABLE | №0781 |
| DND_INVENTORY_CONTAINERS_V54 | №0790 |
| DND_MARKET_V55 | №0800 |
| DND_MARKET_V55_1 | №0801 |
| DND_MARKET_V55_3 | №0802 |
| DND_PENDING_CLASS_PACKS | №0078 (+ 8 других файлов) |
| DND_PLANESCAPE_V56_13 | №0633 |
| DND_RESOURCE_GATHERING_V35 | №0826 |
| DND_RESOURCE_PROCESSING_V43 | №0827 |
| DND_UPDATE_MANAGER | №0843 |
| DND_UPDATE_SCENE_V2 | №0844 |
| DND_UPDATE_UI | №0843 |
| DND_WORLD_GATHERING_V53 | №0879 |
| DND3DAssetCatalog | №0068 (+ 1 других файлов) |
| DND3DAssetNames | №0068 (+ 1 других файлов) |
| DND3DMap | №0071 |
| dndAddCompanionAttack | №0828 |
| DNDAdvancedDebugV70 | №0854 |
| DNDAlchemy | №0080 |
| dndBackgrounds | №0625 |
| dndBattleActionClose | №0626 |
| dndBattleActionOpen | №0626 (+ 1 других файлов) |
| dndBattleQuickAttack | №0626 |
| dndBattleQuickMove | №0626 |
| dndBattleQuickReady | №0626 |
| dndBattleQuickSpell | №0626 |
| DNDBloodHunter | №0642 |
| DNDCampaign | №0643 |
| DNDCharacter3D | №0067 |
| DNDCharacterAnatomy | №0060 |
| DNDCharacterAnatomyGeometry | №0059 |
| DNDCharacterAppearanceStore | №0061 |
| DNDCharacterBodyGeometry | №0062 |
| DNDCharacterClothing | №0063 |
| DNDCharacterEditor3D | №0064 |
| dndCharacterEditorLaunchError | №1120 |
| DNDCharacterLabV702 | №0850 |
| DNDCharacterMorphAssets | №0065 |
| DNDCharacterPose | №0066 |
| DNDClassFeatures | №0649 (+ 1 других файлов) |
| DNDCloudAccount | №0652 |
| DNDCloudConfig | №0653 |
| DNDCloudSync | №0654 |
| dndCollectMonsterLootV36 | №0808 |
| dndCollectMonsterLootV37 | №0809 |
| dndCollectMonsterLootV40 | №0807 |
| DNDCombat | №0656 (+ 1 других файлов) |
| DNDCombatEventBusV69 | №0848 |
| dndCombatLog | №0839 |
| DNDCombatLogV66 | №0849 |
| dndCompanionAttack | №0828 |
| dndCompanionDamage | №0828 |
| DNDCompanionGameplayV27 | №0657 |
| dndCompanionHeal | №0828 |
| DNDCompanionPacks | №0658 |
| dndCompanionStat | №0828 |
| dndConcentrationDamagePrompt | №0828 |
| DNDContent | №0662 |
| DNDContentCatalog | №0661 |
| DNDContentManifest | №0663 |
| dndCraft | №0669 |
| dndCraftProfession | №0672 |
| dndCraftProfessionV38 | №0666 (+ 3 других файлов) |
| dndCreateBeastheartCompanion | №0658 |
| dndCreateBeastMasterCompanion | №0658 |
| dndCreateFamiliar | №0658 |
| dndCreateSteed | №0658 |
| dndDebugEnabled | №1120 |
| DNDDebugScenarioEditorV705 | №0857 |
| DNDDebugScenarioManagerV704 | №0858 |
| DNDDiceResolutionV65 | №0860 |
| DNDEncounterCheckpointV68 | №0861 |
| DNDEncounterMapV59 | №0862 |
| DNDExpandedV23 | №0777 |
| DNDExpansionClasses | №0780 |
| DNDFeats | №0783 |
| dndGameplayCoreV57Render | №0784 |
| DNDGameplayV57 | №0784 |
| dndGenerateMonsterLootV36 | №0808 |
| dndGenerateMonsterLootV37 | №0807 (+ 1 других файлов) |
| DNDGLTF | №0070 |
| DNDGLTFCharacterPipeline | №0069 |
| dndInitiativeActive | №0828 |
| dndInitiativeDamageActive | №0828 |
| dndInitiativeHealActive | №0828 |
| dndInitiativeSkipDefeated | №0828 |
| DndInventoryContainersV54 | №0790 |
| DndItemDatabase | №0793 |
| dndLaunchCharacterEditor3D | №1120 |
| DNDMagic | №0799 |
| dndMap3DOpen | №0071 |
| DNDMapModel | №0072 |
| DNDMapRenderer2D | №0073 |
| DNDMapRenderer3D | №0074 (+ 1 других файлов) |
| DndMarketV55 | №0800 |
| DndMarketV55_3 | №0802 |
| DNDMobileBattleV61 | №0864 |
| DNDMobileSessionV67 | №0866 |
| DNDMonsterLoot | №0808 (+ 1 других файлов) |
| DNDMonsterLootV40 | №0807 |
| DNDMonsters | №0806 |
| dndNetwork | №1189 (+ 4 других файлов) |
| dndNetworkAddPlayerToInitiative | №0812 |
| dndNetworkCopyHint | №0811 |
| dndNetworkGameplayBuildProfile | №0812 |
| dndNetworkGameplayEvent | №0812 |
| dndNetworkGameplayMonsterAction | №0812 |
| dndNetworkGameplayMonsterState | №0812 |
| dndNetworkGameplayPeerDisconnect | №0812 |
| dndNetworkGameplayPeerHello | №0812 |
| dndNetworkGameplayPendingReactions | №0812 |
| dndNetworkGameplayPrepareHostHandoff | №0812 |
| dndNetworkGameplayReactionRequest | №0812 |
| dndNetworkGameplayRender | №0784 (+ 2 других файлов) |
| dndNetworkGameplayResult | №0812 |
| dndNetworkGameplayRoomShutdown | №0812 |
| dndNetworkGameplaySnapshot | №0812 |
| dndNetworkHostCreate | №0811 |
| dndNetworkHostFinish | №0811 |
| dndNetworkJoinCreate | №0811 |
| dndNetworkKick | №0811 |
| dndNetworkNewInvite | №0811 |
| dndNetworkSingle | №0811 |
| dndOpenCharacterEditor3D | №0064 |
| DNDPredictor | №0822 |
| DNDPredictorCards | №0819 |
| DNDPredictorMovement | №0821 |
| DNDPredictorUI | №0820 |
| dndProcessResourceV43 | №0827 |
| dndRemoveCompanionAttack | №0828 |
| dndRenderAlchemy | №0080 (+ 1 других файлов) |
| dndRenderCombat | №0642 |
| dndRenderCombatV3 | №0812 (+ 1 других файлов) |
| DNDRules | №0828 (+ 1 других файлов) |
| DNDSecondaryEntities | №0831 |
| dndShowRulesSummary | №0828 |
| DNDSpellPreparation | №0837 |
| dndSplashFinished | №0798 (+ 2 других файлов) |
| DNDStairNavigation | №0076 |
| dndStartConcentrationPrompt | №0828 |
| DNDStressMap | №0077 |
| dndSummonAttack | №0839 |
| dndSummonCommand | №0839 |
| dndSummonHeal | №0839 |
| DNDSummoning | №0839 |
| dndSyncCurrentCharacterFromCombat | №0812 (+ 2 других файлов) |
| dndUseAlchemyProduct | №0081 |
| dndV59CreateEncounter | №0862 |
| dndV61ResetView | №0864 |
| dndV65Close | №0860 |
| dndV65Open | №0860 |
| dndV65Resolve | №0860 |
| dndV66Clear | №0849 |
| dndV66CloseDebug | №0849 |
| dndV66CloseLog | №0849 |
| dndV66Export | №0849 |
| dndV66Filter | №0849 |
| dndV66OpenDebug | №0849 |
| dndV66OpenLog | №0849 |
| dndV66Record | №0848 (+ 1 других файлов) |
| dndV66RefreshDebug | №0849 |
| dndV66SelfTest | №0849 |
| dndV67Close | №0866 |
| dndV67Delete | №0866 |
| dndV67Export | №0866 |
| dndV67FileImport | №0866 |
| dndV67Open | №0866 |
| dndV67Restore | №0866 |
| dndV67Save | №0866 |
| dndV68Close | №0861 |
| dndV68Delete | №0861 |
| dndV68Export | №0861 |
| dndV68FileImport | №0861 |
| dndV68Open | №0861 |
| dndV68Restore | №0861 |
| dndV68Save | №0861 |
| dndV69Clear | №0848 |
| dndV69CloseReplay | №0848 |
| dndV69ExportReplay | №0848 |
| dndV69Filter | №0848 |
| dndV69OpenReplay | №0848 |
| dndV69Play | №0848 |
| dndV69Record | №0848 |
| dndV69Seek | №0848 |
| dndV69Step | №0848 |
| dndV69Stop | №0848 |
| dndV702AddClass | №0850 |
| dndV702AddFeat | №0850 |
| dndV702AddItem | №0850 |
| dndV702AddSpell | №0850 |
| dndV702Close | №0850 |
| dndV702Open | №0850 |
| dndV702Recalc | №0850 |
| dndV702RemoveClass | №0850 |
| dndV702RemoveFeat | №0850 |
| dndV702RemoveItem | №0850 |
| dndV702RemoveSpell | №0850 |
| dndV702SetBackground | №0850 |
| dndV702SetClassLevel | №0850 |
| dndV702SetProfession | №0850 |
| dndV702SetRace | №0850 |
| dndV702SetTotalLevel | №0850 |
| dndV702Tab | №0850 |
| dndV704Close | №0858 |
| dndV704Open | №0858 |
| dndV704Remove | №0858 |
| dndV704Rollback | №0858 |
| dndV704Run | №0858 |
| dndV704SaveCustom | №0858 |
| dndV704Select | №0858 |
| dndV705Close | №0857 |
| dndV705Create | №0857 |
| dndV705Export | №0857 |
| dndV705ImportPrompt | №0857 |
| dndV705Open | №0857 |
| dndV705Rollback | №0857 |
| dndV705Run | №0857 |
| dndV705Select | №0857 |
| dndV708Close | №0859 |
| dndV708Open | №0859 |
| dndV708Reset | №0859 |
| dndV70ApiFilter | №0854 |
| dndV70CallAPI | №0854 |
| dndV70ClearErrors | №0854 |
| dndV70CloseDebug | №0854 |
| dndV70Export | №0854 |
| dndV70InspectSource | №0854 |
| dndV70ModuleFilter | №0854 |
| dndV70OpenDebug | №0854 |
| dndV70RefreshDebug | №0854 |
| dndV70RunHealthCheck | №0854 |
| dndV70SetAPIArgs | №0854 |
| dndV70SetAPIPath | №0854 |
| dndV70Tab | №0854 |
| dndV70UseAPI | №0854 |
| document | №1230 (+ 1 других файлов) |
| druidProgression | №0692 |
| enableDndDebugLogger | №0833 (+ 2 других файлов) |
| enableDndDebugRuntime | №0833 (+ 1 других файлов) |
| ensureDndToolsState | №1221 (+ 5 других файлов) |
| escapeDndHtml | №0627 (+ 3 других файлов) |
| EXTRA_BODY_RUNTIME | №0785 (+ 1 других файлов) |
| FEATS_PHB | №0747 |
| FEATS_SETTING | №0748 |
| FEATS_TCOE | №0749 |
| FEATS_UA_HOMEBREW | №0750 |
| FEATS_XGTE | №0751 |
| fetch | №1189 (+ 2 других файлов) |
| fighterProgression | №0695 |
| filterFeatsList | №0746 |
| geistProgression | №0694 |
| getAllBackgrounds | №0625 |
| getAvailableSubclasses | №0649 (+ 3 других файлов) |
| getCharacterCurrentLevel | №0781 |
| getCharacterLevel | №0781 (+ 3 других файлов) |
| getClassData | №0650 (+ 2 других файлов) |
| getCurrentInventoryWeightData | №0793 (+ 1 других файлов) |
| getDndRules | №0828 |
| getExpandedClassDefinition | №0776 |
| getExpandedClassPack | №0776 |
| getFormattedClassAndLevel | №0701 |
| getKibblesClassDisplayName | №0796 |
| getLevelByExp | №0781 |
| getProfBonusNum | №0649 (+ 2 других файлов) |
| getShifterBloodline | №0834 |
| getShifterBloodlines | №0834 |
| getShifterMaxCR | №0834 |
| getSpellcastingAbilityForClass | №0714 |
| getSpellCastingInfo | №0799 |
| getStatModNum | №0649 (+ 2 других файлов) |
| getSubclassData | №0714 (+ 1 других файлов) |
| getSubclassesForClass | №0650 |
| getSubclassFeaturesForLevel | №0771 |
| getSwarmDevourDamage | №0840 |
| getSwarmDevourDC | №0840 |
| getSwarmMutationSlots | №0840 |
| getSwarmState | №0840 |
| getVesselAspects | №0845 |
| getVesselSpellList | №0845 |
| getVesselSpirit | №0845 |
| GHOST_EXTRA | №0785 |
| ghostProgression | №0698 (+ 2 других файлов) |
| goToTab | №0649 |
| heavyWeapons | №0875 |
| Hero | №0787 |
| illriggerProgression | №0699 (+ 1 других файлов) |
| KIBBLES_CLASS_I18N | №0796 |
| KIBBLES_SOURCE_CATALOG | №0796 |
| KIBBLES_SOURCE_INFO | №0796 |
| kind | №0820 |
| listIntegratedExpandedClasses | №0776 |
| logs | №1232 |
| MARTYR_2024 | №0804 |
| MARTYR_BURDENS | №0804 |
| martyrProgression | №0702 (+ 1 других файлов) |
| martyrRuntime | №0804 |
| maxHpIncrease | №0701 |
| meleeWeapons | №0876 |
| monkProgression | №0704 |
| MULTICLASS_CLASS_REQUIREMENTS | №0776 (+ 2 других файлов) |
| MULTICLASS_PROFICIENCIES_2014 | №0714 (+ 1 других файлов) |
| MULTICLASS_REQUIREMENTS | №0787 |
| NECROMANCER_2024 | №0810 |
| NECROMANCER_SUBCLASSES | №0810 |
| necromancerProgression | №0706 (+ 1 других файлов) |
| necromancerRuntime | №0810 |
| nextInitiativeTurn | №0828 |
| OCCULTIST_KIBBLES_V11 | №0814 |
| occultistProgression | №0708 |
| occultistRuntime | №0814 |
| onerror | №0772 |
| onExpInputChange | №0781 |
| onFeatOrAsiChange | №0701 |
| onSubclassChange | №0701 |
| openAddFeatModal | №0746 |
| openCharacter | №0837 |
| openDndChangelog | №0816 |
| openDndNetworkModal | №0811 |
| openExperienceModal | №0781 |
| openFeatStatChoiceModal | №0746 |
| openIconSettingsModal | №0833 (+ 2 других файлов) |
| openLevelUpModal | №0701 |
| openLevelUpModalFromExp | №0781 |
| openSettingsModal | №0833 |
| paladinProgression | №0710 |
| PARASITE_EXTRA | №0817 |
| parasiteProgression | №0712 (+ 2 других файлов) |
| parasiteRuntime | №0817 |
| parseWeightToKg | №0793 (+ 1 других файлов) |
| pendingLevelUpData | №0701 |
| populateFeatModalList | №0746 |
| Prof_Acr | №0084 |
| Prof_Ani | №0084 |
| Prof_Arc | №0084 |
| Prof_Ath | №0084 (+ 1 других файлов) |
| Prof_Dec | №0084 |
| Prof_His | №0084 |
| Prof_Ins | №0084 |
| Prof_Inv | №0084 |
| Prof_Itm | №0084 |
| Prof_Med | №0084 |
| Prof_Nat | №0084 |
| Prof_Prc | №0084 |
| Prof_Prf | №0084 |
| Prof_Prs | №0084 |
| Prof_Rel | №0084 |
| Prof_Soh | №0084 |
| Prof_Stl | №0084 |
| Prof_Sur | №0084 |
| prompt | №1219 (+ 1 других файлов) |
| psionProgression | №0715 (+ 1 других файлов) |
| pugilistProgression | №0717 (+ 1 других файлов) |
| pugilistRuntime | №0780 |
| rangedWeapons | №0877 |
| rangerProgression | №0719 |
| refreshClassModalLocks | №0701 |
| refreshExtraClassPanels | №0782 |
| removeCharacterFeat | №0746 |
| renderClassFeatures | №0642 (+ 1 других файлов) |
| renderCombatAbilities | №0642 (+ 1 других файлов) |
| renderCompanions | №0828 |
| renderDndTools | №0774 (+ 2 других файлов) |
| renderGhostExtraPanel | №0782 |
| renderInitiativeTracker | №0784 (+ 11 других файлов) |
| renderInventory | №0082 (+ 13 других файлов) |
| renderParasiteExtraPanel | №0782 |
| renderSpellSlots | №0828 (+ 2 других файлов) |
| renderWalterParasitePanel | №0782 |
| renderWeapons | №0828 |
| requestAnimationFrame | №1351 (+ 18 других файлов) |
| resolveMulticlassProficiencyChoice | №0701 (+ 1 других файлов) |
| restorePactMagic | №0774 (+ 2 других файлов) |
| rogueProgression | №0721 |
| rollClassFeatureD20 | №0649 |
| rollClassFeatureDamage | №0649 |
| rollHpIncrease | №0701 |
| rollSingleDice | №0828 |
| RUNEKeeper_V12 | №0829 |
| runeKeeperDialects | №0829 |
| runeKeeperProgression | №0724 (+ 2 других файлов) |
| runeKeeperRuntime | №0780 (+ 1 других файлов) |
| SAVANT_V561 | №0830 |
| savantDisciplines | №0830 |
| savantProgression | №0725 (+ 2 других файлов) |
| savantRuntime | №0830 |
| saveAllCharacters | №1212 (+ 1 других файлов) |
| saveCharacter | №0082 (+ 5 других файлов) |
| saveCurrentCharacter | №0079 |
| saved | №1230 |
| savedDimBeforeHide | №0869 |
| saveNewCreatedCharacter | №0625 (+ 1 других файлов) |
| selectedBaseHp | №0701 |
| selectLauncherIcon | №0833 (+ 2 других файлов) |
| setCharacterLevel | №0833 (+ 2 других файлов) |
| setTimeout | №1219 (+ 1 других файлов) |
| SHIFTER_V21 | №0834 |
| shifterProgression | №0727 (+ 2 других файлов) |
| shifterRuntime | №0834 |
| showCustomAlert | №0793 (+ 1 других файлов) |
| SKILL_TO_VAR_MAP | №1232 |
| SKILLS_CONFIG | №0084 |
| sorcererProgression | №0729 |
| sortInitiativeTracker | №0839 (+ 1 других файлов) |
| specialWeapons | №0878 |
| SPELLBLADE_RUNTIME | №0836 |
| spellbladeProgression | №0836 |
| spells3lvl | №0764 |
| spells4lvl | №0765 |
| spells5lvl | №0766 |
| spells6Lvl | №0767 |
| spells8lvl | №0769 |
| spells9lvl | №0770 |
| spellsLevel1 | №0762 |
| spellsLevel2 | №0763 |
| spellsLevel7 | №0768 |
| startDndOnboarding | №0816 |
| SUBCLASSES_REFERENCE | №0079 (+ 6 других файлов) |
| subtractExperienceValue | №0781 |
| SWARM_EXTRA | №0840 |
| swarmProgression | №0731 (+ 2 других файлов) |
| swarmRuntime | №0840 |
| syncDndNetworkInitiative | №1221 (+ 4 других файлов) |
| syncLevelUI | №0701 |
| toggleClassFeatureDetails | №0649 |
| triggerCritEffect | №1236 |
| updateCharacterArmorClass | №1226 |
| updateCharacterSpellSlots | №0701 (+ 1 других файлов) |
| updateExperienceModalUI | №0781 |
| updateExtraClassCreationUI | №0647 |
| updateMagicData | №0799 |
| updateNetworkModeUI | №0811 |
| useBloodHunterFeature | №0642 |
| useClassFeature | №0649 |
| useFeat | №0783 |
| VESSEL_V4 | №0845 |
| vesselProgression | №0733 (+ 1 других файлов) |
| vesselRuntime | №0845 |
| VTT_PROJECT_MANIFEST_V70 | №0867 |
| WALTER_PARASITE_EXTRA | №0870 |
| walterParasiteProgression | №0735 (+ 2 других файлов) |
| WARDEN_MHP_2024 | №0872 |
| wardenProgression | №0736 (+ 1 других файлов) |
| warlockProgression | №0738 |
| WARLORD_LASERLLAMA_V330 | №0873 |
| warlordProgression | №0740 (+ 1 других файлов) |
| WEAPONS_DB | №0824 (+ 1 других файлов) |
| window | №1189 (+ 8 других файлов) |
| WITCH_MHP_2014 | №0780 |
| witchProgression | №0742 |
| witchRuntime | №0780 |
| wizardProgression | №0744 |

### Поля персонажа (101)

| Имя | Исходные файлы |
|---|---|
| ac | №0794 (+ 4 других файлов) |
| actionSurges | №0828 |
| activeConditions | №0648 (+ 5 других файлов) |
| activeFolderId | №0813 |
| anatomy | №0060 |
| appearance3d | №1166 (+ 1 других файлов) |
| baseAC | №0794 (+ 3 других файлов) |
| class | №0781 (+ 3 других файлов) |
| classes | №0787 (+ 7 других файлов) |
| classFeaturesState | №0774 (+ 1 других файлов) |
| className | №0701 (+ 2 других файлов) |
| clothing | №0060 (+ 1 других файлов) |
| coinLog | №0791 |
| coins | №0791 (+ 2 других файлов) |
| combatAbilities | №0648 (+ 1 других файлов) |
| combatAbilityStat | №0655 |
| companions | №0774 |
| con | №0701 |
| concentration | №0828 (+ 1 других файлов) |
| conditions | №0773 (+ 3 других файлов) |
| constitution | №0701 |
| craftingProfessions | №0670 |
| dead | №0648 (+ 1 других файлов) |
| deathSaves | №0656 (+ 4 других файлов) |
| defeated | №0774 (+ 3 других файлов) |
| encounters | №1120 |
| equipment | №0064 |
| equippedWeapon | №0824 (+ 1 других файлов) |
| exp | №0781 (+ 1 других файлов) |
| extraACBonus | №0828 |
| extraClassType | №0648 (+ 6 других файлов) |
| feats | №0701 (+ 2 других файлов) |
| featStatBonuses | №0746 |
| features | №0701 (+ 3 других файлов) |
| folders | №0813 |
| gender | №0060 (+ 1 других файлов) |
| ghost | №0785 |
| head | №0060 (+ 1 других файлов) |
| heroClass | №0837 |
| hostName | №0785 (+ 2 других файлов) |
| hp | №0648 (+ 4 других файлов) |
| hpCurrent | №0648 (+ 8 других файлов) |
| hpMax | №0648 (+ 5 других файлов) |
| hpTemp | №1219 |
| id | №0774 (+ 3 других файлов) |
| initiativeTracker | №0774 (+ 9 других файлов) |
| inspiration | №1219 |
| inventory | №0793 (+ 14 других файлов) |
| isExtraClass | №0701 (+ 5 других файлов) |
| kiPoints | №0714 (+ 1 других файлов) |
| lastRest | №0648 (+ 1 других файлов) |
| level | №0833 (+ 6 других файлов) |
| library | №0797 |
| libraryData | №0797 |
| morphChannels | №0065 (+ 2 других файлов) |
| multiclassAllowed | №0785 (+ 2 других файлов) |
| name | №0774 (+ 1 других файлов) |
| originRaceId | №0060 |
| pactMagic | №0774 (+ 2 других файлов) |
| pactMagicData | №0774 (+ 3 других файлов) |
| parasite | №0817 |
| pendingProficiencyChoices | №0714 |
| position | №1219 |
| predictorState | №0794 (+ 4 других файлов) |
| profBonus | №0837 |
| proficiencies | №0794 (+ 3 других файлов) |
| race | №0701 (+ 2 других файлов) |
| raceId | №0060 (+ 1 других файлов) |
| raceName | №0785 (+ 2 других файлов) |
| rageDamageBonus | №0714 |
| ragesCount | №0714 (+ 1 других файлов) |
| replacesRace | №0785 (+ 3 других файлов) |
| resistances | №1158 |
| resources | №0828 (+ 1 других файлов) |
| revision | №0654 (+ 1 других файлов) |
| savesData | №0625 (+ 2 других файлов) |
| secondWindUses | №0828 |
| skills | №0714 (+ 1 других файлов) |
| skillsData | №0625 (+ 5 других файлов) |
| skillValues | №0084 |
| skins | №0060 (+ 5 других файлов) |
| sneakAttackDice | №0714 |
| sorceryPoints | №0714 (+ 1 других файлов) |
| speed | №0785 (+ 3 других файлов) |
| spellcastingSources | №0714 (+ 1 других файлов) |
| spells | №0774 |
| spellsData | №0828 (+ 1 других файлов) |
| spellSlotsData | №0648 (+ 4 других файлов) |
| spellStat | №0714 |
| stats | №0787 (+ 12 других файлов) |
| subclass | №0714 (+ 1 других файлов) |
| swarm | №0701 (+ 1 других файлов) |
| tarotEffects | №1217 (+ 1 других файлов) |
| tarotKnowledge | №1217 |
| tempHp | №1158 |
| turnResources | №0774 (+ 1 других файлов) |
| unsaved | №1189 |
| valueOf | №0837 |
| walterParasite | №0701 (+ 1 других файлов) |
| weaponsData | №0648 |
| worldMatrices | №0060 (+ 3 других файлов) |

### Поля JS объектов (6513)

| Имя | Исходные файлы |
|---|---|
| _ | №1252 (+ 11 других файлов) |
| __base | №0074 |
| __bodyMasks | №1181 |
| __ceHeadFrame | №0059 |
| __ceNormals | №0059 (+ 3 других файлов) |
| __ceShapedPositions | №0059 (+ 3 других файлов) |
| __dirname | №1398 |
| __filename | №1398 |
| __floor | №0074 |
| __tarotChargeDouble | №0819 |
| __tarotShared | №0819 |
| __TEST_ASSERT__ | №1398 |
| _sent | №1329 |
| a | №0062 (+ 17 других файлов) |
| aal | №1151 |
| abdomen | №0060 |
| aberration | №0629 (+ 12 других файлов) |
| abilities | №0629 (+ 17 других файлов) |
| ability | №0078 (+ 19 других файлов) |
| abilityBonus | №0079 (+ 1 других файлов) |
| abilityBonuses | №0642 |
| abilityChanges | №0819 |
| abilityCheck | №0656 (+ 1 других файлов) |
| abilityCheckBonus | №0780 |
| abilityCheckHigherSpell | №0780 |
| abilityIncrease | №0777 |
| abilityMax | №0819 |
| abilityMin | №0819 |
| abilityScores | №1157 (+ 3 других файлов) |
| absorbedItems | №0840 |
| absorbedTempHp | №0839 |
| ac | №0625 (+ 69 других файлов) |
| academies | №0740 (+ 1 других файлов) |
| academy | №0777 (+ 1 других файлов) |
| academyFeature | №0777 |
| academyFeatures | №0740 |
| acBase | №0085 (+ 1 других файлов) |
| acBonus | №0777 (+ 7 других файлов) |
| acBonusAgainstTarget | №0780 |
| acBonusDie | №0780 |
| accent | №0833 |
| acceptedCategories | №0803 |
| acceptedTags | №0803 |
| access | №0671 |
| access_token | №0654 (+ 1 других файлов) |
| accessories | №0808 (+ 1 других файлов) |
| accessors | №1198 (+ 1 других файлов) |
| acEqualsSelf | №0780 |
| acFormula | №0085 |
| acid | №0079 (+ 2 других файлов) |
| Acid | №0081 |
| acidBomb | №0780 |
| acidReagent | №0827 |
| acolyteOfArms | №0780 |
| acOverride | №0812 (+ 1 других файлов) |
| acPenalty | №0079 |
| acReduction | №0780 |
| acrobatics | №0773 (+ 1 других файлов) |
| acSaveDamageBonus | №0780 |
| action | №0078 (+ 58 других файлов) |
| actionId | №0806 |
| actionOrBonusAction | №0780 |
| actionRequired | №0656 |
| actions | №0079 (+ 28 других файлов) |
| actionSpent | №0079 (+ 1 других файлов) |
| actionSurge | №0649 |
| actionSurges | №0695 |
| actionType | №0079 |
| activate | №1239 |
| activated | №0819 |
| activateLastStand | №0819 |
| active | №0642 (+ 32 других файлов) |
| ACTIVE | №0783 |
| activeCharacteristics | №0870 |
| activeConditions | №0625 (+ 9 других файлов) |
| activeEncounter | №0863 |
| activeEncounterId | №0862 (+ 1 других файлов) |
| activeId | №0863 |
| activeIndex | №0079 (+ 42 других файлов) |
| activeMutations | №0840 |
| activeOrgans | №0870 |
| activeProperties | №0081 |
| activeRage | №0649 (+ 1 других файлов) |
| activeRite | №0642 |
| activeShape | №1319 |
| activity | №0629 (+ 12 других файлов) |
| actor | №0784 (+ 2 других файлов) |
| actorId | №0820 (+ 4 других файлов) |
| actorName | №1281 |
| actual | №0855 |
| actWithArcaneAnathemaWhileDisabled | №0780 |
| adamantine | №0669 |
| adaptiveMalediction | №0780 |
| addClass | №0850 |
| addCombatantFromTemplate | №0656 |
| addConToEachDie | №0780 |
| addCreature | №0862 |
| addCustomLoot | №0808 (+ 1 других файлов) |
| addD4OnFailure | №0780 |
| addDamage | №0079 |
| addDie | №0780 |
| added | №0629 (+ 26 других файлов) |
| addEventListener | №0888 (+ 25 других файлов) |
| addExhaustion | №0828 |
| addFeat | №0850 |
| addFloor | №0072 |
| addInventory | №0850 |
| additionalFamiliar | №0814 |
| addLexiconRune | №0780 |
| addObject | №0072 |
| addProficiencyBonus | №0780 |
| addProfToAnathema | №0780 |
| addRecipe | №0668 |
| addSelected | №0862 |
| addSpell | №0850 |
| addToRoll | №0780 |
| addXP | №0671 |
| addZone | №0072 |
| adhesive | №0079 |
| adjustedXp | №0806 |
| adjustRiteDamage | №0642 |
| adjustSymbiosis | №0817 |
| adjustWeaponDamage | №0642 |
| adornment | №0671 |
| adrenaline | №0834 |
| adroitAnalysis | №0830 |
| adultAnatomy | №0067 |
| advancedRoguishCharm | №0780 |
| advancedTactics | №0780 |
| advancedTransformation | №0642 |
| advanceTime | №0079 (+ 1 других файлов) |
| advantage | №0079 (+ 14 других файлов) |
| advantageAgainst | №0780 |
| advantageAgainstFrightened | №0780 |
| advantageAgainstGrappled | №0780 |
| advantageAgainstTarget | №0780 |
| advantageAgainstWounded | №0777 |
| advantageAllAttacks | №0642 |
| advantageAllD20 | №0780 |
| advantageAttackRolls | №0780 |
| advantageAttacks | №0780 |
| advantageCharismaChecks | №0780 |
| advantageDexSave | №0780 |
| advantageFirstAttack | №0780 |
| advantageIfSameTarget | №0687 |
| advantageMagicalSaves | №0780 |
| advantageNextAttack | №0777 (+ 1 других файлов) |
| advantageNextSave | №0780 |
| advantageOnChecks | №0777 |
| advantageOnCon | №0777 |
| advantageOneAttackOrSave | №0780 |
| advantageOrDisadvantage | №0780 |
| advantagePerception | №0814 |
| advantageRecallFeyFiendsUndead | №0642 |
| advantageSaves | №0642 (+ 1 других файлов) |
| advantageSavesAgainst | №0780 |
| advantageSavingThrows | №0780 |
| advantageStealth | №0687 |
| advantageStr | №0780 |
| advantageStrength | №0079 |
| advantageTrackFeyFiendsUndead | №0642 |
| advantageVsIntimidation | №0777 |
| adventuringDiscipline | №0780 |
| advice | №0819 (+ 3 других файлов) |
| aether | №0642 |
| Aether | №0780 |
| aetherWalk | №0642 |
| affected | №0079 |
| affinities | №0845 |
| affinity | №1247 |
| afflictedDisadvantageEndSave | №0780 |
| afflictionControl | №0078 |
| african | №1203 |
| afro | №0062 (+ 1 других файлов) |
| after | №0780 (+ 1 других файлов) |
| afterActorAttack | №0642 |
| afterAttack | №0819 |
| afterAttackCost | №0780 |
| afterAttackThreeUnarmed | №0780 |
| afterCarousingAdvantage | №0780 |
| afterDamage | №0642 (+ 1 других файлов) |
| againstInterdicted | №0780 |
| age | №0625 (+ 2 других файлов) |
| ageAppearanceLocked | №0814 |
| ageless | №0780 |
| agePossessionSleepTransformImmunity | №0780 |
| AI_ALLOW_PAID_API | №1155 |
| AI_BASE_SHA | №1156 |
| AI_DEVELOPMENT_ENABLED | №1155 |
| ailment | №0780 |
| ailments | №0078 (+ 1 других файлов) |
| airCore | №0827 |
| airEssence | №0827 |
| alchemical | №0800 |
| alchemicalFat | №0827 |
| alchemicalReagentV49 | №0668 |
| alchemicalSavvy | №0649 |
| alchemist | №0671 (+ 4 других файлов) |
| alchemistActiveEffects | №1157 (+ 1 других файлов) |
| alchemistDebuffs | №1157 |
| alchemistDiscovered | №1158 |
| alchemistExplosionResistanceType | №1157 |
| alchemistGolem | №0079 |
| alchemistGolemOwner | №0079 |
| alchemistGrafts | №1157 |
| alchemistHomunculus | №0079 |
| alchemistHomunculusOwner | №0079 (+ 1 других файлов) |
| alchemistPoisonedWeaponId | №1157 |
| alchemistPreparedFormula | №1158 |
| alchemistSaveDC | №1157 |
| alchemistToxicVengeance | №1157 |
| alchemy | №0669 (+ 2 других файлов) |
| alchemyId | №0081 (+ 1 других файлов) |
| alchemyPoints | №0780 |
| alchemyTools | №0814 |
| alcoholRules | №0079 |
| ale | №0673 |
| alert | №1191 (+ 12 других файлов) |
| alerts | №1219 |
| aliases | №0078 (+ 12 других файлов) |
| all | №0776 (+ 1 других файлов) |
| ALL_RECIPES | №1190 (+ 1 других файлов) |
| allAttacksThisTurn | №0642 |
| allConcentrationSavesDisadvantage | №0642 |
| allDisciplines | №0777 |
| allies | №1268 |
| alliesTempHp | №0780 |
| allLanguages | №0780 |
| allowedForms | №0780 |
| allowFriendly | №0657 |
| allSeeing | №0872 |
| allSkills | №0810 |
| alluring | №0642 |
| Alluring | №0780 |
| ally | №1220 |
| allyACBonus | №0780 |
| allyAdvantage | №0777 |
| allyAdvantageAgainstMarkedPrey | №0780 |
| allyAttackOrDamageCantrip | №0780 |
| allyCharge | №0777 |
| allyCount | №0780 |
| allyDestination | №0820 (+ 2 других файлов) |
| allyFormation | №0777 |
| allyId | №0819 (+ 3 других файлов) |
| allyMoveReactionFt | №0780 |
| allyNextAddD8 | №0780 |
| allyReactionsUpTo | №0780 |
| allyReposition | №0777 |
| allySaveAdvantage | №0780 |
| allySaveAdvantageFt | №0780 |
| allySaveBonus | №0780 |
| allyStrDexSaveBonus | №0780 |
| allyTempHp | №0780 |
| allyWilling | №0820 (+ 2 других файлов) |
| allyWithinAura | №0656 (+ 1 других файлов) |
| allyWithinCourage | №0656 |
| almond | №0064 (+ 1 других файлов) |
| alpha | №0064 (+ 1 других файлов) |
| alphaCutoff | №0070 |
| alphaCutoffLoc | №0074 |
| alphaMode | №0070 |
| alphaModeLoc | №0074 |
| alpine | №0064 |
| alreadyCast | №0820 (+ 1 других файлов) |
| alreadyKnown | №0834 |
| alt | №0780 |
| altar | №0068 |
| alternateNecromancers | №0810 |
| alternateResourceIds | №0082 |
| altMin | №0747 |
| altStat | №0747 |
| alum | №0674 |
| alwaysPrepared | №0804 (+ 2 других файлов) |
| amount | №0082 (+ 35 других файлов) |
| amp | №0642 |
| amphibian | №0775 |
| amplified | №0642 (+ 1 других файлов) |
| amplifiedDamage | №0780 |
| amplifiedEffect | №0780 |
| amplifiedMoveFt | №0780 |
| amplifiedNextAttackAdvantage | №0780 |
| amplifiedRestoreSpellSlot | №0780 |
| amplify | №0642 (+ 4 других файлов) |
| amr | №1151 |
| analysisAction | №0830 |
| analyticalDefense | №0830 |
| anatomy | №0062 (+ 1 других файлов) |
| anatomyLevel | №0059 |
| anatomyProfile | №0067 |
| anatomyShape | №0059 |
| anatomySkin | №0059 |
| anatomyType | №0059 |
| anatomyVariant | №0059 |
| anatomyZones | №0059 |
| anchor | №0062 (+ 1 других файлов) |
| anchorPositions | №0062 (+ 1 других файлов) |
| anchors | №0810 |
| ancient_ruins | №0879 |
| ancientMalediction | №0780 |
| angle | №0062 |
| animalFrame | №0062 |
| animalHandling | №0773 (+ 1 других файлов) |
| animalHandlingDC | №0687 |
| animalProfile | №0062 (+ 6 других файлов) |
| animalSkin | №0062 |
| animateDead | №0810 |
| animateThralls | №0780 |
| animation | №0780 |
| animationId | №0066 (+ 1 других файлов) |
| animations | №0069 |
| ankhBlessing | №0810 |
| annotated | №0664 |
| anointedMagic | №0780 |
| antelope | №0067 |
| antialias | №0064 (+ 1 других файлов) |
| Antidote | №0081 |
| antiMagicAdvantage | №0810 |
| anvil | №0068 |
| anxious | №0642 |
| any | №0776 (+ 1 других файлов) |
| aoe | №0812 |
| aoeFt | №0642 |
| aoeLengthFt | №0812 |
| aoeRadiusFt | №0627 (+ 3 других файлов) |
| aoeShape | №0627 (+ 1 других файлов) |
| aoeWidthFt | №0812 |
| apathy | №0819 |
| ape | №0062 |
| apexPredator | №0780 |
| api | №1189 |
| apiArgs | №0854 |
| apiFilter | №0854 |
| apikey | №0654 |
| apiPath | №0854 |
| apis | №0854 |
| apothecary | №0068 (+ 1 других файлов) |
| apothecaryRejectsHammer | №1253 |
| app | №0861 (+ 1 других файлов) |
| appearance | №0061 (+ 3 других файлов) |
| appearance3d | №1189 |
| appearanceAgingStopped | №0814 |
| appearanceOpacity | №0067 |
| appendChild | №1250 (+ 8 других файлов) |
| applications | №0822 |
| applied | №0078 (+ 10 других файлов) |
| appliesCalcifyingStrike | №0780 |
| apply | №0843 |
| applyASI | №0828 |
| applyDamage | №0656 (+ 5 других файлов) |
| applyDamageBatch | №0656 |
| applyFromRound | №0819 |
| applyFullQuality | №0666 |
| applyMorphTargets | №0067 |
| applyOverchannel | №0812 |
| applyPotionEffect | №0079 |
| applyPreset | №0067 |
| applyQuality | №0668 |
| applyStaged | №0843 |
| applyVisibility | №0667 |
| applyWitchTouch | №0780 |
| arcana | №0773 (+ 1 других файлов) |
| arcanaSaveDC | №0780 |
| arcane | №0800 (+ 2 других файлов) |
| arcane_defender | №0783 |
| arcane_recovery_feat | №0783 |
| arcaneAnathema | №0780 |
| arcaneMastery | №0649 |
| arcaneReagentV49 | №0668 |
| arcaneRecovery | №0649 |
| arcaneShard | №0668 (+ 1 других файлов) |
| arcaneWard | №1308 |
| archaeologist | №0830 |
| archdruid | №0649 |
| archery | №0780 |
| archetype | №0780 (+ 1 других файлов) |
| archetypes | №0715 |
| archfey | №0642 |
| architect | №0780 |
| archon | №0845 |
| archonForm | №0845 |
| archons | №0845 |
| area | №0079 (+ 1 других файлов) |
| areaFt | №0079 (+ 1 других файлов) |
| areaRadiusFt | №0780 |
| areaSlime | №0079 |
| areaVulnerability | №0840 |
| arenaRoyale | №0717 |
| args | №1351 (+ 37 других файлов) |
| arm | №0062 |
| armament | №0078 (+ 1 других файлов) |
| armedAndAngry | №0780 |
| armLength | №0064 (+ 1 других файлов) |
| armor | №0062 (+ 64 других файлов) |
| armor_component | №0827 |
| armorBonus | №0666 |
| armorClass | №0675 (+ 1 других файлов) |
| armoredAC | №0780 |
| armorer | №0671 (+ 2 других файлов) |
| armorOfFaith | №0804 |
| armorProficiency | №0814 |
| armorTriangles | №0064 |
| armorWear | №1191 |
| armour | №0068 |
| armpitL | №0060 (+ 1 других файлов) |
| armpitR | №0060 |
| armReaction | №0819 |
| arms | №0064 (+ 3 других файлов) |
| arr | №0803 |
| arrayBuffer | №1162 (+ 5 других файлов) |
| arrestingStrike | №0780 |
| ArrowDown | №0071 |
| arrowheads | №0668 (+ 1 других файлов) |
| ArrowLeft | №0071 |
| ArrowRight | №0071 |
| ArrowUp | №0071 |
| art | №0833 |
| artificer | №0664 (+ 2 других файлов) |
| artOfWar | №0780 |
| ascended | №0845 |
| ascensionLevel | №0715 |
| asi | №0676 (+ 28 других файлов) |
| asian | №1203 |
| asleep | №0819 |
| aspect | №0780 (+ 1 других файлов) |
| assessItem | №0665 |
| asset | №1198 (+ 1 других файлов) |
| assetId | №0064 (+ 3 других файлов) |
| astral | №0064 |
| astralConstruct | №0780 |
| asymmetric | №0067 |
| at | №0062 (+ 17 других файлов) |
| at11 | №0715 |
| at17 | №0715 |
| athletics | №0773 (+ 2 других файлов) |
| atob | №1296 (+ 2 других файлов) |
| atStartOfTurn | №1243 (+ 1 других файлов) |
| attach | №0065 (+ 1 других файлов) |
| attached | №0079 |
| attachment | №0870 |
| attack | №0079 (+ 20 других файлов) |
| attackAbility | №0079 |
| attackAction | №0780 |
| attackAgainstMode | №0828 |
| attackBonus | №0079 (+ 9 других файлов) |
| attackBonusAdjustment | №0642 |
| attackCantripSwap | №0810 |
| attackChain | №0777 |
| attackContext | №0642 (+ 1 других файлов) |
| attackCount | №0656 (+ 3 других файлов) |
| attackCrit | №0810 |
| attackDamageBonus | №0666 |
| attackDisadvantage | №0079 (+ 2 других файлов) |
| attackDisadvantageUnlessTargetsSelf | №0780 |
| attackDistanceFt | №1243 |
| attacker | №0642 (+ 13 других файлов) |
| attackerId | №0079 (+ 9 других файлов) |
| attackerPeerId | №0812 |
| attackKind | №0656 (+ 7 других файлов) |
| attackModifier | №0834 |
| attackModifiers | №0079 (+ 17 других файлов) |
| attackOrSpell | №0780 |
| attackPenalty | №0079 (+ 1 других файлов) |
| attackReplaced | №1249 |
| attackResult | №0642 (+ 5 других файлов) |
| attackRoll | №0780 |
| attacks | №0656 (+ 8 других файлов) |
| attacksAgainst | №0828 |
| attackSequence | №0656 (+ 1 других файлов) |
| attacksHaveAdvantage | №0079 |
| attackSight | №0819 |
| attackTarget | №1243 |
| attackTotal | №0812 (+ 3 других файлов) |
| attackType | №0761 (+ 18 других файлов) |
| attitudeIndifferent | №0780 |
| attitudeShift | №0780 |
| attributeFilter | №0841 (+ 1 других файлов) |
| attributes | №0841 (+ 3 других файлов) |
| attrs | №1159 |
| atWill | №0780 |
| atWillSuppress | №0780 |
| auraDebuff | №0810 |
| auraHoldTheLine | №0780 |
| auraOfCourage | №0649 |
| auraOfProtection | №0649 |
| auraRangeFt | №0810 |
| auraSource | №0656 (+ 1 других файлов) |
| author | №0072 |
| authoritativeSubclasses | №0078 (+ 13 других файлов) |
| authorityEpoch | №0811 (+ 5 других файлов) |
| authorityId | №0811 (+ 3 других файлов) |
| authoritySnapshot | №0866 |
| auto | №0812 |
| autoAnimalHandlingRampage | №0687 |
| autoCheckForUpdates | №0843 |
| autoFailed | №0642 (+ 2 других файлов) |
| autoFailHexSave | №0780 |
| autoFailSaveUses | №0780 |
| autoFailStrDex | №0828 (+ 2 других файлов) |
| autognome | №0673 |
| autoHideMenuBar | №0887 |
| automaticAssembly | №0067 |
| autoPlans | №0812 |
| autoSaveCurrentCharacter | №1250 (+ 2 других файлов) |
| autoTrigger | №0079 |
| available | №0806 (+ 1 других файлов) |
| availableFeatures | №0662 |
| avatars | №0840 |
| avatarStorm | №0810 |
| avian | №0062 (+ 1 других файлов) |
| avoidDeath | №0780 |
| awakened | №0715 (+ 1 других файлов) |
| Awakened | №0796 |
| awakenedRune | №0780 |
| awakening | №0804 |
| axes | №0064 |
| AXES | №0067 |
| azure | №0833 |
| b | №0869 (+ 17 других файлов) |
| back | №0063 (+ 3 других файлов) |
| background | №0625 (+ 5 других файлов) |
| backgroundColor | №0887 |
| backLower | №0060 |
| backslash | №0075 (+ 1 других файлов) |
| backslashTexture | №0077 |
| BackTexture | №1213 |
| backup | №0853 (+ 1 других файлов) |
| backUpper | №0060 |
| bad | №1169 |
| badlands | №0879 |
| badlands_canyon | №0879 |
| badlands_crater | №0879 |
| badlands_glass | №0879 |
| balanceCp | №0800 |
| balanced | №0060 |
| balancePreserved | №1253 |
| balefulInterdict | №0699 |
| balefulPresence | №0780 |
| band | №0665 |
| bandHeight | №0063 |
| bandTile | №0063 |
| bandTogether | №0780 |
| banished | №0780 |
| banner | №0068 |
| bard | №0799 (+ 1 других файлов) |
| bardicInspiration | №0649 (+ 1 других файлов) |
| barrel | №0068 |
| barter | №1253 |
| barycentricOutsideTolerance | №1208 |
| base | №0070 (+ 5 других файлов) |
| baseAc | №0812 (+ 1 других файлов) |
| baseAC | №0625 (+ 2 других файлов) |
| baseAcFormula | №0825 |
| baseColorFactor | №0070 (+ 1 других файлов) |
| baseColorSampler | №0070 |
| baseColorTexture | №0070 |
| baseCp | №0802 |
| baseFeatures | №0872 |
| baseId | №0675 |
| baseModel | №0067 (+ 1 других файлов) |
| baseObj | №1209 (+ 2 других файлов) |
| basePositions | №0063 (+ 2 других файлов) |
| basePositionsSha256 | №1346 |
| baseQualityScore | №0665 |
| baseUrl | №1194 (+ 1 других файлов) |
| basilisk | №0687 |
| bastionOfOrder | №0780 |
| battleBoard | №0849 (+ 1 других файлов) |
| battleBoardView | №0861 |
| battlefield | №1189 (+ 21 других файлов) |
| battlefieldAnalysis | №0777 |
| battlefieldSupport | №0740 |
| Battlemage | №0796 |
| battleMagic | №0649 |
| battleOver | №0784 |
| bboxDiagonalRatio | №1211 |
| beakColor | №0067 (+ 1 других файлов) |
| beakSize | №0067 (+ 3 других файлов) |
| beakStyle | №0064 (+ 3 других файлов) |
| beard | №0064 (+ 3 других файлов) |
| bearingDegrees | №0819 |
| beast | №0630 (+ 2 других файлов) |
| beast_tamer | №0783 |
| beastCommand | №0777 |
| beastCompanion | №0649 |
| beastheart | №0658 |
| beastheartEndTurn | №0657 |
| beastheartLevel | №0687 |
| beastheartStartTurn | №0657 |
| Beasthide | №0796 |
| beastMaster | №0658 |
| beastShape | №0780 |
| beastSpells | №0649 |
| becomeGhost | №0780 |
| bed | №0068 |
| before | №0828 (+ 1 других файлов) |
| beforeAttack | №0819 |
| beforeRoll | №0656 |
| beginBlind | №0822 |
| beginConcentration | №0656 |
| beginInitial | №0822 |
| beginLastStand | №0819 |
| beginOwnTurn | №0822 |
| beginWager | №0822 |
| behavior | №1268 |
| belt | №0063 |
| bench | №0068 |
| benefits | №0780 |
| berserker_rage | №0783 |
| bestAxisPermutation | №1211 |
| bestiaryVersion | №0629 (+ 12 других файлов) |
| bigby | №0629 |
| bin_bytes | №1200 |
| binary | №1346 |
| binarySha256 | №1346 |
| bindHost | №0817 |
| binding | №0642 |
| bindOnCharnelSpend | №0810 |
| bindPositions | №0059 |
| bindShell | №0785 |
| biomass | №0817 |
| biomassGained | №0817 |
| biomassHealing | №0840 |
| black | №0869 |
| Black | №0777 (+ 1 других файлов) |
| blackmarket | №0802 (+ 1 других файлов) |
| blackRider | №0810 |
| blacksmith | №0800 |
| blastCoating | №0678 |
| blastDice | №0079 |
| blastWave | №0780 |
| blend | №0062 |
| blessGuidance | №0780 |
| blessLike | №0079 |
| blind | №0777 |
| blindBeyond | №0819 |
| blinded | №0819 (+ 1 других файлов) |
| blinding | №0780 |
| Blindness | №0081 |
| blindsense | №0649 |
| blindsight | №0870 |
| blindsightFt | №0780 (+ 1 других файлов) |
| bloatedAgony | №0642 |
| Blob | №1281 (+ 5 других файлов) |
| block | №0845 |
| blocked | №0656 (+ 3 других файлов) |
| blocksIncorporealMovement | №0780 |
| blocksMovement | №0075 |
| bloodAscendent | №0810 |
| bloodCost | №0814 |
| bloodCostPerSpellLevel | №0814 |
| bloodCurseActor | №0656 (+ 1 других файлов) |
| bloodCurseAmplify | №0656 (+ 1 других файлов) |
| bloodCurseDistanceFt | №0656 (+ 1 других файлов) |
| bloodCurseExposure | №0656 |
| bloodCurseOfCorrosion | №0642 |
| bloodCurseOfHowl | №0642 |
| bloodCurseOfTheExorcist | №0642 |
| bloodCurses | №0689 |
| bloodCurseTargetsBloodless | №0780 |
| bloodhawk | №0687 |
| bloodhoundBruisers | №0717 |
| bloodHunterPuppet | №0642 (+ 1 других файлов) |
| bloodiedButUnbowed | №0717 (+ 1 других файлов) |
| bloodline | №0834 (+ 1 других файлов) |
| bloodlines | №0834 |
| bloodlustAdvantage | №0780 |
| bloodMaledict | №0642 (+ 1 других файлов) |
| bloodPrice | №0699 |
| bloodPriceAura | №0780 |
| bloodRiteRevival | №0656 |
| bludgeoning | №0872 |
| blue | №0833 |
| blushColor | №0067 |
| blushOpacity | №1360 |
| bob | №0062 (+ 1 других файлов) |
| bodiesCount | №0079 (+ 1 других файлов) |
| bodiesSpent | №0079 |
| body | №0067 (+ 35 других файлов) |
| bodyAccessories | №0062 |
| bodyColor | №0067 (+ 9 других файлов) |
| bodyDefaults | №0067 |
| bodyDestroyed | №0870 |
| bodyH | №0060 (+ 2 других файлов) |
| bodyHorror | №0630 |
| bodyHP | №0870 |
| bodyMaxHP | №0870 |
| bodyName | №0870 |
| bodyPossession | №0810 |
| bodyPreset | №0060 |
| bodyStats | №0817 |
| bodyTint | №0067 (+ 1 других файлов) |
| bolsteringSuppression | №0780 |
| bomb | №0678 (+ 1 других файлов) |
| bombDamage | №0678 |
| bombFormulas | №0678 |
| bombImmunity | №0780 |
| bombs | №0678 |
| bondedTarget | №0780 |
| bondOfBloodthirst | №0780 |
| bondOwnerId | №0819 |
| bondPartnerId | №0819 |
| bonds | №0687 |
| bondWilling | №0820 (+ 2 других файлов) |
| bone | №0668 (+ 1 других файлов) |
| boneAsh | №0674 |
| boneSpurring | №0780 |
| boneStock | №0668 (+ 1 других файлов) |
| boneStockV49 | №0668 |
| bonus | №0079 (+ 66 других файлов) |
| bonusAC | №0780 |
| bonusAction | №0079 (+ 27 других файлов) |
| bonusActionAfflict | №0780 |
| bonusActionAttack | №0777 |
| bonusActionAttackAfterExploit | №0780 |
| bonusActionAttackAfterSpell | №0814 |
| bonusActionAttacks | №0780 |
| bonusActionDash | №0079 |
| bonusActionDisengageOrHide | №0780 |
| bonusActionDisengageOrSearch | №0780 |
| bonusActionExtraWeaponAttack | №0780 |
| bonusActionFear30 | №0780 |
| bonusActionOrder | №0780 |
| bonusActions | №0659 |
| bonusActionSeed | №0810 |
| bonusActionSupport | №0777 |
| bonusActionSupportOrder | №0780 |
| bonusActionUnarmedOrGrapple | №0780 |
| bonusActionWeaponAttack | №0642 |
| bonusAttack | №0642 (+ 3 других файлов) |
| bonusAttackAfterInvoke | №0780 |
| bonusAttackVsFrightened | №0780 |
| bonusCantrip | №0780 |
| bonusCharnelTouchAfterAttack | №0810 |
| bonusDamage | №0079 (+ 9 других файлов) |
| bonusDamageDice | №0780 |
| bonusDamageDie | №0780 |
| bonusDamageOnHit | №0780 |
| bonusDash | №0780 |
| bonusDie | №0814 |
| bonuses | №0085 (+ 6 других файлов) |
| bonusFireDamage | №0687 |
| bonusGrapple | №0780 |
| bonusHealing | №0780 |
| bonusHp | №0780 (+ 1 других файлов) |
| bonusHpDice | №0780 |
| bonusKnownSpells | №0780 |
| bonusMaxHP | №0780 |
| bonusMeleeAttack | №0780 |
| bonusSpell | №0814 |
| bonusSpells | №0814 |
| bonusSteps | №0810 |
| bonusStrDexConRolls | №0780 |
| bonusWeaponAttackAfterCantrip | №0780 |
| book | №0068 |
| bookshelf | №0068 |
| boon | №0780 |
| boots | №0063 (+ 1 других файлов) |
| bottle | №0068 |
| bottom | №0067 (+ 6 других файлов) |
| boundary | №0059 |
| bounds | №0062 (+ 2 других файлов) |
| bountiful_luck | №0783 |
| bovineEarSize | №0067 (+ 1 других файлов) |
| bowDamageBonus | №0780 |
| bowyer | №0671 |
| boxingTechnique | №0777 |
| bra | №0063 |
| braceUp | №0780 |
| braid | №0062 (+ 1 других файлов) |
| brainsOverBrawn | №0780 |
| bramble | №0079 |
| brambleBomb | №0780 |
| brand | №0780 |
| brandAllyDistanceFt | №0656 |
| brandCastigation | №0656 (+ 2 других файлов) |
| brandOfAxiom | №0642 |
| brandOfCastigation | №0642 (+ 1 других файлов) |
| brandOfSundering | №0642 |
| brandOfTethering | №0642 (+ 1 других файлов) |
| brandOfVoracious | №0642 |
| brandSappingScar | №0642 |
| brawling | №0780 |
| breakConcentration | №0656 |
| breastSize | №0064 (+ 2 других файлов) |
| Breathing | №0081 |
| brew | №0814 |
| brewer | №0671 (+ 3 других файлов) |
| brewMinutes | №0810 |
| briefs_female | №0063 |
| briefs_male | №0063 |
| brightLightFt | №0780 |
| brightLightRadiusFt | №0780 |
| broken | №0067 (+ 2 других файлов) |
| browHeight | №0067 |
| browRidge | №0067 |
| browser | №1339 |
| brutalCritical | №0649 |
| bt_a | №1320 |
| bt_ally | №1214 (+ 5 других файлов) |
| bt_b | №1320 |
| bt_enemy | №1214 (+ 6 других файлов) |
| bt_friend | №1219 |
| bt_own | №1233 |
| bt_owner | №1216 (+ 1 других файлов) |
| bt_self | №1214 (+ 5 других файлов) |
| btoa | №1296 (+ 2 других файлов) |
| bubbles | №0701 |
| budgets | №0060 |
| buf | №0074 |
| buff | №0819 |
| buffer | №1197 (+ 3 других файлов) |
| buffers | №0070 (+ 3 других файлов) |
| bufferView | №1197 (+ 3 других файлов) |
| bufferViews | №1198 (+ 1 других файлов) |
| build | №0059 (+ 3 других файлов) |
| buildAnimations | №0069 |
| builder | №0671 |
| buildFeatureSet | №0649 (+ 2 других файлов) |
| bulette | №0687 |
| bull | №0062 |
| bullMuzzleSize | №0067 (+ 1 других файлов) |
| bun | №0062 (+ 1 других файлов) |
| burden | №0804 (+ 1 других файлов) |
| Burned | №0780 |
| burning | №0079 (+ 1 других файлов) |
| burningTicks | №1157 |
| burstDamage | №0780 |
| burstRadiusFt | №0780 |
| buttocks | №0060 |
| buttonColor | №0063 (+ 2 других файлов) |
| buttons | №0063 (+ 3 других файлов) |
| buy | №0800 (+ 2 других файлов) |
| buyFactor | №0800 (+ 1 других файлов) |
| bypassesTempHP | №0804 |
| byteLength | №1197 (+ 3 других файлов) |
| byteOffset | №1197 (+ 3 других файлов) |
| bytes | №0843 (+ 8 других файлов) |
| bytesDone | №0843 (+ 2 других файлов) |
| bytesTotal | №0843 (+ 2 других файлов) |
| c | №0812 (+ 19 других файлов) |
| cabinet | №0068 |
| cache | №0843 (+ 2 других файлов) |
| cackle | №0780 |
| calcifyingStrike | №0780 |
| calculateAC | №0828 |
| calculatedCombustion | №0780 |
| calculatedFlourish | №0830 |
| calculateEncounter | №0806 |
| calculateMaxHP | №0840 |
| call | №1249 |
| callAPI | №0854 |
| callFromBelow | №0780 |
| calligrapher | №0671 (+ 1 других файлов) |
| callOfIron | №0780 |
| calls | №0872 (+ 2 других файлов) |
| callToHavok | №0780 |
| campaign | №0849 |
| campaignEvent | №0784 |
| campaignEvents | №1270 |
| campaigns | №0643 |
| canAncestorAttack | №0819 |
| canApplyNatively | №0843 |
| canBarter | №0802 |
| canBecomeHuge | №0780 |
| canBurnSealForBlind | №0780 |
| canCaptureHost | №0817 |
| canCast | №0819 |
| cancel | №0887 |
| cancelReaction | №0819 |
| canCounter | №0780 |
| canCraftRecipe | №0671 |
| canDisassemble | №0666 |
| candle | №0068 |
| canEnterHost | №0817 |
| canHear | №1243 |
| canid | №0775 |
| canMerge | №0840 |
| canMove | №0819 |
| cannotBecomeRitual | №0814 |
| cannotLie | №0819 |
| cannotSurprise | №0777 |
| CANONICAL_2024_SUBCLASSES | №0079 |
| canopicJars | №0810 |
| canReceiveHealing | №0785 (+ 1 других файлов) |
| canRepair | №0666 |
| canRestHealBody | №0785 (+ 2 других файлов) |
| canSee | №0819 |
| canTarget0Hp | №0780 |
| cantrip | №0079 (+ 3 других файлов) |
| cantrips | №0642 (+ 4 других файлов) |
| cantripsByLevel | №0810 |
| cantripsKnown | №0708 (+ 2 других файлов) |
| canWalk | №0072 |
| cap | №0063 |
| capaciousAnathema | №0780 |
| capacity | №0780 (+ 4 других файлов) |
| capacityByLevel | №0814 |
| capacityFt3 | №0814 |
| capColor | №0067 (+ 1 других файлов) |
| cape | №0063 |
| capeWidth | №0063 |
| capSize | №0067 (+ 1 других файлов) |
| captain | №0740 (+ 1 других файлов) |
| capture | №0864 |
| capturedAt | №0817 |
| captureHost | №0817 |
| caravan | №0800 (+ 2 других файлов) |
| caravan_master | №0802 (+ 1 других файлов) |
| card | №0822 |
| cardId | №0819 |
| cards | №0822 (+ 2 других файлов) |
| careful | №0649 |
| carpenter | №0670 (+ 4 других файлов) |
| carried | №0807 |
| carryCapacity | №0814 |
| carryingCapacityMultiplier | №0780 |
| cart | №0068 |
| cartographer | №0669 (+ 5 других файлов) |
| cartographyQuality | №0672 |
| case | №0649 (+ 2 других файлов) |
| cases | №1970 |
| castAsRitual | №0814 |
| caster | №0656 (+ 3 других файлов) |
| casterId | №0820 (+ 2 других файлов) |
| casterLevel | №0799 (+ 2 других файлов) |
| castIllriggerActionSpell | №0780 |
| castingClass | №0812 (+ 5 других файлов) |
| castingStat | №0812 (+ 4 других файлов) |
| castingTime | №0761 (+ 16 других файлов) |
| castLucidSpellFree | №0780 |
| castSpell | №0780 (+ 1 других файлов) |
| castSpellInAttack | №0780 |
| castWish | №0780 |
| cat | №0062 (+ 21 других файлов) |
| cataclysm | №0845 |
| cataclysmicStrike | №0780 |
| catalog | №0629 (+ 27 других файлов) |
| catalogKey | №0820 (+ 2 других файлов) |
| catalyst | №0081 (+ 1 других файлов) |
| catalystId | №0081 |
| catalystReagent | №0827 |
| catalysts | №0080 (+ 1 других файлов) |
| catEarSize | №0067 (+ 2 других файлов) |
| categories | №0803 |
| category | №0075 (+ 50 других файлов) |
| catMuzzleSize | №0067 (+ 3 других файлов) |
| caucasian | №1203 |
| cauldron | №0068 (+ 1 других файлов) |
| causal | №0829 |
| ceilingCollision | №0819 |
| celerity | №0642 |
| Celerity | №0780 |
| celestial | №0064 (+ 14 других файлов) |
| celestialDiscourse | №0780 |
| celestialStance | №0780 |
| cell | №0072 (+ 1 других файлов) |
| cellFt | №0862 (+ 20 других файлов) |
| cellPx | №1299 |
| cellSize | №1206 |
| censurePeacemaker | №0780 |
| centaur | №1372 |
| centaurIndices | №0062 |
| centaurSize | №0067 (+ 2 других файлов) |
| center | №0062 (+ 14 других файлов) |
| centerY | №0059 |
| ceramic | №0669 (+ 2 других файлов) |
| cha | №0625 (+ 52 других файлов) |
| chaChecksAdvantage | №0780 |
| chaChecksDisadvantage | №0642 (+ 1 других файлов) |
| chain | №0079 |
| chainReport | №0668 |
| chair | №0068 |
| championCalls | №0736 |
| chance | №0775 (+ 3 других файлов) |
| chandelier | №0068 |
| changedVertices | №1202 |
| changeShape | №0814 |
| channel | №0811 (+ 3 других файлов) |
| channelDivinity | №0649 (+ 3 других файлов) |
| channels | №0069 |
| chant | №0829 |
| character | №0807 (+ 6 других файлов) |
| characterId | №0067 (+ 33 других файлов) |
| characterName | №1296 |
| characters | №0654 (+ 2 других файлов) |
| charcoal | №0669 (+ 3 других файлов) |
| charcoalFine | №0674 |
| charge | №0780 |
| chargeOnDeflect | №0079 |
| charges | №0649 (+ 2 других файлов) |
| chargesMax | №0649 |
| chargesSpent | №0079 (+ 1 других файлов) |
| chargeTempHP | №0780 |
| chargeWeapon | №0079 |
| charisma | №0787 (+ 10 других файлов) |
| charismaChecksAdvantage | №0642 |
| charismaReferencesUse | №0780 |
| charmed | №0819 (+ 2 других файлов) |
| charmedHours | №0780 |
| charmEffect | №0656 |
| charmOrCompel | №0780 |
| charmSourceId | №0819 |
| charnelHitThreshold | №0810 |
| charnelTouch | №0810 |
| charnelTouchMax | №0810 |
| charnelTouchSpendMax | №0810 |
| chaSave | №0780 |
| chaSavesDisadvantage | №0642 (+ 1 других файлов) |
| chat_nickname | №1151 |
| cheapShot | №0780 |
| check | №0780 (+ 2 других файлов) |
| checkAndStage | №0843 |
| checkBonus | №0671 (+ 1 других файлов) |
| checkBonusAll | №0673 |
| checked | №1222 (+ 1 других файлов) |
| checkMageTrack | №0819 |
| checkModifiers | №0079 (+ 6 других файлов) |
| checkResult | №1249 |
| checks | №0780 (+ 1 других файлов) |
| cheekbones | №0064 (+ 1 других файлов) |
| chef | №0673 |
| chest | №0060 (+ 6 других файлов) |
| chestShape | №1160 |
| Chieftain | №0796 |
| childAppearance | №0819 |
| childList | №0793 (+ 5 других файлов) |
| children | №1163 (+ 2 других файлов) |
| chinLength | №0064 (+ 1 других файлов) |
| chitin | №0827 |
| chitinPlate | №0668 (+ 1 других файлов) |
| choice | №0812 (+ 4 других файлов) |
| choiceMode | №0822 |
| choices | №0642 (+ 2 других файлов) |
| choiceSaved | №0872 (+ 1 других файлов) |
| choose | №0676 (+ 23 других файлов) |
| chooseAnyAilments | №0780 |
| chooseBeforeRoll | №0780 |
| chooseBond | №0687 |
| chooseCompanion | №0687 |
| chooseCraft | №0780 |
| chooseGrandHex | №0780 |
| chooseHex | №0780 |
| chooseKnown | №0642 |
| chooseMovement | №0079 |
| chooseResistance | №0079 |
| chooseSavingThrowProficiency | №0780 |
| chooseSpecialization | №0671 |
| chosenCreatureId | №0078 (+ 1 других файлов) |
| cinzel | №0833 |
| circumcised | №0060 |
| cl | №0074 |
| claimReward | №0819 |
| claimWagerReward | №0822 |
| clairvoyance | №0777 |
| clandestineSource | №0780 |
| class | №0625 (+ 3 других файлов) |
| CLASS | №0642 |
| CLASS_NAMES | №0649 |
| classAbilities | №0780 |
| classBonus | №0656 (+ 1 других файлов) |
| classes | №0787 (+ 46 других файлов) |
| CLASSES_REFERENCE | №1337 |
| classFeatureIds | №0812 (+ 5 других файлов) |
| classFeatureNotes | №0656 (+ 1 других файлов) |
| classFeaturesState | №0079 (+ 21 других файлов) |
| classKey | №0828 |
| classLevel | №0828 |
| classList | №1199 |
| className | №0625 (+ 56 других файлов) |
| clawColor | №0067 |
| clawSize | №0067 (+ 2 других файлов) |
| clay | №0669 (+ 2 других файлов) |
| cleanHead | №0067 |
| cleansed | №0819 |
| cleansingTouch | №0649 |
| clear | №0070 (+ 6 других файлов) |
| clearTimeout | №0664 (+ 5 других файлов) |
| cleric | №0799 (+ 1 других файлов) |
| clientId | №0811 (+ 5 других файлов) |
| clientX | №0864 (+ 1 других файлов) |
| clientY | №0864 (+ 1 других файлов) |
| climb | №0810 |
| climbSpeed | №0079 (+ 1 других файлов) |
| clingingCurse | №0780 |
| clone | №0072 (+ 1 других файлов) |
| close | №0064 (+ 9 других файлов) |
| closed | №0790 |
| closedChains | №0668 |
| closeReplay | №0848 |
| closet | №0068 |
| cloth | №0668 (+ 4 других файлов) |
| clothes | №1386 |
| clothing | №0063 (+ 18 других файлов) |
| clothingBuilds | №0064 |
| clothingId | №0063 |
| clothingTriangles | №0064 |
| cloudId | №0654 |
| cloudScope | №0061 |
| cls | №0649 |
| club | №1246 |
| coast | №0800 (+ 1 других файлов) |
| coast_caves | №0879 |
| coast_cliffs | №0879 |
| coast_grotto | №0879 |
| cobbler | №0671 (+ 3 других файлов) |
| code | №1189 |
| coins | №1255 (+ 3 других файлов) |
| col | №0074 (+ 1 других файлов) |
| cold | №0642 (+ 2 других файлов) |
| Cold | №0081 |
| collar | №0063 |
| collect | №0807 (+ 3 других файлов) |
| collectiveBody | №0840 |
| collectLoot | №0784 |
| color | №0060 (+ 9 других файлов) |
| colors | №0074 (+ 2 других файлов) |
| cols | №0079 (+ 21 других файлов) |
| column | №0852 |
| combat | №0849 (+ 1 других файлов) |
| combatant | №0657 |
| combatantId | №0784 (+ 2 других файлов) |
| combatants | №0079 (+ 52 других файлов) |
| combatEnd | №0819 |
| combatHooks | №0708 |
| combatInsight | №0814 |
| combatInspiration | №0649 |
| combatLog | №0866 |
| combatMasteries | №0699 |
| combatMastery | №0699 (+ 1 других файлов) |
| combatOnly | №0819 |
| combatTurnGate | №0687 |
| combineDisciplines | №0780 |
| combustion | №0780 |
| command | №0657 (+ 3 других файлов) |
| commandable | №0780 |
| Commander | №0796 |
| commandFamiliarAndUndeadTogether | №0780 |
| commandRangeMultiplier | №0777 |
| commands | №0780 |
| commandSpellsWithoutSlot | №0810 |
| commandWithoutFear | №0777 |
| commit | №1346 (+ 1 других файлов) |
| commitHostEvent | №1242 (+ 7 других файлов) |
| committed | №0666 |
| common | №0794 (+ 5 других файлов) |
| commonPeopleBonus | №0780 |
| companion | №0079 (+ 4 других файлов) |
| companionACBonus | №0687 |
| companionAction | №0777 |
| companionActor | №0687 |
| companionAttack | №0777 |
| companionDamage | №0777 |
| companionExtraAttack | №0777 |
| companionMagicAttacks | №0777 |
| companionRampage | №0777 |
| companionResistance | №0687 |
| companions | №0687 |
| companionType | №0079 (+ 2 других файлов) |
| compareVersions | №0843 |
| compatibility | №0843 |
| completeAttack | №0836 |
| components | №0069 (+ 14 других файлов) |
| componentType | №1197 (+ 3 других файлов) |
| compositeTerms | №1397 |
| compositions | №1346 |
| compressionLock | №0780 |
| con | №0625 (+ 55 других файлов) |
| concealPsionics | №0780 |
| concentration | №0656 (+ 31 других файлов) |
| concentrationCheck | №0656 |
| concentrationDC | №0828 |
| concentrationSaveBonus | №0780 |
| concentrationState | №0656 |
| concussion | №0079 |
| concussionBomb | №0780 |
| condition | №0079 (+ 11 других файлов) |
| conditionApplied | №0780 |
| conditionChoice | №0687 |
| conditionImmune | №0642 |
| conditionImmunity | №0780 |
| conditionLabel | №0665 |
| conditionModeApplied | №0656 |
| conditionModifiers | №0828 (+ 2 других файлов) |
| conditionNotes | №1236 |
| conditionRemoved | №0872 |
| conditions | №0656 (+ 17 других файлов) |
| CONDITIONS | №0656 (+ 2 других файлов) |
| conditionsImmune | №0659 |
| coneWisdomSave | №0780 |
| config | №0851 |
| configurable | №0819 |
| configure | №0654 |
| configured | №0654 (+ 1 других файлов) |
| confirm | №1159 (+ 3 других файлов) |
| conflict | №0080 (+ 2 других файлов) |
| conflicts | №0654 |
| connected | №0811 (+ 2 других файлов) |
| conSave | №0780 |
| conscious | №0819 |
| console | №1199 |
| constant | №0656 (+ 7 других файлов) |
| constitution | №0787 (+ 12 других файлов) |
| Constitution | №0081 |
| constitutionHalfDamageFailure | №0780 |
| constitutionHalfDamageSuccess | №0780 |
| constitutionMaxBonus | №0780 |
| construct | №0629 (+ 12 других файлов) |
| constructBody | №0810 |
| constructConcentration | №0780 |
| constructDamageBonus | №0780 |
| constructMode | №0780 |
| consumableFunctional | №1253 |
| consumables | №0794 (+ 31 других файлов) |
| consume | №0673 (+ 1 других файлов) |
| consumed | №0673 (+ 2 других файлов) |
| consumedPotion | №0079 |
| consumeLairAction | №0806 |
| consumeLegendaryAction | №0806 |
| consumeLegendaryResistance | №0806 |
| consumeMageBerry | №0819 |
| consumeMagicMeleeWeapon | №0780 |
| consumeMaximum | №0819 |
| consumeOn | №0819 |
| consumePendingOnHit | №0649 (+ 1 других файлов) |
| consuming | №0715 (+ 1 других файлов) |
| Consuming | №0796 |
| consumption | №0780 |
| container | №0790 |
| containerId | №1224 |
| containerRequired | №0780 |
| containers | №0807 (+ 6 других файлов) |
| containerType | №0790 |
| content | №0072 (+ 1 других файлов) |
| contentPackId | №0079 (+ 6 других файлов) |
| contents | №0790 (+ 6 других файлов) |
| contentType | №1362 |
| context | №0656 (+ 1 других файлов) |
| contextIsolation | №0887 |
| contextRestore | №1359 |
| contingencyPlan | №0780 |
| contracts | №0699 |
| controlMode | №0079 (+ 5 других файлов) |
| controlWithoutAction | №0780 |
| controlWithSameAction | №0780 |
| conversant | №0642 |
| Conversant | №0780 |
| convertDamage | №0814 |
| cook | №0671 (+ 4 других файлов) |
| coordinatedAssault | №0780 |
| copper | №0674 |
| copy | №0659 |
| copyDeleted | №0654 |
| core | №0796 |
| CORE | №0649 |
| core_2014 | №0629 |
| coreLoop | №0708 |
| corpseFlorist | №0810 |
| corpseId | №0810 |
| corpseTypes | №0780 |
| corrosion | №0642 (+ 1 других файлов) |
| corset | №1170 |
| cost | №0079 (+ 36 других файлов) |
| costGp | №0800 (+ 4 других файлов) |
| costs | №0625 (+ 1 других файлов) |
| cot | №0068 |
| cotton | №0063 (+ 1 других файлов) |
| counselorProtege | №0780 |
| count | №0062 (+ 64 других файлов) |
| counter | №0068 |
| counterAttackIfReducedToZero | №0780 |
| countercharm | №0649 |
| countered | №0812 |
| countsAsHit | №0780 |
| courageSource | №0656 |
| coven | №0814 |
| covens | №0708 |
| cover | №0812 (+ 6 других файлов) |
| coverBonus | №0812 (+ 1 других файлов) |
| covered | №0060 |
| coversTop | №0063 |
| cp | №0791 (+ 7 других файлов) |
| cr | №0629 (+ 18 других файлов) |
| craft | №0780 (+ 5 других файлов) |
| craftBonus | №0809 |
| craftCheck | №0672 (+ 1 других файлов) |
| craftDC | №0672 (+ 1 других файлов) |
| crafted | №0081 (+ 5 других файлов) |
| craftedOnly | №0794 |
| craftEffect | №0672 |
| craftFeature | №0780 |
| craftingBonus | №0664 (+ 3 других файлов) |
| craftingMaterial | №0665 |
| craftingProfessions | №0670 (+ 2 других файлов) |
| craftingProfile | №0673 |
| craftingSources | №0673 |
| craftMasterworkBonus | №0666 (+ 2 других файлов) |
| craftMaterialId | №0629 (+ 14 других файлов) |
| craftOutcome | №0673 (+ 1 других файлов) |
| craftProfession | №0672 (+ 1 других файлов) |
| craftQuality | №0666 (+ 6 других файлов) |
| craftQualityLabel | №0675 |
| craftRecipe | №0669 (+ 3 других файлов) |
| craftRoll | №0675 |
| CRAFTS | №0780 |
| craftTags | №0668 |
| craftTime | №0669 (+ 2 других файлов) |
| craftTools | №0669 |
| craftValue | №0672 (+ 1 других файлов) |
| craftValueNote | №0666 |
| crate | №0068 |
| create | №0077 (+ 7 других файлов) |
| createAvatar | №0840 |
| createBodyStatBlock | №0870 |
| createBoneObject | №0780 |
| createCharacter | №0067 |
| created | №0780 (+ 1 других файлов) |
| createdAt | №0072 (+ 8 других файлов) |
| createdAtTurn | №0079 |
| createElement | №1159 (+ 23 других файлов) |
| createFor | №0658 (+ 2 других файлов) |
| createHostStatBlock | №0817 |
| createLarvaStatBlock | №0817 |
| createObjectURL | №1299 |
| createOozeDuplicate | №0079 |
| createProjectedItem | №0780 |
| createRoom | №1296 |
| createShell | №0785 |
| creationOptions | №0819 |
| creator | №0796 |
| creatorMind | №0780 |
| creatures | №0840 |
| creatureType | №0647 (+ 12 других файлов) |
| crescendoOfViolence | №0780 |
| crest | №0062 |
| crestSize | №0067 (+ 1 других файлов) |
| crewLeader | №0780 |
| crewRangeFt | №0780 |
| crewSaveBonus | №0780 |
| crewSize | №0780 |
| crewSupport | №0777 |
| criminalContact | №0780 |
| crimson | №0833 |
| crimsonRite | №0642 |
| crimsonRites | №0689 |
| cripplingJinx | №0780 |
| cripplingStrike | №0780 |
| critFearAoEFt | №0642 |
| critical | №0656 (+ 35 других файлов) |
| critical_failure | №0665 (+ 1 других файлов) |
| criticalDoubles | №0780 (+ 1 других файлов) |
| criticalHit | №0780 |
| criticalOn | №0777 |
| criticalOnHit | №0780 |
| criticalRange | №0649 (+ 2 других файлов) |
| criticalSpellcasting | №0810 |
| critRange | №0642 |
| critWithRiteRestoresBloodMaledict | №0780 |
| crLimit | №0780 |
| crone | №0810 |
| crop | №0062 |
| crow | №0062 |
| crown | №0062 (+ 1 других файлов) |
| crown_braid | №0062 (+ 1 других файлов) |
| crownColor | №0067 (+ 1 других файлов) |
| crownSize | №0067 (+ 3 других файлов) |
| crScale | №0079 |
| crTotal | №0810 |
| cruelty | №0642 |
| Cruelty | №0780 |
| cryo | №0079 |
| cryoBomb | №0780 |
| crypto | №1164 (+ 25 других файлов) |
| crystal | №0669 (+ 3 других файлов) |
| cssText | №1219 |
| ctx | №0074 (+ 1 других файлов) |
| cube | №0687 |
| cunningAction | №0649 |
| cunningInstinct | №0780 |
| cupNumber | №0819 (+ 3 других файлов) |
| cups | №0063 (+ 2 других файлов) |
| cups_05 | №0819 |
| cups_13 | №0819 |
| cupsize | №1203 |
| curl | №0062 |
| curly_long | №0062 (+ 1 других файлов) |
| curly_short | №0062 (+ 1 других файлов) |
| current | №0072 (+ 34 других файлов) |
| currentCampaignId | №0643 |
| currentChar | №1250 (+ 5 других файлов) |
| currentCharacter | №1269 |
| currentFloor | №0072 |
| currentHP | №0785 (+ 3 других файлов) |
| currentId | №0848 |
| currentLevel | №0671 |
| currentVersion | №0843 |
| curse | №0078 (+ 10 других файлов) |
| curseAbility | №0078 |
| curseAbilityCheckDC | №0780 |
| curseBonusDamage | №0642 |
| curseCombination | №0780 |
| curseConcentrationAdvantage | №0814 |
| cursed | №0064 (+ 1 других файлов) |
| cursedAttackPenalty | №0642 |
| cursedCheckModifiers | №0642 |
| curseDetection30 | №0780 |
| cursedSaveModifiers | №0642 |
| curseImmunity | №0780 |
| curseItem | №0814 |
| curseMastery | №0777 |
| curseName | №0780 |
| cursePenalty | №0810 |
| cursePower | №0777 |
| curses | №0642 (+ 4 других файлов) |
| CURSES | №0780 |
| curseSave | №0810 |
| curseSpecialist | №0642 |
| curseSpells | №0780 |
| curseTarget | №0780 |
| custom | №0067 (+ 2 других файлов) |
| customColor | №0062 (+ 2 других файлов) |
| customCrafted | №0675 |
| customDress | №0063 |
| CustomEvent | №1199 (+ 1 других файлов) |
| customizations | №1168 (+ 1 других файлов) |
| customShirt | №0063 |
| customSkirt | №0063 |
| cut | №0063 (+ 2 других файлов) |
| cutoff | №1397 |
| cwd | №1156 (+ 3 других файлов) |
| cx | №0059 (+ 2 других файлов) |
| cycles | №0826 (+ 1 других файлов) |
| cz | №0062 (+ 1 других файлов) |
| d | №0059 (+ 6 других файлов) |
| d2 | №1205 (+ 2 других файлов) |
| d20 | №0656 (+ 2 других файлов) |
| d20Modifiers | №0819 |
| d6 | №0079 |
| damage | №0075 (+ 89 других файлов) |
| DAMAGE_TYPES | №0656 |
| damageAfter | №0780 |
| damageAtTurnStart | №0079 |
| damageBefore | №0780 |
| damageBody | №0817 (+ 1 других файлов) |
| damageBonus | №0780 (+ 1 других файлов) |
| damageBonusMultiplier | №0780 |
| damageBoost | №0777 |
| damageContext | №0812 |
| damageDice | №0079 (+ 14 других файлов) |
| damageDie | №0777 (+ 1 других файлов) |
| damageDoubled | №0656 |
| damageDurability | №0667 |
| damageImmunity | №0780 |
| damageModifiers | №0642 (+ 1 других файлов) |
| damageMult | №0840 |
| damageOnFailedSave | №0780 |
| damageParts | №0642 (+ 6 других файлов) |
| damagePer10Ft | №0780 |
| damagePerTrigger | №0780 |
| damageRedirect | №0814 |
| damageReduction | №0649 (+ 4 других файлов) |
| damageResistance | №0777 (+ 1 других файлов) |
| damageResult | №0656 (+ 1 других файлов) |
| damageRoll | №0079 (+ 4 других файлов) |
| damageRolled | №0819 |
| damageSelf | №0780 |
| damageShell | №0785 |
| damageTaken | №0656 |
| damageType | №0079 (+ 84 других файлов) |
| damageTypeChoice | №0780 |
| damageTypes | №0079 (+ 5 других файлов) |
| danceBonusByCount | №0810 |
| dangerSense | №0649 |
| daringRescue | №0780 |
| dark | №0869 |
| darkArcana | №0810 |
| darkAugmentation | №0642 |
| darkCaptain | №0780 |
| darkDelirium | №0812 |
| darkMagic | №0777 |
| darkness | №0072 (+ 1 других файлов) |
| darknessAroundInterdictedFt | №0780 |
| darkOneDiscourse | №0780 |
| darkOnesBlessing | №0649 |
| darkvision | №0834 |
| darkvision60 | №0780 |
| darkvisionBonusFt | №0642 |
| darkvisionFt | №0642 (+ 1 других файлов) |
| dash | №0777 |
| dashMageRetreat | №0819 |
| dastardlyTalents | №0780 |
| data | №0078 (+ 10 других файлов) |
| dataset | №1184 |
| date | №0643 (+ 1 других файлов) |
| dauntless | №0740 |
| dawn | №0642 |
| day | №0074 |
| dc | №0078 (+ 45 других файлов) |
| dcReduction | №0673 |
| dead | №0079 (+ 6 других файлов) |
| deadMistAcolyte | №0810 |
| deadShell | №0785 |
| deadSpace | №0780 (+ 1 других файлов) |
| deadSpaceSlots | №0810 |
| deafened | №0079 (+ 1 других файлов) |
| deathAfterDuration | №0780 |
| deathCause | №1158 |
| deathExplosion | №0810 |
| deathKnight | №0810 |
| deathPenalty | №0780 |
| deathSave | №0656 |
| deathSaveDisadvantage | №0642 (+ 1 других файлов) |
| deathSaveFailures | №0656 |
| deathSaves | №0656 (+ 6 других файлов) |
| deathWard | №0814 |
| debug | №0849 |
| decayPerHour | №0079 |
| deception | №0773 (+ 1 других файлов) |
| deceptionBlocked | №0819 |
| deceptionIntent | №1237 |
| deceptionTotal | №0079 (+ 1 других файлов) |
| deck | №0822 (+ 1 других файлов) |
| decks | №0822 |
| declaredSourceCommit | №1397 |
| decorateItem | №0671 |
| deepSleeper | №0780 |
| deerHide | №0674 |
| default | №0067 (+ 2 других файлов) |
| DEFAULT | №0072 |
| DEFAULT_ENABLED | №0667 |
| DEFAULT_RACES | №1337 |
| defaultEnabled | №1191 |
| defaultSkinByGender | №0067 |
| defaultSkinId | №0067 |
| defeat | №0839 |
| defeated | №0079 (+ 9 других файлов) |
| defenderAura | №0777 |
| defenderReaction | №0656 (+ 4 других файлов) |
| defensive_duelist | №0783 |
| defensiveStance | №0780 |
| deferDamage | №0812 (+ 1 других файлов) |
| definition | №0819 |
| definitions | №0819 |
| deflected | №0656 |
| deflectMissiles | №0649 |
| deformAsset | №0069 |
| deformedPositions | №1181 |
| deftness | №0642 |
| Deftness | №0780 |
| deinonychus | №0687 |
| deleted | №0654 (+ 1 других файлов) |
| denial | №0780 |
| deniesActions | №0079 |
| denominator | №0822 |
| density | №0060 (+ 2 других файлов) |
| denValues | №0063 |
| denyAttackAdvantage | №0780 |
| denyBonusActions | №0079 |
| denyDashDisengageDodge | №0079 |
| depleted | №1251 |
| depth | №0062 (+ 4 других файлов) |
| desc | №0625 (+ 13 других файлов) |
| describeProfession | №0671 |
| description | №0072 (+ 70 других файлов) |
| descriptor | №0060 |
| deserialize | №0067 |
| desk | №0068 |
| destination | №0819 (+ 8 других файлов) |
| destinationGender | №1397 |
| destroy | №0844 |
| destroyThrallToHeal | №0810 |
| destroyUndead | №0649 |
| detail | №0067 (+ 3 других файлов) |
| details | №0785 (+ 3 других файлов) |
| detectIllusionAndShapeshifter | №0780 |
| detectMagic | №0780 (+ 1 других файлов) |
| dethek | №0780 (+ 1 других файлов) |
| dethekStance | №0780 |
| devicePixelRatio | №1159 (+ 1 других файлов) |
| devices | №0671 |
| deviceScaleFactor | №1374 |
| devilDamageMaximum | №0819 |
| devilPlan | №0819 |
| deviousTactics | №0780 |
| devouring | №0780 (+ 1 других файлов) |
| devTools | №0887 |
| dex | №0625 (+ 56 других файлов) |
| dexBonus | №0642 |
| dexChecksAdvantage | №0642 (+ 1 других файлов) |
| dexIncrease | №0780 |
| dexMaxBonus | №0642 |
| dexMaxIncrease | №0780 |
| dexSave | №0780 |
| dexSavesDisadvantage | №0642 (+ 1 других файлов) |
| dexSaveVisible | №0656 (+ 1 других файлов) |
| dexterity | №0787 (+ 10 других файлов) |
| Dexterity | №0081 |
| dexteritySaveProficiency | №0780 |
| diagnostics | №0064 (+ 1 других файлов) |
| diagonal | №0821 |
| dialect | №0780 (+ 1 других файлов) |
| diamondForm | №0780 |
| diamondPaste | №0674 |
| diamondSoul | №0649 |
| dice | №0078 (+ 9 других файлов) |
| diceCount | №0648 (+ 3 других файлов) |
| diceSides | №0648 (+ 3 других файлов) |
| die | №0082 (+ 6 других файлов) |
| diet | №0629 (+ 12 других файлов) |
| difficultTerrain | №1291 |
| difficulty | №0806 |
| digDeep | №0717 (+ 1 других файлов) |
| digits | №0062 |
| diminutive | №0834 (+ 1 других файлов) |
| dimLightAdditionalFt | №0780 |
| direct | №0819 (+ 2 других файлов) |
| directAttackNearestIfFailed | №0780 |
| directDice | №0079 |
| direction | №0074 (+ 6 других файлов) |
| directionSense | №0780 |
| directShift | №0834 |
| dirty | №0654 |
| dirtyHit | №0780 |
| dirtyStrike | №0777 |
| disabled | №0665 (+ 2 других файлов) |
| disabledBlocked | №1191 |
| disableSense | №0780 |
| disadvantage | №0079 (+ 10 других файлов) |
| disadvantageAgainstOthers | №0780 |
| disadvantageAgainstOthersWithinFt | №0780 |
| disadvantageAgainstSelf | №0780 |
| disadvantageAttacksExceptSelfUntilEndNextTurn | №0780 |
| disadvantageFirstSaveAgainstSpell | №0780 |
| disadvantageInDimLight | №0780 |
| disadvantageNextAttack | №0780 |
| disadvantageOnSaveWhenHidden | №0780 |
| disadvantageSaves | №0780 |
| disadvantageVsBloodHunterSpells | №0780 |
| disarm | №0777 (+ 1 других файлов) |
| disassembleItem | №0665 (+ 1 других файлов) |
| discard | №0822 |
| disciplinaryAdept | №0780 |
| discipline | №0715 (+ 4 других файлов) |
| disciplines | №0715 (+ 2 других файлов) |
| disciplineUsesPerTurn | №0715 |
| discovered | №0080 (+ 1 других файлов) |
| discoveries | №0079 (+ 3 других файлов) |
| discovery | №0079 (+ 1 других файлов) |
| discoveryBonus | №0082 |
| discoveryLevelGating | №0678 |
| discoveryRecipes | №0079 |
| disengageOnHit | №0777 |
| disguise | №0673 |
| disguiseAndHexFocus | №0814 |
| disguiseAppearance | №0079 |
| disguiser | №0671 (+ 1 других файлов) |
| dismissMageArmor | №0819 |
| disoriented | №0780 |
| disorientedDice | №0780 |
| dispellingAnathema | №0780 |
| display | №0800 (+ 1 других файлов) |
| displayName | №0646 (+ 3 других файлов) |
| dispose | №0074 |
| dist | №0812 |
| distance | №0657 (+ 2 других файлов) |
| distanceFt | №0642 (+ 18 других файлов) |
| distant | №0649 |
| divineChannelUses | №0810 |
| divineIntervention | №0649 |
| divineMandate | №0780 |
| divineRespite | №0804 |
| divineSense | №0649 |
| divineSmite | №0649 (+ 2 других файлов) |
| dlc | №0667 |
| DND_CLASSES_LIST | №1337 |
| DND_UPDATE_MANIFEST_URL | №1336 |
| dndBackgrounds | №1337 |
| DNDBattleBoard | №1270 |
| DNDCampaign | №1269 (+ 1 других файлов) |
| DNDCloudConfig | №1189 |
| DNDCombat | №1269 (+ 1 других файлов) |
| DNDContent | №1157 (+ 2 других файлов) |
| DNDGameplayV57 | №1270 |
| DNDGLTF | №1159 |
| DndLanBridge | №1296 |
| DNDMonsterLoot | №1269 |
| dndMorphChannels | №1159 (+ 1 других файлов) |
| dndMorphSource | №1348 |
| dndNetwork | №1269 (+ 1 других файлов) |
| DNDRules | №1331 |
| DNDSummoning | №1269 |
| dock | №0071 |
| document | №1157 (+ 39 других файлов) |
| documentElement | №1199 |
| dodge | №0780 |
| dogAndHound | №0717 |
| dominantCharacteristics | №0870 |
| donorHitDieSpent | №0814 |
| donorType | №0079 (+ 1 других файлов) |
| donorVerified | №1158 |
| door | №0068 |
| doubleBreath | №0780 |
| doubleFoodSleepInterval | №0780 |
| doubleProficiency | №0780 |
| doubleSided | №0070 |
| doubleSpeed | №0810 |
| doublingJinx | №0780 |
| downButNotOut | №0717 (+ 1 других файлов) |
| downButNotOutActive | №0780 |
| downstreamRecipeAvailable | №0664 |
| draconicDiscourse | №0780 |
| draconicElement | №1308 |
| draconicResilience | №0649 |
| draconicStance | №0780 |
| draft | №0862 |
| dragging | №0627 |
| dragon | №0062 (+ 17 других файлов) |
| dragon_fear | №0783 |
| dragonArmyAffinity | №0632 |
| dragonFamily | №1264 |
| dragonlance | №0632 |
| dragonReagent | №0668 (+ 1 других файлов) |
| dragonsAscent | №0780 |
| dragonScale | №0668 (+ 1 других файлов) |
| dragonScaleRed | №0674 |
| draw | №0073 (+ 2 других файлов) |
| draws | №1159 |
| dreadfulGlare | №0780 |
| dreadlord | №0780 |
| dreadPresence | №0780 |
| dress | №0063 (+ 1 других файлов) |
| dressSleeves | №0063 |
| driedHerbBundle | №0673 |
| driedMeat | №0673 (+ 1 других файлов) |
| dropObject | №0780 |
| dropToOneHP | №0687 |
| Drowned | №0780 |
| druid | №0799 (+ 1 других файлов) |
| druidic | №0649 |
| dryRun | №0664 (+ 6 других файлов) |
| duplicate | №0853 |
| duplicateOnPhaseRift | №0780 |
| duplicateTargetCollisions | №1211 |
| dur | №0668 |
| durability | №0666 (+ 4 других файлов) |
| durabilityBonus | №0670 |
| durabilityMax | №1190 (+ 1 других файлов) |
| durabilityMultiplier | №0666 (+ 2 других файлов) |
| duration | №0069 (+ 21 других файлов) |
| durationHours | №0642 (+ 2 других файлов) |
| durationMinutes | №0079 (+ 6 других файлов) |
| durationRounds | №0078 (+ 4 других файлов) |
| durationRule | №0834 |
| durationSeconds | №0819 (+ 1 других файлов) |
| durationTurns | №0810 |
| durationUnit | №0658 (+ 1 других файлов) |
| durationUntilSave | №0810 |
| durationUntilStartOfTurn | №0780 |
| duringShortRest | №1158 |
| dusk | №0074 |
| dwarf | №0664 |
| dwarf_hill | №0673 |
| dwarf_mountain | №0673 |
| dwarven_fortitude | №0783 |
| dwarvishDiscourse | №0780 |
| dyingCurse | №0780 |
| dynamic | №0062 |
| e | №0075 (+ 1 других файлов) |
| earField | №0062 |
| earFrame | №0063 |
| earLength | №0067 (+ 6 других файлов) |
| earPointiness | №0067 (+ 6 других файлов) |
| earth | №0687 |
| Earth | №0081 |
| earthCore | №0827 |
| earthEssence | №0827 |
| earTuftSize | №0067 (+ 2 других файлов) |
| ecology | №0629 (+ 12 других файлов) |
| ectoplasm | №0668 (+ 1 других файлов) |
| edition | №0078 (+ 23 других файлов) |
| effect | №0079 (+ 20 других файлов) |
| effectiveD20 | №0656 |
| effectiveDamage | №0656 |
| effectiveMaxHp | №0828 |
| effectiveMode | №1236 |
| effectiveStats | №0817 |
| effectKey | №0817 |
| effects | №0081 (+ 7 других файлов) |
| elasticHide | №0827 |
| Elderheart | №0796 |
| eldritchBane | №0780 |
| eldritchCannon | №0649 |
| eldritchInvocations | №0649 |
| eldritchMaster | №0649 |
| electricCharge | №0780 |
| elemental | №0064 (+ 14 других файлов) |
| Elemental | №0796 |
| elementalAsh | №0668 (+ 1 других файлов) |
| elementalBlast | №0780 |
| elementalPower | №0780 |
| elephant | №0062 |
| elephantEarSize | №0067 (+ 1 других файлов) |
| elephantTuskSize | №0067 (+ 1 других файлов) |
| elevationFt | №0819 |
| elf_wood | №0673 |
| elfcity | №0064 |
| eligible | №1248 |
| elixirs | №0671 |
| eloquentSpeech | №0780 |
| elven_accuracy | №0783 |
| email | №0654 (+ 2 других файлов) |
| emanationFt | №0780 |
| embers | №0642 |
| Embers | №0780 |
| emerald | №0869 |
| emergencyReanimate | №0870 |
| emissaryPhaseHooks | №1257 |
| empowered | №0649 (+ 1 других файлов) |
| empty | №0820 |
| enableApply | №0844 |
| enabled | №0060 (+ 6 других файлов) |
| enchant | №0671 |
| enclosed | №0060 |
| encoding | №0890 (+ 7 других файлов) |
| encounter | №0861 (+ 1 других файлов) |
| encounterBias | №0633 |
| encounterId | №0819 (+ 2 других файлов) |
| end | №0062 (+ 2 других файлов) |
| endActorTurn | №0642 |
| endAllRites | №0780 |
| endCondition | №0780 |
| endConditions | №0780 |
| endedByZeroHp | №0656 |
| endEffectPsi | №0780 |
| endEncounter | №0687 |
| endExternalPetrificationAfter | №0780 |
| endIllusion | №0780 |
| endInvisibility | №0780 |
| endPossession | №0785 |
| endRampage | №0687 |
| ends | №0845 |
| endsAt | №0780 |
| endsOnAttack | №0079 (+ 1 других файлов) |
| endsOnAttackOrSpell | №0780 |
| endsOnDamage | №0079 |
| endsOnHostile | №0819 |
| endsOnMagicHealing | №0687 |
| endsOnMove | №0780 |
| endsOnRemoveCurse | №0780 |
| endSpellConcentration | №0819 |
| endsWhen | №0780 |
| endTurn | №0784 (+ 3 других файлов) |
| enemiesFrightened | №0780 |
| enemy | №1216 (+ 6 других файлов) |
| enemyDistanceFt | №1249 |
| enemyRead | №0777 |
| enervatingJinx | №0780 |
| enervatingSpell | №0780 |
| eng | №0746 |
| engines | №0849 (+ 1 других файлов) |
| englishName | №0078 (+ 29 других файлов) |
| enhancement | №0780 |
| enhancingSurge | №0780 |
| enlightened | №0780 |
| enliveningOrder | №0780 |
| enshroudingImprecation | №0780 |
| ensure | №0785 (+ 8 других файлов) |
| ensureCharacterProfessions | №0671 |
| ensureMaterial | №0668 |
| ensureResourceState | №0806 |
| ensureTracker | №0784 (+ 1 других файлов) |
| enterSpiritForm | №0785 |
| entities | №0079 (+ 2 других файлов) |
| entity | №0079 (+ 4 других файлов) |
| entityId | №0079 (+ 4 других файлов) |
| entries | №0654 (+ 1 других файлов) |
| entryRoute | №0870 |
| enumerable | №0819 |
| env | №1156 |
| ep | №0791 (+ 5 других файлов) |
| equip | №0067 |
| equipment | №0067 (+ 6 других файлов) |
| equipmentId | №0067 |
| equipMilitia | №0780 |
| equipped | №0075 (+ 6 других файлов) |
| equippedArmor | №1191 |
| error | №0064 (+ 33 других файлов) |
| error_code | №1189 |
| errors | №0662 (+ 1 других файлов) |
| essence | №0827 |
| eTexture | №0077 |
| ethanol | №0674 |
| ethereal | №0780 |
| evasion | №0649 (+ 3 других файлов) |
| evasionMonk | №0649 |
| event | №0819 (+ 3 других файлов) |
| eventCount | №0848 (+ 2 других файлов) |
| eventId | №0820 (+ 1 других файлов) |
| eventLog | №0863 (+ 2 других файлов) |
| eventLogBaseSeq | №1329 |
| events | №0848 (+ 5 других файлов) |
| eventSeq | №0811 (+ 5 других файлов) |
| exact | №1362 |
| exaltedLeader | №0740 |
| exaltedMutation | №0642 |
| exaltedProtege | №0780 |
| excellent | №0809 |
| exceptional | №0665 (+ 1 других файлов) |
| exceptPsychic | №0780 |
| exclude | №0059 |
| excludeUndeadConstructs | №0819 (+ 2 других файлов) |
| executablePath | №1351 (+ 37 других файлов) |
| executeAttack | №0784 |
| executionActor | №0819 |
| exhaustion | №0780 (+ 2 других файлов) |
| exhaustionAfter | №0777 |
| exhaustionApplied | №0780 |
| exhaustionGain | №0777 |
| exhaustionOnFailedSave | №0780 |
| exit | №1194 |
| exorcist | №0642 (+ 1 других файлов) |
| exoskeletonArmor | №0780 |
| exp | №0781 |
| expand | №0661 |
| expanded | №0661 (+ 1 других файлов) |
| expected | №0855 (+ 2 других файлов) |
| expectedProcessed | №0827 |
| expectedRevision | №0794 (+ 21 других файлов) |
| expendHitDie | №0780 |
| experience | №0787 |
| experimental | №0080 (+ 1 других файлов) |
| experimentalist | №0678 |
| experiments | №0080 (+ 1 других файлов) |
| expertFocus | №0780 |
| expertise | №0780 (+ 1 других файлов) |
| expertiseSkills | №0780 |
| expired | №0079 |
| expires | №0079 (+ 3 других файлов) |
| expires_at | №0654 |
| expires_in | №1189 |
| expiresAt | №0078 (+ 3 других файлов) |
| expiresRounds | №0780 |
| exploded | №0079 |
| explodeRadiusFt | №0079 |
| explodesOncePerTurn | №0780 |
| exploit | №0687 |
| exploitDice | №0740 |
| exploitDie | №0740 (+ 1 других файлов) |
| exploits | №0740 (+ 1 других файлов) |
| exploitsKnown | №0740 |
| explosiveBane | №0780 |
| explosiveCannon | №0812 |
| exportedAt | №0848 |
| exportedMacros | №1397 |
| exportJSON | №0064 (+ 1 других файлов) |
| exportReplay | №0848 |
| exportSession | №0861 (+ 1 других файлов) |
| exposingStrike | №0780 |
| exposure | №0642 |
| expression | №0656 (+ 2 других файлов) |
| extended | №0649 |
| extendedResourceState | №0649 |
| extendedTactics | №0736 |
| extendExistingDarkvisionFt | №0642 |
| extendHex | №0777 |
| extendHexRounds | №0780 |
| external | №0060 (+ 2 других файлов) |
| externalGeometryAvailable | №0060 |
| externalGeometryReady | №0060 |
| externalGeometryStage | №0060 |
| extra | №0080 (+ 2 других файлов) |
| extraAction | №0780 (+ 1 других файлов) |
| extraActionNextTurn | №0819 |
| extraAstralConstruct | №0780 |
| extraAtk | №0648 (+ 1 других файлов) |
| extraAttack | №0642 (+ 7 других файлов) |
| extraAttackDamage | №0642 |
| extraAttacks | №0078 (+ 13 других файлов) |
| extraBloodMaledictUse | №0642 (+ 1 других файлов) |
| extraCantrips | №0814 |
| extraClassType | №0647 |
| extraCurseArmamentAttack | №0780 |
| extraCursedAttunement | №0780 |
| extraDamage | №0079 (+ 2 других файлов) |
| extraDamageByLevel | №0078 |
| extraDamageDice | №0780 |
| extraDamageDie | №0780 |
| extraDice | №0079 (+ 8 других файлов) |
| extraDieVsUndead | №0780 |
| extradimensional | №0814 |
| extraDimLight | №0780 |
| extraDimLightDie | №0780 |
| extraDiscipline | №0780 |
| extraDmg | №0648 (+ 2 других файлов) |
| extraExploitDice | №0780 |
| extraExploitKnown | №0780 |
| extraFamiliarAction | №0814 |
| extraForms | №0780 |
| extraKnowledgeSkill | №0780 |
| extraMovement | №0819 |
| extraNecrotic | №0780 |
| extrapolated | №1348 |
| extraPsiOverMax | №0780 |
| extraPsychicDice | №0780 |
| extraRadiusFt | №0079 |
| extraRampageDie | №0780 |
| extraReaction | №0819 |
| extraReactions | №0819 |
| extraRiteDie | №0780 |
| extras | №1159 (+ 1 других файлов) |
| extraSaveBonus | №0873 |
| extraSkillChoice | №0780 |
| extraSuture | №0810 |
| extraTargetPerSlotAbove1 | №0780 |
| extraTargets | №0780 |
| extraTrigger | №1971 |
| extraTurns | №0814 |
| extraUnarmedAfterTwoOldOneTwo | №0780 |
| extraUse | №0780 (+ 1 других файлов) |
| eye | №0062 (+ 1 других файлов) |
| eyeColor | №0067 (+ 3 других файлов) |
| eyeGlow | №0067 (+ 2 других файлов) |
| eyeHeight | №0064 (+ 2 других файлов) |
| eyeless | №0642 |
| eyeliner | №1360 |
| eyeShape | №0067 |
| eyeSize | №0067 (+ 1 других файлов) |
| eyeSpacing | №0067 (+ 1 других файлов) |
| eyeTilt | №0064 (+ 1 других файлов) |
| eyeWidth | №0064 (+ 1 других файлов) |
| f | №0062 (+ 2 других файлов) |
| faceColor | №0067 (+ 5 других файлов) |
| faceLength | №0064 (+ 1 других файлов) |
| faceShape | №0067 |
| faceTint | №0067 (+ 2 других файлов) |
| faceWidth | №0064 (+ 2 других файлов) |
| facileSuppression | №0780 |
| factionAgents | №0633 |
| factions | №0633 |
| fail | №0844 (+ 1 других файлов) |
| failChance | №0081 |
| failed | №0064 (+ 4 других файлов) |
| failedSave | №1238 |
| failNextRollDisadvantage | №0780 |
| failure | №0081 (+ 3 других файлов) |
| failures | №0656 (+ 14 других файлов) |
| fair | №0809 |
| fall | №0656 (+ 3 других файлов) |
| fallDamageReduction | №0780 |
| fallen | №0072 (+ 1 других файлов) |
| fallenAttack | №0642 |
| fallenPuppet | №0642 |
| fallingStrike | №0777 |
| familiar | №0658 (+ 2 других файлов) |
| familiarAttack | №0780 |
| familiarHpBonus | №0780 |
| familiarLink | №0814 |
| familiarSettlement | №0780 |
| familiarStealth | №0814 |
| families | №0629 (+ 24 других файлов) |
| family | №0060 (+ 3 других файлов) |
| familyByCreature | №1256 (+ 10 других файлов) |
| familyId | №0629 (+ 10 других файлов) |
| fancyFootwork | №0780 |
| fangSize | №0067 (+ 2 других файлов) |
| fastHands | №0649 |
| fastMovement | №0649 |
| fastTravel | №0780 |
| fat | №0064 (+ 1 других файлов) |
| fathomless | №0642 |
| fatigue | №0780 |
| favoredEnemy | №0649 |
| favoredServant | №0780 |
| fear | №0079 (+ 1 других файлов) |
| Fear | №0081 |
| fearApplied | №0780 |
| fearAura | №0777 |
| fearBomb | №0780 |
| fearImmune | №0819 |
| fearImmunity | №0777 |
| fearPulse | №0630 |
| fearSave | №0780 |
| fearSavePenalty | №0780 |
| fearSourceId | №0819 |
| fearTargets | №1245 |
| fearVisible | №0819 |
| feat | №0748 |
| featherTailSize | №0067 (+ 3 других файлов) |
| featherWingSize | №0067 (+ 3 других файлов) |
| feats | №0787 (+ 3 других файлов) |
| feature | №0625 (+ 1 других файлов) |
| FEATURE_DEFS | №0649 |
| featureAvailableForCurrentBuild | №0649 |
| featureId | №0812 |
| featureLevels | №0804 (+ 4 других файлов) |
| featureName | №0812 (+ 2 других файлов) |
| features | №0787 (+ 57 других файлов) |
| fecundAffliction | №0780 |
| feedOnCorpse | №0817 |
| feet | №0062 (+ 9 других файлов) |
| feint | №0780 |
| female | №0060 (+ 2 других файлов) |
| femaleStackTerms | №1397 |
| feralInstinct | №0649 |
| feralSenses | №0649 (+ 1 других файлов) |
| ferocious | №0687 |
| ferocity | №0657 (+ 3 других файлов) |
| ferocityMax | №0658 (+ 1 других файлов) |
| fetch | №1161 (+ 6 других файлов) |
| fey | №0629 (+ 11 других файлов) |
| fey_touched | №0783 |
| feyFiber | №0827 |
| feyPresence | №0649 (+ 1 других файлов) |
| fiber | №0668 (+ 1 других файлов) |
| field | №0062 (+ 1 других файлов) |
| fiend | №0629 (+ 12 других файлов) |
| fiendish | №0780 (+ 1 других файлов) |
| fiendishStance | №0780 |
| fight | №0819 |
| fightClubs | №0717 |
| fighterRemarkableAthlete | №0649 |
| fighting_initiate | №0783 |
| fightingSpirit | №0717 (+ 1 других файлов) |
| fightingStyle | №0642 (+ 4 других файлов) |
| fightingStyleChoice | №0780 |
| fightingStyles | №0689 (+ 1 других файлов) |
| file | №0869 (+ 1 других файлов) |
| filename | №0664 (+ 70 других файлов) |
| FileReader | №1299 |
| files | №0843 (+ 4 других файлов) |
| filter | №0833 (+ 3 других файлов) |
| filtered | №0848 |
| final | №0851 |
| finalMartyrdom | №0804 |
| finalStrikeExploit | №0780 |
| findRecipeForItem | №0665 |
| fine | №0665 (+ 3 других файлов) |
| finecarver | №0671 |
| fineFiberV49 | №0668 |
| fineLeatherV49 | №0668 |
| finesse | №0814 |
| finesseOrRanged | №1309 |
| finger | №0062 |
| finish | №0062 (+ 2 других файлов) |
| finishLastStand | №0819 |
| finite | №1365 (+ 3 других файлов) |
| finSize | №0067 (+ 2 других файлов) |
| firbolg | №0673 |
| fire | №0642 (+ 3 других файлов) |
| Fire | №0081 |
| fireAffinity | №0814 |
| fireClay | №0674 |
| fireDamage | №0780 (+ 1 других файлов) |
| fireEssence | №0668 (+ 1 других файлов) |
| fireResistance | №0814 |
| firmness | №1203 |
| first | №0828 |
| firstAid | №0780 |
| firstAttackAdvantage | №0780 (+ 1 других файлов) |
| firstHitByEachTargetRestoresMoxie | №0780 |
| firstMate | №0780 |
| fisher | №0802 (+ 1 других файлов) |
| fisticuffs | №0717 |
| fisticuffsDie | №0717 |
| fit | №0063 (+ 8 других файлов) |
| fitFrame | №0063 |
| fitProfile | №0067 |
| fixed | №0714 (+ 1 других файлов) |
| fixtureSha256 | №1202 |
| fizban | №0629 |
| flags | №0819 |
| flame | №0642 |
| flameBurst | №0780 |
| flameReroll12 | №0642 |
| flamesOfHope | №0780 |
| flare | №0063 |
| flashOfGenius | №0649 (+ 1 других файлов) |
| flashOfGeniusAvailable | №0656 |
| flat | №0062 |
| flawed | №0675 |
| flawlessAnalysis | №0830 |
| flax | №0674 |
| fletcher | №0671 (+ 2 других файлов) |
| fletchingStock | №0668 (+ 1 других файлов) |
| fletchingStockV49 | №0668 |
| floatObjectsLb | №0780 |
| floor | №0059 (+ 5 других файлов) |
| FLOOR | №0073 |
| floor_ceramic_tile_dark | №0073 |
| floor_ceramic_tile_light | №0073 |
| floor_checker_tile | №0073 |
| floor_cobblestone | №0073 |
| floor_earth | №0073 |
| floor_grass | №0073 |
| floor_hex_tile | №0073 |
| floor_marble_dark | №0073 |
| floor_marble_light | №0073 |
| floor_parquet_herringbone | №0073 |
| floor_rug_blue | №0073 |
| floor_rug_green | №0073 |
| floor_rug_red | №0073 |
| floor_stone_tile_dark | №0073 |
| floor_stone_tile_light | №0073 |
| floor_tatami | №0073 |
| floor_water | №0073 |
| floor_wood_dark | №0073 |
| floor_wood_light | №0073 |
| floors | №0072 (+ 1 других файлов) |
| flowers | №0826 |
| flurry | №0649 |
| fly | №0810 |
| flyFt | №0642 (+ 1 других файлов) |
| flyIfSelected | №0687 |
| flyingSpeed | №0814 |
| flySpeed | №0079 (+ 2 других файлов) |
| focus | №0642 (+ 10 других файлов) |
| focusDebuff | №0780 |
| focusDuration | №0830 |
| focusDurationRounds | №0780 |
| focusEndsOn | №0830 |
| focuses | №0649 |
| focusRangeFt | №0830 |
| foe | №1218 (+ 4 других файлов) |
| foeSlayer | №0649 |
| foeSlayerApplied | №1310 |
| foeSlayerMode | №1310 |
| folder | №1203 (+ 2 других файлов) |
| folders | №0625 (+ 1 других файлов) |
| fontOfLife | №0736 |
| fontOfMagic | №0649 |
| food | №0800 |
| foot | №0062 |
| footL | №0060 |
| footprintFeet | №0067 |
| footR | №0060 |
| foraging | №0671 |
| force | №0872 (+ 7 других файлов) |
| forceAttackRedirect | №0780 |
| forceCrit1 | №1236 |
| forceCritical | №0649 (+ 1 других файлов) |
| forced | №0656 (+ 2 других файлов) |
| forceDamage | №0687 (+ 1 других файлов) |
| forceDamageInside | №0780 |
| forcedAttack | №0851 |
| forcedD20 | №0851 |
| forcedDamage | №0851 |
| forcedDice | №0853 |
| forcedFailure | №0819 |
| forcedMeleeReaction | №0780 |
| forcedMoveFt | №0777 (+ 2 других файлов) |
| forcedMovementProtection | №0780 |
| forcedReactionAttack | №0780 |
| forcedSave | №0851 |
| forceOfNature | №0834 |
| forceSlot | №1247 |
| forceSurge | №0780 |
| forceTwenty | №0649 |
| forceUnarmed | №0780 |
| forearmL | №0060 |
| forearmR | №0060 |
| foresight | №0777 |
| forest | №0064 (+ 1 других файлов) |
| forge | №0064 |
| forger | №0671 (+ 1 других файлов) |
| forgery | №0673 |
| forgetAfterCast | №0780 |
| forgottenKnowledge | №0780 |
| forkedTongue | №0699 |
| form | №0062 (+ 3 других файлов) |
| formationRole | №0632 |
| formless | №0845 |
| formula | №0079 (+ 4 других файлов) |
| formulae | №0079 |
| formulas | №0079 (+ 4 других файлов) |
| fortified | №0872 |
| fortifyingDice | №0780 |
| fortunateCompany | №0780 |
| fortuneMode | №0819 |
| fortunePending | №0819 |
| fortuneRevealed | №0819 |
| fortuneTwist | №0780 |
| forward | №0067 |
| found | №0819 |
| fractureBurst | №0780 |
| frame | №0059 |
| free | №0780 (+ 4 других файлов) |
| freeAfflict | №0780 |
| freeAt17 | №0804 |
| freeAtLevel17 | №0780 |
| freeAtUnsealed | №0780 |
| freeCast | №0780 |
| freeDispelCaster | №0780 |
| freedomOfMovement | №0810 |
| freeExploits | №0780 |
| freeHandBonusAction | №0780 |
| freeHitDieChancePercent | №0780 |
| freeHoldTheLine | №0780 |
| freeInsightfulOrder | №0780 |
| freeLawShieldAndHalt | №0780 |
| freeMoveFt | №0780 |
| freePoints | №0715 |
| freePsi | №0780 |
| freePsiLost | №0780 |
| freePsiPerTurn | №0780 |
| freeSpell | №0814 |
| freeSpells | №0780 |
| freeTalent | №0780 |
| freeUse | №0780 |
| freeUses | №0845 |
| frenzy | №0649 |
| friend | №1223 (+ 3 других файлов) |
| frighten | №0814 |
| frightened | №0780 (+ 2 других файлов) |
| frightenedBy | №0819 |
| frightenedEffect | №0642 (+ 3 других файлов) |
| frightenedSaveDisadvantage | №0780 |
| frightenedUntilEndNextTurn | №0780 |
| from | №0633 (+ 25 других файлов) |
| fromFiendOrUndead | №0649 (+ 1 других файлов) |
| fromRound | №0819 |
| fromSpell | №0656 (+ 3 других файлов) |
| front | №0063 (+ 1 других файлов) |
| frontDigits | №0062 |
| FrontTexture | №1213 |
| frozen | №0642 |
| full_orc | №0673 |
| fullMaxNearestDistance | №1211 |
| fullMeanNearestDistance | №1211 |
| fullSpeedDragging | №0780 |
| fulminatingFatigue | №0780 |
| fumble | №0656 (+ 30 других файлов) |
| functionalStatus | №0803 |
| fur | №0062 |
| furAmount | №0060 (+ 3 других файлов) |
| furColor | №0067 (+ 1 других файлов) |
| furDensity | №0060 (+ 4 других файлов) |
| furH | №0062 |
| furLength | №0060 (+ 2 других файлов) |
| furParts | №0062 |
| furProfile | №0060 (+ 4 других файлов) |
| furRoots | №0062 |
| furShell | №0062 |
| furStrands | №0062 |
| furyOfForge | №0780 |
| fuseMinutes | №0079 |
| fuseRounds | №0079 (+ 1 других файлов) |
| g | №0869 |
| gainD4OnFailure | №0780 |
| gained | №0657 (+ 1 других файлов) |
| gainFerocity | №0657 (+ 1 других файлов) |
| gainRelaxationPerTurn | №0780 |
| gallantSpellcasting | №0780 |
| gameActors | №0642 |
| gameOfChance | №0780 |
| gameplay | №0849 (+ 2 других файлов) |
| gameplayEvents | №0863 (+ 1 других файлов) |
| gargantuan | №0817 (+ 1 других файлов) |
| gaseousBody | №0810 |
| gaseousReaction | №0810 |
| gateTowns | №0633 |
| gather | №0082 |
| gatherAction | №0082 |
| gathered | №0879 (+ 1 других файлов) |
| gatherIngredient | №0082 |
| gear | №0666 (+ 2 других файлов) |
| gelid | №0642 |
| Gelid | №0780 |
| gem | №0669 (+ 4 других файлов) |
| gemcutter | №0802 (+ 1 других файлов) |
| gems | №0671 |
| gender | №0061 (+ 18 других файлов) |
| genderMorphs | №0067 |
| general | №0802 (+ 1 других файлов) |
| generate | №0807 (+ 3 других файлов) |
| genie | №0642 |
| geometryBuilds | №0064 |
| geometryState | №0063 |
| geometryUploads | №0064 |
| get | №0659 (+ 5 других файлов) |
| getAC | №0840 |
| getAllBackgrounds | №1337 |
| getAllRaces | №1337 |
| getAttribute | №1282 |
| getAvailableRecipes | №0671 |
| getBiomassFromCorpse | №0840 |
| getBody | №0817 |
| getBodyState | №0067 |
| getCharismaModifier | №0802 |
| getClass | №0662 |
| getClassSummary | №0870 |
| getCreature | №0629 (+ 12 других файлов) |
| getCurrent | №0643 (+ 2 других файлов) |
| getCurse | №0078 |
| getDC | №0830 |
| getDevourDamage | №0840 |
| getDevourDC | №0840 |
| getDialect | №0829 |
| getDie | №0830 |
| getDiscipline | №0830 |
| getDominantAbilityNames | №0870 |
| getDurability | №0668 (+ 1 других файлов) |
| getElementById | №1157 (+ 37 других файлов) |
| getExhaustion | №0826 (+ 1 других файлов) |
| getFeature | №0662 |
| getInscribedRunes | №0829 |
| getItem | №1159 (+ 20 других файлов) |
| getItemQuality | №0668 |
| getLanguages | №0829 |
| getLarva | №0817 |
| getLibraryManifest | №0072 |
| getLockedRecipes | №0671 |
| getMap | №0071 |
| getMaxCharacteristics | №0870 |
| getMaxPreparedSpellsLimit | №0837 |
| getMetamorphoses | №0078 |
| getMorphWeights | №0067 |
| getMutationSlots | №0840 |
| getNativeStorageStats | №0843 |
| getObject | №0072 |
| getPath | №1193 (+ 1 других файлов) |
| getPeer | №1242 (+ 7 других файлов) |
| getPersuasionModifier | №0802 |
| getProfession | №0671 |
| getProfile | №0671 (+ 1 других файлов) |
| getPursuit | №0830 |
| getRace | №0067 |
| getReactions | №0830 |
| getRenderDescriptor | №0067 |
| getRunesKnown | №0829 |
| getRunicDC | №0829 |
| getSaveBonus | №0828 (+ 13 других файлов) |
| getSaveDC | №0078 |
| getSkillBonus | №0828 |
| getSource | №0799 |
| getSpecialization | №0671 |
| getSpellInfo | №0799 |
| getSpellsKnown | №0078 |
| getSpellSlots | №0078 |
| getState | №0064 (+ 1 других файлов) |
| getStats | №0828 |
| getSubclass | №0649 |
| getSummary | №0785 |
| getSymbiosisTier | №0817 |
| getToken | №0831 |
| getTrader | №0800 |
| getVersion | №1193 (+ 1 других файлов) |
| getView | №1299 |
| getZone | №0072 |
| ghost | №0064 |
| ghostChainSize | №0067 (+ 2 других файлов) |
| ghostOnKill | №0810 |
| ghostOpacity | №0067 (+ 2 других файлов) |
| ghostTerror | №0067 (+ 2 других файлов) |
| ghostWeapon | №0064 (+ 3 других файлов) |
| ghukliak | №0780 (+ 1 других файлов) |
| giant | №0632 |
| Gifted | №0796 |
| giftedStrategist | №0780 |
| GITHUB_REPOSITORY | №1156 |
| GITHUB_RUN_ID | №1156 |
| GITHUB_SERVER_URL | №1156 |
| gl | №0074 (+ 4 других файлов) |
| glancingBlow | №0780 |
| glareParalyzeOnFailBy5 | №0780 |
| glass | №0668 (+ 6 других файлов) |
| glassBatch | №0674 |
| glassblower | №0671 (+ 3 других файлов) |
| glasswork | №0669 (+ 2 других файлов) |
| glaze | №0673 (+ 1 других файлов) |
| glazedVessel | №0673 |
| glb | №1209 |
| glbBBox | №1206 (+ 1 других файлов) |
| glbTriangles | №1206 (+ 2 других файлов) |
| glbVertices | №1197 (+ 4 других файлов) |
| gliderMembraneSize | №0067 (+ 1 других файлов) |
| global | №1306 (+ 5 других файлов) |
| globalThis | №1320 (+ 4 других файлов) |
| gloves | №0063 |
| glow | №0067 |
| gltf | №0070 (+ 2 других файлов) |
| gnoll | №0775 |
| gnome_forest | №0673 |
| gnome_rock | №0673 |
| goblin | №0673 |
| goblinDiscourse | №0780 |
| goblinoid | №0775 |
| goblinStance | №0780 |
| gold | №0833 (+ 3 других файлов) |
| goldBillet | №0674 |
| goldenSlumbers | №0780 |
| goldPer10 | №0666 |
| goldReceived | №0819 |
| goldSpent | №0819 |
| good | №0665 (+ 1 других файлов) |
| goodPct | №1211 |
| gooSize | №0067 (+ 1 других файлов) |
| gp | №0791 (+ 10 других файлов) |
| graftAction | №1158 |
| graftName | №1158 |
| grafts | №0079 (+ 1 других файлов) |
| grain | №0673 (+ 1 других файлов) |
| GRAND_HEXES | №0780 |
| grandHex | №0777 (+ 1 других файлов) |
| grandRevolutionary | №0780 |
| grantActionNextStart | №0819 |
| grantAdvantage | №0780 |
| grantIngredient | №0082 |
| grantsAdvantage | №0828 |
| grantTemporaryHitPoints | №0656 |
| grantUndyingToAlly | №0780 |
| grapple | №0777 |
| grappleBonus | №0780 |
| grappleMastery | №0777 |
| grappleSizePlus | №0780 |
| grappleTarget | №0777 |
| gravity | №0819 |
| gravityResisted | №0819 |
| grayColor | №0067 (+ 1 других файлов) |
| grayPercent | №1177 (+ 1 других файлов) |
| great_weapon_master | №0783 |
| greaterDivineIntervention | №0649 |
| greatOldOne | №0642 |
| Green | №0777 (+ 1 других файлов) |
| greenwood | №0879 |
| greenwood_clearing | №0879 |
| greenwood_heart | №0879 |
| greenwood_stream | №0879 |
| grid | №0062 (+ 1 других файлов) |
| grimPsychometry | №0642 |
| grip | №0064 |
| ground | №0062 |
| group | №0062 |
| groupKey | №0875 (+ 3 других файлов) |
| groups | №0656 (+ 7 других файлов) |
| guaranteed | №0629 (+ 14 других файлов) |
| guardCraft | №0667 |
| guardDC | №0819 |
| Guardian | №0796 |
| guardianRangeFt | №0780 |
| guardians | №1268 |
| guardianTactic | №0780 |
| guardianTactics | №0736 |
| guardRepair | №0667 |
| guest | №0654 |
| guidedStrike | №0649 |
| guild | №0664 |
| gumArabic | №0674 |
| h | №0062 (+ 9 других файлов) |
| H | №0059 (+ 1 других файлов) |
| habitat | №0064 |
| habitats | №0629 (+ 13 других файлов) |
| hadMaterial | №0819 |
| hadozee | №1372 |
| haggle | №0802 |
| hair | №0060 (+ 15 других файлов) |
| hairColor | №0067 (+ 3 других файлов) |
| hairParts | №0060 |
| hairRibbonBudget | №0060 |
| half | №0067 (+ 1 других файлов) |
| half_up | №0062 (+ 1 других файлов) |
| halfCover | №0780 |
| halfCoverWhileGrappling | №0780 |
| halfDamageEffect | №0656 (+ 4 других файлов) |
| halfOnSave | №0780 (+ 2 других файлов) |
| halfProficiencySkills | №0780 |
| halfSpeed | №0780 |
| Hallucination | №0081 |
| halt | №0780 |
| haltRestrains | №0780 |
| halveDamage | №0780 |
| halveNecroticReaction | №0642 |
| hand | №0062 (+ 1 других файлов) |
| handL | №0060 |
| handlebar | №0067 |
| handled | №0069 |
| handOfDread | №0717 |
| handoffNeedsSignaling | №0811 |
| handoffPending | №0811 |
| handR | №0060 |
| hands | №0062 (+ 9 других файлов) |
| hardenedSoul | №0642 |
| hardwood | №0668 (+ 4 других файлов) |
| harmonic | №0829 |
| harmonicAttunement | №0780 |
| harvest | №0629 (+ 19 других файлов) |
| harvestMaterial | №1268 |
| has | №0783 |
| has_joints_and_weights | №1200 |
| has_morph_targets | №1200 |
| hasAsi | №0701 (+ 2 других файлов) |
| hasCharacter | №0866 |
| hasDamage | №0812 (+ 1 других файлов) |
| hasInventoryEffects | №0819 |
| hasPreparation | №0837 |
| hasProfession | №0082 |
| haste | №0079 |
| hasToolProficiency | №0809 |
| hatOfDisguise | №0780 |
| have | №0665 (+ 3 других файлов) |
| haveGold | №0666 |
| haveMaterials | №0666 |
| haymaker | №0717 (+ 1 других файлов) |
| head | №0060 (+ 12 других файлов) |
| HEAD_AXES | №0067 |
| HEAD_FORMS | №0067 |
| HEAD_STYLES | №0067 |
| headAccessories | №0062 |
| headAccessory | №0059 (+ 2 других файлов) |
| headBuilds | №0064 |
| headDefaults | №0067 |
| headers | №0654 (+ 1 других файлов) |
| headFrame | №0062 |
| headless | №1351 (+ 37 других файлов) |
| heal | №0642 (+ 4 других файлов) |
| healAfterNecrotic | №0810 |
| healAfterRest | №0810 |
| healAmount | №1158 |
| healBatch | №0656 |
| healBody | №0870 |
| healCompanion | №0687 |
| healed | №0785 (+ 2 других файлов) |
| healHalfMaxHp | №0780 |
| healHitDie | №0777 |
| healHP | №0780 |
| healing | №0079 (+ 6 других файлов) |
| healingAllowed | №0870 |
| healingAmount | №0819 |
| healingBlocked | №0785 |
| healingBonus | №0780 (+ 1 других файлов) |
| healingBoost | №0814 |
| healingCount | №0819 |
| healingGrantsACBonus | №0780 |
| healingPotion | №0814 |
| healingPotionOnLongRest | №0814 |
| healingSpell | №0819 (+ 2 других файлов) |
| healingSpellsCannotHealSelf | №0810 |
| healMod | №0642 |
| healModifier | №0777 |
| healOnCharnelKill | №0810 |
| healOnKill | №0642 |
| healOrDamage | №0814 |
| healPer5Charnel | №0810 |
| healPool | №0780 |
| healRoll | №1158 |
| healSelf | №0780 |
| healShell | №0785 |
| healthCheck | №0854 |
| healWithHitDice | №0780 |
| heart | №0064 (+ 1 других файлов) |
| hearth | №0068 |
| heartPhylactery | №0780 |
| heavyArmor | №0780 |
| heelstomper | №0780 |
| height | №0064 (+ 50 других файлов) |
| heightened | №0649 |
| heightenedSenses | №0642 |
| hellhound | №0687 |
| hellspeaker | №0780 |
| hellspeakerHoneySweetBlades | №0780 |
| hellspeakerTurncoat | №0780 |
| hemMod | №0642 |
| hemocraftAbilities | №0689 |
| hemocraftDie | №0689 |
| hemocraftRerollOncePerTurn | №0642 |
| Hemorrhage | №0081 |
| hemp | №0674 |
| herb | №0669 (+ 2 других файлов) |
| herbalism | №0673 (+ 1 других файлов) |
| herbalist | №0671 (+ 4 других файлов) |
| herbs | №0826 (+ 1 других файлов) |
| herculean | №0717 (+ 1 других файлов) |
| hero | №1217 |
| heroicCharge | №0780 |
| heroicFocus | №0780 |
| heroicFortitude | №0780 |
| heroicOrderExploit | №0780 |
| heroicRush | №0777 |
| hex | №0869 (+ 2 других файлов) |
| hexArmor | №0780 |
| hexAura | №0780 |
| hexblade | №0642 |
| HEXES | №0780 |
| hexesAtWill | №0777 |
| hexmaster | №0780 |
| hexPhalanx | №0780 |
| hexPlate | №0780 |
| hexSaveDisadvantage | №0780 |
| hexShield | №0780 |
| hi | №0062 |
| hidden | №1386 |
| hide | №0668 (+ 1 других файлов) |
| hideBonusAction | №0780 |
| hideInDimDark | №0780 |
| hideInPlainSight | №0649 |
| Hideous | №0780 |
| high | №0060 (+ 1 других файлов) |
| high_ponytail | №0062 (+ 1 других файлов) |
| highAuthority | №0780 |
| highest | №1203 |
| highestId | №0819 |
| highGround | №0819 |
| highJumpBonusFt | №0780 |
| highlands | №0800 (+ 1 других файлов) |
| highlands_mine | №0879 |
| highlands_quarry | №0879 |
| highlands_ridge | №0879 |
| highlightColor | №0067 (+ 2 других файлов) |
| highlightPercent | №1177 (+ 2 других файлов) |
| hills | №0064 |
| hips | №0064 (+ 5 других файлов) |
| history | №0081 (+ 8 других файлов) |
| historyAdvantage | №0780 |
| historyAdvantageOnSinisterObjectOrPlace | №0642 |
| hit | №0656 (+ 9 других файлов) |
| hitCount | №0656 (+ 3 других файлов) |
| hitDice | №0625 (+ 2 других файлов) |
| hitDiceMax | №1238 |
| hitDiceRemaining | №0079 (+ 2 других файлов) |
| hitDiceRestored | №0804 |
| hitDiceSpent | №0079 (+ 4 других файлов) |
| hitDiceUsed | №0787 (+ 1 других файлов) |
| hitDie | №0625 (+ 53 других файлов) |
| hitInfo | №0074 |
| hitPoints | №0780 (+ 2 других файлов) |
| hitPointsAfter | №0804 (+ 1 других файлов) |
| hits | №0780 |
| hitTest | №0073 (+ 1 других файлов) |
| hitTokenId | №0821 |
| hitZone | №0073 |
| hive | №0064 |
| hm08BBox | №1206 (+ 1 других файлов) |
| hm08Triangles | №1206 (+ 1 других файлов) |
| hm08Vertices | №1206 (+ 3 других файлов) |
| hoard | №0807 |
| hobgoblin | №0673 |
| holdBreathIndefinite | №0780 |
| holdTheLine | №0780 |
| Hollow | №0780 |
| holy | №0079 |
| holyBomb | №0780 |
| holyMagic | №0777 |
| holyNexus | №0649 |
| homebrew | №0661 (+ 1 других файлов) |
| honey | №0674 |
| honorDuel | №0780 |
| hoofColor | №0067 (+ 1 других файлов) |
| hoofSize | №0064 (+ 3 других файлов) |
| hooks | №0078 (+ 19 других файлов) |
| hope | №0777 |
| horde | №0064 (+ 5 других файлов) |
| hordeCount | №0067 |
| horn | №0827 |
| HORN_STYLES | №0067 |
| hornColor | №0067 (+ 1 других файлов) |
| hornRidges | №1186 (+ 1 других файлов) |
| hornSize | №0067 (+ 3 других файлов) |
| hornStyle | №0064 (+ 5 других файлов) |
| hornThickness | №1186 (+ 1 других файлов) |
| horror | №0630 |
| horrorEligible | №0630 |
| horseColor | №0067 (+ 1 других файлов) |
| hosiery | №0063 |
| hosieryDen | №1170 |
| host | №0644 (+ 1 других файлов) |
| hostDestroyed | №0817 |
| hostileAction | №0819 |
| hostileBane | №0780 |
| hostilesWithin5 | №1246 |
| hostIsSeparateStatBlock | №0817 |
| hostSurvived | №0817 |
| houndReactionAttack | №0780 |
| howl | №0642 (+ 1 других файлов) |
| hp | №0787 (+ 77 других файлов) |
| hpBonus | №0780 |
| hpBonusPerLevel | №0825 |
| hpCost | №0804 (+ 1 других файлов) |
| hpCostBySlot | №0804 |
| hpCurrent | №0625 (+ 19 других файлов) |
| hpDamage | №0656 (+ 6 других файлов) |
| hpDamageBySlot | №0804 |
| hpFraction | №0777 |
| hpMax | №0625 (+ 13 других файлов) |
| hpMaxBonus | №0687 |
| hpPer100gp | №0780 |
| hpPercent | №1268 |
| hpTemp | №0625 (+ 6 других файлов) |
| href | №1282 |
| huge | №0817 (+ 1 других файлов) |
| humanoid | №0629 (+ 13 других файлов) |
| humanoidTorch | №0780 |
| hunter | №0687 (+ 2 других файлов) |
| hunterCompanion | №0777 |
| huntersBane | №0642 |
| huntersMark | №0649 (+ 1 других файлов) |
| huntersPrey | №0649 (+ 1 других файлов) |
| hurlThroughHell | №0812 |
| hybrid | №0780 |
| hybridAttackAdvantageVsBranded | №0780 |
| hybridRegeneration | №0780 |
| hybridTransformation | №0642 |
| hybridTransformationMastery | №0642 |
| hyena | №0775 |
| i | №0812 |
| ibex | №0067 |
| icon | №0672 (+ 3 других файлов) |
| iconId | №0789 (+ 1 других файлов) |
| id | №0062 (+ 200 других файлов) |
| idempotent | №0866 |
| identifyEffect | №0780 |
| identity | №1970 |
| identityDistortion | №0630 |
| ids | №0059 (+ 2 других файлов) |
| idx | №0074 |
| ifReducedToZero | №0780 |
| ifStolenSpark | №0780 |
| ignitingTouch | №0780 |
| ignoreCover | №0079 (+ 1 других файлов) |
| ignored | №0649 |
| ignoreExtremeTemperature | №0780 |
| ignoreHalfCover | №0780 |
| ignoreHalfDamageOnSave | №0780 |
| ignoreImmunity | №0642 (+ 2 других файлов) |
| ignoreInvisibility | №0819 |
| ignoreOneMutagenSideEffect | №0780 |
| ignoreOpportunityAttacksWhileFlying | №0810 |
| ignorePhysicalResistance | №0819 |
| ignoreRequirements | №1251 |
| ignoreResistance | №0079 (+ 6 других файлов) |
| ignoresImmunity | №0804 |
| ignoreSomaticInDimDark | №0780 |
| ignoresResistance | №0804 (+ 1 других файлов) |
| ignoreVerbalInDimDark | №0780 |
| illuminationAt | №0072 |
| illusion | №0819 (+ 1 других файлов) |
| illusoryDuplicate | №0780 |
| illustriousAdmiral | №0780 |
| imitation | №0079 (+ 1 других файлов) |
| immortality | №0780 |
| immortalityAnchor | №0810 |
| immune | №0642 (+ 5 других файлов) |
| immuneAging | №0780 |
| immuneAll | №0819 |
| immuneCondition | №0819 |
| immuneConditions | №0819 (+ 1 других файлов) |
| immuneFrightened | №0649 (+ 1 других файлов) |
| immuneIfBlindedImmune | №0642 |
| immuneNaturalDeath | №0814 |
| immuneSuppression | №0780 |
| immuneSurprise | №0780 |
| immuneToOwnerBombs | №0079 |
| immuneWhenRampageAtLeast | №0780 |
| immunities | №0656 (+ 13 других файлов) |
| immunity | №0642 (+ 3 других файлов) |
| immunity24hOnSave | №0780 |
| immunityBecomesResistance | №0079 (+ 3 других файлов) |
| immunityChosen | №0780 |
| impact | №0079 |
| impactBomb | №0780 |
| impermeable | №0642 |
| Impermeable | №0780 |
| implemented | №0780 |
| importJSON | №0857 |
| importLocal | №0654 |
| importText | №0861 (+ 1 других файлов) |
| imposeDisadvantage | №0780 |
| imposingPresence | №0780 |
| improvedAt11 | №0804 |
| improvedBombs | №0678 |
| improvedDivineSmite | №0649 |
| improvedFamiliar | №0780 |
| improvedResolve | №0736 |
| improvedThralls | №0810 |
| inactiveAfterInvoke | №0829 |
| inAttackAction | №1249 |
| incendiary | №0079 |
| incendiaryBomb | №0780 |
| inciteViolence | №0780 |
| incoming | №0819 |
| incomingAC | №0642 (+ 1 других файлов) |
| incomingAttackModifiers | №0872 |
| incomingDamage | №1238 |
| incomingDisadvantage | №0819 |
| incomparableIntellect | №0830 |
| index | №0794 (+ 8 других файлов) |
| indexType | №0074 |
| indices | №0059 (+ 8 других файлов) |
| individualCount | №0067 |
| individuals | №0062 |
| indomitable | №0649 (+ 1 других файлов) |
| indomitableMight | №0649 |
| infernal | №0687 |
| infernalConduit | №0699 |
| infernalConduitDice | №0699 |
| infernalMajesty | №0699 |
| inferno | №0064 |
| influenceSlots | №0633 |
| informant | №0780 |
| infuseItem | №0649 |
| ingredient | №0081 (+ 1 других файлов) |
| INGREDIENT_SOURCES | №0082 |
| ingredientCategory | №0082 |
| ingredientId | №0082 |
| ingredientName | №0082 |
| ingredients | №0080 (+ 3 других файлов) |
| inheritsOrigin | №0067 |
| init | №0661 |
| initCreatedCharacter | №0671 |
| initialize | №0822 |
| initiative | №0629 (+ 23 других файлов) |
| initiativeBonus | №0777 (+ 2 других файлов) |
| initiativeDash | №0780 |
| initiativeDisadvantage | №0642 (+ 1 других файлов) |
| initiativeExploit | №0780 |
| initiativeFerocity | №0687 |
| initiativeOrPerception | №0780 |
| initiativeReagentsTo | №0780 |
| initiativeRoll | №1249 |
| initiativeSave | №0780 |
| initiativeTempHp | №0780 |
| initiativeTracker | №0861 (+ 21 других файлов) |
| ink | №0669 (+ 2 других файлов) |
| innatePsionics | №0715 |
| inner | №0059 |
| innerHeight | №1282 |
| innerHTML | №1184 (+ 2 других файлов) |
| innerWidth | №1282 |
| inscribe | №0780 |
| inscribedCount | №0780 |
| inscribedGearProficiency | №0780 |
| inscribedRunes | №0829 |
| inscription | №0829 |
| inscrutableMind | №0780 |
| insectoid | №0775 |
| insidiousImprecation | №0780 |
| insidiousSpell | №0780 |
| insight | №0773 (+ 1 других файлов) |
| insightAbility | №0780 |
| insightBonus | №0780 |
| insightfulOrder | №0780 |
| insightTotal | №0079 (+ 1 других файлов) |
| inspect | №0822 (+ 1 других файлов) |
| inspector | №0071 |
| inspectSource | №0854 |
| inspirationalSpeech | №0780 |
| inspirationOnKill | №0819 |
| inspiring_leader | №0783 |
| inspiringShout | №0780 |
| inspiringWord | №0740 |
| inspiringWordMaxHeal | №0777 (+ 1 других файлов) |
| inspiringWordUses | №0740 |
| install | №0069 |
| installed | №0079 (+ 1 других файлов) |
| installedAtLevel | №0079 |
| instant | №0079 |
| instantDeath | №0656 (+ 1 других файлов) |
| instinctualSuppression | №0780 |
| instruments | №0780 |
| int | №0625 (+ 52 других файлов) |
| intBonus | №0642 |
| intChecksAdvantage | №0642 (+ 1 других файлов) |
| intChecksDisadvantage | №0642 (+ 1 других файлов) |
| intellectDie | №0830 |
| intelligence | №0787 (+ 12 других файлов) |
| intelligenceOrWisdomOrCharisma | №0078 (+ 1 других файлов) |
| intelligentExplosion | №0079 |
| intelligentExplosions | №0678 |
| intensity | №0071 (+ 2 других файлов) |
| inter | №0833 |
| interceptAttack | №0819 |
| interceptHealing | №0819 |
| interceptInitiative | №0819 |
| interceptSave | №0819 |
| interdict | №0872 |
| interdictBoons | №0699 |
| interdiction | №0699 |
| interpolation | №0069 |
| interrupt | №0736 |
| interrupted | №0656 (+ 1 других файлов) |
| interruptedId | №0819 |
| interruptOneAttackOrAbility | №0780 |
| interruptUses | №0736 |
| intimidatingCommand | №0780 |
| intimidation | №0773 (+ 1 других файлов) |
| intimidationAdvantage | №0780 |
| intimidationPersuasionBonus | №0780 |
| intIncrease | №0780 |
| intMaxBonus | №0642 |
| intMaxIncrease | №0780 |
| intToAC | №0810 |
| intuition | №0829 |
| intWisChaSavesDisadvantage | №0642 |
| invadeHost | №0817 |
| inventory | №0787 (+ 20 других файлов) |
| inventoryEntries | №0819 |
| inventoryRef | №0794 (+ 4 других файлов) |
| inverseBindMatrices | №0069 (+ 1 других файлов) |
| investigation | №0773 (+ 1 других файлов) |
| investigationExpertise | №0777 |
| investigator | №0830 |
| invHeaderAC | №1226 |
| invigoratingOrders | №0780 |
| Invisibility | №0081 |
| invisibilityAfterCharnel | №0810 |
| invisible | №0687 (+ 2 других файлов) |
| invocation | №0829 |
| invocationSlots | №0780 |
| invoke | №0662 (+ 1 других файлов) |
| invokeCount | №0780 |
| invokeDebuff | №0780 |
| invokeHell | №0699 |
| invoking | №0829 |
| iokharic | №0780 (+ 1 других файлов) |
| iridescentStrike | №0845 |
| iron | №0669 (+ 2 других файлов) |
| Ironbound | №0796 |
| ironChin | №0717 |
| ironCommand | №0780 |
| ironIngot | №0674 |
| isActive | №0783 |
| isAlly | №1158 |
| isAssassin | №0649 |
| isBomb | №0079 (+ 3 других файлов) |
| isDead | №0647 |
| isEnabled | №0662 (+ 1 других файлов) |
| isExtra | №0647 (+ 9 других файлов) |
| isExtraClass | №0647 |
| isIndependentCreature | №0840 |
| isLarval | №0062 |
| isMagical | №1237 |
| isObject | №1157 |
| isRaceClassHybrid | №0650 (+ 6 других файлов) |
| isShirt | №0063 |
| isSkirtDress | №0063 |
| isSolid | №0072 |
| issues | №0673 |
| isSwarm | №0062 |
| item | №0063 (+ 18 других файлов) |
| itemId | №0814 |
| items | №0063 (+ 7 других файлов) |
| itemValue | №0668 (+ 1 других файлов) |
| itsAlive | №0780 |
| ix | №0062 |
| j | №0059 |
| jacket | №0063 |
| jackOfAllTrades | №0649 |
| jade | №0833 |
| jar | №0068 |
| jaw | №0062 |
| jawProjection | №0067 |
| jawWidth | №0064 (+ 2 других файлов) |
| jealousy | №0078 |
| jeweler | №0669 (+ 5 других файлов) |
| jinx | №1248 |
| jinxBonusAction | №0780 |
| jinxExtraDamage | №0780 |
| jinxOptions | №0780 |
| joinRoom | №1296 |
| joints | №0059 (+ 4 других файлов) |
| jotun | №0780 (+ 1 других файлов) |
| jotunbrudJuggernaut | №0780 |
| jotunStance | №0780 |
| journal | №0853 |
| json | №0654 (+ 5 других файлов) |
| jumpDistanceMultiplier | №0777 |
| jumpFt | №0780 |
| jumpMultiplier | №0780 |
| jungle | №0064 |
| junk | №0794 (+ 38 других файлов) |
| justDroppedToZero | №1243 |
| K | №1205 |
| keenAwareness | №0830 |
| keeperOfOrder | №0780 |
| key | №0072 (+ 13 других файлов) |
| KEY | №0072 |
| ki | №1235 (+ 2 других файлов) |
| killInspiration | №0819 |
| kiln | №0671 |
| kind | №0062 (+ 36 других файлов) |
| Kind | №1213 |
| kingdom | №0064 |
| kiPoints | №0704 |
| kitchen | №0068 |
| knighthood | №0780 |
| knockdown | №0777 |
| knockout | №0777 |
| knockoutIfSelfDamageReachesZero | №0780 |
| knockoutRoll | №0780 |
| knockProne | №0780 |
| knockProneSmaller | №0780 |
| knot | №0063 (+ 3 других файлов) |
| known | №0787 (+ 3 других файлов) |
| knownAt | №0699 |
| knownAtLevel | №0078 |
| knownCantrips | №0079 |
| knownClasses | №0837 |
| knownCount | №0780 |
| knownMetamorphoses | №0780 |
| knownReactions | №0081 |
| knowYourEnemy | №0780 |
| kobold | №0062 (+ 1 других файлов) |
| krd | №0796 |
| krynn | №0632 |
| label | №0833 (+ 22 других файлов) |
| laboratory | №0064 |
| labyrinth | №0064 |
| lace | №0063 |
| lairActions | №1331 |
| lairActionState | №0812 |
| lamp | №0068 |
| lampblack | №0674 |
| landscape | №0888 |
| landsStrideRanger | №0649 |
| language | №0780 (+ 1 других файлов) |
| languageChoice | №0780 |
| languages | №0625 (+ 4 других файлов) |
| lantern | №0068 |
| large | №0068 (+ 2 других файлов) |
| larva | №0817 |
| larvaGirth | №0067 (+ 2 других файлов) |
| larvaIsSeparateStatBlock | №0817 |
| larval | №0062 |
| larvaLength | №0067 (+ 2 других файлов) |
| larvalParts | №0062 |
| larvaTendrilSize | №0067 (+ 2 других файлов) |
| larvaToothSize | №0067 (+ 2 других файлов) |
| last | №0062 (+ 1 других файлов) |
| lastAttemptRound | №0806 |
| lastGatheredAt | №0879 |
| lastLifesMemories | №0780 |
| lastRest | №1318 |
| lastRestId | №0822 |
| lastRestock | №0800 (+ 1 других файлов) |
| lastRestoredKey | №0866 |
| lastRoll | №0806 |
| lastRound | №0806 |
| lastRun | №0855 |
| lastStandActive | №0819 |
| lastStandFinished | №0819 |
| lastStandReady | №0819 |
| lastTrump | №0822 |
| lastTrumpAvailable | №0822 |
| lastTrumpUsed | №0822 (+ 1 других файлов) |
| lastX | №0627 (+ 1 других файлов) |
| lastY | №0627 (+ 1 других файлов) |
| latency | №0853 |
| latitude | №0062 |
| laughingGas | №0079 |
| laughingGasBomb | №0780 |
| launch | №0862 |
| lawShield | №0777 |
| lawsShield | №0780 |
| layer | №0063 |
| layered | №0062 (+ 1 других файлов) |
| layers | №0062 |
| layOnHands | №0649 (+ 1 других файлов) |
| leadershipAbility | №0740 (+ 1 других файлов) |
| leadershipBased | №0780 |
| leadershipChoices | №0740 |
| leadershipForCheck | №0780 |
| leadershipForChecks | №0780 |
| leadershipForDeception | №0780 |
| leadershipForHistoryInvestigation | №0780 |
| leadershipForIntimidation | №0780 |
| leadershipForReligion | №0780 |
| leadershipModifier | №0740 |
| leadershipStyles | №0740 |
| leadTheCharge | №0780 |
| leaks | №1366 (+ 2 других файлов) |
| learnAnyCastableSpell | №0780 |
| learnBeastShape | №0780 |
| learnCantrip | №0780 |
| learned | №0879 |
| learnedAt | №0671 |
| learnFromUI | №0671 |
| learning | №0834 |
| learnLanguage | №0780 |
| learnMartialWeapon | №0780 |
| learnProfession | №0671 |
| learnSkill | №0780 |
| learnSpell | №0780 |
| learnTargetStatistic | №0780 |
| learnTool | №0780 |
| leather | №0063 (+ 7 других файлов) |
| leatherSole | №0673 |
| leatherStrapV49 | №0668 |
| leatherwork | №0669 (+ 1 других файлов) |
| leatherworker | №0670 (+ 4 других файлов) |
| leavingReach | №0820 (+ 2 других файлов) |
| lectern | №0068 |
| left | №0064 (+ 2 других файлов) |
| leg | №0062 |
| legacy_expansions | №0629 |
| legendary | №0794 (+ 6 других файлов) |
| legendaryActionCurrent | №0812 |
| legendaryActions | №0806 (+ 1 других файлов) |
| legendaryResistance | №0736 |
| legendaryResistanceCurrent | №0812 |
| legendaryResistances | №0806 (+ 1 других файлов) |
| legendaryTandem | №0780 |
| legLength | №0064 (+ 1 других файлов) |
| legs | №0064 (+ 2 других файлов) |
| length | №0060 (+ 19 других файлов) |
| level | №0781 (+ 82 других файлов) |
| level10 | №0078 |
| level18 | №0078 |
| level2 | №0078 |
| level20 | №0829 |
| level6 | №0078 |
| level9 | №0829 |
| levelData | №0701 |
| leveledUp | №0671 |
| levelName | №0671 |
| levels | №0078 (+ 46 других файлов) |
| LEVELS | №0671 |
| levelsRestored | №0649 |
| library | №0072 (+ 2 других файлов) |
| license | №0072 (+ 11 других файлов) |
| lichdom | №0810 |
| lieDetectionAutoFail | №0780 |
| lighting | №0072 |
| lightIntensity | №1213 |
| lightning | №0079 (+ 3 других файлов) |
| lightningArc | №0810 |
| lightningBomb | №0780 |
| lightRadius | №1213 |
| limb | №0062 |
| limbH | №0062 |
| limbIndices | №0062 |
| limbParts | №0062 |
| limbProfile | №0062 (+ 4 других файлов) |
| limbRecords | №0062 |
| limbState | №0062 |
| limestone | №0674 |
| limit | №0837 |
| limitations | №1346 (+ 1 других файлов) |
| line | №0852 |
| linen | №0063 |
| lineOfSight | №1305 (+ 2 других файлов) |
| lingerie | №0063 |
| link | №0777 |
| linked | №0777 |
| linkedClass | №0659 (+ 1 других файлов) |
| linkedHowl | №0642 |
| lipColor | №0067 (+ 1 других файлов) |
| lipOpacity | №1360 |
| lipVolume | №0067 |
| list | №0061 (+ 7 других файлов) |
| listAllClasses | №0662 |
| listByFamily | №0629 (+ 12 других файлов) |
| listBySource | №0629 (+ 12 других файлов) |
| listClasses | №0662 |
| listEquipment | №0067 |
| listPresets | №0067 |
| listRaces | №0067 |
| listSkins | №0067 |
| listSources | №0082 |
| listSubclasses | №0662 |
| liveBodyAfterReanimation | №0870 |
| liveEpoch | №0866 |
| liveRevision | №0866 |
| living | №0784 |
| livingStatue | №0780 |
| lizard | №0062 |
| lizardfolk | №0673 |
| lo | №0062 |
| load | №0070 (+ 4 других файлов) |
| loaded | №0074 |
| loadFailed | №1363 |
| loading | №0074 (+ 1 других файлов) |
| loadSkin | №0069 |
| local | №0059 (+ 1 других файлов) |
| localBackups | №0654 |
| localId | №0654 |
| localStorage | №1159 (+ 33 других файлов) |
| location | №1199 (+ 3 других файлов) |
| locked | №0075 |
| lockedAt1 | №0670 |
| locks | №0671 |
| log | №0849 |
| login | №0654 |
| logout | №0654 |
| long | №0062 (+ 1 других файлов) |
| longevity | №0079 (+ 1 других файлов) |
| longJumpBonusFt | №0780 |
| longRest | №0079 (+ 1 других файлов) |
| longRestAllHitDice | №0780 |
| longRestClears | №0079 |
| longRestEffects | №0819 |
| longRestExhaustionRecovery | №0780 |
| longRestHealingAllowed | №0870 |
| longRestLimit | №0642 |
| longRestOnRevive | №0780 |
| longRestRedistribute | №0780 |
| longRestTempHp | №0780 |
| longRestUses | №0079 |
| loom | №0068 |
| loot | №0071 (+ 19 других файлов) |
| lootId | №0075 |
| lootModel | №0807 |
| lootModels | №0807 |
| loreRecall | №0780 |
| los | №0657 (+ 1 других файлов) |
| loss | №0853 |
| lossHp | №0642 |
| lost | №0667 |
| Loveless | №0780 |
| low | №0060 |
| lowBlow | №0780 |
| lowest | №0059 (+ 1 других файлов) |
| lowestId | №0819 |
| loxodon | №1380 |
| lucidDreaming | №0780 |
| lucidWaking | №0780 |
| lucky | №0783 |
| lunge | №0780 |
| luxury | №0802 (+ 1 других файлов) |
| lycanthropy | №0078 |
| lyre | №0067 |
| M | №0819 |
| macroConfigSha256 | №1397 |
| macrotargets | №1203 |
| mage_slayer | №0783 |
| mageArmor | №0814 |
| mageArmorAC | №0819 |
| mageBerryCount | №0820 (+ 2 других файлов) |
| mageD20Bonus | №0819 |
| mageDamageType | №0820 (+ 1 других файлов) |
| mageEquipmentChanged | №0819 |
| mageGround | №0820 (+ 1 других файлов) |
| mageInfo | №0819 |
| mageOptions | №0819 |
| mageProgress | №0819 |
| mageSpellId | №0820 (+ 2 других файлов) |
| mageStat | №0820 (+ 1 других файлов) |
| mageTargetIds | №0820 (+ 2 других файлов) |
| mageWilling | №0820 (+ 2 других файлов) |
| magFilter | №0064 (+ 1 других файлов) |
| magic | №0845 (+ 2 других файлов) |
| Magic | №0081 |
| magic_initiate | №0783 |
| magicAdvantage | №0810 |
| magical | №0780 (+ 1 других файлов) |
| magical_beast | №0629 (+ 10 других файлов) |
| magicalAttack | №0642 (+ 4 других файлов) |
| magicalDarkness | №0780 |
| magicalFamiliarAttacks | №0780 |
| magicalSecrets | №0649 |
| magicalTinkering | №0649 |
| magicByAffinity | №0845 |
| magicInteractionSafe | №0780 |
| magicItemAdept | №0649 |
| magicShared | №0845 |
| maintainable | №0780 |
| maintainAction | №0780 |
| majestySplash | №0780 |
| major | №0822 |
| major_00 | №0822 |
| major_01 | №0822 |
| major_02 | №0822 |
| major_03 | №0822 |
| major_04 | №0822 |
| major_05 | №0822 |
| major_06 | №0822 |
| major_07 | №0822 |
| major_08 | №0822 |
| major_09 | №0822 |
| major_10 | №0822 |
| major_11 | №0822 |
| major_12 | №0822 |
| major_13 | №0822 |
| major_14 | №0822 |
| major_15 | №0822 |
| major_16 | №0822 |
| major_17 | №0822 |
| major_18 | №0822 |
| major_19 | №0822 |
| major_20 | №0822 |
| major_21 | №0822 |
| majorCost | №0822 |
| majorCurrent | №0822 |
| majorMax | №0822 |
| majorSpent | №0822 |
| makeWeaponAttack | №0780 |
| male | №0060 (+ 1 других файлов) |
| maleProfile | №0059 |
| malformed | №1209 |
| malformedTargetLines | №1207 (+ 1 других файлов) |
| manifest | №0843 |
| manifestations | №0796 |
| manifested | №0814 |
| manifestUrl | №0843 (+ 2 других файлов) |
| map | №0862 |
| mapId | №0072 |
| mappedDisplacementMax | №1208 |
| mappedDisplacementMean | №1208 |
| mappedDisplacementMedian | №1208 |
| mappedDisplacementP95 | №1208 |
| mappedMaxDisplacement | №1207 |
| mappedMeanDisplacement | №1207 |
| mappedMedianDisplacement | №1207 |
| mappedP95Displacement | №1207 |
| mappedRmsDisplacement | №1207 |
| mappedTargetEntries | №1208 |
| mappedVertices | №1197 |
| mapping | №1348 |
| maps | №0671 (+ 1 других файлов) |
| marble | №0673 |
| marchUntoDestiny | №0804 |
| margin | №1120 |
| mariner | №0780 |
| mark | №0780 |
| marked | №0642 (+ 2 других файлов) |
| markedForDeath | №0780 |
| marketPriceGp | №0800 (+ 1 других файлов) |
| marketReport | №0800 |
| marketSource | №0800 (+ 1 других файлов) |
| marketValue | №0665 (+ 1 других файлов) |
| markPrey | №0780 |
| maroon | №0869 |
| marsh_moss | №0879 |
| marsh_pool | №0879 |
| marsh_reeds | №0879 |
| marshes | №0879 |
| martial_adept | №0783 |
| martialBane | №0780 |
| martialFocus | №0780 |
| masks | №0062 |
| mason | №0671 (+ 3 других файлов) |
| master | №0671 |
| masterOfHell | №0699 |
| masterSpecialization | №0671 |
| masterTactician | №0780 |
| masterwork | №0666 (+ 1 других файлов) |
| masterworkBonus | №0670 |
| mastery | №0081 (+ 2 других файлов) |
| masteryExpiry | №0780 |
| masterySpent | №0780 |
| MAT2 | №0069 (+ 2 других файлов) |
| MAT3 | №0069 (+ 2 других файлов) |
| MAT4 | №0069 (+ 4 других файлов) |
| matched | №0803 |
| material | №0059 (+ 23 других файлов) |
| materialBridge | №0807 |
| materialCost | №0079 |
| materialCostGP | №0814 |
| materialCostPerLevelGP | №0814 |
| materialCount | №0666 |
| materialId | №0665 (+ 11 других файлов) |
| materialKind | №0063 |
| materialOnly | №0794 |
| materials | №0063 (+ 48 других файлов) |
| MATERIALS | №1190 (+ 13 других файлов) |
| materialsCost | №0079 |
| materialsPaid | №1158 |
| materialsUsed | №0666 |
| Math | №1184 (+ 4 других файлов) |
| maturity | №0060 (+ 1 других файлов) |
| max | №0062 (+ 51 других файлов) |
| max_mm | №1171 |
| max_morph_targets | №1200 |
| maxAbility | №0079 (+ 1 других файлов) |
| maxBloodLevels | №0814 |
| maxBuffer | №1392 |
| maxCR | №0780 (+ 1 других файлов) |
| maxDice | №0780 |
| maxDisplacementMeters | №1202 |
| maxDistanceFt | №0780 |
| maxExtraShredPsi | №0780 |
| maxHeal | №0780 |
| maxHitDice | №0780 |
| maxHitPoints | №1302 |
| maxHp | №0079 (+ 68 других файлов) |
| maxHP | №0785 (+ 3 других файлов) |
| maxHpReduction | №0780 |
| maxHpReductionOnNecrotic | №0780 |
| maximize | №0649 (+ 3 других файлов) |
| maximizeAttack | №0819 |
| maximized | №0656 (+ 1 других файлов) |
| maximizeDamageDice | №0649 (+ 1 других файлов) |
| maximizeElementalSpell | №0780 |
| maximizeNextAttack | №0819 |
| maximizeNextRoll | №0819 |
| maximum | №0079 |
| maxIntelligence | №0830 |
| maxLevels | №0649 (+ 1 других файлов) |
| maxObjects | №0780 |
| maxOutside | №1348 |
| maxPoints | №0625 (+ 1 других файлов) |
| maxPotions | №0079 |
| maxScore | №0780 |
| maxSizeFt | №0780 |
| maxSlots | №0845 |
| maxSpellLevel | №0804 |
| maxSpellLevelByLevel | №0804 |
| maxSpend | №0810 |
| maxSpendTempHp | №0780 |
| maxStages | №0079 |
| maxStrands | №0060 |
| maxStrDexCon | №0780 |
| maxTargets | №0780 |
| maxUses | №0655 |
| maxWeightLb | №0780 |
| me | №1218 (+ 9 других файлов) |
| measureStartId | №0627 |
| mechanics | №0678 (+ 16 других файлов) |
| mechanicsPending | №0872 (+ 1 других файлов) |
| mechanicsSource | №0702 (+ 3 других файлов) |
| mechanicsStatus | №0689 |
| medicine | №0671 (+ 3 других файлов) |
| medium | №0060 (+ 2 других файлов) |
| mediumArmorWisInsteadOfDex | №0780 |
| meleeAttack | №0780 (+ 1 других файлов) |
| meleeDamage | №0814 |
| meleeExtraDamage | №0780 |
| meleeOrThrown | №0657 (+ 1 других файлов) |
| meleeSpellAttack | №0780 |
| meleeWeaponAttack | №0780 |
| members | №0775 |
| menacingShout | №0780 |
| mentalAny | №0873 |
| mentalConstruct | №0780 |
| mentalDefense | №0777 |
| mentalSavesDisadvantage | №0780 |
| mentalSource | №0817 |
| mentalStats | №0785 |
| mentalStatsPersist | №0785 |
| mentor | №0740 (+ 2 других файлов) |
| mercenary | №0780 |
| merciless | №0780 |
| mercy | №0804 |
| mesh | №1198 (+ 1 других файлов) |
| meshes | №0064 (+ 5 других файлов) |
| meshWeights | №0070 (+ 1 других файлов) |
| message | №0078 (+ 33 других файлов) |
| messy | №0062 |
| messy_crop | №0062 (+ 1 других файлов) |
| meta | №0852 |
| META_COST | №0649 |
| META_NAMES | №0649 |
| metadata | №0079 (+ 12 других файлов) |
| metal | №0063 (+ 1 других файлов) |
| metalworker | №0671 |
| metamagic | №0649 |
| metamagic_adept | №0783 |
| metamorphosesKnown | №0649 |
| metamorphosesMax | №0649 |
| metamorphosis | №0078 |
| method | №0654 (+ 4 других файлов) |
| metrics | №0064 |
| mettle | №0656 (+ 2 других файлов) |
| mid | №0864 |
| mimic | №0687 |
| min | №0062 (+ 17 других файлов) |
| minAppVersion | №0843 (+ 1 других файлов) |
| minAt11 | №0780 |
| Mind | №0081 |
| mindLeech | №0780 |
| mindRead | №0777 |
| mindReadingImmunity | №0780 |
| mindsightFt | №0780 |
| mindsightTrackingHours | №0780 |
| mindStats | №0817 |
| mindThrust | №0780 |
| miner | №0802 (+ 1 других файлов) |
| mineral | №0827 |
| minFilter | №0064 (+ 1 других файлов) |
| minHeight | №0887 |
| minimal | №0067 |
| minimum | №0079 (+ 3 других файлов) |
| minimumAC | №0780 |
| minimumD20 | №0780 |
| minIndex | №1209 |
| mining | №0826 (+ 1 других файлов) |
| minion | №0780 |
| minionResistance | №0780 |
| minionRollBonus | №0780 |
| minionTypes | №0780 |
| minLevel | №0673 |
| minor | №0822 |
| minotaur | №1380 |
| minPsi | №0780 |
| minStr | №0085 |
| minusD4AllD20 | №0780 |
| minutesSinceDeath | №1158 |
| minWidth | №0887 |
| miracle | №0814 |
| miraculousHealing | №0804 |
| miserableCompany | №0780 |
| misfortune | №0078 (+ 1 других файлов) |
| miss | №0780 |
| missed | №0836 |
| missedUnarmedExtraAttack | №0780 |
| missing | №0665 (+ 5 других файлов) |
| missingTools | №0669 (+ 2 других файлов) |
| missRecoveryMinutes | №0780 |
| missRefund | №0780 |
| missRefunds | №0810 |
| mistAffinity | №0630 |
| mistStep | №0814 |
| mithral | №0669 |
| mitosis | №0840 |
| mix | №0082 |
| mixBonus | №1250 |
| mixedPotions | №0780 |
| mixPotions | №0079 |
| mobility | №0642 |
| Mobility | №0780 |
| mod | №0828 (+ 1 других файлов) |
| mode | №0060 (+ 17 других файлов) |
| model | №0071 (+ 2 других файлов) |
| modelFamily | №0067 |
| modelLoc | №0074 |
| models | №1975 |
| modes | №0829 |
| modifier | №0802 (+ 5 других файлов) |
| modifierAtLevel20 | №0830 |
| modifierIds | №0675 |
| modifiers | №0780 (+ 1 других файлов) |
| modifyStats | №0819 |
| modules | №0854 |
| mohawk | №0062 (+ 1 других файлов) |
| monastery | №0068 |
| monster | №0807 (+ 3 других файлов) |
| monster_acid_slime | №0827 |
| monster_acolyte_cloth | №0827 |
| monster_air_essence | №0827 |
| monster_air_vortex | №0827 |
| monster_ankheg_acid_gland | №0827 |
| monster_ankheg_shell | №0827 |
| monster_bandit_captain_leather_armor | №0827 |
| monster_bandit_hide | №0827 |
| monster_basilisk_eye | №0827 |
| monster_basilisk_gallstone | №0827 |
| monster_basilisk_scale | №0807 |
| monster_bear_fat | №0827 |
| monster_bear_hide | №0827 |
| monster_blink_dog_pelt | №0827 |
| monster_blink_dog_phase_gland | №0827 |
| monster_boar_hide | №0827 |
| monster_boar_tusk | №0827 |
| monster_bugbear_fang | №0827 |
| monster_bugbear_hide | №0827 |
| monster_carrion_chitin | №0827 |
| monster_carrion_crawler_paralytic | №0827 |
| monster_constrictor_hide | №0827 |
| monster_constrictor_venom | №0827 |
| monster_crocodile_hide | №0827 |
| monster_crocodile_teeth | №0827 |
| monster_cultist_cloth | №0827 |
| monster_deer_antler | №0827 |
| monster_deer_hide | №0827 |
| monster_direwolf_fang | №0827 |
| monster_direwolf_hide | №0807 (+ 1 других файлов) |
| monster_displacer_hide | №0827 |
| monster_displacer_tentacle | №0827 |
| monster_dragon_blood | №0807 |
| monster_dragon_bones | №0807 (+ 1 других файлов) |
| monster_dragon_heart | №0827 |
| monster_dragon_scales | №0807 (+ 1 других файлов) |
| monster_earth_core | №0827 |
| monster_earth_essence | №0827 |
| monster_ectoplasm | №0827 |
| monster_ethereal_shard | №0827 |
| monster_fire_ash | №0827 |
| monster_fire_essence | №0827 |
| monster_frog_gland | №0827 |
| monster_frog_skin | №0827 |
| monster_ghost_thread | №0827 |
| monster_ghoul_claw | №0827 |
| monster_ghoul_tissue | №0827 |
| monster_giant_eagle_claw | №0827 |
| monster_giant_eagle_feather | №0827 |
| monster_giant_owl_eye | №0827 |
| monster_giant_owl_feather | №0827 |
| monster_gnoll_hide | №0827 |
| monster_gnoll_tooth | №0827 |
| monster_goblin_hide | №0827 |
| monster_harpy_vocal_membrane | №0827 |
| monster_hyena_fangs | №0827 |
| monster_hyena_hide | №0827 |
| monster_kobold_horn | №0827 |
| monster_kobold_scalehide | №0827 |
| monster_manticore_hide | №0827 |
| monster_manticore_meat | №0827 |
| monster_manticore_spines | №0807 |
| monster_meat | №0827 |
| monster_mimic_skin | №0827 |
| monster_mimic_slime | №0827 |
| monster_orc_hide | №0827 |
| monster_owlbear_claw | №0827 |
| monster_owlbear_feathers | №0807 |
| monster_owlbear_hide | №0807 (+ 1 других файлов) |
| monster_rat_fangs | №0827 |
| monster_rat_hide | №0827 |
| monster_rust_chitin | №0827 |
| monster_rust_gland | №0827 |
| monster_shadow_clot | №0827 |
| monster_slime_membrane | №0827 |
| monster_spectral_dust | №0827 |
| monster_spider_chitin | №0807 |
| monster_spider_silk | №0807 (+ 1 других файлов) |
| monster_spider_venom | №0827 |
| monster_troll_blood | №0807 (+ 1 других файлов) |
| monster_troll_claw | №0827 |
| monster_troll_hide | №0807 (+ 1 других файлов) |
| monster_veteran_leather_armor | №0827 |
| monster_water_core | №0827 |
| monster_water_essence | №0827 |
| monster_wight_bone | №0827 |
| monster_wight_essence | №0827 |
| monster_wolf_hide | №0807 (+ 1 других файлов) |
| monsterCount | №0806 |
| monsterCR | №0809 |
| monsterId | №0784 (+ 5 других файлов) |
| monsterName | №0812 |
| monsterparts | №0802 (+ 1 других файлов) |
| MONSTERS | №0656 |
| monstrosity | №0629 (+ 13 других файлов) |
| monstrousGrafts | №0079 |
| monstrousMenagerie | №0780 |
| monstrousMinion | №0777 (+ 1 других файлов) |
| moonEffects | №0814 |
| morph_names | №1200 |
| morph_primitives | №1200 |
| morphAccessor | №1197 |
| morphBufferView | №1197 |
| morphChannels | №0069 (+ 1 других файлов) |
| morphNames | №0070 (+ 2 других файлов) |
| morphs | №0067 (+ 3 других файлов) |
| morphSet | №0067 |
| morphTargets | №0070 (+ 1 других файлов) |
| morphWeights | №0067 |
| mount | №0810 |
| mountaineer | №0780 |
| mountainsEndurance | №0780 |
| mountCantripSwap | №0810 |
| mounted | №0814 |
| mountRollBonus | №0780 |
| mountSpeed | №0810 |
| moustache | №0064 (+ 3 других файлов) |
| mouth | №0062 |
| mouthWidth | №0067 (+ 1 других файлов) |
| moveAlliesHalfSpeed | №0780 |
| moveAndAttack | №0780 |
| moveCostFt | №0079 |
| moved | №0864 |
| movedFt | №0819 |
| moveFt | №0687 (+ 4 других файлов) |
| moveHalfSpeed | №0642 |
| movement | №0079 (+ 19 других файлов) |
| movementAllowance | №0819 |
| movementUsed | №0079 (+ 14 других файлов) |
| movementWithoutOpportunityAttacks | №0814 |
| moveReward | №0819 |
| moveStraightFt | №0780 |
| moveThralls | №0810 |
| moveThroughCreatures | №0780 |
| moveThroughProneCreatures | №0780 |
| moveTo | №0812 (+ 1 других файлов) |
| moveToward | №0657 |
| moving | №0062 |
| moxie | №0717 (+ 2 других файлов) |
| moxieFraction | №0777 |
| moxieFueledFists | №0717 |
| moxieOnFail | №0780 |
| moxieRefunded | №0780 |
| moxieRestored | №0780 |
| moxieSpent | №0780 |
| msg | №0850 (+ 1 других файлов) |
| muddledMind | №0642 |
| mufflingImprecation | №0780 |
| mult | №0668 (+ 1 других файлов) |
| multiAttackAction | №0656 (+ 1 других файлов) |
| multiclass | №0079 (+ 7 других файлов) |
| multiclassAllowed | №0647 (+ 7 других файлов) |
| multiclassProficiencies | №0678 (+ 6 других файлов) |
| multiclassRequirement | №0078 (+ 18 других файлов) |
| multiplier | №0806 |
| mummification | №0780 |
| mummyLord | №0780 |
| mummyRot | №0780 |
| muscle | №0064 (+ 5 других файлов) |
| mutagen | №0642 (+ 2 других файлов) |
| mutagenAbility | №0079 |
| mutagencraft | №0642 |
| mutagenMaximum | №0079 |
| mutagenNoDownside | №0079 |
| mutagens | №0642 (+ 1 других файлов) |
| mutations | №0817 (+ 2 других файлов) |
| mutationSlots | №0817 (+ 1 других файлов) |
| muzzle | №0062 |
| muzzleHeight | №0067 (+ 7 других файлов) |
| muzzleLength | №0067 (+ 9 других файлов) |
| muzzleWidth | №0067 (+ 7 других файлов) |
| myconid | №1372 |
| mysteries | №0708 (+ 1 других файлов) |
| mystery | №0814 |
| mysticArcanum | №0649 |
| mysticEmpowerment | №0834 |
| mysticFrenzy | №0642 |
| mythicForms | №0834 |
| mythicVoice | №0780 |
| n | №0059 (+ 4 других файлов) |
| name | №0061 (+ 237 других файлов) |
| NAME | №0667 |
| nameRu | №0625 (+ 8 других файлов) |
| nameRus | №1117 |
| names | №1248 (+ 1 других файлов) |
| narrow | №0062 (+ 2 других файлов) |
| native | №0811 (+ 1 других файлов) |
| nativeHeadH | №0062 |
| natural | №0067 |
| natural20 | №0812 (+ 1 других файлов) |
| naturalArmor | №0834 |
| naturalAttacks | №0817 (+ 1 других файлов) |
| naturalExplorer | №0649 |
| naturalist | №0830 |
| naturalRecovery | №0817 |
| naturalWeapons | №0834 |
| nature | №0773 (+ 2 других файлов) |
| Nausea | №0081 |
| navigation | №0777 |
| navigator | №1189 (+ 9 других файлов) |
| navigatorCrew | №0780 |
| navy | №0869 |
| nearAllyId | №0819 (+ 1 других файлов) |
| neck | №0062 (+ 2 других файлов) |
| neckDepth | №1168 (+ 2 других файлов) |
| neckline | №1168 (+ 1 других файлов) |
| necrodancer | №0810 |
| necromancyDamageBonusPerCharnel | №0810 |
| necromancyUnleashed | №0810 |
| necromanticSpurs | №0780 |
| necromanticSustainment | №0780 |
| necrotic | №0777 (+ 1 других файлов) |
| Necrotic | №0081 |
| necroticAffinity | №0814 |
| necroticBone | №0827 |
| necroticDamage | №0777 (+ 2 других файлов) |
| necroticEssence | №0827 |
| necroticIgnoreImmunity | №0810 |
| necroticIgnoreResistance | №0810 |
| necroticReagent | №0827 |
| need | №0673 |
| needsChoice | №0079 |
| needsConfirmation | №0079 |
| needsDonor | №0079 |
| needsMaterials | №0079 |
| needsRoll | №0079 |
| needsSubclassChoice | №0701 |
| needsTarget | №0079 |
| needsTime | №0079 |
| negatingAnathema | №0780 |
| negative | №1159 (+ 3 других файлов) |
| negotiated | №0802 |
| negotiatedPrice | №0802 |
| negotiatedQuote | №0802 |
| negotiationModifier | №0802 |
| network | №0849 (+ 2 других файлов) |
| neutral | №0066 |
| newDraft | №0862 |
| newJinxOptions | №0780 |
| newTraderIds | №0801 |
| newValue | №0812 |
| next | №0059 (+ 2 других файлов) |
| nextAttackAdvantage | №0642 (+ 1 других файлов) |
| nextAttackBonus | №0780 |
| nextAttackExtraDice | №0079 |
| nextBombOnly | №0079 |
| nextConcentrationSaveDisadvantage | №0642 |
| nextDamageDice | №0780 |
| nextHitCrit | №0780 |
| nextRiteHitExtraDie | №0642 |
| nextRollMaximum | №0819 |
| nextSaveAdvantage | №0780 |
| nextSpellOrWeaponDamageDisadvantage | №0780 |
| nextTick | №0079 (+ 1 других файлов) |
| nextWisSaveDisadvantage | №0642 |
| night | №0074 |
| nighteye | №0642 |
| Nighteye | №0780 |
| nightforest | №0064 |
| nightmareMount | №0810 |
| nightTerrors | №0780 |
| nightTerrorsWhileAsleep | №0780 |
| noAction | №0780 |
| noActions | №0819 |
| noAging | №0780 |
| noAttacks | №0819 (+ 1 других файлов) |
| Noble | №0796 |
| noConcentrationCheck | №0804 |
| noCoverOrInvisibility | №0642 |
| noDamage | №0079 |
| noDash | №0780 |
| node | №0069 (+ 3 других файлов) |
| nodeId | №0879 |
| nodeIntegration | №0887 |
| nodes | №0879 (+ 7 других файлов) |
| noDisadvantage | №0780 |
| noDisengage | №0819 |
| noFallDamage | №0780 |
| noFoodOrDrink | №0780 |
| noForcedMovement | №0819 (+ 1 других файлов) |
| noFreeWill | №0870 |
| noHealing | №0780 |
| noHealingFromOwnSpells | №0804 |
| noHealingUntilStartNextTurn | №0780 |
| noHelp | №0819 |
| noHide | №0063 (+ 1 других файлов) |
| noMainAction | №0819 (+ 1 других файлов) |
| noMaintainAction | №0780 |
| noMovement | №0819 |
| nonAttackAccursedDamageBonus | №0780 |
| nonCombat | №0658 |
| none | №0067 (+ 1 других файлов) |
| nonlethal | №0079 |
| nonmagicalDamageReduction | №0780 |
| nonManifold | №1173 |
| nonZeroMappedGlbVertexPct | №1207 |
| nonZeroMappedGlbVertices | №1207 |
| nonZeroPct | №1197 |
| nonZeroTargetEntries | №1208 |
| nonZeroVertices | №1197 |
| noOldAgeDeath | №0814 |
| noOpportunity | №0777 |
| noOpportunityAttacks | №0079 (+ 3 других файлов) |
| noReaction | №0780 (+ 1 других файлов) |
| noReactions | №0642 (+ 4 других файлов) |
| noReduction | №0780 |
| noRest | №0780 |
| normal | №0828 (+ 1 других файлов) |
| normalForm | №0834 |
| normalize | №0060 (+ 6 других файлов) |
| normalizeCharacter | №0785 (+ 3 других файлов) |
| normalizeClassName | №0837 |
| normalizeConditionName | №0828 (+ 2 других файлов) |
| normalizeHead | №0067 |
| normalPaceStealth | №0780 |
| normals | №0062 (+ 2 других файлов) |
| noseLength | №0067 |
| noseWidth | №0067 (+ 1 других файлов) |
| noShield | №0780 |
| noSpells | №0819 |
| noStandardHealing | №0840 |
| noSurprise | №0780 |
| notation | №0830 |
| note | №0656 (+ 8 других файлов) |
| noteAffect | №0819 |
| noteD20Roll | №0819 |
| noteMove | №0819 |
| notes | №0625 (+ 28 других файлов) |
| noTransfer | №0819 |
| noUnderwaterDrawbacks | №0780 |
| nourishing | №0780 |
| noVerbal | №0819 (+ 1 других файлов) |
| npcs | №1299 |
| nTexture | №0077 |
| nuclearBomb | №0678 |
| nullification | №0780 |
| number | №0822 |
| numerator | №0822 |
| nylon | №0063 |
| oak | №0673 (+ 1 других файлов) |
| objectId | №0780 (+ 2 других файлов) |
| objectIds | №1248 |
| objectMeleeDamageMultiplier | №0780 |
| objects | №0072 (+ 1 других файлов) |
| obscured | №0687 |
| observe | №0642 |
| obstacles | №1214 (+ 10 других файлов) |
| obstinateAnathema | №0780 |
| occultFetish | №0814 |
| occultRitesKnown | №0708 |
| ocean | №0064 |
| odds | №0822 |
| offer | №0822 |
| offeredCp | №0802 (+ 1 других файлов) |
| official | №0661 (+ 1 других файлов) |
| official_expansion | №0629 |
| offline | №0853 (+ 1 других файлов) |
| oil | №0079 |
| oilBomb | №0780 |
| oilCoated | №0079 |
| ok | №0833 (+ 79 других файлов) |
| old | №0812 |
| oldFormat | №1226 |
| oldLevel | №0671 |
| oldOneTwo | №0780 |
| omnipotence | №0780 (+ 1 других файлов) |
| omnipresence | №0780 (+ 1 других файлов) |
| omniscience | №0780 (+ 1 других файлов) |
| onApply | №0844 |
| onAttackResult | №0078 (+ 8 других файлов) |
| once | №0083 (+ 6 других файлов) |
| oncePerLongRest | №0804 |
| oncePerTurn | №0079 (+ 1 других файлов) |
| onChange | №0654 |
| onclick | №1306 |
| onCondition | №0642 (+ 5 других файлов) |
| onDamage | №0642 (+ 4 других файлов) |
| onDefeat | №0784 |
| onePerShortRest | №0810 |
| oneThirdCaster | №0780 |
| onFail | №0775 (+ 1 других файлов) |
| ongoingDamage | №0687 |
| onHitSave | №0819 |
| onLine | №1189 (+ 1 других файлов) |
| onlyDeadBodies | №0870 |
| onlyMisfortuneFeatures | №0780 |
| onNatural1 | №0079 |
| onPreyDeath | №0780 |
| onProgress | №0843 |
| onRetry | №0844 |
| onSave | №0780 |
| onSavingThrow | №0649 (+ 1 других файлов) |
| onTurnEnd | №0078 (+ 10 других файлов) |
| ooze | №0775 |
| opacity | №0062 (+ 1 других файлов) |
| open | №0061 (+ 27 других файлов) |
| OPENAI_API_KEY | №1155 |
| openBoard | №0862 |
| openDebug | №0849 |
| openHandTechnique | №0812 |
| openInfo | №0667 |
| openLog | №0849 |
| openMainMenuUpdate | №0843 |
| openMind | №0780 |
| openReplay | №0848 |
| openTrade | №0802 |
| operationId | №0819 (+ 20 других файлов) |
| opportunityAdvantage | №0819 |
| opportunityAttack | №0819 (+ 3 других файлов) |
| opportunityAttackBecomesGrapple | №0780 |
| optics | №0671 |
| optional | №0796 |
| optionalSlotDice | №0780 |
| options | №0063 (+ 6 других файлов) |
| optionsFor | №0063 |
| opts | №0812 (+ 1 других файлов) |
| oracle | №0642 (+ 2 других файлов) |
| Oracle | №0708 |
| orange | №0833 |
| orcish_fury | №0783 |
| orcsteppe | №0064 |
| order | №0642 (+ 1 других файлов) |
| orders | №0689 (+ 1 других файлов) |
| organ | №0827 |
| organic | №0064 |
| origin | №0074 |
| original | №0079 |
| originalStats | №0817 (+ 1 других файлов) |
| originRaceId | №0067 (+ 1 других файлов) |
| ostorianDiscourse | №0780 |
| other | №1166 (+ 2 других файлов) |
| otherStyleEffectsPending | №0873 |
| otherworldlyPatron | №0642 |
| outcome | №0673 (+ 1 других файлов) |
| outcomeLabel | №0673 |
| outer | №0059 (+ 2 других файлов) |
| outlandsEligible | №0633 |
| outOfOrder | №0853 |
| output | №0668 (+ 7 других файлов) |
| outputBytes | №1197 |
| oval | №0064 (+ 1 других файлов) |
| oven | №0068 |
| overCorset | №0063 |
| overCuirass | №0063 |
| overflow | №1359 |
| overheat | №0780 |
| overheatIgnoresImmunity | №0780 |
| overlay | №0844 |
| overlord | №0810 |
| overpayCp | №0803 |
| owl | №0062 |
| owlbear | №0687 |
| own | №1216 |
| ownedCondition | №0819 |
| owner | №1159 |
| owner_id | №1189 |
| ownerId | №0079 (+ 10 других файлов) |
| ownerPeerId | №1242 (+ 7 других файлов) |
| ownerTokenId | №0079 (+ 4 других файлов) |
| ownerTurns | №0642 |
| ownTurnId | №0822 (+ 2 других файлов) |
| ox | №0073 |
| oy | №0073 |
| p | №0059 (+ 2 других файлов) |
| p_deleted | №0654 |
| p_expected_revision | №0654 |
| p_id | №0654 |
| p_operation_id | №0654 |
| p_profile | №0654 |
| p_schema_version | №0654 |
| p1 | №1305 (+ 3 других файлов) |
| p2 | №1305 |
| pa | №1242 |
| pack | №0064 (+ 7 других файлов) |
| PACK_ID | №0079 (+ 2 других файлов) |
| packId | №0662 |
| packleader | №0780 |
| Packleader | №0796 |
| packs | №0777 (+ 2 других файлов) |
| packTactics | №0780 |
| pact | №0828 (+ 1 других файлов) |
| pactBoon | №0649 |
| pactLevel | №0799 |
| pactMagic | №0642 (+ 3 других файлов) |
| pactMagicData | №0812 (+ 4 других файлов) |
| padding | №0672 |
| paid_api_authorized | №1155 |
| painkiller | №0780 |
| painkillerGrandStrategist | №0780 |
| painkillerPunishment | №0780 |
| paint | №0079 |
| paintBomb | №0780 |
| paintCreatures | №0079 |
| painter | №0671 (+ 3 других файлов) |
| paintV38 | №0673 |
| paladin | №0799 (+ 1 других файлов) |
| paleMaster | №0810 |
| panelScroll | №1359 |
| panelUV | №0063 |
| panX | №0071 (+ 2 других файлов) |
| panY | №0071 (+ 2 других файлов) |
| paper | №0669 (+ 2 других файлов) |
| Paragon | №0796 |
| paragonOfChivalry | №0780 |
| paralyticReagent | №0827 |
| paralyzed | №0780 (+ 1 других файлов) |
| parasiteMind | №0817 |
| parchment | №0669 (+ 2 других файлов) |
| parent | №0821 |
| parentContainerId | №0790 |
| parentId | №0840 |
| parentNode | №1306 |
| parentTriangles | №1365 (+ 3 других файлов) |
| parley | №0780 |
| parleyFree | №0780 |
| parseDice | №0828 (+ 5 других файлов) |
| part | №0066 |
| partial | №0060 |
| participantTurnStart | №0819 |
| partnerId | №0819 |
| parts | №0059 (+ 13 других файлов) |
| pass | №0855 |
| passesThroughCreatures | №0780 |
| passive | №0064 (+ 9 других файлов) |
| password | №0654 |
| patch | №0666 (+ 1 других файлов) |
| path | №0068 (+ 32 других файлов) |
| pathCost | №1319 (+ 1 других файлов) |
| pathFt | №0812 |
| patientDefense | №0649 |
| patron | №0642 (+ 5 других файлов) |
| patrons | №0642 |
| patternScale | №0063 |
| pauldrons | №0063 |
| pawPadColor | №0067 |
| payHitPointCost | №0656 |
| payload | №0812 (+ 16 других файлов) |
| payOwnHPForCharnel | №0810 |
| PB | №0785 (+ 3 других файлов) |
| pc | №0811 |
| pd | №1242 |
| peaceAura | №0819 (+ 2 других файлов) |
| peaceBlocked | №0656 (+ 1 других файлов) |
| peakPhysicalCondition | №0717 (+ 1 других файлов) |
| pectorals | №0064 (+ 1 других файлов) |
| peer | №0812 |
| peerId | №1296 |
| peerName | №0811 |
| penaltyPerFatigue | №0780 |
| pending | №0079 (+ 3 других файлов) |
| pendingAnswer | №0811 |
| pendingAttack | №0656 (+ 1 других файлов) |
| pendingDamage | №0642 (+ 3 других файлов) |
| pendingInitiativeBonus | №0819 |
| pendingOffer | №0811 |
| pendingOnHit | №0079 (+ 3 других файлов) |
| pendingReaction | №0812 |
| pendingReactions | №0812 (+ 1 других файлов) |
| pendingSelection | №0649 |
| penetratesResistance | №0780 |
| penetratingDice | №0780 |
| pentacles | №0819 (+ 1 других файлов) |
| pentacles_14 | №0819 |
| percent | №0822 |
| perception | №0773 (+ 1 других файлов) |
| Perception | №0081 |
| perceptionReagent | №0827 |
| percipient | №0642 |
| Percipient | №0780 |
| perfectSelf | №0649 |
| performance | №0773 (+ 3 других файлов) |
| perilousGambit | №0780 |
| permanentCurse | №0780 |
| persistent | №0780 |
| persistentRage | №0649 |
| persona | №0780 |
| persuasion | №0773 (+ 2 других файлов) |
| persuasionDeceptionIntimidationFloor | №0780 |
| perTargetLongRest | №0780 |
| perTurn | №0810 |
| petrification | №0780 |
| Petrification | №0081 |
| petrificationReagent | №0827 |
| pharaoh | №0810 |
| phase | №0062 (+ 3 других файлов) |
| phaseFiber | №0827 |
| phaseReagent | №0827 |
| phaseRift | №0780 |
| phaseRiftNoStraightLine | №0780 |
| phaseThrough | №0780 |
| phaseWeaponAttack | №0780 |
| philosophersStone | №0678 |
| physicalAndroidQA | №1202 |
| physicalResistance | №0840 |
| physicalStats | №0785 (+ 1 других файлов) |
| physicalStatsFromShell | №0785 |
| physician | №0830 |
| pickFloor | №0074 |
| pickLevel | №0078 (+ 17 других файлов) |
| piercing | №0872 |
| pigment | №0673 |
| pineResin | №0674 |
| pissAndVinegar | №0717 |
| pitch | №0071 (+ 1 других файлов) |
| pixie | №0062 (+ 1 других файлов) |
| pl | №0074 |
| placeToken | №0862 |
| plague | №0840 |
| plagueLord | №0810 |
| plain | №0664 |
| plan | №0812 (+ 1 других файлов) |
| planar | №0633 |
| planarInfluence | №0633 |
| planes | №0633 |
| planescape | №0633 |
| planned | №0661 |
| planPreview | №0627 |
| plant | №0629 (+ 11 других файлов) |
| plasmoid | №1372 |
| plateColor | №0067 (+ 1 других файлов) |
| plates | №0067 |
| plateSize | №0067 (+ 2 других файлов) |
| play | №0819 (+ 1 других файлов) |
| playerAction | №1306 |
| playfair | №0833 |
| playing | №0083 (+ 1 других файлов) |
| playingTheOdds | №0780 |
| pleats | №0063 (+ 3 других файлов) |
| plusDex | №0814 |
| pockets | №0629 (+ 18 других файлов) |
| pocketSand | №0780 |
| point | №0062 (+ 2 других файлов) |
| pointerId | №1159 |
| points | №0062 (+ 1 других файлов) |
| poison | №0649 (+ 3 других файлов) |
| poisonBypass | №0814 |
| poisoned | №0810 (+ 1 других файлов) |
| poisoner | №0673 (+ 3 других файлов) |
| poisonIgnoresImmunity | №0810 |
| poisonIgnoresResistance | №0810 |
| poisonOnCharnel | №0810 |
| poisonResistance | №0777 |
| polearm_master | №0783 |
| polyglot | №0780 (+ 1 других файлов) |
| ponytail | №0062 (+ 1 других файлов) |
| pool | №0810 (+ 1 других файлов) |
| poor | №0666 (+ 1 других файлов) |
| porcelainClay | №0674 |
| portalAffinity | №0633 |
| portalRoute | №0633 |
| pos | №0074 |
| pose | №0067 |
| poseBuilds | №0064 |
| poses | №0066 |
| position | №0062 (+ 10 других файлов) |
| POSITION | №0065 (+ 6 других файлов) |
| positions | №0059 (+ 11 других файлов) |
| positive | №1159 (+ 3 других файлов) |
| Possessed | №0780 |
| possession | №0078 (+ 1 других файлов) |
| possessLiving | №0785 |
| postMessage | №0888 |
| pot | №0068 |
| potash | №0674 |
| potency | №0081 (+ 1 других файлов) |
| Potency | №0780 |
| potentObservation | №0830 |
| potion | №0079 (+ 4 других файлов) |
| potionBrewing | №0678 |
| potionCap | №0810 |
| potionColor | №0079 (+ 1 других файлов) |
| potionMixologist | №0678 |
| potions | №0079 |
| potter | №0671 (+ 3 других файлов) |
| pottery | №0669 (+ 1 других файлов) |
| power | №0062 (+ 2 других файлов) |
| powerOfTwo | №0064 |
| powerPreference | №0074 |
| pp | №0791 (+ 5 других файлов) |
| precedence | №0855 |
| precision | №0642 |
| Precision | №0780 |
| precisionStrike | №0780 |
| precognition | №0780 |
| predatoryInstinct | №0780 |
| predictiveDodge | №0780 |
| predictorCardId | №1234 (+ 1 других файлов) |
| predictorMajor | №1235 |
| predictorState | №1189 |
| preload | №0887 |
| premium | №1151 |
| prepare | №0066 (+ 1 других файлов) |
| prepared | №0079 (+ 4 других файлов) |
| preparedActions | №0812 (+ 1 других файлов) |
| preparedByLevel | №0804 (+ 1 других файлов) |
| preparedClasses | №0837 |
| preparedLastStand | №0819 |
| preparedLimit | №0837 |
| preparedReactionAttack | №0649 |
| preparedSpells | №0804 (+ 1 других файлов) |
| prepareForLibrary | №0072 |
| prepareInspiration | №0819 |
| prerequisite | №0689 (+ 6 других файлов) |
| present | №0834 (+ 1 других файлов) |
| preserved | №0780 |
| preserveLife | №0649 (+ 1 других файлов) |
| preset | №0064 (+ 5 других файлов) |
| presetId | №0067 (+ 1 других файлов) |
| presets | №0067 (+ 1 других файлов) |
| press | №0068 |
| preSubclassBase | №0822 |
| pretendToBeVisual | №1212 |
| preventDropToZero | №0780 |
| preventExhaustion | №0780 |
| preventOpportunity | №0819 |
| preventsOpportunity | №0819 |
| preventZero | №0780 |
| preventZeroHp | №0687 |
| preview | №0072 |
| previewDisassembly | №0665 |
| previous | №0784 (+ 1 других файлов) |
| previousHp | №0656 |
| preyDamage | №0780 |
| price | №0629 (+ 20 других файлов) |
| priceImproved | №1254 |
| priceModifier | №0802 |
| primalChampion | №0649 |
| primalResilience | №0834 |
| primary | №0833 |
| primaryAbilities | №0079 (+ 4 других файлов) |
| primaryResourceId | №0082 |
| primaryStat | №0078 (+ 31 других файлов) |
| primeBomb | №0678 |
| primeval | №0780 |
| primevalForm | №0834 |
| primevalResurgence | №0834 |
| primitives | №1198 (+ 1 других файлов) |
| primordial | №0687 |
| priority | №0649 (+ 2 других файлов) |
| prismatic | №0079 |
| prismaticBomb | №0780 |
| prismaticIndex | №1158 |
| pristine | №0665 (+ 1 других файлов) |
| privileges | №0887 |
| processedEach | №0664 |
| processedId | №0827 |
| processedRuns | №0664 |
| processedUnit | №0827 |
| processing | №0673 (+ 1 других файлов) |
| prodigy | №0673 |
| profBonus | №0625 (+ 20 других файлов) |
| profession | №0671 (+ 4 других файлов) |
| professionBonus | №1250 |
| professionIds | №0671 |
| professionProfile | №0082 |
| professionRequirements | №0671 |
| PROFESSIONS | №0671 |
| proficiencies | №0647 (+ 10 других файлов) |
| proficiency | №0747 (+ 4 других файлов) |
| proficiencyBonus | №0659 (+ 13 других файлов) |
| proficiencyIfUntrained | №0819 |
| proficiencyRank | №1232 |
| proficiencyType | №0085 |
| proficient | №0648 (+ 6 других файлов) |
| profile | №0062 (+ 15 других файлов) |
| profileResources | №0812 |
| prog | №0074 |
| progression | №0650 (+ 15 других файлов) |
| progressionSource | №0702 (+ 3 других файлов) |
| project | №1346 (+ 1 других файлов) |
| projectedWeaponBonus | №0780 |
| projectile | №0656 (+ 3 других файлов) |
| projection | №0780 (+ 3 других файлов) |
| projectItem | №0780 |
| projectMobility | №0642 |
| projectPoint | №0074 |
| projectScreen | №0074 |
| projectUrl | №0652 (+ 4 других файлов) |
| projectVariant | №0836 |
| prolificAffliction | №0780 |
| prompt | №1238 (+ 8 других файлов) |
| prone | №0780 (+ 1 других файлов) |
| proneOnHit | №0780 |
| proneOnSuccess | №0780 |
| pronounced | №0060 |
| prop | №0079 |
| properties | №0080 (+ 10 других файлов) |
| propertiesHidden | №0082 |
| property | №0081 |
| proportions | №1203 |
| props | №0675 |
| protectAlly | №0687 |
| protected | №0819 |
| protection | №0777 |
| protector | №0687 |
| protege | №0780 |
| protegeAdvantageAfterExploit | №0780 |
| protegeUpgrade | №0780 |
| provokesNoOpportunity | №0777 |
| provokesOpportunityAttacks | №0819 |
| pseudopodSize | №0067 (+ 1 других файлов) |
| psi | №1246 |
| psiLimit | №0715 (+ 1 других файлов) |
| psiLimitFormula | №0715 |
| Psion | №0796 |
| psionicPredator | №0780 |
| psionSource | №0796 |
| psiPoints | №0715 (+ 2 других файлов) |
| psiPointsMax | №0777 (+ 1 других файлов) |
| psiPointsRest | №0715 |
| psychic | №0872 |
| psychicDamage | №0780 |
| psychicDamagePerTurn | №0780 |
| psychokinetics | №0780 |
| pubic | №0060 (+ 1 других файлов) |
| publishableKey | №0652 (+ 4 других файлов) |
| pulpit | №0068 |
| pupilOpacity | №0067 (+ 2 других файлов) |
| pupilShape | №0064 (+ 2 других файлов) |
| purity | №0081 |
| purple | №0833 (+ 1 других файлов) |
| pursuit | №0830 |
| pushFt | №0079 (+ 2 других файлов) |
| pushProneSaveBonus | №0780 |
| pushRadiusFt | №0780 |
| q | №1208 |
| qty | №0800 (+ 2 других файлов) |
| quality | №0060 (+ 12 других файлов) |
| QUALITY | №0668 |
| QUALITY_GRADES | №0665 |
| QUALITY_TIERS | №0666 |
| qualityBand | №0665 |
| qualityBonus | №0082 (+ 5 других файлов) |
| qualityEffects | №0666 |
| qualityKey | №0665 (+ 1 других файлов) |
| qualityLabel | №0665 |
| qualityMultiplier | №0800 (+ 1 других файлов) |
| qualityOf | №0666 |
| qualityReport | №0665 |
| quantity | №0669 (+ 1 других файлов) |
| quartz | №0674 |
| quartzForm | №0780 |
| query | №0794 |
| querySelector | №1270 |
| querySelectorAll | №1191 (+ 4 других файлов) |
| queued | №0819 |
| queueLastStandAttacks | №0819 |
| quick | №1328 |
| quickBrewing | №0079 (+ 1 других файлов) |
| quickened | №0649 |
| quickPin | №0780 |
| quiet | №0079 |
| quietBomb | №0780 |
| quiveringPalm | №0812 |
| quota_scope | №1340 |
| quote | №0800 |
| r | №0869 (+ 2 других файлов) |
| rabbit | №0062 |
| rabbitEarSize | №0067 (+ 1 других файлов) |
| rabbitTailSize | №0067 (+ 1 других файлов) |
| rabbleRouser | №0780 |
| race | №0787 (+ 7 других файлов) |
| raceId | №0061 (+ 18 других файлов) |
| raceName | №0625 (+ 1 других файлов) |
| raceWarp | №0062 |
| rack | №0068 |
| radial | №0063 |
| radiant | №0872 |
| Radiant | №0081 |
| radiantAttackOrder | №0780 |
| radiantRetaliation | №0810 |
| radiantVsUndead | №0079 |
| radius | №0063 (+ 4 других файлов) |
| radiusBySlot | №0780 |
| radiusFt | №0678 (+ 3 других файлов) |
| radiusIncreaseFt | №0780 |
| radiusMiles | №0079 |
| rage | №0649 (+ 1 других файлов) |
| rageDamageBonus | №0682 |
| ragesCount | №0682 |
| raging | №1303 (+ 1 других файлов) |
| ragingInferno | №0780 |
| ragPulp | №0674 |
| rail | №0071 |
| raisedFt | №0819 |
| raiseThrallOnSeedKill | №0810 |
| rallyCrew | №0780 |
| rallyingCry | №0740 |
| rallyUnlimited | №0777 (+ 1 других файлов) |
| ram | №0067 |
| rampage | №0657 (+ 1 других файлов) |
| rampageDie | №0780 |
| rampagePending | №0687 |
| randomUUID | №1217 (+ 3 других файлов) |
| range | №0079 (+ 17 других файлов) |
| rangedAttack | №0819 (+ 2 других файлов) |
| rangedAttackBonus | №0780 |
| rangeFt | №0078 (+ 31 других файлов) |
| rangeFtByLevel | №0829 |
| rangeMultiplier | №0780 |
| ranger | №0799 (+ 1 других файлов) |
| rangerFightingStyle | №0649 |
| rank | №0822 |
| rankForRecipe | №0671 |
| rapidity | №0642 |
| Rapidity | №0780 |
| raptor | №0062 |
| rare | №0794 (+ 6 других файлов) |
| rareBonus | №0809 |
| rareChance | №0775 |
| rarity | №0794 (+ 27 других файлов) |
| rate | №0666 |
| ratio | №0665 (+ 4 других файлов) |
| rats | №0062 |
| ravenousWeapon | №0780 |
| raw | №0654 (+ 3 других файлов) |
| rawCopper | №0674 |
| rawIron | №0674 |
| rawUnit | №0827 |
| rawXp | №0806 |
| ray | №0821 |
| reach | №0821 |
| reachBonusFt | №0780 |
| reachFt | №0777 (+ 1 других файлов) |
| reaction | №0079 (+ 41 других файлов) |
| reactionAction | №0780 |
| reactionAttack | №0687 (+ 2 других файлов) |
| reactionAttackOrSingleTargetSpell | №0780 |
| reactionCastHexOnDamager | №0780 |
| reactionChoice | №1234 (+ 2 других файлов) |
| reactionCounter | №0777 |
| reactionDamage | №0780 |
| reactionDamageReduction | №0810 |
| reactionDefensiveOrder | №0780 |
| reactionHalveDamage | №0780 |
| reactionId | №0812 (+ 4 других файлов) |
| reactionMode | №0780 |
| reactionMove | №0780 |
| reactionMoveFt | №0780 |
| reactionNegateSpellUpTo5 | №0780 |
| reactionOpportunityAgainstAttacker | №0780 |
| reactionOptions | №0649 (+ 3 других файлов) |
| reactionPending | №0812 |
| reactionRedirectAttack | №0810 |
| reactions | №0649 (+ 2 других файлов) |
| reactionsMax | №0649 |
| reactionSpell | №0814 |
| reactionsRefresh | №0830 |
| reactionSuppressOnInitiative | №0780 |
| reactionUsesByLevel | №0830 |
| reactionWeather | №0687 |
| reactionWindow | №0656 |
| readAllWriting | №0780 |
| readError | №0064 |
| readOnly | №0848 |
| readWriteForkedLanguages | №0780 |
| ready | №0064 (+ 2 других файлов) |
| readyState | №1190 (+ 26 других файлов) |
| reagent | №0827 |
| reagentRoll | №1158 |
| reagents | №0079 (+ 4 других файлов) |
| reagentsRegained | №0079 |
| reagentsSpent | №0079 |
| reagentSynthesis | №0678 |
| reanimateCorpse | №0870 |
| reanimated | №0870 |
| reanimator | №0810 |
| reaper | №0810 |
| rearDigits | №0062 |
| reason | №0078 (+ 30 других файлов) |
| reassembleCorpus | №0780 |
| rebirthInHell | №0780 |
| rebuild | №0799 |
| rebuildMaterialUsage | №1190 (+ 1 других файлов) |
| recalculate | №0850 |
| receipt | №0819 |
| received | №0803 |
| recharge | №0079 (+ 12 других файлов) |
| rechargeActions | №0806 |
| recharged | №0806 |
| rechargeOn | №0655 |
| rechargeState | №0812 |
| recipe | №0666 (+ 5 других файлов) |
| recipeCount | №0673 |
| recipeId | №0665 |
| recipeName | №0665 |
| recipeRequirements | №0671 |
| recipes | №0668 (+ 4 других файлов) |
| RECIPES | №0668 |
| recipesList | №0668 |
| reciprocalRelationship | №0780 |
| reckless | №0649 |
| recommendedSourceCommit | №1397 |
| reconstruction | №0642 |
| Reconstruction | №0780 |
| record | №0848 (+ 6 других файлов) |
| recordApplication | №0822 |
| recordCraftResult | №0671 |
| recordDamage | №0819 |
| recordMutation | №0817 (+ 1 других файлов) |
| recover | №0654 |
| recoverable | №0665 |
| recovered | №0665 (+ 2 других файлов) |
| recoveredFromCrafting | №0666 |
| recoverRatio | №0665 |
| recovery | №0717 (+ 1 других файлов) |
| Recovery | №0081 |
| RECOVERY_BY_DURABILITY | №0665 |
| RECOVERY_BY_QUALITY | №0666 |
| recoveryRate | №1190 |
| recruitInformant | №0780 |
| recruitMercenary | №0780 |
| recursive | №0889 (+ 48 других файлов) |
| red | №0833 |
| Red | №0777 (+ 1 других файлов) |
| redirect | №0780 |
| redirectAttack | №0780 |
| redirectAttackToAlly | №0079 |
| redirectDamage | №0777 |
| redirectDamageToConstruct | №0780 |
| redirectMeleeAttackToFamiliar | №0780 |
| redirectMissedAttackToGrappledTarget | №0780 |
| redirectOrCancel | №0780 |
| redirectTargetId | №0819 |
| redirectURL | №0887 |
| redistributed | №0819 |
| redo | №0064 |
| reduced | №0642 (+ 2 других файлов) |
| reducedBy | №0780 |
| reduceMaxHpByDamage | №0780 |
| reduceNextVisibleAttackBy | №0780 |
| reduction | №0829 (+ 1 других файлов) |
| reEnabled | №1191 |
| ref | №0819 |
| refinedCopper | №0674 |
| reflectPsychicDamage | №0780 |
| refresh | №0820 (+ 2 других файлов) |
| refresh_token | №0654 (+ 1 других файлов) |
| refreshByItsAlive | №0780 |
| refreshMaterial | №0063 |
| refreshOrgans | №0870 |
| refreshStatus | №0665 |
| refundCharnelOnThrallLoss | №0810 |
| refunded | №0812 |
| refundedSpellSlot | №0812 |
| regainOnShortRest | №0777 |
| regainReagentsOnInitiativeUpTo | №0079 |
| regeneration | №0810 |
| Regeneration | №0081 |
| regenerationBlockedBy | №0810 |
| regenPbWhenBloodied | №0642 |
| region | №0063 (+ 3 других файлов) |
| REGION_MOD | №0800 |
| regionalHairSupported | №0060 |
| regionMask | №0060 |
| regionMultiplier | №0800 |
| regions | №0060 (+ 5 других файлов) |
| register | №0629 (+ 12 других файлов) |
| registerActionHandler | №1242 (+ 5 других файлов) |
| registerClass | №0662 (+ 3 других файлов) |
| registerEquipment | №0067 |
| registerPreset | №0067 |
| registerRace | №0067 |
| registerSkin | №0067 |
| registerSummon | №0831 |
| registry | №0662 |
| reinforcedWoodV49 | №0668 |
| reinvokedRune | №0780 |
| reject | №0789 (+ 2 других файлов) |
| rejuvenatingOrder | №0780 |
| relation | №0819 (+ 1 других файлов) |
| relationship | №0802 |
| relationshipChanged | №1254 |
| relaunch | №1194 |
| relaxationLevels | №0780 |
| rele | №0649 |
| release_ready | №1155 |
| release_reason | №1155 |
| release_source_sha | №1155 |
| releaseDeadSpaceOnInitiative | №0810 |
| releaseToLarva | №0817 |
| relentless | №0630 |
| relentlessRage | №0649 |
| reliableTalent | №0649 |
| relic | №0800 (+ 2 других файлов) |
| religion | №0773 (+ 1 других файлов) |
| remaining | №0649 (+ 11 других файлов) |
| remainingAmount | №0642 (+ 3 других файлов) |
| remainingCharges | №0079 |
| remainingHp | №0780 |
| remainingMinutes | №0079 (+ 2 других файлов) |
| remainingOwnerTurns | №0079 |
| remainingTurns | №0079 (+ 1 других файлов) |
| remnant | №0840 |
| remnants | №0064 (+ 4 других файлов) |
| remote | №0654 |
| remoteRoster | №0811 |
| remove | №0659 (+ 7 других файлов) |
| removeAction | №0079 |
| removeAdvantage | №0872 |
| removeAlchemistSlime | №0656 |
| removeClass | №0850 |
| removeCondition | №0777 (+ 1 других файлов) |
| removeConditions | №0642 |
| removed | №0059 (+ 2 других файлов) |
| removeEventListener | №0888 |
| removeFeat | №0850 |
| removeFloor | №0072 |
| removeImmunity | №0642 |
| removeInventory | №0850 |
| removeItem | №1201 (+ 3 других файлов) |
| removeObject | №0072 |
| removePoisonDisease | №0780 |
| removeRampage | №0687 |
| removeResistance | №0642 |
| removeResistanceTo | №0780 |
| removeSpell | №0850 |
| removeZone | №0072 |
| render | №0082 (+ 10 других файлов) |
| renderAppearance | №0062 |
| renderCharacterCreation | №0671 |
| renderControls | №0642 |
| renderFamily | №0067 |
| renderInventory | №1250 (+ 1 других файлов) |
| renderStatus | №0667 |
| rendingStrike | №0780 |
| repairCost | №1192 |
| repairCount | №0665 |
| repaired | №0665 (+ 3 других файлов) |
| repairGold | №1190 |
| repairItem | №0665 (+ 3 других файлов) |
| repairProfile | №0666 |
| repeat | №0083 |
| repeatCondition | №0819 |
| repeatDamageOnFailedSave | №0642 |
| repeatMissedAttack | №0780 |
| repeatRestriction | №0780 |
| repeatRollingBoulderOnSuccessfulProne | №0780 |
| repeatSave | №0079 (+ 3 других файлов) |
| repeatSaveAtTurnEnd | №0780 |
| repeatSaveEndTurn | №0780 |
| repeatSaveOnDamage | №0780 |
| replaceAfterShortRest | №0780 |
| replaceAnyAfterLongRest | №0780 |
| replaceAnyNon18Metamorphoses | №0780 |
| replaceAttackWithSpirit | №0814 |
| replaceAttackWithTouchCantrip | №0780 |
| replaceConsumed | №0780 |
| replaceDropToZeroWithHP | №0079 |
| replaceExploitOnRest | №0780 |
| replaceLowSpellSlotWithInspiringWord | №0780 |
| replaceMetamorphosis | №0780 |
| replaceMutagen | №0780 (+ 1 других файлов) |
| replaceOnRest | №0078 |
| replacePhysicalSaveWith | №0780 |
| replacesRace | №0644 (+ 10 других файлов) |
| replaceStandardOrExoticAfterLongRest | №0780 |
| replaceWolfWithDireWolf | №0780 |
| report | №0665 (+ 1 других файлов) |
| reposition | №0780 |
| reprisal | №0804 |
| reptile | №0775 |
| reptileIndices | №0062 |
| reptileProfile | №0062 (+ 5 других файлов) |
| reptileSkin | №0062 |
| req | №0642 (+ 1 других файлов) |
| requestedExternal | №0060 |
| requestId | №0812 (+ 7 других файлов) |
| require | №1398 |
| required | №0715 (+ 3 других файлов) |
| requiredAssets | №0072 |
| requiredGold | №0666 |
| requiredLevel | №0671 |
| requiredMaterials | №0666 |
| requiredSpecialization | №0671 |
| requiredTools | №0673 |
| requirements | №0633 (+ 1 других файлов) |
| requires | №0675 (+ 4 других файлов) |
| requiresAdvantage | №0780 |
| requiresArmor | №0780 |
| requiresDisengage | №0780 |
| requiresEqualOrHigherExtraSlot | №0780 |
| requiresGrappled | №0780 |
| requiresNearestAttack | №0642 |
| requiresSight | №0819 (+ 3 других файлов) |
| requiresSoleHexTarget | №0780 |
| requiresTarget | №0780 |
| reroll | №0649 |
| rerollAttack | №0079 |
| rerollDamage12 | №0780 |
| rerollFlickerCost | №0780 |
| rerollGrappleEscape | №0780 |
| rerollHemocraftOncePerTurn | №0780 |
| rerollOne | №0649 (+ 3 других файлов) |
| rerollOneDamageDie | №0780 |
| rerollSave | №0777 (+ 1 других файлов) |
| rerollType | №0780 |
| reservationRetained | №0656 |
| reserved | №0804 (+ 3 других файлов) |
| reservedDie | №0814 |
| reset | №0064 |
| resetDeathSaves | №0656 |
| resetLairRound | №0806 |
| resetNegotiation | №0802 |
| resetRestResources | №0870 |
| resetTurn | №0649 |
| resetTurnResources | №0784 |
| resetView | №0864 |
| resignalSeq | №0811 |
| resilientOrder | №0780 |
| resilientOrderAdvanced | №0780 |
| resin | №0668 (+ 3 других файлов) |
| resist | №0819 |
| resistance | №0079 (+ 10 других файлов) |
| resistanceAll | №0079 (+ 2 других файлов) |
| resistanceAllDamage | №0780 |
| resistanceAllExceptPsychic | №0780 |
| resistanceChosen | №0780 |
| resistances | №0656 (+ 14 других файлов) |
| resistanceType | №0079 (+ 2 других файлов) |
| resistanceWhileBloodied | №0780 |
| resistant | №0819 (+ 1 других файлов) |
| resistantSuppression | №0780 |
| resisted | №0851 |
| resize | №0072 |
| resolution | №0860 (+ 1 других файлов) |
| resolve | №0654 (+ 4 других файлов) |
| resolveAction | №0806 |
| resolveAttack | №0656 (+ 1 других файлов) |
| resolveCharacterRace | №0067 |
| resolveEquipment | №0067 |
| resolveFall | №0072 |
| resolveFeature | №0662 |
| resolveHealingEvent | №0819 |
| resolveMorphWeights | №0069 |
| resolveRace | №0067 |
| resolveReaction | №0649 |
| resolveRollMode | №0828 |
| resolveSkin | №0067 |
| resource | №0784 (+ 1 других файлов) |
| resourceBridge | №0687 |
| resourceInput | №0673 |
| resourceName | №0826 |
| resourceProcessing | №0827 |
| resourceRevision | №0812 |
| resources | №0079 (+ 39 других файлов) |
| RESOURCES | №0674 |
| resourceUnit | №0827 |
| resourceYieldMultiplier | №0673 |
| respawn | №0879 |
| rest | №0642 (+ 11 других файлов) |
| restAndRecover | №0780 |
| restHealing | №0785 (+ 1 других файлов) |
| restNormals | №0062 |
| restock | №0800 (+ 1 других файлов) |
| restore | №0649 (+ 4 других файлов) |
| restoreBloodMaledictOnRiteCrit | №0642 |
| restoreBody | №0817 |
| restored | №0079 (+ 3 других файлов) |
| restoredAt | №0866 |
| restoreExhaustion | №0777 (+ 1 других файлов) |
| restoreExploitPerAlly | №0780 |
| restoreGolem | №1158 |
| restoreHitDice | №0777 (+ 1 других файлов) |
| restoreHp | №0687 |
| restoreHP | №0780 |
| restoreInterruptOnInitiative | №0780 |
| restoreLocalCopy | №0654 |
| restoreMoxie | №0780 |
| restoreMoxieOnSuccessfulCrossCounter | №0780 |
| restoreOneSealLongRest | №0780 |
| restoreOnInitiative | №0780 |
| restorePactSlot | №0642 |
| restoreReagents | №0780 |
| restoreResource | №0777 |
| restoreResources | №0828 |
| restoreSnapshot | №0862 (+ 1 других файлов) |
| restoreSpellLevels | №0810 |
| restoreThrall | №0780 |
| restoreWithReagents | №1158 |
| restPositions | №0062 |
| restrainAt0Hp | №0780 |
| restrained | №0780 (+ 1 других файлов) |
| restrainedUntilEndOfNextTurn | №0780 |
| restrictionUntilOwnEnd | №0819 |
| result | №0649 (+ 40 других файлов) |
| resultCp | №0791 |
| resultEp | №0791 |
| resultGp | №0791 |
| resultPp | №0791 |
| results | №0649 (+ 4 других файлов) |
| resultSp | №0791 |
| resumed | №0819 |
| retain | №0834 |
| retainMentalStats | №0780 |
| retains | №0845 |
| retaliationHealing | №0780 |
| retaliatoryDamage | №0780 |
| retaliatoryNecrotic | №0780 |
| retargetMageMark | №0819 |
| retreat | №0821 |
| retreatFrom | №0819 |
| retries | №0822 |
| retry_after | №1155 (+ 1 других файлов) |
| retryIn | №0879 (+ 1 других файлов) |
| returnAfterHour | №0810 |
| returnAttackBonus | №0812 (+ 1 других файлов) |
| returnDamage | №0780 (+ 3 других файлов) |
| returnDamageType | №0812 |
| returnedAttack | №0649 |
| returnTarget | №0656 (+ 3 других файлов) |
| returnToShell | №0785 |
| reveal | №0080 (+ 3 других файлов) |
| revealed | №0075 (+ 2 других файлов) |
| revealedArcana | №0642 |
| revealedSight | №0819 |
| revealsInvisible | №0079 |
| reverseMappedGlbVertices | №1207 |
| revert | №0780 (+ 1 других файлов) |
| revision | №0654 (+ 3 других файлов) |
| revitalizingOrderExploit | №0780 |
| reviveAtDawn | №0780 |
| reviveAtZero | №0777 |
| revived | №0079 |
| revivedFromZero | №0656 |
| reviveHp | №0780 |
| reviveNearHeartAfterHours | №0780 |
| reviveRecentDead | №0810 |
| reviveRite | №0642 |
| reviveTo1 | №0780 |
| revokeObjectURL | №1299 |
| revolution | №0804 |
| rewards | №0671 (+ 2 других файлов) |
| rider | №0870 |
| RIDGE_STYLES | №0067 |
| ridgeColor | №0067 (+ 1 других файлов) |
| ridgeStyle | №0064 |
| right | №1205 |
| ringingStrike | №0780 |
| riposte | №0780 |
| riseFt | №0819 |
| risk | №0081 |
| rite | №0780 (+ 2 других файлов) |
| riteFocus | №0642 |
| riteOfTheDawn | №0642 |
| riteRevival | №0642 |
| rites | №0708 (+ 8 других файлов) |
| riteSwapAtLevel | №0780 |
| riteType | №0642 (+ 7 других файлов) |
| ritual | №0762 (+ 3 других файлов) |
| ritualCasting | №0708 (+ 1 других файлов) |
| ritualComponentReplaced | №0814 |
| ritualDuringShortRest | №0780 |
| ritualizeKnownSpellsUpTo | №0814 |
| ritualMastery | №0780 |
| ritualMaterialSubstitution | №0780 |
| ritualMinutes | №0780 (+ 1 других файлов) |
| ritualSpellLevelMax | №0814 |
| ritualTurnsBySpellLevel | №0814 |
| rmsDisplacementMeters | №1202 |
| roar | №0642 (+ 1 других файлов) |
| roguishCharm | №0780 |
| role | №0060 (+ 32 других файлов) |
| roles | №0629 (+ 18 других файлов) |
| roll | №0075 (+ 25 других файлов) |
| rollback | №0857 (+ 1 других файлов) |
| rollD20 | №0828 (+ 20 других файлов) |
| rollDice | №0656 (+ 4 других файлов) |
| rolled | №0839 |
| rolledDistanceFt | №0819 |
| rollingAvalanche | №0780 |
| rollingBoulder | №0780 |
| rollPockets | №0808 (+ 1 других файлов) |
| rollResolved | №0836 |
| rollResult | №0873 |
| rolls | №0629 (+ 24 других файлов) |
| rollTwiceChoose | №0780 |
| roomId | №0811 (+ 5 других файлов) |
| rope | №0671 (+ 1 других файлов) |
| roster | №1189 (+ 2 других файлов) |
| rotation | №0077 |
| rotFist | №0780 |
| roughness | №0062 (+ 3 других файлов) |
| round | №0064 (+ 51 других файлов) |
| roundEarSize | №0067 (+ 1 других файлов) |
| roundOwnerId | №0819 |
| roundsRemaining | №0780 (+ 1 других файлов) |
| roundStart | №0819 |
| route | №0821 |
| rows | №0079 (+ 21 других файлов) |
| RTCPeerConnection | №1327 |
| ru | №0746 (+ 1 других файлов) |
| rug | №0068 |
| ruined | №0665 (+ 1 других файлов) |
| ruins | №0800 |
| ruins_courtyard | №0879 |
| ruins_vault | №0879 |
| ruins_workshop | №0879 |
| rules | №0822 (+ 2 других файлов) |
| run | №0857 (+ 1 других файлов) |
| rune | №0780 (+ 2 других файлов) |
| runeDoesNotCountAgainstAttunement | №0780 |
| runeInert | №0780 |
| runesKnown | №0649 (+ 1 других файлов) |
| runesPerObject | №0780 |
| runesPersistAfterDeath | №0780 |
| runicCharges | №0829 |
| runicLore | №0829 |
| runSceneTest | №0843 |
| runScripts | №1212 |
| runtime | №0708 (+ 4 других файлов) |
| runtimeCraft | №0780 |
| runtimeId | №0814 |
| runtimeKey | №0771 |
| runtimeStatus | №0708 (+ 1 других файлов) |
| runtimeVersion | №0678 |
| ruthlessCommand | №0780 |
| ruthlessFocus | №0780 |
| rx | №0062 (+ 4 других файлов) |
| ry | №0062 |
| rz | №0062 (+ 1 других файлов) |
| s | №0071 (+ 3 других файлов) |
| sacredWeapon | №0649 |
| sacrifice | №0804 (+ 1 других файлов) |
| sacrificeFoe | №0804 |
| saddler | №0671 |
| safeAlliesMax | №0780 |
| sagacity | №0642 |
| Sagacity | №0780 |
| salt | №0672 (+ 3 других файлов) |
| saltOfEarth | №0780 |
| salvage | №0826 (+ 1 других файлов) |
| sample | №1261 (+ 3 других файлов) |
| sampledBestMaxDistance | №1211 |
| sampledBestMeanDistance | №1211 |
| sampledGoodPct | №1211 |
| sampleSampler | №0069 |
| sand | №0673 |
| sandbox | №0887 |
| sandVortex | №0810 |
| sanguine | №0780 |
| sanguineEmboldenAllies | №0780 |
| sanguineMastery | №0642 |
| sanguineVitalize | №0780 |
| satyr | №1380 |
| savage_attacker | №0783 |
| savageDice | №0780 |
| save | №0061 (+ 26 других файлов) |
| save1 | №0810 |
| save1or2 | №0810 |
| saveAbility | №0678 |
| saveBonus | №0642 (+ 1 других файлов) |
| saveBonuses | №1157 (+ 6 других файлов) |
| saveBottom | №1359 |
| saveCustom | №0858 |
| saved | №0785 (+ 2 других файлов) |
| savedAt | №0861 (+ 2 других файлов) |
| saveDc | №0812 |
| saveDC | №0079 (+ 6 других файлов) |
| savedChannel | №1339 |
| savedDrawCalls | №0064 |
| saveDisadvantage | №0780 (+ 1 других файлов) |
| saveDisadvantageForPugilistFeatures | №0780 |
| savedUrl | №1339 |
| saveEpoch | №0866 |
| saveId | №0866 |
| saveModifiers | №0642 (+ 8 других файлов) |
| saveOnHit | №0079 |
| savePenalty | №0079 |
| saveResult | №0079 (+ 7 других файлов) |
| saveRevision | №0866 |
| saveRoll | №0812 |
| saves | №0780 (+ 1 других файлов) |
| savesData | №0625 (+ 1 других файлов) |
| saveSheet | №0659 |
| saveSucceeds | №0780 |
| saveSuccess | №0079 |
| saveType | №0656 (+ 7 других файлов) |
| savingThrow | №0656 (+ 20 других файлов) |
| savingThrowBonusDice | №0780 |
| savingThrowProficiencies | №1238 |
| savingThrows | №0078 (+ 32 других файлов) |
| SCALAR | №0069 (+ 4 других файлов) |
| scale | №0062 (+ 20 других файлов) |
| scalePlateV49 | №0668 |
| scalesPerLevel | №0780 |
| scaleWithOwner | №0659 (+ 1 других файлов) |
| scan | №0831 |
| scarf | №0063 |
| scenarios | №0857 (+ 1 других файлов) |
| scene | №1163 (+ 2 других файлов) |
| sceneFrom | №0819 |
| sceneOwnerId | №0819 (+ 1 других файлов) |
| scenes | №1163 (+ 2 других файлов) |
| schema | №1346 |
| schema_version | №1189 |
| SCHEMA_VERSION | №0643 (+ 2 других файлов) |
| schemaVersion | №0067 (+ 7 других файлов) |
| scheme | №0887 |
| scholarlyPursuits | №0830 |
| school | №0761 (+ 10 других файлов) |
| schoolOfHardKnocks | №0780 |
| scope | №0780 (+ 1 других файлов) |
| scopeId | №0654 |
| scopes | №0654 |
| score | №0665 (+ 1 других файлов) |
| scourgeAttunement | №0780 |
| scourgePresence | №0780 |
| scourgeSense | №0780 |
| scourgeSpeech | №0780 |
| scourgeVisage | №0780 |
| scribe | №0669 (+ 4 других файлов) |
| scrolls | №0671 (+ 2 других файлов) |
| seafarer | №0780 |
| seal | №0780 |
| sealDamage | №0699 (+ 1 других файлов) |
| sealDamageIgnoresResistance | №0780 |
| sealDiceDoubled | №0780 |
| sealedSpiritFeatureLevels | №0845 |
| seals | №0699 |
| sealSystem | №0699 |
| sealWax | №0673 |
| seamMaxMeters | №1202 |
| seaMobility | №0777 |
| search | №0661 |
| searchAsBonus | №0777 |
| second | №0828 |
| second_chance | №0783 |
| secondaryAbility | №0687 |
| secondaryStat | №0678 (+ 3 других файлов) |
| secondaryStatChoice | №0699 (+ 2 других файлов) |
| secondaryStats | №0727 (+ 5 других файлов) |
| seconds | №0819 (+ 4 других файлов) |
| secondTarget | №0780 |
| secondWind | №0649 |
| secret | №0075 |
| secure | №0887 |
| seeIllusions | №0819 |
| seeing | №0780 |
| seeInvisible | №0819 (+ 1 других файлов) |
| seek | №0848 |
| seeking | №0079 |
| seekingBomb | №0780 |
| select | №0858 |
| selected | №0078 (+ 4 других файлов) |
| selectedFile | №0854 |
| selectedRites | №0814 |
| selectedTexture | №0072 |
| selectedTokenId | №0627 |
| selectedTool | №0072 |
| selectedWallTexture | №0072 |
| selection | №0078 |
| self | №1970 |
| selfAdvantage | №0828 |
| selfDamage | №0649 (+ 4 других файлов) |
| selfDamageType | №0780 |
| selfDisadvantage | №0828 |
| selfFireDamageUpToLevel | №0780 |
| selfHeal | №0780 |
| selfNecrotic | №0780 |
| selfRadiantDamage | №0780 |
| selfSuture | №0810 |
| selfUsesHitDie | №0780 |
| sell | №0800 (+ 2 других файлов) |
| sellable | №0803 |
| sellFactor | №0800 (+ 1 других файлов) |
| sendActionResult | №1242 (+ 5 других файлов) |
| sendMessage | №1296 |
| sendReactionRequest | №1242 (+ 2 других файлов) |
| senseBloodCreatures | №0780 |
| senses | №0659 (+ 4 других файлов) |
| sentinel | №0783 |
| sentinelSoul | №0736 (+ 1 других файлов) |
| sentinelSoulChoices | №0736 |
| sentinelStand | №0736 (+ 1 других файлов) |
| sentinelStandChoices | №0736 |
| sentinelStrike | №0736 (+ 1 других файлов) |
| sentinelStrikeChoices | №0736 |
| seq | №1304 (+ 6 других файлов) |
| serial | №0642 |
| serialize | №0067 |
| session | №0863 (+ 2 других файлов) |
| sessionId | №0863 (+ 1 других файлов) |
| sessions | №1270 (+ 1 других файлов) |
| setArmor | №0064 |
| setAttribute | №1250 (+ 1 других файлов) |
| setAxis | №0064 |
| setBackground | №0850 |
| setBodyHair | №0064 |
| setCeiling | №0819 |
| setClassLevel | №0850 |
| setClothing | №0064 |
| setClothingCustomization | №0064 |
| setElevation | №0819 |
| setEnabled | №0662 (+ 1 других файлов) |
| setExternalAnatomy | №0064 |
| setGender | №0064 (+ 1 других файлов) |
| setHead | №0064 |
| setHosieryDen | №0064 |
| setHp | №0780 |
| setHP | №0780 |
| setIcon | №0888 |
| setItem | №1159 (+ 19 других файлов) |
| setMainMenuAvailability | №0843 |
| setMessageHandler | №1296 |
| setOriginRace | №0067 |
| setPose | №0064 |
| setProfession | №0850 |
| setProgress | №0844 |
| setProgressHandler | №0843 |
| setRace | №0064 (+ 2 других файлов) |
| setRegion | №0800 |
| setResource | №0828 |
| setSkin | №0064 |
| setStance | №0780 |
| setStatus | №0844 |
| setStrength | №0079 |
| setSwarmMoving | №0064 |
| setSymbiosis | №0817 |
| setTile | №0072 |
| setTimeout | №0664 (+ 15 других файлов) |
| settlementIntel | №0780 |
| settlementOnly | №0780 |
| setTotalLevel | №0850 |
| setView | №1299 |
| setWeapon | №0064 |
| sewer | №0064 |
| sha | №1346 |
| sha256 | №0843 (+ 5 других файлов) |
| shadow_dancer | №0783 |
| shadow_touched | №0783 |
| shadowColor | №0067 (+ 1 других файлов) |
| shadowEssence | №0827 |
| shadowForm | №0810 |
| shadowmaster | №0780 |
| shadowMasterOfDisguise | №0780 |
| shadowNoEscape | №0780 |
| shadowOpacity | №1360 |
| shadowStep | №0649 |
| shag | №0062 (+ 1 других файлов) |
| shakeItOff | №0717 (+ 1 других файлов) |
| Shaman | №0708 |
| shape | №0062 (+ 8 других файлов) |
| shapechange | №0780 |
| shapeChangeSave | №0780 |
| shapeFemale | №1173 |
| shapeHead | №0062 |
| shapeMale | №1173 (+ 1 других файлов) |
| shaper | №0715 (+ 1 других файлов) |
| Shaper | №0796 |
| shapes | №0060 (+ 1 других файлов) |
| sharedAdvantage | №0780 |
| shareDamage | №0819 |
| shareDanceBonus | №0810 |
| sharedBonusAction | №0780 (+ 1 других файлов) |
| sharedHp | №0780 |
| sharedImmortality | №0780 |
| sharedInitiative | №0840 |
| sharedProperties | №0080 (+ 1 других файлов) |
| sharedReaction | №0777 (+ 2 других файлов) |
| sharedStealth | №0687 |
| shareSaves | №0814 |
| shareSensesHours | №0780 |
| sharpMind | №0830 |
| sharpshooter | №0783 |
| shaved | №0060 (+ 1 других файлов) |
| shelf | №0068 |
| shell | №0785 |
| shellColor | №0067 (+ 1 других файлов) |
| shellDestroyed | №0785 |
| shellHealing | №0785 |
| shellHP | №0785 |
| shellMaxHP | №0785 |
| shellName | №0785 |
| shells | №1368 |
| shellSize | №0067 (+ 1 других файлов) |
| shield_master | №0783 |
| shieldACBonus | №0780 |
| shieldAllowed | №0780 |
| shieldAttackBonus | №0780 |
| shieldDamage | №0780 |
| shielded | №0642 (+ 1 других файлов) |
| Shielded | №0780 |
| shieldFrame | №0668 (+ 1 других файлов) |
| shieldImpact | №0780 |
| shieldmaker | №0671 |
| shieldMartial | №0780 |
| shieldSlam | №0780 (+ 1 других файлов) |
| shieldWarrior | №0780 |
| shift | №0802 |
| shifter | №0673 (+ 1 других файлов) |
| shifterNaturalWeapon | №0834 |
| shinL | №0060 |
| shinR | №0060 |
| shipchandler | №0802 (+ 1 других файлов) |
| shippedSha256 | №1202 |
| shirt | №0063 |
| shirt_long | №1168 (+ 1 других файлов) |
| shockingStrike | №0780 |
| shockingStrikeDamage | №0780 |
| short | №0062 (+ 1 других файлов) |
| shortRest | №0079 (+ 1 других файлов) |
| shortRestHealing | №0840 |
| shortRestHealingAllowed | №0870 |
| shortRestSlots | №0780 |
| shoulders | №0064 (+ 6 других файлов) |
| shouldSuppressRestHP | №0785 (+ 1 других файлов) |
| shove | №0777 |
| shredding | №0780 |
| shreddingFree | №0780 |
| shuffle | №0083 |
| side | №0062 (+ 2 других файлов) |
| side_part | №0062 (+ 1 других файлов) |
| sideEffect | №0780 |
| sideEffects | №0081 |
| sides | №0656 (+ 8 других файлов) |
| siege | №0671 (+ 2 других файлов) |
| siegeInteraction | №0632 |
| sightBlocked | №0075 |
| sigilEligible | №0633 |
| sigilicGrace | №0780 |
| signal | №0654 (+ 2 других файлов) |
| signature | №0794 (+ 1 других файлов) |
| signatureSpells | №0649 |
| signup | №0654 |
| silent | №0819 |
| silentCheck | №0843 |
| silentStalker | №0780 |
| silk | №0063 |
| silkwormSilk | №0674 |
| silver | №0669 (+ 2 других файлов) |
| silvered | №0656 (+ 1 других файлов) |
| site | №0796 |
| sixthMetamorphosis | №0780 |
| size | №0062 (+ 45 других файлов) |
| size_mb | №1200 |
| sizeBytes | №1204 |
| sizeCategory | №0067 (+ 1 других файлов) |
| sizeChange | №0079 |
| sizeFt | №0079 (+ 1 других файлов) |
| sizeIncrease | №0777 (+ 1 других файлов) |
| skeleton | №0067 (+ 2 других файлов) |
| skill | №0629 (+ 13 других файлов) |
| skillAdvantage | №0642 |
| skillBonus | №0777 (+ 3 других файлов) |
| skillChoices | №0785 (+ 3 других файлов) |
| skilled | №0664 (+ 1 других файлов) |
| skilledRider | №0780 |
| skillId | №0773 (+ 3 других файлов) |
| skillModifiers | №0642 |
| skillProficiency | №0780 |
| skillProficient | №0656 (+ 1 других файлов) |
| skills | №0625 (+ 26 других файлов) |
| skillsChoose | №0079 (+ 1 других файлов) |
| skillsData | №0625 (+ 2 других файлов) |
| skiltKrigga | №0780 |
| skin | №0059 (+ 8 других файлов) |
| skin_names | №1200 |
| skinCompatible | №0067 |
| skinDetail | №0067 (+ 6 других файлов) |
| skinFamily | №0067 |
| skinGlow | №0067 (+ 2 других файлов) |
| skinId | №0067 (+ 1 других файлов) |
| skinMaterial | №0067 |
| skinned_primitives | №1200 |
| skinPositions | №0059 |
| skins | №0069 (+ 4 других файлов) |
| skinSurface | №0064 (+ 5 других файлов) |
| skipDefeated | №0784 |
| skirt | №0063 |
| skirtProfile | №0063 |
| slamDamage | №0780 |
| slamMagical | №0780 |
| slash | №0075 (+ 1 других файлов) |
| slashing | №0872 |
| slashTexture | №0077 |
| slaymateRitual | №0810 |
| sleep | №0780 (+ 1 других файлов) |
| Sleep | №0081 |
| sleepImmune | №0819 |
| sleepUntilStartNextTurnOrDamage | №0780 |
| sleepwalker | №0780 |
| sleeves | №0063 (+ 2 других файлов) |
| sleightBonus | №0780 |
| sleightingImprecation | №0780 |
| sleightOfHand | №0773 (+ 1 других файлов) |
| slick_back | №0062 (+ 1 других файлов) |
| slime | №0064 |
| slimeCovered | №0079 |
| slimeFiber | №0827 |
| slimeReagent | №0827 |
| slipperyMind | №0649 |
| slipTurns | №0822 (+ 1 других файлов) |
| slit | №1168 (+ 2 других файлов) |
| slitHeight | №1168 (+ 1 других файлов) |
| slot | №0063 (+ 9 других файлов) |
| slotKind | №0649 |
| slotLevel | №0642 (+ 12 других файлов) |
| slotLevels | №1309 |
| slots | №0063 (+ 8 других файлов) |
| slotsByLevel | №0810 |
| slotSpent | №0814 |
| slotsRefresh | №0845 |
| slotsUsed | №0787 |
| slowFall | №0649 |
| slowFt | №0642 |
| small | №0068 (+ 2 других файлов) |
| smith | №0669 (+ 7 других файлов) |
| smoke | №0079 |
| smokeBomb | №0780 |
| smokeCloud | №0079 |
| snake | №0820 |
| snapshot | №0654 (+ 10 других файлов) |
| snapshots | №0079 |
| sneakApplied | №0656 (+ 1 других файлов) |
| sneakAttack | №0649 |
| sneakAttackDice | №0787 (+ 1 других файлов) |
| sneakEligible | №1309 |
| sneakStyle | №0855 |
| snout | №0062 |
| social | №0629 (+ 12 других файлов) |
| socialAdvantage | №0777 |
| socialBonus | №0810 |
| socket | №0062 |
| socks | №0063 (+ 3 других файлов) |
| solidified | №0780 |
| soloShieldAC | №0780 |
| solvent | №0079 |
| somatic | №0761 (+ 10 других файлов) |
| somaticMaterialFree | №0780 |
| somnolence | №0780 |
| songOfRest | №0649 |
| songsOfWarPeace | №0780 |
| soothingSpeech | №0780 |
| sorcerer | №0799 (+ 1 других файлов) |
| sorcerousOriginMastery | №0649 |
| sorcerousRestoration | №0649 |
| sorceryPoints | №0649 (+ 2 других файлов) |
| sort | №0794 |
| soulEater | №0642 (+ 1 других файлов) |
| soulOfArtifice | №0649 |
| soulSight | №0814 |
| soulToyConversion | №0810 |
| source | №0059 (+ 113 других файлов) |
| SOURCE | №0667 |
| SOURCE_TAG | №0671 |
| sourceCommit | №1975 |
| sourceDead | №0870 |
| sourceDisplacementMax | №1208 |
| sourceDisplacementMean | №1208 |
| sourceFor | №0082 |
| sourceGlb | №1197 |
| sourceGlbSha256 | №1397 |
| sourceHashes | №1397 |
| sourceId | №0078 (+ 30 других файлов) |
| sourceIndices | №0062 |
| sourceKey | №0796 |
| sourceLabel | №0629 (+ 10 других файлов) |
| sourceMaxDisplacement | №1207 |
| sourceMeanDisplacement | №1207 |
| sourceMeshes | №0064 |
| sourceName | №0701 (+ 3 других файлов) |
| sourceNonZeroEntries | №1207 |
| sourcePack | №0629 (+ 11 других файлов) |
| sourcePacks | №0631 (+ 2 других файлов) |
| sourceProject | №1397 |
| sourceQuantity | №0665 |
| sourceRule | №0082 |
| sources | №0082 (+ 13 других файлов) |
| sourceSha256 | №1202 (+ 1 других файлов) |
| sourceStackTerms | №1397 |
| sourceTarget | №1197 |
| sourceType | №0079 (+ 15 других файлов) |
| sourceVersion | №0727 (+ 3 других файлов) |
| sovereignOfFate | №0780 |
| sp | №0791 (+ 5 других файлов) |
| space | №0840 |
| span | №0062 |
| sparse | №1198 |
| spatialManipulation | №0780 |
| speakWithBeastsAndPlants | №0780 |
| special | №0669 |
| specialization | №0671 (+ 2 других файлов) |
| specializationBonus | №0671 |
| specializationList | №0671 |
| specializations | №0671 |
| specialReactionPerOtherCreatureTurn | №0780 |
| specialSightFt | №0819 |
| specialtyTags | №0668 |
| species | №0062 (+ 4 других файлов) |
| spectral | №0062 |
| spectralFiber | №0668 (+ 1 других файлов) |
| spectralIndices | №0062 |
| spectralMounts | №0810 |
| spectralParts | №0062 |
| spectralReagent | №0827 |
| spectralThreadV49 | №0668 |
| speed | №0625 (+ 38 других файлов) |
| Speed | №0081 |
| speedBonus | №0780 |
| speedBonusFt | №0642 (+ 1 других файлов) |
| speedDouble | №0780 |
| speedFt | №0812 |
| speedHalf | №0780 |
| speedMultiplier | №0810 (+ 1 других файлов) |
| speedPenalty | №0642 |
| speedPenaltyFt | №0642 (+ 1 других файлов) |
| speedReductionFt | №0687 |
| speedZeroSave | №0780 |
| spell | №0649 (+ 6 других файлов) |
| spellAttack | №0780 (+ 3 других файлов) |
| spellAttackBonus | №0780 (+ 2 других файлов) |
| spellAttackUsesWisdom | №0780 |
| spellblade | №0780 (+ 1 других файлов) |
| Spellblade | №0796 |
| spellbladeSource | №0796 |
| spellCaster | №0812 (+ 1 других файлов) |
| spellcasting | №0708 (+ 10 других файлов) |
| spellcastingAbility | №0079 |
| spellcastingFocus | №0780 |
| spellDamageModifiers | №0649 (+ 2 других файлов) |
| spellDamageVulnerability | №0780 |
| spellHealingOrDamage | №0814 |
| spellId | №0656 (+ 9 других файлов) |
| spellLevel | №0649 (+ 10 других файлов) |
| spellLevelCap | №0814 |
| spellLevelMax | №0780 |
| spellLevels | №0814 |
| spellList | №0804 |
| spellLists | №0715 |
| spellMastery | №0649 |
| spellName | №0656 (+ 18 других файлов) |
| spells | №0787 (+ 11 других файлов) |
| spellSaveDC | №0780 (+ 2 других файлов) |
| spellsData | №0625 (+ 4 других файлов) |
| spellsDoNotCountAgainstKnown | №0780 |
| Spellshot | №0796 |
| spellsKnown | №0708 (+ 2 других файлов) |
| spellSlotKind | №0649 |
| spellSlotLevel | №0649 |
| spellSlots | №0649 (+ 2 других файлов) |
| spellSlotsData | №0625 (+ 14 других файлов) |
| spellSlotSubstitute | №0810 |
| spellSlotTable | №0828 (+ 1 других файлов) |
| spellSources | №0828 |
| spellStat | №0625 (+ 1 других файлов) |
| spellStats | №0828 |
| spellStoringItem | №0649 |
| spellstrike | №0780 |
| spellTable | №0642 |
| spellUses | №0804 |
| spellUsesByLevel | №0804 |
| Spellweaver | №0796 |
| spend | №0784 |
| spendAction | №0784 |
| spendCharges | №0780 |
| spendCoin | №0819 |
| spendDynamo | №0079 |
| spendExtendedResource | №0649 |
| spendMovement | №0784 |
| spendMovementReward | №0822 |
| spendReaction | №0819 |
| spendResource | №0828 |
| spendSpellSlot | №0780 |
| spent | №0687 (+ 4 других файлов) |
| spices | №0674 |
| spider | №0687 |
| spiderSilk | №0668 (+ 1 других файлов) |
| spines | №0067 |
| spiral | №0067 |
| spirit | №0845 (+ 1 других файлов) |
| spiritAttacks | №0785 |
| spiritCommunication | №0814 |
| spiritDamage | №0814 |
| spiritDamageBonus | №0814 |
| spiritForm | №0785 |
| spiritHP | №0785 |
| spiritMantle | №0845 |
| spiritMaxHP | №0785 |
| spiritRangeFt | №0814 |
| spiritTypes | №0708 |
| spiritualDefense | №0845 |
| splashDice | №0079 |
| split | №0780 |
| splitAmongTargets | №0780 |
| splitDamage | №0780 |
| sporeling | №0687 |
| spread | №0059 |
| springSteel | №0674 |
| spurredArmy | №0780 |
| square | №0064 (+ 1 других файлов) |
| squaredCircle | №0717 |
| src | №0083 (+ 4 других файлов) |
| stability | №0081 (+ 1 других файлов) |
| Stability | №0081 |
| stable | №0802 (+ 2 других файлов) |
| stack | №0068 (+ 1 других файлов) |
| stacks | №0687 |
| stage | №0785 (+ 3 других файлов) |
| stage10 | №0079 |
| staged | №0843 |
| stair | №0068 |
| stairFrom | №0077 |
| stairHeight | №1240 |
| stairs | №0068 |
| stairTo | №0077 |
| stale | №0866 |
| stalkersProwess | №0642 |
| stalwartDefender | №0780 |
| stalwartSpirit | №0872 |
| stance | №0780 (+ 2 других файлов) |
| stanceRadiusFt | №0780 |
| stand | №0068 |
| standard | №0666 (+ 2 других файлов) |
| standingJump | №0780 |
| standTheFallen | №0780 |
| standUp | №0780 |
| start | №0715 |
| startActorTurn | №0642 |
| startedAt | №0863 |
| startedAtTurn | №0079 |
| startedTurn | №0819 |
| startElevation | №0819 |
| startingEquipment | №0079 (+ 3 других файлов) |
| startLevel | №0834 |
| startlingJinx | №0780 |
| startTurn | №0078 (+ 13 других файлов) |
| startTurnDamage | №0780 |
| startTurnHeal | №0780 |
| startTurnHealing | №0780 |
| startTurnNecrotic | №0780 |
| startX | №0819 (+ 1 других файлов) |
| startY | №0819 (+ 1 других файлов) |
| stat | №0078 (+ 21 других файлов) |
| STAT_ALIASES | №0828 |
| STAT_META | №0870 |
| statblock | №0079 |
| statBlock | №0834 (+ 1 других файлов) |
| statBonus | №0747 (+ 4 других файлов) |
| state | №0656 (+ 19 других файлов) |
| stateRevision | №0811 (+ 6 других файлов) |
| states | №0840 |
| stats | №0625 (+ 50 других файлов) |
| status | №0833 (+ 58 других файлов) |
| STATUS | №0079 |
| stdio | №1156 (+ 2 других файлов) |
| steadfastOrder | №0780 |
| steadfastToughness | №0872 |
| stealth | №0773 (+ 1 других файлов) |
| stealthAdvantage | №0780 |
| stealthBonus | №0780 |
| stealthDisadvantage | №0085 |
| steed | №0658 |
| steel | №0669 (+ 3 других файлов) |
| steelBillet | №0674 |
| steelWire | №0674 |
| steelWireV38 | №1190 |
| stencil | №0074 |
| step | №0076 (+ 1 других файлов) |
| stepWind | №0649 |
| stickAndMove | №0780 |
| stillnessOfMind | №0649 |
| stock | №0800 (+ 2 других файлов) |
| stockCount | №0801 |
| stocky | №0067 |
| stolen | №0819 |
| stolenSpark | №0780 |
| stone | №0068 (+ 4 других файлов) |
| Stoneblood | №0796 |
| stonecutter | №0802 (+ 1 других файлов) |
| stoneDust | №0673 |
| stoneForm | №0780 |
| stoneFormToggle | №0780 |
| stoneReductionAppliesToMagic | №0780 |
| stoneToFlesh | №0780 |
| stool | №0068 |
| stop | №0848 |
| stopIntruder | №0777 |
| stopOnDefeat | №0784 (+ 4 других файлов) |
| stopped | №0819 (+ 1 других файлов) |
| storage | №0814 (+ 2 других файлов) |
| STORAGE_KEY | №0667 |
| stored | №0810 |
| storedHealingMax | №0780 |
| storm | №0642 |
| str | №0625 (+ 61 других файлов) |
| straight | №0067 |
| straightLine | №0780 |
| strands | №1351 |
| strangeMetabolism | №0642 |
| strategicAdjustments | №0780 |
| strategist | №0740 (+ 1 других файлов) |
| strBonus | №0642 |
| strChecksDisadvantage | №0642 (+ 1 других файлов) |
| strDexChecksDisadvantage | №0642 (+ 1 других файлов) |
| strDexSaveAdvantage | №0780 |
| stream | №0887 |
| streetSmart | №0717 |
| streetwise | №0780 |
| strength | №0787 (+ 11 других файлов) |
| Strength | №0081 |
| strengthAdvantage | №0819 |
| strengthFloor | №0819 |
| strengthInNumbers | №0780 |
| strengthMaxBonus | №0780 |
| strengthOrDexterity | №0699 (+ 3 других файлов) |
| strenuous | №0082 (+ 1 других файлов) |
| stressPressure | №0630 |
| strikeDice | №0780 |
| strIncrease | №0780 |
| strMaxBonus | №0642 |
| strMaxIncrease | №0780 |
| strokeOfLuck | №0649 |
| strongbow | №0780 |
| strOrDexSave | №0780 |
| strSave | №0780 |
| strSavesDisadvantage | №0642 (+ 1 других файлов) |
| stubble | №0062 (+ 1 других файлов) |
| student | №0777 |
| stun | №0777 |
| stunIfFailedBy5 | №0642 |
| stunned | №0780 (+ 2 других файлов) |
| stunnedUntilEndOfNextTurn | №0780 |
| stunning | №0780 |
| stunningStrike | №0649 (+ 1 других файлов) |
| stunOnFail | №0780 |
| stunOnFailBy5 | №0780 |
| style | №0780 (+ 32 других файлов) |
| styles | №0814 |
| sub | №1151 |
| subclass | №0787 (+ 20 других файлов) |
| SUBCLASS_FEATURES | №0649 |
| subclassBonds | №0687 |
| subclassDeepMagic | №0699 |
| subclasses | №0078 (+ 24 других файлов) |
| subclassFeature | №0777 |
| subclassFeatureCatalog | №0717 |
| subclassFeatureIdResolution | №0678 |
| subclassFeatureLevels | №0078 (+ 20 других файлов) |
| subclassId | №0662 (+ 2 других файлов) |
| subclassLevel | №0078 (+ 41 других файлов) |
| subclassSystem | №0678 (+ 4 других файлов) |
| subclassUse | №0780 |
| subjugateThrall | №0780 |
| subtle | №0649 (+ 1 других файлов) |
| subtractD8 | №0780 |
| subtractHemocraftDie | №0642 |
| subtree | №0793 (+ 3 других файлов) |
| success | №0079 (+ 24 других файлов) |
| successes | №0656 (+ 14 других файлов) |
| successorClientId | №1327 |
| successTempHp | №0780 |
| suit | №0822 |
| suite | №0855 |
| summary | №0629 (+ 12 других файлов) |
| summon | №0777 (+ 3 других файлов) |
| summonDevilJurist | №0780 |
| summonedId | №0819 |
| summonFamiliar | №0780 |
| summonFiendAt0HP | №0780 |
| summonOoze | №0079 |
| summonSpellId | №0831 |
| sunAura | №0819 |
| sunlightAttackAndPerceptionDisadvantage | №0780 |
| sunlightAttackAndSightDisadvantage | №0642 |
| sunlightHazard | №0810 |
| Sunwatcher | №0796 |
| superior | №0666 |
| superiorInspiration | №0649 |
| superiorInterdict | №0699 |
| superiorInterdictRestore | №0699 |
| superiorityDice | №0649 |
| supernal | №0780 (+ 1 других файлов) |
| supported | №0059 (+ 1 других файлов) |
| supportFetchAPI | №0887 |
| supportRangeFt | №0780 |
| suppressAilments | №0780 |
| suppressResistanceAndImmunity | №0780 |
| surface | №0067 |
| surfaceMaxDistance | №1206 (+ 1 других файлов) |
| surfaceMeanDistance | №1197 (+ 3 других файлов) |
| surfaceMedianDistance | №1197 (+ 3 других файлов) |
| surfaceP95Distance | №1197 (+ 3 других файлов) |
| surpriseAttack | №0780 |
| surveySettlement | №0780 |
| surveyWilderness | №0780 |
| survival | №0773 (+ 2 других файлов) |
| survive | №0736 |
| survivor | №0649 |
| suspended | №0656 (+ 1 других файлов) |
| sutureCost | №0810 |
| sutureOptions | №0810 |
| swamp | №0064 (+ 2 других файлов) |
| swapCard | №0822 |
| swappedTurns | №0822 (+ 2 других файлов) |
| swapWithThrallRangeFt | №0810 |
| swarm | №0062 (+ 2 других файлов) |
| swarm_bats | №1363 |
| swarm_beetles | №1363 |
| swarm_rats | №1363 |
| swarmCore | №0062 |
| swarmFloor | №0062 |
| swarmForm | №0064 (+ 3 других файлов) |
| swarmParts | №0062 |
| swarmPercent | №0064 (+ 3 других файлов) |
| swarmUnit | №0062 |
| swarmVortex | №0062 |
| sweep | №0062 (+ 1 других файлов) |
| sweepAttack | №0780 |
| sweepingStrike | №0780 |
| sweetDreams | №0780 |
| sweetScience | №0717 |
| swept | №0067 |
| swift | №0780 |
| Swiftblade | №0796 |
| swiftJinx | №0780 |
| swimFt | №0642 |
| swimSpeed | №0780 |
| swimSpeedEqualsWalking | №0780 |
| swine | №0775 |
| switchAlly | №0780 |
| swords | №0819 (+ 1 других файлов) |
| symbiosis | №0817 |
| sync | №0079 (+ 19 других файлов) |
| syncClassResources | №0649 |
| syncFromInitiative | №1270 |
| syncState | №0078 |
| syncTarotEntity | №0819 |
| synergy | №0080 (+ 1 других файлов) |
| t | №0059 (+ 1 других файлов) |
| tab | №0850 (+ 3 других файлов) |
| table | №0068 (+ 18 других файлов) |
| tacticalExploit | №0740 |
| tacticalReposition | №0780 |
| tacticalSkill | №0740 |
| tacticalSuperiority | №0740 |
| tactician | №0783 (+ 1 других файлов) |
| Tactician | №0796 |
| tag | №0062 (+ 1 других файлов) |
| tagName | №1306 |
| tags | №0062 (+ 28 других файлов) |
| tail | №0062 |
| tailColor | №0067 (+ 3 других файлов) |
| tailCurve | №0067 (+ 1 других файлов) |
| tailLength | №0067 (+ 5 других файлов) |
| tailoring | №0063 |
| tailThickness | №0067 (+ 3 других файлов) |
| tailTip | №0064 (+ 1 других файлов) |
| tailTuftSize | №0067 (+ 1 других файлов) |
| takeAttack | №0836 |
| talent | №0780 |
| talentProgression | №0715 |
| talents | №0715 (+ 1 других файлов) |
| tannin | №0674 |
| target | №0062 (+ 46 других файлов) |
| targetAc | №0812 (+ 3 других файлов) |
| targetCount | №0780 |
| targetDefeated | №0656 (+ 3 других файлов) |
| targetedAllyAdvantage | №0780 |
| targetEntries | №1207 (+ 1 других файлов) |
| targetExtraRadiant | №0804 |
| targetFile | №1207 (+ 1 других файлов) |
| targetId | №0061 (+ 34 других файлов) |
| targetKey | №0078 |
| targetLevel | №0701 |
| targetMode | №0868 |
| targetName | №0785 (+ 2 других файлов) |
| targetOncePerLongRest | №0810 |
| targetPeerId | №0812 |
| targetRadiantDamage | №0780 |
| targetRequired | №0780 |
| targets | №0079 (+ 12 других файлов) |
| targetSelfOrTouch | №0780 |
| targetsFatigueRadiusFt | №0780 |
| targetsUpTo | №0780 |
| targetTurns | №0642 |
| targetType | №0814 |
| tarotActorRef | №0819 |
| tarotCoin | №0819 |
| tarotDamageTotals | №1970 |
| tarotEffects | №1189 |
| tarotKnowledge | №1189 (+ 1 других файлов) |
| tarotLastStartedTurn | №1189 (+ 1 других файлов) |
| tarotModeApplied | №0656 (+ 1 других файлов) |
| tarotOwnerId | №0819 |
| tarotReaction | №0656 |
| tarotScene | №0656 (+ 14 других файлов) |
| taunt | №0777 (+ 1 других файлов) |
| team | №0079 (+ 8 других файлов) |
| teamAttackBonus | №0819 |
| techniques | №0836 |
| telekinesis | №0777 (+ 1 других файлов) |
| telekinesisLiftBonus | №0780 |
| telekinetic | №0783 |
| telekineticForce | №0780 |
| telekineticPush | №0780 |
| telepathic | №0783 |
| telepathicIntrusion | №0780 |
| telepathicIntrusionSave | №0780 |
| telepathy | №0780 |
| telepathyFt | №0777 |
| teleport | №0079 |
| teleportAllyId | №0820 (+ 2 других файлов) |
| teleportBetweenPaint | №0079 |
| teleportDamage | №0780 |
| teleported | №0819 |
| teleportFt | №0687 (+ 3 других файлов) |
| teleportNearTarget | №0780 |
| teleportRangeFt | №0810 |
| teleportSave | №0780 |
| teleportToImpact | №0079 |
| teleportWithFamiliar | №0814 |
| temp | №0787 (+ 3 других файлов) |
| tempAbsorbed | №0656 |
| temperament | №0802 |
| tempHp | №0079 (+ 19 других файлов) |
| tempHP | №0814 (+ 3 других файлов) |
| tempHpAtStartTurn | №0780 |
| tempHpBonus | №0780 |
| tempHpDice | №0780 |
| tempHpEach | №0780 |
| tempHpFromCharnel | №0810 |
| tempHpFromLightningDamage | №0780 |
| tempHpFromSealDamage | №0780 |
| tempHpOnApplause | №0777 |
| tempHpOnEnemyReducedToZero | №0780 |
| tempHpOnWake | №0780 |
| tempHpPerDie | №0780 |
| template | №0062 |
| templateNormals | №0062 |
| templates | №0658 |
| temple | №0802 (+ 1 других файлов) |
| temporary | №0780 |
| temporaryHp | №0783 |
| temporaryHP | №0079 |
| terrain | №0879 |
| terrorAndDecay | №0780 |
| terrorDie | №0780 |
| terrorizingForce | №0699 |
| test | №1160 |
| testMode | №0843 (+ 1 других файлов) |
| tests | №0855 |
| tethered | №0780 |
| TEXCOORD_0 | №1203 |
| texLoc | №0074 |
| text | №0813 (+ 2 других файлов) |
| textContent | №1306 |
| textile | №0671 |
| texture | №0063 (+ 4 других файлов) |
| Texture | №0071 |
| textures | №0074 (+ 1 других файлов) |
| textureTile | №0063 |
| thaumaturgy | №0780 |
| thaumaturgyEnhanced | №0810 |
| thenResistance | №0642 |
| thievesToolsBonus | №0780 |
| thieving | №0780 |
| thighL | №0060 |
| thighR | №0060 |
| thirdDisciplineLevel | №0715 |
| thirdparty | №0661 |
| thornsDice | №0870 |
| thrallAdvantage | №0810 |
| thrallAura | №0810 |
| thrallDance | №0810 |
| thrallDeathExplosion | №0810 |
| thrallEthereal | №0810 |
| thrallFlight | №0810 |
| thrallInvisible | №0810 |
| thralls | №0810 |
| thrallSlots | №0810 |
| thrallType | №0810 |
| thrallTypes | №0810 |
| thread | №0668 (+ 4 других файлов) |
| thresholds | №0806 |
| thrillOfTheHunt | №0780 |
| thrownRange | №0780 |
| thunder | №0649 |
| tiedMaximumsAllActive | №0870 |
| tier | №0666 |
| tights | №0063 |
| tile | №0063 |
| tiles | №0072 (+ 2 других файлов) |
| time | №0062 (+ 13 других файлов) |
| timeFrozen | №0819 |
| timelessBody | №0649 |
| timeMinutes | №1158 |
| timeout | №1199 (+ 37 других файлов) |
| timer | №0848 |
| times | №0069 |
| timestamp | №1151 |
| timeStop | №0819 |
| tinker | №0671 (+ 3 других файлов) |
| tinkerer | №0672 |
| tinOre | №0674 |
| tiny | №0817 (+ 1 других файлов) |
| tinyServant | №1263 |
| tissue | №0059 (+ 1 других файлов) |
| title | №0643 (+ 5 других файлов) |
| to | №0633 (+ 2 других файлов) |
| toad | №0687 |
| toggle | №0661 (+ 1 других файлов) |
| toggleCondition | №0656 (+ 3 других файлов) |
| toHit | №0875 (+ 3 других файлов) |
| token | №0654 (+ 3 других файлов) |
| tokenList | №1305 (+ 2 других файлов) |
| tokens | №0072 (+ 28 других файлов) |
| tombGuardian | №0780 |
| tool | №0627 (+ 20 других файлов) |
| toolAliases | №1971 |
| toolBonus | №0809 |
| toolLabels | №1971 |
| toolMastery | №0819 |
| toolName | №1158 |
| toolProficiencies | №0625 (+ 2 других файлов) |
| toolRequired | №0879 |
| tools | №0079 (+ 27 других файлов) |
| toolsAdvantage | №0819 |
| top | №0064 (+ 12 других файлов) |
| top10LargestMapped | №1208 |
| topknot | №0062 (+ 1 других файлов) |
| topY | №0063 |
| torso | №0062 (+ 2 других файлов) |
| torsoRidgeSize | №0067 (+ 4 других файлов) |
| torsoRidgeWidth | №0067 (+ 2 других файлов) |
| tortle | №1380 |
| total | №0629 (+ 53 других файлов) |
| total_length | №1200 |
| totalCp | №0800 |
| totalDomination | №0780 |
| totalGp | №0803 |
| totalLeather | №0664 |
| totalLength | №1209 |
| totalLevel | №0828 |
| totemSpirit | №0649 |
| toTheMat | №0780 |
| touchCurseThreshold | №0810 |
| touchedGlbVertexPct | №1208 |
| touchedGlbVertices | №1208 |
| touchMaxHpCut | №0810 |
| touchParalyzeThreshold | №0810 |
| touchRangeBonusFt | №0810 |
| touchThreshold | №0810 |
| towerShield | №0872 |
| town | №0068 |
| toxins | №0671 |
| toyArmy | №0810 |
| toymaker | №0810 |
| toySoulVault | №0810 |
| track | №0083 |
| trackInscribedRunesAnyPlane | №0780 |
| traderCount | №0801 |
| traderId | №0802 |
| traders | №0800 (+ 1 других файлов) |
| TRADERS | №0800 |
| tradition | №0814 (+ 1 других файлов) |
| traditionAction | №0814 |
| traditionRites | №0708 |
| traditions | №0708 (+ 1 других файлов) |
| trainHumanoids | №0780 |
| traits | №0659 (+ 2 других файлов) |
| transactionRevision | №0812 |
| transcended | №0715 (+ 1 других файлов) |
| Transcended | №0796 |
| transfer | №0817 |
| transferCondition | №0780 |
| transferDamage | №0780 |
| transferringAffliction | №0780 |
| transform | №0810 |
| transformed | №0819 |
| translation | №1163 |
| transport | №0811 |
| transposition | №0780 |
| traps | №0671 |
| treasure | №0068 |
| triangles | №0064 (+ 4 других файлов) |
| trickster | №0822 (+ 2 других файлов) |
| tricksterStatus | №0822 |
| tricksterTurn | №0819 |
| trigger | №0780 (+ 3 других файлов) |
| triggerDamageTypes | №0642 |
| triggerHealing | №0804 |
| triggerId | №0656 (+ 2 других файлов) |
| triggerMiraculousHealing | №0780 |
| triggerOnNearbyKill | №0642 |
| triggerOnPsychicDamage | №0780 |
| triggerSpend | №0810 |
| trough | №0068 |
| trousers | №0063 |
| trueSight | №0814 |
| truesightFt | №0780 |
| trunkSize | №0067 (+ 1 других файлов) |
| truth | №0804 |
| truthful | №0819 |
| truthfulIds | №0819 |
| ts | №0852 |
| turn | №0810 |
| turned | №0649 |
| turnEnd | №0819 |
| turnId | №1246 |
| turnIds | №0822 (+ 2 других файлов) |
| turnResources | №0079 (+ 34 других файлов) |
| turns | №0642 |
| turnStart | №0819 |
| turnUndead | №0649 |
| turtle | №0062 |
| tuskSize | №0067 (+ 2 других файлов) |
| twin_braids | №0062 (+ 1 других файлов) |
| twin_tails | №0062 (+ 1 других файлов) |
| twinFamiliar | №0780 |
| twinned | №0649 |
| twoRevelations | №0814 |
| type | №0071 (+ 113 других файлов) |
| typedDice | №0819 |
| typedExtraDice | №0079 (+ 3 других файлов) |
| typeKey | №0875 (+ 4 других файлов) |
| types | №0675 |
| u | №0062 (+ 1 других файлов) |
| uiGather | №0082 |
| uiRequired | №0715 |
| umbralImprecation | №0780 |
| unarmed | №0780 |
| unarmedAttack | №0642 (+ 3 других файлов) |
| unarmedAttackBonus | №0780 |
| unarmedDamage | №0780 |
| unarmedGraft | №1158 |
| unarmoredAC | №0780 |
| unavailable | №0078 (+ 11 других файлов) |
| unavoidableAccident | №0780 |
| unbreakable | №0642 (+ 2 других файлов) |
| Unbreakable | №0780 |
| unbreakableExploit | №0780 |
| unbridledChaos | №0780 |
| uncannyDodge | №0649 |
| unchanged | №1202 |
| uncommon | №0794 (+ 5 других файлов) |
| unconsciousAtFatigueGteCurrentHp | №0780 |
| unconsciousOrStunnedOnly | №0780 |
| undead | №0629 (+ 15 других файлов) |
| undeadFocusAvailable | №0642 |
| undeadFocusReaction | №0642 |
| undercut | №0062 (+ 1 других файлов) |
| underdark | №0064 |
| underwaterDarkvision | №0834 |
| underwear | №0063 |
| underwearBottom | №0067 (+ 5 других файлов) |
| underwearTop | №0067 (+ 6 других файлов) |
| undo | №0064 |
| undying | №0642 (+ 2 других файлов) |
| undyingServitude | №0810 |
| unequip | №0067 |
| unerringEye | №0780 |
| unfortunateAccident | №0780 |
| ungulate | №0775 |
| uniforms | №1159 |
| uniquePositionVertexCounts | №1209 |
| unit | №0062 (+ 4 других файлов) |
| unitGp | №0803 |
| units | №0800 |
| unknown | №1151 (+ 2 других файлов) |
| unleashed | №0715 (+ 1 других файлов) |
| unlimitedHybrid | №0780 |
| unlockRank | №0671 |
| unlockSchedule | №0822 |
| unreducedNecrotic | №0780 |
| unreducedSelfDamage | №0780 |
| unreducible | №0780 |
| unrivaledGenius | №0830 |
| unsealed | №0642 |
| unsealedArcana | №0642 |
| unsealedAspectReplacement | №0845 |
| unseen | №1268 |
| unshackledPower | №0780 |
| unstable | №0080 (+ 1 других файлов) |
| unstoppable | №0872 |
| unsupported | №0078 (+ 17 других файлов) |
| until | №0079 (+ 1 других файлов) |
| untilDismissed | №0780 |
| untilOwnEnd | №0819 |
| untilOwnEndAfterNext | №0819 |
| untilOwnerEnd | №0819 (+ 1 других файлов) |
| untilOwnerStart | №0819 |
| untilOwnStart | №0819 (+ 2 других файлов) |
| untilRound | №0819 |
| unwaveringWill | №0740 |
| unyieldingResolve | №0736 |
| unyieldingWill | №0830 |
| update | №0831 (+ 1 других файлов) |
| updateAvailable | №0843 |
| updated | №0834 (+ 1 других файлов) |
| updated_at | №1189 |
| updatedAt | №0072 (+ 1 других файлов) |
| updateSwarm | №0062 |
| upperArmL | №0060 |
| upperArmR | №0060 |
| urbanAdvantage | №0777 |
| uri | №1198 |
| url | №0069 (+ 4 других файлов) |
| URL | №1281 (+ 5 других файлов) |
| urls | №0887 |
| ursine | №0775 |
| use | №0687 (+ 1 других файлов) |
| useCount | №0780 |
| used | №0625 (+ 21 других файлов) |
| usedBloodLevels | №0814 |
| usedBy | №0674 (+ 1 других файлов) |
| usedByV38 | №0673 (+ 1 других файлов) |
| usedCount | №0655 |
| usedLevels | №0814 |
| useDominantOrgan | №0870 |
| usedThisRound | №0806 |
| useFeature | №0079 (+ 16 других файлов) |
| useIntForStr | №0780 |
| useIntForStrengthOrDexOnSurge | №0780 |
| useLeadership | №0780 |
| user | №0654 (+ 1 других файлов) |
| user_metadata | №1151 |
| userAgent | №0849 (+ 1 других файлов) |
| useRules | №0784 (+ 23 других файлов) |
| uses | №0699 (+ 5 других файлов) |
| usesAlchemistSupplies | №0812 |
| usesIntForPerception | №0780 |
| usesPerLongRest | №0079 (+ 2 других файлов) |
| usesPerRest | №0810 |
| usesPerTurn | №0780 |
| useSpiritAbility | №0785 |
| usesStrength | №0657 (+ 1 других файлов) |
| useStrength | №0780 |
| useStrengthWithBows | №0780 |
| useSubclassFeature | №0785 (+ 2 других файлов) |
| useTex | №1159 |
| useTexLoc | №0074 |
| uv | №0059 (+ 5 других файлов) |
| uvLoc | №0074 |
| v | №0059 (+ 2 других файлов) |
| V | №1236 |
| V52 | №1250 |
| V53 | №1251 |
| valiantLeader | №0740 |
| validate | №0821 |
| validatePack | №0662 |
| validateTurn | №0784 |
| value | №0061 (+ 25 других файлов) |
| valueGp | №0819 |
| valueMultiplier | №0666 |
| values | №0069 (+ 1 других файлов) |
| vampirism | №0078 |
| vanish | №0649 |
| variant | №0060 (+ 4 других файлов) |
| variantHooks | №0629 (+ 13 других файлов) |
| variants | №0079 (+ 2 других файлов) |
| VEC2 | №0069 (+ 4 других файлов) |
| VEC3 | №0069 (+ 4 других файлов) |
| VEC4 | №0069 (+ 4 других файлов) |
| vedalken | №0673 |
| vengefulBane | №0780 |
| venom | №0668 |
| Venom | №0081 |
| venomConcentrateV49 | №0668 |
| venomReagent | №0668 (+ 1 других файлов) |
| verbal | №0761 (+ 10 других файлов) |
| verbalBlocked | №0819 |
| verbalComponentsBlocked | №0079 |
| verify | №0654 |
| vermillion | №0642 |
| Vermillion | №0780 |
| vermin | №0775 |
| versatileAttackBonus | №0780 |
| versatileFightingAdvanced | №0780 |
| version | №0060 (+ 51 других файлов) |
| VERSION | №0060 (+ 56 других файлов) |
| vertexCount | №0064 (+ 1 других файлов) |
| vertexMask | №0060 |
| vertices | №0064 (+ 6 других файлов) |
| verticesPerRat | №0062 |
| very_rare | №0794 (+ 5 других файлов) |
| vesselMagic | №0845 |
| vessels | №0671 |
| vesselSlots | №0845 |
| vesselStrike | №0845 |
| vials | №0671 |
| victorySurgeExploit | №0780 |
| view | №0072 (+ 1 других файлов) |
| viewport | №1351 (+ 36 других файлов) |
| viewportHeight | №0064 |
| viewportWidth | №0064 |
| vileAffliction | №0780 |
| village | №0800 |
| vine | №0833 |
| vinegar | №0674 |
| violet | №0833 |
| visible | №0642 (+ 9 других файлов) |
| visibleMeleeOnly | №0780 |
| Vitality | №0081 |
| vitalitySplint | №0780 |
| voiceReagent | №0827 |
| volatility | №0081 |
| Volatility | №0081 |
| volume | №0062 (+ 1 других файлов) |
| volumes | №0062 |
| voluntarilyDetach | №0817 |
| voraciousWeapon | №0780 |
| vowOfEnmity | №0649 (+ 1 других файлов) |
| vpLoc | №0074 |
| vulnerabilities | №0656 (+ 9 других файлов) |
| vulnerability | №0642 (+ 2 других файлов) |
| vulnerable | №0851 (+ 1 других файлов) |
| w | №0059 (+ 10 других файлов) |
| wagerCurrent | №0822 |
| wagerMax | №0822 |
| wagerOdds | №0822 |
| wagers | №0822 (+ 1 других файлов) |
| wagerStartCheck | №0819 |
| waist | №0064 (+ 6 других файлов) |
| waiveSacrificeDamage | №0780 |
| wakeMageSleeper | №0819 |
| wall | №0072 |
| WALL | №0073 |
| wall_brick_red | №0073 |
| wall_concrete | №0073 |
| wall_half_timber | №0073 |
| wall_marble_dark | №0073 |
| wall_marble_light | №0073 |
| wall_moss_stone | №0073 |
| wall_old_plaster | №0073 |
| wall_plaster_dark | №0073 |
| wall_plaster_light | №0073 |
| wall_plaster_panel | №0073 |
| wall_slate | №0073 |
| wall_stone_dark | №0073 |
| wall_stone_light | №0073 |
| wall_stone_masonry | №0073 |
| wall_wallpaper | №0073 |
| wall_white_plaster | №0073 |
| wall_wood_dark | №0073 |
| wall_wood_light | №0073 |
| wallClimb | №0810 |
| walls | №0072 (+ 16 других файлов) |
| wallStart | №0627 |
| wandering | №0715 (+ 1 других файлов) |
| wands | №0819 (+ 1 других файлов) |
| wands_02 | №0819 |
| wantedCp | №0802 (+ 1 других файлов) |
| war_caster | №0783 |
| warCry | №0780 |
| ward | №0656 |
| wardAbsorbed | №0656 |
| wardDenied | №0656 |
| Warden | №0796 |
| wardenInterrupt | №0656 |
| wardenSource | №0796 |
| wardenSurvive | №0656 |
| warforged | №0673 |
| warfront | №1259 |
| warfrontEligible | №0632 |
| warlock | №0799 (+ 1 других файлов) |
| warlockLevelEquivalent | №0780 |
| Warlord | №0796 |
| warlordSource | №0796 |
| warning | №0665 |
| warPriest | №0649 |
| warriorPoet | №0780 |
| warsong | №0780 |
| warSongs | №0777 |
| waste | №0827 |
| wasteland | №0800 |
| water | №0673 (+ 1 других файлов) |
| waterBreathing | №0079 (+ 2 других файлов) |
| waterCore | №0827 |
| waterEssence | №0827 |
| wave | №0062 |
| wavy_bob | №0062 (+ 1 других файлов) |
| wavy_long | №0062 (+ 1 других файлов) |
| wax | №0669 (+ 2 других файлов) |
| Weakness | №0081 |
| weapon | №0068 (+ 13 других файлов) |
| weaponAttack | №0656 (+ 22 других файлов) |
| weaponAttackBonus | №0814 |
| weaponBonus | №0814 |
| weaponDamage | №0814 |
| weaponDamageType | №0780 |
| weaponFunctional | №1253 |
| weaponId | №0079 (+ 14 других файлов) |
| weaponMastery | №0736 |
| weaponMasteryLevels | №0736 |
| weaponOnly | №0819 |
| weaponProficiency | №0814 |
| weapons | №0794 (+ 65 других файлов) |
| weaponsData | №0625 (+ 2 других файлов) |
| weaponsmith | №0802 (+ 1 других файлов) |
| weaponTeleportIfDistanceGtFt | №0780 |
| weaponValue | №1253 |
| weaponWear | №1191 |
| wearForArmor | №0667 |
| wearForAttack | №0667 |
| wearRatio | №0666 |
| weasel | №0687 |
| weaver | №0669 (+ 6 других файлов) |
| webgl | №1359 |
| webPreferences | №0887 |
| webSecurity | №0887 |
| weight | №0066 (+ 47 других файлов) |
| weights | №0059 (+ 3 других файлов) |
| weld | №0059 |
| White | №0777 (+ 1 других файлов) |
| whiteHot | №0780 |
| width | №0064 (+ 48 других файлов) |
| wildCharge | №0780 |
| wildernessIntel | №0780 |
| wildMagicSurge | №0649 |
| wildShape | №0649 (+ 1 других файлов) |
| wildspace | №0631 (+ 1 других файлов) |
| wildspaceEligible | №0631 |
| wildwood | №0064 |
| willControlledBy | №0870 |
| willingTargetIds | №0820 (+ 1 других файлов) |
| window | №0068 (+ 77 других файлов) |
| wingColor | №0067 (+ 3 других файлов) |
| wingSize | №0067 (+ 1 других файлов) |
| wis | №0625 (+ 54 других файлов) |
| wisChecksAdvantage | №0642 (+ 1 других файлов) |
| wisChecksDisadvantage | №0642 (+ 1 других файлов) |
| wisdom | №0787 (+ 9 других файлов) |
| wisdomCheckAdvantage | №0814 |
| wisdomSaveAdvantage | №0780 |
| wisSave | №0780 |
| wisSavesDisadvantage | №0642 (+ 1 других файлов) |
| Witch | №0708 |
| witchCurse | №0780 |
| witchItemFlySpeed | №0810 |
| with | №0806 |
| withering | №0079 |
| withFileTypes | №0889 (+ 1 других файлов) |
| within10CellsPct | №1206 |
| within2CellsPct | №1206 |
| within5CellsPct | №1206 |
| within5GridCellsPct | №1211 |
| withinCellPct | №1206 |
| withinGridCellPct | №1211 |
| wizard | №0799 (+ 1 других файлов) |
| won | №0822 |
| wood | №0068 (+ 6 других файлов) |
| woodcarver | №0671 (+ 3 других файлов) |
| wooden | №0068 |
| woodwork | №0669 (+ 1 других файлов) |
| wool | №0063 |
| wordsOfAdamance | №0780 |
| wordsOfBenediction | №0780 |
| wordsOfDamnation | №0780 |
| wordsOfDomination | №0780 |
| wordsOfLegend | №0780 |
| wordsOfMayhem | №0780 |
| wordsOfZeal | №0780 |
| worg | №0687 |
| worldActor | №0075 |
| worldId | №0879 |
| worldMatrices | №0069 |
| worn | №0665 |
| wrapS | №0064 (+ 1 других файлов) |
| wrapT | №0064 (+ 1 других файлов) |
| wretchedCastigation | №0780 |
| writable | №0819 |
| write | №0079 (+ 1 других файлов) |
| x | №0062 (+ 49 других файлов) |
| xanathar | №0629 |
| xenoNecroticReady | №1157 |
| xp | №0629 (+ 16 других файлов) |
| xpFor | №0806 |
| xu | №0059 |
| xv | №0059 |
| xx | №0059 |
| xy | №0059 |
| y | №0062 (+ 44 других файлов) |
| yaw | №0062 (+ 2 других файлов) |
| yeast | №0673 |
| yew | №0674 |
| yieldMult | №0809 |
| yieldMultiplier | №0673 |
| yu | №0059 |
| yuan_ti | №0673 |
| yv | №0059 |
| yy | №0059 |
| z | №0062 (+ 3 других файлов) |
| zealousWords | №0777 |
| zeroHp | №0819 |
| zeroHpReaction | №0656 (+ 4 других файлов) |
| zeroHpSave | №0780 |
| zincOre | №0674 |
| zoneRadiusFt | №0780 |
| zones | №0072 (+ 1 других файлов) |
| zoom | №0071 (+ 3 других файлов) |

### Ключи localStorage (26)

| Имя | Исходные файлы |
|---|---|
| dnd_app_alpha | №0833 |
| dnd_app_font | №0833 |
| dnd_app_frame_color | №0833 |
| dnd_app_frame_style | №0833 |
| dnd_app_theme | №0833 |
| dnd_autorotate_enabled | №0869 |
| dnd_autorotate_interval | №0869 |
| dnd_campaigns_v1 | №0811 (+ 1 других файлов) |
| dnd_character_appearance_draft_v1 | №1359 |
| dnd_characters | №0832 |
| dnd_current_character_id | №0832 (+ 1 других файлов) |
| dnd_custom_races | №0825 |
| dnd_debug_enabled | №0833 (+ 2 других файлов) |
| dnd_launcher_icon | №0833 (+ 2 других файлов) |
| dnd_market_v55_state | №0803 (+ 1 других файлов) |
| dnd_modal_color | №0071 (+ 1 других файлов) |
| dnd_modal_opacity | №0071 (+ 1 других файлов) |
| dnd_multi_characters_v2 | №0625 (+ 44 других файлов) |
| dnd_selected_wallpaper | №0869 |
| dnd_ui_color | №0071 (+ 1 других файлов) |
| dnd_ui_opacity | №0071 (+ 1 других файлов) |
| dnd_v53_world_id | №0879 |
| dnd_v71_onboarding_done | №0816 (+ 1 других файлов) |
| dnd_vtt_mobile_session_v67 | №1328 |
| dnd_wallpaper_dim | №0869 |
| dndContentEnabled | №0662 |

### CSS переменные (16)

| Имя | Исходные файлы |
|---|---|
| --accent-action | №0838 |
| --accent-danger | №0838 |
| --accent-primary | №0838 |
| --accent-success | №0838 |
| --bg-box | №0838 |
| --bg-card | №0838 |
| --bg-input | №0838 |
| --bg-main | №0838 |
| --border-color | №0838 |
| --border-input | №0838 |
| --dnd-frame-art | №0838 |
| --dnd-frame-color | №0838 |
| --dnd-frame-filter | №0838 |
| --text-labels | №0838 |
| --text-main | №0838 |
| --text-muted | №0838 |

### Python/Java идентификаторы (606)

| Имя | Исходные файлы |
|---|---|
| __DND_APP_BOOT_READY | №0050 |
| __name__ | №0005 (+ 14 других файлов) |
| a | №0049 (+ 3 других файлов) |
| aa | №0049 |
| accessor | №1969 |
| action | №1390 (+ 4 других файлов) |
| active | №0049 (+ 2 других файлов) |
| activeFile | №0049 |
| activeRoot | №0050 |
| activeVersion | №0049 |
| activity | №0049 |
| actor | №1922 |
| actual | №1917 |
| add_leaf_bones | №1969 |
| alch | №1972 |
| ALIAS | №1713 |
| aliases | №0049 (+ 1 других файлов) |
| aligned | №1912 |
| alt | №1973 |
| android | №1401 |
| androidPackage | №1914 |
| animationClips | №1343 |
| ap | №1350 |
| apk | №1715 (+ 2 других файлов) |
| apkBytes | №0049 (+ 2 других файлов) |
| apkCompressedBytes | №1345 |
| apkSha256 | №1393 (+ 1 других файлов) |
| app | №1401 |
| app_path | №1401 |
| APP_VERSION | №1401 |
| apply_unit_scale | №1969 |
| approved | №0005 |
| archive | №1912 |
| archives | №1390 |
| area | №1343 |
| arenas | №0005 |
| args | №1343 (+ 9 других файлов) |
| armatures | №1969 |
| artifacts | №0007 (+ 2 других файлов) |
| artwork | №1345 |
| assets | №1973 (+ 1 других файлов) |
| at | №1969 |
| attr | №1925 |
| attributes | №1343 |
| attrs | №1925 |
| av | №0049 |
| axis | №1343 |
| axis_forward | №1969 |
| axis_up | №1969 |
| b | №0049 (+ 7 других файлов) |
| backup | №1917 |
| backup_hash | №1917 |
| badging | №1912 (+ 1 других файлов) |
| bake_anim | №1969 |
| base | №1972 (+ 1 других файлов) |
| base_classes | №1973 |
| base_feat_ids | №1973 |
| base_races | №1973 |
| baselineInstall | №1919 |
| baseUrl | №0049 |
| bb | №0049 |
| before | №1715 |
| binary | №1343 (+ 1 других файлов) |
| blob | №0005 |
| blobs | №0007 |
| bodies | №1969 |
| bones | №1343 |
| branch | №1344 |
| BRANCH | №0005 (+ 2 других файлов) |
| BRAND | №1917 |
| buf | №0049 |
| buffer | №1343 |
| build | №1345 |
| build_run | №0005 (+ 1 других файлов) |
| build_script | №1922 |
| buildRoots | №1344 |
| buildRun | №0005 |
| bundled | №1922 |
| bundled_history | №1915 |
| bundledCreationIds | №1913 |
| bv | №0049 |
| bytes | №0005 (+ 8 других файлов) |
| c | №0049 (+ 6 других файлов) |
| cache | №0049 |
| cacheBytes | №0049 |
| cacheKey | №0049 |
| candidate | №1919 |
| candidate_run | №1915 |
| candidates | №0049 (+ 1 других файлов) |
| canonical | №0049 |
| capture | №1912 (+ 1 других файлов) |
| capture_output | №0005 |
| catalog | №1390 (+ 2 других файлов) |
| catalogs | №1913 |
| category | №1399 |
| cert | №1912 (+ 1 других файлов) |
| CERT | №1912 (+ 1 других файлов) |
| certificate | №0005 |
| changes | №1715 |
| channel | №1914 |
| channels | №1969 |
| chatEditResult | №1715 |
| checksums | №0005 |
| children | №0049 |
| choices | №1350 (+ 2 других файлов) |
| chunk | №1343 |
| ci | №1919 |
| cipher | №1713 |
| ciphertext | №1713 |
| client | №1917 |
| code | №1401 (+ 3 других файлов) |
| Code | №1912 (+ 1 других файлов) |
| codeCache | №0049 |
| codeCacheBytes | №0049 |
| codes | №1922 |
| color | №1973 |
| component | №0049 |
| components | №1715 |
| compressed | №1913 |
| conclusion | №1919 |
| connectedComponents | №1343 |
| content | №1973 |
| context | №0049 |
| converted | №1911 |
| coordinates | №1969 |
| count | №1343 (+ 2 других файлов) |
| counts | №1343 (+ 1 других файлов) |
| craft | №1972 |
| created | №0007 |
| creation | №1393 |
| crlf | №1911 |
| current | №1401 (+ 2 других файлов) |
| cwd | №1344 (+ 1 других файлов) |
| d | №1349 (+ 2 других файлов) |
| data | №0005 (+ 10 других файлов) |
| dataBytes | №0049 |
| dataRoot | №0049 |
| default | №1350 (+ 2 других файлов) |
| defaultFile | №0049 |
| defaultInterfaceOrientation | №1922 |
| degenerateTriangles | №1343 |
| delta | №1969 |
| dependencies | №1344 |
| deps | №1972 |
| descriptor | №0005 (+ 1 других файлов) |
| desktopUiSmoke | №1919 |
| dest | №0007 (+ 1 других файлов) |
| destination | №0005 (+ 1 других файлов) |
| detected | №1350 |
| deviceQa | №1913 |
| dialog | №1715 |
| digest | №0005 (+ 4 других файлов) |
| dir | №1912 |
| dirs | №0049 |
| dklen | №1912 |
| dndvtt_update | №0049 |
| doc | №1969 (+ 4 других файлов) |
| document | №1343 (+ 1 других файлов) |
| downloadedBytes | №0049 |
| dtype | №1343 (+ 1 других файлов) |
| dump | №1921 |
| duplicates | №1344 |
| edges | №1343 (+ 1 других файлов) |
| editorMorphs | №1343 |
| element | №1925 |
| embeddedMorphChannels | №1343 |
| enabled | №0049 (+ 1 других файлов) |
| encoding | №0005 (+ 10 других файлов) |
| encrypted | №1912 (+ 1 других файлов) |
| ensure_ascii | №0005 (+ 13 других файлов) |
| entries | №1391 (+ 3 других файлов) |
| entry | №0049 (+ 5 других файлов) |
| env | №0007 (+ 1 других файлов) |
| environment | №1393 |
| error | №1969 |
| errors | №1344 (+ 1 других файлов) |
| event | №1919 |
| evidence | №0005 |
| EXCLUDE_DIRS | №1399 |
| executor | №0049 |
| exist_ok | №0005 (+ 10 других файлов) |
| existing | №0005 (+ 1 других файлов) |
| expected | №0005 (+ 4 других файлов) |
| expected_bones | №1969 |
| expected_cert | №0005 |
| expected_coordinates | №1969 |
| expected_extents | №1969 |
| expected_name | №0005 |
| expected_shapes | №1969 |
| expected_triangles | №1969 |
| expectedBytes | №0049 |
| expectedHash | №0049 |
| experimental | №1926 |
| experiments | №0005 |
| export_apply | №1390 |
| export_format | №1390 |
| ext | №1350 (+ 1 других файлов) |
| extents | №1969 |
| external_guids | №1344 |
| f | №0049 (+ 1 других файлов) |
| faces | №1343 |
| failed | №0007 |
| fbx | №1969 |
| feats | №1973 |
| feed | №0005 (+ 2 других файлов) |
| female | №1969 |
| file | №0049 (+ 3 других файлов) |
| filepath | №1390 (+ 1 других файлов) |
| files | №0007 (+ 9 других файлов) |
| filesBytes | №0049 |
| FIXTURE | №1911 |
| flags | №1715 (+ 1 других файлов) |
| flush | №0005 |
| folder | №1914 (+ 1 других файлов) |
| found | №1917 |
| fp | №1391 |
| frontend | №1917 (+ 1 других файлов) |
| fs | №1973 |
| full | №1973 |
| full_name | №1919 |
| GENERATED | №1399 |
| generator | №1713 |
| git_sha | №0005 |
| GITHUB_EVENT_NAME | №1919 |
| GITHUB_REF | №1919 |
| GITHUB_REPOSITORY | №1919 |
| GITHUB_SHA | №1919 |
| glb | №1969 |
| goToTab | №0050 |
| gradle | №1401 |
| gradle_path | №1401 |
| groups | №1344 |
| guids | №1344 |
| gx | №1349 |
| gy | №1349 |
| h | №1350 (+ 3 других файлов) |
| head_branch | №1919 |
| head_repository | №1919 |
| head_sha | №1919 |
| header | №1912 |
| headers | №0005 |
| healthy | №0050 |
| height | №0005 (+ 2 других файлов) |
| help | №1401 |
| history | №0005 (+ 1 других файлов) |
| history_path | №0005 (+ 2 других файлов) |
| home | №1917 |
| i | №0049 (+ 2 других файлов) |
| iconId | №0049 |
| id | №0049 (+ 4 других файлов) |
| ids | №1343 |
| image | №1349 |
| images | №0005 |
| imported | №1969 |
| in | №0049 |
| indent | №0005 (+ 15 других файлов) |
| index | №0005 |
| indexComponentType | №1343 |
| info | №0049 |
| ings | №1972 |
| input | №1715 |
| installedPayloadHashes | №1919 |
| intent | №1715 |
| inv | №1345 |
| isolatedProfileAndBackupPreserved | №1919 |
| item | №0005 (+ 4 других файлов) |
| item_catalogs | №1913 |
| iv | №1713 |
| jb | №1969 |
| jobs | №1914 (+ 2 других файлов) |
| json_size | №1969 |
| k | №1390 |
| keepPrevious | №0049 |
| key | №1345 (+ 3 других файлов) |
| keys | №1973 |
| kind | №0005 (+ 6 других файлов) |
| landscapeActive | №0050 |
| latest | №0005 (+ 1 других файлов) |
| launchers | №1925 |
| legacy | №1715 (+ 1 других файлов) |
| len | №0049 |
| length | №0049 (+ 2 других файлов) |
| limitations | №1344 |
| lines | №1390 |
| link | №1390 (+ 1 других файлов) |
| live | №1922 |
| live_feed | №0005 |
| loader | №0050 |
| local_path | №1915 |
| lower | №0049 |
| m | №1344 (+ 8 других файлов) |
| main | №1344 (+ 1 других файлов) |
| manifest | №0005 (+ 5 других файлов) |
| MANIFEST | №1399 |
| MANIFEST_PATHS | №1399 |
| manifestUrl | №0049 |
| marker | №1390 (+ 1 других файлов) |
| materials | №1343 (+ 1 других файлов) |
| max_coordinate_error | №1969 |
| max_workers | №1926 |
| merge_vertices | №1969 |
| merged | №1969 |
| mesh_smooth_type | №1969 |
| meshes | №1390 (+ 1 других файлов) |
| meshMetadata | №1343 |
| meta | №1969 (+ 1 других файлов) |
| metavar | №1401 |
| method | №1912 |
| migrated | №1344 |
| minimalContentVerified | №1913 |
| missing | №1912 |
| missing_ok | №1390 (+ 1 других файлов) |
| mode | №1913 |
| model | №1344 |
| modern | №1919 |
| module | №0007 |
| morphNames | №1343 |
| n | №0049 (+ 4 других файлов) |
| N | №1349 |
| name | №0005 (+ 9 других файлов) |
| names | №1969 (+ 2 других файлов) |
| native | №1345 |
| nativeSeedValidated | №0049 |
| new_manifest | №1915 |
| newCode | №1715 |
| next | №0049 (+ 1 других файлов) |
| noBackup | №0049 |
| noBackupBytes | №0049 |
| node | №1925 |
| nodes | №1925 |
| nonce | №1912 |
| nonFiniteValues | №1343 |
| normalized | №1911 |
| note | №1393 (+ 1 других файлов) |
| notes | №1914 (+ 1 других файлов) |
| notes_file | №0005 (+ 1 других файлов) |
| o | №0049 |
| object_types | №1969 |
| objects | №1390 (+ 2 других файлов) |
| offset | №0005 (+ 1 других файлов) |
| old | №1913 |
| oldCode | №1715 |
| oldUnity10005ApkBytes | №1913 |
| omittedNonRenderingPngBytes | №1913 |
| optional | №1345 |
| optional_names | №1913 |
| original | №0007 (+ 3 других файлов) |
| ORIGINAL_BLOBS | №1917 |
| original_chunks | №1913 |
| originalBrandingBytesVerified | №1913 |
| originalBrandingPixelsVerified | №1913 |
| out | №0049 (+ 7 других файлов) |
| OUT | №1969 |
| p | №1344 (+ 8 других файлов) |
| package | №1401 |
| PACKAGE | №1912 (+ 1 других файлов) |
| packaged | №1913 |
| packaged_chunks | №1913 |
| packaged_image | №1913 |
| packageId | №1715 |
| packageVersion | №0049 |
| packed | №1345 |
| parent | №0049 (+ 2 других файлов) |
| parents | №0007 (+ 11 других файлов) |
| parser | №1343 (+ 6 других файлов) |
| part | №1972 |
| parts | №1343 |
| passed | №1914 |
| password | №1912 |
| patch | №1915 |
| path | №0005 (+ 9 других файлов) |
| path_mode | №1969 |
| pathId | №1393 |
| paths | №1344 (+ 1 других файлов) |
| payload | №1911 (+ 1 других файлов) |
| pending | №0049 |
| per_page | №1914 |
| phb | №1973 |
| physical | №1925 |
| physicalAndroidQa | №1912 |
| picture | №1715 |
| pixels | №1343 (+ 1 других файлов) |
| pkg | №1401 |
| pkg_path | №1401 |
| plaintext | №1912 |
| platform | №0005 (+ 1 других файлов) |
| player_settings | №1922 |
| pm | №0049 (+ 1 других файлов) |
| png | №1715 |
| pores | №1349 |
| position | №1913 |
| position_view | №1969 |
| positions | №1343 (+ 1 других файлов) |
| prefix | №0007 (+ 3 других файлов) |
| prefs | №0049 (+ 1 других файлов) |
| present | №1924 |
| preset | №1918 |
| preview_root | №1926 |
| preview_rows | №1926 |
| PreviewCacheLimit | №1920 |
| previewRoot | №0049 |
| previews | №1920 |
| previous | №0005 (+ 4 других файлов) |
| previousDir | №0049 |
| previousRequestedOrientation | №0050 |
| primitive | №1969 |
| primitives | №1343 |
| prior | №1915 |
| probe | №1912 |
| props | №1913 |
| propTextureCount | №1913 |
| propTextureDimensions | №1913 |
| provenance | №1345 |
| PUBLISHED_APK_SHA | №1912 |
| publisher | №0006 (+ 1 других файлов) |
| pushed | №0007 |
| qa | №1914 (+ 1 других файлов) |
| queue | №1344 |
| quoted | №1925 |
| raw | №0049 (+ 3 других файлов) |
| rawBounds | №1343 |
| reach | №1349 |
| received | №0049 |
| record | №1393 |
| records | №1390 |
| reductionBytes | №1913 |
| reductionPercent | №1913 |
| reference | №1925 |
| references | №1344 |
| refs | №1921 (+ 1 других файлов) |
| reinstall | №1919 |
| rel | №1399 |
| relative | №1390 |
| release | №1922 |
| release_exists | №1915 |
| remote | №1922 |
| removed_art_bytes | №1913 |
| render_digest | №0005 |
| render_folder | №0005 |
| REPO | №0005 (+ 2 других файлов) |
| report | №0005 (+ 5 других файлов) |
| request | №0005 (+ 1 других файлов) |
| required | №0005 (+ 12 других файлов) |
| resources | №1925 |
| restore | №0050 |
| result | №1345 (+ 6 других файлов) |
| return_counts | №1343 |
| return_inverse | №1343 |
| return_value | №1919 |
| returncode | №0005 (+ 1 других файлов) |
| reverse | №1345 (+ 1 других файлов) |
| rig | №1969 |
| rigs | №1969 |
| rng | №1349 |
| root | №0007 (+ 14 других файлов) |
| ROOT | №1343 (+ 10 других файлов) |
| root_url | №1350 |
| rootEntries | №0049 |
| roots | №1343 (+ 1 других файлов) |
| rough | №1349 |
| row | №1344 (+ 1 других файлов) |
| rows | №1345 (+ 3 других файлов) |
| run | №1914 (+ 1 других файлов) |
| run_data | №1915 |
| RUNNER_TEMP | №1919 |
| runtime | №1919 |
| RUNTIME_MANIFEST | №1399 |
| runtimeSmoke | №1919 |
| s | №0049 (+ 1 других файлов) |
| scene | №1919 |
| schema | №1343 (+ 2 других файлов) |
| script | №1973 |
| sdk | №0005 (+ 1 других файлов) |
| seamDuplicates | №1343 |
| seen | №1344 (+ 3 других файлов) |
| selected | №0049 (+ 1 других файлов) |
| selectedIndex | №0049 |
| send | №1715 |
| separators | №1391 (+ 3 других файлов) |
| serializedBytes | №1393 |
| settings | №1912 (+ 2 других файлов) |
| settings_hub | №1922 |
| settingsCategory | №1922 |
| sha | №0007 (+ 1 других файлов) |
| sha256 | №0005 (+ 5 других файлов) |
| shape | №1969 |
| shortcuts | №1715 |
| side_effect | №1919 |
| signer | №1915 |
| signers | №0005 |
| signingCertificateSha256 | №1912 |
| sigs | №1715 |
| size | №1913 (+ 2 других файлов) |
| skins | №1343 |
| skipped | №1390 |
| slot | №1715 |
| slug | №1973 |
| source | №0007 (+ 4 других файлов) |
| SOURCE | №1920 |
| source_commit | №0005 (+ 2 других файлов) |
| source_image | №1913 |
| source_paths | №1344 |
| sourceCommit | №0005 (+ 1 других файлов) |
| sourceRefs | №1344 |
| sources | №1911 |
| sparse | №1969 |
| spec | №0007 (+ 3 других файлов) |
| src | №0049 |
| SRC | №1969 |
| stack | №0049 (+ 1 других файлов) |
| stage | №1912 (+ 1 других файлов) |
| staged | №0049 |
| stageRoot | №0049 |
| standalone | №1390 |
| start | №1969 |
| state | №0049 |
| status | №1912 (+ 2 других файлов) |
| stderr | №1912 (+ 1 других файлов) |
| stdout | №1915 |
| store | №1713 (+ 2 других файлов) |
| strides | №1343 |
| sums | №0005 |
| surfaces | №1973 |
| t | №1921 (+ 1 других файлов) |
| tag | №0005 (+ 2 других файлов) |
| target | №0049 (+ 6 других файлов) |
| targets | №0007 |
| temp | №1390 |
| text | №0005 (+ 7 других файлов) |
| texts | №1344 |
| textured | №1926 |
| textureFormat | №1393 |
| textures | №1345 |
| themes | №1926 |
| ti | №0049 |
| timeout | №0005 (+ 1 других файлов) |
| title | №0050 |
| tools | №1915 |
| topology | №1343 |
| total | №0049 |
| totalBytes | №0049 |
| totalFiles | №0049 |
| tracked | №1344 |
| trays | №1926 |
| triangles | №1343 |
| type | №0049 (+ 10 других файлов) |
| typeCounts | №1393 |
| ui | №1922 |
| unique | №1973 |
| uniquePositions | №1343 |
| unit | №0049 |
| units | №0049 |
| UNITY_ANDROID_KEYSTORE_BASE64 | №1919 |
| UNITY_CI_ARTIFACT_PASSWORD | №1919 |
| UNITY_EMAIL | №1919 |
| UNITY_LICENSE | №1919 |
| UNITY_PASSWORD | №1919 |
| UNITY_SERIAL | №1919 |
| unityGuidEdges | №1344 |
| unityPyVersion | №1393 |
| unknownFilePreserved | №1919 |
| updateBytes | №0049 |
| updater | №0050 (+ 1 других файлов) |
| updateRoot | №0049 |
| upgrade | №1919 |
| uri | №1344 (+ 1 других файлов) |
| url | №0005 (+ 4 других файлов) |
| use_anim | №1969 |
| use_empty | №1969 |
| use_global | №1390 |
| use_mesh_modifiers | №1969 |
| use_selection | №1390 (+ 1 других файлов) |
| uv | №1343 |
| uvOutsideUnitSquare | №1343 |
| uvRange | №1343 |
| validate | №1912 |
| value | №0049 |
| verbosity | №0006 (+ 1 других файлов) |
| verified | №0005 (+ 1 других файлов) |
| version | №0005 (+ 6 других файлов) |
| Version | №1912 (+ 1 других файлов) |
| VERSION | №1399 |
| versionCode | №0007 (+ 3 других файлов) |
| versionName | №0049 (+ 2 других файлов) |
| versions | №0049 (+ 1 других файлов) |
| versionsBytes | №0049 |
| vertices | №1343 |
| view | №1343 (+ 1 других файлов) |
| visited | №0049 |
| vm | №1973 |
| VTT_PROJECT_MANIFEST_V70 | №1391 (+ 1 других файлов) |
| webView | №0050 |
| weights | №1343 |
| weightSumMaxError | №1343 |
| weldedBoundaryEdges | №1343 |
| weldedNonManifoldEdges | №1343 |
| weldTolerance | №1343 |
| width | №0005 (+ 2 других файлов) |
| window | №1973 |
| windows | №1919 |
| windowsFiles | №1912 |
| z | №1401 (+ 1 других файлов) |
| zeroWeightVertices | №1343 |
| zipCompressedBrandingBytes | №1913 |
| zipCompressedNativeBytes | №1913 |
| zipCompressedUnityDataBytes | №1913 |

### JSON поля (1206)

| Имя | Исходные файлы |
|---|---|
| _builderBaseStats | №1759 (+ 2 других файлов) |
| $schema | №1018 |
| abilities | №1759 (+ 2 других файлов) |
| abyss | №1084 |
| ac | №1759 (+ 3 других файлов) |
| acBase | №1908 (+ 1 других файлов) |
| accepted | №1908 |
| acFormula | №1908 (+ 1 других файлов) |
| Acid | №1937 |
| acidResistance | №1759 (+ 2 других файлов) |
| acrobatics | №1759 (+ 2 других файлов) |
| action | №0758 (+ 2 других файлов) |
| activationCommit | №1080 (+ 5 других файлов) |
| activeConditions | №1759 (+ 2 других файлов) |
| activeFolderId | №1908 |
| activeProperties | №1938 |
| actualAndroidUpgradeOnPhone | №1082 |
| actualInstallUpgradeReinstallPassed | №1081 |
| actualLocalPhysxThrowsPerTarget | №1080 |
| actualUpgradeVerified | №1084 |
| actualWindowsUpgrade | №1082 |
| adamantine | №1937 |
| african | №0919 |
| age | №0919 (+ 3 других файлов) |
| alchemy | №1937 |
| all42Forms | №1084 |
| allManifestEntriesMatchPhysicalZIP | №0906 (+ 1 других файлов) |
| allOf | №1018 |
| allowToChangeInstallationDirectory | №1128 |
| allUnpackedSizesAndSHA256 | №0906 (+ 1 других файлов) |
| amount | №1908 |
| amphibious | №1759 (+ 2 других файлов) |
| android | №1080 (+ 8 других файлов) |
| androidAfter | №1015 |
| androidBefore | №1015 |
| androidBundleArtifact | №1028 |
| androidBundleBytes | №1028 |
| androidBundleSha256 | №1028 |
| androidCertificateSha256 | №1085 |
| androidDebug | №0923 |
| androidPackage | №1082 (+ 3 других файлов) |
| androidSignedRelease | №0923 |
| androidSigningCertificateSha256 | №1966 |
| animalHandling | №1759 (+ 2 других файлов) |
| animalProfile | №1762 (+ 1 других файлов) |
| animationClips | №0912 |
| animationId | №1762 (+ 1 других файлов) |
| answers | №1908 |
| Antidote | №1937 |
| apkArtifact | №1028 |
| apkArtifactId | №1024 (+ 3 других файлов) |
| apkBytes | №1046 (+ 8 других файлов) |
| apkCertificateSha256 | №1082 |
| apkCompressedBytes | №1042 |
| apkDeltaVs30 | №1085 |
| apkSha256 | №1046 (+ 6 других файлов) |
| apkV2 | №1082 |
| apkV3 | №1082 |
| apkVersionCode | №1082 |
| app | №1978 (+ 2 других файлов) |
| appId | №1128 |
| approved | №1132 (+ 1 других файлов) |
| arcana | №1759 (+ 2 других файлов) |
| arch | №1128 |
| archiveBytes | №0906 (+ 3 других файлов) |
| archiveCRC | №1035 |
| archiveSha256 | №1036 |
| armLength | №0087 (+ 4 других файлов) |
| armLength-decr | №0087 (+ 1 других файлов) |
| armLength-incr | №0087 (+ 1 других файлов) |
| armor | №1019 (+ 3 других файлов) |
| arms | №0087 (+ 4 других файлов) |
| artifact | №0906 (+ 1 других файлов) |
| artifactBytes | №0906 (+ 1 других файлов) |
| artifactDigest | №0906 (+ 1 других файлов) |
| artifactName | №1128 |
| artifacts | №1046 (+ 4 других файлов) |
| artworkAlsoPresentAsUnityTextures | №1042 |
| asar | №1128 |
| asian | №0919 |
| assetId | №0752 (+ 13 других файлов) |
| assets | №1084 |
| assetsActivationCommit | №1083 |
| assetsPreviewRun | №1083 |
| asyncSceneCleanup | №1080 |
| athletics | №1759 (+ 2 других файлов) |
| attackType | №1759 (+ 1 других файлов) |
| attributes | №0912 |
| AudioListener | №1030 |
| AudioManager | №1030 |
| audit | №0919 |
| authenticodeVerified | №1084 |
| author | №0752 (+ 15 других файлов) |
| back | №1762 (+ 1 других файлов) |
| background | №1759 (+ 2 других файлов) |
| backgroundFeature | №1759 (+ 2 других файлов) |
| backgroundLanguagesToChoose | №1759 (+ 2 других файлов) |
| backgrounds | №1759 (+ 1 других файлов) |
| backslash | №0756 (+ 1 других файлов) |
| backslashTexture | №0756 (+ 1 других файлов) |
| balanced | №1196 |
| base | №1410 |
| baseAc | №1935 |
| baseAC | №1759 (+ 2 других файлов) |
| baseAcFormula | №1935 |
| baseColorFactor | №0912 |
| baseHeight | №1770 |
| baseline | №1045 (+ 1 других файлов) |
| baseObj | №0087 (+ 1 других файлов) |
| basePositionsSha256 | №0087 (+ 1 других файлов) |
| baseUrl | №1978 (+ 2 других файлов) |
| battlefield | №1936 |
| beakColor | №1762 (+ 1 других файлов) |
| beakSize | №1762 (+ 1 других файлов) |
| beakStyle | №1762 (+ 1 других файлов) |
| beard | №1762 (+ 1 других файлов) |
| binary | №0087 (+ 1 других файлов) |
| binaryBundlePublishedToAssets | №1028 |
| binarySha256 | №0087 (+ 1 других файлов) |
| binaryTransfer | №0921 |
| Blindness | №1937 |
| blockedVersions | №1978 (+ 2 других файлов) |
| blood | №1084 |
| blushColor | №1762 (+ 1 других файлов) |
| blushOpacity | №1762 (+ 1 других файлов) |
| body | №1762 (+ 1 других файлов) |
| bodyColor | №1762 (+ 1 других файлов) |
| bodyTint | №1762 (+ 1 других файлов) |
| bones | №0912 (+ 1 других файлов) |
| bonuses | №1759 (+ 2 других файлов) |
| bothBinariesDownloadedAndHashed | №1082 |
| bottom | №1762 (+ 1 других файлов) |
| bovineEarSize | №1762 (+ 1 других файлов) |
| BoxCollider | №1030 |
| branch | №1017 |
| brandingResumeValidation | №1040 |
| brave | №1759 (+ 2 других файлов) |
| breast-volume-decr | №0087 (+ 1 других файлов) |
| breast-volume-incr | №0087 (+ 1 других файлов) |
| breastSize | №0087 (+ 4 других файлов) |
| Breathing | №1937 |
| breathWeapon | №1759 (+ 2 других файлов) |
| browHeight | №1762 (+ 1 других файлов) |
| browRidge | №1762 (+ 1 других файлов) |
| bt_copy | №1936 |
| bt_self | №1936 |
| build | №1128 |
| buildReportArtifact | №1028 |
| buildRoots | №1017 |
| BuildSettings | №1030 |
| bullMuzzleSize | №1762 (+ 1 других файлов) |
| bundledCreationIds | №1046 (+ 3 других файлов) |
| bytes | №1985 (+ 31 других файлов) |
| cacheBustedFeedVersionCode | №1082 |
| Camera | №1030 |
| candidateConclusion | №1080 (+ 1 других файлов) |
| candidateJobs | №1085 |
| candidateRun | №1081 (+ 4 других файлов) |
| candidateRunId | №1080 (+ 2 других файлов) |
| Canvas | №1030 |
| CanvasRenderer | №1030 |
| capColor | №1762 (+ 1 других файлов) |
| capSize | №1762 (+ 1 других файлов) |
| cartographer | №1937 |
| cases | №1908 (+ 1 других файлов) |
| casterId | №1936 |
| castingTime | №1759 (+ 1 других файлов) |
| cat | №1937 |
| catalog | №1081 (+ 1 других файлов) |
| catalogUrl | №1026 |
| catalyst | №1938 |
| catalystId | №1938 |
| catalysts | №1937 |
| catEarSize | №1762 (+ 1 других файлов) |
| category | №1985 (+ 4 других файлов) |
| catMuzzleSize | №1762 (+ 1 других файлов) |
| caucasian | №0919 |
| cell | №0752 (+ 17 других файлов) |
| centaurSize | №1762 (+ 1 других файлов) |
| ceramic | №1937 |
| certificateSha256 | №1028 (+ 4 других файлов) |
| cha | №1759 (+ 2 других файлов) |
| changedVertices | №0919 (+ 1 других файлов) |
| changeFrom10010Bytes | №1046 |
| changes | №1756 (+ 1 других файлов) |
| channel | №1132 (+ 7 других файлов) |
| channels | №0087 (+ 2 других файлов) |
| CharacterController | №1030 |
| charcoal | №1937 |
| charge | №1759 (+ 2 других файлов) |
| charisma | №1759 (+ 1 других файлов) |
| checks | №1046 (+ 4 других файлов) |
| cheekbones | №1762 (+ 1 других файлов) |
| chest | №0912 (+ 5 других файлов) |
| chinLength | №1762 (+ 1 других файлов) |
| choiceHistory | №1759 (+ 2 других файлов) |
| choices | №1759 (+ 1 других файлов) |
| choiceState | №1759 (+ 2 других файлов) |
| chromiumQA | №0906 |
| ciOriginalCertificateVerified | №1081 |
| class | №1759 (+ 2 других файлов) |
| classEntries | №1045 (+ 1 других файлов) |
| classes | №1046 (+ 6 других файлов) |
| classFeaturesState | №1759 (+ 2 других файлов) |
| className | №1759 (+ 2 других файлов) |
| clawColor | №1762 (+ 1 других файлов) |
| clawSize | №1762 (+ 1 других файлов) |
| clay | №1937 |
| climb | №1759 (+ 2 других файлов) |
| cloth | №1937 |
| clothing | №1762 (+ 1 других файлов) |
| cloudBuildRun | №1966 |
| cloudUnityBuildLicenseConfigured | №1966 |
| coinCases | №1908 |
| coinLog | №1908 |
| coins | №1908 |
| Cold | №1937 |
| coldResistance | №1759 (+ 2 других файлов) |
| combatants | №1936 |
| commit | №0087 (+ 1 других файлов) |
| comparison | №1037 |
| components | №1759 (+ 1 других файлов) |
| compositeTerms | №0919 |
| compositions | №0087 (+ 1 других файлов) |
| compressedBytes | №1029 |
| ComputeShader | №1030 |
| con | №1759 (+ 2 других файлов) |
| concentration | №1759 (+ 1 других файлов) |
| conclusion | №0906 (+ 2 других файлов) |
| condition | №1937 |
| conflict | №1937 |
| conflicts | №1938 |
| connectedComponents | №0912 |
| const | №1018 |
| constitution | №1759 (+ 2 других файлов) |
| Constitution | №1937 |
| consumables | №1019 (+ 3 других файлов) |
| content | №1081 |
| controlled | №0752 (+ 3 других файлов) |
| converted | №1084 |
| copy | №1936 |
| corset | №1762 (+ 1 других файлов) |
| cost | №1908 (+ 2 других файлов) |
| count | №0087 (+ 8 других файлов) |
| cp | №1908 |
| cPerS | №1908 |
| craft | №1937 |
| craftBonuses | №1759 (+ 1 других файлов) |
| CRC | №0906 (+ 1 других файлов) |
| createDesktopShortcut | №1128 |
| createStartMenuShortcut | №1128 |
| creation | №1759 (+ 1 других файлов) |
| creationCases | №1908 |
| crestSize | №1762 (+ 1 других файлов) |
| crownColor | №1762 (+ 1 других файлов) |
| crownSize | №1762 (+ 1 других файлов) |
| crystal | №1937 |
| csharp | №1080 (+ 5 других файлов) |
| Cubemap | №1030 |
| cupsize | №0919 |
| currentFloor | №0752 (+ 17 других файлов) |
| customizations | №0001 (+ 2 других файлов) |
| cutoff | №0919 |
| d | №0752 (+ 17 других файлов) |
| damage | №1759 (+ 3 других файлов) |
| damageType | №1759 (+ 3 других файлов) |
| darkness | №0752 (+ 17 других файлов) |
| darkvisionFt | №1759 (+ 2 других файлов) |
| date | №1085 (+ 2 других файлов) |
| dc | №1937 |
| debug | №0906 |
| deception | №1759 (+ 2 других файлов) |
| declaredSourceCommit | №0919 |
| declaredUnityPackages | №1017 |
| defaultDependencyTypeInfo | №1959 |
| defaultInstantiationMode | №1959 |
| degenerateTriangles | №0912 |
| DelayedCallManager | №1030 |
| deltaBytesFrom10022 | №1080 |
| deltaBytesVs28 | №1084 |
| deltaFrom10023Bytes | №1081 |
| dependencies | №1017 (+ 4 других файлов) |
| dependencyTypeInfos | №1959 |
| depth | №1017 (+ 1 других файлов) |
| derived | №1485 |
| desc | №1759 (+ 1 других файлов) |
| description | №0752 (+ 21 других файлов) |
| destination | №1037 (+ 1 других файлов) |
| destinationGender | №0919 |
| dev | №1152 |
| devDependencies | №1128 (+ 2 других файлов) |
| device | №1046 |
| deviceQa | №1046 (+ 6 других файлов) |
| dex | №1759 (+ 2 других файлов) |
| dexterity | №1759 (+ 2 других файлов) |
| Dexterity | №1937 |
| diceGeometryPreviewBytes | №1081 |
| diceGeometryPreviews | №1081 |
| directories | №1128 |
| dotnet | №1046 |
| doubleSided | №0912 |
| dragonScale | №1937 |
| dress | №1762 (+ 1 других файлов) |
| duplicates | №1017 |
| duration | №1759 (+ 1 других файлов) |
| e | №0752 (+ 17 других файлов) |
| earLength | №1762 (+ 1 других файлов) |
| earPointiness | №1762 (+ 1 других файлов) |
| Earth | №1937 |
| earTuftSize | №1762 (+ 1 других файлов) |
| edition | №1045 (+ 1 других файлов) |
| editorMorphs | №0912 |
| effect | №1908 (+ 1 других файлов) |
| effects | №1936 (+ 1 других файлов) |
| electron | №1128 |
| electron-builder | №1128 |
| elephantEarSize | №1762 (+ 1 других файлов) |
| elephantTuskSize | №1762 (+ 1 других файлов) |
| embeddedMorphChannels | №0912 |
| emitsLight | №0758 (+ 1 других файлов) |
| enclosed | №1196 |
| entries | №1045 |
| enum | №1018 |
| ep | №1908 |
| equipment | №1762 (+ 1 других файлов) |
| equipped | №1908 |
| errors | №1084 |
| eTexture | №0752 (+ 17 других файлов) |
| exact31SculpturesComplete | №1083 |
| exactSculpturesComplete | №1084 |
| existingPython | №1083 (+ 1 других файлов) |
| expected | №1908 (+ 2 других файлов) |
| experimentalTypes | №1084 |
| exportedMacros | №0919 |
| extensions | №0001 |
| exteriorUVFaces | №1084 |
| external | №1936 |
| externalOrPackageGuidReferences | №1017 |
| extra | №1937 |
| extraClassName | №1935 |
| extraClassType | №1935 |
| extras | №1938 |
| extraTrigger | №1937 |
| eyeColor | №1762 (+ 1 других файлов) |
| eyeGlow | №1762 (+ 1 других файлов) |
| eyeHeight | №1762 (+ 1 других файлов) |
| eyeliner | №1762 (+ 1 других файлов) |
| eyeShape | №1762 (+ 1 других файлов) |
| eyeSize | №1762 (+ 1 других файлов) |
| eyeSpacing | №1762 (+ 1 других файлов) |
| eyeTilt | №1762 (+ 1 других файлов) |
| eyeWidth | №1762 (+ 1 других файлов) |
| faceColor | №1762 (+ 1 других файлов) |
| faceLength | №1762 (+ 1 других файлов) |
| faceShape | №1762 (+ 1 других файлов) |
| faceTint | №1762 (+ 1 других файлов) |
| faceWidth | №1762 (+ 1 других файлов) |
| fail | №0906 (+ 1 других файлов) |
| fangSize | №1762 (+ 1 других файлов) |
| fat | №1762 (+ 1 других файлов) |
| fbxSha256 | №1770 |
| Fear | №1937 |
| featherTailSize | №1762 (+ 1 других файлов) |
| featherWingSize | №1762 (+ 1 других файлов) |
| feats | №1046 (+ 7 других файлов) |
| feature | №1759 (+ 1 других файлов) |
| features | №0001 (+ 3 других файлов) |
| feedActivated | №1084 |
| feedPlainAndCacheBustedVerified | №1085 |
| feet | №1762 (+ 1 других файлов) |
| femaleStackTerms | №0919 |
| feyAncestry | №1759 (+ 2 других файлов) |
| file | №1908 (+ 2 других файлов) |
| fileCount | №1985 |
| files | №1985 (+ 12 других файлов) |
| finSize | №1762 (+ 1 других файлов) |
| Fire | №1937 |
| fireResistance | №1759 (+ 2 других файлов) |
| firmness | №0919 |
| fixtureSha256 | №0919 (+ 1 других файлов) |
| flight | №1759 (+ 2 других файлов) |
| floor | №0752 (+ 3 других файлов) |
| floors | №0752 (+ 18 других файлов) |
| flow | №0906 |
| folder | №0087 (+ 3 других файлов) |
| folderCases | №1908 |
| folders | №1759 (+ 2 других файлов) |
| Font | №1030 |
| format | №1018 (+ 1 других файлов) |
| formula | №1937 |
| full6d20 | №1084 |
| fullSoftBodyComplete | №1084 |
| furAmount | №1762 (+ 1 других файлов) |
| furColor | №1762 (+ 1 других файлов) |
| furDensity | №1762 (+ 1 других файлов) |
| furLength | №1762 (+ 1 других файлов) |
| furProfile | №1762 (+ 1 других файлов) |
| GameObject | №1030 |
| gem | №1937 |
| gender | №0919 (+ 5 других файлов) |
| generated | №1985 (+ 3 других файлов) |
| ghostChainSize | №1762 (+ 1 других файлов) |
| ghostOpacity | №1762 (+ 1 других файлов) |
| ghostTerror | №1762 (+ 1 других файлов) |
| ghostWeapon | №1762 (+ 1 других файлов) |
| gitBlob | №0923 |
| glass | №1937 |
| glasswork | №1937 |
| glide | №1759 (+ 2 других файлов) |
| gliderMembraneSize | №1762 (+ 1 других файлов) |
| gooSize | №1762 (+ 1 других файлов) |
| gp | №1908 |
| gPerE | №1908 |
| GraphicsSettings | №1030 |
| grayColor | №1762 (+ 1 других файлов) |
| grayPercent | №1762 (+ 1 других файлов) |
| groupKey | №1908 (+ 1 других файлов) |
| h | №0752 (+ 17 других файлов) |
| hair | №1762 (+ 1 других файлов) |
| hairColor | №1762 (+ 1 других файлов) |
| Hallucination | №1937 |
| hands | №1762 (+ 3 других файлов) |
| hardwood | №1937 |
| head | №0087 (+ 4 других файлов) |
| head-decr | №0087 (+ 1 других файлов) |
| head-incr | №0087 (+ 1 других файлов) |
| height | №0752 (+ 23 других файлов) |
| Hemorrhage | №1937 |
| herb | №1937 |
| hero | №1908 |
| highlightColor | №1762 (+ 1 других файлов) |
| highlightPercent | №1762 (+ 1 других файлов) |
| hips | №0912 (+ 5 других файлов) |
| history | №1759 (+ 2 других файлов) |
| hitDice | №1759 (+ 2 других файлов) |
| hitDie | №1759 (+ 1 других файлов) |
| hoofColor | №1762 (+ 1 других файлов) |
| hoofSize | №1762 (+ 1 других файлов) |
| hornColor | №1762 (+ 1 других файлов) |
| hornRidges | №1762 (+ 1 других файлов) |
| horns | №1759 (+ 2 других файлов) |
| hornSize | №1762 (+ 1 других файлов) |
| hornStyle | №1762 (+ 1 других файлов) |
| hornThickness | №1762 (+ 1 других файлов) |
| horseColor | №1762 (+ 1 других файлов) |
| hosieryDen | №1762 (+ 1 других файлов) |
| hpBonusPerLevel | №1759 (+ 1 других файлов) |
| hpCurrent | №1759 (+ 2 других файлов) |
| hpMax | №1759 (+ 2 других файлов) |
| human-female | №1395 |
| ice | №1084 |
| id | №0752 (+ 36 других файлов) |
| identity | №1936 |
| ids | №1938 |
| if | №1018 |
| image | №0001 |
| immunities | №1759 (+ 2 других файлов) |
| incomingUnityReferences | №1017 |
| independentPublicVerification | №1081 |
| indexComponentType | №0912 |
| ingredients | №1019 (+ 1 других файлов) |
| initiativeTracker | №1936 |
| ink | №1937 |
| innateSpellcasting | №1759 (+ 2 других файлов) |
| input | №1908 (+ 1 других файлов) |
| InputManager | №1030 |
| insight | №1759 (+ 2 других файлов) |
| installers | №1085 |
| installUpgradeReinstall | №1080 |
| int | №1759 (+ 2 других файлов) |
| integrity | №1152 |
| intelligence | №1759 (+ 2 других файлов) |
| intelligence_or_charisma | №1935 |
| intensity | №0752 (+ 17 других файлов) |
| interactive | №0758 (+ 1 других файлов) |
| interactiveDesktopVerified | №1084 |
| interactiveWindowsGpu | №1085 |
| intimidation | №1759 (+ 2 других файлов) |
| inventory | №1908 |
| inventoryCases | №1908 |
| inventoryCategory | №1937 |
| investigation | №1908 |
| Invisibility | №1937 |
| iron | №1937 |
| isExtra | №1935 |
| isExtraClass | №1935 |
| item | №1908 |
| items | №1018 (+ 3 других файлов) |
| jawProjection | №1762 (+ 1 других файлов) |
| jawWidth | №1762 (+ 1 других файлов) |
| jeweler | №1937 |
| job | №1081 (+ 1 других файлов) |
| jobId | №1028 |
| jobs | №1082 (+ 2 других файлов) |
| joints | №0919 (+ 2 других файлов) |
| JOINTS_0 | №0912 |
| junk | №1019 (+ 3 других файлов) |
| keep | №1908 |
| key | №1410 (+ 3 других файлов) |
| kind | №1985 (+ 1 других файлов) |
| known | №1936 |
| label | №1759 (+ 3 других файлов) |
| languages | №1759 (+ 1 других файлов) |
| larvaGirth | №1762 (+ 1 других файлов) |
| larvaLength | №1762 (+ 1 других файлов) |
| larvaTendrilSize | №1762 (+ 1 других файлов) |
| larvaToothSize | №1762 (+ 1 других файлов) |
| leather | №1937 |
| leatherwork | №1937 |
| legacy | №0906 (+ 1 других файлов) |
| legacyApkInput | №1017 |
| legacyBinaryPublication | №1045 |
| legacyGlyphControls | №1085 |
| legacyNumeralControls | №1084 |
| legacyPayloadsPreserved | №1085 |
| legLength | №0087 (+ 4 других файлов) |
| legLength-decr | №0087 (+ 1 других файлов) |
| legLength-incr | №0087 (+ 1 других файлов) |
| legs | №0087 (+ 4 других файлов) |
| level | №1759 (+ 2 других файлов) |
| levelOneFeatures | №1759 (+ 1 других файлов) |
| library | №0752 (+ 16 других файлов) |
| license | №0087 (+ 5 других файлов) |
| licenseReview | №1017 |
| licenseSha256 | №1037 |
| Light | №1030 |
| lighting | №0752 (+ 17 других файлов) |
| lightIntensity | №0758 (+ 1 других файлов) |
| LightmapSettings | №1030 |
| lightRadius | №0758 (+ 1 других файлов) |
| limbProfile | №1762 (+ 1 других файлов) |
| limitations | №0087 (+ 6 других файлов) |
| lipColor | №1762 (+ 1 других файлов) |
| lipOpacity | №1762 (+ 1 других файлов) |
| lipVolume | №1762 (+ 1 других файлов) |
| liveBodyBudget | №1085 |
| liveSupabase | №1080 (+ 2 других файлов) |
| liveSupabaseTested | №1081 |
| liveSupabaseVerified | №1083 (+ 1 других файлов) |
| localFilesystemPackageUpgrade | №1084 |
| localRuntimeTests | №0921 |
| lockfileVersion | №1152 |
| logicalPhysXThrows | №1085 |
| loot | №0752 (+ 1 других файлов) |
| lucky | №1759 (+ 2 других файлов) |
| macroConfigSha256 | №0919 |
| Magic | №1937 |
| magicResistance | №1759 (+ 2 других файлов) |
| main | №1017 (+ 1 других файлов) |
| manifest | №0906 (+ 1 других файлов) |
| mapId | №0752 (+ 13 других файлов) |
| maps | №1485 |
| markers | №1028 |
| matchesInApk | №1026 |
| material | №1759 (+ 1 других файлов) |
| Material | №1030 |
| materialPackBytes | №1083 |
| materialPacks | №1083 |
| materials | №0912 (+ 6 других файлов) |
| maxCapacityKg | №1908 |
| maxCoordinateRoundTripError | №1770 |
| maxDisplacementMeters | №0919 (+ 1 других файлов) |
| maximum | №1018 |
| maxItems | №1018 |
| measure-thigh-circ-decr | №0087 (+ 1 других файлов) |
| measure-thigh-circ-incr | №0087 (+ 1 других файлов) |
| measure-upperarm-circ-decr | №0087 (+ 1 других файлов) |
| measure-upperarm-circ-incr | №0087 (+ 1 других файлов) |
| measurementsArtifact | №1028 |
| medicine | №1908 |
| mentalShield | №1759 (+ 2 других файлов) |
| Mesh | №1030 |
| meshes | №1123 |
| MeshFilter | №1030 |
| meshMetadata | №0912 |
| MeshRenderer | №1030 |
| metallicFactor | №0912 |
| method | №0087 (+ 1 других файлов) |
| MhObjectType | №0912 |
| MhScaleFactor | №0912 |
| migrationStatus | №1017 |
| mimicry | №1759 (+ 2 других файлов) |
| min | №1759 |
| minAndroidSdk | №1085 |
| minAppVersion | №1978 (+ 2 других файлов) |
| minClientVersionCode | №1019 |
| Mind | №1937 |
| minimalContentVerified | №1046 (+ 4 других файлов) |
| minimum | №1018 |
| minLength | №1018 |
| minStr | №1908 (+ 1 других файлов) |
| mithral | №1937 |
| model | №0752 (+ 18 других файлов) |
| modelFamily | №1762 (+ 1 других файлов) |
| models | №1410 (+ 1 других файлов) |
| modifiers | №1908 |
| MonoBehaviour | №1030 |
| MonoManager | №1030 |
| MonoScript | №1030 |
| morphNames | №0912 (+ 1 других файлов) |
| moustache | №1762 (+ 1 других файлов) |
| mouthWidth | №1762 (+ 1 других файлов) |
| MPFB_GEN_object_type | №0912 |
| MPFB_GEN_scale_factor | №0912 |
| MPFB_HUM_african | №0912 |
| MPFB_HUM_age | №0912 |
| MPFB_HUM_asian | №0912 |
| MPFB_HUM_caucasian | №0912 |
| MPFB_HUM_cupsize | №0912 |
| MPFB_HUM_firmness | №0912 |
| MPFB_HUM_gender | №0912 |
| MPFB_HUM_height | №0912 |
| MPFB_HUM_is_human_project | №0912 |
| MPFB_HUM_material_source | №0912 |
| MPFB_HUM_muscle | №0912 |
| MPFB_HUM_proportions | №0912 |
| MPFB_HUM_weight | №0912 |
| multiclassAllowed | №1935 |
| muscle | №0919 (+ 2 других файлов) |
| muzzleHeight | №1762 (+ 1 других файлов) |
| muzzleLength | №1762 (+ 1 других файлов) |
| muzzleWidth | №1762 (+ 1 других файлов) |
| n | №0752 (+ 17 других файлов) |
| name | №0001 (+ 39 других файлов) |
| nameRu | №1759 (+ 1 других файлов) |
| native | №1029 |
| nativeAndroidFaceOrientations | №1081 |
| nativeAndroidMixedLogicalDice | №1081 |
| nativeAndroidPhysicalThrows | №1081 |
| nativeCommerce | №1046 |
| nativeComposerBothTargets | №1082 |
| nativeEditorPerTarget | №1084 |
| nativeFaceOrientationsEach | №1082 |
| nativeFaceOrientationsPerTarget | №1080 |
| nativeLibraries | №1042 |
| nativePerTarget | №1083 (+ 1 других файлов) |
| nativePhysicalThrowsEach | №1082 |
| nativePngBytes | №1083 |
| nativePngCount | №1083 |
| nativeWindowsFaceOrientations | №1081 |
| nativeWindowsMixedLogicalDice | №1081 |
| nativeWindowsPhysicalThrows | №1081 |
| naturalArmor | №1759 (+ 2 других файлов) |
| nature | №1908 |
| Nausea | №1937 |
| NavMeshProjectSettings | №1030 |
| NavMeshSettings | №1030 |
| neck | №1762 (+ 1 других файлов) |
| Necrotic | №1937 |
| necroticResistance | №1759 (+ 2 других файлов) |
| negative | №0087 (+ 4 других файлов) |
| newPackages | №1019 |
| newSceneOverride | №1959 |
| nextAction | №0923 |
| nimbleEscape | №1759 (+ 2 других файлов) |
| noBreath | №1759 (+ 2 других файлов) |
| nonFiniteValues | №0912 |
| NORMAL | №0912 |
| noseLength | №1762 (+ 1 других файлов) |
| noseWidth | №1762 (+ 1 других файлов) |
| noSleep | №1759 (+ 2 других файлов) |
| note | №1016 (+ 10 других файлов) |
| noteCase | №1908 |
| notes | №1134 (+ 2 других файлов) |
| nsis | №1128 |
| nTexture | №0752 (+ 17 других файлов) |
| numeralPixelControls | №1083 |
| objects | №0752 (+ 18 других файлов) |
| offset | №0087 (+ 2 других файлов) |
| oldApk | №1035 |
| oldUnity10005ApkBytes | №1046 (+ 5 других файлов) |
| omittedNonRenderingPngBytes | №1046 (+ 2 других файлов) |
| oneClick | №1128 |
| opaqueShellControls | №1084 (+ 1 других файлов) |
| optionalMaterialMatches | №1042 |
| optionalTextureMatches | №1042 |
| options | №1759 (+ 1 других файлов) |
| origin | №1759 (+ 2 других файлов) |
| originalBrandingBytesVerified | №1046 (+ 5 других файлов) |
| originalBrandingPixelsVerified | №1046 (+ 2 других файлов) |
| originalBytes | №1035 |
| originalsDeleted | №1045 |
| ota_install_contract | №0908 |
| other | №1936 |
| outer | №1762 (+ 1 других файлов) |
| output | №1128 |
| ownerId | №1936 |
| ownTurnId | №1936 |
| package | №1028 (+ 5 других файлов) |
| packagedBytes | №1032 |
| packagedSha256 | №1032 |
| packages | №1008 (+ 3 других файлов) |
| packBytes | №1084 |
| packedBytes | №1044 |
| packs | №1026 (+ 1 других файлов) |
| packTactics | №1759 (+ 2 других файлов) |
| packVersion | №1084 |
| pages | №0923 |
| paid_api_authorized | №0002 |
| paper | №1937 |
| parchment | №1937 |
| parts | №1134 |
| pass | №0906 (+ 1 других файлов) |
| path | №1985 (+ 9 других файлов) |
| pathId | №1030 (+ 2 других файлов) |
| paths | №1017 |
| pattern | №1018 |
| pawPadColor | №1762 (+ 1 других файлов) |
| pbrMetallicRoughness | №0912 |
| pectorals | №0087 (+ 4 других файлов) |
| pendingChoices | №1759 (+ 2 других файлов) |
| perception | №1759 (+ 2 других файлов) |
| Perception | №1937 |
| performance | №1759 (+ 2 других файлов) |
| perMachine | №1128 |
| persuasion | №1759 (+ 2 других файлов) |
| Petrification | №1937 |
| physical_android_test | №0908 |
| physicalAndroid | №1080 (+ 1 других файлов) |
| physicalAndroidQa | №1966 |
| physicalAndroidQA | №0906 (+ 3 других файлов) |
| physicalDeviceTested | №1081 |
| physicalPhoneTouch | №1082 |
| physicalPhoneVerified | №1083 (+ 1 других файлов) |
| physicalZIP | №0906 |
| Physics2DSettings | №1030 |
| PhysicsManager | №1030 |
| physxThrows | №1083 (+ 1 других файлов) |
| pixels | №0912 |
| pixelsIdentical | №1032 |
| plainAndCacheBustedPublicFeedVerified | №1081 |
| plainFeedVersionCode | №1082 |
| plateColor | №1762 (+ 1 других файлов) |
| plateSize | №1762 (+ 1 других файлов) |
| platform | №1018 (+ 1 других файлов) |
| PlayerSettings | №1030 |
| poisonImmunity | №1759 (+ 2 других файлов) |
| poisonResistance | №1759 (+ 2 других файлов) |
| portable | №1128 |
| pose | №1762 (+ 1 других файлов) |
| POSITION | №0912 |
| positive | №0087 (+ 4 других файлов) |
| postCreateCommand | №0001 |
| postRestChangedPixels | №1084 |
| potency | №1937 (+ 1 других файлов) |
| pottery | №1937 |
| powerfulBuild | №1759 (+ 2 других файлов) |
| pp | №1908 |
| pPerG | №1908 |
| PreloadData | №1030 |
| prerequisite | №1759 |
| preset | №1762 (+ 1 других файлов) |
| presetId | №1762 (+ 1 других файлов) |
| previewJob | №1084 |
| previewPhysicsRenderPoses | №1080 |
| previewRun | №1081 (+ 1 других файлов) |
| previews | №1085 |
| previous10007Bytes | №1027 |
| previous10008Bytes | №1031 |
| previous75PreviewHashesUnchanged | №1081 |
| previousUnity10010ApkBytes | №1046 |
| price | №1937 |
| primaryLicenseUrls | №1037 |
| primitives | №0912 |
| private | №1128 (+ 1 других файлов) |
| producerRun | №1084 (+ 1 других файлов) |
| productionSyntaxFiles | №0906 (+ 1 других файлов) |
| productName | №1128 |
| profBonus | №1759 (+ 2 других файлов) |
| profession | №1759 (+ 2 других файлов) |
| proficiencies | №1759 (+ 2 других файлов) |
| proficiency | №1908 |
| proficiencyType | №1908 (+ 1 других файлов) |
| profileBackupAndUnknownFilePreserved | №1080 |
| profiles | №1938 |
| project | №0087 (+ 1 других файлов) |
| pronounced | №1196 |
| properties | №1018 (+ 3 других файлов) |
| proportions | №0919 |
| propTextureCount | №1046 (+ 5 других файлов) |
| propTextureDimensions | №1046 (+ 5 других файлов) |
| pseudopodSize | №1762 (+ 1 других файлов) |
| psychicResistance | №1759 (+ 2 других файлов) |
| publicApkSignature | №1085 |
| publicApkV2V3SignatureVerified | №1080 |
| publication | №0906 (+ 4 других файлов) |
| publicDownloadsVerified | №1080 |
| publicFeedVerified | №1080 |
| publicGeometryPreviewShaAndDecodeVerified | №1081 |
| publicNativePngBytes | №1084 |
| publicNativePngCount | №1084 |
| publicPackageBytes | №1046 |
| publicPackages | №1046 |
| publicPreviewBytes | №1084 |
| publicPreviewJpegBytes | №1083 |
| publicPreviewJpegCount | №1083 |
| publicPreviewJpegs | №1084 |
| publicRecipeShaVerified | №1081 |
| publicVerification | №1082 |
| publishedCopy | №1017 |
| publisherConclusion | №1082 |
| publisherJob | №1082 (+ 2 других файлов) |
| publisherRun | №1082 (+ 3 других файлов) |
| publishRunId | №1080 |
| pupilOpacity | №1762 (+ 1 других файлов) |
| pupilShape | №1762 (+ 1 других файлов) |
| purity | №1937 (+ 1 других файлов) |
| python | №1046 (+ 2 других файлов) |
| pythonUnit | №1080 (+ 1 других файлов) |
| QualitySettings | №1030 |
| quantity | №1937 |
| quota_scope | №0002 |
| rabbitEarSize | №1762 (+ 1 других файлов) |
| rabbitTailSize | №1762 (+ 1 других файлов) |
| race | №0919 |
| raceCraftBonuses | №1759 (+ 1 других файлов) |
| raceEntries | №1045 (+ 1 других файлов) |
| raceFamilies | №1045 (+ 1 других файлов) |
| raceFeatureDescriptions | №1759 (+ 2 других файлов) |
| raceHpBonusPerLevel | №1759 (+ 1 других файлов) |
| raceId | №1759 (+ 4 других файлов) |
| raceMechanics | №1759 (+ 2 других файлов) |
| raceName | №1759 (+ 2 других файлов) |
| races | №1046 (+ 5 других файлов) |
| Radiant | №1937 |
| radiantResistance | №1759 (+ 2 других файлов) |
| radius | №0752 (+ 17 других файлов) |
| range | №1759 (+ 1 других файлов) |
| rarity | №1908 (+ 2 других файлов) |
| rates | №1908 |
| rawArtwork | №1042 |
| rawBounds | №0912 |
| rawBranding | №1029 |
| reason | №1084 (+ 1 других файлов) |
| recipeBytes | №1081 |
| recipeCommit | №1081 |
| recipes | №1019 (+ 1 других файлов) |
| recommendedSourceCommit | №0919 |
| Recovery | №1937 |
| RectTransform | №1030 |
| reductionBytes | №1046 (+ 5 других файлов) |
| reductionPercent | №1046 (+ 5 других файлов) |
| reductionVs10007Bytes | №1027 |
| reductionVs10008Bytes | №1031 |
| referenceCommit | №1037 |
| referencePath | №1037 |
| referenceRepository | №1037 |
| referenceSha256 | №1037 |
| Regeneration | №1937 |
| regression | №0906 (+ 1 других файлов) |
| rejectedCandidate | №1084 |
| rejectedCandidate31NeverActivated | №1085 |
| release | №0921 (+ 1 других файлов) |
| release_ready | №0002 |
| release_reason | №0002 |
| release_source_sha | №0002 |
| releaseCommit | №0906 (+ 1 других файлов) |
| releases | №1756 (+ 1 других файлов) |
| releaseType | №1132 |
| releaseUrl | №1036 (+ 2 других файлов) |
| relentlessEndurance | №1759 (+ 2 других файлов) |
| religion | №1759 (+ 2 других файлов) |
| removed | №1908 |
| renderBytes | №1085 |
| renderCount | №1085 |
| renderIndexSha256 | №1083 (+ 2 других файлов) |
| renderReviewBoundary | №1083 (+ 2 других файлов) |
| RenderSettings | №1030 |
| repairable | №1759 (+ 2 других файлов) |
| replacesRace | №1935 |
| repository | №1081 |
| reptileProfile | №1762 (+ 1 других файлов) |
| required | №1018 |
| required_editor_assets | №0908 |
| requiredAssets | №0752 (+ 13 других файлов) |
| requireRenderReview | №1133 |
| requires | №1152 |
| resin | №1937 |
| resistanceDamageType | №1759 (+ 1 других файлов) |
| resistances | №1759 (+ 2 других файлов) |
| resolved | №1152 |
| resolvedUnityPackages | №1017 |
| ResourceManager | №1030 |
| resources | №1026 (+ 2 других файлов) |
| resultCp | №1908 |
| resultEp | №1908 |
| resultGp | №1908 |
| resultPp | №1908 |
| resultSp | №1908 |
| retainedChunks | №1032 |
| retry_after | №0002 |
| review | №1084 |
| ridgeColor | №1762 (+ 1 других файлов) |
| ridgeStyle | №1762 (+ 1 других файлов) |
| risk | №1938 |
| ritual | №1759 (+ 1 других файлов) |
| rmsDisplacementMeters | №0919 (+ 1 других файлов) |
| rootCause | №0906 |
| rotation | №0753 (+ 11 других файлов) |
| roughnessFactor | №0912 |
| roundEarSize | №1762 (+ 1 других файлов) |
| run | №1081 (+ 1 других файлов) |
| runId | №1046 (+ 5 других файлов) |
| runtime | №0919 (+ 1 других файлов) |
| RuntimeInitializeOnLoadManager | №1030 |
| runtimeOTARegression | №0906 |
| runtimeStatus | №1036 |
| s | №0752 (+ 15 других файлов) |
| sameTreeDuplicates | №1017 |
| savageAttacks | №1759 (+ 2 других файлов) |
| savedBytes | №1032 |
| savesData | №1759 (+ 2 других файлов) |
| savingThrow | №1759 (+ 1 других файлов) |
| scale | №0087 (+ 20 других файлов) |
| schema | №0087 (+ 11 других файлов) |
| schemaVersion | №0752 (+ 20 других файлов) |
| school | №1759 (+ 1 других файлов) |
| scope | №1132 (+ 1 других файлов) |
| scribe | №1937 |
| ScriptMapper | №1030 |
| scripts | №1128 (+ 1 других файлов) |
| seamDuplicates | №0912 |
| seamMaxMeters | №0919 (+ 1 других файлов) |
| searchable | №0752 (+ 11 других файлов) |
| seconds | №0906 (+ 1 других файлов) |
| seed | №1759 (+ 1 других файлов) |
| selectedTexture | №0752 (+ 17 других файлов) |
| selectedTool | №0752 (+ 17 других файлов) |
| selectedWallTexture | №0752 (+ 17 других файлов) |
| self | №1936 |
| serializedBytes | №1030 (+ 2 других файлов) |
| sets | №1081 |
| settings | №0001 |
| settled12Frames | №1084 |
| sha | №1134 |
| sha256 | №1985 (+ 27 других файлов) |
| Shader | №1030 |
| shadowColor | №1762 (+ 1 других файлов) |
| shadowOpacity | №1762 (+ 1 других файлов) |
| shapeFamilies | №1081 |
| shapeshifter | №1759 (+ 2 других файлов) |
| sharedProperties | №1938 |
| shellColor | №1762 (+ 1 других файлов) |
| shellSize | №1762 (+ 1 других файлов) |
| shippedSha256 | №0919 (+ 1 других файлов) |
| shoulders | №0912 (+ 5 других файлов) |
| showAbove | №0752 (+ 1 других файлов) |
| showBelow | №0752 (+ 1 других файлов) |
| showCeilings | №0752 (+ 1 других файлов) |
| showEp | №1908 |
| showPp | №1908 |
| signatureSchemes | №1081 |
| signatureV2 | №1083 (+ 1 других файлов) |
| signatureV3 | №1083 (+ 1 других файлов) |
| signatureVerification | №1035 |
| signedRelease | №0906 |
| signingCertificateSha256 | №1080 (+ 1 других файлов) |
| silver | №1937 |
| size | №1759 (+ 2 других файлов) |
| sizeChoice | №1759 (+ 2 других файлов) |
| skillBonuses | №1759 (+ 2 других файлов) |
| skills | №1759 (+ 2 других файлов) |
| skillsData | №1759 (+ 2 других файлов) |
| skinDetail | №1762 (+ 1 других файлов) |
| skinGlow | №1762 (+ 1 других файлов) |
| skinId | №1762 (+ 1 других файлов) |
| skins | №0912 |
| skinSurface | №1762 (+ 1 других файлов) |
| sky | №0753 (+ 9 других файлов) |
| slash | №0756 (+ 1 других файлов) |
| slashTexture | №0756 (+ 1 других файлов) |
| Sleep | №1937 |
| sleightOfHand | №1759 (+ 2 других файлов) |
| slime | №1084 |
| smith | №1937 |
| socks | №1762 (+ 1 других файлов) |
| softBodySolver | №1085 |
| somatic | №1759 (+ 1 других файлов) |
| source | №0087 (+ 15 других файлов) |
| sourceByteEquality | №1035 |
| sourceBytes | №1032 (+ 1 других файлов) |
| sourceCodeNeverDownloaded | №1019 |
| sourceCommit | №1046 (+ 12 других файлов) |
| sourceContracts | №1085 |
| sourceFileCount | №1036 |
| sourceGlbSha256 | №0919 (+ 1 других файлов) |
| sourceHashes | №0087 (+ 2 других файлов) |
| sourceId | №1936 |
| sourcePixelsModified | №1015 |
| sourceProject | №0919 |
| sourceRefs | №1017 |
| sourceRelease | №1035 |
| sources | №0919 (+ 4 других файлов) |
| sourceSha | №1081 |
| sourceSha256 | №0919 (+ 4 других файлов) |
| sourceSparseSha256 | №1770 |
| sourceStackTerms | №0919 |
| sp | №1908 |
| special | №1937 |
| speed | №1759 (+ 2 других файлов) |
| Speed | №1937 |
| speedFt | №1759 (+ 2 других файлов) |
| spells | №1759 (+ 1 других файлов) |
| spellsData | №1759 (+ 2 других файлов) |
| spellSlotsData | №1759 (+ 2 других файлов) |
| sPerG | №1908 |
| spiderClimb | №1759 (+ 2 других файлов) |
| Sprite | №1030 |
| sqlWasm | №1080 (+ 5 других файлов) |
| stability | №1937 (+ 1 других файлов) |
| Stability | №1937 |
| stableVersion | №0906 (+ 1 других файлов) |
| stacked | №1908 |
| stage | №0921 |
| stairDirection | №0752 (+ 3 других файлов) |
| stairFrom | №0752 (+ 3 других файлов) |
| stairsTo | №0753 (+ 5 других файлов) |
| stairTo | №0752 (+ 3 других файлов) |
| stat | №1759 (+ 2 других файлов) |
| statBonus | №1759 |
| statGenerationMode | №1759 (+ 2 других файлов) |
| statRollsUsed | №1759 (+ 2 других файлов) |
| stats | №1759 (+ 2 других файлов) |
| status | №0906 (+ 12 других файлов) |
| stealth | №1759 (+ 2 других файлов) |
| stealthDisadvantage | №1908 (+ 1 других файлов) |
| steel | №1937 |
| steps | №0752 (+ 3 других файлов) |
| sTexture | №0752 (+ 15 других файлов) |
| stone | №1084 |
| stoneEndurance | №1759 (+ 2 других файлов) |
| str | №1759 (+ 2 других файлов) |
| StreamingManager | №1030 |
| strength | №1759 (+ 2 других файлов) |
| Strength | №1937 |
| strictBodyAndNumeralRaster | №1080 |
| subclass | №1759 (+ 2 других файлов) |
| sunlightSensitivity | №1759 (+ 2 других файлов) |
| survival | №1759 (+ 2 других файлов) |
| swarmForm | №1762 (+ 1 других файлов) |
| swarmPercent | №1762 (+ 1 других файлов) |
| swim | №1759 (+ 2 других файлов) |
| synergies | №1938 |
| synergy | №1937 |
| syntheticSensorLifecycle | №1085 |
| T_Trim_Cloth_BaseColor | №1023 (+ 1 других файлов) |
| T_Trim_Cloth_Normal | №1023 (+ 1 других файлов) |
| T_Trim_Cloth_ORM | №1023 (+ 1 других файлов) |
| T_Trim_Furniture_BaseColor | №1023 (+ 1 других файлов) |
| T_Trim_Furniture_Normal | №1023 (+ 1 других файлов) |
| T_Trim_Furniture_ORM | №1023 (+ 1 других файлов) |
| T_Trim_Metal_BaseColor | №1023 (+ 1 других файлов) |
| T_Trim_Metal_Normal | №1023 (+ 1 других файлов) |
| T_Trim_Metal_ORM | №1023 (+ 1 других файлов) |
| T_Trim_Props_BaseColor | №1023 (+ 1 других файлов) |
| T_Trim_Props_Normal | №1023 (+ 1 других файлов) |
| T_Trim_Props_ORM | №1023 (+ 1 других файлов) |
| tag | №1037 |
| TagManager | №1030 |
| tags | №0752 (+ 14 других файлов) |
| tailColor | №1762 (+ 1 других файлов) |
| tailCurve | №1762 (+ 1 других файлов) |
| tailLength | №1762 (+ 1 других файлов) |
| tailThickness | №1762 (+ 1 других файлов) |
| tailTip | №1762 (+ 1 других файлов) |
| tailTuftSize | №1762 (+ 1 других файлов) |
| target | №1128 (+ 1 других файлов) |
| targetId | №1936 |
| targets | №0087 (+ 4 других файлов) |
| targetsTested | №1080 |
| tarotDamageTotals | №1936 |
| tarotKnowledge | №1936 |
| tarotLastStartedTurn | №1936 |
| telepathy | №1759 (+ 2 других файлов) |
| templatePinStates | №1959 |
| test | №1153 |
| testApkArtifact | №1046 |
| tests | №1081 (+ 1 других файлов) |
| TEXCOORD_0 | №0912 |
| text | №1908 (+ 1 других файлов) |
| TextAsset | №1030 |
| Texture2D | №1030 |
| textureFormat | №1030 (+ 2 других файлов) |
| textures | №1485 |
| themes | №1081 |
| then | №1018 |
| thread | №1937 |
| tiles | №0752 (+ 18 других файлов) |
| time | №1762 (+ 3 других файлов) |
| TimeManager | №1030 |
| title | №1018 (+ 2 других файлов) |
| toHit | №1908 (+ 1 других файлов) |
| tokenArt | №1935 |
| tokenReady | №1935 |
| tokens | №0752 (+ 18 других файлов) |
| toolAliases | №1937 |
| toolLabels | №1937 |
| toolProficiencies | №1759 (+ 1 других файлов) |
| tools | №1937 |
| top | №1762 (+ 1 других файлов) |
| topology | №0912 (+ 2 других файлов) |
| topologyFaceCases | №1085 |
| torso-muscle-pectoral-decr | №0087 (+ 1 других файлов) |
| torso-muscle-pectoral-incr | №0087 (+ 1 других файлов) |
| torsoRidgeSize | №1762 (+ 1 других файлов) |
| torsoRidgeWidth | №1762 (+ 1 других файлов) |
| totals | №1908 |
| totalWeightKg | №1908 |
| touched | №1084 |
| Transform | №1030 |
| trayRecipes | №1085 |
| triangles | №0912 (+ 1 других файлов) |
| trunk | №1759 (+ 2 других файлов) |
| trunkSize | №1762 (+ 1 других файлов) |
| turnIds | №1936 |
| tuskSize | №1762 (+ 1 других файлов) |
| type | №0752 (+ 28 других файлов) |
| typeCounts | №1030 |
| typeKey | №1908 (+ 1 других файлов) |
| unchanged | №0919 (+ 1 других файлов) |
| undeadResilience | №1759 (+ 2 других файлов) |
| underwearBottom | №1762 (+ 1 других файлов) |
| underwearTop | №1762 (+ 1 других файлов) |
| uniqueItems | №1018 |
| uniqueOriginalFiles | №1035 |
| uniquePositions | №0912 |
| unity-branch | №1017 |
| unityCopiedSha256 | №1037 |
| unityGuidEdges | №1017 |
| unityInclusion | №1017 |
| unityPyVersion | №1030 |
| unityValidation | №1770 |
| unityVersion | №1018 (+ 1 других файлов) |
| unknown | №1908 (+ 1 других файлов) |
| unlimitedTotalRequest | №1085 |
| unrelatedCiFailure | №1084 |
| unstable | №1938 |
| untouched | №1908 |
| updateManifest | №1134 |
| upgradeQaJob | №1081 |
| url | №1008 (+ 13 других файлов) |
| userAdded | №1959 |
| uvDirections | №1085 |
| uvOutsideUnitSquare | №0912 |
| uvRange | №0912 |
| validation | №1770 |
| value | №1908 |
| Venom | №1937 |
| verbal | №1759 (+ 1 других файлов) |
| version | №0001 (+ 52 других файлов) |
| versionCode | №0906 (+ 18 других файлов) |
| vertexCount | №0087 (+ 1 других файлов) |
| vertices | №0912 (+ 3 других файлов) |
| VFXManager | №1030 |
| view | №0752 (+ 17 других файлов) |
| vine | №1084 |
| Vitality | №1937 |
| volatility | №1937 (+ 1 других файлов) |
| Volatility | №1937 |
| vscode | №0001 |
| w | №0752 (+ 17 других файлов) |
| waist | №0912 (+ 5 других файлов) |
| walkable | №0752 (+ 3 других файлов) |
| walls | №0752 (+ 18 других файлов) |
| wax | №1937 |
| Weakness | №1937 |
| weapons | №1019 (+ 3 других файлов) |
| weaponsData | №1759 (+ 2 других файлов) |
| weaponTraining | №1759 (+ 2 других файлов) |
| weaver | №1937 |
| weight | №0087 (+ 8 других файлов) |
| weightCases | №1908 |
| weightHero | №1908 |
| WEIGHTS_0 | №0912 |
| weightSumMaxError | №0912 |
| weightTotal | №1908 |
| weldedBoundaryEdges | №0912 |
| weldedNonManifoldEdges | №0912 |
| weldTolerance | №0912 |
| width | №0752 (+ 22 других файлов) |
| win | №1128 |
| windows | №1015 (+ 9 других файлов) |
| windowsBundleBuilt | №1028 |
| windowsInstallUpgradeReinstall | №1085 |
| windowsUpgrade | №1082 (+ 3 других файлов) |
| wingColor | №1762 (+ 1 других файлов) |
| wingSize | №1762 (+ 1 других файлов) |
| wis | №1759 (+ 2 других файлов) |
| wisdom | №1759 (+ 2 других файлов) |
| wood | №1937 |
| woodwork | №1937 |
| workflows | №0906 (+ 1 других файлов) |
| workingTreeStatus | №1017 |
| wTexture | №0752 (+ 15 других файлов) |
| x | №0752 (+ 18 других файлов) |
| y | №0752 (+ 17 других файлов) |
| z | №0752 (+ 17 других файлов) |
| zeroWeightVertices | №0912 |
| zip | №0923 |
| zip_crc_and_all_entry_sha256 | №0908 |
| zip_sha256 | №0908 |
| zipCompressedBrandingBytes | №1046 (+ 5 других файлов) |
| zipCompressedNativeBytes | №1046 (+ 5 других файлов) |
| zipCompressedUnityDataBytes | №1046 (+ 5 других файлов) |
| zipSha256 | №0906 (+ 1 других файлов) |
| zones | №0752 (+ 17 других файлов) |

## Файлы с совпадающим Git SHA

Совпадение содержимого не означает, что путь можно удалить.

- unity/Assets/StreamingAssets/Branding/Dragon20.png ; unity/Assets/Vtt/Resources/Branding/Dragon20.png ; wallpapers/20.png
- unity/Assets/StreamingAssets/Branding/Splash19.png ; unity/Assets/Vtt/Resources/Branding/Splash19.png ; wallpapers/19.png
- unity/Assets/StreamingAssets/Branding/Wallpaper16.jpg ; unity/Assets/Vtt/Resources/Branding/Wallpaper16.jpg ; wallpapers/16.png
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

