/* V70.37.18 — этажность, пустоты пола, размер карты и редакторские инструменты
 * V70.37.14 — removed experimental wall/floor/finish controls; reset for clean rebuild
 * V70.37.12 — right-side popup system for all editor panels
 * V70.37.08 — editor controls, room perimeter, cutaway scope + toolbar hit-testing
 * V70.37.07 — compact Sims bar + real selection orbit camera
 * V70.36.91 — Sims-style build camera, cutaway walls and floor controls
 * V70.36.90 — OTA release
 * V70.36.89 — local ES-module WebView loader\n * V70.36.85 — Sims-style cutaway camera walls\n * V70.36.81 — GLB placement and async build race hardening
 * V70.36.80 — multi-selection and mass material finishing
 * V70.36.79 — touch paint brush for mobile finishing
 * V70.36.78 — editor stabilization: fill, openings, asset drag/drop
 * V70.36.77 — Sims-like UX + texture asset library
 * V70.36.75 — true WebGL 3D map editor
 * Three.js renderer + GLB/GLTF loading. Reads the existing V15 map format from localStorage.
 * The legacy canvas editor remains available as fallback.
 */
(function(global){
'use strict';
var THREE=null,GLTFLoader=null,renderer=null,scene=null,camera=null,root=null,gizmo=null,gizmoAxis=null,gizmoDragging=false,gizmoStartX=0,gizmoStartY=0,gizmoStartPos=null,gizmoStartRot=0,gizmoStartScale=null,raf=0,map=null,selected=null,mode='orbit',editorMode='build',transformMode='translate',raycaster=null,mouse=null,assetDB=null,assetCache={},controls={yaw:.8,pitch:.8,distance:24,target:{x:0,y:0,z:0}},touches={},touchGesture=null,snapGrid=true,snapSize=0.25;
var VERSION='V70.37.18';
// Разрез — только ручной инструмент редактора. По умолчанию стены всегда цельные.
var cutawayWalls=false,cutawayTick=0;
var undoStack=[],redoStack=[],historyBusy=false;
var openingDrag=null,roomPreview=null,wallDrag=null,selectedItems=[],buildGeneration=0,lastScenePoint=null,pendingLibraryAsset=null,paintMode=false,painting=false,paintHistoryStarted=false,paintMaterial='stone',paintSide='front',paintedDuringStroke={},roomToolArmed=false,wallToolArmed=false,floorToolArmed=false,floorDrawActive=false,lastFloorCell=null,simpleToolsRefresh=null;
function openingForSelected(){var w=selectedWall();return w&&w.opening?w.opening:null;}
function openingHit(ev){
 if(editorMode!=='build')return null;
 var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true);
 for(var i=0;i<hits.length;i++){var o=hits[i].object;if(o&&o.userData&&o.userData.mapOpening)return o;}
 return null;
}
function beginOpeningDrag(ev){
 var hit=openingHit(ev);if(!hit)return false;
 var wk=hit.userData.wallKey;if(!wk||!map||!map.walls||!map.walls[wk])return false;
 var w=map.walls[wk],gp=sceneGroundPoint(ev);if(!gp)return false;
 selected=hit;selectedItems=[hit];updateInfo();
 openingDrag={key:wk,startX:gp.x,startY:gp.z,oldOffset:Number(w.opening&&w.opening.offset)||0,dir:w.dir||'n',changed:false};
 return true;
}
function updateOpeningDrag(ev){
 if(!openingDrag||!map||!map.walls)return;
 var w=map.walls[openingDrag.key],op=w&&w.opening;if(!w||!op)return;
 var gp=sceneGroundPoint(ev);if(!gp)return;
 var delta=openingDrag.dir==='n'?gp.x-openingDrag.startX:gp.z-openingDrag.startY;
 var max=Math.max(0,(Number(w.length)||1)-(Number(op.width)||.9));
 var next=Math.max(0,Math.min(max,openingDrag.oldOffset+delta));
 if(snapGrid)next=Math.round(next/snapSize)*snapSize;
 if(Math.abs(next-(Number(op.offset)||0))<.001)return;
 op.offset=next;openingDrag.changed=true;build();updateInfo();
}
function finishOpeningDrag(){
 if(!openingDrag)return;
 if(openingDrag.changed){pushHistory();saveMap();build();updateInfo();}
 openingDrag=null;
}
function moveOpeningAlongWall(delta){var w=selectedWall(),op=openingForSelected();if(!w||!op)return;pushHistory();op.offset=Math.max(0,Math.min(Math.max(.01,Number(w.length)||1)-Number(op.width||.9),Number(op.offset||0)+delta));saveMap();build();updateInfo();}
function addOpeningVisuals(w){
 var op=w.opening;if(!op)return;
 var h=Math.max(.5,Number(w.height)||2.5),len=Math.max(.1,Number(w.length)||1),t=Math.max(.03,Number(w.thickness)||.09),levelY=(Number(w.level)||0)*3,x=Number(w.x)||0,y=Number(w.y)||0;
 var ow=Math.min(len,Math.max(.1,Number(op.width)||.9)),oh=Math.min(h,Math.max(.1,Number(op.height)||2.1)),sill=Math.max(0,Math.min(h-oh,Number(op.sill)||0)),off=Math.max(0,Math.min(len-ow,Number(op.offset)||0));
 var mat=material(op.type==='door'?'#6b4528':'#7fa8c7',op.type==='door'?.7:.25),frame=material('#3b3027',.55);
 if(w.dir==='n'){
   if(op.type==='door'){
     var leaf=addBox('door:'+w.level+':'+x+':'+y,x+off,levelY+sill,y-t*.65,ow,oh,.055,[mat]);leaf.userData.editorKind='object';leaf.userData.mapOpening=true;leaf.userData.wallKey=wallKey(Number(w.level)||0,x,y);
   }else{
     var glass=addBox('window:'+w.level+':'+x+':'+y,x+off,levelY+sill,y-t*.65,ow,oh,.05,[mat]);glass.userData.editorKind='object';glass.userData.mapOpening=true;glass.userData.wallKey=wallKey(Number(w.level)||0,x,y);
     var f1=addBox('windowFrame:'+x+':'+y,x+off,levelY+sill,y-t*.7,.06,oh,.08,[frame]);f1.userData.editorKind='object';
     var f2=addBox('windowFrame:'+x+':'+y,x+off+ow-.06,levelY+sill,y-t*.7,.06,oh,.08,[frame]);f2.userData.editorKind='object';
   }
 }else{
   if(op.type==='door'){
     var leaf2=addBox('door:'+w.level+':'+x+':'+y,x+1-t*.65,levelY,y+off,.055,oh,ow,[mat]);leaf2.userData.editorKind='object';leaf2.userData.mapOpening=true;leaf2.userData.wallKey=wallKey(Number(w.level)||0,x,y);
   }else{
     var glass2=addBox('window:'+w.level+':'+x+':'+y,x+1-t*.65,levelY+sill,y+off,.05,oh,ow,[mat]);glass2.userData.editorKind='object';glass2.userData.mapOpening=true;glass2.userData.wallKey=wallKey(Number(w.level)||0,x,y);
     var f3=addBox('windowFrame:'+x+':'+y,x+1-t*.7,levelY+sill,y+off,.08,oh,.06,[frame]);f3.userData.editorKind='object';
     var f4=addBox('windowFrame:'+x+':'+y,x+1-t*.7,levelY+sill,y+off+ow-.06,.08,oh,.06,[frame]);f4.userData.editorKind='object';
   }
 }
}
function editOpeningPosition(){var op=openingForSelected();if(!op){alert('Выберите стену с дверью или окном.');return;}moveOpeningAlongWall(.25);}
function duplicateSelected(){if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}var o=(map.objects||[]).find(function(x){return String(x.id)===String(selected.userData.mapObjectId);});if(!o)return;pushHistory();var n=JSON.parse(JSON.stringify(o));n.id='obj_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,6);n.x=Number(n.x||0)+.5;n.y=Number(n.y||0)+.5;map.objects.push(n);saveMap();build();updateInfo();}
function applySurfaceFill(key){if(!map||!map.surfaces||!MATERIAL_CATALOG[key])return;var level=Number(map.levels&&map.levels.current)||0,targets=Object.keys(map.surfaces).filter(function(k){return Number(k.split(':')[0])===level&&map.surfaces[k];});if(!targets.length)return;pushHistory();targets.forEach(function(k){var ss=map.surfaces[k];ss.material=key;ss.color=MATERIAL_CATALOG[key].color;});saveMap();build();updateInfo();}

function snapshotMap(){try{return JSON.stringify(map);}catch(e){return null;}}
function pushHistory(){if(!map||historyBusy)return;var snap=snapshotMap();if(snap){undoStack.push(snap);if(undoStack.length>60)undoStack.shift();redoStack=[];}}
function restoreSnapshot(snap){if(!snap)return;historyBusy=true;try{map=JSON.parse(snap);saveMap();build();selected=null;updateGizmo();updateInfo();}finally{historyBusy=false;}}
function undo(){if(!undoStack.length){alert('Отменять больше нечего.');return;}var cur=snapshotMap(),prev=undoStack.pop();if(cur)redoStack.push(cur);restoreSnapshot(prev);}
function redo(){if(!redoStack.length){alert('Повторять больше нечего.');return;}var cur=snapshotMap(),next=redoStack.pop();if(cur)undoStack.push(cur);restoreSnapshot(next);}
function wallKey(level,x,y){return String(level)+':'+String(x)+':'+String(y);}
function roomWallKey(level,x,y,dir){return String(level)+':'+String(x)+':'+String(y)+':'+String(dir||'n');}
function roomBounds(a,b){
 var cols=Number(map&&map.grid&&map.grid.cols)||20,rows=Number(map&&map.grid&&map.grid.rows)||20;
 return {x1:Math.max(0,Math.min(cols,Math.floor(Math.min(a.x,b.x)))),y1:Math.max(0,Math.min(rows,Math.floor(Math.min(a.y,b.y)))),x2:Math.max(0,Math.min(cols,Math.ceil(Math.max(a.x,b.x)))),y2:Math.max(0,Math.min(rows,Math.ceil(Math.max(a.y,b.y))))};
}
function showRoomPreview(a,b){
 if(!scene)return;
 var q=roomBounds(a,b),w=q.x2-q.x1,h=q.y2-q.y1;
 if(!roomPreview){
   roomPreview=new THREE.Group();roomPreview.name='roomPreview';
   var mat=new THREE.MeshBasicMaterial({color:0x66ccff,transparent:true,opacity:.18,depthWrite:false});
   var geo=new THREE.BoxGeometry(1,.035,1);roomPreview.userData.previewMaterial=mat;roomPreview.userData.previewGeo=geo;
   scene.add(roomPreview);
 }
 while(roomPreview.children.length)roomPreview.remove(roomPreview.children[0]);
 if(w<1||h<1)return;
 var m=roomPreview.userData.previewMaterial,g=roomPreview.userData.previewGeo;
 var mesh=new THREE.Mesh(new THREE.BoxGeometry(w,.035,h),m);mesh.position.set(q.x1+w/2,.03,q.y1+h/2);roomPreview.add(mesh);
}
function hideRoomPreview(){if(roomPreview){roomPreview.visible=false;while(roomPreview.children.length)roomPreview.remove(roomPreview.children[0]);}}
function ensureRoomWall(level,s){
 var k=roomWallKey(level,s[0],s[1],s[2]),old=map.walls[k],sx=Number(s[0])||0,sy=Number(s[1])||0,sl=Math.max(.25,Number(s[3])||.25),dir=s[2];
 if(!old){
   var keys=Object.keys(map.walls||{}),merged=null;
   for(var i=0;i<keys.length;i++){
     var q=map.walls[keys[i]];
     if(!q||!q.__roomAuto||q.opening||q.dir!==dir||Number(q.level||0)!==level)continue;
     var qx=Number(q.x)||0,qy=Number(q.y)||0,ql=Math.max(.25,Number(q.length)||.25);
     if(dir==='n'&&qy===sy&&sx<=qx+ql&&sx+sl>=qx){merged={key:keys[i],w:q,start:Math.min(sx,qx),end:Math.max(sx+sl,qx+ql)};break;}
     if(dir==='e'&&qx===sx&&sy<=qy+ql&&sy+sl>=qy){merged={key:keys[i],w:q,start:Math.min(sy,qy),end:Math.max(sy+sl,qy+ql)};break;}
   }
   if(merged){
     delete map.walls[merged.key];
     var nx=dir==='n'?merged.start:sx,ny=dir==='e'?merged.start:sy;
     if(dir==='n'){nx=merged.start;ny=sy;}else{nx=sx;ny=merged.start;}
     var nk=roomWallKey(level,nx,ny,dir);map.walls[nk]={level:level,x:nx,y:ny,dir:dir,length:merged.end-merged.start,height:Number(merged.w.height)||2.5,thickness:Number(merged.w.thickness)||.09,color:merged.w.color||'#777777',material:merged.w.material||'stone',front:merged.w.front||{texture:'none',color:'#777777'},back:merged.w.back||{texture:'none',color:'#777777'},__roomAuto:true,__key:nk};
     return;
   }
   map.walls[k]={level:level,x:sx,y:sy,dir:dir,length:sl,height:2.5,thickness:.09,color:'#777777',material:'stone',front:{texture:'none',color:'#777777'},back:{texture:'none',color:'#777777'},__roomAuto:true,__key:k};
   return;
 }
 if(old.__roomAuto&&old.dir===dir&&!old.opening){
   old.length=Math.max(Number(old.length)||0,sl);
 }
}
function createRoomFromPoints(a,b){
 if(!map)return;
 var level=Number(map.levels&&map.levels.current)||0;
 var q=roomBounds(a,b),x1=q.x1,y1=q.y1,x2=q.x2,y2=q.y2;
 if(x2-x1<1||y2-y1<1){hideRoomPreview();alert('Комната слишком маленькая. Потяните рамку хотя бы на 1 клетку.');return false;}
 pushHistory();map.walls=map.walls||{};map.surfaces=map.surfaces||{};
 for(var fy=y1;fy<y2;fy++)for(var fx=x1;fx<x2;fx++){var fk=wallKey(level,fx,fy);if(!map.surfaces[fk])map.surfaces[fk]={level:level,x:fx,y:fy,material:'stone',texture:'none',color:'#3d403a',__roomAuto:true};}
 var specs=[
  [x1,y1,'n',x2-x1],
  [x1,y2,'n',x2-x1],
  [x1-1,y1,'e',y2-y1],
  [x2-1,y1,'e',y2-y1]
 ];
 // Создание комнаты атомарно задаёт четыре стороны. Никаких «слияний» при первичном создании:
 // соседняя старая стена не может затереть одну из сторон новой комнаты.
 specs.forEach(function(s){
   var k=roomWallKey(level,s[0],s[1],s[2]), old=map.walls[k];
   if(old&&!old.__roomAuto){
     // Существующую пользовательскую стену не трогаем: новая сторона получает отдельный ключ.
     k=roomWallKey(level,s[0],s[1],s[2]+'r'+Date.now());
   }
   var w={level:level,x:Number(s[0])||0,y:Number(s[1])||0,dir:s[2],length:Math.max(.25,Number(s[3])||.25),height:2.5,thickness:.09,color:'#777777',material:'stone',front:{texture:'none',color:'#777777'},back:{texture:'none',color:'#777777'},__roomAuto:true,__key:k};
   map.walls[k]=w;
 });
 // Четыре стороны уже созданы атомарно выше. Слияние здесь запрещено.
 saveMap();build();updateInfo();return true;
}
function deleteSelected(){
 if(!selected||!map){alert('Сначала выберите стену или объект.');return;}
 var w=selectedWall();
 if(w){
   var key=selected.name.slice(5);
   if(map.walls&&map.walls[key]){pushHistory();delete map.walls[key];saveMap();selected=null;selectedItems=[];build();updateGizmo();updateInfo();}
   return;
 }
 if(selected.userData&&selected.userData.mapObjectId){
   var id=String(selected.userData.mapObjectId);
   var before=(map.objects||[]).length;
   pushHistory();map.objects=(map.objects||[]).filter(function(o){return String(o.id)!==id;});
   if(map.objects.length!==before){saveMap();selected=null;selectedItems=[];build();updateGizmo();updateInfo();}
 }
}
function wallHandleHit(ev){
 if(editorMode!=='build')return null;
 var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true);
 for(var i=0;i<hits.length;i++){var o=hits[i].object;if(o&&o.userData&&o.userData.wallHandle)return o;}
 return null;
}
function inferRoomFromWall(w){
 if(!w||!map||!map.walls)return null;
 var level=Number(w.level)||0,x=Number(w.x)||0,y=Number(w.y)||0,len=Number(w.length)||0,dir=w.dir,walls=map.walls,keys=Object.keys(walls);
 function overlap(a1,a2,b1,b2){return Math.min(a2,b2)>Math.max(a1,b1)+.01;}
 if(dir==='n'){
   var candidates=keys.map(function(k){return walls[k];}).filter(function(q){return q&&q.__roomAuto&&q.dir==='n'&&Number(q.level||0)===level&&Number(q.x||0)!==x&&overlap(x,x+len,Number(q.x)||0,(Number(q.x)||0)+(Number(q.length)||0));});
   for(var ci=0;ci<candidates.length;ci++){
     var bb=candidates[ci],bx=Number(bb.x)||0,bl=Number(bb.length)||0,rx1=Math.max(x,bx),rx2=Math.min(x+len,bx+bl),y1=Math.min(y,Number(bb.y)||0),y2=Math.max(y,Number(bb.y)||0);
     var left=walls[roomWallKey(level,rx1-1,y1,'e')],right=walls[roomWallKey(level,rx2-1,y1,'e')];
     if(left&&right&&left.dir==='e'&&right.dir==='e')return {level:level,x1:rx1,x2:rx2,y1:y1,y2:y2,top:w,bottom:bb,left:left,right:right,axis:'x'};
   }
 }
 if(dir==='e'){
   var candidates2=keys.map(function(k){return walls[k];}).filter(function(q){return q&&q.__roomAuto&&q.dir==='e'&&Number(q.level||0)===level&&Number(q.y||0)!==y&&overlap(y,y+len,Number(q.y)||0,(Number(q.y)||0)+(Number(q.length)||0));});
   for(var cj=0;cj<candidates2.length;cj++){
     var bb2=candidates2[cj],by=Number(bb2.y)||0,bl2=Number(bb2.length)||0,ry1=Math.max(y,by),ry2=Math.min(y+len,by+bl2),x1=Math.min(x,Number(bb2.x)||0),x2=Math.max(x,Number(bb2.x)||0);
     var top=walls[roomWallKey(level,x1,ry1,'n')],bottom=walls[roomWallKey(level,x1,ry2-1,'n')];
     if(top&&bottom&&top.dir==='n'&&bottom.dir==='n')return {level:level,x1:x1,x2:x2+1,y1:ry1,y2:ry2,top:top,bottom:bb2,left:w,right:bb2,axis:'y'};
   }
 }
 return null;
}
function resizeRoomBoundary(w,handle,delta){
 var r=inferRoomFromWall(w);if(!r)return false;
 var level=r.level;
 if(r.axis==='x'){
   var oldX1=r.x1,oldX2=r.x2;
   if(handle==='start'){var nx=Math.max(0,oldX1+delta);if(nx>=oldX2-.25)return false;delta=nx-oldX1;r.x1=nx;}
   else {var nx2=Math.min(Number(map.grid&&map.grid.cols)||20,oldX2+delta);if(nx2<=oldX1+.25)return false;delta=nx2-oldX2;r.x2=nx2;}
   if(!r.top.__roomAuto||!r.bottom.__roomAuto||!r.left.__roomAuto||!r.right.__roomAuto)return false;
   r.top.length=r.x2-r.x1;r.bottom.length=r.x2-r.x1;
   if(handle==='start'){r.top.x=r.x1;r.bottom.x=r.x1;r.left.x=r.x1;r.left.y=r.y1;}
   else {r.right.x=r.x2-1;r.right.y=r.y1;}
 }else{
   var oldY1=r.y1,oldY2=r.y2;
   if(handle==='start'){var ny=Math.max(0,oldY1+delta);if(ny>=oldY2-.25)return false;delta=ny-oldY1;r.y1=ny;}
   else {var ny2=Math.min(Number(map.grid&&map.grid.rows)||20,oldY2+delta);if(ny2<=oldY1+.25)return false;delta=ny2-oldY2;r.y2=ny2;}
   if(!r.top.__roomAuto||!r.bottom.__roomAuto||!r.left.__roomAuto||!r.right.__roomAuto)return false;
   r.left.length=r.y2-r.y1;r.right.length=r.y2-r.y1;
   if(handle==='start'){r.top.y=r.y1;r.bottom.y=r.y2;r.left.y=r.y1;}
   else {r.bottom.y=r.y2;r.right.y=r.y1;}
 }
 if(map.surfaces){
   var minx=Math.floor(Math.min(oldX1,r.x1)),maxx=Math.ceil(Math.max(oldX2,r.x2)),miny=Math.floor(Math.min(oldY1,r.y1)),maxy=Math.ceil(Math.max(oldY2,r.y2));
   for(var yy=miny;yy<maxy;yy++)for(var xx=minx;xx<maxx;xx++){var sk=wallKey(level,xx,yy);if(r.x1<=xx&&xx<r.x2&&r.y1<=yy&&yy<r.y2){if(!map.surfaces[sk])map.surfaces[sk]={level:level,x:xx,y:yy,material:'stone',texture:'none',color:'#3d403a'};}else if(map.surfaces[sk]&&map.surfaces[sk].__roomAuto)delete map.surfaces[sk];}
 }
 return true;
}
function beginWallHandleDrag(ev){
 var hit=wallHandleHit(ev);if(!hit)return false;
 var key=hit.userData.wallKey,w=map&&map.walls&&map.walls[key];if(!w)return false;
 var gp=sceneGroundPoint(ev);if(!gp)return false;
 var wallObj=root.children.find(function(o){return o&&o.name==='wall:'+key;});selected=wallObj||hit;selectedItems=[selected];updateInfo();
 wallDrag={key:key,startX:Number(w.x)||0,startY:Number(w.y)||0,oldLength:Number(w.length)||1,dir:w.dir||'n',handle:hit.userData.handle,history:snapshotMap(),changed:false};
 return true;
}
function beginWallDrag(ev){
 if(editorMode!=='build'||!selected)return false;
 var w=selectedWall();if(!w)return false;
 var gp=sceneGroundPoint(ev);if(!gp)return false;
 wallDrag={key:selected.name.slice(5),startX:gp.x,startY:gp.z,oldLength:Number(w.length)||1,dir:w.dir||'n',handle:'end',history:snapshotMap(),changed:false};
 return true;
}
function updateWallDrag(ev){
 if(!wallDrag||!map||!map.walls)return;
 var w=map.walls[wallDrag.key];if(!w)return;
 var gp=sceneGroundPoint(ev);if(!gp)return;
 var delta=wallDrag.handle==='start'
   ?(wallDrag.dir==='n'?wallDrag.startX-gp.x:wallDrag.startY-gp.z)
   :(wallDrag.dir==='n'?gp.x-wallDrag.startX:gp.z-wallDrag.startY);
 var len=Math.max(.25,wallDrag.oldLength+delta);
 if(snapGrid)len=Math.max(.25,Math.round(len/snapSize)*snapSize);
 var room=inferRoomFromWall(w);
 if(room){var roomDelta=wallDrag.handle==='start'?(wallDrag.dir==='n'?gp.x-wallDrag.startX:gp.z-wallDrag.startY):(wallDrag.dir==='n'?gp.x-wallDrag.startX:gp.z-wallDrag.startY);if(snapGrid)roomDelta=Math.round(roomDelta/snapSize)*snapSize;if(resizeRoomBoundary(w,wallDrag.handle,roomDelta)){wallDrag.changed=true;build();updateInfo();return;}}
 if(Math.abs(len-(Number(w.length)||1))<.001)return;
 if(wallDrag.handle==='start'){
   if(wallDrag.dir==='n')w.x=wallDrag.startX+(wallDrag.oldLength-len);
   else w.y=wallDrag.startY+(wallDrag.oldLength-len);
 }
 w.length=len;wallDrag.changed=true;build();updateInfo();
}
function finishWallDrag(){
 if(!wallDrag)return;
 if(wallDrag.changed&&wallDrag.history){undoStack.push(wallDrag.history);redoStack=[];saveMap();build();updateInfo();}
 wallDrag=null;
}
function selectedWall(){if(!selected||!selected.name||selected.name.indexOf('wall:')!==0)return null;var k=selected.name.slice(5);return map&&map.walls?map.walls[k]:null;}
function editSelectedWall(){var w=selectedWall();if(!w){alert('Выберите стену в режиме строительства.');return;}var old=JSON.stringify(w);var len=prompt('Длина стены в клетках',String(Number(w.length)||1));if(len===null)return;var thick=prompt('Толщина стены',String(Number(w.thickness)||.09));if(thick===null)return;var height=prompt('Высота стены',String(Number(w.height)||2.5));if(height===null)return;len=Number(len);thick=Number(thick);height=Number(height);if(!Number.isFinite(len)||!Number.isFinite(thick)||!Number.isFinite(height)){alert('Неверные значения.');return;}pushHistory();w.length=Math.max(.1,len);w.thickness=Math.max(.03,thick);w.height=Math.max(.5,height);saveMap();build();updateInfo();}
function editOpening(type){var w=selectedWall();if(!w){alert('Сначала выберите стену.');return;}var old=w.opening||{},isDoor=type==='door',max=Math.max(.35,Number(w.length)||1);pushHistory();w.opening={type:type,width:Math.min(max,Number(old.width)||(isDoor?.9:.9)),height:Number(old.height)||(isDoor?2.1:1.2),sill:Number(old.sill)||(isDoor?0:.9),offset:Math.max(0,Math.min(max-Number(old.width||.9),Number(old.offset)||0))};saveMap();build();updateInfo();var h=document.getElementById('r3dQuickHint');if(h)h.textContent=(isDoor?'🚪 Дверь':'🪟 Окно')+' создано. Теперь используйте кнопки проёма.';}
function clearOpening(){var w=selectedWall();if(!w)return;pushHistory();w.opening=null;saveMap();build();updateInfo();}

