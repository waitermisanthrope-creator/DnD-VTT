/**
 * class_features_engine.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Единый runtime-движок классовых и подклассовых механик D&D 5e.
 * Подключает все 13 классов проекта и 26 PHB/проектных подклассов,
 * использует уже существующий subclassesRegistry.js и превращает
 * ключевые особенности в ресурсы, активные действия, пассивные бонусы
 * и модификаторы атак/спасбросков.
 *
 * КАК РАБОТАЕТ:
 * - syncClassResources(hero) создаёт/обновляет ресурсы без стирания текущих;
 * - buildFeatureSet(hero) собирает базовые и подклассовые особенности;
 * - useFeature(hero,id,context) выполняет активную способность;
 * - attackModifiers/saveModifiers добавляют эффекты в боевой движок;
 * - chooseSubclassForClass() даёт универсальный UI выбора подкласса;
 * - renderClassFeatures() показывает особенности всех классов в листе.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * hero/currentChar, hero.classes, hero.resources, hero.classFeaturesState,
 * hero.activeConditions, hero.hitPoints, hero.maxHitPoints, hero.abilityScores.
 *
 * ИСТОЧНИК:
 * Правила ориентированы на D&D 5e 2014. Изобретатель и его специализации
 * относятся к дополнительному контенту (не PHB 2014) и помечаются отдельно.
 * Текстовые описания registry остаются источником списка доступных подклассов;
 * этот файл отвечает за runtime-механику.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';

  var CLASS_NAMES = ['Варвар','Бард','Воин','Волшебник','Друид','Жрец','Монах','Паладин','Плут','Следопыт','Чародей','Колдун','Изобретатель'];
  var ARTIFICER_CLASSES = ['Изобретатель'];

  var CORE = {
    'Варвар': [
      ['rage','Ярость','bonus','Бонусное действие: ярость; бонус к урону Силой и сопротивление дробящему/колющему/рубящему урону.'],
      ['reckless','Безрассудная атака','toggle','Преимущество на первую атаку Силой в этот ход; атаки по варвару получают преимущество до следующего хода.'],
      ['dangerSense','Чувство опасности','passive','Преимущество на спасброски Ловкости против видимых эффектов.'],
      ['fastMovement','Быстрое движение','passive','+10 футов скорости без тяжёлой брони.'],
      ['feralInstinct','Дикое чутьё','passive','Преимущество на инициативу.'],
      ['brutalCritical','Жестокий критический удар','passive','Дополнительная кость урона при критическом попадании оружием.'],
      ['relentlessRage','Неукротимая ярость','reaction','При падении до 0 HP можно пройти спасбросок Телосложения и остаться на 1 HP.'],
      ['persistentRage','Неугасимая ярость','passive','Ярость больше не заканчивается досрочно из-за обычных условий поддержания.'],
      ['indomitableMight','Неодолимая мощь','passive','Минимум проверки Силы равен показателю Силы.'],
      ['primalChampion','Первобытный чемпион','passive','Сила и Телосложение увеличиваются на 4.']
    ],
    'Бард': [
      ['bardicInspiration','Бардовское вдохновение','bonus','Бонусное действие: союзник в пределах 60 футов получает кость вдохновения.'],
      ['jackOfAllTrades','Разносторонний талант','passive','Половина бонуса мастерства к проверкам характеристик без мастерства.'],
      ['songOfRest','Песнь отдыха','rest','Дополнительное лечение во время короткого отдыха.'],
      ['countercharm','Контрчара','action','Действие: преимущество на спасброски против испуга/очарования для союзников.'],
      ['magicalSecrets','Магические тайны','passive','Изучение выбранных заклинаний других классов на соответствующих уровнях.'],
      ['superiorInspiration','Высшее вдохновение','passive','При инициативе без оставшихся вдохновений восстанавливается одна кость.']
    ],
    'Воин': [
      ['secondWind','Второе дыхание','bonus','Бонусное действие: 1d10 + уровень воина HP.'],
      ['actionSurge','Всплеск действий','free','Получить ещё одно действие в текущем ходу.'],
      ['indomitable','Непреклонность','reaction','Перебросить проваленный спасбросок.'],
      ['fightingStyle','Боевой стиль','passive','Выбранный стиль влияет на расчёт атаки/защиты.'],
      ['extraAttack','Дополнительная атака','passive','При действии Атака можно атаковать дважды, затем три/четыре раза на высоких уровнях.'],
      ['fighterRemarkableAthlete','Выдающийся атлет','passive','Половина бонуса мастерства к Силе/Ловкости/Телосложению без мастерства.'],
      ['survivor','Выживший','passive','В начале хода восстанавливает HP, если осталось не больше половины максимума.']
    ],
    'Волшебник': [
      ['arcaneRecovery','Магическое восстановление','short-rest','Восстановить часть ячеек заклинаний после короткого отдыха.'],
      ['spellMastery','Мастерство заклинаний','passive','Выбранные заклинания 1/2 круга можно применять без расхода ячеек.'],
      ['signatureSpells','Фирменные заклинания','passive','Два выбранных заклинания 3 круга становятся доступнее.'],
      ['arcaneMastery','Магическое мастерство','passive','Два заклинания 1–9 круга можно применять по одному разу без ячейки.']
    ],
    'Друид': [
      ['wildShape','Дикий облик','bonus','Превращение в подходящего зверя; статистика формы заменяет физические характеристики.'],
      ['druidic','Друидический язык','passive','Друидический язык и тайные природные знаки.'],
      ['timelessBody','Безвременное тело','passive','Старение замедляется; магия/зелья восстанавливают больше.'],
      ['beastSpells','Заклинания в облике','passive','Можно применять большинство друидических заклинаний в диком облике.'],
      ['archdruid','Архидруид','passive','Неограниченный Дикий облик и применение заклинаний в форме.']
    ],
    'Жрец': [
      ['channelDivinity','Божественный канал','action','Использовать одну из способностей домена/Божественного канала.'],
      ['turnUndead','Изгнание нежити','action','Нежить в пределах 30 футов делает спасбросок Мудрости или бежит.'],
      ['destroyUndead','Разрушение нежити','passive','Нежить ниже порога CR уничтожается вместо изгнания.'],
      ['divineIntervention','Божественное вмешательство','action','Запросить прямое вмешательство божества.'],
      ['greaterDivineIntervention','Высшее божественное вмешательство','passive','На 20 уровне вмешательство автоматически срабатывает.']
    ],
    'Монах': [
      ['flurry','Шквал ударов','bonus','После Атаки: 1 Ки для двух безоружных ударов бонусным действием.'],
      ['patientDefense','Терпеливая оборона','bonus','1 Ки: Dodge бонусным действием.'],
      ['stepWind','Шаг ветра','bonus','1 Ки: Dash или Disengage бонусным действием; прыжок удваивается.'],
      ['stunningStrike','Ошеломляющий удар','on-hit','После попадания рукопашной атакой: 1 Ки, спасбросок Телосложения или ошеломление.'],
      ['deflectMissiles','Отражение стрел','reaction','Реакция уменьшает урон дальнобойной атаки и может вернуть снаряд.'],
      ['slowFall','Медленное падение','reaction','Реакция уменьшает урон от падения на 5 × уровень монаха.'],
      ['evasionMonk','Ускользание','passive','Спасброски Ловкости: успех — 0, провал — половина урона.'],
      ['stillnessOfMind','Безмятежность духа','action','Действием снять с себя состояние очарования/испуга.'],
      ['diamondSoul','Алмазная душа','passive','Мастерство всех спасбросков; можно тратить Ки на переброс.'],
      ['perfectSelf','Совершенство','passive','При броске инициативы без Ки восстанавливаются 4 очка.']
    ],
    'Паладин': [
      ['divineSense','Божественное чувство','action','Обнаружить небожителей, исчадий и нежить в пределах 60 футов.'],
      ['layOnHands','Наложение рук','action','Пул лечения 5 × уровень паладина; восстановление HP или лечение яда/болезни.'],
      ['divineSmite','Божественная кара','on-hit','После попадания оружием можно потратить ячейку на дополнительный урон излучением.'],
      ['auraOfProtection','Аура защиты','passive','Паладин и союзники рядом получают бонус CHA к спасброскам.'],
      ['auraOfCourage','Аура мужества','passive','Паладин и союзники рядом не могут быть испуганы.'],
      ['improvedDivineSmite','Улучшенная божественная кара','passive','Каждое попадание оружием наносит +1d8 излучением.'],
      ['cleansingTouch','Очищающее касание','action','Снять заклинание с существа касанием.'],
      ['holyNexus','Священная связь','passive','Высокоуровневая аура/защита в зависимости от клятвы.']
    ],
    'Плут': [
      ['sneakAttack','Скрытая атака','on-hit','Один раз за ход: дополнительные d6 при finesse/ranged и выполнении условий.'],
      ['cunningAction','Действие схитростью','bonus','Рывок, Отход или Засада бонусным действием.'],
      ['uncannyDodge','Невероятное уклонение','reaction','Уменьшить вдвое урон от видимой атаки.'],
      ['evasion','Ускользание','passive','Улучшенные спасброски Ловкости против половинного/нулевого урона.'],
      ['reliableTalent','Надёжный талант','passive','Результат d20 ниже 10 для проверок мастерства считается 10.'],
      ['blindsense','Слепое чутьё','passive','Чувствовать невидимых существ в пределах 10 футов.'],
      ['slipperyMind','Скользкий ум','passive','Мастерство спасбросков Мудрости.'],
      ['strokeOfLuck','Удача плута','reaction','Промах атаки превращается в попадание или d20 проверки считается 20.']
    ],
    'Следопыт': [
      ['favoredEnemy','Излюбленный враг','passive','Преимущество на проверки знания/отслеживания выбранных врагов и языки.'],
      ['naturalExplorer','Исследователь природы','passive','Бонусы путешествий и выживания в выбранной местности.'],
      ['rangerFightingStyle','Боевой стиль следопыта','passive','Выбранный стиль влияет на боевую специализацию.'],
      ['huntersMark','Метка охотника','bonus','Бонусным действием пометить цель; +1d6 урона и преимущества на поиск/отслеживание.'],
      ['landsStrideRanger','Земная поступь','passive','Игнорировать часть труднопроходимой местности и опасных растений.'],
      ['hideInPlainSight','Скрытность на виду','action','Маскировка/засада с подготовкой.'],
      ['vanish','Исчезновение','bonus','Hide бонусным действием; неотслеживаемость немагическими средствами.'],
      ['feralSenses','Дикие чувства','passive','Чувствовать невидимых существ и отсутствие помех от невидимости для атак.'],
      ['foeSlayer','Убийца врагов','passive','Добавлять модификатор Мудрости к атаке или урону по избранной цели раз в ход.']
    ],
    'Чародей': [
      ['fontOfMagic','Источник магии','resource','Очки чародейства и конвертация ячеек/очков.'],
      ['metamagic','Метамагия','spell-modifier','Изменять заклинания очками чародейства.'],
      ['sorcerousRestoration','Чародейское восстановление','short-rest','На коротком отдыхе вернуть часть очков чародейства.'],
      ['sorcerousOriginMastery','Мастерство происхождения','passive','Высокоуровневая особенность выбранного происхождения.']
    ],
    'Колдун': [
      ['pactBoon','Дар Пакта','utility','Выбор Пакта Цепи, Книги или Клинка.'],
      ['eldritchInvocations','Воззвания договора','utility','Выбор и применение мистических воззваний.'],
      ['mysticArcanum','Мистический тайник','resource','Одно мощное заклинание каждого доступного высокого круга.'],
      ['eldritchMaster','Повелитель эльдрического мастерства','action','За 1 минуту вернуть ячейки Пакта один раз за долгий отдых.']
    ],
    'Изобретатель': [
      ['magicalTinkering','Магическое конструирование','utility','Малые постоянные магические эффекты на предметах.'],
      ['infuseItem','Внедрение зачарования','utility','Создавать магические предметы через известные инфузии.'],
      ['flashOfGenius','Вспышка гениальности','reaction','Добавить INT к проверке/спасброску существа рядом.'],
      ['spellStoringItem','Чародейский предмет','utility','Хранить заклинание 1–2 круга в предмете для многократного применения.'],
      ['magicItemAdept','Магический ремесленник','passive','Дополнительные слоты настройки и работа с редкими предметами.'],
      ['soulOfArtifice','Душа ремесленника','passive','Бонус к спасброскам за каждый настроенный магический предмет; не падает до 0 HP от смертельного удара.']
    ]
  };

  var SUBCLASS_FEATURES = {
    'Воин': {
      'Мастер боя': [[3,'superiorityDice','Манёвры и кости превосходства'],[7,'knowYourEnemy','Знание врага'],[10,'extraFightingStyle','Дополнительный боевой стиль'],[15,'relentless','Неустанный'],[18,'improvedSuperiority','Улучшенные кости превосходства']],
      'Мистический рыцарь': [[3,'eldritchKnight','Заклинания и Связанное оружие'],[7,'warMagic','Военная магия'],[10,'eldritchStrike','Эльдрический удар'],[15,'arcaneCharge','Арканический заряд'],[18,'improvedWarMagic','Улучшенная военная магия']]
    },
    'Плут': {
      'Вор': [[3,'fastHands','Быстрые руки'],[9,'supremeSneak','Непревзойдённая скрытность'],[13,'useMagicDevice','Использование магических предметов'],[17,'thiefReflexes','Воровская реакция']],
      'Убийца': [[3,'assassinAssassinate','Убийство из засады'],[9,'assassinInfiltration','Мастер проникновения'],[13,'assassinImpostor','Самозванец'],[17,'assassinDeathStrike','Смертельный удар']]
    },
    'Волшебник': {
      'Школа Воплощения': [[2,'sculptSpells','Ваяние заклинаний'],[6,'potentCantrip','Мощный заговор'],[10,'empoweredEvocation','Усиленное воплощение'],[14,'overchannel','Перенапряжение магии']],
      'Школа Ограждения': [[2,'arcaneWard','Магический оберег'],[6,'projectedWard','Проецируемый оберег'],[10,'improvedAbjuration','Улучшенное ограждение'],[14,'spellResistance','Магическое сопротивление']]
    },
    'Друид': {
      'Круг Земли': [[2,'naturalRecovery','Природное восстановление'],[6,'landStride','Стихийная поступь'],[10,'natureWard','Природный оберег'],[14,'natureSanctuary','Природное святилище']],
      'Круг Луны': [[2,'combatWildShape','Боевой дикий облик'],[6,'primalStrike','Изначальный удар'],[10,'elementalWildShape','Стихийный дикий облик'],[14,'thousandForms','Тысяча форм']]
    },
    'Бард': {
      'Коллегия знаний': [[3,'cuttingWords','Едкое слово'],[6,'additionalSecrets','Дополнительные магические тайны'],[14,'peerlessSkill','Непревзойдённое мастерство']],
      'Коллегия доблести': [[3,'combatInspiration','Боевое вдохновение'],[6,'valorExtraAttack','Дополнительная атака'],[14,'battleMagic','Боевая магия']]
    },
    'Жрец': {
      'Домен Жизни': [[1,'discipleOfLife','Последователь жизни'],[2,'preserveLife','Сохранение жизни'],[6,'blessedHealer','Благословенный целитель'],[8,'divineStrikeLife','Божественный удар жизни'],[17,'supremeHealing','Высшее исцеление']],
      'Домен Войны': [[1,'warDomainProficiencies','Владения домена войны'],[2,'warPriest','Воинствующий жрец'],[6,'guidedStrike','Направленный удар'],[8,'divineStrikeWar','Божественный удар войны'],[17,'avatarOfBattle','Аватар битвы']]
    },
    'Монах': {
      'Путь открытой длани': [[3,'openHandTechnique','Техника открытой длани'],[6,'wholenessOfBody','Прикосновение покоя'],[11,'tranquility','Безмятежность'],[17,'quiveringPalm','Дрожащая ладонь']],
      'Путь тени': [[3,'shadowArts','Искусства тени'],[6,'shadowStep','Шаг тени'],[11,'cloakOfShadows','Покров теней'],[17,'opportunist','Оппортунист']]
    },
    'Паладин': {
      'Клятва преданности': [[3,'sacredWeapon','Священное оружие'],[7,'devotionAura','Аура преданности'],[15,'purityOfSpirit','Чистота духа'],[20,'holyNimbus','Священный нимб']],
      'Клятва мести': [[3,'vowOfEnmity','Обет вражды'],[7,'relentlessAvenger','Неумолимый мститель'],[15,'soulOfVengeance','Душа возмездия'],[20,'avengingAngel','Мстящий ангел']]
    },
    'Следопыт': {
      'Охотник': [[3,'huntersPrey','Добыча охотника'],[7,'defensiveTactics','Оборонительная тактика'],[11,'multiattackHunter','Мультиатака охотника'],[15,'superiorHuntersDefense','Превосходная защита охотника']],
      'Повелитель зверей': [[3,'beastCompanion','Спутник зверь'],[7,'exceptionalTraining','Исключительная тренировка'],[11,'bestialFury','Звериная ярость'],[15,'shareSpells','Разделение заклинаний']]
    },
    'Чародей': {
      'Драконье происхождение': [[1,'draconicResilience','Драконья стойкость'],[6,'elementalAffinity','Стихийное родство'],[14,'dragonWings','Драконьи крылья'],[18,'draconicPresence','Драконье присутствие']],
      'Дикая магия': [[1,'wildMagicSurge','Всплеск дикой магии'],[6,'bendLuck','Искривление удачи'],[14,'controlledChaos','Контролируемый хаос'],[18,'spellBombardment','Бомбардировка заклинаний']]
    },
    'Колдун': {
      'Архифея': [[1,'feyPresence','Присутствие фей'],[6,'mistyEscape','Туманный побег'],[10,'beguilingDefenses','Обольстительная защита'],[14,'darkDelirium','Тёмное безумие']],
      'Исчадие': [[1,'darkOnesBlessing','Благословение тёмного'],[6,'darkOnesOwnLuck','Удача тёмного'],[10,'fiendishResilience','Стойкость исчадия'],[14,'hurlThroughHell','Швырок сквозь ад']]
    },
    'Варвар': {
      'Путь неистового берсерка': [[3,'frenzy','Безумие'],[6,'mindlessRage','Бессмысленная ярость'],[10,'intimidatingPresence','Внушительный вид'],[14,'retaliation','Возмездие']],
      'Путь тотемного воина': [[3,'totemSpirit','Дух тотема'],[6,'aspectOfBeast','Аспект зверя'],[10,'spiritWalker','Хождение с духами'],[14,'totemicAttunement','Тотемная настройка']]
    },
    'Изобретатель': {
      'Алхимик': [[3,'alchemicalSavvy','Алхимический мастер'],[5,'alchemicalSavant','Алхимический умелец'],[9,'restorativeReagents','Восстанавливающие реагенты'],[15,'chemicalMastery','Химическое мастерство']],
      'Артиллерист': [[3,'eldritchCannon','Эльдрическая пушка'],[5,'arcaneFirearm','Арканальное огнестрельное'],[9,'explosiveCannon','Взрывоопасная пушка'],[15,'fortifiedPosition','Укреплённая позиция']]
    }
  };

  var META_COST={careful:1,distant:1,empowered:1,extended:1,quickened:2,subtle:1,heightened:3};
  var META_NAMES={careful:'Осторожное',distant:'Далёкое',empowered:'Усиленное',extended:'Продлённое',quickened:'Ускоренное',subtle:'Скрытое',heightened:'Усиленное спасброском',twinned:'Сдвоенное'};
  var FEATURE_DEFS={};
  var SUBCLASS_MAP={};

  function addFeature(id,name,cls,action,description,level){ FEATURE_DEFS[id]={id:id,name:name,cls:cls,action:action,description:description,level:level||0}; }
  Object.keys(CORE).forEach(function(cls){ CORE[cls].forEach(function(f){addFeature(f[0],f[1],cls,f[2],f[3]);}); });
  Object.keys(SUBCLASS_FEATURES).forEach(function(cls){SUBCLASS_MAP[cls]={};Object.keys(SUBCLASS_FEATURES[cls]).forEach(function(sub){SUBCLASS_MAP[cls][sub]=SUBCLASS_FEATURES[cls][sub].map(function(x){addFeature(x[1],x[2],cls,'subclass',x[1]);return {level:x[0],id:x[1]};});});});

  function hero(){return global.currentChar||global.currentCharacter||null;}
  function num(v,d){var n=Number(v);return isFinite(n)?n:(d||0);}
  function classLevel(h,name){var c=(h&&h.classes||[]).find(function(x){return String(x.name)===name;});return c?num(c.level):0;}
  function hasClass(h,name){return classLevel(h,name)>0;}
  function abilityMod(h,a){var s=h&&h.abilityScores||h&&h.stats||{};var aliases={str:'strength',dex:'dexterity',con:'constitution',int:'intelligence',wis:'wisdom',cha:'charisma'};var v=s[a]!==undefined?s[a]:s[aliases[a]];return Math.floor((num(v,10)-10)/2);}
  function ensureState(h){if(!h.classFeaturesState)h.classFeaturesState={};if(!h.resources)h.resources={};return h.classFeaturesState;}
  function ensureRes(h,id,max,recharge){ensureState(h);max=num(max);var old=h.resources[id];if(!old||Number(old.max)!==Number(max)){var cur=old?Math.min(num(old.current),max):max;h.resources[id]={max:max,current:cur,recharge:recharge||'none'};}else h.resources[id].recharge=recharge||old.recharge||'none';return h.resources[id];}
  function spend(h,id,n){var r=h.resources&&h.resources[id];n=Math.max(1,num(n,1));if(!r||num(r.current)<n)return false;r.current-=n;return true;}
  function restore(h,type){if(!h)return;if(h.resources)Object.keys(h.resources).forEach(function(k){var r=h.resources[k];if(r&&(r.recharge===type||(type==='long'&&r.recharge==='short')))r.current=r.max;});if(type==='short'&&h.resources&&h.resources.shifterPrimevalForm){var pf=h.resources.shifterPrimevalForm;pf.current=Math.min(Number(pf.max)||0,(Number(pf.current)||0)+1);}if(type==='short'&&hasClass(h,'Чародей')&&h.resources&&h.resources.sorceryPoints){h.resources.sorceryPoints.current=Math.min(h.resources.sorceryPoints.max,h.resources.sorceryPoints.current+Math.floor(classLevel(h,'Чародей')/2));h.sorceryPoints=h.resources.sorceryPoints.current;}if(type==='short'||type==='long'){var s=ensureState(h);s.relentlessRageUses={used:0};}if(type==='encounter'&&hasClass(h,'Бистхарт')&&global.BeastheartRuntime&&typeof global.BeastheartRuntime.endEncounter==='function')global.BeastheartRuntime.endEncounter(h);if(hasClass(h,'Аккурсд')&&global.accursedRuntime&&typeof global.accursedRuntime.rest==='function')global.accursedRuntime.rest(h,type);if(hasClass(h,'Ведьма')&&global.witchRuntime&&typeof global.witchRuntime.rest==='function')global.witchRuntime.rest(h,type);if(hasClass(h,'Оккультист')&&global.occultistRuntime&&typeof global.occultistRuntime.rest==='function')global.occultistRuntime.rest(h,type);if(hasClass(h,'Псионик')&&global.DNDContent&&typeof global.DNDContent.getClass==='function'){var pp=global.DNDContent.getClass('Псионик');if(pp&&pp.hooks&&typeof pp.hooks.rest==='function')pp.hooks.rest(h,type);}if(hasClass(h,'Рунный хранитель')&&global.runeKeeperRuntime){if(type==='long'&&typeof global.runeKeeperRuntime.longRest==='function')global.runeKeeperRuntime.longRest(h);else if(type==='short'&&typeof global.runeKeeperRuntime.shortRest==='function')global.runeKeeperRuntime.shortRest(h);}if(hasClass(h,'Савант')&&global.savantRuntime){if(type==='long'&&typeof global.savantRuntime.longRest==='function')global.savantRuntime.longRest(h);else if(type==='short'&&typeof global.savantRuntime.shortRest==='function')global.savantRuntime.shortRest(h);}if(hasClass(h,'Пугилист')&&global.pugilistRuntime&&typeof global.pugilistRuntime.rest==='function')global.pugilistRuntime.rest(h,type);if(hasClass(h,'Алхимик')&&global.DNDContent&&typeof global.DNDContent.getClass==='function'){var ap=global.DNDContent.getClass('Алхимик');if(ap&&ap.hooks){var ah=type==='long'?ap.hooks.longRest:ap.hooks.shortRest;if(typeof ah==='function')ah(h);}}}
  function heal(h,n){var characterShape=h&&('hpCurrent' in h||'hpMax' in h);var max=characterShape?num(h.hpMax,h.maxHitPoints||h.maxHP||h.maxHp):num(h.maxHitPoints,h.maxHP||h.hpMax);var cur=characterShape?num(h.hpCurrent,h.hitPoints||h.hp||h.currentHP):num(h.hitPoints,h.hp||h.currentHP);var v=Math.max(0,Math.min(n,max>0?max-cur:n));var next=cur+v;if(characterShape){h.hpCurrent=next;h.hpMax=max;h.hp=h.hp||{};h.hp.current=next;h.hp.max=max;}else if('hitPoints' in h)h.hitPoints=next;else h.hp=next;return v;}
  function roll(s){return Math.floor(Math.random()*s)+1;}
  function dice(expr){var m=String(expr).match(/^(\d+)d(\d+)(?:([+-])\s*(\d+))?$/i);if(!m)return 0;var t=0;for(var i=0;i<num(m[1]);i++)t+=roll(num(m[2]));if(m[3])t+=(m[3]==='-'?-1:1)*num(m[4]);return t;}
  function bardDie(l){return l>=15?12:l>=10?10:l>=5?8:6;}
  function rageCount(l){return l>=17?6:l>=12?5:l>=6?4:l>=3?3:2;}
  function rageBonus(l){return l>=16?4:l>=9?3:2;}
  function sneakDice(l){return Math.ceil(l/2);}
  function actionSurgeMax(l){return l>=17?2:l>=2?1:0;}
  function indomitableMax(l){return l>=17?3:l>=13?2:l>=9?1:0;}
  function kiMax(l){return Math.max(0,l);}
  function channelMax(l){return l>=18?3:l>=6?2:1;}
  function layOnHandsMax(l){return l*5;}
  function isAssassin(h){return String(getSubclass(h,'Плут')||'')==='Убийца';}
  function getSubclass(h,cls){var c=(h&&h.classes||[]).find(function(x){return String(x.name)===cls;});return c&&c.subclass?String(c.subclass):null;}
  function getSubclassPickLevel(cls){var list=typeof global.getAvailableSubclasses==='function'?global.getAvailableSubclasses(cls):[];return list.length?num(list[0].pickLevel,3):3;}
  function externalPack(cls){return global.DNDContent&&global.DNDContent.getClass?global.DNDContent.getClass(cls):null;}
  function externalFeatureList(h,cls){return global.DNDContent&&global.DNDContent.availableFeatures?global.DNDContent.availableFeatures(h,cls):[];}
  function externalUse(h,id,ctx){var f=null,classes=(h&&h.classes)||[];if(global.DNDContent&&global.DNDContent.getFeature){for(var i=0;i<classes.length&&!f;i++){var c=classes[i],p=global.DNDContent.getClass&&global.DNDContent.getClass(c.name);if(p)f=global.DNDContent.getFeature(id,p.id);}}if(!f&&global.DNDContent)f=global.DNDContent.getFeature(id);if(!f||!global.DNDContent.invoke)return null;return global.DNDContent.invoke(f.className||f.name,h,id,ctx||{});}
  function externalSync(h){if(!global.DNDContent||!global.DNDContent.listClasses)return;global.DNDContent.listClasses().forEach(function(x){var p=global.DNDContent.getClass(x.name);if(p&&p.hooks&&typeof p.hooks.sync==='function'&&classLevel(h,x.name)>0)p.hooks.sync(h);});}
  function isSubclassFeatureAvailable(h,cls,id){var sub=getSubclass(h,cls),arr=sub&&SUBCLASS_MAP[cls]&&SUBCLASS_MAP[cls][sub];if(!arr)return false;var lvl=classLevel(h,cls);return arr.some(function(x){return x.id===id&&lvl>=x.level;});}
  function featureAvailableForCurrentBuild(h,id){if(!h||!id)return false;var ok=false;(h.classes||[]).forEach(function(c){var cls=String(c.name||''),lvl=num(c.level);if(!lvl)return;var core=(CORE[cls]||[]).some(function(f){var req=(function(){var m={rage:1,rele:0,reckless:2,dangerSense:2,fastMovement:5,feralInstinct:7,brutalCritical:9,relentlessRage:11,persistentRage:15,indomitableMight:18,primalChampion:20,bardicInspiration:1,jackOfAllTrades:2,songOfRest:2,countercharm:6,magicalSecrets:10,superiorInspiration:20,secondWind:1,actionSurge:2,indomitable:9,fightingStyle:1,extraAttack:5,fighterRemarkableAthlete:7,survivor:18,arcaneRecovery:1,spellMastery:18,signatureSpells:20,arcaneMastery:20,druidic:1,wildShape:2,timelessBody:18,beastSpells:18,archdruid:20,channelDivinity:2,turnUndead:2,destroyUndead:5,divineIntervention:10,greaterDivineIntervention:20,flurry:2,patientDefense:2,stepWind:2,stunningStrike:5,deflectMissiles:3,slowFall:4,evasionMonk:7,stillnessOfMind:7,diamondSoul:14,perfectSelf:20,divineSense:1,layOnHands:1,divineSmite:2,auraOfProtection:6,auraOfCourage:10,improvedDivineSmite:11,cleansingTouch:14,holyNexus:20,sneakAttack:1,cunningAction:2,uncannyDodge:5,evasion:7,reliableTalent:11,blindsense:14,slipperyMind:15,strokeOfLuck:20,favoredEnemy:1,naturalExplorer:1,rangerFightingStyle:2,huntersMark:2,landsStrideRanger:8,hideInPlainSight:10,vanish:14,feralSenses:18,foeSlayer:20,fontOfMagic:2,metamagic:3,sorcerousRestoration:20,sorcerousOriginMastery:18,pactBoon:3,eldritchInvocations:2,mysticArcanum:11,eldritchMaster:20,magicalTinkering:1,infuseItem:2,flashOfGenius:7,spellStoringItem:11,magicItemAdept:10,soulOfArtifice:20};return m[f[0]]||1;})();return f[0]===id&&lvl>=req;});if(core)ok=true;var sub=getSubclass(h,cls),arr=sub&&SUBCLASS_MAP[cls]&&SUBCLASS_MAP[cls][sub];if(arr&&arr.some(function(x){return x.id===id&&lvl>=x.level;}))ok=true;});if(!ok&&global.DNDFeats&&global.DNDFeats.has)ok=!!global.DNDFeats.has(h,id);if(!ok&&global.DNDContent&&global.DNDContent.getFeature){var f=global.DNDContent.getFeature(id);if(f&&f.className&&classLevel(h,f.className)>0)ok=true;}return ok;}
  function activeRage(h){return !!(h&&h.classFeaturesState&&h.classFeaturesState.raging);}

  function orderKeyForBridge(h){var c=(h&&h.classes||[]).find(function(x){return String(x.name)==='Кровавый охотник';});var s=c&&String(c.subclass||'').toLowerCase();return s.indexOf('призрач')>=0?'ghostslayer':s;}

  function syncExtendedRuntimeResources(h){
    if(!h)return;
    var l, s, r, rt, pack;

    // Accursed: runtime owns metamorphosis/spell state.
    l=classLevel(h,'Аккурсд');
    if(l){
      rt=global.accursedRuntime;
      if(rt&&typeof rt.sync==='function')rt.sync(h);
      s=h.classFeaturesState&&h.classFeaturesState.accursed;
      if(s&&Number.isFinite(Number(s.metamorphosesUsesMax))){
        ensureRes(h,'accursedMetamorphoses',Number(s.metamorphosesUsesMax)||0,'long');
        h.resources.accursedMetamorphoses.current=Math.max(0,Math.min(Number(s.metamorphosesUses)||0,h.resources.accursedMetamorphoses.max));
      }
    }

    // Rune Keeper: charges are held by the runtime state.
    l=classLevel(h,'Рунный хранитель');
    if(l){
      rt=global.runeKeeperRuntime;
      if(rt&&typeof rt.sync==='function')rt.sync(h);
      s=h.classFeaturesState&&h.classFeaturesState.runekeeper;
      if(s){
        ensureRes(h,'runicCharges',Number(s.runicChargeMax)||Math.floor(l/2),'long');
        h.resources.runicCharges.current=Math.max(0,Math.min(Number(s.runicCharges)||0,h.resources.runicCharges.max));
      }
    }

    // Savant: reactions are runtime-owned. Focuses are selections, not a pool.
    l=classLevel(h,'Савант');
    if(l){
      rt=global.savantRuntime;
      if(rt&&typeof rt.sync==='function')rt.sync(h);
      s=h.classFeaturesState&&h.classFeaturesState.savant;
      if(s){
        ensureRes(h,'savantReactions',Number(s.reactionMax)||1,'long');
        h.resources.savantReactions.current=Math.max(0,Math.min(Number(s.reactionUses)||0,h.resources.savantReactions.max));
      }
    }

    // Alchemist / Warden already keep their live pools in h.resources through
    // their DNDContent hooks. We only ensure the hooks have had a chance to run.
    l=classLevel(h,'Алхимик');
    if(l){
      pack=global.DNDContent&&global.DNDContent.getClass?global.DNDContent.getClass('Алхимик'):null;
      if(pack&&pack.hooks&&typeof pack.hooks.sync==='function')pack.hooks.sync(h);
    }
    l=classLevel(h,'Страж');
    if(l){
      pack=global.DNDContent&&global.DNDContent.getClass?global.DNDContent.getClass('Страж'):null;
      if(pack&&pack.hooks&&typeof pack.hooks.sync==='function')pack.hooks.sync(h);
    }

    // Remaining extended runtimes expose progression/state rather than a
    // mutable pool. Bridge only the REAL runtime resources; never invent a
    // second counter for the same class feature.
    // Accursed spell slots are owned by syncAccursed() in expansion_classes_pack.js; do not create a second counter here.

    l=classLevel(h,'Псионик');
    if(l)ensureRes(h,'psiPoints',l,'short');

    l=classLevel(h,'Военачальник');
    if(l){
      ensureRes(h,'warlordExploitDice',l>=15?6:4,'short');
      ensureRes(h,'warlordInspiringWord',l>=17?7:l>=13?6:l>=9?5:l>=4?4:3,'short');
      ensureRes(h,'warlordRally',l>=17?3:l>=13?2:1,'short');
    }

    l=classLevel(h,'Заклинатель клинка');
    if(l)ensureRes(h,'arcaneSurges',Math.max(2,Math.ceil((Number(h.proficiencyBonus)||2))),'short');

    l=classLevel(h,'Страж');
    if(l){
      pack=global.DNDContent&&global.DNDContent.getClass?global.DNDContent.getClass('Страж'):null;
      if(pack&&pack.hooks&&typeof pack.hooks.sync==='function')pack.hooks.sync(h);
      ensureRes(h,'wardenInterrupt',l>=17?6:l>=13?5:l>=9?4:l>=5?3:0,'short');
      ensureRes(h,'wardenFontOfLife',l>=13?2:0,'short');
      ensureRes(h,'wardenSurvive',l>=9?1:0,'long');
      ensureRes(h,'wardenLegendaryResistance',l>=20?3:0,'long');
      ensureRes(h,'wardenSecondWind',1,'short');
    }
    l=classLevel(h,'Пугилист');
    if(l){
      pack=global.DNDContent&&global.DNDContent.getClass?global.DNDContent.getClass('Пугилист'):null;
      if(pack&&pack.hooks&&typeof pack.hooks.sync==='function')pack.hooks.sync(h);
    }
    l=classLevel(h,'Иллирригер');
    if(l){
      pack=global.DNDContent&&global.DNDContent.getClass?global.DNDContent.getClass('Иллирригер'):null;
      if(pack&&pack.hooks&&typeof pack.hooks.sync==='function')pack.hooks.sync(h);
      ensureRes(h,'illriggerSeals',l>=19?7:l>=13?6:l>=7?5:l>=3?4:3,'short');
      if(l>=6)ensureRes(h,'illriggerConduit',l>=20?10:l>=19?10:l>=17?9:l>=15?8:l>=14?7:l>=11?6:l>=9?5:l>=7?4:3,'long');
      if(l>=3)ensureRes(h,'illriggerInvokeHell',1,'short');
      if(l>=14)ensureRes(h,'illriggerSuperiorInterdict',1,'long');
      if(l>=17)ensureRes(h,'illriggerInfernalMajesty',1,'long');
      if(l>=20)ensureRes(h,'illriggerMasterOfHell',1,'long');
    }

    l=classLevel(h,'Кровавый охотник');
    if(l){
      rt=global.DNDBloodHunter;
      if(rt&&typeof rt.sync==='function')rt.sync(h);
      ensureRes(h,'bloodMaledict',l>=17?4: l>=13?3: l>=6?2:1,'short');
      if(orderKeyForBridge(h)==='ghostslayer')ensureRes(h,'bloodMaledict',l>=17?5:l>=13?4:l>=6?3:2,'short');
      if(l>=3&&orderKeyForBridge(h)==='profaneSoul'){
        var bhSlots=l>=19?4:l>=13?3:l>=7?2:1;
        ensureRes(h,'bhPactSlots',bhSlots,'short');
      }
      if(l>=7&&orderKeyForBridge(h)==='ghostslayer')ensureRes(h,'bhAetherWalk',l>=15?2:1,'short');
      if(l>=3&&orderKeyForBridge(h)==='lycan')ensureRes(h,'bhHybridTransformation',l>=11?2:1,'short');
      if(l>=18&&orderKeyForBridge(h)==='lycan')ensureRes(h,'bhHybridTransformation',999,'short');
      if(l>=18&&orderKeyForBridge(h)==='mutant')ensureRes(h,'bhExaltedMutation',Math.max(1,abilityMod(h,'int')),'long');
    }

    l=classLevel(h,'Шифтер');
    if(l){
      var maxAdr=Math.max(1,abilityMod(h,'con'));
      ensureRes(h,'shifterAdrenaline',maxAdr,'short');
      ensureRes(h,'shifterPrimevalForm',l>=11?3:0,'long');
    }

    l=classLevel(h,'Сосуд');
    if(l){
      ensureRes(h,'vesselMagicSlots',l>=18?4:l>=11?3:2,'short');
    }

    l=classLevel(h,'Некромант');
    if(l){
      ensureRes(h,'charnelTouch',l*5,'long');
      ensureRes(h,'undyingServitude',l>=18?1:0,'long');
    }
    l=classLevel(h,'Мученик');
    if(l){
      var mr=global.martyrRuntime;
      var mp=mr&&mr.progression&&mr.progression.levels?mr.progression.levels[l]:null;
      if(mp&&Number.isFinite(Number(mp.spellUses)))ensureRes(h,'martyrSpellUses',Number(mp.spellUses),'long');
      var dr=l>=17?10:l>=13?6:l>=9?3:0;
      ensureRes(h,'martyrDivineRespite',dr,'long');
    }
    // Beastheart: Ferocity lives on the companion entity; hero.resources is a live mirror for the common UI/resolver.
    l=classLevel(h,'Бистхарт');
    if(l){
      rt=global.BeastheartRuntime;
      if(rt&&typeof rt.sync==='function')rt.sync(h);
      var bc=rt&&typeof rt=== 'object' && h.classFeaturesState&&h.classFeaturesState.beastheartCompanionId && global.DNDSecondaryEntities&&global.DNDSecondaryEntities.get
        ?global.DNDSecondaryEntities.get(h.classFeaturesState.beastheartCompanionId):null;
      var bf=bc&&bc.resources?Number(bc.resources.ferocity)||0:0;
      ensureRes(h,'beastheartFerocity',9999,'encounter');
      h.resources.beastheartFerocity.current=bf;
      h.resources.beastheartFerocity.max=9999;
      h.resources.beastheartFerocity.unbounded=true;
      h.resources.beastheartFerocity.displayMax=null;
    }

    l=classLevel(h,'Оккультист');
    if(l){
      pack=global.DNDContent&&global.DNDContent.getClass?global.DNDContent.getClass('Оккультист'):null;
      if(pack&&pack.hooks&&typeof pack.hooks.sync==='function')pack.hooks.sync(h);
      s=h.classFeaturesState||{};
      var fateMax=Math.max(0,Number(s.occultistFateReadingUses)||0);
      if(fateMax)ensureRes(h,'occultistFateReading',fateMax,'long');
      if(Number(s.occultistBloodMagic&&s.occultistBloodMagic.maxLevels)>=5){
        var bloodMax=Number(s.occultistBloodMagic.maxLevels)||l;
        ensureRes(h,'occultistBloodMagic',bloodMax,'long');
        h.resources.occultistBloodMagic.current=Math.max(0,bloodMax-Number(s.occultistBloodMagic.usedLevels||0));
      }
    }
  }

  function syncClassResources(h){
    if(!h)return;
    externalSync(h);
    var l;
    l=classLevel(h,'Варвар');if(l){h.ragesCount=rageCount(l);h.rageDamageBonus=rageBonus(l);ensureRes(h,'rages',rageCount(l),'long');}
    l=classLevel(h,'Бард');if(l){h.bardicInspirationDie=bardDie(l);ensureRes(h,'bardicInspiration',Math.max(1,abilityMod(h,'cha')),'long');if(l>=5)h.resources.bardicInspiration.recharge='short';}
    l=classLevel(h,'Воин');if(l){ensureRes(h,'secondWind',1,'short');ensureRes(h,'actionSurges',actionSurgeMax(l),'short');ensureRes(h,'indomitable',indomitableMax(l),'long');}
    l=classLevel(h,'Монах');if(l){h.kiPoints=kiMax(l);ensureRes(h,'ki',l,'short');}
    l=classLevel(h,'Чародей');if(l>=2){ensureRes(h,'sorceryPoints',l,'long');h.sorceryPoints=h.resources.sorceryPoints.current;}
    l=classLevel(h,'Плут');if(l)h.sneakAttackDice=sneakDice(l);
    l=classLevel(h,'Паладин');if(l){ensureRes(h,'layOnHands',layOnHandsMax(l),'long');ensureRes(h,'divineSense',1+abilityMod(h,'cha')>1?1+abilityMod(h,'cha'):1,'long');}
    l=classLevel(h,'Жрец');if(l){ensureRes(h,'channelDivinity',channelMax(l),'short');}
    l=classLevel(h,'Друид');if(l){ensureRes(h,'wildShape',2,'short');}
    l=classLevel(h,'Следопыт');if(l){ensureRes(h,'huntersMark',1,'short');}
    l=classLevel(h,'Колдун');if(l){var slots=l>=17?4:l>=11?3:l>=5?2:1;ensureRes(h,'pactSlots',slots,'short');}
    l=classLevel(h,'Изобретатель');if(l){ensureRes(h,'infusions',Math.max(2,Math.floor((l+1)/3)),'long');ensureRes(h,'flashOfGenius',Math.max(1,abilityMod(h,'int')),'long');}
    // Extended-class runtimes: expose their real resource pools in the
    // common layer. A runtime-owned state remains the source of truth; a
    // common resource is only a bridge for UI/combat when the runtime itself
    // already uses h.resources as its state store.
    syncExtendedRuntimeResources(h);

    if(isSubclassFeatureAvailable(h,'Воин','superiorityDice'))ensureRes(h,'superiorityDice',classLevel(h,'Воин')>=15?6:4,'short');
    if(isSubclassFeatureAvailable(h,'Варвар','frenzy'))ensureRes(h,'frenzy',1,'long');
    if(isSubclassFeatureAvailable(h,'Волшебник','arcaneWard'))ensureRes(h,'arcaneWard',0,'long');
    if(isSubclassFeatureAvailable(h,'Жрец','warPriest'))ensureRes(h,'warPriest',Math.max(1,abilityMod(h,'wis')),'long');
    if(isSubclassFeatureAvailable(h,'Паладин','holyNimbus'))ensureRes(h,'holyNimbus',1,'long');
    if(isSubclassFeatureAvailable(h,'Монах','wholenessOfBody'))ensureRes(h,'wholenessOfBody',1,'long');
    if(isSubclassFeatureAvailable(h,'Колдун','darkOnesLuck'))ensureRes(h,'darkOnesLuck',1,'short');
    if(isSubclassFeatureAvailable(h,'Колдун','hurlThroughHell'))ensureRes(h,'hurlThroughHell',1,'long');
    if(isSubclassFeatureAvailable(h,'Чародей','bendLuck'))ensureRes(h,'bendLuck',Math.max(1,abilityMod(h,'cha')),'long');
  }

  function buildFeatureSet(h){
    var out=[];if(!h)return out;syncClassResources(h);
    CLASS_NAMES.forEach(function(cls){var lvl=classLevel(h,cls);if(!lvl)return;(CORE[cls]||[]).forEach(function(f){var id=f[0];var req={rage:1,rele:0,reckless:2,dangerSense:2,fastMovement:5,feralInstinct:7,brutalCritical:9,relentlessRage:11,persistentRage:15,indomitableMight:18,primalChampion:20,bardicInspiration:1,jackOfAllTrades:2,songOfRest:2,countercharm:6,magicalSecrets:10,superiorInspiration:20,secondWind:1,actionSurge:2,indomitable:9,fightingStyle:1,extraAttack:5,fighterRemarkableAthlete:7,survivor:18,arcaneRecovery:1,spellMastery:18,signatureSpells:20,arcaneMastery:20,druidic:1,wildShape:2,timelessBody:18,beastSpells:18,archdruid:20,channelDivinity:2,turnUndead:2,destroyUndead:5,divineIntervention:10,greaterDivineIntervention:20,flurry:2,patientDefense:2,stepWind:2,stunningStrike:5,deflectMissiles:3,slowFall:4,evasionMonk:7,stillnessOfMind:7,diamondSoul:14,perfectSelf:20,divineSense:1,layOnHands:1,divineSmite:2,auraOfProtection:6,auraOfCourage:10,improvedDivineSmite:11,cleansingTouch:14,holyNexus:20,sneakAttack:1,cunningAction:2,uncannyDodge:5,evasion:7,reliableTalent:11,blindsense:14,slipperyMind:15,strokeOfLuck:20,favoredEnemy:1,naturalExplorer:1,rangerFightingStyle:2,huntersMark:2,landsStrideRanger:8,hideInPlainSight:10,vanish:14,feralSenses:18,foeSlayer:20,fontOfMagic:2,metamagic:3,sorcerousRestoration:20,sorcerousOriginMastery:18,pactBoon:3,eldritchInvocations:2,mysticArcanum:11,eldritchMaster:20,magicalTinkering:1,infuseItem:2,flashOfGenius:7,spellStoringItem:11,magicItemAdept:10,soulOfArtifice:20}[id]||1;if(lvl>=req)out.push(id);});
      var sub=getSubclass(h,cls);if(sub&&SUBCLASS_MAP[cls]&&SUBCLASS_MAP[cls][sub])SUBCLASS_MAP[cls][sub].forEach(function(x){if(lvl>=x.level)out.push(x.id);});
    });
    if(global.DNDContent&&global.DNDContent.listClasses)global.DNDContent.listClasses().forEach(function(x){if(classLevel(h,x.name)>0)externalFeatureList(h,x.name).forEach(function(f){if(out.indexOf(f.id)<0){FEATURE_DEFS[f.id]=Object.assign({cls:x.name,action:f.action||'passive',description:f.description||'',name:f.name||f.id,level:f.level||1},f);out.push(f.id);}});});
    return out;
  }

  function useRage(h){syncClassResources(h);if(!hasClass(h,'Варвар'))return {ok:false,reason:'Нет уровня варвара.'};if(activeRage(h))return {ok:false,reason:'Ярость уже активна.'};if(!spend(h,'rages',1))return {ok:false,reason:'Ярости закончились.'};ensureState(h).raging=true;ensureState(h).rageMaintained=true;return {ok:true,message:'💢 Ярость активна: +'+h.rageDamageBonus+' к урону Силой и сопротивление физическому урону.'};}
  function toggleReckless(h){if(!hasClass(h,'Варвар'))return {ok:false,reason:'Нет уровня варвара.'};ensureState(h).recklessThisTurn=true;return {ok:true,message:'🪓 Безрассудная атака включена.'};}
  function useSecondWind(h){syncClassResources(h);if(!spend(h,'secondWind',1))return {ok:false,reason:'Второе дыхание уже потрачено.'};var healv=dice('1d10')+classLevel(h,'Воин');var got=heal(h,healv);return {ok:true,amount:got,message:'💚 Второе дыхание: +'+got+' HP.'};}
  function useActionSurge(h){syncClassResources(h);if(!spend(h,'actionSurges',1))return {ok:false,reason:'Всплеск действий недоступен.'};ensureState(h).actionSurgeUsed=true;if(h.turnResources)h.turnResources.actions=num(h.turnResources.actions,1)+1;return {ok:true,message:'⚡ Всплеск действий: дополнительное действие получено.'};}
  function useIndomitable(h,ctx){syncClassResources(h);ctx=ctx||{};if(!ctx.stat||ctx.dc==null)return {ok:false,reason:'Непреклонность требует проваленный спасбросок: укажите stat и DC.'};if(ctx.success!==false)return {ok:false,reason:'Непреклонность применяется только после провала спасброска.'};if(!spend(h,'indomitable',1))return {ok:false,reason:'Непреклонность недоступна на текущем уровне.'};var reroll=global.DNDCombat&&global.DNDCombat.savingThrow?global.DNDCombat.savingThrow(h,String(ctx.stat).toLowerCase(),num(ctx.dc),ctx.mode||'normal',ctx.saveCtx||{}):null;if(!reroll)return {ok:false,reason:'Боевой движок спасбросков недоступен.'};return {ok:true,reroll:true,save:reroll,success:!!reroll.success,message:reroll.success?'🛡️ Непреклонность: новый спасбросок успешен.':'🛡️ Непреклонность: новый спасбросок также провален.'};}
  function useCunningAction(h,kind){if(!hasClass(h,'Плут'))return {ok:false,reason:'Нет уровня плута.'};kind=String(kind||'dash').toLowerCase();if(['dash','disengage','hide'].indexOf(kind)<0)kind='dash';if(h.turnResources)h.turnResources.bonusAction=0;return {ok:true,message:'🗡️ Действие схитростью: '+kind+'.'};}
  function useMonk(h,id){syncClassResources(h);if(!hasClass(h,'Монах')||!spend(h,'ki',1))return {ok:false,reason:'Недостаточно Ки.'};if(h.turnResources)h.turnResources.bonusAction=0;return {ok:true,message:id==='flurry'?'🧘 Шквал ударов: две безоружные атаки.':id==='patientDefense'?'🛡️ Терпеливая оборона: Dodge.':'💨 Шаг ветра: Dash/Disengage.'};}
  function giveBardic(h,target){syncClassResources(h);if(!target)return {ok:false,reason:'Нужен союзник.'};if(!spend(h,'bardicInspiration',1))return {ok:false,reason:'Вдохновение закончилось.'};if(!target.bardicInspiration)target.bardicInspiration=[];target.bardicInspiration.push({die:h.bardicInspirationDie,source:h.name||'Бард'});return {ok:true,message:'🎵 '+(target.name||'Союзник')+' получает d'+h.bardicInspirationDie+' вдохновения.'};}
  function useBardicDie(h){if(!h.bardicInspiration||!h.bardicInspiration.length)return {ok:false,reason:'Нет кости вдохновения.'};var d=h.bardicInspiration.shift();return {ok:true,amount:roll(num(d.die,6)),message:'🎵 Вдохновение использовано.'};}
  function spendSorcery(h,cost){syncClassResources(h);if(!spend(h,'sorceryPoints',cost))return {ok:false,reason:'Недостаточно очков чародейства.'};h.sorceryPoints=h.resources.sorceryPoints.current;return {ok:true};}
  function applyMetamagic(h,meta,spell){var l=classLevel(h,'Чародей');if(l<3)return {ok:false,reason:'Метамагия доступна с 3 уровня чародея.'};var cost=meta==='twinned'?num(spell&&spell.twinnedCost,1):num(META_COST[meta],0);if(!cost)return {ok:false,reason:'Неизвестная метамагия.'};var r=spendSorcery(h,cost);if(!r.ok)return r;ensureState(h).lastMetamagic={id:meta,cost:cost,pending:true,spell:spell||null};h.sorceryPoints=h.resources.sorceryPoints.current;return {ok:true,cost:cost,message:'✨ Метамагия: '+(META_NAMES[meta]||meta)+' (-'+cost+' очк.)'};}
  function useLayOnHands(h,amount,target){syncClassResources(h);var pool=h.resources.layOnHands;if(!pool||pool.current<=0)return {ok:false,reason:'Пул Наложения рук пуст.'};var v=Math.min(num(amount,1),pool.current);pool.current-=v;if(target){target.hitPoints=Math.min(num(target.maxHitPoints,target.hpMax||999999),num(target.hitPoints,target.hp||0)+v);}else heal(h,v);return {ok:true,amount:v,message:'✨ Наложение рук: '+v+' HP.'};}
  function useChannel(h,kind,ctx){syncClassResources(h);ctx=ctx||{};if(kind==='turnUndead'){var targets=Array.isArray(ctx.targets)?ctx.targets.filter(Boolean):[];if(!targets.length&&ctx.target)targets=[ctx.target];if(!targets.length)return {ok:true,pendingSelection:true,message:'☀️ Изгнание нежити: выберите нежить в пределах 30 футов.'};if(!spend(h,'channelDivinity',1))return {ok:false,reason:'Божественный канал недоступен.'};var results=[];targets.forEach(function(t){if(!t||String(t.creatureType||t.typeName||'').toLowerCase()!=='undead'){results.push({target:t&& (t.name||t.id),ignored:true,reason:'Цель не является нежитью.'});return;}if(global.DNDBattleBoard&&ctx.sourceToken&&ctx.targetTokens&&ctx.targetTokens[t.id]){var d=global.DNDBattleBoard.distanceFt(ctx.sourceToken,ctx.targetTokens[t.id]);if(d>30){results.push({target:t.name||t.id,ignored:true,reason:'Цель дальше 30 фт.'});return;}}var sv=global.DNDCombat&&global.DNDCombat.savingThrow?global.DNDCombat.savingThrow(t,'wis',num(ctx.dc,8)+abilityMod(h,'wis')+profBonus(h),'normal',{fromFiendOrUndead:false}):{success:true};var turned=!sv.success;if(turned){if(global.DNDCombat&&global.DNDCombat.toggleCondition)global.DNDCombat.toggleCondition(t,'Испуган',true);var st=t.classFeaturesState||(t.classFeaturesState={});st.turnedBy=t.id||h.id;st.turnedUntilRound=num(ctx.round,0)+10;}results.push({target:t.name||t.id,save:sv,turned:turned});});return {ok:true,results:results,message:'☀️ Изгнание нежити: '+results.filter(function(x){return x.turned;}).length+' целей обращены.'};}if(!spend(h,'channelDivinity',1))return {ok:false,reason:'Божественный канал недоступен.'};return {ok:true,message:'☀️ Божественный канал: '+(kind||'особенность домена')+'.'};}
  function useWildShape(h){syncClassResources(h);if(!spend(h,'wildShape',1))return {ok:false,reason:'Нет доступного Дикого облика.'};ensureState(h).wildShapeActive=true;return {ok:true,message:'🐺 Дикий облик активирован.'};}
  function useHuntersMark(h){if(!hasClass(h,'Следопыт'))return {ok:false,reason:'Нет уровня следопыта.'};ensureState(h).huntersMarkActive=true;return {ok:true,message:'🏹 Метка охотника активна: +1d6 по выбранной цели.'};}
  function useFlashOfGenius(h){syncClassResources(h);if(!spend(h,'flashOfGenius',1))return {ok:false,reason:'Вспышка гениальности закончилась.'};return {ok:true,amount:abilityMod(h,'int'),message:'🧠 Вспышка гениальности: +'+abilityMod(h,'int')+'.'};}
  function spendSpellSlotAny(h,minimumLevel,preferPact){
    minimumLevel=Math.max(1,num(minimumLevel,1));h.spellSlotsData=h.spellSlotsData||{};
    function pact(){var p=h.pactMagicData;if(p&&num(p.max)>num(p.used)&&num(p.slotLevel)>=minimumLevel){p.used=num(p.used)+1;return {kind:'pact',slotLevel:num(p.slotLevel)};}return null;}
    function normal(){for(var l=minimumLevel;l<=9;l++){var s=h.spellSlotsData[l];if(s&&num(s.max)>num(s.used)){s.used=num(s.used)+1;return {kind:'spell',slotLevel:l};}}return null;}
    return preferPact===false?normal():(pact()||normal());
  }
  function useArcaneRecovery(h,ctx){syncClassResources(h);ctx=ctx||{};var wl=classLevel(h,'Волшебник');if(wl<1)return {ok:false,reason:'Нет уровня волшебника.'};var maxRestore=Math.ceil(wl/2),slots=h.spellSlotsData||{},requested=Array.isArray(ctx.slotLevels)?ctx.slotLevels.map(Number):[];if(ctx.slotLevel!=null)requested.push(Number(ctx.slotLevel));requested=requested.filter(function(x){return isFinite(x)&&x>=1&&x<=5;});if(!requested.length)return {ok:true,pendingSelection:true,maxLevels:maxRestore,message:'📘 Магическое восстановление: выберите ячейки суммарным кругом не более '+maxRestore+'.'};var sum=0,restored=[];requested.forEach(function(l){if(sum>=maxRestore)return;var sl=slots[l];if(!sl)return;var avail=Math.max(0,num(sl.used));if(!avail)return;sl.used=Math.max(0,num(sl.used)-1);sum+=l;restored.push(l);});if(sum>maxRestore){var undo=restored.pop();if(undo!=null&&slots[undo])slots[undo].used=num(slots[undo].used)+1;sum-=undo;}if(!restored.length)return {ok:false,reason:'Нет подходящих потраченных ячеек для восстановления.'};return {ok:true,restored:restored,levelsRestored:sum,message:'📘 Магическое восстановление: восстановлены ячейки '+restored.join(', ')+'.'};}
  function useDivineSmite(h,spellLevel){var l=num(spellLevel,1);if(l<1)return {ok:false,reason:'Нужна ячейка заклинания.'};var spent=spendSpellSlotAny(h,l);if(!spent)return {ok:false,reason:'Нет доступной ячейки '+l+' круга или Pact Magic.'};var s=ensureState(h);s.pendingOnHit=s.pendingOnHit||{};s.pendingOnHit.divineSmite={dice:(2+l)+'d8',damageType:'излучение',slotLevel:spent.slotLevel,slotKind:spent.kind};return {ok:true,extraDice:(2+l)+'d8',prepared:true,spellSlotLevel:spent.slotLevel,spellSlotKind:spent.kind,message:'⚔️ Божественная кара подготовлена: после попадания +'+(2+l)+'d8 излучением.'};}
  function useRelentlessRage(h,ctx){return resolveReaction(h,'relentlessRage',ctx||{});}
  function useDeflectMissiles(h,damage,ctx){if(!hasClass(h,'Монах'))return {ok:false,reason:'Нет уровня монаха.'};ctx=ctx||{};var red=Math.min(num(damage),num(10*classLevel(h,'Монах'))+abilityMod(h,'dex'));var remaining=Math.max(0,num(damage)-red),out={ok:true,reduced:red,remainingAmount:remaining,returnedAttack:false};if(num(damage)>0&&red>=num(damage)&&ctx.returnTarget&&ctx.returnAttackBonus!=null){var cost=1;out.returnedAttack=true;out.returnTargetId=ctx.returnTarget.id;out.returnAttack={bonus:num(ctx.returnAttackBonus),damage:ctx.returnDamage||('1d'+(ctx.projectileDie||6)),damageType:ctx.damageType||'дробящий'};}out.message=out.returnedAttack?'🏹 Отражение стрел: урон полностью поглощён, можно вернуть снаряд атакой.':'🏹 Отражение стрел: урон уменьшен на '+red+'.';return out;}
  function reactionOptions(h,ctx){
    ctx=ctx||{};if(!h)return null;syncClassResources(h);var r=h.turnResources||{},ids=buildFeatureSet(h),out=[];
    if(r.reaction===false)return null;
    var state=ensureState(h);
    if(ids.indexOf('uncannyDodge')>=0&&ctx.source==='attack'&&ctx.visible!==false&&num(ctx.amount)>0)out.push({id:'uncannyDodge',priority:10,label:'Невероятное уклонение',description:'Уменьшить урон от атаки вдвое.'});
    if(ids.indexOf('deflectMissiles')>=0&&ctx.source==='attack'&&ctx.attackKind==='rangedWeapon'&&ctx.projectile&&num(ctx.amount)>0)out.push({id:'deflectMissiles',priority:20,label:'Отражение стрел',description:'Уменьшить дальнобойный урон.'});
    if(ids.indexOf('slowFall')>=0&&ctx.fall&&num(ctx.amount)>0)out.push({id:'slowFall',priority:30,label:'Медленное падение',description:'Уменьшить урон от падения на 5 × уровень монаха.'});
    if(ids.indexOf('relentlessRage')>=0&&state.raging&&num(ctx.amount)>0&&num(h.hp)<=num(ctx.amount))out.push({id:'relentlessRage',priority:40,label:'Неукротимая ярость',description:'При падении до 0 HP пройти CON save и остаться на 1 HP.'});
    var slots=h.spellSlotsData||{},pact=h.pactMagicData;
    var shieldSlot=slots[1],shieldAvailable=(shieldSlot&&num(shieldSlot.max)>num(shieldSlot.used))||(pact&&num(pact.max)>num(pact.used)&&num(pact.slotLevel)>=1);
    if(ctx.source==='attack'&&ctx.attackTotal!=null&&ctx.targetAc!=null&&ctx.natural20!==true&&shieldAvailable&&num(ctx.attackTotal)<num(ctx.targetAc)+5)out.push({id:'shield',priority:5,label:'Щит',description:'+5 AC до начала следующего хода; атака может промахнуться.'});
    if(ctx.source==='spell'&&ctx.spellLevel>0&&ctx.visible!==false&&num(ctx.distanceFt,0)<=60){
      for(var sl=Math.max(1,num(ctx.spellLevel));sl<=9;sl++){var cs=slots[sl];if((cs&&num(cs.max)>num(cs.used))||(pact&&num(pact.max)>num(pact.used)&&num(pact.slotLevel)>=sl)){out.push({id:'counterspell',priority:1,label:'Контрзаклинание',description:'Попытаться прервать заклинание '+ctx.spellName+'.'});break;}}
    }
    out.sort(function(a,b){return a.priority-b.priority;});
    return out.length?{options:out,window:{type:'REACTION_WINDOW',options:out,damage:num(ctx.amount),damageType:ctx.damageType||'',source:ctx.source||'generic'}}:null;
  }
  function resolveReaction(h,id,ctx){
    ctx=ctx||{};var opts=reactionOptions(h,ctx);if(!opts)return {ok:false,reason:'Нет доступной реакции.'};var found=opts.options.filter(function(x){return x.id===id;})[0];if(!found)return {ok:false,reason:'Эта реакция сейчас недоступна.'};
    var r=h.turnResources||{};if(r.reaction===false)return {ok:false,reason:'Реакция уже использована.'};
    var result={ok:true,id:id,remainingAmount:num(ctx.amount),reduced:0,applied:false};
    if(id==='uncannyDodge'){result.reduced=Math.floor(num(ctx.amount)/2);result.remainingAmount=num(ctx.amount)-result.reduced;result.applied=true;}
    else if(id==='deflectMissiles'){result.reduced=Math.min(num(ctx.amount),num(10*classLevel(h,'Монах'))+abilityMod(h,'dex'));result.remainingAmount=num(ctx.amount)-result.reduced;result.applied=true;if(result.reduced>=num(ctx.amount)&&ctx.returnTarget){result.returnedAttack=true;result.returnTargetId=ctx.returnTarget.id;result.returnAttack={bonus:num(ctx.returnAttackBonus),damage:ctx.returnDamage||'1d6',damageType:ctx.damageType||'дробящий'};}}
    else if(id==='slowFall'){result.reduced=Math.min(num(ctx.amount),5*classLevel(h,'Монах'));result.remainingAmount=num(ctx.amount)-result.reduced;result.applied=true;}
    else if(id==='relentlessRage'){var s=ensureState(h);var uses=s.relentlessRageUses||{used:0};var dc=10+5*num(uses.used);var sv=global.DNDCombat&&global.DNDCombat.savingThrow?global.DNDCombat.savingThrow(h,'con',dc):{success:false};result.dc=dc;result.save=sv;if(sv.success){result.remainingAmount=0;h.hp=1;h.hitPoints=1;uses.used+=1;result.applied=true;result.keptAtOne=true;}else{result.applied=true;}s.relentlessRageUses=uses;}
    else if(id==='shield'){
      var shieldSpent=spendSpellSlotAny(h,1);
      if(!shieldSpent)return {ok:false,reason:'Нет ячейки 1 круга или Pact Magic для Щита.'};
      result.spellSlotLevel=shieldSpent.slotLevel;result.spellSlotKind=shieldSpent.kind;result.attackNegated=(ctx.natural20!==true&&num(ctx.attackTotal)<num(ctx.targetAc)+5);result.remainingAmount=result.attackNegated?0:num(ctx.amount);result.applied=true;result.preEffect=true;result.acBonus=5;
    }
    else if(id==='counterspell'){
      var level=Math.max(1,num(ctx.spellLevel,1)),spent=spendSpellSlotAny(h,level);
      if(!spent)return {ok:false,reason:'Нет подходящей ячейки или Pact Magic для Контрзаклинания.'};
      var spentLevel=spent.slotLevel,check=global.DNDCombat&&global.DNDCombat.rollD20?global.DNDCombat.rollD20('normal'):{result:10};var bonus=abilityMod((h.stats||{}).int||10)+(num(h.proficiencyBonus,2));var dc=8+num(ctx.spellLevel,1);result.spellSlotLevel=spentLevel;result.spellSlotKind=spent.kind;result.counterspellRoll=check.result;result.counterspellDc=dc;result.counterspellTotal=check.result+bonus;result.countered=(spentLevel>=level||result.counterspellTotal>=dc);result.remainingAmount=0;result.applied=true;result.preEffect=true;result.spellCountered=result.countered;
    }
    if(result.applied&&id!=='relentlessRage'&&h.turnResources)h.turnResources.reaction=false;
    if(result.applied&&id==='relentlessRage'&&h.turnResources)h.turnResources.reaction=false;
    return result;
  }
  function stateResource(h,id,max){var s=ensureState(h);s.reactionResources=s.reactionResources||{};s.reactionResources[id]=s.reactionResources[id]||{max:max,current:max,used:0};return s.reactionResources[id];}
  function featureResource(h,id,max,recharge){return ensureRes(h,id,max,recharge);}
  function levelTotal(h){return (h.classes||[]).reduce(function(a,c){return a+num(c.level);},0);}
  function profBonus(h){return global.DNDRules&&global.DNDRules.profBonus?num(global.DNDRules.profBonus(h),2):Math.max(2,Math.floor((levelTotal(h)-1)/4)+2);}
  function useOverchannel(h){var st=ensureState(h);if(!isSubclassFeatureAvailable(h,'Волшебник','overchannel'))return {ok:false,reason:'Перенапряжение магии недоступно.'};st.overchannelActive=true;return {ok:true,prepared:true,message:'🔥 Перенапряжение магии подготовлено для следующего подходящего заклинания.'};}
  var DECLARATIVE_FEATURES = {
    dangerSense:1,fastMovement:1,feralInstinct:1,brutalCritical:1,persistentRage:1,indomitableMight:1,primalChampion:1,
    jackOfAllTrades:1,songOfRest:1,countercharm:1,magicalSecrets:1,superiorInspiration:1,
    fightingStyle:1,extraAttack:1,fighterRemarkableAthlete:1,survivor:1,
    spellMastery:1,signatureSpells:1,arcaneMastery:1,druidic:1,timelessBody:1,beastSpells:1,archdruid:1,
    destroyUndead:1,divineIntervention:1,greaterDivineIntervention:1,evasionMonk:1,diamondSoul:1,perfectSelf:1,
    divineSense:1,auraOfProtection:1,auraOfCourage:1,improvedDivineSmite:1,cleansingTouch:1,holyNexus:1,
    sneakAttack:1,evasion:1,reliableTalent:1,blindsense:1,slipperyMind:1,
    favoredEnemy:1,naturalExplorer:1,rangerFightingStyle:1,landsStrideRanger:1,hideInPlainSight:1,vanish:1,feralSenses:1,foeSlayer:1,
    fontOfMagic:1,sorcerousRestoration:1,sorcerousOriginMastery:1,pactBoon:1,eldritchInvocations:1,mysticArcanum:1,eldritchMaster:1,
    magicalTinkering:1,infuseItem:1,spellStoringItem:1,magicItemAdept:1,soulOfArtifice:1
  };
  function useDeclarativeFeature(h,id,ctx){
    var st=ensureState(h); st.passiveFeatures=st.passiveFeatures||{}; st.passiveFeatures[id]=true;
    if(id==='primalChampion'){ if(!st.primalChampionApplied){ var a=h.stats||{}; ['str','con'].forEach(function(k){if(a[k]!=null)a[k]=num(a[k])+4;}); ['strength','constitution'].forEach(function(k){if(a[k]!=null)a[k]=num(a[k])+4;}); st.primalChampionApplied=true;} }
    if(id==='improvedDivineSmite')st.improvedDivineSmite=true;
    if(id==='superiorInspiration')st.superiorInspiration=true;
    if(id==='countercharm')st.countercharm=true;
    if(id==='survivor')st.survivor=true;
    if(id==='divineIntervention'||id==='greaterDivineIntervention')st.divineInterventionReady=true;
    if(id==='cleansingTouch')st.cleansingTouchReady=true;
    if(id==='fontOfMagic'){ensureRes(h,'sorceryPoints',Math.max(2,2*classLevel(h,'Чародей')),'long');}
    if(id==='sorcerousRestoration')st.sorcerousRestoration=true;
    if(id==='sorcerousOriginMastery')st.sorcerousOriginMastery=true;
    if(id==='pactBoon'||id==='eldritchInvocations'||id==='mysticArcanum'||id==='eldritchMaster')st[id]=true;
    if(id==='magicalTinkering'||id==='infuseItem'||id==='spellStoringItem'||id==='magicItemAdept'||id==='soulOfArtifice')st[id]=true;
    return {ok:true,prepared:true,passive:true,message:'✨ '+(FEATURE_DEFS[id]?FEATURE_DEFS[id].name:id)+' активно и учтено движком.'};
  }
  function useCustomRuntimeFeature(h,id,ctx){
    ctx=ctx||{};
    var name=String(id||'');
    var map=[
      ['accursed','Аккурсд'],['runeKeeper','Рунный хранитель'],['runekeeper','Рунный хранитель'],
      ['savant','Савант'],['shifter','Шифтер'],['vessel','Сосуд'],['necromancer','Некромант'],
      ['martyr','Мученик'],['occultist','Оккультист'],['alchemist','Алхимик'],['warden','Страж'],
      ['beastheart','Бистхарт'],['pugilist','Пугилист'],['psion','Псионик'],['псионик','Псионик'],['warlord','Военачальник'],['illrigger','Иллиригер']
    ];
    var cls=null;
    for(var i=0;i<map.length;i++)if(name.indexOf(map[i][0])===0){cls=map[i][1];break;}
    if(!cls)return null;

    // Prefer the registered DNDContent hook: this is the actual class action
    // implementation and already knows the class-specific resource rules.
    var pack=global.DNDContent&&typeof global.DNDContent.getClass==='function'
      ?global.DNDContent.getClass(cls):null;
    if(pack&&pack.hooks&&typeof pack.hooks.useFeature==='function'){
      var fid=name.replace(/^[^:]+:/,'');
      // Resolve the registered feature metadata before dispatch. The old code
      // passed an undeclared variable ("f"), causing ReferenceError on custom
      // runtime actions in strict mode instead of reaching the class resolver.
      var featureMeta=null;
      var featureLists=[pack.features||[]];
      (pack.subclasses||[]).forEach(function(sc){featureLists.push(sc.features||[]);});
      for(var fi=0;fi<featureLists.length&&!featureMeta;fi++){
        featureMeta=featureLists[fi].filter(function(feat){
          return feat&&(String(feat.id)===String(name)||String(feat.id)===String(fid)||
            String(feat.name)===String(fid)||String(feat.name)===String(ctx.featureName));
        })[0]||null;
      }
      var result=pack.hooks.useFeature(h,fid,ctx,featureMeta);
      if(result)return result;
    }

    // Runtime fallback for classes whose content pack has not loaded yet.
    var runtimes={
      'Аккурсд':'accursedRuntime','Рунный хранитель':'runeKeeperRuntime','Савант':'savantRuntime',
      'Шифтер':'shifterRuntime','Сосуд':'vesselRuntime','Некромант':'necromancerRuntime',
      'Мученик':'martyrRuntime','Оккультист':'occultistRuntime'
    };
    var rt=global[runtimes[cls]];
    if(rt&&typeof rt.useFeature==='function')return rt.useFeature(h,name,ctx);
    return null;
  }

  function useFeatureAction(h,id,ctx){
    ctx=ctx||{}; syncClassResources(h);
    var custom=useCustomRuntimeFeature(h,id,ctx); if(custom)return custom;
    var l;
    switch(id){
      case 'rage': return useRage(h);
      case 'reckless': return toggleReckless(h);
      case 'secondWind': return useSecondWind(h);
      case 'actionSurge': return useActionSurge(h);
      case 'indomitable': return useIndomitable(h,ctx);
      case 'cunningAction': return useCunningAction(h,ctx.kind||'dash');
      case 'flurry': case 'patientDefense': case 'stepWind': return useMonk(h,id);
      case 'bardicInspiration': return giveBardic(h,ctx.target);
      case 'consumeBardic': return useBardicDie(h);
      case 'metamagic': return applyMetamagic(h,ctx.meta,ctx.spell);
      case 'layOnHands': return useLayOnHands(h,ctx.amount,ctx.target);
      case 'channelDivinity': return useChannel(h,id,ctx);case 'turnUndead': return useChannel(h,id,ctx);
      case 'wildShape': return useWildShape(h);
      case 'huntersMark': return useHuntersMark(h);
      case 'flashOfGenius': return useFlashOfGenius(h);
      case 'arcaneRecovery': return useArcaneRecovery(h,ctx);
      case 'overchannel': return useOverchannel(h);
      case 'divineSmite': return useDivineSmite(h,ctx.spellLevel);
      case 'relentlessRage': return useRelentlessRage(h,ctx);
      case 'deflectMissiles': return useDeflectMissiles(h,ctx.damage,ctx);
      case 'stunningStrike': if(!spend(h,'ki',1))return {ok:false,reason:'Недостаточно Ки.'}; ensureState(h).pendingOnHit=ensureState(h).pendingOnHit||{}; ensureState(h).pendingOnHit.stunningStrike={dc:8+profBonus(h)+abilityMod(h,'wis'),save:'con'}; return {ok:true,prepared:true,message:'🥋 Ошеломляющий удар подготовлен: после попадания цель делает спасбросок Телосложения.'};
      case 'unarmoredMovement': l=classLevel(h,'Монах'); return {ok:true,message:'💨 Скорость монаха: '+(30+5*Math.floor(l/3))+' фт.'};
      case 'stillnessOfMind': ensureState(h).conditionsRemoved=['очарован','испуган']; return {ok:true,message:'🧘 Безмятежность духа: очарование/испуг сняты.'};
      case 'slowFall': return {ok:true,reduced:5*classLevel(h,'Монах'),message:'🍃 Медленное падение: урон уменьшен на '+(5*classLevel(h,'Монах'))+'.'};
      case 'uncannyDodge': return {ok:true,reduced:Math.floor(num(ctx.damage)/2),message:'🛡️ Невероятное уклонение: урон уменьшен вдвое.'};
      case 'strokeOfLuck': return {ok:true,forceTwenty:true,message:'🍀 Удача плута: результат d20 становится 20.'};
      case 'relentless': featureResource(h,'superiorityDice',classLevel(h,'Воин')>=15?6:4,'short'); return spend(h,'superiorityDice',1)?{ok:true,message:'⚔️ Неустанный: кость превосходства потрачена.'}:{ok:false,reason:'Нет кости превосходства.'};
      case 'guidedStrike': return useGuidedStrike(h);
      case 'preserveLife': return usePreserveLife(h,ctx.targets||[ctx.target]);
      case 'warPriest': return useWarPriest(h);
      case 'vowOfEnmity': return useVowOfEnmity(h,ctx.target);
      case 'sacredWeapon': return useSacredWeapon(h);
      case 'shadowStep': return useShadowStep(h,ctx);
      case 'wholenessOfBody': return useWholenessOfBody(h);
      case 'quiveringPalm': return useQuiveringPalm(h,ctx.target);
      case 'feyPresence': return useSaveFeature(h,id,ctx);
      case 'mistyEscape': return useMistyEscape(h);
      case 'beguilingDefenses': return useBeguilingDefenses(h,ctx);
      case 'darkOnesBlessing': return useDarkOnesBlessing(h,ctx);
      case 'darkOnesOwnLuck': return useDarkOnesOwnLuck(h);
      case 'fiendishResilience': return useFiendishResilience(h,ctx.damageType);
      case 'hurlThroughHell': return useHurlThroughHell(h,ctx.target);
      case 'bendLuck': return useBendLuck(h,ctx);
      case 'eldritchCannon': return useEldritchCannon(h,ctx.mode);
      case 'explosiveCannon': return useExplosiveCannon(h,ctx.target);
      case 'restorativeReagents': return useRestorativeReagents(h,ctx.target);
      case 'combatWildShape': return useCombatWildShape(h,ctx);
      case 'elementalWildShape': return useElementalWildShape(h,ctx);
      case 'combatInspiration': return useBardCombatInspiration(h,ctx.target);
      case 'cuttingWords': return useCuttingWords(h,ctx);
      case 'battleMagic': return useBattleMagic(h);
      case 'frenzy': return useFrenzy(h);
      case 'retaliation': return useRetaliation(h,ctx);
      case 'totemSpirit': return useTotemSpirit(h,ctx.totem);
      case 'openHandTechnique': return useOpenHandTechnique(h,ctx.target,ctx.effect);
      case 'devotionAura': return {ok:true,message:'✨ Аура преданности активна.'};
      case 'purityOfSpirit': return {ok:true,message:'✨ Чистота духа: защита от болезней.'};
      case 'holyNimbus': return useHolyNimbus(h);
      case 'relentlessAvenger': return useRelentlessAvenger(h,ctx);
      case 'soulOfVengeance': return useSoulOfVengeance(h,ctx.target);
      case 'avengingAngel': return useAvengingAngel(h);
      case 'huntersPrey': return useHuntersPrey(h,ctx.target,ctx.mode);
      case 'defensiveTactics': return useDefensiveTactics(h,ctx.mode);
      case 'beastCompanion': return useBeastCompanion(h);
      case 'bestialFury': return useBestialFury(h);
      case 'dragonWings': ensureState(h).dragonWings=true; return {ok:true,message:'🐉 Драконьи крылья: полёт активирован.'};
      case 'draconicPresence': return useSaveFeature(h,id,ctx);
      case 'elementalAffinity': return {ok:true,message:'🐉 Стихийное родство: добавьте CHA к одному броску урона соответствующего элемента.'};
      case 'wildMagicSurge': return {ok:true,roll:roll(100),message:'🌀 Бросок по таблице дикой магии: '+roll(100)};
      case 'controlledChaos': return {ok:true,message:'🌀 Контролируемый хаос: используйте ближайший подходящий результат всплеска.'};
      case 'spellBombardment': return {ok:true,message:'💥 Бомбардировка: одна кость урона заклинания может быть переброшена.'};
      case 'alchemicalSavvy': return {ok:true,message:'⚗️ Алхимический мастер: дополнительный модификатор INT к подходящему урону/лечению.'};
      case 'arcaneWard': ensureState(h).arcaneWard=Math.max(num(ensureState(h).arcaneWard),2*classLevel(h,'Волшебник')+abilityMod(h,'int')); return {ok:true,message:'🛡️ Магический оберег: '+ensureState(h).arcaneWard+' HP.'};
      case 'overchannel': return {ok:true,message:'🔥 Перенапряжение магии: максимальный урон заклинания; после этого получаете некротический урон.'};
      case 'naturalRecovery': return useArcaneRecovery(h);
      case 'combatInspiration': return useBardCombatInspiration(h,ctx.target);
      case 'feyPresence': return useSaveFeature(h,id,ctx);
      default: if(DECLARATIVE_FEATURES[id]) return useDeclarativeFeature(h,id,ctx); return null;
    }
  }
  function useGuidedStrike(h){if(!spend(h,'channelDivinity',1))return {ok:false,reason:'Божественный канал недоступен.'};ensureState(h).nextAttackBonus=num(ensureState(h).nextAttackBonus)+10;return {ok:true,message:'⚔️ Направленный удар: +10 к следующему броску атаки.'};}
  function usePreserveLife(h,targets){if(!spend(h,'channelDivinity',1))return {ok:false,reason:'Божественный канал недоступен.'};targets=(targets||[]).filter(Boolean);var pool=Math.floor(classLevel(h,'Жрец')*5), each=Math.floor(pool/Math.max(1,targets.length));var healed=0;targets.forEach(function(t){var v=Math.min(each,num(t.maxHitPoints,t.maxHp||999)-num(t.hitPoints,t.hp||0));if(v>0){t.hitPoints=num(t.hitPoints,t.hp||0)+v;healed+=v;}});return {ok:true,amount:healed,message:'☀️ Сохранение жизни: восстановлено '+healed+' HP.'};}
  function useWarPriest(h){ensureRes(h,'warPriest',Math.max(1,abilityMod(h,'wis')), 'long');return spend(h,'warPriest',1)?{ok:true,message:'⚔️ Воинствующий жрец: дополнительная атака бонусным действием.'}:{ok:false,reason:'Воинствующий жрец исчерпан.'};}
  function useVowOfEnmity(h,target){if(!spend(h,'channelDivinity',1))return {ok:false,reason:'Божественный канал недоступен.'};ensureState(h).vowTargetId=target&&target.id||null;return {ok:true,message:'🔥 Обет вражды: преимущество против выбранной цели.'};}
  function useSacredWeapon(h){if(!spend(h,'channelDivinity',1))return {ok:false,reason:'Божественный канал недоступен.'};ensureState(h).sacredWeaponActive=true;return {ok:true,message:'✨ Священное оружие: +CHA к атакам оружием на 1 минуту.'};}
  function useShadowStep(h,ctx){ensureState(h).shadowStepReady=true;return {ok:true,message:'🌑 Шаг тени: телепорт до 60 футов и преимущество на следующую рукопашную атаку.'};}
  function useWholenessOfBody(h){ensureRes(h,'wholenessOfBody',1,'long');if(!spend(h,'wholenessOfBody',1))return {ok:false,reason:'Прикосновение покоя уже использовано.'};var v=Math.max(1,3*classLevel(h,'Монах'));var got=heal(h,v);return {ok:true,amount:got,message:'🧘 Прикосновение покоя: +'+got+' HP.'};}
  function useQuiveringPalm(h,target){if(!target)return {ok:false,reason:'Выберите цель.'};ensureState(h).quiveringPalmTarget=target.id;return {ok:true,message:'🫨 Дрожащая ладонь: цель помечена; при завершении вы можете вызвать смертельную вибрацию.'};}
  function useSaveFeature(h,id,ctx){return {ok:true,message:'✨ '+(FEATURE_DEFS[id]?FEATURE_DEFS[id].name:id)+' активировано; выбранная цель должна пройти спасбросок.'};}
  function useMistyEscape(h){ensureState(h).reactionUsed=true;if(h.turnResources)h.turnResources.reaction=0;return {ok:true,message:'🌫️ Туманный побег: реакция, невидимость и телепорт на 60 футов.'};}
  function useBeguilingDefenses(h,ctx){ensureState(h).immuneCharm=true;return {ok:true,message:'🧚 Обольстительная защита: иммунитет к очарованию; при попытке очарования можно перенаправить эффект.'};}
  function useDarkOnesBlessing(h,ctx){var v=classLevel(h,'Колдун')+abilityMod(h,'cha');h.tempHp=Math.max(num(h.tempHp),Math.max(1,v));return {ok:true,amount:v,message:'🔥 Благословение тёмного: временные HP '+v+'.'};}
  function useDarkOnesOwnLuck(h){ensureRes(h,'darkOnesLuck',1,'short');if(!spend(h,'darkOnesLuck',1))return {ok:false,reason:'Удача тёмного уже потрачена.'};return {ok:true,amount:4,message:'🔥 Удача тёмного: +1d10 к проверке/спасброску/атаке.'};}
  function useFiendishResilience(h,type){ensureState(h).fiendishResistance=type||'physical';return {ok:true,message:'🔥 Стойкость исчадия: сопротивление '+(type||'выбранному')+' урону.'};}
  function useHurlThroughHell(h,target){ensureRes(h,'hurlThroughHell',1,'long');if(!spend(h,'hurlThroughHell',1))return {ok:false,reason:'Швырок сквозь ад уже использован.'};return {ok:true,extraDice:'10d10',message:'🔥 Швырок сквозь ад: цель исчезает на раунд и получает 10d10 психического урона.'};}
  function useBendLuck(h,ctx){ensureRes(h,'bendLuck',Math.max(1,abilityMod(h,'cha')),'long');if(!spend(h,'bendLuck',1))return {ok:false,reason:'Недостаточно использования Искривления удачи.'};return {ok:true,amount:roll(4)+roll(4)-2,message:'🌀 Искривление удачи: '+(roll(4)+roll(4)-2)+' к d20.'};}
  function useEldritchCannon(h,mode){ensureState(h).eldritchCannon={mode:mode||'flamethrower',active:true};return {ok:true,message:'💥 Эльдрическая пушка создана: '+(mode||'flamethrower')+'.'};}
  function useExplosiveCannon(h,target){return {ok:true,damage:'3d8',message:'💥 Взрыв пушки: 3d8 огнём, спасбросок Ловкости для половины.'};}
  function useRestorativeReagents(h,target){var v=abilityMod(h,'int')+classLevel(h,'Изобретатель');if(target){target.tempHp=Math.max(num(target.tempHp),Math.max(1,v));return {ok:true,amount:v,message:'⚗️ Реагенты: '+v+' временных HP.'};}return {ok:true,message:'⚗️ Восстанавливающие реагенты готовы.'};}
  function useCombatWildShape(h,ctx){if(!activeRage(h)&&!spend(h,'wildShape',1))return {ok:false,reason:'Нет использования Дикого облика.'};return {ok:true,message:'🐻 Боевой дикий облик: форма принята бонусным действием; можно потратить слот на лечение.'};}
  function useElementalWildShape(h,ctx){if(!spend(h,'wildShape',2))return {ok:false,reason:'Нужно 2 использования Дикого облика.'};return {ok:true,message:'🌪️ Стихийный дикий облик активирован.'};}
  function useBardCombatInspiration(h,target){return giveBardic(h,target);}
  function useCuttingWords(h,ctx){if(!ctx||!ctx.targetRoll)return {ok:true,message:'🎼 Едкое слово: выберите бросок противника и уменьшите его на кость вдохновения.'};var d=useBardicDie(h);return d.ok?{ok:true,amount:-d.amount,message:'🎼 Едкое слово: -'+d.amount+'.'}:d;}
  function useBattleMagic(h){return {ok:true,message:'🎼 Боевая магия: после заклинания доступна атака бонусным действием.'};}
  function useFrenzy(h){if(!activeRage(h))return {ok:false,reason:'Сначала активируйте Ярость.'};ensureState(h).frenzy=true;return {ok:true,message:'🪓 Безумие: дополнительная рукопашная атака бонусным действием; после ярости — истощение.'};}
  function useRetaliation(h,ctx){if(!ctx||!ctx.target)return {ok:false,reason:'Нужна цель, которая попала по варвару.'};if(!h.turnResources||h.turnResources.reaction===false)return {ok:false,reason:'Реакция уже использована.'};ensureState(h).reactionAttackTargetId=ctx.target.id;return {ok:true,preparedReactionAttack:true,message:'🩸 Возмездие: реакционная атака подготовлена.'};}
  function useTotemSpirit(h,totem){ensureState(h).totem=totem||'bear';return {ok:true,message:'🐻 Дух тотема: '+(totem||'медведь')+' выбран для текущей ярости.'};}
  function useOpenHandTechnique(h,target,effect){if(!target)return {ok:false,reason:'Нужна цель безоружной атаки.'};var e=String(effect||'prone');if(['prone','push','noReaction'].indexOf(e)<0)e='prone';ensureState(h).pendingOnHit=ensureState(h).pendingOnHit||{};ensureState(h).pendingOnHit.openHand={effect:e};return {ok:true,prepared:true,message:'✋ Техника открытой длани подготовлена: '+e+'.'};}
  function useHolyNimbus(h){ensureRes(h,'holyNimbus',1,'long');if(!spend(h,'holyNimbus',1))return {ok:false,reason:'Священный нимб уже использован.'};ensureState(h).holyNimbus=true;return {ok:true,message:'☀️ Священный нимб активирован на 1 минуту.'};}
  function useRelentlessAvenger(h,ctx){return {ok:true,message:'⚔️ Неумолимый мститель: после реакции можно переместиться до половины скорости без провоцирования атак.'};}
  function useSoulOfVengeance(h,target){return {ok:true,message:'🔥 Душа возмездия: реакционная атака по цели Обета вражды.'};}
  function useAvengingAngel(h){ensureState(h).avengingAngel=true;return {ok:true,message:'👼 Мстящий ангел: полёт и аура ужаса активированы.'};}
  function useHuntersPrey(h,target,mode){ensureState(h).huntersPrey=mode||'colossus';return {ok:true,message:'🏹 Добыча охотника: '+(mode||'Колоссальный убийца')+'.'};}
  function useDefensiveTactics(h,mode){ensureState(h).defensiveTactics=mode||'escape';return {ok:true,message:'🛡️ Оборонительная тактика: '+(mode||'уклонение')+'.'};}
  function useBeastCompanion(h){ensureState(h).beastCompanion={name:'Зверь следопыта',active:true};return {ok:true,message:'🐺 Спутник зверь готов к ходу.'};}
  function useBestialFury(h){ensureState(h).bestialFury=true;return {ok:true,message:'🐺 Звериная ярость: компаньон получает две атаки при действии Атака.'};}
  function useSubclassFeature(h,id,ctx){ctx=ctx||{};var handlers={
    superiorityDice:function(){ensureRes(h,'superiorityDice',classLevel(h,'Воин')>=15?6:4,'short');return spend(h,'superiorityDice',1)?{ok:true,message:'⚔️ Кость превосходства потрачена.'}:{ok:false,reason:'Нет костей превосходства.'};},
    guidedStrike:function(){return {ok:true,amount:10,message:'⚔️ Направленный удар: +10 к броску атаки.'};},
    preserveLife:function(){return useChannel(h,'Сохранение жизни');},
    warPriest:function(){ensureRes(h,'warPriest',Math.max(1,abilityMod(h,'wis')),'long');return spend(h,'warPriest',1)?{ok:true,extraAttack:true,message:'⚔️ Воинствующий жрец: дополнительная атака бонусным действием.'}:{ok:false,reason:'Воинствующий жрец исчерпан.'};},
    vowOfEnmity:function(){return useVowOfEnmity(h,ctx.target);},
    sacredWeapon:function(){return useChannel(h,'Священное оружие');},
    fastHands:function(){ensureState(h).fastHands=true;return {ok:true,message:'👜 Быстрые руки активны: предмет/ловкость рук доступны бонусным действием.'};},
    shadowStep:function(){return {ok:true,message:'🌑 Шаг тени: телепорт на 60 футов из тени в тень, преимущество на следующую рукопашную атаку.'};},
    frenzy:function(){return {ok:true,message:'🪓 Безумие: бонусная рукопашная атака, но после ярости появляется истощение.'};},
    totemSpirit:function(){return {ok:true,message:'🐻 Дух тотема: выберите эффект тотема для текущей ярости.'};},
    beastCompanion:function(){return {ok:true,message:'🐺 Спутник зверь: призванный компаньон добавлен к боевому полю.'};},
    huntersPrey:function(){return {ok:true,message:'🏹 Добыча охотника: примените выбранный вариант охотника к цели.'};},
    combatInspiration:function(){return {ok:true,message:'🎼 Боевое вдохновение: кость можно потратить на AC или урон.'};},
    battleMagic:function(){return {ok:true,message:'🎼 Боевая магия: после заклинания можно атаковать бонусным действием.'};},
    draconicResilience:function(){return {ok:true,message:'🐉 Драконья стойкость: базовый AC 13 + DEX без доспехов и +1 HP за уровень.'};},
    wildMagicSurge:function(){return {ok:true,message:'🌀 Всплеск дикой магии: бросьте на таблице дикой магии после подходящего заклинания.'};},
    darkOnesBlessing:function(){return {ok:true,message:'🔥 Благословение тёмного: временные HP после убийства враждебного существа.'};},
    feyPresence:function(){return {ok:true,message:'🧚 Присутствие фей: существа рядом делают спасбросок или очарованы/испуганы.'};},
    eldritchCannon:function(){return {ok:true,message:'💥 Эльдрическая пушка: создайте пушку с выбранным режимом.'};},
    alchemicalSavvy:function(){return {ok:true,message:'⚗️ Алхимическая специализация активна.'};}
  };if(handlers[id])return handlers[id](ctx);if(!FEATURE_DEFS[id])return {ok:false,unsupported:true,reason:'Неизвестная способность: '+id};var sf=ensureState(h);sf.passiveFeatures=sf.passiveFeatures||{};sf.passiveFeatures[id]=true;return {ok:true,prepared:true,passive:true,message:'✨ '+FEATURE_DEFS[id].name+' активна/подготовлена; её пассивный эффект учитывается контекстными hooks.'};}

  function attackModifiers(h,ctx){
    var out={bonusDamage:0,extraDice:[],typedExtraDice:[],damageTypes:[],advantage:false,disadvantage:false,forceCritical:false,criticalRange:20,maximizeDamageDice:false,extraAttacks:1,notes:[],pendingOnHit:{}};ctx=ctx||{};syncClassResources(h);    if(ensureState(h).improvedDivineSmite&&hasClass(h,'Паладин')&&ctx.weaponAttack){out.extraDice.push('1d8');out.notes.push('Улучшенная божественная кара');}
    if(global.DNDFeats&&global.DNDFeats.attackModifiers){var ff=global.DNDFeats.attackModifiers(h,ctx)||{};out.bonusAttack=num(out.bonusAttack)+num(ff.bonusAttack);out.bonusDamage+=num(ff.bonusDamage);(ff.extraDice||[]).forEach(function(d){out.extraDice.push(d);});if(ff.advantage)out.advantage=true;if(ff.disadvantage)out.disadvantage=true;(ff.notes||[]).forEach(function(v){out.notes.push(v);});if(ff.rerollDamage)out.rerollDamage=true;if(ff.ignoreResistance)out.ignoreResistance=true;}
    if(ensureState(h).nextAttackBonus){out.bonusAttack=num(ensureState(h).nextAttackBonus);ensureState(h).nextAttackBonus=0;out.notes.push('Бонус следующей атаки');}
    if(hasClass(h,'Варвар')&&activeRage(h)&&ctx.usesStrength&&ctx.meleeOrThrown){out.bonusDamage+=num(h.rageDamageBonus);out.notes.push('Ярость');}
    if(hasClass(h,'Варвар')&&ensureState(h).recklessThisTurn&&ctx.usesStrength){out.advantage=true;out.notes.push('Безрассудная атака');}
    if(hasClass(h,'Плут')&&ctx.sneakEligible&&!ensureState(h).sneakUsedThisTurn&&ctx.finesseOrRanged&&(ctx.advantage||ctx.allyWithin5ft||out.advantage)&&!ctx.disadvantage){out.extraDice.push((h.sneakAttackDice||sneakDice(classLevel(h,'Плут')))+'d6');out.notes.push('Скрытая атака');}
    if(isAssassin(h)){var t=ctx.target||{};var surprised=!!(ctx.targetSurprised||t.surprised);var unacted=ctx.targetHasNotTakenTurn!==undefined?!!ctx.targetHasNotTakenTurn:!!(t.hasTakenTurn===false||t.turnStarted===false);if(unacted&&!ctx.disadvantage){out.advantage=true;out.notes.push('Убийство из засады');}if(surprised){out.forceCritical=true;out.notes.push('Критическое попадание: Убийца');if(classLevel(h,'Плут')>=17){out.assassinDeathStrikeEligible=true;out.assassinSurprised=true;}}}
    if(hasClass(h,'Плут')&&ctx.sneakEligible&&!ensureState(h).sneakUsedThisTurn&&ctx.finesseOrRanged&&(out.advantage||ctx.allyWithin5ft)&&!ctx.disadvantage&&!out.extraDice.some(function(x){return /d6$/.test(x)})){out.extraDice.push((h.sneakAttackDice||sneakDice(classLevel(h,'Плут')))+'d6');out.notes.push('Скрытая атака');}
    if(hasClass(h,'Следопыт')&&ensureState(h).huntersMarkActive&&ctx.targetMarked){out.extraDice.push('1d6');out.notes.push('Метка охотника');}
    if(hasClass(h,'Паладин')&&classLevel(h,'Паладин')>=11&&ctx.weaponAttack){out.extraDice.push('1d8');out.notes.push('Улучшенная божественная кара');}
    var pending=ensureState(h).pendingOnHit||{};if(pending.divineSmite&&ctx.weaponAttack){out.pendingOnHit.divineSmite=JSON.parse(JSON.stringify(pending.divineSmite));out.notes.push('Божественная кара подготовлена');}if(pending.stunningStrike&&ctx.meleeOrThrown){out.pendingOnHit.stunningStrike=JSON.parse(JSON.stringify(pending.stunningStrike));out.notes.push('Ошеломляющий удар подготовлен');}
    if(hasClass(h,'Варвар')&&classLevel(h,'Варвар')>=9&&ctx.critical){out.extraDice.push('1d12');out.notes.push('Жестокий критический удар варвара');}
    if(hasClass(h,'Следопыт')&&classLevel(h,'Следопыт')>=20&&ctx.target&&!ensureState(h).foeSlayerUsedThisTurn){var fs=String(ctx.foeSlayerMode||'attack').toLowerCase();if(fs==='damage'){out.bonusDamage+=abilityMod(h,'wis');}else{out.bonusAttack=num(out.bonusAttack)+abilityMod(h,'wis');}out.notes.push('Убийца врагов');out.foeSlayerApplied=true;}
    if(hasClass(h,'Паладин')&&classLevel(h,'Паладин')>=6&&ctx.allyWithinAura)out.notes.push('Аура защиты');
    if(hasClass(h,'Бард')&&classLevel(h,'Бард')>=2&&ctx.checkStat&&!ctx.proficient)out.notes.push('Разносторонний талант');
    if(hasClass(h,'Воин')&&classLevel(h,'Воин')>=5)out.extraAttacks=Math.max(2,Math.min(4,1+Math.floor((classLevel(h,'Воин')-1)/5)));
    if(hasClass(h,'Паладин')&&classLevel(h,'Паладин')>=5)out.extraAttacks=Math.max(out.extraAttacks||1,2);
    if(hasClass(h,'Следопыт')&&classLevel(h,'Следопыт')>=5)out.extraAttacks=Math.max(out.extraAttacks||1,2);
    if(hasClass(h,'Монах')&&classLevel(h,'Монах')>=5)out.extraAttacks=Math.max(out.extraAttacks||1,2);
    if(hasClass(h,'Бард')&&classLevel(h,'Бард')>=6&&isSubclassFeatureAvailable(h,'Бард','valorExtraAttack'))out.extraAttacks=Math.max(out.extraAttacks||1,2);
    if(hasClass(h,'Варвар')&&classLevel(h,'Варвар')>=5)out.extraAttacks=Math.max(out.extraAttacks||1,2);
    if(isSubclassFeatureAvailable(h,'Жрец','divineStrikeLife')&&ctx.weaponAttack){out.extraDice.push('1d8');out.notes.push('Божественный удар');}
    if(isSubclassFeatureAvailable(h,'Жрец','divineStrikeWar')&&ctx.weaponAttack){out.extraDice.push('1d8');out.notes.push('Божественный удар');}
    if(isSubclassFeatureAvailable(h,'Паладин','sacredWeapon')&&ensureState(h).sacredWeaponActive){out.bonusDamage+=abilityMod(h,'cha');out.notes.push('Священное оружие');}
    if(ensureState(h).vowTargetId&&ctx.target&&String(ctx.target.id)===String(ensureState(h).vowTargetId)){out.advantage=true;out.notes.push('Обет вражды');}
    if(global.DNDContent&&global.DNDContent.listClasses)global.DNDContent.listClasses().forEach(function(x){if(classLevel(h,x.name)>0){var p=global.DNDContent.getClass(x.name);if(p&&p.hooks&&typeof p.hooks.attackModifiers==='function'){var e=p.hooks.attackModifiers(h,ctx)||{};out.bonusDamage+=num(e.bonusDamage);(e.extraDice||[]).forEach(function(d){out.extraDice.push(d);});(e.damageTypes||[]).forEach(function(t){if(out.damageTypes.indexOf(t)<0)out.damageTypes.push(t);});(e.typedExtraDice||[]).forEach(function(d){out.typedExtraDice.push(d);});if(e.advantage)out.advantage=true;if(e.disadvantage)out.disadvantage=true;if(e.forceCritical)out.forceCritical=true;if(e.criticalRange)out.criticalRange=Math.min(Number(out.criticalRange)||20,Number(e.criticalRange)||20);if(e.maximizeDamageDice)out.maximizeDamageDice=true;if(e.extraAttacks)out.extraAttacks=Math.max(Number(out.extraAttacks)||1,Number(e.extraAttacks)||1);if(e.bonusAttack)out.bonusAttack=num(out.bonusAttack)+num(e.bonusAttack);if(e.rerollDamageOne)out.rerollDamageOne=true;if(e.unarmedDie)out.unarmedDie=e.unarmedDie;if(e.usesFisticuffsDie)out.usesFisticuffsDie=true;if(e.pendingOnHit)Object.keys(e.pendingOnHit).forEach(function(k){out.pendingOnHit[k]=e.pendingOnHit[k];});if(e.ignoreCover)out.ignoreCover=true;if(e.noDamage)out.noDamage=true;if(e.ignoreResistance)out.ignoreResistance=true;if(e.immunityBecomesResistance)out.immunityBecomesResistance=true;if(e.doubleDamageAgainstObjects)out.doubleDamageAgainstObjects=true;(e.notes||[]).forEach(function(v){out.notes.push(v);});}}});
    return out;
  }
  function checkModifiers(h,ctx){var out={bonus:0,minimum:0,notes:[]};ctx=ctx||{};if(ensureState(h).passiveFeatures&&ensureState(h).passiveFeatures.indomitableMight&&ctx.stat==='str')out.minimum=Math.max(out.minimum,n(h.stats&&h.stats.strength,h.stats&&h.stats.str||10));if(ensureState(h).passiveFeatures&&ensureState(h).passiveFeatures.reliableTalent&&ctx.skillProficient)out.minimum=Math.max(out.minimum,10);if(global.DNDFeats&&global.DNDFeats.checkModifiers){var ff=global.DNDFeats.checkModifiers(h,ctx)||{};out.bonus+=num(ff.bonus);out.minimum=Math.max(out.minimum||0,num(ff.minimum));(ff.notes||[]).forEach(function(v){out.notes.push(v);});}if(hasClass(h,'Плут')&&classLevel(h,'Плут')>=11&&ctx.skillProficient){out.minimum=10;out.notes.push('Надёжный талант');}if(hasClass(h,'Бард')&&classLevel(h,'Бард')>=2&&!ctx.proficient)out.bonus+=Math.floor(profBonus(h)/2);if(hasClass(h,'Воин')&&classLevel(h,'Воин')>=7&&['str','dex','con'].indexOf(ctx.stat)>=0&&!ctx.proficient)out.bonus+=Math.floor(profBonus(h)/2);if(global.DNDContent&&global.DNDContent.listClasses)global.DNDContent.listClasses().forEach(function(x){if(classLevel(h,x.name)>0){var p=global.DNDContent.getClass(x.name);if(p&&p.hooks&&typeof p.hooks.checkModifiers==='function'){var e=p.hooks.checkModifiers(h,ctx)||{};out.bonus+=num(e.bonus);out.minimum=Math.max(out.minimum||0,num(e.minimum));if(e.abilityOverride)out.abilityOverride=e.abilityOverride;(e.notes||[]).forEach(function(v){out.notes.push(v);});}}});return out;}
  function saveModifiers(h,ctx){var out={bonus:0,advantage:false,disadvantage:false,evasion:false,immuneFrightened:false,notes:[]};ctx=ctx||{};if(ensureState(h).passiveFeatures&&ensureState(h).passiveFeatures.diamondSoul)out.advantage=true;if(ensureState(h).passiveFeatures&&ensureState(h).passiveFeatures.evasionMonk)out.evasion=true;if(ensureState(h).passiveFeatures&&ensureState(h).passiveFeatures.slipperyMind&&ctx.saveType==='wis')out.advantage=true;if(ensureState(h).passiveFeatures&&ensureState(h).passiveFeatures.auraOfProtection&&ctx.allyWithinAura)out.bonus+=abilityMod(h,'cha');if(ensureState(h).passiveFeatures&&ensureState(h).passiveFeatures.auraOfCourage&&(ctx.frightenedEffect||ctx.saveType==='frightened'))out.immuneFrightened=true;
    var auraSource=ctx.auraSource||null;
    var auraActive=false;
    if(ctx.allyWithinAura){
      if(auraSource&&hasClass(auraSource,'Паладин')&&classLevel(auraSource,'Паладин')>=6)auraActive=true;
      if(hasClass(h,'Паладин')&&classLevel(h,'Паладин')>=6&&(!auraSource||auraSource===h))auraActive=true;
    }
    if(auraActive){
      var auraCha=abilityMod(auraSource&&auraSource!==h?auraSource:h,'cha');
      out.bonus+=auraCha;
      out.notes.push('Аура защиты');
    }
    if((ctx.frightenedEffect||ctx.saveType==='frightened')&&((hasClass(h,'Паладин')&&classLevel(h,'Паладин')>=10)||(ctx.allyWithinCourage&&ctx.courageSource&&hasClass(ctx.courageSource,'Паладин')&&classLevel(ctx.courageSource,'Паладин')>=10))){out.immuneFrightened=true;out.notes.push('Аура мужества');}
    if(hasClass(h,'Плут')&&classLevel(h,'Плут')>=7){out.evasion=true;out.notes.push('Уворот');}
    if(hasClass(h,'Монах')&&classLevel(h,'Монах')>=7){out.evasion=true;out.notes.push('Уворот');}
    if(hasClass(h,'Монах')&&classLevel(h,'Монах')>=14){out.advantage=true;out.notes.push('Алмазная душа');}if(hasClass(h,'Варвар')&&classLevel(h,'Варвар')>=2&&ctx.dexSaveVisible){out.advantage=true;out.notes.push('Чувство опасности');}if(isSubclassFeatureAvailable(h,'Волшебник','spellResistance')&&ctx.fromSpell){out.advantage=true;out.notes.push('Магическое сопротивление');}if(hasClass(h,'Изобретатель')&&ctx.flashOfGeniusAvailable){out.bonus+=abilityMod(h,'int');out.notes.push('Вспышка гениальности');}
    if(ensureState(h).bendLuckBonus){out.bonus+=num(ensureState(h).bendLuckBonus);ensureState(h).bendLuckBonus=0;out.notes.push('Искривление удачи');}
    var race=h&&h.raceMechanics||{};
    if(race.magicResistance&&ctx.fromSpell){out.advantage=true;out.notes.push('Расовое сопротивление магии');}
    if(race.feyAncestry&&ctx.charmEffect){out.advantage=true;out.notes.push('Наследие фей');}
    if(race.brave&&ctx.saveType==='frightened'){out.advantage=true;out.notes.push('Расовая храбрость');}
    if(ensureState(h).immuneCharm&&ctx.saveType==='wis'&&ctx.charmEffect)out.advantage=true;
    if(ensureState(h).holyNimbus&&ctx.fromFiendOrUndead)out.bonus+=abilityMod(h,'cha');
    if(global.DNDContent&&global.DNDContent.listClasses)global.DNDContent.listClasses().forEach(function(x){if(classLevel(h,x.name)>0){var p=global.DNDContent.getClass(x.name);if(p&&p.hooks&&typeof p.hooks.saveModifiers==='function'){var e=p.hooks.saveModifiers(h,ctx)||{};out.bonus+=num(e.bonus);if(e.advantage)out.advantage=true;if(e.disadvantage)out.disadvantage=true;(e.notes||[]).forEach(function(v){out.notes.push(v);});}}});if(global.DNDFeats&&global.DNDFeats.saveModifiers){var ff=global.DNDFeats.saveModifiers(h,ctx)||{};out.bonus+=num(ff.bonus);if(ff.advantage)out.advantage=true;if(ff.disadvantage)out.disadvantage=true;(ff.notes||[]).forEach(function(v){out.notes.push(v);});}return out;}

  function useFeature(h,id,ctx){ctx=ctx||{};var known=!!FEATURE_DEFS[id]||(global.DNDFeats&&global.DNDFeats.has&&global.DNDFeats.has(h,id))||(global.DNDContent&&global.DNDContent.getFeature&&!!global.DNDContent.getFeature(id));if(!known)return {ok:false,unsupported:true,reason:'Неизвестная способность: '+id};if(!featureAvailableForCurrentBuild(h,id))return {ok:false,reason:'Эта способность недоступна текущему уровню/классу/подклассу.'};var routed=useFeatureAction(h,id,ctx);if(routed)return routed;if(global.DNDFeats&&global.DNDFeats.has&&global.DNDFeats.has(h,id))return global.DNDFeats.useFeature(h,id,ctx);var ext=externalUse(h,id,ctx);if(ext)return ext;switch(id){
    case'rage':return useRage(h);case'reckless':return toggleReckless(h);case'secondWind':return useSecondWind(h);case'actionSurge':return useActionSurge(h);case'indomitable':return useIndomitable(h);case'cunningAction':return useCunningAction(h,ctx.kind);case'flurry':case'patientDefense':case'stepWind':return useMonk(h,id);case'bardicInspiration':return giveBardic(h,ctx.target);case'consumeBardic':return useBardicDie(h);case'metamagic':return applyMetamagic(h,ctx.meta,ctx.spell);case'layOnHands':return useLayOnHands(h,ctx.amount,ctx.target);case'channelDivinity':return useChannel(h,id,ctx);case'turnUndead':return useChannel(h,id,ctx);case'wildShape':return useWildShape(h);case'huntersMark':return useHuntersMark(h);case'flashOfGenius':return useFlashOfGenius(h);case'arcaneRecovery':return useArcaneRecovery(h,ctx);case'divineSmite':return useDivineSmite(h,ctx.spellLevel);case'relentlessRage':return useRelentlessRage(h,ctx);case'deflectMissiles':return useDeflectMissiles(h,ctx.damage,ctx);default:return useSubclassFeature(h,id,ctx);}}

  function spellDamageModifiers(h,ctx){
    ctx=ctx||{};var out={bonus:0,maximize:false,rerollOne:false,notes:[],selfDamage:0};
    var type=String(ctx.damageType||'').toLowerCase(),level=num(ctx.spellLevel,0);
    var st=ensureState(h);
    if(isSubclassFeatureAvailable(h,'Чародей','elementalAffinity')&&ctx.damageType){
      var affinity=String(h.draconicElement||h.elementalAffinityType||st.draconicElement||'').toLowerCase();
      var aliases={acid:['acid','кислота'],cold:['cold','холод'],fire:['fire','огонь'],lightning:['lightning','молния'],poison:['poison','яд'],thunder:['thunder','гром']};
      var matches=aliases[affinity]||[affinity];
      if(matches.indexOf(type)>=0){out.bonus+=Math.max(0,abilityMod(h,'cha'));out.notes.push('Стихийное родство');}
    }
    if(isSubclassFeatureAvailable(h,'Чародей','spellBombardment')){out.rerollOne=true;out.notes.push('Бомбардировка');}
    if(isSubclassFeatureAvailable(h,'Изобретатель','alchemicalSavant') && (ctx.usesAlchemistSupplies||h.usesAlchemistSupplies||st.usesAlchemistSupplies)){
      var allowed=['acid','fire','necrotic','poison'];if(allowed.indexOf(type)>=0){out.bonus+=Math.max(0,abilityMod(h,'int'));out.notes.push('Алхимический умелец');}
    }
    if(isSubclassFeatureAvailable(h,'Волшебник','overchannel') && st.overchannelActive && ctx.hasDamage && level>=1 && level<=5 && !ctx.cantrip){
      if(ctx.applyOverchannel!==false){st.overchannelActive=false;var count=num(st.overchannelUses,0)+1;st.overchannelUses=count;out.maximize=true;out.notes.push('Перенапряжение магии');if(count>1)out.selfDamageDice=level*count;}
    }
    return out;
  }
  function resetTurn(h){if(!h)return;syncClassResources(h);if(!h.turnResources)h.turnResources={};h.turnResources.actions=1;h.turnResources.bonusAction=1;h.turnResources.reaction=1;h.turnResources.movement=num(h.speed,30);var s=ensureState(h);s.sneakUsedThisTurn=false;s.foeSlayerUsedThisTurn=false;s.recklessThisTurn=false;s.actionSurgeUsed=false;s.rageMaintained=false;if(activeRage(h)&&classLevel(h,'Варвар')>=15)s.rageMaintained=true;if(global.DNDContent&&global.DNDContent.listClasses)global.DNDContent.listClasses().forEach(function(x){if(classLevel(h,x.name)>0){var p=global.DNDContent.getClass(x.name);if(p&&p.hooks&&typeof p.hooks.startTurn==='function')p.hooks.startTurn(h,{turnResources:h.turnResources});}});}
  function onAttackResult(h,ctx){if(!h)return;var s=ensureState(h);if(ctx&&ctx.sneakApplied)s.sneakUsedThisTurn=true;if(classLevel(h,'Кровавый охотник')>=20&&ctx&&ctx.critical&&s.crimsonRite&&s.crimsonRite.active&&h.resources&&h.resources.bloodMaledict){h.resources.bloodMaledict.current=Math.min(h.resources.bloodMaledict.max,h.resources.bloodMaledict.current+1);s.sanguineMasteryRefundedThisTurn=true;}if(ctx&&ctx.foeSlayerApplied&&ctx.hit)s.foeSlayerUsedThisTurn=true;if(ctx&&ctx.pendingOnHit&&ctx.pendingOnHit.divineSmite){if(s.pendingOnHit)s.pendingOnHit.divineSmite=null;}if(ctx&&ctx.pendingOnHit&&ctx.pendingOnHit.stunningStrike){if(s.pendingOnHit)s.pendingOnHit.stunningStrike=null;}if(activeRage(h))s.rageMaintained=true;if(global.DNDContent&&global.DNDContent.listClasses)global.DNDContent.listClasses().forEach(function(x){if(classLevel(h,x.name)>0){var p=global.DNDContent.getClass(x.name);if(p&&p.hooks&&typeof p.hooks.onAttackResult==='function')p.hooks.onAttackResult(h,ctx||{});}});}

  function consumePendingOnHit(h,ctx){var s=ensureState(h),p=s.pendingOnHit||{},out={};if(ctx&&ctx.hit){if(p.divineSmite)out.divineSmite=JSON.parse(JSON.stringify(p.divineSmite));if(p.stunningStrike)out.stunningStrike=JSON.parse(JSON.stringify(p.stunningStrike));}return out;}
  function onTurnEnd(h){if(!h)return;var s=ensureState(h);if(activeRage(h)&&!s.rageMaintained&&!isSubclassFeatureAvailable(h,'Варвар','persistentRage'))s.raging=false;if(global.DNDContent&&global.DNDContent.listClasses)global.DNDContent.listClasses().forEach(function(x){if(classLevel(h,x.name)>0){var p=global.DNDContent.getClass(x.name);if(p&&p.hooks&&typeof p.hooks.onTurnEnd==='function')p.hooks.onTurnEnd(h);}});if(hasClass(h,'Пугилист')&&global.pugilistRuntime&&typeof global.pugilistRuntime.onTurnEnd==='function')global.pugilistRuntime.onTurnEnd(h);}

  function getSubclassList(cls){return typeof global.getAvailableSubclasses==='function'?global.getAvailableSubclasses(cls):[];}
  function chooseSubclassForClass(cls){var h=hero();if(!h)return;var lvl=classLevel(h,cls);var list=getSubclassList(cls);if(!list.length){alert('Для '+cls+' пока нет зарегистрированных подклассов.');return;}var pick=num(list[0].pickLevel,getSubclassPickLevel(cls));if(lvl<pick){alert('Подкласс '+cls+' выбирается с '+pick+' уровня.');return;}var text='Выберите подкласс '+cls+':\n'+list.map(function(x,i){return (i+1)+'. '+x.name+' — '+x.description;}).join('\n');var n=Number(prompt(text,'1'));if(!n||!list[n-1])return;var sub=list[n-1].name;var c=(h.classes||[]).find(function(x){return String(x.name)===cls;});if(!c)return;c.subclass=sub;ensureState(h).subclassChoices=ensureState(h).subclassChoices||{};ensureState(h).subclassChoices[cls]=sub;if(typeof global.applySubclassProgression==='function')for(var l=pick;l<=lvl;l++)global.applySubclassProgression(h,cls,sub,l);if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();renderClassFeatures();if(typeof global.renderCombatAbilities==='function')global.renderCombatAbilities();alert('✨ '+cls+': выбран подкласс «'+sub+'».');}
  function chooseAssassinSubclass(){chooseSubclassForClass('Плут');}

  function useClassFeatureUI(id){var h=hero();if(!h)return;var ctx={};if(id==='cunningAction')ctx.kind=prompt('Действие: dash / disengage / hide','dash');if(id==='bardicInspiration'){var name=prompt('Имя союзника:','Союзник');ctx.target={name:name};}if(id==='layOnHands'){ctx.amount=Number(prompt('Сколько HP восстановить?','5'))||5;}if(id==='metamagic'){var options=['careful','distant','empowered','extended','quickened','subtle','heightened','twinned'];var s=prompt('Метамагия:\n'+options.map(function(x){return x+' — '+META_NAMES[x]+(META_COST[x]?' ('+META_COST[x]+' очк.)':'');}).join('\n'),'quickened');if(!s||options.indexOf(s)<0)return;ctx.meta=s;ctx.spell={level:1};}if(id==='divineSmite'){ctx.spellLevel=Number(prompt('Круг ячейки для Божественной кары:','1'))||1;}var r=useFeature(h,id,ctx);if(!r.ok){alert(r.reason);return;}if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();renderClassFeatures();if(typeof global.renderCombatAbilities==='function')global.renderCombatAbilities();alert(r.message||'Готово.');}
  function chooseMetamagic(){useClassFeatureUI('metamagic');}

  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function renderClassFeatures(){var h=hero(),box=document.getElementById('classFeaturesList');if(!h||!box)return;syncClassResources(h);var ids=buildFeatureSet(h),html='';
    CLASS_NAMES.forEach(function(cls){var lvl=classLevel(h,cls);if(!lvl)return;var sub=getSubclass(h,cls);var pick=getSubclassPickLevel(cls);if(lvl>=pick&&!sub){html+='<div class="weapon-card" style="margin-bottom:8px;border:1px solid #7b1fa2"><strong>🌟 '+esc(cls)+': выберите подкласс</strong><div style="font-size:.78em;color:#aaa;margin:4px 0">Доступно с '+pick+' уровня.</div><button class="btn-action" style="padding:6px 10px;background:#7b1fa2" onclick="chooseSubclassForClass(\''+esc(cls)+'\')">Выбрать подкласс</button></div>';}});
    var grouped={};ids.forEach(function(id){var f=FEATURE_DEFS[id];if(!f)return;var key=f.cls;grouped[key]=grouped[key]||[];if(!grouped[key].some(function(x){return x.id===id;}))grouped[key].push(f);});
    Object.keys(grouped).forEach(function(cls){html+='<div style="font-size:.85em;color:#d4af37;margin:10px 0 5px"><b>'+esc(cls)+'</b>'+(ARTIFICER_CLASSES.indexOf(cls)>=0?' <span style="color:#999">(доп. контент)</span>':'')+'</div>';grouped[cls].forEach(function(f){var resMap={rage:'rages',bardicInspiration:'bardicInspiration',secondWind:'secondWind',actionSurge:'actionSurges',indomitable:'indomitable',flurry:'ki',patientDefense:'ki',stepWind:'ki',channelDivinity:'channelDivinity',layOnHands:'layOnHands',wildShape:'wildShape',huntersMark:'huntersMark',sorceryPoints:'sorceryPoints',pactBoon:'pactSlots',eldritchInvocations:'pactSlots',flashOfGenius:'flashOfGenius'};var res=h.resources&&h.resources[resMap[f.id]];var uses=res?(res.current===Infinity?'∞':res.current+'/'+res.max):'';var active=['rage','reckless','secondWind','actionSurge','indomitable','flurry','patientDefense','stepWind','bardicInspiration','layOnHands','channelDivinity','turnUndead','wildShape','huntersMark','flashOfGenius','arcaneRecovery','divineSmite','deflectMissiles'].indexOf(f.id)>=0;var button=active?'<button class="btn-action" style="padding:5px 9px" onclick="useClassFeature(\''+f.id+'\')">Использовать</button>':'';if(f.id==='metamagic')button='<button class="btn-action" style="padding:5px 9px" onclick="chooseMetamagic()">Метамагия</button>';if(f.id==='cunningAction')button='<button class="btn-action" style="padding:5px 9px" onclick="useClassFeature(\'cunningAction\')">Использовать</button>';html+='<div class="weapon-card" style="margin-bottom:6px"><div style="display:flex;gap:7px;align-items:center"><strong style="flex:1">'+esc(f.name)+'</strong>'+(uses?'<span style="font-size:.75em;color:#aaa">'+uses+'</span>':'')+button+'</div><div style="font-size:.77em;color:#aaa;margin-top:4px">'+esc(f.description)+'</div></div>';});});
    box.innerHTML=html||'<div style="color:#777">Добавьте класс персонажу.</div>';
  }

    function spendExtendedResource(h,id,n,ctx){
    if(!h)return{ok:false,reason:'Персонаж не найден.'};
    syncClassResources(h);
    var v=Math.max(1,Number(n)||1), s, rt, pack, res;
    id=String(id||'');

    if(id==='runicCharges'){
      s=h.classFeaturesState&&h.classFeaturesState.runekeeper;rt=global.runeKeeperRuntime;
      if(!s||!rt||typeof rt.charge!=='function')return{ok:false,reason:'Расход рунного заряда не поддержан runtime.'};
      var objectId=ctx&&ctx.objectId;
      if(!objectId)return{ok:false,reason:'Для расхода рунного заряда нужна конкретная руна.'};
      if(v!==1)return{ok:false,reason:'Рунный заряд расходуется по одному за активацию.'};
      var rr=rt.charge(h,objectId);if(rr&&rr.ok&&h.resources&&h.resources.runicCharges)h.resources.runicCharges.current=Math.max(0,Math.min(Number(rr.remaining)||0,h.resources.runicCharges.max));return rr;
    }
    if(id==='savantReactions'){
      s=h.classFeaturesState&&h.classFeaturesState.savant;rt=global.savantRuntime;
      if(!s||!rt)return{ok:false,reason:'Runtime Саванта недоступен.'};
      if(Number(s.reactionUses)<v)return{ok:false,reason:'Реакции Саванта закончились.'};
      if(v!==1)return{ok:false,reason:'Реакция Саванта расходуется по одной за активацию.'};
      if(typeof rt.observe==='function'){var sr=rt.observe(h,'resource',{});if(sr&&sr.ok&&h.resources&&h.resources.savantReactions)h.resources.savantReactions.current=Math.max(0,Math.min(Number(sr.remaining)||0,h.resources.savantReactions.max));return sr;}
      s.reactionUses=Number(s.reactionUses)-v;
      return{ok:true,remaining:s.reactionUses};
    }

    res=h.resources&&h.resources[id];
    if(!res||Number(res.current)<v)return{ok:false,reason:'Недостаточно ресурса: '+id+'.'};
    res.current-=v;
    return{ok:true,remaining:res.current};
  }

  function extendedResourceState(h){
    if(!h)return {};
    syncClassResources(h);
    var out={resources:{},version:'custom-resource-bridge-1'};
    if(h.resources){
      ['alchemistReagents','wardenInterrupt','wardenFontOfLife','wardenLegendaryResistance','wardenSecondWind',
       'accursedSpellSlots','psiPoints','warlordExploitDice','warlordInspiringWord','warlordRally','arcaneSurges','bloodMaledict',
       'shifterAdrenaline','shifterPrimevalForm','vesselMagicSlots','charnelTouch','undyingServitude',
       'brandCastigation','aetherWalk','hybridTransformation','mutagenConcoctions','strangeMetabolism','exaltedMutation','profaneSoulSlots',
       'illriggerSeals','illriggerConduit','illriggerInvokeHell','illriggerSuperiorInterdict','illriggerInfernalMajesty','illriggerMasterOfHell',
       'wardenInterrupt','wardenFontOfLife','wardenSurvive','wardenLegendaryResistance','wardenSecondWind','wardenBattleDice',
       'pugilistMoxie','pugilistBloodiedButUnbowed','pugilistDigDeep','pugilistFightingSpirit','pugilistDownButNotOut','pugilistPersona','pugilistWorkCrowd','pugilistSignatureMove','pugilistDreadHand','pugilistGrotesqueGrowth','pugilistFountainViscera','pugilistUncouthArt','pugilist_heelstomper','pugilist_lowBlow','pugilist_pocketSand',
       'martyrSpellUses','martyrDivineRespite','occultistFateReading','occultistBloodMagic',
       'beastheartFerocity','runicCharges','savantReactions'].forEach(function(id){
        if(h.resources[id])out.resources[id]={current:h.resources[id].current,max:h.resources[id].max,recharge:h.resources[id].recharge};
      });
    }
    if(hasClass(h,'Аккурсд')){
      var a=h.classFeaturesState&&h.classFeaturesState.accursed;
      if(a)out.accursed={metamorphosesKnown:Array.isArray(a.metamorphoses)?a.metamorphoses.length:0,metamorphosesMax:a.metamorphosisMax,spellSlots:a.spellSlots||a.slots||null};
    }
    if(hasClass(h,'Рунный хранитель')){
      var r=h.classFeaturesState&&h.classFeaturesState.runekeeper;
      if(r)out.runekeeper={charges:r.runicCharges,chargesMax:r.runicChargeMax,runesKnown:r.runesKnown};
    }
    if(hasClass(h,'Савант')){
      var s=h.classFeaturesState&&h.classFeaturesState.savant;
      if(s)out.savant={reactions:s.reactionUses,reactionsMax:s.reactionMax,focuses:s.focuses||[]};
    }
    return out;
  }

global.DNDClassFeatures={VERSION:'3.2.0',CLASS_NAMES:CLASS_NAMES,CORE:CORE,SUBCLASS_FEATURES:SUBCLASS_FEATURES,FEATURE_DEFS:FEATURE_DEFS,META_COST:META_COST,META_NAMES:META_NAMES,getSubclass:getSubclass,isAssassin:isAssassin,featureAvailableForCurrentBuild:featureAvailableForCurrentBuild,syncClassResources:syncClassResources,buildFeatureSet:buildFeatureSet,useFeature:useFeature,attackModifiers:attackModifiers,saveModifiers:saveModifiers,spellDamageModifiers:spellDamageModifiers,checkModifiers:checkModifiers,resetTurn:resetTurn,onAttackResult:onAttackResult,consumePendingOnHit:consumePendingOnHit,onTurnEnd:onTurnEnd,restore:restore,spendExtendedResource:spendExtendedResource,extendedResourceState:extendedResourceState,activeRage:activeRage,reactionOptions:reactionOptions,resolveReaction:resolveReaction};
  global.renderClassFeatures=renderClassFeatures;global.useClassFeature=useClassFeatureUI;global.chooseMetamagic=chooseMetamagic;global.chooseAssassinSubclass=chooseAssassinSubclass;global.chooseSubclassForClass=chooseSubclassForClass;
  global.addEventListener('dnd-character-rendered',function(){setTimeout(renderClassFeatures,0);});
})(window);
