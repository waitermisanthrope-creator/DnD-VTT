/**
 * expansion_classes_pack.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Контент-пак популярных сторонних 5e-классов, подключаемых через
 * Content Framework. Здесь нет копии текста книг: только оригинальные
 * структурированные описания и runtime-эффекты для VTT.
 *
 * КАК РАБОТАЕТ:
 * - регистрирует Psion, Warlord, Warden и Spellblade;
 * - создаёт их ресурсы и активные способности;
 * - attackModifiers/saveModifiers дают боевому движку эффекты;
 * - useFeature работает через выбранную VTT-цель из context.target.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * hero.resources, hero.classFeaturesState, psiPoints, commandDice,
 * primalFocus, spellstrikeState и context.target.
 *
 * ИСТОЧНИК:
 * KibblesTasty Homebrew — популярный сторонний 5e-контент. Названия
 * классов/архетипов и происхождение контента помечены; реализация здесь
 * является самостоятельным runtime-слоем и не воспроизводит книгу.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var D=global.DNDContent;
  if(!D)return;
  function lvl(h,n){var c=(h.classes||[]).find(function(x){return String(x.name)===n;});return c?Number(c.level)||0:0;}
  function st(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
  function res(h,key,max,recharge){h.resources=h.resources||{};var r=h.resources[key]||{};r.max=max;r.current=Math.min(Number(r.current===undefined?max:r.current),max);r.recharge=recharge;h.resources[key]=r;return r;}
  function spend(h,key,n){var r=h.resources&&h.resources[key];if(!r||r.current<n)return false;r.current-=n;return true;}
  function mod(h,k){var a=h.abilities||{};var v=a[k]||a[k.toUpperCase()]||0;return Number(v)>10?Math.floor((Number(v)-10)/2):Number(v)||0;}
  function dieFor(l){return l>=17?'1d12':l>=11?'1d10':l>=5?'1d8':'1d6';}

  function psiLimit(l){return Math.ceil(l/2);}
  function psionTalentCount(l){return l>=18?8:l>=15?7:l>=12?6:l>=9?5:l>=7?4:l>=5?3:2;}
  function psionMastery(l){return l>=17?3:l>=11?2:l>=5?1:0;}
  var psionDisciplines={
    enhancement:{name:'Усиление',passive:'Усиливающий навык',power:'Усиливающий импульс',alt:{1:['Героизм','Долгий шаг','Раскрытый потенциал'],2:['Изменение себя','Увеличение/уменьшение','Малое восстановление'],3:['Ускорение','Защита от энергии'],4:['Свобода движения','Каменная кожа'],5:['Высшее восстановление']}},
    projection:{name:'Проекция',passive:'Проецировать предмет',power:'Астральная конструкция',alt:{1:['Плавающий диск','Незримый слуга'],2:['Зеркальное отражение'],3:['Фантомный скакун'],4:['Арканический глаз'],5:['Созидание']}},
    telekinesis:{name:'Телекинез',passive:'Телекинетические руки',power:'Телекинетическая сила',alt:{1:['Прыжок','Ударная волна'],2:['Левитация','Раздробление'],3:['Полёт'],4:['Устойчивый шар'],5:['Телекинез','Стена силы']}},
    telepathy:{name:'Телепатия',passive:'Телепатическое общение',power:'Телепатическое вторжение',alt:{1:['Приказ','Причина страха'],2:['Обнаружение мыслей','Внушение'],3:['Страх'],4:['Подчинение зверя','Принуждение','Замешательство'],5:['Подчинение личности','Изменение памяти','Телепатическая связь']}},
    transposition:{name:'Транспозиция',passive:'Мерцающий шаг',power:'Фазовый разрыв',alt:{1:['Скачок'],2:['Зеркальное отражение'],3:['Мерцание'],4:['Дверь в пространстве'],5:['Телепортация','Эфирность']}},
    psychokinetics:{name:'Психокинетика',passive:'Манипуляция энергией',power:'Элементальный взрыв',alt:{1:['Огненный снаряд'],2:['Луч холода'],3:['Молния'],4:['Огненная стена'],5:['Цепная молния']}},
    precognition:{name:'Предвидение',passive:'Предвидение',power:'Видение',alt:{1:['Благословение','Предчувствие'],2:['Предсказание'],3:['Ускорение'],4:['Свобода движения'],5:['Предвидение']}},
    nullification:{name:'Нейтрализация',passive:'Разрушающее касание',power:'Отрицание',alt:{1:['Снятие проклятия'],2:['Развеивание магии'],3:['Контрзаклинание'],4:['Свобода движения'],5:['Разрушение']}},
    consumption:{name:'Поглощение',passive:'Адаптивный хищник',power:'Пиявка разума',alt:{1:['Поглощение энергии'],2:['Луч слабости'],3:['Поглощение энергии'],4:['Смертельный луч'],5:['Вред']}}
  };
  function syncPsion(h){
    var l=lvl(h,'Psion');if(!l)return;
    var r=res(h,'psiPoints',l,'short');r.max=l;r.limit=psiLimit(l);
    var s=st(h);s.psionTalentsKnown=psionTalentCount(l);s.psionMasteryFree=psionMastery(l);
    s.psionInnate=s.psionInnate||{};s.psionInnateChoices=s.psionInnateChoices||{};
    s.psionDisciplinesKnown=l>=18?3:2;s.psionDisciplinesKnown=Math.min(3,s.psionDisciplinesKnown);if(!s.psionDisciplines)s.psionDisciplines=[];
    s.psionicAbility='intelligence';s.empoweredPsionics=l>=6;s.psionArchetypeFeatureLevels={3:l>=3,6:l>=6,10:l>=10,14:l>=14};s.psionicSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'intelligence');s.psionicAttackBonus=(Number(h.proficiencyBonus)||2)+mod(h,'intelligence');
    if(!s.psionTalents) s.psionTalents=[];
    if(s.psionTalents.length>s.psionTalentsKnown)s.psionTalents=s.psionTalents.slice(0,s.psionTalentsKnown);
    
    s.psionAlternateEffects=Object.keys(psionDisciplines).filter(function(k){return s.psionDisciplines.indexOf(k)>=0;}).map(function(k){return psionDisciplines[k].alt;});
  }
  function psionSpend(h,cost,allowMastery,ctx){
    syncPsion(h);cost=Math.max(0,Number(cost)||0);var r=h.resources.psiPoints,s=st(h);
    if(cost>r.limit)return{ok:false,message:'Нельзя потратить больше '+r.limit+' очков пси за один эффект.'};
    if(cost===0)return{ok:true,spent:0};
    if(ctx&&ctx.useMastery&&allowMastery&&Number(s.psionMasteryFree||0)>0){
      var turnKey=ctx.turnKey!==undefined?String(ctx.turnKey):(ctx.round!==undefined?String(ctx.round)+':'+String(ctx.turn||0):null);
      if(turnKey!==null&&s.psionMasteryTurnKey!==turnKey){s.psionMasteryTurnKey=turnKey;s.psionMasteryUsed=0;}
      var available=Math.max(0,Number(s.psionMasteryFree||0)-Number(s.psionMasteryUsed||0));
      var free=Math.min(cost,available);
      if(free>0){var rest=cost-free;if(rest>0&&!spend(h,'psiPoints',rest))return{ok:false,message:'Недостаточно обычных очков пси.'};s.psionMasteryUsed=(Number(s.psionMasteryUsed)||0)+free;return{ok:true,spent:cost,masterySpent:free};}
    }
    if(!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};
    return{ok:true,spent:cost};
  }
  function psionStartTurn(h,ctx){
    syncPsion(h);ctx=ctx||{};var s=st(h),l=lvl(h,'Psion');if(l<5)return{ok:true,freePsi:0};
    var key=ctx.turnKey!==undefined?String(ctx.turnKey):(ctx.round!==undefined?String(ctx.round)+':'+String(ctx.turn||0):null);
    if(key!==null&&s.psionMasteryTurnKey===key)return{ok:true,freePsi:Math.max(0,Number(s.psionMasteryFree||0)-Number(s.psionMasteryUsed||0))};
    s.psionMasteryTurnKey=key;s.psionMasteryUsed=0;return{ok:true,freePsi:Number(s.psionMasteryFree||0)};
  }
  function psionPower(h,id,ctx){
    ctx=ctx||{};var s=st(h),t=target(ctx),cost=Math.max(0,Number(ctx.psi)||0);
    var needsTarget=['enhancingSurge','telekineticForce','telepathicIntrusion','elementalBlast','denial','mindLeech'].indexOf(id)>=0;
    if(needsTarget&&!t)return{ok:false,message:'Выбери цель.'};
    if(id==='astralConstruct'&&s.astralConstruct&&s.astralConstruct.active)return{ok:false,message:'Астральная конструкция уже существует.'};
    if(id==='projectItem'&&(s.projectedItems||[]).length>=3)return{ok:false,message:'Одновременно можно иметь не более трёх спроецированных предметов.'};
    var p=psionSpend(h,cost,true,ctx);if(!p.ok)return p;
    if(id==='enhancingSurge')return{ok:true,target:t.id,effect:{tempHp:'1d6',nextDamage:'1d6',fortifyingDice:cost,savageDice:cost,swift:cost>=2,resistanceAll:cost>=3,durationRounds:1},message:'🧠 Усиливающий импульс применён.'};
    if(id==='telekineticForce')return{ok:true,target:t.id,effect:{save:'str',damage:(1+cost)+'d10 bludgeoning',forcedMoveFt:5+10*cost,prone:true,restrained:cost>=2,zoneRadiusFt:cost>=1?5*Math.pow(2,Math.min(2,cost)):0},message:'🧠 Телекинетическая сила применена.'};
    if(id==='telepathicIntrusion')return{ok:true,target:t.id,effect:{save:ctx.intSave?'int':'wis',damage:(1+cost)+'d8 psychic',disadvantageAgainstSelf:true,frightened:cost>=1,stunned:cost>=3,durationRounds:1},message:'🧠 Телепатическое вторжение применено.'};
    if(id==='phaseRift')return{ok:true,effect:{teleportFt:Math.max(10,Number(ctx.distance)||10),straightLine:true,damage:'1d8 force',save:'dex',passesThroughCreatures:true,durationRounds:1},message:'🌀 Фазовый разрыв активирован.'};
    if(id==='elementalBlast')return{ok:true,target:t.id,effect:{attackRoll:true,damage:(1+cost)+'d8 '+(ctx.element||'fire')},message:'⚡ Элементальный взрыв.'};
    if(id==='astralConstruct'){s.astralConstruct={active:true,concentration:true};return{ok:true,effect:{summon:'astralConstruct',durationRounds:10,rangeFt:60,attack:'1d8 force',commands:['Удар','Перемещение','Уплотнение','Захват','Рост','Копия','Поддержание']},message:'🜁 Астральная конструкция создана.'};}
    if(id==='projectItem'){s.projectedItems=(s.projectedItems||[]);s.projectedItems.push({createdAt:Date.now()});return{ok:true,effect:{createProjectedItem:true,maxSizeFt:3,maxWeightLb:10,durationRounds:10},message:'🜁 Предмет спроецирован.'};}
    if(id==='seeing')return{ok:true,effect:{advantageNextD20:true,foresight:true},message:'👁️ Видение применено.'};
    if(id==='denial')return{ok:true,target:t.id,effect:{save:'cha',endEffectPowerUpTo:Math.max(1,cost)},message:'🛑 Нейтрализация применена.'};
    if(id==='mindLeech')return{ok:true,target:t.id,effect:{save:'wis',damage:Math.max(1,cost)+'d8 psychic',healSelf:'halfDamage',restorePsiOnKill:1},message:'🩸 Пиявка разума применена.'};
    return{ok:false,unsupported:true};
  }
  function usePsion(h,id,ctx,feature){
    syncPsion(h);ctx=ctx||{};
    var aliases={psionicPower:'psiMastery',mindThrust:'telepathicIntrusion',telekineticPush:'telekineticForce',forceSurge:'elementalBlast',mentalConstruct:'astralConstruct'};id=aliases[id]||id;
    var l=lvl(h,'Psion'),s=st(h),t=target(ctx);
    if(id==='chooseArchetype'){var a=String(ctx.archetype||'');var amap={awakened:'telepathy',unleashed:'telekinesis',transcended:'enhancement',shaper:'projection',wandering:'transposition',elemental:'psychokinetics',consuming:'consumption'};if(!amap[a]||!psionDisciplines[amap[a]])return{ok:false,message:'Неизвестный архетип.'};s.psionArchetype=a;s.psionDisciplines=[amap[a]];return{ok:true,message:'🧠 Архетип Псионика выбран.'};}
    if(id==='chooseDiscipline'){var d=String(ctx.discipline||'');if(!psionDisciplines[d])return{ok:false,message:'Неизвестная дисциплина.'};if(l<3)return{ok:false,message:'Вторая дисциплина доступна с 3 уровня.'};s.psionDisciplines=s.psionDisciplines||[];if(s.psionDisciplines.indexOf(d)>=0)return{ok:false,message:'Эта дисциплина уже изучена.'};if(s.psionDisciplines.length>=(l>=18?3:2))return{ok:false,message:'Достигнут предел дисциплин.'};s.psionDisciplines.push(d);return{ok:true,message:'🧠 Дисциплина изучена: '+psionDisciplines[d].name+'.'};}
    if(id==='chooseTalent'){var tal=String(ctx.talent||'');if(!tal)return{ok:false,message:'Выбери псионический талант.'};if((s.psionTalents||[]).indexOf(tal)>=0)return{ok:false,message:'Этот талант уже выбран.'};if((s.psionTalents||[]).length>=s.psionTalentsKnown)return{ok:false,message:'Все доступные таланты уже выбраны.'};s.psionTalents.push(tal);return{ok:true,message:'🧠 Псионический талант выбран.'};}
    if(id==='chooseInnateSpell'){var sl=Number(ctx.spellLevel),req={6:11,7:13,8:15,9:17}[sl],spell=String(ctx.spell||'');if(!req||l<req)return{ok:false,message:'Врождённое заклинание этого уровня ещё недоступно.'};var list=(global.psionProgression&&global.psionProgression.spellLists&&global.psionProgression.spellLists[sl])||[];if(list.indexOf(spell)<0)return{ok:false,message:'Выбранного заклинания нет в списке Псионика этого уровня.'};if(s.psionInnateChoices[sl])return{ok:false,message:'Этот уровень уже выбран.'};s.psionInnateChoices[sl]=spell;return{ok:true,message:'🧠 Врождённое заклинание выбрано.'};}
    if(id==='startTurn')return psionStartTurn(h,ctx);
    if(id==='endTurn'){s.psionMasteryUsed=0;s.psionMasteryTurnKey=null;return{ok:true,freePsiLost:true,message:'🧠 Неиспользованные временные очки пси потеряны.'};}
    if(id==='usePsi')return psionSpend(h,ctx.psi,false,ctx);
    if(['enhancingSurge','telekineticForce','telepathicIntrusion','phaseRift','elementalBlast','astralConstruct','projectItem','seeing','denial','mindLeech'].indexOf(id)>=0)return psionPower(h,id,ctx);
    if(id==='psiMastery')return{ok:true,effect:{freePsiPerTurn:s.psionMasteryFree||0,temporary:true,expires:'endOfTurn'},message:'🧠 Псионическое мастерство готово.'};
    if(id==='innatePsionics'){var sl=Number(ctx.spellLevel),spell=s.psionInnateChoices[sl]||ctx.spell;if(!spell)return{ok:false,message:'Сначала выбери заклинание этого уровня.'};if(s.psionInnateUsed&&s.psionInnateUsed[sl])return{ok:false,message:'Врождённая способность этого уровня уже использована до долгого отдыха.'};s.psionInnateUsed=s.psionInnateUsed||{};s.psionInnateUsed[sl]=true;return{ok:true,effect:{castSpell:spell,spellLevel:sl,components:'обычные компоненты'},message:'🧠 Врождённая псионика применена.'};}
    if(id==='fullAwakening'){if(l<14)return{ok:false,message:'Доступно с 14 уровня.'};var p=psionSpend(h,2,false,ctx);if(!p.ok)return p;return{ok:true,effect:{advantageAttackRolls:true,advantageSavingThrows:true,durationRounds:1},message:'🧠 Полное пробуждение.'};}
    if(id==='rampage'){if(l<3)return{ok:false,message:'Доступно с 3 уровня.'};var ds=['d4','d6','d8','d10','d12'];s.rampageDie=ctx.dealtDamage?(ds[Math.min(4,Math.max(0,ds.indexOf(s.rampageDie||'d4')+1))]):'d4';return{ok:true,effect:{bonusDamageDie:s.rampageDie},message:'💥 Куб ярости: '+s.rampageDie+'.'};}
    if(id==='unstoppableRampage'){if(l<14)return{ok:false,message:'Доступно с 14 уровня.'};var rr=psionSpend(h,ctx.psi||0,false,ctx);if(!rr.ok)return rr;return{ok:true,effect:{zeroHpSave:'rampageDie+CON',restoreHP:1,extraRampageDie:rr.spent},message:'💥 Неудержимое неистовство.'};}
    if(id==='mindOverMatter'){var mm=psionSpend(h,2,false,ctx);if(!mm.ok)return mm;return{ok:true,effect:{replacePhysicalSaveWith:'int'},message:'🧠 Разум выше материи.'};}
    if(id==='astralGuardian'){var ag=psionSpend(h,1,false,ctx);if(!ag.ok)return ag;return{ok:true,effect:{redirectDamageToConstruct:true},message:'🛡️ Астральный страж.'};}
    if(id==='planeswalker')return{ok:true,effect:{freeSpells:['Телепортация','Планарный переход'],recharge:'long'},message:'🌀 Путешественник планов готов.'};
    if(id==='ascension'){if(l<20)return{ok:false,message:'Вознесение доступно с 20 уровня.'};s.ascended=true;return{ok:true,effect:{becomeGhost:true,retainMentalStats:true,classAbilities:true,minPsi:10,noRest:true},message:'👻 Вознесение активировано.'};}
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Эта способность Псионика зарегистрирована, но для неё требуется общий resolver.'};
  }
  function psionAttack(h,ctx){
    syncPsion(h);var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};
    if(s.empoweredPsionics&&['awakened','unleashed','elemental','consuming'].indexOf(s.psionArchetype)>=0&&ctx&&ctx.psionicDamage)o.bonusDamage+=mod(h,'intelligence');
    if(s.psionArchetype==='shaper'&&ctx&&ctx.astralConstructDamage&&lvl(h,'Psion')>=6)o.bonusDamage+=mod(h,'intelligence');
    if(s.psionArchetype==='unleashed'&&s.rampageDie&&ctx&&ctx.damageRoll)o.extraDice.push(s.rampageDie);
    if(s.psionArchetype==='consuming'&&ctx&&ctx.psychicDamage)o.notes.push('Поглощение: Пиявка разума может получить заряд.');
    if(s.psionArchetype==='wandering'&&s.phaseRiftUsedThisTurn)o.advantage=true;
    return o;
  }

function warlordRollDie(sides){var n=parseInt(String(sides||'8').replace(/[^0-9]/g,''),10)||8;return 1+Math.floor(Math.random()*n);} function warlordDice(l){return l>=17?7:l>=13?6:l>=9?5:l>=5?4:3;}
  function warlordDie(l){return l>=17?'d10':l>=11?'d8':l>=5?'d6':'d4';}
  function warlordDice(l){return l>=17?5:l>=11?4:l>=5?3:l>=2?2:0;}
  function warlordExploitKnown(l){return l>=17?10:l>=13?8:l>=11?7:l>=9?6:l>=7?5:l>=5?4:2;}
  function warlordLeadership(h){var s=st(h),x=s.warlordLeadership||'cha';return x==='int'?'int':x==='wis'?'wis':'cha';}
  function warlordDC(h){return 8+(Number(h.proficiencyBonus)||2)+mod(h,warlordLeadership(h));}
  function syncWarlord(h){
    var l=Math.max(lvl(h,'Warlord'),lvl(h,'Военачальник'));if(!l)return;
    var s=st(h),r=res(h,'warlordExploitDice',warlordDice(l),'short');
    r.max=warlordDice(l);r.die=warlordDie(l);
    var iw=res(h,'warlordInspiringWord',Math.min(7,Math.max(3,Math.floor((l+2)/3))),'short');
    iw.max=l>=17?7:l>=13?6:l>=9?5:l>=8?5:l>=4?4:3;
    s.warlordExploitKnown=warlordExploitKnown(l);
    s.warlordSaveDC=warlordDC(h);
    s.warlordLeadership=s.warlordLeadership||'cha';
    s.warlordRallyUses=l>=17?3:l>=13?2:1;
    res(h,'warlordRally',s.warlordRallyUses,'short');
  }
  function useWarlord(h,id,ctx,feature){
    syncWarlord(h);ctx=ctx||{};var l=Math.max(lvl(h,'Warlord'),lvl(h,'Военачальник')),s=st(h),t=target(ctx),lead=warlordLeadership(h),die=(h.resources&&h.resources.warlordExploitDice&&h.resources.warlordExploitDice.die)||warlordDie(l);
    if(id==='leadershipStyle'){
      var x=String(ctx.style||'');if(['cha','wis','int'].indexOf(x)<0)return{ok:false,message:'Выбери Капитана, Наставника или Стратега.'};
      s.warlordLeadership=x;return{ok:true,effect:{leadershipAbility:x},message:'🎖️ Стиль лидерства выбран.'};
    }
    if(id==='inspiringWord'){
      if(!t)return{ok:false,message:'Выбери союзника.'};
      if(!spend(h,'warlordInspiringWord',1))return{ok:false,message:'Вдохновляющее слово уже использовано до отдыха.'};
      var heal=warlordRollDie(ctx.hitDie||'d8')+mod(h,lead);
      return{ok:true,target:t.id,effect:{heal:Math.max(1,heal),rangeFt:l>=11?60:30},message:'📣 Вдохновляющее слово: '+Math.max(1,heal)+' HP.'};
    }
    if(id==='rallyingCry'){
      if(!t)return{ok:false,message:'Выбери союзника, провалившего спасбросок.'};
      if(!spend(h,'warlordRally',1))return{ok:false,message:'Боевой клич уже использован до отдыха.'};
      return{ok:true,target:t.id,effect:{rerollSave:true,addToRoll:mod(h,lead),rangeFt:l>=11?60:30},message:'📣 Боевой клич: спасбросок можно перебросить.'};
    }
    if(id==='tacticalSkill'){
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет кубов Tactical Exploit.'};
      return{ok:true,effect:{addDie:die,abilityCheck:true},message:'🎯 Тактический навык: + '+die+'.'};
    }
    if(id==='attackOrder'){
      if(!t)return{ok:false,message:'Выбери союзника.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{reactionAttack:true},message:'⚔️ Приказ к атаке: союзник атакует реакцией.'};
    }
    if(id==='maneuveringOrder'){
      if(!t)return{ok:false,message:'Выбери союзника.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{reactionMoveFt:'speed',noOpportunityAttacks:true},message:'🏃 Манёвренный приказ: союзник перемещается без провоцирования.'};
    }
    if(id==='supportOrder'){
      if(!t)return{ok:false,message:'Выбери союзника.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{reactionAction:['help','hide','search','useObject']},message:'🛡️ Приказ поддержки: союзник немедленно выполняет действие.'};
    }
    if(id==='parry'){
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,effect:{acBonus:die,reaction:true},message:'🛡️ Парирование: +'+die+' к AC против атаки.'};
    }
    if(id==='tauntingStrike'){
      if(!t)return{ok:false,message:'Выбери врага.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{bonusDamage:die,disadvantageAgainstOthers:true},message:'😈 Провоцирующий удар.'};
    }
    if(id==='heroicWill'){
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,effect:{addDie:die,saves:['int','wis','cha']},message:'🛡️ Героическая воля: +'+die+' к спасброску.'};
    }
    if(id==='defensiveOrder'){
      if(!t)return{ok:false,message:'Выбери союзника.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{dodge:true},message:'🛡️ Оборонительный приказ.'};
    }
    if(id==='heroicOrder'){
      if(l<13||!t)return{ok:false,message:'Героический приказ доступен с 13 уровня.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{resistanceAll:true,advantageAllD20:true,durationRounds:1},message:'👑 Героический приказ.'};
    }
    if(id==='revitalizingOrder'){
      if(l<13||!t)return{ok:false,message:'Выбери союзника, погибшего не более минуты назад.'};
      if(ctx.deadWithinSeconds!==undefined&&Number(ctx.deadWithinSeconds)>60)return{ok:false,message:'Прошло больше минуты с момента смерти.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{reviveHp:l+mod(h,lead),standUp:true},message:'✨ Оживляющий приказ.'};
    }
    if(id==='victorySurge'){
      if(l<13||!t)return{ok:false,message:'Выбери союзника.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,target:t.id,effect:{reactionMove:'full',reactionAction:true},message:'⚔️ Натиск победы.'};
    }
    if(id==='finalStrike'){
      if(l<17)return{ok:false,message:'Финальный удар доступен с 17 уровня.'};
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Exploit.'};
      return{ok:true,effect:{allyCount:Math.max(1,mod(h,lead)),attackAction:true,spellLevelMax:5},message:'🔥 Финальный удар: союзники немедленно атакуют одну цель.'};
    }
    if(id==='unwaveringWill')return{ok:true,effect:{advantageAgainst:['charmed','frightened','stunned']},message:'🛡️ Непоколебимая воля активна.'};
    if(id==='tacticalSuperiority')return{ok:true,effect:{restoreOnInitiative:['warlordInspiringWord','warlordRally'],rangeMultiplier:2},message:'🎖️ Тактическое превосходство.'};
    if(id==='dauntless')return{ok:true,effect:{rallyUnlimited:true,inspiringWordMaxHeal:true},message:'👑 Неустрашимый командир.'};
        var fightingStyleEffects={
      archery:{rangedAttackBonus:1,ignoreHalfCover:true},brawling:{unarmedDamage:'1d6+strength',freeHandBonusAction:['unarmed','shove','grapple']},
      mariner:{swimSpeed:'walking',acBonus:1,noUnderwaterDrawbacks:true},mountaineer:{climbSpeed:'walking',acBonus:1,fallDamageReduction:'2*level'},
      shieldWarrior:{shieldMartial:true,shieldDamage:'2d4',soloShieldAC:1,shieldAttackBonus:1},strongbow:{useStrengthWithBows:true,bowDamageBonus:1},
      versatileFightingAdvanced:{versatileAttackBonus:1,bonusAction:['grapple','shove','useObject']}
    };
    if(fightingStyleEffects[id])return{ok:true,effect:fightingStyleEffects[id],message:'⚔️ Стиль боя активен.'};
var academy=String(s.warlordAcademy||'');
    var academyEffects={
      knighthood:{proficiency:['martialWeapons'],skills:['history','performance','religion']},inspiringShout:{initiativeTempHp:'exploitDie+leadership'},
      leadTheCharge:{bonusActionOrder:'attackOrder'},flamesOfHope:{alliesTempHp:'exploitDie+leadership',enemiesFrightened:true},paragonOfChivalry:{immune:['charmed','frightened'],allySaveAdvantage:['charmed','frightened']},
      darkCaptain:{proficiency:['martialWeapons','intimidation'],leadershipForIntimidation:true},dreadPresence:{frightened:true},merciless:{freeExploits:['intimidatingCommand','menacingShout']},ruthlessCommand:{advantageAgainstFrightened:true},dreadlord:{immune:['frightened'],bonusAttackVsFrightened:'leadership'},balefulPresence:{frightenedSaveDisadvantage:true},
      predatoryInstinct:{proficiency:['martialWeapons','perception_or_survival']},packleader:{markPrey:true,uses:'leadership'},silentStalker:{stealthAdvantage:true,normalPaceStealth:true},thrillOfTheHunt:{onPreyDeath:['tempHp','restoreInspiringWord','restoreExploitDie']},apexPredator:{speedBonus:10,preyDamage:'exploitDie'},
      gallantSpellcasting:{spellcasting:true,leadershipBased:true},warriorPoet:{instruments:2,performance:true},heroicCharge:{initiativeDash:true},songsOfWarPeace:{bonusActionAttackAfterExploit:true},warsong:{targetedAllyAdvantage:true},mythicVoice:{replaceLowSpellSlotWithInspiringWord:true},
      cheapShot:{dexSave:true,noReactions:true,halfSpeed:true},dastardlyTalents:{proficiency:['deception','disguiseKit','poisonersKit'],leadershipForDeception:true},ruthlessFocus:{freeInsightfulOrder:true,bonusActionDisengageOrHide:true},deviousTactics:{redirectAttack:true},markedForDeath:{nextHitCrit:true},inscrutableMind:{mindReadingImmunity:true},
      advancedTactics:{extraExploitDice:1,extraExploitKnown:true},artOfWar:{proficiency:['history','gamingSets'],doubleProficiency:true},strategicAdjustments:{replaceExploitOnRest:true},brainsOverBrawn:{bonusActionDisengageOrSearch:true},knowYourEnemy:{learnTargetStatistic:true},giftedStrategist:{immuneSurprise:true,initiativeExploit:true},masterTactician:{contingencyPlan:true},
      monstrousMinion:{minion:true,crLimit:'level/3'},ironCommand:{minionRollBonus:'leadership',rangeFt:15},monstrousMenagerie:{minionTypes:['aberration','dragon','giant','ooze','plant','undead']},totalDomination:{minionResistance:'bludgeoning/piercing/slashing',rangeFt:30},
      counselorProtege:{protege:true},invigoratingOrders:{protegeAdvantageAfterExploit:true},exaltedProtege:{protegeUpgrade:true},legendaryTandem:{sharedAdvantage:true},
      coordinatedAssault:{bonusActionSupportOrder:true},saltOfEarth:{bonusHp:3,scalesPerLevel:1,commonPeopleBonus:'exploitDie'},bandTogether:{splitDamage:true},strengthInNumbers:{restoreExploitPerAlly:true},grandRevolutionary:{supportRangeFt:30,targetCount:3},
      parley:{attitudeShift:true},seafarer:{proficiency:['navigatorTools','waterVehicles','perception'],leadershipForChecks:true},navigatorCrew:{crewSize:'leadership'},rallyCrew:{crewSaveBonus:'proficiencyBonus'},firstMate:{crewLeader:true},illustriousAdmiral:{parleyFree:true,crewRangeFt:30},
      keeperOfOrder:{proficiency:['insight_or_investigation'],leadershipForCheck:true,restrainAt0Hp:true},lawsShield:{reactionDefensiveOrder:true,rangeFt:15},halt:{speedZeroSave:true},stalwartDefender:{freeHoldTheLine:true},unerringEye:{detectIllusionAndShapeshifter:true},bastionOfOrder:{freeLawShieldAndHalt:true},highAuthority:{auraHoldTheLine:true,haltRestrains:true},
      anointedMagic:{spellcasting:true,shortRestSlots:true},divineMandate:{proficiency:['religion'],leadershipForReligion:true},channelDivinity:{uses:2,recharge:'short_long'},wordsOfZeal:{maxHeal:true,radiantAttackOrder:true},favoredServant:{castSpellInAttack:true}
    };
    if(academyEffects[id]){
      return{ok:true,effect:academyEffects[id],message:'🎖️ '+(feature&&feature.name||'Особенность академии')+' активна.'};
    }
    var exploitContract={
      eloquentSpeech:{check:['deception','persuasion'],useLeadership:true},
      feint:{save:'wisdom',advantageAgainstTarget:true},firstAid:{heal:'hitDie+constitution',maxDice:'proficiencyBonus'},
      heroicFortitude:{save:['strength','dexterity','constitution']},imposingPresence:{check:['intimidation','persuasion'],useStrength:true},
      riposte:{reactionAttack:true,bonusDamage:die},steadfastOrder:{allySaveBonus:'leadership',saves:['strength','dexterity','constitution']},
      cunningInstinct:{initiativeOrPerception:true},
      crescendoOfViolence:{allyTempHp:'diceSpent+leadership'},defensiveStance:{acBonus:die,endsOnMove:true},
      dirtyHit:{prone:true,noReaction:true,bonusDamage:die},enliveningOrder:{speedBonus:'5*leadership',advantage:['acrobatics','athletics']},
      exposingStrike:{nextAttackAdvantage:true,bonusDamage:die},holdTheLine:{halfCover:true,forcedMovementProtection:true},
      honorDuel:{disadvantageAgainstOthers:true},insightfulOrder:{nextAttackBonus:'leadership'},intimidatingCommand:{command:true},
      menacingShout:{frightened:true},rejuvenatingOrder:{repeatSave:true},resilientOrder:{allySaveBonus:'leadership',saves:['wisdom','charisma','intelligence']},
      surpriseAttack:{reactionAttack:true,advantage:true,bonusDamage:die},wildCharge:{moveAndAttack:true},
      daringRescue:{tempHp:'warlordLevel',reviveTo1:true},inspirationalSpeech:{tempHp:'warlordLevel',wisdomSaveAdvantage:true},
      packTactics:{allyAdvantageAgainstMarkedPrey:true},tacticalReposition:{reactionMove:'speed',noOpportunityAttacks:true},
      perilousGambit:{taunt:true,disadvantageAgainstOthers:true},warCry:{coneWisdomSave:true,frightened:true},standTheFallen:{heal:'diceSpent+leadership',canTarget0Hp:true},
      heroicOrderExploit:{resistanceAll:true,advantageAllD20:true},revitalizingOrderExploit:{reviveHp:'level+leadership'},
      victorySurgeExploit:{reactionMove:'full',reactionAction:true},finalStrikeExploit:{allyCount:'leadership',attackOrSpell:true},subjugateThrall:{charmedHours:8,commandable:true},roguishCharm:{charmedHours:1,rangeFt:10},resilientOrderAdvanced:{allySaveBonus:'leadership',saves:['wisdom','charisma','intelligence']},arrestingStrike:{dexSave:true,halfSpeed:true,bonusDamage:die},disarm:{strSave:true,dropObject:true,bonusDamage:die},lunge:{moveFt:10,bonusDamage:die},precisionStrike:{attackBonus:die},reposition:{switchAlly:true,tempHp:die},advancedRoguishCharm:{charmedHours:1,rangeFt:10},shieldImpact:{damageReduction:'die+strength'},skilledRider:{mountRollBonus:die},streetwise:{leadershipForHistoryInvestigation:true,settlementOnly:true},sweepingStrike:{strOrDexSave:true,prone:true,bonusDamage:die},cripplingStrike:{conSave:true,disableSense:true,bonusDamage:die},glancingBlow:{repeatMissedAttack:true,bonusDamage:die},martialFocus:{advantage:true},redirect:{forceAttackRedirect:true,bonusAttack:die},rendingStrike:{dexSave:true,acReduction:1,bonusDamage:die},ringingStrike:{wisSave:true,minusD4AllD20:true},soothingSpeech:{chaSave:true,attitudeIndifferent:true},forgottenKnowledge:{loreRecall:true},heroicFocus:{speedDouble:true,acBonus:2,advantageDexSave:true,extraAction:true},inciteViolence:{wisSave:true,psychicDamage:'2*die',forcedMeleeReaction:true},recruitInformant:{informant:true},recruitMercenary:{mercenary:true},surveySettlement:{settlementIntel:true},surveyWilderness:{wildernessIntel:true},clandestineSource:{criminalContact:true},equipMilitia:{trainHumanoids:true},expertFocus:{skillBonus:die,durationHours:1},unbreakableExploit:{avoidDeath:true,tempHpPerDie:'2*die'}
    };
    if(exploitContract[id]){
      var ec=exploitContract[id];
      if(!spend(h,'warlordExploitDice',1))return{ok:false,message:'Нет куба Тактического приёма.'};
      return{ok:true,target:t&&t.id,effect:ec,die:die,message:'🎯 Тактический приём выполнен.'};
    }
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Эта особенность Военачальника зарегистрирована, но отдельная UI-команда ещё требует подключения.'};
  }
  function warlordAttack(h,ctx){return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:['Класс использует Leadership modifier: '+warlordLeadership(h)+'.']};}

  function wardenInterruptUses(l){return l>=17?6:l>=13?5:l>=9?4:l>=5?3:0;}
  function wardenMasteryCount(l){return l>=10?4:l>=4?3:2;}
  function syncWarden(h){
    var l=lvl(h,'Warden');if(!l)return;
    var s=st(h),ir=res(h,'wardenInterrupt',wardenInterruptUses(l),'short');
    ir.max=wardenInterruptUses(l);
    s.wardenMasteryCount=wardenMasteryCount(l);
    s.wardenSentinelStand=s.wardenSentinelStand||'stalwartSpirit';
    s.wardenSentinelStrike=s.wardenSentinelStrike||'interdict';
    s.wardenSentinelSoul=s.wardenSentinelSoul||'allSeeing';
    res(h,'wardenFontOfLife',l>=13?2:0,'short');
    res(h,'wardenSurvive',l>=9?1:0,'long');
    res(h,'wardenLegendaryResistance',l>=20?3:0,'long');
    s.wardenGuardianRange=l>=14?10:5;
    s.wardenBloodiedResist=l>=15;
  }
  function wardenSetChoice(h,id,value){
    syncWarden(h);var s=st(h);
    if(id==='sentinelStand'&&['stalwartSpirit','steadfastToughness','towerShield'].indexOf(value)>=0){s.wardenSentinelStand=value;return{ok:true,message:'🛡️ Стойка часового: '+value+'.'};}
    if(id==='sentinelStrike'&&['interdict','shieldSlam','sweep'].indexOf(value)>=0){s.wardenSentinelStrike=value;return{ok:true,message:'⚔️ Удар часового: '+value+'.'};}
    if(id==='sentinelSoul'&&['allSeeing','fortified','unstoppable'].indexOf(value)>=0){s.wardenSentinelSoul=value;return{ok:true,message:'👁️ Душа часового: '+value+'.'};}
    return{ok:false,message:'Недопустимый вариант выбора Стража.'};
  }
  function useWarden(h,id,ctx,feature){
    syncWarden(h);ctx=ctx||{};var l=lvl(h,'Warden'),s=st(h),t=target(ctx),range=s.wardenGuardianRange||5;
    if(id==='sentinelStand')return wardenSetChoice(h,id,ctx.choice||'stalwartSpirit');
    if(id==='sentinelStrike')return wardenSetChoice(h,id,ctx.choice||'interdict');
    if(id==='sentinelSoul')return wardenSetChoice(h,id,ctx.choice||'allSeeing');
    if(id==='guardianBlock'){
      if(!t)return{ok:false,message:'Выбери союзника.'};
      return{ok:true,target:t.id,effect:{guardianTactic:'block',rangeFt:range,acEqualsSelf:true,durationUntilStartOfTurn:true},message:'🛡️ Блок: AC союзника повышен до твоего AC.'};
    }
    if(id==='guardianChallenge'){
      if(!t)return{ok:false,message:'Выбери врага.'};
      s.wardenChallengedTargetId=t.id;
      return{ok:true,target:t.id,effect:{guardianTactic:'challenge',rangeFt:range,disadvantageAgainstOthersWithinFt:range,durationUntilStartOfTurn:true},message:'🎯 Вызов: врагу невыгодно атаковать кого-либо кроме Стража.'};
    }
    if(id==='guardianGrasp'){
      return{ok:true,effect:{guardianTactic:'grasp',emanationFt:range,requiresDisengage:true,durationUntilStartOfTurn:true},message:'⛓️ Захват: враги не могут добровольно отойти без Disengage.'};
    }
    if(id==='interrupt'){
      if(!t)return{ok:false,message:'Выбери врага.'};
      if(!spend(h,'wardenInterrupt',1))return{ok:false,message:'Перехваты больше не осталось.'};
      return{ok:true,target:t.id,effect:{reaction:true,interruptOneAttackOrAbility:true,chooseBeforeRoll:true},message:'✋ Перехват: одна атака или способность врага отменена.'};
    }
    if(id==='fontOfLife'){
      if(!spendResource(h,'wardenFontOfLife'))return{ok:false,message:'Источник жизни уже использован.'};
      return{ok:true,effect:{endCondition:true,conditions:['blinded','charmed','deafened','frightened','paralyzed','poisoned','stunned','restrained'],noAction:true},message:'✨ Источник жизни: состояние снято.'};
    }
    if(id==='survive'){
      if(!spendResource(h,'wardenSurvive'))return{ok:false,message:'Выжить уже использовано до долгого отдыха.'};
      return{ok:true,effect:{setHP:1,healHP:2*l},message:'🛡️ Выжить: вместо 0 HP остаётся 1 HP и восстанавливается '+(2*l)+' HP.'};
    }
    if(id==='legendaryResistance'){
      if(!spendResource(h,'wardenLegendaryResistance'))return{ok:false,message:'Легендарное сопротивление уже использовано.'};
      return{ok:true,effect:{saveSucceeds:true},message:'👑 Легендарное сопротивление: спасбросок считается успешным.'};
    }
    if(id==='sentinelStrikeInterdict'){
      if(s.wardenSentinelStrike!=='interdict')return{ok:false,message:'Выбран другой Удар часового.'};
      if(!spend(h,'wardenInterrupt',1))return{ok:false,message:'Нет использования Перехвата.'};
      return{ok:true,target:t&&t.id,effect:{reaction:true,interruptOneAttackOrAbility:true,bonusMeleeAttack:true,restoreInterruptOnInitiative:true},message:'⚔️ Запрет: Перехват с ответной атакой.'};
    }
    if(id==='sentinelStrikeShieldSlam'){
      if(s.wardenSentinelStrike!=='shieldSlam')return{ok:false,message:'Выбран другой Удар часового.'};
      return{ok:true,target:t&&t.id,effect:{shieldSlam:true,damage:'1d8 + shield AC bonus',oncePerTurn:true},message:'🛡️ Удар щитом.'};
    }
    if(id==='sentinelStrikeSweep'){
      if(s.wardenSentinelStrike!=='sweep')return{ok:false,message:'Выбран другой Удар часового.'};
      return{ok:true,effect:{sweepAttack:true,rangeFt:5},message:'⚔️ Размашистый удар: атака по каждой выбранной цели в пределах 5 футов.'};
    }
    if(id==='stalwartSpirit')return{ok:true,effect:{chooseSavingThrowProficiency:true},message:'🛡️ Стойкий дух: выбери спасбросок для владения.'};
    if(id==='steadfastToughness')return{ok:true,effect:{bonusMaxHP:'constitution modifier + Warden level'},message:'❤️ Несокрушимая стойкость: максимум HP увеличен.'};
    if(id==='towerShield')return{ok:true,effect:{shieldACBonus:l>=10?4:3},message:'🛡️ Башенный щит: усиленный бонус AC.'};
    if(id==='mettle')return{ok:true,effect:{constitutionHalfDamageSuccess:0,constitutionHalfDamageFailure:'half'},message:'💪 Стойкость: успешный Con save от половины урона даёт 0 урона.'};
    if(id==='unyieldingResolve')return{ok:true,effect:{resistanceWhileBloodied:['bludgeoning','piercing','slashing']},message:'🩸 Непоколебимая решимость: сопротивление физическому урону в кровоточащем состоянии.'};
    if(id==='improvedResolve')return{ok:true,effect:{resistanceWhileBloodied:['bludgeoning','piercing','slashing','acid','cold','fire','lightning','poison','thunder']},message:'🩸 Улучшенная решимость: расширенное сопротивление в кровоточащем состоянии.'};
    if(id==='extendedTactics')return{ok:true,effect:{guardianRangeFt:10},message:'📍 Расширенная тактика: радиус тактик 10 футов.'};
    if(id==='sentinelSoulAllSeeing')return{ok:true,effect:{blindsightFt:30},message:'👁️ Всевидящий: blindsight 30 футов.'};
    if(id==='sentinelSoulFortified')return{ok:true,effect:{denyAttackAdvantage:true},message:'🛡️ Укреплённый: атаки не получают преимущество.'};
    if(id==='sentinelSoulUnstoppable')return{ok:true,effect:{moveThroughCreatures:true,knockProneSmaller:true},message:'💥 Неостановимый: проход сквозь существ.'};
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Эта особенность Стража зарегистрирована, но для неё требуется отдельный UI/боевой hook.'};
  }
  function wardenAttack(h,ctx){
    syncWarden(h);var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};
    if(s.wardenChallengedTargetId&&ctx&&ctx.target&&String(s.wardenChallengedTargetId)===String(ctx.target.id))o.notes.push('Guardian Challenge');
    if(s.wardenSentinelSoul==='fortified')o.notes.push('Sentinel Soul: Fortified');
    if(s.wardenBloodiedResist)o.notes.push('Improved Resolve: Bloodied resistance');
    return o;
  }

  function alchemistReagents(l){return 2+2*(l-1);}
  function alchemistPrime(l){return l>=17?5:l>=13?4:l>=9?3:l>=5?2:l>=2?1:0;}
  function alchemistBombDie(l){return l>=17?'4d10':l>=11?'3d10':l>=5?'2d10':'1d10';}
  function alchemistFormulaCount(l){return l>=19?8:l>=16?7:l>=12?6:l>=8?5:l>=2?3:0;}
  function alchemistDC(h){return 8+(Number(h.proficiencyBonus)||2)+mod(h,'intelligence');}
  function syncAlchemist(h){
    var l=lvl(h,'Alchemist');if(!l)return;
    var s=st(h),r=res(h,'alchemistReagents',alchemistReagents(l),'short');
    r.max=alchemistReagents(l);
    s.alchemistBombDie=alchemistBombDie(l);
    s.alchemistPrimeBomb=alchemistPrime(l);
    s.alchemistFormulaCount=alchemistFormulaCount(l);
    s.alchemistFormulae=s.alchemistFormulae||['Teleportation Bomb','Withering Bomb','Guided Explosives'];
    s.alchemistDiscoveries=s.alchemistDiscoveries||[];
    s.alchemistPotions=s.alchemistPotions||[];
    s.alchemistSaveDC=alchemistDC(h);
    s.alchemistPhilosopherStone=l>=20;
  }
  function alchemistSetFormula(h,formula){
    syncAlchemist(h);var s=st(h);
    var allowed=['Teleportation Bomb','Withering Bomb','Nuclear Bomb','Elemental Infusion','Guided Explosives','Precision Explosives','Unconventional Explosives'];
    if(allowed.indexOf(formula)<0)return{ok:false,message:'Неизвестная формула бомбы.'};
    s.alchemistFormulae=s.alchemistFormulae||[];
    if(s.alchemistFormulae.indexOf(formula)<0){
      if(s.alchemistFormulae.length>=alchemistFormulaCount(lvl(h,'Alchemist')))s.alchemistFormulae.shift();
      s.alchemistFormulae.push(formula);
    }
    return{ok:true,message:'🧪 Формула бомбы выбрана: '+formula+'.'};
  }
  function alchemistFormulaEffect(h,formula){
    var s=st(h),dc=s.alchemistSaveDC||alchemistDC(h),die=s.alchemistBombDie;
    var m={
      'Acid Bomb':{type:'acid',die:'d8',save:'dex',effect:'target AC -3 until start of your next turn'},
      'Bramble Bomb':{type:'none',save:'str',effect:'difficult terrain; failed save: Speed 0'},
      'Concussion Bomb':{type:'thunder',save:'con',effect:'push 10 ft'},
      'Cryo Bomb':{type:'cold',die:'d8',save:'con',effect:'target attack rolls -3 until start of your next turn'},
      'Fear Bomb':{type:'psychic',die:'d6',save:'wis',effect:'Frightened until start of your next turn'},
      'Holy Bomb':{type:'radiant',effect:'Fiends and Undead use d12 damage dice'},
      'Impact Bomb':{type:'force',die:'d8',save:'str',effect:'Prone on failed save'},
      'Incendiary Bomb':{type:'fire',die:'d8',save:'dex',effect:'burning area until start of your next turn'},
      'Laughing Gas Bomb':{type:'poison',die:'d8',save:'con',effect:'Poisoned; no verbal spells until start of your next turn'},
      'Lightning Bomb':{type:'lightning',save:'dex',effect:'no Opportunity Attacks until start of your next turn'},
      'Oil Bomb':{type:'none',effect:'flammable oil; next fire damage treats d1-3 as 4'},
      'Paint Bomb':{type:'none',save:'dex',effect:'Invisible condition suppressed; attacks have Advantage'},
      'Prismatic Bomb':{type:'random',save:'random',effect:'random elemental damage and save'},
      'Quiet Bomb':{type:'bludgeoning',effect:'silent; can knock target unconscious at 1 HP'},
      'Seeking Bomb':{type:'fire',effect:'ignores Half and Three-Quarters Cover'},
      'Smoke Bomb':{type:'none',effect:'heavily obscured smoke, radius doubled, 1 minute'},
      'Teleportation Bomb':{type:'none',effect:'teleport to impact; fails beyond 30 ft'},
      'Withering Bomb':{type:'necrotic',die:'d8',save:'con',effect:'saving throws -3 until start of your next turn'}
    };
    var x=m[formula];if(!x)return null;x.saveDC=dc;x.baseDie=die;return x;
  }
  function useAlchemist(h,id,ctx,feature){
    syncAlchemist(h);ctx=ctx||{};var l=lvl(h,'Alchemist'),s=st(h),t=target(ctx),r=h.resources.alchemistReagents;
    if(id==='setFormula')return alchemistSetFormula(h,ctx.formula||'Guided Explosives');
    if(id==='bomb'){
      var prime=Math.max(0,Math.min(Number(ctx.reagents)||0,s.alchemistPrimeBomb));
      if(prime&&!spend(h,'alchemistReagents',prime))return{ok:false,message:'Недостаточно реагентов для Прайм-бомбы.'};
      var damage=alchemistBombDie(l)+(prime?' + '+prime+'d10':'')+' fire';
      return{ok:true,target:t&&t.id,effect:{bomb:true,damage:damage,rangeFt:90,radiusFt:5+5*prime,save:'dex',saveDC:s.alchemistSaveDC,explodesOncePerTurn:true},message:'💣 Бомба: '+damage+'.'};
    }
    if(id==='primeBomb'){
      var n=Math.max(1,Math.min(Number(ctx.reagents)||1,s.alchemistPrimeBomb));
      if(!spend(h,'alchemistReagents',n))return{ok:false,message:'Недостаточно реагентов.'};
      return{ok:true,effect:{extraDamageDice:n+'d10',radiusIncreaseFt:5*n},message:'💥 Прайм-бомба: +'+n+'d10.'};
    }
    if(id==='reagentSynthesis'){
      if(s.alchemistSynthesisUsed)return{ok:false,message:'Синтез реагентов уже использован до долгого отдыха.'};
      s.alchemistSynthesisUsed=true;
      var gain=Math.max(1,mod(h,'intelligence'));r.current=Math.min(r.max,r.current+gain);
      return{ok:true,effect:{restoreReagents:gain},message:'🧪 Синтез: восстановлено '+gain+' реагентов.'};
    }
    if(id==='potionBrew'){
      var cost=Math.max(1,Number(ctx.reagents)||1),name=ctx.potion||'Potion of Healing';
      if(!spend(h,'alchemistReagents',cost))return{ok:false,message:'Недостаточно реагентов.'};
      if(s.alchemistPotions.length>=Math.max(1,mod(h,'intelligence'))){r.current=Math.min(r.max,r.current+cost);return{ok:false,message:'Достигнут лимит приготовленных зелий.'};}
      s.alchemistPotions.push({name:name,reagents:cost});
      return{ok:true,effect:{potion:name,reagents:cost},message:'🧪 Приготовлено зелье: '+name+'.'};
    }
    if(id==='distillPotion'){
      var idx=Number(ctx.index)||0;if(!s.alchemistPotions[idx])return{ok:false,message:'Зелье не найдено.'};
      var p=s.alchemistPotions.splice(idx,1)[0],back=Math.min(Number(p.reagents)||0,r.max-r.current);r.current+=back;
      return{ok:true,effect:{restoreReagents:back},message:'🧪 Зелье перегнано: +'+back+' реагентов.'};
    }
    if(id==='nuclearBomb'){
      if(l<20)return{ok:false,message:'Ядерная бомба доступна только на 20 уровне.'};
      return{ok:true,effect:{damage:'10d10 + 100 force',radiusFt:5280,save:'dex',saveDC:s.alchemistSaveDC},message:'☢️ Ядерная бомба подготовлена.'};
    }
    if(id==='teleportationBomb')return{ok:true,effect:alchemistFormulaEffect(h,'Teleportation Bomb'),message:'🌀 Телепортационная бомба.'};
    if(id==='witheringBomb')return{ok:true,effect:alchemistFormulaEffect(h,'Withering Bomb'),message:'💀 Иссушающая бомба.'};
    var formulaIds={acidBomb:'Acid Bomb',brambleBomb:'Bramble Bomb',concussionBomb:'Concussion Bomb',cryoBomb:'Cryo Bomb',fearBomb:'Fear Bomb',holyBomb:'Holy Bomb',impactBomb:'Impact Bomb',incendiaryBomb:'Incendiary Bomb',laughingGasBomb:'Laughing Gas Bomb',lightningBomb:'Lightning Bomb',oilBomb:'Oil Bomb',paintBomb:'Paint Bomb',prismaticBomb:'Prismatic Bomb',quietBomb:'Quiet Bomb',seekingBomb:'Seeking Bomb',smokeBomb:'Smoke Bomb'};
    if(formulaIds[id])return{ok:true,effect:alchemistFormulaEffect(h,formulaIds[id]),message:'🧪 Формула: '+formulaIds[id]+'.'};
    if(id==='evasion')return{ok:true,effect:{evasion:true},message:'🏃 Уклонение активно.'};
    if(id==='blastCoating')return{ok:true,effect:{bombImmunity:true},message:'🧪 Покрытие взрыва: собственные бомбы не вредят тебе.'};
    if(id==='potionMixologist'){
      if(s.alchemistPotions.length<2)return{ok:false,message:'Нужно два зелья.'};
      var a=s.alchemistPotions.shift(),b=s.alchemistPotions.shift();
      return{ok:true,effect:{mixedPotions:[a.name,b.name],bonusAction:true},message:'🧪 Два зелья объединены.'};
    }
    if(id==='philosophersStone'){
      if(l<20)return{ok:false,message:'Философский камень доступен на 20 уровне.'};
      return{ok:true,effect:{initiativeReagentsTo:6,quickBrewing:true,longevity:true},message:'💎 Философский камень активен.'};
    }
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Эта особенность Алхимика зарегистрирована, но требует отдельного UI/боевого hook.'};
  }
  function alchemistAttack(h,ctx){
    syncAlchemist(h);var s=st(h);
    return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:['Alchemist Bomb DC '+s.alchemistSaveDC,'Bomb '+s.alchemistBombDie]};
  }

  function syncSpellblade(h){var l=lvl(h,'Spellblade');if(!l)return;res(h,'arcaneSurges',Math.max(2,Math.ceil((Number(h.proficiencyBonus)||Math.floor((l-1)/4)+2))), 'short');}

  function target(ctx){return ctx&&ctx.target?ctx.target:null;}
  
  function warlordAttack(h){return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};}

  function useWarden(h,id,ctx,feature){syncWarden(h);var t=target(ctx);if(id==='primalChallenge'){if(!t)return{ok:false,message:'Выбери врага на поле.'};if(!spend(h,'wardenEndurance',1))return{ok:false,message:'Нет костей выносливости.'};st(h).challengedTargetId=t.id;return{ok:true,target:t.id,effect:{marked:true},message:'🌿 Primal Challenge: цель помечена.'};}if(id==='earthshaker'){if(!spend(h,'wardenEndurance',2))return{ok:false,message:'Недостаточно костей выносливости.'};return{ok:true,effect:{aoeRadiusFt:10,damage:'2d6 bludgeoning',save:'str'},message:'🌿 Earthshaker: зона 10 ft подготовлена.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function wardenAttack(h,ctx){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.challengedTargetId&&ctx&&ctx.target&&String(s.challengedTargetId)===String(ctx.target.id)){o.extraDice.push(dieFor(lvl(h,'Warden')));o.notes.push('Primal Challenge');}return o;}

  function useSpellblade(h,id,ctx,feature){syncSpellblade(h);if(id==='spellstrike'){if(!spend(h,'arcaneSurges',1))return{ok:false,message:'Нет доступного арканного рывка.'};st(h).spellstrikePending=true;return{ok:true,effect:{spellstrike:true},message:'⚔️✨ Spellstrike: следующая атака может связать оружие и заклинание.'};}if(id==='arcaneGuard'){st(h).arcaneGuard=true;return{ok:true,effect:{tempHp:5+lvl(h,'Spellblade')},message:'✨ Arcane Guard активирован.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function spellbladeAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.spellstrikePending){o.extraDice.push('2d6');o.notes.push('Spellstrike');s.spellstrikePending=false;}return o;}

  function syncNecromancer(h){var l=lvl(h,'Некромант');if(!l)return;res(h,'charnelTouch',5*l,'long');res(h,'undyingServitude',l>=18?1:0,'long');var t=l>=20?6:l>=17?5:l>=13?4:l>=10?3:l>=7?3:l>=2?2:0;h.necromancerThrallsMax=t;h.necromancerThrallCRTotal=l>=20?4:l>=17?4:l>=13?3:l>=10?2:l>=7?1:l>=2?1:0;}
  function useNecromancer(h,id,ctx,feature){syncNecromancer(h);ctx=ctx||{};var l=lvl(h,'Некромант');if(id==='charnelTouch'){var max=5*Math.max(1,Number(h.proficiencyBonus)||Math.floor((l-1)/4)+2),cost=Math.max(1,Math.min(max,Number(ctx.points)||1));if(!spend(h,'charnelTouch',cost))return{ok:false,message:'Недостаточно энергии Могильного касания.'};return{ok:true,effect:{spellAttack:true,damage:cost+' necrotic',criticalDoubles:true,missRefund:true},message:'☠️ Могильное касание: '+cost+' некротического урона.'};}if(id==='thralls'){return{ok:true,effect:{animateThralls:true,ritualMinutes:10,ritualDuringShortRest:true,rangeFt:30,sharedReaction:true,sharedBonusAction:true,controlWithoutAction:true},message:'☠️ Ритуал неживых слуг: тела в пределах 30 футов могут стать твоими слугами.'};}if(id==='deadSpace'){return{ok:true,effect:{deadSpace:true,capacity:12,containerRequired:true,ritualMinutes:60,ritualDuringShortRest:true},message:'☠️ Мёртвое пространство связано с выбранным предметом.'};}if(id==='darkArcana'){var slot=Math.max(1,Number(ctx.spellLevel)||1),intMod=Math.floor(((Number(h.abilityScores&&h.abilityScores.intelligence||h.stats&&h.stats.int)||10)-10)/2);var roll=0;for(var di=0;di<slot;di++)roll+=1+Math.floor(Math.random()*8);var gain=Math.max(0,intMod)+roll;var r=h.resources&&h.resources.charnelTouch;if(!r)return{ok:false,message:'Ресурс Могильного касания не найден.'};r.current=Math.min(r.max,r.current+gain);return{ok:true,message:'☠️ Тёмная аркана: восстановлено '+gain+' очк.'};}if(id==='animateDead'){return{ok:true,effect:{castSpell:'animate dead',castingTime:'action',corpseTypes:['Small','Medium','non-Undead'],allowedForms:['Skeleton','Spirit','Zombie']},message:'☠️ Оживление мёртвых: Animate Dead доступно действием.'};}if(id==='undyingServitude'){if(!spend(h,'undyingServitude',1))return{ok:false,message:'Неумирающее служение уже использовано.'};return{ok:true,effect:{restoreThrall:true,hitPoints:2*l},message:'☠️ Слуга остаётся при 1 HP и восстанавливает '+(2*l)+' HP.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'☠️ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность зарегистрирована; отдельная механика ещё не добавлена.'};}
  function necromancerAttack(h,ctx){var o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(lvl(h,'Некромант')>=5&&ctx&&ctx.spellAttack&&ctx.critical)o.forceCritical=false;if(lvl(h,'Некромант')>=5&&ctx&&ctx.spellAttack&&ctx.critical){o.notes.push('Критическое колдовство: критическое заклинательное попадание.');}return o;}
  function syncMartyr(h){var l=lvl(h,'Мученик');if(!l)return;res(h,'martyrSpellUses',[0,2,2,3,3,6,6,7,7,9,9,10,10,11,11,12,12,14,14,15,15][l]||2,'long');res(h,'divineRespite',l>=17?10:l>=13?6:3,'long');res(h,'undying',l>=10?1:0,'long');}
  function useMartyr(h,id,ctx,feature){syncMartyr(h);ctx=ctx||{};var l=lvl(h,'Мученик');if(id==='armorOfFaith')return{ok:true,effect:{armoredAC:'10 + Dex + Wis',mediumArmorWisInsteadOfDex:true,shieldAllowed:true},message:'✝️ Доспех веры: выбери среднюю броню или защиту без доспеха.'};if(id==='miraculousHealing'){var dice=Math.max(1,Math.floor(l/2));return{ok:true,effect:{healWithHitDice:true,maxHitDice:dice,addConToEachDie:true,bonusAction:true},message:'✝️ Чудесное исцеление: потрать до '+dice+' КХ и восстанови их результат + Телосложение за каждый.'};}if(id==='reprisal'){var rd=l>=17?'4d6':l>=11?'3d6':l>=5?'2d6':'1d6';return{ok:true,effect:{reaction:true,halveDamage:true,visibleMeleeOnly:true,returnDamage:rd,damageTypeChoice:['radiant','necrotic'],rangeFt:5},message:'✝️ Воздаяние: половина урона отменена, атакующий получает '+rd+' излучения или некротического урона.'};}if(id==='sacrificialStrike'||id==='improvedSacrificialStrike'){var self=l>=11?10:5,dmg=l>=11?20:10;return{ok:true,effect:{bonusAction:true,selfRadiantDamage:self,targetRadiantDamage:dmg,ignoreResistance:true,freeAtLevel17:l>=17},message:'✝️ Жертвенный удар: ты получаешь '+self+' урона, цель — +'+dmg+' излучения.'};}if(id==='sacrificeFoe')return{ok:true,effect:{waiveSacrificeDamage:true},message:'✝️ Жертва врага: добивание жертвой отменяет собственный урон.'};if(id==='divineRespite'){var r=h.resources&&h.resources.divineRespite;if(!spend(h,'divineRespite',1))return{ok:false,message:'Божественная передышка уже использована.'};return{ok:true,effect:{restoreHitDice:r?r.max:3},message:'✝️ Божественная передышка: восстановить до '+(r?r.max:3)+' КХ.'};}if(id==='undying'){if(!spend(h,'undying',1))return{ok:false,message:'Неумирающий уже использован.'};return{ok:true,effect:{setHP:1,triggerMiraculousHealing:true},message:'✝️ Неумирающий: при 0 HP остаться на 1 HP и применить Чудесное исцеление.'};}if(id==='marchUntoDestiny')return{ok:true,passive:true,effect:{immune:['paralyzed','petrified','stunned'],noFoodOrDrink:true},message:'✝️ Шествие к судьбе активно.'};if(id==='finalMartyrdom'){return{ok:true,effect:{durationMinutes:10,damageImmunity:true,conditionImmunity:true,advantageAllD20:true,castWish:true,deathAfterDuration:true},message:'✝️ Последнее мученичество активировано на 10 минут.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✝️ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность зарегистрирована; отдельная механика ещё не добавлена.'};}
  function syncVessel(h){var l=lvl(h,'Сосуд');if(!l)return;var s=st(h),cha=mod(h,'cha');res(h,'vesselMagicSlots',l>=18?4:l>=11?3:2,'short');s.vesselSpiritMantle=!!s.vesselSpiritMantle;s.vesselAspects=s.vesselAspects||[];s.vesselArchon=!!s.vesselArchon;s.vesselStrikeDie=l>=11?'1d10':l>=5?'1d8':'1d6';s.vesselSpellDC=8+(Number(h.proficiencyBonus)||2)+cha;}
  function useVessel(h,id,ctx,feature){syncVessel(h);var l=lvl(h,'Сосуд'),s=st(h),cha=mod(h,'cha');if(id==='spiritMantle'){s.vesselSpiritMantle=!s.vesselSpiritMantle;return{ok:true,message:'✨ Покров духа '+(s.vesselSpiritMantle?'проявлён.':'рассеян.')};}if(id==='iridescentStrike'){if(!s.vesselSpiritMantle)return{ok:false,message:'Иридисцентный удар требует Покров духа.'};return{ok:true,effect:{damage:(s.vesselStrikeDie||'1d6')+' radiant',ability:'cha'},message:'✨ Иридисцентный удар нанесён.'};}if(id==='archonForm'){if(!s.vesselSpiritMantle)return{ok:false,message:'Сначала прояви Покров духа.'};if(!spend(h,'vesselMagicSlots',1))return{ok:false,message:'Нет свободного слота магии Сосуда.'};s.vesselArchon=true;return{ok:true,effect:{tempHp:2*l,durationMinutes:10,freeUse:true},message:'👁️ Форма архонта активирована: '+(2*l)+' временных HP.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Сосуда зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function vesselAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.vesselSpiritMantle)o.notes.push('Покров духа: атаки могут использовать Charisma.');return o;}
  var ACCURSED_CURSES={
    animation:{name:'Проклятие оживления',curseSpells:{2:'shield',5:'skull servant',9:'animate dead',13:'stoneskin',17:'danse macabre'},ailments:['Нежить для обнаружения/изгнания','Половина восстановления КХ']},
    armament:{name:'Проклятие оружия',curseSpells:{2:'wrathful smite',5:'magic weapon',9:'guiding weapon',13:'vampiric weapon',17:'steel wind strike'},ailments:['Помеха атакам не оружием проклятия','Постоянная связь с проклятым оружием']},
    combustion:{name:'Проклятие воспламенения',curseSpells:{2:'burning hands',5:'aganazzars scorcher',9:'fireball',13:'wall of fire',17:'immolation'},ailments:['Слабое свечение','Взрыв при потере концентрации']},
    created:{name:'Проклятие созданного',curseSpells:{2:'cause fear',5:'ward against weapons',9:'lightning bolt',13:'stoneskin',17:'raise dead'},ailments:['Уязвимость к последствиям огня','Помеха социальным проверкам с гуманоидами']},
    immortality:{name:'Проклятие бессмертия',curseSpells:{2:'cure wounds',5:'lesser restoration',9:'revivify',13:'death ward',17:'raise dead'},ailments:['Невозможность лечения чужими заклинаниями','Ограниченное возвращение к жизни']},
    misfortune:{name:'Проклятие несчастья',curseSpells:{2:'bless',5:'enhance ability',9:'bestow blessing',13:'confusion',17:'skill empowerment'},ailments:['Усиленные критические удары по вам','Помеха физическим проверкам']},
    mummification:{name:'Проклятие мумификации',curseSpells:{2:'last rites',5:'dust devil',9:'wall of sand',13:'locate creature',17:'contagion'},ailments:['Дополнительный урон огнём','Помеха в тесных пространствах']},
    petrification:{name:'Проклятие окаменения',curseSpells:{2:'earth tremor',5:'earthbind',9:'meld into stone',13:'stoneskin',17:'transmute rock'},ailments:['Утроенный вес','Нулевая скорость плавания']},
    somnolence:{name:'Проклятие сонливости',curseSpells:{2:'sleep',5:'calm emotions',9:'catnap',13:'hallucinatory terrain',17:'dream'},ailments:['Помеха против истощения/бессознательности','Сон — единственный лёгкий отдых']}
  };
  var ACCURSED_CURSE_FEATURES={
    animation:{boneSpurring:{level:1,action:'action'},calcifyingStrike:{level:1,action:'on-hit'},necromanticSpurs:{level:3,action:'utility'},fractureBurst:{level:3,action:'reaction'},extraAttack:{level:5,action:'passive'},exoskeletonArmor:{level:11,action:'passive'},vitalitySplint:{level:15,action:'action'},spurredArmy:{level:20,action:'action'}},
    armament:{acolyteOfArms:{level:1,action:'choice'},clingingCurse:{level:1,action:'passive'},bondOfBloodthirst:{level:3,action:'on-hit'},voraciousWeapon:{level:3,action:'utility'},extraAttack:{level:5,action:'passive'},fightingStyle:{level:11,action:'choice'},reciprocalRelationship:{level:15,action:'reaction'},curseCombination:{level:20,action:'reaction'},ravenousWeapon:{level:20,action:'passive'}},
    combustion:{humanoidTorch:{level:1,action:'action'},flameBurst:{level:1,action:'action'},ignitingTouch:{level:3,action:'attack'},blastWave:{level:3,action:'choice'},overheat:{level:5,action:'reaction'},calculatedCombustion:{level:11,action:'passive'},whiteHot:{level:15,action:'passive'},ragingInferno:{level:20,action:'passive'}},
    created:{itsAlive:{level:1,action:'reaction'},armedAndAngry:{level:1,action:'passive'},lastLifesMemories:{level:3,action:'choice'},shockingStrike:{level:3,action:'on-hit'},extraAttack:{level:5,action:'passive'},electricCharge:{level:11,action:'passive'},reassembleCorpus:{level:15,action:'utility'},stolenSpark:{level:20,action:'bonus'}},
    immortality:{ageless:{level:1,action:'utility'},undying:{level:1,action:'dawn'},adventuringDiscipline:{level:3,action:'choice'},disciplinaryAdept:{level:5,action:'passive'},sharedImmortality:{level:11,action:'utility'},revert:{level:15,action:'action'},ancientMalediction:{level:20,action:'utility'}},
    misfortune:{playingTheOdds:{level:1,action:'reaction'},unfortunateAccident:{level:1,action:'jinx'},fortuneTwist:{level:3,action:'reaction'},unavoidableAccident:{level:5,action:'passive'},miserableCompany:{level:11,action:'reaction'},fortunateCompany:{level:15,action:'reaction'},sovereignOfFate:{level:20,action:'reaction'}},
    mummification:{preserved:{level:1,action:'passive'},rotFist:{level:1,action:'attack'},tombGuardian:{level:3,action:'passive'},dreadfulGlare:{level:3,action:'action'},terrorAndDecay:{level:5,action:'combo'},necromanticSustainment:{level:11,action:'reaction'},mummyRot:{level:15,action:'on-hit'},mummyLord:{level:20,action:'utility'}},
    petrification:{stoneForm:{level:1,action:'toggle'},livingStatue:{level:1,action:'passive'},mountainsEndurance:{level:3,action:'passive'},rollingBoulder:{level:3,action:'attack'},extraAttack:{level:5,action:'passive'},stoneToFlesh:{level:5,action:'reaction'},quartzForm:{level:11,action:'passive'},rollingAvalanche:{level:15,action:'passive'},diamondForm:{level:20,action:'passive'}},
    somnolence:{sleepwalker:{level:1,action:'passive'},fulminatingFatigue:{level:1,action:'action'},lucidDreaming:{level:3,action:'utility'},sweetDreams:{level:3,action:'action'},nightTerrors:{level:5,action:'action'},deepSleeper:{level:5,action:'passive'},goldenSlumbers:{level:11,action:'reaction'},lucidWaking:{level:15,action:'action'},restAndRecover:{level:20,action:'action'}}
  };
  var ACCURSED_METAMORPHOSES={
    arcaneAnathema:{name:'Арканная анафема',level:2},bolsteringSuppression:{name:'Укрепляющее подавление',level:2},
    enshroudingImprecation:{name:'Покровная инвектива',level:2},fecundAffliction:{name:'Плодовитое поражение',level:2},
    hexArmor:{name:'Доспех сглаза',level:2},hostileBane:{name:'Враждебная кара',level:2},
    scourgeSpeech:{name:'Речь бичевания',level:2},swiftJinx:{name:'Стремительный сглаз',level:2},
    eldritchBane:{name:'Колдовская кара',level:10,requires:'hostileBane'},enervatingJinx:{name:'Истощающий сглаз',level:10,requires:'swiftJinx'},
    hexAura:{name:'Аура сглаза',level:10,requires:'hexArmor'},hexPlate:{name:'Пластина сглаза',level:10,requires:'hexArmor'},
    martialBane:{name:'Воинская кара',level:10,requires:'hostileBane'},mufflingImprecation:{name:'Приглушающая инвектива',level:10,requires:'enshroudingImprecation'},
    sleightingImprecation:{name:'Ловкая инвектива',level:10,requires:'enshroudingImprecation'},prolificAffliction:{name:'Обильное поражение',level:10,requires:'fecundAffliction'},
    scourgeSense:{name:'Чувство бичевания',level:10,requires:'scourgeSpeech'},capaciousAnathema:{name:'Ёмкая анафема',level:10,requires:'arcaneAnathema'},
    obstinateAnathema:{name:'Упрямая анафема',level:10,requires:'arcaneAnathema'},instinctualSuppression:{name:'Инстинктивное подавление',level:10,requires:'bolsteringSuppression'},
    resistantSuppression:{name:'Устойчивое подавление',level:10,requires:'bolsteringSuppression'},scourgeVisage:{name:'Лик бичевания',level:10,requires:'scourgeSpeech'},
    startlingJinx:{name:'Пугающий сглаз',level:10,requires:'swiftJinx'},
    adaptiveMalediction:{name:'Адаптивная маледикция',level:18},cripplingJinx:{name:'Калечащий сглаз',level:18,requires:'enervatingJinx'},
    dispellingAnathema:{name:'Рассеивающая анафема',level:18,requires:'capaciousAnathema'},doublingJinx:{name:'Двойной сглаз',level:18,requires:'enervatingJinx'},
    facileSuppression:{name:'Лёгкое подавление',level:18,requires:'instinctualSuppression'},explosiveBane:{name:'Взрывная кара',level:18,requires:'eldritchBane'},
    hexPhalanx:{name:'Фаланга сглаза',level:18,requires:'hexAura'},hexShield:{name:'Щит сглаза',level:18,requires:'hexAura'},
    immuneSuppression:{name:'Невосприимчивое подавление',level:18,requires:'resistantSuppression'},insidiousImprecation:{name:'Коварная инвектива',level:18,requires:'mufflingImprecation'},
    negatingAnathema:{name:'Отрицающая анафема',level:18,requires:'capaciousAnathema'},scourgeAttunement:{name:'Настройка бичевания',level:18,requires:'scourgeSense'},
    scourgePresence:{name:'Присутствие бичевания',level:18,requires:'scourgeSense'},transferringAffliction:{name:'Передача поражения',level:18,requires:'prolificAffliction'},
    umbralImprecation:{name:'Теневая инвектива',level:18,requires:'mufflingImprecation'},vengefulBane:{name:'Мстительная кара',level:18,requires:'eldritchBane'},
    vileAffliction:{name:'Мерзкое поражение',level:18,requires:'prolificAffliction'}
  };
  function accursedSlotIndex(level){return Math.max(0,Math.min(4,Number(level)||1)-1);}
  function accursedSpellSlotAvailable(h,level){var s=st(h).accursed,idx=accursedSlotIndex(level);return Number(s.slotCurrent&&s.slotCurrent[idx]||0)>0;}
  function spendAccursedSlot(h,level){
    var s=st(h).accursed,idx=accursedSlotIndex(level);
    if(!s.slotCurrent||Number(s.slotCurrent[idx]||0)<=0)return false;
    s.slotCurrent[idx]-=1;syncAccursedResource(h);return true;
  }
  function syncAccursedResource(h){
    var s=st(h).accursed||{},a=s.slotCurrent||[0,0,0,0,0],total=a.reduce(function(x,y){return x+Number(y||0);},0);
    var r=res(h,'accursedSpellSlots',total,'long');r.current=total;r.max=total;r.byLevel=a.slice();return r;
  }
  function accursedAbility(h){var s=st(h),a=String(s.accursed&&s.accursed.curseAbility||s.accursedCurseAbility||'charisma').toLowerCase();return ['intelligence','wisdom','charisma'].indexOf(a)>=0?a:'charisma';}
  function syncAccursed(h){
    var l=lvl(h,'Аккурсд');if(!l)return;
    var s=st(h);s.accursed=s.accursed||{};s.accursed.curseId=s.accursed.curseId||null;s.accursed.curseAbility=accursedAbility(h);
    var prog=global.accursedProgression||{}, known=prog.maledictionMetamorphosesKnown||{};
    s.accursed.maledictionKnown=known[l]||Object.keys(known).filter(function(x){return Number(x)<=l;}).reduce(function(m,x){return Math.max(m,Number(known[x]));},0);
    s.accursed.knownMetamorphoses=Array.isArray(s.accursed.knownMetamorphoses)?s.accursed.knownMetamorphoses:[];
    s.accursed.jinx=s.accursed.jinx||null;s.accursed.ailments=s.accursed.ailments||[];s.accursed.spellsKnown=Array.isArray(s.accursed.spellsKnown)?s.accursed.spellsKnown:[];
    s.accursed.saveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,s.accursed.curseAbility);s.accursed.attackBonus=(Number(h.proficiencyBonus)||2)+mod(h,s.accursed.curseAbility);
    s.accursed.spellSlots=(prog.spellSlots&&prog.spellSlots[l])||[0,0,0,0,0];s.accursed.spellsKnownMax=(prog.spellsKnown&&prog.spellsKnown[l])||0;
    if(!Array.isArray(s.accursed.slotCurrent)||s.accursed.slotCurrent.length!==5||s.accursed.lastSlotLevel!==l){s.accursed.slotCurrent=s.accursed.spellSlots.slice();s.accursed.lastSlotLevel=l;}
    s.accursed.curseSpells=ACCURSED_CURSES[s.accursed.curseId]?ACCURSED_CURSES[s.accursed.curseId].curseSpells:{};
    s.accursed.ailmentList=ACCURSED_CURSES[s.accursed.curseId]?ACCURSED_CURSES[s.accursed.curseId].ailments:[];
    s.accursed.grantedCurseSpells=s.accursed.grantedCurseSpells||{};
    Object.keys(s.accursed.curseSpells).forEach(function(k){
      if(Number(k)<=l){
        var cs=String(s.accursed.curseSpells[k]||'');
        if(cs&&!s.accursed.grantedCurseSpells[cs]){
          if(s.accursed.spellsKnown.indexOf(cs)<0)s.accursed.spellsKnown.push(cs);
          s.accursed.grantedCurseSpells[cs]=true;
        }
      }
    });
    s.accursed.jealousBlight={curseImmunity:l>=7,noReduction:l>=7,agePossessionSleepTransformImmunity:l>=14,noDisadvantage:l>=20};
    s.accursed.extraAttack=l>=5;syncAccursedResource(h);
  }
  function chooseAccursedCurse(h,id){syncAccursed(h);id=String(id||'');if(!ACCURSED_CURSES[id])return{ok:false,message:'Неизвестное завоёванное проклятие.'};var s=st(h).accursed;if(s.curseId&&s.curseId!==id)return{ok:false,message:'Завоёванное проклятие уже выбрано и не может быть заменено через этот выбор.'};s.curseId=id;s.knownMetamorphoses=[];s.ailments=ACCURSED_CURSES[id].ailments.slice();syncAccursed(h);return{ok:true,curse:id,curseName:ACCURSED_CURSES[id].name,message:'🩸 Выбрано завоёванное проклятие: '+ACCURSED_CURSES[id].name+'.'};}
  function chooseAccursedAbility(h,ability){syncAccursed(h);ability=String(ability||'').toLowerCase();if(['intelligence','wisdom','charisma'].indexOf(ability)<0)return{ok:false,message:'Характеристика проклятия: Интеллект, Мудрость или Харизма.'};st(h).accursed.curseAbility=ability;syncAccursed(h);return{ok:true,message:'🩸 Характеристика проклятия выбрана.'};}
  function chooseAccursedMetamorphoses(h,names,replace){
    syncAccursed(h);var s=st(h).accursed,l=lvl(h,'Аккурсд'),arr=Array.isArray(names)?names:[names];
    if(!replace&&arr.length>s.maledictionKnown)return{ok:false,message:'Недостаточно слотов метаморфоз.'};
    var final=replace?s.knownMetamorphoses.slice():[];
    for(var i=0;i<arr.length;i++){var id=String(arr[i]||''),m=ACCURSED_METAMORPHOSES[id];if(!m)return{ok:false,message:'Неизвестная метаморфоза: '+id};if(l<m.level)return{ok:false,message:'Метаморфоза '+m.name+' ещё недоступна.'};if(m.requires&&final.indexOf(m.requires)<0&&s.knownMetamorphoses.indexOf(m.requires)<0)return{ok:false,message:'Сначала нужна: '+m.requires};if(final.indexOf(id)<0)final.push(id);}
    if(!replace)final=arr.slice();s.knownMetamorphoses=final.slice();if(final.indexOf('fecundAffliction')>=0)s.fecundReady=true;return{ok:true,effect:{knownMetamorphoses:final.slice(),count:final.length},message:'🩸 Метаморфозы сохранены.'};
  }
  function accursedDuration(slot){return Number(slot)>=5?'24 hours':Number(slot)===4?'8 hours':Number(slot)===3?'1 hour':Number(slot)===2?'10 minutes':'1 minute';}
  function useAccursed(h,id,ctx,feature){
    syncAccursed(h);ctx=ctx||{};var s=st(h).accursed,t=target(ctx),l=lvl(h,'Аккурсд'),curse=s.curseId,dc=s.saveDC,abilityMod=Math.max(1,mod(h,s.curseAbility));
    if(id==='chooseCurse'||id==='chooseConqueredCurse')return chooseAccursedCurse(h,ctx.curse||ctx.id);
    if(id==='chooseCurseAbility')return chooseAccursedAbility(h,ctx.ability);
    if(id==='chooseMetamorphosis'||id==='metamorphosis')return chooseAccursedMetamorphoses(h,ctx.names||ctx.name,false);
    if(id==='maledictionVersatility')return l<4?{ok:false,message:'Доступно с 4 уровня.'}:{ok:true,effect:{replaceMetamorphosis:true}};
    if(id==='adaptiveMalediction')return l<18?{ok:false,message:'Доступно с 18 уровня.'}:{ok:true,effect:{replaceAnyNon18Metamorphoses:true}};
    if(id==='learnAccursedSpell'){var sp=String(ctx.spell||'');if(!sp)return{ok:false,message:'Укажи заклинание.'};if(s.spellsKnown.indexOf(sp)>=0)return{ok:false,message:'Это заклинание уже известно.'};if(s.spellsKnown.length>=s.spellsKnownMax)return{ok:false,message:'Все ячейки известных заклинаний уже заняты.'};s.spellsKnown.push(sp);return{ok:true,message:'📜 Заклинание Аккурсда изучено.'};}
    if(id==='replaceAccursedSpell'){var old=String(ctx.oldSpell||''),nw=String(ctx.newSpell||'');var oi=s.spellsKnown.indexOf(old);if(oi<0)return{ok:false,message:'Известное заклинание не найдено.'};s.spellsKnown[oi]=nw;return{ok:true,message:'📜 Заклинание заменено.'};}
    if(id==='jinx'){
      if(!t)return{ok:false,message:'Выбери цель для Сглаза.'};
      if(ctx.distanceFt!==undefined&&Number(ctx.distanceFt)>30)return{ok:false,message:'Цель находится дальше 30 футов.'};
      var j=String(ctx.jinx||'abilityCheck'),baseJinx=['abilityCheck','attackAgainstChosenCreature'];
      if(baseJinx.indexOf(j)<0)return{ok:false,message:'Неизвестный вариант Сглаза.'};
      if(ctx.savePassed===true)return{ok:false,message:'Цель сопротивляется Сглазу.'};
      var swift=s.knownMetamorphoses.indexOf('swiftJinx')>=0;
      s.jinx={targetId:t.id,type:j,endsAt:'endNextTurn',maintainable:!swift};
      var opts=['disadvantageNextAbilityCheck','disadvantageNextAttackAgainstChosenCreature'];
      if(s.knownMetamorphoses.indexOf('enervatingJinx')>=0){opts.push('halveNextSpellDamageRoll','halveNextWeaponDamageRoll');}
      if(s.knownMetamorphoses.indexOf('startlingJinx')>=0){opts.push('disadvantageNextFrightSave','disadvantageNextConcentrationSave');}
      if(s.knownMetamorphoses.indexOf('cripplingJinx')>=0){opts.push('disadvantageNextAttack','disadvantageNextSave');}
      return{ok:true,target:t.id,effect:{save:'wis',dc:dc,jinxOptions:opts,durationRounds:1,maxDistanceFt:90,maintainAction:!swift},message:'🩸 Сглаз наложен.'};
    }
    if(id==='afflict'||id==='afflictAilment'){
      if(!t)return{ok:false,message:'Выбери цель для Поражения.'};var slot=Number(ctx.spellLevel)||1;
      var ailment=String(ctx.ailment||'');if(!ailment)return{ok:false,message:'Выбери недуг проклятия.'};
      var fecund=s.knownMetamorphoses.indexOf('fecundAffliction')>=0&&s.fecundReady===true;
      if(!fecund&&!accursedSpellSlotAvailable(h,slot))return{ok:false,message:'Нет ячейки '+slot+' уровня.'};
      if(fecund){s.fecundReady=false;}else if(!spendAccursedSlot(h,slot))return{ok:false,message:'Ячейка уже потрачена.'};
      var targets=Array.isArray(ctx.targets)?ctx.targets:[t];if(s.knownMetamorphoses.indexOf('prolificAffliction')>=0&&slot>1)targets=targets.slice(0,slot);
      return{ok:true,targets:targets.map(function(x){return x.id||x}),effect:{save:'wis',dc:dc,ailment:ailment,duration:accursedDuration(slot),repeatSaveEndTurn:true,endsOnRemoveCurse:true,free:fecund},message:'🩸 Поражение недугом наложено.'};
    }
    if(id==='suppressCurse'){
      var slots=Number(ctx.spellLevel)||1;if(s.knownMetamorphoses.indexOf('facileSuppression')>=0){slots=0;}else if(!accursedSpellSlotAvailable(h,slots))return{ok:false,message:'Нет ячейки '+slots+' уровня.'};
      if(slots&& !spendAccursedSlot(h,slots))return{ok:false,message:'Ячейка уже потрачена.'};
      var chosen=Array.isArray(ctx.ailments)?ctx.ailments:s.ailments.slice();s.suppressed={ailments:chosen,duration:slots?accursedDuration(slots):'until dismissed or death'};
      var eff={suppressAilments:chosen,duration:s.suppressed.duration};if(s.knownMetamorphoses.indexOf('bolsteringSuppression')>=0)eff.tempHp=l+abilityMod;if(s.knownMetamorphoses.indexOf('resistantSuppression')>=0)eff.resistance=ctx.damageType||'chosen';if(s.knownMetamorphoses.indexOf('immuneSuppression')>=0)eff.immunity=ctx.damageType||'chosen';return{ok:true,effect:eff,message:'🛡️ Недуги подавлены.'};
    }
    var cm=ACCURSED_CURSE_FEATURES[curse]&&ACCURSED_CURSE_FEATURES[curse][id];
    if(cm&&l<cm.level)return{ok:false,message:'Особенность доступна с '+cm.level+' уровня.'};
    if(id==='boneSpurring')return{ok:true,effect:{createBoneObject:ctx.objectType||'weapon',maxObjects:Math.max(1,abilityMod),proficiency:true},message:'🦴 Костяной предмет создан.'};
    if(id==='calcifyingStrike')return{ok:true,target:t&&t.id,effect:{save:'con',dc:dc,curse:true,extraDamage:l>=17?'1d10':l>=11?'1d8':l>=5?'1d6':'1d4'},message:'🦴 Кальцинирующий удар подготовлен.'};
    if(id==='fractureBurst')return{ok:true,effect:{radiusFt:l>=17?15:l>=11?10:5,save:'dex',damage:'1d8 piercing',appliesCalcifyingStrike:true},message:'🦴 Всплеск костей.'};
    if(id==='exoskeletonArmor')return{ok:true,effect:{tempHpAtStartTurn:Math.floor(l/2)},message:'🦴 Костяная броня активна.'};
    if(id==='vitalitySplint')return{ok:true,effect:{spendSpellSlot:true,restoreHitDice:'slotLevel'},message:'🦴 Энергия костей возвращает КХ.'};
    if(id==='spurredArmy')return{ok:true,effect:{summon:'skeleton',count:10,duration:'1 hour',rangeFt:60,attackBonus:abilityMod,grappleBonus:abilityMod},message:'🦴 Армия скелетов призвана.'};
    if(id==='clingingCurse')return{ok:true,effect:{weaponTeleportIfDistanceGtFt:20,thrownRange:'20/60'},message:'⚔️ Проклятое оружие возвращается.'};
    if(id==='bondOfBloodthirst')return{ok:true,effect:{extraDamage:'1d6',oncePerTurn:true},message:'⚔️ Кровожадная связь активна.'};
    if(id==='voraciousWeapon')return{ok:true,effect:{consumeMagicMeleeWeapon:true,replaceConsumed:true},message:'⚔️ Оружие поглощено проклятым вооружением.'};
    if(id==='fightingStyle')return{ok:true,effect:{style:ctx.style||'dueling'},message:'⚔️ Боевой стиль выбран.'};
    if(id==='reciprocalRelationship')return{ok:true,effect:{teleportNearTarget:true,range:'rangedCurseWeapon'},message:'⚔️ Взаимная связь активирована.'};
    if(id==='curseCombination')return{ok:true,effect:{extraCurseArmamentAttack:true},message:'⚔️ Комбинация проклятия.'};
    if(id==='humanoidTorch')return{ok:true,effect:{brightLightRadiusFt:20,dimLightAdditionalFt:20},message:'🔥 Внутреннее пламя усилено.'};
    if(id==='flameBurst')return{ok:true,effect:{save:'dex',radiusFt:ctx.radiusFt===10?10:5,damage:(l>=17?4:l>=11?3:l>=5?2:1)+'d8 fire'},message:'🔥 Вспышка пламени.'};
    if(id==='ignitingTouch')return{ok:true,target:t&&t.id,effect:{meleeSpellAttack:true,damage:(l>=17?4:l>=11?3:l>=5?2:1)+'d8+'+abilityMod+' fire'},message:'🔥 Пылающее касание.'};
    if(id==='blastWave')return{ok:true,effect:{radiusBySlot:{1:20,2:30,3:60,4:90,5:120},halfOnSave:true},message:'🔥 Взрывная волна усилена.'};
    if(id==='overheat')return{ok:true,effect:{selfFireDamageUpToLevel:l,damageBonusMultiplier:2},message:'🔥 Перегрев активирован.'};
    if(id==='calculatedCombustion')return{ok:true,effect:{safeAlliesMax:Math.floor(l/2),ignoreHalfDamageOnSave:true},message:'🔥 Рассчитанное воспламенение.'};
    if(id==='whiteHot')return{ok:true,effect:{ignoreResistance:'fire'},message:'🔥 Белое пламя игнорирует сопротивление огню.'};
    if(id==='ragingInferno')return{ok:true,effect:{extraDamage:'2d8 fire',overheatIgnoresImmunity:true},message:'🔥 Бушующий инферно.'};
    if(id==='itsAlive')return{ok:true,effect:{preventDropToZero:true,setHp:1,tempHp:5*l,burstRadiusFt:5,burstDamage:5*l+' lightning',recharge:'fullHp'},message:'⚡ Оно живо.'};
    if(id==='shockingStrike')return{ok:true,target:t&&t.id,effect:{extraDamage:'1d12 lightning',ifStolenSpark:true,oncePerTurn:true,disadvantageAttacksExceptSelfUntilEndNextTurn:true},message:'⚡ Разрядный удар.'};
    if(id==='electricCharge')return{ok:true,effect:{resistance:'lightning',tempHpFromLightningDamage:true,maxSpendTempHp:Math.floor(l/2)},message:'⚡ Электрический заряд.'};
    if(id==='reassembleCorpus')return{ok:true,effect:{maxStrDexCon:22,longRestRedistribute:2},message:'⚡ Корпус восстановлен.'};
    if(id==='stolenSpark')return{ok:true,effect:{duration:'1 minute',shockingStrikeDamage:'1d12 lightning',startTurnHeal:5,tempHp:10,bonusStrDexConRolls:1,recharge:'long',refreshByItsAlive:true},message:'⚡ Искра жизни захвачена.'};
    if(id==='ageless')return{ok:true,effect:{noAging:true,immuneAging:true,learnCantrip:true,learnLanguage:true,learnMartialWeapon:true,learnSkill:true,learnTool:true},message:'♾️ Вневременность активна.'};
    if(id==='undying')return{ok:true,effect:{reviveAtDawn:true,longRestOnRevive:true,removePoisonDisease:true,deathPenalty:'-1 to attacks/checks/saves until next long rest'},message:'♾️ Бессмертие активно.'};
    if(id==='adventuringDiscipline')return{ok:true,effect:{discipline:ctx.discipline||'warrior'},message:'♾️ Дисциплина приключений выбрана.'};
    if(id==='sharedImmortality')return{ok:true,effect:{grantUndyingToAlly:true,duration:'until revival or next long rest'},message:'♾️ Бессмертие разделено.'};
    if(id==='revert')return{ok:true,effect:{healHalfMaxHp:true,recharge:'long'},message:'♾️ Возврат формы.'};
    if(id==='ancientMalediction')return{ok:true,effect:{sixthMetamorphosis:true},message:'♾️ Древняя маледикция открыта.'};
    if(id==='unfortunateAccident')return{ok:true,effect:{jinxExtraDamage:l>=17?'4d8':l>=11?'3d8':l>=5?'2d8':'1d8',countsAsHit:true},message:'🎲 Несчастный случай добавлен к Сглазу.'};
    if(id==='playingTheOdds')return{ok:true,target:t&&t.id,effect:{gameOfChance:true,rangeFt:30,advantageOrDisadvantage:ctx.mode||'advantage',arcanaSaveDC:dc},message:'🎲 Вероятность изменена.'};
    if(id==='fortuneTwist')return{ok:true,effect:{rerollType:ctx.rollType||'any',repeatRestriction:'same type until another failure'},message:'🎲 Поворот фортуны.'};
    if(id==='miserableCompany')return{ok:true,target:t&&t.id,effect:{imposeDisadvantage:true,rangeFt:30},message:'🎲 Жалкая компания.'};
    if(id==='fortunateCompany')return{ok:true,target:t&&t.id,effect:{grantAdvantage:true,rangeFt:30},message:'🎲 Удачная компания.'};
    if(id==='sovereignOfFate')return{ok:true,effect:{specialReactionPerOtherCreatureTurn:true,onlyMisfortuneFeatures:true},message:'🎲 Властелин судьбы.'};
    if(id==='rotFist')return{ok:true,target:t&&t.id,effect:{meleeAttack:true,damage:(l>=17?4:l>=11?3:l>=5?2:1)+'d8+'+abilityMod+' necrotic',noHealingUntilStartNextTurn:true},message:'☠️ Гниющий кулак.'};
    if(id==='dreadfulGlare')return{ok:true,target:t&&t.id,effect:{save:'wis',dc:dc,frightenedUntilEndNextTurn:true,immunity24hOnSave:true},message:'☠️ Ужасающий взгляд.'};
    if(id==='necromanticSustainment')return{ok:true,effect:{preventExhaustion:true,usesPerLongRest:Number(h.proficiencyBonus)||2},message:'☠️ Некромантическое поддержание.'};
    if(id==='mummyRot')return{ok:true,target:t&&t.id,effect:{save:'con',permanentCurse:true,noHealing:true,startTurnDamage:'1d6 necrotic',maxHpReductionOnNecrotic:true,remove:'remove curse',recharge:'long or 3rd-level slot'},message:'☠️ Мумийная гниль.'};
    if(id==='mummyLord')return{ok:true,effect:{resistance:['necrotic','poison'],glareParalyzeOnFailBy5:true,heartPhylactery:true,reviveNearHeartAfterHours:24},message:'☠️ Повелитель мумий.'};
    if(id==='stoneForm')return{ok:true,effect:{stoneFormToggle:true,nonmagicalDamageReduction:l>=20?5:l>=15?4:l>=10?3:l>=5?2:1,slamDamage:'1d10+STR',slamMagical:l>=6},message:'🪨 Каменная форма.'};
    if(id==='rollingBoulder')return{ok:true,target:t&&t.id,effect:{moveStraightFt:15,extraDamage:l>=17?'3d10':l>=11?'2d10':'1d10',save:'str',knockProne:true},message:'🪨 Катящийся валун.'};
    if(id==='stoneToFlesh')return{ok:true,effect:{endExternalPetrificationAfter:l>=20?'next turn':l>=11?'1 minute':'10 minutes'},message:'🪨 Плоть возвращается.'};
    if(id==='quartzForm')return{ok:true,effect:{stoneReductionAppliesToMagic:true,exceptPsychic:true,pushProneSaveBonus:abilityMod},message:'🪨 Кварцевая форма.'};
    if(id==='rollingAvalanche')return{ok:true,effect:{moveThroughProneCreatures:true,repeatRollingBoulderOnSuccessfulProne:true},message:'🪨 Лавина.'};
    if(id==='diamondForm')return{ok:true,effect:{resistanceAllExceptPsychic:true,noAging:true,holdBreathIndefinite:true},message:'💎 Алмазная форма.'};
    if(id==='fulminatingFatigue')return{ok:true,target:t&&t.id,effect:{save:'con',fatigue:l>=17?'4d10':l>=11?'3d10':l>=5?'2d10':'1d10',penaltyPerFatigue:-1,unconsciousAtFatigueGteCurrentHp:true},message:'😴 Накоплена усталость.'};
    if(id==='lucidDreaming')return{ok:true,effect:{learnAnyCastableSpell:true,forgetAfterCast:true,knownCount:l>=11?3:l>=5?2:1},message:'😴 Осознанный сон.'};
    if(id==='sweetDreams')return{ok:true,effect:{relaxationLevels:'1 per uninterrupted long rest',max:Number(h.proficiencyBonus)||2,benefits:['+1 checks/saves per hour','heal 5 per level','recover spell slot equal to levels']},message:'😴 Сладкие сны.'};
    if(id==='nightTerrors')return{ok:true,target:t&&t.id,effect:{damage:l>=17?'4d8':l>=11?'3d8':'2d8 psychic',unconsciousOrStunnedOnly:true},message:'😴 Ночные кошмары.'};
    if(id==='goldenSlumbers')return{ok:true,effect:{sleepUntilStartNextTurnOrDamage:true,resistanceAllExceptPsychic:true,tempHpOnWake:Math.floor(l/2)},message:'😴 Золотой сон.'};
    if(id==='lucidWaking')return{ok:true,effect:{castLucidSpellFree:true,recharge:'long'},message:'😴 Осознанное пробуждение.'};
    if(id==='restAndRecover')return{ok:true,effect:{sleep:true,resistanceAllExceptPsychic:true,gainRelaxationPerTurn:1,targetsFatigueRadiusFt:30,nightTerrorsWhileAsleep:true,recharge:'short or long'},message:'😴 Отдых и восстановление.'};
    if(id==='maledictionPassive')return{ok:true,effect:{curseImmunity:s.jealousBlight},message:'🩸 Ревнивый морок активен.'};
    var m=ACCURSED_METAMORPHOSES[id];
    if(m){
      if(l<m.level)return{ok:false,message:'Метаморфоза ещё недоступна.'};
      if(m.requires&&s.knownMetamorphoses.indexOf(m.requires)<0)return{ok:false,message:'Не выполнено требование: '+m.requires};
      var me={id:id,name:m.name};
      if(id==='arcaneAnathema')me.effect={curseAbilityCheckDC:'10+2×spellLevel',action:'endOneSpellOnTouch'};
      else if(id==='bolsteringSuppression')me.effect={tempHp:l+abilityMod};
      else if(id==='enshroudingImprecation')me.effect={hideBonusAction:true,hideInDimDark:true};
      else if(id==='fecundAffliction')me.effect={freeAfflict:true,duration:'1 minute',recharge:'short/long'};
      else if(id==='hexArmor')me.effect={minimumAC:'13+curseAbilityMod'};
      else if(id==='hostileBane'||id==='martialBane')me.effect={extraNecrotic:abilityMod,oncePerTurn:true};
      else if(id==='scourgeSpeech')me.effect={intimidationPersuasionBonus:abilityMod};
      else if(id==='swiftJinx')me.effect={jinxBonusAction:true,noMaintainAction:true};
      else if(id==='eldritchBane')me.effect={nonAttackAccursedDamageBonus:abilityMod};
      else if(id==='enervatingJinx')me.effect={nextSpellOrWeaponDamageDisadvantage:true,usesPerLongRest:Number(h.proficiencyBonus)||2};
      else if(id==='hexAura')me.effect={reactionCastHexOnDamager:true,rangeFt:30};
      else if(id==='hexPlate')me.effect={minimumAC:'16+curseAbilityMod'};
      else if(id==='prolificAffliction')me.effect={extraTargetPerSlotAbove1:true,duration:'1 minute'};
      else if(id==='instinctualSuppression')me.effect={reactionSuppressOnInitiative:true,acBonus:4};
      else if(id==='resistantSuppression')me.effect={resistanceChosen:true};
      else if(id==='scourgeSense')me.effect={atWill:['detect evil and good','detect magic'],curseDetection30:true};
      else if(id==='scourgeVisage')me.effect={fearSavePenalty:abilityMod,lieDetectionAutoFail:true};
      else if(id==='mufflingImprecation')me.effect={ignoreVerbalInDimDark:true,stealthBonus:abilityMod};
      else if(id==='sleightingImprecation')me.effect={ignoreSomaticInDimDark:true,sleightBonus:abilityMod,thievesToolsBonus:abilityMod};
      else if(id==='startlingJinx')me.effect={newJinxOptions:['frightSaveDisadvantage','concentrationSaveDisadvantage']};
      else if(id==='capaciousAnathema')me.effect={extraTargets:5,recharge:'short/long'};
      else if(id==='obstinateAnathema')me.effect={actWithArcaneAnathemaWhileDisabled:true};
      else if(id==='adaptiveMalediction')me.effect={replaceAfterShortRest:true,replaceAnyAfterLongRest:true};
      else if(id==='cripplingJinx')me.effect={newJinxOptions:['nextAttackDisadvantage','nextSaveDisadvantage'],perTargetLongRest:true};
      else if(id==='dispellingAnathema')me.effect={freeDispelCaster:true,addProfToAnathema:true,recharge:'long'};
      else if(id==='doublingJinx')me.effect={secondTarget:true};
      else if(id==='facileSuppression')me.effect={atWillSuppress:true,persistent:true};
      else if(id==='explosiveBane')me.effect={extraNecrotic:'1d8',optionalSlotDice:true};
      else if(id==='hexPhalanx')me.effect={allyACBonus:abilityMod,allyStrDexSaveBonus:abilityMod};
      else if(id==='hexShield')me.effect={reactionHalveDamage:true};
      else if(id==='immuneSuppression')me.effect={immunityChosen:true};
      else if(id==='insidiousImprecation')me.effect={disadvantageOnSaveWhenHidden:true};
      else if(id==='negatingAnathema')me.effect={reactionNegateSpellUpTo5:true,abilityCheckHigherSpell:true};
      else if(id==='scourgeAttunement')me.effect={extraCursedAttunement:3};
      else if(id==='scourgePresence')me.effect={bonusActionFear30:true,psychicDamagePerTurn:'2d8'};
      else if(id==='transferringAffliction')me.effect={afflictedDisadvantageEndSave:true,startTurnNecrotic:'1d8'};
      else if(id==='umbralImprecation')me.effect={darkvision60:true,magicalDarkness:true};
      else if(id==='vengefulBane')me.effect={reactionAttackOrSingleTargetSpell:true,extraNecrotic:abilityMod};
      else if(id==='vileAffliction')me.effect={bonusActionAfflict:true,chooseAnyAilments:true};
      else me.effect={implemented:true};
      return{ok:true,effect:me.effect,message:'🩸 '+m.name+' активирована/учтена.'};
    }
    return{ok:false,unsupported:true,message:'Неизвестная способность Аккурсда: '+id};
  }
  function accursedAttack(h,ctx){
    syncAccursed(h);var s=st(h).accursed,o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]},m=mod(h,s.curseAbility);
    if(ctx&&ctx.hit){
      if(s.knownMetamorphoses.indexOf('hostileBane')>=0)o.bonusDamage+=m;
      if(s.knownMetamorphoses.indexOf('martialBane')>=0)o.bonusDamage+=m;
      if(s.knownMetamorphoses.indexOf('eldritchBane')>=0&&!ctx.attack)o.bonusDamage+=m;
      if(s.knownMetamorphoses.indexOf('explosiveBane')>=0)o.extraDice.push('1d8 necrotic');
      if(s.knownMetamorphoses.indexOf('vengefulBane')>=0&&ctx.reaction)o.bonusDamage+=m;
    }
    if(s.knownMetamorphoses.indexOf('hexPlate')>=0)o.minimumAC=16+m;else if(s.knownMetamorphoses.indexOf('hexArmor')>=0)o.minimumAC=13+m;
    return o;
  }
  function syncRuneKeeper(h){var l=lvl(h,'Рунный хранитель');if(!l)return;var s=st(h),n=runeCount(l);s.inscribedRunes=Array.isArray(s.inscribedRunes)?s.inscribedRunes:[];if(s.inscribedRunes.length>n)s.inscribedRunes=s.inscribedRunes.slice(0,n);s.runeStance=s.runeStance||null;s.runeSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'int');}
  function useRuneKeeper(h,id,ctx,feature){syncRuneKeeper(h);ctx=ctx||{};var s=st(h),n=runeCount(lvl(h,'Рунный хранитель')),rt=global.runeKeeperRuntime;
if(id==='inscribeRune'){var name=ctx.rune?String(ctx.rune):'Руна';if(rt&&typeof rt.inscribe==='function'){var ins=rt.inscribe(h,name,ctx.objectId);if(!ins.ok)return{ok:false,message:ins.reason||'Не удалось вписать руну.'};return{ok:true,effect:{objectId:ins.objectId,rune:name},message:'🔷 Руна «'+name+'» вписана.'};}if(s.inscribedRunes.indexOf(name)<0){if(s.inscribedRunes.length>=n)s.inscribedRunes.shift();s.inscribedRunes.push(name);}return{ok:true,message:'🔷 Руна «'+name+'» вписана: '+s.inscribedRunes.length+'/'+n+'.'};}
if(id==='runeStance'){var stance=ctx.stance?String(ctx.stance).toLowerCase():'разрушение';if(['разрушение','защита'].indexOf(stance)<0)return{ok:false,message:'Неизвестная рунная стойка.'};if(rt&&typeof rt.setStance==='function')rt.setStance(h,stance);s.runeStance=stance;return{ok:true,effect:{radiusFt:lvl(h,'Рунный хранитель')>=18?30:10,stance:stance},message:'🔷 Рунная стойка: '+stance+'.'};}
if(id==='invokeRune'){if(rt&&typeof rt.invoke==='function'){if(!ctx.objectId)return{ok:false,message:'Укажи объект с вписанной руной.'};var inv=rt.invoke(h,ctx.objectId);if(!inv.ok)return{ok:false,message:inv.reason||'Руна не может быть призвана.'};return{ok:true,effect:{runeInert:inv.rune,objectId:ctx.objectId},message:'🔷 Руна «'+inv.rune+'» призвана и становится инертной.'};}if(!s.inscribedRunes.length)return{ok:false,message:'Нет вписанных рун.'};var rune=ctx.rune?String(ctx.rune):s.inscribedRunes[0];return{ok:true,effect:{runeInert:rune},message:'🔷 Руна «'+rune+'» призвана и становится инертной.'};}
if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Рунного хранителя зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function runeKeeperAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.runeStance==='Разрушение'&&s.inscribedRunes.length)o.notes.push('Разрушение: дополнительный урон зависит от числа вписанных рун.');return o;}
  function shifterCR(l){var t=[0,0,0.25,0.5,1,1,1,2,2,2,3,3,3,4,4,5,5,5,6,6,6];return t[Math.max(1,Math.min(20,l))]||0;}
  function shifterDie(l){return l>=11?'1d12':l>=5?'1d10':'1d8';}
  function syncShifter(h){var l=lvl(h,'Шифтер');if(!l)return;var s=st(h),con=Math.max(1,mod(h,'con'));res(h,'shifterAdrenaline',Math.max(1,con),'short');res(h,'shifterPrimevalForm',l>=11?3:0,'long');s.shifterMaxCR=shifterCR(l);s.shifterShifted=!!s.shifterShifted;s.shifterBloodline=s.shifterBloodline||'Водная';s.shifterSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'con');s.shifterAttackBonus=(Number(h.proficiencyBonus)||2)+mod(h,'con');}
  function useShifter(h,id,ctx,feature){syncShifter(h);var l=lvl(h,'Шифтер'),s=st(h),t=target(ctx),con=Math.max(1,mod(h,'con'));if(id==='shift'){s.shifterShifted=!s.shifterShifted;return{ok:true,effect:{beastShape:s.shifterShifted,maxCR:s.shifterMaxCR,saveDC:s.shifterSaveDC,attackBonus:s.shifterAttackBonus},message:'🐾 Дикая форма '+(s.shifterShifted?'активирована. Максимальный CR: '+s.shifterMaxCR+'.':'завершена.')};}if(id==='learnShape'){if(!t)return{ok:false,message:'Выбери живого не враждебного зверя для изучения формы.'};if(l<2)return{ok:false,message:'Первобытная связь доступна со 2 уровня.'};return{ok:true,effect:{learnBeastShape:t.id,maxCR:s.shifterMaxCR},message:'🐾 Новая звериная форма изучена.'};}if(id==='adrenalineSurge'){if(!spend(h,'shifterAdrenaline',1))return{ok:false,message:'Нет доступных всплесков адреналина.'};return{ok:true,effect:{tempHp:Number(ctx&&ctx.damage)||0,durationRounds:10},message:'🔥 Всплеск адреналина: получен временный HP, равный полученному урону.'};}if(id==='primalResilience'){if(!spend(h,'shifterAdrenaline',1))return{ok:false,message:'Нет доступного всплеска адреналина.'};return{ok:true,effect:{saveBonus:con},message:'🛡️ Первобытная стойкость: +'+con+' к спасброску.'};}if(id==='primevalForm'){if(!spend(h,'shifterPrimevalForm',1))return{ok:false,message:'Нет доступной Первобытной формы.'};return{ok:true,effect:{primeval:true,resistance:['bludgeoning','piercing','slashing'],strDexSaveAdvantage:true},message:'🐾 Первобытная форма усилена.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🐾 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Шифтера зарегистрирована, но её отдельный эффект ещё не реализован.'};}
  function shifterAttack(h,ctx){var l=lvl(h,'Шифтер'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.shifterShifted&&l>=5){o.notes.push('Дикий воин: звериная форма получает усиленные действия.');}if(l>=5&&ctx&&ctx.naturalWeapon)o.notes.push('Мистические удары: природные атаки считаются магическими.');return o;}
  function savantIntellectDie(l){return l>=17?'d12':l>=13?'d10':l>=9?'d8':l>=5?'d6':'d4';}
  function syncSavant(h){var l=lvl(h,'Савант');if(!l)return;var s=st(h),die=savantIntellectDie(l);s.savantIntellectDie=die;s.savantFocusId=s.savantFocusId||null;s.savantFocusExpires=Number(s.savantFocusExpires)||0;s.savantFocusData=s.savantFocusData||{};s.savantReactions=l>=17?4:l>=11?3:l>=5?2:1;s.savantSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'int');}
  function useSavant(h,id,ctx,feature){syncSavant(h);var l=lvl(h,'Савант'),s=st(h),t=target(ctx),die=s.savantIntellectDie;if(id==='adroitAnalysis'){if(!t)return{ok:false,message:'Выбери видимую цель для анализа.'};s.savantFocusId=t.id;s.savantFocusExpires=10;return{ok:true,target:t.id,effect:{focus:true,focusDurationRounds:10,predictiveDodge:true},message:'🧠 Цель изучена и стала Фокусом.'};}if(id==='potentObservation'){var po=global.savantRuntime&&typeof global.savantRuntime.potentObservation==='function'?global.savantRuntime.potentObservation(h,ctx):null;if(po&&!po.ok)return{ok:false,message:po.reason||'Нет реакции.'};if(!po&&!spend(h,'savantReactions',1))return{ok:false,message:'Нет реакций Саванта.'};return{ok:true,effect:{addDie:die},remaining:po&&po.remaining,message:'🧠 Мощное наблюдение: добавь '+die+' к подходящему броску союзника.'};}if(id==='calculatedFlourish'){var cf=global.savantRuntime&&typeof global.savantRuntime.calculatedFlourish==='function'?global.savantRuntime.calculatedFlourish(h,ctx):null;if(cf&&!cf.ok)return{ok:false,message:cf.reason||'Нет реакции.'};if(!cf&&!spend(h,'savantReactions',1))return{ok:false,message:'Нет реакций Саванта.'};return{ok:true,effect:{acBonusDie:(cf&&cf.die)||die},remaining:cf&&cf.remaining,message:'🧠 Расчётный манёвр: +'+((cf&&cf.die)||die)+' к AC против этой атаки.'};}if(id==='flawlessAnalysis'){if(!t)return{ok:false,message:'Выбери Фокус.'};s.savantFlawlessUsed=s.savantFlawlessUsed||{};if(s.savantFlawlessUsed[t.id])return{ok:false,message:'Безупречный анализ уже использован против этой цели после долгого отдыха.'};s.savantFlawlessUsed[t.id]=true;return{ok:true,target:t.id,effect:{save:'int',focusDebuff:true,allySaveAdvantageFt:30,durationRounds:1},message:'🧠 Безупречный анализ применён.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🧠 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Саванта зарегистрирована, но её отдельный эффект ещё не реализован.'};}
  function savantAttack(h,ctx){var l=lvl(h,'Савант'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.savantFocusId&&ctx&&ctx.target&&String(s.savantFocusId)===String(ctx.target.id)){o.notes.push('Изученная цель: можно использовать Intelligence для атаки и урона.');o.extraDice.push(s.savantIntellectDie||savantIntellectDie(l));}return o;}
  function bloodHunterLvl(h){return lvl(h,'Кровавый охотник');}
  function bloodDie(l){return l>=17?'1d10':l>=11?'1d8':l>=5?'1d6':'1d4';}
  function hemMod(h){var a=h.abilities||{},v=a.int||a.INT||a.intelligence||a.INTELLIGENCE||10,w=a.wis||a.WIS||a.wisdom||a.WISDOM||10;return Math.max(0,Math.floor(((Number(v)>10?Number(v):10)-10)/2));}
  function hemSave(h){return 8+(Number(h.proficiencyBonus)||2)+hemMod(h);}
  function bloodCurseUses(l){return l>=17?4:l>=13?3:l>=6?2:1;}
  function syncBloodHunter(h){
    var l=bloodHunterLvl(h);if(!l)return;
    var s=st(h),d=bloodDie(l);
    var r=res(h,'bloodMaledict',bloodCurseUses(l)+(s.bhCurseSpecialist?1:0),'short');r.die=d;
    var mutCreated=l>=15?3:l>=7?2:1;
    res(h,'bhMutagenConcoctions',mutCreated,'short');
    res(h,'bhExaltedMutation',Math.max(1,hemMod(h)),'long');
    var pactSlots=l>=6?2:l>=3?1:0;
    res(h,'bhPactSlots',pactSlots,'short');
    res(h,'bhAetherWalk',l>=15?2:1,'short');
    var hybrid=res(h,'bhHybridTransformation',s.bhHybridMastery?9999:(l>=11?2:1),'short');
    if(s.bhHybridMastery){hybrid.max=9999;hybrid.current=9999;hybrid.unbounded=true;hybrid.displayMax=null;}

    s.bhHemocraftDie=d;s.bhHemocraftSaveDC=hemSave(h);s.bhActiveRites=s.bhActiveRites||{};s.bhKnownCurses=s.bhKnownCurses||['marked'];
    s.bhBrand=s.bhBrand||null;s.bhFightingStyle=s.bhFightingStyle||null;
    s.bhCrimsonRitesKnown=s.bhCrimsonRitesKnown||['flame'];
    s.bhRiteDamageDie=d;
    s.bhMutagens=s.bhMutagens||[];s.bhKnownMutagens=s.bhKnownMutagens||[];
    s.bhMutagenCreated=mutCreated;
    s.bhMutagenKnownCount=l>=18?8:l>=15?7:l>=11?6:l>=7?5:4;
    if(l>=6)s.bhBloodCursesKnown=2;if(l>=10)s.bhBloodCursesKnown=3;if(l>=14)s.bhBloodCursesKnown=4;if(l>=18)s.bhBloodCursesKnown=5;
    if(l>=3)s.bhOrder=s.bhOrder||'Орден призрачных убийц';
  }
  function bloodSpendAmplify(h,ctx){
    if(!ctx||!ctx.amplify)return true;
    var hp=Number(h.hp!==undefined?h.hp:h.currentHP);var costDie=bloodDie(bloodHunterLvl(h));
    if(Number.isFinite(hp))h.hp=Math.max(0,hp); // actual HP damage is returned below for engine application
    return {damageSelf:costDie,damageType:'necrotic',unreducible:true};
  }
  function useBloodHunter(h,id,ctx,feature){
    syncBloodHunter(h);ctx=ctx||{};var s=st(h),l=bloodHunterLvl(h),t=target(ctx);
    if(id==='chooseBloodCurse'){
      var curseId=String(ctx.curse||'');
      var allCurses=['anxious','binding','bloatedAgony','corrosion','exorcist','exposure','eyeless','fallenPuppet','howl','marked','muddledMind','soulEater'];
      if(allCurses.indexOf(curseId)<0)return{ok:false,message:'Неизвестное кровавое проклятие.'};
      var req={corrosion:15,exorcist:15,howl:18,soulEater:18}[curseId]||0;
      if(l<req)return{ok:false,message:'Это проклятие доступно только с '+req+' уровня.'};
      if(s.bhKnownCurses.indexOf(curseId)>=0)return{ok:false,message:'Это проклятие уже известно.'};
      var curseMax=bloodCurseUses(l)>=4?5:bloodCurseUses(l)+1;
      if(s.bhKnownCurses.length>=curseMax)return{ok:false,message:'Все доступные кровавые проклятия уже выбраны.'};
      s.bhKnownCurses.push(curseId);
      return{ok:true,message:'🩸 Кровавое проклятие изучено: '+curseId+'.'};
    }
    if(id==='chooseCrimsonRite'){
      var riteId=String(ctx.rite||'');
      var rites=['flame','frozen','storm','dead','oracle','roar'];
      if(rites.indexOf(riteId)<0)return{ok:false,message:'Неизвестный Алый обряд.'};
      var reqR={dead:14,oracle:14,roar:14}[riteId]||0;
      if(l<reqR)return{ok:false,message:'Этот обряд доступен только с '+reqR+' уровня.'};
      if(s.bhCrimsonRitesKnown.indexOf(riteId)>=0)return{ok:false,message:'Этот обряд уже известен.'};
      var riteMax=l>=14?3:l>=7?2:1;
      if(s.bhCrimsonRitesKnown.length>=riteMax)return{ok:false,message:'Все доступные Алые обряды уже выбраны.'};
      s.bhCrimsonRitesKnown.push(riteId);
      return{ok:true,message:'🩸 Алый обряд изучен: '+riteId+'.'};
    }
    if(id==='fightingStyle'){
      var styles=['Стрельба','Дуэлянт','Сражение большим оружием','Сражение двумя оружиями'],fs=String(ctx.style||'');
      if(styles.indexOf(fs)<0)return{ok:false,message:'Неизвестный боевой стиль.'};s.bhFightingStyle=fs;return{ok:true,effect:{fightingStyle:fs},message:'⚔️ Боевой стиль: '+fs+'.'};
    }
    if(id==='riteDawn'){
      if(l<3)return{ok:false,message:'Обряд рассвета доступен с 3 уровня Ордена призрачных убийц.'};
      if(s.bhCrimsonRitesKnown.indexOf('dawn')<0)s.bhCrimsonRitesKnown.push('dawn');
      return{ok:true,effect:{rite:'dawn',damageType:'radiant',brightLightFt:20,resistance:['necrotic'],extraDieVsUndead:true},message:'☀️ Обряд рассвета изучен.'};
    }
    if(id==='curseSpecialist'){s.bhCurseSpecialist=true;var rr=res(h,'bloodMaledict',bloodCurseUses(l)+1,'short');rr.max=bloodCurseUses(l)+1;return{ok:true,effect:{bloodCurseTargetsBloodless:true,extraUse:true},message:'🩸 Специалист по проклятиям: +1 использование и можно проклинать существ без крови.'};}
    if(id==='brandSundering'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.sundering=true;return{ok:true,effect:{extraRiteDie:true,blocksIncorporealMovement:true},message:'🔻 Клеймо рассечения усилено.'};}
    if(id==='stalkersProwess')return{ok:true,effect:{speedBonusFt:10,longJumpBonusFt:10,highJumpBonusFt:3,unarmedAttackBonus:l>=18?3:l>=11?2:1},message:'🐺 Доблесть преследователя активна.'};
    if(id==='advancedTransformation'){var rht=res(h,'bhHybridTransformation',2,'short');rht.max=2;return{ok:true,effect:{hybridRegeneration:'1+CON',useCount:2},message:'🐺 Продвинутая трансформация: 2 использования и регенерация.'};}
    if(id==='brandVoracious'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.voracious=true;return{ok:true,effect:{hybridAttackAdvantageVsBranded:true,bloodlustAdvantage:true},message:'🐺 Клеймо ненасытности активно.'};}
    if(id==='hybridMastery'){s.bhHybridMastery=true;var rm=res(h,'bhHybridTransformation',9999,'short');rm.max=9999;rm.current=9999;rm.unbounded=true;rm.displayMax=null;return{ok:true,effect:{unlimitedHybrid:true},message:'🐺 Мастерство гибридной формы: превращение больше не ограничено.'};}
    if(id==='brandAxiom'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.axiom=true;return{ok:true,effect:{endIllusion:true,endInvisibility:true,shapeChangeSave:'wis',stunOnFail:true},message:'🔻 Клеймо аксиомы раскрывает истинную форму цели.'};}
    if(id==='otherworldlyPatron'){var patrons=['Архифея','Исчадие','Великий Древний','Бессмертный','Небожитель','Клинок проклятия','Глубинный','Джинн','Нежить'];var chosenPatron=String(ctx.patron||'Великий Древний');if(patrons.indexOf(chosenPatron)<0)return{ok:false,message:'Неизвестный потусторонний покровитель.'};s.bhPatron=chosenPatron;return{ok:true,effect:{patron:s.bhPatron},message:'📜 Покровитель выбран: '+s.bhPatron+'.'};}
    if(id==='brandSappingScar'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.sappingScar=true;return{ok:true,effect:{disadvantageVsBloodHunterSpells:true},message:'🔻 Иссушающий шрам активен.'};}
    if(id==='revealedArcana'||id==='unsealedArcana'){
      var p=s.bhPatron||'Великий Древний',map={
        'Архифея':id==='revealedArcana'?'blur':'slow','Небожитель':id==='revealedArcana'?'lesser restoration':'revivify',
        'Глубинный':id==='revealedArcana'?'gust of wind':'lightning bolt','Исчадие':id==='revealedArcana'?'scorching ray':'fireball',
        'Джинн':id==='revealedArcana'?'phantasmal force':'protection from energy','Великий Древний':id==='revealedArcana'?'detect thoughts':'haste',
        'Клинок проклятия':id==='revealedArcana'?'branding smite':'blink','Нежить':id==='revealedArcana'?'blindness/deafness':'speak with dead',
        'Бессмертный':id==='revealedArcana'?'silence':'bestow curse'
      },spell=map[p]||'detect thoughts';
      s.bhArcana=s.bhArcana||{};if(s.bhArcana[id])return{ok:false,message:'Эта аркана уже использована после долгого отдыха.'};s.bhArcana[id]=true;
      return{ok:true,effect:{castSpell:spell,freeAtUnsealed:id==='unsealedArcana'},message:'📜 '+(id==='revealedArcana'?'Открытая':'Раскрытая')+' аркана: '+spell+'.'};
    }
    if(id==='crimsonRite'){
      var rite=String(ctx.rite||s.bhCrimsonRitesKnown[0]||'flame');
      var known=s.bhCrimsonRitesKnown.indexOf(rite)>=0;
      if(!known)return{ok:false,message:'Этот Алый обряд ещё не изучен.'};
      var weaponId=ctx.weaponId||ctx.itemId||'equipped';
      var amp=bloodSpendAmplify(h,ctx);
      if(!amp)return{ok:false,message:'Не удалось активировать обряд.'};
      s.bhActiveRites[weaponId]={rite:rite,damageDie:bloodDie(l),active:true};
      return{ok:true,effect:{weaponId:weaponId,magical:true,rite:rite,extraDamageDie:bloodDie(l),selfDamage:amp.damageSelf||bloodDie(l),selfDamageType:'necrotic',unreducible:true},message:'🩸 Алый обряд активирован: '+rite+'.'};
    }
    if(id==='bloodMaledict'){
      var curse=String(ctx.curse||s.bhKnownCurses[0]||'marked');
      var amp=bloodSpendAmplify(h,ctx);
      if(!s.bhKnownCurses.length)s.bhKnownCurses=['marked'];
      var known=s.bhKnownCurses.indexOf(curse)>=0;
      if(!known)return{ok:false,message:'Это кровавое проклятие не изучено.'};
      if(!t&&curse!=='exposure'&&curse!=='eyeless'&&curse!=='fallenPuppet'&&curse!=='howl'&&curse!=='soulEater')return{ok:false,message:'Выбери цель.'};
      if(!spend(h,'bloodMaledict',1))return{ok:false,message:'Нет доступного использования Кровавого проклятия.'};
      var e={curse:curse,saveDC:hemSave(h),amplified:!!ctx.amplify};
      if(amp&&typeof amp==='object')e.selfDamage=amp.damageSelf;
      if(curse==='anxious')e.intimidationAdvantage=true;
      if(curse==='binding')e={...e,effect:'speed0_no_reaction',durationRounds:1,save:'str',size:'Large-or-smaller'};
      if(curse==='bloatedAgony')e={...e,effect:'str_dex_disadvantage_plus_extra_attack_damage',damage:'1d8 necrotic',durationRounds:1};
      if(curse==='corrosion')e={...e,effect:'poisoned',save:'con',durationRounds:10,damageOnFailedSave:'4d6 necrotic'};
      if(curse==='exorcist')e={...e,effect:'remove_charmed_frightened_possession',amplifiedDamage:'3d6 psychic'};
      if(curse==='exposure')e={...e,effect:'remove_resistance_to_trigger_damage',amplifiedEffect:'remove_invulnerability_then_resistance'};
      if(curse==='eyeless')e={...e,effect:'subtractHemocraftDieFromAttack',reaction:true};
      if(curse==='fallenPuppet')e={...e,effect:'fallen_creature_weapon_attack',reaction:true,amplifiedMoveFt:'half_speed'};
      if(curse==='howl')e={...e,effect:'frightened',save:'wis',rangeFt:ctx.amplify?60:30,stunOnFailBy5:true};
      if(curse==='marked')e={...e,effect:'extraRiteDieOnHitsThisTurn',amplifiedNextAttackAdvantage:true};
      if(curse==='muddledMind')e={...e,effect:'concentration_save_disadvantage',durationRounds:1};
      if(curse==='soulEater')e={...e,effect:'advantage_on_attacks_and_all_damage_resistance',durationRounds:1,amplifiedRestoreSpellSlot:true};
      s.bhLastCurse=e;
      return{ok:true,target:t&&t.id,effect:e,message:'🩸 Кровавое проклятие применено: '+curse+'.'};
    }
    if(id==='brandCastigation'){
      if(!t)return{ok:false,message:'Выбери цель для Клейма наказания.'};
      s.bhBrand={targetId:t.id,damagePerTrigger:Math.max(1,hemMod(h)),tethered:l>=13};
      return{ok:true,target:t.id,effect:{brand:true,psychicDamage:Math.max(1,hemMod(h)),directionSense:true},message:'🔻 Клеймо наказания наложено.'};
    }
    if(id==='brandTethering'){
      if(!s.bhBrand)return{ok:false,message:'Сначала наложи Клеймо наказания.'};
      s.bhBrand.tethered=true;s.bhBrand.damagePerTrigger=Math.max(2,2*hemMod(h));
      return{ok:true,effect:{noDash:true,teleportSave:'wis',teleportDamage:'4d6 psychic'},message:'🔻 Клеймо привязки усилено.'};
    }
    if(id==='grimPsychometry')return{ok:true,effect:{historyAdvantage:true},message:'👁️ Мрачная психометрия активна.'};
    if(id==='darkAugmentation')return{ok:true,effect:{speedBonusFt:5,saveBonus:{str:Math.max(1,hemMod(h)),dex:Math.max(1,hemMod(h)),con:Math.max(1,hemMod(h))}},message:'🩸 Тёмное усиление активно.'};
    if(id==='aetherWalk'){
      var uses=res(h,'bhAetherWalk',l>=15?2:1,'short');
      if(!spend(h,'bhAetherWalk',1))return{ok:false,message:'Астральный шаг уже использован.'};
      return{ok:true,effect:{ethereal:true,durationRounds:Math.max(1,hemMod(h)),phaseThrough:true,forceDamageInside:'1d10'},message:'👻 Эфирный шаг активирован.'};
    }
    if(id==='hybridTransformation'){
      var uses=res(h,'bhHybridTransformation',l>=11?2:1,'short');
      if(s.bhHybrid){s.bhHybrid=false;return{ok:true,effect:{hybrid:false},message:'🐺 Гибридная форма завершена.'};}
      if(l<18&&!spend(h,'bhHybridTransformation',1))return{ok:false,message:'Нет доступного превращения.'};
      if(l>=18){uses.max=999;uses.current=999;}
      s.bhHybrid=true;
      return{ok:true,effect:{hybrid:s.bhHybrid,advantageStr:true,resistance:['bludgeoning','piercing','slashing'],unarmedDamage:l>=11?'1d8':'1d6',bonusDamage:l>=18?3:l>=11?2:1,bonusAC:1},message:'🐺 Гибридная форма '+(s.bhHybrid?'активирована.':'завершена.')};
    }
    if(id==='lycanBloodlust'){
      return{ok:true,effect:{save:'wis',dc:8,directAttackNearestIfFailed:true},message:'🐺 Кровожадность: проверь спасбросок Мудрости при низком HP.'};
    }
    if(id==='chooseMutagenFormula'){
      var knownFormula=String(ctx.mutagen||'');if(!knownFormula)return{ok:false,message:'Укажи формулу мутагена.'};
      if((s.bhKnownMutagens||[]).indexOf(knownFormula)>=0)return{ok:false,message:'Эта формула уже изучена.'};
      if((s.bhKnownMutagens||[]).length>=s.bhMutagenKnownCount)return{ok:false,message:'Достигнут предел известных формул.'};
      s.bhKnownMutagens.push(knownFormula);return{ok:true,message:'🧪 Формула изучена: '+knownFormula+'.'};
    }
    if(id==='mutagen'){
      var formulas={
        Aether:{min:11,effect:{flySpeed:20,durationMinutes:60},side:{strDexChecksDisadvantage:true}},
        Alluring:{effect:{chaChecksAdvantage:true},side:{initiativeDisadvantage:true}},
        Celerity:{effect:{dexIncrease:l>=18?5:l>=11?4:3,dexMaxIncrease:l>=18?5:l>=11?4:3},side:{wisSavesDisadvantage:true}},
        Conversant:{effect:{intChecksAdvantage:true},side:{wisChecksDisadvantage:true}},
        Cruelty:{min:11,effect:{bonusActionExtraWeaponAttack:true},side:{mentalSavesDisadvantage:true}},
        Deftness:{effect:{dexChecksAdvantage:true},side:{wisChecksDisadvantage:true}},
        Embers:{effect:{resistance:['fire'],vulnerability:['cold']}},
        Gelid:{effect:{resistance:['cold'],vulnerability:['fire']}},
        Impermeable:{effect:{resistance:['piercing'],vulnerability:['slashing']}},
        Mobility:{effect:{immunity:['grappled','restrained'],minAt11:{paralyzed:true}},side:{strChecksDisadvantage:true}},
        Nighteye:{effect:{darkvisionFt:120},side:{sunlightAttackAndPerceptionDisadvantage:true}},
        Percipient:{effect:{wisChecksAdvantage:true},side:{chaChecksDisadvantage:true}},
        Potency:{effect:{strIncrease:l>=18?5:l>=11?4:3,strMaxIncrease:l>=18?5:l>=11?4:3},side:{dexSavesDisadvantage:true}},
        Precision:{min:11,effect:{criticalRange:19},side:{strSavesDisadvantage:true}},
        Rapidity:{effect:{speedBonusFt:l>=15?15:10},side:{intChecksDisadvantage:true}},
        Reconstruction:{min:7,effect:{startTurnHealing:'PB',durationMinutes:60},side:{speedPenaltyFt:10}},
        Sagacity:{effect:{intIncrease:l>=18?5:l>=11?4:3,intMaxIncrease:l>=18?5:l>=11?4:3},side:{chaSavesDisadvantage:true}},
        Shielded:{effect:{resistance:['slashing'],vulnerability:['bludgeoning']}},
        Unbreakable:{effect:{resistance:['bludgeoning'],vulnerability:['piercing']}},
        Vermillion:{effect:{extraBloodMaledictUse:true},side:{deathSaveDisadvantage:true}}
      };
      var name=String(ctx.mutagen||'Celerity'),form=formulas[name];
      if(!form)return{ok:false,message:'Неизвестная формула мутагена.'};
      if(form.min&&l<form.min)return{ok:false,message:'Эта формула доступна только с '+form.min+' уровня.'};
      if(s.bhKnownMutagens.length&&s.bhKnownMutagens.indexOf(name)<0)return{ok:false,message:'Сначала изучи эту формулу мутагена.'};
      s.bhMutagens=s.bhMutagens||[];if(s.bhMutagens.indexOf(name)>=0)return{ok:false,message:'Этот мутаген уже активен.'};if(s.bhMutagens.length>=s.bhMutagenCreated)return{ok:false,message:'Все доступные мутагены уже активны.'};if(!spend(h,'bhMutagenConcoctions',1))return{ok:false,message:'Нет приготовленного мутагена. Приготовь новый после короткого или долгого отдыха.'};s.bhMutagens.push(name);
      return{ok:true,effect:{mutagen:name,formula:form.effect,sideEffect:form.side||null,duration:'short-or-long-rest'},message:'🧪 Мутаген активирован: '+name+'.'};
    }
    if(id==='flushMutagens'){s.bhMutagens=[];return{ok:true,message:'🧪 Все мутагены выведены.'};}
    if(id==='ignoreMutagenSideEffect'){if(s.bhMetabolismUsed)return{ok:false,message:'Вы уже подавили побочный эффект сегодня.'};s.bhMetabolismUsed=true;return{ok:true,effect:{ignoreOneMutagenSideEffect:true,durationMinutes:1},message:'🧪 Побочный эффект мутагена подавлен на 1 минуту.'};}
    if(id==='exaltedMutation'){
      var uses=res(h,'bhExaltedMutation',Math.max(1,hemMod(h)),'long');if(!spend(h,'bhExaltedMutation',1))return{ok:false,message:'Нет доступного использования Возвышенной мутации.'};
      return{ok:true,effect:{replaceMutagen:true,mutagen:ctx.mutagen||'Celerity'},message:'🧪 Возвышенная мутация заменяет действующий мутаген.'};
    }
    if(id==='pactMagic'){
      var order=String(ctx.order||s.bhOrder||'Орден осквернённых душ'),slots=[0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2][Math.min(20,l)]||0;
      var slotLevel=l>=19?4:l>=13?3:l>=7?2:1;
      res(h,'bhPactSlots',slots,'short');s.bhPactSlotLevel=slotLevel;s.bhPatron=ctx.patron||s.bhPatron||'Великий Древний';
      return{ok:true,effect:{slots:slots,slotLevel:slotLevel,cantrips:l>=10?3:2,spellsKnown:([0,0,0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,11][Math.min(20,l)]||0),ability:'int'},message:'📜 Договорная магия: ячейки '+slots+' уровня '+slotLevel+'.'};
    }
    if(id==='profaneSpell'){
      var spell=String(ctx.spell||'detect thoughts');if(!spend(h,'bhPactSlots',1))return{ok:false,message:'Нет ячейки договорной магии.'};
      return{ok:true,effect:{castSpell:spell,slotLevel:s.bhPactSlotLevel||1},message:'📜 Договорное заклинание: '+spell+'.'};
    }
    if(id==='riteFocus'){
      return{ok:true,effect:{spellcastingFocus:'active crimson rite weapon',patron:s.bhPatron||'Великий Древний'},message:'📜 Оружие с Алым обрядом стало фокусом.'};
    }
    if(id==='mysticFrenzy')return{ok:true,effect:{bonusWeaponAttackAfterCantrip:true},message:'⚔️ Мистическое безумие: после заговора можно атаковать оружием бонусным действием.'};
    if(id==='soulEater'){
      if(l<18)return{ok:false,message:'Пожиратель душ доступен с 18 уровня.'};
      if(!spend(h,'bloodMaledict',1))return{ok:false,message:'Нет использования Кровавого проклятия.'};
      return{ok:true,effect:{advantageAttacks:true,resistanceAllDamage:true,durationRounds:1},message:'🩸 Пожиратель душ: преимущество на атаки и сопротивление всему урону.'};
    }
    if(id==='riteRevival')return{ok:true,effect:{ifReducedToZero:{setHP:1,endAllRites:true}},message:'🩸 Возрождение обряда готово сработать при падении до 0 HP.'};
    if(id==='sanguineMastery')return{ok:true,effect:{rerollHemocraftOncePerTurn:true,critWithRiteRestoresBloodMaledict:true},message:'🩸 Кровавое мастерство активно.'};
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🩸 '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Способность Кровавого охотника зарегистрирована, но отдельный runtime-эффект ещё не реализован.'};
  }
  function bloodHunterAttack(h,ctx){
    syncBloodHunter(h);var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]},t=ctx&&ctx.target;
    Object.keys(s.bhActiveRites||{}).forEach(function(k){var r=s.bhActiveRites[k];if(r&&r.active){o.extraDice.push(r.damageDie||bloodDie(bloodHunterLvl(h)));o.notes.push('Алый обряд: '+r.rite);if(s.bhBrand&&t&&String(s.bhBrand.targetId)===String(t.id)&&s.bhBrand.tethered)o.extraDice.push(bloodDie(bloodHunterLvl(h)));}});
    if(s.bhLastCurse&&s.bhLastCurse.curse==='marked'&&t&&s.bhLastCurse.targetId===t.id)o.extraDice.push(bloodDie(bloodHunterLvl(h)));
    if(s.bhHybrid)o.notes.push('Гибридная форма: хищные удары доступны.');
    return o;
  }
  var bloodHunterPack={
    id:'cr-blood-hunter',name:'BloodHunter',displayName:'Кровавый охотник',
    source:'Matt Mercer / Critical Role / third-party',
    license:'Original runtime implementation; mechanics checked against current public source',
    features:[
      {id:'crimsonRite',name:'Алый обряд',level:2,action:'bonus',target:'weapon'},
      {id:'chooseCrimsonRite',name:'Выбор Алого обряда',level:2,action:'choice'},
      {id:'bloodMaledict',name:'Кровавое проклятие',level:1,action:'bonus'},
      {id:'chooseBloodCurse',name:'Выбор кровавого проклятия',level:1,action:'choice'},
      {id:'brandCastigation',name:'Клеймо наказания',level:6,action:'passive',target:'enemy'},
      {id:'brandTethering',name:'Клеймо привязки',level:13,action:'utility'},
      {id:'grimPsychometry',name:'Мрачная психометрия',level:9,action:'passive'},
      {id:'darkAugmentation',name:'Тёмное усиление',level:10,action:'passive'},
      {id:'aetherWalk',name:'Эфирный шаг',level:7,action:'bonus'},
      {id:'hybridTransformation',name:'Гибридная трансформация',level:3,action:'bonus'},
      {id:'lycanBloodlust',name:'Кровожадность',level:3,action:'passive'},
      {id:'mutagen',name:'Мутаген',level:3,action:'bonus'},
      {id:'flushMutagens',name:'Вывести мутагены',level:3,action:'action'},
      {id:'ignoreMutagenSideEffect',name:'Странный метаболизм',level:7,action:'bonus'},
      {id:'exaltedMutation',name:'Возвышенная мутация',level:18,action:'bonus'},
      {id:'pactMagic',name:'Договорная магия',level:3,action:'utility'},
      {id:'profaneSpell',name:'Заклинание договора',level:3,action:'action'},
      {id:'riteFocus',name:'Фокус обряда',level:3,action:'passive'},
      {id:'mysticFrenzy',name:'Мистическое безумие',level:7,action:'passive'},
      {id:'soulEater',name:'Пожиратель душ',level:18,action:'reaction'},
      {id:'riteRevival',name:'Возрождение обряда',level:18,action:'reaction'},
      {id:'sanguineMastery',name:'Кровавое мастерство',level:20,action:'passive'}
    ],
    subclasses:[
      {id:'ghostslayer',name:'Орден призрачных убийц',features:[
        {id:'riteDawn',name:'Обряд рассвета',level:3,action:'bonus'},
        {id:'curseSpecialist',name:'Специалист по проклятиям',level:3,action:'passive'},
        {id:'aetherWalk',name:'Эфирный шаг',level:7,action:'bonus'},
        {id:'brandSundering',name:'Клеймо рассечения',level:11,action:'passive'},
        {id:'exorcist',name:'Кровавое проклятие экзорциста',level:15,action:'bonus'},
        {id:'riteRevival',name:'Возрождение обряда',level:18,action:'reaction'}]},
      {id:'lycan',name:'Орден ликантропов',features:[
        {id:'hybridTransformation',name:'Гибридная трансформация',level:3,action:'bonus'},
        {id:'stalkersProwess',name:'Доблесть преследователя',level:7,action:'passive'},
        {id:'advancedTransformation',name:'Продвинутая трансформация',level:11,action:'passive'},
        {id:'brandVoracious',name:'Клеймо ненасытности',level:15,action:'passive'},
        {id:'hybridMastery',name:'Мастерство гибридной формы',level:18,action:'passive'}]},
      {id:'mutant',name:'Орден мутантов',features:[
        {id:'mutagencraft',name:'Мутагенное ремесло',level:3,action:'utility'},
        {id:'strangeMetabolism',name:'Странный метаболизм',level:7,action:'passive'},
        {id:'brandAxiom',name:'Клеймо аксиомы',level:11,action:'passive'},
        {id:'corrosion',name:'Кровавое проклятие коррозии',level:15,action:'bonus'},
        {id:'exaltedMutation',name:'Возвышенная мутация',level:18,action:'bonus'}]},
      {id:'profaneSoul',name:'Орден осквернённых душ',features:[
        {id:'otherworldlyPatron',name:'Потусторонний покровитель',level:3,action:'utility'},
        {id:'pactMagic',name:'Договорная магия',level:3,action:'utility'},
        {id:'riteFocus',name:'Фокус обряда',level:3,action:'passive'},
        {id:'mysticFrenzy',name:'Мистическое безумие',level:7,action:'passive'},
        {id:'revealedArcana',name:'Открытая аркана',level:7,action:'utility'},
        {id:'brandSappingScar',name:'Клеймо иссушающего шрама',level:11,action:'passive'},
        {id:'unsealedArcana',name:'Раскрытая аркана',level:15,action:'utility'},
        {id:'soulEater',name:'Кровавое проклятие пожирателя душ',level:18,action:'reaction'}]}
    ],
    hooks:{sync:syncBloodHunter,useFeature:useBloodHunter,attackModifiers:bloodHunterAttack}
  };
  function installBloodHunterSubclassReference(){
    if(!global.SUBCLASSES_REFERENCE)return;
    global.SUBCLASSES_REFERENCE['Кровавый охотник']={
      'Орден призрачных убийц':{source:'Critical Role',description:'Охотники на нежить и некромантию.',pickLevel:3,levels:{3:{features:['Обряд рассвета','Специалист по проклятиям']},7:{features:['Эфирный шаг']},11:{features:['Клеймо рассечения']},15:{features:['Кровавое проклятие экзорциста']},18:{features:['Возрождение обряда']}}},
      'Орден ликантропов':{source:'Critical Role',description:'Охотники, контролирующие силу ликантропии.',pickLevel:3,levels:{3:{features:['Чувства хищника','Гибридная трансформация']},7:{features:['Доблесть преследователя']},11:{features:['Продвинутая трансформация']},15:{features:['Клеймо ненасытности']},18:{features:['Мастерство гибридной формы']}}},
      'Орден мутантов':{source:'Critical Role',description:'Гемокрафт и алхимические мутагены.',pickLevel:3,levels:{3:{features:['Мутагенное ремесло']},7:{features:['Странный метаболизм']},11:{features:['Клеймо аксиомы']},15:{features:['Кровавое проклятие коррозии']},18:{features:['Возвышенная мутация']}}},
      'Орден осквернённых душ':{source:'Critical Role',description:'Охотники, заключившие договор с потусторонним покровителем.',pickLevel:3,levels:{3:{features:['Потусторонний покровитель','Договорная магия','Фокус обряда']},7:{features:['Мистическое безумие','Открытая аркана']},11:{features:['Клеймо иссушающего шрама']},15:{features:['Раскрытая аркана']},18:{features:['Кровавое проклятие пожирателя душ']}}}
    };
  }
  installBloodHunterSubclassReference();

  function illriggerLevel(h){return lvl(h,'Иллиригер');}
  function illriggerSealDie(l){return l>=20?'4d6':l>=11?'3d6':l>=5?'2d6':'1d6';}
  function illriggerSeals(l){var t=[0,3,3,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,7,7,7];return t[Math.max(1,Math.min(20,l))]||3;}
  function illriggerConduit(l){var t=[0,0,0,0,0,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,10];return t[Math.max(1,Math.min(20,l))]||0;}
  function illriggerBoonCount(l){return l>=18?4:l>=13?3:l>=7?2:l>=2?1:0;}
  function illriggerSaveDC(h){return 8+(Number(h.proficiencyBonus)||2)+mod(h,'cha');}
  function syncIllrigger(h){
    var l=illriggerLevel(h);if(!l)return;
    var s=st(h);
    var r=res(h,'illriggerSeals',illriggerSeals(l),'short');
    r.die=illriggerSealDie(l);r.max=illriggerSeals(l);
    var cd=illriggerConduit(l);
    if(cd>0){var cr=res(h,'illriggerConduit',cd,'long');cr.max=cd;cr.die='d10';}
    res(h,'illriggerInvokeHell',l>=3?1:0,'short');
    res(h,'illriggerInfernalMajesty',l>=17?1:0,'long');
    res(h,'illriggerMasterOfHell',l>=20?1:0,'long');
    res(h,'illriggerSuperiorInterdict',l>=14?1:0,'long');
    res(h,'illriggerBloodPrice',l>=10?1:0,'long');
    var dealUses=Math.max(1,Number(h.proficiencyBonus)||2);res(h,'illriggerHellspeakerDeal',l>=11?dealUses:0,'long');
    res(h,'illriggerCharmEnemy',Math.max(1,mod(h,'cha')),'long');
    res(h,'illriggerSanguineBlessing',Math.max(1,Number(h.proficiencyBonus)||2),'long');
    res(h,'illriggerDevastator',l>=3?1:0,'short');
    res(h,'illriggerYouDie',l>=11?1:0,'short');
    res(h,'illriggerDeathstrike',l>=15?Math.max(1,Number(h.proficiencyBonus)||2):0,'long');
    res(h,'illriggerQuidProQuo',l>=15?1:0,'long');
    s.illriggerBloodPriceReady=l>=10;
    s.illriggerSealTargets=s.illriggerSealTargets||{};
    s.illriggerContract=s.illriggerContract||'architect';
    s.illriggerBoons=s.illriggerBoons||[];
    s.illriggerMastery=s.illriggerMastery||null;
    s.illriggerSaveDC=illriggerSaveDC(h);
    s.illriggerConduitActive=!!s.illriggerConduitActive;
  }
  function illriggerBurn(h,targetId,count){
    var s=st(h),r=h.resources&&h.resources.illriggerSeals;
    if(!targetId||!s.illriggerSealTargets[targetId])return{ok:false,message:'На этой цели нет печатей.'};
    var available=Number(s.illriggerSealTargets[targetId])||0;
    count=Math.max(1,Math.min(available,Number(count)||1));
    if(!spend(h,'illriggerSeals',count))return{ok:false,message:'Недостаточно печатей.'};
    s.illriggerSealTargets[targetId]=available-count;
    if(s.illriggerSealTargets[targetId]<=0)delete s.illriggerSealTargets[targetId];
    return{ok:true,count:count,effect:{damage:count+'*'+illriggerSealDie(illriggerLevel(h)),damageType:'necrotic_or_fire',save:illriggerLevel(h)>=14?null:'none'},message:'🔥 Печати сожжены: '+count+' × '+illriggerSealDie(illriggerLevel(h))+'.'};
  }
  function useIllrigger(h,id,ctx,feature){
    syncIllrigger(h);ctx=ctx||{};var l=illriggerLevel(h),s=st(h),t=target(ctx),r=h.resources&&h.resources.illriggerSeals;
    if(id==='balefulInterdict'||id==='placeSeal'){
      if(!t)return{ok:false,message:'Выбери видимую цель в пределах 30 футов.'};
      if(ctx.distanceFt!==undefined&&Number(ctx.distanceFt)>30)return{ok:false,message:'Цель находится дальше 30 футов.'};
      var tracker=h.initiativeTracker||{},active=tracker.combatants&&tracker.combatants[tracker.activeIndex];var turn=ctx.turnId!==undefined?String(ctx.turnId):String(Number(tracker.round||0)+':'+Number(tracker.activeIndex||0)+':'+String(active&&active.id||h.id||''));
      if(turn!==null&&s.illriggerSealPlacedTurn===turn)return{ok:false,message:'В этом ходу печать уже поставлена.'};
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет доступных печатей.'};
      s.illriggerSealTargets[t.id]=(Number(s.illriggerSealTargets[t.id])||0)+1;
      if(turn!==null)s.illriggerSealPlacedTurn=turn;
      return{ok:true,target:t.id,effect:{seal:true,duration:'until target dies or seal is burned'},message:'🔻 Зловещее запрещение: печать наложена.'};
    }
    if(id==='burnSeal'){
      if(ctx.sourceIsSelf===true||String(ctx.sourceId||'')===String(h.id||''))return{ok:false,message:'Собственную атаку нельзя использовать для сжигания этой печати.'};
      var out=illriggerBurn(h,t&&t.id||ctx.targetId,ctx.count);
      if(!out.ok)return out;
      if(s.illriggerBoons.indexOf('soulEater')>=0)out.effect.tempHp=l;
      return out;
    }
    if(id==='forkedTongue')return{ok:true,effect:{languages: l>=9?3:2,persuasionDeceptionIntimidationFloor:8,insightBonus:l>=9?Math.max(1,mod(h,'cha')):0},message:'🗣️ Раздвоенный язык активен.'};
    if(id==='combatMastery'){
      var ms=['Бравада','Жестокость','Неумолимый','Ложь','Проворство','Неукротимый'];
      var m=String(ctx.mastery||'');if(ms.indexOf(m)<0)return{ok:false,message:'Неизвестная боевая специализация.'};
      s.illriggerMastery=m;return{ok:true,effect:{combatMastery:m},message:'⚔️ Боевая специализация: '+m+'.'};
    }
    if(id==='interdictBoon'){
      var b=String(ctx.boon||'');s.illriggerBoons=s.illriggerBoons||[];if(!b)return{ok:false,message:'Укажи дар Интердикта.'};
      var validBoons=['abatingSeal','soulEater','shadowShroud','conflagrantChannel','unleashHell'];if(validBoons.indexOf(b)<0)return{ok:false,message:'Неизвестный Дар Интердикта.'};
      if(s.illriggerBoons.length>=illriggerBoonCount(l)&&s.illriggerBoons.indexOf(b)<0)return{ok:false,message:'Достигнут лимит даров Интердикта.'};
      if(s.illriggerBoons.indexOf(b)<0)s.illriggerBoons.push(b);
      return{ok:true,effect:{boon:b},message:'🔻 Дар Интердикта выбран: '+b+'.'};
    }
    if(id==='abatingSeal'){
      if(s.illriggerBoons.indexOf('abatingSeal')<0)return{ok:false,message:'Этот Дар Интердикта не выбран.'};
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати для Ослабляющей печати.'};
      return{ok:true,effect:{damageReduction:'1d10+'+Math.floor(l/2),rangeFt:30,reaction:true},message:'🛡️ Ослабляющая печать уменьшает получаемый урон.'};
    }
    if(id==='soulEater'){
      if(s.illriggerBoons.indexOf('soulEater')<0)return{ok:false,message:'Этот Дар Интердикта не выбран.'};
      var burn=illriggerBurn(h,t&&t.id||ctx.targetId,1);if(!burn.ok)return burn;
      burn.effect.tempHp=l;burn.message='🩸 Пожиратель душ: получено '+l+' временных HP.';return burn;
    }
    if(id==='shadowShroud'){
      if(s.illriggerBoons.indexOf('shadowShroud')<0)return{ok:false,message:'Этот Дар Интердикта не выбран.'};
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет свободной печати.'};
      return{ok:true,effect:{acBonus:2,durationMinutes:1,targetSelfOrTouch:true},message:'🌑 Теневая завеса: +2 к AC.'};
    }
    if(id==='conflagrantChannel'){
      if(s.illriggerBoons.indexOf('conflagrantChannel')<0)return{ok:false,message:'Этот Дар Интердикта не выбран.'};
      var bc=illriggerBurn(h,t&&t.id||ctx.targetId,1);if(!bc.ok)return bc;
      bc.effect.damageType='fire';bc.effect.disadvantageNextSave=true;return bc;
    }
    if(id==='unleashHell'){
      if(s.illriggerBoons.indexOf('unleashHell')<0)return{ok:false,message:'Этот Дар Интердикта не выбран.'};
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};
      return{ok:true,effect:{areaRadiusFt:10,damage:'3d6 fire',save:'dex'},message:'🔥 Высвободить Ад: огненный взрыв.'};
    }
    if(id==='infernalConduit'||id==='invigorate'||id==='devour'){
      var n=Math.max(1,Number(ctx.dice)||1);
      if(id==='invigorate'&&!t)return{ok:false,message:'Выбери союзника для исцеления.'};
      if(id==='devour'&&!t)return{ok:false,message:'Выбери цель для Пожирания.'};
      var cr=h.resources&&h.resources.illriggerConduit;if(!cr||cr.current<n)return{ok:false,message:'Недостаточно кубов Инфернального проводника.'};
      cr.current-=n;
      if(id==='invigorate')return{ok:true,target:t.id,effect:{save:'con',saveDC:illriggerSaveDC(h),heal:n+'d10',selfNecrotic:n+'d10',onSave:{heal:'half',selfNecrotic:n+'d10'},unreducedSelfDamage:true,knockoutIfSelfDamageReachesZero:true},message:'🔥 Инфернальный проводник: союзник исцелён ценой твоей крови.'};
      return{ok:true,target:t.id,effect:{save:'con',saveDC:illriggerSaveDC(h),damage:n+'d10 necrotic',healSelf:'sameAsDamage',onSave:{damage:'half',healSelf:'actualDamage'},unreducedNecrotic:true,exhaustionOnFailedSave:l>=11},message:'☠️ Пожирание: инфернальная энергия вырвана из цели.'};
    }

    if(id==='invokeHell'){
      var inv=String(ctx.option||''),contract=String(s.illriggerContract||'architect');
      var invokeOptions={
        architect:['enervatingSpell','spellblade'],
        hellspeaker:['hellspeakerHoneySweetBlades','hellspeakerTurncoat'],
        painkiller:['painkillerGrandStrategist','painkillerPunishment'],
        sanguine:['sanguineEmboldenAllies','sanguineVitalize'],
        shadowmaster:['shadowMasterOfDisguise','shadowNoEscape']
      };
      var known=invokeOptions[contract]||invokeOptions.architect;
      if(known.indexOf(inv)<0)return{ok:false,message:'Этот вариант Призыва Ада не принадлежит выбранному контракту.'};
      if(!spend(h,'illriggerInvokeHell',1))return{ok:false,message:'Призыв Ада уже использован до короткого или долгого отдыха.'};
      var mapped={enervatingSpell:'architectEnervatingSpell',spellblade:'architectSpellblade',hellspeakerHoneySweetBlades:'hellspeakerHoneySweetBlades',hellspeakerTurncoat:'hellspeakerTurncoat',painkillerGrandStrategist:'painkillerGrandStrategist',painkillerPunishment:'painkillerPunishment',sanguineEmboldenAllies:'sanguineEmboldenAllies',sanguineVitalize:'sanguineVitalize',shadowMasterOfDisguise:'shadowMasterOfDisguise',shadowNoEscape:'shadowNoEscape'};
      var fx=illriggerContractFeature(h,mapped[inv]||inv,ctx);if(!fx.ok){h.resources.illriggerInvokeHell.current=Math.min(h.resources.illriggerInvokeHell.max,h.resources.illriggerInvokeHell.current+1);return fx;}
      fx.message='🔥 Призыв Ада: '+inv+'.';return fx;
    }
    if(id==='bloodPrice'){
      var bp=h.resources&&h.resources.illriggerBloodPrice;if(l<10||!bp||bp.current<=0||ctx.hitDieAvailable===false)return{ok:false,message:'Кровавая цена недоступна: нужен доступный КХ и заряд способности.'};
      if(ctx.failedSave!==true)return{ok:false,message:'Кровавую цену можно применить только после провала спасброска.'};
      if(ctx.hitDieResult===undefined&&ctx.consumeHitDie!==true)return{ok:false,message:'Для Кровавой цены нужно подтвердить расход КХ.'};
      bp.current=0;return{ok:true,effect:{expendHitDie:true,saveBonus:ctx.hitDieResult!==undefined?ctx.hitDieResult:'1d10',selfUsesHitDie:true,majestySplash:s.illriggerMajesty===true},message:'🩸 Кровавая цена: КХ потрачен и его результат добавлен к спасброску.'};
    }
    if(id==='terrorizingForce'){
      var typ=String(ctx.damageType||'necrotic');if(['cold','fire','necrotic','poison'].indexOf(typ)<0)return{ok:false,message:'Допустимы холод, огонь, некротический или яд.'};
      s.illriggerTerrorType=typ;return{ok:true,effect:{extraDamage:'1d8 '+typ,durationMinutes:1},message:'😈 Терроризирующая сила: '+typ+'.'};
    }
    if(id==='superiorInterdict'){
      var sr=h.resources&&h.resources.illriggerSuperiorInterdict,seals=h.resources&&h.resources.illriggerSeals;
      if(sr&&sr.current>0&&seals&&Number(seals.current)<=0){sr.current=0;seals.current=Math.min(seals.max,Number(seals.current)+1);return{ok:true,effect:{sealDamageIgnoresResistance:true,restoreOneSealLongRest:true},message:'🔻 Высший интердикт: урон печатей игнорирует сопротивление; одна печать восстановлена.'};}
      return{ok:false,message:'Восстановление печати уже использовано до долгого отдыха.'};
    }
    if(id==='infernalMajesty'){
      var mj=h.resources&&h.resources.illriggerInfernalMajesty;
      if(mj&&mj.current<=0)return{ok:false,message:'Инфернальное величие уже использовано до долгого отдыха.'};
      if(mj)mj.current=0;
      s.illriggerMajesty=true;return{ok:true,effect:{durationMinutes:10,resistance:['cold','fire','necrotic'],flyFt:60,bloodPriceAura:true,terrorDie:'2d8',rebirthInHell:true},message:'👑 Инфернальное величие активировано на 10 минут.'};
    }
    if(id==='masterOfHell'){
      var mh=h.resources&&h.resources.illriggerMasterOfHell;
      if(mh&&mh.current<=0)return{ok:false,message:'Повелитель Ада уже использован до долгого отдыха.'};
      var form=String(ctx.form||'inferno');if(['inferno','pestilence','darkness'].indexOf(form)<0)return{ok:false,message:'Выбери Инферно, Чуму или Тьму.'};
      if(mh)mh.current=0;
      var eff={rangeFt:150,areaRadiusFt:50,save:form==='darkness'||form==='pestilence'?'con':'dex'};
      if(form==='inferno')eff.damage='5d10 fire + 5d10 necrotic',eff.burning=true,eff.burningDamage='1d10 fire + 1d10 necrotic';
      if(form==='pestilence')eff.damage='5d10 poison + 5d10 necrotic',eff.poisoned=true,eff.durationMinutes=1;
      if(form==='darkness')eff.damage='10d10 cold',eff.blinded=true,eff.durationMinutes=1;
      return{ok:true,effect:eff,message:'☠️ Повелитель Ада: адский шторм «'+form+'».'};
    }
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Способность Иллиригера зарегистрирована, но её отдельная автоматизация требует дополнительного UI.'};
  }
  function illriggerAttack(h,ctx){
    var s=st(h),l=illriggerLevel(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};
    if(s.illriggerTerrorType&&l>=11)o.extraDice.push((l>=17?'2d8':'1d8')+' '+s.illriggerTerrorType);
    
    if(s.illriggerMastery==='Ложь')o.notes.push('Оружейная атака может использовать Харизму.');
    if(s.illriggerMastery==='Неукротимый')o.notes.push('Бонус к спасброскам зависит от числа врагов рядом.');
    return o;
  }
  function illriggerContractFeature(h,id,ctx){
    syncIllrigger(h);ctx=ctx||{};var l=illriggerLevel(h),s=st(h),t=target(ctx);
    var contract=String(s.illriggerContract||'architect');

    if(id==='architectEnervatingSpell'){if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати для Эннервирующего заклинания.'};return{ok:true,effect:{spellDamageVulnerability:true,suppressResistanceAndImmunity:true},message:'🔮 Эннервирующее заклинание усилило урон.'};}
    if(id==='architectSpellblade')return{ok:true,effect:{meleeWeaponAttack:true,castIllriggerActionSpell:true},message:'⚔️ Заклинательный клинок активирован.'};
    if(id==='sanguineEmboldenAllies')return{ok:true,effect:{healPool:5*l,rangeFt:30,splitAmongTargets:true},message:'🩸 Воодушевление союзников.'};
    if(id==='sanguineVitalize')return{ok:true,effect:{abilityCheckBonus:Number(h.proficiencyBonus)||2,rangeFt:30,durationMinutes:1},message:'🩸 Жизненная сила разлита по группе.'};
    if(id==='shadowMasterOfDisguise')return{ok:true,effect:{castSpell:'disguise self',free:true},message:'🌑 Маска повелителя теней.'};
    if(id==='architectBlessing')return{ok:true,effect:{extraSkillChoice:['Arcana','History','Nature','Religion'],readWriteForkedLanguages:true},message:'📚 Благословение Архитектора активно.'};
    if(id==='architectSpellcasting'){
      var slots=[0,2,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4][Math.min(20,l)]||0;
      var slot2=l>=7?2:0,slot3=l>=13?2:0,slot4=l>=16?3:0;
      return{ok:true,effect:{cantrips:l>=10?3:2,spellsKnown:Math.min(13,3+Math.max(0,l-3)),slots:{1:slots,2:slot2,3:slot3,4:slot4},ability:'cha',saveDC:illriggerSaveDC(h),recharge:'long'},message:'🔮 Магия Архитектора доступна.'};
    }
    if(id==='hellspeakerCommand'||id==='charmEnemy'){
      var cr=h.resources&&h.resources.illriggerCharmEnemy;if(cr&&cr.current<=0)return{ok:false,message:'Очарование уже использовано до долгого отдыха.'};
      if(!t)return{ok:false,message:'Выбери цель.'};if(ctx.humanoid===false)return{ok:false,message:'Цель должна быть гуманоидом.'};
      if(cr)cr.current-=1;return{ok:true,target:t.id,effect:{save:'cha',condition:'charmed',durationHours:1},message:'😈 Враг очарован.'};
    }
    if(id==='hellspeakerHoneySweetBlades')return{ok:true,effect:{advantageFirstAttack:true,criticalOnHit:true},message:'🍯 Сладчайшие клинки активированы.'};
    if(id==='hellspeakerTurncoat')return{ok:true,effect:{save:'cha',targetsUpTo:Number(h.proficiencyBonus)||2,rangeFt:60,forcedReactionAttack:true},message:'🗣️ Перебежчик активирован.'};
    if(id==='hellspeakerRedCant'){if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати для Красной речи.'};return{ok:true,effect:{minimumD20:10},message:'🗣️ Красная речь: результат d20 повышен до 10.'};}
    if(id==='hellspeakerSlipperyPloy'){if(!t)return{ok:false,message:'Выбери атакующую цель.'};if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t.id,effect:{save:'cha',redirectOrCancel:true},message:'🪤 Скользкий манёвр.'};}
    if(id==='hellspeakerIncontrovertible')return{ok:true,passive:true,effect:{disadvantageSaves:['wis','cha'],againstInterdicted:true},message:'🗣️ Непререкаемость активна.'};
    if(id==='hellspeakerIntransigent')return{ok:true,passive:true,effect:{immune:'charmed',radiusFt:10},message:'🛡️ Непреклонность активна.'};
    if(id==='hellspeakerDeal'){
      var dr=h.resources&&h.resources.illriggerHellspeakerDeal;if(!dr||dr.current<=0)return{ok:false,message:'Все сделки до долгого отдыха уже использованы.'};if(!t)return{ok:false,message:'Выбери союзника.'};dr.current-=1;
      return{ok:true,target:t.id,effect:{durationMinutes:10,advantageOneAttackOrSave:true,addProficiencyBonus:true,successTempHp:l,failNextRollDisadvantage:true},message:'🤝 Сделка с Адом заключена.'};
    }
    if(id==='hellspeakerQuidProQuo'){
      var qr=h.resources&&h.resources.illriggerQuidProQuo;if(!qr||qr.current<=0)return{ok:false,message:'Квид про кво уже использовано до долгого отдыха.'};if(!t)return{ok:false,message:'Выбери цель.'};qr.current=0;
      return{ok:true,target:t.id,effect:{save:'cha',durationMinutes:1,banished:true,summonDevilJurist:true,repeatSaveAtTurnEnd:true},message:'⚖️ Квид про кво: цель отправлена в Ад.'};
    }
    if(id==='painkillerArmor')return{ok:true,passive:true,effect:{heavyArmor:true},message:'🛡️ Палач боли получает владение тяжёлой бронёй.'};
    if(id==='painkillerDevastator'){
      var dv=h.resources&&h.resources.illriggerDevastator;if(!dv||dv.current<=0)return{ok:false,message:'Опустошитель уже использован до короткого/долгого отдыха.'};if(dv)dv.current=0;
      return{ok:true,effect:{makeWeaponAttack:true,allyReactionsUpTo:Number(h.proficiencyBonus)||2,allyAttackOrDamageCantrip:true,rangeFt:30},message:'⚔️ Опустошитель активирован.'};
    }
    if(id==='painkillerGrandStrategist')return{ok:true,effect:{moveAlliesHalfSpeed:true,rangeFt:60,noOpportunityAttacks:true},message:'🎖️ Великий стратег.'};
    if(id==='painkillerPunishment'){if(!t)return{ok:false,message:'Выбери атакующего врага.'};return{ok:true,target:t.id,effect:{reactionDamage:'triggeringDamage',save:'wis',halfOnSave:true},message:'⚔️ Наказание Диспейтера.'};}
    if(id==='painkillerTelekineticSeal'){if(!t)return{ok:false,message:'Выбери цель.'};if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t.id,effect:{save:'wis',pushFt:15,prone:true},message:'🪝 Телекинетическая печать.'};}
    if(id==='painkillerByTheThroat'){if(!t)return{ok:false,message:'Выбери цель.'};if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t.id,effect:{save:'wis',restrainedUntilEndOfNextTurn:true},message:'🗜️ За горло.'};}
    if(id==='painkillerSupremacy')return{ok:true,passive:true,effect:{criticalRange:18,againstInterdicted:true},message:'⚔️ Превосходство Диспейтера активно.'};
    if(id==='painkillerYouDie'){
      var yd=h.resources&&h.resources.illriggerYouDie;if(!yd||yd.current<=0)return{ok:false,message:'Приказ уже использован.'};if(!t)return{ok:false,message:'Выбери союзника с 0 HP.'};if(ctx.hp!==0)return{ok:false,message:'Цель должна быть при 0 HP.'};yd.current=0;return{ok:true,target:t.id,effect:{setHp:1},message:'🩸 «Ты умрёшь по моему приказу!» — союзник остаётся на 1 HP.'};
    }
    if(id==='painkillerDeathstrike'){
      var ds=h.resources&&h.resources.illriggerDeathstrike;if(!ds||ds.current<=0)return{ok:false,message:'Нет зарядов Смертельного удара.'};if(!t)return{ok:false,message:'Выбери помеченную цель.'};if(!s.illriggerSealTargets[t.id])return{ok:false,message:'На цели нет печати.'};ds.current-=1;
      var b=illriggerBurn(h,t.id,1);if(!b.ok)return b;return{ok:true,target:t.id,effect:{criticalHit:true,sealDiceDoubled:true},message:'💀 Смертельный удар превращает попадание в критическое.'};
    }
    if(id==='sanguineExsanguinate'){
      if(!t)return{ok:false,message:'Выбери союзника.'};var targetId=ctx.enemyId||ctx.sourceTargetId||ctx.interdictedTargetId;if(!targetId)return{ok:false,message:'Укажи врага, на котором сжигаются печати.'};var b=illriggerBurn(h,targetId,ctx.count);if(!b.ok)return b;return{ok:true,target:t.id,effect:{tempHpFromSealDamage:true,sealDamage:b.effect.damage},message:'🩸 Истощение: союзник получает временные HP по фактическому урону печатей.'};
    }
    if(id==='sanguineBlessing'){
      var sb=h.resources&&h.resources.illriggerSanguineBlessing;if(!sb||sb.current<=0)return{ok:false,message:'Благословение Сутеха уже использовано до долгого отдыха.'};sb.current-=1;return{ok:true,effect:{senseBloodCreatures:true,rangeFt:120,durationRounds:1},message:'🩸 Кровь ощущается в радиусе 120 футов.'};
    }
    if(id==='sanguineFoulInterchange'){if(!t)return{ok:false,message:'Выбери заражённую цель.'};if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t.id,effect:{endCondition:ctx.condition||'poisoned',transferCondition:true,rangeFt:60,save:'con'},message:'🩸 Грязный обмен.'};}
    if(id==='sanguineGift'){if(!t)return{ok:false,message:'Выбери цель лечения.'};if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t.id,effect:{bonusHealing:l},message:'🎁 Кровавый дар.'};}
    if(id==='sanguineBloodstroke')return{ok:true,effect:{retaliatoryDamage:l,damageType:ctx.damageType||'fire'},message:'🩸 Кровавый удар готов.'};
    if(id==='sanguineHaemalExchange'){if(!t)return{ok:false,message:'Выбери помеченную цель.'};if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t.id,effect:{subtractD8:true,allyNextAddD8:true,rangeFt:60},message:'🩸 Гемальный обмен.'};}
    if(id==='sanguineBloodForBlood')return{ok:true,passive:true,effect:{retaliatoryNecrotic:Number(h.proficiencyBonus)||2},message:'🩸 Кровь за кровь активна.'};
    if(id==='shadowMarkedForDeath')return{ok:true,effect:{advantageFirstAttack:true,againstInterdicted:true},message:'🌑 Помеченный на смерть.'};
    if(id==='shadowStrikeFromDark')return{ok:true,effect:{bonusDamageDice:Number(h.proficiencyBonus)||2,die:l>=15?'d8':'d4',extraDimLightDie:l>=15?'2d8':'1d4',requiresAdvantage:true},message:'🌑 Удар из тьмы.'};
    if(id==='shadowNoEscape'){if(!t)return{ok:false,message:'Выбери цель.'};return{ok:true,target:t.id,effect:{save:'cha',disadvantageInDimLight:true,speedHalf:true,maxDistanceFt:30},message:'🌑 Не уйдёшь.'};}
    if(id==='shadowVeil'){if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,effect:{invisible:true,durationMinutes:10,endsOnAttackOrSpell:true},message:'🌑 Покров лжи.'};}
    if(id==='shadowHellAssassin')return{ok:true,passive:true,effect:{rerollDamage12:true,againstInterdicted:true},message:'🗡️ Адский убийца активен.'};
    if(id==='shadowDarkMalediction')return{ok:true,passive:true,effect:{darknessAroundInterdictedFt:10},message:'🌑 Тёмное проклятие активно.'};
    if(id==='shadowUmbralKiller')return{ok:true,passive:true,effect:{darkvisionFt:60,speedBonusFt:10,stealthAdvantage:true,evasion:true},message:'🌑 Умбральный убийца активен.'};
    if(id==='shadowDoomedToShadows')return{ok:true,effect:{strikeDice:Number(h.proficiencyBonus)||2,die:'d8',extraDimLight:'2d8',canBurnSealForBlind:true},message:'🌑 Обречённый тьмой.'};
    if(id==='architectBlessing')return{ok:true,effect:{extraKnowledgeSkill:true,language:'дополнительный язык'},message:'📚 Благословение Архитектора активно.'};
    if(id==='architectSpellcasting')return{ok:true,effect:{oneThirdCaster:true,ability:'charisma',spellSaveDC:illriggerSaveDC(h)},message:'🔮 Магия Архитектора разрушения доступна.'};
    if(id==='hellspeakerCommand')return{ok:true,effect:{charmOrCompel:true,save:'wis',saveDC:illriggerSaveDC(h)},message:'🗣️ Воля Говорящего с Адом применена.'};
    if(id==='painkillerArmor')return{ok:true,effect:{heavyArmor:true},message:'🛡️ Палач боли получает владение тяжёлой бронёй.'};
    if(id==='painkillerPunishment'){if(!t)return{ok:false,message:'Выбери атакующего врага.'};return{ok:true,target:t.id,effect:{reactionDamage:'2d8 fire_or_psychic',mark:true},message:'⚔️ Наказание активировано.'};}
    if(id==='sanguineRitual'){if(!t)return{ok:false,message:'Выбери цель.'};var n=Math.max(1,Number(ctx.seals)||1);var b=illriggerBurn(h,t.id,n);if(!b.ok)return b;b.effect.healAlly=n+'d8';b.effect.tempHpAlly=n+'d8';return{ok:true,target:t.id,effect:b.effect,message:'🩸 Кровавый ритуал: жизненная сила направлена союзнику.'};}
    if(id==='shadowStep')return{ok:true,effect:{invisible:true,durationRounds:1,teleportFt:30},message:'🌑 Теневой шаг активирован.'};
    if(id==='shadowAssassin'){if(!t)return{ok:false,message:'Выбери помеченную цель.'};if(!s.illriggerSealTargets||!s.illriggerSealTargets[t.id])return{ok:false,message:'Цель должна иметь активную печать.'};return{ok:true,target:t.id,effect:{advantageFirstAttack:true,extraDamage:'2d6'},message:'🗡️ Теневой убийца: преимущество против цели с печатью.'};
    }
    if(id==='contractInvoke')return useIllrigger(h,'invokeHell',ctx);
    return{ok:false,unsupported:true,message:'Способность контракта '+id+' требует отдельного действия/условия.'};
  }

  function pugilistLevel(h){return lvl(h,'Пугилист');}
  function pugilistDie(l){return l>=17?'1d12':l>=11?'1d10':l>=5?'1d8':'1d6';}
  function pugilistMoxieMax(l){var t=[0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,10,12];return t[Math.max(1,Math.min(20,l))]||0;}
  function syncPugilist(h){
    var l=pugilistLevel(h);if(!l)return;
    var s=st(h),r=res(h,'pugilistMoxie',pugilistMoxieMax(l),'short');
    r.max=pugilistMoxieMax(l);r.die=pugilistDie(l);
    s.pugilistMoxie=r.current;s.pugilistDie=pugilistDie(l);
    s.pugilistIronChin=l>=1;s.pugilistMagicFists=l>=6;
    res(h,'pugilistBloodiedButUnbowed',l>=3?1:0,'short');
    res(h,'pugilistFightingSpirit',l>=18?1:0,'long');
    syncPugilistClub(h);
  }
  function usePugilist(h,id,ctx,feature){
    syncPugilist(h);ctx=ctx||{};var l=pugilistLevel(h),s=st(h),r=h.resources&&h.resources.pugilistMoxie;
    if(id==='chooseFightClub'||id==='personaLibre'||id==='workCrowd'||id==='highFlyer'||id==='signatureMove'||id==='detectiveWork'||id==='scrapLikeSleuth'||id==='heartOfCity'||id==='eyesWideOpen'||id==='summonHound'||id==='coordinatedAttack'||id==='houndBestFriend'||id==='direHound'||id==='blackMagic'||id==='dreadHand'||id==='dealWithDevil'||id==='grotesqueGrowth'||id==='fountainViscera'||id==='saltySalute'||id==='heelstomper'||id==='lowBlow'||id==='pocketSand'||id==='meanOldCuss'||id==='uncouthArt'||id==='compressionLock'||id==='quickPin'||id==='toTheMat'||id==='meatShield'||id==='heavyweight'||id==='cleanFinish'||id==='bareKnuckleBoxer'||id==='crossCounter'||id==='oneTwoThreeFloor'||id==='floatLikeButterfly'||id==='knockOut')return usePugilistClub(h,id,ctx);
    var cost=0;
    if(id==='braceUp'){
      cost=1;if(!spend(h,'pugilistMoxie',cost))return{ok:false,message:'Недостаточно Мокси.'};
      var temp=diceRoll(pugilistDie(l)) + l + mod(h,'con');
      return{ok:true,effect:{tempHp:temp},message:'🥊 Соберись: получено '+temp+' временных HP.'};
    }
    if(id==='oldOneTwo'){
      cost=1;if(!spend(h,'pugilistMoxie',cost))return{ok:false,message:'Недостаточно Мокси.'};
      return{ok:true,effect:{bonusActionAttacks:2,unarmed:true},message:'🥊 Двойка: две дополнительные безоружные атаки.'};
    }
    if(id==='stickAndMove'){
      cost=1;if(!spend(h,'pugilistMoxie',cost))return{ok:false,message:'Недостаточно Мокси.'};
      return{ok:true,effect:{choose:['shove','dash']},message:'👊 Ударил и отошёл: выбери Толчок или Рывок.'};
    }
    if(id==='bloodiedButUnbowed'){
      var bbu=h.resources&&h.resources.pugilistBloodiedButUnbowed;if(!bbu||bbu.current<=0)return{ok:false,message:'Эта способность уже использована до отдыха.'};
      if((Number(h.hp)||0)>((Number(h.maxHp)||0)/2))return{ok:false,message:'Эта способность срабатывает, когда HP падают до половины или ниже.'};
      var rr=h.resources&&h.resources.pugilistMoxie;if(rr)rr.current=rr.max;
      bbu.current=0;
      return{ok:true,effect:{tempHp:l+mod(h,'con'),restoreMoxie:true},message:'🩸 Израненный, но не сломленный: Мокси восстановлено.'};
    }
    if(id==='digDeep'){
      if(ctx.activate!==true&&ctx.confirm!==true)return{ok:false,message:'Подтверди использование «Соберись с силами».'};
      var dd=h.resources&&h.resources.pugilistDigDeep;if(dd&&dd.current<=0)return{ok:false,message:'«Соберись с силами» уже использована до отдыха.'};
      if(dd)dd.current=0;
      return{ok:true,effect:{resistance:['bludgeoning','piercing','slashing'],durationMinutes:1,after:{exhaustion:1}},message:'💪 Соберись с силами: сопротивление физическому урону на 1 минуту.'};
    }
    if(id==='haymaker'){
      return{ok:true,effect:{attackDisadvantage:true,maximizeDamageDice:true,duration:'turn'},message:'💥 Сокрушительный удар: атаки получают помеху, кости урона максимальны.'};
    }
    if(id==='shakeItOff'){
      return{ok:true,effect:{endConditions:['charmed','frightened']},message:'🧠 Стряхнуто Очарование/Испуг.'};
    }
    if(id==='unbreakable'){
      if(ctx.failedSave!==true)return{ok:false,message:'Сначала зафиксируй провал спасброска.'};
      cost=1;if(!spend(h,'pugilistMoxie',cost))return{ok:false,message:'Недостаточно Мокси для переброса.'};
      return{ok:true,effect:{rerollSave:true,ability:['str','dex','con']},message:'🛡️ Несокрушимый: спасбросок переброшен.'};
    }
    if(id==='fightingSpirit'){
      var fs=h.resources&&h.resources.pugilistFightingSpirit;if(!fs||fs.current<=0)return{ok:false,message:'Боевой дух уже использован до долгого отдыха.'};
      if((Number(h.hp)||0)>0)return{ok:false,message:'Боевой дух срабатывает при падении до 0 HP.'};
      if((Number(s.pugilistExhaustion)||0)>=4)return{ok:false,message:'Слишком высокий уровень истощения.'};
      fs.current=0;
      s.pugilistExhaustion=(Number(s.pugilistExhaustion)||0)+1;
      if(r)r.current=Math.ceil(r.max/2);
      return{ok:true,effect:{setHp:Math.ceil((Number(h.maxHp)||1)/2),restoreMoxie:'half',exhaustion:1},message:'🔥 Боевой дух: Пугилист возвращается в бой.'};
    }
    if(id==='fisticuffs')return{ok:true,effect:{damageDie:pugilistDie(l),bonusActionUnarmedOrGrapple:true,magical:l>=6,requiresArmor:['light_or_none'],noShield:true},message:'🥊 Кулачный бой активен: '+pugilistDie(l)+'.'};
    if(id==='ironChin')return{ok:true,effect:{armorClass:'12 + Constitution modifier',requires:['light_or_no_armor','no_shield']},message:'🛡️ Железный подбородок: AC считается через Телосложение.'};
    if(id==='fancyFootwork')return{ok:true,effect:{dexteritySaveProficiency:true},message:'👟 Вычурная работа ногами: владение спасбросками Ловкости.'};
    if(id==='downButNotOut'){var db=res(h,'pugilistDownButNotOut',l>=9?1:0,'long');if(db.current<=0)return{ok:false,message:'Эта способность уже использована до долгого отдыха.'};db.current=0;s.pugilistDownButNotOut=true;return{ok:true,effect:{bonusDamage:'proficiency bonus',durationMinutes:1,requires:'Bloodied but Unbowed'},message:'🩸 Ещё не повержен: атаки получают дополнительный урон на 1 минуту.'};}
    if(id==='schoolOfHardKnocks')return{ok:true,effect:{resistance:['psychic'],advantageSavesAgainst:['stunned','unconscious']},message:'🥊 Школа суровой жизни активна: сопротивление психическому урону и преимущество против оглушения/бессознательности.'};
    if(id==='rabbleRouser')return{ok:true,effect:{afterCarousingAdvantage:['persuasion','intimidation'],scope:'peopleOfSettlement'},message:'🍻 Задира: преимущество на Убеждение и Запугивание среди жителей знакомого поселения.'};
    if(id==='herculean')return{ok:true,effect:{carryingCapacityMultiplier:2,objectMeleeDamageMultiplier:2,standingJump:'running_start_distance'},message:'💪 Геркулесова сила активна.'};
    if(id==='peakPhysicalCondition')return{ok:true,effect:{strengthMaxBonus:2,constitutionMaxBonus:2,maxScore:22,longRestExhaustionRecovery:2,longRestAllHitDice:true},message:'🏆 Пиковая физическая форма достигнута.'};
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Эта способность Пугилиста зарегистрирована, но отдельная UI-команда ещё требует подключения.'};
  }
  function pugilistClub(h,ctx){var s=st(h);return String((ctx&&ctx.fightClub)||s.pugilistFightClub||'');}
  function syncPugilistClub(h){
    var s=st(h),l=pugilistLevel(h),club=pugilistClub(h);
    s.pugilistFightClub=club;
    if(club==='arenaRoyale'&&l>=3){var pp=res(h,'pugilistPersona',Math.max(1,3+mod(h,'cha')),'long');pp.max=Math.max(1,3+mod(h,'cha'));s.pugilistPersonaActive=!!s.pugilistPersonaActive;}
    if(club==='pissAndVinegar'&&l>=6){['heelstomper','lowBlow','pocketSand'].forEach(function(id){res(h,'pugilist_'+id,1,'short');});}
    if(club==='pissAndVinegar'&&l>=17)res(h,'pugilistUncouthArt',1,'long');
    if(club==='arenaRoyale'&&l>=6)res(h,'pugilistWorkCrowd',1,'long');
    if(club==='arenaRoyale'&&l>=17)res(h,'pugilistSignatureMove',1,'long');
    if(club==='handOfDread'&&l>=3)res(h,'pugilistDreadHand',1,'short');
    if(club==='handOfDread'&&l>=11)res(h,'pugilistGrotesqueGrowth',1,'long');
    if(club==='handOfDread'&&l>=17)res(h,'pugilistFountainViscera',1,'long');
  }
  function usePugilistClub(h,id,ctx){
    syncPugilist(h);syncPugilistClub(h);ctx=ctx||{};var l=pugilistLevel(h),s=st(h),club=pugilistClub(h),r=h.resources&&h.resources.pugilistMoxie;
    if(id==='chooseFightClub'){var c=String(ctx.club||'');var ok=['arenaRoyale','bloodhoundBruisers','dogAndHound','handOfDread','pissAndVinegar','squaredCircle','sweetScience'].indexOf(c)>=0;if(!ok)return{ok:false,message:'Неизвестный Бойцовский клуб.'};s.pugilistFightClub=c;syncPugilistClub(h);return{ok:true,message:'Бойцовский клуб выбран: '+c+'.'};}
    if(!club)return{ok:false,message:'Сначала выбери Бойцовский клуб.'};
    if(club==='arenaRoyale'){
      if(id==='personaLibre'){s.pugilistPersonaActive=!s.pugilistPersonaActive;return{ok:true,effect:{persona:s.pugilistPersonaActive},message:s.pugilistPersonaActive?'🎭 Персона принята.':'🎭 Персона снята.'};}
      if(id==='workCrowd'){if(!spendResource(h,'pugilistWorkCrowd'))return{ok:false,message:'Работа с толпой уже использована до долгого отдыха.'};return{ok:true,effect:{radiusFt:30,save:'wisdom',dc:8+(Number(h.proficiencyBonus)||2)+mod(h,'str'),choice:['charmed','frightened'],durationMinutes:1,repeatSaveOnDamage:true},message:'🎭 Работа с толпой активирована.'};}
      if(id==='highFlyer')return{ok:true,effect:{speedBonusFt:10,jumpMultiplier:2,bonusDash:true},message:'🪽 Высокий полёт активен.'};
      if(id==='signatureMove'){if(!spendResource(h,'pugilistSignatureMove'))return{ok:false,message:'Фирменный приём восстановится после долгого отдыха, если он попал.'};return{ok:true,effect:{jumpFt:'до скорости',advantage:true,criticalOnHit:true,stunnedUntilEndOfNextTurn:true,missRecoveryMinutes:1},message:'💥 Фирменный приём подготовлен.'};}
    }
    if(club==='bloodhoundBruisers'){
      if(id==='detectiveWork'){if(!spend(h,'pugilistMoxie',1))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{advantage:true,checks:['investigation','insight','perception']},message:'🔎 Детективная работа: преимущество.'};}
      if(id==='scrapLikeSleuth'){if(!spend(h,'pugilistMoxie',2))return{ok:false,message:'Недостаточно Мокси.'};s.pugilistStudiedTarget=ctx.targetId||null;return{ok:true,effect:{target:s.pugilistStudiedTarget,advantageAgainstTarget:true,acBonusAgainstTarget:Number(h.proficiencyBonus)||2,durationMinutes:1},message:'🔎 Противник изучен.'};}
      if(id==='heartOfCity')return{ok:true,effect:{familiarSettlement:true,noSurprise:true,initiativeBonus:Number(h.proficiencyBonus)||2,darkvisionFt:120,expertise:['insight','investigation','perception'],fastTravel:true},message:'🏙️ Сердце города активировано для выбранного поселения.'};
      if(id==='eyesWideOpen'){if(!spend(h,'pugilistMoxie',1))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{durationMinutes:1,advantageSaves:['blinded','deafened'],truesightFt:30},message:'👁️ Глаза широко открыты.'};}
    }
    if(club==='dogAndHound'){
      if(id==='summonHound'){
        if(!global.DNDCompanionPacks||!global.DNDCompanionPacks.create)return{ok:false,message:'Система спутников недоступна.'};
        var e=global.DNDCompanionPacks.create('beastMaster',{name:'Гончая Пугилиста',source:'Пугилист — Пёс и гончая',sourceType:'subclass',controlMode:'command',hp:3+5*l,maxHp:3+5*l,ac:12+(Number(h.proficiencyBonus)||2),speed:40,size:1,actions:[{name:'Укус',attackBonus:(Number(h.proficiencyBonus)||2)+2,damage:'2d4+'+(Number(h.proficiencyBonus)||2),damageType:'piercing',rangeFt:5}],metadata:{pugilistHound:true,dire:l>=17}});s.pugilistHoundId=e&&e.id;return{ok:true,message:'🐕 Гончая призвана.'};
      }
      if(id==='coordinatedAttack')return{ok:true,effect:{houndReactionAttack:true},message:'🐕 Слаженная атака: гончая может атаковать реакцией.'};
      if(id==='houndBestFriend')return{ok:true,effect:{reactionOpportunityAgainstAttacker:true},message:'🐕 Лучший друг гончей: доступна ответная атака.'};
      if(id==='direHound')return{ok:true,effect:{replaceWolfWithDireWolf:true,size:'medium',bonusHpDice:'d8 per pugilist level'},message:'🐺 Гончая стала лютой.'};
    }
    if(club==='handOfDread'){
      if(id==='blackMagic')return{ok:true,effect:{cantrips:['Порча клинка','Потусторонний разряд','Фокус-покус'],spellcasting:'constitution',languageChoice:true},message:'🖤 Чёрная магия изучена.'};
      if(id==='dreadHand'){if(!spendResource(h,'pugilistDreadHand'))return{ok:false,message:'Рука Ужаса уже использована до короткого или долгого отдыха.'};s.pugilistDreadHandActive=true;return{ok:true,effect:{durationMinutes:1,rerollOneDamageDie:true,missedUnarmedExtraAttack:true,afterAttackThreeUnarmed:true,afterAttackCost:2},message:'🖐️ Рука Ужаса проявилась.'};}
      if(id==='dealWithDevil')return{ok:true,effect:{invocationSlots:2,warlockLevelEquivalent:Math.floor(l/2),spellcasting:'constitution',charismaReferencesUse:'strength'},message:'😈 Сделка с Дьяволом: выбери два мистических воззвания.'};
      if(id==='grotesqueGrowth'){if(!s.pugilistDreadHandActive)return{ok:false,message:'Сначала активируй Руку Ужаса.'};if(!spendResource(h,'pugilistGrotesqueGrowth'))return{ok:false,message:'Гротескный рост уже использован до долгого отдыха.'};return{ok:true,effect:{durationMinutes:1,sizeIncrease:1,advantage:['strengthChecks','strengthSaves'],reachFt:10,meleeExtraDamage:'1d4',after:{exhaustion:1}},message:'👹 Гротескный рост активирован.'};}
      if(id==='fountainViscera'){var fv=h.resources&&h.resources.pugilistFountainViscera,fr=h.resources&&h.resources.pugilistMoxie;if(!fv||fv.current<=0)return{ok:false,message:'Фонтан внутренностей уже использован до отдыха.'};if(!fr||fr.current<6)return{ok:false,message:'Для Фонтана внутренностей нужно 6 Мокси.'};fv.current-=1;fr.current-=6;return{ok:true,effect:{save:'dexterity',dc:8+(Number(h.proficiencyBonus)||2)+mod(h,'str'),damageOnFail:100,damageOnSave:50,damageType:'piercing',deathAtZero:true,fearRadiusFt:30,fearSave:'wisdom',fearDurationMinutes:1},message:'🩸 Фонтан внутренностей применён.'};}
    }
    if(club==='pissAndVinegar'){
      if(id==='saltySalute')return{ok:true,effect:{rangeFt:60,save:'wisdom',damage:pugilistDie(l)+'+'+mod(h,'cha')+' psychic',attackDisadvantageUnlessTargetsSelf:true},message:'🗯️ Солёное приветствие.'};
      if(['heelstomper','lowBlow','pocketSand'].indexOf(id)>=0){if(!spendResource(h,'pugilist_'+id))return{ok:false,message:'Этот грязный приём уже использован до отдыха.'};var map={heelstomper:{save:'dexterity',condition:'slowed',moxieOnFail:1},lowBlow:{save:'strength',condition:'prone',moxieOnFail:1},pocketSand:{save:'constitution',condition:'blinded',durationRounds:1,moxieOnFail:1}};return{ok:true,effect:map[id],message:'🃏 Грязный приём: '+({heelstomper:'Топот пяткой',lowBlow:'Низкий удар',pocketSand:'Песок в кармане'}[id]||'приём')+'.'};}
      if(id==='meanOldCuss'){if(!spend(h,'pugilistMoxie',1))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{intimidationAdvantage:true,saveDisadvantageForPugilistFeatures:true},message:'😠 Старый грубиян.'};}
      if(id==='uncouthArt'){if(!spendResource(h,'pugilistUncouthArt'))return{ok:false,message:'Искусство невоспитанности уже использовано до долгого отдыха.'};return{ok:true,effect:{targetsUpToLevel:l,rangeFt:60,firstHitByEachTargetRestoresMoxie:true},message:'📢 Искусство невоспитанности.'};}
    }
    if(club==='squaredCircle'){
      if(id==='compressionLock'||id==='quickPin'||id==='toTheMat'){if(!spend(h,'pugilistMoxie',1))return{ok:false,message:'Недостаточно Мокси.'};var ge={compressionLock:{rerollGrappleEscape:true},quickPin:{opportunityAttackBecomesGrapple:true},toTheMat:{bonusGrapple:true,proneOnSuccess:true}};var gn={compressionLock:'Компрессионный захват',quickPin:'Быстрый захват',toTheMat:'На ковёр'};return{ok:true,effect:ge[id],message:'🤼 Приём «'+gn[id]+'».'};}
      if(id==='meatShield'){if(ctx.attackMissedTargetId&&!spend(h,'pugilistMoxie',1))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{halfCoverWhileGrappling:true,redirectMissedAttackToGrappledTarget:!!ctx.attackMissedTargetId},message:'🤼 Живой щит.'};}
      if(id==='heavyweight')return{ok:true,effect:{grappleSizePlus:1,fullSpeedDragging:true},message:'🏋️ Тяжеловес.'};
      if(id==='cleanFinish')return{ok:true,effect:{advantageAgainstGrappled:true,criticalRange:19,requiresGrappled:true},message:'💥 Чистое завершение.'};
    }
    if(club==='sweetScience'){
      if(id==='bareKnuckleBoxer')return{ok:true,effect:{criticalRange:19},message:'🥊 Боксёрская техника: критическое попадание с 19–20.'};
      if(id==='crossCounter'){if(!spend(h,'pugilistMoxie',2))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{reduceMeleeDamageBy:'1d10 + Strength modifier + pugilist level',counterAttackIfReducedToZero:true},message:'🥊 Контрудар подготовлен.'};}
      if(id==='oneTwoThreeFloor'){if(!spend(h,'pugilistMoxie',1))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{extraUnarmedAfterTwoOldOneTwo:true,proneOnHit:true,noDamage:true},message:'🥊 Раз-два-три — на пол.'};
      }
      if(id==='floatLikeButterfly'){return{ok:true,effect:{restoreMoxieOnSuccessfulCrossCounter:1},message:'🦋 Мокси восстанавливается успешным контрударом.'};}
      if(id==='knockOut'){var cost=Math.max(1,Number(ctx.moxie)||1);if(!spend(h,'pugilistMoxie',cost))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{knockoutRoll:'3d12 + 2d12 за каждую дополнительную Мокси + уровень',durationMinutes:10},message:'💫 Проверка на нокаут.'};}
    }
    return{ok:false,unsupported:true,message:'Способность этого клуба требует контекста цели/боя.'};
  }
  function spendResource(h,id){var r=h.resources&&h.resources[id];if(!r||Number(r.current)<=0)return false;r.current--;return true;}
  function pugilistAttack(h,ctx){
    var l=pugilistLevel(h),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};
    o.unarmedDie=pugilistDie(l);
    if(s.pugilistMagicFists)o.notes.push('Безоружные атаки считаются магическими.');
    if(ctx&&ctx.haymaker)o.disadvantage=true;
    if(ctx&&ctx.haymaker)o.maximizeDamageDice=true;
    if(ctx&&ctx.pugilistWeapon)o.usesFisticuffsDie=true;
    if(l>=13&&s.pugilistDownButNotOut)o.bonusDamage+=Number(h.proficiencyBonus)||2;
    return o;
  }

  function occultistRiteCount(l){return l>=18?8:l>=15?7:l>=12?6:l>=9?5:l>=7?4:l>=5?3:l>=2?2:0;}
  function occultistDC(h){return 8+(Number(h.proficiencyBonus)||2)+mod(h,'wisdom');}
  function syncOccultist(h){
    var l=lvl(h,'Occultist');if(!l)return;
    var s=st(h);s.occultistRitesKnown=occultistRiteCount(l);
    s.occultistDC=occultistDC(h);s.occultistTradition=s.occultistTradition||'Oracle';
    s.occultistRites=s.occultistRites||[];
    s.occultistRites=s.occultistRites.slice(0,s.occultistRitesKnown);
  }
  function useOccultist(h,id,ctx){
    syncOccultist(h);ctx=ctx||{};var l=lvl(h,'Occultist'),s=st(h),t=target(ctx);
    if(id==='chooseTradition'){
      if(['Oracle','Shaman','Witch'].indexOf(ctx.choice)<0)return{ok:false,message:'Выбери Oracle, Shaman или Witch.'};
      s.occultistTradition=ctx.choice;return{ok:true,message:'🔮 Оккультная традиция: '+ctx.choice+'.'};
    }
    if(id==='chooseRite'){
      var r=String(ctx.rite||'');var known=(s.occultistRites||[]);
      if(known.indexOf(r)>=0)return{ok:false,message:'Этот обряд уже изучен.'};
      if(known.length>=s.occultistRitesKnown)return{ok:false,message:'Нет свободного слота Occult Rite.'};
      s.occultistRites.push(r);return{ok:true,message:'🕯️ Изучен оккультный обряд: '+r+'.'};
    }
    if(id==='replaceRite'){
      var a=(s.occultistRites||[]),idx=Number(ctx.index);
      if(idx<0||idx>=a.length)return{ok:false,message:'Укажи корректный индекс обряда.'};
      a[idx]=String(ctx.rite||'');s.occultistRites=a;return{ok:true,message:'🕯️ Обряд заменён.'};
    }
    if(id==='traditionalExpertise')return{ok:true,effect:{expertiseSkills:['animalHandling','arcana','medicine','nature','survival']},message:'📜 Традиционная экспертиза активна.'};
    if(id==='ritualCasting')return{ok:true,effect:{ritualCasting:true},message:'🕯️ Известные ритуальные заклинания можно проводить как ритуалы.'};
    if(id==='wardingPower')return{ok:true,effect:{learnSpell:'shield'},message:'🛡️ Получена защитная магия.'};
    if(id==='communeBeyondDeath')return{ok:true,effect:{learnSpell:'speakWithDead',freeCast:true,recharge:'short'},message:'💀 Доступно бесплатное обращение к мёртвым.'};
    if(id==='emblazonedFocus')return{ok:true,effect:{focus:'bodyMark',somaticMaterialFree:true},message:'🜏 Клеймёный фокус активен.'};
    if(id==='riteOfProwess')return{ok:true,effect:{fightingStyleChoice:['dueling','twoWeaponFighting','greatWeaponFighting']},message:'⚔️ Обряд мастерства: доступен боевой стиль.'};
    if(id==='occultFamiliar')return{ok:true,effect:{summonFamiliar:true,spellAttackUsesWisdom:true},message:'👁️ Оккультный фамильяр доступен.'};
    if(id==='witchsHat')return{ok:true,effect:{hatOfDisguise:true},message:'🎩 Ведьмина шляпа получила магию маскировки.'};
    if(id==='witchsClaws')return{ok:true,effect:{cantrip:'primalSavagery',applyWitchTouch:true},message:'🖐️ Ведьмины когти активны.'};
    if(id==='bloodRituals'){
      if(l<5)return{ok:false,message:'Кровавые ритуалы доступны с 5 уровня.'};
      return{ok:true,effect:{ritualMaterialSubstitution:'blood',rangeFt:10,hpPer100gp:10},message:'🩸 Ритуал может быть подпитан жизненной силой.'};
    }
    if(id==='shamansTouch'){
      if(l<7)return{ok:false,message:'Прикосновение шамана доступно с 7 уровня.'};
      return{ok:true,effect:{replaceAttackWithTouchCantrip:true},message:'🌿 Одна атака может быть заменена контактным заговором.'};
    }
    if(id==='sympatheticBond')return{ok:true,effect:{bondedTarget:t&&t.id},message:'🔗 Симпатическая связь установлена.'};
    if(id==='theOldWays'){return{ok:true,effect:{riteSwapAtLevel:true,ritualMastery:true},message:'🕯️ Старые пути: мастерство оккультных обрядов.'};}
    return{ok:false,unsupported:true,message:'Эта способность Оккультиста требует отдельного resolver/UI.'};
  }
  function occultistAttack(h,ctx){syncOccultist(h);return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:['Occultist DC '+st(h).occultistDC]};}

  function witchHexCount(l){return l>=20?10:l>=18?9:l>=16?8:l>=14?7:l>=11?6:l>=9?5:l>=5?4:l>=2?3:2;}
  function witchDC(h){return 8+(Number(h.proficiencyBonus)||2)+mod(h,'charisma');}
  function syncWitch(h){
    var l=lvl(h,'Witch');if(!l)return;
    var s=st(h);s.witchHexesKnown=witchHexCount(l);s.witchDC=witchDC(h);
    s.witchCraft=s.witchCraft||'Black';s.witchCurse=s.witchCurse||'Hideous';
    s.witchFamiliar=s.witchFamiliar||{active:false,improved:l>=7};
    s.witchGrandHexesKnown=l>=17?4:l>=15?3:l>=13?2:l>=11?1:0;
    s.witchHexTargets=s.witchHexTargets||{};
  }
  function useWitch(h,id,ctx){
    syncWitch(h);ctx=ctx||{};var l=lvl(h,'Witch'),s=st(h),t=target(ctx);
    if(id==='chooseCraft'){
      if(['Black','Green','Red','White'].indexOf(ctx.choice)<0)return{ok:false,message:'Выбери Black, Green, Red или White.'};
      if(l<3)return{ok:false,message:'Craft выбирается с 3 уровня.'};
      s.witchCraft=ctx.choice;return{ok:true,message:'🧙‍♀️ Ведьмина традиция: '+ctx.choice+' Magic.'};
    }
    if(id==='chooseCurse'){
      s.witchCurse=String(ctx.curse||'Hideous');return{ok:true,message:'🕯️ Проклятие ведьмы выбрано.'};
    }
    if(id==='hex'){
      if(!t)return{ok:false,message:'Выбери цель Hex.'};
      s.witchHexTargets[String(t.id)]={name:ctx.hex||'Hex',rounds:1,untilNextTurn:true};
      return{ok:true,target:t.id,effect:{hex:ctx.hex||'generic',durationRounds:1,saveDC:s.witchDC},message:'🕯️ Hex наложен на цель.'};
    }
    if(id==='cackle'){
      var key=t?String(t.id):String(ctx.targetId||'');
      if(!key||!s.witchHexTargets[key])return{ok:false,message:'Нет активного Hex для продления.'};
      s.witchHexTargets[key].rounds=Math.max(2,Number(s.witchHexTargets[key].rounds)||1);
      return{ok:true,target:key,effect:{extendHex:true,bonusAction:true},message:'😈 Cackle продлевает Hex.'};
    }
    if(id==='familiar'){
      s.witchFamiliar.active=true;
      return{ok:true,effect:{summonFamiliar:true,commandBonusAction:true,usesSpellAttack:true},message:'🐈 Фамильяр ведьмы призван.'};
    }
    if(id==='improvedFamiliar'){
      if(l<7)return{ok:false,message:'Улучшенный фамильяр доступен с 7 уровня.'};
      s.witchFamiliar.improved=true;return{ok:true,effect:{familiarMultiattack:l>=17?4:3,forceDamage:true},message:'🐾 Фамильяр улучшен.'};
    }
    if(id==='insidiousSpell'){
      return{ok:true,effect:{hexSaveFailureDebuff:true,spellSaveFailureHexDebuff:true,durationRounds:1},message:'🕸️ Провал против Hex/заклинания даёт помеху на следующую противоположную категорию.'};
    }
    if(id==='grandHex'){
      if(l<11)return{ok:false,message:'Grand Hex доступен с 11 уровня.'};
      return{ok:true,effect:{grandHexUses:s.witchGrandHexesKnown,choiceRequired:true},message:'🔮 Доступен Grand Hex.'};
    }
    if(id==='vengefulCurse'){
      if(l<18)return{ok:false,message:'Vengeful Curse доступно с 18 уровня.'};
      return{ok:true,effect:{retaliateAgainstCurseTarget:true},message:'💀 Проклятие отвечает на удар.'};
    }
    if(id==='hexmaster'){
      if(l<20)return{ok:false,message:'Hexmaster доступен с 20 уровня.'};
      return{ok:true,effect:{hexNoLongerExpiring:true,cackleFree:true},message:'👑 Hexmaster: проклятия мастерского уровня.'};
    }
    if(id==='curse')return{ok:true,target:t&&t.id,effect:{curse:s.witchCurse,saveDC:s.witchDC},message:'🕯️ Проклятие ведьмы применено.'};
    return{ok:false,unsupported:true,message:'Эта способность Ведьмы требует отдельного resolver/UI.'};
  }
  function witchAttack(h,ctx){syncWitch(h);return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:['Witch DC '+st(h).witchDC]};}

  var occultistPack={id:'kibbles-occultist',name:'Occultist',displayName:'Оккультист',source:'KibblesTasty Occultist v1.1',license:'Original runtime implementation; feature names paraphrased',features:[
    {id:'spellcasting',name:'Колдовство',level:1,action:'spell'},
    {id:'chooseTradition',name:'Оккультная традиция',level:1,action:'choice'},
    {id:'chooseRite',name:'Оккультный обряд',level:2,action:'choice'},
    {id:'replaceRite',name:'Замена обряда',level:2,action:'choice'},
    {id:'traditionalExpertise',name:'Традиционная экспертиза',level:10,action:'passive'},
    {id:'theOldWays',name:'Старые пути',level:20,action:'passive'}
  ],subclasses:[{id:'oracle',name:'Oracle',features:[]},{id:'shaman',name:'Shaman',features:[]},{id:'witch',name:'Witch',features:[]}],hooks:{sync:syncOccultist,useFeature:useOccultist,attackModifiers:occultistAttack}};

  var witchPack={id:'mh-witch',name:'Witch',displayName:'Ведьма',source:'Mage Hand Press Complete Witch / 5E 2014',license:'Original runtime implementation; feature names paraphrased',features:[
    {id:'spellcasting',name:'Колдовство',level:1,action:'spell'},
    {id:'hex',name:'Hex',level:1,action:'action',target:'enemy'},
    {id:'curse',name:'Проклятие ведьмы',level:1,action:'action',target:'enemy'},
    {id:'cackle',name:'Cackle',level:2,action:'bonus',target:'enemy'},
    {id:'familiar',name:'Фамильяр',level:2,action:'utility'},
    {id:'chooseCraft',name:'Ведьмин Craft',level:3,action:'choice'},
    {id:'insidiousSpell',name:'Insidious Spell',level:5,action:'passive'},
    {id:'improvedFamiliar',name:'Улучшенный фамильяр',level:7,action:'passive'},
    {id:'grandHex',name:'Grand Hex',level:11,action:'special'},
    {id:'vengefulCurse',name:'Vengeful Curse',level:18,action:'reaction'},
    {id:'hexmaster',name:'Hexmaster',level:20,action:'passive'}
  ],subclasses:[{id:'black',name:'Black Magic',features:[]},{id:'green',name:'Green Magic',features:[]},{id:'red',name:'Red Magic',features:[]},{id:'white',name:'White Magic',features:[]}],hooks:{sync:syncWitch,useFeature:useWitch,attackModifiers:witchAttack}};

  var packs=[bloodHunterPack,

    {id:'mcdm-illrigger',name:'Illrigger',displayName:'Иллиригер',source:'MCDM Productions — The Illrigger Revised 1.0',license:'Original runtime implementation; source mechanics checked against public class material',features:[{id:'balefulInterdict',name:'Зловещее запрещение',level:1,action:'bonus',target:'enemy',rangeFt:30},{id:'burnSeal',name:'Сжечь печать',level:1,action:'special',target:'enemy'},{id:'forkedTongue',name:'Раздвоенный язык',level:1,action:'passive'},{id:'combatMastery',name:'Боевая специализация',level:2,action:'utility'},{id:'interdictBoon',name:'Дар Интердикта',level:2,action:'utility'},{id:'invokeHell',name:'Призыв Ада',level:3,action:'action'},{id:'infernalConduit',name:'Инфернальный проводник',level:6,action:'action'},{id:'bloodPrice',name:'Кровавая цена',level:10,action:'reaction'},{id:'terrorizingForce',name:'Терроризирующая сила',level:11,action:'bonus'},{id:'superiorInterdict',name:'Высший интердикт',level:14,action:'passive'},{id:'infernalMajesty',name:'Инфернальное величие',level:17,action:'bonus'},{id:'masterOfHell',name:'Повелитель Ада',level:20,action:'action'}],subclasses:[
{id:'architect',name:'Архитектор разрушения',features:[
{id:'architectBlessing',name:'Благословение Архитектора',level:3,action:'passive'},{id:'architectSpellcasting',name:'Магия Архитектора',level:3,action:'utility'},
{id:'architectEnervatingSpell',name:'Эннервирующее заклинание',level:3,action:'special'},{id:'architectSpellblade',name:'Заклинательный клинок',level:3,action:'special'},
{id:'hellishVersatility',name:'Адская универсальность',level:7,action:'passive'},{id:'axiomaticSeals',name:'Аксиоматические печати',level:7,action:'passive'},{id:'spellbreaker',name:'Разрушитель чар',level:7,action:'reaction'},{id:'hellMage',name:'Адский маг',level:7,action:'passive'},
{id:'submit',name:'Подчинение',level:11,action:'special'},{id:'vileTransmogrification',name:'Гнусное преображение',level:15,action:'bonus'}]},
{id:'hellspeaker',name:'Говорящий с Адом',features:[
{id:'hellspeakerCommand',name:'Очарование врага',level:3,action:'bonus'},{id:'hellspeakerHoneySweetBlades',name:'Сладчайшие клинки',level:3,action:'special'},{id:'hellspeakerTurncoat',name:'Перебежчик',level:3,action:'action'},
{id:'hellspeakerRedCant',name:'Красная речь',level:7,action:'special'},{id:'hellspeakerSlipperyPloy',name:'Скользкий манёвр',level:7,action:'reaction'},{id:'hellspeakerIncontrovertible',name:'Непререкаемость',level:7,action:'passive'},
{id:'hellspeakerIntransigent',name:'Непреклонность',level:11,action:'passive'},{id:'hellspeakerDeal',name:'Сделка с Адом',level:11,action:'bonus'},{id:'hellspeakerQuidProQuo',name:'Квид про кво',level:15,action:'action'}]},
{id:'painkiller',name:'Палач боли',features:[
{id:'painkillerArmor',name:'Тяжёлая броня',level:3,action:'passive'},{id:'painkillerDevastator',name:'Опустошитель',level:3,action:'action'},{id:'painkillerGrandStrategist',name:'Великий стратег',level:3,action:'special'},{id:'painkillerPunishment',name:'Наказание',level:3,action:'reaction'},
{id:'painkillerTelekineticSeal',name:'Телекинетическая печать',level:7,action:'reaction'},{id:'painkillerByTheThroat',name:'За горло',level:7,action:'bonus'},{id:'painkillerSupremacy',name:'Превосходство Диспейтера',level:7,action:'passive'},
{id:'painkillerYouDie',name:'Ты умрёшь по моему приказу!',level:11,action:'reaction'},{id:'painkillerDeathstrike',name:'Смертельный удар',level:15,action:'reaction'}]},
{id:'sanguine',name:'Кровавый рыцарь',features:[
{id:'sanguineExsanguinate',name:'Истощение',level:3,action:'on-seal-burn'},{id:'sanguineBlessing',name:'Благословение Сутеха',level:3,action:'action'},
{id:'sanguineEmboldenAllies',name:'Воодушевить союзников',level:3,action:'bonus'},{id:'sanguineVitalize',name:'Оживление',level:3,action:'special'},
{id:'sanguineFoulInterchange',name:'Грязный обмен',level:7,action:'action'},{id:'sanguineGift',name:'Кровавый дар',level:7,action:'special'},{id:'sanguineBloodForBlood',name:'Кровь за кровь',level:7,action:'passive'},
{id:'sanguineBloodstroke',name:'Кровавый удар',level:11,action:'reaction'},{id:'sanguineHaemalExchange',name:'Гемальный обмен',level:15,action:'reaction'}]},
{id:'shadowmaster',name:'Повелитель теней',features:[
{id:'shadowMarkedForDeath',name:'Помеченный на смерть',level:3,action:'passive'},{id:'shadowStrikeFromDark',name:'Удар из тьмы',level:3,action:'on-hit'},{id:'shadowMasterOfDisguise',name:'Маска повелителя теней',level:3,action:'action'},{id:'shadowNoEscape',name:'Не уйдёшь',level:3,action:'bonus'},
{id:'shadowVeil',name:'Покров лжи',level:7,action:'bonus'},{id:'shadowHellAssassin',name:'Адский убийца',level:7,action:'passive'},{id:'shadowDarkMalediction',name:'Тёмное проклятие',level:7,action:'passive'},
{id:'shadowUmbralKiller',name:'Умбральный убийца',level:11,action:'passive'},{id:'shadowDoomedToShadows',name:'Обречённый тьмой',level:15,action:'special'}]}],hooks:{sync:syncIllrigger,useFeature:useIllrigger,attackModifiers:illriggerAttack,subclassUse:illriggerContractFeature}},

    {id:'ll-shifter',name:'Shifter',displayName:'Шифтер',source:'LaserLlama / third-party',license:'Original runtime implementation',features:[{id:'shift',name:'Дикая форма',level:1,action:'bonus'},{id:'learnShape',name:'Изучить звериную форму',level:2,action:'action',target:'beast'},{id:'adrenalineSurge',name:'Всплеск адреналина',level:6,action:'reaction'},{id:'primalResilience',name:'Первобытная стойкость',level:10,action:'reaction'},{id:'primevalForm',name:'Первобытная форма',level:11,action:'bonus'}],subclasses:[{id:'aquatic',name:'Водная',features:[]},{id:'avian',name:'Птичья',features:[]},{id:'brute',name:'Грубая',features:[]},{id:'carnivore',name:'Хищная',features:[]},{id:'insect',name:'Насекомая',features:[]},{id:'reptilian',name:'Рептильная',features:[]},{id:'vermin',name:'Паразитная',features:[]}],hooks:{sync:syncShifter,useFeature:useShifter,attackModifiers:shifterAttack}},
    {id:'ll-savant',name:'Savant',displayName:'Савант',source:'LaserLlama / third-party',license:'Original runtime implementation; source mechanics checked against current public class',features:[{id:'adroitAnalysis',name:'Искусный анализ',level:1,action:'bonus',target:'enemy',rangeFt:60},{id:'potentObservation',name:'Мощное наблюдение',level:2,action:'reaction',rangeFt:30},{id:'calculatedFlourish',name:'Расчётный манёвр',level:5,action:'reaction'},{id:'flawlessAnalysis',name:'Безупречный анализ',level:15,action:'action',target:'enemy'}],subclasses:[{id:'archaeologist',name:'Археолог',features:[]},{id:'investigator',name:'Исследователь',features:[]},{id:'naturalist',name:'Натуралист',features:[]},{id:'physician',name:'Врач',features:[]},{id:'mentor',name:'Наставник',features:[]},{id:'tactician',name:'Тактик',features:[]}],hooks:{sync:syncSavant,useFeature:useSavant,attackModifiers:savantAttack}},

    {id:'ll-vessel',name:'Vessel',displayName:'Сосуд',source:'laserllama / third-party',license:'Original runtime implementation',features:[{id:'spiritMantle',name:'Покров духа',level:1,action:'bonus'},{id:'iridescentStrike',name:'Иридисцентный удар',level:1,action:'attack'},{id:'unsealedAspects',name:'Нераскрытые аспекты',level:1,action:'utility'},{id:'archonForm',name:'Форма архонта',level:3,action:'bonus'}],subclasses:[{id:'ascended',name:'Вознесённый',features:[]},{id:'cataclysm',name:'Катаклизм',features:[]},{id:'cursed',name:'Проклятый',features:[]},{id:'fallen',name:'Падший',features:[]},{id:'formless',name:'Бесформенный',features:[]},{id:'trickster',name:'Трикстер',features:[]}],hooks:{sync:syncVessel,useFeature:useVessel,attackModifiers:vesselAttack}},
    {id:'sv-accursed',name:'Accursed',displayName:'Аккурсд',source:'Ross Leiser / Sterling Vermin Adventuring Co.',license:'Original runtime implementation',features:[
      {id:'chooseCurse',name:'Завоёванное проклятие',level:1,action:'choice'},
      {id:'chooseCurseAbility',name:'Характеристика проклятия',level:1,action:'choice'},
      {id:'jinx',name:'Сглаз',level:1,action:'action',target:'enemy'},
      {id:'afflict',name:'Поражение недугом',level:2,action:'action',target:'enemy'},
      {id:'suppressCurse',name:'Подавление недуга',level:2,action:'bonus'},
      {id:'chooseMetamorphosis',name:'Маледикционная метаморфоза',level:2,action:'choice'},
      {id:'maledictionVersatility',name:'Универсальность маледикции',level:4,action:'utility'}
    ].concat(Object.keys(ACCURSED_CURSE_FEATURES).reduce(function(a,k){return a.concat(Object.keys(ACCURSED_CURSE_FEATURES[k]).map(function(id){var f=ACCURSED_CURSE_FEATURES[k][id];return{id:id,name:id,level:f.level,action:f.action,curse:k};}));},[])),subclasses:Object.keys(ACCURSED_CURSES).map(function(id){return{id:id,name:ACCURSED_CURSES[id].name,pickLevel:1,features:Object.keys(ACCURSED_CURSE_FEATURES[id]||{}).map(function(fid){return{id:fid,name:fid,level:ACCURSED_CURSE_FEATURES[id][fid].level};})};}),hooks:{sync:syncAccursed,useFeature:useAccursed,attackModifiers:accursedAttack}},
    {id:'ip-runekeeper',name:'RuneKeeper',displayName:'Рунный хранитель',source:'Taron Pounds / Indestructoboy',license:'Original runtime implementation',features:[{id:'inscribeRune',name:'Вписать руну',level:1,action:'utility'},{id:'runeStance',name:'Рунная стойка',level:2,action:'bonus'},{id:'invokeRune',name:'Призвать руну',level:1,action:'action'}],subclasses:[{id:'dethek',name:'Детек',features:[]},{id:'fiendish',name:'Инфернский',features:[]},{id:'ghukliak',name:'Гуклиак',features:[]},{id:'jotun',name:'Йотун',features:[]},{id:'iokharic',name:'Иокхарик',features:[]},{id:'supernal',name:'Высший',features:[]}],hooks:{sync:syncRuneKeeper,useFeature:useRuneKeeper,attackModifiers:runeKeeperAttack}},

    {id:'kibbles-psion',name:'Psion',displayName:'Псионик',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[
      {id:'chooseArchetype',name:'Псионический архетип',level:1,action:'choice'},
      {id:'psionicPower',name:'Псионика',level:1,action:'utility'},
      {id:'chooseDiscipline',name:'Вторая/третья дисциплина',level:3,action:'choice'},
      {id:'chooseTalent',name:'Псионические таланты',level:2,action:'choice'},
      {id:'psiMastery',name:'Псионическое мастерство',level:5,action:'free'},
      {id:'innatePsionics',name:'Врождённая псионика',level:11,action:'spell'},
      {id:'fullAwakening',name:'Полное пробуждение',level:14,action:'bonus'},
      {id:'mindOverMatter',name:'Разум выше материи',level:14,action:'reaction'},
      {id:'astralGuardian',name:'Астральный страж',level:10,action:'reaction'},
      {id:'planeswalker',name:'Путешественник планов',level:14,action:'utility'},
      {id:'ascension',name:'Вознесение',level:20,action:'reaction'},
      {id:'enhancingSurge',name:'Усиливающий импульс',level:1,action:'action',target:'ally'},
      {id:'astralConstruct',name:'Астральная конструкция',level:1,action:'action'},
      {id:'telekineticForce',name:'Телекинетическая сила',level:1,action:'action',target:'enemy'},
      {id:'telepathicIntrusion',name:'Телепатическое вторжение',level:1,action:'action',target:'enemy'},
      {id:'phaseRift',name:'Фазовый разрыв',level:1,action:'action'},
      {id:'elementalBlast',name:'Элементальный взрыв',level:1,action:'action',target:'enemy'},
      {id:'projectItem',name:'Проекция предмета',level:1,action:'action'},
      {id:'seeing',name:'Видение',level:1,action:'action'},
      {id:'denial',name:'Отрицание',level:1,action:'action',target:'enemy'},
      {id:'mindLeech',name:'Пиявка разума',level:1,action:'action',target:'enemy'}
    ],subclasses:[
      {id:'awakened',name:'Пробуждённый разум',features:[{id:'fullAwakening',name:'Полное пробуждение',level:14,action:'bonus'}]},
      {id:'unleashed',name:'Освобождённый разум',features:[{id:'rampage',name:'Неистовствующая сила',level:3,action:'passive'},{id:'unstoppableRampage',name:'Неудержимое неистовство',level:14,action:'reaction'}]},
      {id:'transcended',name:'Возвышенный разум',features:[{id:'mindOverMatter',name:'Разум выше материи',level:14,action:'reaction'}]},
      {id:'shaper',name:'Разум создателя',features:[{id:'astralGuardian',name:'Астральный страж',level:10,action:'reaction'},{id:'mentalConstruct',name:'Ментальная конструкция',level:1,action:'action'}]},
      {id:'wandering',name:'Странствующий разум',features:[{id:'phaseDancer',name:'Танец фаз',level:6,action:'passive'},{id:'planeswalker',name:'Путешественник планов',level:14,action:'utility'}]},
      {id:'elemental',name:'Элементальный разум',features:[{id:'primordialAspect',name:'Первородный облик',level:1,action:'choice'},{id:'elementalForm',name:'Элементальное воплощение',level:14,action:'action'}]},
      {id:'consuming',name:'Поглощающий разум',features:[{id:'mindDevourer',name:'Пожиратель разума',level:3,action:'reaction'},{id:'mindVampire',name:'Вампир разума',level:10,action:'reaction'},{id:'shatteredHusks',name:'Разрушенные оболочки',level:14,action:'action'}]}
    ],hooks:{sync:syncPsion,useFeature:usePsion,attackModifiers:psionAttack,startTurn:psionStartTurn}},
    {id:'kibbles-warlord',name:'Warlord',displayName:'Военачальник',source:'Laserllama — Warlord v3.3.0',license:'Original runtime implementation; source mechanics checked against public class material',features:[
      {id:'leadershipStyle',name:'Стиль лидерства',level:1,action:'utility'},
      {id:'archery',name:'Стрельба',level:2,action:'passive'},
      {id:'brawling',name:'Рукопашный бой',level:2,action:'passive'},
      {id:'mariner',name:'Моряк',level:2,action:'passive'},
      {id:'mountaineer',name:'Альпинист',level:2,action:'passive'},
      {id:'shieldWarrior',name:'Воин со щитом',level:2,action:'passive'},
      {id:'strongbow',name:'Сильный лук',level:2,action:'passive'},
      {id:'versatileFightingAdvanced',name:'Универсальный бой (расширенный)',level:2,action:'passive'},
      {id:'inspiringWord',name:'Вдохновляющее слово',level:1,action:'bonus',target:'ally',rangeFt:30},
      {id:'attackOrder',name:'Приказ к атаке',level:2,action:'special',target:'ally',rangeFt:30},
      {id:'maneuveringOrder',name:'Манёвренный приказ',level:2,action:'special',target:'ally',rangeFt:30},
      {id:'supportOrder',name:'Приказ поддержки',level:2,action:'special',target:'ally',rangeFt:30},
      {id:'tacticalSkill',name:'Тактический навык',level:2,action:'special'},
      {id:'parry',name:'Парирование',level:2,action:'reaction'},
      {id:'tauntingStrike',name:'Провоцирующий удар',level:2,action:'on-hit',target:'enemy'},
      {id:'heroicWill',name:'Героическая воля',level:5,action:'reaction'},
      {id:'defensiveOrder',name:'Оборонительный приказ',level:2,action:'special',target:'ally'},
      {id:'rallyingCry',name:'Боевой клич',level:9,action:'reaction',target:'ally'},
      {id:'unwaveringWill',name:'Непоколебимая воля',level:10,action:'passive'},
      {id:'tacticalSuperiority',name:'Тактическое превосходство',level:11,action:'passive'},
      {id:'heroicOrder',name:'Героический приказ',level:13,action:'special',target:'ally'},
      {id:'revitalizingOrder',name:'Оживляющий приказ',level:13,action:'special',target:'ally'},
      {id:'victorySurge',name:'Натиск победы',level:13,action:'action',target:'ally'},
      {id:'finalStrike',name:'Финальный удар',level:17,action:'action'},
      {id:'dauntless',name:'Неустрашимый',level:20,action:'passive'},
      {id:'eloquentSpeech',name:'Красноречивая речь',level:2,action:'check'},
      {id:'feint',name:'Ложный выпад',level:2,action:'bonus'},
      {id:'firstAid',name:'Первая помощь',level:2,action:'action',target:'ally'},
      {id:'heroicFortitude',name:'Героическая стойкость',level:2,action:'reaction'},
      {id:'imposingPresence',name:'Внушительное присутствие',level:2,action:'check'},
      {id:'riposte',name:'Ответный удар',level:2,action:'reaction'},
      {id:'steadfastOrder',name:'Непоколебимый приказ',level:2,action:'special',target:'ally'},
      {id:'cunningInstinct',name:'Хитрый инстинкт',level:2,action:'utility'},
      {id:'crescendoOfViolence',name:'Крещендо насилия',level:5,action:'reaction'},
      {id:'defensiveStance',name:'Оборонительная стойка',level:5,action:'bonus'},
      {id:'dirtyHit',name:'Грязный удар',level:5,action:'on-hit'},
      {id:'enliveningOrder',name:'Воодушевляющий приказ',level:5,action:'special',target:'ally'},
      {id:'exposingStrike',name:'Раскрывающий удар',level:5,action:'on-hit'},
      {id:'holdTheLine',name:'Держать строй',level:5,action:'bonus'},
      {id:'honorDuel',name:'Честная дуэль',level:5,action:'bonus',target:'enemy'},
      {id:'insightfulOrder',name:'Проницательный приказ',level:5,action:'special',target:'ally'},
      {id:'intimidatingCommand',name:'Запугивающий приказ',level:5,action:'bonus'},
      {id:'menacingShout',name:'Угрожающий крик',level:5,action:'bonus'},
      {id:'rejuvenatingOrder',name:'Восстанавливающий приказ',level:5,action:'special',target:'ally'},
      {id:'resilientOrder',name:'Стойкий приказ',level:5,action:'special',target:'ally'},
      {id:'surpriseAttack',name:'Внезапная атака',level:5,action:'action',target:'ally'},
      {id:'wildCharge',name:'Дикий натиск',level:5,action:'special',target:'ally'},
      {id:'daringRescue',name:'Отважное спасение',level:9,action:'reaction',target:'ally'},
      {id:'inspirationalSpeech',name:'Вдохновляющая речь',level:9,action:'action',target:'ally'},
      {id:'packTactics',name:'Тактика стаи',level:9,action:'bonus'},
      {id:'tacticalReposition',name:'Тактическое перемещение',level:9,action:'action',target:'ally'},
      {id:'perilousGambit',name:'Опасная уловка',level:9,action:'bonus',target:'enemy'},
      {id:'warCry',name:'Боевой клич',level:9,action:'action'},
      {id:'standTheFallen',name:'Поднять павших',level:9,action:'action',target:'ally'},
      {id:'heroicOrderExploit',name:'Героический приказ',level:13,action:'special',target:'ally'},
      {id:'revitalizingOrderExploit',name:'Оживляющий приказ',level:13,action:'special',target:'ally'},
      {id:'victorySurgeExploit',name:'Натиск победы',level:13,action:'action',target:'ally'},
      {id:'finalStrikeExploit',name:'Финальный удар',level:17,action:'action',target:'enemy'},
      {id:'subjugateThrall',name:'Подчинить раба',level:17,action:'action',target:'enemy'},
      {id:'roguishCharm',name:'Плутовская харизма',level:2,action:'special'},
      {id:'resilientOrderAdvanced',name:'Стойкий приказ (расширенный)',level:5,action:'special',target:'ally'},
      {id:'arrestingStrike',name:'Задерживающий удар',level:2,action:'special'},
      {id:'disarm',name:'Разоружающий удар',level:2,action:'special'},
      {id:'lunge',name:'Выпад',level:2,action:'special'},
      {id:'precisionStrike',name:'Точный удар',level:2,action:'special'},
      {id:'reposition',name:'Перестроение',level:2,action:'special'},
      {id:'advancedRoguishCharm',name:'Продвинутая плутовская харизма',level:2,action:'special'},
      {id:'shieldImpact',name:'Удар щитом',level:2,action:'special'},
      {id:'skilledRider',name:'Опытный всадник',level:2,action:'special'},
      {id:'streetwise',name:'Уличная смекалка',level:2,action:'special'},
      {id:'sweepingStrike',name:'Размашистый удар',level:2,action:'special'},
      {id:'cripplingStrike',name:'Увечащий удар',level:5,action:'special'},
      {id:'glancingBlow',name:'Скользящий удар',level:5,action:'special'},
      {id:'martialFocus',name:'Боевой фокус',level:5,action:'special'},
      {id:'redirect',name:'Перенаправление',level:5,action:'special'},
      {id:'rendingStrike',name:'Раздирающий удар',level:5,action:'special'},
      {id:'ringingStrike',name:'Оглушающий удар',level:5,action:'special'},
      {id:'soothingSpeech',name:'Успокаивающая речь',level:5,action:'special'},
      {id:'forgottenKnowledge',name:'Забытое знание',level:9,action:'special'},
      {id:'heroicFocus',name:'Героическая концентрация',level:9,action:'special'},
      {id:'inciteViolence',name:'Подстрекательство к насилию',level:9,action:'special'},
      {id:'recruitInformant',name:'Нанять информатора',level:9,action:'special'},
      {id:'recruitMercenary',name:'Нанять наёмника',level:9,action:'special'},
      {id:'surveySettlement',name:'Разведка поселения',level:9,action:'special'},
      {id:'surveyWilderness',name:'Разведка дикой местности',level:9,action:'special'},
      {id:'clandestineSource',name:'Тайный источник',level:13,action:'special'},
      {id:'equipMilitia',name:'Снарядить ополчение',level:13,action:'special'},
      {id:'expertFocus',name:'Экспертная концентрация',level:13,action:'special'},
      {id:'unbreakableExploit',name:'Несокрушимость',level:13,action:'special'},
      {id:'knighthood',name:'Рыцарские навыки',level:3,action:'special'},
      {id:'inspiringShout',name:'Вдохновляющий клич',level:3,action:'special'},
      {id:'leadTheCharge',name:'Веди в атаку',level:6,action:'special'},
      {id:'flamesOfHope',name:'Пламя надежды',level:14,action:'special'},
      {id:'paragonOfChivalry',name:'Парагон рыцарства',level:18,action:'special'},
      {id:'darkCaptain',name:'Тёмный капитан',level:3,action:'special'},
      {id:'dreadPresence',name:'Присутствие ужаса',level:3,action:'special'},
      {id:'merciless',name:'Безжалостный',level:6,action:'special'},
      {id:'ruthlessCommand',name:'Безжалостное командование',level:14,action:'special'},
      {id:'balefulPresence',name:'Гибельное присутствие',level:18,action:'special'},
      {id:'dreadlord',name:'Повелитель ужаса',level:18,action:'special'},
      {id:'predatoryInstinct',name:'Хищничий инстинкт',level:3,action:'special'},
      {id:'packleader',name:'Вожак стаи',level:3,action:'special'},
      {id:'silentStalker',name:'Тихий охотник',level:6,action:'special'},
      {id:'thrillOfTheHunt',name:'Жажда охоты',level:14,action:'special'},
      {id:'apexPredator',name:'Вершина хищника',level:18,action:'special'},
      {id:'gallantSpellcasting',name:'Заклинания галантности',level:3,action:'special'},
      {id:'warriorPoet',name:'Поэт-воин',level:3,action:'special'},
      {id:'heroicCharge',name:'Героический рывок',level:6,action:'special'},
      {id:'songsOfWarPeace',name:'Песни войны и мира',level:6,action:'special'},
      {id:'warsong',name:'Боевой гимн',level:14,action:'special'},
      {id:'mythicVoice',name:'Мифический голос',level:18,action:'special'},
      {id:'cheapShot',name:'Грязный удар',level:3,action:'special'},
      {id:'dastardlyTalents',name:'Коварные таланты',level:3,action:'special'},
      {id:'ruthlessFocus',name:'Безжалостный натиск',level:6,action:'special'},
      {id:'deviousTactics',name:'Хитрые тактики',level:14,action:'special'},
      {id:'markedForDeath',name:'Метка смерти',level:18,action:'special'},
      {id:'inscrutableMind',name:'Непроницаемый разум',level:18,action:'special'},
      {id:'advancedTactics',name:'Продвинутая тактика',level:3,action:'special'},
      {id:'artOfWar',name:'Искусство войны',level:3,action:'special'},
      {id:'strategicAdjustments',name:'Стратегические корректировки',level:3,action:'special'},
      {id:'brainsOverBrawn',name:'Мозг вместо мускулов',level:6,action:'special'},
      {id:'knowYourEnemy',name:'Знай врага',level:6,action:'special'},
      {id:'giftedStrategist',name:'Одарённый стратег',level:14,action:'special'},
      {id:'masterTactician',name:'Великий тактик',level:18,action:'special'},
      {id:'monstrousMinion',name:'Чудовищный миньон',level:3,action:'special'},
      {id:'ironCommand',name:'Железное командование',level:6,action:'special'},
      {id:'monstrousMenagerie',name:'Чудовищный зверинец',level:14,action:'special'},
      {id:'totalDomination',name:'Полное подчинение',level:18,action:'special'},
      {id:'counselorProtege',name:'Ученик наставника',level:3,action:'special'},
      {id:'invigoratingOrders',name:'Воодушевляющие приказы',level:6,action:'special'},
      {id:'exaltedProtege',name:'Возвышенный ученик',level:14,action:'special'},
      {id:'legendaryTandem',name:'Легендарный тандем',level:18,action:'special'},
      {id:'coordinatedAssault',name:'Слаженное нападение',level:3,action:'special'},
      {id:'saltOfEarth',name:'Соль земли',level:3,action:'special'},
      {id:'bandTogether',name:'Вместе сильнее',level:6,action:'special'},
      {id:'strengthInNumbers',name:'Сила численности',level:14,action:'special'},
      {id:'grandRevolutionary',name:'Великий революционер',level:18,action:'special'},
      {id:'parley',name:'Переговоры',level:3,action:'special'},
      {id:'seafarer',name:'Мореход',level:3,action:'special'},
      {id:'navigatorCrew',name:'Экипаж навигатора',level:6,action:'special'},
      {id:'rallyCrew',name:'Сплочение экипажа',level:6,action:'special'},
      {id:'firstMate',name:'Первый помощник',level:14,action:'special'},
      {id:'illustriousAdmiral',name:'Прославленный адмирал',level:18,action:'special'},
      {id:'keeperOfOrder',name:'Хранитель порядка',level:3,action:'special'},
      {id:'lawsShield',name:'Щит закона',level:3,action:'special'},
      {id:'halt',name:'Остановить нарушителя',level:6,action:'special'},
      {id:'stalwartDefender',name:'Стойкий защитник',level:6,action:'special'},
      {id:'unerringEye',name:'Непогрешимый глаз',level:14,action:'special'},
      {id:'bastionOfOrder',name:'Бастион порядка',level:14,action:'special'},
      {id:'highAuthority',name:'Высшая власть',level:18,action:'special'},
      {id:'anointedMagic',name:'Освящённая магия',level:3,action:'special'},
      {id:'divineMandate',name:'Божественный мандат',level:3,action:'special'},
      {id:'channelDivinity',name:'Божественный канал',level:6,action:'special'},
      {id:'wordsOfZeal',name:'Слова рвения',level:14,action:'special'},
      {id:'favoredServant',name:'Избранный слуга',level:18,action:'special'}
    ],subclasses:[
      {id:'chivalry',name:'Рыцарство',features:[{id:'knighthood',name:'Рыцарские навыки',level:3},{id:'inspiringShout',name:'Вдохновляющий клич',level:3},{id:'leadTheCharge',name:'Веди в атаку',level:6},{id:'flamesOfHope',name:'Пламя надежды',level:14},{id:'paragonOfChivalry',name:'Парагон рыцарства',level:18}]},
      {id:'dread',name:'Ужас',features:[{id:'darkCaptain',name:'Тёмный капитан',level:3},{id:'dreadPresence',name:'Присутствие ужаса',level:3},{id:'merciless',name:'Безжалостный',level:6},{id:'ruthlessCommand',name:'Безжалостное командование',level:14},{id:'dreadlord',name:'Повелитель ужаса',level:18},{id:'balefulPresence',name:'Гибельное присутствие',level:18}]},
      {id:'ferocity',name:'Свирепость',features:[{id:'predatoryInstinct',name:'Хищничий инстинкт',level:3},{id:'packleader',name:'Вожак стаи',level:3},{id:'silentStalker',name:'Тихий охотник',level:6},{id:'thrillOfTheHunt',name:'Жажда охоты',level:14},{id:'apexPredator',name:'Вершина хищника',level:18}]},
      {id:'gallantry',name:'Галантность',features:[{id:'gallantSpellcasting',name:'Заклинания галантности',level:3},{id:'warriorPoet',name:'Поэт-воин',level:3},{id:'heroicCharge',name:'Героический рывок',level:6},{id:'songsOfWarPeace',name:'Песни войны и мира',level:6},{id:'warsong',name:'Боевой гимн',level:14},{id:'mythicVoice',name:'Мифический голос',level:18}]},
      {id:'schemes',name:'Интриги',features:[{id:'cheapShot',name:'Грязный удар',level:3},{id:'dastardlyTalents',name:'Коварные таланты',level:3},{id:'ruthlessFocus',name:'Безжалостный натиск',level:6},{id:'deviousTactics',name:'Хитрые тактики',level:14},{id:'markedForDeath',name:'Метка смерти',level:18},{id:'inscrutableMind',name:'Непроницаемый разум',level:18}]},
      {id:'tactics',name:'Тактика',features:[{id:'advancedTactics',name:'Продвинутая тактика',level:3},{id:'artOfWar',name:'Искусство войны',level:3},{id:'strategicAdjustments',name:'Стратегические корректировки',level:3},{id:'brainsOverBrawn',name:'Мозг вместо мускулов',level:6},{id:'knowYourEnemy',name:'Знай врага',level:6},{id:'giftedStrategist',name:'Одарённый стратег',level:14},{id:'masterTactician',name:'Великий тактик',level:18}]},
      {id:'claws',name:'Когти',features:[{id:'monstrousMinion',name:'Чудовищный миньон',level:3},{id:'ironCommand',name:'Железное командование',level:6},{id:'monstrousMenagerie',name:'Чудовищный зверинец',level:14},{id:'totalDomination',name:'Полное подчинение',level:18}]},
      {id:'counsel',name:'Наставничество',features:[{id:'counselorProtege',name:'Ученик наставника',level:3},{id:'invigoratingOrders',name:'Воодушевляющие приказы',level:6},{id:'exaltedProtege',name:'Возвышенный ученик',level:14},{id:'legendaryTandem',name:'Легендарный тандем',level:18}]},
      {id:'liberty',name:'Свобода',features:[{id:'coordinatedAssault',name:'Слаженное нападение',level:3},{id:'saltOfEarth',name:'Соль земли',level:3},{id:'bandTogether',name:'Вместе сильнее',level:6},{id:'strengthInNumbers',name:'Сила численности',level:14},{id:'grandRevolutionary',name:'Великий революционер',level:18}]},
      {id:'navigators',name:'Мореходы',features:[{id:'parley',name:'Переговоры',level:3},{id:'seafarer',name:'Мореход',level:3},{id:'navigatorCrew',name:'Экипаж навигатора',level:6},{id:'rallyCrew',name:'Сплочение экипажа',level:6},{id:'firstMate',name:'Первый помощник',level:14},{id:'illustriousAdmiral',name:'Прославленный адмирал',level:18}]},
      {id:'order',name:'Порядок',features:[{id:'keeperOfOrder',name:'Хранитель порядка',level:3},{id:'lawsShield',name:'Щит закона',level:3},{id:'halt',name:'Остановить нарушителя',level:6},{id:'stalwartDefender',name:'Стойкий защитник',level:6},{id:'unerringEye',name:'Непогрешимый глаз',level:14},{id:'bastionOfOrder',name:'Бастион порядка',level:14},{id:'highAuthority',name:'Высшая власть',level:18}]},
      {id:'zeal',name:'Рвение',features:[{id:'anointedMagic',name:'Освящённая магия',level:3},{id:'divineMandate',name:'Божественный мандат',level:3},{id:'channelDivinity',name:'Божественный канал',level:6},{id:'wordsOfZeal',name:'Слова рвения',level:14},{id:'favoredServant',name:'Избранный слуга',level:18}]}
    ],hooks:{sync:syncWarlord,useFeature:useWarlord,attackModifiers:warlordAttack}},
    {id:'mh-alchemist',name:'Alchemist',displayName:'Алхимик',source:'Mage Hand Press — Alchemist 2024 / 5.5E',license:'Original runtime implementation; feature names paraphrased',features:[
      {id:'bomb',name:'Бомба',level:1,action:'attack',target:'enemy'},
      {id:'potionBrew',name:'Варка зелий',level:1,action:'utility'},
      {id:'primeBomb',name:'Прайм-бомба',level:2,action:'special'},
      {id:'setFormula',name:'Формула бомбы',level:2,action:'choice'},
      {id:'reagentSynthesis',name:'Синтез реагентов',level:2,action:'utility'},
      {id:'evasion',name:'Уклонение',level:7,action:'passive'},
      {id:'blastCoating',name:'Покрытие взрыва',level:11,action:'passive'},
      {id:'potionMixologist',name:'Миксолог зелий',level:15,action:'bonus'},
      {id:'experimentalist',name:'Экспериментатор',level:18,action:'utility'},
      {id:'philosophersStone',name:'Философский камень',level:20,action:'passive'},
      {id:'nuclearBomb',name:'Ядерная бомба',level:20,action:'action'},
      {id:'acidBomb',name:'Кислотная бомба',level:2,action:'special'},
      {id:'brambleBomb',name:'Ежевичная бомба',level:2,action:'special'},
      {id:'concussionBomb',name:'Контузионная бомба',level:2,action:'special'},
      {id:'cryoBomb',name:'Крио-бомба',level:2,action:'special'},
      {id:'fearBomb',name:'Бомба страха',level:2,action:'special'},
      {id:'holyBomb',name:'Святая бомба',level:2,action:'special'},
      {id:'impactBomb',name:'Ударная бомба',level:2,action:'special'},
      {id:'incendiaryBomb',name:'Зажигательная бомба',level:2,action:'special'},
      {id:'laughingGasBomb',name:'Бомба со смехотворным газом',level:2,action:'special'},
      {id:'lightningBomb',name:'Молниевая бомба',level:2,action:'special'},
      {id:'oilBomb',name:'Масляная бомба',level:2,action:'special'},
      {id:'paintBomb',name:'Бомба с краской',level:2,action:'special'},
      {id:'prismaticBomb',name:'Призматическая бомба',level:2,action:'special'},
      {id:'quietBomb',name:'Тихая бомба',level:2,action:'special'},
      {id:'seekingBomb',name:'Самонаводящаяся бомба',level:2,action:'special'},
      {id:'smokeBomb',name:'Дымовая бомба',level:2,action:'special'},
      {id:'teleportationBomb',name:'Телепортационная бомба',level:2,action:'special'},
      {id:'witheringBomb',name:'Иссушающая бомба',level:2,action:'special'}
    ],subclasses:[
      {id:'amorist',name:'Аморист',features:[]},{id:'apothecary',name:'Аптекарь',features:[]},
      {id:'dynamoEngineer',name:'Инженер-динамо',features:[]},{id:'ionizer',name:'Ионизатор',features:[]},
      {id:'madBomber',name:'Безумный бомбардир',features:[]},{id:'mutagenist',name:'Мутагенист',features:[]},
      {id:'oozeRancher',name:'Разводчик слизней',features:[]},{id:'pigmentist',name:'Пигментист',features:[]},
      {id:'resonator',name:'Резонатор',features:[]},{id:'venomsmith',name:'Веномсмит',features:[]},
      {id:'xenoalchemist',name:'Ксеноалхимик',features:[]}
    ],hooks:{sync:syncAlchemist,useFeature:useAlchemist,attackModifiers:alchemistAttack}},
    {id:'mh-warden',name:'Warden',displayName:'Страж',source:'Mage Hand Press — Warden 2024 / 5.5E',license:'Original runtime implementation; feature names paraphrased',features:[
      {id:'fightingStyle',name:'Боевой стиль',level:1,action:'choice'},
      {id:'sentinelStand',name:'Стойка часового',level:1,action:'choice'},
      {id:'weaponMastery',name:'Мастерство оружия',level:1,action:'passive'},
      {id:'guardianBlock',name:'Тактика: Блок',level:2,action:'bonus',target:'ally'},
      {id:'guardianChallenge',name:'Тактика: Вызов',level:2,action:'bonus',target:'enemy'},
      {id:'guardianGrasp',name:'Тактика: Захват',level:2,action:'bonus'},
      {id:'unyieldingResolve',name:'Непоколебимая решимость',level:2,action:'passive'},
      {id:'extraAttack',name:'Дополнительная атака',level:5,action:'passive'},
      {id:'interrupt',name:'Перехват',level:5,action:'reaction',target:'enemy'},
      {id:'mettle',name:'Стойкость',level:7,action:'passive'},
      {id:'survive',name:'Выжить',level:9,action:'reaction'},
      {id:'sentinelStrike',name:'Удар часового',level:11,action:'choice'},
      {id:'fontOfLife',name:'Источник жизни',level:13,action:'free'},
      {id:'extendedTactics',name:'Расширенная тактика',level:14,action:'passive'},
      {id:'improvedResolve',name:'Улучшенная решимость',level:15,action:'passive'},
      {id:'sentinelSoul',name:'Душа часового',level:18,action:'choice'},
      {id:'legendaryResistance',name:'Легендарное сопротивление',level:20,action:'reaction'}
    ],subclasses:[
      {id:'beastbloodGuardian',name:'Зверокровный хранитель',features:[]},
      {id:'carrionKing',name:'Король падали',features:[]},
      {id:'diabolist',name:'Диаболист',features:[]},
      {id:'drakeBlooded',name:'Драконокровный',features:[]},
      {id:'godsworn',name:'Богопоклятый',features:[]},
      {id:'greyWatchman',name:'Серый страж',features:[]},
      {id:'nightgaunt',name:'Ночной кошмар',features:[]},
      {id:'rimekeeper',name:'Хранитель изморози',features:[]},
      {id:'steelShepherd',name:'Стальной пастырь',features:[]},
      {id:'stoneheartDefender',name:'Каменносердечный защитник',features:[]},
      {id:'stormSentinel',name:'Грозовой часовой',features:[]},
      {id:'verdantProtector',name:'Защитник зелени',features:[]},
      {id:'witchbaneHunter',name:'Охотник на ведьм',features:[]}
    ],hooks:{sync:syncWarden,useFeature:useWarden,attackModifiers:wardenAttack}},
    {id:'kibbles-spellblade',name:'Spellblade',displayName:'Заклинатель клинка',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'spellstrike',name:'Заклинательный удар',level:1,action:'bonus',target:'self',description:'Связать оружейную атаку с магическим эффектом.'},{id:'arcaneGuard',name:'Арканная защита',level:2,action:'bonus',target:'self',description:'Получить временную защиту.'}],subclasses:[{id:'arcaneTradition',name:'Арканная традиция',features:[{id:'arcaneDuelist',name:'Арканный дуэлянт',level:3,action:'passive'}]},{id:'stormTradition',name:'Традиция бури',features:[{id:'stormStrike',name:'Удар бури',level:3,action:'on-hit'}]},{id:'wardingTradition',name:'Оберегающая традиция',features:[{id:'spellParry',name:'Парирование заклинания',level:3,action:'reaction'}]},{id:'bladeDancer',name:'Танцор клинка',features:[{id:'bladeDance',name:'Танец клинка',level:3,action:'bonus'}]}],hooks:{sync:syncSpellblade,useFeature:useSpellblade,attackModifiers:spellbladeAttack}},
    {id:'mh-necromancer',name:'Necromancer',displayName:'Некромант',source:'Mage Hand Press',license:'Original runtime implementation; feature names paraphrased',features:[{id:'charnelTouch',name:'Могильное касание',level:1,action:'action'},{id:'thralls',name:'Неживые слуги',level:2,action:'utility'},{id:'deadSpace',name:'Мёртвое пространство',level:2,action:'utility'},{id:'darkArcana',name:'Тёмная аркана',level:3,action:'bonus'},{id:'animateDead',name:'Оживление мёртвых',level:5,action:'utility'},{id:'criticalSpellcasting',name:'Критическое колдовство',level:5,action:'passive'},{id:'improvedThralls',name:'Улучшенные слуги',level:7,action:'passive'},{id:'improvedCriticalSpellcasting',name:'Улучшенное критическое колдовство',level:14,action:'passive'},{id:'undyingServitude',name:'Неумирающее служение',level:18,action:'reaction'},{id:'lichdom',name:'Личествование',level:20,action:'passive'}],subclasses:[{id:'deathKnight',name:'Death Knight',features:[]},{id:'overlord',name:'Overlord',features:[]},{id:'paleMaster',name:'Pale Master',features:[]}],hooks:{sync:syncNecromancer,useFeature:useNecromancer,attackModifiers:necromancerAttack}},
    {id:'mh-martyr',name:'Martyr',displayName:'Мученик',source:'Mage Hand Press',license:'Original runtime implementation; feature names paraphrased',features:[{id:'armorOfFaith',name:'Доспех веры',level:1,action:'utility'},{id:'miraculousHealing',name:'Чудесное исцеление',level:2,action:'action'},{id:'reprisal',name:'Воздаяние',level:2,action:'reaction'},{id:'sacrifice',name:'Жертвенный удар',level:3,action:'bonus'},{id:'sacrificeFoe',name:'Жертва врага',level:7,action:'passive'},{id:'divineRespite',name:'Божественная передышка',level:9,action:'utility'},{id:'undying',name:'Неумирающий',level:10,action:'reaction'},{id:'improvedSacrificialStrike',name:'Улучшенный жертвенный удар',level:11,action:'bonus'},{id:'marchUntoDestiny',name:'Шествие к судьбе',level:15,action:'passive'},{id:'finalMartyrdom',name:'Последнее мученичество',level:20,action:'action'}],subclasses:[{id:'mercy',name:'Burden of Mercy',features:[]},{id:'revolution',name:'Burden of Revolution',features:[]},{id:'truth',name:'Burden of Truth',features:[]},{id:'awakening',name:'Burden of Awakening',features:[]}],hooks:{sync:syncMartyr,useFeature:useMartyr}},
    {id:'sv-pugilist',name:'Pugilist',displayName:'Пугилист',source:'Benjamin Huffman / Sterling Vermin Adventuring Co.',license:'Original runtime implementation; source mechanics checked against current 5.5E class material',features:[
      {id:'fisticuffs',name:'Кулачный бой',level:1,action:'passive'},
      {id:'ironChin',name:'Железный подбородок',level:1,action:'utility'},
      {id:'braceUp',name:'Соберись',level:2,action:'bonus'},
      {id:'oldOneTwo',name:'Двойка',level:2,action:'bonus'},
      {id:'stickAndMove',name:'Ударил и отошёл',level:2,action:'bonus'},
      {id:'bloodiedButUnbowed',name:'Израненный, но не сломленный',level:3,action:'reaction'},
      {id:'haymaker',name:'Сокрушительный удар',level:5,action:'utility'},
      {id:'digDeep',name:'Соберись с силами',level:4,action:'bonus'},
      {id:'moxieFueledFists',name:'Кулаки, подпитанные Мокси',level:6,action:'passive'},
      {id:'fancyFootwork',name:'Вычурная работа ногами',level:7,action:'passive'},
      {id:'shakeItOff',name:'Стряхнуть с себя',level:7,action:'action'},
      {id:'downButNotOut',name:'Ещё не повержен',level:9,action:'passive'},
      {id:'schoolOfHardKnocks',name:'Школа суровой жизни',level:10,action:'passive'},
      {id:'rabbleRouser',name:'Задира',level:13,action:'passive'},
      {id:'unbreakable',name:'Несокрушимый',level:14,action:'reaction'},
      {id:'herculean',name:'Геркулесова сила',level:15,action:'passive'},
      {id:'fightingSpirit',name:'Боевой дух',level:18,action:'reaction'},
      {id:'peakPhysicalCondition',name:'Пиковая физическая форма',level:20,action:'passive'},
      {id:'chooseFightClub',name:'Выбор Бойцовского клуба',level:3,action:'utility'},
      {id:'personaLibre',name:'Свободная персона',level:3,action:'bonus'},
      {id:'workCrowd',name:'Работа с толпой',level:6,action:'action'},
      {id:'highFlyer',name:'Высокий полёт',level:11,action:'bonus'},
      {id:'signatureMove',name:'Фирменный приём',level:17,action:'special'},
      {id:'detectiveWork',name:'Детективная работа',level:3,action:'utility'},
      {id:'scrapLikeSleuth',name:'Дерись как сыщик',level:6,action:'bonus'},
      {id:'heartOfCity',name:'Сердце города',level:11,action:'utility'},
      {id:'eyesWideOpen',name:'Глаза широко открыты',level:17,action:'bonus'},
      {id:'summonHound',name:'Лучший друг бойца',level:3,action:'utility'},
      {id:'coordinatedAttack',name:'Слаженная атака',level:6,action:'reaction'},
      {id:'houndBestFriend',name:'Лучший друг гончей',level:11,action:'reaction'},
      {id:'direHound',name:'Лютый пёс',level:17,action:'passive'},
      {id:'blackMagic',name:'Чёрная магия',level:3,action:'utility'},
      {id:'dreadHand',name:'Рука Ужаса',level:3,action:'bonus'},
      {id:'dealWithDevil',name:'Сделка с Дьяволом',level:6,action:'utility'},
      {id:'grotesqueGrowth',name:'Гротескный рост',level:11,action:'bonus'},
      {id:'fountainViscera',name:'Фонтан внутренностей',level:17,action:'action'},
      {id:'saltySalute',name:'Солёное приветствие',level:3,action:'bonus'},
      {id:'heelstomper',name:'Топот пяткой',level:6,action:'bonus'},
      {id:'lowBlow',name:'Низкий удар',level:6,action:'bonus'},
      {id:'pocketSand',name:'Песок в кармане',level:6,action:'bonus'},
      {id:'meanOldCuss',name:'Старый грубиян',level:11,action:'reaction'},
      {id:'uncouthArt',name:'Искусство невоспитанности',level:17,action:'action'},
      {id:'compressionLock',name:'Компрессионный захват',level:3,action:'reaction'},
      {id:'quickPin',name:'Быстрый захват',level:3,action:'reaction'},
      {id:'toTheMat',name:'На ковёр',level:3,action:'bonus'},
      {id:'meatShield',name:'Живой щит',level:6,action:'reaction'},
      {id:'heavyweight',name:'Тяжеловес',level:11,action:'passive'},
      {id:'cleanFinish',name:'Чистое завершение',level:17,action:'passive'},
      {id:'bareKnuckleBoxer',name:'Боксёрская техника',level:3,action:'passive'},
      {id:'crossCounter',name:'Контрудар',level:3,action:'reaction'},
      {id:'oneTwoThreeFloor',name:'Раз-два-три — на пол',level:6,action:'bonus'},
      {id:'floatLikeButterfly',name:'Порхай как бабочка, жаль как пчела',level:11,action:'passive'},
      {id:'knockOut',name:'Нокаут',level:17,action:'special'}
    ],subclasses:[
      {id:'arenaRoyale',name:'Арена Рояль',features:['personaLibre','workCrowd','highFlyer','signatureMove']},
      {id:'bloodhoundBruisers',name:'Бладхаундские громилы',features:['detectiveWork','scrapLikeSleuth','heartOfCity','eyesWideOpen']},
      {id:'dogAndHound',name:'Пёс и гончая',features:['summonHound','coordinatedAttack','houndBestFriend','direHound']},
      {id:'handOfDread',name:'Рука Ужаса',features:['blackMagic','dreadHand','dealWithDevil','grotesqueGrowth','fountainViscera']},
      {id:'pissAndVinegar',name:'Ярость и дерзость',features:['saltySalute','heelstomper','lowBlow','pocketSand','meanOldCuss','uncouthArt']},
      {id:'squaredCircle',name:'Квадратный ринг',features:['compressionLock','quickPin','toTheMat','meatShield','heavyweight','cleanFinish']},
      {id:'sweetScience',name:'Благородное искусство',features:['bareKnuckleBoxer','crossCounter','oneTwoThreeFloor','floatLikeButterfly','knockOut']}
    ],hooks:{sync:syncPugilist,useFeature:usePugilist,attackModifiers:pugilistAttack}},
  ];
  packs.push(occultistPack,witchPack);
  // Public bridge used by class_features_engine: one source of truth for Accursed.
  global.accursedRuntime={
    sync:syncAccursed,
    useFeature:useAccursed,
    attackModifiers:accursedAttack,
    rest:function(h,type){
      if(!h||!hasClassForAccursed(h))return;
      var s=st(h).accursed||{};if(type==='long'){s.slotCurrent=(s.spellSlots||[0,0,0,0,0]).slice();s.suppressed=null;s.jinx=null;}
      if(type==='short'&&s.knownMetamorphoses.indexOf('fecundAffliction')>=0)s.fecundReady=true;
      syncAccursedResource(h);
    }
  };
  function hasClassForAccursed(h){return lvl(h,'Аккурсд')>0;}
  packs.forEach(function(p){D.registerClass(p);});
  global.DNDExpansionClasses={VERSION:'1.0.0',packs:packs.map(function(p){return p.id;})};
})(window);

