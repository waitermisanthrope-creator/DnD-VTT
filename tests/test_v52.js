const fs=require('fs'),vm=require('vm');
const ctx={console,Math,Date,JSON,setTimeout:(f)=>{},clearTimeout:()=>{},localStorage:{getItem:()=>null,setItem:()=>{}},
 document:{addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],createElement:()=>({style:{},appendChild:()=>{},innerHTML:'',setAttribute:()=>{}})},
 currentChar:{name:'Test',inventory:{materials:[],consumables:[],weapons:[],armor:[],junk:[]},toolProficiencies:['alchemist'],craftingProfessions:{alchemist:{level:3,xp:300}},race:'vedalken',level:3},
 autoSaveCurrentCharacter:()=>{},renderInventory:()=>{}};ctx.window=ctx;vm.createContext(ctx);
function load(f){vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});}
['crafting_engine_v31.js','custom_crafting_v32.js','crafting_professions_v33.js','crafting_professions_v38.js','crafting_profession_progression_v47.js','crafting_resources_v34.js','resource_gathering_v35.js','alchemy_engine_v29.js','alchemy_gameplay_v30.js','alchemy_gathering_professions_v52.js'].forEach(x=>load('./'+x));
const A=ctx.DNDAlchemy,V=ctx.DND_ALCHEMY_GATHERING_V52;
if(A.ingredients.length!==120) throw Error('ingredients '+A.ingredients.length);
if(Object.keys(V.INGREDIENT_SOURCES).length!==120) throw Error('sources');
let missing=Object.values(V.INGREDIENT_SOURCES).filter(x=>!x.primaryResourceId); if(missing.length) throw Error('missing source '+missing.length);
let p=V.professionProfile(); if(p.bonus<2) throw Error('profession bonus '+p.bonus);
let before=ctx.currentChar.inventory.materials.reduce((n,x)=>n+(x.count||0),0);
let g=V.gatherIngredient('ing_001',{die:4}); if(!g.ok) throw Error(g.error); if(!g.amount) throw Error('zero gathered');
let item=ctx.currentChar.inventory.materials.find(x=>x.alchemyId==='ing_001'); if(!item||item.count!==g.amount) throw Error('ingredient not granted');
let mix=V.mix(['ing_001','ing_009'],null,{consume:false}); if(!mix.ok) throw Error('mix '+mix.error); if(mix.craftingProfessionBonus!==p.bonus) throw Error('bonus mismatch');
console.log(JSON.stringify({V52:'OK',ingredients:A.ingredients.length,sources:Object.keys(V.INGREDIENT_SOURCES).length,professionBonus:p.bonus,gathered:g.amount,mixBonus:mix.craftingProfessionBonus}));
