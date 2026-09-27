'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx={console,Math,Date,JSON,Number,String,Array,Object,parseInt,parseFloat,isFinite,
  localStorage:{getItem(){return null},setItem(){},removeItem(){}},
  document:{readyState:'complete',getElementById(){return null},createElement(){return {style:{},appendChild(){},addEventListener(){}}},body:{appendChild(){}}},
  addEventListener(){},setTimeout,clearTimeout};
ctx.window=ctx;ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('./vtt_debug_rules_matrix_v707.js','utf8'),ctx,{filename:'vtt_debug_rules_matrix_v707.js'});
const api=ctx.DNDRulesMatrixV707;
assert(api&&api.VERSION==='70.7.0','V70.7 Rules Matrix API missing');
const suite=api.buildSuite();
assert.strictEqual(suite.length,16,'Unexpected Rules Matrix suite size');
assert(suite.every(x=>x.pass),'Rules Matrix contains a failing deterministic case');
const report=api.run();
assert.strictEqual(report.pass,16);assert.strictEqual(report.fail,0);
console.log('V70.7 Rules Matrix: 16/16 PASS');
