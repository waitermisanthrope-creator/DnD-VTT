/**
 * network_gameplay.js — authoritative gameplay v9 для сетевой D&D-партии.
 *
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Игровой RPC-слой поверх network_engine.js. Игрок отправляет намерение (атака,
 * заклинание, конец хода, death save), а мастер единолично проверяет право на ход,
 * ресурсы действия и spell slots, бросает кубики и меняет authoritative combat state.
 * Мастерские действия (прямой урон, лечение, состояния) не принимаются от клиента.
 *
 * КАК РАБОТАЕТ:
 * - каждый combatant-герой имеет ownerPeerId/characterId и turnResources;
 * - на начале хода выдаются Action + Bonus Action + Reaction + Movement;
 * - атака/заклинание расходуют соответствующий ресурс;
 * - spell slots и Pact Magic расходуются на серверной копии профиля игрока;
 * - concentration хранится у combatant и при получении урона запускает CON save;
 * - reconnect сопоставляется по persistent clientId/characterId и возвращает ownerPeerId;
 * - после каждой принятой операции мастер создаёт COMBAT_CHANGED event.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * action, peer, profile, initiativeTracker, combatants, turnResources,
 * spellSlotsData, pactMagicData, concentration, eventSeq.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 */
(function(global){
  'use strict';
  var CONDITIONS=(global.DNDCombat&&global.DNDCombat.CONDITIONS)||['Ослеплён','Очарован','Оглушён','Испуган','Захвачен','Недееспособен','Невидим','Парализован','Окаменел','Отравлен','Сбит с ног','Истощение','Опутан'];
  var pendingReactions={};
  function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(e){return null;}}
  function hero(){return global.currentChar||global.currentCharacter||null;}
  function num(v,d){var n=Number(v);return isFinite(n)?n:(d||0);}
  function combat(){var h=hero();return h&&h.initiativeTracker&&Array.isArray(h.initiativeTracker.combatants)?h.initiativeTracker:null;}
  function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();}
  function syncCombatantToProfile(c,p){
    if(!c||!p)return false;
    p.characterId=p.characterId||c.characterId||p.id||'';
    p.hpCurrent=num(c.hp); p.hpMax=num(c.maxHp,p.hpMax);
    if(p.hp&&typeof p.hp==='object'){p.hp.current=p.hpCurrent;p.hp.max=p.hpMax;}
    p.hitPoints=p.hpCurrent;p.maxHitPoints=p.hpMax;
    p.defeated=!!c.defeated;
    p.deathSaves=clone(c.deathSaves)||{successes:0,failures:0};
    p.activeConditions=clone(c.conditions||c.activeConditions)||{};
    if(c.concentration)p.concentration=clone(c.concentration);
    p.turnResources=clone(c.turnResources)||p.turnResources||{};
    if(c.ac!=null)p.ac=Number(c.ac)||p.ac;
    return true;
  }
  function syncAllCombatProfiles(){
    var t=combat();if(!t||!global.dndNetwork||typeof global.dndNetwork.getPeer!=='function')return;
    (t.combatants||[]).forEach(function(c){if(!c||!c.characterId)return;var p=null;
      var peers=global.dndNetwork.roster?global.dndNetwork.roster():[];
      for(var i=0;i<peers.length;i++){if(String(peers[i].characterId)===String(c.characterId)){p=global.dndNetwork.getPeer(peers[i].id);break;}}
      if(p&&p.profile)syncCombatantToProfile(c,p.profile);
    });
  }
  function syncCurrentCharacterFromCombat(){
    var h=hero(),t=combat();if(!h||!t)return false;var id=String(h.id||h.characterId||'');
    var c=(t.combatants||[]).find(function(x){return x&&((id&&String(x.characterId)===id)||String(x.ownerPeerId||'')===String(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.clientId||''));});
    if(!c)return false;syncCombatantToProfile(c,h);return true;
  }
  global.dndSyncCurrentCharacterFromCombat=syncCurrentCharacterFromCombat;
  function render(){if(typeof global.renderInitiativeTracker==='function')try{global.renderInitiativeTracker();}catch(e){}if(typeof global.dndRenderCombatV3==='function')try{global.dndRenderCombatV3();}catch(e){}if(typeof global.dndNetworkGameplayRender==='function')global.dndNetworkGameplayRender();}
  function findTarget(id){var t=combat();if(!t)return null;return t.combatants.find(function(c){return String(c.id)===String(id);})||null;}
  function currentActive(){var t=combat();return t&&t.combatants[t.activeIndex]||null;}
  function rollD20(mode){return global.DNDRules&&global.DNDRules.rollD20?global.DNDRules.rollD20(mode||'normal'):{result:Math.floor(Math.random()*20)+1,critical:false,fumble:false};}
  function profileForPeer(peer){return peer&&peer.profile||{};}
  function sameSide(a,b){
    if(!a||!b)return false;
    if(a.team!=null&&b.team!=null)return String(a.team)===String(b.team);
    if(a.side!=null&&b.side!=null)return String(a.side)===String(b.side);
    if(a.ownerPeerId!=null&&b.ownerPeerId!=null)return String(a.ownerPeerId)===String(b.ownerPeerId);
    var am=String(a.type||a.kind||'').toLowerCase(),bm=String(b.type||b.kind||'').toLowerCase();
    if(am==='monster'&&bm!=='monster')return false;
    if(bm==='monster'&&am!=='monster')return false;
    return true;
  }
  function findAuraSource(target,rangeFt){
    var t=combat(),board=global.DNDBattleBoard;if(!t||!Array.isArray(t.combatants))return null;
    var best=null,bestDist=Infinity;
    t.combatants.forEach(function(c){
      if(c===target||!sameSide(c,target)||!c.classes)return;
      var pc=c.classes.find(function(x){return String(x.name)==='Паладин';});if(!pc||num(pc.level)<6)return;
      var dist=Infinity;if(board&&board.distanceFt){var a=tokenForCombatant(c),b=tokenForCombatant(target);if(a&&b)dist=board.distanceFt(a,b);}
      if(dist<=num(rangeFt,10)&&dist<bestDist){best=c;bestDist=dist;}
    });
    var own=target&&target.classes&&target.classes.find(function(x){return String(x.name)==='Паладин';});
    if(!best&&own&&num(own.level)>=6)best=target;
    return best;
  }
  function saveContextForTarget(caster,target,stat,spell){
    var aura=findAuraSource(target,10),ctx={saveType:stat,frightenedEffect:!!(spell&&spell.frightenedEffect)};if(aura){ctx.allyWithinAura=true;ctx.auraSource=aura;if(aura.classes&&aura.classes.some(function(c){return String(c.name)==='Паладин'&&Number(c.level)>=10;})){ctx.allyWithinCourage=true;ctx.courageSource=aura;}}if(spell&&spell.fromFiendOrUndead)ctx.fromFiendOrUndead=true;return ctx;
  }
  function spellDamageRoll(actor,spell,critical,opts){
    opts=opts||{};var expr=String(spell&&spell.damage||'1d6'),mods=opts.modifiers|| (global.DNDClassFeatures&&global.DNDClassFeatures.spellDamageModifiers?global.DNDClassFeatures.spellDamageModifiers(actor,{damageType:spell&&spell.damageType||'',spellLevel:num(spell&&spell.level,0),cantrip:num(spell&&spell.level,0)===0,usesAlchemistSupplies:!!opts.usesAlchemistSupplies,applyOverchannel:!!opts.applyOverchannel}):{bonus:0,maximize:false,rerollOne:false,notes:[]});
    var result;
    if(mods.maximize){
      var constant=0,total=0,rolls=[],rx=/(\d+)\s*d\s*(\d+)/ig,m;while((m=rx.exec(expr))!==null){var count=Math.max(0,num(m[1]));var sides=Math.max(1,num(m[2]));if(critical)count*=2;for(var i=0;i<count;i++){rolls.push(sides);total+=sides;}}
      var stripped=expr.replace(/(\d+)\s*d\s*(\d+)/ig,'');var nums=stripped.match(/[+-]?\d+/g)||[];nums.forEach(function(v){constant+=num(v);});total+=constant;result={total:total,rolls:rolls,expression:expr,critical:!!critical,maximized:true};
    }else{
      result=global.DNDCombat.rollDice(expr,!!critical);
      if(mods.rerollOne&&result.rolls&&result.rolls.length){var idx=0;for(var j=1;j<result.rolls.length;j++)if(result.rolls[j]<result.rolls[idx])idx=j;var rx2=/(\d+)\s*d\s*(\d+)/i.exec(expr),dieSides=rx2?num(rx2[2],6):6;var old=result.rolls[idx],fresh=Math.floor(Math.random()*dieSides)+1;result.rolls[idx]=fresh;result.total+=fresh-old;result.rerolled={index:idx,old:old,newValue:fresh};}
    }
    result.total+=num(mods.bonus);result.modifiers=mods.notes||[];if(num(mods.selfDamageDice)>0)result.selfDamageDice=num(mods.selfDamageDice);return result;
  }
  function abilityMod(v){return Math.floor((Number(v||10)-10)/2);}
  function basicProfile(h){
    h=h||{};var stats=h.stats||{},classes=Array.isArray(h.classes)?h.classes.map(function(c){return {name:c.name||'',level:Number(c.level)||0,subclass:c.subclass||''};}):[];
    var weapons=[];var sourceWeapons=Array.isArray(h.weaponsData)?h.weaponsData:(Array.isArray(h.weapons)?h.weapons:[]);
    sourceWeapons.forEach(function(w){var stat=String(w.stat||'str').toLowerCase();var statMod=abilityMod(stats[stat]);var proficient=w.proficient!==false;var prof=proficient?num(global.DNDRules&&global.DNDRules.profBonus?global.DNDRules.profBonus(h):2,2):0;var extraAtk=num(w.extraAtk,0),extraDmg=num(w.extraDmg,0);var atk=statMod+prof+extraAtk;var expr=String(w.diceCount||1)+String(w.diceSides||'d6')+(statMod+extraDmg?((statMod+extraDmg>0?'+':'')+(statMod+extraDmg)): '');weapons.push({id:w.id||'',name:w.name||'Оружие',attackBonus:atk,damage:expr,damageType:w.damageType||'',stat:stat,proficient:proficient,extraAtk:extraAtk,extraDmg:extraDmg,diceCount:Number(w.diceCount)||1,diceSides:Number(w.diceSides)||6,rangeFt:num(w.rangeFt,5)});});
    var spells=Array.isArray(h.spellsData)?h.spellsData.map(function(sp){return {name:sp.name||'',level:Number(sp.level)||0,damage:sp.damage||'',damageType:sp.damageType||'',attackType:sp.attackType||null,savingThrow:sp.savingThrow||null,castingClass:sp.castingClass||'',castingStat:sp.castingStat||'',concentration:!!sp.concentration,castingTime:sp.castingTime||'',rangeFt:num(sp.rangeFt,0),aoe:clone(sp.aoe)||null,aoeShape:sp.aoeShape||null,aoeRadiusFt:num(sp.aoeRadiusFt,0),aoeLengthFt:num(sp.aoeLengthFt,0),aoeWidthFt:num(sp.aoeWidthFt,0)};}):[];
    if(global.DNDClassFeatures&&typeof global.DNDClassFeatures.syncClassResources==='function')try{global.DNDClassFeatures.syncClassResources(h);}catch(e){}
    var featureIds=global.DNDClassFeatures&&typeof global.DNDClassFeatures.buildFeatureSet==='function'?global.DNDClassFeatures.buildFeatureSet(h):[];
    return {classes:classes,characterId:String(h.id||h.characterId||''),name:String(h.name||'Игрок'),hpCurrent:Number(h.hpCurrent!=null?h.hpCurrent:(h.hp&&h.hp.current)||0),hpMax:Number(h.hpMax!=null?h.hpMax:(h.hp&&h.hp.max)||0),ac:Number(h.ac)||10,className:String(h.class||h.className||''),level:Number(h.level)||classes.reduce(function(a,c){return a+c.level;},0),stats:clone(stats)||{},proficiencyBonus:global.DNDRules&&global.DNDRules.profBonus?global.DNDRules.profBonus(h):2,weapons:weapons,spells:spells,spellSlotsData:clone(h.spellSlotsData)||{},pactMagicData:clone(h.pactMagicData)||null,classFeatureIds:featureIds.slice(),resources:clone(h.resources)||{},classFeaturesState:clone(h.classFeaturesState)||{},turnResources:clone(h.turnResources)||{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
  }
  global.dndNetworkGameplayBuildProfile=function(){return basicProfile(hero());};
  function sendResult(peerId,action,result,event){if(global.dndNetwork&&global.dndNetwork.sendActionResult)global.dndNetwork.sendActionResult(peerId,action.requestId||'',result,event);if(typeof global.dndNetworkGameplayResult==='function')global.dndNetworkGameplayResult(result);}
  function commit(type,payload,peerId){syncAllCombatProfiles();return global.dndNetwork&&global.dndNetwork.commitHostEvent?global.dndNetwork.commitHostEvent(type,payload,peerId):null;}
  function actionError(peerId,action,message){sendResult(peerId,action,{ok:false,error:message});}
  function canAct(peerId){var net=global.dndNetwork;if(!net||net.state.role!=='host')return false;return !!net.getPeer(peerId);}
  function resources(c){c.turnResources=c.turnResources||{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0};return c.turnResources;}
  function resetResources(c){c.turnResources={action:true,bonusAction:true,reaction:true,movement:num(c.speed,30)||30,movementUsed:0};}
  function ensureAllResources(t){(t.combatants||[]).forEach(function(c){resources(c);});}
  function activeOwner(peerId){var a=currentActive();return !!(a&&a.ownerPeerId===peerId&&!a.defeated);}
  function requireActiveOwner(peerId,action){if(!activeOwner(peerId)){actionError(peerId,action,'Сейчас не ваш ход.');return false;}return true;}
  function consume(c,kind){var r=resources(c);if(!r[kind])return false;r[kind]=false;return true;}
  function spellUsesBonusAction(sp){var s=String(sp.castingTime||'').toLowerCase();return s.indexOf('bonus')>=0||s.indexOf('бонус')>=0;}
  function classSpellAbility(name){var s=String(name||'').toLowerCase();if(s.indexOf('бард')>=0||s==='bard')return'cha';if(s.indexOf('жрец')>=0||s.indexOf('клерик')>=0||s==='cleric')return'wis';if(s.indexOf('друид')>=0||s==='druid')return'wis';if(s.indexOf('чародей')>=0||s==='sorcerer')return'cha';if(s.indexOf('волшебник')>=0||s==='wizard')return'int';if(s.indexOf('колдун')>=0||s==='warlock')return'cha';if(s.indexOf('паладин')>=0||s==='paladin')return'cha';if(s.indexOf('следопыт')>=0||s==='ranger')return'wis';if(s.indexOf('изобретатель')>=0||s==='artificer')return'int';return null;}
  function validateSpellSource(profile,spell){
    var requested=String(spell&&spell.castingClass||'').trim(), ability=String(spell&&spell.castingStat||'').toLowerCase().trim();
    if(!requested&&!ability)return {ok:true};
    var classes=profile&&Array.isArray(profile.classes)?profile.classes:[], found=null;
    if(requested)found=classes.find(function(c){return String(c.name||'').toLowerCase().trim()===requested.toLowerCase();});
    if(!found&&requested)return {ok:false,error:'Источник заклинания не принадлежит персонажу.'};
    if(found&&num(found.level)<=0)return {ok:false,error:'Источник заклинания не имеет уровня класса.'};
    var expected=found&&classSpellAbility(found.name);
    if(ability&&expected&&ability!==expected)return {ok:false,error:'Характеристика заклинания не соответствует выбранному источнику.'};
    if(ability&&!requested&&!classes.some(function(c){return num(c.level)>0&&classSpellAbility(c.name)===ability;}))return {ok:false,error:'Характеристика заклинания не соответствует ни одному классу персонажа.'};
    return {ok:true,className:found&&found.name||requested,ability:expected||ability};
  }
  function consumeSpellSlot(profile,spellLevel,spellName){
    var out={used:false,kind:'none',slotLevel:0,free:false};spellLevel=num(spellLevel,0);spellName=String(spellName||'');
    var st=profile.classFeaturesState||{},classes=profile.classes||[],wiz=classes.find(function(c){return String(c.name)==='Волшебник';}),wl=wiz?num(wiz.level):0;
    var mastery=st.spellMastery||profile.spellMastery||{},masteryNames=[];
    if(Array.isArray(mastery))masteryNames=mastery;else {if(mastery.level1||mastery.first)masteryNames.push(String(mastery.level1||mastery.first));if(mastery.level2||mastery.second)masteryNames.push(String(mastery.level2||mastery.second));}
    if(wl>=18&&spellLevel>0&&spellLevel<=2&&masteryNames.indexOf(spellName)>=0){out.used=true;out.kind='spellMastery';out.slotLevel=spellLevel;out.free=true;return out;}
    var sig=st.signatureSpells||profile.signatureSpells||[],sigUses=st.signatureSpellUses||{};
    if(wl>=20&&spellLevel===3&&Array.isArray(sig)&&sig.indexOf(spellName)>=0){
      if(!sigUses[spellName]){sigUses[spellName]=true;st.signatureSpellUses=sigUses;out.used=true;out.kind='signatureSpell';out.slotLevel=3;out.free=true;return out;}
    }
    var pact=profile.pactMagicData;if(pact&&num(pact.max)>num(pact.used)&&num(pact.slotLevel)>=spellLevel){pact.used=num(pact.used)+1;out.used=true;out.kind='pact';out.slotLevel=num(pact.slotLevel);return out;}
    var slots=profile.spellSlotsData||{};for(var lvl=spellLevel;lvl<=9;lvl++){var s=slots[lvl];if(s&&num(s.max)>num(s.used)){s.used=num(s.used)+1;out.used=true;out.kind='spell';out.slotLevel=lvl;return out;}}
    return out;
  }
  function concentrationState(c){c.concentration=c.concentration||{active:false,spellId:null,spellName:''};return c.concentration;}
  function setConcentration(c,sp){if(global.DNDCombat&&typeof global.DNDCombat.beginConcentration==='function')return global.DNDCombat.beginConcentration(c,sp);var con=concentrationState(c);if(sp&&sp.concentration){breakConcentration(c);con=concentrationState(c);con.active=true;con.spellId=sp.id||sp.name;con.spellName=sp.name||'';}return con;}
  function breakConcentration(c){var con=concentrationState(c);con.active=false;con.spellId=null;con.spellName='';}
  function concentrationCheck(peerId,target,damage,profile){var con=concentrationState(target);if(!con.active||damage<=0||!global.DNDCombat)return null;var dc=Math.max(10,Math.floor(damage/2));var r=global.DNDCombat.savingThrow(target,'con',dc,'normal',saveContextForTarget(null,target,'con',null));if(!r.success)breakConcentration(target);return {dc:dc,roll:r.roll.result,total:r.total,success:r.success,spell:con.spellName};}
  function applyDamageWithConcentration(peerId,target,amount,type,opts){opts=opts||{};var usedCombat=!!(global.DNDCombat&&global.DNDCombat.applyDamage);var r=usedCombat?global.DNDCombat.applyDamage(target,amount,type,opts):{amount:amount,hp:Math.max(0,num(target.hp)-amount),maxHp:target.maxHp};var con=r&&r.concentration||null;if(!con&&target.ownerPeerId&&global.dndNetwork){var p=global.dndNetwork.getPeer(target.ownerPeerId);if(p)con=concentrationCheck(peerId,target,r.hpDamage||r.amount,p.profile||{});}return {damage:r,concentration:con};}
  function battlefield(){return global.DNDBattleBoard&&global.DNDBattleBoard.ensure?global.DNDBattleBoard.ensure():null;}
  function tokenForCombatant(c){var b=battlefield();if(!b||!c)return null;return b.tokens['bt_'+String(c.id)]||null;}
  function geometryCheck(actor,target,payload){
    var board=global.DNDBattleBoard;if(!board||!board.distanceFt)return {ok:true};
    var at=tokenForCombatant(actor),tt=tokenForCombatant(target);if(!at||!tt)return {ok:true};
    var move=payload&&payload.moveTo;
    if(move){var path=board.pathCost(at,move);var speed=num(actor.turnResources&&actor.turnResources.movement,actor.speed||30)-num(actor.turnResources&&actor.turnResources.movementUsed,0);if(path===Infinity||path>speed)return {ok:false,error:'Путь движения больше доступного движения или заблокирован.',pathFt:path,speedFt:speed};}
    var dist=board.distanceFt(move?{x:move.x,y:move.y}:at,tt),range=num(payload&&payload.rangeFt,5);var los=board.lineOfSight(move?{x:move.x,y:move.y,size:at.size}:at,tt);
    if(dist>range)return {ok:false,error:'Цель вне дальности.',distanceFt:dist,rangeFt:range};
    if(!los.clear)return {ok:false,error:'Линия видимости заблокирована.',distanceFt:dist,cover:los.cover};
    return {ok:true,distanceFt:dist,cover:los.cover,pathFt:move?board.pathCost(at,move):0};
  }
  function applyPlannedMove(actor,move){
    if(!move)return true;var b=battlefield(),t=tokenForCombatant(actor);if(!b||!t)return true;var path=global.DNDBattleBoard.pathCost(t,move);if(path===Infinity)return false;t.x=Math.floor(move.x);t.y=Math.floor(move.y);actor.turnResources=actor.turnResources||{};actor.turnResources.movementUsed=num(actor.turnResources.movementUsed)+path;return true;
  }
  function normalizePlan(action,peerId){
    var p=clone(action&&action.payload)||{};p.ownerPeerId=peerId;p.preparedAt=Date.now();p.planId=action.requestId||('plan_'+Date.now()+'_'+Math.random().toString(36).slice(2,7));return p;
  }
  function executePreparedPlan(actor){
    var t=combat();if(!t||!actor||!actor.preparedAction||actor.preparedAction.executed)return null;
    var round=num(t.round,1),plan=clone(actor.preparedAction);
    if(plan.expiresRound&&round>num(plan.expiresRound,round)){actor.preparedAction=null;var ep=global.dndNetwork&&global.dndNetwork.getPeer(actor.ownerPeerId),eprof=profileForPeer(ep);refundPreparedSpell(eprof,plan);save();return {ok:false,error:'Подготовленное действие истекло.',refunded:true};}
    var peer=global.dndNetwork&&global.dndNetwork.getPeer(actor.ownerPeerId),profile=profileForPeer(peer);
    var tx={actor:clone(actor),profile:{spellSlotsData:clone(profile.spellSlotsData)||{},pactMagicData:clone(profile.pactMagicData)||null,classFeaturesState:clone(profile.classFeaturesState)||{},resources:clone(profile.resources)||{},turnResources:clone(profile.turnResources)||{}},token:null};
    var bt=tokenForCombatant(actor);if(bt)tx.token=clone(bt);
    actor.preparedAction=null;
    var action={type:plan.type,payload:plan,requestId:plan.planId||('auto_'+Date.now())};
    var result;
    var geoTarget=plan.targetId?findTarget(plan.targetId):null;if(geoTarget){var g=geometryCheck(actor,geoTarget,plan);if(!g.ok)return {ok:false,error:'Подготовленное действие устарело: '+g.error};}
    if(!consume(actor,'reaction')){actor.preparedAction=tx.actor.preparedAction;return {ok:false,error:'Нет реакции для срабатывания подготовленного действия.'};}
    if(plan.type==='ATTACK')result=applyAttack(actor.ownerPeerId,action,true,true);
    else if(plan.type==='CAST_SPELL')result=applySpell(actor.ownerPeerId,action,true,true,false,plan.preparedSpellSlot||null);
    else result={ok:false,error:'Этот тип действия нельзя выполнить автоматически.'};
    if(!result||result.ok===false){
      var restored=tx.actor;Object.keys(restored||{}).forEach(function(k){actor[k]=clone(restored[k]);});
      profile.spellSlotsData=tx.profile.spellSlotsData;profile.pactMagicData=tx.profile.pactMagicData;profile.classFeaturesState=tx.profile.classFeaturesState;profile.resources=tx.profile.resources;profile.turnResources=tx.profile.turnResources;
      if(bt&&tx.token){Object.keys(tx.token).forEach(function(k){bt[k]=clone(tx.token[k]);});}
      return result||{ok:false,error:'Подготовленное действие не выполнено.'};
    }
    if(result&&typeof result==='object')result.prepared=true;return result;
  }
  function refundPreparedSpell(profile,plan){if(!profile||!plan||!plan.preparedSpellSlot||plan.preparedSpellSlot.used!==true)return false;var r=plan.preparedSpellSlot;if(r.kind==='pact'&&profile.pactMagicData){profile.pactMagicData.used=Math.max(0,num(profile.pactMagicData.used)-1);return true;}if(r.kind==='spell'){var slots=profile.spellSlotsData||{},lvl=num(r.slotLevel,0),slot=slots[lvl];if(slot){slot.used=Math.max(0,num(slot.used)-1);return true;}}return false;}
  function prepareAction(peerId,action){
    var t=combat();if(!t)return actionError(peerId,action,'Бой ещё не запущен.');var p=normalizePlan(action,peerId),actor=t.combatants.find(function(c){return c.ownerPeerId===peerId&&!c.defeated;});if(!actor)return actionError(peerId,action,'Ваш персонаж не найден в инициативе.');var ar=resources(actor);if(!ar.action)return actionError(peerId,action,'Действие уже использовано в этом ходу.');
    if(p.type!=='ATTACK'&&p.type!=='CAST_SPELL')return actionError(peerId,action,'Можно подготовить только атаку или заклинание.');
    var target=p.targetId?findTarget(p.targetId):null;if(p.type==='ATTACK'&&!target)return actionError(peerId,action,'Для атаки нужна цель.');
    if(target){var g=geometryCheck(actor,target,p);if(g.pathFt!=null&&g.pathFt>num(actor.speed,30))return actionError(peerId,action,'Маршрут уже сейчас превышает скорость.');p.preview=clone(g);}
    if(p.type==='CAST_SPELL'){var peer=global.dndNetwork&&global.dndNetwork.getPeer(peerId),profile=profileForPeer(peer),sp=(profile.spells||[]).find(function(x){return x.name===p.spellName;});if(!sp)return actionError(peerId,action,'Заклинание не найдено в авторитетном профиле игрока.');var sourceCheck=validateSpellSource(profile,sp);if(!sourceCheck.ok)return actionError(peerId,action,sourceCheck.error);var reserved=consumeSpellSlot(profile,sp.level,sp.name);if(num(sp.level)>0&&!reserved.used)return actionError(peerId,action,'Нельзя подготовить заклинание: нет подходящего spell slot/Pact Magic.');p.preparedSpellSlot=clone(reserved);p.preparedSpellReserved=true;}
    ar.action=false;p.preparedResource='reaction';p.preparedRound=num(t.round,1);p.expiresRound=num(t.round,1);actor.preparedAction=p;save();var ev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,{ok:true,kind:'prepared',plan:p,eventSeq:ev&&ev.seq},ev);
  }
  function cancelPrepared(peerId,action){var t=combat(),actor=t&&t.combatants.find(function(c){return c.ownerPeerId===peerId;});if(!actor)return actionError(peerId,action,'Персонаж не найден.');var plan=clone(actor.preparedAction);var peer=global.dndNetwork&&global.dndNetwork.getPeer(peerId),profile=profileForPeer(peer);actor.preparedAction=null;var refunded=refundPreparedSpell(profile,plan);save();var ev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,{ok:true,kind:'prepared_cancelled',refundedSpellSlot:refunded},ev);}
  function reactionProxy(target,peer){
    var profile=profileForPeer(peer)||{};var h=clone(profile)||{};h.id=profile.characterId;h.characterId=profile.characterId;h.name=target.name;h.hpCurrent=target.hp;h.hpMax=target.maxHp;h.hp=target.hp;h.maxHitPoints=target.maxHp;h.hitPoints=target.hp;h.turnResources=clone(target.turnResources)||resources(target);h.resources=clone(profile.resources)||{};h.classFeaturesState=clone(profile.classFeaturesState)||{};h.classes=clone(profile.classes)||[];h.stats=clone(profile.stats)||{};return h;
  }
  function reactionOptionsFor(target,peer,ctx){var h=reactionProxy(target,peer);return global.DNDClassFeatures&&typeof global.DNDClassFeatures.reactionOptions==='function'?global.DNDClassFeatures.reactionOptions(h,ctx):null;}
  function findCounterspellReactor(actor,sp){
    var t=combat();if(!t||!global.DNDBattleBoard)return null;
    var at=tokenForCombatant(actor);if(!at)return null;var candidates=[];
    (t.combatants||[]).forEach(function(c){if(!c||c===actor||c.defeated||!c.ownerPeerId)return;var peer=global.dndNetwork&&global.dndNetwork.getPeer(c.ownerPeerId);if(!peer)return;var tt=tokenForCombatant(c);if(!tt)return;var dist=global.DNDBattleBoard.distanceFt(at,tt);if(dist>60)return;var los=global.DNDBattleBoard.lineOfSight(at,tt);if(!los.clear)return;var ctx={source:'spell',spellLevel:num(sp.level),spellName:sp.name,visible:true,distanceFt:dist};var opts=reactionOptionsFor(c,peer,ctx);if(opts&&opts.options&&opts.options.some(function(x){return x.id==='counterspell';}))candidates.push({c:c,peer:peer,dist:dist,ctx:ctx});});
    candidates.sort(function(a,b){if(a.dist!==b.dist)return a.dist-b.dist;return String(a.c&&a.c.id||a.c&&a.c.name||'').localeCompare(String(b.c&&b.c.id||b.c&&b.c.name||''));});return candidates[0]||null;
  }
  function requestSpellReaction(pr){
    pr.transactionRevision=Number(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.stateRevision||0);
    pr.resourceRevision=num(pr.target&&pr.target.reactionResourceRevision,0);
    var found=findCounterspellReactor(pr.caster,pr.spell);if(!found)return null;pr.target=found.c;pr.context=found.ctx;pr.resourceRevision=num(pr.target&&pr.target.reactionResourceRevision,0);pr.expiresAt=Date.now()+15000;pendingReactions[pr.id]=pr;
    var opts=reactionOptionsFor(found.c,found.peer,found.ctx);var payload={reactionId:pr.id,targetId:found.c.id,targetName:found.c.name,amount:0,source:'spell',spellName:pr.spell.name,spellLevel:num(pr.spell.level),options:opts.options.map(function(x){return {id:x.id,name:x.label||x.name||x.id,reason:x.description||x.reason||''};}),expiresAt:pr.expiresAt};
    if(global.dndNetwork&&global.dndNetwork.sendReactionRequest)global.dndNetwork.sendReactionRequest(found.c.ownerPeerId,payload);setTimeout(function(){if(pendingReactions[pr.id]&&Date.now()>=pendingReactions[pr.id].expiresAt)applyPendingReaction(pr.id,'none');},15010);return {ok:true,pendingReaction:true,reactionId:pr.id,options:payload.options,expiresAt:pr.expiresAt};
  }
  function applyPendingReaction(id,choice){
    var pr=pendingReactions[id];if(!pr)return {ok:false,error:'Окно реакции уже закрыто.'};if(pr.expiresAt<Date.now()){delete pendingReactions[id];return finalizePendingReaction(pr,null,{ok:true,auto:true});}
    var peer=global.dndNetwork&&global.dndNetwork.getPeer(pr.target.ownerPeerId),proxy=reactionProxy(pr.target,peer),rr=choice&&choice!=='none'&&global.DNDClassFeatures&&typeof global.DNDClassFeatures.resolveReaction==='function'?global.DNDClassFeatures.resolveReaction(proxy,choice,pr.context):{ok:true,remainingAmount:pr.amount};
    if(!rr.ok)return rr;
    pr.target.turnResources=clone(proxy.turnResources)||pr.target.turnResources;pr.target.reactionResourceRevision=num(pr.target.reactionResourceRevision,0)+1;pr.target.hp=Math.max(0,num(pr.target.hp));
    if(peer&&peer.profile){peer.profile.resources=clone(proxy.resources)||peer.profile.resources;peer.profile.classFeaturesState=clone(proxy.classFeaturesState)||peer.profile.classFeaturesState;peer.profile.spellSlotsData=clone(proxy.spellSlotsData)||peer.profile.spellSlotsData;}
    if(rr&&rr.id==='deflectMissiles'&&rr.returnedAttack&&pr.attackerPeerId){var attackerBack=t.combatants.find(function(c){return String(c.ownerPeerId)===String(pr.attackerPeerId);})||null;if(attackerBack&&global.DNDCombat&&typeof global.DNDCombat.attack==='function'){rr.returnAttackResult=global.DNDCombat.attack(pr.target,attackerBack,{bonus:num(rr.returnAttack.bonus),damage:rr.returnAttack.damage||'1d6',damageType:rr.returnAttack.damageType||pr.damageType||'дробящий',target:attackerBack,weapon:{name:'Возвращённый снаряд',rangeFt:20,damage:rr.returnAttack.damage||'1d6',damageType:rr.returnAttack.damageType||pr.damageType||'дробящий'}});}}
    if(rr&&rr.id==='shield'&&rr.attackNegated&&pr.attackResult){pr.attackResult.hit=false;pr.attackResult.damageResult=null;pr.attackResult.shielded=true;}
    if(pr.kind==='spell'){
      delete pendingReactions[id];
      if(rr&&rr.id==='counterspell'&&rr.spellCountered){var blocked={ok:true,kind:'spell_countered',spell:pr.spell.name,spellLevel:num(pr.spell.level),countered:true,reaction:rr};save();render();var bev=commit('COMBAT_CHANGED',clone(combat()),pr.attackerPeerId);sendResult(pr.attackerPeerId,pr.action,blocked,bev);return blocked;}
      var resume=clone(pr.action)||{type:'CAST_SPELL',payload:{}};resume.payload=resume.payload||{};resume.payload.__reactionResume=true;return applySpell(pr.attackerPeerId,resume,true,false,true);
    }
    delete pendingReactions[id];return finalizePendingReaction(pr,rr,null);
  }
  function finalizePendingReaction(pr,rr,meta){
    var t=combat(),shielded=!!(rr&&rr.id==='shield'&&rr.attackNegated),amount=shielded?0:(rr&&rr.remainingAmount!=null?rr.remainingAmount:pr.amount),damage=shielded?{amount:0,hp:num(pr.target.hp),hpDamage:0,maxHp:pr.target.maxHp,shielded:true}:(global.DNDCombat?global.DNDCombat.applyDamage(pr.target,amount,pr.damageType,pr.damageContext||{}):{amount:amount,hp:Math.max(0,num(pr.target.hp)-amount),hpDamage:amount,maxHp:pr.target.maxHp});var con=null;if(damage&&damage.hpDamage>0&&pr.target.ownerPeerId){var tp=global.dndNetwork&&global.dndNetwork.getPeer(pr.target.ownerPeerId);if(tp)con=concentrationCheck(pr.attackerPeerId,pr.target,damage.hpDamage,tp.profile||{});}var out={ok:true,kind:'reaction_resolved',reaction:rr||null,damage:damage,concentration:con,attack:pr.attackResult||null};if(meta)Object.assign(out,meta);save();render();var ev=commit('COMBAT_CHANGED',clone(t),pr.attackerPeerId);sendResult(pr.attackerPeerId,pr.action,out,ev);return out;
  }
  function requestReactionOrApply(pr){
    var opts=reactionOptionsFor(pr.target,global.dndNetwork&&global.dndNetwork.getPeer(pr.target.ownerPeerId),pr.context);if(!opts||!opts.options||!opts.options.length)return finalizePendingReaction(pr,null,{noReaction:true});
    var id=pr.id;pr.transactionRevision=Number(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.stateRevision||0);pr.resourceRevision=num(pr.target&&pr.target.reactionResourceRevision,0);pendingReactions[id]=pr;var payload={reactionId:id,targetId:pr.target.id,targetName:pr.target.name,amount:pr.amount,damageType:pr.damageType,attackKind:pr.context.attackKind,attackTotal:pr.context.attackTotal,targetAc:pr.context.targetAc,source:pr.context.source,spellName:pr.context.spellName,spellLevel:pr.context.spellLevel,options:opts.options.map(function(x){return {id:x.id,name:x.label||x.name||x.id,reason:x.description||x.reason||''};}),expiresAt:pr.expiresAt};if(global.dndNetwork&&global.dndNetwork.sendReactionRequest)global.dndNetwork.sendReactionRequest(pr.target.ownerPeerId,payload);setTimeout(function(){if(pendingReactions[id]&&Date.now()>=pendingReactions[id].expiresAt)applyPendingReaction(id,'none');},Math.max(1,pr.expiresAt-Date.now()+10));return {ok:true,pendingReaction:true,reactionId:id,options:payload.options,expiresAt:pr.expiresAt};
  }
  function clearReactionWindow(){var root=document&&document.getElementById?document.getElementById('dndReactionWindow'):null;if(root&&root.parentNode)root.parentNode.removeChild(root);global.__dndPendingReactionRequest=null;}
  function renderReactionWindow(payload,requestId){
    if(typeof document==='undefined'||!document.body||typeof document.createElement!=='function')return false;
    clearReactionWindow();var box=payload||{},root=document.createElement('div');root.id='dndReactionWindow';root.style.cssText='position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:18px;';
    var card=document.createElement('div');card.style.cssText='width:min(520px,96vw);background:#151515;color:#fff;border:1px solid #555;border-radius:12px;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.6);font-family:system-ui,sans-serif;';root.appendChild(card);
    var title=document.createElement('div');title.textContent='⚡ Реакция';title.style.cssText='font-size:1.2em;font-weight:700;margin-bottom:8px;';card.appendChild(title);
    var desc=document.createElement('div');desc.textContent=(box.source==='spell'?'Заклинание: '+(box.spellName||'неизвестно'):'Атака по '+(box.targetName||'персонажу'))+(box.amount>0?' • урон: '+box.amount:'')+(box.expiresAt?'':'');desc.style.cssText='margin-bottom:12px;color:#ccc;';card.appendChild(desc);
    var list=document.createElement('div');list.style.cssText='display:grid;gap:8px;';card.appendChild(list);
    var answered=false;function answer(choice){if(answered)return;answered=true;clearReactionWindow();if(global.dndNetwork&&global.dndNetwork.playerAction)global.dndNetwork.playerAction('REACTION_RESPONSE',{reactionId:box.reactionId,choice:choice});}
    (box.options||[]).forEach(function(opt){var b=document.createElement('button');b.type='button';b.textContent=String(opt.name||opt.id);b.style.cssText='padding:11px 12px;border:1px solid #666;border-radius:8px;background:#252525;color:#fff;text-align:left;cursor:pointer;';if(opt.reason){var small=document.createElement('div');small.textContent=String(opt.reason);small.style.cssText='font-size:.8em;color:#aaa;margin-top:3px;';b.appendChild(small);}b.onclick=function(){answer(opt.id);};list.appendChild(b);});
    var none=document.createElement('button');none.type='button';none.textContent='Продолжить без реакции';none.style.cssText='margin-top:10px;width:100%;padding:9px;border:1px solid #555;border-radius:8px;background:#111;color:#bbb;cursor:pointer;';none.onclick=function(){answer('none');};card.appendChild(none);
    document.body.appendChild(root);
    if(box.expiresAt){var timer=document.createElement('div');timer.style.cssText='margin-top:8px;color:#888;font-size:.75em;text-align:right;';card.appendChild(timer);var tick=function(){if(!document.getElementById('dndReactionWindow'))return;var left=Math.max(0,box.expiresAt-Date.now());timer.textContent='Авто-продолжение через '+Math.ceil(left/1000)+' с';if(left>0)setTimeout(tick,250);};tick();}
    return true;
  }
  global.dndNetworkGameplayReactionRequest=function(payload,requestId){var box=payload||{};global.__dndPendingReactionRequest={requestId:requestId||'',payload:box};if(typeof global.dndNetworkGameplayRender==='function')global.dndNetworkGameplayRender();if(!renderReactionWindow(box,requestId)&&typeof global.alert==='function')global.alert('Доступна реакция: '+(box.options||[]).map(function(x){return x.name;}).join(', '));};

  function handleReactionResponse(peerId,action){var p=action.payload||{};var pr=pendingReactions[p.reactionId];if(!pr)return actionError(peerId,action,'Окно реакции не найдено.');if(String(pr.target.ownerPeerId)!==String(peerId))return actionError(peerId,action,'Эта реакция принадлежит другому игроку.');if(num(pr.target.reactionResourceRevision,0)!==num(pr.resourceRevision,0))return actionError(peerId,action,'Ресурс реакции уже изменился — окно реакции устарело.');return applyPendingReaction(p.reactionId,String(p.choice||'none'));}
  function applyAttack(peerId,action,prepared,preparedReaction){
    var t=combat();if(!t)return actionError(peerId,action,'Бой ещё не запущен.');if(!requireActiveOwner(peerId,action))return;
    var actor=currentActive(),rs=resources(actor);
    var target=findTarget(action.payload&&action.payload.targetId);if(!target)return actionError(peerId,action,'Цель не найдена.');
    var p=profileForPeer(global.dndNetwork.getPeer(peerId));var w=(p.weapons||[]).find(function(x){return String(x.id)===String(action.payload.weaponId)||x.name===action.payload.weaponName;});if(!w)return actionError(peerId,action,'Оружие не найдено в профиле игрока.');
    var attackPayload=clone(action.payload)||{};attackPayload.rangeFt=num(w.rangeFt,5);
    var geo=geometryCheck(actor,target,attackPayload);if(!geo.ok)return actionError(peerId,action,geo.error);
    if(action.payload&&action.payload.moveTo){if(!applyPlannedMove(actor,action.payload))return actionError(peerId,action,'Не удалось выполнить запланированное движение.');}

    if(!preparedReaction&&!consume(actor,'action'))return actionError(peerId,action,'Действие уже использовано в этом ходу.');
    var type=String(w.damageType||'');var coverBonus=geo.cover===2?5:(geo.cover===1?2:0);var defer=!!(target.ownerPeerId&&target.ownerPeerId!==peerId&&global.DNDClassFeatures&&global.DNDClassFeatures.reactionOptions);var resolved=global.DNDCombat&&global.DNDCombat.resolveAttack?global.DNDCombat.resolveAttack(p,target,{weapon:w,damage:w.damage,damageType:type,target:true,deferDamage:defer,acOverride:num(target.ac,10)+coverBonus,useRules:true}):null;if(!resolved)return actionError(peerId,action,'Боевой resolver недоступен.');var reactionCtx={amount:0,damageType:type,source:'attack',attackKind:(Number(w.rangeFt)>5?'rangedWeapon':'weapon'),visible:true,projectile:Number(w.rangeFt)>5,attackTotal:resolved.total,targetAc:num(target.ac,10)+coverBonus,natural20:!!(resolved.d20===20),returnTarget:actor,returnAttackBonus:(function(){var ds=target&&target.stats||{};var dm=Math.floor((num(ds.dex,10)-10)/2);var pb=global.DNDRules&&global.DNDRules.profBonus?global.DNDRules.profBonus(target):2;return dm+pb;})(),returnDamage:w.damage||'1d6',returnDamageType:type};var damageResult=resolved.damageResult||null;var con=null;if(defer&&resolved.pendingDamage&&resolved.hit){reactionCtx.amount=resolved.pendingDamage.amount;var pending={id:'react_'+action.requestId,target:target,attackerPeerId:peerId,action:action,attackResult:resolved,amount:resolved.pendingDamage.amount,damageType:type,damageContext:resolved.pendingDamage.context,context:reactionCtx,expiresAt:Date.now()+15000};var reaction=requestReactionOrApply(pending);if(reaction&&reaction.pendingReaction){var resultPending={ok:true,kind:'attack',attacker:p.name||'Игрок',target:target.name,d20:resolved.d20,bonus:resolved.bonus,total:resolved.total,ac:resolved.ac,baseAc:num(target.ac,10),cover:geo.cover||0,coverBonus:coverBonus,hit:resolved.hit,critical:resolved.critical,fumble:resolved.fumble,damage:null,reaction:reaction,reactionPending:true,resources:clone(rs)};var pev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,resultPending,pev);return resultPending;}damageResult=reaction.damage;con=reaction.concentration;}if(!con&&damageResult&&target.ownerPeerId&&global.dndNetwork){var tp=global.dndNetwork.getPeer(target.ownerPeerId);if(tp)con=concentrationCheck(peerId,target,damageResult.hpDamage||damageResult.amount,tp.profile||{});}
    var result={ok:true,kind:'attack',attacker:p.name||'Игрок',target:target.name,d20:resolved.d20,bonus:resolved.bonus,total:resolved.total,ac:resolved.ac,baseAc:num(target.ac,10),cover:geo.cover||0,coverBonus:coverBonus,hit:resolved.hit,critical:resolved.critical,fumble:resolved.fumble,damage:damageResult,concentration:con,classBonus:resolved.classBonus||0,classFeatureNotes:resolved.classFeatureNotes||[],resources:clone(rs)};
    save();render();var ev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,result,ev);return result;
  }
  function applyDamage(peerId,action){return actionError(peerId,action,'Нанесение произвольного урона доступно только мастеру.');}
  function applyHeal(peerId,action){return actionError(peerId,action,'Лечение через сетевой RPC выполняет мастер.');}
  function applyCondition(peerId,action){return actionError(peerId,action,'Изменение состояний через сетевой RPC выполняет мастер.');}
  function advanceTurn(t){
    if(!t||!t.combatants.length)return null;var autoResults=[];
    for(var guard=0;guard<t.combatants.length;guard++){
      var previous=t.combatants[t.activeIndex];
      if(previous&&previous.entityId&&global.DNDSummoning&&typeof global.DNDSummoning.endTurn==='function')global.DNDSummoning.endTurn(previous);
      t.activeIndex=(t.activeIndex+1)%t.combatants.length;if(t.activeIndex===0){t.round=Math.max(1,num(t.round,1)+1);(t.combatants||[]).forEach(function(c){if(c&&c.type!=='hero'&&global.DNDMonsters&&typeof global.DNDMonsters.resetLairRound==='function')global.DNDMonsters.resetLairRound(c,t.round);});}
      var next=t.combatants[t.activeIndex];resetResources(next);
      if(next&&next.type!=='hero'&&global.DNDMonsters&&typeof global.DNDMonsters.startTurn==='function')global.DNDMonsters.startTurn(next,t.round);
      if(next&&next.entityId&&global.DNDSummoning&&typeof global.DNDSummoning.startTurn==='function')global.DNDSummoning.startTurn(next);
      var auto=executePreparedPlan(next);
      if(auto){autoResults.push({actor:t.combatants[t.activeIndex].name,result:auto});if(auto.error){global.dndNetworkGameplayResult(auto);break;}continue;}
      break;
    }
    return autoResults;
  }
  function executePreparedGroup(){
    var net=global.dndNetwork,t=combat();if(!net||net.state.role!=='host'||!t)return {ok:false,error:'Групповое окно доступно мастеру в сетевой игре.'};
    var active=currentActive();if(!active)return {ok:false,error:'Нет активного участника.'};var preparedAny=t.combatants.find(function(c){return c.preparedAction&&!c.defeated&&c.ownerPeerId;});var team=preparedAny?(preparedAny.team||(preparedAny.type==='hero'?'party':'enemy')):(active.team||(active.type==='hero'?'party':'enemy'));
    var original=t.activeIndex,results=[];var candidates=t.combatants.map(function(c,i){return {c:c,i:i};}).filter(function(x){return x.c.preparedAction&&!x.c.defeated&&(x.c.team|| (x.c.type==='hero'?'party':'enemy'))===team&&x.c.ownerPeerId;});
    candidates.sort(function(a,b){var ap=num(a.c.preparedAction&&a.c.preparedAction.preparedAt,0),bp=num(b.c.preparedAction&&b.c.preparedAction.preparedAt,0);if(ap!==bp)return ap-bp;var ai=num(a.c.initiative,0),bi=num(b.c.initiative,0);if(ai!==bi)return bi-ai;return String(a.c.id||a.c.name||'').localeCompare(String(b.c.id||b.c.name||''));});
    for(var i=0;i<candidates.length;i++){t.activeIndex=candidates[i].i;resetResources(candidates[i].c);var r=executePreparedPlan(candidates[i].c);results.push({actor:candidates[i].c.name,result:r});}
    t.activeIndex=original;save();return {ok:true,team:team,results:results};
  }
  
  function restoreProfileAfterRest(profile,type){
    if(!profile)return;
    if(type==='short'){
      if(profile.pactMagicData)profile.pactMagicData.used=0;
      if(profile.pactMagic)profile.pactMagic.used=0;
      if(typeof global.restorePactMagic==='function')try{global.restorePactMagic.call(global); }catch(e){}
    } else {
      profile.hpCurrent=num(profile.hpMax,profile.hpCurrent);
      if(profile.hp){profile.hp.current=num(profile.hp.max,profile.hp.current);profile.hp.temp=0;}
      if(profile.spellSlotsData)Object.keys(profile.spellSlotsData).forEach(function(k){profile.spellSlotsData[k].used=0;});
      if(profile.spells&&profile.spells.slotsUsed)Object.keys(profile.spells.slotsUsed).forEach(function(k){profile.spells.slotsUsed[k]=0;});
      if(profile.pactMagicData)profile.pactMagicData.used=0;if(profile.pactMagic)profile.pactMagic.used=0;
      if(profile.deathSaves)profile.deathSaves={successes:0,failures:0};
      if(profile.activeConditions){profile.activeConditions['Бессознателен']=false;profile.activeConditions['Unconscious']=false;}
      if(profile.conditions){profile.conditions['Бессознателен']=false;profile.conditions['Unconscious']=false;}
      profile.defeated=false;
    }
    profile.lastRest={type:type,at:new Date().toISOString()};
    if(global.DNDClassFeatures&&typeof global.DNDClassFeatures.restore==='function')try{global.DNDClassFeatures.restore(profile,type);}catch(e){}
  }
  function applyNetworkRest(peerId,action,type){
    var t=combat(),net=global.dndNetwork,p=net&&net.getPeer?net.getPeer(peerId):null;if(!p||!p.profile)return actionError(peerId,action,'Профиль игрока недоступен.');
    var target=t&&t.combatants&&t.combatants.find(function(c){return c.ownerPeerId===peerId||String(c.characterId||'')===String(p.profile.characterId||'');});
    if(target){if(type==='long'){target.hp=target.maxHp;target.tempHp=0;target.defeated=false;target.deathSaves={successes:0,failures:0};target.concentration={active:false,spellId:null,spellName:''};if(target.conditions)target.conditions={};}resources(target);}
    restoreProfileAfterRest(p.profile,type);
    if(target)syncCombatantToProfile(target,p.profile);
    save();render();var ev=commit('COMBAT_CHANGED',clone(t||{}),peerId);var result={ok:true,kind:type==='short'?'short_rest':'long_rest',resources:target&&clone(target.turnResources),revision:ev&&ev.stateRevision||0};sendResult(peerId,action,result,ev);return result;
  }
  function applyEndTurn(peerId,action){
    var t=combat();if(!t||!t.combatants.length)return actionError(peerId,action,'Нет участников инициативы.');var active=currentActive();if(!active||active.ownerPeerId!==peerId)return actionError(peerId,action,'Сейчас не ваш ход.');
    var autos=advanceTurn(t);save();render();var ev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,{ok:true,kind:'end_turn',round:t.round,active:t.combatants[t.activeIndex]&&t.combatants[t.activeIndex].name,resources:clone(t.combatants[t.activeIndex]&&t.combatants[t.activeIndex].turnResources),autoPlans:autos},ev);
  }
  function applyDeathSave(peerId,action){
    var t=combat(),p=global.dndNetwork.getPeer(peerId),profile=profileForPeer(p),target=t&&t.combatants.find(function(c){return c.ownerPeerId===peerId|| (profile.characterId&&String(c.characterId)===String(profile.characterId));});if(!target)return actionError(peerId,action,'Ваш персонаж не добавлен в инициативу мастера.');if(target.hp>0||!target.defeated)return actionError(peerId,action,'Death Save доступен только персонажу с 0 HP.');if(num(target.deathSaves&&target.deathSaves.successes)>=3)return actionError(peerId,action,'Персонаж уже стабилен и больше не делает Death Save.');if(num(target.deathSaves&&target.deathSaves.failures)>=3)return actionError(peerId,action,'Персонаж уже мёртв.');if(currentActive()!==target)return actionError(peerId,action,'Death Save выполняется в ваш ход.');
    var roll=rollD20(),result={ok:true,kind:'death_save',d20:roll.result};target.deathSaves=target.deathSaves||{successes:0,failures:0};if(roll.result===20){target.hp=1;target.defeated=false;target.deathSaves={successes:0,failures:0};result.outcome='revive';}else if(roll.result===1){target.deathSaves.failures=Math.min(3,num(target.deathSaves.failures)+2);result.outcome='two_failures';}else if(roll.result>=10){target.deathSaves.successes=Math.min(3,num(target.deathSaves.successes)+1);result.outcome='success';}else{target.deathSaves.failures=Math.min(3,num(target.deathSaves.failures)+1);result.outcome='failure';}if(target.deathSaves.successes>=3)result.outcome='stable';if(target.deathSaves.failures>=3){target.defeated=true;result.outcome='dead';}save();var ev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,result,ev);render();
  }
  function aoeGeometryCheck(actor,payload){
    if(!payload||!payload.aoe||!global.DNDBattleBoard)return {ok:true};var at=tokenForCombatant(actor),cell=payload.aoe.cell;if(!at||!cell)return {ok:false,error:'Для AoE не выбрана точка.'};var b=global.DNDBattleBoard.ensure();var dx=(at.x+at.size/2)-(cell.x+.5),dy=(at.y+at.size/2)-(cell.y+.5),dist=Math.sqrt(dx*dx+dy*dy)*num(b&&b.cellFt,5),range=num(payload.rangeFt,150);if(dist>range)return {ok:false,error:'Точка AoE вне дальности заклинания.',distanceFt:dist,rangeFt:range};var los=global.DNDBattleBoard.lineOfSight({x:cell.x,y:cell.y,size:1},at);if(!los.clear)return {ok:false,error:'Точка AoE не имеет линии видимости.'};return {ok:true,distanceFt:dist,rangeFt:range};
  }
  function applySpell(peerId,action,prepared,preparedReaction,resumeSpell,preparedReservation){
    var t=combat();if(!t)return actionError(peerId,action,'Бой ещё не запущен.');if(!requireActiveOwner(peerId,action))return;
    var actor=currentActive(),p=profileForPeer(global.dndNetwork.getPeer(peerId));var sp=(p.spells||[]).find(function(x){return x.name===action.payload.spellName;})||null;if(!sp)return actionError(peerId,action,'Заклинание не найдено в авторитетном профиле игрока.');
    var authoritativeAoe=sp.aoe||null;var requestedAoe=action.payload&&action.payload.aoe;var hasAoe=!!authoritativeAoe;
    if(requestedAoe&&!hasAoe)return actionError(peerId,action,'У этого заклинания нет авторитетной AoE-геометрии.');
    var target=findTarget(action.payload&&action.payload.targetId);if(!target&&!hasAoe)return actionError(peerId,action,'Цель не найдена.');
    var sourceCheck=validateSpellSource(p,sp);if(!sourceCheck.ok)return actionError(peerId,action,sourceCheck.error);
    var spellPayload=clone(action.payload)||{};spellPayload.rangeFt=num(sp.rangeFt,0)||150;
    if(hasAoe)spellPayload.aoe=Object.assign({},authoritativeAoe,{cell:requestedAoe&&requestedAoe.cell||null,direction:requestedAoe&&requestedAoe.direction||null});
    if(target){var geo=geometryCheck(actor,target,spellPayload);if(!geo.ok)return actionError(peerId,action,geo.error);}
    if(hasAoe){if(!spellPayload.aoe.cell)return actionError(peerId,action,'Для AoE не выбрана точка.');var ag=aoeGeometryCheck(actor,spellPayload);if(!ag.ok)return actionError(peerId,action,ag.error);}
    // Movement is committed only after the action and spell-slot preconditions pass.
    // Otherwise a rejected cast (e.g. no slot) must not leave a partial state change.
    var plannedMove=action.payload&&action.payload.moveTo?clone(action.payload.moveTo):null;
    var bonusAction=spellUsesBonusAction(sp),resource=preparedReaction?'reaction':(bonusAction?'bonusAction':'action');if(!resumeSpell&&!preparedReaction&&!consume(actor,resource))return actionError(peerId,action,'Ресурс '+(preparedReaction?'реакции':(bonusAction?'бонусного действия':'действия'))+' уже использован.');
    var slotSnapshot={spellSlotsData:clone(p.spellSlotsData)||{},pactMagicData:clone(p.pactMagicData)||null,classFeaturesState:clone(p.classFeaturesState)||{}};
    var slot=preparedReservation?clone(preparedReservation):(resumeSpell?{used:true,kind:'resume',slotLevel:num(sp.level)}:consumeSpellSlot(p,sp.level,sp.name));if(!resumeSpell&&!preparedReservation&&num(sp.level)>0&&!slot.used){resources(actor)[resource]=true;return actionError(peerId,action,'Нет подходящего spell slot/Pact Magic.');}
    if(plannedMove&&!applyPlannedMove(actor,Object.assign({},action.payload,{moveTo:plannedMove}))) {
      resources(actor)[resource]=true; p.spellSlotsData=slotSnapshot.spellSlotsData; p.pactMagicData=slotSnapshot.pactMagicData; p.classFeaturesState=slotSnapshot.classFeaturesState;
      return actionError(peerId,action,'Не удалось выполнить запланированное движение.');
    }
    if(!sp.name)return actionError(peerId,action,'Заклинание не найдено в профиле игрока.');var stat=String(sp.castingStat||'').toLowerCase(),bonus=num(p.proficiencyBonus,2)+abilityMod((p.stats||{})[stat]),dc=8+bonus;var result={ok:true,kind:'spell',spell:sp.name,level:num(sp.level),slot:slot,attacker:p.name,target:target&&target.name||'AoE',castingStat:stat,attackBonus:bonus,saveDc:dc,hit:null,damage:null,resources:clone(actor.turnResources),spellSlots:clone(p.spellSlotsData),pactMagic:clone(p.pactMagicData)};var con=null;
    if(!resumeSpell&&sp.level>0&&actor.ownerPeerId===peerId){var spellReaction=requestSpellReaction({id:'spellreact_'+action.requestId,kind:'spell',caster:actor,attackerPeerId:peerId,action:action,spell:sp,context:{source:'spell',spellLevel:num(sp.level),spellName:sp.name,visible:true},expiresAt:Date.now()+15000});if(spellReaction&&spellReaction.pendingReaction){result.reaction=spellReaction;result.reactionPending=true;var rev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,result,rev);return result;}}    var spellDamageMods=global.DNDClassFeatures&&global.DNDClassFeatures.spellDamageModifiers?global.DNDClassFeatures.spellDamageModifiers(actor,{damageType:sp.damageType||'',spellLevel:num(sp.level,0),cantrip:num(sp.level,0)===0,hasDamage:!!sp.damage,usesAlchemistSupplies:!!(action.payload&&action.payload.usesAlchemistSupplies),applyOverchannel:true}):{bonus:0,maximize:false,rerollOne:false,notes:[]};
    if(hasAoe&&global.DNDBattleBoard){var ao=spellPayload.aoe,ts=global.DNDBattleBoard.tokenList(),source=global.DNDBattleBoard.tokenList().find(function(x){return String(x.sourceId)===String(actor.id);}),cell=ao.cell||null,hits=ts.filter(function(x){if(!source||!cell||String(x.sourceId)===String(actor.id))return false;var dir=ao.direction||null;if(!dir&&cell&&(ao.shape==='line'||ao.shape==='cone'))dir={x:(cell.x+0.5)-(source.x+source.size/2),y:(cell.y+0.5)-(source.y+source.size/2)};var inside=global.DNDBattleBoard.aoeContainsPoint?global.DNDBattleBoard.aoeContainsPoint(ao.shape||'circle',source,x,num(ao.radiusFt,20),dir):false;return inside;}).filter(function(x){return global.DNDBattleBoard.lineOfSight({x:source.x,y:source.y,size:source.size||1},x).clear;}),batchEntries=[],aoeMeta=[];result.aoeTargets=hits.map(function(x){return x.sourceId;});result.aoeTargetNames=hits.map(function(x){return x.name;});for(var hi=0;hi<hits.length;hi++){var tc=findTarget(hits[hi].sourceId);if(!tc||tc.defeated&&num(tc.deathSaves&&tc.deathSaves.failures)>=3)continue;var sr=global.DNDCombat.savingThrow(tc,String(sp.savingThrow||'dex').toLowerCase(),dc,'normal',saveContextForTarget(actor,tc,String(sp.savingThrow||'dex').toLowerCase(),sp)),dr=spellDamageRoll(actor,sp,false,{modifiers:spellDamageMods,usesAlchemistSupplies:!!(action.payload&&action.payload.usesAlchemistSupplies)});batchEntries.push({target:tc,amount:sr.success?(sr.evasion?0:Math.floor(dr.total/2)):dr.total,type:sp.damageType||'',opts:{source:'spell',visible:true,damageParts:[{amount:sr.success?(sr.evasion?0:Math.floor(dr.total/2)):dr.total,damageType:sp.damageType||''}]}});aoeMeta.push({target:tc.name,save:sr.success,damageRoll:dr,saveRoll:sr});}var batch=global.DNDCombat.applyDamageBatch?global.DNDCombat.applyDamageBatch(batchEntries):{ok:true,results:batchEntries.map(function(e){return global.DNDCombat.applyDamage(e.target,e.amount,e.type,e.opts||{});})};if(!batch.ok)return actionError(peerId,action,'AoE-транзакция отменена: '+batch.error);result.aoeResults=aoeMeta.map(function(m,i){var dr=batch.results[i]||null;return {target:m.target,save:m.save,damageRoll:m.damageRoll,saveRoll:m.saveRoll,damage:dr,concentration:dr&&dr.concentration||null};});}    if(!hasAoe&&sp.attackType){var r=rollD20();result.d20=r.result;result.total=r.result+bonus;result.hit=r.critical||(!r.fumble&&result.total>=num(target.ac,10));if(result.hit&&sp.damage&&global.DNDCombat){var dr=spellDamageRoll(actor,sp,!!r.critical,{modifiers:spellDamageMods,usesAlchemistSupplies:!!(action.payload&&action.payload.usesAlchemistSupplies)});var pack=applyDamageWithConcentration(peerId,target,dr.total,sp.damageType||'',{critical:!!r.critical});result.damage=pack.damage;con=pack.concentration;}}
    else if(!hasAoe&&sp.savingThrow&&sp.damage&&global.DNDCombat){var saveRoll=global.DNDCombat.savingThrow(target,String(sp.savingThrow||'dex').toLowerCase(),dc,'normal',saveContextForTarget(actor,target,String(sp.savingThrow||'dex').toLowerCase(),sp));result.saveD20=saveRoll.roll.result;result.saveTotal=saveRoll.total;result.success=saveRoll.success;var dr=spellDamageRoll(actor,sp,false,{modifiers:spellDamageMods,usesAlchemistSupplies:!!(action.payload&&action.payload.usesAlchemistSupplies)});var pack=applyDamageWithConcentration(peerId,target,saveRoll.success?(saveRoll.evasion?0:Math.floor(dr.total/2)):dr.total,sp.damageType||'');result.damage=pack.damage;con=pack.concentration;}
    if(spellDamageMods&&num(spellDamageMods.selfDamageDice)>0){
      var od=global.DNDCombat.rollDice(String(spellDamageMods.selfDamageDice)+'d12',false);
      var odr=applyDamageWithConcentration(peerId,actor,od.total,'necrotic');result.overchannelSelfDamage=odr.damage;
    }
    if(sp.concentration&&result.ok)setConcentration(actor,sp);result.concentration=clone(actor.concentration);result.targetConcentration=con;save();render();var ev=commit('COMBAT_CHANGED',clone(t),peerId);sendResult(peerId,action,result,ev);return result;
  }
  var FEATURE_TARGET_RULES={bardicInspiration:{kind:'ally',rangeFt:60,los:true},layOnHands:{kind:'ally',rangeFt:5,los:true},preserveLife:{kind:'ally',rangeFt:30,los:true},vowOfEnmity:{kind:'enemy',rangeFt:10,los:true},huntersPrey:{kind:'enemy',rangeFt:120,los:true},huntersMark:{kind:'enemy',rangeFt:90,los:true},feyPresence:{kind:'enemy',rangeFt:10,los:true},hurlThroughHell:{kind:'enemy',rangeFt:120,los:true},darkDelirium:{kind:'enemy',rangeFt:60,los:true},quiveringPalm:{kind:'enemy',rangeFt:5,los:true},openHandTechnique:{kind:'enemy',rangeFt:5,los:true},stunningStrike:{kind:'enemy',rangeFt:5,los:true},divineSmite:{kind:'enemy',rangeFt:5,los:true},flashOfGenius:{kind:'ally',rangeFt:30,los:true},explosiveCannon:{kind:'enemy',rangeFt:60,los:true},bloodMaledict:{kind:'enemy',rangeFt:30,los:true},brandOfCastigation:{kind:'enemy',rangeFt:30,los:true},brandOfTethering:{kind:'enemy',rangeFt:30,los:true}};
  function validateFeatureTarget(actor,target,id){var rule=FEATURE_TARGET_RULES[id];if(!rule)return {ok:true,target:target||null};if(!target)return {ok:false,error:'Для этой способности нужна цель.'};if(rule.kind==='ally'&&target.type!=='hero')return {ok:false,error:'Недопустимая цель: нужен союзник.'};if(rule.kind==='enemy'&&target.type==='hero')return {ok:false,error:'Недопустимая цель: нужен противник.'};var at=tokenForCombatant(actor),tt=tokenForCombatant(target);if(at&&tt&&global.DNDBattleBoard){var dist=global.DNDBattleBoard.distanceFt(at,tt);if(rule.rangeFt&&dist>rule.rangeFt)return {ok:false,error:'Цель вне дальности.',distanceFt:dist,rangeFt:rule.rangeFt};if(rule.los){var los=global.DNDBattleBoard.lineOfSight(at,tt);if(!los.clear)return {ok:false,error:'Линия видимости заблокирована.'};}}return {ok:true,target:target};}
  function applyClassFeature(peerId,action){var t=combat(),p=global.dndNetwork.getPeer(peerId),profile=profileForPeer(p),id=String(action.payload&&action.payload.featureId||'');if(!t||!p||!profile)return actionError(peerId,action,'Профиль игрока недоступен.');if(!id)return actionError(peerId,action,'Не указана способность.');if(!global.DNDClassFeatures||typeof global.DNDClassFeatures.useFeature!=='function')return actionError(peerId,action,'Движок способностей недоступен.');var def=global.DNDClassFeatures&&global.DNDClassFeatures.FEATURE_DEFS&&global.DNDClassFeatures.FEATURE_DEFS[id];if(!def)return actionError(peerId,action,'Неизвестная способность.');if(typeof global.DNDClassFeatures.featureAvailableForCurrentBuild==='function'&&!global.DNDClassFeatures.featureAvailableForCurrentBuild(profile,id))return actionError(peerId,action,'Эта способность недоступна вашему персонажу.');if(def.action==='on-hit')return actionError(peerId,action,'Эта способность может применяться только как часть соответствующего боевого события.');var actor=t.combatants.find(function(c){return c.ownerPeerId===peerId;});if(!actor)return actionError(peerId,action,'Персонаж игрока не найден в инициативе.');var resourceKind=def.action==='reaction'?'reaction':(def.action==='bonus'?'bonusAction':(def.action==='action'&&id!=='actionSurge'?'action':null));if(resourceKind&&resourceKind!=='reaction'&&(!currentActive()||currentActive()!==actor))return actionError(peerId,action,'Эта способность доступна только в ваш ход.');if(resourceKind&&resources(actor)[resourceKind]===false)return actionError(peerId,action,'Ресурс '+resourceKind+' уже использован.');var target=action.payload&&action.payload.targetId?findTarget(action.payload.targetId):null;var vr=validateFeatureTarget(actor,target,id);if(!vr.ok)return actionError(peerId,action,vr.error);var proxy=clone(profile)||{};proxy.id=profile.characterId;proxy.characterId=profile.characterId;proxy.name=profile.name;proxy.hpCurrent=actor.hp;proxy.hpMax=actor.maxHp;proxy.hp=actor.hp;proxy.maxHitPoints=actor.maxHp;proxy.hitPoints=actor.hp;proxy.turnResources=clone(actor.turnResources)||resources(actor);proxy.resources=clone(profile.resources)||{};proxy.classFeaturesState=clone(profile.classFeaturesState)||{};proxy.classes=clone(profile.classes)||[];proxy.stats=clone(profile.stats)||{};var ctx=clone(action.payload)||{};ctx.target=target;var result=global.DNDClassFeatures&&typeof global.DNDClassFeatures.useFeature==='function'?global.DNDClassFeatures.useFeature(proxy,id,ctx):{ok:false,reason:'Class feature engine unavailable.'};if(!result||!result.ok)return actionError(peerId,action,result&&result.reason||'Способность не выполнена.');if(resourceKind&&resources(actor)[resourceKind]!==false&&resourceKind!=='reaction')resources(actor)[resourceKind]=false;if(resourceKind==='reaction'&&resources(actor).reaction!==false)resources(actor).reaction=false;profile.resources=clone(proxy.resources)||{};profile.classFeaturesState=clone(proxy.classFeaturesState)||{};profile.turnResources=clone(proxy.turnResources)||{};if(proxy.hitPoints!=null)actor.hp=Math.max(0,Math.min(num(actor.maxHp,proxy.maxHitPoints||actor.maxHp),num(proxy.hitPoints)));if(target&&target.hitPoints!=null)target.hp=Math.max(0,Math.min(num(target.maxHp,target.maxHitPoints||target.maxHp),num(target.hitPoints)));var ev=commit('COMBAT_CHANGED',clone(t),peerId);save();render();sendResult(peerId,action,{ok:true,kind:'class_feature',featureId:id,featureName:def.name,message:result.message||'',result:clone(result),resources:clone(actor.turnResources),profileResources:clone(profile.resources)},ev);return result;}
  function executeMonsterActionRPC(monsterId,targetId,actionName,options){var net=global.dndNetwork,t=combat();if(!net||net.state.role!=='host')return {ok:false,error:'Monster RPC доступен только authoritative host.'};var monster=findTarget(monsterId),target=findTarget(targetId);if(!monster||monster.type==='hero')return {ok:false,error:'Монстр не найден.'};if(!target)return {ok:false,error:'Цель монстра не найдена.'};if(!global.DNDMonsters||typeof global.DNDMonsters.resolveAction!=='function')return {ok:false,error:'Monster engine недоступен.'};var action=(monster.actions||[]).find(function(a){return String(a.name)===String(actionName);});if(!action)return {ok:false,error:'Действие монстра не найдено.'};if(action.available===false)return {ok:false,error:'Действие монстра сейчас недоступно (Recharge).'};var opt=options||{},resourceKind=String(opt.resourceKind||action.resourceKind||'action');var cost=num(opt.cost,action.cost||1);if(resourceKind==='legendary'){var lr=global.DNDMonsters.consumeLegendaryAction(monster,cost);if(!lr.ok)return lr;}else if(resourceKind==='lair'){var la=global.DNDMonsters.consumeLairAction(monster,num(t.round,1));if(!la.ok)return la;}else if(resourceKind==='reaction'){monster.turnResources=monster.turnResources||{action:true,bonusAction:true,reaction:true};if(monster.turnResources.reaction===false)return {ok:false,error:'Реакция монстра уже использована.'};monster.turnResources.reaction=false;}else{monster.turnResources=monster.turnResources||{action:true,bonusAction:true,reaction:true};if(monster.turnResources.action===false)return {ok:false,error:'Действие монстра уже использовано.'};monster.turnResources.action=false;}var result=global.DNDMonsters.resolveAction(monster,target,action,options||{});if(!result)return {ok:false,error:'Monster action resolver вернул пустой результат.'};save();render();var ev=commit('COMBAT_CHANGED',clone(t),'monster:'+String(monster.id||monster.name));return {ok:true,kind:'monster_action',monsterId:monster.id,monsterName:monster.name,targetId:target.id,targetName:target.name,action:action.name,result:clone(result),revision:ev&&ev.stateRevision||0};}
  function handle(peerId,action){if(!canAct(peerId))return;if(!action||!action.type)return actionError(peerId,action||{},'Пустое действие.');switch(action.type){case'USE_FEATURE':return applyClassFeature(peerId,action);case'ATTACK':return applyAttack(peerId,action);case'CAST_SPELL':return applySpell(peerId,action);case'REACTION_RESPONSE':return handleReactionResponse(peerId,action);case'PREPARE_ACTION':return prepareAction(peerId,action);case'CANCEL_PREPARED':return cancelPrepared(peerId,action);case'DAMAGE':return applyDamage(peerId,action);case'HEAL':return applyHeal(peerId,action);case'CONDITION':return applyCondition(peerId,action);case'END_TURN':return applyEndTurn(peerId,action);case'DEATH_SAVE':return applyDeathSave(peerId,action);case'SHORT_REST':return applyNetworkRest(peerId,action,'short');case'LONG_REST':return applyNetworkRest(peerId,action,'long');default:return actionError(peerId,action,'Действие не поддерживается: '+action.type);}}
  function hello(peerId,msg,oldId){
    var net=global.dndNetwork;if(!net||net.state.role!=='host')return;
    var p=net.getPeer(peerId),oldPeer=oldId?net.getPeer(oldId):null;
    if(!p||!p.profile)return;
    if(oldPeer&&oldPeer.profile){
      // Reconnect restores the host's authoritative profile; client data is never merged back in.
      p.profile=clone(oldPeer.profile);
    }
    var t=combat();if(t&&p&&p.profile){
      var found=t.combatants.find(function(c){return c.ownerPeerId===oldId;})||t.combatants.find(function(c){return c.characterId&&String(c.characterId)===String(p.profile.characterId);})||t.combatants.find(function(c){return c.name===p.profile.name&&c.type==='hero';});
      if(found){
        found.ownerPeerId=peerId;found.characterId=p.profile.characterId;found.type='hero';
        // Preserve current authoritative combat HP/AC/resources on reconnect.
        found.maxHp=num(found.maxHp,p.profile.hpMax);found.ac=num(found.ac,p.profile.ac);resources(found);
        syncCombatantToProfile(found,p.profile);
        save();render();commit('COMBAT_CHANGED',clone(t),peerId);
      }
    }
  }
  function pendingReactionPayload(pr){
    if(!pr)return null;
    return {reactionId:pr.id,targetId:pr.target&&pr.target.id||'',targetName:pr.target&&pr.target.name||'',amount:num(pr.amount),damageType:pr.damageType||'',attackKind:pr.context&&pr.context.attackKind||'',attackTotal:pr.context&&pr.context.attackTotal,targetAc:pr.context&&pr.context.targetAc,source:pr.context&&pr.context.source||'',spellName:pr.spell&&pr.spell.name||pr.context&&pr.context.spellName||'',spellLevel:num(pr.spell&&pr.spell.level||pr.context&&pr.context.spellLevel),options:((reactionOptionsFor(pr.target,global.dndNetwork&&global.dndNetwork.getPeer(pr.target&&pr.target.ownerPeerId),pr.context)||{}).options||[]).map(function(x){return {id:x.id,name:x.label||x.name||x.id,reason:x.description||x.reason||''};}),expiresAt:pr.expiresAt};
  }
  function migratePendingPeer(oldId,newId){
    if(!oldId||!newId||String(oldId)===String(newId))return 0;
    var migrated=0;
    Object.keys(pendingReactions).forEach(function(id){var pr=pendingReactions[id];if(!pr)return;var touched=false;
      if(String(pr.target&&pr.target.ownerPeerId||'')===String(oldId)){pr.target.ownerPeerId=newId;touched=true;}
      if(String(pr.attackerPeerId||'')===String(oldId)){pr.attackerPeerId=newId;touched=true;}
      if(touched){migrated++;if(pr.target&&String(pr.target.ownerPeerId)===String(newId)&&global.dndNetwork&&global.dndNetwork.sendReactionRequest){var payload=pendingReactionPayload(pr);if(payload)global.dndNetwork.sendReactionRequest(newId,payload);}}
    });
    return migrated;
  }
  function flushPendingReactions(reason){
    var ids=Object.keys(pendingReactions),results=[];
    ids.forEach(function(id){var pr=pendingReactions[id];if(!pr)return;
      // A handoff must never snapshot a half-applied reaction transaction. Resolve it
      // with the deterministic "no reaction" path before the new authority is fenced.
      if(pr.kind==='spell')results.push(applyPendingReaction(id,'none'));
      else results.push(applyPendingReaction(id,'none'));
    });
    return {reason:reason||'',count:ids.length,results:results};
  }
  function clearPreparedActions(){var t=combat(),count=0;if(!t)return 0;(t.combatants||[]).forEach(function(c){if(c&&c.preparedAction){var peer=global.dndNetwork&&global.dndNetwork.getPeer(c.ownerPeerId),profile=profileForPeer(peer);refundPreparedSpell(profile,c.preparedAction);c.preparedAction=null;count++;}});return count;}
  global.dndNetworkGameplayPeerDisconnect=function(peerId){
    // Never leave an accepted attack/spell suspended forever because the reaction
    // owner vanished. Finalize through the same authoritative no-reaction path.
    Object.keys(pendingReactions).forEach(function(id){var pr=pendingReactions[id];if(!pr)return;var owner=(pr.target&&pr.target.ownerPeerId)||pr.attackerPeerId;if(String(owner)===String(peerId))applyPendingReaction(id,'none');});
  };
  global.dndNetworkGameplayPeerHello=function(peerId,msg,oldId){if(oldId)migratePendingPeer(oldId,peerId);return hello(peerId,msg,oldId);};
  global.dndNetworkGameplayPrepareHostHandoff=function(){return flushPendingReactions('host_handoff');};
  global.dndNetworkGameplayRoomShutdown=function(){var reactions=Object.keys(pendingReactions).length;pendingReactions={};var prepared=clearPreparedActions();return {pendingReactions:reactions,preparedActions:prepared};};
  global.dndNetworkGameplayPendingReactions=function(){return Object.keys(pendingReactions).map(function(id){var p=pendingReactions[id];return {id:id,kind:p&&p.kind||'',targetPeerId:p&&p.target&&p.target.ownerPeerId||'',attackerPeerId:p&&p.attackerPeerId||'',expiresAt:p&&p.expiresAt||0,transactionRevision:num(p&&p.transactionRevision,0),resourceRevision:num(p&&p.resourceRevision,0)};});};
  global.dndNetworkGameplayMonsterAction=function(monsterId,targetId,actionName,options){return executeMonsterActionRPC(monsterId,targetId,actionName,options);};
  global.dndNetworkGameplayMonsterState=function(){var t=combat();return (t&&t.combatants||[]).filter(function(c){return c&&c.type!=='hero';}).map(function(c){return {id:c.id,name:c.name,rechargeState:clone(c.rechargeState)||{},legendaryActionCurrent:c.legendaryActionCurrent,legendaryResistanceCurrent:c.legendaryResistanceCurrent,lairActionState:clone(c.lairActionState)||null};});};
  global.dndNetworkAddPlayerToInitiative=function(peerId){
    var net=global.dndNetwork;if(!net||net.state.role!=='host')return;var p=net.getPeer(peerId);if(!p||!p.profile)return;var t=combat();if(!t)return alert('Сначала создайте/запустите инициативу.');if(t.combatants.some(function(c){return c.ownerPeerId===peerId||String(c.characterId)===String(p.profile.characterId);}))return alert('Этот игрок уже добавлен в инициативу.');if(typeof global.addInitiativeCombatant!=='function')return;
    var dex=abilityMod((p.profile.stats||{}).dex),ini=dex+Math.floor(Math.random()*20)+1;global.addInitiativeCombatant(p.profile.name||'Игрок',false,ini,Number(p.profile.hpCurrent)||0,Number(p.profile.hpMax)||0,Number(p.profile.ac)||10,'hero');t=combat();var c=t.combatants.find(function(x){return x.name===p.profile.name&&x.type==='hero'&&!x.ownerPeerId;});if(c){c.ownerPeerId=peerId;c.characterId=p.profile.characterId||'';c.team='party';c.maxHp=Number(p.profile.hpMax)||c.maxHp;c.hp=Number(p.profile.hpCurrent!=null?p.profile.hpCurrent:c.hp);c.ac=Number(p.profile.ac)||c.ac;c.speed=30;resources(c);}save();render();if(net.commitHostEvent)commit('COMBAT_CHANGED',clone(t),'master');
  };
  global.dndNetworkGameplayEvent=function(ev){if(ev&&ev.type==='COMBAT_CHANGED'&&typeof global.dndNetworkGameplayRender==='function')global.dndNetworkGameplayRender();};
  global.dndNetworkGameplaySnapshot=function(){if(typeof global.dndNetworkGameplayRender==='function')global.dndNetworkGameplayRender();};
  global.dndNetworkGameplayResult=function(result){if(result&&(result.kind==='reaction_resolved'||result.kind==='spell_countered'||result.kind==='action_error'))clearReactionWindow();var box=document.getElementById('dndNetworkGameplayLog');if(!box)return;var text=result&&result.error?('❌ '+result.error):(result&&result.kind?('✅ '+result.kind+' • '+(result.target||result.spell||'')):'🎲 Результат');var row=document.createElement('div');row.style.cssText='padding:5px 0;border-bottom:1px solid #333;color:#ccc;font-size:.78em;';row.textContent=text;box.prepend(row);while(box.children.length>8)box.removeChild(box.lastChild);};
  global.dndNetworkGameplayRender=function(){
    var el=document.getElementById('dndNetworkGameplayStatus'),t=combat(),active=currentActive();if(el){var who=active&&active.name||'—';var r=active&&active.turnResources,pl=active&&active.preparedAction;el.textContent=t?'Раунд '+num(t.round,1)+' • активен: '+who+(r?' • A:'+(r.action?'✓':'—')+' BA:'+(r.bonusAction?'✓':'—')+' R:'+(r.reaction?'✓':'—'):'')+(pl?' • 📋 план готов':''):'Бой не запущен';}
    var list=document.getElementById('dndNetworkTargetSelect');if(list&&t){var old=list.value;list.innerHTML=t.combatants.map(function(c){return '<option value="'+String(c.id).replace(/"/g,'&quot;')+'">'+String(c.name).replace(/[&<>"']/g,function(x){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x];})+' • HP '+num(c.hp)+'/'+num(c.maxHp)+(c.defeated?' • 💀':'')+'</option>';}).join('');if(old)list.value=old;}
    var ws=document.getElementById('dndNetworkWeaponSelect'),h=hero();if(ws&&h){var arr=Array.isArray(h.weaponsData)?h.weaponsData:(Array.isArray(h.weapons)?h.weapons:[]);var prev=ws.value;ws.innerHTML=arr.map(function(w,i){return '<option value="'+i+'">'+String(w.name||('Оружие '+(i+1))).replace(/[&<>"']/g,function(x){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x];})+'</option>';}).join('')||'<option value="">Нет оружия</option>';if(prev)ws.value=prev;}
    var st=document.getElementById('dndNetworkPlayerActionStatus');if(st&&global.dndNetwork){var a=currentActive();var mine=a&&a.ownerPeerId&&global.dndNetwork.state.role==='player';st.textContent=global.dndNetwork.state.connected?(mine?'Ваш ход • A/BA/R доступны по правилам':'Подключено • ждём вашего хода'):'Подключитесь к мастеру';}
  };
  global.dndNetworkGameplayExecutePreparedGroup=function(){var r=executePreparedGroup();if(r.ok&&global.dndNetwork)commit('COMBAT_CHANGED',clone(combat()),'master');if(typeof global.dndNetworkGameplayRender==='function')global.dndNetworkGameplayRender();return r;};
  global.dndNetworkGameplayNext=function(){if(global.dndNetwork&&global.dndNetwork.state.role==='host'){var t=combat();if(!t||!t.combatants.length)return;advanceTurn(t);save();render();commit('COMBAT_CHANGED',clone(t),'master');global.dndNetworkGameplayRender();}};
  global.dndNetworkGameplaySync=function(){if(global.dndNetwork)global.dndNetwork.requestSync();};
  global.dndNetworkPlayerEndTurn=function(){if(global.dndNetwork)global.dndNetwork.playerAction('END_TURN',{});};
  global.dndNetworkPlayerDeathSave=function(){if(global.dndNetwork)global.dndNetwork.playerAction('DEATH_SAVE',{});};
  global.dndNetworkPlayerAttack=function(targetId,weapon){if(global.dndNetwork)global.dndNetwork.playerAction('ATTACK',{targetId:targetId,weaponId:weapon&&weapon.id||'',weaponName:weapon&&weapon.name||'',weapon:clone(weapon)||{}});};
  global.dndNetworkPlayerAttackSelected=function(){var h=hero(),ws=document.getElementById('dndNetworkWeaponSelect'),ts=document.getElementById('dndNetworkTargetSelect');if(!global.dndNetwork||!h||!ws||!ts)return;var sourceWeapons=Array.isArray(h.weaponsData)?h.weaponsData:(Array.isArray(h.weapons)?h.weapons:[]);var w=sourceWeapons[Number(ws.value)];if(w&&w.diceSides){var stat=String(w.stat||'str').toLowerCase(),stats=h.stats||{},sm=abilityMod(stats[stat]),pb=global.DNDRules&&global.DNDRules.profBonus?global.DNDRules.profBonus(h):2,atk=sm+(w.proficient===false?0:pb)+num(w.extraAtk,0),db=sm+num(w.extraDmg,0);w={id:w.id,name:w.name,attackBonus:atk,damage:String(w.diceCount||1)+String(w.diceSides||'d6')+(db?((db>0?'+':'')+db):''),damageType:w.damageType||''};}if(!w)return alert('Не выбрано оружие.');global.dndNetworkPlayerAttack(ts.value,w);};
  global.dndNetworkPlayerDamage=function(){alert('Урон применяет мастер — игрок отправляет только атаку/заклинание.');};
  global.dndNetworkPlayerHeal=function(){alert('Лечение применяет мастер или соответствующее заклинание.');};
  global.dndNetworkPlayerCondition=function(){alert('Состояния применяет мастер или соответствующее игровое действие.');};
  global.dndNetworkPrepareAttack=function(targetId,weapon,extra){if(global.dndNetwork)global.dndNetwork.playerAction('PREPARE_ACTION',Object.assign({targetId:targetId,weaponId:weapon&&weapon.id||'',weaponName:weapon&&weapon.name||'',weapon:clone(weapon)||{},rangeFt:num(weapon&&weapon.rangeFt,5),type:'ATTACK'},extra||{}));};
  global.dndNetworkPrepareSpell=function(spell,extra){if(global.dndNetwork)global.dndNetwork.playerAction('PREPARE_ACTION',Object.assign({spellName:spell.name,spell:clone(spell),type:'CAST_SPELL'},extra||{}));};
  global.dndNetworkCancelPrepared=function(){if(global.dndNetwork)global.dndNetwork.playerAction('CANCEL_PREPARED',{});};
  global.dndNetworkPlayerSpell=function(){var ts=document.getElementById('dndNetworkTargetSelect'),h=hero();if(!ts||!h||!global.dndNetwork)return;var spells=Array.isArray(h.spellsData)?h.spellsData.filter(function(s){return s.name;}):[];if(!spells.length)return alert('У персонажа нет добавленных заклинаний.');var names=spells.map(function(s,i){return i+': '+s.name+' (ур. '+(Number(s.level)||0)+')';}).join('\n');var idx=Number(prompt('Заклинание:\n'+names,'0'));if(!isFinite(idx)||!spells[idx])return;var sp=clone(spells[idx]);global.dndNetwork.playerAction('CAST_SPELL',{targetId:ts.value,spellName:sp.name,attack:!!sp.attackType});};
  if(global.addEventListener)global.addEventListener('DOMContentLoaded',function(){if(global.dndNetwork&&global.dndNetwork.registerActionHandler)global.dndNetwork.registerActionHandler(handle);setTimeout(injectPanel,250);});
  function injectPanel(){
    var hostPanel=document.getElementById('dndNetworkHostPanel'),joinPanel=document.getElementById('dndNetworkJoinPanel');if(!hostPanel||!joinPanel)return;
    if(!document.getElementById('dndNetworkGameplayCard')){var card=document.createElement('div');card.id='dndNetworkGameplayCard';card.style.cssText='margin-top:12px;background:#171717;border:1px solid #3f3f3f;border-radius:8px;padding:10px;';card.innerHTML='<strong style="color:#d4af37">⚔️ Авторитетный бой</strong><div id="dndNetworkGameplayStatus" style="color:#aaa;font-size:.82em;margin-top:6px;">Бой не запущен</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px;"><button class="btn-action" onclick="dndNetworkGameplayNext()">▶ Следующий ход</button><button class="btn-action" onclick="dndNetworkGameplaySync()">🔄 Sync</button><button class="btn-action" style="grid-column:1 / -1;background:#6a1b9a" onclick="dndTurnPlannerOpen()">📋 Спланировать действие</button></div><div id="dndNetworkGameplayLog" style="margin-top:8px;max-height:130px;overflow:auto;"></div>';hostPanel.querySelector('div').appendChild(card);}
    if(!document.getElementById('dndNetworkPlayerActions')){var box=document.createElement('div');box.id='dndNetworkPlayerActions';box.style.cssText='margin-top:12px;background:#171717;border:1px solid #3f3f3f;border-radius:8px;padding:10px;';box.innerHTML='<strong style="color:#d4af37">⚔️ Действия игрока</strong><div id="dndNetworkPlayerActionStatus" style="color:#aaa;font-size:.82em;margin-top:6px;">Подключитесь к мастеру</div><select id="dndNetworkTargetSelect" style="width:100%;margin-top:7px;padding:8px;background:#222;color:#fff;border:1px solid #444;border-radius:5px;"></select><select id="dndNetworkWeaponSelect" style="width:100%;margin-top:7px;padding:8px;background:#222;color:#fff;border:1px solid #444;border-radius:5px;"></select><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px;"><button class="btn-action" onclick="dndNetworkPlayerAttackSelected()">🎯 Атака</button><button class="btn-action" onclick="dndNetworkPlayerSpell()">✨ Заклинание</button><button class="btn-action" onclick="dndNetworkPlayerEndTurn()">▶ Конец хода</button><button class="btn-action" onclick="dndNetworkPlayerDeathSave()">💀 Death Save</button></div><div id="dndNetworkPreparedHint" style="color:#777;font-size:.75em;margin-top:7px;">Урон, лечение и состояния применяет мастер. Ресурсы действия и spell slots проверяются мастером.</div></div>';joinPanel.querySelector('div').appendChild(box);}
    global.dndNetworkGameplayRender();
  }
})(window);
