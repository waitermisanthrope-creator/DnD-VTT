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
  function maxHp(t){return g.DNDRules&&g.DNDRules.effectiveMaxHp?g.DNDRules.effectiveMaxHp(t):Number(t.hpMax||t.maxHp||t.hp&&t.hp.max);}
  function syncOwner(h){(h.initiativeTracker&&h.initiativeTracker.combatants||[]).forEach(function(t){if(owned(h,t)){t.hp=hp(h);t.maxHp=Number(h.hpMax||h.maxHp||h.hp&&h.hp.max);if(h.exhaustionLevel!=null)t.exhaustionLevel=h.exhaustionLevel;t.tempHp=Number(h.hpTemp||h.tempHp)||0;['defeated','dead','turnResources','tarotEffects','conditions','activeConditions','concentration','deathSaves','position','inspiration','tarotInspirationReady'].forEach(function(key){if(h[key]!=null)t[key]=copy(h[key]);});}});}
  function distance(h,a,b){if(a===b)return 0;var p=token(h,a),q=token(h,b);if(!p||!q)error('Для проверки расстояния нужны позиции участников на карте.');var cell=h.initiativeTracker&&h.initiativeTracker.battlefield&&h.initiativeTracker.battlefield.cellFt||5;return Math.hypot((p.x-q.x)*cell,(p.y-q.y)*cell,(Number(p.elevationFt)||0)-(Number(q.elevationFt)||0));}
  function target(h,req,range){var t=actor(h,req.targetId);if(distance(h,h,t)>range)error('Цель вне дальности карты.');return t;}
  function allies(h,t){return t===h||t.team==='party'||t.type==='hero';}
  function area(h,radius,kind){return actors(h).filter(function(t){return (kind!=='ally'||allies(h,t))&&(kind!=='enemy'||!allies(h,t))&&distance(h,h,t)<=radius;});}
  function put(h,id,data){if(executionScene)noteAffect(h,{tarotScene:executionScene});h.tarotEffects=h.tarotEffects||[];h.tarotEffects=h.tarotEffects.filter(function(e){return e.id!==id;});h.tarotEffects.push(Object.assign({id:id},data));}
  function conditions(h,kind){var key=g.DNDRules&&g.DNDRules.normalizeConditionName?g.DNDRules.normalizeConditionName(kind):kind;var applied=g.DNDCombat.toggleCondition(h,key,true);if(applied&&h.activeConditions)h.activeConditions[key]=true;return applied;}
  function clearCondition(h,kind){var key=g.DNDRules&&g.DNDRules.normalizeConditionName?g.DNDRules.normalizeConditionName(kind):kind;g.DNDCombat.toggleCondition(h,key,false);if(h.activeConditions)h.activeConditions[key]=false;}
  function payAction(h,kind,req){
    activateLastStand(h);var conditions=Object.assign({},h.conditions,h.activeConditions);if(['Бессознателен','Оглушён','Парализован','Недееспособен','Unconscious'].some(function(k){return conditions[k];})||(!Number.isFinite(hp(h))||hp(h)<=0&&!lastStandActive(h)))error('Состояние персонажа не позволяет разыграть карту.');
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
    e.ending=true;if(e.entityId)removeTarotEntity(h,e.entityId);if(e.gravity)landGravity(h,e);
    if(e.extraReactions>0&&h.turnResources)h.turnResources.reaction=Math.max(0,reactionCount(h)-e.extraReactions);
    if(e.ownedCondition&&!effects(h).some(function(other){return other!==e&&other.ownedCondition===e.ownedCondition&&active(h,other);}))clearCondition(h,e.ownedCondition);
    if(e.tempGrantSource&&h.classFeaturesState&&h.classFeaturesState.tarotTempSource===e.tempGrantSource){h.hpTemp=0;h.tempHp=0;if(h.hp&&typeof h.hp==='object')h.hp.temp=0;delete h.classFeaturesState.tarotTempSource;}
    if(e.sleep){
      e.ending=true;
      // Waking is not resurrection. A lethal blow still ends the sleep, but
      // its heal cannot undo instant death or three failed death saves.
      if(!e.lethalWake&&!(h.deathSaves&&Number(h.deathSaves.failures)>=3)){
        if(hp(h)>0)clearCondition(h,'Бессознателен');
        if(!e.sleepNoHeal)heal(h,e.healingAmount!=null?e.healingAmount:roll(e.healingCount,4)+e.healingBonus);
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
    if(h&&h.classFeaturesState&&h.classFeaturesState.raging)return {ok:false,error:'В Ярости нельзя накладывать заклинания.'};
    if(spell&&spell.damage&&peaceBlocked(sceneFor(h),h))return {ok:false,error:'Аура покоя запрещает наносящее урон заклинание.'};
    if(blocked(h,'spell',{reaction:!!(spell&&(/reaction|реакц/i.test(String(spell.castingTime||spell.castTime||''))))}))return {ok:false,error:'Отшельник запрещает колдовство до начала следующего хода.'};
    var c=spell&&spell.components,verbal=typeof c==='string'?/(^|[,\s])(V|В)(?=$|[,\s])/i.test(c):Array.isArray(c)?c.some(function(x){return /^(V|В|verbal)$/i.test(x);}):c&&!!(c.verbal||c.v||c.V);
    if(verbal&&effects(h).some(function(e){return active(h,e)&&e.noVerbal;}))return {ok:false,error:'Тройка Кубков запрещает вербальные компоненты.'};return {ok:true};
  }
  function invisible(t){return !!Object.assign({},t&&t.conditions,t&&t.activeConditions)['Невидим']||effects(t).some(function(e){return active(t,e)&&e.invisible;});}
  function sceneFor(h,ctx){return ctx&&ctx.tarotScene||(h&&h.initiativeTracker?h:g.currentChar);}
  function canSee(scene,observer,t,options){
    if(!observer||!t)return false;if(hp(observer)<=0&&!lastStandActive(observer)||['Бессознателен','Недееспособен','Оглушён','Unconscious'].some(function(k){return Object.assign({},observer.conditions,observer.activeConditions)[k];}))return false;return sightGeometry(scene,observer,t,options);
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
    var seen=new Set(),found=false;function walk(list,depth){if(!Array.isArray(list)||depth>20)return;for(var i=list.length-1;i>=0;i--){var item=list[i];if(!item||typeof item!=='object'||seen.has(item))continue;seen.add(item);var illusion=item.tarotIllusion,effect=item.tarotTransmutation;if(illusion){found=true;if(!inspectOnly){illusion.seconds-=seconds;if(illusion.seconds<=0){list.splice(i,1);continue;}}}if(effect){found=true;if(!inspectOnly){effect.seconds-=seconds;if(effect.seconds<=0){item.name=effect.name;if(effect.hadMaterial)item.material=effect.material;else delete item.material;delete item.tarotTransmutation;}}}walk(item.contents,depth+1);}}
    Object.keys(h.inventory||{}).forEach(function(key){walk(h.inventory[key],0);});return found;
  }
  function hasInventoryEffects(h){return advanceInventory(h,0,true);}
  function wagerStartCheck(h,event){
    var check=A.inspect(h);if(!check.ok)return check;
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватные сетевые ставки ещё не подключены.'};
    if(check.state.blind||check.state.offer)return {ok:false,reason:'Сначала завершите текущий выбор карты.'};
    if(hp(h)<=0||h.dead||['Бессознателен','Недееспособен','Оглушён','Парализован','Unconscious'].some(function(k){return Object.assign({},h.conditions,h.activeConditions)[k];}))return {ok:false,reason:'Для начала ставки персонаж должен быть в сознании и способен действовать.'};
    var kinds=new Set(check.state.decks.minor.filter(function(id){return DEFS[id].action!=='reaction'||DEFS[id].trigger===event;}).map(function(id){return DEFS[id].action;})),pool=h.turnResources||{},current=h.initiativeTracker&&h.initiativeTracker.combatants&&h.initiativeTracker.combatants[h.initiativeTracker.activeIndex];
    if(current&&!owned(h,current)&&Array.from(kinds).some(function(k){return k!=='reaction';}))return {ok:false,reason:'Ставка с обычными картами доступна в собственный ход.'};
    for(var kind of kinds){var key=kind==='action'?(pool.actions!=null?'actions':'action'):kind==='bonus'?'bonusAction':'reaction',value=pool[key]===true?1:Number(pool[key]);if(!Number.isFinite(value)||value<1||blocked(h,kind))return {ok:false,reason:'Для ставки оставьте ресурс каждого возможного исхода: действие и/или бонусное действие. Ставка ещё не сделана.'};}
    return {ok:true};
  }
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
  // The interrupt frame belongs to the profile and survives JSON/cloud saves.
  // Resource reset is deferred until the damage-producing action has committed.
  function executionActor(t,ctx){var scene=executionScene||sceneFrom(t,ctx),list=scene&&scene.initiativeTracker&&scene.initiativeTracker.combatants;return scene&&scene.predictorState&&Array.isArray(list)&&list.includes(t)&&owned(scene,t)?scene:t;}
  function lastStandFrame(h){return h&&h.classFeaturesState&&h.classFeaturesState.predictorLastStand;}
  function lastStandActive(h){var scene=h&&h.predictorState?h:sceneFor(h),frame=lastStandFrame(scene);return !!(frame&&frame.active&&!scene.dead&&Number(scene.deathSaves&&scene.deathSaves.failures||0)<3&&(h===scene||owned(scene,h)));}
  function beginLastStand(h,event){
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return false;
    var ready=effects(h).find(function(e){return active(h,e)&&e.lastStandReady;});
    if(!ready||!h.predictorState||lastStandFrame(h)||h.dead||event.previousHp<=0||hp(h)!==0||event.instantDeath||event.hpDamage-event.previousHp>=maxHp(h)||Number(h.deathSaves&&h.deathSaves.failures||0)>=3)return false;
    var tracker=h.initiativeTracker,owner=tracker&&tracker.combatants&&tracker.combatants.find(function(t){return owned(h,t);}),interrupted=tracker&&tracker.combatants[tracker.activeIndex];
    if(!owner||!interrupted)return false;
    h.tarotEffects=effects(h).filter(function(e){return e!==ready;});
    var state=h.classFeaturesState||(h.classFeaturesState={});state.predictorLastStand={id:'last-stand:'+g.crypto.randomUUID(),active:true,activated:false,ownerId:owner.id,interruptedId:interrupted.id,round:tracker.round,queued:[],pool:copy(h.turnResources||{}),startedTurn:h.tarotLastStartedTurn||null,tricksterTurn:h.predictorState.trickster&&h.predictorState.trickster.ownTurnId||null,flags:{}};STAND_TURN_FLAGS.forEach(function(k){if(Object.prototype.hasOwnProperty.call(state,k))state.predictorLastStand.flags[k]=copy(state[k]);});
    tracker.activeIndex=tracker.combatants.indexOf(owner);h.defeated=false;owner.defeated=false;syncOwner(h);return true;
  }
  var STAND_TURN_FLAGS=['sneakUsedThisTurn','foeSlayerUsedThisTurn','recklessThisTurn','actionSurgeUsed','rageMaintained','bhAttacksThisTurn'];
  function activateLastStand(h){
    h=executionActor(h);var frame=lastStandFrame(h);if(!frame||!lastStandActive(h)||frame.activated)return false;
    frame.pool=copy(h.turnResources||{});frame.startedTurn=h.tarotLastStartedTurn||null;frame.tricksterTurn=h.predictorState.trickster&&h.predictorState.trickster.ownTurnId||null;
    frame.flags={};STAND_TURN_FLAGS.forEach(function(k){if(Object.prototype.hasOwnProperty.call(h.classFeaturesState,k))frame.flags[k]=copy(h.classFeaturesState[k]);});
    // Mark first: nested class start hooks cannot reset this pool again.
    frame.activated=true;turnStart(h,frame.id,true);h.turnResources.movementUsed=0;A.beginOwnTurn(h,frame.id);syncOwner(h);return true;
  }
  function queueLastStandAttacks(scene,attacker,victim,list,options){
    var frame=lastStandFrame(scene);if(!frame||!frame.active||!list.length)return false;
    var members=actors(scene);if(!members.includes(attacker)||!members.includes(victim))return false;
    var encoded=JSON.parse(JSON.stringify({attacks:list,options:options||{}},function(key,value){
      if(key==='tarotScene'||key==='target'||key==='__attacker')return undefined;
      if(value&&typeof value==='object'&&members.includes(value))return {tarotActorRef:value.id};return value;
    }));
    frame.queued.push({attackerId:attacker.id,targetId:victim.id,attacks:encoded.attacks,options:encoded.options});return true;
  }
  function finishLastStand(h){
    var frame=lastStandFrame(h);if(!frame||!frame.active)return {ok:false,reason:'Нет внеочередного хода.'};
    var saved=copy(h);
    try{
      activateLastStand(h);var ended=A.endTurn(h,frame.id);if(!ended.ok)error(ended.reason);turnEnd(h);
      var tracker=h.initiativeTracker,reaction=h.turnResources&&h.turnResources.reaction,queue=frame.queued||[];
      h.turnResources=copy(frame.pool||{});h.turnResources.reaction=reaction;
      STAND_TURN_FLAGS.forEach(function(k){if(Object.prototype.hasOwnProperty.call(frame.flags||{},k))h.classFeaturesState[k]=frame.flags[k];else delete h.classFeaturesState[k];});
      if(frame.startedTurn)h.tarotLastStartedTurn=frame.startedTurn;else delete h.tarotLastStartedTurn;
      if(h.predictorState.trickster)h.predictorState.trickster.ownTurnId=frame.tricksterTurn;
      delete h.classFeaturesState.predictorLastStand;
      if(hp(h)<=0||h.dead||Number(h.deathSaves&&h.deathSaves.failures||0)>=3){h.defeated=true;conditions(h,'Бессознателен');g.DNDCombat.breakConcentration(h);h.turnResources.reaction=0;}else h.defeated=false;
      var resume=tracker.combatants.findIndex(function(t){return String(t.id)===String(frame.interruptedId);});if(resume<0)error('Прерванный участник отсутствует в инициативе.');tracker.activeIndex=resume;syncOwner(h);
      var resumed=[];queue.forEach(function(job){var source=actor(h,job.attackerId),victim=actor(h,job.targetId);if(source.dead||source.defeated||hp(source)<=0||job.options.stopOnDefeat&&(victim.defeated||hp(victim)<=0))return;
        var attacks=JSON.parse(JSON.stringify(job.attacks),function(key,value){return value&&value.tarotActorRef?actor(h,value.tarotActorRef):value;});
        attacks.forEach(function(a){a.tarotScene=h;});resumed.push(g.DNDCombat.attackSequence(source,victim,attacks,Object.assign({},job.options,{tarotScene:h})));
      });syncOwner(h);return {ok:true,result:{lastStandFinished:true,resumed:resumed,interruptedId:frame.interruptedId,conscious:hp(h)>0&&!h.defeated}};
    }catch(e){restoreInPlace(h,saved);return {ok:false,reason:e.message};}
  }
  HANDLERS.wands_09=function(h){var tracker=encounter(h);if(!tracker.combatants.some(function(t){return owned(h,t);}))error('Персонаж должен находиться в инициативе.');put(h,'wands_09',{lastStandReady:true,seconds:60});return {preparedLastStand:true,seconds:60};};
  HANDLERS.wands_10=function(h){
    if(!g.DNDRules||!g.DNDRules.addExhaustion)error('Движок истощения недоступен.');var result=g.DNDRules.addExhaustion(h,1);if(!result.ok)error('Не удалось учесть истощение.');
    if(!result.dead)put(h,'wands_10',{maximizeAttack:true,consumeOn:'attack',untilOwnEndAfterNext:true});return {exhaustion:result.after,dead:result.dead,maximizeNextAttack:!result.dead};
  };
  HANDLERS.major_21=function(h){
    encounter(h);var r=h.turnResources,key=r.actions!=null?'actions':'action',n=r[key]===true?1:Number(r[key])||0;r[key]=n+1;
    put(h,'major_21',{timeStop:true,speedMultiplier:2,untilOwnEnd:true,combatOnly:true});return {extraAction:1,extraMovement:true,untilOwnEnd:true};
  };
  function standPaused(t,ctx){var scene=executionScene||sceneFor(t,ctx),frame=lastStandFrame(scene);return !!(frame&&frame.active&&actors(scene).includes(t)&&t!==scene&&!owned(scene,t)&&!(ctx&&(ctx.opportunityAttack||ctx.reaction)));}
  function timeFrozen(t){var scene=executionScene||sceneFor(t);return !!(scene&&actors(scene).includes(t)&&t!==scene&&!owned(scene,t)&&effects(scene).some(function(e){return active(scene,e)&&e.timeStop;}));}
  function noteAffect(t,ctx){var scene=ctx&&ctx.tarotScene||executionScene||g.currentChar;if(scene&&actors(scene).includes(t)&&t!==scene&&!owned(scene,t)&&effects(scene).some(function(e){return e.timeStop;}))scene.tarotEffects=effects(scene).filter(function(e){return !e.timeStop;});}
  HANDLERS.major_05=function(h){var targets=area(h,60);targets.forEach(function(t){put(t,'major_05',{truthful:true,seconds:600});});return {truthfulIds:targets.map(function(t){return t.id;}),seconds:600};};
  function cannotLie(t){return effects(t).some(function(e){return active(t,e)&&e.truthful;});}
  function deceptionBlocked(t,ctx){return !!(cannotLie(t)&&ctx&&(ctx.isLie===true||ctx.skillId==='deception'&&ctx.deceptionIntent==='lie'));}
  function magicItem(item){return item&&(item.magical===true||item.isMagical===true||item.magic===true||item.tarotTransmutation||/^c_potion_/.test(item.id||'')||Array.isArray(item.enchantments)&&item.enchantments.length>0||Number(item.magicBonus)!==0&&Number.isFinite(Number(item.magicBonus)));}
  HANDLERS.wands_03=function(h){
    encounter(h);var found=[],directions=['север','северо-восток','восток','юго-восток','юг','юго-запад','запад','северо-запад'];
    actors(h).forEach(function(t){var entries=[],seen=new Set();function walk(list,depth){if(!Array.isArray(list)||depth>20)return;list.forEach(function(item){if(!item||seen.has(item))return;seen.add(item);if(magicItem(item)){var count=Math.min(3,Math.max(0,Math.floor(item.count==null?1:Number(item.count)||0)));for(var i=0;i<count;i++)entries.push(item);}walk(item.contents,depth+1);});}Object.keys(t.inventory||{}).forEach(function(k){walk(t.inventory[k],0);});if(!entries.length)return;
      var feet=distance(h,h,t);if(feet>5280)return;var a=token(h,h),b=token(h,t);if(!a||!b)error('Неизвестны позиции магических предметов в сцене.');
      var bearing=(Math.atan2(b.x-a.x,a.y-b.y)*180/Math.PI+360)%360;entries.forEach(function(){found.push({distanceFt:feet,direction:feet===0?'здесь':directions[Math.round(bearing/45)%8],bearingDegrees:bearing});});
    });found.sort(function(a,b){return a.distanceFt-b.distanceFt;});h.tarotSearchResult={rangeFt:5280,scope:'loaded-scene',items:found.slice(0,3)};return copy(h.tarotSearchResult);
  };
  HANDLERS.pentacles_01=function(h,r){
    var item={name:'Золотая монета Туза Пентаклей',count:1,equipped:false,weight:'0.02 фунта',cost:'50 зм',tarotCoin:r.operationId};addInventory(h,'junk',item);return {created:item.name,valueGp:50};
  };
  function spendCoin(h,ref,targetId,asMoney){
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение пока не подключено.'};
    var draft=copy(h);try{
      var selected=inventoryItem(draft,ref);if(typeof selected.item.tarotCoin!=='string'||selected.count!==1)error('Выберите отдельную монету Туза Пентаклей.');
      var result;if(asMoney){draft.coins=draft.coins||{};var gp=Number(draft.coins.gp||0);if(!Number.isSafeInteger(gp)||gp<0||!Number.isSafeInteger(gp+50))error('Некорректный кошелёк.');draft.coins.gp=gp+50;result={goldReceived:50};}
      else{var t=target(draft,{targetId:targetId},60);if(t===draft||!canSee(draft,draft,t)||peaceBlocked(draft,draft,t))error('Нужна видимая цель; аура покоя запрещает атаку.');payAction(draft,'action',{cardId:'pentacles_01'});var dex=g.DNDRules.getStats(draft).dex;result=g.DNDCombat.attack(draft,t,{bonus:Math.floor((dex-10)/2),damage:'1d10',damageType:'дробящий',weaponAttack:true,rangedAttack:true,attackKind:'rangedWeapon',mode:distance(draft,draft,t)>20?'disadvantage':'normal',useRules:false,tarotScene:draft});if(result.ok===false||result.blocked)error(result.reason||'Атака монетой недоступна.');}
      selected.list.splice(ref.index,1);syncOwner(draft);Object.assign(h,draft);return {ok:true,result:result};
    }catch(e){return {ok:false,reason:e.message};}
  }
  function summonLocation(h,dest,range){
    var fight=encounter(h),bf=fight.battlefield,p=token(h,h),M=g.DNDPredictorMovement;
    if(!bf||!p||!M||!g.DNDSecondaryEntities||!g.DNDSecondaryEntities.createFor||!g.DNDSummoning)error('Для призыва нужны поле и движки призванных существ.');M.validate(bf,p);
    if(!dest||!Number.isInteger(dest.x)||!Number.isInteger(dest.y)||dest.x<0||dest.y<0||dest.x>=bf.cols||dest.y>=bf.rows)error('Выберите клетку призыва.');
    var position={x:dest.x,y:dest.y,elevationFt:Number(p.elevationFt)||0};if(Math.hypot(dest.x-p.x,dest.y-p.y)*bf.cellFt>range)error('Клетка призыва дальше '+range+' футов.');
    if((bf.obstacles||{})[dest.x+':'+dest.y]||Object.values(bf.tokens).some(function(t){return dest.x>=t.x&&dest.y>=t.y&&dest.x<t.x+t.size&&dest.y<t.y+t.size;}))error('Клетка призыва занята.');
    if(!g.DNDBattleBoard||!g.DNDBattleBoard.lineOfSight)error('Обработчик видимости недоступен.');if(!g.DNDBattleBoard.lineOfSight(p,position,bf).clear)error('Клетка призыва не видна.');return {fight:fight,field:bf,source:p,destination:dest};
  }
  function createTarotCreature(h,location,spec){
    var fight=location.fight,bf=location.field,dest=location.destination,owner=fight.combatants.find(function(t){return owned(h,t);});
    var entity=g.DNDSecondaryEntities.createFor(h,Object.assign({},spec,{x:dest.x,y:dest.y,controlMode:'independent',metadata:{tarotOwnerId:h.id,creatureType:spec.creatureType||null,stats:spec.stats||null}}));
    var c={id:'summon_'+entity.id,entityId:entity.id,name:entity.name,ownerId:entity.ownerId,type:'summon',team:entity.team,creatureType:spec.creatureType||null,initiative:owner&&owner.initiative||0,hp:entity.hp,maxHp:entity.maxHp,ac:entity.ac,speed:entity.speed,size:1,actions:copy(entity.actions),turnResources:{action:true,bonusAction:true,reaction:true,movement:entity.speed,movementUsed:0}};if(spec.stats)c.stats=copy(spec.stats);fight.combatants.push(c);
    bf.tokens['bt_'+entity.id].sourceId=c.id;bf.tokens['bt_'+entity.id].elevationFt=Number(location.source.elevationFt)||0;return entity;
  }
  function summonAncestor(h,r){
    var location=summonLocation(h,r.destination,30),owner=location.fight.combatants.find(function(t){return owned(h,t);});
    var entity=createTarotCreature(h,location,{id:'tarot-ancestor:'+g.crypto.randomUUID(),name:'Призрачный предок',ownerId:owner?owner.id:h.id,team:'party',source:'tarot:pentacles_10',hp:11,maxHp:11,ac:16,speed:30,actions:[{name:'Копьё',attackBonus:3,damage:'1d6+1',damageType:'колющий',rangeFt:5}]});
    put(h,'pentacles_10',{entityId:entity.id,seconds:60});return {summonedId:entity.id,seconds:60};
  }
  HANDLERS.cups_07=function(h,r){
    if(!Number.isInteger(r.cupNumber)||r.cupNumber<1||r.cupNumber>7)error('Выберите один из семи закрытых кубков.');
    // Validate every possible branch before randomness: failure must not preview
    // an outcome and let the caller retry with different prerequisites.
    var location=summonLocation(h,r.destination,5),potion=Array.isArray(g.defaultConsumables)&&g.defaultConsumables.find(function(x){return x&&x.id==='c_potion_healing';});
    if(!potion||!g.crypto||typeof g.crypto.randomUUID!=='function')error('Недоступен каталог зелья лечения или генератор ID.');
    if(!Number.isFinite(hp(h))||maxHp(h)<=0)error('Неизвестны хиты персонажа.');
    if(peaceBlocked(h,h))error('Аура покоя не позволяет разрешить опасный исход кубка.');
    if(h.coins!=null&&(typeof h.coins!=='object'||Array.isArray(h.coins)))error('Некорректный кошелёк.');var gp=Number(h.coins&&h.coins.gp||0);if(!Number.isSafeInteger(gp)||gp<0||!Number.isSafeInteger(gp+10))error('Некорректный кошелёк.');
    if(h.inventory!=null&&(typeof h.inventory!=='object'||Array.isArray(h.inventory)))error('Повреждён инвентарь.');['junk','consumables'].forEach(function(k){if(h.inventory&&h.inventory[k]!=null&&!Array.isArray(h.inventory[k]))error('Повреждена категория инвентаря.');});
    var outcome=roll(1,7),result={cupNumber:r.cupNumber,outcome:outcome,operationId:r.operationId};
    if(outcome===1){h.coins=h.coins||{};h.coins.gp=gp+10;result.kind='gold';result.gold=10;}
    else if(outcome===2){result.kind='poison';var save=g.DNDCombat.savingThrow(h,'con',14);result.saved=save.success;result.saveTotal=save.total;if(!save.success){result.damage=damage(h,h,roll(1,6),'яд');var existing=!!Object.assign({},h.conditions,h.activeConditions)['Отравлен'];if(conditions(h,'Отравлен')){put(h,'cups_07',{repeatSave:'con',repeatCondition:'Отравлен',saveDC:14,ownedCondition:existing?null:'Отравлен',seconds:60});result.poisoned=true;}else result.poisonImmune=true;}}
    else if(outcome===3){result.kind='potion';var item=copy(potion);item.count=1;item.equipped=false;delete item.containerId;delete item.contents;addInventory(h,'consumables',item);result.item=item.name;}
    else if(outcome===4){result.kind='snake';var snake=createTarotCreature(h,location,{id:'tarot-snake:'+g.crypto.randomUUID(),name:'Ядовитая змея',ownerId:'',team:'neutral',source:'tarot:cups_07',hp:2,maxHp:2,ac:13,speed:30,creatureType:'beast',stats:{str:2,dex:16,con:11,int:1,wis:10,cha:3},actions:[{name:'Укус',attackBonus:5,damage:'1d1',damageType:'колющий',rangeFt:5,onHitSave:{stat:'con',dc:10,damage:'2d4',damageType:'яд',half:true}}]});result.entityId=snake.id;}
    else if(outcome===5)result.kind='empty';
    else {var illusion=outcome===6;result.kind=illusion?'illusion':'gem';var gem={id:'tarot-cup:'+r.operationId,name:illusion?'Иллюзорный самоцвет':'Самоцвет Семёрки Кубков',count:1,equipped:false,weight:illusion?'0 фунтов':'0.01 фунта',cost:illusion?'0 зм':'25 зм',material:illusion?'illusion':'gemstone'};if(illusion){gem.isIllusion=true;gem.tarotIllusion={seconds:600,operationId:r.operationId};result.seconds=600;}else result.valueGold=25;addInventory(h,'junk',gem);}
    h.classFeaturesState=h.classFeaturesState||{};h.classFeaturesState.predictorCupsResult=copy(result);return result;
  };
  HANDLERS.pentacles_10=summonAncestor;
  function removeTarotEntity(h,id){var fight=h.initiativeTracker,bf=fight&&fight.battlefield;if(!bf)return;var active=fight.combatants[fight.activeIndex],activeId=active&&active.id;if(bf.entities)delete bf.entities[id];delete bf.tokens['bt_'+id];fight.combatants=fight.combatants.filter(function(t){return t.entityId!==id;});var at=fight.combatants.findIndex(function(t){return t.id===activeId;});fight.activeIndex=at>=0?at:Math.min(fight.activeIndex,Math.max(0,fight.combatants.length-1));}
  function syncTarotEntity(t,opts){
    if(t&&t.predictorState)syncOwner(t);if(!t||!t.entityId)return;var scene=opts&&opts.tarotScene||executionScene||g.currentChar,bf=scene&&scene.initiativeTracker&&scene.initiativeTracker.battlefield,e=bf&&bf.entities&&bf.entities[t.entityId];
    if(!e||!['tarot:pentacles_10','tarot:cups_07'].includes(e.source))return;e.hp=hp(t);e.maxHp=Number(t.hpMax||t.maxHp||t.hp&&t.hp.max);if(t.exhaustionLevel!=null)e.exhaustionLevel=t.exhaustionLevel;e.tempHp=Number(t.hpTemp||t.tempHp)||0;e.conditions=copy(t.conditions||{});e.defeated=e.hp<=0;var p=bf.tokens['bt_'+e.id];if(p){p.hp=e.hp;p.maxHp=e.maxHp;}
  }
  function canAncestorAttack(h,c,t){
    var bf=h&&h.initiativeTracker&&h.initiativeTracker.battlefield,a=bf&&bf.tokens&&bf.tokens['bt_'+c.entityId],b=bf&&token(h,t),active=h&&h.initiativeTracker&&h.initiativeTracker.combatants[h.initiativeTracker.activeIndex];
    return !!(a&&b&&active&&active.id===c.id&&hp(c)>0&&!['Бессознателен','Недееспособен','Оглушён','Парализован','Unconscious'].some(function(k){return Object.assign({},c.conditions,c.activeConditions)[k];})&&canSee(h,c,t)&&g.DNDPredictorMovement&&g.DNDPredictorMovement.reach(bf,a,b)<=5);
  }
  // Prepared reactions are persisted intent, never a manufactured attack/save event.
  var executionScene=null;
  function armReaction(h,id,req){
    req=req||{};var check=A.inspect(h),def=DEFS[id];if(!check.ok)return check;
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватные сетевые реакции ещё не подключены.'};
    if(!def||!['cups_05','cups_13','pentacles_14','wands_02'].includes(id)||!check.state.hand.includes(id))return {ok:false,reason:'Нет поддержанной реакции в руке.'};
    if(typeof req.operationId!=='string'||!req.operationId||check.state.applications.some(function(x){return x.id===req.operationId;}))return {ok:false,reason:'Нужен новый ID реакции.'};
    if(req.expectedRevision!==check.state.revision)return {ok:false,reason:'Профиль изменился.'};
    try{var t=id==='wands_02'?h:actor(h,req.targetId);if(id==='cups_13'){if(!canSee(h,h,t)||maxHp(t)<=0||t.dead)error('Выберите видимое живое существо для перенаправления лечения.');}else if(id==='wands_02'){if((h.initiativeTracker&&h.initiativeTracker.combatants||[]).some(function(x){return owned(h,x);}))error('Двойка Жезлов готовится перед включением персонажа в инициативу.');}else if(allies(h,t)||!canSee(h,h,t)||distance(h,h,t)>(id==='cups_05'?30:60))error('Выберите видимого врага в пределах дальности реакции.');
      var draft=copy(h);if(id==='wands_02'&&!draft.turnResources)draft.turnResources={action:true,bonusAction:true,reaction:true,movement:Number(h.speed)||30};payAction(draft,'reaction',{cardId:id,event:def.trigger});
      if(id==='pentacles_14'&&(!h.coins||!Number.isFinite(h.coins.gp)||h.coins.gp<100))error('Для Короля Пентаклей нужно 100 золотых в кошельке.');
      h.classFeaturesState=h.classFeaturesState||{};h.classFeaturesState.predictorReaction={cardId:id,targetId:t.id,operationId:req.operationId};h.predictorState.revision++;return {ok:true};
    }catch(e){return {ok:false,reason:e.message};}
  }
  function cancelReaction(h){if(!h.classFeaturesState||!h.classFeaturesState.predictorReaction)return {ok:false,reason:'Нет подготовленной реакции.'};delete h.classFeaturesState.predictorReaction;h.predictorState.revision++;return {ok:true};}
  function restoreInPlace(target,snapshot){
    Object.keys(target).forEach(function(k){if(!Object.prototype.hasOwnProperty.call(snapshot,k))delete target[k];});
    Object.keys(snapshot).forEach(function(k){var a=target[k],b=snapshot[k];if(a&&b&&typeof a==='object'&&typeof b==='object'&&Array.isArray(a)===Array.isArray(b))restoreInPlace(a,b);else target[k]=copy(b);});if(Array.isArray(target))target.length=snapshot.length;
  }
  function consumeEventReaction(scene,id,subject,fn){
    var pending=scene&&scene.classFeaturesState&&scene.classFeaturesState.predictorReaction;
    if(!pending||pending.cardId!==id||!subject||id!=='cups_13'&&String(pending.targetId)!==String(subject.id)||g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return null;
    var check=A.inspect(scene);if(!check.ok||!check.state.hand.includes(id)||id!=='cups_13'&&allies(scene,subject)||!canSee(scene,scene,subject)||distance(scene,scene,subject)>(id==='cups_05'?30:60))return null;
    try{if(actor(scene,subject.id)!==subject)return null;}catch(_){return null;}
    var snapshot=copy(scene);try{
      payAction(scene,'reaction',{cardId:id,event:DEFS[id].trigger});delete scene.classFeaturesState.predictorReaction;
      var result=fn();var recorded=A.recordApplication(scene,id,pending.operationId,scene.predictorState.revision);if(!recorded.ok)error(recorded.reason);syncOwner(scene);return {cardId:id,result:result};
    }catch(e){restoreInPlace(scene,snapshot);return null;}
  }
  function interceptAttack(attacker,targetActor,opts){
    var scene=opts&&opts.tarotScene||executionScene||g.currentChar;if(!scene||!attacker)return null;
    return consumeEventReaction(scene,'cups_05',attacker,function(){
      var reroll=g.DNDRules.rollD20('normal',null,attacker,{kind:'attack',tarotModeApplied:true});
      var cost=roll(1,6);damage(scene,scene,cost,'психический');return {roll:reroll,selfDamage:cost};
    });
  }
  function interceptSave(subject,ctx){
    var scene=ctx&&ctx.tarotScene||executionScene||g.currentChar;if(!scene)return null;
    return consumeEventReaction(scene,'pentacles_14',subject,function(){
      if(!scene.coins||!Number.isFinite(scene.coins.gp)||scene.coins.gp<100)error('Недостаточно золота.');scene.coins.gp-=100;return {forcedFailure:true,goldSpent:100};
    });
  }
  function healingTargetLegal(scene,caster,t,opts){
    if(!t||t.dead||maxHp(t)<=0||['prop','object'].includes(t.type)||distance(scene,caster,t)>opts.rangeFt)return false;
    if(opts.requiresSight&&t!==caster&&!canSee(scene,caster,t))return false;
    if(opts.excludeUndeadConstructs&&/undead|нежит|construct|конструкт/i.test(t.creatureType||''))return false;
    return !Array.isArray(opts.eligibleTargetIds)||opts.eligibleTargetIds.some(function(id){return String(id)===String(t.id);});
  }
  function interceptHealing(original,amount,opts){
    opts=opts||{};if(opts.healingSpell!==true||!Number.isFinite(amount)||amount<=0||!Number.isFinite(opts.rangeFt)||opts.rangeFt<0)return null;
    var scene=opts.tarotScene||executionScene||g.currentChar,pending=scene&&scene.classFeaturesState&&scene.classFeaturesState.predictorReaction;if(!pending||pending.cardId!=='cups_13')return null;
    var caster=opts.caster,destination;try{if(!caster||actor(scene,caster.id)!==caster||actor(scene,original.id)!==original)return null;destination=actor(scene,pending.targetId);if(destination===original||!healingTargetLegal(scene,caster,destination,opts))return null;}catch(_){return null;}
    var result=consumeEventReaction(scene,'cups_13',caster,function(){return {redirectTargetId:destination.id};});return result?{target:destination,receipt:result}:null;
  }
  // Records an already-cast healing spell, like the existing damage/heal logs.
  // This is event resolution, never a free spell cast or slot/resource grant.
  function resolveHealingEvent(h,req){
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение пока не подключено.'};
    var check=A.inspect(h);if(!check.ok)return check;var draft=copy(h);try{
      if(!req||req.expectedRevision!==check.state.revision||typeof req.eventId!=='string'||!req.eventId||req.alreadyCast!==true||!Number.isInteger(req.amount)||req.amount<1||req.amount>10000||!Number.isFinite(req.rangeFt)||req.rangeFt<0||req.rangeFt>5280)error('Укажите параметры уже сотворённого заклинания лечения.');
      draft.classFeaturesState=draft.classFeaturesState||{};var events=draft.classFeaturesState.predictorHealingEvents||[];if(events.includes(req.eventId))error('Лечение этого события уже учтено.');
      var caster=actor(draft,req.casterId),targetActor=actor(draft,req.targetId),opts={tarotScene:draft,caster:caster,healingSpell:true,rangeFt:req.rangeFt,requiresSight:!!req.requiresSight,excludeUndeadConstructs:!!req.excludeUndeadConstructs};
      if(hp(caster)<=0||!healingTargetLegal(draft,caster,targetActor,opts))error('Исходная цель недопустима для этого лечения.');
      var result=g.DNDCombat.heal(targetActor,req.amount,opts);if(result.blocked)error(result.note||'Лечение недоступно.');draft.classFeaturesState.predictorHealingEvents=events.concat(req.eventId);draft.predictorState.revision++;syncOwner(draft);Object.assign(h,draft);return {ok:true,result:result};
    }catch(e){return {ok:false,reason:e.message};}
  }
  function interceptInitiative(h,bonus){
    var pending=h.classFeaturesState&&h.classFeaturesState.predictorReaction,check=A.inspect(h);
    if(!check.ok||!pending||pending.cardId!=='wands_02'||!check.state.hand.includes('wands_02')||(h.initiativeTracker&&h.initiativeTracker.combatants||[]).some(function(x){return owned(h,x);})||g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return null;
    var snapshot=copy(h);try{
      if(!h.turnResources)h.turnResources={action:true,bonusAction:true,reaction:true,movement:Number(h.speed)||30};payAction(h,'reaction',{cardId:'wands_02',event:'initiative'});
      var rolled=g.DNDRules.rollD20('advantage',null,h,{kind:'check',stat:'dex'});var result={roll:rolled,bonus:bonus,total:rolled.result+bonus};
      var recorded=A.recordApplication(h,'wands_02',pending.operationId,h.predictorState.revision);if(!recorded.ok)error(recorded.reason);delete h.classFeaturesState.predictorReaction;h.tarotLastInitiative=copy(result);return result;
    }catch(e){restoreInPlace(h,snapshot);return null;}
  }
  HANDLERS.cups_13=HANDLERS.wands_02=HANDLERS.cups_05=HANDLERS.pentacles_14=function(){error('Реакция применяется только боевым событием.');};
  // A real executor is required per spell. The full Mage remains partial until
  // every first-level option is executable; absent world/event paths fail closed.
  var MAGE_CATALOG_AUDITED=false,MAGE_HANDLERS=Object.create(null),MAGE_LEVEL2=['beast-sense','find-steed'];
  function spellIdFromName(name){var m=/\(([^()]*)\)\s*$/.exec(name||'');return (m?m[1]:name||'').toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function mageOptions(){var seen=new Set();return (g.spellsLevel1||[]).filter(function(s){var id=spellIdFromName(s.name);if(Number(s.level)!==1||MAGE_LEVEL2.includes(id)||seen.has(id))return false;seen.add(id);return true;}).map(function(s){var id=spellIdFromName(s.name);return {id:id,name:s.name,implemented:!!MAGE_HANDLERS[id],castingTime:s.castingTime};});}
  function mageProgress(){var options=mageOptions();return {catalogueAudited:MAGE_CATALOG_AUDITED,total:options.length,implemented:options.filter(function(x){return x.implemented;}).length,pending:options.filter(function(x){return !x.implemented;}).map(function(x){return x.id;})};}
  function mageInfo(h){var pb=g.DNDRules?g.DNDRules.profBonus(h):2;return {attack:pb+cha(h),dc:8+pb+cha(h)};}
  function mageTarget(h,r,range,willing,requiresSight){var t=actor(h,r.targetId),p=token(h,h),q=token(h,t),field=h.initiativeTracker&&h.initiativeTracker.battlefield,reach=range===5&&g.DNDPredictorMovement&&p&&q&&field?g.DNDPredictorMovement.reach(field,p,q):distance(h,h,t);if(reach>range)error('Цель вне дальности заклинания.');var visible=requiresSight!==false?canSee(h,h,t):t===h||p&&q&&g.DNDBattleBoard&&g.DNDBattleBoard.lineOfSight(p,q,field).clear;if(!visible||t.dead||!Number.isFinite(hp(t)))error('Нужна допустимая живая цель и свободный путь заклинания.');if(willing&&t!==h&&r.mageWilling!==true)error('Для этого заклинания нужно согласие цели.');return t;}
  function mageSpellEffect(h,t,id,data,concentration){var tag='mage:'+id,entry=(g.spellsLevel1||[]).find(function(spell){return spellIdFromName(spell.name)===id.replace(/-check$/,'');});data=Object.assign({spellName:entry&&entry.name||id},data);if(concentration){var cast=h.concentration&&h.concentration.spellId;if(!cast||!String(cast).startsWith('mage:'))error('Концентрация заклинания не начата.');data=Object.assign({},data,{concentrationId:cast,ownerId:h.id});}put(t,tag,data);return tag;}
  function endSpellConcentration(h,castId){var scene=executionScene||sceneFor(h);if(!scene||!castId)return;actors(scene).forEach(function(t){t.tarotEffects=effects(t).filter(function(e){if(e.concentrationId===castId&&e.ownerId===h.id){expireEffect(t,e);return false;}return true;});});syncOwner(scene);}
  function mageTransaction(h,req,fn){var check=A.inspect(h);if(!check.ok)return check;if(!req||req.expectedRevision!==check.state.revision)return {ok:false,reason:'Профиль изменился.'};if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение ещё не подключено.'};var draft=copy(h),prior=executionScene;executionScene=draft;try{var result=fn(draft);draft.predictorState.revision++;syncOwner(draft);Object.assign(h,draft);return {ok:true,result:result};}catch(e){return {ok:false,reason:e.message};}finally{executionScene=prior;}}
  function retargetMageMark(h,req){return mageTransaction(h,req,function(draft){if(!['hex','hunters-mark'].includes(req.spellId))error('Выберите действующую метку.');var mark=effects(draft).find(function(e){return e.id==='mage:'+req.spellId&&active(draft,e);});if(!mark)error('Нет действующей концентрации на этой метке.');var old;try{old=actor(draft,mark.markedTargetId);}catch(_){}if(!mark.markedTargetDown&&(!old||hp(old)>0))error('Перенос доступен после падения прежней цели до 0 HP.');var t=mageTarget(draft,{targetId:req.targetId},90);if(t===draft||String(t.id)===String(mark.markedTargetId))error('Выберите другую цель.');payAction(draft,'bonus',{cardId:'major_01'});actors(draft).forEach(function(a){a.tarotEffects=effects(a).filter(function(e){return !(e.id==='mage:hex-check'&&e.concentrationId===mark.concentrationId&&e.ownerId===draft.id);});});mark.markedTargetId=t.id;mark.markedTargetDown=false;if(req.spellId==='hex')mageSpellEffect(draft,t,'hex-check',{seconds:mark.seconds,checkDisadvantageStat:mark.checkStat},true);hostileAction(draft);return {spellId:req.spellId,targetId:t.id};});}
  function wakeMageSleeper(h,req){return mageTransaction(h,req,function(draft){var waker=actor(draft,req.actorId||draft.id),t=actor(draft,req.targetId),current=draft.initiativeTracker&&draft.initiativeTracker.combatants[draft.initiativeTracker.activeIndex];if(current&&actor(draft,current.id)!==waker)error('Будит активный участник своего хода.');if(!effects(t).some(function(e){return active(t,e)&&e.sleepNoHeal;})||hp(t)<=0)error('Цель не находится под действием заклинания Сон.');var p=token(draft,waker),q=token(draft,t),field=draft.initiativeTracker&&draft.initiativeTracker.battlefield;if(waker===t||!p||!q||!g.DNDPredictorMovement||g.DNDPredictorMovement.reach(field,p,q)>5||!g.DNDBattleBoard.lineOfSight(p,q,field).clear)error('Для пробуждения нужно коснуться другого существа.');payAction(waker,'action',{cardId:'major_01'});clearCondition(t,'Бессознателен');return {wakerId:waker.id,targetId:t.id,woken:true};});}
  function checkMageTrack(h,req){return mageTransaction(h,req,function(draft){var mark=effects(draft).find(function(e){return e.id==='mage:hunters-mark'&&active(draft,e);});if(!mark||!['perception','survival'].includes(req.skillId))error('Для поиска нужна действующая Метка охотника и Восприятие/Выживание.');return g.DNDCombat.abilityCheck(draft,'wis',null,'normal',{skillId:req.skillId,targetId:mark.markedTargetId});});}
  function mageD20Bonus(h,kind){return effects(h).reduce(function(n,e){return n+(active(h,e)&&e.mageBless&&['attack','save'].includes(kind)?roll(1,4):0);},0);}
  function mageDamage(h,t,amount,type,spellId){hostileAction(h);return g.DNDCombat.applyDamage(t,amount,type,{source:'spell',spellId:spellId,magicalAttack:true,attacker:h,attackerId:h.id,tarotScene:h});}
  function mageAttack(h,t,formula,type,ranged){var result=g.DNDCombat.attack(h,t,{bonus:mageInfo(h).attack,damage:formula,damageType:type,useRules:false,spellAttack:true,magicalAttack:true,rangedAttack:ranged,meleeAttack:!ranged,attackKind:ranged?'rangedSpell':'meleeSpell',tarotScene:h});if(result.blocked||result.ok===false)error(result.reason||'Атака заклинанием недоступна.');return result;}
  function mageCondition(h,t,id,condition,data,concentration){var prior=!!Object.assign({},t.conditions,t.activeConditions)[condition];if(!conditions(t,condition))return false;mageSpellEffect(h,t,id,Object.assign({},data,{ownedCondition:prior?null:condition}),concentration);return true;}
  function mageArea(h,r,shape,range,centerRange){var field=encounter(h).battlefield,origin=token(h,h),board=g.DNDBattleBoard;if(!field||!origin||!board||!board.aoeContainsPoint)error('Для области заклинания нужны поле и геометрия.');var center=origin;
    if(centerRange!=null){var dest=r.destination;if(!dest||!Number.isInteger(dest.x)||!Number.isInteger(dest.y)||dest.x<0||dest.y<0||dest.x>=field.cols||dest.y>=field.rows)error('Выберите центр области на поле.');center={x:dest.x,y:dest.y,elevationFt:Number(origin.elevationFt)||0};if(Math.hypot(center.x-origin.x,center.y-origin.y)*field.cellFt>centerRange||!board.lineOfSight(origin,center,field).clear)error('Центр вне дальности или за полным укрытием.');}
    var dirs=[[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]],direction=dirs[Number(r.direction)-1];if(['cone','forward-cube'].includes(shape)&&!direction)error('Выберите направление области.');
    var list=actors(h).filter(function(t){var p=token(h,t);if(!p||t.dead||hp(t)<=0||centerRange==null&&t===h)return false;if(Math.abs((Number(p.elevationFt)||0)-(Number(center.elevationFt)||0))>range)return false;return board.aoeContainsPoint(shape,center,p,range,direction&&{x:direction[0],y:direction[1]},field)&&board.lineOfSight(center,p,field).clear;});return {actors:list,field:field,center:center};
  }
  function mageSave(h,t,stat,half){return g.DNDCombat.savingThrow(t,stat,mageInfo(h).dc,'normal',{fromSpell:true,halfDamageEffect:!!half,tarotScene:h});}
  function mageSavedDamage(h,t,amount,type,save,half,id){var final=save.success?(half?Math.floor(amount/2):0):amount;if(save.evasion||save.mettle)final=0;else if(save.evasionHalfOnFailure&&half)final=Math.floor(amount/2);return mageDamage(h,t,final,type,id);}
  MAGE_HANDLERS['inflict-wounds']=function(h,r){return {attack:mageAttack(h,mageTarget(h,r,5,false,false),'3d10','некротический',false)};};
  MAGE_HANDLERS['chromatic-orb']=function(h,r){if(!['кислота','холод','огонь','молния','яд','гром'].includes(r.mageDamageType))error('Выберите стихию Хроматического шара.');return {attack:mageAttack(h,mageTarget(h,r,90,false,false),'3d8',r.mageDamageType,true)};};
  MAGE_HANDLERS['ray-of-sickness']=function(h,r){var t=mageTarget(h,r,60,false,false),attack=mageAttack(h,t,'2d8','яд',true),save=null,poisoned=false;if(attack.hit){save=mageSave(h,t,'con',false);if(!save.success)poisoned=mageCondition(h,t,'ray-of-sickness','Отравлен',{untilOwnerEnd:h.id,delayOwnerEnd:true,deferClockInCombat:true,seconds:6},false);}return {attack:attack,save:save,poisoned:poisoned};};
  ['cure-wounds','healing-word'].forEach(function(id){MAGE_HANDLERS[id]=function(h,r){var t=mageTarget(h,r,id==='cure-wounds'?5:60,false,id!=='cure-wounds'),type=String(t.creatureType||'');if(/undead|нежит|construct|конструкт/i.test(type))error('Это заклинание не лечит нежить и конструктов.');var amount=roll(1,id==='cure-wounds'?8:4,h)+cha(h);return {healing:g.DNDCombat.heal(t,Math.max(0,amount),{tarotScene:h,caster:h,healingSpell:true,rangeFt:id==='cure-wounds'?5:60,requiresSight:id==='healing-word',excludeUndeadConstructs:true})};};});
  MAGE_HANDLERS['false-life']=function(h){var amount=roll(1,4,h)+4,tag='mage:false-life',grant=g.DNDCombat.grantTemporaryHitPoints(h,amount,{sourceId:tag});mageSpellEffect(h,h,'false-life',{seconds:3600,tempGrantSource:tag});return {temporaryHitPoints:grant};};
  MAGE_HANDLERS['magic-missile']=function(h,r){var ids=r.mageTargetIds&&r.mageTargetIds.length?r.mageTargetIds:[r.targetId||h.id];if(ids.length>3)error('У Магической стрелы три снаряда.');var targets=ids.map(function(id){return mageTarget(h,{targetId:id},120);});var amount=roll(1,4,h)+1,result=[];for(var i=0;i<3;i++){var t=targets[i%targets.length];if(effects(t).some(function(e){return active(t,e)&&e.blocksMagicMissile;}))result.push({targetId:t.id,blocked:true});else result.push({targetId:t.id,damage:mageDamage(h,t,amount,'сила','magic-missile')});}return {dartDamage:amount,darts:result};};
  MAGE_HANDLERS['ice-knife']=function(h,r){var t=mageTarget(h,r,60,false,false),point=token(h,t);if(!point)error('Нужна позиция цели для взрыва.');var list=actors(h).filter(function(a){return !a.dead&&hp(a)>0&&distance(h,t,a)<=5&&(!g.DNDBattleBoard||g.DNDBattleBoard.lineOfSight(point,token(h,a),h.initiativeTracker.battlefield).clear);});var attack=mageAttack(h,t,'1d10','колющий',true),amount=roll(2,6,h),hits=list.map(function(a){var save=mageSave(h,a,'dex',false);return {targetId:a.id,save:save,damage:mageSavedDamage(h,a,amount,'холод',save,false,'ice-knife')};});return {attack:attack,explosion:amount,targets:hits};};
  MAGE_HANDLERS['burning-hands']=function(h,r){var area=mageArea(h,r,'cone',15),amount=roll(3,6,h);return {damageRoll:amount,targets:area.actors.map(function(t){var save=mageSave(h,t,'dex',true);return {targetId:t.id,save:save,damage:mageSavedDamage(h,t,amount,'огонь',save,true,'burning-hands')};})};};
  function magePush(h,t,feet){var field=h.initiativeTracker.battlefield,p=token(h,t),source=token(h,h),M=g.DNDPredictorMovement;if(!M||!p||!source)error('Для отталкивания нужны поле и маршруты.');if(effects(t).some(function(e){return active(t,e)&&e.noForcedMovement;}))return {movedFt:0,immune:true};var dx=Math.sign(p.x-source.x),dy=Math.sign(p.y-source.y),dirs=[[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]],direction=dirs.findIndex(function(d){return d[0]===dx&&d[1]===dy;})+1;if(!direction)return {movedFt:0};var plan=M.ray(Object.assign({},field,{difficultTerrain:{}}),p,feet,direction);noteMove(t,p,plan.end);p.x=plan.end.x;p.y=plan.end.y;t.position=Object.assign({},t.position||{},{x:p.x,y:p.y});return {movedFt:plan.cost,path:plan.path};}
  MAGE_HANDLERS.thunderwave=function(h,r){var area=mageArea(h,r,'forward-cube',15);if(!g.DNDPredictorMovement)error('Движок отталкивания недоступен.');var amount=roll(2,8,h);return {damageRoll:amount,targets:area.actors.map(function(t){var save=mageSave(h,t,'con',true),damage=mageSavedDamage(h,t,amount,'гром',save,true,'thunderwave');return {targetId:t.id,save:save,damage:damage,push:save.success?null:magePush(h,t,10)};})};};
  MAGE_HANDLERS['earth-tremor']=function(h,r){var area=mageArea(h,r,'circle',10),ground=Number(token(h,h).elevationFt)||0,amount=roll(1,6,h);if(!['earth','stone','other'].includes(r.mageGround))error('Укажите тип поверхности Земляного толчка.');var results=area.actors.filter(function(t){return (Number(token(h,t).elevationFt)||0)===ground;}).map(function(t){var save=mageSave(h,t,'dex',false),dmg=mageSavedDamage(h,t,amount,'дробящий',save,false,'earth-tremor');if(!save.success)conditions(t,'Сбит с ног');return {targetId:t.id,save:save,damage:dmg};});if(r.mageGround!=='other'){area.field.difficultTerrain=area.field.difficultTerrain||{};for(var y=0;y<area.field.rows;y++)for(var x=0;x<area.field.cols;x++)if(g.DNDBattleBoard.aoeContainsPoint('circle',area.center,{x:x,y:y},10,null,area.field))area.field.difficultTerrain[x+':'+y]=true;}return {damageRoll:amount,targets:results,difficultTerrain:r.mageGround!=='other'};};
  MAGE_HANDLERS.longstrider=function(h,r){var t=mageTarget(h,r,5,true,false);mageSpellEffect(h,t,'longstrider',{seconds:3600,speedBonus:10});return {targetId:t.id,speedBonus:10};};
  MAGE_HANDLERS.sanctuary=function(h,r){var t=mageTarget(h,r,30,true,false);mageSpellEffect(h,t,'sanctuary',{seconds:60,guardDC:mageInfo(h).dc,endsOnHostile:true});return {targetId:t.id,guardDC:mageInfo(h).dc};};
  MAGE_HANDLERS['shield-of-faith']=function(h,r){var t=mageTarget(h,r,60,true,false);mageSpellEffect(h,t,'shield-of-faith',{seconds:600,ac:2},true);return {targetId:t.id,ac:2};};
  MAGE_HANDLERS['divine-favor']=function(h){mageSpellEffect(h,h,'divine-favor',{seconds:60,typedDice:'1d4',damageType:'излучение',weaponOnly:true},true);return {weaponBonus:'1d4'};};
  MAGE_HANDLERS.heroism=function(h,r){var t=mageTarget(h,r,5,true,false);clearCondition(t,'Испуган');t.tarotEffects=effects(t).filter(function(e){return !e.fearSourceId&&!(e.repeatSave&&(e.repeatCondition||'Испуган')==='Испуган');});mageSpellEffect(h,t,'heroism',{seconds:60,immuneConditions:['Испуган'],tempEachStart:Math.max(0,cha(h))},true);return {targetId:t.id,temporaryHitPointsEachStart:Math.max(0,cha(h))};};
  ['hex','hunters-mark'].forEach(function(id){MAGE_HANDLERS[id]=function(h,r){var t=mageTarget(h,r,90);if(t===h)error('Выберите другую цель метки.');if(id==='hex'&&!['str','dex','con','int','wis','cha'].includes(r.mageStat))error('Выберите характеристику помехи Проклятия.');mageSpellEffect(h,h,id,{seconds:3600,typedDice:'1d6',damageType:id==='hex'?'некротический':null,weaponOnly:id==='hunters-mark',markedTargetId:t.id,checkStat:r.mageStat,markedHunt:id==='hunters-mark'},true);hostileAction(h);if(id==='hex')mageSpellEffect(h,t,'hex-check',{seconds:3600,checkDisadvantageStat:r.mageStat},true);return {targetId:t.id,extraDice:'1d6',checkStat:id==='hex'?r.mageStat:null};};});
  MAGE_HANDLERS.bless=function(h,r){var ids=r.mageTargetIds&&r.mageTargetIds.length?r.mageTargetIds:[r.targetId||h.id];if(ids.length>3||new Set(ids).size!==ids.length)error('Благословение выбирает до трёх разных целей.');var targets=ids.map(function(id){return mageTarget(h,{targetId:id,mageWilling:r.mageWilling},30,true,false);});targets.forEach(function(t){mageSpellEffect(h,t,'bless',{seconds:60,mageBless:true},true);});return {targetIds:ids,bonus:'1d4'};};
  MAGE_HANDLERS.sleep=function(h,r){var area=mageArea(h,r,'circle',20,90),pool=roll(5,8,h),remaining=pool,affected=[];area.actors.sort(function(a,b){return hp(a)-hp(b)||String(a.id).localeCompare(String(b.id));}).forEach(function(t){var type=String(t.creatureType||''),cond=Object.assign({},t.conditions,t.activeConditions),immune=t.magicSleepImmune||/undead|нежит/i.test(type)||/elf|эльф/i.test(String(t.race&&t.race.name||t.race||''))||(Array.isArray(t.conditionImmunities)?t.conditionImmunities:String(t.conditionImmunities||'').split(/[,;]/)).some(function(key){return g.DNDRules.normalizeConditionName(key)==='Очарован'||/^charmed$/i.test(String(key).trim());})||immuneCondition(t,'Очарован');if(immune||cond['Бессознателен']||hp(t)>remaining)return;if(mageCondition(h,t,'sleep','Бессознателен',{seconds:60,sleep:true,sleepNoHeal:true,healingAmount:0},false)){remaining-=hp(t);affected.push(t.id);}});return {hitPointPool:pool,remaining:remaining,targetIds:affected};};
  MAGE_HANDLERS['color-spray']=function(h,r){var area=mageArea(h,r,'cone',15),pool=roll(6,10,h),remaining=pool,affected=[];area.actors.sort(function(a,b){return hp(a)-hp(b)||String(a.id).localeCompare(String(b.id));}).forEach(function(t){var cond=Object.assign({},t.conditions,t.activeConditions);if(cond['Бессознателен']||cond['Ослеплён']||hp(t)>remaining)return;if(mageCondition(h,t,'color-spray','Ослеплён',{seconds:6,blinded:true,untilOwnerEnd:h.id,delayOwnerEnd:true,deferClockInCombat:true},false)){remaining-=hp(t);affected.push(t.id);}});return {hitPointPool:pool,remaining:remaining,targetIds:affected};};
  HANDLERS.major_01=function(h,r){var option=mageOptions().find(function(x){return x.id===r.mageSpellId;});if(!option)error('Выберите настоящее заклинание 1-го уровня из каталога.');if(!option.implemented)error('Исполнитель этого заклинания ещё разрабатывается; карта и ресурс не потрачены.');var spell=(g.spellsLevel1||[]).find(function(x){return spellIdFromName(x.name)===option.id;}),can=canCast(h,{damage:spell.damage,components:{}});if(!can.ok)error(can.error);if(spell.concentration){g.DNDCombat.beginConcentration(h,{id:'mage:'+r.operationId,name:spell.name,concentration:true});var duration=String(spell.duration||''),number=Number((/\d+/.exec(duration)||[])[0]||1);h.concentration.mageSeconds=number*(/час/i.test(duration)?3600:/мин/i.test(duration)?60:6);}var result=MAGE_HANDLERS[option.id](h,r);h.classFeaturesState=h.classFeaturesState||{};h.classFeaturesState.predictorMageResult={operationId:r.operationId,spellId:option.id,spellName:option.name,result:copy(result)};return {spellId:option.id,spellName:option.name,result:result};};
  // Pure groundwork for the Devil controller. This is a ranked plan, not a
  // substitute for enforcing a turn or spending a slot/action.
  function devilDamageMaximum(formula){
    if(typeof formula!=='string'&&typeof formula!=='number')return null;var text=String(formula).toLowerCase().replace(/[кk]/g,'d').replace(/\s+/g,'');if(!/^[+-]?(?:\d*d\d+|\d+)(?:[+-](?:\d*d\d+|\d+))*$/.test(text))return null;
    var normal=0,critical=0,dice=0,terms=text.match(/[+-]?(?:\d*d\d+|\d+)/g)||[];for(var term of terms){var sign=term[0]==='-'?-1:1,raw=term.replace(/^[+-]/,''),match=/^(\d*)d(\d+)$/.exec(raw);if(match){var count=Number(match[1]||1),sides=Number(match[2]);if(!Number.isInteger(count)||count<1||count>100||!Number.isInteger(sides)||sides<1||sides>10000)return null;var value=count*(sign>0?sides:1)*sign;normal+=value;critical+=value*2;dice+=count;}else{var flat=Number(raw)*sign;if(!Number.isSafeInteger(flat)||Math.abs(flat)>1000000)return null;normal+=flat;critical+=flat;}}return {normal:Math.max(0,normal),critical:Math.max(0,critical),diceCount:dice};
  }
  function devilPlan(h){try{
    var list=actors(h).filter(function(t){return t!==h&&!t.dead&&hp(t)>0;});if(!list.length)error('Нет другого живого существа для ближайшей цели.');var distances=list.map(function(t){return {actor:t,distance:distance(h,h,t)};});distances.sort(function(a,b){return a.distance-b.distance||String(a.actor.id).localeCompare(String(b.actor.id));});var nearest=distances[0],ranked=[],blocked=[],stats=g.DNDRules.getStats(h),pb=g.DNDRules.profBonus(h);
    function add(entry){var max=devilDamageMaximum(entry.formula);if(!max){blocked.push({id:entry.id,name:entry.name,reason:'Формула не является точным выражением костей; слабая замена не выбрана.'});return;}entry.normalMaximum=max.normal*entry.attacks;entry.criticalMaximum=(entry.attackRoll?max.critical:max.normal)*entry.attacks;entry.maximum=entry.criticalMaximum;ranked.push(entry);}
    (h.inventory&&h.inventory.weapons||[]).forEach(function(w,i){if(!w||!w.equipped||Number(w.count==null?1:w.count)<=0)return;var props=Array.isArray(w.properties)?w.properties.join(' '):String(w.properties||''),ranged=w.typeKey==='ranged'||/дальнобойн|ranged/i.test(w.category||''),finesse=/фехтов|finesse/i.test(props)||w.properties&&w.properties.finesse,ability=ranged?'dex':finesse&&stats.dex>stats.str?'dex':'str',modifier=Math.floor((stats[ability]-10)/2),range=ranged?Number(w.rangeFt)||Number((/дистанция\s*(\d+)/i.exec(props)||[])[1]):Number(w.reachFt)||(/досягаем|reach/i.test(props)?10:5);
      if(ranged&&/боеприпас|ammunition/i.test(props)){if(w.ammo===0)return;if(!Number.isFinite(w.ammo)||w.ammo<0){blocked.push({id:'weapon:'+i,name:w.name,reason:'Остаток боеприпасов не подтверждён.'});return;}}
      if(!Number.isFinite(range)||range<=0){blocked.push({id:'weapon:'+i,name:w.name,reason:'Неизвестна дальность.'});return;}if(nearest.distance>range)return;
      var base=devilDamageMaximum(w.damage);if(!base){blocked.push({id:'weapon:'+i,name:w.name,reason:'Неизвестная формула оружия.'});return;}var bonus=Number(w.damageBonus||w.extraDamage||0);if(!Number.isFinite(bonus)){blocked.push({id:'weapon:'+i,name:w.name,reason:'Неизвестный бонус урона.'});return;}
      add({id:'weapon:'+i,name:w.name,kind:'weapon',formula:String(w.damage)+(modifier+bonus>=0?'+':'')+(modifier+bonus),attackRoll:true,attacks:1,attackBonus:modifier+(w.proficient===false?0:pb)+(Number(w.toHit||w.extraAtk)||0),rangeFt:range,damageType:w.damageType||'',classModifiersPending:true});
    });
    (h.actions||[]).forEach(function(a,i){if(!a||a.action==='bonus'||a.action==='reaction'||a.available===false||Number(a.remaining)===0)return;var range=Number(a.rangeFt);if(!Number.isFinite(range)||range<0){if(a.damage)blocked.push({id:'action:'+i,name:a.name,reason:'Неизвестна дальность действия.'});return;}if(nearest.distance>range)return;var attacks=a.attacks==null?1:Number(a.attacks);if(!Number.isInteger(attacks)||attacks<1||attacks>20){blocked.push({id:'action:'+i,name:a.name,reason:'Неизвестно число атак.'});return;}add({id:'action:'+i,name:a.name,kind:'action',formula:a.damage,attackRoll:a.attackBonus!=null,attacks:attacks,rangeFt:range,damageType:a.damageType||''});});
    (h.spellsData||[]).forEach(function(spell,i){var level=Number(spell.level),id=spellIdFromName(spell.name),catalog=(g.spellsLevel1||[]).find(function(x){return spellIdFromName(x.name)===id;}),damage=spell.damage||spell.damageDice||catalog&&catalog.damage;if(!damage||/исцел|времен|бонус/i.test(spell.damageType||catalog&&catalog.damageType||''))return;if(level!==1){blocked.push({id:'spell:'+i,name:spell.name,reason:'Нужен исполнитель и масштабирование этого уровня заклинания.'});return;}var slots=h.spellSlotsData&&h.spellSlotsData[1],pact=h.pactMagicData;if(!(slots&&Number(slots.max)>Number(slots.used||0))&&!(pact&&Number(pact.slotLevel)===1&&Number(pact.max)>Number(pact.used||0)))return;if(spell.prepared===false&&/волшебник|жрец|друид|паладин|изобретатель/i.test(spell.castingClass||''))return;
      var range=Number(spell.rangeFt)||Number((/(\d+)\s*фут/i.exec(catalog&&catalog.range||'')||[])[1]);if(/касание/i.test(catalog&&catalog.range||''))range=5;if(!Number.isFinite(range)||range<nearest.distance){if(!Number.isFinite(range))blocked.push({id:'spell:'+i,name:spell.name,reason:'Нужна явная дальность или область заклинания.'});return;}var maximum=devilDamageMaximum(damage);if(!maximum){blocked.push({id:'spell:'+i,name:spell.name,reason:'Составной/неизвестный урон требует отдельного исполнителя.'});return;}add({id:'spell:'+i,name:spell.name,kind:'spell',formula:damage,attackRoll:!!(spell.attackType||catalog&&catalog.attackType),attacks:1,rangeFt:range,damageType:spell.damageType||catalog&&catalog.damageType||'',sourceExecutionPending:true});
    });
    ranked.sort(function(a,b){return b.maximum-a.maximum||String(a.id).localeCompare(String(b.id));});return {ok:true,targetId:nearest.actor.id,distanceFt:nearest.distance,candidates:ranked,blockedSources:blocked,maximumCandidate:ranked[0]||null,forcedExecutionReady:false,scope:'declared-damage-plan-only',includesPossibleCritical:true};
  }catch(e){return {ok:false,reason:e.message};}}
  function definition(id){var d=DEFS[id];return d?Object.assign({},d,{implemented:id==='major_01'?MAGE_CATALOG_AUDITED&&mageProgress().total>0&&mageProgress().implemented===mageProgress().total:!!HANDLERS[id],partial:id==='major_01',runnable:!!HANDLERS[id]}):null;}
  function play(h,cardId,req){
    req=req||{};var check=A.inspect(h),def=DEFS[cardId];if(!check.ok)return check;if(!def)return {ok:false,reason:'Неизвестная карта.'};if(!HANDLERS[cardId])return {ok:false,reason:'Для этой карты ещё не подключён полный обработчик: '+def.name};if(def.action==='reaction')return {ok:false,reason:'Сначала подготовьте реакцию: она сработает на настоящее событие.'};
    if(req.expectedRevision!==check.state.revision)return {ok:false,reason:'Профиль изменился; обновите экран.'};if(!g.DNDCombat)return {ok:false,reason:'Боевой обработчик недоступен.'};
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.connected)return {ok:false,reason:'Приватное сетевое исполнение пока не подключено.'};
    if(typeof req.operationId!=='string'||!req.operationId)return {ok:false,reason:'Нужен ID применения.'};
    var draft=copy(h),previousScene=executionScene;executionScene=draft;try{
      var s=draft.predictorState,blind=s.blind&&s.blind.card===cardId&&s.blind.operationId===req.operationId;
      if(s.blind&&!blind)error('Сначала примените обязательную слепую карту.');if(s.applications.some(function(x){return x.id===req.operationId;}))error('Это применение уже учтено.');if(cardId.startsWith('major_')&&(lvl(draft)<A.rules.unlockSchedule[cardId]||check.majorCurrent<1))error('Старшая недоступна по уровню или ресурсу.');if(!blind&&!s.hand.includes(cardId))error('Карты нет в руке.');if(s.offer)error('Сначала завершите открытый выбор.');
      if(['major_11','major_13','major_16','major_20','swords_05','swords_10','cups_02','wands_04','wands_14'].includes(cardId)&&peaceBlocked(draft,draft))error('Аура покоя запрещает враждебную карту.');
      payAction(draft,def.action,Object.assign({},req,{cardId:cardId}));var result=HANDLERS[cardId](draft,req);
      var recorded=A.recordApplication(draft,cardId,req.operationId,draft.predictorState.revision,{ownTurnId:draft.predictorState.trickster&&draft.predictorState.trickster.ownTurnId});if(!recorded.ok)error(recorded.reason);
      // Combatant copies of the owner cannot retain stale HP/state after commit.
      syncOwner(draft);
      Object.assign(h,draft);return {ok:true,result:result,revision:h.predictorState.revision};
    }catch(e){return {ok:false,reason:e.message};}finally{executionScene=previousScene;}
  }
  function modifyStats(h,stats){
    var out=Object.assign({},stats);
    effects(h).filter(function(e){return active(h,e);}).forEach(function(e){Object.keys(e.abilityChanges||{}).forEach(function(key){var value=Number(out[key])||10,delta=e.abilityChanges[key],next=value+delta;if(delta>0&&e.abilityMax&&e.abilityMax[key]!=null)next=Math.max(value,Math.min(e.abilityMax[key],next));if(delta<0&&e.abilityMin&&e.abilityMin[key]!=null)next=Math.min(value,Math.max(e.abilityMin[key],next));out[key]=next;});});
    effects(h).forEach(function(e){if(active(h,e)&&e.strengthFloor)out.str=Math.max(Number(out.str)||10,e.strengthFloor);});return out;
  }
  function d20Modifiers(h,kind,ctx){var out={advantage:false,disadvantage:false};ctx=ctx||{};if(h&&h.tarotInspirationReady&&['attack','check','save'].includes(kind))out.advantage=true;if(g.DNDRules&&g.DNDRules.getExhaustion&&(g.DNDRules.getExhaustion(h)>=3||kind==='check'&&g.DNDRules.getExhaustion(h)>=1))out.disadvantage=true;
    effects(h).forEach(function(e){
    if(!active(h,e))return;
    if(['attack','check','save'].includes(kind)&&e.fortuneMode)out[e.fortuneMode]=true;
    if((kind==='check'||kind==='save')&&ctx.stat==='str'&&e.strengthAdvantage)out.advantage=true;
    if(kind==='check'&&ctx.tool&&e.toolMastery)out.advantage=true;if(kind==='check'&&ctx.stat===e.checkDisadvantageStat)out.disadvantage=true;if(kind==='check'&&e.markedHunt&&String(ctx.targetId)===String(e.markedTargetId)&&['perception','survival'].includes(ctx.skillId))out.advantage=true;
  });return out;}
  function noteD20Roll(h,kind){var revealed=null;if(h&&h.tarotInspirationReady&&['attack','check','save'].includes(kind)){h.tarotInspirationReady=false;h.inspiration=false;}effects(h).forEach(function(e){if(active(h,e)&&e.fortuneMode&&['attack','check','save'].includes(kind)){e.fortuneRevealed=true;revealed=e.fortuneMode;}});syncOwner(h);return revealed;}
  function checkModifiers(h,ctx){var out=d20Modifiers(h,'check',ctx);out.bonus=0;if(ctx&&ctx.tool&&!ctx.proficient&&effects(h).some(function(e){return active(h,e)&&e.toolMastery;})){out.bonus=g.DNDRules?g.DNDRules.profBonus(h):2;out.fullProficiencyBonus=true;}return out;}
  function attackModifiers(h,ctx){var out=Object.assign({typedExtraDice:[],bonusAttack:teamBonus(h,ctx),doubleDamage:highGround(h,ctx&&ctx.target,ctx)},d20Modifiers(h,'attack',ctx));if(sunBlinded(sceneFor(h,ctx),h)&&!(ctx&&ctx.target&&canSee(sceneFor(h,ctx),h,ctx.target)))out.disadvantage=true;if(bondNear(sceneFor(h,ctx),h))out.advantage=true;if(effects(h).length&&g.DNDRules){var cm=g.DNDRules.conditionModifiers(h);if(cm.advantage)out.advantage=true;if(cm.disadvantage)out.disadvantage=true;}effects(h).forEach(function(e){if(!active(h,e))return;if(ctx&&ctx.opportunityAttack&&e.opportunityAdvantage)out.advantage=true;if(e.attackDisadvantage||e.blinded||e.blindBeyond&&!(ctx&&ctx.target&&canSee(sceneFor(h,ctx),h,ctx.target)))out.disadvantage=true;if(e.forceCritical)out.forceCritical=true;if(e.maximizeAttack)out.maximizeDamageDice=true;if(e.ignoreCover)out.ignoreCover=true;if(e.typedDice&&(!e.weaponOnly||(ctx.weaponAttack||ctx.weapon))&&(!e.markedTargetId||ctx.target&&(String(ctx.target.id)===String(e.markedTargetId)||String(ctx.target.characterId)===String(e.markedTargetId))))out.typedExtraDice.push({dice:e.typedDice,type:e.damageType||ctx.damageType||''});});return out;}
  function afterAttack(h,result){h.tarotEffects=effects(h).filter(function(e){return !(e.consumeOn==='attack'||e.consumeOn==='hit'&&result.hit);});syncOwner(h);}
  function hostileAction(h){
    var ended=effects(h).filter(function(e){return e.endsOnHostile;});if(!ended.length)return;
    h.tarotEffects=effects(h).filter(function(e){return !e.endsOnHostile;});
    ended.forEach(function(e){if(e.concentration&&h.concentration&&h.concentration.spellId==='tarot:'+e.id)g.DNDCombat.breakConcentration(h);});syncOwner(h);
  }
  function beforeAttack(attacker,target,opts){
    if(attacker&&target&&attacker!==target)noteAffect(target,opts);
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
  function onCondition(h,key,on){syncTarotEntity(h);if(!on&&key==='Очарован')h.tarotEffects=effects(h).filter(function(e){return !e.charmSourceId;});if(!on){h.tarotEffects=effects(h).filter(function(e){return !(String(e.id).startsWith('mage:')&&e.ownedCondition===key);});syncOwner(h);}}
  function active(h,e){if(e.ending)return false;if(e.concentrationId){var source;try{source=actor(executionScene||sceneFor(h),e.ownerId);}catch(_){return false;}if(!source.concentration||!source.concentration.active||source.concentration.spellId!==e.concentrationId)return false;}if(e.charmSourceId&&!Object.assign({},h.conditions,h.activeConditions)['Очарован'])return false;if(e.repeatSave&&!Object.assign({},h.conditions,h.activeConditions)[e.repeatCondition||'Испуган'])return false;return !e.concentration||h.concentration&&h.concentration.active&&h.concentration.spellId==='tarot:'+e.id;}
  function asleep(h){return effects(h).some(function(e){return active(h,e)&&e.sleep;});}
  function immune(h,type){return effects(h).some(function(e){return active(h,e)&&(e.immuneAll||Array.isArray(e.immune)&&e.immune.includes(type));});}
  function resistant(h,type){return effects(h).some(function(e){return active(h,e)&&Array.isArray(e.resist)&&e.resist.includes(type);});}
  function ignoresResistance(h,type,ctx){return !!(ctx&&ctx.weaponAttack&&['дробящий','колющий','рубящий','bludgeoning','piercing','slashing'].includes(type)&&effects(h).some(function(e){return active(h,e)&&e.ignorePhysicalResistance;}));}
  function immuneCondition(h,condition){return effects(h).some(function(e){return active(h,e)&&Array.isArray(e.immuneConditions)&&e.immuneConditions.includes(condition);});}
  function speedMultiplier(h){var base=Number(h&&h.speed)||30,extra=effects(h).reduce(function(n,e){return n+(active(h,e)?Number(e.speedBonus)||0:0);},0),ex=g.DNDRules&&g.DNDRules.getExhaustion?g.DNDRules.getExhaustion(h):0;return effects(h).reduce(function(n,e){return active(h,e)&&e.speedMultiplier!=null?n*e.speedMultiplier:n;},ex>=5?0:(ex>=2?0.5:1)*(base+extra)/base);}
  function blocked(h,kind,ctx){if(kind!=='reaction'&&standPaused(h,ctx)&&['action','bonus','movement','attack','spell','check'].includes(kind))return true;if(timeFrozen(h)&&['action','bonus','reaction','movement','attack','spell','check'].includes(kind))return true;return effects(h).some(function(e){return active(h,e)&&(e.sleep&&['action','bonus','reaction','movement','check','attack','spell'].includes(kind)||e.noActions&&(kind==='action'||kind==='bonus')||e.noMainAction&&kind==='action'||e.noReactions&&kind==='reaction'||e.noMovement&&kind==='movement'||e.noHide&&kind==='hide'||e.noDisengage&&kind==='disengage'||e.noHelp&&kind==='help'||e.noTransfer&&kind==='transfer'||e.noAttacks&&kind==='attack'||e.noSpells&&kind==='spell');});}
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
    if(!event||event.damageTaken<=0)return;var scene=executionScene||sceneFor(h,event);if(scene&&hp(h)<=0)actors(scene).forEach(function(caster){effects(caster).forEach(function(e){if(e.markedTargetId&&(String(e.markedTargetId)===String(h.id)||String(e.markedTargetId)===String(h.characterId)))e.markedTargetDown=true;});});
    var ended=effects(h).filter(function(e){return e.sleep;});h.tarotEffects=effects(h).filter(function(e){return !e.sleep;});
    ended.forEach(function(e){e.lethalWake=!!event.instantDeath||Number.isFinite(event.previousHp)&&event.hpDamage-event.previousHp>=maxHp(h);expireEffect(h,e);if(e.sleepNoHeal&&hp(h)<=0&&!lastStandActive(h))conditions(h,'Бессознателен');});syncOwner(h);
  }
  function turnStart(h,turnId,resetResources){
    var interrupt=lastStandFrame(h);if(interrupt&&interrupt.active&&turnId!==interrupt.id){activateLastStand(h);return {ok:false,reason:'Внеочередной ход уже начат; завершите его отдельно.'};}if(timeFrozen(h)||standPaused(h))return {ok:false,reason:'Сначала завершите внеочередной ход.'};
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
    effects(h).forEach(function(e){if(active(h,e)&&e.tempEachStart!=null){g.DNDCombat.grantTemporaryHitPoints(h,e.tempEachStart,{sourceId:e.concentrationId});e.tempGrantSource=e.concentrationId;}});
    if(turnId)h.tarotLastStartedTurn=turnId;syncOwner(h);return {ok:true};
  }
  // Called for an encounter participant whose own start differs from the
  // Predictor's. Owner-target auras still expire on the Predictor's start.
  function participantTurnStart(h,id,turnId){var t=actor(h,id);return turnStart(t,turnId,true);}
  function combatEnd(h){var interrupted=lastStandFrame(h);if(interrupted){h.turnResources=copy(interrupted.pool||{});if(hp(h)<=0){conditions(h,'Бессознателен');h.defeated=true;h.turnResources.reaction=0;g.DNDCombat.breakConcentration(h);}delete h.classFeaturesState.predictorLastStand;}if(h.classFeaturesState)delete h.classFeaturesState.predictorReaction;if(h.initiativeTracker)delete h.initiativeTracker.tarotDamageTotals;actors(h).forEach(function(t){t.tarotEffects=effects(t).filter(function(e){if(e.combatOnly||e.untilOwnStart||e.untilOwnerStart||e.untilOwnEnd||e.untilOwnerEnd||e.untilOwnEndAfterNext){expireEffect(t,e);return false;}return true;});delete t.tarotLastStartedTurn;});syncOwner(h);}
  function turnEnd(h){actors(h).forEach(function(t){t.tarotEffects=effects(t).filter(function(e){if(t===h&&e.repeatSave){var repeating=!!Object.assign({},h.conditions,h.activeConditions)[e.repeatCondition||'Испуган'];if(!repeating||g.DNDCombat.savingThrow(h,e.repeatSave,e.saveDC).success){expireEffect(h,e);return false;}}if(t===h&&e.restrictionUntilOwnEnd){delete e.noHide;delete e.noDisengage;delete e.restrictionUntilOwnEnd;}if(e.untilOwnerEnd===h.id&&e.delayOwnerEnd){delete e.delayOwnerEnd;return true;}if(e.untilOwnerEnd===h.id||t===h&&(e.untilOwnEnd||e.untilOwnEndAfterNext&&e.startedNext)){expireEffect(t,e);return false;}return true;});});syncOwner(h);}
  function advanceTime(h,seconds,context){if(!Number.isFinite(seconds)||seconds<0)return {ok:false};actors(h).forEach(function(t){if(t.concentration&&t.concentration.active&&String(t.concentration.spellId).startsWith('mage:')&&Number.isFinite(t.concentration.mageSeconds)){t.concentration.mageSeconds-=seconds;if(t.concentration.mageSeconds<=0)g.DNDCombat.breakConcentration(t);}advanceInventory(t,seconds);t.tarotEffects=effects(t).filter(function(e){if(e.seconds!=null&&!(context&&context.round&&(e.sleep&&!e.sleepNoHeal||e.untilOwnStart||e.deferClockInCombat))){e.seconds-=seconds;if(e.seconds<=0){expireEffect(t,e);if(e.concentration&&t.concentration&&t.concentration.spellId==='tarot:'+e.id)g.DNDCombat.breakConcentration(t);return false;}}return true;});});syncOwner(h);return {ok:true};}
  function longRestEffects(h){advanceTime(h,28800);combatEnd(h);actors(h).forEach(function(t){if(t.concentration&&String(t.concentration.spellId||'').startsWith('tarot:'))g.DNDCombat.breakConcentration(t);});syncOwner(h);}
  g.DNDPredictorCards={wakeMageSleeper:wakeMageSleeper,devilDamageMaximum:devilDamageMaximum,devilPlan:devilPlan,retargetMageMark:retargetMageMark,checkMageTrack:checkMageTrack,mageOptions:mageOptions,mageProgress:mageProgress,mageInfo:mageInfo,mageD20Bonus:mageD20Bonus,endSpellConcentration:endSpellConcentration,wagerStartCheck:wagerStartCheck,executionActor:executionActor,lastStandActive:lastStandActive,beginLastStand:beginLastStand,activateLastStand:activateLastStand,finishLastStand:finishLastStand,queueLastStandAttacks:queueLastStandAttacks,interceptHealing:interceptHealing,resolveHealingEvent:resolveHealingEvent,interceptInitiative:interceptInitiative,timeFrozen:timeFrozen,noteAffect:noteAffect,cannotLie:cannotLie,deceptionBlocked:deceptionBlocked,syncTarotEntity:syncTarotEntity,canAncestorAttack:canAncestorAttack,spendCoin:spendCoin,armReaction:armReaction,cancelReaction:cancelReaction,interceptAttack:interceptAttack,interceptSave:interceptSave,hasInventoryEffects:hasInventoryEffects,inventoryEntries:inventoryEntries,creationOptions:creationOptions,claimReward:claimReward,moveReward:moveReward,definitions:DEFS,definition:definition,play:play,consumeMaximum:consumeMaximum,onCondition:onCondition,canCast:canCast,canSee:canSee,attackSight:attackSight,revealedSight:revealedSight,shareDamage:shareDamage,recordDamage:recordDamage,peaceBlocked:peaceBlocked,sceneFrom:sceneFrom,setElevation:setElevation,noteMove:noteMove,prepareInspiration:prepareInspiration,setCeiling:setCeiling,modifyStats:modifyStats,d20Modifiers:d20Modifiers,noteD20Roll:noteD20Roll,checkModifiers:checkModifiers,attackModifiers:attackModifiers,afterAttack:afterAttack,afterDamage:afterDamage,incoming:incoming,asleep:asleep,immune:immune,resistant:resistant,ignoresResistance:ignoresResistance,immuneCondition:immuneCondition,speedMultiplier:speedMultiplier,blocked:blocked,canMove:canMove,beforeAttack:beforeAttack,preventsOpportunity:preventsOpportunity,opportunityAttack:opportunityAttack,hostileAction:hostileAction,roundStart:roundStart,spendReaction:spendReaction,turnStart:turnStart,participantTurnStart:participantTurnStart,combatEnd:combatEnd,turnEnd:turnEnd,advanceTime:advanceTime,longRestEffects:longRestEffects};
})(window);
