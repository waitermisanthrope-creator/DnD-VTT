/**
 * Crafting Character Influence Test v46.
 * Как работает: запускает минимальный browser-like VM, загружает реальные данные расы,
 * класса, предысторий, черт и текущий крафт-движок, затем сравнивает одинаковый бросок
 * для персонажей с разным происхождением. Проверяет также описание источника и цепочку
 * «крысиные шкуры -> кожа -> ремесленный предмет». Основные переменные: CASES,
 * EXPECTED_BONUSES, runCraftCase, assert, results. Файл тестовый и НЕ подключается в index.html.
 */
const fs=require('fs');
const path=require('path');
const vm=require('vm');

const ROOT=__dirname;
const LOAD_FILES=[
  'materials.js','races.js','Backgrounds.js',
  'Feats/Feats_phb.js','Feats/Feats_tcoe.js','Feats/Feats_xgte.js','Feats/Feats_settings.js','Feats/Feats_ua_homebrew.js','character_creation.js',
  'classes/Artificer.js','classes/Barbarian.js','classes/Bard.js','classes/Cleric.js','classes/Druid.js','classes/Fighter.js',
  'classes/Monk.js','classes/Paladin.js','classes/Ranger.js','classes/Rogue.js','classes/Sorcerer.js','classes/Warlock.js','classes/Wizard.js',
  'expansion_class_progressions.js','classesRegistry.js','crafting_engine_v31.js','custom_crafting_v32.js',
  'crafting_professions_v33.js','crafting_professions_v38.js','resource_processing_v44.js'
];

const context={Math,console,setTimeout:()=>{},clearTimeout:()=>{},Date,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map};
context.window=context;
context.document={addEventListener(){},getElementById(){return null;}};
vm.createContext(context);
LOAD_FILES.forEach(file=>vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),context,{filename:file}));

function inventory(items){
  return {weapons:[],armor:[],consumables:[],materials:items.map(([materialId,name,count])=>({materialId,name,count})),junk:[],clothing:[]};
}
function character(extra,items){
  return Object.assign({id:'craft_test',profBonus:2,proficiencies:[
    {id:'p_smith_tools',name:'Кузнечные инструменты'},
    {id:'p_woodcarver_tools',name:'Инструменты резчика по дереву'},
    {id:'p_leatherworker_tools',name:'Инструменты кожевника'},
    {id:'p_cobbler_tools',name:'Инструменты сапожника'}
  ],inventory:inventory(items||[['steel','Сталь',10],['oak','Дуб',10],['leather','Кожа',10]])},extra||{});
}
function runCraftCase(extra){
  context.currentCharacter=character(extra);
  const old=context.Math.random;
  context.Math.random=()=>0.5; // d20 = 11
  const result=context.DND_CRAFT_PROFESSIONS_V38.craft('v38_spear');
  context.Math.random=old;
  return result;
}
function assert(condition,message){if(!condition)throw new Error(message);}

const results={};
const cases={
  plain:{raceId:'human'},
  dwarf:{raceId:'dwarf_mountain'},
  artificer:{raceId:'human',classes:[{name:'Изобретатель',level:3}]},
  guild:{raceId:'human',background:'Guild Artisan'},
  skilled:{raceId:'human',feats:['Skilled']}
};
for(const [name,extra] of Object.entries(cases)){
  const r=runCraftCase(extra);
  results[name]={total:r.total,craftingBonus:r.craftingBonus,ok:r.ok,sources:r.craftingProfile&&r.craftingProfile.sources||[]};
}
assert(results.plain.total===13,'Базовый крафт должен давать 13 при фиксированном броске.');
assert(results.dwarf.total===14 && results.dwarf.craftingBonus===1,'Горный дворф не применил +1 к кузнечному ремеслу.');
assert(results.artificer.total===15 && results.artificer.craftingBonus===2,'Изобретатель 3 уровня не применил Tool Expertise +2.');
assert(results.guild.total===14 && results.guild.craftingBonus===1,'Гильдийский ремесленник не применил ремесленный бонус.');
assert(results.skilled.total===14 && results.skilled.craftingBonus===1,'Черта Умелец не влияет на крафт.');

const dwarfDesc=context.getAllRaces().find(r=>r.id==='dwarf_mountain').desc;
const guildDesc=(context.dndBackgrounds||[]).find(b=>b.name==='Guild Artisan').description;
const classDescriptions=['Изобретатель','Бард','Друид','Следопыт','Плут','Волшебник'].map(name=>({name,annotated:!!((context.DND_CLASSES_LIST||[]).find(c=>c.name===name)||{}).desc?.includes('Ремесло:')}));
const skilledDesc=(context.FEATS_PHB||[]).find(f=>f.id==='skilled').description;
assert(String(dwarfDesc).includes('Ремесло:'),'Ремесленный эффект дворфа не указан в описании расы.');
assert(String(guildDesc).includes('Ремесло:'),'Ремесленный эффект гильдийского ремесленника не указан в описании предыстории.');
assert(String(skilledDesc).includes('Ремесло:'),'Ремесленный эффект Умельца не указан в описании черты.');
assert(classDescriptions.every(x=>x.annotated),'Не все затронутые классы получили ремесленную строку в описании.');
results.descriptions={classes:classDescriptions};

// Полная цепочка: 10 крысинных шкурок -> 1.00 кожи -> ремесленный предмет.
context.currentCharacter=character({raceId:'human'},[
  ['monster_rat_hide','Крысиная шкура',10],['thread','Нить',1]
]);
const oldRandom=context.Math.random;
context.Math.random=()=>0.25; // d20 = 6; при DC 8 и бонусе +2 это обычный success
let processing=null;
for(let i=0;i<10;i++) processing=context.DND_RESOURCE_PROCESSING_V43.process('res_monster_rat_hide_tan');
context.Math.random=oldRandom;
assert(processing&&processing.ok===true,'Обработка крысиных шкур не прошла.');
const leatherQty=context.DND_CRAFT_PROFESSIONS_V38.quantity('leather');
assert(Math.abs(leatherQty-1)<1e-9,'10 крысиных шкур должны дать суммарно 1.00 единицы кожи.');
assert(Math.abs(leatherQty-1)<1e-9,'Полученная кожа не попала в инвентарь как 1 единица.');

// Для теста downstream-крафта добавляем leather в инвентарь и проверяем доступность рецепта.
const belt=context.DND_CRAFT_PROFESSIONS_V38.craft('v38_belt',{dryRun:true});
assert(belt.ok===true,'Полученная кожа не может быть использована в следующем ремесленном рецепте.');
results.resourceChain={processedRuns:10,processedEach:0.1,totalLeather:leatherQty,downstreamRecipeAvailable:belt.ok};

console.log('V46_CRAFT_CHARACTER_INFLUENCE_TEST_OK');
console.log(JSON.stringify(results,null,2));
