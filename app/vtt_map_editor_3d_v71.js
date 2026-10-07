/**
 * vtt_map_editor_3d_v71.js
 * Новый 3D-прототип редактора карт без внешних ассетов.
 * Software-rendered canvas: сетка, высота клеток, кубы/стены, камера и touch-жесты.
 * Архитектура намеренно отделена от старого battle_board.js.
 */
(function(global){
  'use strict';
  var VERSION='0.9.8';
  var state={
    open:false, mapName:'Новая карта', mapNotes:'', cols:20, rows:20, minLevel:0, maxLevel:0, currentLevel:0, cell:1,
    cells:{}, surfaces:{}, objects:[], walls:{}, connectors:[], tokens:[], combat:{active:false,round:1,currentId:null,order:[],startedAt:0,mode:true,turns:{}},
    player:{x:9.5,y:9.5,level:0,yaw:0,pitch:0,elevation:0},
    playerCharacter:{id:null,name:'Персонаж',className:'Воин',tokenGlyph:'⚔️'},
    activeTokenId:null,
    cameraMode:'editor', playMode:false, fullscreenOwned:false,
    camera:{yaw:-0.75,pitch:0.58,distance:18,targetX:9.5,targetY:9.5,targetZ:0},
    gesture:{mode:null,lastX:0,lastY:0,lastDist:0,lastAngle:0,selectStart:null,selectEnd:null},
    tool:'select', selectionMode:true, selected:null, wallEditDir:'n', connectorDir:'n', view:{eyeHeight:1.6,walkSpeed:.16,runMultiplier:1.7,maxStep:.75,thirdPersonDistance:5,thirdPersonHeight:2.4}
  };
  var canvas=null,ctx=null,raf=0,textureCache={},selectionClipboard=null;

  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function key(level,x,y){return level+':'+x+':'+y;}
  function cellHeight(x,y,level){level=level==null?state.currentLevel:level;return Number(state.cells[key(level,x,y)])||0;}
  function surfaceKey(level,x,y){return key(level,x,y);}
  function surfaceAt(x,y,level){level=level==null?state.currentLevel:level;return state.surfaces[surfaceKey(level,x,y)]||{type:'ground',material:'default',texture:'none',color:'#30352f',friction:1,repeatX:1,repeatY:1,walkable:true,swimRequired:false,slippery:false,hazard:false,damage:0,damageType:'fire',hazardNote:''};}
  function normalizeSurface(d){d=d||{};return {type:String(d.type||'ground'),material:String(d.material||'default'),texture:d.texture||'none',color:d.color||'#30352f',friction:isFinite(Number(d.friction))?clamp(Number(d.friction),.05,2):1,repeatX:isFinite(Number(d.repeatX))?clamp(Number(d.repeatX),.1,20):1,repeatY:isFinite(Number(d.repeatY))?clamp(Number(d.repeatY),.1,20):1,walkable:d.walkable!==false,swimRequired:!!d.swimRequired,slippery:!!d.slippery,hazard:!!d.hazard,damage:Math.max(0,Number(d.damage)||0),damageType:String(d.damageType||'fire'),hazardNote:String(d.hazardNote||'')};}
  function setSurface(x,y,data,level){level=level==null?state.currentLevel:level;var k=surfaceKey(level,x,y),v=normalizeSurface(data);if(v.type==='ground'&&v.material==='default'&&v.texture==='none'&&v.color==='#30352f'&&v.friction===1&&v.repeatX===1&&v.repeatY===1&&v.walkable&&!v.swimRequired&&!v.slippery&&!v.hazard&&v.damage===0&&!v.hazardNote)delete state.surfaces[k];else state.surfaces[k]=v;}
  function normalizeSurfaces(){var out={};Object.keys(state.surfaces||{}).forEach(function(k){var p=k.split(':');if(p.length!==3)return;var level=Number(p[0]),x=Number(p[1]),y=Number(p[2]);if(level<state.minLevel||level>state.maxLevel||x<0||y<0||x>=state.cols||y>=state.rows)return;out[surfaceKey(level,x,y)]=normalizeSurface(state.surfaces[k]);});state.surfaces=out;}
  function surfaceMaterial(sf){return {type:sf.material||'default',repeatX:sf.repeatX||1,repeatY:sf.repeatY||1,offsetX:0,offsetY:0};}
  function editSurfaceDialog(){var s=selectionBounds();if(!s&&state.selected&&typeof state.selected!=='string')s={x1:state.selected.x,y1:state.selected.y,x2:state.selected.x,y2:state.selected.y};if(!s){alert('Сначала выберите клетку или область.');return;}var base=normalizeSurface(surfaceAt(s.x1,s.y1,state.currentLevel));var type=prompt('Тип: ground/stone/wood/sand/water/mud/ice/lava',base.type);if(type===null)return;type=String(type).toLowerCase();if(['ground','stone','wood','sand','water','mud','ice','lava'].indexOf(type)<0){alert('Неизвестный тип поверхности.');return;}var texture=prompt('Путь/URL текстуры (пусто = без текстуры)',base.texture==='none'?'':base.texture);if(texture===null)return;var repeat=prompt('Повтор текстуры X,Y',base.repeatX+','+base.repeatY);if(repeat===null)return;var ra=repeat.split(',').map(Number);var color=prompt('Цвет #RRGGBB',base.color);if(color===null)return;var fr=prompt('Трение / коэффициент движения (0.05–2)',String(base.friction));if(fr===null)return;var special=type==='water'?'Вода: плавание обязательно? 0/1':type==='ice'?'Лёд: скользкая поверхность? 0/1':type==='lava'?'Лава: урон за вход':'Урон за вход (0=нет)';var sv=prompt(special,type==='lava'?String(base.damage):String(type==='water'?(base.swimRequired?1:0):(type==='ice'?(base.slippery?1:0):base.damage)));if(sv===null)return;var swim=type==='water'?Number(sv)>0:base.swimRequired,slip=type==='ice'?Number(sv)>0:base.slippery,dmg=(type==='lava'||type==='ground'||type==='stone'||type==='wood'||type==='sand'||type==='mud')?Math.max(0,Number(type==='lava'?sv:base.damage)||0):base.damage;var dtype=prompt('Тип урона (fire/cold/acid/etc.)',base.damageType);if(dtype===null)return;var note=prompt('Примечание опасности',base.hazardNote);if(note===null)return;var data=normalizeSurface({type:type,material:type==='stone'?'stone':type==='wood'?'wood':'default',texture:texture||'none',color:/^#[0-9a-f]{6}$/i.test(color)?color:base.color,friction:Number(fr),repeatX:isFinite(ra[0])?ra[0]:1,repeatY:isFinite(ra[1])?ra[1]:1,walkable:base.walkable,swimRequired:swim,slippery:slip,hazard:dmg>0,damage:dmg,damageType:dtype,hazardNote:note});for(var y=s.y1;y<=s.y2;y++)for(var x=s.x1;x<=s.x2;x++)setSurface(x,y,data,state.currentLevel);if(data.texture!=='none')loadTexture(data.texture);draw();renderTools();}
  function cycleSurface(){var s=selectionBounds(),base;if(s)base={x:s.x1,y:s.y1};else if(state.selected&&typeof state.selected!=='string')base={x:state.selected.x,y:state.selected.y};else{alert('Сначала выберите клетку или область.');return;}var types=['ground','stone','wood','sand','water','mud','ice','lava'],cur=surfaceAt(base.x,base.y,state.currentLevel),i=types.indexOf(cur.type),type=types[(i+1)%types.length],colors={ground:'#30352f',stone:'#686868',wood:'#68462d',sand:'#9b824d',water:'#355d78',mud:'#514738',ice:'#7395a8',lava:'#7a3020'},data={type:type,material:type==='stone'?'stone':type==='wood'?'wood':'default',texture:'none',color:colors[type]||'#30352f',friction:type==='ice'?.5:type==='mud'?.75:1};if(s)for(var y=s.y1;y<=s.y2;y++)for(var x=s.x1;x<=s.x2;x++)setSurface(x,y,data,state.currentLevel);else setSurface(base.x,base.y,data,state.currentLevel);draw();renderTools();}
  function setSurfaceDialog(){var s=selectionBounds(),base=s||{x1:state.selected&&state.selected.x,y1:state.selected&&state.selected.y,x2:state.selected&&state.selected.x,y2:state.selected&&state.selected.y};if(base.x1==null){alert('Сначала выберите клетку или область.');return;}var types=['ground','stone','wood','sand','water','mud','ice','lava'],v=prompt('Тип поверхности: 1 земля, 2 камень, 3 дерево, 4 песок, 5 вода, 6 грязь, 7 лёд, 8 лава',String(types.indexOf(surfaceAt(base.x1,base.y1,state.currentLevel))+1||1));if(v===null)return;var type=types[clamp(Math.floor(Number(v)||1),1,types.length)-1],color=surfaceAt(base.x1,base.y1,state.currentLevel).color;var colors={ground:'#30352f',stone:'#686868',wood:'#68462d',sand:'#9b824d',water:'#355d78',mud:'#514738',ice:'#7395a8',lava:'#7a3020'};color=colors[type];for(var y=base.y1;y<=base.y2;y++)for(var x=base.x1;x<=base.x2;x++)setSurface(x,y,{type:type,material:type==='stone'?'stone':type==='wood'?'wood':'default',texture:'none',color:color,friction:type==='ice'?.5:type==='mud'?.75:1},state.currentLevel);draw();renderTools();}
  function surfacePresetDialog(){var v=prompt('Пресет поверхности: 1 каменный пол, 2 деревянный пол, 3 песок, 4 вода, 5 грязь, 6 лёд, 7 лава','1');if(v===null)return;var p=[{type:'stone',material:'stone',color:'#686868',friction:1},{type:'wood',material:'wood',color:'#68462d',friction:1},{type:'sand',material:'default',color:'#9b824d',friction:.9},{type:'water',material:'default',color:'#355d78',friction:.6},{type:'mud',material:'default',color:'#514738',friction:.75},{type:'ice',material:'default',color:'#7395a8',friction:.5},{type:'lava',material:'default',color:'#7a3020',friction:.2}][clamp(Math.floor(Number(v)||1),1,7)-1];var s=selectionBounds();if(!s&&state.selected&&typeof state.selected!=='string')s={x1:state.selected.x,y1:state.selected.y,x2:state.selected.x,y2:state.selected.y};if(!s){alert('Сначала выделите область.');return;}for(var y=s.y1;y<=s.y2;y++)for(var x=s.x1;x<=s.x2;x++)setSurface(x,y,p,state.currentLevel);draw();renderTools();}
  function saveUserPreset(){var s=selectionBounds();if(!s){alert('Сначала выделите область.');return;}var name=prompt('Название пресета','Мой участок');if(!name)return;var list=loadUserPresets(),clip=makeSelectionClip(s);clip.name=name.trim();clip.updatedAt=Date.now();list.push(clip);localStorage.setItem('dnd_vtt_map_presets_v1',JSON.stringify(list));alert('Пресет сохранён: '+clip.name);}
  function loadUserPresets(){try{var d=JSON.parse(localStorage.getItem('dnd_vtt_map_presets_v1')||'[]');return Array.isArray(d)?d:[];}catch(e){return [];}}
  function manageUserPresets(){var list=loadUserPresets();if(!list.length){alert('Библиотека участков пуста.');return;}var names=list.map(function(p,i){return (i+1)+'. '+p.name+' ('+p.w+'×'+p.h+')';}).join('\n');var v=prompt('Номер пресета:\n'+names,'1');if(v===null)return;var i=clamp(Math.floor(Number(v)||1),1,list.length)-1;var action=prompt('Действие: 1 переименовать, 2 удалить','1');if(action===null)return;if(Number(action)===1){var nn=prompt('Новое название',list[i].name);if(nn)list[i].name=nn.trim();}else if(Number(action)===2){if(!confirm('Удалить «'+list[i].name+'»?'))return;list.splice(i,1);}localStorage.setItem('dnd_vtt_map_presets_v1',JSON.stringify(list));renderTools();}
  function makeSelectionClip(s){var level=state.currentLevel,clip={w:s.x2-s.x1+1,h:s.y2-s.y1+1,cells:[],surfaces:[],objects:[],walls:[]};for(var y=s.y1;y<=s.y2;y++)for(var x=s.x1;x<=s.x2;x++){clip.cells.push({dx:x-s.x1,dy:y-s.y1,h:cellHeight(x,y,level)});clip.surfaces.push({dx:x-s.x1,dy:y-s.y1,s:surfaceAt(x,y,level)});}state.objects.forEach(function(o){if(Number(o.level)===level&&o.x>=s.x1&&o.x<=s.x2&&o.y>=s.y1&&o.y<=s.y2)clip.objects.push({dx:o.x-s.x1,dy:o.y-s.y1,o:JSON.parse(JSON.stringify(o))});});Object.keys(state.walls).forEach(function(k){var w=state.walls[k];if(Number(w.level)===level&&w.x>=s.x1&&w.x<=s.x2&&w.y>=s.y1&&w.y<=s.y2)clip.walls.push({dx:w.x-s.x1,dy:w.y-s.y1,w:JSON.parse(JSON.stringify(w))});});return clip;}
  function placeUserPreset(){var list=loadUserPresets();if(!list.length){alert('Пользовательских пресетов пока нет.');return;}var names=list.map(function(p,i){return (i+1)+'. '+p.name;}).join('\n'),v=prompt('Выберите пресет:\n'+names,'1');if(v===null)return;var p=list[clamp(Math.floor(Number(v)||1),1,list.length)-1],s=selectionBounds(),ax=s?s.x1:(state.selected&&state.selected.x),ay=s?s.y1:(state.selected&&state.selected.y);if(ax==null||ay==null){alert('Выберите место вставки.');return;}p.cells.forEach(function(v){if(ax+v.dx<state.cols&&ay+v.dy<state.rows)setCellHeight(ax+v.dx,ay+v.dy,v.h,state.currentLevel);});p.surfaces.forEach(function(v){if(ax+v.dx<state.cols&&ay+v.dy<state.rows)setSurface(ax+v.dx,ay+v.dy,v.s,state.currentLevel);});p.objects.forEach(function(v){var o=JSON.parse(JSON.stringify(v.o));o.id='obj_'+Date.now()+'_'+Math.random().toString(36).slice(2);o.x=ax+v.dx;o.y=ay+v.dy;o.level=state.currentLevel;if(o.x<state.cols&&o.y<state.rows)state.objects.push(o);});p.walls.forEach(function(v){if(ax+v.dx<state.cols&&ay+v.dy<state.rows){var w=JSON.parse(JSON.stringify(v.w));w.level=state.currentLevel;setWall(ax+v.dx,ay+v.dy,w.dir,true,state.currentLevel,w);}});state.gesture.selectStart={x:ax,y:ay};state.gesture.selectEnd={x:Math.min(state.cols-1,ax+p.w-1),y:Math.min(state.rows-1,ay+p.h-1)};draw();renderTools();}

  function setCellHeight(x,y,h,level){level=level==null?state.currentLevel:level;var k=key(level,x,y),v=clamp(Math.round(h),0,12);if(v===0)delete state.cells[k];else state.cells[k]=v;}
  function levelLabel(n){return n===0?'0':(n>0?'+'+n:String(n));}
  function mapHeight(){return Math.max(1,state.maxLevel-state.minLevel+1);}
  function normalizeLevels(){state.minLevel=Math.min(0,Math.floor(Number(state.minLevel)||0));state.maxLevel=Math.max(0,Math.floor(Number(state.maxLevel)||0));state.currentLevel=clamp(Math.floor(Number(state.currentLevel)||0),state.minLevel,state.maxLevel);}
  function classTokenInfo(ch){
    var classes=Array.isArray(ch&&ch.classes)?ch.classes:[];
    var primary=(ch&& (ch.class||ch.className))||'';
    if(classes.length){classes=classes.slice().sort(function(a,b){return Number(b.level||0)-Number(a.level||0);});primary=classes[0].name||primary;}
    var map={'Воин':'⚔️','Fighter':'⚔️','Варвар':'🪓','Barbarian':'🪓','Бард':'🎵','Bard':'🎵','Жрец':'✝️','Cleric':'✝️','Друид':'🌿','Druid':'🌿','Монах':'☯️','Monk':'☯️','Паладин':'🛡️','Paladin':'🛡️','Следопыт':'🏹','Ranger':'🏹','Плут':'🗡️','Rogue':'🗡️','Колдун':'🔮','Sorcerer':'🔮','Чародей':'🔮','Волшебник':'🪄','Wizard':'🪄','Чернокнижник':'🜏','Warlock':'🜏','Изобретатель':'⚙️','Artificer':'⚙️','Алхимик':'⚗️','Alchemist':'⚗️','Кровавый охотник':'🩸','Blood Hunter':'🩸','Некромант':'💀','Necromancer':'💀','Оккультист':'👁️','Occultist':'👁️'};
    return {name:String(ch&&ch.name||'Персонаж'),className:String(primary||'Класс'),glyph:map[primary]||'✦'};
  }
  function loadMapCharacters(){try{var raw=localStorage.getItem('dnd_multi_characters_v2'),d=raw?JSON.parse(raw):[];var list=Array.isArray(d)?d:(d&&Array.isArray(d.characters)?d.characters:[]);return list.filter(function(x){return x&&x.id!=null;});}catch(e){return [];}}
  function selectPlayerCharacter(id){var list=loadMapCharacters(),found=null;list.some(function(ch){if(String(ch.id)===String(id)){found=ch;return true;}return false;});if(found){var t=classTokenInfo(found);state.playerCharacter={id:found.id,name:t.name,className:t.className,tokenGlyph:t.glyph};}else if(String(id)==='__test__'){state.playerCharacter={id:null,name:'Тестовый персонаж',className:'Воин',tokenGlyph:'⚔️'};}draw();renderTools();}
  function playerCharacterOptions(){var list=loadMapCharacters(),html='<option value="__test__"'+(state.playerCharacter.id==null?' selected':'')+'>⚔️ Тестовый персонаж • Воин</option>';list.forEach(function(ch){var t=classTokenInfo(ch),sel=String(ch.id)===String(state.playerCharacter.id)?' selected':'';html+='<option value="'+esc(ch.id)+'"'+sel+'>'+esc(t.glyph+' '+t.name+' • '+t.className)+'</option>';});return html;}
  function tokenById(id){for(var i=0;i<state.tokens.length;i++)if(state.tokens[i].id===id)return state.tokens[i];return null;}
  function objectAtScreen(px,py){var best=null,bd=1e9;state.objects.forEach(function(o){if(Number(o.level||0)!==state.currentLevel)return;var z=cellHeight(o.x,o.y,state.currentLevel)+Number(o.z||0)+Number(o.size||.8)*.5,p=project(o.x+.5,o.y+.5,z),r=Math.max(18,p.scale*Math.max(Number(o.scaleX||1),Number(o.scaleY||1),.8)*.5),d=Math.hypot(px-p.x,py-p.y);if(d<r&&d<bd){bd=d;best=o;}});return best;}
  function tokenAtScreen(px,py){var best=null,bd=1e9;state.tokens.forEach(function(t){if(Number(t.level)!==Number(state.currentLevel))return;var z=cellHeight(Math.floor(t.x),Math.floor(t.y),t.level)+.1,p=project(t.x,t.y,z),r=Math.max(12,Math.min(24,p.scale*.38)),d=Math.hypot(px-p.x,py-p.y);if(d<Math.max(r+8,22)&&d<bd){bd=d;best=t;}});return best;}
  function tokenGlyphFor(t){return String(t&&t.tokenGlyph||'✦');}
  function ensureCombat(){state.combat=state.combat||{active:false,round:1,currentId:null,order:[],startedAt:0,mode:true};state.combat.mode=state.combat.mode!==false;state.combat.turns=state.combat.turns||{};state.combat.order=Array.isArray(state.combat.order)?state.combat.order:[];state.combat.round=Number(state.combat.round)||1;return state.combat;}
  function tokenInitiative(t){var v=Number(t&&t.initiative);return isFinite(v)?v:0;}
  function sortInitiative(){var c=ensureCombat();c.order=state.tokens.filter(function(t){return t.visible!==false&&t.kind!=='effect';}).map(function(t){return t.id;}).sort(function(a,b){var A=tokenById(a)||{},B=tokenById(b)||{};return tokenInitiative(B)-tokenInitiative(A)||String(A.name||'').localeCompare(String(B.name||''));});if(c.currentId&&!c.order.includes(c.currentId))c.currentId=c.order[0]||null;}
  function selectedToken(){return tokenById(state.selected);}
  function combatTurn(t){var c=ensureCombat();if(!t)return null;var id=t.id;if(!c.turns[id])c.turns[id]={movementUsed:0,action:true,bonus:true,reaction:true};return c.turns[id];}
  function tokenSpeedFt(t){var v=Number(t&&t.speed);return isFinite(v)&&v>=0?v:30;}
  function movementRemainingFt(t){if(!ensureCombat().mode)return Infinity;var tr=combatTurn(t);return Math.max(0,tokenSpeedFt(t)-Number(tr.movementUsed||0));}
  function resetTurnResources(){var c=ensureCombat();c.turns={};c.order.forEach(function(id){var t=tokenById(id);if(t)combatTurn(t);});}
  function setSelectedKind(){var t=selectedToken();if(!t)return;var v=prompt('Тип: player / npc / monster / effect',t.kind||'player');if(['player','npc','monster','effect'].includes(v)){t.kind=v;t.layer=v==='player'?'players':v==='npc'?'npcs':v==='monster'?'monsters':'effects';sortInitiative();draw();renderTools();}}
  function setInitiative(){var t=selectedToken();if(!t)return;var v=prompt('Инициатива',String(tokenInitiative(t)));if(v!==null&&isFinite(Number(v))){t.initiative=Number(v);sortInitiative();draw();renderTools();}}
  function rollInitiative(){var t=selectedToken();if(!t)return;t.initiative=1+Math.floor(Math.random()*20);sortInitiative();draw();renderTools();}
  function startCombat(){var c=ensureCombat();sortInitiative();if(!c.order.length)return alert('Нет токенов для боя.');c.active=true;c.round=1;c.currentId=c.order[0];c.startedAt=Date.now();resetTurnResources();draw();renderTools();}
  function setCombatMode(on){var c=ensureCombat();c.mode=!!on;draw();renderTools();} function toggleCombatMode(){setCombatMode(!ensureCombat().mode);} function nextTurn(){var c=ensureCombat();if(!c.active)return;sortInitiative();var i=c.order.indexOf(c.currentId);i=i<0?0:i+1;if(i>=c.order.length){i=0;c.round++;}c.currentId=c.order[i]||null;var t=tokenById(c.currentId);if(t)combatTurn(t).movementUsed=0;draw();renderTools();}
  function endCombat(){var c=ensureCombat();c.active=false;c.currentId=null;c.order=[];c.turns={};draw();renderTools();}
  function placeToken(){var ch=state.playerCharacter;if(!state.selected||typeof state.selected==='string')return alert('Сначала выберите клетку карты.');var id='token_'+Date.now();state.tokens.push({id:id,x:state.selected.x+.5,y:state.selected.y+.5,level:state.currentLevel,name:ch.name,className:ch.className,tokenGlyph:ch.tokenGlyph,characterId:ch.id,kind:'player',layer:'players',visible:true,hp:10,maxHp:10,statuses:[],initiative:0,actions:{action:1,bonus:1,reaction:1,movement:1}});state.selected=id;draw();renderTools();}
  function possessToken(id){var t=tokenById(id||state.selected);if(!t)return false;state.activeTokenId=t.id;state.playerCharacter={id:t.characterId==null?null:t.characterId,name:t.name,className:t.className,tokenGlyph:t.tokenGlyph};state.player={x:t.x,y:t.y,level:t.level,yaw:state.player.yaw,pitch:state.player.pitch,elevation:0};updatePlayerElevation();state.currentLevel=t.level;state.camera.targetX=t.x;state.camera.targetY=t.y;state.camera.targetZ=state.player.elevation;state.selected=t.id;draw();renderTools();return true;}
  function moveActiveToken(){var t=tokenById(state.activeTokenId);if(t){t.x=state.player.x;t.y=state.player.y;t.level=state.player.level;}}
  function textureForObject(o){return o&&o.texture&&o.texture!=='none'?o.texture:null;} function texturedPoly(points,img,mat,fallback,stroke){if(!img||!img.complete||!img.naturalWidth){poly(points,fallback,stroke);return;}ctx.save();var p=ctx.createPattern(img,'repeat');if(p&&p.setTransform&&typeof DOMMatrix!=='undefined'){var sx=Math.max(.05,Number(mat&&mat.repeatX)||1),sy=Math.max(.05,Number(mat&&mat.repeatY)||1),ox=Number(mat&&mat.offsetX)||0,oy=Number(mat&&mat.offsetY)||0;p.setTransform(new DOMMatrix([sx,0,0,sy,ox,oy]));}ctx.fillStyle=p;ctx.beginPath();points.forEach(function(pt,i){i?ctx.lineTo(pt.x,pt.y):ctx.moveTo(pt.x,pt.y);});ctx.closePath();ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}ctx.restore();}
  function loadTexture(src){if(!src||src==='none')return null;if(textureCache[src])return textureCache[src];var img=new Image();img.onload=function(){draw();};img.onerror=function(){delete textureCache[src];};img.src=src;textureCache[src]=img;return img;}
  function materialOf(o){o.material=o.material||{type:'default',repeatX:1,repeatY:1,offsetX:0,offsetY:0};o.material.repeatX=Number(o.material.repeatX)||1;o.material.repeatY=Number(o.material.repeatY)||1;o.material.offsetX=Number(o.material.offsetX)||0;o.material.offsetY=Number(o.material.offsetY)||0;return o.material;}
  function setMaterial(kind){var o=null;if(kind==='wall')o=wallForSelected(state.wallEditDir||'n');else if(typeof state.selected==='string')o=state.objects.find(function(x){return x.id===state.selected;});if(!o)return alert('Сначала выберите объект/стену.');var m=materialOf(o),q=prompt('Масштаб текстуры X,Y',m.repeatX+','+m.repeatY);if(q!==null){var a=q.split(',').map(Number);if(isFinite(a[0])&&a[0]>0)m.repeatX=a[0];if(isFinite(a[1])&&a[1]>0)m.repeatY=a[1];}if(o.texture&&o.texture!=='none')loadTexture(o.texture);draw();renderTools();}
  function selectedObject(){return typeof state.selected==='string'?state.objects.find(function(x){return x.id===state.selected;}):null;} function editSelectedObject(field){var o=selectedObject();if(!o)return alert('Сначала выберите объект.');var prompts={x:'X',y:'Y',z:'Высота Z',scaleX:'Ширина X',scaleY:'Глубина Y',scaleZ:'Высота',rotation:'Поворот (градусы)',name:'Название'};var v=prompt(prompts[field]||field,String(o[field]==null?0:o[field]));if(v===null)return;if(field==='name')o.name=v;else if(isFinite(Number(v)))o[field]=Number(v);draw();renderTools();} function cycleMaterialType(){var o=selectedObject()||wallForSelected(state.wallEditDir||'n');if(!o)return alert('Сначала выберите объект/стену.');var types=['default','stone','wood','metal','glass','custom'],i=types.indexOf(o.material&&o.material.type||'default');materialOf(o).type=types[(i+1)%types.length];draw();renderTools();}
  function setSelectedTexture(kind){var current='';if(kind==='wall'){var cw=wallForSelected(state.wallEditDir||'n');current=cw&&cw.texture&&cw.texture!=='none'?cw.texture:'';}else{var co=typeof state.selected==='string'?state.objects.find(function(x){return x.id===state.selected;}):null;current=co&&co.texture&&co.texture!=='none'?co.texture:'';}var value=prompt('Укажите путь/URL текстуры. Оставьте пустым для удаления. Например: assets/textures/stone.png',current);if(value===null)return;if(kind==='wall'){var w=wallForSelected(state.wallEditDir||'n');if(!w)return alert('Сначала создайте/выберите стену.');w.texture=value||'none';loadTexture(w.texture);}else{var o=typeof state.selected==='string'?state.objects.find(function(x){return x.id===state.selected;}):null;if(!o)return alert('Сначала выберите мебель/объект.');o.texture=value||'none';loadTexture(o.texture);}draw();renderTools();}
  function wallSideConfig(w,side){if(!w)return {texture:'none',color:null};w[side]=w[side]||{texture:'none',color:null};return w[side];}
  function editWallSides(){var w=wallForSelected(state.wallEditDir||'n');if(!w)return alert('Сначала создайте/выберите стену.');var f=wallSideConfig(w,'front'),b=wallSideConfig(w,'back');var ft=prompt('Лицевая сторона: путь/URL текстуры (пусто = без отдельной текстуры)',f.texture==='none'?'':f.texture);if(ft===null)return;var fc=prompt('Лицевая сторона: цвет #RRGGBB (пусто = цвет материала)',f.color||'');if(fc===null)return;var bt=prompt('Тыльная сторона: путь/URL текстуры (пусто = без отдельной текстуры)',b.texture==='none'?'':b.texture);if(bt===null)return;var bc=prompt('Тыльная сторона: цвет #RRGGBB (пусто = цвет материала)',b.color||'');if(bc===null)return;f.texture=ft||'none';f.color=/^#[0-9a-f]{6}$/i.test(fc)?fc:null;b.texture=bt||'none';b.color=/^#[0-9a-f]{6}$/i.test(bc)?bc:null;if(f.texture!=='none')loadTexture(f.texture);if(b.texture!=='none')loadTexture(b.texture);draw();renderTools();}
  function setWallSideColor(side){var w=wallForSelected(state.wallEditDir||'n');if(!w)return alert('Сначала создайте/выберите стену.');if(['front','back'].indexOf(side)<0)return;var s=wallSideConfig(w,side),v=prompt('Цвет стороны стены #RRGGBB',s.color||'#777777');if(v===null)return;if(!/^#[0-9a-f]{6}$/i.test(v)){alert('Неверный цвет. Используйте #RRGGBB.');return;}s.color=v;draw();renderTools();}
   function copyWallSide(){var w=wallForSelected(state.wallEditDir||'n');if(!w)return alert('Сначала создайте/выберите стену.');var f=wallSideConfig(w,'front');w.back={texture:f.texture||'none',color:f.color||null};if(w.back.texture!=='none')loadTexture(w.back.texture);draw();renderTools();}
  function clearWallSides(){var w=wallForSelected(state.wallEditDir||'n');if(!w)return alert('Сначала создайте/выберите стену.');w.front={texture:'none',color:null};w.back={texture:'none',color:null};draw();renderTools();}
  function connectorKey(c){return String(c.level)+':'+Number(c.x)+':'+Number(c.y)+':'+String(c.toLevel)+':'+String(c.kind||'ramp')+':'+String(c.dir||'n');}
  function connectorAt(x,y,level,toLevel){var hit=null;state.connectors.some(function(c){if(Number(c.level)===Number(level)&&Number(c.x)===Number(x)&&Number(c.y)===Number(y)&&Number(c.toLevel)===Number(toLevel)){hit=c;return true;}return false;});return hit;}
  function connectorForCell(x,y,level){var hit=null;state.connectors.some(function(c){if(Number(c.level)===Number(level)&&Number(c.x)===Number(x)&&Number(c.y)===Number(y)){hit=c;return true;}return false;});return hit;}
  function connectorProgress(c,x,y){if(!c)return null;var dir=String(c.dir||'n'),t;if(dir==='n')t=1-(y-(Number(c.y)+.1))/.8;else if(dir==='s')t=(y-(Number(c.y)+.1))/.8;else if(dir==='e')t=(x-(Number(c.x)+.1))/.8;else t=1-(x-(Number(c.x)+.1))/.8;return clamp(t,0,1);}
  function connectorAligned(c,dx,dy){if(!c)return false;var d=String(c.dir||'n');return (d==='n'&&dy<0)||(d==='s'&&dy>0)||(d==='e'&&dx>0)||(d==='w'&&dx<0);}
  function addConnector(kind,delta){if(!state.selected||typeof state.selected==='string')return;var target=state.currentLevel+delta;if(target<state.minLevel||target>state.maxLevel){alert('Для перехода нужен соседний уровень: '+levelLabel(target));return;}var x=state.selected.x,y=state.selected.y,dir=state.connectorDir||'n';state.connectors=state.connectors.filter(function(c){return !(Number(c.level)===state.currentLevel&&Number(c.x)===x&&Number(c.y)===y&&Number(c.toLevel)===target);});state.connectors.push({id:'conn_'+Date.now(),kind:kind==='stairs'?'stairs':'ramp',x:x,y:y,level:state.currentLevel,toLevel:target,width:.8,height:3,dir:dir,length:.8});draw();renderTools();}
  function cycleConnectorDir(){var a=['n','e','s','w'],i=a.indexOf(state.connectorDir||'n');state.connectorDir=a[(i+1)%a.length];draw();renderTools();}
  function removeConnector(){if(!state.selected||typeof state.selected==='string')return;var x=state.selected.x,y=state.selected.y;state.connectors=state.connectors.filter(function(c){return !(Number(c.level)===state.currentLevel&&Number(c.x)===x&&Number(c.y)===y);});draw();renderTools();}
  function canTransitionLevel(from,to,x,y){if(from===to)return true;var c=connectorAt(Math.floor(x),Math.floor(y),from,to);return !!c&&connectorProgress(c,x,y)>.92;}
  function baseElevation(x,y,level){return cellHeight(Math.floor(x),Math.floor(y),level)+(level*3);}
  function surfaceElevationAt(x,y,level){var base=baseElevation(x,y,level),c=connectorForCell(Math.floor(x),Math.floor(y),level);if(c&&Number(c.toLevel)!==Number(level)){var t=connectorProgress(c,x,y);if(t!=null)return base+(Number(c.toLevel)-Number(c.level))*3*t;}return base;}
  function updatePlayerElevation(){state.player.elevation=surfaceElevationAt(state.player.x,state.player.y,state.player.level);}
  function drawToken(t,active){if(Number(t.level)!==Number(state.currentLevel))return;var z=cellHeight(Math.floor(t.x),Math.floor(t.y),t.level)+.08,p=project(t.x,t.y,z),r=Math.max(12,Math.min(24,p.scale*.38));ctx.save();ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle='rgba(10,10,10,.78)';ctx.fill();ctx.lineWidth=active?3:2;ctx.strokeStyle=active?'#63d6ff':'#f0d27a';ctx.stroke();ctx.font=Math.max(14,Math.floor(r*1.15))+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#fff';ctx.fillText(tokenGlyphFor(t),p.x,p.y);ctx.font='700 10px sans-serif';ctx.fillStyle='#fff';ctx.fillText(t.name,p.x,p.y+r+11);ctx.restore();}
  function drawPlayerToken(){state.tokens.forEach(function(t){drawToken(t,t.id===state.activeTokenId);});if(!state.activeTokenId){drawToken({x:state.player.x,y:state.player.y,level:state.player.level,name:state.playerCharacter.name,tokenGlyph:state.playerCharacter.tokenGlyph},true);}}

  function drawConnector(c){if(Number(c.level)!==Number(state.currentLevel))return;var x=Number(c.x),y=Number(c.y),z=cellHeight(x,y,c.level),rise=(Number(c.toLevel)-Number(c.level))*3,dir=String(c.dir||'n'),sx=x+.1,sy=y+.1,ex=x+.9,ey=y+.9;if(dir==='n'){sy=y+.9;ey=y+.1;}else if(dir==='w'){sx=x+.9;ex=x+.1;}if(c.kind==='ramp'){var p1=project(sx,sy,z+.03),p2=project(ex,ey,z+rise+.03),p3=project(ex+(dir==='n'||dir==='s'?0:.0),ey+(dir==='e'||dir==='w'?0:.0),z+rise+.03);poly([p1,project(ex,ey,z+rise+.03),project(x+.9,y+.9,z+.03),project(x+.1,y+.1,z+.03)],'#9a7131','#2b2110');}else{for(var i=1;i<=4;i++){var t=i/4,xx=sx+(ex-sx)*t,yy=sy+(ey-sy)*t,zz=z+rise*t,px=xx+(dir==='n'||dir==='s'?.32:0),py=yy+(dir==='e'||dir==='w'?.32:0);var a=project(px-.32,py-.08,zz-rise/4),b=project(px+.32,py-.08,zz-rise/4),cc=project(px+.32,py+.08,zz),d=project(px-.32,py+.08,zz);poly([a,b,cc,d],'#9a7131','#2b2110');}}}
  function makeNewMap(cols,rows,height,depth){state.mapName='Новая карта';state.mapNotes='';state.cols=clamp(Math.floor(Number(cols)||20),1,200);state.rows=clamp(Math.floor(Number(rows)||20),1,200);state.minLevel=-clamp(Math.floor(Number(depth)||0),0,50);state.maxLevel=clamp(Math.floor(Number(height)||1),1,50)-1;state.currentLevel=0;state.cells={};state.surfaces={};state.objects=[];state.walls={};state.connectors=[];state.tokens=[];state.activeTokenId=null;state.player={x:(state.cols-1)/2,y:(state.rows-1)/2,level:0,yaw:0,pitch:0,elevation:0};state.cameraMode='editor';state.selected=null;state.camera.targetX=(state.cols-1)/2;state.camera.targetY=(state.rows-1)/2;state.camera.targetZ=0;draw();renderLevelBar();positionBoundaryButtons();}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  function project(x,y,z){
    if(state.cameraMode==='firstPerson'||state.cameraMode==='thirdPerson'){
      var pz=state.player.elevation+(state.cameraMode==='firstPerson'?state.view.eyeHeight:state.view.thirdPersonHeight),px=state.player.x,py=state.player.y;
      if(state.cameraMode==='thirdPerson'){var back=state.view.thirdPersonDistance;px-=Math.cos(state.player.yaw)*back;py-=Math.sin(state.player.yaw)*back;}
      var dx=x-px,dy=y-py,dz=z-pz,cy=Math.cos(state.player.yaw),sy=Math.sin(state.player.yaw),cp=Math.cos(state.player.pitch),sp=Math.sin(state.player.pitch);
      var forward=dx*cy+dy*sy,right=-dx*sy+dy*cy,up=dz,depth=forward*cp+up*sp,vert=up*cp-forward*sp;
      if(depth<=.05)return {x:-9999,y:-9999,depth:depth,scale:0};
      var focal=Math.min(canvas.clientWidth,canvas.clientHeight)*.82,scale=focal/depth;
      return {x:canvas.clientWidth/2+right*scale,y:canvas.clientHeight/2-vert*scale,depth:depth,scale:scale};
    }
    var c=state.camera,dx=x-c.targetX,dy=y-c.targetY,dz=z-c.targetZ;
    var cy=Math.cos(c.yaw),sy=Math.sin(c.yaw),cp=Math.cos(c.pitch),sp=Math.sin(c.pitch);
    var rx=dx*cy-dy*sy, ry=dx*sy+dy*cy;
    var depth=ry*sp+dz*cp, sx=rx, sy2=ry*cp-dz*sp;
    var scale=Math.min(canvas.clientWidth,canvas.clientHeight)*0.085*(18/c.distance);
    return {x:canvas.clientWidth/2+sx*scale,y:canvas.clientHeight/2+sy2*scale,depth:depth,scale:scale};
  }
  function wallKey(level,x,y,dir){return level+':'+x+':'+y+':'+dir;}
  function canonicalWall(level,x,y,dir){dir=String(dir||'n').toLowerCase();if(dir==='s'){y+=1;dir='n';}if(dir==='w'){x-=1;dir='e';}return {level:Number(level)||0,x:Number(x)||0,y:Number(y)||0,dir:dir==='e'?'e':'n'};}
  function setWall(x,y,dir,enabled,level,opts){level=level==null?state.currentLevel:level;var c=canonicalWall(level,x,y,dir),k=wallKey(c.level,c.x,c.y,c.dir);if(enabled){var old=state.walls[k]||{};state.walls[k]={level:c.level,x:c.x,y:c.y,dir:c.dir,height:Math.max(.5,Math.min(12,Number(opts&&opts.height!=null?opts.height:old.height)||2.5)),thickness:Math.max(.03,Math.min(.5,Number(opts&&opts.thickness!=null?opts.thickness:old.thickness)||.09)),opening:(opts&&opts.opening)||old.opening||'none',doorState:(opts&&opts.doorState)||old.doorState||'closed',texture:(opts&&opts.texture)!=null?opts.texture:(old.texture||'none'),material:old.material||{type:'default',repeatX:1,repeatY:1,offsetX:0,offsetY:0}};}else delete state.walls[k];}
  function normalizeWalls(){var out={};Object.keys(state.walls||{}).forEach(function(k){var w=state.walls[k]||{},c=canonicalWall(w.level,w.x,w.y,w.dir),nk=wallKey(c.level,c.x,c.y,c.dir),old=out[nk]||{};out[nk]={level:c.level,x:c.x,y:c.y,dir:c.dir,height:Math.max(.5,Math.min(12,Number(w.height)||Number(old.height)||2.5)),thickness:Math.max(.03,Math.min(.5,Number(w.thickness)||Number(old.thickness)||.09)),opening:['none','door','window'].indexOf(w.opening)>=0?w.opening:(old.opening||'none'),doorState:w.opening==='door'?(w.doorState||old.doorState||'closed'):'closed',texture:w.texture||old.texture||'none',material:materialOf(w),front:w.front||old.front||{texture:'none',color:null},back:w.back||old.back||{texture:'none',color:null}};});state.walls=out;state.objects.forEach(function(o){materialOf(o);o.scaleX=Number(o.scaleX)||1;o.scaleY=Number(o.scaleY)||1;o.scaleZ=Number(o.scaleZ)||1;o.rotation=Number(o.rotation)||0;o.name=o.name||'Мебель';});}
  function wallHeight(w){return Math.max(.5,Math.min(12,Number(w.height)||2.5));}
  function wallThickness(w){return Math.max(.03,Math.min(.5,Number(w.thickness)||.09));}
  function wallSegments(w){var h=wallHeight(w),o=w.opening||'none',z=cellHeight(w.x,w.y,w.level),a=[];if(o==='door'&&h>2.1)a.push([2.1,h]);else if(o==='window'&&h>2.1){a.push([0,.9]);a.push([2.0,h]);}else a.push([0,h]);return a.map(function(s){return {z:z+s[0],h:s[1]-s[0]};});}
  function drawDoorLeaf(w){if(!w||w.opening!=='door'||w.doorState==='open')return;var z=cellHeight(w.x,w.y,w.level),h=Math.min(2.1,wallHeight(w)),t=wallThickness(w)*.65;if(w.dir==='n'){var y=w.y;poly([project(w.x+.04,y-t,z),project(w.x+.96,y-t,z),project(w.x+.96,y-t,z+h),project(w.x+.04,y-t,z+h)],w.material&&w.material.type==='metal'?'#666':'#704522','#25180d');}else{var x=w.x+1;poly([project(x-t,w.y+.04,z),project(x-t,w.y+.96,z),project(x-t,w.y+.96,z+h),project(x-t,w.y+.04,z+h)],w.material&&w.material.type==='metal'?'#666':'#704522','#25180d');}}
  function wallQuadAt(w,z,h,offset){var t=wallThickness(w),x=w.x,y=w.y,off=offset||0;if(w.dir==='n'){var yy=y-t/2+off;return [project(x,yy,z),project(x+1,yy,z),project(x+1,yy,z+h),project(x,yy,z+h)];}var xx=x+1+t/2+off;return [project(xx,y,z),project(xx,y+1,z),project(xx,y+1,z+h),project(xx,y,z+h)];}
  function wallQuads(w){var out=[],t=wallThickness(w);wallSegments(w).forEach(function(s){out.push({p:wallQuadAt(w,s.z,s.h,0),side:'front'});if(t>.03)out.push({p:wallQuadAt(w,s.z,s.h,-t),side:'back'});});return out;}
  function wallForSelected(dir){if(!state.selected||typeof state.selected==='string')return null;var c=canonicalWall(state.currentLevel,state.selected.x,state.selected.y,dir);return state.walls[wallKey(c.level,c.x,c.y,c.dir)]||null;}
  function selectionRect(){
    var a=state.gesture.selectStart,b=state.gesture.selectEnd;
    if(!a||!b)return null;
    return {x1:Math.min(a.x,b.x),y1:Math.min(a.y,b.y),x2:Math.max(a.x,b.x),y2:Math.max(a.y,b.y)};
  }
  function drawSelectionRect(){
    var r=selectionRect();if(!r)return;
    var z=Math.max(cellHeight(r.x1,r.y1),cellHeight(r.x2,r.y2))+.04;
    var p1=project(r.x1,r.y1,z),p2=project(r.x2+1,r.y1,z),p3=project(r.x2+1,r.y2+1,z),p4=project(r.x1,r.y2+1,z);
    ctx.save();ctx.fillStyle='rgba(255,213,79,.16)';ctx.strokeStyle='#ffd54f';ctx.lineWidth=2;poly([p1,p2,p3,p4],ctx.fillStyle,ctx.strokeStyle);ctx.restore();
  }
  function addWallEdge(dir){state.wallEditDir=dir;var s=selectionBounds();if(s){var total=(s.x2-s.x1+1)*(s.y2-s.y1+1),existing=0;for(var y=s.y1;y<=s.y2;y++)for(var x=s.x1;x<=s.x2;x++){var c=canonicalWall(state.currentLevel,x,y,dir);if(state.walls[wallKey(c.level,c.x,c.y,c.dir)])existing++;}var enable=existing<total;for(var yy=s.y1;yy<=s.y2;yy++)for(var xx=s.x1;xx<=s.x2;xx++)setWall(xx,yy,dir,enable,state.currentLevel);state.selected={x:s.x1,y:s.y1};draw();renderTools();return;}if(!state.selected||typeof state.selected==='string'){alert('Сначала выберите клетку или область.');return;}var w=wallForSelected(dir);if(w)setWall(state.selected.x,state.selected.y,dir,false);else setWall(state.selected.x,state.selected.y,dir,true);draw();renderTools();}
  function selectionBounds(){
    var a=state.gesture.selectStart,b=state.gesture.selectEnd;
    if(!a||!b)return null;
    return {x1:clamp(Math.min(a.x,b.x),0,state.cols-1),x2:clamp(Math.max(a.x,b.x),0,state.cols-1),y1:clamp(Math.min(a.y,b.y),0,state.rows-1),y2:clamp(Math.max(a.y,b.y),0,state.rows-1)};
  }
  function eachSelectedCell(fn){var s=selectionBounds();if(!s)return false;for(var y=s.y1;y<=s.y2;y++)for(var x=s.x1;x<=s.x2;x++)fn(x,y);return true;}
  function clearSelection(){state.gesture.selectStart=null;state.gesture.selectEnd=null;state.selected=null;draw();renderTools();}
  function setSelectionMode(on){state.selectionMode=on!==false;state.gesture.selectStart=null;state.gesture.selectEnd=null;state.tool=state.selectionMode?'select':'inspect';draw();renderTools();}
  function transformSelectedArea(dx,dy,duplicate){
    var s=selectionBounds();if(!s){alert('Сначала выделите область пальцем.');return false;}
    dx=Math.round(Number(dx)||0);dy=Math.round(Number(dy)||0);
    if(!dx&&!dy)return false;
    if(s.x1+dx<0||s.y1+dy<0||s.x2+dx>=state.cols||s.y2+dy>=state.rows){alert('Нельзя переместить область за границы карты.');return false;}
    var level=state.currentLevel, cells=[],surfaces=[],objects=[],walls=[];
    eachSelectedCell(function(x,y){cells.push({x:x,y:y,h:cellHeight(x,y,level)});surfaces.push({x:x,y:y,s:JSON.parse(JSON.stringify(surfaceAt(x,y,level)))});});
    state.objects.forEach(function(o){if(Number(o.level)!==level)return;if(o.x>=s.x1&&o.x<=s.x2&&o.y>=s.y1&&o.y<=s.y2)objects.push(JSON.parse(JSON.stringify(o)));});
    Object.keys(state.walls).forEach(function(k){var w=state.walls[k];if(Number(w.level)!==level)return;if(w.x>=s.x1&&w.x<=s.x2&&w.y>=s.y1&&w.y<=s.y2)walls.push(JSON.parse(JSON.stringify(w)));});
    if(!duplicate){
      cells.forEach(function(v){setCellHeight(v.x,v.y,0,level);setSurface(v.x,v.y,{type:'ground'},level);});
      objects.forEach(function(o){state.objects=state.objects.filter(function(q){return q.id!==o.id;});});
      walls.forEach(function(w){setWall(w.x,w.y,w.dir,false,level);});
    }
    cells.forEach(function(v){setCellHeight(v.x+dx,v.y+dy,v.h,level);});surfaces.forEach(function(v){setSurface(v.x+dx,v.y+dy,v.s,level);});
    objects.forEach(function(o){o.x+=dx;o.y+=dy;if(duplicate)o.id='obj_'+Date.now()+'_'+Math.random().toString(36).slice(2);state.objects.push(o);});
    walls.forEach(function(w){w.x+=dx;w.y+=dy;setWall(w.x,w.y,w.dir,true,level,w);});
    state.gesture.selectStart={x:s.x1+dx,y:s.y1+dy};state.gesture.selectEnd={x:s.x2+dx,y:s.y2+dy};state.selected={x:s.x1+dx,y:s.y1+dy};draw();renderTools();return true;
  }
  function duplicateSelection(dx,dy){return transformSelectedArea(dx,dy,true);}
  function moveSelection(dx,dy){return transformSelectedArea(dx,dy,false);}
  function massHeightDialog(){
    var s=selectionBounds();
    if(!s){alert('Сначала выделите область пальцем.');return;}
    var q=prompt('Высота выбранной области (0–12)','2');if(q===null)return;
    var h=clamp(Math.round(Number(q)),0,12);eachSelectedCell(function(x,y){setCellHeight(x,y,h,state.currentLevel);});
    state.selected={x:s.x1,y:s.y1};draw();renderTools();
  }
  function fillSelectedArea(){
    if(!state.selected||typeof state.selected==='string'){alert('Сначала выберите клетку.');return;}
    var s=selectionBounds();if(s){var qh=prompt('Высота выбранной области (0–12)','2');if(qh===null)return;var hh=clamp(Math.round(Number(qh)),0,12);eachSelectedCell(function(x,y){setCellHeight(x,y,hh,state.currentLevel);});draw();renderTools();return;}var q=prompt('Размер области W,H и высота. Пример: 5,4,2');
    if(q===null)return;
    var a=q.split(',').map(Number);
    if(a.length<3||a.some(function(v){return !isFinite(v);})){alert('Неверный формат. Используйте W,H,Hвысоты.');return;}
    var w=Math.max(1,Math.floor(a[0])),h=Math.max(1,Math.floor(a[1])),height=clamp(Math.round(a[2]),0,12);
    var x0=state.selected.x,y0=state.selected.y;
    for(var y=y0;y<Math.min(state.rows,y0+h);y++)for(var x=x0;x<Math.min(state.cols,x0+w);x++)setCellHeight(x,y,height,state.currentLevel);
    draw();renderTools();
  }
  function addLongWall(){
    if(!state.selected||typeof state.selected==='string'){alert('Сначала выберите клетку.');return;}
    var dir=state.wallEditDir||'n',q=prompt('Длина стены в клетках (1–200)', '5');
    if(q===null)return;
    var len=clamp(Math.floor(Number(q)||1),1,200),sx=state.selected.x,sy=state.selected.y;
    for(var i=0;i<len;i++){
      var x=sx,y=sy;
      if(dir==='n'||dir==='s')x=sx+i;else y=sy+i;
      if(x<0||y<0||x>=state.cols||y>=state.rows)break;
      setWall(x,y,dir,true,state.currentLevel);
    }
    draw();renderTools();
  }
  function addWallPreset(){
    if(!state.selected||typeof state.selected==='string'){alert('Сначала выберите клетку.');return;}
    var names=['Каменная стена','Деревянная стена','Высокое окно','Дверь','Широкая дверь'];
    var v=prompt('Пресет стены: 1 Каменная, 2 Деревянная, 3 Окно, 4 Дверь, 5 Широкая дверь','1');
    if(v===null)return;
    var i=Math.floor(Number(v)||1),dir=state.wallEditDir||'n';
    var presets=[
      {height:2.5,thickness:.10,material:'stone',opening:'none'},
      {height:2.5,thickness:.10,material:'wood',opening:'none'},
      {height:2.5,thickness:.08,material:'glass',opening:'window'},
      {height:2.5,thickness:.10,material:'wood',opening:'door'},
      {height:3.0,thickness:.12,material:'wood',opening:'door'}
    ];
    var p=presets[clamp(i,1,5)-1],o={height:p.height,thickness:p.thickness,opening:p.opening};
    setWall(state.selected.x,state.selected.y,dir,true,state.currentLevel,o);
    var w=wallForSelected(dir);if(w)materialOf(w).type=p.material;
    draw();renderTools();
  }
  function addObjectPreset(){
    if(!state.selected||typeof state.selected==='string'){alert('Сначала выберите клетку.');return;}
    var v=prompt('Пресет объекта: 1 стол, 2 сундук, 3 колонна, 4 окно, 5 дверь, 6 стул','1');
    if(v===null)return;
    var p=[
      {name:'Стол',size:.9,sx:1.35,sy:.8,sz:.55,color:'#8b5a2b',color2:'#5f3d1f',mat:'wood'},
      {name:'Сундук',size:.8,sx:1,sy:.75,sz:.7,color:'#704522',color2:'#4a2d17',mat:'wood'},
      {name:'Колонна',size:.7,sx:1,sy:1,sz:2.5,color:'#777',color2:'#555',mat:'stone'},
      {name:'Оконный блок',size:.8,sx:1.2,sy:.15,sz:1.4,color:'#9bc7d9',color2:'#668b9a',mat:'glass'},
      {name:'Дверной блок',size:.8,sx:.15,sy:1,sz:2.1,color:'#704522',color2:'#4a2d17',mat:'wood'},
      {name:'Стул',size:.6,sx:.8,sy:.8,sz:1,color:'#7a4d28',color2:'#523119',mat:'wood'}
    ][clamp(Math.floor(Number(v)||1),1,6)-1];
    var id='obj_'+Date.now(),o={id:id,x:state.selected.x,y:state.selected.y,level:state.currentLevel,z:0,size:p.size,scaleX:p.sx,scaleY:p.sy,scaleZ:p.sz,rotation:0,name:p.name,color:p.color,color2:p.color2,texture:'none',material:{type:p.mat,repeatX:1,repeatY:1,offsetX:0,offsetY:0}};
    state.objects.push(o);state.selected=id;draw();renderTools();
  }
  function adjustWall(dir,field,delta){if(!state.selected||typeof state.selected==='string')return;state.wallEditDir=dir||state.wallEditDir||'n';var w=wallForSelected(state.wallEditDir);if(!w){setWall(state.selected.x,state.selected.y,state.wallEditDir,true);w=wallForSelected(state.wallEditDir);}if(!w)return;if(field==='height')w.height=Math.max(.5,Math.min(12,Math.round((Number(w.height)+delta)*10)/10));if(field==='thickness')w.thickness=Math.max(.03,Math.min(.5,Math.round((Number(w.thickness)+delta)*100)/100));draw();renderTools();}
  function cycleWallOpening(dir){if(!state.selected||typeof state.selected==='string')return;state.wallEditDir=dir||state.wallEditDir||'n';var w=wallForSelected(state.wallEditDir);if(!w){setWall(state.selected.x,state.selected.y,state.wallEditDir,true);w=wallForSelected(state.wallEditDir);}if(!w)return;var a=['none','door','window'],i=a.indexOf(w.opening||'none');w.opening=a[(i+1)%a.length];if(w.opening==='door')w.doorState='closed';else delete w.doorState;draw();renderTools();}
  function poly(points,fill,stroke){
    ctx.beginPath();points.forEach(function(p,i){i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);});ctx.closePath();
    if(fill){ctx.fillStyle=fill;ctx.fill();}
    if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}
  }
  function draw(){
    if(!canvas||!state.open)return;
    var w=canvas.clientWidth,h=canvas.clientHeight;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#11161a';ctx.fillRect(0,0,w,h);
    // Фон оставляем лёгким; масштаб сцены заполняет рабочую область без дорогой дополнительной сетки.
    var items=[];
    for(var y=0;y<state.rows;y++)for(var x=0;x<state.cols;x++){
      var z=cellHeight(x,y);var sf=surfaceAt(x,y,state.currentLevel);
      var p1=project(x,y,z),p2=project(x+1,y,z),p3=project(x+1,y+1,z),p4=project(x,y+1,z);
      items.push({d:(p1.depth+p2.depth+p3.depth+p4.depth)/4,kind:'cell',x:x,y:y,z:z,p:[p1,p2,p3,p4],fill:sf.color,surface:sf});
      if(z>0){
        var b1=project(x,y,0),b2=project(x+1,y,0),b3=project(x+1,y+1,0),b4=project(x,y+1,0);
        items.push({d:(b1.depth+b2.depth+b3.depth+b4.depth)/4-0.01,kind:'side',p:[p1,p2,b2,b1]});
        items.push({d:(b2.depth+b3.depth+b4.depth+b1.depth)/4-0.02,kind:'side',p:[p2,p3,b3,b2]});
      }
    }
    state.connectors.forEach(function(cn){if(Number(cn.level)!==Number(state.currentLevel))return;var cp=project(Number(cn.x)+.5,Number(cn.y)+.5,cellHeight(Number(cn.x),Number(cn.y),Number(cn.level))+.1);items.push({d:cp.depth-.2,kind:'connector',c:cn});});
    Object.keys(state.walls).forEach(function(k){var ww=state.walls[k];if(Number(ww.level)!==state.currentLevel||ww.opening!=='door'||ww.doorState==='open'||ww.doorState==='locked')return;var zp=cellHeight(ww.x,ww.y,ww.level)+1.05;items.push({d:project(ww.x+.5,ww.y+.5,zp).depth,kind:'door',w:ww});});
    Object.keys(state.walls).forEach(function(k){var w=state.walls[k];if(Number(w.level)!==state.currentLevel)return;wallQuads(w).forEach(function(q){items.push({d:(q.p[0].depth+q.p[1].depth+q.p[2].depth+q.p[3].depth)/4,kind:'wall',w:w,p:q.p,side:q.side});});});
    Object.keys(state.walls).forEach(function(k){
      var sw=state.walls[k];
      if(Number(sw.level)!==state.currentLevel||!state.selected||typeof state.selected==='string')return;
      var sc=canonicalWall(state.currentLevel,state.selected.x,state.selected.y,state.wallEditDir||'n');
      if(wallKey(sc.level,sc.x,sc.y,sc.dir)!==k)return;
      var sq=wallQuadAt(sw,cellHeight(sw.x,sw.y,sw.level),Math.min(wallHeight(sw),.08),.002);
      items.push({d:(sq[0].depth+sq[1].depth+sq[2].depth+sq[3].depth)/4+0.05,kind:'wallSelect',p:sq});
    });
    state.objects.forEach(function(o){
      if(Number(o.level||0)!==state.currentLevel)return;var z=cellHeight(o.x,o.y,state.currentLevel)+Number(o.z||0),s=Number(o.size||.8),sx=s*Number(o.scaleX||1),sy=s*Number(o.scaleY||1),sz=s*Number(o.scaleZ||1),ang=Number(o.rotation||0)*Math.PI/180,cs=Math.cos(ang),sn=Math.sin(ang),cx=o.x+s/2,cy=o.y+s/2;function P(dx,dy,zz){var rx=dx*cs-dy*sn,ry=dx*sn+dy*cs;return project(cx+rx,cy+ry,z+zz);}
      var a=P(-sx/2,-sy/2,0),b=P(sx/2,-sy/2,0),c=P(sx/2,sy/2,0),d=P(-sx/2,sy/2,0);
      var za=P(-sx/2,-sy/2,sz),zb=P(sx/2,-sy/2,sz),zc=P(sx/2,sy/2,sz),zd=P(-sx/2,sy/2,sz);
      items.push({d:(a.depth+b.depth+c.depth+d.depth)/4,kind:'obj',o:o,p:[a,b,c,d],top:[za,zb,zc,zd]});
    });
    items=items.filter(function(it){return !it.p||it.p.every(function(pt){return pt&&pt.depth>.05;});});
    items.sort(function(a,b){return (state.cameraMode==='firstPerson'||state.cameraMode==='thirdPerson')?b.d-a.d:a.d-b.d;});
    var sel=selectionBounds();
    if(sel){
      var q1=project(sel.x1,sel.y1,cellHeight(sel.x1,sel.y1)),q2=project(sel.x2+1,sel.y1,cellHeight(sel.x2,sel.y1)),q3=project(sel.x2+1,sel.y2+1,cellHeight(sel.x2,sel.y2)),q4=project(sel.x1,sel.y2+1,cellHeight(sel.x1,sel.y2));
      poly([q1,q2,q3,q4],'rgba(224,182,90,.16)','#e0b65a');
    }
    items.forEach(function(it){
      if(it.kind==='cell'){
        var simg=it.surface&&it.surface.texture&&it.surface.texture!=='none'?loadTexture(it.surface.texture):null;if(simg)texturedPoly(it.p,simg,surfaceMaterial(it.surface),it.fill,'#59616b');else poly(it.p,it.fill||'#242a31','#59616b');if(it.surface&&(it.surface.hazard||it.surface.swimRequired||it.surface.slippery)){ctx.fillStyle='rgba(255,210,80,.22)';poly(it.p,ctx.fillStyle,null);}
        if(it.x===0||it.y===0){ctx.strokeStyle='rgba(255,255,255,.08)';}
      }else if(it.kind==='side'){
        poly(it.p,'#14181d','#343b44');
      }else if(it.kind==='wall'){
        var sf=it.w[it.side]||{},legacy=it.w.texture&&it.w.texture!=='none'?it.w.texture:'none',src=sf.texture&&sf.texture!=='none'?sf.texture:legacy,wi=src!=='none'&&loadTexture(src),wm=materialOf(it.w),base=sf.color|| (it.w.material&&it.w.material.type==='glass'?'rgba(170,210,230,.35)':it.w.material&&it.w.material.type==='wood'?'#76502d':it.w.material&&it.w.material.type==='metal'?'#666':'#777');texturedPoly(it.p,wi,wm,base,'#222');
      }else if(it.kind==='connector'){
        drawConnector(it.c);
      }else if(it.kind==='door'){
        drawDoorLeaf(it.w);
      }else if(it.kind==='wallSelect'){
        ctx.save();ctx.lineWidth=5;ctx.strokeStyle='#ffd54f';poly(it.p,null,'#ffd54f');ctx.lineWidth=1;ctx.restore();
      }else{
        var oi=textureForObject(it.o),img=oi&&loadTexture(oi),mat=materialOf(it.o);texturedPoly([it.p[0],it.p[1],it.top[1],it.top[0]],img,mat,it.o.color||'#8b5a2b','#111');texturedPoly([it.p[1],it.p[2],it.top[2],it.top[1]],img,mat,it.o.color2||'#6f461f','#111');texturedPoly(it.top,img,mat,it.o.color||'#a8733a','#111');
        if(it.o.id===state.selected){ctx.strokeStyle='#ffd54f';ctx.lineWidth=3;poly(it.top,null,'#ffd54f');ctx.lineWidth=1;}
      }
    });
    drawPlayerToken();
    drawSelectionRect();
    drawHud();
  }
  function drawHud(){
    if(state.playMode)return;
    ctx.fillStyle='rgba(10,10,10,.78)';ctx.fillRect(10,10,Math.min(360,canvas.clientWidth-20),112);
    ctx.fillStyle='#f0d27a';ctx.font='700 14px sans-serif';ctx.fillText('3D РЕДАКТОР КАРТ • '+VERSION,20,31);
    ctx.fillStyle='#bbb';ctx.font='12px sans-serif';
    ctx.fillText('1 палец: выбор  •  2 пальца: камера/zoom/поворот',20,51);
    ctx.fillText('Размер: '+state.cols+'×'+state.rows+'  •  уровни: '+levelLabel(state.minLevel)+'…'+levelLabel(state.maxLevel),20,69);ctx.fillText('Текущий уровень: '+levelLabel(state.currentLevel)+'  •  высотных клеток: '+Object.keys(state.cells).length,20,87);
    ctx.fillText('Игрок: '+state.playerCharacter.name+' • '+state.playerCharacter.className+'  '+state.playerCharacter.tokenGlyph,20,105);
  }
  function resize(){if(!canvas)return;var r=canvas.getBoundingClientRect(),d=global.devicePixelRatio||1;canvas.width=Math.max(1,Math.floor(r.width*d));canvas.height=Math.max(1,Math.floor(r.height*d));ctx.setTransform(d,0,0,d,0,0);draw();}
  function pointInPolygon(px,py,pts){
    var inside=false;
    for(var i=0,j=pts.length-1;i<pts.length;j=i++){
      var xi=pts[i].x,yi=pts[i].y,xj=pts[j].x,yj=pts[j].y;
      var hit=((yi>py)!==(yj>py))&&(px<(xj-xi)*(py-yi)/(yj-yi)+xi);
      if(hit)inside=!inside;
    }
    return inside;
  }
  function screenToCell(px,py){
    var best=null,bestDepth=-1e9;
    for(var y=0;y<state.rows;y++)for(var x=0;x<state.cols;x++){
      var z=cellHeight(x,y),pts=[project(x,y,z),project(x+1,y,z),project(x+1,y+1,z),project(x,y+1,z)];
      if(pointInPolygon(px,py,pts)){
        var depth=(pts[0].depth+pts[1].depth+pts[2].depth+pts[3].depth)/4;
        if(depth>bestDepth){bestDepth=depth;best={x:x,y:y};}
      }
    }
    if(best)return best;
    var nearest=null,nearestD=1e9;
    for(var yy=0;yy<state.rows;yy++)for(var xx=0;xx<state.cols;xx++){
      var q=project(xx+.5,yy+.5,cellHeight(xx,yy)),d=Math.hypot(px-q.x,py-q.y);
      if(d<nearestD){nearestD=d;nearest={x:xx,y:yy};}
    }
    return nearestD<Math.max(28,canvas.clientWidth*.055)?nearest:null;
  }
  function pointerDown(e){
    if(e.pointerType==='touch')return;
    if(state.cameraMode!=='editor'){state.gesture.mode='look';state.gesture.lastX=e.clientX;state.gesture.lastY=e.clientY;canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);return;}
    if(e.pointerType==='mouse'){var p=screenToCell(e.clientX-canvas.getBoundingClientRect().left,e.clientY-canvas.getBoundingClientRect().top);if(p){state.gesture.mode='selectDrag';state.gesture.selectStart=p;state.gesture.selectEnd=p;draw();}else state.gesture.mode='pan';}
    canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);
    state.gesture.lastX=e.clientX;state.gesture.lastY=e.clientY;
  }
  function pointerMove(e){
    if(state.gesture.mode==='selectDrag'){var rr=canvas.getBoundingClientRect(),p=screenToCell(e.clientX-rr.left,e.clientY-rr.top);if(p){state.gesture.selectEnd=p;draw();}return;}if(state.gesture.mode==='look'){var lx=e.clientX-state.gesture.lastX,ly=e.clientY-state.gesture.lastY;state.gesture.lastX=e.clientX;state.gesture.lastY=e.clientY;rotatePlayer(lx*.006,-ly*.004);return;}
    if(state.gesture.mode!=='pan')return;
    var dx=e.clientX-state.gesture.lastX,dy=e.clientY-state.gesture.lastY;
    state.gesture.lastX=e.clientX;state.gesture.lastY=e.clientY;
    state.camera.targetX-=dx/(35/state.camera.distance);state.camera.targetY-=dy/(35/state.camera.distance);draw();
  }
  function canvasPoint(e){var r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};}
  function pointerUp(e){if(e.pointerType==='touch')return;if(state.gesture.mode==='look'){state.gesture.mode=null;return;}if(state.gesture.mode==='pan'&&Math.abs(e.clientX-state.gesture.lastX)<8){var cp=canvasPoint(e),t=tokenAtScreen(cp.x,cp.y),o=objectAtScreen(cp.x,cp.y);if(t){state.selected=t.id;renderTools();draw();}else if(o){state.selected=o.id;renderTools();draw();}else{var p=screenToCell(cp.x,cp.y);if(p)selectCell(p.x,p.y);}}state.gesture.mode=null;}
  function touchStart(e){
    if(e.touches.length===1){
      var t=e.touches[0],r=canvas.getBoundingClientRect(),p=screenToCell(t.clientX-r.left,t.clientY-r.top);
      state.gesture.mode=state.cameraMode==='editor'?(p&&state.selectionMode?'selectTouch':'tap'):'look';
      state.gesture.lastX=t.clientX;state.gesture.lastY=t.clientY;
      if(state.cameraMode==='editor'&&p){state.gesture.selectStart=p;state.gesture.selectEnd=p;draw();}
    }
    if(e.touches.length>=2){var a=e.touches[0],b=e.touches[1];state.gesture.mode='two';state.gesture.selectStart=null;state.gesture.selectEnd=null;state.gesture.lastDist=Math.hypot(b.clientX-a.clientX,b.clientY-a.clientY);state.gesture.lastAngle=Math.atan2(b.clientY-a.clientY,b.clientX-a.clientX);state.gesture.lastX=(a.clientX+b.clientX)/2;state.gesture.lastY=(a.clientY+b.clientY)/2;}
    e.preventDefault();
  }
  function touchMove(e){
    e.preventDefault();
    if(e.touches.length===1&&state.cameraMode==='editor'&&state.gesture.mode==='selectTouch'){
      var one=e.touches[0],rr=canvas.getBoundingClientRect(),p=screenToCell(one.clientX-rr.left,one.clientY-rr.top);
      if(p){state.gesture.selectEnd=p;draw();}return;
    }
    if(e.touches.length===1&&state.cameraMode!=='editor'&&state.gesture.mode==='look'){var one2=e.touches[0],lx=one2.clientX-state.gesture.lastX,ly=one2.clientY-state.gesture.lastY;state.gesture.lastX=one2.clientX;state.gesture.lastY=one2.clientY;rotatePlayer(lx*.006,-ly*.004);return;}
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
    if(state.cameraMode!=='editor'){if(!e.touches.length)state.gesture.mode=null;return;}
    if(state.gesture.mode==='selectTouch'&&e.changedTouches&&e.changedTouches[0]){
      var s=selectionBounds();if(s){state.selected={x:s.x1,y:s.y1};state.gesture.lastX=e.changedTouches[0].clientX;state.gesture.lastY=e.changedTouches[0].clientY;draw();renderTools();}
    }else if(state.gesture.mode==='tap'&&e.changedTouches&&e.changedTouches[0]){
      var t=e.changedTouches[0];if(Math.hypot(t.clientX-state.gesture.lastX,t.clientY-state.gesture.lastY)<12){var r=canvas.getBoundingClientRect(),tx=t.clientX-r.left,ty=t.clientY-r.top,tk=tokenAtScreen(tx,ty);if(tk){state.selected=tk.id;renderTools();draw();}else{var p=screenToCell(tx,ty);if(p)selectCell(p.x,p.y);}}
    }
    if(!e.touches.length)state.gesture.mode=null;
  }
  function selectCell(x,y){
    state.selected={x:x,y:y};state.tool='select';
    if(state.tool==='select')renderTools();
  }
  function raise(){if(!state.selected)return;setCellHeight(state.selected.x,state.selected.y,cellHeight(state.selected.x,state.selected.y)+1);draw();}
  function lower(){if(!state.selected)return;setCellHeight(state.selected.x,state.selected.y,cellHeight(state.selected.x,state.selected.y)-1);draw();}
  function addCube(){if(!state.selected||typeof state.selected==='string')return;var id='obj_'+Date.now();state.objects.push({id:id,x:state.selected.x,y:state.selected.y,level:state.currentLevel,z:0,size:.8,scaleX:1,scaleY:1,scaleZ:1,rotation:0,name:'Мебель',color:'#8b5a2b',color2:'#6f461f',texture:'none',material:{type:'default',repeatX:1,repeatY:1,offsetX:0,offsetY:0}});state.selected=id;draw();renderTools();}
  function addWall(){if(!state.selected||typeof state.selected==='string')return;var id='obj_'+Date.now();state.objects.push({id:id,x:state.selected.x,y:state.selected.y,level:state.currentLevel,z:0,size:.92,scaleX:1.8,scaleY:.18,scaleZ:2.5,rotation:0,name:'Объект-стена',color:'#777',color2:'#555',texture:'none',material:{type:'default',repeatX:1,repeatY:1,offsetX:0,offsetY:0}});state.selected=id;draw();renderTools();}
  function remove(){if(typeof state.selected==='string'){if(tokenById(state.selected)){state.tokens=state.tokens.filter(function(t){return t.id!==state.selected;});if(state.activeTokenId===state.selected)state.activeTokenId=null;}else state.objects=state.objects.filter(function(o){return o.id!==state.selected;});state.selected=null;}else if(state.selected){var x=state.selected.x,y=state.selected.y,l=state.currentLevel;setCellHeight(x,y,0,l);setSurface(x,y,{type:'ground'},l);Object.keys(state.walls).forEach(function(k){var w=state.walls[k];if(Number(w.level)===l&&((w.x===x&&w.y===y)||(w.dir==='e'&&w.x===x-1&&w.y===y)||(w.dir==='n'&&w.x===x&&w.y===y-1)))delete state.walls[k];});state.connectors=state.connectors.filter(function(c){return !(Number(c.level)===l&&Number(c.x)===x&&Number(c.y)===y);});state.objects=state.objects.filter(function(o){return !(Number(o.level)===l&&Number(o.x)===x&&Number(o.y)===y);});state.selected=null;}draw();renderTools();}
  function wallBlocks(w){var o=w.opening||'none';if(o==='door')return (w.doorState||'closed')!=='open';return true;}
  function wallCrosses(x1,y1,x2,y2,w){var eps=.06;if(w.dir==='n'){var ey=w.y,ex1=w.x,ex2=w.x+1;if((y1-ey)*(y2-ey)<=0&&Math.abs(y2-y1)>eps){var t=(ey-y1)/(y2-y1),xx=x1+(x2-x1)*t;return xx>ex1-eps&&xx<ex2+eps;}}else{var ex=w.x+1,ey1=w.y,ey2=w.y+1;if((x1-ex)*(x2-ex)<=0&&Math.abs(x2-x1)>eps){var t2=(ex-x1)/(x2-x1),yy=y1+(y2-y1)*t2;return yy>ey1-eps&&yy<ey2+eps;}}return false;}
  function blockedByWalls(x1,y1,x2,y2,level){var hit=false;Object.keys(state.walls).some(function(k){var w=state.walls[k];if(Number(w.level)!==level||!wallBlocks(w))return false;if(wallCrosses(x1,y1,x2,y2,w)){hit=true;return true;}return false;});return hit;}
  function blockedByObjects(x,y,level){var r=.28,hit=false;state.objects.some(function(o){if(Number(o.level||0)!==level)return false;var s=Math.max(.35,Number(o.size)||.8)/2;if(x>=o.x+.5-s-r&&x<=o.x+.5+s+r&&y>=o.y+.5-s-r&&y<=o.y+.5+s+r){hit=true;return true;}return false;});return hit;}
  function canOccupy(x,y,level,dx,dy){if(x<.05||y<.05||x>state.cols-.05||y>state.rows-.05)return false;var oldx=state.player.x,oldy=state.player.y;if(blockedByWalls(oldx,oldy,x,y,level)||blockedByObjects(x,y,level))return false;var oldE=surfaceElevationAt(oldx,oldy,level),newE=surfaceElevationAt(x,y,level),delta=newE-oldE;if(Math.abs(delta)>state.view.maxStep){var c=connectorForCell(Math.floor(x),Math.floor(y),level);if(!c||!connectorAligned(c,dx,dy))return false;}return true;}
  function movePlayer(dx,dy,dz){dx=Number(dx||0);dy=Number(dy||0);var requested=Number(dz)||0,steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.18)),sx=dx/steps,sy=dy/steps;
    for(var i=0;i<steps;i++){var nx=state.player.x+sx,ny=state.player.y+sy;if(canOccupy(nx,ny,state.player.level,sx,sy)){state.player.x=nx;state.player.y=ny;var c=connectorForCell(Math.floor(state.player.x),Math.floor(state.player.y),state.player.level);if(c&&connectorAligned(c,sx,sy)&&connectorProgress(c,state.player.x,state.player.y)>=.98){state.player.level=Number(c.toLevel);state.currentLevel=state.player.level;}}else break;}
    if(requested){var nl=clamp(state.player.level+Math.sign(requested),state.minLevel,state.maxLevel);if(nl!==state.player.level&&canTransitionLevel(state.player.level,nl,state.player.x,state.player.y))state.player.level=nl;}
    updatePlayerElevation();moveActiveToken();state.camera.targetX=state.player.x;state.camera.targetY=state.player.y;state.camera.targetZ=state.player.elevation;draw();renderLevelBar();return getPlayerState();}
  function toggleDoor(dir){var w=wallForSelected(dir||state.wallEditDir||'n');if(!w||w.opening!=='door')return false;if(w.doorState==='locked'){alert('🔒 Дверь заперта.');return false;}w.doorState=(w.doorState||'closed')==='open'?'closed':'open';draw();renderTools();return true;}
  function lockDoor(dir,locked){var w=wallForSelected(dir||state.wallEditDir||'n');if(!w||w.opening!=='door')return false;w.doorState=locked?'locked':(w.doorState==='locked'?'closed':w.doorState||'closed');draw();renderTools();return true;}
  function interactDoor(){var dirs=['n','e','s','w'],best=null,bd=1e9;dirs.forEach(function(d){var w=wallForSelected(d);if(!w||w.opening!=='door')return;var cx=w.dir==='n'?w.x+.5:w.x+1,cy=w.dir==='n'?w.y:w.y+.5,dd=Math.hypot(state.player.x-cx,state.player.y-cy);if(dd<bd){bd=dd;best=d;}});return best?toggleDoor(best):false;}
  function createMobileHud(){
    var wrap=document.getElementById('map3dCanvasWrap');if(!wrap)return;
    var oldHud=document.getElementById('map3dMobileHud');if(oldHud)oldHud.remove();
    var hud=document.createElement('div');hud.id='map3dMobileHud';hud.style.cssText='position:absolute;inset:0;z-index:30;pointer-events:none;display:none;font-family:system-ui,sans-serif;';
    hud.innerHTML='<button id="map3dBackEditor" type="button" style="position:absolute;right:18px;top:18px;padding:11px 15px;border-radius:10px;border:1px solid #fff8;background:rgba(25,25,25,.78);color:#fff;font-weight:700;font-size:14px;pointer-events:auto;touch-action:manipulation;box-shadow:0 3px 14px #0009">↩️ Назад в редактор</button>'+ '<div id="map3dMoveJoy" style="position:absolute;left:22px;bottom:22px;width:132px;height:132px;border-radius:50%;background:rgba(20,24,30,.58);border:2px solid rgba(255,255,255,.35);box-shadow:0 4px 18px #0008;pointer-events:auto;touch-action:none"><div style="position:absolute;inset:34px;border-radius:50%;border:1px solid #ffffff33"></div><div id="map3dMoveKnob" style="position:absolute;left:43px;top:43px;width:46px;height:46px;border-radius:50%;background:#d4af37;border:2px solid #fff8;box-shadow:0 3px 10px #0008"></div></div>'+
    '<div id="map3dLookJoy" style="position:absolute;right:22px;bottom:22px;width:132px;height:132px;border-radius:50%;background:rgba(20,24,30,.58);border:2px solid rgba(255,255,255,.35);box-shadow:0 4px 18px #0008;pointer-events:auto;touch-action:none"><div style="position:absolute;inset:34px;border-radius:50%;border:1px solid #ffffff33"></div><div id="map3dLookKnob" style="position:absolute;left:43px;top:43px;width:46px;height:46px;border-radius:50%;background:#777;border:2px solid #fff8;box-shadow:0 3px 10px #0008"></div></div>'+
    '<button id="map3dInteractBtn" type="button" style="position:absolute;right:42px;bottom:178px;width:76px;height:76px;border-radius:50%;border:2px solid #fff8;background:#8a641b;color:#fff;font-size:30px;font-weight:700;box-shadow:0 4px 16px #0009;pointer-events:auto;touch-action:manipulation">✋</button>'+
    '<div style="position:absolute;left:28px;bottom:164px;color:#fff9;font-size:11px;text-shadow:0 2px 4px #000;pointer-events:none">ДВИЖЕНИЕ</div><div style="position:absolute;right:28px;bottom:164px;color:#fff9;font-size:11px;text-shadow:0 2px 4px #000;pointer-events:none">КАМЕРА</div>';
    wrap.appendChild(hud);
    function bindJoy(id,knob,kind){
      var el=document.getElementById(id),kb=document.getElementById(knob),active=false,pid=null,cx=0,cy=0,max=43,nx=0,ny=0,rafId=0,lastFrame=0;
      function frame(now){if(!active)return;var dt=Math.min(32,Math.max(8,now-(lastFrame||now)));lastFrame=now;if(kind==='move'){var mag=Math.min(1,Math.hypot(nx,ny));if(mag>.10)moveByFacing(-ny*mag,nx*mag,false,.45*(dt/16));}else{if(Math.abs(nx)>.08||Math.abs(ny)>.08)rotatePlayer(nx*.012*(dt/16),-ny*.009*(dt/16));}rafId=requestAnimationFrame(frame);}
      function reset(){active=false;pid=null;nx=0;ny=0;lastFrame=0;if(rafId)cancelAnimationFrame(rafId);rafId=0;kb.style.transform='translate(0px,0px)';}
      el.addEventListener('pointerdown',function(e){active=true;pid=e.pointerId;var r=el.getBoundingClientRect();cx=r.left+r.width/2;cy=r.top+r.height/2;el.setPointerCapture&&el.setPointerCapture(e.pointerId);e.preventDefault();if(!rafId)rafId=requestAnimationFrame(frame);});
      el.addEventListener('pointermove',function(e){if(!active||e.pointerId!==pid)return;var dx=e.clientX-cx,dy=e.clientY-cy,len=Math.hypot(dx,dy);if(len>max){dx*=max/len;dy*=max/len;}kb.style.transform='translate('+dx+'px,'+dy+'px)';nx=dx/max;ny=dy/max;e.preventDefault();});
      el.addEventListener('pointerup',function(e){if(e.pointerId===pid)reset();});
      el.addEventListener('pointercancel',function(e){if(e.pointerId===pid)reset();});
    }
    bindJoy('map3dMoveJoy','map3dMoveKnob','move');bindJoy('map3dLookJoy','map3dLookKnob','look');
    document.getElementById('map3dInteractBtn').addEventListener('click',function(){interactDoor();});
    document.getElementById('map3dBackEditor').addEventListener('click',function(){backToEditor();});
  }
  function updateMobileHud(){var hud=document.getElementById('map3dMobileHud');if(hud)hud.style.display=(state.open&&state.cameraMode!=='editor')?'block':'none';}
  function nativeSetLandscape(){
    try{if(global.DndOrientation&&typeof global.DndOrientation.landscape==='function')global.DndOrientation.landscape();}catch(e){}
  }
  function nativeRestoreOrientation(){
    try{if(global.DndOrientation&&typeof global.DndOrientation.restore==='function')global.DndOrientation.restore();}catch(e){}
  }
  function requestPlayFullscreen(){
    try{
      if(document.fullscreenElement)state.fullscreenOwned=false;
      else if(document.documentElement.requestFullscreen){var p=document.documentElement.requestFullscreen();if(p&&p.catch)p.catch(function(){});state.fullscreenOwned=true;}
    }catch(e){}
    nativeSetLandscape();
    try{if(global.screen&&screen.orientation&&screen.orientation.lock){var q=screen.orientation.lock('landscape');if(q&&q.catch)q.catch(function(){});}}catch(e){}
  }
  function leavePlayFullscreen(){
    nativeRestoreOrientation();
    try{if(global.screen&&screen.orientation&&screen.orientation.unlock)screen.orientation.unlock();}catch(e){}
    try{if(state.fullscreenOwned&&document.fullscreenElement&&document.exitFullscreen){var p=document.exitFullscreen();if(p&&p.catch)p.catch(function(){});}}catch(e){}
    state.fullscreenOwned=false;
  }
  function setPlayMode(on){
    state.playMode=!!on;
    var modal=document.getElementById('map3dEditorModal'),shell=document.getElementById('map3dEditorShell');
    if(modal)modal.style.padding=state.playMode?'0':'8px';
    if(shell){shell.style.borderRadius=state.playMode?'0':'12px';shell.style.border=state.playMode?'0':'1px solid #555';}
    if(state.playMode){requestPlayFullscreen();}
    else{leavePlayFullscreen();}
    updateMobileHud();draw();renderTools();
  }
  function setCameraMode(mode){
    mode=String(mode||'editor');
    if(['editor','firstPerson','thirdPerson'].indexOf(mode)<0)mode='editor';
    if(mode==='editor'){setPlayMode(false);}
    else{state.cameraMode=mode;setPlayMode(true);}
    state.cameraMode=mode;
    state.camera.targetX=state.player.x;state.camera.targetY=state.player.y;state.camera.targetZ=state.player.elevation;
    draw();renderTools();updateMobileHud();
  }
  function backToEditor(){state.cameraMode='editor';setPlayMode(false);draw();renderTools();updateMobileHud();}
  function setPlayerPosition(x,y,level){state.player.x=clamp(Number(x)||0,0,Math.max(0,state.cols-.05));state.player.y=clamp(Number(y)||0,0,Math.max(0,state.rows-.05));state.player.level=clamp(Math.floor(Number(level)||0),state.minLevel,state.maxLevel);state.currentLevel=state.player.level;updatePlayerElevation();state.camera.targetX=state.player.x;state.camera.targetY=state.player.y;state.camera.targetZ=state.player.elevation;draw();renderLevelBar();}
  function rotatePlayer(dYaw,dPitch){state.player.yaw+=Number(dYaw||0);state.player.pitch=clamp(state.player.pitch+Number(dPitch||0),-1.35,1.35);draw();}
  function moveByFacing(forward,strafe,run,scale){var c=ensureCombat(),t=tokenById(state.activeTokenId),speed;if(c.mode&&c.active&&c.currentId&&t&&c.currentId!==t.id)return false;if(!c.mode||!t){speed=state.view.walkSpeed*(run?state.view.runMultiplier:1);}else{var rem=movementRemainingFt(t);if(rem<=0)return false;speed=(Math.min(rem,tokenSpeedFt(t))/5)/60;if(run)speed*=state.view.runMultiplier;}speed*=isFinite(Number(scale))?Math.max(0,Number(scale)):1;var f=Number(forward||0)*speed,s=Number(strafe||0)*speed,dx=Math.cos(state.player.yaw)*f-Math.sin(state.player.yaw)*s,dy=Math.sin(state.player.yaw)*f+Math.cos(state.player.yaw)*s;var beforeX=state.player.x,beforeY=state.player.y,result=movePlayer(dx,dy,0);if(c.mode&&c.active&&t&&result!==false){var used=Math.hypot(state.player.x-beforeX,state.player.y-beforeY)*5;combatTurn(t).movementUsed=Math.min(tokenSpeedFt(t),combatTurn(t).movementUsed+used);}return result;}
  function getPlayerState(){return {x:state.player.x,y:state.player.y,level:state.player.level,elevation:state.player.elevation,yaw:state.player.yaw,pitch:state.player.pitch,cameraMode:state.cameraMode,characterId:state.playerCharacter.id,characterName:state.playerCharacter.name,className:state.playerCharacter.className,tokenGlyph:state.playerCharacter.tokenGlyph};}
  function buildMapData(){normalizeWalls();normalizeSurfaces();return {version:15,name:state.mapName||'Новая карта',notes:state.mapNotes||'',grid:{cols:state.cols,rows:state.rows,cellSizeFt:5},levels:{min:state.minLevel,max:state.maxLevel,current:state.currentLevel},cells:state.cells,surfaces:state.surfaces,objects:state.objects,walls:state.walls,connectors:state.connectors,tokens:state.tokens,combat:ensureCombat(),player:{x:state.player.x,y:state.player.y,level:state.player.level,elevation:state.player.elevation,yaw:state.player.yaw,pitch:state.player.pitch},playerCharacter:state.playerCharacter,activeTokenId:state.activeTokenId,cameraMode:state.cameraMode};}
  function saveMap(){var data=buildMapData();try{localStorage.setItem('dnd_vtt_3d_map',JSON.stringify(data));alert('3D-карта «'+(data.name||'Новая карта')+'» сохранена локально.');}catch(e){alert('Не удалось сохранить карту: '+e.message);}}
  function exportMap(){var data=buildMapData(),blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=(String(data.name||'dnd_map').replace(/[^a-z0-9а-яё_-]+/gi,'_')||'dnd_map')+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);}
  function importMap(){var input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=function(){var f=input.files&&input.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{applyMapData(JSON.parse(rd.result));}catch(e){alert('Не удалось импортировать карту: '+e.message);}};rd.readAsText(f);};input.click();}
  function applyMapData(d){if(!d||!d.grid)throw new Error('Неверный формат карты');state.mapName=d.name||'Новая карта';state.mapNotes=d.notes||'';state.cols=clamp(Number(d.grid&&d.grid.cols)||20,1,200);state.rows=clamp(Number(d.grid&&d.grid.rows)||20,1,200);if(d.version>=2&&d.levels){state.minLevel=Number(d.levels.min)||0;state.maxLevel=Number(d.levels.max)||0;state.currentLevel=Number(d.levels.current)||0;state.cells=d.cells||{};state.surfaces=d.surfaces||{};normalizeSurfaces();state.objects=(d.objects||[]).map(function(o){if(o.level==null)o.level=0;o.scaleX=Number(o.scaleX)||1;o.scaleY=Number(o.scaleY)||1;o.scaleZ=Number(o.scaleZ)||1;o.rotation=Number(o.rotation)||0;o.name=o.name||'Мебель';return o;});state.walls=d.walls||{};state.connectors=Array.isArray(d.connectors)?d.connectors.map(function(c){c.dir=c.dir||'n';c.length=Number(c.length)||.8;return c;}):[];state.combat=d.combat||{active:false,round:1,currentId:null,order:[],startedAt:0,mode:true,turns:{}};state.combat.mode=state.combat.mode!==false;state.combat.turns=d.combat&&d.combat.turns||{};state.tokens=Array.isArray(d.tokens)?d.tokens.map(function(t){t.kind=t.kind||'player';t.layer=t.layer||(t.kind==='npc'?'npcs':t.kind==='monster'?'monsters':t.kind==='effect'?'effects':'players');t.visible=t.visible!==false;t.hp=isFinite(Number(t.hp))?Number(t.hp):10;t.maxHp=Number(t.maxHp)||10;t.statuses=Array.isArray(t.statuses)?t.statuses:[];t.initiative=Number(t.initiative)||0;t.actions=t.actions||{action:1,bonus:1,reaction:1,movement:1};return t;}):[];normalizeWalls();state.playerCharacter=d.playerCharacter||state.playerCharacter;state.player={x:(d.player&&Number(d.player.x))||((state.cols-1)/2),y:(d.player&&Number(d.player.y))||((state.rows-1)/2),level:(d.player&&Number(d.player.level))||0,yaw:(d.player&&Number(d.player.yaw))||0,pitch:(d.player&&Number(d.player.pitch))||0,elevation:(d.player&&Number(d.player.elevation))||0};state.cameraMode=['editor','firstPerson','thirdPerson'].indexOf(d.cameraMode)>=0?d.cameraMode:'editor';state.activeTokenId=d.activeTokenId||null;}else{state.minLevel=0;state.maxLevel=0;state.currentLevel=0;var oldCells=d.cells||{};state.cells={};state.surfaces={};Object.keys(oldCells).forEach(function(k){var p=k.split(':');if(p.length===2)state.cells[key(0,Number(p[0]),Number(p[1]))]=oldCells[k];});state.objects=(d.objects||[]).map(function(o){o.level=0;return o;});state.walls={};state.connectors=[];}normalizeWalls();normalizeLevels();state.player.level=clamp(state.player.level,state.minLevel,state.maxLevel);state.currentLevel=state.player.level;updatePlayerElevation();state.camera.targetX=state.player.x;state.camera.targetY=state.player.y;state.camera.targetZ=state.player.elevation;state.selected=null;draw();renderLevelBar();positionBoundaryButtons();}
  function loadMap(){try{var d=JSON.parse(localStorage.getItem('dnd_vtt_3d_map')||'null');if(!d)return alert('Сохранённой 3D-карты пока нет.');applyMapData(d);}catch(e){alert('Не удалось загрузить карту.');}}
  function reset(){makeNewMap(20,20,1,0);setPlayerPosition(9.5,9.5,0);}
  function shiftWorld(dx,dy){if(!dx&&!dy)return;var nc={};Object.keys(state.cells).forEach(function(k){var p=k.split(':');if(p.length===3)nc[key(Number(p[0]),Number(p[1])+dx,Number(p[2])+dy)]=state.cells[k];});state.cells=nc;var ns={};Object.keys(state.surfaces).forEach(function(k){var p=k.split(':');if(p.length===3)ns[key(Number(p[0]),Number(p[1])+dx,Number(p[2])+dy)]=state.surfaces[k];});state.surfaces=ns;var nw={};Object.keys(state.walls).forEach(function(k){var w=state.walls[k],c=canonicalWall(w.level,w.x+dx,w.y+dy,w.dir);nw[wallKey(c.level,c.x,c.y,c.dir)]=Object.assign({},w,{x:c.x,y:c.y});});state.walls=nw;state.objects.forEach(function(o){o.x+=dx;o.y+=dy;});state.connectors.forEach(function(c){c.x+=dx;c.y+=dy;});state.tokens.forEach(function(t){t.x+=dx;t.y+=dy;});state.player.x+=dx;state.player.y+=dy;state.camera.targetX+=dx;state.camera.targetY+=dy;if(state.selected&&typeof state.selected!=='string'){state.selected.x+=dx;state.selected.y+=dy;}if(state.gesture.selectStart){state.gesture.selectStart.x+=dx;state.gesture.selectStart.y+=dy;}if(state.gesture.selectEnd){state.gesture.selectEnd.x+=dx;state.gesture.selectEnd.y+=dy;}}
  function expand(dir){if(dir==='left'){shiftWorld(1,0);state.cols++;}if(dir==='right')state.cols++;if(dir==='top'){shiftWorld(0,1);state.rows++;}if(dir==='bottom')state.rows++;if(dir==='up'){state.maxLevel++;state.currentLevel=state.maxLevel;state.player.level=state.currentLevel;updatePlayerElevation();}if(dir==='down'){state.minLevel--;state.currentLevel=state.minLevel;state.player.level=state.currentLevel;updatePlayerElevation();}state.camera.targetX=(state.cols-1)/2;state.camera.targetY=(state.rows-1)/2;draw();renderLevelBar();positionBoundaryButtons();}
  function switchLevel(level){level=Number(level);if(level<state.minLevel||level>state.maxLevel)return;state.currentLevel=level;state.player.level=level;updatePlayerElevation();state.selected=null;state.camera.targetZ=state.player.elevation;draw();renderLevelBar();positionBoundaryButtons();}
  function dimensionRow(id,label,val,min,max){return '<label style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin:8px 0;color:#ddd"><span>'+label+'</span><span><button type="button" class="btn-action" onclick="dndMap3DDim(&quot;'+id+'&quot;,-1,'+min+','+max+')">−</button><input id="'+id+'" type="number" min="'+min+'" max="'+max+'" value="'+val+'" style="width:64px;text-align:center;padding:6px;background:#0e1013;color:#fff;border:1px solid #555;border-radius:6px"><button type="button" class="btn-action" onclick="dndMap3DDim(&quot;'+id+'&quot;,1,'+min+','+max+')">+</button></span></label>';}
  function dim(id,delta,min,max){var e=document.getElementById(id);if(e)e.value=clamp((Number(e.value)||min)+delta,min,max);}
  function mapInfoDialog(){var name=prompt('Название карты',state.mapName||'Новая карта');if(name!==null){state.mapName=name.trim()||'Новая карта';}var notes=prompt('Описание / заметки карты',state.mapNotes||'');if(notes!==null)state.mapNotes=notes;draw();renderTools();}
  function newMapDialog(){var old=document.getElementById('map3dNewMap');if(old)old.remove();var m=document.createElement('div');m.id='map3dNewMap';m.style.cssText='position:fixed;inset:0;z-index:32000;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;';m.innerHTML='<div style="width:min(440px,100%);background:#171a1f;border:1px solid #6b5527;border-radius:12px;padding:18px;box-sizing:border-box"><h3 style="margin:0 0 12px;color:#e0b65a">🗺️ Новая 3D-карта</h3><div style="font-size:12px;color:#aaa">Высота и глубина — уровни. Уровень 0 — земля.</div>'+dimensionRow('map3dLen','Длина',state.cols,1,200)+dimensionRow('map3dWid','Ширина',state.rows,1,200)+dimensionRow('map3dHei','Высота',mapHeight(),1,50)+dimensionRow('map3dDep','Глубина',-state.minLevel,0,50)+'<div style="display:flex;gap:8px;margin-top:14px"><button class="btn-action" onclick="dndMap3DCreateFromDialog()">Создать</button><button class="btn-action" onclick="document.getElementById(&quot;map3dNewMap&quot;).remove()">Отмена</button></div></div>';document.body.appendChild(m);}
  function createFromDialog(){var m=document.getElementById('map3dNewMap');if(!m)return;makeNewMap(document.getElementById('map3dLen').value,document.getElementById('map3dWid').value,document.getElementById('map3dHei').value,document.getElementById('map3dDep').value);m.remove();}
  function renderLevelBar(){var box=document.getElementById('map3dLevels');if(!box)return;var h='<span style="color:#aaa;margin-right:4px">Уровень:</span>';for(var l=state.minLevel;l<=state.maxLevel;l++)h+='<button class="btn-action" style="padding:5px 9px;'+(l===state.currentLevel?'background:#8a641b;border-color:#e0b65a':'')+'" onclick="dndMap3DLevel('+l+')">'+levelLabel(l)+'</button>';box.innerHTML=h;}
  function boundaryButton(id,title,handler){var wrap=document.getElementById('map3dCanvasWrap');if(!wrap)return;var b=document.getElementById(id);if(!b){b=document.createElement('button');b.id=id;b.type='button';b.textContent='+';b.title=title;b.style.cssText='position:absolute;width:36px;height:36px;border-radius:50%;border:1px solid #e0b65a;background:#8a641b;color:#fff;font-size:24px;font-weight:700;line-height:30px;z-index:20;box-shadow:0 3px 10px #0008;padding:0;touch-action:manipulation;';b.onclick=handler;wrap.appendChild(b);}}
  function positionBoundaryButtons(){if(!canvas||!state.open)return;var rect=canvas.getBoundingClientRect(),pts=[project(0,0,0),project(state.cols,0,0),project(state.cols,state.rows,0),project(0,state.rows,0)];function pos(id,p,dx,dy){var b=document.getElementById(id);if(b){b.style.left=(p.x-rect.left+dx-18)+'px';b.style.top=(p.y-rect.top+dy-18)+'px';}}pos('map3dPlusLeft',pts[0],-12,0);pos('map3dPlusRight',pts[2],12,0);pos('map3dPlusTop',pts[1],0,-12);pos('map3dPlusBottom',pts[3],0,12);var up=document.getElementById('map3dPlusUp'),down=document.getElementById('map3dPlusDown'),a=project(state.cols/2,0,0),b=project(state.cols/2,state.rows,0);if(up){up.style.left=(a.x-rect.left-18)+'px';up.style.top=(a.y-rect.top-52)+'px';}if(down){down.style.left=(b.x-rect.left-18)+'px';down.style.top=(b.y-rect.top+16)+'px';}}
  function createBoundaryButtons(){boundaryButton('map3dPlusLeft','Увеличить длину слева',function(){expand('left');});boundaryButton('map3dPlusRight','Увеличить длину справа',function(){expand('right');});boundaryButton('map3dPlusTop','Увеличить ширину сверху',function(){expand('top');});boundaryButton('map3dPlusBottom','Увеличить ширину снизу',function(){expand('bottom');});boundaryButton('map3dPlusUp','Добавить уровень вверх',function(){expand('up');});boundaryButton('map3dPlusDown','Добавить подземный уровень',function(){expand('down');});}
  function renderTools(){
    // Панель старого редактора полностью удалена. UI будет собран заново.
    return;
  }
  var initialized=false;
  function open(){
    if(!initialized){
      init();
      if(!initialized)return;
    }
    state.open=true;
    state.playMode=false;state.cameraMode=state.cameraMode==='editor'?'editor':state.cameraMode;
    var m=document.getElementById('map3dEditorModal');if(m)m.style.display='flex';
    canvas=document.getElementById('map3dCanvas');if(!canvas)return;
    ctx=canvas.getContext('2d');resize();renderTools();renderLevelBar();createBoundaryButtons();draw();positionBoundaryButtons();
  }
  function close(){state.open=false;setPlayMode(false);var m=document.getElementById('map3dEditorModal');if(m)m.style.display='none';}
  function handleKey(e){if(!state.open||state.cameraMode==='editor')return;var k=String(e.key||'').toLowerCase(),m={w:[1,0],arrowup:[1,0],s:[-1,0],arrowdown:[-1,0],a:[0,-1],arrowleft:[0,-1],d:[0,1],arrowright:[0,1]};if(m[k]){e.preventDefault();moveByFacing(m[k][0],m[k][1],e.shiftKey);}else if(k==='q'){e.preventDefault();rotatePlayer(-.12,0);}else if(k==='e'){e.preventDefault();rotatePlayer(.12,0);}}
  function init(){
    if(initialized)return;
    initialized=true;
    var modal=document.createElement('div');modal.id='map3dEditorModal';modal.style.cssText='display:none;position:fixed!important;left:0!important;top:0!important;right:0!important;bottom:0!important;width:100vw!important;height:100dvh!important;z-index:31000;background:#090a0c;color:#fff;padding:0!important;margin:0!important;box-sizing:border-box;transform:none!important;zoom:1!important;';
    modal.innerHTML='<div id="map3dEditorShell" style="width:100%;height:100%;display:flex;flex-direction:column;background:#11151a;border:0;border-radius:0;overflow:hidden;box-sizing:border-box"><div id="map3dEditorHeader" style="display:flex;align-items:center;gap:6px;padding:7px 9px;border-bottom:1px solid #333;flex-wrap:nowrap"><strong style="color:#d4af37;white-space:nowrap">🏗️ 3D</strong><span style="color:#888;font-size:.72em">V70.37.15</span><button class="btn-action" onclick="dndMap3DNew()" title="Новая карта" style="padding:7px 9px">🗺️</button><button class="btn-action" onclick="dndMap3DInfo()" title="Имя и описание" style="padding:7px 9px">📝</button><span style="flex:1"></span><button class="btn-action" onclick="dndMap3DClose()" style="background:#8f2424;padding:7px 10px">✕</button></div><div id="map3dCanvasWrap" style="position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden;background:#11161a;touch-action:none"><canvas id="map3dCanvas" style="width:100%;height:100%;display:block;min-width:0;min-height:0;touch-action:none"></canvas><div id="map3dLevels" style="position:absolute;left:10px;bottom:10px;z-index:21;display:flex;gap:4px;flex-wrap:wrap;max-width:75%"></div></div></div>';
    document.body.appendChild(modal);
    canvas=document.getElementById('map3dCanvas');
    canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerUp);
    canvas.addEventListener('touchstart',touchStart,{passive:false});canvas.addEventListener('touchmove',touchMove,{passive:false});canvas.addEventListener('touchend',touchEnd,{passive:false});
     createMobileHud();
    global.addEventListener('resize',resize);global.addEventListener('keydown',handleKey);
    global.dndMap3DOpen=open;global.dndMap3DClose=close;global.dndMap3DSelectCharacter=selectPlayerCharacter;global.dndMap3DPlaceToken=placeToken;global.dndMap3DPossessToken=function(){return possessToken();};global.dndMap3DTexture=setSelectedTexture;global.dndMap3DWallSides=editWallSides;global.dndMap3DWallSideColor=setWallSideColor;global.dndMap3DCopyWallSide=copyWallSide;global.dndMap3DClearWallSides=clearWallSides;global.dndMap3DTokenKind=setSelectedKind;global.dndMap3DTokenInit=setInitiative;global.dndMap3DTokenInitRoll=rollInitiative;global.dndMap3DCombatStart=startCombat;global.dndMap3DCombatNext=nextTurn;global.dndMap3DCombatEnd=endCombat;global.dndMap3DCombatMode=setCombatMode;global.dndMap3DCombatModeToggle=toggleCombatMode;global.dndMap3DSetMaterial=setMaterial;global.dndMap3DObjEdit=editSelectedObject;global.dndMap3DMaterialType=cycleMaterialType;global.dndMap3DAddConnector=addConnector;global.dndMap3DRemoveConnector=removeConnector;global.dndMap3DSetCameraMode=setCameraMode;global.dndMap3DSetPlayerPosition=setPlayerPosition;global.dndMap3DMovePlayer=movePlayer;global.dndMap3DMoveByFacing=moveByFacing;global.dndMap3DRun=function(){return moveByFacing(1,0,true);};global.dndMap3DConnectorDir=cycleConnectorDir;global.dndMap3DRotatePlayer=rotatePlayer;global.dndMap3DGetPlayerState=getPlayerState;global.dndMap3DNew=newMapDialog;global.dndMap3DInfo=mapInfoDialog;global.dndMap3DExport=exportMap;global.dndMap3DImport=importMap;global.dndMap3DCreateFromDialog=createFromDialog;global.dndMap3DDim=dim;global.dndMap3DLevel=switchLevel;global.dndMap3DSelect=function(){setSelectionMode(true);};global.dndMap3DSelectionMode=setSelectionMode;global.dndMap3DClearSelection=clearSelection;global.dndMap3DMoveSelection=moveSelection;global.dndMap3DDuplicateSelection=duplicateSelection;global.dndMap3DUp=raise;global.dndMap3DDown=lower;global.dndMap3DCube=addCube;global.dndMap3DWall=addWall;global.dndMap3DSurface=cycleSurface;global.dndMap3DSurfacePreset=surfacePresetDialog;global.dndMap3DSurfaceEdit=editSurfaceDialog;global.dndMap3DSavePreset=saveUserPreset;global.dndMap3DPlacePreset=placeUserPreset;global.dndMap3DManagePresets=manageUserPresets;global.dndMap3DCopySelection=function(){
    var s=selectionBounds();if(!s){alert('Сначала выделите область пальцем.');return;}
    var base={x:s.x1,y:s.y1},clip={w:s.x2-s.x1+1,h:s.y2-s.y1+1,cells:[],surfaces:[],objects:[],walls:[]};
    eachSelectedCell(function(x,y){clip.cells.push({dx:x-base.x,dy:y-base.y,h:cellHeight(x,y,state.currentLevel)});clip.surfaces.push({dx:x-base.x,dy:y-base.y,s:JSON.parse(JSON.stringify(surfaceAt(x,y,state.currentLevel)))});});
    state.objects.forEach(function(o){if(Number(o.level)!==state.currentLevel)return;if(o.x>=s.x1&&o.x<=s.x2&&o.y>=s.y1&&o.y<=s.y2)clip.objects.push(JSON.parse(JSON.stringify({dx:o.x-base.x,dy:o.y-base.y,o:o})));});
    Object.keys(state.walls).forEach(function(k){var w=state.walls[k];if(Number(w.level)!==state.currentLevel)return;if(w.x>=s.x1&&w.x<=s.x2&&w.y>=s.y1&&w.y<=s.y2)clip.walls.push(JSON.parse(JSON.stringify({dx:w.x-base.x,dy:w.y-base.y,w:w})));});
    selectionClipboard=clip;alert('Область скопирована: '+clip.w+'×'+clip.h+' клеток.');
  };
  global.dndMap3DPasteSelection=function(){
    if(!selectionClipboard){alert('Буфер пуст. Сначала скопируйте область.');return;}
    var s=selectionBounds(),ax=s?s.x1:(state.selected&&state.selected.x),ay=s?s.y1:(state.selected&&state.selected.y);
    if(ax==null||ay==null){alert('Выберите клетку-место вставки.');return;}
    selectionClipboard.cells.forEach(function(v){var x=ax+v.dx,y=ay+v.dy;if(x>=0&&y>=0&&x<state.cols&&y<state.rows)setCellHeight(x,y,v.h,state.currentLevel);});(selectionClipboard.surfaces||[]).forEach(function(v){var x=ax+v.dx,y=ay+v.dy;if(x>=0&&y>=0&&x<state.cols&&y<state.rows)setSurface(x,y,v.s,state.currentLevel);});
    selectionClipboard.objects.forEach(function(v){var o=JSON.parse(JSON.stringify(v.o));o.id='obj_'+Date.now()+'_'+Math.random().toString(36).slice(2);o.x=ax+v.dx;o.y=ay+v.dy;o.level=state.currentLevel;state.objects.push(o);});
    selectionClipboard.walls.forEach(function(v){var w=JSON.parse(JSON.stringify(v.w));setWall(ax+v.dx,ay+v.dy,w.dir,true,state.currentLevel,w);});
    state.gesture.selectStart={x:ax,y:ay};state.gesture.selectEnd={x:Math.min(state.cols-1,ax+selectionClipboard.w-1),y:Math.min(state.rows-1,ay+selectionClipboard.h-1)};draw();renderTools();
  };
  global.dndMap3DMassHeight=massHeightDialog;global.dndMap3DFillArea=fillSelectedArea;global.dndMap3DLongWall=addLongWall;global.dndMap3DWallPreset=addWallPreset;global.dndMap3DObjectPreset=addObjectPreset;global.dndMap3DDuplicateSelection=duplicateSelection;global.dndMap3DClearSelection=clearSelection;global.dndMap3DWallDir=addWallEdge;global.dndMap3DWallAdjust=adjustWall;global.dndMap3DWallOpening=cycleWallOpening;global.dndMap3DDoorToggle=toggleDoor;global.dndMap3DLockDoor=lockDoor;global.dndMap3DInteractDoor=interactDoor;global.dndMap3DRemove=remove;global.dndMap3DSave=saveMap;global.dndMap3DLoad=loadMap;global.dndMap3DReset=reset;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
