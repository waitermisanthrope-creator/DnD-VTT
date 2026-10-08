/* Карманный ВТТ — новая карта. Единая модель карты для 2D и 3D. */
(function(g){
  'use strict';
  const KEY='dnd_vtt_3dmap_v1';
  const DEFAULT={version:1,name:'Новая карта',width:12,height:12,cell:64,currentFloor:0,
    floors:[{id:0,name:'Этаж 0',height:3,tiles:{},walls:{},objects:[]}],
    selectedTool:'floor',selectedTexture:'stone',view:'2d'};
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function normalize(m){
    m=m&&typeof m==='object'?m:clone(DEFAULT);
    m.width=Math.max(1,Math.min(200,Number(m.width)||12));
    m.height=Math.max(1,Math.min(200,Number(m.height)||12));
    m.cell=Number(m.cell)||64;m.floors=Array.isArray(m.floors)?m.floors:[];
    if(!m.floors.length)m.floors=[clone(DEFAULT.floors[0])];
    m.floors.forEach((f,i)=>{f.id=Number.isFinite(f.id)?f.id:i;f.name=f.name||('Этаж '+f.id);f.height=Number(f.height)||3;f.tiles=f.tiles||{};f.walls=f.walls||{};f.objects=Array.isArray(f.objects)?f.objects:[];});
    m.currentFloor=Math.max(0,Math.min(m.floors.length-1,Number(m.currentFloor)||0));
    return m;
  }
  function key(x,y){return x+','+y;}
  function load(){try{return normalize(JSON.parse(localStorage.getItem(KEY)||'null'));}catch(e){return clone(DEFAULT);}}
  function save(m){m=normalize(m);localStorage.setItem(KEY,JSON.stringify(m));return m;}
  function reset(){localStorage.removeItem(KEY);return load();}
  function current(m){return m.floors[m.currentFloor]||m.floors[0];}
  function expand(m,dir,amount){
    amount=Math.max(1,Math.abs(Number(amount)||1));
    if(dir==='n'||dir==='s')m.height=Math.max(1,Math.min(200,m.height+amount));
    if(dir==='e'||dir==='w')m.width=Math.max(1,Math.min(200,m.width+amount));
    return m;
  }
  function setTile(m,x,y,type){const f=current(m),k=key(x,y);if(x<0||y<0||x>=m.width||y>=m.height)return;if(type==='void')delete f.tiles[k];else f.tiles[k]=type;}
  function toggleWall(m,x,y,side){const f=current(m),k=key(x,y);f.walls[k]=f.walls[k]||{};f.walls[k][side]=!f.walls[k][side];}
  function addFloor(m,dir){
    const ids=m.floors.map(f=>f.id),id=dir==='up'?(Math.max.apply(null,ids)+1):(Math.min.apply(null,ids)-1);
    const f={id:id,name:'Этаж '+id,height:3,tiles:{},walls:{},objects:[]};
    if(dir==='up')m.floors.push(f);else{m.floors.unshift(f);m.currentFloor++;}
    return m;
  }
  function removeFloor(m){if(m.floors.length<=1)return m;m.floors.splice(m.currentFloor,1);m.currentFloor=Math.max(0,Math.min(m.currentFloor,m.floors.length-1));return m;}
  g.DNDMapModel={KEY,DEFAULT,clone,load,save,reset,current,expand,setTile,toggleWall,addFloor,removeFloor};
})(window);