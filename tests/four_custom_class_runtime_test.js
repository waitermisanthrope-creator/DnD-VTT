const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync(require.resolve('../app/four_custom_class_runtime.js'), 'utf8');
const window = {};
vm.runInNewContext(source, { window, isFinite, Number, Math, String, Object, Array });
const runtime = window.FourCustomClassRuntime;
assert(runtime, 'runtime exports');
const hero = {
  classes: [
    { name: 'Бандит', level: 3 },
    { name: 'Циркач', level: 3 },
    { name: 'Заступник', level: 3 }
  ],
  abilityScores: { dex: 16, cha: 14 },
  resources: {}
};
runtime.sync(hero);
assert.strictEqual(hero.resources.banditDirtyTricks.max, 5, 'Bandit uses proficiency + Dexterity modifier');
assert.strictEqual(hero.resources.circusResource.max, 4, 'Circus has one shared resource using proficiency + Charisma modifier');
const legacyCircusHero = {
  classes: [{ name: 'Циркач', level: 3, subclass: 'Пожиратель огня' }],
  abilityScores: { cha: 14 },
  resources: { circusZap: { current: 1, max: 4, recharge: 'short' } }
};
runtime.sync(legacyCircusHero);
assert.strictEqual(legacyCircusHero.resources.circusResource.current, 1, 'legacy Circus resource migration preserves spent uses');
assert.strictEqual(legacyCircusHero.resources.circusResource.max, 4, 'legacy Circus resource migration keeps the synced maximum');
assert.strictEqual(legacyCircusHero.resources.circusZap, undefined, 'legacy Circus resource key is removed after migration');

assert.strictEqual(hero.resources.protectorImpulses.max, 2, 'Protector uses proficiency bonus');
// Corrupt saved resource counters must not silently refill spent class resources.
const corruptedResourceHero = {
  classes: [{ name: 'Бандит', level: 3 }, { name: 'Циркач', level: 3 }, { name: 'Заступник', level: 3 }],
  abilityScores: { dex: 14, cha: 14 },
  resources: {
    banditDirtyTricks: { current: 'broken', max: 5 },
    circusResource: { current: -2, max: 4 },
    protectorImpulses: { current: 1.5, max: 2 }
  }
};
runtime.sync(corruptedResourceHero);
assert.strictEqual(corruptedResourceHero.resources.banditDirtyTricks.current, 0, 'malformed Bandit resource does not refill to max');
assert.strictEqual(corruptedResourceHero.resources.circusResource.current, 0, 'negative Circus resource is clamped to zero');
assert.strictEqual(corruptedResourceHero.resources.protectorImpulses.current, 0, 'fractional Protector resource is clamped to zero');
const legacyMissingCounter = {
  classes: [{ name: 'Бандит', level: 1 }], abilityScores: { dex: 12 },
  resources: { banditDirtyTricks: { max: 3, recharge: 'long' } }
};
runtime.sync(legacyMissingCounter);
assert.strictEqual(legacyMissingCounter.resources.banditDirtyTricks.current, 3, 'legacy resource without a current counter is initialized once');

