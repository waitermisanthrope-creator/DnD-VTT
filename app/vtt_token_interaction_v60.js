/**
 * vtt_token_interaction_v60.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО: мобильный слой взаимодействия с токенами поверх существующего
 * battle_board.js и combat_engine.js.
 * КАК РАБОТАЕТ: хранит actor/target UI-состояние, позволяет выбирать
 * токены касанием, назначать цель и выполнять быстрые атаки через
 * существующий DNDCombat.attack. Не создаёт второй combat/map engine.
 * ПУБЛИЧНЫЕ API: DNDTokenInteractionV60, dndV60SelectActor,
 * dndV60SelectTarget, dndV60QuickAttack.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var VERSION='60.0.0';
  var state={actorId:null,targetId:null,targetMode:false,open:false};
  function hero(){return global.currentChar||global.currentCharacter||null;}
  function tracker(){var h=hero();return h&&h.initiativeTracker||null;}
  function combatants(){var t=tracker();return t&&Array.isArray(t.combatants)?t.combatants:[];}
  function byId(id){return combatants().find(function(c){return String(c.id)===String(id);})||null;}
  function token(id){return global.DNDBattleBoard&&global.DNDBattleBoard.findToken?global.DNDBattleBoard.findToken(id):null;}
  function combatantFromTokenId(id){var t=token(id);return t?byId(t.sourceId):null;}
  function esc(v){return typeof global.escapeDndHtml==='function'?global.escapeDndHtml(v):String(v==null?'':v).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c];});}
  function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();}
  function eventLog(type,payload){var h=hero();if(!h)return;if(!Array.isArray(h.gameplayEvents))h.gameplayEvents=[];h.gameplayEvents.push({id:'evt60_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),type:type,at:new Date().toISOString(),payload:payload||{}});if(h.gameplayEvents.length>100)h.gameplayEvents=h.gameplayEvents.slice(-100);save();}
  function selectedActor(){return state.actorId?byId(state.actorId):null;}
  function selectedTarget(){return state.targetId?byId(state.targetId):null;}
  function attacksFor(c){if(!c)return [];var a=Array.isArray(c.attacks)?c.attacks:[];if(!a.length&&Array.isArray(c.actions))a=c.actions.filter(function(x){return x&&(x.damage||x.damageDice||x.attackBonus!=null||x.bonus!=null);}).map(function(x){return {name:x.name||'Атака',bonus:x.bonus!=null?x.bonus:x.attackBonus,damage:x.damage||x.damageDice||'1d6',type:x.type||x.damageType||''};});return a;}
  function selectActor(id){state.actorId=String(id||'').replace(/^bt_/,'');state.targetMode=false;update();}
  function selectTarget(id){state.targetId=String(id||'').replace(/^bt_/,'');state.targetMode=false;update();}
  function chooseTargetMode(){state.targetMode=true;update();}
  function quickAttack(index){var a=selectedActor(),t=selectedTarget(),list=attacksFor(a);if(!a||!t||!global.DNDCombat||typeof global.DNDCombat.attack!=='function')return {ok:false,error:'Нет боевого движка или участника.'};var atk=list[index||0];if(!atk)return {ok:false,error:'У участника нет атаки.'};var dist=global.DNDBattleBoard&&global.DNDBattleBoard.distanceFt?global.DNDBattleBoard.distanceFt(token('bt_'+a.id),token('bt_'+t.id)):0;var range=Number(atk.rangeFt||atk.range||0);if(range>0&&dist>range)return {ok:false,error:'Цель вне заявленной дальности ('+range+' фт.).'};var result;if(global.DNDGameplayV57&&typeof global.DNDGameplayV57.executeAttack==='function'){result=global.DNDGameplayV57.executeAttack(a,t,{bonus:Number(atk.bonus||0),damage:atk.damage||'1d6',damageType:atk.type||atk.damageType||'',target:t,weapon:atk});}else{result=global.DNDCombat.attack(a,t,{bonus:Number(atk.bonus||0),damage:atk.damage||'1d6',damageType:atk.type||atk.damageType||'',target:t,weapon:atk});}
    if(result&&result.damageResult&&t.type==='hero'&&hero()===t){hero().hpCurrent=t.hp;}
    eventLog('TOKEN_ATTACK_V60',{actorId:a.id,targetId:t.id,attack:atk.name||'Атака',result:{d20:result.d20,total:result.total,ac:result.ac,hit:result.hit,damage:result.damage&&result.damage.total||0,critical:!!result.critical},distanceFt:dist});
    if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();if(global.DNDBattleBoard&&global.DNDBattleBoard.render)global.DNDBattleBoard.render();update();
    return {ok:true,result:result,attack:atk};
  }
  function open(){state.open=true;render();}
  function close(){state.open=false;var el=document.getElementById('dndV60TokenSheet');if(el)el.style.display='none';}
  function render(){var el=document.getElementById('dndV60TokenSheet');if(!el){initUi();el=document.getElementById('dndV60TokenSheet');}if(!el)return;el.style.display=state.open?'block':'none';var a=selectedActor(),t=selectedTarget(),box=document.getElementById('dndV60TokenContent');if(!box)return;var html='<div style="font-weight:700;color:#d4af37;margin-bottom:8px">🎯 Взаимодействие V60</div>';
    html+='<div style="font-size:.82em;color:#aaa;margin-bottom:8px">Актор: <strong style="color:#fff">'+esc(a?a.name:'не выбран')+'</strong><br>Цель: <strong style="color:#fff">'+esc(t?t.name:'не выбрана')+'</strong></div>';
    html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><button class="btn-action" onclick="dndV60ChooseTarget()" style="background:#6a1b9a">🎯 '+(state.targetMode?'Выберите токен':'Выбрать цель')+'</button><button class="btn-action" onclick="dndV60ClearTarget()" style="background:#555">Сбросить цель</button></div>';
    if(a){var list=attacksFor(a);if(list.length){html+='<div style="margin-top:8px;color:#aaa;font-size:.78em">Быстрая атака</div>';list.slice(0,6).forEach(function(x,i){html+='<button class="btn-action" onclick="dndV60QuickAttack('+i+')" style="width:100%;margin-top:5px;background:#8b4513;text-align:left">⚔️ '+esc(x.name||'Атака')+' <span style="float:right">+'+Number(x.bonus||0)+' • '+esc(x.damage||'1d6')+'</span></button>';});}else html+='<div style="margin-top:8px;color:#888">У выбранного участника нет структурированных атак.</div>';}
    if(t){html+='<div style="margin-top:9px;padding:7px;background:#171717;border-radius:6px;font-size:.8em;color:#bbb">HP '+Number(t.hp||0)+'/'+Number(t.maxHp||0)+' • КД '+Number(t.ac||10)+(t.defeated?' • 💀 повержен':'')+'</div>';}
    box.innerHTML=html;
  }
  function initUi(){var el=document.createElement('div');el.id='dndV60TokenSheet';el.style.cssText='display:none;position:fixed;left:8px;right:8px;bottom:8px;z-index:29500;background:#202020;color:#fff;border:1px solid #555;border-radius:12px;padding:10px;box-shadow:0 8px 30px rgba(0,0,0,.6);max-height:48vh;overflow:auto;box-sizing:border-box;touch-action:manipulation;';el.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center"><span style="color:#aaa;font-size:.75em">Touch-first Battle UX</span><button class="btn-action" onclick="dndV60Close()" style="padding:4px 8px;background:#e53935">✕</button></div><div id="dndV60TokenContent"></div>';document.body.appendChild(el);}
  global.dndV60SelectActor=selectActor;global.dndV60SelectTarget=selectTarget;global.dndV60ChooseTarget=chooseTargetMode;global.dndV60QuickAttack=function(i){var r=quickAttack(i);if(!r.ok&&global.alert)global.alert(r.error);return r;};global.dndV60ClearTarget=function(){state.targetId=null;state.targetMode=false;update();};global.dndV60Open=open;global.dndV60Close=close;
  global.DNDTokenInteractionV60={VERSION:VERSION,state:state,selectActor:selectActor,selectTarget:selectTarget,quickAttack:quickAttack,open:open,close:close,snapshot:function(){return {actorId:state.actorId,targetId:state.targetId,targetMode:state.targetMode};}};
  function update(){render();if(global.DNDBattleBoard&&global.DNDBattleBoard.render)global.DNDBattleBoard.render();}
  var oldOpen=global.dndBattleActionOpen;global.dndBattleActionOpen=function(tokenId){if(oldOpen)oldOpen(tokenId);if(state.targetMode)selectTarget(tokenId);else selectActor(tokenId);state.open=true;render();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initUi);else initUi();
})(window);
