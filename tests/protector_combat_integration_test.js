const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const window = {};
window.DNDRules = {
  parseDice(expr) {
    const text = String(expr || '1d6').replace(/\s/g, '');
    const groups = [];
    let constant = 0;
    const parts = text.match(/[+-]?[^+-]+/g) || [];
    for (const part of parts) {
      const dice = part.match(/^([+-]?)(\d*)d(\d+)$/i);
      if (dice) {
        groups.push({ count: Number(dice[2] || 1), sides: Number(dice[3]) });
      } else {
        constant += Number(part);
      }
    }
    return { groups, constant };
  }
};
const context = {
  window,
  isFinite,
  Number,
  String,
  Object,
  Array,
  JSON,
  Math: Object.create(Math)
};
context.Math.random = () => 0.999999;
vm.runInNewContext(fs.readFileSync(require.resolve('../app/four_custom_class_runtime.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(require.resolve('../app/combat_engine.js'), 'utf8'), context);

const protector = {
  id: 'protector-integration',
  name: 'Заступник',
  classes: [{ name: 'Заступник', level: 3 }],
  abilityScores: { str: 14, dex: 12, con: 14, int: 10, wis: 10, cha: 10 },
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 },
  hp: 20,
  maxHp: 20,
  tempHp: 0
};

// A self-defense reaction is not triggered implicitly by incoming damage.
const ordinary = window.DNDCombat.applyDamage(protector, 4, 'рубящий');
assert.strictEqual(ordinary.amount, 4, 'ordinary damage is not reduced without explicit reaction choice');
assert.strictEqual(protector.resources.protectorImpulses.current, 2, 'ordinary damage does not spend Protector resource');
assert.strictEqual(protector.turnResources.reaction, 1, 'ordinary damage does not spend reaction');
protector.hp = 20;

// Explicitly chosen self-defense goes through the real combat damage pipeline.
const defended = window.DNDCombat.applyDamage(protector, 8, 'рубящий', {
  protector,
  protectorIsSelf: true
});
assert.strictEqual(defended.amount, 0, 'explicit self-defense reduces damage in combat engine');
assert.strictEqual(protector.hp, 20, 'damage reduction prevents HP loss');
assert.strictEqual(protector.resources.protectorImpulses.current, 1, 'successful self-defense spends one impulse');
assert.strictEqual(protector.turnResources.reaction, 0, 'successful self-defense spends reaction');

// The combat UI's hero combatant has a separate initiative ID from the saved character.
// The bridge is accepted only when the UI explicitly confirms this is the hero token.
const mappedProtector = {
  id: 'protector-character-id',
  classes: [{ name: 'Заступник', level: 3 }],
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 },
  hp: 18,
  maxHp: 18,
  tempHp: 0
};
const heroCombatant = { id: 'initiative-hero-token', type: 'hero', hp: 18, maxHp: 18, tempHp: 0 };
const rejectedUnmapped = window.DNDCombat.applyDamage(heroCombatant, 8, 'рубящий', {
  protector: mappedProtector, protectorIsSelf: true
});
assert.strictEqual(rejectedUnmapped.amount, 8, 'self-defense identity bridge is rejected unless UI confirms hero combatant');
assert.strictEqual(mappedProtector.resources.protectorImpulses.current, 2, 'rejected identity bridge does not spend impulse');
const mappedDefense = window.DNDCombat.applyDamage(heroCombatant, 8, 'рубящий', {
  protector: mappedProtector, protectorIsSelf: true, protectorIsHeroCombatant: true
});
assert.strictEqual(mappedDefense.amount, 0, 'explicitly mapped hero combatant can use self-defense');
assert.strictEqual(heroCombatant.hp, 18, 'mapped self-defense prevents hero HP loss');
assert.strictEqual(mappedProtector.resources.protectorImpulses.current, 1, 'mapped self-defense spends exactly one impulse');
assert.strictEqual(mappedProtector.turnResources.reaction, 0, 'mapped self-defense spends reaction');

console.log('Protector combat integration tests: PASS');
