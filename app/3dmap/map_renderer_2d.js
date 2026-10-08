/* 2D-рендер новой карты. Не зависит от старой карты. */
(function(g){
'use strict';
function draw(canvas,m){
 const ctx=canvas.getContext('2d'); if(!ctx)return;
 const scale=Math.max(0.2,Math.min(1.5,(canvas.clientWidth||800)/(m.width*m.cell)));
 const w=m.width*m.cell*scale,h=m.height*m.cell*scale;
 canvas.width=Math.max(1,Math.floor(w));canvas.height=Math.max(1,Math.floor(h));
 ctx.clearRect(0,0,w,h);ctx.font='12px sans-serif';
 const f=g.DNDMapModel.current(m);
 for(let y=0;y<m.height;y++)for(let x=0;x<m.width;x++){
  const k=x+','+y,t=f.tiles[k];
  ctx.fillStyle=t==='stone'?'#666':t==='wood'?'#8b633e':t==='grass'?'#476b3d':t==='water'?'#315d78':'#171717';
  ctx.fillRect(x*m.cell*scale,y*m.cell*scale,m.cell*scale,m.cell*scale);
  ctx.strokeStyle='#444';ctx.strokeRect(x*m.cell*scale,y*m.cell*scale,m.cell*scale,m.cell*scale);
  const wa=f.walls[k];if(wa){ctx.strokeStyle='#ddd';ctx.lineWidth=3; if(wa.n){ctx.beginPath();ctx.moveTo(x*m.cell*scale,y*m.cell*scale);ctx.lineTo((x+1)*m.cell*scale,y*m.cell*scale);ctx.stroke();} if(wa.e){ctx.beginPath();ctx.moveTo((x+1)*m.cell*scale,y*m.cell*scale);ctx.lineTo((x+1)*m.cell*scale,(y+1)*m.cell*scale);ctx.stroke();} if(wa.s){ctx.beginPath();ctx.moveTo(x*m.cell*scale,(y+1)*m.cell*scale);ctx.lineTo((x+1)*m.cell*scale,(y+1)*m.cell*scale);ctx.stroke();} if(wa.w){ctx.beginPath();ctx.moveTo(x*m.cell*scale,y*m.cell*scale);ctx.lineTo(x*m.cell*scale,(y+1)*m.cell*scale);ctx.stroke();}}
 }
 return {scale,width:w,height:h};
}
g.DNDMapRenderer2D={draw};
})(window);