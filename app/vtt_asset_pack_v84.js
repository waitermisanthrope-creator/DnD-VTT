/* V70.36.84 — portable 3D asset-pack export/import
 * Self-contained offline package: map JSON + referenced IndexedDB GLB/texture binaries.
 * No JSZip/CDN dependency; intended for WebView/Capacitor.
 */
(function(global){
'use strict';

var PACK_FORMAT='dnd-vtt-asset-pack';
var PACK_VERSION=1;
var DB_NAME='dnd_vtt_3d_assets';
var DB_STORE='assets';
var installed=false;

function clone(v){return JSON.parse(JSON.stringify(v));}
function openDB(){
  return new Promise(function(resolve,reject){
    var r=indexedDB.open(DB_NAME,1);
    r.onupgradeneeded=function(){var db=r.result;if(!db.objectStoreNames.contains(DB_STORE))db.createObjectStore(DB_STORE,{keyPath:'id'});};
    r.onsuccess=function(){resolve(r.result);};
    r.onerror=function(){reject(r.error||new Error('IndexedDB error'));};
  });
}
function getAsset(db,id){
  return new Promise(function(resolve,reject){
    var tx=db.transaction(DB_STORE,'readonly'),q=tx.objectStore(DB_STORE).get(id);
    q.onsuccess=function(){resolve(q.result||null);};
    q.onerror=function(){reject(q.error||new Error('Asset read error'));};
  });
}
function putAsset(db,rec){
  return new Promise(function(resolve,reject){
    var tx=db.transaction(DB_STORE,'readwrite');
    tx.objectStore(DB_STORE).put(rec);
    tx.oncomplete=function(){resolve();};
    tx.onerror=function(){reject(tx.error||new Error('Asset write error'));};
  });
}
function bufferToBase64(buf){
  var u=new Uint8Array(buf),chunk=0x8000,out='',i;
  for(i=0;i<u.length;i+=chunk)out+=String.fromCharCode.apply(null,u.subarray(i,Math.min(i+chunk,u.length)));
  return btoa(out);
}
function base64ToBuffer(s){
  var raw=atob(s),u=new Uint8Array(raw.length),i;
  for(i=0;i<raw.length;i++)u[i]=raw.charCodeAt(i);
  return u.buffer;
}
function assetIds(map){
  var ids={},add=function(id){if(id)ids[String(id)]=1;};
  (map.assets||[]).forEach(function(a){add(a&&a.id);});
  (map.objects||[]).forEach(function(o){add(o&&o.assetId);if(o&&typeof o.texture==='string'&&o.texture.indexOf('asset:')===0)add(o.texture.slice(6));});
  Object.keys(map.walls||{}).forEach(function(k){
    var w=map.walls[k]||{};
    ['texture','front','back'].forEach(function(n){
      var s=w[n];
      if(typeof s==='string'&&s.indexOf('asset:')===0)add(s.slice(6));
      else if(s&&typeof s.texture==='string'&&s.texture.indexOf('asset:')===0)add(s.texture.slice(6));
    });
  });
  Object.keys(map.surfaces||{}).forEach(function(k){
    var s=map.surfaces[k];
    if(s&&typeof s.texture==='string'&&s.texture.indexOf('asset:')===0)add(s.texture.slice(6));
  });
  return Object.keys(ids);
}
function downloadText(text,name){
  var blob=new Blob([text],{type:'application/json;charset=utf-8'});
  var url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(url);},30000);
}
async function exportPack(){
  var raw=localStorage.getItem('dnd_vtt_3d_map');
  if(!raw){alert('Нет сохранённой 3D-карты.');return;}
  var map;
  try{map=JSON.parse(raw);}catch(e){alert('Карта повреждена: '+e.message);return;}
  var ids=assetIds(map),db=await openDB(),assets=[],missing=[];
  for(var i=0;i<ids.length;i++){
    var rec=await getAsset(db,ids[i]);
    if(!rec||!rec.buffer){missing.push(ids[i]);continue;}
    assets.push({id:rec.id,meta:clone(rec.meta||{}),bufferBase64:bufferToBase64(rec.buffer)});
  }
  db.close();
  var pack={format:PACK_FORMAT,version:PACK_VERSION,createdAt:new Date().toISOString(),map:map,assets:assets};
  var json=JSON.stringify(pack);
  var stamp=new Date().toISOString().replace(/[:.]/g,'-');
  downloadText(json,'dnd-vtt-'+stamp+'.dndpack.json');
  var note='Пакет экспортирован: '+assets.length+' ассет(ов).';
  if(missing.length)note+=' Не найдены в IndexedDB: '+missing.length+'.';
  alert(note);
}
function askImportFile(){
  var input=document.createElement('input');
  input.type='file';input.accept='.json,.dndpack,.dndpack.json,application/json';
  input.onchange=function(){
    var f=input.files&&input.files[0];if(!f)return;
    if(f.size>150*1024*1024){alert('Пакет слишком большой для безопасного импорта в мобильном WebView (лимит 150 MB).');return;}
    var rd=new FileReader();
    rd.onload=function(){
      importPackText(String(rd.result||''),f.name).catch(function(e){alert('Импорт не выполнен: '+e.message);});
    };
    rd.readAsText(f);
  };
  input.click();
}
async function importPackText(text,name){
  var p;
  try{p=JSON.parse(text);}catch(e){throw new Error('файл не является JSON');}
  if(!p||p.format!==PACK_FORMAT)throw new Error('это не пакет DnD VTT');
  if(Number(p.version)!==PACK_VERSION)throw new Error('неподдерживаемая версия пакета: '+p.version);
  if(!p.map||typeof p.map!=='object')throw new Error('в пакете отсутствует карта');
  if(!Array.isArray(p.assets))throw new Error('в пакете отсутствует список ассетов');
  var ids={};
  p.assets.forEach(function(a){if(a&&a.id)ids[String(a.id)]=1;});
  var referenced=assetIds(p.map),missing=referenced.filter(function(id){return !ids[id];});
  if(missing.length>0)throw new Error('карта ссылается на отсутствующие ассеты: '+missing.length);
  var msg='Импортировать карту «'+String(p.map.name||'Без названия')+'» и '+p.assets.length+' ассет(ов)?\\n\\nСуществующие ассеты с теми же ID будут заменены.';
  if(!confirm(msg))return;
  var db=await openDB(),written=0;
  try{
    for(var i=0;i<p.assets.length;i++){
      var a=p.assets[i];
      if(!a||!a.id||typeof a.bufferBase64!=='string')throw new Error('повреждён ассет №'+(i+1));
      await putAsset(db,{id:String(a.id),meta:a.meta||{},buffer:base64ToBuffer(a.bufferBase64)});
      written++;
    }
  }finally{db.close();}
  localStorage.setItem('dnd_vtt_3d_map',JSON.stringify(p.map));
  alert('Импорт завершён: карта восстановлена, ассетов записано: '+written+'. Откройте 3D-карту заново.');
  try{if(typeof global.dndMap3DOpenReal==='function')global.dndMap3DOpenReal();}catch(e){}
}
function addButtons(modal){
  if(!modal||modal.querySelector('#r3dPackExport'))return;
  var lib=modal.querySelector('#r3dLibrary');if(!lib)return;
  var ex=document.createElement('button');ex.id='r3dPackExport';ex.textContent='📦';ex.title='Экспорт asset-pack';ex.onclick=exportPack;
  var im=document.createElement('button');im.id='r3dPackImport';im.textContent='📥';im.title='Импорт asset-pack';im.onclick=askImportFile;
  lib.parentNode.insertBefore(ex,lib);lib.parentNode.insertBefore(im,ex);
}
function scan(){
  var m=document.getElementById('map3dRealModal');if(m)addButtons(m);
}
function init(){
  if(installed)return;installed=true;scan();
  new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
global.dndVttAssetPack={export:exportPack,importFile:askImportFile,importText:importPackText};
})(window);