hero.resources.banditDirtyTricks.current = 1;
runtime.sync(hero);
assert.strictEqual(hero.resources.banditDirtyTricks.current, 1, 'sync does not refill spent resource');
assert.strictEqual(hero.resources.banditDirtyTricks.recharge, 'short');
assert.deepStrictEqual(Array.from(runtime.restore(hero, 'short').restored).sort(), ['banditDirtyTricks', 'circusResource', 'protectorImpulses'].sort());
assert.strictEqual(hero.resources.banditDirtyTricks.current, 5, 'short rest restores resource');
const targetA = { id: 'enemy-a' }, targetB = { id: 'enemy-b' }, targetC = { id: 'enemy-c' };
assert.strictEqual(runtime.studyTarget(hero, targetA, { visible: true, distanceFt: 60 }).ok, true);
assert.deepStrictEqual(Array.from(hero.classFeaturesState.bandit.studiedTargetIds), ['enemy-a']);
assert.strictEqual(runtime.studyTarget(hero, targetB, { visible: false, distanceFt: 10 }).ok, false);
assert.deepStrictEqual(Array.from(hero.classFeaturesState.bandit.studiedTargetIds), ['enemy-a'], 'invalid target does not alter state');
runtime.studyTarget(hero, targetB, { visible: true, distanceFt: 30 });
assert.deepStrictEqual(Array.from(hero.classFeaturesState.bandit.studiedTargetIds), ['enemy-b'], 'one target before level 11; new target replaces old');
hero.classes[0].level = 11;
runtime.studyTarget(hero, targetA, { visible: true, distanceFt: 20 });
runtime.studyTarget(hero, targetC, { visible: true, distanceFt: 20 });
assert.deepStrictEqual(Array.from(hero.classFeaturesState.bandit.studiedTargetIds), ['enemy-a', 'enemy-c'], 'two targets from level 11');
assert.deepStrictEqual(Array.from(runtime.clearInvalidTargets(hero, ['enemy-c'])), ['enemy-c']);
assert.deepStrictEqual(Array.from(runtime.clearStudiedTarget(hero, 'enemy-c')), [], 'studied target is cleared immediately when that target dies or is removed');
runtime.studyTarget(hero, targetA, { visible: true, distanceFt: 20 });
runtime.studyTarget(hero, targetC, { visible: true, distanceFt: 20 });
assert.deepStrictEqual(Array.from(runtime.clearStudiedTarget(hero, 'enemy-a')), ['enemy-c'], 'clearing one target preserves other studied targets');
assert.strictEqual(runtime.studyTarget(hero, { name: 'no id' }, { visible: true, distanceFt: 10 }).ok, false);
const actionHero = {
  classes: [{ name: 'Бандит', level: 3 }],
  abilityScores: { dex: 14, cha: 10 },
  resources: {},
  turnResources: { actions: 1, bonusAction: 1, reaction: 1 }
};
const actionResult = runtime.useFeature(actionHero, 'banditStudyTarget', {
  target: { id: 'visible-enemy', name: 'Видимый враг' }, visible: true, distanceFt: 25
});
assert.strictEqual(actionResult.ok, true, 'study target resolves through feature runtime');
assert.strictEqual(actionHero.turnResources.bonusAction, 0, 'study target spends one bonus action');
const actionAfterUse = runtime.useFeature(actionHero, 'banditStudyTarget', {
  target: { id: 'second-enemy' }, visible: true, distanceFt: 10
});
assert.strictEqual(actionAfterUse.ok, false, 'cannot study twice after spending bonus action');
assert.strictEqual(actionHero.classFeaturesState.bandit.studiedTargetIds.length, 1, 'failed second action does not change target');
const circusHero = {
  id: 'circus-1',
  classes: [{ name: 'Циркач', level: 7, subclass: 'Пожиратель огня' }],
  abilityScores: { dex: 16, cha: 14 },
  resources: {},
  stats: { dex: 16 },
  classFeaturesState: {}
};
runtime.sync(circusHero);
let appliedDamage = [];
window.DNDCombat = {
  savingThrow: (target, stat, dc) => ({ success: !!target.saveSuccess, stat, dc }),
  rollDice: expression => ({ total: expression === '3d6' ? 15 : 10, expression }),
  applyDamage: (target, amount, type) => {
    target.hitPoints = Math.max(0, (target.hitPoints || 20) - amount);
    appliedDamage.push({ id: target.id, amount, type });
    return { applied: amount };
  }
};
const fireTarget = { id: 'target-fire-1', inArea: true, distanceFt: 10, target: { id: 'target-fire-1', hitPoints: 20, saveSuccess: false } };
const invalidFire = runtime.useFeature(circusHero, 'circusFireBreath', { targets: [{ ...fireTarget, inArea: false }] });
assert.strictEqual(invalidFire.ok, false, 'invalid area fails before spending resource');
assert.strictEqual(circusHero.resources.circusResource.current, circusHero.resources.circusResource.max);
const duplicateFireTargets = runtime.useFeature(circusHero, 'circusFireBreath', { targets: [fireTarget, fireTarget] });
assert.strictEqual(duplicateFireTargets.ok, false, 'duplicate target IDs are rejected before spending Circus resource');
assert.strictEqual(circusHero.resources.circusResource.current, circusHero.resources.circusResource.max, 'duplicate target rejection does not spend resource');
const fireResult = runtime.useFeature(circusHero, 'circusFireBreath', { targets: [fireTarget] });
assert.strictEqual(fireResult.ok, true, 'Fire Eater ability resolves');
assert.strictEqual(fireResult.dice, '3d6', 'Fire Eater scales at level 7');
assert.strictEqual(circusHero.resources.circusResource.current, circusHero.resources.circusResource.max - 1, 'shared Circus resource is spent exactly once');
assert.strictEqual(appliedDamage.length, 1);
assert.strictEqual(appliedDamage[0].amount, 15);

