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
assert.strictEqual(hero.resources.circusZap.max, 4, 'Circus uses proficiency + Charisma modifier');
assert.strictEqual(hero.resources.protectorImpulses.max, 2, 'Protector uses proficiency bonus');
hero.resources.banditDirtyTricks.current = 1;
runtime.sync(hero);
assert.strictEqual(hero.resources.banditDirtyTricks.current, 1, 'sync does not refill spent resource');
assert.strictEqual(hero.resources.banditDirtyTricks.recharge, 'short');
assert.deepStrictEqual(Array.from(runtime.restore(hero, 'short').restored).sort(), ['banditDirtyTricks', 'circusZap', 'protectorImpulses'].sort());
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
console.log('Four custom class runtime foundation tests: PASS');