var ROOT_TEXTURE_CATALOG={
 wall:[
  {file:'wall_brick_red.png',name:'Кирпич — красный'},
  {file:'wall_concrete.png',name:'Бетон'},
  {file:'wall_half_timber.png',name:'Фахверк'},
  {file:'wall_marble_dark.png',name:'Мрамор — тёмный'},
  {file:'wall_marble_light.png',name:'Мрамор — светлый'},
  {file:'wall_moss_stone.png',name:'Камень с мхом'},
  {file:'wall_old_plaster.png',name:'Старая штукатурка'},
  {file:'wall_plaster_dark.png',name:'Штукатурка — тёмная'},
  {file:'wall_plaster_light.png',name:'Штукатурка — светлая'},
  {file:'wall_plaster_panel.png',name:'Штукатурка — панели'},
  {file:'wall_slate.png',name:'Сланец'},
  {file:'wall_stone_dark.png',name:'Камень — тёмный'},
  {file:'wall_stone_light.png',name:'Камень — светлый'},
  {file:'wall_stone_masonry.png',name:'Каменная кладка'},
  {file:'wall_wallpaper.png',name:'Обои'},
  {file:'wall_white_plaster.png',name:'Белая штукатурка'},
  {file:'wall_wood_dark.png',name:'Дерево — тёмное'},
  {file:'wall_wood_light.png',name:'Дерево — светлое'}
 ],
 floor:[
  {file:'floor_ceramic_tile_dark.png',name:'Керамическая плитка — тёмная'},
  {file:'floor_ceramic_tile_light.png',name:'Керамическая плитка — светлая'},
  {file:'floor_checker_tile.png',name:'Шахматная плитка'},
  {file:'floor_cobblestone.png',name:'Брусчатка'},
  {file:'floor_earth.png',name:'Земля'},
  {file:'floor_grass.png',name:'Трава'},
  {file:'floor_hex_tile.png',name:'Шестигранная плитка'},
  {file:'floor_marble_dark.png',name:'Мрамор — тёмный'},
  {file:'floor_marble_light.png',name:'Мрамор — светлый'},
  {file:'floor_parquet_herringbone.png',name:'Паркет — ёлочка'},
  {file:'floor_rug_blue.png',name:'Ковёр — синий'},
  {file:'floor_rug_green.png',name:'Ковёр — зелёный'},
  {file:'floor_rug_red.png',name:'Ковёр — красный'},
  {file:'floor_stone_tile_dark.png',name:'Каменная плитка — тёмная'},
  {file:'floor_stone_tile_light.png',name:'Каменная плитка — светлая'},
  {file:'floor_tatami.png',name:'Татами'},
  {file:'floor_wood_dark.png',name:'Дерево — тёмное'},
  {file:'floor_wood_light.png',name:'Дерево — светлое'}
 ]
};

var MATERIAL_CATALOG={stone:{name:'Камень',color:'#777d82'},wood:{name:'Дерево',color:'#8b5a2b'},brick:{name:'Кирпич',color:'#9a5140'},plaster:{name:'Штукатурка',color:'#d0c6b2'},metal:{name:'Металл',color:'#59636d'},dark:{name:'Тёмный',color:'#30343a'}};
function paintRay(ev){
 if(!paintMode||editorMode!=='finish'||!raycaster||!renderer||!map)return false;
 var r=renderer.domElement.getBoundingClientRect();
 if(!r.width||!r.height)return false;
 mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);
 var hits=raycaster.intersectObjects(root.children,true).filter(function(h){var k=h.object.userData&&h.object.userData.editorKind;return k==='surface'||k==='wall';});
 if(!hits.length)return false;
 var o=hits[0].object,e=MATERIAL_CATALOG[paintMaterial];if(!e)return false;
 var changed=false,key='';
 if(o.userData.editorKind==='surface'){
   key=o.name.indexOf('surface:')===0?o.name.slice(8):'';
   var ss=map.surfaces&&map.surfaces[key];
   if(!ss)return false;
   if(ss.material!==paintMaterial||ss.color!==e.color){changed=true;}
 }else{
   key=o.userData.wallKey||'';var w=map.walls&&map.walls[key];if(!w)return false;
   var s=side(w,paintSide);
   if(s.color!==e.color){changed=true;}
 }
 if(!changed)return false;
 if(paintedDuringStroke[key])return false;
 if(!paintHistoryStarted){pushHistory();paintHistoryStarted=true;}
 if(o.userData.editorKind==='surface'){var s2=map.surfaces&&map.surfaces[key];if(s2){s2.material=paintMaterial;s2.color=e.color;}}else{var w2=map.walls&&map.walls[key];if(w2){var side2=side(w2,paintSide);side2.color=e.color;w2.material=paintMaterial;w2.color=e.color;}}
 paintedDuringStroke[key]=1;saveMap();build();updateInfo();return true;
}
function togglePaintMode(force){
 paintMode=force==null?!paintMode:!!force;painting=false;paintHistoryStarted=false;paintedDuringStroke={};
 var b=document.getElementById('r3dPaint');if(b)b.textContent=paintMode?'🖌️ Кисть: ВКЛ':'🖌️ Кисть: ВЫКЛ';
 var h=document.getElementById('r3dQuickHint');if(h)h.textContent=paintMode?'Кисть: ведите пальцем по полу или стене. Материал: '+(MATERIAL_CATALOG[paintMaterial]||{}).name+' • сторона стены: '+(paintSide==='front'?'внутри':'снаружи'):'Выберите режим — инструменты появятся в «Ещё».';
 updateInfo();
}
function setPaintMaterial(key){if(!MATERIAL_CATALOG[key])return;paintMaterial=key;paintMode=true;var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Кисть ВКЛ • материал: '+MATERIAL_CATALOG[key].name+' • сторона стены: '+(paintSide==='front'?'внутри':'снаружи');var b=document.getElementById('r3dPaint');if(b)b.textContent='🖌️ Кисть: ВКЛ';}
function setPaintSide(which){paintSide=which==='back'?'back':'front';var h=document.getElementById('r3dQuickHint');if(h&&paintMode)h.textContent='Кисть ВКЛ • материал: '+MATERIAL_CATALOG[paintMaterial].name+' • сторона стены: '+(paintSide==='front'?'внутри':'снаружи');}
function applyMaterialToSelected(key){var list=selectedItems.length?selectedItems:[selected];if(!list.length||!list[0]){alert('Сначала выберите элемент.');return;}var e=MATERIAL_CATALOG[key];if(!e)return;pushHistory();list.forEach(function(item){if(!item)return;var w=(item.name||'').indexOf('wall:')===0?selectedWallFrom(item):null;if(w){w.material=key;w.color=e.color;side(w,'front').color=e.color;side(w,'back').color=e.color;}else if(item.userData&&item.userData.mapObjectId){var o=(map.objects||[]).find(function(x){return String(x.id)===String(item.userData.mapObjectId);});if(o){o.material=key;o.color=e.color;}}else if((item.name||'').indexOf('surface:')===0){var k=item.name.slice(8),ss=map.surfaces&&map.surfaces[k];if(ss){ss.material=key;ss.color=e.color;}}});saveMap();build();updateInfo();}
function selectedWallFrom(item){if(!item||!item.name||item.name.indexOf('wall:')!==0)return null;var k=item.name.slice(5);return map&&map.walls?map.walls[k]:null;}
function openMaterialCatalog(){var old=document.getElementById('map3dMaterials');if(old){old.remove();return;}var box=document.createElement('div');box.id='map3dMaterials';box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(300px,78vw);max-width:300px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:10px;z-index:40000;box-shadow:-8px 0 28px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain';box.innerHTML='<b>🎨 Материалы</b><button id="matClose" style="float:right">✕</button><div style="clear:both;color:#aaa;margin:8px 0">Выберите материал для выделенного элемента.</div>';Object.keys(MATERIAL_CATALOG).forEach(function(k){var e=MATERIAL_CATALOG[k],b=document.createElement('button');b.style.cssText='width:100%;margin:4px 0;padding:9px;text-align:left';b.innerHTML='<span style="display:inline-block;width:18px;height:18px;border-radius:4px;background:'+e.color+';vertical-align:middle;margin-right:8px"></span>'+e.name;b.onclick=function(){if(editorMode==='finish'){setPaintMaterial(k);}else{applyMaterialToSelected(k);}};box.appendChild(b);});box.querySelector('#matClose').onclick=function(){box.remove();};modal.appendChild(box);}
function openWallTools(){var old=document.getElementById('map3dWallTools');if(old){old.remove();return;}var box=document.createElement('div');box.id='map3dWallTools';box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(300px,78vw);max-width:300px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:10px;z-index:40000;box-shadow:-8px 0 28px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain';box.innerHTML='<b>🏗️ Стена</b><button id="wallClose" style="float:right">✕</button><div style="clear:both;margin:8px 0;color:#aaa">Сначала выберите стену.</div><button id="wallEdit" style="width:100%;margin:4px 0">📐 Длина / толщина / высота</button><button id="wallDoor" style="width:100%;margin:4px 0">🚪 Дверь</button><button id="wallWindow" style="width:100%;margin:4px 0">🪟 Окно</button><button id="wallMoveL" style="width:49%;margin:4px 0">◀ Проём</button><button id="wallMoveR" style="width:49%;margin:4px 0">Проём ▶</button><button id="wallPos" style="width:100%;margin:4px 0">↔ Позиция проёма</button><button id="wallClear" style="width:100%;margin:4px 0">▢ Убрать проём</button>';box.querySelector('#wallClose').onclick=function(){box.remove();};box.querySelector('#wallEdit').onclick=editSelectedWall;box.querySelector('#wallDoor').onclick=function(){editOpening('door');};box.querySelector('#wallWindow').onclick=function(){editOpening('window');};box.querySelector('#wallMoveL').onclick=function(){moveOpeningAlongWall(-.25);};box.querySelector('#wallMoveR').onclick=function(){moveOpeningAlongWall(.25);};box.querySelector('#wallPos').onclick=editOpeningPosition;box.querySelector('#wallClear').onclick=clearOpening;modal.appendChild(box);}

function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c];});}
function hex(v,f){return /^#[0-9a-f]{6}$/i.test(String(v||''))?String(v):f;}
function loadMap(){try{return JSON.parse(localStorage.getItem('dnd_vtt_3d_map')||'null');}catch(e){return null;}}
function saveMap(){if(!map)return;localStorage.setItem('dnd_vtt_3d_map',JSON.stringify(map));}
function setEditorMode(m){
 if(m==='construction')m='build';
 if(m==='furnishing')m='objects';
 if(m!=='build'&&m!=='objects'&&m!=='view'&&m!=='levels')m='view';
 editorMode=m;selected=null;selectedItems=[];transformMode='translate';mode=m==='view'?'orbit':'transform';roomToolArmed=false;wallToolArmed=false;floorToolArmed=false;floorDrawActive=false;lastFloorCell=null;
 // Разрез никогда не включается автоматически. Он включается только кнопкой «Разрез» в редакторе.
 if(m!=='build')cutawayWalls=false;
 updateGizmo();build();updateCutaway();updateInfo();
 var b=document.querySelectorAll('[data-r3d-mode]');
 for(var i=0;i<b.length;i++){
   var active=b[i].getAttribute('data-r3d-mode')===m;
   b[i].style.fontWeight=active?'800':'500';
   b[i].style.outline=active?'2px solid #ffd54a':'none';
   b[i].style.background=active?'#394351':'';
 }
}
function editorAllows(kind){
 if(editorMode==='build')return kind==='wall';
  if(editorMode==='levels'||editorMode==='view')return false;
 return kind==='object'||kind==='token';
}
function normalizeLevelData(){if(!map)return;map.levels=map.levels||{};var legacyMax=Number(map.levels.max);if(!Number.isFinite(legacyMax))legacyMax=Number(map.levels.count||0);map.levels.min=Number.isFinite(Number(map.levels.min))?Math.floor(Number(map.levels.min)):0;map.levels.max=Math.max(0,Math.floor(legacyMax||0));map.levels.current=Math.max(map.levels.min,Math.min(map.levels.max,Math.floor(Number(map.levels.current)||0)));delete map.levels.count;}
function changeLevel(delta){if(!map)return;normalizeLevelData();var cur=Number(map.levels.current)||0,next=Math.max(map.levels.min,Math.min(map.levels.max,cur+Number(delta||0)));if(next===cur)return;pushHistory();map.levels.current=next;controls.target.y=next*3;saveMap();build();updateInfo();}
function createLevel(direction){if(!map)return;normalizeLevelData();direction=direction==='down'?'down':'up';pushHistory();if(direction==='up')map.levels.max=Math.max(map.levels.max,0)+1;else map.levels.min=Math.min(map.levels.min,0)-1;map.levels.current=direction==='up'?map.levels.max:map.levels.min;saveMap();build();updateInfo();}
function setLevelAbsolute(level){if(!map)return;normalizeLevelData();var next=Math.max(map.levels.min,Math.min(map.levels.max,Math.floor(Number(level)||0)));if(next===Number(map.levels.current||0))return;pushHistory();map.levels.current=next;saveMap();build();updateInfo();}
function levelInfo(){if(!map||!map.levels)return 'Этаж 1';var n=Number(map.levels.current)||0;return n===0?'Этаж 1':(n>0?'Этаж '+(n+1):'Этаж '+n);}
function mapLevelCount(){if(!map)return 1;normalizeLevelData();return map.levels.max-map.levels.min+1;}
function floorAt(level,x,y){if(!map||!map.surfaces)return null;return map.surfaces[wallKey(level,Math.floor(x),Math.floor(y))]||null;}
function setFloorCell(x,y,enabled){if(!map)return;var level=Number(map.levels&&map.levels.current)||0,cols=Number(map.grid&&map.grid.cols)||20,rows=Number(map.grid&&map.grid.rows)||20;x=Math.floor(x);y=Math.floor(y);if(x<0||y<0||x>=cols||y>=rows)return;map.surfaces=map.surfaces||{};var k=wallKey(level,x,y);if(enabled){if(!map.surfaces[k])map.surfaces[k]={level:level,x:x,y:y,material:'stone',texture:'none',color:'#3d403a',walkable:true};}else delete map.surfaces[k];}
function applyFloorToolAt(ev,enabled){var gp=sceneGroundPoint(ev);if(!gp)return false;var x=Math.floor(gp.x),y=Math.floor(gp.z),key=wallKey(Number(map.levels&&map.levels.current)||0,x,y);if(key===lastFloorCell)return true;lastFloorCell=key;setFloorCell(x,y,enabled);saveMap();build();updateInfo();return true;}
function resizeMapEdge(dir,delta){if(!map)return;var g=map.grid||{};var cols=Math.max(1,Number(g.cols)||20),rows=Math.max(1,Number(g.rows)||20),nextCols=cols,nextRows=rows;dir=String(dir||'east');delta=Number(delta)||0;if(dir==='east'||dir==='west')nextCols=Math.max(1,cols+delta);else nextRows=Math.max(1,rows+delta);if(nextCols===cols&&nextRows===rows)return;pushHistory();map.grid.cols=nextCols;map.grid.rows=nextRows;Object.keys(map.surfaces||{}).forEach(function(k){var p=k.split(':');if(p.length<3)return;var x=Number(p[1]),y=Number(p[2]);if(x<0||y<0||x>=nextCols||y>=nextRows)delete map.surfaces[k];});saveMap();cameraHome();build();updateInfo();}
function updateMapSizeInfo(){var e=document.getElementById('r3dMapSizeInfo');if(e&&map)e.textContent='Размер: '+(Number(map.grid&&map.grid.cols)||20)+' × '+(Number(map.grid&&map.grid.rows)||20)+' клеток • этажей: '+mapLevelCount();}
function ensureMapCollections(){if(!map)return;map.assets=Array.isArray(map.assets)?map.assets:[];map.objects=Array.isArray(map.objects)?map.objects:[];}
function openAssetDB(){return new Promise(function(resolve,reject){if(assetDB){resolve(assetDB);return;}try{var r=indexedDB.open('dnd_vtt_3d_assets',1);r.onupgradeneeded=function(){var db=r.result;if(!db.objectStoreNames.contains('assets'))db.createObjectStore('assets',{keyPath:'id'});};r.onsuccess=function(){assetDB=r.result;resolve(assetDB);};r.onerror=function(){reject(r.error||new Error('IndexedDB error'));};}catch(e){reject(e);}});}
function putAsset(id,record){return openAssetDB().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction('assets','readwrite');tx.objectStore('assets').put(Object.assign({id:id},record));tx.oncomplete=function(){assetCache[id]=record;resolve(record);};tx.onerror=function(){reject(tx.error||new Error('Asset save error'));};});});}
function getAsset(id){if(assetCache[id])return Promise.resolve(assetCache[id]);return openAssetDB().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction('assets','readonly'),q=tx.objectStore('assets').get(id);q.onsuccess=function(){if(q.result)assetCache[id]=q.result;resolve(q.result||null);};q.onerror=function(){reject(q.error||new Error('Asset read error'));};});});}
function newAssetId(){return 'asset_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);}
function syncSelectedTransform(){if(!selected||!selected.userData||!selected.userData.mapObjectId||!map)return;var id=selected.userData.mapObjectId,o=(map.objects||[]).find(function(x){return String(x.id)===String(id);});if(!o)return;o.x=Number(selected.position.x)-.5;o.y=Number(selected.position.z)-.5;o.z=Number(selected.position.y)||0;o.rotation=Number(selected.rotation.y)*180/Math.PI;o.scaleX=Number(selected.scale.x)||1;o.scaleY=Number(selected.scale.z)||1;o.scaleZ=Number(selected.scale.y)||1;saveMap();}
function nudgeSelected(dx,dz){
 pushHistory();if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}selected.position.x+=dx;selected.position.z+=dz;syncSelectedTransform();updateInfo();}
function rotateSelected(deg){
 pushHistory();if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}selected.rotation.y+=deg*Math.PI/180;syncSelectedTransform();updateInfo();}
function scaleSelected(mult){
 pushHistory();if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}selected.scale.multiplyScalar(mult);syncSelectedTransform();updateInfo();}
function side(w,n){w[n]=w[n]||{texture:'none',color:null};return w[n];}
function material(color,rough){return new THREE.MeshStandardMaterial({color:hex(color,'#777777'),roughness:rough==null?.82:rough,metalness:0});}
function tex(url){if(!url||url==='none')return null;try{if(String(url).indexOf('root:')===0)url='./'+String(url).slice(5);if(String(url).indexOf('asset:')===0){var id=String(url).slice(6),cached=assetCache[id];if(cached&&cached.url)url=cached.url;else{loadAssetTexture(id).then(function(){if(typeof build==='function')build();});return null;}}var l=new THREE.TextureLoader(),t=l.load(url);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}catch(e){return null;}}
function matFromSide(s,base){var m=material((s&&s.color)||base);var t=tex(s&&s.texture);if(t)m.map=t;return m;}
function addBox(name,x,y,z,w,h,d,mats,rot){
 var g=new THREE.BoxGeometry(w,h,d);var ms=Array.isArray(mats)?mats:[mats||material('#777')];var o=new THREE.Mesh(g,ms);o.name=name;o.position.set(x+w*.5,y+d*.5,z+h*.5);if(rot)o.rotation.y=Number(rot)*Math.PI/180;root.add(o);return o;
}
function wallMesh(w){
 var h=Math.max(.5,Number(w.height)||2.5),t=Math.max(.03,Number(w.thickness)||.09),len=Math.max(.1,Number(w.length)||1),levelY=(Number(w.level)||0)*3;
 var front=side(w,'front'),back=side(w,'back'),base=w.color||'#777777',end=material(base),top=material(base),bottom=material(base),fm=matFromSide(front,base),bm=matFromSide(back,base),mats=w.dir==='n'?[end,end,top,bottom,fm,bm]:[fm,bm,top,bottom,end,end],x=Number(w.x)||0,y=Number(w.y)||0,op=w.opening;
 function part(name,px,py,pz,pw,ph,pd){var q=addBox(name,px,py,pz,pw,ph,pd,mats);q.userData.editorKind='wall';q.userData.wallKey=w.__key||((Number(w.level)||0)+':'+x+':'+y);return q;}
 // Three.js: X/Z are the map plane, Y is vertical.
 if(w.dir==='n'){
   if(!op)return part('wall:'+w.level+':'+x+':'+y,x,levelY,y-t/2,len,h,t);
   var ow=Math.min(len,Math.max(.1,Number(op.width)||.9)),oh=Math.min(h,Math.max(.1,Number(op.height)||2.1)),os=Math.max(0,Math.min(h-oh,Number(op.sill)||0)),cc=Math.max(0,Math.min(len-ow,Number(op.offset)||0));
   if(cc>0)part('wall:'+w.level+':'+x+':'+y,x,levelY,y-t/2,cc,h,t);
   if(os>0)part('wall:'+w.level+':'+x+':'+y,x+cc,levelY,y-t/2,ow,os,t);
   if(len-cc-ow>0)part('wall:'+w.level+':'+x+':'+y,x+cc+ow,levelY,y-t/2,len-cc-ow,h,t);
   if(h-os-oh>0)part('wall:'+w.level+':'+x+':'+y,x+cc,levelY+os,y-t/2,ow,h-os,t);
   return;
 }
 if(!op)return part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY,y,t,h,len);
 var ow2=Math.min(len,Math.max(.1,Number(op.width)||.9)),oh2=Math.min(h,Math.max(.1,Number(op.height)||2.1)),os2=Math.max(0,Math.min(h-oh2,Number(op.sill)||0)),cc2=Math.max(0,Math.min(len-ow2,Number(op.offset)||0));
 if(cc2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY,y,t,h,cc2);
 if(os2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY+os2,y+cc2,t,os2,ow2);
 if(len-cc2-ow2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY,y+cc2+ow2,t,h,len-cc2-ow2);
 if(h-os2-oh2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY+os2,y+cc2,t,h-os2-oh2,ow2);
}
function addOpeningHandles(w){
 if(editorMode!=='build'||!w||!w.opening)return;
 var op=w.opening,x=Number(w.x)||0,y=Number(w.y)||0,len=Math.max(.1,Number(w.length)||1),ow=Math.min(len,Math.max(.1,Number(op.width)||.9)),off=Math.max(0,Math.min(len-ow,Number(op.offset)||0)),z=(Number(w.level)||0)*3+Math.max(.15,Number(w.height)||2.5)*.5;
 var pts=w.dir==='n'?[[x+off,y],[x+off+ow,y]]:[[x+1,y+off],[x+1,y+off+ow]];
 pts.forEach(function(p,idx){var m=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),new THREE.MeshBasicMaterial({color:0xffb74d,depthTest:false}));m.position.set(p[0],z,p[1]);m.name='openingHandle:'+(w.__key||wallKey(Number(w.level)||0,x,y))+':'+(idx?'end':'start');m.userData.editorKind='openingHandle';m.userData.openingHandle=true;m.userData.wallKey=w.__key||wallKey(Number(w.level)||0,x,y);m.userData.handle=idx?'end':'start';m.renderOrder=1001;root.add(m);});
}
function openingHandleHit(ev){
 if(editorMode!=='build')return null;
 var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true);
 for(var i=0;i<hits.length;i++){var o=hits[i].object;if(o&&o.userData&&o.userData.openingHandle)return o;}
 return null;
}
function beginOpeningHandleDrag(ev){
 var hit=openingHandleHit(ev);if(!hit)return false;
 var key=hit.userData.wallKey,w=map&&map.walls&&map.walls[key],gp=sceneGroundPoint(ev);if(!w||!w.opening||!gp)return false;
 var wallObj=root.children.find(function(o){return o&&o.name==='wall:'+key;});selected=wallObj||hit;selectedItems=[selected];updateInfo();
 openingDrag={key:key,startX:gp.x,startY:gp.z,oldOffset:Number(w.opening.offset)||0,oldWidth:Number(w.opening.width)||.9,dir:w.dir||'n',handle:hit.userData.handle,history:snapshotMap(),changed:false,widthResize:true};
 return true;
}
function updateOpeningHandleDrag(ev){
 if(!openingDrag||!openingDrag.widthResize)return;
 var w=map&&map.walls&&map.walls[openingDrag.key],op=w&&w.opening,gp=sceneGroundPoint(ev);if(!w||!op||!gp)return;
 var delta=openingDrag.dir==='n'?gp.x-openingDrag.startX:gp.z-openingDrag.startY;
 var next=openingDrag.handle==='start'?openingDrag.oldWidth-delta:openingDrag.oldWidth+delta;
 var max=Math.max(.1,Number(w.length)||1),min=.25;next=Math.max(min,Math.min(max,next));
 if(snapGrid)next=Math.max(min,Math.min(max,Math.round(next/snapSize)*snapSize));
 if(openingDrag.handle==='start'){var oldEnd=openingDrag.oldOffset+openingDrag.oldWidth;op.offset=Math.max(0,Math.min(oldEnd-next,openingDrag.oldOffset+openingDrag.oldWidth-next));}
 op.width=next;op.offset=Math.max(0,Math.min(max-next,Number(op.offset)||0));openingDrag.changed=true;build();updateInfo();
}
function addWallHandles(w){
 if(editorMode!=='build'||!selected||!selected.name||selected.name.slice(5)!=(w.__key||((Number(w.level)||0)+':'+Number(w.x||0)+':'+Number(w.y||0))))return;
 var x=Number(w.x)||0,y=Number(w.y)||0,len=Math.max(.1,Number(w.length)||1),z=(Number(w.level)||0)*3+Math.max(.15,Number(w.height)||2.5)*.5;
 var pts=w.dir==='n'?[[x,y],[x+len,y]]:[[x+1,y],[x+1,y+len]];
 pts.forEach(function(p,idx){var m=new THREE.Mesh(new THREE.SphereGeometry(.14,12,8),new THREE.MeshBasicMaterial({color:0xffff66,depthTest:false}));m.position.set(p[0],z,p[1]);m.name='wallHandle:'+(w.__key||wallKey(Number(w.level)||0,x,y))+':'+(idx?'end':'start');m.userData.editorKind='wallHandle';m.userData.wallHandle=true;m.userData.wallKey=w.__key||wallKey(Number(w.level)||0,x,y);m.userData.handle=idx?'end':'start';m.renderOrder=1000;root.add(m);});
}
function build(){
 if(!THREE||!map)return;
 buildGeneration++;var generation=buildGeneration;
 while(root.children.length)root.remove(root.children[0]);
 var cols=Number(map.grid&&map.grid.cols)||20,rows=Number(map.grid&&map.grid.rows)||20,level=Number(map.levels&&map.levels.current)||0,levelY=level*3;
 var ground=new THREE.Mesh(new THREE.PlaneGeometry(cols,rows),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));ground.rotation.x=-Math.PI/2;ground.position.set(cols/2,levelY,rows/2);ground.name='ground';ground.userData.editorKind='ground';root.add(ground);
 var surfaces=map.surfaces||{};Object.keys(surfaces).forEach(function(k){var p=k.split(':'),l=Number(p[0]),x=Number(p[1]),y=Number(p[2]);if(l!==level)return;var s=surfaces[k],m=material(s.color||'#30352f');var t=tex(s.texture);if(t){t.repeat.set(Number(s.repeatX)||1,Number(s.repeatY)||1);m.map=t;}var floorHeight=Number((map.cells&&map.cells[k])||0)*.12;var q=new THREE.Mesh(new THREE.BoxGeometry(1,.08,1),m);q.position.set(x+.5,levelY+floorHeight+.04,y+.5);q.name='surface:'+k;q.userData.editorKind='surface';q.userData.floorCollision=true;root.add(q);});
 Object.keys(map.walls||{}).forEach(function(k){var w=map.walls[k];if(Number(w.level)===level){wallMesh(w);addOpeningVisuals(w);addWallHandles(w);addOpeningHandles(w);}});
 (map.objects||[]).forEach(function(o){if(o.__outOfBounds||Number(o.level||0)!==level)return;if(o.assetId){loadAssetObject(o);}else{var m=material(o.color||'#8b5a2b');var t=tex(o.texture);if(t)m.map=t;var q=addBox('object:'+o.id,Number(o.x)+.5,Number(o.y)+.5,levelY+(Number(o.z)||0),(Number(o.size)||.8)*Number(o.scaleX||1),Math.max(.1,Number(o.size)||.8)*Number(o.scaleZ||1),(Number(o.size)||.8)*Number(o.scaleY||1),m,Number(o.rotation)||0);q.userData.mapObjectId=o.id;q.userData.editorKind='object';}});
 (map.tokens||[]).forEach(function(o){if(o.__outOfBounds||Number(o.level||0)!==level)return;var q=addBox('token:'+o.id,Number(o.x)+.35,Number(o.y)+.35,levelY+.12,.3,.3,.3,material(o.kind==='monster'?'#b33':'#39c'));q.userData.tokenId=o.id;q.userData.editorKind='token';});
}
function loadAssetObject(o){var generation=buildGeneration;getAsset(o.assetId).then(function(rec){if(!rec||!rec.buffer||generation!==buildGeneration)return;var loader=new GLTFLoader();loader.parse(rec.buffer,'',function(g){if(generation!==buildGeneration)return;var q=g.scene;q.name='object:'+o.id;q.userData.mapObjectId=o.id;q.userData.editorKind='object';q.userData.assetId=o.assetId;q.position.set(Number(o.x||0)+.5,levelY+(Number(o.z)||0),Number(o.y||0)+.5);q.rotation.y=Number(o.rotation||0)*Math.PI/180;q.scale.set(Number(o.scaleX||1),Number(o.scaleZ||1),Number(o.scaleY||1));root.add(q);},function(e){console.warn('GLB parse failed',o.assetId,e);});}).catch(function(e){console.warn('Asset read failed',o.assetId,e);});}
function clampCameraTarget(){
 var cols=Number(map&&map.grid&&map.grid.cols)||20,rows=Number(map&&map.grid&&map.grid.rows)||20,pad=2;
 controls.target.x=Math.max(-pad,Math.min(cols+pad,Number(controls.target.x)||0));
 controls.target.z=Math.max(-pad,Math.min(rows+pad,Number(controls.target.z)||0));
}
function updateCutaway(){
 if(!renderer||!camera||!root||!controls)return;
 if(editorMode!=='build'){
   root.traverse(function(o){if(o.isMesh&&o.userData&&o.userData.editorKind==='wall')o.visible=true;});
   return;
 }
 var now=performance.now();if(now-cutawayTick<70)return;cutawayTick=now;
 var cam=camera.position,tx=controls.target.x,tz=controls.target.z,dx=tx-cam.x,dz=tz-cam.z,dl=Math.hypot(dx,dz)||1;
 dx/=dl;dz/=dl;
 root.traverse(function(o){
   if(!o.isMesh||!o.userData||o.userData.editorKind!=='wall')return;
   var hidden=false;
   if(cutawayWalls){
     var p=o.getWorldPosition(new THREE.Vector3()),w=map&&map.walls&&map.walls[o.userData.wallKey];
     if(w){
       var wx=Number(w.x)||0,wy=Number(w.y)||0;
       if(w.dir==='n'){
         var sideToCam=cam.z-wy,sideToTarget=tz-wy;
         hidden=(sideToCam*sideToTarget<0 || Math.abs(sideToCam)<0.16) && ((p.x-cam.x)*dx+(p.z-cam.z)*dz)>0;
       }else{
         var sideToCamX=cam.x-(wx+1),sideToTargetX=tx-(wx+1);
         hidden=(sideToCamX*sideToTargetX<0 || Math.abs(sideToCamX)<0.16) && ((p.x-cam.x)*dx+(p.z-cam.z)*dz)>0;
       }
       var vx=p.x-cam.x,vz=p.z-cam.z,dist=Math.hypot(vx,vz)||1,forward=(vx*dx+vz*dz)/dist,sideDist=Math.abs(vx*dz-vz*dx);
       hidden=hidden&&forward>.05&&forward<1.08&&sideDist<Math.max(5,controls.distance*.34)&&dist<controls.distance*1.25;
     }
   }
   o.visible=!hidden;
 });
}
function toggleCutaway(force){
 if(editorMode!=='build')return;
 cutawayWalls=typeof force==='boolean'?force:!cutawayWalls;
 var b=document.getElementById('r3dCutaway');
 if(b)b.textContent='🏠 Стены: '+(cutawayWalls?'SIMS':'обычно');
 updateCutaway();
}
function cameraHome(){
 var cols=Number(map&&map.grid&&map.grid.cols)||20,rows=Number(map&&map.grid&&map.grid.rows)||20;
 controls.yaw=.78;controls.pitch=.72;controls.distance=Math.max(10,Math.min(48,Math.hypot(cols,rows)*.72));
 controls.target.x=cols/2;controls.target.y=(Number(map&&map.levels&&map.levels.current)||0)*3;controls.target.z=rows/2;clampCameraTarget();
}
function cameraNudge(kind){var step=Math.max(.35,controls.distance*.045),a=controls.yaw,dx=Math.cos(a),dz=Math.sin(a);if(kind==='left')controls.yaw-=.14;else if(kind==='right')controls.yaw+=.14;else if(kind==='up')controls.pitch=Math.min(1.38,controls.pitch+.10);else if(kind==='down')controls.pitch=Math.max(.18,controls.pitch-.10);else if(kind==='zoomIn')controls.distance=Math.max(3,controls.distance*.86);else if(kind==='zoomOut')controls.distance=Math.min(150,controls.distance*1.16);else if(kind==='panLeft'){controls.target.x-=Math.cos(a+Math.PI/2)*step;controls.target.z-=Math.sin(a+Math.PI/2)*step;}else if(kind==='panRight'){controls.target.x+=Math.cos(a+Math.PI/2)*step;controls.target.z+=Math.sin(a+Math.PI/2)*step;}else if(kind==='panUp'){controls.target.x+=dx*step;controls.target.z+=dz*step;}else if(kind==='panDown'){controls.target.x-=dx*step;controls.target.z-=dz*step;}else if(kind==='home')cameraHome();clampCameraTarget();}
function cameraControlPanel(host){var p=document.createElement('div');p.id='r3dCameraPad';p.style.cssText='position:absolute;right:10px;bottom:12px;z-index:8;display:grid;grid-template-columns:repeat(3,52px);grid-template-rows:repeat(5,52px);gap:5px;touch-action:none;user-select:none;filter:drop-shadow(0 3px 8px #000);';var defs=[['',''],['↟','up'],['',''],['↞','left'],['⌂','home'],['↠','right'],['−','zoomOut'],['↓','down'],['＋','zoomIn'],['◀','panLeft'],['▲','panUp'],['▶','panRight'],['',''],['▼','panDown']];defs.forEach(function(d){var b=document.createElement('button');b.type='button';b.textContent=d[0];b.dataset.cam=d[1];b.style.cssText='width:52px;height:52px;padding:0;border:1px solid #69717d;border-radius:12px;background:rgba(25,30,38,.88);color:#fff;font-size:25px;font-weight:800;touch-action:none;';if(!d[1]){b.style.visibility='hidden';}else{b.addEventListener('pointerdown',function(ev){ev.preventDefault();ev.stopPropagation();cameraNudge(d[1]);b.setPointerCapture&&b.setPointerCapture(ev.pointerId);b._camTimer=setInterval(function(){cameraNudge(d[1]);},90);});var stop=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();}if(b._camTimer){clearInterval(b._camTimer);b._camTimer=null;}};b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop);b.addEventListener('lostpointercapture',stop);b.addEventListener('contextmenu',function(ev){ev.preventDefault();});}p.appendChild(b);});var label=document.createElement('div');label.textContent='Камера';label.style.cssText='grid-column:1/4;text-align:center;font:700 12px sans-serif;color:#d7dde5;text-shadow:0 1px 3px #000;pointer-events:none;';p.prepend(label);host.appendChild(p);return p;}
function resize(){if(!renderer)return;var c=renderer.domElement,w=c.clientWidth,h=c.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();}
function frame(){if(!renderer)return;updateCutaway();var c=renderer.domElement,dx=Math.cos(controls.yaw)*Math.cos(controls.pitch)*controls.distance,dy=Math.sin(controls.pitch)*controls.distance,dz=Math.sin(controls.yaw)*Math.cos(controls.pitch)*controls.distance;camera.position.set(controls.target.x+dx,controls.target.y+dy,controls.target.z+dz);camera.lookAt(controls.target.x,controls.target.y,controls.target.z);renderer.render(scene,camera);raf=requestAnimationFrame(frame);}
function focusCameraOnSelection(o){
 if(!o||!camera||!controls)return false;
 var box=new THREE.Box3().setFromObject(o);
 if(box.isEmpty())return false;
 var p=box.getCenter(new THREE.Vector3());
 controls.target.copy(p);
 clampCameraTarget();
 var size=box.getSize(new THREE.Vector3()),radius=Math.max(size.x,size.y,size.z,.8)*1.35;
 controls.distance=Math.max(3,Math.min(80,Math.max(controls.distance,radius*2.2)));
 return true;
}