assert.strictEqual(fireTarget.target.hitPoints, 5, 'damage is applied through combat resolver');
// Runtime failures while preparing multi-target Circus breath must not spend the shared resource.
const fireFailureHero = {
  id: 'circus-failure',
  classes: [{ name: 'Циркач', level: 7, subclass: 'Пожиратель огня' }],
  abilityScores: { dex: 14, cha: 14 },
  resources: {},
  turnResources: { actions: 1, bonusAction: 1, reaction: 1 }
};
runtime.sync(fireFailureHero);
const fireFailureTarget = { id: 'fire-failure-target', inArea: true, distanceFt: 5, target: { id: 'fire-failure-target', hitPoints: 20 } };
window.DNDCombat.savingThrow = () => { throw new Error('simulated saving throw failure'); };
const beforeFailedFire = fireFailureHero.resources.circusResource.current;
const failedFireResolver = runtime.useFeature(fireFailureHero, 'circusFireBreath', { targets: [fireFailureTarget] });
assert.strictEqual(failedFireResolver.ok, false, 'failed Circus save resolver returns a clean failure');
assert.strictEqual(fireFailureHero.resources.circusResource.current, beforeFailedFire, 'failed Circus save resolver preserves resource');
window.DNDCombat.savingThrow = (target, stat, dc) => ({ success: false, stat, dc });
window.DNDCombat.rollDice = () => ({ total: NaN });
const failedFireRoll = runtime.useFeature(fireFailureHero, 'circusFireBreath', { targets: [fireFailureTarget] });
assert.strictEqual(failedFireRoll.ok, false, 'invalid Circus damage roll returns a clean failure');
assert.strictEqual(fireFailureHero.resources.circusResource.current, beforeFailedFire, 'invalid Circus damage roll preserves resource');

const banditTripHero = {
  id: 'bandit-trip-hero',
  classes: [{ name: 'Бандит', level: 3 }],
  abilityScores: { dex: 16, cha: 10 },
  resources: {},
  turnResources: { actions: 1, bonusAction: 1, reaction: 1 }
};
runtime.sync(banditTripHero);
const tripTarget = { id: 'trip-target', speed: 30, saveSuccess: false, classFeaturesState: {} };
const tripResourceBeforeResolverFailure = banditTripHero.resources.banditDirtyTricks.current;
window.DNDCombat.savingThrow = () => { throw new Error('simulated save resolver failure'); };
const failedResolverTrip = runtime.useFeature(banditTripHero, 'banditTrip', { attackHit: true, target: tripTarget, distanceFt: 5 });
assert.strictEqual(failedResolverTrip.ok, false, 'failed save resolver returns a clean failure');
assert.strictEqual(banditTripHero.resources.banditDirtyTricks.current, tripResourceBeforeResolverFailure, 'resolver failure does not spend Dirty Tricks');
window.DNDCombat.savingThrow = (target, stat, dc) => ({ success: !!target.saveSuccess, stat, dc });
const tripResult = runtime.useFeature(banditTripHero, 'banditTrip', { attackHit: true, target: tripTarget, distanceFt: 5 });
assert.strictEqual(tripResult.ok, true);
assert.strictEqual(tripResult.applied, true);
assert.strictEqual(tripTarget.speed, 0, 'failed Strength save sets speed to zero');
assert.strictEqual(banditTripHero.resources.banditDirtyTricks.current, banditTripHero.resources.banditDirtyTricks.max - 1);
assert.strictEqual(runtime.onTurnStart(tripTarget), true, 'speed lock expires at target turn start');
assert.strictEqual(tripTarget.speed, 30, 'original speed is restored');
assert.strictEqual(tripTarget.classFeaturesState.banditTripSpeedLock, undefined);
const missedTarget = { id: 'missed-target', speed: 30, saveSuccess: false };
const tripBeforeMiss = banditTripHero.resources.banditDirtyTricks.current;
assert.strictEqual(runtime.useFeature(banditTripHero, 'banditTrip', { attackHit: false, target: missedTarget, distanceFt: 5 }).ok, false);
assert.strictEqual(banditTripHero.resources.banditDirtyTricks.current, tripBeforeMiss, 'failed precondition does not spend resource');
const selfProtector = {
  id: 'protector-self',
  classes: [{ name: 'Заступник', level: 3 }],
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 }
};
window.DNDCombat = { rollDice: () => ({ total: 4 }) };
const selfTarget = { id: 'protector-self' };
const rejectedSelfIntercept = runtime.interceptDamage(selfProtector, selfTarget, 10, {
  isAlly: false, visible: false
});
assert.strictEqual(rejectedSelfIntercept.ok, false, 'self-target interception must be explicit');
assert.strictEqual(selfProtector.resources.protectorImpulses.current, 2, 'rejected self-intercept does not spend an impulse');
const selfIntercept = runtime.interceptDamage(selfProtector, selfTarget, 10, { isSelf: true });
assert.strictEqual(selfIntercept.ok, true, 'Protector can explicitly use the same defensive reaction on themself');
assert.strictEqual(selfIntercept.reduction, 6, 'self-defense uses the existing 1d10 + proficiency reduction');

