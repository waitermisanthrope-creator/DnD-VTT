'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');

function load(file,ctx){
  ctx.console=console;ctx.Math=Math;ctx.Date=Date;ctx.JSON=JSON;ctx.isFinite=isFinite;
  ctx.Number=Number;ctx.String=String;ctx.Array=Array;ctx.Object=Object;ctx.parseInt=parseInt;ctx.parseFloat=parseFloat;
  ctx.setTimeout=setTimeout;ctx.clearTimeout=clearTimeout;ctx.window=ctx;ctx.global=ctx;
  vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx);
}

// Class-feature passive pipeline.
const c={document:{getElementById:()=>null,createElement:()=>({})},addEventListener:()=>{}};
c.DNDRules={profBonus:()=>3,rollD20:()=>({result:15,critical:false,fumble:false}),getSaveBonus:()=>2};
load('class_features_engine.js',c);
const F=c.DNDClassFeatures;

let rogue={classes:[{name:'Плут',level:7}],stats:{dex:18},resources:{},classFeaturesState:{}};
let sm=F.saveModifiers(rogue,{saveType:'dex',dexSaveVisible:true});
assert.strictEqual(sm.evasion,true,'Rogue Evasion must be exposed by saveModifiers');

let pal={classes:[{name:'Паладин',level:6}],stats:{cha:18},resources:{},classFeaturesState:{}};
let ally={classes:[{name:'Воин',level:5}],stats:{con:14},resources:{},classFeaturesState:{}};
let aura=F.saveModifiers(ally,{saveType:'con',allyWithinAura:true,auraSource:pal});
assert.strictEqual(aura.bonus,4,'Aura of Protection should use paladin CHA');

let dragon={classes:[{name:'Чародей',level:6,subclass:'Драконье происхождение'}],stats:{cha:18},resources:{},classFeaturesState:{},draconicElement:'fire'};
let elem=F.spellDamageModifiers(dragon,{damageType:'fire',spellLevel:2,hasDamage:true});
assert.strictEqual(elem.bonus,4,'Elemental Affinity should add CHA to matching spell damage');

let wild={classes:[{name:'Чародей',level:18,subclass:'Дикая магия'}],stats:{cha:20},resources:{},classFeaturesState:{}};
let bomb=F.spellDamageModifiers(wild,{damageType:'fire',spellLevel:3,hasDamage:true});
assert.strictEqual(bomb.rerollOne,true,'Spell Bombardment should request one damage-die reroll');

let evo={classes:[{name:'Волшебник',level:14,subclass:'Школа Воплощения'}],stats:{int:18},resources:{},classFeaturesState:{}};
let prep=F.useFeature(evo,'overchannel',{});
assert(prep.ok&&prep.prepared,'Overchannel should arm as a real pending effect');
let oc=F.spellDamageModifiers(evo,{damageType:'fire',spellLevel:3,hasDamage:true});
assert.strictEqual(oc.maximize,true);
assert.strictEqual(evo.classFeaturesState.overchannelActive,false);
let oc2=F.spellDamageModifiers(evo,{damageType:'fire',spellLevel:3,hasDamage:true});
assert.strictEqual(oc2.maximize,false,'Overchannel must be consumed after one spell');

// Combat engine: Evasion outcome and Arcane Ward absorption.
const combat={document:{getElementById:()=>null,createElement:()=>({})},addEventListener:()=>{}};
combat.DNDRules={
  getSaveBonus:()=>0,
  rollD20:()=>({result:15,critical:false,fumble:false}),
  normalizeConditionName:x=>x,
  conditionModifiers:()=>({autoFailStrDex:false})
};
combat.DNDClassFeatures=F;
load('combat_engine.js',combat);
const dexHero={classes:[{name:'Плут',level:7}],stats:{dex:18},classFeaturesState:{},hp:20,maxHp:20};
let sr=combat.DNDCombat.savingThrow(dexHero,'dex',10,'normal');
assert.strictEqual(sr.success,true);
assert.strictEqual(sr.evasion,true,'Successful DEX save should expose Evasion');

let ward={hp:20,maxHp:20,tempHp:0,classFeaturesState:{arcaneWard:10},resistances:[],vulnerabilities:[],immunities:[]};
let dmg=combat.DNDCombat.applyDamage(ward,7,'fire');
assert.strictEqual(dmg.wardAbsorbed,7);
assert.strictEqual(ward.hp,20);
assert.strictEqual(ward.classFeaturesState.arcaneWard,3);

console.log('V70.25.19 Fix Batch 19: Evasion + Aura + spell modifiers + Overchannel + Arcane Ward: PASS');
