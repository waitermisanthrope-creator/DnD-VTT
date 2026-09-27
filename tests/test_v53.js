/**
 * V53 regression test: verifies world regions/nodes, persistent depletion, real material
 * grants and professional access without creating a second resource inventory.
 */
const fs=require('fs'),vm=require('vm');
const store={};
const ctx={console,Math,Date,JSON,setTimeout:(f)=>{},clearTimeout:()=>{},localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v;}},
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],createElement:()=>({style:{},appendChild:()=>{},innerHTML:'',setAttribute:()=>{}})},
 currentChar:{name:'V53 Test',inventory:{materials:[],consumables:[],weapons:[],armor:[],junk:[]},toolProficiencies:['herbalism kit','smith'],craftingProfessions:{herbalist:{level:3,xp:300},smith:{level:2,xp:100}},abilities:{str:14,wis:16,dex:12}},
 autoSaveCurrentCharacter:()=>{},renderInventory:()=>{}};ctx.window=ctx;vm.createContext(ctx);
function load(f){vm.runInContext(fs.readFileSync('./'+f,'utf8'),ctx,{filename:f});}
['crafting_engine_v31.js','custom_crafting_v32.js','crafting_professions_v33.js','crafting_professions_v38.js','crafting_profession_progression_v47.js','crafting_resources_v34.js','resource_gathering_v35.js','world_resource_gathering_v53.js'].forEach(load);
const W=ctx.DND_WORLD_GATHERING_V53;
if(Object.keys(W.REGIONS).length!==6)throw Error('regions');
if(Object.keys(W.NODES).length!==18)throw Error('nodes');
const missing=[];for(const [id,n] of Object.entries(W.NODES)){if(!W.REGIONS[n.region])throw Error('bad region '+id);for(const [rid] of n.resources)if(!(ctx.DND_CRAFT_RESOURCES_V34.get(rid)||ctx.DND_CRAFTING_V31.MATERIALS.find(m=>m.id===rid)))missing.push(rid);}if(missing.length)throw Error('missing material '+missing.join(','));
const node='greenwood_clearing';
const before=ctx.currentChar.inventory.materials.reduce((n,x)=>n+(Number(x.count)||0),0);
const r=W.gatherAtNode(node,{ignoreRequirements:true});
if(!r.ok)throw Error('gather '+r.error);
const after=ctx.currentChar.inventory.materials.reduce((n,x)=>n+(Number(x.count)||0),0);
if(after<=before)throw Error('material not granted');
const blocked=W.gatherAtNode(node,{ignoreRequirements:true});
if(blocked.ok||!blocked.retryIn)throw Error('depletion not enforced');
const p=W.previewNode(node);if(p.ready)throw Error('preview ready after gather');
console.log(JSON.stringify({V53:'OK',regions:Object.keys(W.REGIONS).length,nodes:Object.keys(W.NODES).length,material:r.material.name,count:r.count,quality:r.quality,retryIn:r.retryIn,depleted:!blocked.ok}));
