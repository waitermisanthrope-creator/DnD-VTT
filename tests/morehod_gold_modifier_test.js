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
assert.strictEqual(rules.getModifier({ classes: [{ englishName: 'Mariner', level: 1 }], coins: { gp: -100, pp: -1, ep: -2, sp: -5, cp: -50 } }), -5, 'negative coin entries are clamped to zero for carried wealth');
assert.strictEqual(rules.carriedGoldEquivalent({ gp: '100', pp: '1', ep: '2', sp: '5', cp: '50' }), 112, 'numeric strings in a saved coin purse are normalized consistently');
assert.strictEqual(rules.getModifier({ classes: [{ name: 'Бандит', englishName: 'Mariner' }], coins: { gp: 2000 } }), 0, 'a non-Mariner class name takes precedence over an incidental alias');
assert.strictEqual(rules.getModifier({ classes: [{ name: 'Бандит', level: 1 }], className: 'Мореход', coins: { gp: 2000 } }), 0, 'an explicit non-Mariner class list overrides a stale legacy className');
assert.strictEqual(rules.getModifier({ classes: [{ name: 'Мореход', level: 1 }], coins: { gp: 100 }, bank: { gp: 5000 }, partyCoins: { gp: 5000 } }), -5, 'bank and party wealth do not count as carried personal coins');
assert.strictEqual(rules.getModifier({ classes: [{ name: 'Бандит', level: 2 }, { name: 'Мореход', level: 1 }], coins: { gp: 2000 } }), 5, 'multiclass characters receive the modifier when one actual class is Mariner');
assert.strictEqual(rules.getModifier({ classes: [{ name: 'Мореход', level: 1 }], coins: { gp: 'not-a-number', pp: {}, ep: null, sp: -3, cp: 'NaN' } }), -5, 'malformed and negative coin fields safely count as zero');
const restoredMariner = JSON.parse(JSON.stringify({ classes: [{ name: 'Мореход', level: 3 }], coins: { gp: 1200, sp: 10 }, name: 'Тестовый мореход' }));
assert.strictEqual(rules.getModifier(restoredMariner), 1, 'the wallet modifier survives JSON save/export/import round-trip');

// Integration: exercise the actual app character storage functions with a localStorage mock.
{
  const appSource = fs.readFileSync(require.resolve('../app/app.js'), 'utf8');
  const start = appSource.indexOf('var CHARACTER_SAVE_SCHEMA_VERSION = 3;');
  const end = appSource.indexOf('function renderCharacterList() {', start);
  assert(start >= 0 && end > start, 'character storage functions are available in app.js');
  const storage = new Map();
  const appContext = {
    console, JSON, Number, Math, Date, isFinite,
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value))
    },
    alert: () => {},
    allCharacters: []
  };
  vm.createContext(appContext);
  vm.runInContext(appSource.slice(start, end), appContext);
  appContext.allCharacters = [{ id: 'mariner-storage-test', name: 'Мореход', classes: [{ name: 'Мореход', level: 3 }], coins: { gp: 1200, sp: 10 } }];
  assert.strictEqual(appContext.saveAllCharacters(), true, 'app character storage accepts the Mariner save');
  appContext.allCharacters = [];
  appContext.loadAllCharacters();
  assert.strictEqual(appContext.allCharacters.length, 1, 'app character storage restores the saved character');
  assert.strictEqual(appContext.allCharacters[0].coins.gp, 1200, 'app storage preserves carried gold');
  assert.strictEqual(appContext.allCharacters[0].coins.sp, 10, 'app storage preserves carried silver');
  assert.strictEqual(rules.getModifier(appContext.allCharacters[0]), 1, 'restored in-app wallet produces the same Mariner modifier');
}

