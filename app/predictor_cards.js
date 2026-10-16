/** Approved Tarot action catalogue and transactional card executor.
 * DNDPredictorCards owns execution, not decks: DNDPredictor still owns all cards.
 * play clones the complete profile/encounter, applies a supported effect and
 * commits action, discard and wager reward together. Unsupported capabilities
 * fail before consuming anything. No card effect is treated as a text-only success.
 */
(function(g){
  'use strict';
  var A=g.DNDPredictor;if(!A)return;
  var MAJOR_ACTIONS=['action','action','action','action','bonus','action','bonus','bonus','bonus','action','bonus','action','action','action','action','bonus','action','action','bonus','action','action','action'];
  var MINOR_ACTIONS={swords:['bonus','bonus','bonus','action','bonus','bonus','action','bonus','bonus','action','bonus','action','bonus','bonus'],cups:['action','action','bonus','bonus','reaction','bonus','action','bonus','bonus','action','action','bonus','reaction','bonus'],pentacles:['action','bonus','bonus','bonus','bonus','action','action','action','bonus','action','action','bonus','action','reaction'],wands:['bonus','reaction','action','action','bonus','bonus','bonus','bonus','bonus','bonus','bonus','bonus','bonus','bonus']};
  var TRIGGERS={cups_05:'attack_hit',cups_13:'healing_spell',pentacles_14:'saving_throw',wands_02:'initiative'};
  var DEFS=Object.create(null);
  A.cards.forEach(function(c){DEFS[c.id]=Object.freeze({id:c.id,name:c.name,action:c.deck==='major'?MAJOR_ACTIONS[c.number]:MINOR_ACTIONS[c.suit][c.rank-1],trigger:TRIGGERS[c.id]||null});});
  var HANDLERS=Object.create(null);
  var copy=function(x){return JSON.parse(JSON.stringify(x));};
  function error(s){throw Error(s);}
  function lvl(h){return Number((h.classes||[]).find(function(c){return c.name==='Предсказатель';}).level);}
  function step(h){var l=lvl(h);return l<5?1:l<11?2:l<17?3:4;}
  function cha(h){var s=g.DNDRules?g.DNDRules.getStats(h):h.stats||h.abilityScores||{},n=Number(s.cha==null?s.charisma:s.cha);return Math.floor(((Number.isFinite(n)?n:10)-10)/2);}
  function dc(h){return 8+2+Math.floor((lvl(h)-1)/4)+cha(h);}
  function roll(n,s,h){if(h&&consumeMaximum(h))return n*s;if(!g.crypto||!g.crypto.getRandomValues)error('Недоступен генератор случайности.');var a=new Uint32Array(1),total=0,lim=Math.floor(4294967296/s)*s;for(var i=0;i<n;i++){do{g.crypto.getRandomValues(a);}while(a[0]>=lim);total+=1+a[0]%s;}return total;}
  function effects(h){return h&&Array.isArray(h.tarotEffects)?h.tarotEffects:[];}
  function owned(h,t){return !!t&&(t.characterId===h.id||t.id===h.id||!t.characterId&&t.type==='hero'&&t.name===h.name);}
  function actors(h){return [h].concat((h.initiativeTracker&&h.initiativeTracker.combatants||[]).filter(function(t){return !owned(h,t);}));}
  function actor(h,id){var list=h.initiativeTracker&&h.initiativeTracker.combatants||[];if(list.some(function(t){return String(t.id)===String(id)&&owned(h,t);}))return h;var t=actors(h).find(function(x){return String(x.id)===String(id);});if(!t)error('Цель не найдена в текущей сцене.');return t;}
  // Board tokens use bt_<initiative ID>/sourceId, not necessarily character ID.
  function token(h,t){
    var bf=h.initiativeTracker&&h.initiativeTracker.battlefield;
    var ids=[String(t.id)],cs=h.initiativeTracker&&h.initiativeTracker.combatants||[];
    if(t===h)cs.forEach(function(c){if(owned(h,c))ids.push(String(c.id));});
    var found=bf&&Object.values(bf.tokens||{}).find(function(x){return ids.some(function(id){return String(x.combatantId)===id||String(x.sourceId)===id||String(x.characterId)===id||String(x.id)===id||String(x.id)==='bt_'+id;});});
    var p=found||t.position;
    return p&&Number.isFinite(p.x)&&Number.isFinite(p.y)?p:null;
  }
  function hp(t){return Number(t.hpCurrent!=null?t.hpCurrent:t.hp&&typeof t.hp==='object'?t.hp.current:t.hp);}
  function maxHp(t){return Number(t.hpMax||t.maxHp||t.hp&&t.hp.max);}
  function syncOwner(h){(h.initiativeTracker&&h.initiativeTracker.combatants||[]).forEach(function(t){if(owned(h,t)){t.hp=hp(h);t.maxHp=maxHp(h);t.tempHp=Number(h.hpTemp||h.tempHp)||0;['turnResources','tarotEffects','conditions','activeConditions','concentration','deathSaves','position','inspiration','tarotInspirationReady'].forEach(function(key){if(h[key]!=null)t[key]=copy(h[key]);});}});}
  function distance(h,a,b){if(a===b)return 0;var p=token(h,a),q=token(h,b);if(!p||!q)error('Для проверки расстояния нужны позиции участников на карте.');var cell=h.initiativeTracker&&h.initiativeTracker.battlefield&&h.initiativeTracker.battlefield.cellFt||5;return Math.hypot((p.x-q.x)*cell,(p.y-q.y)*cell,(Number(p.elevationFt)||0)-(Number(q.elevationFt)||0));}
  function target(h,req,range){var t=actor(h,req.targetId);if(distance(h,h,t)>range)error('Цель вне дальности карты.');return t;}
  function allies(h,t){return t===h||t.team==='party'||t.type==='hero';}
  function area(h,radius,kind){return actors(h).filter(function(t){return (kind!=='ally'||allies(h,t))&&(kind!=='enemy'||!allies(h,t))&&distance(h,h,t)<=radius;});}
  function put(h,id,data){h.tarotEffects=h.tarotEffects||[];h.tarotEffects=h.tarotEffects.filter(function(e){return e.id!==id;});h.tarotEffects.push(Object.assign({id:id},data));}
  function conditions(h,kind){var key=g.DNDRules&&g.DNDRules.normalizeConditionName?g.DNDRules.normalizeConditionName(kind):kind;var applied=g.DNDCombat.toggleCondition(h,key,true);if(applied&&h.activeConditions)h.activeConditions[key]=true;return applied;}
  function clearCondition(h,kind){var key=g.DNDRules&&g.DNDRules.normalizeConditionName?g.DNDRules.normalizeConditionName(kind):kind;g.DNDCombat.toggleCondition(h,key,false);if(h.activeConditions)h.activeConditions[key]=false;}
  function payAction(h,kind,req){
    var conditions=Object.assign({},h.conditions,h.activeConditions);if(['Бессознателен','Оглушён','Парализован','Недееспособен','Unconscious'].some(function(k){return conditions[k];})||(!Number.isFinite(hp(h))||hp(h)<=0))error('Состояние персонажа не позволяет разыграть карту.');
    var fight=h.initiativeTracker,current=fight&&fight.combatants&&fight.combatants[fight.activeIndex];if(kind!=='reaction'&&current&&!owned(h,current))error('Эта карта доступна только в собственный ход.');
    if(blocked(h,kind))error('Активная карта запрещает это действие.');var r=h.turnResources;if(!r)error('Нет учёта действий текущего хода.');
    var key=kind==='action'?(r.actions!=null?'actions':'action'):kind==='bonus'?'bonusAction':'reaction';
    if(kind==='reaction'&&(!req.event||req.event!==DEFS[req.cardId].trigger))error('Нет подходящего события для реакции.');
    var available=r[key]===true?1:Number(r[key]);if(!Number.isFinite(available)||available<1)error('Нет доступного '+kind+' действия.');if(kind==='reaction'){if(!spendReaction(h))error('Реакция недоступна.');}else r[key]=typeof r[key]==='boolean'?false:available-1;
  }
  function damage(h,t,n,type){if(t!==h)hostileAction(h);var result=g.DNDCombat.applyDamage(t,n,type,{source:'tarot',attacker:h,attackerId:h.id,tarotScene:h});if(result.peaceBlocked)error('Аура покоя запрещает урон.');return result;}
  function heal(t,n){return g.DNDCombat.heal(t,n);}
  function buff(id,data){HANDLERS[id]=function(h){put(h,id,Object.assign({source:h.id},data));return {effect:id};};}
  function reactionCount(h){var v=h.turnResources&&h.turnResources.reaction,n=Number(v);return v===true?1:Number.isFinite(n)?Math.max(0,n):0;}
  // Spend the temporary reaction first. The remaining regular reaction must
  // survive a class reaction, and an unused temporary reaction must expire.
  function spendReaction(h){
    if(blocked(h,'reaction')||reactionCount(h)<1)return false;
    var extra=effects(h).find(function(e){return active(h,e)&&e.extraReactions>0;});
    if(extra)extra.extraReactions--;
    var r=h.turnResources;r.reaction=typeof r.reaction==='boolean'?false:reactionCount(h)-1;syncOwner(h);return true;
  }
  function expireEffect(h,e){
    e.ending=true;if(e.gravity)landGravity(h,e);
    if(e.extraReactions>0&&h.turnResources)h.turnResources.reaction=Math.max(0,reactionCount(h)-e.extraReactions);
    if(e.ownedCondition&&!effects(h).some(function(other){return other!==e&&other.ownedCondition===e.ownedCondition&&active(h,other);}))clearCondition(h,e.ownedCondition);
    if(e.sleep){
      e.ending=true;
      // Waking is not resurrection. A lethal blow still ends the sleep, but
      // its heal cannot undo instant death or three failed death saves.
      if(!e.lethalWake&&!(h.deathSaves&&Number(h.deathSaves.failures)>=3)){
        if(hp(h)>0)clearCondition(h,'Бессознателен');
        heal(h,e.healingAmount!=null?e.healingAmount:roll(e.healingCount,4)+e.healingBonus);
        if(hp(h)>0)clearCondition(h,'Бессознателен');
      }
    }
  }
  function encounter(h){var t=h.initiativeTracker;if(!t||!Array.isArray(t.combatants)||!t.combatants.length)error('Эта карта требует текущего боя.');return t;}
  function movementContext(h){
    encounter(h);var b=h.initiativeTracker.battlefield,p=token(h,h),M=g.DNDPredictorMovement;if(!M)error('Обработчик маршрутов недоступен.');M.validate(b,p);return {field:b,token:p,M:M};
  }
  function movementBudget(h,p){var r=h.turnResources||{},base=r.movement==null?Number(h.speed||p.speed)||30:Number(r.movement),used=Math.max(0,Number(r.movementUsed)||0),budget=blocked(h,'movement')?0:Math.max(0,base*speedMultiplier(h)-used);if(!Number.isFinite(budget)||budget>10000)error('Некорректный запас движения.');return budget;}
  function applyWalk(h,ctx,plan,forced){
    var p=ctx.token;noteMove(h,p,plan.end);p.x=plan.end.x;p.y=plan.end.y;h.position=Object.assign({},h.position||{},{x:p.x,y:p.y,elevationFt:Number(p.elevationFt)||0});
    if(!forced){h.turnResources.movementUsed=(Number(h.turnResources.movementUsed)||0)+plan.cost;}
  }
  HANDLERS.wands_12=function(h){
    var c=movementContext(h),direction=roll(1,8,h),distanceRolled=roll(1,6,h)*5,immune=effects(h).some(function(e){return active(h,e)&&e.noForcedMovement;}),plan=c.M.ray(c.field,c.token,immune||blocked(h,'movement')?0:distanceRolled,direction);
    if(immune||blocked(h,'movement'))plan={path:[{x:c.token.x,y:c.token.y}],end:{x:c.token.x,y:c.token.y},cost:0,stopped:true};applyWalk(h,c,plan,true);
    var result={cardId:'wands_12',direction:direction,rolledDistanceFt:distanceRolled,movedFt:plan.cost,path:plan.path,stopped:!!plan.stopped,noOpportunityAttacks:true};h.tarotLastMovement=result;return result;
  };
  HANDLERS.cups_08=function(h){
    var c=movementContext(h),enemies=actors(h).filter(function(t){return !allies(h,t)&&hp(t)>0;});if(!enemies.length)error('Для отступления нужен живой противник на поле.');
    var center=enemies.reduce(function(p,t){var q=token(h,t);if(!q)error('Неизвестна позиция противника для центра боя.');p.x+=q.x/enemies.length;p.y+=q.y/enemies.length;return p;},{x:0,y:0});
    var budget=movementBudget(h,c.token),plan=c.M.retreat(c.field,c.token,budget,center,function(a,b){return canMove(h,a,b,{direct:true});});applyWalk(h,c,plan,false);put(h,'cups_08',{retreatFrom:center,untilOwnEnd:true});
    var result={cardId:'cups_08',center:center,movedFt:plan.cost,path:plan.path,stopped:plan.stopped,provokesOpportunityAttacks:!preventsOpportunity(h)};h.tarotLastMovement=result;return result;
  };
  HANDLERS.swords_12=function(h,r){
    var c=movementContext(h);validateWeapon(r.attack||{});if(blocked(h,'attack')||peaceBlocked(h,h))error('Состояние запрещает атаковать.');var budget=movementBudget(h,c.token),plan=c.M.ray(c.field,c.token,budget,r.direction,function(a,b){return canMove(h,a,b,{direct:true});}),victim=null;
    if(plan.hitTokenId){victim=actors(h).find(function(t){var p=token(h,t);return p&&p.id===plan.hitTokenId;});if(!victim)error('У токена на пути нет участника инициативы.');if(peaceBlocked(h,h,victim))error('Аура покоя запрещает атаку цели на пути.');}
    applyWalk(h,c,plan,false);if(victim&&c.M.reach(c.field,c.token,token(h,victim))>5)victim=null;var attack=null;if(victim){hostileAction(h);attack=g.DNDCombat.attack(h,victim,{bonus:r.attack.bonus,damage:r.attack.damage,damageType:r.attack.damageType,weaponAttack:true,useRules:false,tarotScene:h,__tarotChargeDouble:true});if(attack.ok===false)error(attack.reason||'Атака недоступна.');}
    var result={cardId:'swords_12',direction:r.direction,movedFt:plan.cost,path:plan.path,targetId:victim&&victim.id,attack:attack,provokesOpportunityAttacks:!preventsOpportunity(h)};h.tarotLastMovement=Object.assign({},result,{attack:attack?{hit:!!attack.hit,damage:attack.damage&&attack.damage.total||0}:null});return result;
  };
  function fall(h,distanceFt){var dice=Math.min(20,Math.floor(Math.max(0,distanceFt)/10));if(!dice)return {amount:0,hp:hp(h)};return g.DNDCombat.applyDamage(h,roll(dice,6,h),'дробящий',{source:'fall',fall:true,tarotScene:h});}
  function landGravity(h,e){if(e.landed)return;e.landed=true;var p=token(h,h);if(p)p.elevationFt=e.startElevation;h.position=Object.assign({},h.position||{x:e.startX,y:e.startY},{elevationFt:e.startElevation});fall(h,e.riseFt);}
  HANDLERS.major_12=function(h){
    var c=movementContext(h),start=Number(c.token.elevationFt)||0,b=c.field;if(b.openSky!==true&&(!Number.isFinite(b.ceilingFt)||b.ceilingFt<=start))error('Сначала укажите открытое небо или высоту потолка выше персонажа.');
    var immune=effects(h).some(function(e){return active(h,e)&&e.noForcedMovement;});if(immune)return {gravityResisted:true};
    var rise=b.openSky===true?30:Math.min(30,b.ceilingFt-start),ceiling=b.openSky!==true&&b.ceilingFt-start<=30;
    noteMove(h,{x:0,y:0},{x:1,y:0});c.token.elevationFt=start+rise;h.position=Object.assign({},h.position||{},{x:c.token.x,y:c.token.y,elevationFt:start+rise});put(h,'major_12',{gravity:true,startElevation:start,startX:c.token.x,startY:c.token.y,riseFt:rise,noMovement:true,untilOwnStart:true,seconds:6});return {raisedFt:rise,ceilingCollision:ceiling,damage:ceiling?fall(h,rise):null};
  };
  function setCeiling(h,openSky,height){var draft=copy(h);try{var c=movementContext(draft);if(openSky!==true&&(!Number.isInteger(height)||height<1||height>1000))error('Высота потолка должна быть от 1 до 1000 футов.');c.field.openSky=openSky===true;c.field.ceilingFt=openSky===true?null:height;Object.assign(h,draft);return {ok:true};}catch(e){return {ok:false,reason:e.message};}}
  HANDLERS.major_06=function(h,r){encounter(h);var t=target(h,r,30);if(t===h||!allies(h,t)||hp(t)<=0||r.bondWilling!==true)error('Нужен согласный союзник в пределах 30 футов.');if(effects(h).some(function(e){return e.bondPartnerId;})||effects(t).some(function(e){return e.bondPartnerId;}))error('Существо уже связано Влюблёнными.');put(h,'major_06',{bondPartnerId:t.id,bondOwnerId:h.id,combatOnly:true});put(t,'major_06',{bondPartnerId:h.id,bondOwnerId:h.id,combatOnly:true});return {partnerId:t.id};};
  HANDLERS.major_19=function(h){area(h,30);put(h,'major_19',{sunAura:30,seconds:60});return {radiusFt:30};};
  HANDLERS.cups_10=function(h){encounter(h);area(h,30);put(h,'cups_10',{peaceAura:30,seconds:6,untilOwnStart:true});return {radiusFt:30};};
  HANDLERS.major_20=function(h){
    var fight=encounter(h),totals=fight.tarotDamageTotals;if(!totals)error('Сначала нужен хотя бы один записанный случай урона текущего боя.');
    var list=actors(h);if(list.length<2)error('Для Суда нужны хотя бы два участника.');var entries=list.map(function(t){return {actor:t,total:Number(totals[ledgerKey(h,t)])||0};}),max=Math.max.apply(null,entries.map(function(e){return e.total;})),min=Math.min.apply(null,entries.map(function(e){return e.total;}));
    var high=entries.filter(function(e){return e.total===max;}),a=high[roll(1,high.length)-1].actor,low=entries.filter(function(e){return e.total===min&&e.actor!==a;});if(!low.length)error('Нет отдельного получателя исцеления.');var b=low[roll(1,low.length)-1].actor,n=roll(3,10,h);return {highestId:a.id,lowestId:b.id,amount:n,damage:damage(h,a,n,'излучение'),healing:heal(b,n)};
  };
  HANDLERS.wands_06=function(h){encounter(h);put(h,'wands_06',{killInspiration:true,untilOwnEnd:true});return {inspirationOnKill:true};};
  HANDLERS.wands_07=function(h){encounter(h);var p=token(h,h);if(!p)error('Нужна позиция персонажа на поле.');put(h,'wands_07',{highGround:true,anchor:{x:p.x,y:p.y},combatOnly:true});return {highGround:true};};
  function sameActor(h,a,b){return a===b||a&&b&&(a.id===b.id||owned(h,a)&&owned(h,b));}
  function ledgerKey(h,t){if(t===h){var c=(h.initiativeTracker.combatants||[]).find(function(a){return owned(h,a);});return c?String(c.id):String(h.id);}return String(t.id);}
  function sceneFrom(t,opts){return opts&&opts.tarotScene||opts&&opts.attacker&&opts.attacker.initiativeTracker&&opts.attacker||t&&t.initiativeTracker&&t||g.currentChar;}
  function sceneActor(h,t){if(!h||!h.initiativeTracker||!t)return null;try{return actor(h,t.characterId===h.id?h.id:t.id);}catch(_){return null;}}
  function auraSources(h,t,key){if(!h||!h.initiativeTracker||!t)return [];return actors(h).filter(function(a){return effects(a).some(function(e){if(!active(a,e)||!e[key])return false;try{return distance(h,a,t)<=e[key];}catch(_){return false;}});});}
  function peaceBlocked(h,a,b){return !!(auraSources(h,a,'peaceAura').length||auraSources(h,b,'peaceAura').length);}
  function sunBlinded(h,t){if(!t)return false;return !immuneCondition(t,'Ослеплён')&&!(Array.isArray(t.conditionImmunities)?t.conditionImmunities:String(t.conditionImmunities||'').split(/[,;]/)).some(function(k){return /^(blinded|ослепл[её]н)$/i.test(k);})&&auraSources(h,t,'sunAura').some(function(a){return allies(h,a)!==allies(h,t);});}
  function sunAC(h,t){return auraSources(h,t,'sunAura').some(function(a){return allies(h,a)===allies(h,t);})?2:0;}
  function bondNear(h,t){return effects(t).some(function(e){if(!active(t,e)||!e.bondPartnerId)return false;try{var partner=actor(h,e.bondPartnerId);return hp(partner)>0&&distance(h,t,partner)<=10;}catch(_){return false;}});}
  function highGround(h,t,ctx){var scene=sceneFor(h,ctx),p=scene&&token(scene,h),q=scene&&t&&token(scene,t);return !!(p&&q&&Number(p.elevationFt||0)>Number(q.elevationFt||0)&&effects(h).some(function(e){return active(h,e)&&e.highGround;}));}
  function standingAC(h,attacker,ctx){if(attacker&&highGround(h,attacker,ctx))return 0;var scene=sceneFor(h,ctx),p=scene&&token(scene,h);return p&&effects(h).some(function(e){return active(h,e)&&e.highGround&&!e.moved&&e.anchor&&p.x===e.anchor.x&&p.y===e.anchor.y;})?2:0;}
  function noteMove(h,from,to){if(from.x===to.x&&from.y===to.y)return;effects(h).forEach(function(e){if(e.highGround)e.moved=true;});}
  function setElevation(h,id,height){var draft=copy(h);try{if(!Number.isInteger(height)||height<0||height>1000)error('Высота должна быть целым числом от 0 до 1000 футов.');var t=actor(draft,id),p=token(draft,t);if(effects(t).some(function(e){return active(t,e)&&e.gravity;}))error('Нельзя менять высоту во время инверсии гравитации.');if(!p)error('Нет позиции участника.');p.elevationFt=height;Object.assign(h,draft);return {ok:true};}catch(e){return {ok:false,reason:e.message};}}
  function shareDamage(t,amount,type,opts){
    if(opts.__tarotShared)return null;var h=sceneFrom(t,opts),target=sceneActor(h,t);if(!target)return null;
    var e=effects(target).find(function(e){return active(target,e)&&e.bondPartnerId;});if(!e)return null;var partner;try{partner=actor(h,e.bondPartnerId);}catch(_){return null;}if(partner===target)return null;
    var parts=Array.isArray(opts.damageParts)&&opts.damageParts.length?opts.damageParts:[{amount:amount,damageType:type}],left=[],right=[];
    var odd=0;parts.forEach(function(p){var n=Math.max(0,Math.floor(Number(p.amount)||0)),first=Math.floor(n/2);if(n%2){if(odd%2===0)first++;odd++;}left.push(Object.assign({},p,{amount:first}));right.push(Object.assign({},p,{amount:n-first}));});
    var snapshot=copy(h),targetSnapshot=copy(target),partnerSnapshot=copy(partner);try{
    var first=g.DNDCombat.applyDamage(target,left.reduce(function(n,p){return n+p.amount;},0),type,Object.assign({},opts,{__tarotShared:true,tarotScene:h,damageParts:left}));
    var secondOpts=Object.assign({},opts,{__tarotShared:true,tarotScene:h,damageParts:right});delete secondOpts.defenderReaction;delete secondOpts.zeroHpReaction;
    var second=g.DNDCombat.applyDamage(partner,right.reduce(function(n,p){return n+p.amount;},0),type,secondOpts);syncOwner(h);first.sharedDamage={partnerId:partner.id,result:second};return first;
    }catch(err){[h,target,partner].forEach(function(t,i){var snap=i===0?snapshot:i===1?targetSnapshot:partnerSnapshot;Object.keys(t).forEach(function(k){delete t[k];});Object.assign(t,copy(snap));});throw err;}
  }
  function recordDamage(t,event,opts){
    var h=sceneFrom(t,opts),target=sceneActor(h,t),a=sceneActor(h,opts.attacker||{id:opts.attackerId});if(!h||!target||!a||event.damageTaken<=0)return;
    var fight=h.initiativeTracker,totals=fight.tarotDamageTotals||(fight.tarotDamageTotals={}),key=ledgerKey(h,a);Object.defineProperty(totals,key,{value:(Number(totals[key])||0)+event.damageTaken,writable:true,enumerable:true,configurable:true});
    if(event.previousHp>0&&hp(target)<=0&&allies(h,a)!==allies(h,target)&&effects(a).some(function(e){return active(a,e)&&e.killInspiration;})){
      actors(h).forEach(function(t){if(t===a||allies(h,t)===allies(h,a)&&canSee(h,t,target))t.inspiration=true;});
    }syncOwner(h);
  }
  function prepareInspiration(h){if(!h.inspiration||h.tarotInspirationReady)return {ok:false,reason:'Нет доступного вдохновения.'};h.tarotInspirationReady=true;syncOwner(h);return {ok:true};}
  HANDLERS.major_09=function(h){put(h,'major_09',{invisible:true,noAttacks:true,noSpells:true,silent:true,untilOwnStart:true,seconds:6});return {invisible:true};};
  HANDLERS.swords_02=function(h){encounter(h);put(h,'swords_02',{blindBeyond:30,ac:3,combatOnly:true});return {blindsightFt:30,ac:3};};
  HANDLERS.swords_13=function(h){put(h,'swords_13',{seeInvisible:60,seeIllusions:60,seconds:600});return {specialSightFt:60};};
  HANDLERS.cups_02=function(h,r){var t=target(h,r,30);if(t===h||!/^(humanoid|гуманоид)$/i.test(String(t.creatureType||t.creature_type||'')))error('Нужна цель-гуманоид в пределах 30 футов.');hostileAction(h);var save=g.DNDCombat.savingThrow(t,'wis',dc(h));if(save.success)return {saved:true};var already=!!Object.assign({},t.conditions,t.activeConditions)['Очарован'];if(!conditions(t,'Очарован'))return {immune:true};put(t,'cups_02',{charmSourceId:h.id,ownedCondition:already?null:'Очарован',seconds:60});return {charmed:true,targetId:t.id};};
  HANDLERS.cups_03=function(h){put(h,'cups_03',{noVerbal:true,untilOwnStart:true,seconds:6});return {verbalBlocked:true};};
  HANDLERS.cups_09=function(h){put(h,'cups_09',{maximizeNextRoll:true});return {nextRollMaximum:true};};
  HANDLERS.pentacles_02=function(h){encounter(h);put(h,'pentacles_02',{noForcedMovement:true,immuneConditions:['Сбит с ног'],combatOnly:true});return {stable:true};};
  HANDLERS.wands_14=function(h,r){
    var ally=target(h,{targetId:r.allyId},60),victim=actor(h,r.targetId),attack=r.attack||{};
    if(ally===h||!allies(h,ally)||allies(h,victim)||hp(ally)<=0||blocked(ally,'attack')||blocked(ally,'action')||['Бессознателен','Недееспособен','Оглушён','Парализован'].some(function(k){return Object.assign({},ally.conditions,ally.activeConditions)[k];}))error('Нужен действующий союзник и враждебная цель.');
    if(!canSee(h,h,ally)||!canSee(h,ally,victim)||distance(h,ally,victim)>5)error('Нужны видимые союзник до 60 футов и враг в его досягаемости 5 футов.');
    if(peaceBlocked(h,ally,victim))error('Аура покоя запрещает командную атаку.');validateWeapon(attack);if(!spendReaction(ally))error('У союзника нет реакции.');
    hostileAction(h);var result=g.DNDCombat.attack(ally,victim,{bonus:attack.bonus,damage:attack.damage,damageType:attack.damageType,weaponAttack:true,useRules:false,tarotScene:h});if(result.ok===false)error(result.reason||'Атака союзника недоступна.');return result;
  };
  function validateWeapon(r){if(!Number.isFinite(r.bonus)||typeof r.damage!=='string'||!/^([1-9]|[1-9]\d)d(?:4|6|8|10|12|20)(?:[+-]\d{1,4})?$/.test(r.damage)||!r.damageType)error('Укажите бонус, формулу урона оружия и тип урона.');}
  function consumeMaximum(h){var ready=effects(h).some(function(e){return active(h,e)&&e.maximizeNextRoll;});if(ready){h.tarotEffects=effects(h).filter(function(e){return !e.maximizeNextRoll;});syncOwner(h);}return ready;}
  function canCast(h,spell){
    if(spell&&spell.damage&&peaceBlocked(sceneFor(h),h))return {ok:false,error:'Аура покоя запрещает наносящее урон заклинание.'};
    if(blocked(h,'spell'))return {ok:false,error:'Отшельник запрещает колдовство до начала следующего хода.'};
    var c=spell&&spell.components,verbal=typeof c==='string'?/(^|[,\s])(V|В)(?=$|[,\s])/i.test(c):Array.isArray(c)?c.some(function(x){return /^(V|В|verbal)$/i.test(x);}):c&&!!(c.verbal||c.v||c.V);
    if(verbal&&effects(h).some(function(e){return active(h,e)&&e.noVerbal;}))return {ok:false,error:'Тройка Кубков запрещает вербальные компоненты.'};return {ok:true};
  }
  function invisible(t){return !!Object.assign({},t&&t.conditions,t&&t.activeConditions)['Невидим']||effects(t).some(function(e){return active(t,e)&&e.invisible;});}
  function sceneFor(h,ctx){return ctx&&ctx.tarotScene||(h&&h.initiativeTracker?h:g.currentChar);}
  function canSee(scene,observer,t,options){
    if(!observer||!t)return false;if(hp(observer)<=0||['Бессознателен','Недееспособен','Оглушён','Unconscious'].some(function(k){return Object.assign({},observer.conditions,observer.activeConditions)[k];}))return false;return sightGeometry(scene,observer,t,options);
  }
  // Pending wager magic is passive: unconsciousness cannot cancel its payout.
  // Keep range, walls, hidden targets, blindness and special-sight rules.
  function sightGeometry(scene,observer,t,options){
    if(observer===t)return true;options=options||{};
    var p=scene&&token(scene,observer),q=scene&&token(scene,t);if(!p||!q||p.visible===false||q.visible===false||t.visible===false)return false;
    var bf=scene.initiativeTracker&&scene.initiativeTracker.battlefield;if(bf&&g.DNDBattleBoard&&!g.DNDBattleBoard.lineOfSight(p,q,bf).clear)return false;
    var d=distance(scene,observer,t),blind=effects(observer).find(function(e){return active(observer,e)&&e.blindBeyond;});
    if(blind)return d<=blind.blindBeyond;
    if(sunBlinded(scene,observer)||effects(observer).some(function(e){return active(observer,e)&&e.blinded;})||Object.assign({},observer.conditions,observer.activeConditions)['Ослеплён'])return false;
    if(invisible(t)||options.targetInvisible)return effects(observer).some(function(e){return active(observer,e)&&e.seeInvisible>=d;});return true;
  }
  function attackSight(h,t,ctx){var scene=sceneFor(h,ctx);return {ignoreInvisibility:!!(scene&&canSee(scene,h,t,ctx))};}
  function revealedSight(h){return actors(h).filter(function(t){if(t===h)return false;var d;try{d=distance(h,h,t);}catch(_){return false;}return canSee(h,h,t)&&effects(h).some(function(e){return active(h,e)&&(invisible(t)&&e.seeInvisible>=d||t.isIllusion&&e.seeIllusions>=d);});}).map(function(t){return {id:t.id,name:t.name,invisible:invisible(t),illusion:!!t.isIllusion};});}
  HANDLERS.major_07=function(h){encounter(h);put(h,'major_07',{speedMultiplier:3,preventOpportunity:true,combatOnly:true});return {speedMultiplier:3,preventOpportunity:true};};
  HANDLERS.wands_05=function(h){var t=encounter(h);actors(h).forEach(function(a){put(a,'wands_05',{opportunityAdvantage:true,untilRound:(Number(t.round)||1)+1,roundOwnerId:h.id,combatOnly:true});});return {untilRound:(Number(t.round)||1)+1};};
  function preventsOpportunity(h){return effects(h).some(function(e){return active(h,e)&&e.preventOpportunity;});}
  // Resolve a declared leave-reach event before the target moves. The local UI
  // obtains the declaration; the engine validates scene, geometry and resources.
  function opportunityAttack(h,req){
    req=req||{};if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение пока не подключено.'};
    var draft=copy(h);try{
      var fight=encounter(draft),a=actor(draft,req.attackerId),t=actor(draft,req.targetId),current=fight.combatants[fight.activeIndex];
      if(req.leavingReach!==true||!current||actor(draft,current.id)!==t)error('Нужно событие выхода цели из досягаемости в её ход.');
      if(a===t||allies(draft,a)===allies(draft,t))error('Выберите противников.');
      if(hp(a)<=0||hp(t)<=0||blocked(a,'action')||blocked(a,'reaction')||['Бессознателен','Недееспособен','Оглушён','Парализован'].some(function(k){return Object.assign({},a.conditions,a.activeConditions)[k];}))error('Участник не может совершить провоцированную атаку.');
      if(peaceBlocked(draft,a,t))error('Аура покоя запрещает провоцированную атаку.');if(preventsOpportunity(t))error('Перемещение цели не провоцирует атаки.');
      var p=token(draft,a),q=token(draft,t),bf=fight.battlefield;
      if(!bf||!p||!q||distance(draft,a,t)>5||p.visible===false||q.visible===false||!canSee(draft,a,t)||Object.assign({},t.conditions,t.activeConditions)['Невидим']||!g.DNDBattleBoard||!g.DNDBattleBoard.lineOfSight(p,q,bf).clear)error('Нужна видимая цель в пределах 5 футов.');
      if(!Number.isFinite(req.bonus)||typeof req.damage!=='string'||!/^([1-9]|[1-9]\d)d(?:4|6|8|10|12|20)(?:[+-]\d{1,4})?$/.test(req.damage)||!req.damageType)error('Укажите бонус, формулу урона оружия и тип урона.');
      if(!spendReaction(a))error('Реакция недоступна.');
      var result=g.DNDCombat.attack(a,t,{opportunityAttack:true,weaponAttack:true,attackKind:'weapon',bonus:req.bonus,damage:req.damage,damageType:req.damageType,useRules:false});
      if(result.ok===false)error(result.reason||'Атака недоступна.');
      syncOwner(draft);Object.assign(h,draft);return {ok:true,result:result};
    }catch(e){return {ok:false,reason:e.message};}
  }
  HANDLERS.major_04=function(h){put(h,'major_04',{guardDC:dc(h),noHide:true,noDisengage:true,restrictionUntilOwnEnd:true,seconds:60,concentration:true});g.DNDCombat.beginConcentration(h,{id:'tarot:major_04',name:'Император',concentration:true});return {guardDC:dc(h)};};
  HANDLERS.pentacles_04=function(h){put(h,'pentacles_04',{ac:3,noHelp:true,noTransfer:true,seconds:60,concentration:true});g.DNDCombat.beginConcentration(h,{id:'tarot:pentacles_04',name:'Четвёрка Пентаклей',concentration:true});return {ac:3};};
  HANDLERS.pentacles_05=function(h){put(h,'pentacles_05',{guardDC:dc(h),endsOnHostile:true,seconds:60,concentration:true});g.DNDCombat.beginConcentration(h,{id:'tarot:pentacles_05',name:'Пятёрка Пентаклей',concentration:true});return {guardDC:dc(h)};};
  HANDLERS.pentacles_03=function(h,r){var ally=target(h,r,30);if(ally===h||!allies(h,ally))error('Выберите другого союзника в пределах 30 футов.');[h,ally].forEach(function(t){put(t,'pentacles_03',{teamAttackBonus:2,nearAllyId:ally.id,sceneOwnerId:h.id,untilOwnerEnd:h.id});});return {allyId:ally.id,bonus:2};};
  HANDLERS.wands_11=function(h){var t=encounter(h);if(!t.combatants.some(function(c){return owned(h,c)&&Number.isFinite(Number(c.initiative));}))error('У персонажа нет инициативы в текущем бою.');put(h,'wands_11',{pendingInitiativeBonus:5,applyFromRound:(Number(t.round)||1)+1,combatOnly:true});return {initiativeBonus:5,fromRound:(Number(t.round)||1)+1};};
  HANDLERS.swords_06=function(h,r){
    var bf=h.initiativeTracker&&h.initiativeTracker.battlefield,board=g.DNDBattleBoard,p=token(h,h);
    if(!bf||!Number.isInteger(bf.cols)||!Number.isInteger(bf.rows)||bf.cols>200||bf.rows>200||!board||!board.lineOfSight||!p||!Object.values(bf.tokens||{}).includes(p))error('Телепортации нужна карта и токен персонажа.');
    var movers=[{actor:h,token:p,destination:r.destination}];
    if(r.teleportAllyId){var ally=actor(h,r.teleportAllyId),ap=token(h,ally);if(ally===h||!allies(h,ally)||r.allyWilling!==true||distance(h,h,ally)>5||!ap||!Object.values(bf.tokens||{}).includes(ap))error('Нужен согласный союзник в пределах 5 футов с токеном на карте.');movers.push({actor:ally,token:ap,destination:r.allyDestination});}
    function overlaps(a,b){return a.x<b.x+b.size&&a.x+a.size>b.x&&a.y<b.y+b.size&&a.y+a.size>b.y;}
    var destinations=movers.map(function(m){var d=m.destination,size=Math.max(1,Number(m.token.size)||1);if(!Number.isInteger(size)||size>200||!d||!Number.isInteger(d.x)||!Number.isInteger(d.y)||!Number.isInteger(bf.cols)||!Number.isInteger(bf.rows)||d.x<0||d.y<0||d.x+size>bf.cols||d.y+size>bf.rows)error('Выберите целую свободную клетку внутри карты.');var dest={x:d.x,y:d.y,size:size};if(Math.hypot(d.x-p.x,d.y-p.y)*(Number(bf.cellFt)||5)>30)error('Точка телепортации дальше 30 футов.');if(!board.lineOfSight(p,dest,bf).clear)error('Точка телепортации не видна.');for(var y=d.y;y<d.y+size;y++)for(var x=d.x;x<d.x+size;x++)if((bf.obstacles||{})[x+':'+y]||(bf.hazards||{})[x+':'+y])error('Точка телепортации занята препятствием или опасностью.');if(Object.values(bf.tokens||{}).some(function(t){return !movers.some(function(other){return other.token===t;})&&overlaps(dest,{x:t.x,y:t.y,size:Number(t.size)||1});}))error('Точка телепортации занята существом.');return dest;});
    if(destinations.length===2&&overlaps(destinations[0],destinations[1]))error('Выберите разные свободные клетки для двух существ.');
    movers.forEach(function(m,i){noteMove(m.actor,m.token,destinations[i]);m.token.x=destinations[i].x;m.token.y=destinations[i].y;m.actor.position={x:m.token.x,y:m.token.y};});
    return {teleported:movers.map(function(m,i){return {id:m.actor.id,x:destinations[i].x,y:destinations[i].y};}),noOpportunityAttacks:true};
  };
  HANDLERS.swords_05=function(h,r){
    var t=target(h,r,30);if(allies(h,t))error('Пятёрке Мечей нужна враждебная цель.');hostileAction(h);
    put(t,'swords_05_denied',{noReactions:true,untilOwnStart:true});
    t.turnResources=t.turnResources||{};t.turnResources.reaction=0;
    // Only one copy of this card exists between long rests.
    put(h,'swords_05',{extraReactions:1,untilOwnStart:true});
    h.turnResources.reaction=reactionCount(h)+1;
    return {targetId:t.id,extraReaction:1};
  };
  HANDLERS.pentacles_07=function(h){
    var t=encounter(h),current=t.combatants[t.activeIndex];
    if(!owned(h,current))error('Инвестиция доступна только в собственный ход.');
    if(!t.tarotEncounterId)t.tarotEncounterId='tarot:'+Date.now()+':'+roll(1,2147483647);
    put(h,'pentacles_07',{grantActionNextStart:true,encounterId:t.tarotEncounterId,combatOnly:true});
    return {extraActionNextTurn:1};
  };
  HANDLERS.pentacles_06=function(h,r){
    if(!Array.isArray(r.willingTargetIds)||!r.willingTargetIds.length)error('Укажите согласных союзников для случайного выбора.');
    var ids=Array.from(new Set(r.willingTargetIds)),candidates=ids.map(function(id){var t=actor(h,id);if(t===h||!allies(h,t)||distance(h,h,t)>30)error('Нужны согласные союзники в пределах 30 футов.');return t;});
    var t=candidates[roll(1,candidates.length)-1],slot=t.spellSlotsData&&t.spellSlotsData[1],restored=null;
    if(slot&&Number.isInteger(slot.used)&&slot.used>0){slot.used--;restored='slot:1';}
    else ['pugilistMoxie','ki','sorceryPoints'].some(function(key){var p=t.resources&&t.resources[key];if(p&&Number.isFinite(p.current)&&Number.isFinite(p.max)&&p.current>=0&&p.current<p.max){p.current=Math.min(p.max,p.current+1);restored=key;return true;}return false;});
    if(restored){
      // This is a HP cost, not damage: no temp HP, resistance, concentration
      // saving throw or damage reaction. It can leave the caster at zero HP.
      var next=Math.max(0,hp(h)-5);if(h.hpCurrent!=null)h.hpCurrent=next;if(h.hp&&typeof h.hp==='object')h.hp.current=next;else if(h.hpCurrent==null)h.hp=next;
      if(next===0){conditions(h,'Бессознателен');h.deathSaves={successes:0,failures:0};h.defeated=true;}
    }
    return {targetId:t.id,restored:restored,hpCost:restored?5:0};
  };
  HANDLERS.swords_14=function(h){put(h,'swords_14',{ignorePhysicalResistance:true,seconds:60,concentration:true});g.DNDCombat.beginConcentration(h,{id:'tarot:swords_14',name:'Король Мечей',concentration:true});return {ignorePhysicalResistance:true};};
  HANDLERS.major_08=function(h){
    var str=g.DNDRules?g.DNDRules.getStats(h).str:Number((h.stats||{}).str||(h.stats||{}).strength)||10;
    put(h,'major_08',{strengthFloor:24,strengthAdvantage:str>=24,seconds:60});return {strengthFloor:24,strengthAdvantage:str>=24};
  };
  HANDLERS.major_10=function(h){put(h,'major_10',{fortuneMode:roll(1,2)===1?'advantage':'disadvantage',fortuneRevealed:false,seconds:60});return {fortunePending:true};};
  HANDLERS.cups_06=function(h){put(h,'cups_06',{abilityChanges:{str:-2,cha:2},abilityMin:{str:1},abilityMax:{cha:22},childAppearance:true,seconds:3600});return {childAppearance:true,durationSeconds:3600};};
  HANDLERS.pentacles_08=function(h){put(h,'pentacles_08',{toolMastery:true,seconds:86400});return {toolsAdvantage:true,proficiencyIfUntrained:true,durationSeconds:86400};};
  HANDLERS.swords_04=function(h){
    conditions(h,'Сбит с ног');
    if(!conditions(h,'Бессознателен'))return {sleepImmune:true};
    // Fix the hidden healing roll with the cast, so saving/loading before wake
    // cannot reroll it and waking never needs a new random draw.
    put(h,'swords_04',{sleep:true,healingCount:step(h),healingBonus:cha(h),healingAmount:roll(step(h),4,h)+cha(h),seconds:6,untilOwnStart:true});return {asleep:true};
  };
  HANDLERS.swords_09=function(h){
    var choices=area(h,60).filter(function(t){return t!==h;});if(!choices.length)error('Нет существа в пределах 60 футов для источника испуга.');
    var saved=g.DNDCombat.savingThrow(h,'wis',dc(h)).success;if(saved)return {saved:true};
    var source=choices[roll(1,choices.length)-1],existing=!!Object.assign({},h.conditions,h.activeConditions)['Испуган'];
    if(!conditions(h,'Испуган'))return {fearImmune:true};
    put(h,'swords_09',{fearSourceId:source.id,attackDisadvantage:true,repeatSave:'wis',saveDC:dc(h),ownedCondition:existing?null:'Испуган',seconds:60});return {frightenedBy:source.id};
  };
  HANDLERS.major_02=function(h,r){var t=target(h,r,60),key=r.reveal;if(!['ac','resistances','immunities','vulnerabilities'].includes(key)||t[key]==null)error('Выберите характеристику, которая есть в данных цели.');h.tarotKnowledge=h.tarotKnowledge||{};var known=h.tarotKnowledge[String(t.id)]||(h.tarotKnowledge[String(t.id)]={});if(Object.prototype.hasOwnProperty.call(known,key))error('Эта характеристика уже известна.');known[key]=copy(t[key]);return {revealed:{key:key,value:copy(t[key])}};};
  HANDLERS.major_03=function(h){var amount=roll(2,8,h)+lvl(h);return {healing:area(h,30,'ally').map(function(t){return {id:t.id,result:heal(t,amount)};})};};
  HANDLERS.major_11=function(h,r){var t=target(h,r,30);if(!allies(h,t))hostileAction(h);if(t!==h&&!allies(h,t)&&g.DNDCombat.savingThrow(t,'cha',dc(h)).success)return {saved:true};var read=function(x){return Number(x.hpCurrent!=null?x.hpCurrent:typeof x.hp==='object'?x.hp.current:x.hp)||0;},sum=read(h)+read(t);var write=function(x,n){var max=Number(x.hpMax||x.maxHp||x.hp&&x.hp.max);if(!Number.isFinite(max))error('Нет максимума хитов цели.');if(x.hpCurrent!=null)x.hpCurrent=Math.min(max,n);if(x.hp&&typeof x.hp==='object')x.hp.current=Math.min(max,n);else if(x.hpCurrent==null)x.hp=Math.min(max,n);};write(h,Math.floor(sum/2));write(t,Math.ceil(sum/2));return {redistributed:true};};
  HANDLERS.major_13=function(h){hostileAction(h);var list=area(h,30).filter(function(t){return t!==h&&Number(t.hpCurrent!=null?t.hpCurrent:typeof t.hp==='object'?t.hp.current:t.hp)>0;});if(!list.length)error('Нет живых целей.');var t=list[roll(1,list.length)-1];if(peaceBlocked(h,h,t))error('Цель защищена аурой покоя.');if(g.DNDCombat.savingThrow(t,'con',dc(h)).success)return {target:t.id,result:damage(h,t,roll(6,10,h),'некротический')};if(t.hpCurrent!=null)t.hpCurrent=0;if(t.hp&&typeof t.hp==='object')t.hp.current=0;else if(t.hpCurrent==null)t.hp=0;conditions(t,'Бессознателен');t.deathSaves={successes:0,failures:0};return {target:t.id,zeroHp:true};};
  HANDLERS.major_14=function(h){area(h,15,'ally').forEach(function(t){['Отравлен','Испуган','Парализован','Ослеплён','Оглушён'].forEach(function(k){clearCondition(t,k);});});return {cleansed:true};};
  HANDLERS.swords_10=function(h){var results=area(h,10,'enemy').map(function(t){return damage(h,t,2*lvl(h),'сила');});damage(h,h,lvl(h),'сила');conditions(h,'Сбит с ног');return {damage:results};};
  HANDLERS.cups_01=function(h){var amount=roll(step(h),6,h)+Math.max(1,cha(h));return {healing:area(h,10).map(function(t){return heal(t,amount);})};};
  HANDLERS.cups_11=function(h,r){
    var list=actors(h),kind=r.advice;
    if(kind==='woundedAlly'){
      list=list.filter(function(t){return allies(h,t)&&maxHp(t)>0&&Number.isFinite(hp(t));});
      list.sort(function(a,b){return hp(a)/maxHp(a)-hp(b)/maxHp(b);});
    }else if(kind==='weakestEnemy'){
      list=list.filter(function(t){return !allies(h,t)&&hp(t)>0;});list.sort(function(a,b){return hp(a)-hp(b);});
    }else if(kind==='knownVulnerability'){
      var known=h.tarotKnowledge||{};
      list=list.filter(function(t){var v=known[String(t.id)]&&known[String(t.id)].vulnerabilities;return !allies(h,t)&&(Array.isArray(v)?v.length:typeof v==='string'&&v.trim().length);});
      if(!list.length)error('Нет ранее раскрытых уязвимостей.');
      return {advice:{kind:kind,targetId:list[0].id,vulnerabilities:copy(known[String(list[0].id)].vulnerabilities)}};
    }else error('Выберите поддерживаемую категорию совета.');
    if(!list.length)error('Нет подходящих данных сцены.');return {advice:{kind:kind,targetId:list[0].id}};
  };
  HANDLERS.cups_04=function(h){
    ['Очарован','Испуган'].forEach(function(k){clearCondition(h,k);});
    put(h,'cups_04',{noMainAction:true,noReactions:true,immuneConditions:['Очарован','Испуган'],untilOwnStart:true});
    return {apathy:true};
  };
  HANDLERS.major_16=function(h){
    var bf=h.initiativeTracker&&h.initiativeTracker.battlefield,p=token(h,h);
    if(!bf||!p||!Number.isInteger(bf.cols)||!Number.isInteger(bf.rows)||bf.cols<1||bf.rows<1||bf.cols>200||bf.rows>200)error('Для Башни нужна карта с размерами и позицией персонажа.');
    var cell=Number(bf.cellFt)||5;if(cell<=0)error('Неверный масштаб карты.');
    var points=[];for(var y=0;y<bf.rows;y++)for(var x=0;x<bf.cols;x++)if(Math.hypot(x-p.x,y-p.y)*cell<=60)points.push({x:x,y:y});
    if(!points.length)error('Нет точек удара в пределах 60 футов.');
    var point=points[roll(1,points.length)-1];
    // Validate all positions before any damage or saving throw.
    var list=actors(h).filter(function(t){var q=token(h,t);if(!q)error('Неизвестна позиция участника для проверки области Башни.');return Math.hypot(q.x-point.x,q.y-point.y)*cell<=15;});
    var amount=roll(8,6,h),targets=list.map(function(t){var saved=g.DNDCombat.savingThrow(t,'dex',dc(h)).success;return {id:t.id,saved:saved,result:damage(h,t,saved?Math.floor(amount/2):amount,'молния')};});
    return {point:point,damageRolled:amount,targets:targets};
  };
  HANDLERS.pentacles_09=function(h){return g.DNDCombat.grantTemporaryHitPoints(h,5*step(h)+Math.max(1,cha(h)));};
  HANDLERS.wands_04=function(h){hostileAction(h);var results=area(h,15).filter(function(t){return t!==h;}).map(function(t){var saved=g.DNDCombat.savingThrow(t,'dex',dc(h));if(!saved.success)put(t,'wands_04',{blinded:true,untilOwnerStart:h.id});return {id:t.id,saved:saved.success};});return {targets:results};};
  HANDLERS.wands_13=function(h){area(h,30,'ally').forEach(function(t){put(t,'wands_13',{immune:['холод'],seconds:3600});});return {protected:true};};
  HANDLERS.cups_14=function(h){['Очарован','Испуган'].forEach(function(k){clearCondition(h,k);});put(h,'cups_14',{immuneConditions:['Очарован','Испуган'],seconds:3600});return {immuneConditions:['Очарован','Испуган']};};
  HANDLERS.pentacles_12=function(h){put(h,'pentacles_12',{resist:['дробящий','колющий','рубящий'],speedMultiplier:0.5,seconds:60,concentration:true});g.DNDCombat.beginConcentration(h,{id:'tarot:pentacles_12',name:'Рыцарь Пентаклей',concentration:true});return {resistance:true};};
  buff('major_00',{immuneAll:true,noActions:true,noReactions:true,noMovement:true,untilOwnStart:true});
  buff('major_18',{immune:['психический'],attackDisadvantage:true,seconds:60});
  buff('swords_03',{attackDisadvantage:true,forceCritical:true,consumeOn:'attack',untilOwnEndAfterNext:true});
  buff('swords_08',{ac:4,noMovement:true,untilOwnStart:true});
  buff('swords_11',{incomingDisadvantage:true,untilOwnStart:true});
  buff('wands_08',{ignoreCover:true,untilOwnEnd:true});
  HANDLERS.swords_01=function(h){put(h,'swords_01',{typedDice:step(h)+'d6',damageType:'сила',weaponOnly:true,untilOwnEnd:true});return {buff:true};};
  HANDLERS.cups_12=function(h){put(h,'cups_12',{typedDice:step(h)+'d6',damageType:'психический',consumeOn:'hit',untilOwnEndAfterNext:true});return {buff:true};};
  HANDLERS.wands_01=function(h){put(h,'wands_01',{typedDice:step(h)+'d6',damageType:'огонь',consumeOn:'hit',untilOwnEndAfterNext:true});return {buff:true};};
  // Inventory effects edit the transactional profile, never the global inventory UI.
  var INVENTORY_CATEGORIES=['weapons','armor','consumables','materials','junk'];
  function inventoryEntries(h){
    var entries=[];INVENTORY_CATEGORIES.forEach(function(category){var list=h.inventory&&h.inventory[category];if(Array.isArray(list))list.forEach(function(item,index){if(item&&typeof item.name==='string')entries.push({name:item.name,ref:{category:category,index:index,signature:JSON.stringify(item)}});});});return entries;
  }
  function inventoryItem(h,ref){
    if(!ref||!INVENTORY_CATEGORIES.includes(ref.category)||!Number.isInteger(ref.index)||ref.index<0)error('Выберите предмет в инвентаре.');
    var list=h.inventory&&h.inventory[ref.category],item=Array.isArray(list)&&list[ref.index];
    if(!item||typeof ref.signature!=='string'||JSON.stringify(item)!==ref.signature)error('Предмет изменился; выберите его заново.');
    var count=item.count==null?1:Number(item.count);if(!Number.isFinite(count)||count<1)error('Нет целого предмета для применения карты.');
    if(item.containerId||Array.isArray(item.contents)&&item.contents.length)error('Сначала извлеките предмет или опустошите контейнер.');
    return {list:list,item:item,count:count};
  }
  function addInventory(h,category,item){
    h.inventory=h.inventory||{};if(h.inventory[category]!=null&&!Array.isArray(h.inventory[category]))error('Повреждена категория инвентаря.');
    var list=h.inventory[category]||(h.inventory[category]=[]);list.push(item);return item;
  }
  function priceGold(value){
    if(typeof value!=='string')return null;
    var m=/^(\d+(?:[.,]\d+)?)\s*(зм|зл|gp|см|сер\.?|sp|мм|мед\.?|cp|эм|ep|пм|pp)$/i.exec(value.trim());if(!m)return null;
    var unit=m[2].toLowerCase(),factor=/^(см|сер\.?|sp)$/.test(unit)?0.1:/^(мм|мед\.?|cp)$/.test(unit)?0.01:/^(эм|ep)$/.test(unit)?0.5:/^(пм|pp)$/.test(unit)?10:1;
    return Number(m[1].replace(',','.'))*factor;
  }
  function creationOptions(){
    var out=[],names=['defaultWeapons','defaultArmors','defaultConsumables','defaultMaterials','defaultJunk'];
    INVENTORY_CATEGORIES.forEach(function(category,i){var list=g[names[i]];if(!Array.isArray(list))return;list.forEach(function(item,index){var gp=item&&priceGold(item.cost);if(item&&typeof item.name==='string'&&gp!==null&&gp<=100)out.push({key:category+':'+index,name:item.name,category:category,cost:item.cost});});});return out;
  }
  function catalogueItem(key){
    var choice=creationOptions().find(function(x){return x.key===key;});if(!choice)error('Выберите предмет из каталога стоимостью не выше 100 зм.');
    var names={weapons:'defaultWeapons',armor:'defaultArmors',consumables:'defaultConsumables',materials:'defaultMaterials',junk:'defaultJunk'},item=copy(g[names[choice.category]][Number(key.split(':')[1])]);
    item.count=1;item.equipped=false;delete item.contents;delete item.containerId;return {category:choice.category,item:item};
  }
  HANDLERS.major_17=function(h,r){var created=catalogueItem(r.catalogKey);addInventory(h,created.category,created.item);return {created:created.item.name,category:created.category,cost:created.item.cost};};
  HANDLERS.pentacles_11=function(h){
    var choices=Array.isArray(g.defaultJunk)?g.defaultJunk.filter(function(x){return x&&typeof x.name==='string'&&!x.contents&&!x.containerId;}):[];
    if(!choices.length)error('Каталог безделушек недоступен.');var item=copy(choices[roll(1,choices.length)-1]);item.count=1;item.equipped=false;addInventory(h,'junk',item);return {found:item.name};
  };
  HANDLERS.swords_07=function(h,r){
    var t=target(h,r,5);if(t===h||!canSee(h,h,t))error('Нужно другое видимое существо в пределах 5 футов.');
    var selected=inventoryItem(t,r.inventoryRef);if(r.inventoryRef.category==='weapons'&&selected.item.equipped)error('Нельзя украсть оружие в руках.');
    var item=copy(selected.item);item.count=1;item.equipped=false;delete item.containerId;
    if(selected.count===1)selected.list.splice(r.inventoryRef.index,1);else selected.item.count=selected.count-1;
    addInventory(h,r.inventoryRef.category,item);return {stolen:item.name,from:t.id,count:1};
  };
  function weightPounds(item){
    var value=item.weight;if(typeof value==='number')return Number.isFinite(value)&&value>=0?value*2.2046226218:null;
    if(typeof value!=='string')return null;var m=/^(\d+(?:[.,]\d+)?)\s*(фунт(?:а|ов)?|lb(?:s)?|кг|kg)$/i.exec(value.trim());
    return m?Number(m[1].replace(',','.'))*(/^(кг|kg)$/i.test(m[2])?2.2046226218:1):null;
  }
  HANDLERS.pentacles_13=function(h,r){
    var owner=r.targetId?target(h,r,5):h;if(owner!==h&&!canSee(h,h,owner))error('Предмет должен быть в пределах видимого касания.');
    var selected=inventoryItem(owner,r.inventoryRef),pounds=weightPounds(selected.item);
    if(pounds===null||pounds>10)error('Нужен известный вес предмета не более 10 фунтов.');
    if(selected.item.tarotTransmutation)error('Предмет уже превращён в золото.');
    var item=selected.item;if(selected.count>1){selected.item.count=selected.count-1;item=copy(selected.item);item.count=1;addInventory(owner,r.inventoryRef.category,item);}
    item.tarotTransmutation={seconds:600,name:item.name,hadMaterial:Object.prototype.hasOwnProperty.call(item,'material'),material:item.material==null?null:copy(item.material)};
    item.name='Золотая форма: '+item.name;item.material='gold';return {transformed:item.name,seconds:600};
  };
  function advanceInventory(h,seconds,inspectOnly){
    var seen=new Set(),found=false;function walk(list,depth){if(!Array.isArray(list)||depth>20)return;list.forEach(function(item){if(!item||typeof item!=='object'||seen.has(item))return;seen.add(item);var effect=item.tarotTransmutation;if(effect){found=true;if(inspectOnly)return;effect.seconds-=seconds;if(effect.seconds<=0){item.name=effect.name;if(effect.hadMaterial)item.material=effect.material;else delete item.material;delete item.tarotTransmutation;}}walk(item.contents,depth+1);});}
    Object.keys(h.inventory||{}).forEach(function(key){walk(h.inventory[key],0);});return found;
  }
  function hasInventoryEffects(h){return advanceInventory(h,0,true);}
  function claimReward(h,id,targetId){
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение пока не подключено.'};
    var draft=copy(h);try{
      var status=A.tricksterStatus(draft);if(!status.ok)error(status.reason);var reward=status.rewards.find(function(x){return x.id===id;});if(!reward)error('Награда не найдена.');
      var t=reward.kind==='pentacles'?draft:actor(draft,targetId||draft.id),dist=t===draft?0:distance(draft,draft,t);
      if(reward.kind==='swords'&&peaceBlocked(draft,draft,t))error('Аура покоя запрещает урон награды.');
      var result=A.claimWagerReward(draft,id,{expectedRevision:draft.predictorState.revision,target:t,visible:t===draft||sightGeometry(draft,draft,t),distanceFt:dist,relation:allies(draft,t)?'ally':'enemy'});if(!result.ok)return result;
      syncOwner(draft);Object.assign(h,draft);return result;
    }catch(e){return {ok:false,reason:e.message};}
  }
  function moveReward(h,id,destination){
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение пока не подключено.'};
    var draft=copy(h);try{
      var c=movementContext(draft),status=A.tricksterStatus(draft);if(!status.ok)error(status.reason);var reward=status.rewards.find(function(x){return x.id===id&&x.status==='pending';});
      if(!reward||!['wands','slip'].includes(reward.kind))error('Нет награды перемещения.');
      if(blocked(draft,'movement')||g.DNDRules&&g.DNDRules.conditionModifiers(draft).speed===0||['Бессознателен','Недееспособен','Оглушён','Парализован'].some(function(k){return Object.assign({},draft.conditions,draft.activeConditions)[k];}))error('Состояние не позволяет перемещаться.');
      var remaining=reward.remainingFeet==null?(reward.kind==='slip'?10:Number(draft.speed)):reward.remainingFeet;
      var plan=c.M.route(c.field,c.token,destination,remaining,function(a,b){return canMove(draft,a,b,{direct:true});});if(!plan.ok)error(plan.reason||'Маршрут недоступен.');
      if(!canMove(draft,c.token,plan.end,{direct:true}))error('Карта запрещает это перемещение.');
      var paid=A.spendMovementReward(draft,id,plan.cost,draft.predictorState.revision);if(!paid.ok)return paid;
      applyWalk(draft,c,plan,true);syncOwner(draft);Object.assign(h,draft);return {ok:true,result:{movedFt:plan.cost,noOpportunityAttacks:true}};
    }catch(e){return {ok:false,reason:e.message};}
  }
  function definition(id){var d=DEFS[id];return d?Object.assign({},d,{implemented:!!HANDLERS[id]}):null;}
  function play(h,cardId,req){
    req=req||{};var check=A.inspect(h),def=DEFS[cardId];if(!check.ok)return check;if(!def)return {ok:false,reason:'Неизвестная карта.'};if(!HANDLERS[cardId])return {ok:false,reason:'Для этой карты ещё не подключён полный обработчик: '+def.name};
    if(req.expectedRevision!==check.state.revision)return {ok:false,reason:'Профиль изменился; обновите экран.'};if(!g.DNDCombat)return {ok:false,reason:'Боевой обработчик недоступен.'};
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение пока не подключено.'};
    if(typeof req.operationId!=='string'||!req.operationId)return {ok:false,reason:'Нужен ID применения.'};
    var draft=copy(h);try{
      var s=draft.predictorState,blind=s.blind&&s.blind.card===cardId&&s.blind.operationId===req.operationId;
      if(s.blind&&!blind)error('Сначала примените обязательную слепую карту.');if(s.applications.some(function(x){return x.id===req.operationId;}))error('Это применение уже учтено.');if(cardId.startsWith('major_')&&(lvl(draft)<A.rules.unlockSchedule[cardId]||check.majorCurrent<1))error('Старшая недоступна по уровню или ресурсу.');if(!blind&&!s.hand.includes(cardId))error('Карты нет в руке.');if(s.offer)error('Сначала завершите открытый выбор.');
      if(['major_11','major_13','major_16','major_20','swords_05','swords_10','cups_02','wands_04','wands_14'].includes(cardId)&&peaceBlocked(draft,draft))error('Аура покоя запрещает враждебную карту.');
      payAction(draft,def.action,Object.assign({},req,{cardId:cardId}));var result=HANDLERS[cardId](draft,req);
      var recorded=A.recordApplication(draft,cardId,req.operationId,draft.predictorState.revision,{ownTurnId:draft.predictorState.trickster&&draft.predictorState.trickster.ownTurnId});if(!recorded.ok)error(recorded.reason);
      // Combatant copies of the owner cannot retain stale HP/state after commit.
      syncOwner(draft);
      Object.assign(h,draft);return {ok:true,result:result,revision:h.predictorState.revision};
    }catch(e){return {ok:false,reason:e.message};}
  }
  function modifyStats(h,stats){
    var out=Object.assign({},stats);
    effects(h).filter(function(e){return active(h,e);}).forEach(function(e){Object.keys(e.abilityChanges||{}).forEach(function(key){var value=Number(out[key])||10,delta=e.abilityChanges[key],next=value+delta;if(delta>0&&e.abilityMax&&e.abilityMax[key]!=null)next=Math.max(value,Math.min(e.abilityMax[key],next));if(delta<0&&e.abilityMin&&e.abilityMin[key]!=null)next=Math.min(value,Math.max(e.abilityMin[key],next));out[key]=next;});});
    effects(h).forEach(function(e){if(active(h,e)&&e.strengthFloor)out.str=Math.max(Number(out.str)||10,e.strengthFloor);});return out;
  }
  function d20Modifiers(h,kind,ctx){var out={advantage:false,disadvantage:false};ctx=ctx||{};if(h&&h.tarotInspirationReady&&['attack','check','save'].includes(kind))out.advantage=true;effects(h).forEach(function(e){
    if(!active(h,e))return;
    if(['attack','check','save'].includes(kind)&&e.fortuneMode)out[e.fortuneMode]=true;
    if((kind==='check'||kind==='save')&&ctx.stat==='str'&&e.strengthAdvantage)out.advantage=true;
    if(kind==='check'&&ctx.tool&&e.toolMastery)out.advantage=true;
  });return out;}
  function noteD20Roll(h,kind){var revealed=null;if(h&&h.tarotInspirationReady&&['attack','check','save'].includes(kind)){h.tarotInspirationReady=false;h.inspiration=false;}effects(h).forEach(function(e){if(active(h,e)&&e.fortuneMode&&['attack','check','save'].includes(kind)){e.fortuneRevealed=true;revealed=e.fortuneMode;}});syncOwner(h);return revealed;}
  function checkModifiers(h,ctx){var out=d20Modifiers(h,'check',ctx);out.bonus=0;if(ctx&&ctx.tool&&!ctx.proficient&&effects(h).some(function(e){return active(h,e)&&e.toolMastery;})){out.bonus=g.DNDRules?g.DNDRules.profBonus(h):2;out.fullProficiencyBonus=true;}return out;}
  function attackModifiers(h,ctx){var out=Object.assign({typedExtraDice:[],bonusAttack:teamBonus(h,ctx),doubleDamage:highGround(h,ctx&&ctx.target,ctx)},d20Modifiers(h,'attack',ctx));if(sunBlinded(sceneFor(h,ctx),h)&&!(ctx&&ctx.target&&canSee(sceneFor(h,ctx),h,ctx.target)))out.disadvantage=true;if(bondNear(sceneFor(h,ctx),h))out.advantage=true;if(effects(h).length&&g.DNDRules){var cm=g.DNDRules.conditionModifiers(h);if(cm.advantage)out.advantage=true;if(cm.disadvantage)out.disadvantage=true;}effects(h).forEach(function(e){if(!active(h,e))return;if(ctx&&ctx.opportunityAttack&&e.opportunityAdvantage)out.advantage=true;if(e.attackDisadvantage||e.blinded||e.blindBeyond&&!(ctx&&ctx.target&&canSee(sceneFor(h,ctx),h,ctx.target)))out.disadvantage=true;if(e.forceCritical)out.forceCritical=true;if(e.ignoreCover)out.ignoreCover=true;if(e.typedDice&&(!e.weaponOnly||(ctx.weaponAttack||ctx.weapon)))out.typedExtraDice.push({dice:e.typedDice,type:e.damageType});});return out;}
  function afterAttack(h,result){h.tarotEffects=effects(h).filter(function(e){return !(e.consumeOn==='attack'||e.consumeOn==='hit'&&result.hit);});syncOwner(h);}
  function hostileAction(h){
    var ended=effects(h).filter(function(e){return e.endsOnHostile;});if(!ended.length)return;
    h.tarotEffects=effects(h).filter(function(e){return !e.endsOnHostile;});
    ended.forEach(function(e){if(e.concentration&&h.concentration&&h.concentration.spellId==='tarot:'+e.id)g.DNDCombat.breakConcentration(h);});syncOwner(h);
  }
  function beforeAttack(attacker,target,opts){
    if(!target)return {allowed:true};if(peaceBlocked(sceneFrom(attacker,opts),attacker,target))return {allowed:false,cardId:'cups_10',reason:'Аура покоя запрещает насилие.'};if(effects(attacker).some(function(e){return active(attacker,e)&&(e.charmSourceId===target.id||e.charmSourceId===target.characterId)&&Object.assign({},attacker.conditions,attacker.activeConditions)['Очарован'];}))return {allowed:false,cardId:'cups_02',reason:'Очарование запрещает атаковать источник.'};hostileAction(attacker);
    var wards=effects(target).filter(function(e){return active(target,e)&&e.guardDC;});
    for(var i=0;i<wards.length;i++){var save=g.DNDCombat.savingThrow(attacker,'wis',wards[i].guardDC);if(!save.success)return {allowed:false,cardId:wards[i].id,save:save};}
    return {allowed:true};
  }
  function teamBonus(h,ctx){
    if(!ctx||!ctx.target)return 0;
    return effects(h).reduce(function(total,e){
      if(!active(h,e)||!e.teamAttackBonus)return total;
      var scene=ctx.tarotScene||(h.initiativeTracker?h:g.currentChar);if(!scene||scene.id!==e.sceneOwnerId)return total;
      var anchor,victim;try{anchor=actor(scene,e.nearAllyId);victim=actor(scene,ctx.target.id);}catch(_){return total;}
      if(allies(scene,victim))return total;try{if(distance(scene,anchor,victim)<=5)return Math.max(total,e.teamAttackBonus);}catch(_){}return total;
    },0);
  }
  function roundStart(h,options){
    var t=h.initiativeTracker,changed=false;if(!t||!Array.isArray(t.combatants))return {ok:false};
    actors(h).forEach(function(a){a.tarotEffects=effects(a).filter(function(e){return !(e.roundOwnerId===h.id&&Number(t.round)>=e.untilRound);});});syncOwner(h);
    effects(h).forEach(function(e){if(e.pendingInitiativeBonus&&Number(t.round)>=e.applyFromRound){var owner=t.combatants.find(function(c){return owned(h,c);});if(owner){owner.initiative=(Number(owner.initiative)||0)+e.pendingInitiativeBonus;changed=true;}e.pendingInitiativeBonus=0;}});
    if(changed){t.combatants.sort(function(a,b){return (Number(b.initiative)||0)-(Number(a.initiative)||0);});t.activeIndex=0;if(options&&options.skipDefeated){var first=t.combatants.findIndex(function(c){return !c.defeated&&hp(c)>0;});if(first>=0)t.activeIndex=first;}}
    return {ok:true,changed:changed};
  }
  function incoming(h,attacker,ctx){var scene=sceneFor(h,ctx);return {ac:sunAC(scene,h)+standingAC(h,attacker,ctx)+effects(h).reduce(function(n,e){return n+(active(h,e)?e.ac||0:0);},0),disadvantage:effects(h).some(function(e){return active(h,e)&&(e.incomingDisadvantage||e.invisible&&!(attacker&&canSee(scene,attacker,h)));}),advantage:asleep(h)||sunBlinded(scene,h)&&!(attacker&&canSee(scene,h,attacker))||effects(h).some(function(e){return active(h,e)&&(e.blinded||e.blindBeyond&&!(attacker&&canSee(scene,h,attacker)));})};}
  function onCondition(h,key,on){if(!on&&key==='Очарован')h.tarotEffects=effects(h).filter(function(e){return !e.charmSourceId;});}
  function active(h,e){if(e.ending)return false;if(e.charmSourceId&&!Object.assign({},h.conditions,h.activeConditions)['Очарован'])return false;if(e.repeatSave&&!Object.assign({},h.conditions,h.activeConditions)['Испуган'])return false;return !e.concentration||h.concentration&&h.concentration.active&&h.concentration.spellId==='tarot:'+e.id;}
  function asleep(h){return effects(h).some(function(e){return active(h,e)&&e.sleep;});}
  function immune(h,type){return effects(h).some(function(e){return active(h,e)&&(e.immuneAll||Array.isArray(e.immune)&&e.immune.includes(type));});}
  function resistant(h,type){return effects(h).some(function(e){return active(h,e)&&Array.isArray(e.resist)&&e.resist.includes(type);});}
  function ignoresResistance(h,type,ctx){return !!(ctx&&ctx.weaponAttack&&['дробящий','колющий','рубящий','bludgeoning','piercing','slashing'].includes(type)&&effects(h).some(function(e){return active(h,e)&&e.ignorePhysicalResistance;}));}
  function immuneCondition(h,condition){return effects(h).some(function(e){return active(h,e)&&Array.isArray(e.immuneConditions)&&e.immuneConditions.includes(condition);});}
  function speedMultiplier(h){return effects(h).reduce(function(n,e){return active(h,e)&&e.speedMultiplier!=null?n*e.speedMultiplier:n;},1);}
  function blocked(h,kind){return effects(h).some(function(e){return active(h,e)&&(e.sleep&&['action','bonus','reaction','movement','check'].includes(kind)||e.noActions&&(kind==='action'||kind==='bonus')||e.noMainAction&&kind==='action'||e.noReactions&&kind==='reaction'||e.noMovement&&kind==='movement'||e.noHide&&kind==='hide'||e.noDisengage&&kind==='disengage'||e.noHelp&&kind==='help'||e.noTransfer&&kind==='transfer'||e.noAttacks&&kind==='attack'||e.noSpells&&kind==='spell');});}
  function canMove(h,from,to,context){
    if(blocked(h,'movement'))return false;
    return !effects(h).some(function(e){
      if(!active(h,e))return false;if(e.retreatFrom){var steps=context&&context.direct?[from,to]:g.DNDBattleBoard&&g.DNDBattleBoard.pathCells?g.DNDBattleBoard.pathCells(from,to):[from,to],previous=from;return steps.some(function(next){var closer=Math.hypot(next.x-e.retreatFrom.x,next.y-e.retreatFrom.y)+1e-8<Math.hypot(previous.x-e.retreatFrom.x,previous.y-e.retreatFrom.y);previous=next;return closer;});}if(!e.fearSourceId)return false;
      var source;try{source=actor(h,e.fearSourceId);}catch(_){return false;}
      var p=token(h,source);if(!p||p.visible===false||source.visible===false)return false;
      var board=g.DNDBattleBoard,route=context&&context.direct?[from,to]:board&&board.pathCells?board.pathCells(from,to):[from,to],previous=from;
      return route.some(function(next){var sees=!board||!board.lineOfSight||board.lineOfSight(Object.assign({size:1},previous),Object.assign({size:1},p),context&&context.direct?h.initiativeTracker.battlefield:undefined).clear;var closer=Math.hypot(next.x-p.x,next.y-p.y)<Math.hypot(previous.x-p.x,previous.y-p.y)-1e-8;previous=next;return sees&&closer;});
    });
  }
  function afterDamage(h,event){
    if(!event||event.damageTaken<=0)return;
    var ended=effects(h).filter(function(e){return e.sleep;});h.tarotEffects=effects(h).filter(function(e){return !e.sleep;});
    ended.forEach(function(e){e.lethalWake=!!event.instantDeath||Number.isFinite(event.previousHp)&&event.hpDamage-event.previousHp>=maxHp(h);expireEffect(h,e);});syncOwner(h);
  }
  function turnStart(h,turnId,resetResources){
    if(turnId&&h.tarotLastStartedTurn===turnId)return {ok:false,reason:'Начало хода уже учтено.'};
    var extraActions=0;
    actors(h).forEach(function(t){effects(t).forEach(function(e){if(e.untilOwnerStart===h.id||t===h&&e.untilOwnStart)e.ending=true;});});
    actors(h).forEach(function(t){t.tarotEffects=effects(t).filter(function(e){
      if(t===h&&e.grantActionNextStart){
        var fight=h.initiativeTracker;
        if(fight&&fight.combatants&&fight.combatants.length&&fight.tarotEncounterId===e.encounterId)extraActions++;
        return false;
      }
      if(e.untilOwnerStart===h.id||t===h&&e.untilOwnStart){expireEffect(t,e);return false;}
      if(t===h&&e.untilOwnEndAfterNext)e.startedNext=true;return true;
    });});
    // Expire temporary credits BEFORE resetting the base pool. Otherwise an
    // unused extra reaction could subtract the newly restored regular one.
    if(resetResources){
      if(Array.isArray(h.classes)&&h.classes.length&&g.DNDClassFeatures&&g.DNDClassFeatures.resetTurn)g.DNDClassFeatures.resetTurn(h);
      else h.turnResources={action:true,bonusAction:true,reaction:true,movement:Number(h.speed)||30,movementUsed:0};
    }
    if(extraActions){var r=h.turnResources||(h.turnResources={});var count=r.actions!=null?r.actions:r.action;r.actions=(count===true?1:Number(count)||0)+extraActions;if(r.action!=null)r.action=true;}
    if(turnId)h.tarotLastStartedTurn=turnId;syncOwner(h);return {ok:true};
  }
  // Called for an encounter participant whose own start differs from the
  // Predictor's. Owner-target auras still expire on the Predictor's start.
  function participantTurnStart(h,id,turnId){var t=actor(h,id);return turnStart(t,turnId,true);}
  function combatEnd(h){if(h.initiativeTracker)delete h.initiativeTracker.tarotDamageTotals;actors(h).forEach(function(t){t.tarotEffects=effects(t).filter(function(e){if(e.combatOnly||e.untilOwnStart||e.untilOwnerStart||e.untilOwnEnd||e.untilOwnerEnd||e.untilOwnEndAfterNext){expireEffect(t,e);return false;}return true;});delete t.tarotLastStartedTurn;});syncOwner(h);}
  function turnEnd(h){actors(h).forEach(function(t){t.tarotEffects=effects(t).filter(function(e){if(t===h&&e.repeatSave){var frightened=!!Object.assign({},h.conditions,h.activeConditions)['Испуган'];if(!frightened||g.DNDCombat.savingThrow(h,e.repeatSave,e.saveDC).success){expireEffect(h,e);return false;}}if(t===h&&e.restrictionUntilOwnEnd){delete e.noHide;delete e.noDisengage;delete e.restrictionUntilOwnEnd;}if(e.untilOwnerEnd===h.id||t===h&&(e.untilOwnEnd||e.untilOwnEndAfterNext&&e.startedNext)){expireEffect(t,e);return false;}return true;});});syncOwner(h);}
  function advanceTime(h,seconds,context){if(!Number.isFinite(seconds)||seconds<0)return {ok:false};actors(h).forEach(function(t){advanceInventory(t,seconds);t.tarotEffects=effects(t).filter(function(e){if(e.seconds!=null&&!(context&&context.round&&(e.sleep||e.untilOwnStart))){e.seconds-=seconds;if(e.seconds<=0){expireEffect(t,e);if(e.concentration&&t.concentration&&t.concentration.spellId==='tarot:'+e.id)g.DNDCombat.breakConcentration(t);return false;}}return true;});});syncOwner(h);return {ok:true};}
  function longRestEffects(h){advanceTime(h,28800);combatEnd(h);actors(h).forEach(function(t){if(t.concentration&&String(t.concentration.spellId||'').startsWith('tarot:'))g.DNDCombat.breakConcentration(t);});syncOwner(h);}
  g.DNDPredictorCards={hasInventoryEffects:hasInventoryEffects,inventoryEntries:inventoryEntries,creationOptions:creationOptions,claimReward:claimReward,moveReward:moveReward,definitions:DEFS,definition:definition,play:play,consumeMaximum:consumeMaximum,onCondition:onCondition,canCast:canCast,canSee:canSee,attackSight:attackSight,revealedSight:revealedSight,shareDamage:shareDamage,recordDamage:recordDamage,peaceBlocked:peaceBlocked,sceneFrom:sceneFrom,setElevation:setElevation,noteMove:noteMove,prepareInspiration:prepareInspiration,setCeiling:setCeiling,modifyStats:modifyStats,d20Modifiers:d20Modifiers,noteD20Roll:noteD20Roll,checkModifiers:checkModifiers,attackModifiers:attackModifiers,afterAttack:afterAttack,afterDamage:afterDamage,incoming:incoming,asleep:asleep,immune:immune,resistant:resistant,ignoresResistance:ignoresResistance,immuneCondition:immuneCondition,speedMultiplier:speedMultiplier,blocked:blocked,canMove:canMove,beforeAttack:beforeAttack,preventsOpportunity:preventsOpportunity,opportunityAttack:opportunityAttack,hostileAction:hostileAction,roundStart:roundStart,spendReaction:spendReaction,turnStart:turnStart,participantTurnStart:participantTurnStart,combatEnd:combatEnd,turnEnd:turnEnd,advanceTime:advanceTime,longRestEffects:longRestEffects};
})(window);