function pick(ev){if(!raycaster||!renderer)return;var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true).filter(function(h){return h.object.name!=='ground'&&!h.object.userData.gizmoAxis&&editorAllows(h.object.userData.editorKind||'object');});if(!hits.length){selected=null;selectedItems=[];updateGizmo();updateInfo();return;}var o=hits[0].object;while(o&&o.parent&&!(o.userData&&o.userData.mapObjectId)&&o.parent!==root)o=o.parent;
 if(editorMode==='finish'&&window.r3dPendingTexture){var pt=window.r3dPendingTexture;var kind=pt.kind;if((kind==='wall'&&o.userData&&o.userData.editorKind==='wall')||(kind==='floor'&&o.userData&&o.userData.editorKind==='surface')){selected=o;selectedItems=[o];applyRootTexture(pt.file,kind,pt.which);window.r3dPendingTexture=null;updateGizmo();updateInfo();return;}}if(ev.shiftKey||ev.ctrlKey){var ix=selectedItems.indexOf(o);if(ix>=0)selectedItems.splice(ix,1);else selectedItems.push(o);selected=selectedItems.length?selectedItems[selectedItems.length-1]:null;}else{selectedItems=[o];selected=o;}if(selected)focusCameraOnSelection(selected);updateGizmo();updateInfo();}
function updateFloorBar(){var label=document.getElementById('r3dFloorLabel');if(!label||!map)return;normalizeLevelData();var cur=Number(map.levels.current)||0;label.textContent=levelInfo()+' / '+mapLevelCount();updateMapSizeInfo();}
function resizeOpening(delta){var w=selectedWall(),op=openingForSelected();if(!w||!op)return;var max=Math.max(.1,Number(w.length)||1),next=Math.max(.1,Math.min(max,Number(op.width||.9)+delta));pushHistory();op.width=next;op.offset=Math.max(0,Math.min(max-next,Number(op.offset)||0));saveMap();build();updateInfo();}
function updateContextPanel(){
 var p=document.getElementById('r3dContextPanel');if(!p)return;
 p.innerHTML='';
 var title=document.createElement('span');title.style.cssText='font-weight:800;margin-right:4px';
 var add=function(label,fn){var b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='padding:7px 9px;border-radius:8px;border:1px solid #4d5968;background:#202833;color:#fff;font-weight:600';b.onclick=fn;p.appendChild(b);};
 var w=selectedWall();
 if(editorMode==='build'&&w){
   title.textContent='🧱 Стена';
   add('📐 Размер',editSelectedWall);add('🚪 Дверь',function(){editOpening('door');});add('🪟 Окно',function(){editOpening('window');});
   add('← Проём',function(){moveOpeningAlongWall(-.25);});add('→ Проём',function(){moveOpeningAlongWall(.25);});add('Ширина −',function(){resizeOpening(-.25);});add('Ширина +',function(){resizeOpening(.25);});add('▢ Убрать проём',clearOpening);
 }else if(editorMode==='objects'&&selected){
   title.textContent=selectedItems.length>1?'🪑 Объекты: '+selectedItems.length:'🪑 '+(selected.name||'Объект');
   add('↔ Переместить',function(){setGizmoMode('translate');});add('⟳ Вращать',function(){setGizmoMode('rotate');});
   add('⤢ Масштаб',function(){setGizmoMode('scale');});add('⧉ Дубликат',duplicateSelected);add('🗑 Удалить',deleteSelected);
 }else if(editorMode==='finish'&&selected&&selected.name&&selected.name.indexOf('wall:')===0){title.textContent='🧱 Стена';add('🧱 Текстуры стены',function(){openRootTexturePicker('wall');});add('🎨 Материалы',openMaterialCatalog);add('🗑 Очистить выделение',function(){selected=null;selectedItems=[];updateGizmo();updateInfo();});}else if(editorMode==='finish'&&selected&&selected.name&&selected.name.indexOf('surface:')===0){title.textContent='🟫 Пол';add('🟫 Текстуры пола',function(){openRootTexturePicker('floor');});add('🎨 Материалы',openMaterialCatalog);add('🗑 Очистить выделение',function(){selected=null;selectedItems=[];updateGizmo();updateInfo();});
 }else if(editorMode==='build'){
   title.textContent='🧱 Строительство';add('▭ Создать комнату',function(){if(window.r3dRoomHint){window.r3dRoomHint.textContent='Потяните по полу от одного угла комнаты к другому.';}});add('🏗️ Стена',function(){openWallTools();});add('🗑 Удалить',deleteSelected);
 }else if(editorMode==='objects'){
   title.textContent='🛋 Обстановка';add('📚 Библиотека',openAssetLibrary);add('🧩 Добавить GLB',addModel);
 }else{
   title.textContent='👁 Просмотр';add('🏠 SIMS: '+(cutawayWalls?'ВКЛ':'ВЫКЛ'),function(){toggleCutaway();});
 }
 p.appendChild(title);
}
function updateInfo(){
 updateFloorBar();updateContextPanel();if(typeof simpleToolsRefresh==='function')simpleToolsRefresh();
 var e=document.getElementById('map3dRealInfo');if(!e)return;
 var modeName={build:'Строительство',objects:'Обстановка',view:'Просмотр',finish:'Отделка',levels:'Этажи'}[editorMode]||editorMode;
 e.textContent=(selected?(selectedItems.length>1?'Выбрано элементов: '+selectedItems.length:'Выбрано: '+selected.name+(selected.userData&&selected.userData.assetId?' • GLB':'')):'')+' • '+levelInfo()+' • '+modeName;
}
function makeGizmo(){if(!THREE||gizmo)return;gizmo=new THREE.Group();gizmo.name='transform-gizmo';function axis(name,color,vec){var mat=new THREE.LineBasicMaterial({color:color,depthTest:false,transparent:true,opacity:.95});var geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),vec.clone().multiplyScalar(1.5)]);var line=new THREE.Line(geo,mat);line.userData.gizmoAxis=name;line.renderOrder=999;gizmo.add(line);var cone=new THREE.Mesh(new THREE.ConeGeometry(.12,.35,12),new THREE.MeshBasicMaterial({color:color,depthTest:false}));cone.userData.gizmoAxis=name;cone.position.copy(vec.clone().multiplyScalar(1.65));if(name==='X')cone.rotation.z=-Math.PI/2;if(name==='Z')cone.rotation.x=Math.PI/2;gizmo.add(cone);}axis('X',0xff5555,new THREE.Vector3(1,0,0));axis('Y',0x55ff66,new THREE.Vector3(0,1,0));axis('Z',0x5599ff,new THREE.Vector3(0,0,1));gizmo.visible=false;gizmo.renderOrder=999;scene.add(gizmo);}
function updateGizmo(){if(!gizmo)return;gizmo.visible=!!selected&&editorMode==='objects';if(selected&&gizmo.visible){gizmo.position.copy(selected.getWorldPosition(new THREE.Vector3()));gizmo.scale.setScalar(Math.max(.6,controls.distance*.045));}}
function snapValue(v,step){if(!snapGrid||!step)return v;return Math.round(v/step)*step;}
function applySnap(){if(!selected)return;if(transformMode==='translate'){selected.position.x=snapValue(selected.position.x,snapSize);selected.position.y=snapValue(selected.position.y,snapSize);selected.position.z=snapValue(selected.position.z,snapSize);}else if(transformMode==='rotate'){var step=Math.PI/12;selected.rotation.y=Math.round(selected.rotation.y/step)*step;}else if(transformMode==='scale'){var step=.1;selected.scale.x=Math.max(.1,Math.round(selected.scale.x/step)*step);selected.scale.y=Math.max(.1,Math.round(selected.scale.y/step)*step);selected.scale.z=Math.max(.1,Math.round(selected.scale.z/step)*step);}}
function setGizmoHighlight(axis){if(!gizmo)return;gizmo.children.forEach(function(c){var m=c.material;if(!m)return;var active=c.userData&&c.userData.gizmoAxis===axis;m.opacity=active?1:.82;if(m.color){if(active)m.color.set(0xffff66);else if(c.userData.gizmoAxis==='X')m.color.set(0xff5555);else if(c.userData.gizmoAxis==='Y')m.color.set(0x55ff66);else if(c.userData.gizmoAxis==='Z')m.color.set(0x5599ff);}});}
function gizmoHit(ev){if(!gizmo||!gizmo.visible)return null;var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);var h=raycaster.intersectObjects(gizmo.children,true);return h.length?h[0].object.userData.gizmoAxis:null;}
function gizmoMove(ev){if(!selected||!gizmoDragging)return;var dx=ev.clientX-gizmoStartX,dy=ev.clientY-gizmoStartY;var step=Math.max(.002,controls.distance*.0018);if(transformMode==='rotate'){selected.rotation.y=gizmoStartRot+(dx-dy)*.01;}else if(transformMode==='scale'){var q=Math.max(.15,1+(dx-dy)*.004);selected.scale.copy(gizmoStartScale).multiplyScalar(q);}else{if(gizmoAxis==='X')selected.position.x=gizmoStartPos.x+dx*step;else if(gizmoAxis==='Z')selected.position.z=gizmoStartPos.z-dy*step;else if(gizmoAxis==='Y')selected.position.y=gizmoStartPos.y-dy*step;}applySnap();syncSelectedTransform();updateGizmo();updateInfo();}
function setGizmoMode(m){transformMode=m;mode='transform';updateInfo();setGizmoHighlight(null);}
function colorSide(which){
 pushHistory();
 if(!selected||selected.name.indexOf('wall:')!==0){alert('Выберите стену в 3D-сцене.');return;}
 var parts=selected.name.split(':');var k=parts.slice(1).join(':');var w=map.walls&&map.walls[k];if(!w){alert('Стена не найдена в карте.');return;}
 var s=side(w,which),v=prompt(which==='front'?'Цвет внутренней стороны':'Цвет внешней стороны',s.color||'#777777');if(v===null)return;if(!/^#[0-9a-f]{6}$/i.test(v)){alert('Нужен цвет #RRGGBB');return;}s.color=v;saveMap();build();updateInfo();
}
function screenDistance(a,b){var dx=a.clientX-b.clientX,dy=a.clientY-b.clientY;return Math.sqrt(dx*dx+dy*dy);}
function screenMid(a,b){return {x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2};}
function beginTouchGesture(){var ids=Object.keys(touches);if(ids.length<2){touchGesture=null;return;}var a=touches[ids[0]],b=touches[ids[1]],m=screenMid(a,b);touchGesture={distance:screenDistance(a,b),midX:m.x,midY:m.y,angle:Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX),targetX:controls.target.x,targetZ:controls.target.z,cameraDistance:controls.distance,yaw:controls.yaw,pitch:controls.pitch};}
function updateTouchGesture(){if(!touchGesture)return;var ids=Object.keys(touches);if(ids.length<2)return;var a=touches[ids[0]],b=touches[ids[1]],m=screenMid(a,b),d=screenDistance(a,b);var ratio=touchGesture.distance/Math.max(1,d);controls.distance=Math.max(3,Math.min(150,touchGesture.cameraDistance*ratio));var pan=.006*controls.distance;controls.target.x=touchGesture.targetX-(m.x-touchGesture.midX)*pan;controls.target.z=touchGesture.targetZ+(m.y-touchGesture.midY)*pan;var angle=Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX),da=angle-touchGesture.angle;if(da>Math.PI)da-=Math.PI*2;if(da<-Math.PI)da+=Math.PI*2;controls.yaw=touchGesture.yaw-da*1.15;controls.pitch=Math.max(.18,Math.min(1.38,touchGesture.pitch-(m.y-touchGesture.midY)*.003));clampCameraTarget();}
function previewGLB(rec,canvas){
 if(!renderer||!THREE||!GLTFLoader||!rec||!rec.buffer||!canvas)return;
 var loader=new GLTFLoader();
 loader.parse(rec.buffer,'',function(g){
   var s=g.scene,box=new THREE.Box3().setFromObject(s),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
   var max=Math.max(size.x,size.y,size.z,.1),pcam=new THREE.PerspectiveCamera(32,1.33,.01,1000);
   pcam.position.set(max*1.8,max*1.25,max*1.8);pcam.lookAt(center);
   var ps=new THREE.Scene();ps.background=new THREE.Color(0x20252c);
   ps.add(s);
   var amb=new THREE.HemisphereLight(0xffffff,0x404040,2);ps.add(amb);
   var key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(max*2,max*3,max*2);ps.add(key);
   s.traverse(function(n){if(n.isMesh){n.material=new THREE.MeshNormalMaterial();n.frustumCulled=false;}});
   var oldTarget=renderer.getRenderTarget(),oldX=renderer.getViewport(new THREE.Vector4()),oldScX=renderer.getScissor(new THREE.Vector4()),oldTest=renderer.getScissorTest();
   var rt=new THREE.WebGLRenderTarget(160,120,{depthBuffer:true,stencilBuffer:false});
   renderer.setRenderTarget(rt);renderer.setViewport(0,0,160,120);renderer.setScissor(0,0,160,120);renderer.setScissorTest(false);renderer.render(ps,pcam);
   var px=new Uint8Array(160*120*4);renderer.readRenderTargetPixels(rt,0,0,160,120,px);
   var ctx=canvas.getContext('2d'),img=ctx.createImageData(160,120);
   for(var y=0;y<120;y++)for(var x=0;x<160;x++){var si=((119-y)*160+x)*4,di=(y*160+x)*4;img.data[di]=px[si];img.data[di+1]=px[si+1];img.data[di+2]=px[si+2];img.data[di+3]=px[si+3];}
   ctx.putImageData(img,0,0);
   renderer.setRenderTarget(oldTarget);renderer.setViewport(oldX);renderer.setScissor(oldScX);renderer.setScissorTest(oldTest);rt.dispose();
   s.traverse(function(n){if(n.isMesh){var m=n.material;if(m&&m.dispose)m.dispose();if(n.geometry&&n.geometry.dispose)n.geometry.dispose();}});
 },function(e){console.warn('GLB preview failed',rec.id,e);});
}

