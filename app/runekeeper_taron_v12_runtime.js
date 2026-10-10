/* Runekeeper — Taron "Indestructoboy" Pounds, Runekeeper v1.2
 * Full class/runtime data. Russian UI layer; rune effects are represented
 * as structured data so the combat/effect engine can consume them.
 */
(function(){
const INS=[0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,10,10];
const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const KNOWN=Array.from({length:21},(_,l)=>l===0?0:4+l-1);
const LANGS={
"Детек":["Arausamman","Astim","Dur","Findar","Heg","Hurvaag","Jorl","Kuld","Narja","Nurn","Olara","Orv","Skegga","Torst","Urngor"],
"Эльфийский":["Ageas","Darneti","Djalase","Elandi","Esgal","Irinkas","Linta","Wutheh"],
"Инфернальный":["Asmodeus","Duot","Dyweiur","Fury","Geryon","Kdaav","Prazytzual","Smuydv","Sruzy","Suqmz","Tidc","Witruouty","Wmuydv","Wyiel","Zariel"],
"Великанский":["Annam","Blod","Boye","Dod","Ferd","Fjell","Grolantor","Harbunad","Haug","Hellig","Ild","Ise","Kong","Krig","Liv","Macht","Magisk","Maug","Prakt","Skod","Skold","Skye","Stein","Stig","Sverd","Uvar","Uven","Venn","Vind","Wyrm"],
"Гоблинский":["Booyahg","Bree-Yark","Daakhuuc","Dor","Gromyok","Haalkec","Her","Kon","Maglubiyet","Nilbog","Otyohm","Oguur","Orakhaan","Pvuti","Savaros","Shaarat","Wzulc","Yeet"],
"Акванский":["Hanga","Izziq","Mogi","Patu","Rino","Sanraksana","Seyytm","Vopn"],
"Драконий":["Achuak","Arcaniss","Arcath","Bahamut","Frahr","Gix","Litrix","Orn","Rach","Reoz","Sauriv","Tiamat","Tobor","Troth","Thurirl","Vutha","Welun"],
"Первобытный":["Freedus","Xaoc","Wadi","Hanga","Izziq","Mogi","Patu","Rino","Sanraksana","Seyytm","Vopn"],
"Воздушный":["Sogeza","Ulinzi"],
"Огненный":["Perlindungan","Phoenix","Sipela","Sahar","Sihir"],
"Земной":["Drsti","Hatiyara","Kata","Lhar","Mukhigioko"],
"Воровской жаргон":["Ace","Bite","Flash","Gamon","Mogue","Rokato","Rook","Screeve","Shiv"]
};
const DIALECTS={
"Детек":{
name:"Диалект Детек",language:"Детек",
features:{
2:["Дварфийский дискурс: знать, читать и писать Дварфийский; владение бронёй и оружием с дварфийской руной; игнорировать требования настройки для магических предметов с такой руной.","Призыв железа: добавить руну Детек в лексикон; после длительного отдыха можно пробудить одну созданную руну как пассивную, не считая её в лимит начертанных."],
6:["Стойка Детек: при входе выбрать дополнительный эффект — Броня (+1 КД на зачарованной рунами броне), Доблесть (бонус к спасброскам против испуга союзников в области), Оружие (две атаки действием Атака)."],
10:["Слова непреклонности: оружие или броня могут нести до трёх ваших рун; на одном объекте можно разместить до трёх ваших начертанных рун."],
14:["Ярость кузни: после попадания рукопашным оружием можно наложить огненное клеймо; цель получает дополнительный огненный урон от последующих рукопашных атак и урон в начале хода; повтор спасброска завершает эффект; повторное использование возможно за 5 рунных зарядов."]
}},
"Инфернальный":{
name:"Инфернальный диалект",language:"Инфернальный",
features:{
2:["Дискурс Тёмного: знать, читать и писать Абиссальный и Инфернальный; владение бронёй/оружием с этими рунами; игнорировать требования настройки.","Зов из бездны: добавить инфернальную руну; при нанесении урона существу, которое атаковало вас после конца вашего прошлого хода, восстановить HP в объёме половины нанесённого урона."],
6:["Инфернальная стойка: выбрать Предательство (помеха защитным спасброскам против очарования), Рок (блокировать часть лечения врага и наносить некротический урон) или Боль (мешать врагам колдовать заклинания низкого уровня)."],
10:["Слова проклятия: существо, получившее урон от вашей руны, получает помеху на следующий спасбросок против эффекта этой руны."],
14:["Жалкое воздаяние: при падении до 0 HP автоматически призвать могущественного демона/дьявола/юголота без концентрации; после выполнения приказа или мести вы возвращаетесь с 1 HP; долг перед существом снимается подходящей жертвой."]
}},
"Гукляк":{
name:"Диалект Гукляк",language:"Гоблинский",
features:{
2:["Гоблинский дискурс: знать, читать и писать Гоблинский; владение бронёй/оружием с гоблинскими рунами; игнорировать требования настройки.","Призыв хаоса: добавить гоблинскую руну; при действии Вызов руны или Отступление союзники в 10 футах могут реакцией переместиться на половину скорости без провоцирования."],
6:["Гоблинская стойка: при входе бросить d6 и получить случайный эффект — Обман, Беспорядок, Оскорбление, Хитрость, Саботаж или Внезапность."],
10:["Слова бедлама: при броске по таблице эффекта гоблинской руны или стойки бросить дважды и выбрать результат; одинаковые результаты позволяют выбрать любой."],
14:["Необузданный хаос: при вызове руны можно взорвать её; враги в радиусе 20 футов совершают спасбросок Ловкости, при провале получают 4d10 силового урона и отбрасываются на 10 футов."]
}},
"Йотун":{
name:"Диалект Йотун",language:"Великанский",
features:{
2:["Осторианский дискурс: знать, читать и писать Великанский; владение бронёй/оружием с великанскими рунами; игнорировать требования настройки.","Скилт Кригга: бонусным действием стать Большим на 1 минуту, стать великаном, получить +5 футов досягаемости, +1d6 к урону оружием и возможность держать двуручное оружие одной рукой; 1/короткий или долгий отдых."],
6:["Стойка Йотун: при входе выбрать Господство (две атаки), Путешествие (+10 футов скорости и помеха провоцированным атакам) или Восстановление (в начале последующих ходов тратить Кость хитов на лечение)."],
10:["Слова господства: после действия по вызову великановской руны сделать атаку бонусным действием."],
14:["Йотунбруд-джаггернаут: постоянно Большой; бонусный урон оружия 1d8; можно становиться Огромным с дополнительной досягаемостью; два использования Скилт Кригга между отдыхами."]
}},
"Иокхарик":{
name:"Диалект Иокхарик",language:"Драконий",
features:{
2:["Драконий дискурс: знать, читать и писать Драконий; владение бронёй/оружием с драконьими рунами; игнорировать требования настройки.","Вознесение дракона: высота прыжка до трёхкратного уровня; безопасное падение в пределах прыжка; можно перемещаться по горизонтали при падении; удар при приземлении получает повышенную угрозу критического попадания и дополнительный урон за каждые 10 футов падения, цель обычно сбивается с ног."],
6:["Драконья стойка: Полёт (зависание на вершине прыжка), Величие (штраф врагам против испуга) или Чешуя (выбрать кислоту/холод/огонь/молнию/яд и дать сопротивление союзникам в области)."],
10:["Слова легенды: после вызова драконьей руны получить преимущество на следующий спасбросок до начала следующего хода."],
14:["Катаклизмический удар: после Вознесения дракона и приземления создать взрыв в 20 футах; Ловкость, при провале выбранный стихийный урон 1d10 за каждые 10 футов падения; 1/короткий или долгий отдых либо 3 рунных заряда."]
}},
"Супернальный":{
name:"Супернальный диалект",language:"Небесный",
features:{
2:["Небесный дискурс: знать, читать и писать Небесный; владение бронёй/оружием с небесными рунами; игнорировать требования настройки.","Сигилическая благодать: любое существо с вашей небесной руной получает дополнительное лечение, равное числу ваших начертанных рун."],
6:["Небесная стойка: Красота (бонус против очарования), Свет (яркий свет и подавление магической тьмы), Жизненность (избыточное лечение превращается во временные HP)."],
10:["Слова благословения: говорящий на Небесном магически понятен существам, не знающим этого языка."],
14:["Осуждение миротворца: действием наложить на видимое существо в 120 футах печать пацифизма; попытка атаковать или нанести урон заклинанием требует спасброска Мудрости, провал ослепляет на ход; три провала продлевают ослепление, три успеха снимают эффект; 1/долгий отдых."]
}}};
const progression={className:"Рунный хранитель",englishName:"Runekeeper",source:"Taron 'Indestructoboy' Pounds — Runekeeper v1.2",status:"implemented_partial_v1_2_runtime",edition:"5E 2014",hitDie:8,primaryStat:"intelligence",savingThrows:["intelligence","wisdom"],armor:["light","medium","shields"],weapons:["simple","warhammers","polearms"],tools:["calligrapher's tools"],multiclassRequirement:{intelligence:13},subclassLevel:2,subclassFeatureLevels:[2,6,10,14],levels:{}};
for(let l=1;l<=20;l++){const f=[];if(l===1)f.push("Рунное знание","Полиглот");if(l===2)f.push("Диалект хранителя","Рунная стойка");if(l===3)f.push("Герметическая интуиция");if([4,8,12,16,19].includes(l))f.push("Увеличение характеристик или Черта");if(l===5)f.push("Причинный призыв");if(l===6)f.push("Особенность диалекта");if(l===7)f.push("Гармоническая настройка");if(l===9)f.push("Рунное песнопение");if(l===10)f.push("Особенность диалекта");if(l===11)f.push("Вездесущность");if(l===14)f.push("Особенность диалекта");if(l===15)f.push("Всеведение");if(l===18)f.push("Всемогущество");if(l===20)f.push("Улучшенное рунное песнопение");progression.levels[l]={features:f,inscribedRunes:INS[l],runesKnown:KNOWN[l],asi:[4,8,12,16,19].includes(l)};}
const base={
runicLore:"В 1 уровне получает рунный лексикон: 4 руны на старте и по одной новой за каждый уровень; язык руны обязателен. Начертание меняется после долгого отдыха; объект несёт одну вашу руну. Начертанная руна даёт пассивный эффект и может быть вызвана.",
invoking:"Вызывать руну может только хранитель. Нужно касаться руны или произнести её имя; запрет на магию также запрещает вызов. После вызова руна становится инертной до повторного начертания.",
polyglot:"Читать любые письмена; после отдыха заменять известный язык другим, кроме Общего и языков текущих рун.",
stance:"Бонусным действием выбрать Стойку разрушения или защиты; область 10 футов. Разрушение: первый урон врагу за ход получает +половину числа начертанных рун. Защита: первый урон вам/союзнику за ход уменьшается на половину числа начертанных рун.",
intuition:"Действием получить эффект detect magic на концентрации; при осознании магии на объекте можно взаимодействовать с ней без срабатывания эффекта.",
causal:"Рунные заряды = половина уровня; тратятся для повторного вызова инертных рун; восстановление после долгого отдыха.",
harmonic:"Можно настраиваться на магические предметы, на которые нанесены ваши руны, игнорируя требования; настройка другого существа на предмет с вашей руной также включает саму руну без расхода лимита.",
chant:"Действием вызвать одновременно две руны с временем вызова 1 действие; на 20 уровне — до трёх.",
omnipresence:"Всегда знать местоположение своих начертанных рун, включая другие планы; после смерти руны остаются.",
omniscience:"Знать, говорить и писать все языки.",
omnipotence:"Радиус рунной стойки увеличивается до 30 футов."
};
window.RUNEKeeper_V12={INS,PB,KNOWN,LANGS,DIALECTS,progression,base};
window.runeKeeperProgression=Object.assign(window.runeKeeperProgression||{},progression);
window.runeKeeperRuntime={version:"1.2",getInscribedRunes:l=>INS[l]||0,getRunesKnown:l=>KNOWN[l]||0,getRunicDC:(pb,intMod)=>8+(pb||0)+(intMod||0),getDialect:n=>DIALECTS[n]||null,getLanguages:()=>LANGS};
window.runeKeeperDialects=Object.keys(DIALECTS);

  const MECHANICS={runicCharges:"floor(classLevel/2)",invocation:"touch_or_speak_name",inscription:"one_rune_per_object",inactiveAfterInvoke:true,stance:{rangeFtByLevel:{2:10,18:30},action:"bonus_action",modes:["разрушение","защита"]},chant:{level9:2,level20:3}};
  function rkState(h){h.classFeaturesState=h.classFeaturesState||{};var s=h.classFeaturesState.runekeeper=h.classFeaturesState.runekeeper||{};s.runes=s.runes||{};return s;}
  function rkEntry(h){return (h&&h.classes||[]).find(c=>c&&(['Рунный хранитель','RuneKeeper','Runekeeper'].includes(c.name)||c.englishName==='Runekeeper'));}
  function rkLevel(h){return Math.min(20,Math.max(0,Number(rkEntry(h)?.level)||0));}
  function rkMod(h,k){var a=h.abilityScores||h.stats||h.abilities||h;return Math.floor((Number(a[k]??a[k.slice(0,3)]??10)-10)/2);}
  const dialectAliases={dethek:'Детек',fiendish:'Инфернальный',ghukliak:'Гукляк',jotun:'Йотун',iokharic:'Иокхарик',supernal:'Супернальный'};
  function dialectName(n){return DIALECTS[n]?n:dialectAliases[n]||Object.keys(DIALECTS).find(k=>DIALECTS[k].name===n)||null;}
  function rkTurnKey(h){var t=(window.currentChar||window.currentCharacter||h).initiativeTracker;return t&&t.combatants?.length?'combat:'+Number(t.round||1)+':'+Number(t.activeIndex||0):'local:'+Number(rkState(h).turnSerial||0);}
  function rkLexicon(h,names){var s=rkSync(h),list=Array.isArray(names)?names:[names],langs=Array.isArray(h.languages)?h.languages:String(h.languages||'').split(',').map(x=>x.trim()),allowed=Object.keys(LANGS).filter(k=>langs.includes(k)).flatMap(k=>LANGS[k]);
    if(!rkLevel(h)||list.length>s.runesKnown||new Set(list).size!==list.length||list.some(n=>!allowed.includes(n)))return {ok:false,reason:'Нужны известный язык руны, уникальный лексикон и допустимое количество.'};
    if(Object.values(s.runes).some(e=>!list.includes(e.rune)))return {ok:false,reason:'Сначала удалите начертания исключаемых рун.'};s.lexicon=list.slice();return {ok:true,known:list.slice()};
  }
  function rkInscribe(h,rune,objectId){var s=rkSync(h),id=String(objectId||'');if(!rkLevel(h)||!id||!s.lexicon.includes(rune))return {ok:false,reason:'Нужны объект и руна из лексикона.'};
    if(s.runes[id]&&s.runes[id].rune!==rune)return {ok:false,reason:'На объекте уже начертана другая руна.'};
    if(!s.runes[id]&&Object.keys(s.runes).length>=s.inscribedRunesMax)return {ok:false,reason:'Достигнут лимит начертаний; сначала удалите прежнее.'};
    s.runes[id]={rune,active:true};return {ok:true,rune,objectId:id,message:'Руна начертана.'};
  }
  function rkInvoke(h,objectId){var s=rkSync(h),e=s.runes[objectId];if(!rkLevel(h)||!e||!e.active)return {ok:false,reason:'Нет активной собственной руны.'};e.active=false;s.lastInvokedRune=e.rune;return {ok:true,reserved:true,rune:e.rune,objectId,message:'Руна стала инертной; её конкретный эффект требует разрешения.'};}
  function rkCharge(h,objectId){var s=rkSync(h),r=h.resources.runicCharges,e=s.runes[objectId];if(rkLevel(h)<5||r.current<1||!e||e.active)return {ok:false,reason:'Нужны инертная собственная руна и заряд с 5 уровня.'};r.current--;s.runicCharges=r.current;e.active=true;return {ok:true,remaining:r.current,rune:e.rune,message:'Руна вновь активна.'};}
  function rkStance(h,mode){if(rkLevel(h)<2||!['разрушение','защита'].includes(mode))return {ok:false,reason:'Недоступная рунная стойка.'};rkSync(h).stance=mode;return {ok:true,stance:mode,message:'Рунная стойка: '+mode};}
  function rkDialect(h,name){name=dialectName(name);var s=rkSync(h);if(rkLevel(h)<2||!name||s.dialect&&s.dialect!==name)return {ok:false,reason:'Недоступный либо уже выбранный диалект.'};s.dialect=name;rkEntry(h).subclass=name;return {ok:true,dialect:name,data:DIALECTS[name]};}
  function rkRestore(h,type){return type==='long'?rkLongRest(h):rkSync(h);}
  function rkSync(h){
    var l=rkLevel(h),s=rkState(h);if(!l)return s;var selected=rkEntry(h).subclass;s.dialect=dialectName(selected)||(!selected?dialectName(s.dialect):null)||null;
    if(!Object.keys(s.runes).length&&s.inscribedObjects)Object.keys(s.inscribedObjects).forEach(k=>s.runes[k]={rune:s.inscribedObjects[k],active:!s.inertRunes?.[k]});
    if(!Array.isArray(s.lexicon))s.lexicon=Array.isArray(s.runicLexicon)?s.runicLexicon.slice():[];
    s.level=l;s.proficiencyBonus=Number(h.proficiencyBonus)||PB[l];s.runesKnown=KNOWN[l];s.inscribedRunesMax=INS[l];s.runicDC=8+s.proficiencyBonus+rkMod(h,'intelligence');s.stanceRangeFt=l>=18?30:10;
    h.resources=h.resources||{};var max=l>=5?Math.floor(l/2):0,r=h.resources.runicCharges||(h.resources.runicCharges={current:s.runicCharges??max});r.max=max;r.current=Math.max(0,Math.min(max,Number(r.current)||0));r.recharge='long';s.runicCharges=r.current;s.runicChargeMax=max;s.chantRunes=l>=20?3:l>=9?2:1;
    return s;
  }
  function rkStanceEffect(h,context){var s=rkSync(h),bonus=Math.floor(Object.keys(s.runes).length/2);return {mode:s.stance,rangeFt:s.stanceRangeFt,bonus,damageReduction:s.stance==='защита'?bonus:0,damageBonus:s.stance==='разрушение'?bonus:0,context};}
  function rkLongRest(h){var s=rkSync(h);if(!rkLevel(h))return s;h.resources.runicCharges.current=h.resources.runicCharges.max;Object.keys(s.runes).forEach(k=>s.runes[k].active=true);return rkSync(h);}
  function rkShortRest(h){return rkSync(h);}
  function rkCanInvoke(h,objectId){var e=rkSync(h).runes[objectId];return !!(rkLevel(h)&&e&&e.active);}
  function rkDismiss(h,objectId){var s=rkSync(h);if(!s.runes[objectId])return {ok:false,reason:'Руна не найдена.'};var rune=s.runes[objectId].rune;delete s.runes[objectId];if(s.inscribedObjects)delete s.inscribedObjects[objectId];if(s.inertRunes)delete s.inertRunes[objectId];return {ok:true,rune,objectId,message:'Начертание удалено.'};}
  function rkInvokeMany(h,objectIds){var s=rkSync(h),max=s.chantRunes;if(rkLevel(h)<9||!Array.isArray(objectIds)||!objectIds.length||objectIds.length>max||new Set(objectIds).size!==objectIds.length||objectIds.some(k=>!rkCanInvoke(h,k)))return {ok:false,reason:'Нужны уникальные активные руны в лимите Песнопения.'};return {ok:true,reserved:true,results:objectIds.map(k=>rkInvoke(h,k)),message:'Руны зарезервированы; конкретные эффекты ещё не исполняются.'};}
  function rkUse(h,id,ctx){ctx=ctx||{};if(!window.DNDContent.resolveFeature(h,id,'Рунный хранитель'))return {ok:false,unavailable:true,reason:'Способность Рунного хранителя недоступна.'};
    if(id==='runicLore')return rkLexicon(h,ctx.names||ctx.runes);
    if(id==='inscribeRune')return rkInscribe(h,ctx.rune,ctx.objectId);
    if(id==='invokeRune')return rkInvoke(h,ctx.objectId);
    if(id==='runekeeper-dismissRune')return rkDismiss(h,ctx.objectId);
    if(id==='runeStance')return rkStance(h,ctx.stance);
    if(id==='keeperDialect')return rkDialect(h,ctx.dialect||ctx.choice);
    if(id==='causalInvocation')return rkCharge(h,ctx.objectId);
    if(id==='runeChant')return rkInvokeMany(h,ctx.objectIds);
    return {ok:false,unsupported:true,reason:'Этот эффект руны или диалекта ещё не подключён.'};
  }
  function rkAttack(h,ctx){var s=rkSync(h),key=rkTurnKey(h)+':'+String(ctx.target&&(ctx.target.id||ctx.target.entityId)||'');s.damageTargets=s.damageTargets||{};return {bonusDamage:s.stance==='разрушение'&&!s.damageTargets[key]?rkStanceEffect(h).damageBonus:0};}
  function rkDamage(h,ctx){var s=rkSync(h),key=rkTurnKey(h);if(s.stance!=='защита'||s.defenseTurn===key||ctx.amount<=0)return {reduction:0};s.defenseTurn=key;return {reduction:rkStanceEffect(h).damageReduction};}
  const pack={id:'ip-runekeeper',name:'Рунный хранитель',aliases:['RuneKeeper','Runekeeper'],source:progression.source,authoritativeSubclasses:true,subclassLevel:2,
    features:[['runicLore','Рунный лексикон',1,'choice'],['inscribeRune','Начертать руну',1,'utility'],['invokeRune','Призвать руну',1,'action'],['runekeeper-dismissRune','Удалить начертание',1,'utility'],['keeperDialect','Диалект хранителя',2,'choice'],['runeStance','Рунная стойка',2,'bonus'],['hermeticIntuition','Герметическая интуиция',3,'action'],['causalInvocation','Причинный призыв',5,'utility'],['runeChant','Рунное песнопение',9,'action']].map(([id,name,level,action])=>({id,name,level,action})),
    subclasses:Object.keys(DIALECTS).map(name=>({id:name,name:DIALECTS[name].name,pickLevel:2,features:[2,6,10,14].map(level=>({id:'runekeeper-'+name+'-'+level,name:DIALECTS[name].name+' — '+level+' уровень',level,action:'utility',description:(DIALECTS[name].features[level]||[]).join(' ')}))})),
    hooks:{sync:rkSync,useFeature:rkUse,damageReduction:rkDamage,attackModifiers:rkAttack,startTurn:h=>{var s=rkState(h);s.turnSerial=(s.turnSerial||0)+1;s.damageTargets={};},onAttackResult:(h,ctx)=>{if(ctx.hit&&ctx.damageResult?.amount>0){var s=rkState(h);s.damageTargets=s.damageTargets||{};s.damageTargets[rkTurnKey(h)+':'+String(ctx.targetId||'')]=true;}}}};
  if(window.DNDContent)window.DNDContent.registerClass(pack);else (window.DND_PENDING_CLASS_PACKS=window.DND_PENDING_CLASS_PACKS||[]).push(pack);
  window.runeKeeperRuntime.useFeature=rkUse;window.runeKeeperRuntime.charge=rkCharge;window.runeKeeperRuntime.MECHANICS=MECHANICS;window.runeKeeperRuntime.inscribe=rkInscribe;window.runeKeeperRuntime.invoke=rkInvoke;window.runeKeeperRuntime.useRunicCharge=rkCharge;window.runeKeeperRuntime.setStance=rkStance;window.runeKeeperRuntime.chooseDialect=rkDialect;window.runeKeeperRuntime.restore=rkRestore;window.runeKeeperRuntime.sync=rkSync;window.runeKeeperRuntime.stanceEffect=rkStanceEffect;window.runeKeeperRuntime.longRest=rkLongRest;window.runeKeeperRuntime.shortRest=rkShortRest;window.runeKeeperRuntime.canInvoke=rkCanInvoke;window.runeKeeperRuntime.dismiss=rkDismiss;window.runeKeeperRuntime.invokeMany=rkInvokeMany;


})();
/* V70.26.91 mechanical closure audit: inscription limits, inert-rune charges, long-rest semantics and Rune Chant. */
