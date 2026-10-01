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
assert.strictEqual(typeof rules.adjustDamageDie, 'undefined', 'Mariner modifier does not expose damage-die adjustment');
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
assert.strictEqual(attack.bonus, 2, 'weapon attack does not receive the ability/skill-check-only gold modifier');
assert.strictEqual(attack.total, 12, 'weapon attack total excludes the Mariner gold modifier');
const other = { classes: [{ name: 'Бандит', level: 1 }], stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }, proficiencyBonus: 2, coins: { gp: 2000 } };
assert.strictEqual(context.DNDRules.weaponAttack(other, { stat: 'str' }, 'normal').bonus, 2, 'other classes are unaffected');
assert.strictEqual(context.DNDRules.getSkillBonus(mariner, 'perception', 'wis'), 0, 'static skill bonus remains unchanged; passive values are not modified');
// Integration: ordinary ability/skill d20 checks receive the carried-gold modifier exactly once.
{
  const diceResult = { textContent: '' };
  const diceContext = {
    console, Math: Object.assign(Object.create(Math), { random: () => 0.45 }), Number, String, Array, Object, Date,
    document: { getElementById: id => id === 'diceResult' ? diceResult : null, querySelectorAll: () => [], addEventListener: () => {} },
    window: {}, currentChar: mariner,
    MorehodGoldModifier: { getModifier: hero => hero === mariner ? 5 : 0 },
    applyConditionsToRoll: () => ({ effectiveMode: 'normal', forceCrit1: false, conditionNotes: [] }),
    rollSingleDice: () => 10,
    triggerCritEffect: () => {}
  };
  diceContext.window = diceContext;
  diceContext.globalThis = diceContext;
  vm.createContext(diceContext);
  vm.runInContext(fs.readFileSync(require.resolve('../app/dice.js'), 'utf8'), diceContext);
  diceContext.executeD20Check('Проверка характеристики', 2);
  assert.strictEqual(diceResult.textContent, 'Итог: 17 (+17)', 'ability/skill d20 check receives +5 once');
}
// Integration: combat dice remain natural; the Mariner modifier never adjusts damage or HP dice.
{
  const combatContext = {
    console, Math: Object.create(Math), Date, JSON, setTimeout, clearTimeout,
    alert: () => {}, prompt: () => null, addEventListener: () => {}
  };
  combatContext.Math.random = () => 0; // deterministic raw d20/d6 result = 1
  combatContext.window = combatContext;
  combatContext.globalThis = combatContext;
  vm.createContext(combatContext);
  vm.runInContext(fs.readFileSync(require.resolve('../app/morehod_gold_modifier.js'), 'utf8'), combatContext);
  combatContext.DNDRules = {
    parseDice: (expr) => {
      const m = String(expr).match(/(\d+)d(\d+)([+-]\d+)?/i);
      return { groups: [{ count: Number(m[1]), sides: Number(m[2]) }], constant: m[3] ? Number(m[3]) : 0 };
    },
    getSaveBonus: () => 0,
    getD20Modifier: (hero) => combatContext.MorehodGoldModifier.getModifier(hero),
    rollD20: () => ({ result: 1, critical: false, fumble: false }),
    normalizeConditionName: (x) => x,
    conditionModifiers: () => ({ autoFailStrDex: false }),
    profBonus: () => 2
  };
  combatContext.DNDClassFeatures = { activeRage: () => false, reactionOptions: () => null, saveModifiers: () => null };
  vm.runInContext(fs.readFileSync(require.resolve('../app/four_custom_class_runtime.js'), 'utf8'), combatContext);
  vm.runInContext(fs.readFileSync(require.resolve('../app/combat_engine.js'), 'utf8'), combatContext);
  const loadedMariner = { classes: [{ name: 'Мореход', level: 1 }], stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }, coins: { gp: 2000 } };
  const protector = {
    id: 'protector-1',
    classes: [{ name: 'Заступник', level: 3 }],
    stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    abilityScores: { dex: 10, cha: 10 },
    resources: {},
    turnResources: { actions: 1, bonusAction: 1, reaction: 1 }
  };
  combatContext.FourCustomClassRuntime.sync(protector);
  const ally = { id: 'ally-1', hp: 20, hpMax: 20, stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 } };
  const protectedHit = combatContext.DNDCombat.applyDamage(ally, 10, 'огонь', { protector, protectorDistanceFt: 5, protectorVisible: true, protectorIsAlly: true });
  assert.strictEqual(protectedHit.amount, 7, 'Protector reduces incoming damage by 1d10 + proficiency (deterministic roll 1 + 2)');
  assert.strictEqual(ally.hp, 13, 'reduced damage is reflected in target HP');
  assert.strictEqual(protector.resources.protectorImpulses.current, 1, 'Protector spends one impulse');
  assert.strictEqual(protector.turnResources.reaction, 0, 'Protector spends one reaction');
  const invalidProtector = {
    id: 'protector-2',
    classes: [{ name: 'Заступник', level: 3 }],
    resources: {},
    turnResources: { actions: 1, bonusAction: 1, reaction: 1 }
  };
  combatContext.FourCustomClassRuntime.sync(invalidProtector);
  const unprotectedHit = combatContext.DNDCombat.applyDamage(ally, 5, 'огонь', { protector: invalidProtector, protectorDistanceFt: 6, protectorIsAlly: true });
  assert.strictEqual(unprotectedHit.amount, 5, 'Protector outside 5 feet cannot intercept');
  assert.strictEqual(invalidProtector.resources.protectorImpulses.current, 2, 'invalid interception spends no resource');
  assert.strictEqual(invalidProtector.turnResources.reaction, 1, 'invalid interception spends no reaction');
  const protectorWithResistance = {
    id: 'protector-3',
    classes: [{ name: 'Заступник', level: 3 }],
    resources: {},
    turnResources: { actions: 1, bonusAction: 1, reaction: 1 }
  };
  combatContext.FourCustomClassRuntime.sync(protectorWithResistance);
  const fireResistantAlly = { id: 'ally-fire-resistant', hp: 20, hpMax: 20, resistances: ['огонь'], stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 } };
  const resistedProtectedHit = combatContext.DNDCombat.applyDamage(fireResistantAlly, 10, 'огонь', { protector: protectorWithResistance, protectorDistanceFt: 5, protectorVisible: true, protectorIsAlly: true });
  assert.strictEqual(resistedProtectedHit.amount, 2, 'Protector reduces damage after fire resistance (10 -> 5 -> 2)');
  assert.strictEqual(fireResistantAlly.hp, 18, 'post-resistance interception applies correct HP damage');
  const highGoldDie = combatContext.DNDCombat.rollDice('1d6', false, false, loadedMariner);
  assert.strictEqual(highGoldDie.rolls[0], 1);
  assert.strictEqual(highGoldDie.adjustedRolls[0], 1);
  assert.strictEqual(highGoldDie.total, 1, 'Mariner modifier does not affect damage or HP dice');
  const poorMariner = Object.assign({}, loadedMariner, { coins: { gp: 0 } });
  const lowGoldDie = combatContext.DNDCombat.rollDice('1d6', false, false, poorMariner);
  assert.strictEqual(lowGoldDie.adjustedRolls[0], 1, 'damage die remains natural even with -5 modifier');
  const save = combatContext.DNDCombat.savingThrow(loadedMariner, 'con', 6);
  assert.strictEqual(save.total, 1, 'saving throw excludes the ability/skill-check-only Mariner modifier');
  assert.strictEqual(save.success, false);
  const nonMariner = Object.assign({}, loadedMariner, { classes: [{ name: 'Бандит', level: 1 }] });
  assert.strictEqual(combatContext.DNDCombat.savingThrow(nonMariner, 'con', 6).total, 1, 'other classes receive no gold modifier');
}
console.log('morehod_gold_modifier_test: all assertions passed');
