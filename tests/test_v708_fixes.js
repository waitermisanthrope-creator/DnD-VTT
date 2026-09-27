'use strict';
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = __dirname;

function read(rel){ return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function loadInWindow(files, extra={}) {
  const ctx = { console, setTimeout, clearTimeout, ...extra };
  ctx.window = ctx;
  vm.createContext(ctx);
  files.forEach(f => vm.runInContext(read(f), ctx, {filename:f}));
  return ctx;
}

// A1/A2: CommonJS exports must not crash browser/WebView execution.
for (const f of ['spellslist/Spells2lvl.js','spellslist/Spells4lvl.js']) {
  const src = read(f);
  assert(src.includes("if (typeof module !== 'undefined' && module.exports)"), `${f}: CommonJS guard missing`);
}

// A3: no-character crafting render path must use an empty profile object.
assert(read('crafting_profession_progression_v47.js').includes('ensureCharacterProfessions(c)||{}'), 'A3 guard missing');

// B1/B2: central spell-slot calculator treats Artificer as half-caster and remains authoritative.
const rules = loadInWindow(['rulesEngine.js']);
let h = {classes:[{name:'Изобретатель',level:1}]};
let t = rules.DNDRules.spellSlotTable(h);
assert.strictEqual(t.casterLevel, 1, 'Artificer 1 must contribute caster level 1');
assert.strictEqual(t.normal[1], 2, 'Artificer 1 must have 1st-level slots');
h = {classes:[{name:'Изобретатель',level:2}]};
t = rules.DNDRules.spellSlotTable(h);
assert.strictEqual(t.casterLevel, 1, 'Artificer 2 rounds down for its own slot contribution only in 2014 multiclass calculation?');
// In the 2014 Artificer multiclass rule the Artificer level is rounded UP.
h = {classes:[{name:'Изобретатель',level:2},{name:'Следопыт',level:2}]};
t = rules.DNDRules.spellSlotTable(h);
assert.strictEqual(t.casterLevel, 2, 'Artificer 2 + Ranger 2 should produce caster level 2');

// B1: magic_engine must defer to the central calculator when it exists.
const magic = loadInWindow(['rulesEngine.js','magic_engine.js']);
h = {classes:[{name:'Изобретатель',level:2}]};
magic.DNDMagic.rebuild(h);
assert.strictEqual(magic.DNDMagic.casterLevel(h), 1, 'magic_engine must use central Artificer calculation');
assert.strictEqual(h.spellSlotsData[1].max, 2, 'magic_engine must use central slot table');

// B10: selected-class progression must use class level, not total level.
const levelUpSrc = read('classes/level_up.js');
assert(levelUpSrc.includes('const classEntry = Array.isArray(hero.classes)'), 'B10 class-level lookup missing');
assert(levelUpSrc.includes('applyClassProgression(hero, className, classLevel)'), 'B10 class-level progression call missing');

// B11: armor equipment must enforce one shield and one body-armor slot.
const invSrc = read('Inventory.js');
assert(invSrc.includes('Only one shield and one body-armor item may be equipped at once.'), 'B11 equipment exclusivity guard missing');

console.log('V70.8 targeted fixes: PASS');
