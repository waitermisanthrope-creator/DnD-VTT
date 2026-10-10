/* Execute shipped Logo, scene, manager and Settings in their real script order.
 * Native/network/DOM boundaries are controlled; the OTA orchestration is real. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.join(__dirname,'..');
const currentVersion=fs.readFileSync(path.join(root,'app/update_manager_v2.js'),'utf8').match(/APP_VERSION='([^']+)'/)[1];
const nextParts=currentVersion.split('.').map(Number);nextParts[2]++;const nextVersion=nextParts.join('.');
function harness(options={}) {
 const ids={},raf=new Map(),timers=new Map(),nativeListeners=[],requests=[],fetches=[],events={},docEvents={};let serial=0;
 class Element {
  constructor(tag){this.tag=tag;this.style={};this.children=[];this.listeners={};this.classList={add(){},remove(){}};this.textContent='';}
  set innerHTML(html){this.html=html;this.classes={};for(const m of html.matchAll(/class="([^"]+)"/g)){for(const name of m[1].split(' '))this.classes[name]=new Element('div');}}
  querySelector(s){return this.classes&&this.classes[s.slice(1)]||null;}
  appendChild(e){this.children.push(e);if(e.id)ids[e.id]=e;}
  addEventListener(name,fn){(this.listeners[name]||=[]).push(fn);}
  fire(name,event={}){for(const f of this.listeners[name]||[])f({...event,target:event.target||this});}
  remove(){this.removed=true;if(ids[this.id]===this)delete ids[this.id];}
  setAttribute(){} removeAttribute(){}
 }
 const doc={readyState:'loading',documentElement:new Element('html'),head:new Element('head'),body:new Element('body'),getElementById:id=>ids[id]||null,querySelector:()=>null,createElement:tag=>new Element(tag),addEventListener:(n,f)=>(docEvents[n]||=[]).push(f)};
 const manifest={version:options.version||nextVersion,minAppVersion:options.min||'70.26.99',baseUrl:'https://example.test',files:[{path:'index.html',bytes:100,sha256:'a'.repeat(64)}]};
 const ctx={document:doc,console,Date,Math,JSON,Number,Promise,localStorage:{getItem(){return null},setItem(){}},CustomEvent:function(type){this.type=type},alert(){throw Error('unexpected alert')},setTimeout(fn,delay){const id=++serial;timers.set(id,{fn,delay});return id;},clearTimeout(id){timers.delete(id)},requestAnimationFrame(fn){const id=++serial;raf.set(id,fn);return id;},cancelAnimationFrame(id){raf.delete(id)},addEventListener(n,f){(events[n]||=[]).push(f)},dispatchEvent(e){for(const f of events[e.type]||[])f(e)},fetch:async url=>{fetches.push(url);if(options.offline)throw Error('offline');return {ok:true,json:async()=>manifest};}};
 ctx.window=ctx;
 function respond(req,extra){for(const fn of nativeListeners)fn({data:JSON.stringify({id:req.id,ok:true,...extra})});}
 if(!options.browser)ctx.dndNative={addEventListener(n,f){nativeListeners.push(f)},postMessage(raw){const r=JSON.parse(raw);requests.push(r);if(r.type==='version')queueMicrotask(()=>respond(r,{value:'74.00.16'}));}};
 vm.createContext(ctx);
 for(const file of ['Logo.js','update_scene_v2.js','update_manager_v2.js'])vm.runInContext(fs.readFileSync(path.join(root,'app',file),'utf8'),ctx,{filename:file});
 const originalUI=ctx.DND_UPDATE_UI;
 vm.runInContext(fs.readFileSync(path.join(root,'app/Settings.js'),'utf8'),ctx,{filename:'Settings.js'});
 assert.strictEqual(ctx.DND_UPDATE_UI,originalUI,'Settings replaced updater UI');
 // Invoke only manager's DOM-ready hook; unrelated Settings theme handlers need the app.
 docEvents.DOMContentLoaded[0]();
 // Logo mounted immediately because this test DOM has a body; the first ready
 // handler is the manager when Logo does not need deferred mounting.
 const overlay=doc.body.children.find(e=>e.className==='splash-overlay');
 return {ctx,ids,requests,fetches,respond,raf,timers,overlay,manifest,
  async settle(){for(let i=0;i<8;i++){for(const [id,f] of [...raf]){raf.delete(id);f();}await new Promise(setImmediate);}},
  splash(){overlay.fire('dblclick');overlay.fire('transitionend');},
  latest(type){return requests.filter(r=>r.type===type).at(-1);},
  pct(){return ids.dndUpdateV2.querySelector('.pct').textContent;}
 };
}
async function success() {
 const h=harness();await h.settle();assert.equal(h.fetches.length,0,'checked before Logo completed');
 h.splash();await h.settle();assert(h.latest('stage'));assert(!h.latest('apply'));assert(h.ids.dndUpdateV2);assert.equal(h.ids.dndUpdateV2.querySelector('.skip').style.display,'none');
 const same=h.ctx.DND_UPDATE_UI.check();assert.strictEqual(same,h.ctx.DND_UPDATE_UI.openMainMenuUpdate());assert.equal(h.ctx.DND_UPDATE_MANAGER.runSceneTest(),false);
 h.respond(h.latest('stage'),{status:'progress',phase:'download',current:1,total:1,bytesDone:25,bytesTotal:100,path:'index.html'});await h.settle();
 assert(parseInt(h.pct())<30,'file count overrode actual bytes');
 h.respond(h.latest('stage'),{status:'progress',phase:'download',current:1,total:1,bytesDone:100,bytesTotal:100,path:'index.html'});await h.settle();assert(parseInt(h.pct())<=90);assert(!h.latest('apply'),'installed before verified stage success');
 h.respond(h.latest('stage'),{status:'staged',value:h.manifest.version});await h.settle();assert(h.latest('apply'));assert(parseInt(h.pct())<100);
 h.respond(h.latest('apply'),{status:'progress',phase:'apply',current:1,total:1});await h.settle();assert(parseInt(h.pct())<100,'100 before native apply success');
 h.respond(h.latest('apply'),{status:'applied',value:h.manifest.version});const result=await same;assert(result.applyResult);assert.equal(h.pct(),'100%');
 h.ctx.dispatchEvent({type:'dnd:splash-complete'});await h.ctx.DND_UPDATE_UI.check();assert.equal(h.requests.filter(r=>r.type==='stage').length,1);assert.equal(h.requests.filter(r=>r.type==='apply').length,1);
}
async function failure(phase) {
 const h=harness();h.splash();await h.settle();
 if(phase==='apply'){h.respond(h.latest('stage'),{status:'staged',value:h.manifest.version});await h.settle();}
 const p=h.ctx.DND_UPDATE_UI.check();h.respond(h.latest(phase),{ok:false,status:phase+'-failed',value:phase==='stage'?'SHA-256 mismatch':'No staged update'});assert((await p).error);await h.settle();
 assert.equal(h.requests.filter(r=>r.type==='apply').length,phase==='apply'?1:0);assert(parseInt(h.pct())<100);assert.equal(h.ids.dndUpdateV2.querySelector('.skip').style.display,'block');assert.equal(h.ids.dndUpdateV2.querySelector('.retry').style.display,'block');
 h.ids.dndUpdateV2.querySelector('.retry').fire('click');await h.settle();assert.equal(h.requests.filter(r=>r.type==='stage').length,2,'retry did not restart real pipeline');
}
async function edgeCases(){
 for(const options of [{version:currentVersion},{version:'74.00.16'},{min:'99.0.0'},{offline:true},{browser:true}]){
  const h=harness(options);h.splash();await h.settle();assert(!h.latest('stage'));assert(!h.latest('apply'));
  if(options.browser){assert(h.ids.dndUpdateV2.querySelector('.status').textContent.includes('Android'));assert.notEqual(h.pct(),'100%');}else assert(!h.ids.dndUpdateV2,'unneeded startup overlay');
 }
 const h=harness();h.overlay.fire('dblclick');assert.equal(h.ctx.dndSplashFinished,false);
 const fallback=[...h.timers.values()].find(t=>t.delay===650);assert(fallback);fallback.fn();await h.settle();assert(h.latest('stage'),'missing transitionend prevented OTA');
 const stageCount=h.requests.filter(r=>r.type==='stage').length;h.overlay.fire('transitionend');await h.settle();assert.equal(h.requests.filter(r=>r.type==='stage').length,stageCount);
}
(async()=>{await success();await failure('stage');await failure('apply');await edgeCases();console.log('PASS OTA: real load order, post-Logo startup, actual byte progress, verified automatic install, single flight, errors/retry, no update/offline/browser, splash fallback');})().catch(e=>{console.error(e);process.exitCode=1;});
