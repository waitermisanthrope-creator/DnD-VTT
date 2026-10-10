/* Savant — laserllama v5.6.1, public GM Binder
 * Russian runtime/data layer.
 */
(function(){
const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const DIE=[null,"d4","d4","d4","d4","d6","d6","d6","d6","d8","d8","d8","d8","d10","d10","d10","d10","d12","d12","d12","d12"];
const REACTIONS=Array.from({length:21},(_,l)=>l>=17?4:l>=11?3:l>=5?2:1);
const disciplines={
"Археолог":{
features:{
3:["Ученик истории: История и Расследование; Интеллектуальный куб к проверкам, две дополнительных языка, бонус к проверкам ловушек, определение возраста/происхождения/стоимости и магии предметов.","Око древности: во время отдыха находить временный магический Curio; Интеллект — базовая характеристика; обслуживание на каждом долгом отдыхе."],
7:["Отважный исследователь: Интеллектуальный куб к спасброскам против ловушек, скорость лазания.","Древние знания: игнорировать ограничения настройки/использования магических предметов, свитков и зелий; Curio может быть необычным."],
13:["Мастер знаний: эффект легендора по наблюдаемому объекту/месту/существу.","Найденная аркана: Интеллектуальный DC для спасбросков магических предметов и восстановление зарядов одного Curio после отдыха."],
18:["Мастер-археолог: сопротивление урону от заклинаний, магических предметов и ловушек; один Curio может иметь свойства редкого предмета."]
}},
"Исследователь":{
features:{
3:["Ученик истины: Проницательность и Расследование; Интеллект вместо Мудрости для Проницательности и Восприятия; ускоренный Поиск; Воровской жаргон; изучение черт/идеалов/связей/слабостей Фокуса.","Грязная драка: усиленные безоружные атаки и бонусная безоружная атака; можно отказаться от Studied Strike для ослепления, оглушения речи, глухоты или сбивания с ног."],
7:["Преступные связи: Интеллектуальный куб к социальным проверкам на Воровском жаргоне; получает «Секреты и шёпот».","Грязный боец: усиленная реакция после промаха Calculated Flourish, два эффекта Грязной драки, возможность сделать атакующего новым Фокусом и дать помеху атаке."],
13:["Пронизывающий взгляд: всегда распознаёт ложь Фокуса, видит наличие иллюзий и оборотней; может заменить обычный эффект Грязной драки на Ошеломление."],
18:["Мастер-исследователь: истинное зрение 30 футов, обнаружение скрытых дверей/ловушек и лжи; раз за отдых атака или Potent Observation по Фокусу становится критическим попаданием."]
}},
"Наставник":{
features:{
3:["Ученик жизни: История, Проницательность и ремесленный инструмент; Интеллектуальный куб к ним; Интеллект вместо Мудрости для Проницательности; бесплатное Изучение/Быстрая учёба; переброс 1 на Интеллектуальном кубе.","Мудрый совет: реакция заставляет союзника в 30 футах перебросить проваленную проверку, атаку или спасбросок; число использований = Интеллект."],
7:["Спокойствие: если за ход не наносил урон и не вынуждал спасбросок, временные HP = Интеллект.","Успокаивающее присутствие: союзники на коротком отдыхе с вами имеют преимущество на восстановление HP Костями хитов."],
13:["Чудесный совет: после переброса дать Интеллектуальный куб или временные HP; восстановление использований на коротком/долгом отдыхе и одно при инициативе.","Мистическая интуиция: 1 минута медитации даёт ответ как commune, если ответ известен смертному; 1/долгий отдых."],
18:["Мастер-наставник: выбранные союзники в 15 футах получают ваш модификатор Интеллекта к проверкам и спасброскам; Мистическая интуиция после каждого отдыха."]
}},
"Натуралист":{
features:{
3:["Ученик природы: Уход за животными и Природа; Интеллектуальный куб; Интеллект вместо Мудрости для Ухода и Выживания; можно определять Фокус по следам.","Журнал натуралиста: после часа исследования заносить окружение или Зверя/Растение/Чудовище; преимущество на связанные проверки, специальные бонусы Фокуса и игнор обычной трудной местности."],
7:["Зов природы: заставить описанное в журнале существо пройти спасбросок Харизмы; при провале оно очаровано и выполняет команды; повторный спасбросок после урона."],
13:["Продвинутые исследования: добавляются Драконы, Великаны, Слизи и Нежить; преимущества Журнала распространяются на них, а магическая трудная местность игнорируется."],
18:["Мастер-натуралист: любой не-гуманоид может быть внесён в Журнал, преимущество атак по изученным существам; Зов природы длится до добровольного освобождения, смены цели или смерти."]
}},
"Врач":{
features:{
3:["Ученик медицины: Медицина и Ловкость рук; Интеллектуальный куб; определение болезней/ядов/проклятий Фокуса; можно снизить скорость Фокуса; восстановление использований Набора лекаря.","Боевой медик: Адреналиновый импульс, Перевязка ран и Лечебный рывок; расход Набора лекаря максимизирует Интеллектуальные кубы; стабилизация существа с 0 HP."],
7:["Полевой врач: после действия Боевого медика бонусным действием Рывок, Отход или атака.","Уверенные руки: действия Боевого медика можно применять к себе, кроме ряда ограничивающих состояний."],
13:["Медицинская экспертиза: число усилений = модификатор Интеллекта за короткий/долгий отдых; снимает тяжёлые состояния, восстанавливает конечности или возвращает умершего менее минуты назад."],
18:["Мастер-врач: существо, которого вы касаетесь, при трате Кости хитов восстанавливает максимальное значение."]
}},
"Тактик":{
features:{
3:["Ученик войны: История, Убеждение и два игровых набора; Интеллектуальный куб; средняя броня, щиты и немассивное воинское оружие; Интеллект вместо Ловкости для КД; Potent Observation на инициативу.","Тактическое командование: при Атаке жертвовать атаками для приказов — Атака, Защита, Манёвр или Поддержка."],
7:["Продвинутая тактика: новые приказы — Воодушевление и Восстановление.","Стратегическое превосходство: две атаки действием Атака; после Рывка/Уклонения/Отхода бонусным действием атака или приказ."],
13:["Тактический гений: приказ до начала первого хода после броска инициативы; Potent Observation на атаку союзника по Фокусу после броска, но до результата."],
18:["Мастер-тактик: каждый приказ даёт временные HP = Интеллект; два легендарных приказа 1/короткий или долгий отдых — Героический и Оживляющий."]
}}};
const pursuits={
"Инструкция":"За час обучает до уровня Саванта существ с Интеллектом 8+ одному вашему навыку, инструменту, оружию или языку до следующего долгого отдыха.",
"Идеальная память":"После минуты наблюдения позволяет идеально вспоминать наблюдаемые детали объекта или существа.",
"Быстрая учёба":"За час получить временное владение навыком/инструментом или язык по образцу; можно совершить Поиск при инициативе, если не застигнут врасплох.",
"Астрология":"Владение Магией и Интеллектуальный куб к ней; во время ночного долгого отдыха записать d20 и один раз заменить им бросок до следующего отдыха.",
"Соколиная охота":"Владение Восприятием + Интеллектуальный куб; обученный сокол действует в бою и командуется бонусным действием.",
"Лингвистика":"Владение Убеждением + Интеллектуальный куб; дополнительные языки в количестве модификатора Интеллекта.",
"Физическая подготовка":"Владение Атлетикой или Акробатикой + Интеллектуальный куб; скорость лазания или плавания равна скорости ходьбы; можно изучить дважды.",
"Загадки":"Владение Обманом + Интеллектуальный куб; скрытые сообщения в рифмах и загадках.",
"Секреты и шёпот":"Владение Скрытностью + Интеллектуальный куб; после долгого отдыха в поселении узнать важный местный слух за последний месяц.",
"Богословие":"Владение Религией + Интеллектуальный куб, Небесный; ритуалом без слота давать bless, ceremony, detect evil and good или protection from evil and good.",
"Традиции":"Владение Историей + Интеллектуальный куб; Историю можно применять вместо Харизмы при опоре на местные обычаи."
};
const progression={className:"Савант",englishName:"Savant",source:"laserllama — Savant v5.6.1",status:"implemented_partial_v5_6_1_runtime",edition:"5E 2014",hitDie:8,primaryStat:"intelligence",savingThrows:["intelligence","wisdom"],armor:["light"],weapons:["simple","rapier","shortsword","whip"],tools:["one artisan's tool"],skills:["Arcana","History","Investigation","Insight","Medicine","Nature","Persuasion","Religion"],multiclassRequirement:{intelligence:13},subclassLevel:3,subclassFeatureLevels:[3,7,13,18],levels:{}};
const features={
1:["Искусный анализ","Аналитическая защита"],2:["Мощное наблюдение","Учёные стремления"],3:["Академическая дисциплина"],4:["Увеличение характеристик/Черта"],5:["Расчётный манёвр","Быстрые рефлексы (2 реакции)"],6:["Острый ум"],7:["Особенность дисциплины"],8:["Увеличение характеристик/Черта"],9:["Острая осведомлённость"],10:["Непревзойдённый гений"],11:["Быстрые рефлексы (3 реакции)"],12:["Увеличение характеристик/Черта"],13:["Особенность дисциплины"],14:["Несокрушимая воля"],15:["Безупречный анализ"],16:["Увеличение характеристик/Черта"],17:["Быстрые рефлексы (4 реакции)"],18:["Особенность дисциплины"],19:["Увеличение характеристик/Черта"],20:["Несравненный интеллект"]
};
for(let l=1;l<=20;l++)progression.levels[l]={features:features[l],intellectDie:DIE[l],reactions:REACTIONS[l],asi:[4,8,12,16,19].includes(l)};
progression.mechanics={adroitAnalysis:"bonus action Search/Help/Intelligence check; Search marks visible Focus within 60 ft; concentration; learn characteristics; Focus attacks against you have disadvantage; Studied Strike uses Intelligence and adds Intellect Die once/turn or learns another characteristic.",analyticalDefense:"AC 10+Dex+Int without armor/shield; v5.6.1 also uses Intelligence in place of Dexterity for light/medium armor where allowed.",potentObservation:"reaction within 30 ft to add Intellect Die to qualifying damage/check/save; improves at 10.",scholarlyPursuits:pursuits,calculatedFlourish:"reaction add Intellect Die to AC against visible attack; at 10 a miss also permits movement without opportunity attacks.",sharpMind:"Intellect Die to Int/Wis/Cha saves and Potent Observation on forced saves.",keenAwareness:"cannot be surprised and adds Intelligence to initiative.",unrivaledGenius:"Potent Observation can support any damage; Focus gets two dice; Calculated Flourish miss grants disengaging movement or attack.",unyieldingWill:"Charisma save proficiency and advantage against Focus-forced saves and saves vs Charmed/Frightened.",flawlessAnalysis:"action, Focus Intelligence save; on fail severe penalties until next turn; once per creature per long rest.",incomparableIntellect:"Intelligence +4 up to 24; low Intellect Die can be replaced by Intelligence modifier."};
window.SAVANT_V561={PB,DIE,REACTIONS,progression,disciplines,pursuits};
window.savantProgression=Object.assign(window.savantProgression||{},progression);
window.savantRuntime={version:"5.6.1",getDie:l=>DIE[l],getReactions:l=>REACTIONS[l],getDC:(pb,intMod)=>8+pb+intMod,getDiscipline:n=>disciplines[n]||null,getPursuit:n=>pursuits[n]||null};
window.savantDisciplines=Object.keys(disciplines);

  const MECHANICS={focusRangeFt:60,focusDuration:"1_minute",focusEndsOn:"incapacitated_or_new_focus",analysisAction:"bonus_action",reactionUsesByLevel:REACTIONS,reactionsRefresh:"start_of_round",analyticalDefense:"10+DEX+INT without armor/shield",calculatedFlourish:"reaction_add_intellect_die_to_AC",flawlessAnalysis:{level:15,action:"action",save:"intelligence",recharge:"long_rest_per_creature"},incomparableIntellect:{level:20,maxIntelligence:24,bonus:4}};
  function svState(h){h.classFeaturesState=h.classFeaturesState||{};var s=h.classFeaturesState.savant=h.classFeaturesState.savant||{};if(!Array.isArray(s.focuses))s.focuses=[];return s;}
  function svEntry(h){return (h&&h.classes||[]).find(c=>c&&(['Савант','Savant'].includes(c.name)||c.englishName==='Savant'));}
  function svLevel(h){return Math.min(20,Math.max(0,Number(svEntry(h)?.level)||0));}
  function svMod(h,k){var a=h.abilityScores||h.stats||h.abilities||h;return Math.floor((Number(a[k]??a[k.slice(0,3)]??10)-10)/2);}
  const disciplineAliases={archaeologist:'Археолог',investigator:'Исследователь',mentor:'Наставник',naturalist:'Натуралист',physician:'Врач',tactician:'Тактик'};
  function disciplineName(n){return disciplines[n]?n:disciplineAliases[n]||null;}
  function svRoundKey(h){var t=(window.currentChar||window.currentCharacter||h).initiativeTracker;return t&&t.combatants?.length?String(t.id||t.encounterId||'combat')+':'+Number(t.round||1):null;}
  function svClearFocus(h){var s=svState(h);s.focuses=[];s.focusUntil=null;s.focusStartedAt=null;delete s.focusExpiresAt;delete s.focusRounds;if(h.concentration?.spellId==='savant-focus')window.DNDCombat?.breakConcentration(h);}
  function svSync(h){
    var l=svLevel(h),s=svState(h);if(!l)return s;var selected=svEntry(h).subclass;
    s.discipline=disciplineName(selected)||(!selected?disciplineName(s.discipline):null)||null;s.level=l;s.proficiencyBonus=Number(h.proficiencyBonus)||PB[l];s.intellectDie=DIE[l];s.reactionMax=REACTIONS[l];s.saveDC=8+s.proficiencyBonus+svMod(h,'intelligence');s.analyticalAC=10+svMod(h,'dexterity')+svMod(h,'intelligence');
    h.resources=h.resources||{};var r=h.resources.savantReactions||(h.resources.savantReactions={current:s.reactionUses??s.reactionRoundUses??s.reactionMax});r.max=s.reactionMax;r.current=Math.max(0,Math.min(r.max,Number(r.current)||0));r.recharge='round';
    var key=svRoundKey(h);if(key&&s.roundKey!==key){if(s.roundKey!=null)r.current=r.max;s.roundKey=key;s.reactionTriggers=[];}
    s.reactionUses=r.current;s.reactionRoundUses=r.current;
    if(s.focuses.length&&(s.focusExpiresAt<=Date.now()||Number(h.hpCurrent??h.hp?.current??h.hp)<=0||!h.concentration?.active||h.concentration.spellId!=='savant-focus'||['Бессознателен','Недееспособен','Парализован','Оглушён'].some(k=>h.conditions?.[k]||h.activeConditions?.[k])))svClearFocus(h);
    var armored=h.armorEquipped||h.equippedArmor||h.equipment?.armor||h.equipment?.armour||h.shieldEquipped||h.equippedShield||h.equipment?.shield;
    if(!armored){if(!s.acSnapshot)s.acSnapshot={before:h.ac,applied:Math.max(Number(h.ac)||0,s.analyticalAC)};else{var previousAC=s.acSnapshot.applied;s.acSnapshot.applied=Math.max(Number(s.acSnapshot.before)||0,s.analyticalAC);if(h.ac===previousAC)h.ac=s.acSnapshot.applied;}if(h.ac==null||h.ac===s.acSnapshot.before||h.ac===s.acSnapshot.applied)h.ac=s.acSnapshot.applied;}
    else if(s.acSnapshot){if(h.ac===s.acSnapshot.applied)h.ac=s.acSnapshot.before;delete s.acSnapshot;}
    return s;
  }
  function svDiscipline(h,name){name=disciplineName(name);var s=svSync(h);if(svLevel(h)<3||!name||s.discipline&&s.discipline!==name)return {ok:false,reason:'Недоступная либо уже выбранная дисциплина.'};s.discipline=name;svEntry(h).subclass=name;return {ok:true,discipline:name,data:disciplines[name]};}
  function svPursuit(h,name){if(svLevel(h)<2||!pursuits[name])return {ok:false,reason:'Недоступное учёное стремление.'};svState(h).pursuit=name;return {ok:true,pursuit:name,data:pursuits[name],message:'Выбор сохранён; полный эффект стремления требует обработчика.'};}
  function svFocus(h,target,ctx){ctx=ctx||{};var s=svSync(h),B=window.DNDCombat;if(!svLevel(h)||!target||!target.id||ctx.visible===false||ctx.distanceFt!=null&&(!Number.isFinite(Number(ctx.distanceFt))||Number(ctx.distanceFt)>60)||!B)return {ok:false,reason:'Нужна видимая цель Фокуса в 60 футах.'};
    B.beginConcentration(h,{id:'savant-focus',name:'Искусный анализ',concentration:true});s.focuses=[target.id];s.focusUntil='1_minute';s.focusStartedAt=Date.now();s.focusExpiresAt=Date.now()+60000;s.focusRounds=10;s.studiedUsed=false;return {ok:true,targetId:target.id,durationRounds:10,message:'Цель стала Фокусом; поддерживается концентрация.'};
  }
  function svRoll(h){var s=svSync(h),faces=parseInt(s.intellectDie.slice(1),10),raw=1+Math.floor(Math.random()*faces);return svLevel(h)>=20?Math.max(raw,svMod(h,'intelligence')):raw;}
  function svSpend(h,ctx){if(!svLevel(h))return {ok:false,reason:'Нет уровня Саванта.'};var s=svSync(h),r=h.resources.savantReactions;if(!r||r.current<1||ctx.triggerId&&(s.reactionTriggers||[]).includes(ctx.triggerId))return {ok:false,reason:'Нет реакции или она уже применена к этому событию.'};r.current--;s.reactionUses=r.current;s.reactionRoundUses=r.current;if(ctx.triggerId){s.reactionTriggers=s.reactionTriggers||[];s.reactionTriggers.push(ctx.triggerId);}if(h.turnResources)h.turnResources.reaction=r.current>0?1:0;return {ok:true,remaining:r.current};}
  function svObserve(h,kind,ctx){if(kind&&typeof kind==='object'){ctx=kind;kind=ctx.kind;}ctx=ctx||{};var s=svSync(h),roll=ctx.rollResult||ctx.saveResult;
    if(svLevel(h)<2||!['save','check','damage'].includes(kind)||ctx.eligible!==true||!roll||!Number.isFinite(Number(roll.total))||ctx.visible===false||ctx.distanceFt!=null&&(!Number.isFinite(Number(ctx.distanceFt))||Number(ctx.distanceFt)>30))return {ok:false,reason:'Нужен подходящий незавершённый результат броска в пределах 30 футов.'};
    var spent=svSpend(h,ctx);if(!spent.ok)return spent;var bonus=svRoll(h);roll.total=Number(roll.total)+bonus;if(kind==='save'&&roll.dc!=null&&Number.isFinite(Number(roll.dc)))roll.success=roll.total>=Number(roll.dc);return {ok:true,kind,bonus,die:s.intellectDie,remaining:spent.remaining,result:roll,message:'Мощное наблюдение: +'+bonus};
  }
  function svFlourish(h,ctx){ctx=ctx||{};var s=svSync(h),a=ctx.attackResult;if(!window.DNDContent.resolveFeature(h,'calculatedFlourish','Савант')||svLevel(h)<5||!ctx.pendingAttack||!a||!Number.isFinite(Number(a.total))||!Number.isFinite(Number(a.ac))||ctx.visible===false||a.hit!==true||a.critical||a.total<a.ac)return {ok:false,reason:'Нужна видимая незавершённая попадающая атака.'};var spent=svSpend(h,ctx);if(!spent.ok)return spent;var bonus=svRoll(h);a.ac=Number(a.ac)+bonus;a.hit=a.total>=a.ac;return {ok:true,acBonus:bonus,remaining:spent.remaining,attack:a,message:'Расчётный манёвр: КД этой атаки +'+bonus};}
  function svAnalysis(h,target){return {ok:false,unsupported:true,reason:'Полные штрафы Безупречного анализа ещё не исполняются.'};}
  function svRestore(h){var s=svSync(h);if(!svLevel(h))return s;h.resources.savantReactions.current=s.reactionMax;s.flawless={};s.reactionTriggers=[];svClearFocus(h);return svSync(h);}
  function svDieValue(h){var s=svSync(h),faces=parseInt(s.intellectDie?.slice(1),10)||4;return {notation:'d'+faces,faces,modifierAtLevel20:svLevel(h)>=20?svMod(h,'intelligence'):null,die:faces};}
  function svAnalyticalAC(h,armor){var s=svSync(h);return !armor||armor==='none'?s.analyticalAC:null;}
  function svFocusState(h){return svSync(h).focuses.slice();}
  function svLongRest(h){return svRestore(h);}
  function svShortRest(h){svClearFocus(h);return svSync(h);}
  function svBeginRound(h){var s=svSync(h),key=svRoundKey(h);if(!key){h.resources.savantReactions.current=s.reactionMax;s.reactionTriggers=[];}return svSync(h);}
  function svIncoming(h,ctx){if(!window.DNDContent.resolveFeature(h,'analyticalDefense','Савант'))return {disadvantage:false};var s=svSync(h);return {disadvantage:svLevel(h)>0&&s.focuses.includes(ctx.attacker?.id)};}
  function svAttack(h,ctx){var s=svSync(h),studied=ctx.weaponAttack&&s.focuses.includes(ctx.target?.id)&&!s.studiedUsed;return {extraDice:studied?['1'+s.intellectDie]:[],extraAttacks:svLevel(h)>=7&&s.discipline==='Тактик'?2:1};}
  function svUse(h,id,ctx){ctx=ctx||{};if(!window.DNDContent.resolveFeature(h,id,'Савант'))return {ok:false,unavailable:true,reason:'Способность Саванта недоступна.'};
    if(id==='savant-chooseDiscipline')return svDiscipline(h,ctx.discipline||ctx.choice);
    if(id==='savant-choosePursuit')return svPursuit(h,ctx.pursuit||ctx.choice);
    if(id==='adroitAnalysis')return svFocus(h,ctx.target,ctx);
    if(id==='savant-endFocus'){svClearFocus(h);return {ok:true,message:'Фокус завершён.'};}
    if(id==='potentObservation')return svObserve(h,ctx.kind,ctx);
    if(id==='calculatedFlourish')return svFlourish(h,ctx);
    if(id==='savant-studiedStrike'){
      var s=svSync(h),expr=ctx.damageDice||ctx.weapon?.damageDice;if(!ctx.target||!s.focuses.includes(ctx.target.id)||!/^\d+d\d+$/.test(String(expr||'')))return {ok:false,reason:'Нужны Фокус и кость урона настоящего оружия.'};
      var attack=window.DNDCombat.attack(h,ctx.target,{bonus:svMod(h,'intelligence')+s.proficiencyBonus,damage:expr+'+'+svMod(h,'intelligence'),damageType:ctx.damageType||ctx.weapon?.damageType||'piercing',weaponAttack:true,useRules:false});return {ok:true,attack,message:'Изученный удар выполнен с Интеллектом.'};
    }
    return {ok:false,unsupported:true,reason:'Этот эффект дисциплины ещё не подключён.'};
  }
  const pack={id:'ll-savant',name:'Савант',aliases:['Savant'],source:progression.source,authoritativeSubclasses:true,subclassLevel:3,
    features:[['adroitAnalysis','Искусный анализ',1,'bonus'],['savant-endFocus','Завершить Фокус',1,'utility'],['savant-studiedStrike','Изученный удар',1,'attack'],['analyticalDefense','Аналитическая защита',1,'passive'],['potentObservation','Мощное наблюдение',2,'reaction'],['savant-choosePursuit','Учёное стремление',2,'choice'],['savant-chooseDiscipline','Академическая дисциплина',3,'choice'],['calculatedFlourish','Расчётный манёвр',5,'reaction'],['flawlessAnalysis','Безупречный анализ',15,'action']].map(([id,name,level,action])=>({id,name,level,action})),
    subclasses:Object.keys(disciplines).map(name=>({id:name,name,pickLevel:3,features:[3,7,13,18].map(level=>({id:'savant-'+name+'-'+level,name:name+' — '+level+' уровень',level,action:'utility',description:(disciplines[name].features[level]||[]).join(' ')}))})),
    hooks:{sync:svSync,useFeature:svUse,attackModifiers:svAttack,startTurn:h=>{svSync(h);svState(h).studiedUsed=false;},onDamage:svSync,onCondition:svSync,onTurnEnd:h=>{var s=svState(h);if(s.focuses.length&&--s.focusRounds<=0)svClearFocus(h);svSync(h);},onAttackResult:(h,ctx)=>{if(ctx.hit&&ctx.attackResult?.damage?.extraDice?.some(x=>x.expression==='1'+svSync(h).intellectDie)&&svState(h).focuses.includes(ctx.targetId))svState(h).studiedUsed=true;},rest:(h,type)=>type==='long'?svLongRest(h):type==='short'?svShortRest(h):svSync(h)}};
  if(window.DNDContent)window.DNDContent.registerClass(pack);else (window.DND_PENDING_CLASS_PACKS=window.DND_PENDING_CLASS_PACKS||[]).push(pack);
  window.SAVANT_V561.MECHANICS=MECHANICS;window.savantRuntime.MECHANICS=MECHANICS;window.savantRuntime.beginRound=svBeginRound;window.savantRuntime.useFeature=svUse;window.savantRuntime.spendReaction=svSpend;window.savantRuntime.incomingAttackModifiers=svIncoming;window.savantRuntime.chooseDiscipline=svDiscipline;window.savantRuntime.choosePursuit=svPursuit;window.savantRuntime.markFocus=svFocus;window.savantRuntime.potentObservation=svObserve;window.savantRuntime.calculatedFlourish=svFlourish;window.savantRuntime.flawlessAnalysis=svAnalysis;window.savantRuntime.restore=svRestore;window.savantRuntime.sync=svSync;window.savantRuntime.getDieValue=svDieValue;window.savantRuntime.analyticalAC=svAnalyticalAC;window.savantRuntime.focusState=svFocusState;window.savantRuntime.longRest=svLongRest;window.savantRuntime.shortRest=svShortRest;


})();
/* V70.26.91 mechanical closure audit: focus/reaction semantics aligned with Savant v5.6.1. */
