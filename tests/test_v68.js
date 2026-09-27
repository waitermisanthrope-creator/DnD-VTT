const fs=require('fs'),assert=require('assert');
for(const f of ['vtt_encounter_checkpoint_v68.js','vtt_gameplay_ux_v58.js','vtt_encounter_map_v59.js','vtt_mobile_combat_hud_v62.js']) assert(fs.existsSync(f),`missing ${f}`);
const s=fs.readFileSync('vtt_encounter_checkpoint_v68.js','utf8');
assert(s.includes("VERSION='68.1.0'")); assert(s.includes('DNDEncounterCheckpointV68')); assert(s.includes('initiativeTracker')); assert(s.includes('exportSession')); assert(s.includes('importText')); assert(s.includes('restoreSnapshot'));
const g=fs.readFileSync('vtt_gameplay_ux_v58.js','utf8'); assert(g.includes('restoreSnapshot'));
const e=fs.readFileSync('vtt_encounter_map_v59.js','utf8'); assert(e.includes('restoreSnapshot'));
const idx=fs.readFileSync('index.html','utf8'); assert(idx.includes('vtt_encounter_checkpoint_v68.js'));
const hud=fs.readFileSync('vtt_mobile_combat_hud_v62.js','utf8'); assert(hud.includes('dndV68Open'));
console.log('V68_ENCOUNTER_CHECKPOINT_TEST_OK');
