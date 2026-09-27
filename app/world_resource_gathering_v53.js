/**
 * World Resource Gathering v53: авторский мировой слой поверх существующей добычи v35.
 * Как работает: описывает регионы и точки добычи, проверяет инструмент/профессию,
 * ведёт истощение узлов и восстановление по времени, бросает проверку сбора и выдаёт
 * реальные материалы через DND_CRAFT_RESOURCES_V34.grant(). Это НЕ новый inventory,
 * resource или profession engine; v35 остаётся владельцем свободного сбора.
 * Основные переменные/API: REGIONS, NODES, WORLD_STATE, gatherAtNode(), previewNode(),
 * regenerate(), setWorld(), DND_WORLD_GATHERING_V53.
 */
(function(global){'use strict';
const resources=global.DND_CRAFT_RESOURCES_V34;
const freeGather=global.DND_RESOURCE_GATHERING_V35;
const profession=global.DND_CRAFT_PROFESSION_PROGRESS;
if(!resources)return;

const SOURCE_TAG='Авторское ХБ: мировая добыча ресурсов v53.';
const REGIONS={
  greenwood:{name:'Зелёный лес',icon:'🌲',terrain:'forest',desc:'Леса, опушки и старые дороги.',nodes:['greenwood_heart','greenwood_clearing','greenwood_stream']},
  highlands:{name:'Северные нагорья',icon:'⛰️',terrain:'mountain',desc:'Скалы, рудные жилы и холодные ветра.',nodes:['highlands_mine','highlands_quarry','highlands_ridge']},
  marshes:{name:'Туманные болота',icon:'🌫️',terrain:'swamp',desc:'Сырые низины, редкие травы и гниющая древесина.',nodes:['marsh_reeds','marsh_moss','marsh_pool']},
  coast:{name:'Скалистое побережье',icon:'🌊',terrain:'coast',desc:'Берег, приливные пещеры и солёные скалы.',nodes:['coast_cliffs','coast_caves','coast_grotto']},
  badlands:{name:'Красные пустоши',icon:'🏜️',terrain:'badlands',desc:'Сухие каньоны, обломки и редкие минералы.',nodes:['badlands_canyon','badlands_glass','badlands_crater']},
  ancient_ruins:{name:'Древние руины',icon:'🏚️',terrain:'ruins',desc:'Разрушенные строения и забытые мастерские.',nodes:['ruins_workshop','ruins_courtyard','ruins_vault']}
};
const NODES={
  greenwood_heart:{region:'greenwood',name:'Сердце леса',type:'wood',tool:'woodcarver',profession:'woodcarver',dc:9,respawn:900,resources:[['oak',5],['ashWood',4],['birch',3],['pine',2],['yew',1]]},
  greenwood_clearing:{region:'greenwood',name:'Лесная поляна',type:'herbs',tool:'herbalism',profession:'herbalist',dc:8,respawn:600,resources:[['lavender',5],['sage',4],['mint',4],['flax',3],['bloodroot',1]]},
  greenwood_stream:{region:'greenwood',name:'Ручей и звериная тропа',type:'salvage',tool:'leatherworker',profession:'leatherworker',dc:10,respawn:1200,resources:[['pineResin',3],['sinew',2],['horseHair',2],['deerHide',1],['quartz',1]]},
  highlands_mine:{region:'highlands',name:'Рудная жила',type:'mining',tool:'smith',profession:'smith',dc:11,respawn:1800,resources:[['rawIron',6],['rawCopper',4],['tinOre',3],['zincOre',2],['coldIronOre',1]]},
  highlands_quarry:{region:'highlands',name:'Старый карьер',type:'stone',tool:'mason',profession:'mason',dc:9,respawn:1500,resources:[['stone',6],['granite',4],['marble',2],['quartz',2],['obsidian',1]]},
  highlands_ridge:{region:'highlands',name:'Высокий хребет',type:'mining',tool:'jeweler',profession:'jeweler',dc:14,respawn:3600,resources:[['amethyst',3],['garnet',2],['sapphire',1],['ruby',1],['meteorIron',1]]},
  marsh_reeds:{region:'marshes',name:'Камышовые заросли',type:'herbs',tool:'herbalism',profession:'herbalist',dc:9,respawn:700,resources:[['hemp',4],['flax',4],['sage',2],['nightshade',2],['bloodroot',1]]},
  marsh_moss:{region:'marshes',name:'Мшистые кочки',type:'herbs',tool:'herbalism',profession:'herbalist',dc:12,respawn:1200,resources:[['ghostMoss',4],['nightshade',2],['mooncap',2],['frostLichen',1],['dryadThread',1]]},
  marsh_pool:{region:'marshes',name:'Чёрный омут',type:'salvage',tool:'alchemist',profession:'alchemist',dc:13,respawn:2400,resources:[['pineResin',2],['obsidian',1],['ghostMoss',2],['scorpionStinger',1],['dreamLotus',1]]},
  coast_cliffs:{region:'coast',name:'Приливные скалы',type:'stone',tool:'mason',profession:'mason',dc:10,respawn:1800,resources:[['stone',5],['quartz',3],['obsidian',2],['jade',1],['salt',3]]},
  coast_caves:{region:'coast',name:'Морские пещеры',type:'mining',tool:'tinker',profession:'tinker',dc:12,respawn:2400,resources:[['quartz',3],['amethyst',2],['moonstone',1],['starMetal',1],['obsidian',2]]},
  coast_grotto:{region:'coast',name:'Скрытая бухта',type:'herbs',tool:'herbalism',profession:'herbalist',dc:11,respawn:1500,resources:[['mint',3],['lavender',2],['sunleaf',2],['mooncap',1],['feyCrystal',1]]},
  badlands_canyon:{region:'badlands',name:'Каньон красного камня',type:'stone',tool:'mason',profession:'mason',dc:11,respawn:2100,resources:[['granite',4],['obsidian',3],['quartz',2],['jade',1],['fireClay',2]]},
  badlands_glass:{region:'badlands',name:'Стеклянные пески',type:'mining',tool:'glassblower',profession:'glassblower',dc:13,respawn:2700,resources:[['quartz',5],['obsidian',2],['amethyst',1],['ruby',1],['starMetal',1]]},
  badlands_crater:{region:'badlands',name:'Метеоритный кратер',type:'mining',tool:'smith',profession:'smith',dc:16,respawn:7200,resources:[['meteorIron',3],['starMetal',2],['mithralOre',1],['adamantineOre',1]]},
  ruins_workshop:{region:'ancient_ruins',name:'Заброшенная мастерская',type:'salvage',tool:'tinker',profession:'tinker',dc:12,respawn:3600,resources:[['ironWire',3],['copperWire',3],['fineGear',2],['mechanicalSpring',2],['fineChain',1]]},
  ruins_courtyard:{region:'ancient_ruins',name:'Заросший двор',type:'herbs',tool:'herbalism',profession:'herbalist',dc:12,respawn:3000,resources:[['ghostMoss',3],['bloodroot',2],['nightshade',2],['sunleaf',1],['dryadThread',1]]},
  ruins_vault:{region:'ancient_ruins',name:'Запечатанный тайник',type:'salvage',tool:'jeweler',profession:'jeweler',dc:17,respawn:10800,resources:[['goldBillet',1],['platinumBillet',1],['blackOpal',1],['soulGem',1],['dragonCrystal',1]]}
};

const ALIASES={mining:['smith','tinker','jeweler'],stone:['mason'],wood:['woodcarver','carpenter'],herbs:['herbalist'],salvage:['tinker','jeweler','leatherworker','alchemist']};
const RARITY_WEIGHT={common:5,uncommon:3,rare:2,very_rare:1,legendary:.35};
function now(){return Date.now();}
function clone(x){return JSON.parse(JSON.stringify(x));}
function activeCharacter(){return global.currentCharacter||global.currentChar||null;}
function worldId(){
  const c=activeCharacter();
  return String(global.currentCampaign?.id||c?.campaignId||localStorage.getItem('dnd_v53_world_id')||'solo-world');
}
function storageKey(){return 'dnd_world_gathering_v53_'+worldId();}
function loadState(){
  let s={nodes:{},updatedAt:now(),worldId:worldId()};
  try{s=Object.assign(s,JSON.parse(localStorage.getItem(storageKey())||'{}'));}catch(e){}
  s.nodes=s.nodes&&typeof s.nodes==='object'?s.nodes:{};
  return s;
}
let WORLD_STATE=loadState();
function saveState(){try{localStorage.setItem(storageKey(),JSON.stringify(WORLD_STATE));}catch(e){}}
function setWorld(id){if(!id)return{ok:false,error:'worldId пуст'};try{localStorage.setItem('dnd_v53_world_id',String(id));}catch(e){}WORLD_STATE=loadState();render();return{ok:true,worldId:worldId()};}
function nodeState(id){const n=WORLD_STATE.nodes[id]||(WORLD_STATE.nodes[id]={gathered:0,lastGatheredAt:0});return n;}
function remainingSeconds(id){const n=NODES[id],s=nodeState(id),elapsed=Math.max(0,now()-Number(s.lastGatheredAt||0));return Math.max(0,(Number(n.respawn)*1000-elapsed)/1000);}
function isReady(id){return remainingSeconds(id)<=0;}
function resource(id){return resources.get(id)||(global.DND_CRAFTING_V31?.MATERIALS||[]).find(m=>m.id===id)||null;}
function grantMaterial(id,count){if(typeof resources.grant==='function'&&resources.grant(id,count))return true;const m=resource(id),c=activeCharacter();if(!m||!c)return false;c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]};const a=c.inventory.materials||(c.inventory.materials=[]);const same=a.find(x=>x.materialId===id||String(x.name||'')===String(m.name||''));if(same)same.count=(Number(same.count)||0)+count;else a.push({name:m.name,count,materialId:id,craftMaterialId:id,weight:Number(m.weight)||1,cost:Number(m.price||m.cost)||0,rarity:m.rarity||'common',category:'Материал',usedBy:m.usedBy||[],roles:m.roles||[],source:'world_gathering_v53'});if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();if(typeof global.renderInventory==='function')global.renderInventory();return true;}
function professionData(c,id){
  const p=c?.craftingProfessions?.[id];
  if(!p)return{level:0,bonus:0,learned:false};
  let bonus=Math.max(0,Math.min(4,Number(p.level)||1)-1);
  if(typeof profession?.getProfession==='function'){
    const pp=profession.getProfession(c,id); if(pp)bonus=Math.max(bonus,Math.max(0,Math.min(4,Number(pp.level)||1)-1));
  }
  return{level:Number(p.level)||1,bonus,learned:true,specialization:p.specialization||null};
}
function hasTool(tool){
  if(typeof global.DND_CRAFT_PROFESSIONS_V38?.hasTool==='function')return !!global.DND_CRAFT_PROFESSIONS_V38.hasTool(tool);
  if(typeof global.DND_CRAFTING_V31?.hasTool==='function')return !!global.DND_CRAFTING_V31.hasTool(tool);
  return true;
}
function checkAccess(c,node,opts){
  opts=opts||{};const pd=professionData(c,node.profession), aliases=ALIASES[node.type]||[];
  const profOk=pd.learned;
  const toolOk=hasTool(node.tool);
  if(opts.ignoreRequirements)return{ok:true,bonus:pd.bonus,profession:pd};
  if(node.dc>=15&&!profOk)return{ok:false,error:'Для редкой точки нужна профессия «'+(global.DND_CRAFT_PROFESSIONS_V38?.PROFESSIONS?.[node.profession]?.name||node.profession)+'».',profession:pd,toolRequired:node.tool};
  if(!toolOk&&node.dc>=13)return{ok:false,error:'Для этой точки нужен подходящий инструмент.',profession:pd,toolRequired:node.tool};
  return{ok:true,bonus:pd.bonus+(profOk?1:0),profession:pd,toolOk,aliases};
}
function chooseResource(node,bonus){
  const pool=[];node.resources.forEach(([id,w])=>{const m=resource(id);if(!m)return;const rarity=m.rarity||'common';let weight=Number(w)||1;weight*=RARITY_WEIGHT[rarity]||1;if(rarity==='rare'&&bonus>=2)weight*=1.35;if(rarity==='very_rare'&&bonus>=3)weight*=1.6;if(rarity==='legendary'&&bonus>=4)weight*=2;for(let i=0;i<Math.max(1,Math.round(weight*10));i++)pool.push(id);});
  return pool.length?pool[Math.floor(Math.random()*pool.length)]:null;
}
function abilityMod(c,type){
  const a=c?.abilities||c?.stats||{};const pick=type==='herbs'?'wis':(type==='salvage'?'dex':'str');const raw=a[pick]??a[pick.toUpperCase()]??a[pick==='wis'?'wisdom':pick==='dex'?'dexterity':'strength'];const n=Number(raw);return Number.isFinite(n)?(n>10?Math.floor((n-10)/2):Math.floor((n-10)/2)):0;
}
function gatherAtNode(id,opts){
  opts=opts||{};const c=activeCharacter(),node=NODES[id];if(!c)return{ok:false,error:'Нет активного персонажа'};if(!node)return{ok:false,error:'Точка добычи не найдена'};if(!isReady(id))return{ok:false,error:'Точка истощена',retryIn:Math.ceil(remainingSeconds(id)),node:clone(node)};
  const access=checkAccess(c,node,opts);if(!access.ok)return Object.assign({ok:false},access);
  const d20=1+Math.floor(Math.random()*20),mod=abilityMod(c,node.type),total=d20+mod+access.bonus;
  if(d20===1||total<node.dc){nodeState(id).lastGatheredAt=now();nodeState(id).gathered=(Number(nodeState(id).gathered)||0)+1;saveState();if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();return{ok:false,error:'Неудача сбора',roll:d20,modifier:mod+access.bonus,total,dc:node.dc,node:clone(node),retryIn:Math.ceil(remainingSeconds(id))};}
  const quality=d20===20?'exceptional':total>=node.dc+7?'rich':total>=node.dc+3?'good':'normal';
  const count=quality==='exceptional'?3:(quality==='rich'?2:1);
  const rid=chooseResource(node,access.bonus);if(!rid)return{ok:false,error:'У точки нет доступного материала'};const m=resource(rid);
  if(!grantMaterial(rid,count))return{ok:false,error:'Не удалось выдать материал в инвентарь'};
  nodeState(id).lastGatheredAt=now();nodeState(id).gathered=(Number(nodeState(id).gathered)||0)+1;WORLD_STATE.updatedAt=now();saveState();
  if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();
  if(freeGather&&typeof freeGather.exhaustionText==='function'){}
  const result={ok:true,node:clone(node),material:clone(m),count,roll:d20,modifier:mod+access.bonus,total,dc:node.dc,quality,retryIn:Math.ceil(remainingSeconds(id)),source:SOURCE_TAG};
  if(c.worldGathering===undefined)c.worldGathering={history:[],cycles:0};c.worldGathering.cycles=(Number(c.worldGathering.cycles)||0)+1;c.worldGathering.history.push({nodeId:id,materialId:rid,count,quality,at:now()});if(c.worldGathering.history.length>50)c.worldGathering.history.shift();
  return result;
}
function previewNode(id){const n=NODES[id];if(!n)return null;const s=nodeState(id);return{node:clone(n),region:clone(REGIONS[n.region]),ready:isReady(id),retryIn:Math.ceil(remainingSeconds(id)),gathered:Number(s.gathered)||0,resources:n.resources.map(([rid])=>{const m=resource(rid);return m?{id:rid,name:m.name,rarity:m.rarity,weight:m.weight}:null;}).filter(Boolean)};}
function regenerate(){let changed=0;Object.keys(NODES).forEach(id=>{const s=nodeState(id);if(s.lastGatheredAt&&isReady(id)){if(s.regeneratedAt!==s.lastGatheredAt){s.regeneratedAt=s.lastGatheredAt;changed++;}}});if(changed)saveState();return{ok:true,changed};}
function listRegions(){return Object.entries(REGIONS).map(([id,r])=>({id,...clone(r),nodes:r.nodes.map(previewNode)}));}
function listNodes(regionId){return Object.entries(NODES).filter(([,n])=>!regionId||n.region===regionId).map(([id])=>({id,...previewNode(id)}));}
function resultHTML(r){if(!r.ok)return `<div style="padding:7px;background:#321b1b;border:1px solid #7f3b3b;border-radius:6px">❌ ${r.error}${r.retryIn?`<br>⏳ Восстановление: ${r.retryIn} сек.`:''}</div>`;return `<div style="padding:7px;background:#1d2a1f;border:1px solid #4b7052;border-radius:6px">🎲 d20 ${r.roll} + ${r.modifier} = <b>${r.total}</b> / DC ${r.dc}<br>🌿 <b>${r.material.name} ×${r.count}</b> · ${r.quality}<br>⏳ Следующий сбор через ${r.retryIn} сек.</div>`;}
function render(){const host=document.getElementById('resourceGatheringPanel')||document.getElementById('craftingResourcesPanel')||document.getElementById('craftingProfessionsPanel');if(!host)return;let box=document.getElementById('worldGatheringV53Panel');if(!box){box=document.createElement('div');box.id='worldGatheringV53Panel';box.style.cssText='margin-top:10px;padding:10px;background:#151515;border:1px solid #36502f;border-radius:8px';host.appendChild(box);}const regions=Object.entries(REGIONS);box.innerHTML=`<h3 style="margin:0;color:#9fc58f">🗺️ Мировые точки добычи v53</h3><div style="font-size:.75em;color:#aaa;margin:5px 0">${SOURCE_TAG} Узлы истощаются и восстанавливаются по мировому таймеру.</div><select id="worldGatherRegionV53" style="width:100%;padding:7px;background:#222;color:#fff;border:1px solid #444;border-radius:5px">${regions.map(([id,r])=>`<option value="${id}">${r.icon} ${r.name}</option>`).join('')}</select><select id="worldGatherNodeV53" style="width:100%;padding:7px;background:#222;color:#fff;border:1px solid #444;border-radius:5px;margin-top:5px"></select><button class="btn-action" style="width:100%;margin-top:5px" onclick="DND_WORLD_GATHERING_V53.uiGather()">⛏️ Добыть ресурс</button><div id="worldGatherResultV53" style="margin-top:7px"></div>`;
 const region=document.getElementById('worldGatherRegionV53'),node=document.getElementById('worldGatherNodeV53');const update=()=>{node.innerHTML=(REGIONS[region.value]?.nodes||[]).map(id=>{const p=previewNode(id);return `<option value="${id}">${p.node.name} ${p.ready?'✓':'⏳'}</option>`;}).join('');};region.onchange=update;update();}
function uiGather(){const id=document.getElementById('worldGatherNodeV53')?.value;if(!id)return;const r=gatherAtNode(id);const e=document.getElementById('worldGatherResultV53');if(e)e.innerHTML=resultHTML(r);render();}
const API={REGIONS,NODES,get state(){return WORLD_STATE;},setWorld,listRegions,listNodes,previewNode,gatherAtNode,regenerate,render,uiGather,resultHTML,SOURCE_TAG};
global.DND_WORLD_GATHERING_V53=API;
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,900));
})(window);
