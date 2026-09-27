# DND VTT — FAQ и карта проекта
**Версия карты:** V70.25.60  
Этот файл — человеческая карта проекта. Здесь указан **каждый файл, его назначение и актуальный путь**. Тяжёлые `wallpapers/` и `ambience/` намеренно не входят в рабочие AI-архивы; они проверены отдельно и подключаются при финальной упаковке.  
## Как ориентироваться
- `index.html` — единственная web-точка входа.
- `app/` — production JavaScript/CSS и сгенерированный runtime manifest.
- `app/data/` — большие справочные/контентные наборы, разбитые по назначению.
- `tests/` — тесты, не загружаемые пользователю как application scripts.
- `tools/` — инструменты сборки/аудита.
- `docs/` — проектная документация.
- `VTT_PROJECT_MANIFEST_V70.json` — integrity/update manifest.

## Файлы
| Путь | Назначение |
|---|---|
| `VTT_PROJECT_MANIFEST_V70.json` | Машиночитаемый manifest версии проекта: список файлов, размеры и SHA-256 для integrity/update-контроля. |
| `app/Ambiences.js` | Модуль эмбиентов и фонового аудио (ambiences.js) |
| `app/Backgrounds.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/Experience.js` | Модуль управления опытом персонажа и таблица прогрессии опыта по правилам D&D 5e (PHB) |
| `app/Hero-info.js` | ДОРАБОТКА: модель героя и требования мультикласса. |
| `app/Inventory-weight-tracker.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/Inventory.js` | Inventory.js — единый инвентарь персонажа и модальные окна. |
| `app/Logo.js` | Логотип/ссылка: выезжает, стоит +7 сек по центру и уходит вверх |
| `app/Proficiencies.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/Proficienciescheck.js` | Proficienciescheck.js |
| `app/Settings.js` | Модуль общих настроек приложения (settings.js) |
| `app/Settings_debug.js` | Модуль отладки и принудительных настроек персонажей (settings_debug.js) |
| `app/Wallpapers.js` | Модуль управления обоями, прозрачностью интерфейса, модалок, цветностью фона, затемнением и автосменой (wallpapers.js) |
| `app/alchemy_engine_v29.js` | Alchemy 2.0 runtime: ингредиенты, скрытые свойства, реакции, Extra, катализаторы и эксперимент. |
| `app/alchemy_gameplay_v30.js` | Alchemy 2.0 Gameplay v30: завершает алхимию поверх alchemy_engine_v29.js. |
| `app/alchemy_gathering_professions_v52.js` | Alchemy 2.0 ↔ Gathering ↔ Professions v52: интеграционный слой для алхимических ингредиентов. |
| `app/app.js` | ДОРАБОТКА: главный контроллер приложения. |
| `app/armors.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/battle_action_ui.js` | battle_action_ui.js |
| `app/battle_board.js` | battle_board.js |
| `app/bestiary_2_0_v56.js` | bestiary_2_0_v56.js |
| `app/bestiary_catalog_v56_1.js` | bestiary_catalog_v56_1.js |
| `app/bestiary_catalog_v56_10.js` | bestiary_catalog_v56_10.js |
| `app/bestiary_catalog_v56_11.js` | bestiary_catalog_v56_11.js |
| `app/bestiary_catalog_v56_12.js` | bestiary_catalog_v56_12.js |
| `app/bestiary_catalog_v56_13.js` | bestiary_catalog_v56_13.js |
| `app/bestiary_catalog_v56_2.js` | bestiary_catalog_v56_2.js |
| `app/bestiary_catalog_v56_3.js` | bestiary_catalog_v56_3.js |
| `app/bestiary_catalog_v56_4.js` | bestiary_catalog_v56_4.js |
| `app/bestiary_catalog_v56_5.js` | bestiary_catalog_v56_5.js |
| `app/bestiary_catalog_v56_6.js` | bestiary_catalog_v56_6.js |
| `app/bestiary_catalog_v56_7.js` | bestiary_catalog_v56_7.js |
| `app/bestiary_catalog_v56_8.js` | bestiary_catalog_v56_6.js |
| `app/bestiary_catalog_v56_9.js` | bestiary_catalog_v56_9.js |
| `app/blood_hunter_engine.js` | blood_hunter_engine.js |
| `app/campaign_manager.js` | campaign_manager.js — лёгкий DM/Campaign слой. |
| `app/character.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/character_creation.js` | ДОРАБОТКА: создание персонажа. |
| `app/class_features_engine.js` | class_features_engine.js |
| `app/classesRegistry.js` | classesRegistry.js |
| `app/combat_abilities.js` | combat_abilities.js |
| `app/combat_engine.js` | combat_engine.js |
| `app/companion_gameplay_v27.js` | companion_gameplay_v27.js |
| `app/companion_packs_v26.js` | companion_packs_v26.js |
| `app/consumables.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/content_catalog.js` | content_catalog.js |
| `app/content_framework.js` | content_framework.js |
| `app/content_manifest.js` | content_manifest.js |
| `app/crafting_character_influence_test_v46.js` | Crafting Character Influence Test v46. |
| `app/crafting_disassembly_repair_v51.js` | Crafting Quality / Disassembly / Repair v51. |
| `app/crafting_disassembly_v51.js` | Crafting Disassembly & Full Quality v51: расширяет существующую производственную экономику |
| `app/crafting_dlc_v50.js` | Crafting & Durability DLC v50: единая необязательная надстройка авторского ХБ для ремесел и износа. |
| `app/crafting_economy_v49.js` | Crafting Economy v49: замыкает цепочку «добыча → переработка → компонент → предмет». |
| `app/crafting_engine_v31.js` | Crafting Engine v31: единая система изготовления оружия, брони, аксессуаров, |
| `app/crafting_profession_progression_test_v47.js` | Crafting Profession Progression Test v47. |
| `app/crafting_profession_progression_v47.js` | Crafting Profession Progression v47.1: отдельный авторский ХБ-слой навыка профессий. |
| `app/crafting_professions_v33.js` | Crafting Professions v33: расширяет общий крафт отдельными ремесленными профессиями. |
| `app/crafting_professions_v38.js` | Crafting Professions v38: полный реестр производственных инструментов и зависимостей. |
| `app/crafting_resources_v34.js` | Crafting Resources v34: единый каталог сырья, компонентов и производственных материалов. |
| `app/custom_crafting_v32.js` | Custom Crafting v32: конструктор оружия, брони и одежды с материалами, компонентами, |
| `app/data/classes/ARTIFICER.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Artificer.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/BARBARIAN.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Barbarian.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Bard.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Bard.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/BloodHunter.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/CLERIC.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Cleric.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/DRUID.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Druid.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/FIGHTER.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Fighter.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Monk.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Monk.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/PALADIN.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Paladin.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/RANGER.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Ranger.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Rogue.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Rogue.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/SORCERER.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Sorcerer.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/WARLOCK.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Warlock.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Wizard.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/Wizard.png` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/level_up.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/classes/progressionEngine.js` | Класс персонажа или связанный class progression/asset. |
| `app/data/feats/Feat_widget.js` | Данные и UI/настройки feats. |
| `app/data/feats/Feats_phb.js` | Данные и UI/настройки feats. |
| `app/data/feats/Feats_settings.js` | Данные и UI/настройки feats. |
| `app/data/feats/Feats_tcoe.js` | Данные и UI/настройки feats. |
| `app/data/feats/Feats_ua_homebrew.js` | Данные и UI/настройки feats. |
| `app/data/feats/Feats_xgte.js` | Данные и UI/настройки feats. |
| `app/data/spells/Focuses.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells1lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells2lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells3lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells4lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells5lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells7lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells8lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/Spells9lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/spells/spells6lvl.js` | Данные заклинаний/фокусов по уровням. |
| `app/data/subclasses/subclassesRegistry.js` | Реестр/данные подклассов. |
| `app/debug.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/dice.js` | DICE.JS — Модуль бросков D&D 5e (Автономный) |
| `app/dnd_tools.js` | dnd_tools.js |
| `app/expanded_bestiary_v39.js` | expanded_bestiary_v39.js |
| `app/expanded_class_registry_bridge.js` | expanded_class_registry_bridge.js |
| `app/expanded_classes_v23.js` | expanded_classes_v23.js |
| `app/expanded_subclasses_v23.js` | expanded_subclasses_v23.js |
| `app/expansion_class_progressions.js` | expansion_class_progressions.js |
| `app/expansion_classes_pack.js` | expansion_classes_pack.js |
| `app/feat_engine.js` | feat_engine.js — runtime-механика черт. |
| `app/gameplay_core_v57.js` | gameplay_core_v57.js — Gameplay Core orchestration layer. |
| `app/inventory-coins.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/inventory-modal.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/inventory_containers_v54.js` | inventory_containers_v54.js — контейнеры, сумки и хранилища персонажа. |
| `app/junk.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/kibbles_localization_content_v71.js` | KibblesTasty localization + source-backed class catalog. |
| `app/library.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/magic_engine.js` | magic_engine.js — слой магии для мультикласса. |
| `app/market_economy_v55.js` | Market Economy V55: торговцы, магазины, цены и региональный рынок поверх существующих |
| `app/market_expansion_v55_1.js` | Market Expansion V55.1: расширяет существующий Market Economy V55 десятками |
| `app/market_social_v55_3.js` | Market Social V55.3: завершает систему торговли V55/V55.1/V55.2 социальным торгом. |
| `app/market_trade_v55_2.js` | Market Trade V55.2: расширяет единый рынок V55/V55.1 торговым окном в стиле |
| `app/materials.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/monster_engine.js` | monster_engine.js |
| `app/monster_loot_crafting_bridge_v40.js` | monster_loot_crafting_bridge_v40.js (extended through v45) |
| `app/monster_loot_engine_v36.js` | monster_loot_engine_v36.js |
| `app/monster_loot_engine_v37.js` | monster_loot_engine_v37.js |
| `app/network_engine.js` | network_engine.js — сетевой сервер/клиент D&D-партии v9. |
| `app/network_gameplay.js` | network_gameplay.js — authoritative gameplay v9 для сетевой D&D-партии. |
| `app/notes.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/onboarding_faq_v71.css` | Стили пользовательского интерфейса. |
| `app/onboarding_faq_v71.js` | First-launch guided tour + main-menu FAQ. Mobile-first, dependency-free. |
| `app/races.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/resource_gathering_v35.js` | Resource Gathering v35: игровой слой добычи сырья, сбора растений и разборки добычи. |
| `app/resource_processing_v44.js` | Resource Processing v45 — физический объём добычи, массовый каталог переработки и исходы обработки ресурсов. |
| `app/rulesEngine.js` | rulesEngine.js |
| `app/secondary_entities_engine.js` | secondary_entities_engine.js |
| `app/skills.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/spells.js` | Блок логики заклинаний с поддержкой бросков атаки, урона и сворачиваемой шторкой |
| `app/styles.css` | Стили пользовательского интерфейса. |
| `app/summoning_engine.js` | summoning_engine.js |
| `app/swipe-lock.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/turn_planner.js` | turn_planner.js |
| `app/vtt_character_actions_v64.js` | vtt_character_actions_v64.js |
| `app/vtt_character_sheet_v63.js` | vtt_character_sheet_v63.js |
| `app/vtt_combat_event_bus_v69.js` | vtt_combat_event_bus_v69.js |
| `app/vtt_combat_log_v66.js` | vtt_combat_log_v66.js |
| `app/vtt_debug_character_lab_v702.js` | V70.2 Debug Character / Progression Lab. |
| `app/vtt_debug_dice_lab_v706.js` | V70.6 Deterministic Dice / Attack / Save Laboratory. |
| `app/vtt_debug_lab_v703.js` | V70.3 Debug QA Laboratories |
| `app/vtt_debug_panel_v70.js` | vtt_debug_panel_v70.js |
| `app/vtt_debug_rules_matrix_v707.js` | V70.7 Rules Matrix / Damage Laboratory. |
| `app/vtt_debug_sandbox_v701.js` | V70.1 Debug / QA Sandbox |
| `app/vtt_debug_scenario_editor_v705.js` | V70.5 Debug Scenario Editor + Chains — developer/QA only. |
| `app/vtt_debug_scenarios_v704.js` | V70.4 Debug Scenario Manager — developer/QA only. |
| `app/vtt_dice_resolution_v65.js` | vtt_dice_resolution_v65.js |
| `app/vtt_encounter_checkpoint_v68.js` | vtt_encounter_checkpoint_v68.js |
| `app/vtt_encounter_map_v59.js` | vtt_encounter_map_v59.js |
| `app/vtt_gameplay_ux_v58.js` | vtt_gameplay_ux_v58.js — Battle UX + Campaign Gameplay orchestration layer. |
| `app/vtt_mobile_battle_v61.js` | vtt_mobile_battle_v61.js |
| `app/vtt_mobile_combat_hud_v62.js` | vtt_mobile_combat_hud_v62.js |
| `app/vtt_mobile_session_v67.js` | vtt_mobile_session_v67.js |
| `app/vtt_project_manifest_v70.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/vtt_token_interaction_v60.js` | vtt_token_interaction_v60.js |
| `app/weapons.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/weaponsheavy.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/weaponsmelee.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/weaponsranged.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/weaponsspecial.js` | JavaScript-модуль приложения; назначение определяется именем модуля и его экспортируемыми/глобальными API. |
| `app/world_resource_gathering_v53.js` | World Resource Gathering v53: авторский мировой слой поверх существующей добычи v35. |
| `docs/00_AI_PROJECT_GUIDE.md` | Документация проекта/аудита/атрибуции. |
| `docs/00_NEW_CHAT_PROMPT_V56_10.txt` | Документация проекта/аудита/атрибуции. |
| `docs/00_NEW_CHAT_PROMPT_V56_11.txt` | Документация проекта/аудита/атрибуции. |
| `docs/00_NEW_CHAT_PROMPT_V56_12.txt` | Документация проекта/аудита/атрибуции. |
| `docs/00_NEW_CHAT_PROMPT_V56_9.txt` | Документация проекта/аудита/атрибуции. |
| `docs/Help.txt` | Документация проекта/аудита/атрибуции. |
| `docs/KIBBLES_ATTRIBUTION_V71.md` | Документация проекта/аудита/атрибуции. |
| `docs/NETWORK_APK_NOTES.md` | Документация проекта/аудита/атрибуции. |
| `index.html` | Главная HTML-точка входа приложения; подключает UI/CSS и JS-модули в фиксированном порядке. |
| `tests/crafting_disassembly_v51_test.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/crafting_dlc_v50_test.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/crafting_economy_v49_test.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v52.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v53.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v54.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v55.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v55_2.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v55_3.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_1.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_10.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_11.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_12.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_13.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_2.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_3.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_4.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_5.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_6.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_8.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v56_9.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v57.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v58.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v59.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v60.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v61.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v62.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v63.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v64.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v65.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v66.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v67.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v68.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v69.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v70.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v701.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v702.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v703.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v704.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v705.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v706.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v707.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v708_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v709_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v710_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v711_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v712_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v713_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v714_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v715_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v716_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v717_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v718_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v719_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v720_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v721_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v722_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v723_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v724_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v725_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v726_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v727_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v728_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v729_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v730_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v731_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v732_fixes.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v733_logic_audit.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v734_network_concentration.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v735_logic_rules.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v736_deep_rules.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v737_spellcasting_transaction.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v738_multiclass_spell_sources.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v739_prepared_transaction.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v740_concentration_lifecycle.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v741_damage_pipeline.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v742_character_combatant_sync.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v743_authority_recharge_events.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v744_sync_authority_save.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v745_host_handoff.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v746_authoritative_save_recharge.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v747_event_race_compaction.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v748_full_combat_transaction.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v749_monster_authority_reaction_order.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v750_resignal_reaction_monster_rpc.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v751_authoritative_replay_rollback.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v752_replay_hash_authority.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tests/test_v753_replay_transaction_rng.js` | Регрессионный/аудитный тест; запускается через tools/run_tests_v731.js. |
| `tools/finalize_v741.py` | Инструмент разработки/аудита/генерации manifest. |
| `tools/run_tests_v731.js` | Инструмент разработки/аудита/генерации manifest. |
| `tools/sync_manifest.py` | Инструмент разработки/аудита/генерации manifest. |


## V70.25.61 — обновления

| Файл | Функция |
|---|---|
| `app/update_manager.js` | Клиентская часть системы обновлений: проверка версии, manifest, SHA-256, staging и native apply contract. |
| `tools/build_update_manifest.py` | Генератор статического update manifest для GitHub Pages/другого HTTPS-хоста. |
| `tests/test_v754_update_manager.js` | Контрактные тесты updater: версии, manifest и защита путей. |

**Важно:** `app/update_manager.js` не записывает файлы поверх работающего WebView. Финальная атомарная замена выполняется Android/native updater после его реализации.


### V70.25.61 — manifest по умолчанию

`app/update_manager.js` теперь по умолчанию проверяет стабильный manifest GitHub Pages. Android/native shell по-прежнему может переопределить URL через `window.DND_UPDATE_MANIFEST_URL` или `dnd_update_manifest_url`.


### Android shell V70.25.61

- `android/` содержит native Android shell.
- `android/app/build.gradle` собирает `index.html` и `app/**`, а PNG/MP3 из корня перекладывает в APK в `wallpapers/` и `ambience/`, поэтому исходную структуру GitHub менять не требуется.
- `android/app/src/main/java/com/dndvtt/app/MainActivity.java` использует `WebViewAssetLoader` и локальный HTTPS-origin `appassets.androidplatform.net`.
- `.github/workflows/android-debug.yml` автоматически собирает debug APK через GitHub Actions.

**Медиа:** обои и эмбиенты специально оставляем в корне репозитория. Это соответствует текущей загрузке GitHub; Android build сам раскладывает их в runtime-пути приложения.


- `android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java` — native staging/apply: HTTPS manifest, per-file size/SHA-256 checks, versioned private webroot, active-version switch and preserved previous version.
- `android/app/src/main/java/com/dndvtt/app/MainActivity.java` — mounts the active private webroot through `WebViewAssetLoader`; the web/native bridge is restricted to `appassets.androidplatform.net`.
