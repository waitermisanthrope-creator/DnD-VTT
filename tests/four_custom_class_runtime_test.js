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
assert.strictEqual(hero.resources.protectorImpulses.max, 2, 'Protector uses proficiency bonus');
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
const fireResult = runtime.useFeature(circusHero, 'circusFireBreath', { targets: [fireTarget] });
assert.strictEqual(fireResult.ok, true, 'Fire Eater ability resolves');
assert.strictEqual(fireResult.dice, '3d6', 'Fire Eater scales at level 7');
assert.strictEqual(circusHero.resources.circusResource.current, circusHero.resources.circusResource.max - 1, 'shared Circus resource is spent exactly once');
assert.strictEqual(appliedDamage.length, 1);
assert.strictEqual(appliedDamage[0].amount, 15);
assert.strictEqual(fireTarget.target.hitPoints, 5, 'damage is applied through combat resolver');
const banditTripHero = {
  id: 'bandit-trip-hero',
  classes: [{ name: 'Бандит', level: 3 }],
  abilityScores: { dex: 16, cha: 10 },
  resources: {},
  turnResources: { actions: 1, bonusAction: 1, reaction: 1 }
};
runtime.sync(banditTripHero);
const tripTarget = { id: 'trip-target', speed: 30, saveSuccess: false, classFeaturesState: {} };
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
console.log('Four custom class runtime foundation tests: PASS');
