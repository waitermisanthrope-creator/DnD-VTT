/** Pure, bounded movement planning for Tarot. Never reads the current UI scene. */
(function(g){
  'use strict';
  var DIRS=[[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]];
  function invalid(s){throw Error(s);}
  function validate(b,p){
    if(!b||!Number.isInteger(b.cols)||!Number.isInteger(b.rows)||b.cols<1||b.rows<1||b.cols>200||b.rows>200||!Number.isFinite(b.cellFt)||b.cellFt<1||!p||!Object.values(b.tokens||{}).includes(p))invalid('Для перемещения нужны поле и настоящий токен персонажа.');
    Object.values(b.tokens).forEach(function(t){if(!Number.isInteger(t.x)||!Number.isInteger(t.y)||!Number.isInteger(t.size)||t.size<1||t.x<0||t.y<0||t.x+t.size>b.cols||t.y+t.size>b.rows)invalid('Некорректная позиция или размер токена на поле.');});
  }
  function overlap(a,b){return a.x<b.x+b.size&&a.x+a.size>b.x&&a.y<b.y+b.size&&a.y+a.size>b.y;}
  function wall(b,a,z){var x=a.x+':'+a.y,y=z.x+':'+z.y,k=x<y?x+'|'+y:y+'|'+x;return (b.walls||[]).includes(k);}
  function crossing(b,a,z){if(a.x===z.x||a.y===z.y)return wall(b,a,z);var x={x:z.x,y:a.y},y={x:a.x,y:z.y};return wall(b,a,x)||wall(b,x,z)||wall(b,a,y)||wall(b,y,z);}
  function step(b,p,a,z,diagonals){
    var box={x:z.x,y:z.y,size:p.size};if(z.x<0||z.y<0||z.x+p.size>b.cols||z.y+p.size>b.rows)return {blocked:true};
    var rough=false;
    for(var y=0;y<p.size;y++)for(var x=0;x<p.size;x++){
      var key=(z.x+x)+':'+(z.y+y);if((b.obstacles||{})[key]||(b.hazards||{})[key]||crossing(b,{x:a.x+x,y:a.y+y},{x:z.x+x,y:z.y+y}))return {blocked:true};
      if((b.difficultTerrain||{})[key])rough=true;
    }
    // Do not squeeze diagonally through occupied/blocked corners.
    if(a.x!==z.x&&a.y!==z.y){var corners=[{x:z.x,y:a.y,size:p.size},{x:a.x,y:z.y,size:p.size}];if(corners.some(function(c){for(var yy=c.y;yy<c.y+c.size;yy++)for(var xx=c.x;xx<c.x+c.size;xx++)if((b.obstacles||{})[xx+':'+yy])return true;return Object.values(b.tokens).some(function(t){return t!==p&&overlap(c,t);});}))return {blocked:true};}
    var hit=Object.values(b.tokens).filter(function(t){return t!==p&&overlap(box,t);}).sort(function(a,b){return String(a.id).localeCompare(String(b.id));})[0];if(hit)return {blocked:true,hitTokenId:hit.id};
    var diagonal=a.x!==z.x&&a.y!==z.y;return {cost:(diagonal&&diagonals%2?2:1)*(rough?2:1)*b.cellFt,diagonal:diagonal};
  }
  function reach(b,a,z){var dx=Math.max(0,z.x-(a.x+a.size-1),a.x-(z.x+z.size-1)),dy=Math.max(0,z.y-(a.y+a.size-1),a.y-(z.y+z.size-1));return Math.max(Math.max(dx,dy)*b.cellFt,Math.abs((Number(a.elevationFt)||0)-(Number(z.elevationFt)||0)));}
  function ray(b,p,budget,direction,allow){
    validate(b,p);if(!Number.isFinite(budget)||budget<0||budget>10000||!Number.isInteger(direction)||direction<1||direction>8)invalid('Некорректное направление или запас перемещения.');
    var d=DIRS[direction-1],at={x:p.x,y:p.y},path=[at],cost=0,diagonals=0,hit=null,stopped=false;
    for(var i=0;i<Math.max(b.cols,b.rows);i++){
      var z={x:at.x+d[0],y:at.y+d[1]},s=step(b,p,at,z,diagonals);
      if(s.blocked){hit=s.hitTokenId||null;stopped=true;break;}if(cost+s.cost>budget)break;if(allow&&!allow(at,z)){stopped=true;break;}
      cost+=s.cost;if(s.diagonal)diagonals++;at=z;path.push(at);
    }
    return {path:path,cost:cost,end:at,hitTokenId:hit,stopped:stopped};
  }
  function push(q,n){q.push(n);var i=q.length-1;while(i){var p=(i-1)>>1;if(q[p].cost<=n.cost)break;q[i]=q[p];i=p;}q[i]=n;}
  function pop(q){var first=q[0],last=q.pop();if(q.length){var i=0;while(i*2+1<q.length){var c=i*2+1;if(c+1<q.length&&q[c+1].cost<q[c].cost)c++;if(q[c].cost>=last.cost)break;q[i]=q[c];i=c;}q[i]=last;}return first;}
  function retreat(b,p,budget,center,allow){
    validate(b,p);if(!center||!Number.isFinite(center.x)||!Number.isFinite(center.y)||!Number.isFinite(budget)||budget<0||budget>10000)invalid('Некорректный центр отступления или запас движения.');
    var start={x:p.x,y:p.y,d:0,cost:0,parent:null},q=[start],best=start,seen=new Map(),settled=new Set(),iterations=0;seen.set(p.x+':'+p.y+':0',0);
    function distance(a){return Math.hypot(a.x-center.x,a.y-center.y);}
    while(q.length&&iterations<b.cols*b.rows*2){
      var at=pop(q),key=at.x+':'+at.y+':'+at.d;if(settled.has(key)||at.cost!==seen.get(key))continue;settled.add(key);iterations++;
      if(distance(at)>distance(best)+1e-8||Math.abs(distance(at)-distance(best))<1e-8&&at.cost>best.cost)best=at;
      DIRS.forEach(function(d){var z={x:at.x+d[0],y:at.y+d[1]},s=step(b,p,at,z,at.d);if(s.blocked||at.cost+s.cost>budget||distance(z)+1e-8<distance(at)||allow&&!allow(at,z))return;var next={x:z.x,y:z.y,d:(at.d+(s.diagonal?1:0))%2,cost:at.cost+s.cost,parent:at};var k=next.x+':'+next.y+':'+next.d;if(!settled.has(k)&&(!seen.has(k)||next.cost<seen.get(k))){seen.set(k,next.cost);push(q,next);}});
    }
    var path=[];for(var node=best;node;node=node.parent)path.push({x:node.x,y:node.y});path.reverse();return {path:path,cost:best.cost,end:{x:best.x,y:best.y},stopped:best.cost<budget};
  }
  function route(b,p,destination,budget,allow){
    validate(b,p);if(!destination||!Number.isInteger(destination.x)||!Number.isInteger(destination.y)||!Number.isFinite(budget)||budget<0||budget>10000)invalid('Некорректная точка или запас движения.');
    if(destination.x<0||destination.y<0||destination.x+p.size>b.cols||destination.y+p.size>b.rows)invalid('Точка вне поля.');
    var start={x:p.x,y:p.y,d:0,cost:0,parent:null},q=[start],seen=new Map(),settled=new Set(),iterations=0;seen.set(p.x+':'+p.y+':0',0);
    while(q.length&&iterations<b.cols*b.rows*2){
      var at=pop(q),key=at.x+':'+at.y+':'+at.d;if(settled.has(key)||at.cost!==seen.get(key))continue;settled.add(key);iterations++;
      if(at.x===destination.x&&at.y===destination.y){var path=[];for(var node=at;node;node=node.parent)path.push({x:node.x,y:node.y});path.reverse();return {ok:true,path:path,end:{x:at.x,y:at.y},cost:at.cost};}
      DIRS.forEach(function(d){var z={x:at.x+d[0],y:at.y+d[1]},s=step(b,p,at,z,at.d);if(s.blocked||at.cost+s.cost>budget||allow&&!allow(at,z))return;var next={x:z.x,y:z.y,d:(at.d+(s.diagonal?1:0))%2,cost:at.cost+s.cost,parent:at},k=next.x+':'+next.y+':'+next.d;if(!settled.has(k)&&(!seen.has(k)||next.cost<seen.get(k))){seen.set(k,next.cost);push(q,next);}});
    }
    return {ok:false,reason:'Нет доступного маршрута в пределах награды.'};
  }
  g.DNDPredictorMovement={validate:validate,route:route,reach:reach,ray:ray,retreat:retreat};
})(window);
