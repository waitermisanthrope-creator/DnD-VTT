/**
 * vtt_map_editor_3d_v71.js
 * Новый 3D-прототип редактора карт без внешних ассетов.
 * Software-rendered canvas: сетка, высота клеток, кубы/стены, камера и touch-жесты.
 * Архитектура намеренно отделена от старого battle_board.js.
 */
(function(global){
  'use strict';
  var VERSION='0.2.0';
  var state={
    open:false, cols:20, rows:20, minLevel:0, maxLevel:0, currentLevel:0, cell:1,
    cells:{}, objects:[], walls:{},
    player:{x:9.5,y:9.5,level:0,yaw:0,pitch:0},
    cameraMode:'editor',
    camera:{yaw:-0.75,pitch:0.72,distance:18,targetX:9.5,targetY:9.5,targetZ:0},
    gesture:{mode:null,lastX:0,lastY:0,lastDist:0,lastAngle:0},
    tool:'select', selected:null
  };
  var canvas=null,ctx=null,raf=0;

  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function key(level,x,y){return level+':'+x+':'+y;}
  function cellHeight(x,y,level){level=level==null?state.currentLevel:level;return Number(state.cells[key(level,x,y)])||0;}
  function setCellHeight(x,y,h,level){level=level==null?state.currentLevel:level;var k=key(level,x,y),v=clamp(Math.round(h),0,12);if(v===0)delete state.cells[k];else state.cells[k]=v;}
  function levelLabel(n){return n===0?'0':(n>0?'+'+n:String(n));}
  function mapHeight(){return Math.max(1,state.maxLevel-state.minLevel+1);}
  function normalizeLevels(){state.minLevel=Math.min(0,Math.floor(Number(state.minLevel)||0));state.maxLevel=Math.max(0,Math.floor(Number(state.maxLevel)||0));state.currentLevel=clamp(Math.floor(Number(state.currentLevel)||0),state.minLevel,state.maxLevel);}
  function makeNewMap(cols,rows,height,depth){state.cols=clamp(Math.floor(Number(cols)||20),1,200);state.rows=clamp(Math.floor(Number(rows)||20),1,200);state.minLevel=-clamp(Math.floor(Number(depth)||0),0,50);state.maxLevel=clamp(Math.floor(Number(height)||1),1,50)-1;state.currentLevel=0;state.cells={};state.objects=[];state.walls={};state.player={x:(state.cols-1)/2,y:(state.rows-1)/2,level:0,yaw:0,pitch:0};state.cameraMode='editor';state.selected=null;state.camera.targetX=(state.cols-1)/2;state.camera.targetY=(state.rows-1)/2;state.camera.targetZ=0;draw();renderLevelBar();positionBoundaryButtons();}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  function project(x,y,z){
    var c=state.camera,dx=x-c.targetX,dy=y-c.targetY,dz=z-c.targetZ;
    var cy=Math.cos(c.yaw),sy=Math.sin(c.yaw),cp=Math.cos(c.pitch),sp=Math.sin(c.pitch);
    var rx=dx*cy-dy*sy, ry=dx*sy+dy*cy;
    var depth=ry*sp+dz*cp, sx=rx, sy2=ry*cp-dz*sp;
    var scale=Math.min(canvas.clientWidth,canvas.clientHeight)*0.055*(18/c.distance);
    return {x:canvas.clientWidth/2+sx*scale,y:canvas.clientHeight/2+sy2*scale,depth:depth,scale:scale};
  }
  function wallKey(level,x,y,dir){return level+':'+x+':'+y+':'+dir;}
  function setWall(x,y,dir,enabled,level){level=level==null?state.currentLevel:level;var k=wallKey(level,x,y,dir);if(enabled)state.walls[k]={level:level,x:x,y:y,dir:dir,height:2.5};else delete state.walls[k];}
  function wallHeight(w){return Math.max(0,Number(w.height)||2.5);}
  function wallQuad(w){var z=cellHeight(w.x,w.y,w.level);var h=wallHeight(w),t=.09, x=w.x,y=w.y;
    if(w.dir==='n'||w.dir==='s'){var yy=w.dir==='n'?y:y+1;return [project(x,yy,z),project(x+1,yy,z),project(x+1,yy,z+h),project(x,yy,z+h)];}
    var xx=w.dir==='w'?x:x+1;return [project(xx,y,z),project(xx,y+1,z),project(xx,y+1,z+h),project(xx,y,z+h)];
  }
  function addWallEdge(dir){if(!state.selected||typeof state.selected==='string')return;var x=state.selected.x,y=state.selected.y;var enabled=!!state.walls[wallKey(state.currentLevel,x,y,dir)];setWall(x,y,dir,!enabled);draw();}
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
    Object.keys(state.walls).forEach(function(k){var w=state.walls[k];if(Number(w.level)!==state.currentLevel)return;var q=wallQuad(w);items.push({d:(q[0].depth+q[1].depth+q[2].depth+q[3].depth)/4,kind:'wall',w:w,p:q});});
    state.objects.forEach(function(o){
      if(Number(o.level||0)!==state.currentLevel)return;var z=cellHeight(o.x,o.y,state.currentLevel)+Number(o.z||0),s=Number(o.size||.8);
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
      }else if(it.kind==='wall'){
        poly(it.p,'#777','#222');
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
    ctx.fillText('Размер: '+state.cols+'×'+state.rows+'  •  уровни: '+levelLabel(state.minLevel)+'…'+levelLabel(state.maxLevel),20,69);ctx.fillText('Текущий уровень: '+levelLabel(state.currentLevel)+'  •  высотных клеток: '+Object.keys(state.cells).length,20,87);
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
  function addCube(){if(!state.selected||typeof state.selected==='string')return;var id='obj_'+Date.now();state.objects.push({id:id,x:state.selected.x,y:state.selected.y,level:state.currentLevel,z:0,size:.8,color:'#8b5a2b'});state.selected=id;draw();}
  function addWall(){if(!state.selected||typeof state.selected==='string')return;var id='obj_'+Date.now();state.objects.push({id:id,x:state.selected.x,y:state.selected.y,level:state.currentLevel,z:0,size:.92,color:'#777',color2:'#555'});state.selected=id;draw();}
  function remove(){if(typeof state.selected==='string'){state.objects=state.objects.filter(function(o){return o.id!==state.selected;});state.selected=null;}else if(state.selected){setCellHeight(state.selected.x,state.selected.y,0);state.selected=null;}draw();}
  function setCameraMode(mode){mode=String(mode||'editor');if(['editor','firstPerson','thirdPerson'].indexOf(mode)<0)mode='editor';state.cameraMode=mode;draw();}
  function setPlayerPosition(x,y,level){state.player.x=clamp(Number(x)||0,0,Math.max(0,state.cols-1));state.player.y=clamp(Number(y)||0,0,Math.max(0,state.rows-1));state.player.level=clamp(Math.floor(Number(level)||0),state.minLevel,state.maxLevel);state.currentLevel=state.player.level;state.camera.targetX=state.player.x;state.camera.targetY=state.player.y;state.camera.targetZ=state.player.level;draw();renderLevelBar();}
  function movePlayer(dx,dy,dz){state.player.x=clamp(state.player.x+Number(dx||0),0,Math.max(0,state.cols-1));state.player.y=clamp(state.player.y+Number(dy||0),0,Math.max(0,state.rows-1));state.player.level=clamp(state.player.level+Math.floor(Number(dz)||0),state.minLevel,state.maxLevel);state.currentLevel=state.player.level;state.camera.targetX=state.player.x;state.camera.targetY=state.player.y;state.camera.targetZ=state.player.level;draw();renderLevelBar();}
  function rotatePlayer(dYaw,dPitch){state.player.yaw+=Number(dYaw||0);state.player.pitch=clamp(state.player.pitch+Number(dPitch||0),-1.45,1.45);draw();}
  function getPlayerState(){return {x:state.player.x,y:state.player.y,level:state.player.level,yaw:state.player.yaw,pitch:state.player.pitch,cameraMode:state.cameraMode};}
  function saveMap(){var data={version:4,grid:{cols:state.cols,rows:state.rows,cellSizeFt:5},levels:{min:state.minLevel,max:state.maxLevel,current:state.currentLevel},cells:state.cells,objects:state.objects,walls:state.walls,player:{x:state.player.x,y:state.player.y,level:state.player.level,yaw:state.player.yaw,pitch:state.player.pitch},cameraMode:state.cameraMode};try{localStorage.setItem('dnd_vtt_3d_map',JSON.stringify(data));alert('3D-карта сохранена локально.');}catch(e){alert('Не удалось сохранить карту: '+e.message);}}
  function loadMap(){try{var d=JSON.parse(localStorage.getItem('dnd_vtt_3d_map')||'null');if(!d)return alert('Сохранённой 3D-карты пока нет.');state.cols=clamp(Number(d.grid&&d.grid.cols)||20,1,200);state.rows=clamp(Number(d.grid&&d.grid.rows)||20,1,200);if(d.version>=2&&d.levels){state.minLevel=Number(d.levels.min)||0;state.maxLevel=Number(d.levels.max)||0;state.currentLevel=Number(d.levels.current)||0;state.cells=d.cells||{};state.objects=(d.objects||[]).map(function(o){if(o.level==null)o.level=0;return o;});state.walls=d.walls||{};state.player={x:(d.player&&Number(d.player.x))||((state.cols-1)/2),y:(d.player&&Number(d.player.y))||((state.rows-1)/2),level:(d.player&&Number(d.player.level))||0,yaw:(d.player&&Number(d.player.yaw))||0,pitch:(d.player&&Number(d.player.pitch))||0};state.cameraMode=['editor','firstPerson','thirdPerson'].indexOf(d.cameraMode)>=0?d.cameraMode:'editor';}else{state.minLevel=0;state.maxLevel=0;state.currentLevel=0;var oldCells=d.cells||{};state.cells={};Object.keys(oldCells).forEach(function(k){var p=k.split(':');if(p.length===2)state.cells[key(0,Number(p[0]),Number(p[1]))]=oldCells[k];});state.objects=(d.objects||[]).map(function(o){o.level=0;return o;});state.walls={};}normalizeLevels();state.player.level=clamp(state.player.level,state.minLevel,state.maxLevel);state.currentLevel=state.player.level;state.camera.targetX=state.player.x;state.camera.targetY=state.player.y;state.camera.targetZ=state.player.level;state.selected=null;draw();renderLevelBar();positionBoundaryButtons();}catch(e){alert('Не удалось загрузить карту.');}}
  function reset(){makeNewMap(20,20,1,0);setPlayerPosition(9.5,9.5,0);}
  function expand(dir){
    if(dir==='left'){var copy={};Object.keys(state.cells).forEach(function(k){var p=k.split(':');if(p.length===3){p[1]=Number(p[1])+1;copy[p.join(':')]=state.cells[k];delete state.cells[k];}});Object.keys(copy).forEach(function(k){state.cells[k]=copy[k];});state.objects.forEach(function(o){o.x++;});state.cols++;}
    if(dir==='right')state.cols++;
    if(dir==='top'){var copy2={};Object.keys(state.cells).forEach(function(k){var p=k.split(':');if(p.length===3){p[2]=Number(p[2])+1;copy2[p.join(':')]=state.cells[k];delete state.cells[k];}});Object.keys(copy2).forEach(function(k){state.cells[k]=copy2[k];});state.objects.forEach(function(o){o.y++;});state.rows++;}
    if(dir==='bottom')state.rows++;
    if(dir==='up'){state.maxLevel++;state.currentLevel=state.maxLevel;state.player.level=state.currentLevel;}
    if(dir==='down'){state.minLevel--;state.currentLevel=state.minLevel;state.player.level=state.currentLevel;}
    state.camera.targetX=(state.cols-1)/2;state.camera.targetY=(state.rows-1)/2;draw();renderLevelBar();positionBoundaryButtons();
  }
  function switchLevel(level){level=Number(level);if(level<state.minLevel||level>state.maxLevel)return;state.currentLevel=level;state.player.level=level;state.selected=null;state.camera.targetZ=level;draw();renderLevelBar();positionBoundaryButtons();}
  function dimensionRow(id,label,val,min,max){return '<label style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin:8px 0;color:#ddd"><span>'+label+'</span><span><button type="button" class="btn-action" onclick="dndMap3DDim(&quot;'+id+'&quot;,-1,'+min+','+max+')">−</button><input id="'+id+'" type="number" min="'+min+'" max="'+max+'" value="'+val+'" style="width:64px;text-align:center;padding:6px;background:#0e1013;color:#fff;border:1px solid #555;border-radius:6px"><button type="button" class="btn-action" onclick="dndMap3DDim(&quot;'+id+'&quot;,1,'+min+','+max+')">+</button></span></label>';}
  function dim(id,delta,min,max){var e=document.getElementById(id);if(e)e.value=clamp((Number(e.value)||min)+delta,min,max);}
  function newMapDialog(){var old=document.getElementById('map3dNewMap');if(old)old.remove();var m=document.createElement('div');m.id='map3dNewMap';m.style.cssText='position:fixed;inset:0;z-index:32000;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;';m.innerHTML='<div style="width:min(440px,100%);background:#171a1f;border:1px solid #6b5527;border-radius:12px;padding:18px;box-sizing:border-box"><h3 style="margin:0 0 12px;color:#e0b65a">🗺️ Новая 3D-карта</h3><div style="font-size:12px;color:#aaa">Высота и глубина — уровни. Уровень 0 — земля.</div>'+dimensionRow('map3dLen','Длина',state.cols,1,200)+dimensionRow('map3dWid','Ширина',state.rows,1,200)+dimensionRow('map3dHei','Высота',mapHeight(),1,50)+dimensionRow('map3dDep','Глубина',-state.minLevel,0,50)+'<div style="display:flex;gap:8px;margin-top:14px"><button class="btn-action" onclick="dndMap3DCreateFromDialog()">Создать</button><button class="btn-action" onclick="document.getElementById(&quot;map3dNewMap&quot;).remove()">Отмена</button></div></div>';document.body.appendChild(m);}
  function createFromDialog(){var m=document.getElementById('map3dNewMap');if(!m)return;makeNewMap(document.getElementById('map3dLen').value,document.getElementById('map3dWid').value,document.getElementById('map3dHei').value,document.getElementById('map3dDep').value);m.remove();}
  function renderLevelBar(){var box=document.getElementById('map3dLevels');if(!box)return;var h='<span style="color:#aaa;margin-right:4px">Уровень:</span>';for(var l=state.minLevel;l<=state.maxLevel;l++)h+='<button class="btn-action" style="padding:5px 9px;'+(l===state.currentLevel?'background:#8a641b;border-color:#e0b65a':'')+'" onclick="dndMap3DLevel('+l+')">'+levelLabel(l)+'</button>';box.innerHTML=h;}
  function boundaryButton(id,title,handler){var wrap=document.getElementById('map3dCanvasWrap');if(!wrap)return;var b=document.getElementById(id);if(!b){b=document.createElement('button');b.id=id;b.type='button';b.textContent='+';b.title=title;b.style.cssText='position:absolute;width:36px;height:36px;border-radius:50%;border:1px solid #e0b65a;background:#8a641b;color:#fff;font-size:24px;font-weight:700;line-height:30px;z-index:20;box-shadow:0 3px 10px #0008;padding:0;touch-action:manipulation;';b.onclick=handler;wrap.appendChild(b);}}
  function positionBoundaryButtons(){if(!canvas||!state.open)return;var rect=canvas.getBoundingClientRect(),pts=[project(0,0,0),project(state.cols,0,0),project(state.cols,state.rows,0),project(0,state.rows,0)];function pos(id,p,dx,dy){var b=document.getElementById(id);if(b){b.style.left=(p.x-rect.left+dx-18)+'px';b.style.top=(p.y-rect.top+dy-18)+'px';}}pos('map3dPlusLeft',pts[0],-12,0);pos('map3dPlusRight',pts[2],12,0);pos('map3dPlusTop',pts[1],0,-12);pos('map3dPlusBottom',pts[3],0,12);var up=document.getElementById('map3dPlusUp'),down=document.getElementById('map3dPlusDown'),a=project(state.cols/2,0,0),b=project(state.cols/2,state.rows,0);if(up){up.style.left=(a.x-rect.left-18)+'px';up.style.top=(a.y-rect.top-52)+'px';}if(down){down.style.left=(b.x-rect.left-18)+'px';down.style.top=(b.y-rect.top+16)+'px';}}
  function createBoundaryButtons(){boundaryButton('map3dPlusLeft','Увеличить длину слева',function(){expand('left');});boundaryButton('map3dPlusRight','Увеличить длину справа',function(){expand('right');});boundaryButton('map3dPlusTop','Увеличить ширину сверху',function(){expand('top');});boundaryButton('map3dPlusBottom','Увеличить ширину снизу',function(){expand('bottom');});boundaryButton('map3dPlusUp','Добавить уровень вверх',function(){expand('up');});boundaryButton('map3dPlusDown','Добавить подземный уровень',function(){expand('down');});}
  function renderTools(){
    var box=document.getElementById('map3dTools');if(!box)return;
    box.innerHTML='<button class="btn-action" onclick="dndMap3DNew()">🗺️ Новая карта</button><button class="btn-action" onclick="dndMap3DSelect()">👆 Выбор</button><button class="btn-action" onclick="dndMap3DUp()">⬆️ Высота +</button><button class="btn-action" onclick="dndMap3DDown()">⬇️ Высота −</button><button class="btn-action" onclick="dndMap3DCube()">🧱 Куб</button><button class="btn-action" onclick="dndMap3DWall()">🧱 Стена</button><button class="btn-action" style="background:#7f1d1d" onclick="dndMap3DRemove()">🗑 Удалить</button><button class="btn-action" onclick="dndMap3DSave()">💾 Сохранить</button><button class="btn-action" onclick="dndMap3DLoad()">📂 Загрузить</button><button class="btn-action" onclick="dndMap3DReset()">↺ Сбросить</button>';
  }
  function open(){state.open=true;var m=document.getElementById('map3dEditorModal');if(m)m.style.display='flex';canvas=document.getElementById('map3dCanvas');if(!canvas)return;ctx=canvas.getContext('2d');resize();renderTools();renderLevelBar();createBoundaryButtons();draw();positionBoundaryButtons();}
  function close(){state.open=false;var m=document.getElementById('map3dEditorModal');if(m)m.style.display='none';}
  function init(){
    var modal=document.createElement('div');modal.id='map3dEditorModal';modal.style.cssText='display:none;position:fixed;inset:0;z-index:31000;background:#090a0c;color:#fff;padding:8px;box-sizing:border-box;';
    modal.innerHTML='<div style="height:100%;display:flex;flex-direction:column;background:#11151a;border:1px solid #555;border-radius:12px;overflow:hidden"><div style="display:flex;align-items:center;gap:8px;padding:9px;border-bottom:1px solid #333;flex-wrap:wrap"><strong style="color:#d4af37">🏗️ 3D Редактор карт</strong><span style="color:#888;font-size:.8em">прототип</span><span style="flex:1"></span><button class="btn-action" onclick="dndMap3DClose()" style="background:#b71c1c">✕ Закрыть</button></div><div id="map3dCanvasWrap" style="position:relative;flex:1;min-height:0;overflow:hidden;touch-action:none"><canvas id="map3dCanvas" style="width:100%;height:100%;display:block;touch-action:none"></canvas><div id="map3dLevels" style="position:absolute;left:10px;bottom:10px;z-index:21;display:flex;gap:4px;flex-wrap:wrap;max-width:75%"></div></div><div id="map3dTools" style="display:flex;gap:6px;flex-wrap:wrap;padding:8px;background:#1a1d21;border-top:1px solid #333;max-height:27vh;overflow:auto"></div></div>';
    document.body.appendChild(modal);
    canvas=document.getElementById('map3dCanvas');
    canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerUp);
    canvas.addEventListener('touchstart',touchStart,{passive:false});canvas.addEventListener('touchmove',touchMove,{passive:false});canvas.addEventListener('touchend',touchEnd,{passive:false});
    global.addEventListener('resize',resize);
    global.dndMap3DOpen=open;global.dndMap3DClose=close;global.dndMap3DSetCameraMode=setCameraMode;global.dndMap3DSetPlayerPosition=setPlayerPosition;global.dndMap3DMovePlayer=movePlayer;global.dndMap3DRotatePlayer=rotatePlayer;global.dndMap3DGetPlayerState=getPlayerState;global.dndMap3DNew=newMapDialog;global.dndMap3DCreateFromDialog=createFromDialog;global.dndMap3DDim=dim;global.dndMap3DLevel=switchLevel;global.dndMap3DSelect=function(){state.tool='select';draw();};global.dndMap3DUp=raise;global.dndMap3DDown=lower;global.dndMap3DCube=addCube;global.dndMap3DWall=addWall;global.dndMap3DWallDir=addWallEdge;global.dndMap3DRemove=remove;global.dndMap3DSave=saveMap;global.dndMap3DLoad=loadMap;global.dndMap3DReset=reset;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