assert.strictEqual(selfProtector.resources.protectorImpulses.current, 1, 'self-defense spends one impulse');
// Invalid or throwing defensive rolls must not consume the Protector's reaction or impulse.
const failedRollProtector = {
  id: 'protector-failed-roll',
  classes: [{ name: 'Заступник', level: 3, subclass: 'Страж' }],
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 }
};
window.DNDCombat.rollDice = () => ({ total: NaN });
const invalidGuardRoll = runtime.interceptDamage(failedRollProtector, { id: 'ally-failed-roll' }, 10, {
  isAlly: true, visible: true, distanceFt: 5
});
assert.strictEqual(invalidGuardRoll.ok, false, 'invalid Protector interception roll is rejected');
assert.strictEqual(failedRollProtector.resources.protectorImpulses.current, 2, 'invalid Protector roll preserves impulse');
assert.strictEqual(failedRollProtector.turnResources.reaction, 1, 'invalid Protector roll preserves reaction');
window.DNDCombat.rollDice = () => { throw new Error('simulated temporary HP roll failure'); };
const rescueHero = {
  id: 'protector-rescue-failure',
  classes: [{ name: 'Заступник', level: 11, subclass: 'Спаситель' }],
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 }
};
const rescueTarget = { id: 'downed-ally', hp: 0, stable: false, deathSaves: { successes: 0, failures: 1 } };
const failedRescueRoll = runtime.useFeature(rescueHero, 'protectorRescue', {
  target: rescueTarget, isAlly: true, visible: true, distanceFt: 5,
  cellAvailable: true, freeCell: { x: 2, y: 1 }, moveFt: 5, distanceToCellFt: 5
});
assert.strictEqual(failedRescueRoll.ok, false, 'failed Protector rescue roll returns a clean failure');
assert.strictEqual(rescueHero.resources.protectorImpulses.current, 2, 'failed rescue roll preserves impulse');
assert.strictEqual(rescueHero.turnResources.reaction, 1, 'failed rescue roll preserves reaction');
assert.strictEqual(rescueTarget.stable, false, 'failed rescue roll does not alter the ally');
window.DNDCombat.rollDice = () => ({ total: 4 }); // Restore the deterministic fixture for the remaining Protector integration cases.

assert.strictEqual(selfProtector.turnResources.reaction, 0, 'self-defense spends the reaction');
const allyProtector = {
  id: 'protector-ally-test',
  classes: [{ name: 'Заступник', level: 3 }],
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 }
};
const protectedAlly = { id: 'ally-test-target' };
const invisibleAlly = runtime.interceptDamage(allyProtector, protectedAlly, 10, {
  isAlly: true, visible: false, distanceFt: 5
});
assert.strictEqual(invisibleAlly.ok, false, 'cannot intercept damage for an invisible ally');
assert.strictEqual(allyProtector.resources.protectorImpulses.current, 2, 'invisible target does not spend an impulse');
assert.strictEqual(allyProtector.turnResources.reaction, 1, 'invisible target does not spend reaction');
const distantAlly = runtime.interceptDamage(allyProtector, protectedAlly, 10, {
  isAlly: true, visible: true, distanceFt: 6
});
assert.strictEqual(distantAlly.ok, false, 'cannot intercept damage for an ally beyond 5 feet');
assert.strictEqual(allyProtector.resources.protectorImpulses.current, 2, 'out-of-range target does not spend an impulse');
const allyIntercept = runtime.interceptDamage(allyProtector, protectedAlly, 10, {
  isAlly: true, visible: true, distanceFt: 5
});
assert.strictEqual(allyIntercept.ok, true, 'explicitly confirmed visible ally within 5 feet can be protected');
assert.strictEqual(allyIntercept.reduction, 6, 'ally interception uses 1d10 + proficiency');
assert.strictEqual(allyProtector.resources.protectorImpulses.current, 1, 'successful ally interception spends one impulse');
assert.strictEqual(allyProtector.turnResources.reaction, 0, 'successful ally interception spends reaction');

