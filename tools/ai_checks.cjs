#!/usr/bin/env node
'use strict';
// Dependency-free regression gate shared by cloud sessions and Actions.
const fs=require('node:fs'),cp=require('node:child_process');
const tests=fs.readdirSync('tests').filter(f=>/^predictor_.*_test\.cjs$/.test(f)).sort().map(f=>'tests/'+f).concat([
 'tests/cloud_sync_test.cjs','tests/creation_signature_asset_test.cjs',
 'tests/desktop_update_contract.cjs','tests/update_ota_flow_test.js',
 'tests/pugilist_combat_test.js','tests/alchemist_combat_test.js',
 'tests/test_class_audit_stage4_runtime.js','tests/ai_automation_test.cjs'
]);
let failed=0;
for(const file of tests){
 if(!fs.existsSync(file)){console.error('Missing required check: '+file);failed++;continue;}
 const r=cp.spawnSync(process.execPath,[file],{stdio:'inherit',timeout:120000});
 if(r.status!==0){failed++;console.error('FAILED '+file+(r.error?' '+r.error.message:''));}
}
console.log(`AI checks: ${tests.length-failed}/${tests.length} suites passed`);
process.exitCode=failed?1:0;
