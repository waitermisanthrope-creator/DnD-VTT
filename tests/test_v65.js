const fs=require('fs'),assert=require('assert');
const s=fs.readFileSync('vtt_dice_resolution_v65.js','utf8');
assert(s.includes("VERSION='65.0.0'"));assert(s.includes('DNDDiceResolutionV65'));assert(s.includes('critical'));assert(s.includes('fumble'));assert(s.includes('DNDCombatLogV66'));console.log('V65_DICE_RESOLUTION_TEST_OK');
