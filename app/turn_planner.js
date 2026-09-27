/**
 * turn_planner.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Планировщик хода для D&D 5e 2014. Игрок или мастер сначала строит
 * действие на боевом поле, видит маршрут, дальность, LOS и AoE, затем
 * подтверждает план. Подготовленное действие хранится у combatant и
 * может быть автоматически выполнено один раз при начале его хода.
 *
 * КАК РАБОТАЕТ:
 * - preview не расходует Action/Bonus Action/spell slot;
 * - выбранные клетки и цели передаются в battle_board.js для визуального
 *   предпросмотра;
 * - игрок отправляет PREPARE_ACTION мастеру, мастер является authority;
 * - мастер/одиночная игра сохраняют preparedAction непосредственно;
 * - при переходе инициативы network_gameplay.js исполняет план один раз;
 * - если геометрия изменилась, мастер повторно проверяет действие и не
 *   позволяет старому плану обойти правила.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * planner.plan, actorId, targetId, moveTo, aoe, weapon, spell,
 * currentChar.initiativeTracker.combatants.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var state={open:false,plan:null};
  function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(e){return null;}}
  function hero(){return global.currentChar||global.currentCharacter||null;}
  function combat(){var h=hero();return h&&h.initiativeTracker||null;}
  function num(v,d){var n=Number(v);return isFinite(n)?n:(d||0);}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function isPlayer(){return !!(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.role==='player');}
  function isHost(){return !!(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.role==='host');}
  function tokens(){return global.DNDBattleBoard?global.DNDBattleBoard.tokenList():[];}
  function combatants(){var t=combat();return t&&Array.isArray(t.combatants)?t.combatants:[];}
  function actorForPlan(){
    var list=combatants();
    if(isPlayer()&&global.dndNetwork){var peer=global.dndNetwork.state.clientId;var c=list.find(function(x){return x.ownerPeerId===peer&&!x.defeated;});if(c)return c;}
    var active=list[combat()&&combat().activeIndex||0];return active||list.find(function(x){return !x.defeated;})||null;
  }
  function open(){state.open=true;state.plan=state.plan||{type:'ATTACK',actorId:'',targetId:'',moveTo:null,aoe:null,weapon:null,spell:null};var m=document.getElementById('dndTurnPlannerModal');if(m)m.style.display='flex';render();if(global.dndBattleOpen)global.dndBattleOpen();}
  function quick(actorId,targetId,type){state.open=true;state.plan={type:type||'ATTACK',actorId:String(actorId||''),targetId:String(targetId||''),moveTo:null,aoe:null,weapon:null,spell:null};var m=document.getElementById('dndTurnPlannerModal');if(m)m.style.display='flex';render();if(global.dndBattleOpen)global.dndBattleOpen();preview();}
  function close(){state.open=false;var m=document.getElementById('dndTurnPlannerModal');if(m)m.style.display='none';if(global.DNDBattleBoard)global.DNDBattleBoard.setPlanPreview(null);}
  function setType(v){state.plan=state.plan||{};state.plan.type=v;state.plan.targetId='';state.plan.aoe=null;render();}
  function chooseActor(v){state.plan.actorId=v;render();preview();}
  function chooseTarget(v){state.plan.targetId=v;state.plan.aoe=null;preview();}
  function chooseMove(){state.plan._pick='move';if(global.dndBattleOpen)global.dndBattleOpen();if(global.DNDBattleBoard)global.DNDBattleBoard.setPlanPreview(state.plan);}
  function chooseAoe(){state.plan._pick='aoe';state.plan.aoe=state.plan.aoe||{shape:'circle',radiusFt:20,cell:null};if(global.dndBattleOpen)global.dndBattleOpen();if(global.DNDBattleBoard)global.DNDBattleBoard.setPlanPreview(state.plan);}
  function cellSelected(cell,token){
    if(!state.plan)return;
    if(state.plan._pick==='move'){state.plan.moveTo={x:cell.x,y:cell.y};state.plan._pick=null;preview();}
    else if(state.plan._pick==='aoe'){state.plan.aoe.cell={x:cell.x,y:cell.y};state.plan._pick=null;preview();}
    else if(token){state.plan.targetId=token.sourceId||token.id;preview();}
  }
  function actorToken(){var a=combatants().find(function(c){return String(c.id)===String(state.plan&&state.plan.actorId);});if(!a)return null;return tokens().find(function(t){return String(t.sourceId)===String(a.id);})||null;}
  function targetToken(){return tokens().find(function(t){return String(t.sourceId)===String(state.plan&&state.plan.targetId);})||null;}
  function preview(){
    var p=state.plan;if(!p)return;var a=actorToken(),t=targetToken();p.preview={ok:true};
    if(p.moveTo&&a&&global.DNDBattleBoard){var path=global.DNDBattleBoard.pathCost(a,p.moveTo);p.preview.pathFt=path;p.preview.speedFt=num((combatants().find(function(c){return String(c.id)===String(p.actorId);})||{}).speed,30);p.preview.moveOk=path!==Infinity&&path<=p.preview.speedFt;}
    if(t&&a&&global.DNDBattleBoard){var range=num(p.rangeFt,p.type==='ATTACK'?5:150),from=p.moveTo||a,dist=global.DNDBattleBoard.distanceFt(from,t),los=global.DNDBattleBoard.lineOfSight(from,t);p.preview.distanceFt=dist;p.preview.rangeFt=range;p.preview.los=los.clear;p.preview.cover=los.cover;p.preview.ok=p.preview.ok&&dist<=range&&los.clear;}
    if(p.aoe&&p.aoe.cell){var b=global.DNDBattleBoard.ensure(),r=num(p.aoe.radiusFt,20),hits=tokens().filter(function(x){if(a&&String(x.sourceId)===String(a.sourceId))return false;var dx=x.x+x.size/2-(p.aoe.cell.x+.5),dy=x.y+x.size/2-(p.aoe.cell.y+.5);var inside=p.aoe.shape==='square'?Math.max(Math.abs(dx),Math.abs(dy))*b.cellFt<=r:Math.sqrt(dx*dx+dy*dy)*b.cellFt<=r;return inside&&global.DNDBattleBoard.lineOfSight({x:p.aoe.cell.x,y:p.aoe.cell.y,size:1},x).clear;});p.preview.aoeHits=hits.map(function(x){return x.name;});}
    if(global.DNDBattleBoard)global.DNDBattleBoard.setPlanPreview(p);
    renderSummary();
  }
  function renderSummary(){var box=document.getElementById('dndTurnPlannerSummary');if(!box||!state.plan)return;var p=state.plan,a=combatants().find(function(c){return String(c.id)===String(p.actorId);}),t=combatants().find(function(c){return String(c.id)===String(p.targetId);}),v=p.preview||{};var lines=[];if(a)lines.push('🧙 '+a.name);if(p.type==='ATTACK')lines.push('🎯 Атака '+(t?t.name:'—'));else lines.push('✨ '+((p.spell&&p.spell.name)||'Заклинание'));if(p.moveTo)lines.push('🏃 Перемещение → ('+p.moveTo.x+','+p.moveTo.y+') • '+(v.pathFt===Infinity?'заблокировано':num(v.pathFt)+' фт.'));if(t)lines.push('📏 '+num(v.distanceFt)+' / '+num(v.rangeFt)+' фт. • '+(v.los?'LOS ✓':'LOS ✕'));if(p.aoe&&p.aoe.cell){var hitNames=(v.aoeHits||[]).map(function(name){var cc=combatants().find(function(x){return x.name===name;});return (cc&&cc.team==='party'?'🔵 ':'🔴 ')+name;});lines.push('🔥 AoE '+num(p.aoe.radiusFt)+' фт. • целей: '+(hitNames.length?hitNames.join(', '):'нет'));}box.innerHTML=lines.join('<br>')+'<br><strong style="color:'+(v.ok===false?'#ff6b6b':'#7CFC98')+'">'+(v.ok===false?'⚠️ План сейчас недействителен':'✓ Предпросмотр допустим')+'</strong>';}
  function render(){
    if(!state.open)return;var aBox=document.getElementById('dndTurnPlannerActor'),tBox=document.getElementById('dndTurnPlannerTarget'),wBox=document.getElementById('dndTurnPlannerWeapon'),sBox=document.getElementById('dndTurnPlannerSpell');if(!aBox)return;var list=combatants().filter(function(c){return !c.defeated;});aBox.innerHTML=list.map(function(c){return '<option value="'+esc(c.id)+'">'+esc(c.name)+(c.ownerPeerId?' 👤':' 👹')+'</option>';}).join('');if(state.plan.actorId)aBox.value=state.plan.actorId;else if(list[0]){state.plan.actorId=list[0].id;aBox.value=list[0].id;}tBox.innerHTML=list.filter(function(c){return String(c.id)!==String(state.plan.actorId);}).map(function(c){return '<option value="'+esc(c.id)+'">'+esc(c.name)+' • HP '+num(c.hp)+'/'+num(c.maxHp)+'</option>';}).join('')||'<option value="">—</option>';if(state.plan.targetId)tBox.value=state.plan.targetId;
    var a=hero(),weapons=Array.isArray(a&&a.weaponsData)?a.weaponsData:(Array.isArray(a&&a.weapons)?a.weapons:[]);wBox.innerHTML=weapons.map(function(w,i){return '<option value="'+i+'">'+esc(w.name||('Оружие '+(i+1)))+'</option>';}).join('')||'<option value="">Нет оружия</option>';
    var spells=Array.isArray(a&&a.spellsData)?a.spellsData.filter(function(x){return x.name;}):[];sBox.innerHTML=spells.map(function(sp,i){return '<option value="'+i+'">'+esc(sp.name)+' • ур. '+num(sp.level)+'</option>';}).join('')||'<option value="">Нет заклинаний</option>';
    renderSummary();
  }
  function buildPlan(){
    var aId=document.getElementById('dndTurnPlannerActor').value,tId=document.getElementById('dndTurnPlannerTarget').value,p={type:document.getElementById('dndTurnPlannerType').value,actorId:aId,targetId:tId||'',moveTo:state.plan&&state.plan.moveTo||null,aoe:state.plan&&state.plan.aoe||null};var a=hero();if(p.type==='ATTACK'){var ws=Array.isArray(a&&a.weaponsData)?a.weaponsData:(Array.isArray(a&&a.weapons)?a.weapons:[]),w=ws[Number(document.getElementById('dndTurnPlannerWeapon').value)]||{};p.weapon={id:w.id||'',name:w.name||'Оружие',attackBonus:0,damage:String(w.diceCount||1)+String(w.diceSides||'d6'),damageType:w.damageType||''};p.rangeFt=num(w.rangeFt,5);}else{var ss=Array.isArray(a&&a.spellsData)?a.spellsData.filter(function(x){return x.name;}):[],sp=ss[Number(document.getElementById('dndTurnPlannerSpell').value)]||{};p.spell=clone(sp);p.spellName=sp.name||'';if(/огненный шар|fireball/i.test(sp.name||'')){p.aoe=p.aoe||{shape:'circle',radiusFt:20,cell:null};}p.rangeFt=parseInt(String(sp.range||'150'),10)||150;}state.plan=p;preview();return p;}
  function executeGroup(){if(!isHost())return alert('Групповое окно запускает мастер.');var r=global.dndNetworkGameplayExecutePreparedGroup&&global.dndNetworkGameplayExecutePreparedGroup();if(r&&!r.ok)alert(r.error||'Не удалось выполнить группу.');}
  function confirm(){var p=buildPlan();if(p.preview&&p.preview.ok===false)return alert('План сейчас недействителен. Исправьте маршрут, цель или точку.');var t=combat(),c=t&&t.combatants.find(function(x){return String(x.id)===String(p.actorId);});if(!c)return alert('Персонаж не найден.');p.type=p.type||'ATTACK';if(isPlayer()){if(!global.dndNetwork||!global.dndNetwork.playerAction)return alert('Нет соединения с мастером.');global.dndNetwork.playerAction('PREPARE_ACTION',p);}else{c.preparedAction=clone(p);if(global.autoSaveCurrentCharacter)global.autoSaveCurrentCharacter();if(isHost()&&global.dndNetwork&&global.dndNetwork.commitHostEvent)global.dndNetwork.commitHostEvent('COMBAT_CHANGED',clone(t),'master');}render();}
  function cancel(){var t=combat(),c=t&&t.combatants.find(function(x){return String(x.id)===String(state.plan&&state.plan.actorId);});if(isPlayer()&&global.dndNetwork&&global.dndNetwork.playerAction)global.dndNetwork.playerAction('CANCEL_PREPARED',{});else if(c){c.preparedAction=null;if(global.autoSaveCurrentCharacter)global.autoSaveCurrentCharacter();if(isHost()&&global.dndNetwork&&global.dndNetwork.commitHostEvent)global.dndNetwork.commitHostEvent('COMBAT_CHANGED',clone(t),'master');}state.plan=null;if(global.DNDBattleBoard)global.DNDBattleBoard.setPlanPreview(null);render();}
  function inject(){if(document.getElementById('dndTurnPlannerModal'))return;var m=document.createElement('div');m.id='dndTurnPlannerModal';m.style.cssText='display:none;position:fixed;right:8px;top:8px;width:min(390px,calc(100vw - 16px));max-height:calc(100vh - 16px);overflow:auto;background:#171717;color:#fff;border:1px solid #555;border-radius:10px;z-index:29000;padding:10px;box-sizing:border-box;box-shadow:0 10px 40px #000;';m.innerHTML='<div style="display:flex;gap:8px;align-items:center"><strong style="color:#d4af37">📋 Планировщик хода</strong><span style="flex:1"></span><button class="btn-action" onclick="dndTurnPlannerClose()">✕</button></div><div style="font-size:.78em;color:#999;margin:6px 0">Сначала спланируй → проверь поле → подтверди. План не тратит ресурс до исполнения.</div><label>Кто <select id="dndTurnPlannerActor" onchange="dndTurnPlannerActor(this.value)" style="width:100%;padding:7px;background:#222;color:#fff"></select></label><label style="display:block;margin-top:6px">Действие <select id="dndTurnPlannerType" onchange="dndTurnPlannerType(this.value)" style="width:100%;padding:7px;background:#222;color:#fff"><option value="ATTACK">🎯 Атака</option><option value="CAST_SPELL">✨ Заклинание</option></select></label><label style="display:block;margin-top:6px">Цель <select id="dndTurnPlannerTarget" onchange="dndTurnPlannerTarget(this.value)" style="width:100%;padding:7px;background:#222;color:#fff"></select></label><label style="display:block;margin-top:6px">Оружие <select id="dndTurnPlannerWeapon" onchange="dndTurnPlannerPreview()" style="width:100%;padding:7px;background:#222;color:#fff"></select></label><label style="display:block;margin-top:6px">Заклинание <select id="dndTurnPlannerSpell" onchange="dndTurnPlannerPreview()" style="width:100%;padding:7px;background:#222;color:#fff"></select></label><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px"><button class="btn-action" onclick="dndTurnPlannerPickMove()">🏃 Куда бежать</button><button class="btn-action" onclick="dndTurnPlannerPickAoe()">🔥 Точка AoE</button></div><div id="dndTurnPlannerSummary" style="margin-top:8px;padding:8px;background:#101010;border:1px solid #333;border-radius:6px;font-size:.8em;line-height:1.45"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px"><button class="btn-action" style="background:#2e7d32" onclick="dndTurnPlannerConfirm()">✓ Подтвердить план</button><button class="btn-action" style="background:#7f1d1d" onclick="dndTurnPlannerCancel()">Отменить</button></div><button id="dndTurnPlannerGroupBtn" class="btn-action" style="width:100%;margin-top:6px;background:#455a64" onclick="dndTurnPlannerExecuteGroup()">⚡ Выполнить готовые действия группы</button><button class="btn-action" style="width:100%;margin-top:6px" onclick="dndBattleOpen()">⚔️ Открыть поле</button>';document.body.appendChild(m);}
  global.dndTurnPlannerQuick=quick;global.dndTurnPlannerExecuteGroup=executeGroup;global.dndTurnPlannerOpen=open;global.dndTurnPlannerClose=close;global.dndTurnPlannerType=setType;global.dndTurnPlannerActor=chooseActor;global.dndTurnPlannerTarget=chooseTarget;global.dndTurnPlannerPickMove=chooseMove;global.dndTurnPlannerPickAoe=chooseAoe;global.dndTurnPlannerCellSelected=cellSelected;global.dndTurnPlannerConfirm=confirm;global.dndTurnPlannerCancel=cancel;global.dndTurnPlannerPreview=preview;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})(window);
