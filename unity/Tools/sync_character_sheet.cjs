'use strict';
// Executes only local, reviewed data/formula sources in a sandbox. No network.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const cp = require('node:child_process'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const git = (...args) => cp.execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
if (git('branch', '--show-current') !== 'experiment/unity-vtt') throw Error('Experimental branch only');
const sourceCommit = git('rev-parse', 'main');
const files = ['app/app.js', 'app/skills.js', 'app/spells.js', ...[...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="\.\/(app\/data\/spells\/[^"?]+)"/g)].map(m => m[1])];
if (git('diff', 'main', '--', ...files)) throw Error('Sheet sources differ from main; review before regeneration');
const sources = files.map(file => ({ file, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex') }));
const elements = {};
const context = { console, document: { addEventListener() {}, getElementById(id) { return elements[id] || null; } }, addEventListener() {}, setTimeout() {}, clearTimeout() {}, localStorage: { getItem() { return null; } } };
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
const output = path.join(root, 'unity/Assets/Vtt/Resources/CharacterSheet');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'catalog.json'), JSON.stringify({ sourceCommit, sources, spells }, null, 2) + '\n');
const tests = path.join(root, 'unity/Assets/Vtt/Tests'); fs.mkdirSync(tests, { recursive: true });
fs.writeFileSync(path.join(tests, 'sheet-contract.json'), JSON.stringify({ sourceCommit, sources, skills: context.SKILLS_CONFIG, cases: golden }, null, 2) + '\n');
console.log(`SHEET_SOURCE_PASS: ${spells.length} spells; ${golden.length} actual JS formula cases from main ${sourceCommit}`);
