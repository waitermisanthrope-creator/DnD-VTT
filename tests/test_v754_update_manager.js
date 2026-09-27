/** V70.25.61 — updater contract tests. */
const fs=require('fs'),vm=require('vm'),crypto=require('crypto');
const src=fs.readFileSync(require('path').join(__dirname,'..','app','update_manager.js'),'utf8');
const storage={};
const payload=new TextEncoder().encode('hello updater');
const hash=crypto.createHash('sha256').update(payload).digest('hex');
const ctx={console,crypto:{subtle:crypto.webcrypto.subtle},fetch:async(url)=>{ if(url==='manifest'){ return {ok:true,status:200,json:async()=>({version:'70.25.62',baseUrl:'https://example.invalid/files',files:[{path:'app/test.js',bytes:payload.byteLength,sha256:hash}]})}; } if(url==='https://example.invalid/files/app/test.js'){ return {ok:true,status:200,arrayBuffer:async()=>payload.buffer.slice(payload.byteOffset,payload.byteOffset+payload.byteLength)}; } return {ok:false,status:404,json:async()=>({})}; },localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=String(v),removeItem:k=>delete storage[k]},DND_UPDATE_MANIFEST_URL:''};
ctx.window=ctx;ctx.globalThis=ctx;ctx.__TEST_ASSERT__=(c,m)=>{if(!c)throw new Error(m||'assert');};
vm.createContext(ctx);vm.runInContext(src,ctx,{filename:'update_manager.js'});
const u=ctx.DND_UPDATE_MANAGER;
if(!u) throw new Error('DND_UPDATE_MANAGER missing');
if(u.compareVersions('70.25.9','70.25.10')>=0) throw new Error('version comparison');
if(u.compareVersions('70.25.10','70.25.9')<=0) throw new Error('version comparison');
if(u.compareVersions('70.25.10','70.25.10')!==0) throw new Error('version equality');
u.validateManifest({version:'70.25.61',baseUrl:'https://example.invalid/app',files:[{path:'app/test.js',bytes:1,sha256:'a'.repeat(64)}]});
let rejected=false; try{u.validateManifest({version:'70.25.61',baseUrl:'https://example.invalid',files:[{path:'../evil.js',sha256:'a'.repeat(64)}]});}catch(e){rejected=true;}
if(!rejected) throw new Error('unsafe path accepted');
if(u.getConfig().manifestUrl!=='') throw new Error('unexpected default update URL');
(async()=>{
  u.setManifestUrl('manifest');
  const state=await u.inspect();
  if(!state.updateAvailable) throw new Error('update not detected');
  const staged=await u.stage(state.manifest);
  if(!staged.staged || staged.files.length!==1 || staged.files[0].sha256!==hash) throw new Error('stage verification failed');
  console.log('PASS updater contract');
})().catch(e=>{console.error(e);process.exitCode=1;});
