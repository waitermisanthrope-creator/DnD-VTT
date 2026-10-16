/** Предсказатель: конечные колоды, учёт применения и механики Шулера в профиле.
 * DNDPredictor управляет predictorState, ничего не пишет в отдельное хранилище.
 * draw/offer/choose не расходуют действия. recordApplication — только учёт уже
 * выполненного эффекта, НЕ исполнение карты. Утверждённые эффекты и цены действий исполняет DNDPredictorCards.
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
    if(s.offer){if(['minor','major'].indexOf(s.offer.deck)<0)ok=false;zone(s.offer.cards,s.offer.deck);if(!Array.isArray(s.offer.cards)||!s.offer.cards.length||s.offer.cards.length>(s.offer.kind==='swap'?3:2))ok=false;}
    if(s.trickster&&!validTrickster(s.trickster))ok=false;
    // Optional in schema 1 so old saves remain byte-for-byte unchanged on load.
    if(s.blind){zone([s.blind.card]);if(typeof s.blind.operationId!=='string'||!s.blind.operationId||typeof s.blind.event!=='string')ok=false;}
    if(s.window&&(!['initial','turn'].includes(s.window.kind)||!Number.isInteger(s.window.remaining)||s.window.remaining<0||typeof s.window.id!=='string'))ok=false;
    return ok&&seen.size===78;
  }
  function validTrickster(t){
    if(!t||!Array.isArray(t.swappedTurns)||!Array.isArray(t.wagers)||!Array.isArray(t.slipTurns)||!Array.isArray(t.rewards)||typeof t.lastTrumpUsed!=='boolean')return false;
    if(t.swappedTurns.concat(t.slipTurns).some(function(x){return typeof x!=='string';}))return false;
    if(t.wagers.some(function(w){return !w||typeof w.id!=='string'||!Object.prototype.hasOwnProperty.call(SUITS,w.suit)||typeof w.won!=='boolean'||!['pending','won','lost'].includes(w.status)||!w.odds||!Number.isInteger(w.odds.numerator)||!Number.isInteger(w.odds.denominator)||w.odds.numerator<0||w.odds.numerator>w.odds.denominator||w.odds.denominator<1;}))return false;
    return !t.rewards.some(function(r){return !r||typeof r.id!=='string'||!['swords','cups','pentacles','wands','slip'].includes(r.kind)||!['pending','claimed','expired'].includes(r.status)||(['swords','cups','pentacles'].includes(r.kind)&&(!Number.isInteger(r.amount)||r.amount<0))||(r.remainingFeet!=null&&(!Number.isFinite(r.remainingFeet)||r.remainingFeet<0));});
  }
  function inspect(h){var s=h&&h.predictorState;if(!level(h))return fail('Персонаж не имеет уровней Предсказателя.');if(!valid(s))return fail('Состояние колод отсутствует или повреждено; автоматического сброса нет.');return {ok:true,state:copy(s),capacity:capacity(h),majorMax:maxResource(level(h)),majorCurrent:Math.max(0,maxResource(level(h))-s.majorSpent)};}
  function initialize(h){if(!level(h))return fail('Персонаж не имеет уровней Предсказателя.');if(h.predictorState)return inspect(h);try{h.predictorState=fresh();return inspect(h);}catch(e){return fail(e.message);}}
  function mutate(h,fn){var check=inspect(h);if(!check.ok)return check;var s=check.state,result;try{result=fn(s);if(!result.ok)return result;if(!valid(s))return fail('Операция нарушает целостность колоды.');s.revision++;h.predictorState=s;return Object.assign(result,{revision:s.revision});}catch(e){return fail(e.message);}}
  function available(h,id){var c=BY_ID[id];if(!c)return false;if(c.deck==='minor')return true;if(level(h)<3||!RULES.unlockSchedule)return false;var at=RULES.unlockSchedule[id];return Number.isInteger(at)&&level(h)>=at;}
  function take(h,s,deck){var a=s.decks[deck],i=a.findIndex(function(id){return available(h,id);});return i<0?null:a.splice(i,1)[0];}
  function beginInitial(h){return mutate(h,function(s){if(s.blind)return fail('Сначала примените слепую карту.');var cap=capacity(h);if(cap===null)return fail('Не определён размер руки для текущего уровня/подкласса.');if(s.window)return fail('Окно добора уже открыто.');s.window={kind:'initial',id:'initial:'+s.revision,remaining:Math.max(0,cap-s.hand.length)};return {ok:true};});}
  function endTurn(h,turnId){return mutate(h,function(s){if(typeof turnId!=='string'||!turnId)return fail('Нужен идентификатор завершённого хода.');if(s.blind)return fail('Сначала примените слепую карту.');if(s.offer)return fail('Сначала завершите открытый выбор карты.');if(s.turnIds.indexOf(turnId)>=0)return fail('Этот ход уже учтён.');s.turnIds.push(turnId);if(capacity(h)===null)return fail('Не определён размер руки.');if(s.trickster){s.trickster.ownTurnId=null;s.trickster.rewards.forEach(function(r){if(r.kind==='slip'&&r.ownTurnId===turnId&&r.status==='pending')r.status='expired';});}s.window={kind:'turn',id:turnId,remaining:level(h)<5?1:level(h)<17?2:3};return {ok:true};});}
  function canDraw(h,s,deck){if(['minor','major'].indexOf(deck)<0)return fail('Неизвестная колода.');if(s.blind)return fail('Сначала завершите обязательное применение слепой карты.');if(s.offer)return fail('Сначала выберите одну из открытых карт.');var cap=capacity(h);if(cap===null)return fail('Не определён размер руки.');if(s.hand.length>=cap)return fail('Рука заполнена.');if(!s.window||s.window.remaining<1)return fail('Нет доступного добора.');if(deck==='major'&&!RULES.unlockSchedule)return fail('Таблица открытия Старших ещё не утверждена.');return {ok:true};}
  function draw(h,deck){return offer(h,deck);}
  function offer(h,deck){return mutate(h,function(s){var r=canDraw(h,s,deck);if(!r.ok)return r;var ids=[];for(var i=0;i<2;i++){var id=take(h,s,deck);if(id)ids.push(id);}if(!ids.length)return fail('В колоде нет доступных карт.');s.offer={deck:deck,cards:ids};return {ok:true,cards:ids.slice()};});}
  function choose(h,id){return mutate(h,function(s){if(!s.offer||s.offer.cards.indexOf(id)<0)return fail('Карта не входит в текущий выбор.');var cap=capacity(h);if(cap===null||s.hand.length>=cap)return fail('Рука заполнена или её лимит не определён.');if(!available(h,id))return fail('Карта недоступна на текущем уровне.');s.hand.push(id);var d=s.offer.deck,swap=s.offer.kind==='swap';s.offer.cards.forEach(function(x){if(x!==id)s.decks[d].push(x);});shuffle(s.decks[d]);s.offer=null;if(!swap)s.window.remaining--;return {ok:true,card:id};});}
  function isTrickster(h,min){return sub(h)==='trickster'&&level(h)>=(min||3);}
  function trick(s){if(!s.trickster)s.trickster={swappedTurns:[],wagers:[],slipTurns:[],rewards:[],lastTrumpUsed:false};return s.trickster;}
  function drawQuota(h){return level(h)<5?1:level(h)<17?2:3;}
  function swapCard(h,id){return mutate(h,function(s){
    if(!isTrickster(h))return fail('Смена расклада доступна только Шулеру с 3-го уровня.');
    if(s.blind||s.offer)return fail('Сначала завершите текущий выбор.');
    if(!s.window||s.window.kind!=='turn'||s.window.remaining!==drawQuota(h))return fail('Менять расклад можно перед обычным добором в конце своего хода.');
    var t=trick(s);if(t.swappedTurns.includes(s.window.id))return fail('Расклад в этом ходу уже менялся.');
    var i=s.hand.indexOf(id);if(i<0||!BY_ID[id]||BY_ID[id].deck!=='minor')return fail('Выберите Младшую из руки.');
    s.hand.splice(i,1);s.decks.minor.push(id);shuffle(s.decks.minor);var ids=[];
    for(var n=0;n<(level(h)>=10?3:2);n++){var c=take(h,s,'minor');if(c)ids.push(c);}
    s.offer={deck:'minor',cards:ids,kind:'swap'};t.swappedTurns.push(s.window.id);return {ok:true,cards:ids.slice()};
  });}
  function classification(h,s,deck,event,rules){
    var eligible=s.decks[deck].filter(function(id){return available(h,id);});
    if(!eligible.length)return fail('В колоде нет доступных карт.');
    if(!rules||eligible.some(function(id){var r=Object.prototype.hasOwnProperty.call(rules,id)&&rules[id];return !r||!['action','bonus','reaction'].includes(r.action)||(r.action==='reaction'&&(typeof r.trigger!=='string'||!r.trigger));}))return fail('Нет утверждённых правил времени применения для доступных карт.');
    return {ok:true,cards:eligible.filter(function(id){return rules[id].action!=='reaction'||rules[id].trigger===event;})};
  }
  function wagerOdds(h,suit,event,rules){
    var r=inspect(h);if(!r.ok)return r;if(!isTrickster(h))return fail('Ва-банк доступен только Шулеру.');
    if(!Object.prototype.hasOwnProperty.call(SUITS,suit)||typeof event!=='string')return fail('Неверная масть или событие.');
    var c=classification(h,r.state,'minor',event,rules);if(!c.ok)return c;
    var count=c.cards.filter(function(id){return BY_ID[id].suit===suit;}).length;
    return {ok:true,numerator:count,denominator:c.cards.length,percent:c.cards.length?100*count/c.cards.length:null,revision:r.state.revision};
  }
  // One call commits both the announced suit and mandatory random result.
  // No separate "preview card" step is exposed to the wagering UI.
  function beginWager(h,suit,operationId,event,rules,expectedRevision){
    var odds=wagerOdds(h,suit,event,rules);if(!odds.ok)return odds;
    if(odds.revision!==expectedRevision)return fail('Расклад изменился: обновите вероятность.');
    if(!odds.denominator)return fail('Нет применимых карт для ставки.');
    var draft=copy(h),s=draft.predictorState,t=trick(s),max=2+Math.floor((level(h)-1)/4);
    if(t.wagers.length>=max)return fail('Ставки исчерпаны до продолжительного отдыха.');
    var result=beginBlind(draft,'minor',operationId,event,rules);if(!result.ok)return result;
    trick(draft.predictorState).wagers.push({id:operationId,suit:suit,won:BY_ID[result.card].suit===suit,status:'pending',odds:{numerator:odds.numerator,denominator:odds.denominator}});
    h.predictorState=draft.predictorState;return Object.assign(result,{won:BY_ID[result.card].suit===suit});
  }
  function luckDie(h){return level(h)<6?6:level(h)<10?8:level(h)<14?10:12;}
  function charisma(h){var stats=g.DNDRules?g.DNDRules.getStats(h):h.stats||h.abilityScores||{},n=Number(stats.cha==null?stats.charisma:stats.cha);return Math.max(1,Math.floor(((Number.isFinite(n)?n:10)-10)/2));}
  function tricksterStatus(h){var r=inspect(h);if(!r.ok)return r;if(!isTrickster(h))return fail('Подкласс Шулер не выбран.');var t=r.state.trickster,max=2+Math.floor((level(h)-1)/4);return {ok:true,wagerMax:max,wagerCurrent:Math.max(0,max-(t?t.wagers.length:0)),die:luckDie(h),lastTrumpAvailable:level(h)>=14&&!(t&&t.lastTrumpUsed),rewards:t?copy(t.rewards):[]};}
  function conscious(h){var hp=Number(h.hpCurrent!=null?h.hpCurrent:h.hp&&typeof h.hp==='object'?h.hp.current:h.hp),conditions=Object.assign({},h.conditions,h.activeConditions);return hp>0&&!['Бессознателен','Без сознания','Unconscious','unconscious'].some(function(k){return conditions[k];});}
  function beginOwnTurn(h,turnId){return mutate(h,function(s){if(!isTrickster(h))return fail('Подкласс Шулер не выбран.');if(typeof turnId!=='string'||!turnId)return fail('Нужен ID собственного хода.');var t=trick(s);if(t.ownTurnId===turnId)return fail('Начало хода уже учтено.');
    t.rewards.forEach(function(r){if(r.status==='pending'&&((r.kind==='wands'&&conscious(h))||r.kind==='slip'))r.status='expired';});t.ownTurnId=turnId;return {ok:true};});}
  // Only the movement resolver calls this AFTER checking the path. This returns
  // an allowance, not a teleport; an unconscious creature cannot spend it.
  function spendMovementReward(h,rewardId,feet,expectedRevision){return mutate(h,function(s){
    if(!conscious(h))return fail('Персонаж без сознания: выигрыш перемещения сохранён.');if(s.revision!==expectedRevision)return fail('Состояние изменилось.');
    var r=trick(s).rewards.find(function(x){return x.id===rewardId;});if(!r||r.status!=='pending'||!['wands','slip'].includes(r.kind))return fail('Нет доступного перемещения.');
    var remaining=r.remainingFeet==null?(r.kind==='slip'?10:Number(h.speed)):r.remainingFeet;if(!Number.isFinite(remaining)||!Number.isFinite(feet)||feet<=0||feet>remaining)return fail('Недопустимая дистанция.');r.remainingFeet=remaining-feet;if(!r.remainingFeet)r.status='claimed';return {ok:true,feet:feet,noOpportunityAttacks:true};
  });}
  function claimWagerReward(h,rewardId,ctx){
    ctx=ctx||{};var check=inspect(h);if(!check.ok)return check;if(check.state.revision!==ctx.expectedRevision)return fail('Состояние изменилось.');
    var reward=check.state.trickster&&check.state.trickster.rewards.find(function(x){return x.id===rewardId;});if(!reward||reward.status!=='pending'||!['swords','cups','pentacles'].includes(reward.kind))return fail('Нет доступной награды.');
    if(!g.DNDCombat)return fail('Боевой обработчик недоступен.');
    var target=reward.kind==='pentacles'?h:ctx.target;if(!target)return fail('Выберите цель награды.');
    if(target!==h&&(!ctx.visible||!Number.isFinite(ctx.distanceFt)||ctx.distanceFt<0||ctx.distanceFt>30))return fail('Цель должна быть видна в пределах 30 футов.');
    if(reward.kind==='swords'&&(target===h||ctx.relation!=='enemy'))return fail('Нужна враждебная цель.');if(reward.kind==='cups'&&target!==h&&ctx.relation!=='ally')return fail('Нужен союзник или сам владелец.');
    var ownerCopy=copy(h),embedded=h.initiativeTracker&&Array.isArray(h.initiativeTracker.combatants)?h.initiativeTracker.combatants.indexOf(target):-1,targetCopy=target===h?ownerCopy:embedded>=0?ownerCopy.initiativeTracker.combatants[embedded]:copy(target),r=ownerCopy.predictorState.trickster.rewards.find(function(x){return x.id===rewardId;}),result;
    try{if(r.kind==='swords')result=g.DNDCombat.applyDamage(targetCopy,r.amount,'сила',{source:'predictor-wager',attacker:ownerCopy,tarotScene:ownerCopy});else if(r.kind==='cups')result=g.DNDCombat.heal(targetCopy,r.amount,{tarotScene:ownerCopy,attacker:ownerCopy});else result=g.DNDCombat.grantTemporaryHitPoints(targetCopy,r.amount);}catch(e){return fail(e.message);}
    if(!result||result.blocked||result.peaceBlocked||result.ok===false)return fail('Награда не применена.');
    r.status='claimed';ownerCopy.predictorState.revision++;Object.assign(h,ownerCopy);if(target!==h)Object.assign(target,targetCopy);return {ok:true,result:result};
  }
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
  function recordApplication(h,id,operationId,expectedRevision,context){return mutate(h,function(s){
    if(typeof operationId!=='string'||!operationId)return fail('Нужен идентификатор применения.');
    if(s.applications.some(function(a){return a.id===operationId;}))return fail('Применение уже учтено.');
    if(expectedRevision!==s.revision)return fail('Профиль изменился; обновите состояние перед применением.');
    var blind=s.blind&&s.blind.card===id&&s.blind.operationId===operationId;
    if(s.blind&&!blind)return fail('Сначала примените выбранную слепую карту.');
    var i=s.hand.indexOf(id),c=BY_ID[id];if((i<0&&!blind)||!available(h,id))return fail('Нет доступной карты для применения.');
    if(c.deck==='major'){if(!Number.isInteger(RULES.majorCost)||RULES.majorCost<1)return fail('Цена Старшей не утверждена.');if(maxResource(level(h))-s.majorSpent<RULES.majorCost)return fail('Ресурс Старших исчерпан.');s.majorSpent+=RULES.majorCost;}
    if(blind)delete s.blind;else s.hand.splice(i,1);s.discard[c.deck].push(id);s.applications.push({id:operationId,card:id});
    if(isTrickster(h)){
      var t=trick(s),w=t.wagers.find(function(x){return x.id===operationId;});
      // Unconsciousness deliberately does not gate settlement or rewards.
      if(w&&w.status==='pending'){w.status=w.won?'won':'lost';if(w.won){var die=luckDie(h),roll=w.suit==='wands'?0:randomInt(die)+1;t.rewards.push({id:'wager:'+operationId,kind:w.suit,amount:w.suit==='wands'?null:roll+(w.suit==='pentacles'?level(h):charisma(h)),roll:roll,die:die,status:'pending'});}}
      var turn=context&&context.ownTurnId||t.ownTurnId;if(level(h)>=6&&typeof turn==='string'&&turn&&!t.slipTurns.includes(turn)){t.slipTurns.push(turn);t.rewards.push({id:'slip:'+turn,kind:'slip',feet:10,ownTurnId:turn,noOpportunityAttacks:true,status:'pending'});}
    }
    return {ok:true,card:id};
  });}
  // Invoked by the zero-HP damage boundary only on explicit player choice.
  // Card effects are not used: discarding is the subclass ability's own cost.
  function lastTrump(h,cardId,ctx){
    ctx=ctx||{};if(!isTrickster(h,14))return fail('Последний козырь доступен Шулеру с 14-го уровня.');
    var hp=Number(h.hpCurrent!=null?h.hpCurrent:h.hp&&typeof h.hp==='object'?h.hp.current:h.hp),max=Number(h.hpMax||h.maxHp||h.hp&&h.hp.max);
    if(hp!==0||!Number.isFinite(ctx.previousHp)||ctx.previousHp<=0||!Number.isFinite(ctx.hpDamage)||ctx.hpDamage<ctx.previousHp||!Number.isFinite(max)||ctx.hpDamage-ctx.previousHp>=max||ctx.instantDeath)return fail('Последний козырь неприменим к этому урону.');
    var conditions=Object.assign({},h.conditions,h.activeConditions);if(['Недееспособен','Оглушён','Парализован','Бессознателен','Incapacitated','Stunned','Paralyzed','Unconscious'].some(function(k){return conditions[k];}))return fail('Состояние не позволяет использовать реакцию.');
    if(!h.turnResources||!(h.turnResources.reaction===true||Number(h.turnResources.reaction)>0)||g.DNDPredictorCards&&g.DNDPredictorCards.blocked(h,'reaction'))return fail('Нет доступной реакции.');
    var r=mutate(h,function(s){var t=trick(s),i=s.hand.indexOf(cardId);if(t.lastTrumpUsed)return fail('Последний козырь уже использован.');if(i<0)return fail('Нет выбранной карты в руке.');s.hand.splice(i,1);s.discard[BY_ID[cardId].deck].push(cardId);t.lastTrumpUsed=true;return {ok:true};});
    if(r.ok){if(g.DNDPredictorCards)g.DNDPredictorCards.spendReaction(h);else h.turnResources.reaction=typeof h.turnResources.reaction==='number'?h.turnResources.reaction-1:false;if(h.hpCurrent!=null){h.hpCurrent=1;if(h.hp&&typeof h.hp==='object')h.hp.current=1;}else if(h.hp&&typeof h.hp==='object')h.hp.current=1;else h.hp=1;h.defeated=false;}
    return r;
  }
  function trumpOptions(h,ctx){
    if(!isTrickster(h,14)||g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return [];
    var r=inspect(h),hp=Number(h.hpCurrent!=null?h.hpCurrent:h.hp&&typeof h.hp==='object'?h.hp.current:h.hp),temp=Number(h.hpTemp||h.tempHp||h.hp&&h.hp.temp||0);
    if(!r.ok||r.state.trickster&&r.state.trickster.lastTrumpUsed||hp<=0||!Number.isFinite(ctx.amount)||ctx.amount-temp<hp)return [];
    return r.state.hand.map(function(id){return {id:'predictorTrump:'+id,priority:45,label:'Последний козырь: '+BY_ID[id].name,description:'Если итоговый урон опустит хиты до 0, сбросить эту карту и потратить реакцию, оставшись с 1 хитом. Не отменяет мгновенную смерть.'};});
  }
  function rest(h,type,restId){if(type!=='long')return inspect(h);var result=mutate(h,function(s){
    if(typeof restId!=='string'||!restId)return fail('Нужен идентификатор продолжительного отдыха.');if(s.lastRestId===restId)return fail('Этот отдых уже учтён.');
    var next=fresh();next.revision=s.revision;next.lastRestId=restId;Object.keys(s).forEach(function(k){delete s[k];});Object.assign(s,next);
    var cap=capacity(h);if(cap!==null)s.window={kind:'initial',id:'rest:'+restId,remaining:cap};return {ok:true};
  });if(result.ok&&g.DNDPredictorCards)g.DNDPredictorCards.longRestEffects(h);return result;}
  function sync(h){return h&&h.predictorState?inspect(h):initialize(h);}
  var api={rules:copy(RULES),cards:CARDS,subclasses:copy(SUBS),initialize:initialize,inspect:inspect,capacity:capacity,beginInitial:beginInitial,endTurn:endTurn,draw:draw,offer:offer,choose:choose,beginBlind:beginBlind,recordApplication:recordApplication,rest:rest,sync:sync,swapCard:swapCard,wagerOdds:wagerOdds,beginWager:beginWager,tricksterStatus:tricksterStatus,lastTrump:lastTrump,beginOwnTurn:beginOwnTurn,spendMovementReward:spendMovementReward,claimWagerReward:claimWagerReward};
  g.DNDPredictor=api;
  api.trumpOptions=trumpOptions;
  // The builder can show this class, but no unapproved proficiencies or combat
  // effects are invented. The runtime pack explicitly declares its partial status.
  g.CLASSES_REFERENCE=g.CLASSES_REFERENCE||{};
  g.CLASSES_REFERENCE['Предсказатель']={hitDie:8,primaryStat:'charisma',subclassLevel:3,contentPackId:'custom-predictor',description:'Колоды, сохранение и часть эффектов карт; класс в разработке.'};
  g.SUBCLASSES_REFERENCE=g.SUBCLASSES_REFERENCE||{};
  g.SUBCLASSES_REFERENCE['Предсказатель']={};
  var TRICK_FEATURES=[{id:'predictorSwap',name:'Смена расклада',level:3,action:'utility'},{id:'predictorWager',name:'Ва-банк',level:3,action:'utility'},{id:'predictorSlip',name:'Скользкий тип',level:6,action:'passive'},{id:'predictorMarked',name:'Краплёная судьба',level:10,action:'passive'},{id:'predictorTrump',name:'Последний козырь',level:14,action:'reaction'}];
  Object.keys(SUBS).forEach(function(k){g.SUBCLASSES_REFERENCE['Предсказатель'][SUBS[k].name]={pickLevel:3,source:'User homebrew',description:k==='trickster'?'Обмен расклада, ставки на масть и защитные приёмы. Доступны подключённые эффекты карт; неподдержанные результаты блокируются.':'Этап 1: состояние колод; способности подкласса ещё не реализованы.',levels:k==='trickster'?{3:{features:['Смена расклада','Ва-банк']},6:{features:['Скользкий тип']},10:{features:['Краплёная судьба']},14:{features:['Последний козырь']}}:{}};});
  if(g.DNDContent)g.DNDContent.registerClass({id:'custom-predictor',name:'Предсказатель',source:'User-authored homebrew, stage 1',license:'Original implementation',metadata:{status:'deck_and_trickster_runtime_partial_cards',hitDie:8,primaryAbilities:['charisma'],subclassLevel:3},features:[],subclasses:Object.keys(SUBS).map(function(k){return {id:k,name:SUBS[k].name,features:k==='trickster'?TRICK_FEATURES:[]};}),hooks:{sync:sync,rest:function(h,type){if(h.predictorState)return rest(h,type,'rest:'+(h.lastRest&&h.lastRest.at||h.predictorState.revision));}}});
})(window);
