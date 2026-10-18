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
const output = path.join(root, 'unity/Assets/Vtt/Resources/CharacterSheet');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'catalog.json'), JSON.stringify({ sourceCommit, sources, spells, items }, null, 2) + '\n');
const tests = path.join(root, 'unity/Assets/Vtt/Tests'); fs.mkdirSync(tests, { recursive: true });
fs.writeFileSync(path.join(tests, 'sheet-contract.json'), JSON.stringify({ sourceCommit, sources, skills: context.SKILLS_CONFIG, cases: golden, inventoryCases, weightCases, weightHero, weightTotal, folderCases, noteCase }, null, 2) + '\n');
console.log(`SHEET_SOURCE_PASS: ${spells.length} spells; ${Object.values(items).flat().length} items; ${golden.length} actual JS formula cases; inventory/notes/weight contracts from main ${sourceCommit}`);
