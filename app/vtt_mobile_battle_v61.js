/**
 * vtt_mobile_battle_v61.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО: mobile-first слой Battle Board для touch devices.
 * КАК РАБОТАЕТ: добавляет pinch-to-zoom, двухпальцевый pan, drag токенов
 * одним пальцем и long-press context sheet поверх существующего
 * battle_board.js. Не создаёт новый map/combat engine.
 * ПУБЛИЧНЫЕ API: DNDMobileBattleV61, dndV61ResetView.
 * ------------------------------------------------------------------
 */
(function(global){'use strict';
  var VERSION='61.0.0', canvas=null, pointers={}, drag=null, pinch=null, longTimer=null, longFired=false;
  function board(){return global.DNDBattleBoard||null;}
  function canEdit(){return !(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.role==='player');}
  function getCell(ev){return board()&&board().screenToCell?board().screenToCell(ev.clientX,ev.clientY):null;}
  function tokenAt(cell){if(!cell||!board())return null;return board().tokenList().find(function(t){return cell.x>=t.x&&cell.x<t.x+t.size&&cell.y>=t.y&&cell.y<t.y+t.size;})||null;}
  function selectToken(t){if(!t)return;global.dndBattleSelectToken&&global.dndBattleSelectToken(t.id);if(global.dndV60SelectActor)global.dndV60SelectActor(t.sourceId);}
  function openContext(t){if(!t)return;selectToken(t);if(global.dndV60Open)global.dndV60Open();}
  function dist(a,b){return Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);}
  function midpoint(a,b){return {x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2};}
  function clearLong(){if(longTimer){clearTimeout(longTimer);longTimer=null;}}
  function onDown(ev){
    if(!canvas||ev.pointerType==='mouse')return;
    pointers[ev.pointerId]={clientX:ev.clientX,clientY:ev.clientY,startX:ev.clientX,startY:ev.clientY};
    var ids=Object.keys(pointers);
    if(ids.length===2){clearLong();drag=null;var a=pointers[ids[0]],b=pointers[ids[1]],m=midpoint(a,b);pinch={distance:dist(a,b),mid:m,view:board().getView?board().getView():{zoom:1,panX:0,panY:0}};ev.preventDefault();ev.stopPropagation();return;}
    var c=getCell(ev),t=tokenAt(c);longFired=false;
    if(t){selectToken(t);if(canEdit())drag={id:t.id,startX:ev.clientX,startY:ev.clientY,lastX:ev.clientX,lastY:ev.clientY,moved:false};longTimer=setTimeout(function(){longFired=true;drag=null;openContext(t);},520);}
    else drag={id:null,startX:ev.clientX,startY:ev.clientY,lastX:ev.clientX,lastY:ev.clientY,moved:false};
    ev.preventDefault();ev.stopPropagation();
  }
  function onMove(ev){
    if(!pointers[ev.pointerId])return;pointers[ev.pointerId].clientX=ev.clientX;pointers[ev.pointerId].clientY=ev.clientY;
    var ids=Object.keys(pointers);
    if(ids.length===2&&pinch){var a=pointers[ids[0]],b=pointers[ids[1]],d=Math.max(30,dist(a,b)),m=midpoint(a,b),scale=d/pinch.distance,base=pinch.view;var zoom=Math.max(.65,Math.min(2.2,base.zoom*scale));var panX=base.panX+(m.x-pinch.mid.x),panY=base.panY+(m.y-pinch.mid.y);board().setView({zoom:zoom,panX:panX,panY:panY});ev.preventDefault();ev.stopPropagation();return;}
    if(!drag)return;var dx=ev.clientX-drag.startX,dy=ev.clientY-drag.startY;if(Math.hypot(dx,dy)>8){drag.moved=true;clearLong();}
    if(drag.id&&drag.moved&&canEdit()){var c=getCell(ev),t=board().findToken(drag.id);if(c&&t){var moved=board().moveToken(drag.id,c.x,c.y);if(moved){drag.startX=ev.clientX;drag.startY=ev.clientY;}}ev.preventDefault();ev.stopPropagation();}
  }
  function onUp(ev){clearLong();delete pointers[ev.pointerId];if(Object.keys(pointers).length<2)pinch=null;if(drag&&!drag.moved&&!longFired&&drag.id){selectToken(board().findToken(drag.id));}drag=null;}
  function bind(){canvas=document.getElementById('battleBoardCanvas');if(!canvas)return setTimeout(bind,300);canvas.addEventListener('pointerdown',onDown,{capture:true,passive:false});canvas.addEventListener('pointermove',onMove,{capture:true,passive:false});canvas.addEventListener('pointerup',onUp,{capture:true});canvas.addEventListener('pointercancel',onUp,{capture:true});canvas.addEventListener('contextmenu',function(e){e.preventDefault();});}
  global.dndV61ResetView=function(){if(board()&&board().setView)board().setView({zoom:1,panX:0,panY:0});};
  global.DNDMobileBattleV61={VERSION:VERSION,resetView:global.dndV61ResetView,snapshot:function(){return board()&&board().getView?board().getView():null;}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})(window);
