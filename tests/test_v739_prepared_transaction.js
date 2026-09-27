/** V70.25.39 prepared-action / prepared-spell transaction regressions. */
const assert=require('assert'),vm=require('vm'),fs=require('fs');
let registered=null;const sent=[];
const profiles={p1:{characterId:'c1',name:'Mage',stats:{int:16},classes:[{name:'Волшебник',level:5}],classFeatureIds:[],resources:{},classFeaturesState:{},spells:[{name:'Fire Bolt',level:1,damage:'1d10',attackType:'spell',damageType:'force',castingClass:'Волшебник',castingStat:'int',castingTime:'1 action',rangeFt:120}],spellSlotsData:{1:{max:2,used:0}},pactMagicData:null}};
const actor={id:'a',name:'Mage',ownerPeerId:'p1',type:'hero',team:'party',hp:20,maxHp:20,ac:15,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
let target={id:'b',name:'Target',type:'monster',team:'enemy',hp:20,maxHp:20,ac:10};
const ctx={console,Math,Date,JSON,Number,String,Array,Object,isFinite,setTimeout:(fn)=>{fn();return 1},clearTimeout,window:null,globalThis:null};ctx.window=ctx;ctx.globalThis=ctx;
ctx.document={getElementById:()=>null,createElement:()=>({style:{},appendChild(){},addEventListener(){},prepend(){},children:[],removeChild(){}}),body:{appendChild(){}}};
ctx.addEventListener=(name,fn)=>{if(name==='DOMContentLoaded')fn()};ctx.autoSaveCurrentCharacter=()=>{};ctx.renderInitiativeTracker=()=>{};ctx.dndRenderCombatV3=()=>{};ctx.dndNetworkGameplayRender=()=>{};
ctx.DNDRules={profBonus:()=>2,rollD20:()=>({result:12,critical:false,fumble:false})};
ctx.DNDCombat={rollDice:()=>({total:4,rolls:[4]}),resolveAttack:()=>null,savingThrow:()=>({success:false,roll:{result:5},total:5}),applyDamage:(c,a)=>{c.hp=Math.max(0,c.hp-a);return {amount:a,hpDamage:a}}};
ctx.DNDBattleBoard={ensure:()=>null};ctx.DNDClassFeatures={buildFeatureSet:()=>[],reactionOptions:()=>null,spellDamageModifiers:()=>({bonus:0,maximize:false,rerollOne:false,notes:[]})};
ctx.currentChar={id:'c1',name:'Mage',initiativeTracker:{round:1,activeIndex:0,combatants:[actor,target]}};ctx.currentCharacter=ctx.currentChar;
ctx.dndNetwork={state:{role:'host'},getPeer:id=>peers[id],registerActionHandler:fn=>registered=fn,sendActionResult:(id,req,res)=>sent.push(res),commitHostEvent:()=>({seq:1})};const peers={p1:{profile:profiles.p1}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('network_gameplay.js','utf8'),ctx,{filename:'network_gameplay.js'});
assert(registered,'host action handler missing');

// Preparing a spell spends the Action and exactly one slot at preparation time.
let r=registered('p1',{type:'PREPARE_ACTION',requestId:'prep1',payload:{type:'CAST_SPELL',spellName:'Fire Bolt',targetId:'b'}});
assert(r===undefined || sent.at(-1).ok===true,'prepare spell should succeed');
assert.strictEqual(actor.turnResources.action,false,'Ready should spend Action');
assert.strictEqual(profiles.p1.spellSlotsData[1].used,1,'Ready spell must spend slot at preparation');
assert(actor.preparedAction&&actor.preparedAction.preparedSpellSlot,'prepared slot reservation missing');

// If the trigger becomes invalid, the reaction/resource transaction rolls back and the prepared plan survives.
ctx.currentChar.initiativeTracker.combatants.splice(1,1);ctx.currentChar.initiativeTracker.activeIndex=0;
let failed=ctx.dndNetworkGameplayExecutePreparedGroup();
assert(failed&&failed.ok,'prepared group should process');
assert(actor.preparedAction,'failed prepared action must remain recoverable');
assert.strictEqual(actor.turnResources.reaction,true,'failed trigger must not consume reaction');
assert.strictEqual(profiles.p1.spellSlotsData[1].used,1,'rollback must preserve the reservation, not double-spend it');

// Restore the target: execution succeeds and must not consume a second spell slot.
ctx.currentChar.initiativeTracker.combatants.push(target);ctx.currentChar.initiativeTracker.activeIndex=0;ctx.dndNetworkGameplayExecutePreparedGroup();
assert.strictEqual(actor.preparedAction,null,'successful prepared action must be cleared');
assert.strictEqual(profiles.p1.spellSlotsData[1].used,1,'prepared spell must not spend a second slot on trigger');
assert.strictEqual(actor.turnResources.reaction,false,'successful trigger consumes Reaction exactly once');
assert(target.hp<20,'prepared spell effect should resolve');
console.log('V70.25.39 prepared-action/prepared-spell transaction regression: PASS');
