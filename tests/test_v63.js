const fs=require('fs'),assert=require('assert');
const s=fs.readFileSync('vtt_character_sheet_v63.js','utf8');
assert(s.includes("VERSION='63.0.0'"));assert(s.includes('DNDCharacterSheetV63'));assert(s.includes('dndV64Open'));assert(s.includes('safe-area-inset-bottom'));assert(s.includes('touch-action:manipulation'));
console.log('V63_CHARACTER_SHEET_TEST_OK');