function rootTextureEntry(kind,file){
 var list=ROOT_TEXTURE_CATALOG[kind]||[];
 return list.find(function(x){return x.file===file;})||null;
}
function applyRootTexture(file,kind,which){
 ensureMapCollections();
 var rec=rootTextureEntry(kind,file);
 if(!rec){alert('Текстура не найдена: '+file);return false;}
 if(kind==='wall'){
   var w=selectedWall();
   if(!w){
     window.r3dPendingTexture={file:rec.file,kind:'wall',which:which==='back'?'back':'front'};
     var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Текстура выбрана. Теперь коснитесь стены — она будет применена.';
     return false;
   }
   var sideName=which==='back'?'back':'front';
   pushHistory();side(w,sideName).texture='root:'+rec.file;saveMap();build();updateInfo();return true;
 }else{
   var ss=null,key='';
   if(selected&&selected.name&&selected.name.indexOf('surface:')===0){key=selected.name.slice(8);ss=map.surfaces&&map.surfaces[key];}
   if(!ss){
     window.r3dPendingTexture={file:rec.file,kind:'floor',which:'front'};
     var h2=document.getElementById('r3dQuickHint');if(h2)h2.textContent='Текстура выбрана. Теперь коснитесь участка пола — она будет применена.';
     return false;
   }
   pushHistory();ss.texture='root:'+rec.file;saveMap();build();updateInfo();return true;
 }
}
function openRootTexturePicker(kind){
 // Каталог отделён от DOM-слоя редактора: открываем его напрямую в body.
 // Это исключает проблемы с flex-контейнером canvas/toolbar и гарантирует кликабельность.
 var old=document.getElementById('map3dRootTextures');
 if(old){old.remove();return;}
 var list=ROOT_TEXTURE_CATALOG[kind]||[],box=document.createElement('div');
 box.id='map3dRootTextures';
 box.setAttribute('role','dialog');
 box.setAttribute('aria-label',kind==='wall'?'Текстуры стен':'Текстуры пола');
 box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(210px,46vw);max-width:210px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:8px;z-index:40000;box-shadow:-8px 0 28px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain;';
 var title=kind==='wall'?'🧱 Стены':'🟫 Пол';
 box.innerHTML='<div style="position:sticky;top:0;z-index:2;background:#171c24;padding:4px 2px 8px;display:flex;align-items:center;justify-content:space-between"><b>'+title+'</b><button id="rootTexClose" type="button" style="padding:5px 8px;cursor:pointer">✕</button></div>';
 var grid=document.createElement('div');grid.style.cssText='display:flex;flex-direction:column;gap:7px';
 list.forEach(function(rec){
   var card=document.createElement('div');card.style.cssText='display:flex;flex-direction:column;gap:5px;padding:6px;background:#222933;color:#fff;border:1px solid #46515f;border-radius:10px;';
   var img=document.createElement('img');img.src='./'+rec.file;img.alt=rec.name;img.loading='lazy';img.draggable=false;img.style.cssText='width:100%;height:72px;object-fit:cover;border-radius:7px;background:#10151c;pointer-events:none';
   var label=document.createElement('div');label.textContent=rec.name;label.style.cssText='font-size:10px;line-height:1.15;color:#dbe2ea';
   card.appendChild(img);card.appendChild(label);
   if(kind==='wall'){
     var actions=document.createElement('div');actions.style.cssText='display:flex;gap:4px';
     var front=document.createElement('button');front.type='button';front.textContent='Внутри';front.style.cssText='flex:1;padding:7px 2px;font-size:10px;cursor:pointer';
     var back=document.createElement('button');back.type='button';back.textContent='Снаружи';back.style.cssText='flex:1;padding:7px 2px;font-size:10px;cursor:pointer';
     front.onclick=function(ev){ev.preventDefault();ev.stopPropagation();applyRootTexture(rec.file,'wall','front');};
     back.onclick=function(ev){ev.preventDefault();ev.stopPropagation();applyRootTexture(rec.file,'wall','back');};
     actions.appendChild(front);actions.appendChild(back);card.appendChild(actions);
   }else{
     card.style.cursor='pointer';
     card.onclick=function(ev){ev.preventDefault();ev.stopPropagation();applyRootTexture(rec.file,'floor');};
   }
   grid.appendChild(card);
 });
 box.appendChild(grid);
 box.querySelector('#rootTexClose').onclick=function(ev){ev.preventDefault();ev.stopPropagation();box.remove();};
 document.body.appendChild(box);
}
function openAssetLibrary(){openAssetDB().then(function(db){var tx=db.transaction('assets','readonly'),q=tx.objectStore('assets').getAll();q.onsuccess=function(){var items=q.result||[],box=document.createElement('div');box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(330px,82vw);max-width:330px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:12px;z-index:40000;box-shadow:-8px 0 32px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain';box.innerHTML='<b>📚 Библиотека ассетов</b><button id="libClose" style="float:right">✕</button><div style="clear:both;color:#aaa;margin:8px 0">GLB — модели. PNG/JPG/WebP — текстуры.</div><button id="libAddModel" style="width:49%;margin:4px 0">🧩 Добавить GLB</button><button id="libAddTex" style="width:49%;margin:4px 0">🖼️ Добавить текстуру</button>';var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:8px';items.forEach(function(rec){var b=document.createElement('button');b.style.cssText='display:flex;flex-direction:column;gap:5px;text-align:left;padding:7px;background:#222933;color:#fff;border:1px solid #394454;border-radius:9px';var title=document.createElement('span');title.textContent=(rec.meta&&rec.meta.kind==='texture'?'🖼️ ':'🧩 ')+(rec.meta&&rec.meta.name||rec.id);b.appendChild(title);if(rec.meta&&rec.meta.kind==='texture'&&rec.buffer){try{var u=URL.createObjectURL(new Blob([rec.buffer],{type:rec.meta.type||'image/png'})),im=document.createElement('img');im.src=u;im.style.cssText='width:100%;height:74px;object-fit:cover;border-radius:6px';b.insertBefore(im,title);setTimeout(function(){URL.revokeObjectURL(u);},60000);}catch(e){}}if(rec.meta&&rec.meta.kind==='texture'){var apply=document.createElement('div');apply.style.cssText='display:flex;gap:4px';var fi=document.createElement('button');fi.textContent='Внутри';fi.onclick=function(ev){ev.stopPropagation();applyTextureAsset(rec.id,'front');};var bo=document.createElement('button');bo.textContent='Снаружи';bo.onclick=function(ev){ev.stopPropagation();applyTextureAsset(rec.id,'back');};apply.appendChild(fi);apply.appendChild(bo);b.appendChild(apply);}else{var pv=document.createElement('canvas');pv.width=160;pv.height=120;pv.style.cssText='width:100%;height:92px;display:block;border-radius:7px;background:#20252c';b.insertBefore(pv,title);previewGLB(rec,pv);b.draggable=true;b.addEventListener('dragstart',function(ev){if(ev.dataTransfer){ev.dataTransfer.effectAllowed='copy';ev.dataTransfer.setData('text/plain',rec.id);}});b.onclick=function(){var p=lastScenePoint;if(p){placeLibraryAsset(rec.id,rec.meta&&rec.meta.name||'Asset',p);box.remove();}else{pendingLibraryAsset={id:rec.id,name:rec.meta&&rec.meta.name||'Asset'};box.remove();var h=document.getElementById('r3dQuickHint');if(h)h.textContent='📍 Ассет выбран. Теперь тапните по полу в нужном месте — модель будет поставлена туда.';}};}grid.appendChild(b);});box.appendChild(grid);box.querySelector('#libClose').onclick=function(){box.remove();};box.querySelector('#libAddModel').onclick=function(){box.remove();addModel();};box.querySelector('#libAddTex').onclick=function(){box.remove();addTexture('front');};modal.appendChild(box);};});}
function sceneEditableHit(ev){
 if(!raycaster||!renderer||!root)return false;
 var r=renderer.domElement.getBoundingClientRect();if(!r.width||!r.height)return false;
 mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);
 return raycaster.intersectObjects(root.children,true).some(function(h){
   var k=h.object&&h.object.userData&&h.object.userData.editorKind;
   return k&&editorAllows(k);
 });
}
function sceneGroundPoint(ev){if(!renderer||!camera||!raycaster)return null;var r=renderer.domElement.getBoundingClientRect();if(!r.width||!r.height)return null;mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);var g=root.children.filter(function(x){return x.userData&&x.userData.editorKind==='ground';});var h=raycaster.intersectObjects(g,false);return h.length?h[0].point:null;}
function placeLibraryAsset(id,name,point){pushHistory();ensureMapCollections();var p=point||{x:1.5,y:0,z:1.5};pendingLibraryAsset=null;var oid='obj_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,6);map.objects.push({id:oid,name:name,assetId:id,x:Number(p.x)-.5,y:Number(p.z)-.5,z:Number(p.y)||0,level:Number(map.levels&&map.levels.current)||0,scaleX:1,scaleY:1,scaleZ:1,rotation:0});saveMap();setEditorMode('objects');}
function addModel(){
 ensureMapCollections();
 var input=document.createElement('input');input.type='file';input.accept='.glb,.gltf,model/gltf-binary,model/gltf+json';input.onchange=function(){var f=input.files&&input.files[0];if(!f)return;if(f.name.toLowerCase().endsWith('.gltf')){alert('Для мобильного редактора лучше использовать .GLB: он сохраняет модель и ресурсы в одном файле.');return;}var rd=new FileReader();rd.onload=function(){var id=newAssetId(),buf=rd.result,meta={name:f.name,type:f.type||'model/gltf-binary',size:f.size,createdAt:new Date().toISOString(),license:'user-imported',source:'local'};putAsset(id,{meta:meta,buffer:buf}).then(function(){map.assets.push({id:id,name:f.name,type:meta.type,size:f.size,createdAt:meta.createdAt,license:meta.license,source:meta.source});var oid='obj_'+Date.now().toString(36);map.objects.push({id:oid,name:f.name,assetId:id,x:1,y:1,z:0,level:Number(map.levels&&map.levels.current)||0,scaleX:1,scaleY:1,scaleZ:1,rotation:0});saveMap();build();updateInfo();alert('GLB сохранён в локальную библиотеку и привязан к карте как assetId: '+id);}).catch(function(e){alert('Не удалось сохранить 3D-ассет: '+e.message);});};rd.readAsArrayBuffer(f);};input.click();
}
function applyTextureAsset(id,which){ensureMapCollections();if(!selected){alert('Сначала выберите элемент.');return;}var w=selectedWall(),rec=map.assets.find(function(a){return String(a.id)===String(id);});if(!rec)return;pushHistory();if(w&&(which==='front'||which==='back'))side(w,which).texture='asset:'+id;else if(w)w.texture='asset:'+id;else if(selected.userData&&selected.userData.mapObjectId){var o=(map.objects||[]).find(function(x){return String(x.id)===String(selected.userData.mapObjectId);});if(o)o.texture='asset:'+id;}else if((selected.name||'').indexOf('surface:')===0){var k=selected.name.slice(8),ss=map.surfaces&&map.surfaces[k];if(ss)ss.texture='asset:'+id;}saveMap();loadAssetTexture(id).then(function(){build();updateInfo();});}
function loadAssetTexture(id){return getAsset(id).then(function(rec){if(!rec||!rec.buffer)return null;if(assetCache[id]&&assetCache[id].url)return assetCache[id].url;var url=URL.createObjectURL(new Blob([rec.buffer],{type:(rec.meta&&rec.meta.type)||'image/png'}));assetCache[id]=Object.assign({},rec,{url:url});return url;});}
function addTexture(which){ensureMapCollections();var input=document.createElement('input');input.type='file';input.accept='image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp';input.onchange=function(){var file=input.files&&input.files[0];if(!file)return;if(file.size>12*1024*1024){alert('Текстура слишком большая. Максимум 12 MB.');return;}var rd=new FileReader();rd.onload=function(){var id=newAssetId(),buf=rd.result,meta={name:file.name,type:file.type||'image/png',size:file.size,createdAt:new Date().toISOString(),license:'user-imported',source:'local',kind:'texture'};putAsset(id,{meta:meta,buffer:buf}).then(function(){map.assets.push({id:id,name:file.name,type:meta.type,size:file.size,createdAt:meta.createdAt,license:meta.license,source:meta.source,kind:'texture'});saveMap();return loadAssetTexture(id);}).then(function(){applyTextureAsset(id,which||'front');}).catch(function(e){alert('Не удалось сохранить текстуру: '+e.message);});};rd.readAsArrayBuffer(file);};input.click();}
function textureSide(which){addTexture(which);}
function open(){
 if(document.getElementById('map3dRealModal'))return;
 map=loadMap();if(!map){map={version:15,name:'Новая 3D-карта',notes:'',grid:{cols:20,rows:20,cellSizeFt:5},levels:{min:0,max:0,current:0},cells:{},surfaces:{},objects:[],walls:{},connectors:[],tokens:[],combat:{},player:{x:0,y:0,level:0,elevation:0,yaw:0,pitch:0},cameraMode:'orbit'};saveMap();} normalizeLevelData();
 var modal=document.createElement('div');modal.id='map3dRealModal';modal.style.cssText='position:fixed;inset:0;z-index:32000;background:#080b10;color:#fff;display:flex;flex-direction:column;';
 modal.innerHTML='<div id="r3dTopBar" style="min-height:52px;display:flex;align-items:center;gap:6px;padding:6px 9px;box-sizing:border-box;background:#151a20;border-bottom:1px solid #333"><b style="font-size:17px">🏠 3D Карты</b><span id="map3dRealInfo" style="color:#8f9aa8;font-size:10px">'+VERSION+'</span><div style="flex:1"></div><button id="r3dFloorDown">▼</button><button id="r3dFloorLabel" style="min-width:82px;font-weight:800">Этаж 1</button><button id="r3dFloorUp">▲</button><button id="r3dFloorHome">⌂</button><button id="r3dSave">💾</button><button id="r3dClose">✕</button></div><div id="r3dQuickHint" style="padding:6px 10px;background:#10151b;color:#aeb8c5;font-size:11px;min-height:17px">Выберите режим снизу. Камера управляется жестами или кнопками справа.</div><div id="r3dContextPanel" style="display:none"></div><div id="map3dRealCanvas" style="position:relative;flex:1;min-height:0;overflow:hidden"></div><div id="r3dCompat" style="display:none"><button id="r3dMore"></button><div id="r3dMorePanel"></div><button id="r3dLevelDown"></button><button id="r3dLevelUp"></button><button id="r3dFill"></button><button id="r3dPaint"></button><button id="r3dPaintFront"></button><button id="r3dPaintBack"></button><button id="r3dWallTools"></button><button id="r3dWallTextures"></button><button id="r3dFloorTextures"></button><button id="r3dCutaway"></button><button id="r3dUndo"></button><button id="r3dRedo"></button><button id="r3dDup"></button><button id="r3dFront"></button><button id="r3dBack"></button><button id="r3dFrontTex"></button><button id="r3dBackTex"></button><button id="r3dTexture"></button><button id="r3dModel"></button><button id="r3dMove"></button><button id="r3dRotate"></button><button id="r3dScale"></button><button id="r3dSnap"></button><button id="r3dLeft"></button><button id="r3dRight"></button><button id="r3dForward"></button><button id="r3dBackMove"></button><button id="r3dRotL"></button><button id="r3dRotR"></button><button id="r3dScaleDown"></button><button id="r3dScaleUp"></button></div>';
 document.body.appendChild(modal);
 setTimeout(function(){
  try{
   if(window.R3DNewUI&&typeof window.R3DNewUI.render==='function')window.R3DNewUI.render();
  }catch(e){console.warn('[R3D UI] toolbar render',e);}
 },0);
 
modal.querySelector('#r3dMore').onclick=function(){var p=modal.querySelector('#r3dMorePanel');p.style.display=p.style.display==='none'?'block':'none';};modal.querySelector('#r3dLevelDown').onclick=function(){changeLevel(-1);};modal.querySelector('#r3dLevelUp').onclick=function(){changeLevel(1);};modal.querySelector('#r3dFloorDown').onclick=function(){changeLevel(-1);};modal.querySelector('#r3dFloorUp').onclick=function(){changeLevel(1);};modal.querySelector('#r3dFloorHome').onclick=function(){cameraHome();};var r3dLibrary=modal.querySelector('#r3dLibrary');if(r3dLibrary)r3dLibrary.onclick=function(){openAssetLibrary();};var r3dMaterials=modal.querySelector('#r3dMaterials');if(r3dMaterials)r3dMaterials.onclick=openMaterialCatalog;modal.querySelector('#r3dFill').onclick=function(){var k=prompt('Заливка текущего этажа. Материал: stone, wood, brick, plaster, metal, dark','stone');if(k&&MATERIAL_CATALOG[k])applySurfaceFill(k);};modal.querySelector('#r3dPaint').onclick=function(){togglePaintMode();};modal.querySelector('#r3dPaintFront').onclick=function(){setPaintSide('front');togglePaintMode(true);};modal.querySelector('#r3dPaintBack').onclick=function(){setPaintSide('back');togglePaintMode(true);};modal.querySelector('#r3dWallTools').onclick=openWallTools;modal.querySelector('#r3dWallTextures').onclick=function(){openRootTexturePicker('wall');};modal.querySelector('#r3dFloorTextures').onclick=function(){openRootTexturePicker('floor');};modal.querySelector('#r3dCutaway').onclick=function(){toggleCutaway();};modal.querySelector('#r3dUndo').onclick=undo;modal.querySelector('#r3dRedo').onclick=redo;modal.querySelector('#r3dDup').onclick=duplicateSelected;modal.querySelector('#r3dClose').onclick=function(){cancelAnimationFrame(raf);if(gizmo&&gizmo.parent)gizmo.parent.remove(gizmo);simpleToolsRefresh=null;modal.remove();};
 modal.querySelector('#r3dMove').onclick=function(){setGizmoMode('translate');};modal.querySelector('#r3dRotate').onclick=function(){setGizmoMode('rotate');};modal.querySelector('#r3dScale').onclick=function(){setGizmoMode('scale');};modal.querySelector('#r3dSnap').onclick=function(){snapGrid=!snapGrid;this.textContent='🧲 Сетка: '+(snapGrid?'ВКЛ':'ВЫКЛ');if(snapGrid){applySnap();syncSelectedTransform();updateGizmo();}};
 modal.querySelector('#r3dFront').onclick=function(){colorSide('front');};modal.querySelector('#r3dBack').onclick=function(){colorSide('back');};modal.querySelector('#r3dModel').onclick=addModel;modal.querySelector('#r3dTexture').onclick=function(){addTexture('front');};modal.querySelector('#r3dFrontTex').onclick=function(){textureSide('front');};modal.querySelector('#r3dBackTex').onclick=function(){textureSide('back');};modal.querySelector('#r3dLeft').onclick=function(){nudgeSelected(-.25,0);};modal.querySelector('#r3dRight').onclick=function(){nudgeSelected(.25,0);};modal.querySelector('#r3dForward').onclick=function(){nudgeSelected(0,-.25);};modal.querySelector('#r3dBackMove').onclick=function(){nudgeSelected(0,.25);};modal.querySelector('#r3dRotL').onclick=function(){rotateSelected(-15);};modal.querySelector('#r3dRotR').onclick=function(){rotateSelected(15);};modal.querySelector('#r3dScaleDown').onclick=function(){scaleSelected(.9);};modal.querySelector('#r3dScaleUp').onclick=function(){scaleSelected(1.1);};modal.querySelector('#r3dSave').onclick=function(){saveMap();alert('Карта и assetRef сохранены.');};setEditorMode('build');
 (async function(){
  try{
   var threeModule=await import('./app/vendor/three.module.min.js');
   var loaderModule=await import('./app/vendor/GLTFLoader.js');
   THREE=threeModule;
   GLTFLoader=loaderModule.GLTFLoader;
   if(!THREE||!GLTFLoader)throw new Error('Three.js modules loaded without required exports');
   var host=modal.querySelector('#map3dRealCanvas');renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(global.devicePixelRatio||1,1.6));renderer.setSize(host.clientWidth,host.clientHeight,false);renderer.domElement.style.touchAction='none';renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement);cameraControlPanel(host);
   scene=new THREE.Scene();scene.background=new THREE.Color('#10151c');root=new THREE.Group();scene.add(root);camera=new THREE.PerspectiveCamera(55,1,.05,1000);raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
   scene.add(new THREE.HemisphereLight(0xffffff,0x223344,2));var dl=new THREE.DirectionalLight(0xffffff,2);dl.position.set(10,20,5);scene.add(dl);makeGizmo();
   var dragging=false,lastX=0,lastY=0,button=0,roomDrawStart=null,roomDrawActive=false;
   renderer.domElement.addEventListener('pointerdown',function(ev){var gp=sceneGroundPoint(ev);if(gp)lastScenePoint=gp;if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&floorToolArmed){applyFloorToolAt(ev,true);floorDrawActive=true;ev.preventDefault();return;}if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&wallToolArmed){var wx=Math.floor(gp.x),wy=Math.floor(gp.z),wl=Number(map.levels&&map.levels.current)||0,wk=wallKey(wl,wx,wy),w=map.walls&&map.walls[wk];if(!w){map.walls=map.walls||{};map.walls[wk]={level:wl,x:wx,y:wy,dir:'n',length:1,height:2.5,thickness:.09,color:'#777777',material:'stone',front:{texture:'none',color:'#777777'},back:{texture:'none',color:'#777777'},__key:wk};saveMap();build();updateInfo();}ev.preventDefault();return;}if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&roomToolArmed){if(beginOpeningDrag(ev)){ev.preventDefault();return;}if(beginWallHandleDrag(ev)){ev.preventDefault();return;}if(sceneEditableHit(ev)&&selectedWall()){pick(ev);ev.preventDefault();return;}}if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&roomToolArmed&&!sceneEditableHit(ev)){roomDrawStart={x:gp.x,y:gp.z};roomDrawActive=true;dragging=false;showRoomPreview(roomDrawStart,roomDrawStart);ev.preventDefault();return;}if(gp&&pendingLibraryAsset&&ev.button===0){placeLibraryAsset(pendingLibraryAsset.id,pendingLibraryAsset.name,gp);var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Модель поставлена. Выберите следующий инструмент.';ev.preventDefault();return;}touches[ev.pointerId]={clientX:ev.clientX,clientY:ev.clientY};if(ev.pointerType==='touch'&&Object.keys(touches).length>=2){beginTouchGesture();dragging=false;return;}var gh=ev.button===0?gizmoHit(ev):null;if(gh&&selected&&editorMode==='objects'){gizmoAxis=gh;gizmoDragging=true;gizmoStartX=ev.clientX;gizmoStartY=ev.clientY;gizmoStartPos=selected.position.clone();gizmoStartRot=selected.rotation.y;gizmoStartScale=selected.scale.clone();renderer.domElement.setPointerCapture&&renderer.domElement.setPointerCapture(ev.pointerId);return;}dragging=true;lastX=ev.clientX;lastY=ev.clientY;button=ev.button;renderer.domElement.setPointerCapture&&renderer.domElement.setPointerCapture(ev.pointerId);if(button===0){if(paintMode&&editorMode==='finish'){painting=true;paintHistoryStarted=false;paintedDuringStroke={};paintRay(ev);}else if(sceneEditableHit(ev))pick(ev);}});
   renderer.domElement.addEventListener('dblclick',function(){if(selected&&selected.userData&&selected.userData.mapObjectId){var o=(map.objects||[]).find(function(x){return String(x.id)===String(selected.userData.mapObjectId);});if(o){var v=prompt('Точный X Y Z, например 2 3 0',Number(o.x||0)+' '+Number(o.y||0)+' '+Number(o.z||0));if(v){var p=v.trim().split(/\\s+/).map(Number);if(p.length===3&&p.every(function(n){return Number.isFinite(n)})){selected.position.set(p[0]+.5,p[2],p[1]+.5);syncSelectedTransform();updateInfo();}}}}});
   renderer.domElement.addEventListener('pointermove',function(ev){if(openingDrag&&openingDrag.widthResize){updateOpeningHandleDrag(ev);return;}
 if(openingDrag){updateOpeningDrag(ev);return;}if(wallDrag){updateWallDrag(ev);return;}if(floorDrawActive&&floorToolArmed&&editorMode==='build'){applyFloorToolAt(ev,true);}if(roomDrawActive&&roomDrawStart){var rg=sceneGroundPoint(ev);if(rg)showRoomPreview(roomDrawStart,{x:rg.x,y:rg.z});}if(touches[ev.pointerId]){touches[ev.pointerId].clientX=ev.clientX;touches[ev.pointerId].clientY=ev.clientY;}if(Object.keys(touches).length>=2){updateTouchGesture();return;}if(gizmoDragging){gizmoMove(ev);return;}if(painting&&paintMode&&editorMode==='finish'){paintRay(ev);return;}if(!dragging)return;var dx=ev.clientX-lastX,dy=ev.clientY;lastX=ev.clientX;lastY=ev.clientY;if(button===0){controls.yaw-=dx*.008;controls.pitch=Math.max(.15,Math.min(1.45,controls.pitch-dy*.006));}else if(button===1||ev.shiftKey){var pan=.015*controls.distance;controls.target.x-=dx*pan;controls.target.z+=dy*pan;}});
   renderer.domElement.addEventListener('pointerup',function(ev){if(openingDrag){if(openingDrag.widthResize&&openingDrag.changed&&openingDrag.history){undoStack.push(openingDrag.history);redoStack=[];saveMap();build();updateInfo();}else{finishOpeningDrag();}}if(wallDrag){finishWallDrag();}floorDrawActive=false;lastFloorCell=null;if(roomDrawActive&&roomDrawStart){var gp=sceneGroundPoint(ev);hideRoomPreview();if(gp){createRoomFromPoints(roomDrawStart,{x:gp.x,y:gp.z});var h=document.getElementById('r3dQuickHint');if(h){var rb=roomBounds(roomDrawStart,{x:gp.x,y:gp.z});h.textContent='Комната '+(rb.x2-rb.x1)+' × '+(rb.y2-rb.y1)+' клеток создана. Теперь можно расставлять объекты.';}}roomDrawStart=null;roomDrawActive=false;}delete touches[ev.pointerId];painting=false;paintHistoryStarted=false;paintedDuringStroke={};dragging=false;gizmoDragging=false;gizmoAxis=null;setGizmoHighlight(null);if(Object.keys(touches).length<2)touchGesture=null;});renderer.domElement.addEventListener('pointercancel',function(ev){if(openingDrag)openingDrag=null;if(wallDrag)wallDrag=null;delete touches[ev.pointerId];painting=false;paintHistoryStarted=false;paintedDuringStroke={};dragging=false;gizmoDragging=false;gizmoAxis=null;touchGesture=null;setGizmoHighlight(null);});
   renderer.domElement.addEventListener('pointermove',function(ev){if(!gizmoDragging){var gh=gizmoHit(ev);setGizmoHighlight(gh);}});renderer.domElement.addEventListener('wheel',function(ev){ev.preventDefault();controls.distance=Math.max(3,Math.min(150,controls.distance*Math.exp(ev.deltaY*.001)));},{passive:false});
   renderer.domElement.addEventListener('dragover',function(ev){ev.preventDefault();});renderer.domElement.addEventListener('drop',function(ev){ev.preventDefault();var id=ev.dataTransfer&&ev.dataTransfer.getData('text/plain');if(!id)return;var rr=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-rr.left)/rr.width)*2-1;mouse.y=-((ev.clientY-rr.top)/rr.height)*2+1;raycaster.setFromCamera(mouse,camera);var g=root.children.find(function(x){return x.userData&&x.userData.editorKind==='ground';});var hit=g?raycaster.intersectObject(g,true)[0]:null;getAsset(id).then(function(rec){ensureMapCollections();pushHistory();map.objects.push({id:'obj_'+Date.now().toString(36),name:rec&&rec.meta&&rec.meta.name||'Asset',assetId:id,x:hit?hit.point.x-.5:1,y:hit?hit.point.z-.5:1,z:0,level:Number(map.levels&&map.levels.current)||0,scaleX:1,scaleY:1,scaleZ:1,rotation:0});saveMap();build();});});renderer.domElement.addEventListener('contextmenu',function(ev){ev.preventDefault();});
   window.addEventListener('resize',resize);resize();ensureMapCollections();cameraHome();updateGizmo();openAssetDB().catch(function(e){console.warn('IndexedDB unavailable; asset persistence disabled',e);});build();frame();
   modal.querySelector('#map3dRealInfo').textContent='WebGL готов • '+(map.name||'Новая карта');
  }catch(e){var em=e&&e.message||String(e);modal.querySelector('#map3dRealInfo').textContent='Ошибка WebGL: '+em;try{console.error('[DND 3D] startup failed',e);if(typeof global.dndDebugLog==='function')global.dndDebugLog('3D map startup failed: '+em,'error');}catch(_){}alert('Не удалось запустить настоящий 3D: '+em+'\nСтарый редактор не удалён.');}
 })();
}
global.R3DEditorAPI={setMode:function(m){setEditorMode(m);},buildRoom:function(){setEditorMode('build');roomToolArmed=true;wallToolArmed=false;floorToolArmed=false;var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Комната: потяните по карте от угла до угла.';},buildWall:function(){setEditorMode('build');wallToolArmed=true;roomToolArmed=false;floorToolArmed=false;var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Стена: нажимайте по клеткам, чтобы создавать стены.';},buildFloor:function(){setEditorMode('build');roomToolArmed=false;wallToolArmed=false;floorToolArmed=true;togglePaintMode(false);var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Пол: проведите пальцем по клеткам. Нет плитки — пустота и /* V70.37.18 — этажность, пустоты пола, размер карты и редакторские инструменты
 * V70.37.14 — removed experimental wall/floor/finish controls; reset for clean rebuild
 * V70.37.12 — right-side popup system for all editor panels
 * V70.37.08 — editor controls, room perimeter, cutaway scope + toolbar hit-testing
 * V70.37.07 — compact Sims bar + real selection orbit camera
 * V70.36.91 — Sims-style build camera, cutaway walls and floor controls
 * V70.36.90 — OTA release
 * V70.36.89 — local ES-module WebView loader\n * V70.36.85 — Sims-style cutaway camera walls\n * V70.36.81 — GLB placement and async build race hardening
 * V70.36.80 — multi-selection and mass material finishing
 * V70.36.79 — touch paint brush for mobile finishing
 * V70.36.78 — editor stabilization: fill, openings, asset drag/drop
 * V70.36.77 — Sims-like UX + texture asset library
 * V70.36.75 — true WebGL 3D map editor
 * Three.js renderer + GLB/GLTF loading. Reads the existing V15 map format from localStorage.
 * The legacy canvas editor remains available as fallback.
 */
(function(global){
'use strict';
var THREE=null,GLTFLoader=null,renderer=null,scene=null,camera=null,root=null,gizmo=null,gizmoAxis=null,gizmoDragging=false,gizmoStartX=0,gizmoStartY=0,gizmoStartPos=null,gizmoStartRot=0,gizmoStartScale=null,raf=0,map=null,selected=null,mode='orbit',editorMode='build',transformMode='translate',raycaster=null,mouse=null,assetDB=null,assetCache={},controls={yaw:.8,pitch:.8,distance:24,target:{x:0,y:0,z:0}},touches={},touchGesture=null,snapGrid=true,snapSize=0.25;
var VERSION='V70.37.18';
// Разрез — только ручной инструмент редактора. По умолчанию стены всегда цельные.
var cutawayWalls=false,cutawayTick=0;
var undoStack=[],redoStack=[],historyBusy=false;
var openingDrag=null,roomPreview=null,wallDrag=null,selectedItems=[],buildGeneration=0,lastScenePoint=null,pendingLibraryAsset=null,paintMode=false,painting=false,paintHistoryStarted=false,paintMaterial='stone',paintSide='front',paintedDuringStroke={},roomToolArmed=false,wallToolArmed=false,floorToolArmed=false,floorDrawActive=false,lastFloorCell=null,simpleToolsRefresh=null;
function openingForSelected(){var w=selectedWall();return w&&w.opening?w.opening:null;}
function openingHit(ev){
 if(editorMode!=='build')return null;
 var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true);
 for(var i=0;i<hits.length;i++){var o=hits[i].object;if(o&&o.userData&&o.userData.mapOpening)return o;}
 return null;
}
function beginOpeningDrag(ev){
 var hit=openingHit(ev);if(!hit)return false;
 var wk=hit.userData.wallKey;if(!wk||!map||!map.walls||!map.walls[wk])return false;
 var w=map.walls[wk],gp=sceneGroundPoint(ev);if(!gp)return false;
 selected=hit;selectedItems=[hit];updateInfo();
 openingDrag={key:wk,startX:gp.x,startY:gp.z,oldOffset:Number(w.opening&&w.opening.offset)||0,dir:w.dir||'n',changed:false};
 return true;
}
function updateOpeningDrag(ev){
 if(!openingDrag||!map||!map.walls)return;
 var w=map.walls[openingDrag.key],op=w&&w.opening;if(!w||!op)return;
 var gp=sceneGroundPoint(ev);if(!gp)return;
 var delta=openingDrag.dir==='n'?gp.x-openingDrag.startX:gp.z-openingDrag.startY;
 var max=Math.max(0,(Number(w.length)||1)-(Number(op.width)||.9));
 var next=Math.max(0,Math.min(max,openingDrag.oldOffset+delta));
 if(snapGrid)next=Math.round(next/snapSize)*snapSize;
 if(Math.abs(next-(Number(op.offset)||0))<.001)return;
 op.offset=next;openingDrag.changed=true;build();updateInfo();
}
function finishOpeningDrag(){
 if(!openingDrag)return;
 if(openingDrag.changed){pushHistory();saveMap();build();updateInfo();}
 openingDrag=null;
}
function moveOpeningAlongWall(delta){var w=selectedWall(),op=openingForSelected();if(!w||!op)return;pushHistory();op.offset=Math.max(0,Math.min(Math.max(.01,Number(w.length)||1)-Number(op.width||.9),Number(op.offset||0)+delta));saveMap();build();updateInfo();}
function addOpeningVisuals(w){
 var op=w.opening;if(!op)return;
 var h=Math.max(.5,Number(w.height)||2.5),len=Math.max(.1,Number(w.length)||1),t=Math.max(.03,Number(w.thickness)||.09),levelY=(Number(w.level)||0)*3,x=Number(w.x)||0,y=Number(w.y)||0;
 var ow=Math.min(len,Math.max(.1,Number(op.width)||.9)),oh=Math.min(h,Math.max(.1,Number(op.height)||2.1)),sill=Math.max(0,Math.min(h-oh,Number(op.sill)||0)),off=Math.max(0,Math.min(len-ow,Number(op.offset)||0));
 var mat=material(op.type==='door'?'#6b4528':'#7fa8c7',op.type==='door'?.7:.25),frame=material('#3b3027',.55);
 if(w.dir==='n'){
   if(op.type==='door'){
     var leaf=addBox('door:'+w.level+':'+x+':'+y,x+off,levelY+sill,y-t*.65,ow,oh,.055,[mat]);leaf.userData.editorKind='object';leaf.userData.mapOpening=true;leaf.userData.wallKey=wallKey(Number(w.level)||0,x,y);
   }else{
     var glass=addBox('window:'+w.level+':'+x+':'+y,x+off,levelY+sill,y-t*.65,ow,oh,.05,[mat]);glass.userData.editorKind='object';glass.userData.mapOpening=true;glass.userData.wallKey=wallKey(Number(w.level)||0,x,y);
     var f1=addBox('windowFrame:'+x+':'+y,x+off,levelY+sill,y-t*.7,.06,oh,.08,[frame]);f1.userData.editorKind='object';
     var f2=addBox('windowFrame:'+x+':'+y,x+off+ow-.06,levelY+sill,y-t*.7,.06,oh,.08,[frame]);f2.userData.editorKind='object';
   }
 }else{
   if(op.type==='door'){
     var leaf2=addBox('door:'+w.level+':'+x+':'+y,x+1-t*.65,levelY,y+off,.055,oh,ow,[mat]);leaf2.userData.editorKind='object';leaf2.userData.mapOpening=true;leaf2.userData.wallKey=wallKey(Number(w.level)||0,x,y);
   }else{
     var glass2=addBox('window:'+w.level+':'+x+':'+y,x+1-t*.65,levelY+sill,y+off,.05,oh,ow,[mat]);glass2.userData.editorKind='object';glass2.userData.mapOpening=true;glass2.userData.wallKey=wallKey(Number(w.level)||0,x,y);
     var f3=addBox('windowFrame:'+x+':'+y,x+1-t*.7,levelY+sill,y+off,.08,oh,.06,[frame]);f3.userData.editorKind='object';
     var f4=addBox('windowFrame:'+x+':'+y,x+1-t*.7,levelY+sill,y+off+ow-.06,.08,oh,.06,[frame]);f4.userData.editorKind='object';
   }
 }
}
function editOpeningPosition(){var op=openingForSelected();if(!op){alert('Выберите стену с дверью или окном.');return;}moveOpeningAlongWall(.25);}
function duplicateSelected(){if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}var o=(map.objects||[]).find(function(x){return String(x.id)===String(selected.userData.mapObjectId);});if(!o)return;pushHistory();var n=JSON.parse(JSON.stringify(o));n.id='obj_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,6);n.x=Number(n.x||0)+.5;n.y=Number(n.y||0)+.5;map.objects.push(n);saveMap();build();updateInfo();}
function applySurfaceFill(key){if(!map||!map.surfaces||!MATERIAL_CATALOG[key])return;var level=Number(map.levels&&map.levels.current)||0,targets=Object.keys(map.surfaces).filter(function(k){return Number(k.split(':')[0])===level&&map.surfaces[k];});if(!targets.length)return;pushHistory();targets.forEach(function(k){var ss=map.surfaces[k];ss.material=key;ss.color=MATERIAL_CATALOG[key].color;});saveMap();build();updateInfo();}

function snapshotMap(){try{return JSON.stringify(map);}catch(e){return null;}}
function pushHistory(){if(!map||historyBusy)return;var snap=snapshotMap();if(snap){undoStack.push(snap);if(undoStack.length>60)undoStack.shift();redoStack=[];}}
function restoreSnapshot(snap){if(!snap)return;historyBusy=true;try{map=JSON.parse(snap);saveMap();build();selected=null;updateGizmo();updateInfo();}finally{historyBusy=false;}}
function undo(){if(!undoStack.length){alert('Отменять больше нечего.');return;}var cur=snapshotMap(),prev=undoStack.pop();if(cur)redoStack.push(cur);restoreSnapshot(prev);}
function redo(){if(!redoStack.length){alert('Повторять больше нечего.');return;}var cur=snapshotMap(),next=redoStack.pop();if(cur)undoStack.push(cur);restoreSnapshot(next);}
function wallKey(level,x,y){return String(level)+':'+String(x)+':'+String(y);}
function roomWallKey(level,x,y,dir){return String(level)+':'+String(x)+':'+String(y)+':'+String(dir||'n');}
function roomBounds(a,b){
 var cols=Number(map&&map.grid&&map.grid.cols)||20,rows=Number(map&&map.grid&&map.grid.rows)||20;
 return {x1:Math.max(0,Math.min(cols,Math.floor(Math.min(a.x,b.x)))),y1:Math.max(0,Math.min(rows,Math.floor(Math.min(a.y,b.y)))),x2:Math.max(0,Math.min(cols,Math.ceil(Math.max(a.x,b.x)))),y2:Math.max(0,Math.min(rows,Math.ceil(Math.max(a.y,b.y))))};
}
function showRoomPreview(a,b){
 if(!scene)return;
 var q=roomBounds(a,b),w=q.x2-q.x1,h=q.y2-q.y1;
 if(!roomPreview){
   roomPreview=new THREE.Group();roomPreview.name='roomPreview';
   var mat=new THREE.MeshBasicMaterial({color:0x66ccff,transparent:true,opacity:.18,depthWrite:false});
   var geo=new THREE.BoxGeometry(1,.035,1);roomPreview.userData.previewMaterial=mat;roomPreview.userData.previewGeo=geo;
   scene.add(roomPreview);
 }
 while(roomPreview.children.length)roomPreview.remove(roomPreview.children[0]);
 if(w<1||h<1)return;
 var m=roomPreview.userData.previewMaterial,g=roomPreview.userData.previewGeo;
 var mesh=new THREE.Mesh(new THREE.BoxGeometry(w,.035,h),m);mesh.position.set(q.x1+w/2,.03,q.y1+h/2);roomPreview.add(mesh);
}
function hideRoomPreview(){if(roomPreview){roomPreview.visible=false;while(roomPreview.children.length)roomPreview.remove(roomPreview.children[0]);}}
function ensureRoomWall(level,s){
 var k=roomWallKey(level,s[0],s[1],s[2]),old=map.walls[k],sx=Number(s[0])||0,sy=Number(s[1])||0,sl=Math.max(.25,Number(s[3])||.25),dir=s[2];
 if(!old){
   var keys=Object.keys(map.walls||{}),merged=null;
   for(var i=0;i<keys.length;i++){
     var q=map.walls[keys[i]];
     if(!q||!q.__roomAuto||q.opening||q.dir!==dir||Number(q.level||0)!==level)continue;
     var qx=Number(q.x)||0,qy=Number(q.y)||0,ql=Math.max(.25,Number(q.length)||.25);
     if(dir==='n'&&qy===sy&&sx<=qx+ql&&sx+sl>=qx){merged={key:keys[i],w:q,start:Math.min(sx,qx),end:Math.max(sx+sl,qx+ql)};break;}
     if(dir==='e'&&qx===sx&&sy<=qy+ql&&sy+sl>=qy){merged={key:keys[i],w:q,start:Math.min(sy,qy),end:Math.max(sy+sl,qy+ql)};break;}
   }
   if(merged){
     delete map.walls[merged.key];
     var nx=dir==='n'?merged.start:sx,ny=dir==='e'?merged.start:sy;
     if(dir==='n'){nx=merged.start;ny=sy;}else{nx=sx;ny=merged.start;}
     var nk=roomWallKey(level,nx,ny,dir);map.walls[nk]={level:level,x:nx,y:ny,dir:dir,length:merged.end-merged.start,height:Number(merged.w.height)||2.5,thickness:Number(merged.w.thickness)||.09,color:merged.w.color||'#777777',material:merged.w.material||'stone',front:merged.w.front||{texture:'none',color:'#777777'},back:merged.w.back||{texture:'none',color:'#777777'},__roomAuto:true,__key:nk};
     return;
   }
   map.walls[k]={level:level,x:sx,y:sy,dir:dir,length:sl,height:2.5,thickness:.09,color:'#777777',material:'stone',front:{texture:'none',color:'#777777'},back:{texture:'none',color:'#777777'},__roomAuto:true,__key:k};
   return;
 }
 if(old.__roomAuto&&old.dir===dir&&!old.opening){
   old.length=Math.max(Number(old.length)||0,sl);
 }
}
function createRoomFromPoints(a,b){
 if(!map)return;
 var level=Number(map.levels&&map.levels.current)||0;
 var q=roomBounds(a,b),x1=q.x1,y1=q.y1,x2=q.x2,y2=q.y2;
 if(x2-x1<1||y2-y1<1){hideRoomPreview();alert('Комната слишком маленькая. Потяните рамку хотя бы на 1 клетку.');return false;}
 pushHistory();map.walls=map.walls||{};map.surfaces=map.surfaces||{};
 for(var fy=y1;fy<y2;fy++)for(var fx=x1;fx<x2;fx++){var fk=wallKey(level,fx,fy);if(!map.surfaces[fk])map.surfaces[fk]={level:level,x:fx,y:fy,material:'stone',texture:'none',color:'#3d403a',__roomAuto:true};}
 var specs=[
  [x1,y1,'n',x2-x1],
  [x1,y2,'n',x2-x1],
  [x1-1,y1,'e',y2-y1],
  [x2-1,y1,'e',y2-y1]
 ];
 // Создание комнаты атомарно задаёт четыре стороны. Никаких «слияний» при первичном создании:
 // соседняя старая стена не может затереть одну из сторон новой комнаты.
 specs.forEach(function(s){
   var k=roomWallKey(level,s[0],s[1],s[2]), old=map.walls[k];
   if(old&&!old.__roomAuto){
     // Существующую пользовательскую стену не трогаем: новая сторона получает отдельный ключ.
     k=roomWallKey(level,s[0],s[1],s[2]+'r'+Date.now());
   }
   var w={level:level,x:Number(s[0])||0,y:Number(s[1])||0,dir:s[2],length:Math.max(.25,Number(s[3])||.25),height:2.5,thickness:.09,color:'#777777',material:'stone',front:{texture:'none',color:'#777777'},back:{texture:'none',color:'#777777'},__roomAuto:true,__key:k};
   map.walls[k]=w;
 });
 // Четыре стороны уже созданы атомарно выше. Слияние здесь запрещено.
 saveMap();build();updateInfo();return true;
}
function deleteSelected(){
 if(!selected||!map){alert('Сначала выберите стену или объект.');return;}
 var w=selectedWall();
 if(w){
   var key=selected.name.slice(5);
   if(map.walls&&map.walls[key]){pushHistory();delete map.walls[key];saveMap();selected=null;selectedItems=[];build();updateGizmo();updateInfo();}
   return;
 }
 if(selected.userData&&selected.userData.mapObjectId){
   var id=String(selected.userData.mapObjectId);
   var before=(map.objects||[]).length;
   pushHistory();map.objects=(map.objects||[]).filter(function(o){return String(o.id)!==id;});
   if(map.objects.length!==before){saveMap();selected=null;selectedItems=[];build();updateGizmo();updateInfo();}
 }
}
function wallHandleHit(ev){
 if(editorMode!=='build')return null;
 var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true);
 for(var i=0;i<hits.length;i++){var o=hits[i].object;if(o&&o.userData&&o.userData.wallHandle)return o;}
 return null;
}
function inferRoomFromWall(w){
 if(!w||!map||!map.walls)return null;
 var level=Number(w.level)||0,x=Number(w.x)||0,y=Number(w.y)||0,len=Number(w.length)||0,dir=w.dir,walls=map.walls,keys=Object.keys(walls);
 function overlap(a1,a2,b1,b2){return Math.min(a2,b2)>Math.max(a1,b1)+.01;}
 if(dir==='n'){
   var candidates=keys.map(function(k){return walls[k];}).filter(function(q){return q&&q.__roomAuto&&q.dir==='n'&&Number(q.level||0)===level&&Number(q.x||0)!==x&&overlap(x,x+len,Number(q.x)||0,(Number(q.x)||0)+(Number(q.length)||0));});
   for(var ci=0;ci<candidates.length;ci++){
     var bb=candidates[ci],bx=Number(bb.x)||0,bl=Number(bb.length)||0,rx1=Math.max(x,bx),rx2=Math.min(x+len,bx+bl),y1=Math.min(y,Number(bb.y)||0),y2=Math.max(y,Number(bb.y)||0);
     var left=walls[roomWallKey(level,rx1-1,y1,'e')],right=walls[roomWallKey(level,rx2-1,y1,'e')];
     if(left&&right&&left.dir==='e'&&right.dir==='e')return {level:level,x1:rx1,x2:rx2,y1:y1,y2:y2,top:w,bottom:bb,left:left,right:right,axis:'x'};
   }
 }
 if(dir==='e'){
   var candidates2=keys.map(function(k){return walls[k];}).filter(function(q){return q&&q.__roomAuto&&q.dir==='e'&&Number(q.level||0)===level&&Number(q.y||0)!==y&&overlap(y,y+len,Number(q.y)||0,(Number(q.y)||0)+(Number(q.length)||0));});
   for(var cj=0;cj<candidates2.length;cj++){
     var bb2=candidates2[cj],by=Number(bb2.y)||0,bl2=Number(bb2.length)||0,ry1=Math.max(y,by),ry2=Math.min(y+len,by+bl2),x1=Math.min(x,Number(bb2.x)||0),x2=Math.max(x,Number(bb2.x)||0);
     var top=walls[roomWallKey(level,x1,ry1,'n')],bottom=walls[roomWallKey(level,x1,ry2-1,'n')];
     if(top&&bottom&&top.dir==='n'&&bottom.dir==='n')return {level:level,x1:x1,x2:x2+1,y1:ry1,y2:ry2,top:top,bottom:bb2,left:w,right:bb2,axis:'y'};
   }
 }
 return null;
}
function resizeRoomBoundary(w,handle,delta){
 var r=inferRoomFromWall(w);if(!r)return false;
 var level=r.level;
 if(r.axis==='x'){
   var oldX1=r.x1,oldX2=r.x2;
   if(handle==='start'){var nx=Math.max(0,oldX1+delta);if(nx>=oldX2-.25)return false;delta=nx-oldX1;r.x1=nx;}
   else {var nx2=Math.min(Number(map.grid&&map.grid.cols)||20,oldX2+delta);if(nx2<=oldX1+.25)return false;delta=nx2-oldX2;r.x2=nx2;}
   if(!r.top.__roomAuto||!r.bottom.__roomAuto||!r.left.__roomAuto||!r.right.__roomAuto)return false;
   r.top.length=r.x2-r.x1;r.bottom.length=r.x2-r.x1;
   if(handle==='start'){r.top.x=r.x1;r.bottom.x=r.x1;r.left.x=r.x1;r.left.y=r.y1;}
   else {r.right.x=r.x2-1;r.right.y=r.y1;}
 }else{
   var oldY1=r.y1,oldY2=r.y2;
   if(handle==='start'){var ny=Math.max(0,oldY1+delta);if(ny>=oldY2-.25)return false;delta=ny-oldY1;r.y1=ny;}
   else {var ny2=Math.min(Number(map.grid&&map.grid.rows)||20,oldY2+delta);if(ny2<=oldY1+.25)return false;delta=ny2-oldY2;r.y2=ny2;}
   if(!r.top.__roomAuto||!r.bottom.__roomAuto||!r.left.__roomAuto||!r.right.__roomAuto)return false;
   r.left.length=r.y2-r.y1;r.right.length=r.y2-r.y1;
   if(handle==='start'){r.top.y=r.y1;r.bottom.y=r.y2;r.left.y=r.y1;}
   else {r.bottom.y=r.y2;r.right.y=r.y1;}
 }
 if(map.surfaces){
   var minx=Math.floor(Math.min(oldX1,r.x1)),maxx=Math.ceil(Math.max(oldX2,r.x2)),miny=Math.floor(Math.min(oldY1,r.y1)),maxy=Math.ceil(Math.max(oldY2,r.y2));
   for(var yy=miny;yy<maxy;yy++)for(var xx=minx;xx<maxx;xx++){var sk=wallKey(level,xx,yy);if(r.x1<=xx&&xx<r.x2&&r.y1<=yy&&yy<r.y2){if(!map.surfaces[sk])map.surfaces[sk]={level:level,x:xx,y:yy,material:'stone',texture:'none',color:'#3d403a'};}else if(map.surfaces[sk]&&map.surfaces[sk].__roomAuto)delete map.surfaces[sk];}
 }
 return true;
}
function beginWallHandleDrag(ev){
 var hit=wallHandleHit(ev);if(!hit)return false;
 var key=hit.userData.wallKey,w=map&&map.walls&&map.walls[key];if(!w)return false;
 var gp=sceneGroundPoint(ev);if(!gp)return false;
 var wallObj=root.children.find(function(o){return o&&o.name==='wall:'+key;});selected=wallObj||hit;selectedItems=[selected];updateInfo();
 wallDrag={key:key,startX:Number(w.x)||0,startY:Number(w.y)||0,oldLength:Number(w.length)||1,dir:w.dir||'n',handle:hit.userData.handle,history:snapshotMap(),changed:false};
 return true;
}
function beginWallDrag(ev){
 if(editorMode!=='build'||!selected)return false;
 var w=selectedWall();if(!w)return false;
 var gp=sceneGroundPoint(ev);if(!gp)return false;
 wallDrag={key:selected.name.slice(5),startX:gp.x,startY:gp.z,oldLength:Number(w.length)||1,dir:w.dir||'n',handle:'end',history:snapshotMap(),changed:false};
 return true;
}
function updateWallDrag(ev){
 if(!wallDrag||!map||!map.walls)return;
 var w=map.walls[wallDrag.key];if(!w)return;
 var gp=sceneGroundPoint(ev);if(!gp)return;
 var delta=wallDrag.handle==='start'
   ?(wallDrag.dir==='n'?wallDrag.startX-gp.x:wallDrag.startY-gp.z)
   :(wallDrag.dir==='n'?gp.x-wallDrag.startX:gp.z-wallDrag.startY);
 var len=Math.max(.25,wallDrag.oldLength+delta);
 if(snapGrid)len=Math.max(.25,Math.round(len/snapSize)*snapSize);
 var room=inferRoomFromWall(w);
 if(room){var roomDelta=wallDrag.handle==='start'?(wallDrag.dir==='n'?gp.x-wallDrag.startX:gp.z-wallDrag.startY):(wallDrag.dir==='n'?gp.x-wallDrag.startX:gp.z-wallDrag.startY);if(snapGrid)roomDelta=Math.round(roomDelta/snapSize)*snapSize;if(resizeRoomBoundary(w,wallDrag.handle,roomDelta)){wallDrag.changed=true;build();updateInfo();return;}}
 if(Math.abs(len-(Number(w.length)||1))<.001)return;
 if(wallDrag.handle==='start'){
   if(wallDrag.dir==='n')w.x=wallDrag.startX+(wallDrag.oldLength-len);
   else w.y=wallDrag.startY+(wallDrag.oldLength-len);
 }
 w.length=len;wallDrag.changed=true;build();updateInfo();
}
function finishWallDrag(){
 if(!wallDrag)return;
 if(wallDrag.changed&&wallDrag.history){undoStack.push(wallDrag.history);redoStack=[];saveMap();build();updateInfo();}
 wallDrag=null;
}
function selectedWall(){if(!selected||!selected.name||selected.name.indexOf('wall:')!==0)return null;var k=selected.name.slice(5);return map&&map.walls?map.walls[k]:null;}
function editSelectedWall(){var w=selectedWall();if(!w){alert('Выберите стену в режиме строительства.');return;}var old=JSON.stringify(w);var len=prompt('Длина стены в клетках',String(Number(w.length)||1));if(len===null)return;var thick=prompt('Толщина стены',String(Number(w.thickness)||.09));if(thick===null)return;var height=prompt('Высота стены',String(Number(w.height)||2.5));if(height===null)return;len=Number(len);thick=Number(thick);height=Number(height);if(!Number.isFinite(len)||!Number.isFinite(thick)||!Number.isFinite(height)){alert('Неверные значения.');return;}pushHistory();w.length=Math.max(.1,len);w.thickness=Math.max(.03,thick);w.height=Math.max(.5,height);saveMap();build();updateInfo();}
function editOpening(type){var w=selectedWall();if(!w){alert('Сначала выберите стену.');return;}var old=w.opening||{},isDoor=type==='door',max=Math.max(.35,Number(w.length)||1);pushHistory();w.opening={type:type,width:Math.min(max,Number(old.width)||(isDoor?.9:.9)),height:Number(old.height)||(isDoor?2.1:1.2),sill:Number(old.sill)||(isDoor?0:.9),offset:Math.max(0,Math.min(max-Number(old.width||.9),Number(old.offset)||0))};saveMap();build();updateInfo();var h=document.getElementById('r3dQuickHint');if(h)h.textContent=(isDoor?'🚪 Дверь':'🪟 Окно')+' создано. Теперь используйте кнопки проёма.';}
function clearOpening(){var w=selectedWall();if(!w)return;pushHistory();w.opening=null;saveMap();build();updateInfo();}

var ROOT_TEXTURE_CATALOG={
 wall:[
  {file:'wall_brick_red.png',name:'Кирпич — красный'},
  {file:'wall_concrete.png',name:'Бетон'},
  {file:'wall_half_timber.png',name:'Фахверк'},
  {file:'wall_marble_dark.png',name:'Мрамор — тёмный'},
  {file:'wall_marble_light.png',name:'Мрамор — светлый'},
  {file:'wall_moss_stone.png',name:'Камень с мхом'},
  {file:'wall_old_plaster.png',name:'Старая штукатурка'},
  {file:'wall_plaster_dark.png',name:'Штукатурка — тёмная'},
  {file:'wall_plaster_light.png',name:'Штукатурка — светлая'},
  {file:'wall_plaster_panel.png',name:'Штукатурка — панели'},
  {file:'wall_slate.png',name:'Сланец'},
  {file:'wall_stone_dark.png',name:'Камень — тёмный'},
  {file:'wall_stone_light.png',name:'Камень — светлый'},
  {file:'wall_stone_masonry.png',name:'Каменная кладка'},
  {file:'wall_wallpaper.png',name:'Обои'},
  {file:'wall_white_plaster.png',name:'Белая штукатурка'},
  {file:'wall_wood_dark.png',name:'Дерево — тёмное'},
  {file:'wall_wood_light.png',name:'Дерево — светлое'}
 ],
 floor:[
  {file:'floor_ceramic_tile_dark.png',name:'Керамическая плитка — тёмная'},
  {file:'floor_ceramic_tile_light.png',name:'Керамическая плитка — светлая'},
  {file:'floor_checker_tile.png',name:'Шахматная плитка'},
  {file:'floor_cobblestone.png',name:'Брусчатка'},
  {file:'floor_earth.png',name:'Земля'},
  {file:'floor_grass.png',name:'Трава'},
  {file:'floor_hex_tile.png',name:'Шестигранная плитка'},
  {file:'floor_marble_dark.png',name:'Мрамор — тёмный'},
  {file:'floor_marble_light.png',name:'Мрамор — светлый'},
  {file:'floor_parquet_herringbone.png',name:'Паркет — ёлочка'},
  {file:'floor_rug_blue.png',name:'Ковёр — синий'},
  {file:'floor_rug_green.png',name:'Ковёр — зелёный'},
  {file:'floor_rug_red.png',name:'Ковёр — красный'},
  {file:'floor_stone_tile_dark.png',name:'Каменная плитка — тёмная'},
  {file:'floor_stone_tile_light.png',name:'Каменная плитка — светлая'},
  {file:'floor_tatami.png',name:'Татами'},
  {file:'floor_wood_dark.png',name:'Дерево — тёмное'},
  {file:'floor_wood_light.png',name:'Дерево — светлое'}
 ]
};

var MATERIAL_CATALOG={stone:{name:'Камень',color:'#777d82'},wood:{name:'Дерево',color:'#8b5a2b'},brick:{name:'Кирпич',color:'#9a5140'},plaster:{name:'Штукатурка',color:'#d0c6b2'},metal:{name:'Металл',color:'#59636d'},dark:{name:'Тёмный',color:'#30343a'}};
function paintRay(ev){
 if(!paintMode||editorMode!=='finish'||!raycaster||!renderer||!map)return false;
 var r=renderer.domElement.getBoundingClientRect();
 if(!r.width||!r.height)return false;
 mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);
 var hits=raycaster.intersectObjects(root.children,true).filter(function(h){var k=h.object.userData&&h.object.userData.editorKind;return k==='surface'||k==='wall';});
 if(!hits.length)return false;
 var o=hits[0].object,e=MATERIAL_CATALOG[paintMaterial];if(!e)return false;
 var changed=false,key='';
 if(o.userData.editorKind==='surface'){
   key=o.name.indexOf('surface:')===0?o.name.slice(8):'';
   var ss=map.surfaces&&map.surfaces[key];
   if(!ss)return false;
   if(ss.material!==paintMaterial||ss.color!==e.color){changed=true;}
 }else{
   key=o.userData.wallKey||'';var w=map.walls&&map.walls[key];if(!w)return false;
   var s=side(w,paintSide);
   if(s.color!==e.color){changed=true;}
 }
 if(!changed)return false;
 if(paintedDuringStroke[key])return false;
 if(!paintHistoryStarted){pushHistory();paintHistoryStarted=true;}
 if(o.userData.editorKind==='surface'){var s2=map.surfaces&&map.surfaces[key];if(s2){s2.material=paintMaterial;s2.color=e.color;}}else{var w2=map.walls&&map.walls[key];if(w2){var side2=side(w2,paintSide);side2.color=e.color;w2.material=paintMaterial;w2.color=e.color;}}
 paintedDuringStroke[key]=1;saveMap();build();updateInfo();return true;
}
function togglePaintMode(force){
 paintMode=force==null?!paintMode:!!force;painting=false;paintHistoryStarted=false;paintedDuringStroke={};
 var b=document.getElementById('r3dPaint');if(b)b.textContent=paintMode?'🖌️ Кисть: ВКЛ':'🖌️ Кисть: ВЫКЛ';
 var h=document.getElementById('r3dQuickHint');if(h)h.textContent=paintMode?'Кисть: ведите пальцем по полу или стене. Материал: '+(MATERIAL_CATALOG[paintMaterial]||{}).name+' • сторона стены: '+(paintSide==='front'?'внутри':'снаружи'):'Выберите режим — инструменты появятся в «Ещё».';
 updateInfo();
}
function setPaintMaterial(key){if(!MATERIAL_CATALOG[key])return;paintMaterial=key;paintMode=true;var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Кисть ВКЛ • материал: '+MATERIAL_CATALOG[key].name+' • сторона стены: '+(paintSide==='front'?'внутри':'снаружи');var b=document.getElementById('r3dPaint');if(b)b.textContent='🖌️ Кисть: ВКЛ';}
function setPaintSide(which){paintSide=which==='back'?'back':'front';var h=document.getElementById('r3dQuickHint');if(h&&paintMode)h.textContent='Кисть ВКЛ • материал: '+MATERIAL_CATALOG[paintMaterial].name+' • сторона стены: '+(paintSide==='front'?'внутри':'снаружи');}
function applyMaterialToSelected(key){var list=selectedItems.length?selectedItems:[selected];if(!list.length||!list[0]){alert('Сначала выберите элемент.');return;}var e=MATERIAL_CATALOG[key];if(!e)return;pushHistory();list.forEach(function(item){if(!item)return;var w=(item.name||'').indexOf('wall:')===0?selectedWallFrom(item):null;if(w){w.material=key;w.color=e.color;side(w,'front').color=e.color;side(w,'back').color=e.color;}else if(item.userData&&item.userData.mapObjectId){var o=(map.objects||[]).find(function(x){return String(x.id)===String(item.userData.mapObjectId);});if(o){o.material=key;o.color=e.color;}}else if((item.name||'').indexOf('surface:')===0){var k=item.name.slice(8),ss=map.surfaces&&map.surfaces[k];if(ss){ss.material=key;ss.color=e.color;}}});saveMap();build();updateInfo();}
function selectedWallFrom(item){if(!item||!item.name||item.name.indexOf('wall:')!==0)return null;var k=item.name.slice(5);return map&&map.walls?map.walls[k]:null;}
function openMaterialCatalog(){var old=document.getElementById('map3dMaterials');if(old){old.remove();return;}var box=document.createElement('div');box.id='map3dMaterials';box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(300px,78vw);max-width:300px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:10px;z-index:40000;box-shadow:-8px 0 28px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain';box.innerHTML='<b>🎨 Материалы</b><button id="matClose" style="float:right">✕</button><div style="clear:both;color:#aaa;margin:8px 0">Выберите материал для выделенного элемента.</div>';Object.keys(MATERIAL_CATALOG).forEach(function(k){var e=MATERIAL_CATALOG[k],b=document.createElement('button');b.style.cssText='width:100%;margin:4px 0;padding:9px;text-align:left';b.innerHTML='<span style="display:inline-block;width:18px;height:18px;border-radius:4px;background:'+e.color+';vertical-align:middle;margin-right:8px"></span>'+e.name;b.onclick=function(){if(editorMode==='finish'){setPaintMaterial(k);}else{applyMaterialToSelected(k);}};box.appendChild(b);});box.querySelector('#matClose').onclick=function(){box.remove();};modal.appendChild(box);}
function openWallTools(){var old=document.getElementById('map3dWallTools');if(old){old.remove();return;}var box=document.createElement('div');box.id='map3dWallTools';box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(300px,78vw);max-width:300px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:10px;z-index:40000;box-shadow:-8px 0 28px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain';box.innerHTML='<b>🏗️ Стена</b><button id="wallClose" style="float:right">✕</button><div style="clear:both;margin:8px 0;color:#aaa">Сначала выберите стену.</div><button id="wallEdit" style="width:100%;margin:4px 0">📐 Длина / толщина / высота</button><button id="wallDoor" style="width:100%;margin:4px 0">🚪 Дверь</button><button id="wallWindow" style="width:100%;margin:4px 0">🪟 Окно</button><button id="wallMoveL" style="width:49%;margin:4px 0">◀ Проём</button><button id="wallMoveR" style="width:49%;margin:4px 0">Проём ▶</button><button id="wallPos" style="width:100%;margin:4px 0">↔ Позиция проёма</button><button id="wallClear" style="width:100%;margin:4px 0">▢ Убрать проём</button>';box.querySelector('#wallClose').onclick=function(){box.remove();};box.querySelector('#wallEdit').onclick=editSelectedWall;box.querySelector('#wallDoor').onclick=function(){editOpening('door');};box.querySelector('#wallWindow').onclick=function(){editOpening('window');};box.querySelector('#wallMoveL').onclick=function(){moveOpeningAlongWall(-.25);};box.querySelector('#wallMoveR').onclick=function(){moveOpeningAlongWall(.25);};box.querySelector('#wallPos').onclick=editOpeningPosition;box.querySelector('#wallClear').onclick=clearOpening;modal.appendChild(box);}

function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c];});}
function hex(v,f){return /^#[0-9a-f]{6}$/i.test(String(v||''))?String(v):f;}
function loadMap(){try{return JSON.parse(localStorage.getItem('dnd_vtt_3d_map')||'null');}catch(e){return null;}}
function saveMap(){if(!map)return;localStorage.setItem('dnd_vtt_3d_map',JSON.stringify(map));}
function setEditorMode(m){
 if(m==='construction')m='build';
 if(m==='furnishing')m='objects';
 if(m!=='build'&&m!=='objects'&&m!=='view'&&m!=='levels')m='view';
 editorMode=m;selected=null;selectedItems=[];transformMode='translate';mode=m==='view'?'orbit':'transform';roomToolArmed=false;wallToolArmed=false;floorToolArmed=false;floorDrawActive=false;lastFloorCell=null;
 // Разрез никогда не включается автоматически. Он включается только кнопкой «Разрез» в редакторе.
 if(m!=='build')cutawayWalls=false;
 updateGizmo();build();updateCutaway();updateInfo();
 var b=document.querySelectorAll('[data-r3d-mode]');
 for(var i=0;i<b.length;i++){
   var active=b[i].getAttribute('data-r3d-mode')===m;
   b[i].style.fontWeight=active?'800':'500';
   b[i].style.outline=active?'2px solid #ffd54a':'none';
   b[i].style.background=active?'#394351':'';
 }
}
function editorAllows(kind){
 if(editorMode==='build')return kind==='wall';
  if(editorMode==='levels'||editorMode==='view')return false;
 return kind==='object'||kind==='token';
}
function normalizeLevelData(){if(!map)return;map.levels=map.levels||{};var legacyMax=Number(map.levels.max);if(!Number.isFinite(legacyMax))legacyMax=Number(map.levels.count||0);map.levels.min=Number.isFinite(Number(map.levels.min))?Math.floor(Number(map.levels.min)):0;map.levels.max=Math.max(0,Math.floor(legacyMax||0));map.levels.current=Math.max(map.levels.min,Math.min(map.levels.max,Math.floor(Number(map.levels.current)||0)));delete map.levels.count;}
function changeLevel(delta){if(!map)return;normalizeLevelData();var cur=Number(map.levels.current)||0,next=Math.max(map.levels.min,Math.min(map.levels.max,cur+Number(delta||0)));if(next===cur)return;pushHistory();map.levels.current=next;controls.target.y=next*3;saveMap();build();updateInfo();}
function createLevel(direction){if(!map)return;normalizeLevelData();direction=direction==='down'?'down':'up';pushHistory();if(direction==='up')map.levels.max=Math.max(map.levels.max,0)+1;else map.levels.min=Math.min(map.levels.min,0)-1;map.levels.current=direction==='up'?map.levels.max:map.levels.min;saveMap();build();updateInfo();}
function setLevelAbsolute(level){if(!map)return;normalizeLevelData();var next=Math.max(map.levels.min,Math.min(map.levels.max,Math.floor(Number(level)||0)));if(next===Number(map.levels.current||0))return;pushHistory();map.levels.current=next;saveMap();build();updateInfo();}
function levelInfo(){if(!map||!map.levels)return 'Этаж 1';var n=Number(map.levels.current)||0;return n===0?'Этаж 1':(n>0?'Этаж '+(n+1):'Этаж '+n);}
function mapLevelCount(){if(!map)return 1;normalizeLevelData();return map.levels.max-map.levels.min+1;}
function floorAt(level,x,y){if(!map||!map.surfaces)return null;return map.surfaces[wallKey(level,Math.floor(x),Math.floor(y))]||null;}
function setFloorCell(x,y,enabled){if(!map)return;var level=Number(map.levels&&map.levels.current)||0,cols=Number(map.grid&&map.grid.cols)||20,rows=Number(map.grid&&map.grid.rows)||20;x=Math.floor(x);y=Math.floor(y);if(x<0||y<0||x>=cols||y>=rows)return;map.surfaces=map.surfaces||{};var k=wallKey(level,x,y);if(enabled){if(!map.surfaces[k])map.surfaces[k]={level:level,x:x,y:y,material:'stone',texture:'none',color:'#3d403a',walkable:true};}else delete map.surfaces[k];}
function applyFloorToolAt(ev,enabled){var gp=sceneGroundPoint(ev);if(!gp)return false;var x=Math.floor(gp.x),y=Math.floor(gp.z),key=wallKey(Number(map.levels&&map.levels.current)||0,x,y);if(key===lastFloorCell)return true;lastFloorCell=key;setFloorCell(x,y,enabled);saveMap();build();updateInfo();return true;}
function resizeMapEdge(dir,delta){if(!map)return;var g=map.grid||{};var cols=Math.max(1,Number(g.cols)||20),rows=Math.max(1,Number(g.rows)||20),nextCols=cols,nextRows=rows;dir=String(dir||'east');delta=Number(delta)||0;if(dir==='east'||dir==='west')nextCols=Math.max(1,cols+delta);else nextRows=Math.max(1,rows+delta);if(nextCols===cols&&nextRows===rows)return;pushHistory();map.grid.cols=nextCols;map.grid.rows=nextRows;Object.keys(map.surfaces||{}).forEach(function(k){var p=k.split(':');if(p.length<3)return;var x=Number(p[1]),y=Number(p[2]);if(x<0||y<0||x>=nextCols||y>=nextRows)delete map.surfaces[k];});saveMap();cameraHome();build();updateInfo();}
function updateMapSizeInfo(){var e=document.getElementById('r3dMapSizeInfo');if(e&&map)e.textContent='Размер: '+(Number(map.grid&&map.grid.cols)||20)+' × '+(Number(map.grid&&map.grid.rows)||20)+' клеток • этажей: '+mapLevelCount();}
function ensureMapCollections(){if(!map)return;map.assets=Array.isArray(map.assets)?map.assets:[];map.objects=Array.isArray(map.objects)?map.objects:[];}
function openAssetDB(){return new Promise(function(resolve,reject){if(assetDB){resolve(assetDB);return;}try{var r=indexedDB.open('dnd_vtt_3d_assets',1);r.onupgradeneeded=function(){var db=r.result;if(!db.objectStoreNames.contains('assets'))db.createObjectStore('assets',{keyPath:'id'});};r.onsuccess=function(){assetDB=r.result;resolve(assetDB);};r.onerror=function(){reject(r.error||new Error('IndexedDB error'));};}catch(e){reject(e);}});}
function putAsset(id,record){return openAssetDB().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction('assets','readwrite');tx.objectStore('assets').put(Object.assign({id:id},record));tx.oncomplete=function(){assetCache[id]=record;resolve(record);};tx.onerror=function(){reject(tx.error||new Error('Asset save error'));};});});}
function getAsset(id){if(assetCache[id])return Promise.resolve(assetCache[id]);return openAssetDB().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction('assets','readonly'),q=tx.objectStore('assets').get(id);q.onsuccess=function(){if(q.result)assetCache[id]=q.result;resolve(q.result||null);};q.onerror=function(){reject(q.error||new Error('Asset read error'));};});});}
function newAssetId(){return 'asset_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);}
function syncSelectedTransform(){if(!selected||!selected.userData||!selected.userData.mapObjectId||!map)return;var id=selected.userData.mapObjectId,o=(map.objects||[]).find(function(x){return String(x.id)===String(id);});if(!o)return;o.x=Number(selected.position.x)-.5;o.y=Number(selected.position.z)-.5;o.z=Number(selected.position.y)||0;o.rotation=Number(selected.rotation.y)*180/Math.PI;o.scaleX=Number(selected.scale.x)||1;o.scaleY=Number(selected.scale.z)||1;o.scaleZ=Number(selected.scale.y)||1;saveMap();}
function nudgeSelected(dx,dz){
 pushHistory();if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}selected.position.x+=dx;selected.position.z+=dz;syncSelectedTransform();updateInfo();}