// Integration: a real market purchase updates the same carried wallet read by the Mariner modifier.
{
  const storage = new Map();
  const hero = { id: 'mariner-market-test', name: 'Мореход', classes: [{ name: 'Мореход', level: 1 }], coins: { gp: 2000, pp: 0, ep: 0, sp: 0, cp: 0 }, inventory: {} };
  const savedWallets = [];
  const marketContext = {
    console, Math, Number, String, Array, Object, JSON, Date, RegExp, isFinite, parseInt, parseFloat,
    currentCharacter: hero,
    localStorage: { getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)) },
    document: { addEventListener: () => {}, getElementById: () => null },
    addEventListener: () => {},
    renderInventory: () => {},
    autoSaveCurrentCharacter: () => savedWallets.push(JSON.parse(JSON.stringify(hero.coins)))
  };
  marketContext.window = marketContext;
  marketContext.globalThis = marketContext;
  vm.createContext(marketContext);
  vm.runInContext(fs.readFileSync(require.resolve('../app/market_economy_v55.js'), 'utf8'), marketContext);
  assert.strictEqual(rules.getModifier(hero), 5, 'the starting carried wallet grants +5');
  const traderId = Object.keys(marketContext.DND_MARKET_V55.TRADERS)[0];
  const item = marketContext.DND_MARKET_V55.TRADERS[traderId].stock[0];
  assert(item, 'market fixture contains a purchasable item');
  const purchase = marketContext.DND_MARKET_V55.buy(traderId, item.id, 1);
  assert.strictEqual(purchase.ok, true, 'the market purchase succeeds');
  assert.strictEqual(rules.getModifier(hero), 4, 'market spending immediately recalculates the modifier from the updated carried wallet');
  assert(savedWallets.length >= 1, 'successful purchase persists the updated character');
  assert.deepStrictEqual(savedWallets[savedWallets.length - 1], hero.coins, 'the final autosave contains the post-purchase wallet, not the pre-purchase balance');
}
// A malformed destination inventory category must not consume coins or trader stock.
{
  const storage = new Map();
  const hero = { id: 'mariner-market-malformed-inventory', name: 'Мореход', classes: [{ name: 'Мореход', level: 1 }], coins: { gp: 100, pp: 0, ep: 0, sp: 0, cp: 0 }, inventory: { gear: {} } };
  const marketContext = {
    console, Math, Number, String, Array, Object, JSON, Date, RegExp, isFinite, parseInt, parseFloat,
    currentCharacter: hero,
    localStorage: { getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)) },
    document: { addEventListener: () => {}, getElementById: () => null }, addEventListener: () => {}, renderInventory: () => {}, autoSaveCurrentCharacter: () => {}
  };
  marketContext.window = marketContext; marketContext.globalThis = marketContext; vm.createContext(marketContext);
  vm.runInContext(fs.readFileSync(require.resolve('../app/market_economy_v55.js'), 'utf8'), marketContext);
  const api = marketContext.DND_MARKET_V55;
  const traderId = Object.keys(api.TRADERS).find(id => api.TRADERS[id].stock.some(item => item.category === 'gear'));
  const item = api.TRADERS[traderId].stock.find(item => item.category === 'gear');
  const stockBefore = api.getTrader(traderId).stock.find(x => x.id === item.id).qty;
  const walletBefore = JSON.stringify(hero.coins);
  const result = api.buy(traderId, item.id, 1);
  assert.strictEqual(result.ok, false, 'purchase is rejected for a malformed destination category');
  assert.strictEqual(JSON.stringify(hero.coins), walletBefore, 'rejected purchase does not mutate wallet');
  assert.strictEqual(api.getTrader(traderId).stock.find(x => x.id === item.id).qty, stockBefore, 'rejected purchase does not consume trader stock');
}
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
  const poorMarinerForCheck = Object.assign({}, mariner, { coins: { gp: 0 } });
  diceContext.currentChar = poorMarinerForCheck;
  diceContext.MorehodGoldModifier.getModifier = hero => hero === mariner ? 5 : (hero === poorMarinerForCheck ? -5 : 0);
  diceContext.executeD20Check('Проверка навыка', 2);
  assert.strictEqual(diceResult.textContent, 'Итог: 7 (+7)', 'the current wallet is read for each check and the -5 modifier applies exactly once');
  diceContext.currentChar = mariner;
  diceContext.getStatModNum = () => 2;
  diceContext.getProfBonusNum = () => 2;
  diceContext.updateSkillsState = () => {};
  diceContext.currentChar.skillsData = { perception: 1 };
  diceContext.MorehodGoldModifier.getModifier = hero => hero === mariner ? 5 : 0;
  diceContext.rollStatCheck('str', 'Сила');
  assert.strictEqual(diceResult.textContent, 'Итог: 17 (+17)', 'the public ability-check entry point receives the modifier once');
  diceContext.rollSkillCheck('perception', 'Восприятие', 'wis');
  assert.strictEqual(diceResult.textContent, 'Итог: 19 (+19)', 'the public skill-check entry point receives the modifier once after proficiency');
  let modifierReads = 0;
  diceContext.MorehodGoldModifier.getModifier = hero => { modifierReads++; return hero === mariner ? 5 : 0; };
  diceContext.applyConditionsToRoll = () => ({ effectiveMode: 'advantage', forceCrit1: false, conditionNotes: [] });
  diceContext.executeD20Check('Проверка с преимуществом', 2);
  assert.strictEqual(diceResult.textContent, 'Итог: 17 (+17)', 'advantage still applies the modifier only once to the final d20 result');
  assert.strictEqual(modifierReads, 1, 'the wallet modifier is read exactly once per check even when two d20 are rolled');
  const previousRoller = diceContext.rollSingleDice;
  let disadvantageRolls = [8, 3];
  diceContext.rollSingleDice = () => disadvantageRolls.shift();
  diceContext.applyConditionsToRoll = () => ({ effectiveMode: 'disadvantage', forceCrit1: false, conditionNotes: [] });
  modifierReads = 0;
  diceContext.executeD20Check('Проверка с помехой', 2);
  assert.strictEqual(diceResult.textContent, 'Итог: 10 (+10)', 'disadvantage uses the lower d20, then adds the +2 check modifier and +5 Mariner modifier once');
  assert.strictEqual(modifierReads, 1, 'disadvantage reads the wallet modifier once despite rolling two d20');
  diceContext.rollSingleDice = previousRoller;
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
  const banditHero = {
    id: 'bandit-hero',
    classes: [{ name: 'Бандит', level: 3 }],
    classFeaturesState: { bandit: { studiedTargetIds: ['enemy-down', 'enemy-live'] } }
  };
  combatContext.currentChar = banditHero;
  const defeatedStudiedTarget = { id: 'enemy-down', hp: 1, hpMax: 1, stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 } };
  const defeatedResult = combatContext.DNDCombat.applyDamage(defeatedStudiedTarget, 1, 'огонь');
  assert.strictEqual(defeatedResult.defeated, true, 'combat resolver marks the target defeated');
  assert.deepStrictEqual(Array.from(banditHero.classFeaturesState.bandit.studiedTargetIds), ['enemy-live'], 'combat resolver clears only the defeated studied target');
}
// Integration: selling inventory through the real market updates the carried wallet and modifier immediately.
{
  const storage = new Map();
  const seller = {
    id: 'mariner-market-sale-test',
    name: 'Мореход',
    classes: [{ name: 'Мореход', level: 1 }],
    coins: { gp: 1999, sp: 5, ep: 0, cp: 0, pp: 0 },
    inventory: { materials: [{ name: 'Тестовый товар', category: 'materials', count: 1, marketPriceGp: 1 }] }
  };
  const saleContext = {
    console, Math, Number, String, Array, Object, JSON, Date, RegExp, isFinite, parseInt, parseFloat,
    currentCharacter: seller,
    localStorage: { getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)) },
    document: { addEventListener: () => {}, getElementById: () => null },
    addEventListener: () => {},
    autoSaveCurrentCharacter: () => {}
  };
  saleContext.window = saleContext;
  saleContext.globalThis = saleContext;
  vm.createContext(saleContext);
  vm.runInContext(fs.readFileSync(require.resolve('../app/market_economy_v55.js'), 'utf8'), saleContext);
  assert.strictEqual(rules.getModifier(seller), 4, 'seller begins below 2000 gp equivalent');
  const sale = saleContext.DND_MARKET_V55.sell('caravan', 'materials', 0, 1);
  assert.strictEqual(sale.ok, true, 'market sale succeeds');
  assert.strictEqual(sale.totalCp, 65, 'one-gold item sells for 65 copper at caravan sell factor');
  assert.strictEqual(rules.getModifier(seller), 5, 'market sale immediately recalculates the modifier after crossing the 2000 gp threshold');
  assert.strictEqual((seller.inventory.materials || []).length, 0, 'sold item is removed from inventory');
  const beforeFailedSale = saleContext.DND_MARKET_V55.balanceCp();
  const failedSale = saleContext.DND_MARKET_V55.sell('caravan', 'materials', 0, 1);
  assert.strictEqual(failedSale.ok, false, 'selling a missing item fails safely');
  assert.strictEqual(saleContext.DND_MARKET_V55.balanceCp(), beforeFailedSale, 'failed sale does not alter carried wealth');

  // Invalid trader must be rejected before inventory or wallet mutation.
  seller.inventory.materials.push({ name: 'Сохранный товар', category: 'materials', count: 1, marketPriceGp: 2 });
  const beforeInvalidTraderCoins = JSON.stringify(seller.coins);
  const beforeInvalidTraderCount = seller.inventory.materials.length;
  const invalidTraderSale = saleContext.DND_MARKET_V55.sell('missing-trader', 'materials', 0, 1);
  assert.strictEqual(invalidTraderSale.ok, false, 'sale to an unknown trader is rejected');
  assert.strictEqual(JSON.stringify(seller.coins), beforeInvalidTraderCoins, 'unknown trader cannot corrupt or change the wallet');
  assert.strictEqual(seller.inventory.materials.length, beforeInvalidTraderCount, 'unknown trader cannot remove the item');
  assert.strictEqual(seller.inventory.materials[0].name, 'Сохранный товар', 'the unsold item remains in inventory');
}
console.log('morehod_gold_modifier_test: all assertions passed');


