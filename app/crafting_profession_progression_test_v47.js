/**
 * Crafting Profession Progression Test v47.
 * Как работает: поднимает минимальный VM с реальным crafting_professions_v38 и v47,
 * проверяет необязательное поле профессии, обучение, XP, уровни, бонусы, блокировку
 * рецептов и метаданные качества созданного предмета. Основные переменные: CASES,
 * character(), assert(), results. Файл тестовый и НЕ подключается в index.html.
 */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=__dirname;
const files=['materials.js','races.js','Backgrounds.js','crafting_engine_v31.js','custom_crafting_v32.js','crafting_professions_v33.js','crafting_professions_v38.js','crafting_profession_progression_v47.js'];
const context={Math,console,setTimeout:()=>{},clearTimeout:()=>{},Date,JSON,Object,Array,Number,String,Boolean,RegExp,Set,Map};context.window=context;context.document={addEventListener(){},getElementById(){return null;}};vm.createContext(context);
files.forEach(f=>vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),context,{filename:f}));
function inventory(items){return{weapons:[],armor:[],consumables:[],materials:items.map(([materialId,name,count])=>({materialId,name,count})),junk:[],clothing:[]};}
function character(extra,items){return Object.assign({id:'v47',profBonus:2,proficiencies:[{id:'p_smith_tools',name:'Кузнечные инструменты'},{id:'p_woodcarver_tools',name:'Инструменты резчика по дереву'},{id:'p_leatherworker_tools',name:'Инструменты кожевника'},{id:'p_cobbler_tools',name:'Инструменты сапожника'},{id:'p_carpenter_tools',name:'Плотницкие инструменты'}],inventory:inventory(items||[['steel','Сталь',20],['oak','Дуб',20],['leather','Кожа',20],['thread','Нить',20]])},extra||{});}
function assert(x,m){if(!x)throw new Error(m);}
function craft(id,extra){context.currentCharacter=character(extra);const old=context.Math.random;context.Math.random=()=>0.5;const r=context.DND_CRAFT_PROFESSIONS_V38.craft(id);context.Math.random=old;return r;}
const api=context.DND_CRAFT_PROFESSION_PROGRESS;
const results={};
context.currentCharacter=character({raceId:'human'});
api.ensureCharacterProfessions();
assert(Object.keys(context.currentCharacter.craftingProfessions).length===0,'Профессии должны быть необязательными.');
let r=api.learnProfession('smith');assert(r.ok,'Кузнец не обучился.');
assert(api.getProfession(null,'smith').level===1,'Стартовый уровень профессии должен быть 1.');
results.learned=api.getProfession(null,'smith');
const spear=craft('v38_spear',{craftingProfessions:{smith:{level:1,xp:0,name:'Кузнец'}}});
assert(spear.ok,'Ученик должен иметь доступ к базовому рецепту копья.');
assert(spear.craftingBonus===0,'Ученик не должен получать бонус проверки.');
assert(context.currentCharacter.craftingProfessions.smith.xp===20,'Успешный крафт должен автоматически дать XP профессии.');
results.level1={ok:spear.ok,total:spear.total,bonus:spear.craftingBonus};
context.currentCharacter=character({craftingProfessions:{smith:{level:1,xp:80,name:'Кузнец'}}});
const gain=api.addXP('smith',20,'тест');
assert(gain.leveledUp&&gain.level===2,'100 XP должны поднять кузнеца до 2 уровня.');
assert(api.getProfile(null,['smith']).bonus===1,'2 уровень должен давать +1 к проверке.');
results.level2={gain,profile:api.getProfile(null,['smith'])};
const multi2={smith:{level:2,xp:100,name:'Кузнец'},carpenter:{level:2,xp:100,name:'Плотник'},leatherworker:{level:2,xp:100,name:'Кожевник'}};
const shieldAccess=api.canCraftRecipe(context.DND_CRAFT_PROFESSIONS_V38.ALL_RECIPES.find(r=>r.id==='v38_shield'),character({craftingProfessions:multi2}));
assert(shieldAccess.ok,'Три профессии 2 уровня должны открыть составной рецепт щита DC 12.');
context.currentCharacter=character({craftingProfessions:multi2});
const shield=craft('v38_shield',{craftingProfessions:multi2});
assert(shield.ok,'Кузнец 2 уровня должен создать щит.');
assert(shield.item.craftMasterworkBonus===1,'Созданный предмет должен получить бонус качества профессии.');
assert(shield.item.craftDurabilityBonus===1,'Созданный предмет должен получить бонус надёжности профессии.');
results.item={name:shield.item.name,masterworkBonus:shield.item.craftMasterworkBonus,durabilityBonus:shield.item.craftDurabilityBonus};
context.currentCharacter=character({craftingProfessions:{smith:{level:1,xp:0,name:'Кузнец'},carpenter:{level:1,xp:0,name:'Плотник'},leatherworker:{level:1,xp:0,name:'Кожевник'}}});
const locked=api.canCraftRecipe(context.DND_CRAFT_PROFESSIONS_V38.ALL_RECIPES.find(r=>r.id==='v38_shield'));
assert(!locked.ok&&locked.missing.some(m=>m.requiredLevel===2),'Щит должен быть закрыт для профессий 1 уровня.');
results.unlock={lockedAt1:true,missing:locked.missing};
console.log('V47_CRAFTING_PROFESSION_PROGRESS_TEST_OK');console.log(JSON.stringify(results,null,2));
