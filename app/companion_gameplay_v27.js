/**
 * companion_gameplay_v27.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * VTT-геймплей v27 для универсальных компаньонов и призванных существ.
 * Он расширяет v26, не заменяя базовый summoning/secondary runtime.
 *
 * КАК РАБОТАЕТ:
 * - выбирает реальную цель через выбранный токен Battle Board;
 * - проверяет дальность и линию видимости перед атакой;
 * - расходует Action спутника на атаку;
 * - поддерживает движение компаньона по pathfinding Battle Board;
 * - добавляет простой runtime для Ferocity Beastheart;
 * - показывает компактный stat block и боевые кнопки без prompt.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * entityId, targetId, actionIndex, rangeFt, distanceFt, pathCost,
 * turnResources, ferocity, companionType, ownerId.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(g){
  'use strict';
  function hero(){return g.currentChar||g.currentCharacter||null;}
  function tracker(){var h=hero();return h&&h.initiativeTracker||null;}
  function entity(id){return g.DNDSecondaryEntities&&g.DNDSecondaryEntities.get?g.DNDSecondaryEntities.get(id):null;}
  function findCombatant(id){var t=tracker();return t&&Array.isArray(t.combatants)?t.combatants.find(function(c){return String(c.id)===String(id);})||null:null;}
  function selectedToken(){return g.DNDBattleBoard&&g.DNDBattleBoard.getSelectedToken?g.DNDBattleBoard.getSelectedToken():null;}
  function tokenForEntity(e){return e&&g.DNDSecondaryEntities&&g.DNDSecondaryEntities.getToken?g.DNDSecondaryEntities.getToken(e.id):null;}
  function ownerCombatant(e){return e&&findCombatant(e.ownerId);}
  function selectedTarget(e){
    var tok=selectedToken();
    if(!tok)return null;
    var sourceId=tok.sourceId||tok.entityId;
    if(!sourceId)return null;
    var c=findCombatant(sourceId);
    if(!c||c.defeated)return null;
    if(String(c.id)===String('summon_'+e.id))return null;
    if(String(c.team||'')===String(e.team||'party'))return null;
    return {combatant:c,token:tok};
  }
  function rangeCheck(e,target,action){
    var a=tokenForEntity(e),b=target&&target.token;
    if(!a||!b||!g.DNDBattleBoard)return {ok:false,reason:'no_vtt'};
    var range=Number(action.rangeFt==null?5:action.rangeFt)||5;
    var distance=g.DNDBattleBoard.distanceFt(a,b);
    var los=g.DNDBattleBoard.lineOfSight(a,b);
    return {ok:distance<=range&&los.clear,distance:distance,range:range,los:los};
  }
  function consumeAction(c){if(!c)return false;if(c.turnResources&&c.turnResources.action===false)return false;if(c.turnResources)c.turnResources.action=false;return true;}
  function ensureState(e){e.metadata=e.metadata||{};e.resources=e.resources||{};return e;}
  function gainFerocity(e,amount){
    if(e.companionType!=='beastheart')return null;
    ensureState(e);
    var cur=Number(e.resources.ferocity)||0,max=Number(e.resources.ferocityMax)||9999;
    cur=Math.min(max,Math.max(0,cur+Math.max(0,Number(amount)||0)));
    e.resources.ferocity=cur;
    if(g.DNDSecondaryEntities)g.DNDSecondaryEntities.update(e.id,{resources:e.resources});
    var h=hero();
    if(h&&e.companionType==='beastheart'){
      h.resources=h.resources||{};h.resources.beastheartFerocity=h.resources.beastheartFerocity||{};
      h.resources.beastheartFerocity.max=max;h.resources.beastheartFerocity.current=cur;h.resources.beastheartFerocity.recharge='encounter';
    }
    return cur;
  }
  function attack(id,targetId,index,flags){
    var h=hero(),e=entity(id);if(!e)return {ok:false,reason:'not_found'};
    var t=findCombatant(targetId);if(!t)return {ok:false,reason:'target_not_found'};
    if(String(t.team||'')===String(e.team||'party')&&!(flags&&flags.allowFriendly))return {ok:false,reason:'friendly_target'};
    var action=(e.actions||[])[Number(index)||0];if(!action)return {ok:false,reason:'action_not_found'};
    var targetToken=g.DNDBattleBoard&&g.DNDBattleBoard.findToken?g.DNDBattleBoard.findToken('bt_'+String(targetId)):null;
    if(!targetToken&&g.DNDBattleBoard&&g.DNDBattleBoard.findToken)targetToken=g.DNDBattleBoard.findToken(targetId);
    var sourceToken=tokenForEntity(e);
    if(!sourceToken||!targetToken||!g.DNDBattleBoard)return {ok:false,reason:'no_vtt'};
    var chk=rangeCheck(e,{combatant:t,token:targetToken},action);
    if(!chk.ok)return {ok:false,reason:chk.los&&!chk.los.clear?'los_blocked':'out_of_range',distance:chk.distance,range:chk.range};
    var c=findCombatant('summon_'+e.id);if(!c)return {ok:false,reason:'combatant_not_found'};
    if(e.companionType==='homunculus'){var ownerActor=ownerCombatant(e);if(!ownerActor||!ownerActor.turnResources||!ownerActor.turnResources.bonusAction)return {ok:false,reason:'owner_bonus_action_used'};c.turnResources=c.turnResources||{};if(c.turnResources.reaction===false)return {ok:false,reason:'reaction_used'};ownerActor.turnResources.bonusAction=false;c.turnResources.reaction=false;}else if(!consumeAction(c))return {ok:false,reason:'action_used'};
    var rampage=!!(e.companionType==='beastheart'&&e.metadata&&e.metadata.rampage),fer=Number(e.resources&&e.resources.ferocity)||0,owner=ownerCombatant(e),bond=h&&h.classFeaturesState&&h.classFeaturesState.companionBond,extra=rampage?(bond==='ferocious'&&Number(e.beastheartLevel||1)>=11?fer:Math.floor(fer/2)):0;
    var dmg=action.damage||'1d4';
    var queued=(e.metadata&&Array.isArray(e.metadata.nextAttackExtraDice))?e.metadata.nextAttackExtraDice.slice():[];
    if(queued.length)dmg=dmg+'+'+queued.join('+');
    if(extra>0)dmg=dmg+'+'+extra;
    var opts={bonus:Number(action.attackBonus)||0,damage:dmg,damageType:action.damageType||'',target:t,usesStrength:true,meleeOrThrown:true};
    if(rampage&&bond==='ferocious'&&Number(e.beastheartLevel||1)>=11&&owner&&g.DNDBattleBoard&&sourceToken){
      var ot=g.DNDBattleBoard.findToken('bt_'+String(owner.id))||g.DNDBattleBoard.findToken(owner.id);if(ot&&g.DNDBattleBoard.distanceFt(sourceToken,targetToken)<=5)opts.advantage=true;
    }
    if(Number(action.rangeFt)>5)opts.meleeOrThrown=false;
    var r=g.DNDCombat&&g.DNDCombat.attack?g.DNDCombat.attack(c,t,opts):null;
    if(!r)return {ok:false,reason:'combat_unavailable'};
    if(queued.length){e.metadata=e.metadata||{};e.metadata.nextAttackExtraDice=[];if(g.DNDSecondaryEntities&&g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{metadata:e.metadata});}
    var hit=!!r.hit;
    if(hit&&e.companionType==='beastheart'&&!rampage)gainFerocity(e,1);
    if(g.DNDSummoning&&g.DNDSummoning.sync)g.DNDSummoning.sync();
    if(typeof g.autoSaveCurrentCharacter==='function')g.autoSaveCurrentCharacter();
    if(g.DNDBattleBoard&&g.DNDBattleBoard.render)g.DNDBattleBoard.render();
    return {ok:true,result:r,action:action,target:t.id,distance:chk.distance,ferocity:e.resources&&e.resources.ferocity};
  }
  function moveToward(id,targetId){
    var e=entity(id);if(!e||!g.DNDBattleBoard)return {ok:false,reason:'not_found'};
    var c=findCombatant('summon_'+e.id);if(!c)return {ok:false,reason:'combatant_not_found'};
    if(c.turnResources&&Number(c.turnResources.movement||0)<=0)return {ok:false,reason:'movement_used'};
    var from=tokenForEntity(e),targetTok=g.DNDBattleBoard.findToken('bt_'+String(targetId))||g.DNDBattleBoard.findToken(targetId);
    if(!from||!targetTok)return {ok:false,reason:'target_not_found'};
    var path=g.DNDBattleBoard.pathCells(from,targetTok);if(!path.length)return {ok:false,reason:'path_blocked'};
    var speed=Number(e.speed)||30,cellFt=Number((tracker()||{}).battlefield&&tracker().battlefield.cellFt)||5,maxSteps=Math.floor(speed/cellFt);
    var stop=Math.max(0,Math.min(path.length-1,maxSteps));
    while(stop>0){var p=path[stop];if(p.x===targetTok.x&&p.y===targetTok.y)stop--;else break;}
    if(stop<1)return {ok:false,reason:'already_there'};
    var dest=path[stop],cost=stop*cellFt;
    g.DNDSecondaryEntities.update(e.id,{x:dest.x,y:dest.y});
    if(c.turnResources){c.turnResources.movement=Math.max(0,Number(c.turnResources.movement||0)-cost);c.turnResources.movementUsed=Number(c.turnResources.movementUsed||0)+cost;}
    if(typeof g.autoSaveCurrentCharacter==='function')g.autoSaveCurrentCharacter();
    if(g.DNDBattleBoard&&g.DNDBattleBoard.render)g.DNDBattleBoard.render();
    return {ok:true,x:dest.x,y:dest.y,cost:cost,remaining:c.turnResources&&c.turnResources.movement};
  }
  function command(id,type){
    var e=entity(id);if(!e)return null;
    var r=g.DNDSecondaryEntities&&g.DNDSecondaryEntities.command?g.DNDSecondaryEntities.command(id,type):null;
    if(r&&r.ok){ensureState(e);e.metadata.lastCommandType=type;if(g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(id,{metadata:e.metadata});}
    return r;
  }
  function beastheartStartTurn(id,ctx){
    var e=entity(id);if(!e||e.companionType!=='beastheart')return{ok:false,reason:'not_beastheart'};
    ensureState(e);var h=hero(),l=Number(e.beastheartLevel)||1;
    if(e.defeated||Number(e.hp)<=0)return{ok:false,reason:'incapacitated',gained:0,ferocity:Number(e.resources&&e.resources.ferocity)||0};
    var base=1+Math.floor(Math.random()*4),hostiles=0,targetList=(h&&h.initiativeTracker&&h.initiativeTracker.combatants)||[],tok=tokenForEntity(e),nearest=null,nearestDist=Infinity;
    if(tok&&g.DNDBattleBoard&&typeof g.DNDBattleBoard.distanceFt==='function'){
      targetList.forEach(function(c){
        if(!c||String(c.team||'')===String(e.team||'party')||c.defeated)return;
        var tt=g.DNDBattleBoard.findToken('bt_'+String(c.id))||g.DNDBattleBoard.findToken(c.id);
        if(!tt)return;
        var d=g.DNDBattleBoard.distanceFt(tok,tt);
        if(d<=5)hostiles++;
        if(d<nearestDist){nearestDist=d;nearest={combatant:c,token:tt};}
      });
    }
    var bonus=l>=15?5:l>=10?3:l>=5?1:0,gained=base+hostiles+bonus;
    gainFerocity(e,gained);e.resources.ferocity=e.resources.ferocity||0;
    var out={ok:true,gained:gained,ferocity:e.resources.ferocity,rampage:false};
    if(Number(e.resources.ferocity)>=10&&!e.metadata.rampage){
      var wis=0,pb=Number(h&&h.proficiencyBonus)||2,ab=h&&h.abilities&&h.abilities.wisdom;
      if(ab!=null)wis=Math.floor((Number(ab)-10)/2);
      var dc=5+Number(e.resources.ferocity),roll=Math.floor(Math.random()*20)+1+pb+wis;
      out.rampageCheck={dc:dc,total:roll,success:roll>=dc};
      if(roll<dc){
        e.metadata.rampage=true;out.rampage=true;
        if(nearest){
          var rr=attack(e.id,nearest.combatant.id,0,{allowFriendly:true});
          out.rampageAttack=rr;
          if(rr&&rr.ok){
            var keep=(String(h&&h.classFeaturesState&&h.classFeaturesState.companionBond)==='ferocious'&&l>=7)?4:0;
            e.resources.ferocity=keep;e.metadata.rampage=false;out.ferocityAfterRampage=keep;
          }
        }else{
          out.rampagePending=true;
        }
      }
      if(g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{resources:e.resources,metadata:e.metadata});
    }else if(g.DNDSecondaryEntities.update){
      g.DNDSecondaryEntities.update(e.id,{resources:e.resources,metadata:e.metadata});
    }
    return out;
  }
  function beastheartEndTurn(id){
    var e=entity(id);if(!e||e.companionType!=='beastheart')return{ok:false,reason:'not_beastheart'};
    ensureState(e);if(!e.metadata.rampage)return{ok:true,rampage:false,ferocity:Number(e.resources&&e.resources.ferocity)||0};
    var h=hero(),l=Number(e.beastheartLevel)||1;
    var keep=(h&&h.classFeaturesState&&h.classFeaturesState.companionBond==='ferocious'&&l>=7)?4:0;
    e.resources.ferocity=keep;e.metadata.rampage=false;e.metadata.rampagePending=false;
    if(g.DNDSecondaryEntities&&g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{resources:e.resources,metadata:e.metadata});
    if(h){h.resources=h.resources||{};h.resources.beastheartFerocity=h.resources.beastheartFerocity||{};h.resources.beastheartFerocity.max=Number(e.resources.ferocityMax)||9999;h.resources.beastheartFerocity.current=keep;h.resources.beastheartFerocity.recharge='encounter';}
    return{ok:true,rampage:false,ferocity:keep};
  }
  function resetTurn(c){if(!c)return;c.turnResources=c.turnResources||{};c.turnResources.action=true;c.turnResources.bonusAction=true;c.turnResources.reaction=true;c.turnResources.movement=Number(c.speed)||30;c.turnResources.movementUsed=0;}
  function render(){
    var box=document.getElementById('battleBoardSummonPanel');if(!box)return;
    var list=g.DNDSecondaryEntities?g.DNDSecondaryEntities.list():[];if(!list.length)return;
    var target=selectedToken();
    var old=document.getElementById('v27CompanionGameplay');if(old)old.remove();
    var wrap=document.createElement('div');wrap.id='v27CompanionGameplay';wrap.style.cssText='margin-top:7px;padding-top:7px;border-top:1px solid #333';
    var targetName=target&&target.name?target.name:'цель не выбрана';
    var title=document.createElement('div');title.style.cssText='font-size:.78em;color:#aaa;margin-bottom:5px';title.textContent='🎯 Цель VTT: '+targetName+' • выбери врага на поле, затем действие спутника';wrap.appendChild(title);
    list.forEach(function(e){
      var card=document.createElement('div');card.style.cssText='padding:6px;margin:4px 0;border:1px solid #2f2f2f;border-radius:6px';
      var stat=document.createElement('div');stat.innerHTML='<strong>'+String(e.name||'Спутник')+'</strong> • HP '+Number(e.hp||0)+'/'+Number(e.maxHp||0)+' • КД '+Number(e.ac||10)+' • '+Number(e.speed||0)+' фт.'+(e.companionType==='beastheart'?' • 🐾 Ferocity '+Number(e.resources&&e.resources.ferocity||0)+'/'+Number(e.resources&&e.resources.ferocityMax||9999):'');card.appendChild(stat);
      var actions=document.createElement('div');actions.style.cssText='display:flex;gap:4px;flex-wrap:wrap;margin-top:5px';
      (e.actions||[]).forEach(function(a,i){var b=document.createElement('button');b.className='btn-action';b.style.padding='5px';b.textContent='⚔️ '+a.name+' ('+(a.rangeFt||5)+' фт.)';b.onclick=function(){var tok=selectedToken();var targetId=tok&&(tok.sourceId||tok.entityId);if(!targetId){alert('Сначала выбери врага на Поле боя.');return;}var r=attack(e.id,targetId,i);if(!r.ok)alert('Нельзя выполнить: '+(r.reason==='out_of_range'?'цель вне дальности':r.reason==='los_blocked'?'линия видимости заблокирована':r.reason==='action_used'?'Действие уже потрачено':r.reason));};actions.appendChild(b);});
      var mv=document.createElement('button');mv.className='btn-action';mv.style.padding='5px';mv.textContent='↔️ Идти к выбранному';mv.onclick=function(){var tok=selectedToken();var targetId=tok&&(tok.sourceId||tok.entityId);if(!targetId){alert('Выбери токен назначения.');return;}var r=moveToward(e.id,targetId);if(!r.ok)alert('Движение: '+r.reason);};actions.appendChild(mv);
      var own=document.createElement('button');own.className='btn-action';own.style.padding='5px';own.textContent='🏃 К хозяину';own.onclick=function(){var o=ownerCombatant(e);if(o){var r=moveToward(e.id,o.id);if(!r.ok)alert('Движение: '+r.reason);}};actions.appendChild(own);
      if(e.companionType==='beastheart'){
        var fs=document.createElement('button');fs.className='btn-action';fs.style.padding='5px';fs.textContent='🐾 Ferocious Strike';fs.onclick=function(){var cur=Number(e.resources&&e.resources.ferocity||0);if(cur<1){alert('Недостаточно Ferocity.');return;}var tok=selectedToken(),tid=tok&&(tok.sourceId||tok.entityId);if(!tid){alert('Выбери врага.');return;}e.resources.ferocity=cur-1;e.metadata=e.metadata||{};e.metadata.nextAttackExtraDice=['1d8'];g.DNDSecondaryEntities.update(e.id,{resources:e.resources,metadata:e.metadata});alert('Следующая атака компаньона получает +1d8.');};actions.appendChild(fs);
      }
      card.appendChild(actions);wrap.appendChild(card);
    });
    box.appendChild(wrap);
  }
  function patchAttack(){
    if(!g.DNDSummoning||g.DNDSummoning.__v27)return;
    var original=g.DNDSummoning.attack;
    g.DNDSummoning.attack=function(id,targetId,index){return attack(id,targetId,index);};
    g.DNDSummoning.__v27=true;g.DNDSummoning.moveToward=moveToward;g.DNDSummoning.resetTurn=resetTurn;g.DNDSummoning.beastheartStartTurn=beastheartStartTurn;g.DNDSummoning.beastheartEndTurn=beastheartEndTurn;g.DNDSummoning.renderV27=render;
  }
  function hook(){
    patchAttack();
    if(g.DNDCompanionPacks&&typeof g.DNDCompanionPacks.render==='function'&&!g.DNDCompanionPacks.__v27Wrapped){
      var baseRender=g.DNDCompanionPacks.render;
      g.DNDCompanionPacks.render=function(){baseRender();render();};
      g.DNDCompanionPacks.__v27Wrapped=true;
    }
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
  g.DNDCompanionGameplayV27={VERSION:'1.2.0',attack:attack,moveToward:moveToward,command:command,render:render,gainFerocity:gainFerocity,beastheartStartTurn:beastheartStartTurn,beastheartEndTurn:beastheartEndTurn};
})(window);
