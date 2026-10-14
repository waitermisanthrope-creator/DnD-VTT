/** Предсказатель, этап 1: конечные колоды и журнал применения внутри профиля.
 * DNDPredictor управляет predictorState, ничего не пишет в отдельное хранилище.
 * draw/offer/choose не расходуют действия. recordApplication — только учёт уже
 * выполненного эффекта, НЕ исполнение карты. Эффекты и цены действий ещё не утверждены.
 * Неопределённые правила представлены null и блокируют зависимые операции.
 */
(function(g){
  'use strict';
  var RULES={preSubclassBase:2,majorCost:1,choiceMode:'always',unlockSchedule:{major_01:3,major_02:3,major_09:3,major_14:3,major_07:5,major_08:5,major_17:5,major_18:5,major_03:7,major_04:7,major_05:7,major_06:7,major_10:9,major_11:9,major_12:9,major_15:9,major_19:11,major_20:11,major_00:15,major_16:15,major_13:17,major_21:17}};
  var SUBS={oracle:{name:'Оракул',base:2},trickster:{name:'Шулер',base:1},weaver:{name:'Ткач Судьбы',base:3}};
  var MAJORS=['Дурак','Маг','Верховная Жрица','Императрица','Император','Иерофант','Влюблённые','Колесница','Сила','Отшельник','Колесо Фортуны','Справедливость','Повешенный','Смерть','Умеренность','Дьявол','Башня','Звезда','Луна','Солнце','Суд','Мир'];
  var RANKS=['Туз','Двойка','Тройка','Четвёрка','Пятёрка','Шестёрка','Семёрка','Восьмёрка','Девятка','Десятка','Паж','Рыцарь','Королева','Король'];
  var SUITS={swords:'Мечей',cups:'Кубков',pentacles:'Пентаклей',wands:'Жезлов'},CARDS=[],BY_ID=Object.create(null);
  function add(c){Object.freeze(c);CARDS.push(c);BY_ID[c.id]=c;}
  MAJORS.forEach(function(name,i){add({id:'major_'+String(i).padStart(2,'0'),name:name,deck:'major',number:i});});
  Object.keys(SUITS).forEach(function(s){RANKS.forEach(function(r,i){add({id:s+'_'+String(i+1).padStart(2,'0'),name:r+' '+SUITS[s],deck:'minor',suit:s,rank:i+1});});});
  Object.freeze(CARDS);
  function copy(v){return JSON.parse(JSON.stringify(v));}
  function fail(reason){return {ok:false,reason:reason};}
  function entry(h){return h&&Array.isArray(h.classes)&&h.classes.find(function(c){return c.name==='Предсказатель';});}
  function level(h){var c=entry(h),n=Number(c&&c.level);return Number.isInteger(n)&&n>=1&&n<=20?n:0;}
  function sub(h){var c=entry(h);return c&&Object.keys(SUBS).find(function(k){return c.subclass===k||c.subclass===SUBS[k].name;});}
  function maxResource(l){return l<3?0:l<5?2:l<9?4:l<13?5:l<17?6:8;}
  function capacity(h){var l=level(h),s=sub(h),base=l<3?RULES.preSubclassBase:s&&SUBS[s].base;return typeof base==='number'?base+Math.floor(l/2):null;}
  function randomInt(n){
    if(!g.crypto||typeof g.crypto.getRandomValues!=='function')throw Error('Безопасный генератор случайности недоступен.');
    var a=new Uint32Array(1),limit=Math.floor(4294967296/n)*n;
    do{g.crypto.getRandomValues(a);}while(a[0]>=limit);
    return a[0]%n;
  }
  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=randomInt(i+1),v=a[i];a[i]=a[j];a[j]=v;}return a;}
  function fresh(){return {schemaVersion:1,revision:0,decks:{minor:shuffle(CARDS.filter(function(c){return c.deck==='minor';}).map(function(c){return c.id;})),major:shuffle(CARDS.filter(function(c){return c.deck==='major';}).map(function(c){return c.id;}))},hand:[],discard:{minor:[],major:[]},offer:null,majorSpent:0,applications:[],lastRestId:null,window:null,turnIds:[]};}
  function valid(s){
    if(!s||s.schemaVersion!==1||!Number.isInteger(s.revision)||s.revision<0||!Number.isInteger(s.majorSpent)||s.majorSpent<0||!Array.isArray(s.hand)||!Array.isArray(s.applications)||!Array.isArray(s.turnIds)||s.turnIds.some(function(id){return typeof id!=='string';}))return false;
    var seen=new Set(),ok=true;
    function zone(a,deck){if(!Array.isArray(a)){ok=false;return;}a.forEach(function(id){var c=BY_ID[id];if(!c||seen.has(id)||(deck&&c.deck!==deck))ok=false;seen.add(id);});}
    ['minor','major'].forEach(function(d){zone(s.decks&&s.decks[d],d);zone(s.discard&&s.discard[d],d);});zone(s.hand);
    if(s.offer){if(['minor','major'].indexOf(s.offer.deck)<0)ok=false;zone(s.offer.cards,s.offer.deck);if(!Array.isArray(s.offer.cards)||!s.offer.cards.length||s.offer.cards.length>2)ok=false;}
    // Optional in schema 1 so old saves remain byte-for-byte unchanged on load.
    if(s.blind){zone([s.blind.card]);if(typeof s.blind.operationId!=='string'||!s.blind.operationId||typeof s.blind.event!=='string')ok=false;}
    if(s.window&&(!['initial','turn'].includes(s.window.kind)||!Number.isInteger(s.window.remaining)||s.window.remaining<0||typeof s.window.id!=='string'))ok=false;
    return ok&&seen.size===78;
  }
  function inspect(h){var s=h&&h.predictorState;if(!level(h))return fail('Персонаж не имеет уровней Предсказателя.');if(!valid(s))return fail('Состояние колод отсутствует или повреждено; автоматического сброса нет.');return {ok:true,state:copy(s),capacity:capacity(h),majorMax:maxResource(level(h)),majorCurrent:Math.max(0,maxResource(level(h))-s.majorSpent)};}
  function initialize(h){if(!level(h))return fail('Персонаж не имеет уровней Предсказателя.');if(h.predictorState)return inspect(h);try{h.predictorState=fresh();return inspect(h);}catch(e){return fail(e.message);}}
  function mutate(h,fn){var check=inspect(h);if(!check.ok)return check;var s=check.state,result;try{result=fn(s);if(!result.ok)return result;if(!valid(s))return fail('Операция нарушает целостность колоды.');s.revision++;h.predictorState=s;return Object.assign(result,{revision:s.revision});}catch(e){return fail(e.message);}}
  function available(h,id){var c=BY_ID[id];if(!c)return false;if(c.deck==='minor')return true;if(level(h)<3||!RULES.unlockSchedule)return false;var at=RULES.unlockSchedule[id];return Number.isInteger(at)&&level(h)>=at;}
  function take(h,s,deck){var a=s.decks[deck],i=a.findIndex(function(id){return available(h,id);});return i<0?null:a.splice(i,1)[0];}
  function beginInitial(h){return mutate(h,function(s){if(s.blind)return fail('Сначала примените слепую карту.');var cap=capacity(h);if(cap===null)return fail('Не определён размер руки для текущего уровня/подкласса.');if(s.window)return fail('Окно добора уже открыто.');s.window={kind:'initial',id:'initial:'+s.revision,remaining:Math.max(0,cap-s.hand.length)};return {ok:true};});}
  function endTurn(h,turnId){return mutate(h,function(s){if(typeof turnId!=='string'||!turnId)return fail('Нужен идентификатор завершённого хода.');if(s.blind)return fail('Сначала примените слепую карту.');if(s.offer)return fail('Сначала завершите открытый выбор карты.');if(s.turnIds.indexOf(turnId)>=0)return fail('Этот ход уже учтён.');s.turnIds.push(turnId);if(capacity(h)===null)return fail('Не определён размер руки.');s.window={kind:'turn',id:turnId,remaining:level(h)<5?1:level(h)<17?2:3};return {ok:true};});}
  function canDraw(h,s,deck){if(['minor','major'].indexOf(deck)<0)return fail('Неизвестная колода.');if(s.blind)return fail('Сначала завершите обязательное применение слепой карты.');if(s.offer)return fail('Сначала выберите одну из открытых карт.');var cap=capacity(h);if(cap===null)return fail('Не определён размер руки.');if(s.hand.length>=cap)return fail('Рука заполнена.');if(!s.window||s.window.remaining<1)return fail('Нет доступного добора.');if(deck==='major'&&!RULES.unlockSchedule)return fail('Таблица открытия Старших ещё не утверждена.');return {ok:true};}
  function draw(h,deck){return offer(h,deck);}
  function offer(h,deck){return mutate(h,function(s){var r=canDraw(h,s,deck);if(!r.ok)return r;var ids=[];for(var i=0;i<2;i++){var id=take(h,s,deck);if(id)ids.push(id);}if(!ids.length)return fail('В колоде нет доступных карт.');s.offer={deck:deck,cards:ids};return {ok:true,cards:ids.slice()};});}
  function choose(h,id){return mutate(h,function(s){if(!s.offer||s.offer.cards.indexOf(id)<0)return fail('Карта не входит в текущий выбор.');var cap=capacity(h);if(cap===null||s.hand.length>=cap)return fail('Рука заполнена или её лимит не определён.');if(!available(h,id))return fail('Карта недоступна на текущем уровне.');s.hand.push(id);var d=s.offer.deck;s.offer.cards.forEach(function(x){if(x!==id)s.decks[d].push(x);});shuffle(s.decks[d]);s.offer=null;s.window.remaining--;return {ok:true,card:id};});}
  // Infrastructure only: rules must come from an approved executor, never from
  // the draft action table. The selected card is mandatory, not added to hand.
  function beginBlind(h,deck,operationId,event,approvedRules){return mutate(h,function(s){
    if(['minor','major'].indexOf(deck)<0)return fail('Неизвестная колода.');
    if(typeof operationId!=='string'||!operationId||typeof event!=='string')return fail('Нужны ID применения и событие.');
    if(s.blind)return fail('Слепая карта уже выбрана и должна быть применена.');
    if(s.offer)return fail('Сначала завершите открытый выбор карты.');
    if(s.applications.some(function(a){return a.id===operationId;}))return fail('Применение уже учтено.');
    if(deck==='major'&&maxResource(level(h))-s.majorSpent<RULES.majorCost)return fail('Ресурс Старших исчерпан.');
    var eligible=s.decks[deck].filter(function(id){return available(h,id);});
    if(!eligible.length)return fail('В колоде нет доступных карт.');
    if(!approvedRules||eligible.some(function(id){var r=Object.prototype.hasOwnProperty.call(approvedRules,id)&&approvedRules[id];return !r||!['action','bonus','reaction'].includes(r.action)||(r.action==='reaction'&&(typeof r.trigger!=='string'||!r.trigger));}))return fail('Нет утверждённых правил времени применения для доступных карт.');
    function fits(id){var r=approvedRules[id];return r.action!=='reaction'||r.trigger===event;}
    var applicable=eligible.filter(fits);
    if(!applicable.length)return fail('Остались только реакции без подходящего события.');
    var id,retries=0,limit=eligible.length*2;
    do{
      id=take(h,s,deck);
      if(fits(id))break;
      s.decks[deck].push(id);shuffle(s.decks[deck]);retries++;
      // Bounded fallback preserves uniform selection among applicable cards;
      // skipped reactions remain in deck, including with adversarial test RNG.
      if(retries>=limit){var pick=applicable[randomInt(applicable.length)];s.decks[deck].splice(s.decks[deck].indexOf(pick),1);id=pick;break;}
    }while(true);
    s.blind={card:id,operationId:operationId,event:event};return {ok:true,card:id,retries:retries};
  });}
  // Ledger boundary for future effect executor. No action/effect is inferred from
  // the draft table. Call only AFTER an approved effect has actually succeeded.
  function recordApplication(h,id,operationId,expectedRevision){return mutate(h,function(s){
    if(typeof operationId!=='string'||!operationId)return fail('Нужен идентификатор применения.');
    if(s.applications.some(function(a){return a.id===operationId;}))return fail('Применение уже учтено.');
    if(expectedRevision!==s.revision)return fail('Профиль изменился; обновите состояние перед применением.');
    var blind=s.blind&&s.blind.card===id&&s.blind.operationId===operationId;
    if(s.blind&&!blind)return fail('Сначала примените выбранную слепую карту.');
    var i=s.hand.indexOf(id),c=BY_ID[id];if((i<0&&!blind)||!available(h,id))return fail('Нет доступной карты для применения.');
    if(c.deck==='major'){if(!Number.isInteger(RULES.majorCost)||RULES.majorCost<1)return fail('Цена Старшей не утверждена.');if(maxResource(level(h))-s.majorSpent<RULES.majorCost)return fail('Ресурс Старших исчерпан.');s.majorSpent+=RULES.majorCost;}
    if(blind)delete s.blind;else s.hand.splice(i,1);s.discard[c.deck].push(id);s.applications.push({id:operationId,card:id});return {ok:true,card:id};
  });}
  function rest(h,type,restId){if(type!=='long')return inspect(h);return mutate(h,function(s){
    if(typeof restId!=='string'||!restId)return fail('Нужен идентификатор продолжительного отдыха.');if(s.lastRestId===restId)return fail('Этот отдых уже учтён.');
    var next=fresh();next.revision=s.revision;next.lastRestId=restId;Object.keys(s).forEach(function(k){delete s[k];});Object.assign(s,next);
    var cap=capacity(h);if(cap!==null)s.window={kind:'initial',id:'rest:'+restId,remaining:cap};return {ok:true};
  });}
  function sync(h){return h&&h.predictorState?inspect(h):initialize(h);}
  var api={rules:copy(RULES),cards:CARDS,subclasses:copy(SUBS),initialize:initialize,inspect:inspect,capacity:capacity,beginInitial:beginInitial,endTurn:endTurn,draw:draw,offer:offer,choose:choose,beginBlind:beginBlind,recordApplication:recordApplication,rest:rest,sync:sync};
  g.DNDPredictor=api;
  // The builder can show this class, but no unapproved proficiencies or combat
  // effects are invented. The runtime pack explicitly declares its partial status.
  g.CLASSES_REFERENCE=g.CLASSES_REFERENCE||{};
  g.CLASSES_REFERENCE['Предсказатель']={hitDie:8,primaryStat:'charisma',subclassLevel:3,contentPackId:'custom-predictor',description:'Этап 1: колоды и сохранение; эффекты карт ещё не реализованы.'};
  g.SUBCLASSES_REFERENCE=g.SUBCLASSES_REFERENCE||{};
  g.SUBCLASSES_REFERENCE['Предсказатель']={};
  Object.keys(SUBS).forEach(function(k){g.SUBCLASSES_REFERENCE['Предсказатель'][SUBS[k].name]={pickLevel:3,source:'User homebrew',description:'Этап 1: состояние колод; способности подкласса ещё не реализованы.',levels:{}};});
  if(g.DNDContent)g.DNDContent.registerClass({id:'custom-predictor',name:'Предсказатель',source:'User-authored homebrew, stage 1',license:'Original implementation',metadata:{status:'stage1_deck_state_only',hitDie:8,primaryAbilities:['charisma'],subclassLevel:3},features:[],subclasses:Object.keys(SUBS).map(function(k){return {id:k,name:SUBS[k].name,features:[]};}),hooks:{sync:sync,rest:function(h,type){if(h.predictorState)return rest(h,type,'rest:'+(h.lastRest&&h.lastRest.at||h.predictorState.revision));}}});
})(window);
