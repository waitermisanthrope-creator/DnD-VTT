#!/usr/bin/env node
/** V70.25.60 unified regression runner.
 * Production sources live under app/; tests live under tests/.
 * Historical tests retain project-root path semantics through a temporary preload.
 */
const fs=require('fs'), vm=require('vm'), cp=require('child_process'), path=require('path'), os=require('os');
const root=path.resolve(__dirname,'..');
const testDir=path.join(root,'tests');
process.chdir(root);

const legacy=new Set(['test_v52.js','test_v53.js','test_v67.js','test_v68.js','test_v715_fixes.js','test_v722_fixes.js','test_v723_fixes.js','test_v724_fixes.js','test_v719_fixes.js','test_v725_fixes.js','test_v707.js','test_v56_2.js']);
const browser={
 'test_v701.js':['vtt_debug_sandbox_v701.js'],
 'test_v702.js':['vtt_debug_sandbox_v701.js','vtt_debug_character_lab_v702.js'],
 'test_v703.js':['vtt_debug_lab_v703.js'],
 'test_v704.js':['vtt_debug_scenarios_v704.js'],
 'test_v705.js':['vtt_debug_scenario_editor_v705.js'],
 'test_v706.js':['vtt_debug_dice_lab_v706.js'],
 'test_v707.js':['vtt_debug_rules_matrix_v707.js']
};

function resolveProjectPath(p){
 const candidates=[p];
 const rel=path.isAbsolute(p)?path.relative(root,p):p;
 const clean=rel.replace(/^\.?[\\/]/,'');
 candidates.push(path.join(root,clean));
 candidates.push(path.join(root,'app',clean));
 candidates.push(path.join(root,'app','data',clean));
 candidates.push(path.join(root,'docs',clean));
 for(const c of [...new Set(candidates)]) if(fs.existsSync(c)) return c;
 return p;
}
function makeFsCompat(){
 const real=require('fs'), compat=Object.create(real);
 compat.readFileSync=(p,...rest)=>real.readFileSync(resolveProjectPath(p),...rest);
 compat.existsSync=(p)=>real.existsSync(resolveProjectPath(p));
 compat.statSync=(p,...rest)=>real.statSync(resolveProjectPath(p),...rest);
 return compat;
}
function browserRun(test,mods){
 const doc={readyState:'complete',_:{},getElementById(id){return this._[id]||null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return {style:{},click(){},appendChild(){},addEventListener(){}}},addEventListener(){},body:{appendChild(e){if(e&&e.id)doc._[e.id]=e;}}};
 const compatFs=makeFsCompat();
 const compatRequire=(id)=>id==='fs'?compatFs:require(id);
 const ctx={console,require:compatRequire,process,setTimeout,clearTimeout,setInterval,clearInterval,Date,Math,JSON,Blob:function(){},URL:{createObjectURL(){return''},revokeObjectURL(){}},document:doc,__TEST_ASSERT__:(c,m)=>{if(!c)throw new Error(m||'assert')},__dirname:root,__filename:path.join(testDir,test)};
 ctx.window=ctx;ctx.globalThis=ctx;
 vm.createContext(ctx);
 mods.forEach(m=>vm.runInContext(fs.readFileSync(path.join(root,'app',m),'utf8'),ctx,{filename:m}));
 vm.runInContext(fs.readFileSync(path.join(testDir,test),'utf8'),ctx,{filename:test});
 return ctx.__TEST_RESULT__||'PASS';
}
const preloadPath=path.join(os.tmpdir(),`dnd-vtt-path-preload-${process.pid}.js`);
fs.writeFileSync(preloadPath,`
const fs=require('fs'),path=require('path');
const ROOT=${JSON.stringify(root)};
const realRead=fs.readFileSync.bind(fs), realExists=fs.existsSync.bind(fs), realStat=fs.statSync.bind(fs);
function resolve(p){
 const c=[p];
 const rel=path.isAbsolute(p)?path.relative(ROOT,p):p;
 const clean=rel.replace(/^\\\\.?[\\\\\\\\/]/,'');
 const cands=[path.join(ROOT,clean),path.join(ROOT,'app',clean),path.join(ROOT,'app','data',clean),path.join(ROOT,'docs',clean)];
 if(clean.startsWith('tests'+path.sep)){ const relTest=clean.slice(6); cands.push(path.join(ROOT,'app',relTest),path.join(ROOT,'app','data',relTest),path.join(ROOT,'docs',relTest)); const maps=[['spellslist','app/data/spells'],['classes','app/data/classes'],['Feats','app/data/feats'],['subclasses','app/data/subclasses']]; for(const [oldDir,newDir] of maps) if(relTest===oldDir || relTest.startsWith(oldDir+path.sep)){ let suffix=relTest.slice(oldDir.length); if(suffix.startsWith(path.sep)) suffix=suffix.slice(1); cands.push(path.join(ROOT,newDir,suffix)); } }
 c.push(...cands);
 for(const x of [...new Set(c)]) if(realExists(x)) return x;
 return p;
}
fs.readFileSync=(p,...a)=>realRead(resolve(p),...a);
fs.existsSync=(p)=>realExists(resolve(p));
fs.statSync=(p,...a)=>realStat(resolve(p),...a);
process.chdir(ROOT);
`);
function nodeRun(test){
 const r=cp.spawnSync(process.execPath,['--require',preloadPath,path.join(testDir,test)],{cwd:root,encoding:'utf8'});
 if(r.status!==0) throw new Error((r.stderr||r.stdout||'').trim());
}
let pass=0,fail=0,legacyCount=0;
const files=fs.readdirSync(testDir).filter(f=>/^test.*\.js$/.test(f)||/_test\.js$/.test(f)).sort();
try{
 for(const f of files){
  if(legacy.has(f)){legacyCount++;console.log('LEGACY',f);continue;}
  try{
   if(browser[f]) console.log('PASS',f,browserRun(f,browser[f]));
   else {nodeRun(f);console.log('PASS',f,'PASS');}
   pass++;
  }catch(e){fail++;console.log('FAIL',f,(e&&e.stack||e).toString().split('\n').slice(0,5).join('\n'));}
 }
} finally { try{fs.unlinkSync(preloadPath)}catch{} }
console.log(`SUMMARY PASS=${pass} FAIL=${fail} LEGACY=${legacyCount}`);
process.exitCode=fail?1:0;
