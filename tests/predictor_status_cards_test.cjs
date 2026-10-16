/** Real stat/check/damage pipelines for the next six approved Tarot cards. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {runtime,hero}=require('./helpers/class_runtime_harness');
function setup(){const g=runtime();g.crypto=crypto.webcrypto;vm.runInContext(fs.readFileSync(__dirname+'/../app/predictor_cards.js','utf8'),g);const h=hero('Предсказатель',17,'Шулер');g.DNDPredictor.initialize(h);return {g,h,c:g.DNDPredictorCards,r:g.DNDRules,b:g.DNDCombat};}
function deal(h,id){const s=h.predictorState,d=id.startsWith('major_')?'major':'minor',i=s.decks[d].indexOf(id);assert(i>=0);s.decks[d].splice(i,1);s.hand.push(id);}
function play(c,h,id){return c.play(h,id,{operationId:'status:'+id,expectedRevision:h.predictorState.revision});}
function zeroDice(g){g.crypto={getRandomValues(a){a.fill(0);return a;}};}
function enemy(h){h.position={x:0,y:0};h.initiativeTracker={combatants:[{id:'enemy',name:'Страх',type:'enemy',hp:20,maxHp:20,position:{x:1,y:0}}]};}
let n=0;function test(name,fn){fn();n++;console.log('PASS '+name);}
test('Strength changes real weapon/save calculations without overwriting base scores',()=>{
 const {g,h,c,r}=setup();const base=JSON.stringify(h.stats);deal(h,'major_08');assert(play(c,h,'major_08').ok);assert.equal(r.getStats(h).str,24);assert.equal(r.getSaveBonus(h,'str'),7);assert.equal(r.weaponAttack(h,{damage:'1d6',proficient:true}).bonus,13);assert.equal(h.stats.strength,16);assert.equal(r.getStats(h,true).str,16);c.advanceTime(h,60);assert.equal(r.getStats(h).str,16);assert.equal(h.stats.strength,16);assert(base.includes('16'));
});
test('Strength at 24 or more grants advantage to actual Strength checks and saves',()=>{
 const {h,c,r,b}=setup();h.stats.strength=26;deal(h,'major_08');assert(play(c,h,'major_08').ok);assert.equal(r.getStats(h).str,26);assert.equal(b.abilityCheck(h,'str',20).roll.mode,'advantage');assert.equal(b.savingThrow(h,'str',20).roll.mode,'advantage');assert.equal(b.savingThrow(h,'dex',20).roll.mode,'normal');
});
test('Six Cups caps and minimums survive reload, then expire back to original scores',()=>{
 const {h,c,r}=setup();h.stats.strength=1;h.stats.charisma=21;const base=JSON.stringify(h.stats);deal(h,'cups_06');assert(play(c,h,'cups_06').ok);const saved=JSON.parse(JSON.stringify(h));assert.equal(r.getStats(saved).str,1);assert.equal(r.getStats(saved).cha,22);assert.equal(JSON.stringify(saved.stats),base);c.advanceTime(saved,3600);assert.equal(r.getStats(saved).cha,21);assert.equal(r.getStats(saved).str,1);
});
test('Six Cups never lowers a pre-existing Charisma score above its cap',()=>{
 const {h,c,r}=setup();h.stats.charisma=24;deal(h,'cups_06');assert(play(c,h,'cups_06').ok);assert.equal(r.getStats(h).cha,24);
});
test('Strength and Six Cups compose consistently regardless of application order',()=>{
 const scores=[];for(const order of [['major_08','cups_06'],['cups_06','major_08']]){const {h,c,r}=setup();for(const id of order){deal(h,id);h.turnResources.bonusAction=1;assert(play(c,h,id).ok);}scores.push(JSON.stringify(r.getStats(h)));}assert.equal(scores[0],scores[1]);assert.equal(JSON.parse(scores[0]).str,24);assert.equal(JSON.parse(scores[0]).cha,18);
});
test('editable sheet score remains raw while its modifier includes the card',()=>{
 const {g,h,c}=setup();deal(h,'major_08');assert(play(c,h,'major_08').ok);g.currentChar=h;g.document.getElementById=id=>id==='str'?{value:'16'}:null;const app=fs.readFileSync(__dirname+'/../app/app.js','utf8');vm.runInContext(app.slice(app.indexOf('function getStatModNum('),app.indexOf('function getProfBonusNum(')),g);assert.equal(g.getStatModNum('str'),7);c.advanceTime(h,60);assert.equal(g.getStatModNum('str'),3);g.document.getElementById=()=>({value:'18'});assert.equal(g.getStatModNum('str'),4);assert.equal(h.stats.strength,16);
});
test('Eight Pentacles grants advantage and one PB to untrained tool checks, without doubling proficiency',()=>{
 const {h,c,b}=setup();deal(h,'pentacles_08');assert(play(c,h,'pentacles_08').ok);const untrained=b.abilityCheck(h,'dex',20,'normal',{tool:true}),trained=b.abilityCheck(h,'dex',20,'normal',{tool:true,proficient:true}),expert=b.abilityCheck(h,'dex',20,'normal',{tool:true,proficiencyRank:2});assert.equal(untrained.roll.mode,'advantage');assert.equal(untrained.bonus,8);assert.equal(trained.bonus,8);assert.equal(expert.bonus,14);assert.equal(b.abilityCheck(h,'dex',20).bonus,2);assert.equal(b.abilityCheck(h,'dex',20).roll.mode,'normal');assert.equal(untrained.success,false);
});
test('24-hour tool mastery remains for 16 hours after a long rest',()=>{
 const {h,c,b}=setup();deal(h,'pentacles_08');assert(play(c,h,'pentacles_08').ok);c.longRestEffects(h);assert.equal(h.tarotEffects.find(e=>e.id==='pentacles_08').seconds,57600);assert.equal(b.abilityCheck(h,'dex',20,'normal',{tool:true}).roll.mode,'advantage');c.advanceTime(h,57600);assert.equal(b.abilityCheck(h,'dex',20,'normal',{tool:true}).roll.mode,'normal');assert.equal(b.abilityCheck(h,'dex',20,'normal',{tool:true}).bonus,2);
});
test('tool card uses one full PB instead of adding it on top of a multiclass half-PB',()=>{
 const {h,c,b}=setup();h.classes.push({name:'Бард',level:2});deal(h,'pentacles_08');assert(play(c,h,'pentacles_08').ok);assert.equal(b.abilityCheck(h,'dex',20,'normal',{tool:true}).bonus,8);assert.equal(b.abilityCheck(h,'dex',20).bonus,5);
});
test('Four Swords blocks actions/reactions/movement and wakes once at own start with healing',()=>{
 const {g,h,c,b}=setup();zeroDice(g);h.hpCurrent=10;deal(h,'swords_04');assert(play(c,h,'swords_04').ok);assert(h.conditions['Сбит с ног']);assert(h.conditions['Бессознателен']);assert(c.blocked(h,'movement'));assert(c.blocked(h,'reaction'));assert(b.attack(h,{hp:10,ac:10},{}).blocked);assert(!b.abilityCheck(h,'str',10).ok);assert(b.savingThrow(h,'dex',1).autoFailed);const saved=JSON.parse(JSON.stringify(h));c.turnStart(saved,'awake',true);assert.equal(saved.hpCurrent,17);assert(!saved.conditions['Бессознателен']);assert(saved.conditions['Сбит с ног']);c.turnStart(saved,'later',true);assert.equal(saved.hpCurrent,17);
});
test('damage absorbed by temporary HP still wakes sleep and applies healing once',()=>{
 const {g,h,c,b}=setup();zeroDice(g);h.hpCurrent=10;h.hpTemp=20;deal(h,'swords_04');assert(play(c,h,'swords_04').ok);const result=b.applyDamage(h,3,'огонь');assert.equal(result.hpDamage,0);assert.equal(h.hpTemp,17);assert.equal(h.hpCurrent,17);assert(!c.asleep(h));b.applyDamage(h,3,'огонь');assert.equal(h.hpCurrent,17);assert.equal(h.hpTemp,14);c.turnStart(h,'next',true);assert.equal(h.hpCurrent,17);
});
test('sleep wakes after six seconds outside battle, but round wrapping does not precede its next own start',()=>{
 const {g,h,c}=setup();zeroDice(g);h.hpCurrent=10;deal(h,'swords_04');assert(play(c,h,'swords_04').ok);const saved=JSON.parse(JSON.stringify(h));g.crypto=null;c.advanceTime(saved,6,{round:true});assert(c.asleep(saved));c.turnStart(saved,'next',true);assert.equal(saved.hpCurrent,17);assert(!c.asleep(saved));c.advanceTime(h,6);assert.equal(h.hpCurrent,17);assert(!c.asleep(h));
});
test('immunity prevents a wakeup; massive damage cannot use sleep healing as resurrection',()=>{
 const one=setup();zeroDice(one.g);one.h.immunities=['огонь'];deal(one.h,'swords_04');assert(play(one.c,one.h,'swords_04').ok);one.b.applyDamage(one.h,10,'огонь');assert(one.c.asleep(one.h));assert.equal(one.h.hpCurrent,30);
 const two=setup();zeroDice(two.g);two.h.hpCurrent=3;deal(two.h,'swords_04');assert(play(two.c,two.h,'swords_04').ok);two.b.applyDamage(two.h,50,'огонь');assert.equal(two.h.hpCurrent,0);assert(!two.c.asleep(two.h));
});
test('Nine Swords persists a random fear source and repeats its save at own end',()=>{
 const {g,h,c,b}=setup();enemy(h);zeroDice(g);deal(h,'swords_09');assert(play(c,h,'swords_09').ok);assert(h.conditions['Испуган']);assert.equal(h.tarotEffects.find(e=>e.id==='swords_09').fearSourceId,'enemy');const saved=JSON.parse(JSON.stringify(h));assert.equal(b.abilityCheck(saved,'wis',30).roll.mode,'disadvantage');g.Math.random=()=>.99;c.turnEnd(saved);assert(!saved.conditions['Испуган']);assert(!saved.tarotEffects.some(e=>e.id==='swords_09'));
});
test('Nine Swords expiry clears only the fear it introduced; a cure immediately disables its attack penalty',()=>{
 const {h,c}=setup();enemy(h);deal(h,'swords_09');assert(play(c,h,'swords_09').ok);assert(c.attackModifiers(h,{}).disadvantage);c.advanceTime(h,60);assert(!h.conditions['Испуган']);assert(!c.attackModifiers(h,{}).disadvantage);
 const other=setup();enemy(other.h);deal(other.h,'swords_09');assert(play(other.c,other.h,'swords_09').ok);other.b.toggleCondition(other.h,'Испуган',false);if(other.h.activeConditions)other.h.activeConditions['Испуган']=false;assert(!other.c.attackModifiers(other.h,{}).disadvantage);
});
test('fear immunity and successful first save consume Nine Swords without imposing the condition',()=>{
 const immune=setup();enemy(immune.h);immune.h.conditionImmunities=['Испуган'];deal(immune.h,'swords_09');assert(play(immune.c,immune.h,'swords_09').ok);assert(!immune.h.conditions['Испуган']);
 const saved=setup();enemy(saved.h);saved.g.Math.random=()=>.99;deal(saved.h,'swords_09');assert(play(saved.c,saved.h,'swords_09').ok);assert(!saved.h.conditions||!saved.h.conditions['Испуган']);assert(saved.h.predictorState.discard.minor.includes('swords_09'));
});
test('Wheel saves its hidden result and reveals it only on a real affected d20',()=>{
 const {g,h,c,b}=setup();zeroDice(g);deal(h,'major_10');const cast=play(c,h,'major_10');assert(cast.ok);assert(!JSON.stringify(cast.result).includes('advantage'));const saved=JSON.parse(JSON.stringify(h));const effect=saved.tarotEffects.find(e=>e.id==='major_10');assert.equal(effect.fortuneMode,'advantage');assert.equal(effect.fortuneRevealed,false);b.rollDice('1d6');assert.equal(effect.fortuneRevealed,false);const check=b.abilityCheck(saved,'wis',30);assert.equal(check.roll.mode,'advantage');assert.equal(check.roll.tarotFortune,'advantage');assert(effect.fortuneRevealed);assert.equal(b.savingThrow(saved,'con',20).roll.mode,'advantage');c.advanceTime(saved,60);assert.equal(b.savingThrow(saved,'con',20).roll.mode,'normal');
});
test('Wheel and an opposing card cancel without rerolling the saved result',()=>{
 const {g,h,c,b}=setup();zeroDice(g);deal(h,'major_10');assert(play(c,h,'major_10').ok);h.turnResources.bonusAction=1;deal(h,'major_18');assert(play(c,h,'major_18').ok);const result=b.attack(h,{hp:50,ac:10},{useRules:false,bonus:20,damage:'1d6'});assert.equal(result.d20,1);assert.equal(h.tarotEffects.find(e=>e.id==='major_10').fortuneMode,'advantage');assert(h.tarotEffects.find(e=>e.id==='major_10').fortuneRevealed);
});
test('Wheel advantage cancels an explicit disadvantage mode on the real attack path',()=>{
 const {g,h,c,b}=setup();zeroDice(g);deal(h,'major_10');assert(play(c,h,'major_10').ok);let calls=0;g.Math.random=()=>{calls++;return calls===1?.1:.9;};const out=b.attack(h,{hp:50,ac:10},{useRules:false,bonus:20,mode:'disadvantage'});assert.equal(out.d20,3);assert.equal(calls,1);
});
test('Wheel does not reapply advantage after cancellation against a canonical blinded condition',()=>{
 const {g,h,c,b}=setup();zeroDice(g);deal(h,'major_10');assert(play(c,h,'major_10').ok);b.toggleCondition(h,'Ослеплён',true);let calls=0;g.Math.random=()=>{calls++;return calls===1?.1:.9;};const out=b.attack(h,{hp:50,ac:99},{weapon:{damage:'1d6',proficient:true}});assert.equal(out.d20,3);assert.equal(calls,1);
});
test('fear blocks approaching its visible source on the actual board, while moving away remains legal',()=>{
 const {g,h,c}=setup();enemy(h);deal(h,'swords_09');assert(play(c,h,'swords_09').ok);h.initiativeTracker.combatants.push({id:'owner',characterId:h.id,name:h.name,type:'hero',hp:30,maxHp:40});h.initiativeTracker.battlefield={cols:8,rows:8,cellFt:5,tokens:{bt_owner:{id:'bt_owner',sourceId:'owner',x:2,y:2,size:1,speed:30},bt_enemy:{id:'bt_enemy',sourceId:'enemy',x:4,y:2,size:1,visible:true}}};g.currentChar=h;vm.runInContext(fs.readFileSync(__dirname+'/../app/battle_board.js','utf8'),g);assert.equal(g.DNDBattleBoard.moveToken('bt_owner',3,2),false);assert.equal(g.DNDBattleBoard.moveToken('bt_owner',1,2),true);assert.equal(h.initiativeTracker.battlefield.tokens.bt_owner.x,1);h.initiativeTracker.battlefield.tokens.bt_enemy.visible=false;assert.equal(g.DNDBattleBoard.moveToken('bt_owner',2,2),true);
});
test('no secure randomness rolls back a Wheel cast without spending action, card or Major resource',()=>{
 const {g,h,c}=setup();deal(h,'major_10');const before=JSON.stringify(h);g.crypto=null;assert(!play(c,h,'major_10').ok);assert.equal(JSON.stringify(h),before);
});
test('real skill-check UI uses temporary scores instead of a stale cached modifier, then saves Fortune reveal',()=>{
 const {g,h,c}=setup();zeroDice(g);deal(h,'major_08');assert(play(c,h,'major_08').ok);h.turnResources.bonusAction=1;deal(h,'major_10');assert(play(c,h,'major_10').ok);h.skillsData={athletics:1};g.currentChar=h;g.currentRollMode='normal';g.SKILL_TO_VAR_MAP={athletics:'Prof_Ath'};g.Prof_Ath=999;g.getStatModNum=()=>3;g.getProfBonusNum=()=>6;g.console.group=()=>{};g.console.groupEnd=()=>{};g.logs=[];g.appendDiceLog=t=>g.logs.push(t);let saves=0;g.autoSaveCurrentCharacter=()=>saves++;const dice=fs.readFileSync(__dirname+'/../app/dice.js','utf8');vm.runInContext(dice.slice(dice.indexOf('function rollStatCheck('),dice.indexOf('function rollWeaponDamage(')),g);g.rollSkillCheck('athletics','Атлетика','str');assert(g.logs[0].includes('+13'));assert(!g.logs[0].includes('999'));assert(h.tarotEffects.find(e=>e.id==='major_10').fortuneRevealed);assert.equal(saves,1);
});
console.log('PREDICTOR_STATUS_CARDS_OK: '+n+' scenarios');
