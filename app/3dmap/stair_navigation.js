/* Deterministic walking-stair navigation, shared by editor and Node tests. */
(function(g){'use strict';
function at(map,floor,x,y){
 var f=map.floors[floor];if(!f)return null;
 return (f.objects||[]).find(function(o){return o.type==='stairs'&&o.walkable&&
 x+.5>=o.x&&x+.5<=o.x+o.w&&y+.5>=o.y&&y+.5<=o.y+o.d;})||null;
}
function step(map,t){
 var o=at(map,t.floor,t.x,t.y);
 if(!o){t.stairHeight=0;return null;}
 var p=Math.max(0,Math.min(1,(t.y+.5-o.y)/o.d)),down=o.stairDirection==='down',h=Number(o.h)||4;
 t.stairHeight=down?-(1-p)*h:p*h;
 if((!down&&p>=.95)||(down&&p<=.05)){
  var dest=Number(o.stairTo);
  if(!Number.isInteger(dest)||dest<0||dest>=map.floors.length)return null;
  map.currentFloor=dest;t.floor=dest;t.stairHeight=0;
  t.y=down?o.y-.5:o.y+o.d-.5;
  return {floor:dest,direction:down?'down':'up'};
 }
 return null;
}
g.DNDStairNavigation={at:at,step:step};
})(typeof window!=='undefined'?window:globalThis);
