/** V70.25.37 spellcasting transaction regressions. */
'use strict';
const assert=require('assert'),vm=require('vm'),fs=require('fs');

// Long rest must clear dying state after restoring HP.
{
  const c={console,Math,Date,JSON,alert:()=>{},window:null}; c.window=c;
  c.document={getElementById:()=>null};
  c.renderSpellSlots=()=>{};
  c.currentChar={hpCurrent:0,hpMax:20,deathSaves:{successes:2,failures:1},defeated:true,activeConditions:{'Бессознателен':true},spellSlotsData:{1:{max:4,used:2}},pactMagicData:{max:2,used:2},pactMagic:{max:2,used:2}};
  c._dndSave=()=>{};
  vm.runInNewContext(fs.readFileSync('dnd_tools.js','utf8'),c,{filename:'dnd_tools.js'});
  c.longRestCharacter();
  assert.strictEqual(c.currentChar.hpCurrent,20);
  assert.strictEqual(c.currentChar.deathSaves.successes,0); assert.strictEqual(c.currentChar.deathSaves.failures,0);
  assert.strictEqual(c.currentChar.activeConditions['Бессознателен'],false);
  assert.strictEqual(c.currentChar.defeated,false);
}

// Fallback magic engine keeps legacy/current Pact Magic schemas synchronized.
{
  const c={console,Math,Date,JSON,window:null}; c.window=c;
  c.DNDRules={spellSlotTable:()=>({casterLevel:0,normal:{},pact:{count:2,level:3}})};
  c.currentChar={classes:[{name:'Колдун',level:5}],pactMagic:{max:2,used:1,slotLevel:2},pactMagicData:{max:2,used:1,slotLevel:2},spellsData:[]};
  vm.runInNewContext(fs.readFileSync('magic_engine.js','utf8'),c,{filename:'magic_engine.js'});
  c.updateMagicData(c.currentChar);
  assert.strictEqual(c.currentChar.pactMagicData.max,2); assert.strictEqual(c.currentChar.pactMagicData.used,1); assert.strictEqual(c.currentChar.pactMagicData.slotLevel,3);
  assert.strictEqual(c.currentChar.pactMagic.max,2); assert.strictEqual(c.currentChar.pactMagic.used,1); assert.strictEqual(c.currentChar.pactMagic.slotLevel,3);
}

// A rejected spell with no slot must not consume movement or mutate the token.
{
  let registered=null;
  const sent=[];
  const profiles={p1:{characterId:'c1',name:'Caster',stats:{int:16},classes:[{name:'Волшебник',level:5}],classFeatureIds:[],resources:{},classFeaturesState:{},spells:[{name:'Bolt',level:3,damage:'1d6',attackType:'spell',rangeFt:60}],spellSlotsData:{3:{max:1,used:1}}}};
  const actor={id:'a',name:'Caster',ownerPeerId:'p1',hp:20,maxHp:20,ac:12,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
  const target={id:'b',name:'Target',ownerPeerId:'p2',hp:20,maxHp:20,ac:10,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
  const token={sourceId:'a',x:0,y:0,size:1};
  const c={console,Math,Date,JSON,Number,String,Array,Object,isFinite,setTimeout:(fn)=>{fn();return 1;},clearTimeout,window:null}; c.window=c; c.globalThis=c;
  c.document={getElementById:()=>null,createElement:()=>({style:{},appendChild(){},addEventListener(){}}),body:{appendChild(){}}};
  c.addEventListener=(name,fn)=>{if(name==='DOMContentLoaded')fn();}; c.autoSaveCurrentCharacter=()=>{}; c.renderInitiativeTracker=()=>{}; c.dndRenderCombatV3=()=>{};
  c.DNDRules={profBonus:()=>2,rollD20:()=>({result:15,critical:false,fumble:false})};
  c.DNDBattleBoard={ensure:()=>({tokens:{'bt_a':token,'bt_b':{sourceId:'b',x:4,y:0,size:1}}}),pathCost:()=>5,distanceFt:()=>20,lineOfSight:()=>({clear:true}),tokenList:()=>[]};
  c.DNDCombat={rollDice:()=>({total:1,rolls:[1]}),savingThrow:()=>({success:true,roll:{result:10},total:10}),applyDamage:()=>({amount:1,hpDamage:1})};
  c.currentChar={initiativeTracker:{round:1,activeIndex:0,combatants:[actor,target]}};
  c.dndNetwork={state:{role:'host'},getPeer:id=>({profile:profiles[id]}),sendActionResult:(id,req,res)=>sent.push(res),commitHostEvent:()=>({seq:1}),registerActionHandler:fn=>registered=fn};
  vm.runInNewContext(fs.readFileSync('network_gameplay.js','utf8'),c,{filename:'network_gameplay.js'});
  assert(registered); const before={x:token.x,y:token.y,movementUsed:actor.turnResources.movementUsed};
  profiles.p1.spellSlotsData[3].used=0;
  profiles.p1.classFeaturesState={shifter:{activeShape:{name:'Wolf'}}};
  registered('p1',{type:'CAST_SPELL',requestId:'shifter-shape',payload:{spellName:'Bolt',targetId:'b',moveTo:{x:1,y:0}}});
  assert.strictEqual(sent[sent.length-1].ok,false,'Shifter form rejects a new cast even with an available slot');
  assert(/Шифтера/.test(sent[sent.length-1].error||sent[sent.length-1].reason||''));
  assert.strictEqual(profiles.p1.spellSlotsData[3].used,0);
  assert.strictEqual(actor.turnResources.action,true);
  assert.strictEqual(token.x,before.x);
  profiles.p1.classFeaturesState={};
  profiles.p1.spellSlotsData[3].used=1;
  const r=registered('p1',{type:'CAST_SPELL',requestId:'no-slot',payload:{spellName:'Bolt',targetId:'b',moveTo:{x:1,y:0}}});
  assert(sent.length && sent[sent.length-1].ok===false,'cast must be rejected');
  assert.strictEqual(token.x,before.x); assert.strictEqual(token.y,before.y); assert.strictEqual(actor.turnResources.movementUsed,before.movementUsed);
  assert.strictEqual(actor.turnResources.action,true,'failed cast must restore action');
  assert.strictEqual(profiles.p1.spellSlotsData[3].used,1,'failed cast must not change slot state');
}
console.log('V70.25.37 spellcasting transaction regression: PASS');
