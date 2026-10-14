/** Regression: creation seal must be a real image, included at its runtime URL
 * in OTA, and downloaded/verified/activated even if the installed app lacks it.
 * Uses real PNG bytes and the Windows counterpart of the shared OTA protocol.
 */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),cp=require('node:child_process');
const {DesktopWebUpdater}=require('../desktop/update.cjs');
const root=path.resolve(__dirname,'..'),asset='app/assets/ui/character-creation/1790622252250.png';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
async function main(){
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const tag=(html.match(/<img\b[^>]*class="parchment-signature-img"[^>]*>/)||[])[0];assert(tag,'Animated seal must be an img, not an empty span');assert(tag.includes('src="./'+asset+'"'));
 assert(!fs.existsSync(path.join(root,'1790622252250.png')),'Legacy root file must be relocated');
 const bytes=fs.readFileSync(path.join(root,asset));assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(bytes.readUInt32BE(16),1512);assert.equal(bytes.readUInt32BE(20),1512);
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'dnd-signature-'));
 const previousFetch=global.fetch;
 try{
  const manifestPath=path.join(temp,'manifest.json');
  cp.execFileSync(process.platform==='win32'?'python':'python3',[path.join(root,'tools/build_update_manifest.py'),'--base-url','https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/test-sha','--version','74.00.66','--output',manifestPath]);
  const full=JSON.parse(fs.readFileSync(manifestPath));const entry=full.files.find(f=>f.path===asset);assert(entry);assert.equal(entry.bytes,bytes.length);assert.equal(entry.sha256,hash(bytes));assert(!entry.url,'Asset must use the same immutable base URL as app scripts');
  const paths=['index.html','app/update_manager_v2.js','app/character_creation_pergament.js','app/character_creation_pergament.css',asset];
  const files=new Map(paths.map(p=>[p,fs.readFileSync(path.join(root,p))]));const manifest={...full,files:full.files.filter(f=>paths.includes(f.path))};assert.equal(manifest.files.length,paths.length);
  const bundled=path.join(temp,'bundled');fs.mkdirSync(path.join(bundled,'app'),{recursive:true});fs.writeFileSync(path.join(bundled,'index.html'),'<html>old version without seal</html>');fs.writeFileSync(path.join(bundled,'app/update_manager_v2.js'),'/* old */');
  const downloads=[];global.fetch=async url=>{const u=new URL(url);if(u.pathname.endsWith('/updates/stable.json'))return new Response(JSON.stringify(manifest));const rel=decodeURIComponent(u.pathname).split('/test-sha/')[1];downloads.push(rel);return files.has(rel)?new Response(files.get(rel)):new Response('Missing',{status:404});};
  const updater=new DesktopWebUpdater({getPath:()=>path.join(temp,'data'),getVersion:()=> '74.0.65',relaunch(){},exit(){}},bundled);
  const staged=await updater.handle({id:'seal-stage',type:'stage',manifestUrl:'https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/main/updates/stable.json'},()=>{});assert(staged.ok,JSON.stringify(staged));assert(downloads.includes(asset),'Missing asset must actually be fetched');
  const applied=await updater.handle({id:'seal-apply',type:'apply'},()=>{});assert(applied.ok,JSON.stringify(applied));assert.equal(hash(fs.readFileSync(path.join(updater.getWebRoot(),asset))),hash(bytes));assert(fs.readFileSync(path.join(updater.getWebRoot(),'index.html'),'utf8').includes('src="./'+asset+'"'));await updater.bootHealthy();
  console.log('CREATION_SIGNATURE_ASSET_OK: real image, manifest path/size/SHA256 and download from missing file through OTA activation');
 }finally{global.fetch=previousFetch;fs.rmSync(temp,{recursive:true,force:true});}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
