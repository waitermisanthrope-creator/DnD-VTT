/**
 * parasite_extra_runtime.js — Extra-класс «Паразит».
 *
 * ЧТО ЭТО:
 * Полностью проектная система Extra-класса, который одновременно заменяет расу
 * и обычный класс. Паразит является разумным организмом, а хозяин — отдельным
 * телом/статблоком. Интеллект, Мудрость и Харизма принадлежат Паразиту и
 * сохраняются при переселении; Сила, Ловкость и Телосложение берутся из тела.
 *
 * КЛЮЧЕВЫЕ API:
 * - window.PARASITE_EXTRA / window.parasiteRuntime
 * - createHostStatBlock(target, hero)
 * - createLarvaStatBlock(hero)
 * - bindHost(hero, target)
 * - releaseToLarva(hero)
 * - captureHost(hero, target)
 * - canRestHealBody(hero)
 *
 * ВАЖНО:
 * Паразит не является мультиклассом. У него одна закрытая ветка 1–20.
 * HP тела не восстанавливаются коротким/долгим отдыхом автоматически.
 * Лечение тела будет добавляться только через биологические механики Паразита,
 * его хозяина и подклассов.
 */
(function(g){
  "use strict";

  var PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
  var ASI=[4,8,12,16,19];
  var MUTATION_SLOTS={1:0,5:1,9:2,13:3,17:4};

  function mod(score){ return Math.floor((Number(score||10)-10)/2); }
  function pb(level){ return PB[Math.max(0,Math.min(20,Number(level)||1))]||2; }

  /*
   * Статблок хозяина хранится отдельно от героя.
   * originalStats — исходные характеристики цели.
   * effectiveStats — физика цели + разум Паразита.
   */
  function createHostStatBlock(target, hero){
    target=target||{};
    hero=hero||{};
    var sourceStats=target.stats||{};
    var mind=hero.stats||{};
    var physical={
      str:Number(sourceStats.str!==undefined?sourceStats.str:(target.str||10)),
      dex:Number(sourceStats.dex!==undefined?sourceStats.dex:(target.dex||10)),
      con:Number(sourceStats.con!==undefined?sourceStats.con:(target.con||10))
    };
    var mental={
      int:Number(mind.int!==undefined?mind.int:10),
      wis:Number(mind.wis!==undefined?mind.wis:10),
      cha:Number(mind.cha!==undefined?mind.cha:10)
    };
    var original={
      str:physical.str,dex:physical.dex,con:physical.con,
      int:Number(sourceStats.int!==undefined?sourceStats.int:10),
      wis:Number(sourceStats.wis!==undefined?sourceStats.wis:10),
      cha:Number(sourceStats.cha!==undefined?sourceStats.cha:10)
    };
    return {
      type:"parasiteHost",
      sourceId:target.id||target.uuid||null,
      sourceName:target.name||target.nameRu||"Захваченная цель",
      creatureType:target.creatureType||target.type||"Гуманоид",
      size:target.size||"Средний",
      originalStats:original,
      effectiveStats:Object.assign({},physical,mental),
      physicalStats:physical,
      parasiteMind:mental,
      maxHP:Math.max(1,Number(target.hpMax||target.maxHP||target.hp||8)),
      currentHP:Math.max(0,Number(target.hpCurrent||target.currentHP||target.hp||8)),
      ac:Number(target.ac||target.baseAC||10+mod(physical.dex)),
      speed:target.speed||"30 футов",
      senses:target.senses||[],
      resistances:target.resistances||[],
      immunities:target.immunities||[],
      naturalAttacks:Array.isArray(target.weaponsData)?target.weaponsData.slice():[],
      capturedAt:Date.now()
    };
  }

  function createLarvaStatBlock(hero){
    hero=hero||{};
    var s=hero.stats||{};
    var level=Number(hero.level)||1;
    var hp=Math.max(1,Math.min(10+level, 4+level));
    return {
      type:"parasiteLarva",
      creatureType:"Аберрация",
      size:"Крошечный",
      maxHP:hp,
      currentHP:hp,
      ac:13+mod(s.dex),
      speed:"20 футов, лазание 20 футов",
      stats:{
        str:4,dex:16,con:10,
        int:Number(s.int||10),wis:Number(s.wis||10),cha:Number(s.cha||10)
      },
      mentalSource:"Паразит",
      attacks:["Укус личинки"],
      canEnterHost:true,
      canCaptureHost:true
    };
  }

  function ensure(hero){
    hero=hero||{};
    hero.isExtraClass=true;
    hero.extraClassType="parasite";
    hero.replacesRace=true;
    hero.multiclassAllowed=false;
    hero.parasite=hero.parasite||{};
    var p=hero.parasite;
    if(!Array.isArray(p.mutations))p.mutations=[];
    if(!Array.isArray(p.absorbedTraits))p.absorbedTraits=[];
    if(!Array.isArray(p.hostHistory))p.hostHistory=[];
    if(typeof p.symbiosis!=="number")p.symbiosis=50;
    if(!p.stage)p.stage="hosted";
    return hero;
  }

  function bindHost(hero,target){
    hero=ensure(hero);
    hero.parasite.host=createHostStatBlock(target,hero);
    hero.parasite.stage="hosted";
    hero.parasite.larva=null;
    hero.parasite.hostHistory.push({
      sourceId:hero.parasite.host.sourceId,
      sourceName:hero.parasite.host.sourceName,
      time:Date.now()
    });
    syncBody(hero);
    return hero.parasite.host;
  }

  function syncBody(hero){
    hero=ensure(hero);
    var h=hero.parasite.host;
    if(!h)return;
    hero.stats=Object.assign({},h.effectiveStats);
    hero.hpMax=h.maxHP;
    hero.hpCurrent=h.currentHP;
    hero.ac=h.ac;
    hero.baseAC=h.ac;
    hero.speed=h.speed;
    hero.raceName=h.sourceName;
    hero.hostName=h.sourceName;
    return hero;
  }

  function releaseToLarva(hero,hostDestroyed){
    hero=ensure(hero);
    var h=hero.parasite.host;
    if(!h)return createLarvaStatBlock(hero);
    hero.parasite.lastReleasedHost=h;
    hero.parasite.hostDestroyed=!!hostDestroyed;
    hero.parasite.larva=createLarvaStatBlock(hero);
    hero.parasite.larva.currentHP=hero.parasite.larva.maxHP;
    hero.parasite.host=null;
    hero.parasite.stage="larva";
    hero.hpMax=hero.parasite.larva.maxHP;
    hero.hpCurrent=hero.parasite.larva.currentHP;
    hero.ac=hero.parasite.larva.ac;
    hero.baseAC=hero.parasite.larva.ac;
    hero.speed=hero.parasite.larva.speed;
    hero.raceName="Паразит — личинка";
    return hero.parasite.larva;
  }

  function captureHost(hero,target){
    hero=ensure(hero);
    if(hero.parasite.stage!=="larva" && hero.parasite.host){
      return {ok:false,reason:"У Паразита уже есть хозяин."};
    }
    bindHost(hero,target);
    return {ok:true,host:hero.parasite.host};
  }

  function setSymbiosis(hero,value){
    hero=ensure(hero);
    hero.parasite.symbiosis=Math.max(0,Math.min(100,Number(value)||0));
    return hero.parasite.symbiosis;
  }

  function adjustSymbiosis(hero,delta){
    return setSymbiosis(hero,(hero.parasite&&hero.parasite.symbiosis||50)+Number(delta||0));
  }

  function mutationSlots(level){
    var n=0;
    Object.keys(MUTATION_SLOTS).forEach(function(k){
      if(level>=Number(k))n=MUTATION_SLOTS[k];
    });
    return n;
  }

  /*
   * Лечение:
   * Паразит не получает HP от короткого/долгого отдыха.
   * Это не означает иммунитет к любому лечению: целевые эффекты лечения
   * будут разрешаться отдельным API, которое проверяет тело/симбиоз.
   */
  function canRestHealBody(hero){
    return !(hero && hero.extraClassType==="parasite");
  }

  var mutations={
    "Хищный обмен":{
      description:"После убийства существа Паразит может извлечь биомассу и восстановить часть HP хозяина. Работает только через отдельную механику питания.",
      effectKey:"predatoryFeed"
    },
    "Плотный покров":{
      description:"Паразит создаёт защитный слой поверх тела хозяина. Бонус к КД зависит от уровня Паразита.",
      effectKey:"livingArmor"
    },
    "Дополнительные конечности":{
      description:"Паразит временно формирует дополнительные конечности. Даёт специальную атаку/манипуляцию.",
      effectKey:"extraLimbs"
    },
    "Нейросвязь":{
      description:"Телепатическая связь с хозяином и возможность разделять ощущения.",
      effectKey:"neuralLink"
    },
    "Токсичная секреция":{
      description:"Паразит изменяет биохимию хозяина и добавляет яд к одной из природных атак.",
      effectKey:"toxin"
    },
    "Аморфная ткань":{
      description:"Тело становится частично текучим: облегчает прохождение через узкие пространства и сопротивление захватам.",
      effectKey:"amorphous"
    },
    "Миметическая ткань":{
      description:"Паразит копирует визуальные свойства другой формы или хозяина.",
      effectKey:"mimic"
    },
    "Запасная нервная система":{
      description:"Паразит принимает часть эффектов, направленных на сознание хозяина.",
      effectKey:"backupMind"
    }
  };

  var subclasses={
    "Пожиратель":{
      description:"Хищный симбионт, который восстанавливает тело через поглощение биомассы.",
      levels:{
        3:["Питание плоти","Живой обмен"],
        7:["Усиленное питание"],
        14:["Поглощение жизненной силы"],
        18:["Ненасытный симбионт"]
      }
    },
    "Сожитель":{
      description:"Паразит и хозяин добровольно превращаются в единую систему с высоким Симбиозом.",
      levels:{
        3:["Договор двух умов","Согласованная реакция"],
        7:["Общий инстинкт"],
        14:["Единое сознание"],
        18:["Совершенный симбиоз"]
      }
    },
    "Кукловод":{
      description:"Паразит учится подавлять тело хозяина и кратковременно брать управление.",
      levels:{
        3:["Перехват управления","Нервный импульс"],
        7:["Железная воля"],
        14:["Полный захват"],
        18:["Двойное действие"]
      }
    },
    "Мимик":{
      description:"Паразит копирует свойства организмов, с которыми вступал в контакт.",
      levels:{
        3:["Анализ организма","Миметическая адаптация"],
        7:["Кража природного оружия"],
        14:["Кража физиологии"],
        18:["Совершенная копия"]
      }
    }
  };

  var levels={};
  for(var i=1;i<=20;i++)levels[i]={features:[]};
  levels[1]={
    features:["Симбиоз","Хозяин","Личинка","Биологическая связь"],
    details:{
      "Симбиоз":"Паразит и хозяин образуют единую систему. Паразит сохраняет Интеллект, Мудрость и Харизму при каждой смене тела.",
      "Хозяин":"Паразит использует отдельный статблок тела. Сила, Ловкость, Телосложение, КД, скорость и физические атаки берутся из хозяина.",
      "Личинка":"Аварийное тело Паразита. При потере хозяина Паразит сохраняет разум и переходит в личинку.",
      "Биологическая связь":"Обычный короткий и долгий отдых не восстанавливает HP тела Паразита."
    }
  };
  levels[2]={features:["Нейросвязь","Питание"],details:{
    "Нейросвязь":"Паразит и хозяин постоянно обмениваются ощущениями. Паразит не может быть застигнут врасплох обычным способом, пока хозяин способен воспринимать окружающее.",
    "Питание":"Паразит получает отдельный запас Биомассы. Биомасса используется специальными способностями для восстановления тела и мутаций."
  }};
  levels[3]={features:["Выбор вида Паразита"],subclassLevel:true};
  levels[4]={features:["Увеличение характеристик или Черта"],asi:true};
  levels[5]={features:["Глубокая интеграция","Адаптация I"],details:{
    "Глубокая интеграция":"Паразит может использовать часть собственных особенностей независимо от физического строения хозяина.",
    "Адаптация I":"Открывается 1 слот мутации."
  }};
  levels[6]={features:["Перехват боли"],details:{
    "Перехват боли":"Реакцией Паразит может принять часть одного физического эффекта на себя, изменив последствия для хозяина. Точная величина зависит от текущего Симбиоза."
  }};
  levels[7]={features:["Особенность вида"]};
  levels[8]={features:["Увеличение характеристик или Черта"],asi:true};
  levels[9]={features:["Адаптация II"],details:{"Адаптация II":"Открывается 2-й слот мутации."}};
  levels[10]={features:["Двойное сознание"],details:{
    "Двойное сознание":"Паразит и хозяин могут одновременно выполнять ментальные задачи. Эффекты, пытающиеся прочитать разум, должны определить, чью личность они обнаруживают."
  }};
  levels[11]={features:["Улучшенная интеграция"],details:{
    "Улучшенная интеграция":"Паразит получает улучшенный контроль над телом и может использовать одну собственную способность даже при тяжёлом повреждении хозяина."
  }};
  levels[12]={features:["Увеличение характеристик или Черта"],asi:true};
  levels[13]={features:["Адаптация III"],details:{"Адаптация III":"Открывается 3-й слот мутации."}};
  levels[14]={features:["Особенность вида"]};
  levels[15]={features:["Совершенный симбиоз"],details:{
    "Совершенный симбиоз":"При высоком Симбиозе Паразит и хозяин получают преимущества совместного управления: один может отдавать другому контроль над телом без потери действия."
  }};
  levels[16]={features:["Увеличение характеристик или Черта"],asi:true};
  levels[17]={features:["Адаптация IV"],details:{"Адаптация IV":"Открывается 4-й слот мутации."}};
  levels[18]={features:["Бессмертное ядро"],details:{
    "Бессмертное ядро":"Если хозяин погиб, Паразит не умирает автоматически. Он переходит в личинку, если не был уничтожен специальным эффектом, направленным непосредственно на организм Паразита."
  }};
  levels[19]={features:["Эпический дар"],asi:true};
  levels[20]={features:["Совершенный организм"],details:{
    "Совершенный организм":"Паразит может поддерживать симбиоз с телами, которые обычно не подходят ему, быстрее адаптируется к новому хозяину и получает полный доступ к четырём слотам мутаций."
  }};

  var progression={
    className:"Паразит",
    englishName:"Parasite",
    source:"Project Extra / самостоятельный дизайн",
    status:"implemented_full_1_20_foundation",
    edition:"Project Extra",
    isExtra:true,
    isRaceClassHybrid:true,
    replacesRace:true,
    multiclassAllowed:false,
    hitDie:8,
    primaryStat:"wisdom",
    secondaryStats:["intelligence","charisma"],
    savingThrows:["wisdom","intelligence"],
    armor:[],
    weapons:[],
    tools:[],
    skills:["Скрытность","Восприятие","Природа","Медицина","Проницательность","Выживание"],
    skillChoices:2,
    subclassLevel:3,
    mutationSlots:MUTATION_SLOTS,
    levels:levels,
    mechanics:{
      mindStats:["intelligence","wisdom","charisma"],
      bodyStats:["strength","dexterity","constitution"],
      hostIsSeparateStatBlock:true,
      larvaIsSeparateStatBlock:true,
      restHealing:false,
      naturalRecovery:false,
      transfer:"Смена хозяина сохраняет Интеллект, Мудрость и Харизму.",
      multiclass:"Запрещён"
    }
  };

  function ensureResources(hero){
    hero=ensure(hero);
    var level=Number(hero.level)||1;
    var p=hero.parasite;
    if(typeof p.biomass!=="number")p.biomass=0;
    if(typeof p.biomassMax!=="number")p.biomassMax=4+level*2;
    if(typeof p.symbiosis!=="number")p.symbiosis=50;
    return p;
  }

  function feedOnCorpse(hero,corpse){
    hero=ensure(hero);
    var p=ensureResources(hero);
    corpse=corpse||{};
    var size=String(corpse.size||"medium").toLowerCase();
    var gain=({tiny:0,small:1,medium:2,large:4,huge:8,gargantuan:12}[size]||2);
    gain=Math.max(0,gain);
    var room=Math.max(0,p.biomassMax-p.biomass);
    var added=Math.min(gain,room);
    p.biomass+=added;
    return {ok:added>0,biomassGained:added,biomass:p.biomass,consumed:true};
  }

  function restoreBody(hero,amount){
    hero=ensure(hero);
    var p=ensureResources(hero);
    var h=p.host;
    if(!h){
      var l=p.larva;
      if(!l)return {ok:false,reason:"Нет тела для восстановления."};
      var want=Math.max(0,Number(amount)||0);
      var healed=Math.min(want,p.biomass,l.maxHP-l.currentHP);
      var cost=Math.ceil(healed/2);
      cost=Math.min(cost,p.biomass);
      healed=Math.min(healed,cost*2);
      p.biomass-=cost;
      l.currentHP+=healed;
      hero.hpCurrent=l.currentHP;
      hero.hpMax=l.maxHP;
      return {ok:healed>0,healed:healed,cost:cost,currentHP:l.currentHP,maxHP:l.maxHP};
    }
    var desired=Math.max(0,Number(amount)||0);
    var missing=Math.max(0,h.maxHP-h.currentHP);
    var healed=Math.min(desired,missing,p.biomass*2);
    var cost=Math.ceil(healed/2);
    cost=Math.min(cost,p.biomass);
    healed=Math.min(healed,cost*2);
    p.biomass-=cost;
    h.currentHP+=healed;
    syncBody(hero);
    return {ok:healed>0,healed:healed,cost:cost,currentHP:h.currentHP,maxHP:h.maxHP};
  }

  function damageBody(hero,amount,source){
    hero=ensure(hero);
    var p=ensureResources(hero);
    var h=p.host;
    if(!h){
      if(p.larva){
        p.larva.currentHP=Math.max(0,p.larva.currentHP-Math.max(0,Number(amount)||0));
        hero.hpCurrent=p.larva.currentHP;
        if(p.larva.currentHP<=0){
          p.stage="destroyed";
          hero.hpCurrent=0;
        }
        return {stage:p.stage,currentHP:hero.hpCurrent,hostDestroyed:false};
      }
      return {stage:p.stage,currentHP:0,hostDestroyed:true};
    }
    var damage=Math.max(0,Number(amount)||0);
    h.currentHP=Math.max(0,h.currentHP-damage);
    syncBody(hero);
    if(h.currentHP<=0){
      var larva=releaseToLarva(hero,true);
      return {stage:"larva",currentHP:hero.hpCurrent,hostDestroyed:true,larva:larva,source:source||null};
    }
    return {stage:"hosted",currentHP:h.currentHP,hostDestroyed:false};
  }

  function voluntarilyDetach(hero){
    hero=ensure(hero);
    if(!hero.parasite.host)return {ok:false,reason:"Паразит уже не находится в хозяине."};
    var larva=releaseToLarva(hero,false);
    return {ok:true,larva:larva,hostSurvived:true,host:hero.parasite.lastReleasedHost};
  }

  function invadeHost(hero,target,saveRoll){
    hero=ensure(hero);
    ensureResources(hero);
    if(hero.parasite.stage!=="larva")return {ok:false,reason:"Для принудительного захвата Паразит должен находиться в личинке."};
    target=target||{};
    var dcValue=8+pb(hero.level)+mod(hero.stats&&hero.stats.wis);
    var roll=Number(saveRoll);
    var total=roll+(Number(target.saveBonus)||0);
    if(Number.isFinite(roll) && total>=dcValue){
      return {ok:false,saved:true,dc:dcValue,roll:total};
    }
    var host=bindHost(hero,target);
    // Принудительный захват снижает Симбиоз: новое тело сопротивляется.
    hero.parasite.symbiosis=Math.max(0,hero.parasite.symbiosis-20);
    return {ok:true,saved:false,dc:dcValue,host:host,symbiosis:hero.parasite.symbiosis};
  }

  function getSymbiosisTier(hero){
    var value=Number(hero&&hero.parasite&&hero.parasite.symbiosis||0);
    if(value>=76)return {key:"perfect",name:"Совершенный симбиоз"};
    if(value>=51)return {key:"stable",name:"Стабильный симбиоз"};
    if(value>=26)return {key:"tense",name:"Напряжённый симбиоз"};
    return {key:"conflict",name:"Конфликт"};
  }

  function recordMutation(hero,name){
    hero=ensure(hero);
    var p=ensureResources(hero);
    if(!mutations[name])return {ok:false,reason:"Неизвестная мутация."};
    var slots=mutationSlots(hero.level);
    if(p.mutations.indexOf(name)>=0)return {ok:false,reason:"Мутация уже выбрана."};
    if(p.mutations.length>=slots)return {ok:false,reason:"Нет свободного слота мутации."};
    p.mutations.push(name);
    return {ok:true,mutations:p.mutations.slice(),slots:slots};
  }

  var runtime={
    version:"0.2.0",
    progression:progression,
    mutations:mutations,
    subclasses:subclasses,
    PB:PB,
    mutationSlots:mutationSlots,
    createHostStatBlock:createHostStatBlock,
    createLarvaStatBlock:createLarvaStatBlock,
    normalizeCharacter:ensure,
    bindHost:bindHost,
    captureHost:captureHost,
    releaseToLarva:releaseToLarva,
    setSymbiosis:setSymbiosis,
    adjustSymbiosis:adjustSymbiosis,
    getSymbiosisTier:getSymbiosisTier,
    feedOnCorpse:feedOnCorpse,
    restoreBody:restoreBody,
    damageBody:damageBody,
    voluntarilyDetach:voluntarilyDetach,
    invadeHost:invadeHost,
    recordMutation:recordMutation,
    canRestHealBody:canRestHealBody,
    getBody:function(hero){return hero&&hero.parasite&&hero.parasite.host||null;},
    getLarva:function(hero){return hero&&hero.parasite&&hero.parasite.larva||null;}
  };

  g.PARASITE_EXTRA=runtime;
  g.parasiteRuntime=runtime;
  g.parasiteProgression=Object.assign(g.parasiteProgression||{},progression);
  g.parasiteProgression.status=progression.status;
  g.parasiteProgression.source=progression.source;

  if(!g.EXTRA_BODY_RUNTIME){
    g.EXTRA_BODY_RUNTIME={
      version:"0.1.0",
      shouldSuppressRestHP:function(hero){
        return !!(hero&&(
          hero.extraClassType==="parasite" ||
          hero.extraClassType==="ghost"
        ));
      }
    };
  } else {
    var old=g.EXTRA_BODY_RUNTIME.shouldSuppressRestHP;
    g.EXTRA_BODY_RUNTIME.shouldSuppressRestHP=function(hero){
      return !!(hero&&(
        hero.extraClassType==="parasite" ||
        hero.extraClassType==="ghost" ||
        (typeof old==="function"&&old(hero))
      ));
    };
  }
})(window);
