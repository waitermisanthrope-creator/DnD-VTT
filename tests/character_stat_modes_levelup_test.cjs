'use strict';
// Regression tests for Builder V2 stat modes and legacy level-up eligibility.
// Run: node tests/character_stat_modes_levelup_test.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');

function load(relative,math){
  const w={};
  const context={window:w,Math:math||Math,console,localStorage:{setItem(){}}};
  vm.runInNewContext(fs.readFileSync(path.join(root,relative),'utf8'),context,{filename:relative});
  return w;
}
function makeStatsInputs(values){
  const ids=['str','dex','con','int','wis','cha'];
  return ids.map((id,i)=>({dataset:{stat:id},value:String(values[i])}));
}
function statRoot(inputs){
  return {querySelectorAll(sel){return sel==='[data-stat]'?inputs:[];},querySelector(){return null;}};
}
const w=load('app/character_builder_v2.js');
const Wizard=w.CharacterBuilderV2.Wizard;
const standard=new Wizard({mode:'create'});
assert.equal(standard.statMode,'pointbuy');
assert.equal(standard.randomRollsLeft,5);
standard.step=3;
standard.root=statRoot(makeStatsInputs([15,15,15,15,15,15]));
assert.equal(standard.readStep(),false,'normal point-buy still enforces 27 points');

const broken=new Wizard({mode:'create'});
broken.step=3;broken.statMode='broken';
const brokenInputs=makeStatsInputs([1,20,1,20,1,20]);
broken.root=statRoot(brokenInputs);
assert.equal(broken.readStep(),true);
assert.equal(broken.values.stats.str,1);
assert.equal(broken.values.stats.dex,20);
brokenInputs[0].value='21';
assert.equal(broken.readStep(),false,'broken mode cannot exceed 20');
brokenInputs[0].value='1.5';
assert.equal(broken.readStep(),false,'fractional scores rejected');
brokenInputs[0].value='';
assert.equal(broken.readStep(),false,'empty scores rejected');

const diceMin=Object.create(Math);
diceMin.random=()=>0;
const minBuilder=load('app/character_builder_v2.js',diceMin);
const random=new minBuilder.CharacterBuilderV2.Wizard({mode:'create'});
random.step=3;
random.root={innerHTML:'',querySelectorAll(){return [];},querySelector(){return null;}};
random.bindStats=function(){};
random.render=function(){this.renderCreate();};
assert.equal(random.rollStats(),true);
assert.equal(random.statMode,'random');
assert.equal(random.randomRollsLeft,4);
for(const v of Object.values(random.values.stats))assert.equal(v,3,'4×1, drop 1 -> 3');
assert.match(random.root.innerHTML,/Или рандом 4 попыток/);
assert.doesNotMatch(random.root.innerHTML,/Или сломанный персонаж/,'cannot select broken mode after random');
assert.match(random.root.innerHTML,/data-stat-minus="str" disabled/,'random stats cannot be bought');
for(let i=0;i<4;i++)assert.equal(random.rollStats(),true);
assert.equal(random.randomRollsLeft,0);
assert.equal(random.rollStats(),false,'sixth roll must not regenerate stats');
assert.match(random.root.innerHTML,/id="cbRollStats" disabled/);
random.step=2;random.step=3;random.render();
assert.equal(random.randomRollsLeft,0,'back-and-forth must not reset attempts');

const diceMax=Object.create(Math);
diceMax.random=()=>0.999999;
const maxBuilder=load('app/character_builder_v2.js',diceMax);
const maxRoll=new maxBuilder.CharacterBuilderV2.Wizard({mode:'create'});
maxRoll.render=function(){};
assert.equal(maxRoll.rollStats(),true);
for(const v of Object.values(maxRoll.values.stats))assert.equal(v,18,'4×6, drop 6 -> 18');

const v2Broken=new Wizard({mode:'create'});
v2Broken.statMode='broken';v2Broken.step=3;
v2Broken.root={innerHTML:'',querySelector(){return null;}};
v2Broken.bindStats=function(){};
v2Broken.renderCreate();
assert.match(v2Broken.root.innerHTML,/min="1" max="20"/);
assert.match(v2Broken.root.innerHTML,/Или сломанный персонаж/);
assert.doesNotMatch(v2Broken.root.innerHTML,/min="1" max="20" readonly/);

const heroes=load('app/Hero-info.js');
const existing={stats:{str:8,dex:8,int:8,cha:8},classes:[{name:'Воин',level:1}]};
assert.equal(heroes.checkMulticlassRequirements(existing,'Воин'),true,'own class is always eligible');
assert.equal(heroes.checkMulticlassRequirements(existing,'Бард'),false);
assert.equal(heroes.checkMulticlassRequirements({stats:{str:13},classes:[{name:'Бард',level:1}]},'Воин'),true,'short strength is recognized');
assert.equal(heroes.checkMulticlassRequirements({stats:{strength:13},classes:[{name:'Бард',level:1}]},'Воин'),true,'old strength stays recognized');

const levelUp=fs.readFileSync(path.join(root,'app/data/classes/level_up.js'),'utf8');
assert.match(levelUp,/#dndModal \.modal-content \{/);
assert.match(levelUp,/overflow-y: auto !important;/);
assert.match(levelUp,/class-item-owned/);
console.log('PASS character_stat_modes_levelup_test: rolls 3–18, no pointbuy after roll, 5 tries, broken range, multiclass and mobile scroll CSS');
