/*
 * inventory_containers_v54.js — контейнеры, сумки и хранилища персонажа.
 * Как работает: расширяет существующий currentCharacter.inventory, не создавая
 * второй инвентарь. Контейнеры хранятся в inventory.containers, а их содержимое
 * — в item.contents. Поддерживаются вместимость, вес содержимого, вложенные
 * контейнеры, перемещение предметов, открытие/закрытие и сохранение.
 * Важные переменные/API: DND_INVENTORY_CONTAINERS_V54, ensureContainers(),
 * createContainer(), addToContainer(), removeFromContainer(), moveItemToContainer(),
 * listContainers(), renderContainerPanel().
 */
(function(global){
  'use strict';
  const KEY='dnd_inventory_containers_v54';
  const DEFAULT_CAPACITY=20;
  const MAX_DEPTH=6;

  function hero(){ return global.currentCharacter || global.currentChar || null; }
  function inv(){ const c=hero(); if(!c)return null; c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]}; c.inventory.containers=Array.isArray(c.inventory.containers)?c.inventory.containers:[]; return c.inventory; }
  function id(prefix){ return prefix+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7); }
  function save(){ if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter(); }
  function weight(item){
    const n=Number(item&&item.weight); if(Number.isFinite(n)) return n;
    if(typeof global.parseWeightToKg==='function') return global.parseWeightToKg(item&&item.weight);
    return 0;
  }
  function ownWeight(item){ return weight(item)*(Number(item&&item.count)||1); }
  function contentsWeight(container){ return (container.contents||[]).reduce((s,x)=>s+ownWeight(x),0); }
  function totalWeight(container){ return ownWeight(container)+contentsWeight(container); }
  function findContainer(idv){ const a=inv()?.containers||[]; return a.find(x=>String(x.id)===String(idv))||null; }
  function allContainers(){ return inv()?.containers||[]; }
  function descendants(idv,set=new Set()){ const c=findContainer(idv); if(!c)return set; (c.contents||[]).forEach(x=>{ if(x.containerId&&!set.has(x.containerId)){set.add(x.containerId);descendants(x.containerId,set);} }); return set; }
  function depthOf(idv){ let d=0,c=findContainer(idv); const seen=new Set(); while(c&&c.parentContainerId&&!seen.has(c.id)){seen.add(c.id);d++;c=findContainer(c.parentContainerId);} return d; }
  function normalize(c){
    c.capacity=Number.isFinite(Number(c.capacity))?Number(c.capacity):DEFAULT_CAPACITY;
    c.contents=Array.isArray(c.contents)?c.contents:[]; c.closed=!!c.closed; c.openedAt=c.openedAt||Date.now();
    return c;
  }
  function ensureContainers(){ const a=inv()?.containers||[]; a.forEach(normalize); return a; }
  function createContainer(name, opts={}){
    const i=inv(); if(!i)return {ok:false,error:'no_character'};
    const c=normalize({id:id('container'),name:String(name||'Контейнер'),capacity:Number(opts.capacity)||DEFAULT_CAPACITY,weight:Number(opts.weight)||0,category:opts.category||'container',rarity:opts.rarity||'common',description:opts.description||'',contents:[],closed:false,parentContainerId:opts.parentContainerId||null,containerType:opts.containerType||'bag',source:'v54'});
    if(c.parentContainerId){ const p=findContainer(c.parentContainerId); if(!p)return {ok:false,error:'parent_not_found'}; if(depthOf(p.id)+1>MAX_DEPTH)return {ok:false,error:'max_depth'}; }
    i.containers.push(c); save(); renderContainerPanel(); return {ok:true,container:c};
  }
  function canFit(container,item,ignoreWeight=false){ const c=(container&&typeof container==='object')?container:findContainer(container); if(!c||c.closed)return {ok:false,error:c?'closed':'container_not_found'}; const projected=contentsWeight(c)+ownWeight(item); return {ok:ignoreWeight||projected<=c.capacity,projected,capacity:c.capacity}; }
  function addToContainer(containerId,item,opts={}){
    const c=(inv()?.containers||[]).find(x=>String(x.id)===String(containerId)); if(!c)return {ok:false,error:'container_not_found'};
    if(c.closed&&!opts.force)return {ok:false,error:'closed'};
    const childId=item.containerId||null;
    if(childId){ if(childId===c.id||descendants(childId).has(c.id))return {ok:false,error:'container_cycle'}; if(depthOf(c.id)+1>MAX_DEPTH)return {ok:false,error:'max_depth'}; }
    const check=canFit(c,item,opts.ignoreWeight); if(!check.ok)return check;
    const copy=JSON.parse(JSON.stringify(item)); copy.count=Number(copy.count)||1; copy.containerId=c.id; copy.inventoryCategory=opts.category||copy.inventoryCategory||'junk';
    c.contents.push(copy); save(); renderContainerPanel(); if(typeof global.renderInventory==='function')global.renderInventory(); return {ok:true,item:copy,weight:check.projected};
  }
  function removeFromContainer(containerId,index){ const c=findContainer(containerId); if(!c||!c.contents[index])return {ok:false,error:'item_not_found'}; const item=c.contents.splice(index,1)[0]; delete item.containerId; save(); renderContainerPanel(); if(typeof global.renderInventory==='function')global.renderInventory(); return {ok:true,item}; }
  function moveItemToContainer(category,index,containerId){
    const i=inv(), c=(i?.containers||[]).find(x=>String(x.id)===String(containerId)); if(!i||!c||!Array.isArray(i[category]))return {ok:false,error:'not_found'};
    const item=i[category][index]; if(!item)return {ok:false,error:'item_not_found'};
    const r=addToContainer(containerId,item,{category}); if(!r.ok)return r; i[category].splice(index,1); save(); renderContainerPanel(); if(typeof global.renderInventory==='function')global.renderInventory(); return r;
  }
  function takeFromContainer(containerId,index,category){
    const r=removeFromContainer(containerId,index); if(!r.ok)return r; const i=inv(); const cat=category||r.item.inventoryCategory||'junk'; i[cat]=Array.isArray(i[cat])?i[cat]:[];
    const same=i[cat].find(x=>x.name===r.item.name&&x.materialId===r.item.materialId&&x.alchemyId===r.item.alchemyId);
    if(same)same.count=(Number(same.count)||0)+(Number(r.item.count)||1); else i[cat].push(r.item); delete r.item.inventoryCategory; save(); renderContainerPanel(); if(typeof global.renderInventory==='function')global.renderInventory(); return {ok:true,item:r.item};
  }
  function toggleContainer(idv){ const c=findContainer(idv); if(!c)return false; c.closed=!c.closed; c.openedAt=Date.now(); save(); renderContainerPanel(); return c.closed; }
  function listContainers(){ return ensureContainers().map(c=>({id:c.id,name:c.name,capacity:c.capacity,used:contentsWeight(c),free:Math.max(0,c.capacity-contentsWeight(c)),weight:totalWeight(c),closed:c.closed,parentContainerId:c.parentContainerId||null,contents:c.contents.length})); }
  function clearContainer(idv){ const c=findContainer(idv); if(!c)return {ok:false,error:'container_not_found'}; if(c.contents.length)return {ok:false,error:'not_empty'}; const i=inv(); i.containers=i.containers.filter(x=>x.id!==idv); save(); renderContainerPanel(); return {ok:true}; }
  function makeRow(c,indent){
    const row=document.createElement('div'); row.style.cssText=`margin:${indent*8}px 0 6px;padding:8px;background:#202020;border:1px solid #3b3b3b;border-radius:7px;`;
    const head=document.createElement('div'); head.style.cssText='display:flex;gap:6px;align-items:center;justify-content:space-between;';
    const title=document.createElement('b'); title.textContent=(c.closed?'🔒 ':'🎒 ')+c.name; title.style.color='#ffcc80';
    const btn=document.createElement('button'); btn.className='btn-action'; btn.textContent=c.closed?'Открыть':'Закрыть'; btn.style.cssText='padding:4px 7px;font-size:.75em;'; btn.onclick=()=>toggleContainer(c.id);
    head.append(title,btn); row.appendChild(head);
    const used=contentsWeight(c); const meta=document.createElement('div'); meta.style.cssText='font-size:.75em;color:#aaa;margin-top:4px;'; meta.textContent=`Вес: ${used.toFixed(2)} / ${c.capacity.toFixed(2)} кг · ${c.contents.length} поз.`; row.appendChild(meta);
    if(!c.closed){
      (c.contents||[]).forEach((it,idx)=>{
        const r=document.createElement('div'); r.style.cssText='display:flex;gap:5px;align-items:center;padding:5px 0;border-top:1px solid #2e2e2e;font-size:.82em;';
        const n=document.createElement('span'); n.style.flex='1'; n.textContent=`${it.name} × ${it.count||1}`; r.appendChild(n);
        const take=document.createElement('button'); take.className='btn-action'; take.textContent='↩'; take.title='Вернуть в инвентарь'; take.style.padding='3px 7px'; take.onclick=()=>takeFromContainer(c.id,idx,it.inventoryCategory); r.appendChild(take);
        row.appendChild(r);
      });
      const children=allContainers().filter(x=>x.parentContainerId===c.id);
      children.forEach(child=>row.appendChild(makeRow(child,indent+1)));
      const add=document.createElement('button'); add.className='btn-action'; add.textContent='➕ Переместить предмет'; add.style.cssText='margin-top:6px;width:100%;font-size:.8em;'; add.onclick=()=>openMovePicker(c.id); row.appendChild(add);
    }
    return row;
  }
  function openMovePicker(containerId){
    const i=inv(); if(!i)return; const candidates=[]; ['weapons','armor','consumables','materials','junk'].forEach(cat=>(i[cat]||[]).forEach((it,index)=>candidates.push({cat,index,it})));
    const name=global.prompt?global.prompt('Введите название предмета для перемещения:'):null; if(!name)return;
    const hit=candidates.find(x=>String(x.it.name||'').toLowerCase()===name.toLowerCase())||candidates.find(x=>String(x.it.name||'').toLowerCase().includes(name.toLowerCase()));
    if(!hit){ if(typeof global.showCustomAlert==='function')global.showCustomAlert('Контейнер','Предмет не найден','📦'); return; }
    const r=moveItemToContainer(hit.cat,hit.index,containerId); if(!r.ok&&typeof global.showCustomAlert==='function')global.showCustomAlert('Контейнер','Не удалось переместить: '+r.error,'⚠️');
  }
  function renderContainerPanel(){
    const host=document.getElementById('inventoryContainersV54'); if(!host)return; host.innerHTML=''; const a=ensureContainers();
    const toolbar=document.createElement('div'); toolbar.style.cssText='display:flex;gap:6px;margin-bottom:8px;';
    const add=document.createElement('button'); add.className='btn-action'; add.textContent='🎒 Новый контейнер'; add.style.flex='1'; add.onclick=()=>{const n=global.prompt?global.prompt('Название контейнера','Рюкзак'):null;if(n)createContainer(n,{capacity:20,containerType:'bag'});}; toolbar.appendChild(add);
    const summary=document.createElement('span'); summary.style.cssText='font-size:.75em;color:#999;align-self:center;'; summary.textContent=`${a.length} контейнеров`; toolbar.appendChild(summary); host.appendChild(toolbar);
    if(!a.length){const p=document.createElement('div');p.style.color='#777';p.textContent='Контейнеров пока нет. Создайте рюкзак, сумку или сундук.';host.appendChild(p);return;}
    const roots=a.filter(c=>!c.parentContainerId); roots.forEach(c=>host.appendChild(makeRow(c,0)));
    const orphan=a.filter(c=>c.parentContainerId&&!findContainer(c.parentContainerId)); orphan.forEach(c=>host.appendChild(makeRow(c,0)));
  }
  function install(){
    const area=document.getElementById('invCat_junk')||document.querySelector('#inventory-list')?.parentElement; if(!area)return;
    if(!document.getElementById('inventoryContainersV54')){const box=document.createElement('div');box.id='inventoryContainersV54';box.style.cssText='margin-top:12px;padding:10px;background:#181818;border:1px solid #444;border-radius:8px;';const h=document.createElement('h3');h.textContent='🎒 Контейнеры и хранилища';h.style.cssText='margin:0 0 8px;color:#ffb74d;';box.appendChild(h);area.appendChild(box);}
    ensureContainers(); renderContainerPanel();
  }
  const api={ensureContainers,createContainer,addToContainer,removeFromContainer,moveItemToContainer,takeFromContainer,toggleContainer,listContainers,clearContainer,contentsWeight,totalWeight,render:renderContainerPanel};
  global.DND_INVENTORY_CONTAINERS_V54=api;
  global.DndInventoryContainersV54=api;
  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,900));
  global.addEventListener('dnd:character-loaded',()=>setTimeout(install,100));
})(window);
