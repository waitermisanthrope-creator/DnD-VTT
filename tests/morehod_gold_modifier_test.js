const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const rules = require('../app/morehod_gold_modifier.js');

const thresholds = [
  [0, -5], [199.99, -5], [200, -4], [399.99, -4],
  [400, -3], [600, -2], [800, -1], [1000, 0],
  [1200, 1], [1400, 2], [1600, 3], [1800, 4],
  [1999.99, 4], [2000, 5], [50000, 5]
];
for (const [gold, expected] of thresholds) {
  assert.strictEqual(rules.modifierForGold(gold), expected, `gold ${gold}`);
}
assert.strictEqual(rules.carriedGoldEquivalent({ gp: 100, pp: 1, ep: 2, sp: 5, cp: 50 }), 112);
assert.strictEqual(rules.getModifier({ className: 'Мореход', coins: { gp: 1000 } }), 0);
assert.strictEqual(rules.getModifier({ className: 'Бандит', coins: { gp: 2000 } }), 0);
assert.strictEqual(rules.getModifier({ className: 'Мореход', coins: { gp: 2000 } }), 5);
assert.strictEqual(rules.getModifier({ className: 'Мореход', coins: { gp: 0 } }), -5);
assert.strictEqual(rules.adjustRollTotal(14, { className: 'Мореход', coins: { gp: 1200 } }), 15);
assert.strictEqual(rules.adjustDamageDie(1, { className: 'Мореход', coins: { gp: 0 } }), 0);
assert.strictEqual(rules.adjustDamageDie(4, { className: 'Мореход', coins: { gp: 2000 } }), 9);
assert.strictEqual(rules.adjustDamageDie(4, { className: 'Бандит', coins: { gp: 2000 } }), 4);
// Integration: load the actual rules engine and confirm the modifier reaches weapon attacks once.
const context = {
  console,
  Math: Object.create(Math),
  Number, String, Array, Object, RegExp, JSON, Date, Set, parseInt, parseFloat,
  document: { getElementById: () => null },
  addEventListener: () => {},
  rollSingleDice: () => 10
};
context.window = context;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app/morehod_gold_modifier.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(require.resolve('../app/rulesEngine.js'), 'utf8'), context);
const mariner = { classes: [{ name: 'Мореход', level: 1 }], stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }, proficiencyBonus: 2, coins: { gp: 2000 } };
const attack = context.DNDRules.weaponAttack(mariner, { stat: 'str' }, 'normal');
assert.strictEqual(attack.bonus, 7, 'weapon attack bonus includes +5 Mariner gold modifier once');
assert.strictEqual(attack.total, 17, 'weapon attack total includes modifier once');
const other = { classes: [{ name: 'Бандит', level: 1 }], stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }, proficiencyBonus: 2, coins: { gp: 2000 } };
assert.strictEqual(context.DNDRules.weaponAttack(other, { stat: 'str' }, 'normal').bonus, 2, 'other classes are unaffected');
assert.strictEqual(context.DNDRules.getSkillBonus(mariner, 'perception', 'wis'), 0, 'static skill bonus remains unchanged; passive values are not modified');
console.log('morehod_gold_modifier_test: all assertions passed');
