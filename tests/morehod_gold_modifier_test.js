const assert = require('assert');
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
console.log('morehod_gold_modifier_test: all assertions passed');
