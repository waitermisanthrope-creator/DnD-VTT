const fs=require('fs'),assert=require('assert');
const s=fs.readFileSync('vtt_combat_log_v66.js','utf8');
assert(s.includes("VERSION='66.0.0'"));assert(s.includes('DNDCombatLogV66'));assert(s.includes('localStorage'));assert(s.includes('dndV66OpenDebug'));assert(s.includes('dndV66Export'));assert(s.includes('dndV66SelfTest'));console.log('V66_COMBAT_LOG_DEBUG_TEST_OK');
