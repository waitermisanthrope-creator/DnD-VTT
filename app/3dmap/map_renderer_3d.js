/* Минимальный автономный WebGL-рендер. Никаких импортов и внешних библиотек. */
(function(g){
'use strict';
function draw(canvas,m){
 const gl=canvas.getContext('webgl',{antialias:true,alpha:false});
 if(!gl){canvas.innerHTML='WebGL недоступен на этом устройстве';return;}
 const vs='attribute vec3 p;uniform mat4 mvp;void main(){gl_Position=mvp*vec4(p,1.0);}';
 const fs='precision mediump float;uniform vec4 c;void main(){gl_FragColor=c;}';
 function shader(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);return x;}
 const pr=gl.createProgram();gl.attachShader(pr,shader(gl.VERTEX_SHADER,vs));gl.attachShader(pr,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr);
 const verts=[];const f=g.DNDMapModel.current(m),S=2/Math.max(m.width,m.height),z=m.currentFloor*.22;
 for(let y=0;y<m.height;y++)for(let x=0;x<m.width;x++)if(f.tiles[x+','+y]){
  const x0=-1+x*S,y0=1-y*S,x1=x0+S,y1=y0-S,h=0.08+z;
  verts.push(x0,y0,h,x1,y0,h,x1,y1,h,x0,y0,h,x1,y1,h,x0,y1,h);
 }
 const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.STATIC_DRAW);
 const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0);
 const mvp=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);gl.uniformMatrix4fv(gl.getUniformLocation(pr,'mvp'),false,mvp);gl.uniform4f(gl.getUniformLocation(pr,'c'),.45,.48,.52,1);
 gl.viewport(0,0,canvas.width=canvas.height?canvas.height:canvas.clientHeight);gl.clearColor(.035,.035,.04,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,verts.length/3);
}
g.DNDMapRenderer3D={draw};
})(window);