function rotateSelected(deg){
 pushHistory();if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}selected.rotation.y+=deg*Math.PI/180;syncSelectedTransform();updateInfo();}
function scaleSelected(mult){
 pushHistory();if(!selected||!selected.userData||!selected.userData.mapObjectId){alert('Выберите объект.');return;}selected.scale.multiplyScalar(mult);syncSelectedTransform();updateInfo();}
function side(w,n){w[n]=w[n]||{texture:'none',color:null};return w[n];}
function material(color,rough){return new THREE.MeshStandardMaterial({color:hex(color,'#777777'),roughness:rough==null?.82:rough,metalness:0});}
function tex(url){if(!url||url==='none')return null;try{if(String(url).indexOf('root:')===0)url='./'+String(url).slice(5);if(String(url).indexOf('asset:')===0){var id=String(url).slice(6),cached=assetCache[id];if(cached&&cached.url)url=cached.url;else{loadAssetTexture(id).then(function(){if(typeof build==='function')build();});return null;}}var l=new THREE.TextureLoader(),t=l.load(url);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}catch(e){return null;}}
function matFromSide(s,base){var m=material((s&&s.color)||base);var t=tex(s&&s.texture);if(t)m.map=t;return m;}
function addBox(name,x,y,z,w,h,d,mats,rot){
 var g=new THREE.BoxGeometry(w,h,d);var ms=Array.isArray(mats)?mats:[mats||material('#777')];var o=new THREE.Mesh(g,ms);o.name=name;o.position.set(x+w*.5,y+d*.5,z+h*.5);if(rot)o.rotation.y=Number(rot)*Math.PI/180;root.add(o);return o;
}
function wallMesh(w){
 var h=Math.max(.5,Number(w.height)||2.5),t=Math.max(.03,Number(w.thickness)||.09),len=Math.max(.1,Number(w.length)||1),levelY=(Number(w.level)||0)*3;
 var front=side(w,'front'),back=side(w,'back'),base=w.color||'#777777',end=material(base),top=material(base),bottom=material(base),fm=matFromSide(front,base),bm=matFromSide(back,base),mats=w.dir==='n'?[end,end,top,bottom,fm,bm]:[fm,bm,top,bottom,end,end],x=Number(w.x)||0,y=Number(w.y)||0,op=w.opening;
 function part(name,px,py,pz,pw,ph,pd){var q=addBox(name,px,py,pz,pw,ph,pd,mats);q.userData.editorKind='wall';q.userData.wallKey=w.__key||((Number(w.level)||0)+':'+x+':'+y);return q;}
 // Three.js: X/Z are the map plane, Y is vertical.
 if(w.dir==='n'){
   if(!op)return part('wall:'+w.level+':'+x+':'+y,x,levelY,y-t/2,len,h,t);
   var ow=Math.min(len,Math.max(.1,Number(op.width)||.9)),oh=Math.min(h,Math.max(.1,Number(op.height)||2.1)),os=Math.max(0,Math.min(h-oh,Number(op.sill)||0)),cc=Math.max(0,Math.min(len-ow,Number(op.offset)||0));
   if(cc>0)part('wall:'+w.level+':'+x+':'+y,x,levelY,y-t/2,cc,h,t);
   if(os>0)part('wall:'+w.level+':'+x+':'+y,x+cc,levelY,y-t/2,ow,os,t);
   if(len-cc-ow>0)part('wall:'+w.level+':'+x+':'+y,x+cc+ow,levelY,y-t/2,len-cc-ow,h,t);
   if(h-os-oh>0)part('wall:'+w.level+':'+x+':'+y,x+cc,levelY+os,y-t/2,ow,h-os,t);
   return;
 }
 if(!op)return part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY,y,t,h,len);
 var ow2=Math.min(len,Math.max(.1,Number(op.width)||.9)),oh2=Math.min(h,Math.max(.1,Number(op.height)||2.1)),os2=Math.max(0,Math.min(h-oh2,Number(op.sill)||0)),cc2=Math.max(0,Math.min(len-ow2,Number(op.offset)||0));
 if(cc2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY,y,t,h,cc2);
 if(os2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY+os2,y+cc2,t,os2,ow2);
 if(len-cc2-ow2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY,y+cc2+ow2,t,h,len-cc2-ow2);
 if(h-os2-oh2>0)part('wall:'+w.level+':'+x+':'+y,x+1-t/2,levelY+os2,y+cc2,t,h-os2-oh2,ow2);
}
function addOpeningHandles(w){
 if(editorMode!=='build'||!w||!w.opening)return;
 var op=w.opening,x=Number(w.x)||0,y=Number(w.y)||0,len=Math.max(.1,Number(w.length)||1),ow=Math.min(len,Math.max(.1,Number(op.width)||.9)),off=Math.max(0,Math.min(len-ow,Number(op.offset)||0)),z=(Number(w.level)||0)*3+Math.max(.15,Number(w.height)||2.5)*.5;
 var pts=w.dir==='n'?[[x+off,y],[x+off+ow,y]]:[[x+1,y+off],[x+1,y+off+ow]];
 pts.forEach(function(p,idx){var m=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),new THREE.MeshBasicMaterial({color:0xffb74d,depthTest:false}));m.position.set(p[0],z,p[1]);m.name='openingHandle:'+(w.__key||wallKey(Number(w.level)||0,x,y))+':'+(idx?'end':'start');m.userData.editorKind='openingHandle';m.userData.openingHandle=true;m.userData.wallKey=w.__key||wallKey(Number(w.level)||0,x,y);m.userData.handle=idx?'end':'start';m.renderOrder=1001;root.add(m);});
}
function openingHandleHit(ev){
 if(editorMode!=='build')return null;
 var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true);
 for(var i=0;i<hits.length;i++){var o=hits[i].object;if(o&&o.userData&&o.userData.openingHandle)return o;}
 return null;
}
function beginOpeningHandleDrag(ev){
 var hit=openingHandleHit(ev);if(!hit)return false;
 var key=hit.userData.wallKey,w=map&&map.walls&&map.walls[key],gp=sceneGroundPoint(ev);if(!w||!w.opening||!gp)return false;
 var wallObj=root.children.find(function(o){return o&&o.name==='wall:'+key;});selected=wallObj||hit;selectedItems=[selected];updateInfo();
 openingDrag={key:key,startX:gp.x,startY:gp.z,oldOffset:Number(w.opening.offset)||0,oldWidth:Number(w.opening.width)||.9,dir:w.dir||'n',handle:hit.userData.handle,history:snapshotMap(),changed:false,widthResize:true};
 return true;
}
function updateOpeningHandleDrag(ev){
 if(!openingDrag||!openingDrag.widthResize)return;
 var w=map&&map.walls&&map.walls[openingDrag.key],op=w&&w.opening,gp=sceneGroundPoint(ev);if(!w||!op||!gp)return;
 var delta=openingDrag.dir==='n'?gp.x-openingDrag.startX:gp.z-openingDrag.startY;
 var next=openingDrag.handle==='start'?openingDrag.oldWidth-delta:openingDrag.oldWidth+delta;
 var max=Math.max(.1,Number(w.length)||1),min=.25;next=Math.max(min,Math.min(max,next));
 if(snapGrid)next=Math.max(min,Math.min(max,Math.round(next/snapSize)*snapSize));
 if(openingDrag.handle==='start'){var oldEnd=openingDrag.oldOffset+openingDrag.oldWidth;op.offset=Math.max(0,Math.min(oldEnd-next,openingDrag.oldOffset+openingDrag.oldWidth-next));}
 op.width=next;op.offset=Math.max(0,Math.min(max-next,Number(op.offset)||0));openingDrag.changed=true;build();updateInfo();
}
function addWallHandles(w){
 if(editorMode!=='build'||!selected||!selected.name||selected.name.slice(5)!=(w.__key||((Number(w.level)||0)+':'+Number(w.x||0)+':'+Number(w.y||0))))return;
 var x=Number(w.x)||0,y=Number(w.y)||0,len=Math.max(.1,Number(w.length)||1),z=(Number(w.level)||0)*3+Math.max(.15,Number(w.height)||2.5)*.5;
 var pts=w.dir==='n'?[[x,y],[x+len,y]]:[[x+1,y],[x+1,y+len]];
 pts.forEach(function(p,idx){var m=new THREE.Mesh(new THREE.SphereGeometry(.14,12,8),new THREE.MeshBasicMaterial({color:0xffff66,depthTest:false}));m.position.set(p[0],z,p[1]);m.name='wallHandle:'+(w.__key||wallKey(Number(w.level)||0,x,y))+':'+(idx?'end':'start');m.userData.editorKind='wallHandle';m.userData.wallHandle=true;m.userData.wallKey=w.__key||wallKey(Number(w.level)||0,x,y);m.userData.handle=idx?'end':'start';m.renderOrder=1000;root.add(m);});
}
function build(){
 if(!THREE||!map)return;
 buildGeneration++;var generation=buildGeneration;
 while(root.children.length)root.remove(root.children[0]);
 var cols=Number(map.grid&&map.grid.cols)||20,rows=Number(map.grid&&map.grid.rows)||20,level=Number(map.levels&&map.levels.current)||0,levelY=level*3;
 var ground=new THREE.Mesh(new THREE.PlaneGeometry(cols,rows),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));ground.rotation.x=-Math.PI/2;ground.position.set(cols/2,levelY,rows/2);ground.name='ground';ground.userData.editorKind='ground';root.add(ground);
 var surfaces=map.surfaces||{};Object.keys(surfaces).forEach(function(k){var p=k.split(':'),l=Number(p[0]),x=Number(p[1]),y=Number(p[2]);if(l!==level)return;var s=surfaces[k],m=material(s.color||'#30352f');var t=tex(s.texture);if(t){t.repeat.set(Number(s.repeatX)||1,Number(s.repeatY)||1);m.map=t;}var floorHeight=Number((map.cells&&map.cells[k])||0)*.12;var q=new THREE.Mesh(new THREE.BoxGeometry(1,.08,1),m);q.position.set(x+.5,levelY+floorHeight+.04,y+.5);q.name='surface:'+k;q.userData.editorKind='surface';q.userData.floorCollision=true;root.add(q);});
 Object.keys(map.walls||{}).forEach(function(k){var w=map.walls[k];if(Number(w.level)===level){wallMesh(w);addOpeningVisuals(w);addWallHandles(w);addOpeningHandles(w);}});
 (map.objects||[]).forEach(function(o){if(o.__outOfBounds||Number(o.level||0)!==level)return;if(o.assetId){loadAssetObject(o);}else{var m=material(o.color||'#8b5a2b');var t=tex(o.texture);if(t)m.map=t;var q=addBox('object:'+o.id,Number(o.x)+.5,Number(o.y)+.5,levelY+(Number(o.z)||0),(Number(o.size)||.8)*Number(o.scaleX||1),Math.max(.1,Number(o.size)||.8)*Number(o.scaleZ||1),(Number(o.size)||.8)*Number(o.scaleY||1),m,Number(o.rotation)||0);q.userData.mapObjectId=o.id;q.userData.editorKind='object';}});
 (map.tokens||[]).forEach(function(o){if(o.__outOfBounds||Number(o.level||0)!==level)return;var q=addBox('token:'+o.id,Number(o.x)+.35,Number(o.y)+.35,levelY+.12,.3,.3,.3,material(o.kind==='monster'?'#b33':'#39c'));q.userData.tokenId=o.id;q.userData.editorKind='token';});
}
function loadAssetObject(o){var generation=buildGeneration;getAsset(o.assetId).then(function(rec){if(!rec||!rec.buffer||generation!==buildGeneration)return;var loader=new GLTFLoader();loader.parse(rec.buffer,'',function(g){if(generation!==buildGeneration)return;var q=g.scene;q.name='object:'+o.id;q.userData.mapObjectId=o.id;q.userData.editorKind='object';q.userData.assetId=o.assetId;q.position.set(Number(o.x||0)+.5,levelY+(Number(o.z)||0),Number(o.y||0)+.5);q.rotation.y=Number(o.rotation||0)*Math.PI/180;q.scale.set(Number(o.scaleX||1),Number(o.scaleZ||1),Number(o.scaleY||1));root.add(q);},function(e){console.warn('GLB parse failed',o.assetId,e);});}).catch(function(e){console.warn('Asset read failed',o.assetId,e);});}
function clampCameraTarget(){
 var cols=Number(map&&map.grid&&map.grid.cols)||20,rows=Number(map&&map.grid&&map.grid.rows)||20,pad=2;
 controls.target.x=Math.max(-pad,Math.min(cols+pad,Number(controls.target.x)||0));
 controls.target.z=Math.max(-pad,Math.min(rows+pad,Number(controls.target.z)||0));
}
function updateCutaway(){
 if(!renderer||!camera||!root||!controls)return;
 if(editorMode!=='build'){
   root.traverse(function(o){if(o.isMesh&&o.userData&&o.userData.editorKind==='wall')o.visible=true;});
   return;
 }
 var now=performance.now();if(now-cutawayTick<70)return;cutawayTick=now;
 var cam=camera.position,tx=controls.target.x,tz=controls.target.z,dx=tx-cam.x,dz=tz-cam.z,dl=Math.hypot(dx,dz)||1;
 dx/=dl;dz/=dl;
 root.traverse(function(o){
   if(!o.isMesh||!o.userData||o.userData.editorKind!=='wall')return;
   var hidden=false;
   if(cutawayWalls){
     var p=o.getWorldPosition(new THREE.Vector3()),w=map&&map.walls&&map.walls[o.userData.wallKey];
     if(w){
       var wx=Number(w.x)||0,wy=Number(w.y)||0;
       if(w.dir==='n'){
         var sideToCam=cam.z-wy,sideToTarget=tz-wy;
         hidden=(sideToCam*sideToTarget<0 || Math.abs(sideToCam)<0.16) && ((p.x-cam.x)*dx+(p.z-cam.z)*dz)>0;
       }else{
         var sideToCamX=cam.x-(wx+1),sideToTargetX=tx-(wx+1);
         hidden=(sideToCamX*sideToTargetX<0 || Math.abs(sideToCamX)<0.16) && ((p.x-cam.x)*dx+(p.z-cam.z)*dz)>0;
       }
       var vx=p.x-cam.x,vz=p.z-cam.z,dist=Math.hypot(vx,vz)||1,forward=(vx*dx+vz*dz)/dist,sideDist=Math.abs(vx*dz-vz*dx);
       hidden=hidden&&forward>.05&&forward<1.08&&sideDist<Math.max(5,controls.distance*.34)&&dist<controls.distance*1.25;
     }
   }
   o.visible=!hidden;
 });
}
function toggleCutaway(force){
 if(editorMode!=='build')return;
 cutawayWalls=typeof force==='boolean'?force:!cutawayWalls;
 var b=document.getElementById('r3dCutaway');
 if(b)b.textContent='🏠 Стены: '+(cutawayWalls?'SIMS':'обычно');
 updateCutaway();
}
function cameraHome(){
 var cols=Number(map&&map.grid&&map.grid.cols)||20,rows=Number(map&&map.grid&&map.grid.rows)||20;
 controls.yaw=.78;controls.pitch=.72;controls.distance=Math.max(10,Math.min(48,Math.hypot(cols,rows)*.72));
 controls.target.x=cols/2;controls.target.y=(Number(map&&map.levels&&map.levels.current)||0)*3;controls.target.z=rows/2;clampCameraTarget();
}
function cameraNudge(kind){var step=Math.max(.35,controls.distance*.045),a=controls.yaw,dx=Math.cos(a),dz=Math.sin(a);if(kind==='left')controls.yaw-=.14;else if(kind==='right')controls.yaw+=.14;else if(kind==='up')controls.pitch=Math.min(1.38,controls.pitch+.10);else if(kind==='down')controls.pitch=Math.max(.18,controls.pitch-.10);else if(kind==='zoomIn')controls.distance=Math.max(3,controls.distance*.86);else if(kind==='zoomOut')controls.distance=Math.min(150,controls.distance*1.16);else if(kind==='panLeft'){controls.target.x-=Math.cos(a+Math.PI/2)*step;controls.target.z-=Math.sin(a+Math.PI/2)*step;}else if(kind==='panRight'){controls.target.x+=Math.cos(a+Math.PI/2)*step;controls.target.z+=Math.sin(a+Math.PI/2)*step;}else if(kind==='panUp'){controls.target.x+=dx*step;controls.target.z+=dz*step;}else if(kind==='panDown'){controls.target.x-=dx*step;controls.target.z-=dz*step;}else if(kind==='home')cameraHome();clampCameraTarget();}
function cameraControlPanel(host){var p=document.createElement('div');p.id='r3dCameraPad';p.style.cssText='position:absolute;right:10px;bottom:12px;z-index:8;display:grid;grid-template-columns:repeat(3,52px);grid-template-rows:repeat(5,52px);gap:5px;touch-action:none;user-select:none;filter:drop-shadow(0 3px 8px #000);';var defs=[['',''],['↟','up'],['',''],['↞','left'],['⌂','home'],['↠','right'],['−','zoomOut'],['↓','down'],['＋','zoomIn'],['◀','panLeft'],['▲','panUp'],['▶','panRight'],['',''],['▼','panDown']];defs.forEach(function(d){var b=document.createElement('button');b.type='button';b.textContent=d[0];b.dataset.cam=d[1];b.style.cssText='width:52px;height:52px;padding:0;border:1px solid #69717d;border-radius:12px;background:rgba(25,30,38,.88);color:#fff;font-size:25px;font-weight:800;touch-action:none;';if(!d[1]){b.style.visibility='hidden';}else{b.addEventListener('pointerdown',function(ev){ev.preventDefault();ev.stopPropagation();cameraNudge(d[1]);b.setPointerCapture&&b.setPointerCapture(ev.pointerId);b._camTimer=setInterval(function(){cameraNudge(d[1]);},90);});var stop=function(ev){if(ev){ev.preventDefault();ev.stopPropagation();}if(b._camTimer){clearInterval(b._camTimer);b._camTimer=null;}};b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop);b.addEventListener('lostpointercapture',stop);b.addEventListener('contextmenu',function(ev){ev.preventDefault();});}p.appendChild(b);});var label=document.createElement('div');label.textContent='Камера';label.style.cssText='grid-column:1/4;text-align:center;font:700 12px sans-serif;color:#d7dde5;text-shadow:0 1px 3px #000;pointer-events:none;';p.prepend(label);host.appendChild(p);return p;}
function resize(){if(!renderer)return;var c=renderer.domElement,w=c.clientWidth,h=c.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();}
function frame(){if(!renderer)return;updateCutaway();var c=renderer.domElement,dx=Math.cos(controls.yaw)*Math.cos(controls.pitch)*controls.distance,dy=Math.sin(controls.pitch)*controls.distance,dz=Math.sin(controls.yaw)*Math.cos(controls.pitch)*controls.distance;camera.position.set(controls.target.x+dx,controls.target.y+dy,controls.target.z+dz);camera.lookAt(controls.target.x,controls.target.y,controls.target.z);renderer.render(scene,camera);raf=requestAnimationFrame(frame);}
function focusCameraOnSelection(o){
 if(!o||!camera||!controls)return false;
 var box=new THREE.Box3().setFromObject(o);
 if(box.isEmpty())return false;
 var p=box.getCenter(new THREE.Vector3());
 controls.target.copy(p);
 clampCameraTarget();
 var size=box.getSize(new THREE.Vector3()),radius=Math.max(size.x,size.y,size.z,.8)*1.35;
 controls.distance=Math.max(3,Math.min(80,Math.max(controls.distance,radius*2.2)));
 return true;
}

