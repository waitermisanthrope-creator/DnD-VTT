/* Accursed — Ross Leiser / Outlandish Adventure Productions, v1.1
 * Full 1–20 runtime bridge. Canonical afflictions: Lycanthropy, Misfortune,
 * Possession, Armament, Vampirism. Russian UI data; effects are structured
 * for the VTT effect layer rather than copied as source text.
 */
(function(){
  const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
  const SPELLS_KNOWN=[0,0,3,3,3,5,5,6,6,8,8,9,9,11,11,12,12,14,14,15,15];
  const SLOTS=[
    null,null,
    [2,0,0,0,0],[3,0,0,0,0],[3,0,0,0,0],
    [4,2,0,0,0],[4,2,0,0,0],[4,3,0,0,0],[4,3,0,0,0],
    [4,3,2,0,0],[4,3,2,0,0],[4,3,3,0,0],[4,3,3,0,0],
    [4,3,3,1,0],[4,3,3,1,0],[4,3,3,2,0],[4,3,3,2,0],
    [4,3,3,3,1],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2]
  ];
  const METAS={
    2:[
      ["Затеняющее проклятие","Преимущество на Скрытность в тусклом свете или тьме."],
      ["Плодовитое проклятие","Один раз без ячейки использовать Наложение проклятия; длительность 1 минута; восстановление после короткого/долгого отдыха."],
      ["Враждебное проклятие","Раз за ход после попадания добавить некротический урон, равный модификатору характеристики проклятия (мин. 1)."],
      ["Защитный сглаз","В лёгкой/средней броне или без брони использовать характеристику проклятия вместо Ловкости для КД."],
      ["Быстрый сглаз","Использовать Сглаз бонусным действием."]
    ],
    10:[
      ["Собирающий сглаз","Предпосылка: Быстрый сглаз. Цель имеет помеху на спасбросок против Сглаза, если уже была его целью в этот ход."],
      ["Смертоносное проклятие","Предпосылка: Враждебное проклятие. Вместо него добавлять модификатор характеристики проклятия к каждому попаданию в свой ход."],
      ["Проклятая броня","Предпосылка: Защитный сглаз. Пока лёгкая/средняя броня или без неё, уменьшать получаемый урон на половину бонуса мастерства."],
      ["Безмолвное проклятие","Предпосылка: Затеняющее проклятие. В тусклом свете/тьме игнорировать вербальные компоненты своих заклинаний Аккурсда."],
      ["Передача недуга","Предпосылка: Плодовитое проклятие. После провала цели против Наложения проклятия можно не страдать от выбранного недуга на время эффекта."]
    ],
    18:[
      ["Тайное проклятие","Предпосылка: Безмолвное проклятие. Скрываться бонусным действием; скрытое от цели заклинание даёт ей помеху на спасбросок в этот ход."],
      ["Калечащий сглаз","Предпосылка: Собирающий сглаз. После провала Сглаза дать помеху на следующий спасбросок выбранной характеристики; повтор по той же цели после долгого отдыха."],
      ["Двойной сглаз","Предпосылка: Собирающий сглаз. Сглаз может выбрать вторую цель в пределах досягаемости."],
      ["Взрывное проклятие","Предпосылка: Смертоносное проклятие. Раз за ход добавить 1d10 некротического урона; можно потратить ячейку для ещё 1d10 за уровень ячейки."],
      ["Аура проклятия","Предпосылка: Проклятая броня. Реакцией после попадания видимого атакующего в пределах 30 футов наложить hex без ячейки; заканчивается при падении цели или повторном использовании."],
      ["Меняющееся проклятие","После короткого/долгого отдыха заменить любое число метаморфоз на доступные, соблюдая предпосылки."],
      ["Плодородная порча","Предпосылка: Передача недуга. При трате ячейки 2+ вместо увеличения длительности выбрать дополнительную цель за каждый уровень выше 1-го."],
      ["Реактивный защитный сглаз","Предпосылка: Проклятая броня. Реакцией после попадания видимого атакующего в пределах 30 футов вдвое уменьшить урон."],
      ["Теневое проклятие","Предпосылка: Безмолвное проклятие. Тёмное зрение 60 футов, магическая тьма не мешает; один раз/долгий отдых darkness без ячейки."],
      ["Мстительное проклятие","Предпосылка: Смертоносное проклятие. Реакцией после получения урона от видимого существа в пределах дальности оружия атаковать его и добавить модификатор характеристики проклятия к урону."],
      ["Злая порча","Предпосылка: Передача недуга. Наложение проклятия бонусным действием; выбрать любое число недугов и при успехе не страдать от любого числа выбранных недугов."]
    ]
  };
  const curses={
    "Ликантропия":{
      spells:{2:"Дальнобойный шаг",5:"Изменение облика",9:"Ускорение",13:"Свобода перемещения",17:"Дальний шаг"},
      ailments:["Жажда зверя: проклятие требует постоянного контроля инстинктов; механика подавляется через Контроль недугов."],
      features:{
        1:["Звериная форма: природное оружие; после Атаки можно бонусным действием сделать дополнительную атаку природным оружием.","Природное оружие: урон 1d4; на 5 уровне 1d6, 11 — 1d8, 17 — 1d10; с 6 уровня считается магическим."],
        3:["Память запахов: распознавать знакомый запах при успешной проверке Восприятия/Выживания по запаху.","Гибридная смена: действием принять гибридную форму на 1 минуту; бонусная атака природным оружием и регенерация HP = половина уровня в начале хода; серебро отключает регенерацию до следующего хода; 1/короткий или долгий отдых, либо ячейка 3+."],
        5:["Дополнительная атака: две атаки действием Атака."],
        11:["Устойчивая смена: действием выбрать один постоянный малый признак — +10 футов скорости и удвоенные прыжки; эхолокация 30 футов; лазание со скоростью ходьбы; задержка дыхания 15 минут; тёмное зрение 60 футов и преимущество на зрительное Восприятие; плавание со скоростью ходьбы."],
        15:["Великая смена: Alter Self без ячейки и концентрации; изменение формы позволяет принимать внешний облик любого млекопитающего своего размера."],
        20:["Мастер формы: Гибридная/Устойчивая/Великая смена бонусным действием; Гибридная смена без ограничений; сопротивление дробящему, колющему и рубящему от немагического несребряного оружия."]
      }
    },
    "Несчастье":{
      spells:{2:"Благословение",5:"Улучшение характеристики",9:"Дар благословения",13:"Замешательство",17:"Усиление навыка"},
      ailments:["Покров невезения: критические попадания по вам усиливаются дополнительной костью урона; помеха на проверки Силы, Ловкости и Телосложения."],
      features:{
        1:["Покров невезения: источник вашего проклятия проявляется как невидимая/дымчатая аура.","Поворот удачи: после провала атаки, проверки или спасброска реакцией перебросить; следующий повтор такого же типа возможен после нового провала."],
        3:["Невезучая случайность: раз за ход при Сглазе, если цель провалила спасбросок, получает 1d8 силового урона; 2d8 на 5, 3d8 на 11, 4d8 на 17.","Жульнический покров: реакцией в пределах 30 футов дать преимущество или помеху проверке, связанной с азартной игрой."],
        5:["Неизбежная случайность: при успехе цели против Невезучей случайности она получает половину урона, но без дополнительного эффекта."],
        11:["Разделённое несчастье: реакцией дать помеху атаке или проверке существа в пределах 30 футов."],
        15:["Излом удачи: реакцией дать преимущество атаке или спасброску существа в пределах 30 футов."],
        20:["Властелин судьбы: особая реакция раз за ход каждого другого существа для Разделённого несчастья или Излома удачи; нельзя применять в тот же ход, когда использована обычная реакция."]
      }
    },
    "Одержимость":{
      spells:{2:"Катапульта",5:"Духовное оружие",9:"Мигание",13:"Мор",17:"Конус холода"},
      ailments:["Дух в теле: эффекты обнаружения нежити считают вас нежитью; постоянный холод, исходящий от соседствующего духа."],
      features:{
        1:["Дух-компаньон: призрачный союзник с отдельным блоком характеристик, улучшения которого следуют вашим Увеличениям характеристик."],
        3:["Холод загробного мира: раз за ход при попадании вас или духа в ближнем бою добавить 1d6 холода; 2d6 на 11, 3d6 на 17.","Духовный союз: дух получает собственный ход и использует ваши модификаторы/бонус мастерства согласно своему блоку."],
        5:["Усиленная связь: дух получает улучшение своего набора атак/защитных параметров по мере роста уровня."],
        11:["Вой могилы: действием дух выпускает крик в радиусе 30 футов; спасбросок Телосложения, 4d6 психического урона (половина при успехе), затем цели с HP не выше вашего уровня падают до 0; не действует на нежить, конструктов и невосприимчивых к испугу; 1/короткий или долгий отдых."],
        15:["Взаимное вселение: дух может действием овладеть существом в пределах 5 футов; спасбросок Харизмы; до 1 минуты, с обычными ограничениями выхода при 0 HP/добровольном прекращении/изгнании."],
        20:["Спектральный чемпион: полёт духа 30 футов; Взаимное вселение распространяется на любое не-нежитное и не-конструктное существо и становится постоянным; один раз/короткий или долгий отдых при смертельном исходе дух возвращает вас с 1 HP."]
      }
    },
    "Проклятое оружие":{
      spells:{2:"Гневный удар",5:"Магическое оружие",9:"Стихийное оружие",13:"Ошеломляющий удар",17:"Стальной ветер"},
      ailments:["Оружейная зависть: помеха атакам любым оружием, кроме проклятого оружия."],
      features:{
        1:["Адепт оружия: владение всеми воинскими рукопашными; выбрать одноручное или универсальное рукопашное оружие как проклятое.","Цепляющееся проклятие: оружие возвращается, если дальше 20 футов; имеет метательное 20/60 и возвращается после броска."],
        3:["Связь с клинком: оружие — фокус заклинаний; за короткий/долгий отдых можно изменить его тип на другое рукопашное оружие; раз за ход +1d6 урона."],
        5:["Дополнительная атака."],
        11:["Боевой стиль проклятого оружия: Защита, Дуэлянт, Великий бой двумя руками, Защита союзника или Метание."],
        15:["Взаимная связь: после попадания проклятым оружием реакцией телепортироваться к цели; число использований = модификатор характеристики проклятия, минимум 1, долгий отдых."],
        20:["Кровожадный клинок: при критическом попадании или снижении цели до 0 HP дополнительная атака тем же оружием.","Ненасытное оружие: может поглотить до двух магических рукопашных оружий, перенимая их свойства без сложения одинаковых бонусов."]
      }
    },
    "Вампиризм":{
      spells:{2:"Очарование личности",5:"Туманный шаг",9:"Газообразная форма",13:"Подчинение зверя",17:"Подчинение личности"},
      ailments:["Солнечная слабость: помеха атакам и Восприятию, когда вы или цель на прямом солнечном свете."],
      features:{
        1:["Вампирский укус: естественная атака; при попадании некротический урон и снижение максимума HP цели на величину некротического урона; нежить и конструкты невосприимчивы."],
        3:["Кровавое очарование: действием очаровать не враждебного гуманоида в 5 футах; спасбросок Мудрости; можно поддерживать до 1 часа концентрацией; после окончания цель знает о попытке и становится невосприимчивой до долгого отдыха."],
        5:["Вампирский удар: при успешном захвате в рамках Атаки можно сделать укус; если Атака содержит только некусачные атаки — дополнительная некусачная атака."],
        11:["Кровавая сила: преимущество на Атлетику для захватов; лазание по сложным поверхностям и потолкам без проверки."],
        15:["Зов зверей: знать Conjure Animals; один раз за долгий отдых без ячейки, без концентрации, только стаи летучих мышей, крыс и волки."],
        20:["Кровавое вознесение: скорость полёта равна скорости ходьбы; при некротическом уроне живому/не конструкту/не нежити восстановить HP = половина нанесённого; Кровавое очарование действует на любое подходящее существо и может поддерживаться без ограничения."]
      }
    }
  };
  const spellList={
    1:["Bane","Cause Fear","Hex","Inflict Wounds","Drain","Curse Shock","Clumsiness Infusion","Hatred Infusion","Terror Infusion"],
    2:["Blindness","Darkness","Hold Person","Knock","Ray of Enfeeblement","Shadow Blade","Hex Bolt","Sorrow Infusion","Throat Rend","Wave of Agony"],
    3:["Bestow Curse","Counterspell","Enemies Abound","Remove Curse","Vampiric Touch","Fear","Nondetection","Scourge's Mantle"],
    4:["Blight","Confusion","Polymorph","Elemental Bane","Shadow of Moil"],
    5:["Antilife Shell","Hold Monster","Enervation","Apathy Infusion"]
  };
  const progression={className:"Аккурсд",englishName:"Accursed",source:"Ross Leiser / Outlandish Adventure Productions, Accursed v1.1",status:"implemented_partial_v1_1_runtime",edition:"5E 2014 / legacy",hitDie:10,primaryStat:"curseAbility",savingThrows:["wisdom","intelligence_or_charisma"],armor:["light","medium"],weapons:["simple","hand_crossbow"],multiclassRequirement:{intelligenceOrWisdomOrCharisma:13},subclassLevel:1,subclassFeatureLevels:[1,3,5,11,15,20],levels:{}};
  for(let l=1;l<=20;l++){
    progression.levels[l]={features:[]};
    if(l===1) progression.levels[l].features=["Покорённое проклятие","Сглаз"];
    if(l===2) progression.levels[l].features=["Метаморфоза проклятия","Заклинания","Контроль недугов"];
    if(l===3) progression.levels[l].features=["Особенность проклятия","Ревнивое проклятие"];
    if([4,8,12,16,19].includes(l)) {progression.levels[l].features.push("Увеличение характеристик или Черта");progression.levels[l].asi=true;}
    if(l===6) progression.levels[l].features.push("2-я метаморфоза проклятия");
    if(l===7) progression.levels[l].features.push("Улучшение Ревнивого проклятия");
    if(l===10) progression.levels[l].features.push("Малефикция: вторая метаморфоза");
    if(l===14) progression.levels[l].features.push("Улучшение Ревнивого проклятия","Аркана анафемы");
    if(l===18) progression.levels[l].features.push("Метастазис: третья метаморфоза");
    if(l===20) progression.levels[l].features.push("Древнее проклятие","Улучшение Ревнивого проклятия");
    if([3,5,11,15,20].includes(l)) progression.levels[l].features.push("Особенность выбранного проклятия");
  }
  const MECHANICS={curseAbility:"wis",hex:{action:"bonus_action",rangeFt:90,durationRounds:10,targetKey:"accursedHexTargetId"},afflictionControl:{knownAtLevel:2,selection:"choose_one_or_more"},metamorphosis:{level2:1,level6:2,level10:3,level18:4,replaceOnRest:true},jealousy:{levels:[3,7,14,20],extraDamageByLevel:{3:"1d6",7:"1d8",14:"2d8",20:"2d10"}}};
  function state(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState.accursed=h.classFeaturesState.accursed||{};}
  function entry(h){return (h&&h.classes||[]).find(c=>c&&(['Аккурсд','Accursed'].includes(c.name)||c.englishName==='Accursed'));}
  function level(h){return Math.min(20,Math.max(0,Number(entry(h)?.level)||0));}
  function ability(h,k){var a=h.abilityScores||h.stats||h.abilities||h;return Math.floor((Number(a[k]??a[k.slice(0,3)]??10)-10)/2);}
  const legacyCurses={lycanthropy:'Ликантропия',misfortune:'Несчастье',possession:'Одержимость',armament:'Проклятое оружие',vampirism:'Вампиризм'};
  function curseName(n){return curses[n]?n:legacyCurses[n]||null;}
  window.ACCURSED_V11={PB,SPELLS_KNOWN,SLOTS,METAS,curses,spellList,progression,MECHANICS};
  window.accursedProgression=Object.assign(window.accursedProgression||{},progression);

  function chooseCurse(h,name){name=curseName(name);var s=sync(h);if(!level(h)||!name)return {ok:false,reason:'Неизвестное проклятие.'};if(s.curse&&s.curse!==name)return {ok:false,reason:'Проклятие уже выбрано.'};s.curse=name;entry(h).subclass=name;return {ok:true,curse:name,data:curses[name]};}
  function chooseMetamorphoses(h,names){
    var s=sync(h),list=Array.isArray(names)?names:[names],catalog=Object.keys(METAS).filter(k=>Number(k)<=level(h)).flatMap(k=>METAS[k]);
    if(level(h)<2||list.length>s.metamorphosisMax||new Set(list).size!==list.length)return {ok:false,reason:'Нарушен лимит метаморфоз.'};
    for(var name of list){var m=catalog.find(x=>x[0]===name);if(!m)return {ok:false,reason:'Метаморфоза ещё недоступна.'};var pre=/Предпосылка: ([^.]+)\./.exec(m[1]);if(pre&&!list.includes(pre[1]))return {ok:false,reason:'Не выполнена предпосылка: '+pre[1]};}
    s.metamorphoses=list.slice();return {ok:true,max:s.metamorphosisMax,selected:list.slice()};
  }
  function useHex(h,target,ctx){
    ctx=ctx||{};var s=sync(h),B=window.DNDCombat,kind=ctx.jinx||'attackAgainstChosenCreature';
    if(!level(h)||!s.curse||!target||!target.id||!B||ctx.distanceFt!=null&&(!Number.isFinite(Number(ctx.distanceFt))||Number(ctx.distanceFt)>MECHANICS.hex.rangeFt)||!['abilityCheck','attackAgainstChosenCreature'].includes(kind))return {ok:false,reason:'Нужна допустимая цель и вариант Сглаза.'};
    if(kind==='abilityCheck')return {ok:false,unsupported:true,reason:'Общий путь проверок характеристик ещё не исполняет этот вариант Сглаза.'};
    if(kind==='attackAgainstChosenCreature'&&!ctx.chosenCreatureId)return {ok:false,reason:'Укажите существо, атакам против которого мешает Сглаз.'};
    var save=B.savingThrow(target,'wis',s.saveDC);if(save.success)return {ok:true,applied:false,save,message:'Цель сопротивляется Сглазу.'};
    target.classFeaturesState=target.classFeaturesState||{};target.classFeaturesState.accursedJinx={sourceId:h.id,kind,chosenCreatureId:ctx.chosenCreatureId||null,stat:ctx.stat||null,expiresAt:Date.now()+60000};
    s.hexTargetId=target.id;s.hexActive=true;s.hexExpiresAt=Date.now()+60000;s.hexRounds=10;
    return {ok:true,applied:true,save,dc:s.saveDC,targetId:target.id,message:'Сглаз наложен на цель.'};
  }
  function controlAilments(h,names){var s=sync(h),a=curses[s.curse]?.ailments||[],list=Array.isArray(names)?names:[names];if(level(h)<2||!list.length||list.some(x=>!a.includes(x)))return {ok:false,reason:'Нужен известный недуг выбранного проклятия.'};s.suppressedAilments=list.slice();return {ok:true,selected:list.slice()};}
  function reset(h){var s=state(h);s.hexTargetId=null;s.hexActive=false;s.suppressedAilments=[];return s;}
  function sync(h){
    var l=level(h),s=state(h);if(!l)return s;var selected=entry(h).subclass;
    s.curse=curseName(selected)||(!selected?curseName(s.curse)||curseName(s.curseId):null)||null;
    s.curseAbility=['intelligence','wisdom','charisma'].includes(s.curseAbility)?s.curseAbility:'wisdom';
    s.level=l;s.proficiencyBonus=Number(h.proficiencyBonus)||PB[l];s.saveDC=8+s.proficiencyBonus+ability(h,s.curseAbility);s.attackBonus=s.proficiencyBonus+ability(h,s.curseAbility);
    h.resources=h.resources||{};var r=h.resources.accursedSpellSlots||(h.resources.accursedSpellSlots={}),max=(SLOTS[l]||[0,0,0,0,0]).slice(),oldMax=r.maxByLevel||s.slotMax||max,old=r.byLevel||s.slotCurrent||max;
    r.byLevel=max.map((n,i)=>Math.max(0,Math.min(n,n-Math.max(0,Number(oldMax[i]||0)-Number(old[i]||0)))));r.maxByLevel=max;r.current=r.byLevel.reduce((a,b)=>a+b,0);r.max=max.reduce((a,b)=>a+b,0);r.recharge='long';
    s.slotMax=max.slice();s.slotCurrent=r.byLevel.slice();s.spellSlots=max.slice();s.spellsKnownMax=SPELLS_KNOWN[l]||0;if(Array.isArray(s.spellsKnown)&&!Array.isArray(s.knownSpells))s.knownSpells=s.spellsKnown.slice();
    s.metamorphosisMax=l>=18?4:l>=10?3:l>=6?2:l>=2?1:0;s.metamorphoses=Array.isArray(s.metamorphoses)?s.metamorphoses:[];
    s.jealousyDie=l>=20?'2d10':l>=14?'2d8':l>=7?'1d8':l>=3?'1d6':null;
    if(s.hexExpiresAt<=Date.now()){s.hexActive=false;s.hexTargetId=null;}
    return s;
  }
  function jealousyDamage(h){
    var l=level(h);return l>=20?"2d10":l>=14?"2d8":l>=7?"1d8":l>=3?"1d6":"0";
  }
  function isAilmentSuppressed(h,name){var s=state(h);return Array.isArray(s.suppressedAilments)&&s.suppressedAilments.indexOf(name)>=0;}
  function clearHex(h){var s=state(h);s.hexTargetId=null;s.hexActive=false;return s;}
  function rest(h,type){var s=sync(h);if(type==='short'||type==='long'){s.hexTargetId=null;s.hexActive=false;}if(type==='long'){h.resources.accursedSpellSlots.byLevel=s.slotMax.slice();s.suppressedAilments=[];}sync(h);return s;}
  function attackModifiers(h,ctx){
    var s=sync(h),out={extraAttacks:level(h)>=5&&['Ликантропия','Проклятое оружие'].includes(s.curse)?2:1};
    if(level(h)>=2&&ctx.weaponAttack&&s.metamorphoses.includes('Враждебное проклятие')&&!s.hostileUsed)out.typedExtraDice=[{dice:'0d1+'+Math.max(1,ability(h,s.curseAbility)),type:'necrotic',label:'Враждебное проклятие'}];
    return out;
  }
  function useFeature(h,id,ctx){
    ctx=ctx||{};if(!window.DNDContent.resolveFeature(h,id,'Аккурсд'))return {ok:false,unavailable:true,reason:'Способность Аккурсда недоступна.'};var s=sync(h);
    if(id==='chooseCurse')return chooseCurse(h,ctx.curse||ctx.choice);
    if(id==='chooseCurseAbility'){var a=ctx.ability;if(!['intelligence','wisdom','charisma'].includes(a))return {ok:false,reason:'Нужна ментальная характеристика.'};s.curseAbility=a;sync(h);return {ok:true,ability:a};}
    if(id==='chooseMetamorphosis'||id==='metamorphosis')return chooseMetamorphoses(h,ctx.names||ctx.name);
    if(id==='jinx'||id==='hex')return useHex(h,ctx.target,ctx);
    if(id==='suppressCurse')return controlAilments(h,ctx.names||ctx.name);
    if(id==='accursed-clearHex'){clearHex(h);return {ok:true,message:'Сглаз завершён в состоянии источника.'};}
    return {ok:false,unsupported:true,reason:'Этот эффект проклятия ещё не исполняется.'};
  }
  const pack={id:'sv-accursed',name:'Аккурсд',aliases:['Accursed'],source:progression.source,authoritativeSubclasses:true,subclassLevel:1,
    features:[['chooseCurse','Выбор проклятия',1,'choice'],['chooseCurseAbility','Характеристика проклятия',1,'choice'],['jinx','Сглаз',1,'action'],['hex','Сглаз',1,'action'],['accursedMagic','Заклинания Аккурсда',2,'utility'],['afflict','Поражение недугом',2,'action'],['suppressCurse','Подавление недуга',2,'bonus'],['chooseMetamorphosis','Выбор метаморфоз',2,'choice'],['metamorphosis','Метаморфозы',2,'choice']].map(([id,name,level,action])=>({id,name,level,action})),
    subclasses:Object.keys(curses).map(name=>({id:name,name,pickLevel:1,features:[1,3,5,11,15,20].map(level=>({id:'accursed-'+name+'-'+level,name:name+' — '+level+' уровень',level,action:'utility',description:(curses[name].features[level]||[]).join(' ')}))})),
    hooks:{sync,useFeature,rest,attackModifiers,startTurn:h=>{state(h).hostileUsed=false;},onAttackResult:(h,ctx)=>{if(ctx.hit&&ctx.attackResult&&ctx.attackResult.damage?.typedExtraDice?.some(x=>x.label==='Враждебное проклятие'))state(h).hostileUsed=true;},onTurnEnd:h=>{var s=state(h);if(s.hexActive&&--s.hexRounds<=0)clearHex(h);sync(h);}}};
  if(window.DNDContent)window.DNDContent.registerClass(pack);else (window.DND_PENDING_CLASS_PACKS=window.DND_PENDING_CLASS_PACKS||[]).push(pack);
  window.accursedRuntime={
    version:"1.2-mechanical",
    getSpellSlots:l=>SLOTS[l]||[0,0,0,0,0],
    getSpellsKnown:l=>SPELLS_KNOWN[l]||0,
    getSaveDC:(ability,pb,mod)=>8+(pb||0)+(mod||0),
    getMetamorphoses:(l)=>[...(METAS[2]||[]),...(l>=10?METAS[10]||[]:[]),...(l>=18?METAS[18]||[]:[])],
    getCurse:n=>curses[n]||null,MECHANICS,useFeature,attackModifiers,chooseCurse,chooseMetamorphoses,useHex,controlAilments,reset,
    sync,syncState:sync,jealousyDamage,isAilmentSuppressed,clearHex,rest
  };
  window.accursedAfflictions=Object.keys(curses);
})();