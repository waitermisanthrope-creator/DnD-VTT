'use strict';
// Local source data only. No JS engine or downloaded executable content in the player.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..');
const files=[...new Set([...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/src="\.\/(app\/data\/classes\/[^"?]+\.js)"/g)].map(m=>m[1]).filter(p=>!/(level_up|extra_class_stubs)\.js$/.test(p)))];
files.splice(files.indexOf('app/data/classes/progressionEngine.js'),0,'app/expansion_class_progressions.js','app/shifter_laserllama_v2_1_runtime.js','app/classesRegistry.js','app/data/subclasses/subclassesRegistry.js','app/Proficiencies.js','app/Hero-info.js','app/Experience.js','app/rulesEngine.js','app/magic_engine.js');
const ctx={console:{log(){},warn(){}},document:{addEventListener(){},getElementById(){return null;},querySelectorAll(){return[];}},setTimeout(){},addEventListener(){}};ctx.window=ctx;vm.createContext(ctx);
const requirements={};
for(const f of files){
 vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f,timeout:5000});
 for(const value of Object.values(ctx))if(value&&typeof value==='object'&&value.className&&value.multiclassRequirement)requirements[value.className]=JSON.parse(JSON.stringify(value.multiclassRequirement));
}
const clone=x=>JSON.parse(JSON.stringify(x));
const classes={};
for(const [name,base] of Object.entries(ctx.CLASSES_REFERENCE)) {
 const data=ctx.getClassData(name),p=data.progression;
 if(!p?.levels||data.isExtra||data.isExtraClass||p.status==='stub')continue;
 classes[name]={multiclassAllowed:data.multiclassAllowed!==false,hitDie:data.hitDie||base.hitDie,levels:clone(p.levels),subclasses:clone(ctx.SUBCLASSES_REFERENCE[name]||{}),requirements:clone(vm.runInContext('MULTICLASS_REQUIREMENTS',ctx)[name]||p.multiclassRequirement||requirements[name]||{}),multiclass:clone(ctx.MULTICLASS_PROFICIENCIES_2014[name]||{fixed:[]}),spellAbility:ctx.CLASS_SPELLCASTING_ABILITIES_2014[name]||null};
}
// Runtime Shifter publishes its authoritative bloodlines and ASI levels separately.
if(classes['Шифтер']){
 const x=classes['Шифтер'];for(const level of ctx.SHIFTER_V21.ASI)x.levels[level].asi=true;
 x.subclasses={};for(const [name,line] of Object.entries(ctx.SHIFTER_V21.bloodlines))x.subclasses[name]={pickLevel:1,description:line.description,levels:Object.fromEntries(Object.entries(line.features).map(([k,v])=>[k,{features:v}]))};
}
const slots={};for(let i=1;i<=20;i++){let h={classes:[{name:'Волшебник',level:i}]};slots[i]=clone(ctx.DNDRules.spellSlotTable(h).normal);}
const pact={};for(let i=1;i<=20;i++)pact[i]=clone(ctx.DNDRules.spellSlotTable({classes:[{name:'Колдун',level:i}]}).pact);
const out={schema:1,sources:files.map(file=>({file,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')})),xp:ctx.DND_EXP_TABLE.map(x=>x.exp),classes,slots,pact,proficiencies:ctx.PROFICIENCIES_DB};
// Differential cases execute actual legacy functions, not a second formula in the exporter.
const golden=[];
for(const name of Object.keys(classes))for(let level=1;level<=20;level++){
 let h={id:'golden',classes:[{name,level}],features:[]};ctx.applyClassProgression(h,name,level);
 golden.push({name,level,features:h.features,fields:Object.fromEntries(['sneakAttackDice','ragesCount','rageDamageBonus','kiPoints','sorceryPoints'].filter(k=>h[k]!=null).map(k=>[k,h[k]]))});
}
const magicCases=[];
for(let level=1;level<=20;level++)for(const classes of [
 [{name:'Волшебник',level},{name:'Жрец',level:1}],
 [{name:'Изобретатель',level},{name:'Колдун',level:1}],
 [{name:'Воин',level,subclass:'Мистический рыцарь'},{name:'Плут',level:3,subclass:'Мистический ловкач'}],
 [{name:'Кровавый охотник',level,subclass:'Орден осквернённых душ'}],
 [{name:'Кровавый охотник',level,subclass:'Орден осквернённых душ'},{name:'Колдун',level:1}]
])magicCases.push({classes,expected:clone(ctx.DNDRules.spellSlotTable({classes:clone(classes)}))});
const target=path.join(root,'unity/Assets/Vtt/Resources/CharacterSheet/advancement.json');
const body=JSON.stringify(out,null,2)+'\n',fixtures=JSON.stringify({cases:golden,magicCases},null,2)+'\n';
if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==body||fs.readFileSync(path.join(root,'unity/Assets/Vtt/Tests/advancement-contract.json'),'utf8')!==fixtures)throw Error('Stale advancement export');}
else{fs.writeFileSync(target,body);fs.writeFileSync(path.join(root,'unity/Assets/Vtt/Tests/advancement-contract.json'),fixtures);}
console.log('ADVANCEMENT_SOURCE_PASS',Object.keys(classes).length,'classes',golden.length,'class-level cases');