function pick(ev){if(!raycaster||!renderer)return;var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true).filter(function(h){return h.object.name!=='ground'&&!h.object.userData.gizmoAxis&&editorAllows(h.object.userData.editorKind||'object');});if(!hits.length){selected=null;selectedItems=[];updateGizmo();updateInfo();return;}var o=hits[0].object;while(o&&o.parent&&!(o.userData&&o.userData.mapObjectId)&&o.parent!==root)o=o.parent;
 if(editorMode==='finish'&&window.r3dPendingTexture){var pt=window.r3dPendingTexture;var kind=pt.kind;if((kind==='wall'&&o.userData&&o.userData.editorKind==='wall')||(kind==='floor'&&o.userData&&o.userData.editorKind==='surface')){selected=o;selectedItems=[o];applyRootTexture(pt.file,kind,pt.which);window.r3dPendingTexture=null;updateGizmo();updateInfo();return;}}if(ev.shiftKey||ev.ctrlKey){var ix=selectedItems.indexOf(o);if(ix>=0)selectedItems.splice(ix,1);else selectedItems.push(o);selected=selectedItems.length?selectedItems[selectedItems.length-1]:null;}else{selectedItems=[o];selected=o;}if(selected)focusCameraOnSelection(selected);updateGizmo();updateInfo();}