// Regression: initiative and spell attacks are d20 rolls, but are not ability/skill checks.
// They must never receive the Mariner's carried-gold modifier.
{
  const appSource = fs.readFileSync(require.resolve('../app/app.js'), 'utf8');
  const initiativeStart = appSource.indexOf('function rollInitiative() {');
  const initiativeEnd = appSource.indexOf('\n}\n', initiativeStart);
  assert(initiativeStart >= 0 && initiativeEnd > initiativeStart, 'initiative handler is available');
  const resultBox = { innerText: '' };
  const initiativeContext = {
    Math: Object.assign(Object.create(Math), { random: () => 0.5 }),
    currentChar: mariner,
    getStatModNum: stat => stat === 'dex' ? 2 : 0,
    formatModStr: n => n >= 0 ? '+' + n : String(n),
    goToTab: () => {},
    document: { getElementById: id => id === 'diceResult' ? resultBox : null }
  };
  vm.createContext(initiativeContext);
  vm.runInContext(appSource.slice(initiativeStart, initiativeEnd + 3), initiativeContext);
  initiativeContext.rollInitiative();
  assert.match(resultBox.innerText, /d20 \(11\) \+2 = 13/, 'initiative uses only the Dexterity modifier, not the Mariner gold modifier');

  const spellSource = fs.readFileSync(require.resolve('../app/spells.js'), 'utf8');
  const spellStart = spellSource.indexOf('function rollSpellAttack(spellName) {');
  const spellEnd = spellSource.indexOf('\n}\n', spellStart);
  assert(spellStart >= 0 && spellEnd > spellStart, 'spell attack handler is available');
  let spellLog = '';
  const spellContext = {
    console: { group: () => {}, groupEnd: () => {}, log: () => {} },
    getActiveCharacter: () => mariner,
    getStatModNum: () => 2,
    getProfBonusNum: () => 3,
    rollSingleDice: () => 10,
    currentRollMode: 'normal',
    document: { getElementById: id => id === 'spellStat' ? { value: 'int' } : null },
    appendDiceLog: text => { spellLog = text; },
    triggerCritEffect: () => {}
  };
  vm.createContext(spellContext);
  vm.runInContext(spellSource.slice(spellStart, spellEnd + 3), spellContext);
  assert.strictEqual(spellContext.rollSpellAttack('Тестовое заклинание'), 15, 'spell attack uses d20 + spell attack bonus only');
  assert.match(spellLog, /Итог атаки: \*\*15\*\*/, 'spell attack log shows no gold modifier');
}
