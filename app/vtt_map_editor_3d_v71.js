/**
 * vtt_map_editor_3d_v71.js
 * Новый 3D-прототип редактора карт без внешних ассетов.
 * Software-rendered canvas: сетка, высота клеток, кубы/стены, камера и touch-жесты.
 * Архитектура намеренно отделена от старого battle_board.js.
 */
(function(global){
  'use strict';
  var VERSION='0.1.0';
  var state={
    open:false, cols:20, rows:20, cell:1,
    cells:{}, objects:[],
    camera:{yaw:-0.75,pitch:0.72,distance:18,targetX:9.5,targetY:9.5,targetZ:0},
    gesture:{mode:null,lastX:0,lastY:0,lastDist:0,lastAngle:0},
    tool:'select', selected:null
  };
  var canvas=null,ctx=null,raf=0;

  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function key(x,y){return x+':'+y;}
  function cellHeight(x,y){return Number(state.cells[key(x,y)])||0;}
  function setCellHeight(x,y,h){state.cells[key(x,y)]=clamp(Math.round(h),0,12); if(state.cells[key(x,y)]===0)delete state.cells[key(x,y)];}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  function project(x,y,z){
    var c=state.camera,dx=x-c.targetX,dy=y-c.targetY,dz=z-c.targetZ;
    var cy=Math.cos(c.yaw),sy=Math.sin(c.yaw),cp=Math.cos(c.pitch),sp=Math.sin(c.pitch);
    var rx=dx*cy-dy*sy, ry=dx*sy+dy*cy;
    var depth=ry*sp+dz*cp, sx=rx, sy2=ry*cp-dz*sp;
    var scale=Math.min(canvas.clientWidth,canvas.clientHeight)*0.055*(18/c.distance);
    return {x:canvas.clientWidth/2+sx*scale,y:canvas.clientHeight/2+sy2*scale,depth:depth,scale:scale};
  }
  function poly(points,fill,stroke){
    ctx.beginPath();points.forEach(function(p,i){i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);});ctx.closePath();
    if(fill){ctx.fillStyle=fill;ctx.fill();}
    if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}
  }
  function draw(){
    if(!canvas||!state.open)return;
    var w=canvas.clientWidth,h=canvas.clientHeight;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#0d0f12';ctx.fillRect(0,0,w,h);
    var items=[];
    for(var y=0;y<state.rows;y++)for(var x=0;x<state.cols;x++){
      var z=cellHeight(x,y);
      var p1=project(x,y,z),p2=project(x+1,y,z),p3=project(x+1,y+1,z),p4=project(x,y+1,z);
      items.push({d:(p1.depth+p2.depth+p3.depth+p4.depth)/4,kind:'cell',x:x,y:y,z:z,p:[p1,p2,p3,p4]});
      if(z>0){
        var b1=project(x,y,0),b2=project(x+1,y,0),b3=project(x+1,y+1,0),b4=project(x,y+1,0);
        items.push({d:(b1.depth+b2.depth+b3.depth+b4.depth)/4-0.01,kind:'side',p:[p1,p2,b2,b1]});
        items.push({d:(b2.depth+b3.depth+b4.depth+b1.depth)/4-0.02,kind:'side',p:[p2,p3,b3,b2]});
      }
    }
    state.objects.forEach(function(o){
      var z=cellHeight(o.x,o.y)+Number(o.z||0),s=Number(o.size||.8);
      var a=project(o.x+.1,o.y+.1,z),b=project(o.x+s,o.y+.1,z),c=project(o.x+s,o.y+s,z),d=project(o.x+.1,o.y+s,z);
      var za=project(o.x+.1,o.y+.1,z+s),zb=project(o.x+s,o.y+.1,z+s),zc=project(o.x+s,o.y+s,z+s),zd=project(o.x+.1,o.y+s,z+s);
      items.push({d:(a.depth+b.depth+c.depth+d.depth)/4,kind:'obj',o:o,p:[a,b,c,d],top:[za,zb,zc,zd]});
    });
    items.sort(function(a,b){return a.d-b.d;});
    items.forEach(function(it){
      if(it.kind==='cell'){
        poly(it.p,(it.x+it.y)%2?'#20252b':'#242a31','#59616b');
        if(it.x===0||it.y===0){ctx.strokeStyle='rgba(255,255,255,.08)';}
      }else if(it.kind==='side'){
        poly(it.p,'#14181d','#343b44');
      }else{
        poly([it.p[0],it.p[1],it.top[1],it.top[0]],it.o.color||'#8b5a2b','#111');
        poly([it.p[1],it.p[2],it.top[2],it.top[1]],it.o.color2||'#6f461f','#111');
        poly(it.top,it.o.color||'#a8733a','#111');
        if(it.o.id===state.selected){ctx.strokeStyle='#ffd54f';ctx.lineWidth=3;poly(it.top,null,'#ffd54f');ctx.lineWidth=1;}
      }
    });
    drawHud();
  }
  function drawHud(){
    ctx.fillStyle='rgba(10,10,10,.78)';ctx.fillRect(10,10,Math.min(330,canvas.clientWidth-20),86);
    ctx.fillStyle='#f0d27a';ctx.font='700 14px sans-serif';ctx.fillText('3D РЕДАКТОР КАРТ • '+VERSION,20,31);
    ctx.fillStyle='#bbb';ctx.font='12px sans-serif';
    ctx.fillText('1 палец: выбор  •  2 пальца: камера/zoom/поворот',20,51);
    ctx.fillText('Клетка: '+state.cols+'×'+state.rows+'  •  высота: '+Object.keys(state.cells).length+' кл.',20,69);
    ctx.fillText('Инструмент: '+state.tool,20,87);
  }
  function resize(){if(!canvas)return;var r=canvas.getBoundingClientRect(),d=global.devicePixelRatio||1;canvas.width=Math.max(1,Math.floor(r.width*d));canvas.height=Math.max(1,Math.floor(r.height*d));ctx.setTransform(d,0,0,d,0,0);draw();}
  function screenToCell(px,py){
    var best=null,bestD=1e9;
    for(var y=0;y<state.rows;y++)for(var x=0;x<state.cols;x++){
      var z=cellHeight(x,y),q=project(x+.5,y+.5,z);
      var d=Math.hypot(px-q.x,py-q.y);
      if(d<bestD){bestD=d;best={x:x,y:y};}
    }
    return bestD<Math.max(45,canvas.clientWidth*.12)?best:null;
  }
  function pointerDown(e){
    if(e.pointerType==='mouse'){state.gesture.mode='pan';}
    canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);
    state.gesture.lastX=e.clientX;state.gesture.lastY=e.clientY;
  }
  function pointerMove(e){
    if(state.gesture.mode!=='pan')return;
    var dx=e.clientX-state.gesture.lastX,dy=e.clientY-state.gesture.lastY;
    state.gesture.lastX=e.clientX;state.gesture.lastY=e.clientY;
    state.camera.targetX-=dx/(35/state.camera.distance);state.camera.targetY-=dy/(35/state.camera.distance);draw();
  }
  function pointerUp(e){if(state.gesture.mode==='pan'&&Math.abs(e.clientX-state.gesture.lastX)<8){var p=screenToCell(e.clientX,e.clientY);if(p)selectCell(p.x,p.y);}state.gesture.mode=null;}
  function touchStart(e){
    if(e.touches.length===1){state.gesture.mode='tap';state.gesture.lastX=e.touches[0].clientX;state.gesture.lastY=e.touches[0].clientY;}
    if(e.touches.length>=2){var a=e.touches[0],b=e.touches[1];state.gesture.mode='two';state.gesture.lastDist=Math.hypot(b.clientX-a.clientX,b.clientY-a.clientY);state.gesture.lastAngle=Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX);state.gesture.lastX=(a.clientX+b.clientX)/2;state.gesture.lastY=(a.clientY+b.clientY)/2;}
    e.preventDefault();
  }
  function touchMove(e){
    e.preventDefault();
    if(e.touches.length<2)return;
    var a=e.touches[0],b=e.touches[1],cx=(a.clientX+b.clientX)/2,cy=(a.clientY+b.clientY)/2;
    var dist=Math.hypot(b.clientX-a.clientX,b.clientY-a.clientY),angle=Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX);
    if(state.gesture.mode!=='two'){state.gesture.mode='two';state.gesture.lastDist=dist;state.gesture.lastAngle=angle;state.gesture.lastX=cx;state.gesture.lastY=cy;return;}
    var dd=dist-state.gesture.lastDist,dx=cx-state.gesture.lastX,dy=cy-state.gesture.lastY,da=angle-state.gesture.lastAngle;
    while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;
    state.camera.distance=clamp(state.camera.distance-dd*.025,5,45);
    state.camera.yaw+=da*1.5;
    state.camera.targetX-=dx/(35/state.camera.distance);state.camera.targetY-=dy/(35/state.camera.distance);
    state.camera.pitch=clamp(state.camera.pitch-dy*.003,0.25,1.35);
    state.gesture.lastDist=dist;state.gesture.lastAngle=angle;state.gesture.lastX=cx;state.gesture.lastY=cy;draw();
  }
  function touchEnd(e){
    if(state.gesture.mode==='tap'&&e.changedTouches&&e.changedTouches[0]){
      var t=e.changedTouches[0];if(Math.hypot(t.clientX-state.gesture.lastX,t.clientY-state.gesture.lastY)<12){var p=screenToCell(t.clientX,t.clientY);if(p)selectCell(p.x,p.y);}
    }
    if(!e.touches.length)state.gesture.mode=null;
  }
  function selectCell(x,y){
    state.selected={x:x,y:y};state.tool='select';
    if(state.tool==='select')renderTools();
  }
  function raise(){if(!state.selected)return;setCellHeight(state.selected.x,state.selected.y,cellHeight(state.selected.x,state.selected.y)+1);draw();}
  function lower(){if(!state.selected)return;setCellHeight(state.selected.x,state.selected.y,cellHeight(state.selected.x,state.selected.y)-1);draw();}
  function addCube(){if(!state.selected)return;var id='obj_'+Date.now();state.objects.push({id:id,x:state.selected.x,y:state.selected.y,z:0,size:.8,color:'#8b5a2b'});state.selected=id;draw();}
  function addWall(){if(!state.selected)return;var id='obj_'+Date.now();state.objects.push({id:id,x:state.selected.x,y:state.selected.y,z:0,size:.92,color:'#777',color2:'#555'});state.selected=id;draw();}
  function remove(){if(typeof state.selected==='string'){state.objects=state.objects.filter(function(o){return o.id!==state.selected;});state.selected=null;}else if(state.selected){setCellHeight(state.selected.x,state.selected.y,0);state.selected=null;}draw();}
  function saveMap(){var data={version:1,grid:{cols:state.cols,rows:state.rows,cellSizeFt:5},cells:state.cells,objects:state.objects};try{localStorage.setItem('dnd_vtt_3d_map',JSON.stringify(data));alert('3D-карта сохранена локально.');}catch(e){alert('Не удалось сохранить карту: '+e.message);}}
  function loadMap(){try{var d=JSON.parse(localStorage.getItem('dnd_vtt_3d_map')||'null');if(!d)return alert('Сохранённой 3D-карты пока нет.');state.cols=d.grid.cols;state.rows=d.grid.rows;state.cells=d.cells||{};state.objects=d.objects||[];state.selected=null;draw();}catch(e){alert('Не удалось загрузить карту.');}}
  function reset(){state.cells={};state.objects=[];state.selected=null;draw();}
  function renderTools(){
    var box=document.getElementById('map3dTools');if(!box)return;
    box.innerHTML='<button class="btn-action" onclick="dndMap3DSelect()">👆 Выбор</button><button class="btn-action" onclick="dndMap3DUp()">⬆️ Высота +</button><button class="btn-action" onclick="dndMap3DDown()">⬇️ Высота −</button><button class="btn-action" onclick="dndMap3DCube()">🧱 Куб</button><button class="btn-action" onclick="dndMap3DWall()">🧱 Стена</button><button class="btn-action" style="background:#7f1d1d" onclick="dndMap3DRemove()">🗑 Удалить</button><button class="btn-action" onclick="dndMap3DSave()">💾 Сохранить</button><button class="btn-action" onclick="dndMap3DLoad()">📂 Загрузить</button><button class="btn-action" onclick="dndMap3DReset()">↺ Сбросить</button>';
  }
  function open(){state.open=true;var m=document.getElementById('map3dEditorModal');if(m)m.style.display='flex';canvas=document.getElementById('map3dCanvas');if(!canvas)return;ctx=canvas.getContext('2d');resize();renderTools();draw();}
  function close(){state.open=false;var m=document.getElementById('map3dEditorModal');if(m)m.style.display='none';}
  function init(){
    var modal=document.createElement('div');modal.id='map3dEditorModal';modal.style.cssText='display:none;position:fixed;inset:0;z-index:31000;background:#090a0c;color:#fff;padding:8px;box-sizing:border-box;';
    modal.innerHTML='<div style="height:100%;display:flex;flex-direction:column;background:#11151a;border:1px solid #555;border-radius:12px;overflow:hidden"><div style="display:flex;align-items:center;gap:8px;padding:9px;border-bottom:1px solid #333;flex-wrap:wrap"><strong style="color:#d4af37">🏗️ 3D Редактор карт</strong><span style="color:#888;font-size:.8em">прототип</span><span style="flex:1"></span><button class="btn-action" onclick="dndMap3DClose()" style="background:#b71c1c">✕ Закрыть</button></div><div id="map3dCanvasWrap" style="position:relative;flex:1;min-height:0;overflow:hidden;touch-action:none"><canvas id="map3dCanvas" style="width:100%;height:100%;display:block;touch-action:none"></canvas></div><div id="map3dTools" style="display:flex;gap:6px;flex-wrap:wrap;padding:8px;background:#1a1d21;border-top:1px solid #333;max-height:27vh;overflow:auto"></div></div>';
    document.body.appendChild(modal);
    canvas=document.getElementById('map3dCanvas');
    canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerUp);
    canvas.addEventListener('touchstart',touchStart,{passive:false});canvas.addEventListener('touchmove',touchMove,{passive:false});canvas.addEventListener('touchend',touchEnd,{passive:false});
    global.addEventListener('resize',resize);
    global.dndMap3DOpen=open;global.dndMap3DClose=close;global.dndMap3DSelect=function(){state.tool='select';draw();};global.dndMap3DUp=raise;global.dndMap3DDown=lower;global.dndMap3DCube=addCube;global.dndMap3DWall=addWall;global.dndMap3DRemove=remove;global.dndMap3DSave=saveMap;global.dndMap3DLoad=loadMap;global.dndMap3DReset=reset;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
