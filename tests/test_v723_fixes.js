'use strict';
const assert=require('assert'),fs=require('fs'),vm=require('vm');
let domReady=null,registered=null,sent=[];
const ctx={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout:(fn)=>{fn();return 1;},clearTimeout,alert:null,prompt:null};
ctx.window=ctx;ctx.global=ctx;ctx.addEventListener=(n,f)=>{if(n==='DOMContentLoaded')domReady=f;};
ctx.document={getElementById:()=>null,createElement:()=>({style:{},appendChild(){},setAttribute(){}})};
ctx.DNDRules={profBonus:()=>2,rollD20:()=>({result:15,critical:false,fumble:false}),weaponAttack:()=>({roll:{result:15,critical:false,fumble:false},bonus:5})};
ctx.DNDBattleBoard={ensure:()=>({cellFt:5,tokens:{'bt_a':{sourceId:'a',x:0,y:0,size:1},'bt_b':{sourceId:'b',x:5,y:0,size:1}}}),distanceFt:()=>5,lineOfSight:()=>({clear:true}),tokenList:()=>[{sourceId:'a',x:0,y:0,size:1},{sourceId:'b',x:5,y:0,size:1}]};
const profiles={
 p1:{characterId:'c1',name:'Caster',stats:{int:16,str:16},classes:[{name:'Волшебник',level:5}],classFeatureIds:[],resources:{},classFeaturesState:{},weapons:[{id:'w1',name:'Sword',damage:'1d6+3',damageType:'рубящий',rangeFt:5}],spells:[{name:'Bolt',level:3,damage:'1d6',damageType:'огонь',attackType:'spell',rangeFt:60}],spellSlotsData:{3:{max:1,used:0}}},
 p2:{characterId:'c2',name:'Wizard',stats:{int:16,dex:16},classes:[{name:'Волшебник',level:5}],classFeatureIds:[],resources:{},classFeaturesState:{},spells:[],spellSlotsData:{1:{max:1,used:0},3:{max:1,used:0}},proficiencyBonus:2}
};
ctx.dndNetwork={state:{role:'host'},getPeer:id=>({profile:profiles[id]}),sendActionResult:(id,req,res)=>sent.push({kind:'result',id,req,res}),sendReactionRequest:(id,p)=>sent.push({kind:'reaction',id,p}),commitHostEvent:(t,p)=>({seq:1}),registerActionHandler:fn=>registered=fn};
ctx.currentChar={name:'Host',initiativeTracker:{round:1,activeIndex:0,combatants:[
 {id:'a',name:'Caster',ownerPeerId:'p1',hp:20,maxHp:20,ac:12,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}},
 {id:'b',name:'Wizard',ownerPeerId:'p2',hp:20,maxHp:20,ac:20,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}}
]}};
ctx.autoSaveCurrentCharacter=()=>{};ctx.renderInitiativeTracker=()=>{};ctx.dndRenderCombatV3=()=>{};
vm.createContext(ctx);
for(const f of ['combat_engine.js','class_features_engine.js','network_gameplay.js'])vm.runInContext(fs.readFileSync('./'+f,'utf8'),ctx,{filename:f});
assert(domReady);domReady();assert(registered);

// Shield: real attack pauses before damage and +5 AC can negate it.
let r=registered('p1',{type:'ATTACK',requestId:'shield-atk',payload:{targetId:'b',weaponId:'w1'}});
assert(r&&r.reactionPending,'Shield should open a pre-damage reaction window');
let rq=sent.find(x=>x.kind==='reaction'&&x.p.reactionId===r.reaction.reactionId);assert(rq&&rq.p.options.some(x=>x.id==='shield'),'Shield option missing');
let before=ctx.currentChar.initiativeTracker.combatants[1].hp;
let rr=registered('p2',{type:'REACTION_RESPONSE',requestId:'shield-resp',payload:{reactionId:r.reaction.reactionId,choice:'shield'}});
assert(rr&&rr.ok);assert.strictEqual(ctx.currentChar.initiativeTracker.combatants[1].hp,before,'Shielded attack must deal no damage when AC+5 negates it');
assert.strictEqual(profiles.p2.spellSlotsData[1].used,1,'Shield must consume a 1st-level slot');

// Counterspell: a qualifying reactor gets a pre-effect window; successful auto-counter at equal slot level blocks spell.
ctx.currentChar.initiativeTracker.combatants[0].turnResources={action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0};
ctx.currentChar.initiativeTracker.combatants[1].turnResources={action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0};
profiles.p1.spellSlotsData[3]={max:2,used:0};profiles.p2.spellSlotsData[3]={max:1,used:0};sent.length=0;
r=registered('p1',{type:'CAST_SPELL',requestId:'cs-test',payload:{targetId:'b',spellName:'Bolt'}});
assert(r&&r.reactionPending,'Counterspell should defer spell effect');
rq=sent.find(x=>x.kind==='reaction'&&x.p.reactionId===r.reaction.reactionId);assert(rq&&rq.p.options.some(x=>x.id==='counterspell'),'Counterspell option missing');
before=ctx.currentChar.initiativeTracker.combatants[1].hp;
rr=registered('p2',{type:'REACTION_RESPONSE',requestId:'cs-resp',payload:{reactionId:r.reaction.reactionId,choice:'counterspell'}});
assert(rr&&rr.kind==='spell_countered'&&rr.countered,'Spell should be countered');
assert.strictEqual(ctx.currentChar.initiativeTracker.combatants[1].hp,before,'Countered spell must deal no damage');
assert.strictEqual(profiles.p2.spellSlotsData[3].used,1,'Counterspell must consume its spell slot');
console.log('PASS V70.23 pre-effect reactions: Shield + Counterspell');
