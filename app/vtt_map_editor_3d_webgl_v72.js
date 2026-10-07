/* V70.36.70 — true WebGL 3D map editor
 * Three.js renderer + GLB/GLTF loading. Reads the existing V15 map format from localStorage.
 * The legacy canvas editor remains available as fallback.
 */
(function(global){
'use strict';
var THREE=null,GLTFLoader=null,renderer=null,scene=null,camera=null,root=null,raf=0,map=null,selected=null,mode='orbit',raycaster=null,mouse=null,controls={yaw:.8,pitch:.8,distance:24,target:new (global.Object3D||function(){})()};
var VERSION='V70.36.70';
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c];});}
function hex(v,f){return /^#[0-9a-f]{6}$/i.test(String(v||''))?String(v):f;}
function loadMap(){try{return JSON.parse(localStorage.getItem('dnd_vtt_3d_map')||'null');}catch(e){return null;}}
function saveMap(){if(!map)return;localStorage.setItem('dnd_vtt_3d_map',JSON.stringify(map));}
function side(w,n){w[n]=w[n]||{texture:'none',color:null};return w[n];}
function material(color,rough){return new THREE.MeshStandardMaterial({color:hex(color,'#777777'),roughness:rough==null?.82:rough,metalness:0});}
function tex(url){if(!url||url==='none')return null;try{var l=new THREE.TextureLoader();var t=l.load(url);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}catch(e){return null;}}
function matFromSide(s,base){var m=material((s&&s.color)||base);var t=tex(s&&s.texture);if(t)m.map=t;return m;}
function addBox(name,x,y,z,w,h,d,mats,rot){
 var g=new THREE.BoxGeometry(w,h,d);var ms=Array.isArray(mats)?mats:[mats||material('#777')];var o=new THREE.Mesh(g,ms);o.name=name;o.position.set(x+w*.5,y+d*.5,z+h*.5);if(rot)o.rotation.y=Number(rot)*Math.PI/180;root.add(o);return o;
}
function wallMesh(w){
 var h=Math.max(.5,Number(w.height)||2.5),t=Math.max(.03,Number(w.thickness)||.09),z=(Number(w.level)||0)*3+(Number(map.cells&&map.cells[(w.level||0)+':'+w.x+':'+w.y])||0);
 var front=side(w,'front'),back=side(w,'back'),base=w.color||'#777777';
 var mats=[material(base),matFromSide(front,base),matFromSide(back,base),material(base),material(base),material(base)];
 var x=Number(w.x)||0,y=Number(w.y)||0;
 if(w.dir==='n')return addBox('wall:'+w.level+':'+x+':'+y,x,y-t/2,z,1,t,h,mats);
 return addBox('wall:'+w.level+':'+x+':'+y,x+1-t/2,y,z,t,1,h,mats);
}
function build(){
 if(!THREE||!map)return;
 while(root.children.length)root.remove(root.children[0]);
 var cols=Number(map.grid&&map.grid.cols)||20,rows=Number(map.grid&&map.grid.rows)||20,level=Number(map.levels&&map.levels.current)||0;
 var ground=new THREE.Mesh(new THREE.PlaneGeometry(cols,rows),material('#30352f',1));ground.rotation.x=-Math.PI/2;ground.position.set(cols/2,0,rows/2);ground.name='ground';root.add(ground);
 var surfaces=map.surfaces||{};Object.keys(surfaces).forEach(function(k){var p=k.split(':'),l=Number(p[0]),x=Number(p[1]),y=Number(p[2]);if(l!==level)return;var s=surfaces[k],m=material(s.color||'#30352f');var t=tex(s.texture);if(t){t.repeat.set(Number(s.repeatX)||1,Number(s.repeatY)||1);m.map=t;}var q=new THREE.Mesh(new THREE.BoxGeometry(1,.08,1),m);q.position.set(x+.5,Number((map.cells&&map.cells[k])||0)*.12+.04,y+.5);q.name='surface:'+k;root.add(q);});
 Object.keys(map.walls||{}).forEach(function(k){var w=map.walls[k];if(Number(w.level)===level)wallMesh(w);});
 (map.objects||[]).forEach(function(o){if(Number(o.level||0)!==level)return;var m=material(o.color||'#8b5a2b');var t=tex(o.texture);if(t)m.map=t;var q=addBox('object:'+o.id,Number(o.x)+.5,Number(o.y)+.5,Number(o.z)||0,(Number(o.size)||.8)*Number(o.scaleX||1),Math.max(.1,Number(o.size)||.8)*Number(o.scaleZ||1),(Number(o.size)||.8)*Number(o.scaleY||1),m,Number(o.rotation)||0);q.userData.mapObjectId=o.id;});
 (map.tokens||[]).forEach(function(o){if(Number(o.level||0)!==level)return;var q=addBox('token:'+o.id,Number(o.x)+.35,Number(o.y)+.35,.12,.3,.3,.3,material(o.kind==='monster'?'#b33':'#39c'));q.userData.tokenId=o.id;});
}
function resize(){if(!renderer)return;var c=renderer.domElement,w=c.clientWidth,h=c.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();}
function frame(){if(!renderer)return;var c=renderer.domElement,dx=Math.cos(controls.yaw)*Math.cos(controls.pitch)*controls.distance,dy=Math.sin(controls.pitch)*controls.distance,dz=Math.sin(controls.yaw)*Math.cos(controls.pitch)*controls.distance;camera.position.set(controls.target.x+dx,controls.target.y+dy+8,controls.target.z+dz);camera.lookAt(controls.target.x,controls.target.y,controls.target.z);renderer.render(scene,camera);raf=requestAnimationFrame(frame);}
function pick(ev){if(!raycaster||!renderer)return;var r=renderer.domElement.getBoundingClientRect();mouse.x=((ev.clientX-r.left)/r.width)*2-1;mouse.y=-((ev.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(mouse,camera);var hits=raycaster.intersectObjects(root.children,true).filter(function(h){return h.object.name!=='ground';});if(!hits.length)return;selected=hits[0].object;updateInfo();}
function updateInfo(){var e=document.getElementById('map3dRealInfo');if(!e)return;e.textContent=selected?'Выбрано: '+selected.name:'Ничего не выбрано';}
function colorSide(which){
 if(!selected||selected.name.indexOf('wall:')!==0){alert('Выберите стену в 3D-сцене.');return;}
 var parts=selected.name.split(':');var k=parts.slice(1).join(':');var w=map.walls&&map.walls[k];if(!w){alert('Стена не найдена в карте.');return;}
 var s=side(w,which),v=prompt(which==='front'?'Цвет внутренней стороны':'Цвет внешней стороны',s.color||'#777777');if(v===null)return;if(!/^#[0-9a-f]{6}$/i.test(v)){alert('Нужен цвет #RRGGBB');return;}s.color=v;saveMap();build();updateInfo();
}
function addModel(){
 var input=document.createElement('input');input.type='file';input.accept='.glb,.gltf,model/gltf-binary,model/gltf+json';input.onchange=function(){var f=input.files&&input.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){var loader=new GLTFLoader();loader.parse(rd.result,'',function(g){g.scene.position.set(1,0,1);g.scene.scale.set(1,1,1);g.scene.userData.localAssetName=f.name;root.add(g.scene);alert('3D-модель загружена. Сейчас она размещена в сцене; следующий этап — сохранение её assetRef в JSON.');},function(e){alert('Не удалось загрузить GLB/GLTF: '+e.message);});};rd.readAsArrayBuffer(f);};input.click();
}
function open(){
 if(document.getElementById('map3dRealModal'))return;
 map=loadMap();if(!map){alert('Сначала создайте или сохраните 3D-карту в редакторе.');return;}
 var modal=document.createElement('div');modal.id='map3dRealModal';modal.style.cssText='position:fixed;inset:0;z-index:32000;background:#080b10;color:#fff;display:flex;flex-direction:column;';
 modal.innerHTML='<div style="height:48px;display:flex;align-items:center;gap:8px;padding:6px 10px;box-sizing:border-box;background:#151a20;border-bottom:1px solid #444"><b>🏗️ Настоящий 3D-редактор</b><span style="color:#888">'+VERSION+'</span><span id="map3dRealInfo" style="flex:1;color:#aaa">Загрузка WebGL…</span><button id="r3dFront">🎨 Внутри</button><button id="r3dBack">🎨 Снаружи</button><button id="r3dModel">🧩 GLB/GLTF</button><button id="r3dSave">💾 Сохранить</button><button id="r3dClose">✕</button></div><div id="map3dRealCanvas" style="position:relative;flex:1;min-height:0;overflow:hidden"></div>';
 document.body.appendChild(modal);
 modal.querySelector('#r3dClose').onclick=function(){cancelAnimationFrame(raf);modal.remove();};
 modal.querySelector('#r3dFront').onclick=function(){colorSide('front');};modal.querySelector('#r3dBack').onclick=function(){colorSide('back');};modal.querySelector('#r3dModel').onclick=addModel;modal.querySelector('#r3dSave').onclick=function(){saveMap();alert('Карта сохранена.');};
 (async function(){
  try{
   var T=await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js');
   var L=await import('https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js');
   THREE=T;GLTFLoader=L.GLTFLoader;
   var host=modal.querySelector('#map3dRealCanvas');renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(global.devicePixelRatio||1,1.6));renderer.setSize(host.clientWidth,host.clientHeight,false);renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement);
   scene=new THREE.Scene();scene.background=new THREE.Color('#10151c');root=new THREE.Group();scene.add(root);camera=new THREE.PerspectiveCamera(55,1,.05,1000);raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
   scene.add(new THREE.HemisphereLight(0xffffff,0x223344,2));var dl=new THREE.DirectionalLight(0xffffff,2);dl.position.set(10,20,5);scene.add(dl);
   renderer.domElement.addEventListener('pointerdown',pick);window.addEventListener('resize',resize);resize();build();frame();
   modal.querySelector('#map3dRealInfo').textContent='WebGL готов • '+(map.name||'Новая карта');
  }catch(e){modal.querySelector('#map3dRealInfo').textContent='WebGL/Three.js не загрузился';alert('Не удалось запустить настоящий 3D: '+e.message+'\nСтарый редактор не удалён.');}
 })();
}
global.dndMap3DOpenReal=open;
global.dndMap3DOpen=open;
})(window);
