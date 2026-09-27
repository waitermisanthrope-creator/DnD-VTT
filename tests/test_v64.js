const fs=require('fs'),assert=require('assert');
const s=fs.readFileSync('vtt_character_actions_v64.js','utf8');
assert(s.includes("VERSION='64.0.0'"));assert(s.includes('DNDCharacterActionsV64'));assert(s.includes('DNDGameplayV57'));assert(s.includes('dndV64Use'));console.log('V64_CHARACTER_ACTIONS_TEST_OK');
