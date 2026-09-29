/**
 * ghost_extra_runtime.js — Extra-класс «Призрак».
 *
 * Фундаментально отличается от обоих Паразитов:
 * это не организм, а душа. Тело — мёртвая оболочка/якорь, а не источник
 * жизни. HP оболочки НИКОГДА не восстанавливаются лечением или отдыхом.
 * Призрак может покинуть оболочку и существовать в бесплотной форме.
 */
(function(g){
  'use strict';

  var PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];

  function mod(score){ return Math.floor((Number(score||10)-10)/2); }
  function pb(level){ return PB[Math.max(0,Math.min(20,Number(level)||1))]||2; }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

  var levels={};
  for(var i=1;i<=20;i++) levels[i]={features:[]};

  levels[1]={
    features:['Духовное ядро','Мёртвая оболочка','Бесплотное отделение'],
    details:{
      'Духовное ядро':'Интеллект, Мудрость и Харизма принадлежат самому Призраку и сохраняются при любой смене оболочки.',
      'Мёртвая оболочка':'Сила, Ловкость, Телосложение, КД, скорость и физические атаки берутся из выбранного мёртвого тела. Оболочка не является живым организмом.',
      'Бесплотное отделение':'Бонусным действием Призрак может выйти из оболочки и стать бесплотным. В этой форме он не использует физические характеристики тела и получает собственный набор духовных параметров.'
    }
  };
  levels[2]={features:['Потустороннее зрение','Шёпот мёртвых'],details:{
    'Потустороннее зрение':'Призрак видит в обычной и магической темноте на 60 футов и ощущает нежить/духовные сущности в пределах 30 футов.',
    'Шёпот мёртвых':'Вы можете говорить без голоса и слышать ответы умерших существ; это не возвращает им жизнь и не гарантирует правдивость.'
  }};
  levels[3]={features:['Призрачная специализация'],subclassLevel:true};
  levels[4]={features:['Увеличение характеристик или Черта'],asi:true};
  levels[5]={features:['Призрачный рывок','Вторая атака'],details:{
    'Призрачный рывок':'В бесплотной форме скорость полёта увеличивается до 40 футов. При выходе из оболочки можно переместиться на 10 футов без провоцирования атак.',
    'Вторая атака':'Когда вы совершаете действие Атака, вы можете совершить две атаки.'
  }};
  levels[6]={features:['Особенность специализации']};
  levels[7]={features:['Проникновение в материю'],details:{
    'Проникновение в материю':'В бесплотной форме можете проходить сквозь существ и предметы как через трудную местность. Если заканчиваете ход внутри твёрдого объекта, получаете 1к10 урона силовым полем и перемещаетесь в ближайшее свободное пространство.'
  }};
  levels[8]={features:['Увеличение характеристик или Черта'],asi:true};
  levels[9]={features:['Нечеловеческая стойкость'],details:{
    'Нечеловеческая стойкость':'В бесплотной форме сопротивление немагическому дробящему, колющему и рубящему урону. В оболочке эта защита не действует.'
  }};
  levels[10]={features:['Второе воплощение'],details:{
    'Второе воплощение':'За один долгий отдых вы можете создать новую привязку к подходящему мёртвому телу, не получая лечения старой оболочки. Переселение меняет физические характеристики, но не разум.'
  }};
  levels[11]={features:['Усиленная манифестация'],details:{
    'Усиленная манифестация':'Ваши духовные атаки наносят дополнительную 1к6 некротического или психического урона, выбранного при проявлении.'
  }};
  levels[12]={features:['Увеличение характеристик или Черта'],asi:true};
  levels[13]={features:['Эфирный шаг'],details:{
    'Эфирный шаг':'Бонусным действием 1/короткий отдых переходите в Бесплотную форму и обратно без ограничения обычного перемещения.'
  }};
  levels[14]={features:['Особенность специализации']};
  levels[15]={features:['Ужас присутствия'],details:{
    'Ужас присутствия':'Действием 1/короткий отдых существа по вашему выбору в радиусе 30 футов совершают спасбросок Мудрости. При провале Испуганны до конца следующего хода.'
  }};
  levels[16]={features:['Увеличение характеристик или Черта'],asi:true};
  levels[17]={features:['Разрыв привязи'],details:{
    'Разрыв привязи':'Вы больше не обязаны оставаться рядом с оболочкой. В бесплотной форме можете удалиться от неё на любое расстояние; пока оболочка существует, вы знаете её направление.'
  }};
  levels[18]={features:['Особенность специализации']};
  levels[19]={features:['Эпический дар'],asi:true};
  levels[20]={features:['Вечный дух'],details:{
    'Вечный дух':'Раз в долгий отдых при уничтожении оболочки вы не теряете персонажа. Вы переходите в бесплотную форму с 1 HP духовного ядра и можете найти новую мёртвую оболочку в течение 24 часов.'
  }};

  var subclasses={
    'Полтергейст':{
      description:'Призрак, который воздействует на материальный мир силой воли и телекинезом.',
      levels:{3:['Телекинетический толчок'],6:['Летающий предмет'],14:['Буря предметов'],18:['Хозяин пространства']}
    },
    'Мститель':{
      description:'Дух, связанный с причиной своей смерти и превращающий боль в оружие.',
      levels:{3:['Метка виновного'],6:['Месть из могилы'],14:['Неумолимый преследователь'],18:['Последний приговор']}
    },
    'Блуждающий':{
      description:'Призрак без постоянного места, мастер переходов между материальным и эфирным мирами.',
      levels:{3:['Эфирный странник'],6:['Проход сквозь стену'],14:['Двойное существование'],18:['Владыка границы']}
    },
    'Кошмарник':{
      description:'Дух, который атакует разум, сны и восприятие живых.',
      levels:{3:['Кошмарный шёпот'],6:['Сон наяву'],14:['Паника толпы'],18:['Ночь без рассвета']}
    }
  };

  var spiritAttacks={
    'Призрачное касание':{range:5,damage:'1d8',type:'некротический'},
    'Удар души':{range:30,damage:'1d6',type:'психический'}
  };

  function ensure(hero){
    hero=hero||{};
    hero.isExtraClass=true;
    hero.extraClassType='ghost';
    hero.replacesRace=true;
    hero.multiclassAllowed=false;
    hero.ghost=hero.ghost||{};
    var s=hero.ghost;
    if(!Array.isArray(s.bodyHistory))s.bodyHistory=[];
    if(!Array.isArray(s.anchors))s.anchors=[];
    if(!s.stage)s.stage='embodied';
    if(typeof s.spiritHP!=='number')s.spiritHP=Math.max(1,Number(hero.hpMax)||8);
    if(typeof s.spiritMaxHP!=='number')s.spiritMaxHP=s.spiritHP;
    if(typeof s.form!=='string')s.form='оболочка';
    return hero;
  }

  function createShell(target,hero){
    target=target||{}; hero=ensure(hero);
    var src=target.stats||{};
    var bodyStats={
      str:Number(src.str!==undefined?src.str:10),
      dex:Number(src.dex!==undefined?src.dex:10),
      con:Number(src.con!==undefined?src.con:10)
    };
    var mental=hero.stats||{};
    return {
      type:'ghostDeadShell',
      sourceId:target.id||target.uuid||null,
      sourceName:target.name||target.nameRu||'Мёртвая оболочка',
      creatureType:target.creatureType||target.type||'Гуманоид',
      size:target.size||'Средний',
      physicalStats:bodyStats,
      mentalStats:{
        int:Number(mental.int||10),wis:Number(mental.wis||10),cha:Number(mental.cha||10)
      },
      maxHP:Math.max(1,Number(target.hpMax||target.maxHP||target.hp||8)),
      currentHP:Math.max(0,Number(target.hpMax||target.maxHP||target.hp||8)),
      ac:Number(target.ac||target.baseAC||10+mod(bodyStats.dex)),
      speed:target.speed||'30 футов',
      dead:true,
      healingBlocked:true
    };
  }

  function bindShell(hero,target){
    hero=ensure(hero);
    if(!target || !(target.isDead===true || target.dead===true || Number(target.hpCurrent||target.currentHP||target.hp||0)<=0)){
      return {ok:false,reason:'Призраку нужна мёртвая оболочка.'};
    }
    var shell=createShell(target,hero);
    hero.ghost.shell=shell;
    hero.ghost.stage='embodied';
    hero.ghost.form='оболочка';
    hero.ghost.bodyHistory.push({sourceId:shell.sourceId,sourceName:shell.sourceName,time:Date.now()});
    syncShell(hero);
    return {ok:true,shell:shell};
  }

  function syncShell(hero){
    hero=ensure(hero);
    var sh=hero.ghost.shell;
    if(!sh)return hero;
    var mental=sh.mentalStats;
    hero.stats={
      str:sh.physicalStats.str,dex:sh.physicalStats.dex,con:sh.physicalStats.con,
      int:mental.int,wis:mental.wis,cha:mental.cha
    };
    hero.hpMax=sh.maxHP;
    hero.hpCurrent=sh.currentHP;
    hero.ac=sh.ac;
    hero.baseAC=sh.ac;
    hero.speed=sh.speed;
    hero.raceName='Мёртвая оболочка: '+sh.sourceName;
    hero.hostName=sh.sourceName;
    return hero;
  }

  function enterSpiritForm(hero){
    hero=ensure(hero);
    hero.ghost.form='дух';
    hero.ghost.stage='incorporeal';
    hero.hpMax=hero.ghost.spiritMaxHP;
    hero.hpCurrent=hero.ghost.spiritHP;
    var mental=hero.stats||{};
    hero.stats={
      str:6,dex:16,con:10,
      int:Number(mental.int||10),wis:Number(mental.wis||10),cha:Number(mental.cha||10)
    };
    hero.ac=13+mod(hero.stats&&hero.stats.dex);
    hero.baseAC=hero.ac;
    hero.speed='40 футов, полёт (парение)';
    hero.raceName='Призрак — бесплотная форма';
    return {ok:true};
  }

  function returnToShell(hero){
    hero=ensure(hero);
    var sh=hero.ghost.shell;
    if(!sh || sh.currentHP<=0)return {ok:false,reason:'Оболочка уничтожена.'};
    hero.ghost.form='оболочка';
    hero.ghost.stage='embodied';
    syncShell(hero);
    return {ok:true};
  }

  function damageShell(hero,amount){
    hero=ensure(hero);
    var sh=hero.ghost.shell;
    if(!sh)return {ok:false,reason:'Нет оболочки.'};
    sh.currentHP=clamp(sh.currentHP-Math.max(0,Number(amount)||0),0,sh.maxHP);
    if(sh.currentHP<=0){
      sh.currentHP=0;
      enterSpiritForm(hero);
      hero.ghost.stage='incorporeal';
    }else{
      syncShell(hero);
    }
    return {ok:true,currentHP:sh.currentHP,shellDestroyed:sh.currentHP<=0};
  }

  function healShell(){ return {ok:false,healed:0,reason:'Мёртвую оболочку Призрака невозможно лечить.'}; }
  function canReceiveHealing(hero){
    return !!(hero && hero.extraClassType!=='ghost');
  }
  function canRestHealBody(){ return false; }

  function possessLiving(hero,target,saveRoll){
    hero=ensure(hero);
    if(hero.ghost.form!=='дух')return {ok:false,reason:'Для вселения сначала покиньте оболочку.'};
    var dc=8+pb(hero.level)+mod(hero.stats&&hero.stats.cha);
    var total=Number(saveRoll)+(Number(target&&target.saveBonus)||0);
    if(total>=dc)return {ok:false,saved:true,dc:dc};
    hero.ghost.possession={
      targetId:target&&target.id||null,
      targetName:target&&target.name||'Живой носитель',
      target:target||null
    };
    hero.ghost.stage='possessing';
    hero.ghost.form='одержимость';
    return {ok:true,saved:false,dc:dc,target:hero.ghost.possession};
  }

  function endPossession(hero){
    hero=ensure(hero);
    if(!hero.ghost.possession)return {ok:false,reason:'Призрак никого не одержал.'};
    var p=hero.ghost.possession;
    hero.ghost.possession=null;
    hero.ghost.stage='incorporeal';
    hero.ghost.form='дух';
    return {ok:true,target:p.target};
  }

  function useSpiritAbility(hero,key,target){
    hero=ensure(hero);
    var level=Number(hero.level)||1;
    var dc=8+pb(level)+mod(hero.stats&&hero.stats.cha);
    var abilities={
      'Призрачный крик':{range:30,save:'Мудрость',dc:dc,effect:'1к6 психического урона и Испуган до конца следующего хода.',uses:'1/короткий отдых'},
      'Хождение сквозь стены':{effect:'Перемещение сквозь немагические объекты как через трудную местность.',duration:'до конца хода',uses:'1/короткий отдых'},
      'Удар души':{range:30,damage:'1к6 + мод. Харизмы',type:'психический'}
    };
    return abilities[key]||{ok:false,reason:'Неизвестная духовная способность.'};
  }

  function useSubclassFeature(hero,key,target){
    hero=ensure(hero);
    var level=Number(hero.level)||1;
    var dc=8+pb(level)+mod(hero.stats&&hero.stats.cha);
    var map={
      'Телекинетический толчок':{ok:level>=3,dc:dc,effect:'Бонусным действием толкаете существо в 30 фт. на 10 фт. при провале спасброска Силы.'},
      'Летающий предмет':{ok:level>=6,effect:'Действием поднимаете и перемещаете предмет массой до 30 кг на 30 фт.; предмет может нанести 1к8 дробящего урона.'},
      'Буря предметов':{ok:level>=14,effect:'1/короткий отдых создаёте область 15 фт.; существа внутри получают 2к6 дробящего урона при провале спасброска Ловкости.'},
      'Хозяин пространства':{ok:level>=18,effect:'В радиусе 30 фт. вы можете бонусным действием переместить до трёх свободных предметов или существ на 10 фт. каждый.'},
      'Метка виновного':{ok:level>=3,effect:'Бонусным действием помечаете существо, связанное с вашей смертью; первый удар по нему за ход наносит +1к6 некротического урона.'},
      'Месть из могилы':{ok:level>=6,effect:'Когда помеченная цель наносит вам урон, следующая атака по ней имеет преимущество.'},
      'Неумолимый преследователь':{ok:level>=14,effect:'Вы всегда знаете направление к своей помеченной цели на расстоянии до 1 мили.'},
      'Последний приговор':{ok:level>=18,dc:dc,effect:'1/долгий отдых: помеченная цель совершает спасбросок Мудрости; при провале Испугана и получает 4к8 психического урона.'},
      'Эфирный странник':{ok:level>=3,effect:'Вы можете переходить в бесплотную форму без провоцирования атак и получаете +10 футов к её скорости.'},
      'Проход сквозь стену':{ok:level>=6,effect:'В бесплотной форме проходите сквозь магические барьеры, если они не предназначены специально для удержания духов.'},
      'Двойное существование':{ok:level>=14,effect:'1/короткий отдых можете действовать в бесплотной форме и одновременно сохранять связь с оболочкой в радиусе 60 фт.'},
      'Владыка границы':{ok:level>=18,effect:'Переход между оболочкой и духом становится бонусным действием без ограничения один раз за ход.'},
      'Кошмарный шёпот':{ok:level>=3,dc:dc,effect:'Действием цель в 30 фт. совершает спасбросок Мудрости или получает 1к6 психического урона и помеху на следующую проверку.'},
      'Сон наяву':{ok:level>=6,dc:dc,effect:'1/короткий отдых цель в 30 фт. совершает спасбросок Мудрости или становится Замедленной до конца следующего хода.'},
      'Паника толпы':{ok:level>=14,dc:dc,effect:'1/долгий отдых существа по вашему выбору в радиусе 20 фт. совершают спасбросок Мудрости или Испуганы на 1 минуту.'},
      'Ночь без рассвета':{ok:level>=18,dc:dc,effect:'1/долгий отдых создаёте 20-футовую ауру тьмы на 1 минуту; враги внутри совершают спасброски Мудрости в начале своего хода или получают 2к6 психического урона.'}
    };
    return map[key]||{ok:false,reason:'Неизвестная особенность специализации.'};
  }

  function getSummary(hero){
    hero=ensure(hero);
    var sh=hero.ghost.shell;
    return {
      stage:hero.ghost.stage,form:hero.ghost.form,
      shellName:sh?sh.sourceName:null,shellHP:sh?sh.currentHP:0,shellMaxHP:sh?sh.maxHP:0,
      spiritHP:hero.ghost.spiritHP,spiritMaxHP:hero.ghost.spiritMaxHP
    };
  }

  var progression={
    className:'Призрак',englishName:'Ghost',
    source:'Project Extra / самостоятельный дизайн',
    status:'implemented_foundation_v1',
    isExtra:true,isRaceClassHybrid:true,replacesRace:true,multiclassAllowed:false,
    hitDie:8,primaryStat:'charisma',secondaryStats:['wisdom','intelligence'],
    savingThrows:['wisdom','charisma'],armor:[],weapons:[],tools:[],
    skills:['История','Проницательность','Запугивание','Восприятие','Скрытность','Религия'],
    skillChoices:2,subclassLevel:3,levels:levels,
    mechanics:{
      deadShell:true,spiritForm:true,possession:true,
      mentalStatsPersist:true,physicalStatsFromShell:true,
      shellHealing:false,restHealing:false,multiclass:'Запрещён'
    }
  };

  function normalizeCharacter(hero){
    hero=ensure(hero);
    if(hero.ghost.shell && hero.ghost.form==='оболочка')syncShell(hero);
    return hero;
  }

  g.GHOST_EXTRA={
    PB:PB,progression:progression,subclasses:subclasses,
    spiritAttacks:spiritAttacks,normalizeCharacter:normalizeCharacter,
    ensure:ensure,createShell:createShell,bindShell:bindShell,
    enterSpiritForm:enterSpiritForm,returnToShell:returnToShell,
    damageShell:damageShell,healShell:healShell,
    canReceiveHealing:canReceiveHealing,canRestHealBody:canRestHealBody,
    possessLiving:possessLiving,endPossession:endPossession,
    useSpiritAbility:useSpiritAbility,useSubclassFeature:useSubclassFeature,getSummary:getSummary
  };

  if(g.ghostProgression && typeof g.ghostProgression==='object') Object.assign(g.ghostProgression,progression);
  else g.ghostProgression=progression;

  if(!g.EXTRA_BODY_RUNTIME){
    g.EXTRA_BODY_RUNTIME={version:'0.2.0',shouldSuppressRestHP:function(hero){return !!(hero&&hero.extraClassType==='ghost');}};
  }else{
    var old=g.EXTRA_BODY_RUNTIME.shouldSuppressRestHP;
    g.EXTRA_BODY_RUNTIME.shouldSuppressRestHP=function(hero){
      return !!(hero&&hero.extraClassType==='ghost') || (typeof old==='function'&&old(hero));
    };
  }
})(window);
