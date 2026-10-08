/* Карта v2: единая модель, этажи, стены, объекты и перемещение. */
(function(g){'use strict';
const KEY='dnd_vtt_3dmap_v2',DEFAULT={version:2,name:'Новая карта',width:12,height:12,cell:64,currentFloor:0,view:'2d',selectedTool:'floor',selectedTexture:'stone',floors:[{id:0,name:'Этаж 0',height:3,tiles:{},walls:{},objects:[]}],tokens:[]};
function clone(v){return JSON.parse(JSON.stringify(v));} function floor(id){return{id:id,name:'Этаж '+id,height:3,tiles:{},walls:{},objects:[]};}
function normalize(m){m=m&&typeof m==='object'?m:clone(DEFAULT);m.version=2;m.width=Math.max(1,Math.min(200,Number(m.width)||12));m.height=Math.max(1,Math.min(200,Number(m.height)||12));m.cell=Number(m.cell)||64;m.floors=Array.isArray(m.floors)&&m.floors.length?m.floors:[floor(0)];m.floors.forEach(function(f,i){f.id=Number.isFinite(f.id)?f.id:i;f.name=f.name||('Этаж '+f.id);f.height=Math.max(1,Number(f.height)||3);f.tiles=f.tiles||{};f.walls=f.walls||{};f.objects=Array.isArray(f.objects)?f.objects:[];});m.tokens=Array.isArray(m.tokens)?m.tokens:[];m.currentFloor=Math.max(0,Math.min(m.floors.length-1,Number(m.currentFloor)||0));return m;}
function key(x,y){return x+','+y;} function current(m){return m.floors[m.currentFloor];}
function load(){try{return normalize(JSON.parse(localStorage.getItem(KEY)||'null'));}catch(e){return clone(DEFAULT);}} function save(m){m=normalize(m);localStorage.setItem(KEY,JSON.stringify(m));return m;} function reset(){localStorage.removeItem(KEY);return load();}
function resize(m,dir,delta){delta=Math.trunc(Number(delta)||0);if(dir==='n'||dir==='s')m.height=Math.max(1,Math.min(200,m.height+delta));if(dir==='e'||dir==='w')m.width=Math.max(1,Math.min(200,m.width+delta));return m;}
function setTile(m,x,y,type){if(x<0||y<0||x>=m.width||y>=m.height)return;var f=current(m),k=key(x,y);if(type==='void')delete f.tiles[k];else f.tiles[k]=type;}
function wall(m,x,y,side){var f=current(m),k=key(x,y);f.walls[k]=f.walls[k]||{};f.walls[k][side]=!f.walls[k][side];}
function addFloor(m,dir){var ids=m.floors.map(function(f){return f.id;}),id=dir==='up'?Math.max.apply(null,ids)+1:Math.min.apply(null,ids)-1;if(dir==='up')m.floors.push(floor(id));else{m.floors.unshift(floor(id));m.currentFloor++;}return m;}
function removeFloor(m){if(m.floors.length>1){m.floors.splice(m.currentFloor,1);m.currentFloor=Math.max(0,Math.min(m.currentFloor,m.floors.length-1));}return m;}
function addObject(m,o){current(m).objects.push(Object.assign({id:'o'+Date.now()+Math.random().toString(36).slice(2),x:0,y:0,z:0,w:1,d:1,h:1,type:'box',name:'Объект'},o||{}));}
function isSolid(m,x,y,i){var f=m.floors[i];return !!(f&&f.tiles[key(x,y)]);} function canWalk(m,x,y,i){return x>=0&&y>=0&&x<m.width&&y<m.height&&isSolid(m,x,y,i);}
function resolveFall(m,x,y,start){var f=start;while(f>0&&!isSolid(m,x,y,f))f--;return{floor:f,x:x,y:y,fallen:f!==start};}
g.DNDMapModel={KEY:KEY,DEFAULT:DEFAULT,clone:clone,normalize:normalize,load:load,save:save,reset:reset,current:current,key:key,resize:resize,setTile:setTile,wall:wall,addFloor:addFloor,removeFloor:removeFloor,addObject:addObject,isSolid:isSolid,canWalk:canWalk,resolveFall:resolveFall};
})(window);