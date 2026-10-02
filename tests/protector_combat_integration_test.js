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
heroCombatant.hp = 18; // Reset the deliberately unprotected hit before testing the accepted choice.
const mappedDefense = window.DNDCombat.applyDamage(heroCombatant, 8, 'рубящий', {
  protector: mappedProtector, protectorIsSelf: true, protectorIsHeroCombatant: true
});
assert.strictEqual(mappedDefense.amount, 0, 'explicitly mapped hero combatant can use self-defense');
assert.strictEqual(heroCombatant.hp, 18, 'mapped self-defense prevents hero HP loss');
assert.strictEqual(mappedProtector.resources.protectorImpulses.current, 1, 'mapped self-defense spends exactly one impulse');
assert.strictEqual(mappedProtector.turnResources.reaction, 0, 'mapped self-defense spends reaction');


 
// Exercise the actual combat UI attack entry point with a mocked prompt/confirm layer.
let promptCalls = [];
let alerts = [];
context.prompt = (message, fallback) => {
  promptCalls.push(String(message));
  if (String(message).startsWith('Цель:')) return '1';
  if (String(message).startsWith('Бонус атаки:')) return '100';
  if (String(message).startsWith('Урон (')) return '1d4';
  if (String(message).startsWith('Тип урона:')) return 'рубящий';
  return fallback == null ? '' : String(fallback);
};
context.confirm = message => {
  assert(String(message).includes('Защитный импульс'), 'UI asks for an explicit Protector reaction choice');
  return true;
};
context.alert = message => alerts.push(String(message));
context.document = { getElementById: () => null };
const uiProtector = {
  id: 'saved-protector-id',
  name: 'Заступник',
  classes: [{ name: 'Заступник', level: 3 }],
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 },
  hpCurrent: 18,
  hpMax: 18,
  hpTemp: 0,
  hp: { current: 18, max: 18, temp: 0 }
};
const uiAttacker = { id: 'attacker-ui', name: 'Враг', type: 'enemy', hp: 20, maxHp: 20, ac: 10 };
const uiHeroToken = { id: 'combat-token-id', name: 'Заступник', type: 'hero', hp: 18, maxHp: 18, tempHp: 0, ac: 10, turnResources: { reaction: 1 } };
window.currentChar = {
  ...uiProtector,
  turnResources: undefined, // Reaction state belongs to the initiative combatant, not necessarily the saved character.
  initiativeTracker: { round: 1, activeIndex: 0, combatants: [uiAttacker, uiHeroToken] }
};
window.DNDRules.rollD20 = () => ({ result: 20, critical: true, fumble: false });
window.dndCombatAttack();
assert.strictEqual(uiHeroToken.hp, 18, 'combat UI self-defense choice prevents HP loss after an incoming hit');
assert.strictEqual(window.currentChar.resources.protectorImpulses.current, 1, 'combat UI spends one Protector impulse after confirmation');
assert.strictEqual(uiHeroToken.turnResources.reaction, 0, 'combat UI spends the initiative combatant reaction after confirmation');
assert(promptCalls.some(message => message.startsWith('Цель:')), 'combat UI asks for a target');
assert(alerts.some(message => message.includes('ПОПАДАНИЕ')), 'combat UI reports the resolved hit');

// The manual damage control must offer the same explicit reaction choice.
window.currentChar.resources.protectorImpulses.current = 2;
uiHeroToken.turnResources.reaction = 1;
window.currentChar.hpCurrent = 18;
uiHeroToken.hp = 18;
const confirmsBeforeManualDamage = promptCalls.length;
window.dndCombatDamage();
assert.strictEqual(uiHeroToken.hp, 18, 'manual damage UI self-defense prevents HP loss');
assert.strictEqual(window.currentChar.resources.protectorImpulses.current, 1, 'manual damage UI spends one impulse after confirmation');
assert.strictEqual(uiHeroToken.turnResources.reaction, 0, 'manual damage UI spends the initiative combatant reaction after confirmation');
assert(promptCalls.length > confirmsBeforeManualDamage, 'manual damage UI prompts for target and damage');
window.currentChar = null;


 
// Explicit ally interception also resolves through the real damage pipeline.
const allyProtector = {
  id: 'ally-protector',
  classes: [{ name: 'Заступник', level: 3 }],
  resources: { protectorImpulses: { current: 2, max: 2, recharge: 'short' } },
  turnResources: { reaction: 1 }
};
const allyTarget = { id: 'protected-ally', hp: 20, maxHp: 20, tempHp: 0, resistances: [] };
const unprotectedAllyHit = window.DNDCombat.applyDamage(allyTarget, 4, 'рубящий');
assert.strictEqual(unprotectedAllyHit.amount, 4, 'ally is not protected unless Protector choice is explicitly passed');
assert.strictEqual(allyProtector.resources.protectorImpulses.current, 2, 'ordinary ally damage does not spend Protector resource');
allyTarget.hp = 20;
const protectedAllyHit = window.DNDCombat.applyDamage(allyTarget, 8, 'рубящий', {
  protector: allyProtector,
  protectorIsAlly: true,
  protectorVisible: true,
  protectorDistanceFt: 5
});
assert.strictEqual(protectedAllyHit.amount, 0, 'explicit ally interception reduces damage through combat engine');
assert.strictEqual(allyTarget.hp, 20, 'ally HP is unchanged when interception covers all damage');
assert.strictEqual(allyProtector.resources.protectorImpulses.current, 1, 'ally interception spends one impulse');
assert.strictEqual(allyProtector.turnResources.reaction, 0, 'ally interception spends reaction');


 
// Defensive zone bonus is applied by the actual saving-throw resolver when a forced-movement save opts in.
window.DNDRules.rollD20 = () => ({ result: 10, critical: false, fumble: false });
window.currentChar = { initiativeTracker: { round: 2 } };
const zoneProtector = {
  id: 'zone-integration-protector',
  classes: [{ name: 'Заступник', level: 3, subclass: 'Страж рубежа' }],
  resources: { protectorImpulses: { current: 2, max: 2 } },
  turnResources: { bonusAction: 1 },
  classFeaturesState: {}
};
const zoneCreated = window.FourCustomClassRuntime.useFeature(zoneProtector, 'protectorZone', { actionAvailable: true, round: 1 });
assert.strictEqual(zoneCreated.ok, true, 'zone activation works through runtime');
const zoneAlly = { id: 'zone-integration-ally', hp: 10, maxHp: 10, saveBonuses: { str: 0 }, activeConditions: {} };
const zoneSave = window.DNDCombat.savingThrow(zoneAlly, 'str', 11, 'normal', {
  forcedMovementSave: true,
  protectorZoneProtector: zoneProtector,
  isAlly: true,
  visible: true,
  protectorZoneDistanceFt: 10
});
assert.strictEqual(zoneSave.bonus, 1, 'real saving-throw resolver adds zone bonus');
assert.strictEqual(zoneSave.success, true, 'zone bonus changes a boundary result from failure to success');
assert(zoneSave.classFeatureNotes.some(note => note.includes('Страж рубежа')), 'zone effect is reflected in result notes');

