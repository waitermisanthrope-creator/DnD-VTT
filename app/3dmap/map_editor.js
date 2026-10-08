/* Единый редактор карты. Единственная точка входа: window.DND3DMap.open(). */
(function(g){
'use strict';
let map=null,root=null,canvas=null,mode='2d';
const $=s=>root.querySelector(s);
function css(){return '<style id="dnd3dmap-css">#dnd3dmap{position:fixed;inset:0;background:#111;color:#eee;z-index:10000;font-family:Inter,Arial,sans-serif;display:flex;flex-direction:column}#dnd3dmap .top{display:flex;gap:6px;align-items:center;padding:8px;background:#191919;border-bottom:1px solid #444;overflow:auto}#dnd3dmap button{background:#292929;color:#eee;border:1px solid #555;border-radius:7px;padding:8px 10px;white-space:nowrap}#dnd3dmap button.on{background:#6b4e16;border-color:#c99b3c}#dnd3dmap .body{display:flex;flex:1;min-height:0}#dnd3dmap .side{width:210px;box-sizing:border-box;padding:8px;background:#181818;overflow:auto}#dnd3dmap .stage{flex:1;min-width:0;display:flex;align-items:center;justify-content:center;overflow:auto;background:#0d0d0d}#dnd3dmap canvas{touch-action:none;max-width:100%;max-height:100%}#dnd3dmap .group{border-bottom:1px solid #333;padding:8px 0}.row{display:flex;gap:5px;flex-wrap:wrap}.small{font-size:12px;color:#aaa}#dnd3dmap .danger{background:#5b1c1c}</style>'}
function floorButtons(){return map.floors.map((f,i)=>'<button data-floor="'+i+'" class="'+(i===map.currentFloor?'on':'')+'">'+f.name+'</button>').join('');}
function render(){
 root.innerHTML=css()+'<div class="top"><b>🗺️ Новая карта</b><button data-close>✕ Закрыть</button><button data-mode="2d">2D</button><button data-mode="3d">3D</button><button data-save>💾 Сохранить</button><button data-reset class="danger">Сбросить</button></div><div class="body"><aside class="side"><div class="group"><b>Этажи</b><div class="row">'+floorButtons()+'</div><div class="row" style="margin-top:6px"><button data-floor-add="up">＋ Этаж вверх</button><button data-floor-add="down">＋ Этаж вниз</button><button data-floor-del>− Удалить этаж</button></div></div><div class="group"><b>Размер карты</b><div class="row"><button data-expand="n">+ Север 1</button><button data-expand="s">+ Юг 1</button><button data-expand="w">+ Запад 1</button><button data-expand="e">+ Восток 1</button><button data-shrink="n">− Север 1</button><button data-shrink="s">− Юг 1</button><button data-shrink="w">− Запад 1</button><button data-shrink="e">− Восток 1</button></div><div class="small">'+map.width+' × '+map.height+' клеток</div></div><div class="group"><b>Строительство</b><div class="row"><button data-tool="floor" class="on">Пол</button><button data-tool="void">Пустота</button><button data-tool="wall">Стена</button></div><div class="row"><button data-texture="stone">Камень</button><button data-texture="wood">Дерево</button><button data-texture="grass">Земля</button><button data-texture="water">Вода</button></div><div class="small">Пустая клетка = пустота. В дальнейшем она будет означать падение на нижний этаж.</div></div><div class="group"><b>Состояние</b><div class="small" id="status"></div></div></aside><main class="stage"><canvas id="dnd3dmapCanvas"></canvas></main></div>';
 canvas=$('#dnd3dmapCanvas');bind();draw();
}
function bind(){
 root.querySelector('[data-close]').onclick=close;
 root.querySelector('[data-save]').onclick=()=>{g.DNDMapModel.save(map);status('Карта сохранена');};
 root.querySelector('[data-reset]').onclick=()=>{if(confirm('Сбросить новую карту?')){map=g.DNDMapModel.reset();render();}};
 root.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;render();});
 root.querySelectorAll('[data-floor]').forEach(b=>b.onclick=()=>{map.currentFloor=+b.dataset.floor;render();});
 root.querySelectorAll('[data-floor-add]').forEach(b=>b.onclick=()=>{g.DNDMapModel.addFloor(map,b.dataset.floorAdd);render();});
 root.querySelector('[data-floor-del]').onclick=()=>{g.DNDMapModel.removeFloor(map);render();};
 root.querySelectorAll('[data-expand]').forEach(b=>b.onclick=()=>{g.DNDMapModel.expand(map,b.dataset.expand,1);render();});
 root.querySelectorAll('[data-shrink]').forEach(b=>b.onclick=()=>{g.DNDMapModel.expand(map,b.dataset.shrink,-1);render();});
 root.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{map.selectedTool=b.dataset.tool;root.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('on',x===b));});
 root.querySelectorAll('[data-texture]').forEach(b=>b.onclick=()=>map.selectedTexture=b.dataset.texture);
 canvas.addEventListener('pointerdown',paint);
}
function paint(e){
 if(mode!=='2d')return;
 const r=canvas.getBoundingClientRect(),info=g.DNDMapRenderer2D.draw(canvas,map),x=Math.floor((e.clientX-r.left)/(map.cell*info.scale)),y=Math.floor((e.clientY-r.top)/(map.cell*info.scale));
 if(x<0||y<0||x>=map.width||y>=map.height)return;
 if(map.selectedTool==='wall'){g.DNDMapModel.toggleWall(map,x,y,'e');}
 else g.DNDMapModel.setTile(map,x,y,map.selectedTool==='void'?'void':map.selectedTexture);
 draw();
}
function draw(){if(!canvas)return;if(mode==='2d')g.DNDMapRenderer2D.draw(canvas,map);else{canvas.width=Math.max(320,canvas.parentElement.clientWidth);canvas.height=Math.max(320,canvas.parentElement.clientHeight);g.DNDMapRenderer3D.draw(canvas,map);}}
function status(t){const e=$('#status');if(e)e.textContent=t||('Этаж '+map.currentFloor+' • '+map.width+'×'+map.height);}
function open(){if(root)return;map=g.DNDMapModel.load();root=document.createElement('div');root.id='dnd3dmap';document.body.appendChild(root);render();}
function close(){if(root){root.remove();root=null;canvas=null;}}
g.DND3DMap={open,close,getMap:()=>map};
g.dndMap3DOpen=open;
})(window);