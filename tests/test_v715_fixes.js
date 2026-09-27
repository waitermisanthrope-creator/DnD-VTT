const fs=require('fs'),vm=require('vm'),assert=require('assert');
function load(file,ctx){vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});}
// Concentration local damage path.
const sandbox={console,Math,window:null};sandbox.window=sandbox;
sandbox.DNDRules={getSaveBonus:(a,s)=>Number(a.stats?.[s]||10)>9?Math.floor((Number(a.stats[s])-10)/2):Math.floor((Number(a.stats?.[s]||10)-10)/2),rollD20:()=>({result:10,critical:false,fumble:false}),parseDice:()=>({groups:[{count:1,sides:6}],constant:0})};
load('./combat_engine.js',sandbox);sandbox.DNDCombat=sandbox.DNDCombat;
let c={hp:20,maxHp:20,tempHp:0,stats:{con:10},concentration:{active:true,spellId:'x',spellName:'Bless'}};
let r=sandbox.DNDCombat.applyDamage(c,10,'рубящий');assert(r.hpDamage===10);assert(r.concentration&&r.concentration.dc===10);assert.strictEqual(r.concentration.success,true);assert.strictEqual(c.concentration.active,true);
c={hp:20,maxHp:20,tempHp:0,stats:{con:8},concentration:{active:true,spellId:'x',spellName:'Bless'}};
r=sandbox.DNDCombat.applyDamage(c,12,'рубящий');assert.strictEqual(r.concentration.success,false);assert.strictEqual(c.concentration.active,false);
// Prepared action contract: action is reserved immediately and reaction is consumed at trigger time.
const src=fs.readFileSync('./network_gameplay.js','utf8');
assert(/ar\.action=false;\s*p\.preparedResource='reaction'/.test(src),'prepare action must reserve the action and mark reaction trigger');
assert(/if\(!consume\(actor,'reaction'\)\)\{/.test(src),'prepared trigger must consume reaction');
assert(src.includes("error:'Нет реакции для срабатывания подготовленного действия.'"),'missing no-reaction rejection');
console.log('V70.15 concentration + ready-action checks: PASS');
