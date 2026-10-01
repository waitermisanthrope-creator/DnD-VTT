const fs=require('fs'),vm=require('vm'),assert=require('assert');
let registered=null;
const ctx={console,Math,Date,JSON,Set,Number,String,Array,Object,RegExp,parseInt,parseFloat,
  DNDContent:{registerClass:p=>{registered=p;}},window:null};
ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/alchemist_mhp_2024_runtime.js','utf8'),ctx);
assert.ok(registered,'Alchemist pack registers');
assert.equal(registered.subclasses.length,11,'all 11 subclasses registered');
const hooks=registered.hooks;
const hero={classes:[{name:'Алхимик',level:6,subclass:'apothecary'}],
  abilityScores:{intelligence:16,dexterity:14,constitution:12},proficiencyBonus:3,
  resources:{},classFeaturesState:{}};
hooks.sync(hero);
assert.equal(hero.resources.alchemistReagents.max,12,'level 6 reagent maximum');
const subclassResult=hooks.useFeature(hero,'alchemist-apothecary-3-Болеутоляющая бомба',{target:{id:'initial-ally',tempHp:0}}, {subclassId:'apothecary'});
assert.equal(subclassResult.ok,true,'generated subclass feature ID resolves');
assert.equal(subclassResult.effect.tempHp,6,'pain-relief bomb scales with class level');
const first=hooks.useFeature(hero,'alchemist-discovery',{discovery:'Базовая алхимия'});
assert.equal(first.ok,true,'level 6 grants first discovery');
const second=hooks.useFeature(hero,'alchemist-discovery',{discovery:'Алхимия восстановления'});
assert.equal(second.ok,false,'level 6 cannot take second discovery before level 9');
const bomb=hooks.attackModifiers(hero,{isBomb:true});
assert.ok(Array.isArray(bomb.extraDice),'bomb hook returns dice modifiers');

// Potion effects must be applied to the character and unsupported recipes must never be consumed.
hero.classFeaturesState.alchemistPotions=[
  {name:'Зелье сопротивления',cost:1,type:'potion'},
  {name:'Зелье невидимости',cost:2,type:'potion'},
  {name:'Зелье лечения',cost:1,type:'potion'}
];
hero.resistances=[];
let noChoice=hooks.useFeature(hero,'alchemist-potionUse',{index:0});
assert.equal(noChoice.ok,false,'resistance potion requires a damage type');
assert.equal(hero.classFeaturesState.alchemistPotions.length,3,'missing choice does not consume potion');
let resistance=hooks.useFeature(hero,'alchemist-potionUse',{index:0,damageType:'огонь'});
assert.equal(resistance.ok,true,'resistance potion applies');
assert.ok(hero.resistances.includes('огонь'),'resistance is recorded on character');
hooks.startTurn(hero);
let invis=hooks.useFeature(hero,'alchemist-potionUse',{index:0});
assert.equal(invis.ok,true,'invisibility potion applies');
assert.equal(hero.activeConditions.Невидим,true,'invisibility condition is set');
hooks.startTurn(hero);
let heal=hooks.useFeature(hero,'alchemist-potionUse',{index:0,healAmount:7});
assert.equal(heal.ok,true,'healing potion applies');
assert.equal(hero.hp,7,'healing potion updates character HP when no max is specified');
assert.equal(hero.classFeaturesState.alchemistPotions.length,0,'successfully used potions are consumed');

hooks.longRest(hero);
assert.ok(!hero.resistances.includes('огонь'),'long rest removes Alchemist-granted potion resistance');
assert.ok(!hero.activeConditions.Невидим,'long rest removes short-duration potion conditions');



