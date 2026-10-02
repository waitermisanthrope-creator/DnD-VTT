const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const window = {};
const context = { window, console, Math, Number, String, Object, Array };
[
  '../app/expansion_class_progressions.js',
  '../app/classesRegistry.js',
  '../app/data/subclasses/subclassesRegistry.js'
].forEach(file => vm.runInNewContext(
  fs.readFileSync(require.resolve(file), 'utf8'),
  context,
  { filename: file }
));

const circus = window.getClassData('Циркач');
assert(circus, 'Circus must be registered in the common class registry');
assert.strictEqual(circus.hitDie, 8, 'Circus hit die is d8');
assert.strictEqual(circus.progression.levels[1].subclassLevel, true,
  'Circus specialization must be chosen at level 1');
assert.strictEqual(circus.progression.levels[3].subclassLevel, undefined,
  'Circus must not defer specialization choice to level 3');

const choices = window.getAvailableSubclasses('Циркач');
assert.deepStrictEqual(
  Array.from(choices, x => x.name).sort(),
  ['Артист', 'Дрессировщик', 'Жонглёр смерти', 'Пожиратель огня', 'Силач'].sort(),
  'all five Circus specializations must be selectable'
);
assert(choices.every(x => x.pickLevel === 1),
  'every Circus specialization must be selectable at level 1');

const fireEater = window.getSubclassData('Циркач', 'Пожиратель огня');
assert(fireEater && fireEater.levels[1] && fireEater.levels[3],
  'Fire Eater subclass features must be present at level 1 and level 3');
assert(window.getSubclassFeaturesForLevel('Циркач', 'Дрессировщик', 7)
  .includes('Второй активный зверь'),
  'Trainer progression must list the second active animal at level 7');

console.log('Circus progression tests passed');
