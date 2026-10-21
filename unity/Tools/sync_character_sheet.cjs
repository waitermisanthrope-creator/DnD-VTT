'use strict';
// Executes only local, reviewed data/formula sources in a sandbox. No network.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const cp = require('node:child_process'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const git = (...args) => cp.execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
if (git('branch', '--show-current') !== 'experiment/unity-vtt') throw Error('Experimental branch only');
const sourceCommit = git('rev-parse', 'main');
const files = ['app/app.js', 'app/skills.js', 'app/spells.js', ...[...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="\.\/(app\/data\/spells\/[^"?]+)"/g)].map(m => m[1]), 'app/weaponsmelee.js', 'app/weaponsheavy.js', 'app/weaponsranged.js', 'app/weaponsspecial.js', 'app/armors.js', 'app/consumables.js', 'app/materials.js', 'app/junk.js', 'app/Inventory.js', 'app/Inventory-weight-tracker.js', 'app/notes.js'];
if (git('diff', 'main', '--', ...files)) throw Error('Sheet sources differ from main; review before regeneration');
files.push('app/races.js', 'app/Backgrounds.js', 'app/character_creation.js', 'app/Proficiencies.js', 'app/classesRegistry.js', 'app/character_builder_v2.js', 'app/inventory-coins.js');
const classFiles = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard', 'Artificer'].map(n => `app/data/classes/${n}.js`);
files.splice(files.indexOf('app/classesRegistry.js'), 0, ...classFiles);
if (git('diff', 'main', '--', ...files)) throw Error('Creation sources differ from main');
const sources = files.map(file => ({ file, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex') }));
const elements = {};
const context = { console, document: { addEventListener() {}, getElementById(id) { return elements[id] || null; } }, addEventListener() {}, setTimeout() {}, clearTimeout() {}, confirm() { return true; }, localStorage: { getItem() { return null; } } };
context.window = context; context.self = context;
vm.createContext(context);
for (const file of files) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file, timeout: 5000 });
const golden = [];
for (let level = 1; level <= 20; level++) for (let mult = 0; mult <= 2; mult++) {
  const stats = Object.fromEntries(context.STATS_CONFIG.map((s, i) => [s.id, 3 + ((level + i * 3) % 18)]));
  const hero = { id: `fixture-${level}-${mult}`, level, stats, skillsData: Object.fromEntries(context.SKILLS_CONFIG.map(s => [s.id, mult])) };
  if (level % 2 === 0) hero.classes = [{ name: 'Воин', level: level - 1 }, { name: 'Плут', level: 1 }];
  for (const [stat, value] of Object.entries(stats)) elements[stat] = { value };
  elements.profBonus = { value: 2 }; context.currentChar = context.currentCharacter = hero;
  context.updateProficiencyBonus(); context.updateSkillsState();
  golden.push({ hero, proficiency: hero.profBonus, modifiers: Object.fromEntries(context.STATS_CONFIG.map(s => [s.id, context.getStatModNum(s.id)])), totals: context.SKILLS_CONFIG.map(s => context.getStatModNum(s.stat) + elements.profBonus.value * mult) });
}
const spells = context.getAllSpellsDatabase();
if (spells.length < 100) throw Error('Incomplete spell extraction');
const items = { weapons: [...context.meleeWeapons, ...context.heavyWeapons, ...context.rangedWeapons, ...context.specialWeapons], armor: context.defaultArmors, consumables: context.defaultConsumables, materials: context.defaultMaterials, junk: context.defaultJunk };
const clone = x => JSON.parse(JSON.stringify(x));
context.renderInventory = context.renderFolders = context.renderNotes = context.autoSaveCurrentCharacter = context.updateInventoryWeight = () => {};
const inventoryCases = [];
for (const category of Object.keys(items)) {
  const input = { id: `inventory-${category}`, unknown: { keep: true } };
  const item = clone(items[category][0]);
  context.currentChar = context.currentCharacter = clone(input);
  context.addItemToInventory(category, item.name, 1, item);
  context.addItemToInventory(category, item.name, 2, item);
  const stacked = clone(context.currentChar);
  context.addItemToInventory(category, 'Кастомный предмет', 1, { weight: '1,5 кг', unknown: 17 });
  context.removeInventoryItem(category, 0);
  inventoryCases.push({ input, category, item, stacked, removed: clone(context.currentChar) });
}
const weightCases = [null, '', 0, 1, 2.5, '1 фунт', '2 фунта', '3 lbs', '1,5 кг', '10', 'без веса', '0,25 lb'].map(input => ({ input, expected: context.parseWeightToKg(input) }));
const weightHero = { id: 'weight', stats: { str: 12 }, inventory: { weapons: [{ weight: '2 фунта', count: 3 }], materials: [{ weight: '1,5 кг', count: 0.5 }], junk: [{ weight: 1, count: 0 }] } };
context.currentChar = context.currentCharacter = clone(weightHero); elements.str = { value: 12 };
const weightTotal = context.getCurrentInventoryWeightData();
const folderCases = [];
for (const activeFolderId of ['f1', 'f2', 'missing']) {
  const input = { id: 'notes', activeFolderId, folders: [{ id: 'f1', name: 'Удаляемая', notes: [{ id: 1, text: 'Запись' }] }, { id: 'f2', name: 'Остаётся', notes: [{ id: 2, text: 'Не менять' }] }], unknown: 7 };
  context.currentChar = context.currentCharacter = clone(input); context.deleteFolder(null, 'f1'); folderCases.push({ input, expected: clone(context.currentChar) });
}
const noteInput = { id: 'notes-delete', activeFolderId: 'f1', folders: [{ id: 'f1', notes: [{ id: 1, text: 'Удаляется' }, { id: 2, text: 'Остаётся' }] }, { id: 'f2', notes: [{ id: 3, text: 'Другая папка' }] }], unknown: true };
context.currentChar = context.currentCharacter = clone(noteInput); context.deleteNote(0);
const noteCase = { input: noteInput, expected: clone(context.currentChar) };
// Materialize source Builder data; runtime C# consumes data, never JS code.
context.getAllBackgrounds = () => vm.runInContext('dndBackgrounds', context);
const baseStats = Object.fromEntries(context.STATS_CONFIG.map(s => [s.id, 10]));
function seed(race, className, background) {
  context.allCharacters = []; context.saveAllCharacters = () => {}; context.openCharacter = () => {};
  context.CharacterBuilderV2.Wizard.prototype.finishCreate.call({ values: { name: 'Template', stats: clone(baseStats), background }, className, race, choices: [], statMode: 'manual', randomRollsLeft: 5, isNewClass: true, root: { style: {} } });
  const hero = clone(context.allCharacters[0]); delete hero.id; return hero;
}
const neutral = seed(null, '', '');
function delta(hero) { return Object.fromEntries(Object.entries(hero).filter(([key, value]) => JSON.stringify(neutral[key]) !== JSON.stringify(value))); }
function choices(race, cls, bg) { return context.CharacterBuilderV2.collectChoices(race, cls, 1, true, null, { background: bg || '' }).map(c => ({ ...c, options: typeof c.options === 'function' ? c.options() : c.options || [] })); }
const creation = {
  races: context.getAllRaces().map(r => ({ ...r, seed: delta(seed(r, '', '')), choices: choices(r, '', '').filter(c => c.source === 'race') })),
  classes: context.DND_CLASSES_LIST.map(c => ({ ...c, seed: seed(null, c.name, ''), choices: choices(null, c.name, '').filter(c => c.source !== 'race') })),
  backgrounds: context.getAllBackgrounds().map(b => ({ ...b, seed: delta(seed(null, '', b.nameRu || b.name)), choices: choices(null, '', b.nameRu || b.name) })),
  proficiencies: context.PROFICIENCIES_DB
};
for (const cls of creation.classes) {
  const data = context.getClassData(cls.name), features = data && data.progression && data.progression.levels && data.progression.levels[1] && data.progression.levels[1].features || [];
  cls.levelOneFeatures = clone(features);
}
const creationCases = [];
for (const className of ['Воин', 'Волшебник', 'Плут']) {
  const race = context.getAllRaces().find(r => r.id === 'human'), background = context.getAllBackgrounds()[0];
  const picks = choices(race, className, background.nameRu || background.name), answers = {};
  for (const c of picks) { const opts = c.options; const ids = opts.map(o => typeof o === 'string' ? o : o.id || o.name); answers[c.key] = c.type === 'multi' ? ids.slice(0, c.count || 1) : ids[0]; }
  context.allCharacters = []; context.CharacterBuilderV2.Wizard.prototype.finishCreate.call({ values: { name: 'Creation fixture', stats: clone(baseStats), background: background.nameRu || background.name, ...answers }, className, race, choices: picks, statMode: 'manual', randomRollsLeft: 5, isNewClass: true, root: { style: {} } });
  creationCases.push({ className, raceId: race.id, background: background.nameRu || background.name, stats: baseStats, answers, expected: clone(context.allCharacters[0]) });
}
const coinCases = [];
context.Date = class extends Date { constructor(...args) { super(...(args.length ? args : ['2026-10-19T12:34:56'])); } };
function coinCase(action, showPp, showEp, rates, amount, input) {
  const alerts = []; context.alert = message => alerts.push(message);
  for (const key of ['cp', 'sp', 'ep', 'gp', 'pp']) elements['cc_input' + key.toUpperCase()] = { value: String(amount[key] || 0) };
  elements.cc_togglePP = { checked: showPp }; elements.cc_toggleEP = { checked: showEp };
  for (const [key, id] of Object.entries({ pPerG: 'cc_ratePlat', gPerE: 'cc_rateGold', sPerG: 'cc_rateSilver', cPerS: 'cc_rateCopper' })) elements[id] = { value: String(rates[key]) };
  context.currentChar = context.currentCharacter = clone(input); context.applyCoinOperation(action);
  coinCases.push({ action, showPp, showEp, rates, amount, input, accepted: alerts.length === 0, expected: clone(context.currentChar) });
}
const coinHero = { id: 'wallet', coins: { cp: 8, sp: 9, ep: 3, gp: 21, pp: 1 }, coinLog: [], unknown: { keep: 17 }, resources: { untouched: true } };
for (const rates of [{ pPerG: 10, gPerE: 2, sPerG: 10, cPerS: 10 }, { pPerG: 5, gPerE: 3, sPerG: 7, cPerS: 11 }])
  for (const showPp of [true, false]) for (const showEp of [true, false]) for (const action of ['add', 'sub']) coinCase(action, showPp, showEp, rates, { gp: 2, cp: 5 }, coinHero);
const standardRates = { pPerG: 10, gPerE: 2, sPerG: 10, cPerS: 10 };
coinCase('sub', true, true, standardRates, { gp: 100000 }, coinHero);
coinCase('add', true, true, standardRates, {}, coinHero);
coinCase('add', false, false, standardRates, { pp: 1, ep: 1 }, coinHero);
coinCase('add', true, true, standardRates, { cp: 1 }, { ...coinHero, coins: { cp: .5 }, coinLog: Array.from({ length: 25 }, (_, i) => ({ time: '00:00:00', action: 'add', cp: i })) });
const output = path.join(root, 'unity/Assets/Vtt/Resources/CharacterSheet');
fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(path.join(root, 'unity/ContentSources~'), { recursive: true });
fs.writeFileSync(path.join(root, 'unity/ContentSources~/catalog.full.json'), JSON.stringify({ sourceCommit, sources, spells, items, creation }, null, 2) + '\n');
const tests = path.join(root, 'unity/Assets/Vtt/Tests'); fs.mkdirSync(tests, { recursive: true });
fs.writeFileSync(path.join(tests, 'sheet-contract.json'), JSON.stringify({ sourceCommit, sources, skills: context.SKILLS_CONFIG, cases: golden, inventoryCases, weightCases, weightHero, weightTotal, folderCases, noteCase, creationCases, coinCases }, null, 2) + '\n');
console.log(`SHEET_SOURCE_PASS: ${spells.length} spells; ${Object.values(items).flat().length} items; ${golden.length} actual JS formula cases; inventory/notes/weight contracts from main ${sourceCommit}`);

console.log("Run split_workshop_content.py with explicit Content/Assets checkouts to regenerate the minimal player catalog; full snapshot is never a Resources asset.");
