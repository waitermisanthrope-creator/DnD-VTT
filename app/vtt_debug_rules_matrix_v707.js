/** V70.7 Rules Matrix / Damage Laboratory. */
(function(global){'use strict';
var VERSION='70.7.0', ROOT='dndRulesMatrixV707', KEY='dndVttRulesMatrixV707';
var state={open:false,lastRun:null,history:[],suite:'full'};
function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(e){return v;}}
function num(v,d){var n=Number(v);return isFinite(n)?n:d;}
function emit(type,payload){try{if(global.DNDCombatEventBusV69&&global.DNDCombatEventBusV69.record)global.DNDCombatEventBusV69.record(Object.assign({type:type,source:'V70.7'},payload||{}));}catch(e){}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({lastRun:state.lastRun,history:state.history.slice(0,30),suite:state.suite}));}catch(e){}}
function load(){try{var x=JSON.parse(localStorage.getItem(KEY)||'null');if(x)Object.assign(state,x);}catch(e){}}
function calcDamage(raw,o){o=o||{};raw=num(raw,0);if(o.immune)return 0;if(o.resistant)return Math.floor(raw/2);if(o.vulnerable)return raw*2;return raw;}
function criticalDamage(base,extra){return num(base,0)*2+num(extra,0)*2;}
function normalDamage(base,extra){return num(base,0)+num(extra,0);}
function spellDamage(base,extra){return normalDamage(base,extra);}
function test(id,name,actual,expected,detail){var pass=actual===expected;return {id:id,name:name,expected:expected,actual:actual,pass:pass,detail:detail||{}};}
function buildSuite(){return [
 test('DMG-001','Normal fire damage',calcDamage(20,{}),20,{raw:20,type:'fire'}),
 test('DMG-002','Critical damage doubles base dice',criticalDamage(20,0),40,{base:20,extra:0,critical:true}),
 test('DMG-003','Resistance halves damage',calcDamage(20,{resistant:true}),10,{raw:20,resistant:true}),
 test('DMG-004','Immunity reduces damage to zero',calcDamage(20,{immune:true}),0,{raw:20,immune:true}),
 test('DMG-005','Vulnerability doubles damage',calcDamage(20,{vulnerable:true}),40,{raw:20,vulnerable:true}),
 test('DMG-006','Odd resistance rounds down',calcDamage(21,{resistant:true}),10,{raw:21,resistant:true}),
 test('DMG-007','Extra damage is added normally',normalDamage(20,7),27,{base:20,extra:7}),
 test('DMG-008','Critical extra damage doubles with base',criticalDamage(20,7),54,{base:20,extra:7,critical:true}),
 test('DMG-009','Spell damage uses normal damage pipeline',spellDamage(18,4),22,{spell:true,base:18,extra:4}),
 test('DMG-010','Spell damage can be resisted',calcDamage(spellDamage(18,4),{resistant:true}),11,{spell:true,raw:22,resistant:true}),
 test('DMG-011','Spell damage can be immune',calcDamage(spellDamage(18,4),{immune:true}),0,{spell:true,raw:22,immune:true}),
 test('DMG-012','Spell damage can be vulnerable',calcDamage(spellDamage(18,4),{vulnerable:true}),44,{spell:true,raw:22,vulnerable:true}),
 test('DMG-013','Resistance takes precedence over vulnerability',calcDamage(20,{resistant:true,vulnerable:true}),10,{resistant:true,vulnerable:true,precedence:'resistance'}),
 test('DMG-014','Immunity takes precedence over resistance',calcDamage(20,{immune:true,resistant:true}),0,{immune:true,resistant:true,precedence:'immunity'}),
 test('DMG-015','Sneak-style extra damage on normal hit',normalDamage(9,11),20,{base:9,extra:11,sneakStyle:true}),
 test('DMG-016','Sneak-style extra damage on critical',criticalDamage(9,11),40,{base:9,extra:11,sneakStyle:true,critical:true})
];}
function run(){var suite=buildSuite(),pass=suite.filter(function(x){return x.pass;}).length,fail=suite.length-pass;state.lastRun={version:VERSION,time:new Date().toISOString(),suite:state.suite,total:suite.length,pass:pass,fail:fail,tests:suite};state.history.unshift(state.lastRun);if(state.history.length>30)state.history.length=30;persist();emit('DEBUG_RULES_MATRIX_RUN',{total:suite.length,pass:pass,fail:fail});suite.forEach(function(x){emit('DEBUG_RULES_MATRIX_RESULT',x);});render();return clone(state.lastRun);}
function clear(){state.lastRun=null;persist();render();}
function exportReport(){var data=JSON.stringify({version:VERSION,report:state.lastRun,history:state.history},null,2);try{var blob=new Blob([data],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='vtt_rules_matrix_v707.json';a.click();setTimeout(function(){URL.revokeObjectURL(url);},500);}catch(e){}return data;}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function btn(t,fn){return '<button class="btn-action" onclick="'+fn+'" style="padding:7px 9px;margin:2px">'+t+'</button>';}
function render(){var r=document.getElementById(ROOT);if(!r)return;r.style.display=state.open?'block':'none';if(!state.open)return;var z=state.lastRun;var summary=z?'<div style="font-size:18px;margin-top:8px"><b>'+z.pass+'</b> PASS / <b>'+z.fail+'</b> FAIL / '+z.total+' tests</div>':'<div style="color:#aaa;margin-top:8px">Матрица ещё не запускалась.</div>';var rows=z?z.tests.map(function(x){return '<tr><td>'+esc(x.id)+'</td><td>'+esc(x.name)+'</td><td>'+esc(x.expected)+'</td><td>'+esc(x.actual)+'</td><td style="font-weight:700">'+(x.pass?'PASS':'FAIL')+'</td></tr>';}).join(''):'';r.innerHTML='<div style="padding:12px;max-width:950px;margin:auto;font-family:system-ui"><div style="display:flex;justify-content:space-between"><b>⚖️ Rules Matrix & Damage Laboratory — V70.7</b>'+btn('✕','dndV707Close()')+'</div><div style="background:#171717;padding:10px;margin-top:8px;border-radius:8px"><div>Автоматическая проверка ожидаемого и фактического результата. Production Combat Engine не заменяется.</div>'+btn('▶ Run Full Rules Matrix','dndV707Run()')+btn('Export JSON','dndV707Export()')+btn('Clear','dndV707Clear()')+summary+'</div>'+(z?'<div style="overflow:auto;margin-top:8px"><table style="width:100%;border-collapse:collapse"><thead><tr><th>ID</th><th>Test</th><th>Expected</th><th>Actual</th><th>Result</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'')+'</div>';}
function open(){state.open=true;render();}function close(){state.open=false;render();}
function init(){if(document.getElementById(ROOT))return;var e=document.createElement('div');e.id=ROOT;e.style.cssText='display:none;position:fixed;inset:0;z-index:29960;background:rgba(10,10,10,.98);color:#fff;overflow:auto;padding:calc(10px + env(safe-area-inset-top)) 8px 20px;box-sizing:border-box;touch-action:manipulation';document.body.appendChild(e);render();}
load();
global.DNDRulesMatrixV707={VERSION:VERSION,open:open,close:close,run:run,clear:clear,exportReport:exportReport,state:function(){return clone(state)},buildSuite:buildSuite};
global.dndV707Open=open;global.dndV707Close=close;global.dndV707Run=run;global.dndV707Clear=clear;global.dndV707Export=exportReport;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
