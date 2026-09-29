/**
 * walter_parasite_extra_runtime.js
 * Extra-класс «Паразит доктора Вальтера».
 *
 * Биологический вид, созданный из червя-мутагена с кровью вампира.
 * Он заселяется ТОЛЬКО в мёртвое тело через рот, прогрызается к позвоночнику
 * и заставляет труп снова двигаться. У тела нет собственной воли: решения
 * принимает паразит. При этом паразит не является вторым разумом-хозяином —
 * он управляет телом как биологический двигатель.
 *
 * Ключевая механика:
 * «Максимальная характеристика» — на 1 уровне определяются все характеристики,
 * равные максимальной среди STR/DEX/CON/INT/WIS/CHA тела. За каждую такую
 * характеристику открывается соответствующий орган паразита. Если максимум
 * разделён между двумя/тремя характеристиками, работают все соответствующие
 * органы. При переселении в другое мёртвое тело набор автоматически меняется.
 */
(function(g){
  'use strict';

  var PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];

  function mod(score){ return Math.floor((Number(score||10)-10)/2); }
  function pb(level){ return PB[Math.max(0,Math.min(20,Number(level)||1))]||2; }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function roll(sides){ return Math.floor(Math.random()*sides)+1; }

  var STAT_META={
    str:{label:'Сила',ability:'Костяной хлыст-жало'},
    dex:{label:'Ловкость',ability:'Пластичность'},
    con:{label:'Телосложение',ability:'Наросты'},
    int:{label:'Интеллект',ability:'Жгутики'},
    wis:{label:'Мудрость',ability:'Кистевые органы зрения'},
    cha:{label:'Харизма',ability:'Выработка феромонов'}
  };

  /*
   * Прогрессия не повторяет обычный Паразит:
   * здесь нет Симбиоза, Биомассы, личинки и смены живого хозяина.
   * Это один паразит + одно реанимированное тело.
   */
  var levels={};
  for(var i=1;i<=20;i++) levels[i]={features:[]};

  levels[1]={
    features:[
      'Реанимация доктора Вальтера',
      'Максимальная характеристика',
      'Безвольное тело'
    ],
    details:{
      'Реанимация доктора Вальтера':
        'Червь может поселиться только в мёртвом теле. Он проникает через рот, достигает спинного мозга и запускает мутагенную регенерацию. Тело снова функционирует, но не получает собственной воли.',
      'Максимальная характеристика':
        'Находятся все характеристики тела с максимальным значением. За каждую максимальную характеристику открывается свой орган паразита. Если две или более характеристики равны максимуму, используются все соответствующие способности.',
      'Безвольное тело':
        'Персонаж не может добровольно отказаться от команды паразита или совершать действие вопреки его управлению. Эффекты, обращённые к сознанию тела, по решению Мастера могут вместо тела воздействовать непосредственно на червя.'
    }
  };

  levels[2]={
    features:['Нервная прошивка','Трупное восстановление'],
    details:{
      'Нервная прошивка':'Червь напрямую управляет двигательными нервами. Носитель не нуждается в обычном сне, пище и дыхании, если паразит поддерживает его жизнедеятельность.',
      'Трупное восстановление':'Реанимированное тело считается живым для целей лечения: на него можно накладывать лечение, восстанавливать HP магией и обычными способами. В отличие от разумного Паразита, доктор Вальтер специально возвращает тканям способность принимать лечение.'
    }
  };

  levels[3]={features:['Вид Паразита Вальтера'],subclassLevel:true};

  levels[4]={features:['Увеличение характеристик или Черта'],asi:true};

  levels[5]={
    features:['Дополнительная атака','Мутагенная перестройка I'],
    details:{
      'Дополнительная атака':'Когда вы совершаете действие Атака, вы можете совершить две атаки вместо одной.',
      'Мутагенная перестройка I':'Урон природного оружия и органов паразита увеличивается на одну кость там, где это указано. После переселения формулы пересчитываются под новое тело.'
    }
  };

  levels[6]={features:['Особенность вида']};

  levels[7]={
    features:['Живой труп'],
    details:{
      'Живой труп':'Вы перестаёте получать штрафы от большинства обычных травм тела. Вы получаете преимущество на спасброски против болезней и ядов и не нуждаетесь в проверках от голода, жажды и сна.'
    }
  };

  levels[8]={features:['Увеличение характеристик или Черта'],asi:true};

  levels[9]={
    features:['Реконструкция тела'],
    details:{
      'Реконструкция тела':'После короткого отдыха тело восстанавливает 1к10 + модификатор Телосложения HP, если у него осталось хотя бы 1 HP. Это не магия и не работает, если червь был отделён от тела.'
    }
  };

  levels[10]={
    features:['Вторая нервная сеть'],
    details:{
      'Вторая нервная сеть':'Паразит дублирует ключевые нервные узлы. Вы получаете преимущество на спасброски против Оглушения и Паралича. Если вы провалили такой спасбросок, можете повторить его в конце своего следующего хода один раз за короткий отдых.'
    }
  };

  levels[11]={
    features:['Улучшенные органы'],
    details:{
      'Улучшенные органы':'Все активированные на 1 уровне органы получают улучшение, указанное в runtime. При переселении их набор определяется заново по максимальным характеристикам нового тела.'
    }
  };

  levels[12]={features:['Увеличение характеристик или Черта'],asi:true};

  levels[13]={
    features:['Мутагенная перестройка II'],
    details:{
      'Мутагенная перестройка II':'Выберите одну дополнительную мутацию тела из списка доступных мутаций. Она меняется только после переселения или длительной хирургической перестройки.'
    }
  };

  levels[14]={features:['Особенность вида']};

  levels[15]={
    features:['Упрямство мёртвого'],
    details:{
      'Упрямство мёртвого':'Когда тело должно упасть до 0 HP, реакцией вы можете остаться на 1 HP. После использования способность нельзя использовать до долгого отдыха. Она не работает, если тело уничтожено эффектом, который не оставляет пригодных тканей.'
    }
  };

  levels[16]={features:['Увеличение характеристик или Черта'],asi:true};

  levels[17]={
    features:['Мутагенная перестройка III','Трижды усиленные органы'],
    details:{
      'Мутагенная перестройка III':'Получите вторую дополнительную мутацию тела.',
      'Трижды усиленные органы':'Активные органы максимальных характеристик получают финальное усиление.'
    }
  };

  levels[18]={
    features:['Особенность вида']
  };

  levels[19]={features:['Эпический дар'],asi:true};

  levels[20]={
    features:['Абсолютная реанимация'],
    details:{
      'Абсолютная реанимация':'Если тело уничтожено, паразит может пережить разрушение один раз. В течение 10 минут он способен найти одно подходящее мёртвое тело в пределах 120 футов и переселиться в него. Если подходящего тела нет, паразит погибает вместе с классом. После использования способность восстанавливается после долгого отдыха.'
    }
  };

  /*
   * Четыре подкласса intentionally отличаются от четырёх подклассов
   * обычного Паразита: здесь специализация не про отношения с хозяином,
   * а про способ эксплуатации мёртвого тела.
   */
  var subclasses={
    'Оссификатор':{
      description:'Червь выращивает костяной каркас, превращая тело в живую осадную конструкцию.',
      levels:{
        3:['Костяной каркас','Костяные лезвия'],
        7:['Реактивная броня'],
        14:['Костяная крепость'],
        18:['Абсолютная оссификация']
      }
    },
    'Гемотроф':{
      description:'Кровь вампира в организме червя превращает тело в хищный источник жизненной силы.',
      levels:{
        3:['Вампирическая кровь','Кровавый укус'],
        7:['Питание от боли'],
        14:['Красная регенерация'],
        18:['Вечный кровоток']
      }
    },
    'Нейровод':{
      description:'Червь развивает нервную систему трупа до уровня дистанционной биологической марионетки.',
      levels:{
        3:['Проводник нервов','Отложенный рефлекс'],
        7:['Насильственный импульс'],
        14:['Перехват нервов'],
        18:['Абсолютная марионетка']
      }
    },
    'Химерист':{
      description:'Мутаген позволяет перестраивать ткани трупа под свойства недавно изученных существ.',
      levels:{
        3:['Анализ плоти','Мутагенный орган'],
        7:['Кража природного оружия'],
        14:['Химерная физиология'],
        18:['Совершенная химера']
      }
    }
  };

  var mutations={
    'Когти':{description:'Кисти превращаются в когти. Природная атака 1к6 рубящего урона.'},
    'Панцирь':{description:'Кожа уплотняется. +1 КД.'},
    'Прыгучие сухожилия':{description:'+10 футов к скорости и преимущество на прыжки.'},
    'Хватательные щупальца':{description:'Досягаемость одной естественной атаки увеличивается на 5 футов.'},
    'Кровяные клапаны':{description:'При успешной атаке раз за ход восстанавливается 1 HP.'},
    'Ночная сетчатка':{description:'Тёмное зрение 60 футов; если оно уже есть, дальность увеличивается на 30 футов.'},
    'Токсичный мозг':{description:'После успешной атаки цель получает 1к4 яда, один раз за ход.'},
    'Гибкие рёбра':{description:'Преимущество на проверки/спасброски для освобождения от захвата и протискивания.'}
  };

  function ensure(hero){
    hero=hero||{};
    hero.isExtraClass=true;
    hero.extraClassType='walter_parasite';
    hero.replacesRace=true;
    hero.multiclassAllowed=false;
    hero.walterParasite=hero.walterParasite||{};
    var w=hero.walterParasite;
    if(!Array.isArray(w.mutations))w.mutations=[];
    if(!Array.isArray(w.bodyHistory))w.bodyHistory=[];
    if(!Array.isArray(w.activeOrgans))w.activeOrgans=[];
    if(!w.stage)w.stage='body';
    if(typeof w.destroyedBodyUses!=='number')w.destroyedBodyUses=0;
    if(typeof w.restorationUses!=='number')w.restorationUses=0;
    return hero;
  }

  function getStats(hero){
    return Object.assign({str:10,dex:10,con:10,int:10,wis:10,cha:10},hero&&hero.stats||{});
  }

  function getMaxCharacteristics(hero){
    var s=getStats(hero);
    var keys=Object.keys(STAT_META);
    var max=-Infinity;
    keys.forEach(function(k){ max=Math.max(max,Number(s[k]||0)); });
    return keys.filter(function(k){return Number(s[k]||0)===max;});
  }

  function refreshOrgans(hero){
    hero=ensure(hero);
    var active=getMaxCharacteristics(hero);
    hero.walterParasite.activeOrgans=active.slice();
    return active;
  }

  function createBodyStatBlock(target,hero){
    target=target||{};
    hero=ensure(hero);
    var s=getStats(hero);
    var ts=target.stats||{};
    var stats={};
    ['str','dex','con','int','wis','cha'].forEach(function(k){
      stats[k]=Number(ts[k]!==undefined?ts[k]:s[k]||10);
    });
    var maxHP=Math.max(1,Number(target.hpMax||target.maxHP||target.hp||8));
    var currentHP=Math.max(0,Number(target.hpCurrent!==undefined?target.hpCurrent:(target.currentHP!==undefined?target.currentHP:target.hp||maxHP)));
    return {
      type:'walterReanimatedCorpse',
      sourceId:target.id||target.uuid||null,
      sourceName:target.name||target.nameRu||'Мёртвое тело',
      creatureType:target.creatureType||target.type||'Гуманоид',
      size:target.size||'Средний',
      originalStats:Object.assign({},stats),
      stats:Object.assign({},stats),
      maxHP:maxHP,
      currentHP:Math.min(maxHP,currentHP),
      ac:Number(target.ac||target.baseAC||10+mod(stats.dex)),
      speed:target.speed||'30 футов',
      senses:target.senses||[],
      resistances:target.resistances||[],
      immunities:target.immunities||[],
      naturalAttacks:Array.isArray(target.weaponsData)?target.weaponsData.slice():[],
      sourceDead:true,
      willControlledBy:'Паразит доктора Вальтера',
      reanimated:true,
      createdAt:Date.now()
    };
  }

  function isDeadTarget(target){
    if(!target)return false;
    return target.isDead===true || target.dead===true ||
      Number(target.hpCurrent!==undefined?target.hpCurrent:(target.currentHP!==undefined?target.currentHP:target.hp))<=0;
  }

  function reanimateCorpse(hero,target){
    hero=ensure(hero);
    if(!isDeadTarget(target)){
      return {ok:false,reason:'Паразит доктора Вальтера может заселяться только в мёртвое тело.'};
    }
    var body=createBodyStatBlock(target,hero);
    hero.walterParasite.body=body;
    hero.walterParasite.stage='body';
    hero.walterParasite.hostDestroyed=false;
    body.currentHP=body.maxHP;
    hero.walterParasite.bodyHistory.push({
      sourceId:body.sourceId,
      sourceName:body.sourceName,
      time:Date.now()
    });
    syncBody(hero);
    return {ok:true,body:body,activeOrgans:refreshOrgans(hero)};
  }

  function syncBody(hero){
    hero=ensure(hero);
    var body=hero.walterParasite.body;
    if(!body)return hero;
    hero.stats=Object.assign({},body.stats);
    hero.hpMax=body.maxHP;
    hero.hpCurrent=body.currentHP;
    hero.ac=body.ac;
    hero.baseAC=body.ac;
    hero.speed=body.speed;
    hero.raceName='Труп: '+body.sourceName;
    hero.hostName=body.sourceName;
    refreshOrgans(hero);
    return hero;
  }

  function damageBody(hero,amount,source){
    hero=ensure(hero);
    var body=hero.walterParasite.body;
    if(!body)return {ok:false,reason:'Нет реанимированного тела.'};
    body.currentHP=clamp(body.currentHP-Math.max(0,Number(amount)||0),0,body.maxHP);
    if(body.currentHP<=0){
      body.currentHP=0;
      hero.walterParasite.stage='body_destroyed';
      hero.walterParasite.hostDestroyed=true;
      hero.walterParasite.destroyedBy=source||null;
    }
    syncBody(hero);
    return {ok:true,currentHP:body.currentHP,bodyDestroyed:hero.walterParasite.stage==='body_destroyed'};
  }

  function healBody(hero,amount,source){
    hero=ensure(hero);
    var body=hero.walterParasite.body;
    if(!body || hero.walterParasite.stage==='body_destroyed'){
      return {ok:false,reason:'Тело больше не пригодно для лечения.'};
    }
    var healed=Math.max(0,Math.min(Number(amount)||0,body.maxHP-body.currentHP));
    body.currentHP+=healed;
    syncBody(hero);
    return {ok:true,healed:healed,currentHP:body.currentHP,source:source||'лечение'};
  }

  function canReceiveHealing(){ return true; }
  function canRestHealBody(){ return true; }

  function emergencyReanimate(hero,target){
    hero=ensure(hero);
    if(hero.level<20)return {ok:false,reason:'Абсолютная реанимация открывается на 20 уровне.'};
    if(hero.walterParasite.destroyedBodyUses>0)return {ok:false,reason:'Абсолютная реанимация уже использована.'};
    var result=reanimateCorpse(hero,target);
    if(result.ok)hero.walterParasite.destroyedBodyUses=1;
    return result;
  }

  function useDominantOrgan(hero,key,target){
    hero=ensure(hero);
    var level=Number(hero.level)||1;
    var active=refreshOrgans(hero);
    if(active.indexOf(key)<0)return {ok:false,reason:'Этот орган не активирован: характеристика тела не является максимальной.'};
    var w=hero.walterParasite;
    w.cooldowns=w.cooldowns||{};
    w.usedOrgans=w.usedOrgans||{};
    if(w.usedOrgans[key])return {ok:false,reason:'Этот орган уже использован. Он восстановится после короткого или долгого отдыха.'};

    var s=getStats(hero);
    var dc=8+pb(level)+mod(s[key]);

    if(key==='str'){
      w.usedOrgans[key]=true;
      return {
        ok:true,kind:'attack',name:'Костяной хлыст-жало',
        range:10,attackBonus:pb(level)+mod(s.str),
        damageDice:level>=11?'2d8':'1d8',damageType:'колющий',
        saveDC:dc,save:'Телосложение',
        rider:'При провале спасброска цель получает Яд до конца следующего хода.',
        uses:'1/короткий отдых'
      };
    }

    if(key==='dex'){
      var duration=roll(10);
      w.usedOrgans[key]=true;
      return {
        ok:true,kind:'buff',name:'Пластичность',
        durationSeconds:duration,
        effect:'Преимущество на спасброски Ловкости; можно протискиваться через пространство на одну категорию меньше без помех; движение не провоцирует атаки по возможности.',
        uses:'1/короткий отдых'
      };
    }

    if(key==='con'){
      var durationMin=level>=11?2:1;
      w.usedOrgans[key]=true;
      return {
        ok:true,kind:'buff',name:'Наросты',
        durationMinutes:durationMin,
        acBonus:2,
        thornsDice:level>=11?'2d4':'1d4',
        effect:'Кожа и суставы покрываются костными пластинами. При попадании рукопашной атакой по телу атакующий получает колющий урон.',
        uses:'1/короткий отдых'
      };
    }

    if(key==='int'){
      w.usedOrgans[key]=true;
      return {
        ok:true,kind:'mark',name:'Жгутики',
        concentration:true,target:target||null,duration:'до 1 минуты',
        effect:'Щупальца выходят через кожу лица и считывают мельчайшие вибрации. Паразит имеет преимущество на атаки и проверки против выбранной цели, пока она находится в пределах 60 футов; после первого раунда получает информацию о её сопротивлениях/иммунитетах, если таковые есть.',
        saveDC:dc,
        uses:'концентрация на 1 цель'
      };
    }

    if(key==='wis'){
      w.usedOrgans[key]=true;
      return {
        ok:true,kind:'sense',name:'Кистевые органы зрения',
        duration:'10 минут',
        blindsight:15+(level>=11?15:0),
        effect:'На внутренней стороне кистей открываются глаза паразита. В пределах слепого зрения видны невидимые существа и объекты без полной преграды; обычная темнота не мешает.',
        uses:'1/короткий отдых'
      };
    }

    if(key==='cha'){
      w.usedOrgans[key]=true;
      return {
        ok:true,kind:'area',name:'Выработка феромонов',
        radius:15,
        saveDC:dc,save:'Мудрость',
        effect:'Красный туман вырывается изо рта и вспыхивает. Выбранные существа в радиусе 15 футов совершают спасбросок Мудрости; при провале они получают состояние Испуган до конца следующего хода, при успехе иммунны к этому использованию.',
        uses:'1/короткий отдых'
      };
    }

    return {ok:false,reason:'Неизвестный орган.'};
  }

  function resetRestResources(hero){
    hero=ensure(hero);
    hero.walterParasite.usedOrgans={};
    hero.walterParasite.cooldowns={};
    return true;
  }

  function getDominantAbilityNames(hero){
    return refreshOrgans(hero).map(function(k){return STAT_META[k].ability;});
  }

  function recordMutation(hero,name){
    hero=ensure(hero);
    if(!mutations[name])return {ok:false,reason:'Неизвестная мутация.'};
    if(hero.walterParasite.mutations.indexOf(name)>=0)return {ok:false,reason:'Эта мутация уже есть.'};
    var max=Number(hero.level)>=17?3:(Number(hero.level)>=13?2:0);
    if(hero.walterParasite.mutations.length>=max)return {ok:false,reason:'Недостаточно мутагенных слотов.'};
    hero.walterParasite.mutations.push(name);
    return {ok:true,mutations:hero.walterParasite.mutations.slice()};
  }

  function useSubclassFeature(hero,key,target){
    hero=ensure(hero);
    var level=Number(hero.level)||1;
    var s=getStats(hero);
    var dc=8+pb(level)+Math.max(mod(s.str),mod(s.con),mod(s.int),mod(s.wis));
    var map={
      'Костяной каркас':{ok:level>=3,name:key,effect:'КД тела увеличивается на 1.'},
      'Костяные лезвия':{ok:level>=3,name:key,effect:'Природные атаки получают +1к4 колющего урона.'},
      'Реактивная броня':{ok:level>=7,name:key,effect:'Реакцией при получении рукопашного урона: 2к6 колющего урона атакующему.'},
      'Костяная крепость':{ok:level>=14,name:key,effect:'На 1 минуту тело получает сопротивление колющему и рубящему урону; 1/короткий отдых.'},
      'Абсолютная оссификация':{ok:level>=18,name:key,effect:'КД +2, иммунитет к Принудительному перемещению и Приземлению; 1/долгий отдых.'},
      'Вампирическая кровь':{ok:level>=3,name:key,effect:'При первом попадании за ход восстанавливается 1 HP.'},
      'Кровавый укус':{ok:level>=3,name:key,effect:'Природная атака 1к8 колющего + 1к4 некротического урона; при попадании восстанавливает HP в размере модификатора Телосложения, минимум 1.'},
      'Питание от боли':{ok:level>=7,name:key,effect:'Когда вы получаете урон, до конца следующего хода ваша следующая атака наносит +1к8 некротического урона.'},
      'Красная регенерация':{ok:level>=14,name:key,effect:'В начале хода при HP ниже половины максимума восстанавливаете 1к6 + модификатор Телосложения HP.'},
      'Вечный кровоток':{ok:level>=18,name:key,effect:'Раз за долгий отдых при 0 HP тело автоматически поднимается до 1 HP и сразу получает Красную регенерацию.'},
      'Проводник нервов':{ok:level>=3,name:key,effect:'Преимущество на инициативу и спасброски Ловкости.'},
      'Отложенный рефлекс':{ok:level>=3,name:key,effect:'Реакцией после промаха по вам можете переместиться на 10 футов без провокации атак по возможности.'},
      'Насильственный импульс':{ok:level>=7,name:key,effect:'Действием заставляете существо в пределах 30 футов совершить спасбросок Телосложения или быть Оглушённым до начала вашего следующего хода.',saveDC:dc},
      'Перехват нервов':{ok:level>=14,name:key,effect:'1/короткий отдых после попадания можете заставить цель провалить реакцию и не использовать реакции до конца следующего хода.',saveDC:dc},
      'Абсолютная марионетка':{ok:level>=18,name:key,effect:'Два действия Атака могут быть разделены между обычным действием и бонусным действием 1 раз за ход; 1/долгий отдых можете вместо этого совершить одно дополнительное действие.'},
      'Анализ плоти':{ok:level>=3,name:key,effect:'После изучения существа 1 минуту знаете его тип, скорость, одно сопротивление/иммунитет и природную атаку.'},
      'Мутагенный орган':{ok:level>=3,name:key,effect:'Получаете один дополнительный активный слот мутации.'},
      'Кража природного оружия':{ok:level>=7,name:key,effect:'После наблюдения природной атаки можете копировать её как одну природную атаку до следующего долгого отдыха.'},
      'Химерная физиология':{ok:level>=14,name:key,effect:'Одновременно поддерживаете две скопированные физиологические особенности.'},
      'Совершенная химера':{ok:level>=18,name:key,effect:'Три скопированные особенности одновременно; смена формы занимает бонусное действие.'}
    };
    return map[key]||{ok:false,reason:'Неизвестная особенность подкласса.'};
  }

  function getClassSummary(hero){
    hero=ensure(hero);
    var body=hero.walterParasite.body||null;
    var active=refreshOrgans(hero);
    return {
      className:'Паразит доктора Вальтера',
      level:Number(hero.level)||1,
      stage:hero.walterParasite.stage,
      bodyName:body?body.sourceName:null,
      activeCharacteristics:active.slice(),
      activeOrgans:getDominantAbilityNames(hero),
      bodyHP:body?body.currentHP:0,
      bodyMaxHP:body?body.maxHP:0,
      mutations:hero.walterParasite.mutations.slice()
    };
  }

  var progression={
    className:'Паразит доктора Вальтера',
    englishName:'Doctor Walter Parasite',
    source:'Project Extra / авторский дизайн по материалам пользователя',
    status:'implemented_foundation_v1',
    edition:'Project Extra',
    isExtra:true,
    isRaceClassHybrid:true,
    replacesRace:true,
    multiclassAllowed:false,
    hitDie:10,
    primaryStat:'highest_stat',
    secondaryStats:['strength','dexterity','constitution','intelligence','wisdom','charisma'],
    savingThrows:['constitution','dexterity'],
    armor:[],
    weapons:[],
    tools:[],
    skills:['Атлетика','Акробатика','Скрытность','Восприятие','Природа','Медицина','Выживание','Проницательность'],
    skillChoices:2,
    subclassLevel:3,
    levels:levels,
    mechanics:{
      onlyDeadBodies:true,
      noFreeWill:true,
      dominantCharacteristics:true,
      tiedMaximumsAllActive:true,
      healingAllowed:true,
      longRestHealingAllowed:true,
      shortRestHealingAllowed:true,
      liveBodyAfterReanimation:true,
      multiclass:'Запрещён'
    }
  };

  function normalizeCharacter(hero){
    hero=ensure(hero);
    refreshOrgans(hero);
    if(hero.walterParasite.body)syncBody(hero);
    return hero;
  }

  g.WALTER_PARASITE_EXTRA={
    PB:PB,
    STAT_META:STAT_META,
    progression:progression,
    subclasses:subclasses,
    mutations:mutations,
    normalizeCharacter:normalizeCharacter,
    ensure:ensure,
    createBodyStatBlock:createBodyStatBlock,
    reanimateCorpse:reanimateCorpse,
    emergencyReanimate:emergencyReanimate,
    damageBody:damageBody,
    healBody:healBody,
    canReceiveHealing:canReceiveHealing,
    canRestHealBody:canRestHealBody,
    getMaxCharacteristics:getMaxCharacteristics,
    refreshOrgans:refreshOrgans,
    getDominantAbilityNames:getDominantAbilityNames,
    resetRestResources:resetRestResources,
    useDominantOrgan:useDominantOrgan,
    recordMutation:recordMutation,
    useSubclassFeature:useSubclassFeature,
    getClassSummary:getClassSummary
  };

  /*
   * ClassesRegistry получает ссылку на этот объект ещё до подключения runtime,
   * поэтому не заменяем progression-объект целиком — объединяем его.
   */
  if(g.walterParasiteProgression && typeof g.walterParasiteProgression==='object'){
    Object.assign(g.walterParasiteProgression,progression);
  }else{
    g.walterParasiteProgression=progression;
  }
  g.WALTER_PARASITE_EXTRA.progression=g.walterParasiteProgression;
})(window);
