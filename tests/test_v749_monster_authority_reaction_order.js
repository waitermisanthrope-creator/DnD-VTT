/** V70.25.49 — monster resource authority + prepared ordering regression. */
const assert=require('assert');const fs=require('fs');const vm=require('vm');const root=__dirname;
function ctx(extra={}){const c={console,Math,JSON,Date,window:null,document:{getElementById:()=>null},...extra};c.window=c;return vm.createContext(c);}
const mctx=ctx({DNDCombat:{attack:()=>({}),attackSequence:()=>({attacks:[],attackCount:0,hitCount:0,targetDefeated:false}),toggleCondition:()=>{}},DNDRules:{rollD20:()=>({result:10}),getSaveBonus:()=>0}});
vm.runInContext(fs.readFileSync(root+'/monster_engine.js','utf8'),mctx,{filename:'monster_engine.js'});
const M=mctx.DNDMonsters;assert(M&&M.VERSION==='2.1.0','monster engine version');
const monster={type:'enemy',name:'Recharge Test',actions:[{name:'Breath',kind:'save',recharge:{min:5},available:false}],legendaryActions:3,legendaryResistances:2,lairActions:[{name:'Pulse'}]};
let r=M.startTurn(monster,4,()=>5);assert(r.ok&&r.recharge[0].recharged,'recharge should restore on qualifying d6');assert.strictEqual(monster.actions[0].available,true);assert.strictEqual(monster.legendaryActionCurrent,3);assert.strictEqual(monster.legendaryResistanceCurrent,2);
assert.strictEqual(M.consumeLegendaryAction(monster,2).remaining,1);assert.strictEqual(M.consumeLegendaryAction(monster,2).ok,false,'cannot overspend legendary actions');
assert.strictEqual(M.consumeLegendaryResistance(monster).remaining,1);assert.strictEqual(monster.legendaryResistanceCurrent,1,'LR persists across turns');
monster.actions[0].available=false;monster.rechargeState.Breath.available=false;r=M.startTurn(monster,5,()=>2);assert.strictEqual(r.recharge[0].recharged,false,'failed recharge remains unavailable');assert.strictEqual(monster.actions[0].available,false);
assert.strictEqual(monster.legendaryActionCurrent,3,'legendary actions reset on own turn');assert.strictEqual(monster.legendaryResistanceCurrent,1,'legendary resistance does not reset on turn');
assert.strictEqual(M.consumeLairAction(monster,5).ok,true);assert.strictEqual(M.consumeLairAction(monster,5).ok,false,'one lair action per round');M.resetLairRound(monster,6);assert.strictEqual(M.consumeLairAction(monster,6).ok,true,'lair resets next round');
const gp=fs.readFileSync(root+'/network_gameplay.js','utf8');assert(gp.includes('DNDMonsters.startTurn(next,t.round)'),'network turn must invoke authoritative monster lifecycle');assert(gp.includes('preparedAt,0),bp=num'),'prepared group must have deterministic trigger ordering');assert(gp.includes('dndNetworkGameplayMonsterState'),'monster state diagnostic missing');
console.log('V749_MONSTER_AUTHORITY_REACTION_ORDER_OK');
