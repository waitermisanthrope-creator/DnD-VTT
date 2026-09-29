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

  function psiLimit(l){return Math.ceil(l/2);} function psiMax(l){return l;}
  function syncPsion(h){var l=lvl(h,'Psion');if(!l)return;var r=res(h,'psiPoints',l,'short');r.limit=psiLimit(l);var s=st(h);s.psionTalentsKnown=l>=18?8:l>=15?7:l>=12?6:l>=9?5:l>=7?4:l>=5?3:2;s.psionDisciplinesKnown=l>=18?3:2;s.psionMasteryFree=l>=17?3:l>=11?2:l>=5?1:0;s.psionInnate=s.psionInnate||{};}
  function warlordDice(l){return l>=17?7:l>=13?6:l>=9?5:l>=5?4:3;}
  function warlordDie(l){return l>=17?'d10':l>=11?'d8':l>=5?'d6':'d4';}
  function warlordDice(l){return l>=17?5:l>=11?4:l>=5?3:l>=2?2:0;}
  function warlordExploitKnown(l){return l>=17?10:l>=13?8:l>=11?7:l>=9?6:l>=7?5:l>=5?4:2;}
  function warlordLeadership(h){var s=st(h),x=s.warlordLeadership||'cha';return x==='int'?'int':x==='wis'?'wis':'cha';}
  function warlordDC(h){return 8+(Number(h.proficiencyBonus)||2)+mod(h,warlordLeadership(h));}
  function syncWarlord(h){
    var l=lvl(h,'Warlord');if(!l)return;
    var s=st(h),r=res(h,'warlordExploitDice',warlordDice(l),'short');
    r.max=warlordDice(l);r.die=warlordDie(l);
    var iw=res(h,'warlordInspiringWord',Math.min(7,Math.max(3,Math.floor((l+2)/3))),'short');
    iw.max=l>=17?7:l>=13?6:l>=9?5:l>=8?5:l>=4?4:3;
    s.warlordExploitKnown=warlordExploitKnown(l);
    s.warlordSaveDC=warlordDC(h);
    s.warlordLeadership=s.warlordLeadership||'cha';
    s.warlordRallyUses=l>=17?3:l>=13?2:1;
  }
  function useWarlord(h,id,ctx,feature){
    syncWarlord(h);ctx=ctx||{};var l=lvl(h,'Warlord'),s=st(h),t=target(ctx),lead=warlordLeadership(h),die=(h.resources&&h.resources.warlordExploitDice&&h.resources.warlordExploitDice.die)||warlordDie(l);
    if(id==='leadershipStyle'){
      var x=String(ctx.style||'');if(['cha','wis','int'].indexOf(x)<0)return{ok:false,message:'Выбери Капитана, Наставника или Стратега.'};
      s.warlordLeadership=x;return{ok:true,effect:{leadershipAbility:x},message:'🎖️ Стиль лидерства выбран.'};
    }
    if(id==='inspiringWord'){
      if(!t)return{ok:false,message:'Выбери союзника.'};
      if(!spend(h,'warlordInspiringWord',1))return{ok:false,message:'Вдохновляющее слово уже использовано до отдыха.'};
      var heal=diceRoll(ctx.hitDie||'d8')+mod(h,lead);
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
      return{ok:true,target:t.id,effect:{resistanceAll:true,advantageAllD20:true,durationRounds:1},message:'👑 Героический приказ.'};
    }
    if(id==='revitalizingOrder'){
      if(l<13||!t)return{ok:false,message:'Выбери союзника, погибшего не более минуты назад.'};
      return{ok:true,target:t.id,effect:{reviveHp:l+mod(h,lead)},message:'✨ Оживляющий приказ.'};
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
    s.wardenFontUses=l>=13?2:0;
    s.wardenSurviveReady=s.wardenSurviveReady!==false;
    s.wardenLegendaryResistance=l>=20?3:0;
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
      var fr=s.wardenFontUses||0;if(fr<=0)return{ok:false,message:'Источник жизни уже использован.'};
      s.wardenFontUses=fr-1;
      return{ok:true,effect:{endCondition:true,conditions:['blinded','charmed','deafened','frightened','paralyzed','poisoned','stunned','restrained'],noAction:true},message:'✨ Источник жизни: состояние снято.'};
    }
    if(id==='survive'){
      if(!s.wardenSurviveReady)return{ok:false,message:'Выжить уже использовано до долгого отдыха.'};
      s.wardenSurviveReady=false;
      return{ok:true,effect:{setHP:1,healHP:2*l},message:'🛡️ Выжить: вместо 0 HP остаётся 1 HP и восстанавливается '+(2*l)+' HP.'};
    }
    if(id==='legendaryResistance'){
      if((s.wardenLegendaryResistance||0)<=0)return{ok:false,message:'Легендарное сопротивление уже использовано.'};
      s.wardenLegendaryResistance--;
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
      if(s.alchemistPotions.length>=Math.max(1,mod(h,'intelligence')))return{ok:false,message:'Достигнут лимит приготовленных зелий.'};
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
  function usePsion(h,id,ctx,feature){
 syncPsion(h);ctx=ctx||{};if(id==='psionicPower')id='psiMastery';if(id==='mindThrust')id='telepathicIntrusion';if(id==='telekineticPush')id='telekineticForce';if(id==='forceSurge')id='elementalBlast';if(id==='mentalConstruct')id='astralConstruct';var l=lvl(h,'Psion'),s=st(h),r=h.resources.psiPoints,t=target(ctx),cost=Math.max(0,Number(ctx.psi)||0);
 if(cost>r.limit)return{ok:false,message:'За один эффект можно потратить не более '+r.limit+' очк. пси.'};
 if(id==='usePsi'){if(!cost||!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,effect:{psiSpent:cost},message:'🧠 Потрачено '+cost+' очк. пси.'};}
 if(id==='enhancingSurge'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{tempHp:'1d6',nextDamage:'1d6',extraTempHpDice:cost},message:'🧠 Усиливающий импульс применён.'};}
 if(id==='telekineticForce'||id==='telekineticPush'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:'str',forcedMoveFt:5*(1+cost),damage:cost?'1d8 psychic':null},message:'🧠 Телекинетическая сила применена.'};}
 if(id==='telepathicIntrusion'||id==='mindThrust'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:id==='mindThrust'?null:'wis',attackRoll:id==='mindThrust',damage:(1+cost)+'d8 psychic'},message:'🧠 Телепатическая атака применена.'};}
 if(id==='phaseRift'){if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,effect:{teleportFt:30+10*cost,passesThroughSolid:!!ctx.ethereal},message:'🌀 Фазовый разрыв активирован.'};}
 if(id==='elementalBlast'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{rangedSpellAttack:true,damage:(1+cost)+'d8 '+(ctx.element||'force')},message:'⚡ Элементальный взрыв.'};}
 if(id==='astralConstruct'){if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};s.astralConstruct={active:true,psi:cost};return{ok:true,effect:{summon:'astralConstruct',durationRounds:10,concentration:true,moveFt:30},message:'🜁 Астральная конструкция создана.'};}
 if(id==='projectItem')return{ok:true,effect:{createProjectedItem:true,maxSizeFt:3,maxWeightLb:10,durationRounds:10},message:'🜁 Предмет спроецирован.'};
 if(id==='seeing'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{advantageNextAttack:true},message:'👁️ Видение применено.'};}
 if(id==='denial'){if(!t)return{ok:false,message:'Выбери цель.'};cost=Math.max(1,cost);if(!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:'cha',endEffectPowerUpTo:cost},message:'🛑 Нейтрализация применена.'};}
 if(id==='mindLeech'){if(!t)return{ok:false,message:'Выбери цель.'};cost=Math.max(1,cost);if(!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:'wis',damage:cost+'d8 psychic',healSelf:'half psychic damage',restorePsi:1},message:'🩸 Пиявка разума применена.'};}
 if(id==='psiMastery')return{ok:true,effect:{freePsiPerTurn:s.psionMasteryFree||0},message:'🧠 Псионическое мастерство активно.'};
 if(id==='innatePsionics'){var sl=Number(ctx.spellLevel)||6;if(sl<6||sl>9||s.psionInnate[sl])return{ok:false,message:'Эта врождённая способность уже использована.'};s.psionInnate[sl]=true;return{ok:true,effect:{castSpell:ctx.spell||'выбранное заклинание',spellLevel:sl,requiresComponents:true},message:'🧠 Врождённая псионика применена.'};}
 if(id==='fullAwakening'){if(!spend(h,'psiPoints',2))return{ok:false,message:'Нужно 2 очка пси.'};return{ok:true,effect:{advantageAttackRolls:true,advantageSavingThrows:true,durationRounds:1},message:'🧠 Полное пробуждение.'};}
 if(id==='rampage'){s.rampageDie=s.rampageDie||'d4';var ds=['d4','d6','d8','d10','d12'],i=ds.indexOf(s.rampageDie);s.rampageDie=ctx.dealtDamage?ds[Math.min(4,i+1)]:'d4';return{ok:true,effect:{bonusDamageDie:s.rampageDie},message:'💥 Неистовствующий разум: '+s.rampageDie+'.'};}
 if(id==='unstoppableRampage')return{ok:true,effect:{zeroHpSave:'rampageDie+CON',restoreHP:1},message:'💥 Неудержимое неистовство готово.'};
 if(id==='ascension'){s.ascended=true;return{ok:true,effect:{etherealEntity:true,ghostPhysicalStats:true,retainMentalStats:true},message:'👻 Вознесение активировано.'};}
 if(id==='mentalConstruct')return usePsion(h,'astralConstruct',ctx,feature);
 if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
 return{ok:false,unsupported:true,message:'Способность Псионика зарегистрирована, но отдельный runtime-эффект ещё требует движка.'};
}
  function useWarlord(h,id,ctx,feature){syncWarlord(h);var t=target(ctx);if(id==='commandingStrike'){if(!t)return{ok:false,message:'Выбери союзника на поле.'};if(!spend(h,'commandDice',1))return{ok:false,message:'Нет кубов лидерства.'};return{ok:true,target:t.id,effect:{grantAttack:true,bonusDie:(h.resources&&h.resources.commandDice&&h.resources.commandDice.die)||dieFor(lvl(h,'Warlord'))},message:'⚔️ Commanding Strike: союзник получает усиление атаки.'};}if(id==='rallyingCry'){if(!spend(h,'commandDice',1))return{ok:false,message:'Нет кубов лидерства.'};return{ok:true,effect:{allyTempHp:Math.max(1,mod(h,'cha'))+Number(lvl(h,'Warlord'))},message:'📣 Rallying Cry: союзники получают временные HP.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function warlordAttack(h){return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};}

  function useWarden(h,id,ctx,feature){syncWarden(h);var t=target(ctx);if(id==='primalChallenge'){if(!t)return{ok:false,message:'Выбери врага на поле.'};if(!spend(h,'wardenEndurance',1))return{ok:false,message:'Нет костей выносливости.'};st(h).challengedTargetId=t.id;return{ok:true,target:t.id,effect:{marked:true},message:'🌿 Primal Challenge: цель помечена.'};}if(id==='earthshaker'){if(!spend(h,'wardenEndurance',2))return{ok:false,message:'Недостаточно костей выносливости.'};return{ok:true,effect:{aoeRadiusFt:10,damage:'2d6 bludgeoning',save:'str'},message:'🌿 Earthshaker: зона 10 ft подготовлена.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function wardenAttack(h,ctx){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.challengedTargetId&&ctx&&ctx.target&&String(s.challengedTargetId)===String(ctx.target.id)){o.extraDice.push(dieFor(lvl(h,'Warden')));o.notes.push('Primal Challenge');}return o;}

  function useSpellblade(h,id,ctx,feature){syncSpellblade(h);if(id==='spellstrike'){if(!spend(h,'arcaneSurges',1))return{ok:false,message:'Нет доступного арканного рывка.'};st(h).spellstrikePending=true;return{ok:true,effect:{spellstrike:true},message:'⚔️✨ Spellstrike: следующая атака может связать оружие и заклинание.'};}if(id==='arcaneGuard'){st(h).arcaneGuard=true;return{ok:true,effect:{tempHp:5+lvl(h,'Spellblade')},message:'✨ Arcane Guard активирован.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function spellbladeAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.spellstrikePending){o.extraDice.push('2d6');o.notes.push('Spellstrike');s.spellstrikePending=false;}return o;}

  function syncNecromancer(h){var l=lvl(h,'Некромант');if(!l)return;res(h,'charnelTouch',5*l,'long');res(h,'undyingServitude',l>=18?1:0,'long');var t=l>=20?6:l>=17?5:l>=13?4:l>=10?3:l>=7?3:l>=2?2:0;h.necromancerThrallsMax=t;h.necromancerThrallCRTotal=l>=20?4:l>=17?4:l>=13?3:l>=10?2:l>=7?1:l>=2?1:0;}
  function useNecromancer(h,id,ctx,feature){syncNecromancer(h);ctx=ctx||{};if(id==='charnelTouch'){var max=5*Math.max(1,Number(h.proficiencyBonus)||Math.floor((lvl(h,'Некромант')-1)/4)+2),cost=Math.max(1,Math.min(max,Number(ctx.points)||1));if(!spend(h,'charnelTouch',cost))return{ok:false,message:'Недостаточно энергии Могильного касания.'};return{ok:true,effect:{spellAttack:true,damage:cost+' necrotic'},message:'☠️ Могильное касание: '+cost+' некротического урона.'};}if(id==='darkArcana'){var slot=Math.max(1,Number(ctx.spellLevel)||1);var gain=Number(h.abilityScores&&h.abilityScores.intelligence||h.stats&&h.stats.int||10);gain=Math.floor((gain-10)/2)+Math.floor(3.5*slot);var r=h.resources&&h.resources.charnelTouch;if(!r)return{ok:false,message:'Ресурс Могильного касания не найден.'};r.current=Math.min(r.max,r.current+gain);return{ok:true,message:'☠️ Тёмная аркана: восстановлено '+gain+' очк.'};}if(id==='undyingServitude'){if(!spend(h,'undyingServitude',1))return{ok:false,message:'Неумирающее служение уже использовано.'};return{ok:true,effect:{restoreThrall:true,hitPoints:2*lvl(h,'Некромант')},message:'☠️ Слуга остаётся при 1 HP и восстанавливает '+(2*lvl(h,'Некромант'))+' HP.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'☠️ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность зарегистрирована; отдельная механика ещё не добавлена.'};}
  function necromancerAttack(h,ctx){var o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(lvl(h,'Некромант')>=5&&ctx&&ctx.spellAttack&&ctx.critical)o.forceCritical=false;if(lvl(h,'Некромант')>=5&&ctx&&ctx.spellAttack&&ctx.critical){o.notes.push('Критическое колдовство: критическое заклинательное попадание.');}return o;}
  function syncMartyr(h){var l=lvl(h,'Мученик');if(!l)return;res(h,'martyrSpellUses',[0,2,2,3,3,6,6,7,7,9,9,10,10,11,11,12,12,14,14,15,15][l]||2,'long');res(h,'divineRespite',l>=17?10:l>=13?6:3,'long');res(h,'undying',l>=10?1:0,'long');}
  function useMartyr(h,id,ctx,feature){syncMartyr(h);ctx=ctx||{};var l=lvl(h,'Мученик');if(id==='sacrificialStrike'){var dmg=l>=11?20:10;return{ok:true,effect:{selfRadiantDamage:l>=11?10:5,targetRadiantDamage:dmg,ignoreResistance:true},message:'✝️ Жертвенный удар: +'+dmg+' излучения ценой собственного HP.'};}if(id==='miraculousHealing'){var amount=Math.max(1,Number(ctx.amount)||Math.max(1,Math.floor(l/2)+mod(h,'wis')));return{ok:true,effect:{healHP:amount},amount:amount,message:'✝️ Чудесное исцеление: восстановить '+amount+' HP.'};}if(id==='sacrificeFoe'){return{ok:true,effect:{waiveSacrificeDamage:true},message:'✝️ Жертва врага: при добивании цели жертва не наносит тебе урон.'};}if(id==='divineRespite'){var r=h.resources&&h.resources.divineRespite;if(!spend(h,'divineRespite',1))return{ok:false,message:'Божественная передышка уже использована.'};return{ok:true,effect:{restoreHitDice:r.max},message:'✝️ Божественная передышка: можно восстановить до '+r.max+' КХ.'};}if(id==='undying'){if(!spend(h,'undying',1))return{ok:false,message:'Неумирающий уже использован.'};return{ok:true,effect:{setHP:1,triggerHealing:true},message:'✝️ Неумирающий: вместо 0 HP остаётся 1 HP.'};}if(id==='finalMartyrdom'){return{ok:true,effect:{durationMinutes:10,damageImmunity:true,conditionImmunity:true,advantageAllD20:true,castWish:true,deathAfterDuration:true},message:'✝️ Последнее мученичество активировано на 10 минут.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✝️ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность зарегистрирована; отдельная механика ещё не добавлена.'};}
  function syncVessel(h){var l=lvl(h,'Сосуд');if(!l)return;var s=st(h),cha=mod(h,'cha');res(h,'vesselMagicSlots',l>=18?4:l>=11?3:2,'short');s.vesselSpiritMantle=!!s.vesselSpiritMantle;s.vesselAspects=s.vesselAspects||[];s.vesselArchon=!!s.vesselArchon;s.vesselStrikeDie=l>=11?'1d10':l>=5?'1d8':'1d6';s.vesselSpellDC=8+(Number(h.proficiencyBonus)||2)+cha;}
  function useVessel(h,id,ctx,feature){syncVessel(h);var l=lvl(h,'Сосуд'),s=st(h),cha=mod(h,'cha');if(id==='spiritMantle'){s.vesselSpiritMantle=!s.vesselSpiritMantle;return{ok:true,message:'✨ Покров духа '+(s.vesselSpiritMantle?'проявлён.':'рассеян.')};}if(id==='iridescentStrike'){if(!s.vesselSpiritMantle)return{ok:false,message:'Иридисцентный удар требует Покров духа.'};return{ok:true,effect:{damage:(s.vesselStrikeDie||'1d6')+' radiant',ability:'cha'},message:'✨ Иридисцентный удар нанесён.'};}if(id==='archonForm'){if(!s.vesselSpiritMantle)return{ok:false,message:'Сначала прояви Покров духа.'};if(!spend(h,'vesselMagicSlots',1))return{ok:false,message:'Нет свободного слота магии Сосуда.'};s.vesselArchon=true;return{ok:true,effect:{tempHp:Math.max(1,Number(h.abilityScores&&h.abilityScores.charisma)||10)+2*l,durationMinutes:10},message:'👁️ Форма архонта активирована.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Сосуда зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function vesselAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.vesselSpiritMantle)o.notes.push('Покров духа: атаки могут использовать Charisma.');return o;}
  function syncAccursed(h){var l=lvl(h,'Аккурсд');if(!l)return;var s=st(h);res(h,'accursedSpellSlots',l>=18?4:l>=11?3:2,'long');s.accursedJinx=s.accursedJinx||{};s.accursedMetamorphoses=s.accursedMetamorphoses||[];s.accursedSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'cha');}
  function useAccursed(h,id,ctx,feature){syncAccursed(h);var s=st(h),t=target(ctx);if(id==='jinx'){if(!t)return{ok:false,message:'Выбери цель для Сглаза.'};s.accursedJinx={targetId:t.id,expiresRounds:2};return{ok:true,target:t.id,effect:{nextAttackOrCheckDisadvantage:true},message:'🩸 Сглаз наложен.'};}if(id==='suppressCurse'){if(!spend(h,'accursedSpellSlots',1))return{ok:false,message:'Нет свободной ячейки заклинаний Аккурсда.'};return{ok:true,effect:{suppressCurse:true,durationRounds:10},message:'🩸 Подавление проклятия активно на 10 раундов.'};}if(id==='afflictCurse'){if(!t)return{ok:false,message:'Выбери цель для проклятия.'};if(!spend(h,'accursedSpellSlots',1))return{ok:false,message:'Нет свободной ячейки заклинаний Аккурсда.'};return{ok:true,target:t.id,effect:{curseSave:'wis',curseDurationRounds:10},message:'🩸 Проклятие поражает цель.'};}if(id==='metamorphosis'){var name=ctx&&ctx.name?String(ctx.name):'Воинский путь';if(s.accursedMetamorphoses.indexOf(name)<0)s.accursedMetamorphoses.push(name);return{ok:true,message:'🩸 Метаморфоза выбрана: '+name+'.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🩸 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Аккурсда зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function accursedAttack(h,ctx){var l=lvl(h,'Аккурсд'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.accursedMetamorphoses.indexOf('Воинский путь')>=0&&ctx&&ctx.weaponAttack)o.extraDice.push(l>=17?'3d6':l>=11?'2d6':'1d6');return o;}
  function runeCount(l){var t=[0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,10,10];return t[Math.max(1,Math.min(20,l))]||2;}
  function syncRuneKeeper(h){var l=lvl(h,'Рунный хранитель');if(!l)return;var s=st(h),n=runeCount(l);s.inscribedRunes=Array.isArray(s.inscribedRunes)?s.inscribedRunes:[];if(s.inscribedRunes.length>n)s.inscribedRunes=s.inscribedRunes.slice(0,n);s.runeStance=s.runeStance||null;s.runeSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'int');}
  function useRuneKeeper(h,id,ctx,feature){syncRuneKeeper(h);var s=st(h),n=runeCount(lvl(h,'Рунный хранитель'));if(id==='inscribeRune'){var name=ctx&&ctx.rune?String(ctx.rune):'Руна';if(s.inscribedRunes.indexOf(name)<0){if(s.inscribedRunes.length>=n)s.inscribedRunes.shift();s.inscribedRunes.push(name);}return{ok:true,message:'🔷 Руна «'+name+'» вписана: '+s.inscribedRunes.length+'/'+n+'.'};}if(id==='runeStance'){var stance=ctx&&ctx.stance?String(ctx.stance):'Разрушение';if(['Разрушение','Защита'].indexOf(stance)<0)return{ok:false,message:'Неизвестная рунная стойка.'};s.runeStance=stance;return{ok:true,effect:{radiusFt:lvl(h,'Рунный хранитель')>=18?30:10},message:'🔷 Рунная стойка: '+stance+'.'};}if(id==='invokeRune'){if(!s.inscribedRunes.length)return{ok:false,message:'Нет вписанных рун.'};var rune=ctx&&ctx.rune?String(ctx.rune):s.inscribedRunes[0];return{ok:true,effect:{runeInert:rune},message:'🔷 Руна «'+rune+'» призвана и становится инертной.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Рунного хранителя зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function runeKeeperAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.runeStance==='Разрушение'&&s.inscribedRunes.length)o.notes.push('Разрушение: дополнительный урон зависит от числа вписанных рун.');return o;}
  function shifterCR(l){var t=[0,0,0.25,0.5,1,1,1,2,2,2,3,3,3,4,4,5,5,5,6,6,6];return t[Math.max(1,Math.min(20,l))]||0;}
  function shifterDie(l){return l>=11?'1d12':l>=5?'1d10':'1d8';}
  function syncShifter(h){var l=lvl(h,'Шифтер');if(!l)return;var s=st(h),con=Math.max(1,mod(h,'con'));res(h,'shifterAdrenaline',l>=20?Math.max(1,con):Math.max(1,con),'short');res(h,'shifterPrimevalForm',l>=17?3:0,'long');s.shifterMaxCR=shifterCR(l);s.shifterShifted=!!s.shifterShifted;s.shifterBloodline=s.shifterBloodline||'Водная';s.shifterSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'con');s.shifterAttackBonus=(Number(h.proficiencyBonus)||2)+mod(h,'con');}
  function useShifter(h,id,ctx,feature){syncShifter(h);var l=lvl(h,'Шифтер'),s=st(h),t=target(ctx),con=Math.max(1,mod(h,'con'));if(id==='shift'){s.shifterShifted=!s.shifterShifted;return{ok:true,effect:{beastShape:s.shifterShifted,maxCR:s.shifterMaxCR,saveDC:s.shifterSaveDC,attackBonus:s.shifterAttackBonus},message:'🐾 Дикая форма '+(s.shifterShifted?'активирована. Максимальный CR: '+s.shifterMaxCR+'.':'завершена.')};}if(id==='learnShape'){if(!t)return{ok:false,message:'Выбери живого не враждебного зверя для изучения формы.'};if(l<2)return{ok:false,message:'Первобытная связь доступна со 2 уровня.'};return{ok:true,effect:{learnBeastShape:t.id,maxCR:s.shifterMaxCR},message:'🐾 Новая звериная форма изучена.'};}if(id==='adrenalineSurge'){if(!spend(h,'shifterAdrenaline',1))return{ok:false,message:'Нет доступных всплесков адреналина.'};return{ok:true,effect:{tempHp:Number(ctx&&ctx.damage)||0,durationRounds:10},message:'🔥 Всплеск адреналина: получен временный HP, равный полученному урону.'};}if(id==='primalResilience'){if(!spend(h,'shifterAdrenaline',1))return{ok:false,message:'Нет доступного всплеска адреналина.'};return{ok:true,effect:{saveBonus:con},message:'🛡️ Первобытная стойкость: +'+con+' к спасброску.'};}if(id==='primevalForm'){if(!spend(h,'shifterPrimevalForm',1))return{ok:false,message:'Нет доступной Первобытной формы.'};return{ok:true,effect:{primeval:true,resistance:['bludgeoning','piercing','slashing'],strDexSaveAdvantage:true},message:'🐾 Первобытная форма усилена.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🐾 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Шифтера зарегистрирована, но её отдельный эффект ещё не реализован.'};}
  function shifterAttack(h,ctx){var l=lvl(h,'Шифтер'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.shifterShifted&&l>=5){o.notes.push('Дикий воин: звериная форма получает усиленные действия.');}if(l>=5&&ctx&&ctx.naturalWeapon)o.notes.push('Мистические удары: природные атаки считаются магическими.');return o;}
  function savantIntellectDie(l){return l>=17?'d12':l>=13?'d10':l>=9?'d8':l>=5?'d6':'d4';}
  function syncSavant(h){var l=lvl(h,'Савант');if(!l)return;var s=st(h),die=savantIntellectDie(l);s.savantIntellectDie=die;s.savantFocusId=s.savantFocusId||null;s.savantFocusExpires=Number(s.savantFocusExpires)||0;s.savantFocusData=s.savantFocusData||{};s.savantReactions=l>=17?4:l>=11?3:l>=5?2:1;s.savantSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'int');}
  function useSavant(h,id,ctx,feature){syncSavant(h);var l=lvl(h,'Савант'),s=st(h),t=target(ctx),die=s.savantIntellectDie;if(id==='adroitAnalysis'){if(!t)return{ok:false,message:'Выбери видимую цель для анализа.'};s.savantFocusId=t.id;s.savantFocusExpires=10;return{ok:true,target:t.id,effect:{focus:true,focusDurationRounds:10,predictiveDodge:true},message:'🧠 Цель изучена и стала Фокусом.'};}if(id==='potentObservation'){if(!spend(h,'savantReaction',1)&&false)return{ok:false,message:'Нет реакции.'};return{ok:true,effect:{addDie:die},message:'🧠 Мощное наблюдение: добавь '+die+' к подходящему броску союзника.'};}if(id==='calculatedFlourish'){return{ok:true,effect:{acBonusDie:die},message:'🧠 Расчётный манёвр: +'+die+' к AC против этой атаки.'};}if(id==='flawlessAnalysis'){if(!t)return{ok:false,message:'Выбери Фокус.'};s.savantFlawlessUsed=s.savantFlawlessUsed||{};if(s.savantFlawlessUsed[t.id])return{ok:false,message:'Безупречный анализ уже использован против этой цели после долгого отдыха.'};s.savantFlawlessUsed[t.id]=true;return{ok:true,target:t.id,effect:{save:'int',focusDebuff:true,allySaveAdvantageFt:30,durationRounds:1},message:'🧠 Безупречный анализ применён.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🧠 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Саванта зарегистрирована, но её отдельный эффект ещё не реализован.'};}
  function savantAttack(h,ctx){var l=lvl(h,'Савант'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.savantFocusId&&ctx&&ctx.target&&String(s.savantFocusId)===String(ctx.target.id)){o.notes.push('Изученная цель: можно использовать Intelligence для атаки и урона.');o.extraDice.push(s.savantIntellectDie||savantIntellectDie(l));}return o;}
  function bloodHunterLvl(h){return lvl(h,'Кровавый охотник');}
  function bloodDie(l){return l>=17?'1d10':l>=11?'1d8':l>=5?'1d6':'1d4';}
  function hemMod(h){var a=h.abilities||{},v=a.int||a.INT||a.intelligence||a.INTELLIGENCE||10,w=a.wis||a.WIS||a.wisdom||a.WISDOM||10;return Math.max(0,Math.floor(((Number(v)>10?Number(v):10)-10)/2));}
  function hemSave(h){return 8+(Number(h.proficiencyBonus)||2)+hemMod(h);}
  function bloodCurseUses(l){return l>=17?4:l>=13?3:l>=6?2:1;}
  function syncBloodHunter(h){
    var l=bloodHunterLvl(h);if(!l)return;
    var s=st(h),d=bloodDie(l);
    var r=res(h,'bloodMaledict',bloodCurseUses(l),'short');r.die=d;
    s.bhHemocraftDie=d;s.bhHemocraftSaveDC=hemSave(h);s.bhActiveRites=s.bhActiveRites||{};s.bhKnownCurses=s.bhKnownCurses||[];
    s.bhBrand=s.bhBrand||null;s.bhFightingStyle=s.bhFightingStyle||null;
    s.bhCrimsonRitesKnown=s.bhCrimsonRitesKnown||['flame'];
    s.bhRiteDamageDie=d;
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
    if(id==='hybridMastery'){var rm=res(h,'bhHybridTransformation',999,'short');rm.max=999;rm.current=999;return{ok:true,effect:{unlimitedHybrid:true},message:'🐺 Мастерство гибридной формы: превращение больше не ограничено.'};}
    if(id==='brandAxiom'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.axiom=true;return{ok:true,effect:{endIllusion:true,endInvisibility:true,shapeChangeSave:'wis',stunOnFail:true},message:'🔻 Клеймо аксиомы раскрывает истинную форму цели.'};}
    if(id==='otherworldlyPatron'){s.bhPatron=String(ctx.patron||'Великий Древний');var patrons=['Архифея','Исчадие','Великий Древний','Бессмертный','Небожитель','Клинок проклятия','Глубинный','Джинн','Нежить'];if(patrons.indexOf(s.bhPatron)<0)return{ok:false,message:'Неизвестный потусторонний покровитель.'};return{ok:true,effect:{patron:s.bhPatron},message:'📜 Покровитель выбран: '+s.bhPatron+'.'};}
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
      if(!spend(h,'bloodMaledict',1))return{ok:false,message:'Нет доступного использования Кровавого проклятия.'};
      if(!t&&curse!=='exposure'&&curse!=='eyeless'&&curse!=='fallenPuppet'&&curse!=='howl'&&curse!=='soulEater')return{ok:false,message:'Выбери цель.'};
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
      if(l>=18){uses.max=999;uses.current=999;}
      if(!spend(h,'bhHybridTransformation',1)&&l<18)return{ok:false,message:'Нет доступного превращения.'};
      s.bhHybrid=!s.bhHybrid;
      return{ok:true,effect:{hybrid:s.bhHybrid,advantageStr:true,resistance:['bludgeoning','piercing','slashing'],unarmedDamage:l>=11?'1d8':'1d6',bonusDamage:l>=18?3:l>=11?2:1,bonusAC:1},message:'🐺 Гибридная форма '+(s.bhHybrid?'активирована.':'завершена.')};
    }
    if(id==='lycanBloodlust'){
      return{ok:true,effect:{save:'wis',dc:8,directAttackNearestIfFailed:true},message:'🐺 Кровожадность: проверь спасбросок Мудрости при низком HP.'};
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
      s.bhMutagens=s.bhMutagens||[];if(s.bhMutagens.indexOf(name)<0)s.bhMutagens.push(name);
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
      return{ok:true,effect:{slots:slots,slotLevel:slotLevel,cantrips:l>=10?3:2,spellsKnown:Math.min(11,2+Math.max(0,l-5)),ability:'int'},message:'📜 Договорная магия: ячейки '+slots+' уровня '+slotLevel+'.'};
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
      {id:'bloodMaledict',name:'Кровавое проклятие',level:1,action:'bonus'},
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

  function illriggerLevel(h){return lvl(h,'Иллирригер');}
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
      var turn=ctx.turnId===undefined?null:String(ctx.turnId);
      if(turn!==null&&s.illriggerSealPlacedTurn===turn)return{ok:false,message:'В этом ходу печать уже поставлена.'};
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет доступных печатей.'};
      s.illriggerSealTargets[t.id]=(Number(s.illriggerSealTargets[t.id])||0)+1;
      if(turn!==null)s.illriggerSealPlacedTurn=turn;
      return{ok:true,target:t.id,effect:{seal:true,duration:'until target dies or seal is burned'},message:'🔻 Зловещее запрещение: печать наложена.'};
    }
    if(id==='burnSeal'){
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
      if(s.illriggerBoons.length>=illriggerBoonCount(l)&&s.illriggerBoons.indexOf(b)<0)return{ok:false,message:'Достигнут лимит даров Интердикта.'};
      if(s.illriggerBoons.indexOf(b)<0)s.illriggerBoons.push(b);
      return{ok:true,effect:{boon:b},message:'🔻 Дар Интердикта выбран: '+b+'.'};
    }
    if(id==='abatingSeal'){
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати для Ослабляющей печати.'};
      return{ok:true,effect:{damageReduction:'1d10+'+Math.floor(l/2),rangeFt:30,reaction:true},message:'🛡️ Ослабляющая печать уменьшает получаемый урон.'};
    }
    if(id==='soulEater'){
      var burn=illriggerBurn(h,t&&t.id||ctx.targetId,1);if(!burn.ok)return burn;
      burn.effect.tempHp=l;burn.message='🩸 Пожиратель душ: получено '+l+' временных HP.';return burn;
    }
    if(id==='shadowShroud'){
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет свободной печати.'};
      return{ok:true,effect:{acBonus:2,durationMinutes:1,targetSelfOrTouch:true},message:'🌑 Теневая завеса: +2 к AC.'};
    }
    if(id==='conflagrantChannel'){
      var bc=illriggerBurn(h,t&&t.id||ctx.targetId,1);if(!bc.ok)return bc;
      bc.effect.damageType='fire';bc.effect.disadvantageNextSave=true;return bc;
    }
    if(id==='unleashHell'){
      if(!spend(h,'illriggerSeals',1))return{ok:false,message:'Нет печати.'};
      return{ok:true,effect:{areaRadiusFt:10,damage:'3d6 fire',save:'dex'},message:'🔥 Высвободить Ад: огненный взрыв.'};
    }
    if(id==='infernalConduit'||id==='invigorate'||id==='devour'){
      var cr=h.resources&&h.resources.illriggerConduit;if(!cr||!spend(h,'illriggerConduit',Math.max(1,Number(ctx.dice)||1)))return{ok:false,message:'Нет кубов Инфернального проводника.'};
      var n=Math.max(1,Number(ctx.dice)||1);
      if(id==='invigorate')return{ok:true,target:t&&t.id,effect:{heal:n+'d10',selfNecrotic:n+'d10'},message:'🔥 Инфернальный проводник: союзник исцелён ценой твоей крови.'};
      if(!t)return{ok:false,message:'Выбери цель для Пожирания.'};
      return{ok:true,target:t.id,effect:{save:'con',damage:n+'d10 necrotic',healSelf:'half'},message:'☠️ Пожирание: инфернальная энергия вырвана из цели.'};
    }
    if(id==='invokeHell'){
      var inv=String(ctx.option||'');var known=['infernalEdict','hellishCommand','bloodRitual','shadowStep','ruinSpell'];
      if(known.indexOf(inv)<0)return{ok:false,message:'Для этого контракта ещё не выбран вариант Призыва Ада.'};
      if(!spend(h,'illriggerInvokeHell',1))return{ok:false,message:'Призыв Ада уже использован до отдыха.'};
      return{ok:true,target:t&&t.id,effect:{invokeHell:inv,saveDC:s.illriggerSaveDC},message:'🔥 Призыв Ада: '+inv+'.'};
    }
    if(id==='bloodPrice'){
      if(l<10||!s.illriggerBloodPriceReady||ctx.hitDieAvailable===false)return{ok:false,message:'Кровавая цена недоступна: нужен доступный КХ.'};
      s.illriggerBloodPriceReady=true;return{ok:true,effect:{expendHitDie:true,saveBonus:'1d10',selfUsesHitDie:true},message:'🩸 Кровавая цена: потрать КХ и добавь его результат к проваленному спасброску.'};
    }
    if(id==='terrorizingForce'){
      var typ=String(ctx.damageType||'necrotic');if(['cold','fire','necrotic','poison'].indexOf(typ)<0)return{ok:false,message:'Допустимы холод, огонь, некротический или яд.'};
      s.illriggerTerrorType=typ;return{ok:true,effect:{extraDamage:'1d8 '+typ,durationMinutes:1},message:'😈 Терроризирующая сила: '+typ+'.'};
    }
    if(id==='superiorInterdict'){
      return{ok:true,effect:{sealDamageIgnoresResistance:true,restoreOneSealLongRest:true},message:'🔻 Высший интердикт: урон печатей игнорирует сопротивление.'};
    }
    if(id==='infernalMajesty'){
      s.illriggerMajesty=true;return{ok:true,effect:{durationRounds:10,resistance:['cold','fire','necrotic'],flyFt:60,bloodPriceAura:true,terrorDie:'1d10',rebirthInHell:true},message:'👑 Инфернальное величие активировано.'};
    }
    if(id==='masterOfHell'){
      var form=String(ctx.form||'inferno');if(['inferno','pestilence','darkness'].indexOf(form)<0)return{ok:false,message:'Выбери Инферно, Чуму или Тьму.'};
      return{ok:true,effect:{areaRadiusFt:20,damage:form==='inferno'?'8d6 fire':form==='pestilence'?'8d6 poison/necrotic':'8d6 cold',save:form==='darkness'?'con':'dex',condition:form==='darkness'?'blinded':form==='pestilence'?'poisoned':null},message:'☠️ Повелитель Ада: '+form+'.'};
    }
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Способность Иллирригера зарегистрирована, но её отдельная автоматизация требует дополнительного UI.'};
  }
  function illriggerAttack(h,ctx){
    var s=st(h),l=illriggerLevel(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};
    if(s.illriggerTerrorType&&l>=11)o.extraDice.push('1d8 '+s.illriggerTerrorType);
    if(s.illriggerMajesty&&l>=17)o.extraDice.push('1d10 necrotic_or_fire');
    if(s.illriggerMastery==='Ложь')o.notes.push('Оружейная атака может использовать Харизму.');
    if(s.illriggerMastery==='Неукротимый')o.notes.push('Бонус к спасброскам зависит от числа врагов рядом.');
    return o;
  }
  function illriggerContractFeature(h,id,ctx){
    syncIllrigger(h);ctx=ctx||{};var l=illriggerLevel(h),s=st(h),t=target(ctx);
    if(id==='architectBlessing')return{ok:true,effect:{extraKnowledgeSkill:true,language:'дополнительный язык'},message:'📚 Благословение Архитектора активно.'};
    if(id==='architectSpellcasting')return{ok:true,effect:{oneThirdCaster:true,ability:'charisma',spellSaveDC:illriggerSaveDC(h)},message:'🔮 Магия Архитектора разрушения доступна.'};
    if(id==='hellspeakerCommand')return{ok:true,effect:{charmOrCompel:true,save:'wis',saveDC:illriggerSaveDC(h)},message:'🗣️ Воля Говорящего с Адом применена.'};
    if(id==='painkillerArmor')return{ok:true,effect:{heavyArmor:true},message:'🛡️ Палач боли получает владение тяжёлой бронёй.'};
    if(id==='painkillerPunishment'){if(!t)return{ok:false,message:'Выбери атакующего врага.'};return{ok:true,target:t.id,effect:{reactionDamage:'2d8 fire_or_psychic',mark:true},message:'⚔️ Наказание активировано.'};}
    if(id==='sanguineRitual'){if(!t)return{ok:false,message:'Выбери цель.'};var n=Math.max(1,Number(ctx.seals)||1);var b=illriggerBurn(h,t.id,n);if(!b.ok)return b;b.effect.healAlly=n+'d8';b.effect.tempHpAlly=n+'d8';return{ok:true,target:t.id,effect:b.effect,message:'🩸 Кровавый ритуал: жизненная сила направлена союзнику.'};}
    if(id==='shadowStep')return{ok:true,effect:{invisible:true,durationRounds:1,teleportFt:30},message:'🌑 Теневой шаг активирован.'};
    if(id==='shadowAssassin'){if(!t)return{ok:false,message:'Выбери помеченную цель.'};return{ok:true,target:t.id,effect:{advantageFirstAttack:true,extraDamage:'2d6'},message:'🗡️ Теневой убийца: преимущество против цели с печатью.'};
    }
    if(id==='contractInvoke')return useIllrigger(h,'invokeHell',ctx);
    return{ok:false,unsupported:true,message:'Способность контракта '+id+' требует отдельного действия/условия.'};
  }

  function pugilistLevel(h){return lvl(h,'Пугилист');}
  function pugilistDie(l){return l>=17?'1d12':l>=11?'1d10':l>=5?'1d8':'1d6';}
  function pugilistMoxieMax(l){var t=[0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,12];return t[Math.max(1,Math.min(20,l))]||0;}
  function syncPugilist(h){
    var l=pugilistLevel(h);if(!l)return;
    var s=st(h),r=res(h,'pugilistMoxie',pugilistMoxieMax(l),'short');
    r.max=pugilistMoxieMax(l);r.die=pugilistDie(l);
    s.pugilistMoxie=r.value;s.pugilistDie=pugilistDie(l);
    s.pugilistIronChin=l>=1;s.pugilistMagicFists=l>=6;
    s.pugilistBloodiedReady=s.pugilistBloodiedReady!==false;
  }
  function usePugilist(h,id,ctx,feature){
    syncPugilist(h);ctx=ctx||{};var l=pugilistLevel(h),s=st(h),r=h.resources&&h.resources.pugilistMoxie;
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
      return{ok:true,effect:{choose:['shove','dash','disengage']},message:'👊 Ударил и отошёл: выбери Толчок, Рывок или Отход.'};
    }
    if(id==='bloodiedButUnbowed'){
      if((Number(h.hp)||0)>((Number(h.maxHp)||0)/2))return{ok:false,message:'Эта способность срабатывает, когда HP падают до половины или ниже.'};
      var rr=h.resources&&h.resources.pugilistMoxie;if(rr)rr.value=rr.max;
      s.pugilistBloodiedReady=false;
      return{ok:true,effect:{tempHp:l+mod(h,'con'),restoreMoxie:true},message:'🩸 Израненный, но не сломленный: Мокси восстановлено.'};
    }
    if(id==='digDeep'){
      return{ok:true,effect:{resistance:['bludgeoning','piercing','slashing'],durationMinutes:1,after:{exhaustion:1}},message:'💪 Соберись с силами: сопротивление физическому урону на 1 минуту.'};
    }
    if(id==='haymaker'){
      return{ok:true,effect:{attackDisadvantage:true,maximizeDamageDice:true,duration:'turn'},message:'💥 Сокрушительный удар: атаки получают помеху, кости урона максимальны.'};
    }
    if(id==='shakeItOff'){
      return{ok:true,effect:{endConditions:['charmed','frightened']},message:'🧠 Стряхнуто Очарование/Испуг.'};
    }
    if(id==='unbreakable'){
      if(ctx.failedSave===false)return{ok:false,message:'Переброс используется после провала спасброска.'};
      cost=1;if(!spend(h,'pugilistMoxie',cost))return{ok:false,message:'Недостаточно Мокси для переброса.'};
      return{ok:true,effect:{rerollSave:true,ability:['str','dex','con']},message:'🛡️ Несокрушимый: спасбросок переброшен.'};
    }
    if(id==='fightingSpirit'){
      if((Number(h.hp)||0)>0)return{ok:false,message:'Боевой дух срабатывает при падении до 0 HP.'};
      if((Number(s.pugilistExhaustion)||0)>=4)return{ok:false,message:'Слишком высокий уровень истощения.'};
      s.pugilistExhaustion=(Number(s.pugilistExhaustion)||0)+1;
      if(r)r.value=Math.ceil(r.max/2);
      return{ok:true,effect:{setHp:Math.ceil((Number(h.maxHp)||1)/2),restoreMoxie:'half',exhaustion:1},message:'🔥 Боевой дух: Пугилист возвращается в бой.'};
    }
    if(id==='fisticuffs')return{ok:true,effect:{damageDie:pugilistDie(l),bonusActionUnarmedOrGrapple:true,magical:l>=6},message:'🥊 Кулачный бой активен: '+pugilistDie(l)+'.'};
    if(id==='ironChin')return{ok:true,effect:{armorClass:'12 + Constitution modifier',requires:['light_or_no_armor','no_shield']},message:'🛡️ Железный подбородок: AC считается через Телосложение.'};
    if(id==='fancyFootwork')return{ok:true,effect:{acrobaticsProficiency:true},message:'👟 Вычурная работа ногами: владение Акробатикой.'};
    if(id==='downButNotOut')return{ok:true,effect:{bonusDamage:'proficiency bonus',durationMinutes:1,requires:'Bloodied but Unbowed'},message:'🩸 Ещё не повержен: атаки получают дополнительный урон.'};
    if(id==='schoolOfHardKnocks')return{ok:true,effect:{physicalResistance:true,advantageAgainst:['prone','incapacitated']},message:'🥊 Школа суровой жизни активна.'};
    if(id==='rabbleRouser')return{ok:true,effect:{settlementCarousingAdvantage:['persuasion','intimidation']},message:'🍻 Задира: социальное преимущество после каруза в поселении.'};
    if(id==='herculean')return{ok:true,effect:{carryingCapacityMultiplier:2,objectMeleeDamageMultiplier:2,standingJump:'running_start_distance'},message:'💪 Геркулесова сила активна.'};
    if(id==='peakPhysicalCondition')return{ok:true,effect:{strengthMaxBonus:2,constitutionMaxBonus:2,maxScore:22,shortRestExhaustionRecovery:2,shortRestAllHitDice:true},message:'🏆 Пиковая физическая форма достигнута.'};
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Эта способность Пугилиста зарегистрирована, но отдельная UI-команда ещё требует подключения.'};
  }
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

    {id:'mcdm-illrigger',name:'Illrigger',displayName:'Иллирригер',source:'MCDM Productions — The Illrigger Revised 1.0',license:'Original runtime implementation; source mechanics checked against public class material',features:[{id:'balefulInterdict',name:'Зловещее запрещение',level:1,action:'bonus',target:'enemy',rangeFt:30},{id:'burnSeal',name:'Сжечь печать',level:1,action:'special',target:'enemy'},{id:'forkedTongue',name:'Раздвоенный язык',level:1,action:'passive'},{id:'combatMastery',name:'Боевая специализация',level:2,action:'utility'},{id:'interdictBoon',name:'Дар Интердикта',level:2,action:'utility'},{id:'invokeHell',name:'Призыв Ада',level:3,action:'action'},{id:'infernalConduit',name:'Инфернальный проводник',level:6,action:'action'},{id:'bloodPrice',name:'Кровавая цена',level:10,action:'reaction'},{id:'terrorizingForce',name:'Терроризирующая сила',level:11,action:'bonus'},{id:'superiorInterdict',name:'Высший интердикт',level:14,action:'passive'},{id:'infernalMajesty',name:'Инфернальное величие',level:17,action:'bonus'},{id:'masterOfHell',name:'Повелитель Ада',level:20,action:'action'}],subclasses:[{id:'architect',name:'Архитектор разрушения',features:[{id:'architectBlessing',name:'Благословение Архитектора',level:3,action:'passive'},{id:'architectSpellcasting',name:'Магия Архитектора',level:3,action:'utility'}]},{id:'hellspeaker',name:'Говорящий с Адом',features:[{id:'hellspeakerCommand',name:'Инфернальное убеждение',level:3,action:'action'}]},{id:'painkiller',name:'Палач боли',features:[{id:'painkillerArmor',name:'Тяжёлая броня',level:3,action:'passive'},{id:'painkillerPunishment',name:'Наказание',level:7,action:'reaction'}]},{id:'sanguine',name:'Кровавый рыцарь',features:[{id:'sanguineRitual',name:'Кровавый ритуал',level:3,action:'action'}]},{id:'shadowmaster',name:'Повелитель теней',features:[{id:'shadowStep',name:'Теневой шаг',level:3,action:'bonus'},{id:'shadowAssassin',name:'Теневой убийца',level:7,action:'attack'}]}],hooks:{sync:syncIllrigger,useFeature:useIllrigger,attackModifiers:illriggerAttack,subclassUse:illriggerContractFeature}},

    {id:'ll-shifter',name:'Shifter',displayName:'Шифтер',source:'LaserLlama / third-party',license:'Original runtime implementation',features:[{id:'shift',name:'Дикая форма',level:1,action:'bonus'},{id:'learnShape',name:'Изучить звериную форму',level:2,action:'action',target:'beast'},{id:'adrenalineSurge',name:'Всплеск адреналина',level:6,action:'reaction'},{id:'primalResilience',name:'Первобытная стойкость',level:10,action:'reaction'},{id:'primevalForm',name:'Первобытная форма',level:11,action:'bonus'}],subclasses:[{id:'aquatic',name:'Водная',features:[]},{id:'avian',name:'Птичья',features:[]},{id:'brute',name:'Грубая',features:[]},{id:'carnivore',name:'Хищная',features:[]},{id:'insect',name:'Насекомая',features:[]},{id:'reptilian',name:'Рептильная',features:[]},{id:'vermin',name:'Паразитная',features:[]}],hooks:{sync:syncShifter,useFeature:useShifter,attackModifiers:shifterAttack}},
    {id:'ll-savant',name:'Savant',displayName:'Савант',source:'LaserLlama / third-party',license:'Original runtime implementation; source mechanics checked against current public class',features:[{id:'adroitAnalysis',name:'Искусный анализ',level:1,action:'bonus',target:'enemy',rangeFt:60},{id:'potentObservation',name:'Мощное наблюдение',level:2,action:'reaction',rangeFt:30},{id:'calculatedFlourish',name:'Расчётный манёвр',level:5,action:'reaction'},{id:'flawlessAnalysis',name:'Безупречный анализ',level:15,action:'action',target:'enemy'}],subclasses:[{id:'archaeologist',name:'Археолог',features:[]},{id:'investigator',name:'Исследователь',features:[]},{id:'naturalist',name:'Натуралист',features:[]},{id:'physician',name:'Врач',features:[]},{id:'mentor',name:'Наставник',features:[]},{id:'tactician',name:'Тактик',features:[]}],hooks:{sync:syncSavant,useFeature:useSavant,attackModifiers:savantAttack}},

    {id:'ll-vessel',name:'Vessel',displayName:'Сосуд',source:'laserllama / third-party',license:'Original runtime implementation',features:[{id:'spiritMantle',name:'Покров духа',level:1,action:'bonus'},{id:'iridescentStrike',name:'Иридисцентный удар',level:1,action:'attack'},{id:'unsealedAspects',name:'Нераскрытые аспекты',level:1,action:'utility'},{id:'archonForm',name:'Форма архонта',level:3,action:'bonus'}],subclasses:[{id:'ascended',name:'Вознесённый',features:[]},{id:'cataclysm',name:'Катаклизм',features:[]},{id:'cursed',name:'Проклятый',features:[]},{id:'fallen',name:'Падший',features:[]},{id:'formless',name:'Бесформенный',features:[]},{id:'trickster',name:'Трикстер',features:[]}],hooks:{sync:syncVessel,useFeature:useVessel,attackModifiers:vesselAttack}},
    {id:'sv-accursed',name:'Accursed',displayName:'Аккурсд',source:'Ross Leiser / Sterling Vermin Adventuring Co.',license:'Original runtime implementation',features:[{id:'jinx',name:'Сглаз',level:1,action:'bonus',target:'enemy'},{id:'suppressCurse',name:'Подавление проклятия',level:2,action:'action'},{id:'afflictCurse',name:'Поражение проклятием',level:2,action:'action',target:'enemy'},{id:'metamorphosis',name:'Метаморфоза проклятия',level:2,action:'utility'}],subclasses:[{id:'curse',name:'Проклятие',features:[]}],hooks:{sync:syncAccursed,useFeature:useAccursed,attackModifiers:accursedAttack}},
    {id:'ip-runekeeper',name:'RuneKeeper',displayName:'Рунный хранитель',source:'Taron Pounds / Indestructoboy',license:'Original runtime implementation',features:[{id:'inscribeRune',name:'Вписать руну',level:1,action:'utility'},{id:'runeStance',name:'Рунная стойка',level:2,action:'bonus'},{id:'invokeRune',name:'Призвать руну',level:1,action:'action'}],subclasses:[{id:'dethek',name:'Детек',features:[]},{id:'fiendish',name:'Инфернский',features:[]},{id:'ghukliak',name:'Гуклиак',features:[]},{id:'jotun',name:'Йотун',features:[]},{id:'iokharic',name:'Иокхарик',features:[]},{id:'supernal',name:'Высший',features:[]}],hooks:{sync:syncRuneKeeper,useFeature:useRuneKeeper,attackModifiers:runeKeeperAttack}},

    {id:'kibbles-psion',name:'Psion',displayName:'Псионик',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'psionicPower',name:'Псионическая сила',level:1,action:'bonus',description:'Усилить следующий подходящий псionic эффект.'},{id:'mindThrust',name:'Ментальный удар',level:1,action:'action',target:'enemy',rangeFt:60,description:'Псионическая атака по выбранной цели.'},{id:'telekineticPush',name:'Телекинетический толчок',level:2,action:'action',target:'enemy',rangeFt:60,description:'Принудительно переместить цель.'}],subclasses:[{id:'awakened',name:'Пробуждённый',features:[{id:'telepathy',name:'Телепатия',level:3,action:'passive'}]},{id:'unleashed',name:'Освобождённый',features:[{id:'forceSurge',name:'Всплеск силы',level:3,action:'bonus'}]},{id:'transcended',name:'Возвысившийся',features:[{id:'bodyMind',name:'Тело и разум',level:3,action:'passive'}]},{id:'shaper',name:'Создатель',features:[{id:'mentalConstruct',name:'Ментальная конструкция',level:3,action:'action'}]}],hooks:{sync:syncPsion,useFeature:usePsion,attackModifiers:psionAttack}},
    {id:'kibbles-warlord',name:'Warlord',displayName:'Военачальник',source:'Laserllama — Warlord v3.3.0',license:'Original runtime implementation; source mechanics checked against public class material',features:[
      {id:'leadershipStyle',name:'Стиль лидерства',level:1,action:'utility'},
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
      {id:'dauntless',name:'Неустрашимый',level:20,action:'passive'}
    ],subclasses:[
      {id:'chivalry',name:'Рыцарство',features:[]},{id:'dread',name:'Ужас',features:[]},{id:'ferocity',name:'Свирепость',features:[]},{id:'gallantry',name:'Галантерея',features:[]},{id:'schemes',name:'Интриги',features:[]},{id:'tactics',name:'Тактика',features:[]},
      {id:'claws',name:'Когти',features:[]},{id:'counsel',name:'Совет',features:[]},{id:'liberty',name:'Свобода',features:[]},{id:'navigators',name:'Навигаторы',features:[]},{id:'order',name:'Порядок',features:[]},{id:'zeal',name:'Рвение',features:[]}
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
      {id:'peakPhysicalCondition',name:'Пиковая физическая форма',level:20,action:'passive'}
    ],subclasses:[
      {id:'arenaRoyale',name:'Арена Рояль',features:[]},
      {id:'bloodhoundBruisers',name:'Бладхаундские громилы',features:[]},
      {id:'dogAndHound',name:'Пёс и гончая',features:[]},
      {id:'pissAndVinegar',name:'Ярость и дерзость',features:[]},
      {id:'squaredCircle',name:'Квадратный ринг',features:[]},
      {id:'sweetScience',name:'Благородное искусство',features:[]}
    ],hooks:{sync:syncPugilist,useFeature:usePugilist,attackModifiers:pugilistAttack}},
  ];
  packs.push(occultistPack,witchPack);
  packs.forEach(function(p){D.registerClass(p);});
  global.DNDExpansionClasses={VERSION:'1.0.0',packs:packs.map(function(p){return p.id;})};
})(window);

