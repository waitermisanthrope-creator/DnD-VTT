/**
 * vtt_encounter_checkpoint_v68.js
 * V68 Encounter Session / Checkpoint UX.
 * Recovery/orchestration layer only: authoritative state remains in
 * character.initiativeTracker, DNDGameplayV58 and DNDEncounterMapV59.
 */
(function(global){'use strict';
  var VERSION='68.1.0',SCHEMA_VERSION=2,KEY='dnd_vtt_encounter_checkpoint_v68',state={open:false,slot:'encounter-quick'};
  function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(e){return null;}}
  function now(){return new Date().toISOString();}
  function hero(){return global.currentCharacter||global.currentChar||null;}
  function slots(){try{return JSON.parse(global.localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
  function write(slot,payload){var s=slots();s[slot]={savedAt:now(),payload:payload};try{global.localStorage.setItem(KEY,JSON.stringify(s));return true;}catch(e){return false;}}
  function read(slot){var s=slots();return s[slot]&&s[slot].payload?migrate(s[slot].payload):null;}
  function migrate(p){if(!p||typeof p!=='object')return null;var x=clone(p);if(!x)return null;x.schemaVersion=SCHEMA_VERSION;x.version=VERSION;x.combatants=x.initiativeTracker&&Array.isArray(x.initiativeTracker.combatants)?x.initiativeTracker.combatants:[];if(!x.initiativeTracker||typeof x.initiativeTracker!=='object')x.initiativeTracker={round:1,activeIndex:0,combatants:x.combatants};x.initiativeTracker.round=Math.max(1,Number(x.initiativeTracker.round)||1);x.initiativeTracker.activeIndex=Math.max(0,Math.min(Number(x.initiativeTracker.activeIndex)||0,x.initiativeTracker.combatants.length?x.initiativeTracker.combatants.length-1:0));return x;}
  function tracker(){var h=hero();return h&&h.initiativeTracker?clone(h.initiativeTracker):null;}
  function build(){
    var h=hero(), t=tracker(), g=global.DNDGameplayV58&&global.DNDGameplayV58.snapshot?clone(global.DNDGameplayV58.snapshot()):null;
    var e=global.DNDEncounterMapV59&&global.DNDEncounterMapV59.snapshot?clone(global.DNDEncounterMapV59.snapshot()):null;
    var b=global.DNDBattleBoard&&global.DNDBattleBoard.getView?clone(global.DNDBattleBoard.getView()):null;
    return {version:VERSION,schemaVersion:SCHEMA_VERSION,createdAt:now(),app:'DND VTT',characterId:h&&h.id||null,encounter:e,gameplay:g,initiativeTracker:t,battleBoardView:b};
  }
  function list(){var s=slots();return Object.keys(s).map(function(k){var p=s[k].payload||{};var g=p.gameplay||{};return {slot:k,savedAt:s[k].savedAt||null,round:g.round||p.initiativeTracker&&p.initiativeTracker.round||0,active:g.active||p.initiativeTracker&&p.initiativeTracker.active&&p.initiativeTracker.active.name||null,encounter:p.encounter&&p.encounter.activeEncounterId||p.encounter&&p.encounter.draft&&p.encounter.draft.name||null};});}
  function save(slot){slot=slot||state.slot;var p=build();if(!write(slot,p))return {ok:false,error:'Не удалось записать checkpoint.'};state.slot=slot;render();return {ok:true,slot:slot,savedAt:p.createdAt};}
  function restore(slot){slot=slot||state.slot;var p=read(slot);if(!p)return {ok:false,error:'Checkpoint не найден.'};var h=hero();if(!h)return {ok:false,error:'Персонаж не загружен.'};
    if(!p.initiativeTracker||!Array.isArray(p.initiativeTracker.combatants))return {ok:false,error:'Checkpoint не содержит инициативу.'};
    h.initiativeTracker=clone(p.initiativeTracker);
    var r={ok:true,slot:slot,round:h.initiativeTracker.round||1,activeIndex:h.initiativeTracker.activeIndex||0,active:h.initiativeTracker.combatants[h.initiativeTracker.activeIndex||0]||null};
    if(global.DNDGameplayV58&&typeof global.DNDGameplayV58.restoreSnapshot==='function')global.DNDGameplayV58.restoreSnapshot(p.gameplay);
    if(global.DNDEncounterMapV59&&typeof global.DNDEncounterMapV59.restoreSnapshot==='function')global.DNDEncounterMapV59.restoreSnapshot(p.encounter);
    if(global.DNDBattleBoard&&p.battleBoardView&&typeof global.DNDBattleBoard.setView==='function')global.DNDBattleBoard.setView(p.battleBoardView);
    if(typeof global.autoSaveCurrentCharacter==='function')try{global.autoSaveCurrentCharacter();}catch(e){}
    if(typeof global.renderInitiativeTracker==='function')try{global.renderInitiativeTracker();}catch(e){}
    if(global.DNDGameplayV57&&typeof global.DNDGameplayV57.render==='function')try{global.DNDGameplayV57.render();}catch(e){}
    if(global.DNDGameplayV58&&typeof global.DNDGameplayV58.render==='function')try{global.DNDGameplayV58.render();}catch(e){}
    if(global.DNDEncounterMapV59&&typeof global.DNDEncounterMapV59.render==='function')try{global.DNDEncounterMapV59.render();}catch(e){}
    if(global.DNDBattleBoard&&typeof global.DNDBattleBoard.render==='function')try{global.DNDBattleBoard.render();}catch(e){}
    render();return r;
  }
  function remove(slot){var s=slots();delete s[slot||state.slot];try{global.localStorage.setItem(KEY,JSON.stringify(s));render();return true;}catch(e){return false;}}
  function exportSession(slot){var p=read(slot||state.slot)||build(),blob=new Blob([JSON.stringify(p,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='dnd_vtt_encounter_checkpoint_v68_'+String(slot||state.slot)+'.json';a.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);return p;}
  function importText(text,slot){var p;try{p=JSON.parse(String(text||''));}catch(e){return {ok:false,error:'Неверный JSON.'};}p=migrate(p);if(!p||!p.initiativeTracker||!Array.isArray(p.initiativeTracker.combatants))return {ok:false,error:'Это не Encounter Checkpoint.'};var ok=write(slot||state.slot,p);render();return {ok:ok,slot:slot||state.slot};}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function msg(t){var e=document.getElementById('dndV68Result');if(e)e.textContent=t;}
  function render(){var root=document.getElementById('dndEncounterCheckpointV68');if(!root)return;root.style.display=state.open?'block':'none';var rows=list();root.innerHTML='<div style="padding:11px;max-width:760px;margin:auto"><div style="display:flex;justify-content:space-between;align-items:center"><b>💾 Encounter Checkpoint V68</b><button class="btn-action" onclick="dndV68Close()">✕</button></div><p style="color:#aaa;font-size:.78em">Сохраняет реальное состояние инициативы, раунд, активного участника, encounter и позицию Battle Board. Восстановление использует существующие V57/V58/V59 API.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><button class="btn-action" onclick="dndV68Save()">💾 Сохранить checkpoint</button><button class="btn-action" onclick="dndV68Export()">⇩ Экспорт JSON</button></div><div style="margin-top:8px"><input id="dndV68ImportFile" type="file" accept="application/json,.json" style="width:100%;box-sizing:border-box;padding:8px;background:#222;color:#ddd;border:1px solid #444;border-radius:7px" onchange="dndV68FileImport(this)"></div><div id="dndV68Result" style="color:#aaa;font-size:.78em;margin:8px 0"></div><h4>Боевые checkpoints</h4>'+(rows.length?rows.map(function(x){return '<div style="display:grid;grid-template-columns:1fr auto auto;gap:5px;align-items:center;border:1px solid #444;border-radius:9px;padding:8px;margin:6px 0"><div><b>'+esc(x.slot)+'</b><div style="font-size:.7em;color:#aaa">'+esc(x.savedAt||'')+' • раунд '+Number(x.round||0)+' • '+esc(x.active||'—')+(x.encounter?' • '+esc(x.encounter):'')+'</div></div><button class="btn-action" onclick="dndV68Restore(\''+esc(x.slot).replace(/'/g,"\\'")+'\')">Восстановить</button><button class="btn-action" onclick="dndV68Delete(\''+esc(x.slot).replace(/'/g,"\\'")+'\')">✕</button></div>';}).join(''):'<div style="color:#888;padding:8px">Checkpointов пока нет.</div>')+'</div>';}
  function open(){state.open=true;render();}function close(){state.open=false;render();}
  function init(){if(document.getElementById('dndEncounterCheckpointV68'))return;var e=document.createElement('div');e.id='dndEncounterCheckpointV68';e.style.cssText='display:none;position:fixed;inset:0;z-index:29930;background:rgba(10,10,10,.99);color:#fff;overflow:auto;padding:calc(10px + env(safe-area-inset-top)) 8px calc(10px + env(safe-area-inset-bottom));box-sizing:border-box;touch-action:manipulation;';document.body.appendChild(e);}
  function fileImport(input){var f=input&&input.files&&input.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var x=importText(r.result,state.slot);msg(x.ok?'Checkpoint импортирован.':'Ошибка: '+x.error);render();};r.readAsText(f);}
  global.dndV68Open=open;global.dndV68Close=close;global.dndV68Save=function(s){var r=save(s);msg(r.ok?'Checkpoint сохранён: '+r.slot:'Ошибка: '+r.error);return r;};global.dndV68Restore=function(s){var r=restore(s);msg(r.ok?'Восстановлено: раунд '+r.round:'Ошибка: '+r.error);return r;};global.dndV68Export=function(s){var r=exportSession(s);msg('Checkpoint экспортирован.');return r;};global.dndV68FileImport=fileImport;global.dndV68Delete=function(s){return remove(s);};
  global.DNDEncounterCheckpointV68={VERSION:VERSION,SCHEMA_VERSION:SCHEMA_VERSION,build:build,save:save,restore:restore,remove:remove,slots:list,exportSession:exportSession,importText:importText,open:open,close:close};
  global.addEventListener('DOMContentLoaded',function(){init();});
})(window);
