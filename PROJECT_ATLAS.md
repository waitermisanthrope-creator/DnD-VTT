# DnD-VTT — полный атлас проекта

Снимок кода 48cd650f24c3. Git содержит 1783 файлов.
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
| №0001 .github/ai-control.json | 263 B | данные/конфигурация: ai control |
| №0002 .github/prompts/autonomous-development.md | 1262 B | документация или отчёт: autonomous development |
| №0003 .github/scripts/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №0004 .github/scripts/publish-unity-artifacts.py | 7851 B | вспомогательный файл: publish unity artifacts |
| №0005 .github/scripts/test-publish-unity-artifacts.py | 3738 B | вспомогательный файл: test publish unity artifacts |
| №0006 .github/workflows/android-debug.yml | 4285 B | автоматизация GitHub Actions: android debug |
| №0007 .github/workflows/android-release.yml | 8355 B | автоматизация GitHub Actions: android release |
| №0008 .github/workflows/autonomous-development.yml | 4646 B | автоматизация GitHub Actions: autonomous development |
| №0009 .github/workflows/build-windows-desktop.yml | 1494 B | автоматизация GitHub Actions: build windows desktop |
| №0010 .github/workflows/cloud-test-build.yml | 3555 B | автоматизация GitHub Actions: cloud test build |
| №0011 .github/workflows/convert-remaining-furniture.yml | 2011 B | автоматизация GitHub Actions: convert remaining furniture |
| №0012 .github/workflows/deploy-pages.yml | 3740 B | автоматизация GitHub Actions: deploy pages |
| №0013 .github/workflows/human-glb-audit.yml | 966 B | автоматизация GitHub Actions: human glb audit |
| №0014 .github/workflows/import-root-furniture.yml | 3644 B | автоматизация GitHub Actions: import root furniture |
| №0015 .github/workflows/map-ui-stage-qa.yml | 802 B | автоматизация GitHub Actions: map ui stage qa |
| №0016 .github/workflows/project-atlas.yml | 990 B | автоматическое обновление атласа на GitHub |
| №0017 .github/workflows/publish-stress-map-ota.yml | 472 B | автоматизация GitHub Actions: publish stress map ota |
| №0018 .github/workflows/refresh-update-manifest.yml | 558 B | автоматизация GitHub Actions: refresh update manifest |
| №0019 .github/workflows/test-gltf-loader.yml | 743 B | автоматизация GitHub Actions: test gltf loader |
| №0020 .github/workflows/test-stair-navigation.yml | 778 B | автоматизация GitHub Actions: test stair navigation |
| №0021 .github/workflows/unified-release.yml | 14407 B | автоматизация GitHub Actions: unified release |
| №0022 .github/workflows/unity-cloud-candidate.yml | 6776 B | автоматизация GitHub Actions: unity cloud candidate |
| №0023 .github/workflows/unity-delivery-publish.yml | 872 B | автоматизация GitHub Actions: unity delivery publish |
| №0024 .github/workflows/unity-experiment-android.yml | 2862 B | автоматизация GitHub Actions: unity experiment android |
| №0025 .github/workflows/unpack-project.yml | 3071 B | автоматизация GitHub Actions: unpack project |
| №0026 .github/workflows/validate-imported-glb.yml | 2365 B | автоматизация GitHub Actions: validate imported glb |
| №0027 .gitignore | 86 B | вспомогательный файл: .gitignore |
| №0028 00_AI_PROJECT_GUIDE.md | 1118692 B | существующее руководство ИИ, не перезаписывать |
| №0029 01_plansforproject.md | 62287 B | план целей и критериев выполнения |
| №0030 1790622696215.png | 1202179 B | текстура/изображение: 1790622696215 |
| №0031 1790622844831.png | 104000 B | текстура/изображение: 1790622844831 |
| №0032 1790718758545.png | 1889164 B | текстура/изображение: 1790718758545 |
| №0033 1790788500741.png | 1468216 B | текстура/изображение: 1790788500741 |
| №0034 3D_CHARACTER_CLOTHING_PROGRESS.md | 85343 B | документация или отчёт: 3D CHARACTER CLOTHING PROGRESS |
| №0035 3D_CHARACTER_RACES_PROGRESS.md | 75939 B | документация или отчёт: 3D CHARACTER RACES PROGRESS |
| №0036 AGENTS.md | 4945 B | документация или отчёт: AGENTS |
| №0037 AI_BLOCKERS.md | 7393 B | документация или отчёт: AI BLOCKERS |
| №0038 AI_NEXT_TASK.md | 8254 B | документация или отчёт: AI NEXT TASK |
| №0039 AI_PROGRESS.md | 44971 B | документация или отчёт: AI PROGRESS |
| №0040 android/.gitignore | 48 B | Android компонент: .gitignore |
| №0041 android/app/build.gradle | 4243 B | Android компонент: build |
| №0042 android/app/src/main/AndroidManifest.xml | 12350 B | Android компонент: AndroidManifest |
| №0043 android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java | 35594 B | Android: bridge обновлений |
| №0044 android/app/src/main/java/com/dndvtt/app/MainActivity.java | 7743 B | Android: запуск WebView |
| №0045 android/app/src/main/res/values-v31/styles.xml | 537 B | Android компонент: styles |
| №0046 android/app/src/main/res/values/styles.xml | 416 B | Android компонент: styles |
| №0047 android/build.gradle | 76 B | Android компонент: build |
| №0048 android/gradle.properties | 109 B | Android компонент: gradle |
| №0049 android/README.md | 695 B | документация или отчёт: README |
| №0050 android/settings.gradle | 351 B | Android компонент: settings |
| №0051 app/3dmap/assets/clothing/fantasy-materials.webp | 434234 B | компонент 3D карты/редактора: fantasy materials |
| №0052 app/3dmap/assets/clothing/lingerie-nylon.webp | 289830 B | компонент 3D карты/редактора: lingerie nylon |
| №0053 app/3dmap/character_anatomy_geometry.js | 22924 B | компонент 3D карты/редактора: character anatomy geometry |
| №0054 app/3dmap/character_anatomy.js | 8500 B | компонент 3D карты/редактора: character anatomy |
| №0055 app/3dmap/character_appearance_store.js | 2639 B | компонент 3D карты/редактора: character appearance store |
| №0056 app/3dmap/character_body_geometry.js | 121072 B | компонент 3D карты/редактора: character body geometry |
| №0057 app/3dmap/character_clothing.js | 51816 B | компонент 3D карты/редактора: character clothing |
| №0058 app/3dmap/character_editor_3d.js | 167015 B | компонент 3D карты/редактора: character editor 3d |
| №0059 app/3dmap/character_morph_assets.js | 3344 B | компонент 3D карты/редактора: character morph assets |
| №0060 app/3dmap/character_pose.js | 4767 B | компонент 3D карты/редактора: character pose |
| №0061 app/3dmap/character_system.js | 50039 B | компонент 3D карты/редактора: character system |
| №0062 app/3dmap/gltf_catalog.js | 90795 B | компонент 3D карты/редактора: gltf catalog |
| №0063 app/3dmap/gltf_character_pipeline.js | 7841 B | компонент 3D карты/редактора: gltf character pipeline |
| №0064 app/3dmap/gltf_loader.js | 10043 B | компонент 3D карты/редактора: gltf loader |
| №0065 app/3dmap/map_editor.js | 45883 B | компонент 3D карты/редактора: map editor |
| №0066 app/3dmap/map_model.js | 7800 B | компонент 3D карты/редактора: map model |
| №0067 app/3dmap/map_renderer_2d.js | 7361 B | компонент 3D карты/редактора: map renderer 2d |
| №0068 app/3dmap/map_renderer_3d.js | 24226 B | компонент 3D карты/редактора: map renderer 3d |
| №0069 app/3dmap/map_world.js | 9144 B | компонент 3D карты/редактора: map world |
| №0070 app/3dmap/stair_navigation.js | 955 B | компонент 3D карты/редактора: stair navigation |
| №0071 app/3dmap/stress_map.js | 3315 B | компонент 3D карты/редактора: stress map |
| №0072 app/accursed_oap_v11_runtime.js | 31572 B | логический модуль: accursed oap v11 runtime |
| №0073 app/alchemist_mhp_2024_runtime.js | 140995 B | логический модуль: alchemist mhp 2024 runtime |
| №0074 app/alchemy_engine_v29.js | 40929 B | логический модуль: alchemy engine v29 |
| №0075 app/alchemy_gameplay_v30.js | 17912 B | логический модуль: alchemy gameplay v30 |
| №0076 app/alchemy_gathering_professions_v52.js | 11956 B | логический модуль: alchemy gathering professions v52 |
| №0077 app/Ambiences.js | 14999 B | логический модуль: Ambiences |
| №0078 app/app.js | 38020 B | главный контроллер; currentChar и все персонажи |
| №0079 app/armors.js | 28000 B | логический модуль: armors |
| №0080 app/assets/3d/makehuman/editor-morphs.bin | 2340320 B | ассет графики/3D/интерфейса: editor morphs |
| №0081 app/assets/3d/makehuman/editor-morphs.json | 11913 B | ассет графики/3D/интерфейса: editor morphs |
| №0082 app/assets/3d/makehuman/human-body-morphs.glb | 12671780 B | ассет графики/3D/интерфейса: human body morphs |
| №0083 app/assets/3d/makehuman/LICENSE.ASSETS.md | 7003 B | документация или отчёт: LICENSE.ASSETS |
| №0084 app/assets/3d/makehuman/materials/skin_color_detail_v1.png | 2922380 B | ассет графики/3D/интерфейса: skin color detail v1 |
| №0085 app/assets/3d/makehuman/materials/skin_micro_normal_roughness.png | 22965 B | ассет графики/3D/интерфейса: skin micro normal roughness |
| №0086 app/assets/3d/makehuman/README.md | 1537 B | документация или отчёт: README |
| №0087 app/assets/3d/makehuman/skins/young_caucasian_female/young_caucasian_female.mhmat | 1522 B | ассет графики/3D/интерфейса: young caucasian female |
| №0088 app/assets/3d/makehuman/skins/young_caucasian_female/young_lightskinned_female_diffuse.png | 4391156 B | ассет графики/3D/интерфейса: young lightskinned female diffuse |
| №0089 app/assets/3d/makehuman/skins/young_caucasian_male/young_caucasian_male.mhmat | 1517 B | ассет графики/3D/интерфейса: young caucasian male |
| №0090 app/assets/3d/makehuman/skins/young_caucasian_male/young_lightskinned_male_diffuse.png | 3693828 B | ассет графики/3D/интерфейса: young lightskinned male diffuse |
| №0091 app/assets/3d/quaternius/models/Anvil_Log.bin | 130880 B | ассет графики/3D/интерфейса: Anvil Log |
| №0092 app/assets/3d/quaternius/models/Anvil_Log.gltf | 5957 B | ассет графики/3D/интерфейса: Anvil Log |
| №0093 app/assets/3d/quaternius/models/Anvil.bin | 24020 B | ассет графики/3D/интерфейса: Anvil |
| №0094 app/assets/3d/quaternius/models/Anvil.gltf | 3415 B | ассет графики/3D/интерфейса: Anvil |
| №0095 app/assets/3d/quaternius/models/Axe_Bronze.bin | 31156 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0096 app/assets/3d/quaternius/models/Axe_Bronze.gltf | 2775 B | ассет графики/3D/интерфейса: Axe Bronze |
| №0097 app/assets/3d/quaternius/models/Bag.bin | 27188 B | ассет графики/3D/интерфейса: Bag |
| №0098 app/assets/3d/quaternius/models/Bag.gltf | 4614 B | ассет графики/3D/интерфейса: Bag |
| №0099 app/assets/3d/quaternius/models/Banner_1_Cloth.bin | 6636 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0100 app/assets/3d/quaternius/models/Banner_1_Cloth.gltf | 4992 B | ассет графики/3D/интерфейса: Banner 1 Cloth |
| №0101 app/assets/3d/quaternius/models/Banner_1.bin | 20976 B | ассет графики/3D/интерфейса: Banner 1 |
| №0102 app/assets/3d/quaternius/models/Banner_1.gltf | 7247 B | ассет графики/3D/интерфейса: Banner 1 |
| №0103 app/assets/3d/quaternius/models/Banner_2_Cloth.bin | 4940 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0104 app/assets/3d/quaternius/models/Banner_2_Cloth.gltf | 4993 B | ассет графики/3D/интерфейса: Banner 2 Cloth |
| №0105 app/assets/3d/quaternius/models/Banner_2.bin | 19280 B | ассет графики/3D/интерфейса: Banner 2 |
| №0106 app/assets/3d/quaternius/models/Banner_2.gltf | 7246 B | ассет графики/3D/интерфейса: Banner 2 |
| №0107 app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0108 app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6660 B | ассет графики/3D/интерфейса: Barrel Apples |
| №0109 app/assets/3d/quaternius/models/Barrel_Holder.bin | 161816 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0110 app/assets/3d/quaternius/models/Barrel_Holder.gltf | 4643 B | ассет графики/3D/интерфейса: Barrel Holder |
| №0111 app/assets/3d/quaternius/models/Barrel.bin | 57144 B | ассет графики/3D/интерфейса: Barrel |
| №0112 app/assets/3d/quaternius/models/Barrel.gltf | 4607 B | ассет графики/3D/интерфейса: Barrel |
| №0113 app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0114 app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6636 B | ассет графики/3D/интерфейса: Bed Twin1 |
| №0115 app/assets/3d/quaternius/models/Bed_Twin2.bin | 76624 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0116 app/assets/3d/quaternius/models/Bed_Twin2.gltf | 6636 B | ассет графики/3D/интерфейса: Bed Twin2 |
| №0117 app/assets/3d/quaternius/models/Bench.bin | 19304 B | ассет графики/3D/интерфейса: Bench |
| №0118 app/assets/3d/quaternius/models/Bench.gltf | 4594 B | ассет графики/3D/интерфейса: Bench |
| №0119 app/assets/3d/quaternius/models/Book_5.bin | 5856 B | ассет графики/3D/интерфейса: Book 5 |
| №0120 app/assets/3d/quaternius/models/Book_5.gltf | 2576 B | ассет графики/3D/интерфейса: Book 5 |
| №0121 app/assets/3d/quaternius/models/Book_7.bin | 32664 B | ассет графики/3D/интерфейса: Book 7 |
| №0122 app/assets/3d/quaternius/models/Book_7.gltf | 4586 B | ассет графики/3D/интерфейса: Book 7 |
| №0123 app/assets/3d/quaternius/models/Book_Simplified_Single.bin | 3192 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0124 app/assets/3d/quaternius/models/Book_Simplified_Single.gltf | 2601 B | ассет графики/3D/интерфейса: Book Simplified Single |
| №0125 app/assets/3d/quaternius/models/Book_Stack_1.bin | 12768 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0126 app/assets/3d/quaternius/models/Book_Stack_1.gltf | 2591 B | ассет графики/3D/интерфейса: Book Stack 1 |
| №0127 app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0128 app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4605 B | ассет графики/3D/интерфейса: Book Stack 2 |
| №0129 app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0130 app/assets/3d/quaternius/models/Bookcase_2.gltf | 4625 B | ассет графики/3D/интерфейса: Bookcase 2 |
| №0131 app/assets/3d/quaternius/models/BookGroup_Medium_1.bin | 25536 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0132 app/assets/3d/quaternius/models/BookGroup_Medium_1.gltf | 2602 B | ассет графики/3D/интерфейса: BookGroup Medium 1 |
| №0133 app/assets/3d/quaternius/models/BookGroup_Medium_2.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0134 app/assets/3d/quaternius/models/BookGroup_Medium_2.gltf | 2604 B | ассет графики/3D/интерфейса: BookGroup Medium 2 |
| №0135 app/assets/3d/quaternius/models/BookGroup_Medium_3.bin | 28728 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0136 app/assets/3d/quaternius/models/BookGroup_Medium_3.gltf | 2605 B | ассет графики/3D/интерфейса: BookGroup Medium 3 |
| №0137 app/assets/3d/quaternius/models/BookGroup_Small_1.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0138 app/assets/3d/quaternius/models/BookGroup_Small_1.gltf | 2596 B | ассет графики/3D/интерфейса: BookGroup Small 1 |
| №0139 app/assets/3d/quaternius/models/BookGroup_Small_2.bin | 6384 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0140 app/assets/3d/quaternius/models/BookGroup_Small_2.gltf | 2599 B | ассет графики/3D/интерфейса: BookGroup Small 2 |
| №0141 app/assets/3d/quaternius/models/BookGroup_Small_3.bin | 7980 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0142 app/assets/3d/quaternius/models/BookGroup_Small_3.gltf | 2597 B | ассет графики/3D/интерфейса: BookGroup Small 3 |
| №0143 app/assets/3d/quaternius/models/BookStand.bin | 62020 B | ассет графики/3D/интерфейса: BookStand |
| №0144 app/assets/3d/quaternius/models/BookStand.gltf | 2382 B | ассет графики/3D/интерфейса: BookStand |
| №0145 app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0146 app/assets/3d/quaternius/models/Bottle_1.gltf | 2586 B | ассет графики/3D/интерфейса: Bottle 1 |
| №0147 app/assets/3d/quaternius/models/Bucket_Metal.bin | 18824 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0148 app/assets/3d/quaternius/models/Bucket_Metal.gltf | 2365 B | ассет графики/3D/интерфейса: Bucket Metal |
| №0149 app/assets/3d/quaternius/models/Bucket_Wooden_1.bin | 32544 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0150 app/assets/3d/quaternius/models/Bucket_Wooden_1.gltf | 4179 B | ассет графики/3D/интерфейса: Bucket Wooden 1 |
| №0151 app/assets/3d/quaternius/models/Cabinet.bin | 114768 B | ассет графики/3D/интерфейса: Cabinet |
| №0152 app/assets/3d/quaternius/models/Cabinet.gltf | 4620 B | ассет графики/3D/интерфейса: Cabinet |
| №0153 app/assets/3d/quaternius/models/Cage_Small.bin | 171848 B | ассет графики/3D/интерфейса: Cage Small |
| №0154 app/assets/3d/quaternius/models/Cage_Small.gltf | 2366 B | ассет графики/3D/интерфейса: Cage Small |
| №0155 app/assets/3d/quaternius/models/Candle_1.bin | 6200 B | ассет графики/3D/интерфейса: Candle 1 |
| №0156 app/assets/3d/quaternius/models/Candle_1.gltf | 2350 B | ассет графики/3D/интерфейса: Candle 1 |
| №0157 app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | ассет графики/3D/интерфейса: Candle 2 |
| №0158 app/assets/3d/quaternius/models/Candle_2.gltf | 2350 B | ассет графики/3D/интерфейса: Candle 2 |
| №0159 app/assets/3d/quaternius/models/CandleStick_Stand.bin | 226228 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0160 app/assets/3d/quaternius/models/CandleStick_Stand.gltf | 4643 B | ассет графики/3D/интерфейса: CandleStick Stand |
| №0161 app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0162 app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 4168 B | ассет графики/3D/интерфейса: CandleStick Triple |
| №0163 app/assets/3d/quaternius/models/CandleStick.bin | 21436 B | ассет графики/3D/интерфейса: CandleStick |
| №0164 app/assets/3d/quaternius/models/CandleStick.gltf | 2358 B | ассет графики/3D/интерфейса: CandleStick |
| №0165 app/assets/3d/quaternius/models/Carrot.bin | 22244 B | ассет графики/3D/интерфейса: Carrot |
| №0166 app/assets/3d/quaternius/models/Carrot.gltf | 2584 B | ассет графики/3D/интерфейса: Carrot |
| №0167 app/assets/3d/quaternius/models/Cauldron.bin | 62712 B | ассет графики/3D/интерфейса: Cauldron |
| №0168 app/assets/3d/quaternius/models/Cauldron.gltf | 2354 B | ассет графики/3D/интерфейса: Cauldron |
| №0169 app/assets/3d/quaternius/models/Chain_Coil.bin | 193664 B | ассет графики/3D/интерфейса: Chain Coil |
| №0170 app/assets/3d/quaternius/models/Chain_Coil.gltf | 2597 B | ассет графики/3D/интерфейса: Chain Coil |
| №0171 app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | ассет графики/3D/интерфейса: Chair 1 |
| №0172 app/assets/3d/quaternius/models/Chair_1.gltf | 4608 B | ассет графики/3D/интерфейса: Chair 1 |
| №0173 app/assets/3d/quaternius/models/Chalice.bin | 15644 B | ассет графики/3D/интерфейса: Chalice |
| №0174 app/assets/3d/quaternius/models/Chalice.gltf | 2356 B | ассет графики/3D/интерфейса: Chalice |
| №0175 app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | ассет графики/3D/интерфейса: Chandelier |
| №0176 app/assets/3d/quaternius/models/Chandelier.gltf | 6678 B | ассет графики/3D/интерфейса: Chandelier |
| №0177 app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | ассет графики/3D/интерфейса: Chest Wood |
| №0178 app/assets/3d/quaternius/models/Chest_Wood.gltf | 22924 B | ассет графики/3D/интерфейса: Chest Wood |
| №0179 app/assets/3d/quaternius/models/Coin_Pile_2.bin | 52612 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0180 app/assets/3d/quaternius/models/Coin_Pile_2.gltf | 2602 B | ассет графики/3D/интерфейса: Coin Pile 2 |
| №0181 app/assets/3d/quaternius/models/Coin_Pile.bin | 47520 B | ассет графики/3D/интерфейса: Coin Pile |
| №0182 app/assets/3d/quaternius/models/Coin_Pile.gltf | 2597 B | ассет графики/3D/интерфейса: Coin Pile |
| №0183 app/assets/3d/quaternius/models/Coin.bin | 14464 B | ассет графики/3D/интерфейса: Coin |
| №0184 app/assets/3d/quaternius/models/Coin.gltf | 2581 B | ассет графики/3D/интерфейса: Coin |
| №0185 app/assets/3d/quaternius/models/Crate_Metal.bin | 126828 B | ассет графики/3D/интерфейса: Crate Metal |
| №0186 app/assets/3d/quaternius/models/Crate_Metal.gltf | 4631 B | ассет графики/3D/интерфейса: Crate Metal |
| №0187 app/assets/3d/quaternius/models/Crate_Wooden.bin | 66496 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0188 app/assets/3d/quaternius/models/Crate_Wooden.gltf | 4713 B | ассет графики/3D/интерфейса: Crate Wooden |
| №0189 app/assets/3d/quaternius/models/Dummy.bin | 80988 B | ассет графики/3D/интерфейса: Dummy |
| №0190 app/assets/3d/quaternius/models/Dummy.gltf | 5947 B | ассет графики/3D/интерфейса: Dummy |
| №0191 app/assets/3d/quaternius/models/FarmCrate_Apple.bin | 134488 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0192 app/assets/3d/quaternius/models/FarmCrate_Apple.gltf | 6682 B | ассет графики/3D/интерфейса: FarmCrate Apple |
| №0193 app/assets/3d/quaternius/models/FarmCrate_Carrot.bin | 204292 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0194 app/assets/3d/quaternius/models/FarmCrate_Carrot.gltf | 6692 B | ассет графики/3D/интерфейса: FarmCrate Carrot |
| №0195 app/assets/3d/quaternius/models/FarmCrate_Empty.bin | 54704 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0196 app/assets/3d/quaternius/models/FarmCrate_Empty.gltf | 4183 B | ассет графики/3D/интерфейса: FarmCrate Empty |
| №0197 app/assets/3d/quaternius/models/Key_Gold.bin | 58636 B | ассет графики/3D/интерфейса: Key Gold |
| №0198 app/assets/3d/quaternius/models/Key_Gold.gltf | 2597 B | ассет графики/3D/интерфейса: Key Gold |
| №0199 app/assets/3d/quaternius/models/Key_Metal.bin | 19340 B | ассет графики/3D/интерфейса: Key Metal |
| №0200 app/assets/3d/quaternius/models/Key_Metal.gltf | 2356 B | ассет графики/3D/интерфейса: Key Metal |
| №0201 app/assets/3d/quaternius/models/Lantern_Wall.bin | 120036 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0202 app/assets/3d/quaternius/models/Lantern_Wall.gltf | 2362 B | ассет графики/3D/интерфейса: Lantern Wall |
| №0203 app/assets/3d/quaternius/models/Mug.bin | 12488 B | ассет графики/3D/интерфейса: Mug |
| №0204 app/assets/3d/quaternius/models/Mug.gltf | 4149 B | ассет графики/3D/интерфейса: Mug |
| №0205 app/assets/3d/quaternius/models/Nightstand_Shelf.bin | 21412 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0206 app/assets/3d/quaternius/models/Nightstand_Shelf.gltf | 2620 B | ассет графики/3D/интерфейса: Nightstand Shelf |
| №0207 app/assets/3d/quaternius/models/Peg_Rack.bin | 26672 B | ассет графики/3D/интерфейса: Peg Rack |
| №0208 app/assets/3d/quaternius/models/Peg_Rack.gltf | 4147 B | ассет графики/3D/интерфейса: Peg Rack |
| №0209 app/assets/3d/quaternius/models/Pickaxe_Bronze.bin | 30736 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0210 app/assets/3d/quaternius/models/Pickaxe_Bronze.gltf | 2598 B | ассет графики/3D/интерфейса: Pickaxe Bronze |
| №0211 app/assets/3d/quaternius/models/Pot_1_Lid.bin | 46120 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0212 app/assets/3d/quaternius/models/Pot_1_Lid.gltf | 2355 B | ассет графики/3D/интерфейса: Pot 1 Lid |
| №0213 app/assets/3d/quaternius/models/Pot_1.bin | 37160 B | ассет графики/3D/интерфейса: Pot 1 |
| №0214 app/assets/3d/quaternius/models/Pot_1.gltf | 2344 B | ассет графики/3D/интерфейса: Pot 1 |
| №0215 app/assets/3d/quaternius/models/Potion_1.bin | 18200 B | ассет графики/3D/интерфейса: Potion 1 |
| №0216 app/assets/3d/quaternius/models/Potion_1.gltf | 2591 B | ассет графики/3D/интерфейса: Potion 1 |
| №0217 app/assets/3d/quaternius/models/Potion_2.bin | 19672 B | ассет графики/3D/интерфейса: Potion 2 |
| №0218 app/assets/3d/quaternius/models/Potion_2.gltf | 2591 B | ассет графики/3D/интерфейса: Potion 2 |
| №0219 app/assets/3d/quaternius/models/Potion_4.bin | 22536 B | ассет графики/3D/интерфейса: Potion 4 |
| №0220 app/assets/3d/quaternius/models/Potion_4.gltf | 2591 B | ассет графики/3D/интерфейса: Potion 4 |
| №0221 app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | ассет графики/3D/интерфейса: Pouch Large |
| №0222 app/assets/3d/quaternius/models/Pouch_Large.gltf | 4602 B | ассет графики/3D/интерфейса: Pouch Large |
| №0223 app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | ассет графики/3D/интерфейса: Rope 1 |
| №0224 app/assets/3d/quaternius/models/Rope_1.gltf | 2382 B | ассет графики/3D/интерфейса: Rope 1 |
| №0225 app/assets/3d/quaternius/models/Rope_2.bin | 34904 B | ассет графики/3D/интерфейса: Rope 2 |
| №0226 app/assets/3d/quaternius/models/Rope_2.gltf | 2382 B | ассет графики/3D/интерфейса: Rope 2 |
| №0227 app/assets/3d/quaternius/models/Rope_3.bin | 41624 B | ассет графики/3D/интерфейса: Rope 3 |
| №0228 app/assets/3d/quaternius/models/Rope_3.gltf | 2384 B | ассет графики/3D/интерфейса: Rope 3 |
| №0229 app/assets/3d/quaternius/models/Scroll_1.bin | 20112 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0230 app/assets/3d/quaternius/models/Scroll_1.gltf | 4228 B | ассет графики/3D/интерфейса: Scroll 1 |
| №0231 app/assets/3d/quaternius/models/Scroll_2.bin | 28392 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0232 app/assets/3d/quaternius/models/Scroll_2.gltf | 4242 B | ассет графики/3D/интерфейса: Scroll 2 |
| №0233 app/assets/3d/quaternius/models/Shelf_Arch.bin | 64836 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0234 app/assets/3d/quaternius/models/Shelf_Arch.gltf | 4628 B | ассет графики/3D/интерфейса: Shelf Arch |
| №0235 app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0236 app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2383 B | ассет графики/3D/интерфейса: Shelf Simple |
| №0237 app/assets/3d/quaternius/models/Shelf_Small_Bottles.bin | 229484 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0238 app/assets/3d/quaternius/models/Shelf_Small_Bottles.gltf | 6685 B | ассет графики/3D/интерфейса: Shelf Small Bottles |
| №0239 app/assets/3d/quaternius/models/Shield_Wooden.bin | 64184 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0240 app/assets/3d/quaternius/models/Shield_Wooden.gltf | 6662 B | ассет графики/3D/интерфейса: Shield Wooden |
| №0241 app/assets/3d/quaternius/models/SmallBottle.bin | 5700 B | ассет графики/3D/интерфейса: SmallBottle |
| №0242 app/assets/3d/quaternius/models/SmallBottle.gltf | 2565 B | ассет графики/3D/интерфейса: SmallBottle |
| №0243 app/assets/3d/quaternius/models/SmallBottles_1.bin | 20556 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0244 app/assets/3d/quaternius/models/SmallBottles_1.gltf | 2596 B | ассет графики/3D/интерфейса: SmallBottles 1 |
| №0245 app/assets/3d/quaternius/models/Stall_Cart_Empty.bin | 237264 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0246 app/assets/3d/quaternius/models/Stall_Cart_Empty.gltf | 7315 B | ассет графики/3D/интерфейса: Stall Cart Empty |
| №0247 app/assets/3d/quaternius/models/Stall_Empty.bin | 88176 B | ассет графики/3D/интерфейса: Stall Empty |
| №0248 app/assets/3d/quaternius/models/Stall_Empty.gltf | 7262 B | ассет графики/3D/интерфейса: Stall Empty |
| №0249 app/assets/3d/quaternius/models/Stool.bin | 11472 B | ассет графики/3D/интерфейса: Stool |
| №0250 app/assets/3d/quaternius/models/Stool.gltf | 2596 B | ассет графики/3D/интерфейса: Stool |
| №0251 app/assets/3d/quaternius/models/Sword_Bronze.bin | 69920 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0252 app/assets/3d/quaternius/models/Sword_Bronze.gltf | 2609 B | ассет графики/3D/интерфейса: Sword Bronze |
| №0253 app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | ассет графики/3D/интерфейса: Table Fork |
| №0254 app/assets/3d/quaternius/models/Table_Fork.gltf | 2348 B | ассет графики/3D/интерфейса: Table Fork |
| №0255 app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | ассет графики/3D/интерфейса: Table Knife |
| №0256 app/assets/3d/quaternius/models/Table_Knife.gltf | 2345 B | ассет графики/3D/интерфейса: Table Knife |
| №0257 app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | ассет графики/3D/интерфейса: Table Large |
| №0258 app/assets/3d/quaternius/models/Table_Large.gltf | 4612 B | ассет графики/3D/интерфейса: Table Large |
| №0259 app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | ассет графики/3D/интерфейса: Table Plate |
| №0260 app/assets/3d/quaternius/models/Table_Plate.gltf | 2358 B | ассет графики/3D/интерфейса: Table Plate |
| №0261 app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | ассет графики/3D/интерфейса: Table Spoon |
| №0262 app/assets/3d/quaternius/models/Table_Spoon.gltf | 2350 B | ассет графики/3D/интерфейса: Table Spoon |
| №0263 app/assets/3d/quaternius/models/Torch_Metal.bin | 39100 B | ассет графики/3D/интерфейса: Torch Metal |
| №0264 app/assets/3d/quaternius/models/Torch_Metal.gltf | 2362 B | ассет графики/3D/интерфейса: Torch Metal |
| №0265 app/assets/3d/quaternius/models/Vase_2.bin | 21188 B | ассет графики/3D/интерфейса: Vase 2 |
| №0266 app/assets/3d/quaternius/models/Vase_2.gltf | 2580 B | ассет графики/3D/интерфейса: Vase 2 |
| №0267 app/assets/3d/quaternius/models/Vase_4.bin | 22028 B | ассет графики/3D/интерфейса: Vase 4 |
| №0268 app/assets/3d/quaternius/models/Vase_4.gltf | 2585 B | ассет графики/3D/интерфейса: Vase 4 |
| №0269 app/assets/3d/quaternius/models/Vase_Rubble_Medium.bin | 85960 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0270 app/assets/3d/quaternius/models/Vase_Rubble_Medium.gltf | 2626 B | ассет графики/3D/интерфейса: Vase Rubble Medium |
| №0271 app/assets/3d/quaternius/models/WeaponStand.bin | 76312 B | ассет графики/3D/интерфейса: WeaponStand |
| №0272 app/assets/3d/quaternius/models/WeaponStand.gltf | 4171 B | ассет графики/3D/интерфейса: WeaponStand |
| №0273 app/assets/3d/quaternius/models/Whetstone.bin | 59280 B | ассет графики/3D/интерфейса: Whetstone |
| №0274 app/assets/3d/quaternius/models/Whetstone.gltf | 6631 B | ассет графики/3D/интерфейса: Whetstone |
| №0275 app/assets/3d/quaternius/models/Workbench_Drawers.bin | 16824 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0276 app/assets/3d/quaternius/models/Workbench_Drawers.gltf | 4609 B | ассет графики/3D/интерфейса: Workbench Drawers |
| №0277 app/assets/3d/quaternius/models/Workbench.bin | 63408 B | ассет графики/3D/интерфейса: Workbench |
| №0278 app/assets/3d/quaternius/models/Workbench.gltf | 4614 B | ассет графики/3D/интерфейса: Workbench |
| №0279 app/assets/3d/quaternius/textures/T_Page_Noise.png | 7486734 B | ассет графики/3D/интерфейса: T Page Noise |
| №0280 app/assets/3d/quaternius/textures/T_Trim_Cloth_BaseColor.png | 1936754 B | ассет графики/3D/интерфейса: T Trim Cloth BaseColor |
| №0281 app/assets/3d/quaternius/textures/T_Trim_Cloth_Normal.png | 3920858 B | ассет графики/3D/интерфейса: T Trim Cloth Normal |
| №0282 app/assets/3d/quaternius/textures/T_Trim_Cloth_ORM.png | 623426 B | ассет графики/3D/интерфейса: T Trim Cloth ORM |
| №0283 app/assets/3d/quaternius/textures/T_Trim_Furniture_BaseColor.png | 2232961 B | ассет графики/3D/интерфейса: T Trim Furniture BaseColor |
| №0284 app/assets/3d/quaternius/textures/T_Trim_Furniture_Normal.png | 3485710 B | ассет графики/3D/интерфейса: T Trim Furniture Normal |
| №0285 app/assets/3d/quaternius/textures/T_Trim_Furniture_ORM.png | 2064585 B | ассет графики/3D/интерфейса: T Trim Furniture ORM |
| №0286 app/assets/3d/quaternius/textures/T_Trim_Metal_BaseColor.png | 1361221 B | ассет графики/3D/интерфейса: T Trim Metal BaseColor |
| №0287 app/assets/3d/quaternius/textures/T_Trim_Metal_Normal.png | 3625541 B | ассет графики/3D/интерфейса: T Trim Metal Normal |
| №0288 app/assets/3d/quaternius/textures/T_Trim_Metal_ORM.png | 1871475 B | ассет графики/3D/интерфейса: T Trim Metal ORM |
| №0289 app/assets/3d/quaternius/textures/T_Trim_Props_BaseColor.png | 2263132 B | ассет графики/3D/интерфейса: T Trim Props BaseColor |
| №0290 app/assets/3d/quaternius/textures/T_Trim_Props_Normal.png | 4441458 B | ассет графики/3D/интерфейса: T Trim Props Normal |
| №0291 app/assets/3d/quaternius/textures/T_Trim_Props_ORM.png | 3017151 B | ассет графики/3D/интерфейса: T Trim Props ORM |
| №0292 app/assets/3d/race_surfaces/bird-contour-feathers-v1.webp | 510226 B | ассет графики/3D/интерфейса: bird contour feathers v1 |
| №0293 app/assets/3d/race_surfaces/flight-feather-vane-v1.webp | 555662 B | ассет графики/3D/интерфейса: flight feather vane v1 |
| №0294 app/assets/3d/race_surfaces/mammal-underfur-v1.webp | 544064 B | ассет графики/3D/интерфейса: mammal underfur v1 |
| №0295 app/assets/3d/race_surfaces/reptile-scales-v1.webp | 730360 B | ассет графики/3D/интерфейса: reptile scales v1 |
| №0296 app/assets/3d/user_furniture/altar_table.glb | 36228 B | ассет графики/3D/интерфейса: altar table |
| №0297 app/assets/3d/user_furniture/apothecary_jar_shelf.glb | 106668 B | ассет графики/3D/интерфейса: apothecary jar shelf |
| №0298 app/assets/3d/user_furniture/apothecary_shelf.glb | 107148 B | ассет графики/3D/интерфейса: apothecary shelf |
| №0299 app/assets/3d/user_furniture/armour_stand.glb | 16340 B | ассет графики/3D/интерфейса: armour stand |
| №0300 app/assets/3d/user_furniture/banner_pole.glb | 17136 B | ассет графики/3D/интерфейса: banner pole |
| №0301 app/assets/3d/user_furniture/bed.glb | 5718760 B | ассет графики/3D/интерфейса: bed |
| №0302 app/assets/3d/user_furniture/book_chest.glb | 45816 B | ассет графики/3D/интерфейса: book chest |
| №0303 app/assets/3d/user_furniture/book_press.glb | 59492 B | ассет графики/3D/интерфейса: book press |
| №0304 app/assets/3d/user_furniture/bookshelf.glb | 7818348 B | ассет графики/3D/интерфейса: bookshelf |
| №0305 app/assets/3d/user_furniture/bread_oven.glb | 45200 B | ассет графики/3D/интерфейса: bread oven |
| №0306 app/assets/3d/user_furniture/brewhouse_tun.glb | 68616 B | ассет графики/3D/интерфейса: brewhouse tun |
| №0307 app/assets/3d/user_furniture/candle_stand.glb | 21372 B | ассет графики/3D/интерфейса: candle stand |
| №0308 app/assets/3d/user_furniture/chained_library_desk.glb | 190612 B | ассет графики/3D/интерфейса: chained library desk |
| №0309 app/assets/3d/user_furniture/chair.glb | 4643004 B | ассет графики/3D/интерфейса: chair |
| №0310 app/assets/3d/user_furniture/closet.glb | 6550260 B | ассет графики/3D/интерфейса: closet |
| №0311 app/assets/3d/user_furniture/commode.glb | 4845868 B | ассет графики/3D/интерфейса: commode |
| №0312 app/assets/3d/user_furniture/cooking_cauldron.glb | 34300 B | ассет графики/3D/интерфейса: cooking cauldron |
| №0313 app/assets/3d/user_furniture/crate_stack.glb | 39644 B | ассет графики/3D/интерфейса: crate stack |
| №0314 app/assets/3d/user_furniture/dormitory_cot.glb | 70976 B | ассет графики/3D/интерфейса: dormitory cot |
| №0315 app/assets/3d/user_furniture/finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: finished codex |
| №0316 app/assets/3d/user_furniture/gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: gold leaf cushion |
| №0317 app/assets/3d/user_furniture/hand_cart.glb | 75012 B | ассет графики/3D/интерфейса: hand cart |
| №0318 app/assets/3d/user_furniture/hanging_oil_lamp.glb | 50924 B | ассет графики/3D/интерфейса: hanging oil lamp |
| №0319 app/assets/3d/user_furniture/hitching_post.glb | 22232 B | ассет графики/3D/интерфейса: hitching post |
| №0320 app/assets/3d/user_furniture/human-base-rigged.glb | 4994640 B | ассет графики/3D/интерфейса: human base rigged |
| №0321 app/assets/3d/user_furniture/infirmary_cot.glb | 71696 B | ассет графики/3D/интерфейса: infirmary cot |
| №0322 app/assets/3d/user_furniture/kitchen_hearth.glb | 38460 B | ассет графики/3D/интерфейса: kitchen hearth |
| №0323 app/assets/3d/user_furniture/lamp_post.glb | 16960 B | ассет графики/3D/интерфейса: lamp post |
| №0324 app/assets/3d/user_furniture/loom.glb | 46728 B | ассет графики/3D/интерфейса: loom |
| №0325 app/assets/3d/user_furniture/manuscript_in_progress.glb | 153128 B | ассет графики/3D/интерфейса: manuscript in progress |
| №0326 app/assets/3d/user_furniture/monastery_altar_table.glb | 36248 B | ассет графики/3D/интерфейса: monastery altar table |
| №0327 app/assets/3d/user_furniture/monastery_apothecary_jar_shelf.glb | 106620 B | ассет графики/3D/интерфейса: monastery apothecary jar shelf |
| №0328 app/assets/3d/user_furniture/monastery_bell_tower_section.glb | 456868 B | ассет графики/3D/интерфейса: monastery bell tower section |
| №0329 app/assets/3d/user_furniture/monastery_book_chest.glb | 45320 B | ассет графики/3D/интерфейса: monastery book chest |
| №0330 app/assets/3d/user_furniture/monastery_book_press.glb | 59492 B | ассет графики/3D/интерфейса: monastery book press |
| №0331 app/assets/3d/user_furniture/monastery_bread_oven.glb | 45296 B | ассет графики/3D/интерфейса: monastery bread oven |
| №0332 app/assets/3d/user_furniture/monastery_brewhouse_tun.glb | 68216 B | ассет графики/3D/интерфейса: monastery brewhouse tun |
| №0333 app/assets/3d/user_furniture/monastery_candle_stand.glb | 21376 B | ассет графики/3D/интерфейса: monastery candle stand |
| №0334 app/assets/3d/user_furniture/monastery_censer.glb | 49336 B | ассет графики/3D/интерфейса: monastery censer |
| №0335 app/assets/3d/user_furniture/monastery_chained_library_desk.glb | 148408 B | ассет графики/3D/интерфейса: monastery chained library desk |
| №0336 app/assets/3d/user_furniture/monastery_chapel_screen.glb | 333728 B | ассет графики/3D/интерфейса: monastery chapel screen |
| №0337 app/assets/3d/user_furniture/monastery_chapter_house_bay.glb | 151904 B | ассет графики/3D/интерфейса: monastery chapter house bay |
| №0338 app/assets/3d/user_furniture/monastery_cloister_arcade_bay.glb | 130972 B | ассет графики/3D/интерфейса: monastery cloister arcade bay |
| №0339 app/assets/3d/user_furniture/monastery_cloister_arcade_corner.glb | 73924 B | ассет графики/3D/интерфейса: monastery cloister arcade corner |
| №0340 app/assets/3d/user_furniture/monastery_cloister_garth_lawn.glb | 13732 B | ассет графики/3D/интерфейса: monastery cloister garth lawn |
| №0341 app/assets/3d/user_furniture/monastery_cloister_lean_to_roof.glb | 18724 B | ассет графики/3D/интерфейса: monastery cloister lean to roof |
| №0342 app/assets/3d/user_furniture/monastery_cloister_vault_section.glb | 73928 B | ассет графики/3D/интерфейса: monastery cloister vault section |
| №0343 app/assets/3d/user_furniture/monastery_cloister_well.glb | 41568 B | ассет графики/3D/интерфейса: monastery cloister well |
| №0344 app/assets/3d/user_furniture/monastery_compost_bay.glb | 55596 B | ассет графики/3D/интерфейса: monastery compost bay |
| №0345 app/assets/3d/user_furniture/monastery_cooking_cauldron.glb | 33800 B | ассет графики/3D/интерфейса: monastery cooking cauldron |
| №0346 app/assets/3d/user_furniture/monastery_dormitory_cot.glb | 54832 B | ассет графики/3D/интерфейса: monastery dormitory cot |
| №0347 app/assets/3d/user_furniture/monastery_finished_codex.glb | 29792 B | ассет графики/3D/интерфейса: monastery finished codex |
| №0348 app/assets/3d/user_furniture/monastery_flagstone_floor_slab.glb | 9900 B | ассет графики/3D/интерфейса: monastery flagstone floor slab |
| №0349 app/assets/3d/user_furniture/monastery_gold_leaf_cushion.glb | 30624 B | ассет графики/3D/интерфейса: monastery gold leaf cushion |
| №0350 app/assets/3d/user_furniture/monastery_hand_cart.glb | 86864 B | ассет графики/3D/интерфейса: monastery hand cart |
| №0351 app/assets/3d/user_furniture/monastery_hanging_oil_lamp.glb | 47156 B | ассет графики/3D/интерфейса: monastery hanging oil lamp |
| №0352 app/assets/3d/user_furniture/monastery_herb_garden_bed.glb | 94584 B | ассет графики/3D/интерфейса: monastery herb garden bed |
| №0353 app/assets/3d/user_furniture/monastery_hung_bell.glb | 40368 B | ассет графики/3D/интерфейса: monastery hung bell |
| №0354 app/assets/3d/user_furniture/monastery_infirmary_cot.glb | 71700 B | ассет графики/3D/интерфейса: monastery infirmary cot |
| №0355 app/assets/3d/user_furniture/monastery_kitchen_hearth.glb | 37972 B | ассет графики/3D/интерфейса: monastery kitchen hearth |
| №0356 app/assets/3d/user_furniture/monastery_manuscript_in_progress.glb | 153132 B | ассет графики/3D/интерфейса: monastery manuscript in progress |
| №0357 app/assets/3d/user_furniture/monastery_monastery_buttress.glb | 18440 B | ассет графики/3D/интерфейса: monastery monastery buttress |
| №0358 app/assets/3d/user_furniture/monastery_monastery_door_bay.glb | 87284 B | ассет графики/3D/интерфейса: monastery monastery door bay |
| №0359 app/assets/3d/user_furniture/monastery_monastery_lancet_window_bay.glb | 64048 B | ассет графики/3D/интерфейса: monastery monastery lancet window bay |
| №0360 app/assets/3d/user_furniture/monastery_monastery_wall_bay.glb | 29336 B | ассет графики/3D/интерфейса: monastery monastery wall bay |
| №0361 app/assets/3d/user_furniture/monastery_monks_chest.glb | 30432 B | ассет графики/3D/интерфейса: monastery monks chest |
| №0362 app/assets/3d/user_furniture/monastery_mortar_and_pestle_set.glb | 31476 B | ассет графики/3D/интерфейса: monastery mortar and pestle set |
| №0363 app/assets/3d/user_furniture/monastery_parchment_stretching_frame.glb | 66292 B | ассет графики/3D/интерфейса: monastery parchment stretching frame |
| №0364 app/assets/3d/user_furniture/monastery_physic_bench.glb | 46424 B | ассет графики/3D/интерфейса: monastery physic bench |
| №0365 app/assets/3d/user_furniture/monastery_pigment_tray.glb | 42180 B | ассет графики/3D/интерфейса: monastery pigment tray |
| №0366 app/assets/3d/user_furniture/monastery_quill_and_inkhorn_set.glb | 36912 B | ассет графики/3D/интерфейса: monastery quill and inkhorn set |
| №0367 app/assets/3d/user_furniture/monastery_rain_water_butt.glb | 45160 B | ассет графики/3D/интерфейса: monastery rain water butt |
| №0368 app/assets/3d/user_furniture/monastery_readers_pulpit.glb | 70796 B | ассет графики/3D/интерфейса: monastery readers pulpit |
| №0369 app/assets/3d/user_furniture/monastery_reading_lectern.glb | 48744 B | ассет графики/3D/интерфейса: monastery reading lectern |
| №0370 app/assets/3d/user_furniture/monastery_refectory_bench.glb | 20408 B | ассет графики/3D/интерфейса: monastery refectory bench |
| №0371 app/assets/3d/user_furniture/monastery_refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: monastery refectory long table |
| №0372 app/assets/3d/user_furniture/monastery_reliquary_casket.glb | 59680 B | ассет графики/3D/интерфейса: monastery reliquary casket |
| №0373 app/assets/3d/user_furniture/monastery_ruling_board.glb | 98044 B | ассет графики/3D/интерфейса: monastery ruling board |
| №0374 app/assets/3d/user_furniture/monastery_rush_light_stand.glb | 19044 B | ассет графики/3D/интерфейса: monastery rush light stand |
| №0375 app/assets/3d/user_furniture/monastery_scribes_stool.glb | 19900 B | ассет графики/3D/интерфейса: monastery scribes stool |
| №0376 app/assets/3d/user_furniture/monastery_sloped_writing_desk.glb | 247044 B | ассет графики/3D/интерфейса: monastery sloped writing desk |
| №0377 app/assets/3d/user_furniture/monastery_stone_drain.glb | 12360 B | ассет графики/3D/интерфейса: monastery stone drain |
| №0378 app/assets/3d/user_furniture/monastery_stone_font.glb | 55200 B | ассет графики/3D/интерфейса: monastery stone font |
| №0379 app/assets/3d/user_furniture/monastery_stone_stair_vice.glb | 130164 B | ассет графики/3D/интерфейса: monastery stone stair vice |
| №0380 app/assets/3d/user_furniture/monastery_tomb_slab.glb | 47852 B | ассет графики/3D/интерфейса: monastery tomb slab |
| №0381 app/assets/3d/user_furniture/monastery_trestle_table.glb | 39912 B | ассет графики/3D/интерфейса: monastery trestle table |
| №0382 app/assets/3d/user_furniture/monastery_wall_torch_bracket.glb | 38324 B | ассет графики/3D/интерфейса: monastery wall torch bracket |
| №0383 app/assets/3d/user_furniture/monastery_wood_stack.glb | 71140 B | ассет графики/3D/интерфейса: monastery wood stack |
| №0384 app/assets/3d/user_furniture/monks_chest.glb | 30508 B | ассет графики/3D/интерфейса: monks chest |
| №0385 app/assets/3d/user_furniture/mortar_pestle.glb | 31516 B | ассет графики/3D/интерфейса: mortar pestle |
| №0386 app/assets/3d/user_furniture/nature_birch_leaning.glb | 14804 B | ассет графики/3D/интерфейса: nature birch leaning |
| №0387 app/assets/3d/user_furniture/nature_birch_mature.glb | 15636 B | ассет графики/3D/интерфейса: nature birch mature |
| №0388 app/assets/3d/user_furniture/nature_birch_young.glb | 13980 B | ассет графики/3D/интерфейса: nature birch young |
| №0389 app/assets/3d/user_furniture/nature_boulder_large.glb | 6660 B | ассет графики/3D/интерфейса: nature boulder large |
| №0390 app/assets/3d/user_furniture/nature_boulder_medium.glb | 6192 B | ассет графики/3D/интерфейса: nature boulder medium |
| №0391 app/assets/3d/user_furniture/nature_boulder_mossy.glb | 24232 B | ассет графики/3D/интерфейса: nature boulder mossy |
| №0392 app/assets/3d/user_furniture/nature_boulder_small.glb | 4760 B | ассет графики/3D/интерфейса: nature boulder small |
| №0393 app/assets/3d/user_furniture/nature_bush_berry.glb | 12316 B | ассет графики/3D/интерфейса: nature bush berry |
| №0394 app/assets/3d/user_furniture/nature_bush_flat.glb | 5980 B | ассет графики/3D/интерфейса: nature bush flat |
| №0395 app/assets/3d/user_furniture/nature_bush_flowering.glb | 16248 B | ассет графики/3D/интерфейса: nature bush flowering |
| №0396 app/assets/3d/user_furniture/nature_bush_round.glb | 5152 B | ассет графики/3D/интерфейса: nature bush round |
| №0397 app/assets/3d/user_furniture/nature_bush_tall.glb | 5968 B | ассет графики/3D/интерфейса: nature bush tall |
| №0398 app/assets/3d/user_furniture/nature_cliff_block.glb | 29492 B | ассет графики/3D/интерфейса: nature cliff block |
| №0399 app/assets/3d/user_furniture/nature_dead_snag_short.glb | 8596 B | ассет графики/3D/интерфейса: nature dead snag short |
| №0400 app/assets/3d/user_furniture/nature_dead_snag_tall.glb | 16784 B | ассет графики/3D/интерфейса: nature dead snag tall |
| №0401 app/assets/3d/user_furniture/nature_fern_clump.glb | 29024 B | ассет графики/3D/интерфейса: nature fern clump |
| №0402 app/assets/3d/user_furniture/nature_fern_single.glb | 13176 B | ассет графики/3D/интерфейса: nature fern single |
| №0403 app/assets/3d/user_furniture/nature_flower_red.glb | 12412 B | ассет графики/3D/интерфейса: nature flower red |
| №0404 app/assets/3d/user_furniture/nature_flower_yellow.glb | 12216 B | ассет графики/3D/интерфейса: nature flower yellow |
| №0405 app/assets/3d/user_furniture/nature_grass_tuft_tall.glb | 6628 B | ассет графики/3D/интерфейса: nature grass tuft tall |
| №0406 app/assets/3d/user_furniture/nature_hedge_block.glb | 2444 B | ассет графики/3D/интерфейса: nature hedge block |
| №0407 app/assets/3d/user_furniture/nature_meadow_disc.glb | 8780 B | ассет графики/3D/интерфейса: nature meadow disc |
| №0408 app/assets/3d/user_furniture/nature_mushroom_group.glb | 39600 B | ассет графики/3D/интерфейса: nature mushroom group |
| №0409 app/assets/3d/user_furniture/nature_oak_ancient.glb | 292756 B | ассет графики/3D/интерфейса: nature oak ancient |
| №0410 app/assets/3d/user_furniture/nature_oak_mature.glb | 279624 B | ассет графики/3D/интерфейса: nature oak mature |
| №0411 app/assets/3d/user_furniture/nature_oak_sapling.glb | 266084 B | ассет графики/3D/интерфейса: nature oak sapling |
| №0412 app/assets/3d/user_furniture/nature_oak_young.glb | 266536 B | ассет графики/3D/интерфейса: nature oak young |
| №0413 app/assets/3d/user_furniture/nature_palm_leaning.glb | 50808 B | ассет графики/3D/интерфейса: nature palm leaning |
| №0414 app/assets/3d/user_furniture/nature_palm_mature.glb | 57076 B | ассет графики/3D/интерфейса: nature palm mature |
| №0415 app/assets/3d/user_furniture/nature_palm_young.glb | 37688 B | ассет графики/3D/интерфейса: nature palm young |
| №0416 app/assets/3d/user_furniture/nature_pebble_cluster.glb | 12184 B | ассет графики/3D/интерфейса: nature pebble cluster |
| №0417 app/assets/3d/user_furniture/nature_pine_columnar.glb | 265888 B | ассет графики/3D/интерфейса: nature pine columnar |
| №0418 app/assets/3d/user_furniture/nature_pine_sapling.glb | 264192 B | ассет графики/3D/интерфейса: nature pine sapling |
| №0419 app/assets/3d/user_furniture/nature_pine_spreading.glb | 265024 B | ассет графики/3D/интерфейса: nature pine spreading |
| №0420 app/assets/3d/user_furniture/nature_pine_windswept.glb | 265012 B | ассет графики/3D/интерфейса: nature pine windswept |
| №0421 app/assets/3d/user_furniture/nature_rock_pile.glb | 11840 B | ассет графики/3D/интерфейса: nature rock pile |
| №0422 app/assets/3d/user_furniture/nature_root_cluster.glb | 18436 B | ассет графики/3D/интерфейса: nature root cluster |
| №0423 app/assets/3d/user_furniture/nature_sapling_pair.glb | 267912 B | ассет графики/3D/интерфейса: nature sapling pair |
| №0424 app/assets/3d/user_furniture/nature_slab_flat.glb | 2744 B | ассет графики/3D/интерфейса: nature slab flat |
| №0425 app/assets/3d/user_furniture/nature_slab_upright.glb | 2484 B | ассет графики/3D/интерфейса: nature slab upright |
| №0426 app/assets/3d/user_furniture/nature_stump_mossy.glb | 6616 B | ассет графики/3D/интерфейса: nature stump mossy |
| №0427 app/assets/3d/user_furniture/nature_stump_oak.glb | 273776 B | ассет графики/3D/интерфейса: nature stump oak |
| №0428 app/assets/3d/user_furniture/nature_stump_pine.glb | 261388 B | ассет графики/3D/интерфейса: nature stump pine |
| №0429 app/assets/3d/user_furniture/nature_topiary_cone.glb | 7524 B | ассет графики/3D/интерфейса: nature topiary cone |
| №0430 app/assets/3d/user_furniture/parchment_stretching_frame.glb | 55508 B | ассет графики/3D/интерфейса: parchment stretching frame |
| №0431 app/assets/3d/user_furniture/physic_bench.glb | 60316 B | ассет графики/3D/интерфейса: physic bench |
| №0432 app/assets/3d/user_furniture/pigment_tray.glb | 39864 B | ассет графики/3D/интерфейса: pigment tray |
| №0433 app/assets/3d/user_furniture/quill_inkhorn_set.glb | 36956 B | ассет графики/3D/интерфейса: quill inkhorn set |
| №0434 app/assets/3d/user_furniture/rain_water_butt.glb | 45168 B | ассет графики/3D/интерфейса: rain water butt |
| №0435 app/assets/3d/user_furniture/range_and_oven.glb | 19732 B | ассет графики/3D/интерфейса: range and oven |
| №0436 app/assets/3d/user_furniture/reading_lectern.glb | 48844 B | ассет графики/3D/интерфейса: reading lectern |
| №0437 app/assets/3d/user_furniture/refectory_bench.glb | 20560 B | ассет графики/3D/интерфейса: refectory bench |
| №0438 app/assets/3d/user_furniture/refectory_long_table.glb | 51672 B | ассет графики/3D/интерфейса: refectory long table |
| №0439 app/assets/3d/user_furniture/reliquary_casket.glb | 59728 B | ассет графики/3D/интерфейса: reliquary casket |
| №0440 app/assets/3d/user_furniture/road_signpost.glb | 8044 B | ассет графики/3D/интерфейса: road signpost |
| №0441 app/assets/3d/user_furniture/rug.glb | 16540 B | ассет графики/3D/интерфейса: rug |
| №0442 app/assets/3d/user_furniture/ruling_board.glb | 98032 B | ассет графики/3D/интерфейса: ruling board |
| №0443 app/assets/3d/user_furniture/rush_light_stand.glb | 19052 B | ассет графики/3D/интерфейса: rush light stand |
| №0444 app/assets/3d/user_furniture/scribes_stool.glb | 20040 B | ассет графики/3D/интерфейса: scribes stool |
| №0445 app/assets/3d/user_furniture/shop_counter.glb | 58488 B | ассет графики/3D/интерфейса: shop counter |
| №0446 app/assets/3d/user_furniture/sloped_writing_desk.glb | 341476 B | ассет графики/3D/интерфейса: sloped writing desk |
| №0447 app/assets/3d/user_furniture/spinning_wheel.glb | 21900 B | ассет графики/3D/интерфейса: spinning wheel |
| №0448 app/assets/3d/user_furniture/stone_stone_stair_vice_0.glb | 130164 B | ассет графики/3D/интерфейса: stone stone stair vice 0 |
| №0449 app/assets/3d/user_furniture/table_and_stools.glb | 34088 B | ассет графики/3D/интерфейса: table and stools |
| №0450 app/assets/3d/user_furniture/table.glb | 6217412 B | ассет графики/3D/интерфейса: table |
| №0451 app/assets/3d/user_furniture/torch_sconce.glb | 8692 B | ассет графики/3D/интерфейса: torch sconce |
| №0452 app/assets/3d/user_furniture/town_allotment_bed.glb | 42940 B | ассет графики/3D/интерфейса: town allotment bed |
| №0453 app/assets/3d/user_furniture/town_altar_with_candles.glb | 28704 B | ассет графики/3D/интерфейса: town altar with candles |
| №0454 app/assets/3d/user_furniture/town_anvil.glb | 7820 B | ассет графики/3D/интерфейса: town anvil |
| №0455 app/assets/3d/user_furniture/town_apple_tree.glb | 21880 B | ассет графики/3D/интерфейса: town apple tree |
| №0456 app/assets/3d/user_furniture/town_armour_stand.glb | 16180 B | ассет графики/3D/интерфейса: town armour stand |
| №0457 app/assets/3d/user_furniture/town_banner_pole.glb | 16800 B | ассет графики/3D/интерфейса: town banner pole |
| №0458 app/assets/3d/user_furniture/town_barrel.glb | 13340 B | ассет графики/3D/интерфейса: town barrel |
| №0459 app/assets/3d/user_furniture/town_bedroll.glb | 8964 B | ассет графики/3D/интерфейса: town bedroll |
| №0460 app/assets/3d/user_furniture/town_bench.glb | 16564 B | ассет графики/3D/интерфейса: town bench |
| №0461 app/assets/3d/user_furniture/town_boulder_large.glb | 9404 B | ассет графики/3D/интерфейса: town boulder large |
| №0462 app/assets/3d/user_furniture/town_boulder_small.glb | 4768 B | ассет графики/3D/интерфейса: town boulder small |
| №0463 app/assets/3d/user_furniture/town_bush.glb | 9188 B | ассет графики/3D/интерфейса: town bush |
| №0464 app/assets/3d/user_furniture/town_campfire_with_spit.glb | 33304 B | ассет графики/3D/интерфейса: town campfire with spit |
| №0465 app/assets/3d/user_furniture/town_canoe.glb | 15568 B | ассет графики/3D/интерфейса: town canoe |
| №0466 app/assets/3d/user_furniture/town_cargo_cart.glb | 70964 B | ассет графики/3D/интерфейса: town cargo cart |
| №0467 app/assets/3d/user_furniture/town_cauldron_on_tripod.glb | 32232 B | ассет графики/3D/интерфейса: town cauldron on tripod |
| №0468 app/assets/3d/user_furniture/town_cave_mouth.glb | 21616 B | ассет графики/3D/интерфейса: town cave mouth |
| №0469 app/assets/3d/user_furniture/town_chandelier.glb | 24996 B | ассет графики/3D/интерфейса: town chandelier |
| №0470 app/assets/3d/user_furniture/town_chicken_coop.glb | 26176 B | ассет графики/3D/интерфейса: town chicken coop |
| №0471 app/assets/3d/user_furniture/town_cobble_road_corner.glb | 18268 B | ассет графики/3D/интерфейса: town cobble road corner |
| №0472 app/assets/3d/user_furniture/town_cobble_road_junction.glb | 26024 B | ассет графики/3D/интерфейса: town cobble road junction |
| №0473 app/assets/3d/user_furniture/town_cobble_road_tile.glb | 20612 B | ассет графики/3D/интерфейса: town cobble road tile |
| №0474 app/assets/3d/user_furniture/town_cooks_kitchen.glb | 96404 B | ассет графики/3D/интерфейса: town cooks kitchen |
| №0475 app/assets/3d/user_furniture/town_cow_pen_fence.glb | 11268 B | ассет графики/3D/интерфейса: town cow pen fence |
| №0476 app/assets/3d/user_furniture/town_crate_stack.glb | 39416 B | ассет графики/3D/интерфейса: town crate stack |
| №0477 app/assets/3d/user_furniture/town_dead_tree.glb | 6196 B | ассет графики/3D/интерфейса: town dead tree |
| №0478 app/assets/3d/user_furniture/town_dirt_path_tile.glb | 9152 B | ассет графики/3D/интерфейса: town dirt path tile |
| №0479 app/assets/3d/user_furniture/town_farmhouse_and_barn.glb | 161272 B | ассет графики/3D/интерфейса: town farmhouse and barn |
| №0480 app/assets/3d/user_furniture/town_fence_gate.glb | 14544 B | ассет графики/3D/интерфейса: town fence gate |
| №0481 app/assets/3d/user_furniture/town_fence_run.glb | 28988 B | ассет графики/3D/интерфейса: town fence run |
| №0482 app/assets/3d/user_furniture/town_fern_clump.glb | 15892 B | ассет графики/3D/интерфейса: town fern clump |
| №0483 app/assets/3d/user_furniture/town_ferry_raft.glb | 31140 B | ассет графики/3D/интерфейса: town ferry raft |
| №0484 app/assets/3d/user_furniture/town_fishing_boat.glb | 25960 B | ассет графики/3D/интерфейса: town fishing boat |
| №0485 app/assets/3d/user_furniture/town_fishing_hut_on_stilts.glb | 110516 B | ассет графики/3D/интерфейса: town fishing hut on stilts |
| №0486 app/assets/3d/user_furniture/town_fletcher_shop.glb | 117300 B | ассет графики/3D/интерфейса: town fletcher shop |
| №0487 app/assets/3d/user_furniture/town_flower_patch.glb | 34768 B | ассет графики/3D/интерфейса: town flower patch |
| №0488 app/assets/3d/user_furniture/town_general_store.glb | 137904 B | ассет графики/3D/интерфейса: town general store |
| №0489 app/assets/3d/user_furniture/town_goblin_tent.glb | 15120 B | ассет графики/3D/интерфейса: town goblin tent |
| №0490 app/assets/3d/user_furniture/town_goblin_totem.glb | 27832 B | ассет графики/3D/интерфейса: town goblin totem |
| №0491 app/assets/3d/user_furniture/town_grass_ground_tile.glb | 8564 B | ассет графики/3D/интерфейса: town grass ground tile |
| №0492 app/assets/3d/user_furniture/town_grass_tuft_cluster.glb | 5080 B | ассет графики/3D/интерфейса: town grass tuft cluster |
| №0493 app/assets/3d/user_furniture/town_gravestone_set.glb | 23812 B | ассет графики/3D/интерфейса: town gravestone set |
| №0494 app/assets/3d/user_furniture/town_guard_barracks.glb | 162732 B | ассет графики/3D/интерфейса: town guard barracks |
| №0495 app/assets/3d/user_furniture/town_hand_cart.glb | 25308 B | ассет графики/3D/интерфейса: town hand cart |
| №0496 app/assets/3d/user_furniture/town_hay_bale.glb | 16340 B | ассет графики/3D/интерфейса: town hay bale |
| №0497 app/assets/3d/user_furniture/town_hitching_post.glb | 22008 B | ассет графики/3D/интерфейса: town hitching post |
| №0498 app/assets/3d/user_furniture/town_hunters_hide.glb | 33880 B | ассет графики/3D/интерфейса: town hunters hide |
| №0499 app/assets/3d/user_furniture/town_lamp_post.glb | 16804 B | ассет графики/3D/интерфейса: town lamp post |
| №0500 app/assets/3d/user_furniture/town_lily_pads.glb | 16632 B | ассет графики/3D/интерфейса: town lily pads |
| №0501 app/assets/3d/user_furniture/town_log_pile.glb | 37732 B | ассет графики/3D/интерфейса: town log pile |
| №0502 app/assets/3d/user_furniture/town_loom.glb | 46480 B | ассет графики/3D/интерфейса: town loom |
| №0503 app/assets/3d/user_furniture/town_loot_sack.glb | 11820 B | ассет графики/3D/интерфейса: town loot sack |
| №0504 app/assets/3d/user_furniture/town_market_stall_blue.glb | 61540 B | ассет графики/3D/интерфейса: town market stall blue |
| №0505 app/assets/3d/user_furniture/town_market_stall_cream.glb | 60756 B | ассет графики/3D/интерфейса: town market stall cream |
| №0506 app/assets/3d/user_furniture/town_market_stall.glb | 61536 B | ассет графики/3D/интерфейса: town market stall |
| №0507 app/assets/3d/user_furniture/town_mine_entrance.glb | 41744 B | ассет графики/3D/интерфейса: town mine entrance |
| №0508 app/assets/3d/user_furniture/town_mushroom_ring.glb | 22884 B | ассет графики/3D/интерфейса: town mushroom ring |
| №0509 app/assets/3d/user_furniture/town_notice_board.glb | 15924 B | ассет графики/3D/интерфейса: town notice board |
| №0510 app/assets/3d/user_furniture/town_oak_tree.glb | 19492 B | ассет графики/3D/интерфейса: town oak tree |
| №0511 app/assets/3d/user_furniture/town_pine_tree.glb | 7096 B | ассет графики/3D/интерфейса: town pine tree |
| №0512 app/assets/3d/user_furniture/town_plaza_paving_tile.glb | 40396 B | ассет графики/3D/интерфейса: town plaza paving tile |
| №0513 app/assets/3d/user_furniture/town_ploughed_field_tile.glb | 24992 B | ассет графики/3D/интерфейса: town ploughed field tile |
| №0514 app/assets/3d/user_furniture/town_range_and_oven.glb | 19440 B | ассет графики/3D/интерфейса: town range and oven |
| №0515 app/assets/3d/user_furniture/town_reed_clump.glb | 8672 B | ассет графики/3D/интерфейса: town reed clump |
| №0516 app/assets/3d/user_furniture/town_river_bank_tile.glb | 17528 B | ассет графики/3D/интерфейса: town river bank tile |
| №0517 app/assets/3d/user_furniture/town_river_bend_tile.glb | 27100 B | ассет графики/3D/интерфейса: town river bend tile |
| №0518 app/assets/3d/user_furniture/town_river_tile_straight.glb | 19108 B | ассет графики/3D/интерфейса: town river tile straight |
| №0519 app/assets/3d/user_furniture/town_road_signpost.glb | 7824 B | ассет графики/3D/интерфейса: town road signpost |
| №0520 app/assets/3d/user_furniture/town_rock_outcrop.glb | 10020 B | ассет графики/3D/интерфейса: town rock outcrop |
| №0521 app/assets/3d/user_furniture/town_rope_bridge.glb | 104548 B | ассет графики/3D/интерфейса: town rope bridge |
| №0522 app/assets/3d/user_furniture/town_rowing_boat.glb | 26056 B | ассет графики/3D/интерфейса: town rowing boat |
| №0523 app/assets/3d/user_furniture/town_rug.glb | 16352 B | ассет графики/3D/интерфейса: town rug |
| №0524 app/assets/3d/user_furniture/town_scarecrow.glb | 22344 B | ассет графики/3D/интерфейса: town scarecrow |
| №0525 app/assets/3d/user_furniture/town_shop_counter.glb | 61556 B | ассет графики/3D/интерфейса: town shop counter |
| №0526 app/assets/3d/user_furniture/town_smithy.glb | 105612 B | ассет графики/3D/интерфейса: town smithy |
| №0527 app/assets/3d/user_furniture/town_spinning_wheel.glb | 21608 B | ассет графики/3D/интерфейса: town spinning wheel |
| №0528 app/assets/3d/user_furniture/town_standing_stone.glb | 13276 B | ассет графики/3D/интерфейса: town standing stone |
| №0529 app/assets/3d/user_furniture/town_stone_arch_bridge.glb | 51536 B | ассет графики/3D/интерфейса: town stone arch bridge |
| №0530 app/assets/3d/user_furniture/town_stone_church.glb | 145052 B | ассет графики/3D/интерфейса: town stone church |
| №0531 app/assets/3d/user_furniture/town_stone_circle_slab.glb | 31656 B | ассет графики/3D/интерфейса: town stone circle slab |
| №0532 app/assets/3d/user_furniture/town_straw_target.glb | 15176 B | ассет графики/3D/интерфейса: town straw target |
| №0533 app/assets/3d/user_furniture/town_stump_with_axe.glb | 11880 B | ассет графики/3D/интерфейса: town stump with axe |
| №0534 app/assets/3d/user_furniture/town_table_and_stools.glb | 33848 B | ассет графики/3D/интерфейса: town table and stools |
| №0535 app/assets/3d/user_furniture/town_thatched_cottage.glb | 106096 B | ассет графики/3D/интерфейса: town thatched cottage |
| №0536 app/assets/3d/user_furniture/town_timber_house_large.glb | 262356 B | ассет графики/3D/интерфейса: town timber house large |
| №0537 app/assets/3d/user_furniture/town_timber_house_medium.glb | 169188 B | ассет графики/3D/интерфейса: town timber house medium |
| №0538 app/assets/3d/user_furniture/town_timber_house_small.glb | 119348 B | ассет графики/3D/интерфейса: town timber house small |
| №0539 app/assets/3d/user_furniture/town_timber_plank_bridge.glb | 60076 B | ассет графики/3D/интерфейса: town timber plank bridge |
| №0540 app/assets/3d/user_furniture/town_torch_sconce.glb | 8460 B | ассет графики/3D/интерфейса: town torch sconce |
| №0541 app/assets/3d/user_furniture/town_town_bank.glb | 116184 B | ассет графики/3D/интерфейса: town town bank |
| №0542 app/assets/3d/user_furniture/town_town_hall.glb | 252584 B | ассет графики/3D/интерфейса: town town hall |
| №0543 app/assets/3d/user_furniture/town_town_wall_segment.glb | 9696 B | ассет графики/3D/интерфейса: town town wall segment |
| №0544 app/assets/3d/user_furniture/town_town_well.glb | 32492 B | ассет графики/3D/интерфейса: town town well |
| №0545 app/assets/3d/user_furniture/town_treasure_chest.glb | 12404 B | ассет графики/3D/интерфейса: town treasure chest |
| №0546 app/assets/3d/user_furniture/town_village_tavern.glb | 220336 B | ассет графики/3D/интерфейса: town village tavern |
| №0547 app/assets/3d/user_furniture/town_wall_corner_tower.glb | 79592 B | ассет графики/3D/интерфейса: town wall corner tower |
| №0548 app/assets/3d/user_furniture/town_wall_gatehouse.glb | 77180 B | ассет графики/3D/интерфейса: town wall gatehouse |
| №0549 app/assets/3d/user_furniture/town_wall_stair.glb | 34040 B | ассет графики/3D/интерфейса: town wall stair |
| №0550 app/assets/3d/user_furniture/town_wall_walk_crenellated.glb | 15296 B | ассет графики/3D/интерфейса: town wall walk crenellated |
| №0551 app/assets/3d/user_furniture/town_watchtower.glb | 109556 B | ассет графики/3D/интерфейса: town watchtower |
| №0552 app/assets/3d/user_furniture/town_water_trough.glb | 18172 B | ассет графики/3D/интерфейса: town water trough |
| №0553 app/assets/3d/user_furniture/town_weapon_rack.glb | 23152 B | ассет графики/3D/интерфейса: town weapon rack |
| №0554 app/assets/3d/user_furniture/town_wheat_field_tile.glb | 55508 B | ассет графики/3D/интерфейса: town wheat field tile |
| №0555 app/assets/3d/user_furniture/town_willow_tree.glb | 26360 B | ассет графики/3D/интерфейса: town willow tree |
| №0556 app/assets/3d/user_furniture/town_windmill.glb | 121768 B | ассет графики/3D/интерфейса: town windmill |
| №0557 app/assets/3d/user_furniture/town_wizard_tower_base.glb | 64292 B | ассет графики/3D/интерфейса: town wizard tower base |
| №0558 app/assets/3d/user_furniture/town_wizard_tower_mid.glb | 70456 B | ассет графики/3D/интерфейса: town wizard tower mid |
| №0559 app/assets/3d/user_furniture/town_wizard_tower_top.glb | 50984 B | ассет графики/3D/интерфейса: town wizard tower top |
| №0560 app/assets/3d/user_furniture/treasure_chest.glb | 12772 B | ассет графики/3D/интерфейса: treasure chest |
| №0561 app/assets/3d/user_furniture/trestle_table.glb | 40424 B | ассет графики/3D/интерфейса: trestle table |
| №0562 app/assets/3d/user_furniture/weapon_rack.glb | 23300 B | ассет графики/3D/интерфейса: weapon rack |
| №0563 app/assets/3d/user_furniture/wood_stack.glb | 71136 B | ассет графики/3D/интерфейса: wood stack |
| №0564 app/assets/dice/.gitkeep | 0 B | ассет графики/3D/интерфейса: .gitkeep |
| №0565 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png | 2349861 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 07 PM |
| №0566 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_30 PM.png | 2088308 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 08 30 PM |
| №0567 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_13_27 PM.png | 2584925 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 13 27 PM |
| №0568 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_23_00 PM.png | 2274607 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 23 00 PM |
| №0569 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_24_38 PM.png | 2254958 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 24 38 PM |
| №0570 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_27_51 PM.png | 2389543 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 27 51 PM |
| №0571 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_35_50 PM.png | 2486441 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 35 50 PM |
| №0572 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_41_40 PM.png | 2712929 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 41 40 PM |
| №0573 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_49_58 PM.png | 2751322 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 49 58 PM |
| №0574 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_07 PM.png | 2778707 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 07 PM |
| №0575 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_18 PM.png | 2503466 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 18 PM |
| №0576 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_28 PM.png | 2561809 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 28 PM |
| №0577 app/assets/dice/ChatGPT Image Sep 30, 2026, 07_58_39 PM.png | 2841483 B | ассет графики/3D/интерфейса: ChatGPT Image Sep 30, 2026, 07 58 39 PM |
| №0578 app/assets/dice/dice1.png | 348916 B | ассет графики/3D/интерфейса: dice1 |
| №0579 app/assets/dice/dice10-1.png | 386558 B | ассет графики/3D/интерфейса: dice10 1 |
| №0580 app/assets/dice/dice10.png | 386558 B | ассет графики/3D/интерфейса: dice10 |
| №0581 app/assets/dice/dice11.png | 307154 B | ассет графики/3D/интерфейса: dice11 |
| №0582 app/assets/dice/dice12.png | 395864 B | ассет графики/3D/интерфейса: dice12 |
| №0583 app/assets/dice/dice13.png | 344758 B | ассет графики/3D/интерфейса: dice13 |
| №0584 app/assets/dice/dice15.png | 388111 B | ассет графики/3D/интерфейса: dice15 |
| №0585 app/assets/dice/dice16.png | 352768 B | ассет графики/3D/интерфейса: dice16 |
| №0586 app/assets/dice/dice17.png | 342548 B | ассет графики/3D/интерфейса: dice17 |
| №0587 app/assets/dice/dice2.png | 246156 B | ассет графики/3D/интерфейса: dice2 |
| №0588 app/assets/dice/dice3.png | 346757 B | ассет графики/3D/интерфейса: dice3 |
| №0589 app/assets/dice/dice4.png | 348331 B | ассет графики/3D/интерфейса: dice4 |
| №0590 app/assets/dice/dice5.png | 299652 B | ассет графики/3D/интерфейса: dice5 |
| №0591 app/assets/dice/dice6.png | 331669 B | ассет графики/3D/интерфейса: dice6 |
| №0592 app/assets/dice/dice7.png | 343178 B | ассет графики/3D/интерфейса: dice7 |
| №0593 app/assets/dice/dice8.png | 370230 B | ассет графики/3D/интерфейса: dice8 |
| №0594 app/assets/dice/dice9.png | 336030 B | ассет графики/3D/интерфейса: dice9 |
| №0595 app/assets/ui/character-creation/1790622252250.png | 908119 B | ассет графики/3D/интерфейса: 1790622252250 |
| №0596 app/assets/ui/dragon_fire_burst_v2_sprite.png | 237749 B | ассет графики/3D/интерфейса: dragon fire burst v2 sprite |
| №0597 app/assets/ui/dragon_fire.png | 267960 B | ассет графики/3D/интерфейса: dragon fire |
| №0598 app/assets/ui/dragon_flight_v2_sprite.png | 573207 B | ассет графики/3D/интерфейса: dragon flight v2 sprite |
| №0599 app/assets/ui/dragon_frame_strip.svg | 858 B | ассет графики/3D/интерфейса: dragon frame strip |
| №0600 app/assets/ui/dragon.png | 274924 B | ассет графики/3D/интерфейса: dragon |
| №0601 app/assets/ui/fire_front.png | 1276760 B | ассет графики/3D/интерфейса: fire front |
| №0602 app/assets/ui/forest_burned.jpg | 211523 B | ассет графики/3D/интерфейса: forest burned |
| №0603 app/assets/ui/forest_green.jpg | 309184 B | ассет графики/3D/интерфейса: forest green |
| №0604 app/assets/ui/loader_dragon_head.svg | 2388 B | ассет графики/3D/интерфейса: loader dragon head |
| №0605 app/assets/ui/loader_fire.svg | 902 B | ассет графики/3D/интерфейса: loader fire |
| №0606 app/assets/ui/loader_forest_burning.svg | 1448 B | ассет графики/3D/интерфейса: loader forest burning |
| №0607 app/assets/ui/loader_forest.svg | 917 B | ассет графики/3D/интерфейса: loader forest |
| №0608 app/assets/ui/loader_sparks.svg | 626 B | ассет графики/3D/интерфейса: loader sparks |
| №0609 app/assets/ui/update_scene_ash.svg | 432 B | ассет графики/3D/интерфейса: update scene ash |
| №0610 app/assets/ui/update_scene_background.svg | 1141 B | ассет графики/3D/интерфейса: update scene background |
| №0611 app/assets/ui/update_scene_dragon_fire.svg | 733 B | ассет графики/3D/интерфейса: update scene dragon fire |
| №0612 app/assets/ui/update_scene_dragon.svg | 1324 B | ассет графики/3D/интерфейса: update scene dragon |
| №0613 app/assets/ui/update_scene_embers.svg | 474 B | ассет графики/3D/интерфейса: update scene embers |
| №0614 app/assets/ui/update_scene_fire_front.svg | 837 B | ассет графики/3D/интерфейса: update scene fire front |
| №0615 app/assets/ui/update_scene_forest_burned.svg | 1417 B | ассет графики/3D/интерфейса: update scene forest burned |
| №0616 app/assets/ui/update_scene_forest_green.svg | 1181 B | ассет графики/3D/интерфейса: update scene forest green |
| №0617 app/assets/ui/update_scene_smoke.svg | 417 B | ассет графики/3D/интерфейса: update scene smoke |
| №0618 app/assets/ui/vine_bone_frame_strip.svg | 943 B | ассет графики/3D/интерфейса: vine bone frame strip |
| №0619 app/Backgrounds.js | 64081 B | логический модуль: Backgrounds |
| №0620 app/battle_action_ui.js | 18555 B | логический модуль: battle action ui |
| №0621 app/battle_board.js | 37763 B | логический модуль: battle board |
| №0622 app/bestiary_2_0_v56.js | 55618 B | логический модуль: bestiary 2 0 v56 |
| №0623 app/bestiary_catalog_v56_1.js | 16257 B | логический модуль: bestiary catalog v56 1 |
| №0624 app/bestiary_catalog_v56_10.js | 11060 B | логический модуль: bestiary catalog v56 10 |
| №0625 app/bestiary_catalog_v56_11.js | 13282 B | логический модуль: bestiary catalog v56 11 |
| №0626 app/bestiary_catalog_v56_12.js | 10189 B | логический модуль: bestiary catalog v56 12 |
| №0627 app/bestiary_catalog_v56_13.js | 12672 B | логический модуль: bestiary catalog v56 13 |
| №0628 app/bestiary_catalog_v56_2.js | 13579 B | логический модуль: bestiary catalog v56 2 |
| №0629 app/bestiary_catalog_v56_3.js | 14426 B | логический модуль: bestiary catalog v56 3 |
| №0630 app/bestiary_catalog_v56_4.js | 11437 B | логический модуль: bestiary catalog v56 4 |
| №0631 app/bestiary_catalog_v56_5.js | 8746 B | логический модуль: bestiary catalog v56 5 |
| №0632 app/bestiary_catalog_v56_6.js | 9217 B | логический модуль: bestiary catalog v56 6 |
| №0633 app/bestiary_catalog_v56_7.js | 9477 B | логический модуль: bestiary catalog v56 7 |
| №0634 app/bestiary_catalog_v56_8.js | 9710 B | логический модуль: bestiary catalog v56 8 |
| №0635 app/bestiary_catalog_v56_9.js | 10014 B | логический модуль: bestiary catalog v56 9 |
| №0636 app/blood_hunter_engine.js | 82559 B | логика класса Кровавый охотник |
| №0637 app/campaign_manager.js | 7230 B | логический модуль: campaign manager |
| №0638 app/character_builder_v2.js | 110748 B | логический модуль: character builder v2 |
| №0639 app/character_creation_pergament.css | 12901 B | оформление интерфейса: character creation pergament |
| №0640 app/character_creation_pergament.js | 40195 B | логический модуль: character creation pergament |
| №0641 app/character_creation.js | 47703 B | логический модуль: character creation |
| №0642 app/character.js | 11362 B | лист персонажа; состояния и оружие |
| №0643 app/class_features_engine.js | 135942 B | логический модуль: class features engine |
| №0644 app/classesRegistry.js | 11027 B | логический модуль: classesRegistry |
| №0645 app/cloud_account.css | 1224 B | оформление интерфейса: cloud account |
| №0646 app/cloud_account.js | 9060 B | интерфейс авторизации и управления версиями |
| №0647 app/cloud_config.js | 458 B | публичная конфигурация облака |
| №0648 app/cloud_sync.js | 24983 B | синхронизация сохранений через Supabase |
| №0649 app/combat_abilities.js | 13046 B | логический модуль: combat abilities |
| №0650 app/combat_engine.js | 95712 B | движок боя и HP; адаптеры legacy значений |
| №0651 app/companion_gameplay_v27.js | 17747 B | логический модуль: companion gameplay v27 |
| №0652 app/companion_packs_v26.js | 5045 B | логический модуль: companion packs v26 |
| №0653 app/companions.js | 8968 B | логический модуль: companions |
| №0654 app/consumables.js | 15937 B | логический модуль: consumables |
| №0655 app/content_catalog.js | 9796 B | логический модуль: content catalog |
| №0656 app/content_framework.js | 9998 B | логический модуль: content framework |
| №0657 app/content_manifest.js | 3795 B | логический модуль: content manifest |
| №0658 app/crafting_character_influence_test_v46.js | 7221 B | логический модуль: crafting character influence test v46 |
| №0659 app/crafting_disassembly_repair_v51.js | 13557 B | логический модуль: crafting disassembly repair v51 |
| №0660 app/crafting_disassembly_v51.js | 12112 B | логический модуль: crafting disassembly v51 |
| №0661 app/crafting_dlc_v50.js | 8490 B | логический модуль: crafting dlc v50 |
| №0662 app/crafting_economy_v49.js | 17231 B | логический модуль: crafting economy v49 |
| №0663 app/crafting_engine_v31.js | 20387 B | логический модуль: crafting engine v31 |
| №0664 app/crafting_profession_progression_test_v47.js | 5657 B | логический модуль: crafting profession progression test v47 |
| №0665 app/crafting_profession_progression_v47.js | 36106 B | логический модуль: crafting profession progression v47 |
| №0666 app/crafting_professions_v33.js | 19384 B | логический модуль: crafting professions v33 |
| №0667 app/crafting_professions_v38.js | 49093 B | логический модуль: crafting professions v38 |
| №0668 app/crafting_resources_v34.js | 35782 B | логический модуль: crafting resources v34 |
| №0669 app/custom_crafting_v32.js | 16067 B | логический модуль: custom crafting v32 |
| №0670 app/data/classes/Accursed.js | 3424 B | логика классов: Accursed |
| №0671 app/data/classes/accursed.png | 2441667 B | логика классов: accursed |
| №0672 app/data/classes/Alchemist.js | 5640 B | логика классов: Alchemist |
| №0673 app/data/classes/alchemist.png | 1945616 B | логика классов: alchemist |
| №0674 app/data/classes/Artificer.js | 2154 B | логика классов: Artificer |
| №0675 app/data/classes/ARTIFICER.png | 891812 B | логика классов: ARTIFICER |
| №0676 app/data/classes/Barbarian.js | 3939 B | логика классов: Barbarian |
| №0677 app/data/classes/BARBARIAN.png | 815028 B | логика классов: BARBARIAN |
| №0678 app/data/classes/Bard.js | 2116 B | логика классов: Bard |
| №0679 app/data/classes/Bard.png | 769261 B | логика классов: Bard |
| №0680 app/data/classes/beasthart.png | 2255040 B | логика классов: beasthart |
| №0681 app/data/classes/Beastheart.js | 29158 B | логика классов: Beastheart |
| №0682 app/data/classes/blood hunter.png | 2210071 B | логика классов: blood hunter |
| №0683 app/data/classes/BloodHunter.js | 5322 B | логика классов: BloodHunter |
| №0684 app/data/classes/Cleric.js | 2018 B | логика классов: Cleric |
| №0685 app/data/classes/CLERIC.png | 914579 B | логика классов: CLERIC |
| №0686 app/data/classes/Druid.js | 1929 B | логика классов: Druid |
| №0687 app/data/classes/DRUID.png | 776880 B | логика классов: DRUID |
| №0688 app/data/classes/extra_class_stubs.js | 4516 B | логика классов: extra class stubs |
| №0689 app/data/classes/Fighter.js | 3890 B | логика классов: Fighter |
| №0690 app/data/classes/FIGHTER.png | 762812 B | логика классов: FIGHTER |
| №0691 app/data/classes/geist.png | 1776006 B | логика классов: geist |
| №0692 app/data/classes/Ghost.js | 302 B | логика классов: Ghost |
| №0693 app/data/classes/Illigger.js | 6152 B | логика классов: Illigger |
| №0694 app/data/classes/Illigger.png | 1716994 B | логика классов: Illigger |
| №0695 app/data/classes/level_up.js | 64179 B | логика классов: level up |
| №0696 app/data/classes/Martyr.js | 900 B | логика классов: Martyr |
| №0697 app/data/classes/martyr.png | 2381724 B | логика классов: martyr |
| №0698 app/data/classes/Monk.js | 2524 B | логика классов: Monk |
| №0699 app/data/classes/Monk.png | 1115382 B | логика классов: Monk |
| №0700 app/data/classes/Necromancer.js | 1039 B | логика классов: Necromancer |
| №0701 app/data/classes/necromancer.png | 2007714 B | логика классов: necromancer |
| №0702 app/data/classes/Occultist.js | 8580 B | логика классов: Occultist |
| №0703 app/data/classes/occultist.png | 1986332 B | логика классов: occultist |
| №0704 app/data/classes/Paladin.js | 2048 B | логика классов: Paladin |
| №0705 app/data/classes/PALADIN.png | 873991 B | логика классов: PALADIN |
| №0706 app/data/classes/Parasite.js | 560 B | логика классов: Parasite |
| №0707 app/data/classes/parasite.png | 2144116 B | логика классов: parasite |
| №0708 app/data/classes/progressionEngine.js | 20954 B | логика классов: progressionEngine |
| №0709 app/data/classes/Psion.js | 9042 B | логика классов: Psion |
| №0710 app/data/classes/psion.png | 1951350 B | логика классов: psion |
| №0711 app/data/classes/Pugilist.js | 11616 B | логика классов: Pugilist |
| №0712 app/data/classes/pugilist.png | 2022336 B | логика классов: pugilist |
| №0713 app/data/classes/Ranger.js | 1969 B | логика классов: Ranger |
| №0714 app/data/classes/RANGER.png | 643335 B | логика классов: RANGER |
| №0715 app/data/classes/Rogue.js | 3342 B | логика классов: Rogue |
| №0716 app/data/classes/Rogue.png | 579962 B | логика классов: Rogue |
| №0717 app/data/classes/rune keeper.png | 2582772 B | логика классов: rune keeper |
| №0718 app/data/classes/RuneKeeper.js | 2399 B | логика классов: RuneKeeper |
| №0719 app/data/classes/Savant.js | 952 B | логика классов: Savant |
| №0720 app/data/classes/savant.png | 1991433 B | логика классов: savant |
| №0721 app/data/classes/Shifter.js | 746 B | логика классов: Shifter |
| №0722 app/data/classes/shifter.png | 2248497 B | логика классов: shifter |
| №0723 app/data/classes/Sorcerer.js | 2129 B | логика классов: Sorcerer |
| №0724 app/data/classes/SORCERER.png | 939797 B | логика классов: SORCERER |
| №0725 app/data/classes/Swarm.js | 202 B | логика классов: Swarm |
| №0726 app/data/classes/the swam.png | 1759593 B | логика классов: the swam |
| №0727 app/data/classes/Vessel.js | 757 B | логика классов: Vessel |
| №0728 app/data/classes/vessel.png | 1943431 B | логика классов: vessel |
| №0729 app/data/classes/WalterParasite.js | 309 B | логика классов: WalterParasite |
| №0730 app/data/classes/Warden.js | 6787 B | логика классов: Warden |
| №0731 app/data/classes/warden.png | 2093561 B | логика классов: warden |
| №0732 app/data/classes/Warlock.js | 2044 B | логика классов: Warlock |
| №0733 app/data/classes/WARLOCK.png | 981038 B | логика классов: WARLOCK |
| №0734 app/data/classes/Warlord.js | 9600 B | логика классов: Warlord |
| №0735 app/data/classes/warlord.png | 2460016 B | логика классов: warlord |
| №0736 app/data/classes/Witch.js | 8033 B | логика классов: Witch |
| №0737 app/data/classes/witch.png | 1931074 B | логика классов: witch |
| №0738 app/data/classes/Wizard.js | 1658 B | логика классов: Wizard |
| №0739 app/data/classes/Wizard.png | 822251 B | логика классов: Wizard |
| №0740 app/data/feats/Feat_widget.js | 26146 B | черты и таланты: Feat widget |
| №0741 app/data/feats/Feats_phb.js | 19762 B | черты и таланты: Feats phb |
| №0742 app/data/feats/Feats_settings.js | 4494 B | черты и таланты: Feats settings |
| №0743 app/data/feats/Feats_tcoe.js | 5894 B | черты и таланты: Feats tcoe |
| №0744 app/data/feats/Feats_ua_homebrew.js | 12137 B | черты и таланты: Feats ua homebrew |
| №0745 app/data/feats/Feats_xgte.js | 6862 B | черты и таланты: Feats xgte |
| №0746 app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №0747 app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №0748 app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №0749 app/data/maps/3d_stress_test_all.json | 170566 B | данные/конфигурация: 3d stress test all |
| №0750 app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №0751 app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №0752 app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №0753 app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №0754 app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №0755 app/data/spells/Focuses.js | 54334 B | данные заклинаний: Focuses |
| №0756 app/data/spells/Spells1lvl.js | 61199 B | данные заклинаний: Spells1lvl |
| №0757 app/data/spells/Spells2lvl.js | 71667 B | данные заклинаний: Spells2lvl |
| №0758 app/data/spells/Spells3lvl.js | 49596 B | данные заклинаний: Spells3lvl |
| №0759 app/data/spells/Spells4lvl.js | 40415 B | данные заклинаний: Spells4lvl |
| №0760 app/data/spells/Spells5lvl.js | 42580 B | данные заклинаний: Spells5lvl |
| №0761 app/data/spells/spells6lvl.js | 38565 B | данные заклинаний: spells6lvl |
| №0762 app/data/spells/Spells7lvl.js | 29629 B | данные заклинаний: Spells7lvl |
| №0763 app/data/spells/Spells8lvl.js | 21765 B | данные заклинаний: Spells8lvl |
| №0764 app/data/spells/Spells9lvl.js | 33098 B | данные заклинаний: Spells9lvl |
| №0765 app/data/subclasses/subclassesRegistry.js | 112653 B | логика подклассов: subclassesRegistry |
| №0766 app/debug.js | 6121 B | логический модуль: debug |
| №0767 app/dice.js | 43405 B | логический модуль: dice |
| №0768 app/dnd_tools.js | 19783 B | логический модуль: dnd tools |
| №0769 app/expanded_bestiary_v39.js | 49565 B | логический модуль: expanded bestiary v39 |
| №0770 app/expanded_class_registry_bridge.js | 5105 B | логический модуль: expanded class registry bridge |
| №0771 app/expanded_classes_v23.js | 30525 B | логический модуль: expanded classes v23 |
| №0772 app/expanded_subclasses_v23.js | 2050 B | логический модуль: expanded subclasses v23 |
| №0773 app/expansion_class_progressions.js | 6824 B | логический модуль: expansion class progressions |
| №0774 app/expansion_classes_pack.js | 355247 B | логический модуль: expansion classes pack |
| №0775 app/Experience.js | 6345 B | логический модуль: Experience |
| №0776 app/extra_class_ui_bridge.js | 661 B | логический модуль: extra class ui bridge |
| №0777 app/feat_engine.js | 11529 B | логический модуль: feat engine |
| №0778 app/gameplay_core_v57.js | 20330 B | логический модуль: gameplay core v57 |
| №0779 app/ghost_extra_runtime.js | 22632 B | логический модуль: ghost extra runtime |
| №0780 app/ghost_extra_ui.js | 2426 B | логический модуль: ghost extra ui |
| №0781 app/Hero-info.js | 12698 B | логический модуль: Hero info |
| №0782 app/icon_settings_v2.js | 10793 B | логический модуль: icon settings v2 |
| №0783 app/icon_settings.js | 11593 B | логический модуль: icon settings |
| №0784 app/inventory_containers_v54.js | 12887 B | логический модуль: inventory containers v54 |
| №0785 app/inventory-coins.js | 24464 B | логический модуль: inventory coins |
| №0786 app/inventory-modal.js | 33255 B | логический модуль: inventory modal |
| №0787 app/Inventory-weight-tracker.js | 16086 B | логический модуль: Inventory weight tracker |
| №0788 app/Inventory.js | 37728 B | логический модуль: Inventory |
| №0789 app/junk.js | 8587 B | логический модуль: junk |
| №0790 app/kibbles_localization_content_v71.js | 32599 B | логический модуль: kibbles localization content v71 |
| №0791 app/library.js | 9565 B | логический модуль: library |
| №0792 app/Logo.js | 5934 B | логический модуль: Logo |
| №0793 app/magic_engine.js | 7636 B | логический модуль: magic engine |
| №0794 app/market_economy_v55.js | 17300 B | логический модуль: market economy v55 |
| №0795 app/market_expansion_v55_1.js | 21633 B | логический модуль: market expansion v55 1 |
| №0796 app/market_social_v55_3.js | 11810 B | логический модуль: market social v55 3 |
| №0797 app/market_trade_v55_2.js | 25707 B | логический модуль: market trade v55 2 |
| №0798 app/martyr_mhp_2024_runtime.js | 33416 B | логический модуль: martyr mhp 2024 runtime |
| №0799 app/materials.js | 12239 B | логический модуль: materials |
| №0800 app/monster_engine.js | 17968 B | логический модуль: monster engine |
| №0801 app/monster_loot_crafting_bridge_v40.js | 31786 B | логический модуль: monster loot crafting bridge v40 |
| №0802 app/monster_loot_engine_v36.js | 13702 B | логический модуль: monster loot engine v36 |
| №0803 app/monster_loot_engine_v37.js | 18682 B | логический модуль: monster loot engine v37 |
| №0804 app/necromancer_mhp_2024_runtime.js | 43793 B | логический модуль: necromancer mhp 2024 runtime |
| №0805 app/network_engine.js | 46160 B | логический модуль: network engine |
| №0806 app/network_gameplay.js | 87735 B | логический модуль: network gameplay |
| №0807 app/notes.js | 4945 B | логический модуль: notes |
| №0808 app/occultist_kibbles_v11_runtime.js | 61000 B | логический модуль: occultist kibbles v11 runtime |
| №0809 app/onboarding_faq_v71.css | 6139 B | оформление интерфейса: onboarding faq v71 |
| №0810 app/onboarding_faq_v71.js | 32582 B | логический модуль: onboarding faq v71 |
| №0811 app/parasite_extra_runtime.js | 30619 B | логический модуль: parasite extra runtime |
| №0812 app/parasite_extra_ui.js | 4785 B | логический модуль: parasite extra ui |
| №0813 app/predictor_cards.js | 145982 B | логический модуль: predictor cards |
| №0814 app/predictor_deck_ui.js | 39650 B | логический модуль: predictor deck ui |
| №0815 app/predictor_movement.js | 6743 B | логический модуль: predictor movement |
| №0816 app/predictor_runtime.js | 31208 B | логический модуль: predictor runtime |
| №0817 app/Proficiencies.js | 31575 B | логический модуль: Proficiencies |
| №0818 app/Proficienciescheck.js | 10557 B | логический модуль: Proficienciescheck |
| №0819 app/races.js | 52899 B | логический модуль: races |
| №0820 app/resource_gathering_v35.js | 12675 B | логический модуль: resource gathering v35 |
| №0821 app/resource_processing_v44.js | 22359 B | логический модуль: resource processing v44 |
| №0822 app/rulesEngine.js | 46702 B | логический модуль: rulesEngine |
| №0823 app/runekeeper_taron_v12_runtime.js | 27847 B | логический модуль: runekeeper taron v12 runtime |
| №0824 app/savant_laserllama_v561_runtime.js | 30000 B | логический модуль: savant laserllama v561 runtime |
| №0825 app/secondary_entities_engine.js | 7389 B | логический модуль: secondary entities engine |
| №0826 app/Settings_debug.js | 7520 B | логический модуль: Settings debug |
| №0827 app/Settings.js | 60758 B | логический модуль: Settings |
| №0828 app/shifter_laserllama_v2_1_runtime.js | 38741 B | логический модуль: shifter laserllama v2 1 runtime |
| №0829 app/skills.js | 6511 B | логический модуль: skills |
| №0830 app/spellblade_kibbles_runtime.js | 14367 B | логический модуль: spellblade kibbles runtime |
| №0831 app/spells.js | 40067 B | логический модуль: spells |
| №0832 app/styles.css | 24733 B | оформление интерфейса: styles |
| №0833 app/summoning_engine.js | 12914 B | логический модуль: summoning engine |
| №0834 app/swarm_extra_runtime.js | 20246 B | логический модуль: swarm extra runtime |
| №0835 app/swipe-lock.js | 1885 B | логический модуль: swipe lock |
| №0836 app/turn_planner.js | 16013 B | логический модуль: turn planner |
| №0837 app/update_manager_v2.js | 20285 B | логический модуль: update manager v2 |
| №0838 app/update_scene_v2.js | 11725 B | логический модуль: update scene v2 |
| №0839 app/vessel_laserllama_v4_runtime.js | 48356 B | логический модуль: vessel laserllama v4 runtime |
| №0840 app/vtt_character_actions_v64.js | 4065 B | логический модуль: vtt character actions v64 |
| №0841 app/vtt_character_sheet_v63.js | 3990 B | логический модуль: vtt character sheet v63 |
| №0842 app/vtt_combat_event_bus_v69.js | 8326 B | логический модуль: vtt combat event bus v69 |
| №0843 app/vtt_combat_log_v66.js | 8146 B | логический модуль: vtt combat log v66 |
| №0844 app/vtt_debug_character_lab_v702.js | 16621 B | логический модуль: vtt debug character lab v702 |
| №0845 app/vtt_debug_dice_lab_v706.js | 9144 B | логический модуль: vtt debug dice lab v706 |
| №0846 app/vtt_debug_error_log_v709.js | 6019 B | логический модуль: vtt debug error log v709 |
| №0847 app/vtt_debug_lab_v703.js | 12196 B | логический модуль: vtt debug lab v703 |
| №0848 app/vtt_debug_panel_v70.js | 17354 B | логический модуль: vtt debug panel v70 |
| №0849 app/vtt_debug_rules_matrix_v707.js | 6926 B | логический модуль: vtt debug rules matrix v707 |
| №0850 app/vtt_debug_sandbox_v701.js | 14691 B | логический модуль: vtt debug sandbox v701 |
| №0851 app/vtt_debug_scenario_editor_v705.js | 10397 B | логический модуль: vtt debug scenario editor v705 |
| №0852 app/vtt_debug_scenarios_v704.js | 8422 B | логический модуль: vtt debug scenarios v704 |
| №0853 app/vtt_debug_tasks_v708.js | 25401 B | логический модуль: vtt debug tasks v708 |
| №0854 app/vtt_dice_resolution_v65.js | 3959 B | логический модуль: vtt dice resolution v65 |
| №0855 app/vtt_encounter_checkpoint_v68.js | 9658 B | логический модуль: vtt encounter checkpoint v68 |
| №0856 app/vtt_encounter_map_v59.js | 9504 B | логический модуль: vtt encounter map v59 |
| №0857 app/vtt_gameplay_ux_v58.js | 8677 B | логический модуль: vtt gameplay ux v58 |
| №0858 app/vtt_mobile_battle_v61.js | 4603 B | логический модуль: vtt mobile battle v61 |
| №0859 app/vtt_mobile_combat_hud_v62.js | 9109 B | логический модуль: vtt mobile combat hud v62 |
| №0860 app/vtt_mobile_session_v67.js | 11191 B | логический модуль: vtt mobile session v67 |
| №0861 app/vtt_project_manifest_v70.js | 44406 B | логический модуль: vtt project manifest v70 |
| №0862 app/vtt_token_interaction_v60.js | 8595 B | логический модуль: vtt token interaction v60 |
| №0863 app/Wallpapers.js | 20385 B | логический модуль: Wallpapers |
| №0864 app/walter_parasite_extra_runtime.js | 34348 B | логический модуль: walter parasite extra runtime |
| №0865 app/walter_parasite_ui.js | 4267 B | логический модуль: walter parasite ui |
| №0866 app/warden_mhp_2024_runtime.js | 42129 B | логический модуль: warden mhp 2024 runtime |
| №0867 app/warlord_laserllama_v330_runtime.js | 15993 B | логический модуль: warlord laserllama v330 runtime |
| №0868 app/weapons.js | 3456 B | логический модуль: weapons |
| №0869 app/weaponsheavy.js | 8534 B | логический модуль: weaponsheavy |
| №0870 app/weaponsmelee.js | 20679 B | логический модуль: weaponsmelee |
| №0871 app/weaponsranged.js | 18504 B | логический модуль: weaponsranged |
| №0872 app/weaponsspecial.js | 5759 B | логический модуль: weaponsspecial |
| №0873 app/world_resource_gathering_v53.js | 17480 B | логический модуль: world resource gathering v53 |
| №0874 arcanacards.png | 1820683 B | текстура/изображение: arcanacards |
| №0875 ash_v2_sprite.png | 442476 B | текстура/изображение: ash v2 sprite |
| №0876 bed.glb | 5718760 B | 3D модель/геометрия: bed |
| №0877 bookshelf.glb | 7818348 B | 3D модель/геометрия: bookshelf |
| №0878 chair.glb | 4643004 B | 3D модель/геометрия: chair |
| №0879 closet.glb | 6550260 B | 3D модель/геометрия: closet |
| №0880 commode.glb | 4845868 B | 3D модель/геометрия: commode |
| №0881 desktop/main.cjs | 9233 B | Electron: создание окна Windows |
| №0882 desktop/preload.cjs | 2293 B | Electron: preload и мост к UI |
| №0883 desktop/prepare.cjs | 3401 B | Electron: подготовка web ресурсов |
| №0884 desktop/update.cjs | 11130 B | Electron: обновление |
| №0885 DND_VTT_FURNITURE_CONVERSION_KIT.zip | 4072 B | архив ассетов: DND VTT FURNITURE CONVERSION KIT |
| №0886 DND_VTT_FURNITURE_READY_02.zip | 65111 B | архив ассетов: DND VTT FURNITURE READY 02 |
| №0887 DND_VTT_FURNITURE_READY_03.zip | 84538 B | архив ассетов: DND VTT FURNITURE READY 03 |
| №0888 DND_VTT_FURNITURE_READY_04.zip | 133763 B | архив ассетов: DND VTT FURNITURE READY 04 |
| №0889 DND_VTT_FURNITURE_READY_05.zip | 54294 B | архив ассетов: DND VTT FURNITURE READY 05 |
| №0890 DND_VTT_FURNITURE_READY_06.zip | 89087 B | архив ассетов: DND VTT FURNITURE READY 06 |
| №0891 DND_VTT_FURNITURE_READY_07.zip | 73932 B | архив ассетов: DND VTT FURNITURE READY 07 |
| №0892 DND_VTT_FURNITURE_READY_08.zip | 67621 B | архив ассетов: DND VTT FURNITURE READY 08 |
| №0893 DND_VTT_FURNITURE_READY_09_20_MODELS.zip | 101933 B | архив ассетов: DND VTT FURNITURE READY 09 20 MODELS |
| №0894 DND_VTT_REMAINING_GLB_BULK.zip | 5302181 B | архив ассетов: DND VTT REMAINING GLB BULK |
| №0895 docs/00_AI_PROJECT_GUIDE.md | 355605 B | документация или отчёт: 00 AI PROJECT GUIDE |
| №0896 docs/00_NEW_CHAT_PROMPT_V56_10.txt | 2698 B | документация или отчёт: 00 NEW CHAT PROMPT V56 10 |
| №0897 docs/00_NEW_CHAT_PROMPT_V56_11.txt | 2153 B | документация или отчёт: 00 NEW CHAT PROMPT V56 11 |
| №0898 docs/00_NEW_CHAT_PROMPT_V56_12.txt | 770 B | документация или отчёт: 00 NEW CHAT PROMPT V56 12 |
| №0899 docs/00_NEW_CHAT_PROMPT_V56_9.txt | 3962 B | документация или отчёт: 00 NEW CHAT PROMPT V56 9 |
| №0900 docs/2026-10-09_ota_v74_00_17_checkpoint.json | 1704 B | документация или отчёт: 2026 10 09 ota v74 00 17 checkpoint |
| №0901 docs/2026-10-09_ota_v74_00_17.md | 6238 B | документация или отчёт: 2026 10 09 ota v74 00 17 |
| №0902 docs/2026-10-11_ota_v74_00_57_checkpoint.json | 485 B | документация или отчёт: 2026 10 11 ota v74 00 57 checkpoint |
| №0903 docs/2026-10-11_ota_v74_00_57.md | 5912 B | документация или отчёт: 2026 10 11 ota v74 00 57 |
| №0904 docs/3D_ASSET_IMPORT_BATCHES.md | 32901 B | документация или отчёт: 3D ASSET IMPORT BATCHES |
| №0905 docs/3d_character_anatomy/ADULT_ANATOMY_PROGRESS.md | 43940 B | документация или отчёт: ADULT ANATOMY PROGRESS |
| №0906 docs/3d_character_anatomy/ASSET_AUDIT_2026-10-12.json | 23168 B | документация или отчёт: ASSET AUDIT 2026 10 12 |
| №0907 docs/3d_character_anatomy/SKIN_MATERIAL_PIPELINE.md | 7503 B | документация или отчёт: SKIN MATERIAL PIPELINE |
| №0908 docs/3d_character_journal/2026-10-09_01_morph_architecture.md | 2445 B | документация или отчёт: 2026 10 09 01 morph architecture |
| №0909 docs/3d_character_journal/2026-10-09_02_morph_bridge.md | 2742 B | документация или отчёт: 2026 10 09 02 morph bridge |
| №0910 docs/3d_character_journal/2026-10-09_03_morph_bridge_diagnostics.md | 1795 B | документация или отчёт: 2026 10 09 03 morph bridge diagnostics |
| №0911 docs/3d_character_journal/2026-10-09_04_skin_textures.md | 5043 B | документация или отчёт: 2026 10 09 04 skin textures |
| №0912 docs/3d_character_journal/2026-10-09_05_named_makehuman_morphs.md | 8770 B | документация или отчёт: 2026 10 09 05 named makehuman morphs |
| №0913 docs/3d_character_journal/2026-10-09_06_female_stage1_checkpoint.json | 5948 B | документация или отчёт: 2026 10 09 06 female stage1 checkpoint |
| №0914 docs/3d_character_journal/2026-10-09_06_female_stage1.md | 8501 B | документация или отчёт: 2026 10 09 06 female stage1 |
| №0915 docs/3d_character_journal/2026-10-09_07_female_stage2_checkpoint.json | 892 B | документация или отчёт: 2026 10 09 07 female stage2 checkpoint |
| №0916 docs/3d_character_journal/2026-10-09_07_female_stage2.md | 7749 B | документация или отчёт: 2026 10 09 07 female stage2 |
| №0917 docs/3d_character_journal/2026-10-09_08_female_release_checkpoint.json | 1785 B | документация или отчёт: 2026 10 09 08 female release checkpoint |
| №0918 docs/3d_character_journal/2026-10-09_08_female_release.md | 7876 B | документация или отчёт: 2026 10 09 08 female release |
| №0919 docs/3d_character_journal/2026-10-10_editor_v74_00_22.md | 6823 B | документация или отчёт: 2026 10 10 editor v74 00 22 |
| №0920 docs/3d_character_journal/2026-10-11_editor_v74_00_32.md | 1165 B | документация или отчёт: 2026 10 11 editor v74 00 32 |
| №0921 docs/3d_character_journal/2026-10-11_editor_v74_00_33.md | 1267 B | документация или отчёт: 2026 10 11 editor v74 00 33 |
| №0922 docs/3d_character_journal/2026-10-11_editor_v74_00_34.md | 3349 B | документация или отчёт: 2026 10 11 editor v74 00 34 |
| №0923 docs/3d_character_journal/2026-10-11_editor_v74_00_35.md | 3260 B | документация или отчёт: 2026 10 11 editor v74 00 35 |
| №0924 docs/3d_character_races/aarakocra.md | 4990 B | документация или отчёт: aarakocra |
| №0925 docs/3d_character_races/aasimar.md | 2410 B | документация или отчёт: aasimar |
| №0926 docs/3d_character_races/ANIMAL_HEADS.md | 5750 B | документация или отчёт: ANIMAL HEADS |
| №0927 docs/3d_character_races/autognome.md | 2770 B | документация или отчёт: autognome |
| №0928 docs/3d_character_races/AVIAN_ELEPHANT_HEADS.md | 5691 B | документация или отчёт: AVIAN ELEPHANT HEADS |
| №0929 docs/3d_character_races/bugbear.md | 4078 B | документация или отчёт: bugbear |
| №0930 docs/3d_character_races/centaur.md | 2905 B | документация или отчёт: centaur |
| №0931 docs/3d_character_races/changeling.md | 2174 B | документация или отчёт: changeling |
| №0932 docs/3d_character_races/dhampir.md | 1570 B | документация или отчёт: dhampir |
| №0933 docs/3d_character_races/dragonborn.md | 5032 B | документация или отчёт: dragonborn |
| №0934 docs/3d_character_races/dwarf_hill.md | 2195 B | документация или отчёт: dwarf hill |
| №0935 docs/3d_character_races/dwarf_mountain.md | 2195 B | документация или отчёт: dwarf mountain |
| №0936 docs/3d_character_races/elf_drow.md | 4188 B | документация или отчёт: elf drow |
| №0937 docs/3d_character_races/elf_high.md | 4186 B | документация или отчёт: elf high |
| №0938 docs/3d_character_races/elf_wood.md | 4171 B | документация или отчёт: elf wood |
| №0939 docs/3d_character_races/EXTRA_FORMS_PLAN.md | 5879 B | документация или отчёт: EXTRA FORMS PLAN |
| №0940 docs/3d_character_races/fairy.md | 2164 B | документация или отчёт: fairy |
| №0941 docs/3d_character_races/firbolg.md | 1222 B | документация или отчёт: firbolg |
| №0942 docs/3d_character_races/full_orc.md | 3020 B | документация или отчёт: full orc |
| №0943 docs/3d_character_races/FUR_PACK.md | 3763 B | документация или отчёт: FUR PACK |
| №0944 docs/3d_character_races/genasi_air.md | 1487 B | документация или отчёт: genasi air |
| №0945 docs/3d_character_races/genasi_earth.md | 1532 B | документация или отчёт: genasi earth |
| №0946 docs/3d_character_races/genasi_fire.md | 1540 B | документация или отчёт: genasi fire |
| №0947 docs/3d_character_races/genasi_water.md | 1477 B | документация или отчёт: genasi water |
| №0948 docs/3d_character_races/ghost.md | 5504 B | документация или отчёт: ghost |
| №0949 docs/3d_character_races/githyanki.md | 1332 B | документация или отчёт: githyanki |
| №0950 docs/3d_character_races/githzerai.md | 1332 B | документация или отчёт: githzerai |
| №0951 docs/3d_character_races/gnome_forest.md | 2191 B | документация или отчёт: gnome forest |
| №0952 docs/3d_character_races/gnome_rock.md | 2193 B | документация или отчёт: gnome rock |
| №0953 docs/3d_character_races/goblin.md | 1289 B | документация или отчёт: goblin |
| №0954 docs/3d_character_races/goliath.md | 1373 B | документация или отчёт: goliath |
| №0955 docs/3d_character_races/hadozee.md | 4266 B | документация или отчёт: hadozee |
| №0956 docs/3d_character_races/HAIR_PACK.md | 4861 B | документация или отчёт: HAIR PACK |
| №0957 docs/3d_character_races/half_elf.md | 4225 B | документация или отчёт: half elf |
| №0958 docs/3d_character_races/half_orc.md | 3028 B | документация или отчёт: half orc |
| №0959 docs/3d_character_races/halfling_lightfoot.md | 3509 B | документация или отчёт: halfling lightfoot |
| №0960 docs/3d_character_races/halfling_stout.md | 3505 B | документация или отчёт: halfling stout |
| №0961 docs/3d_character_races/harengon.md | 5688 B | документация или отчёт: harengon |
| №0962 docs/3d_character_races/hexblood.md | 1656 B | документация или отчёт: hexblood |
| №0963 docs/3d_character_races/hobgoblin.md | 1221 B | документация или отчёт: hobgoblin |
| №0964 docs/3d_character_races/kalashtar.md | 1423 B | документация или отчёт: kalashtar |
| №0965 docs/3d_character_races/kender.md | 1170 B | документация или отчёт: kender |
| №0966 docs/3d_character_races/kenku.md | 5037 B | документация или отчёт: kenku |
| №0967 docs/3d_character_races/kobold.md | 4717 B | документация или отчёт: kobold |
| №0968 docs/3d_character_races/lizardfolk.md | 4966 B | документация или отчёт: lizardfolk |
| №0969 docs/3d_character_races/loxodon.md | 4694 B | документация или отчёт: loxodon |
| №0970 docs/3d_character_races/minotaur.md | 6082 B | документация или отчёт: minotaur |
| №0971 docs/3d_character_races/myconid.md | 1853 B | документация или отчёт: myconid |
| №0972 docs/3d_character_races/NATIVE_LIMBS.md | 6470 B | документация или отчёт: NATIVE LIMBS |
| №0973 docs/3d_character_races/owlin.md | 5144 B | документация или отчёт: owlin |
| №0974 docs/3d_character_races/parasite.md | 3111 B | документация или отчёт: parasite |
| №0975 docs/3d_character_races/plasmoid.md | 1940 B | документация или отчёт: plasmoid |
| №0976 docs/3d_character_races/RACES_3D_REMAINING_AUDIT_2026-10-12.md | 35602 B | документация или отчёт: RACES 3D REMAINING AUDIT 2026 10 12 |
| №0977 docs/3d_character_races/reborn.md | 1632 B | документация или отчёт: reborn |
| №0978 docs/3d_character_races/REMAINING_WORK.md | 23983 B | документация или отчёт: REMAINING WORK |
| №0979 docs/3d_character_races/satyr.md | 5084 B | документация или отчёт: satyr |
| №0980 docs/3d_character_races/shifter.md | 3232 B | документация или отчёт: shifter |
| №0981 docs/3d_character_races/simic_hybrid.md | 2660 B | документация или отчёт: simic hybrid |
| №0982 docs/3d_character_races/swarm_bats.md | 1026 B | документация или отчёт: swarm bats |
| №0983 docs/3d_character_races/swarm_beetles.md | 7010 B | документация или отчёт: swarm beetles |
| №0984 docs/3d_character_races/SWARM_DENSE_REDESIGN.md | 9075 B | документация или отчёт: SWARM DENSE REDESIGN |
| №0985 docs/3d_character_races/swarm_rats.md | 6496 B | документация или отчёт: swarm rats |
| №0986 docs/3d_character_races/tabaxi.md | 6044 B | документация или отчёт: tabaxi |
| №0987 docs/3d_character_races/TEXTURE_PACK_CHECKPOINT.md | 17340 B | документация или отчёт: TEXTURE PACK CHECKPOINT |
| №0988 docs/3d_character_races/TIEFLING_DETAIL_REDESIGN.md | 7331 B | документация или отчёт: TIEFLING DETAIL REDESIGN |
| №0989 docs/3d_character_races/tiefling.md | 3011 B | документация или отчёт: tiefling |
| №0990 docs/3d_character_races/tortle.md | 5826 B | документация или отчёт: tortle |
| №0991 docs/3d_character_races/triton.md | 1601 B | документация или отчёт: triton |
| №0992 docs/3d_character_races/vedalken.md | 1312 B | документация или отчёт: vedalken |
| №0993 docs/3d_character_races/walter_parasite.md | 3289 B | документация или отчёт: walter parasite |
| №0994 docs/3d_character_races/warforged.md | 2742 B | документация или отчёт: warforged |
| №0995 docs/3d_character_races/yuan_ti.md | 1682 B | документация или отчёт: yuan ti |
| №0996 docs/AI_AUTOMATION.md | 4106 B | документация или отчёт: AI AUTOMATION |
| №0997 docs/CLASS_IMPLEMENTATION_PLAN.md | 19358 B | документация или отчёт: CLASS IMPLEMENTATION PLAN |
| №0998 docs/CLASS_MECHANICS_SPEC.md | 39134 B | документация или отчёт: CLASS MECHANICS SPEC |
| №0999 docs/CLOUD_CHARACTER_SYNC.md | 31303 B | документация или отчёт: CLOUD CHARACTER SYNC |
| №1000 docs/CLOUD_SAVE_CALLERS.txt | 1940 B | документация или отчёт: CLOUD SAVE CALLERS |
| №1001 docs/DND_VTT_CLASS_AUDIT_V74_00_17.md | 184929 B | документация или отчёт: DND VTT CLASS AUDIT V74 00 17 |
| №1002 docs/Help.txt | 111496 B | документация или отчёт: Help |
| №1003 docs/KIBBLES_ATTRIBUTION_V71.md | 816 B | документация или отчёт: KIBBLES ATTRIBUTION V71 |
| №1004 docs/map-stage-740019.md | 1686 B | документация или отчёт: map stage 740019 |
| №1005 docs/map-stage-740021.md | 2011 B | документация или отчёт: map stage 740021 |
| №1006 docs/MONETIZATION_ROADMAP.md | 16016 B | документация или отчёт: MONETIZATION ROADMAP |
| №1007 docs/NETWORK_APK_NOTES.md | 7363 B | документация или отчёт: NETWORK APK NOTES |
| №1008 docs/PREDICTOR_APPROVED_CARD_STATUS.md | 52741 B | документация или отчёт: PREDICTOR APPROVED CARD STATUS |
| №1009 docs/PREDICTOR_CLASS_SPEC.md | 94622 B | документация или отчёт: PREDICTOR CLASS SPEC |
| №1010 docs/PRODUCT_ACCESS_AND_MONETIZATION.md | 11625 B | документация или отчёт: PRODUCT ACCESS AND MONETIZATION |
| №1011 docs/ROOT_FURNITURE_IMPORT_REPORT.md | 7154 B | документация или отчёт: ROOT FURNITURE IMPORT REPORT |
| №1012 docs/SIGNATURE_ASSET_FIX_74_00_66.md | 1737 B | документация или отчёт: SIGNATURE ASSET FIX 74 00 66 |
| №1013 docs/SUPABASE_MAIL_SETUP_PROMPT_RU.md | 2882 B | документация или отчёт: SUPABASE MAIL SETUP PROMPT RU |
| №1014 docs/UNIFIED_RELEASE.md | 6175 B | документация или отчёт: UNIFIED RELEASE |
| №1015 docs/UNITY_CHARACTER_SHEET_PARITY.md | 12098 B | документация или отчёт: UNITY CHARACTER SHEET PARITY |
| №1016 docs/UNITY_CLOUD_HANDOFF.md | 18631 B | документация или отчёт: UNITY CLOUD HANDOFF |
| №1017 docs/UNITY_MIGRATION_PLAN.md | 14710 B | документация или отчёт: UNITY MIGRATION PLAN |
| №1018 docs/WINDOWS_DESKTOP.md | 3815 B | документация или отчёт: WINDOWS DESKTOP |
| №1019 dragon_fire_v2_sprite.png | 1013123 B | текстура/изображение: dragon fire v2 sprite |
| №1020 embers_v2_sprite.png | 698014 B | текстура/изображение: embers v2 sprite |
| №1021 FAQ.md | 38885 B | документация или отчёт: FAQ |
| №1022 fire_front_v2_sprite.png | 2249732 B | текстура/изображение: fire front v2 sprite |
| №1023 fire_spread_mask_v2_sprite.png | 1373284 B | текстура/изображение: fire spread mask v2 sprite |
| №1024 flash_v2_sprite.png | 803264 B | текстура/изображение: flash v2 sprite |
| №1025 floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1026 floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1027 floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1028 floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1029 floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1030 floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1031 floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1032 floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1033 floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1034 floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1035 floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1036 floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1037 floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1038 floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1039 floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1040 floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1041 floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1042 floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1043 GLENMORIL Soundtrack - Music Box.mp3 | 1827664 B | аудиофайл: GLENMORIL Soundtrack   Music Box |
| №1044 gltf_catalog.js | 3206 B | логический модуль: gltf catalog |
| №1045 heat_glow_v2_sprite.png | 836371 B | текстура/изображение: heat glow v2 sprite |
| №1046 human-base-rigged.glb | 4994640 B | 3D модель/геометрия: human base rigged |
| №1047 index.html | 90828 B | HTML-точка входа; интерфейс и порядок JS загрузки |
| №1048 Jalan Jalan - Lotus.mp3 | 9083034 B | аудиофайл: Jalan Jalan   Lotus |
| №1049 lineage_2_16. Shepard's Flute.mp3 | 2997816 B | аудиофайл: lineage 2 16. Shepard's Flute |
| №1050 manifest.json | 519 B | данные/конфигурация: manifest |
| №1051 Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3 | 4020570 B | аудиофайл: Oliver DeRiviere   Prelude to an End (grizzlymusic.ru) |
| №1052 Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3 | 3530381 B | аудиофайл: Oliver Deriviere   Who Am I (grizzlymusic.ru) |
| №1053 package.json | 1667 B | npm и упаковка desktop EXE |
| №1054 PROJECT_ATLAS.md | генерируется | машиночитаемая карта репозитория для ИИ |
| №1055 PROJECT_ATLAS.txt | генерируется | человекочитаемая карта репозитория |
| №1056 README.md | 148 B | документация или отчёт: README |
| №1057 release-staging/unity-release.json | 3914 B | данные/конфигурация: unity release |
| №1058 smoke_back_v2_sprite-1.png | 1707378 B | текстура/изображение: smoke back v2 sprite 1 |
| №1059 smoke_back_v2_sprite.png | 1814587 B | текстура/изображение: smoke back v2 sprite |
| №1060 smoke_front_v2_sprite-1.png | 1890480 B | текстура/изображение: smoke front v2 sprite 1 |
| №1061 smoke_front_v2_sprite.png | 2064687 B | текстура/изображение: smoke front v2 sprite |
| №1062 smoke_mid_v2_sprite.png | 1898516 B | текстура/изображение: smoke mid v2 sprite |
| №1063 supabase/migrations/202610130001_characters.sql | 4500 B | SQL миграция Supabase |
| №1064 table.glb | 6217412 B | 3D модель/геометрия: table |
| №1065 tests/ai_automation_test.cjs | 1672 B | автотест: ai automation test |
| №1066 tests/ai_finalize_test.cjs | 3854 B | автотест: ai finalize test |
| №1067 tests/alchemist_combat_test.js | 19503 B | автотест: alchemist combat test |
| №1068 tests/alchemist_runtime_test.js | 42246 B | автотест: alchemist runtime test |
| №1069 tests/character_3d_editor_test.js | 14297 B | автотест: character 3d editor test |
| №1070 tests/character_3d_foundation_test.js | 15473 B | автотест: character 3d foundation test |
| №1071 tests/character_3d_morph_assets_test.js | 5206 B | автотест: character 3d morph assets test |
| №1072 tests/character_3d_skin_assets_test.js | 1846 B | автотест: character 3d skin assets test |
| №1073 tests/character_3d_skin_morph_test.js | 3068 B | автотест: character 3d skin morph test |
| №1074 tests/character_adult_anatomy_test.js | 4734 B | автотест: character adult anatomy test |
| №1075 tests/character_animal_heads_test.js | 4428 B | автотест: character animal heads test |
| №1076 tests/character_appearance_store_test.js | 2322 B | автотест: character appearance store test |
| №1077 tests/character_avian_elephant_heads_test.js | 5138 B | автотест: character avian elephant heads test |
| №1078 tests/character_clothing_customizer_geometry_test.js | 4682 B | автотест: character clothing customizer geometry test |
| №1079 tests/character_clothing_options_test.js | 1930 B | автотест: character clothing options test |
| №1080 tests/character_clothing_test.js | 7294 B | автотест: character clothing test |
| №1081 tests/character_editor_morph_assets_test.js | 4813 B | автотест: character editor morph assets test |
| №1082 tests/character_elf_details_test.js | 2799 B | автотест: character elf details test |
| №1083 tests/character_external_anatomy_test.js | 7946 B | автотест: character external anatomy test |
| №1084 tests/character_fur_test.js | 3537 B | автотест: character fur test |
| №1085 tests/character_ghost_geometry_test.js | 3875 B | автотест: character ghost geometry test |
| №1086 tests/character_hair_pack_test.js | 2852 B | автотест: character hair pack test |
| №1087 tests/character_head_geometry_test.js | 3581 B | автотест: character head geometry test |
| №1088 tests/character_male_anatomy_fix_test.js | 3909 B | автотест: character male anatomy fix test |
| №1089 tests/character_native_limbs_test.js | 4926 B | автотест: character native limbs test |
| №1090 tests/character_parasites_geometry_test.js | 3742 B | автотест: character parasites geometry test |
| №1091 tests/character_races_geometry_test.js | 19713 B | автотест: character races geometry test |
| №1092 tests/character_reptile_heads_test.js | 3747 B | автотест: character reptile heads test |
| №1093 tests/character_skin_material_test.js | 3831 B | автотест: character skin material test |
| №1094 tests/character_stat_modes_levelup_test.cjs | 4960 B | автотест: character stat modes levelup test |
| №1095 tests/character_swarm_geometry_test.js | 3517 B | автотест: character swarm geometry test |
| №1096 tests/character_tiefling_details_test.js | 4472 B | автотест: character tiefling details test |
| №1097 tests/cloud_rls_test.sql | 5425 B | автотест: cloud rls test |
| №1098 tests/cloud_sql_concurrency.cjs | 2095 B | автотест: cloud sql concurrency |
| №1099 tests/cloud_sync_test.cjs | 20071 B | автотест: cloud sync test |
| №1100 tests/crafting_disassembly_v51_test.js | 3075 B | автотест: crafting disassembly v51 test |
| №1101 tests/crafting_dlc_v50_test.js | 2704 B | автотест: crafting dlc v50 test |
| №1102 tests/crafting_economy_v49_test.js | 1999 B | автотест: crafting economy v49 test |
| №1103 tests/creation_signature_asset_test.cjs | 3966 B | автотест: creation signature asset test |
| №1104 tests/desktop_update_contract.cjs | 4107 B | автотест: desktop update contract |
| №1105 tests/fixtures/cloud_auth.sql | 724 B | автотест: cloud auth |
| №1106 tests/fixtures/female_anatomy_74_00_59.json | 256 B | автотест: female anatomy 74 00 59 |
| №1107 tests/generate_makehuman_glb_morph_fixture.js | 4558 B | автотест: generate makehuman glb morph fixture |
| №1108 tests/gltf_loader_smoke.cjs | 3765 B | автотест: gltf loader smoke |
| №1109 tests/helpers/class_runtime_harness.js | 2336 B | автотест: class runtime harness |
| №1110 tests/human_base_glb_audit.js | 2170 B | автотест: human base glb audit |
| №1111 tests/imported_3d_editor_assets.cjs | 2187 B | автотест: imported 3d editor assets |
| №1112 tests/makehuman_gender_fixture_audit.js | 4683 B | автотест: makehuman gender fixture audit |
| №1113 tests/makehuman_gender_recipe_test.js | 5535 B | автотест: makehuman gender recipe test |
| №1114 tests/makehuman_glb_morph_fixture_audit.js | 1716 B | автотест: makehuman glb morph fixture audit |
| №1115 tests/makehuman_morph_bridge.js | 9866 B | автотест: makehuman morph bridge |
| №1116 tests/makehuman_surface_mapping_audit.js | 9671 B | автотест: makehuman surface mapping audit |
| №1117 tests/makehuman_target_reverse_transfer_audit.js | 11151 B | автотест: makehuman target reverse transfer audit |
| №1118 tests/makehuman_target_surface_transfer_audit.js | 12557 B | автотест: makehuman target surface transfer audit |
| №1119 tests/makehuman_topology_audit.js | 6060 B | автотест: makehuman topology audit |
| №1120 tests/makehuman_uv_bridge_test.js | 1479 B | автотест: makehuman uv bridge test |
| №1121 tests/makehuman_vertex_mapping_audit.js | 7604 B | автотест: makehuman vertex mapping audit |
| №1122 tests/map_editor_dom_test.js | 3349 B | автотест: map editor dom test |
| №1123 tests/map_rebuild_world_test.js | 3822 B | автотест: map rebuild world test |
| №1124 tests/predictor_aura_ledger_test.cjs | 12844 B | автотест: predictor aura ledger test |
| №1125 tests/predictor_blind_test.cjs | 5016 B | автотест: predictor blind test |
| №1126 tests/predictor_cards_test.cjs | 10824 B | автотест: predictor cards test |
| №1127 tests/predictor_cloud_sync_test.cjs | 36466 B | автотест: predictor cloud sync test |
| №1128 tests/predictor_coin_ancestor_test.cjs | 6752 B | автотест: predictor coin ancestor test |
| №1129 tests/predictor_deck_ui_test.cjs | 29110 B | автотест: predictor deck ui test |
| №1130 tests/predictor_devil_plan_test.cjs | 4693 B | автотест: predictor devil plan test |
| №1131 tests/predictor_event_reactions_test.cjs | 7281 B | автотест: predictor event reactions test |
| №1132 tests/predictor_exhaustion_test.cjs | 4882 B | автотест: predictor exhaustion test |
| №1133 tests/predictor_healing_reaction_test.cjs | 5065 B | автотест: predictor healing reaction test |
| №1134 tests/predictor_inventory_rewards_test.cjs | 14146 B | автотест: predictor inventory rewards test |
| №1135 tests/predictor_last_stand_test.cjs | 12317 B | автотест: predictor last stand test |
| №1136 tests/predictor_mage_spells_test.cjs | 30059 B | автотест: predictor mage spells test |
| №1137 tests/predictor_motion_cards_test.cjs | 11721 B | автотест: predictor motion cards test |
| №1138 tests/predictor_movement_cards_test.cjs | 7216 B | автотест: predictor movement cards test |
| №1139 tests/predictor_progression_test.cjs | 3788 B | автотест: predictor progression test |
| №1140 tests/predictor_runtime_test.cjs | 10670 B | автотест: predictor runtime test |
| №1141 tests/predictor_seven_cups_test.cjs | 12756 B | автотест: predictor seven cups test |
| №1142 tests/predictor_status_cards_test.cjs | 14018 B | автотест: predictor status cards test |
| №1143 tests/predictor_tactics_cards_test.cjs | 11394 B | автотест: predictor tactics cards test |
| №1144 tests/predictor_trickster_test.cjs | 10629 B | автотест: predictor trickster test |
| №1145 tests/predictor_turn_effects_test.cjs | 13350 B | автотест: predictor turn effects test |
| №1146 tests/predictor_vision_control_test.cjs | 12955 B | автотест: predictor vision control test |
| №1147 tests/predictor_world_truth_search_test.cjs | 5669 B | автотест: predictor world truth search test |
| №1148 tests/pugilist_combat_test.js | 21277 B | автотест: pugilist combat test |
| №1149 tests/pugilist_runtime_test.js | 4882 B | автотест: pugilist runtime test |
| №1150 tests/stair_navigation.cjs | 2571 B | автотест: stair navigation |
| №1151 tests/test_blood_hunter_completion.js | 8716 B | автотест: test blood hunter completion |
| №1152 tests/test_blood_hunter_focus_network.js | 3232 B | автотест: test blood hunter focus network |
| №1153 tests/test_blood_hunter_orders.js | 9856 B | автотест: test blood hunter orders |
| №1154 tests/test_blood_hunter_patron_selection.js | 4770 B | автотест: test blood hunter patron selection |
| №1155 tests/test_blood_hunter_profane_focus.js | 6535 B | автотест: test blood hunter profane focus |
| №1156 tests/test_class_audit_runtime.js | 14688 B | автотест: test class audit runtime |
| №1157 tests/test_class_audit_stage2_runtime.js | 15541 B | автотест: test class audit stage2 runtime |
| №1158 tests/test_class_audit_stage3_runtime.js | 16757 B | автотест: test class audit stage3 runtime |
| №1159 tests/test_class_audit_stage4_runtime.js | 24035 B | автотест: test class audit stage4 runtime |
| №1160 tests/test_v52.js | 2219 B | автотест: test v52 |
| №1161 tests/test_v53.js | 2533 B | автотест: test v53 |
| №1162 tests/test_v54.js | 2171 B | автотест: test v54 |
| №1163 tests/test_v55_2.js | 4186 B | автотест: test v55 2 |
| №1164 tests/test_v55_3.js | 2654 B | автотест: test v55 3 |
| №1165 tests/test_v55.js | 2159 B | автотест: test v55 |
| №1166 tests/test_v56_1.js | 1692 B | автотест: test v56 1 |
| №1167 tests/test_v56_10.js | 2157 B | автотест: test v56 10 |
| №1168 tests/test_v56_11.js | 1807 B | автотест: test v56 11 |
| №1169 tests/test_v56_12.js | 1675 B | автотест: test v56 12 |
| №1170 tests/test_v56_13.js | 2497 B | автотест: test v56 13 |
| №1171 tests/test_v56_2.js | 1714 B | автотест: test v56 2 |
| №1172 tests/test_v56_3.js | 1376 B | автотест: test v56 3 |
| №1173 tests/test_v56_4.js | 1471 B | автотест: test v56 4 |
| №1174 tests/test_v56_5.js | 1762 B | автотест: test v56 5 |
| №1175 tests/test_v56_6.js | 1452 B | автотест: test v56 6 |
| №1176 tests/test_v56_8.js | 1528 B | автотест: test v56 8 |
| №1177 tests/test_v56_9.js | 1749 B | автотест: test v56 9 |
| №1178 tests/test_v56.js | 3599 B | автотест: test v56 |
| №1179 tests/test_v57.js | 2576 B | автотест: test v57 |
| №1180 tests/test_v58.js | 1861 B | автотест: test v58 |
| №1181 tests/test_v59.js | 894 B | автотест: test v59 |
| №1182 tests/test_v60.js | 875 B | автотест: test v60 |
| №1183 tests/test_v61.js | 979 B | автотест: test v61 |
| №1184 tests/test_v62.js | 817 B | автотест: test v62 |
| №1185 tests/test_v63.js | 368 B | автотест: test v63 |
| №1186 tests/test_v64.js | 315 B | автотест: test v64 |
| №1187 tests/test_v65.js | 338 B | автотест: test v65 |
| №1188 tests/test_v66.js | 376 B | автотест: test v66 |
| №1189 tests/test_v67.js | 639 B | автотест: test v67 |
| №1190 tests/test_v68.js | 993 B | автотест: test v68 |
| №1191 tests/test_v69.js | 1722 B | автотест: test v69 |
| №1192 tests/test_v70.js | 2123 B | автотест: test v70 |
| №1193 tests/test_v701.js | 2435 B | автотест: test v701 |
| №1194 tests/test_v702.js | 4419 B | автотест: test v702 |
| №1195 tests/test_v703.js | 2656 B | автотест: test v703 |
| №1196 tests/test_v704.js | 2412 B | автотест: test v704 |
| №1197 tests/test_v705.js | 2727 B | автотест: test v705 |
| №1198 tests/test_v706.js | 1427 B | автотест: test v706 |
| №1199 tests/test_v707.js | 1083 B | автотест: test v707 |
| №1200 tests/test_v708_fixes.js | 3024 B | автотест: test v708 fixes |
| №1201 tests/test_v709_fixes.js | 2158 B | автотест: test v709 fixes |
| №1202 tests/test_v710_fixes.js | 2243 B | автотест: test v710 fixes |
| №1203 tests/test_v711_fixes.js | 1051 B | автотест: test v711 fixes |
| №1204 tests/test_v712_fixes.js | 1691 B | автотест: test v712 fixes |
| №1205 tests/test_v713_fixes.js | 2149 B | автотест: test v713 fixes |
| №1206 tests/test_v714_fixes.js | 1748 B | автотест: test v714 fixes |
| №1207 tests/test_v715_fixes.js | 1833 B | автотест: test v715 fixes |
| №1208 tests/test_v716_fixes.js | 2002 B | автотест: test v716 fixes |
| №1209 tests/test_v717_fixes.js | 2667 B | автотест: test v717 fixes |
| №1210 tests/test_v718_fixes.js | 1014 B | автотест: test v718 fixes |
| №1211 tests/test_v719_fixes.js | 1169 B | автотест: test v719 fixes |
| №1212 tests/test_v720_fixes.js | 1632 B | автотест: test v720 fixes |
| №1213 tests/test_v721_fixes.js | 3558 B | автотест: test v721 fixes |
| №1214 tests/test_v722_fixes.js | 3542 B | автотест: test v722 fixes |
| №1215 tests/test_v723_fixes.js | 4824 B | автотест: test v723 fixes |
| №1216 tests/test_v724_fixes.js | 2350 B | автотест: test v724 fixes |
| №1217 tests/test_v725_fixes.js | 4052 B | автотест: test v725 fixes |
| №1218 tests/test_v726_fixes.js | 3873 B | автотест: test v726 fixes |
| №1219 tests/test_v727_fixes.js | 3078 B | автотест: test v727 fixes |
| №1220 tests/test_v728_fixes.js | 2659 B | автотест: test v728 fixes |
| №1221 tests/test_v729_fixes.js | 1384 B | автотест: test v729 fixes |
| №1222 tests/test_v730_fixes.js | 2206 B | автотест: test v730 fixes |
| №1223 tests/test_v731_fixes.js | 1677 B | автотест: test v731 fixes |
| №1224 tests/test_v732_fixes.js | 2831 B | автотест: test v732 fixes |
| №1225 tests/test_v733_logic_audit.js | 2304 B | автотест: test v733 logic audit |
| №1226 tests/test_v734_network_concentration.js | 1540 B | автотест: test v734 network concentration |
| №1227 tests/test_v735_logic_rules.js | 1905 B | автотест: test v735 logic rules |
| №1228 tests/test_v736_deep_rules.js | 4379 B | автотест: test v736 deep rules |
| №1229 tests/test_v737_spellcasting_transaction.js | 5348 B | автотест: test v737 spellcasting transaction |
| №1230 tests/test_v738_multiclass_spell_sources.js | 5459 B | автотест: test v738 multiclass spell sources |
| №1231 tests/test_v739_prepared_transaction.js | 4356 B | автотест: test v739 prepared transaction |
| №1232 tests/test_v740_concentration_lifecycle.js | 2156 B | автотест: test v740 concentration lifecycle |
| №1233 tests/test_v741_damage_pipeline.js | 2473 B | автотест: test v741 damage pipeline |
| №1234 tests/test_v742_character_combatant_sync.js | 3581 B | автотест: test v742 character combatant sync |
| №1235 tests/test_v743_authority_recharge_events.js | 2257 B | автотест: test v743 authority recharge events |
| №1236 tests/test_v744_sync_authority_save.js | 2546 B | автотест: test v744 sync authority save |
| №1237 tests/test_v745_host_handoff.js | 2137 B | автотест: test v745 host handoff |
| №1238 tests/test_v746_authoritative_save_recharge.js | 3061 B | автотест: test v746 authoritative save recharge |
| №1239 tests/test_v747_event_race_compaction.js | 3091 B | автотест: test v747 event race compaction |
| №1240 tests/test_v748_full_combat_transaction.js | 5255 B | автотест: test v748 full combat transaction |
| №1241 tests/test_v749_monster_authority_reaction_order.js | 2676 B | автотест: test v749 monster authority reaction order |
| №1242 tests/test_v750_resignal_reaction_monster_rpc.js | 1986 B | автотест: test v750 resignal reaction monster rpc |
| №1243 tests/test_v751_authoritative_replay_rollback.js | 1200 B | автотест: test v751 authoritative replay rollback |
| №1244 tests/test_v752_replay_hash_authority.js | 2045 B | автотест: test v752 replay hash authority |
| №1245 tests/test_v753_replay_transaction_rng.js | 1204 B | автотест: test v753 replay transaction rng |
| №1246 tests/test_v754_update_manager.js | 2844 B | автотест: test v754 update manager |
| №1247 tests/test_v755_creation_buckets.js | 4009 B | автотест: test v755 creation buckets |
| №1248 tests/test_v755_update_scene.js | 3668 B | автотест: test v755 update scene |
| №1249 tests/update_ota_flow_test.js | 9750 B | автотест: update ota flow test |
| №1250 tools/ai_automation.cjs | 2424 B | скрипт разработчика: ai automation |
| №1251 tools/ai_checks.cjs | 1087 B | скрипт разработчика: ai checks |
| №1252 tools/ai_finalize.cjs | 2222 B | скрипт разработчика: ai finalize |
| №1253 tools/audit_adult_body_assets.py | 5979 B | скрипт разработчика: audit adult body assets |
| №1254 tools/build_character_editor_morphs.js | 4528 B | скрипт разработчика: build character editor morphs |
| №1255 tools/build_cloud_tests.sh | 1966 B | скрипт разработчика: build cloud tests |
| №1256 tools/build_makehuman_morphs.js | 8855 B | скрипт разработчика: build makehuman morphs |
| №1257 tools/build_skin_microtexture.py | 1281 B | скрипт разработчика: build skin microtexture |
| №1258 tools/build_update_manifest.py | 3974 B | скрипт разработчика: build update manifest |
| №1259 tools/check_adult_anatomy_browser.js | 7888 B | скрипт разработчика: check adult anatomy browser |
| №1260 tools/check_adult_base_browser.js | 4744 B | скрипт разработчика: check adult base browser |
| №1261 tools/check_animal_heads_browser.js | 6065 B | скрипт разработчика: check animal heads browser |
| №1262 tools/check_avian_elephant_heads_browser.js | 6072 B | скрипт разработчика: check avian elephant heads browser |
| №1263 tools/check_avian_races_browser.js | 6205 B | скрипт разработчика: check avian races browser |
| №1264 tools/check_character_clothing_closeups.js | 3950 B | скрипт разработчика: check character clothing closeups |
| №1265 tools/check_character_clothing_customizer.js | 8623 B | скрипт разработчика: check character clothing customizer |
| №1266 tools/check_character_dress_customizer.js | 4900 B | скрипт разработчика: check character dress customizer |
| №1267 tools/check_character_editor_browser.js | 24525 B | скрипт разработчика: check character editor browser |
| №1268 tools/check_character_head_browser.js | 7179 B | скрипт разработчика: check character head browser |
| №1269 tools/check_character_races_browser.js | 14783 B | скрипт разработчика: check character races browser |
| №1270 tools/check_cloud_account_browser.cjs | 7125 B | скрипт разработчика: check cloud account browser |
| №1271 tools/check_dense_swarm_browser.js | 6320 B | скрипт разработчика: check dense swarm browser |
| №1272 tools/check_elf_details_browser.js | 5810 B | скрипт разработчика: check elf details browser |
| №1273 tools/check_external_anatomy_browser.js | 9994 B | скрипт разработчика: check external anatomy browser |
| №1274 tools/check_feather_surface_browser.js | 8923 B | скрипт разработчика: check feather surface browser |
| №1275 tools/check_fur_browser.js | 6080 B | скрипт разработчика: check fur browser |
| №1276 tools/check_fur_surface_browser.js | 9010 B | скрипт разработчика: check fur surface browser |
| №1277 tools/check_ghost_browser.js | 9006 B | скрипт разработчика: check ghost browser |
| №1278 tools/check_hair_pack_browser.js | 5844 B | скрипт разработчика: check hair pack browser |
| №1279 tools/check_kobold_tabaxi_browser.js | 6250 B | скрипт разработчика: check kobold tabaxi browser |
| №1280 tools/check_last_races_browser.js | 7467 B | скрипт разработчика: check last races browser |
| №1281 tools/check_male_anatomy_browser.js | 6098 B | скрипт разработчика: check male anatomy browser |
| №1282 tools/check_map_browser.js | 3807 B | скрипт разработчика: check map browser |
| №1283 tools/check_mechanical_races_browser.js | 6168 B | скрипт разработчика: check mechanical races browser |
| №1284 tools/check_modular_races_browser.js | 5836 B | скрипт разработчика: check modular races browser |
| №1285 tools/check_native_limbs_browser.js | 7168 B | скрипт разработчика: check native limbs browser |
| №1286 tools/check_parasites_browser.js | 6601 B | скрипт разработчика: check parasites browser |
| №1287 tools/check_pose_browser.js | 7107 B | скрипт разработчика: check pose browser |
| №1288 tools/check_quartet_races_browser.js | 6716 B | скрипт разработчика: check quartet races browser |
| №1289 tools/check_reptile_heads_browser.js | 5356 B | скрипт разработчика: check reptile heads browser |
| №1290 tools/check_reptile_races_browser.js | 5791 B | скрипт разработчика: check reptile races browser |
| №1291 tools/check_reptile_surface_browser.js | 7141 B | скрипт разработчика: check reptile surface browser |
| №1292 tools/check_skin_material_browser.js | 11043 B | скрипт разработчика: check skin material browser |
| №1293 tools/check_small_armor_browser.js | 3705 B | скрипт разработчика: check small armor browser |
| №1294 tools/check_swarm_browser.js | 7864 B | скрипт разработчика: check swarm browser |
| №1295 tools/check_tiefling_browser.js | 7285 B | скрипт разработчика: check tiefling browser |
| №1296 tools/check_tiefling_details_browser.js | 6717 B | скрипт разработчика: check tiefling details browser |
| №1297 tools/cloud_test.init.gradle | 794 B | скрипт разработчика: cloud test.init |
| №1298 tools/convert_remaining_furniture.py | 4375 B | скрипт разработчика: convert remaining furniture |
| №1299 tools/finalize_v741.py | 3303 B | скрипт разработчика: finalize v741 |
| №1300 tools/generate_project_atlas.cjs | 12859 B | автоматический генератор этого атласа |
| №1301 tools/install_native_build_tools.sh | 3014 B | скрипт разработчика: install native build tools |
| №1302 tools/makehuman_gender_channels.json | 4916 B | скрипт разработчика: makehuman gender channels |
| №1303 tools/makehuman_morph_channels.json | 454 B | скрипт разработчика: makehuman morph channels |
| №1304 tools/prepare_makehuman_gender.js | 5679 B | скрипт разработчика: prepare makehuman gender |
| №1305 tools/run_tests_v731.js | 5150 B | скрипт разработчика: run tests v731 |
| №1306 tools/sync_manifest.py | 2080 B | скрипт разработчика: sync manifest |
| №1307 tools/test_cloud_sql.sh | 1105 B | скрипт разработчика: test cloud sql |
| №1308 tools/unified_version.py | 3483 B | скрипт разработчика: unified version |
| №1309 unity/.gitattributes | 451 B | вспомогательный файл: .gitattributes |
| №1310 unity/.gitignore | 368 B | вспомогательный файл: .gitignore |
| №1311 unity/Assets/DefaultVolumeProfile.asset | 20474 B | вспомогательный файл: DefaultVolumeProfile |
| №1312 unity/Assets/DefaultVolumeProfile.asset.meta | 189 B | вспомогательный файл: DefaultVolumeProfile.asset |
| №1313 unity/Assets/LegacyContent.meta | 172 B | вспомогательный файл: LegacyContent |
| №1314 unity/Assets/LegacyContent/Catalog.asset | 9068 B | вспомогательный файл: Catalog |
| №1315 unity/Assets/LegacyContent/Catalog.asset.meta | 189 B | вспомогательный файл: Catalog.asset |
| №1316 unity/Assets/LegacyContent/geometry-contract.json | 2446 B | данные/конфигурация: geometry contract |
| №1317 unity/Assets/LegacyContent/geometry-contract.json.meta | 158 B | вспомогательный файл: geometry contract.json |
| №1318 unity/Assets/LegacyContent/Materials.meta | 172 B | вспомогательный файл: Materials |
| №1319 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat | 3851 B | вспомогательный файл: floor ceramic tile dark |
| №1320 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_dark.mat.meta | 188 B | вспомогательный файл: floor ceramic tile dark.mat |
| №1321 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat | 3852 B | вспомогательный файл: floor ceramic tile light |
| №1322 unity/Assets/LegacyContent/Materials/floor_ceramic_tile_light.mat.meta | 188 B | вспомогательный файл: floor ceramic tile light.mat |
| №1323 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat | 3846 B | вспомогательный файл: floor checker tile |
| №1324 unity/Assets/LegacyContent/Materials/floor_checker_tile.mat.meta | 188 B | вспомогательный файл: floor checker tile.mat |
| №1325 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat | 3845 B | вспомогательный файл: floor cobblestone |
| №1326 unity/Assets/LegacyContent/Materials/floor_cobblestone.mat.meta | 188 B | вспомогательный файл: floor cobblestone.mat |
| №1327 unity/Assets/LegacyContent/Materials/floor_earth.mat | 3838 B | вспомогательный файл: floor earth |
| №1328 unity/Assets/LegacyContent/Materials/floor_earth.mat.meta | 188 B | вспомогательный файл: floor earth.mat |
| №1329 unity/Assets/LegacyContent/Materials/floor_grass.mat | 3839 B | вспомогательный файл: floor grass |
| №1330 unity/Assets/LegacyContent/Materials/floor_grass.mat.meta | 188 B | вспомогательный файл: floor grass.mat |
| №1331 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat | 3841 B | вспомогательный файл: floor hex tile |
| №1332 unity/Assets/LegacyContent/Materials/floor_hex_tile.mat.meta | 188 B | вспомогательный файл: floor hex tile.mat |
| №1333 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat | 3844 B | вспомогательный файл: floor marble dark |
| №1334 unity/Assets/LegacyContent/Materials/floor_marble_dark.mat.meta | 188 B | вспомогательный файл: floor marble dark.mat |
| №1335 unity/Assets/LegacyContent/Materials/floor_marble_light.mat | 3846 B | вспомогательный файл: floor marble light |
| №1336 unity/Assets/LegacyContent/Materials/floor_marble_light.mat.meta | 188 B | вспомогательный файл: floor marble light.mat |
| №1337 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat | 3852 B | вспомогательный файл: floor parquet herringbone |
| №1338 unity/Assets/LegacyContent/Materials/floor_parquet_herringbone.mat.meta | 188 B | вспомогательный файл: floor parquet herringbone.mat |
| №1339 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat | 3841 B | вспомогательный файл: floor rug blue |
| №1340 unity/Assets/LegacyContent/Materials/floor_rug_blue.mat.meta | 188 B | вспомогательный файл: floor rug blue.mat |
| №1341 unity/Assets/LegacyContent/Materials/floor_rug_green.mat | 3842 B | вспомогательный файл: floor rug green |
| №1342 unity/Assets/LegacyContent/Materials/floor_rug_green.mat.meta | 188 B | вспомогательный файл: floor rug green.mat |
| №1343 unity/Assets/LegacyContent/Materials/floor_rug_red.mat | 3840 B | вспомогательный файл: floor rug red |
| №1344 unity/Assets/LegacyContent/Materials/floor_rug_red.mat.meta | 188 B | вспомогательный файл: floor rug red.mat |
| №1345 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat | 3848 B | вспомогательный файл: floor stone tile dark |
| №1346 unity/Assets/LegacyContent/Materials/floor_stone_tile_dark.mat.meta | 188 B | вспомогательный файл: floor stone tile dark.mat |
| №1347 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat | 3849 B | вспомогательный файл: floor stone tile light |
| №1348 unity/Assets/LegacyContent/Materials/floor_stone_tile_light.mat.meta | 188 B | вспомогательный файл: floor stone tile light.mat |
| №1349 unity/Assets/LegacyContent/Materials/floor_tatami.mat | 3840 B | вспомогательный файл: floor tatami |
| №1350 unity/Assets/LegacyContent/Materials/floor_tatami.mat.meta | 188 B | вспомогательный файл: floor tatami.mat |
| №1351 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat | 3842 B | вспомогательный файл: floor wood dark |
| №1352 unity/Assets/LegacyContent/Materials/floor_wood_dark.mat.meta | 188 B | вспомогательный файл: floor wood dark.mat |
| №1353 unity/Assets/LegacyContent/Materials/floor_wood_light.mat | 3897 B | вспомогательный файл: floor wood light |
| №1354 unity/Assets/LegacyContent/Materials/floor_wood_light.mat.meta | 188 B | вспомогательный файл: floor wood light.mat |
| №1355 unity/Assets/LegacyContent/Materials/wall_brick_red.mat | 3842 B | вспомогательный файл: wall brick red |
| №1356 unity/Assets/LegacyContent/Materials/wall_brick_red.mat.meta | 188 B | вспомогательный файл: wall brick red.mat |
| №1357 unity/Assets/LegacyContent/Materials/wall_concrete.mat | 3841 B | вспомогательный файл: wall concrete |
| №1358 unity/Assets/LegacyContent/Materials/wall_concrete.mat.meta | 188 B | вспомогательный файл: wall concrete.mat |
| №1359 unity/Assets/LegacyContent/Materials/wall_half_timber.mat | 3899 B | вспомогательный файл: wall half timber |
| №1360 unity/Assets/LegacyContent/Materials/wall_half_timber.mat.meta | 188 B | вспомогательный файл: wall half timber.mat |
| №1361 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat | 3843 B | вспомогательный файл: wall marble dark |
| №1362 unity/Assets/LegacyContent/Materials/wall_marble_dark.mat.meta | 188 B | вспомогательный файл: wall marble dark.mat |
| №1363 unity/Assets/LegacyContent/Materials/wall_marble_light.mat | 3845 B | вспомогательный файл: wall marble light |
| №1364 unity/Assets/LegacyContent/Materials/wall_marble_light.mat.meta | 188 B | вспомогательный файл: wall marble light.mat |
| №1365 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat | 3843 B | вспомогательный файл: wall moss stone |
| №1366 unity/Assets/LegacyContent/Materials/wall_moss_stone.mat.meta | 188 B | вспомогательный файл: wall moss stone.mat |
| №1367 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat | 3843 B | вспомогательный файл: wall old plaster |
| №1368 unity/Assets/LegacyContent/Materials/wall_old_plaster.mat.meta | 188 B | вспомогательный файл: wall old plaster.mat |
| №1369 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat | 3844 B | вспомогательный файл: wall plaster dark |
| №1370 unity/Assets/LegacyContent/Materials/wall_plaster_dark.mat.meta | 188 B | вспомогательный файл: wall plaster dark.mat |
| №1371 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat | 3846 B | вспомогательный файл: wall plaster light |
| №1372 unity/Assets/LegacyContent/Materials/wall_plaster_light.mat.meta | 188 B | вспомогательный файл: wall plaster light.mat |
| №1373 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat | 3846 B | вспомогательный файл: wall plaster panel |
| №1374 unity/Assets/LegacyContent/Materials/wall_plaster_panel.mat.meta | 188 B | вспомогательный файл: wall plaster panel.mat |
| №1375 unity/Assets/LegacyContent/Materials/wall_slate.mat | 3837 B | вспомогательный файл: wall slate |
| №1376 unity/Assets/LegacyContent/Materials/wall_slate.mat.meta | 188 B | вспомогательный файл: wall slate.mat |
| №1377 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat | 3842 B | вспомогательный файл: wall stone dark |
| №1378 unity/Assets/LegacyContent/Materials/wall_stone_dark.mat.meta | 188 B | вспомогательный файл: wall stone dark.mat |
| №1379 unity/Assets/LegacyContent/Materials/wall_stone_light.mat | 3843 B | вспомогательный файл: wall stone light |
| №1380 unity/Assets/LegacyContent/Materials/wall_stone_light.mat.meta | 188 B | вспомогательный файл: wall stone light.mat |
| №1381 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat | 3845 B | вспомогательный файл: wall stone masonry |
| №1382 unity/Assets/LegacyContent/Materials/wall_stone_masonry.mat.meta | 188 B | вспомогательный файл: wall stone masonry.mat |
| №1383 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat | 3841 B | вспомогательный файл: wall wallpaper |
| №1384 unity/Assets/LegacyContent/Materials/wall_wallpaper.mat.meta | 188 B | вспомогательный файл: wall wallpaper.mat |
| №1385 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat | 3845 B | вспомогательный файл: wall white plaster |
| №1386 unity/Assets/LegacyContent/Materials/wall_white_plaster.mat.meta | 188 B | вспомогательный файл: wall white plaster.mat |
| №1387 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat | 3841 B | вспомогательный файл: wall wood dark |
| №1388 unity/Assets/LegacyContent/Materials/wall_wood_dark.mat.meta | 188 B | вспомогательный файл: wall wood dark.mat |
| №1389 unity/Assets/LegacyContent/Materials/wall_wood_light.mat | 3843 B | вспомогательный файл: wall wood light |
| №1390 unity/Assets/LegacyContent/Materials/wall_wood_light.mat.meta | 188 B | вспомогательный файл: wall wood light.mat |
| №1391 unity/Assets/LegacyContent/provenance.json | 28556 B | данные/конфигурация: provenance |
| №1392 unity/Assets/LegacyContent/provenance.json.meta | 158 B | вспомогательный файл: provenance.json |
| №1393 unity/Assets/LegacyContent/Source.meta | 172 B | вспомогательный файл: Source |
| №1394 unity/Assets/LegacyContent/Source/app.meta | 172 B | вспомогательный файл: app |
| №1395 unity/Assets/LegacyContent/Source/app/assets.meta | 172 B | вспомогательный файл: assets |
| №1396 unity/Assets/LegacyContent/Source/app/assets/3d.meta | 172 B | вспомогательный файл: 3d |
| №1397 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius.meta | 172 B | вспомогательный файл: quaternius |
| №1398 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models.meta | 172 B | вспомогательный файл: models |
| №1399 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin | 27188 B | 3D модель/геометрия: Bag |
| №1400 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.bin.meta | 155 B | вспомогательный файл: Bag.bin |
| №1401 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf | 4614 B | 3D модель/геометрия: Bag |
| №1402 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bag.gltf.meta | 2193 B | вспомогательный файл: Bag.gltf |
| №1403 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin | 104600 B | 3D модель/геометрия: Barrel Apples |
| №1404 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.bin.meta | 155 B | вспомогательный файл: Barrel Apples.bin |
| №1405 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf | 6660 B | 3D модель/геометрия: Barrel Apples |
| №1406 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel_Apples.gltf.meta | 2849 B | вспомогательный файл: Barrel Apples.gltf |
| №1407 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin | 57144 B | 3D модель/геометрия: Barrel |
| №1408 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.bin.meta | 155 B | вспомогательный файл: Barrel.bin |
| №1409 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf | 4607 B | 3D модель/геометрия: Barrel |
| №1410 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Barrel.gltf.meta | 2199 B | вспомогательный файл: Barrel.gltf |
| №1411 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin | 77360 B | 3D модель/геометрия: Bed Twin1 |
| №1412 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.bin.meta | 155 B | вспомогательный файл: Bed Twin1.bin |
| №1413 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf | 6636 B | 3D модель/геометрия: Bed Twin1 |
| №1414 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bed_Twin1.gltf.meta | 2841 B | вспомогательный файл: Bed Twin1.gltf |
| №1415 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin | 19304 B | 3D модель/геометрия: Bench |
| №1416 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.bin.meta | 155 B | вспомогательный файл: Bench.bin |
| №1417 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf | 4594 B | 3D модель/геометрия: Bench |
| №1418 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bench.gltf.meta | 2197 B | вспомогательный файл: Bench.gltf |
| №1419 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin | 23956 B | 3D модель/геометрия: Book Stack 2 |
| №1420 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.bin.meta | 155 B | вспомогательный файл: Book Stack 2.bin |
| №1421 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf | 4605 B | 3D модель/геометрия: Book Stack 2 |
| №1422 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Book_Stack_2.gltf.meta | 2187 B | вспомогательный файл: Book Stack 2.gltf |
| №1423 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin | 92968 B | 3D модель/геометрия: Bookcase 2 |
| №1424 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.bin.meta | 155 B | вспомогательный файл: Bookcase 2.bin |
| №1425 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf | 4625 B | 3D модель/геометрия: Bookcase 2 |
| №1426 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bookcase_2.gltf.meta | 2207 B | вспомогательный файл: Bookcase 2.gltf |
| №1427 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin | 13952 B | 3D модель/геометрия: Bottle 1 |
| №1428 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.bin.meta | 155 B | вспомогательный файл: Bottle 1.bin |
| №1429 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf | 2586 B | 3D модель/геометрия: Bottle 1 |
| №1430 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Bottle_1.gltf.meta | 1543 B | вспомогательный файл: Bottle 1.gltf |
| №1431 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin | 6124 B | 3D модель/геометрия: Candle 2 |
| №1432 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.bin.meta | 155 B | вспомогательный файл: Candle 2.bin |
| №1433 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf | 2350 B | 3D модель/геометрия: Candle 2 |
| №1434 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Candle_2.gltf.meta | 1543 B | вспомогательный файл: Candle 2.gltf |
| №1435 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin | 74368 B | 3D модель/геометрия: CandleStick Triple |
| №1436 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.bin.meta | 155 B | вспомогательный файл: CandleStick Triple.bin |
| №1437 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf | 4168 B | 3D модель/геометрия: CandleStick Triple |
| №1438 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/CandleStick_Triple.gltf.meta | 2199 B | вспомогательный файл: CandleStick Triple.gltf |
| №1439 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin | 28096 B | 3D модель/геометрия: Chair 1 |
| №1440 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.bin.meta | 155 B | вспомогательный файл: Chair 1.bin |
| №1441 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf | 4608 B | 3D модель/геометрия: Chair 1 |
| №1442 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chair_1.gltf.meta | 2201 B | вспомогательный файл: Chair 1.gltf |
| №1443 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin | 15644 B | 3D модель/геометрия: Chalice |
| №1444 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.bin.meta | 155 B | вспомогательный файл: Chalice.bin |
| №1445 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf | 2356 B | 3D модель/геометрия: Chalice |
| №1446 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chalice.gltf.meta | 1541 B | вспомогательный файл: Chalice.gltf |
| №1447 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin | 266680 B | 3D модель/геометрия: Chandelier |
| №1448 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.bin.meta | 155 B | вспомогательный файл: Chandelier.bin |
| №1449 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf | 6678 B | 3D модель/геометрия: Chandelier |
| №1450 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chandelier.gltf.meta | 2843 B | вспомогательный файл: Chandelier.gltf |
| №1451 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin | 184356 B | 3D модель/геометрия: Chest Wood |
| №1452 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.bin.meta | 155 B | вспомогательный файл: Chest Wood.bin |
| №1453 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf | 18141 B | 3D модель/геометрия: Chest Wood |
| №1454 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes | 22924 B | вспомогательный файл: Chest Wood.gltf |
| №1455 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.bytes.meta | 158 B | вспомогательный файл: Chest Wood.gltf.bytes |
| №1456 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Chest_Wood.gltf.meta | 720 B | вспомогательный файл: Chest Wood.gltf |
| №1457 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin | 14464 B | 3D модель/геометрия: Coin |
| №1458 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.bin.meta | 155 B | вспомогательный файл: Coin.bin |
| №1459 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf | 2581 B | 3D модель/геометрия: Coin |
| №1460 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Coin.gltf.meta | 1535 B | вспомогательный файл: Coin.gltf |
| №1461 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin | 12488 B | 3D модель/геометрия: Mug |
| №1462 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.bin.meta | 155 B | вспомогательный файл: Mug.bin |
| №1463 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf | 4149 B | 3D модель/геометрия: Mug |
| №1464 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Mug.gltf.meta | 2193 B | вспомогательный файл: Mug.gltf |
| №1465 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin | 31580 B | 3D модель/геометрия: Pouch Large |
| №1466 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.bin.meta | 155 B | вспомогательный файл: Pouch Large.bin |
| №1467 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf | 4602 B | 3D модель/геометрия: Pouch Large |
| №1468 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Pouch_Large.gltf.meta | 2185 B | вспомогательный файл: Pouch Large.gltf |
| №1469 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin | 41624 B | 3D модель/геометрия: Rope 1 |
| №1470 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.bin.meta | 155 B | вспомогательный файл: Rope 1.bin |
| №1471 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf | 2382 B | 3D модель/геометрия: Rope 1 |
| №1472 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Rope_1.gltf.meta | 1563 B | вспомогательный файл: Rope 1.gltf |
| №1473 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin | 22016 B | 3D модель/геометрия: Shelf Simple |
| №1474 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.bin.meta | 155 B | вспомогательный файл: Shelf Simple.bin |
| №1475 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf | 2383 B | 3D модель/геометрия: Shelf Simple |
| №1476 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Shelf_Simple.gltf.meta | 1575 B | вспомогательный файл: Shelf Simple.gltf |
| №1477 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin | 11472 B | 3D модель/геометрия: Stool |
| №1478 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.bin.meta | 155 B | вспомогательный файл: Stool.bin |
| №1479 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf | 2596 B | 3D модель/геометрия: Stool |
| №1480 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Stool.gltf.meta | 1561 B | вспомогательный файл: Stool.gltf |
| №1481 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png | 1936754 B | текстура/изображение: T Trim Cloth BaseColor |
| №1482 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Cloth BaseColor.png |
| №1483 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png | 3920858 B | текстура/изображение: T Trim Cloth Normal |
| №1484 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Cloth Normal.png |
| №1485 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png | 623426 B | текстура/изображение: T Trim Cloth ORM |
| №1486 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Cloth_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Cloth ORM.png |
| №1487 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png | 2232961 B | текстура/изображение: T Trim Furniture BaseColor |
| №1488 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Furniture BaseColor.png |
| №1489 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png | 3485710 B | текстура/изображение: T Trim Furniture Normal |
| №1490 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Furniture Normal.png |
| №1491 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png | 2064585 B | текстура/изображение: T Trim Furniture ORM |
| №1492 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Furniture_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Furniture ORM.png |
| №1493 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png | 1361221 B | текстура/изображение: T Trim Metal BaseColor |
| №1494 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Metal BaseColor.png |
| №1495 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png | 3625541 B | текстура/изображение: T Trim Metal Normal |
| №1496 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Metal Normal.png |
| №1497 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png | 1871475 B | текстура/изображение: T Trim Metal ORM |
| №1498 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Metal_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Metal ORM.png |
| №1499 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png | 2263132 B | текстура/изображение: T Trim Props BaseColor |
| №1500 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_BaseColor.png.meta | 3009 B | вспомогательный файл: T Trim Props BaseColor.png |
| №1501 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png | 4441458 B | текстура/изображение: T Trim Props Normal |
| №1502 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_Normal.png.meta | 3009 B | вспомогательный файл: T Trim Props Normal.png |
| №1503 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png | 3017151 B | текстура/изображение: T Trim Props ORM |
| №1504 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/T_Trim_Props_ORM.png.meta | 3009 B | вспомогательный файл: T Trim Props ORM.png |
| №1505 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin | 4936 B | 3D модель/геометрия: Table Fork |
| №1506 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.bin.meta | 155 B | вспомогательный файл: Table Fork.bin |
| №1507 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf | 2348 B | 3D модель/геометрия: Table Fork |
| №1508 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Fork.gltf.meta | 1547 B | вспомогательный файл: Table Fork.gltf |
| №1509 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin | 2180 B | 3D модель/геометрия: Table Knife |
| №1510 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.bin.meta | 155 B | вспомогательный файл: Table Knife.bin |
| №1511 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf | 2345 B | 3D модель/геометрия: Table Knife |
| №1512 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Knife.gltf.meta | 1549 B | вспомогательный файл: Table Knife.gltf |
| №1513 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin | 56396 B | 3D модель/геометрия: Table Large |
| №1514 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.bin.meta | 155 B | вспомогательный файл: Table Large.bin |
| №1515 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf | 4612 B | 3D модель/геометрия: Table Large |
| №1516 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Large.gltf.meta | 2209 B | вспомогательный файл: Table Large.gltf |
| №1517 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin | 6792 B | 3D модель/геометрия: Table Plate |
| №1518 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.bin.meta | 155 B | вспомогательный файл: Table Plate.bin |
| №1519 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf | 2358 B | 3D модель/геометрия: Table Plate |
| №1520 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Plate.gltf.meta | 1549 B | вспомогательный файл: Table Plate.gltf |
| №1521 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin | 4856 B | 3D модель/геометрия: Table Spoon |
| №1522 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.bin.meta | 155 B | вспомогательный файл: Table Spoon.bin |
| №1523 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf | 2350 B | 3D модель/геометрия: Table Spoon |
| №1524 unity/Assets/LegacyContent/Source/app/assets/3d/quaternius/models/Table_Spoon.gltf.meta | 1549 B | вспомогательный файл: Table Spoon.gltf |
| №1525 unity/Assets/LegacyContent/Source/app/data.meta | 172 B | вспомогательный файл: data |
| №1526 unity/Assets/LegacyContent/Source/app/data/maps.meta | 172 B | вспомогательный файл: maps |
| №1527 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json | 177758 B | данные/конфигурация: 3d castle black rose v740030 |
| №1528 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_black_rose_v740030.json.meta | 158 B | вспомогательный файл: 3d castle black rose v740030.json |
| №1529 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json | 107873 B | данные/конфигурация: 3d castle v740019 |
| №1530 unity/Assets/LegacyContent/Source/app/data/maps/3d_castle_v740019.json.meta | 158 B | вспомогательный файл: 3d castle v740019.json |
| №1531 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json | 22923 B | данные/конфигурация: 3d house v740019 |
| №1532 unity/Assets/LegacyContent/Source/app/data/maps/3d_house_v740019.json.meta | 158 B | вспомогательный файл: 3d house v740019.json |
| №1533 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json | 170566 B | данные/конфигурация: 3d stress test all |
| №1534 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_test_all.json.meta | 158 B | вспомогательный файл: 3d stress test all.json |
| №1535 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json | 506389 B | данные/конфигурация: 3d stress v740026 |
| №1536 unity/Assets/LegacyContent/Source/app/data/maps/3d_stress_v740026.json.meta | 158 B | вспомогательный файл: 3d stress v740026.json |
| №1537 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json | 32583 B | данные/конфигурация: 3d tavern v740019 |
| №1538 unity/Assets/LegacyContent/Source/app/data/maps/3d_tavern_v740019.json.meta | 158 B | вспомогательный файл: 3d tavern v740019.json |
| №1539 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json | 20092 B | данные/конфигурация: 3d test dungeon |
| №1540 unity/Assets/LegacyContent/Source/app/data/maps/3d_test_dungeon.json.meta | 158 B | вспомогательный файл: 3d test dungeon.json |
| №1541 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json | 78781 B | данные/конфигурация: 3d town v740019 |
| №1542 unity/Assets/LegacyContent/Source/app/data/maps/3d_town_v740019.json.meta | 158 B | вспомогательный файл: 3d town v740019.json |
| №1543 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json | 39834 B | данные/конфигурация: 3d village v740019 |
| №1544 unity/Assets/LegacyContent/Source/app/data/maps/3d_village_v740019.json.meta | 158 B | вспомогательный файл: 3d village v740019.json |
| №1545 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png | 83469 B | текстура/изображение: floor ceramic tile dark |
| №1546 unity/Assets/LegacyContent/Source/floor_ceramic_tile_dark.png.meta | 3009 B | вспомогательный файл: floor ceramic tile dark.png |
| №1547 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png | 94086 B | текстура/изображение: floor ceramic tile light |
| №1548 unity/Assets/LegacyContent/Source/floor_ceramic_tile_light.png.meta | 3009 B | вспомогательный файл: floor ceramic tile light.png |
| №1549 unity/Assets/LegacyContent/Source/floor_checker_tile.png | 84123 B | текстура/изображение: floor checker tile |
| №1550 unity/Assets/LegacyContent/Source/floor_checker_tile.png.meta | 3009 B | вспомогательный файл: floor checker tile.png |
| №1551 unity/Assets/LegacyContent/Source/floor_cobblestone.png | 128808 B | текстура/изображение: floor cobblestone |
| №1552 unity/Assets/LegacyContent/Source/floor_cobblestone.png.meta | 3009 B | вспомогательный файл: floor cobblestone.png |
| №1553 unity/Assets/LegacyContent/Source/floor_earth.png | 110714 B | текстура/изображение: floor earth |
| №1554 unity/Assets/LegacyContent/Source/floor_earth.png.meta | 3009 B | вспомогательный файл: floor earth.png |
| №1555 unity/Assets/LegacyContent/Source/floor_grass.png | 124328 B | текстура/изображение: floor grass |
| №1556 unity/Assets/LegacyContent/Source/floor_grass.png.meta | 3009 B | вспомогательный файл: floor grass.png |
| №1557 unity/Assets/LegacyContent/Source/floor_hex_tile.png | 122290 B | текстура/изображение: floor hex tile |
| №1558 unity/Assets/LegacyContent/Source/floor_hex_tile.png.meta | 3009 B | вспомогательный файл: floor hex tile.png |
| №1559 unity/Assets/LegacyContent/Source/floor_marble_dark.png | 111428 B | текстура/изображение: floor marble dark |
| №1560 unity/Assets/LegacyContent/Source/floor_marble_dark.png.meta | 3009 B | вспомогательный файл: floor marble dark.png |
| №1561 unity/Assets/LegacyContent/Source/floor_marble_light.png | 88698 B | текстура/изображение: floor marble light |
| №1562 unity/Assets/LegacyContent/Source/floor_marble_light.png.meta | 3009 B | вспомогательный файл: floor marble light.png |
| №1563 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png | 126070 B | текстура/изображение: floor parquet herringbone |
| №1564 unity/Assets/LegacyContent/Source/floor_parquet_herringbone.png.meta | 3009 B | вспомогательный файл: floor parquet herringbone.png |
| №1565 unity/Assets/LegacyContent/Source/floor_rug_blue.png | 118109 B | текстура/изображение: floor rug blue |
| №1566 unity/Assets/LegacyContent/Source/floor_rug_blue.png.meta | 3009 B | вспомогательный файл: floor rug blue.png |
| №1567 unity/Assets/LegacyContent/Source/floor_rug_green.png | 113771 B | текстура/изображение: floor rug green |
| №1568 unity/Assets/LegacyContent/Source/floor_rug_green.png.meta | 3009 B | вспомогательный файл: floor rug green.png |
| №1569 unity/Assets/LegacyContent/Source/floor_rug_red.png | 117912 B | текстура/изображение: floor rug red |
| №1570 unity/Assets/LegacyContent/Source/floor_rug_red.png.meta | 3009 B | вспомогательный файл: floor rug red.png |
| №1571 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png | 91828 B | текстура/изображение: floor stone tile dark |
| №1572 unity/Assets/LegacyContent/Source/floor_stone_tile_dark.png.meta | 3009 B | вспомогательный файл: floor stone tile dark.png |
| №1573 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png | 101714 B | текстура/изображение: floor stone tile light |
| №1574 unity/Assets/LegacyContent/Source/floor_stone_tile_light.png.meta | 3009 B | вспомогательный файл: floor stone tile light.png |
| №1575 unity/Assets/LegacyContent/Source/floor_tatami.png | 91917 B | текстура/изображение: floor tatami |
| №1576 unity/Assets/LegacyContent/Source/floor_tatami.png.meta | 3009 B | вспомогательный файл: floor tatami.png |
| №1577 unity/Assets/LegacyContent/Source/floor_wood_dark.png | 76168 B | текстура/изображение: floor wood dark |
| №1578 unity/Assets/LegacyContent/Source/floor_wood_dark.png.meta | 3009 B | вспомогательный файл: floor wood dark.png |
| №1579 unity/Assets/LegacyContent/Source/floor_wood_light.png | 83659 B | текстура/изображение: floor wood light |
| №1580 unity/Assets/LegacyContent/Source/floor_wood_light.png.meta | 3009 B | вспомогательный файл: floor wood light.png |
| №1581 unity/Assets/LegacyContent/Source/wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1582 unity/Assets/LegacyContent/Source/wall_brick_red.png.meta | 3009 B | вспомогательный файл: wall brick red.png |
| №1583 unity/Assets/LegacyContent/Source/wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1584 unity/Assets/LegacyContent/Source/wall_concrete.png.meta | 3009 B | вспомогательный файл: wall concrete.png |
| №1585 unity/Assets/LegacyContent/Source/wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1586 unity/Assets/LegacyContent/Source/wall_half_timber.png.meta | 3009 B | вспомогательный файл: wall half timber.png |
| №1587 unity/Assets/LegacyContent/Source/wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1588 unity/Assets/LegacyContent/Source/wall_marble_dark.png.meta | 3009 B | вспомогательный файл: wall marble dark.png |
| №1589 unity/Assets/LegacyContent/Source/wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1590 unity/Assets/LegacyContent/Source/wall_marble_light.png.meta | 3009 B | вспомогательный файл: wall marble light.png |
| №1591 unity/Assets/LegacyContent/Source/wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1592 unity/Assets/LegacyContent/Source/wall_moss_stone.png.meta | 3009 B | вспомогательный файл: wall moss stone.png |
| №1593 unity/Assets/LegacyContent/Source/wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1594 unity/Assets/LegacyContent/Source/wall_old_plaster.png.meta | 3009 B | вспомогательный файл: wall old plaster.png |
| №1595 unity/Assets/LegacyContent/Source/wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1596 unity/Assets/LegacyContent/Source/wall_plaster_dark.png.meta | 3009 B | вспомогательный файл: wall plaster dark.png |
| №1597 unity/Assets/LegacyContent/Source/wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1598 unity/Assets/LegacyContent/Source/wall_plaster_light.png.meta | 3009 B | вспомогательный файл: wall plaster light.png |
| №1599 unity/Assets/LegacyContent/Source/wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1600 unity/Assets/LegacyContent/Source/wall_plaster_panel.png.meta | 3009 B | вспомогательный файл: wall plaster panel.png |
| №1601 unity/Assets/LegacyContent/Source/wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1602 unity/Assets/LegacyContent/Source/wall_slate.png.meta | 3009 B | вспомогательный файл: wall slate.png |
| №1603 unity/Assets/LegacyContent/Source/wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1604 unity/Assets/LegacyContent/Source/wall_stone_dark.png.meta | 3009 B | вспомогательный файл: wall stone dark.png |
| №1605 unity/Assets/LegacyContent/Source/wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1606 unity/Assets/LegacyContent/Source/wall_stone_light.png.meta | 3009 B | вспомогательный файл: wall stone light.png |
| №1607 unity/Assets/LegacyContent/Source/wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1608 unity/Assets/LegacyContent/Source/wall_stone_masonry.png.meta | 3009 B | вспомогательный файл: wall stone masonry.png |
| №1609 unity/Assets/LegacyContent/Source/wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1610 unity/Assets/LegacyContent/Source/wall_wallpaper.png.meta | 3009 B | вспомогательный файл: wall wallpaper.png |
| №1611 unity/Assets/LegacyContent/Source/wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1612 unity/Assets/LegacyContent/Source/wall_white_plaster.png.meta | 3009 B | вспомогательный файл: wall white plaster.png |
| №1613 unity/Assets/LegacyContent/Source/wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1614 unity/Assets/LegacyContent/Source/wall_wood_dark.png.meta | 3009 B | вспомогательный файл: wall wood dark.png |
| №1615 unity/Assets/LegacyContent/Source/wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1616 unity/Assets/LegacyContent/Source/wall_wood_light.png.meta | 3009 B | вспомогательный файл: wall wood light.png |
| №1617 unity/Assets/Plugins.meta | 172 B | вспомогательный файл: Plugins |
| №1618 unity/Assets/Plugins/Android.meta | 172 B | вспомогательный файл: Android |
| №1619 unity/Assets/Plugins/Android/UpdateProvider.java | 4306 B | вспомогательный файл: UpdateProvider |
| №1620 unity/Assets/Plugins/Android/UpdateProvider.java.meta | 62 B | вспомогательный файл: UpdateProvider.java |
| №1621 unity/Assets/UniversalRenderPipelineGlobalSettings.asset | 25900 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings |
| №1622 unity/Assets/UniversalRenderPipelineGlobalSettings.asset.meta | 189 B | вспомогательный файл: UniversalRenderPipelineGlobalSettings.asset |
| №1623 unity/Assets/Vtt.meta | 172 B | вспомогательный файл: Vtt |
| №1624 unity/Assets/Vtt/Editor.meta | 172 B | вспомогательный файл: Editor |
| №1625 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs | 19830 B | вспомогательный файл: CharacterSheetValidation |
| №1626 unity/Assets/Vtt/Editor/CharacterSheetValidation.cs.meta | 59 B | вспомогательный файл: CharacterSheetValidation.cs |
| №1627 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs | 10734 B | вспомогательный файл: LegacyMigrationSetup |
| №1628 unity/Assets/Vtt/Editor/LegacyMigrationSetup.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSetup.cs |
| №1629 unity/Assets/Vtt/Editor/PrototypeSetup.cs | 7704 B | вспомогательный файл: PrototypeSetup |
| №1630 unity/Assets/Vtt/Editor/PrototypeSetup.cs.meta | 59 B | вспомогательный файл: PrototypeSetup.cs |
| №1631 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs | 3794 B | вспомогательный файл: UnityReleaseBuild |
| №1632 unity/Assets/Vtt/Editor/UnityReleaseBuild.cs.meta | 62 B | вспомогательный файл: UnityReleaseBuild.cs |
| №1633 unity/Assets/Vtt/Resources.meta | 172 B | вспомогательный файл: Resources |
| №1634 unity/Assets/Vtt/Resources/CharacterSheet.meta | 172 B | вспомогательный файл: CharacterSheet |
| №1635 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json | 1259265 B | данные/конфигурация: catalog |
| №1636 unity/Assets/Vtt/Resources/CharacterSheet/catalog.json.meta | 158 B | вспомогательный файл: catalog.json |
| №1637 unity/Assets/Vtt/Runtime.meta | 172 B | вспомогательный файл: Runtime |
| №1638 unity/Assets/Vtt/Runtime/CharacterCreation.cs | 8399 B | вспомогательный файл: CharacterCreation |
| №1639 unity/Assets/Vtt/Runtime/CharacterCreation.cs.meta | 59 B | вспомогательный файл: CharacterCreation.cs |
| №1640 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs | 16128 B | вспомогательный файл: CharacterSheetRules |
| №1641 unity/Assets/Vtt/Runtime/CharacterSheetRules.cs.meta | 59 B | вспомогательный файл: CharacterSheetRules.cs |
| №1642 unity/Assets/Vtt/Runtime/ClientPreferences.cs | 3340 B | вспомогательный файл: ClientPreferences |
| №1643 unity/Assets/Vtt/Runtime/ClientPreferences.cs.meta | 59 B | вспомогательный файл: ClientPreferences.cs |
| №1644 unity/Assets/Vtt/Runtime/ExplorerController.cs | 5869 B | вспомогательный файл: ExplorerController |
| №1645 unity/Assets/Vtt/Runtime/ExplorerController.cs.meta | 59 B | вспомогательный файл: ExplorerController.cs |
| №1646 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs | 808 B | вспомогательный файл: LegacyContentCatalog |
| №1647 unity/Assets/Vtt/Runtime/LegacyContentCatalog.cs.meta | 59 B | вспомогательный файл: LegacyContentCatalog.cs |
| №1648 unity/Assets/Vtt/Runtime/LegacyDocuments.cs | 9096 B | вспомогательный файл: LegacyDocuments |
| №1649 unity/Assets/Vtt/Runtime/LegacyDocuments.cs.meta | 59 B | вспомогательный файл: LegacyDocuments.cs |
| №1650 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs | 11893 B | вспомогательный файл: LegacyMapPresenter |
| №1651 unity/Assets/Vtt/Runtime/LegacyMapPresenter.cs.meta | 59 B | вспомогательный файл: LegacyMapPresenter.cs |
| №1652 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs | 3065 B | вспомогательный файл: LegacyMigrationSmoke |
| №1653 unity/Assets/Vtt/Runtime/LegacyMigrationSmoke.cs.meta | 59 B | вспомогательный файл: LegacyMigrationSmoke.cs |
| №1654 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs | 6537 B | вспомогательный файл: LegacySessionPanel |
| №1655 unity/Assets/Vtt/Runtime/LegacySessionPanel.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.cs |
| №1656 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs | 22144 B | вспомогательный файл: LegacySessionPanel.FrontEnd |
| №1657 unity/Assets/Vtt/Runtime/LegacySessionPanel.FrontEnd.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.FrontEnd.cs |
| №1658 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs | 4646 B | вспомогательный файл: LegacySessionPanel.Settings |
| №1659 unity/Assets/Vtt/Runtime/LegacySessionPanel.Settings.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Settings.cs |
| №1660 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs | 28730 B | вспомогательный файл: LegacySessionPanel.Sheet |
| №1661 unity/Assets/Vtt/Runtime/LegacySessionPanel.Sheet.cs.meta | 59 B | вспомогательный файл: LegacySessionPanel.Sheet.cs |
| №1662 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs | 6627 B | вспомогательный файл: LegacySessionPanel.Updates |
| №1663 unity/Assets/Vtt/Runtime/LegacySessionPanel.Updates.cs.meta | 62 B | вспомогательный файл: LegacySessionPanel.Updates.cs |
| №1664 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs | 3139 B | вспомогательный файл: PrototypeSmoke |
| №1665 unity/Assets/Vtt/Runtime/PrototypeSmoke.cs.meta | 59 B | вспомогательный файл: PrototypeSmoke.cs |
| №1666 unity/Assets/Vtt/Runtime/UnityRelease.cs | 3872 B | вспомогательный файл: UnityRelease |
| №1667 unity/Assets/Vtt/Runtime/UnityRelease.cs.meta | 62 B | вспомогательный файл: UnityRelease.cs |
| №1668 unity/Assets/Vtt/Scenes.meta | 172 B | вспомогательный файл: Scenes |
| №1669 unity/Assets/Vtt/Scenes/Exploration.unity | 49176 B | вспомогательный файл: Exploration |
| №1670 unity/Assets/Vtt/Scenes/Exploration.unity.meta | 155 B | вспомогательный файл: Exploration.unity |
| №1671 unity/Assets/Vtt/Scenes/ImportedAdventure.unity | 2328750 B | вспомогательный файл: ImportedAdventure |
| №1672 unity/Assets/Vtt/Scenes/ImportedAdventure.unity.meta | 155 B | вспомогательный файл: ImportedAdventure.unity |
| №1673 unity/Assets/Vtt/Settings.meta | 172 B | вспомогательный файл: Settings |
| №1674 unity/Assets/Vtt/Settings/Explorer.mat | 3799 B | вспомогательный файл: Explorer |
| №1675 unity/Assets/Vtt/Settings/Explorer.mat.meta | 188 B | вспомогательный файл: Explorer.mat |
| №1676 unity/Assets/Vtt/Settings/ExplorerRenderer.asset | 1865 B | вспомогательный файл: ExplorerRenderer |
| №1677 unity/Assets/Vtt/Settings/ExplorerRenderer.asset.meta | 189 B | вспомогательный файл: ExplorerRenderer.asset |
| №1678 unity/Assets/Vtt/Settings/ExplorerURP.asset | 4690 B | вспомогательный файл: ExplorerURP |
| №1679 unity/Assets/Vtt/Settings/ExplorerURP.asset.meta | 189 B | вспомогательный файл: ExplorerURP.asset |
| №1680 unity/Assets/Vtt/Settings/Stone.mat | 3795 B | вспомогательный файл: Stone |
| №1681 unity/Assets/Vtt/Settings/Stone.mat.meta | 188 B | вспомогательный файл: Stone.mat |
| №1682 unity/Assets/Vtt/Settings/Wall.mat | 3793 B | вспомогательный файл: Wall |
| №1683 unity/Assets/Vtt/Settings/Wall.mat.meta | 188 B | вспомогательный файл: Wall.mat |
| №1684 unity/Assets/Vtt/Tests.meta | 172 B | вспомогательный файл: Tests |
| №1685 unity/Assets/Vtt/Tests/sheet-contract.json | 195912 B | данные/конфигурация: sheet contract |
| №1686 unity/Assets/Vtt/Tests/sheet-contract.json.meta | 158 B | вспомогательный файл: sheet contract.json |
| №1687 unity/ci/.gitignore | 14 B | вспомогательный файл: .gitignore |
| №1688 unity/ci/cloud_release.py | 12375 B | вспомогательный файл: cloud release |
| №1689 unity/ci/requirements.txt | 21 B | документация или отчёт: requirements |
| №1690 unity/ci/test_cloud_release.py | 5569 B | вспомогательный файл: test cloud release |
| №1691 unity/ci/transfer-signing-secrets.ps1 | 3402 B | вспомогательный файл: transfer signing secrets |
| №1692 unity/ci/windows-upgrade-qa.ps1 | 3801 B | вспомогательный файл: windows upgrade qa |
| №1693 unity/evidence/exploration.png | 119417 B | текстура/изображение: exploration |
| №1694 unity/Installer/release-notes.md | 1582 B | документация или отчёт: release notes |
| №1695 unity/Installer/UnitySetup.nsi | 3417 B | вспомогательный файл: UnitySetup |
| №1696 unity/Packages/manifest.json | 534 B | данные/конфигурация: manifest |
| №1697 unity/Packages/packages-lock.json | 6217 B | данные/конфигурация: packages lock |
| №1698 unity/ProjectSettings/AudioManager.asset | 523 B | вспомогательный файл: AudioManager |
| №1699 unity/ProjectSettings/ClusterInputManager.asset | 114 B | вспомогательный файл: ClusterInputManager |
| №1700 unity/ProjectSettings/DynamicsManager.asset | 1574 B | вспомогательный файл: DynamicsManager |
| №1701 unity/ProjectSettings/EditorBuildSettings.asset | 401 B | вспомогательный файл: EditorBuildSettings |
| №1702 unity/ProjectSettings/EditorSettings.asset | 1603 B | вспомогательный файл: EditorSettings |
| №1703 unity/ProjectSettings/GraphicsSettings.asset | 2615 B | вспомогательный файл: GraphicsSettings |
| №1704 unity/ProjectSettings/InputManager.asset | 9754 B | вспомогательный файл: InputManager |
| №1705 unity/ProjectSettings/MemorySettings.asset | 1226 B | вспомогательный файл: MemorySettings |
| №1706 unity/ProjectSettings/MultiplayerManager.asset | 232 B | вспомогательный файл: MultiplayerManager |
| №1707 unity/ProjectSettings/NavMeshAreas.asset | 1361 B | вспомогательный файл: NavMeshAreas |
| №1708 unity/ProjectSettings/Physics2DSettings.asset | 1862 B | вспомогательный файл: Physics2DSettings |
| №1709 unity/ProjectSettings/PresetManager.asset | 146 B | вспомогательный файл: PresetManager |
| №1710 unity/ProjectSettings/ProjectSettings.asset | 22468 B | вспомогательный файл: ProjectSettings |
| №1711 unity/ProjectSettings/ProjectVersion.txt | 85 B | документация или отчёт: ProjectVersion |
| №1712 unity/ProjectSettings/QualitySettings.asset | 9858 B | вспомогательный файл: QualitySettings |
| №1713 unity/ProjectSettings/SceneTemplateSettings.json | 3535 B | данные/конфигурация: SceneTemplateSettings |
| №1714 unity/ProjectSettings/ShaderGraphSettings.asset | 633 B | вспомогательный файл: ShaderGraphSettings |
| №1715 unity/ProjectSettings/TagManager.asset | 411 B | вспомогательный файл: TagManager |
| №1716 unity/ProjectSettings/TimeManager.asset | 305 B | вспомогательный файл: TimeManager |
| №1717 unity/ProjectSettings/UnityConnectSettings.asset | 1063 B | вспомогательный файл: UnityConnectSettings |
| №1718 unity/ProjectSettings/VersionControlSettings.asset | 172 B | вспомогательный файл: VersionControlSettings |
| №1719 unity/ProjectSettings/VFXManager.asset | 525 B | вспомогательный файл: VFXManager |
| №1720 unity/PUBLIC_DELIVERY.json | 973 B | данные/конфигурация: PUBLIC DELIVERY |
| №1721 unity/README.md | 9446 B | документация или отчёт: README |
| №1722 unity/release.ps1 | 7655 B | вспомогательный файл: release |
| №1723 unity/Tools/sync_character_sheet.cjs | 11570 B | логический модуль: sync character sheet |
| №1724 unity/Tools/sync_legacy_content.cjs | 5736 B | логический модуль: sync legacy content |
| №1725 unity/VALIDATION.md | 28732 B | документация или отчёт: VALIDATION |
| №1726 unity/verify.ps1 | 2774 B | вспомогательный файл: verify |
| №1727 updates/beta.json | 222 B | метаданные обновлений: beta |
| №1728 updates/previous-stable.json | 184759 B | метаданные обновлений: previous stable |
| №1729 updates/README.md | 243 B | документация или отчёт: README |
| №1730 updates/stable.json | 184760 B | метаданные обновлений: stable |
| №1731 updates/unity-experiment.json | 963 B | метаданные обновлений: unity experiment |
| №1732 vignette_v2_sprite.png | 1213593 B | текстура/изображение: vignette v2 sprite |
| №1733 VTT_PROJECT_MANIFEST_V70.json | 44371 B | устаревший список V70, не актуален |
| №1734 wall_brick_red.png | 111128 B | текстура/изображение: wall brick red |
| №1735 wall_concrete.png | 91074 B | текстура/изображение: wall concrete |
| №1736 wall_half_timber.png | 109537 B | текстура/изображение: wall half timber |
| №1737 wall_marble_dark.png | 123621 B | текстура/изображение: wall marble dark |
| №1738 wall_marble_light.png | 90457 B | текстура/изображение: wall marble light |
| №1739 wall_moss_stone.png | 128985 B | текстура/изображение: wall moss stone |
| №1740 wall_old_plaster.png | 107725 B | текстура/изображение: wall old plaster |
| №1741 wall_plaster_dark.png | 95153 B | текстура/изображение: wall plaster dark |
| №1742 wall_plaster_light.png | 91767 B | текстура/изображение: wall plaster light |
| №1743 wall_plaster_panel.png | 89722 B | текстура/изображение: wall plaster panel |
| №1744 wall_slate.png | 103822 B | текстура/изображение: wall slate |
| №1745 wall_stone_dark.png | 120617 B | текстура/изображение: wall stone dark |
| №1746 wall_stone_light.png | 127689 B | текстура/изображение: wall stone light |
| №1747 wall_stone_masonry.png | 129908 B | текстура/изображение: wall stone masonry |
| №1748 wall_wallpaper.png | 106442 B | текстура/изображение: wall wallpaper |
| №1749 wall_white_plaster.png | 120869 B | текстура/изображение: wall white plaster |
| №1750 wall_wood_dark.png | 81144 B | текстура/изображение: wall wood dark |
| №1751 wall_wood_light.png | 93079 B | текстура/изображение: wall wood light |
| №1752 wallpapers/1.png | 1460744 B | ассет графики/3D/интерфейса: 1 |
| №1753 wallpapers/10.png | 1667723 B | ассет графики/3D/интерфейса: 10 |
| №1754 wallpapers/11.png | 1815959 B | ассет графики/3D/интерфейса: 11 |
| №1755 wallpapers/12.png | 1548677 B | ассет графики/3D/интерфейса: 12 |
| №1756 wallpapers/13.png | 1599093 B | ассет графики/3D/интерфейса: 13 |
| №1757 wallpapers/14.png | 1596513 B | ассет графики/3D/интерфейса: 14 |
| №1758 wallpapers/15.png | 233043 B | ассет графики/3D/интерфейса: 15 |
| №1759 wallpapers/16.png | 212684 B | ассет графики/3D/интерфейса: 16 |
| №1760 wallpapers/17.png | 1585122 B | ассет графики/3D/интерфейса: 17 |
| №1761 wallpapers/18.png | 2095852 B | ассет графики/3D/интерфейса: 18 |
| №1762 wallpapers/19.png | 8605503 B | ассет графики/3D/интерфейса: 19 |
| №1763 wallpapers/2.png | 1590206 B | ассет графики/3D/интерфейса: 2 |
| №1764 wallpapers/20.png | 1284815 B | ассет графики/3D/интерфейса: 20 |
| №1765 wallpapers/21.png | 179307 B | ассет графики/3D/интерфейса: 21 |
| №1766 wallpapers/22.png | 344279 B | ассет графики/3D/интерфейса: 22 |
| №1767 wallpapers/23.png | 210291 B | ассет графики/3D/интерфейса: 23 |
| №1768 wallpapers/24.png | 141215 B | ассет графики/3D/интерфейса: 24 |
| №1769 wallpapers/25.png | 160892 B | ассет графики/3D/интерфейса: 25 |
| №1770 wallpapers/26.png | 187259 B | ассет графики/3D/интерфейса: 26 |
| №1771 wallpapers/27.png | 213194 B | ассет графики/3D/интерфейса: 27 |
| №1772 wallpapers/28.png | 202417 B | ассет графики/3D/интерфейса: 28 |
| №1773 wallpapers/29.png | 166942 B | ассет графики/3D/интерфейса: 29 |
| №1774 wallpapers/3.png | 1662340 B | ассет графики/3D/интерфейса: 3 |
| №1775 wallpapers/30.png | 237556 B | ассет графики/3D/интерфейса: 30 |
| №1776 wallpapers/31.svg | 1181 B | ассет графики/3D/интерфейса: 31 |
| №1777 wallpapers/32.svg | 1417 B | ассет графики/3D/интерфейса: 32 |
| №1778 wallpapers/4.png | 1816114 B | ассет графики/3D/интерфейса: 4 |
| №1779 wallpapers/5.png | 1742466 B | ассет графики/3D/интерфейса: 5 |
| №1780 wallpapers/6.png | 1591016 B | ассет графики/3D/интерфейса: 6 |
| №1781 wallpapers/7.png | 1815665 B | ассет графики/3D/интерфейса: 7 |
| №1782 wallpapers/8.png | 1492730 B | ассет графики/3D/интерфейса: 8 |
| №1783 wallpapers/9.png | 1715179 B | ассет графики/3D/интерфейса: 9 |

## Реестр имён, переменных и ключей

Имена сгруппированы по роли. Ссылка №NNNN указывает на путь в таблице файлов выше; остальные вхождения ищите в исходниках.
Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.


### JS объявления/параметры (4944)

| Имя | Исходные файлы |
|---|---|
| _ | №0053 (+ 11 других файлов) |
| __ls | №1193 (+ 4 других файлов) |
| __shifterProgression | №0828 |
| __TEST_SRC__ | №1193 (+ 4 других файлов) |
| _event | №0882 |
| _wc | №0881 |
| a | №0054 (+ 143 других файлов) |
| A | №0053 (+ 5 других файлов) |
| a0 | №1116 (+ 1 других файлов) |
| a1 | №1116 (+ 1 других файлов) |
| a2 | №1116 (+ 1 других файлов) |
| aa | №0056 (+ 1 других файлов) |
| ab | №0053 (+ 10 других файлов) |
| abilities | №0779 |
| ability | №0072 (+ 6 других файлов) |
| ABILITY | №0793 |
| abilityMod | №0774 |
| abName | №0649 |
| AbortController | №1099 |
| above | №0056 (+ 2 других файлов) |
| absent | №0663 |
| absolute | №1724 |
| absorbed | №0650 (+ 1 других файлов) |
| ac | №0056 (+ 25 других файлов) |
| ACADEMIES | №0867 |
| academy | №0771 (+ 1 других файлов) |
| academyEffects | №0774 |
| acBase | №0786 |
| acBaseInp | №0786 |
| acc | №0831 (+ 4 других файлов) |
| acCalcBaseSel | №0786 |
| ACCEPT | №0797 |
| access | №0665 (+ 1 других файлов) |
| accessors | №1115 (+ 4 других файлов) |
| accessory | №0058 |
| accIndex | №1107 |
| account | №0646 |
| ACCURSED_CURSE_FEATURES | №0774 |
| ACCURSED_CURSES | №0774 |
| ACCURSED_METAMORPHOSES | №0774 |
| acidAttack | №1068 |
| acInput | №0078 (+ 1 других файлов) |
| acInputEl | №0788 |
| across | №0056 |
| action | №0072 (+ 21 других файлов) |
| actionBtn | №0787 |
| actionHandler | №0805 |
| actionId | №0820 |
| actionIndex | №0833 |
| actionName | №0806 |
| actionResultsByPeer | №0805 |
| actions | №0073 (+ 6 других файлов) |
| ACTIONS | №0778 |
| actionSpent | №0650 |
| actionStr | №0785 |
| actionTokenId | №0620 |
| active | №0056 (+ 15 других файлов) |
| ACTIVE | №0777 |
| activeBonuses | №0788 |
| activeBtns | №0767 |
| activeCat | №0786 |
| activeCategory | №0788 (+ 1 других файлов) |
| activeClass | №0807 |
| activeColsWallet | №0785 |
| activeEffects | №0073 |
| activeFolder | №0807 |
| activeFolderId | №1723 |
| activeHero | №0827 (+ 1 других файлов) |
| activeId | №0813 |
| activeLvl | №0827 |
| activeNow | №0768 |
| activeStats | №0788 |
| activeTab | №0058 |
| activeWp | №0863 |
| actor | №0650 (+ 10 других файлов) |
| actorId | №0778 (+ 1 других файлов) |
| actors | №0636 |
| acts | №0628 (+ 7 других файлов) |
| actual | №0778 (+ 5 других файлов) |
| actualMode | №0650 |
| acVal | №0788 |
| ad | №0056 |
| add | №0784 (+ 3 других файлов) |
| addBtn | №0786 |
| added | №0708 (+ 2 других файлов) |
| addedLangs | №0641 |
| addedWeight | №0787 (+ 1 других файлов) |
| addExhaustion | №0820 |
| addGroup | №0668 |
| addToContainer | №0784 |
| addVal | №0775 |
| adj | №0800 |
| adjacent | №0053 |
| adjusted | №0800 |
| adr | №0828 (+ 1 других файлов) |
| adv | №0650 (+ 2 других файлов) |
| advice | №0814 |
| aether | №0636 |
| af | №0056 |
| affected | №0073 |
| affinity | №0643 (+ 1 других файлов) |
| after | №0650 (+ 8 других файлов) |
| afterBounds | №1091 |
| ag | №0774 (+ 1 других файлов) |
| again | №1132 |
| age | №0619 (+ 2 других файлов) |
| ageEl | №0619 (+ 1 других файлов) |
| ageInput | №0619 (+ 1 других файлов) |
| agents | №0627 |
| ah | №0056 (+ 1 других файлов) |
| ai | №0056 (+ 11 других файлов) |
| ailment | №0774 |
| aim | №0065 |
| aimed | №1122 |
| ain | №0056 (+ 1 других файлов) |
| al | №0056 |
| alchemistCombatant | №1067 |
| alchemistDebuffs | №0650 |
| alchemistFormula | №0650 |
| alchemistLevel | №0650 |
| alchemistState | №0650 |
| alchemistVariants | №0073 |
| alerts | №1723 |
| alias | №0695 (+ 2 других файлов) |
| ALIAS | №0765 |
| aliases | №0073 (+ 7 других файлов) |
| ALIASES | №0667 (+ 1 других файлов) |
| align | №1256 |
| all | №0058 (+ 5 других файлов) |
| ALL_RECIPES | №0667 |
| allBgs | №0619 |
| allCharacters | №0078 |
| allCreatureNames | №0801 |
| allCurses | №0774 |
| allElements | №0785 |
| allFeats | №0740 |
| allItems | №0788 |
| allow | №0815 |
| allowed | №0056 (+ 10 других файлов) |
| allowed2 | №0808 |
| allowMastery | №0774 |
| allPanels | №0817 (+ 1 других файлов) |
| allRaces | №0619 (+ 2 других файлов) |
| allRollsDetails | №0831 |
| allSources | №0740 |
| allSpells | №0831 |
| ally | №0073 (+ 5 других файлов) |
| allyState | №0073 |
| allyWilling | №0814 |
| allyX | №0814 |
| allyY | №0814 |
| alone | №1074 |
| already | №0774 (+ 1 других файлов) |
| alreadyHad | №0740 |
| alreadyHas | №0817 |
| alreadyHasSelectedClass | №0695 |
| alreadyHasSubclass | №0695 |
| alternates | №0076 |
| always | №0804 |
| am | №0068 (+ 3 других файлов) |
| am2 | №1219 |
| amap | №0774 |
| AMBIENCE_STATE_KEY | №0077 |
| ambienceShouldPlay | №0077 |
| ambienceStateLoaded | №0077 |
| AMBIENT_TRACKS | №0077 |
| amorist | №1068 |
| amount | №0056 (+ 24 других файлов) |
| amp | №0774 |
| amphibian | №1068 |
| amphibianMods | №1068 |
| amplified | №1224 |
| anatomy | №1070 |
| anchor | №0053 (+ 1 других файлов) |
| anchors | №0056 (+ 1 других файлов) |
| angle | №0053 (+ 6 других файлов) |
| angularIndex | №0053 |
| animal | №0056 |
| animalCfg | №0056 |
| animalParts | №0056 |
| animalSelect | №0058 |
| ankle | №0056 (+ 1 других файлов) |
| answered | №0806 |
| answers | №1129 (+ 1 других файлов) |
| ao | №0806 |
| ap | №0643 (+ 7 других файлов) |
| api | №0054 (+ 41 других файлов) |
| API | №0074 (+ 12 других файлов) |
| app | №0881 (+ 3 других файлов) |
| APP_FONTS | №0827 |
| APP_FRAME_COLORS | №0827 |
| APP_FRAME_STYLES | №0827 |
| APP_THEMES | №0827 |
| APP_VERSION | №0837 (+ 1 других файлов) |
| appearance | №0055 (+ 2 других файлов) |
| appearanceSource | №1099 |
| applicable | №0816 |
| applied | №0813 (+ 5 других файлов) |
| appliedBonusText | №0740 |
| applySkin | №0058 |
| approved | №1065 |
| approvedRules | №0816 |
| ar | №0643 (+ 4 других файлов) |
| arc | №0056 |
| arch | №0056 |
| archetypeFeatureIds | №0774 |
| area | №0056 (+ 2 других файлов) |
| arena | №1148 |
| arg | №0766 |
| args | №0766 (+ 6 других файлов) |
| arm | №0056 |
| armLine | №0056 |
| armor | №0661 (+ 4 других файлов) |
| armorCategories | №0786 |
| armored | №0824 |
| armorFields | №0786 |
| armorName | №0650 |
| armorObj | №0650 |
| armorOn | №0056 |
| arr | №0064 (+ 12 других файлов) |
| Array | №0658 (+ 23 других файлов) |
| ArrayBuffer | №1108 |
| arrays | №0667 |
| arrow | №0643 (+ 3 других файлов) |
| ARTIFICER_CLASSES | №0643 |
| ARTIFICER_KEY | №0822 |
| artisan | №1127 |
| artisanBack | №1127 |
| ASI | №0811 (+ 1 других файлов) |
| ASI_LEVELS | №0834 |
| asiContainer | №0695 |
| asiHtml | №0695 |
| asiLevels | №0773 |
| asiPrompt | №0695 |
| asMoney | №0813 |
| aspect | №0058 (+ 1 других файлов) |
| aspects | №0839 |
| ASPECTS | №0839 |
| assert | №1065 (+ 178 других файлов) |
| assertSource | №1104 |
| asset | №0054 (+ 30 других файлов) |
| assetId | №1111 |
| assets | №0071 |
| assetSet | №0066 |
| assigned | №0774 |
| at | №0054 (+ 16 других файлов) |
| atk | №0649 (+ 5 других файлов) |
| atkBonus | №0628 (+ 9 других файлов) |
| atkElem | №0649 (+ 1 других файлов) |
| atlas | №0057 |
| atob | №1071 (+ 21 других файлов) |
| aTok | №0650 |
| attachment | №0057 |
| attack | №0804 (+ 7 других файлов) |
| attacker | №0636 (+ 9 других файлов) |
| attackerBack | №0806 |
| attackerDebuffs | №0650 |
| attackerId | №0650 |
| attackerIdForStudy | №0650 |
| attackerSelect | №1129 |
| attackerState | №0650 |
| attackModifiers | №0804 |
| attackPayload | №0806 |
| attackRolls | №1159 |
| attacks | №0650 (+ 3 других файлов) |
| attempts | №0648 (+ 1 других файлов) |
| attributes | №1157 |
| aura | №0806 (+ 1 других файлов) |
| auraActive | №0643 |
| auraBack | №1127 |
| auraCha | №0643 |
| auraPC | №1127 |
| auraPhone | №1127 |
| auraRoster | №1127 |
| auraServer | №1127 |
| auraSource | №0643 |
| auth | №1098 |
| authoritativeAoe | №0806 |
| auto | №0806 |
| autoCloseTimer | №0792 |
| autoFail | №0650 |
| autoInterval | №0863 |
| automatic | №0636 |
| autoPlay | №0077 |
| autoResults | №0806 |
| autoRotateState | №0863 |
| autoRotateTimer | №0863 |
| autos | №0806 |
| av | №0056 (+ 2 других файлов) |
| avail | №0643 |
| available | №0774 (+ 4 других файлов) |
| availableCharges | №0073 |
| availableWallpapers | №0863 |
| avg | №0695 |
| avianHybrid | №1070 |
| aw | №0056 (+ 1 других файлов) |
| ax | №0056 (+ 2 других файлов) |
| axes | №0056 |
| AXES | №0061 |
| axis | №0056 (+ 10 других файлов) |
| ay | №0057 |
| az | №0056 (+ 1 других файлов) |
| b | №0054 (+ 129 других файлов) |
| B | №0053 (+ 16 других файлов) |
| b1 | №0056 (+ 1 других файлов) |
| back | №0054 (+ 4 других файлов) |
| backAnchor | №0056 |
| backBurden | №1127 |
| backCount | №0056 |
| backDepth | №0057 |
| backdrop | №0058 |
| background | №1723 |
| backgroundName | №0619 (+ 1 других файлов) |
| backgrounds | №1247 |
| backgroundsList | №0619 (+ 1 других файлов) |
| backQueen | №1127 |
| backTop | №0057 |
| backup | №0648 (+ 2 других файлов) |
| backupData | №0827 |
| backups | №0646 |
| bad | №0636 (+ 5 других файлов) |
| badgeTag | №0767 |
| badR | №1224 |
| bag | №1088 |
| bagAnchor | №0053 |
| bagCenter | №0053 |
| bagRings | №0053 |
| baked | №1724 |
| balanceAfterBarter | №1163 |
| balanceAfterBuy | №1163 |
| BAM | №0625 |
| band | №0057 |
| bandHi | №0057 |
| bandLo | №0057 |
| bandSection | №0057 |
| bar | №0838 |
| barb | №1220 (+ 1 других файлов) |
| barbarian | №1213 |
| barFill | №0787 |
| barter | №1163 |
| barWrapper | №0787 |
| base | №0056 (+ 67 других файлов) |
| BASE | №0659 (+ 1 других файлов) |
| BASE_HOSTS | №0884 |
| baseAc | №0619 (+ 1 других файлов) |
| baseAC | №0788 |
| baseACInput | №0788 |
| baseActions | №0808 |
| baseConfig | №1304 |
| baseCount | №0667 |
| baseFeatures | №0808 |
| baseGain | №0695 |
| baseH | №0057 (+ 1 других файлов) |
| baseIds | №0867 |
| baseJinx | №0774 |
| baseline | №0058 (+ 2 других файлов) |
| baseMax | №0650 |
| baseMod | №0767 |
| baseMode | №0822 |
| baseNameEng | №0740 |
| baseNameRu | №0740 |
| baseOpenTrade | №0796 |
| baseRate | №0660 |
| baseRender | №0651 |
| BASES | №0669 |
| baseStats | №1723 |
| baseStock | №0797 |
| baseValue | №0662 |
| baseW | №0067 |
| baseX | №0056 |
| baseY | №0056 |
| bat | №0056 (+ 1 других файлов) |
| batch | №0806 |
| batchFail | №1240 |
| batchTarget | №1240 |
| battleGame | №1127 |
| bb | №0056 (+ 4 других файлов) |
| bbu | №0774 |
| bbuDamage | №1148 |
| bbuHero | №1148 |
| bbuLevel9 | №1148 |
| bbuResource | №0650 |
| bbuResult | №0650 |
| bbuTemp | №0774 |
| bc | №0053 (+ 2 других файлов) |
| bCha | №0819 |
| bCon | №0819 |
| bd | №1121 |
| bDex | №0819 |
| beak | №0056 |
| beakKind | №0056 |
| beakL | №0056 |
| beakScale | №0056 |
| beakSelect | №0058 |
| beakStyle | №1091 |
| beakW | №0056 |
| bearer | №0648 |
| bearing | №0813 |
| beast | №0828 |
| beetle | №0056 |
| before | №0648 (+ 63 других файлов) |
| beforeBounds | №1091 |
| beforeBurn | №1067 |
| beforeCup | №1129 |
| beforeCurse | №1224 |
| beforeMoxie | №1148 |
| beforeNormal | №1230 |
| beforePact | №1230 |
| beforeRepeat | №1127 |
| beforeReset | №1069 |
| beforeUnsupported | №1129 |
| beh | №1178 |
| belly | №0056 |
| belt | №0658 |
| bend | №0056 |
| berry | №0813 (+ 1 других файлов) |
| berryOwner | №0814 |
| berryRef | №1127 |
| best | №0056 (+ 11 других файлов) |
| bestD | №1115 |
| bestDist | №0806 |
| bestiary | №0801 |
| bestTrans | №1121 |
| bestTri | №1116 |
| bet | №1126 (+ 1 других файлов) |
| bev | №0806 |
| bf | №0064 (+ 2 других файлов) |
| bg | №0667 (+ 2 других файлов) |
| BG_COLOR_PALETTE | №0863 |
| BG3_POINT_BUY | №0619 (+ 1 других файлов) |
| bgBody | №0863 |
| bgInput | №0078 |
| bgs | №0640 (+ 1 других файлов) |
| bgSelect | №0619 (+ 1 других файлов) |
| bgStyle | №0767 |
| bgVal | №0619 (+ 1 других файлов) |
| bh | №0822 (+ 3 других файлов) |
| bhDamage | №0650 |
| bhPact | №0822 |
| bi | №0806 |
| bIdx | №0619 |
| bin | №0056 (+ 16 других файлов) |
| binary | №1254 |
| binBytes | №1110 |
| binPad | №1107 |
| bins | №0057 |
| bInt | №0819 |
| bird | №0056 |
| bite | №1141 |
| bits | №0053 (+ 1 других файлов) |
| bl | №0681 |
| blackPowder | №1068 |
| blackPowderAttack | №1068 |
| blade | №0056 |
| bladeSpan | №0056 |
| bleed | №0650 |
| blend | №0053 (+ 1 других файлов) |
| blended | №0053 |
| blind | №0813 (+ 2 других файлов) |
| blob | №0827 (+ 7 других файлов) |
| blobs | №1300 |
| block | №0817 (+ 6 других файлов) |
| blocked | №0648 (+ 4 других файлов) |
| bloodAbility | №0073 |
| bloodAgent | №1068 |
| bloodCurseReaction | №0650 |
| bloodHunterPack | №0774 |
| bloodlines | №0828 |
| bloodMax | №0643 |
| bloodMutagenist | №1068 |
| bloodRiteRevival | №0650 |
| bloodShort | №0073 |
| bloodSnapshots | №0073 |
| bm | №0806 (+ 2 других файлов) |
| board | №0806 (+ 2 других файлов) |
| boardBox | №0621 |
| boardCtx | №1201 |
| body | №0053 (+ 22 других файлов) |
| bodyArmor | №0788 |
| bodyBefore | №1069 |
| bodyExtras | №1077 |
| bodyStats | №0779 |
| bomb | №0073 (+ 2 других файлов) |
| bomber | №1068 |
| bomberGuard | №1068 |
| bomberResistanceTarget | №1067 |
| bomberResisted | №1067 |
| bond | №0651 |
| bondBox | №0814 |
| bondConsent | №1129 |
| bondLabel | №0814 |
| bonds | №0681 |
| bondTarget | №1129 |
| bondText | №0814 |
| bondWilling | №0814 |
| bone | №0063 (+ 1 других файлов) |
| bonesChecked | №1296 |
| boneStyle | №0056 |
| boneVertexMap | №0056 |
| bonus | №0069 (+ 24 других файлов) |
| bonusAction | №0806 |
| bonuses | №0786 |
| bonusesText | №0619 (+ 1 других файлов) |
| bonusMultiplier | №0767 |
| bonusText | №0740 |
| Boolean | №0658 (+ 1 других файлов) |
| booted | №0881 |
| borderLeftColor | №0767 |
| bottom | №0053 (+ 4 других файлов) |
| bought | №1163 |
| boundary | №0053 (+ 1 других файлов) |
| boundaryEdges | №0053 |
| boundaryWelds | №0053 |
| bounds | №1078 (+ 1 других файлов) |
| box | №0058 (+ 27 других файлов) |
| boxer | №1148 |
| boxesHtml | №0831 |
| boxIndex | №0831 |
| bp | №0667 (+ 7 других файлов) |
| bParts | №0619 (+ 1 других файлов) |
| br | №1213 |
| brandedHp | №1151 |
| braPanels | №1091 |
| breath | №1068 |
| breathOne | №1068 |
| breathResults | №0073 |
| breathRoll | №0073 |
| breathTargets | №0073 |
| breathTwo | №1068 |
| breathType | №0073 |
| bridge | №1113 (+ 4 других файлов) |
| broken | №0056 (+ 3 других файлов) |
| brokenInputs | №1094 |
| browColor | №0058 |
| browser | №1259 (+ 38 других файлов) |
| BrowserWindow | №0881 |
| bStr | №0819 |
| bt | №0056 (+ 2 других файлов) |
| btn | №0787 (+ 4 других файлов) |
| btnCat | №0788 |
| btnContainer | №0786 |
| btnMode | №0767 |
| btoa | №1071 (+ 2 других файлов) |
| bucket | №0056 (+ 2 других файлов) |
| buckets | №0056 |
| bucketStep | №0056 |
| budget | №0813 (+ 1 других файлов) |
| budgets | №0054 |
| buf | №0064 (+ 2 других файлов) |
| buffers | №0056 (+ 3 других файлов) |
| bufs | №0064 |
| build | №0057 (+ 1 других файлов) |
| built | №1071 (+ 3 других файлов) |
| bulge | №0056 |
| bundled | №1103 (+ 1 других файлов) |
| burden | №1127 |
| burdenAliases | №0798 |
| burdens | №0798 |
| burn | №0774 (+ 1 других файлов) |
| burningOwner | №1067 |
| burningTarget | №1067 |
| bus | №0848 (+ 1 других файлов) |
| busy | №0646 |
| button | №0058 (+ 5 других файлов) |
| buttons | №0058 (+ 2 других файлов) |
| buttonsHtml | №0740 |
| buyFactor | №0795 |
| bv | №0056 (+ 2 других файлов) |
| bvh | №1115 |
| bvIndex | №1107 |
| bWis | №0819 |
| bx | №0057 (+ 1 других файлов) |
| by | №0057 |
| BY_ID | №0816 |
| byFamily | №0623 (+ 12 других файлов) |
| byLevel | №0804 |
| byName | №0659 (+ 1 других файлов) |
| BYPASS_PARCHMENT_ONCE | №0640 |
| bySource | №0623 (+ 2 других файлов) |
| byteOffset | №0064 |
| bytes | №0059 (+ 4 других файлов) |
| bytesWritten | №0884 |
| bz | №0068 |
| c | №0054 (+ 222 других файлов) |
| C | №0076 (+ 13 других файлов) |
| c0 | №0656 |
| c2 | №1244 |
| ca | №0053 (+ 1 других файлов) |
| cache | №0064 |
| CACHE_BUSTER | №0837 |
| cached | №0057 (+ 1 других файлов) |
| calcAtk | №0642 |
| calcDmgBonus | №0642 |
| calcInput | №0775 |
| calcType | №0786 |
| calcWidget | №0785 |
| calf | №0054 |
| call | №0866 |
| callback | №0881 (+ 19 других файлов) |
| callbacks | №1136 |
| called | №1156 |
| calls | №1108 (+ 3 других файлов) |
| cam | №0065 (+ 1 других файлов) |
| campaign | №1180 |
| campaigns | №0637 |
| CAN | №0804 |
| canClose | №0838 |
| candidate | №0884 |
| candidates | №0056 (+ 7 других файлов) |
| canonical | №0765 |
| cantrip | №0073 |
| cantrips | №0755 (+ 1 других файлов) |
| CANTRIPS | №0839 |
| cantripsList | №0831 |
| canvas | №0065 (+ 3 других файлов) |
| cap | №0053 (+ 6 других файлов) |
| capacity | №1139 |
| caps | №1082 |
| capStart | №0053 |
| caption | №0814 |
| card | №0787 (+ 10 других файлов) |
| cardApi | №0814 |
| cardId | №0816 |
| cards | №0650 (+ 5 других файлов) |
| CARDS | №0816 |
| cases | №0658 (+ 3 других файлов) |
| cast | №1135 (+ 1 других файлов) |
| caster | №0806 (+ 3 других файлов) |
| casterLevel | №0822 |
| cat | №0062 (+ 22 других файлов) |
| catalog | №0058 (+ 5 других файлов) |
| CATALOG | №0623 (+ 15 других файлов) |
| catalogContainer | №0817 |
| catalogHtml | №0817 |
| catalogKey | №0814 |
| catalogState | №0655 |
| catalogue | №1267 |
| catalyst | №0076 |
| catalystId | №0074 (+ 1 других файлов) |
| CATALYSTS | №0074 |
| catContainer | №0786 |
| category | №0065 (+ 17 других файлов) |
| CATEGORY | №0655 |
| catLower | №0786 |
| catOk | №0797 |
| cats | №0659 |
| catStr | №0818 |
| catTitle | №0786 |
| cb | №1119 (+ 2 других файлов) |
| cbt | №1128 |
| cc | №0056 (+ 1 других файлов) |
| cd | №0774 |
| ce | №1236 (+ 1 других файлов) |
| ceiling | №0813 |
| cel | №0068 |
| celestial | №1154 |
| cell | №0056 (+ 7 других файлов) |
| CELL_FT | №0621 |
| cellFt | №0651 |
| cells | №0060 (+ 1 других файлов) |
| cellU | №0056 |
| cellV | №0056 |
| center | №0056 (+ 5 других файлов) |
| centre | №0056 |
| centres | №0056 |
| cf | №0774 (+ 1 других файлов) |
| cfg | №0056 (+ 2 других файлов) |
| cg | №0857 |
| ch | №0063 (+ 3 других файлов) |
| cha | №0623 (+ 11 других файлов) |
| chain | №0056 (+ 1 других файлов) |
| chance | №0075 (+ 2 других файлов) |
| change | №1047 |
| changed | №0873 (+ 3 других файлов) |
| CHANGELOG | №0810 |
| changes | №0822 (+ 1 других файлов) |
| channel | №0058 |
| CHANNEL_KEY | №0837 |
| channels | №0061 (+ 6 других файлов) |
| char | №0826 (+ 5 других файлов) |
| character | №0054 (+ 5 других файлов) |
| CHARACTER_CREATION_MODE | №0640 |
| CHARACTER_SAVE_SCHEMA_VERSION | №0078 |
| characters | №0826 |
| characterShape | №0643 (+ 1 других файлов) |
| charClassInputs | №0695 |
| charge | №0774 |
| chargeCount | №0073 |
| chargeDirection | №0814 |
| charges | №1151 (+ 2 других файлов) |
| charId | №0826 |
| charIndex | №0826 |
| charInfo | №0827 |
| chariot | №1127 |
| charLevel | №0826 |
| charm | №1127 |
| charmed | №0073 |
| charmedHero | №1127 |
| charmTarget | №1127 |
| charName | №0826 |
| chars | №0827 (+ 1 других файлов) |
| charTotalCopper | №0785 |
| check | №0643 (+ 11 других файлов) |
| checkbox | №0787 (+ 2 других файлов) |
| checked | №0853 (+ 11 других файлов) |
| checkedAttr | №0619 (+ 1 других файлов) |
| cheek | №0056 |
| chest | №1122 |
| chestUnderwear | №0056 |
| child | №0784 (+ 1 других файлов) |
| childId | №0784 |
| children | №0784 |
| chin | №0056 |
| chk | №0651 (+ 1 других файлов) |
| choice | №0648 (+ 4 других файлов) |
| choiceBlocks | №0695 |
| choices | №0058 (+ 5 других файлов) |
| chosen | №0636 (+ 4 других файлов) |
| chosenD20 | №0642 |
| chosenFeat | №0695 (+ 1 других файлов) |
| chosenMod | №0767 |
| chosenPatron | №0774 |
| chosenResistance | №0073 |
| chosenTrad | №0808 |
| chromium | №1259 (+ 37 других файлов) |
| chunk | №0064 (+ 6 других файлов) |
| chunks | №1254 (+ 1 других файлов) |
| ci | №0056 (+ 1 других файлов) |
| cid | №0073 |
| cId | №0827 |
| cl | №0056 (+ 3 других файлов) |
| claim | №0069 |
| clamp | №0075 |
| class | №0695 |
| CLASS | №0073 (+ 4 других файлов) |
| CLASS_DEFS | №0770 |
| CLASS_I18N | №0790 |
| CLASS_KEYS | №0822 |
| CLASS_NAMES | №0643 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0708 |
| CLASS_TOKEN_ART | №0640 |
| classBonus | №0650 |
| classContext | №0650 |
| classData | №0695 (+ 1 других файлов) |
| classDescriptions | №0658 |
| classEntry | №0695 |
| classes | №0781 (+ 5 других файлов) |
| classFiles | №1723 |
| CLASSIC_BACKGROUND_NAMES | №0640 |
| CLASSIC_CLASS_NAMES | №0640 |
| CLASSIC_RACE_IDS | №0640 |
| classicBgs | №1247 |
| classicClasses | №1247 |
| classLevel | №0695 |
| classMatch | №0831 |
| classMeta | №0781 |
| className | №0619 (+ 8 других файлов) |
| classNameBase | №0641 |
| classNameOnly | №0619 (+ 1 других файлов) |
| classReduction | №0650 |
| classSelect | №0619 (+ 1 других файлов) |
| classStr | №0831 |
| clawLen | №0056 |
| clean | №0628 (+ 10 других файлов) |
| cleanName | №0641 |
| cleanStr | №0767 (+ 1 других файлов) |
| cleanTool | №0641 |
| clear | №0057 (+ 1 других файлов) |
| clearContainer | №0784 |
| clearInterval | №1193 (+ 5 других файлов) |
| clearTimeout | №1193 (+ 28 других файлов) |
| cleft | №0053 (+ 1 других файлов) |
| cleric | №1220 |
| click | №1122 |
| CLIENT_KEY | №0805 |
| clipped | №0056 |
| clone | №1066 (+ 5 других файлов) |
| close | №0810 (+ 1 других файлов) |
| closeBtn | №0695 |
| closedHero | №1129 |
| closedPixels | №1265 |
| cloth | №0058 (+ 3 других файлов) |
| clothBuckets | №0056 |
| clothed | №1096 (+ 1 других файлов) |
| clothes | №1070 (+ 2 других файлов) |
| clothFaces | №0056 |
| clothing | №0054 (+ 2 других файлов) |
| cloud | №1099 |
| cloudStatus | №0827 |
| cls | №0781 (+ 8 других файлов) |
| club | №0771 (+ 1 других файлов) |
| clubFeatures | №0774 |
| clubIds | №1156 |
| cm | №0774 (+ 1 других файлов) |
| cmd | №1066 |
| cmn | №1115 |
| cmx | №1115 |
| cn | №0790 (+ 1 других файлов) |
| cName | №0831 |
| co | №0068 |
| code | №0646 (+ 5 других файлов) |
| coinCases | №1723 |
| coinHero | №1723 |
| coinRef | №1128 |
| coins | №0785 |
| col | №0060 (+ 1 других файлов) |
| cold | №0058 |
| colEP | №0785 |
| collar | №0053 (+ 2 других файлов) |
| collarCount | №0053 |
| collisions | №1121 |
| colno | №0766 |
| color | №0056 (+ 4 других файлов) |
| coloredDrink | №1068 |
| coloredPotionMaker | №1068 |
| colorHex | №0863 |
| colorKey | №0827 |
| colors | №0058 (+ 1 других файлов) |
| colorType | №0073 |
| colour | №1093 |
| colourDetail | №1069 |
| colourIdat | №1093 |
| colourRaw | №1093 |
| colPP | №0785 |
| cols | №0056 (+ 1 других файлов) |
| combat | №0661 (+ 2 других файлов) |
| combatant | №0073 (+ 1 других файлов) |
| combatants | №0073 |
| command | №0825 |
| commit | №0636 |
| committed | №1100 |
| commonSaved | №1265 |
| companion | №1129 (+ 1 других файлов) |
| companionId | №1156 |
| compare | №1104 |
| comparing | №0058 |
| compat | №0837 (+ 2 других файлов) |
| compatFs | №1305 |
| compatRequire | №1305 |
| completed | №0792 |
| completedBytes | №0884 |
| component | №1115 |
| componentBytes | №1119 |
| compositions | №1256 |
| comps | №1116 |
| con | №0623 (+ 15 других файлов) |
| conc | №0822 |
| concentration | №0650 |
| cond | №0642 (+ 2 других файлов) |
| condition | №0650 (+ 3 других файлов) |
| CONDITION_ALIASES | №0822 |
| conditionHero | №1148 |
| conditionMods | №0650 |
| conditionNotes | №0767 |
| conditions | №0650 (+ 4 других файлов) |
| CONDITIONS | №0650 (+ 3 других файлов) |
| CONDITIONS_CONFIG | №0078 |
| conds | №0650 |
| conduit | №0693 |
| config | №0069 (+ 5 других файлов) |
| CONFIG | №0648 |
| confirmed | №0073 |
| conflict | №0648 |
| CONFLICT | №0074 |
| conflicts | №0074 (+ 2 других файлов) |
| conflictSet | №0074 |
| conMod | №0619 (+ 4 других файлов) |
| conModFinal | №0619 (+ 1 других файлов) |
| conScore | №0650 |
| consent | №1129 |
| console | №0658 (+ 29 других файлов) |
| constant | №0806 (+ 1 других файлов) |
| consumed | №0667 |
| consumedJinx | №0650 |
| consumer | №1136 |
| container | №0619 (+ 15 других файлов) |
| containerId | №0817 (+ 3 других файлов) |
| containers | №0778 (+ 3 других файлов) |
| content | №0788 (+ 1 других файлов) |
| contentBox | №0695 |
| contentDiv | №0767 |
| contentsWeight | №0784 |
| context | №0650 (+ 13 других файлов) |
| contextBridge | №0882 |
| contexts | №1069 (+ 1 других файлов) |
| contract | №0774 |
| contracts | №1724 |
| control | №0058 (+ 1 других файлов) |
| controller | №0648 (+ 2 других файлов) |
| controls | №0058 (+ 1 других файлов) |
| conVal | №0695 |
| converted | №0076 (+ 1 других файлов) |
| cooldown | №1065 |
| cooledAttack | №1068 |
| cooling | №1068 |
| copied | №1724 |
| COPPER | №0794 |
| copperPerElectrum | №0785 |
| copperPerGold | №0785 |
| copperPerPlat | №0785 |
| copperPerSilver | №0785 |
| copy | №0055 (+ 8 других файлов) |
| core | №0056 (+ 8 других файлов) |
| CORE | №0643 |
| CORE_CLASSES | №0655 |
| coreOwned | №0643 |
| corePositions | №0056 |
| corner | №1093 |
| corners | №0056 (+ 2 других файлов) |
| corona | №0053 |
| corpse | №0804 (+ 2 других файлов) |
| corrupt | №1081 |
| cost | №0643 (+ 14 других файлов) |
| costDie | №0774 |
| costInp | №0786 |
| count | №0056 (+ 43 других файлов) |
| counter | №0788 (+ 6 других файлов) |
| counterDamage | №0774 (+ 1 других файлов) |
| counterHero | №1148 |
| counterLeft | №0650 |
| counterReduction | №0650 (+ 1 других файлов) |
| counterState | №0650 |
| countInput | №0788 |
| counts | №0053 (+ 3 других файлов) |
| countToRead | №0064 |
| coverBonus | №0650 (+ 1 других файлов) |
| covered | №0057 (+ 1 других файлов) |
| coveredCount | №1295 |
| cp | №0056 (+ 17 других файлов) |
| cPerS | №0785 |
| cpInput | №0785 |
| cpVal | №0785 |
| cr | №0623 (+ 15 других файлов) |
| CR | №0804 |
| CR_BY_MONSTER | №0803 |
| CR_RANK | №0803 |
| craft | №0623 (+ 21 других файлов) |
| craftBase | №0622 |
| craftBonus | №0660 (+ 1 других файлов) |
| crafted | №0659 |
| CRAFTING_BACKGROUND_PROFILES | №0667 |
| CRAFTING_CLASS_PROFILES | №0667 |
| CRAFTING_FEAT_PROFILES | №0667 |
| CRAFTING_RACE_PROFILES | №0667 |
| craftingProfile | №0667 |
| craftModifier | №0667 |
| craftNotes | №0667 |
| createContainer | №0784 |
| created | №0813 |
| creation | №1723 |
| creationCases | №1723 |
| creationScreen | №0619 (+ 1 других файлов) |
| creatures | №0681 |
| CREATURES | №0769 |
| crest | №0056 |
| crit | №1148 |
| critical | №0650 (+ 3 других файлов) |
| criticalRange | №0650 |
| critNote | №0767 (+ 1 других файлов) |
| critTarget | №1148 |
| cross | №0057 (+ 1 других файлов) |
| crowd | №0650 (+ 1 других файлов) |
| crowdCondition | №0774 |
| crowdDC | №0774 |
| crowdHero | №1148 |
| crowdResults | №0774 |
| crowdSave | №0650 |
| crowdTarget | №1148 |
| crowdTargets | №0774 |
| crown | №0056 |
| crownDiagnostics | №1269 |
| crownOff | №1269 |
| crypto | №0884 (+ 52 других файлов) |
| cs | №0056 (+ 11 других файлов) |
| csel | №0801 |
| ct | №0056 |
| ctx | №0067 (+ 136 других файлов) |
| ctx2d | №0058 |
| cuff | №0057 |
| cum | №0056 |
| cup | №0057 (+ 1 других файлов) |
| cupChoice | №0814 |
| cupNumber | №1141 |
| cupPC | №1127 |
| cupPhone | №1127 |
| cupProfiles | №1127 |
| cupResult | №0814 |
| cupRoster | №1127 |
| cups | №0057 |
| cupsBack | №1127 |
| cupServer | №1127 |
| cupsPending | №0814 |
| cur | №0075 (+ 4 других файлов) |
| curHp | №0774 |
| curl | №0056 |
| current | №0053 (+ 13 других файлов) |
| currentActiveId | №0826 |
| currentChar | №0078 |
| currentCharacterId | №0078 |
| currentClass | №0695 |
| currentColor | №0863 |
| currentCurrHp | №0819 |
| currentDim | №0863 |
| currentExp | №0775 |
| currentHero | №0827 (+ 1 других файлов) |
| currentHound | №0774 |
| currentHp | №0073 (+ 1 других файлов) |
| currentHP | №0864 |
| currentInventoryCategory | №0788 |
| currentLevelExpReq | №0775 |
| currentLevelInClass | №0708 |
| currentLvl | №0775 (+ 1 других файлов) |
| currentMax | №0695 |
| currentModalColor | №0863 |
| currentModalOpacity | №0863 |
| currentOpacity | №0863 |
| currentPact | №0793 |
| currentProfsIds | №0817 |
| currentProgress | №0838 |
| currentRollMode | №0767 |
| currentRound | №0650 |
| currentSpent | №0619 (+ 1 других файлов) |
| currentStep | №0077 |
| currentTime | №0792 |
| currentTrack | №0077 |
| currentTrackIndex | №0077 |
| currentVal | №0619 (+ 3 других файлов) |
| currentVersion | №0827 (+ 1 других файлов) |
| currentVolume | №0077 |
| currentWallpaperIndex | №0863 |
| currId | №0827 |
| curse | №0774 |
| curseActor | №0650 |
| curseEffect | №0774 |
| curseId | №0774 |
| curseKnown | №0683 |
| curseMax | №0774 |
| curseNames | №0636 |
| curses | №0072 (+ 1 других файлов) |
| curseSaveMods | №0650 |
| curSides | №0642 |
| curStat | №0642 |
| curve | №0056 |
| custom | №0057 (+ 1 других файлов) |
| customBtn | №0788 (+ 1 других файлов) |
| customElem | №0791 |
| customGather | №0820 |
| customRaces | №0819 |
| customSkinCharacter | №1070 |
| customTestSource | №0837 |
| cut | №0056 (+ 1 других файлов) |
| cutFaces | №0053 |
| cv | №0056 (+ 2 других файлов) |
| cw | №1093 |
| cwd | №1066 |
| cx | №0056 (+ 7 других файлов) |
| cy | №0053 (+ 7 других файлов) |
| cycles | №0660 |
| cz | №0056 (+ 5 других файлов) |
| d | №0054 (+ 84 других файлов) |
| D | №0053 (+ 23 других файлов) |
| d00 | №1115 (+ 2 других файлов) |
| d01 | №1115 (+ 2 других файлов) |
| d1 | №1115 (+ 3 других файлов) |
| d11 | №1115 (+ 2 других файлов) |
| d2 | №1115 (+ 3 других файлов) |
| d20 | №0650 (+ 4 других файлов) |
| d20_1 | №0642 |
| d20_2 | №0642 |
| d20Button | №0643 |
| d20Details | №0642 |
| d20Result | №0767 (+ 1 других файлов) |
| d21 | №1115 (+ 2 других файлов) |
| d3 | №1115 (+ 3 других файлов) |
| d4 | №1115 (+ 3 других файлов) |
| d5 | №1115 (+ 3 других файлов) |
| d6 | №1115 (+ 3 других файлов) |
| da | №1093 |
| damage | №0069 (+ 21 других файлов) |
| DAMAGE_TYPES | №0650 |
| damageBeforeWard | №0650 |
| damageButton | №0643 |
| damaged | №0659 |
| damageOpts | №0650 |
| damageParts | №0650 |
| damageResult | №0806 |
| damageStr | №0786 |
| damageString | №0767 (+ 1 других файлов) |
| damageTaken | №0650 |
| dark | №0056 (+ 2 других файлов) |
| data | №0058 (+ 40 других файлов) |
| dataDir | №1256 (+ 1 других файлов) |
| dataStr | №0827 |
| DataView | №1071 (+ 21 других файлов) |
| Date | №0658 (+ 66 других файлов) |
| dateStr | №0827 |
| day | №0794 |
| db | №0708 (+ 3 других файлов) |
| dbg | №1192 (+ 1 других файлов) |
| dbItem | №0787 (+ 1 других файлов) |
| dbNameLower | №0641 |
| dc | №0069 (+ 26 других файлов) |
| dcElem | №0649 (+ 1 других файлов) |
| dcValue | №0811 |
| dd | №0068 (+ 1 других файлов) |
| deadAlly | №1068 |
| dealUses | №0774 |
| deathSaveFailures | №0650 |
| deb | №0073 |
| debuffs | №0650 (+ 1 других файлов) |
| debug | №1047 |
| debugBtn | №0766 |
| debugContainer | №0827 (+ 1 других файлов) |
| debugToggle | №0827 |
| debugWrapper | №0827 |
| deception | №0073 |
| deck | №0814 (+ 5 других файлов) |
| DECLARATIVE_FEATURES | №0643 |
| declared | №1129 |
| decodeURIComponent | №1206 (+ 1 других файлов) |
| deduction | №0636 |
| def | №0061 (+ 6 других файлов) |
| DEFAULT | №0066 |
| DEFAULT_CAPACITY | №0784 |
| DEFAULT_CHANNEL | №0837 |
| DEFAULT_COLS | №0621 |
| DEFAULT_ENABLED | №0661 |
| DEFAULT_ICON | №0827 (+ 2 других файлов) |
| DEFAULT_MANIFEST_URL | №0837 |
| DEFAULT_RACES | №0819 |
| DEFAULT_ROWS | №0621 |
| defaultIcon | №0883 |
| defaultMode | №0786 |
| defaultModel | №0801 |
| defaults | №0061 (+ 2 других файлов) |
| defaultType | №0786 |
| defaultValue | №0786 |
| defender | №1148 (+ 1 других файлов) |
| defenderClasses | №0650 |
| defenses | №0786 (+ 1 других файлов) |
| defensesContainer | №0786 |
| defer | №0806 |
| deflect | №0650 |
| deflected | №1067 |
| defs | №0061 (+ 4 других файлов) |
| DEFS | №0813 |
| delay | №0648 (+ 1 других файлов) |
| delayedBomb | №1068 |
| delBtn | №0788 (+ 1 других файлов) |
| deleteBtn | №0807 |
| deleted | №0648 |
| delta | №0053 (+ 18 других файлов) |
| demolitionOwner | №1068 |
| demolitionResult | №1068 |
| demolitionTarget | №0073 (+ 1 других файлов) |
| den | №0056 (+ 7 других файлов) |
| denied | №1143 |
| denLabel | №0058 |
| denOpacity | №0057 |
| dense | №1276 |
| denValues | №0057 |
| dependency | №1724 |
| depth | №0056 (+ 4 других файлов) |
| derived | №1724 |
| derivedAssets | №0066 |
| desc | №0665 (+ 7 других файлов) |
| descBox | №0619 (+ 2 других файлов) |
| descElem | №0791 |
| descInp | №0786 |
| descInput | №0819 |
| description | №0643 (+ 2 других файлов) |
| descriptor | №1071 (+ 1 других файлов) |
| descText | №0619 (+ 1 других файлов) |
| descVal | №0819 |
| desired | №0053 (+ 2 других файлов) |
| DesktopWebUpdater | №0881 (+ 2 других файлов) |
| dest | №0070 (+ 4 других файлов) |
| destination | №0813 (+ 2 других файлов) |
| destinations | №0813 |
| detail | №0845 (+ 3 других файлов) |
| details | №0058 (+ 4 других файлов) |
| detailsElem | №0791 |
| detailsHtml | №0788 |
| detailText | №0767 (+ 1 других файлов) |
| developmentGate | №1065 |
| device | №1127 |
| devModal | №0827 |
| dex | №0623 (+ 14 других файлов) |
| dexHero | №1148 (+ 1 других файлов) |
| dexInput | №0819 |
| dexMod | №0619 (+ 6 других файлов) |
| dexSave | №1148 |
| dexScore | №0650 (+ 1 других файлов) |
| dexStats | №0650 |
| df | №0774 |
| di | №0650 (+ 1 других файлов) |
| diag | №1081 (+ 9 других файлов) |
| diagnostics | №1256 |
| diagonal | №0815 (+ 1 других файлов) |
| diagonals | №0815 |
| dialectAliases | №0823 |
| DIALECTS | №0823 |
| dice | №0774 (+ 9 других файлов) |
| DICE_ICONS | №0827 (+ 2 других файлов) |
| diceCount | №0767 (+ 3 других файлов) |
| diceCountInp | №0786 |
| diceDir | №0883 |
| diceFiles | №0883 |
| diceMatch | №0767 |
| diceMax | №1094 |
| diceMin | №1094 |
| diceOptions | №0642 |
| diceRegex | №0831 |
| dices | №0786 |
| diceSides | №0767 (+ 1 других файлов) |
| diceSpent | №0073 |
| diceTab | №0767 |
| diceTypes | №0642 |
| die | №0076 (+ 7 других файлов) |
| DIE | №0636 (+ 1 других файлов) |
| dieSides | №0806 |
| diff | №0695 (+ 1 других файлов) |
| dig | №1149 |
| digDeep | №0650 |
| digDeepTypes | №0650 |
| digit | №0056 |
| digits | №0056 |
| dimLayer | №0863 |
| dir | №0056 (+ 10 других файлов) |
| dire | №0774 |
| direct | №0060 |
| directCompatible | №1119 |
| direction | №0813 (+ 2 других файлов) |
| directions | №0813 |
| direMax | №0774 |
| DIRS | №0815 |
| dirty | №0774 (+ 1 других файлов) |
| dirtyApplied | №0774 |
| dirtyDC | №0774 |
| dirtyHero | №1148 |
| dirtyResource | №0774 |
| dirtySave | №0774 |
| dirtyTarget | №1148 |
| dis | №0650 (+ 2 других файлов) |
| disable | №0787 |
| disabled | №0814 |
| disBtn | №0788 |
| disc | №0056 (+ 2 других файлов) |
| discharge | №1067 |
| dischargeTarget | №1067 |
| disciplineAliases | №0824 |
| disciplineByPower | №0774 |
| disciplines | №0824 |
| discover | №0074 |
| discoveries | №0073 |
| discovery | №0073 |
| discoveryLevel | №0073 |
| discoveryName | №0073 |
| discoveryRecipes | №0073 |
| disguise | №1147 |
| displacement | №1112 |
| display | №0695 (+ 1 других файлов) |
| displayedAC | №0822 |
| displayName | №0619 (+ 3 других файлов) |
| displaySpeed | №0778 |
| displayStyle | №0831 |
| dist | №0056 (+ 5 других файлов) |
| distal | №0056 |
| distance | №0056 (+ 4 других файлов) |
| distanceFt | №0813 (+ 1 других файлов) |
| distanceRolled | №0813 |
| distances | №1115 (+ 2 других файлов) |
| div | №0695 |
| dl | №0056 (+ 1 других файлов) |
| dm | №0806 (+ 1 других файлов) |
| dmg | №0073 (+ 7 других файлов) |
| dmgBonus | №0642 |
| dn | №0056 |
| DND_CLASSES_LIST | №0619 (+ 1 других файлов) |
| DND_DAMAGE_TYPES | №0786 |
| DND_SKILLS_LIST | №0786 |
| DND_WEAPON_CATEGORIES | №0786 |
| DND_WEAPON_PROPERTIES | №0786 |
| dndBackgrounds | №0619 |
| dndModal | №0695 |
| doc | №1192 (+ 2 других файлов) |
| document | №1069 |
| dom | №1122 |
| dome | №0056 |
| domReady | №1214 (+ 1 других файлов) |
| done | №0837 (+ 3 других файлов) |
| donor | №0808 |
| dot | №0053 |
| down | №0070 |
| download | №1270 |
| downloadAnchor | №0827 |
| downloads | №1103 |
| dr | №0774 (+ 2 других файлов) |
| draft | №0813 (+ 2 других файлов) |
| DRAFT | №0055 |
| drag | №0858 |
| dragon | №1218 |
| dragonGraft | №0073 |
| draw | №0778 (+ 4 других файлов) |
| drawer | №0788 |
| drawerContainer | №0767 |
| drawerContent | №0767 |
| drawWindow | №0768 |
| dreadAttack | №1148 |
| dreadHandHero | №1148 |
| dreadHero | №1148 |
| dreadTarget | №1148 |
| dress | №1079 |
| drop | №0056 |
| dry | №1102 |
| ds | №0650 (+ 1 других файлов) |
| dst | №0064 (+ 1 других файлов) |
| dt | №0056 (+ 2 других файлов) |
| du | №0053 |
| duplicates | №1300 |
| duplicityMiss | №0650 |
| duplicityTarget | №0650 |
| dupRoll | №0650 |
| durability | №0794 (+ 1 других файлов) |
| duration | №0864 |
| durationMs | №0077 |
| durationSeconds | №0864 |
| dv | №0053 (+ 3 других файлов) |
| dwarf | №0061 |
| dwarfDesc | №0658 |
| dx | №0053 (+ 13 других файлов) |
| dy | №0053 (+ 12 других файлов) |
| dynamicContainer | №0788 |
| dynamoAttack | №1068 |
| dz | №0053 (+ 5 других файлов) |
| dzdt | №0053 |
| e | №0053 (+ 150 других файлов) |
| E | №0804 |
| e0 | №0058 (+ 1 других файлов) |
| each | №0643 |
| ear | №0056 |
| earOuter | №0056 |
| ears | №0056 (+ 1 других файлов) |
| earVertices | №1082 |
| eb | №0056 (+ 1 других файлов) |
| ec | №0774 |
| eco | №1178 |
| econ | №0660 (+ 1 других файлов) |
| ECON | №0659 |
| edge | №0056 |
| edges | №0056 |
| editor | №0882 (+ 1 других файлов) |
| editorWeaponPresets | №0058 |
| ef | №0073 (+ 1 других файлов) |
| eff | №0774 |
| effect | №0073 (+ 3 других файлов) |
| effectApplies | №0650 |
| effectiveD20 | №0650 |
| effectiveDiceCount | №0767 |
| effectiveMode | №0767 |
| effectMap | №0073 |
| effects | №0669 (+ 2 других файлов) |
| EFFECTS | №0075 |
| effectSerial | №0636 |
| eid | №0804 (+ 1 других файлов) |
| eInput | №0785 |
| el | №0065 (+ 28 других файлов) |
| elapsed | №0873 |
| elBar | №0775 |
| elCurExp | №0775 |
| elCurLvl | №0775 |
| elDesc | №0819 |
| electromagneticShield | №0650 |
| elem | №1218 |
| element | №0774 |
| elementId | №0788 |
| elements | №1069 (+ 4 других файлов) |
| elementsToHide | №0863 |
| elId | №0787 |
| eligible | №0816 |
| elInputCur | №0775 |
| ellipse | №0053 |
| elName | №0819 |
| elNextExp | №0775 |
| elSpeed | №0819 |
| email | №0646 (+ 1 других файлов) |
| embedded | №0816 |
| emojis | №0767 |
| empty | №0056 |
| emptyMsg | №0786 |
| enabled | №0054 (+ 3 других файлов) |
| encoded | №0813 |
| encodeURIComponent | №1206 (+ 1 других файлов) |
| encounter | №0800 |
| end | №0056 (+ 4 других файлов) |
| ended | №0813 |
| ends | №0069 |
| endY | №0057 |
| enemies | №0813 |
| enemy | №0867 (+ 4 других файлов) |
| enemyHP | №1158 |
| energyDamage | №0073 |
| energyResult | №0073 |
| energySeamTarget | №1067 |
| engine | №1205 |
| englishName | №0773 |
| engName | №0695 (+ 1 других файлов) |
| enhancedAttack | №1148 |
| enhancedTarget | №1148 |
| entity | №0073 (+ 2 других файлов) |
| entries | №0648 (+ 8 других файлов) |
| entry | №0058 (+ 18 других файлов) |
| entryId | №0791 |
| env | №1123 (+ 1 других файлов) |
| envelope | №0053 |
| ep | №0774 (+ 2 других файлов) |
| epInput | №0785 |
| epoch | №0648 |
| eprof | №0806 |
| eps | №0053 (+ 2 других файлов) |
| epsilon | №0057 |
| epVal | №0785 |
| equipCheckbox | №0788 |
| equipLabel | №0788 |
| equipment | №0061 |
| equippedWeapon | №0767 |
| er | №0056 (+ 1 других файлов) |
| err | №0058 (+ 4 других файлов) |
| error | №0058 (+ 1 других файлов) |
| errorCount | №0766 |
| errors | №0656 (+ 40 других файлов) |
| es | №0075 |
| esc | №0065 (+ 1 других файлов) |
| escape | №1206 (+ 2 других файлов) |
| ev | №0778 (+ 6 других файлов) |
| evasion | №0650 |
| event | №0069 (+ 15 других файлов) |
| EVENT_LIMIT | №0805 |
| eventAttacker | №0650 |
| eventBox | №0814 |
| eventChainHeadHash | №0805 |
| eventLabel | №0814 |
| eventLogBaseHash | №0805 |
| eventLogBaseSeq | №0805 |
| eventPC | №1127 |
| eventPhone | №1127 |
| eventRoster | №1127 |
| events | №0805 (+ 6 других файлов) |
| eventServer | №1127 |
| eventText | №0814 |
| evo | №1218 |
| evt | №1069 |
| ex | №0056 (+ 1 других файлов) |
| exact | №0656 (+ 2 других файлов) |
| excess | №0774 |
| executionScene | №0813 |
| exhaustion | №0820 |
| exhaustionNow | №0650 |
| exhaustionRestKey | №0642 (+ 1 других файлов) |
| exhaustionText | №0820 |
| existing | №0069 (+ 9 других файлов) |
| existingClass | №0781 |
| existingClassEntry | №0695 |
| existingOverlay | №0767 |
| exists | №0641 (+ 1 других файлов) |
| existsL | №0641 |
| exp | №0775 |
| expand | №0057 |
| expanded | №0058 |
| expBasedLevel | №0775 |
| expected | №0073 (+ 4 других файлов) |
| expectedRevision | №0816 |
| expert | №1142 |
| expiration | №1157 |
| expired | №1148 |
| expires | №0828 |
| explicit | №1070 |
| exploitContract | №0774 |
| exploits | №0867 |
| explored | №0069 |
| exposureActor | №0650 |
| expr | №0643 (+ 7 других файлов) |
| expression | №0774 |
| ext | №0068 (+ 4 других файлов) |
| external | №0054 (+ 1 других файлов) |
| externalCalls | №1108 |
| externalJson | №1108 |
| externalPanels | №0767 |
| extra | №0056 (+ 31 других файлов) |
| EXTRA | №0638 |
| EXTRA_RULES | №0074 |
| EXTRA_TRIGGER | №0075 |
| EXTRA_TYPES | №0640 |
| extraACBonus | №0788 |
| extraAtk | №0806 |
| extraClass | №0695 |
| extraClasses | №1247 |
| extraDamages | №0786 |
| extraData | №0788 (+ 1 других файлов) |
| extraDmg | №0806 |
| extraDmgContainer | №0786 |
| extraLine | №0740 |
| extraLocked | №0695 |
| extraName | №0695 (+ 1 других файлов) |
| extrapolated | №1256 |
| extras | №0058 (+ 3 других файлов) |
| extraType | №0695 |
| exts | №0883 |
| ey | №0056 |
| eye | №0056 (+ 1 других файлов) |
| eyeBtn | №0863 |
| eyeIsland | №0056 |
| eyePart | №0056 |
| eyes | №0056 (+ 2 других файлов) |
| eyeSave | №1269 |
| eyesDiag | №1269 |
| eyesOff | №1269 |
| eyeWeight | №0056 |
| eyeX | №0056 |
| eyeY | №0056 |
| eyeZ | №0056 |
| ez | №0056 |
| f | №0054 (+ 116 других файлов) |
| F | №1217 (+ 4 других файлов) |
| fa | №0774 |
| face | №0053 (+ 2 других файлов) |
| faceParts | №0058 |
| faces | №0053 (+ 3 других файлов) |
| facing | №0056 |
| FACTIONS | №0627 |
| factor | №0053 (+ 4 других файлов) |
| factory | №0822 |
| fadeInterval | №0077 |
| fadeTimer | №0792 |
| fail | №1164 (+ 1 других файлов) |
| failed | №1066 (+ 2 других файлов) |
| failedSave | №0828 |
| fall | №1213 |
| fallback | №0056 (+ 7 других файлов) |
| FALLBACK_MANIFEST_URL | №0837 |
| fallbackName | №0708 |
| fallbackText | №0767 |
| false | №0774 (+ 6 других файлов) |
| fam | №0624 (+ 10 других файлов) |
| familiarForms | №0774 |
| FAMILIES | №0623 |
| family | №0623 (+ 1 других файлов) |
| FAMILY_BY_CREATURE | №0769 |
| FAMILY_DEFS | №0769 |
| FAMILY_NAMES | №0624 (+ 11 других файлов) |
| familyId | №0769 |
| familyOpts | №0769 |
| fangs | №0056 |
| fangsOff | №1269 |
| fans | №1091 |
| fantasy | №1267 |
| fantasySaved | №1267 |
| fApplied | №0774 |
| faq | №0810 |
| FAQ | №0810 |
| far | №0068 (+ 1 других файлов) |
| fat | №0056 |
| fatalHit | №1148 |
| fateMax | №0643 |
| fc | №0068 |
| fd | №0073 |
| fdc | №0774 |
| fdmg | №0774 |
| fearSave | №0774 |
| feat | №0643 (+ 2 других файлов) |
| FEAT_STAT_LABELS | №0740 |
| FEAT_VALID_STATS | №0740 |
| featActionHtml | №0740 |
| featDesc | №0740 |
| featherHead | №0058 |
| featherKind | №0058 |
| featherPart | №0058 |
| featName | №0740 |
| featObj | №0695 (+ 1 других файлов) |
| feats | №0620 (+ 2 других файлов) |
| featsOptions | №0695 |
| feature | №0073 (+ 3 других файлов) |
| FEATURE_DEFS | №0643 |
| FEATURE_TARGET_RULES | №0806 |
| featureDescStr | №0619 (+ 1 других файлов) |
| featureHtml | №0619 (+ 2 других файлов) |
| featureIds | №0656 (+ 1 других файлов) |
| featureIndex | №0656 |
| featureLevel | №0656 |
| featureList | №0708 |
| featureLists | №0643 |
| featureMeta | №0643 |
| featureMod | №0650 |
| featureMode | №0650 |
| features | №0073 (+ 10 других файлов) |
| featuresHtml | №0695 |
| featuresList | №0695 |
| featureStr | №0619 (+ 1 других файлов) |
| fecund | №0774 |
| feet | №0056 (+ 3 других файлов) |
| female | №0057 (+ 5 других файлов) |
| femalePositions | №1071 |
| fer | №0651 |
| ferocity | №1156 |
| fetched | №0837 |
| ff | №0068 (+ 1 других файлов) |
| fgm | №1220 |
| fi | №0056 (+ 3 других файлов) |
| fid | №0643 (+ 4 других файлов) |
| field | №0056 (+ 9 других файлов) |
| fieldLengths | №1117 |
| fields | №1136 (+ 3 других файлов) |
| fiend | №1154 |
| fight | №0813 |
| fighter | №1217 (+ 1 других файлов) |
| fighters | №0814 |
| fightingPack | №0650 |
| fightingResource | №0650 |
| fightingResult | №0650 |
| fightingStyleEffects | №0774 |
| file | №0827 (+ 56 других файлов) |
| fileNo | №1300 |
| filePath | №0863 |
| files | №0664 (+ 10 других файлов) |
| fileUrl | №0884 |
| filter | №0076 (+ 3 других файлов) |
| filteredItems | №0831 |
| filters | №0640 (+ 1 других файлов) |
| filterText | №0740 |
| final | №0774 (+ 1 других файлов) |
| finalAC | №0788 |
| finalAttackTotal | №0767 |
| finalCount | №0667 |
| finalData | №0786 |
| finalName | №0786 |
| finalPropsString | №0786 |
| finalSkillModifier | №0767 |
| finalStats | №0619 (+ 1 других файлов) |
| finalTotal | №0767 (+ 1 других файлов) |
| fingerless | №0056 |
| fins | №0056 |
| finsOff | №1269 |
| fire | №0838 |
| fireFront | №0838 |
| fireRoll | №0073 |
| first | №0053 (+ 9 других файлов) |
| firstFace | №1119 |
| firstVertex | №1119 |
| fit | №0058 (+ 5 других файлов) |
| fitted | №0056 (+ 2 других файлов) |
| fixture | №1088 |
| flags | №0651 |
| flare | №0057 |
| flat | №1091 |
| fleeing | №1127 |
| fleePhone | №1127 |
| flexible | №1068 |
| flexibleInstall | №1068 |
| Float32Array | №1069 (+ 23 других файлов) |
| Float64Array | №1074 (+ 2 других файлов) |
| floor | №0056 (+ 3 других файлов) |
| FLOOR | №0067 |
| floorAttack | №1148 |
| floorHero | №1148 |
| floorHpBefore | №1148 |
| floorMod | №1149 |
| floors | №0071 |
| floorTarget | №1148 (+ 1 других файлов) |
| floorTypes | №0071 |
| flush | №1069 |
| flyer | №1148 |
| fm | №0650 (+ 1 других файлов) |
| fm2 | №1220 |
| fn | №0053 (+ 30 других файлов) |
| focus | №0053 (+ 1 других файлов) |
| focusEl | №0810 |
| focusSources | №0831 |
| foe | №1131 (+ 1 других файлов) |
| fog | №1123 |
| fogShade | №0068 |
| fold | №0056 |
| folder | №1254 |
| folderCases | №1723 |
| folderId | №0807 |
| fontKey | №0827 |
| fontObj | №0827 |
| fontSelect | №0827 |
| fontStyleTag | №0827 |
| foot | №0056 (+ 1 других файлов) |
| footH | №0056 |
| force | №0794 (+ 1 других файлов) |
| forceCrit1 | №0767 |
| forced | №0813 |
| forceSlot | №0839 |
| forearmHigh | №0056 |
| forearmLow | №0056 |
| foreign | №1157 |
| fork | №0056 |
| form | №0056 (+ 5 других файлов) |
| formattedText | №0695 |
| formula | №0636 (+ 3 других файлов) |
| formulaDamage | №0073 |
| formulae | №0073 |
| formulaEffects | №0073 |
| formulaHero | №1068 |
| formulaIds | №0774 |
| formulas | №0636 (+ 1 других файлов) |
| fortifying | №0774 |
| fortune | №0822 |
| forward | №0056 (+ 1 других файлов) |
| found | №0057 (+ 16 других файлов) |
| foundIdx | №0863 |
| foundItemData | №0787 |
| foundProf | №0817 |
| foundWeapon | №0818 (+ 1 других файлов) |
| fov | №0068 |
| fr | №0681 (+ 1 других файлов) |
| fR1 | №0767 (+ 1 других файлов) |
| fR2 | №0767 (+ 1 других файлов) |
| fragHighp | №0068 |
| frame | №0056 (+ 25 других файлов) |
| frameColorSelect | №0827 |
| frameKey | №0827 |
| frames | №1086 |
| frameStyleSelect | №0827 |
| framework | №1140 |
| free | №0056 (+ 2 других файлов) |
| freeGather | №0873 |
| fresh | №0056 (+ 3 других файлов) |
| friend | №1127 (+ 2 других файлов) |
| frill | №0056 |
| from | №0627 (+ 4 других файлов) |
| front | №0054 (+ 4 других файлов) |
| frontal | №0056 |
| frontCount | №0056 |
| frontPlate | №0056 |
| frontTop | №0057 |
| fs | №0058 (+ 226 других файлов) |
| fsave | №0774 |
| fsp | №0881 (+ 1 других файлов) |
| ft | №0774 |
| full | №1103 (+ 1 других файлов) |
| FULL | №0793 |
| FULL_CASTER_SLOTS_TABLE | №0831 |
| FULL_CASTERS | №0822 |
| FULL_SLOTS | №0822 |
| fullCoat | №0058 |
| fullData | №0740 |
| fullPath | №0881 |
| fur | №0058 (+ 1 других файлов) |
| furEnabled | №0058 |
| furryAccessory | №0058 |
| furryLimb | №0058 |
| furrySkull | №0058 |
| furSelect | №0058 |
| fuseMinutes | №0073 |
| fuseRounds | №0073 |
| future | №0058 (+ 1 других файлов) |
| fv | №0774 |
| fx | №0056 (+ 2 других файлов) |
| fy | №0056 (+ 1 других файлов) |
| g | №0054 (+ 151 других файлов) |
| G | №0076 |
| g1 | №0067 |
| gain | №0664 (+ 4 других файлов) |
| gained | №0651 (+ 1 других файлов) |
| gainedHp | №0781 |
| gameplay | №1205 |
| gameTool | №0641 |
| gap | №0057 |
| garment | №0057 |
| garments | №0056 |
| GATE_TOWNS | №0627 |
| gather | №0820 |
| GATHERING_ACTIONS | №0820 |
| gb | №1115 (+ 4 других файлов) |
| gdiag | №1116 (+ 1 других файлов) |
| ge | №0774 |
| gem | №0813 |
| gender | №0057 (+ 7 других файлов) |
| generated | №1178 (+ 1 других файлов) |
| generatedHarvest | №1178 |
| generatedPath | №1724 |
| generation | №0648 |
| GENERIC_SPECIALTIES | №0665 |
| geo | №0054 (+ 24 других файлов) |
| geometryKey | №1078 |
| geoTarget | №0806 |
| gesture | №0058 (+ 1 других файлов) |
| getData | №0708 |
| getStat | №0781 |
| getSub | №0708 |
| ghostBounds | №0058 |
| ghostForbiddenSlots | №0058 |
| ghostShellTarget | №0641 |
| ghostWeapon | №0058 |
| gi | №0650 |
| gills | №0056 |
| git | №1250 (+ 3 других файлов) |
| gl | №0056 (+ 23 других файлов) |
| glb | №1115 (+ 7 других файлов) |
| glbPath | №1107 (+ 6 других файлов) |
| glbVertices | №1119 |
| glen | №0056 |
| global | №0827 (+ 84 других файлов) |
| globalAudio | №0077 |
| glove | №0056 |
| gn | №0774 |
| gname | №0774 |
| gnome | №0061 |
| gob | №1180 |
| gold | №0058 |
| golden | №1723 |
| goldNeeded | №0660 |
| goldOwner | №0814 |
| goldRef | №0814 |
| golemCraft | №1068 |
| golemEntities | №1068 |
| golemEntity | №1068 |
| golemRestore | №1068 |
| good | №0636 (+ 1 других файлов) |
| got | №0074 (+ 2 других файлов) |
| gp | №0785 (+ 7 других файлов) |
| gPerE | №0785 |
| gpInput | №0785 |
| gpVal | №0785 |
| gradle | №0883 |
| graftAC | №0650 |
| graftArmorAttack | №1067 |
| graftArmorTarget | №1067 |
| graftCriticalAttack | №1067 |
| graftCriticalTarget | №1067 |
| graftDef | №0073 |
| graftInstalled | №1068 |
| graftMissingDonor | №1068 |
| graftName | №0073 |
| graftRemoved | №1068 |
| graftResistant | №0650 |
| grafts | №0073 (+ 1 других файлов) |
| grant | №0668 |
| granted | №0073 (+ 1 других файлов) |
| grantMaterial | №0663 |
| gray | №0058 |
| grid | №0827 (+ 7 других файлов) |
| grip | №0056 (+ 1 других файлов) |
| groom | №0056 |
| groove | №0053 |
| ground | №0056 (+ 1 других файлов) |
| group | №0053 (+ 8 других файлов) |
| grouped | №0643 |
| groupedFeats | №0695 |
| groupFeats | №0695 |
| groupKey | №0740 |
| groupKeys | №0817 |
| groupName | №0817 |
| groupOrder | №0740 |
| groupRolls | №0831 |
| groups | №0056 (+ 4 других файлов) |
| groupsMap | №0817 |
| groupTitle | №0786 |
| growth | №1148 |
| growthAttack | №1148 |
| growthTarget | №1148 |
| gs | №1116 |
| guard | №0778 (+ 2 других файлов) |
| guide | №1181 (+ 3 других файлов) |
| guildDesc | №0658 |
| gw | №1304 |
| h | №0054 (+ 127 других файлов) |
| H | №0054 (+ 10 других файлов) |
| h2 | №1217 |
| h3 | №1140 (+ 1 других файлов) |
| h4 | №1217 |
| hab | №0623 |
| habitat | №0058 (+ 1 других файлов) |
| habitats | №0058 |
| hadSpeedZero | №0778 |
| hair | №0054 (+ 2 других файлов) |
| hairLength | №0056 |
| hairProfiles | №0056 |
| hairs | №0056 (+ 1 других файлов) |
| half | №0056 (+ 2 других файлов) |
| HALF_CASTERS | №0822 |
| hand | №0056 (+ 1 других файлов) |
| handle | №0884 |
| handleAdd | №0786 |
| handleAddClick | №0786 |
| handleArmorCatSelect | №0786 |
| handleCatSelect | №0786 |
| handleDel | №0786 |
| handleDiceSelect | №0786 |
| handlePropToggle | №0786 |
| handler | №0837 (+ 1 других файлов) |
| handlers | №0643 (+ 1 других файлов) |
| HANDLERS | №0813 |
| handleTabClick | №0788 |
| handMax | №1081 |
| handoffCalls | №1240 |
| hands | №0056 |
| harness | №1282 |
| harvest | №1168 (+ 1 других файлов) |
| hasActiveModal | №0835 |
| hasAoe | №0806 |
| hasAutoStarted | №0077 |
| hasDex | №0774 |
| hasDice | №0831 |
| hasFirearmsAll | №0818 |
| hasGraft | №0073 |
| hash | №0837 (+ 4 других файлов) |
| hashes | №1088 (+ 6 других файлов) |
| hasMagic | №0831 |
| hasMartialAll | №0818 |
| hasProf | №0868 |
| hasProficiency | №0788 |
| hasSimpleAll | №0818 |
| hasSpecificProf | №0818 |
| hasTool | №0663 (+ 2 других файлов) |
| hasUV | №0058 |
| hat | №0056 (+ 4 других файлов) |
| have | №0660 (+ 1 других файлов) |
| hay | №0788 (+ 1 других файлов) |
| haymaker | №1148 |
| hayTarget | №1148 |
| hb | №1115 (+ 4 других файлов) |
| hCls | №0831 |
| hctx | №1240 |
| hd | №0808 (+ 1 других файлов) |
| hdiag | №1121 |
| head | №0053 (+ 5 других файлов) |
| HEAD_AXES | №0061 |
| HEAD_FORMS | №0061 |
| HEAD_STYLES | №0061 |
| header | №0822 (+ 1 других файлов) |
| headerAC | №0078 |
| headers | №0648 (+ 2 других файлов) |
| heading | №0767 |
| headMax | №1081 |
| heal | №0774 (+ 2 других файлов) |
| heal2 | №0774 |
| healAmount | №0814 |
| healBatch | №1240 |
| healCaster | №0814 |
| healDeclared | №0814 |
| healed | №0073 (+ 9 других файлов) |
| healer | №0636 |
| healEventId | №0814 |
| healing | №0866 (+ 2 других файлов) |
| healingActors | №0814 |
| healingRedirect | №0650 |
| healingResult | №0650 |
| healMap | №0073 |
| healNoUndead | №0814 |
| healOriginal | №0814 |
| healRange | №0814 |
| healRoll | №0073 |
| healSight | №0814 |
| healTarget | №1240 |
| healv | №0643 |
| heatDamage | №1068 |
| heatMode | №0073 |
| height | №0056 (+ 6 других файлов) |
| heights | №1150 |
| held | №1127 (+ 2 других файлов) |
| heldName | №1129 |
| help | №0810 |
| hem | №0057 |
| hemoragent | №1068 |
| hemoragentNoPool | №1068 |
| hermit | №1127 |
| hermitHero | №1127 |
| hero | №0781 (+ 50 других файлов) |
| heroClassNames | №0831 |
| heroes | №1094 |
| heroFeats | №0740 |
| heroFeatsRef | №0740 |
| heroIsExtra | №0695 |
| heroLevel | №0656 |
| heroLevels | №0800 |
| hex | №0057 (+ 3 других файлов) |
| hi | №0056 (+ 10 других файлов) |
| hidden | №0075 (+ 1 других файлов) |
| hiddenBuckets | №0056 |
| high | №0056 (+ 5 других файлов) |
| highlight | №0058 |
| hint | №0058 |
| hip | №0056 (+ 1 других файлов) |
| hipCenter | №0057 |
| hipMax | №0057 |
| hipMin | №0057 |
| hipRadius | №0057 |
| history | №0058 (+ 4 других файлов) |
| hit | №0650 (+ 14 других файлов) |
| HIT_COST | №0798 |
| hitDie | №0688 (+ 2 других файлов) |
| hitDieMax | №0781 |
| hiX | №0056 |
| hiY | №0056 |
| hm | №1115 (+ 7 других файлов) |
| hole | №0056 |
| holeCounts | №0053 |
| holes | №0056 |
| holeVertices | №0053 |
| hollowHp | №0650 |
| holyAttack | №1068 |
| homebrewClasses | №1247 |
| homunculusCraft | №1068 |
| homunculusEntities | №1068 |
| homunculusOwner | №0650 (+ 1 других файлов) |
| homunculusState | №0650 |
| hood | №0053 (+ 1 других файлов) |
| hoof | №1089 |
| hoofScale | №0056 |
| hoofY | №0056 |
| hook | №0056 |
| hooks | №1067 (+ 3 других файлов) |
| HORN_STYLES | №0061 |
| hornAttack | №1068 |
| hornInstall | №1068 |
| hornPart | №0056 |
| horns | №0056 (+ 1 других файлов) |
| hornSelect | №0058 |
| hornSize | №1096 |
| hornStyle | №0056 (+ 1 других файлов) |
| horror | №0624 (+ 1 других файлов) |
| horseY | №0056 |
| hosiery | №0058 |
| hosieryDen | №1080 |
| host | №0076 (+ 24 других файлов) |
| hostBox | №0805 |
| hostDestroyed | №0811 |
| hostiles | №0651 (+ 1 других файлов) |
| houndHP | №0774 |
| houndTemplate | №0774 |
| howlTargets | №0636 |
| hp | №0073 (+ 22 других файлов) |
| hpAfter | №1214 |
| hpAfterTick | №1067 |
| hpBefore | №1127 |
| hpBeforeShift | №1157 |
| hpCurrentInput | №0695 (+ 1 других файлов) |
| hpDamage | №0650 |
| hpGain | №0695 |
| hpMax | №0642 (+ 1 других файлов) |
| hpMaxInput | №0695 (+ 1 других файлов) |
| hpNow | №0774 |
| hpObj | №0073 |
| hpRes | №0695 |
| hpShape | №1148 |
| hs | №1116 |
| html | №0077 (+ 51 других файлов) |
| http | №1259 (+ 37 других файлов) |
| hud | №1190 (+ 1 других файлов) |
| hugeHands | №1068 |
| human | №1070 (+ 2 других файлов) |
| hunter | №1223 |
| hv | №1178 |
| hx | №0774 |
| hy | №0056 |
| hybrid | №0774 |
| i | №0054 (+ 178 других файлов) |
| ia | №1116 (+ 2 других файлов) |
| ib | №0063 |
| icon | №0787 (+ 3 других файлов) |
| iconEl | №0787 |
| iconId | №0827 (+ 3 других файлов) |
| iconPath | №0881 |
| ICONS | №0827 (+ 2 других файлов) |
| id | №0054 (+ 152 других файлов) |
| ID | №0830 (+ 1 других файлов) |
| idat | №1093 |
| identity | №0068 (+ 1 других файлов) |
| idName | №0740 |
| idOrName | №0667 |
| ids | №0053 (+ 32 других файлов) |
| idv | №0064 (+ 1 других файлов) |
| idx | №0058 (+ 30 других файлов) |
| ignoreTarot | №0822 |
| ignoreWeight | №0784 |
| ii | №1116 (+ 1 других файлов) |
| illIds | №1156 |
| illusion | №0813 (+ 1 других файлов) |
| im | №0064 (+ 3 других файлов) |
| Image | №1069 |
| images | №1069 |
| img | №0058 (+ 3 других файлов) |
| IMG | №0067 |
| imitation | №0073 |
| immune | №0813 (+ 3 других файлов) |
| immuneCharm | №0774 |
| immuneFire | №1067 |
| immuneUntil | №0650 |
| immunity | №0636 |
| importDocument | №1724 |
| imported | №1111 |
| improved | №0798 |
| inCombat | №0636 |
| incoming | №1104 (+ 1 других файлов) |
| incomingType | №0650 |
| incompatible | №0058 |
| indent | №0784 |
| index | №0053 (+ 26 других файлов) |
| indexed | №0788 |
| indices | №0053 (+ 4 других файлов) |
| Infinity | №0056 (+ 8 других файлов) |
| influence | №0053 |
| influences | №0053 |
| info | №0646 (+ 3 других файлов) |
| infoBox | №0819 |
| infoText | №0787 |
| ing | №0074 (+ 2 других файлов) |
| INGREDIENT_SOURCES | №0076 |
| INGREDIENTS | №0074 |
| ings | №0074 (+ 1 других файлов) |
| ini | №0806 |
| initElem | №0619 (+ 1 других файлов) |
| initial | №1069 (+ 2 других файлов) |
| initialAngle | №0057 |
| initialId | №1069 |
| initialProficiencies | №0641 |
| initialSkillsData | №0619 (+ 1 других файлов) |
| initiative | №0768 (+ 1 других файлов) |
| inline | №0064 |
| inner | №0053 (+ 1 других файлов) |
| innerDivs | №0817 |
| innerHtml | №0831 |
| innerList | №0788 |
| inp | №0786 |
| input | №0054 (+ 23 других файлов) |
| inputColEP | №0785 |
| inputColPP | №0785 |
| inputCopper | №0785 |
| inputElem | №0775 (+ 1 других файлов) |
| inputField | №0787 |
| inputGrid | №0785 |
| inputId | №0821 |
| inputs | №1094 |
| inputVal | №0775 |
| ins | №0774 |
| INS | №0823 |
| inside | №0806 |
| insight | №0073 |
| inspect | №0074 |
| inspectOnly | №0813 |
| inspired | №1127 |
| inspiredPhone | №1127 |
| installed | №0655 (+ 1 других файлов) |
| installedGrafts | №0073 |
| instantDeath | №0650 |
| int | №0623 (+ 10 других файлов) |
| Int16Array | №1071 (+ 21 других файлов) |
| Int8Array | №1071 (+ 21 других файлов) |
| internal | №0774 |
| interrupted | №0768 (+ 1 других файлов) |
| intervalVal | №0863 |
| intMod | №0619 (+ 5 других файлов) |
| inv | №0053 (+ 14 других файлов) |
| invalidDead | №1068 |
| inventory | №0818 (+ 1 других файлов) |
| INVENTORY_CATEGORIES | №0813 |
| inventoryCases | №1723 |
| inventoryPC | №1127 |
| inventoryPhone | №1127 |
| inventoryRoster | №1127 |
| inventorySearchState | №0788 |
| inventoryServer | №1127 |
| inverted | №1127 |
| invertedPhone | №1127 |
| invHeaderACEl | №0788 |
| invis | №1068 |
| invisibleAttacker | №1067 |
| invisUsed | №0650 |
| invokeOptions | №0774 |
| invSrc | №1200 |
| ioff | №0064 |
| ionizer | №1068 |
| ionizerClass | №0650 |
| ionizerEngineer | №1068 |
| ionizerTarget | №1067 |
| ip | №0641 |
| ipcMain | №0881 |
| ipcRenderer | №0882 |
| ir | №0064 (+ 1 других файлов) |
| ironChinAttack | №1148 |
| ironChinTarget | №1148 |
| irregular | №0056 |
| is | №1116 |
| isActionProcessed | №0786 |
| isActive | №0863 (+ 1 других файлов) |
| isAlreadyHas | №0817 |
| isAsiLevel | №0695 |
| isAttackOrCheck | №0767 |
| isAutoOn | №0863 |
| isAvailable | №0831 |
| isBlood | №0806 |
| isBomb | №0073 |
| isChecked | №0619 (+ 4 других файлов) |
| isCrit | №0831 |
| isDead | №0073 |
| isDebug | №0827 |
| isDebugEnabled | №0766 |
| isDestroyed | №0792 |
| isDrawerOpen | №0767 |
| isEnabled | №0827 (+ 1 других файлов) |
| isExpert | №0767 |
| isExtraHero | №0695 |
| isFinesse | №0767 |
| isFinger | №0056 |
| isFinite | №1165 (+ 15 других файлов) |
| isFirearm | №0818 |
| isFree | №0839 |
| isGhost | №0641 (+ 1 других файлов) |
| isGhostExtra | №0641 |
| isGhostHero | №0695 |
| isGrouped | №0786 |
| isHeavyOrExceeds | №0787 |
| isHero | №0768 |
| isHidden | №0788 |
| isInterfaceHidden | №0863 |
| isize | №0064 |
| isLandscape | №0881 |
| isLeft | №0054 |
| isMartial | №0818 |
| isMoreStep | №0810 |
| isNewClass | №0695 (+ 1 других файлов) |
| isolated | №1249 |
| isolatedFound | №1249 |
| isolatedLegacy | №1249 |
| isOverLimit | №0831 |
| isOverweight | №0787 |
| isParasite | №0641 (+ 1 других файлов) |
| isParasiteExtra | №0641 |
| isParasiteHero | №0695 |
| isPhbA | №0831 |
| isPlayingAmbience | №0077 |
| isPOT | №0068 |
| isPrepared | №0831 |
| isProf | №0619 (+ 2 других файлов) |
| isProficient | №0767 |
| isRanged | №0767 |
| isRepeatOneOn | №0077 |
| isRight | №0054 |
| isRite | №0636 |
| isRowActionProcessed | №0786 |
| isSelected | №0077 (+ 1 других файлов) |
| isShield | №0788 |
| isShuffleOn | №0077 |
| isSimple | №0818 |
| isSuccess | №0767 |
| issues | №0667 |
| isSwarm | №0641 (+ 1 других файлов) |
| isSwarmExtra | №0641 |
| isSwarmHero | №0695 |
| isWalterHero | №0695 |
| isWalterParasite | №0641 (+ 1 других файлов) |
| isWalterParasiteExtra | №0641 |
| isWalterParasiteHero | №0695 |
| it | №0660 (+ 4 других файлов) |
| item | №0057 (+ 38 других файлов) |
| itemArray | №0787 |
| itemCards | №0787 |
| itemCategory | №0788 |
| itemData | №0787 (+ 1 других файлов) |
| itemId | №0794 (+ 2 других файлов) |
| itemName | №0788 |
| itemRegistry | №0787 |
| items | №0056 (+ 14 других файлов) |
| iterations | №0815 |
| iv | №0064 (+ 3 других файлов) |
| iw | №0774 (+ 1 других файлов) |
| ix | №0053 (+ 3 других файлов) |
| j | №0053 (+ 24 других файлов) |
| J | №0056 |
| jaw | №0056 |
| jb | №1113 (+ 1 других файлов) |
| jh | №1113 (+ 1 других файлов) |
| ji | №0063 |
| jinx | №0650 |
| job | №0813 |
| joinBox | №0805 |
| jointIds | №1083 |
| joints | №0053 (+ 4 других файлов) |
| journal | №0850 (+ 1 других файлов) |
| JOURNAL | №0648 (+ 1 других файлов) |
| jp | №1113 |
| jpad | №1256 |
| JSDOM | №1122 |
| json | №0064 (+ 12 других файлов) |
| JSON | №0658 (+ 55 других файлов) |
| jsonBytes | №1107 |
| jsonBytes0 | №1107 |
| jsonPad | №1107 |
| k | №0054 (+ 111 других файлов) |
| K | №0063 (+ 1 других файлов) |
| keep | №0056 (+ 4 других файлов) |
| keepConditions | №0073 |
| keepEffects | №0073 |
| keepFaces | №0053 |
| keepResistance | №0073 |
| key | №0056 (+ 63 других файлов) |
| KEY | №0055 (+ 20 других файлов) |
| keyName | №0073 |
| keys | №0056 (+ 6 других файлов) |
| kg | №0786 |
| kgInput | №0786 |
| killer | №0778 |
| kind | №0056 (+ 20 других файлов) |
| kinds | №0813 (+ 1 других файлов) |
| kingAlly | №0814 |
| kingEnemy | №1129 |
| kingSelect | №1129 |
| knee | №0056 |
| kneeHigh | №0056 |
| kneeLine | №0056 |
| kneeLow | №0056 |
| knockout | №1148 |
| knockoutHero | №1148 |
| knockoutTarget | №1148 |
| knot | №0058 |
| known | №0073 (+ 8 других файлов) |
| KNOWN | №0823 (+ 1 других файлов) |
| knownCantrips | №0073 |
| knownFormula | №0774 |
| knownProcessed | №0668 |
| knownSpell | №1159 |
| ko | №0774 |
| koMod | №1149 |
| koRoll | №0774 |
| koTarget | №1149 |
| l | №0056 (+ 44 других файлов) |
| L | №0053 (+ 2 других файлов) |
| la | №0806 |
| label | №0058 (+ 10 других файлов) |
| labels | №0058 (+ 2 других файлов) |
| LABELS | №0866 |
| lamp | №1123 |
| landed | №1127 |
| landscape | №0881 (+ 1 других файлов) |
| langCount | №0641 |
| langs | №0823 |
| LANGS | №0823 |
| langStr | №0641 |
| langText | №0819 |
| larva | №0056 (+ 1 других файлов) |
| larvaBounds | №0058 |
| larval | №0058 |
| last | №0053 (+ 7 других файлов) |
| lastError | №0058 |
| lastFace | №1119 |
| lastResult | №0796 |
| lastRow | №1093 |
| lastTap | №0792 |
| lastVertex | №1119 |
| late | №1069 |
| latitude | №0053 |
| latitudes | №0053 |
| launchTour | №0810 |
| layer | №0056 |
| layout | №1267 (+ 1 других файлов) |
| lazarusOwner | №1068 |
| lbs | №0786 |
| le | №0860 |
| lead | №0771 (+ 1 других файлов) |
| leaf | №0058 |
| leafSize | №1115 |
| lean | №0056 |
| learned | №0665 |
| leather | №0058 |
| leatherQty | №0658 |
| leaving | №1129 |
| leavingReach | №0814 |
| left | №0057 (+ 13 других файлов) |
| leftReaction | №0650 |
| leg | №0056 (+ 1 других файлов) |
| legacy | №0818 (+ 9 других файлов) |
| legacyCount | №1305 |
| legacyCurses | №0072 |
| legacyHuman | №1070 |
| legacyPact | №0793 |
| legacyUrl | №1249 |
| legend | №0058 |
| legPhase | №0056 |
| len | №0056 (+ 12 других файлов) |
| length | №0053 (+ 2 других файлов) |
| lengths | №1118 |
| level | №0053 (+ 39 других файлов) |
| level1 | №0773 |
| levelData | №0695 (+ 1 других файлов) |
| levelDisplays | №0695 |
| levelFilter | №0831 |
| levelFour | №1068 |
| levelInput | №0826 |
| levelInputs | №0695 |
| levelOk | №0831 |
| levelReq | №0774 |
| levels | №0670 (+ 23 других файлов) |
| LEVELS | №0665 |
| levelSources | №0831 |
| levelSpells | №0831 |
| levelUp | №1094 |
| levelUpBtn | №0775 |
| levelUpSrc | №1200 |
| levelVal | №0831 |
| li | №0067 (+ 1 других файлов) |
| lie | №1147 |
| lifecycle | №0788 |
| lift | №0056 |
| light | №0068 |
| lightArmor | №0650 |
| lightFloor | №0068 |
| lightLimitKg | №0787 |
| lightLimitLb | №0787 |
| lights | №0066 |
| lim | №0813 |
| limbRanges | №0056 |
| limbSamples | №0056 |
| limbSelect | №0058 |
| limit | №0056 (+ 3 других файлов) |
| limits | №0058 |
| limitStr | №0787 |
| line | №0056 (+ 8 других файлов) |
| lineno | №0766 |
| lines | №0822 |
| lingerie | №0057 |
| lingerieAtlas | №0057 |
| link | №0792 (+ 1 других файлов) |
| linked | №1127 |
| linkedPhone | №1127 |
| links | №0053 (+ 1 других файлов) |
| lip | №0056 |
| list | №0055 (+ 41 других файлов) |
| listContainer | №0077 (+ 2 других файлов) |
| listContainers | №0784 |
| listener | №0882 |
| listeners | №0648 (+ 1 других файлов) |
| lit | №1123 |
| lItem | №0641 |
| live | №0058 (+ 6 других файлов) |
| LIVE_PROGRESSION_KEYS | №0644 |
| liveFoe | №1131 |
| liveKey | №0644 |
| livePC | №1127 |
| livePhone | №1127 |
| liveRoot | №0881 |
| liveServer | №1127 |
| liveSnake | №1127 |
| lo | №0056 (+ 7 других файлов) |
| LOAD_FILES | №0658 |
| loader | №1108 |
| lobe | №0056 |
| loc | №1069 |
| local | №0056 (+ 5 других файлов) |
| localData | №0827 |
| localId | №0648 |
| localStorage | №1111 |
| location | №0813 |
| lock | №0881 |
| locked | №0664 (+ 1 других файлов) |
| locks | №0056 (+ 1 других файлов) |
| logBox | №0766 |
| logContainer | №0767 |
| logContent | №0785 |
| logDiv | №0785 |
| logItem | №0767 |
| logLine | №0766 |
| logs | №0827 |
| logText | №0767 (+ 1 других файлов) |
| long | №0058 (+ 1 других файлов) |
| longFired | №0858 |
| longitude | №0053 |
| longTimer | №0858 |
| looksLikeModal | №0827 |
| lookup | №0056 |
| loop | №0053 |
| loot | №0622 (+ 18 других файлов) |
| LOOT_MODELS | №0801 |
| los | №0651 (+ 1 других файлов) |
| loss | №0636 (+ 1 других файлов) |
| low | №0056 (+ 6 других файлов) |
| lower | №0054 (+ 4 других файлов) |
| lowerId | №0057 |
| lowerJaw | №0056 |
| lowerLang | №0641 |
| lowerName | №0619 |
| lowerOptions | №0057 |
| lowerTool | №0641 |
| lowest | №0053 |
| loX | №0056 |
| loY | №0056 |
| lr | №0806 (+ 1 других файлов) |
| ls | №0068 (+ 2 других файлов) |
| lv | №0073 (+ 1 других файлов) |
| lvl | №0781 (+ 8 других файлов) |
| lvl1Options | №0641 |
| lvlA | №0831 |
| lvlB | №0831 |
| lvlBadge | №0831 |
| lvlDisplay | №0827 |
| lvlInput | №0827 |
| lx | №0067 |
| Lx | №0067 |
| ly | №0067 |
| Ly | №0067 |
| m | №0054 (+ 102 других файлов) |
| M | №0065 (+ 8 других файлов) |
| m0 | №1069 |
| m1 | №0669 (+ 1 других файлов) |
| m2 | №0669 |
| macro | №1304 |
| macroFile | №1304 |
| macros | №1113 (+ 2 других файлов) |
| madBomber | №0650 |
| mag | №0058 (+ 1 других файлов) |
| MAGE_CATALOG_AUDITED | №0813 |
| MAGE_HANDLERS | №0813 |
| MAGE_LEVEL2 | №0813 |
| mageActors | №0814 |
| mageApi | №0814 |
| mageBack | №1127 |
| mageBerryCount | №0814 |
| mageCon | №1127 |
| mageDarts | №0814 (+ 1 других файлов) |
| mageGround | №0814 |
| magePC | №1127 |
| magePending | №0814 |
| magePhone | №1127 |
| mageRoster | №1127 |
| mageSelect | №1129 |
| mageServer | №1127 |
| mageSpell | №0814 |
| mageStat | №0814 |
| mageTargets | №0814 |
| mageType | №0814 |
| mageWilling | №0814 |
| magic | №1200 |
| magicFistHero | №1148 |
| magicHit | №1148 |
| main | №0057 |
| mainCard | №0767 |
| mainWindow | №0881 |
| major | №1127 |
| MAJOR_ACTIONS | №0813 |
| MAJORS | №0816 |
| male | №1088 |
| malePositions | №1069 |
| maleRef | №1088 |
| malformed | №1074 (+ 3 других файлов) |
| manager | №1248 |
| manifest | №0790 (+ 4 других файлов) |
| manifestPath | №0884 (+ 1 других файлов) |
| manifestUrl | №0837 |
| manual | №1075 (+ 1 других файлов) |
| map | №0056 (+ 25 других файлов) |
| Map | №1109 (+ 5 других файлов) |
| mapPaths | №1724 |
| mapped | №0774 |
| mapping | №0056 (+ 1 других файлов) |
| maps | №0866 (+ 1 других файлов) |
| mapToVar | №0829 |
| mark | №0636 (+ 1 других файлов) |
| market | №0795 (+ 2 других файлов) |
| mask | №0054 (+ 2 других файлов) |
| MASS_HARVEST_MATERIALS | №0801 |
| master | №0660 (+ 2 других файлов) |
| mastery | №0806 |
| masteryNames | №0806 |
| mat | №0057 (+ 8 других файлов) |
| match | №0775 (+ 6 других файлов) |
| matches | №0643 (+ 2 других файлов) |
| material | №0057 (+ 2 других файлов) |
| MATERIAL_BRIDGE | №0801 |
| MATERIAL_DEFS | №0667 |
| materialCells | №0057 |
| materialIds | №0667 |
| materials | №0057 (+ 3 других файлов) |
| MATERIALS | №0662 (+ 2 других файлов) |
| math | №1094 (+ 2 других файлов) |
| Math | №1067 (+ 63 других файлов) |
| matrices | №0053 (+ 1 других файлов) |
| matrix | №0053 (+ 1 других файлов) |
| mats | №0659 (+ 6 других файлов) |
| max | №0056 (+ 37 других файлов) |
| MAX | №0798 (+ 3 других файлов) |
| MAX_CR | №0828 |
| MAX_DEPTH | №0784 |
| MAX_ERRORS | №0848 |
| MAX_FILES | №0884 |
| MAX_PLAYERS | №0805 |
| MAX_TOTAL_BYTES | №0884 |
| max2 | №0808 |
| maxAllowedLevel | №0831 |
| maxAt | №1139 |
| maxBuilder | №1094 |
| maxCapacityKg | №0787 (+ 1 других файлов) |
| maxCapacityLb | №0787 |
| maxDisplacement | №1112 |
| maxDistance | №1083 |
| maxFaces | №0053 (+ 1 других файлов) |
| maxHero | №1127 |
| maxHit | №1127 |
| maxHp | №0619 (+ 3 других файлов) |
| maxHP | №0864 |
| maximize | №0650 |
| maximum | №0650 (+ 2 других файлов) |
| maxIndex | №1119 |
| maxLevel | №0831 |
| maxOutside | №1256 |
| maxPrepared | №0831 |
| maxRestore | №0643 |
| maxRoll | №1094 |
| maxSpell | №0830 |
| maxSteps | №0651 |
| maxTargets | №1114 |
| maxTex | №0068 |
| maxUses | №0649 (+ 1 других файлов) |
| maxVal | №0831 |
| maxVertices | №0058 (+ 6 других файлов) |
| maxX | №0066 |
| maxY | №0066 |
| MC1 | №0625 |
| mctx | №1241 (+ 1 других файлов) |
| MCV2 | №0626 |
| md | №0068 (+ 2 других файлов) |
| me | №0064 (+ 1 других файлов) |
| mean | №0053 (+ 6 других файлов) |
| meanUniform | №1093 |
| mechanics | №0828 |
| MECHANICS | №0072 (+ 2 других файлов) |
| medium | №0636 |
| mediumLimitKg | №0787 |
| mediumLimitLb | №0787 |
| members | №0813 |
| memory | №1076 |
| mental | №0779 (+ 1 других файлов) |
| menu | №0810 |
| merged | №0058 (+ 1 других файлов) |
| mesh | №0056 (+ 4 других файлов) |
| meshes | №0064 (+ 2 других файлов) |
| message | №0058 (+ 18 других файлов) |
| messages | №0069 |
| meta | №0059 (+ 7 других файлов) |
| META_COST | №0643 |
| META_NAMES | №0643 |
| METAS | №0072 |
| method | №0648 |
| mettle | №0650 |
| mh | №0056 (+ 5 других файлов) |
| mi | №0064 (+ 2 других файлов) |
| microEntry | №0058 |
| mid | №0056 (+ 1 других файлов) |
| middles | №0053 |
| migrated | №0806 |
| mimeTypes | №0881 |
| min | №0056 (+ 7 других файлов) |
| minBuilder | №1094 |
| mind | №0811 |
| minimumLevel | №0643 |
| minIndex | №1119 |
| minor | №1140 |
| MINOR_ACTIONS | №0813 |
| mins | №0863 |
| minutes | №0863 (+ 1 других файлов) |
| minutesSinceDeath | №0073 |
| minutesVal | №0863 |
| minVal | №0781 |
| minX | №0066 |
| minY | №0066 |
| miss | №1143 |
| missArena | №1148 |
| missedKnockoutHero | №1148 |
| missedKnockoutTarget | №1148 |
| misses | №1115 (+ 3 других файлов) |
| missing | №0659 (+ 10 других файлов) |
| missingReliefRoll | №1068 |
| missingTools | №0667 |
| missTarget | №1148 |
| mix | №0074 (+ 1 других файлов) |
| mixed | №1071 (+ 1 других файлов) |
| mj | №0774 |
| ml | №0056 |
| mm | №0068 (+ 2 других файлов) |
| mn | №0076 (+ 7 других файлов) |
| mo | №0068 |
| mob | №1127 |
| mobile | №1127 |
| mobileArmor | №1127 |
| mobileArmored | №1127 |
| mobileArtisan | №1127 |
| mobileBerry | №1127 |
| mobileBurden | №1127 |
| mobileDarts | №1127 |
| mobileDash | №1127 |
| mobileIllusion | №1127 |
| mobileMage | №1127 |
| mobilePoison | №1127 |
| mobileQueen | №1127 |
| mobileRange | №0068 |
| mobileSnake | №1127 |
| mobileStand | №1127 |
| mod | №0619 (+ 9 других файлов) |
| modal | №0077 (+ 13 других файлов) |
| modalColorOptions | №0863 |
| modalHTML | №0695 |
| modals | №0788 |
| modDisplay | №0767 (+ 1 других файлов) |
| mode | №0065 (+ 21 других файлов) |
| modeButtons | №0767 |
| model | №0801 (+ 2 других файлов) |
| models | №1724 |
| modeRadio | №0642 |
| modes | №1146 (+ 2 других файлов) |
| modeSelect | №0786 |
| modifier | №0649 (+ 1 других файлов) |
| modifierMatch | №0767 |
| modifiers | №1148 |
| MODIFIERS | №0669 |
| modMatches | №0831 |
| modName | №0767 |
| modNum | №0619 (+ 1 других файлов) |
| mods | №0650 (+ 5 других файлов) |
| modSourceLabel | №0767 |
| modStr | №0619 (+ 3 других файлов) |
| modTag | №0619 (+ 1 других файлов) |
| modules | №1047 (+ 37 других файлов) |
| modVal | №0767 (+ 1 других файлов) |
| monk | №1213 (+ 1 других файлов) |
| monster | №0800 (+ 2 других файлов) |
| MONSTER_RECIPES | №0801 |
| monsterCount | №0800 |
| monsterId | №0806 |
| monsterName | №0802 (+ 1 других файлов) |
| monsters | №0622 (+ 13 других файлов) |
| MONSTERS | №0650 |
| monsterSrc | №1221 |
| monstrousGrafts | №0073 |
| morph | №1115 (+ 2 других файлов) |
| morphBytes | №1107 |
| morphed | №1070 |
| morphName | №1107 |
| morphOffset | №1107 |
| morphPrimitives | №1110 (+ 1 других файлов) |
| morphTargets | №1110 |
| motion | №0058 |
| motionBack | №1127 |
| motionPC | №1127 |
| motionPhone | №1127 |
| motionRoster | №1127 |
| motionServer | №1127 |
| mouth | №0056 |
| mouthDistance | №0056 |
| mouthRadius | №0056 |
| mouthRY | №0056 |
| mouthY | №0056 |
| move | №0065 (+ 1 других файлов) |
| moved | №0858 (+ 3 других файлов) |
| moveExtraPanelsIntoDrawer | №0767 |
| moveHero | №1127 |
| moveId | №1134 |
| moveItemToContainer | №0784 |
| movement | №0069 |
| movePC | №1127 |
| movePhone | №1127 |
| moveRoster | №1127 |
| movers | №0813 |
| moveServer | №1127 |
| moving | №0056 |
| moxie | №0774 |
| moxieBeforeMiss | №1148 |
| mp | №0643 (+ 2 других файлов) |
| mr | №0643 (+ 2 других файлов) |
| mrko | №0774 |
| ms | №0064 (+ 2 других файлов) |
| msg | №0827 (+ 11 других файлов) |
| msgEl | №0787 |
| mult | №0619 (+ 5 других файлов) |
| multi2 | №0664 |
| MULTICLASS_PROFICIENCIES_2014 | №0708 |
| MULTICLASS_REQUIREMENTS | №0781 |
| MULTIPLIER | №0800 |
| multiRules | №0695 |
| mults | №0785 |
| muscle | №0056 |
| mutableHit | №1067 |
| mutableTarget | №1067 |
| mutagenAbility | №0073 |
| mutagenAlly | №1068 |
| mutagenHero | №1068 |
| mutagenist | №1068 |
| mutagenNames | №0636 |
| mutagenResult | №1068 |
| mutagens | №0636 |
| mutatedCap | №0073 |
| MUTATION_SLOTS | №0811 (+ 1 других файлов) |
| mutations | №0787 (+ 4 других файлов) |
| mutCreated | №0774 |
| muts | №0834 |
| muzzle | №0056 (+ 3 других файлов) |
| mv | №0651 |
| mw | №0056 |
| mx | №0068 (+ 6 других файлов) |
| my | №0068 (+ 1 других файлов) |
| mysteries | №0808 |
| mythic | №1157 (+ 1 других файлов) |
| n | №0054 (+ 144 других файлов) |
| N | №0053 (+ 3 других файлов) |
| n2 | №1244 |
| nailLen | №0056 |
| name | №0054 (+ 167 других файлов) |
| NAME | №0830 (+ 1 других файлов) |
| NAME_ALIASES | №0797 |
| name2 | №0774 |
| nameA | №0831 |
| nameB | №0831 |
| nameInp | №0786 |
| nameInput | №0619 (+ 2 других файлов) |
| nameLower | №0767 |
| nameRu | №1247 |
| names | №0054 (+ 23 других файлов) |
| NAMES | №0623 (+ 12 других файлов) |
| nameSpan | №0788 (+ 1 других файлов) |
| NaN | №1157 |
| native | №0837 (+ 1 других файлов) |
| nativeBridge | №0805 |
| nativeClear | №0648 |
| nativePacketSeq | №0805 |
| nativeRemove | №0648 |
| nativeSeenSeqByPeer | №0805 |
| nativeSet | №0648 |
| nativeVersion | №0837 |
| natural | №0828 |
| naturalAttack | №1157 |
| naturalGrafts | №0073 |
| naturalTwenty | №0650 |
| nb | №0056 |
| nctx | №1240 |
| ne | №1216 (+ 7 других файлов) |
| near | №0053 (+ 2 других файлов) |
| nearest | №0651 (+ 1 других файлов) |
| nearestAt | №0056 |
| nearestDist | №0651 |
| neck | №0056 |
| neckDrop | №0057 |
| neckFront | №0057 |
| neckIndices | №0056 |
| neckMap | №0056 |
| neckNormals | №0056 |
| neckZ | №0056 |
| necromanticRevival | №0650 |
| necrotic | №0650 |
| needsSave | №0650 |
| needsSubclassChoice | №0695 |
| needsTarget | №0774 |
| net | №0768 (+ 4 других файлов) |
| neutral | №1071 (+ 3 других файлов) |
| newChar | №0619 (+ 1 других файлов) |
| newcomer | №1140 (+ 1 других файлов) |
| newCount | №0788 |
| newCp | №0785 |
| newEntry | №0791 |
| newEp | №0785 |
| newFolder | №0807 |
| newGp | №0785 |
| newId | №0619 (+ 2 других файлов) |
| newLevel | №0826 (+ 1 других файлов) |
| newLvl | №0827 |
| newMax | №0695 |
| newPeer | №1234 |
| newPp | №0785 |
| newRace | №0819 |
| newSp | №0785 |
| newSpell | №0831 |
| newTemp | №0073 |
| newTotalLevel | №0695 |
| newVal | №0619 (+ 2 других файлов) |
| newVol | №0077 |
| next | №0053 (+ 18 других файлов) |
| nextHp | №0073 |
| nextLevel | №0695 |
| nextLevelExpReq | №0775 |
| nextRemaining | №0073 |
| nf | №0068 |
| ng | №1235 (+ 2 других файлов) |
| ni | №0056 (+ 2 других файлов) |
| nk | №0056 (+ 1 других файлов) |
| nl | №0056 |
| nm | №0860 |
| nn | №1115 (+ 3 других файлов) |
| nnx | №0056 |
| nnz | №0056 |
| no | №1163 |
| noChoice | №1068 |
| noClaws | №1089 |
| node | №0827 (+ 5 других файлов) |
| nodes | №0054 (+ 8 других файлов) |
| NODES | №0873 |
| noEars | №1091 |
| noGlow | №1269 |
| none | №0058 (+ 2 других файлов) |
| nonmagicalResistance | №0650 |
| nonmagicalVariants | №0650 |
| nonZero | №1115 (+ 2 других файлов) |
| nonzeroSource | №1118 |
| noRefill | №1127 |
| noReliefTarget | №1068 |
| noRiteDice | №1154 |
| norm | №0053 (+ 2 других файлов) |
| normal | №0056 (+ 5 других файлов) |
| normalAC | №0650 |
| normalizeClassKey | №0695 |
| normalized | №0708 (+ 3 других файлов) |
| normalizedCondition | №0650 |
| normalizedCurrentClass | №0695 |
| normalizedRequested | №0695 |
| normalizeLevelUpClassName | №0695 |
| normalizeYield | №0821 |
| normalRaceLabel | №0641 |
| normals | №0053 (+ 1 других файлов) |
| nose | №0056 |
| noseDepth | №0056 |
| nosePart | №0056 |
| noseTop | №0056 |
| noseWidth | №0056 |
| noseY | №0056 |
| noseZ | №0056 |
| nostril | №0056 |
| nostrils | №0056 |
| note | №0650 (+ 2 других файлов) |
| noteCase | №1723 |
| noteInput | №1723 |
| now | №0056 (+ 5 других файлов) |
| np | №0056 |
| npot | №0068 |
| null | №0827 (+ 15 других файлов) |
| num | №0781 (+ 1 других файлов) |
| Number | №0658 (+ 25 других файлов) |
| numbers | №0057 |
| nums | №0806 |
| nw | №0774 |
| nx | №0056 (+ 1 других файлов) |
| ny | №0053 (+ 1 других файлов) |
| nylon | №0058 |
| nz | №0053 (+ 2 других файлов) |
| o | №0054 (+ 53 других файлов) |
| oa | №0774 |
| obj | №0066 (+ 5 других файлов) |
| Object | №0658 (+ 23 других файлов) |
| objectBomber | №1067 |
| objectId | №0643 (+ 2 других файлов) |
| objectIds | №0823 |
| objPath | №1107 (+ 6 других файлов) |
| objs | №0067 |
| observer | №0787 (+ 3 других файлов) |
| observerTarget | №0787 |
| oc | №1218 |
| oc2 | №1218 |
| occultIds | №1156 |
| occultistPack | №0774 |
| occupied | №0825 |
| od | №0806 |
| odd | №0813 |
| odds | №0814 (+ 4 других файлов) |
| odr | №0806 |
| off | №0058 (+ 6 других файлов) |
| offer | №0796 (+ 3 других файлов) |
| offered | №0797 |
| offers | №0796 (+ 1 других файлов) |
| offHoof | №1089 |
| offset | №0056 (+ 7 других файлов) |
| oh | №0067 (+ 1 других файлов) |
| oi | №0067 (+ 2 других файлов) |
| oid | №0774 |
| oilDamage | №0650 |
| ok | №0067 (+ 10 других файлов) |
| ol | №0068 |
| old | №0060 (+ 47 других файлов) |
| oldAngle | №0060 |
| oldBin | №1107 |
| oldBuffer | №1069 |
| oldChar | №1234 |
| oldCharacter | №1234 |
| oldCombatForDemolition | №1068 |
| oldData | №0827 |
| oldDrawer | №0767 |
| oldEffects | №0073 |
| oldHead | №1070 |
| oldHost | №0767 |
| oldHp | №0073 |
| oldId | №0650 (+ 1 других файлов) |
| oldInitRender | №0822 |
| oldLength | №0053 |
| oldLevel | №0665 |
| oldMax | №0072 (+ 1 других файлов) |
| oldNet | №1234 |
| oldPact | №0822 |
| oldPeer | №0806 |
| oldRAF | №1259 (+ 18 других файлов) |
| oldRandom | №0658 (+ 1 других файлов) |
| oldRandomForBurn | №1067 |
| oldRandomMutable | №1067 |
| oldRandomObject | №1067 |
| oldRandomPoison | №1067 |
| oldRandomSlime | №1067 |
| oldRenderDndTools | №0822 |
| oldRoll | №1225 |
| oldSelect | №0786 |
| oldTemp | №0073 |
| oldTotal | №0695 |
| on | №0058 (+ 6 других файлов) |
| onchange | №0814 |
| one | №1142 |
| oneTwoTarget | №0774 |
| onPhone | №1127 |
| onProgress | №0837 |
| oozeRancher | №0650 |
| oozeRancherAcidResistance | №0650 |
| oozeTarget | №1067 |
| op | №0058 (+ 2 других файлов) |
| opacity | №0863 (+ 1 других файлов) |
| opacityVal | №0863 |
| open | №0643 (+ 2 других файлов) |
| openedHero | №0814 |
| opening | №0767 |
| openPanels | №1091 |
| openSet | №0791 |
| openSky | №0813 |
| operationId | №0816 |
| opportunityAttacker | №0814 |
| opt | №0058 (+ 4 других файлов) |
| option | №0058 |
| options | №0056 (+ 22 других файлов) |
| opts | №0075 (+ 29 других файлов) |
| optsHtml | №0641 |
| orbit | №0056 |
| orc | №1220 |
| order | №0053 (+ 4 других файлов) |
| orderCtx | №1159 |
| origin | №0058 (+ 2 других файлов) |
| original | №0053 (+ 18 других файлов) |
| originalAppearance | №0073 |
| originalAttack | №0661 |
| originalBody | №1070 |
| originalCalculateMods | №0831 |
| originalContext | №1069 |
| originalCraft | №0661 (+ 1 других файлов) |
| originalCrypto | №1129 |
| originalDamage | №0661 |
| originalEnemyHp | №1129 |
| originalError | №0766 |
| originalHealingTarget | №0650 |
| originalIndex | №0788 |
| originalIndices | №1087 |
| originalLog | №0766 |
| originalOpenCharacter | №0831 |
| originalPhysical | №0828 |
| originalRepair | №0661 |
| originalUI | №1249 |
| originalUiCraft | №0661 |
| originLabel | №0058 |
| orphan | №0784 |
| os | №1066 (+ 5 других файлов) |
| ot | №0651 (+ 1 других файлов) |
| other | №0788 (+ 7 других файлов) |
| otherCat | №0788 |
| otherIndex | №0788 |
| otherIsShield | №0788 |
| otherName | №0788 |
| ott | №0774 |
| out | №0054 (+ 70 других файлов) |
| outcome | №0813 (+ 2 других файлов) |
| outer | №0053 (+ 2 других файлов) |
| outerWidth | №0053 |
| outPath | №1107 |
| output | №0058 (+ 4 других файлов) |
| outputId | №0668 (+ 1 других файлов) |
| outputName | №0668 (+ 1 других файлов) |
| outside | №0057 (+ 1 других файлов) |
| outsideBary | №1118 |
| overheated | №0073 |
| overheatedTarget | №1068 |
| overlay | №0792 (+ 3 других файлов) |
| overload | №1068 |
| overloadBefore | №1068 |
| overloadBomber | №1068 |
| overloadCost | №0073 |
| overrides | №0652 |
| ow | №0067 |
| own | №0651 (+ 1 других файлов) |
| owned | №0666 (+ 2 других файлов) |
| owner | №0058 (+ 10 других файлов) |
| ownerActor | №0651 |
| ownerBombHit | №1067 |
| ownerClass | №0073 |
| ownerCopy | №0816 |
| ownerId | №0825 |
| ox | №0063 (+ 2 других файлов) |
| oy | №0063 (+ 2 других файлов) |
| oz | №0063 (+ 1 других файлов) |
| p | №0054 (+ 162 других файлов) |
| P | №0064 (+ 2 других файлов) |
| p0 | №0056 |
| p1 | №0056 |
| pa | №0650 |
| pack | №0065 (+ 22 других файлов) |
| PACK_ID | №0073 (+ 2 других файлов) |
| PACK_MANIFEST | №0657 |
| packId | №0656 |
| packName | №0656 |
| packs | №0771 (+ 1 других файлов) |
| pact | №0643 (+ 3 других файлов) |
| PACT | №0793 |
| PACT_SLOTS | №0822 |
| pactBoxes | №0831 |
| pactLevel | №0822 |
| pactSlots | №0774 |
| pactState | №0822 |
| pad | №0056 |
| pads | №0056 |
| page | №0648 (+ 38 других файлов) |
| paid | №0798 (+ 1 других файлов) |
| paintAttack | №1068 |
| painter | №1068 |
| pair | №0053 (+ 2 других файлов) |
| pal | №1218 (+ 2 других файлов) |
| palette | №0057 (+ 1 других файлов) |
| palettes | №0058 |
| palm | №0056 |
| panel | №0057 (+ 6 других файлов) |
| panelHost | №0822 |
| panelsHidden | №0065 |
| panX | №0858 |
| panY | №0858 |
| parasiteHostTarget | №0641 |
| parent | №0063 (+ 3 других файлов) |
| parentArea | №0788 |
| parentId | №0834 |
| parsed | №0827 (+ 3 других файлов) |
| parsedHtml | №0767 |
| parsedSides | №0767 |
| parseFloat | №1067 (+ 15 других файлов) |
| parseInt | №1067 (+ 13 других файлов) |
| part | №0054 (+ 16 других файлов) |
| partner | №0813 |
| partnerSnapshot | №0813 |
| parts | №0056 (+ 29 других файлов) |
| partySize | №0800 |
| pass | №0053 (+ 3 других файлов) |
| passed | №1099 (+ 2 других файлов) |
| passInsight | №0619 (+ 1 других файлов) |
| passInvestigation | №0619 (+ 1 других файлов) |
| passive | №0774 (+ 2 других файлов) |
| passiveFeatures | №0073 |
| passPerception | №0619 (+ 1 других файлов) |
| password | №0646 (+ 1 других файлов) |
| pat | №0067 |
| patch | №0056 (+ 5 других файлов) |
| patchLootResult | №0821 |
| path | №0056 (+ 112 других файлов) |
| paths | №1103 |
| patient | №0073 (+ 1 других файлов) |
| patronNames | №0636 |
| patrons | №0636 (+ 1 других файлов) |
| paw | №0056 |
| payload | №0078 (+ 11 других файлов) |
| pb | №0072 (+ 7 других файлов) |
| PB | №0072 (+ 10 других файлов) |
| pbBreath | №0073 |
| pc | №0774 (+ 4 других файлов) |
| pcRoster | №1127 |
| pct | №0838 (+ 1 других файлов) |
| pd | №0873 |
| peace | №1127 |
| peacePhone | №1127 |
| peak | №1148 |
| peer | №0806 (+ 2 других файлов) |
| peerId | №0806 |
| peers | №0805 (+ 3 других файлов) |
| pelvisNode | №0053 |
| penalizedAttack | №1067 |
| penalizedSave | №1067 |
| penalty | №0636 |
| pending | №0059 (+ 14 других файлов) |
| pendingBloodAttack | №0650 |
| pendingBomb | №0073 |
| pendingContext | №0620 |
| pendingFeature | №0620 |
| pendingLevelUpData | №0695 |
| pendingReactions | №0806 |
| pendingSavantAttack | №0650 |
| pendingTargetId | №0620 |
| percent | №0058 (+ 2 других файлов) |
| perfumeAttack | №1067 |
| perfumeAttacker | №1067 |
| perfumeClass | №0650 |
| perfumeDC | №0650 |
| perfumeHero | №0650 |
| perfumeOwner | №1067 |
| perfumeOwnerState | №0650 |
| perfumeRound | №0650 |
| perfumeSave | №0650 |
| perfumeSource | №0650 |
| perfumeSourceClass | №0650 |
| perfumeState | №0650 |
| perfumeTargetId | №0650 |
| permission | №0881 |
| perms | №1121 |
| pev | №0806 |
| pf | №0828 |
| ph | №1223 |
| PH | №0067 |
| phase | №0056 (+ 1 других файлов) |
| phases | №1167 |
| pher | №0650 |
| pherDebuffs | №0073 |
| pheromone | №1067 (+ 1 других файлов) |
| pheromoneOwner | №1067 |
| pheromoneSave | №0073 |
| pheromoneTarget | №1067 (+ 1 других файлов) |
| phi | №0053 (+ 2 других файлов) |
| phone | №1099 (+ 2 других файлов) |
| phoneProtected | №1127 |
| phoneTraveller | №1127 |
| physical | №0650 (+ 1 других файлов) |
| physicalKey | №0828 |
| pi | №0063 (+ 5 других файлов) |
| pick | №0056 (+ 9 других файлов) |
| picked | №0636 (+ 1 других файлов) |
| picker | №0058 |
| picks | №0073 (+ 1 других файлов) |
| pid | №0665 (+ 1 других файлов) |
| pigmentClass | №0073 |
| pigmentist | №1068 |
| pinch | №0858 |
| pink | №0056 |
| PINNED_COMMIT | №1304 |
| pInput | №0785 |
| pipe | №1071 (+ 20 других файлов) |
| pitch | №0058 (+ 3 других файлов) |
| pivot | №0053 |
| pixel | №1277 |
| pixels | №1259 (+ 19 других файлов) |
| pl | №0688 (+ 2 других файлов) |
| plan | №0660 (+ 4 других файлов) |
| plane | №0056 (+ 1 других файлов) |
| PLANES | №0627 |
| plannedMove | №0806 |
| plates | №0056 |
| playable | №0816 |
| playBtn | №0077 |
| played | №1127 |
| plumage | №0056 |
| plume | №0056 |
| plus | №0053 (+ 1 других файлов) |
| pn | №0056 |
| po | №0774 |
| point | №0056 (+ 2 других файлов) |
| pointCostDiff | №0619 (+ 1 других файлов) |
| pointers | №0858 |
| points | №0056 (+ 10 других файлов) |
| pointsLeftEl | №0619 (+ 1 других файлов) |
| poisonBomb | №1068 |
| poisonedAttacker | №1067 |
| poisonedCombatant | №1067 |
| poisonedStrike | №1067 |
| poisonedWeaponAttack | №1068 |
| poisonImmuneTarget | №1067 |
| poisonPreview | №1067 |
| poisonWeapon | №0073 |
| poisonWeaponId | №0073 |
| pole | №0053 |
| policy | №0667 |
| poly | №0056 (+ 1 других файлов) |
| polygon | №0056 |
| pool | №0073 (+ 5 других файлов) |
| poolKind | №0073 |
| pools | №0074 |
| portraitBounds | №0881 |
| pos | №0053 (+ 10 других файлов) |
| pose | №0056 |
| posed | №0060 |
| poses | №0060 |
| position | №0813 |
| positionCounts | №1119 |
| positions | №0053 (+ 5 других файлов) |
| possibleIdElements | №0787 |
| potency | №0074 (+ 1 других файлов) |
| potential | №0056 |
| potion | №0073 (+ 2 других файлов) |
| potionColor | №0073 |
| potionIndex | №1163 |
| potions | №0073 |
| pounds | №0813 |
| power | №0056 (+ 1 других файлов) |
| pp | №0076 (+ 4 других файлов) |
| pPerG | №0785 |
| ppInput | №0785 |
| ppVal | №0785 |
| pr | №0636 (+ 2 других файлов) |
| pre | №0072 |
| predicate | №0056 |
| predict | №1093 |
| predictorTrump | №0650 |
| preFeatSelect | №0695 |
| preferPact | №0643 |
| prefix | №0784 (+ 3 других файлов) |
| preloadPath | №1305 |
| prep | №1218 |
| PREP | №0798 (+ 1 других файлов) |
| prepared | №0636 (+ 3 других файлов) |
| preparedAny | №0806 |
| preparedCount | №0831 |
| preparedFormula | №0073 |
| preparedReaction | №0806 |
| preparedReservation | №0806 |
| prepProfile | №0831 |
| prereq | №0839 |
| preS | №0695 |
| preS1 | №0695 |
| preS2 | №0695 |
| preset | №0057 (+ 3 других файлов) |
| presets | №0061 (+ 1 других файлов) |
| preStats | №0695 |
| prev | №0053 (+ 2 других файлов) |
| preview | №0788 (+ 2 других файлов) |
| previous | №0053 (+ 11 других файлов) |
| previousAC | №0824 |
| previousActive | №0768 |
| previousCount | №1084 |
| previousFetch | №1103 (+ 1 других файлов) |
| previousMageCrypto | №1129 |
| previousRoot | №0768 |
| price | №0662 (+ 1 других файлов) |
| prim | №1107 |
| primary | №0076 (+ 1 других файлов) |
| primaryStat | №0688 |
| prime | №0774 |
| prior | №1152 (+ 2 других файлов) |
| prismaticIndex | №0073 |
| prismaticOptions | №0073 |
| prismAttack | №1068 |
| prismTester | №1068 |
| probe | №0056 (+ 1 других файлов) |
| proceed | №0695 |
| process | №1237 (+ 2 других файлов) |
| processedNames | №0821 |
| processing | №0658 (+ 1 других файлов) |
| PROCESSING | №0667 |
| PROCESSING_DC_BY_RARITY | №0821 |
| PROCESSING_RECIPES | №0668 |
| PROCESSING_TOOL_BY_TYPE | №0821 |
| product | №0075 |
| prof | №0788 (+ 8 других файлов) |
| profBlock | №0740 |
| profBonus | №0619 (+ 4 других файлов) |
| profession | №0668 (+ 2 других файлов) |
| professionBonus | №0075 |
| professionId | №0665 |
| professionLayer | №0667 |
| professions | №0668 |
| PROFESSIONS | №0665 (+ 2 других файлов) |
| PROFICIENCIES_DB | №0817 |
| proficiencyBonus | №0767 |
| proficiencyChoiceHtml | №0695 |
| proficiencyType | №0788 |
| proficient | №0650 (+ 2 других файлов) |
| profId | №0817 (+ 1 других файлов) |
| profIds | №0818 |
| profile | №0053 (+ 10 других файлов) |
| profiles | №0057 (+ 4 других файлов) |
| profInput | №0831 |
| profName | №0818 (+ 1 других файлов) |
| profObj | №0818 (+ 1 других файлов) |
| profOk | №0873 |
| profs | №0788 (+ 3 других файлов) |
| prog | №0068 (+ 4 других файлов) |
| progress | №0814 |
| progressFrame | №0838 |
| progressHandler | №0837 |
| progression | №0072 (+ 11 других файлов) |
| progressPercent | №0775 |
| projected | №0784 (+ 1 других файлов) |
| projection | №0056 |
| projectManifest | №0848 |
| Promise | №1108 (+ 2 других файлов) |
| prompts | №1153 |
| prop | №0073 (+ 2 других файлов) |
| propContainer | №0786 |
| PROPERTIES | №0074 |
| proportions | №1304 |
| props | №0057 (+ 1 других файлов) |
| propTitle | №0786 |
| protectedCase | №1066 |
| protectedHero | №1127 |
| protectedKeys | №0827 |
| proto | №0648 |
| protocol | №0881 |
| proxy | №0806 (+ 1 других файлов) |
| ps | №0064 (+ 2 других файлов) |
| psiLimit | №0709 |
| psion | №1223 |
| psionDisciplines | №0774 |
| pt | №0636 |
| pu | №1223 |
| pugilist | №1149 |
| pugilistAC | №0650 |
| pugilistDefender | №0650 |
| pugilistDigDeepResistant | №0650 |
| pugilistLevelEntry | №0650 |
| pugilistPack | №0650 |
| pugilistSchool | №0650 |
| pugilistState | №0650 |
| pugilistStudy | №0650 |
| pupilDiagnostics | №1269 |
| pupilRound | №1269 |
| pupilSelect | №0058 |
| puppet | №1153 |
| puppetTarget | №0636 |
| puppetWeapon | №0636 |
| purity | №0074 (+ 1 других файлов) |
| pursuits | №0824 |
| pw | №1304 |
| PW | №0067 |
| px | №0056 (+ 2 других файлов) |
| PX | №0067 |
| py | №0058 (+ 1 других файлов) |
| PY | №0067 |
| pz | №0058 |
| q | №0053 (+ 37 других файлов) |
| Q | №0053 |
| q0 | №0056 |
| q1 | №0056 |
| qApi | №0788 |
| qd | №0669 |
| qi | №0778 |
| ql | №0053 |
| qn | №0060 |
| qr | №0774 |
| qs | №1127 |
| qty | №0659 (+ 1 других файлов) |
| quality | №0058 (+ 6 других файлов) |
| QUALITY | №0662 (+ 2 других файлов) |
| QUALITY_GRADES | №0659 |
| QUALITY_TIERS | №0660 |
| qualityFactor | №0659 |
| qualityKey | №0803 |
| qualityPenalty | №0659 |
| quantity | №0787 (+ 2 других файлов) |
| queen | №1127 |
| queenReceipt | №1127 |
| query | №0065 (+ 1 других файлов) |
| queue | №0813 (+ 1 других файлов) |
| queued | №0651 |
| quickGather | №0820 |
| quota | №0054 (+ 1 других файлов) |
| r | №0054 (+ 206 других файлов) |
| R | №0056 (+ 11 других файлов) |
| r0 | №0056 |
| r1 | №0056 (+ 2 других файлов) |
| r2 | №0767 (+ 1 других файлов) |
| race | №0058 (+ 12 других файлов) |
| raceDesc | №0641 |
| raceEntry | №0058 |
| raceId | №0061 (+ 7 других файлов) |
| raceImmune | №0650 |
| raceLabel | №0641 |
| raceList | №0667 |
| raceName | №0619 (+ 1 других файлов) |
| raceObj | №0819 |
| raceResistant | №0650 |
| races | №0061 (+ 3 других файлов) |
| raceSelect | №0619 (+ 2 других файлов) |
| rad | №0056 (+ 1 других файлов) |
| radial | №0056 |
| radii | №0056 |
| radius | №0053 (+ 5 других файлов) |
| raf | №0621 |
| raging | №0650 |
| raise | №0056 |
| rampage | №0651 |
| randIdx | №0077 |
| random | №1094 |
| randomSequence | №1148 |
| randomValue | №1148 |
| randomXOffset | №0767 |
| randomYOffset | №0767 |
| range | №0636 (+ 6 других файлов) |
| rangedIncoming | №0650 |
| rangeFt | №0806 |
| ranger | №1220 |
| rangeU | №1088 |
| rangeV | №1088 |
| rank | №0650 (+ 2 других файлов) |
| RANKS | №0816 |
| raphe | №0053 |
| rare | №0803 |
| rarity | №0662 (+ 4 других файлов) |
| RARITY | №0794 |
| RARITY_WEIGHT | №0873 |
| rarityOrder | №0788 |
| rate | №0056 (+ 1 других файлов) |
| rates | №1723 |
| ratio | №0068 (+ 3 других файлов) |
| rats | №0056 |
| raw | №0055 (+ 32 других файлов) |
| rawCat | №0797 |
| rawDestination | №1724 |
| rawItems | №0831 |
| rawParts | №0650 |
| rawRadial | №0057 |
| rawStats | №0788 |
| rawTotal | №0650 |
| rb | №0794 (+ 1 других файлов) |
| rBottom | №0058 |
| rd | №0774 (+ 1 других файлов) |
| rd0 | №0808 |
| re | №0808 (+ 1 других файлов) |
| reach | №0056 |
| reacted | №1127 |
| reaction | №0650 (+ 5 других файлов) |
| reactionButton | №1216 |
| reactionCtx | №0650 (+ 1 других файлов) |
| reactionReduction | №0650 |
| reactionResult | №0650 |
| reactions | №0806 |
| REACTIONS | №0824 |
| read | №0813 (+ 1 других файлов) |
| Readable | №0881 |
| reader | №0827 (+ 2 других файлов) |
| readGlb | №1071 (+ 5 других файлов) |
| readIndex | №1116 (+ 1 других файлов) |
| ready | №0813 (+ 3 других файлов) |
| reagentCount | №0073 |
| reagentGain | №0073 |
| reagentRoll | №0073 |
| reagentsBefore | №1068 |
| reagentTarget | №1068 |
| real | №1305 |
| realAttack | №1135 |
| realCrypto | №1129 |
| realSave | №1141 |
| realSet | №1099 |
| rear | №0056 |
| reason | №0661 (+ 7 других файлов) |
| rebuildMaterialUsage | №0667 |
| rec | №0740 (+ 4 других файлов) |
| receipt | №0069 (+ 1 других файлов) |
| receiptKey | №1099 |
| received | №0797 (+ 2 других файлов) |
| recharge | №0073 (+ 11 других файлов) |
| recipe | №0073 (+ 7 других файлов) |
| recipeId | №0663 |
| recipes | №0662 |
| RECIPES | №0663 (+ 2 других файлов) |
| recipient | №0636 (+ 1 других файлов) |
| record | №0055 (+ 1 других файлов) |
| recorded | №0813 |
| records | №0056 (+ 3 других файлов) |
| recovered | №0660 (+ 1 других файлов) |
| RECOVERY_BY_DURABILITY | №0659 |
| RECOVERY_BY_QUALITY | №0660 |
| red | №0643 |
| reduce | №0866 |
| reduced | №0636 |
| reduction | №0643 |
| ref | №0056 (+ 26 других файлов) |
| reference | №0056 (+ 1 других файлов) |
| referenceNode | №0785 |
| refresh | №0669 |
| refreshBase | №0669 |
| refreshing | №0648 |
| refs | №0075 (+ 3 других файлов) |
| refunded | №0806 |
| reg | №1217 |
| regeneration | №1068 |
| RegExp | №0658 (+ 6 других файлов) |
| region | №0058 (+ 2 других файлов) |
| REGION_MOD | №0794 |
| regionId | №0873 |
| regions | №0054 (+ 4 других файлов) |
| REGIONS | №0873 |
| registered | №1067 (+ 8 других файлов) |
| registry | №0053 (+ 3 других файлов) |
| reject | №0827 (+ 6 других файлов) |
| rejected | №1104 (+ 1 других файлов) |
| rel | №0796 (+ 6 других файлов) |
| relative | №0881 (+ 2 других файлов) |
| release | №1099 |
| releaseGate | №1065 |
| relief | №0073 |
| reliefCount | №0056 |
| reliefResult | №1068 |
| reliefTarget | №1068 |
| reloaded | №1135 |
| relocateGameplayPanels | №0767 |
| rem | №0785 |
| remaining | №0073 (+ 5 других файлов) |
| remainingReduction | №0650 |
| remote | №0646 (+ 2 других файлов) |
| remoteHead | №1066 |
| remoteStatus | №1127 |
| remove | №0058 |
| removeAt | №0073 |
| removed | №0053 (+ 5 других файлов) |
| removedGraft | №0073 |
| removeFromContainer | №0784 |
| render | №0074 (+ 7 других файлов) |
| renderList | №0663 (+ 1 других файлов) |
| renderRecipes | №0667 |
| renderTabs | №0666 |
| renderTools | №0667 |
| rep | №0056 |
| repair | №1101 |
| REPAIR_COST_PER_10 | №0659 |
| REPAIR_PROFILES | №0660 |
| repairBtn | №0788 |
| repairCount | №0659 |
| repaired | №1100 |
| repairPlan | №1100 |
| repCfg | №0056 |
| repeatBtn | №0077 |
| replace | №0636 (+ 1 других файлов) |
| replacement | №1129 |
| repo | №1724 |
| report | №0788 (+ 10 других файлов) |
| repSelect | №0058 |
| reptileCoreCache | №0056 |
| reptilePart | №0058 |
| req | №0643 (+ 52 других файлов) |
| reqHtml | №0740 |
| reqR | №0774 |
| reqs | №0781 |
| reqText | №0665 (+ 1 других файлов) |
| request | №0881 (+ 2 других файлов) |
| requested | №0643 (+ 3 других файлов) |
| requestedAoe | №0806 |
| requestedFeature | №0073 |
| requestedForm | №0774 |
| requestId | №0806 |
| requests | №1152 |
| require | №1237 (+ 1 других файлов) |
| required | №0665 (+ 1 других файлов) |
| requiredEnd | №1121 |
| requiredLevel | №0073 (+ 1 других файлов) |
| requireLevel | №0774 |
| requireTool | №0665 |
| reroll | №0643 (+ 3 других файлов) |
| res | №0643 (+ 45 других файлов) |
| resBox | №0642 (+ 2 других файлов) |
| resDiv | №0786 |
| reservation | №0830 |
| reserved | №0806 |
| reset | №0058 (+ 2 других файлов) |
| resetBuffer | №1069 |
| resist | №0845 |
| resistance | №0073 (+ 1 других файлов) |
| resistanceType | №0073 |
| resistanceTypes | №0073 |
| resistant | №0650 |
| resistantFire | №1067 |
| resistantTarget | №1148 |
| resisted | №1148 |
| resMap | №0643 |
| resolve | №0827 (+ 8 других файлов) |
| resolved | №0063 (+ 1 других файлов) |
| resolvedParts | №0650 |
| resource | №0778 (+ 2 других файлов) |
| RESOURCE_HINTS | №0820 |
| RESOURCE_PROCESSING | №0821 |
| RESOURCE_YIELDS | №0821 |
| resourceBefore | №1148 |
| resourceDefs | №0822 |
| resourceId | №0820 |
| resourceKind | №0806 |
| resources | №0873 (+ 1 других файлов) |
| response | №0837 (+ 3 других файлов) |
| responses | №1098 (+ 1 других файлов) |
| rest | №0774 (+ 2 других файлов) |
| restarted | №1099 |
| rested | №1139 |
| restId | №0816 (+ 1 других файлов) |
| restored | №0643 (+ 13 других файлов) |
| restoredShort | №0642 |
| restoredUse | №1068 |
| restoreFullCheckbox | №0695 |
| restoreUsed | №0073 |
| restStr | №0831 |
| result | №0056 (+ 63 других файлов) |
| resultPending | №0806 |
| results | №0060 (+ 10 других файлов) |
| resultText | №0642 (+ 1 других файлов) |
| resume | №0806 (+ 1 других файлов) |
| resumed | №0813 (+ 1 других файлов) |
| resumedStand | №1127 |
| resumeSpell | №0806 |
| retries | №0816 |
| retry | №0838 |
| returned | №1127 |
| returnedDash | №1127 |
| reused | №0884 |
| rev | №0806 |
| reveal | №0814 |
| reverse | №0057 |
| revision | №0648 (+ 2 других файлов) |
| revival | №1067 |
| revived | №1068 |
| revivedFromZero | №0650 |
| reward | №0665 (+ 4 других файлов) |
| rewardId | №0816 |
| rewards | №0665 |
| rewardX | №0814 |
| rewardY | №0814 |
| rgb | №0058 |
| rht | №0774 |
| ri | №1117 |
| rid | №0866 (+ 2 других файлов) |
| rider | №0833 |
| ridge | №1091 |
| RIDGE_STYLES | №0061 |
| ridges | №0056 |
| ridgeSelect | №0058 |
| ridgeStyle | №1296 |
| right | №0056 (+ 4 других файлов) |
| rigid | №1073 |
| ring | №0053 (+ 1 других файлов) |
| ringCount | №0053 |
| rings | №0057 |
| rise | №0057 (+ 2 других файлов) |
| risk | №0074 (+ 1 других файлов) |
| rite | №0636 (+ 2 других файлов) |
| riteId | №0774 |
| riteKnown | №0808 |
| riteMax | №0774 |
| riteNames | №0636 |
| rites | №0774 (+ 1 других файлов) |
| riteTypes | №0636 |
| rl | №0056 |
| rm | №0650 (+ 1 других файлов) |
| rn | №0808 |
| rn0 | №0808 |
| rn2 | №0808 |
| ro | №1213 |
| robe | №0056 |
| rock | №0058 |
| rogue | №1136 (+ 3 других файлов) |
| role | №0056 (+ 3 других файлов) |
| roleName | №0624 |
| roles | №0668 |
| roll | №0069 (+ 18 других файлов) |
| rolled | №0073 (+ 7 других файлов) |
| rolledRelief | №1068 |
| roller | №0800 (+ 1 других файлов) |
| rollMode | №0642 |
| rollResult | №1148 |
| rolls | №0642 (+ 9 других файлов) |
| rollTypeClass | №0767 (+ 1 других файлов) |
| roofColor | №0058 |
| room | №0811 |
| root | №0056 (+ 98 других файлов) |
| ROOT | №0658 (+ 10 других файлов) |
| rootId | №0848 (+ 1 других файлов) |
| roots | №0056 (+ 4 других файлов) |
| rootSurface | №0053 |
| rootT | №0056 |
| rootY | №0056 |
| rootZ | №0056 |
| roster | №0646 (+ 1 других файлов) |
| rotation | №0058 |
| rough | №0815 (+ 1 других файлов) |
| round | №0800 (+ 1 других файлов) |
| round4 | №1304 |
| rounds | №0828 |
| roundTracker | №0650 |
| roundTrip | №1070 |
| route | №1267 (+ 1 других файлов) |
| routed | №0643 |
| row | №0056 (+ 12 других файлов) |
| rows | №0056 (+ 11 других файлов) |
| ROWS | №0623 |
| rp | №1163 |
| rq | №1214 (+ 1 других файлов) |
| rr | №0056 (+ 8 других файлов) |
| rs | №0636 (+ 2 других файлов) |
| rt | №0643 (+ 1 других файлов) |
| rTop | №0058 |
| rule | №0058 (+ 11 других файлов) |
| rules | №0695 (+ 7 других файлов) |
| RULES | №0816 |
| run | №0068 (+ 2 других файлов) |
| ruName | №0695 (+ 1 других файлов) |
| rune | №0774 (+ 1 других файлов) |
| RUNEKEEPER_INSCRIBED | №0774 |
| runesBefore | №1158 |
| running | №0648 |
| runtime | №0798 (+ 33 других файлов) |
| runtimeFeatures | №0808 |
| runtimes | №0643 |
| runtimeSubclasses | №0808 |
| rw | №1304 |
| rx | №0056 (+ 4 других файлов) |
| rx2 | №0806 |
| ry | №0056 (+ 3 других файлов) |
| rz | №0056 (+ 3 других файлов) |
| rz2 | №0068 |
| s | №0053 (+ 175 других файлов) |
| S | №0067 (+ 1 других файлов) |
| s1 | №0695 |
| s2 | №0695 |
| sa | №0056 |
| safe | №0078 (+ 1 других файлов) |
| SAFE_FILE | №0884 |
| safeFeatureId | №0643 |
| safeGet | №0786 |
| safeName | №0649 |
| safeText | №0767 |
| salty | №1148 |
| saltyDC | №0774 |
| saltyEffect | №0643 |
| saltyHero | №1148 |
| saltyMods | №1148 |
| saltySave | №0774 |
| saltyTarget | №1148 |
| sam | №0063 |
| same | №0660 (+ 8 других файлов) |
| sample | №0056 (+ 4 других файлов) |
| sampleCount | №1121 |
| sampler | №0058 (+ 2 других файлов) |
| samples | №0056 (+ 1 других файлов) |
| sandbox | №1198 (+ 6 других файлов) |
| satin | №0058 |
| savage | №0774 |
| savantFlourish | №0650 |
| savantHP | №1158 |
| save | №0069 (+ 12 других файлов) |
| saveAdv | №0650 |
| saved | №0078 (+ 49 других файлов) |
| savedAlpha | №0827 |
| savedBg | №0863 |
| saveDC | №0636 |
| savedColor | №0863 |
| savedDim | №0863 |
| saveDebuffs | №0650 |
| savedFont | №0827 |
| savedHeritage | №1269 |
| saveDis | №0650 |
| savedOpacity | №0863 |
| savedRetreat | №1127 |
| savedSmall | №1269 |
| savedSurface | №1269 |
| savedTarget | №1155 |
| savedTheme | №0827 |
| savedWander | №1127 |
| saveResult | №0650 |
| saveRoll | №0779 (+ 2 других файлов) |
| saves | №0688 (+ 3 других файлов) |
| savesBeforeRefresh | №1129 |
| saveStat | №0774 |
| sb | №0665 (+ 2 других файлов) |
| sc | №0063 (+ 8 других файлов) |
| scale | №0053 (+ 11 других файлов) |
| scaled | №0058 |
| scalpBuckets | №0056 |
| scalpCache | №0056 |
| scalpSamples | №0056 |
| scene | №0064 (+ 3 других файлов) |
| scenes | №0058 |
| scheduleUpdate | №0787 |
| SCHEMA_VERSION | №0637 (+ 2 других файлов) |
| schoolDamageTarget | №1148 |
| schoolHero | №1148 |
| schoolSave | №1148 |
| schoolText | №0831 |
| scLower | №0831 |
| scoped | №0643 |
| score | №0056 (+ 8 других файлов) |
| scores | №0681 (+ 3 других файлов) |
| scoreSnapshots | №0073 |
| scout | №1123 |
| screen | №0810 (+ 1 других файлов) |
| script | №1066 |
| scripts | №1109 (+ 1 других файлов) |
| sctx | №1238 |
| sd | №0650 (+ 1 других файлов) |
| se | №0860 |
| sealDamage | №0693 |
| sealedHp | №1156 |
| seals | №0693 (+ 2 других файлов) |
| sealTarget | №1156 |
| seam | №0056 (+ 3 других файлов) |
| seamDamage | №1067 |
| seamGroups | №0053 |
| seamMax | №1071 (+ 1 других файлов) |
| seams | №0056 |
| searchInput | №0831 |
| searchVal | №0831 |
| second | №0813 (+ 1 других файлов) |
| secondary | №0056 |
| secondDead | №1068 |
| secondOpts | №0813 |
| seconds | №0813 |
| section | №0057 |
| seed | №0056 (+ 1 других файлов) |
| seekingAttack | №1068 |
| seen | №0069 (+ 6 других файлов) |
| seenEventIds | №0805 |
| seenNames | №0740 |
| seer | №1127 |
| seg | №0056 |
| segments | №0053 (+ 3 других файлов) |
| sel | №0641 (+ 5 других файлов) |
| select | №0058 (+ 6 других файлов) |
| selected | №0053 (+ 25 других файлов) |
| selected0 | №0656 (+ 1 других файлов) |
| selectedArmorCategory | №0786 |
| selectedAsset | №0065 |
| selectedBg | №0619 (+ 1 других файлов) |
| selectedChar | №0826 |
| selectedClass | №0619 (+ 2 других файлов) |
| selectedClassKey | №0695 |
| selectedClassName | №0695 |
| selectedClothes | №1267 |
| selectedFeatSelect | №0695 |
| selectedId | №0819 |
| selectedIds | №0708 |
| selectedNatural | №0073 |
| selectedRace | №0619 (+ 1 других файлов) |
| selectedSub | №0656 |
| selectedTarget | №0814 |
| selectedTrader | №0796 |
| selectedWeaponCategoryType | №0786 |
| selectedWeaponDice | №0786 |
| selectedWeaponProperties | №0786 |
| selectEl | №0786 |
| selectElem | №0791 |
| selector | №0787 |
| selectors | №0835 |
| selectScreen | №0619 (+ 1 других файлов) |
| selectType | №0786 |
| self | №0774 |
| selfActor | №0648 |
| sellFactor | №0795 |
| sellResult | №1163 |
| SEMVER | №0884 |
| send | №0881 |
| sent | №1206 (+ 7 других файлов) |
| sep | №0053 |
| seq | №0778 (+ 4 других файлов) |
| sequence | №1135 |
| serial | №1151 (+ 1 других файлов) |
| server | №1099 (+ 39 других файлов) |
| Server | №1127 (+ 1 других файлов) |
| session | №0055 (+ 4 других файлов) |
| SESSION | №0648 |
| set | №0784 (+ 2 других файлов) |
| Set | №0658 (+ 14 других файлов) |
| setInterval | №1193 (+ 5 других файлов) |
| setTimeout | №1100 (+ 35 других файлов) |
| settings | №0646 (+ 2 других файлов) |
| settingsPanel | №0827 |
| settled | №0815 |
| sf | №0643 (+ 1 других файлов) |
| sh | №0779 |
| sha | №1250 (+ 3 других файлов) |
| shader | №1093 |
| shaft | №0053 |
| shaftSources | №0053 |
| shape | №0053 (+ 2 других файлов) |
| shaped | №1091 |
| shapeInput | №0058 |
| shapes | №0054 (+ 1 других файлов) |
| shared | №0074 (+ 2 других файлов) |
| sharedAbility | №0073 |
| sharedAliases | №0073 |
| sharedMutagen | №1068 |
| sharedSnapshots | №0073 |
| sharp | №0056 |
| shaved | №0058 |
| sheer | №0058 |
| sheetScreen | №0619 (+ 1 других файлов) |
| shell | №0779 (+ 1 других файлов) |
| shellIX | №0056 |
| shellN | №0056 |
| shellP | №0056 |
| shellUV | №0056 |
| shield | №0650 (+ 3 других файлов) |
| shieldAccess | №0664 |
| shieldAvailable | №0643 |
| shieldBonus | №0788 |
| shielded | №0806 (+ 1 других файлов) |
| shieldRoll | №0650 |
| shieldSlot | №0643 |
| shieldSpent | №0643 |
| shipped | №1112 |
| shirt | №1078 |
| short | №0636 (+ 3 других файлов) |
| shortage | №0660 |
| shortKeys | №0781 (+ 1 других файлов) |
| shortToFull | №0695 |
| shot | №1136 (+ 1 других файлов) |
| shoulder | №0056 (+ 1 других файлов) |
| shoulderSpan | №0056 |
| shouldRestoreFull | №0695 |
| shouldUpdate | №0787 |
| showEp | №1723 |
| showEP | №0785 |
| showPp | №1723 |
| showPP | №0785 |
| shuffleBtn | №0077 |
| shutdownCalls | №1240 |
| si | №0056 (+ 3 других файлов) |
| side | №0054 (+ 6 других файлов) |
| sideIndex | №0056 |
| sides | №0058 (+ 11 других файлов) |
| sIdx | №0641 |
| sig | №0806 (+ 1 других файлов) |
| sightHero | №1127 |
| sign | №0060 (+ 2 других файлов) |
| signatures | №1075 (+ 5 других файлов) |
| signed | №0056 |
| signup | №0646 |
| sigTarget | №1148 |
| sigUses | №0806 |
| sin | №0053 |
| single | №0831 |
| singleBox | №0805 |
| singleWeightKg | №0787 |
| size | №0056 (+ 10 других файлов) |
| sizes | №0828 (+ 1 других файлов) |
| sk | №0767 |
| sKey | №0619 |
| skill | №0069 (+ 5 других файлов) |
| SKILL_STAT | №0803 |
| SKILL_TO_VAR_MAP | №0767 |
| skilledDesc | №0658 |
| skillId | №0619 (+ 4 других файлов) |
| skillName | №0767 |
| skillNameRu | №0619 |
| skills | №0619 (+ 3 других файлов) |
| SKILLS_CONFIG | №0078 |
| skillsConfig | №0767 |
| skillsDataObj | №0767 |
| skillsList | №0767 |
| skillsListContainer | №0817 |
| skillsPanel | №0817 (+ 1 других файлов) |
| skillsStr | №0619 (+ 1 других файлов) |
| skillStr | №0619 (+ 1 других файлов) |
| skin | №0054 (+ 5 других файлов) |
| skinBaseline | №1269 |
| skinColorEntry | №0058 |
| skinImages | №1069 |
| skinned | №1083 |
| skinnedPrimitives | №1110 (+ 1 других файлов) |
| skins | №0061 (+ 2 других файлов) |
| skip | №0056 (+ 1 других файлов) |
| skipped | №1136 |
| skirt | №1080 |
| skirtDepth | №0057 |
| skull | №0056 (+ 2 других файлов) |
| sky | №0068 |
| sl | №0056 (+ 6 других файлов) |
| sleep | №1127 |
| sleeve | №0057 |
| sleeveMasks | №0057 |
| sleeves | №0057 (+ 1 других файлов) |
| slices | №0056 |
| slider | №0058 |
| slimeAcid | №1067 |
| slimeAttacker | №1067 |
| slimeBombAttack | №1068 |
| slimeBomber | №1068 |
| slimeHit | №1067 |
| slimeResistantTarget | №1067 |
| slimeVictim | №1067 |
| slot | №0054 (+ 15 других файлов) |
| SLOT_LEVEL | №0839 |
| slot2 | №0774 |
| slot3 | №0774 |
| slot4 | №0774 |
| slotBefore | №1156 |
| slotData | №0831 |
| slotHtml | №0831 |
| slotLevel | №0774 |
| slotMax | №0808 |
| slotRowHtml | №0831 |
| slots | №0057 (+ 12 других файлов) |
| SLOTS | №0072 (+ 2 других файлов) |
| slotsBefore | №1158 |
| slotSnapshot | №0806 |
| sm | №0650 (+ 4 других файлов) |
| small | №0806 |
| smitePart | №0650 |
| smoke | №0838 |
| smooth | №0056 |
| sn | №0056 |
| snake | №0813 |
| snakeId | №1127 |
| snap | №0073 (+ 5 других файлов) |
| snapshot | №0055 (+ 6 других файлов) |
| snapshots | №0650 |
| snout | №0056 |
| sorted | №0788 |
| SOTDQ | №0626 |
| source | №0053 (+ 39 других файлов) |
| SOURCE | №0073 (+ 13 других файлов) |
| SOURCE_TAG | №0665 (+ 1 других файлов) |
| sourceArmor | №0788 |
| sourceCache | №0848 |
| sourceCheck | №0806 |
| sourceCommit | №1723 |
| sourceCount | №0821 |
| sourceGroups | №0695 |
| sourceHashes | №1254 (+ 1 других файлов) |
| sourceHtml | №0831 |
| sourceId | №0651 |
| sourceManifestUrl | №0837 |
| sourceMax | №1118 |
| sourceMean | №1118 |
| sourceMeshCount | №0058 |
| sources | №0636 (+ 11 других файлов) |
| sourceStats | №0811 |
| sourceTag | №0740 |
| sourceToken | №0651 |
| sourceWeapons | №0806 |
| sp | №0064 (+ 9 других файлов) |
| span | №0053 (+ 3 других файлов) |
| spanCurrent | №0775 |
| spanTotal | №0775 |
| sparks | №0838 |
| sparse | №1108 (+ 1 других файлов) |
| sparseJson | №1108 |
| spawn | №1098 |
| spd | №0623 (+ 3 других файлов) |
| spear | №0664 |
| spec | №0652 (+ 7 других файлов) |
| specHtml | №0665 |
| specialBombEffects | №0073 |
| SPECIALIZATIONS | №0665 |
| specId | №0665 |
| species | №0834 |
| specificClass | №0695 |
| specificProf1 | №0818 |
| specificProf2 | №0818 |
| specificProf3 | №0818 |
| specificSources | №0740 |
| specs | №0665 |
| spectral | №0058 |
| speed | №0651 (+ 3 других файлов) |
| speedInput | №0819 |
| speedVal | №0819 |
| spell | №0643 (+ 7 других файлов) |
| spellbladeDeflection | №0650 |
| spellbladeOnly | №0822 |
| SPELLCASTING_CLASSES | №0831 |
| spellcastingCard | №0831 |
| spellClass | №0831 |
| spellDamageMods | №0806 (+ 1 других файлов) |
| spellDesc | №0831 |
| spellId | №0814 |
| spellLevel | №0643 (+ 4 других файлов) |
| spellList | №0072 (+ 1 других файлов) |
| spellName | №0798 (+ 4 других файлов) |
| spellNameEscaped | №0831 |
| spellObj | №0831 |
| spellPayload | №0806 |
| spellReaction | №0806 |
| spells | №0798 (+ 5 других файлов) |
| SPELLS_KNOWN | №0072 |
| spellsByLevel | №0798 |
| spellsHtml | №0831 |
| spellSourcesNow | №0822 |
| spent | №0619 (+ 11 других файлов) |
| spentLevel | №0643 |
| sPerG | №0785 |
| spine | №0056 |
| spInput | №0785 |
| spiritAttacks | №0779 |
| spiritAuto | №1148 |
| spiritHp | №0774 |
| spiritMax | №0774 |
| spiritRestored | №0774 |
| spirits | №0839 |
| splay | №0056 |
| spread | №0056 |
| spVal | №0785 |
| sq | №0056 |
| squares | №1093 |
| squircle | №0056 |
| sr | №0643 (+ 6 других файлов) |
| src | №0054 (+ 34 других файлов) |
| srcA | №0831 |
| srcALower | №0831 |
| srcB | №0831 |
| srcBLower | №0831 |
| ss | №0650 (+ 1 других файлов) |
| st | №0056 (+ 7 других файлов) |
| stability | №0074 (+ 1 других файлов) |
| stableFound | №1249 |
| stableLegacy | №1249 |
| stack | №0659 (+ 1 других файлов) |
| stacked | №1723 |
| stageCount | №1249 |
| staged | №1103 (+ 2 других файлов) |
| STAGED_KEY | №0837 |
| stageManifestUrl | №0837 |
| stairs | №0071 (+ 1 других файлов) |
| stale | №1236 (+ 2 других файлов) |
| stalker | №1223 |
| stance | №0774 |
| STAND_TURN_FLAGS | №0813 |
| standard | №1094 |
| standardRaceIds | №1247 |
| standardRates | №1723 |
| standing | №1127 |
| standPC | №1127 |
| standPhone | №1127 |
| standRoster | №1127 |
| standServer | №1127 |
| start | №0056 (+ 12 других файлов) |
| started | №0778 (+ 1 других файлов) |
| startI | №1117 (+ 1 других файлов) |
| startingProfession | №0641 |
| startupRun | №0837 |
| startVol | №0077 |
| startY | №0057 |
| stat | №0069 (+ 14 других файлов) |
| STAT_ALIASES | №0822 |
| STAT_META | №0864 |
| STAT_NAMES | №0638 |
| stat2 | №0695 |
| statBonus | №0740 |
| statBonusKeys | №0740 |
| state | №0054 (+ 43 других файлов) |
| statElem | №0831 |
| stateOnly | №1252 |
| states | №0834 |
| statId | №0619 (+ 2 других файлов) |
| statKey | №0619 (+ 6 других файлов) |
| statKeysMap | №0695 |
| statMod | №0642 (+ 2 других файлов) |
| statName | №0767 |
| statNames | №0619 (+ 1 других файлов) |
| statNameShort | №0767 |
| statNamesShort | №0619 (+ 1 других файлов) |
| statOptions | №0642 (+ 1 других файлов) |
| stats | №0781 (+ 12 других файлов) |
| STATS | №0638 |
| STATS_CONFIG | №0078 |
| statsConfig | №0767 |
| statSelect | №0649 |
| statsGrid | №0767 |
| statsList | №0642 |
| status | №0827 (+ 8 других файлов) |
| STATUS | №0655 |
| statusClass | №0655 |
| statusEl | №0077 |
| statusPC | №1127 |
| statusPhone | №1127 |
| statusServer | №1127 |
| statusText | №0767 (+ 1 других файлов) |
| steel | №0058 |
| stem | №0062 (+ 2 других файлов) |
| stems | №1254 |
| stench | №1068 |
| stenchTarget | №1068 |
| step | №0056 (+ 5 других файлов) |
| steps | №0068 (+ 2 других файлов) |
| stepTime | №0077 |
| sternumSpan | №0056 |
| stock | №0795 |
| stone | №0866 |
| stop | №0651 |
| stopped | №0815 |
| storage | №0648 (+ 3 других файлов) |
| STORAGE_KEY | №0661 (+ 2 других файлов) |
| store | №1076 (+ 5 других файлов) |
| stored | №1208 |
| str | №0787 (+ 12 других файлов) |
| strand | №0056 |
| strap | №0057 |
| stream | №0884 |
| strength | №0787 |
| strenuous | №0820 |
| stride | №0057 (+ 9 других файлов) |
| strikeHP | №1157 |
| String | №0658 (+ 23 других файлов) |
| strInput | №0787 |
| stripped | №0806 |
| strMod | №0767 |
| structureBlast | №1067 |
| structureTarget | №1067 |
| studied | №0774 (+ 1 других файлов) |
| style | №0056 (+ 7 других файлов) |
| STYLE_ID | №0838 |
| styleEl | №0788 |
| styles | №0774 (+ 5 других файлов) |
| styleTag | №0827 (+ 1 других файлов) |
| sub | №0069 (+ 9 других файлов) |
| subByName | №0790 |
| subclass | №1109 (+ 3 других файлов) |
| SUBCLASS_FEATURES | №0643 |
| SUBCLASS_MAP | №0643 |
| subclasses | №0636 (+ 6 других файлов) |
| subclassHtml | №0695 |
| subclassLevel | №0773 |
| subclassName | №0708 (+ 1 других файлов) |
| subclassPacks | №0866 |
| subclassResult | №1068 |
| subclassSelect | №0695 |
| subData | №0708 |
| subFeatures | №0790 |
| subId | №0073 |
| subIds | №0867 |
| subject | №0813 |
| subOptionsHtml | №0695 |
| subpacks | №0073 |
| subs | №0073 (+ 2 других файлов) |
| SUBS | №0816 (+ 1 других файлов) |
| subVal | №0775 |
| success | №0069 (+ 6 других файлов) |
| suffix | №0656 |
| suit | №0814 (+ 3 других файлов) |
| suite | №0849 (+ 1 других файлов) |
| SUITS | №0816 |
| sum | №0053 (+ 16 других файлов) |
| summary | №0058 (+ 10 других файлов) |
| summonX | №0814 |
| summonY | №0814 |
| sums | №0056 (+ 2 других файлов) |
| sumSq | №1117 |
| sUp | №0740 |
| supernatural | №0774 |
| supportedSave | №1158 |
| suppressBodyHP | №0642 |
| surface | №0056 (+ 2 других файлов) |
| surfaceDiagnostics | №1269 |
| surfaceKind | №0058 |
| surfaceSelect | №0058 |
| surfaceUrl | №0058 |
| surge | №1146 (+ 1 других файлов) |
| surprised | №0643 |
| sv | №0064 (+ 6 других файлов) |
| sv2 | №0774 |
| swap | №0816 |
| swapped | №1127 |
| swarm | №0058 |
| swarmForm | №0058 |
| swarmLimits | №0061 |
| swarmMotion | №0058 |
| swift | №0774 |
| swiperContainer | №0817 (+ 1 других файлов) |
| sx | №0056 (+ 3 других файлов) |
| sy | №0056 (+ 3 других файлов) |
| synapse | №1068 |
| synapseInstall | №1068 |
| synapseRecord | №0073 |
| sync | №0882 |
| syncRequested | №0805 |
| synergies | №0074 (+ 1 других файлов) |
| SYNERGY | №0074 |
| synergySet | №0074 |
| sys | №0058 (+ 18 других файлов) |
| sz | №0056 (+ 3 других файлов) |
| t | №0053 (+ 104 других файлов) |
| T | №0053 (+ 2 других файлов) |
| t2 | №0808 |
| ta | №0774 |
| tab | №0065 (+ 4 других файлов) |
| tabButtons | №0788 |
| table | №0636 (+ 6 других файлов) |
| tabs | №0666 |
| tabsContainer | №0788 |
| tabsNav | №0863 |
| tabsWrapper | №0788 |
| tacticalBack | №1127 |
| tacticalPC | №1127 |
| tacticalPhone | №1127 |
| tacticalRoster | №1127 |
| tacticalServer | №1127 |
| tactics | №0867 |
| tag | №0056 (+ 15 других файлов) |
| tagOk | №0797 |
| tags | №0056 (+ 9 других файлов) |
| tail | №0056 |
| tailEnd | №0056 |
| tailRoot | №0056 |
| take | №0636 (+ 7 других файлов) |
| takeFromContainer | №0784 |
| taken | №0069 |
| tal | №0774 |
| tampered | №1244 |
| tangent | №0056 |
| taper | №0056 (+ 1 других файлов) |
| tapLength | №0792 |
| target | №0053 (+ 49 других файлов) |
| targetActor | №0813 |
| targetChar | №0826 |
| targetCharId | №0826 |
| targetClass | №0781 (+ 1 других файлов) |
| targetClasses | №0650 |
| targetClassesForSlime | №0650 |
| targetContent | №0788 |
| targetCopy | №0816 |
| targetGrafts | №0650 |
| targetGrappled | №0774 |
| targetH | №0068 |
| targetHasArmor | №0650 |
| targetId | №0651 (+ 6 других файлов) |
| targetIsPugilist | №0650 |
| targetLabels | №1047 |
| targetLevel | №0695 (+ 1 других файлов) |
| targetList | №0651 |
| targetLvl | №0827 |
| targetMeshIndex | №1107 |
| targetName | №0651 |
| targetParent | №0785 |
| targetPath | №1107 (+ 3 других файлов) |
| targetPrim | №1107 |
| targetPrimIndex | №1107 |
| targetProfId | №0818 (+ 1 других файлов) |
| targetProgress | №0838 |
| targetReports | №1119 |
| targetResistances | №0650 |
| targets | №0056 (+ 9 других файлов) |
| targetSnapshot | №0813 |
| targetTok | №0651 |
| targetToken | №0651 |
| targetType | №0808 |
| targetVol | №0077 |
| targetW | №0068 |
| tarot | №0650 (+ 1 других файлов) |
| tarotAC | №0650 |
| tarotActor | №0767 |
| tarotAdv | №0650 |
| tarotCast | №0830 |
| tarotCheck | №0806 |
| tarotDis | №0650 |
| tarotFactor | №0650 |
| tarotForced | №0650 |
| tarotIgnoresResistance | №0650 |
| tarotInitiative | №0768 |
| tarotMod | №0650 |
| tarotOwner | №0768 |
| tarotReroll | №0650 |
| tarotRound | №0778 |
| tarotSave | №0650 |
| tarotScene | №0650 |
| tarotTurnId | №0768 |
| TASKS | №0853 |
| tavern | №1724 |
| tb | №0803 |
| tc | №0774 (+ 1 других файлов) |
| team | №0806 |
| teeth | №0056 |
| teleportAllyId | №0814 |
| teleportX | №0814 |
| teleportY | №0814 |
| temp | №0650 (+ 6 других файлов) |
| TEMPER | №0796 |
| tempHp | №0774 |
| template | №0650 (+ 1 других файлов) |
| term | №1113 |
| terms | №1113 (+ 2 других файлов) |
| terror | №0056 |
| test | №0838 (+ 2 других файлов) |
| testDir | №1305 |
| testRecipe | №1100 |
| tests | №1251 (+ 1 других файлов) |
| tets | №0056 |
| tex | №0057 (+ 2 других файлов) |
| text | №0058 (+ 26 других файлов) |
| textColor | №0767 |
| TextDecoder | №1071 (+ 21 других файлов) |
| textSpan | №0767 |
| texture | №0064 (+ 3 других файлов) |
| textures | №1724 |
| th | №0068 (+ 1 других файлов) |
| theftRef | №0814 |
| theme | №0827 |
| themed | №0668 |
| themeKey | №0827 |
| themeSelect | №0827 |
| theta | №0053 (+ 1 других файлов) |
| thick | №1267 |
| thickness | №0056 |
| thigh | №0054 |
| thin | №1267 |
| THIRD_CASTERS | №0822 |
| THR | №0804 |
| thresholds | №0800 (+ 1 других файлов) |
| THRESHOLDS | №0800 |
| thumbDir | №0056 |
| thumbEnd | №0056 |
| thumbRoot | №0056 |
| thumbs | №0863 |
| thumbSide | №0056 |
| ti | №0056 (+ 3 других файлов) |
| tick | №0806 |
| tid | №0651 |
| tie | №1070 |
| tier | №0660 |
| tile | №0057 |
| time | №0063 (+ 4 других файлов) |
| timedHero | №1068 |
| timeout | №0648 (+ 1 других файлов) |
| timer | №0648 (+ 3 других файлов) |
| timers | №1099 |
| times | №0063 |
| timeSpan | №0767 |
| timeStr | №0785 |
| timeString | №0767 |
| tint | №0058 |
| tiny | №1157 |
| tip | №0053 (+ 1 других файлов) |
| tipSelect | №0058 |
| title | №0058 (+ 7 других файлов) |
| titleEl | №0787 (+ 1 других файлов) |
| titleElem | №0791 (+ 1 других файлов) |
| titleText | №0831 |
| tl | №0053 (+ 1 других файлов) |
| tm | №0767 (+ 1 других файлов) |
| tmax | №0068 |
| tmin | №0068 |
| tmp | №0884 |
| tn | №1110 (+ 1 других файлов) |
| to | №0627 (+ 3 других файлов) |
| toggle | №0661 |
| toggleContainer | №0784 |
| tok | №0651 (+ 2 других файлов) |
| token | №0648 (+ 3 других файлов) |
| tokens | №0062 (+ 1 других файлов) |
| tool | №0631 (+ 10 других файлов) |
| TOOL_IDS | №0663 |
| TOOL_LABELS | №0663 |
| toolbar | №0784 |
| toolBox | №0814 |
| toolId | №0803 |
| toolLabel | №0814 |
| toolMatrix | №0667 |
| toolOk | №0873 |
| toolProficient | №0814 |
| tools | №0076 (+ 5 других файлов) |
| TOOLS | №0667 |
| toolsStr | №0619 (+ 1 других файлов) |
| toolStat | №0814 |
| toolStr | №0641 |
| toolText | №0814 |
| tooth | №0056 |
| toothColor | №1269 |
| toothPart | №0056 |
| top | №0053 (+ 5 других файлов) |
| topology | №1083 |
| topRow | №0788 |
| torso | №0056 (+ 1 других файлов) |
| total | №0056 (+ 35 других файлов) |
| totalAtk | №0831 |
| totalAttack | №0642 |
| totalAttackBonus | №0767 |
| totalCopper | №0785 |
| totalCurrentLevel | №0695 |
| totalDamage | №0642 |
| totalDiceDamage | №0642 |
| totalGain | №0695 |
| totalLevel | №0695 (+ 1 других файлов) |
| totalMod | №0767 |
| totalObjects | №0066 |
| totals | №0648 (+ 1 других файлов) |
| totalSkillMod | №0829 |
| totalSum | №0767 (+ 1 других файлов) |
| totalWeight | №0784 |
| totalWeightKg | №0787 (+ 1 других файлов) |
| totalWeightLb | №0787 |
| totalZones | №0066 |
| totem | №0643 |
| touched | №0806 |
| touchHp | №0808 |
| toxic | №1068 |
| toxicDC | №0073 |
| toxicSave | №0073 |
| toxicTarget | №0073 (+ 1 других файлов) |
| tp | №0806 |
| tr | №0808 (+ 1 других файлов) |
| track | №0077 |
| tracker | №0073 (+ 5 других файлов) |
| trackNameEl | №0077 |
| TRADE_KEY | №0797 |
| traderId | №0794 (+ 2 других файлов) |
| TRADERS | №0794 |
| traditionActions | №0808 |
| traditions | №0808 |
| trained | №1129 (+ 1 других файлов) |
| transfer | №1107 |
| transformed | №1116 (+ 1 других файлов) |
| transforms | №0060 |
| translated | №0062 (+ 1 других файлов) |
| transported | №1127 |
| transpose | №1069 |
| travelling | №1127 |
| tri | №0053 (+ 3 других файлов) |
| triangleHits | №1118 |
| triangles | №0056 (+ 5 других файлов) |
| trick | №0814 |
| TRICK_FEATURES | №0816 |
| trickster | №1127 |
| triggerCustomCreation | №0786 |
| TRIGGERS | №0813 |
| tris | №0056 |
| true | №0774 (+ 3 других файлов) |
| trunk | №0056 |
| ts | №0806 (+ 1 других файлов) |
| tt | №0068 (+ 2 других файлов) |
| tTok | №0650 |
| tu | №1219 (+ 1 других файлов) |
| tuft | №0056 |
| tufts | №0056 |
| turn | №0774 (+ 2 других файлов) |
| turned | №0643 |
| turnId | №0778 (+ 1 других файлов) |
| turnKey | №0774 |
| turnOne | №1067 |
| turnTwo | №1067 |
| tusks | №0056 |
| tw | №0068 |
| two | №1142 |
| tx | №0064 (+ 4 других файлов) |
| txt | №0817 (+ 2 других файлов) |
| typ | №0774 (+ 1 других файлов) |
| type | №0053 (+ 59 других файлов) |
| typeCount | №1119 |
| typedExtraTotal | №0650 |
| types | №0828 (+ 3 других файлов) |
| TYPES | №0795 |
| typeSelect | №0786 |
| u | №0053 (+ 16 других файлов) |
| U | №0053 |
| ub | №0068 |
| ui | №0837 (+ 1 других файлов) |
| uiColorOptions | №0863 |
| uid | №1098 |
| uiFreeGather | №0820 |
| uiGather | №0820 |
| uiMix | №0074 |
| Uint16Array | №1069 (+ 22 других файлов) |
| Uint32Array | №1069 (+ 27 других файлов) |
| Uint8Array | №1071 (+ 22 других файлов) |
| ul | №0056 |
| unacted | №0643 |
| unarmoredBase | №0650 |
| unbreakable | №1148 |
| unbreakableHero | №1148 |
| uncouthId | №0774 |
| uncouthTargets | №0774 |
| undead | №1219 |
| undeadFocus | №0650 |
| undo | №0643 |
| unescape | №1206 (+ 2 других файлов) |
| unique | №0057 (+ 1 других файлов) |
| uniqueFeatsMap | №0695 |
| uniqueMap | №0831 |
| uniqueSuffix | №0786 |
| unit | №0056 (+ 4 других файлов) |
| units | №0827 |
| unknown | №1091 (+ 2 других файлов) |
| unrelated | №1135 (+ 1 других файлов) |
| untrained | №1142 |
| up | №0056 (+ 1 других файлов) |
| update | №0669 (+ 2 других файлов) |
| updateCloudStatus | №0827 |
| updated | №0740 |
| updateListeners | №0882 |
| updater | №0881 (+ 2 других файлов) |
| updateRun | №0837 |
| updateScheduled | №0787 |
| uploadImage | №0058 |
| uploads | №1069 |
| upper | №0054 (+ 5 других файлов) |
| upperSnout | №0056 |
| upTo | №0708 |
| uri | №0064 |
| url | №0058 (+ 40 других файлов) |
| URL | №1099 |
| urlPath | №0884 |
| usage | №0058 |
| use | №0660 |
| useBtn | №0788 |
| used | №0636 (+ 9 других файлов) |
| usedBy | №0668 |
| usedCombat | №0806 |
| usedCount | №0649 |
| usedVal | №0831 |
| useFeature | №0804 |
| useFur | №0058 |
| useReptile | №0058 |
| userProfsIds | №0788 |
| uses | №0643 (+ 3 других файлов) |
| USES | №0798 |
| usesHtml | №0649 |
| useSkinMicro | №0058 |
| utilityArmor | №1127 |
| utilityBack | №1127 |
| utilityBerry | №1127 |
| utilityDash | №1127 |
| utilityPC | №1127 |
| utilityPhone | №1127 |
| utilityRoster | №1127 |
| utilityServer | №1127 |
| uv | №0053 (+ 6 других файлов) |
| uvAnchor | №0053 |
| uvDet | №0053 |
| uvFit | №0053 |
| ux | №0056 |
| uy | №0056 |
| uz | №0056 |
| v | №0054 (+ 150 других файлов) |
| V | №0053 (+ 1 других файлов) |
| v0 | №1115 (+ 2 других файлов) |
| v1 | №1115 (+ 2 других файлов) |
| v2 | №1115 (+ 2 других файлов) |
| v2Broken | №1094 |
| va | №1115 (+ 4 других файлов) |
| val | №0077 (+ 14 других файлов) |
| valEl | №0619 (+ 1 других файлов) |
| valid | №1125 |
| validate | №0667 |
| validBoons | №0774 |
| validRelative | №1104 |
| validStats | №0740 |
| valInput | №0786 |
| valName | №0619 (+ 1 других файлов) |
| vals | №0063 (+ 2 других файлов) |
| valStr | №0619 (+ 1 других файлов) |
| value | №0054 (+ 35 других файлов) |
| values | №0064 (+ 7 других файлов) |
| variableNameUsed | №0767 |
| variant | №1178 |
| variants | №1080 |
| varName | №0767 (+ 2 других файлов) |
| vary | №1093 |
| vb | №1115 (+ 3 других файлов) |
| vc | №1115 (+ 3 других файлов) |
| vector | №0060 |
| venom | №1068 |
| venomDamage | №1067 |
| venomFeature | №1068 |
| venomHero | №1068 |
| venomsmithPoisonImmune | №0650 |
| venomTarget | №1067 |
| verbal | №0813 |
| verm | №0636 |
| version | №0827 (+ 4 других файлов) |
| VERSION | №0061 (+ 25 других файлов) |
| versionText | №0837 |
| vertex | №0056 (+ 1 других файлов) |
| vertices | №0053 (+ 8 других файлов) |
| verts | №0057 (+ 1 других файлов) |
| vesselHP | №1157 |
| vi | №1115 (+ 2 других файлов) |
| victim | №0813 (+ 4 других файлов) |
| view | №0059 (+ 8 других файлов) |
| viewIndex | №0064 |
| views | №0064 (+ 7 других файлов) |
| viscera | №1148 |
| visceraTarget | №1148 |
| visible | №0056 (+ 8 других файлов) |
| visionBack | №1127 |
| visionPC | №1127 |
| visionPhone | №1127 |
| visionRoster | №1127 |
| visionServer | №1127 |
| vm | №0658 (+ 147 других файлов) |
| voice | №1068 |
| voiceInstall | №1068 |
| volatility | №0074 (+ 1 других файлов) |
| volStep | №0077 |
| volumeRange | №0077 |
| volumes | №0056 |
| vp | №0068 |
| vr | №0806 |
| vs | №0058 |
| vuln | №0845 |
| vulnerable | №0650 (+ 1 других файлов) |
| vx | №0056 (+ 1 других файлов) |
| vy | №0056 |
| vz | №0056 (+ 1 других файлов) |
| w | №0054 (+ 33 других файлов) |
| W | №0056 (+ 2 других файлов) |
| w1 | №0056 |
| w2 | №0056 |
| w3 | №0056 |
| wa | №0650 (+ 1 других файлов) |
| wager | №1127 (+ 1 других файлов) |
| wagerGuard | №0814 |
| waistPoints | №1080 |
| waived | №0798 |
| walk | №0839 |
| wall | №0058 |
| wallCache | №0068 |
| wallet | №0794 |
| walletGrid | №0785 |
| wallpapersGridHtml | №0863 |
| wallTypes | №0071 |
| walter | №0056 |
| walterCorpseTarget | №0641 |
| wandering | №1127 |
| wanderPhone | №1127 |
| want | №0796 (+ 2 других файлов) |
| wanted | №0056 (+ 2 других файлов) |
| wantedClass | №0695 |
| war | №0626 (+ 1 других файлов) |
| WAR_ACADEMIES | №0771 |
| ward | №0650 (+ 1 других файлов) |
| wardAbsorbed | №0650 |
| wardenResistant | №0650 |
| wardenSurvive | №0650 |
| wardReduce | №0650 |
| wardrobeSaved | №1267 |
| wardState | №0650 |
| warlordParry | №0650 |
| warp | №1089 (+ 1 других файлов) |
| wasLastStand | №0778 |
| wasNewClass | №0695 |
| wasStand | №0650 |
| wave | №0056 |
| wb | №1115 (+ 2 других файлов) |
| wc | №1115 (+ 2 других файлов) |
| weapon | №0818 (+ 8 других файлов) |
| weaponAttack | №1145 |
| weaponFields | №0786 |
| weaponId | №0818 (+ 2 других файлов) |
| weaponName | №0818 (+ 2 других файлов) |
| weapons | №0806 |
| weaponsDb | №0818 (+ 1 других файлов) |
| wear | №0660 |
| webbedTarget | №1068 |
| webDebuffs | №0073 |
| webResult | №1068 |
| webRoot | №0881 |
| webSave | №0073 |
| webTarget | №0073 |
| weight | №0056 (+ 5 других файлов) |
| weightCases | №1723 |
| weightHero | №1723 |
| weightInp | №0786 |
| weightRes | №0786 |
| weights | №0053 (+ 6 других файлов) |
| weightStr | №0787 (+ 1 других файлов) |
| weightTotal | №1723 |
| weightValue | №1254 |
| weldedBoundary | №0053 |
| weldKey | №0053 |
| wh | №0056 |
| whiskers | №0056 |
| who | №0806 |
| wi | №0071 (+ 1 других файлов) |
| wide | №0056 |
| width | №0056 (+ 7 других файлов) |
| wild | №0625 (+ 1 других файлов) |
| willActivate | №0650 |
| willingTargetIds | №0814 |
| win | №0881 (+ 5 других файлов) |
| window | №1724 |
| wingAngle | №0056 |
| wis | №0623 (+ 11 других файлов) |
| wisMod | №0619 (+ 1 других файлов) |
| WITCH_CRAFT_DATA | №0774 |
| WITCH_CRAFTS | №0774 |
| WITCH_CURSE_EFFECTS | №0774 |
| WITCH_CURSES | №0774 |
| WITCH_GRAND_HEXES | №0774 |
| WITCH_HEXES | №0774 |
| witchAttackPenalty | №0650 |
| witchElemental | №0650 |
| witchImperil | №0650 |
| witchLabels | №0774 |
| witchPack | №0774 |
| withFade | №0863 |
| within1 | №1121 |
| within5 | №1121 |
| wiz | №0806 |
| Wizard | №1094 |
| wk | №1118 |
| wl | №0643 |
| wName | №0642 |
| wolf | №1157 |
| won | №1134 |
| wood | №0058 |
| words | №0062 |
| world | №0053 (+ 2 других файлов) |
| WORLD_STATE | №0873 |
| woven | №0058 |
| wp | №0863 (+ 1 других файлов) |
| wrap | №0620 (+ 4 других файлов) |
| wrapped | №0778 (+ 4 других файлов) |
| wrappedTools | №0822 |
| wrapper | №0767 (+ 1 других файлов) |
| wrapS | №0068 |
| wrapT | №0068 |
| wrist | №0056 |
| wrists | №0056 |
| write | №0813 |
| wrong | №1148 (+ 2 других файлов) |
| ws | №0058 (+ 2 других файлов) |
| wt | №0058 (+ 1 других файлов) |
| ww | №0068 |
| wx | №0067 (+ 1 других файлов) |
| wy | №0067 (+ 1 других файлов) |
| x | №0054 (+ 163 других файлов) |
| X | №0067 |
| x0 | №0056 |
| x1 | №0056 (+ 2 других файлов) |
| x2 | №0066 (+ 1 других файлов) |
| xenoHero | №1067 |
| xenoOwner | №1068 |
| xn | №0076 (+ 1 других файлов) |
| xp | №0623 (+ 11 других файлов) |
| XP_BY_CR | №0800 |
| xs | №1247 |
| xt | №0076 |
| xx | №0056 (+ 3 других файлов) |
| xy | №0068 |
| y | №0053 (+ 55 других файлов) |
| Y | №0056 (+ 1 других файлов) |
| y0 | №0056 (+ 1 других файлов) |
| y1 | №0056 (+ 4 других файлов) |
| y2 | №0066 (+ 2 других файлов) |
| yaw | №0058 (+ 36 других файлов) |
| yd | №0774 |
| yes | №0054 (+ 2 других файлов) |
| yf | №1115 |
| yFile | №1117 |
| ys | №0056 |
| yuan | №1075 (+ 2 других файлов) |
| yy | №0056 (+ 1 других файлов) |
| z | №0053 (+ 19 других файлов) |
| z0 | №0056 (+ 1 других файлов) |
| z1 | №0056 (+ 1 других файлов) |
| zb | №0056 |
| zf | №0056 |
| zFile | №1117 |
| ZH | №0067 |
| zi | №0067 |
| zlib | №1093 (+ 7 других файлов) |
| zoom | №0058 (+ 2 других файлов) |
| zs | №0067 |
| ZW | №0067 |
| ZX | №0067 |
| ZY | №0067 |
| zz | №0056 (+ 1 других файлов) |

### Глобальные JS API (563)

| Имя | Исходные файлы |
|---|---|
| __diceGameplayRelocationObserver | №0767 |
| __diceGameplayRelocationQueued | №0767 |
| __diceTabPanelObserver | №0767 |
| __DND_APP_BOOT_READY | №0078 |
| __dndGameplayV57Waiter | №0778 |
| __dndLootV36 | №0802 |
| __dndLootV37 | №0803 |
| __dndLootV40 | №0801 |
| __dndModalFrameObserverInstalled | №0827 |
| __dndPendingReactionRequest | №0806 |
| __fallbackRollDice | №0767 |
| __map | №1099 |
| __TEST_RESULT__ | №1234 |
| _dndFaqRender | №0810 |
| _dndSave | №0833 (+ 6 других файлов) |
| _dndTourBack | №0810 |
| _dndTourNext | №0810 |
| _dndTourSkip | №0810 |
| _expBeforeLevelUp | №0695 |
| _loadedFeatsMap | №0695 |
| _loadedSubclassOptions | №0695 |
| _originalAddItemToInventory | №0787 |
| AbortController | №0837 |
| ACCURSED_V11 | №0072 |
| accursedAfflictions | №0072 |
| accursedProgression | №0072 (+ 2 других файлов) |
| accursedRuntime | №0072 (+ 1 других файлов) |
| addEventListener | №1129 (+ 4 других файлов) |
| addExperienceValue | №0775 |
| addItemToInventory | №0787 (+ 2 других файлов) |
| ALCHEMIST_MHP_2024 | №0073 |
| alchemistProgression | №0672 |
| alert | №0806 (+ 3 других файлов) |
| allCharacters | №0619 (+ 4 других файлов) |
| appDebugLogs | №0827 (+ 1 других файлов) |
| appendDiceLog | №0643 (+ 3 других файлов) |
| applyClassProgression | №0708 |
| applyConditionsToRoll | №1146 |
| applyDndASI | №0822 |
| applyMulticlassProficiencies | №0695 (+ 1 других файлов) |
| applySubclassProgression | №0643 (+ 1 других файлов) |
| artificerProgression | №0674 |
| autoSaveCurrentCharacter | №0076 (+ 39 других файлов) |
| averageHpIncrease | №0695 |
| barbarianProgression | №0676 |
| bardProgression | №0678 |
| beastheartProgression | №0681 (+ 1 других файлов) |
| BeastheartRuntime | №0681 |
| bloodHunterProgression | №0683 |
| calculateMods | №0822 (+ 1 других файлов) |
| changePointBuyStat | №0619 (+ 1 других файлов) |
| checkMulticlassRequirements | №0781 (+ 1 других файлов) |
| chooseAssassinSubclass | №0643 |
| chooseMetamagic | №0643 |
| chooseSubclass | №0708 |
| chooseSubclassForClass | №0643 |
| CLASS_SPELLCASTING_ABILITIES_2014 | №0708 |
| CLASSES_REFERENCE | №0073 (+ 4 других файлов) |
| clericProgression | №0684 |
| closeAddFeatModal | №0740 |
| closeCharacterCreationModal | №0619 (+ 1 других файлов) |
| closeCustomAlert | №0787 |
| closeDndChangelog | №0810 |
| closeDndNetworkModal | №0805 |
| closeExperienceModal | №0775 |
| closeIconSettingsModal | №0827 (+ 2 других файлов) |
| closeLevelUpModal | №0695 |
| closeSettingsModal | №0827 |
| Companions | №0653 |
| confirm | №0058 (+ 2 других файлов) |
| confirmAddFeatManual | №0740 |
| confirmLevelUp | №0695 |
| createNewCharacter | №0619 (+ 1 других файлов) |
| createSwarmAvatar | №0834 |
| crypto | №1124 (+ 19 других файлов) |
| currentChar | №0827 (+ 31 других файлов) |
| currentCharacter | №0827 (+ 10 других файлов) |
| currentCharacterId | №0648 (+ 2 других файлов) |
| currentRollMode | №1142 |
| defaultArmors | №0079 |
| defaultConsumables | №0654 (+ 1 других файлов) |
| defaultJunk | №0789 (+ 2 других файлов) |
| defaultMaterials | №0799 (+ 2 других файлов) |
| defaultWeapons | №0818 (+ 1 других файлов) |
| disableDndDebugRuntime | №0827 (+ 1 других файлов) |
| DND_ALCHEMY_GATHERING_V52 | №0076 |
| DND_APP_ICONS | №0827 (+ 2 других файлов) |
| DND_BESTIARY_V56_1 | №0623 |
| DND_BESTIARY_V56_10 | №0624 |
| DND_BESTIARY_V56_11 | №0625 |
| DND_BESTIARY_V56_12 | №0626 |
| DND_BESTIARY_V56_13 | №0627 |
| DND_BESTIARY_V56_2 | №0628 |
| DND_BESTIARY_V56_3 | №0629 |
| DND_BESTIARY_V56_4 | №0630 |
| DND_BESTIARY_V56_5 | №0631 |
| DND_BESTIARY_V56_6 | №0632 |
| DND_BESTIARY_V56_7 | №0633 |
| DND_BESTIARY_V56_8 | №0634 |
| DND_BESTIARY_V56_9 | №0635 |
| DND_CRAFT_DISASSEMBLY_V51 | №0659 |
| DND_CRAFT_ECONOMY_V49 | №0662 |
| DND_CRAFT_PROFESSION_PROGRESS | №0665 |
| DND_CRAFT_PROFESSIONS_V33 | №0666 |
| DND_CRAFT_PROFESSIONS_V38 | №0667 |
| DND_CRAFT_PROFESSIONS_V47 | №0665 |
| DND_CRAFT_PROFESSIONS_V47_CRAFT | №0665 |
| DND_CRAFT_RESOURCES_V34 | №0668 |
| DND_CRAFT_V51 | №0660 |
| DND_CRAFTING_DLC_V50 | №0661 |
| DND_CRAFTING_V31 | №0663 |
| DND_CUSTOM_CRAFTING_V32 | №0669 |
| DND_EXP_TABLE | №0775 |
| DND_INVENTORY_CONTAINERS_V54 | №0784 |
| DND_MARKET_V55 | №0794 |
| DND_MARKET_V55_1 | №0795 |
| DND_MARKET_V55_3 | №0796 |
| DND_PENDING_CLASS_PACKS | №0072 (+ 8 других файлов) |
| DND_PLANESCAPE_V56_13 | №0627 |
| DND_RESOURCE_GATHERING_V35 | №0820 |
| DND_RESOURCE_PROCESSING_V43 | №0821 |
| DND_UPDATE_MANAGER | №0837 |
| DND_UPDATE_SCENE_V2 | №0838 |
| DND_UPDATE_UI | №0837 |
| DND_WORLD_GATHERING_V53 | №0873 |
| DND3DAssetCatalog | №0062 (+ 1 других файлов) |
| DND3DAssetNames | №0062 (+ 1 других файлов) |
| DND3DMap | №0065 |
| dndAddCompanionAttack | №0822 |
| DNDAdvancedDebugV70 | №0848 |
| DNDAlchemy | №0074 |
| dndBackgrounds | №0619 |
| dndBattleActionClose | №0620 |
| dndBattleActionOpen | №0620 (+ 1 других файлов) |
| dndBattleQuickAttack | №0620 |
| dndBattleQuickMove | №0620 |
| dndBattleQuickReady | №0620 |
| dndBattleQuickSpell | №0620 |
| DNDBloodHunter | №0636 |
| DNDCampaign | №0637 |
| DNDCharacter3D | №0061 |
| DNDCharacterAnatomy | №0054 |
| DNDCharacterAnatomyGeometry | №0053 |
| DNDCharacterAppearanceStore | №0055 |
| DNDCharacterBodyGeometry | №0056 |
| DNDCharacterClothing | №0057 |
| DNDCharacterEditor3D | №0058 |
| dndCharacterEditorLaunchError | №1047 |
| DNDCharacterLabV702 | №0844 |
| DNDCharacterMorphAssets | №0059 |
| DNDCharacterPose | №0060 |
| DNDClassFeatures | №0643 (+ 1 других файлов) |
| DNDCloudAccount | №0646 |
| DNDCloudConfig | №0647 |
| DNDCloudSync | №0648 |
| dndCollectMonsterLootV36 | №0802 |
| dndCollectMonsterLootV37 | №0803 |
| dndCollectMonsterLootV40 | №0801 |
| DNDCombat | №0650 (+ 1 других файлов) |
| DNDCombatEventBusV69 | №0842 |
| dndCombatLog | №0833 |
| DNDCombatLogV66 | №0843 |
| dndCompanionAttack | №0822 |
| dndCompanionDamage | №0822 |
| DNDCompanionGameplayV27 | №0651 |
| dndCompanionHeal | №0822 |
| DNDCompanionPacks | №0652 |
| dndCompanionStat | №0822 |
| dndConcentrationDamagePrompt | №0822 |
| DNDContent | №0656 |
| DNDContentCatalog | №0655 |
| DNDContentManifest | №0657 |
| dndCraft | №0663 |
| dndCraftProfession | №0666 |
| dndCraftProfessionV38 | №0660 (+ 3 других файлов) |
| dndCreateBeastheartCompanion | №0652 |
| dndCreateBeastMasterCompanion | №0652 |
| dndCreateFamiliar | №0652 |
| dndCreateSteed | №0652 |
| dndDebugEnabled | №1047 |
| DNDDebugScenarioEditorV705 | №0851 |
| DNDDebugScenarioManagerV704 | №0852 |
| DNDDiceResolutionV65 | №0854 |
| DNDEncounterCheckpointV68 | №0855 |
| DNDEncounterMapV59 | №0856 |
| DNDExpandedV23 | №0771 |
| DNDExpansionClasses | №0774 |
| DNDFeats | №0777 |
| dndGameplayCoreV57Render | №0778 |
| DNDGameplayV57 | №0778 |
| dndGenerateMonsterLootV36 | №0802 |
| dndGenerateMonsterLootV37 | №0801 (+ 1 других файлов) |
| DNDGLTF | №0064 |
| DNDGLTFCharacterPipeline | №0063 |
| dndInitiativeActive | №0822 |
| dndInitiativeDamageActive | №0822 |
| dndInitiativeHealActive | №0822 |
| dndInitiativeSkipDefeated | №0822 |
| DndInventoryContainersV54 | №0784 |
| DndItemDatabase | №0787 |
| dndLaunchCharacterEditor3D | №1047 |
| DNDMagic | №0793 |
| dndMap3DOpen | №0065 |
| DNDMapModel | №0066 |
| DNDMapRenderer2D | №0067 |
| DNDMapRenderer3D | №0068 (+ 1 других файлов) |
| DndMarketV55 | №0794 |
| DndMarketV55_3 | №0796 |
| DNDMobileBattleV61 | №0858 |
| DNDMobileSessionV67 | №0860 |
| DNDMonsterLoot | №0802 (+ 1 других файлов) |
| DNDMonsterLootV40 | №0801 |
| DNDMonsters | №0800 |
| dndNetwork | №1099 (+ 4 других файлов) |
| dndNetworkAddPlayerToInitiative | №0806 |
| dndNetworkCopyHint | №0805 |
| dndNetworkGameplayBuildProfile | №0806 |
| dndNetworkGameplayEvent | №0806 |
| dndNetworkGameplayMonsterAction | №0806 |
| dndNetworkGameplayMonsterState | №0806 |
| dndNetworkGameplayPeerDisconnect | №0806 |
| dndNetworkGameplayPeerHello | №0806 |
| dndNetworkGameplayPendingReactions | №0806 |
| dndNetworkGameplayPrepareHostHandoff | №0806 |
| dndNetworkGameplayReactionRequest | №0806 |
| dndNetworkGameplayRender | №0778 (+ 2 других файлов) |
| dndNetworkGameplayResult | №0806 |
| dndNetworkGameplayRoomShutdown | №0806 |
| dndNetworkGameplaySnapshot | №0806 |
| dndNetworkHostCreate | №0805 |
| dndNetworkHostFinish | №0805 |
| dndNetworkJoinCreate | №0805 |
| dndNetworkKick | №0805 |
| dndNetworkNewInvite | №0805 |
| dndNetworkSingle | №0805 |
| dndOpenCharacterEditor3D | №0058 |
| DNDPredictor | №0816 |
| DNDPredictorCards | №0813 |
| DNDPredictorMovement | №0815 |
| DNDPredictorUI | №0814 |
| dndProcessResourceV43 | №0821 |
| dndRemoveCompanionAttack | №0822 |
| dndRenderAlchemy | №0074 (+ 1 других файлов) |
| dndRenderCombat | №0636 |
| dndRenderCombatV3 | №0806 (+ 1 других файлов) |
| DNDRules | №0822 (+ 1 других файлов) |
| DNDSecondaryEntities | №0825 |
| dndShowRulesSummary | №0822 |
| DNDSpellPreparation | №0831 |
| dndSplashFinished | №0792 (+ 2 других файлов) |
| DNDStairNavigation | №0070 |
| dndStartConcentrationPrompt | №0822 |
| DNDStressMap | №0071 |
| dndSummonAttack | №0833 |
| dndSummonCommand | №0833 |
| dndSummonHeal | №0833 |
| DNDSummoning | №0833 |
| dndSyncCurrentCharacterFromCombat | №0806 (+ 2 других файлов) |
| dndUseAlchemyProduct | №0075 |
| dndV59CreateEncounter | №0856 |
| dndV61ResetView | №0858 |
| dndV65Close | №0854 |
| dndV65Open | №0854 |
| dndV65Resolve | №0854 |
| dndV66Clear | №0843 |
| dndV66CloseDebug | №0843 |
| dndV66CloseLog | №0843 |
| dndV66Export | №0843 |
| dndV66Filter | №0843 |
| dndV66OpenDebug | №0843 |
| dndV66OpenLog | №0843 |
| dndV66Record | №0842 (+ 1 других файлов) |
| dndV66RefreshDebug | №0843 |
| dndV66SelfTest | №0843 |
| dndV67Close | №0860 |
| dndV67Delete | №0860 |
| dndV67Export | №0860 |
| dndV67FileImport | №0860 |
| dndV67Open | №0860 |
| dndV67Restore | №0860 |
| dndV67Save | №0860 |
| dndV68Close | №0855 |
| dndV68Delete | №0855 |
| dndV68Export | №0855 |
| dndV68FileImport | №0855 |
| dndV68Open | №0855 |
| dndV68Restore | №0855 |
| dndV68Save | №0855 |
| dndV69Clear | №0842 |
| dndV69CloseReplay | №0842 |
| dndV69ExportReplay | №0842 |
| dndV69Filter | №0842 |
| dndV69OpenReplay | №0842 |
| dndV69Play | №0842 |
| dndV69Record | №0842 |
| dndV69Seek | №0842 |
| dndV69Step | №0842 |
| dndV69Stop | №0842 |
| dndV702AddClass | №0844 |
| dndV702AddFeat | №0844 |
| dndV702AddItem | №0844 |
| dndV702AddSpell | №0844 |
| dndV702Close | №0844 |
| dndV702Open | №0844 |
| dndV702Recalc | №0844 |
| dndV702RemoveClass | №0844 |
| dndV702RemoveFeat | №0844 |
| dndV702RemoveItem | №0844 |
| dndV702RemoveSpell | №0844 |
| dndV702SetBackground | №0844 |
| dndV702SetClassLevel | №0844 |
| dndV702SetProfession | №0844 |
| dndV702SetRace | №0844 |
| dndV702SetTotalLevel | №0844 |
| dndV702Tab | №0844 |
| dndV704Close | №0852 |
| dndV704Open | №0852 |
| dndV704Remove | №0852 |
| dndV704Rollback | №0852 |
| dndV704Run | №0852 |
| dndV704SaveCustom | №0852 |
| dndV704Select | №0852 |
| dndV705Close | №0851 |
| dndV705Create | №0851 |
| dndV705Export | №0851 |
| dndV705ImportPrompt | №0851 |
| dndV705Open | №0851 |
| dndV705Rollback | №0851 |
| dndV705Run | №0851 |
| dndV705Select | №0851 |
| dndV708Close | №0853 |
| dndV708Open | №0853 |
| dndV708Reset | №0853 |
| dndV70ApiFilter | №0848 |
| dndV70CallAPI | №0848 |
| dndV70ClearErrors | №0848 |
| dndV70CloseDebug | №0848 |
| dndV70Export | №0848 |
| dndV70InspectSource | №0848 |
| dndV70ModuleFilter | №0848 |
| dndV70OpenDebug | №0848 |
| dndV70RefreshDebug | №0848 |
| dndV70RunHealthCheck | №0848 |
| dndV70SetAPIArgs | №0848 |
| dndV70SetAPIPath | №0848 |
| dndV70Tab | №0848 |
| dndV70UseAPI | №0848 |
| document | №1140 (+ 1 других файлов) |
| druidProgression | №0686 |
| enableDndDebugLogger | №0827 (+ 2 других файлов) |
| enableDndDebugRuntime | №0827 (+ 1 других файлов) |
| ensureDndToolsState | №1131 (+ 5 других файлов) |
| escapeDndHtml | №0621 (+ 3 других файлов) |
| EXTRA_BODY_RUNTIME | №0779 (+ 1 других файлов) |
| FEATS_PHB | №0741 |
| FEATS_SETTING | №0742 |
| FEATS_TCOE | №0743 |
| FEATS_UA_HOMEBREW | №0744 |
| FEATS_XGTE | №0745 |
| fetch | №1099 (+ 2 других файлов) |
| fighterProgression | №0689 |
| filterFeatsList | №0740 |
| geistProgression | №0688 |
| getAllBackgrounds | №0619 |
| getAvailableSubclasses | №0643 (+ 3 других файлов) |
| getCharacterCurrentLevel | №0775 |
| getCharacterLevel | №0775 (+ 3 других файлов) |
| getClassData | №0644 (+ 2 других файлов) |
| getCurrentInventoryWeightData | №0787 (+ 1 других файлов) |
| getDndRules | №0822 |
| getExpandedClassDefinition | №0770 |
| getExpandedClassPack | №0770 |
| getFormattedClassAndLevel | №0695 |
| getKibblesClassDisplayName | №0790 |
| getLevelByExp | №0775 |
| getProfBonusNum | №0643 (+ 2 других файлов) |
| getShifterBloodline | №0828 |
| getShifterBloodlines | №0828 |
| getShifterMaxCR | №0828 |
| getSpellcastingAbilityForClass | №0708 |
| getSpellCastingInfo | №0793 |
| getStatModNum | №0643 (+ 2 других файлов) |
| getSubclassData | №0708 (+ 1 других файлов) |
| getSubclassesForClass | №0644 |
| getSubclassFeaturesForLevel | №0765 |
| getSwarmDevourDamage | №0834 |
| getSwarmDevourDC | №0834 |
| getSwarmMutationSlots | №0834 |
| getSwarmState | №0834 |
| getVesselAspects | №0839 |
| getVesselSpellList | №0839 |
| getVesselSpirit | №0839 |
| GHOST_EXTRA | №0779 |
| ghostProgression | №0692 (+ 2 других файлов) |
| goToTab | №0643 |
| heavyWeapons | №0869 |
| Hero | №0781 |
| illriggerProgression | №0693 (+ 1 других файлов) |
| KIBBLES_CLASS_I18N | №0790 |
| KIBBLES_SOURCE_CATALOG | №0790 |
| KIBBLES_SOURCE_INFO | №0790 |
| kind | №0814 |
| listIntegratedExpandedClasses | №0770 |
| logs | №1142 |
| MARTYR_2024 | №0798 |
| MARTYR_BURDENS | №0798 |
| martyrProgression | №0696 (+ 1 других файлов) |
| martyrRuntime | №0798 |
| maxHpIncrease | №0695 |
| meleeWeapons | №0870 |
| monkProgression | №0698 |
| MULTICLASS_CLASS_REQUIREMENTS | №0770 (+ 2 других файлов) |
| MULTICLASS_PROFICIENCIES_2014 | №0708 (+ 1 других файлов) |
| MULTICLASS_REQUIREMENTS | №0781 |
| NECROMANCER_2024 | №0804 |
| NECROMANCER_SUBCLASSES | №0804 |
| necromancerProgression | №0700 (+ 1 других файлов) |
| necromancerRuntime | №0804 |
| nextInitiativeTurn | №0822 |
| OCCULTIST_KIBBLES_V11 | №0808 |
| occultistProgression | №0702 |
| occultistRuntime | №0808 |
| onerror | №0766 |
| onExpInputChange | №0775 |
| onFeatOrAsiChange | №0695 |
| onSubclassChange | №0695 |
| openAddFeatModal | №0740 |
| openCharacter | №0831 |
| openDndChangelog | №0810 |
| openDndNetworkModal | №0805 |
| openExperienceModal | №0775 |
| openFeatStatChoiceModal | №0740 |
| openIconSettingsModal | №0827 (+ 2 других файлов) |
| openLevelUpModal | №0695 |
| openLevelUpModalFromExp | №0775 |
| openSettingsModal | №0827 |
| paladinProgression | №0704 |
| PARASITE_EXTRA | №0811 |
| parasiteProgression | №0706 (+ 2 других файлов) |
| parasiteRuntime | №0811 |
| parseWeightToKg | №0787 (+ 1 других файлов) |
| pendingLevelUpData | №0695 |
| populateFeatModalList | №0740 |
| Prof_Acr | №0078 |
| Prof_Ani | №0078 |
| Prof_Arc | №0078 |
| Prof_Ath | №0078 (+ 1 других файлов) |
| Prof_Dec | №0078 |
| Prof_His | №0078 |
| Prof_Ins | №0078 |
| Prof_Inv | №0078 |
| Prof_Itm | №0078 |
| Prof_Med | №0078 |
| Prof_Nat | №0078 |
| Prof_Prc | №0078 |
| Prof_Prf | №0078 |
| Prof_Prs | №0078 |
| Prof_Rel | №0078 |
| Prof_Soh | №0078 |
| Prof_Stl | №0078 |
| Prof_Sur | №0078 |
| prompt | №1129 (+ 1 других файлов) |
| psionProgression | №0709 (+ 1 других файлов) |
| pugilistProgression | №0711 (+ 1 других файлов) |
| pugilistRuntime | №0774 |
| rangedWeapons | №0871 |
| rangerProgression | №0713 |
| refreshClassModalLocks | №0695 |
| refreshExtraClassPanels | №0776 |
| removeCharacterFeat | №0740 |
| renderClassFeatures | №0636 (+ 1 других файлов) |
| renderCombatAbilities | №0636 (+ 1 других файлов) |
| renderCompanions | №0822 |
| renderDndTools | №0768 (+ 2 других файлов) |
| renderGhostExtraPanel | №0776 |
| renderInitiativeTracker | №0778 (+ 11 других файлов) |
| renderInventory | №0076 (+ 13 других файлов) |
| renderParasiteExtraPanel | №0776 |
| renderSpellSlots | №0822 (+ 2 других файлов) |
| renderWalterParasitePanel | №0776 |
| renderWeapons | №0822 |
| requestAnimationFrame | №1259 (+ 18 других файлов) |
| resolveMulticlassProficiencyChoice | №0695 (+ 1 других файлов) |
| restorePactMagic | №0768 (+ 2 других файлов) |
| rogueProgression | №0715 |
| rollClassFeatureD20 | №0643 |
| rollClassFeatureDamage | №0643 |
| rollHpIncrease | №0695 |
| rollSingleDice | №0822 |
| RUNEKeeper_V12 | №0823 |
| runeKeeperDialects | №0823 |
| runeKeeperProgression | №0718 (+ 2 других файлов) |
| runeKeeperRuntime | №0774 (+ 1 других файлов) |
| SAVANT_V561 | №0824 |
| savantDisciplines | №0824 |
| savantProgression | №0719 (+ 2 других файлов) |
| savantRuntime | №0824 |
| saveAllCharacters | №1122 (+ 1 других файлов) |
| saveCharacter | №0076 (+ 5 других файлов) |
| saveCurrentCharacter | №0073 |
| saved | №1140 |
| savedDimBeforeHide | №0863 |
| saveNewCreatedCharacter | №0619 (+ 1 других файлов) |
| selectedBaseHp | №0695 |
| selectLauncherIcon | №0827 (+ 2 других файлов) |
| setCharacterLevel | №0827 (+ 2 других файлов) |
| setTimeout | №1129 (+ 1 других файлов) |
| SHIFTER_V21 | №0828 |
| shifterProgression | №0721 (+ 2 других файлов) |
| shifterRuntime | №0828 |
| showCustomAlert | №0787 (+ 1 других файлов) |
| SKILL_TO_VAR_MAP | №1142 |
| SKILLS_CONFIG | №0078 |
| sorcererProgression | №0723 |
| sortInitiativeTracker | №0833 (+ 1 других файлов) |
| specialWeapons | №0872 |
| SPELLBLADE_RUNTIME | №0830 |
| spellbladeProgression | №0830 |
| spells3lvl | №0758 |
| spells4lvl | №0759 |
| spells5lvl | №0760 |
| spells6Lvl | №0761 |
| spells8lvl | №0763 |
| spells9lvl | №0764 |
| spellsLevel1 | №0756 |
| spellsLevel2 | №0757 |
| spellsLevel7 | №0762 |
| startDndOnboarding | №0810 |
| SUBCLASSES_REFERENCE | №0073 (+ 6 других файлов) |
| subtractExperienceValue | №0775 |
| SWARM_EXTRA | №0834 |
| swarmProgression | №0725 (+ 2 других файлов) |
| swarmRuntime | №0834 |
| syncDndNetworkInitiative | №1131 (+ 4 других файлов) |
| syncLevelUI | №0695 |
| toggleClassFeatureDetails | №0643 |
| triggerCritEffect | №1146 |
| updateCharacterArmorClass | №1136 |
| updateCharacterSpellSlots | №0695 (+ 1 других файлов) |
| updateExperienceModalUI | №0775 |
| updateExtraClassCreationUI | №0641 |
| updateMagicData | №0793 |
| updateNetworkModeUI | №0805 |
| useBloodHunterFeature | №0636 |
| useClassFeature | №0643 |
| useFeat | №0777 |
| VESSEL_V4 | №0839 |
| vesselProgression | №0727 (+ 1 других файлов) |
| vesselRuntime | №0839 |
| VTT_PROJECT_MANIFEST_V70 | №0861 |
| WALTER_PARASITE_EXTRA | №0864 |
| walterParasiteProgression | №0729 (+ 2 других файлов) |
| WARDEN_MHP_2024 | №0866 |
| wardenProgression | №0730 (+ 1 других файлов) |
| warlockProgression | №0732 |
| WARLORD_LASERLLAMA_V330 | №0867 |
| warlordProgression | №0734 (+ 1 других файлов) |
| WEAPONS_DB | №0818 (+ 1 других файлов) |
| window | №1099 (+ 8 других файлов) |
| WITCH_MHP_2014 | №0774 |
| witchProgression | №0736 |
| witchRuntime | №0774 |
| wizardProgression | №0738 |

### Поля персонажа (101)

| Имя | Исходные файлы |
|---|---|
| ac | №0788 (+ 4 других файлов) |
| actionSurges | №0822 |
| activeConditions | №0642 (+ 5 других файлов) |
| activeFolderId | №0807 |
| anatomy | №0054 |
| appearance3d | №1076 (+ 1 других файлов) |
| baseAC | №0788 (+ 3 других файлов) |
| class | №0775 (+ 3 других файлов) |
| classes | №0781 (+ 8 других файлов) |
| classFeaturesState | №0768 (+ 1 других файлов) |
| className | №0695 (+ 2 других файлов) |
| clothing | №0054 (+ 1 других файлов) |
| coinLog | №0785 |
| coins | №0785 (+ 2 других файлов) |
| combatAbilities | №0642 (+ 1 других файлов) |
| combatAbilityStat | №0649 |
| companions | №0768 |
| con | №0695 |
| concentration | №0822 (+ 1 других файлов) |
| conditions | №0767 (+ 3 других файлов) |
| constitution | №0695 |
| craftingProfessions | №0664 |
| dead | №0642 (+ 1 других файлов) |
| deathSaves | №0650 (+ 4 других файлов) |
| defeated | №0768 (+ 3 других файлов) |
| encounters | №1047 |
| equipment | №0058 |
| equippedWeapon | №0818 (+ 1 других файлов) |
| exp | №0775 (+ 1 других файлов) |
| extraACBonus | №0822 |
| extraClassType | №0642 (+ 6 других файлов) |
| feats | №0695 (+ 2 других файлов) |
| featStatBonuses | №0740 |
| features | №0695 (+ 3 других файлов) |
| folders | №0807 |
| gender | №0054 (+ 1 других файлов) |
| ghost | №0779 |
| head | №0054 (+ 1 других файлов) |
| heroClass | №0831 |
| hostName | №0779 (+ 2 других файлов) |
| hp | №0642 (+ 4 других файлов) |
| hpCurrent | №0642 (+ 8 других файлов) |
| hpMax | №0642 (+ 5 других файлов) |
| hpTemp | №1129 |
| id | №0768 (+ 4 других файлов) |
| initiativeTracker | №0768 (+ 9 других файлов) |
| inspiration | №1129 |
| inventory | №0787 (+ 14 других файлов) |
| isExtraClass | №0695 (+ 5 других файлов) |
| kiPoints | №0708 (+ 1 других файлов) |
| lastRest | №0642 (+ 1 других файлов) |
| level | №0827 (+ 6 других файлов) |
| library | №0791 |
| libraryData | №0791 |
| morphChannels | №0059 (+ 2 других файлов) |
| multiclassAllowed | №0779 (+ 2 других файлов) |
| name | №0768 (+ 1 других файлов) |
| originRaceId | №0054 |
| pactMagic | №0768 (+ 2 других файлов) |
| pactMagicData | №0768 (+ 3 других файлов) |
| parasite | №0811 |
| pendingProficiencyChoices | №0708 |
| position | №1129 |
| predictorState | №0788 (+ 4 других файлов) |
| profBonus | №0831 (+ 1 других файлов) |
| proficiencies | №0788 (+ 3 других файлов) |
| race | №0695 (+ 2 других файлов) |
| raceId | №0054 (+ 1 других файлов) |
| raceName | №0779 (+ 2 других файлов) |
| rageDamageBonus | №0708 |
| ragesCount | №0708 (+ 1 других файлов) |
| replacesRace | №0779 (+ 3 других файлов) |
| resistances | №1068 |
| resources | №0822 (+ 1 других файлов) |
| revision | №0648 |
| savesData | №0619 (+ 2 других файлов) |
| secondWindUses | №0822 |
| skills | №0708 (+ 1 других файлов) |
| skillsData | №0619 (+ 5 других файлов) |
| skillValues | №0078 |
| skins | №0054 (+ 5 других файлов) |
| sneakAttackDice | №0708 |
| sorceryPoints | №0708 (+ 1 других файлов) |
| speed | №0779 (+ 3 других файлов) |
| spellcastingSources | №0708 (+ 1 других файлов) |
| spells | №0768 |
| spellsData | №0822 (+ 1 других файлов) |
| spellSlotsData | №0642 (+ 4 других файлов) |
| spellStat | №0708 |
| stats | №0781 (+ 12 других файлов) |
| subclass | №0708 (+ 1 других файлов) |
| swarm | №0695 (+ 1 других файлов) |
| tarotEffects | №1127 (+ 1 других файлов) |
| tarotKnowledge | №1127 |
| tempHp | №1068 |
| turnResources | №0768 (+ 1 других файлов) |
| unsaved | №1099 |
| valueOf | №0831 |
| walterParasite | №0695 (+ 1 других файлов) |
| weaponsData | №0642 |
| worldMatrices | №0054 (+ 3 других файлов) |

### Поля JS объектов (6518)

| Имя | Исходные файлы |
|---|---|
| _ | №1162 (+ 11 других файлов) |
| __base | №0068 |
| __bodyMasks | №1091 |
| __ceHeadFrame | №0053 |
| __ceNormals | №0053 (+ 3 других файлов) |
| __ceShapedPositions | №0053 (+ 3 других файлов) |
| __dirname | №1305 |
| __filename | №1305 |
| __floor | №0068 |
| __tarotChargeDouble | №0813 |
| __tarotShared | №0813 |
| __TEST_ASSERT__ | №1305 |
| _sent | №1239 |
| a | №0056 (+ 17 других файлов) |
| abdomen | №0054 |
| aberration | №0623 (+ 12 других файлов) |
| abilities | №0623 (+ 17 других файлов) |
| ability | №0072 (+ 19 других файлов) |
| abilityBonus | №0073 (+ 1 других файлов) |
| abilityBonuses | №0636 |
| abilityChanges | №0813 |
| abilityCheck | №0650 (+ 1 других файлов) |
| abilityCheckBonus | №0774 |
| abilityCheckHigherSpell | №0774 |
| abilityIncrease | №0771 |
| abilityMax | №0813 |
| abilityMin | №0813 |
| abilityScores | №1067 (+ 3 других файлов) |
| absorbedItems | №0834 |
| absorbedTempHp | №0833 |
| ac | №0619 (+ 69 других файлов) |
| academies | №0734 (+ 1 других файлов) |
| academy | №0771 (+ 1 других файлов) |
| academyFeature | №0771 |
| academyFeatures | №0734 |
| acBase | №0079 (+ 1 других файлов) |
| acBonus | №0771 (+ 7 других файлов) |
| acBonusAgainstTarget | №0774 |
| acBonusDie | №0774 |
| accent | №0827 |
| accepted | №1723 |
| acceptedCategories | №0797 |
| acceptedTags | №0797 |
| access | №0665 |
| access_token | №0648 (+ 1 других файлов) |
| accessories | №0802 (+ 1 других файлов) |
| accessors | №1108 (+ 1 других файлов) |
| acEqualsSelf | №0774 |
| acFormula | №0079 |
| acid | №0073 (+ 2 других файлов) |
| Acid | №0075 |
| acidBomb | №0774 |
| acidReagent | №0821 |
| acolyteOfArms | №0774 |
| acOverride | №0806 (+ 1 других файлов) |
| acPenalty | №0073 |
| acReduction | №0774 |
| acrobatics | №0767 (+ 1 других файлов) |
| acSaveDamageBonus | №0774 |
| action | №0072 (+ 59 других файлов) |
| actionId | №0800 |
| actionOrBonusAction | №0774 |
| actionRequired | №0650 |
| actions | №0073 (+ 28 других файлов) |
| actionSpent | №0073 (+ 1 других файлов) |
| actionSurge | №0643 |
| actionSurges | №0689 |
| actionType | №0073 |
| activate | №1149 |
| activated | №0813 |
| activateLastStand | №0813 |
| active | №0636 (+ 32 других файлов) |
| ACTIVE | №0777 |
| activeCharacteristics | №0864 |
| activeConditions | №0619 (+ 9 других файлов) |
| activeEncounter | №0857 |
| activeEncounterId | №0856 (+ 1 других файлов) |
| activeFolderId | №1723 |
| activeId | №0857 |
| activeIndex | №0073 (+ 42 других файлов) |
| activeMutations | №0834 |
| activeOrgans | №0864 |
| activeProperties | №0075 |
| activeRage | №0643 (+ 1 других файлов) |
| activeRite | №0636 |
| activeShape | №1229 |
| activity | №0623 (+ 12 других файлов) |
| actor | №0778 (+ 2 других файлов) |
| actorId | №0814 (+ 4 других файлов) |
| actorName | №1191 |
| actual | №0849 |
| actWithArcaneAnathemaWhileDisabled | №0774 |
| adamantine | №0663 |
| adaptiveMalediction | №0774 |
| addClass | №0844 |
| addCombatantFromTemplate | №0650 |
| addConToEachDie | №0774 |
| addCreature | №0856 |
| addCustomLoot | №0802 (+ 1 других файлов) |
| addD4OnFailure | №0774 |
| addDamage | №0073 |
| addDie | №0774 |
| added | №0623 (+ 26 других файлов) |
| addEventListener | №0882 (+ 25 других файлов) |
| addExhaustion | №0822 |
| addFeat | №0844 |
| addFloor | №0066 |
| addInventory | №0844 |
| additionalFamiliar | №0808 |
| addLexiconRune | №0774 |
| addObject | №0066 |
| addProficiencyBonus | №0774 |
| addProfToAnathema | №0774 |
| addRecipe | №0662 |
| addSelected | №0856 |
| addSpell | №0844 |
| addToRoll | №0774 |
| addXP | №0665 |
| addZone | №0066 |
| adhesive | №0073 |
| adjustedXp | №0800 |
| adjustRiteDamage | №0636 |
| adjustSymbiosis | №0811 |
| adjustWeaponDamage | №0636 |
| adornment | №0665 |
| adrenaline | №0828 |
| adroitAnalysis | №0824 |
| adultAnatomy | №0061 |
| advancedRoguishCharm | №0774 |
| advancedTactics | №0774 |
| advancedTransformation | №0636 |
| advanceTime | №0073 (+ 1 других файлов) |
| advantage | №0073 (+ 14 других файлов) |
| advantageAgainst | №0774 |
| advantageAgainstFrightened | №0774 |
| advantageAgainstGrappled | №0774 |
| advantageAgainstTarget | №0774 |
| advantageAgainstWounded | №0771 |
| advantageAllAttacks | №0636 |
| advantageAllD20 | №0774 |
| advantageAttackRolls | №0774 |
| advantageAttacks | №0774 |
| advantageCharismaChecks | №0774 |
| advantageDexSave | №0774 |
| advantageFirstAttack | №0774 |
| advantageIfSameTarget | №0681 |
| advantageMagicalSaves | №0774 |
| advantageNextAttack | №0771 (+ 1 других файлов) |
| advantageNextSave | №0774 |
| advantageOnChecks | №0771 |
| advantageOnCon | №0771 |
| advantageOneAttackOrSave | №0774 |
| advantageOrDisadvantage | №0774 |
| advantagePerception | №0808 |
| advantageRecallFeyFiendsUndead | №0636 |
| advantageSaves | №0636 (+ 1 других файлов) |
| advantageSavesAgainst | №0774 |
| advantageSavingThrows | №0774 |
| advantageStealth | №0681 |
| advantageStr | №0774 |
| advantageStrength | №0073 |
| advantageTrackFeyFiendsUndead | №0636 |
| advantageVsIntimidation | №0771 |
| adventuringDiscipline | №0774 |
| advice | №0813 (+ 3 других файлов) |
| aether | №0636 |
| Aether | №0774 |
| aetherWalk | №0636 |
| affected | №0073 |
| affinities | №0839 |
| affinity | №1157 |
| afflictedDisadvantageEndSave | №0774 |
| afflictionControl | №0072 |
| african | №1113 |
| afro | №0056 (+ 1 других файлов) |
| after | №0774 (+ 1 других файлов) |
| afterActorAttack | №0636 |
| afterAttack | №0813 |
| afterAttackCost | №0774 |
| afterAttackThreeUnarmed | №0774 |
| afterCarousingAdvantage | №0774 |
| afterDamage | №0636 (+ 1 других файлов) |
| againstInterdicted | №0774 |
| age | №0619 (+ 2 других файлов) |
| ageAppearanceLocked | №0808 |
| ageless | №0774 |
| agePossessionSleepTransformImmunity | №0774 |
| AI_ALLOW_PAID_API | №1065 |
| AI_BASE_SHA | №1066 |
| AI_DEVELOPMENT_ENABLED | №1065 |
| ailment | №0774 |
| ailments | №0072 (+ 1 других файлов) |
| airCore | №0821 |
| airEssence | №0821 |
| alchemical | №0794 |
| alchemicalFat | №0821 |
| alchemicalReagentV49 | №0662 |
| alchemicalSavvy | №0643 |
| alchemist | №0665 (+ 4 других файлов) |
| alchemistActiveEffects | №1067 (+ 1 других файлов) |
| alchemistDebuffs | №1067 |
| alchemistDiscovered | №1068 |
| alchemistExplosionResistanceType | №1067 |
| alchemistGolem | №0073 |
| alchemistGolemOwner | №0073 |
| alchemistGrafts | №1067 |
| alchemistHomunculus | №0073 |
| alchemistHomunculusOwner | №0073 (+ 1 других файлов) |
| alchemistPoisonedWeaponId | №1067 |
| alchemistPreparedFormula | №1068 |
| alchemistSaveDC | №1067 |
| alchemistToxicVengeance | №1067 |
| alchemy | №0663 (+ 1 других файлов) |
| alchemyId | №0075 (+ 1 других файлов) |
| alchemyPoints | №0774 |
| alchemyTools | №0808 |
| alcoholRules | №0073 |
| ale | №0667 |
| alert | №1101 (+ 12 других файлов) |
| alerts | №1129 |
| aliases | №0072 (+ 12 других файлов) |
| all | №0770 (+ 1 других файлов) |
| ALL_RECIPES | №1100 (+ 1 других файлов) |
| allAttacksThisTurn | №0636 |
| allConcentrationSavesDisadvantage | №0636 |
| allDisciplines | №0771 |
| allies | №1178 |
| alliesTempHp | №0774 |
| allLanguages | №0774 |
| allowedForms | №0774 |
| allowFriendly | №0651 |
| allSeeing | №0866 |
| allSkills | №0804 |
| alluring | №0636 |
| Alluring | №0774 |
| ally | №1130 |
| allyACBonus | №0774 |
| allyAdvantage | №0771 |
| allyAdvantageAgainstMarkedPrey | №0774 |
| allyAttackOrDamageCantrip | №0774 |
| allyCharge | №0771 |
| allyCount | №0774 |
| allyDestination | №0814 (+ 2 других файлов) |
| allyFormation | №0771 |
| allyId | №0813 (+ 3 других файлов) |
| allyMoveReactionFt | №0774 |
| allyNextAddD8 | №0774 |
| allyReactionsUpTo | №0774 |
| allyReposition | №0771 |
| allySaveAdvantage | №0774 |
| allySaveAdvantageFt | №0774 |
| allySaveBonus | №0774 |
| allyStrDexSaveBonus | №0774 |
| allyTempHp | №0774 |
| allyWilling | №0814 (+ 2 других файлов) |
| allyWithinAura | №0650 (+ 1 других файлов) |
| allyWithinCourage | №0650 |
| almond | №0058 (+ 1 других файлов) |
| alpha | №0058 (+ 1 других файлов) |
| alphaCutoff | №0064 |
| alphaCutoffLoc | №0068 |
| alphaMode | №0064 |
| alphaModeLoc | №0068 |
| alpine | №0058 |
| alreadyCast | №0814 (+ 1 других файлов) |
| alreadyKnown | №0828 |
| alt | №0774 |
| altar | №0062 |
| alternateNecromancers | №0804 |
| alternateResourceIds | №0076 |
| altMin | №0741 |
| altStat | №0741 |
| alum | №0668 |
| alwaysPrepared | №0798 (+ 2 других файлов) |
| amount | №0076 (+ 35 других файлов) |
| amp | №0636 |
| amphibian | №0769 |
| amplified | №0636 (+ 1 других файлов) |
| amplifiedDamage | №0774 |
| amplifiedEffect | №0774 |
| amplifiedMoveFt | №0774 |
| amplifiedNextAttackAdvantage | №0774 |
| amplifiedRestoreSpellSlot | №0774 |
| amplify | №0636 (+ 4 других файлов) |
| analysisAction | №0824 |
| analyticalDefense | №0824 |
| anatomy | №0056 (+ 1 других файлов) |
| anatomyLevel | №0053 |
| anatomyProfile | №0061 |
| anatomyShape | №0053 |
| anatomySkin | №0053 |
| anatomyType | №0053 |
| anatomyVariant | №0053 |
| anatomyZones | №0053 |
| anchor | №0056 (+ 1 других файлов) |
| anchorPositions | №0056 (+ 1 других файлов) |
| anchors | №0804 |
| ancient_ruins | №0873 |
| ancientMalediction | №0774 |
| angle | №0056 |
| animalFrame | №0056 |
| animalHandling | №0767 (+ 1 других файлов) |
| animalHandlingDC | №0681 |
| animalProfile | №0056 (+ 6 других файлов) |
| animalSkin | №0056 |
| animateDead | №0804 |
| animateThralls | №0774 |
| animation | №0774 |
| animationId | №0060 (+ 1 других файлов) |
| animations | №0063 |
| ankhBlessing | №0804 |
| annotated | №0658 |
| anointedMagic | №0774 |
| antelope | №0061 |
| antialias | №0058 (+ 1 других файлов) |
| Antidote | №0075 |
| antiMagicAdvantage | №0804 |
| anvil | №0062 |
| anxious | №0636 |
| any | №0770 (+ 1 других файлов) |
| aoe | №0806 |
| aoeFt | №0636 |
| aoeLengthFt | №0806 |
| aoeRadiusFt | №0621 (+ 3 других файлов) |
| aoeShape | №0621 (+ 1 других файлов) |
| aoeWidthFt | №0806 |
| apathy | №0813 |
| ape | №0056 |
| apexPredator | №0774 |
| api | №1099 |
| apiArgs | №0848 |
| apiFilter | №0848 |
| apikey | №0648 |
| apiPath | №0848 |
| apis | №0848 |
| apothecary | №0062 (+ 1 других файлов) |
| apothecaryRejectsHammer | №1163 |
| app | №0855 (+ 1 других файлов) |
| appearance | №0055 (+ 3 других файлов) |
| appearance3d | №1099 |
| appearanceAgingStopped | №0808 |
| appearanceOpacity | №0061 |
| appendChild | №1160 (+ 8 других файлов) |
| applications | №0816 |
| applied | №0072 (+ 10 других файлов) |
| appliesCalcifyingStrike | №0774 |
| apply | №0837 |
| applyASI | №0822 |
| applyDamage | №0650 (+ 5 других файлов) |
| applyDamageBatch | №0650 |
| applyFromRound | №0813 |
| applyFullQuality | №0660 |
| applyMorphTargets | №0061 |
| applyOverchannel | №0806 |
| applyPotionEffect | №0073 |
| applyPreset | №0061 |
| applyQuality | №0662 |
| applyStaged | №0837 |
| applyVisibility | №0661 |
| applyWitchTouch | №0774 |
| arcana | №0767 (+ 1 других файлов) |
| arcanaSaveDC | №0774 |
| arcane | №0794 (+ 2 других файлов) |
| arcane_defender | №0777 |
| arcane_recovery_feat | №0777 |
| arcaneAnathema | №0774 |
| arcaneMastery | №0643 |
| arcaneReagentV49 | №0662 |
| arcaneRecovery | №0643 |
| arcaneShard | №0662 (+ 1 других файлов) |
| arcaneWard | №1218 |
| archaeologist | №0824 |
| archdruid | №0643 |
| archery | №0774 |
| archetype | №0774 (+ 1 других файлов) |
| archetypes | №0709 |
| archfey | №0636 |
| architect | №0774 |
| archon | №0839 |
| archonForm | №0839 |
| archons | №0839 |
| area | №0073 (+ 1 других файлов) |
| areaFt | №0073 (+ 1 других файлов) |
| areaRadiusFt | №0774 |
| areaSlime | №0073 |
| areaVulnerability | №0834 |
| arenaRoyale | №0711 |
| args | №1259 (+ 37 других файлов) |
| arm | №0056 |
| armament | №0072 (+ 1 других файлов) |
| armedAndAngry | №0774 |
| armLength | №0058 (+ 1 других файлов) |
| armor | №0056 (+ 65 других файлов) |
| armor_component | №0821 |
| armorBonus | №0660 |
| armorClass | №0669 (+ 1 других файлов) |
| armoredAC | №0774 |
| armorer | №0665 (+ 2 других файлов) |
| armorOfFaith | №0798 |
| armorProficiency | №0808 |
| armorTriangles | №0058 |
| armorWear | №1101 |
| armour | №0062 |
| armpitL | №0054 (+ 1 других файлов) |
| armpitR | №0054 |
| armReaction | №0813 |
| arms | №0058 (+ 3 других файлов) |
| arr | №0797 |
| arrayBuffer | №1072 (+ 5 других файлов) |
| arrestingStrike | №0774 |
| ArrowDown | №0065 |
| arrowheads | №0662 (+ 1 других файлов) |
| ArrowLeft | №0065 |
| ArrowRight | №0065 |
| ArrowUp | №0065 |
| art | №0827 |
| artificer | №0658 (+ 2 других файлов) |
| artOfWar | №0774 |
| ascended | №0839 |
| ascensionLevel | №0709 |
| asi | №0670 (+ 28 других файлов) |
| asian | №1113 |
| asleep | №0813 |
| aspect | №0774 (+ 1 других файлов) |
| assessItem | №0659 |
| asset | №1108 (+ 1 других файлов) |
| assetId | №0058 (+ 3 других файлов) |
| astral | №0058 |
| astralConstruct | №0774 |
| asymmetric | №0061 |
| at | №0056 (+ 17 других файлов) |
| at11 | №0709 |
| at17 | №0709 |
| athletics | №0767 (+ 2 других файлов) |
| atob | №1206 (+ 2 других файлов) |
| atStartOfTurn | №1153 (+ 1 других файлов) |
| attach | №0059 (+ 1 других файлов) |
| attached | №0073 |
| attachment | №0864 |
| attack | №0073 (+ 20 других файлов) |
| attackAbility | №0073 |
| attackAction | №0774 |
| attackAgainstMode | №0822 |
| attackBonus | №0073 (+ 9 других файлов) |
| attackBonusAdjustment | №0636 |
| attackCantripSwap | №0804 |
| attackChain | №0771 |
| attackContext | №0636 (+ 1 других файлов) |
| attackCount | №0650 (+ 3 других файлов) |
| attackCrit | №0804 |
| attackDamageBonus | №0660 |
| attackDisadvantage | №0073 (+ 2 других файлов) |
| attackDisadvantageUnlessTargetsSelf | №0774 |
| attackDistanceFt | №1153 |
| attacker | №0636 (+ 13 других файлов) |
| attackerId | №0073 (+ 9 других файлов) |
| attackerPeerId | №0806 |
| attackKind | №0650 (+ 7 других файлов) |
| attackModifier | №0828 |
| attackModifiers | №0073 (+ 17 других файлов) |
| attackOrSpell | №0774 |
| attackPenalty | №0073 (+ 1 других файлов) |
| attackReplaced | №1159 |
| attackResult | №0636 (+ 5 других файлов) |
| attackRoll | №0774 |
| attacks | №0650 (+ 8 других файлов) |
| attacksAgainst | №0822 |
| attackSequence | №0650 (+ 1 других файлов) |
| attacksHaveAdvantage | №0073 |
| attackSight | №0813 |
| attackTarget | №1153 |
| attackTotal | №0806 (+ 3 других файлов) |
| attackType | №0755 (+ 18 других файлов) |
| attitudeIndifferent | №0774 |
| attitudeShift | №0774 |
| attributeFilter | №0835 (+ 1 других файлов) |
| attributes | №0835 (+ 3 других файлов) |
| attrs | №1069 |
| atWill | №0774 |
| atWillSuppress | №0774 |
| auraDebuff | №0804 |
| auraHoldTheLine | №0774 |
| auraOfCourage | №0643 |
| auraOfProtection | №0643 |
| auraRangeFt | №0804 |
| auraSource | №0650 (+ 1 других файлов) |
| author | №0066 |
| authoritativeSubclasses | №0072 (+ 13 других файлов) |
| authorityEpoch | №0805 (+ 5 других файлов) |
| authorityId | №0805 (+ 3 других файлов) |
| authoritySnapshot | №0860 |
| auto | №0806 |
| autoAnimalHandlingRampage | №0681 |
| autoCheckForUpdates | №0837 |
| autoFailed | №0636 (+ 2 других файлов) |
| autoFailHexSave | №0774 |
| autoFailSaveUses | №0774 |
| autoFailStrDex | №0822 (+ 2 других файлов) |
| autognome | №0667 |
| autoHideMenuBar | №0881 |
| automaticAssembly | №0061 |
| autoPlans | №0806 |
| autoSaveCurrentCharacter | №1160 (+ 2 других файлов) |
| autoTrigger | №0073 |
| available | №0800 (+ 1 других файлов) |
| availableFeatures | №0656 |
| avatars | №0834 |
| avatarStorm | №0804 |
| avian | №0056 (+ 1 других файлов) |
| avoidDeath | №0774 |
| awakened | №0709 (+ 1 других файлов) |
| Awakened | №0790 |
| awakenedRune | №0774 |
| awakening | №0798 |
| axes | №0058 |
| AXES | №0061 |
| azure | №0827 |
| b | №0863 (+ 17 других файлов) |
| back | №0057 (+ 3 других файлов) |
| background | №0619 (+ 6 других файлов) |
| backgroundColor | №0881 |
| backgrounds | №1723 |
| backLower | №0054 |
| backslash | №0069 (+ 1 других файлов) |
| backslashTexture | №0071 |
| BackTexture | №1123 |
| backup | №0847 (+ 1 других файлов) |
| backUpper | №0054 |
| bad | №1079 |
| badlands | №0873 |
| badlands_canyon | №0873 |
| badlands_crater | №0873 |
| badlands_glass | №0873 |
| balanceCp | №0794 |
| balanced | №0054 |
| balancePreserved | №1163 |
| balefulInterdict | №0693 |
| balefulPresence | №0774 |
| band | №0659 |
| bandHeight | №0057 |
| bandTile | №0057 |
| bandTogether | №0774 |
| banished | №0774 |
| banner | №0062 |
| bard | №0793 (+ 1 других файлов) |
| bardicInspiration | №0643 (+ 1 других файлов) |
| barrel | №0062 |
| barter | №1163 |
| barycentricOutsideTolerance | №1118 |
| base | №0064 (+ 5 других файлов) |
| baseAc | №0806 (+ 1 других файлов) |
| baseAC | №0619 (+ 2 других файлов) |
| baseAcFormula | №0819 |
| baseColorFactor | №0064 (+ 1 других файлов) |
| baseColorSampler | №0064 |
| baseColorTexture | №0064 |
| baseCp | №0796 |
| baseFeatures | №0866 |
| baseId | №0669 |
| baseModel | №0061 (+ 1 других файлов) |
| baseObj | №1119 (+ 2 других файлов) |
| basePositions | №0057 (+ 2 других файлов) |
| basePositionsSha256 | №1254 |
| baseQualityScore | №0659 |
| baseUrl | №1104 (+ 1 других файлов) |
| basilisk | №0681 |
| bastionOfOrder | №0774 |
| battleBoard | №0843 (+ 1 других файлов) |
| battleBoardView | №0855 |
| battlefield | №1099 (+ 20 других файлов) |
| battlefieldAnalysis | №0771 |
| battlefieldSupport | №0734 |
| Battlemage | №0790 |
| battleMagic | №0643 |
| battleOver | №0778 |
| bboxDiagonalRatio | №1121 |
| beakColor | №0061 (+ 1 других файлов) |
| beakSize | №0061 (+ 3 других файлов) |
| beakStyle | №0058 (+ 3 других файлов) |
| beard | №0058 (+ 3 других файлов) |
| bearingDegrees | №0813 |
| beast | №0624 (+ 2 других файлов) |
| beast_tamer | №0777 |
| beastCommand | №0771 |
| beastCompanion | №0643 |
| beastheart | №0652 |
| beastheartEndTurn | №0651 |
| beastheartLevel | №0681 |
| beastheartStartTurn | №0651 |
| Beasthide | №0790 |
| beastMaster | №0652 |
| beastShape | №0774 |
| beastSpells | №0643 |
| becomeGhost | №0774 |
| bed | №0062 |
| before | №0822 (+ 1 других файлов) |
| beforeAttack | №0813 |
| beforeRoll | №0650 |
| beginBlind | №0816 |
| beginConcentration | №0650 |
| beginInitial | №0816 |
| beginLastStand | №0813 |
| beginOwnTurn | №0816 |
| beginWager | №0816 |
| behavior | №1178 |
| belt | №0057 |
| bench | №0062 |
| benefits | №0774 |
| berserker_rage | №0777 |
| bestAxisPermutation | №1121 |
| bestiaryVersion | №0623 (+ 12 других файлов) |
| bigby | №0623 |
| bin_bytes | №1110 |
| binary | №1254 |
| binarySha256 | №1254 |
| bindHost | №0811 |
| binding | №0636 |
| bindOnCharnelSpend | №0804 |
| bindPositions | №0053 |
| bindShell | №0779 |
| biomass | №0811 |
| biomassGained | №0811 |
| biomassHealing | №0834 |
| black | №0863 |
| Black | №0771 (+ 1 других файлов) |
| blackmarket | №0796 (+ 1 других файлов) |
| blackRider | №0804 |
| blacksmith | №0794 |
| blastCoating | №0672 |
| blastDice | №0073 |
| blastWave | №0774 |
| blend | №0056 |
| blessGuidance | №0774 |
| blessLike | №0073 |
| blind | №0771 |
| blindBeyond | №0813 |
| blinded | №0813 (+ 1 других файлов) |
| blinding | №0774 |
| Blindness | №0075 |
| blindsense | №0643 |
| blindsight | №0864 |
| blindsightFt | №0774 (+ 1 других файлов) |
| bloatedAgony | №0636 |
| Blob | №1191 (+ 5 других файлов) |
| block | №0839 |
| blocked | №0650 (+ 3 других файлов) |
| blocksIncorporealMovement | №0774 |
| blocksMovement | №0069 |
| bloodAscendent | №0804 |
| bloodCost | №0808 |
| bloodCostPerSpellLevel | №0808 |
| bloodCurseActor | №0650 (+ 1 других файлов) |
| bloodCurseAmplify | №0650 (+ 1 других файлов) |
| bloodCurseDistanceFt | №0650 (+ 1 других файлов) |
| bloodCurseExposure | №0650 |
| bloodCurseOfCorrosion | №0636 |
| bloodCurseOfHowl | №0636 |
| bloodCurseOfTheExorcist | №0636 |
| bloodCurses | №0683 |
| bloodCurseTargetsBloodless | №0774 |
| bloodhawk | №0681 |
| bloodhoundBruisers | №0711 |
| bloodHunterPuppet | №0636 (+ 1 других файлов) |
| bloodiedButUnbowed | №0711 (+ 1 других файлов) |
| bloodline | №0828 (+ 1 других файлов) |
| bloodlines | №0828 |
| bloodlustAdvantage | №0774 |
| bloodMaledict | №0636 (+ 1 других файлов) |
| bloodPrice | №0693 |
| bloodPriceAura | №0774 |
| bloodRiteRevival | №0650 |
| bludgeoning | №0866 |
| blue | №0827 |
| blushColor | №0061 |
| blushOpacity | №1268 |
| bob | №0056 (+ 1 других файлов) |
| bodiesCount | №0073 (+ 1 других файлов) |
| bodiesSpent | №0073 |
| body | №0061 (+ 35 других файлов) |
| bodyAccessories | №0056 |
| bodyColor | №0061 (+ 9 других файлов) |
| bodyDefaults | №0061 |
| bodyDestroyed | №0864 |
| bodyH | №0054 (+ 2 других файлов) |
| bodyHorror | №0624 |
| bodyHP | №0864 |
| bodyMaxHP | №0864 |
| bodyName | №0864 |
| bodyPossession | №0804 |
| bodyPreset | №0054 |
| bodyStats | №0811 |
| bodyTint | №0061 (+ 1 других файлов) |
| bolsteringSuppression | №0774 |
| bomb | №0672 (+ 1 других файлов) |
| bombDamage | №0672 |
| bombFormulas | №0672 |
| bombImmunity | №0774 |
| bombs | №0672 |
| bondedTarget | №0774 |
| bondOfBloodthirst | №0774 |
| bondOwnerId | №0813 |
| bondPartnerId | №0813 |
| bonds | №0681 |
| bondWilling | №0814 (+ 2 других файлов) |
| bone | №0662 (+ 1 других файлов) |
| boneAsh | №0668 |
| boneSpurring | №0774 |
| boneStock | №0662 (+ 1 других файлов) |
| boneStockV49 | №0662 |
| bonus | №0073 (+ 66 других файлов) |
| bonusAC | №0774 |
| bonusAction | №0073 (+ 27 других файлов) |
| bonusActionAfflict | №0774 |
| bonusActionAttack | №0771 |
| bonusActionAttackAfterExploit | №0774 |
| bonusActionAttackAfterSpell | №0808 |
| bonusActionAttacks | №0774 |
| bonusActionDash | №0073 |
| bonusActionDisengageOrHide | №0774 |
| bonusActionDisengageOrSearch | №0774 |
| bonusActionExtraWeaponAttack | №0774 |
| bonusActionFear30 | №0774 |
| bonusActionOrder | №0774 |
| bonusActions | №0653 |
| bonusActionSeed | №0804 |
| bonusActionSupport | №0771 |
| bonusActionSupportOrder | №0774 |
| bonusActionUnarmedOrGrapple | №0774 |
| bonusActionWeaponAttack | №0636 |
| bonusAttack | №0636 (+ 3 других файлов) |
| bonusAttackAfterInvoke | №0774 |
| bonusAttackVsFrightened | №0774 |
| bonusCantrip | №0774 |
| bonusCharnelTouchAfterAttack | №0804 |
| bonusDamage | №0073 (+ 9 других файлов) |
| bonusDamageDice | №0774 |
| bonusDamageDie | №0774 |
| bonusDamageOnHit | №0774 |
| bonusDash | №0774 |
| bonusDie | №0808 |
| bonuses | №0079 (+ 6 других файлов) |
| bonusFireDamage | №0681 |
| bonusGrapple | №0774 |
| bonusHealing | №0774 |
| bonusHp | №0774 (+ 1 других файлов) |
| bonusHpDice | №0774 |
| bonusKnownSpells | №0774 |
| bonusMaxHP | №0774 |
| bonusMeleeAttack | №0774 |
| bonusSpell | №0808 |
| bonusSpells | №0808 |
| bonusSteps | №0804 |
| bonusStrDexConRolls | №0774 |
| bonusWeaponAttackAfterCantrip | №0774 |
| book | №0062 |
| bookshelf | №0062 |
| boon | №0774 |
| boots | №0057 (+ 1 других файлов) |
| bottle | №0062 |
| bottom | №0061 (+ 6 других файлов) |
| boundary | №0053 |
| bounds | №0056 (+ 2 других файлов) |
| bountiful_luck | №0777 |
| bovineEarSize | №0061 (+ 1 других файлов) |
| bowDamageBonus | №0774 |
| bowyer | №0665 |
| boxingTechnique | №0771 |
| bra | №0057 |
| braceUp | №0774 |
| braid | №0056 (+ 1 других файлов) |
| brainsOverBrawn | №0774 |
| bramble | №0073 |
| brambleBomb | №0774 |
| brand | №0774 |
| brandAllyDistanceFt | №0650 |
| brandCastigation | №0650 (+ 2 других файлов) |
| brandOfAxiom | №0636 |
| brandOfCastigation | №0636 (+ 1 других файлов) |
| brandOfSundering | №0636 |
| brandOfTethering | №0636 (+ 1 других файлов) |
| brandOfVoracious | №0636 |
| brandSappingScar | №0636 |
| brawling | №0774 |
| breakConcentration | №0650 |
| breastSize | №0058 (+ 2 других файлов) |
| Breathing | №0075 |
| brew | №0808 |
| brewer | №0665 (+ 3 других файлов) |
| brewMinutes | №0804 |
| briefs_female | №0057 |
| briefs_male | №0057 |
| brightLightFt | №0774 |
| brightLightRadiusFt | №0774 |
| broken | №0061 (+ 2 других файлов) |
| browHeight | №0061 |
| browRidge | №0061 |
| browser | №1249 |
| brutalCritical | №0643 |
| bt_a | №1230 |
| bt_ally | №1124 (+ 5 других файлов) |
| bt_b | №1230 |
| bt_enemy | №1124 (+ 6 других файлов) |
| bt_friend | №1129 |
| bt_own | №1143 |
| bt_owner | №1126 (+ 1 других файлов) |
| bt_self | №1124 (+ 4 других файлов) |
| btoa | №1206 (+ 2 других файлов) |
| bubbles | №0695 |
| budgets | №0054 |
| buf | №0068 |
| buff | №0813 |
| buffer | №1107 (+ 3 других файлов) |
| buffers | №0064 (+ 3 других файлов) |
| bufferView | №1107 (+ 3 других файлов) |
| bufferViews | №1108 (+ 1 других файлов) |
| build | №0053 (+ 3 других файлов) |
| buildAnimations | №0063 |
| builder | №0665 |
| buildFeatureSet | №0643 (+ 2 других файлов) |
| bulette | №0681 |
| bull | №0056 |
| bullMuzzleSize | №0061 (+ 1 других файлов) |
| bun | №0056 (+ 1 других файлов) |
| burden | №0798 (+ 1 других файлов) |
| Burned | №0774 |
| burning | №0073 (+ 1 других файлов) |
| burningTicks | №1067 |
| burstDamage | №0774 |
| burstRadiusFt | №0774 |
| buttocks | №0054 |
| buttonColor | №0057 (+ 2 других файлов) |
| buttons | №0057 (+ 3 других файлов) |
| buy | №0794 (+ 2 других файлов) |
| buyFactor | №0794 (+ 1 других файлов) |
| bypassesTempHP | №0798 |
| byteLength | №1107 (+ 3 других файлов) |
| byteOffset | №1107 (+ 3 других файлов) |
| bytes | №0837 (+ 8 других файлов) |
| bytesDone | №0837 (+ 2 других файлов) |
| bytesTotal | №0837 (+ 2 других файлов) |
| c | №0806 (+ 19 других файлов) |
| cabinet | №0062 |
| cache | №0837 (+ 2 других файлов) |
| cackle | №0774 |
| calcifyingStrike | №0774 |
| calculateAC | №0822 |
| calculatedCombustion | №0774 |
| calculatedFlourish | №0824 |
| calculateEncounter | №0800 |
| calculateMaxHP | №0834 |
| call | №1159 |
| callAPI | №0848 |
| callFromBelow | №0774 |
| calligrapher | №0665 (+ 1 других файлов) |
| callOfIron | №0774 |
| calls | №0866 (+ 2 других файлов) |
| callToHavok | №0774 |
| campaign | №0843 |
| campaignEvent | №0778 |
| campaignEvents | №1180 |
| campaigns | №0637 |
| canAncestorAttack | №0813 |
| canApplyNatively | №0837 |
| canBarter | №0796 |
| canBecomeHuge | №0774 |
| canBurnSealForBlind | №0774 |
| canCaptureHost | №0811 |
| canCast | №0813 |
| cancel | №0881 |
| cancelReaction | №0813 |
| canCounter | №0774 |
| canCraftRecipe | №0665 |
| canDisassemble | №0660 |
| candle | №0062 |
| canEnterHost | №0811 |
| canHear | №1153 |
| canid | №0769 |
| canMerge | №0834 |
| canMove | №0813 |
| cannotBecomeRitual | №0808 |
| cannotLie | №0813 |
| cannotSurprise | №0771 |
| CANONICAL_2024_SUBCLASSES | №0073 |
| canopicJars | №0804 |
| canReceiveHealing | №0779 (+ 1 других файлов) |
| canRepair | №0660 |
| canRestHealBody | №0779 (+ 2 других файлов) |
| canSee | №0813 |
| canTarget0Hp | №0774 |
| cantrip | №0073 (+ 3 других файлов) |
| cantrips | №0636 (+ 4 других файлов) |
| cantripsByLevel | №0804 |
| cantripsKnown | №0702 (+ 2 других файлов) |
| canWalk | №0066 |
| cap | №0057 |
| capaciousAnathema | №0774 |
| capacity | №0774 (+ 4 других файлов) |
| capacityByLevel | №0808 |
| capacityFt3 | №0808 |
| capColor | №0061 (+ 1 других файлов) |
| cape | №0057 |
| capeWidth | №0057 |
| capSize | №0061 (+ 1 других файлов) |
| captain | №0734 (+ 1 других файлов) |
| capture | №0858 |
| capturedAt | №0811 |
| captureHost | №0811 |
| caravan | №0794 (+ 2 других файлов) |
| caravan_master | №0796 (+ 1 других файлов) |
| card | №0816 |
| cardId | №0813 |
| cards | №0816 (+ 2 других файлов) |
| careful | №0643 |
| carpenter | №0664 (+ 4 других файлов) |
| carried | №0801 |
| carryCapacity | №0808 |
| carryingCapacityMultiplier | №0774 |
| cart | №0062 |
| cartographer | №0663 (+ 5 других файлов) |
| cartographyQuality | №0666 |
| case | №0643 (+ 2 других файлов) |
| cases | №1723 |
| castAsRitual | №0808 |
| caster | №0650 (+ 3 других файлов) |
| casterId | №0814 (+ 1 других файлов) |
| casterLevel | №0793 (+ 2 других файлов) |
| castIllriggerActionSpell | №0774 |
| castingClass | №0806 (+ 5 других файлов) |
| castingStat | №0806 (+ 4 других файлов) |
| castingTime | №0755 (+ 16 других файлов) |
| castLucidSpellFree | №0774 |
| castSpell | №0774 (+ 1 других файлов) |
| castSpellInAttack | №0774 |
| castWish | №0774 |
| cat | №0056 (+ 21 других файлов) |
| cataclysm | №0839 |
| cataclysmicStrike | №0774 |
| catalog | №0623 (+ 27 других файлов) |
| catalogKey | №0814 (+ 2 других файлов) |
| catalyst | №0075 |
| catalystId | №0075 |
| catalystReagent | №0821 |
| catalysts | №0074 |
| catEarSize | №0061 (+ 2 других файлов) |
| categories | №0797 |
| category | №0069 (+ 50 других файлов) |
| catMuzzleSize | №0061 (+ 3 других файлов) |
| caucasian | №1113 |
| cauldron | №0062 (+ 1 других файлов) |
| causal | №0823 |
| ceilingCollision | №0813 |
| celerity | №0636 |
| Celerity | №0774 |
| celestial | №0058 (+ 14 других файлов) |
| celestialDiscourse | №0774 |
| celestialStance | №0774 |
| cell | №0066 (+ 1 других файлов) |
| cellFt | №0856 (+ 20 других файлов) |
| cellPx | №1209 |
| cellSize | №1116 |
| censurePeacemaker | №0774 |
| centaur | №1280 |
| centaurIndices | №0056 |
| centaurSize | №0061 (+ 2 других файлов) |
| center | №0056 (+ 14 других файлов) |
| centerY | №0053 |
| ceramic | №0663 (+ 2 других файлов) |
| cha | №0619 (+ 52 других файлов) |
| chaChecksAdvantage | №0774 |
| chaChecksDisadvantage | №0636 (+ 1 других файлов) |
| chain | №0073 |
| chainReport | №0662 |
| chair | №0062 |
| championCalls | №0730 |
| chance | №0769 (+ 3 других файлов) |
| chandelier | №0062 |
| changedVertices | №1112 |
| changeShape | №0808 |
| channel | №0805 (+ 3 других файлов) |
| channelDivinity | №0643 (+ 3 других файлов) |
| channels | №0063 |
| chant | №0823 |
| character | №0801 (+ 6 других файлов) |
| characterId | №0061 (+ 33 других файлов) |
| characterName | №1206 |
| characters | №0648 (+ 2 других файлов) |
| charcoal | №0663 (+ 3 других файлов) |
| charcoalFine | №0668 |
| charge | №0774 |
| chargeOnDeflect | №0073 |
| charges | №0643 (+ 2 других файлов) |
| chargesMax | №0643 |
| chargesSpent | №0073 (+ 1 других файлов) |
| chargeTempHP | №0774 |
| chargeWeapon | №0073 |
| charisma | №0781 (+ 10 других файлов) |
| charismaChecksAdvantage | №0636 |
| charismaReferencesUse | №0774 |
| charmed | №0813 (+ 2 других файлов) |
| charmedHours | №0774 |
| charmEffect | №0650 |
| charmOrCompel | №0774 |
| charmSourceId | №0813 |
| charnelHitThreshold | №0804 |
| charnelTouch | №0804 |
| charnelTouchMax | №0804 |
| charnelTouchSpendMax | №0804 |
| chaSave | №0774 |
| chaSavesDisadvantage | №0636 (+ 1 других файлов) |
| cheapShot | №0774 |
| check | №0774 (+ 2 других файлов) |
| checkAndStage | №0837 |
| checkBonus | №0665 (+ 1 других файлов) |
| checkBonusAll | №0667 |
| checked | №1132 (+ 2 других файлов) |
| checkMageTrack | №0813 |
| checkModifiers | №0073 (+ 6 других файлов) |
| checkResult | №1159 |
| checks | №0774 (+ 1 других файлов) |
| cheekbones | №0058 (+ 1 других файлов) |
| chef | №0667 |
| chest | №0054 (+ 6 других файлов) |
| chestShape | №1070 |
| Chieftain | №0790 |
| childAppearance | №0813 |
| childList | №0787 (+ 5 других файлов) |
| children | №1073 (+ 2 других файлов) |
| chinLength | №0058 (+ 1 других файлов) |
| chitin | №0821 |
| chitinPlate | №0662 (+ 1 других файлов) |
| choice | №0806 (+ 4 других файлов) |
| choiceMode | №0816 |
| choices | №0636 (+ 3 других файлов) |
| choiceSaved | №0866 (+ 1 других файлов) |
| choose | №0670 (+ 23 других файлов) |
| chooseAnyAilments | №0774 |
| chooseBeforeRoll | №0774 |
| chooseBond | №0681 |
| chooseCompanion | №0681 |
| chooseCraft | №0774 |
| chooseGrandHex | №0774 |
| chooseHex | №0774 |
| chooseKnown | №0636 |
| chooseMovement | №0073 |
| chooseResistance | №0073 |
| chooseSavingThrowProficiency | №0774 |
| chooseSpecialization | №0665 |
| chosenCreatureId | №0072 (+ 1 других файлов) |
| cinzel | №0827 |
| circumcised | №0054 |
| cl | №0068 |
| claimReward | №0813 |
| claimWagerReward | №0816 |
| clairvoyance | №0771 |
| clandestineSource | №0774 |
| class | №0619 (+ 3 других файлов) |
| CLASS | №0636 |
| CLASS_NAMES | №0643 |
| classAbilities | №0774 |
| classBonus | №0650 (+ 1 других файлов) |
| classes | №0781 (+ 47 других файлов) |
| CLASSES_REFERENCE | №1247 |
| classFeatureIds | №0806 (+ 5 других файлов) |
| classFeatureNotes | №0650 (+ 1 других файлов) |
| classFeaturesState | №0073 (+ 21 других файлов) |
| classKey | №0822 |
| classLevel | №0822 |
| classList | №1109 |
| className | №0619 (+ 56 других файлов) |
| clawColor | №0061 |
| clawSize | №0061 (+ 2 других файлов) |
| clay | №0663 (+ 2 других файлов) |
| cleanHead | №0061 |
| cleansed | №0813 |
| cleansingTouch | №0643 |
| clear | №0064 (+ 6 других файлов) |
| clearTimeout | №0658 (+ 5 других файлов) |
| cleric | №0793 (+ 1 других файлов) |
| clientId | №0805 (+ 5 других файлов) |
| clientX | №0858 (+ 1 других файлов) |
| clientY | №0858 (+ 1 других файлов) |
| climb | №0804 |
| climbSpeed | №0073 (+ 1 других файлов) |
| clingingCurse | №0774 |
| clone | №0066 (+ 1 других файлов) |
| close | №0058 (+ 9 других файлов) |
| closed | №0784 |
| closedChains | №0662 |
| closeReplay | №0842 |
| closet | №0062 |
| cloth | №0662 (+ 4 других файлов) |
| clothes | №1294 |
| clothing | №0057 (+ 18 других файлов) |
| clothingBuilds | №0058 |
| clothingId | №0057 |
| clothingTriangles | №0058 |
| cloudId | №0648 |
| cloudScope | №0055 |
| cls | №0643 |
| club | №1156 |
| coast | №0794 (+ 1 других файлов) |
| coast_caves | №0873 |
| coast_cliffs | №0873 |
| coast_grotto | №0873 |
| cobbler | №0665 (+ 3 других файлов) |
| code | №1099 |
| coinLog | №1723 |
| coins | №1165 (+ 4 других файлов) |
| col | №0068 (+ 1 других файлов) |
| cold | №0636 (+ 2 других файлов) |
| Cold | №0075 |
| collar | №0057 |
| collect | №0801 (+ 3 других файлов) |
| collectiveBody | №0834 |
| collectLoot | №0778 |
| color | №0054 (+ 9 других файлов) |
| colors | №0068 (+ 2 других файлов) |
| cols | №0073 (+ 21 других файлов) |
| column | №0846 |
| combat | №0843 (+ 1 других файлов) |
| combatant | №0651 |
| combatantId | №0778 (+ 2 других файлов) |
| combatants | №0073 (+ 51 других файлов) |
| combatEnd | №0813 |
| combatHooks | №0702 |
| combatInsight | №0808 |
| combatInspiration | №0643 |
| combatLog | №0860 |
| combatMasteries | №0693 |
| combatMastery | №0693 (+ 1 других файлов) |
| combatOnly | №0813 |
| combatTurnGate | №0681 |
| combineDisciplines | №0774 |
| combustion | №0774 |
| command | №0651 (+ 3 других файлов) |
| commandable | №0774 |
| Commander | №0790 |
| commandFamiliarAndUndeadTogether | №0774 |
| commandRangeMultiplier | №0771 |
| commands | №0774 |
| commandSpellsWithoutSlot | №0804 |
| commandWithoutFear | №0771 |
| commit | №1254 (+ 1 других файлов) |
| commitHostEvent | №1152 (+ 7 других файлов) |
| committed | №0660 |
| common | №0788 (+ 5 других файлов) |
| commonPeopleBonus | №0774 |
| companion | №0073 (+ 4 других файлов) |
| companionACBonus | №0681 |
| companionAction | №0771 |
| companionActor | №0681 |
| companionAttack | №0771 |
| companionDamage | №0771 |
| companionExtraAttack | №0771 |
| companionMagicAttacks | №0771 |
| companionRampage | №0771 |
| companionResistance | №0681 |
| companions | №0681 |
| companionType | №0073 (+ 2 других файлов) |
| compareVersions | №0837 |
| compatibility | №0837 |
| completeAttack | №0830 |
| components | №0063 (+ 14 других файлов) |
| componentType | №1107 (+ 3 других файлов) |
| compositeTerms | №1304 |
| compositions | №1254 |
| compressionLock | №0774 |
| con | №0619 (+ 55 других файлов) |
| concealPsionics | №0774 |
| concentration | №0650 (+ 31 других файлов) |
| concentrationCheck | №0650 |
| concentrationDC | №0822 |
| concentrationSaveBonus | №0774 |
| concentrationState | №0650 |
| concussion | №0073 |
| concussionBomb | №0774 |
| condition | №0073 (+ 11 других файлов) |
| conditionApplied | №0774 |
| conditionChoice | №0681 |
| conditionImmune | №0636 |
| conditionImmunity | №0774 |
| conditionLabel | №0659 |
| conditionModeApplied | №0650 |
| conditionModifiers | №0822 (+ 2 других файлов) |
| conditionNotes | №1146 |
| conditionRemoved | №0866 |
| conditions | №0650 (+ 17 других файлов) |
| CONDITIONS | №0650 (+ 2 других файлов) |
| conditionsImmune | №0653 |
| coneWisdomSave | №0774 |
| config | №0845 |
| configurable | №0813 |
| configure | №0648 |
| configured | №0648 (+ 1 других файлов) |
| confirm | №1069 (+ 3 других файлов) |
| conflict | №0074 (+ 1 других файлов) |
| conflicts | №0648 |
| connected | №0805 (+ 2 других файлов) |
| conSave | №0774 |
| conscious | №0813 |
| console | №1109 |
| constant | №0650 (+ 7 других файлов) |
| constitution | №0781 (+ 12 других файлов) |
| Constitution | №0075 |
| constitutionHalfDamageFailure | №0774 |
| constitutionHalfDamageSuccess | №0774 |
| constitutionMaxBonus | №0774 |
| construct | №0623 (+ 12 других файлов) |
| constructBody | №0804 |
| constructConcentration | №0774 |
| constructDamageBonus | №0774 |
| constructMode | №0774 |
| consumableFunctional | №1163 |
| consumables | №0788 (+ 32 других файлов) |
| consume | №0667 (+ 1 других файлов) |
| consumed | №0667 (+ 2 других файлов) |
| consumedPotion | №0073 |
| consumeLairAction | №0800 |
| consumeLegendaryAction | №0800 |
| consumeLegendaryResistance | №0800 |
| consumeMageBerry | №0813 |
| consumeMagicMeleeWeapon | №0774 |
| consumeMaximum | №0813 |
| consumeOn | №0813 |
| consumePendingOnHit | №0643 (+ 1 других файлов) |
| consuming | №0709 (+ 1 других файлов) |
| Consuming | №0790 |
| consumption | №0774 |
| container | №0784 |
| containerId | №1134 |
| containerRequired | №0774 |
| containers | №0801 (+ 6 других файлов) |
| containerType | №0784 |
| content | №0066 (+ 1 других файлов) |
| contentPackId | №0073 (+ 6 других файлов) |
| contents | №0784 (+ 6 других файлов) |
| contentType | №1270 |
| context | №0650 (+ 1 других файлов) |
| contextIsolation | №0881 |
| contextRestore | №1267 |
| contingencyPlan | №0774 |
| contracts | №0693 |
| controlMode | №0073 (+ 5 других файлов) |
| controlWithoutAction | №0774 |
| controlWithSameAction | №0774 |
| conversant | №0636 |
| Conversant | №0774 |
| convertDamage | №0808 |
| cook | №0665 (+ 4 других файлов) |
| coordinatedAssault | №0774 |
| copper | №0668 |
| copy | №0653 |
| copyDeleted | №0648 |
| core | №0790 |
| CORE | №0643 |
| core_2014 | №0623 |
| coreLoop | №0702 |
| corpseFlorist | №0804 |
| corpseId | №0804 |
| corpseTypes | №0774 |
| corrosion | №0636 (+ 1 других файлов) |
| corset | №1080 |
| cost | №0073 (+ 36 других файлов) |
| costGp | №0794 (+ 4 других файлов) |
| costs | №0619 (+ 1 других файлов) |
| cot | №0062 |
| cotton | №0057 (+ 1 других файлов) |
| counselorProtege | №0774 |
| count | №0056 (+ 65 других файлов) |
| counter | №0062 |
| counterAttackIfReducedToZero | №0774 |
| countercharm | №0643 |
| countered | №0806 |
| countsAsHit | №0774 |
| courageSource | №0650 |
| coven | №0808 |
| covens | №0702 |
| cover | №0806 (+ 6 других файлов) |
| coverBonus | №0806 (+ 1 других файлов) |
| covered | №0054 |
| coversTop | №0057 |
| cp | №0785 (+ 8 других файлов) |
| cPerS | №1723 |
| cr | №0623 (+ 18 других файлов) |
| craft | №0774 (+ 4 других файлов) |
| craftBonus | №0803 |
| craftCheck | №0666 (+ 1 других файлов) |
| craftDC | №0666 (+ 1 других файлов) |
| crafted | №0075 (+ 5 других файлов) |
| craftedOnly | №0788 |
| craftEffect | №0666 |
| craftFeature | №0774 |
| craftingBonus | №0658 (+ 3 других файлов) |
| craftingMaterial | №0659 |
| craftingProfessions | №0664 (+ 2 других файлов) |
| craftingProfile | №0667 |
| craftingSources | №0667 |
| craftMasterworkBonus | №0660 (+ 2 других файлов) |
| craftMaterialId | №0623 (+ 14 других файлов) |
| craftOutcome | №0667 (+ 1 других файлов) |
| craftProfession | №0666 (+ 1 других файлов) |
| craftQuality | №0660 (+ 6 других файлов) |
| craftQualityLabel | №0669 |
| craftRecipe | №0663 (+ 3 других файлов) |
| craftRoll | №0669 |
| CRAFTS | №0774 |
| craftTags | №0662 |
| craftTime | №0663 (+ 2 других файлов) |
| craftTools | №0663 |
| craftValue | №0666 (+ 1 других файлов) |
| craftValueNote | №0660 |
| crate | №0062 |
| create | №0071 (+ 7 других файлов) |
| createAvatar | №0834 |
| createBodyStatBlock | №0864 |
| createBoneObject | №0774 |
| createCharacter | №0061 |
| created | №0774 (+ 1 других файлов) |
| createdAt | №0066 (+ 8 других файлов) |
| createdAtTurn | №0073 |
| createElement | №1069 (+ 23 других файлов) |
| createFor | №0652 (+ 2 других файлов) |
| createHostStatBlock | №0811 |
| createLarvaStatBlock | №0811 |
| createObjectURL | №1209 |
| createOozeDuplicate | №0073 |
| createProjectedItem | №0774 |
| createRoom | №1206 |
| createShell | №0779 |
| creationOptions | №0813 |
| creator | №0790 |
| creatorMind | №0774 |
| creatures | №0834 |
| creatureType | №0641 (+ 12 других файлов) |
| crescendoOfViolence | №0774 |
| crest | №0056 |
| crestSize | №0061 (+ 1 других файлов) |
| crewLeader | №0774 |
| crewRangeFt | №0774 |
| crewSaveBonus | №0774 |
| crewSize | №0774 |
| crewSupport | №0771 |
| criminalContact | №0774 |
| crimson | №0827 |
| crimsonRite | №0636 |
| crimsonRites | №0683 |
| cripplingJinx | №0774 |
| cripplingStrike | №0774 |
| critFearAoEFt | №0636 |
| critical | №0650 (+ 35 других файлов) |
| critical_failure | №0659 (+ 1 других файлов) |
| criticalDoubles | №0774 (+ 1 других файлов) |
| criticalHit | №0774 |
| criticalOn | №0771 |
| criticalOnHit | №0774 |
| criticalRange | №0643 (+ 2 других файлов) |
| criticalSpellcasting | №0804 |
| critRange | №0636 |
| critWithRiteRestoresBloodMaledict | №0774 |
| crLimit | №0774 |
| crone | №0804 |
| crop | №0056 |
| crow | №0056 |
| crown | №0056 (+ 1 других файлов) |
| crown_braid | №0056 (+ 1 других файлов) |
| crownColor | №0061 (+ 1 других файлов) |
| crownSize | №0061 (+ 3 других файлов) |
| crScale | №0073 |
| crTotal | №0804 |
| cruelty | №0636 |
| Cruelty | №0774 |
| cryo | №0073 |
| cryoBomb | №0774 |
| crypto | №1074 (+ 25 других файлов) |
| crystal | №0663 (+ 3 других файлов) |
| cssText | №1129 |
| ctx | №0068 (+ 1 других файлов) |
| cube | №0681 |
| cunningAction | №0643 |
| cunningInstinct | №0774 |
| cupNumber | №0813 (+ 3 других файлов) |
| cups | №0057 (+ 2 других файлов) |
| cups_05 | №0813 |
| cups_13 | №0813 |
| cupsize | №1113 |
| curl | №0056 |
| curly_long | №0056 (+ 1 других файлов) |
| curly_short | №0056 (+ 1 других файлов) |
| current | №0066 (+ 34 других файлов) |
| currentCampaignId | №0637 |
| currentChar | №1160 (+ 5 других файлов) |
| currentCharacter | №1179 |
| currentFloor | №0066 |
| currentHP | №0779 (+ 3 других файлов) |
| currentId | №0842 |
| currentLevel | №0665 |
| currentVersion | №0837 |
| curse | №0072 (+ 10 других файлов) |
| curseAbility | №0072 |
| curseAbilityCheckDC | №0774 |
| curseBonusDamage | №0636 |
| curseCombination | №0774 |
| curseConcentrationAdvantage | №0808 |
| cursed | №0058 (+ 1 других файлов) |
| cursedAttackPenalty | №0636 |
| cursedCheckModifiers | №0636 |
| curseDetection30 | №0774 |
| cursedSaveModifiers | №0636 |
| curseImmunity | №0774 |
| curseItem | №0808 |
| curseMastery | №0771 |
| curseName | №0774 |
| cursePenalty | №0804 |
| cursePower | №0771 |
| curses | №0636 (+ 4 других файлов) |
| CURSES | №0774 |
| curseSave | №0804 |
| curseSpecialist | №0636 |
| curseSpells | №0774 |
| curseTarget | №0774 |
| custom | №0061 (+ 2 других файлов) |
| customColor | №0056 (+ 2 других файлов) |
| customCrafted | №0669 |
| customDress | №0057 |
| CustomEvent | №1109 (+ 1 других файлов) |
| customizations | №1078 (+ 1 других файлов) |
| customShirt | №0057 |
| customSkirt | №0057 |
| cut | №0057 (+ 2 других файлов) |
| cutoff | №1304 |
| cwd | №1066 (+ 3 других файлов) |
| cx | №0053 (+ 2 других файлов) |
| cycles | №0820 (+ 1 других файлов) |
| cz | №0056 (+ 1 других файлов) |
| d | №0053 (+ 6 других файлов) |
| d2 | №1115 (+ 2 других файлов) |
| d20 | №0650 (+ 2 других файлов) |
| d20Modifiers | №0813 |
| d6 | №0073 |
| damage | №0069 (+ 89 других файлов) |
| DAMAGE_TYPES | №0650 |
| damageAfter | №0774 |
| damageAtTurnStart | №0073 |
| damageBefore | №0774 |
| damageBody | №0811 (+ 1 других файлов) |
| damageBonus | №0774 (+ 1 других файлов) |
| damageBonusMultiplier | №0774 |
| damageBoost | №0771 |
| damageContext | №0806 |
| damageDice | №0073 (+ 14 других файлов) |
| damageDie | №0771 (+ 1 других файлов) |
| damageDoubled | №0650 |
| damageDurability | №0661 |
| damageImmunity | №0774 |
| damageModifiers | №0636 (+ 1 других файлов) |
| damageMult | №0834 |
| damageOnFailedSave | №0774 |
| damageParts | №0636 (+ 6 других файлов) |
| damagePer10Ft | №0774 |
| damagePerTrigger | №0774 |
| damageRedirect | №0808 |
| damageReduction | №0643 (+ 4 других файлов) |
| damageResistance | №0771 (+ 1 других файлов) |
| damageResult | №0650 (+ 1 других файлов) |
| damageRoll | №0073 (+ 4 других файлов) |
| damageRolled | №0813 |
| damageSelf | №0774 |
| damageShell | №0779 |
| damageTaken | №0650 |
| damageType | №0073 (+ 84 других файлов) |
| damageTypeChoice | №0774 |
| damageTypes | №0073 (+ 5 других файлов) |
| danceBonusByCount | №0804 |
| dangerSense | №0643 |
| daringRescue | №0774 |
| dark | №0863 |
| darkArcana | №0804 |
| darkAugmentation | №0636 |
| darkCaptain | №0774 |
| darkDelirium | №0806 |
| darkMagic | №0771 |
| darkness | №0066 (+ 1 других файлов) |
| darknessAroundInterdictedFt | №0774 |
| darkOneDiscourse | №0774 |
| darkOnesBlessing | №0643 |
| darkvision | №0828 |
| darkvision60 | №0774 |
| darkvisionBonusFt | №0636 |
| darkvisionFt | №0636 (+ 1 других файлов) |
| dash | №0771 |
| dashMageRetreat | №0813 |
| dastardlyTalents | №0774 |
| data | №0072 (+ 10 других файлов) |
| dataset | №1094 |
| date | №0637 (+ 1 других файлов) |
| dauntless | №0734 |
| dawn | №0636 |
| day | №0068 |
| dc | №0072 (+ 45 других файлов) |
| dcReduction | №0667 |
| dead | №0073 (+ 6 других файлов) |
| deadMistAcolyte | №0804 |
| deadShell | №0779 |
| deadSpace | №0774 (+ 1 других файлов) |
| deadSpaceSlots | №0804 |
| deafened | №0073 (+ 1 других файлов) |
| deathAfterDuration | №0774 |
| deathCause | №1068 |
| deathExplosion | №0804 |
| deathKnight | №0804 |
| deathPenalty | №0774 |
| deathSave | №0650 |
| deathSaveDisadvantage | №0636 (+ 1 других файлов) |
| deathSaveFailures | №0650 |
| deathSaves | №0650 (+ 6 других файлов) |
| deathWard | №0808 |
| debug | №0843 |
| decayPerHour | №0073 |
| deception | №0767 (+ 1 других файлов) |
| deceptionBlocked | №0813 |
| deceptionIntent | №1147 |
| deceptionTotal | №0073 (+ 1 других файлов) |
| deck | №0816 (+ 1 других файлов) |
| decks | №0816 |
| declaredSourceCommit | №1304 |
| decorateItem | №0665 |
| deepSleeper | №0774 |
| deerHide | №0668 |
| default | №0061 (+ 2 других файлов) |
| DEFAULT | №0066 |
| DEFAULT_ENABLED | №0661 |
| DEFAULT_RACES | №1247 |
| defaultEnabled | №1101 |
| defaultSkinByGender | №0061 |
| defaultSkinId | №0061 |
| defeat | №0833 |
| defeated | №0073 (+ 9 других файлов) |
| defenderAura | №0771 |
| defenderReaction | №0650 (+ 4 других файлов) |
| defensive_duelist | №0777 |
| defensiveStance | №0774 |
| deferDamage | №0806 (+ 1 других файлов) |
| definition | №0813 |
| definitions | №0813 |
| deflected | №0650 |
| deflectMissiles | №0643 |
| deformAsset | №0063 |
| deformedPositions | №1091 |
| deftness | №0636 |
| Deftness | №0774 |
| deinonychus | №0681 |
| deleted | №0648 (+ 1 других файлов) |
| denial | №0774 |
| deniesActions | №0073 |
| denominator | №0816 |
| density | №0054 (+ 2 других файлов) |
| denValues | №0057 |
| denyAttackAdvantage | №0774 |
| denyBonusActions | №0073 |
| denyDashDisengageDodge | №0073 |
| depleted | №1161 |
| depth | №0056 (+ 4 других файлов) |
| desc | №0619 (+ 13 других файлов) |
| describeProfession | №0665 |
| description | №0066 (+ 70 других файлов) |
| descriptor | №0054 |
| deserialize | №0061 |
| desk | №0062 |
| destination | №0813 (+ 8 других файлов) |
| destinationGender | №1304 |
| destroy | №0838 |
| destroyThrallToHeal | №0804 |
| destroyUndead | №0643 |
| detail | №0061 (+ 3 других файлов) |
| details | №0779 (+ 3 других файлов) |
| detectIllusionAndShapeshifter | №0774 |
| detectMagic | №0774 (+ 1 других файлов) |
| dethek | №0774 (+ 1 других файлов) |
| dethekStance | №0774 |
| devicePixelRatio | №1069 (+ 1 других файлов) |
| devices | №0665 |
| deviceScaleFactor | №1282 |
| devilDamageMaximum | №0813 |
| devilPlan | №0813 |
| deviousTactics | №0774 |
| devouring | №0774 (+ 1 других файлов) |
| devTools | №0881 |
| dex | №0619 (+ 56 других файлов) |
| dexBonus | №0636 |
| dexChecksAdvantage | №0636 (+ 1 других файлов) |
| dexIncrease | №0774 |
| dexMaxBonus | №0636 |
| dexMaxIncrease | №0774 |
| dexSave | №0774 |
| dexSavesDisadvantage | №0636 (+ 1 других файлов) |
| dexSaveVisible | №0650 (+ 1 других файлов) |
| dexterity | №0781 (+ 10 других файлов) |
| Dexterity | №0075 |
| dexteritySaveProficiency | №0774 |
| diagnostics | №0058 (+ 1 других файлов) |
| diagonal | №0815 |
| dialect | №0774 (+ 1 других файлов) |
| diamondForm | №0774 |
| diamondPaste | №0668 |
| diamondSoul | №0643 |
| dice | №0072 (+ 9 других файлов) |
| diceCount | №0642 (+ 3 других файлов) |
| diceSides | №0642 (+ 3 других файлов) |
| die | №0076 (+ 6 других файлов) |
| diet | №0623 (+ 12 других файлов) |
| difficultTerrain | №1201 |
| difficulty | №0800 |
| digDeep | №0711 (+ 1 других файлов) |
| digits | №0056 |
| diminutive | №0828 (+ 1 других файлов) |
| dimLightAdditionalFt | №0774 |
| direct | №0813 (+ 2 других файлов) |
| directAttackNearestIfFailed | №0774 |
| directDice | №0073 |
| direction | №0068 (+ 6 других файлов) |
| directionSense | №0774 |
| directShift | №0828 |
| dirty | №0648 |
| dirtyHit | №0774 |
| dirtyStrike | №0771 |
| disabled | №0659 (+ 2 других файлов) |
| disabledBlocked | №1101 |
| disableSense | №0774 |
| disadvantage | №0073 (+ 10 других файлов) |
| disadvantageAgainstOthers | №0774 |
| disadvantageAgainstOthersWithinFt | №0774 |
| disadvantageAgainstSelf | №0774 |
| disadvantageAttacksExceptSelfUntilEndNextTurn | №0774 |
| disadvantageFirstSaveAgainstSpell | №0774 |
| disadvantageInDimLight | №0774 |
| disadvantageNextAttack | №0774 |
| disadvantageOnSaveWhenHidden | №0774 |
| disadvantageSaves | №0774 |
| disadvantageVsBloodHunterSpells | №0774 |
| disarm | №0771 (+ 1 других файлов) |
| disassembleItem | №0659 (+ 1 других файлов) |
| discard | №0816 |
| disciplinaryAdept | №0774 |
| discipline | №0709 (+ 4 других файлов) |
| disciplines | №0709 (+ 2 других файлов) |
| disciplineUsesPerTurn | №0709 |
| discovered | №0074 (+ 1 других файлов) |
| discoveries | №0073 (+ 3 других файлов) |
| discovery | №0073 (+ 1 других файлов) |
| discoveryBonus | №0076 |
| discoveryLevelGating | №0672 |
| discoveryRecipes | №0073 |
| disengageOnHit | №0771 |
| disguise | №0667 |
| disguiseAndHexFocus | №0808 |
| disguiseAppearance | №0073 |
| disguiser | №0665 (+ 1 других файлов) |
| dismissMageArmor | №0813 |
| disoriented | №0774 |
| disorientedDice | №0774 |
| dispellingAnathema | №0774 |
| display | №0794 (+ 1 других файлов) |
| displayName | №0640 (+ 3 других файлов) |
| dispose | №0068 |
| dist | №0806 |
| distance | №0651 (+ 2 других файлов) |
| distanceFt | №0636 (+ 18 других файлов) |
| distant | №0643 |
| divineChannelUses | №0804 |
| divineIntervention | №0643 |
| divineMandate | №0774 |
| divineRespite | №0798 |
| divineSense | №0643 |
| divineSmite | №0643 (+ 2 других файлов) |
| dlc | №0661 |
| DND_CLASSES_LIST | №1247 |
| DND_UPDATE_MANIFEST_URL | №1246 |
| dndBackgrounds | №1247 |
| DNDBattleBoard | №1180 |
| DNDCampaign | №1179 (+ 1 других файлов) |
| DNDCloudConfig | №1099 |
| DNDCombat | №1179 (+ 1 других файлов) |
| DNDContent | №1067 (+ 2 других файлов) |
| DNDGameplayV57 | №1180 |
| DNDGLTF | №1069 |
| DndLanBridge | №1206 |
| DNDMonsterLoot | №1179 |
| dndMorphChannels | №1069 (+ 1 других файлов) |
| dndMorphSource | №1256 |
| dndNetwork | №1179 (+ 1 других файлов) |
| DNDRules | №1241 |
| DNDSummoning | №1179 |
| dock | №0065 |
| document | №1067 (+ 39 других файлов) |
| documentElement | №1109 |
| dodge | №0774 |
| dogAndHound | №0711 |
| dominantCharacteristics | №0864 |
| donorHitDieSpent | №0808 |
| donorType | №0073 (+ 1 других файлов) |
| donorVerified | №1068 |
| door | №0062 |
| doubleBreath | №0774 |
| doubleFoodSleepInterval | №0774 |
| doubleProficiency | №0774 |
| doubleSided | №0064 |
| doubleSpeed | №0804 |
| doublingJinx | №0774 |
| downButNotOut | №0711 (+ 1 других файлов) |
| downButNotOutActive | №0774 |
| downstreamRecipeAvailable | №0658 |
| draconicDiscourse | №0774 |
| draconicElement | №1218 |
| draconicResilience | №0643 |
| draconicStance | №0774 |
| draft | №0856 |
| dragging | №0621 |
| dragon | №0056 (+ 17 других файлов) |
| dragon_fear | №0777 |
| dragonArmyAffinity | №0626 |
| dragonFamily | №1174 |
| dragonlance | №0626 |
| dragonReagent | №0662 (+ 1 других файлов) |
| dragonsAscent | №0774 |
| dragonScale | №0662 (+ 1 других файлов) |
| dragonScaleRed | №0668 |
| draw | №0067 (+ 2 других файлов) |
| draws | №1069 |
| dreadfulGlare | №0774 |
| dreadlord | №0774 |
| dreadPresence | №0774 |
| dress | №0057 (+ 1 других файлов) |
| dressSleeves | №0057 |
| driedHerbBundle | №0667 |
| driedMeat | №0667 (+ 1 других файлов) |
| dropObject | №0774 |
| dropToOneHP | №0681 |
| Drowned | №0774 |
| druid | №0793 (+ 1 других файлов) |
| druidic | №0643 |
| dryRun | №0658 (+ 6 других файлов) |
| duplicate | №0847 |
| duplicateOnPhaseRift | №0774 |
| duplicateTargetCollisions | №1121 |
| dur | №0662 |
| durability | №0660 (+ 4 других файлов) |
| durabilityBonus | №0664 |
| durabilityMax | №1100 (+ 1 других файлов) |
| durabilityMultiplier | №0660 (+ 2 других файлов) |
| duration | №0063 (+ 21 других файлов) |
| durationHours | №0636 (+ 2 других файлов) |
| durationMinutes | №0073 (+ 6 других файлов) |
| durationRounds | №0072 (+ 4 других файлов) |
| durationRule | №0828 |
| durationSeconds | №0813 (+ 1 других файлов) |
| durationTurns | №0804 |
| durationUnit | №0652 (+ 1 других файлов) |
| durationUntilSave | №0804 |
| durationUntilStartOfTurn | №0774 |
| duringShortRest | №1068 |
| dusk | №0068 |
| dwarf | №0658 |
| dwarf_hill | №0667 |
| dwarf_mountain | №0667 |
| dwarven_fortitude | №0777 |
| dwarvishDiscourse | №0774 |
| dyingCurse | №0774 |
| dynamic | №0056 |
| e | №0069 (+ 1 других файлов) |
| earField | №0056 |
| earFrame | №0057 |
| earLength | №0061 (+ 6 других файлов) |
| earPointiness | №0061 (+ 6 других файлов) |
| earth | №0681 |
| Earth | №0075 |
| earthCore | №0821 |
| earthEssence | №0821 |
| earTuftSize | №0061 (+ 2 других файлов) |
| ecology | №0623 (+ 12 других файлов) |
| ectoplasm | №0662 (+ 1 других файлов) |
| edition | №0072 (+ 23 других файлов) |
| effect | №0073 (+ 20 других файлов) |
| effectiveD20 | №0650 |
| effectiveDamage | №0650 |
| effectiveMaxHp | №0822 |
| effectiveMode | №1146 |
| effectiveStats | №0811 |
| effectKey | №0811 |
| effects | №0075 (+ 5 других файлов) |
| elasticHide | №0821 |
| Elderheart | №0790 |
| eldritchBane | №0774 |
| eldritchCannon | №0643 |
| eldritchInvocations | №0643 |
| eldritchMaster | №0643 |
| electricCharge | №0774 |
| elemental | №0058 (+ 14 других файлов) |
| Elemental | №0790 |
| elementalAsh | №0662 (+ 1 других файлов) |
| elementalBlast | №0774 |
| elementalPower | №0774 |
| elephant | №0056 |
| elephantEarSize | №0061 (+ 1 других файлов) |
| elephantTuskSize | №0061 (+ 1 других файлов) |
| elevationFt | №0813 |
| elf_wood | №0667 |
| elfcity | №0058 |
| eligible | №1158 |
| elixirs | №0665 |
| eloquentSpeech | №0774 |
| elven_accuracy | №0777 |
| email | №0648 (+ 1 других файлов) |
| emanationFt | №0774 |
| embers | №0636 |
| Embers | №0774 |
| emerald | №0863 |
| emergencyReanimate | №0864 |
| emissaryPhaseHooks | №1167 |
| empowered | №0643 (+ 1 других файлов) |
| empty | №0814 |
| enableApply | №0838 |
| enabled | №0054 (+ 6 других файлов) |
| enchant | №0665 |
| enclosed | №0054 |
| encoding | №0884 (+ 7 других файлов) |
| encounter | №0855 (+ 1 других файлов) |
| encounterBias | №0627 |
| encounterId | №0813 (+ 2 других файлов) |
| end | №0056 (+ 2 других файлов) |
| endActorTurn | №0636 |
| endAllRites | №0774 |
| endCondition | №0774 |
| endConditions | №0774 |
| endedByZeroHp | №0650 |
| endEffectPsi | №0774 |
| endEncounter | №0681 |
| endExternalPetrificationAfter | №0774 |
| endIllusion | №0774 |
| endInvisibility | №0774 |
| endPossession | №0779 |
| endRampage | №0681 |
| ends | №0839 |
| endsAt | №0774 |
| endsOnAttack | №0073 (+ 1 других файлов) |
| endsOnAttackOrSpell | №0774 |
| endsOnDamage | №0073 |
| endsOnHostile | №0813 |
| endsOnMagicHealing | №0681 |
| endsOnMove | №0774 |
| endsOnRemoveCurse | №0774 |
| endSpellConcentration | №0813 |
| endsWhen | №0774 |
| endTurn | №0778 (+ 3 других файлов) |
| enemiesFrightened | №0774 |
| enemy | №1126 (+ 6 других файлов) |
| enemyDistanceFt | №1159 |
| enemyRead | №0771 |
| enervatingJinx | №0774 |
| enervatingSpell | №0774 |
| eng | №0740 |
| engines | №0843 (+ 1 других файлов) |
| englishName | №0072 (+ 29 других файлов) |
| enhancement | №0774 |
| enhancingSurge | №0774 |
| enlightened | №0774 |
| enliveningOrder | №0774 |
| enshroudingImprecation | №0774 |
| ensure | №0779 (+ 8 других файлов) |
| ensureCharacterProfessions | №0665 |
| ensureMaterial | №0662 |
| ensureResourceState | №0800 |
| ensureTracker | №0778 (+ 1 других файлов) |
| enterSpiritForm | №0779 |
| entities | №0073 (+ 2 других файлов) |
| entity | №0073 (+ 4 других файлов) |
| entityId | №0073 (+ 4 других файлов) |
| entries | №0648 (+ 1 других файлов) |
| entryRoute | №0864 |
| enumerable | №0813 |
| env | №1066 |
| ep | №0785 (+ 6 других файлов) |
| equip | №0061 |
| equipment | №0061 (+ 6 других файлов) |
| equipmentId | №0061 |
| equipMilitia | №0774 |
| equipped | №0069 (+ 6 других файлов) |
| equippedArmor | №1101 |
| error | №0058 (+ 33 других файлов) |
| error_code | №1099 |
| errors | №0656 (+ 1 других файлов) |
| essence | №0821 |
| eTexture | №0071 |
| ethanol | №0668 |
| ethereal | №0774 |
| evasion | №0643 (+ 3 других файлов) |
| evasionMonk | №0643 |
| event | №0813 (+ 3 других файлов) |
| eventCount | №0842 (+ 2 других файлов) |
| eventId | №0814 (+ 1 других файлов) |
| eventLog | №0857 (+ 2 других файлов) |
| eventLogBaseSeq | №1239 |
| events | №0842 (+ 5 других файлов) |
| eventSeq | №0805 (+ 5 других файлов) |
| exact | №1270 |
| exaltedLeader | №0734 |
| exaltedMutation | №0636 |
| exaltedProtege | №0774 |
| excellent | №0803 |
| exceptional | №0659 (+ 1 других файлов) |
| exceptPsychic | №0774 |
| exclude | №0053 |
| excludeUndeadConstructs | №0813 (+ 2 других файлов) |
| executablePath | №1259 (+ 37 других файлов) |
| executeAttack | №0778 |
| executionActor | №0813 |
| exhaustion | №0774 (+ 2 других файлов) |
| exhaustionAfter | №0771 |
| exhaustionApplied | №0774 |
| exhaustionGain | №0771 |
| exhaustionOnFailedSave | №0774 |
| exit | №1104 |
| exorcist | №0636 (+ 1 других файлов) |
| exoskeletonArmor | №0774 |
| exp | №0775 |
| expand | №0655 |
| expanded | №0655 (+ 1 других файлов) |
| expected | №0849 (+ 1 других файлов) |
| expectedProcessed | №0821 |
| expectedRevision | №0788 (+ 21 других файлов) |
| expendHitDie | №0774 |
| experience | №0781 |
| experimental | №0074 (+ 1 других файлов) |
| experimentalist | №0672 |
| experiments | №0074 (+ 1 других файлов) |
| expertFocus | №0774 |
| expertise | №0774 (+ 1 других файлов) |
| expertiseSkills | №0774 |
| expired | №0073 |
| expires | №0073 (+ 3 других файлов) |
| expires_at | №0648 |
| expires_in | №1099 |
| expiresAt | №0072 (+ 3 других файлов) |
| expiresRounds | №0774 |
| exploded | №0073 |
| explodeRadiusFt | №0073 |
| explodesOncePerTurn | №0774 |
| exploit | №0681 |
| exploitDice | №0734 |
| exploitDie | №0734 (+ 1 других файлов) |
| exploits | №0734 (+ 1 других файлов) |
| exploitsKnown | №0734 |
| explosiveBane | №0774 |
| explosiveCannon | №0806 |
| exportedAt | №0842 |
| exportedMacros | №1304 |
| exportJSON | №0058 (+ 1 других файлов) |
| exportReplay | №0842 |
| exportSession | №0855 (+ 1 других файлов) |
| exposingStrike | №0774 |
| exposure | №0636 |
| expression | №0650 (+ 2 других файлов) |
| extended | №0643 |
| extendedResourceState | №0643 |
| extendedTactics | №0730 |
| extendExistingDarkvisionFt | №0636 |
| extendHex | №0771 |
| extendHexRounds | №0774 |
| external | №0054 (+ 1 других файлов) |
| externalGeometryAvailable | №0054 |
| externalGeometryReady | №0054 |
| externalGeometryStage | №0054 |
| extra | №0074 (+ 2 других файлов) |
| extraAction | №0774 (+ 1 других файлов) |
| extraActionNextTurn | №0813 |
| extraAstralConstruct | №0774 |
| extraAtk | №0642 (+ 1 других файлов) |
| extraAttack | №0636 (+ 7 других файлов) |
| extraAttackDamage | №0636 |
| extraAttacks | №0072 (+ 13 других файлов) |
| extraBloodMaledictUse | №0636 (+ 1 других файлов) |
| extraCantrips | №0808 |
| extraClassType | №0641 |
| extraCurseArmamentAttack | №0774 |
| extraCursedAttunement | №0774 |
| extraDamage | №0073 (+ 2 других файлов) |
| extraDamageByLevel | №0072 |
| extraDamageDice | №0774 |
| extraDamageDie | №0774 |
| extraDice | №0073 (+ 8 других файлов) |
| extraDieVsUndead | №0774 |
| extradimensional | №0808 |
| extraDimLight | №0774 |
| extraDimLightDie | №0774 |
| extraDiscipline | №0774 |
| extraDmg | №0642 (+ 2 других файлов) |
| extraExploitDice | №0774 |
| extraExploitKnown | №0774 |
| extraFamiliarAction | №0808 |
| extraForms | №0774 |
| extraKnowledgeSkill | №0774 |
| extraMovement | №0813 |
| extraNecrotic | №0774 |
| extrapolated | №1256 |
| extraPsiOverMax | №0774 |
| extraPsychicDice | №0774 |
| extraRadiusFt | №0073 |
| extraRampageDie | №0774 |
| extraReaction | №0813 |
| extraReactions | №0813 |
| extraRiteDie | №0774 |
| extras | №1069 (+ 1 других файлов) |
| extraSaveBonus | №0867 |
| extraSkillChoice | №0774 |
| extraSuture | №0804 |
| extraTargetPerSlotAbove1 | №0774 |
| extraTargets | №0774 |
| extraTurns | №0808 |
| extraUnarmedAfterTwoOldOneTwo | №0774 |
| extraUse | №0774 (+ 1 других файлов) |
| eye | №0056 (+ 1 других файлов) |
| eyeColor | №0061 (+ 3 других файлов) |
| eyeGlow | №0061 (+ 2 других файлов) |
| eyeHeight | №0058 (+ 2 других файлов) |
| eyeless | №0636 |
| eyeliner | №1268 |
| eyeShape | №0061 |
| eyeSize | №0061 (+ 1 других файлов) |
| eyeSpacing | №0061 (+ 1 других файлов) |
| eyeTilt | №0058 (+ 1 других файлов) |
| eyeWidth | №0058 (+ 1 других файлов) |
| f | №0056 (+ 2 других файлов) |
| faceColor | №0061 (+ 5 других файлов) |
| faceLength | №0058 (+ 1 других файлов) |
| faceShape | №0061 |
| faceTint | №0061 (+ 2 других файлов) |
| faceWidth | №0058 (+ 2 других файлов) |
| facileSuppression | №0774 |
| factionAgents | №0627 |
| factions | №0627 |
| fail | №0838 (+ 1 других файлов) |
| failChance | №0075 |
| failed | №0058 (+ 4 других файлов) |
| failedSave | №1148 |
| failNextRollDisadvantage | №0774 |
| failure | №0075 (+ 3 других файлов) |
| failures | №0650 (+ 14 других файлов) |
| fair | №0803 |
| fall | №0650 (+ 3 других файлов) |
| fallDamageReduction | №0774 |
| fallen | №0066 (+ 1 других файлов) |
| fallenAttack | №0636 |
| fallenPuppet | №0636 |
| fallingStrike | №0771 |
| familiar | №0652 (+ 2 других файлов) |
| familiarAttack | №0774 |
| familiarHpBonus | №0774 |
| familiarLink | №0808 |
| familiarSettlement | №0774 |
| familiarStealth | №0808 |
| families | №0623 (+ 24 других файлов) |
| family | №0054 (+ 3 других файлов) |
| familyByCreature | №1166 (+ 10 других файлов) |
| familyId | №0623 (+ 10 других файлов) |
| fancyFootwork | №0774 |
| fangSize | №0061 (+ 2 других файлов) |
| fastHands | №0643 |
| fastMovement | №0643 |
| fastTravel | №0774 |
| fat | №0058 (+ 1 других файлов) |
| fathomless | №0636 |
| fatigue | №0774 |
| favoredEnemy | №0643 |
| favoredServant | №0774 |
| fear | №0073 (+ 1 других файлов) |
| Fear | №0075 |
| fearApplied | №0774 |
| fearAura | №0771 |
| fearBomb | №0774 |
| fearImmune | №0813 |
| fearImmunity | №0771 |
| fearPulse | №0624 |
| fearSave | №0774 |
| fearSavePenalty | №0774 |
| fearSourceId | №0813 |
| fearTargets | №1155 |
| fearVisible | №0813 |
| feat | №0742 |
| featherTailSize | №0061 (+ 3 других файлов) |
| featherWingSize | №0061 (+ 3 других файлов) |
| feats | №0781 (+ 3 других файлов) |
| feature | №0619 (+ 1 других файлов) |
| FEATURE_DEFS | №0643 |
| featureAvailableForCurrentBuild | №0643 |
| featureId | №0806 |
| featureLevels | №0798 (+ 4 других файлов) |
| featureName | №0806 (+ 2 других файлов) |
| features | №0781 (+ 57 других файлов) |
| fecundAffliction | №0774 |
| feedOnCorpse | №0811 |
| feet | №0056 (+ 9 других файлов) |
| feint | №0774 |
| female | №0054 (+ 2 других файлов) |
| femaleStackTerms | №1304 |
| feralInstinct | №0643 |
| feralSenses | №0643 (+ 1 других файлов) |
| ferocious | №0681 |
| ferocity | №0651 (+ 3 других файлов) |
| ferocityMax | №0652 (+ 1 других файлов) |
| fetch | №1071 (+ 6 других файлов) |
| fey | №0623 (+ 11 других файлов) |
| fey_touched | №0777 |
| feyFiber | №0821 |
| feyPresence | №0643 (+ 1 других файлов) |
| fiber | №0662 (+ 1 других файлов) |
| field | №0056 (+ 1 других файлов) |
| fiend | №0623 (+ 12 других файлов) |
| fiendish | №0774 (+ 1 других файлов) |
| fiendishStance | №0774 |
| fight | №0813 |
| fightClubs | №0711 |
| fighterRemarkableAthlete | №0643 |
| fighting_initiate | №0777 |
| fightingSpirit | №0711 (+ 1 других файлов) |
| fightingStyle | №0636 (+ 4 других файлов) |
| fightingStyleChoice | №0774 |
| fightingStyles | №0683 (+ 1 других файлов) |
| file | №0863 (+ 1 других файлов) |
| filename | №0658 (+ 70 других файлов) |
| FileReader | №1209 |
| files | №0837 (+ 4 других файлов) |
| filter | №0827 (+ 3 других файлов) |
| filtered | №0842 |
| final | №0845 |
| finalMartyrdom | №0798 |
| finalStrikeExploit | №0774 |
| findRecipeForItem | №0659 |
| fine | №0659 (+ 3 других файлов) |
| finecarver | №0665 |
| fineFiberV49 | №0662 |
| fineLeatherV49 | №0662 |
| finesse | №0808 |
| finesseOrRanged | №1219 |
| finger | №0056 |
| finish | №0056 (+ 2 других файлов) |
| finishLastStand | №0813 |
| finite | №1273 (+ 3 других файлов) |
| finSize | №0061 (+ 2 других файлов) |
| firbolg | №0667 |
| fire | №0636 (+ 3 других файлов) |
| Fire | №0075 |
| fireAffinity | №0808 |
| fireClay | №0668 |
| fireDamage | №0774 (+ 1 других файлов) |
| fireEssence | №0662 (+ 1 других файлов) |
| fireResistance | №0808 |
| firmness | №1113 |
| first | №0822 |
| firstAid | №0774 |
| firstAttackAdvantage | №0774 (+ 1 других файлов) |
| firstHitByEachTargetRestoresMoxie | №0774 |
| firstMate | №0774 |
| fisher | №0796 (+ 1 других файлов) |
| fisticuffs | №0711 |
| fisticuffsDie | №0711 |
| fit | №0057 (+ 8 других файлов) |
| fitFrame | №0057 |
| fitProfile | №0061 |
| fixed | №0708 (+ 1 других файлов) |
| fixtureSha256 | №1112 |
| fizban | №0623 |
| flags | №0813 |
| flame | №0636 |
| flameBurst | №0774 |
| flameReroll12 | №0636 |
| flamesOfHope | №0774 |
| flare | №0057 |
| flashOfGenius | №0643 (+ 1 других файлов) |
| flashOfGeniusAvailable | №0650 |
| flat | №0056 |
| flawed | №0669 |
| flawlessAnalysis | №0824 |
| flax | №0668 |
| fletcher | №0665 (+ 2 других файлов) |
| fletchingStock | №0662 (+ 1 других файлов) |
| fletchingStockV49 | №0662 |
| floatObjectsLb | №0774 |
| floor | №0053 (+ 5 других файлов) |
| FLOOR | №0067 |
| floor_ceramic_tile_dark | №0067 |
| floor_ceramic_tile_light | №0067 |
| floor_checker_tile | №0067 |
| floor_cobblestone | №0067 |
| floor_earth | №0067 |
| floor_grass | №0067 |
| floor_hex_tile | №0067 |
| floor_marble_dark | №0067 |
| floor_marble_light | №0067 |
| floor_parquet_herringbone | №0067 |
| floor_rug_blue | №0067 |
| floor_rug_green | №0067 |
| floor_rug_red | №0067 |
| floor_stone_tile_dark | №0067 |
| floor_stone_tile_light | №0067 |
| floor_tatami | №0067 |
| floor_water | №0067 |
| floor_wood_dark | №0067 |
| floor_wood_light | №0067 |
| floors | №0066 (+ 1 других файлов) |
| flowers | №0820 |
| flurry | №0643 |
| fly | №0804 |
| flyFt | №0636 (+ 1 других файлов) |
| flyIfSelected | №0681 |
| flyingSpeed | №0808 |
| flySpeed | №0073 (+ 2 других файлов) |
| focus | №0636 (+ 10 других файлов) |
| focusDebuff | №0774 |
| focusDuration | №0824 |
| focusDurationRounds | №0774 |
| focusEndsOn | №0824 |
| focuses | №0643 |
| focusRangeFt | №0824 |
| foe | №1128 (+ 4 других файлов) |
| foeSlayer | №0643 |
| foeSlayerApplied | №1220 |
| foeSlayerMode | №1220 |
| folder | №1113 (+ 2 других файлов) |
| folders | №0619 (+ 2 других файлов) |
| fontOfLife | №0730 |
| fontOfMagic | №0643 |
| food | №0794 |
| foot | №0056 |
| footL | №0054 |
| footprintFeet | №0061 |
| footR | №0054 |
| foraging | №0665 |
| force | №0866 (+ 7 других файлов) |
| forceAttackRedirect | №0774 |
| forceCrit1 | №1146 |
| forceCritical | №0643 (+ 1 других файлов) |
| forced | №0650 (+ 2 других файлов) |
| forceDamage | №0681 (+ 1 других файлов) |
| forceDamageInside | №0774 |
| forcedAttack | №0845 |
| forcedD20 | №0845 |
| forcedDamage | №0845 |
| forcedDice | №0847 |
| forcedFailure | №0813 |
| forcedMeleeReaction | №0774 |
| forcedMoveFt | №0771 (+ 2 других файлов) |
| forcedMovementProtection | №0774 |
| forcedReactionAttack | №0774 |
| forcedSave | №0845 |
| forceOfNature | №0828 |
| forceSlot | №1157 |
| forceSurge | №0774 |
| forceTwenty | №0643 |
| forceUnarmed | №0774 |
| forearmL | №0054 |
| forearmR | №0054 |
| foresight | №0771 |
| forest | №0058 (+ 1 других файлов) |
| forge | №0058 |
| forger | №0665 (+ 1 других файлов) |
| forgery | №0667 |
| forgetAfterCast | №0774 |
| forgottenKnowledge | №0774 |
| forkedTongue | №0693 |
| form | №0056 (+ 3 других файлов) |
| formationRole | №0626 |
| formless | №0839 |
| formula | №0073 (+ 4 других файлов) |
| formulae | №0073 |
| formulas | №0073 (+ 4 других файлов) |
| fortified | №0866 |
| fortifyingDice | №0774 |
| fortunateCompany | №0774 |
| fortuneMode | №0813 |
| fortunePending | №0813 |
| fortuneRevealed | №0813 |
| fortuneTwist | №0774 |
| forward | №0061 |
| found | №0813 |
| fractureBurst | №0774 |
| frame | №0053 |
| free | №0774 (+ 4 других файлов) |
| freeAfflict | №0774 |
| freeAt17 | №0798 |
| freeAtLevel17 | №0774 |
| freeAtUnsealed | №0774 |
| freeCast | №0774 |
| freeDispelCaster | №0774 |
| freedomOfMovement | №0804 |
| freeExploits | №0774 |
| freeHandBonusAction | №0774 |
| freeHitDieChancePercent | №0774 |
| freeHoldTheLine | №0774 |
| freeInsightfulOrder | №0774 |
| freeLawShieldAndHalt | №0774 |
| freeMoveFt | №0774 |
| freePoints | №0709 |
| freePsi | №0774 |
| freePsiLost | №0774 |
| freePsiPerTurn | №0774 |
| freeSpell | №0808 |
| freeSpells | №0774 |
| freeTalent | №0774 |
| freeUse | №0774 |
| freeUses | №0839 |
| frenzy | №0643 |
| friend | №1133 (+ 3 других файлов) |
| frighten | №0808 |
| frightened | №0774 (+ 2 других файлов) |
| frightenedBy | №0813 |
| frightenedEffect | №0636 (+ 3 других файлов) |
| frightenedSaveDisadvantage | №0774 |
| frightenedUntilEndNextTurn | №0774 |
| from | №0627 (+ 25 других файлов) |
| fromFiendOrUndead | №0643 (+ 1 других файлов) |
| fromRound | №0813 |
| fromSpell | №0650 (+ 3 других файлов) |
| front | №0057 (+ 1 других файлов) |
| frontDigits | №0056 |
| FrontTexture | №1123 |
| frozen | №0636 |
| full_orc | №0667 |
| fullMaxNearestDistance | №1121 |
| fullMeanNearestDistance | №1121 |
| fullSpeedDragging | №0774 |
| fulminatingFatigue | №0774 |
| fumble | №0650 (+ 30 других файлов) |
| functionalStatus | №0797 |
| fur | №0056 |
| furAmount | №0054 (+ 3 других файлов) |
| furColor | №0061 (+ 1 других файлов) |
| furDensity | №0054 (+ 4 других файлов) |
| furH | №0056 |
| furLength | №0054 (+ 2 других файлов) |
| furParts | №0056 |
| furProfile | №0054 (+ 4 других файлов) |
| furRoots | №0056 |
| furShell | №0056 |
| furStrands | №0056 |
| furyOfForge | №0774 |
| fuseMinutes | №0073 |
| fuseRounds | №0073 (+ 1 других файлов) |
| g | №0863 |
| gainD4OnFailure | №0774 |
| gained | №0651 (+ 1 других файлов) |
| gainFerocity | №0651 (+ 1 других файлов) |
| gainRelaxationPerTurn | №0774 |
| gallantSpellcasting | №0774 |
| gameActors | №0636 |
| gameOfChance | №0774 |
| gameplay | №0843 (+ 2 других файлов) |
| gameplayEvents | №0857 (+ 1 других файлов) |
| gargantuan | №0811 (+ 1 других файлов) |
| gaseousBody | №0804 |
| gaseousReaction | №0804 |
| gateTowns | №0627 |
| gather | №0076 |
| gatherAction | №0076 |
| gathered | №0873 (+ 1 других файлов) |
| gatherIngredient | №0076 |
| gear | №0660 (+ 2 других файлов) |
| gelid | №0636 |
| Gelid | №0774 |
| gem | №0663 (+ 4 других файлов) |
| gemcutter | №0796 (+ 1 других файлов) |
| gems | №0665 |
| gender | №0055 (+ 18 других файлов) |
| genderMorphs | №0061 |
| general | №0796 (+ 1 других файлов) |
| generate | №0801 (+ 3 других файлов) |
| genie | №0636 |
| geometryBuilds | №0058 |
| geometryState | №0057 |
| geometryUploads | №0058 |
| get | №0653 (+ 5 других файлов) |
| getAC | №0834 |
| getAllBackgrounds | №1247 |
| getAllRaces | №1247 |
| getAttribute | №1192 |
| getAvailableRecipes | №0665 |
| getBiomassFromCorpse | №0834 |
| getBody | №0811 |
| getBodyState | №0061 |
| getCharismaModifier | №0796 |
| getClass | №0656 |
| getClassSummary | №0864 |
| getCreature | №0623 (+ 12 других файлов) |
| getCurrent | №0637 (+ 2 других файлов) |
| getCurse | №0072 |
| getDC | №0824 |
| getDevourDamage | №0834 |
| getDevourDC | №0834 |
| getDialect | №0823 |
| getDie | №0824 |
| getDiscipline | №0824 |
| getDominantAbilityNames | №0864 |
| getDurability | №0662 (+ 1 других файлов) |
| getElementById | №1067 (+ 37 других файлов) |
| getExhaustion | №0820 (+ 1 других файлов) |
| getFeature | №0656 |
| getInscribedRunes | №0823 |
| getItem | №1069 (+ 20 других файлов) |
| getItemQuality | №0662 |
| getLanguages | №0823 |
| getLarva | №0811 |
| getLibraryManifest | №0066 |
| getLockedRecipes | №0665 |
| getMap | №0065 |
| getMaxCharacteristics | №0864 |
| getMaxPreparedSpellsLimit | №0831 |
| getMetamorphoses | №0072 |
| getMorphWeights | №0061 |
| getMutationSlots | №0834 |
| getNativeStorageStats | №0837 |
| getObject | №0066 |
| getPath | №1103 (+ 1 других файлов) |
| getPeer | №1152 (+ 7 других файлов) |
| getPersuasionModifier | №0796 |
| getProfession | №0665 |
| getProfile | №0665 (+ 1 других файлов) |
| getPursuit | №0824 |
| getRace | №0061 |
| getReactions | №0824 |
| getRenderDescriptor | №0061 |
| getRunesKnown | №0823 |
| getRunicDC | №0823 |
| getSaveBonus | №0822 (+ 13 других файлов) |
| getSaveDC | №0072 |
| getSkillBonus | №0822 |
| getSource | №0793 |
| getSpecialization | №0665 |
| getSpellInfo | №0793 |
| getSpellsKnown | №0072 |
| getSpellSlots | №0072 |
| getState | №0058 (+ 1 других файлов) |
| getStats | №0822 |
| getSubclass | №0643 |
| getSummary | №0779 |
| getSymbiosisTier | №0811 |
| getToken | №0825 |
| getTrader | №0794 |
| getVersion | №1103 (+ 1 других файлов) |
| getView | №1209 |
| getZone | №0066 |
| ghost | №0058 |
| ghostChainSize | №0061 (+ 2 других файлов) |
| ghostOnKill | №0804 |
| ghostOpacity | №0061 (+ 2 других файлов) |
| ghostTerror | №0061 (+ 2 других файлов) |
| ghostWeapon | №0058 (+ 3 других файлов) |
| ghukliak | №0774 (+ 1 других файлов) |
| giant | №0626 |
| Gifted | №0790 |
| giftedStrategist | №0774 |
| GITHUB_REPOSITORY | №1066 |
| GITHUB_RUN_ID | №1066 |
| GITHUB_SERVER_URL | №1066 |
| gl | №0068 (+ 4 других файлов) |
| glancingBlow | №0774 |
| glareParalyzeOnFailBy5 | №0774 |
| glass | №0662 (+ 6 других файлов) |
| glassBatch | №0668 |
| glassblower | №0665 (+ 3 других файлов) |
| glasswork | №0663 (+ 2 других файлов) |
| glaze | №0667 (+ 1 других файлов) |
| glazedVessel | №0667 |
| glb | №1119 |
| glbBBox | №1116 (+ 1 других файлов) |
| glbTriangles | №1116 (+ 2 других файлов) |
| glbVertices | №1107 (+ 4 других файлов) |
| gliderMembraneSize | №0061 (+ 1 других файлов) |
| global | №1216 (+ 5 других файлов) |
| globalThis | №1230 (+ 4 других файлов) |
| gloves | №0057 |
| glow | №0061 |
| gltf | №0064 (+ 2 других файлов) |
| gnoll | №0769 |
| gnome_forest | №0667 |
| gnome_rock | №0667 |
| goblin | №0667 |
| goblinDiscourse | №0774 |
| goblinoid | №0769 |
| goblinStance | №0774 |
| gold | №0827 (+ 3 других файлов) |
| goldBillet | №0668 |
| goldenSlumbers | №0774 |
| goldPer10 | №0660 |
| goldReceived | №0813 |
| goldSpent | №0813 |
| good | №0659 (+ 1 других файлов) |
| goodPct | №1121 |
| gooSize | №0061 (+ 1 других файлов) |
| gp | №0785 (+ 11 других файлов) |
| gPerE | №1723 |
| graftAction | №1068 |
| graftName | №1068 |
| grafts | №0073 (+ 1 других файлов) |
| grain | №0667 (+ 1 других файлов) |
| GRAND_HEXES | №0774 |
| grandHex | №0771 (+ 1 других файлов) |
| grandRevolutionary | №0774 |
| grantActionNextStart | №0813 |
| grantAdvantage | №0774 |
| grantIngredient | №0076 |
| grantsAdvantage | №0822 |
| grantTemporaryHitPoints | №0650 |
| grantUndyingToAlly | №0774 |
| grapple | №0771 |
| grappleBonus | №0774 |
| grappleMastery | №0771 |
| grappleSizePlus | №0774 |
| grappleTarget | №0771 |
| gravity | №0813 |
| gravityResisted | №0813 |
| grayColor | №0061 (+ 1 других файлов) |
| grayPercent | №1087 (+ 1 других файлов) |
| great_weapon_master | №0777 |
| greaterDivineIntervention | №0643 |
| greatOldOne | №0636 |
| Green | №0771 (+ 1 других файлов) |
| greenwood | №0873 |
| greenwood_clearing | №0873 |
| greenwood_heart | №0873 |
| greenwood_stream | №0873 |
| grid | №0056 (+ 1 других файлов) |
| grimPsychometry | №0636 |
| grip | №0058 |
| ground | №0056 |
| group | №0056 |
| groupKey | №0869 (+ 3 других файлов) |
| groups | №0650 (+ 7 других файлов) |
| guaranteed | №0623 (+ 14 других файлов) |
| guardCraft | №0661 |
| guardDC | №0813 |
| Guardian | №0790 |
| guardianRangeFt | №0774 |
| guardians | №1178 |
| guardianTactic | №0774 |
| guardianTactics | №0730 |
| guardRepair | №0661 |
| guest | №0648 |
| guidedStrike | №0643 |
| guild | №0658 |
| gumArabic | №0668 |
| h | №0056 (+ 9 других файлов) |
| H | №0053 (+ 1 других файлов) |
| habitat | №0058 |
| habitats | №0623 (+ 13 других файлов) |
| hadMaterial | №0813 |
| hadozee | №1280 |
| haggle | №0796 |
| hair | №0054 (+ 15 других файлов) |
| hairColor | №0061 (+ 3 других файлов) |
| hairParts | №0054 |
| hairRibbonBudget | №0054 |
| half | №0061 (+ 1 других файлов) |
| half_up | №0056 (+ 1 других файлов) |
| halfCover | №0774 |
| halfCoverWhileGrappling | №0774 |
| halfDamageEffect | №0650 (+ 4 других файлов) |
| halfOnSave | №0774 (+ 2 других файлов) |
| halfProficiencySkills | №0774 |
| halfSpeed | №0774 |
| Hallucination | №0075 |
| halt | №0774 |
| haltRestrains | №0774 |
| halveDamage | №0774 |
| halveNecroticReaction | №0636 |
| hand | №0056 (+ 1 других файлов) |
| handL | №0054 |
| handlebar | №0061 |
| handled | №0063 |
| handOfDread | №0711 |
| handoffNeedsSignaling | №0805 |
| handoffPending | №0805 |
| handR | №0054 |
| hands | №0056 (+ 9 других файлов) |
| hardenedSoul | №0636 |
| hardwood | №0662 (+ 4 других файлов) |
| harmonic | №0823 |
| harmonicAttunement | №0774 |
| harvest | №0623 (+ 19 других файлов) |
| harvestMaterial | №1178 |
| has | №0777 |
| has_joints_and_weights | №1110 |
| has_morph_targets | №1110 |
| hasAsi | №0695 (+ 2 других файлов) |
| hasCharacter | №0860 |
| hasDamage | №0806 (+ 1 других файлов) |
| hasInventoryEffects | №0813 |
| hasPreparation | №0831 |
| hasProfession | №0076 |
| haste | №0073 |
| hasToolProficiency | №0803 |
| hatOfDisguise | №0774 |
| have | №0659 (+ 3 других файлов) |
| haveGold | №0660 |
| haveMaterials | №0660 |
| haymaker | №0711 (+ 1 других файлов) |
| head | №0054 (+ 12 других файлов) |
| HEAD_AXES | №0061 |
| HEAD_FORMS | №0061 |
| HEAD_STYLES | №0061 |
| headAccessories | №0056 |
| headAccessory | №0053 (+ 2 других файлов) |
| headBuilds | №0058 |
| headDefaults | №0061 |
| headers | №0648 (+ 1 других файлов) |
| headFrame | №0056 |
| headless | №1259 (+ 37 других файлов) |
| heal | №0636 (+ 4 других файлов) |
| healAfterNecrotic | №0804 |
| healAfterRest | №0804 |
| healAmount | №1068 |
| healBatch | №0650 |
| healBody | №0864 |
| healCompanion | №0681 |
| healed | №0779 (+ 2 других файлов) |
| healHalfMaxHp | №0774 |
| healHitDie | №0771 |
| healHP | №0774 |
| healing | №0073 (+ 6 других файлов) |
| healingAllowed | №0864 |
| healingAmount | №0813 |
| healingBlocked | №0779 |
| healingBonus | №0774 (+ 1 других файлов) |
| healingBoost | №0808 |
| healingCount | №0813 |
| healingGrantsACBonus | №0774 |
| healingPotion | №0808 |
| healingPotionOnLongRest | №0808 |
| healingSpell | №0813 (+ 2 других файлов) |
| healingSpellsCannotHealSelf | №0804 |
| healMod | №0636 |
| healModifier | №0771 |
| healOnCharnelKill | №0804 |
| healOnKill | №0636 |
| healOrDamage | №0808 |
| healPer5Charnel | №0804 |
| healPool | №0774 |
| healRoll | №1068 |
| healSelf | №0774 |
| healShell | №0779 |
| healthCheck | №0848 |
| healWithHitDice | №0774 |
| heart | №0058 (+ 1 других файлов) |
| hearth | №0062 |
| heartPhylactery | №0774 |
| heavyArmor | №0774 |
| heelstomper | №0774 |
| height | №0058 (+ 50 других файлов) |
| heightened | №0643 |
| heightenedSenses | №0636 |
| hellhound | №0681 |
| hellspeaker | №0774 |
| hellspeakerHoneySweetBlades | №0774 |
| hellspeakerTurncoat | №0774 |
| hemMod | №0636 |
| hemocraftAbilities | №0683 |
| hemocraftDie | №0683 |
| hemocraftRerollOncePerTurn | №0636 |
| Hemorrhage | №0075 |
| hemp | №0668 |
| herb | №0663 (+ 2 других файлов) |
| herbalism | №0667 (+ 1 других файлов) |
| herbalist | №0665 (+ 4 других файлов) |
| herbs | №0820 (+ 1 других файлов) |
| herculean | №0711 (+ 1 других файлов) |
| hero | №1127 |
| heroicCharge | №0774 |
| heroicFocus | №0774 |
| heroicFortitude | №0774 |
| heroicOrderExploit | №0774 |
| heroicRush | №0771 |
| hex | №0863 (+ 2 других файлов) |
| hexArmor | №0774 |
| hexAura | №0774 |
| hexblade | №0636 |
| HEXES | №0774 |
| hexesAtWill | №0771 |
| hexmaster | №0774 |
| hexPhalanx | №0774 |
| hexPlate | №0774 |
| hexSaveDisadvantage | №0774 |
| hexShield | №0774 |
| hi | №0056 |
| hidden | №1294 |
| hide | №0662 (+ 1 других файлов) |
| hideBonusAction | №0774 |
| hideInDimDark | №0774 |
| hideInPlainSight | №0643 |
| Hideous | №0774 |
| high | №0054 (+ 1 других файлов) |
| high_ponytail | №0056 (+ 1 других файлов) |
| highAuthority | №0774 |
| highest | №1113 |
| highestId | №0813 |
| highGround | №0813 |
| highJumpBonusFt | №0774 |
| highlands | №0794 (+ 1 других файлов) |
| highlands_mine | №0873 |
| highlands_quarry | №0873 |
| highlands_ridge | №0873 |
| highlightColor | №0061 (+ 2 других файлов) |
| highlightPercent | №1087 (+ 2 других файлов) |
| hills | №0058 |
| hips | №0058 (+ 5 других файлов) |
| history | №0075 (+ 8 других файлов) |
| historyAdvantage | №0774 |
| historyAdvantageOnSinisterObjectOrPlace | №0636 |
| hit | №0650 (+ 9 других файлов) |
| hitCount | №0650 (+ 3 других файлов) |
| hitDice | №0619 (+ 2 других файлов) |
| hitDiceMax | №1148 |
| hitDiceRemaining | №0073 (+ 2 других файлов) |
| hitDiceRestored | №0798 |
| hitDiceSpent | №0073 (+ 4 других файлов) |
| hitDiceUsed | №0781 (+ 1 других файлов) |
| hitDie | №0619 (+ 53 других файлов) |
| hitInfo | №0068 |
| hitPoints | №0774 (+ 2 других файлов) |
| hitPointsAfter | №0798 (+ 1 других файлов) |
| hits | №0774 |
| hitTest | №0067 (+ 1 других файлов) |
| hitTokenId | №0815 |
| hitZone | №0067 |
| hive | №0058 |
| hm08BBox | №1116 (+ 1 других файлов) |
| hm08Triangles | №1116 (+ 1 других файлов) |
| hm08Vertices | №1116 (+ 3 других файлов) |
| hoard | №0801 |
| hobgoblin | №0667 |
| holdBreathIndefinite | №0774 |
| holdTheLine | №0774 |
| Hollow | №0774 |
| holy | №0073 |
| holyBomb | №0774 |
| holyMagic | №0771 |
| holyNexus | №0643 |
| homebrew | №0655 (+ 1 других файлов) |
| honey | №0668 |
| honorDuel | №0774 |
| hoofColor | №0061 (+ 1 других файлов) |
| hoofSize | №0058 (+ 3 других файлов) |
| hooks | №0072 (+ 19 других файлов) |
| hope | №0771 |
| horde | №0058 (+ 5 других файлов) |
| hordeCount | №0061 |
| horn | №0821 |
| HORN_STYLES | №0061 |
| hornColor | №0061 (+ 1 других файлов) |
| hornRidges | №1096 (+ 1 других файлов) |
| hornSize | №0061 (+ 3 других файлов) |
| hornStyle | №0058 (+ 5 других файлов) |
| hornThickness | №1096 (+ 1 других файлов) |
| horror | №0624 |
| horrorEligible | №0624 |
| horseColor | №0061 (+ 1 других файлов) |
| hosiery | №0057 |
| hosieryDen | №1080 |
| host | №0638 (+ 1 других файлов) |
| hostDestroyed | №0811 |
| hostileAction | №0813 |
| hostileBane | №0774 |
| hostilesWithin5 | №1156 |
| hostIsSeparateStatBlock | №0811 |
| hostSurvived | №0811 |
| houndReactionAttack | №0774 |
| howl | №0636 (+ 1 других файлов) |
| hp | №0781 (+ 77 других файлов) |
| hpBonus | №0774 |
| hpBonusPerLevel | №0819 |
| hpCost | №0798 (+ 1 других файлов) |
| hpCostBySlot | №0798 |
| hpCurrent | №0619 (+ 19 других файлов) |
| hpDamage | №0650 (+ 6 других файлов) |
| hpDamageBySlot | №0798 |
| hpFraction | №0771 |
| hpMax | №0619 (+ 13 других файлов) |
| hpMaxBonus | №0681 |
| hpPer100gp | №0774 |
| hpPercent | №1178 |
| hpTemp | №0619 (+ 6 других файлов) |
| href | №1192 |
| huge | №0811 (+ 1 других файлов) |
| humanoid | №0623 (+ 13 других файлов) |
| humanoidTorch | №0774 |
| hunter | №0681 (+ 2 других файлов) |
| hunterCompanion | №0771 |
| huntersBane | №0636 |
| huntersMark | №0643 (+ 1 других файлов) |
| huntersPrey | №0643 (+ 1 других файлов) |
| hurlThroughHell | №0806 |
| hybrid | №0774 |
| hybridAttackAdvantageVsBranded | №0774 |
| hybridRegeneration | №0774 |
| hybridTransformation | №0636 |
| hybridTransformationMastery | №0636 |
| hyena | №0769 |
| i | №0806 |
| ibex | №0061 |
| icon | №0666 (+ 3 других файлов) |
| iconId | №0783 (+ 1 других файлов) |
| id | №0056 (+ 199 других файлов) |
| idempotent | №0860 |
| identifyEffect | №0774 |
| identityDistortion | №0624 |
| ids | №0053 (+ 2 других файлов) |
| idx | №0068 |
| ifReducedToZero | №0774 |
| ifStolenSpark | №0774 |
| ignitingTouch | №0774 |
| ignoreCover | №0073 (+ 1 других файлов) |
| ignored | №0643 |
| ignoreExtremeTemperature | №0774 |
| ignoreHalfCover | №0774 |
| ignoreHalfDamageOnSave | №0774 |
| ignoreImmunity | №0636 (+ 2 других файлов) |
| ignoreInvisibility | №0813 |
| ignoreOneMutagenSideEffect | №0774 |
| ignoreOpportunityAttacksWhileFlying | №0804 |
| ignorePhysicalResistance | №0813 |
| ignoreRequirements | №1161 |
| ignoreResistance | №0073 (+ 6 других файлов) |
| ignoresImmunity | №0798 |
| ignoreSomaticInDimDark | №0774 |
| ignoresResistance | №0798 (+ 1 других файлов) |
| ignoreVerbalInDimDark | №0774 |
| illuminationAt | №0066 |
| illusion | №0813 (+ 1 других файлов) |
| illusoryDuplicate | №0774 |
| illustriousAdmiral | №0774 |
| imitation | №0073 (+ 1 других файлов) |
| immortality | №0774 |
| immortalityAnchor | №0804 |
| immune | №0636 (+ 5 других файлов) |
| immuneAging | №0774 |
| immuneAll | №0813 |
| immuneCondition | №0813 |
| immuneConditions | №0813 (+ 1 других файлов) |
| immuneFrightened | №0643 (+ 1 других файлов) |
| immuneIfBlindedImmune | №0636 |
| immuneNaturalDeath | №0808 |
| immuneSuppression | №0774 |
| immuneSurprise | №0774 |
| immuneToOwnerBombs | №0073 |
| immuneWhenRampageAtLeast | №0774 |
| immunities | №0650 (+ 13 других файлов) |
| immunity | №0636 (+ 3 других файлов) |
| immunity24hOnSave | №0774 |
| immunityBecomesResistance | №0073 (+ 3 других файлов) |
| immunityChosen | №0774 |
| impact | №0073 |
| impactBomb | №0774 |
| impermeable | №0636 |
| Impermeable | №0774 |
| implemented | №0774 |
| importJSON | №0851 |
| importLocal | №0648 |
| importText | №0855 (+ 1 других файлов) |
| imposeDisadvantage | №0774 |
| imposingPresence | №0774 |
| improvedAt11 | №0798 |
| improvedBombs | №0672 |
| improvedDivineSmite | №0643 |
| improvedFamiliar | №0774 |
| improvedResolve | №0730 |
| improvedThralls | №0804 |
| inactiveAfterInvoke | №0823 |
| inAttackAction | №1159 |
| incendiary | №0073 |
| incendiaryBomb | №0774 |
| inciteViolence | №0774 |
| incoming | №0813 |
| incomingAC | №0636 (+ 1 других файлов) |
| incomingAttackModifiers | №0866 |
| incomingDamage | №1148 |
| incomingDisadvantage | №0813 |
| incomparableIntellect | №0824 |
| index | №0788 (+ 8 других файлов) |
| indexType | №0068 |
| indices | №0053 (+ 8 других файлов) |
| individualCount | №0061 |
| individuals | №0056 |
| indomitable | №0643 (+ 1 других файлов) |
| indomitableMight | №0643 |
| infernal | №0681 |
| infernalConduit | №0693 |
| infernalConduitDice | №0693 |
| infernalMajesty | №0693 |
| inferno | №0058 |
| influenceSlots | №0627 |
| informant | №0774 |
| infuseItem | №0643 |
| ingredient | №0075 (+ 1 других файлов) |
| INGREDIENT_SOURCES | №0076 |
| ingredientCategory | №0076 |
| ingredientId | №0076 |
| ingredientName | №0076 |
| ingredients | №0074 (+ 2 других файлов) |
| inheritsOrigin | №0061 |
| init | №0655 |
| initCreatedCharacter | №0665 |
| initialize | №0816 |
| initiative | №0623 (+ 23 других файлов) |
| initiativeBonus | №0771 (+ 2 других файлов) |
| initiativeDash | №0774 |
| initiativeDisadvantage | №0636 (+ 1 других файлов) |
| initiativeExploit | №0774 |
| initiativeFerocity | №0681 |
| initiativeOrPerception | №0774 |
| initiativeReagentsTo | №0774 |
| initiativeRoll | №1159 |
| initiativeSave | №0774 |
| initiativeTempHp | №0774 |
| initiativeTracker | №0855 (+ 20 других файлов) |
| ink | №0663 (+ 2 других файлов) |
| innatePsionics | №0709 |
| inner | №0053 |
| innerHeight | №1192 |
| innerHTML | №1094 (+ 2 других файлов) |
| innerWidth | №1192 |
| input | №1723 |
| inscribe | №0774 |
| inscribedCount | №0774 |
| inscribedGearProficiency | №0774 |
| inscribedRunes | №0823 |
| inscription | №0823 |
| inscrutableMind | №0774 |
| insectoid | №0769 |
| insidiousImprecation | №0774 |
| insidiousSpell | №0774 |
| insight | №0767 (+ 1 других файлов) |
| insightAbility | №0774 |
| insightBonus | №0774 |
| insightfulOrder | №0774 |
| insightTotal | №0073 (+ 1 других файлов) |
| inspect | №0816 (+ 1 других файлов) |
| inspector | №0065 |
| inspectSource | №0848 |
| inspirationalSpeech | №0774 |
| inspirationOnKill | №0813 |
| inspiring_leader | №0777 |
| inspiringShout | №0774 |
| inspiringWord | №0734 |
| inspiringWordMaxHeal | №0771 (+ 1 других файлов) |
| inspiringWordUses | №0734 |
| install | №0063 |
| installed | №0073 (+ 1 других файлов) |
| installedAtLevel | №0073 |
| instant | №0073 |
| instantDeath | №0650 (+ 1 других файлов) |
| instinctualSuppression | №0774 |
| instruments | №0774 |
| int | №0619 (+ 52 других файлов) |
| intBonus | №0636 |
| intChecksAdvantage | №0636 (+ 1 других файлов) |
| intChecksDisadvantage | №0636 (+ 1 других файлов) |
| intellectDie | №0824 |
| intelligence | №0781 (+ 12 других файлов) |
| intelligenceOrWisdomOrCharisma | №0072 (+ 1 других файлов) |
| intelligentExplosion | №0073 |
| intelligentExplosions | №0672 |
| intensity | №0065 (+ 2 других файлов) |
| inter | №0827 |
| interceptAttack | №0813 |
| interceptHealing | №0813 |
| interceptInitiative | №0813 |
| interceptSave | №0813 |
| interdict | №0866 |
| interdictBoons | №0693 |
| interdiction | №0693 |
| interpolation | №0063 |
| interrupt | №0730 |
| interrupted | №0650 (+ 1 других файлов) |
| interruptedId | №0813 |
| interruptOneAttackOrAbility | №0774 |
| interruptUses | №0730 |
| intimidatingCommand | №0774 |
| intimidation | №0767 (+ 1 других файлов) |
| intimidationAdvantage | №0774 |
| intimidationPersuasionBonus | №0774 |
| intIncrease | №0774 |
| intMaxBonus | №0636 |
| intMaxIncrease | №0774 |
| intToAC | №0804 |
| intuition | №0823 |
| intWisChaSavesDisadvantage | №0636 |
| invadeHost | №0811 |
| inventory | №0781 (+ 21 других файлов) |
| inventoryEntries | №0813 |
| inventoryRef | №0788 (+ 4 других файлов) |
| inverseBindMatrices | №0063 (+ 1 других файлов) |
| investigation | №0767 (+ 1 других файлов) |
| investigationExpertise | №0771 |
| investigator | №0824 |
| invHeaderAC | №1136 |
| invigoratingOrders | №0774 |
| Invisibility | №0075 |
| invisibilityAfterCharnel | №0804 |
| invisible | №0681 (+ 2 других файлов) |
| invocation | №0823 |
| invocationSlots | №0774 |
| invoke | №0656 (+ 1 других файлов) |
| invokeCount | №0774 |
| invokeDebuff | №0774 |
| invokeHell | №0693 |
| invoking | №0823 |
| iokharic | №0774 (+ 1 других файлов) |
| iridescentStrike | №0839 |
| iron | №0663 (+ 2 других файлов) |
| Ironbound | №0790 |
| ironChin | №0711 |
| ironCommand | №0774 |
| ironIngot | №0668 |
| isActive | №0777 |
| isAlly | №1068 |
| isAssassin | №0643 |
| isBomb | №0073 (+ 3 других файлов) |
| isDead | №0641 |
| isEnabled | №0656 (+ 1 других файлов) |
| isExtra | №0641 (+ 9 других файлов) |
| isExtraClass | №0641 |
| isIndependentCreature | №0834 |
| isLarval | №0056 |
| isMagical | №1147 |
| isNewClass | №1723 |
| isObject | №1067 |
| isRaceClassHybrid | №0644 (+ 6 других файлов) |
| isShirt | №0057 |
| isSkirtDress | №0057 |
| isSolid | №0066 |
| issues | №0667 |
| isSwarm | №0056 |
| item | №0057 (+ 18 других файлов) |
| itemId | №0808 |
| items | №0057 (+ 7 других файлов) |
| itemValue | №0662 (+ 1 других файлов) |
| itsAlive | №0774 |
| ix | №0056 |
| j | №0053 |
| jacket | №0057 |
| jackOfAllTrades | №0643 |
| jade | №0827 |
| jar | №0062 |
| jaw | №0056 |
| jawProjection | №0061 |
| jawWidth | №0058 (+ 2 других файлов) |
| jealousy | №0072 |
| jeweler | №0663 (+ 5 других файлов) |
| jinx | №1158 |
| jinxBonusAction | №0774 |
| jinxExtraDamage | №0774 |
| jinxOptions | №0774 |
| joinRoom | №1206 |
| joints | №0053 (+ 4 других файлов) |
| jotun | №0774 (+ 1 других файлов) |
| jotunbrudJuggernaut | №0774 |
| jotunStance | №0774 |
| journal | №0847 |
| json | №0648 (+ 5 других файлов) |
| jumpDistanceMultiplier | №0771 |
| jumpFt | №0774 |
| jumpMultiplier | №0774 |
| jungle | №0058 |
| junk | №0788 (+ 39 других файлов) |
| justDroppedToZero | №1153 |
| K | №1115 |
| keenAwareness | №0824 |
| keep | №1723 |
| keeperOfOrder | №0774 |
| key | №0066 (+ 13 других файлов) |
| KEY | №0066 |
| ki | №1145 (+ 2 других файлов) |
| killInspiration | №0813 |
| kiln | №0665 |
| kind | №0056 (+ 36 других файлов) |
| Kind | №1123 |
| kingdom | №0058 |
| kiPoints | №0698 |
| kitchen | №0062 |
| knighthood | №0774 |
| knockdown | №0771 |
| knockout | №0771 |
| knockoutIfSelfDamageReachesZero | №0774 |
| knockoutRoll | №0774 |
| knockProne | №0774 |
| knockProneSmaller | №0774 |
| knot | №0057 (+ 3 других файлов) |
| known | №0781 (+ 2 других файлов) |
| knownAt | №0693 |
| knownAtLevel | №0072 |
| knownCantrips | №0073 |
| knownClasses | №0831 |
| knownCount | №0774 |
| knownMetamorphoses | №0774 |
| knownReactions | №0075 |
| knowYourEnemy | №0774 |
| kobold | №0056 (+ 1 других файлов) |
| krd | №0790 |
| krynn | №0626 |
| label | №0827 (+ 22 других файлов) |
| laboratory | №0058 |
| labyrinth | №0058 |
| lace | №0057 |
| lairActions | №1241 |
| lairActionState | №0806 |
| lamp | №0062 |
| lampblack | №0668 |
| landscape | №0882 |
| landsStrideRanger | №0643 |
| language | №0774 (+ 1 других файлов) |
| languageChoice | №0774 |
| languages | №0619 (+ 4 других файлов) |
| lantern | №0062 |
| large | №0062 (+ 2 других файлов) |
| larva | №0811 |
| larvaGirth | №0061 (+ 2 других файлов) |
| larvaIsSeparateStatBlock | №0811 |
| larval | №0056 |
| larvaLength | №0061 (+ 2 других файлов) |
| larvalParts | №0056 |
| larvaTendrilSize | №0061 (+ 2 других файлов) |
| larvaToothSize | №0061 (+ 2 других файлов) |
| last | №0056 (+ 1 других файлов) |
| lastAttemptRound | №0800 |
| lastGatheredAt | №0873 |
| lastLifesMemories | №0774 |
| lastRest | №1228 |
| lastRestId | №0816 |
| lastRestock | №0794 (+ 1 других файлов) |
| lastRestoredKey | №0860 |
| lastRoll | №0800 |
| lastRound | №0800 |
| lastRun | №0849 |
| lastStandActive | №0813 |
| lastStandFinished | №0813 |
| lastStandReady | №0813 |
| lastTrump | №0816 |
| lastTrumpAvailable | №0816 |
| lastTrumpUsed | №0816 (+ 1 других файлов) |
| lastX | №0621 (+ 1 других файлов) |
| lastY | №0621 (+ 1 других файлов) |
| latency | №0847 |
| latitude | №0056 |
| laughingGas | №0073 |
| laughingGasBomb | №0774 |
| launch | №0856 |
| lawShield | №0771 |
| lawsShield | №0774 |
| layer | №0057 |
| layered | №0056 (+ 1 других файлов) |
| layers | №0056 |
| layOnHands | №0643 (+ 1 других файлов) |
| leadershipAbility | №0734 (+ 1 других файлов) |
| leadershipBased | №0774 |
| leadershipChoices | №0734 |
| leadershipForCheck | №0774 |
| leadershipForChecks | №0774 |
| leadershipForDeception | №0774 |
| leadershipForHistoryInvestigation | №0774 |
| leadershipForIntimidation | №0774 |
| leadershipForReligion | №0774 |
| leadershipModifier | №0734 |
| leadershipStyles | №0734 |
| leadTheCharge | №0774 |
| leaks | №1274 (+ 2 других файлов) |
| learnAnyCastableSpell | №0774 |
| learnBeastShape | №0774 |
| learnCantrip | №0774 |
| learned | №0873 |
| learnedAt | №0665 |
| learnFromUI | №0665 |
| learning | №0828 |
| learnLanguage | №0774 |
| learnMartialWeapon | №0774 |
| learnProfession | №0665 |
| learnSkill | №0774 |
| learnSpell | №0774 |
| learnTargetStatistic | №0774 |
| learnTool | №0774 |
| leather | №0057 (+ 7 других файлов) |
| leatherSole | №0667 |
| leatherStrapV49 | №0662 |
| leatherwork | №0663 (+ 1 других файлов) |
| leatherworker | №0664 (+ 4 других файлов) |
| leavingReach | №0814 (+ 2 других файлов) |
| lectern | №0062 |
| left | №0058 (+ 2 других файлов) |
| leg | №0056 |
| legacy_expansions | №0623 |
| legendary | №0788 (+ 6 других файлов) |
| legendaryActionCurrent | №0806 |
| legendaryActions | №0800 (+ 1 других файлов) |
| legendaryResistance | №0730 |
| legendaryResistanceCurrent | №0806 |
| legendaryResistances | №0800 (+ 1 других файлов) |
| legendaryTandem | №0774 |
| legLength | №0058 (+ 1 других файлов) |
| legs | №0058 (+ 2 других файлов) |
| length | №0054 (+ 20 других файлов) |
| level | №0775 (+ 83 других файлов) |
| level10 | №0072 |
| level18 | №0072 |
| level2 | №0072 |
| level20 | №0823 |
| level6 | №0072 |
| level9 | №0823 |
| levelData | №0695 |
| leveledUp | №0665 |
| levelName | №0665 |
| levels | №0072 (+ 46 других файлов) |
| LEVELS | №0665 |
| levelsRestored | №0643 |
| library | №0066 (+ 2 других файлов) |
| license | №0066 (+ 11 других файлов) |
| lichdom | №0804 |
| lieDetectionAutoFail | №0774 |
| lighting | №0066 |
| lightIntensity | №1123 |
| lightning | №0073 (+ 3 других файлов) |
| lightningArc | №0804 |
| lightningBomb | №0774 |
| lightRadius | №1123 |
| limb | №0056 |
| limbH | №0056 |
| limbIndices | №0056 |
| limbParts | №0056 |
| limbProfile | №0056 (+ 4 других файлов) |
| limbRecords | №0056 |
| limbState | №0056 |
| limestone | №0668 |
| limit | №0831 |
| limitations | №1254 (+ 1 других файлов) |
| line | №0846 |
| linen | №0057 |
| lineOfSight | №1215 (+ 2 других файлов) |
| lingerie | №0057 |
| link | №0771 |
| linked | №0771 |
| linkedClass | №0653 (+ 1 других файлов) |
| linkedHowl | №0636 |
| lipColor | №0061 (+ 1 других файлов) |
| lipOpacity | №1268 |
| lipVolume | №0061 |
| list | №0055 (+ 7 других файлов) |
| listAllClasses | №0656 |
| listByFamily | №0623 (+ 12 других файлов) |
| listBySource | №0623 (+ 12 других файлов) |
| listClasses | №0656 |
| listEquipment | №0061 |
| listPresets | №0061 |
| listRaces | №0061 |
| listSkins | №0061 |
| listSources | №0076 |
| listSubclasses | №0656 |
| liveBodyAfterReanimation | №0864 |
| liveEpoch | №0860 |
| liveRevision | №0860 |
| living | №0778 |
| livingStatue | №0774 |
| lizard | №0056 |
| lizardfolk | №0667 |
| lo | №0056 |
| load | №0064 (+ 4 других файлов) |
| loaded | №0068 |
| loadFailed | №1271 |
| loading | №0068 (+ 1 других файлов) |
| loadSkin | №0063 |
| local | №0053 (+ 1 других файлов) |
| localBackups | №0648 |
| localId | №0648 |
| localStorage | №1069 (+ 33 других файлов) |
| location | №1109 (+ 3 других файлов) |
| locked | №0069 |
| lockedAt1 | №0664 |
| locks | №0665 |
| log | №0843 |
| login | №0648 |
| logout | №0648 |
| long | №0056 (+ 1 других файлов) |
| longevity | №0073 (+ 1 других файлов) |
| longJumpBonusFt | №0774 |
| longRest | №0073 (+ 1 других файлов) |
| longRestAllHitDice | №0774 |
| longRestClears | №0073 |
| longRestEffects | №0813 |
| longRestExhaustionRecovery | №0774 |
| longRestHealingAllowed | №0864 |
| longRestLimit | №0636 |
| longRestOnRevive | №0774 |
| longRestRedistribute | №0774 |
| longRestTempHp | №0774 |
| longRestUses | №0073 |
| loom | №0062 |
| loot | №0065 (+ 19 других файлов) |
| lootId | №0069 |
| lootModel | №0801 |
| lootModels | №0801 |
| loreRecall | №0774 |
| los | №0651 (+ 1 других файлов) |
| loss | №0847 |
| lossHp | №0636 |
| lost | №0661 |
| Loveless | №0774 |
| low | №0054 |
| lowBlow | №0774 |
| lowest | №0053 (+ 1 других файлов) |
| lowestId | №0813 |
| loxodon | №1288 |
| lucidDreaming | №0774 |
| lucidWaking | №0774 |
| lucky | №0777 |
| lunge | №0774 |
| luxury | №0796 (+ 1 других файлов) |
| lycanthropy | №0072 |
| lyre | №0061 |
| M | №0813 |
| macroConfigSha256 | №1304 |
| macrotargets | №1113 |
| mage_slayer | №0777 |
| mageArmor | №0808 |
| mageArmorAC | №0813 |
| mageBerryCount | №0814 (+ 2 других файлов) |
| mageD20Bonus | №0813 |
| mageDamageType | №0814 (+ 1 других файлов) |
| mageEquipmentChanged | №0813 |
| mageGround | №0814 (+ 1 других файлов) |
| mageInfo | №0813 |
| mageOptions | №0813 |
| mageProgress | №0813 |
| mageSpellId | №0814 (+ 2 других файлов) |
| mageStat | №0814 (+ 1 других файлов) |
| mageTargetIds | №0814 (+ 2 других файлов) |
| mageWilling | №0814 (+ 2 других файлов) |
| magFilter | №0058 (+ 1 других файлов) |
| magic | №0839 (+ 2 других файлов) |
| Magic | №0075 |
| magic_initiate | №0777 |
| magicAdvantage | №0804 |
| magical | №0774 (+ 1 других файлов) |
| magical_beast | №0623 (+ 10 других файлов) |
| magicalAttack | №0636 (+ 4 других файлов) |
| magicalDarkness | №0774 |
| magicalFamiliarAttacks | №0774 |
| magicalSecrets | №0643 |
| magicalTinkering | №0643 |
| magicByAffinity | №0839 |
| magicInteractionSafe | №0774 |
| magicItemAdept | №0643 |
| magicShared | №0839 |
| maintainable | №0774 |
| maintainAction | №0774 |
| majestySplash | №0774 |
| major | №0816 |
| major_00 | №0816 |
| major_01 | №0816 |
| major_02 | №0816 |
| major_03 | №0816 |
| major_04 | №0816 |
| major_05 | №0816 |
| major_06 | №0816 |
| major_07 | №0816 |
| major_08 | №0816 |
| major_09 | №0816 |
| major_10 | №0816 |
| major_11 | №0816 |
| major_12 | №0816 |
| major_13 | №0816 |
| major_14 | №0816 |
| major_15 | №0816 |
| major_16 | №0816 |
| major_17 | №0816 |
| major_18 | №0816 |
| major_19 | №0816 |
| major_20 | №0816 |
| major_21 | №0816 |
| majorCost | №0816 |
| majorCurrent | №0816 |
| majorMax | №0816 |
| majorSpent | №0816 |
| makeWeaponAttack | №0774 |
| male | №0054 (+ 1 других файлов) |
| maleProfile | №0053 |
| malformed | №1119 |
| malformedTargetLines | №1117 (+ 1 других файлов) |
| manifest | №0837 |
| manifestations | №0790 |
| manifested | №0808 |
| manifestUrl | №0837 (+ 2 других файлов) |
| map | №0856 |
| mapId | №0066 |
| mappedDisplacementMax | №1118 |
| mappedDisplacementMean | №1118 |
| mappedDisplacementMedian | №1118 |
| mappedDisplacementP95 | №1118 |
| mappedMaxDisplacement | №1117 |
| mappedMeanDisplacement | №1117 |
| mappedMedianDisplacement | №1117 |
| mappedP95Displacement | №1117 |
| mappedRmsDisplacement | №1117 |
| mappedTargetEntries | №1118 |
| mappedVertices | №1107 |
| mapping | №1256 |
| maps | №0665 (+ 1 других файлов) |
| marble | №0667 |
| marchUntoDestiny | №0798 |
| margin | №1047 |
| mariner | №0774 |
| mark | №0774 |
| marked | №0636 (+ 2 других файлов) |
| markedForDeath | №0774 |
| marketPriceGp | №0794 (+ 1 других файлов) |
| marketReport | №0794 |
| marketSource | №0794 (+ 1 других файлов) |
| marketValue | №0659 (+ 1 других файлов) |
| markPrey | №0774 |
| maroon | №0863 |
| marsh_moss | №0873 |
| marsh_pool | №0873 |
| marsh_reeds | №0873 |
| marshes | №0873 |
| martial_adept | №0777 |
| martialBane | №0774 |
| martialFocus | №0774 |
| masks | №0056 |
| mason | №0665 (+ 3 других файлов) |
| master | №0665 |
| masterOfHell | №0693 |
| masterSpecialization | №0665 |
| masterTactician | №0774 |
| masterwork | №0660 (+ 1 других файлов) |
| masterworkBonus | №0664 |
| mastery | №0075 (+ 2 других файлов) |
| masteryExpiry | №0774 |
| masterySpent | №0774 |
| MAT2 | №0063 (+ 2 других файлов) |
| MAT3 | №0063 (+ 2 других файлов) |
| MAT4 | №0063 (+ 4 других файлов) |
| matched | №0797 |
| material | №0053 (+ 23 других файлов) |
| materialBridge | №0801 |
| materialCost | №0073 |
| materialCostGP | №0808 |
| materialCostPerLevelGP | №0808 |
| materialCount | №0660 |
| materialId | №0659 (+ 11 других файлов) |
| materialKind | №0057 |
| materialOnly | №0788 |
| materials | №0057 (+ 48 других файлов) |
| MATERIALS | №1100 (+ 13 других файлов) |
| materialsCost | №0073 |
| materialsPaid | №1068 |
| materialsUsed | №0660 |
| Math | №1094 (+ 3 других файлов) |
| maturity | №0054 (+ 1 других файлов) |
| max | №0056 (+ 51 других файлов) |
| max_mm | №1081 |
| max_morph_targets | №1110 |
| maxAbility | №0073 (+ 1 других файлов) |
| maxBloodLevels | №0808 |
| maxBuffer | №1300 |
| maxCR | №0774 (+ 1 других файлов) |
| maxDice | №0774 |
| maxDisplacementMeters | №1112 |
| maxDistanceFt | №0774 |
| maxExtraShredPsi | №0774 |
| maxHeal | №0774 |
| maxHitDice | №0774 |
| maxHitPoints | №1212 |
| maxHp | №0073 (+ 68 других файлов) |
| maxHP | №0779 (+ 3 других файлов) |
| maxHpReduction | №0774 |
| maxHpReductionOnNecrotic | №0774 |
| maximize | №0643 (+ 3 других файлов) |
| maximizeAttack | №0813 |
| maximized | №0650 (+ 1 других файлов) |
| maximizeDamageDice | №0643 (+ 1 других файлов) |
| maximizeElementalSpell | №0774 |
| maximizeNextAttack | №0813 |
| maximizeNextRoll | №0813 |
| maximum | №0073 |
| maxIntelligence | №0824 |
| maxLevels | №0643 (+ 1 других файлов) |
| maxObjects | №0774 |
| maxOutside | №1256 |
| maxPoints | №0619 (+ 1 других файлов) |
| maxPotions | №0073 |
| maxScore | №0774 |
| maxSizeFt | №0774 |
| maxSlots | №0839 |
| maxSpellLevel | №0798 |
| maxSpellLevelByLevel | №0798 |
| maxSpend | №0804 |
| maxSpendTempHp | №0774 |
| maxStages | №0073 |
| maxStrands | №0054 |
| maxStrDexCon | №0774 |
| maxTargets | №0774 |
| maxUses | №0649 |
| maxWeightLb | №0774 |
| me | №1128 (+ 9 других файлов) |
| measureStartId | №0621 |
| mechanics | №0672 (+ 16 других файлов) |
| mechanicsPending | №0866 (+ 1 других файлов) |
| mechanicsSource | №0696 (+ 3 других файлов) |
| mechanicsStatus | №0683 |
| medicine | №0665 (+ 3 других файлов) |
| medium | №0054 (+ 2 других файлов) |
| mediumArmorWisInsteadOfDex | №0774 |
| meleeAttack | №0774 (+ 1 других файлов) |
| meleeDamage | №0808 |
| meleeExtraDamage | №0774 |
| meleeOrThrown | №0651 (+ 1 других файлов) |
| meleeSpellAttack | №0774 |
| meleeWeaponAttack | №0774 |
| members | №0769 |
| menacingShout | №0774 |
| mentalAny | №0867 |
| mentalConstruct | №0774 |
| mentalDefense | №0771 |
| mentalSavesDisadvantage | №0774 |
| mentalSource | №0811 |
| mentalStats | №0779 |
| mentalStatsPersist | №0779 |
| mentor | №0734 (+ 2 других файлов) |
| mercenary | №0774 |
| merciless | №0774 |
| mercy | №0798 |
| mesh | №1108 (+ 1 других файлов) |
| meshes | №0058 (+ 5 других файлов) |
| meshWeights | №0064 (+ 1 других файлов) |
| message | №0072 (+ 33 других файлов) |
| messy | №0056 |
| messy_crop | №0056 (+ 1 других файлов) |
| meta | №0846 |
| META_COST | №0643 |
| META_NAMES | №0643 |
| metadata | №0073 (+ 12 других файлов) |
| metal | №0057 (+ 1 других файлов) |
| metalworker | №0665 |
| metamagic | №0643 |
| metamagic_adept | №0777 |
| metamorphosesKnown | №0643 |
| metamorphosesMax | №0643 |
| metamorphosis | №0072 |
| method | №0648 (+ 3 других файлов) |
| metrics | №0058 |
| mettle | №0650 (+ 2 других файлов) |
| mid | №0858 |
| mimic | №0681 |
| min | №0056 (+ 17 других файлов) |
| minAppVersion | №0837 (+ 1 других файлов) |
| minAt11 | №0774 |
| Mind | №0075 |
| mindLeech | №0774 |
| mindRead | №0771 |
| mindReadingImmunity | №0774 |
| mindsightFt | №0774 |
| mindsightTrackingHours | №0774 |
| mindStats | №0811 |
| mindThrust | №0774 |
| miner | №0796 (+ 1 других файлов) |
| mineral | №0821 |
| minFilter | №0058 (+ 1 других файлов) |
| minHeight | №0881 |
| minimal | №0061 |
| minimum | №0073 (+ 3 других файлов) |
| minimumAC | №0774 |
| minimumD20 | №0774 |
| minIndex | №1119 |
| mining | №0820 (+ 1 других файлов) |
| minion | №0774 |
| minionResistance | №0774 |
| minionRollBonus | №0774 |
| minionTypes | №0774 |
| minLevel | №0667 |
| minor | №0816 |
| minotaur | №1288 |
| minPsi | №0774 |
| minStr | №0079 |
| minusD4AllD20 | №0774 |
| minutesSinceDeath | №1068 |
| minWidth | №0881 |
| miracle | №0808 |
| miraculousHealing | №0798 |
| miserableCompany | №0774 |
| misfortune | №0072 (+ 1 других файлов) |
| miss | №0774 |
| missed | №0830 |
| missedUnarmedExtraAttack | №0774 |
| missing | №0659 (+ 5 других файлов) |
| missingTools | №0663 (+ 2 других файлов) |
| missRecoveryMinutes | №0774 |
| missRefund | №0774 |
| missRefunds | №0804 |
| mistAffinity | №0624 |
| mistStep | №0808 |
| mithral | №0663 |
| mitosis | №0834 |
| mix | №0076 |
| mixBonus | №1160 |
| mixedPotions | №0774 |
| mixPotions | №0073 |
| mobility | №0636 |
| Mobility | №0774 |
| mod | №0822 (+ 1 других файлов) |
| mode | №0054 (+ 17 других файлов) |
| model | №0065 (+ 2 других файлов) |
| modelFamily | №0061 |
| modelLoc | №0068 |
| models | №1724 |
| modes | №0823 |
| modifier | №0796 (+ 5 других файлов) |
| modifierAtLevel20 | №0824 |
| modifierIds | №0669 |
| modifiers | №0774 (+ 2 других файлов) |
| modifyStats | №0813 |
| modules | №0848 |
| mohawk | №0056 (+ 1 других файлов) |
| monastery | №0062 |
| monster | №0801 (+ 3 других файлов) |
| monster_acid_slime | №0821 |
| monster_acolyte_cloth | №0821 |
| monster_air_essence | №0821 |
| monster_air_vortex | №0821 |
| monster_ankheg_acid_gland | №0821 |
| monster_ankheg_shell | №0821 |
| monster_bandit_captain_leather_armor | №0821 |
| monster_bandit_hide | №0821 |
| monster_basilisk_eye | №0821 |
| monster_basilisk_gallstone | №0821 |
| monster_basilisk_scale | №0801 |
| monster_bear_fat | №0821 |
| monster_bear_hide | №0821 |
| monster_blink_dog_pelt | №0821 |
| monster_blink_dog_phase_gland | №0821 |
| monster_boar_hide | №0821 |
| monster_boar_tusk | №0821 |
| monster_bugbear_fang | №0821 |
| monster_bugbear_hide | №0821 |
| monster_carrion_chitin | №0821 |
| monster_carrion_crawler_paralytic | №0821 |
| monster_constrictor_hide | №0821 |
| monster_constrictor_venom | №0821 |
| monster_crocodile_hide | №0821 |
| monster_crocodile_teeth | №0821 |
| monster_cultist_cloth | №0821 |
| monster_deer_antler | №0821 |
| monster_deer_hide | №0821 |
| monster_direwolf_fang | №0821 |
| monster_direwolf_hide | №0801 (+ 1 других файлов) |
| monster_displacer_hide | №0821 |
| monster_displacer_tentacle | №0821 |
| monster_dragon_blood | №0801 |
| monster_dragon_bones | №0801 (+ 1 других файлов) |
| monster_dragon_heart | №0821 |
| monster_dragon_scales | №0801 (+ 1 других файлов) |
| monster_earth_core | №0821 |
| monster_earth_essence | №0821 |
| monster_ectoplasm | №0821 |
| monster_ethereal_shard | №0821 |
| monster_fire_ash | №0821 |
| monster_fire_essence | №0821 |
| monster_frog_gland | №0821 |
| monster_frog_skin | №0821 |
| monster_ghost_thread | №0821 |
| monster_ghoul_claw | №0821 |
| monster_ghoul_tissue | №0821 |
| monster_giant_eagle_claw | №0821 |
| monster_giant_eagle_feather | №0821 |
| monster_giant_owl_eye | №0821 |
| monster_giant_owl_feather | №0821 |
| monster_gnoll_hide | №0821 |
| monster_gnoll_tooth | №0821 |
| monster_goblin_hide | №0821 |
| monster_harpy_vocal_membrane | №0821 |
| monster_hyena_fangs | №0821 |
| monster_hyena_hide | №0821 |
| monster_kobold_horn | №0821 |
| monster_kobold_scalehide | №0821 |
| monster_manticore_hide | №0821 |
| monster_manticore_meat | №0821 |
| monster_manticore_spines | №0801 |
| monster_meat | №0821 |
| monster_mimic_skin | №0821 |
| monster_mimic_slime | №0821 |
| monster_orc_hide | №0821 |
| monster_owlbear_claw | №0821 |
| monster_owlbear_feathers | №0801 |
| monster_owlbear_hide | №0801 (+ 1 других файлов) |
| monster_rat_fangs | №0821 |
| monster_rat_hide | №0821 |
| monster_rust_chitin | №0821 |
| monster_rust_gland | №0821 |
| monster_shadow_clot | №0821 |
| monster_slime_membrane | №0821 |
| monster_spectral_dust | №0821 |
| monster_spider_chitin | №0801 |
| monster_spider_silk | №0801 (+ 1 других файлов) |
| monster_spider_venom | №0821 |
| monster_troll_blood | №0801 (+ 1 других файлов) |
| monster_troll_claw | №0821 |
| monster_troll_hide | №0801 (+ 1 других файлов) |
| monster_veteran_leather_armor | №0821 |
| monster_water_core | №0821 |
| monster_water_essence | №0821 |
| monster_wight_bone | №0821 |
| monster_wight_essence | №0821 |
| monster_wolf_hide | №0801 (+ 1 других файлов) |
| monsterCount | №0800 |
| monsterCR | №0803 |
| monsterId | №0778 (+ 5 других файлов) |
| monsterName | №0806 |
| monsterparts | №0796 (+ 1 других файлов) |
| MONSTERS | №0650 |
| monstrosity | №0623 (+ 13 других файлов) |
| monstrousGrafts | №0073 |
| monstrousMenagerie | №0774 |
| monstrousMinion | №0771 (+ 1 других файлов) |
| moonEffects | №0808 |
| morph_names | №1110 |
| morph_primitives | №1110 |
| morphAccessor | №1107 |
| morphBufferView | №1107 |
| morphChannels | №0063 (+ 1 других файлов) |
| morphNames | №0064 (+ 2 других файлов) |
| morphs | №0061 (+ 3 других файлов) |
| morphSet | №0061 |
| morphTargets | №0064 (+ 1 других файлов) |
| morphWeights | №0061 |
| mount | №0804 |
| mountaineer | №0774 |
| mountainsEndurance | №0774 |
| mountCantripSwap | №0804 |
| mounted | №0808 |
| mountRollBonus | №0774 |
| mountSpeed | №0804 |
| moustache | №0058 (+ 3 других файлов) |
| mouth | №0056 |
| mouthWidth | №0061 (+ 1 других файлов) |
| moveAlliesHalfSpeed | №0774 |
| moveAndAttack | №0774 |
| moveCostFt | №0073 |
| moved | №0858 |
| movedFt | №0813 |
| moveFt | №0681 (+ 4 других файлов) |
| moveHalfSpeed | №0636 |
| movement | №0073 (+ 19 других файлов) |
| movementAllowance | №0813 |
| movementUsed | №0073 (+ 14 других файлов) |
| movementWithoutOpportunityAttacks | №0808 |
| moveReward | №0813 |
| moveStraightFt | №0774 |
| moveThralls | №0804 |
| moveThroughCreatures | №0774 |
| moveThroughProneCreatures | №0774 |
| moveTo | №0806 (+ 1 других файлов) |
| moveToward | №0651 |
| moving | №0056 |
| moxie | №0711 (+ 2 других файлов) |
| moxieFraction | №0771 |
| moxieFueledFists | №0711 |
| moxieOnFail | №0774 |
| moxieRefunded | №0774 |
| moxieRestored | №0774 |
| moxieSpent | №0774 |
| msg | №0844 (+ 1 других файлов) |
| muddledMind | №0636 |
| mufflingImprecation | №0774 |
| mult | №0662 (+ 1 других файлов) |
| multiAttackAction | №0650 (+ 1 других файлов) |
| multiclass | №0073 (+ 7 других файлов) |
| multiclassAllowed | №0641 (+ 7 других файлов) |
| multiclassProficiencies | №0672 (+ 6 других файлов) |
| multiclassRequirement | №0072 (+ 18 других файлов) |
| multiplier | №0800 |
| mummification | №0774 |
| mummyLord | №0774 |
| mummyRot | №0774 |
| muscle | №0058 (+ 5 других файлов) |
| mutagen | №0636 (+ 2 других файлов) |
| mutagenAbility | №0073 |
| mutagencraft | №0636 |
| mutagenMaximum | №0073 |
| mutagenNoDownside | №0073 |
| mutagens | №0636 (+ 1 других файлов) |
| mutations | №0811 (+ 2 других файлов) |
| mutationSlots | №0811 (+ 1 других файлов) |
| muzzle | №0056 |
| muzzleHeight | №0061 (+ 7 других файлов) |
| muzzleLength | №0061 (+ 9 других файлов) |
| muzzleWidth | №0061 (+ 7 других файлов) |
| myconid | №1280 |
| mysteries | №0702 (+ 1 других файлов) |
| mystery | №0808 |
| mysticArcanum | №0643 |
| mysticEmpowerment | №0828 |
| mysticFrenzy | №0636 |
| mythicForms | №0828 |
| mythicVoice | №0774 |
| n | №0053 (+ 4 других файлов) |
| name | №0055 (+ 236 других файлов) |
| NAME | №0661 |
| nameRu | №0619 (+ 8 других файлов) |
| nameRus | №1044 |
| names | №1158 (+ 1 других файлов) |
| narrow | №0056 (+ 2 других файлов) |
| native | №0805 (+ 1 других файлов) |
| nativeHeadH | №0056 |
| natural | №0061 |
| natural20 | №0806 (+ 1 других файлов) |
| naturalArmor | №0828 |
| naturalAttacks | №0811 (+ 1 других файлов) |
| naturalExplorer | №0643 |
| naturalist | №0824 |
| naturalRecovery | №0811 |
| naturalWeapons | №0828 |
| nature | №0767 (+ 2 других файлов) |
| Nausea | №0075 |
| navigation | №0771 |
| navigator | №1099 (+ 9 других файлов) |
| navigatorCrew | №0774 |
| navy | №0863 |
| nearAllyId | №0813 (+ 1 других файлов) |
| neck | №0056 (+ 2 других файлов) |
| neckDepth | №1078 (+ 2 других файлов) |
| neckline | №1078 (+ 1 других файлов) |
| necrodancer | №0804 |
| necromancyDamageBonusPerCharnel | №0804 |
| necromancyUnleashed | №0804 |
| necromanticSpurs | №0774 |
| necromanticSustainment | №0774 |
| necrotic | №0771 (+ 1 других файлов) |
| Necrotic | №0075 |
| necroticAffinity | №0808 |
| necroticBone | №0821 |
| necroticDamage | №0771 (+ 2 других файлов) |
| necroticEssence | №0821 |
| necroticIgnoreImmunity | №0804 |
| necroticIgnoreResistance | №0804 |
| necroticReagent | №0821 |
| need | №0667 |
| needsChoice | №0073 |
| needsConfirmation | №0073 |
| needsDonor | №0073 |
| needsMaterials | №0073 |
| needsRoll | №0073 |
| needsSubclassChoice | №0695 |
| needsTarget | №0073 |
| needsTime | №0073 |
| negatingAnathema | №0774 |
| negative | №1069 (+ 3 других файлов) |
| negotiated | №0796 |
| negotiatedPrice | №0796 |
| negotiatedQuote | №0796 |
| negotiationModifier | №0796 |
| network | №0843 (+ 2 других файлов) |
| neutral | №0060 |
| newDraft | №0856 |
| newJinxOptions | №0774 |
| newTraderIds | №0795 |
| newValue | №0806 |
| next | №0053 (+ 2 других файлов) |
| nextAttackAdvantage | №0636 (+ 1 других файлов) |
| nextAttackBonus | №0774 |
| nextAttackExtraDice | №0073 |
| nextBombOnly | №0073 |
| nextConcentrationSaveDisadvantage | №0636 |
| nextDamageDice | №0774 |
| nextHitCrit | №0774 |
| nextRiteHitExtraDie | №0636 |
| nextRollMaximum | №0813 |
| nextSaveAdvantage | №0774 |
| nextSpellOrWeaponDamageDisadvantage | №0774 |
| nextTick | №0073 (+ 1 других файлов) |
| nextWisSaveDisadvantage | №0636 |
| night | №0068 |
| nighteye | №0636 |
| Nighteye | №0774 |
| nightforest | №0058 |
| nightmareMount | №0804 |
| nightTerrors | №0774 |
| nightTerrorsWhileAsleep | №0774 |
| noAction | №0774 |
| noActions | №0813 |
| noAging | №0774 |
| noAttacks | №0813 (+ 1 других файлов) |
| Noble | №0790 |
| noConcentrationCheck | №0798 |
| noCoverOrInvisibility | №0636 |
| noDamage | №0073 |
| noDash | №0774 |
| node | №0063 (+ 3 других файлов) |
| nodeId | №0873 |
| nodeIntegration | №0881 |
| nodes | №0873 (+ 7 других файлов) |
| noDisadvantage | №0774 |
| noDisengage | №0813 |
| noFallDamage | №0774 |
| noFoodOrDrink | №0774 |
| noForcedMovement | №0813 (+ 1 других файлов) |
| noFreeWill | №0864 |
| noHealing | №0774 |
| noHealingFromOwnSpells | №0798 |
| noHealingUntilStartNextTurn | №0774 |
| noHelp | №0813 |
| noHide | №0057 (+ 1 других файлов) |
| noMainAction | №0813 (+ 1 других файлов) |
| noMaintainAction | №0774 |
| noMovement | №0813 |
| nonAttackAccursedDamageBonus | №0774 |
| nonCombat | №0652 |
| none | №0061 (+ 1 других файлов) |
| nonlethal | №0073 |
| nonmagicalDamageReduction | №0774 |
| nonManifold | №1083 |
| nonZeroMappedGlbVertexPct | №1117 |
| nonZeroMappedGlbVertices | №1117 |
| nonZeroPct | №1107 |
| nonZeroTargetEntries | №1118 |
| nonZeroVertices | №1107 |
| noOldAgeDeath | №0808 |
| noOpportunity | №0771 |
| noOpportunityAttacks | №0073 (+ 3 других файлов) |
| noReaction | №0774 (+ 1 других файлов) |
| noReactions | №0636 (+ 4 других файлов) |
| noReduction | №0774 |
| noRest | №0774 |
| normal | №0822 (+ 1 других файлов) |
| normalForm | №0828 |
| normalize | №0054 (+ 6 других файлов) |
| normalizeCharacter | №0779 (+ 3 других файлов) |
| normalizeClassName | №0831 |
| normalizeConditionName | №0822 (+ 2 других файлов) |
| normalizeHead | №0061 |
| normalPaceStealth | №0774 |
| normals | №0056 (+ 2 других файлов) |
| noseLength | №0061 |
| noseWidth | №0061 (+ 1 других файлов) |
| noShield | №0774 |
| noSpells | №0813 |
| noStandardHealing | №0834 |
| noSurprise | №0774 |
| notation | №0824 |
| note | №0650 (+ 8 других файлов) |
| noteAffect | №0813 |
| noteD20Roll | №0813 |
| noteMove | №0813 |
| notes | №0619 (+ 29 других файлов) |
| noTransfer | №0813 |
| noUnderwaterDrawbacks | №0774 |
| nourishing | №0774 |
| noVerbal | №0813 (+ 1 других файлов) |
| npcs | №1209 |
| nTexture | №0071 |
| nuclearBomb | №0672 |
| nullification | №0774 |
| number | №0816 |
| numerator | №0816 |
| nylon | №0057 |
| oak | №0667 (+ 1 других файлов) |
| objectId | №0774 (+ 2 других файлов) |
| objectIds | №1158 |
| objectMeleeDamageMultiplier | №0774 |
| objects | №0066 (+ 1 других файлов) |
| obscured | №0681 |
| observe | №0636 |
| obstacles | №1124 (+ 10 других файлов) |
| obstinateAnathema | №0774 |
| occultFetish | №0808 |
| occultRitesKnown | №0702 |
| ocean | №0058 |
| odds | №0816 |
| offer | №0816 |
| offeredCp | №0796 (+ 1 других файлов) |
| official | №0655 (+ 1 других файлов) |
| official_expansion | №0623 |
| offline | №0847 (+ 1 других файлов) |
| oil | №0073 |
| oilBomb | №0774 |
| oilCoated | №0073 |
| ok | №0827 (+ 79 других файлов) |
| old | №0806 |
| oldFormat | №1136 |
| oldLevel | №0665 |
| oldOneTwo | №0774 |
| omnipotence | №0774 (+ 1 других файлов) |
| omnipresence | №0774 (+ 1 других файлов) |
| omniscience | №0774 (+ 1 других файлов) |
| onApply | №0838 |
| onAttackResult | №0072 (+ 8 других файлов) |
| once | №0077 (+ 6 других файлов) |
| oncePerLongRest | №0798 |
| oncePerTurn | №0073 (+ 1 других файлов) |
| onChange | №0648 |
| onclick | №1216 |
| onCondition | №0636 (+ 5 других файлов) |
| onDamage | №0636 (+ 4 других файлов) |
| onDefeat | №0778 |
| onePerShortRest | №0804 |
| oneThirdCaster | №0774 |
| onFail | №0769 (+ 1 других файлов) |
| ongoingDamage | №0681 |
| onHitSave | №0813 |
| onLine | №1099 (+ 1 других файлов) |
| onlyDeadBodies | №0864 |
| onlyMisfortuneFeatures | №0774 |
| onNatural1 | №0073 |
| onPreyDeath | №0774 |
| onProgress | №0837 |
| onRetry | №0838 |
| onSave | №0774 |
| onSavingThrow | №0643 (+ 1 других файлов) |
| onTurnEnd | №0072 (+ 10 других файлов) |
| ooze | №0769 |
| opacity | №0056 (+ 1 других файлов) |
| open | №0055 (+ 27 других файлов) |
| OPENAI_API_KEY | №1065 |
| openBoard | №0856 |
| openDebug | №0843 |
| openHandTechnique | №0806 |
| openInfo | №0661 |
| openLog | №0843 |
| openMainMenuUpdate | №0837 |
| openMind | №0774 |
| openReplay | №0842 |
| openTrade | №0796 |
| operationId | №0813 (+ 20 других файлов) |
| opportunityAdvantage | №0813 |
| opportunityAttack | №0813 (+ 3 других файлов) |
| opportunityAttackBecomesGrapple | №0774 |
| optics | №0665 |
| optional | №0790 |
| optionalSlotDice | №0774 |
| options | №0057 (+ 7 других файлов) |
| optionsFor | №0057 |
| opts | №0806 (+ 1 других файлов) |
| oracle | №0636 (+ 2 других файлов) |
| Oracle | №0702 |
| orange | №0827 |
| orcish_fury | №0777 |
| orcsteppe | №0058 |
| order | №0636 (+ 1 других файлов) |
| orders | №0683 (+ 1 других файлов) |
| organ | №0821 |
| organic | №0058 |
| origin | №0068 |
| original | №0073 |
| originalStats | №0811 (+ 1 других файлов) |
| originRaceId | №0061 (+ 1 других файлов) |
| ostorianDiscourse | №0774 |
| other | №1076 (+ 1 других файлов) |
| otherStyleEffectsPending | №0867 |
| otherworldlyPatron | №0636 |
| outcome | №0667 (+ 1 других файлов) |
| outcomeLabel | №0667 |
| outer | №0053 (+ 2 других файлов) |
| outlandsEligible | №0627 |
| outOfOrder | №0847 |
| output | №0662 (+ 7 других файлов) |
| outputBytes | №1107 |
| oval | №0058 (+ 1 других файлов) |
| oven | №0062 |
| overCorset | №0057 |
| overCuirass | №0057 |
| overflow | №1267 |
| overheat | №0774 |
| overheatIgnoresImmunity | №0774 |
| overlay | №0838 |
| overlord | №0804 |
| overpayCp | №0797 |
| owl | №0056 |
| owlbear | №0681 |
| own | №1126 |
| ownedCondition | №0813 |
| owner | №1069 |
| owner_id | №1099 |
| ownerId | №0073 (+ 9 других файлов) |
| ownerPeerId | №1152 (+ 7 других файлов) |
| ownerTokenId | №0073 (+ 4 других файлов) |
| ownerTurns | №0636 |
| ownTurnId | №0816 (+ 1 других файлов) |
| ox | №0067 |
| oy | №0067 |
| p | №0053 (+ 2 других файлов) |
| p_deleted | №0648 |
| p_expected_revision | №0648 |
| p_id | №0648 |
| p_operation_id | №0648 |
| p_profile | №0648 |
| p_schema_version | №0648 |
| p1 | №1215 (+ 3 других файлов) |
| p2 | №1215 |
| pa | №1152 |
| pack | №0058 (+ 7 других файлов) |
| PACK_ID | №0073 (+ 2 других файлов) |
| packId | №0656 |
| packleader | №0774 |
| Packleader | №0790 |
| packs | №0771 (+ 2 других файлов) |
| packTactics | №0774 |
| pact | №0822 (+ 1 других файлов) |
| pactBoon | №0643 |
| pactLevel | №0793 |
| pactMagic | №0636 (+ 3 других файлов) |
| pactMagicData | №0806 (+ 4 других файлов) |
| padding | №0666 |
| paid_api_authorized | №1065 |
| painkiller | №0774 |
| painkillerGrandStrategist | №0774 |
| painkillerPunishment | №0774 |
| paint | №0073 |
| paintBomb | №0774 |
| paintCreatures | №0073 |
| painter | №0665 (+ 3 других файлов) |
| paintV38 | №0667 |
| paladin | №0793 (+ 1 других файлов) |
| paleMaster | №0804 |
| panelScroll | №1267 |
| panelUV | №0057 |
| panX | №0065 (+ 2 других файлов) |
| panY | №0065 (+ 2 других файлов) |
| paper | №0663 (+ 2 других файлов) |
| Paragon | №0790 |
| paragonOfChivalry | №0774 |
| paralyticReagent | №0821 |
| paralyzed | №0774 (+ 1 других файлов) |
| parasiteMind | №0811 |
| parchment | №0663 (+ 2 других файлов) |
| parent | №0815 |
| parentContainerId | №0784 |
| parentId | №0834 |
| parentNode | №1216 |
| parentTriangles | №1273 (+ 3 других файлов) |
| parley | №0774 |
| parleyFree | №0774 |
| parseDice | №0822 (+ 5 других файлов) |
| part | №0060 |
| partial | №0054 |
| participantTurnStart | №0813 |
| partnerId | №0813 |
| parts | №0053 (+ 13 других файлов) |
| pass | №0849 |
| passesThroughCreatures | №0774 |
| passive | №0058 (+ 9 других файлов) |
| password | №0648 |
| patch | №0660 (+ 1 других файлов) |
| path | №0062 (+ 32 других файлов) |
| pathCost | №1229 (+ 1 других файлов) |
| pathFt | №0806 |
| patientDefense | №0643 |
| patron | №0636 (+ 5 других файлов) |
| patrons | №0636 |
| patternScale | №0057 |
| pauldrons | №0057 |
| pawPadColor | №0061 |
| payHitPointCost | №0650 |
| payload | №0806 (+ 16 других файлов) |
| payOwnHPForCharnel | №0804 |
| PB | №0779 (+ 3 других файлов) |
| pc | №0805 |
| pd | №1152 |
| peaceAura | №0813 (+ 2 других файлов) |
| peaceBlocked | №0650 (+ 1 других файлов) |
| peakPhysicalCondition | №0711 (+ 1 других файлов) |
| pectorals | №0058 (+ 1 других файлов) |
| peer | №0806 |
| peerId | №1206 |
| peerName | №0805 |
| penaltyPerFatigue | №0774 |
| pending | №0073 (+ 3 других файлов) |
| pendingAnswer | №0805 |
| pendingAttack | №0650 (+ 1 других файлов) |
| pendingDamage | №0636 (+ 3 других файлов) |
| pendingInitiativeBonus | №0813 |
| pendingOffer | №0805 |
| pendingOnHit | №0073 (+ 3 других файлов) |
| pendingReaction | №0806 |
| pendingReactions | №0806 (+ 1 других файлов) |
| pendingSelection | №0643 |
| penetratesResistance | №0774 |
| penetratingDice | №0774 |
| pentacles | №0813 (+ 1 других файлов) |
| pentacles_14 | №0813 |
| percent | №0816 |
| perception | №0767 (+ 1 других файлов) |
| Perception | №0075 |
| perceptionReagent | №0821 |
| percipient | №0636 |
| Percipient | №0774 |
| perfectSelf | №0643 |
| performance | №0767 (+ 3 других файлов) |
| perilousGambit | №0774 |
| permanentCurse | №0774 |
| persistent | №0774 |
| persistentRage | №0643 |
| persona | №0774 |
| persuasion | №0767 (+ 2 других файлов) |
| persuasionDeceptionIntimidationFloor | №0774 |
| perTargetLongRest | №0774 |
| perTurn | №0804 |
| petrification | №0774 |
| Petrification | №0075 |
| petrificationReagent | №0821 |
| pharaoh | №0804 |
| phase | №0056 (+ 3 других файлов) |
| phaseFiber | №0821 |
| phaseReagent | №0821 |
| phaseRift | №0774 |
| phaseRiftNoStraightLine | №0774 |
| phaseThrough | №0774 |
| phaseWeaponAttack | №0774 |
| philosophersStone | №0672 |
| physicalAndroidQA | №1112 |
| physicalResistance | №0834 |
| physicalStats | №0779 (+ 1 других файлов) |
| physicalStatsFromShell | №0779 |
| physician | №0824 |
| pickFloor | №0068 |
| pickLevel | №0072 (+ 17 других файлов) |
| piercing | №0866 |
| pigment | №0667 |
| pineResin | №0668 |
| pissAndVinegar | №0711 |
| pitch | №0065 (+ 1 других файлов) |
| pixie | №0056 (+ 1 других файлов) |
| pl | №0068 |
| placeToken | №0856 |
| plague | №0834 |
| plagueLord | №0804 |
| plain | №0658 |
| plan | №0806 (+ 1 других файлов) |
| planar | №0627 |
| planarInfluence | №0627 |
| planes | №0627 |
| planescape | №0627 |
| planned | №0655 |
| planPreview | №0621 |
| plant | №0623 (+ 11 других файлов) |
| plasmoid | №1280 |
| plateColor | №0061 (+ 1 других файлов) |
| plates | №0061 |
| plateSize | №0061 (+ 2 других файлов) |
| play | №0813 (+ 1 других файлов) |
| playerAction | №1216 |
| playfair | №0827 |
| playing | №0077 (+ 1 других файлов) |
| playingTheOdds | №0774 |
| pleats | №0057 (+ 3 других файлов) |
| plusDex | №0808 |
| pockets | №0623 (+ 18 других файлов) |
| pocketSand | №0774 |
| point | №0056 (+ 2 других файлов) |
| pointerId | №1069 |
| points | №0056 (+ 1 других файлов) |
| poison | №0643 (+ 3 других файлов) |
| poisonBypass | №0808 |
| poisoned | №0804 (+ 1 других файлов) |
| poisoner | №0667 (+ 3 других файлов) |
| poisonIgnoresImmunity | №0804 |
| poisonIgnoresResistance | №0804 |
| poisonOnCharnel | №0804 |
| poisonResistance | №0771 |
| polearm_master | №0777 |
| polyglot | №0774 (+ 1 других файлов) |
| ponytail | №0056 (+ 1 других файлов) |
| pool | №0804 (+ 1 других файлов) |
| poor | №0660 (+ 1 других файлов) |
| porcelainClay | №0668 |
| portalAffinity | №0627 |
| portalRoute | №0627 |
| pos | №0068 |
| pose | №0061 |
| poseBuilds | №0058 |
| poses | №0060 |
| position | №0056 (+ 10 других файлов) |
| POSITION | №0059 (+ 6 других файлов) |
| positions | №0053 (+ 11 других файлов) |
| positive | №1069 (+ 3 других файлов) |
| Possessed | №0774 |
| possession | №0072 (+ 1 других файлов) |
| possessLiving | №0779 |
| postMessage | №0882 |
| pot | №0062 |
| potash | №0668 |
| potency | №0075 (+ 1 других файлов) |
| Potency | №0774 |
| potentObservation | №0824 |
| potion | №0073 (+ 4 других файлов) |
| potionBrewing | №0672 |
| potionCap | №0804 |
| potionColor | №0073 (+ 1 других файлов) |
| potionMixologist | №0672 |
| potions | №0073 |
| potter | №0665 (+ 3 других файлов) |
| pottery | №0663 (+ 1 других файлов) |
| power | №0056 (+ 2 других файлов) |
| powerOfTwo | №0058 |
| powerPreference | №0068 |
| pp | №0785 (+ 6 других файлов) |
| pPerG | №1723 |
| precedence | №0849 |
| precision | №0636 |
| Precision | №0774 |
| precisionStrike | №0774 |
| precognition | №0774 |
| predatoryInstinct | №0774 |
| predictiveDodge | №0774 |
| predictorCardId | №1144 (+ 1 других файлов) |
| predictorMajor | №1145 |
| predictorState | №1099 |
| preload | №0881 |
| prepare | №0060 (+ 1 других файлов) |
| prepared | №0073 (+ 4 других файлов) |
| preparedActions | №0806 (+ 1 других файлов) |
| preparedByLevel | №0798 (+ 1 других файлов) |
| preparedClasses | №0831 |
| preparedLastStand | №0813 |
| preparedLimit | №0831 |
| preparedReactionAttack | №0643 |
| preparedSpells | №0798 (+ 1 других файлов) |
| prepareForLibrary | №0066 |
| prepareInspiration | №0813 |
| prerequisite | №0683 (+ 6 других файлов) |
| present | №0828 (+ 1 других файлов) |
| preserved | №0774 |
| preserveLife | №0643 (+ 1 других файлов) |
| preset | №0058 (+ 5 других файлов) |
| presetId | №0061 (+ 1 других файлов) |
| presets | №0061 (+ 1 других файлов) |
| press | №0062 |
| preSubclassBase | №0816 |
| pretendToBeVisual | №1122 |
| preventDropToZero | №0774 |
| preventExhaustion | №0774 |
| preventOpportunity | №0813 |
| preventsOpportunity | №0813 |
| preventZero | №0774 |
| preventZeroHp | №0681 |
| preview | №0066 |
| previewDisassembly | №0659 |
| previous | №0778 (+ 1 других файлов) |
| previousHp | №0650 |
| preyDamage | №0774 |
| price | №0623 (+ 20 других файлов) |
| priceImproved | №1164 |
| priceModifier | №0796 |
| primalChampion | №0643 |
| primalResilience | №0828 |
| primary | №0827 |
| primaryAbilities | №0073 (+ 4 других файлов) |
| primaryResourceId | №0076 |
| primaryStat | №0072 (+ 31 других файлов) |
| primeBomb | №0672 |
| primeval | №0774 |
| primevalForm | №0828 |
| primevalResurgence | №0828 |
| primitives | №1108 (+ 1 других файлов) |
| primordial | №0681 |
| priority | №0643 (+ 2 других файлов) |
| prismatic | №0073 |
| prismaticBomb | №0774 |
| prismaticIndex | №1068 |
| pristine | №0659 (+ 1 других файлов) |
| privileges | №0881 |
| processedEach | №0658 |
| processedId | №0821 |
| processedRuns | №0658 |
| processedUnit | №0821 |
| processing | №0667 (+ 1 других файлов) |
| prodigy | №0667 |
| profBonus | №0619 (+ 20 других файлов) |
| profession | №0665 (+ 4 других файлов) |
| professionBonus | №1160 |
| professionIds | №0665 |
| professionProfile | №0076 |
| professionRequirements | №0665 |
| PROFESSIONS | №0665 |
| proficiencies | №0641 (+ 11 других файлов) |
| proficiency | №0741 (+ 5 других файлов) |
| proficiencyBonus | №0653 (+ 13 других файлов) |
| proficiencyIfUntrained | №0813 |
| proficiencyRank | №1142 |
| proficiencyType | №0079 |
| proficient | №0642 (+ 6 других файлов) |
| profile | №0056 (+ 15 других файлов) |
| profileResources | №0806 |
| prog | №0068 |
| progression | №0644 (+ 15 других файлов) |
| progressionSource | №0696 (+ 3 других файлов) |
| project | №1254 (+ 1 других файлов) |
| projectedWeaponBonus | №0774 |
| projectile | №0650 (+ 3 других файлов) |
| projection | №0774 (+ 3 других файлов) |
| projectItem | №0774 |
| projectMobility | №0636 |
| projectPoint | №0068 |
| projectScreen | №0068 |
| projectUrl | №0646 (+ 4 других файлов) |
| projectVariant | №0830 |
| prolificAffliction | №0774 |
| prompt | №1148 (+ 8 других файлов) |
| prone | №0774 (+ 1 других файлов) |
| proneOnHit | №0774 |
| proneOnSuccess | №0774 |
| pronounced | №0054 |
| prop | №0073 |
| properties | №0074 (+ 10 других файлов) |
| propertiesHidden | №0076 |
| property | №0075 |
| proportions | №1113 |
| props | №0669 |
| protectAlly | №0681 |
| protected | №0813 |
| protection | №0771 |
| protector | №0681 |
| protege | №0774 |
| protegeAdvantageAfterExploit | №0774 |
| protegeUpgrade | №0774 |
| provokesNoOpportunity | №0771 |
| provokesOpportunityAttacks | №0813 |
| pseudopodSize | №0061 (+ 1 других файлов) |
| psi | №1156 |
| psiLimit | №0709 (+ 1 других файлов) |
| psiLimitFormula | №0709 |
| Psion | №0790 |
| psionicPredator | №0774 |
| psionSource | №0790 |
| psiPoints | №0709 (+ 2 других файлов) |
| psiPointsMax | №0771 (+ 1 других файлов) |
| psiPointsRest | №0709 |
| psychic | №0866 |
| psychicDamage | №0774 |
| psychicDamagePerTurn | №0774 |
| psychokinetics | №0774 |
| pubic | №0054 (+ 1 других файлов) |
| publishableKey | №0646 (+ 4 других файлов) |
| pulpit | №0062 |
| pupilOpacity | №0061 (+ 2 других файлов) |
| pupilShape | №0058 (+ 2 других файлов) |
| purity | №0075 |
| purple | №0827 (+ 1 других файлов) |
| pursuit | №0824 |
| pushFt | №0073 (+ 2 других файлов) |
| pushProneSaveBonus | №0774 |
| pushRadiusFt | №0774 |
| q | №1118 |
| qty | №0794 (+ 2 других файлов) |
| quality | №0054 (+ 12 других файлов) |
| QUALITY | №0662 |
| QUALITY_GRADES | №0659 |
| QUALITY_TIERS | №0660 |
| qualityBand | №0659 |
| qualityBonus | №0076 (+ 5 других файлов) |
| qualityEffects | №0660 |
| qualityKey | №0659 (+ 1 других файлов) |
| qualityLabel | №0659 |
| qualityMultiplier | №0794 (+ 1 других файлов) |
| qualityOf | №0660 |
| qualityReport | №0659 |
| quantity | №0663 (+ 1 других файлов) |
| quartz | №0668 |
| quartzForm | №0774 |
| query | №0788 |
| querySelector | №1180 |
| querySelectorAll | №1101 (+ 4 других файлов) |
| queued | №0813 |
| queueLastStandAttacks | №0813 |
| quick | №1238 |
| quickBrewing | №0073 (+ 1 других файлов) |
| quickened | №0643 |
| quickPin | №0774 |
| quiet | №0073 |
| quietBomb | №0774 |
| quiveringPalm | №0806 |
| quota_scope | №1250 |
| quote | №0794 |
| r | №0863 (+ 2 других файлов) |
| rabbit | №0056 |
| rabbitEarSize | №0061 (+ 1 других файлов) |
| rabbitTailSize | №0061 (+ 1 других файлов) |
| rabbleRouser | №0774 |
| race | №0781 (+ 7 других файлов) |
| raceId | №0055 (+ 19 других файлов) |
| raceName | №0619 (+ 1 других файлов) |
| races | №1723 |
| raceWarp | №0056 |
| rack | №0062 |
| radial | №0057 |
| radiant | №0866 |
| Radiant | №0075 |
| radiantAttackOrder | №0774 |
| radiantRetaliation | №0804 |
| radiantVsUndead | №0073 |
| radius | №0057 (+ 4 других файлов) |
| radiusBySlot | №0774 |
| radiusFt | №0672 (+ 3 других файлов) |
| radiusIncreaseFt | №0774 |
| radiusMiles | №0073 |
| rage | №0643 (+ 1 других файлов) |
| rageDamageBonus | №0676 |
| ragesCount | №0676 |
| raging | №1213 (+ 1 других файлов) |
| ragingInferno | №0774 |
| ragPulp | №0668 |
| rail | №0065 |
| raisedFt | №0813 |
| raiseThrallOnSeedKill | №0804 |
| rallyCrew | №0774 |
| rallyingCry | №0734 |
| rallyUnlimited | №0771 (+ 1 других файлов) |
| ram | №0061 |
| rampage | №0651 (+ 1 других файлов) |
| rampageDie | №0774 |
| rampagePending | №0681 |
| randomRollsLeft | №1723 |
| randomUUID | №1127 (+ 3 других файлов) |
| range | №0073 (+ 17 других файлов) |
| rangedAttack | №0813 (+ 2 других файлов) |
| rangedAttackBonus | №0774 |
| rangeFt | №0072 (+ 31 других файлов) |
| rangeFtByLevel | №0823 |
| rangeMultiplier | №0774 |
| ranger | №0793 (+ 1 других файлов) |
| rangerFightingStyle | №0643 |
| rank | №0816 |
| rankForRecipe | №0665 |
| rapidity | №0636 |
| Rapidity | №0774 |
| raptor | №0056 |
| rare | №0788 (+ 6 других файлов) |
| rareBonus | №0803 |
| rareChance | №0769 |
| rarity | №0788 (+ 27 других файлов) |
| rate | №0660 |
| ratio | №0659 (+ 4 других файлов) |
| rats | №0056 |
| ravenousWeapon | №0774 |
| raw | №0648 (+ 3 других файлов) |
| rawCopper | №0668 |
| rawIron | №0668 |
| rawUnit | №0821 |
| rawXp | №0800 |
| ray | №0815 |
| reach | №0815 |
| reachBonusFt | №0774 |
| reachFt | №0771 (+ 1 других файлов) |
| reaction | №0073 (+ 41 других файлов) |
| reactionAction | №0774 |
| reactionAttack | №0681 (+ 2 других файлов) |
| reactionAttackOrSingleTargetSpell | №0774 |
| reactionCastHexOnDamager | №0774 |
| reactionChoice | №1144 (+ 2 других файлов) |
| reactionCounter | №0771 |
| reactionDamage | №0774 |
| reactionDamageReduction | №0804 |
| reactionDefensiveOrder | №0774 |
| reactionHalveDamage | №0774 |
| reactionId | №0806 (+ 4 других файлов) |
| reactionMode | №0774 |
| reactionMove | №0774 |
| reactionMoveFt | №0774 |
| reactionNegateSpellUpTo5 | №0774 |
| reactionOpportunityAgainstAttacker | №0774 |
| reactionOptions | №0643 (+ 3 других файлов) |
| reactionPending | №0806 |
| reactionRedirectAttack | №0804 |
| reactions | №0643 (+ 2 других файлов) |
| reactionsMax | №0643 |
| reactionSpell | №0808 |
| reactionsRefresh | №0824 |
| reactionSuppressOnInitiative | №0774 |
| reactionUsesByLevel | №0824 |
| reactionWeather | №0681 |
| reactionWindow | №0650 |
| readAllWriting | №0774 |
| readError | №0058 |
| readOnly | №0842 |
| readWriteForkedLanguages | №0774 |
| ready | №0058 (+ 2 других файлов) |
| readyState | №1100 (+ 26 других файлов) |
| reagent | №0821 |
| reagentRoll | №1068 |
| reagents | №0073 (+ 4 других файлов) |
| reagentsRegained | №0073 |
| reagentsSpent | №0073 |
| reagentSynthesis | №0672 |
| reanimateCorpse | №0864 |
| reanimated | №0864 |
| reanimator | №0804 |
| reaper | №0804 |
| rearDigits | №0056 |
| reason | №0072 (+ 30 других файлов) |
| reassembleCorpus | №0774 |
| rebirthInHell | №0774 |
| rebuild | №0793 |
| rebuildMaterialUsage | №1100 (+ 1 других файлов) |
| recalculate | №0844 |
| receipt | №0813 |
| received | №0797 |
| recharge | №0073 (+ 12 других файлов) |
| rechargeActions | №0800 |
| recharged | №0800 |
| rechargeOn | №0649 |
| rechargeState | №0806 |
| recipe | №0660 (+ 5 других файлов) |
| recipeCount | №0667 |
| recipeId | №0659 |
| recipeName | №0659 |
| recipeRequirements | №0665 |
| recipes | №0662 (+ 3 других файлов) |
| RECIPES | №0662 |
| recipesList | №0662 |
| reciprocalRelationship | №0774 |
| reckless | №0643 |
| recommendedSourceCommit | №1304 |
| reconstruction | №0636 |
| Reconstruction | №0774 |
| record | №0842 (+ 6 других файлов) |
| recordApplication | №0816 |
| recordCraftResult | №0665 |
| recordDamage | №0813 |
| recordMutation | №0811 (+ 1 других файлов) |
| recover | №0648 |
| recoverable | №0659 |
| recovered | №0659 (+ 2 других файлов) |
| recoveredFromCrafting | №0660 |
| recoverRatio | №0659 |
| recovery | №0711 (+ 1 других файлов) |
| Recovery | №0075 |
| RECOVERY_BY_DURABILITY | №0659 |
| RECOVERY_BY_QUALITY | №0660 |
| recoveryRate | №1100 |
| recruitInformant | №0774 |
| recruitMercenary | №0774 |
| recursive | №0883 (+ 48 других файлов) |
| red | №0827 |
| Red | №0771 (+ 1 других файлов) |
| redirect | №0774 |
| redirectAttack | №0774 |
| redirectAttackToAlly | №0073 |
| redirectDamage | №0771 |
| redirectDamageToConstruct | №0774 |
| redirectMeleeAttackToFamiliar | №0774 |
| redirectMissedAttackToGrappledTarget | №0774 |
| redirectOrCancel | №0774 |
| redirectTargetId | №0813 |
| redirectURL | №0881 |
| redistributed | №0813 |
| redo | №0058 |
| reduced | №0636 (+ 2 других файлов) |
| reducedBy | №0774 |
| reduceMaxHpByDamage | №0774 |
| reduceNextVisibleAttackBy | №0774 |
| reduction | №0823 (+ 1 других файлов) |
| reEnabled | №1101 |
| ref | №0813 |
| refinedCopper | №0668 |
| reflectPsychicDamage | №0774 |
| refresh | №0814 (+ 2 других файлов) |
| refresh_token | №0648 (+ 1 других файлов) |
| refreshByItsAlive | №0774 |
| refreshMaterial | №0057 |
| refreshOrgans | №0864 |
| refreshStatus | №0659 |
| refundCharnelOnThrallLoss | №0804 |
| refunded | №0806 |
| refundedSpellSlot | №0806 |
| regainOnShortRest | №0771 |
| regainReagentsOnInitiativeUpTo | №0073 |
| regeneration | №0804 |
| Regeneration | №0075 |
| regenerationBlockedBy | №0804 |
| regenPbWhenBloodied | №0636 |
| region | №0057 (+ 3 других файлов) |
| REGION_MOD | №0794 |
| regionalHairSupported | №0054 |
| regionMask | №0054 |
| regionMultiplier | №0794 |
| regions | №0054 (+ 5 других файлов) |
| register | №0623 (+ 12 других файлов) |
| registerActionHandler | №1152 (+ 5 других файлов) |
| registerClass | №0656 (+ 3 других файлов) |
| registerEquipment | №0061 |
| registerPreset | №0061 |
| registerRace | №0061 |
| registerSkin | №0061 |
| registerSummon | №0825 |
| registry | №0656 |
| reinforcedWoodV49 | №0662 |
| reinvokedRune | №0774 |
| reject | №0783 (+ 2 других файлов) |
| rejuvenatingOrder | №0774 |
| relation | №0813 (+ 1 других файлов) |
| relationship | №0796 |
| relationshipChanged | №1164 |
| relaunch | №1104 |
| relaxationLevels | №0774 |
| rele | №0643 |
| release_ready | №1065 |
| release_reason | №1065 |
| release_source_sha | №1065 |
| releaseDeadSpaceOnInitiative | №0804 |
| releaseToLarva | №0811 |
| relentless | №0624 |
| relentlessRage | №0643 |
| reliableTalent | №0643 |
| relic | №0794 (+ 2 других файлов) |
| religion | №0767 (+ 1 других файлов) |
| remaining | №0643 (+ 11 других файлов) |
| remainingAmount | №0636 (+ 3 других файлов) |
| remainingCharges | №0073 |
| remainingHp | №0774 |
| remainingMinutes | №0073 (+ 2 других файлов) |
| remainingOwnerTurns | №0073 |
| remainingTurns | №0073 (+ 1 других файлов) |
| remnant | №0834 |
| remnants | №0058 (+ 4 других файлов) |
| remote | №0648 |
| remoteRoster | №0805 |
| remove | №0653 (+ 7 других файлов) |
| removeAction | №0073 |
| removeAdvantage | №0866 |
| removeAlchemistSlime | №0650 |
| removeClass | №0844 |
| removeCondition | №0771 (+ 1 других файлов) |
| removeConditions | №0636 |
| removed | №0053 (+ 3 других файлов) |
| removeEventListener | №0882 |
| removeFeat | №0844 |
| removeFloor | №0066 |
| removeImmunity | №0636 |
| removeInventory | №0844 |
| removeItem | №1111 (+ 3 других файлов) |
| removeObject | №0066 |
| removePoisonDisease | №0774 |
| removeRampage | №0681 |
| removeResistance | №0636 |
| removeResistanceTo | №0774 |
| removeSpell | №0844 |
| removeZone | №0066 |
| render | №0076 (+ 10 других файлов) |
| renderAppearance | №0056 |
| renderCharacterCreation | №0665 |
| renderControls | №0636 |
| renderFamily | №0061 |
| renderInventory | №1160 (+ 1 других файлов) |
| renderStatus | №0661 |
| rendingStrike | №0774 |
| repairCost | №1102 |
| repairCount | №0659 |
| repaired | №0659 (+ 3 других файлов) |
| repairGold | №1100 |
| repairItem | №0659 (+ 3 других файлов) |
| repairProfile | №0660 |
| repeat | №0077 |
| repeatCondition | №0813 |
| repeatDamageOnFailedSave | №0636 |
| repeatMissedAttack | №0774 |
| repeatRestriction | №0774 |
| repeatRollingBoulderOnSuccessfulProne | №0774 |
| repeatSave | №0073 (+ 3 других файлов) |
| repeatSaveAtTurnEnd | №0774 |
| repeatSaveEndTurn | №0774 |
| repeatSaveOnDamage | №0774 |
| replaceAfterShortRest | №0774 |
| replaceAnyAfterLongRest | №0774 |
| replaceAnyNon18Metamorphoses | №0774 |
| replaceAttackWithSpirit | №0808 |
| replaceAttackWithTouchCantrip | №0774 |
| replaceConsumed | №0774 |
| replaceDropToZeroWithHP | №0073 |
| replaceExploitOnRest | №0774 |
| replaceLowSpellSlotWithInspiringWord | №0774 |
| replaceMetamorphosis | №0774 |
| replaceMutagen | №0774 (+ 1 других файлов) |
| replaceOnRest | №0072 |
| replacePhysicalSaveWith | №0774 |
| replacesRace | №0638 (+ 10 других файлов) |
| replaceStandardOrExoticAfterLongRest | №0774 |
| replaceWolfWithDireWolf | №0774 |
| report | №0659 (+ 1 других файлов) |
| reposition | №0774 |
| reprisal | №0798 |
| reptile | №0769 |
| reptileIndices | №0056 |
| reptileProfile | №0056 (+ 5 других файлов) |
| reptileSkin | №0056 |
| req | №0636 (+ 1 других файлов) |
| requestedExternal | №0054 |
| requestId | №0806 (+ 7 других файлов) |
| require | №1305 |
| required | №0709 (+ 3 других файлов) |
| requiredAssets | №0066 |
| requiredGold | №0660 |
| requiredLevel | №0665 |
| requiredMaterials | №0660 |
| requiredSpecialization | №0665 |
| requiredTools | №0667 |
| requirements | №0627 (+ 1 других файлов) |
| requires | №0669 (+ 4 других файлов) |
| requiresAdvantage | №0774 |
| requiresArmor | №0774 |
| requiresDisengage | №0774 |
| requiresEqualOrHigherExtraSlot | №0774 |
| requiresGrappled | №0774 |
| requiresNearestAttack | №0636 |
| requiresSight | №0813 (+ 3 других файлов) |
| requiresSoleHexTarget | №0774 |
| requiresTarget | №0774 |
| reroll | №0643 |
| rerollAttack | №0073 |
| rerollDamage12 | №0774 |
| rerollFlickerCost | №0774 |
| rerollGrappleEscape | №0774 |
| rerollHemocraftOncePerTurn | №0774 |
| rerollOne | №0643 (+ 3 других файлов) |
| rerollOneDamageDie | №0774 |
| rerollSave | №0771 (+ 1 других файлов) |
| rerollType | №0774 |
| reservationRetained | №0650 |
| reserved | №0798 (+ 3 других файлов) |
| reservedDie | №0808 |
| reset | №0058 |
| resetDeathSaves | №0650 |
| resetLairRound | №0800 |
| resetNegotiation | №0796 |
| resetRestResources | №0864 |
| resetTurn | №0643 |
| resetTurnResources | №0778 |
| resetView | №0858 |
| resignalSeq | №0805 |
| resilientOrder | №0774 |
| resilientOrderAdvanced | №0774 |
| resin | №0662 (+ 3 других файлов) |
| resist | №0813 |
| resistance | №0073 (+ 10 других файлов) |
| resistanceAll | №0073 (+ 2 других файлов) |
| resistanceAllDamage | №0774 |
| resistanceAllExceptPsychic | №0774 |
| resistanceChosen | №0774 |
| resistances | №0650 (+ 14 других файлов) |
| resistanceType | №0073 (+ 2 других файлов) |
| resistanceWhileBloodied | №0774 |
| resistant | №0813 (+ 1 других файлов) |
| resistantSuppression | №0774 |
| resisted | №0845 |
| resize | №0066 |
| resolution | №0854 (+ 1 других файлов) |
| resolve | №0648 (+ 4 других файлов) |
| resolveAction | №0800 |
| resolveAttack | №0650 (+ 1 других файлов) |
| resolveCharacterRace | №0061 |
| resolveEquipment | №0061 |
| resolveFall | №0066 |
| resolveFeature | №0656 |
| resolveHealingEvent | №0813 |
| resolveMorphWeights | №0063 |
| resolveRace | №0061 |
| resolveReaction | №0643 |
| resolveRollMode | №0822 |
| resolveSkin | №0061 |
| resource | №0778 (+ 1 других файлов) |
| resourceBridge | №0681 |
| resourceInput | №0667 |
| resourceName | №0820 |
| resourceProcessing | №0821 |
| resourceRevision | №0806 |
| resources | №0073 (+ 39 других файлов) |
| RESOURCES | №0668 |
| resourceUnit | №0821 |
| resourceYieldMultiplier | №0667 |
| respawn | №0873 |
| rest | №0636 (+ 11 других файлов) |
| restAndRecover | №0774 |
| restHealing | №0779 (+ 1 других файлов) |
| restNormals | №0056 |
| restock | №0794 (+ 1 других файлов) |
| restore | №0643 (+ 4 других файлов) |
| restoreBloodMaledictOnRiteCrit | №0636 |
| restoreBody | №0811 |
| restored | №0073 (+ 3 других файлов) |
| restoredAt | №0860 |
| restoreExhaustion | №0771 (+ 1 других файлов) |
| restoreExploitPerAlly | №0774 |
| restoreGolem | №1068 |
| restoreHitDice | №0771 (+ 1 других файлов) |
| restoreHp | №0681 |
| restoreHP | №0774 |
| restoreInterruptOnInitiative | №0774 |
| restoreLocalCopy | №0648 |
| restoreMoxie | №0774 |
| restoreMoxieOnSuccessfulCrossCounter | №0774 |
| restoreOneSealLongRest | №0774 |
| restoreOnInitiative | №0774 |
| restorePactSlot | №0636 |
| restoreReagents | №0774 |
| restoreResource | №0771 |
| restoreResources | №0822 |
| restoreSnapshot | №0856 (+ 1 других файлов) |
| restoreSpellLevels | №0804 |
| restoreThrall | №0774 |
| restoreWithReagents | №1068 |
| restPositions | №0056 |
| restrainAt0Hp | №0774 |
| restrained | №0774 (+ 1 других файлов) |
| restrainedUntilEndOfNextTurn | №0774 |
| restrictionUntilOwnEnd | №0813 |
| result | №0643 (+ 40 других файлов) |
| resultCp | №0785 |
| resultEp | №0785 |
| resultGp | №0785 |
| resultPp | №0785 |
| results | №0643 (+ 4 других файлов) |
| resultSp | №0785 |
| resumed | №0813 |
| retain | №0828 |
| retainMentalStats | №0774 |
| retains | №0839 |
| retaliationHealing | №0774 |
| retaliatoryDamage | №0774 |
| retaliatoryNecrotic | №0774 |
| retargetMageMark | №0813 |
| retreat | №0815 |
| retreatFrom | №0813 |
| retries | №0816 |
| retry_after | №1065 (+ 1 других файлов) |
| retryIn | №0873 (+ 1 других файлов) |
| returnAfterHour | №0804 |
| returnAttackBonus | №0806 (+ 1 других файлов) |
| returnDamage | №0774 (+ 3 других файлов) |
| returnDamageType | №0806 |
| returnedAttack | №0643 |
| returnTarget | №0650 (+ 3 других файлов) |
| returnToShell | №0779 |
| reveal | №0074 (+ 3 других файлов) |
| revealed | №0069 (+ 2 других файлов) |
| revealedArcana | №0636 |
| revealedSight | №0813 |
| revealsInvisible | №0073 |
| reverseMappedGlbVertices | №1117 |
| revert | №0774 (+ 1 других файлов) |
| revision | №0648 (+ 3 других файлов) |
| revitalizingOrderExploit | №0774 |
| reviveAtDawn | №0774 |
| reviveAtZero | №0771 |
| revived | №0073 |
| revivedFromZero | №0650 |
| reviveHp | №0774 |
| reviveNearHeartAfterHours | №0774 |
| reviveRecentDead | №0804 |
| reviveRite | №0636 |
| reviveTo1 | №0774 |
| revokeObjectURL | №1209 |
| revolution | №0798 |
| rewards | №0665 (+ 2 других файлов) |
| rider | №0864 |
| RIDGE_STYLES | №0061 |
| ridgeColor | №0061 (+ 1 других файлов) |
| ridgeStyle | №0058 |
| right | №1115 |
| ringingStrike | №0774 |
| riposte | №0774 |
| riseFt | №0813 |
| risk | №0075 |
| rite | №0774 (+ 2 других файлов) |
| riteFocus | №0636 |
| riteOfTheDawn | №0636 |
| riteRevival | №0636 |
| rites | №0702 (+ 8 других файлов) |
| riteSwapAtLevel | №0774 |
| riteType | №0636 (+ 7 других файлов) |
| ritual | №0756 (+ 3 других файлов) |
| ritualCasting | №0702 (+ 1 других файлов) |
| ritualComponentReplaced | №0808 |
| ritualDuringShortRest | №0774 |
| ritualizeKnownSpellsUpTo | №0808 |
| ritualMastery | №0774 |
| ritualMaterialSubstitution | №0774 |
| ritualMinutes | №0774 (+ 1 других файлов) |
| ritualSpellLevelMax | №0808 |
| ritualTurnsBySpellLevel | №0808 |
| rmsDisplacementMeters | №1112 |
| roar | №0636 (+ 1 других файлов) |
| roguishCharm | №0774 |
| role | №0054 (+ 31 других файлов) |
| roles | №0623 (+ 18 других файлов) |
| roll | №0069 (+ 25 других файлов) |
| rollback | №0851 (+ 1 других файлов) |
| rollD20 | №0822 (+ 20 других файлов) |
| rollDice | №0650 (+ 4 других файлов) |
| rolled | №0833 |
| rolledDistanceFt | №0813 |
| rollingAvalanche | №0774 |
| rollingBoulder | №0774 |
| rollPockets | №0802 (+ 1 других файлов) |
| rollResolved | №0830 |
| rollResult | №0867 |
| rolls | №0623 (+ 24 других файлов) |
| rollTwiceChoose | №0774 |
| roomId | №0805 (+ 5 других файлов) |
| root | №1723 |
| rope | №0665 (+ 1 других файлов) |
| roster | №1099 (+ 2 других файлов) |
| rotation | №0071 |
| rotFist | №0774 |
| roughness | №0056 (+ 3 других файлов) |
| round | №0058 (+ 51 других файлов) |
| roundEarSize | №0061 (+ 1 других файлов) |
| roundOwnerId | №0813 |
| roundsRemaining | №0774 (+ 1 других файлов) |
| roundStart | №0813 |
| route | №0815 |
| rows | №0073 (+ 21 других файлов) |
| RTCPeerConnection | №1237 |
| ru | №0740 (+ 1 других файлов) |
| rug | №0062 |
| ruined | №0659 (+ 1 других файлов) |
| ruins | №0794 |
| ruins_courtyard | №0873 |
| ruins_vault | №0873 |
| ruins_workshop | №0873 |
| rules | №0816 (+ 2 других файлов) |
| run | №0851 (+ 1 других файлов) |
| rune | №0774 (+ 2 других файлов) |
| runeDoesNotCountAgainstAttunement | №0774 |
| runeInert | №0774 |
| runesKnown | №0643 (+ 1 других файлов) |
| runesPerObject | №0774 |
| runesPersistAfterDeath | №0774 |
| runicCharges | №0823 |
| runicLore | №0823 |
| runSceneTest | №0837 |
| runScripts | №1122 |
| runtime | №0702 (+ 4 других файлов) |
| runtimeCraft | №0774 |
| runtimeId | №0808 |
| runtimeKey | №0765 |
| runtimeStatus | №0702 (+ 1 других файлов) |
| runtimeVersion | №0672 |
| ruthlessCommand | №0774 |
| ruthlessFocus | №0774 |
| rx | №0056 (+ 4 других файлов) |
| ry | №0056 |
| rz | №0056 (+ 1 других файлов) |
| s | №0065 (+ 3 других файлов) |
| sacredWeapon | №0643 |
| sacrifice | №0798 (+ 1 других файлов) |
| sacrificeFoe | №0798 |
| saddler | №0665 |
| safeAlliesMax | №0774 |
| sagacity | №0636 |
| Sagacity | №0774 |
| salt | №0666 (+ 3 других файлов) |
| saltOfEarth | №0774 |
| salvage | №0820 (+ 1 других файлов) |
| sample | №1171 (+ 3 других файлов) |
| sampledBestMaxDistance | №1121 |
| sampledBestMeanDistance | №1121 |
| sampledGoodPct | №1121 |
| sampleSampler | №0063 |
| sand | №0667 |
| sandbox | №0881 |
| sandVortex | №0804 |
| sanguine | №0774 |
| sanguineEmboldenAllies | №0774 |
| sanguineMastery | №0636 |
| sanguineVitalize | №0774 |
| satyr | №1288 |
| savage_attacker | №0777 |
| savageDice | №0774 |
| save | №0055 (+ 26 других файлов) |
| save1 | №0804 |
| save1or2 | №0804 |
| saveAbility | №0672 |
| saveBonus | №0636 (+ 1 других файлов) |
| saveBonuses | №1067 (+ 6 других файлов) |
| saveBottom | №1267 |
| saveCustom | №0852 |
| saved | №0779 (+ 2 других файлов) |
| savedAt | №0855 (+ 2 других файлов) |
| saveDc | №0806 |
| saveDC | №0073 (+ 6 других файлов) |
| savedChannel | №1249 |
| savedDrawCalls | №0058 |
| saveDisadvantage | №0774 (+ 1 других файлов) |
| saveDisadvantageForPugilistFeatures | №0774 |
| savedUrl | №1249 |
| saveEpoch | №0860 |
| saveId | №0860 |
| saveModifiers | №0636 (+ 8 других файлов) |
| saveOnHit | №0073 |
| savePenalty | №0073 |
| saveResult | №0073 (+ 7 других файлов) |
| saveRevision | №0860 |
| saveRoll | №0806 |
| saves | №0774 (+ 1 других файлов) |
| savesData | №0619 (+ 1 других файлов) |
| saveSheet | №0653 |
| saveSucceeds | №0774 |
| saveSuccess | №0073 |
| saveType | №0650 (+ 7 других файлов) |
| savingThrow | №0650 (+ 20 других файлов) |
| savingThrowBonusDice | №0774 |
| savingThrowProficiencies | №1148 |
| savingThrows | №0072 (+ 32 других файлов) |
| SCALAR | №0063 (+ 4 других файлов) |
| scale | №0056 (+ 20 других файлов) |
| scalePlateV49 | №0662 |
| scalesPerLevel | №0774 |
| scaleWithOwner | №0653 (+ 1 других файлов) |
| scan | №0825 |
| scarf | №0057 |
| scenarios | №0851 (+ 1 других файлов) |
| scene | №1073 (+ 2 других файлов) |
| sceneFrom | №0813 |
| sceneOwnerId | №0813 (+ 1 других файлов) |
| scenes | №1073 (+ 2 других файлов) |
| schema | №1254 |
| schema_version | №1099 |
| SCHEMA_VERSION | №0637 (+ 2 других файлов) |
| schemaVersion | №0061 (+ 7 других файлов) |
| scheme | №0881 |
| scholarlyPursuits | №0824 |
| school | №0755 (+ 10 других файлов) |
| schoolOfHardKnocks | №0774 |
| scope | №0774 (+ 1 других файлов) |
| scopeId | №0648 |
| scopes | №0648 |
| score | №0659 (+ 1 других файлов) |
| scourgeAttunement | №0774 |
| scourgePresence | №0774 |
| scourgeSense | №0774 |
| scourgeSpeech | №0774 |
| scourgeVisage | №0774 |
| scribe | №0663 (+ 4 других файлов) |
| scrolls | №0665 (+ 2 других файлов) |
| seafarer | №0774 |
| seal | №0774 |
| sealDamage | №0693 (+ 1 других файлов) |
| sealDamageIgnoresResistance | №0774 |
| sealDiceDoubled | №0774 |
| sealedSpiritFeatureLevels | №0839 |
| seals | №0693 |
| sealSystem | №0693 |
| sealWax | №0667 |
| seamMaxMeters | №1112 |
| seaMobility | №0771 |
| search | №0655 |
| searchAsBonus | №0771 |
| second | №0822 |
| second_chance | №0777 |
| secondaryAbility | №0681 |
| secondaryStat | №0672 (+ 3 других файлов) |
| secondaryStatChoice | №0693 (+ 2 других файлов) |
| secondaryStats | №0721 (+ 5 других файлов) |
| seconds | №0813 (+ 4 других файлов) |
| secondTarget | №0774 |
| secondWind | №0643 |
| secret | №0069 |
| secure | №0881 |
| seed | №1723 |
| seeIllusions | №0813 |
| seeing | №0774 |
| seeInvisible | №0813 (+ 1 других файлов) |
| seek | №0842 |
| seeking | №0073 |
| seekingBomb | №0774 |
| select | №0852 |
| selected | №0072 (+ 4 других файлов) |
| selectedFile | №0848 |
| selectedRites | №0808 |
| selectedTexture | №0066 |
| selectedTokenId | №0621 |
| selectedTool | №0066 |
| selectedWallTexture | №0066 |
| selection | №0072 |
| selfAdvantage | №0822 |
| selfDamage | №0643 (+ 4 других файлов) |
| selfDamageType | №0774 |
| selfDisadvantage | №0822 |
| selfFireDamageUpToLevel | №0774 |
| selfHeal | №0774 |
| selfNecrotic | №0774 |
| selfRadiantDamage | №0774 |
| selfSuture | №0804 |
| selfUsesHitDie | №0774 |
| sell | №0794 (+ 2 других файлов) |
| sellable | №0797 |
| sellFactor | №0794 (+ 1 других файлов) |
| sendActionResult | №1152 (+ 5 других файлов) |
| sendMessage | №1206 |
| sendReactionRequest | №1152 (+ 2 других файлов) |
| senseBloodCreatures | №0774 |
| senses | №0653 (+ 4 других файлов) |
| sentinel | №0777 |
| sentinelSoul | №0730 (+ 1 других файлов) |
| sentinelSoulChoices | №0730 |
| sentinelStand | №0730 (+ 1 других файлов) |
| sentinelStandChoices | №0730 |
| sentinelStrike | №0730 (+ 1 других файлов) |
| sentinelStrikeChoices | №0730 |
| seq | №1214 (+ 6 других файлов) |
| serial | №0636 |
| serialize | №0061 |
| session | №0857 (+ 2 других файлов) |
| sessionId | №0857 (+ 1 других файлов) |
| sessions | №1180 (+ 1 других файлов) |
| setArmor | №0058 |
| setAttribute | №1160 (+ 1 других файлов) |
| setAxis | №0058 |
| setBackground | №0844 |
| setBodyHair | №0058 |
| setCeiling | №0813 |
| setClassLevel | №0844 |
| setClothing | №0058 |
| setClothingCustomization | №0058 |
| setElevation | №0813 |
| setEnabled | №0656 (+ 1 других файлов) |
| setExternalAnatomy | №0058 |
| setGender | №0058 (+ 1 других файлов) |
| setHead | №0058 |
| setHosieryDen | №0058 |
| setHp | №0774 |
| setHP | №0774 |
| setIcon | №0882 |
| setItem | №1069 (+ 19 других файлов) |
| setMainMenuAvailability | №0837 |
| setMessageHandler | №1206 |
| setOriginRace | №0061 |
| setPose | №0058 |
| setProfession | №0844 |
| setProgress | №0838 |
| setProgressHandler | №0837 |
| setRace | №0058 (+ 2 других файлов) |
| setRegion | №0794 |
| setResource | №0822 |
| setSkin | №0058 |
| setStance | №0774 |
| setStatus | №0838 |
| setStrength | №0073 |
| setSwarmMoving | №0058 |
| setSymbiosis | №0811 |
| setTile | №0066 |
| setTimeout | №0658 (+ 15 других файлов) |
| settlementIntel | №0774 |
| settlementOnly | №0774 |
| setTotalLevel | №0844 |
| setView | №1209 |
| setWeapon | №0058 |
| sewer | №0058 |
| sha | №1254 |
| sha256 | №0837 (+ 4 других файлов) |
| shadow_dancer | №0777 |
| shadow_touched | №0777 |
| shadowColor | №0061 (+ 1 других файлов) |
| shadowEssence | №0821 |
| shadowForm | №0804 |
| shadowmaster | №0774 |
| shadowMasterOfDisguise | №0774 |
| shadowNoEscape | №0774 |
| shadowOpacity | №1268 |
| shadowStep | №0643 |
| shag | №0056 (+ 1 других файлов) |
| shakeItOff | №0711 (+ 1 других файлов) |
| Shaman | №0702 |
| shape | №0056 (+ 8 других файлов) |
| shapechange | №0774 |
| shapeChangeSave | №0774 |
| shapeFemale | №1083 |
| shapeHead | №0056 |
| shapeMale | №1083 (+ 1 других файлов) |
| shaper | №0709 (+ 1 других файлов) |
| Shaper | №0790 |
| shapes | №0054 (+ 1 других файлов) |
| sharedAdvantage | №0774 |
| shareDamage | №0813 |
| shareDanceBonus | №0804 |
| sharedBonusAction | №0774 (+ 1 других файлов) |
| sharedHp | №0774 |
| sharedImmortality | №0774 |
| sharedInitiative | №0834 |
| sharedProperties | №0074 (+ 1 других файлов) |
| sharedReaction | №0771 (+ 2 других файлов) |
| sharedStealth | №0681 |
| shareSaves | №0808 |
| shareSensesHours | №0774 |
| sharpMind | №0824 |
| sharpshooter | №0777 |
| shaved | №0054 (+ 1 других файлов) |
| shelf | №0062 |
| shell | №0779 |
| shellColor | №0061 (+ 1 других файлов) |
| shellDestroyed | №0779 |
| shellHealing | №0779 |
| shellHP | №0779 |
| shellMaxHP | №0779 |
| shellName | №0779 |
| shells | №1276 |
| shellSize | №0061 (+ 1 других файлов) |
| shield_master | №0777 |
| shieldACBonus | №0774 |
| shieldAllowed | №0774 |
| shieldAttackBonus | №0774 |
| shieldDamage | №0774 |
| shielded | №0636 (+ 1 других файлов) |
| Shielded | №0774 |
| shieldFrame | №0662 (+ 1 других файлов) |
| shieldImpact | №0774 |
| shieldmaker | №0665 |
| shieldMartial | №0774 |
| shieldSlam | №0774 (+ 1 других файлов) |
| shieldWarrior | №0774 |
| shift | №0796 |
| shifter | №0667 (+ 1 других файлов) |
| shifterNaturalWeapon | №0828 |
| shinL | №0054 |
| shinR | №0054 |
| shipchandler | №0796 (+ 1 других файлов) |
| shippedSha256 | №1112 |
| shirt | №0057 |
| shirt_long | №1078 (+ 1 других файлов) |
| shockingStrike | №0774 |
| shockingStrikeDamage | №0774 |
| short | №0056 (+ 1 других файлов) |
| shortRest | №0073 (+ 1 других файлов) |
| shortRestHealing | №0834 |
| shortRestHealingAllowed | №0864 |
| shortRestSlots | №0774 |
| shoulders | №0058 (+ 6 других файлов) |
| shouldSuppressRestHP | №0779 (+ 1 других файлов) |
| shove | №0771 |
| shredding | №0774 |
| shreddingFree | №0774 |
| shuffle | №0077 |
| side | №0056 (+ 2 других файлов) |
| side_part | №0056 (+ 1 других файлов) |
| sideEffect | №0774 |
| sideEffects | №0075 |
| sides | №0650 (+ 8 других файлов) |
| siege | №0665 (+ 2 других файлов) |
| siegeInteraction | №0626 |
| sightBlocked | №0069 |
| sigilEligible | №0627 |
| sigilicGrace | №0774 |
| signal | №0648 (+ 2 других файлов) |
| signature | №0788 (+ 1 других файлов) |
| signatureSpells | №0643 |
| signup | №0648 |
| silent | №0813 |
| silentCheck | №0837 |
| silentStalker | №0774 |
| silk | №0057 |
| silkwormSilk | №0668 |
| silver | №0663 (+ 2 других файлов) |
| silvered | №0650 (+ 1 других файлов) |
| site | №0790 |
| sixthMetamorphosis | №0774 |
| size | №0056 (+ 45 других файлов) |
| size_mb | №1110 |
| sizeBytes | №1114 |
| sizeCategory | №0061 (+ 1 других файлов) |
| sizeChange | №0073 |
| sizeFt | №0073 (+ 1 других файлов) |
| sizeIncrease | №0771 (+ 1 других файлов) |
| skeleton | №0061 (+ 2 других файлов) |
| skill | №0623 (+ 13 других файлов) |
| skillAdvantage | №0636 |
| skillBonus | №0771 (+ 3 других файлов) |
| skillChoices | №0779 (+ 3 других файлов) |
| skilled | №0658 (+ 1 других файлов) |
| skilledRider | №0774 |
| skillId | №0767 (+ 3 других файлов) |
| skillModifiers | №0636 |
| skillProficiency | №0774 |
| skillProficient | №0650 (+ 1 других файлов) |
| skills | №0619 (+ 27 других файлов) |
| skillsChoose | №0073 (+ 1 других файлов) |
| skillsData | №0619 (+ 3 других файлов) |
| skiltKrigga | №0774 |
| skin | №0053 (+ 8 других файлов) |
| skin_names | №1110 |
| skinCompatible | №0061 |
| skinDetail | №0061 (+ 6 других файлов) |
| skinFamily | №0061 |
| skinGlow | №0061 (+ 2 других файлов) |
| skinId | №0061 (+ 1 других файлов) |
| skinMaterial | №0061 |
| skinned_primitives | №1110 |
| skinPositions | №0053 |
| skins | №0063 (+ 4 других файлов) |
| skinSurface | №0058 (+ 5 других файлов) |
| skipDefeated | №0778 |
| skirt | №0057 |
| skirtProfile | №0057 |
| slamDamage | №0774 |
| slamMagical | №0774 |
| slash | №0069 (+ 1 других файлов) |
| slashing | №0866 |
| slashTexture | №0071 |
| slaymateRitual | №0804 |
| sleep | №0774 (+ 1 других файлов) |
| Sleep | №0075 |
| sleepImmune | №0813 |
| sleepUntilStartNextTurnOrDamage | №0774 |
| sleepwalker | №0774 |
| sleeves | №0057 (+ 2 других файлов) |
| sleightBonus | №0774 |
| sleightingImprecation | №0774 |
| sleightOfHand | №0767 (+ 1 других файлов) |
| slick_back | №0056 (+ 1 других файлов) |
| slime | №0058 |
| slimeCovered | №0073 |
| slimeFiber | №0821 |
| slimeReagent | №0821 |
| slipperyMind | №0643 |
| slipTurns | №0816 (+ 1 других файлов) |
| slit | №1078 (+ 2 других файлов) |
| slitHeight | №1078 (+ 1 других файлов) |
| slot | №0057 (+ 9 других файлов) |
| slotKind | №0643 |
| slotLevel | №0636 (+ 12 других файлов) |
| slotLevels | №1219 |
| slots | №0057 (+ 8 других файлов) |
| slotsByLevel | №0804 |
| slotSpent | №0808 |
| slotsRefresh | №0839 |
| slotsUsed | №0781 |
| slowFall | №0643 |
| slowFt | №0636 |
| small | №0062 (+ 2 других файлов) |
| smith | №0663 (+ 7 других файлов) |
| smoke | №0073 |
| smokeBomb | №0774 |
| smokeCloud | №0073 |
| snake | №0814 |
| snapshot | №0648 (+ 10 других файлов) |
| snapshots | №0073 |
| sneakApplied | №0650 (+ 1 других файлов) |
| sneakAttack | №0643 |
| sneakAttackDice | №0781 (+ 1 других файлов) |
| sneakEligible | №1219 |
| sneakStyle | №0849 |
| snout | №0056 |
| social | №0623 (+ 12 других файлов) |
| socialAdvantage | №0771 |
| socialBonus | №0804 |
| socket | №0056 |
| socks | №0057 (+ 3 других файлов) |
| solidified | №0774 |
| soloShieldAC | №0774 |
| solvent | №0073 |
| somatic | №0755 (+ 10 других файлов) |
| somaticMaterialFree | №0774 |
| somnolence | №0774 |
| songOfRest | №0643 |
| songsOfWarPeace | №0774 |
| soothingSpeech | №0774 |
| sorcerer | №0793 (+ 1 других файлов) |
| sorcerousOriginMastery | №0643 |
| sorcerousRestoration | №0643 |
| sorceryPoints | №0643 (+ 2 других файлов) |
| sort | №0788 |
| soulEater | №0636 (+ 1 других файлов) |
| soulOfArtifice | №0643 |
| soulSight | №0808 |
| soulToyConversion | №0804 |
| source | №0053 (+ 112 других файлов) |
| SOURCE | №0661 |
| SOURCE_TAG | №0665 |
| sourceCommit | №1724 |
| sourceDead | №0864 |
| sourceDisplacementMax | №1118 |
| sourceDisplacementMean | №1118 |
| sourceFor | №0076 |
| sourceGlb | №1107 |
| sourceGlbSha256 | №1304 |
| sourceHashes | №1304 |
| sourceId | №0072 (+ 29 других файлов) |
| sourceIndices | №0056 |
| sourceKey | №0790 |
| sourceLabel | №0623 (+ 10 других файлов) |
| sourceMaxDisplacement | №1117 |
| sourceMeanDisplacement | №1117 |
| sourceMeshes | №0058 |
| sourceName | №0695 (+ 3 других файлов) |
| sourceNonZeroEntries | №1117 |
| sourcePack | №0623 (+ 11 других файлов) |
| sourcePacks | №0625 (+ 2 других файлов) |
| sourceProject | №1304 |
| sourceQuantity | №0659 |
| sourceRule | №0076 |
| sources | №0076 (+ 12 других файлов) |
| sourceSha256 | №1112 |
| sourceStackTerms | №1304 |
| sourceTarget | №1107 |
| sourceType | №0073 (+ 15 других файлов) |
| sourceVersion | №0721 (+ 3 других файлов) |
| sovereignOfFate | №0774 |
| sp | №0785 (+ 6 других файлов) |
| space | №0834 |
| span | №0056 |
| sparse | №1108 |
| spatialManipulation | №0774 |
| speakWithBeastsAndPlants | №0774 |
| special | №0663 |
| specialization | №0665 (+ 2 других файлов) |
| specializationBonus | №0665 |
| specializationList | №0665 |
| specializations | №0665 |
| specialReactionPerOtherCreatureTurn | №0774 |
| specialSightFt | №0813 |
| specialtyTags | №0662 |
| species | №0056 (+ 4 других файлов) |
| spectral | №0056 |
| spectralFiber | №0662 (+ 1 других файлов) |
| spectralIndices | №0056 |
| spectralMounts | №0804 |
| spectralParts | №0056 |
| spectralReagent | №0821 |
| spectralThreadV49 | №0662 |
| speed | №0619 (+ 38 других файлов) |
| Speed | №0075 |
| speedBonus | №0774 |
| speedBonusFt | №0636 (+ 1 других файлов) |
| speedDouble | №0774 |
| speedFt | №0806 |
| speedHalf | №0774 |
| speedMultiplier | №0804 (+ 1 других файлов) |
| speedPenalty | №0636 |
| speedPenaltyFt | №0636 (+ 1 других файлов) |
| speedReductionFt | №0681 |
| speedZeroSave | №0774 |
| spell | №0643 (+ 6 других файлов) |
| spellAttack | №0774 (+ 3 других файлов) |
| spellAttackBonus | №0774 (+ 2 других файлов) |
| spellAttackUsesWisdom | №0774 |
| spellblade | №0774 (+ 1 других файлов) |
| Spellblade | №0790 |
| spellbladeSource | №0790 |
| spellCaster | №0806 (+ 1 других файлов) |
| spellcasting | №0702 (+ 10 других файлов) |
| spellcastingAbility | №0073 |
| spellcastingFocus | №0774 |
| spellDamageModifiers | №0643 (+ 2 других файлов) |
| spellDamageVulnerability | №0774 |
| spellHealingOrDamage | №0808 |
| spellId | №0650 (+ 9 других файлов) |
| spellLevel | №0643 (+ 10 других файлов) |
| spellLevelCap | №0808 |
| spellLevelMax | №0774 |
| spellLevels | №0808 |
| spellList | №0798 |
| spellLists | №0709 |
| spellMastery | №0643 |
| spellName | №0650 (+ 18 других файлов) |
| spells | №0781 (+ 11 других файлов) |
| spellSaveDC | №0774 (+ 2 других файлов) |
| spellsData | №0619 (+ 4 других файлов) |
| spellsDoNotCountAgainstKnown | №0774 |
| Spellshot | №0790 |
| spellsKnown | №0702 (+ 2 других файлов) |
| spellSlotKind | №0643 |
| spellSlotLevel | №0643 |
| spellSlots | №0643 (+ 2 других файлов) |
| spellSlotsData | №0619 (+ 14 других файлов) |
| spellSlotSubstitute | №0804 |
| spellSlotTable | №0822 (+ 1 других файлов) |
| spellSources | №0822 |
| spellStat | №0619 (+ 1 других файлов) |
| spellStats | №0822 |
| spellStoringItem | №0643 |
| spellstrike | №0774 |
| spellTable | №0636 |
| spellUses | №0798 |
| spellUsesByLevel | №0798 |
| Spellweaver | №0790 |
| spend | №0778 |
| spendAction | №0778 |
| spendCharges | №0774 |
| spendCoin | №0813 |
| spendDynamo | №0073 |
| spendExtendedResource | №0643 |
| spendMovement | №0778 |
| spendMovementReward | №0816 |
| spendReaction | №0813 |
| spendResource | №0822 |
| spendSpellSlot | №0774 |
| spent | №0681 (+ 4 других файлов) |
| sPerG | №1723 |
| spices | №0668 |
| spider | №0681 |
| spiderSilk | №0662 (+ 1 других файлов) |
| spines | №0061 |
| spiral | №0061 |
| spirit | №0839 (+ 1 других файлов) |
| spiritAttacks | №0779 |
| spiritCommunication | №0808 |
| spiritDamage | №0808 |
| spiritDamageBonus | №0808 |
| spiritForm | №0779 |
| spiritHP | №0779 |
| spiritMantle | №0839 |
| spiritMaxHP | №0779 |
| spiritRangeFt | №0808 |
| spiritTypes | №0702 |
| spiritualDefense | №0839 |
| splashDice | №0073 |
| split | №0774 |
| splitAmongTargets | №0774 |
| splitDamage | №0774 |
| sporeling | №0681 |
| spread | №0053 |
| springSteel | №0668 |
| spurredArmy | №0774 |
| square | №0058 (+ 1 других файлов) |
| squaredCircle | №0711 |
| src | №0077 (+ 4 других файлов) |
| stability | №0075 (+ 1 других файлов) |
| Stability | №0075 |
| stable | №0796 (+ 2 других файлов) |
| stack | №0062 (+ 1 других файлов) |
| stacks | №0681 |
| stage | №0779 (+ 3 других файлов) |
| stage10 | №0073 |
| staged | №0837 |
| stair | №0062 |
| stairFrom | №0071 |
| stairHeight | №1150 |
| stairs | №0062 |
| stairTo | №0071 |
| stale | №0860 |
| stalkersProwess | №0636 |
| stalwartDefender | №0774 |
| stalwartSpirit | №0866 |
| stance | №0774 (+ 2 других файлов) |
| stanceRadiusFt | №0774 |
| stand | №0062 |
| standard | №0660 (+ 2 других файлов) |
| standingJump | №0774 |
| standTheFallen | №0774 |
| standUp | №0774 |
| start | №0709 |
| startActorTurn | №0636 |
| startedAt | №0857 |
| startedAtTurn | №0073 |
| startedTurn | №0813 |
| startElevation | №0813 |
| startingEquipment | №0073 (+ 3 других файлов) |
| startLevel | №0828 |
| startlingJinx | №0774 |
| startTurn | №0072 (+ 13 других файлов) |
| startTurnDamage | №0774 |
| startTurnHeal | №0774 |
| startTurnHealing | №0774 |
| startTurnNecrotic | №0774 |
| startX | №0813 (+ 1 других файлов) |
| startY | №0813 (+ 1 других файлов) |
| stat | №0072 (+ 21 других файлов) |
| STAT_ALIASES | №0822 |
| STAT_META | №0864 |
| statblock | №0073 |
| statBlock | №0828 (+ 1 других файлов) |
| statBonus | №0741 (+ 4 других файлов) |
| state | №0650 (+ 19 других файлов) |
| stateRevision | №0805 (+ 6 других файлов) |
| states | №0834 |
| statMode | №1723 |
| stats | №0619 (+ 51 других файлов) |
| status | №0827 (+ 58 других файлов) |
| STATUS | №0073 |
| stdio | №1066 (+ 2 других файлов) |
| steadfastOrder | №0774 |
| steadfastToughness | №0866 |
| stealth | №0767 (+ 1 других файлов) |
| stealthAdvantage | №0774 |
| stealthBonus | №0774 |
| stealthDisadvantage | №0079 |
| steed | №0652 |
| steel | №0663 (+ 3 других файлов) |
| steelBillet | №0668 |
| steelWire | №0668 |
| steelWireV38 | №1100 |
| stencil | №0068 |
| step | №0070 (+ 1 других файлов) |
| stepWind | №0643 |
| stickAndMove | №0774 |
| stillnessOfMind | №0643 |
| stock | №0794 (+ 2 других файлов) |
| stockCount | №0795 |
| stocky | №0061 |
| stolen | №0813 |
| stolenSpark | №0774 |
| stone | №0062 (+ 4 других файлов) |
| Stoneblood | №0790 |
| stonecutter | №0796 (+ 1 других файлов) |
| stoneDust | №0667 |
| stoneForm | №0774 |
| stoneFormToggle | №0774 |
| stoneReductionAppliesToMagic | №0774 |
| stoneToFlesh | №0774 |
| stool | №0062 |
| stop | №0842 |
| stopIntruder | №0771 |
| stopOnDefeat | №0778 (+ 4 других файлов) |
| stopped | №0813 (+ 1 других файлов) |
| storage | №0808 (+ 2 других файлов) |
| STORAGE_KEY | №0661 |
| stored | №0804 |
| storedHealingMax | №0774 |
| storm | №0636 |
| str | №0619 (+ 62 других файлов) |
| straight | №0061 |
| straightLine | №0774 |
| strands | №1259 |
| strangeMetabolism | №0636 |
| strategicAdjustments | №0774 |
| strategist | №0734 (+ 1 других файлов) |
| strBonus | №0636 |
| strChecksDisadvantage | №0636 (+ 1 других файлов) |
| strDexChecksDisadvantage | №0636 (+ 1 других файлов) |
| strDexSaveAdvantage | №0774 |
| stream | №0881 |
| streetSmart | №0711 |
| streetwise | №0774 |
| strength | №0781 (+ 11 других файлов) |
| Strength | №0075 |
| strengthAdvantage | №0813 |
| strengthFloor | №0813 |
| strengthInNumbers | №0774 |
| strengthMaxBonus | №0774 |
| strengthOrDexterity | №0693 (+ 3 других файлов) |
| strenuous | №0076 (+ 1 других файлов) |
| stressPressure | №0624 |
| strikeDice | №0774 |
| strIncrease | №0774 |
| strMaxBonus | №0636 |
| strMaxIncrease | №0774 |
| strokeOfLuck | №0643 |
| strongbow | №0774 |
| strOrDexSave | №0774 |
| strSave | №0774 |
| strSavesDisadvantage | №0636 (+ 1 других файлов) |
| stubble | №0056 (+ 1 других файлов) |
| student | №0771 |
| stun | №0771 |
| stunIfFailedBy5 | №0636 |
| stunned | №0774 (+ 2 других файлов) |
| stunnedUntilEndOfNextTurn | №0774 |
| stunning | №0774 |
| stunningStrike | №0643 (+ 1 других файлов) |
| stunOnFail | №0774 |
| stunOnFailBy5 | №0774 |
| style | №0774 (+ 33 других файлов) |
| styles | №0808 |
| subclass | №0781 (+ 20 других файлов) |
| SUBCLASS_FEATURES | №0643 |
| subclassBonds | №0681 |
| subclassDeepMagic | №0693 |
| subclasses | №0072 (+ 24 других файлов) |
| subclassFeature | №0771 |
| subclassFeatureCatalog | №0711 |
| subclassFeatureIdResolution | №0672 |
| subclassFeatureLevels | №0072 (+ 20 других файлов) |
| subclassId | №0656 (+ 2 других файлов) |
| subclassLevel | №0072 (+ 41 других файлов) |
| subclassSystem | №0672 (+ 4 других файлов) |
| subclassUse | №0774 |
| subjugateThrall | №0774 |
| subtle | №0643 (+ 1 других файлов) |
| subtractD8 | №0774 |
| subtractHemocraftDie | №0636 |
| subtree | №0787 (+ 3 других файлов) |
| success | №0073 (+ 24 других файлов) |
| successes | №0650 (+ 14 других файлов) |
| successorClientId | №1237 |
| successTempHp | №0774 |
| suit | №0816 |
| suite | №0849 |
| summary | №0623 (+ 12 других файлов) |
| summon | №0771 (+ 3 других файлов) |
| summonDevilJurist | №0774 |
| summonedId | №0813 |
| summonFamiliar | №0774 |
| summonFiendAt0HP | №0774 |
| summonOoze | №0073 |
| summonSpellId | №0825 |
| sunAura | №0813 |
| sunlightAttackAndPerceptionDisadvantage | №0774 |
| sunlightAttackAndSightDisadvantage | №0636 |
| sunlightHazard | №0804 |
| Sunwatcher | №0790 |
| superior | №0660 |
| superiorInspiration | №0643 |
| superiorInterdict | №0693 |
| superiorInterdictRestore | №0693 |
| superiorityDice | №0643 |
| supernal | №0774 (+ 1 других файлов) |
| supported | №0053 (+ 1 других файлов) |
| supportFetchAPI | №0881 |
| supportRangeFt | №0774 |
| suppressAilments | №0774 |
| suppressResistanceAndImmunity | №0774 |
| surface | №0061 |
| surfaceMaxDistance | №1116 (+ 1 других файлов) |
| surfaceMeanDistance | №1107 (+ 3 других файлов) |
| surfaceMedianDistance | №1107 (+ 3 других файлов) |
| surfaceP95Distance | №1107 (+ 3 других файлов) |
| surpriseAttack | №0774 |
| surveySettlement | №0774 |
| surveyWilderness | №0774 |
| survival | №0767 (+ 2 других файлов) |
| survive | №0730 |
| survivor | №0643 |
| suspended | №0650 (+ 1 других файлов) |
| sutureCost | №0804 |
| sutureOptions | №0804 |
| swamp | №0058 (+ 2 других файлов) |
| swapCard | №0816 |
| swappedTurns | №0816 (+ 2 других файлов) |
| swapWithThrallRangeFt | №0804 |
| swarm | №0056 (+ 2 других файлов) |
| swarm_bats | №1271 |
| swarm_beetles | №1271 |
| swarm_rats | №1271 |
| swarmCore | №0056 |
| swarmFloor | №0056 |
| swarmForm | №0058 (+ 3 других файлов) |
| swarmParts | №0056 |
| swarmPercent | №0058 (+ 3 других файлов) |
| swarmUnit | №0056 |
| swarmVortex | №0056 |
| sweep | №0056 (+ 1 других файлов) |
| sweepAttack | №0774 |
| sweepingStrike | №0774 |
| sweetDreams | №0774 |
| sweetScience | №0711 |
| swept | №0061 |
| swift | №0774 |
| Swiftblade | №0790 |
| swiftJinx | №0774 |
| swimFt | №0636 |
| swimSpeed | №0774 |
| swimSpeedEqualsWalking | №0774 |
| swine | №0769 |
| switchAlly | №0774 |
| swords | №0813 (+ 1 других файлов) |
| symbiosis | №0811 |
| sync | №0073 (+ 19 других файлов) |
| syncClassResources | №0643 |
| syncFromInitiative | №1180 |
| syncState | №0072 |
| syncTarotEntity | №0813 |
| synergy | №0074 |
| t | №0053 (+ 1 других файлов) |
| tab | №0844 (+ 3 других файлов) |
| table | №0062 (+ 18 других файлов) |
| tacticalExploit | №0734 |
| tacticalReposition | №0774 |
| tacticalSkill | №0734 |
| tacticalSuperiority | №0734 |
| tactician | №0777 (+ 1 других файлов) |
| Tactician | №0790 |
| tag | №0056 (+ 1 других файлов) |
| tagName | №1216 |
| tags | №0056 (+ 28 других файлов) |
| tail | №0056 |
| tailColor | №0061 (+ 3 других файлов) |
| tailCurve | №0061 (+ 1 других файлов) |
| tailLength | №0061 (+ 5 других файлов) |
| tailoring | №0057 |
| tailThickness | №0061 (+ 3 других файлов) |
| tailTip | №0058 (+ 1 других файлов) |
| tailTuftSize | №0061 (+ 1 других файлов) |
| takeAttack | №0830 |
| talent | №0774 |
| talentProgression | №0709 |
| talents | №0709 (+ 1 других файлов) |
| tannin | №0668 |
| target | №0056 (+ 46 других файлов) |
| targetAc | №0806 (+ 3 других файлов) |
| targetCount | №0774 |
| targetDefeated | №0650 (+ 3 других файлов) |
| targetedAllyAdvantage | №0774 |
| targetEntries | №1117 (+ 1 других файлов) |
| targetExtraRadiant | №0798 |
| targetFile | №1117 (+ 1 других файлов) |
| targetId | №0055 (+ 33 других файлов) |
| targetKey | №0072 |
| targetLevel | №0695 |
| targetMode | №0862 |
| targetName | №0779 (+ 2 других файлов) |
| targetOncePerLongRest | №0804 |
| targetPeerId | №0806 |
| targetRadiantDamage | №0774 |
| targetRequired | №0774 |
| targets | №0073 (+ 12 других файлов) |
| targetSelfOrTouch | №0774 |
| targetsFatigueRadiusFt | №0774 |
| targetsUpTo | №0774 |
| targetTurns | №0636 |
| targetType | №0808 |
| tarotActorRef | №0813 |
| tarotCoin | №0813 |
| tarotEffects | №1099 |
| tarotKnowledge | №1099 |
| tarotLastStartedTurn | №1099 |
| tarotModeApplied | №0650 (+ 1 других файлов) |
| tarotOwnerId | №0813 |
| tarotReaction | №0650 |
| tarotScene | №0650 (+ 14 других файлов) |
| taunt | №0771 (+ 1 других файлов) |
| team | №0073 (+ 8 других файлов) |
| teamAttackBonus | №0813 |
| techniques | №0830 |
| telekinesis | №0771 (+ 1 других файлов) |
| telekinesisLiftBonus | №0774 |
| telekinetic | №0777 |
| telekineticForce | №0774 |
| telekineticPush | №0774 |
| telepathic | №0777 |
| telepathicIntrusion | №0774 |
| telepathicIntrusionSave | №0774 |
| telepathy | №0774 |
| telepathyFt | №0771 |
| teleport | №0073 |
| teleportAllyId | №0814 (+ 2 других файлов) |
| teleportBetweenPaint | №0073 |
| teleportDamage | №0774 |
| teleported | №0813 |
| teleportFt | №0681 (+ 3 других файлов) |
| teleportNearTarget | №0774 |
| teleportRangeFt | №0804 |
| teleportSave | №0774 |
| teleportToImpact | №0073 |
| teleportWithFamiliar | №0808 |
| temp | №0781 (+ 3 других файлов) |
| tempAbsorbed | №0650 |
| temperament | №0796 |
| tempHp | №0073 (+ 19 других файлов) |
| tempHP | №0808 (+ 3 других файлов) |
| tempHpAtStartTurn | №0774 |
| tempHpBonus | №0774 |
| tempHpDice | №0774 |
| tempHpEach | №0774 |
| tempHpFromCharnel | №0804 |
| tempHpFromLightningDamage | №0774 |
| tempHpFromSealDamage | №0774 |
| tempHpOnApplause | №0771 |
| tempHpOnEnemyReducedToZero | №0774 |
| tempHpOnWake | №0774 |
| tempHpPerDie | №0774 |
| template | №0056 |
| templateNormals | №0056 |
| templates | №0652 |
| temple | №0796 (+ 1 других файлов) |
| temporary | №0774 |
| temporaryHp | №0777 |
| temporaryHP | №0073 |
| terrain | №0873 |
| terrorAndDecay | №0774 |
| terrorDie | №0774 |
| terrorizingForce | №0693 |
| test | №1070 |
| testMode | №0837 (+ 1 других файлов) |
| tests | №0849 |
| tethered | №0774 |
| TEXCOORD_0 | №1113 |
| texLoc | №0068 |
| text | №0807 (+ 2 других файлов) |
| textContent | №1216 |
| textile | №0665 |
| texture | №0057 (+ 4 других файлов) |
| Texture | №0065 |
| textures | №0068 (+ 1 других файлов) |
| textureTile | №0057 |
| thaumaturgy | №0774 |
| thaumaturgyEnhanced | №0804 |
| thenResistance | №0636 |
| thievesToolsBonus | №0774 |
| thieving | №0774 |
| thighL | №0054 |
| thighR | №0054 |
| thirdDisciplineLevel | №0709 |
| thirdparty | №0655 |
| thornsDice | №0864 |
| thrallAdvantage | №0804 |
| thrallAura | №0804 |
| thrallDance | №0804 |
| thrallDeathExplosion | №0804 |
| thrallEthereal | №0804 |
| thrallFlight | №0804 |
| thrallInvisible | №0804 |
| thralls | №0804 |
| thrallSlots | №0804 |
| thrallType | №0804 |
| thrallTypes | №0804 |
| thread | №0662 (+ 4 других файлов) |
| thresholds | №0800 |
| thrillOfTheHunt | №0774 |
| thrownRange | №0774 |
| thunder | №0643 |
| tiedMaximumsAllActive | №0864 |
| tier | №0660 |
| tights | №0057 |
| tile | №0057 |
| tiles | №0066 (+ 2 других файлов) |
| time | №0056 (+ 14 других файлов) |
| timeFrozen | №0813 |
| timelessBody | №0643 |
| timeMinutes | №1068 |
| timeout | №1109 (+ 37 других файлов) |
| timer | №0842 |
| times | №0063 |
| timeStop | №0813 |
| tinker | №0665 (+ 3 других файлов) |
| tinkerer | №0666 |
| tinOre | №0668 |
| tiny | №0811 (+ 1 других файлов) |
| tinyServant | №1173 |
| tissue | №0053 (+ 1 других файлов) |
| title | №0637 (+ 5 других файлов) |
| to | №0627 (+ 2 других файлов) |
| toad | №0681 |
| toggle | №0655 (+ 1 других файлов) |
| toggleCondition | №0650 (+ 3 других файлов) |
| toHit | №0869 (+ 3 других файлов) |
| token | №0648 (+ 3 других файлов) |
| tokenList | №1215 (+ 2 других файлов) |
| tokens | №0066 (+ 27 других файлов) |
| tombGuardian | №0774 |
| tool | №0621 (+ 20 других файлов) |
| toolBonus | №0803 |
| toolMastery | №0813 |
| toolName | №1068 |
| toolProficiencies | №0619 (+ 2 других файлов) |
| toolRequired | №0873 |
| tools | №0073 (+ 27 других файлов) |
| toolsAdvantage | №0813 |
| top | №0058 (+ 12 других файлов) |
| top10LargestMapped | №1118 |
| topknot | №0056 (+ 1 других файлов) |
| topY | №0057 |
| torso | №0056 (+ 2 других файлов) |
| torsoRidgeSize | №0061 (+ 4 других файлов) |
| torsoRidgeWidth | №0061 (+ 2 других файлов) |
| tortle | №1288 |
| total | №0623 (+ 53 других файлов) |
| total_length | №1110 |
| totalCp | №0794 |
| totalDomination | №0774 |
| totalGp | №0797 |
| totalLeather | №0658 |
| totalLength | №1119 |
| totalLevel | №0822 |
| totals | №1723 |
| totemSpirit | №0643 |
| toTheMat | №0774 |
| touchCurseThreshold | №0804 |
| touchedGlbVertexPct | №1118 |
| touchedGlbVertices | №1118 |
| touchMaxHpCut | №0804 |
| touchParalyzeThreshold | №0804 |
| touchRangeBonusFt | №0804 |
| touchThreshold | №0804 |
| towerShield | №0866 |
| town | №0062 |
| toxins | №0665 |
| toyArmy | №0804 |
| toymaker | №0804 |
| toySoulVault | №0804 |
| track | №0077 |
| trackInscribedRunesAnyPlane | №0774 |
| traderCount | №0795 |
| traderId | №0796 |
| traders | №0794 (+ 1 других файлов) |
| TRADERS | №0794 |
| tradition | №0808 (+ 1 других файлов) |
| traditionAction | №0808 |
| traditionRites | №0702 |
| traditions | №0702 (+ 1 других файлов) |
| trainHumanoids | №0774 |
| traits | №0653 (+ 2 других файлов) |
| transactionRevision | №0806 |
| transcended | №0709 (+ 1 других файлов) |
| Transcended | №0790 |
| transfer | №0811 |
| transferCondition | №0774 |
| transferDamage | №0774 |
| transferringAffliction | №0774 |
| transform | №0804 |
| transformed | №0813 |
| translation | №1073 |
| transport | №0805 |
| transposition | №0774 |
| traps | №0665 |
| treasure | №0062 |
| triangles | №0058 (+ 4 других файлов) |
| trickster | №0816 (+ 2 других файлов) |
| tricksterStatus | №0816 |
| tricksterTurn | №0813 |
| trigger | №0774 (+ 3 других файлов) |
| triggerDamageTypes | №0636 |
| triggerHealing | №0798 |
| triggerId | №0650 (+ 2 других файлов) |
| triggerMiraculousHealing | №0774 |
| triggerOnNearbyKill | №0636 |
| triggerOnPsychicDamage | №0774 |
| triggerSpend | №0804 |
| trough | №0062 |
| trousers | №0057 |
| trueSight | №0808 |
| truesightFt | №0774 |
| trunkSize | №0061 (+ 1 других файлов) |
| truth | №0798 |
| truthful | №0813 |
| truthfulIds | №0813 |
| ts | №0846 |
| turn | №0804 |
| turned | №0643 |
| turnEnd | №0813 |
| turnId | №1156 |
| turnIds | №0816 (+ 1 других файлов) |
| turnResources | №0073 (+ 34 других файлов) |
| turns | №0636 |
| turnStart | №0813 |
| turnUndead | №0643 |
| turtle | №0056 |
| tuskSize | №0061 (+ 2 других файлов) |
| twin_braids | №0056 (+ 1 других файлов) |
| twin_tails | №0056 (+ 1 других файлов) |
| twinFamiliar | №0774 |
| twinned | №0643 |
| twoRevelations | №0808 |
| type | №0065 (+ 113 других файлов) |
| typedDice | №0813 |
| typedExtraDice | №0073 (+ 3 других файлов) |
| typeKey | №0869 (+ 4 других файлов) |
| types | №0669 |
| u | №0056 (+ 1 других файлов) |
| uiGather | №0076 |
| uiRequired | №0709 |
| umbralImprecation | №0774 |
| unarmed | №0774 |
| unarmedAttack | №0636 (+ 3 других файлов) |
| unarmedAttackBonus | №0774 |
| unarmedDamage | №0774 |
| unarmedGraft | №1068 |
| unarmoredAC | №0774 |
| unavailable | №0072 (+ 11 других файлов) |
| unavoidableAccident | №0774 |
| unbreakable | №0636 (+ 2 других файлов) |
| Unbreakable | №0774 |
| unbreakableExploit | №0774 |
| unbridledChaos | №0774 |
| uncannyDodge | №0643 |
| unchanged | №1112 |
| uncommon | №0788 (+ 5 других файлов) |
| unconsciousAtFatigueGteCurrentHp | №0774 |
| unconsciousOrStunnedOnly | №0774 |
| undead | №0623 (+ 15 других файлов) |
| undeadFocusAvailable | №0636 |
| undeadFocusReaction | №0636 |
| undercut | №0056 (+ 1 других файлов) |
| underdark | №0058 |
| underwaterDarkvision | №0828 |
| underwear | №0057 |
| underwearBottom | №0061 (+ 5 других файлов) |
| underwearTop | №0061 (+ 6 других файлов) |
| undo | №0058 |
| undying | №0636 (+ 2 других файлов) |
| undyingServitude | №0804 |
| unequip | №0061 |
| unerringEye | №0774 |
| unfortunateAccident | №0774 |
| ungulate | №0769 |
| uniforms | №1069 |
| uniquePositionVertexCounts | №1119 |
| unit | №0056 (+ 4 других файлов) |
| unitGp | №0797 |
| units | №0794 |
| unknown | №1074 (+ 1 других файлов) |
| unleashed | №0709 (+ 1 других файлов) |
| unlimitedHybrid | №0774 |
| unlockRank | №0665 |
| unlockSchedule | №0816 |
| unreducedNecrotic | №0774 |
| unreducedSelfDamage | №0774 |
| unreducible | №0774 |
| unrivaledGenius | №0824 |
| unsealed | №0636 |
| unsealedArcana | №0636 |
| unsealedAspectReplacement | №0839 |
| unseen | №1178 |
| unshackledPower | №0774 |
| unstable | №0074 (+ 1 других файлов) |
| unstoppable | №0866 |
| unsupported | №0072 (+ 17 других файлов) |
| until | №0073 (+ 1 других файлов) |
| untilDismissed | №0774 |
| untilOwnEnd | №0813 |
| untilOwnEndAfterNext | №0813 |
| untilOwnerEnd | №0813 (+ 1 других файлов) |
| untilOwnerStart | №0813 |
| untilOwnStart | №0813 (+ 2 других файлов) |
| untilRound | №0813 |
| untouched | №1723 |
| unwaveringWill | №0734 |
| unyieldingResolve | №0730 |
| unyieldingWill | №0824 |
| update | №0825 (+ 1 других файлов) |
| updateAvailable | №0837 |
| updated | №0828 (+ 1 других файлов) |
| updated_at | №1099 |
| updatedAt | №0066 (+ 1 других файлов) |
| updateSwarm | №0056 |
| upperArmL | №0054 |
| upperArmR | №0054 |
| urbanAdvantage | №0771 |
| uri | №1108 |
| url | №0063 (+ 4 других файлов) |
| URL | №1191 (+ 5 других файлов) |
| urls | №0881 |
| ursine | №0769 |
| use | №0681 (+ 1 других файлов) |
| useCount | №0774 |
| used | №0619 (+ 21 других файлов) |
| usedBloodLevels | №0808 |
| usedBy | №0668 (+ 1 других файлов) |
| usedByV38 | №0667 (+ 1 других файлов) |
| usedCount | №0649 |
| usedLevels | №0808 |
| useDominantOrgan | №0864 |
| usedThisRound | №0800 |
| useFeature | №0073 (+ 16 других файлов) |
| useIntForStr | №0774 |
| useIntForStrengthOrDexOnSurge | №0774 |
| useLeadership | №0774 |
| user | №0648 (+ 1 других файлов) |
| userAgent | №0843 (+ 1 других файлов) |
| useRules | №0778 (+ 23 других файлов) |
| uses | №0693 (+ 5 других файлов) |
| usesAlchemistSupplies | №0806 |
| usesIntForPerception | №0774 |
| usesPerLongRest | №0073 (+ 2 других файлов) |
| usesPerRest | №0804 |
| usesPerTurn | №0774 |
| useSpiritAbility | №0779 |
| usesStrength | №0651 (+ 1 других файлов) |
| useStrength | №0774 |
| useStrengthWithBows | №0774 |
| useSubclassFeature | №0779 (+ 2 других файлов) |
| useTex | №1069 |
| useTexLoc | №0068 |
| uv | №0053 (+ 5 других файлов) |
| uvLoc | №0068 |
| v | №0053 (+ 2 других файлов) |
| V | №1146 |
| V52 | №1160 |
| V53 | №1161 |
| valiantLeader | №0734 |
| validate | №0815 |
| validatePack | №0656 |
| validateTurn | №0778 |
| value | №0055 (+ 26 других файлов) |
| valueGp | №0813 |
| valueMultiplier | №0660 |
| values | №0063 (+ 2 других файлов) |
| vampirism | №0072 |
| vanish | №0643 |
| variant | №0054 (+ 4 других файлов) |
| variantHooks | №0623 (+ 13 других файлов) |
| variants | №0073 (+ 2 других файлов) |
| VEC2 | №0063 (+ 4 других файлов) |
| VEC3 | №0063 (+ 4 других файлов) |
| VEC4 | №0063 (+ 4 других файлов) |
| vedalken | №0667 |
| vengefulBane | №0774 |
| venom | №0662 |
| Venom | №0075 |
| venomConcentrateV49 | №0662 |
| venomReagent | №0662 (+ 1 других файлов) |
| verbal | №0755 (+ 10 других файлов) |
| verbalBlocked | №0813 |
| verbalComponentsBlocked | №0073 |
| verify | №0648 |
| vermillion | №0636 |
| Vermillion | №0774 |
| vermin | №0769 |
| versatileAttackBonus | №0774 |
| versatileFightingAdvanced | №0774 |
| version | №0054 (+ 51 других файлов) |
| VERSION | №0054 (+ 56 других файлов) |
| vertexCount | №0058 (+ 1 других файлов) |
| vertexMask | №0054 |
| vertices | №0058 (+ 6 других файлов) |
| verticesPerRat | №0056 |
| very_rare | №0788 (+ 5 других файлов) |
| vesselMagic | №0839 |
| vessels | №0665 |
| vesselSlots | №0839 |
| vesselStrike | №0839 |
| vials | №0665 |
| victorySurgeExploit | №0774 |
| view | №0066 (+ 1 других файлов) |
| viewport | №1259 (+ 36 других файлов) |
| viewportHeight | №0058 |
| viewportWidth | №0058 |
| vileAffliction | №0774 |
| village | №0794 |
| vine | №0827 |
| vinegar | №0668 |
| violet | №0827 |
| visible | №0636 (+ 9 других файлов) |
| visibleMeleeOnly | №0774 |
| Vitality | №0075 |
| vitalitySplint | №0774 |
| voiceReagent | №0821 |
| volatility | №0075 |
| Volatility | №0075 |
| volume | №0056 (+ 1 других файлов) |
| volumes | №0056 |
| voluntarilyDetach | №0811 |
| voraciousWeapon | №0774 |
| vowOfEnmity | №0643 (+ 1 других файлов) |
| vpLoc | №0068 |
| vulnerabilities | №0650 (+ 9 других файлов) |
| vulnerability | №0636 (+ 2 других файлов) |
| vulnerable | №0845 (+ 1 других файлов) |
| w | №0053 (+ 10 других файлов) |
| wagerCurrent | №0816 |
| wagerMax | №0816 |
| wagerOdds | №0816 |
| wagers | №0816 (+ 1 других файлов) |
| wagerStartCheck | №0813 |
| waist | №0058 (+ 6 других файлов) |
| waiveSacrificeDamage | №0774 |
| wakeMageSleeper | №0813 |
| wall | №0066 |
| WALL | №0067 |
| wall_brick_red | №0067 |
| wall_concrete | №0067 |
| wall_half_timber | №0067 |
| wall_marble_dark | №0067 |
| wall_marble_light | №0067 |
| wall_moss_stone | №0067 |
| wall_old_plaster | №0067 |
| wall_plaster_dark | №0067 |
| wall_plaster_light | №0067 |
| wall_plaster_panel | №0067 |
| wall_slate | №0067 |
| wall_stone_dark | №0067 |
| wall_stone_light | №0067 |
| wall_stone_masonry | №0067 |
| wall_wallpaper | №0067 |
| wall_white_plaster | №0067 |
| wall_wood_dark | №0067 |
| wall_wood_light | №0067 |
| wallClimb | №0804 |
| walls | №0066 (+ 16 других файлов) |
| wallStart | №0621 |
| wandering | №0709 (+ 1 других файлов) |
| wands | №0813 (+ 1 других файлов) |
| wands_02 | №0813 |
| wantedCp | №0796 (+ 1 других файлов) |
| war_caster | №0777 |
| warCry | №0774 |
| ward | №0650 |
| wardAbsorbed | №0650 |
| wardDenied | №0650 |
| Warden | №0790 |
| wardenInterrupt | №0650 |
| wardenSource | №0790 |
| wardenSurvive | №0650 |
| warforged | №0667 |
| warfront | №1169 |
| warfrontEligible | №0626 |
| warlock | №0793 (+ 1 других файлов) |
| warlockLevelEquivalent | №0774 |
| Warlord | №0790 |
| warlordSource | №0790 |
| warning | №0659 |
| warPriest | №0643 |
| warriorPoet | №0774 |
| warsong | №0774 |
| warSongs | №0771 |
| waste | №0821 |
| wasteland | №0794 |
| water | №0667 (+ 1 других файлов) |
| waterBreathing | №0073 (+ 2 других файлов) |
| waterCore | №0821 |
| waterEssence | №0821 |
| wave | №0056 |
| wavy_bob | №0056 (+ 1 других файлов) |
| wavy_long | №0056 (+ 1 других файлов) |
| wax | №0663 (+ 2 других файлов) |
| Weakness | №0075 |
| weapon | №0062 (+ 13 других файлов) |
| weaponAttack | №0650 (+ 22 других файлов) |
| weaponAttackBonus | №0808 |
| weaponBonus | №0808 |
| weaponDamage | №0808 |
| weaponDamageType | №0774 |
| weaponFunctional | №1163 |
| weaponId | №0073 (+ 14 других файлов) |
| weaponMastery | №0730 |
| weaponMasteryLevels | №0730 |
| weaponOnly | №0813 |
| weaponProficiency | №0808 |
| weapons | №0788 (+ 66 других файлов) |
| weaponsData | №0619 (+ 2 других файлов) |
| weaponsmith | №0796 (+ 1 других файлов) |
| weaponTeleportIfDistanceGtFt | №0774 |
| weaponValue | №1163 |
| weaponWear | №1101 |
| wearForArmor | №0661 |
| wearForAttack | №0661 |
| wearRatio | №0660 |
| weasel | №0681 |
| weaver | №0663 (+ 6 других файлов) |
| webgl | №1267 |
| webPreferences | №0881 |
| webSecurity | №0881 |
| weight | №0060 (+ 48 других файлов) |
| weights | №0053 (+ 3 других файлов) |
| weld | №0053 |
| White | №0771 (+ 1 других файлов) |
| whiteHot | №0774 |
| width | №0058 (+ 48 других файлов) |
| wildCharge | №0774 |
| wildernessIntel | №0774 |
| wildMagicSurge | №0643 |
| wildShape | №0643 (+ 1 других файлов) |
| wildspace | №0625 (+ 1 других файлов) |
| wildspaceEligible | №0625 |
| wildwood | №0058 |
| willControlledBy | №0864 |
| willingTargetIds | №0814 (+ 1 других файлов) |
| window | №0062 (+ 77 других файлов) |
| wingColor | №0061 (+ 3 других файлов) |
| wingSize | №0061 (+ 1 других файлов) |
| wis | №0619 (+ 54 других файлов) |
| wisChecksAdvantage | №0636 (+ 1 других файлов) |
| wisChecksDisadvantage | №0636 (+ 1 других файлов) |
| wisdom | №0781 (+ 9 других файлов) |
| wisdomCheckAdvantage | №0808 |
| wisdomSaveAdvantage | №0774 |
| wisSave | №0774 |
| wisSavesDisadvantage | №0636 (+ 1 других файлов) |
| Witch | №0702 |
| witchCurse | №0774 |
| witchItemFlySpeed | №0804 |
| with | №0800 |
| withering | №0073 |
| withFileTypes | №0883 (+ 1 других файлов) |
| within10CellsPct | №1116 |
| within2CellsPct | №1116 |
| within5CellsPct | №1116 |
| within5GridCellsPct | №1121 |
| withinCellPct | №1116 |
| withinGridCellPct | №1121 |
| wizard | №0793 (+ 1 других файлов) |
| won | №0816 |
| wood | №0062 (+ 6 других файлов) |
| woodcarver | №0665 (+ 3 других файлов) |
| wooden | №0062 |
| woodwork | №0663 (+ 1 других файлов) |
| wool | №0057 |
| wordsOfAdamance | №0774 |
| wordsOfBenediction | №0774 |
| wordsOfDamnation | №0774 |
| wordsOfDomination | №0774 |
| wordsOfLegend | №0774 |
| wordsOfMayhem | №0774 |
| wordsOfZeal | №0774 |
| worg | №0681 |
| worldActor | №0069 |
| worldId | №0873 |
| worldMatrices | №0063 |
| worn | №0659 |
| wrapS | №0058 (+ 1 других файлов) |
| wrapT | №0058 (+ 1 других файлов) |
| wretchedCastigation | №0774 |
| writable | №0813 |
| write | №0073 (+ 1 других файлов) |
| x | №0056 (+ 47 других файлов) |
| xanathar | №0623 |
| xenoNecroticReady | №1067 |
| xp | №0623 (+ 16 других файлов) |
| xpFor | №0800 |
| xu | №0053 |
| xv | №0053 |
| xx | №0053 |
| xy | №0053 |
| y | №0056 (+ 44 других файлов) |
| yaw | №0056 (+ 2 других файлов) |
| yeast | №0667 |
| yew | №0668 |
| yieldMult | №0803 |
| yieldMultiplier | №0667 |
| yu | №0053 |
| yuan_ti | №0667 |
| yv | №0053 |
| yy | №0053 |
| z | №0056 (+ 3 других файлов) |
| zealousWords | №0771 |
| zeroHp | №0813 |
| zeroHpReaction | №0650 (+ 4 других файлов) |
| zeroHpSave | №0774 |
| zincOre | №0668 |
| zoneRadiusFt | №0774 |
| zones | №0066 (+ 1 других файлов) |
| zoom | №0065 (+ 3 других файлов) |

### Ключи localStorage (26)

| Имя | Исходные файлы |
|---|---|
| dnd_app_alpha | №0827 |
| dnd_app_font | №0827 |
| dnd_app_frame_color | №0827 |
| dnd_app_frame_style | №0827 |
| dnd_app_theme | №0827 |
| dnd_autorotate_enabled | №0863 |
| dnd_autorotate_interval | №0863 |
| dnd_campaigns_v1 | №0805 (+ 1 других файлов) |
| dnd_character_appearance_draft_v1 | №1267 |
| dnd_characters | №0826 |
| dnd_current_character_id | №0826 (+ 1 других файлов) |
| dnd_custom_races | №0819 |
| dnd_debug_enabled | №0827 (+ 2 других файлов) |
| dnd_launcher_icon | №0827 (+ 2 других файлов) |
| dnd_market_v55_state | №0797 (+ 1 других файлов) |
| dnd_modal_color | №0065 (+ 1 других файлов) |
| dnd_modal_opacity | №0065 (+ 1 других файлов) |
| dnd_multi_characters_v2 | №0619 (+ 44 других файлов) |
| dnd_selected_wallpaper | №0863 |
| dnd_ui_color | №0065 (+ 1 других файлов) |
| dnd_ui_opacity | №0065 (+ 1 других файлов) |
| dnd_v53_world_id | №0873 |
| dnd_v71_onboarding_done | №0810 (+ 1 других файлов) |
| dnd_vtt_mobile_session_v67 | №1238 |
| dnd_wallpaper_dim | №0863 |
| dndContentEnabled | №0656 |

### CSS переменные (16)

| Имя | Исходные файлы |
|---|---|
| --accent-action | №0832 |
| --accent-danger | №0832 |
| --accent-primary | №0832 |
| --accent-success | №0832 |
| --bg-box | №0832 |
| --bg-card | №0832 |
| --bg-input | №0832 |
| --bg-main | №0832 |
| --border-color | №0832 |
| --border-input | №0832 |
| --dnd-frame-art | №0832 |
| --dnd-frame-color | №0832 |
| --dnd-frame-filter | №0832 |
| --text-labels | №0832 |
| --text-main | №0832 |
| --text-muted | №0832 |

### Python/Java идентификаторы (342)

| Имя | Исходные файлы |
|---|---|
| __DND_APP_BOOT_READY | №0044 |
| __name__ | №0004 (+ 5 других файлов) |
| a | №0043 |
| aa | №0043 |
| action | №1298 |
| active | №0043 (+ 1 других файлов) |
| activeFile | №0043 |
| activeRoot | №0044 |
| activeVersion | №0043 |
| activity | №0043 |
| aliases | №0043 |
| aligned | №1688 |
| android | №1308 |
| animationClips | №1253 |
| ap | №1258 |
| apk | №1619 (+ 1 других файлов) |
| apkBytes | №0043 |
| app | №1308 |
| app_path | №1308 |
| APP_VERSION | №1308 |
| archive | №1688 |
| archives | №1298 |
| area | №1253 |
| args | №1253 (+ 3 других файлов) |
| artifacts | №0005 (+ 1 других файлов) |
| attributes | №1253 |
| av | №0043 |
| axis | №1253 |
| b | №0043 (+ 2 других файлов) |
| badging | №1688 |
| baseUrl | №0043 |
| bb | №0043 |
| binary | №1253 |
| blob | №0004 |
| blobs | №0005 |
| bones | №1253 |
| BRANCH | №0004 (+ 1 других файлов) |
| buf | №0043 |
| buffer | №1253 |
| bv | №0043 |
| bytes | №0043 (+ 2 других файлов) |
| c | №0043 (+ 4 других файлов) |
| cache | №0043 |
| cacheBytes | №0043 |
| cacheKey | №0043 |
| candidates | №0043 (+ 1 других файлов) |
| canonical | №0043 |
| capture | №1688 |
| capture_output | №0004 |
| catalog | №1298 |
| category | №1306 |
| cert | №1688 (+ 1 других файлов) |
| CERT | №1688 |
| certificate | №0004 |
| checksums | №0004 |
| children | №0043 |
| choices | №1258 (+ 1 других файлов) |
| chunk | №1253 |
| ci | №1690 |
| code | №1308 (+ 1 других файлов) |
| Code | №1688 (+ 1 других файлов) |
| codeCache | №0043 |
| codeCacheBytes | №0043 |
| component | №0043 |
| connectedComponents | №1253 |
| context | №0043 |
| count | №1253 (+ 1 других файлов) |
| counts | №1253 |
| created | №0005 |
| current | №1308 (+ 1 других файлов) |
| d | №1257 |
| data | №0004 (+ 5 других файлов) |
| dataBytes | №0043 |
| dataRoot | №0043 |
| default | №1258 (+ 1 других файлов) |
| defaultFile | №0043 |
| degenerateTriangles | №1253 |
| descriptor | №0004 (+ 1 других файлов) |
| dest | №0005 (+ 1 других файлов) |
| destination | №0004 (+ 1 других файлов) |
| detected | №1258 |
| digest | №0004 (+ 1 других файлов) |
| dir | №1688 |
| dirs | №0043 |
| dklen | №1688 |
| dndvtt_update | №0043 |
| document | №1253 |
| downloadedBytes | №0043 |
| dtype | №1253 |
| edges | №1253 |
| editorMorphs | №1253 |
| embeddedMorphChannels | №1253 |
| enabled | №0043 |
| encoding | №0004 (+ 4 других файлов) |
| encrypted | №1688 (+ 1 других файлов) |
| ensure_ascii | №0004 (+ 6 других файлов) |
| entries | №1299 (+ 1 других файлов) |
| entry | №0043 (+ 1 других файлов) |
| env | №0005 (+ 1 других файлов) |
| errors | №1298 |
| EXCLUDE_DIRS | №1306 |
| executor | №0043 |
| exist_ok | №0004 (+ 4 других файлов) |
| existing | №0004 |
| expected_cert | №0004 |
| expected_name | №0004 |
| expectedBytes | №0043 |
| expectedHash | №0043 |
| export_apply | №1298 |
| export_format | №1298 |
| ext | №1258 (+ 1 других файлов) |
| f | №0043 (+ 1 других файлов) |
| faces | №1253 |
| failed | №0005 |
| feed | №0004 (+ 2 других файлов) |
| file | №0043 (+ 2 других файлов) |
| filepath | №1298 |
| files | №0005 (+ 6 других файлов) |
| filesBytes | №0043 |
| flags | №1619 |
| flush | №0004 |
| folder | №1690 |
| fp | №1299 |
| GENERATED | №1306 |
| git_sha | №0004 |
| GITHUB_EVENT_NAME | №1690 |
| GITHUB_REF | №1690 |
| GITHUB_REPOSITORY | №1690 |
| GITHUB_SHA | №1690 |
| goToTab | №0044 |
| gradle | №1308 |
| gradle_path | №1308 |
| gx | №1257 |
| gy | №1257 |
| h | №1258 (+ 1 других файлов) |
| header | №1688 |
| headers | №0004 |
| healthy | №0044 |
| height | №1257 |
| help | №1308 |
| i | №0043 (+ 1 других файлов) |
| iconId | №0043 |
| id | №0043 |
| ids | №1253 |
| image | №1257 |
| in | №0043 |
| indent | №0004 (+ 5 других файлов) |
| indexComponentType | №1253 |
| info | №0043 |
| intent | №1619 |
| item | №0004 (+ 2 других файлов) |
| k | №1298 |
| keepPrevious | №0043 |
| key | №1298 (+ 2 других файлов) |
| kind | №0005 (+ 2 других файлов) |
| landscapeActive | №0044 |
| latest | №0004 (+ 1 других файлов) |
| len | №0043 |
| length | №0043 (+ 2 других файлов) |
| lines | №1298 |
| link | №1298 |
| live_feed | №0004 |
| loader | №0044 |
| lower | №0043 |
| m | №1258 (+ 4 других файлов) |
| manifest | №0004 (+ 3 других файлов) |
| MANIFEST | №1306 |
| MANIFEST_PATHS | №1306 |
| manifestUrl | №0043 |
| marker | №1298 |
| materials | №1253 |
| meshes | №1298 |
| meshMetadata | №1253 |
| metavar | №1308 |
| missing | №1688 |
| missing_ok | №1298 (+ 1 других файлов) |
| module | №0005 |
| morphNames | №1253 |
| n | №0043 (+ 2 других файлов) |
| N | №1257 |
| name | №0043 (+ 2 других файлов) |
| names | №1688 |
| nativeSeedValidated | №0043 |
| newCode | №1619 |
| next | №0043 (+ 1 других файлов) |
| noBackup | №0043 |
| noBackupBytes | №0043 |
| nonce | №1688 |
| nonFiniteValues | №1253 |
| o | №0043 |
| objects | №1298 |
| offset | №0004 (+ 1 других файлов) |
| oldCode | №1619 |
| original | №0005 |
| out | №0043 (+ 6 других файлов) |
| p | №1258 (+ 1 других файлов) |
| package | №1308 |
| PACKAGE | №1688 |
| packageVersion | №0043 |
| parent | №0043 (+ 1 других файлов) |
| parents | №0005 (+ 5 других файлов) |
| parser | №1253 (+ 2 других файлов) |
| parts | №1253 |
| password | №1688 |
| path | №0004 (+ 3 других файлов) |
| payload | №1688 |
| pending | №0043 |
| physicalAndroidQa | №1688 |
| pixels | №1253 (+ 1 других файлов) |
| pkg | №1308 |
| pkg_path | №1308 |
| plaintext | №1688 |
| platform | №0004 |
| pm | №0043 (+ 1 других файлов) |
| pores | №1257 |
| positions | №1253 |
| prefix | №0005 (+ 1 других файлов) |
| prefs | №0043 |
| previewRoot | №0043 |
| previous | №0004 (+ 2 других файлов) |
| previousDir | №0043 |
| previousRequestedOrientation | №0044 |
| primitives | №1253 |
| PUBLISHED_APK_SHA | №1688 |
| pushed | №0005 |
| raw | №0043 |
| rawBounds | №1253 |
| reach | №1257 |
| received | №0043 |
| records | №1298 |
| rel | №1306 |
| relative | №1298 |
| REPO | №0004 (+ 1 других файлов) |
| report | №0004 (+ 3 других файлов) |
| request | №0004 (+ 1 других файлов) |
| required | №1253 (+ 2 других файлов) |
| restore | №0044 |
| result | №1619 |
| return_counts | №1253 |
| return_inverse | №1253 |
| return_value | №1690 |
| returncode | №0004 |
| rng | №1257 |
| root | №0005 (+ 6 других файлов) |
| ROOT | №1253 (+ 4 других файлов) |
| root_url | №1258 |
| rootEntries | №0043 |
| roots | №1253 |
| rough | №1257 |
| RUNNER_TEMP | №1690 |
| runtime | №1690 |
| RUNTIME_MANIFEST | №1306 |
| s | №0043 (+ 1 других файлов) |
| scene | №1690 |
| schema | №1253 (+ 1 других файлов) |
| sdk | №0004 (+ 1 других файлов) |
| seamDuplicates | №1253 |
| seen | №1258 (+ 1 других файлов) |
| selected | №0043 |
| selectedIndex | №0043 |
| separators | №1299 (+ 1 других файлов) |
| settings | №1688 (+ 1 других файлов) |
| sha | №0005 |
| sha256 | №1253 (+ 1 других файлов) |
| signers | №0004 |
| signingCertificateSha256 | №1688 |
| sigs | №1619 |
| skins | №1253 |
| skipped | №1298 |
| source | №0005 (+ 2 других файлов) |
| sourceCommit | №1688 |
| spec | №0005 (+ 1 других файлов) |
| src | №0043 |
| stack | №0043 |
| stage | №1688 |
| staged | №0043 |
| stageRoot | №0043 |
| standalone | №1298 |
| state | №0043 |
| status | №1688 |
| stderr | №1688 |
| store | №1688 |
| strides | №1253 |
| sums | №0004 |
| tag | №0004 |
| target | №0043 (+ 2 других файлов) |
| targets | №0005 |
| temp | №1298 |
| text | №0004 (+ 4 других файлов) |
| ti | №0043 |
| timeout | №0004 |
| title | №0044 |
| topology | №1253 |
| total | №0043 |
| totalBytes | №0043 |
| totalFiles | №0043 |
| triangles | №1253 |
| type | №0043 (+ 2 других файлов) |
| uniquePositions | №1253 |
| unit | №0043 |
| units | №0043 |
| UNITY_ANDROID_KEYSTORE_BASE64 | №1690 |
| UNITY_CI_ARTIFACT_PASSWORD | №1690 |
| UNITY_EMAIL | №1690 |
| UNITY_PASSWORD | №1690 |
| UNITY_SERIAL | №1690 |
| updateBytes | №0043 |
| updater | №0044 |
| updateRoot | №0043 |
| uri | №1619 |
| url | №0004 (+ 2 других файлов) |
| use_global | №1298 |
| use_selection | №1298 |
| uv | №1253 |
| uvOutsideUnitSquare | №1253 |
| uvRange | №1253 |
| validate | №1688 |
| value | №0043 |
| verbosity | №1690 |
| verified | №0004 |
| version | №0004 (+ 3 других файлов) |
| Version | №1688 (+ 1 других файлов) |
| VERSION | №1306 |
| versionCode | №0005 (+ 1 других файлов) |
| versionName | №0043 (+ 1 других файлов) |
| versions | №0043 |
| versionsBytes | №0043 |
| vertices | №1253 |
| view | №1253 |
| visited | №0043 |
| VTT_PROJECT_MANIFEST_V70 | №1299 (+ 1 других файлов) |
| webView | №0044 |
| weights | №1253 |
| weightSumMaxError | №1253 |
| weldedBoundaryEdges | №1253 |
| weldedNonManifoldEdges | №1253 |
| weldTolerance | №1253 |
| width | №1253 |
| windows | №1690 |
| windowsFiles | №1688 |
| z | №1308 |
| zeroWeightVertices | №1253 |

### JSON поля (563)

| Имя | Исходные файлы |
|---|---|
| _builderBaseStats | №1635 (+ 1 других файлов) |
| abilities | №1635 (+ 1 других файлов) |
| ac | №1635 (+ 1 других файлов) |
| acBase | №1635 (+ 1 других файлов) |
| accepted | №1685 |
| acFormula | №1635 (+ 1 других файлов) |
| acidResistance | №1635 (+ 1 других файлов) |
| acrobatics | №1635 (+ 1 других файлов) |
| action | №0752 (+ 2 других файлов) |
| activeConditions | №1635 (+ 1 других файлов) |
| activeFolderId | №1685 |
| african | №0913 |
| age | №0913 (+ 2 других файлов) |
| allManifestEntriesMatchPhysicalZIP | №0900 (+ 1 других файлов) |
| allowToChangeInstallationDirectory | №1053 |
| allUnpackedSizesAndSHA256 | №0900 (+ 1 других файлов) |
| amount | №1685 |
| amphibious | №1635 (+ 1 других файлов) |
| android | №1057 (+ 2 других файлов) |
| androidDebug | №0917 |
| androidPackage | №1057 (+ 1 других файлов) |
| androidSignedRelease | №0917 |
| androidSigningCertificateSha256 | №1720 |
| animalHandling | №1635 (+ 1 других файлов) |
| animationClips | №0906 |
| answers | №1685 |
| app | №1727 (+ 2 других файлов) |
| appId | №1053 |
| arcana | №1635 (+ 1 других файлов) |
| arch | №1053 |
| archiveBytes | №0900 (+ 1 других файлов) |
| armLength | №0081 (+ 1 других файлов) |
| armLength-decr | №0081 (+ 1 других файлов) |
| armLength-incr | №0081 (+ 1 других файлов) |
| armor | №1635 (+ 1 других файлов) |
| arms | №0081 (+ 1 других файлов) |
| artifact | №0900 (+ 1 других файлов) |
| artifactBytes | №0900 (+ 1 других файлов) |
| artifactDigest | №0900 (+ 1 других файлов) |
| artifactName | №1053 |
| artifacts | №1057 (+ 2 других файлов) |
| asar | №1053 |
| asian | №0913 |
| assetId | №0746 (+ 13 других файлов) |
| athletics | №1635 (+ 1 других файлов) |
| attackType | №1635 |
| attributes | №0906 |
| audit | №0913 |
| author | №0746 (+ 11 других файлов) |
| background | №1635 (+ 1 других файлов) |
| backgroundFeature | №1635 (+ 1 других файлов) |
| backgroundLanguagesToChoose | №1635 (+ 1 других файлов) |
| backgrounds | №1635 |
| backslash | №0750 (+ 1 других файлов) |
| backslashTexture | №0750 (+ 1 других файлов) |
| balanced | №1106 |
| base | №1316 |
| baseAc | №1635 |
| baseAC | №1635 (+ 1 других файлов) |
| baseAcFormula | №1635 |
| baseColorFactor | №0906 |
| baseObj | №0081 (+ 1 других файлов) |
| basePositionsSha256 | №0081 (+ 1 других файлов) |
| baseUrl | №1727 (+ 2 других файлов) |
| binary | №0081 (+ 1 других файлов) |
| binarySha256 | №0081 (+ 1 других файлов) |
| binaryTransfer | №0915 |
| blockedVersions | №1727 (+ 2 других файлов) |
| bones | №0906 |
| bonuses | №1635 (+ 1 других файлов) |
| brave | №1635 (+ 1 других файлов) |
| breast-volume-decr | №0081 (+ 1 других файлов) |
| breast-volume-incr | №0081 (+ 1 других файлов) |
| breastSize | №0081 (+ 1 других файлов) |
| breathWeapon | №1635 (+ 1 других файлов) |
| build | №1053 |
| bytes | №1733 (+ 13 других файлов) |
| cases | №1685 |
| castingTime | №1635 |
| category | №1733 (+ 2 других файлов) |
| caucasian | №0913 |
| cell | №0746 (+ 17 других файлов) |
| cha | №1635 (+ 1 других файлов) |
| changedVertices | №0913 (+ 1 других файлов) |
| channel | №1057 (+ 4 других файлов) |
| channels | №0081 (+ 1 других файлов) |
| charge | №1635 (+ 1 других файлов) |
| charisma | №1635 |
| chest | №0906 (+ 2 других файлов) |
| choiceHistory | №1635 (+ 1 других файлов) |
| choices | №1635 |
| choiceState | №1635 (+ 1 других файлов) |
| chromiumQA | №0900 |
| class | №1635 (+ 1 других файлов) |
| classes | №1635 (+ 1 других файлов) |
| classFeaturesState | №1635 (+ 1 других файлов) |
| className | №1635 (+ 1 других файлов) |
| climb | №1635 (+ 1 других файлов) |
| cloudUnityBuildLicenseConfigured | №1720 |
| coinCases | №1685 |
| coinLog | №1685 |
| coins | №1685 |
| coldResistance | №1635 (+ 1 других файлов) |
| commit | №0081 (+ 1 других файлов) |
| components | №1635 |
| compositeTerms | №0913 |
| compositions | №0081 (+ 1 других файлов) |
| con | №1635 (+ 1 других файлов) |
| concentration | №1635 |
| conclusion | №0900 (+ 1 других файлов) |
| connectedComponents | №0906 |
| constitution | №1635 (+ 1 других файлов) |
| consumables | №1635 (+ 1 других файлов) |
| controlled | №0746 (+ 3 других файлов) |
| cost | №1635 (+ 1 других файлов) |
| count | №0081 (+ 5 других файлов) |
| cp | №1685 |
| cPerS | №1685 |
| craftBonuses | №1635 |
| CRC | №0900 (+ 1 других файлов) |
| createDesktopShortcut | №1053 |
| createStartMenuShortcut | №1053 |
| creation | №1635 |
| creationCases | №1685 |
| cupsize | №0913 |
| currentFloor | №0746 (+ 17 других файлов) |
| cutoff | №0913 |
| d | №0746 (+ 17 других файлов) |
| damage | №1635 (+ 1 других файлов) |
| damageType | №1635 (+ 1 других файлов) |
| darkness | №0746 (+ 17 других файлов) |
| darkvisionFt | №1635 (+ 1 других файлов) |
| debug | №0900 |
| deception | №1635 (+ 1 других файлов) |
| declaredSourceCommit | №0913 |
| defaultDependencyTypeInfo | №1713 |
| defaultInstantiationMode | №1713 |
| degenerateTriangles | №0906 |
| dependencies | №1696 (+ 1 других файлов) |
| dependencyTypeInfos | №1713 |
| depth | №1697 |
| derived | №1391 |
| desc | №1635 |
| description | №0746 (+ 16 других файлов) |
| destination | №1391 |
| destinationGender | №0913 |
| devDependencies | №1053 |
| dex | №1635 (+ 1 других файлов) |
| dexterity | №1635 (+ 1 других файлов) |
| directories | №1053 |
| doubleSided | №0906 |
| duration | №1635 |
| e | №0746 (+ 17 других файлов) |
| editorMorphs | №0906 |
| effect | №1635 (+ 1 других файлов) |
| electron | №1053 |
| electron-builder | №1053 |
| embeddedMorphChannels | №0906 |
| emitsLight | №0752 (+ 1 других файлов) |
| enclosed | №1106 |
| ep | №1685 |
| equipped | №1685 |
| eTexture | №0746 (+ 17 других файлов) |
| expected | №1685 |
| exportedMacros | №0913 |
| extraClassName | №1635 |
| extraClassType | №1635 |
| fail | №0900 (+ 1 других файлов) |
| feats | №1635 (+ 1 других файлов) |
| feature | №1635 |
| features | №1635 (+ 1 других файлов) |
| femaleStackTerms | №0913 |
| feyAncestry | №1635 (+ 1 других файлов) |
| file | №1635 (+ 1 других файлов) |
| fileCount | №1733 |
| files | №1733 (+ 9 других файлов) |
| fireResistance | №1635 (+ 1 других файлов) |
| firmness | №0913 |
| fixtureSha256 | №0913 (+ 1 других файлов) |
| flight | №1635 (+ 1 других файлов) |
| floor | №0746 (+ 3 других файлов) |
| floors | №0746 (+ 18 других файлов) |
| flow | №0900 |
| folder | №0081 (+ 3 других файлов) |
| folderCases | №1685 |
| folders | №1635 (+ 1 других файлов) |
| gender | №0913 (+ 2 других файлов) |
| generated | №1733 (+ 3 других файлов) |
| gitBlob | №0917 |
| glide | №1635 (+ 1 других файлов) |
| gp | №1685 |
| gPerE | №1685 |
| groupKey | №1635 (+ 1 других файлов) |
| h | №0746 (+ 17 других файлов) |
| hands | №1635 (+ 1 других файлов) |
| head | №0081 (+ 1 других файлов) |
| head-decr | №0081 (+ 1 других файлов) |
| head-incr | №0081 (+ 1 других файлов) |
| height | №0746 (+ 18 других файлов) |
| hero | №1685 |
| hips | №0906 (+ 2 других файлов) |
| history | №1635 (+ 1 других файлов) |
| hitDice | №1635 (+ 1 других файлов) |
| hitDie | №1635 |
| horns | №1635 (+ 1 других файлов) |
| hpBonusPerLevel | №1635 |
| hpCurrent | №1635 (+ 1 других файлов) |
| hpMax | №1635 (+ 1 других файлов) |
| human-female | №1302 |
| id | №0746 (+ 22 других файлов) |
| immunities | №1635 (+ 1 других файлов) |
| indexComponentType | №0906 |
| innateSpellcasting | №1635 (+ 1 других файлов) |
| input | №1685 |
| insight | №1635 (+ 1 других файлов) |
| int | №1635 (+ 1 других файлов) |
| intelligence | №1635 (+ 1 других файлов) |
| intelligence_or_charisma | №1635 |
| intensity | №0746 (+ 17 других файлов) |
| interactive | №0752 (+ 1 других файлов) |
| intimidation | №1635 (+ 1 других файлов) |
| inventory | №1685 |
| inventoryCases | №1685 |
| investigation | №1685 |
| isExtra | №1635 |
| isExtraClass | №1635 |
| item | №1685 |
| items | №1635 |
| joints | №0913 (+ 2 других файлов) |
| JOINTS_0 | №0906 |
| junk | №1635 (+ 1 других файлов) |
| keep | №1685 |
| key | №1316 (+ 2 других файлов) |
| kind | №1733 |
| label | №1635 (+ 1 других файлов) |
| languages | №1635 |
| legacy | №0900 (+ 1 других файлов) |
| legLength | №0081 (+ 1 других файлов) |
| legLength-decr | №0081 (+ 1 других файлов) |
| legLength-incr | №0081 (+ 1 других файлов) |
| legs | №0081 (+ 1 других файлов) |
| level | №1635 (+ 1 других файлов) |
| levelOneFeatures | №1635 |
| library | №0746 (+ 15 других файлов) |
| license | №0081 (+ 1 других файлов) |
| lighting | №0746 (+ 17 других файлов) |
| lightIntensity | №0752 (+ 1 других файлов) |
| lightRadius | №0752 (+ 1 других файлов) |
| limitations | №0081 (+ 2 других файлов) |
| localRuntimeTests | №0915 |
| loot | №0746 (+ 1 других файлов) |
| lucky | №1635 (+ 1 других файлов) |
| macroConfigSha256 | №0913 |
| magicResistance | №1635 (+ 1 других файлов) |
| main | №1053 |
| manifest | №0900 (+ 1 других файлов) |
| mapId | №0746 (+ 13 других файлов) |
| maps | №1391 |
| material | №1635 |
| materials | №0906 (+ 2 других файлов) |
| maxCapacityKg | №1685 |
| maxDisplacementMeters | №0913 (+ 1 других файлов) |
| measure-thigh-circ-decr | №0081 (+ 1 других файлов) |
| measure-thigh-circ-incr | №0081 (+ 1 других файлов) |
| measure-upperarm-circ-decr | №0081 (+ 1 других файлов) |
| measure-upperarm-circ-incr | №0081 (+ 1 других файлов) |
| medicine | №1685 |
| mentalShield | №1635 (+ 1 других файлов) |
| meshes | №1050 |
| meshMetadata | №0906 |
| metallicFactor | №0906 |
| method | №0081 (+ 1 других файлов) |
| MhObjectType | №0906 |
| MhScaleFactor | №0906 |
| mimicry | №1635 (+ 1 других файлов) |
| minAppVersion | №1727 (+ 2 других файлов) |
| minStr | №1635 (+ 1 других файлов) |
| model | №0746 (+ 18 других файлов) |
| models | №1316 (+ 1 других файлов) |
| modifiers | №1685 |
| morphNames | №0906 |
| MPFB_GEN_object_type | №0906 |
| MPFB_GEN_scale_factor | №0906 |
| MPFB_HUM_african | №0906 |
| MPFB_HUM_age | №0906 |
| MPFB_HUM_asian | №0906 |
| MPFB_HUM_caucasian | №0906 |
| MPFB_HUM_cupsize | №0906 |
| MPFB_HUM_firmness | №0906 |
| MPFB_HUM_gender | №0906 |
| MPFB_HUM_height | №0906 |
| MPFB_HUM_is_human_project | №0906 |
| MPFB_HUM_material_source | №0906 |
| MPFB_HUM_muscle | №0906 |
| MPFB_HUM_proportions | №0906 |
| MPFB_HUM_weight | №0906 |
| multiclassAllowed | №1635 |
| muscle | №0913 |
| n | №0746 (+ 17 других файлов) |
| name | №0081 (+ 24 других файлов) |
| nameRu | №1635 |
| naturalArmor | №1635 (+ 1 других файлов) |
| nature | №1685 |
| necroticResistance | №1635 (+ 1 других файлов) |
| negative | №0081 (+ 3 других файлов) |
| newSceneOverride | №1713 |
| nextAction | №0917 |
| nimbleEscape | №1635 (+ 1 других файлов) |
| noBreath | №1635 (+ 1 других файлов) |
| nonFiniteValues | №0906 |
| NORMAL | №0906 |
| noSleep | №1635 (+ 1 других файлов) |
| noteCase | №1685 |
| notes | №1057 (+ 2 других файлов) |
| nsis | №1053 |
| nTexture | №0746 (+ 17 других файлов) |
| objects | №0746 (+ 17 других файлов) |
| offset | №0081 (+ 2 других файлов) |
| oneClick | №1053 |
| options | №1635 |
| origin | №1635 (+ 1 других файлов) |
| ota_install_contract | №0902 |
| output | №1053 |
| packTactics | №1635 (+ 1 других файлов) |
| pages | №0917 |
| paid_api_authorized | №0001 |
| parts | №1057 |
| pass | №0900 (+ 1 других файлов) |
| path | №1733 (+ 4 других файлов) |
| pbrMetallicRoughness | №0906 |
| pectorals | №0081 (+ 1 других файлов) |
| pendingChoices | №1635 (+ 1 других файлов) |
| perception | №1635 (+ 1 других файлов) |
| performance | №1635 (+ 1 других файлов) |
| perMachine | №1053 |
| persuasion | №1635 (+ 1 других файлов) |
| physical_android_test | №0902 |
| physicalAndroidQa | №1720 |
| physicalAndroidQA | №0900 (+ 3 других файлов) |
| physicalZIP | №0900 |
| pixels | №0906 |
| poisonImmunity | №1635 (+ 1 других файлов) |
| poisonResistance | №1635 (+ 1 других файлов) |
| portable | №1053 |
| POSITION | №0906 |
| positive | №0081 (+ 3 других файлов) |
| powerfulBuild | №1635 (+ 1 других файлов) |
| pp | №1685 |
| pPerG | №1685 |
| primitives | №0906 |
| private | №1053 |
| productionSyntaxFiles | №0900 (+ 1 других файлов) |
| productName | №1053 |
| profBonus | №1635 (+ 1 других файлов) |
| profession | №1635 (+ 1 других файлов) |
| proficiencies | №1635 (+ 1 других файлов) |
| proficiency | №1685 |
| proficiencyType | №1635 (+ 1 других файлов) |
| project | №0081 (+ 1 других файлов) |
| pronounced | №1106 |
| properties | №1635 (+ 1 других файлов) |
| proportions | №0913 |
| psychicResistance | №1635 (+ 1 других файлов) |
| publication | №0900 (+ 1 других файлов) |
| quota_scope | №0001 |
| race | №0913 |
| raceCraftBonuses | №1635 |
| raceFeatureDescriptions | №1635 (+ 1 других файлов) |
| raceHpBonusPerLevel | №1635 |
| raceId | №1635 (+ 1 других файлов) |
| raceMechanics | №1635 (+ 1 других файлов) |
| raceName | №1635 (+ 1 других файлов) |
| races | №1635 |
| radiantResistance | №1635 (+ 1 других файлов) |
| radius | №0746 (+ 17 других файлов) |
| range | №1635 |
| rarity | №1635 (+ 1 других файлов) |
| rates | №1685 |
| rawBounds | №0906 |
| reason | №1391 |
| recommendedSourceCommit | №0913 |
| regression | №0900 (+ 1 других файлов) |
| release | №0915 |
| release_ready | №0001 |
| release_reason | №0001 |
| release_source_sha | №0001 |
| releaseCommit | №0900 (+ 1 других файлов) |
| releaseUrl | №1720 |
| relentlessEndurance | №1635 (+ 1 других файлов) |
| religion | №1635 (+ 1 других файлов) |
| removed | №1685 |
| repairable | №1635 (+ 1 других файлов) |
| replacesRace | №1635 |
| required_editor_assets | №0902 |
| requiredAssets | №0746 (+ 13 других файлов) |
| resistanceDamageType | №1635 |
| resistances | №1635 (+ 1 других файлов) |
| resources | №1685 |
| resultCp | №1685 |
| resultEp | №1685 |
| resultGp | №1685 |
| resultPp | №1685 |
| resultSp | №1685 |
| retry_after | №0001 |
| ritual | №1635 |
| rmsDisplacementMeters | №0913 (+ 1 других файлов) |
| rootCause | №0900 |
| rotation | №0747 (+ 11 других файлов) |
| roughnessFactor | №0906 |
| runtime | №0913 (+ 1 других файлов) |
| runtimeOTARegression | №0900 |
| s | №0746 (+ 15 других файлов) |
| savageAttacks | №1635 (+ 1 других файлов) |
| savesData | №1635 (+ 1 других файлов) |
| savingThrow | №1635 |
| scale | №0081 (+ 19 других файлов) |
| schema | №0081 (+ 6 других файлов) |
| schemaVersion | №0746 (+ 13 других файлов) |
| school | №1635 |
| scripts | №1053 |
| seamDuplicates | №0906 |
| seamMaxMeters | №0913 (+ 1 других файлов) |
| searchable | №0746 (+ 11 других файлов) |
| seconds | №0900 (+ 1 других файлов) |
| seed | №1635 |
| selectedTexture | №0746 (+ 17 других файлов) |
| selectedTool | №0746 (+ 17 других файлов) |
| selectedWallTexture | №0746 (+ 17 других файлов) |
| sha | №1057 |
| sha256 | №1733 (+ 10 других файлов) |
| shapeshifter | №1635 (+ 1 других файлов) |
| shippedSha256 | №0913 (+ 1 других файлов) |
| shoulders | №0906 (+ 2 других файлов) |
| showAbove | №0746 (+ 1 других файлов) |
| showBelow | №0746 (+ 1 других файлов) |
| showCeilings | №0746 (+ 1 других файлов) |
| showEp | №1685 |
| showPp | №1685 |
| signedRelease | №0900 |
| signingCertificateSha256 | №1057 |
| size | №1635 (+ 1 других файлов) |
| sizeChoice | №1635 (+ 1 других файлов) |
| skillBonuses | №1635 (+ 1 других файлов) |
| skills | №1635 (+ 1 других файлов) |
| skillsData | №1635 (+ 1 других файлов) |
| skins | №0906 |
| sky | №0747 (+ 9 других файлов) |
| slash | №0750 (+ 1 других файлов) |
| slashTexture | №0750 (+ 1 других файлов) |
| sleightOfHand | №1635 (+ 1 других файлов) |
| somatic | №1635 |
| source | №0081 (+ 6 других файлов) |
| sourceCommit | №1391 (+ 3 других файлов) |
| sourceGlbSha256 | №0913 |
| sourceHashes | №0081 (+ 2 других файлов) |
| sourceProject | №0913 |
| sources | №0913 (+ 3 других файлов) |
| sourceSha256 | №0913 (+ 1 других файлов) |
| sourceStackTerms | №0913 |
| sp | №1685 |
| speed | №1635 (+ 1 других файлов) |
| speedFt | №1635 (+ 1 других файлов) |
| spells | №1635 |
| spellsData | №1635 (+ 1 других файлов) |
| spellSlotsData | №1635 (+ 1 других файлов) |
| sPerG | №1685 |
| spiderClimb | №1635 (+ 1 других файлов) |
| stableVersion | №0900 (+ 1 других файлов) |
| stacked | №1685 |
| stage | №0915 |
| stairDirection | №0746 (+ 3 других файлов) |
| stairFrom | №0746 (+ 3 других файлов) |
| stairsTo | №0747 (+ 5 других файлов) |
| stairTo | №0746 (+ 3 других файлов) |
| stat | №1635 (+ 1 других файлов) |
| statGenerationMode | №1635 (+ 1 других файлов) |
| statRollsUsed | №1635 (+ 1 других файлов) |
| stats | №1635 (+ 1 других файлов) |
| status | №0900 (+ 4 других файлов) |
| stealth | №1635 (+ 1 других файлов) |
| stealthDisadvantage | №1635 (+ 1 других файлов) |
| steps | №0746 (+ 3 других файлов) |
| sTexture | №0746 (+ 15 других файлов) |
| stoneEndurance | №1635 (+ 1 других файлов) |
| str | №1635 (+ 1 других файлов) |
| strength | №1635 (+ 1 других файлов) |
| subclass | №1635 (+ 1 других файлов) |
| sunlightSensitivity | №1635 (+ 1 других файлов) |
| survival | №1635 (+ 1 других файлов) |
| swim | №1635 (+ 1 других файлов) |
| tags | №0746 (+ 13 других файлов) |
| target | №1053 (+ 1 других файлов) |
| targets | №0081 (+ 4 других файлов) |
| telepathy | №1635 (+ 1 других файлов) |
| templatePinStates | №1713 |
| TEXCOORD_0 | №0906 |
| text | №1685 |
| textures | №1391 |
| tiles | №0746 (+ 18 других файлов) |
| time | №1685 |
| toHit | №1635 (+ 1 других файлов) |
| tokenArt | №1635 |
| tokenReady | №1635 |
| tokens | №0746 (+ 17 других файлов) |
| toolProficiencies | №1635 |
| topology | №0906 |
| torso-muscle-pectoral-decr | №0081 (+ 1 других файлов) |
| torso-muscle-pectoral-incr | №0081 (+ 1 других файлов) |
| totals | №1685 |
| totalWeightKg | №1685 |
| triangles | №0906 |
| trunk | №1635 (+ 1 других файлов) |
| type | №0746 (+ 19 других файлов) |
| typeKey | №1635 (+ 1 других файлов) |
| unchanged | №0913 (+ 1 других файлов) |
| undeadResilience | №1635 (+ 1 других файлов) |
| uniquePositions | №0906 |
| unknown | №1685 |
| untouched | №1685 |
| updateManifest | №1057 |
| url | №1057 (+ 5 других файлов) |
| userAdded | №1713 |
| uvOutsideUnitSquare | №0906 |
| uvRange | №0906 |
| value | №1685 |
| verbal | №1635 |
| version | №1733 (+ 29 других файлов) |
| versionCode | №0900 (+ 3 других файлов) |
| vertexCount | №0081 (+ 1 других файлов) |
| vertices | №0906 (+ 3 других файлов) |
| view | №0746 (+ 17 других файлов) |
| w | №0746 (+ 17 других файлов) |
| waist | №0906 (+ 2 других файлов) |
| walkable | №0746 (+ 3 других файлов) |
| walls | №0746 (+ 18 других файлов) |
| weapons | №1635 (+ 1 других файлов) |
| weaponsData | №1635 (+ 1 других файлов) |
| weaponTraining | №1635 (+ 1 других файлов) |
| weight | №0081 (+ 5 других файлов) |
| weightCases | №1685 |
| weightHero | №1685 |
| WEIGHTS_0 | №0906 |
| weightSumMaxError | №0906 |
| weightTotal | №1685 |
| weldedBoundaryEdges | №0906 |
| weldedNonManifoldEdges | №0906 |
| weldTolerance | №0906 |
| width | №0746 (+ 17 других файлов) |
| win | №1053 |
| windows | №1057 (+ 2 других файлов) |
| wis | №1635 (+ 1 других файлов) |
| wisdom | №1635 (+ 1 других файлов) |
| workflows | №0900 (+ 1 других файлов) |
| wTexture | №0746 (+ 15 других файлов) |
| x | №0746 (+ 17 других файлов) |
| y | №0746 (+ 17 других файлов) |
| z | №0746 (+ 17 других файлов) |
| zeroWeightVertices | №0906 |
| zip | №0917 |
| zip_crc_and_all_entry_sha256 | №0902 |
| zip_sha256 | №0902 |
| zipSha256 | №0900 (+ 1 других файлов) |
| zones | №0746 (+ 17 других файлов) |

## Файлы с совпадающим Git SHA

Совпадение содержимого не означает, что путь можно удалить.

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

## Обновление индекса

После изменения проекта выполнить node tools/generate_project_atlas.cjs и коммитить обе версии.