// Progression regression: level 4 gains the fourth formula; poison specialist gets its free discovery.
const levelFour={classes:[{name:'Алхимик',level:4,subclass:'apothecary'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
hooks.sync(levelFour);
assert.equal(levelFour.classFeaturesState.alchemistFormulaMax,4,'level 4 formula count matches progression table');
const venom={classes:[{name:'Алхимик',level:3,subclass:'venomsmith'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
const venomFeature=hooks.useFeature(venom,'alchemist-venomsmith-3-Отравитель',{}, {subclassId:'venomsmith'});
assert.equal(venomFeature.ok,true,'Venomsmith poisoner feature resolves');
assert.ok(venom.classFeaturesState.alchemistDiscovered.includes('Алхимия яда'),'Venomsmith gains poison alchemy discovery');


// Active combat potion effects feed the shared attack-modifier bridge.
hero.classFeaturesState.alchemistPotions=[
  {name:'Зелье увеличения',cost:2,type:'potion'},
  {name:'Зелье героизма',cost:3,type:'potion'},
  {name:'Зелье скорости',cost:9,type:'potion'}
];
hooks.startTurn(hero);
assert.equal(hooks.useFeature(hero,'alchemist-potionUse',{index:0}).ok,true,'enlarge potion applies');
assert.ok(hooks.attackModifiers(hero,{weaponAttack:true}).extraDice.includes('1d4'),'enlarge potion adds weapon damage');
hooks.startTurn(hero);
assert.equal(hooks.useFeature(hero,'alchemist-potionUse',{index:0}).ok,true,'heroism potion applies');
assert.equal(hero.tempHp,10,'heroism potion grants temporary HP');
hooks.startTurn(hero);
assert.equal(hooks.useFeature(hero,'alchemist-potionUse',{index:0}).ok,true,'speed potion applies');
assert.equal(hooks.attackModifiers(hero,{weaponAttack:true}).hasteActive,true,'speed potion exposes active combat state');


const formulaHero={classes:[{name:'Алхимик',level:8,subclass:'apothecary'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:3,resources:{},classFeaturesState:{}};
hooks.sync(formulaHero);
assert.equal(hooks.useFeature(formulaHero,'alchemist-formula',{formulas:['acid','fear','cryo']}).ok,true,'known bomb formulas can be selected');
assert.equal(hooks.useFeature(formulaHero,'alchemist-formula',{formula:'acid'}).ok,true,'known acid formula can be prepared');
const acidAttack=hooks.attackModifiers(formulaHero,{isBomb:true});
assert.equal(acidAttack.pendingOnHit.alchemistFormula.id,'acid','acid formula emits a pending on-hit save effect');
assert.equal(acidAttack.pendingOnHit.alchemistFormula.acPenalty,3,'acid formula declares its AC penalty for the combat resolver');
assert.equal(hooks.attackModifiers(formulaHero,{isBomb:true}).pendingOnHit.alchemistFormula,undefined,'formula on-hit effect is consumed once');

formulaHero.classFeaturesState.alchemistPendingBombEffect={dice:'2d10',type:'яд',name:'Ядовитая бомба'};
const poisonBomb=hooks.attackModifiers(formulaHero,{isBomb:true});
assert.equal(poisonBomb.pendingOnHit.alchemistFormula.condition,'Отравлен','poison bomb forwards its condition to combat resolver');
formulaHero.classFeaturesState.alchemistDynamoCharged=true;
const dynamoAttack=hooks.attackModifiers(formulaHero,{weaponAttack:true});
assert.ok(dynamoAttack.damageTypes.includes('молния'),'Dynamo Core adds lightning damage type');

formulaHero.classFeaturesState.alchemistPreparedFormula='holy';
const holyAttack=hooks.attackModifiers(formulaHero,{isBomb:true,target:{creatureType:'undead'}});
assert.ok(holyAttack.extraDice.includes('1d12'),'Holy Bomb uses d12 against undead');
formulaHero.classFeaturesState.alchemistPreparedFormula='seeking';
const seekingAttack=hooks.attackModifiers(formulaHero,{isBomb:true});
assert.equal(seekingAttack.ignoreCover,true,'Seeking Bomb flags cover bypass for the combat engine');


const reliefTarget={id:'ally',tempHp:2};
const reliefResult=hooks.useFeature(formulaHero,'alchemist-subclassFeature',{featureName:'Болеутоляющая бомба',target:reliefTarget},{subclassId:'apothecary'});
assert.equal(reliefResult.ok,true,'pain-relief bomb applies to a selected ally');
assert.equal(reliefTarget.tempHp,8,'pain-relief bomb grants temporary HP equal to Alchemist level when no reagents are spent');

const reagentTarget={id:'ally2',tempHp:0};
const reagentsBefore=Number(formulaHero.resources.alchemistReagents.current);
const missingReliefRoll=hooks.useFeature(formulaHero,'alchemist-subclassFeature',{featureName:'Болеутоляющая бомба',target:reagentTarget,reagents:1},{subclassId:'apothecary'});
assert.equal(missingReliefRoll.ok,false,'extra pain-relief dice require an actual roll');
assert.equal(formulaHero.resources.alchemistReagents.current,reagentsBefore,'missing roll does not spend reagents');
const rolledRelief=hooks.useFeature(formulaHero,'alchemist-subclassFeature',{featureName:'Болеутоляющая бомба',target:reagentTarget,reagents:1,reagentRoll:7},{subclassId:'apothecary'});
assert.equal(rolledRelief.ok,true,'rolled extra d10 applies to pain-relief bomb');
assert.equal(reagentTarget.tempHp,15,'temporary HP equals level plus rolled d10');
assert.equal(formulaHero.resources.alchemistReagents.current,reagentsBefore-1,'successful extra die spends exactly one reagent');

const noReliefTarget=hooks.useFeature(formulaHero,'alchemist-subclassFeature',{featureName:'Болеутоляющая бомба'},{subclassId:'apothecary'});
assert.equal(noReliefTarget.ok,false,'pain-relief bomb requires a target');
const amorist={classes:[{name:'Алхимик',level:3,subclass:'amorist'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
hooks.sync(amorist);
const pheromoneTarget={id:'foe',conditions:{},activeConditions:{}};
const pheromone=hooks.useFeature(amorist,'alchemist-subclassFeature',{featureName:'Бомба с феромонами',target:pheromoneTarget,saveResult:{success:false,total:5,dc:13}},{subclassId:'amorist'});
assert.equal(pheromone.ok,true,'pheromone bomb resolves a provided saving throw');
assert.equal(pheromoneTarget.activeConditions['Очарован'],true,'failed pheromone save applies charmed condition');

const timedHero={classes:[{name:'Алхимик',level:3,subclass:'apothecary'}],abilityScores:{intelligence:14,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{alchemistActiveEffects:[{name:'Зелье невидимости',effect:{condition:'Невидим',durationMinutes:0.2},remainingMinutes:0.2}]} ,activeConditions:{'Невидим':true},conditions:{'Невидим':true}};
hooks.sync(timedHero);
hooks.onTurnEnd(timedHero);
assert.equal(timedHero.classFeaturesState.alchemistActiveEffects.length,1,'potion effect remains before its duration expires');
hooks.onTurnEnd(timedHero);
assert.equal(timedHero.classFeaturesState.alchemistActiveEffects.length,0,'potion effect is removed after duration expires');
assert.equal(timedHero.activeConditions['Невидим'],undefined,'expired potion condition is cleared from active conditions');

const mutagenHero={classes:[{name:'Алхимик',level:6,subclass:'mutagenist'}],abilityScores:{strength:14,intelligence:16,dexterity:14},stats:{str:14,int:16,dex:14},proficiencyBonus:3,resources:{},classFeaturesState:{}};
hooks.sync(mutagenHero);
const mutagenResult=hooks.useFeature(mutagenHero,'alchemist-subclassFeature',{featureName:'Мутаген',ability:'strength'},{subclassId:'mutagenist'});
assert.equal(mutagenResult.ok,true,'mutagen applies successfully');
assert.equal(mutagenHero.abilityScores.strength,17,'mutagen modifies character sheet ability score');
assert.equal(mutagenHero.stats.str,17,'mutagen modifies combat stat alias');
for(let i=0;i<10;i++)hooks.onTurnEnd(mutagenHero);
assert.equal(mutagenHero.abilityScores.strength,14,'mutagen restores original ability score after one minute');
assert.equal(mutagenHero.stats.str,14,'mutagen restores original combat stat after one minute');

const bomber={classes:[{name:'Алхимик',level:3,subclass:'madBomber'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
hooks.sync(bomber);
const blackPowder=hooks.useFeature(bomber,'alchemist-subclassFeature',{featureName:'Бомба с чёрным порохом'},{subclassId:'madBomber'});
assert.equal(blackPowder.ok,true,'black powder bomb can be prepared');
const blackPowderAttack=hooks.attackModifiers(bomber,{isBomb:true});
assert.equal(blackPowderAttack.ignoreResistance,true,'black powder bomb ignores resistance');
assert.equal(blackPowderAttack.immunityBecomesResistance,true,'black powder bomb treats immunity as resistance');
assert.ok(blackPowderAttack.extraDice.includes('1d12'),'black powder bomb adds its d12 damage');

const ionizer={classes:[{name:'Алхимик',level:3,subclass:'ionizer'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
hooks.sync(ionizer);
assert.equal(hooks.useFeature(ionizer,'alchemist-subclassFeature',{featureName:'Плазменная бомба'},{subclassId:'ionizer'}).ok,true,'Plasma Bomb prepares a valid subclass bomb');
assert.ok(hooks.attackModifiers(ionizer,{isBomb:true}).extraDice.includes('1d12'),'Plasma Bomb adds its direct-hit d12');
const pigmentist={classes:[{name:'Алхимик',level:3,subclass:'pigmentist'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
hooks.sync(pigmentist);
assert.equal(hooks.useFeature(pigmentist,'alchemist-subclassFeature',{featureName:'Красочная бомба'},{subclassId:'pigmentist'}).ok,true,'Colorful Bomb is available to the Pigmentist');
const paintAttack=hooks.attackModifiers(pigmentist,{isBomb:true});
assert.equal(paintAttack.noDamage,true,'Colorful Bomb does not add ordinary bomb damage');
assert.equal(paintAttack.pendingOnHit.alchemistFormula.revealsInvisible,true,'Colorful Bomb exposes invisible targets');

const venomHero={classes:[{name:'Алхимик',level:14,subclass:'venomsmith'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:5,resources:{},classFeaturesState:{}};
hooks.sync(venomHero);
const toxicTarget={id:'toxic-target',conditions:{},activeConditions:{},classFeaturesState:{}};
const toxic=hooks.useFeature(venomHero,'alchemist-subclassFeature',{featureName:'Токсическое возмездие',attacker:toxicTarget,saveResult:{success:false,total:8,dc:16}},{subclassId:'venomsmith'});
assert.equal(toxic.ok,true,'Toxic Vengeance resolves a failed Constitution save');
assert.equal(toxicTarget.activeConditions['Отравлен'],true,'Toxic Vengeance applies poisoned condition');
assert.equal(toxicTarget.classFeaturesState.alchemistToxicVengeance.damage,'1d10','Toxic Vengeance records the correct recurring damage');
assert.equal(toxicTarget.classFeaturesState.alchemistToxicVengeance.remainingTurns,10,'Toxic Vengeance lasts at most ten target turns');

const homunculusEntities={};
ctx.DNDSecondaryEntities={ensure:()=>({}),create:spec=>{const entity=Object.assign({id:'homunculus-test'},spec);homunculusEntities[entity.id]=entity;return entity;},get:id=>homunculusEntities[id]||null,remove:id=>delete homunculusEntities[id]};
const homunculusOwner={id:'alchemist-owner',name:'Алхимик',classes:[{name:'Алхимик',level:5,subclass:'apothecary'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:3,resources:{},classFeaturesState:{alchemistDiscovered:['Гомункул']}};
hooks.sync(homunculusOwner);
const homunculusCraft=hooks.useFeature(homunculusOwner,'alchemist-potionBrew',{potion:'Гомункул',materialsPaid:true,duringShortRest:true});
assert.equal(homunculusCraft.ok,true,'homunculus discovery creates a companion entity');
assert.equal(homunculusCraft.entity.hp,25,'homunculus has five HP per Alchemist level');
assert.equal(homunculusCraft.entity.actions[0].attackBonus,6,'homunculus attack bonus uses Intelligence modifier plus proficiency');
assert.equal(homunculusOwner.resources.alchemistReagents.current,homunculusOwner.resources.alchemistReagents.max-3,'homunculus creation spends three reagents');
assert.ok(homunculusOwner.initiativeTracker.combatants.some(c=>c.entityId==='homunculus-test'),'homunculus receives a separate combatant stat block');

const lazarusOwner={id:'lazarus-owner',classes:[{name:'Алхимик',level:14,subclass:'xenoalchemist'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:5,resources:{},classFeaturesState:{}};
hooks.sync(lazarusOwner);
const deadAlly={id:'dead-ally',hp:0,maxHp:20,dead:true,defeated:true};
const revived=hooks.useFeature(lazarusOwner,'alchemist-classFeature',{featureName:'Болт Лазаря',target:deadAlly,distanceFt:5,minutesSinceDeath:0.5});
assert.equal(revived.ok,true,'Lazarus Bolt revives a valid recently deceased target');
assert.equal(deadAlly.hp,1,'Lazarus Bolt restores one hit point');
assert.equal(deadAlly.tempHp,28,'Lazarus Bolt grants temporary HP equal to twice Alchemist level');
assert.equal(lazarusOwner.classFeaturesState.alchemistLazarusUsed,true,'Lazarus Bolt is limited to once per long rest');
const secondDead={id:'second-dead',hp:0,dead:true,defeated:true};
assert.equal(hooks.useFeature(lazarusOwner,'alchemist-classFeature',{featureName:'Болт Лазаря',target:secondDead,distanceFt:5,minutesSinceDeath:0.2}).ok,false,'Lazarus Bolt cannot be reused before rest without reagents');
const restoredUse=hooks.useFeature(lazarusOwner,'alchemist-classFeature',{featureName:'Болт Лазаря',target:secondDead,distanceFt:5,minutesSinceDeath:0.2,restoreWithReagents:true});
assert.equal(restoredUse.ok,true,'Lazarus Bolt can be restored for three reagents');
assert.equal(lazarusOwner.resources.alchemistReagents.current,lazarusOwner.resources.alchemistReagents.max-3,'restoring Lazarus Bolt spends three reagents');
const invalidDead={id:'old-death',hp:0,dead:true,deathCause:'old_age'};
assert.equal(hooks.useFeature(lazarusOwner,'alchemist-classFeature',{featureName:'Болт Лазаря',target:invalidDead,distanceFt:5,minutesSinceDeath:0.2,restoreWithReagents:true}).ok,false,'Lazarus Bolt refuses death from old age');










console.log('Alchemist runtime regression tests PASS');
