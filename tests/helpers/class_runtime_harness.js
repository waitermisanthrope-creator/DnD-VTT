const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'../..');
function runtime(){
  const el=()=>({style:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},addEventListener(){},setAttribute(){},querySelector(){return null},querySelectorAll(){return[]}});
  const ctx={console:{log(){},warn(){},error(){}},Math:Object.create(Math),Date,JSON,Set,Map,Number,String,Array,Object,RegExp,parseInt,parseFloat,alert(){},prompt(){return null},confirm(){return false},setTimeout(){},clearTimeout(){},setInterval(){},clearInterval(){},addEventListener(){},dispatchEvent(){},localStorage:{getItem(){return null},setItem(){},removeItem(){}},document:{readyState:'loading',getElementById(){return null},querySelector(){return null},querySelectorAll(){return[]},addEventListener(){},createElement:el,body:el(),documentElement:el()},navigator:{},location:{},CustomEvent:function(){}};
  ctx.window=ctx;ctx.globalThis=ctx;ctx.Math.random=()=>0;vm.createContext(ctx);
  const scripts=[...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script[^>]*src="\.\/(app\/[^"?]+)(?:\?[^\"]*)?"/g)].map(m=>m[1]);
  const selected=scripts.filter(f=>/app\/data\/(classes\/.*\.js|subclasses\/.*\.js)$/.test(f)||/\/(classesRegistry|expansion_class_progressions|expanded_subclasses_v23|character_creation|rulesEngine|content_framework|expansion_classes_pack|expanded_classes_v23|blood_hunter_engine|expanded_class_registry_bridge|kibbles_localization_content_v71|class_features_engine|combat_abilities|combat_engine|magic_engine|secondary_entities_engine|summoning_engine|companion_packs_v26)\.js$/.test(f)||/_runtime\.js$/.test(f));
  for(const f of [...new Set(selected)])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f,timeout:10000});
  return ctx;
}
function hero(name,level=20,subclass){return {id:'class-audit-hero',name:'Проверка',level,classes:[{name,level,subclass}],stats:{strength:16,dexterity:14,constitution:14,intelligence:16,wisdom:14,charisma:16},proficiencyBonus:Math.floor((level-1)/4)+2,hpCurrent:30,hpMax:40,hpTemp:0,ac:10,speed:30,resources:{},classFeaturesState:{},features:[],turnResources:{actions:1,bonusAction:1,reaction:1,movement:30},spellSlotsData:{1:{max:4,used:0},2:{max:3,used:0}}};}
module.exports={runtime,hero,root};
