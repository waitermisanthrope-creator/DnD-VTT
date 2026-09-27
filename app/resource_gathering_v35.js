/**
 * Resource Gathering v35: игровой слой добычи сырья, сбора растений и разборки добычи.
 * Как работает: даёт мастеру быстрые действия для свободного сбора без заранее прописанного
 * сценария. Можно выбрать конкретный материал из каталога, бросить d4/d6/d8/d10, получить
 * количество и добавить его в инвентарь. Для тяжёлой добычи (шахта, валка леса и т.п.)
 * можно включить усталую работу, которая добавляет 1 уровень истощения персонажу.
 * Основные переменные: DND_RESOURCE_GATHERING_V35, GATHERING_ACTIONS, currentCharacter/currentChar,
 * DND_CRAFT_RESOURCES_V34, exhaustionLevel, gatherResult.
 */
(function(global){'use strict';
const catalog=global.DND_CRAFT_RESOURCES_V34;
if(!catalog)return;

const GATHERING_ACTIONS={
  flowers:{name:'🌼 Быстрый сбор цветов',die:4,strenuous:false,desc:'Можно собирать на ходу. Мастер сам решает, какие цветы доступны в сцене.'},
  herbs:{name:'🌿 Сбор трав',die:4,strenuous:false,desc:'Для растений и лекарственных трав. Обычно не требует отдельного действия в сцене.'},
  wood:{name:'🪓 Рубка дров',die:6,strenuous:true,desc:'Тяжёлая работа. По умолчанию +1 истощение за рабочий цикл.'},
  mining:{name:'⛏️ Работа в шахте',die:6,strenuous:true,desc:'Тяжёлая добыча руды. По умолчанию +1 истощение за рабочий цикл.'},
  stone:{name:'🪨 Добыча камня',die:6,strenuous:true,desc:'Добыча камня и минералов вручную.'},
  salvage:{name:'🔧 Разбор находки',die:4,strenuous:false,desc:'Разбор найденного предмета/обломка на полезные материалы.'}
};
const RESOURCE_HINTS={
 flowers:['lavender','sage','mint','nightshade','bloodroot','ghostMoss','fireLily','frostBerries','sunleaf','mooncap'],
 herbs:['lavender','sage','mint','bloodroot','ghostMoss','fireLily','frostBerries','sunleaf','mooncap'],
 wood:['pine','oak','ashWood','birch','yew','ebony','heartwood','darkheart','ironwood','dragonwood'],
 mining:['rawCopper','rawIron','tinOre','leadOre','zincOre','nickelOre','coldIronOre','mithralOre','adamantineOre','meteorIron','starMetal'],
 stone:['quartz','obsidian','jade','limestone','fireClay','porcelainClay'],
 salvage:['steelBillet','ironWire','copperWire','fineGear','mechanicalSpring','fineChain']
};
function char(){return global.currentCharacter||global.currentChar||null;}
function ensure(c){
  if(!c)return null;
  c.exhaustionLevel=Math.max(0,Math.min(6,Number(c.exhaustionLevel)||0));
  c.resourceGathering=c.resourceGathering||{history:[],cycles:0};
  return c;
}
function addMaterial(id,count){
  const c=ensure(char()); if(!c)return false;
  const m=catalog.get(id); if(!m)return false;
  return catalog.grant(id,count);
}
function rollDie(sides){return 1+Math.floor(Math.random()*sides);}
function addExhaustion(amount,reason){
  const c=ensure(char()); if(!c)return {ok:false,error:'Нет активного персонажа'};
  const before=c.exhaustionLevel, after=Math.min(6,before+Math.max(0,Number(amount)||0));
  c.exhaustionLevel=after;
  c.resourceGathering.lastExhaustion={before,after,reason:reason||'Тяжёлая работа',at:Date.now()};
  return {before,after};
}
function record(entry){
  const c=ensure(char()); if(!c)return;
  c.resourceGathering.history.push(entry);
  if(c.resourceGathering.history.length>50)c.resourceGathering.history.shift();
  c.resourceGathering.cycles=(Number(c.resourceGathering.cycles)||0)+1;
}
function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();else if(typeof global.saveCharacter==='function')global.saveCharacter();if(typeof global.renderInventory==='function')global.renderInventory();}
function gather(actionId,resourceId,opts){
  opts=opts||{}; const a=GATHERING_ACTIONS[actionId]; const c=ensure(char());
  if(!a||!c)return {ok:false,error:!c?'Нет активного персонажа':'Неизвестный тип добычи'};
  const m=catalog.get(resourceId);
  if(!m)return {ok:false,error:'Материал не найден в каталоге'};
  const die=Number(opts.die)||a.die;
  const allowed=[4,6,8,10,12]; if(!allowed.includes(die))return {ok:false,error:'Допустимы d4, d6, d8, d10 или d12'};
  const amount=rollDie(die);
  addMaterial(resourceId,amount);
  let exhaustion=null;
  const strenuous=opts.strenuous==null?a.strenuous:!!opts.strenuous;
  if(strenuous)exhaustion=addExhaustion(1,`Добыча: ${m.name}`);
  const entry={action:actionId,resourceId,resourceName:m.name,amount,die,exhaustion:!!strenuous,at:Date.now()};
  record(entry); save();
  return {ok:true,action:a,material:m,amount,die,exhaustion,entry};
}
function customGather(name,opts){
  opts=opts||{}; const c=ensure(char()); if(!c)return {ok:false,error:'Нет активного персонажа'};
  const clean=String(name||'').trim(); if(!clean)return {ok:false,error:'Укажи, что именно найдено или собрано'};
  const die=Number(opts.die)||4; if(![4,6,8,10,12].includes(die))return {ok:false,error:'Допустимы d4, d6, d8, d10 или d12'};
  const amount=rollDie(die); c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]}; c.inventory.materials=c.inventory.materials||[];
  const same=c.inventory.materials.find(x=>String(x.name||'').toLowerCase()===clean.toLowerCase() && x.category==='Материал');
  if(same)same.count=(Number(same.count)||0)+amount; else c.inventory.materials.push({name:clean,count:amount,category:'Материал',rarity:opts.rarity||'common',weight:Number(opts.weight)||.1,cost:Number(opts.cost)||0,source:'free_gathering'});
  let exhaustion=null; if(opts.strenuous)exhaustion=addExhaustion(1,`Добыча: ${clean}`);
  const entry={action:'custom',resourceName:clean,amount,die,exhaustion:!!opts.strenuous,at:Date.now()}; record(entry); save();
  return {ok:true,material:{name:clean},amount,die,exhaustion,entry};
}
function quickGather(actionId,opts){
  opts=opts||{}; const ids=RESOURCE_HINTS[actionId]||[];
  const available=ids.map(id=>catalog.get(id)).filter(Boolean);
  if(!available.length)return {ok:false,error:'Для этого типа пока нет ресурсов в каталоге'};
  const idx=Math.floor(Math.random()*available.length);
  return gather(actionId,available[idx].id,opts);
}
function exhaustionText(level){
  return ['Нет истощения','1: помеха на проверки характеристик','2: скорость уменьшена вдвое','3: помеха на броски атак и спасброски','4: максимум HP уменьшен вдвое','5: скорость становится 0','6: смерть'][Math.max(0,Math.min(6,Number(level)||0))];
}
function render(){
  const host=document.getElementById('craftingProfessionsPanel')||document.getElementById('craftingResourcesPanel'); if(!host)return;
  let box=document.getElementById('resourceGatheringPanel');
  if(!box){box=document.createElement('div');box.id='resourceGatheringPanel';box.style.cssText='margin-top:10px;padding:10px;background:#171717;border:1px solid #4b3a20;border-radius:8px';host.appendChild(box);}
  const c=ensure(char()); const ex=c?c.exhaustionLevel:0;
  const opts=Object.entries(GATHERING_ACTIONS).map(([id,a])=>`<option value="${id}">${a.name}</option>`).join('');
  box.innerHTML=`<h3 style="margin:0;color:#d7b86e">🌲 Добыча и свободный сбор</h3>
  <div style="font-size:.76em;color:#aaa;margin:5px 0">Это слой для живой игры: мастер может разрешить собрать цветы прямо на ходу, а тяжёлая работа может стоить персонажу 1 уровень истощения.</div>
  <div style="padding:7px;background:#211f1b;border-radius:6px;margin-bottom:7px"><b>Истощение:</b> ${ex}/6 — ${exhaustionText(ex)}</div>
  <select id="gatherActionType" style="width:100%;padding:7px;background:#222;color:#fff;border:1px solid #444;border-radius:5px">${opts}</select>
  <select id="gatherResource" style="width:100%;padding:7px;background:#222;color:#fff;border:1px solid #444;border-radius:5px;margin-top:5px"></select>
  <div style="display:flex;gap:5px;margin-top:5px"><select id="gatherDie" style="flex:1;padding:7px;background:#222;color:#fff;border:1px solid #444;border-radius:5px"><option>d4</option><option>d6</option><option>d8</option><option>d10</option><option>d12</option></select><button class="btn-action" style="flex:1" onclick="DND_RESOURCE_GATHERING_V35.uiGather()">🎲 Собрать</button></div>
  <label style="display:block;margin-top:6px;font-size:.76em"><input id="gatherStrenuous" type="checkbox"> Тяжёлая работа (+1 истощение)</label>
  <button class="btn-action" style="width:100%;margin-top:5px" onclick="DND_RESOURCE_GATHERING_V35.uiFreeGather()">🎭 Свободный сбор мастера</button>
  <input id="gatherCustomName" placeholder="Например: ромашка у дороги, сухие ветки..." style="width:100%;box-sizing:border-box;padding:7px;background:#222;color:#fff;border:1px solid #444;border-radius:5px;margin-top:5px">
  <button class="btn-action" style="width:100%;margin-top:5px" onclick="DND_RESOURCE_GATHERING_V35.uiCustomGather()">🌱 Собрать то, что разрешил мастер</button>
  <div id="gatherResult" style="margin-top:7px"></div>`;
  const action=document.getElementById('gatherActionType');
  const update=()=>{const id=action.value;const list=document.getElementById('gatherResource');const ids=RESOURCE_HINTS[id]||[];list.innerHTML=ids.map(x=>catalog.get(x)).filter(Boolean).map(m=>`<option value="${m.id}">${m.name}</option>`).join('')||catalog.RESOURCES.filter(m=>m.tags?.includes('natural')).slice(0,30).map(m=>`<option value="${m.id}">${m.name}</option>`).join('');document.getElementById('gatherStrenuous').checked=GATHERING_ACTIONS[id]?.strenuous||false;};
  action.onchange=update; update();
}
function resultHTML(r){if(!r.ok)return `<div style="padding:7px;background:#321b1b;border:1px solid #7f3b3b;border-radius:6px">❌ ${r.error}</div>`;return `<div style="padding:7px;background:#1d2a1f;border:1px solid #4b7052;border-radius:6px">🎲 <b>d${r.die} → ${r.amount}</b> × ${r.material.name}<br>${r.exhaustion?`⚠️ Истощение: ${r.exhaustion.before} → ${r.exhaustion.after}`:'🌿 Без истощения'}</div>`;}
function uiGather(){const r=gather(document.getElementById('gatherActionType').value,document.getElementById('gatherResource').value,{die:Number(document.getElementById('gatherDie').value.slice(1)),strenuous:document.getElementById('gatherStrenuous').checked});const e=document.getElementById('gatherResult');if(e)e.innerHTML=resultHTML(r);render();}
function uiCustomGather(){const name=document.getElementById('gatherCustomName')?.value||'';const r=customGather(name,{die:Number(document.getElementById('gatherDie').value.slice(1)),strenuous:document.getElementById('gatherStrenuous').checked});const e=document.getElementById('gatherResult');if(e)e.innerHTML=resultHTML(r);render();}
function uiFreeGather(){const type=document.getElementById('gatherActionType').value;const r=quickGather(type,{die:Number(document.getElementById('gatherDie').value.slice(1)),strenuous:document.getElementById('gatherStrenuous').checked});const e=document.getElementById('gatherResult');if(e)e.innerHTML=resultHTML(r);render();}
const API={GATHERING_ACTIONS,RESOURCE_HINTS,gather,quickGather,customGather,addExhaustion,exhaustionText,render,getExhaustion:()=>ensure(char())?.exhaustionLevel||0,uiGather,uiFreeGather,uiCustomGather};
global.DND_RESOURCE_GATHERING_V35=API;
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,500));
})(window);
