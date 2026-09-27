/** V70.25.38 multiclass spell-source / shared-slot regressions. */
'use strict';
const assert=require('assert'),vm=require('vm'),fs=require('fs');

// Class feature engine must allow Pact Magic as a shared slot source for Shield,
// Counterspell and Divine Smite, while preserving ordinary-slot behavior.
{
  const c={console,Math,Date,JSON,Number,String,Array,Object,isFinite,window:null,globalThis:null}; c.window=c;c.globalThis=c;
  c.document={getElementById:()=>null};
  c.addEventListener=()=>{};
  c.DNDCombat={rollD20:()=>({result:15}),savingThrow:()=>({success:true,roll:{result:15},total:15})};
  c.DNDRules={profBonus:()=>3};
  vm.runInNewContext(fs.readFileSync('class_features_engine.js','utf8'),c,{filename:'class_features_engine.js'});
  const h={classes:[{name:'Паладин',level:6},{name:'Колдун',level:5}],stats:{cha:18},resources:{},classFeaturesState:{},spellSlotsData:{1:{max:0,used:0},3:{max:0,used:0}},pactMagicData:{max:2,used:0,slotLevel:3},turnResources:{reaction:true}};
  const shield=c.DNDClassFeatures.resolveReaction(h,'shield',{source:'attack',attackTotal:14,targetAc:18,natural20:false,amount:0});
  assert(shield.ok && shield.spellSlotKind==='pact' && h.pactMagicData.used===1,'Shield must consume Pact Magic when no normal slot exists');
  h.turnResources.reaction=true;
  const cs=c.DNDClassFeatures.resolveReaction(h,'counterspell',{source:'spell',spellLevel:3,spellName:'Fireball',visible:true,distanceFt:30,amount:0});
  assert(cs.ok && cs.spellSlotKind==='pact' && h.pactMagicData.used===2,'Counterspell must consume Pact Magic when no normal slot exists');
  h.pactMagicData.used=0;
  const sm=c.DNDClassFeatures.useFeature(h,'divineSmite',{spellLevel:2});
  assert(sm.ok && sm.spellSlotKind==='pact' && h.pactMagicData.used===1,'Divine Smite must be able to consume Pact Magic');
}

// Network host must reject a spell whose claimed casting source is not one of
// the character's classes, and reject an incompatible casting statistic.
{
  let registered=null;const sent=[];
  const profiles={p1:{characterId:'c1',name:'Multiclass',stats:{int:16,cha:18},classes:[{name:'Волшебник',level:5},{name:'Колдун',level:3}],classFeatureIds:[],resources:{},classFeaturesState:{},spells:[
    {name:'ArcaneBolt',level:1,damage:'1d6',attackType:'spell',rangeFt:60,castingClass:'Волшебник',castingStat:'int'},
    {name:'BadSource',level:1,damage:'1d6',attackType:'spell',rangeFt:60,castingClass:'Жрец',castingStat:'wis'},
    {name:'BadStat',level:1,damage:'1d6',attackType:'spell',rangeFt:60,castingClass:'Колдун',castingStat:'int'}
  ],spellSlotsData:{1:{max:4,used:0}},pactMagicData:{max:2,used:0,slotLevel:2}}};
  const actor={id:'a',name:'Multiclass',ownerPeerId:'p1',hp:20,maxHp:20,ac:12,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
  const target={id:'b',name:'Target',ownerPeerId:'p2',hp:20,maxHp:20,ac:10,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
  const c={console,Math,Date,JSON,Number,String,Array,Object,isFinite,setTimeout:(fn)=>{fn();return 1;},clearTimeout,window:null};c.window=c;c.globalThis=c;
  c.document={getElementById:()=>null,createElement:()=>({style:{},appendChild(){},addEventListener(){}}),body:{appendChild(){}}};
  c.addEventListener=(n,fn)=>{if(n==='DOMContentLoaded')fn();};c.autoSaveCurrentCharacter=()=>{};c.renderInitiativeTracker=()=>{};c.dndRenderCombatV3=()=>{};
  c.DNDRules={profBonus:()=>3,rollD20:()=>({result:15,critical:false,fumble:false})};
  c.DNDBattleBoard={ensure:()=>({tokens:{bt_a:{sourceId:'a',x:0,y:0,size:1},bt_b:{sourceId:'b',x:4,y:0,size:1}}}),pathCost:()=>0,distanceFt:()=>20,lineOfSight:()=>({clear:true}),tokenList:()=>[]};
  c.DNDCombat={rollDice:()=>({total:1,rolls:[1]}),savingThrow:()=>({success:true,roll:{result:10},total:10}),applyDamage:()=>({amount:1,hpDamage:1})};
  c.currentChar={initiativeTracker:{round:1,activeIndex:0,combatants:[actor,target]}};
  c.dndNetwork={state:{role:'host'},getPeer:id=>({profile:profiles[id]}),sendActionResult:(id,req,res)=>sent.push(res),commitHostEvent:()=>({seq:1}),registerActionHandler:fn=>registered=fn};
  vm.runInNewContext(fs.readFileSync('network_gameplay.js','utf8'),c,{filename:'network_gameplay.js'});
  assert(registered);
  let r=registered('p1',{type:'CAST_SPELL',requestId:'bad-source',payload:{spellName:'BadSource',targetId:'b'}});
  assert.strictEqual(r,undefined);assert(sent.at(-1).ok===false && /источник/i.test(sent.at(-1).error));
  r=registered('p1',{type:'CAST_SPELL',requestId:'bad-stat',payload:{spellName:'BadStat',targetId:'b'}});
  assert.strictEqual(r,undefined);assert(sent.at(-1).ok===false && /характеристика/i.test(sent.at(-1).error));
  const beforeNormal=profiles.p1.spellSlotsData[1].used;
  const beforePact=profiles.p1.pactMagicData.used;
  r=registered('p1',{type:'CAST_SPELL',requestId:'good',payload:{spellName:'ArcaneBolt',targetId:'b'}});
  assert(r&&r.ok!==false,'valid multiclass spell source must remain castable');
  assert.strictEqual(profiles.p1.spellSlotsData[1].used,beforeNormal,'valid cast leaves normal slot untouched when Pact Magic is available');
  assert.strictEqual(profiles.p1.pactMagicData.used,beforePact+1,'valid cast consumes exactly one shared Pact Magic slot');
}
console.log('V70.25.38 multiclass spell-source/shared-slot regression: PASS');