// Zone context is discovered from battlefield tokens when the caller marks a forced-movement save.
const zoneProtectorCombatant = zoneProtector;
zoneAlly.type = 'hero';
zoneAlly.name = 'Zone Ally';
window.currentChar = { initiativeTracker: { round: 2, combatants: [zoneProtectorCombatant, zoneAlly] } };
window.DNDBattleBoard = {
  findTokenForCombatant(id) {
    if (String(id) === String(zoneProtectorCombatant.id)) return { id: 'bt-zone-protector-token', sourceId: id, name: 'Zone Protector', type: 'hero', x: 1, y: 1, visible: true };
    if (String(id) === String(zoneAlly.id)) return { id: 'bt-zone-ally', sourceId: id, type: 'hero', x: 3, y: 1, visible: true };
    return null;
  },
  distanceFt(a, b) { return Math.abs(a.x - b.x) * 5 + Math.abs(a.y - b.y) * 5; },
  tokenList() { return []; }
};
const autoZoneSave = window.DNDCombat.forcedMovementSave(zoneAlly, 'str', 11, 'normal');
assert.strictEqual(autoZoneSave.bonus, 1, 'zone is found without manually passing protector/distance');
window.DNDBattleBoard = null;
window.currentChar = null;


const rescuedTarget = {
  id: 'rescue-oa-target', hp: 0, ac: 10,
  classFeaturesState: { protectorRescue: { noOpportunityAttacksFrom: 'rescued-foe' } }
};
const blockedOpportunity = window.DNDCombat.opportunityAttack({ id: 'rescued-foe', name: 'Enemy' }, rescuedTarget, { bonus: 100, damage: '1d6' });
assert.strictEqual(blockedOpportunity.blockedByProtectorRescue, true, 'selected enemy opportunity attack is blocked after rescue');
assert.strictEqual(blockedOpportunity.hit, false, 'blocked opportunity attack cannot hit');
const otherOpportunity = window.DNDCombat.attack({ id: 'other-foe', name: 'Other Enemy' }, rescuedTarget, { bonus: 100, damage: '1d6', attackKind: 'opportunity' });
assert.strictEqual(otherOpportunity.blockedByProtectorRescue, undefined, 'rescue does not block opportunity attacks from other enemies');

console.log('Protector combat integration tests: PASS');

// Protector's defensive zone ends immediately when its owner becomes incapacitated.
const zoneProtector = {
  id: 'zone-owner',
  classes: [{ name: 'Заступник', level: 3 }],
  conditions: {},
  classFeaturesState: {
    protector: { zone: { active: true, createdRound: 1, expiresRound: 11, radiusFt: 10 } }
  }
};
assert.strictEqual(window.DNDCombat.toggleCondition(zoneProtector, 'Оглушён', true), true, 'incapacitating condition is applied');
assert.strictEqual(zoneProtector.classFeaturesState.protector.zone.active, false, 'Protector zone ends immediately on incapacitation');
assert.strictEqual(zoneProtector.classFeaturesState.protector.zone.endedReason, 'protector-incapacitated', 'zone stores the reason it ended');
window.DNDCombat.toggleCondition(zoneProtector, 'Оглушён', false);
assert.strictEqual(zoneProtector.classFeaturesState.protector.zone.active, false, 'removing the condition does not reactivate an expired zone');