const zoneHero = {
  id: 'zone-protector', classes: [{ name: 'Заступник', level: 3, subclass: 'Страж рубежа' }],
  resources: { protectorImpulses: { current: 2, max: 2 } },
  turnResources: { actions: 1, bonusAction: 1, reaction: 1 }, classFeaturesState: {}
};
const zone = runtime.useFeature(zoneHero, 'protectorZone', { actionAvailable: true, round: 1 });
assert.strictEqual(runtime.useFeature(Object.assign({},zoneHero,{classes:[{name:'Заступник',level:3,subclass:'Спаситель'}]}),'protectorZone',{actionAvailable:true,round:1}).ok,false,'other Protector subclass cannot use Strazh Rubezha');
assert.strictEqual(zone.ok, true, 'Strazh Rubezha creates a zone using a bonus action');
assert.strictEqual(zone.zone.radiusFt, 10);
assert.strictEqual(zoneHero.resources.protectorImpulses.current, 1);
const zoneAlly = { id: 'zone-ally' };
const zoneIncapacitated = { ...zoneHero, classFeaturesState: JSON.parse(JSON.stringify(zoneHero.classFeaturesState)), activeConditions: { 'Недееспособен': true } };
assert.strictEqual(runtime.protectorZoneSave(zoneIncapacitated, zoneAlly, { forcedMovementSave: true, isAlly: true, visible: true, distanceFt: 5, round: 2 }).ok, false, 'zone ends when Protector is incapacitated');
const zonePetrified = { ...zoneHero, classFeaturesState: JSON.parse(JSON.stringify(zoneHero.classFeaturesState)), conditions: { 'Окаменел': true } };
assert.strictEqual(runtime.protectorZoneSave(zonePetrified, zoneAlly, { forcedMovementSave: true, isAlly: true, visible: true, distanceFt: 5, round: 2 }).ok, false, 'zone also ends when Protector is petrified');
assert.strictEqual(zonePetrified.classFeaturesState.protector.zone.active, false, 'petrification permanently ends the active zone');
const zoneSplitConditionStores = { ...zoneHero, classFeaturesState: JSON.parse(JSON.stringify(zoneHero.classFeaturesState)), activeConditions: {}, conditions: { 'Оглушён': true } };
assert.strictEqual(runtime.protectorZoneSave(zoneSplitConditionStores, zoneAlly, { forcedMovementSave: true, isAlly: true, visible: true, distanceFt: 5, round: 2 }).ok, false, 'zone detects incapacitation in conditions even when activeConditions is an empty object');
assert.strictEqual(zoneSplitConditionStores.classFeaturesState.protector.zone.active, false, 'zone closes when condition is stored in the secondary condition map');
assert.strictEqual(runtime.protectorZoneSave(zoneHero, zoneAlly, { forcedMovementSave: true, isAlly: true, visible: true, distanceFt: 10, round: 2 }).bonus, 1, 'visible ally at zone boundary receives +1');
assert.strictEqual(runtime.protectorZoneSave(zoneHero, zoneAlly, { forcedMovementSave: true, isAlly: true, visible: true, distanceFt: 10.1, round: 2 }).ok, false, 'ally outside zone gets no bonus');
assert.strictEqual(runtime.protectorZoneSave(zoneHero, zoneAlly, { forcedMovementSave: false, isAlly: true, visible: true, distanceFt: 5, round: 2 }).ok, false, 'zone does not protect against unrelated saves');
assert.strictEqual(runtime.useFeature(zoneHero, 'protectorZone', { actionAvailable: true, round: 2 }).ok, false, 'cannot stack a second active zone');
const expiredZone = runtime.protectorZoneSave(zoneHero, zoneAlly, { forcedMovementSave: true, isAlly: true, visible: true, distanceFt: 5, round: 11 });
assert.strictEqual(expiredZone.ok, false, 'zone expires after its one-minute round window');
const rescuer = {
  id: 'rescuer', classes: [{ name: 'Заступник', level: 3, subclass: 'Спаситель' }],
  resources: { protectorImpulses: { current: 2, max: 2 } }, turnResources: { reaction: 1 }
};
const fallen = { id: 'fallen', hp: 0, tempHp: 0, deathSaves: { successes: 0, failures: 2 } };
const rescueInvalid = runtime.useFeature(rescuer, 'protectorRescue', { target: fallen, isAlly: true, visible: true, distanceFt: 5, cellAvailable: false, freeCell: {x:2,y:3} });
assert.strictEqual(rescueInvalid.ok, false, 'rescue requires a confirmed free cell');
assert.strictEqual(rescuer.resources.protectorImpulses.current, 2, 'invalid rescue does not spend resource');
assert.strictEqual(rescuer.turnResources.reaction, 1, 'invalid rescue does not spend reaction');
const alreadyStable = { id: 'already-stable', hp: 0, stable: true, deathSaves: { successes: 3, failures: 0 } };
const stableRescue = runtime.useFeature(rescuer, 'protectorRescue', { target: alreadyStable, isAlly: true, visible: true, distanceFt: 5, cellAvailable: true, freeCell: {x:2,y:3}, distanceToCellFt:5 });
assert.strictEqual(stableRescue.ok, false, 'Savior cannot spend resources rescuing an already stable ally');
assert.strictEqual(rescuer.resources.protectorImpulses.current, 2, 'already stable ally does not spend an impulse');
assert.strictEqual(rescuer.turnResources.reaction, 1, 'already stable ally does not spend reaction');
const rescued = runtime.useFeature(rescuer, 'protectorRescue', { target: fallen, isAlly: true, visible: true, distanceFt: 5, cellAvailable: true, freeCell: {x:2,y:3}, distanceToCellFt:5, chosenEnemyId:'enemy', round:2 });
assert.strictEqual(runtime.useFeature(Object.assign({},rescuer,{classes:[{name:'Заступник',level:3,subclass:'Страж рубежа'}]}),'protectorRescue',{target:fallen,isAlly:true,visible:true,distanceFt:5,cellAvailable:true,freeCell:{x:2,y:3},distanceToCellFt:5}).ok,false,'other Protector subclass cannot use Savior');
assert.strictEqual(runtime.useFeature(rescuer,'protectorRescue',{target:fallen,isAlly:true,visible:true,distanceFt:5,cellAvailable:true,freeCell:{x:2,y:3},distanceToCellFt:6}).ok,false,'rescue refuses a destination beyond movement distance');
assert.strictEqual(rescued.ok, true, 'valid rescue succeeds');
assert.strictEqual(fallen.hp, 0, 'rescue does not restore HP');
assert.strictEqual(fallen.stable, true, 'rescue stabilizes ally');
assert.strictEqual(fallen.deathSaves.successes, 3, 'stabilized ally is marked stable in the death-save tracker');
assert.strictEqual(fallen.deathSaves.failures, 2, 'rescue does not erase existing death-save failures');
assert.deepStrictEqual(JSON.parse(JSON.stringify(fallen.position)), {x:2,y:3}, 'rescue moves ally to selected free cell');
assert.strictEqual(rescuer.resources.protectorImpulses.current, 1);
assert.strictEqual(rescuer.turnResources.reaction, 0);
const highRescuer = {
  id: 'high-rescuer', classes: [{ name: 'Заступник', level: 17, subclass: 'Спаситель' }],
  resources: { protectorImpulses: { current: 2, max: 2 } }, turnResources: { reaction: 1 }
};
window.DNDCombat = { rollDice: () => ({ total: 5 }) };
const highFallen = { id: 'high-fallen', hp: 0, tempHp: 0 };
const highRescue = runtime.useFeature(highRescuer, 'protectorRescue', { target: highFallen, isAlly: true, visible: true, distanceFt: 5, cellAvailable: true, freeCell: {x:3,y:4}, distanceToCellFt:10, round:1 });
assert.strictEqual(highRescue.movementFt, 10, 'level 17 rescue can move ally 10 feet');
assert.strictEqual(highFallen.tempHp, 11, 'level 17 rescue grants 1d8 + level-17 proficiency bonus temporary HP');
const zoneHigh = { id:'zone-high', classes:[{name:'Заступник',level:17,subclass:'Страж рубежа'}], resources:{protectorImpulses:{current:2,max:2}}, turnResources:{bonusAction:1}, classFeaturesState:{} };
assert.strictEqual(runtime.useFeature(zoneHigh,'protectorZone',{actionAvailable:true,round:1}).zone.radiusFt,15,'level 11+ zone radius is 15 feet');
assert.strictEqual(runtime.protectorZoneSave(zoneHigh,zoneAlly,{forcedMovementSave:true,isAlly:true,visible:true,distanceFt:15,round:2,requestAdvantage:true}).advantage,true,'level 17 zone can grant one chosen advantage per round');

console.log('Four custom class runtime foundation tests: PASS');
