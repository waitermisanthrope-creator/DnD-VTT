const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),B=g.DNDCombat;
const h=hero('Волшебник',9);h.id='wizard';h.characterId='wizard';h.hpCurrent=40;h.hpMax=40;
h.spells=[
 {name:'Туманный шаг (Misty Step)',level:2,castingClass:'Волшебник',castingStat:'int',castingTime:'1 бонусное действие',rangeFt:30},
 {name:'Дверь измерений (Dimension Door)',level:4,castingClass:'Волшебник',castingStat:'int',castingTime:'1 действие',rangeFt:500},
 {name:'Мерцание (Blink)',level:3,castingClass:'Волшебник',castingStat:'int',castingTime:'1 действие'},
 {name:'Волшебная стрела',level:1,castingClass:'Волшебник',castingStat:'int',castingTime:'1 действие',damage:'1d4',damageType:'force'}
];
h.spellSlotsData={1:{max:4,used:0},2:{max:3,used:0},4:{max:2,used:0}};
const caster={id:'wizard',characterId:'wizard',ownerPeerId:'p1',name:'Волшебник',type:'hero',hp:40,maxHp:40,ac:10,stats:h.stats,
 turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
const foe={id:'enemy',name:'Противник',type:'monster',hp:30,maxHp:30,ac:10};
const tokens={bt_wizard:{id:'bt_wizard',sourceId:'wizard',x:0,y:0,size:1},bt_enemy:{id:'bt_enemy',sourceId:'enemy',x:3,y:2,size:1}};
const board={tokens,cols:40,rows:20,cellFt:5,obstacles:{'4:0':true},walls:[]};
g.DNDBattleBoard={ensure:()=>board,findToken:k=>tokens[k],tokenList:()=>Object.values(tokens),
 distanceFt:(a,b)=>Math.max(Math.abs(a.x-b.x),Math.abs(a.y-b.y))*5,
 lineOfSight:(a,b)=>({clear:!(b.x===2&&b.y===0),cover:0}),
 pathCost:(a,b)=>Math.abs(a.x-b.x)*5+Math.abs(a.y-b.y)*5};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[caster,foe],battlefield:board}};
g.currentCharacter=g.currentChar;g.autoSaveCurrentCharacter=()=>{};g.renderInitiativeTracker=()=>{};g.dndRenderCombatV3=()=>{};g.dndNetworkGameplayRender=()=>{};
const peers={p1:{profile:h}};let handler;const responses=[];
g.dndNetwork={state:{role:'host'},getPeer:id=>peers[id],roster:()=>[],registerActionHandler:fn=>handler=fn,sendActionResult:(peer,id,r)=>responses.push(r),commitHostEvent:()=>({seq:1})};
g.addEventListener=(event,cb)=>{if(event==='DOMContentLoaded')cb();};
vm.runInContext(fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8'),g,{filename:'app/network_gameplay.js'});
assert(handler);
let counter=0;function cast(name,x,y,extra={}){
 handler('p1',{type:'CAST_SPELL',requestId:'teleport-'+(++counter),payload:{spellName:name,teleportTo:{x,y},...extra}});
 return responses.at(-1);
}
const mist='Туманный шаг (Misty Step)',door='Дверь измерений (Dimension Door)';
assert.strictEqual(cast(mist,4,0).ok,false,'cannot arrive in obstacles');
assert.strictEqual(cast(mist,3,2).ok,false,'cannot arrive on occupied creature');
assert.strictEqual(cast(mist,2,0).ok,false,'Misty Step must see destination');
assert.strictEqual(cast(mist,7,0).ok,false,'Misty Step range is only 30ft');
assert.strictEqual(cast(mist,-1,0).ok,false);
assert.strictEqual(cast(mist,1.5,0).ok,false,'floating cell invalid');
assert.strictEqual(tokens.bt_wizard.x,0);
assert.strictEqual(caster.hp,40,'invalid destination does not cause combat damage');
assert.strictEqual(h.spellSlotsData[2].used,0,'invalid move never spends slot');
assert.strictEqual(cast('Мерцание (Blink)',1,0).ok,false,'unsupported movement spells fail closed');
assert.strictEqual(cast('Волшебная стрела',1,0).ok,false,'non-teleport spells reject client movement');
let r=cast(mist,5,0);
assert(r.ok,JSON.stringify(r));assert.strictEqual(r.teleport.allowed,true);assert.strictEqual(tokens.bt_wizard.x,5);
assert.strictEqual(h.spellSlotsData[2].used,1);assert.strictEqual(caster.turnResources.bonusAction,false);
assert.strictEqual(cast(mist,6,0).ok,false,'bonus action unavailable after casting');
caster.turnResources.action=true;
r=cast(door,8,0);
assert(r.ok,JSON.stringify(r));assert.strictEqual(tokens.bt_wizard.x,8);assert.strictEqual(h.spellSlotsData[4].used,1);
caster.turnResources.action=true;
assert.strictEqual(cast(door,9,0,{targetId:'enemy'}).ok,false,'cannot teleport other creatures by spoofing target');

// Tethering must resolve damage/save before committing the destination, and
// a resisted transition is still a spell cast that consumes the slot/action.
caster.classFeaturesState={bloodHunterBrand:{ownerId:'hunter-owner',level:13,order:'ghostslayer',dc:18}};
g.Math.random=()=>0;g.DNDRules.rollD20=()=>({result:1,critical:false,fumble:true});
const hp=caster.hp;caster.turnResources.bonusAction=true;
r=cast(mist,9,0);
assert(r.ok,JSON.stringify(r));assert.strictEqual(r.teleport.branded,true);assert.strictEqual(r.teleport.allowed,false);
assert.strictEqual(tokens.bt_wizard.x,8,'failed Wisdom save prevents transit');
assert.strictEqual(caster.hp,hp-4,'4d6 psychic damages authoritative combatant');
assert.strictEqual(h.hpCurrent,caster.hp,'host synchronizes branded HP to player profile');
assert.strictEqual(h.spellSlotsData[2].used,2,'failed transit still spends pact/spell slot');
assert.strictEqual(caster.turnResources.bonusAction,false);
g.DNDRules.rollD20=()=>({result:20,critical:true,fumble:false});
caster.turnResources.action=true;
const after=caster.hp;r=cast(door,9,0);
assert(r.ok,JSON.stringify(r));assert.strictEqual(r.teleport.allowed,true);
assert.strictEqual(tokens.bt_wizard.x,9);
assert.strictEqual(caster.hp,after-4,'successful transit still deals Tethering damage');
assert.strictEqual(h.spellSlotsData[4].used,2);
assert.strictEqual(cast(door,10,0).ok,false,'duplicate cast cannot bypass spent action');
console.log('PASS: host Misty Step/Dimension Door true teleport, occupancy/LoS/range, Tethering damage/save and slot transaction');