function updateFloorBar(){var label=document.getElementById('r3dFloorLabel');if(!label||!map)return;normalizeLevelData();var cur=Number(map.levels.current)||0;label.textContent=levelInfo()+' / '+mapLevelCount();updateMapSizeInfo();}
function resizeOpening(delta){var w=selectedWall(),op=openingForSelected();if(!w||!op)return;var max=Math.max(.1,Number(w.length)||1),next=Math.max(.1,Math.min(max,Number(op.width||.9)+delta));pushHistory();op.width=next;op.offset=Math.max(0,Math.min(max-next,Number(op.offset)||0));saveMap();build();updateInfo();}
function updateContextPanel(){
 var p=document.getElementById('r3dContextPanel');if(!p)return;
 p.innerHTML='';
 var title=document.createElement('span');title.style.cssText='font-weight:800;margin-right:4px';
 var add=function(label,fn){var b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='padding:7px 9px;border-radius:8px;border:1px solid #4d5968;background:#202833;color:#fff;font-weight:600';b.onclick=fn;p.appendChild(b);};
 var w=selectedWall();
 if(editorMode==='build'&&w){
   title.textContent='🧱 Стена';
   add('📐 Размер',editSelectedWall);add('🚪 Дверь',function(){editOpening('door');});add('🪟 Окно',function(){editOpening('window');});
   add('← Проём',function(){moveOpeningAlongWall(-.25);});add('→ Проём',function(){moveOpeningAlongWall(.25);});add('Ширина −',function(){resizeOpening(-.25);});add('Ширина +',function(){resizeOpening(.25);});add('▢ Убрать проём',clearOpening);
 }else if(editorMode==='objects'&&selected){
   title.textContent=selectedItems.length>1?'🪑 Объекты: '+selectedItems.length:'🪑 '+(selected.name||'Объект');
   add('↔ Переместить',function(){setGizmoMode('translate');});add('⟳ Вращать',function(){setGizmoMode('rotate');});
   add('⤢ Масштаб',function(){setGizmoMode('scale');});add('⧉ Дубликат',duplicateSelected);add('🗑 Удалить',deleteSelected);
 }else if(editorMode==='finish'&&selected&&selected.name&&selected.name.indexOf('wall:')===0){title.textContent='🧱 Стена';add('🧱 Текстуры стены',function(){openRootTexturePicker('wall');});add('🎨 Материалы',openMaterialCatalog);add('🗑 Очистить выделение',function(){selected=null;selectedItems=[];updateGizmo();updateInfo();});}else if(editorMode==='finish'&&selected&&selected.name&&selected.name.indexOf('surface:')===0){title.textContent='🟫 Пол';add('🟫 Текстуры пола',function(){openRootTexturePicker('floor');});add('🎨 Материалы',openMaterialCatalog);add('🗑 Очистить выделение',function(){selected=null;selectedItems=[];updateGizmo();updateInfo();});
 }else if(editorMode==='build'){
   title.textContent='🧱 Строительство';add('▭ Создать комнату',function(){if(window.r3dRoomHint){window.r3dRoomHint.textContent='Потяните по полу от одного угла комнаты к другому.';}});add('🏗️ Стена',function(){openWallTools();});add('🗑 Удалить',deleteSelected);
 }else if(editorMode==='objects'){
   title.textContent='🛋 Обстановка';add('📚 Библиотека',openAssetLibrary);add('🧩 Добавить GLB',addModel);
 }else{
   title.textContent='👁 Просмотр';add('🏠 SIMS: '+(cutawayWalls?'ВКЛ':'ВЫКЛ'),function(){toggleCutaway();});
 }
 p.appendChild(title);
}
function updateInfo(){
 updateFloorBar();updateContextPanel();if(typeof simpleToolsRefresh==='function')simpleToolsRefresh();
 var e=document.getElementById('map3dRealInfo');if(!e)return;
 var modeName={build:'Строительство',objects:'Обстановка',view:'Просмотр',finish:'Отделка',levels:'Этажи'}[editorMode]||editorMode;
 e.textContent=(selected?(selectedItems.length>1?'Выбрано элементов: '+selectedItems.length:'Выбрано: '+selected.name+(selected.userData&&selected.userData.assetId?' • GLB':'')):'')+' • '+levelInfo()+' • '+modeName;
}
function makeGizmo(){if(!THREE||gizmo)return;gizmo=new THREE.Group();gizmo.name='transform-gizmo';function axis(name,color,vec){var mat=new THREE.LineBasicMaterial({color:color,depthTest:false,transparent:true,opacity:.95});var geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),vec.clone().multiplyScalar(1.5)]);var line=new THREE.Line(geo,mat);line.userData.gizmoAxis=name;line.renderOrder=999;gizmo.add(line);var cone=new THREE.Mesh(new THREE.ConeGeometry(.12,.35,12),new THREE.MeshBasicMaterial({color:color,depthTest:false}));cone.userData.gizmoAxis=name;cone.position.copy(vec.clone().multiplyScalar(1.65));if(name==='X')cone.rotation.z=-Math.PI/2;if(name==='Z')cone.rotation.x=Math.PI/2;gizmo.add(cone);}axis('X',0xff5555,new THREE.Vector3(1,0,0));axis('Y',0x55ff66,new THREE.Vector3(0,1,0));axis('Z',0x5599ff,new THREE.Vector3(0,0,1));gizmo.visible=false;gizmo.renderOrder=999;scene.add(gizmo);}
function updateGizmo(){if(!gizmo)return;gizmo.visible=!!selected&&editorMode==='objects';if(selected&&gizmo.visible){gizmo.position.copy(selected.getWorldPosition(new THREE.Vector3()));gizmo.scale.setScalar(Math.max(.6,controls.distance*.045));}}
function snapValue(v,step){if(!snapGrid||!step)return v;return Math.round(v/step)*step;}
function applySnap(){if(!selected)return;if(transformMode==='translate'){selected.position.x=snapValue(selected.position.x,snapSize);selected.position.y=snapValue(selected.position.y,snapSize);selected.position.z=snapValue(selected.position.z,snapSize);}else if(transformMode==='rotate'){var step=Math.PI/12;selected.rotation.y=Math.round(selected.rotation.y/step)*step;}else if(transformMode==='scale'){var step=.1;selected.scale.x=Math.max(.1,Math.round(selected.scale.x/step)*step);selected.scale.y=Math.max(.1,Math.round(selected.scale.y/step)*step);selected.scale.z=Math.max(.1,Math.round(selected.scale.z/step)*step);}}
function setGizmoHighlight(axis){if(!gizmo)return;gizmo.children.forEach(function(c){var m=c.material;if(!m)return;var active=c.userData&&c.userData.gizmoAxis===axis;m.opacity=active?1:.82;if(m.color){if(active)m.color.set(0xffff66);else if(c.userData.gizmoAxis==='X')m.color.set(0xff5555);else if(c.userData.gizmoAxis==='Y')m.color.set(0x55ff66);else if(c.userData.gizmoAxis==='Z')m.color.set(0x5599ff);}});}
function gizmoHit(ev){if(!gizmo||!gizmo.visible)return null;var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);var h=raycaster.intersectObjects(gizmo.children,true);return h.length?h[0].object.userData.gizmoAxis:null;}
function gizmoMove(ev){if(!selected||!gizmoDragging)return;var dx=ev.clientX-gizmoStartX,dy=ev.clientY-gizmoStartY;var step=Math.max(.002,controls.distance*.0018);if(transformMode==='rotate'){selected.rotation.y=gizmoStartRot+(dx-dy)*.01;}else if(transformMode==='scale'){var q=Math.max(.15,1+(dx-dy)*.004);selected.scale.copy(gizmoStartScale).multiplyScalar(q);}else{if(gizmoAxis==='X')selected.position.x=gizmoStartPos.x+dx*step;else if(gizmoAxis==='Z')selected.position.z=gizmoStartPos.z-dy*step;else if(gizmoAxis==='Y')selected.position.y=gizmoStartPos.y-dy*step;}applySnap();syncSelectedTransform();updateGizmo();updateInfo();}
function setGizmoMode(m){transformMode=m;mode='transform';updateInfo();setGizmoHighlight(null);}
function colorSide(which){
 pushHistory();
 if(!selected||selected.name.indexOf('wall:')!==0){alert('Выберите стену в 3D-сцене.');return;}
 var parts=selected.name.split(':');var k=parts.slice(1).join(':');var w=map.walls&&map.walls[k];if(!w){alert('Стена не найдена в карте.');return;}
 var s=side(w,which),v=prompt(which==='front'?'Цвет внутренней стороны':'Цвет внешней стороны',s.color||'#777777');if(v===null)return;if(!/^#[0-9a-f]{6}$/i.test(v)){alert('Нужен цвет #RRGGBB');return;}s.color=v;saveMap();build();updateInfo();
}
function screenDistance(a,b){var dx=a.clientX-b.clientX,dy=a.clientY-b.clientY;return Math.sqrt(dx*dx+dy*dy);}
function screenMid(a,b){return {x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2};}
function beginTouchGesture(){var ids=Object.keys(touches);if(ids.length<2){touchGesture=null;return;}var a=touches[ids[0]],b=touches[ids[1]],m=screenMid(a,b);touchGesture={distance:screenDistance(a,b),midX:m.x,midY:m.y,angle:Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX),targetX:controls.target.x,targetZ:controls.target.z,cameraDistance:controls.distance,yaw:controls.yaw,pitch:controls.pitch};}
function updateTouchGesture(){if(!touchGesture)return;var ids=Object.keys(touches);if(ids.length<2)return;var a=touches[ids[0]],b=touches[ids[1]],m=screenMid(a,b),d=screenDistance(a,b);var ratio=touchGesture.distance/Math.max(1,d);controls.distance=Math.max(3,Math.min(150,touchGesture.cameraDistance*ratio));var pan=.006*controls.distance;controls.target.x=touchGesture.targetX-(m.x-touchGesture.midX)*pan;controls.target.z=touchGesture.targetZ+(m.y-touchGesture.midY)*pan;var angle=Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX),da=angle-touchGesture.angle;if(da>Math.PI)da-=Math.PI*2;if(da<-Math.PI)da+=Math.PI*2;controls.yaw=touchGesture.yaw-da*1.15;controls.pitch=Math.max(.18,Math.min(1.38,touchGesture.pitch-(m.y-touchGesture.midY)*.003));clampCameraTarget();}
function previewGLB(rec,canvas){
 if(!renderer||!THREE||!GLTFLoader||!rec||!rec.buffer||!canvas)return;
 var loader=new GLTFLoader();
 loader.parse(rec.buffer,'',function(g){
   var s=g.scene,box=new THREE.Box3().setFromObject(s),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
   var max=Math.max(size.x,size.y,size.z,.1),pcam=new THREE.PerspectiveCamera(32,1.33,.01,1000);
   pcam.position.set(max*1.8,max*1.25,max*1.8);pcam.lookAt(center);
   var ps=new THREE.Scene();ps.background=new THREE.Color(0x20252c);
   ps.add(s);
   var amb=new THREE.HemisphereLight(0xffffff,0x404040,2);ps.add(amb);
   var key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(max*2,max*3,max*2);ps.add(key);
   s.traverse(function(n){if(n.isMesh){n.material=new THREE.MeshNormalMaterial();n.frustumCulled=false;}});
   var oldTarget=renderer.getRenderTarget(),oldX=renderer.getViewport(new THREE.Vector4()),oldScX=renderer.getScissor(new THREE.Vector4()),oldTest=renderer.getScissorTest();
   var rt=new THREE.WebGLRenderTarget(160,120,{depthBuffer:true,stencilBuffer:false});
   renderer.setRenderTarget(rt);renderer.setViewport(0,0,160,120);renderer.setScissor(0,0,160,120);renderer.setScissorTest(false);renderer.render(ps,pcam);
   var px=new Uint8Array(160*120*4);renderer.readRenderTargetPixels(rt,0,0,160,120,px);
   var ctx=canvas.getContext('2d'),img=ctx.createImageData(160,120);
   for(var y=0;y<120;y++)for(var x=0;x<160;x++){var si=((119-y)*160+x)*4,di=(y*160+x)*4;img.data[di]=px[si];img.data[di+1]=px[si+1];img.data[di+2]=px[si+2];img.data[di+3]=px[si+3];}
   ctx.putImageData(img,0,0);
   renderer.setRenderTarget(oldTarget);renderer.setViewport(oldX);renderer.setScissor(oldScX);renderer.setScissorTest(oldTest);rt.dispose();
   s.traverse(function(n){if(n.isMesh){var m=n.material;if(m&&m.dispose)m.dispose();if(n.geometry&&n.geometry.dispose)n.geometry.dispose();}});
 },function(e){console.warn('GLB preview failed',rec.id,e);});
}

