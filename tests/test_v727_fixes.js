const fs=require('fs'),vm=require('vm'),assert=require('assert');
const core={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout,clearTimeout,window:null,global:null};
core.window=core;core.global=core;core.addEventListener=()=>{};core.document={getElementById:()=>null};
core.DNDRules={profBonus:h=>2,getSaveBonus:()=>0,rollD20:()=>({result:10,critical:false,fumble:false})};
core.DNDCombat={savingThrow:(actor,stat,dc)=>({stat,dc,success:false,roll:{result:1},total:1}),toggleCondition:(t,c,on)=>{t.conditions=t.conditions||{};t.conditions[c]=on;return on;}};
vm.runInNewContext(fs.readFileSync('class_features_engine.js','utf8'),core);
const F=core.DNDClassFeatures;
function hero(classes,stats,slots){return {id:'h1',name:'Hero',classes,stats:stats||{str:10,dex:16,wis:16,int:16,cha:16,con:14},resources:{},spellSlotsData:slots||{},classFeaturesState:{},turnResources:{action:1,bonusAction:1,reaction:1}};}
let h=hero([{name:'Воин',level:9}]);
let save=F.useFeature(h,'indomitable',{stat:'wis',dc:15,success:false});assert.equal(save.ok,true);assert.equal(save.reroll,true);assert.equal(h.resources.indomitable.current,0);
let p=hero([{name:'Волшебник',level:6}],{int:18,dex:14,con:14,wis:10,cha:10,str:10},{1:{max:4,used:2},2:{max:3,used:1},3:{max:3,used:0}});let ar=F.useFeature(p,'arcaneRecovery',{slotLevels:[2,1]});assert.equal(ar.ok,true);assert.equal(ar.levelsRestored,3);assert.equal(p.spellSlotsData[2].used,0);assert.equal(p.spellSlotsData[1].used,1);
let pal=hero([{name:'Жрец',level:5}]);let undead={id:'u1',name:'Zombie',type:'enemy',creatureType:'undead',conditions:{}};let tu=F.useFeature(pal,'turnUndead',{targets:[undead],round:2});assert.equal(tu.ok,true);assert.equal(tu.results[0].turned,true);assert.equal(undead.conditions['Испуган'],true);
let monk=hero([{name:'Монах',level:3}]);let dm=F.resolveReaction(monk,'deflectMissiles',{source:'attack',attackKind:'rangedWeapon',projectile:true,amount:7,damageType:'колющий',returnTarget:{id:'att'},returnAttackBonus:5,returnDamage:'1d6'});assert.equal(dm.ok,true);assert.equal(dm.remainingAmount,0);assert.equal(dm.returnedAttack,true);
let rogue=hero([{name:'Плут',level:5}]);let am=F.attackModifiers(rogue,{weaponAttack:true,finesseOrRanged:true,sneakEligible:true,advantage:true});assert(am.extraDice.some(x=>String(x).endsWith('d6')));F.onAttackResult(rogue,{sneakApplied:false,hit:true});let am2=F.attackModifiers(rogue,{weaponAttack:true,finesseOrRanged:true,sneakEligible:true,advantage:true});assert(am2.extraDice.some(x=>String(x).endsWith('d6')));
const tok=fs.readFileSync('vtt_token_interaction_v60.js','utf8');assert(tok.includes('DNDGameplayV57.executeAttack'),'legacy Quick Attack routes through unified attack executor');
const net=fs.readFileSync('network_gameplay.js','utf8');assert(net.includes('returnAttackResult'),'network Deflect Missiles can resolve return attack');assert(!/var spellDamageMods=[\s\S]*?var spellDamageMods=/.test(net));
console.log('V70.25.20 Fix Batch 20 tests: PASS');