function rootTextureEntry(kind,file){
 var list=ROOT_TEXTURE_CATALOG[kind]||[];
 return list.find(function(x){return x.file===file;})||null;
}
function applyRootTexture(file,kind,which){
 ensureMapCollections();
 var rec=rootTextureEntry(kind,file);
 if(!rec){alert('Текстура не найдена: '+file);return false;}
 if(kind==='wall'){
   var w=selectedWall();
   if(!w){
     window.r3dPendingTexture={file:rec.file,kind:'wall',which:which==='back'?'back':'front'};
     var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Текстура выбрана. Теперь коснитесь стены — она будет применена.';
     return false;
   }
   var sideName=which==='back'?'back':'front';
   pushHistory();side(w,sideName).texture='root:'+rec.file;saveMap();build();updateInfo();return true;
 }else{
   var ss=null,key='';
   if(selected&&selected.name&&selected.name.indexOf('surface:')===0){key=selected.name.slice(8);ss=map.surfaces&&map.surfaces[key];}
   if(!ss){
     window.r3dPendingTexture={file:rec.file,kind:'floor',which:'front'};
     var h2=document.getElementById('r3dQuickHint');if(h2)h2.textContent='Текстура выбрана. Теперь коснитесь участка пола — она будет применена.';
     return false;
   }
   pushHistory();ss.texture='root:'+rec.file;saveMap();build();updateInfo();return true;
 }
}
function openRootTexturePicker(kind){
 // Каталог отделён от DOM-слоя редактора: открываем его напрямую в body.
 // Это исключает проблемы с flex-контейнером canvas/toolbar и гарантирует кликабельность.
 var old=document.getElementById('map3dRootTextures');
 if(old){old.remove();return;}
 var list=ROOT_TEXTURE_CATALOG[kind]||[],box=document.createElement('div');
 box.id='map3dRootTextures';
 box.setAttribute('role','dialog');
 box.setAttribute('aria-label',kind==='wall'?'Текстуры стен':'Текстуры пола');
 box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(210px,46vw);max-width:210px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:8px;z-index:40000;box-shadow:-8px 0 28px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain;';
 var title=kind==='wall'?'🧱 Стены':'🟫 Пол';
 box.innerHTML='<div style="position:sticky;top:0;z-index:2;background:#171c24;padding:4px 2px 8px;display:flex;align-items:center;justify-content:space-between"><b>'+title+'</b><button id="rootTexClose" type="button" style="padding:5px 8px;cursor:pointer">✕</button></div>';
 var grid=document.createElement('div');grid.style.cssText='display:flex;flex-direction:column;gap:7px';
 list.forEach(function(rec){
   var card=document.createElement('div');card.style.cssText='display:flex;flex-direction:column;gap:5px;padding:6px;background:#222933;color:#fff;border:1px solid #46515f;border-radius:10px;';
   var img=document.createElement('img');img.src='./'+rec.file;img.alt=rec.name;img.loading='lazy';img.draggable=false;img.style.cssText='width:100%;height:72px;object-fit:cover;border-radius:7px;background:#10151c;pointer-events:none';
   var label=document.createElement('div');label.textContent=rec.name;label.style.cssText='font-size:10px;line-height:1.15;color:#dbe2ea';
   card.appendChild(img);card.appendChild(label);
   if(kind==='wall'){
     var actions=document.createElement('div');actions.style.cssText='display:flex;gap:4px';
     var front=document.createElement('button');front.type='button';front.textContent='Внутри';front.style.cssText='flex:1;padding:7px 2px;font-size:10px;cursor:pointer';
     var back=document.createElement('button');back.type='button';back.textContent='Снаружи';back.style.cssText='flex:1;padding:7px 2px;font-size:10px;cursor:pointer';
     front.onclick=function(ev){ev.preventDefault();ev.stopPropagation();applyRootTexture(rec.file,'wall','front');};
     back.onclick=function(ev){ev.preventDefault();ev.stopPropagation();applyRootTexture(rec.file,'wall','back');};
     actions.appendChild(front);actions.appendChild(back);card.appendChild(actions);
   }else{
     card.style.cursor='pointer';
     card.onclick=function(ev){ev.preventDefault();ev.stopPropagation();applyRootTexture(rec.file,'floor');};
   }
   grid.appendChild(card);
 });
 box.appendChild(grid);
 box.querySelector('#rootTexClose').onclick=function(ev){ev.preventDefault();ev.stopPropagation();box.remove();};
 document.body.appendChild(box);
}
function openAssetLibrary(){openAssetDB().then(function(db){var tx=db.transaction('assets','readonly'),q=tx.objectStore('assets').getAll();q.onsuccess=function(){var items=q.result||[],box=document.createElement('div');box.style.cssText='position:fixed;right:0;top:58px;bottom:68px;width:min(330px,82vw);max-width:330px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;background:#171c24;border:1px solid #66717f;border-right:0;border-radius:14px 0 0 14px;padding:12px;z-index:40000;box-shadow:-8px 0 32px #000c;pointer-events:auto;touch-action:pan-y;overscroll-behavior:contain';box.innerHTML='<b>📚 Библиотека ассетов</b><button id="libClose" style="float:right">✕</button><div style="clear:both;color:#aaa;margin:8px 0">GLB — модели. PNG/JPG/WebP — текстуры.</div><button id="libAddModel" style="width:49%;margin:4px 0">🧩 Добавить GLB</button><button id="libAddTex" style="width:49%;margin:4px 0">🖼️ Добавить текстуру</button>';var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:8px';items.forEach(function(rec){var b=document.createElement('button');b.style.cssText='display:flex;flex-direction:column;gap:5px;text-align:left;padding:7px;background:#222933;color:#fff;border:1px solid #394454;border-radius:9px';var title=document.createElement('span');title.textContent=(rec.meta&&rec.meta.kind==='texture'?'🖼️ ':'🧩 ')+(rec.meta&&rec.meta.name||rec.id);b.appendChild(title);if(rec.meta&&rec.meta.kind==='texture'&&rec.buffer){try{var u=URL.createObjectURL(new Blob([rec.buffer],{type:rec.meta.type||'image/png'})),im=document.createElement('img');im.src=u;im.style.cssText='width:100%;height:74px;object-fit:cover;border-radius:6px';b.insertBefore(im,title);setTimeout(function(){URL.revokeObjectURL(u);},60000);}catch(e){}}if(rec.meta&&rec.meta.kind==='texture'){var apply=document.createElement('div');apply.style.cssText='display:flex;gap:4px';var fi=document.createElement('button');fi.textContent='Внутри';fi.onclick=function(ev){ev.stopPropagation();applyTextureAsset(rec.id,'front');};var bo=document.createElement('button');bo.textContent='Снаружи';bo.onclick=function(ev){ev.stopPropagation();applyTextureAsset(rec.id,'back');};apply.appendChild(fi);apply.appendChild(bo);b.appendChild(apply);}else{var pv=document.createElement('canvas');pv.width=160;pv.height=120;pv.style.cssText='width:100%;height:92px;display:block;border-radius:7px;background:#20252c';b.insertBefore(pv,title);previewGLB(rec,pv);b.draggable=true;b.addEventListener('dragstart',function(ev){if(ev.dataTransfer){ev.dataTransfer.effectAllowed='copy';ev.dataTransfer.setData('text/plain',rec.id);}});b.onclick=function(){var p=lastScenePoint;if(p){placeLibraryAsset(rec.id,rec.meta&&rec.meta.name||'Asset',p);box.remove();}else{pendingLibraryAsset={id:rec.id,name:rec.meta&&rec.meta.name||'Asset'};box.remove();var h=document.getElementById('r3dQuickHint');if(h)h.textContent='📍 Ассет выбран. Теперь тапните по полу в нужном месте — модель будет поставлена туда.';}};}grid.appendChild(b);});box.appendChild(grid);box.querySelector('#libClose').onclick=function(){box.remove();};box.querySelector('#libAddModel').onclick=function(){box.remove();addModel();};box.querySelector('#libAddTex').onclick=function(){box.remove();addTexture('front');};modal.appendChild(box);};});}
function sceneEditableHit(ev){
 if(!raycaster||!renderer||!root)return false;
 var r=renderer.domElement.getBoundingClientRect();if(!r.width||!r.height)return false;
 mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;
 raycaster.setFromCamera(mouse,camera);
 return raycaster.intersectObjects(root.children,true).some(function(h){
   var k=h.object&&h.object.userData&&h.object.userData.editorKind;
   return k&&editorAllows(k);
 });
}
function sceneGroundPoint(ev){if(!renderer||!camera||!raycaster)return null;var r=renderer.domElement.getBoundingClientRect();if(!r.width||!r.height)return null;mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);var g=root.children.filter(function(x){return x.userData&&x.userData.editorKind==='ground';});var h=raycaster.intersectObjects(g,false);return h.length?h[0].point:null;}
function placeLibraryAsset(id,name,point){pushHistory();ensureMapCollections();var p=point||{x:1.5,y:0,z:1.5};pendingLibraryAsset=null;var oid='obj_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,6);map.objects.push({id:oid,name:name,assetId:id,x:Number(p.x)-.5,y:Number(p.z)-.5,z:Number(p.y)||0,level:Number(map.levels&&map.levels.current)||0,scaleX:1,scaleY:1,scaleZ:1,rotation:0});saveMap();setEditorMode('objects');}
function addModel(){
 ensureMapCollections();
 var input=document.createElement('input');input.type='file';input.accept='.glb,.gltf,model/gltf-binary,model/gltf+json';input.onchange=function(){var f=input.files&&input.files[0];if(!f)return;if(f.name.toLowerCase().endsWith('.gltf')){alert('Для мобильного редактора лучше использовать .GLB: он сохраняет модель и ресурсы в одном файле.');return;}var rd=new FileReader();rd.onload=function(){var id=newAssetId(),buf=rd.result,meta={name:f.name,type:f.type||'model/gltf-binary',size:f.size,createdAt:new Date().toISOString(),license:'user-imported',source:'local'};putAsset(id,{meta:meta,buffer:buf}).then(function(){map.assets.push({id:id,name:f.name,type:meta.type,size:f.size,createdAt:meta.createdAt,license:meta.license,source:meta.source});var oid='obj_'+Date.now().toString(36);map.objects.push({id:oid,name:f.name,assetId:id,x:1,y:1,z:0,level:Number(map.levels&&map.levels.current)||0,scaleX:1,scaleY:1,scaleZ:1,rotation:0});saveMap();build();updateInfo();alert('GLB сохранён в локальную библиотеку и привязан к карте как assetId: '+id);}).catch(function(e){alert('Не удалось сохранить 3D-ассет: '+e.message);});};rd.readAsArrayBuffer(f);};input.click();
}
function applyTextureAsset(id,which){ensureMapCollections();if(!selected){alert('Сначала выберите элемент.');return;}var w=selectedWall(),rec=map.assets.find(function(a){return String(a.id)===String(id);});if(!rec)return;pushHistory();if(w&&(which==='front'||which==='back'))side(w,which).texture='asset:'+id;else if(w)w.texture='asset:'+id;else if(selected.userData&&selected.userData.mapObjectId){var o=(map.objects||[]).find(function(x){return String(x.id)===String(selected.userData.mapObjectId);});if(o)o.texture='asset:'+id;}else if((selected.name||'').indexOf('surface:')===0){var k=selected.name.slice(8),ss=map.surfaces&&map.surfaces[k];if(ss)ss.texture='asset:'+id;}saveMap();loadAssetTexture(id).then(function(){build();updateInfo();});}
function loadAssetTexture(id){return getAsset(id).then(function(rec){if(!rec||!rec.buffer)return null;if(assetCache[id]&&assetCache[id].url)return assetCache[id].url;var url=URL.createObjectURL(new Blob([rec.buffer],{type:(rec.meta&&rec.meta.type)||'image/png'}));assetCache[id]=Object.assign({},rec,{url:url});return url;});}
function addTexture(which){ensureMapCollections();var input=document.createElement('input');input.type='file';input.accept='image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp';input.onchange=function(){var file=input.files&&input.files[0];if(!file)return;if(file.size>12*1024*1024){alert('Текстура слишком большая. Максимум 12 MB.');return;}var rd=new FileReader();rd.onload=function(){var id=newAssetId(),buf=rd.result,meta={name:file.name,type:file.type||'image/png',size:file.size,createdAt:new Date().toISOString(),license:'user-imported',source:'local',kind:'texture'};putAsset(id,{meta:meta,buffer:buf}).then(function(){map.assets.push({id:id,name:file.name,type:meta.type,size:file.size,createdAt:meta.createdAt,license:meta.license,source:meta.source,kind:'texture'});saveMap();return loadAssetTexture(id);}).then(function(){applyTextureAsset(id,which||'front');}).catch(function(e){alert('Не удалось сохранить текстуру: '+e.message);});};rd.readAsArrayBuffer(file);};input.click();}
function textureSide(which){addTexture(which);}
function open(){
 if(document.getElementById('map3dRealModal'))return;
 map=loadMap();if(!map){map={version:15,name:'Новая 3D-карта',notes:'',grid:{cols:20,rows:20,cellSizeFt:5},levels:{min:0,max:0,current:0},cells:{},surfaces:{},objects:[],walls:{},connectors:[],tokens:[],combat:{},player:{x:0,y:0,level:0,elevation:0,yaw:0,pitch:0},cameraMode:'orbit'};saveMap();} normalizeLevelData();
 var modal=document.createElement('div');modal.id='map3dRealModal';modal.style.cssText='position:fixed;inset:0;z-index:32000;background:#080b10;color:#fff;display:flex;flex-direction:column;';
 modal.innerHTML='<div id="r3dTopBar" style="min-height:52px;display:flex;align-items:center;gap:6px;padding:6px 9px;box-sizing:border-box;background:#151a20;border-bottom:1px solid #333"><b style="font-size:17px">🏠 3D Карты</b><span id="map3dRealInfo" style="color:#8f9aa8;font-size:10px">\\'+VERSION+\\'</span><div style="flex:1"></div><button id="r3dFloorDown">▼</button><button id="r3dFloorLabel" style="min-width:82px;font-weight:800">Этаж 1</button><button id="r3dFloorUp">▲</button><button id="r3dFloorHome">⌂</button><button id="r3dSave">💾</button><button id="r3dClose">✕</button></div><div id="r3dQuickHint" style="padding:6px 10px;background:#10151b;color:#aeb8c5;font-size:11px;min-height:17px">Выберите режим снизу. Камера управляется жестами или кнопками справа.</div><div id="r3dContextPanel" style="display:none"></div><div id="map3dRealCanvas" style="position:relative;flex:1;min-height:0;overflow:hidden"></div><div id="r3dCompat" style="display:none"><button id="r3dMore"></button><div id="r3dMorePanel"></div><button id="r3dLevelDown"></button><button id="r3dLevelUp"></button><button id="r3dFill"></button><button id="r3dPaint"></button><button id="r3dPaintFront"></button><button id="r3dPaintBack"></button><button id="r3dWallTools"></button><button id="r3dWallTextures"></button><button id="r3dFloorTextures"></button><button id="r3dCutaway"></button><button id="r3dUndo"></button><button id="r3dRedo"></button><button id="r3dDup"></button><button id="r3dFront"></button><button id="r3dBack"></button><button id="r3dFrontTex"></button><button id="r3dBackTex"></button><button id="r3dTexture"></button><button id="r3dModel"></button><button id="r3dMove"></button><button id="r3dRotate"></button><button id="r3dScale"></button><button id="r3dSnap"></button><button id="r3dLeft"></button><button id="r3dRight"></button><button id="r3dForward"></button><button id="r3dBackMove"></button><button id="r3dRotL"></button><button id="r3dRotR"></button><button id="r3dScaleDown"></button><button id="r3dScaleUp"></button></div>';
 document.body.appendChild(modal);
  setTimeout(function(){
  try{
    if(window.R3DNewUI &&
       typeof window.R3DNewUI.render === 'function'){
      window.R3DNewUI.render();
    }
  }catch(e){
    console.warn('[R3D UI] toolbar render', e);
  }
},0);
 
modal.querySelector('#r3dMore').onclick=function(){var p=modal.querySelector('#r3dMorePanel');p.style.display=p.style.display==='none'?'block':'none';};modal.querySelector('#r3dLevelDown').onclick=function(){changeLevel(-1);};modal.querySelector('#r3dLevelUp').onclick=function(){changeLevel(1);};modal.querySelector('#r3dFloorDown').onclick=function(){changeLevel(-1);};modal.querySelector('#r3dFloorUp').onclick=function(){changeLevel(1);};modal.querySelector('#r3dFloorHome').onclick=function(){cameraHome();};var r3dLibrary=modal.querySelector('#r3dLibrary');if(r3dLibrary)r3dLibrary.onclick=function(){openAssetLibrary();};var r3dMaterials=modal.querySelector('#r3dMaterials');if(r3dMaterials)r3dMaterials.onclick=openMaterialCatalog;modal.querySelector('#r3dFill').onclick=function(){var k=prompt('Заливка текущего этажа. Материал: stone, wood, brick, plaster, metal, dark','stone');if(k&&MATERIAL_CATALOG[k])applySurfaceFill(k);};modal.querySelector('#r3dPaint').onclick=function(){togglePaintMode();};modal.querySelector('#r3dPaintFront').onclick=function(){setPaintSide('front');togglePaintMode(true);};modal.querySelector('#r3dPaintBack').onclick=function(){setPaintSide('back');togglePaintMode(true);};modal.querySelector('#r3dWallTools').onclick=openWallTools;modal.querySelector('#r3dWallTextures').onclick=function(){openRootTexturePicker('wall');};modal.querySelector('#r3dFloorTextures').onclick=function(){openRootTexturePicker('floor');};modal.querySelector('#r3dCutaway').onclick=function(){toggleCutaway();};modal.querySelector('#r3dUndo').onclick=undo;modal.querySelector('#r3dRedo').onclick=redo;modal.querySelector('#r3dDup').onclick=duplicateSelected;modal.querySelector('#r3dClose').onclick=function(){cancelAnimationFrame(raf);if(gizmo&&gizmo.parent)gizmo.parent.remove(gizmo);simpleToolsRefresh=null;modal.remove();};
 modal.querySelector('#r3dMove').onclick=function(){setGizmoMode('translate');};modal.querySelector('#r3dRotate').onclick=function(){setGizmoMode('rotate');};modal.querySelector('#r3dScale').onclick=function(){setGizmoMode('scale');};modal.querySelector('#r3dSnap').onclick=function(){snapGrid=!snapGrid;this.textContent='🧲 Сетка: '+(snapGrid?'ВКЛ':'ВЫКЛ');if(snapGrid){applySnap();syncSelectedTransform();updateGizmo();}};
 modal.querySelector('#r3dFront').onclick=function(){colorSide('front');};modal.querySelector('#r3dBack').onclick=function(){colorSide('back');};modal.querySelector('#r3dModel').onclick=addModel;modal.querySelector('#r3dTexture').onclick=function(){addTexture('front');};modal.querySelector('#r3dFrontTex').onclick=function(){textureSide('front');};modal.querySelector('#r3dBackTex').onclick=function(){textureSide('back');};modal.querySelector('#r3dLeft').onclick=function(){nudgeSelected(-.25,0);};modal.querySelector('#r3dRight').onclick=function(){nudgeSelected(.25,0);};modal.querySelector('#r3dForward').onclick=function(){nudgeSelected(0,-.25);};modal.querySelector('#r3dBackMove').onclick=function(){nudgeSelected(0,.25);};modal.querySelector('#r3dRotL').onclick=function(){rotateSelected(-15);};modal.querySelector('#r3dRotR').onclick=function(){rotateSelected(15);};modal.querySelector('#r3dScaleDown').onclick=function(){scaleSelected(.9);};modal.querySelector('#r3dScaleUp').onclick=function(){scaleSelected(1.1);};modal.querySelector('#r3dSave').onclick=function(){saveMap();alert('Карта и assetRef сохранены.');};setEditorMode('build');
 (async function(){
  try{
   var threeModule=await import('./app/vendor/three.module.min.js');
   var loaderModule=await import('./app/vendor/GLTFLoader.js');
   THREE=threeModule;
   GLTFLoader=loaderModule.GLTFLoader;
   if(!THREE||!GLTFLoader)throw new Error('Three.js modules loaded without required exports');
   var host=modal.querySelector('#map3dRealCanvas');renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(global.devicePixelRatio||1,1.6));renderer.setSize(host.clientWidth,host.clientHeight,false);renderer.domElement.style.touchAction='none';renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement);cameraControlPanel(host);
   scene=new THREE.Scene();scene.background=new THREE.Color('#10151c');root=new THREE.Group();scene.add(root);camera=new THREE.PerspectiveCamera(55,1,.05,1000);raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
   scene.add(new THREE.HemisphereLight(0xffffff,0x223344,2));var dl=new THREE.DirectionalLight(0xffffff,2);dl.position.set(10,20,5);scene.add(dl);makeGizmo();
   var dragging=false,lastX=0,lastY=0,button=0,roomDrawStart=null,roomDrawActive=false;
   renderer.domElement.addEventListener('pointerdown',function(ev){var gp=sceneGroundPoint(ev);if(gp)lastScenePoint=gp;if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&floorToolArmed){applyFloorToolAt(ev,true);floorDrawActive=true;ev.preventDefault();return;}if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&wallToolArmed){var wx=Math.floor(gp.x),wy=Math.floor(gp.z),wl=Number(map.levels&&map.levels.current)||0,wk=wallKey(wl,wx,wy),w=map.walls&&map.walls[wk];if(!w){map.walls=map.walls||{};map.walls[wk]={level:wl,x:wx,y:wy,dir:'n',length:1,height:2.5,thickness:.09,color:'#777777',material:'stone',front:{texture:'none',color:'#777777'},back:{texture:'none',color:'#777777'},__key:wk};saveMap();build();updateInfo();}ev.preventDefault();return;}if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&roomToolArmed){if(beginOpeningDrag(ev)){ev.preventDefault();return;}if(beginWallHandleDrag(ev)){ev.preventDefault();return;}if(sceneEditableHit(ev)&&selectedWall()){pick(ev);ev.preventDefault();return;}}if(gp&&editorMode==='build'&&ev.button===0&&!pendingLibraryAsset&&roomToolArmed&&!sceneEditableHit(ev)){roomDrawStart={x:gp.x,y:gp.z};roomDrawActive=true;dragging=false;showRoomPreview(roomDrawStart,roomDrawStart);ev.preventDefault();return;}if(gp&&pendingLibraryAsset&&ev.button===0){placeLibraryAsset(pendingLibraryAsset.id,pendingLibraryAsset.name,gp);var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Модель поставлена. Выберите следующий инструмент.';ev.preventDefault();return;}touches[ev.pointerId]={clientX:ev.clientX,clientY:ev.clientY};if(ev.pointerType==='touch'&&Object.keys(touches).length>=2){beginTouchGesture();dragging=false;return;}var gh=ev.button===0?gizmoHit(ev):null;if(gh&&selected&&editorMode==='objects'){gizmoAxis=gh;gizmoDragging=true;gizmoStartX=ev.clientX;gizmoStartY=ev.clientY;gizmoStartPos=selected.position.clone();gizmoStartRot=selected.rotation.y;gizmoStartScale=selected.scale.clone();renderer.domElement.setPointerCapture&&renderer.domElement.setPointerCapture(ev.pointerId);return;}dragging=true;lastX=ev.clientX;lastY=ev.clientY;button=ev.button;renderer.domElement.setPointerCapture&&renderer.domElement.setPointerCapture(ev.pointerId);if(button===0){if(paintMode&&editorMode==='finish'){painting=true;paintHistoryStarted=false;paintedDuringStroke={};paintRay(ev);}else if(sceneEditableHit(ev))pick(ev);}});
   renderer.domElement.addEventListener('dblclick',function(){if(selected&&selected.userData&&selected.userData.mapObjectId){var o=(map.objects||[]).find(function(x){return String(x.id)===String(selected.userData.mapObjectId);});if(o){var v=prompt('Точный X Y Z, например 2 3 0',Number(o.x||0)+' '+Number(o.y||0)+' '+Number(o.z||0));if(v){var p=v.trim().split(/\\s+/).map(Number);if(p.length===3&&p.every(function(n){return Number.isFinite(n)})){selected.position.set(p[0]+.5,p[2],p[1]+.5);syncSelectedTransform();updateInfo();}}}}});
   renderer.domElement.addEventListener('pointermove',function(ev){if(openingDrag&&openingDrag.widthResize){updateOpeningHandleDrag(ev);return;}
 if(openingDrag){updateOpeningDrag(ev);return;}if(wallDrag){updateWallDrag(ev);return;}if(floorDrawActive&&floorToolArmed&&editorMode==='build'){applyFloorToolAt(ev,true);}if(roomDrawActive&&roomDrawStart){var rg=sceneGroundPoint(ev);if(rg)showRoomPreview(roomDrawStart,{x:rg.x,y:rg.z});}if(touches[ev.pointerId]){touches[ev.pointerId].clientX=ev.clientX;touches[ev.pointerId].clientY=ev.clientY;}if(Object.keys(touches).length>=2){updateTouchGesture();return;}if(gizmoDragging){gizmoMove(ev);return;}if(painting&&paintMode&&editorMode==='finish'){paintRay(ev);return;}if(!dragging)return;var dx=ev.clientX-lastX,dy=ev.clientY;lastX=ev.clientX;lastY=ev.clientY;if(button===0){controls.yaw-=dx*.008;controls.pitch=Math.max(.15,Math.min(1.45,controls.pitch-dy*.006));}else if(button===1||ev.shiftKey){var pan=.015*controls.distance;controls.target.x-=dx*pan;controls.target.z+=dy*pan;}});
   renderer.domElement.addEventListener('pointerup',function(ev){if(openingDrag){if(openingDrag.widthResize&&openingDrag.changed&&openingDrag.history){undoStack.push(openingDrag.history);redoStack=[];saveMap();build();updateInfo();}else{finishOpeningDrag();}}if(wallDrag){finishWallDrag();}floorDrawActive=false;lastFloorCell=null;if(roomDrawActive&&roomDrawStart){var gp=sceneGroundPoint(ev);hideRoomPreview();if(gp){createRoomFromPoints(roomDrawStart,{x:gp.x,y:gp.z});var h=document.getElementById('r3dQuickHint');if(h){var rb=roomBounds(roomDrawStart,{x:gp.x,y:gp.z});h.textContent='Комната '+(rb.x2-rb.x1)+' × '+(rb.y2-rb.y1)+' клеток создана. Теперь можно расставлять объекты.';}}roomDrawStart=null;roomDrawActive=false;}delete touches[ev.pointerId];painting=false;paintHistoryStarted=false;paintedDuringStroke={};dragging=false;gizmoDragging=false;gizmoAxis=null;setGizmoHighlight(null);if(Object.keys(touches).length<2)touchGesture=null;});renderer.domElement.addEventListener('pointercancel',function(ev){if(openingDrag)openingDrag=null;if(wallDrag)wallDrag=null;delete touches[ev.pointerId];painting=false;paintHistoryStarted=false;paintedDuringStroke={};dragging=false;gizmoDragging=false;gizmoAxis=null;touchGesture=null;setGizmoHighlight(null);});
   renderer.domElement.addEventListener('pointermove',function(ev){if(!gizmoDragging){var gh=gizmoHit(ev);setGizmoHighlight(gh);}});renderer.domElement.addEventListener('wheel',function(ev){ev.preventDefault();controls.distance=Math.max(3,Math.min(150,controls.distance*Math.exp(ev.deltaY*.001)));},{passive:false});
   renderer.domElement.addEventListener('dragover',function(ev){ev.preventDefault();});renderer.domElement.addEventListener('drop',function(ev){ev.preventDefault();var id=ev.dataTransfer&&ev.dataTransfer.getData('text/plain');if(!id)return;var rr=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-rr.left)/rr.width)*2-1;mouse.y=-((ev.clientY-rr.top)/rr.height)*2+1;raycaster.setFromCamera(mouse,camera);var g=root.children.find(function(x){return x.userData&&x.userData.editorKind==='ground';});var hit=g?raycaster.intersectObject(g,true)[0]:null;getAsset(id).then(function(rec){ensureMapCollections();pushHistory();map.objects.push({id:'obj_'+Date.now().toString(36),name:rec&&rec.meta&&rec.meta.name||'Asset',assetId:id,x:hit?hit.point.x-.5:1,y:hit?hit.point.z-.5:1,z:0,level:Number(map.levels&&map.levels.current)||0,scaleX:1,scaleY:1,scaleZ:1,rotation:0});saveMap();build();});});renderer.domElement.addEventListener('contextmenu',function(ev){ev.preventDefault();});
   window.addEventListener('resize',resize);resize();ensureMapCollections();cameraHome();updateGizmo();openAssetDB().catch(function(e){console.warn('IndexedDB unavailable; asset persistence disabled',e);});build();frame();
   modal.querySelector('#map3dRealInfo').textContent='WebGL готов • '+(map.name||'Новая карта');
  }catch(e){var em=e&&e.message||String(e);modal.querySelector('#map3dRealInfo').textContent='Ошибка WebGL: '+em;try{console.error('[DND 3D] startup failed',e);if(typeof global.dndDebugLog==='function')global.dndDebugLog('3D map startup failed: '+em,'error');}catch(_){}alert('Не удалось запустить настоящий 3D: '+em+'\nСтарый редактор не удалён.');}
 })();
}
global.R3DEditorAPI={setMode:function(m){setEditorMode(m);},buildRoom:function(){setEditorMode('build');roomToolArmed=true;wallToolArmed=false;floorToolArmed=false;var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Комната: потяните по карте от угла до угла.';},buildWall:function(){setEditorMode('build');wallToolArmed=true;roomToolArmed=false;floorToolArmed=false;var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Стена: нажимайте по клеткам, чтобы создавать стены.';},buildFloor:function(){setEditorMode('build');roomToolArmed=false;wallToolArmed=false;floorToolArmed=true;togglePaintMode(false);var h=document.getElementById('r3dQuickHint');if(h)h.textContent='Пол: проведите пальцем по клеткам. Нет плитки — пустота и падение.'},openTexture:function(kind){setEditorMode('finish');openRootTexturePicker(kind||'wall');},paint:function(){setEditorMode('finish');togglePaintMode(true);},selectWindow:function(){setEditorMode('build');},addModel:openAssetLibrary,editWall:editSelectedWall,view:function(m){setEditorMode(m==='editor'?'build':'view');},cutaway:function(){setEditorMode('build');toggleCutaway();},createLevel:function(dir){createLevel(dir);},levelUp:function(){changeLevel(1);},levelDown:function(){changeLevel(-1);},mapSize:function(dir,delta){resizeMapEdge(dir,delta);},getMapInfo:function(){normalizeLevelData();return {cols:Number(map.grid&&map.grid.cols)||20,rows:Number(map.grid&&map.grid.rows)||20,minLevel:Number(map.levels.min)||0,maxLevel:Number(map.levels.max)||0,currentLevel:Number(map.levels.current)||0,floors:mapLevelCount()};},hasFloor:function(level,x,y){return !!floorAt(level,x,y);}};
global.dndMap3DOpenReal=open;
global.dndMap3DOpen=open;
})(window);

// V70.36.87 OTA: Android WebView uses classic offline Three.js loader
 {cols:Number(map.grid&&map.grid.cols)||20,rows:Number(map.grid&&map.grid.rows)||20,minLevel:Number(map.levels.min)||0,maxLevel:Number(map.levels.max)||0,currentLevel:Number(map.levels.current)||0,floors:mapLevelCount()};},hasFloor:function(level,x,y){return !!floorAt(level,x,y);}};
global.dndMap3DOpenReal=open;
global.dndMap3DOpen=open;
})(window);

// V70.36.87 OTA: Android WebView uses classic offline Three.js loader
